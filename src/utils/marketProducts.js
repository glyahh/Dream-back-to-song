// 新品速递 + 系列好物 整合商品数据
export const newProducts = [
  { id: 101, name: '汴梁旧帖', desc: '宋风雅韵 · 复古信笺 · 手写质感', img: '/static/market_newitem/汴梁旧帖.png', price: '28', originPrice: '36', tag: '新品', tags: ['包邮', '满减'], sales: '已售800+', shop: '宋韵文创' },
  { id: 102, name: '汴河清赏盘', desc: '青绿山水 · 陶瓷餐盘 · 家用款', img: '/static/market_newitem/汴河清赏盘.png', price: '48', originPrice: '', tag: '', tags: ['包邮', '破损包退'], sales: '已售1200+', shop: '宋韵文创' },
  { id: 103, name: '荷风宋刻', desc: '荷花纹样 · 宋刻工艺 · 书签礼盒', img: '/static/market_newitem/荷风宋刻.png', price: '38', originPrice: '45', tag: '热卖', tags: ['包邮', '7天价保'], sales: '已售500+', shop: '宋韵文创' },
  { id: 104, name: '韵雅牌', desc: '宋式香牌 · 随身佩挂 · 古法合香', img: '/static/market_newitem/韵雅牌.png', price: '58', originPrice: '', tag: '', tags: ['包邮', '售后保障'], sales: '已售300+', shop: '宋韵文创' },
]

export const seriesProducts = [
  { id: 201, name: '千里江山图系列餐盘', desc: '青山远黛·陶瓷餐盘·宋风雅韵', img: '/static/ji_shi/left_picture.png', price: '48', sales: '销量1200+', tag: '自营' },
  { id: 202, name: '宋韵香牌', desc: '墨韵合香·随身佩挂·古法工艺', img: '/static/market_allitem/墨韵.png', price: '58', sales: '销量500+', tag: '精选', tag2: '宋韵' },
  { id: 203, name: '明镜盏', desc: '茶盏器皿·宋式美学', img: '/static/market_allitem/明镜盏.png', price: '88', sales: '好评率98%', tag: '', tag2: '宋韵' },
  { id: 204, name: '风荷雅盏', desc: '荷风宋韵·茶器雅集', img: '/static/market_allitem/风荷雅盏.png', price: '78', sales: '销量800+', tag: '自营' },
  { id: 205, name: '浅蓝木牌', desc: '宋风挂饰·木质工艺', img: '/static/market_allitem/浅蓝木牌.png', price: '38', sales: '销量300+', tag: '' },
  { id: 206, name: '青绿流苏团扇', desc: '千里江山·团扇摆件', img: '/static/ji_shi/right_bg.png', price: '68', sales: '销量600+', tag: '精选' },
  { id: 207, name: '汴梁旧帖', desc: '宋风雅韵·复古信笺', img: '/static/market_newitem/汴梁旧帖.png', price: '28', sales: '销量800+', tag: '新品' },
  { id: 208, name: '汴河清赏盘', desc: '青绿山水·陶瓷餐盘', img: '/static/market_newitem/汴河清赏盘.png', price: '48', sales: '销量1200+', tag: '' },
]

// 全部好物 = 新品速递 + 系列好物
export const allProducts = [...newProducts, ...seriesProducts]

// 按 id 建立 map
export function getProductMap(products) {
  const map = {}
  products.forEach((p) => { map[p.id] = p })
  return map
}
