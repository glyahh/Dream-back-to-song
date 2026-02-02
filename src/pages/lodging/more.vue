<template>
  <view class="more-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">更多建筑</text>
      <view class="right-actions"></view>
    </view>

    <!-- 建筑列表 -->
    <scroll-view class="building-scroll" scroll-y>
      <view class="building-container">
        <view
          v-for="(building, index) in buildings"
          :key="index"
          class="building-card"
          @click="goToDetail(building)"
        >
          <image class="building-image" :src="building.image" mode="aspectFill" />
          <view class="building-info">
            <text class="building-name">{{ building.name }}</text>
            <text class="building-location">{{ building.location }}</text>
            <text class="building-desc">{{ building.description }}</text>
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
      buildings: [
        {
          id: 1,
          name: '河南洛阳环溪',
          location: '河南洛阳',
          image: '/static/building-huanyixi.png',
          description: '宋代著名园林，以溪流环绕为特色',
          path: '/pages/lodging/detail/huanyixi'
        },
        {
          id: 2,
          name: '山西晋祠圣母殿',
          location: '山西太原',
          image: '/static/building-jinci.png',
          description: '宋代建筑代表，精美的建筑工艺',
          path: '/pages/lodging/detail/jinci'
        },
        {
          id: 3,
          name: '河北承德避暑山庄',
          location: '河北承德',
          image: '/static/building-hebei.png',
          description: '清代皇家园林，深受宋代影响',
          path: '/pages/lodging/detail/hebei'
        },
        {
          id: 4,
          name: '苏州拙政园',
          location: '江苏苏州',
          image: '/static/building-suzhou.png',
          description: '江南古典园林的代表作品',
          path: '/pages/lodging/detail/suzhou'
        },
        {
          id: 5,
          name: '开封铁塔',
          location: '河南开封',
          image: '/static/nav-architecture.jpg',
          description: '宋代建筑，中国现存最早的琉璃塔',
          path: ''
        },
        {
          id: 6,
          name: '应县木塔',
          location: '山西应县',
          image: '/static/nav-architecture.jpg',
          description: '宋代木结构建筑，世界现存最古老的木塔',
          path: ''
        }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goToDetail(building) {
      if (building.path) {
        uni.navigateTo({
          url: building.path
        })
      }
    }
  }
}
</script>

<style scoped>
.more-page {
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

.building-scroll {
  height: calc(100vh - 140rpx);
}

.building-container {
  padding: 30rpx;
}

.building-card {
  display: flex;
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.building-image {
  width: 240rpx;
  height: 240rpx;
  flex-shrink: 0;
}

.building-info {
  flex: 1;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.building-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 8rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.building-location {
  font-size: 24rpx;
  color: #9ea97f;
  margin-bottom: 12rpx;
  font-weight: 500;
}

.building-desc {
  font-size: 26rpx;
  color: #7a756e;
  line-height: 1.6;
}

.back-btn:active,
.building-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

