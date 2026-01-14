<template>
  <view class="page">
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
      <view class="nav-item">
        <view class="nav-icon-wrapper">
          <image class="nav-icon-img" src="/static/ji_shi/left.png" mode="aspectFit" />
        </view>
        <text class="nav-text">新品速递</text>
      </view>
      <view class="nav-item">
        <view class="nav-icon-wrapper">
          <image class="nav-icon-img" src="/static/ji_shi/middle.png" mode="aspectFit" />
        </view>
        <text class="nav-text">系列好物</text>
      </view>
      <view class="nav-item">
        <view class="nav-icon-wrapper">
          <image class="nav-icon-img" src="/static/ji_shi/right.png" mode="aspectFit" />
        </view>
        <text class="nav-text">全部商品</text>
      </view>
    </view>

    <!-- 热门商品 -->
    <view class="section">
      <view class="section-header" :class="{ 'animate-in': pageReady }">
        <text class="section-title">热门商品</text>
        <text class="section-arrow">→</text>
      </view>
      <view class="product-grid" :class="{ 'animate-in': pageReady }">
        <view class="product-card" v-for="item in hotProducts" :key="item.name">
          <view class="product-card-img-wrapper">
            <image class="product-card-img" :src="item.img" mode="aspectFill" />
          </view>
          <text class="product-card-name">{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- 新品推荐 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">新品推荐</text>
        <text class="section-arrow">→</text>
      </view>
      <view class="new-products-banner">
        <image class="new-products-img" src="/static/ji_shi/right_bg.png" mode="aspectFill" />
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
export default {
  data() {
    return {
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
        { name: '青山远黛餐盘', img: '/static/ji_shi/left_picture.png' },
        { name: '青绿流苏团扇', img: '/static/ji_shi/right_bg.png' },
      ],
      tabs: [
        { key: 'home', label: '首页', path: '/pages/main_index/main_index' },
        { key: 'discover', label: '发现', path: '/pages/discover/discover' },
        { key: 'market', label: '集市', path: '/pages/market/market' },
        { key: 'me', label: '我的', path: '/pages/me/me' },
      ],
    }
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

.product-card-name {
  display: block;
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  text-align: center;
  font-weight: 500;
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

/* 新品推荐 */
.new-products-banner {
  width: 100%;
  height: 200rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.new-products-img {
  width: 100%;
  height: 100%;
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
