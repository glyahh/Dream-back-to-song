const defaultMessages = [
  {
    id: 'm1', category: 'system', title: '欢迎来到「梦回宋朝」',
    preview: '为你准备了一份宋风指南，带你从衣食住行走进画卷。',
    content: '欢迎来到「梦回宋朝」。你可以从首页的「遇见宋朝」开始，按衣、食、住、行慢慢浏览，也可以在「发现」页关注你喜欢的作者，或者在「集市」中收集几件宋风好物。',
    time: '昨天 21:40', read: false,
  },
  {
    id: 'm2', category: 'social', title: '山河入梦 赞了你的发布', preview: '「用《山家清供》里的方子做了碗蟹酿橙……」',
    content: '山河入梦 赞了你的发布：「用《山家清供》里的方子做了碗蟹酿橙……」。对方觉得你的宋风生活很有味道。',
    time: '今天 09:12', read: false,
  },
  {
    id: 'm3', category: 'order', title: '订单已发货', preview: '你的「风荷雅盏 · 茶杯」已由汴京驿站发出。',
    content: '你的「风荷雅盏 · 茶杯」已由汴京驿站打包发出，预计三至五日抵达。收货后记得在「我的订单」中确认哦。',
    time: '02-01 20:30', read: true,
  },
]

export function getLocalMessages() {
  const stored = uni.getStorageSync('me_messages')
  if (!stored) return defaultMessages.map((message) => ({ ...message }))
  if (!Array.isArray(stored)) throw new Error('消息记录格式异常')
  return stored
}

export function saveLocalMessages(messages) {
  uni.setStorageSync('me_messages', messages)
}

export function markLocalMessageRead(messages, id) {
  if (!messages.some((message) => message.id === id)) throw new Error('消息不存在')
  return messages.map((message) => message.id === id ? { ...message, read: true } : message)
}
