<template>
  <view class="page">
    <!-- 用户资料头部 -->
    <view class="profile-header">
      <view class="edit-btn" :class="{ 'animate-in': pageReady }" @click="editProfile">编辑资料</view>
      <image class="profile-avatar" :class="{ 'animate-in': pageReady }" src="/static/avatar.png" mode="aspectFill" />
      <text class="profile-name" :class="{ 'animate-in': pageReady }">烟雨朦胧</text>
    </view>

    <!-- 功能区域 -->
    <view class="content-box">
      <!-- 快捷功能 -->
      <view class="quick-actions" :class="{ 'animate-in': pageReady }">
        <view class="action-item" @click="goToOrders">
          <view class="action-icon orders">📋</view>
          <text class="action-text">我的订单</text>
        </view>
        <view class="action-item" @click="goToCreations">
          <view class="action-icon creations">✏️</view>
          <text class="action-text">我的创作</text>
        </view>
        <view class="action-item" @click="goToCollections">
          <view class="action-icon collections">⭐</view>
          <text class="action-text">我的收藏</text>
        </view>
      </view>

      <!-- 列表功能 -->
      <view class="menu-list" :class="{ 'animate-in': pageReady }">
        <view class="menu-item" @click="goToPosts">
          <view class="menu-icon posts">✈️</view>
          <text class="menu-text">我的发布</text>
          <text class="menu-arrow">→</text>
        </view>
        <view class="menu-item" @click="goToFollowing">
          <view class="menu-icon following">👥</view>
          <text class="menu-text">我的关注</text>
          <text class="menu-arrow">→</text>
        </view>
        <view class="menu-item" @click="goToMessages">
          <view class="menu-icon messages">✉️</view>
          <text class="menu-text">消息通知</text>
          <text class="menu-arrow">→</text>
        </view>
        <view class="menu-item" @click="goToFeedback">
          <view class="menu-icon feedback">✓</view>
          <text class="menu-text">意见反馈</text>
          <text class="menu-arrow">→</text>
        </view>
        <view class="menu-item" @click="goToSettings">
          <view class="menu-icon settings">⚙️</view>
          <text class="menu-text">设置</text>
          <text class="menu-arrow">→</text>
        </view>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <view class="tabbar">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: tab.key === activeNav }"
        @click="switchNav(tab.key)"
      >
        <view class="tab-icon" :class="'icon-' + tab.key" />
        <text class="tab-text">{{ tab.label }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activeNav: 'me',
      pageReady: false,
      tabs: [
        { key: 'home', label: '首页', path: '/pages/main_index/main_index' },
        { key: 'discover', label: '发现', path: '/pages/discover/discover' },
        { key: 'market', label: '集市', path: '/pages/market/market' },
        { key: 'me', label: '我的', path: '/pages/me/me' },
      ],
    }
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true
    }, 50)
  },
  methods: {
    switchNav(key) {
      if (this.activeNav === key) return
      this.activeNav = key
      const tab = this.tabs.find((t) => t.key === key)
      if (tab && tab.path && tab.path !== '/pages/me/me') {
        uni.redirectTo({
          url: tab.path,
        })
      }
    },
    editProfile() {
      uni.showToast({ title: '编辑资料', icon: 'none' })
    },
    goToOrders() {
      uni.showToast({ title: '我的订单', icon: 'none' })
    },
    goToCreations() {
      uni.showToast({ title: '我的创作', icon: 'none' })
    },
    goToCollections() {
      uni.showToast({ title: '我的收藏', icon: 'none' })
    },
    goToPosts() {
      uni.showToast({ title: '我的发布', icon: 'none' })
    },
    goToFollowing() {
      uni.showToast({ title: '我的关注', icon: 'none' })
    },
    goToMessages() {
      uni.showToast({ title: '消息通知', icon: 'none' })
    },
    goToFeedback() {
      uni.showToast({ title: '意见反馈', icon: 'none' })
    },
    goToSettings() {
      uni.showToast({ title: '设置', icon: 'none' })
    },
  },
}
</script>

<style scoped>
.page {
  background-color: #f5f0e8;
  min-height: 100vh;
  padding-bottom: 150rpx;
  box-sizing: border-box;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

/* 用户资料头部 */
.profile-header {
  background: linear-gradient(180deg, #9ea97f 0%, #8a9570 100%);
  padding: 60rpx 30rpx 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.profile-avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  background-color: #fff;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  margin-bottom: 24rpx;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.profile-avatar.animate-in {
  opacity: 1;
  transform: scale(1);
}

.profile-name {
  font-size: 36rpx;
  color: #333;
  font-weight: 500;
  margin-bottom: 30rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.profile-name.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.edit-btn {
  position: absolute;
  top: 60rpx;
  left: 30rpx;
  padding: 12rpx 32rpx;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 30rpx;
  font-size: 26rpx;
  color: #fff;
  opacity: 0;
  transform: translateY(-20rpx);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.edit-btn.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* 内容区域 */
.content-box {
  background-color: #fbf8f2;
  border-radius: 30rpx 30rpx 0 0;
  margin-top: -30rpx;
  padding: 40rpx 30rpx;
  min-height: calc(100vh - 400rpx);
}

/* 快捷功能 */
.quick-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20rpx;
  margin-bottom: 40rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}

.quick-actions.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
}

.action-icon {
  width: 100rpx;
  height: 100rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  background-color: #fff;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.action-item:active .action-icon {
  transform: scale(0.95);
}

.action-text {
  font-size: 24rpx;
  color: #333;
  transition: color 0.3s ease;
}

/* H5悬停效果 */
@media (hover: hover) {
  .action-item:hover .action-icon {
    transform: translateY(-6rpx) scale(1.05);
    box-shadow: 0 8rpx 20rpx rgba(158, 169, 127, 0.3);
  }
  .action-item:hover .action-text {
    color: #9ea97f;
  }
}

/* 菜单列表 */
.menu-list {
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
}

.menu-list.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #f8f8f8;
  transform: translateX(4rpx);
}

.menu-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: 24rpx;
  transition: transform 0.3s ease;
}

.menu-item:active .menu-icon {
  transform: scale(1.1);
}

.menu-text {
  flex: 1;
  font-size: 28rpx;
  color: #333;
  transition: color 0.2s ease;
}

.menu-item:active .menu-text {
  color: #9ea97f;
}

.menu-arrow {
  font-size: 28rpx;
  color: #ccc;
  transition: transform 0.2s ease, color 0.2s ease;
}

.menu-item:active .menu-arrow {
  transform: translateX(4rpx);
  color: #9ea97f;
}

/* H5悬停效果 */
@media (hover: hover) {
  .menu-item:hover {
    background-color: #f8f8f8;
  }
  .menu-item:hover .menu-icon {
    transform: scale(1.1);
  }
  .menu-item:hover .menu-text {
    color: #9ea97f;
  }
  .menu-item:hover .menu-arrow {
    transform: translateX(4rpx);
    color: #9ea97f;
  }
}


/* 底部导航栏 */
.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 140rpx;
  background-color: #fbf8f2;
  border-top: 1rpx solid rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.06);
  z-index: 1000;
}

.tab-item {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #b0b0b0;
  font-size: 22rpx;
  letter-spacing: 2rpx;
}

.tab-item.active {
  color: #9ea97f;
}

.tab-icon {
  width: 54rpx;
  height: 54rpx;
  margin-bottom: 8rpx;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.85;
}

.tab-item.active .tab-icon {
  opacity: 1;
}

.icon-home {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 28 L32 10 L54 28' stroke='%239ea97f' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3Crect x='18' y='27' width='28' height='24' rx='2' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M28 51V37H36V51' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}

.icon-discover {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 16 L40 28 L52 32 L40 36 L32 48 L24 36 L12 32 L24 28 Z' stroke='%239ea97f' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
}

.icon-market {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='14' y='16' width='36' height='30' rx='4' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M14 24H50' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M22 16V12H42V16' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3Cpath d='M24 30H40' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}

.icon-me {
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='32' cy='22' r='10' stroke='%239ea97f' stroke-width='4' fill='none'/%3E%3Cpath d='M16 50C18 42 24 38 32 38C40 38 46 42 48 50' stroke='%239ea97f' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
}
</style>

