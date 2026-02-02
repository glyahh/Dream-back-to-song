<template>
  <view class="garden-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">园林景观</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(garden, index) in gardens"
          :key="index"
          class="garden-card"
          @click="goToDetail(garden)"
        >
          <image class="garden-image" :src="garden.image" mode="aspectFill" />
          <view class="garden-overlay">
            <view class="garden-info">
              <text class="garden-name">{{ garden.name }}</text>
              <text class="garden-location">{{ garden.location }}</text>
              <text class="garden-desc">{{ garden.description }}</text>
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
      gardens: [
        {
          id: 1,
          name: '苏州拙政园',
          location: '江苏苏州',
          image: '/static/building-suzhou.png',
          description: '江南古典园林的代表作品，以水为中心，萦绕错落有致的假山及精致的庭院建筑',
          path: '/pages/lodging/detail/suzhou'
        },
        {
          id: 2,
          name: '环溪',
          location: '河南洛阳',
          image: '/static/building-huanyixi.png',
          description: '宋代著名园林，以溪流环绕为特色，体现了宋代园林的自然美学',
          path: '/pages/lodging/detail/huanyixi'
        },
        {
          id: 3,
          name: '私家园林',
          location: '江南地区',
          image: '/static/nav-garden.jpg',
          description: '宋代私家园林兴盛，文人雅士追求自然与人文的完美结合',
          path: ''
        }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goToDetail(garden) {
      if (garden.path) {
        uni.navigateTo({
          url: garden.path
        })
      }
    }
  }
}
</script>

<style scoped>
.garden-page {
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

.garden-card {
  position: relative;
  width: 100%;
  height: 400rpx;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.garden-image {
  width: 100%;
  height: 100%;
  display: block;
}

.garden-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  padding: 30rpx;
}

.garden-info {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.garden-name {
  font-size: 36rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.garden-location {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12rpx;
}

.garden-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}

.back-btn:active,
.garden-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

