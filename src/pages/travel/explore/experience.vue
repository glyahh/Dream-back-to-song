<template>
  <view class="experience-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">出行体验</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view class="intro-section">
          <text class="intro-title">体验宋朝人的出行方式</text>
          <text class="intro-content">
            通过虚拟体验，感受宋代不同阶层、不同场景下的出行方式，了解宋代交通文化的独特魅力。
          </text>
        </view>

        <view
          v-for="(scene, index) in scenes"
          :key="index"
          class="scene-card"
        >
          <image class="scene-image" :src="scene.image" mode="aspectFill" />
          <view class="scene-overlay">
            <view class="scene-info">
              <text class="scene-title">{{ scene.title }}</text>
              <text class="scene-desc">{{ scene.description }}</text>
              <view class="scene-btn" @click="startExperience(scene)">
                <text class="btn-text">开始体验</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scenes: [
        {
          id: 1,
          title: '官员出行',
          description: '体验宋代官员的出行方式，感受官场的威严与礼仪',
          image: '/static/travel-explore-experience.png'
        },
        {
          id: 2,
          title: '商人出行',
          description: '体验宋代商人的出行方式，感受商业活动的繁忙',
          image: '/static/travel-explore-experience.png'
        },
        {
          id: 3,
          title: '文人出行',
          description: '体验宋代文人的出行方式，感受文人的雅致与闲适',
          image: '/static/travel-explore-experience.png'
        },
        {
          id: 4,
          title: '平民出行',
          description: '体验宋代平民的出行方式，感受普通人的生活',
          image: '/static/travel-explore-experience.png'
        }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    startExperience(scene) {
      uni.showToast({
        title: '体验功能开发中',
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
.experience-page {
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
  padding: 30rpx;
}

.intro-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
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

.scene-card {
  position: relative;
  width: 100%;
  height: 400rpx;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.scene-image {
  width: 100%;
  height: 100%;
  display: block;
}

.scene-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  padding: 30rpx;
}

.scene-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.scene-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.scene-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20rpx;
  line-height: 1.6;
}

.scene-btn {
  align-self: flex-start;
  padding: 16rpx 32rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30rpx;
}

.btn-text {
  font-size: 28rpx;
  color: #9ea97f;
  font-weight: 600;
}

.back-btn:active,
.scene-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

