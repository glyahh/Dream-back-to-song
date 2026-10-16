import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const load = (path) => import(`data:text/javascript,${encodeURIComponent(read(path))}`)
const { foodContents } = await load('src/utils/foodContents.js')
const { paintingContents } = await load('src/utils/paintingContents.js')
const { allProducts, hotProducts, newProducts } = await load('src/utils/marketProducts.js')
const { agentPageTargets } = await load('src/utils/agentPageTargets.js')
const { legacyFoodFlows } = await load('src/utils/legacyFoodFlows.js')

function fixture(failWrites = false) {
  const storage = {}
  const toasts = []
  const navigations = []
  let writes = 0
  let journalWrites = 0
  const uni = {
    getStorageSync: (key) => storage[key],
    setStorageSync: (key, value) => {
      if (key === 'agent_action_journal_v1') journalWrites++
      if (failWrites === true || (typeof failWrites === 'number' && key === 'agent_action_journal_v1' && journalWrites === failWrites)) throw new Error('storage unavailable')
      storage[key] = structuredClone(value)
      if (key === 'food_making_progress_v1') writes++
    },
    navigateTo: ({ url, success }) => { navigations.push(url); success() }, previewImage: ({ success }) => success(),
    showToast: (options) => toasts.push(options),
  }
  const source = read('src/utils/foodMakingProgress.js').replace(/^export /gm, '') + '\n' +
    read('src/utils/marketCart.js').replace(/^export /gm, '') + '\n' +
    read('src/utils/userProfile.js').replace(/^export /gm, '') + '\n' +
    read('src/utils/localPosts.js').replace(/^export /gm, '') + '\n' +
    read('src/utils/localCreations.js').replace(/^export /gm, '') + '\n' +
    read('src/utils/localFeedback.js').replace(/^export /gm, '') + '\n' +
    read('src/utils/localMessages.js').replace(/^export /gm, '') + '\n' +
    read('src/utils/legacyFoodProgress.js').replace(/^import .*\n/gm, '').replace(/^export /gm, '') + '\n' +
    read('src/utils/agentActions.js').replace(/^import .*\n/gm, '').replace(/^export /gm, '')
  const api = runInNewContext(source + '\n({ executeAgentAction, readAgentState, openAgentContent, getLocalPosts, saveLocalPosts, createLocalPost, setLocalPostLike, removeLocalPost, creationTypes, getLocalCreations, saveLocalCreations, createLocalCreation, feedbackTags, getLocalFeedback, saveLocalFeedback, createLocalFeedback, getLocalMessages, saveLocalMessages, markLocalMessageRead, trackLegacyFoodPage })', { uni, foodContents, paintingContents, allProducts, hotProducts, agentPageTargets, legacyFoodFlows })
  return { ...api, uni, storage, toasts, navigations, writes: () => writes }
}

test('12 道菜完整闭环、原页面进度一致、重复动作不推进', async () => {
  const api = fixture()
  let id = 0
  for (const food of foodContents) {
    const targetId = `food:${food.key}`
    const perform = async (capability) => {
      const action = { actionId: `action-${++id}`, targetId, capability, args: {}, expectedState: api.readAgentState(targetId) }
      const receipt = await api.executeAgentAction(action)
      assert.equal(receipt.status, 'succeeded')
      const writes = api.writes()
      assert.equal(JSON.stringify(await api.executeAgentAction(action)), JSON.stringify(receipt))
      assert.equal(api.writes(), writes)
      return receipt
    }
    await perform('food.start')
    await perform('food.resume')
    await perform('food.next')
    await perform('food.previous')
    for (let i = 1; i < food.steps.length; i++) await perform('food.next')
    await perform('food.complete')
    assert.equal(api.storage.food_making_progress_v1[food.key].completed, true)
    await perform('food.restart')
    assert.equal(api.storage.food_making_progress_v1[food.key].stepIndex, 0)
    assert.equal(api.storage.food_making_progress_v1[food.key].completed, false)
  }
})

test('旧状态拒绝执行，业务写入后丢回执能对账且不重复下一步', async () => {
  const api = fixture()
  const targetId = 'food:suzhengqiezi'
  api.storage.food_making_progress_v1 = { suzhengqiezi: { stepIndex: 1, completed: false } }
  const action = { actionId: 'lost', capability: 'food.next', targetId, args: {}, expectedState: { stepIndex: 0, completed: false } }
  assert.equal((await api.executeAgentAction(action)).status, 'state_changed')
  api.storage.agent_action_journal_v1 = { lost: { before: action.expectedState, after: { stepIndex: 1, completed: false } } }
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal(api.writes(), 0)
  assert.equal(api.storage.food_making_progress_v1.suzhengqiezi.stepIndex, 1)
})

test('未知能力和提前完成不会写入进度，存储错误返回失败', async () => {
  const api = fixture()
  const base = { targetId: 'food:suzhengqiezi', args: {}, expectedState: null }
  assert.equal((await api.executeAgentAction({ ...base, actionId: 'unknown', capability: 'shell' })).status, 'failed')
  assert.equal((await api.executeAgentAction({ ...base, actionId: 'early', capability: 'food.complete' })).status, 'failed')
  assert.equal(api.writes(), 0)
  const brokenStorage = fixture(true)
  assert.equal((await brokenStorage.executeAgentAction({ ...base, actionId: 'disk-full', capability: 'food.start' })).status, 'failed')
  assert.equal(brokenStorage.writes(), 0)
})

test('明确重做可以重置进行中的目标菜品，不影响其他菜品', async () => {
  const api = fixture()
  api.storage.food_making_progress_v1 = {
    suzhengqiezi: { stepIndex: 2, completed: false },
    sutang: { stepIndex: 1, completed: false },
  }
  const receipt = await api.executeAgentAction({ actionId: 'restart-current', targetId: 'food:suzhengqiezi',
    capability: 'food.restart', args: {}, expectedState: { stepIndex: 2, completed: false } })
  assert.equal(receipt.status, 'succeeded')
  assert.equal(api.storage.food_making_progress_v1.suzhengqiezi.stepIndex, 0)
  assert.equal(api.storage.food_making_progress_v1.sutang.stepIndex, 1)
})

test('真实商品加入、扣减与重复动作和丢回执对账，保持原购物车格式', async () => {
  const api = fixture()
  const action = { actionId: 'cart-add', targetId: 'market:101', capability: 'cart.add', args: { quantity: 3 }, expectedState: { quantity: 0 } }
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal(JSON.parse(api.storage.market_cart)['101'], 3)
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal(JSON.parse(api.storage.market_cart)['101'], 3)
  api.storage.agent_action_journal_v1 = { 'cart-add': { before: { quantity: 0 }, after: { quantity: 3 } } }
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal(JSON.parse(api.storage.market_cart)['101'], 3)
  assert.equal((await api.executeAgentAction({ ...action, actionId: 'cart-remove', capability: 'cart.remove', args: { quantity: 5 }, expectedState: { quantity: 3 } })).status, 'succeeded')
  assert.equal(JSON.parse(api.storage.market_cart)['101'], undefined)
})

test('损坏的购物车不能被当成空购物车覆盖；未完成的结算能力不可执行', async () => {
  const api = fixture()
  api.storage.market_cart = '{bad json'
  const action = { actionId: 'broken-cart', targetId: 'market:101', capability: 'cart.add', args: { quantity: 1 }, expectedState: { quantity: 0 } }
  assert.equal((await api.executeAgentAction(action)).status, 'failed')
  assert.equal(api.storage.market_cart, '{bad json')
  api.storage.market_cart = '{}'
  assert.equal((await api.executeAgentAction({ ...action, actionId: 'checkout', capability: 'cart.checkout' })).status, 'failed')
  assert.equal(api.storage.market_cart, '{}')
  assert.equal((await api.executeAgentAction({ ...action, actionId: 'display-only', targetId: 'market:1' })).status, 'failed')
})

test('发布后打开页面不要求复制业务状态，重复投递不再次导航', async () => {
  const api = fixture()
  api.storage.me_posts = [{ id: 'published', content: '已发布', likes: 0, liked: false }]
  const action = { actionId: 'open-posts-after-publish', targetId: 'posts:self', capability: 'content.open', args: {}, expectedState: null }
  const receipt = await api.executeAgentAction(action)
  assert.equal(receipt.status, 'succeeded')
  assert.equal(api.navigations.at(-1), '/pages/me/posts')
  assert.equal(api.storage.me_posts.length, 1)
  await api.executeAgentAction(action)
  assert.equal(api.navigations.length, 1)
  // A navigation must still work when the page needs to handle a storage read error itself.
  api.storage.me_posts = 'damaged'
  assert.equal((await api.executeAgentAction({ ...action, actionId: 'open-posts-for-recovery' })).status, 'succeeded')
})

test('已核验的服饰、建筑、视频可以打开，未完成推荐不能顶替为默认内容', async () => {
  const api = fixture()
  for (const targetId of Object.keys(agentPageTargets)) {
    const receipt = await api.executeAgentAction({ actionId: `open-${targetId}`, targetId, capability: 'content.open', args: {}, expectedState: api.readAgentState(targetId) })
    assert.equal(receipt.status, 'succeeded', targetId)
  }
  assert.equal((await api.executeAgentAction({ actionId: 'play', targetId: 'course:1', capability: 'course.play', args: {}, expectedState: null })).status, 'succeeded')
  assert.equal((await api.executeAgentAction({ actionId: 'missing-outfit', targetId: 'outfit:3', capability: 'content.open', args: {}, expectedState: null })).status, 'failed')
})

test('个人资料复用原保存函数，保留手机号且不上传；重复换头像保持同一结果', async () => {
  const api = fixture()
  api.storage.me_profile = { nickname: '旧昵称', bio: '旧签名', avatar: 'old-avatar', phone: 'private-phone' }
  const before = api.readAgentState('profile:self')
  assert.equal(before.phone, undefined)
  const receipt = await api.executeAgentAction({ actionId: 'profile-update', targetId: 'profile:self', capability: 'profile.update',
    args: { nickname: '江南', bio: '听雨' }, expectedState: before })
  assert.equal(receipt.status, 'succeeded')
  assert.equal(api.storage.me_profile.phone, 'private-phone')
  assert.equal(api.storage.me_profile.nickname, '江南')
  const avatarAction = { actionId: 'profile-avatar', targetId: 'profile:self', capability: 'profile.avatar', args: {}, expectedState: api.readAgentState('profile:self') }
  const avatar = await api.executeAgentAction(avatarAction)
  assert.equal(avatar.status, 'succeeded')
  assert.notEqual(avatar.resultingState.avatar, 'old-avatar')
  assert.equal(JSON.stringify(await api.executeAgentAction(avatarAction)), JSON.stringify(avatar))
  assert.equal(api.storage.me_profile.avatar, avatar.resultingState.avatar)
})

test('本机发布、点赞、删除及动作重放，原页面读取同一份记录', async () => {
  const api = fixture()
  const create = { actionId: 'new-post', targetId: 'posts:self', capability: 'posts.create',
    args: { content: '今天试做素蒸茄子。' }, expectedState: { posts: [] } }
  assert.equal((await api.executeAgentAction(create)).status, 'succeeded')
  assert.equal((await api.executeAgentAction(create)).status, 'succeeded')
  assert.equal(api.getLocalPosts().length, 1)
  assert.equal(api.getLocalPosts()[0].content, '今天试做素蒸茄子。')
  const id = api.getLocalPosts()[0].id
  assert.equal((await api.executeAgentAction({ actionId: 'like-post', targetId: 'posts:self', capability: 'posts.like',
    args: { id, liked: true }, expectedState: api.readAgentState('posts:self') })).status, 'succeeded')
  assert.equal(api.getLocalPosts()[0].likes, 1)
  assert.equal((await api.executeAgentAction({ actionId: 'delete-post', targetId: 'posts:self', capability: 'posts.delete',
    args: { id }, expectedState: api.readAgentState('posts:self') })).status, 'succeeded')
  assert.equal(api.getLocalPosts().length, 0)
})

test('原发布页面在存储失败时保留草稿且不误报成功', () => {
  const api = fixture(true)
  const module = { exports: {} }
  const script = read('src/pages/me/posts.vue').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  runInNewContext(script, { module, ...api })
  const options = module.exports
  const page = options.data()
  for (const [name, method] of Object.entries(options.methods)) page[name] = method.bind(page)
  options.onShow.call(page)
  page.draft = '保留这段草稿'
  page.publish()
  assert.equal(page.draft, '保留这段草稿')
  assert.equal(page.posts.length, 0)
  assert.ok(api.toasts.some(({ title }) => title.includes('未保存')))
  assert.ok(!api.toasts.some(({ title }) => title === '已发布'))
})

test('创作复用原有记录格式，重复保存不新增，失败不丢编辑内容', async () => {
  const api = fixture()
  const form = { title: '蒸茄子手记', type: '饮食随笔', content: '蒸好后拌入调味汁。' }
  const action = { actionId: 'creation-new', targetId: 'creations:self', capability: 'creations.create', args: form,
    expectedState: api.readAgentState('creations:self') }
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal(api.getLocalCreations().length, 2)
  assert.equal(api.getLocalCreations()[0].title, form.title)
  assert.equal(api.getLocalCreations()[0].words, form.content.length)
  const broken = fixture(true)
  const module = { exports: {} }
  const script = read('src/pages/me/creations.vue').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  runInNewContext(script, { module, ...broken })
  const options = module.exports
  const page = options.data()
  for (const [name, method] of Object.entries(options.methods)) page[name] = method.bind(page)
  options.onShow.call(page)
  page.form = form
  page.showEditor = true
  page.submit()
  assert.equal(page.showEditor, true)
  assert.equal(page.form.content, form.content)
  assert.equal(page.creations.length, 1)
  assert.ok(!broken.toasts.some(({ title }) => title === '已保存'))
})

test('反馈保留最近五条且不上传历史联系方式，失败保留输入', async () => {
  const api = fixture()
  for (let index = 0; index < 6; index++) {
    const action = { actionId: `feedback-${index}`, targetId: 'feedback:self', capability: 'feedback.record',
      args: { content: `建议${index}`, contact: 'private-contact' }, expectedState: api.readAgentState('feedback:self') }
    const receipt = await api.executeAgentAction(action)
    assert.equal(receipt.status, 'succeeded')
    assert.equal(JSON.stringify(receipt).includes('private-contact'), false)
    assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  }
  assert.equal(api.getLocalFeedback().length, 5)
  assert.equal(api.getLocalFeedback()[0].content, '建议5')
  assert.equal(api.getLocalFeedback()[0].contact, 'private-contact')
  const broken = fixture(true)
  const module = { exports: {} }
  const script = read('src/pages/me/feedback.vue').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  runInNewContext(script, { module, ...broken })
  const options = module.exports
  const page = options.data()
  for (const [name, method] of Object.entries(options.methods)) page[name] = method.bind(page)
  options.onShow.call(page)
  page.form.content = '请保留反馈'
  page.submit()
  assert.equal(page.form.content, '请保留反馈')
  assert.ok(!broken.toasts.some(({ title }) => title === '感谢你的反馈'))
})

test('本机示例消息有明确标识，已读回执与原页面状态一致且不重放', async () => {
  const api = fixture()
  const readReceipt = await api.executeAgentAction({ actionId: 'read-messages-state', targetId: 'messages:self', capability: 'state.read' })
  const state = readReceipt.resultingState
  assert.ok(readReceipt.notice.includes('示例'))
  assert.equal(state.notice, undefined, '说明属于回执元信息，不参与实际业务状态比较')
  assert.equal(state.messages[0].read, false)
  const action = { actionId: 'read-message', targetId: 'messages:self', capability: 'messages.read', args: { id: 'm1' }, expectedState: state }
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal(api.getLocalMessages()[0].read, true)
  assert.equal(api.getLocalMessages()[1].read, false)
  const broken = fixture(true)
  assert.equal((await broken.executeAgentAction({ ...action, actionId: 'read-failed', expectedState: broken.readAgentState('messages:self') })).status, 'failed')
  assert.equal(broken.getLocalMessages()[0].read, false)
})

test('业务写入成功但回执记账失败时以实际状态为准，保留对账记录且不重复执行', async () => {
  const api = fixture(2)
  const action = { actionId: 'journal-fails', targetId: 'food:suzhengqiezi', capability: 'food.start', args: {}, expectedState: null }
  const receipt = await api.executeAgentAction(action)
  assert.equal(receipt.status, 'succeeded')
  assert.ok(receipt.error.includes('记账失败'))
  assert.equal(api.writes(), 1)
  assert.equal(api.storage.agent_action_journal_v1[action.actionId].after.stepIndex, 0)
  assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
  assert.equal(api.writes(), 1)
})

test('五个旧菜详情直接打开或刷新后可返回分类，有前页时正常返回', () => {
  const categories = { dongporou: 'meat', sucaidoufu: 'vegetarian', tangmian: 'noodle', guihuagao: 'dessert', cha: 'drink' }
  for (const [key, category] of Object.entries(categories)) {
    for (const depth of [1, 2]) {
      const module = { exports: {} }
      let redirected = ''
      let returned = false
      const uni = { redirectTo: ({ url }) => { redirected = url }, navigateBack: () => { returned = true } }
      const script = read(`src/pages/food/detail/${key}.vue`).match(/<script>([\s\S]*?)<\/script>/)[1]
        .replace('export default', 'module.exports =')
      runInNewContext(script, { module, uni, getCurrentPages: () => Array(depth).fill({}), setTimeout })
      module.exports.methods.goBack.call(module.exports.data())
      assert.equal(redirected, depth === 1 ? `/pages/food/category/${category}` : '', key)
      assert.equal(returned, depth === 2, key)
    }
  }
})

test('五套完整旧流程逐步导航及助手进度互通，完成、重做和回执重放可对账', async () => {
  const api = fixture()
  for (const flow of legacyFoodFlows) {
    const targetId = `legacyfood:${flow.key}`
    let sequence = 0
    const perform = async (capability) => {
      const action = { actionId: `${flow.key}-${sequence++}`, targetId, capability, args: {}, expectedState: api.readAgentState(targetId) }
      assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
      const writes = api.writes()
      assert.equal((await api.executeAgentAction(action)).status, 'succeeded')
      assert.equal(api.writes(), writes)
    }
    await perform('food.start')
    await perform('food.next')
    await perform('food.previous')
    for (let index = 0; index < flow.steps.length; index++) {
      let navigation
      const uni = { navigateTo: ({ url }) => { navigation = url }, redirectTo: ({ url }) => { navigation = url } }
      const module = { exports: {} }
      const script = read(`src${flow.steps[index]}.vue`).match(/<script>([\s\S]*?)<\/script>/)[1].replace('export default', 'module.exports =')
      runInNewContext(script, { module, uni, console: { log() {} }, setTimeout })
      const options = module.exports
      const page = options.data()
      for (const [name, method] of Object.entries(options.methods)) page[name] = method.bind(page)
      options.onLoad.call(page, { id: '1' })
      const next = index === flow.steps.length - 1 ? 'goToComplete' : `goToStep${index + 2}`
      page[next]()
      assert.equal(navigation.split('?')[0], index === flow.steps.length - 1 ? flow.complete : flow.steps[index + 1])
      api.trackLegacyFoodPage(flow.steps[index].slice(1))
      assert.equal(api.readAgentState(targetId).stepIndex, index)
      if (index < flow.steps.length - 1) await perform('food.next')
    }
    await perform('food.complete')
    api.trackLegacyFoodPage(flow.complete.slice(1))
    assert.equal(api.readAgentState(targetId).completed, true)
    await perform('food.restart')
    assert.equal(api.readAgentState(targetId).stepIndex, 0)
  }
  const writes = api.writes()
  api.trackLegacyFoodPage('pages/main_index/main_index')
  assert.equal(api.writes(), writes)
})

test('首页新提问等待现有回合结束后只提交一次，答案按纯文本展示', async () => {
  let status = 'running'
  const module = { exports: {} }
  const script = read('src/pages/assistant/assistant.vue').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  runInNewContext(script, { module, uni: { setStorageSync() {} }, setTimeout: () => 1, clearTimeout() {},
    agentRequest: async () => ({ turns: [{ turnId: 'old', status, input: { requestId: 'old', text: '旧问题' }, actions: [] }] }) })
  const options = module.exports
  const page = { ...options.data(), $nextTick: (callback) => callback(), sessionId: 'session', visible: true, initialQuery: true, text: '新问题' }
  for (const [name, method] of Object.entries(options.methods)) page[name] = method.bind(page)
  Object.defineProperty(page, 'activeTurn', { get: () => options.computed.activeTurn.call(page) })
  let sent = 0
  page.send = async () => { page.initialQuery = false; sent++ }
  await page.refresh()
  assert.equal(sent, 0)
  assert.equal(page.initialQuery, true)
  status = 'completed'
  await page.refresh()
  await page.refresh()
  assert.equal(sent, 1)
  assert.equal(page.displayText('**素蒸茄子** <script>literal</script>'), '素蒸茄子 <script>literal</script>')
})

test('打开购物车使用已完成页面与真实面板，其他入口不能冒用该能力', async () => {
  const api = fixture()
  const receipt = await api.executeAgentAction({ actionId: 'open-cart', targetId: 'section:market', capability: 'cart.open', args: {}, expectedState: null })
  assert.equal(receipt.status, 'succeeded')
  assert.equal(api.navigations.at(-1), '/pages/market/market?cart=1')
  assert.equal((await api.executeAgentAction({ actionId: 'wrong-cart', targetId: 'section:food', capability: 'cart.open', args: {}, expectedState: null })).status, 'failed')
  const module = { exports: {} }
  const script = read('src/pages/market/market.vue').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  runInNewContext(script, { module, hotProductsData: hotProducts, newProductsData: newProducts })
  const page = module.exports.data()
  module.exports.onLoad.call(page, { cart: '1' })
  assert.equal(page.cartPanelOpen, true)
})

test('带首页提问参数重开或丢失本机确认后，不会重复提交动作指令', async () => {
  let history
  let posts = 0
  const turns = []
  const module = { exports: {} }
  const script = read('src/pages/assistant/assistant.vue').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  runInNewContext(script, { module, uni: { getStorageSync: () => history, setStorageSync: (_, value) => { history = structuredClone(value) } },
    setTimeout: () => 1, clearTimeout() {}, agentId: () => 'manual-request',
    agentRequest: async (method, path, input) => {
      if (method === 'POST' && path === '/sessions') return { sessionId: 'session' }
      if (method === 'POST' && path.endsWith('/turns')) {
        posts++
        turns.push({ turnId: `turn-${posts}`, status: 'completed', input, actions: [] })
        return { turnId: `turn-${posts}` }
      }
      return { turns }
    } })
  const options = module.exports
  const mount = () => {
    const page = { ...options.data(), $nextTick: (callback) => callback() }
    for (const [name, method] of Object.entries(options.methods)) page[name] = method.bind(page)
    Object.defineProperty(page, 'activeTurn', { get: () => options.computed.activeTurn.call(page) })
    options.onLoad.call(page, { q: '下一步', source: 'home', requestId: 'entry-1' })
    return page
  }
  const settle = async () => { for (let index = 0; index < 30; index++) await Promise.resolve() }
  const first = mount()
  await options.onShow.call(first)
  await settle()
  assert.equal(posts, 1)
  assert.equal(turns[0].input.requestId, 'entry-1')
  const reopened = mount()
  await options.onShow.call(reopened)
  await settle()
  assert.equal(posts, 1)
  history.turns = [] // Model accepted the request, but the device lost its acknowledgement cache.
  const lostAck = mount()
  await options.onShow.call(lostAck)
  await settle()
  assert.equal(posts, 1)
  lostAck.text = '下一步'
  await lostAck.send()
  assert.equal(posts, 2)
  assert.equal(turns[1].input.requestId, 'manual-request')
})

test('首页查询参数只解码一次，中文和特殊字符不会以百分号编码回显', () => {
  const module = { exports: {} }
  const script = read('src/pages/assistant/assistant.vue').match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  runInNewContext(script, { module, uni: { getStorageSync: () => null, setStorageSync() {} } })
  const options = module.exports
  const mount = (q) => {
    const page = { ...options.data() }
    options.onLoad.call(page, { q, source: 'home', requestId: 'entry-1' })
    return page
  }
  assert.equal(mount('%E4%BD%A0%E5%A5%BD').entryText, '你好')
  assert.equal(mount('%E6%B8%85%E6%98%8E%E4%B8%8A%E6%B2%B3%E5%9B%BE').text, '清明上河图')
  assert.equal(mount('%E4%BD%A0+%E5%A5%BD%EF%BC%81').text, '你 好！')
  assert.equal(mount('%E4%BD%A0%ZZ').text, '%E4%BD%A0%ZZ')
})
