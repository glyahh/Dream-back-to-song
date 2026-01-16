<template>
  <view class="loading-container">
    <!-- 跳过按钮（最后一张不显示） -->
    <view v-if="showSkipBtn" class="skip-btn" @click="handleSkip">
      <text class="skip-text">跳过</text>
    </view>

    <!-- 第一页（独立显示，3秒后隐藏） -->
    <view v-if="showFirstPage" class="first-page page-content page-1" :class="{ 'page-1-animated': showAnimation }">
      <image class="page-bg-img" src="/static/loading_page/load_1_bg.png" mode="aspectFill" />
      <view class="first-page-content">
        <view class="word-wrapper">
          <image class="word-img" src="/static/loading_page/load_1_word.png" mode="widthFix" />
          <image class="logo-img" src="/static/loading_page/load_1_logo.png" mode="aspectFit" />
        </view>
      </view>
    </view>

    <!-- 后三页轮播图容器 -->
    <view v-else class="swiper-container">
      <swiper
        class="loading-swiper"
        :current="swiperIndex"
        @change="handleSwiperChange"
        :autoplay="false"
        :circular="false"
        :indicator-dots="false"
      >
        <!-- 第二张图片 -->
        <swiper-item class="swiper-item">
          <view class="page-content page-2-3-4">
            <view class="image-wrapper">
              <image class="page-img" src="/static/loading_page/load_2_bg.png" mode="aspectFit" />
            </view>
            <view class="calligraphy-wrapper calligraphy-page-2">
              <text class="calligraphy-text calligraphy-right">山色空蒙雨亦奇</text>
              <text class="calligraphy-text calligraphy-left">水光潋滟晴方好</text>
            </view>
          </view>
        </swiper-item>

        <!-- 第三张图片 -->
        <swiper-item class="swiper-item">
          <view class="page-content page-2-3-4">
            <view class="image-wrapper">
              <image class="page-img" src="/static/loading_page/load_3.png" mode="aspectFit" />
            </view>
            <view class="calligraphy-wrapper calligraphy-page-3">
              <text class="calligraphy-text calligraphy-right">今宵酒醒何处</text>
              <text class="calligraphy-text calligraphy-left">杨柳岸晓风残月</text>
            </view>
          </view>
        </swiper-item>

        <!-- 第四张图片（带进入按钮） -->
        <swiper-item class="swiper-item">
          <view class="page-content page-2-3-4 page-4">
            <view class="image-wrapper">
              <image class="page-img" src="/static/loading_page/load_4.png" mode="aspectFit" />
            </view>
            <view class="calligraphy-wrapper">
              <text class="calligraphy-text calligraphy-right">似曾相识燕归来</text>
              <text class="calligraphy-text calligraphy-left">无可奈何花落去</text>
            </view>
            <view class="enter-btn-wrapper" @click="handleEnter">
              <text class="enter-text">进入</text>
            </view>
          </view>
        </swiper-item>
      </swiper>

      <!-- 自定义指示器（只显示3个点，对应后三页） -->
      <view v-if="swiperIndex < 2" class="indicator-wrapper">
        <view
          v-for="(item, index) in 3"
          :key="index"
          class="indicator-dot"
          :class="{ 'indicator-dot-active': swiperIndex === index }"
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showFirstPage: true, // 是否显示第一页
      showAnimation: false, // 第一页动画控制
      swiperIndex: 0, // swiper当前索引（0-2，对应第2、3、4页）
      autoPlayTimer: null, // 自动播放定时器
      firstPageTimer: null, // 第一页等待定时器
    }
  },
  onLoad() {
    // 页面加载时启动第一页动画
    this.startFirstPageAnimation()
    // 3秒后自动切换到第二页
    this.startFirstPageTimer()
  },
  onUnload() {
    // 清理定时器
    this.clearAllTimers()
  },
  computed: {
    // 是否显示跳过按钮（最后一张不显示）
    showSkipBtn() {
      return !this.showFirstPage && this.swiperIndex !== 2
    },
  },
  methods: {
    // 启动第一页动画
    startFirstPageAnimation() {
      setTimeout(() => {
        this.showAnimation = true
      }, 100)
    },
    // 第一页等待3秒后切换到第二页
    startFirstPageTimer() {
      this.firstPageTimer = setTimeout(() => {
        if (this.showFirstPage) {
          this.showFirstPage = false
          this.swiperIndex = 0
          this.startAutoPlay()
        }
      }, 3000)
    },
    // 启动自动播放（5秒切换一页）
    startAutoPlay() {
      this.clearAutoPlayTimer()
      this.autoPlayTimer = setInterval(() => {
        if (this.swiperIndex < 2) {
          this.swiperIndex++
        } else {
          // 如果是最后一页，停止自动播放
          this.clearAutoPlayTimer()
        }
      }, 5000)
    },
    // 清理自动播放定时器
    clearAutoPlayTimer() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer)
        this.autoPlayTimer = null
      }
    },
    // 清理所有定时器
    clearAllTimers() {
      this.clearAutoPlayTimer()
      if (this.firstPageTimer) {
        clearTimeout(this.firstPageTimer)
        this.firstPageTimer = null
      }
    },
    // 轮播图切换事件
    handleSwiperChange(e) {
      const newIndex = e.detail.current
      this.swiperIndex = newIndex
      
      // 切换后重新启动自动播放
      if (this.swiperIndex < 2) {
        this.startAutoPlay()
      } else {
        // 如果是最后一页，停止自动播放
        this.clearAutoPlayTimer()
      }
    },
    // 跳过按钮点击
    handleSkip() {
      this.clearAllTimers()
      this.navigateToLogin()
    },
    // 进入按钮点击（最后一页）
    handleEnter() {
      this.clearAllTimers()
      this.navigateToLogin()
    },
    // 跳转到登录页
    navigateToLogin() {
      uni.reLaunch({
        url: '/pages/index/index',
      })
    },
  },
}
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.skip-btn {
  position: absolute;
  top: 60rpx;
  right: 40rpx;
  z-index: 100;
  width: 120rpx;
  height: 60rpx;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.skip-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 400;
}

/* 第一页独立样式 */
.first-page {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.first-page-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 80rpx;
  box-sizing: border-box;
}

.word-wrapper {
  position: relative;
  display: inline-block;
}

.word-img {
  display: block;
  width: 300rpx;
  height: auto;
}

.logo-img {
  position: absolute;
  right: -50rpx;
  bottom: -50rpx;
  width: 100rpx;
  height: 100rpx;
  z-index: 10;
}

.swiper-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #F5F2EB;
}

.loading-swiper {
  width: 100%;
  height: 100vh;
}

.swiper-item {
  width: 100%;
  height: 100%;
}

.page-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-bg-img {
  width: 100%;
  height: 100%;
}

/* 后三页样式 */
.page-2-3-4 {
  background-color: #F5F2EB;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
}

.image-wrapper {
  flex-shrink: 0;
  width: 540rpx;
  height: 540rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin: 0 auto;
}

.page-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
}

.calligraphy-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  width: 540rpx;
  height: 540rpx;
  padding-right: 0;
  padding-left: 0;
  padding-top: 0;
  box-sizing: border-box;
  z-index: 2;
  pointer-events: none;
}

.calligraphy-text {
  font-size: 46rpx;
  color: #1a1a1a;
  line-height: 1.15;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 3rpx;
  font-family: 'STXingkai', 'Xingkai SC', 'STHupo', 'Hupo SC', 'STKaiti', 'KaiTi', 'PingFang SC', 'Noto Sans SC', serif;
  font-weight: 500;
  display: inline-block;
  white-space: nowrap;
  text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.1);
  opacity: 0.98;
  font-style: normal;
  pointer-events: none;
}

.calligraphy-right {
  margin-right: 20rpx;
  position: absolute;
  right: 40rpx;
  top: -360rpx;
}

.calligraphy-left {
  margin-right: 0;
  position: absolute;
  right: 0;
  top: -240rpx;
}

/* 第二张图片的文字位置调整（右高左低） */
.calligraphy-page-2 .calligraphy-right {
  top: -380rpx;
}

.calligraphy-page-2 .calligraphy-left {
  top: -260rpx;
}

/* 第三张图片的文字位置调整（右高左低） */
.calligraphy-page-3 .calligraphy-right {
  top: -380rpx;
}

.calligraphy-page-3 .calligraphy-left {
  top: -200rpx;
}

/* 第一页动画 */
.page-1 {
  opacity: 0;
  transform: scale(1.05);
  transition: opacity 2s ease-in-out, transform 2s ease-in-out;
}

.page-1-animated {
  opacity: 1;
  transform: scale(1);
}

/* 第四页样式（带进入按钮） */
.page-4 {
  position: relative;
}

.enter-btn-wrapper {
  position: absolute;
  bottom: 180rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 260rpx;
  height: 88rpx;
  background-color: #B0C4B0;
  border-radius: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}

.enter-text {
  font-size: 34rpx;
  color: #000;
  font-weight: 500;
  letter-spacing: 6rpx;
}

/* 自定义指示器 */
.indicator-wrapper {
  position: absolute;
  bottom: 60rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.indicator-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.indicator-dot-active {
  width: 24rpx;
  border-radius: 6rpx;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
