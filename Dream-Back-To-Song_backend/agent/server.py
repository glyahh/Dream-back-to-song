"""Loopback project API. Java exposes only the public session routes."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import re
from threading import Lock, Thread
import time

from business import Business
from catalog import Catalog
from runtime import Runtime
from store import Store, TERMINAL
from web_research import WebResearch


class Gateway:
    def __init__(self, store, catalog, runtime, web=None):
        self.store, self.catalog, self.runtime = store, catalog, runtime
        self.active_turn = None
        self.business = Business(store, catalog, web, lambda: self.active_turn)
        self.workers = ThreadPoolExecutor(max_workers=4)
        # ponytail: serialize local turns to bind shared stdio MCP; use scoped transports before multiuser deployment.
        self.execution_lock = Lock()

    def run_turn(self, session_id, turn_id):
        with self.execution_lock:
            self.active_turn = turn_id
            try:
                self.process_turn(session_id, turn_id)
            finally:
                self.active_turn = None

    def process_turn(self, session_id, turn_id):
        runtime_id = None
        try:
            turn = self.store.turn(session_id, turn_id)
            if turn['status'] in TERMINAL:
                return
            if time.time() - turn['created'] >= 120:
                raise TimeoutError('本轮排队已超时，请重试')
            session = self.store.session(session_id)
            runtime_id = session['runtimeId'] or self.runtime.new_session()
            self.store.bind_runtime(session_id, runtime_id)
            interrupted = [old for old in session['turns'] if old['status'] in ('failed', 'cancelled')]
            if session['runtimeId'] and interrupted:
                # The previous worker has stopped under execution_lock before upstream history is edited.
                self.runtime.discard_turns(runtime_id, {old['turnId'] for old in interrupted})
            payload = dict(turn['input'])
            receipts = [{**{key: action[key] for key in ('capability', 'targetId', 'actionId')},
                         'receipt': action['receipt']}
                        for old in interrupted for action in old['actions']
                        if action['capability'] != 'state.read' and action['receipt']
                        and action['receipt']['status'] == 'succeeded']
            if receipts:
                payload['interruptedResults'] = receipts
            pending = ThreadPoolExecutor(max_workers=1)
            try:
                permission_epoch = self.runtime.permission_epoch
                future = pending.submit(self.runtime.message, runtime_id, turn_id, payload)
                while not future.done():
                    current = self.store.turn(session_id, turn_id)
                    if current['status'] in TERMINAL:
                        self.runtime.abort(runtime_id)
                        return
                    if not self.runtime.ready() or self.runtime.permission_epoch != permission_epoch:
                        raise RuntimeError('模型服务或权限拒绝器不可用，本轮已停止')
                    if time.time() - current['created'] >= 120:
                        raise TimeoutError('本轮已超时；已执行动作请核对实际状态')
                    time.sleep(0.2)
                response = future.result()
            finally:
                if not future.done():
                    try:
                        self.runtime.abort(runtime_id)
                    except OSError:
                        pass
                pending.shutdown(wait=True)
            error = response.get('info', {}).get('error')
            if error:
                data = error.get('data', {})
                code = data.get('statusCode')
                if code in (401, 403):
                    raise RuntimeError('模型服务当前不可用，请稍后重试')
                if code == 429:
                    raise RuntimeError('模型服务繁忙，请稍后重试')
                if isinstance(code, int) and code >= 500:
                    raise RuntimeError('模型服务暂时异常，请稍后重试')
                raise RuntimeError(data.get('message') or '模型服务异常')
            text = '\n'.join(part['text'] for part in response.get('parts', []) if part.get('type') == 'text')
            if not text.strip():
                raise ValueError('模型未返回有效回答，请重试')
            current = self.store.turn(session_id, turn_id)
            blocks = [{'type': 'text', 'text': text}, *current['blocks']]
            sources = self.store.sources(turn_id)
            if sources:
                blocks.append({'type': 'sources', 'items': [{key: item[key] for key in ('sourceId', 'title', 'url', 'retrievedAt')} for item in sources]})
            for action in current['actions']:
                if action['capability'] != 'state.read' and action['receipt']:
                    blocks.append({'type': 'action_result', 'actionId': action['actionId'], **action['receipt']})
            self.store.finish(turn_id, 'completed', blocks)
        except Exception as error:
            self.store.finish(turn_id, 'failed', error=str(error))
            if runtime_id:
                try:
                    self.runtime.abort(runtime_id)
                except (OSError, ValueError):
                    pass  # Preserve the original error if the already-failed runtime cannot accept abort.

    def route(self, method, path, body):
        if path == '/health' and method == 'GET':
            return {'ready': self.runtime.ready()}
        if path == '/internal/tools' and method == 'POST':
            return self.business.call(body['name'], body.get('arguments', {}))
        if path == '/sessions' and method == 'POST':
            return self.store.create_session()
        match = re.fullmatch(r'/sessions/([a-f0-9]{32})(?:/(turns|actions)(?:/([a-f0-9]{32})(?:/(cancel|receipt))?)?)?', path)
        if not match:
            raise LookupError('接口不存在')
        session_id, section, item_id, operation = match.groups()
        if section is None and method == 'GET':
            session = self.store.session(session_id)
            session.pop('runtimeId')
            return session
        if section == 'turns' and item_id is None and method == 'POST':
            if not self.runtime.ready():
                raise RuntimeError('模型服务暂不可用')
            turn_id, created = self.store.create_turn(session_id, body)
            if created:
                self.workers.submit(self.run_turn, session_id, turn_id)
            return {'turnId': turn_id}
        if section == 'turns' and item_id and operation is None and method == 'GET':
            return self.store.turn(session_id, item_id)
        if section == 'actions' and operation == 'receipt' and method == 'POST':
            return self.store.receipt(session_id, item_id, body)
        if section == 'turns' and operation == 'cancel' and method == 'POST':
            self.store.turn(session_id, item_id)
            self.store.finish(item_id, 'cancelled')
            return self.store.turn(session_id, item_id)
        raise LookupError('接口不存在')


def handler(gateway):
    class Handler(BaseHTTPRequestHandler):
        def dispatch(self):
            try:
                length = int(self.headers.get('Content-Length', '0'))
                if length < 0 or length > 65536:
                    raise ValueError('请求过大')
                body = json.loads(self.rfile.read(length)) if length else {}
                if not isinstance(body, dict):
                    raise ValueError('请求必须为对象')
                result = gateway.route(self.command, self.path, body)
                status = 200
            except LookupError as error:
                status, result = 404, {'error': str(error)}
            except (ValueError, TypeError) as error:
                status, result = 400, {'error': str(error)}
            except Exception as error:
                status, result = 503, {'error': str(error)}
            data = json.dumps(result, ensure_ascii=False).encode()
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        do_GET = dispatch
        do_POST = dispatch

    return Handler


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=8091)
    arguments = parser.parse_args()
    root = Path(__file__).parent
    store = Store(root / '.runtime' / 'sessions.sqlite3')
    store.recover_interrupted()
    web = WebResearch()
    runtime = Runtime(f'http://127.0.0.1:{arguments.port}')
    gateway = Gateway(store, Catalog(), runtime, web)
    server = ThreadingHTTPServer(('127.0.0.1', arguments.port), handler(gateway))
    server_thread = Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    try:
        runtime.start()
        print(f'项目助手已启动：http://127.0.0.1:{arguments.port}', flush=True)
        server_thread.join()
    except KeyboardInterrupt:
        pass
    finally:
        runtime.close()
        server.shutdown()
        server.server_close()
        gateway.workers.shutdown(wait=True)


if __name__ == '__main__':
    main()
