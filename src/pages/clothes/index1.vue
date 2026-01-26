<template>
  <view class="clothing-page">
    <!-- 顶部背景和内容 -->
    <view class="header-section">
      <image
        class="header-bg"
        src="/static/cloth_index_back1.jpg"
        mode="aspectFill"
      />
      <view class="header-overlay" />

      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <view class="back-icon">‹</view>
      </view>

      <!-- 标题区域 -->
      <view class="header-content">
        <text class="main-title"></text>
        <text class="subtitle"></text>
      </view>
    </view>

    <!-- 三个标签导航 -->
    <view class="tab-nav">
      <view
        v-for="(tab, index) in tabs"
        :key="tab.id"
        class="tab-item"
        :class="{ active: activeTab === tab.id }"
        @click="switchTab(tab.id)"
      >
        <image
          class="tab-logo"
          :src="tab.logo"
          mode="aspectFit"
        />
        <text class="tab-label">{{ tab.label }}</text>
        <view v-if="activeTab === tab.id" class="tab-indicator" />
      </view>
    </view>

    <!-- 经典复刻区块 -->
    <view class="classic-section" @click="goToDesign">
     <image
            class="classic-bg"
            src="/static/cloth_index1.jpg"
            mode="aspectFill"
         />

      <text class="classic-title">经典复刻</text>

      <view class="classic-overlay">
          <view class="classic-content">
            <text class="classic-desc">宋朝服饰风尚</text>
            <text class="design-title">服饰设计</text>
              <view class="start-btn">
                <text class="btn-text">开始设计</text>
                <text class="arrow">›</text>
              </view>
          </view>
      </view>
    </view>

    <!-- 鉴赏推荐区块 -->
    <view class="recommend-section">
      <image
        class="recommend-bg"
        src="/static/cloth_index2.png"
        mode="aspectFill"
      />
      <view class="section-header">
        <text class="section-title">鉴赏推荐</text>
        <view class="view-all" @click="goToAllRecommend">
          <text class="view-all-text">全部</text>
          <text class="arrow">›</text>
        </view>
      </view>

      <!-- 横向滚动列表 -->
      <scroll-view
        class="recommend-scroll"
        scroll-x
        show-scrollbar="false"
      >
        <view
          v-for="(item, index) in recommendList"
          :key="index"
          class="recommend-item"
          @click="goToRecommendDetail(item.id)"
        >
          <image
            class="recommend-img"
            :src="item.image"
            mode="aspectFill"
          />
          <view class="recommend-info">
            <text class="recommend-name">{{ item.name }}</text>
            <text class="recommend-dynasty">{{ item.dynasty }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'apparel', // 当前选中的标签
      tabs: [
        {
          id: 'apparel',
          label: '服饰图鉴',
          logo: '/static/cloth_logo1.jpg',
          path: '/pages/clothes/apparel/index'
        },
        {
          id: 'history',
          label: '服饰历史',
          logo: '/static/cloth_logo2.jpg',
          path: '/pages/clothes/history/index'
        },
        {
          id: 'course',
          label: '课程讲解',
          logo: '/static/cloth_logo3.jpg',
          path: '/pages/clothes/course/index'
        }
      ],
      recommendList: [
        {
          id: 1,
          name: '褙子',
          dynasty: '宋代女装',
          image: '/static/cloth_index3.jpg'
        },
        {
          id: 2,
          name: '圆领袍',
          dynasty: '宋代官服',
          image: '/static/cloth_index2.jpg'
        },
        {
          id: 3,
          name: '百褶裙',
          dynasty: '宋代民间',
          image: '/static/apparel2.png'
        },
        {
          id: 4,
          name: '对襟衫',
          dynasty: '宋代常服',
          image: '/static/apparel5.jpg'
        },
        {
          id: 5,
          name: '披帛',
          dynasty: '宋代配饰',
          image: '/static/pibo.png'
        }
      ],
    }
  },
  onLoad() {
    // 页面加载时的初始化
  },
  methods: {
    // 返回上一页
    goBack() {
      uni.redirectTo({
        url: '/pages/main_index/main_index'
      })
    },

    // 切换顶部标签
    switchTab(tabId) {
      const tab = this.tabs.find(t => t.id === tabId)
      if (tab && tab.path) {
        // 无论当前是否已选中，都执行跳转
        this.activeTab = tabId
        uni.navigateTo({
          url: tab.path,
          fail: (err) => {
            console.error('跳转失败:', err)
            // 如果跳转失败，尝试使用 redirectTo
            uni.redirectTo({
              url: tab.path
            })
          }
        })
      }
    },

    // 前往服饰设计页面
    goToDesign() {
      uni.navigateTo({
        url: '/pages/clothes/design/design'
      })
    },

    // 前往所有推荐
    goToAllRecommend() {
      uni.navigateTo({
        url: '/pages/clothes/recommend/all'
      })
    },

    // 前往推荐详情
    goToRecommendDetail(id) {
      uni.navigateTo({
        url: `/pages/clothes/recommend/detail?id=${id}`
      })
    },
  }
}
</script>

<style scoped>
.clothing-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

/* 状态栏 */
.status-bar {
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  position: relative;
  z-index: 10;
}

.time {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  letter-spacing: 1rpx;
}

/* 顶部背景区域 */
.header-section {
  position: relative;
  height: 500rpx !important;
  overflow: hidden;
}

.header-bg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.header-overlay {
  position: absolute;
  inset: 0;
}

/* 返回按钮 */
.back-btn {
  position: fixed;
  top: 90rpx;
  left: 30rpx;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  z-index: 20;
}

.back-icon {
  font-size: 50rpx;
  color: #333;
  font-weight: 300;
  margin-top: -6rpx;
  margin-left: -6rpx;
}

/* 标题内容 */
.header-content {
  position: absolute;
  top: 120rpx;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 15;
  width: 100%;
}

.main-title {
  display: block;
  font-size: 64rpx;
  font-weight: 700;
  color: #3b352b;
  letter-spacing: 8rpx;
  margin-bottom: 12rpx;
  text-shadow: 0 2rpx 4rpx rgba(255, 255, 255, 0.8);
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: #7a756e;
  letter-spacing: 6rpx;
}

/* 标签导航 */
.tab-nav {
  display: flex;
  justify-content: space-around;
  padding: 40rpx 30rpx 20rpx;
  background-color: #f6f2e9;
  margin-top: -24rpx;
  position: relative;
  z-index: 5;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
  position: relative;
  transition: all 0.3s ease;
}

.tab-item.active {
  transform: translateY(-10rpx);
}

.tab-logo {
  width: 160rpx;
  height: 160rpx;
  margin-bottom: 16rpx;
  border-radius: 50%;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
  object-fit: cover;
  overflow: hidden;
}

.tab-item.active .tab-logo {
  box-shadow: 0 12rpx 30rpx rgba(158, 169, 127, 0.3);
}

.tab-label {
  font-size: 24rpx;
  color: #999;
  font-weight: 500;
  letter-spacing: 2rpx;
}

.tab-item.active .tab-label {
  color: #9ea97f;
  font-weight: 600;
}

.tab-indicator {
  position: absolute;
  bottom: -6rpx;
  width: 30rpx;
  height: 4rpx;
  background-color: #9ea97f;
  border-radius: 2rpx;
}

/* 经典复刻区块 */
.classic-section {
  position: relative;
  margin: 30rpx;
  margin-top:30rpx;
  margin-bottom:150rpx;
  height: 360rpx;
  border-radius: 50rpx;
}

.classic-overlay {
  margin-top:100rpx;
  position: absolute;
  inset: 0;
  height:360rpx;
  border-radius: 50rpx;
}

.classic-bg {
  padding-top:100rpx;
  border-radius:50rpx;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  z-index: 3;
}

.classic-content {
  position: absolute;
  top: 100rpx;
  left: 0;
  right: 0;
  bottom: 20;
  padding: 0rpx 40rpx 50rpx 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.classic-title {
  font-size: 55rpx;
  font-weight: 700;
  color: #3b352b;
  text-shadow: none;
  letter-spacing: 6rpx;
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  z-index: 3;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
}

.classic-desc {
  font-size: 30rpx;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
  letter-spacing: 4rpx;
}

.design-title {
  display: block;
  font-size: 45rpx;
  color: white;
  font-weight: 600;
  margin-bottom: 20rpx;
  margin-left:13rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', 'Times New Roman', serif;
}

.start-btn {
  height:30rpx;
  width:150rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18rpx 24rpx;
  background-color: #9ea97f;
  border-radius: 40rpx;
  transition: all 0.3s ease;
  margin-left:200rpx;
  opacity: 0.7;
}

.start-btn:active {
  background-color: #8b976e;
  transform: scale(0.98);
}

.btn-text {
  font-size: 28rpx;
  color: #ffffff;
  font-weight: 500;
}

.arrow {
  height:10rpx;
  margin-top:-65rpx;
  font-size: 44rpx;
  color: #ffffff;
  font-weight: 300;
}

/* 鉴赏推荐区块 */
.recommend-section {
  position: relative;
  margin: 0rpx 30rpx 30rpx;
  border-radius: 28rpx;
  overflow: hidden;
  min-height: 600rpx;
}

.recommend-bg {
    padding-top:100rpx;
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
    z-index: -1;
    top:-20rpx;
}

.section-header {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx 30rpx 40rpx;
}

.section-title {
  margin-left:-18rpx;
  font-size: 55rpx;
  font-weight: 700;
  color: #3b352b;
  letter-spacing: 4rpx;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
}

.view-all {
  display: flex;
  align-items: center;
  padding: 12rpx 24rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.view-all:active {
  background-color: rgba(255, 255, 255, 0.8);
}

.view-all-text {
  font-size: 26rpx;
  color: #9ea97f;
  font-weight: 500;
  margin-right: 8rpx;
}

.recommend-scroll {
  position: relative;
  z-index: 2;
  white-space: nowrap;
  padding: 0 40rpx 40rpx 0rpx;
}

.recommend-item {
  display: inline-block;
  height:600rpx;
  width: 400rpx;
  margin-right: 24rpx;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  vertical-align: top;
  position: relative;
}

.recommend-item:last-child {
  margin-right: 0;
}

.recommend-img {
  width: 100%;
  height:600rpx;
  display: block;
}

.recommend-info {
  padding: 20rpx;
  position: absolute;
  bottom: 60rpx;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.85);
    border-radius: 12rpx;
    z-index: 1;
}

.recommend-name {
  display: block;
  font-size: 28rpx;
  color: #3b352b;
  font-weight: 600;
  margin-bottom: 8rpx;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.recommend-dynasty {
  display: block;
  font-size: 22rpx;
  color: #9ea97f;
}

/* 触摸效果 */
.tab-item,
.back-btn,
.view-all,
.start-btn,
.recommend-item {
  transition: all 0.2s ease;
}

.tab-item:active,
.back-btn:active,
.view-all:active,
.start-btn:active,
.recommend-item:active {
  opacity: 0.8;
  transform: scale(0.98);
}

/* 响应式调整 */
@media screen and (max-width: 750px) {
  .header-section {
    height: 280rpx;
  }

  .classic-section {
    height: 320rpx;
  }

  .recommend-item {
    width: 300rpx;
  }
}
</style>