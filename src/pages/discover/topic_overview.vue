<template>
  <view class="page">
    <view class="nav-bar">
      <view class="nav-left" @click="goBack">
        <text class="nav-back-icon">←</text>
      </view>
      <view class="nav-title-wrap">
        <text class="nav-subtitle">专题</text>
        <text class="nav-title">宋代衣食住行</text>
      </view>
      <view class="nav-right" />
    </view>

    <!-- 顶部拼贴图 -->
    <view class="hero" :class="{ 'animate-in': pageReady }">
      <image class="hero-img" src="/static/discover_bg.png" mode="aspectFill" />
      <view class="hero-mask" />
      <view class="hero-content">
        <text class="hero-kicker">穿过画卷的日常</text>
        <text class="hero-title">宋代衣食住行</text>
        <text class="hero-desc">
          用四个板块，把画里的世界拆成可以体验的日常：一身衣、一桌饭、一座宅、一程路。
        </text>
      </view>
    </view>

    <!-- 四象限入口 -->
    <view class="grid" :class="{ 'animate-in': pageReady }">
      <view
        v-for="item in sections"
        :key="item.key"
        class="grid-card"
        @click="goSection(item.key)"
      >
        <view class="grid-top">
          <text class="grid-kicker">{{ item.kicker }}</text>
          <text class="grid-title">{{ item.title }}</text>
        </view>
        <text class="grid-desc">{{ item.desc }}</text>
        <view class="grid-footer">
          <text class="grid-count">{{ item.count }}</text>
          <text class="grid-arrow">→</text>
        </view>
      </view>
    </view>

    <!-- 推荐帖子 -->
    <view class="recommend-title" :class="{ 'animate-in': pageReady }">
      精选动态
    </view>
    <scroll-view class="feed" scroll-y :scroll-with-animation="true">
      <view v-for="item in list" :key="item.id" class="feed-card">
        <view class="feed-header">
          <text class="feed-tag">#{{ item.tag }}</text>
          <text class="feed-time">{{ item.time }}</text>
        </view>
        <text class="feed-text">
          {{ item.text }}
        </text>
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
      sections: [
        {
          key: 'life',
          kicker: '日常',
          title: '生活在宋朝',
          desc: '从晨钟暮鼓到灯市夜游，按时间轴体验宋人的一天。',
          count: '2.3k 讨论',
        },
        {
          key: 'clothing',
          kicker: '衣',
          title: '宋韵服饰',
          desc: '看一看画里的褙子、霞帔，如何走进今日衣橱。',
          count: '1.6k 分享',
        },
        {
          key: 'food',
          kicker: '食',
          title: '宋人食单',
          desc: '从家常小菜到御宴名馔，把书里的食谱端上桌。',
          count: '3.1k 菜谱',
        },
        {
          key: 'travel',
          kicker: '行',
          title: '出行百态',
          desc: '舟车、驴骡与步行，走完一遍宋人的路网与河道。',
          count: '1.2k 图文',
        },
      ],
      list: [
        {
          id: 1,
          tag: '生活在宋朝',
          time: '今天',
          text: '如果把《清明上河图》当作一张开放世界地图，你最想从哪一条街开始游玩？',
        },
        {
          id: 2,
          tag: '宋韵服饰大赏',
          time: '昨天',
          text: '只用当代面料和版型，能不能做出一套“只在近看才发现是宋代”的通勤装？',
        },
        {
          id: 3,
          tag: '宋朝美食盛宴',
          time: '2 天前',
          text: '试着照着古籍做了一次全宋宴，结果家人最爱的一道竟然是最朴素的汤面。',
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
    goBack() {
      const pages = getCurrentPages && getCurrentPages()
      if (pages && pages.length > 1) {
        uni.navigateBack({ delta: 1 })
      } else {
        uni.switchTab({ url: '/pages/discover/discover' })
      }
    },
    goSection(key) {
      if (key === 'life') {
        uni.navigateTo({ url: '/pages/discover/topic_life' })
      } else if (key === 'clothing') {
        uni.navigateTo({ url: '/pages/discover/topic_clothing' })
      } else if (key === 'food') {
        uni.navigateTo({ url: '/pages/discover/topic_food' })
      } else if (key === 'travel') {
        // 目前暂无话题页，临时跳转到出行主模块
        uni.navigateTo({ url: '/pages/travel/index' })
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
  height: 230rpx;
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
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2));
}

.hero-content {
  position: absolute;
  left: 28rpx;
  right: 28rpx;
  bottom: 26rpx;
  color: #fff;
}

.hero-kicker {
  font-size: 22rpx;
  opacity: 0.9;
  margin-bottom: 4rpx;
}

.hero-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 6rpx;
}

.hero-desc {
  font-size: 22rpx;
  line-height: 1.6;
  opacity: 0.92;
}

.grid {
  margin: 0 24rpx 16rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 14rpx;
  grid-column-gap: 14rpx;
  opacity: 0;
  transform: translateY(16rpx);
  transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
}

.grid.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.grid-card {
  background-color: #fff;
  border-radius: 18rpx;
  padding: 16rpx 16rpx 14rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.grid-top {
  margin-bottom: 8rpx;
}

.grid-kicker {
  font-size: 20rpx;
  color: #b0a28c;
}

.grid-title {
  display: block;
  font-size: 26rpx;
  color: #333;
  font-weight: 600;
  margin-top: 2rpx;
}

.grid-desc {
  font-size: 22rpx;
  color: #777;
  line-height: 1.6;
  min-height: 72rpx;
}

.grid-footer {
  margin-top: 6rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20rpx;
  color: #9ea97f;
}

.grid-arrow {
  font-size: 24rpx;
}

.recommend-title {
  margin: 8rpx 24rpx 0;
  font-size: 26rpx;
  color: #7b6e59;
  font-weight: 600;
  opacity: 0;
  transform: translateY(10rpx);
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}

.recommend-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feed {
  height: calc(100vh - 460rpx);
  padding: 8rpx 24rpx 24rpx;
  box-sizing: border-box;
}

.feed-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 16rpx 18rpx 14rpx;
  margin-top: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}

.feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6rpx;
}

.feed-tag {
  font-size: 22rpx;
  color: #9ea97f;
}

.feed-time {
  font-size: 20rpx;
  color: #a59b8b;
}

.feed-text {
  font-size: 24rpx;
  color: #333;
  line-height: 1.7;
}

.feed-bottom-space {
  height: 40rpx;
}
</style>

