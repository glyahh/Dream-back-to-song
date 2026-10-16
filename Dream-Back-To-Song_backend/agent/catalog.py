"""Read-only catalog generated from the frontend's authoritative content tables."""
import json
from pathlib import Path


class Catalog:
    def __init__(self, path=None):
        path = Path(path) if path else Path(__file__).parent / 'data' / 'catalog.json'
        self.items = {item['id']: item for item in json.loads(path.read_text(encoding='utf-8'))}

    def get(self, content_id):
        if content_id not in self.items:
            raise ValueError('内容不存在或尚未开放')
        return self.items[content_id]

    def search(self, query='', kind=None):
        # Small catalog: give the model actual content for semantic filtering instead of guessed tags.
        items = [item for item in self.items.values() if not kind or item['kind'] == kind]
        if query:
            terms = query.casefold().split()
            items = [item for item in items if all(term in json.dumps(item, ensure_ascii=False).casefold() for term in terms)]
        results = []
        for item in items:
            result = {key: item[key] for key in ('id', 'kind', 'title', 'summary', 'capabilities')}
            if item['kind'] in ('food', 'legacyfood'):
                result['ingredients'] = item['content']['ingredients']
                result['stepTitles'] = [step['title'] for step in item['content']['steps']]
            if item['kind'] == 'market':
                result['demoPrice'] = item['content']['price']
                result['collection'] = item['content']['collection']
            results.append(result)
        return results

    def cards(self, ids):
        cards = []
        for content_id in dict.fromkeys(ids):
            item = self.get(content_id)
            cards.append({key: item[key] for key in ('id', 'kind', 'title', 'summary', 'image', 'route')})
        return cards
