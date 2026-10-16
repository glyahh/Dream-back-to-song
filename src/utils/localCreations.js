export const creationTypes = ['服饰设计', '饮食随笔', '建筑手稿', '出行见闻', '其他']

const example = {
  id: 'c1', title: '浅绛团花褙子草图', type: '服饰设计',
  excerpt: '试着把宋画里的团花纹样移到褙子下摆，底色用淡绛，花纹改成更细密的线条……',
  content: '', time: '2026-02-01 晚上', words: 68, mood: '心静如水',
}

export function getLocalCreations() {
  const stored = uni.getStorageSync('me_creations')
  if (!stored) return [{ ...example }]
  if (!Array.isArray(stored)) throw new Error('创作记录格式异常')
  return stored
}

export function saveLocalCreations(creations) {
  uni.setStorageSync('me_creations', creations)
}

export function createLocalCreation(form, id = `c_${Date.now()}`) {
  if (typeof form.title !== 'string' || !form.title.trim()) throw new Error('请填写标题')
  if (!creationTypes.includes(form.type)) throw new Error('请选择创作类型')
  if (typeof form.content !== 'string' || !form.content.trim() || form.content.length > 400) throw new Error('创作内容需为 1–400 字')
  const now = new Date()
  const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  return { id, title: form.title.trim(), type: form.type, content: form.content,
    excerpt: form.content.length > 50 ? `${form.content.slice(0, 50)}…` : form.content,
    time, words: form.content.length, mood: '宋风正浓' }
}
