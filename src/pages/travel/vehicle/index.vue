<template>
  <view class="vehicle-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">交通工具</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(vehicle, index) in vehicles"
          :key="index"
          class="vehicle-card"
        >
          <image class="vehicle-image" :src="vehicle.image" mode="aspectFill" />
          <view class="vehicle-content">
            <text class="vehicle-name">{{ vehicle.name }}</text>
            <text class="vehicle-desc">{{ vehicle.description }}</text>
            <view class="vehicle-info">
              <view class="info-item">
                <text class="info-label">速度</text>
                <text class="info-value">{{ vehicle.speed }}</text>
              </view>
              <view class="info-item">
                <text class="info-label">载客</text>
                <text class="info-value">{{ vehicle.capacity }}</text>
              </view>
              <view class="info-item">
                <text class="info-label">用途</text>
                <text class="info-value">{{ vehicle.usage }}</text>
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
      vehicles: [
        {
          name: '马车',
          image: '/static/travel-nav-vehicle.jpg',
          description: '宋代主要的陆路交通工具，速度快，适合中长距离出行。',
          speed: '较快',
          capacity: '2-4人',
          usage: '日常出行'
        },
        {
          name: '牛车',
          image: '/static/travel-nav-vehicle.jpg',
          description: '宋代常见的交通工具，速度较慢但稳定，适合载重。',
          speed: '较慢',
          capacity: '多人',
          usage: '货物运输'
        },
        {
          name: '轿子',
          image: '/static/travel-nav-vehicle.jpg',
          description: '宋代贵族和官员的专用交通工具，体现身份地位。',
          speed: '慢',
          capacity: '1-2人',
          usage: '身份象征'
        },
        {
          name: '船只',
          image: '/static/travel-nav-atlas.jpg',
          description: '宋代水路交通的主要工具，适合水路出行和货物运输。',
          speed: '中等',
          capacity: '多人',
          usage: '水路出行'
        }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.vehicle-page {
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

.vehicle-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.vehicle-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

.vehicle-content {
  padding: 30rpx;
}

.vehicle-name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.vehicle-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.vehicle-info {
  display: flex;
  gap: 30rpx;
}

.info-item {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.info-label {
  font-size: 24rpx;
  color: #9ea97f;
  margin-bottom: 8rpx;
}

.info-value {
  font-size: 26rpx;
  color: #3b352b;
  font-weight: 500;
}

.back-btn:active,
.vehicle-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

