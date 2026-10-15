<template>
  <view class="feature-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">特征</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view class="section">
          <text class="section-title">地域特征</text>
          <view class="feature-list">
            <view
              v-for="(item, index) in regionFeatures"
              :key="index"
              class="feature-item"
            >
              <text class="feature-name">{{ item.name }}</text>
              <text class="feature-desc">{{ item.description }}</text>
            </view>
          </view>
        </view>

        <view class="section">
          <text class="section-title">阶层特征</text>
          <view class="feature-list">
            <view
              v-for="(item, index) in classFeatures"
              :key="index"
              class="feature-item"
            >
              <text class="feature-name">{{ item.name }}</text>
              <text class="feature-desc">{{ item.description }}</text>
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
      regionFeatures: [
        {
          name: '北方地区',
          description: '北方地区以陆路交通为主，马车、牛车等交通工具使用广泛，道路网络发达。'
        },
        {
          name: '南方地区',
          description: '南方地区水路交通发达，船只成为重要的交通工具，运河网络密集。'
        },
        {
          name: '江南地区',
          description: '江南地区水陆交通并重，既有发达的陆路，也有密集的水路，交通最为便利。'
        }
      ],
      classFeatures: [
        {
          name: '官员阶层',
          description: '官员出行有严格的礼仪规范，使用轿子、马车等交通工具，有仪仗随行。'
        },
        {
          name: '商人阶层',
          description: '商人出行注重效率和实用性，多使用马车、船只等交通工具，出行频繁。'
        },
        {
          name: '文人阶层',
          description: '文人出行注重雅致，多选择步行或简单的交通工具，追求自然与人文的和谐。'
        },
        {
          name: '平民阶层',
          description: '平民出行以步行为主，长途出行多选择公共交通工具，出行成本较低。'
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
.feature-page {
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

.section {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 24rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.feature-item {
  padding-bottom: 24rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.feature-item:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.feature-name {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #9ea97f;
  margin-bottom: 12rpx;
}

.feature-desc {
  display: block;
  font-size: 26rpx;
  color: #5a5a5a;
  line-height: 1.6;
}

.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}
</style>

