<template>
  <view class="wiki-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">出行百科</text>
      <view class="right-actions"></view>
    </view>

    <!-- 内容区域 -->
    <scroll-view class="content-scroll" scroll-y>
      <view class="content-container">
        <view
          v-for="(item, index) in wikiItems"
          :key="index"
          class="wiki-card"
        >
          <view class="wiki-header">
            <text class="wiki-title">{{ item.title }}</text>
          </view>
          <view class="wiki-content">
            <text class="wiki-text">{{ item.content }}</text>
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
      wikiItems: [
        {
          title: '宋代交通网络',
          content: '宋代建立了完善的交通网络，包括陆路和水路两大系统。陆路以官道为主，连接各大城市；水路以运河和自然河流为主，形成了发达的交通体系。'
        },
        {
          title: '出行礼仪',
          content: '宋代出行有严格的礼仪规范，不同身份的人使用不同的交通工具。官员出行有仪仗，平民出行相对简单，体现了严格的等级制度。'
        },
        {
          title: '交通管理',
          content: '宋代对交通进行了一定的管理，设置了驿站、关卡等设施。城市内也有一定的交通规则，保证了出行的安全和秩序。'
        },
        {
          title: '出行费用',
          content: '宋代出行费用因距离和交通工具而异。短途步行免费，长途需要支付车马费或船费。不同阶层的人出行成本差异较大。'
        },
        {
          title: '出行安全',
          content: '宋代出行存在一定的安全风险，特别是长途出行。因此，人们通常会结伴而行，或者雇佣保镖，确保出行安全。'
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
.wiki-page {
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

.wiki-card {
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.wiki-header {
  margin-bottom: 20rpx;
}

.wiki-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.wiki-content {
  display: flex;
  flex-direction: column;
}

.wiki-text {
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
  letter-spacing: 1rpx;
}

.back-btn:active,
.wiki-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

