<template>
  <view class="page" :class="{ 'has-cart-float': cartTotalCount > 0 }">
    <!-- 顶部大图 + 搜索栏 + 购物车 -->
    <view class="hero">
      <swiper
        class="hero-swiper"
        :current="heroCurrentIndex"
        :autoplay="true"
        :interval="5000"
        :circular="true"
        :duration="500"
        @change="onHeroSwiperChange"
      >
        <swiper-item v-for="(item, index) in heroCarouselList" :key="index">
          <view class="hero-swiper-item">
            <image class="hero-img" :src="item" mode="aspectFill" />
          </view>
        </swiper-item>
      </swiper>
      <view class="search-bar" :class="{ 'animate-in': pageReady }">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          confirm-type="search"
          placeholder="输入关键词"
          placeholder-class="search-placeholder"
        />
      </view>
      <view class="cart-icon">🛒</view>
      <view class="hero-dots">
        <view
          v-for="(item, index) in heroCarouselList"
          :key="index"
          class="dot"
          :class="{ active: index === heroCurrentIndex }"
        />
      </view>
    </view>

    <!-- 快捷入口 -->
    <view class="quick-nav" :class="{ 'animate-in': pageReady }">
      <view class="nav-item" @click="goNew">
        <view class="nav-icon-wrapper">
          <image class="nav-icon-img" src="/static/ji_shi/left.png" mode="aspectFit" />
        </view>
        <text class="nav-text">新品速递</text>
      </view>
      <view class="nav-item" @click="goSeries">
        <view class="nav-icon-wrapper">
          <image class="nav-icon-img" src="/static/ji_shi/middle.png" mode="aspectFit" />
        </view>
        <text class="nav-text">系列好物</text>
      </view>
      <view class="nav-item" @click="goAll">
        <view class="nav-icon-wrapper">
          <image class="nav-icon-img" src="/static/ji_shi/right.png" mode="aspectFit" />
        </view>
        <text class="nav-text">全部商品</text>
      </view>
    </view>

    <!-- 热门商品 -->
    <view class="section">
      <view class="section-header" :class="{ 'animate-in': pageReady }" @click="goAll">
        <text class="section-title">热门商品</text>
        <text class="section-arrow">→</text>
      </view>
      <view class="product-grid" :class="{ 'animate-in': pageReady }">
        <view
          class="product-card"
          v-for="item in hotProducts"
          :key="item.name"
          @click="goProductDetail(item)"
        >
          <view class="product-card-img-wrapper">
            <image class="product-card-img" :src="item.img" mode="aspectFill" />
          </view>
          <view class="product-card-info">
            <text class="product-card-name">{{ item.name }}</text>
            <text class="product-card-price">¥{{ item.price }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 新品速递 -->
    <view class="section section-new">
      <view class="section-header" :class="{ 'animate-in': pageReady }" @click="goNew">
        <text class="section-title">新品速递</text>
        <text class="section-arrow">→</text>
      </view>
      <view class="new-list" :class="{ 'animate-in': pageReady }">
        <view
          class="new-item"
          v-for="(item, index) in newProducts"
          :key="item.id"
          @click="goProductDetail(item)"
        >
          <view class="new-item-img-wrap">
            <image class="new-item-img" :src="item.img" mode="aspectFill" />
            <view v-if="item.tag" class="new-item-tag">{{ item.tag }}</view>
          </view>
          <view class="new-item-body">
            <text class="new-item-title">{{ item.name }}</text>
            <text class="new-item-desc">{{ item.desc }}</text>
            <view class="new-item-price-row">
              <text class="new-item-price">¥{{ item.price }}</text>
              <view v-if="item.originPrice" class="new-item-origin">¥{{ item.originPrice }}</view>
            </view>
            <view class="new-item-tags">
              <text
                class="new-item-tag-item"
                v-for="t in item.tags"
                :key="t"
              >{{ t }}</text>
            </view>
            <view class="new-item-extra">
              <text class="new-item-sales">{{ item.sales }}</text>
              <text class="new-item-shop">{{ item.shop }}</text>
            </view>
            <view class="new-item-stepper">
              <template v-if="getCartQty(item) > 0">
                <view class="stepper-btn minus" @click.stop="minusFromCart(item)">－</view>
                <text class="stepper-num">{{ getCartQty(item) }}</text>
                <view class="stepper-btn plus" @click.stop="addToCart(item)">＋</view>
              </template>
              <view v-else class="new-item-add" @click.stop="addToCart(item)">
                <text class="new-item-add-icon">+</text>
              </view>
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
          <text v-if="cartTotalDiscount > 0" class="cart-float-discount">共减¥{{ cartTotalDiscount.toFixed(2) }}</text>
        </view>
        <view class="cart-float-btn" @click.stop="goSettle">去结算</view>
        <view class="cart-float-arrow" :class="{ up: cartPanelOpen }">∧</view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="tabbar">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: tab.key === activeNav }"
        @click="switchNav(tab.key)"
      >
        <view class="tab-icon" :class="'icon-' + tab.key" />
        <text class="tab-text">{{ tab.label }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getCart, setCart, getCartList, addToCart as cartAdd, minusFromCart as cartMinus } from '@/utils/marketCart'
import { newProducts as newProductsData, allProducts, getProductMap } from '@/utils/marketProducts'

export default {
  data() {
    return {
      cartPanelOpen: false,
      activeNav: 'market',
      pageReady: false,
      heroCurrentIndex: 0,
      heroCarouselList: [
        '/static/ji_shi/titile_bg.png',
        '/static/ji_shi/market_2.png',
        '/static/ji_shi/market_3.png',
        '/static/ji_shi/market_4.png',
      ],
      hotProducts: [
        {
          id: 1,
          name: '千里江山图系列餐盘-青山远黛',
          img: '/static/ji_shi/left_picture.png',
          price: '48',
        },
        {
          id: 2,
          name: '青绿流苏团扇',
          img: '/static/ji_shi/right_bg.png',
          price: '68',
        },
      ],
      newProducts: newProductsData,
      tabs: [
        { key: 'home', label: '首页', path: '/pages/main_index/main_index' },
        { key: 'discover', label: '发现', path: '/pages/discover/discover' },
        { key: 'market', label: '集市', path: '/pages/market/market' },
        { key: 'me', label: '我的', path: '/pages/me/me' },
      ],
      cart: {},
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
    cartTotalDiscount() {
      let discount = 0
      this.newProducts.forEach((p) => {
        const q = this.cart[p.id] || this.cart[String(p.id)] || 0
        if (q > 0 && p.originPrice) {
          const orig = parseFloat(p.originPrice)
          const curr = parseFloat(p.price)
          if (orig > curr) discount += (orig - curr) * q
        }
      })
      return Math.round(discount * 100) / 100
    },
  },
  onShow() {
    this.cart = getCart()
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true
    }, 50)
  },
  methods: {
    onHeroSwiperChange(e) {
      this.heroCurrentIndex = e.detail.current
    },
    switchNav(key) {
      if (this.activeNav === key) return
      this.activeNav = key
      const tab = this.tabs.find((t) => t.key === key)
      if (tab && tab.path && tab.path !== '/pages/market/market') {
        uni.redirectTo({
          url: tab.path,
        })
      }
    },
    goProductDetail(item) {
      uni.setStorageSync('market_detail_product', item)
      uni.navigateTo({
        url: `/pages/market/detail?id=${item.id}`,
      })
    },
    goNew() {
      uni.navigateTo({ url: '/pages/market/all?tab=new' })
    },
    goSeries() {
      uni.navigateTo({ url: '/pages/market/series' })
    },
    goAll() {
      uni.navigateTo({ url: '/pages/market/all' })
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
  },
}
</script>

<style scoped>
.page {
  background-color: #f6f2e9;
  min-height: 100vh;
  padding-bottom: 150rpx;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

/* 顶部大图区域 */
.hero {
  position: relative;
  height: 680rpx;
  overflow: hidden;
}

.hero-swiper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 680rpx;
}

.hero-swiper swiper-item {
  height: 680rpx;
}

.hero-swiper-item {
  width: 100%;
  height: 100%;
}

.hero-img {
  width: 100%;
  height: 100%;
  display: block;
}

.search-bar {
  position: absolute;
  top: 60rpx;
  left: 30rpx;
  right: 100rpx;
  height: 80rpx;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(-20rpx);
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}

.search-bar.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.search-icon {
  font-size: 32rpx;
  color: #b6b6b6;
  margin-right: 16rpx;
  line-height: 1;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.search-placeholder {
  color: #b6b6b6;
}

.cart-icon {
  position: absolute;
  top: 70rpx;
  right: 40rpx;
  font-size: 44rpx;
  color: #666;
}

.hero-dots {
  position: absolute;
  bottom: 30rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background-color: #ddd4c5;
}

.dot.active {
  background-color: #9ea97f;
}

/* 快捷入口 */
.quick-nav {
  display: flex;
  justify-content: space-around;
  padding: 40rpx 30rpx;
  background-color: #edece7;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}

.quick-nav.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.nav-icon-wrapper {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon-img {
  width: 80rpx;
  height: 80rpx;
}

.nav-text {
  font-size: 26rpx;
  color: #333;
}

/* H5悬停效果 */
@media (hover: hover) {
  .nav-item {
    transition: transform 0.3s ease;
  }
  .nav-item:hover {
    transform: translateY(-4rpx);
  }
  .nav-icon-wrapper {
    transition: transform 0.3s ease;
  }
  .nav-item:hover .nav-icon-wrapper {
    transform: scale(1.1);
  }
  .nav-text {
    transition: color 0.3s ease;
  }
  .nav-item:hover .nav-text {
    color: #9ea97f;
  }
}

/* 商品区域 */
.section {
  padding: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-header.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 34rpx;
  color: #333;
  font-weight: 600;
}

.section-arrow {
  font-size: 32rpx;
  color: #999;
}

.product-grid {
  display: flex;
  gap: 20rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.product-grid.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.product-card {
  flex: 1;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  will-change: opacity;
}

.product-card-img-wrapper {
  width: 100%;
  height: 280rpx;
  overflow: hidden;
}

.product-card-img {
  width: 100%;
  height: 100%;
}

.product-card-info {
  padding: 20rpx;
}

.product-card-name {
  display: block;
  font-size: 28rpx;
  color: #333;
  text-align: center;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.product-card-price {
  display: block;
  font-size: 32rpx;
  color: #e64340;
  font-weight: 600;
  text-align: center;
}

/* H5悬停效果 */
@media (hover: hover) {
  .product-card {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
  }
  .product-card:hover {
    transform: translateY(-8rpx) scale(1.02);
    box-shadow: 0 20rpx 50rpx rgba(0, 0, 0, 0.15);
  }
  .product-card:hover .product-card-img {
    transform: scale(1.08);
  }
  .product-card:hover .product-card-name {
    color: #9ea97f;
  }
  .product-card-img {
    transition: transform 0.4s ease;
  }
  .product-card-name {
    transition: color 0.3s ease;
  }
}

/* 新品速递 - 左右分栏列表 */
.section-new {
  padding-top: 16rpx;
}

.new-list {
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.new-list.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.new-item {
  display: flex;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  align-items: stretch;
}

.new-item:last-child {
  margin-bottom: 0;
}

.new-item-img-wrap {
  position: relative;
  width: 240rpx;
  height: 240rpx;
  flex-shrink: 0;
  background-color: #f8f6f2;
}

.new-item-img {
  width: 100%;
  height: 100%;
  display: block;
}

.new-item-tag {
  position: absolute;
  left: 0;
  top: 12rpx;
  padding: 4rpx 16rpx;
  font-size: 20rpx;
  color: #fff;
  background-color: #9ea97f;
  border-radius: 0 8rpx 8rpx 0;
}

.new-item-body {
  flex: 1;
  padding: 20rpx 20rpx 20rpx 24rpx;
  display: flex;
  flex-direction: column;
  min-width: 0;
  position: relative;
  padding-right: 170rpx;
}

.new-item-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.new-item-desc {
  font-size: 24rpx;
  color: #999;
  line-height: 1.4;
  margin-bottom: 12rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.new-item-price-row {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
  margin-bottom: 10rpx;
}

.new-item-price {
  font-size: 36rpx;
  font-weight: 600;
  color: #9ea97f;
}

.new-item-origin {
  font-size: 24rpx;
  color: #bbb;
  text-decoration: line-through;
}

.new-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx;
  margin-bottom: 10rpx;
}

.new-item-tag-item {
  padding: 2rpx 12rpx;
  font-size: 20rpx;
  color: #9ea97f;
  background-color: rgba(158, 169, 127, 0.12);
  border-radius: 6rpx;
  border: 1rpx solid rgba(158, 169, 127, 0.35);
}

.new-item-extra {
  display: flex;
  align-items: center;
  gap: 16rpx;
  font-size: 22rpx;
  color: #999;
}

.new-item-sales {
  flex-shrink: 0;
}

.new-item-shop {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.new-item-add {
  position: absolute;
  right: 16rpx;
  bottom: 20rpx;
  width: 56rpx;
  height: 56rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  font-weight: 300;
  line-height: 1;
}

.new-item-add-icon {
  margin-top: -4rpx;
}

.new-item-stepper {
  position: absolute;
  right: 16rpx;
  bottom: 20rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.stepper-btn {
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

.stepper-btn.minus {
  font-weight: 300;
}

.stepper-num {
  min-width: 40rpx;
  font-size: 28rpx;
  color: #333;
  text-align: center;
}

.cart-float-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(140rpx + env(safe-area-inset-bottom));
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.cart-float {
  margin: 0 24rpx;
  height: 100rpx;
  background-color: #fff;
  border-radius: 50rpx;
  box-shadow: 0 -4rpx 24rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 24rpx;
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
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.cart-float-total {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
}

.cart-float-discount {
  font-size: 22rpx;
  color: #999;
  margin-top: 4rpx;
}

.cart-float-btn {
  width: 180rpx;
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

.page.has-cart-float {
  padding-bottom: 260rpx;
}

@media (hover: hover) {
  .new-item {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .new-item:hover {
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  }
  .new-item-add:hover {
    opacity: 0.9;
  }
}

/* 底部导航栏 */
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 140rpx;
  background-color: #fbf8f2;
  border-top: 1rpx solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.06);
  z-index: 1000;
}

.tab-item {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
  font-size: 22rpx;
  letter-spacing: 2rpx;
}

.tab-item.active {
  color: #9ea97f;
}

.tab-icon {
  width: 54rpx;
  height: 54rpx;
  margin-bottom: 8rpx;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.85;
}

.tab-item.active .tab-icon {
  opacity: 1;
}

.icon-home {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 28 L32 10 L54 28' stroke='%239ea97f' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Crect x='18' y='27' width='28' height='24' rx='2' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M28 51V37H36V51' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}

.icon-discover {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 16 L40 28 L52 32 L40 36 L32 48 L24 36 L12 32 L24 28 Z' stroke='%239ea97f' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
}

.icon-market {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='14' y='16' width='36' height='30' rx='4' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M14 24H50' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M22 16V12H42V16' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M24 30H40' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}

.icon-me {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='32' cy='22' r='10' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M16 50C18 42 24 38 32 38C40 38 46 42 48 50' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}
</style>
