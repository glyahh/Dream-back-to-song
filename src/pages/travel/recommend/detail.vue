<template>
  <view class="detail-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">汴京街市车马图</text>
      <view class="right-actions"></view>
    </view>

    <!-- 详情内容 -->
    <scroll-view class="detail-scroll" scroll-y>
      <view class="detail-container">
        <image class="detail-image" src="/static/travel-recommend-main.png" mode="aspectFill" />
        
        <view class="info-section">
          <text class="detail-name">汴京街市车马图</text>
          <text class="detail-subtitle">北宋都城繁华的交通景象</text>
          <text class="detail-description">
            这幅画作生动展现了北宋都城汴京（今开封）街市的繁华景象。画中可以看到各种交通工具，包括马车、牛车、轿子等，以及熙熙攘攘的行人，真实反映了宋代城市交通的繁荣景象。
          </text>
        </view>

        <view class="detail-section">
          <view class="section-title">画面内容</view>
          <text class="section-content">
            画面中展现了汴京街市的繁华景象，各种交通工具穿梭往来，行人络绎不绝。可以看到不同阶层的人使用不同的交通工具，体现了宋代社会的等级制度。画面细节丰富，生动展现了宋代城市生活的真实场景。
          </text>
        </view>

        <view class="detail-section">
          <view class="section-title">历史价值</view>
          <text class="section-content">
            这幅画作是研究宋代城市交通和社会生活的重要资料，为我们了解宋代交通文化提供了珍贵的视觉资料。画中展现的交通工具和出行方式，反映了宋代交通文化的繁荣和发展。
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

.detail-subtitle {
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

