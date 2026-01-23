<template>
  <view class="food-page">
    <!-- 顶部背景和内容 -->
    <view class="header-section">
      <image
        class="header-bg"
        src="/static/food_header_bg.jpg"
        mode="aspectFill"
      />
      <view class="header-overlay" />

      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <view class="back-icon">‹</view>
      </view>

      <!-- 标题区域 -->
      <view class="header-content">
        <text class="main-title">饮食</text>
        <text class="subtitle">集中四海之珍奇，会寰区之异味</text>
      </view>
    </view>

    <!-- 分类食谱 -->
    <view class="category-section">
      <text class="section-title">分类食谱</text>

      <!-- 特殊布局：左右平分矩形 -->
      <view class="category-rectangle">
        <!-- 左半边（两个项目） -->
        <view class="left-half">
          <!-- 肉食 -->
          <view class="category-item meat" @click="goToCategory('meat')">
            <image class="category-bg" src="/static/food_meat.png" mode="aspectFill" />
            <view class="category-content">
              <text class="category-name">肉食</text>
            </view>
          </view>

          <!-- 面食 -->
          <view class="category-item noodle" @click="goToCategory('noodle')">
            <image class="category-bg" src="/static/food_noodle.jpg" mode="aspectFill" />
            <view class="category-content">
              <text class="category-name">面食</text>
            </view>
          </view>
        </view>

        <!-- 右半边（三个项目，高度不同） -->
        <view class="right-half">
          <!-- 素食（中等高度） -->
          <view class="category-item vegetarian" @click="goToCategory('vegetarian')">
            <image class="category-bg" src="/static/food_vegetarian.jpg" mode="aspectFill" />
            <view class="category-content">
              <text class="category-name">素食</text>
            </view>
          </view>

          <!-- 点心（最大高度） -->
          <view class="category-item dessert" @click="goToCategory('dessert')">
            <image class="category-bg" src="/static/food_dessert.jpg" mode="aspectFill" />
            <view class="category-content">
              <text class="category-name">点心</text>
            </view>
          </view>

          <!-- 饮品（最小高度） -->
          <view class="category-item drink" @click="goToCategory('drink')">
            <image class="category-bg" src="/static/food_drink.jpg" mode="aspectFill" />
            <view class="category-content">
              <text class="category-name">饮品</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 食在宋朝 -->
    <view class="song-dynasty-section">
      <view class="section-header">
        <text class="section-title">食在宋朝</text>
        <view class="view-more" @click="goToSongDynasty">
          <text class="view-more-text">更多</text>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 将占位内容替换为图片 -->
      <image
        class="song-dynasty-img"
        src="/static/song-dynasty.png"
        mode="aspectFill"
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 可以添加数据
    }
  },
  methods: {
    // 返回上一页
    goBack() {
          uni.redirectTo({
            url: '/pages/main_index/main_index'
          });
        },

    // 跳转到分类页面
    goToCategory(category) {
      const routes = {
        meat: '/pages/food/category/meat',
        vegetarian: '/pages/food/category/vegetarian',
        dessert: '/pages/food/category/dessert',
        noodle: '/pages/food/category/noodle',
        drink: '/pages/food/category/drink'
      }

      uni.navigateTo({
        url: routes[category]
      })
    },

    // 跳转到食在宋朝页面
    goToSongDynasty() {
      uni.navigateTo({
        url: '/pages/food/song-dynasty'
      })
    }
  }
}
</script>

<style scoped>
.food-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
  padding-bottom: 60rpx;
  position: relative;
}

/* 顶部背景区域 */
.header-section {
  position: relative;
  height: 500rpx;
  overflow: visible;
  z-index: 1;
}

.header-bg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  overflow: hidden;
   z-index: 1
}

.header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
}

/* 返回按钮 */
.back-btn {
  position: fixed;
  top: 100rpx;
  left: 30rpx;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.back-icon {
  font-size: 40rpx;
  color: #333;
  font-weight: 300;
  margin-top: -13rpx;
  margin-left: -4rpx;
}

/* 标题内容 */
.header-content {
  position: absolute;
  bottom: 50rpx;
  left: 0;
  right: 0;
  padding: 0 40rpx;
  z-index: 5;
}

.main-title {
   display: block;
    font-size: 60rpx;
    color: black;
    font-weight: 600;
    margin-bottom: 10rpx;
    font-family: "SimSun", "Songti SC", "STSong", serif;
    margin-bottom:30rpx;
}

.subtitle {
  display: block;
  font-size: 33rpx;
  color: black;
  letter-spacing: 4rpx;
}

/* 分类食谱区域 */
.category-section {
  position: relative;
  padding: 40rpx 30rpx 30rpx;
  margin-top:-30rpx;
  border-radius: 50rpx 50rpx 0 0;
  background:#f6f2e9;
  z-index:10;
}

.section-title {
  font-size: 50rpx;
  font-weight: 700;
  color: #3b352b;
  letter-spacing: 4rpx;
  margin-top: 40rpx;
  margin-left: 27rpx;
  margin-bottom: 5rpx;
  display: block;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
}

.song-dynasty-section .section-title {
  margin-left: -5rpx; /* 覆盖原有样式 */
}


/* 特殊矩形布局 */
.category-rectangle {
  border-radius: 24rpx;
  padding: 25rpx;
  padding-top:10rpx;
  box-shadow: 0 4rpx 20rpx rgba(225, 225, 225, 0.08);
  display: flex;
  justify-content: space-between;
}

.left-half {
  width: 48%;
  display: flex;
  flex-direction: column;
}

.right-half {
  width: 48%;
  display: flex;
  flex-direction: column;
}

/* 分类项基础样式 */
.category-item {
  border-radius: 18rpx;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
}

/* 左半边 - 两个等高的项目 */
.left-half .category-item {
  height: 330rpx; /* 保持等高 */
  margin-bottom: 20rpx;
}

.left-half .category-item:last-child {
  margin-bottom: 0;
}

/* 右半边 - 三个不同高度的项目 */
.right-half .category-item {
  margin-bottom: 20rpx;
}

.right-half .category-item:last-child {
  margin-bottom: 0;
}

/* 右边三个项目的高度 */
.right-half .vegetarian {
  height: 200rpx; /* 素食 - 中等高度 */
}

.right-half .dessert {
  height: 300rpx; /* 点心 - 最大高度 */
}

.right-half .drink {
  height: 140rpx; /* 饮品 - 最小高度 */
}

.category-bg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.category-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
}

.category-name {
  display: block;
  font-size: 32rpx;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 6rpx;
  letter-spacing: 2rpx;
  text-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.7);
}

.category-desc {
  display: block;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 1rpx;
  text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.7);
}

/* 食在宋朝区域 */
.song-dynasty-section {
  margin: 30rpx 30rpx 0;
  margin-top:-30rpx;
  border-radius: 24rpx 24rpx 0 0;
  padding: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25rpx;
}

.view-more {
  display: flex;
  align-items: center;
  margin-top:40rpx;
  height:30rpx;
  padding: 10rpx 20rpx;
  /*background-color: #9ea97f;*/
  border-radius: 30rpx;
}

.view-more-text {
  font-size: 24rpx;
  color:#3b352b;
  font-weight: 500;
  margin-right: 6rpx;
}

.arrow {
  font-size: 35rpx;
  color: #3b352b;
  font-weight: 300;
  padding-bottom:10rpx;
}

/* 食在宋朝图片 */
.song-dynasty-img {
  width: 100%;
  height: 300rpx;
  border-radius: 16rpx;
  display: block;
}

/* 触摸效果 */
.back-btn,
.category-item,
.view-more {
  transition: all 0.2s ease;
}

.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}

.category-item:active {
  opacity: 0.9;
  transform: translateY(-4rpx);
}

.view-more:active {
  background-color: #8b976e;
  transform: scale(0.98);
}
</style>