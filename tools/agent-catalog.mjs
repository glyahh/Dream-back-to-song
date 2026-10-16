import assert from 'node:assert/strict'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'

const root = new URL('../', import.meta.url)
const load = async (path) => import(`data:text/javascript,${encodeURIComponent(readFileSync(new URL(path, root), 'utf8'))}`)
const { foodContents } = await load('src/utils/foodContents.js')
const { paintingContents } = await load('src/utils/paintingContents.js')
const { allProducts, hotProducts, newProducts } = await load('src/utils/marketProducts.js')
const { agentPageTargets } = await load('src/utils/agentPageTargets.js')
const { getCourseVideoById } = await load('src/utils/courseVideos.js')
const { profileAvatars } = await load('src/utils/userProfile.js')
const { creationTypes } = await load('src/utils/localCreations.js')
const { feedbackTags } = await load('src/utils/localFeedback.js')
const { legacyFoodFlows } = await load('src/utils/legacyFoodFlows.js')
const config = JSON.parse(readFileSync(new URL('src/pages.json', root), 'utf8'))
const routes = new Set([
  ...config.pages.map(({ path }) => `/${path}`),
  ...config.subPackages.flatMap(({ root, pages }) => pages.map(({ path }) => `/${root}/${path}`)),
])

// Execute the same pure data/loading functions as the existing page behavior tests.
function pageOptions(route) {
  const source = readFileSync(new URL(`src${route.path}.vue`, root), 'utf8')
  const script = source.match(/<script>([\s\S]*?)<\/script>/)[1]
    .replace(/^import[^\n]*\n/gm, '').replace('export default', 'module.exports =')
  const module = { exports: {} }
  runInNewContext(script, { module }, { timeout: 1000 })
  return module.exports
}

function pageContent(route, id) {
  const options = pageOptions(route)
  const state = options.data()
  Object.assign(state, options.methods)
  state.loadDetailInfo(Number(id))
  return JSON.parse(JSON.stringify(state.detailInfo))
}

const pageItems = Object.entries(agentPageTargets).map(([id, route]) => {
  const [kind, key] = id.split(':')
  const video = kind === 'course' ? getCourseVideoById(Number(key)) : null
  let content
  if (kind === 'section') content = { name: route.title, description: `打开${route.title}页面。`,
    image: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/up_background.png' }
  else if (kind === 'article') {
    const source = readFileSync(new URL(`src${route.path}.vue`, root), 'utf8')
    const clothing = key === 'beizi'
    content = {
      name: source.match(new RegExp(`class="${clothing ? 'main-title' : 'nav-title'}">([^<]+)<`))[1].trim(),
      image: source.match(new RegExp(`class="${clothing ? 'header-bg' : 'main-image'}"\\s+src="([^"]+)"`))[1],
      description: source.match(new RegExp(`class="${clothing ? 'introduction-text' : 'intro-content'}">([\\s\\S]*?)<\\/text>`))[1].trim(),
      sections: [...source.matchAll(/class="feature-desc">([^<]+)</g)].map((match) => match[1].trim()),
    }
  } else if (kind === 'history') {
    const periods = pageOptions(route).data().historyPeriods
    content = { name: '服饰历史', image: periods[0].image,
      description: '阅读项目现有的服饰历史介绍；年代与叙述未经外部史料复核。', periods }
  } else if (kind === 'topic') {
    const source = readFileSync(new URL(`src${route.path}.vue`, root), 'utf8')
    const state = pageOptions(route).data()
    content = { name: source.match(/class="nav-title">([^<]+)</)[1].trim(),
      image: source.match(/class="hero-img" src="([^"]+)"/)[1],
      description: '阅读项目现有话题示例；人物、发帖时间与互动数字均为演示数据。', entries: state.list,
      ...(state.sections ? { sections: state.sections.filter((section) => section.key !== 'travel') } : {}),
    }
  } else if (kind === 'messages') content = { name: '本机消息记录', description: '阅读与标记本机消息。m1、m2、m3 为自带示例，不代表真实互动或物流。', image: profileAvatars[0] }
  else if (kind === 'feedback') content = { name: '本机反馈记录', description: '保存与阅读最近五条本机反馈记录，尚未发送给在线服务。',
    image: profileAvatars[0], contentMaxLength: 300, tags: feedbackTags }
  else if (kind === 'creations') content = { name: '本机创作', description: '保存与阅读本机创作。c1 是页面自带示例，不代表用户原创。',
    image: profileAvatars[0], contentMaxLength: 400, types: creationTypes }
  else if (kind === 'posts') content = { name: '本机发布记录', description: '在本机创建、阅读、点赞或删除发布记录；不会发送到在线社区。',
    image: profileAvatars[0], contentMaxLength: 120 }
  else if (kind === 'profile') content = { name: '个人资料', description: '查看与修改本机昵称、签名和预设头像。',
    image: profileAvatars[0], avatarChoices: profileAvatars, nicknameMaxLength: 16, bioMaxLength: 40 }
  else if (video) content = { title: video.title, image: video.poster, duration: video.durationLabel }
  else if (kind === 'building') {
    const source = readFileSync(new URL(`src${route.path}.vue`, root), 'utf8')
    content = {
      name: source.match(/class="detail-name">([^<]+)</)[1].trim(),
      description: source.match(/class="detail-description">([\s\S]*?)<\/text>/)[1].trim(),
      image: source.match(/class="detail-image" src="([^"]+)"/)[1],
      sections: [...source.matchAll(/class="section-content">([\s\S]*?)<\/text>/g)].map((match) => match[1].trim()),
    }
  } else content = pageContent(route, key)
  return {
    id, kind, title: video?.title || content.name || content.title,
    summary: video ? '项目已有视频，可打开播放器观看。' : content.description,
    image: video?.poster || content.image, route: { path: route.path, query: route.query },
    capabilities: id === 'section:market' ? ['content.open', 'cart.open']
      : kind === 'messages' ? ['content.open', 'messages.read']
      : kind === 'feedback' ? ['content.open', 'feedback.record']
      : kind === 'creations' ? ['content.open', 'creations.create']
      : kind === 'posts' ? ['content.open', 'posts.create', 'posts.like', 'posts.delete']
      : kind === 'profile' ? ['content.open', 'profile.update', 'profile.avatar']
      : video ? ['content.open', 'course.play'] : ['content.open'],
    content: { ...content, ...(video ? { video } : {}),
      sourceNote: ['profile', 'posts', 'creations', 'feedback', 'messages'].includes(kind)
        ? '仅本机功能；目录不包含设备里的实际个人记录。示例不代表真实互动、在线提交或物流。'
        : video ? '以已有视频元信息为准，不沿用与素材不符的旧课程介绍。'
          : kind === 'topic' ? '原项目话题示例，不代表真实发帖或实时统计。'
            : '原项目页面内容，未经外部史料复核；建筑年代按具体页面区分，不一概归为宋代。' },
    sources: video ? [{ title: video.title, url: video.sourceUrl }] : [],
  }
})

export const catalog = [
  ...pageItems,
  ...legacyFoodFlows.map((flow) => {
    const dish = pageOptions({ path: flow.detail }).data().dish
    const steps = flow.steps.map((path, index) => {
      assert.ok(routes.has(path), `旧制作步骤路由未注册：${path}`)
      const source = readFileSync(new URL(`src${path}.vue`, root), 'utf8')
      return { title: `第 ${index + 1} 步`, text: source.match(/class="description-text">([^<]+)</)[1].trim(), route: path }
    })
    assert.ok(routes.has(flow.complete), `旧制作完成页未注册：${flow.complete}`)
    return { id: `legacyfood:${flow.key}`, kind: 'legacyfood', title: dish.name,
      summary: `项目旧版制作流程，共 ${steps.length} 步；原页面未列完整材料用量。`, image: dish.image,
      route: { path: flow.detail, query: { id: String(dish.id) } },
      capabilities: ['content.open', 'food.start', 'food.next', 'food.previous', 'food.resume', 'food.complete', 'food.restart'],
      content: { key: flow.key, name: dish.name, steps, ingredients: [],
        sourceNote: '步骤逐项来自现有页面；未列出完整材料与用量，不可编造，也不标为经外部验证的宋代原方。' }, sources: [] }
  }),
  ...foodContents.map((food) => ({
    id: `food:${food.key}`, kind: 'food', title: food.name,
    summary: food.summary, image: food.image,
    route: { path: '/pages/food/detail/content', query: { key: food.key } },
    capabilities: ['content.open', 'food.start', 'food.next', 'food.previous', 'food.resume', 'food.complete', 'food.restart'],
    content: food, sources: food.sources,
  })),
  ...paintingContents.map((painting) => ({
    id: `painting:${painting.key}`, kind: 'painting', title: painting.name,
    summary: painting.summary, image: painting.image,
    route: { path: '/pages/lodging/painting/detail', query: { key: painting.key } },
    capabilities: ['content.open', 'painting.preview'],
    content: painting, sources: painting.sources,
  })),
  ...[...allProducts, ...hotProducts].map((product) => ({
    id: `market:${product.id}`, kind: 'market', title: product.name,
    summary: product.desc || '项目集市展示商品。', image: product.img,
    route: { path: '/pages/market/detail', query: { id: String(product.id) } },
    capabilities: allProducts.some((item) => item.id === product.id) ? ['content.open', 'cart.add', 'cart.remove'] : ['content.open'],
    content: { ...product, collection: newProducts.some((item) => item.id === product.id) ? '新品速递'
      : allProducts.some((item) => item.id === product.id) ? '系列好物' : '首页热推',
    catalogNote: '项目演示商品资料，价格及销量不代表实时交易数据；尚未开放下单结算。' },
    sources: [],
  })),
]

assert.equal(new Set(catalog.map(({ id }) => id)).size, catalog.length, '助手目录 ID 重复')
for (const item of catalog) {
  assert.ok(routes.has(item.route.path), `助手目录路由未注册：${item.route.path}`)
  assert.ok(item.title && item.summary && item.content && Array.isArray(item.sources), `助手目录内容缺失：${item.id}`)
  if (['food', 'painting'].includes(item.kind)) assert.ok(item.sources.length, `内容来源缺失：${item.id}`)
}

const output = new URL('Dream-Back-To-Song_backend/agent/data/catalog.json', root)
mkdirSync(new URL('.', output), { recursive: true })
writeFileSync(output, JSON.stringify(catalog, null, 2) + '\n')
console.log(`助手目录已生成：${catalog.length} 项 → ${fileURLToPath(output)}`)
