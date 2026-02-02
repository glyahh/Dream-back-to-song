<template>
  <view class="atlas-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">交通图典</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(route, index) in routes"
          :key="index"
          class="route-card"
        >
          <image class="route-image" :src="route.image" mode="aspectFill" />
          <view class="route-content">
            <text class="route-name">{{ route.name }}</text>
            <text class="route-desc">{{ route.description }}</text>
            <view class="route-info">
              <view class="info-row">
                <text class="info-label">起点：</text>
                <text class="info-value">{{ route.start }}</text>
              </view>
              <view class="info-row">
                <text class="info-label">终点：</text>
                <text class="info-value">{{ route.end }}</text>
              </view>
              <view class="info-row">
                <text class="info-label">距离：</text>
                <text class="info-value">{{ route.distance }}</text>
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
      routes: [
        {
          name: '京杭大运河',
          image: '/static/travel-nav-atlas.jpg',
          description: '连接南北的重要水路交通线，是宋代最重要的交通动脉之一。',
          start: '北京',
          end: '杭州',
          distance: '约1800公里'
        },
        {
          name: '汴京至洛阳',
          image: '/static/travel-nav-atlas.jpg',
          description: '连接北宋都城与古都的重要陆路交通线。',
          start: '汴京',
          end: '洛阳',
          distance: '约300公里'
        },
        {
          name: '临安至苏州',
          image: '/static/travel-nav-atlas.jpg',
          description: '南宋时期连接都城与江南重镇的重要水路。',
          start: '临安',
          end: '苏州',
          distance: '约200公里'
        },
        {
          name: '长江水路',
          image: '/static/travel-nav-atlas.jpg',
          description: '横贯东西的重要水路交通线，连接多个重要城市。',
          start: '四川',
          end: '江苏',
          distance: '约2000公里'
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
.atlas-page {
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

.route-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.route-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

.route-content {
  padding: 30rpx;
}

.route-name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.route-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.route-info {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.info-row {
  display: flex;
  align-items: center;
}

.info-label {
  font-size: 26rpx;
  color: #9ea97f;
  margin-right: 8rpx;
}

.info-value {
  font-size: 26rpx;
  color: #3b352b;
  font-weight: 500;
}

.back-btn:active,
.route-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

