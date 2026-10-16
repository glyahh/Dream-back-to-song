export const feedbackTags = ['界面设计', '交互体验', '内容建议', '功能需求', '性能问题']

export function getLocalFeedback() {
  const stored = uni.getStorageSync('me_feedback_history')
  if (!stored) return []
  if (!Array.isArray(stored)) throw new Error('反馈记录格式异常')
  return stored
}

export function saveLocalFeedback(history) {
  uni.setStorageSync('me_feedback_history', history.slice(0, 5))
}

export function createLocalFeedback(form, id = `f_${Date.now()}`) {
  if (typeof form.content !== 'string' || !form.content.trim() || form.content.length > 300) throw new Error('反馈内容需为 1–300 字')
  const rate = form.rate ?? 5
  const tags = form.tags ?? []
  const contact = form.contact ?? ''
  if (!Number.isInteger(rate) || rate < 1 || rate > 5 || !Array.isArray(tags) || tags.some((tag) => !feedbackTags.includes(tag)) || typeof contact !== 'string') {
    throw new Error('反馈参数不匹配')
  }
  const now = new Date()
  const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  return { id, time, rate, tags, content: form.content.trim(), contact: contact.trim() }
}
