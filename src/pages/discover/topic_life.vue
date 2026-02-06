<template>
  <view class="page">
    <!-- 自定义导航栏 -->
    <view class="nav-bar">
      <view class="nav-left" @click="goBack">
        <text class="nav-back-icon">←</text>
      </view>
      <view class="nav-title-wrap">
        <text class="nav-subtitle">话题</text>
        <text class="nav-title">生活在宋朝</text>
      </view>
      <view class="nav-right" />
    </view>

    <!-- 顶部大图 -->
    <view class="hero" :class="{ 'animate-in': pageReady }">
      <image class="hero-img" src="/static/live_in_song.png" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-content">
        <view class="hero-tag-row">
          <text class="hero-hash">#</text>
          <text class="hero-topic">生活在宋朝</text>
        </view>
        <text class="hero-desc">
          沿着画卷与诗词，走进市井街巷与瓦舍勾栏，感受一日三餐与四时雅集里的烟火气。
        </text>
        <view class="hero-meta">
          <text>2.3k 讨论</text>
          <text>12.8k 浏览</text>
        </view>
      </view>
    </view>

    <!-- 筛选 Tabs -->
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

    <!-- 帖子列表 -->
    <scroll-view class="feed" scroll-y :scroll-with-animation="true">
      <view
        v-for="item in filteredList"
        :key="item.id"
        class="feed-card"
      >
        <view class="feed-header">
          <image class="feed-avatar" :src="item.avatar" mode="aspectFill" />
          <view class="feed-header-main">
            <view class="feed-user-row">
              <text class="feed-username">{{ item.user }}</text>
              <text class="feed-time">{{ item.time }}</text>
            </view>
            <view class="feed-tag-row">
              <text class="feed-tag">#生活在宋朝</text>
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
            <text class="ff-icon">👍</text>
            <text class="ff-text">{{ item.like }} 赞</text>
          </view>
          <view class="ff-left">
            <text class="ff-icon">💬</text>
            <text class="ff-text">{{ item.comment }} 评论</text>
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
      activeTab: 'latest',
      tabs: [
        { key: 'latest', label: '最新' },
        { key: 'hot', label: '最热' },
        { key: 'story', label: '生活故事' },
      ],
      list: [
        {
          id: 1,
          user: '临安的清晨',
          time: '2 小时前',
          avatar: '/static/touxiang/touxiang2.png',
          badge: '图文精选',
          text: '想象自己在临安醒来，从瓦舍边的小巷走到市集，买上一笼热气腾腾的点心，再去河畔听一曲新词，这就是我心中的宋朝早晨。',
          images: ['/static/hanfu1.png', '/static/hanfu2.png'],
          like: '328',
          comment: '29',
          category: 'latest',
        },
        {
          id: 2,
          user: '汴京行脚人',
          time: '昨天',
          avatar: '/static/touxiang/touxiang3.png',
          badge: '人气讨论',
          text: '如果能在《清明上河图》里挑一个摊位做生意，你会卖什么？我选茶汤和糖果，给路过的行人都添一口甜。',
          images: ['/static/discover_bg.png'],
          like: '921',
          comment: '103',
          category: 'hot',
        },
        {
          id: 3,
          user: '小小簪花郎',
          time: '1 天前',
          avatar: '/static/touxiang/touxiang4.png',
          badge: '',
          text: '尝试按照《梦粱录》里的描述复刻了一桌宋人家常饭，简单却很精致，连摆盘都照着书里的顺序来做。',
          images: ['/static/song_food.png'],
          like: '417',
          comment: '46',
          category: 'story',
        },
      ],
    }
  },
  computed: {
    filteredList() {
      if (this.activeTab === 'latest') return this.list
      if (this.activeTab === 'hot') return this.list.slice().sort((a, b) => Number(b.like) - Number(a.like))
      return this.list.filter((item) => item.category === 'story')
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
  color: #a15d2b;
  background-color: #f7e3c7;
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
  height: 180rpx;
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

