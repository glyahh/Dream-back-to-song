<template>
  <view class="history-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">服饰历史</text>
      <view class="right-actions"></view>
    </view>

    <!-- 时间轴内容 -->
    <scroll-view class="timeline-scroll" scroll-y>
      <view class="timeline-container">
        <view
          v-for="(period, index) in historyPeriods"
          :key="index"
          class="timeline-item"
        >
          <!-- 时间轴节点 -->
          <view class="timeline-node">
            <view class="node-circle"></view>
            <view class="node-line" v-if="index < historyPeriods.length - 1"></view>
          </view>

          <!-- 内容卡片 -->
          <view class="period-card">
            <view class="period-header">
              <text class="period-title">{{ period.title }}</text>
              <text class="period-time">{{ period.time }}</text>
            </view>
            <image
              v-if="period.image"
              class="period-image"
              :src="period.image"
              mode="aspectFill"
            />
            <view class="period-content">
              <text class="period-desc">{{ period.description }}</text>
              <view class="period-features">
                <text
                  v-for="(feature, fIndex) in period.features"
                  :key="fIndex"
                  class="feature-tag"
                >{{ feature }}</text>
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
      historyPeriods: [
        {
          title: '北宋初期',
          time: '960-1022年',
          image: '/static/cloth_index1.jpg',
          description: '北宋初期，服饰制度承袭唐代，但逐渐形成自己的特色。官服制度更加规范，民间服饰开始出现新的变化。',
          features: ['承袭唐制', '制度规范', '民间创新']
        },
        {
          title: '北宋中期',
          time: '1023-1063年',
          image: '/static/cloth_index2.jpg',
          description: '北宋中期，服饰文化达到高峰。褙子、对襟衫等新式服装流行，色彩更加丰富，纹样更加精美。',
          features: ['褙子流行', '色彩丰富', '纹样精美']
        },
        {
          title: '北宋后期',
          time: '1064-1127年',
          image: '/static/cloth_index3.jpg',
          description: '北宋后期，服饰风格更加精致典雅。文人雅士的服饰风格影响深远，形成了独特的宋代美学。',
          features: ['精致典雅', '文人风格', '美学形成']
        },
        {
          title: '南宋时期',
          time: '1127-1279年',
          image: '/static/apparel2.png',
          description: '南宋时期，服饰在继承北宋传统的基础上，更加注重实用性和美观性的结合，形成了南宋独特的服饰文化。',
          features: ['继承传统', '实用美观', '文化独特']
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
.history-page {
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

.timeline-scroll {
  height: calc(100vh - 140rpx);
}

.timeline-container {
  padding: 40rpx 30rpx;
  position: relative;
}

.timeline-item {
  display: flex;
  margin-bottom: 60rpx;
  position: relative;
}

.timeline-node {
  position: relative;
  width: 40rpx;
  margin-right: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.node-circle {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  border: 4rpx solid #f6f2e9;
  box-shadow: 0 2rpx 8rpx rgba(158, 169, 127, 0.3);
  z-index: 2;
}

.node-line {
  position: absolute;
  top: 24rpx;
  width: 2rpx;
  height: calc(100% + 60rpx);
  background: linear-gradient(to bottom, #9ea97f, rgba(158, 169, 127, 0.3));
}

.period-card {
  flex: 1;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.period-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.period-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #3b352b;
  letter-spacing: 2rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.period-time {
  font-size: 24rpx;
  color: #9ea97f;
  font-weight: 500;
}

.period-image {
  width: 100%;
  height: 300rpx;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.period-content {
  display: flex;
  flex-direction: column;
}

.period-desc {
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
  margin-bottom: 20rpx;
  letter-spacing: 1rpx;
}

.period-features {
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

.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}
</style>

