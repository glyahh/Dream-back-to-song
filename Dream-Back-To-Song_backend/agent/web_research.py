"""Public web evidence, with pinned public addresses and validated redirects."""
from html.parser import HTMLParser
import http.client
import ipaddress
import json
import re
import socket
import ssl
from urllib.parse import urlencode, urljoin, urlsplit
from urllib.request import Request, urlopen
from urllib.error import HTTPError


def public_target(url):
    target = urlsplit(url)
    if target.scheme not in ('http', 'https') or not target.hostname or target.username or target.password:
        raise ValueError('仅支持公开 HTTP/HTTPS 网页')
    port = target.port or (443 if target.scheme == 'https' else 80)
    if port not in (80, 443):
        raise ValueError('网页端口不受支持')
    try:
        literal = ipaddress.ip_address(target.hostname)
    except ValueError:
        literal = None
    if literal is not None and not literal.is_global:
        raise ValueError('不能读取本机、内网或保留地址')
    addresses = socket.getaddrinfo(target.hostname, port, type=socket.SOCK_STREAM)
    ips = [ipaddress.ip_address(address[4][0]) for address in addresses]
    # This workstation's tunnel returns 198.18/15 Fake-IP addresses for public domains.
    # Resolve those domains over verified HTTPS, then connect to the real validated IP.
    fake_range = ipaddress.ip_network('198.18.0.0/15')
    if literal is None and ips and all(ip in fake_range for ip in ips):
        call = Request('https://dns.google/resolve?' + urlencode({'name': target.hostname, 'type': 'A'}),
                       headers={'Accept': 'application/dns-json'})
        with urlopen(call, timeout=10) as response:
            answer = json.load(response)
        ips = [ipaddress.ip_address(item['data']) for item in answer.get('Answer', []) if item['type'] == 1]
    if not ips or any(not ip.is_global for ip in ips):
        raise ValueError('不能读取本机、内网或保留地址')
    return target, port, str(ips[0])


class PageText(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts, self.title, self.links = [], [], []
        self.hidden = 0
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style', 'noscript'):
            self.hidden += 1
        if tag == 'title':
            self.in_title = True
        if tag == 'a' and not self.hidden:
            href = dict(attrs).get('href')
            if href:
                self.links.append(href)

    def handle_endtag(self, tag):
        if tag in ('script', 'style', 'noscript'):
            self.hidden = max(0, self.hidden - 1)
        if tag == 'title':
            self.in_title = False

    def handle_data(self, data):
        if self.hidden or not data.strip():
            return
        self.parts.append(data.strip())
        if self.in_title:
            self.title.append(data.strip())


class WebResearch:
    def search(self, query):
        if not isinstance(query, str) or not query.strip() or len(query) > 200:
            raise ValueError('请使用必要的公开检索词，最多 200 字')
        body = {'jsonrpc': '2.0', 'id': 1, 'method': 'tools/call', 'params': {
            'name': 'web_search_exa', 'arguments': {'query': query, 'numResults': 5, 'type': 'fast',
                                                   'livecrawl': 'fallback', 'contextMaxCharacters': 12000}}}
        call = Request('https://mcp.exa.ai/mcp', method='POST', data=json.dumps(body).encode(),
                       headers={'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream',
                                'User-Agent': 'DreamBackToSong-Agent/1.0'})
        try:
            with urlopen(call, timeout=25) as response:
                raw = response.read().decode('utf-8')
        except HTTPError as error:
            if error.code == 429:
                raise ValueError('免费网页检索已限流，请稍后重试') from error
            raise ValueError('网页检索暂不可用，请稍后重试') from error
        packets = [json.loads(raw)] if raw.lstrip().startswith('{') else [
            json.loads(line[6:]) for line in raw.splitlines() if line.startswith('data: ')]
        packet = next((item for item in packets if item.get('id') == 1), None)
        if not packet or 'error' in packet or packet.get('result', {}).get('isError'):
            raise ValueError('网页检索未返回有效结果')
        text = '\n'.join(item['text'] for item in packet['result'].get('content', []) if item.get('type') == 'text')
        if not text.strip() or text.strip().lower().startswith('no search results'):
            return []
        evidence = []
        for match in re.finditer(r'^Title: (.*?)\nURL: ([^\n]+)\n([\s\S]*?)(?=^Title: |\Z)', text, re.MULTILINE):
            title, url, content = (part.strip() for part in match.groups())
            public_target(url)
            evidence.append({'title': title, 'url': url, 'evidence': content[:6000]})
        if not evidence:
            raise ValueError('检索返回格式变化，未取得可引用的来源')
        return evidence

    def read(self, url):
        for _ in range(4):
            target, port, address = public_target(url)
            connection = http.client.HTTPConnection(target.hostname, port, timeout=10)
            try:
                # Pin the validated address; retain the original hostname for Host and TLS verification.
                connection.sock = socket.create_connection((address, port), timeout=10)
                if target.scheme == 'https':
                    connection.sock = ssl.create_default_context().wrap_socket(connection.sock, server_hostname=target.hostname)
                path = target.path or '/'
                if target.query:
                    path += '?' + target.query
                connection.request('GET', path, headers={'User-Agent': 'DBTS-Research/1.0', 'Accept': 'text/html,text/plain'})
                response = connection.getresponse()
                if response.status in (301, 302, 303, 307, 308):
                    location = response.getheader('Location')
                    if not location:
                        raise ValueError('网页重定向缺少目标')
                    url = urljoin(url, location)
                    continue
                if response.status != 200:
                    raise ValueError(f'网页读取失败：HTTP {response.status}')
                content_type = response.getheader('Content-Type', '')
                if not any(kind in content_type for kind in ('text/html', 'text/plain', 'application/xhtml+xml')):
                    raise ValueError('仅支持文本网页')
                data = response.read(512 * 1024 + 1)
                if len(data) > 512 * 1024:
                    raise ValueError('网页过大，请选择具体资料页')
                charset = response.headers.get_content_charset() or 'utf-8'
                text = data.decode(charset, errors='replace')
                parser = PageText()
                if 'text/plain' in content_type:
                    title, evidence, links = target.hostname, text, []
                else:
                    parser.feed(text)
                    title, evidence = ' '.join(parser.title), '\n'.join(parser.parts)
                    links = list(dict.fromkeys(urljoin(url, link) for link in parser.links if not link.startswith(('#', 'javascript:', 'mailto:'))))[:30]
                if not evidence.strip():
                    raise ValueError('未读取到可引用的正文')
                return {'title': title or target.hostname, 'url': url, 'evidence': evidence[:12000], 'links': links}
            finally:
                connection.close()
        raise ValueError('网页重定向次数过多')
