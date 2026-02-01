<template>
  <view class="series-page" :class="{ 'has-cart-float': cartTotalCount > 0 }">
    <!-- 顶部搜索区 -->
    <view class="header">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          confirm-type="search"
          placeholder="搜索宋韵好物"
          placeholder-class="search-placeholder"
          v-model="keyword"
          @confirm="onSearch"
        />
        <view class="search-btn" @click="onSearch">搜索</view>
      </view>
    </view>

    <!-- 精选话题/活动横幅 -->
    <view class="banner" v-if="bannerText">
      <text class="banner-text">{{ bannerText }}</text>
      <text class="banner-action" @click="onBannerAction">立即查看 ></text>
      <view class="banner-close" @click="bannerText = ''">×</view>
    </view>

    <!-- 商品网格 -->
    <view class="content">
      <!-- 大图推荐位 -->
      <view class="featured-card" @click="goDetail(featuredProduct)" v-if="featuredProduct">
        <view class="featured-img-wrap">
          <image class="featured-img" :src="featuredProduct.img" mode="aspectFill" />
          <view v-if="featuredProduct.tag" class="featured-tag">{{ featuredProduct.tag }}</view>
        </view>
        <view class="featured-info">
          <text class="featured-title">{{ featuredProduct.name }}</text>
          <text class="featured-desc">{{ featuredProduct.desc }}</text>
          <view class="featured-footer">
            <text class="featured-price">¥{{ featuredProduct.price }}</text>
            <text class="featured-sales">{{ featuredProduct.sales }}</text>
          </view>
          <view class="featured-stepper">
            <template v-if="getCartQty(featuredProduct) > 0">
              <view class="stepper-btn minus" @click.stop="minusFromCart(featuredProduct)">－</view>
              <text class="stepper-num">{{ getCartQty(featuredProduct) }}</text>
              <view class="stepper-btn plus" @click.stop="addToCart(featuredProduct)">＋</view>
            </template>
            <view v-else class="featured-add" @click.stop="addToCart(featuredProduct)">+</view>
          </view>
        </view>
      </view>

      <!-- 精选话题 -->
      <view class="topic-card">
        <view class="topic-tag">精选话题</view>
        <view class="topic-body">
          <text class="topic-title">宋韵雅集的文创好物</text>
          <text class="topic-link" @click="goTopic">立即围观讨论 >></text>
        </view>
      </view>

      <!-- 商品列表（2列网格） -->
      <view class="product-grid">
        <view
          class="series-card"
          v-for="item in filteredProducts"
          :key="item.id"
          @click="goDetail(item)"
        >
          <view class="series-card-img-wrap">
            <image class="series-card-img" :src="item.img" mode="aspectFill" />
            <view v-if="item.tag" class="series-card-tag">{{ item.tag }}</view>
            <view v-if="item.tag2" class="series-card-tag2">{{ item.tag2 }}</view>
          </view>
          <view class="series-card-body">
            <text class="series-card-title">{{ item.name }}</text>
            <text class="series-card-desc">{{ item.desc }}</text>
            <view class="series-card-footer">
              <text class="series-card-price">¥{{ item.price }}</text>
              <text class="series-card-sales">{{ item.sales }}</text>
            </view>
            <view class="series-card-stepper">
              <template v-if="getCartQty(item) > 0">
                <view class="stepper-btn minus" @click.stop="minusFromCart(item)">－</view>
                <text class="stepper-num">{{ getCartQty(item) }}</text>
                <view class="stepper-btn plus" @click.stop="addToCart(item)">＋</view>
              </template>
              <view v-else class="series-card-add" @click.stop="addToCart(item)">+</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 购物车浮窗 -->
    <view v-if="cartTotalCount > 0" class="cart-float-wrap">
      <view v-if="cartPanelOpen" class="cart-panel">
        <view class="cart-panel-title">购物车</view>
        <scroll-view class="cart-panel-list" scroll-y>
          <view class="cart-panel-item" v-for="row in cartList" :key="row.id">
            <image class="cart-panel-img" :src="row.img" mode="aspectFill" />
            <view class="cart-panel-info">
              <text class="cart-panel-name">{{ row.name }}</text>
              <view class="cart-panel-row">
                <text class="cart-panel-price">¥{{ row.price }} × {{ row.qty }}</text>
                <view class="cart-panel-stepper">
                  <view class="cps-btn" @click.stop="cartMinus(row)">－</view>
                  <text class="cps-num">{{ row.qty }}</text>
                  <view class="cps-btn" @click.stop="cartPlus(row)">＋</view>
                </view>
              </view>
              <text class="cart-panel-subtotal">小计 ¥{{ row.subtotal }}</text>
            </view>
          </view>
        </scroll-view>
        <view class="cart-panel-footer">
          <text class="cart-panel-total">共 {{ cartTotalCount }} 件 ¥{{ cartTotalPrice }}</text>
          <view class="cart-panel-settle" @click="goSettle">去结算</view>
        </view>
      </view>
      <view class="cart-float" @click="toggleCartPanel">
        <view class="cart-float-left">
          <view class="cart-float-icon-wrap">
            <text class="cart-float-icon">🛒</text>
            <view class="cart-float-badge">{{ cartTotalCount }}</view>
          </view>
        </view>
        <view class="cart-float-center">
          <text class="cart-float-total">¥{{ cartTotalPrice }}</text>
        </view>
        <view class="cart-float-btn" @click.stop="goSettle">去结算</view>
        <view class="cart-float-arrow" :class="{ up: cartPanelOpen }">∧</view>
      </view>
    </view>

    <!-- 返回按钮 -->
    <view class="back-btn" @click="goBack">
      <text class="back-icon">‹</text>
    </view>
  </view>
</template>

<script>
import { getCart, getCartList, addToCart as cartAdd, minusFromCart as cartMinus } from '@/utils/marketCart'
import { seriesProducts as seriesData, allProducts, getProductMap } from '@/utils/marketProducts'

export default {
  data() {
    return {
      keyword: '',
      bannerText: '宋韵好物 · 精选文创至高享8折',
      featuredProduct: null,
      cartPanelOpen: false,
      cart: {},
      seriesProducts: seriesData,
    }
  },
  computed: {
    productMap() {
      return getProductMap(allProducts)
    },
    cartList() {
      return getCartList(this.productMap, this.cart)
    },
    cartTotalCount() {
      return Object.values(this.cart).reduce((s, q) => s + (Number(q) || 0), 0)
    },
    cartTotalPrice() {
      let total = 0
      allProducts.forEach((p) => {
        const q = this.cart[p.id] || this.cart[String(p.id)] || 0
        if (q > 0) total += parseFloat(p.price) * q
      })
      return total.toFixed(2)
    },
    filteredProducts() {
      if (!this.keyword.trim()) return this.seriesProducts
      const k = this.keyword.trim().toLowerCase()
      return this.seriesProducts.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(k)) ||
          (p.desc && p.desc.toLowerCase().includes(k)),
      )
    },
  },
  onLoad() {
    this.featuredProduct = this.seriesProducts[0] || null
  },
  onShow() {
    this.cart = getCart()
  },
  methods: {
    getCartQty(item) {
      return this.cart[item.id] || this.cart[String(item.id)] || 0
    },
    onSearch() {
      uni.showToast({ title: this.keyword ? `搜索: ${this.keyword}` : '请输入关键词', icon: 'none' })
    },
    onBannerAction() {
      uni.showToast({ title: '查看活动', icon: 'none' })
    },
    goDetail(item) {
      uni.setStorageSync('market_detail_product', item)
      uni.navigateTo({ url: `/pages/market/detail?id=${item.id}` })
    },
    addToCart(item) {
      this.cart = cartAdd(String(item.id), 1)
    },
    minusFromCart(item) {
      this.cart = cartMinus(String(item.id), 1)
    },
    toggleCartPanel() {
      this.cartPanelOpen = !this.cartPanelOpen
    },
    cartPlus(row) {
      this.cart = cartAdd(String(row.id), 1)
    },
    cartMinus(row) {
      this.cart = cartMinus(String(row.id), 1)
    },
    goSettle() {
      if (this.cartTotalCount <= 0) return
      uni.showToast({ title: '去结算', icon: 'none' })
    },
    goTopic() {
      uni.showToast({ title: '精选话题', icon: 'none' })
    },
    goBack() {
      uni.navigateBack({ delta: 1, fail: () => uni.redirectTo({ url: '/pages/market/market' }) })
    },
  },
}
</script>

<style scoped>
.series-page {
  min-height: 100vh;
  background-color: #f6f2e9;
  padding-top: calc(env(safe-area-inset-top) + 20rpx);
  padding-bottom: 200rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif;
}

/* 顶部搜索 */
.header {
  margin-bottom: 24rpx;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 80rpx;
  background-color: #fff;
  border-radius: 40rpx;
  padding: 0 24rpx 0 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.search-icon {
  font-size: 32rpx;
  color: #999;
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.search-placeholder {
  color: #b6b6b6;
}

.search-btn {
  width: 100rpx;
  height: 56rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 26rpx;
  font-weight: 500;
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 活动横幅 */
.banner {
  position: relative;
  background: linear-gradient(135deg, #e8e6dc 0%, #ddd9cc 100%);
  border-radius: 16rpx;
  padding: 24rpx 80rpx 24rpx 24rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid rgba(158, 169, 127, 0.3);
}

.banner-text {
  font-size: 26rpx;
  color: #5a5a5a;
}

.banner-action {
  display: block;
  font-size: 24rpx;
  color: #9ea97f;
  margin-top: 8rpx;
}

.banner-close {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 48rpx;
  height: 48rpx;
  font-size: 36rpx;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 大图推荐 */
.featured-card {
  display: flex;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
}

.featured-img-wrap {
  position: relative;
  width: 320rpx;
  height: 320rpx;
  flex-shrink: 0;
  background-color: #f8f6f2;
}

.featured-img {
  width: 100%;
  height: 100%;
  display: block;
}

.featured-tag {
  position: absolute;
  left: 0;
  top: 12rpx;
  padding: 4rpx 16rpx;
  font-size: 20rpx;
  color: #fff;
  background-color: #9ea97f;
  border-radius: 0 8rpx 8rpx 0;
}

.featured-info {
  flex: 1;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
  padding-right: 80rpx;
}

.featured-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.featured-desc {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 16rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.featured-footer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.featured-price {
  font-size: 36rpx;
  font-weight: 600;
  color: #9ea97f;
}

.featured-sales {
  font-size: 22rpx;
  color: #999;
}

.featured-stepper {
  position: absolute;
  right: 20rpx;
  bottom: 24rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.featured-stepper .stepper-btn {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #fff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-stepper .stepper-num {
  min-width: 40rpx;
  font-size: 28rpx;
  color: #333;
  text-align: center;
}

.featured-add {
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #fff;
  font-size: 36rpx;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* 精选话题 */
.topic-card {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  border-left: 6rpx solid #9ea97f;
}

.topic-tag {
  font-size: 22rpx;
  color: #9ea97f;
  font-weight: 600;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.topic-body {
  flex: 1;
}

.topic-title {
  display: block;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.topic-link {
  font-size: 24rpx;
  color: #9ea97f;
}

/* 商品网格 */
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.series-card {
  width: calc(50% - 10rpx);
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.series-card-img-wrap {
  position: relative;
  width: 100%;
  height: 280rpx;
  background-color: #f8f6f2;
}

.series-card-img {
  width: 100%;
  height: 100%;
  display: block;
}

.series-card-tag {
  position: absolute;
  left: 0;
  top: 12rpx;
  padding: 4rpx 12rpx;
  font-size: 20rpx;
  color: #fff;
  background-color: #9ea97f;
  border-radius: 0 8rpx 8rpx 0;
}

.series-card-tag2 {
  position: absolute;
  right: 12rpx;
  top: 12rpx;
  padding: 4rpx 12rpx;
  font-size: 20rpx;
  color: #9ea97f;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8rpx;
  border: 1rpx solid rgba(158, 169, 127, 0.5);
}

.series-card-body {
  padding: 20rpx;
  position: relative;
  padding-right: 100rpx;
}

.series-card-stepper {
  position: absolute;
  right: 16rpx;
  bottom: 20rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.series-card-stepper .stepper-btn {
  width: 44rpx;
  height: 44rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #fff;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.series-card-stepper .stepper-num {
  min-width: 36rpx;
  font-size: 26rpx;
  color: #333;
  text-align: center;
}

.series-card-title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.series-card-desc {
  display: block;
  font-size: 22rpx;
  color: #999;
  margin-bottom: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.series-card-footer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.series-card-price {
  font-size: 30rpx;
  font-weight: 600;
  color: #9ea97f;
}

.series-card-sales {
  font-size: 20rpx;
  color: #999;
}

.series-card-add {
  position: absolute;
  right: 16rpx;
  bottom: 20rpx;
  width: 52rpx;
  height: 52rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #fff;
  font-size: 32rpx;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* 返回按钮 */
.back-btn {
  position: fixed;
  left: 24rpx;
  top: calc(env(safe-area-inset-top) + 80rpx);
  width: 72rpx;
  height: 72rpx;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.back-icon {
  font-size: 48rpx;
  color: #333;
  line-height: 1;
  margin-left: -4rpx;
}

.series-page.has-cart-float {
  padding-bottom: 240rpx;
}

.cart-float-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.cart-float {
  margin: 0 24rpx 20rpx;
  height: 100rpx;
  background-color: #fff;
  border-radius: 50rpx;
  box-shadow: 0 -4rpx 24rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 24rpx;
}

.cart-float-left {
  margin-right: 24rpx;
}

.cart-float-icon-wrap {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-float-icon {
  font-size: 48rpx;
}

.cart-float-badge {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  min-width: 36rpx;
  height: 36rpx;
  padding: 0 8rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 22rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-float-center {
  flex: 1;
}

.cart-float-total {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.cart-float-btn {
  width: 160rpx;
  height: 72rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
  border-radius: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-float-arrow {
  font-size: 24rpx;
  color: #999;
  margin-left: 12rpx;
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

.cart-float-arrow.up {
  transform: rotate(0deg);
}

.cart-panel {
  margin: 0 24rpx 16rpx;
  max-height: 400rpx;
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
  box-shadow: 0 -4rpx 24rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cart-panel-title {
  padding: 24rpx;
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  border-bottom: 1rpx solid #eee;
}

.cart-panel-list {
  flex: 1;
  max-height: 300rpx;
  padding: 16rpx;
}

.cart-panel-item {
  display: flex;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #f5f5f5;
}

.cart-panel-item:last-child {
  border-bottom: none;
}

.cart-panel-img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 12rpx;
  background-color: #f8f6f2;
  flex-shrink: 0;
}

.cart-panel-info {
  flex: 1;
  margin-left: 20rpx;
  min-width: 0;
}

.cart-panel-name {
  display: block;
  font-size: 26rpx;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 8rpx;
}

.cart-panel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6rpx;
}

.cart-panel-price {
  font-size: 24rpx;
  color: #999;
}

.cart-panel-stepper {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.cart-panel-stepper .cps-btn {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #fff;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-panel-stepper .cps-num {
  min-width: 36rpx;
  font-size: 26rpx;
  color: #333;
  text-align: center;
}

.cart-panel-subtotal {
  font-size: 24rpx;
  color: #9ea97f;
  font-weight: 500;
}

.cart-panel-footer {
  padding: 20rpx 24rpx;
  border-top: 1rpx solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart-panel-total {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.cart-panel-settle {
  padding: 16rpx 40rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
  border-radius: 36rpx;
}
</style>
