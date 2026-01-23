<template>
  <view class="gallery-page">
    <!-- 顶部固定导航栏 -->
    <view class="gallery-header">
      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="gallery-title">名画建筑</text>
    </view>

    <!-- 画廊内容 -->
    <scroll-view
      class="gallery-scroll"
      scroll-y="true"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <view class="gallery-content">
        <!-- 千里江山图 -->
        <view class="painting-item" @click="navigateToDetail(1)">
          <image class="painting-image" src="/static/painting-qianli.png" mode="aspectFill" />
          <view class="painting-overlay">
            <view class="painting-info">
              <text class="painting-name">千里江山图</text>
              <view class="painting-details">
                <text class="painting-dynasty">[北宋]王希孟</text>
                <text class="painting-material">绢本设色</text>
              </view>
            </view>
          </view>
          <!-- 右下角点击进入按钮 -->
          <view class="enter-btn" @click.stop="navigateToDetail(1)">
            <text class="enter-text">点击进入</text>
          </view>
        </view>

        <!-- 清明上河图 -->
        <view class="painting-item" @click="navigateToDetail(2)">
          <image class="painting-image" src="/static/painting-qingming.png" mode="aspectFill" />
          <view class="painting-overlay">
            <view class="painting-info">
              <text class="painting-name">清明上河图</text>
              <view class="painting-details">
                <text class="painting-dynasty">[北宋]张择端</text>
                <text class="painting-material">绢本设色</text>
              </view>
            </view>
          </view>
          <!-- 右下角点击进入按钮 -->
          <view class="enter-btn" @click.stop="navigateToDetail(2)">
            <text class="enter-text">点击进入</text>
          </view>
        </view>

        <!-- 秋窗读书图 -->
        <view class="painting-item" @click="navigateToDetail(3)">
          <image class="painting-image" src="/static/painting-qiuchuang.png" mode="aspectFill" />
          <view class="painting-overlay">
            <view class="painting-info">
              <text class="painting-name">秋窗读书图</text>
              <view class="painting-details">
                <text class="painting-dynasty">[南宋]刘松年</text>
                <text class="painting-material">绢本设色</text>
              </view>
            </view>
          </view>
          <!-- 右下角点击进入按钮 -->
          <view class="enter-btn" @click.stop="navigateToDetail(3)">
            <text class="enter-text">点击进入</text>
          </view>
        </view>

        <!-- 妆靓仕女图 -->
        <view class="painting-item" @click="navigateToDetail(4)">
          <image class="painting-image" src="/static/painting-zhuangling.png" mode="aspectFill" />
          <view class="painting-overlay">
            <view class="painting-info">
              <text class="painting-name">妆靓仕女图</text>
              <view class="painting-details">
                <text class="painting-dynasty">[北宋]苏汉臣</text>
                <text class="painting-material">绢本设色</text>
              </view>
            </view>
          </view>
          <!-- 右下角点击进入按钮 -->
          <view class="enter-btn" @click.stop="navigateToDetail(4)">
            <text class="enter-text">点击进入</text>
          </view>
        </view>

        <!-- 底部留白 -->
        <view class="bottom-space"></view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
      paintings: [
        {
          id: 1,
          name: '千里江山图',
          dynasty: '[北宋]王希孟',
          material: '绢本设色',
          image: '/static/painting-qianli.png',
          detailPath: '/pages/lodging/painting/detail/qianli' // 预留详情页路径
        },
        {
          id: 2,
          name: '清明上河图',
          dynasty: '[北宋]张择端',
          material: '绢本设色',
          image: '/static/painting-qingming.png',
          detailPath: '/pages/lodging/painting/detail/qingming'
        },
        {
          id: 3,
          name: '秋窗读书图',
          dynasty: '[南宋]刘松年',
          material: '绢本设色',
          image: '/static/painting-qiuchuang.png',
          detailPath: '/pages/lodging/painting/detail/qiuchuang'
        },
        {
          id: 4,
          name: '妆靓仕女图',
          dynasty: '[北宋]苏汉臣',
          material: '绢本设色',
          image: '/static/painting-zhuangling.png',
          detailPath: '/pages/lodging/painting/detail/zhuangling'
        }
      ]
    }
  },
  methods: {
    goBack() {
              uni.redirectTo({
                url: '/pages/lodging/index'
              });
            },

    navigateToDetail(id) {
      // 这里可以根据id跳转到不同的详情页
      const painting = this.paintings.find(item => item.id === id)
      if (painting && painting.detailPath) {
        uni.navigateTo({
          url: painting.detailPath
        })
      } else {
        // 如果没有配置详情页，可以先跳转到一个通用页面
        uni.navigateTo({
          url: `/pages/lodging/painting/detail/index?id=${id}`
        })
      }
    },

    onScroll(e) {
      // 如果需要记录滚动位置，可以在这里处理
      // this.scrollTop = e.detail.scrollTop
    }
  }
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