"""Durable session, turn and client receipt contracts; no model retry loop."""
from contextlib import closing, contextmanager
import json
from pathlib import Path
import sqlite3
import time
from uuid import uuid4

TERMINAL = ('completed', 'failed', 'cancelled')


class Store:
    def __init__(self, path):
        self.path = str(path)
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        with self.connect() as db:
            db.executescript('''
                PRAGMA journal_mode=WAL;
                CREATE TABLE IF NOT EXISTS sessions (
                    id TEXT PRIMARY KEY, runtime_id TEXT, created REAL NOT NULL);
                CREATE TABLE IF NOT EXISTS turns (
                    id TEXT PRIMARY KEY, session_id TEXT NOT NULL REFERENCES sessions(id),
                    request_id TEXT NOT NULL, payload TEXT NOT NULL, status TEXT NOT NULL,
                    blocks TEXT NOT NULL DEFAULT '[]', error TEXT, calls INTEGER NOT NULL DEFAULT 0,
                    created REAL NOT NULL, UNIQUE(session_id, request_id));
                CREATE TABLE IF NOT EXISTS actions (
                    id TEXT PRIMARY KEY, turn_id TEXT NOT NULL REFERENCES turns(id),
                    payload TEXT NOT NULL, receipt TEXT);
                CREATE TABLE IF NOT EXISTS web_turns (turn_id TEXT PRIMARY KEY REFERENCES turns(id));
                CREATE TABLE IF NOT EXISTS prepared_actions (
                    turn_id TEXT NOT NULL REFERENCES turns(id), payload TEXT NOT NULL, PRIMARY KEY(turn_id,payload));
                CREATE TABLE IF NOT EXISTS sources (
                    id TEXT PRIMARY KEY, turn_id TEXT NOT NULL REFERENCES turns(id), payload TEXT NOT NULL);
                CREATE TABLE IF NOT EXISTS turn_events (
                    turn_id TEXT NOT NULL REFERENCES turns(id), seq INTEGER NOT NULL,
                    event_id TEXT NOT NULL UNIQUE, event_type TEXT NOT NULL,
                    payload TEXT NOT NULL, created REAL NOT NULL,
                    PRIMARY KEY(turn_id, seq));
                CREATE INDEX IF NOT EXISTS turn_events_turn_seq ON turn_events(turn_id, seq);
            ''')

    @contextmanager
    def connect(self):
        with closing(sqlite3.connect(self.path, timeout=5)) as db, db:
            db.row_factory = sqlite3.Row
            db.execute('PRAGMA foreign_keys=ON')
            yield db

    def create_session(self):
        session_id = uuid4().hex
        with self.connect() as db:
            db.execute('INSERT INTO sessions VALUES (?, NULL, ?)', (session_id, time.time()))
        return {'sessionId': session_id}

    def session(self, session_id):
        with self.connect() as db:
            row = db.execute('SELECT * FROM sessions WHERE id=?', (session_id,)).fetchone()
            if row is None:
                raise LookupError('会话不存在')
            ids = [row['id'] for row in db.execute('SELECT id FROM turns WHERE session_id=? ORDER BY created, rowid', (session_id,))]
        return {'sessionId': session_id, 'runtimeId': row['runtime_id'],
                'turns': [self.turn(session_id, turn_id) for turn_id in ids]}

    def bind_runtime(self, session_id, runtime_id):
        with self.connect() as db:
            db.execute('UPDATE sessions SET runtime_id=? WHERE id=?', (runtime_id, session_id))

    def create_turn(self, session_id, payload):
        if set(payload) - {'requestId', 'text', 'entry', 'clientState'}:
            raise ValueError('回合参数不匹配')
        if any(key in payload and not isinstance(payload[key], dict) for key in ('entry', 'clientState')):
            raise ValueError('入口与客户端状态必须为对象')
        if not isinstance(payload.get('requestId'), str) or not payload['requestId'].strip():
            raise ValueError('缺少请求标识')
        if not isinstance(payload.get('text'), str) or not payload['text'].strip():
            raise ValueError('请输入内容')
        encoded = json.dumps(payload, ensure_ascii=False, sort_keys=True)
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            if not db.execute('SELECT 1 FROM sessions WHERE id=?', (session_id,)).fetchone():
                raise LookupError('会话不存在')
            old = db.execute('SELECT * FROM turns WHERE session_id=? AND request_id=?', (session_id, payload['requestId'])).fetchone()
            if old:
                if old['payload'] != encoded:
                    raise ValueError('请求标识已用于其他内容')
                return old['id'], False
            if db.execute("SELECT 1 FROM turns WHERE session_id=? AND status IN ('running','waiting_client')", (session_id,)).fetchone():
                raise ValueError('请等待当前回复或停止后再发送')
            turn_id = uuid4().hex
            db.execute('INSERT INTO turns(id,session_id,request_id,payload,status,created) VALUES (?,?,?,?,?,?)',
                       (turn_id, session_id, payload['requestId'], encoded, 'running', time.time()))
        return turn_id, True

    def turn(self, session_id, turn_id):
        with self.connect() as db:
            row = db.execute('SELECT * FROM turns WHERE id=? AND session_id=?', (turn_id, session_id)).fetchone()
            if row is None:
                raise LookupError('回合不存在')
            actions = [dict(action) for action in db.execute('SELECT * FROM actions WHERE turn_id=? ORDER BY rowid', (turn_id,))]
        return {'turnId': turn_id, 'status': row['status'], 'input': json.loads(row['payload']),
                'blocks': json.loads(row['blocks']), 'error': row['error'], 'created': row['created'],
                'actions': [{**json.loads(action['payload']), 'actionId': action['id'], 'turnId': turn_id,
                             'receipt': json.loads(action['receipt']) if action['receipt'] else None} for action in actions]}

    def append_event(self, session_id, turn_id, event_type, payload=None, event_id=None):
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            if not db.execute('SELECT 1 FROM turns WHERE id=? AND session_id=?', (turn_id, session_id)).fetchone():
                raise LookupError('回合不存在')
            if event_id:
                old = db.execute('SELECT payload FROM turn_events WHERE event_id=?', (event_id,)).fetchone()
                if old:
                    return json.loads(old['payload'])
            row = db.execute('SELECT COALESCE(MAX(seq), 0) + 1 AS seq FROM turn_events WHERE turn_id=?', (turn_id,)).fetchone()
            event = {'version': 1, 'sessionId': session_id, 'turnId': turn_id,
                     'seq': row['seq'], 'eventId': event_id or uuid4().hex, 'type': event_type,
                     **(payload or {})}
            db.execute('INSERT INTO turn_events VALUES (?,?,?,?,?,?)',
                       (turn_id, event['seq'], event['eventId'], event_type,
                        json.dumps(event, ensure_ascii=False), time.time()))
        return event

    def events(self, session_id, turn_id, after=0):
        if not isinstance(after, int) or after < 0:
            raise ValueError('事件游标必须为非负整数')
        with self.connect() as db:
            if not db.execute('SELECT 1 FROM turns WHERE id=? AND session_id=?', (turn_id, session_id)).fetchone():
                raise LookupError('回合不存在')
            return [json.loads(row['payload']) for row in db.execute(
                'SELECT payload FROM turn_events WHERE turn_id=? AND seq>? ORDER BY seq', (turn_id, after))]

    def finish(self, turn_id, status, blocks=None, error=None):
        if status not in TERMINAL:
            raise ValueError('非法结束状态')
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            if blocks is None:
                current = db.execute('SELECT blocks FROM turns WHERE id=?', (turn_id,)).fetchone()
                blocks = json.loads(current['blocks']) if current else []
                for action in db.execute('SELECT payload,receipt FROM actions WHERE turn_id=? AND receipt IS NOT NULL', (turn_id,)):
                    payload, receipt = json.loads(action['payload']), json.loads(action['receipt'])
                    if payload['capability'] != 'state.read':
                        blocks.append({'type': 'action_result', **receipt})
            db.execute("UPDATE turns SET status=?, blocks=?, error=? WHERE id=? AND status NOT IN ('completed','failed','cancelled')",
                       (status, json.dumps(blocks or [], ensure_ascii=False), error, turn_id))

    def consume_call(self, turn_id):
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            row = db.execute('SELECT status,calls,created FROM turns WHERE id=?', (turn_id,)).fetchone()
            if row is None or row['status'] in TERMINAL:
                raise ValueError('回合已结束')
            if row['calls'] >= 8 or time.time() - row['created'] >= 120:
                raise ValueError('本轮执行预算已用尽')
            db.execute('UPDATE turns SET calls=calls+1 WHERE id=?', (turn_id,))

    def present_cards(self, turn_id, cards):
        with self.connect() as db:
            db.execute("UPDATE turns SET blocks=? WHERE id=? AND status='running'",
                       (json.dumps([{'type': 'cards', 'items': cards}], ensure_ascii=False), turn_id))

    def prepare_action(self, turn_id, payload):
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            if db.execute('SELECT 1 FROM web_turns WHERE turn_id=?', (turn_id,)).fetchone():
                raise ValueError('读取网页后不能新增动作计划')
            db.execute('INSERT OR IGNORE INTO prepared_actions VALUES (?,?)',
                       (turn_id, json.dumps(payload, sort_keys=True, ensure_ascii=False)))

    def begin_web(self, turn_id):
        with self.connect() as db:
            db.execute('INSERT OR IGNORE INTO web_turns VALUES (?)', (turn_id,))

    def action_allowed(self, turn_id, payload):
        with self.connect() as db:
            if not db.execute('SELECT 1 FROM web_turns WHERE turn_id=?', (turn_id,)).fetchone():
                return True
            return db.execute('SELECT 1 FROM prepared_actions WHERE turn_id=? AND payload=?',
                              (turn_id, json.dumps(payload, sort_keys=True, ensure_ascii=False))).fetchone() is not None

    def add_source(self, turn_id, evidence):
        from datetime import datetime, timezone
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            old = next((json.loads(row['payload']) for row in db.execute('SELECT payload FROM sources WHERE turn_id=?', (turn_id,))
                        if json.loads(row['payload'])['url'] == evidence['url']), None)
            if old and old.get('origin') != 'project_reference' and evidence.get('origin') == 'project_reference':
                return old
            source = {'sourceId': old['sourceId'] if old else uuid4().hex,
                      'retrievedAt': datetime.now(timezone.utc).isoformat(), **evidence}
            db.execute('INSERT OR REPLACE INTO sources VALUES (?,?,?)',
                       (source['sourceId'], turn_id, json.dumps(source, ensure_ascii=False)))
        return source

    def sources(self, turn_id):
        with self.connect() as db:
            return [json.loads(row['payload']) for row in db.execute('SELECT payload FROM sources WHERE turn_id=? ORDER BY rowid', (turn_id,))]

    def add_action(self, turn_id, payload):
        action_id = uuid4().hex
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            row = db.execute('SELECT status FROM turns WHERE id=?', (turn_id,)).fetchone()
            if row is None or row['status'] in TERMINAL:
                raise ValueError('回合已结束')
            if payload.get('capability') != 'state.read':
                for existing in db.execute('SELECT id,payload FROM actions WHERE turn_id=?', (turn_id,)):
                    old = json.loads(existing['payload'])
                    if all(old.get(key) == payload.get(key) for key in ('capability', 'targetId', 'args')):
                        return existing['id']
            db.execute('INSERT INTO actions VALUES (?,?,?,NULL)',
                       (action_id, turn_id, json.dumps(payload, ensure_ascii=False)))
            db.execute("UPDATE turns SET status='waiting_client' WHERE id=?", (turn_id,))
        return action_id

    def receipt(self, session_id, action_id, receipt):
        if receipt.get('actionId') != action_id or receipt.get('status') not in ('succeeded', 'failed', 'cancelled', 'state_changed'):
            raise ValueError('动作回执格式错误')
        with self.connect() as db:
            db.execute('BEGIN IMMEDIATE')
            row = db.execute('SELECT a.*,t.status FROM actions a JOIN turns t ON a.turn_id=t.id WHERE a.id=? AND t.session_id=?',
                             (action_id, session_id)).fetchone()
            if row is None:
                raise LookupError('动作不存在')
            if row['receipt']:
                return json.loads(row['receipt'])
            if row['status'] in TERMINAL:
                raise ValueError('回合已结束，请重新读取实际状态')
            db.execute('UPDATE actions SET receipt=? WHERE id=?', (json.dumps(receipt, ensure_ascii=False), action_id))
            db.execute("UPDATE turns SET status='running' WHERE id=?", (row['turn_id'],))
        return receipt

    def recover_interrupted(self):
        with self.connect() as db:
            ids = [row['id'] for row in db.execute("SELECT id FROM turns WHERE status IN ('running','waiting_client')")]
        for turn_id in ids:
            self.finish(turn_id, 'failed', error='服务重启，本轮已停止；已执行动作请核对实际状态')
