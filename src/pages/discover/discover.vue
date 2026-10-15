<template>
  <view class="page">
    <!-- 顶部标题和搜索 -->
    <view class="top-bar" :class="{ 'animate-in': pageReady }">
      <text class="page-title">发现</text>
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          confirm-type="search"
          placeholder="输入关键词"
          placeholder-class="search-placeholder"
        />
      </view>
      <view class="add-btn">+</view>
    </view>

    <!-- 轮播图 -->
    <view class="carousel-section" :class="{ 'animate-in': pageReady }">
      <swiper
        class="carousel-swiper"
        :current="currentIndex"
        :autoplay="true"
        :interval="5000"
        :circular="true"
        :duration="500"
        @change="onSwiperChange"
      >
        <swiper-item v-for="(item, index) in carouselList" :key="index">
          <view class="carousel-card" @click="onCarouselClick(index, item)">
            <image class="carousel-image" :src="item.image" mode="aspectFill" />
            <text class="carousel-title" v-if="item.title">{{ item.title }}</text>
          </view>
        </swiper-item>
      </swiper>
      <view class="carousel-dots">
        <view
          v-for="(item, index) in carouselList"
          :key="index"
          class="dot"
          :class="{ active: index === currentIndex }"
        />
      </view>
    </view>

    <!-- 话题广场 -->
    <view class="section">
      <view class="section-header" :class="{ 'animate-in': pageReady }">
        <text class="section-title">话题广场</text>
        <text class="section-arrow">→</text>
      </view>
      <view class="topic-layout" :class="{ 'animate-in': pageReady }">
        <!-- 左侧大卡片 -->
        <view class="topic-card topic-card-large" @click="goTopic('life')">
          <image class="topic-image" src="https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/live_in_song.png" mode="aspectFill" />
          <view class="topic-mask" />
          <view class="topic-content">
            <text class="topic-tag">#生活在宋朝</text>
            <view class="topic-arrow-round">→</view>
          </view>
        </view>

        <!-- 右侧上下两个小卡片 -->
          <view class="topic-right-column">
          <view class="topic-card topic-card-small" @click="goTopic('clothing')">
            <image class="topic-image" src="https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/song_cloth.png" mode="aspectFill" />
            <view class="topic-mask" />
            <view class="topic-content">
              <text class="topic-tag">#宋韵服饰大赏</text>
              <view class="topic-arrow-round">→</view>
            </view>
          </view>
          <view class="topic-card topic-card-small" @click="goTopic('food')">
            <image class="topic-image" src="https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/song_food.png" mode="aspectFill" />
            <view class="topic-mask" />
            <view class="topic-content">
              <text class="topic-tag">#宋朝美食盛宴</text>
              <view class="topic-arrow-round">→</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 热门/关注标签 -->
    <view class="tabs-section" :class="{ 'animate-in': pageReady }">
      <view class="tab-item" :class="{ active: activeTab === 'hot' }" @click="switchTab('hot')">
        热门
      </view>
      <view class="tab-item" :class="{ active: activeTab === 'follow' }" @click="switchTab('follow')">
        关注
      </view>
    </view>

    <!-- 内容流 -->
    <view class="feed-section" :class="{ 'animate-in': pageReady }">
      <!-- 热门列表 -->
      <view v-if="activeTab === 'hot'">
        <view
          class="feed-item"
          v-for="item in feedList"
          :key="item.id"
        >
          <image class="feed-avatar" :src="item.avatar" mode="aspectFill" />
          <view class="feed-content">
            <view class="feed-header">
              <view class="feed-user-info">
                <text class="feed-username">{{ item.username }}</text>
                <text class="feed-time">{{ item.time }}</text>
              </view>
              <view
                class="follow-btn"
                :class="{ followed: item.followed }"
                @click.stop="toggleFollow(item)"
              >
                {{ item.followed ? '已关注' : '+ 关注' }}
              </view>
            </view>
            <text class="feed-text">{{ item.text }}</text>
            <view class="feed-images" v-if="item.images && item.images.length">
              <view
                class="feed-image-wrapper"
                v-for="(img, imgIndex) in item.images"
                :key="imgIndex"
              >
                <image class="feed-image" :src="img" mode="aspectFit" />
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 关注列表 -->
      <view v-else>
        <view v-if="followedFeeds.length">
          <view
            class="feed-item"
            v-for="item in followedFeeds"
            :key="item.id"
          >
            <image class="feed-avatar" :src="item.avatar" mode="aspectFill" />
            <view class="feed-content">
              <view class="feed-header">
                <view class="feed-user-info">
                  <text class="feed-username">{{ item.username }}</text>
                  <text class="feed-time">{{ item.time }}</text>
                </view>
                <view class="follow-btn followed">
                  已关注
                </view>
              </view>
              <text class="feed-text">{{ item.text }}</text>
              <view class="feed-images" v-if="item.images && item.images.length">
                <view
                  class="feed-image-wrapper"
                  v-for="(img, imgIndex) in item.images"
                  :key="imgIndex"
                >
                  <image class="feed-image" :src="img" mode="aspectFit" />
                </view>
              </view>
            </view>
          </view>
        </view>
        <view v-else class="empty-follow">
          <text class="empty-follow-title">还没有关注任何人</text>
          <text class="empty-follow-desc">去「热门」看看大家在聊什么吧～</text>
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
      activeTab: 'hot',
      activeNav: 'discover',
      pageReady: false,
      currentIndex: 0,
      carouselList: [
        { image: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_2.png', title: '' },
        { image: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/cloth_3.png', title: '' },
        { image: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/discover_bg.png', title: '宋代衣食住行' },
      ],
      tabs: [
        { key: 'home', label: '首页', path: '/pages/main_index/main_index' },
        { key: 'discover', label: '发现', path: '/pages/discover/discover' },
        { key: 'market', label: '集市', path: '/pages/market/market' },
        { key: 'me', label: '我的', path: '/pages/me/me' },
      ],
      // 内容流数据
      feedList: [
        {
          id: 'user_shanhe',
          username: '山河入梦',
          time: '一天前',
          text: '好喜欢这个配色',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/1.png',
          images: ['https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu3.png', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu4.png'],
          followed: false,
        },
        {
          id: 'user_qinghe',
          username: '清河小筑',
          time: '2 天前',
          text: '晨起焚一柱香，看竹影晃动，仿佛回到京都巷陌。',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang2.png',
          images: ['https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/song_study.png'],
          followed: false,
        },
        {
          id: 'user_zhumo',
          username: '竹墨留香',
          time: '3 天前',
          text: '新绣了一件团花纹褙子，淡青配牙白，走在廊下风一吹就像画里人。',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang3.png',
          images: ['https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu3.png', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/hanfu4.png'],
          followed: false,
        },
        {
          id: 'user_meishi',
          username: '一碗清欢',
          time: '5 天前',
          text: '用《山家清供》里的方子做了碗蟹酿橙，酸甜里带着桂花香。',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang4.png',
          images: ['https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/food_guihuagao.png', 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/food_xieliangcheng.png'],
          followed: false,
        },
        {
          id: 'user_shufa',
          username: '墨池边',
          time: '一周前',
          text: '练完小楷，把案几上的宣纸铺开，才发现窗外的月色也写进了字里行间。',
          avatar: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/touxiang/touxiang5.png',
          images: ['https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/guanzhu/song_study.png'],
          followed: false,
        },
      ],
    }
  },
  onLoad() {
    // 先恢复关注状态，再渲染列表，可避免页面初次展示时“关注按钮闪动”。
    this.initFollowState()
  },
  onReady() {
    setTimeout(() => {
      this.pageReady = true
    }, 50)
  },
  computed: {
    // 关注列表：从所有内容里筛选已关注的用户
    followedFeeds() {
      return this.feedList.filter((item) => item.followed)
    },
  },
  methods: {
    onSwiperChange(e) {
      this.currentIndex = e.detail.current
    },
    onCarouselClick(index, item) {
      // 当轮播图为“宋代衣食住行”主题时，进入总览话题页
      if (item && item.title === '宋代衣食住行') {
        this.goTopic('overview')
      }
    },
    switchTab(tab) {
      this.activeTab = tab
    },
    switchNav(key) {
      if (this.activeNav === key) return
      this.activeNav = key
      const tab = this.tabs.find((t) => t.key === key)
      // 发现页是当前页，避免重定向到自己导致滚动位置被重置。
      if (tab && tab.path && tab.path !== '/pages/discover/discover') {
        uni.redirectTo({
          url: tab.path,
        })
      }
    },
    goTopic(key) {
      const map = {
        life: '/pages/discover/topic_life',
        clothing: '/pages/discover/topic_clothing',
        food: '/pages/discover/topic_food',
        overview: '/pages/discover/topic_overview',
      }
      const url = map[key]
      if (!url) return
      uni.navigateTo({ url })
    },
    initFollowState() {
      try {
        // 只缓存 id 列表，避免把完整 feed 对象落盘造成结构耦合。
        const stored = uni.getStorageSync('discover_follow_ids')
        if (Array.isArray(stored) && stored.length) {
          this.feedList = this.feedList.map((item) => ({
            ...item,
            followed: stored.includes(item.id),
          }))
        }
      } catch (e) {
        // 读取失败时忽略，使用默认状态
      }
    },
    toggleFollow(item) {
      const index = this.feedList.findIndex((feed) => feed.id === item.id)
      if (index === -1) return

      const target = this.feedList[index]
      const newFollowed = !target.followed

      // 使用 $set 兼容小程序端响应式更新，确保按钮文案和“关注”分组同步刷新。
      this.$set(this.feedList, index, {
        ...target,
        followed: newFollowed,
      })

      const followedIds = this.feedList.filter((f) => f.followed).map((f) => f.id)
      try {
        uni.setStorageSync('discover_follow_ids', followedIds)
      } catch (e) {
        // 存储失败时忽略
      }

      uni.showToast({
        title: newFollowed ? '已关注' : '已取消关注',
        icon: 'success',
        duration: 1500,
      })
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

/* 顶部栏 */
.top-bar {
  padding: 20rpx 30rpx;
  padding-top: 60rpx;
  display: flex;
  align-items: center;
  gap: 20rpx;
  opacity: 0;
  transform: translateY(-20rpx);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.top-bar.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.page-title {
  font-size: 36rpx;
  color: #333;
  font-weight: 600;
  min-width: 80rpx;
}

.search-bar {
  flex: 1;
  height: 70rpx;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.search-icon {
  font-size: 28rpx;
  color: #b6b6b6;
  margin-right: 16rpx;
}

.search-input {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.search-placeholder {
  color: #b6b6b6;
}

.add-btn {
  width: 60rpx;
  height: 60rpx;
  background-color: #9ea97f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 36rpx;
  font-weight: 300;
}

/* 轮播图 */
.carousel-section {
  padding: 30rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
  position: relative;
}

.carousel-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.carousel-swiper {
  width: 100%;
  height: 300rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.carousel-swiper swiper-item {
  height: 300rpx;
}

.carousel-card {
  position: relative;
  width: 100%;
  height: 300rpx;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.carousel-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.carousel-title {
  position: absolute;
  bottom: 20rpx;
  left: 20rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: 600;
  z-index: 2;
}

.carousel-dots {
  position: absolute;
  bottom: 40rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12rpx;
  z-index: 3;
}

.dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background-color: #d3d3d3;
}

.dot.active {
  background-color: #666;
}

/* 话题广场 */
.section {
  padding: 0 30rpx 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.section-header.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 600;
}

.section-arrow {
  font-size: 28rpx;
  color: #999;
}

.topic-layout {
  flex-direction: row;
  display: flex;
  gap: 16rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}

.topic-layout.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.topic-card {
  position: relative;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  background-color: #e8e8e8;
  will-change: opacity;
}

/* H5悬停效果 */
@media (hover: hover) {
  .topic-card {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
  }
  .topic-card:hover {
    transform: scale(1.03) translateY(-4rpx) translateZ(0);
    box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.2);
  }
  .topic-card:hover .topic-image {
    transform: scale(1.1);
  }
  .topic-card:hover .topic-mask {
    background: linear-gradient(120deg, rgba(158, 169, 127, 0.6), rgba(158, 169, 127, 0.3));
  }
  .topic-card:hover .topic-arrow-round {
    background-color: #9ea97f;
    color: #fff;
    transform: translateX(4rpx);
  }
  .topic-image {
    transition: transform 0.5s ease;
  }
  .topic-mask {
    transition: background 0.35s ease;
  }
  .topic-arrow-round {
    transition: all 0.3s ease;
  }
}

.topic-card-large {
  flex: 1.1;
  height: 320rpx;
}

.topic-right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.topic-card-small {
  height: 152rpx;
}

.topic-image {
  width: 100%;
  height: 100%;
}

.topic-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.15));
}

.topic-content {
  position: absolute;
  left: 24rpx;
  right: 24rpx;
  bottom: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.topic-tag {
  font-size: 26rpx;
  color: #ffffff;
  transition: text-shadow 0.3s ease;
}

.topic-card:hover .topic-tag {
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
}

.topic-arrow-round {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 26rpx;
}

/* 标签页 */
.tabs-section {
  display: flex;
  padding: 0 30rpx;
  gap: 40rpx;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
}

.tabs-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.tab-item {
  padding: 20rpx 0;
  font-size: 28rpx;
  color: #999;
  position: relative;
}

.tab-item.active {
  color: #333;
  font-weight: 600;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rpx;
  background-color: #9ea97f;
}

/* 内容流 */
.feed-section {
  padding: 30rpx;
  opacity: 0;
  transform: translateY(30rpx);
  transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
}

.feed-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feed-item {
  display: flex;
  gap: 20rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.feed-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #e8e8e8;
  flex-shrink: 0;
}

.feed-content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.feed-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.feed-user-info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  flex: 1;
}

.feed-username {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
}

.feed-time {
  font-size: 24rpx;
  color: #999;
  line-height: 1.4;
}

.follow-btn {
  padding: 8rpx 20rpx;
  background-color: #fff;
  border: 1rpx solid #9ea97f;
  color: #9ea97f;
  border-radius: 30rpx;
  font-size: 24rpx;
  white-space: nowrap;
  flex-shrink: 0;
}

.follow-btn.followed {
  background-color: #9ea97f;
  color: #fff;
}

.feed-text {
  display: block;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  line-height: 1.6;
}

.feed-images {
  display: flex;
  gap: 12rpx;
  width: 100%;
  box-sizing: border-box;
}

.feed-image-wrapper {
  flex: 1;
  height: 200rpx;
  background-color: #e8e8e8;
  border-radius: 12rpx;
  overflow: hidden;
  box-sizing: border-box;
}

.feed-image {
  width: 100%;
  height: 100%;
  display: block;
}

.empty-follow {
  padding: 80rpx 40rpx 40rpx;
  text-align: center;
  color: #999;
}

.empty-follow-title {
  display: block;
  font-size: 30rpx;
  margin-bottom: 12rpx;
}

.empty-follow-desc {
  display: block;
  font-size: 26rpx;
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

.tabbar .tab-item {
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

.tabbar .tab-item.active {
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

.tabbar .tab-item.active .tab-icon {
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

