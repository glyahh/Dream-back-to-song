const PROFILE_STORAGE_KEY = 'me_profile'

const DEFAULT_PROFILE = {
  nickname: '烟雨朦胧',
  avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/avatar.png',
  bio: '',
  phone: '',
}

export const profileAvatars = Array.from({ length: 10 }, (_, index) =>
  `https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang${index + 1}.png`)

export function readUserProfile() {
  const stored = uni.getStorageSync(PROFILE_STORAGE_KEY)
  if (stored && (typeof stored !== 'object' || Array.isArray(stored))) throw new Error('个人资料格式异常')
  return { ...DEFAULT_PROFILE, ...(stored || {}) }
}

export function getUserProfile() {
  try {
    return readUserProfile()
  } catch (e) {
    // ignore storage error, fallback to default
  }
  return { ...DEFAULT_PROFILE }
}

export function saveUserProfile(profile) {
  try {
    const data = {
      nickname: profile.nickname || DEFAULT_PROFILE.nickname,
      avatar: profile.avatar || DEFAULT_PROFILE.avatar,
      bio: profile.bio || '',
      phone: profile.phone || '',
    }
    uni.setStorageSync(PROFILE_STORAGE_KEY, data)
    return data
  } catch (e) {
    // 向上抛出，方便页面按需提示
    throw e
  }
}

