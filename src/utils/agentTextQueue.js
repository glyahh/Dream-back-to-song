export function createTextBatcher(onFlush, delay = 30) {
  let buffer = ''
  let timer = null

  const flush = () => {
    clearTimeout(timer)
    timer = null
    if (!buffer) return
    const text = buffer
    buffer = ''
    onFlush(text)
  }

  return {
    push(text) {
      if (!text) return
      buffer += text
      if (!timer) timer = setTimeout(flush, delay)
    },
    flush,
    close: flush,
  }
}
