<template>
  <view class="song-dynasty-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">食在宋朝</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <!-- 主图 -->
        <image class="main-image" src="/static/song-dynasty.png" mode="aspectFill" />

        <!-- 介绍文字 -->
        <view class="intro-section">
          <text class="intro-title">宋朝饮食文化</text>
          <text class="intro-content">
            宋朝是中国历史上饮食文化高度发展的时期。随着商品经济的繁荣和城市的发展，宋朝的饮食文化呈现出前所未有的繁荣景象。从宫廷到民间，从南方到北方，各地的饮食特色相互融合，形成了独特的宋代饮食文化。
          </text>
        </view>

        <!-- 特色板块 -->
        <view class="feature-section">
          <view class="feature-item">
            <view class="feature-icon">🍜</view>
            <view class="feature-content">
              <text class="feature-title">面食文化</text>
              <text class="feature-desc">宋朝面食种类丰富，从简单的面条到精致的点心，体现了宋代饮食的精致化趋势。</text>
            </view>
          </view>

          <view class="feature-item">
            <view class="feature-icon">🥘</view>
            <view class="feature-content">
              <text class="feature-title">烹饪技法</text>
              <text class="feature-desc">宋代烹饪技法多样，炖、煮、蒸、炒、炸等技法已经相当成熟，为后世烹饪奠定了基础。</text>
            </view>
          </view>

          <view class="feature-item">
            <view class="feature-icon">🍵</view>
            <view class="feature-content">
              <text class="feature-title">茶文化</text>
              <text class="feature-desc">宋代茶文化达到高峰，点茶、斗茶等茶艺活动盛行，茶成为日常生活的重要组成部分。</text>
            </view>
          </view>

          <view class="feature-item">
            <view class="feature-icon">🏮</view>
            <view class="feature-content">
              <text class="feature-title">夜市文化</text>
              <text class="feature-desc">宋代夜市繁荣，各种小吃、饮品琳琅满目，形成了独特的夜市饮食文化。</text>
            </view>
          </view>
        </view>

        <!-- 历史发展 -->
        <view class="history-section">
          <text class="section-title">历史发展</text>
          <view class="timeline">
            <view class="timeline-item">
              <text class="timeline-time">北宋初期</text>
              <text class="timeline-desc">饮食文化承袭唐代，但开始出现新的变化，城市饮食业开始兴起。</text>
            </view>
            <view class="timeline-item">
              <text class="timeline-time">北宋中期</text>
              <text class="timeline-desc">饮食文化达到高峰，各种菜系形成，烹饪技法日趋成熟。</text>
            </view>
            <view class="timeline-item">
              <text class="timeline-time">南宋时期</text>
              <text class="timeline-desc">南方饮食文化进一步发展，形成了更加精致和多样化的饮食特色。</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  methods: {
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.song-dynasty-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

.nav-bar {
  height: 140rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #f6f2e9;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.back-icon {
  font-size: 40rpx;
  color: #333;
  font-weight: 300;
  margin-top: -4rpx;
  margin-left: -4rpx;
}

.nav-title {
  font-size: 50rpx;
  font-weight: 700;
  color: #3b352b;
  letter-spacing: 4rpx;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
}

.right-actions {
  width: 70rpx;
}

.content-scroll {
  height: calc(100vh - 140rpx);
}

.content-container {
  padding-bottom: 40rpx;
}

.main-image {
  width: 100%;
  height: 400rpx;
  display: block;
}

.intro-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.intro-title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 20rpx;
  letter-spacing: 2rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.intro-content {
  display: block;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
  letter-spacing: 1rpx;
}

.feature-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.feature-item {
  display: flex;
  margin-bottom: 30rpx;
  padding-bottom: 30rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.feature-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.feature-icon {
  font-size: 60rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
}

.feature-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.feature-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.feature-desc {
  font-size: 26rpx;
  color: #7a756e;
  line-height: 1.6;
}

.history-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 30rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.timeline-item {
  padding-left: 30rpx;
  position: relative;
  border-left: 3rpx solid #9ea97f;
}

.timeline-time {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #9ea97f;
  margin-bottom: 12rpx;
}

.timeline-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
}

.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}
</style>

