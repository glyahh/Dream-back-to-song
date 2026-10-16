import { legacyFoodFlows } from './legacyFoodFlows.js'
import { getFoodMakingProgress, saveFoodMakingProgress } from './foodMakingProgress.js'

const legacyPages = new Map(legacyFoodFlows.flatMap((flow) => [
  ...flow.steps.map((route, stepIndex) => [route.slice(1), { flow, progress: { stepIndex, completed: false } }]),
  [flow.complete.slice(1), { flow, progress: { stepIndex: flow.steps.length - 1, completed: true } }],
]))

export function trackLegacyFoodPage(route) {
  const page = legacyPages.get(route)
  if (!page) return
  const saved = getFoodMakingProgress(page.flow)
  if (saved?.stepIndex !== page.progress.stepIndex || saved?.completed !== page.progress.completed) {
    saveFoodMakingProgress(page.flow, page.progress)
  }
}

export const legacyFoodPageMixin = {
  onShow() {
    const pages = getCurrentPages()
    const route = pages[pages.length - 1]?.route
    try { trackLegacyFoodPage(route) }
    catch { uni.showToast({ title: '进度未保存，请重试', icon: 'none' }) }
  },
}
