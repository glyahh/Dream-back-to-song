<template>
  <view class="page">
    <view class="hero">
      <image class="hero-img" :class="{ 'animate-in': pageReady }" src="/static/up_background.png" mode="aspectFill" />
      <view class="hero-overlay" />
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
      <view class="vertical-text">
        <!-- <text>用宋画呈现的大宋文明，在视觉上赏心悦目的宋朝可视的、生动的历史记录，可近距离观察的风雅一宋。</text> -->
      </view>
      <view class="hero-dots">
        <view class="dot active" />
        <view class="dot" />
        <view class="dot" />
      </view>
    </view>

    <view class="section">
      <view class="section-title" :class="{ 'animate-in': pageReady }">【遇见宋朝】</view>
      <view class="section-subtitle" :class="{ 'animate-in': pageReady }">宋朝衣食住行</view>
      <view class="card-grid" :class="{ 'animate-in': pageReady }">
        <view
          v-for="(item, index) in cards"
          :key="item.title"
          class="card"
          :class="{ 'card-pressed': pressedIndex === index }"
          @touchstart="handleTouchStart(index)"
          @touchend="handleTouchEnd"
          @click="handleCard(item)"
        >
          <image class="card-img" :src="item.img" mode="aspectFill" />
          <view class="card-mask" />
          <view class="card-label-bar">
            <text class="card-label">{{ item.title }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section aesthetics">
      <view class="section-title" :class="{ 'animate-in': pageReady }">【宋朝美学】</view>
      <view class="section-subtitle small" :class="{ 'animate-in': pageReady }">宋风雅韵 · 诗书画香</view>
    </view>

    <view class="tabbar">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: tab.key === activeTab }"
        @click="switchTab(tab.key)"
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
      activeTab: 'home',
      pressedIndex: -1,
      pageReady: false,
      cards: [
        { title: '服饰', img: '/static/fushi.png' },
        { title: '饮食', img: '/static/yinshi.png' },
        { title: '住宿', img: '/static/zhusuo.png' },
        { title: '出行', img: '/static/chuxin.png' },
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
    handleTouchStart(index) {
      this.pressedIndex = index
    },
    handleTouchEnd() {
      setTimeout(() => {
        this.pressedIndex = -1
      }, 150)
    },
    handleCard(item) {
      uni.showToast({
        title: `前往${item.title}`,
        icon: 'none',
      })
    },
    switchTab(key) {
      this.activeTab = key
      const tab = this.tabs.find((t) => t.key === key)
      // 首页自身不跳转，其它 tab 跳转到对应页面
      if (tab && tab.path && tab.key !== 'home') {
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

.hero {
  position: relative;
  height: 720rpx;
  overflow: hidden;
  border-bottom-left-radius: 70rpx;
  border-bottom-right-radius: 70rpx;
}

.hero-img {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.hero-img.animate-in {
  opacity: 1;
  transform: scale(1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(245, 244, 237, 0.6) 0%, rgba(246, 242, 233, 0.15) 70%, rgba(246, 242, 233, 0) 100%);
  pointer-events: none;
}

.search-bar {
  position: absolute;
  top: 78rpx;
  left: 50%;
  transform: translateX(-50%) translateY(-20rpx);
  width: 86%;
  height: 96rpx;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  padding: 0 36rpx;
  box-sizing: border-box;
  box-shadow: 0 10rpx 26rpx rgba(0, 0, 0, 0.08);
  opacity: 0;
  transition: opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s;
}

.search-bar.animate-in {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.search-icon {
  font-size: 36rpx;
  color: #b6b6b6;
  margin-right: 18rpx;
  line-height: 1;
}

.search-input {
  flex: 1;
  font-size: 30rpx;
  color: #333;
}

.search-placeholder {
  color: #b6b6b6;
}

.vertical-text {
  position: absolute;
  right: 46rpx;
  top: 150rpx;
  width: 320rpx;
  color: #3b352b;
  font-size: 26rpx;
  line-height: 1.6;
  writing-mode: vertical-rl;
  text-align: center;
  letter-spacing: 2rpx;
}

.hero-dots {
  position: absolute;
  bottom: 48rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 18rpx;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: #d3cbbd;
}

.dot.active {
  background-color: #9ea97f;
}

.section {
  padding: 48rpx 40rpx 10rpx;
}

.section-title {
  font-size: 40rpx;
  color: #111;
  text-align: center;
  margin-bottom: 14rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-subtitle {
  font-size: 26rpx;
  color: #7a7a7a;
  text-align: center;
  margin-bottom: 36rpx;
  letter-spacing: 2rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
}

.section-subtitle.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-subtitle.small {
  font-size: 24rpx;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}

.card-grid.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.card {
  position: relative;
  border-radius: 22rpx;
  overflow: hidden;
  height: 320rpx;
  box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.08);
  will-change: opacity;
}

/* H5悬停效果 */
@media (hover: hover) {
  .card {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  }
  .card:hover {
    transform: scale(1.03) translateY(-6rpx) translateZ(0);
    box-shadow: 0 20rpx 50rpx rgba(0, 0, 0, 0.18);
  }
  .card:hover .card-img {
    transform: scale(1.08);
  }
  .card:hover .card-label-bar {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(158, 169, 127, 0.9) 100%);
  }
  .card-img {
    transition: transform 0.4s ease;
  }
  .card-label-bar {
    transition: background 0.3s ease;
  }
}

/* 小程序触摸效果 */
.card.card-pressed {
  opacity: 0.85;
}

.card-img {
  width: 100%;
  height: 100%;
  display: block;
}

.card-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.15) 100%);
}

.card-label-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(180, 165, 145, 0.9) 100%);
  padding: 24rpx 0 20rpx;
}

.card-label {
  display: block;
  text-align: center;
  color: #ffffff;
  font-size: 30rpx;
  letter-spacing: 4rpx;
  font-weight: 500;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}

.aesthetics {
  padding-bottom: 140rpx;
}

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
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='32' cy='32' r='22' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M20 32C23 27 26 24 32 22C38 24 41 27 44 32' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M20 32C23 37 26 40 32 42C38 40 41 37 44 32' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%239ea97f'/%3E%3C/svg%3E");
}

.icon-market {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='14' y='16' width='36' height='30' rx='4' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M14 24H50' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M22 16V12H42V16' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M24 30H40' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}

.icon-me {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='32' cy='22' r='10' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M16 50C18 42 24 38 32 38C40 38 46 42 48 50' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}

@media screen and (max-width: 750px) {
  .hero {
    height: 680rpx;
  }
  .vertical-text {
    right: 36rpx;
    top: 140rpx;
    font-size: 24rpx;
  }
}
</style>


