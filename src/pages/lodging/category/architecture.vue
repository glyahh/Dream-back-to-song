<template>
  <view class="architecture-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">建筑类型</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(type, index) in architectureTypes"
          :key="index"
          class="type-card"
        >
          <image class="type-image" :src="type.image" mode="aspectFill" />
          <view class="type-content">
            <text class="type-name">{{ type.name }}</text>
            <text class="type-desc">{{ type.description }}</text>
            <view class="type-features">
              <text
                v-for="(feature, fIndex) in type.features"
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
      architectureTypes: [
        {
          name: '宫殿建筑',
          image: '/static/nav-architecture.jpg',
          description: '宋代宫殿建筑规模宏大，布局严谨，体现了皇权的威严与尊贵。',
          features: ['规模宏大', '布局严谨', '装饰精美']
        },
        {
          name: '寺庙建筑',
          image: '/static/building-jinci.png',
          description: '宋代寺庙建筑融合了宗教文化与建筑艺术，形成了独特的建筑风格。',
          features: ['宗教文化', '建筑艺术', '风格独特']
        },
        {
          name: '民居建筑',
          image: '/static/building-hebei.png',
          description: '宋代民居建筑注重实用性与美观性的结合，体现了宋代人的生活智慧。',
          features: ['实用美观', '布局合理', '生活智慧']
        },
        {
          name: '园林建筑',
          image: '/static/building-suzhou.png',
          description: '宋代园林建筑追求自然与人文的和谐统一，形成了独特的园林美学。',
          features: ['自然和谐', '人文统一', '美学独特']
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
.architecture-page {
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

.type-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.type-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

.type-content {
  padding: 30rpx;
}

.type-name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.type-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.type-features {
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
.type-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

