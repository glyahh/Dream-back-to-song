<template>
  <view class="page">
    <!-- 顶部标题区域 -->
    <view class="hero">
      <image class="hero-img" src="/static/travel-hero-bg.png" mode="aspectFill" />
      <view class="hero-overlay" />
      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <view class="hero-content">
        <text class="hero-title">出行</text>
        <text class="hero-subtitle">雕车竞驻于天街，宝马争驰于御路</text>
      </view>
    </view>

    <!-- 内容区域容器（用于遮挡和圆角） -->
    <view class="content-wrapper">
      <!-- 分类导航图标 - 四个水平均匀分布 -->
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

      <!-- 探索出行部分 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">探索出行</text>
        </view>

        <view class="explore-container">
          <!-- 出行体验 - 最上方，宽度占满 -->
          <view class="explore-card full-width" @click="handleExploreClick(exploreItems[0])">
            <image class="explore-img" :src="exploreItems[0].image" mode="aspectFill" />
            <view class="explore-content">
              <text class="explore-title">{{ exploreItems[0].title }}</text>
              <text class="explore-desc">{{ exploreItems[0].desc }}</text>
            </view>
          </view>

          <!-- 分类和特征 - 下方两列，左边宽右边窄 -->
          <view class="explore-row">
            <view class="explore-card wide" @click="handleExploreClick(exploreItems[1])">
              <image class="explore-img" :src="exploreItems[1].image" mode="aspectFill" />
              <view class="explore-content">
                <text class="explore-title">{{ exploreItems[1].title }}</text>
                <text class="explore-desc">{{ exploreItems[1].desc }}</text>
              </view>
            </view>

            <view class="explore-card narrow" @click="handleExploreClick(exploreItems[2])">
              <image class="explore-img" :src="exploreItems[2].image" mode="aspectFill" />
              <view class="explore-content">
                <text class="explore-title">{{ exploreItems[2].title }}</text>
                <text class="explore-desc">{{ exploreItems[2].desc }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 精选推荐部分 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">精选推荐</text>
          <view class="section-more" @click="goToMoreRecommendations">
            <text class="more-text">更多</text>
            <text class="more-icon">›</text>
          </view>
        </view>

        <view class="recommendation-container">
          <view class="recommendation-card" @click="handleRecommendationClick(mainRecommendation)">
            <image class="recommendation-img" :src="mainRecommendation.image" mode="aspectFill" />
            <view class="recommendation-overlay" />
            <view class="recommendation-content">
              <text class="recommendation-title">{{ mainRecommendation.title }}</text>
              <text class="recommendation-desc">{{ mainRecommendation.desc }}</text>
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
      // 导航图标数据 - 四个项目
      navItems: [
        {
          title: '出行方式',
          icon: '/static/travel-nav-method.jpg',
          path: '/pages/travel/method/index'
        },
        {
          title: '交通工具',
          icon: '/static/travel-nav-vehicle.jpg',
          path: '/pages/travel/vehicle/index'
        },
        {
          title: '出行百科',
          icon: '/static/travel-nav-wiki.jpg',
          path: '/pages/travel/wiki/index'
        },
        {
          title: '交通图典',
          icon: '/static/travel-nav-atlas.jpg',
          path: '/pages/travel/atlas/index'
        }
      ],
      // 探索出行数据
      exploreItems: [
        {
          title: '出行体验',
          desc: '体验宋朝人的出行方式',
          image: '/static/travel-explore-experience.png',
          path: '/pages/travel/explore/experience'
        },
        {
          title: '分类',
          desc: '种类丰富多样',
          image: '/static/travel-explore-category.png',
          path: '/pages/travel/explore/category'
        },
        {
          title: '特征',
          desc: '地域和阶层',
          image: '/static/travel-explore-feature.jpg',
          path: '/pages/travel/explore/feature'
        }
      ],
      // 主推荐项目
      mainRecommendation: {
        title: '汴京街市车马图',
        desc: '北宋都城繁华的交通景象',
        image: '/static/travel-recommend-main.png',
        path: '/pages/travel/recommend/detail'
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

    handleExploreClick(item) {
      // 探索出行点击处理
      if (item.path) {
        uni.navigateTo({
          url: item.path
        })
      }
    },

    handleRecommendationClick(item) {
      // 推荐项目点击处理
      if (item.path) {
        uni.navigateTo({
          url: item.path
        })
      }
    },

    goToMoreRecommendations() {
      // 更多推荐跳转
      uni.navigateTo({
        url: '/pages/travel/recommend/more'
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
  margin-bottom: 30rpx;
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

/* 导航图标区域 - 四个项目水平均匀分布 */
.nav-icons {
  display: flex;
  justify-content: space-around;
  padding: 60rpx 20rpx;
  margin: 0 20rpx 20rpx;
  border-radius: 30rpx;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140rpx;
}

.nav-icon {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  margin-bottom: 15rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.nav-text {
  font-size: 26rpx;
  color: #3b352b;
  font-weight: 560;
  font-family: "SimSun", "Songti SC", "STSong", serif;
  text-align: center;
  word-break: break-all;
}

/* 通用部分样式 */
.section {
  padding: 30rpx 40rpx 20rpx;
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

/* 探索出行部分 - 重新设计布局 */
.explore-container {
  width: 100%;
}

/* 出行体验 - 最上方，宽度占满 */
.explore-card.full-width {
  position: relative;
  width: 100%;
  height: 280rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
}

/* 下方两列容器 */
.explore-row {
  display: flex;
  width: 100%;
  gap: 20rpx;
}

/* 分类 - 左侧宽图 (2:1比例中的2) */
.explore-card.wide {
  position: relative;
  flex: 2;
  height: 200rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

/* 特征 - 右侧窄图 (2:1比例中的1) */
.explore-card.narrow {
  position: relative;
  flex: 1;
  height: 200rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.explore-img {
  width: 100%;
  height: 100%;
  display: block;
}

.explore-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);
}

.explore-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.explore-title {
  font-size: 32rpx;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 10rpx;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.3);
  font-family: "SimSun", "Songti SC", "STSong", serif;
}

.explore-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.3);
}

/* 精选推荐部分 */
.recommendation-container {
  width: 100%;
}

.recommendation-card {
  position: relative;
  width: 100%;
  height: 350rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.recommendation-img {
  width: 100%;
  height: 100%;
  display: block;
}

.recommendation-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
}

.recommendation-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.recommendation-title {
  font-size: 36rpx;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 15rpx;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
  font-family: "SimSun", "Songti SC", "STSong", serif;
}

.recommendation-desc {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.5);
}

/* 点击效果 */
.nav-item,
.explore-card,
.recommendation-card,
.section-more {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.nav-item:active {
  transform: scale(0.95);
  opacity: 0.9;
}

.explore-card:active,
.recommendation-card:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.section-more:active {
  opacity: 0.8;
}
</style>