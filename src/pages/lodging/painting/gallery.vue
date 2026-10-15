<template>
  <view class="gallery-page">
    <view class="gallery-header">
      <view class="back-btn" @click="goBack"><text class="back-icon">‹</text></view>
      <text class="gallery-title">名画建筑</text>
    </view>

    <scroll-view class="gallery-scroll" scroll-y :scroll-top="scrollTop" @scroll="onScroll">
      <view class="gallery-content">
        <view v-for="painting in paintings" :key="painting.key" class="painting-item" @click="navigateToDetail(painting.key)">
          <image class="painting-image" :src="painting.image" :alt="painting.name" mode="aspectFill" />
          <view class="painting-overlay">
            <view class="painting-info">
              <text class="painting-name">{{ painting.name }}</text>
              <view v-if="painting.facts.length" class="painting-details">
                <text v-if="painting.dynasty" class="painting-dynasty">{{ painting.dynasty }}</text>
                <text v-if="painting.material" class="painting-material">{{ painting.material }}</text>
              </view>
            </view>
          </view>
          <button class="enter-btn" :aria-label="'查看' + painting.name" @click.stop="navigateToDetail(painting.key)">
            <text class="enter-text">查看详情</text>
          </button>
        </view>
        <view class="bottom-space" />
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { paintingContents } from '@/utils/paintingContents.js'

export default {
  data() {
    return {
      scrollTop: 0,
      paintings: paintingContents.map((painting) => {
        const fact = (label) => painting.facts.find((item) => item.label === label)?.value
        return {
          ...painting,
          dynasty: [fact('时代'), fact('作者')].filter(Boolean).join(' · '),
          material: fact('材质'),
        }
      }),
    }
  },
  methods: {
    goBack() {
      uni.redirectTo({ url: '/pages/lodging/index' })
    },
    navigateToDetail(key) {
      uni.navigateTo({ url: `/pages/lodging/painting/detail?key=${key}` })
    },
    onScroll(event) {
      this.scrollTop = event.detail.scrollTop
    },
  },
}
</script>

<style scoped>
.gallery-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

/* 顶部固定导航栏 */
.gallery-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 180rpx;
  background-color: rgba(200, 210, 190, 0.95);
  backdrop-filter: blur(20rpx);
  display: flex;
  align-items: center;
  justify-content: center; /* 新增：使内容居中 */
  padding: 0 30rpx;
  z-index: 100;
  border-bottom: 1rpx solid rgba(59, 53, 43, 0.1);
}

.back-btn {
  position: absolute; /* 绝对定位，不影响居中 */
  left: 30rpx; /* 固定在左侧 */
  width: 60rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  margin-top:60rpx;
}

.back-icon {
  font-size: 48rpx;
  color: #3b352b;
  margin-top: -8rpx;
  margin-left: -4rpx;
}

.gallery-title {
  font-size: 45rpx;
  color: #3b352b;
  font-weight: 600;
  letter-spacing: 2rpx;
  font-family: "SimSun", "Songti SC", "STSong", serif;
  margin-top:70rpx;
}

/* 画廊滚动区域 */
.gallery-scroll {
  height: 100vh;
  padding-top: 220rpx;
  box-sizing: border-box;
}

.gallery-content {
  padding: 40rpx 30rpx;
}

/* 画作项目 */
.painting-item {
  position: relative;
  border-radius: 24rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
  height: 360rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.painting-item:active {
  transform: scale(0.98);
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.painting-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24rpx;
  object-fit: cover;
}

/* 图片上的半透明遮罩和文字 */
.painting-overlay {
  position: absolute;
  bottom: 20rpx;
  left: 20rpx;
  right: 0;
  padding: 30rpx;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 0 0 24rpx 24rpx;
}

.painting-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.painting-name {
  font-size: 40rpx;
  color: #ffffff;
  font-weight: 100;
  margin-bottom: 12rpx;
  font-family: "SimSun", "Songti SC", "STSong", serif;
  line-height: 1.3;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.5);
}

.painting-details {
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.painting-dynasty {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 400;
  line-height: 1.4;
  text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.5);
}

.painting-material {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  line-height: 1.4;
  text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.5);
}

/* 右下角点击进入按钮 */
/* 右下角点击进入按钮 */
.enter-btn {
  margin: 0;
  border: 0;
  min-height: 44px;
  line-height: 1.4;
  cursor: pointer;
  position: absolute;
  top: 75%;
  left: 75%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.35);
  border-radius: 20rpx;
  padding: 10rpx 25rpx; /* 内边距可根据字体大小自适应 */
  min-width: 120rpx;     /* 设置最小宽度 */
  height: auto;         /* 高度自适应 */
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5rpx);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
  z-index: 2;
  /* 确保文本不换行 */
  white-space: nowrap;
}



.enter-btn:active {
  opacity: 0.9;
}

.enter-btn::after {
  border: 0;
}

.enter-btn:focus-visible {
  outline: 2px solid #c8b69a;
  outline-offset: 2px;
}

.enter-text {
  font-size:38rpx;
  color: white;
  letter-spacing: 1rpx;
  font-family: "KaiTi", "STKaiti", "KaiTi_GB2312", serif;
}

.bottom-space {
  height: 100rpx;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .painting-name {
    font-size: 36rpx;
  }

  .painting-dynasty {
    font-size: 26rpx;
  }

  .painting-material {
    font-size: 24rpx;
  }

  .enter-btn {
    bottom: 20rpx;
    right: 20rpx;
    padding: 8rpx 20rpx;
  }

  .enter-text {
    font-size: 26rpx;
  }
}
</style>
