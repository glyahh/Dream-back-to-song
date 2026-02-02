<template>
  <view class="making-page">
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">制作完成</text>
      <view class="right-actions"></view>
    </view>

    <view class="main-content">
      <view class="complete-icon">✓</view>
      <view class="complete-text">茶制作完成！</view>
      <view class="complete-image-container">
        <image class="complete-image" src="/static/food_drink.jpg" mode="aspectFit" />
      </view>
      <view class="button-container">
        <view class="back-detail-btn" @click="goToDetail">
          <image class="btn-bg" src="/static/begin.jpg" mode="aspectFill" />
          <text class="btn-text">返回详情</text>
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
      if (this.isNavigating) return
      this.isNavigating = true
      uni.navigateBack({
        delta: 1,
        fail: () => {
          this.isNavigating = false
          uni.redirectTo({
            url: '/pages/food/detail/cha?id=' + this.dishId
          })
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false
          }, 300)
        }
      })
    },
    goToDetail() {
      uni.redirectTo({
        url: '/pages/food/detail/cha?id=' + this.dishId
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
  padding: 80rpx 30rpx;
}

.complete-icon {
  font-size: 120rpx;
  color: #9ea97f;
  margin-bottom: 40rpx;
}

.complete-text {
  font-size: 48rpx;
  color: #5a4a42;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 8rpx;
  margin-bottom: 60rpx;
}

.complete-image-container {
  width: 500rpx;
  height: 500rpx;
  background-color: #fff;
  border-radius: 20rpx;
  border: 4rpx solid #c8b69a;
  margin-bottom: 60rpx;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.complete-image {
  width: 100%;
  height: 100%;
}

.button-container {
  width: 400rpx;
}

.back-detail-btn {
  position: relative;
  width: 100%;
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

