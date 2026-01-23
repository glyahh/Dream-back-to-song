<template>
  <view class="page">
    <!-- 顶部标题区域 -->
    <view class="hero">
      <image class="hero-img" src="/static/lodging-hero-bg.png" mode="aspectFill" />
      <view class="hero-overlay" />
      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <view class="hero-content">
        <text class="hero-title">住所</text>
        <text class="hero-subtitle">精巧细致，典雅秀丽</text>
      </view>
    </view>

    <!-- 内容区域容器（用于遮挡和圆角） -->
    <view class="content-wrapper">
      <!-- 分类导航图标 -->
      <view class="nav-icons">
        <view
          v-for="(item, index) in navItems"
          :key="index"
          class="nav-item"
          @click="handleNavClick(item)"
        >
          <image class="nav-icon" :src="item.icon" mode="aspectFill" />
          <text class="nav-text">{{ item.title }}</text>
        </view>
      </view>

      <!-- 建筑推荐部分 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">建筑推荐</text>
          <view class="section-more" @click="goToMoreBuildings">
            <text class="more-text">更多</text>
            <text class="more-icon">›</text>
          </view>
        </view>

        <scroll-view class="building-scroll" scroll-x="true" show-scrollbar="false">
          <view class="building-container">
            <view
              v-for="(building, index) in recommendedBuildings"
              :key="index"
              class="building-card"
              @click="handleBuildingClick(building)"
            >
              <image class="building-img" :src="building.image" mode="aspectFill" />
              <view class="building-info">
                <text class="building-name">{{ building.name }}</text>
                <text class="building-location">{{ building.location }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 名画建筑部分 -->
      <view class="section painting-section">
        <view class="section-header">
          <text class="section-title">名画建筑</text>
        </view>

        <view class="painting-container">
          <view class="painting-card">
            <image class="painting-img" :src="painting.image" mode="aspectFill" />
            <view class="painting-overlay">
              <view class="painting-text-container">
                <text class="painting-subtitle">名画中的</text>
                <text class="painting-subtitle second-line">宋朝居所</text>
              </view>
              <view class="enter-btn" @click="handlePaintingClick(painting)">
                <text class="enter-text">进入</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          title: '园林景观',
          icon: '/static/nav-garden.jpg',
          path: '/pages/lodging/category/garden'
        },
        {
          title: '建筑类型',
          icon: '/static/nav-architecture.jpg',
          path: '/pages/lodging/category/architecture'
        },
        {
          title: '室内设计',
          icon: '/static/nav-interior.jpg',
          path: '/pages/lodging/category/interior'
        }
      ],
      recommendedBuildings: [
        {
          name: '河南洛阳环溪',
          location: '河南洛阳',
          image: '/static/building-huanyixi.png',
          path: '/pages/lodging/detail/huanyixi'
        },
        {
          name: '山西晋祠圣母殿',
          location: '山西太原',
          image: '/static/building-jinci.png',
          path: '/pages/lodging/detail/jinci'
        },
        {
          name: '河北承德避暑山庄',
          location: '河北承德',
          image: '/static/building-hebei.png',
          path: '/pages/lodging/detail/hebei'
        },
        {
          name: '苏州拙政园',
          location: '江苏苏州',
          image: '/static/building-suzhou.png',
          path: '/pages/lodging/detail/suzhou'
        }
      ],
      painting: {
        title: '名画中的宋朝居所',
        image: '/static/painting-main.png',
        path: '/pages/lodging/painting/gallery'
      }
    }
  },
  methods: {
    goBack() {
              uni.redirectTo({
                url: '/pages/main_index/main_index'
              });
            },

    handleNavClick(item) {
      // 导航图标点击处理
      if (item.path) {
        uni.navigateTo({
          url: item.path
        })
      }
    },

    handleBuildingClick(building) {
      // 建筑推荐点击跳转
      if (building.path) {
        uni.navigateTo({
          url: building.path
        })
      }
    },

    handlePaintingClick(painting) {
      // 名画建筑点击跳转
      if (painting.path) {
        uni.navigateTo({
          url: painting.path
        })
      }
    },

    goToMoreBuildings() {
      // 更多建筑跳转
      uni.navigateTo({
        url: '/pages/lodging/more'
      })
    }
  }
}
</script>

<style scoped>
.page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

/* 顶部标题区域 */
.hero {
  position: relative;
  height: 500rpx;
  overflow: hidden;
  z-index: 1;
}

.hero-img {
  width: 100%;
  height: 100%;
  display: block;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, transparent 100%);
}

.back-btn {
  position: fixed;
  top: 80rpx;
  left: 30rpx;
  width: 60rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.back-icon {
  font-size: 48rpx;
  color: #3b352b;
  margin-top: -8rpx;
  margin-left: -4rpx;
}

.hero-content {
  position: absolute;
  bottom: 60rpx;
  left: 40rpx;
  z-index: 2;
}

.hero-title {
  display: block;
  font-size: 60rpx;
  color: black;
  font-weight: 600;
  margin-bottom: 10rpx;
  font-family: "SimSun", "Songti SC", "STSong", serif;
  margin-bottom:30rpx;
}

.hero-subtitle {
  display: block;
  font-size: 33rpx;
  color: black;
}

/* 内容区域容器 */
.content-wrapper {
  position: relative;
  background-color: #f6f2e9;
  border-radius: 40rpx 40rpx 0 0;
  margin-top: -30rpx;
  z-index: 2;
}

/* 导航图标区域 */
.nav-icons {
  display: flex;
  justify-content: space-around;
  padding: 60rpx 10rpx;
  margin: 0 30rpx 20rpx;
  border-radius: 30rpx;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rpx;
}

.nav-icon {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  margin-bottom: 15rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.nav-text {
  font-size: 26rpx;
  color: #3b352b;
  font-weight: 300;
  font-family: "SimSun", "Songti SC", "STSong", serif;
  white-space: nowrap;  /* 防止文字换行 */
  overflow: hidden;     /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}


/* 通用部分样式 */
.section {
  padding: 30rpx 60rpx 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
}

.section-title {
  font-size: 45rpx;
  color: #3b352b;
  font-weight: 600;
  letter-spacing: 2rpx;
  font-family: "SimSun", "Songti SC", "STSong", serif;
}

.section-more {
  display: flex;
  align-items: center;
  padding: 10rpx 20rpx;
  border-radius: 25rpx;
  background: rgba(158, 169, 127, 0.1);
}

.more-text {
  font-size: 24rpx;
  color: #9ea97f;
  margin-right: 8rpx;
}

.more-icon {
  font-size: 28rpx;
  color: #9ea97f;
}

/* 建筑推荐水平滚动 */
.building-scroll {
  width: 100%;
  white-space: nowrap;
}

.building-container {
  display: inline-flex;
  gap: 25rpx;
}

.building-card {
  position: relative;
  width: 330rpx;
  height: 470rpx;
  border-radius: 20rpx;
  overflow: hidden;
  display: inline-block;
  vertical-align: top;
  display: flex;
  flex-direction: column;
}

.building-img {
  width: 100%;
  height: 380rpx;
  display: block;
  flex-shrink: 0;
}

.building-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.building-name {
  display: block;
  font-size: 28rpx;
  color: #3b352b;
  font-weight: 500;
  margin-bottom: 8rpx;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.building-location {
  display: block;
  font-size: 24rpx;
  color: #7a7a7a;
}

/* 名画建筑部分 */
.painting-section {
  padding-top: 70rpx;
}

.painting-container {
  width: 100%;
}

.painting-card {
  position: relative;
  width: 100%;
  height: 300rpx;
  border-radius: 20rpx;
  overflow: hidden;
  background: #fff;
}

.painting-img {
  width: 100%;
  height: 100%;
  display: block;
}

.painting-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%);
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.painting-text-container {
  display: flex;
  flex-direction: column;
  margin-bottom:-20rpx;
  margin-right:20rpx;
}

.painting-subtitle {
  font-size: 45rpx;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.3);
  letter-spacing: 2rpx;
  line-height: 1.4;
  font-family: "SimSun", "Songti SC", "STSong", serif;
  padding-left:40rpx;
  margin-top: 40rpx
}

.painting-subtitle.second-line {
  margin-left: 0;
  margin-top: -10rpx
}

.enter-btn {
  align-self: flex-end;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 20rpx;
  padding: 12rpx 30rpx;
  backdrop-filter: blur(10rpx);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  margin-bottom:20rpx;
}

.enter-text {
  font-size: 34rpx;
  color: #3b352b;
  font-weight: 500;
  letter-spacing: 1rpx;
}

/* 点击效果 */
.nav-item,
.building-card,
.painting-card,
.section-more,
.enter-btn {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.nav-item:active {
  transform: scale(0.95);
  opacity: 0.9;
}

.building-card:active,
.painting-card:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.section-more:active {
  opacity: 0.8;
}

.enter-btn:active {
  transform: scale(0.95);
  opacity: 0.8;
}

/* 滚动条隐藏 */
.building-scroll ::-webkit-scrollbar {
  display: none;
}

.building-scroll {
  -webkit-overflow-scrolling: touch;
}
</style>