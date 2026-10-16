export function getLocalPosts() {
  const stored = uni.getStorageSync('me_posts')
  if (!stored) return []
  if (!Array.isArray(stored)) throw new Error('发布记录格式异常')
  return stored
}

export function saveLocalPosts(posts) {
  uni.setStorageSync('me_posts', posts)
}

export function createLocalPost(content, id = `p_${Date.now()}`) {
  if (typeof content !== 'string' || !content.trim() || content.length > 120) throw new Error('内容需为 1–120 字')
  const now = new Date()
  const time = `${now.getMonth() + 1}月${String(now.getDate()).padStart(2, '0')}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  return { id, content, time, likes: 0, liked: false, topic: '#生活在宋朝' }
}

export function setLocalPostLike(posts, id, liked) {
  if (!posts.some((post) => post.id === id)) throw new Error('发布记录不存在')
  return posts.map((post) => post.id === id
    ? { ...post, liked, likes: post.likes + (liked === post.liked ? 0 : liked ? 1 : -1) }
    : post)
}

export function removeLocalPost(posts, id) {
  if (!posts.some((post) => post.id === id)) throw new Error('发布记录不存在')
  return posts.filter((post) => post.id !== id)
}
