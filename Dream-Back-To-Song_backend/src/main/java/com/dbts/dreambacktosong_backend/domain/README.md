# Domain 包结构说明

## 包分类

`domain/entity` 存放数据库实体，由 MyBatis Mapper 映射到数据库表。

### 1. `entity` 包 - 数据库实体类
- **用途**：映射数据库表结构，用于 MyBatis 查询与持久化
- **特点**：与数据库表一一对应，包含所有字段映射
- **位置**：`com.dbts.dreambacktosong_backend.domain.entity`

**包含的实体类**：
- `User` - 用户表
- `UserSettings` - 用户设置表
- `Product` - 商品表
- `ProductImage` - 商品图片表
- `ProductStyle` - 商品款式表
- `CartItem` - 购物车明细表
- `Address` - 收货地址表
- `Order` - 订单主表
- `OrderItem` - 订单明细表
- `Logistics` - 物流信息表
- `Carousel` - 轮播图表
- `Topic` - 话题表
- `Post` - 帖子/动态表
- `PostImage` - 帖子图片表
- `PostLike` - 帖子点赞表
- `UserFollow` - 关注关系表
- `Collection` - 收藏表
- `Creation` - 创作表
- `Message` - 消息通知表
- `PrivateMessage` - 私信表
- `Feedback` - 意见反馈表

## 请求与响应

当前请求参数使用 Controller / Service 中的 record，响应使用统一的 `ApiResponse`、`PageResponse`，具体数据由 record 或 Map 承载。需要新增类型时沿用相邻模块的实现，不预建空的 DTO / VO 包。
