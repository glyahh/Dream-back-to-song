import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const root = new URL('../', import.meta.url)
// 内容表无运行时依赖；按 ESM 读取，保持项目现有 package.json 模块约定。
const loadContent = (path) => import(`data:text/javascript,${encodeURIComponent(readFileSync(new URL(path, root), 'utf8'))}`)
const { foodContents } = await loadContent('src/utils/foodContents.js')
const { paintingContents } = await loadContent('src/utils/paintingContents.js')
const nonempty = (value) => typeof value === 'string' && value.trim().length > 0

function progressApi(uni) {
  const module = { exports: {} }
  const source = readFileSync(new URL('src/utils/foodMakingProgress.js', root), 'utf8')
    .replace(/^export /gm, '')
  runInNewContext(source + '\nmodule.exports = { getFoodMakingProgress, saveFoodMakingProgress }', { module, uni })
  return module.exports
}

// 隔离执行组件的真实 data、生命周期和导航方法；模板另由双端构建与浏览器验证。
function loadPage(path, uni, pages = [{}, {}]) {
  const source = readFileSync(new URL(`src/${path}.vue`, root), 'utf8')
  const script = source.match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '')
    .replace('export default', 'module.exports =')
  const module = { exports: {} }
  runInNewContext(script, { module, foodContents, paintingContents, uni, setTimeout, getCurrentPages: () => pages, ...progressApi(uni) }, { filename: path })
  return module.exports
}

function mountPage(path, uni, key, pages) {
  const options = loadPage(path, uni, pages)
  const state = options.data()
  for (const [name, method] of Object.entries(options.methods)) state[name] = method.bind(state)
  for (const [name, getter] of Object.entries(options.computed || {})) {
    Object.defineProperty(state, name, { get: () => getter.call(state) })
  }
  options.onLoad.call(state, { key })
  return { options, state }
}

const progressKey = 'food_making_progress_v1'
const guidePath = 'pages/food/making/guide'
const detailPath = 'pages/food/detail/content'

function storageFixture(records = {}) {
  const fixture = { records: structuredClone(records), readFails: false, writeFails: false, writes: 0, navigation: '' }
  fixture.uni = {
    getStorageSync(key) {
      assert.equal(key, progressKey, '不得读取其他业务存储')
      if (fixture.readFails) throw new Error('storage unavailable')
      return structuredClone(fixture.records)
    },
    setStorageSync(key, value) {
      assert.equal(key, progressKey, '不得写入其他业务存储')
      if (fixture.writeFails) throw new Error('quota exceeded')
      fixture.records = structuredClone(value)
      fixture.writes++
    },
    navigateTo: ({ url }) => { fixture.navigation = url },
    redirectTo: ({ url }) => { fixture.navigation = url },
    navigateBack: ({ fail }) => fail(),
  }
  return fixture
}

function checkSources(sources, name) {
  assert.ok(sources.length > 0, `${name} 缺少来源`)
  for (const source of sources) {
    assert.ok(nonempty(source.title), `${name} 缺少来源标题`)
    assert.equal(new URL(source.url).protocol, 'https:', `${name} 来源地址无效`)
  }
}

test('菜品内容覆盖四类，每项具备材料、完整步骤及来源', () => {
  assert.equal(foodContents.length, 12)
  assert.equal(new Set(foodContents.map(({ key }) => key)).size, 12)
  for (const category of ['vegetarian', 'noodle', 'dessert', 'drink']) {
    assert.equal(foodContents.filter((food) => food.category === category).length, 3)
  }
  for (const food of foodContents) {
    for (const field of ['key', 'name', 'summary', 'example', 'servings']) {
      assert.ok(nonempty(food[field]), `${food.key} 缺少 ${field}`)
    }
    assert.ok(food.ingredients.length > 0 && food.ingredients.every(nonempty), `${food.name} 材料不完整`)
    assert.ok(food.steps.length >= 2, `${food.name} 缺少完整制作步骤`)
    assert.ok(food.steps.every(({ title, text }) => nonempty(title) && nonempty(text)), `${food.name} 存在空步骤`)
    checkSources(food.sources, food.name)
  }
})

test('成品图逐项对应、互不重复，运行资源总计不超过 1 MiB', () => {
  const files = readdirSync(new URL('src/static/food-details/', root)).sort()
  assert.deepEqual(files, foodContents.map(({ key }) => `${key}.jpg`).sort())
  const hashes = new Set()
  let bytes = 0
  for (const food of foodContents) {
    assert.equal(food.image, `/static/food-details/${food.key}.jpg`)
    const data = readFileSync(new URL(`src${food.image}`, root))
    assert.equal(data.readUInt16BE(0), 0xffd8, `${food.name} 不是 JPEG`)
    assert.equal(data.readUInt16BE(data.length - 2), 0xffd9, `${food.name} 图片不完整`)
    hashes.add(createHash('sha256').update(data).digest('hex'))
    bytes += data.length
  }
  assert.equal(hashes.size, foodContents.length, '不同条目复用了同一成品图')
  assert.ok(bytes <= 1024 * 1024, `成品图超出体积上限：${bytes} 字节`)
})

test('四幅名画具有独立图片、赏析及来源，可省略未确认元信息', () => {
  assert.equal(paintingContents.length, 4)
  assert.equal(new Set(paintingContents.map(({ key }) => key)).size, 4)
  assert.equal(new Set(paintingContents.map(({ image }) => image)).size, 4)
  for (const painting of paintingContents) {
    assert.ok(nonempty(painting.name) && nonempty(painting.summary))
    assert.equal(new URL(painting.image).protocol, 'https:')
    assert.ok(painting.facts.every(({ label, value }) => nonempty(label) && nonempty(value)))
    assert.ok(painting.highlights.length > 0)
    assert.ok(painting.highlights.every(({ title, text }) => nonempty(title) && nonempty(text)))
    assert.ok(nonempty(painting.sourceNote))
    checkSources(painting.sources, painting.name)
  }
})

test('四类卡片逐项进入正确详情，原有四个有效入口保留', () => {
  const categories = {
    vegetarian: ['素炒豆腐', '素蒸茄子', '素炒时蔬', '素汤'],
    noodle: ['汤面', '素面', '拌面', '汤饼'],
    dessert: ['桂花糕', '绿豆糕', '枣泥酥', '杏仁饼'],
    drink: ['茶', '酒', '汤', '露'],
  }
  const oldRoutes = { vegetarian: 'sucaidoufu', noodle: 'tangmian', dessert: 'guihuagao', drink: 'cha' }
  const visited = new Set()
  const config = JSON.parse(readFileSync(new URL('src/pages.json', root), 'utf8'))
  const routes = new Set(config.subPackages.flatMap(({ root, pages }) => pages.map(({ path }) => `${root}/${path}`)))
  for (const [category, names] of Object.entries(categories)) {
    let navigation
    const page = loadPage(`pages/food/category/${category}`, { navigateTo: ({ url }) => { navigation = url } })
    const state = page.data()
    assert.deepEqual(Array.from(state.dishes, ({ name }) => name), names)
    for (const dish of state.dishes) {
      page.methods.goToDishDetail.call(state, dish)
      const url = new URL(navigation, 'https://app.test')
      assert.ok(routes.has(url.pathname.slice(1)), `未注册的详情入口：${navigation}`)
      if (dish.id === 1) {
        assert.equal(url.pathname, `/pages/food/detail/${oldRoutes[category]}`)
        assert.equal(url.searchParams.get('id'), '1')
        assert.equal(url.searchParams.get('name'), dish.name)
        continue
      }
      assert.equal(url.pathname, '/pages/food/detail/content')
      const detail = loadPage('pages/food/detail/content', {})
      const detailState = detail.data()
      detail.onLoad.call(detailState, { key: url.searchParams.get('key'), name: '错误名称' })
      assert.equal(detailState.food.name, dish.name)
      assert.equal(detailState.food.category, category)
      assert.equal(detailState.food.image, dish.image)
      assert.equal(detailState.food.summary, dish.description)
      visited.add(detailState.food.key)
    }
  }
  assert.equal(visited.size, 12, '存在漏接或重复指向的菜品')
})

test('详情返回原分类，无效或缺失 key 不沿用旧内容', () => {
  let redirected
  let backDelta
  const detail = loadPage('pages/food/detail/content', {
    navigateBack: ({ delta, fail }) => { backDelta = delta; fail() },
    redirectTo: ({ url }) => { redirected = url },
  })
  const state = detail.data()
  for (const food of foodContents) {
    detail.onLoad.call(state, { key: food.key })
    detail.methods.goBack.call(state)
    assert.equal(backDelta, 1)
    assert.equal(redirected, `/pages/food/category/${food.category}`)
  }
  for (const options of [{ key: 'missing' }, {}]) {
    detail.onLoad.call(state, options)
    assert.equal(state.food, null)
    detail.methods.goToFood.call(state)
    assert.equal(redirected, '/pages/food/index')
    detail.methods.goBack.call(state)
    assert.equal(redirected, '/pages/food/index')
  }
})

test('直接打开或刷新详情后，单页栈直接返回所属分类', () => {
  let redirected
  const detail = loadPage('pages/food/detail/content', {
    navigateBack: () => assert.fail('单页栈不能依赖 navigateBack 的失败回调'),
    redirectTo: ({ url }) => { redirected = url },
  }, [{}])
  const state = detail.data()
  for (const food of foodContents) {
    detail.onLoad.call(state, { key: food.key })
    detail.methods.goBack.call(state)
    assert.equal(redirected, `/pages/food/category/${food.category}`)
  }
  let backCount = 0
  const fromCategory = loadPage('pages/food/detail/content', {
    navigateBack: () => { backCount++ },
    redirectTo: () => assert.fail('有上一页时应正常回退'),
  })
  const fromCategoryState = fromCategory.data()
  fromCategory.onLoad.call(fromCategoryState, { key: foodContents[0].key })
  fromCategory.methods.goBack.call(fromCategoryState)
  assert.equal(backCount, 1)
})

test('12 道菜完整走到完成，首末边界和完成状态不可越过', () => {
  const fixture = storageFixture()
  const config = JSON.parse(readFileSync(new URL('src/pages.json', root), 'utf8'))
  assert.ok(config.subPackages.find(({ root }) => root === 'pages/food').pages.some(({ path }) => path === 'making/guide'))
  for (const food of foodContents) {
    const { state } = mountPage(guidePath, fixture.uni, food.key)
    assert.equal(state.progress.stepIndex, 0)
    assert.equal(state.progress.completed, false)
    state.moveStep(-1)
    state.completeMaking()
    assert.equal(state.progress.stepIndex, 0)
    assert.equal(state.progress.completed, false)
    for (let index = 1; index < food.steps.length; index++) {
      state.moveStep(1)
      assert.equal(state.progress.stepIndex, index)
      assert.equal(state.currentStep.text, food.steps[index].text)
    }
    state.moveStep(1)
    assert.equal(state.progress.stepIndex, food.steps.length - 1)
    state.completeMaking()
    assert.equal(state.progress.completed, true)
    state.moveStep(-1)
    assert.equal(state.progress.stepIndex, food.steps.length - 1)
    const reopened = mountPage(guidePath, fixture.uni, food.key).state
    assert.equal(reopened.progress.completed, true)
    assert.equal(reopened.progress.stepIndex, food.steps.length - 1)
  }
  assert.equal(Object.keys(fixture.records).length, 12)
})

test('详情入口随本地进度更新，返回和刷新后恢复最后查看步骤', () => {
  const fixture = storageFixture()
  const food = foodContents[0]
  const detail = mountPage(detailPath, fixture.uni, food.key)
  detail.options.onShow.call(detail.state)
  assert.equal(detail.state.makingLabel, '开始制作')
  detail.state.startMaking()
  assert.equal(fixture.navigation, `/${guidePath}?key=${food.key}`)
  let guide = mountPage(guidePath, fixture.uni, food.key).state
  guide.moveStep(1)
  guide.moveStep(1)
  guide.moveStep(-1)
  guide.goBack()
  assert.equal(fixture.navigation, `/${detailPath}?key=${food.key}`)
  detail.options.onShow.call(detail.state)
  assert.equal(detail.state.makingLabel, '继续制作')
  guide = mountPage(guidePath, fixture.uni, food.key).state
  assert.equal(guide.progress.stepIndex, 1)
  while (!guide.isLastStep) guide.moveStep(1)
  guide.completeMaking()
  detail.options.onShow.call(detail.state)
  assert.equal(detail.state.makingLabel, '查看结果')
  guide.restartMaking()
  detail.options.onShow.call(detail.state)
  assert.equal(detail.state.makingLabel, '继续制作')
})

test('同类及跨类进度独立，重新制作只重置当前菜品', () => {
  const fixture = storageFixture({ retained: { stepIndex: 7, completed: true } })
  const foods = [foodContents[0], foodContents[1], foodContents.find(({ key }) => key === 'sumian')]
  const guides = foods.map(food => mountPage(guidePath, fixture.uni, food.key).state)
  guides[0].moveStep(1)
  guides[1].moveStep(1)
  guides[1].moveStep(1)
  guides[2].moveStep(1)
  while (!guides[0].isLastStep) guides[0].moveStep(1)
  guides[0].completeMaking()
  const others = structuredClone(fixture.records)
  guides[0].restartMaking()
  assert.deepEqual(fixture.records[foods[0].key], { stepIndex: 0, completed: false })
  for (const key of [foods[1].key, foods[2].key, 'retained']) assert.deepEqual(fixture.records[key], others[key])
})

test('损坏或越界的单条记录从首步开始，不清空其他条目', () => {
  const [food, other] = foodContents
  const invalidRecords = [null, 'bad', {}, { stepIndex: -1, completed: false },
    { stepIndex: food.steps.length, completed: false }, { stepIndex: 0.5, completed: false },
    { stepIndex: 1, completed: 'false' }, { stepIndex: 0, completed: true }]
  for (const invalid of invalidRecords) {
    const fixture = storageFixture({ [food.key]: invalid, [other.key]: { stepIndex: 1, completed: false } })
    const { state } = mountPage(guidePath, fixture.uni, food.key)
    assert.equal(state.progress.stepIndex, 0)
    assert.equal(state.progress.completed, false)
    assert.deepEqual(fixture.records[other.key], { stepIndex: 1, completed: false })
  }
})

test('存储读写异常不误报完成或重置，恢复后原操作可重试', () => {
  const food = foodContents[0]
  const fixture = storageFixture({ [food.key]: { stepIndex: 1, completed: false } })
  fixture.readFails = true
  const guide = mountPage(guidePath, fixture.uni, food.key).state
  assert.equal(guide.progress, null)
  assert.match(guide.storageError, /读取失败/)
  assert.equal(fixture.writes, 0)
  const detail = mountPage(detailPath, fixture.uni, food.key)
  detail.options.onShow.call(detail.state)
  assert.equal(detail.state.makingLabel, '进入制作')
  assert.match(detail.state.progressError, /读取失败/)
  fixture.readFails = false
  guide.loadProgress()
  assert.equal(guide.progress.stepIndex, 1)
  fixture.writeFails = true
  guide.moveStep(1)
  assert.equal(guide.progress.stepIndex, 1)
  assert.match(guide.storageError, /未保存/)
  assert.equal(fixture.records[food.key].stepIndex, 1)
  fixture.writeFails = false
  guide.moveStep(1)
  assert.equal(guide.progress.stepIndex, 2)
  assert.equal(guide.storageError, '')
  while (!guide.isLastStep) guide.moveStep(1)
  fixture.writeFails = true
  guide.completeMaking()
  assert.equal(guide.progress.completed, false)
  assert.match(guide.storageError, /未保存/)
  fixture.writeFails = false
  guide.completeMaking()
  assert.equal(guide.progress.completed, true)
  fixture.writeFails = true
  guide.restartMaking()
  assert.equal(guide.progress.completed, true)
  assert.match(guide.storageError, /未保存/)
  fixture.writeFails = false
  guide.restartMaking()
  assert.equal(guide.progress.stepIndex, 0)
  assert.equal(guide.progress.completed, false)
})

test('制作页无效 key 不触碰存储，返回详情不会反复叠加页面', () => {
  const fixture = storageFixture()
  const invalid = mountPage(guidePath, fixture.uni, 'missing').state
  assert.equal(invalid.food, null)
  assert.equal(fixture.writes, 0)
  invalid.goBack()
  assert.equal(fixture.navigation, '/pages/food/index')
  const food = foodContents[0]
  let backCount = 0
  fixture.uni.navigateBack = () => { backCount++ }
  const previous = { route: detailPath, options: { key: food.key } }
  const guide = mountPage(guidePath, fixture.uni, food.key, [previous, {}]).state
  guide.goBack()
  assert.equal(backCount, 1)
  const unrelated = mountPage(guidePath, fixture.uni, food.key, [{ route: detailPath, options: { key: foodContents[1].key } }, {}]).state
  unrelated.goBack()
  assert.equal(backCount, 1)
  assert.equal(fixture.navigation, `/${detailPath}?key=${food.key}`)
})

test('四幅名画的列表、详情和预览逐一对应，不沿用未确认的元信息', () => {
  let navigation
  let preview
  let toast
  const uni = {
    navigateTo: ({ url }) => { navigation = url },
    previewImage: (options) => { preview = options },
    showToast: (options) => { toast = options.title },
    getStorageSync: () => assert.fail('名画详情不得读取制作进度'),
    setStorageSync: () => assert.fail('名画详情不得改写制作进度'),
  }
  const gallery = loadPage('pages/lodging/painting/gallery', uni)
  const list = gallery.data()
  assert.deepEqual(Array.from(list.paintings, ({ name }) => name), ['千里江山图', '清明上河图', '秋窗读书图', '妆靓仕女图'])
  const config = JSON.parse(readFileSync(new URL('src/pages.json', root), 'utf8'))
  assert.ok(config.subPackages.find(({ root }) => root === 'pages/lodging').pages.some(({ path }) => path === 'painting/detail'))
  for (const painting of list.paintings) {
    gallery.methods.navigateToDetail.call(list, painting.key)
    const url = new URL(navigation, 'https://app.test')
    assert.equal(url.pathname, '/pages/lodging/painting/detail')
    const detail = mountPage('pages/lodging/painting/detail', uni, url.searchParams.get('key'))
    detail.options.onLoad.call(detail.state, { key: painting.key, name: '错误名称' })
    assert.equal(detail.state.painting.name, painting.name)
    assert.equal(detail.state.painting.image, painting.image)
    detail.state.previewPainting()
    assert.equal(preview.current, painting.image)
    assert.deepEqual(Array.from(preview.urls), [painting.image])
    if (!painting.facts.length) {
      assert.equal(painting.dynasty, '')
      assert.equal(painting.material, undefined)
    }
  }
  preview.fail()
  assert.equal(toast, '图片暂时无法打开')
  gallery.methods.onScroll.call(list, { detail: { scrollTop: 350 } })
  assert.equal(list.scrollTop, 350)
})

test('名画详情返回列表，直接打开、刷新及回退失败时均有正确去向', () => {
  let backCount = 0
  let redirected
  const uni = {
    navigateBack: () => { backCount++ },
    redirectTo: ({ url }) => { redirected = url },
  }
  const path = 'pages/lodging/painting/detail'
  const gallery = { route: 'pages/lodging/painting/gallery' }
  const fromList = mountPage(path, uni, 'qianli', [gallery, {}]).state
  fromList.goBack()
  assert.equal(backCount, 1)
  assert.equal(redirected, undefined)
  for (const pages of [[{}], [{ route: 'pages/food/detail/content' }, {}]]) {
    mountPage(path, uni, 'qianli', pages).state.goBack()
    assert.equal(redirected, '/pages/lodging/painting/gallery')
    assert.equal(backCount, 1)
  }
  uni.navigateBack = ({ fail }) => fail()
  mountPage(path, uni, 'qianli', [gallery, {}]).state.goBack()
  assert.equal(redirected, '/pages/lodging/painting/gallery')
})

test('无效或缺失的画作 key 不显示其他作品，并提供返回列表入口', () => {
  let redirected
  const page = loadPage('pages/lodging/painting/detail', { redirectTo: ({ url }) => { redirected = url } }, [{}])
  const state = page.data()
  for (const options of [{ key: 'qianli' }, { key: 'missing' }, {}]) {
    page.onLoad.call(state, options)
    if (options.key === 'qianli') {
      assert.equal(state.painting.key, 'qianli')
    } else {
      assert.equal(state.painting, null)
      page.methods.goBack.call(state)
      assert.equal(redirected, '/pages/lodging/painting/gallery')
    }
  }
})
