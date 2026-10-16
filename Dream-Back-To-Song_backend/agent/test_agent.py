import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import socket
from io import BytesIO
from urllib.error import HTTPError
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import subprocess
import sys
from threading import Thread

from catalog import Catalog
from store import Store
from business import Business
from server import Gateway
from web_research import PageText, WebResearch, public_target
from business import tools_for
from runtime import Runtime, find_opencode_executable


class AgentContractsTest(unittest.TestCase):
    def test_runtime_finds_windows_command_shim_when_exe_is_not_on_path(self):
        with patch.dict('os.environ', {'OPENCODE_BIN': ''}, clear=False), patch('runtime.shutil.which', side_effect=lambda command: {
            'opencode.exe': None,
            'opencode.cmd': r'C:\\Users\\test\\opencode.cmd',
        }.get(command)):
            self.assertEqual(find_opencode_executable(), r'C:\\Users\\test\\opencode.cmd')

    def test_interrupted_upstream_turn_is_removed_without_deleting_completed_context(self):
        runtime = Runtime('http://127.0.0.1:8091')
        runtime.base = 'http://127.0.0.1:12345'
        runtime.base = 'http://127.0.0.1:12345'
        messages = [
            {'info': {'id': 'old-user', 'role': 'user'}, 'parts': [{'type': 'text', 'text': '{"turnId":"completed"}'}]},
            {'info': {'id': 'cancel-user', 'role': 'user'}, 'parts': [{'type': 'text', 'text': '{"turnId":"cancelled"}'}]},
            {'info': {'id': 'cancel-assistant', 'role': 'assistant', 'parentID': 'cancel-user'}, 'parts': []},
        ]
        with patch('runtime.request', return_value=messages) as send:
            runtime.discard_turns('runtime', {'cancelled'})
        self.assertEqual([(call.args[1], call.args[2]) for call in send.call_args_list], [
            ('GET', '/session/runtime/message'),
            ('DELETE', '/session/runtime/message/cancel-assistant'),
            ('DELETE', '/session/runtime/message/cancel-user'),
        ])

    def test_next_turn_prunes_cancelled_work_and_carries_only_actual_receipts(self):
        old = self.turn('cancelled-request', '不要恢复这项旧任务')
        self.store.bind_runtime(self.session, 'runtime')
        action = self.store.add_action(old, {'capability': 'food.next', 'targetId': 'food:suzhengqiezi'})
        self.store.receipt(self.session, action, {'actionId': action, 'status': 'succeeded', 'resultingState': {'stepIndex': 1}})
        self.store.finish(old, 'cancelled')
        self.assertEqual(self.store.turn(self.session, old)['blocks'][0]['status'], 'succeeded')
        current = self.turn('current', '只回答当前问题')
        class FakeRuntime:
            permission_epoch = 0
            def abort(inner, runtime_id):
                self.assertEqual(runtime_id, 'runtime')
            def discard_turns(inner, runtime_id, ids):
                self.assertEqual(ids, {old})
            def ready(inner): return True
            def message(inner, runtime_id, turn_id, payload):
                self.assertEqual(turn_id, current)
                self.assertNotIn('不要恢复', json.dumps(payload, ensure_ascii=False))
                self.assertEqual(payload['interruptedResults'][0]['receipt']['resultingState']['stepIndex'], 1)
                return {'parts': [{'type': 'text', 'text': '当前回答'}]}
        gateway = Gateway(self.store, Catalog(), FakeRuntime())
        try:
            gateway.run_turn(self.session, current)
            self.assertEqual(self.store.turn(self.session, current)['status'], 'completed')
            blocked = self.turn('cleanup-failed', '不能绕过清理执行')
            with patch.object(gateway.runtime, 'discard_turns', side_effect=OSError('upstream cleanup failed')), \
                 patch.object(gateway.runtime, 'message') as send:
                gateway.run_turn(self.session, blocked)
                self.assertEqual(self.store.turn(self.session, blocked)['status'], 'failed')
                send.assert_not_called()
        finally:
            gateway.workers.shutdown()

    def test_runtime_rejects_native_permissions_and_separate_question_channel(self):
        runtime = Runtime('http://127.0.0.1:8091')
        runtime.base = 'http://127.0.0.1:12345'
        with tempfile.TemporaryDirectory() as directory:
            runtime.work = Path(directory)
            events = [
                {'type': 'permission.asked', 'properties': {'id': 'permission-1', 'sessionID': 'session', 'permission': 'write'}},
                {'type': 'question.asked', 'properties': {'id': 'question-1', 'sessionID': 'session'}},
            ]
            stream = BytesIO(b''.join(b'data: ' + json.dumps(event).encode() + b'\n' for event in events))
            def reply(*args, **kwargs):
                if '/question/' in args[2]: runtime.stop.set()
            with patch('runtime.urlopen', return_value=stream), patch('runtime.request', side_effect=reply) as send:
                runtime.reject_permissions()
            self.assertEqual([call.args[2] for call in send.call_args_list],
                             ['/permission/permission-1/reply', '/question/question-1/reject'])
            self.assertEqual(send.call_args_list[0].args[3]['reply'], 'reject')
            self.assertEqual(len((runtime.work / 'permissions.jsonl').read_text().splitlines()), 2)

    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name) / 'sessions.sqlite3'
        self.store = Store(self.path)
        self.session = self.store.create_session()['sessionId']

    def turn(self, request='request-1', text='下一步'):
        return self.store.create_turn(self.session, {'requestId': request, 'text': text})[0]

    def test_duplicate_request_and_conflicting_payload(self):
        turn_id = self.turn()
        self.assertEqual(self.store.create_turn(self.session, {'requestId': 'request-1', 'text': '下一步'}), (turn_id, False))
        with self.assertRaises(ValueError):
            self.turn(text='重做')
        with self.assertRaises(ValueError):
            self.turn(request='request-2')
        self.store.finish(turn_id, 'completed', [{'type': 'text', 'text': '完成'}])
        self.assertNotEqual(self.turn(request='request-2'), turn_id)

    def test_turn_events_replay_from_cursor_and_remain_session_scoped(self):
        turn_id = self.turn()
        first = self.store.append_event(self.session, turn_id, 'turn_started')
        second = self.store.append_event(self.session, turn_id, 'text_delta', {'delta': '你好'})
        third = self.store.append_event(self.session, turn_id, 'turn_completed', {'turn': self.store.turn(self.session, turn_id)})
        self.assertEqual([event['seq'] for event in self.store.events(self.session, turn_id, 0)], [1, 2, 3])
        self.assertEqual(self.store.events(self.session, turn_id, second['seq']), [third])
        self.assertEqual(first['eventId'] != second['eventId'], True)
        self.assertEqual(self.store.append_event(self.session, turn_id, 'text_delta', {'delta': '重复'}, event_id=second['eventId']), second)
        with self.assertRaises(LookupError):
            self.store.events(self.store.create_session()['sessionId'], turn_id, 0)

    def test_runtime_maps_upstream_text_delta_and_part_snapshot(self):
        runtime = Runtime('http://127.0.0.1:8091')
        runtime.base = 'http://127.0.0.1:12345'
        events = [
            {'type': 'message.part.updated', 'properties': {'sessionID': 'runtime', 'part': {'id': 'p1', 'type': 'text', 'text': '你好'}}},
            {'type': 'message.part.delta', 'properties': {'sessionID': 'runtime', 'partID': 'p1', 'field': 'text', 'delta': '！'}},
            {'type': 'message.part.updated', 'properties': {'sessionID': 'runtime', 'part': {'id': 'p1', 'type': 'text', 'text': '你好！宋朝'}}},
        ]
        stream = BytesIO(b''.join(b'data: ' + json.dumps(event, ensure_ascii=False).encode() + b'\n\n' for event in events))
        values = []
        with patch('runtime.urlopen', return_value=stream):
            runtime.stream_text('runtime', __import__('threading').Event(), values.append)
        self.assertEqual(values, ['你好', '！', '宋朝'])

    def test_runtime_ignores_reasoning_and_unknown_parts(self):
        runtime = Runtime('http://127.0.0.1:8091')
        runtime.base = 'http://127.0.0.1:12345'
        events = [
            {'type': 'message.part.updated', 'properties': {'sessionID': 'runtime', 'part': {'id': 'r1', 'type': 'reasoning', 'text': '内部推理'}}},
            {'type': 'message.part.delta', 'properties': {'sessionID': 'runtime', 'partID': 'r1', 'field': 'text', 'delta': '更多推理'}},
            {'type': 'message.part.delta', 'properties': {'sessionID': 'runtime', 'partID': 'unknown', 'field': 'text', 'delta': '未知内容'}},
            {'type': 'message.part.updated', 'properties': {'sessionID': 'runtime', 'part': {'id': 't1', 'type': 'text', 'text': '最终回答'}}},
        ]
        stream = BytesIO(b''.join(b'data: ' + json.dumps(event, ensure_ascii=False).encode() + b'\n\n' for event in events))
        values = []
        with patch('runtime.urlopen', return_value=stream):
            runtime.stream_text('runtime', __import__('threading').Event(), values.append)
        self.assertEqual(values, ['最终回答'])

    def test_runtime_splits_large_text_delta(self):
        runtime = Runtime('http://127.0.0.1:8091')
        runtime.base = 'http://127.0.0.1:12345'
        event = {'type': 'message.part.delta', 'properties': {'sessionID': 'runtime',
                                                               'part': {'id': 't1', 'type': 'text'},
                                                               'field': 'text',
                                                               'delta': '甲' * 70}}
        stream = BytesIO(b'data: ' + json.dumps(event, ensure_ascii=False).encode() + b'\n\n')
        values = []
        with patch('runtime.urlopen', return_value=stream):
            runtime.stream_text('runtime', __import__('threading').Event(), values.append)
        self.assertEqual(''.join(values), '甲' * 70)
        self.assertTrue(all(len(value) <= 32 for value in values))

    def test_runtime_accepts_wrapped_v2_text_and_buffers_delta_before_part_type(self):
        runtime = Runtime('http://127.0.0.1:8091')
        runtime.base = 'http://127.0.0.1:12345'
        events = [
            {'payload': {'type': 'message.part.delta', 'properties': {
                'sessionID': 'runtime', 'partID': 'p1', 'field': 'text', 'delta': '你'}}},
            {'payload': {'type': 'message.part.updated', 'properties': {
                'sessionID': 'runtime', 'part': {'id': 'p1', 'type': 'text', 'text': '你好'}}}},
            {'payload': {'type': 'session.next.text.delta', 'properties': {
                'sessionID': 'runtime', 'delta': '，世界'}}},
            {'payload': {'type': 'session.next.reasoning.delta', 'properties': {
                'sessionID': 'runtime', 'delta': '不应显示'}}},
        ]
        stream = BytesIO(b''.join(b'data: ' + json.dumps(event, ensure_ascii=False).encode() + b'\n\n' for event in events))
        values = []
        with patch('runtime.urlopen', return_value=stream):
            runtime.stream_text('runtime', __import__('threading').Event(), values.append)
        self.assertEqual(values, ['你', '好', '，世界'])

    def test_runtime_only_streams_assistant_parts_not_user_text_parts(self):
        runtime = Runtime('http://127.0.0.1:8091')
        runtime.base = 'http://127.0.0.1:12345'
        events = [
            {'type': 'message.updated', 'properties': {'info': {'id': 'user-message', 'sessionID': 'runtime', 'role': 'user'}}},
            {'type': 'message.part.updated', 'properties': {'sessionID': 'runtime', 'part': {
                'id': 'user-part', 'messageID': 'user-message', 'type': 'text', 'text': '用户输入'}}},
            {'type': 'message.updated', 'properties': {'info': {'id': 'assistant-message', 'sessionID': 'runtime', 'role': 'assistant'}}},
            {'type': 'message.part.updated', 'properties': {'sessionID': 'runtime', 'part': {
                'id': 'assistant-part', 'messageID': 'assistant-message', 'type': 'text', 'text': '助手回答'}}},
        ]
        stream = BytesIO(b''.join(b'data: ' + json.dumps(event, ensure_ascii=False).encode() + b'\n\n' for event in events))
        values = []
        with patch('runtime.urlopen', return_value=stream):
            runtime.stream_text('runtime', __import__('threading').Event(), values.append)
        self.assertEqual(values, ['助手回答'])

    def test_client_cannot_supply_runtime_turn_identifier(self):
        with self.assertRaises(ValueError):
            self.store.create_turn(self.session, {'requestId': 'override', 'text': '下一步', 'turnId': 'another-turn'})

    def test_receipts_are_bound_and_first_result_wins(self):
        turn_id = self.turn()
        action_id = self.store.add_action(turn_id, {'capability': 'food.next', 'targetId': 'food:suzhengqiezi'})
        other = self.store.create_session()['sessionId']
        receipt = {'actionId': action_id, 'status': 'succeeded', 'resultingState': {'stepIndex': 1, 'completed': False}}
        with self.assertRaises(LookupError):
            self.store.receipt(other, action_id, receipt)
        with self.assertRaises(LookupError):
            self.store.turn(other, turn_id)
        self.assertEqual(self.store.receipt(self.session, action_id, receipt), receipt)
        self.assertEqual(self.store.receipt(self.session, action_id, {**receipt, 'status': 'failed'}), receipt)
        self.assertEqual(Store(self.path).turn(self.session, turn_id)['actions'][0]['receipt'], receipt)

    def test_cancellation_cannot_be_overwritten_by_late_worker(self):
        turn_id = self.turn()
        action_id = self.store.add_action(turn_id, {'capability': 'food.next'})
        self.store.finish(turn_id, 'cancelled')
        self.store.finish(turn_id, 'completed', [{'type': 'text', 'text': '误报成功'}])
        self.assertEqual(self.store.turn(self.session, turn_id)['status'], 'cancelled')
        with self.assertRaises(ValueError):
            self.store.receipt(self.session, action_id, {'actionId': action_id, 'status': 'succeeded'})
        with self.assertRaises(ValueError):
            self.store.add_action(turn_id, {})

    def test_tool_budget_and_restart_preserve_receipts(self):
        turn_id = self.turn()
        for _ in range(8):
            self.store.consume_call(turn_id)
        with self.assertRaises(ValueError):
            self.store.consume_call(turn_id)
        action_id = self.store.add_action(turn_id, {'capability': 'food.next'})
        receipt = {'actionId': action_id, 'status': 'succeeded', 'resultingState': {'stepIndex': 1}}
        self.store.receipt(self.session, action_id, receipt)
        self.store.recover_interrupted()
        turn = Store(self.path).turn(self.session, turn_id)
        self.assertEqual(turn['status'], 'failed')
        self.assertEqual(turn['actions'][0]['receipt'], receipt)

    def test_catalog_uses_real_content_and_rejects_unknown_cards(self):
        catalog = Catalog()
        self.assertEqual(len(catalog.items), 80)
        self.assertEqual(len(catalog.search(kind='food')), 12)
        self.assertEqual(len(catalog.search(kind='legacyfood')), 5)
        self.assertEqual(len(catalog.search(kind='market')), 14)
        self.assertNotIn('cart.checkout', catalog.get('market:101')['capabilities'])
        self.assertEqual(catalog.get('market:1')['capabilities'], ['content.open'])
        self.assertEqual(len(catalog.search(kind='apparel')), 6)
        self.assertEqual(len(catalog.search(kind='outfit')), 2)
        self.assertEqual(len(catalog.search(kind='course')), 5)
        self.assertEqual(len(catalog.search(kind='building')), 4)
        self.assertEqual(catalog.get('course:1')['title'], '汉服基础入门讲解')
        self.assertEqual(catalog.get('food:suzhengqiezi')['content']['ingredients'][0], '茄子 300 克')
        self.assertEqual(len(catalog.cards(['food:suzhengqiezi'] * 2)), 1)
        with self.assertRaises(ValueError):
            catalog.cards(['food:invented'])

    def test_mcp_stdio_chinese_round_trip(self):
        class Handler(BaseHTTPRequestHandler):
            def do_POST(self):
                request = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
                self.server.query = request['arguments']['query']
                response = json.dumps({'title': '素蒸茄子', 'ingredients': ['葱 5 克', '盐 1 克']}, ensure_ascii=False).encode()
                self.send_response(200)
                self.end_headers()
                self.wfile.write(response)

        server = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
        thread = Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            message = {'jsonrpc': '2.0', 'id': 1, 'method': 'tools/call',
                       'params': {'name': 'search_content', 'arguments': {'turnId': 'test', 'query': '素蒸茄子'}}}
            process = subprocess.run([sys.executable, str(Path(__file__).parent / 'mcp_server.py'),
                                      f'http://127.0.0.1:{server.server_port}'],
                                     input=json.dumps(message, ensure_ascii=False).encode() + b'\n', capture_output=True, timeout=10)
            self.assertEqual(process.returncode, 0, process.stderr)
            result = json.loads(json.loads(process.stdout)['result']['content'][0]['text'])
            self.assertEqual(server.query, '素蒸茄子')
            self.assertEqual(result['ingredients'], ['葱 5 克', '盐 1 克'])
        finally:
            server.shutdown()
            server.server_close()

    def test_unadmitted_capability_cannot_create_action(self):
        turn_id = self.turn()
        business = Business(self.store, Catalog())
        with self.assertRaises(ValueError):
            business.call('execute_client_action', {'turnId': turn_id, 'targetId': 'food:suzhengqiezi',
                                                   'capability': 'shell', 'args': {}, 'expectedState': None})
        self.assertEqual(self.store.turn(self.session, turn_id)['actions'], [])
        with self.assertRaises(ValueError):
            business.call('get_content', {'turnId': turn_id, 'contentId': {'id': 'food:suzhengqiezi'}})
        with self.assertRaises(ValueError):
            business.call('present_content', {'turnId': turn_id, 'contentIds': [{'id': 'food:suzhengqiezi'}]})

    def test_model_errors_preserve_successful_receipts_without_replaying(self):
        for code in (403, 429, 500):
            with self.subTest(code=code):
                turn_id = self.turn(f'error-{code}')
                action_id = self.store.add_action(turn_id, {'capability': 'food.next', 'targetId': 'food:suzhengqiezi'})
                receipt = {'actionId': action_id, 'status': 'succeeded', 'resultingState': {'stepIndex': 1, 'completed': False}}
                self.store.receipt(self.session, action_id, receipt)

                class Runtime:
                    calls = 0
                    permission_epoch = 0

                    def ready(self): return True
                    def new_session(self): return 'runtime-test'
                    def abort(self, runtime_id): pass
                    def discard_turns(self, runtime_id, turn_ids): pass
                    def message(self, *args):
                        self.calls += 1
                        return {'info': {'error': {'name': 'APIError', 'data': {'message': f'HTTP {code}', 'statusCode': code}}}}

                runtime = Runtime()
                gateway = Gateway(self.store, Catalog(), runtime)
                try:
                    gateway.run_turn(self.session, turn_id)
                    result = self.store.turn(self.session, turn_id)
                    self.assertEqual(result['status'], 'failed')
                    self.assertEqual(result['error'], {
                        403: '模型服务当前不可用，请稍后重试', 429: '模型服务繁忙，请稍后重试',
                        500: '模型服务暂时异常，请稍后重试',
                    }[code])
                    self.assertEqual(result['actions'][0]['receipt'], receipt)
                    self.assertEqual(runtime.calls, 1)
                finally:
                    gateway.workers.shutdown()

    def test_model_repeated_mutation_reuses_original_action_even_after_receipt(self):
        turn_id = self.turn()
        payload = {'capability': 'food.next', 'targetId': 'food:suzhengqiezi', 'args': {},
                   'expectedState': {'stepIndex': 0, 'completed': False}}
        action_id = self.store.add_action(turn_id, payload)
        self.store.receipt(self.session, action_id, {'actionId': action_id, 'status': 'succeeded',
                                                   'resultingState': {'stepIndex': 1, 'completed': False}})
        self.assertEqual(self.store.add_action(turn_id, {**payload, 'expectedState': {'stepIndex': 1, 'completed': False}}), action_id)
        self.assertEqual(len(self.store.turn(self.session, turn_id)['actions']), 1)

    def test_web_evidence_cannot_add_or_change_authorized_business_actions(self):
        turn_id = self.turn()
        planned = {'capability': 'food.next', 'targetId': 'food:suzhengqiezi', 'args': {}}
        self.store.prepare_action(turn_id, planned)
        self.store.begin_web(turn_id)
        self.assertTrue(self.store.action_allowed(turn_id, planned))
        self.assertFalse(self.store.action_allowed(turn_id, {**planned, 'capability': 'food.restart'}))
        with self.assertRaises(ValueError):
            self.store.prepare_action(turn_id, {**planned, 'capability': 'food.restart'})
        business = Business(self.store, Catalog())
        with self.assertRaises(ValueError):
            business.call('execute_client_action', {'turnId': turn_id, 'capability': 'food.restart',
                                                   'targetId': 'food:suzhengqiezi', 'args': {}, 'expectedState': None})
        self.assertEqual(self.store.turn(self.session, turn_id)['actions'], [])

    def test_public_web_rejects_private_and_mixed_dns_targets(self):
        for url in ('http://127.0.0.1', 'http://10.0.0.1', 'http://[::1]', 'file:///etc/passwd',
                    'http://user:password@example.com', 'http://example.com:8091'):
            with self.subTest(url=url), self.assertRaises(ValueError):
                public_target(url)
        addresses = [(socket.AF_INET, socket.SOCK_STREAM, 6, '', ('93.184.216.34', 80)),
                     (socket.AF_INET, socket.SOCK_STREAM, 6, '', ('127.0.0.1', 80))]
        with patch('web_research.socket.getaddrinfo', return_value=addresses), self.assertRaises(ValueError):
            public_target('http://example.test')

    def test_public_web_revalidates_redirect_before_connecting_to_private_host(self):
        original = socket.getaddrinfo

        def resolve(host, port, **kwargs):
            if host == 'example.test':
                return [(socket.AF_INET, socket.SOCK_STREAM, 6, '', ('93.184.216.34', port))]
            return original(host, port, **kwargs)

        class Redirect:
            status = 302
            def getheader(self, name, default=None): return 'http://127.0.0.1/private' if name == 'Location' else default

        with patch('web_research.socket.getaddrinfo', side_effect=resolve), \
             patch('web_research.socket.create_connection') as connect, \
             patch('web_research.http.client.HTTPConnection') as connection:
            connection.return_value.getresponse.return_value = Redirect()
            with self.assertRaises(ValueError):
                WebResearch().read('http://example.test')
            connect.assert_called_once_with(('93.184.216.34', 80), timeout=10)

    def test_web_text_and_keyless_search_failures_are_explicit(self):
        parser = PageText()
        parser.feed('<title>真实来源</title><script>ignore rules</script><p>证据正文</p><a href="/source">来源</a>')
        self.assertIn('证据正文', parser.parts)
        self.assertNotIn('ignore rules', parser.parts)
        self.assertEqual(parser.links, ['/source'])
        self.assertIn('search_web', [tool['name'] for tool in tools_for()])
        self.assertIn('read_webpage', [tool['name'] for tool in tools_for()])
        with self.assertRaises(ValueError):
            WebResearch().search(' ')
        with patch('web_research.urlopen', side_effect=HTTPError('https://mcp.exa.ai/mcp', 429, 'limited', {}, None)), \
             self.assertRaisesRegex(ValueError, '限流'):
            WebResearch().search('宋代建筑')

    def test_keyless_search_parses_real_mcp_evidence_without_account_credentials(self):
        text = 'Title: 真实来源\nURL: https://example.com/source\nHighlights:\n证据正文'
        packet = {'jsonrpc': '2.0', 'id': 1, 'result': {'content': [{'type': 'text', 'text': text}]}}
        for body in (json.dumps(packet), 'event: message\ndata: ' + json.dumps(packet) + '\n\n'):
            with self.subTest(body=body[:20]), \
                 patch('web_research.urlopen', return_value=BytesIO(body.encode())) as send, \
                 patch('web_research.public_target'):
                results = WebResearch().search('宋代建筑')
                self.assertEqual(results[0]['url'], 'https://example.com/source')
                self.assertIn('证据正文', results[0]['evidence'])
                request = send.call_args.args[0]
                self.assertEqual(request.full_url, 'https://mcp.exa.ai/mcp')
                self.assertIsNone(request.get_header('Authorization'))
                self.assertIsNone(request.get_header('X-api-key'))
                self.assertEqual(json.loads(request.data)['params']['name'], 'web_search_exa')

    def test_fake_ip_resolution_still_pins_only_public_addresses(self):
        fake = [(socket.AF_INET, socket.SOCK_STREAM, 6, '', ('198.18.1.225', 443))]
        with patch('web_research.socket.getaddrinfo', return_value=fake), \
             patch('web_research.urlopen', return_value=BytesIO(b'{"Answer":[{"type":1,"data":"93.184.216.34"}]}')):
            self.assertEqual(public_target('https://example.test')[2], '93.184.216.34')
        with patch('web_research.socket.getaddrinfo', return_value=fake), \
             patch('web_research.urlopen', return_value=BytesIO(b'{"Answer":[{"type":1,"data":"127.0.0.1"}]}')), self.assertRaises(ValueError):
            public_target('https://example.test')
        with self.assertRaises(ValueError):
            public_target('http://198.18.1.225')

    def test_shared_mcp_cannot_select_another_active_or_queued_turn(self):
        own = self.turn()
        other_session = self.store.create_session()['sessionId']
        other, _ = self.store.create_turn(other_session, {'requestId': 'other', 'text': '下一步'})
        business = Business(self.store, Catalog(), turn_scope=lambda: own)
        with self.assertRaises(ValueError):
            business.call('get_capabilities', {'turnId': other})
        self.assertTrue(business.call('get_capabilities', {'turnId': own})['items'])

    def test_sources_keep_stable_ids_and_actual_web_evidence(self):
        turn_id = self.turn()
        reference = {'url': 'https://example.com', 'title': '项目参考', 'origin': 'project_reference', 'evidence': '项目引用'}
        first = self.store.add_source(turn_id, reference)
        web = self.store.add_source(turn_id, {**reference, 'origin': 'web', 'evidence': '真实网页正文'})
        again = self.store.add_source(turn_id, reference)
        self.assertEqual(first['sourceId'], web['sourceId'])
        self.assertEqual(again['evidence'], '真实网页正文')
        self.assertEqual(len(self.store.sources(turn_id)), 1)

    def test_expired_turn_does_not_start_a_model_or_execute_a_tool(self):
        turn_id = self.turn()
        with self.store.connect() as db:
            db.execute('UPDATE turns SET created=created-121 WHERE id=?', (turn_id,))
        with self.assertRaises(ValueError):
            self.store.consume_call(turn_id)

        class Runtime:
            def new_session(self): raise AssertionError('expired turn started a model')

        gateway = Gateway(self.store, Catalog(), Runtime())
        try:
            gateway.run_turn(self.session, turn_id)
            self.assertEqual(self.store.turn(self.session, turn_id)['status'], 'failed')
        finally:
            gateway.workers.shutdown()


if __name__ == '__main__':
    unittest.main()
