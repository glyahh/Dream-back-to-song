import assert from 'node:assert/strict'
import test from 'node:test'
import { createAgentStream, SseParser } from '../src/utils/agentStream.js'

test('SSE parser handles split frames and multiline data', () => {
  const events = []
  const parser = new SseParser((event) => events.push(event))
  parser.push('id: 1\nevent: text_delta\ndata: {"delta":"你')
  parser.push('好"}\n\ndata: second\n')
  parser.push('data: line\n\n')
  assert.equal(events[0].id, '1')
  assert.equal(events[0].type, 'text_delta')
  assert.deepEqual(events[0].payload, { delta: '你好' })
  assert.equal(events[1].data, 'second\nline')
})

test('SSE client reconnects from the last event cursor', async () => {
  const original = globalThis.EventSource
  const instances = []
  class FakeEventSource {
    constructor(url) { this.url = url; this.listeners = {}; instances.push(this) }
    addEventListener(type, listener) { this.listeners[type] = listener }
    close() { this.closed = true }
    emit(type, payload, id) { this.listeners[type]?.({ type, data: JSON.stringify(payload), lastEventId: String(id) }) }
    fail() { this.onerror?.(new Error('offline')) }
  }
  globalThis.EventSource = FakeEventSource
  const received = []
  const stream = createAgentStream({ url: 'http://localhost/events', after: 2, onEvent: (event) => received.push(event.payload) })
  instances[0].emit('text_delta', { version: 1, turnId: 't', seq: 3, delta: '你' }, 3)
  instances[0].fail()
  await new Promise((resolve) => setTimeout(resolve, 300))
  assert.equal(instances.length, 2)
  assert.match(instances[1].url, /after=3$/)
  instances[1].emit('text_delta', { version: 1, turnId: 't', seq: 4, delta: '好' }, 4)
  assert.deepEqual(received.map((item) => item.delta), ['你', '好'])
  stream.close()
  globalThis.EventSource = original
})
