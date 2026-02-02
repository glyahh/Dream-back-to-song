<template>
  <view class="method-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">出行方式</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(method, index) in methods"
          :key="index"
          class="method-card"
        >
          <image class="method-image" :src="method.image" mode="aspectFill" />
          <view class="method-content">
            <text class="method-name">{{ method.name }}</text>
            <text class="method-desc">{{ method.description }}</text>
            <view class="method-features">
              <text
                v-for="(feature, fIndex) in method.features"
                :key="fIndex"
                class="feature-tag"
              >{{ feature }}</text>
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
      methods: [
        {
          name: '步行出行',
          image: '/static/travel-nav-method.jpg',
          description: '宋代城市内最常见的出行方式，适合短距离出行。',
          features: ['便捷灵活', '适合短途', '经济实惠']
        },
        {
          name: '车马出行',
          image: '/static/travel-nav-vehicle.jpg',
          description: '宋代重要的交通工具，包括马车、牛车等，适合中长距离出行。',
          features: ['速度较快', '适合长途', '地位象征']
        },
        {
          name: '水路出行',
          image: '/static/travel-nav-atlas.jpg',
          description: '宋代水路交通发达，船只成为重要的出行工具，尤其适合江南地区。',
          features: ['运载量大', '适合水路', '舒适平稳']
        },
        {
          name: '轿子出行',
          image: '/static/travel-nav-wiki.jpg',
          description: '宋代贵族和官员常用的出行方式，体现了社会等级和身份地位。',
          features: ['身份象征', '舒适安全', '等级体现']
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
.method-page {
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

.method-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.method-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

.method-content {
  padding: 30rpx;
}

.method-name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.method-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.method-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.feature-tag {
  padding: 8rpx 20rpx;
  background-color: rgba(158, 169, 127, 0.15);
  border-radius: 20rpx;
  font-size: 24rpx;
  color: #9ea97f;
  font-weight: 500;
}

.back-btn:active,
.method-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

