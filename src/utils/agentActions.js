import { foodContents } from './foodContents.js'
import { paintingContents } from './paintingContents.js'
import { getFoodMakingProgress, saveFoodMakingProgress } from './foodMakingProgress.js'
import { allProducts, hotProducts } from './marketProducts.js'
import { readCart, addToCart, minusFromCart } from './marketCart.js'
import { agentPageTargets } from './agentPageTargets.js'
import { readUserProfile, saveUserProfile, profileAvatars } from './userProfile.js'
import { getLocalPosts, saveLocalPosts, createLocalPost, setLocalPostLike, removeLocalPost } from './localPosts.js'
import { getLocalCreations, saveLocalCreations, createLocalCreation } from './localCreations.js'
import { getLocalFeedback, saveLocalFeedback, createLocalFeedback } from './localFeedback.js'
import { getLocalMessages, saveLocalMessages, markLocalMessageRead } from './localMessages.js'
import { legacyFoodFlows } from './legacyFoodFlows.js'

const JOURNAL_KEY = 'agent_action_journal_v1'
const feedbackState = (history) => ({ feedback: history.map(({ contact, ...record }) => record) })
const same = (left, right) => {
  if (left === right) return true
  if (!left || !right || typeof left !== 'object' || typeof right !== 'object') return false
  const keys = Object.keys(left)
  return keys.length === Object.keys(right).length && keys.every((key) =>
    Object.prototype.hasOwnProperty.call(right, key) && same(left[key], right[key]))
}

function target(id) {
  const [kind, key] = id.split(':')
  if (kind === 'legacyfood') {
    const flow = legacyFoodFlows.find((flow) => flow.key === key)
    if (!flow) throw new Error('制作流程不存在')
    return { kind, item: flow }
  }
  if (agentPageTargets[id]) return { kind, item: { id: key, route: agentPageTargets[id] } }
  const item = (kind === 'food' ? foodContents : kind === 'painting' ? paintingContents : kind === 'market' ? [...allProducts, ...hotProducts] : [])
    .find((item) => String(kind === 'market' ? item.id : item.key) === key)
  if (!item || `${kind}:${kind === 'market' ? item.id : item.key}` !== id) throw new Error('内容不存在或尚未开放')
  return { kind, item }
}

export function readAgentState(targetId) {
  const { kind, item } = target(targetId)
  if (kind === 'posts') return { posts: getLocalPosts() }
  if (kind === 'creations') return { creations: getLocalCreations() }
  if (kind === 'feedback') return feedbackState(getLocalFeedback())
  if (kind === 'messages') return { messages: getLocalMessages() }
  if (kind === 'profile') {
    const profile = readUserProfile()
    return { nickname: profile.nickname, bio: profile.bio, avatar: profile.avatar }
  }
  if (kind === 'market') {
    const quantity = readCart()[item.id] || 0
    if (!Number.isInteger(quantity) || quantity < 0) throw new Error('购物车数据异常，请核对')
    return { quantity }
  }
  return ['food', 'legacyfood'].includes(kind) ? getFoodMakingProgress(item) : null
}

export async function openAgentContent(targetId) {
  const { kind, item } = target(targetId)
  if (kind === 'legacyfood') {
    await platformCall('navigateTo', { url: `${item.detail}?id=1` })
  } else if (item.route) {
    const query = Object.entries(item.route.query).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')
    await platformCall('navigateTo', { url: item.route.path + (query ? `?${query}` : '') })
  } else if (kind === 'market') {
    uni.setStorageSync('market_detail_product', item)
    await platformCall('navigateTo', { url: `/pages/market/detail?id=${item.id}` })
  } else {
    const path = kind === 'food' ? '/pages/food/detail/content' : '/pages/lodging/painting/detail'
    await platformCall('navigateTo', { url: `${path}?key=${encodeURIComponent(item.key)}` })
  }
}

function nextState(item, capability, before) {
  if (capability === 'food.start' || capability === 'food.resume') return before || { stepIndex: 0, completed: false }
  if (!before) throw new Error('请先开始制作')
  if (capability === 'food.next' && !before.completed && before.stepIndex < item.steps.length - 1) {
    return { stepIndex: before.stepIndex + 1, completed: false }
  }
  if (capability === 'food.previous' && !before.completed && before.stepIndex > 0) return { stepIndex: before.stepIndex - 1, completed: false }
  if (capability === 'food.complete' && !before.completed && before.stepIndex === item.steps.length - 1) {
    return { ...before, completed: true }
  }
  if (capability === 'food.restart') return { stepIndex: 0, completed: false }
  throw new Error('当前步骤不支持此操作')
}

function platformCall(name, args) {
  return new Promise((resolve, reject) => uni[name]({ ...args, success: resolve, fail: reject }))
}

// Persist intent before the business write; reconcile a missing receipt against actual progress.
export async function executeAgentAction(action) {
  const result = (status, resultingState, error) => ({ actionId: action.actionId, status, resultingState,
    ...(action.targetId === 'messages:self' ? { notice: '仅本机记录；m1、m2、m3 是自带示例，不代表真实互动或物流。' } : {}),
    ...(error ? { error } : {}) })
  let journal
  let appliedReceipt = null
  try {
    journal = uni.getStorageSync(JOURNAL_KEY) || {}
    if (journal[action.actionId]?.receipt) return journal[action.actionId].receipt
    const { kind, item } = target(action.targetId)
    const navigation = ['content.open', 'painting.preview', 'course.play', 'cart.open'].includes(action.capability)
    const before = navigation ? null : readAgentState(action.targetId)
    if (action.capability === 'state.read') return result('succeeded', before)
    const pending = journal[action.actionId]
    if (pending) {
      if (pending.after !== undefined && same(before, pending.after)) {
        const receipt = result('succeeded', before)
        appliedReceipt = receipt
        uni.setStorageSync(JOURNAL_KEY, { ...journal, [action.actionId]: { receipt } })
        return receipt
      }
      if (!same(before, pending.before) || pending.after === undefined) return result('state_changed', before, '请核对实际状态')
    } else if (!navigation && !same(before, action.expectedState)) {
      return result('state_changed', before, '进度已变化')
    }
    const cartAction = kind === 'market' && allProducts.some((product) => product.id === item.id) && ['cart.add', 'cart.remove'].includes(action.capability)
    const profileAction = kind === 'profile' && ['profile.update', 'profile.avatar'].includes(action.capability)
    const postsAction = kind === 'posts' && ['posts.create', 'posts.like', 'posts.delete'].includes(action.capability)
    const creationAction = kind === 'creations' && action.capability === 'creations.create'
    const feedbackAction = kind === 'feedback' && action.capability === 'feedback.record'
    const messageAction = kind === 'messages' && action.capability === 'messages.read'
    const cartOpen = kind === 'section' && item.id === 'market' && action.capability === 'cart.open'
    if (cartAction) {
      if (Object.keys(action.args || {}).join() !== 'quantity' || !Number.isSafeInteger(action.args.quantity) || action.args.quantity < 1) {
        throw new Error('请输入正整数数量')
      }
    } else if (!profileAction && !postsAction && !creationAction && !feedbackAction && !messageAction && Object.keys(action.args || {}).length) throw new Error('动作参数不匹配')
    let after
    if (['food', 'legacyfood'].includes(kind) && action.capability.startsWith('food.')) after = nextState(item, action.capability, before)
    else if (cartAction) after = { quantity: action.capability === 'cart.add'
      ? before.quantity + action.args.quantity : Math.max(0, before.quantity - action.args.quantity) }
    else if (messageAction) {
      if (Object.keys(action.args || {}).join() !== 'id' || typeof action.args.id !== 'string') throw new Error('请选择要阅读的消息')
      after = { ...before, messages: markLocalMessageRead(before.messages, action.args.id) }
    }
    else if (feedbackAction) {
      if (Object.keys(action.args || {}).some((key) => !['content', 'rate', 'tags', 'contact'].includes(key))) throw new Error('反馈参数不匹配')
      after = { feedback: [createLocalFeedback(action.args, `f_${action.actionId}`), ...getLocalFeedback()].slice(0, 5) }
    }
    else if (creationAction) {
      if (Object.keys(action.args || {}).length !== 3 || Object.keys(action.args).some((key) => !['title', 'type', 'content'].includes(key))) throw new Error('请提供标题、类型和内容')
      after = { creations: [createLocalCreation(action.args, `c_${action.actionId}`), ...before.creations] }
    }
    else if (postsAction) {
      const args = action.args || {}
      if (action.capability === 'posts.create') {
        if (Object.keys(args).join() !== 'content') throw new Error('请提供发布内容')
        after = { posts: [createLocalPost(args.content, `p_${action.actionId}`), ...before.posts] }
      } else if (action.capability === 'posts.like') {
        if (Object.keys(args).length !== 2 || typeof args.id !== 'string' || typeof args.liked !== 'boolean') throw new Error('请选择记录与点赞状态')
        after = { posts: setLocalPostLike(before.posts, args.id, args.liked) }
      } else {
        if (Object.keys(args).join() !== 'id' || typeof args.id !== 'string') throw new Error('请选择要删除的记录')
        after = { posts: removeLocalPost(before.posts, args.id) }
      }
    }
    else if (profileAction) {
      if (action.capability === 'profile.update') {
        const fields = Object.keys(action.args || {})
        if (!fields.length || fields.some((key) => !['nickname', 'bio'].includes(key) || typeof action.args[key] !== 'string')) {
          throw new Error('请选择昵称或签名')
        }
        after = { ...before, ...action.args }
        if (!after.nickname.trim() || after.nickname.length > 16 || after.bio.length > 40) throw new Error('昵称最多 16 字，签名最多 40 字')
      } else {
        const args = action.args || {}
        if (Object.keys(args).some((key) => key !== 'index') ||
          ('index' in args && (!Number.isInteger(args.index) || args.index < 1 || args.index > profileAvatars.length))) {
          throw new Error('头像不存在')
        }
        const choices = profileAvatars.filter((avatar) => avatar !== before.avatar)
        after = { ...before, avatar: 'index' in args ? profileAvatars[args.index - 1] : choices[Math.floor(Math.random() * choices.length)] }
      }
    }
    else if (action.capability !== 'content.open' && !(kind === 'painting' && action.capability === 'painting.preview') &&
      !(kind === 'course' && action.capability === 'course.play')) {
      if (!cartOpen) throw new Error('能力尚未开放')
    }
    const journalAfter = feedbackAction ? feedbackState(after.feedback) : after
    if (cartAction && !Number.isSafeInteger(after.quantity)) throw new Error('数量超出支持范围')
    journal = { ...journal, [action.actionId]: { before, ...(journalAfter !== undefined ? { after: journalAfter } : {}) } }
    uni.setStorageSync(JOURNAL_KEY, journal)
    if (['food', 'legacyfood'].includes(kind) && after !== undefined) saveFoodMakingProgress(item, after)
    if (profileAction) saveUserProfile({ ...readUserProfile(), ...after })
    if (postsAction) saveLocalPosts(after.posts)
    if (creationAction) saveLocalCreations(after.creations)
    if (feedbackAction) saveLocalFeedback(after.feedback)
    if (messageAction) saveLocalMessages(after.messages)
    if (cartAction) {
      if (action.capability === 'cart.add') addToCart(String(item.id), action.args.quantity)
      else minusFromCart(String(item.id), action.args.quantity)
    }
    if (action.capability === 'content.open') {
      await openAgentContent(action.targetId)
    } else if (action.capability === 'painting.preview') {
      await platformCall('previewImage', { current: item.image, urls: [item.image] })
    } else if (action.capability === 'course.play') {
      await platformCall('navigateTo', { url: `/pages/clothes/course/player?id=${item.id}` })
    } else if (cartOpen) {
      await platformCall('navigateTo', { url: '/pages/market/market?cart=1' })
    }
    const receipt = result('succeeded', navigation ? null : readAgentState(action.targetId))
    appliedReceipt = receipt
    uni.setStorageSync(JOURNAL_KEY, { ...journal, [action.actionId]: { receipt } })
    return receipt
  } catch (error) {
    if (appliedReceipt) return { ...appliedReceipt, error: '业务操作已成功；回执记账失败，需按执行前记录核对，禁止重复执行。' }
    return result('failed', undefined, error.message || error.errMsg || '操作未完成')
  }
}
