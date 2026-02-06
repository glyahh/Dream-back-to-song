<template>
  <view class="page">
    <view class="nav-bar">
      <view class="nav-left" @click="goBack">
        <text class="nav-back-icon">←</text>
      </view>
      <view class="nav-title-wrap">
        <text class="nav-subtitle">话题</text>
        <text class="nav-title">宋朝美食盛宴</text>
      </view>
      <view class="nav-right" />
    </view>

    <view class="hero" :class="{ 'animate-in': pageReady }">
      <image class="hero-img" src="/static/song_food.png" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-content">
        <view class="hero-tag-row">
          <text class="hero-hash">#</text>
          <text class="hero-topic">宋朝美食盛宴</text>
        </view>
        <text class="hero-desc">
          一碗汤面、一盏清茶、一席东坡肉，翻开《山家清供》与《吴氏中馈录》，在字里行间找回人间烟火。
        </text>
        <view class="hero-meta">
          <text>3.1k 菜谱</text>
          <text>18.2k 浏览</text>
        </view>
      </view>
    </view>

    <view class="tabs" :class="{ 'animate-in': pageReady }">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </view>
    </view>

    <scroll-view class="feed" scroll-y :scroll-with-animation="true">
      <view v-for="item in filteredList" :key="item.id" class="feed-card">
        <view class="feed-header">
          <image class="feed-avatar" :src="item.avatar" mode="aspectFill" />
          <view class="feed-header-main">
            <view class="feed-user-row">
              <text class="feed-username">{{ item.user }}</text>
              <text class="feed-time">{{ item.time }}</text>
            </view>
            <view class="feed-tag-row">
              <text class="feed-tag">#宋朝美食盛宴</text>
              <text v-if="item.badge" class="feed-badge">{{ item.badge }}</text>
            </view>
          </view>
        </view>
        <text class="feed-text">
          {{ item.text }}
        </text>
        <view v-if="item.images && item.images.length" class="feed-images">
          <view
            v-for="(img, idx) in item.images"
            :key="idx"
            class="feed-image-wrap"
          >
            <image class="feed-image" :src="img" mode="aspectFill" />
          </view>
        </view>
        <view class="feed-footer">
          <view class="ff-left">
            <text class="ff-icon">❤️</text>
            <text class="ff-text">{{ item.like }} 喜欢</text>
          </view>
          <view class="ff-left">
            <text class="ff-icon">👀</text>
            <text class="ff-text">{{ item.view }} 浏览</text>
          </view>
        </view>
      </view>
      <view class="feed-bottom-space" />
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pageReady: false,
      activeTab: 'meat',
      tabs: [
        { key: 'meat', label: '宴席主菜' },
        { key: 'snack', label: '点心小食' },
        { key: 'drink', label: '茶酒佐餐' },
      ],
      list: [
        {
          id: 1,
          user: '东坡迷弟',
          time: '1 小时前',
          avatar: '/static/touxiang/touxiang8.png',
          badge: '宴席推荐',
          text: '按照宋人做法还原了一次东坡肉，用砂锅小火焖足两小时，出锅时浇一点酒汁，入口微甜又不腻。',
          images: ['/static/song_food.png'],
          like: '642',
          view: '2.1k',
          category: 'meat',
        },
        {
          id: 2,
          user: '点心研究所',
          time: '昨天',
          avatar: '/static/touxiang/touxiang9.png',
          badge: '做法图解',
          text: '用糯米粉和糖桂花做了一版宋人桂花糕，模具选了小方印，蒸好后撒一点桂花，看上去就很有宋画里的感觉。',
          images: ['/static/hanfu1.png'],
          like: '488',
          view: '1.6k',
          category: 'snack',
        },
        {
          id: 3,
          user: '茶盏里的山河',
          time: '2 天前',
          avatar: '/static/touxiang/touxiang10.png',
          badge: '',
          text: '临摹了点茶图，试着在白瓷盏里打出一片“山水”，虽然图案还不熟练，但那种专注的仪式感，真的很安静。',
          images: ['/static/discover_bg.png'],
          like: '302',
          view: '1.1k',
          category: 'drink',
        },
      ],
    }
  },
  computed: {
    filteredList() {
      return this.list.filter((item) => item.category === this.activeTab)
    },
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true
    }, 50)
  },
  methods: {
    goBack() {
      const pages = getCurrentPages && getCurrentPages()
      if (pages && pages.length > 1) {
        uni.navigateBack({ delta: 1 })
      } else {
        uni.switchTab({ url: '/pages/discover/discover' })
      }
    },
  },
}
</script>

<style scoped>
.page {
  background-color: #f5f0e8;
  min-height: 100vh;
  padding-top: 140rpx;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 120rpx;
  padding-top: 40rpx;
  padding-left: 24rpx;
  padding-right: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
  background: linear-gradient(180deg, rgba(245, 240, 232, 0.98), rgba(245, 240, 232, 0.7), transparent);
  backdrop-filter: blur(6rpx);
}

.nav-left,
.nav-right {
  width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-right {
  justify-content: flex-end;
}

.nav-back-icon {
  font-size: 32rpx;
  color: #6b6b6b;
}

.nav-title-wrap {
  flex: 1;
  text-align: center;
}

.nav-subtitle {
  font-size: 20rpx;
  color: #b0a28c;
  letter-spacing: 4rpx;
}

.nav-title {
  display: block;
  font-size: 30rpx;
  color: #333;
  font-weight: 600;
  margin-top: 4rpx;
}

.hero {
  position: relative;
  margin: 0 24rpx 24rpx;
  height: 260rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.16);
  opacity: 0;
  transform: translateY(24rpx);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.hero.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.hero-img {
  width: 100%;
  height: 100%;
}

.hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.15));
}

.hero-content {
  position: absolute;
  left: 28rpx;
  right: 28rpx;
  bottom: 30rpx;
  color: #fff;
}

.hero-tag-row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.hero-hash {
  font-size: 32rpx;
  font-weight: 500;
  margin-right: 4rpx;
}

.hero-topic {
  font-size: 30rpx;
  font-weight: 600;
}

.hero-desc {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  line-height: 1.6;
  opacity: 0.9;
}

.hero-meta {
  margin-top: 12rpx;
  display: flex;
  gap: 20rpx;
  font-size: 20rpx;
  opacity: 0.9;
}

.tabs {
  margin: 0 24rpx 10rpx;
  padding: 8rpx;
  border-radius: 999rpx;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  gap: 8rpx;
  opacity: 0;
  transform: translateY(16rpx);
  transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
}

.tabs.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 14rpx 0;
  font-size: 24rpx;
  color: #8f8f8f;
  border-radius: 999rpx;
}

.tab-item.active {
  background-color: #9ea97f;
  color: #fff;
  font-weight: 500;
}

.feed {
  height: calc(100vh - 430rpx);
  padding: 0 24rpx 24rpx;
  box-sizing: border-box;
}

.feed-card {
  background-color: #fff;
  border-radius: 18rpx;
  padding: 20rpx 22rpx 18rpx;
  margin-top: 18rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.feed-header {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.feed-avatar {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background-color: #e9e1d4;
  margin-right: 14rpx;
}

.feed-header-main {
  flex: 1;
}

.feed-user-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 4rpx;
}

.feed-username {
  font-size: 26rpx;
  color: #333;
  font-weight: 500;
}

.feed-time {
  font-size: 22rpx;
  color: #a59b8b;
}

.feed-tag-row {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.feed-tag {
  font-size: 22rpx;
  color: #9ea97f;
}

.feed-badge {
  font-size: 20rpx;
  color: #7a3d16;
  background-color: #f4dcc0;
  padding: 2rpx 12rpx;
  border-radius: 999rpx;
}

.feed-text {
  display: block;
  font-size: 26rpx;
  color: #333;
  line-height: 1.7;
  margin-bottom: 12rpx;
}

.feed-images {
  display: flex;
  gap: 10rpx;
  margin-bottom: 12rpx;
}

.feed-image-wrap {
  flex: 1;
  height: 200rpx;
  border-radius: 12rpx;
  overflow: hidden;
  background-color: #f0ebe3;
}

.feed-image {
  width: 100%;
  height: 100%;
}

.feed-footer {
  display: flex;
  justify-content: flex-start;
  gap: 28rpx;
  padding-top: 6rpx;
  border-top: 1rpx solid #f3eee6;
}

.ff-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.ff-icon {
  font-size: 24rpx;
}

.ff-text {
  font-size: 22rpx;
  color: #8f8f8f;
}

.feed-bottom-space {
  height: 40rpx;
}
</style>

