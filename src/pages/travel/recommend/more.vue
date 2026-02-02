<template>
  <view class="more-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">更多推荐</text>
      <view class="right-actions"></view>
    </view>

    <!-- 推荐列表 -->
    <scroll-view class="recommend-scroll" scroll-y>
      <view class="recommend-container">
        <view
          v-for="(item, index) in recommendations"
          :key="index"
          class="recommend-card"
          @click="goToDetail(item)"
        >
          <image class="recommend-image" :src="item.image" mode="aspectFill" />
          <view class="recommend-overlay">
            <view class="recommend-info">
              <text class="recommend-title">{{ item.title }}</text>
              <text class="recommend-desc">{{ item.desc }}</text>
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
      recommendations: [
        {
          id: 1,
          title: '汴京街市车马图',
          desc: '北宋都城繁华的交通景象',
          image: '/static/travel-recommend-main.png',
          path: '/pages/travel/recommend/detail'
        },
        {
          id: 2,
          title: '清明上河图',
          desc: '展现宋代城市交通的经典画作',
          image: '/static/painting-qingming.png',
          path: '/pages/travel/recommend/detail'
        },
        {
          id: 3,
          title: '宋代交通图',
          desc: '宋代交通网络的详细地图',
          image: '/static/travel-nav-atlas.jpg',
          path: '/pages/travel/recommend/detail'
        },
        {
          id: 4,
          title: '出行工具图鉴',
          desc: '宋代各种交通工具的详细介绍',
          image: '/static/travel-nav-vehicle.jpg',
          path: '/pages/travel/recommend/detail'
        }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goToDetail(item) {
      if (item.path) {
        uni.navigateTo({
          url: item.path
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

.recommend-scroll {
  height: calc(100vh - 140rpx);
}

.recommend-container {
  padding: 30rpx;
}

.recommend-card {
  position: relative;
  width: 100%;
  height: 350rpx;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.recommend-image {
  width: 100%;
  height: 100%;
  display: block;
}

.recommend-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  align-items: flex-end;
  padding: 30rpx;
}

.recommend-info {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.recommend-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.recommend-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.back-btn:active,
.recommend-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

