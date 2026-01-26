<template>
  <view class="complete-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">制作完成</text>
      <view class="right-actions"></view>
    </view>

    <!-- 主要内容区 -->
    <view class="main-content">
      <view class="complete-title">
        <text class="title-text">东坡肉制作完成！</text>
      </view>

      <view class="complete-message">
        <text class="message-text">恭喜你完成了东坡肉的制作！</text>
      </view>

      <!-- 大图容器 -->
      <view class="dish-image-container">
        <view class="top-text">
            <text class="top-text-content">色泽红亮，味醇汁浓，香糯不腻口</text>
        </view>

        <!-- 大图 -->
        <image
          class="main-dish-image"
          src="/static/dongporou_making_result.jpg"
          mode="aspectFill"
        ></image>

        <!-- 左下角保存按钮 -->
        <view class="action-button left-button" @click="handleSave">
          <image
            class="action-icon"
            src="/static/baocun.jpg"
            mode="aspectFit"
          ></image>
        </view>

        <!-- 右下角分享按钮 -->
        <view class="action-button right-button" @click="handleShare">
          <image
            class="action-icon"
            src="/static/fenxiang.jpg"
            mode="aspectFit"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dishId: '',
      isNavigating: false
    }
  },

  onLoad(options) {
    console.log('完成页加载，参数:', options);
    if (options.id) {
      this.dishId = options.id;
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
            url: '/pages/food/detail/dongporou?id=' + this.dishId
          })
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false
          }, 300)
        }
      })
    },

    // 保存功能
    handleSave() {
      console.log('保存图片');
      uni.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      });
    },

    // 分享功能
    handleShare() {
      console.log('分享图片');
      uni.showToast({
        title: '分享成功',
        icon: 'success',
        duration: 2000
      });
    }
  }
}
</script>

<style scoped>
.complete-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'SimSun', 'STSong', serif;
}

/* 导航栏 */
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

/* 主内容区 */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60rpx 30rpx 100rpx;
}

.complete-title {
  margin-bottom: 40rpx;
}

.title-text {
  font-size: 60rpx;
  color: #5a4a42;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 8rpx;
  text-align: center;
}

.complete-message {
  margin-bottom: 60rpx;
}

.message-text {
  font-size: 40rpx;
  color: #5a4a42;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
}

/* 菜品图片容器 */
.dish-image-container {
  position: relative;
  width: 600rpx;
  height: 1000rpx; /* 2:3比例 */
  border-radius: 30rpx;
  overflow: hidden;
  margin-top: 40rpx;
}

/* 主菜品图片 */
.main-dish-image {
  width: 100%;
  height: 100%;
}

/* 顶部文字容器 */
.top-text {
  position: absolute;
  top: 850rpx; /* 距离顶部的距离 */
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  width: 600rpx;
  text-align: center;
  z-index: 9;
}

/* 顶部文字内容 */
.top-text-content {
  font-weight:200rpx;
  font-size: 32rpx;
  color: black;
  font-family: 'KaiTi', 'SimKai', serif;
  letter-spacing: 8rpx;
}


/* 功能按钮通用样式 */
.action-button {
  position: absolute;
  bottom: 20rpx;
  width: 180rpx;
  height: 83rpx;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* 左下角按钮 */
.left-button {
  left: 70rpx;
}

/* 右下角按钮 */
.right-button {
  right: 70rpx;
}

/* 按钮图标 */
.action-icon {
  width: 100%;
  height: 100%;
  margin-bottom: 0;
  mode: aspectFill;
}

/* 按钮文字 */
.action-text {
  font-size: 28rpx;
  color: #5a4a42;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 500;
}
</style>