const INDEX_KEY = 'video_cache_index_v1'

function now() {
  return Date.now()
}

function getIndex() {
  const raw = uni.getStorageSync(INDEX_KEY)
  if (!raw) return { totalSize: 0, items: {} }
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw
    if (!parsed || typeof parsed !== 'object') return { totalSize: 0, items: {} }
    if (!parsed.items || typeof parsed.items !== 'object') return { totalSize: 0, items: {} }
    if (typeof parsed.totalSize !== 'number') parsed.totalSize = 0
    return parsed
  } catch {
    return { totalSize: 0, items: {} }
  }
}

function setIndex(index) {
  uni.setStorageSync(INDEX_KEY, JSON.stringify(index))
}

function getFileSize(path) {
  return new Promise((resolve, reject) => {
    wx.getFileInfo({
      filePath: path,
      success: (res) => resolve(res.size || 0),
      fail: reject
    })
  })
}

function removeSavedFile(savedFilePath) {
  return new Promise((resolve, reject) => {
    wx.removeSavedFile({
      filePath: savedFilePath,
      success: () => resolve(),
      fail: reject
    })
  })
}

function fileExists(path) {
  return new Promise((resolve) => {
    if (!path) {
      resolve(false)
      return
    }
    wx.getFileInfo({
      filePath: path,
      success: () => resolve(true),
      fail: () => resolve(false)
    })
  })
}

async function enforceCacheLimit(maxBytes) {
  const index = getIndex()
  const entries = Object.entries(index.items)
    .map(([url, meta]) => ({ url, ...meta }))
    .sort((a, b) => (a.lastAccess || 0) - (b.lastAccess || 0))

  let total = index.totalSize || 0
  for (const entry of entries) {
    if (total <= maxBytes) break
    try {
      await removeSavedFile(entry.savedFilePath)
    } catch {
      // ignore removal failure; still drop index entry to avoid being stuck
    }
    total -= entry.size || 0
    delete index.items[entry.url]
  }

  index.totalSize = Math.max(0, total)
  setIndex(index)
}

async function getCachedFile(url) {
  const index = getIndex()
  const item = index.items[url]
  if (!item || !item.savedFilePath) return null

  const exists = await fileExists(item.savedFilePath)
  if (!exists) {
    delete index.items[url]
    index.totalSize = Math.max(0, (index.totalSize || 0) - (item.size || 0))
    setIndex(index)
    return null
  }

  // Touch LRU before play
  item.lastAccess = now()
  setIndex(index)
  return item.savedFilePath
}

async function downloadAndCache(url, { maxBytes = 200 * 1024 * 1024 } = {}) {
  const index = getIndex()

  const tempFilePath = await new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300 && res.tempFilePath) resolve(res.tempFilePath)
        else reject(new Error(`download failed: statusCode=${res.statusCode}`))
      },
      fail: reject
    })
  })

  const savedFilePath = await new Promise((resolve, reject) => {
    wx.saveFile({
      tempFilePath,
      success: (res) => resolve(res.savedFilePath),
      fail: reject
    })
  })

  const size = await getFileSize(savedFilePath)
  const existed = index.items[url]
  if (existed && existed.savedFilePath && existed.savedFilePath !== savedFilePath) {
    try {
      await removeSavedFile(existed.savedFilePath)
    } catch {
      // ignore
    }
    index.totalSize = Math.max(0, (index.totalSize || 0) - (existed.size || 0))
  }

  index.items[url] = {
    savedFilePath,
    size,
    lastAccess: now()
  }
  index.totalSize = (index.totalSize || 0) + size
  setIndex(index)

  await enforceCacheLimit(maxBytes)
  return savedFilePath
}

export { downloadAndCache, enforceCacheLimit, getCachedFile }

