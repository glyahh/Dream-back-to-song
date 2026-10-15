const STORAGE_KEY = 'food_making_progress_v1'

function readProgressMap() {
  const value = uni.getStorageSync(STORAGE_KEY)
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {}
}

export function getFoodMakingProgress(food) {
  const record = readProgressMap()[food.key]
  if (!record || !Number.isInteger(record.stepIndex) || record.stepIndex < 0 ||
      record.stepIndex >= food.steps.length || typeof record.completed !== 'boolean' ||
      (record.completed && record.stepIndex !== food.steps.length - 1)) {
    return null
  }
  return { stepIndex: record.stepIndex, completed: record.completed }
}

export function saveFoodMakingProgress(food, progress) {
  const all = readProgressMap()
  uni.setStorageSync(STORAGE_KEY, {
    ...all,
    [food.key]: { stepIndex: progress.stepIndex, completed: progress.completed },
  })
}
