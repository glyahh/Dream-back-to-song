<template>
  <view class="detail-page" v-if="product.images && product.images.length">
    <!-- 商品图片轮播 -->
    <view class="gallery">
      <swiper
        class="gallery-swiper"
        :current="galleryIndex"
        :circular="product.images.length > 1"
        :duration="300"
        @change="onGalleryChange"
      >
        <swiper-item v-for="(img, i) in product.images" :key="i">
          <view class="gallery-item">
            <image class="gallery-img" :src="img" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
      <view class="gallery-indicator">{{ galleryIndex + 1 }}/{{ product.images.length }}</view>
    </view>

    <!-- 商品信息区 -->
    <view class="info-section">
      <!-- 价格与标签 -->
      <view class="price-row">
        <text class="price">¥{{ product.price }}</text>
        <view class="tags" v-if="product.tagLabels && product.tagLabels.length">
          <text class="tag" v-for="t in product.tagLabels" :key="t">{{ t }}</text>
        </view>
        <view class="tags" v-else>
          <text class="tag">包邮</text>
        </view>
        <text class="view-offer" @click="viewOffers">查看优惠 ›</text>
      </view>
      <view v-if="product.originPrice" class="origin-price-row">
        <text class="origin-price">¥{{ product.originPrice }}</text>
      </view>

      <!-- 商品名称 -->
      <view class="name-row">
        <text class="product-name">{{ product.name }}</text>
      </view>
      <view class="subtitle-row" v-if="product.subtitle">
        <text class="subtitle">{{ product.subtitle }}</text>
      </view>

      <!-- 发货与服务 -->
      <view class="delivery-row">
        <text class="label">发货</text>
        <text class="value">{{ product.shippingFrom }}</text>
      </view>
      <view class="service-row">
        <text class="label">服务</text>
        <text class="value">{{ product.service }}</text>
      </view>

      <!-- 销量与店铺 -->
      <view v-if="product.sales || product.shop" class="extra-row">
        <text v-if="product.sales" class="extra-text">{{ product.sales }}</text>
        <text v-if="product.shop" class="extra-text">{{ product.shop }}</text>
      </view>

      <!-- 款式选择（多图时显示） -->
      <view class="style-row" v-if="product.styles && product.styles.length" @click="showStylePicker">
        <text class="label">选择</text>
        <text class="style-title">款式</text>
        <view class="style-preview">
          <view
            v-for="(style, idx) in product.styles"
            :key="idx"
            class="style-option"
            :class="{ active: idx === selectedStyleIndex }"
            @click.stop="selectStyle(idx)"
          >
            <image class="style-thumb" :src="style.thumb" mode="aspectFill" />
            <view v-if="idx === selectedStyleIndex" class="style-check">✓</view>
          </view>
        </view>
        <text class="arrow">›</text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="action-bar">
      <view class="action-cart" @click="goCart">
        <text class="action-icon">🛒</text>
      </view>
      <view class="action-btn add-cart" @click="addToCart">加购物车</view>
      <view class="action-btn buy-now" @click="buyNow">立即购买</view>
    </view>
  </view>
</template>

<script>
function buildProductFromItem(item) {
  if (!item) return null
  const images = item.images && item.images.length ? item.images : (item.img ? [item.img] : [])
  const styles = (item.styles && item.styles.length)
    ? item.styles
    : (item.img ? [{ thumb: item.img }] : [])
  return {
    id: item.id,
    name: item.name || '',
    subtitle: item.desc || item.subtitle || '',
    price: item.price || '0',
    originPrice: item.originPrice || '',
    shippingFrom: item.shippingFrom || '四川成都',
    service: item.service || '破损包退・极速退款・售后保障',
    images,
    styles,
    tagLabels: item.tags || [],
    sales: item.sales || '',
    shop: item.shop || '',
  }
}

const defaultProduct = {
  id: 1,
  name: '千里江山图系列餐盘-青山远黛',
  subtitle: '源于千里江山图',
  price: '48',
  originPrice: '',
  shippingFrom: '四川成都',
  service: '破损包退・极速退款・售后保障',
  images: [
    'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/left_picture.png',
    'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/titile_bg.png',
    'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/market_2.png',
    'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/market_3.png',
  ],
  styles: [
    { id: 1, name: '青山远黛', thumb: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/left_picture.png' },
    { id: 2, name: '青绿流苏', thumb: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/ji_shi/right_bg.png' },
  ],
  tagLabels: ['包邮', '换购'],
  sales: '',
  shop: '',
}

export default {
  data() {
    return {
      galleryIndex: 0,
      selectedStyleIndex: 0,
      product: {
        ...defaultProduct,
        images: [...defaultProduct.images],
        styles: [...defaultProduct.styles],
      },
    }
  },
  onLoad(options) {
    const stored = uni.getStorageSync('market_detail_product')
    const built = buildProductFromItem(stored)
    if (built && built.images && built.images.length) {
      this.product = built
    } else if (options.id) {
      this.product.id = options.id
      if (options.name) this.product.name = decodeURIComponent(options.name)
    }
  },
  methods: {
    onGalleryChange(e) {
      this.galleryIndex = e.detail.current
    },
    viewOffers() {
      uni.showToast({ title: '查看优惠', icon: 'none' })
    },
    selectStyle(idx) {
      this.selectedStyleIndex = idx
    },
    showStylePicker() {
      // 可扩展为弹窗选择
    },
    goCart() {
      uni.showToast({ title: '购物车', icon: 'none' })
    },
    addToCart() {
      uni.showToast({ title: '已加入购物车', icon: 'success' })
    },
    buyNow() {
      uni.showToast({ title: '立即购买', icon: 'none' })
    },
  },
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: 140rpx;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif;
}

/* 图片轮播 */
.gallery {
  position: relative;
  width: 100%;
  height: 680rpx;
  background-color: #f8f6f2;
}

.gallery-swiper {
  width: 100%;
  height: 100%;
}

.gallery-item {
  width: 100%;
  height: 100%;
}

.gallery-img {
  width: 100%;
  height: 100%;
  display: block;
}

.gallery-indicator {
  position: absolute;
  right: 24rpx;
  bottom: 24rpx;
  padding: 8rpx 20rpx;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 24rpx;
  border-radius: 24rpx;
}

/* 商品信息 */
.info-section {
  padding: 24rpx 30rpx 30rpx;
}

.price-row {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.price {
  font-size: 48rpx;
  font-weight: 600;
  color: #9ea97f;
  margin-right: 20rpx;
}

.tags {
  display: flex;
  gap: 12rpx;
  margin-right: auto;
}

.tag {
  padding: 4rpx 16rpx;
  font-size: 22rpx;
  color: #9ea97f;
  background-color: rgba(158, 169, 127, 0.12);
  border-radius: 6rpx;
  border: 1rpx solid rgba(158, 169, 127, 0.35);
}

.view-offer {
  font-size: 26rpx;
  color: #666;
}

.origin-price-row {
  margin-bottom: 12rpx;
}

.origin-price {
  font-size: 26rpx;
  color: #999;
  text-decoration: line-through;
}

.name-row {
  margin-bottom: 8rpx;
}

.product-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.subtitle-row {
  margin-bottom: 24rpx;
}

.subtitle {
  font-size: 26rpx;
  color: #999;
}

.delivery-row,
.service-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16rpx;
  font-size: 26rpx;
}

.extra-row {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 16rpx;
  font-size: 24rpx;
  color: #999;
}

.extra-text {
  flex-shrink: 0;
}

.label {
  color: #999;
  width: 80rpx;
  flex-shrink: 0;
}

.value {
  color: #666;
  flex: 1;
}

.style-row {
  display: flex;
  align-items: center;
  padding: 20rpx 0;
  border-top: 1rpx solid #f0f0f0;
  margin-top: 8rpx;
}

.style-title {
  margin-right: 20rpx;
  font-size: 28rpx;
  color: #333;
}

.style-preview {
  flex: 1;
  display: flex;
  gap: 24rpx;
}

.style-option {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 2rpx solid #eee;
}

.style-option.active {
  border-color: #9ea97f;
}

.style-thumb {
  width: 100%;
  height: 100%;
}

.style-check {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 32rpx;
  height: 32rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 8rpx;
}

.arrow {
  font-size: 28rpx;
  color: #999;
  margin-left: 8rpx;
}

/* 底部操作栏 */
.action-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 120rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  display: flex;
  align-items: center;
  padding: 0 24rpx;
  padding-bottom: env(safe-area-inset-bottom);
  gap: 24rpx;
  z-index: 100;
}

.action-cart {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon {
  font-size: 44rpx;
}

.action-btn {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  font-weight: 500;
  border-radius: 40rpx;
}

.add-cart {
  background-color: #f5f5f5;
  color: #333;
}

.buy-now {
  background-color: #9ea97f;
  color: #fff;
}
</style>
