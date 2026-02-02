<template>
  <view class="apparel-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">服饰图鉴</text>
      <view class="right-actions"></view>
    </view>

    <!-- 筛选标签 -->
    <view class="filter-section">
      <scroll-view class="filter-scroll" scroll-x>
        <view class="filter-container">
          <view
            v-for="(filter, index) in filters"
            :key="index"
            class="filter-tag"
            :class="{ active: activeFilter === filter.id }"
            @click="switchFilter(filter.id)"
          >
            <text class="filter-text">{{ filter.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 瀑布流服饰列表 -->
    <scroll-view class="waterfall-list" scroll-y>
      <!-- 空状态提示 -->
      <view v-if="filteredLeftItems.length === 0 && filteredRightItems.length === 0" class="empty-state">
        <text class="empty-text">暂无{{ getFilterName() }}相关服饰</text>
      </view>
      
      <view v-else class="waterfall-container">
        <!-- 左列 -->
        <view class="waterfall-column left-column">
          <view
            v-for="(item, index) in filteredLeftItems"
            :key="`left-${item.id}-${activeFilter}`"
            class="apparel-item"
            :class="{ 'item-enter': true }"
            :style="{ 
              height: fixedItemHeight + 'rpx',
              animationDelay: (index * 0.1) + 's'
            }"
            @click="goToApparelDetail(item.id)"
          >
            <view class="apparel-image-wrapper">
              <image class="apparel-img" :src="item.image" mode="aspectFill"></image>
            </view>
            <view class="apparel-info">
              <text class="apparel-name">{{ item.name }}</text>
              <text class="apparel-dynasty">{{ item.dynasty }}</text>
            </view>
          </view>
        </view>

        <!-- 右列 -->
        <view class="waterfall-column right-column">
          <view
            v-for="(item, index) in filteredRightItems"
            :key="`right-${item.id}-${activeFilter}`"
            class="apparel-item"
            :class="{ 'item-enter': true }"
            :style="{ 
              height: fixedItemHeight + 'rpx',
              animationDelay: ((filteredLeftItems.length + index) * 0.1) + 's'
            }"
            @click="goToApparelDetail(item.id)"
          >
            <view class="apparel-image-wrapper">
              <image class="apparel-img" :src="item.image" mode="aspectFill"></image>
            </view>
            <view class="apparel-info">
              <text class="apparel-name">{{ item.name }}</text>
              <text class="apparel-dynasty">{{ item.dynasty }}</text>
            </view>
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
      activeFilter: 'all',
      filters: [
        { id: 'all', name: '全部' },
        { id: 'female', name: '女装' },
        { id: 'male', name: '男装' },
        { id: 'official', name: '官服' },
        { id: 'folk', name: '民间' },
        { id: 'accessory', name: '配饰' }
      ],
      // 左列项目数据
      leftColumnItems: [
        {
          id: 1,
          name: '褙子',
          dynasty: '宋代女装',
          image: '/static/apparel1.png',
          height: 450,
          marginTop: 0,
          category: 'female'
        },
        {
          id: 3,
          name: '宋制抹胸',
          dynasty: '宋代女装',
          image: '/static/apparel3.png',
          height: 500,
          marginTop: 20,
          category: 'female'
        },
        {
          id: 5,
          name: '对襟短袄',
          dynasty: '宋代常服',
          image: '/static/apparel5.jpg',
          height: 420,
          marginTop: 20,
          category: 'folk'
        }
      ],
      // 右列项目数据
      rightColumnItems: [
        {
          id: 2,
          name: '圆领长袍',
          dynasty: '宋代官服',
          image: '/static/apparel2.png',
          height: 480,
          marginTop: 0,
          category: 'official'
        },
        {
          id: 4,
          name: '宋制褴衫',
          dynasty: '宋代男装',
          image: '/static/apparel4.jpg',
          height: 400,
          marginTop: 20,
          category: 'male'
        },
        {
          id: 6,
          name: '直裰',
          dynasty: '宋代男装',
          image: '/static/apparel6.jpg',
          height: 460,
          marginTop: 20,
          category: 'male'
        }
      ]
    }
  },
  computed: {
    // 获取所有筛选后的项目
    allFilteredItems() {
      const allItems = [...this.leftColumnItems, ...this.rightColumnItems]
      if (this.activeFilter === 'all') {
        return allItems
      }
      return allItems.filter(item => item.category === this.activeFilter)
    },
    // 重新分配到左列（奇数索引）
    filteredLeftItems() {
      return this.allFilteredItems.filter((item, index) => index % 2 === 0)
    },
    // 重新分配到右列（偶数索引）
    filteredRightItems() {
      return this.allFilteredItems.filter((item, index) => index % 2 === 1)
    },
    // 固定卡片高度，确保大小一致
    fixedItemHeight() {
      return 500 // 统一高度为500rpx
    }
  },
  methods: {
    goBack() {
      uni.navigateBack({
        fail: () => {
          // 如果无法返回，则跳转到服饰首页
          uni.redirectTo({
            url: '/pages/clothes/index1'
          })
        }
      })
    },
    switchFilter(filterId) {
      if (this.activeFilter === filterId) {
        return // 如果点击的是当前已选中的分类，不执行操作
      }
      this.activeFilter = filterId
      // 滚动到顶部，让用户看到筛选结果
      this.$nextTick(() => {
        // 可以添加滚动到顶部的逻辑
      })
    },
    getFilterName() {
      const filter = this.filters.find(f => f.id === this.activeFilter)
      return filter ? filter.name : ''
    },
    goToApparelDetail(id) {
      uni.navigateTo({
        url: `/pages/clothes/apparel/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.apparel-page {
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

.filter-section {
  padding: 20rpx 0;
  background-color: #f6f2e9;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.filter-scroll {
  white-space: nowrap;
}

.filter-container {
  display: inline-flex;
  padding: 0 30rpx;
  gap: 20rpx;
}

.filter-tag {
  padding: 12rpx 28rpx;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 30rpx;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.filter-tag.active {
  background-color: #9ea97f;
}

.filter-text {
  font-size: 26rpx;
  color: #5a5a5a;
  font-weight: 500;
}

.filter-tag.active .filter-text {
  color: #ffffff;
  font-weight: 600;
}

.waterfall-list {
  height: calc(100vh - 240rpx);
}

.waterfall-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20rpx 15rpx;
}

.waterfall-column {
  width: 345rpx;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.left-column {
  padding-right: 5rpx;
}

.right-column {
  padding-left: 5rpx;
}

.apparel-item {
  width: 100%;
  background-color: #ffffff;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  position: relative;
  opacity: 0;
  transform: translateX(-50rpx);
  animation: slideInFromLeft 0.5s ease-out forwards;
  flex-shrink: 0;
  display: block;
}

.apparel-image-wrapper {
  width: 100%;
  height: calc(100% - 140rpx);
  position: relative;
  overflow: hidden;
}

.apparel-item.item-enter {
  animation: slideInFromLeft 0.5s ease-out forwards;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-50rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.apparel-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  vertical-align: top;
}

.apparel-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 30rpx 25rpx 20rpx;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 10;
  margin: 0;
  box-sizing: border-box;
  border-radius: 0 0 20rpx 20rpx;
  min-height: 140rpx;
}

.apparel-name {
  font-size: 34rpx;
  color: #3b352b;
  font-weight: 600;
  margin-bottom: 8rpx;
  letter-spacing: 1rpx;
  text-shadow: 0 1rpx 2rpx rgba(255, 255, 255, 0.8);
  line-height: 1.2;
  white-space: normal;
  word-break: break-all;
  display: block;
}

.apparel-dynasty {
  font-size: 24rpx;
  color: #5a4a42;
  text-shadow: 0 1rpx 2rpx rgba(255, 255, 255, 0.6);
}

.back-btn:active,
.filter-tag:active,
.apparel-item:active {
  opacity: 0.8;
  transform: scale(0.98);
}

/* 空状态样式 */
.empty-state {
  width: 100%;
  padding: 200rpx 30rpx;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
  letter-spacing: 2rpx;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}
</style>

