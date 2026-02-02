<template>
  <view class="interior-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">室内设计</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(item, index) in interiorItems"
          :key="index"
          class="interior-card"
        >
          <image class="interior-image" :src="item.image" mode="aspectFill" />
          <view class="interior-content">
            <text class="interior-name">{{ item.name }}</text>
            <text class="interior-desc">{{ item.description }}</text>
            <view class="interior-details">
              <view class="detail-item">
                <text class="detail-label">风格</text>
                <text class="detail-value">{{ item.style }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">特点</text>
                <text class="detail-value">{{ item.feature }}</text>
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
      interiorItems: [
        {
          name: '厅堂设计',
          image: '/static/nav-interior.jpg',
          description: '宋代厅堂设计注重空间的开阔与通透，体现了宋代人对生活品质的追求。',
          style: '简洁典雅',
          feature: '空间开阔'
        },
        {
          name: '书房设计',
          image: '/static/nav-interior.jpg',
          description: '宋代书房设计体现了文人的雅致品味，注重采光与通风，营造良好的阅读环境。',
          style: '文人雅致',
          feature: '采光通风'
        },
        {
          name: '卧室设计',
          image: '/static/nav-interior.jpg',
          description: '宋代卧室设计注重私密性与舒适性，布局合理，装饰精致。',
          style: '舒适私密',
          feature: '布局合理'
        },
        {
          name: '厨房设计',
          image: '/static/nav-interior.jpg',
          description: '宋代厨房设计注重实用性与功能性，体现了宋代饮食文化的繁荣。',
          style: '实用功能',
          feature: '功能完善'
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
.interior-page {
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

.interior-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.interior-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

.interior-content {
  padding: 30rpx;
}

.interior-name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.interior-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.interior-details {
  display: flex;
  gap: 30rpx;
}

.detail-item {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.detail-label {
  font-size: 24rpx;
  color: #9ea97f;
  margin-bottom: 8rpx;
}

.detail-value {
  font-size: 26rpx;
  color: #3b352b;
  font-weight: 500;
}

.back-btn:active,
.interior-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

