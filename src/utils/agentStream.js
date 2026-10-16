const EVENTS = ['turn_started', 'text_delta', 'turn_waiting_client', 'turn_completed', 'turn_failed', 'turn_cancelled', 'heartbeat']

export class SseParser {
  constructor(onEvent) { this.onEvent = onEvent; this.buffer = ''; this.event = {}; this.data = [] }
  push(chunk) {
    this.buffer += chunk
    const lines = this.buffer.split(/\r?\n/)
    this.buffer = lines.pop() || ''
    for (const line of lines) {
      if (line === '') { this.flush(); continue }
      if (line.startsWith(':')) continue
      const index = line.indexOf(':')
      const field = index < 0 ? line : line.slice(0, index)
      const value = index < 0 ? '' : line.slice(index + 1).replace(/^ /, '')
      if (field === 'id') this.event.id = value
      else if (field === 'event') this.event.type = value
      else if (field === 'data') this.data.push(value)
    }
  }
  flush() {
    if (!this.data.length) { this.event = {}; return }
    const event = { ...this.event, data: this.data.join('\n') }
    this.event = {}; this.data = []
    try { event.payload = JSON.parse(event.data) } catch { event.payload = null }
    this.onEvent(event)
  }
}

function decodeChunk(value, decoder) {
  if (typeof value === 'string') return value
  if (!(value instanceof ArrayBuffer)) return ''
  if (decoder) return decoder.decode(new Uint8Array(value), { stream: true })
  let binary = ''
  for (const byte of new Uint8Array(value)) binary += String.fromCharCode(byte)
  try { return decodeURIComponent(binary.split('').map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join('')) }
  catch { return binary }
}

export function createAgentStream({ url, after = 0, onEvent, onError, onOpen, onClose }) {
  let closed = false
  let source = null
  let task = null
  let timer = null
  let retry = 0
  let cursor = Number(after) || 0
  const parser = new SseParser((event) => {
    const payload = event.payload
    if (payload && Number.isInteger(payload.seq) && payload.seq > cursor) cursor = payload.seq
    onEvent?.({ ...event, cursor })
  })
  const endpoint = () => `${url}${url.includes('?') ? '&' : '?'}after=${cursor}`
  const fail = (error) => {
    if (closed) return
    source?.close?.(); source = null; task?.abort?.(); task = null
    onError?.(error)
    const delay = Math.min(8000, 250 * (2 ** retry++))
    clearTimeout(timer)
    timer = setTimeout(connect, delay)
  }
  const connectH5 = () => {
    if (typeof EventSource === 'undefined') return false
    source = new EventSource(endpoint())
    const handle = (event) => {
      if (event.data) parser.push(`id: ${event.lastEventId || ''}\nevent: ${event.type}\ndata: ${event.data}\n\n`)
    }
    source.onopen = () => { retry = 0; onOpen?.() }
    source.onerror = () => fail(new Error('流式连接已断开'))
    source.onmessage = handle
    EVENTS.forEach((type) => source.addEventListener(type, handle))
    return true
  }
  const connectMini = () => {
    if (typeof uni === 'undefined' || typeof uni.request !== 'function') return false
    const decoder = typeof TextDecoder === 'function' ? new TextDecoder('utf-8') : null
    task = uni.request({
      url: endpoint(), method: 'GET', responseType: 'arraybuffer', enableChunked: true,
      success: () => { if (!closed && !source) fail(new Error('流式响应提前结束')) },
      fail: fail,
    })
    if (!task || typeof task.onChunkReceived !== 'function') {
      task?.abort?.(); task = null
      return false
    }
    task.onChunkReceived((chunk) => {
      parser.push(decodeChunk(chunk.data, decoder))
      onOpen?.()
    })
    return true
  }
  const connect = () => {
    if (closed) return
    if (connectH5() || connectMini()) return
    fail(new Error('当前客户端不支持流式响应'))
  }
  connect()
  return {
    close() {
      closed = true; clearTimeout(timer); source?.close?.(); task?.abort?.(); source = null; task = null
      onClose?.()
    },
    get cursor() { return cursor },
  }
}
