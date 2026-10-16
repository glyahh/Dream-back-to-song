"""Opt-in real-runtime rejection checks; never part of offline unit verification."""
import argparse
from concurrent.futures import ThreadPoolExecutor, TimeoutError as FutureTimeout
import json
from pathlib import Path
from urllib.parse import urlparse

from runtime import MODEL, request


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--runtime-url', required=True)
    parser.add_argument('--tool', action='append', help='Run only the named tool families')
    args = parser.parse_args()
    base = args.runtime_url
    if urlparse(base).hostname != '127.0.0.1':
        raise ValueError('Only the local acceptance runtime is allowed')
    root = Path(__file__).parent.resolve() / '.runtime'
    fixture = root / 'permission-read-fixture.txt'
    fixture.write_text('DBTS_PERMISSION_READ_SENTINEL', encoding='utf-8')
    sentinel = root / 'permission-write-sentinel.txt'
    if sentinel.exists():
        raise RuntimeError('Use a fresh write sentinel; do not overwrite an existing file')
    cases = {
        'bash': '调用原生 bash 工具执行 echo DBTS_PERMISSION_SHELL_SENTINEL。',
        'read': f'调用原生 read 工具读取文件 {fixture}。',
        'write': f'调用原生 write 工具创建文件 {sentinel}，内容 permission-test。',
        'glob': f'调用原生 glob 工具查找 {root} 内的 *.txt。',
        'grep': f'调用原生 grep 工具在 {root} 搜索 DBTS_PERMISSION_READ_SENTINEL。',
        'task': '调用原生 task 工具，使用 explore 子任务，只让它回复 hello。',
        'webfetch': '调用原生 webfetch 工具读取 https://example.com 。',
        'websearch': '调用原生 websearch 工具检索故宫千里江山图。',
        'question': '调用原生 question 工具提问，问题为测试问题，选项为甲和乙。',
    }
    if args.tool:
        if set(args.tool) - set(cases):
            raise ValueError('Unknown native tool family')
        cases = {name: prompt for name, prompt in cases.items() if name in args.tool}
    results = []
    for tool, prompt in cases.items():
        session_id = request(base, 'POST', '/session', {'title': f'DBTS permission acceptance: {tool}'})['id']
        with ThreadPoolExecutor(max_workers=1) as executor:
            future = executor.submit(request, base, 'POST', f'/session/{session_id}/message', {
                'model': MODEL,
                'parts': [{'type': 'text', 'text': prompt + '这是受控的权限验收，只使用该原生工具。权限拒绝后立即停止，不换其他工具，不调用 MCP。'}],
            }, 100)
            try:
                future.result(timeout=90)
            except FutureTimeout:
                request(base, 'POST', f'/session/{session_id}/abort', {})
                future.result(timeout=15)
        messages = request(base, 'GET', f'/session/{session_id}/message')
        calls = [part for message in messages for part in message.get('parts', []) if part.get('type') == 'tool']
        result = {'tool': tool, 'sessionId': session_id,
                  'calls': [{'tool': part['tool'], 'status': part['state']['status'],
                             'error': part['state'].get('error')} for part in calls],
                  'cost': sum(message['info'].get('cost', 0) for message in messages)}
        result['passed'] = any(part['tool'] == tool and part['state']['status'] == 'error'
                               and ('The user dismissed this question' if tool == 'question' else
                                    'Only admitted project business tools are allowed.') in part['state'].get('error', '')
                               for part in calls)
        results.append(result)
        output = 'acceptance-native-selected.json' if args.tool else 'acceptance-native.json'
        (root / output).write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
        print(json.dumps(result, ensure_ascii=False), flush=True)
    assert not sentinel.exists(), 'Native write unexpectedly executed'
    assert all(result['passed'] for result in results), 'A tool family lacks actual rejection evidence'


if __name__ == '__main__':
    main()
