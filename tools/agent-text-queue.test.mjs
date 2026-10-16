import assert from 'node:assert/strict'
import test from 'node:test'
import { createTextBatcher } from '../src/utils/agentTextQueue.js'

test('text batcher merges chunks and flushes on close', () => {
  const output = []
  const queue = createTextBatcher((text) => output.push(text), 1000)
  queue.push('你')
  queue.push('好')
  assert.deepEqual(output, [])
  queue.close()
  assert.deepEqual(output, ['你好'])
})

test('text batcher flushes automatically once per interval', async () => {
  const output = []
  const queue = createTextBatcher((text) => output.push(text), 10)
  queue.push('宋')
  queue.push('朝')
  await new Promise((resolve) => setTimeout(resolve, 25))
  assert.deepEqual(output, ['宋朝'])
  queue.close()
})
