const PROFILE_STORAGE_KEY = 'me_profile'

const DEFAULT_PROFILE = {
  nickname: '烟雨朦胧',
  avatar: '/static/avatar.png',
  bio: '',
  phone: '',
}

export function getUserProfile() {
  try {
    const stored = uni.getStorageSync(PROFILE_STORAGE_KEY)
    if (stored && typeof stored === 'object') {
      return { ...DEFAULT_PROFILE, ...stored }
    }
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

