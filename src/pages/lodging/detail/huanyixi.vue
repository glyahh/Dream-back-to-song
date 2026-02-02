<template>
  <view class="detail-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">环溪</text>
      <view class="right-actions"></view>
    </view>

    <!-- 详情内容 -->
    <scroll-view class="detail-scroll" scroll-y>
      <view class="detail-container">
        <image class="detail-image" src="/static/building-huanyixi.png" mode="aspectFill" />
        
        <view class="info-section">
          <text class="detail-name">环溪</text>
          <text class="detail-location">河南洛阳</text>
          <text class="detail-description">
            环溪是宋代著名园林，以溪流环绕为特色，体现了宋代园林的自然美学。园内建筑与自然景观完美融合，展现了宋代文人对自然与人文和谐统一的追求。
          </text>
        </view>

        <view class="detail-section">
          <view class="section-title">建筑特色</view>
          <text class="section-content">
            环溪园林以水为中心，溪流环绕整个园林，形成了独特的景观效果。园内建筑依水而建，亭台楼阁错落有致，体现了宋代园林建筑的精致与典雅。
          </text>
        </view>

        <view class="detail-section">
          <view class="section-title">历史价值</view>
          <text class="section-content">
            环溪作为宋代园林的代表作品，不仅体现了宋代园林建筑的艺术成就，也反映了宋代文人的生活情趣和审美追求，具有重要的历史和文化价值。
          </text>
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
.detail-page {
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

.detail-scroll {
  height: calc(100vh - 140rpx);
}

.detail-container {
  padding-bottom: 40rpx;
}

.detail-image {
  width: 100%;
  height: 500rpx;
  display: block;
}

.info-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.detail-name {
  display: block;
  font-size: 42rpx;
  font-weight: 700;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 2rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.detail-location {
  display: block;
  font-size: 28rpx;
  color: #9ea97f;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.detail-description {
  display: block;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
  letter-spacing: 1rpx;
}

.detail-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 20rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.section-content {
  display: block;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
  letter-spacing: 1rpx;
}

.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}
</style>
