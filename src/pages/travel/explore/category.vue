<template>
  <view class="category-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">分类</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(category, index) in categories"
          :key="index"
          class="category-card"
        >
          <image class="category-image" :src="category.image" mode="aspectFill" />
          <view class="category-content">
            <text class="category-name">{{ category.name }}</text>
            <text class="category-desc">{{ category.description }}</text>
            <view class="category-list">
              <text
                v-for="(item, iIndex) in category.items"
                :key="iIndex"
                class="list-item"
              >{{ item }}</text>
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
      categories: [
        {
          name: '按距离分类',
          image: '/static/travel-explore-category.png',
          description: '根据出行距离的不同，选择不同的出行方式',
          items: ['短途出行', '中途出行', '长途出行']
        },
        {
          name: '按目的分类',
          image: '/static/travel-explore-category.png',
          description: '根据出行目的的不同，选择不同的出行方式',
          items: ['公务出行', '商业出行', '探亲访友', '旅游观光']
        },
        {
          name: '按阶层分类',
          image: '/static/travel-explore-category.png',
          description: '不同社会阶层的人，出行方式也有所不同',
          items: ['官员出行', '商人出行', '文人出行', '平民出行']
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
.category-page {
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

.category-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.category-image {
  width: 100%;
  height: 300rpx;
  display: block;
}

.category-content {
  padding: 30rpx;
}

.category-name {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.category-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.list-item {
  padding: 10rpx 24rpx;
  background-color: rgba(158, 169, 127, 0.15);
  border-radius: 20rpx;
  font-size: 24rpx;
  color: #9ea97f;
  font-weight: 500;
}

.back-btn:active,
.category-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

