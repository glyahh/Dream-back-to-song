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

      <!-- 宋画轮播：用画卷做情绪背景 -->
      <view class="aesthetics-gallery" :class="{ 'animate-in': pageReady }">
        <swiper
          class="aesthetics-swiper"
          :current="aestheticCurrentIndex"
          :autoplay="true"
          :interval="6000"
          :duration="700"
          :circular="true"
          @change="onAestheticSwiperChange"
        >
          <swiper-item
            v-for="(item, index) in aestheticGallery"
            :key="item.key"
          >
            <view class="aesthetics-slide">
              <image class="aesthetics-img" :src="item.img" mode="aspectFill" />
              <view class="aesthetics-mask" />
              <view class="aesthetics-slide-content">
                <text class="aesthetics-slide-tag">{{ item.tag }}</text>
                <text class="aesthetics-slide-title">{{ item.title }}</text>
                <text class="aesthetics-slide-desc">{{ item.desc }}</text>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view class="aesthetics-dots">
          <view
            v-for="(item, index) in aestheticGallery"
            :key="item.key"
            class="dot"
            :class="{ active: index === aestheticCurrentIndex }"
          />
        </view>
      </view>

      <!-- 三条宋风生活小句，支持轻触反馈 -->
      <view class="aesthetics-list" :class="{ 'animate-in': pageReady }">
        <view class="aesthetics-item">
          <view class="aesthetics-dot" />
          <view class="aesthetics-texts">
            <text class="aesthetics-title">一盏清茶</text>
            <text class="aesthetics-desc">晨光半卷帘，细水入盏，茶面微起乳沫，香气在竹影之间缓缓氤氲。</text>
          </view>
        </view>
        <view class="aesthetics-item">
          <view class="aesthetics-dot" />
          <view class="aesthetics-texts">
            <text class="aesthetics-title">一方书案</text>
            <text class="aesthetics-desc">素纸铺开，笔架横陈，几笔淡墨勾勒山水，便是自得其乐的小天地。</text>
          </view>
        </view>
        <view class="aesthetics-item">
          <view class="aesthetics-dot" />
          <view class="aesthetics-texts">
            <text class="aesthetics-title">一窗风月</text>
            <text class="aesthetics-desc">夜色沉静，月华落在青瓦与檐角，微风拂过，灯影与萤火一同游走。</text>
          </view>
        </view>
      </view>
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
      // 宋朝美学画卷轮播
      aestheticCurrentIndex: 0,
      aestheticGallery: [
        {
          key: 'qingming',
          img: '/static/painting-qingming.png',
          tag: '宋画一角',
          title: '汴河烟树',
          desc: '沿着画卷缓缓移动，街市与楼船次第展开，是可以行走其间的宋朝烟火。',
        },
        {
          key: 'qianli',
          img: '/static/painting-qianli.png',
          tag: '远山长卷',
          title: '千里江山',
          desc: '青绿与金粉铺陈山川气象，色彩却温润内敛，如同宋人收拾好的山河梦。',
        },
        {
          key: 'qiuchuang',
          img: '/static/painting-qiuchuang.png',
          tag: '一窗秋意',
          title: '秋窗风雨',
          desc: '檐下几片落叶、案头一卷残书，画中留住的是宋人最细微的日常心绪。',
        },
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
    onAestheticSwiperChange(e) {
      this.aestheticCurrentIndex = e.detail.current
    },
   handleCard(item) {
     if (item.title === '服饰') {
       uni.redirectTo({  // 修改为 redirectTo
         url: '/pages/clothes/index1'
       })
     }
     else if (item.title === '饮食') {
       uni.redirectTo({  // 修改为 redirectTo
         url: '/pages/food/index'
       })
     }
     else if (item.title === '住宿') {
       uni.redirectTo({  // 修改为 redirectTo
         url: '/pages/lodging/index'
       })
     }
     else if (item.title === '出行') {
       uni.redirectTo({  // 修改为 redirectTo
         url: '/pages/travel/index'
       })
     }
     else {
       uni.showToast({
         title: `前往${item.title}`,
         icon: 'none',
       })
     }
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

.aesthetics-gallery {
  margin: 6rpx 8rpx 24rpx;
  border-radius: 26rpx;
  overflow: hidden;
  box-shadow: 0 10rpx 26rpx rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: translateY(24rpx);
  transition: opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s;
}

.aesthetics-gallery.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.aesthetics-swiper {
  width: 100%;
  height: 260rpx;
}

.aesthetics-slide {
  position: relative;
  width: 100%;
  height: 100%;
}

.aesthetics-img {
  width: 100%;
  height: 100%;
  display: block;
}

.aesthetics-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.05));
}

.aesthetics-slide-content {
  position: absolute;
  left: 32rpx;
  right: 32rpx;
  bottom: 26rpx;
  color: #fdfaf4;
}

.aesthetics-slide-tag {
  font-size: 22rpx;
  padding: 6rpx 14rpx;
  border-radius: 26rpx;
  background-color: rgba(158, 169, 127, 0.88);
  display: inline-block;
  margin-bottom: 10rpx;
}

.aesthetics-slide-title {
  display: block;
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  margin-bottom: 6rpx;
}

.aesthetics-slide-desc {
  display: block;
  font-size: 24rpx;
  line-height: 1.7;
  opacity: 0.92;
}

.aesthetics-dots {
  position: absolute;
  right: 28rpx;
  bottom: 20rpx;
  display: flex;
  gap: 10rpx;
}

.aesthetics-dots .dot {
  width: 10rpx;
  height: 10rpx;
  background-color: rgba(255, 255, 255, 0.55);
}

.aesthetics-dots .dot.active {
  background-color: #ffffff;
}

.aesthetics-list {
  margin-top: 12rpx;
  padding: 0 8rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}

.aesthetics-list.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.aesthetics-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20rpx 24rpx;
  margin-bottom: 16rpx;
  border-radius: 20rpx;
  background-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);
}

/* H5 悬停与点击微交互，让卡片更有“呼吸感” */
@media (hover: hover) {
  .aesthetics-item {
    transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  }
  .aesthetics-item:hover {
    transform: translateY(-4rpx);
    box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.12);
    background-color: rgba(255, 255, 255, 0.98);
  }
}

.aesthetics-item:active {
  transform: scale(0.98);
  opacity: 0.96;
}

.aesthetics-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  margin-top: 18rpx;
  margin-right: 18rpx;
  flex-shrink: 0;
}

.aesthetics-texts {
  flex: 1;
}

.aesthetics-title {
  display: block;
  font-size: 26rpx;
  color: #333;
  margin-bottom: 6rpx;
  letter-spacing: 3rpx;
}

.aesthetics-desc {
  display: block;
  font-size: 24rpx;
  color: #7a7a7a;
  line-height: 1.7;
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


