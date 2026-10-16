"""Local stdio MCP adapter. All business execution stays in the Python gateway."""
import json
import sys
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from business import tools_for


def serve(base_url):
    sys.stdin.reconfigure(encoding='utf-8')
    sys.stdout.reconfigure(encoding='utf-8')
    for line in sys.stdin:
        message = None
        try:
            message = json.loads(line)
            if 'id' not in message:
                continue
            method = message['method']
            if method == 'initialize':
                result = {'protocolVersion': message['params']['protocolVersion'], 'capabilities': {'tools': {}},
                          'serverInfo': {'name': 'dbts-business', 'version': '1.0'}}
            elif method == 'ping':
                result = {}
            elif method == 'tools/list':
                result = {'tools': tools_for()}
            elif method == 'tools/call':
                params = message['params']
                try:
                    request = Request(base_url + '/internal/tools', method='POST',
                                      data=json.dumps(params).encode(), headers={'Content-Type': 'application/json'})
                    with urlopen(request, timeout=125) as response:
                        value = json.load(response)
                    result = {'content': [{'type': 'text', 'text': json.dumps(value, ensure_ascii=False)}]}
                except (HTTPError, URLError, TimeoutError) as error:
                    detail = error.read().decode() if isinstance(error, HTTPError) else str(error)
                    result = {'isError': True, 'content': [{'type': 'text', 'text': detail}]}
            else:
                print(json.dumps({'jsonrpc': '2.0', 'id': message['id'],
                                  'error': {'code': -32601, 'message': 'Method not found'}}), flush=True)
                continue
            print(json.dumps({'jsonrpc': '2.0', 'id': message['id'], 'result': result}, ensure_ascii=False), flush=True)
        except (KeyError, TypeError, ValueError) as error:
            print(json.dumps({'jsonrpc': '2.0', 'id': message.get('id') if isinstance(message, dict) else None,
                              'error': {'code': -32602, 'message': str(error)}}), flush=True)


if __name__ == '__main__':
    serve(sys.argv[1])
