<template>
  <view class="making-page">
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">制作步骤</text>
      <view class="right-actions"></view>
    </view>

    <view class="main-content">
      <view class="step-indicator">
        <text class="step-text">第三步</text>
      </view>

      <view class="step-image-container">
        <image class="step-image" src="/static/food_vegetarian.jpg" mode="aspectFit" />
      </view>

      <view class="step-description">
        <text class="description-text">下入豆腐块，小火慢煎至两面微黄</text>
      </view>

      <view class="button-container">
        <view class="prev-btn" @click="goToStep2">
          <image class="btn-bg" src="/static/begin.jpg" mode="aspectFill" />
          <text class="btn-text">上一步</text>
        </view>
        <view class="next-btn" @click="goToComplete">
          <image class="btn-bg" src="/static/begin.jpg" mode="aspectFill" />
          <text class="btn-text">完成</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dishId: ''
    }
  },
  onLoad(options) {
    if (options.id) {
      this.dishId = options.id
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goToStep2() {
      uni.navigateBack()
    },
    goToComplete() {
      uni.navigateTo({
        url: '/pages/food/making/sucaidoufu_complete?id=' + this.dishId
      })
    }
  }
}
</script>

<style scoped>
.making-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'SimSun', 'STSong', serif;
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background-color: rgba(200, 210, 190, 0.95);
  height: 200rpx;
  padding-top: env(safe-area-inset-top);
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  margin-top: 140rpx;
}

.back-icon {
  font-size: 64rpx;
  color: #333;
  font-weight: 300;
  margin-top: -8rpx;
  margin-left: -6rpx;
}

.nav-title {
  font-size: 50rpx;
  font-weight: 700;
  color: black;
  letter-spacing: 8rpx;
  font-family: 'LiSu', 'SimLi', serif;
  flex: 1;
  text-align: center;
  margin-left: -40rpx;
  margin-top: 130rpx;
}

.right-actions {
  width: 80rpx;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 30rpx;
}

.step-indicator {
  margin-bottom: 40rpx;
}

.step-text {
  font-size: 44rpx;
  color: #5a4a42;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 8rpx;
}

.step-image-container {
  width: 600rpx;
  height: 500rpx;
  background-color: #fff;
  border-radius: 20rpx;
  border: 4rpx solid #c8b69a;
  margin-bottom: 40rpx;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.step-image {
  width: 100%;
  height: 100%;
}

.step-description {
  width: 600rpx;
  min-height: 120rpx;
  background-color: #fff;
  border-radius: 20rpx;
  border: 4rpx solid #c8b69a;
  padding: 30rpx;
  margin-bottom: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.description-text {
  font-size: 36rpx;
  color: #5a4a42;
  text-align: center;
  line-height: 1.5;
  font-family: 'KaiTi', 'SimKai', serif;
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 600rpx;
  padding: 0 20rpx;
}

.prev-btn, .next-btn {
  position: relative;
  width: 260rpx;
  height: 100rpx;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.btn-text {
  position: relative;
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  font-family: 'LiSu', 'SimLi', serif;
  z-index: 1;
}
</style>

