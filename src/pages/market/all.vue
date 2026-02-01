<template>
  <view class="all-page" :class="{ 'has-cart-float': cartTotalCount > 0 }">
    <view class="header">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          placeholder="搜索全部好物"
          placeholder-class="search-placeholder"
          v-model="keyword"
          @confirm="onSearch"
        />
        <view class="search-btn" @click="onSearch">搜索</view>
      </view>
    </view>

    <view class="tabs">
      <view class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">全部</view>
      <view class="tab" :class="{ active: activeTab === 'new' }" @click="activeTab = 'new'">新品</view>
      <view class="tab" :class="{ active: activeTab === 'series' }" @click="activeTab = 'series'">系列</view>
    </view>

    <view class="product-grid">
      <view
        class="all-card"
        v-for="item in filteredProducts"
        :key="item.id"
        @click="goDetail(item)"
      >
        <view class="all-card-img-wrap">
          <image class="all-card-img" :src="item.img" mode="aspectFill" />
          <view v-if="item.tag" class="all-card-tag">{{ item.tag }}</view>
        </view>
        <view class="all-card-body">
          <text class="all-card-title">{{ item.name }}</text>
          <text class="all-card-desc">{{ item.desc }}</text>
          <view class="all-card-footer">
            <text class="all-card-price">¥{{ item.price }}</text>
            <text class="all-card-sales">{{ item.sales || '' }}</text>
          </view>
          <view class="all-card-stepper">
            <template v-if="getCartQty(item) > 0">
              <view class="stepper-btn minus" @click.stop="minusFromCart(item)">－</view>
              <text class="stepper-num">{{ getCartQty(item) }}</text>
              <view class="stepper-btn plus" @click.stop="addToCart(item)">＋</view>
            </template>
            <view v-else class="all-card-add" @click.stop="addToCart(item)">+</view>
          </view>
        </view>
      </view>
    </view>

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

    <view class="back-btn" @click="goBack">
      <text class="back-icon">‹</text>
    </view>
  </view>
</template>

<script>
import { getCart, setCart, getCartList, addToCart as cartAdd, minusFromCart as cartMinus } from '@/utils/marketCart'
import { allProducts, newProducts, seriesProducts, getProductMap } from '@/utils/marketProducts'

export default {
  data() {
    return {
      keyword: '',
      activeTab: 'all',
      cartPanelOpen: false,
      cart: {},
    }
  },
  computed: {
    productMap() {
      return getProductMap(allProducts)
    },
    filteredProducts() {
      let list = allProducts
      if (this.activeTab === 'new') list = newProducts
      else if (this.activeTab === 'series') list = seriesProducts
      if (!this.keyword.trim()) return list
      const k = this.keyword.trim().toLowerCase()
      return list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(k)) ||
          (p.desc && p.desc.toLowerCase().includes(k)),
      )
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
  },
  onLoad(options) {
    if (options.tab === 'new') this.activeTab = 'new'
    else if (options.tab === 'series') this.activeTab = 'series'
  },
  onShow() {
    this.cart = getCart()
  },
  methods: {
    onSearch() {
      uni.showToast({ title: this.keyword ? `搜索: ${this.keyword}` : '请输入关键词', icon: 'none' })
    },
    goDetail(item) {
      uni.setStorageSync('market_detail_product', item)
      uni.navigateTo({ url: `/pages/market/detail?id=${item.id}` })
    },
    getCartQty(item) {
      return this.cart[item.id] || this.cart[String(item.id)] || 0
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
    goBack() {
      uni.navigateBack({ delta: 1, fail: () => uni.redirectTo({ url: '/pages/market/market' }) })
    },
  },
}
</script>

<style scoped>
.all-page {
  min-height: 100vh;
  background-color: #f6f2e9;
  padding-top: calc(env(safe-area-inset-top) + 20rpx);
  padding-bottom: 200rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif;
}

.all-page.has-cart-float {
  padding-bottom: 240rpx;
}

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

.tabs {
  display: flex;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.tab {
  padding: 12rpx 28rpx;
  font-size: 28rpx;
  color: #666;
  background-color: #fff;
  border-radius: 32rpx;
  border: 1rpx solid #e8e6dc;
}

.tab.active {
  background-color: #9ea97f;
  color: #fff;
  border-color: #9ea97f;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.all-card {
  width: calc(50% - 10rpx);
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

.all-card-img-wrap {
  position: relative;
  width: 100%;
  height: 260rpx;
  background-color: #f8f6f2;
}

.all-card-img {
  width: 100%;
  height: 100%;
  display: block;
}

.all-card-tag {
  position: absolute;
  left: 0;
  top: 12rpx;
  padding: 4rpx 12rpx;
  font-size: 20rpx;
  color: #fff;
  background-color: #9ea97f;
  border-radius: 0 8rpx 8rpx 0;
}

.all-card-body {
  padding: 20rpx;
  position: relative;
  padding-right: 100rpx;
}

.all-card-title {
  display: block;
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.all-card-desc {
  display: block;
  font-size: 22rpx;
  color: #999;
  margin-bottom: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.all-card-footer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.all-card-price {
  font-size: 30rpx;
  font-weight: 600;
  color: #9ea97f;
}

.all-card-sales {
  font-size: 20rpx;
  color: #999;
}

.all-card-stepper {
  position: absolute;
  right: 16rpx;
  bottom: 20rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.all-card-stepper .stepper-btn {
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

.all-card-stepper .stepper-num {
  min-width: 36rpx;
  font-size: 26rpx;
  color: #333;
  text-align: center;
}

.all-card-add {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #fff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
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
</style>
