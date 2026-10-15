<template>
  <view class="page">
    <view class="nav-bar">
      <view class="nav-left" @click="goBack">
        <text class="nav-back-icon">←</text>
      </view>
      <view class="nav-title-wrap">
        <text class="nav-subtitle">话题</text>
        <text class="nav-title">宋韵服饰大赏</text>
      </view>
      <view class="nav-right" />
    </view>

    <view class="hero" :class="{ 'animate-in': pageReady }">
      <image class="hero-img" src="https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/song_cloth.png" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-content">
        <view class="hero-tag-row">
          <text class="hero-hash">#</text>
          <text class="hero-topic">宋韵服饰大赏</text>
        </view>
        <text class="hero-desc">
          从褙子到霞帔，从团花纹到折枝花，拾起画轴与出土文物中的布帛纹理，拼出属于宋人的温柔衣冠。
        </text>
        <view class="hero-meta">
          <text>1.6k 分享</text>
          <text>9.4k 浏览</text>
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
              <text class="feed-tag">#宋韵服饰大赏</text>
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
            <image class="feed-image" :src="img" mode="aspectFit" />
          </view>
        </view>
        <view class="feed-footer">
          <view class="ff-left">
            <text class="ff-icon">👍</text>
            <text class="ff-text">{{ item.like }} 赞</text>
          </view>
          <view class="ff-left">
            <text class="ff-icon">📌</text>
            <text class="ff-text">{{ item.collect }} 收藏</text>
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
      activeTab: 'match',
      tabs: [
        { key: 'match', label: '穿搭灵感' },
        { key: 'detail', label: '纹样细节' },
        { key: 'craft', label: '工艺与用料' },
      ],
      list: [
        {
          id: 1,
          user: '簪花小娘子',
          time: '3 小时前',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang5.png',
          badge: '今日主推',
          text: '试着用低饱和的藕粉色做里衣，外罩一件草木绿褙子，袖口加一点团花绣，整个人都柔和下来。',
          images: ['https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_2.png', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_3.png'],
          like: '512',
          collect: '203',
          category: 'match',
        },
        {
          id: 2,
          user: '纹样收藏家',
          time: '昨天',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang6.png',
          badge: '纹样拆解',
          text: '在宋画里找到了几种常见的折枝花纹，临摹后放到领缘和下摆位置，意外地适合现代日常通勤。',
          images: ['https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/song_cloth.png'],
          like: '361',
          collect: '187',
          category: 'detail',
        },
        {
          id: 3,
          user: '布帛研究所',
          time: '2 天前',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang7.png',
          badge: '',
          text: '尝试用亚麻和真丝混纺做褙子面料，既保留了垂坠感，又多了一点旧布的朦胧质感，更接近画中衣褶。',
          images: [],
          like: '228',
          collect: '96',
          category: 'craft',
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
  height: 220rpx;
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

