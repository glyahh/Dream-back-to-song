-- 梦回宋朝 · 演示种子数据
-- 与前端静态/mock 对齐：marketProducts.js、discover.vue、me 各页 mock、detail.vue
-- 仅用于开发/答辩演示，可重复执行

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

USE `dream_back_to_song`;

-- 清空（子表优先）
TRUNCATE TABLE `feedback`;
TRUNCATE TABLE `private_messages`;
TRUNCATE TABLE `messages`;
TRUNCATE TABLE `creations`;
TRUNCATE TABLE `collections`;
TRUNCATE TABLE `post_likes`;
TRUNCATE TABLE `user_follows`;
TRUNCATE TABLE `post_images`;
TRUNCATE TABLE `posts`;
TRUNCATE TABLE `carousel`;
TRUNCATE TABLE `topics`;
TRUNCATE TABLE `logistics`;
TRUNCATE TABLE `order_items`;
TRUNCATE TABLE `orders`;
TRUNCATE TABLE `addresses`;
TRUNCATE TABLE `cart_items`;
TRUNCATE TABLE `product_tags`;
TRUNCATE TABLE `product_styles`;
TRUNCATE TABLE `product_images`;
TRUNCATE TABLE `products`;
TRUNCATE TABLE `user_settings`;
TRUNCATE TABLE `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- OSS 前缀（与前端一致）
-- https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com

-- ============================================================================
-- 用户（userProfile.js 默认 + discover.vue feedList）
-- ============================================================================

INSERT INTO `users` (`id`, `phone`, `nickname`, `avatar`, `bio`, `created_at`, `updated_at`) VALUES
(1, '13800138000', '烟雨朦胧', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/avatar.png', '', '2026-01-01 10:00:00', '2026-01-01 10:00:00'),
(2, '13800138001', '山河入梦', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/1.png', '偏爱浅色宋服与旧画册。', '2026-01-05 12:00:00', '2026-01-05 12:00:00'),
(3, '13800138002', '清河小筑', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang2.png', '在院子里泡茶读书的人。', '2026-01-06 12:00:00', '2026-01-06 12:00:00'),
(4, '13800138003', '竹墨留香', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang3.png', '', '2026-01-07 12:00:00', '2026-01-07 12:00:00'),
(5, '13800138004', '一碗清欢', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang4.png', '', '2026-01-08 12:00:00', '2026-01-08 12:00:00'),
(6, '13800138005', '墨池边', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang5.png', '', '2026-01-09 12:00:00', '2026-01-09 12:00:00');

INSERT INTO `user_settings` (`user_id`, `notify`, `sound`, `data_saver`) VALUES
(1, 1, 1, 0),
(2, 1, 1, 0),
(3, 1, 1, 0),
(4, 1, 1, 0),
(5, 1, 1, 0),
(6, 1, 1, 0);

-- ============================================================================
-- 商品（market.vue hotProducts id 1/2 + marketProducts.js 101-104 / 201-208）
-- ============================================================================

INSERT INTO `products` (
  `id`, `name`, `subtitle`, `description`, `main_img`, `price`, `origin_price`,
  `tag`, `sales_text`, `shop_name`, `shipping_from`, `service`, `type`,
  `is_featured`, `is_carousel`, `sort_order`
) VALUES
-- 集市热榜 market.vue hotProducts
(1, '千里江山图系列餐盘-青山远黛', NULL, '青山远黛·陶瓷餐盘·宋风雅韵',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/left_picture.png',
 48.00, NULL, NULL, '销量1200+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'normal', 1, 0, 1),
(2, '青绿流苏团扇', NULL, '千里江山·团扇摆件',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/right_bg.png',
 68.00, NULL, NULL, '销量600+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'normal', 1, 0, 2),
-- 新品速递 newProducts
(101, '汴梁旧帖', NULL, '宋风雅韵 · 复古信笺 · 手写质感',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/汴梁旧帖.png',
 28.00, 36.00, '新品', '已售800+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'new', 0, 0, 10),
(102, '汴河清赏盘', NULL, '青绿山水 · 陶瓷餐盘 · 家用款',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/汴河清赏盘.png',
 48.00, NULL, NULL, '已售1200+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'new', 0, 0, 11),
(103, '荷风宋刻', NULL, '荷花纹样 · 宋刻工艺 · 书签礼盒',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/荷风宋刻.png',
 38.00, 45.00, '热卖', '已售500+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'new', 0, 0, 12),
(104, '韵雅牌', NULL, '宋式香牌 · 随身佩挂 · 古法合香',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/韵雅牌.png',
 58.00, NULL, NULL, '已售300+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'new', 0, 0, 13),
-- 系列好物 seriesProducts
(201, '千里江山图系列餐盘', NULL, '青山远黛·陶瓷餐盘·宋风雅韵',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/left_picture.png',
 48.00, NULL, '自营', '销量1200+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 20),
(202, '宋韵香牌', NULL, '墨韵合香·随身佩挂·古法工艺',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_allitem/墨韵.png',
 58.00, NULL, '精选', '销量500+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 21),
(203, '明镜盏', NULL, '茶盏器皿·宋式美学',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_allitem/明镜盏.png',
 88.00, NULL, NULL, '好评率98%', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 22),
(204, '风荷雅盏', NULL, '荷风宋韵·茶器雅集',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_allitem/风荷雅盏.png',
 78.00, NULL, '自营', '销量800+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 23),
(205, '浅蓝木牌', NULL, '宋风挂饰·木质工艺',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_allitem/浅蓝木牌.png',
 38.00, NULL, NULL, '销量300+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 24),
(206, '青绿流苏团扇', NULL, '千里江山·团扇摆件',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/right_bg.png',
 68.00, NULL, '精选', '销量600+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 25),
(207, '汴梁旧帖', NULL, '宋风雅韵·复古信笺',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/汴梁旧帖.png',
 28.00, NULL, '新品', '销量800+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 26),
(208, '汴河清赏盘', NULL, '青绿山水·陶瓷餐盘',
 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/汴河清赏盘.png',
 48.00, NULL, NULL, '销量1200+', '宋韵文创', '四川成都', '破损包退・极速退款・售后保障', 'series', 0, 0, 27);

-- 商品标签（marketProducts.js tags 数组）
INSERT INTO `product_tags` (`product_id`, `tag`) VALUES
(101, '包邮'), (101, '满减'),
(102, '包邮'), (102, '破损包退'),
(103, '包邮'), (103, '7天价保'),
(104, '包邮'), (104, '售后保障');

-- 商品详情图与款式（market/detail.vue defaultProduct，商品 id=1）
INSERT INTO `product_images` (`product_id`, `url`, `sort_order`) VALUES
(1, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/left_picture.png', 0),
(1, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/titile_bg.png', 1),
(1, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/market_2.png', 2),
(1, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/market_3.png', 3);

INSERT INTO `product_styles` (`id`, `product_id`, `name`, `thumb`, `sort_order`) VALUES
(1, 1, '青山远黛', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/left_picture.png', 0),
(2, 1, '青绿流苏', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/right_bg.png', 1);

-- ============================================================================
-- 发现：轮播、话题、帖子
-- ============================================================================

INSERT INTO `carousel` (`image`, `title`, `link`, `sort_order`) VALUES
('https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_2.png', '', NULL, 0),
('https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_3.png', '', NULL, 1),
('https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/discover_bg.png', '宋代衣食住行', '/pages/discover/topic_overview', 2);

INSERT INTO `topics` (`key`, `title`, `image`, `link`, `sort_order`) VALUES
('life', '#生活在宋朝', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/live_in_song.png', '/pages/discover/topic_life', 0),
('clothing', '宋韵服饰', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/song_cloth.png', '/pages/discover/topic_clothing', 1),
('food', '宋人食单', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/song_food.png', '/pages/discover/topic_food', 2),
('overview', '宋代衣食住行', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/discover_bg.png', '/pages/discover/topic_overview', 3);

INSERT INTO `posts` (`id`, `user_id`, `topic`, `content`, `likes_count`, `created_at`, `updated_at`) VALUES
(1, 2, '#生活在宋朝', '好喜欢这个配色', 24, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
(2, 3, '#生活在宋朝', '晨起焚一柱香，看竹影晃动，仿佛回到京都巷陌。', 18, DATE_SUB(NOW(), INTERVAL 2 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
(3, 4, '#生活在宋朝', '新绣了一件团花纹褙子，淡青配牙白，走在廊下风一吹就像画里人。', 32, DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
(4, 5, '#生活在宋朝', '用《山家清供》里的方子做了碗蟹酿橙，酸甜里带着桂花香。', 41, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 6, '#生活在宋朝', '练完小楷，把案几上的宣纸铺开，才发现窗外的月色也写进了字里行间。', 15, DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 7 DAY));

INSERT INTO `post_images` (`post_id`, `url`, `sort_order`) VALUES
(1, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu3.png', 0),
(1, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu4.png', 1),
(2, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/song_study.png', 0),
(3, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu3.png', 0),
(3, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu4.png', 1),
(4, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/food_guihuagao.png', 0),
(4, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/food_xieliangcheng.png', 1),
(5, 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/song_study.png', 0);

-- 演示关注：用户1 关注 山河入梦、清河小筑（following.vue / discover_follow_ids）
INSERT INTO `user_follows` (`follower_id`, `following_id`, `created_at`) VALUES
(1, 2, '2026-01-15 10:00:00'),
(1, 3, '2026-01-16 10:00:00');

-- 山河入梦 赞了 一碗清欢 的帖子（messages.vue social）
INSERT INTO `post_likes` (`post_id`, `user_id`, `created_at`) VALUES
(4, 2, '2026-02-14 09:12:00');

-- ============================================================================
-- 地址、订单、物流（orders.vue mock，user_id=1）
-- ============================================================================

INSERT INTO `addresses` (`id`, `user_id`, `name`, `phone`, `province`, `city`, `district`, `detail`, `is_default`) VALUES
(1, 1, '烟雨朦胧', '13800138000', '四川', '成都', '锦江区', '汴京巷 12 号', 1);

INSERT INTO `orders` (`id`, `order_no`, `user_id`, `address_id`, `total_amount`, `status`, `created_at`, `updated_at`, `ship_at`, `confirm_at`) VALUES
(1, 'O120260201001', 1, 1, 189.00, 'pending', '2026-02-01 20:14:00', '2026-02-01 20:14:00', NULL, NULL),
(2, 'O120260120002', 1, 1, 196.00, 'shipped', '2026-01-20 14:32:00', '2026-01-21 10:00:00', '2026-01-21 10:00:00', NULL),
(3, 'O120260105003', 1, 1, 129.00, 'finished', '2026-01-05 09:10:00', '2026-01-12 18:00:00', '2026-01-06 09:00:00', '2026-01-12 18:00:00');

INSERT INTO `order_items` (`order_id`, `product_id`, `style_id`, `product_snapshot`, `qty`, `price`, `subtotal`) VALUES
(1, 204, NULL,
 JSON_OBJECT(
   'title', '汴河清赏 · 茶器礼盒',
   'desc', '一盏茶、一方木托，随手即是宋人茶席。',
   'img', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/风荷雅盏.png',
   'price', 189
 ), 1, 189.00, 189.00),
(2, 101, NULL,
 JSON_OBJECT(
   'title', '千里江山 · 手卷书签套装',
   'desc', '从画卷中取一角，夹在书页之间。',
   'img', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_allitem/汴梁旧帖.png',
   'price', 98
 ), 2, 98.00, 196.00),
(3, 204, NULL,
 JSON_OBJECT(
   'title', '宋韵点心盘 · 桂花款',
   'desc', '仿汴京点心盘，晨起一碟，伴书香茶烟。',
   'img', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_allitem/风荷雅盏.png',
   'price', 129
 ), 1, 129.00, 129.00);

INSERT INTO `logistics` (`order_id`, `company`, `tracking_no`, `traces`) VALUES
(2, '汴京驿站', 'BJ202601210001',
 JSON_ARRAY(
   JSON_OBJECT('time', '2026-01-21 10:00:00', 'desc', '包裹已由汴京驿站发出'),
   JSON_OBJECT('time', '2026-01-22 14:30:00', 'desc', '途经洛阳转运中心')
 ));

-- ============================================================================
-- 收藏、消息、创作（me 各页 mock）
-- ============================================================================

INSERT INTO `collections` (`user_id`, `type`, `target_id`, `extra`, `created_at`) VALUES
(1, 'goods', '101', JSON_OBJECT('title', '汴梁旧帖 · 宣纸套装', 'price', 56, 'img', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/汴梁旧帖.png'), '2026-01-18 12:00:00'),
(1, 'goods', '204', JSON_OBJECT('title', '风荷雅盏 · 茶杯', 'price', 88, 'img', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/market_newitem/风荷雅盏.png'), '2026-01-19 12:00:00'),
(1, 'notes', 'n1', JSON_OBJECT(
  'tag', '#生活在宋朝',
  'title', '如果在汴京开一家小茶肆',
  'excerpt', '门口挂一盏暖黄灯笼，案上只做两三款茶点，让来往行人坐下歇脚、翻翻画册……',
  'from', '来自「发现 · 话题广场」',
  'time', '收藏于 01-20'
), '2026-01-20 20:00:00');

INSERT INTO `messages` (`user_id`, `category`, `title`, `preview`, `content`, `is_read`, `related_id`, `created_at`) VALUES
(1, 'system', '欢迎来到「梦回宋朝」',
 '为你准备了一份宋风指南，带你从衣食住行走进画卷。',
 '欢迎来到「梦回宋朝」。你可以从首页的「遇见宋朝」开始，按衣、食、住、行慢慢浏览，也可以在「发现」页关注你喜欢的作者，或者在「集市」中收集几件宋风好物。',
 0, NULL, '2026-02-14 21:40:00'),
(1, 'social', '山河入梦 赞了你的发布',
 '「用《山家清供》里的方子做了碗蟹酿橙……」',
 '山河入梦 赞了你的发布：「用《山家清供》里的方子做了碗蟹酿橙……」。对方觉得你的宋风生活很有味道。',
 0, '4', '2026-02-15 09:12:00'),
(1, 'order', '订单已发货',
 '你的「风荷雅盏 · 茶杯」已由汴京驿站发出。',
 '你的「风荷雅盏 · 茶杯」已由汴京驿站打包发出，预计三至五日抵达。收货后记得在「我的订单」中确认哦。',
 1, '2', '2026-02-01 20:30:00');

INSERT INTO `creations` (`user_id`, `title`, `type`, `content`, `excerpt`, `words`, `mood`, `created_at`, `updated_at`) VALUES
(1, '浅绛团花褙子草图', '服饰设计',
 '试着把宋画里的团花纹样移到褙子下摆，底色用淡绛，花纹改成更细密的线条，袖口略收，走动时像水面涟漪。',
 '试着把宋画里的团花纹样移到褙子下摆，底色用淡绛，花纹改成更细密的线条……',
 68, '心静如水', '2026-02-01 21:00:00', '2026-02-01 21:00:00');

-- 演示购物车（可选）
INSERT INTO `cart_items` (`user_id`, `product_id`, `style_id`, `qty`) VALUES
(1, 101, NULL, 1),
(1, 204, NULL, 2);
