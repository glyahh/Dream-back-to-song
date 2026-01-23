<template>
  <view class="apparel-page">
    <!-- 状态栏占位 -->
    <view class="status-bar-placeholder"></view>

    <!-- 顶部导航栏 -->
    <view class="nav-header">
      <view class="nav-back" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">服饰图鉴</text>
      <view class="nav-placeholder"></view>
    </view>

    <view class="filter-section">
      <view class="filter-tags">
        <view
          v-for="(filter, index) in filters"
          :key="index"
          class="filter-tag"
          :class="{ active: activeFilter === filter.id }"
          @click="switchFilter(filter.id, filter.path)"
        >
          <text class="filter-text">{{ filter.name }}</text>
          <view v-if="activeFilter === filter.id" class="filter-indicator"></view>
        </view>
      </view>
    </view>

    <view class="divider"></view>

    <!-- 瀑布流服饰列表 -->
    <scroll-view class="waterfall-list" scroll-y>
      <view class="waterfall-container">
        <!-- 左列 -->
        <view class="waterfall-column left-column">
          <view
            v-for="(item, index) in leftColumnItems"
            :key="index"
            class="apparel-item"
            :style="{ height: item.height + 'rpx', marginTop: item.marginTop + 'rpx' }"
            @click="goToApparelDetail(item.id)"
          >
            <image class="apparel-img" :src="item.image" mode="aspectFill"></image>
            <view class="apparel-info">
              <text class="apparel-name">{{ item.name }}</text>
            </view>
          </view>
        </view>

        <!-- 右列 -->
        <view class="waterfall-column right-column">
          <view
            v-for="(item, index) in rightColumnItems"
            :key="index"
            class="apparel-item"
            :style="{ height: item.height + 'rpx', marginTop: item.marginTop + 'rpx' }"
            @click="goToApparelDetail(item.id)"
          >
            <image class="apparel-img" :src="item.image" mode="aspectFill"></image>
            <view class="apparel-info">
              <text class="apparel-name">{{ item.name }}</text>
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
      activeFilter: 'all', // 当前选中的筛选标签
      filters: [
        {
          id: 'all',
          name: '全部',
          path: '/pages/apparel/index'
        },
        {
          id: 'period',
          name: '时期',
          path: '/pages/apparel/period'
        },
        {
          id: 'style',
          name: '形制',
          path: '/pages/apparel/style'
        },
        {
          id: 'scene',
          name: '场景',
          path: '/pages/apparel/scene'
        }
      ],
      // 左列项目数据 - 确保图片和文字正确对应
      leftColumnItems: [
        {
          id: 1,
          name: '褙子',
          image: '/static/apparel1.png', // 确保这个图片确实是褙子的图片
          height: 450,
          marginTop: 0
        },
        {
          id: 3,
          name: '宋制抹胸',
          image: '/static/apparel3.png', // 确保这个图片确实是圆领长袍的图片
          height: 500,
          marginTop: 20
        },
        {
          id: 5,
          name: '对襟短袄',
          image: '/static/apparel5.jpg', // 确保这个图片确实是宋制抹胸的图片
          height: 420,
          marginTop: 20
        }
      ],
      // 右列项目数据 - 确保图片和文字正确对应
      rightColumnItems: [
        {
          id: 2,
          name: '圆领长袍',
          image: '/static/apparel2.png', // 确保这个图片确实是宋制褴衫的图片
          height: 480,
          marginTop: 0
        },
        {
          id: 4,
          name: '宋制褴衫',
          image: '/static/apparel4.jpg', // 确保这个图片确实是对襟短袄的图片
          height: 400,
          marginTop: 20
        },
        {
          id: 6,
          name: '直裰',
          image: '/static/apparel6.jpg', // 确保这个图片确实是直裰的图片
          height: 460,
          marginTop: 20
        }
      ]
    }
  },
  methods: {
    // 返回上一页
    goBack() {
          uni.redirectTo({
            url: '/pages/clothes/index1'
          });
        },

    // 切换筛选标签
    switchFilter(filterId, path) {
      this.activeFilter = filterId

      // 根据不同的筛选标签跳转到不同页面（或处理筛选逻辑）
      if (filterId === 'all') {
        // 如果是"全部"，在当前页面显示所有内容
        this.loadApparelData(filterId)
      } else {
        // 跳转到对应的分类页面
        uni.navigateTo({
          url: path
        })
      }
    },

    // 加载服饰数据（示例函数）
    loadApparelData(filterId) {
      // 这里可以根据筛选标签加载不同的数据
      console.log('加载筛选数据:', filterId)
      // 实际开发中这里可以调用API获取数据
    },

    // 跳转到服饰详情
    // 跳转到服饰详情
    goToApparelDetail(id) {
      if (id === 1) {
        // 褙子跳转到详情页
        uni.navigateTo({
          url: '/pages/apparel/beizi'
        });
      } else {
        // 其他服饰跳转到通用详情页
        uni.navigateTo({
          url: `/pages/apparel/detail?id=${id}`
        });
      }
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

/* 状态栏占位 */
.status-bar-placeholder {
  height: var(--status-bar-height, 88rpx);
  background-color: #f6f2e9;
}

/* 顶部导航栏 */
.nav-header {
  height:140rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #f6f2e9;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.nav-back {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  margin-top: 12rpx;
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

.nav-placeholder {
  width: 60rpx;
}

/* 筛选分类 - 修改为flex均匀分布 */
.filter-section {
  padding: 30rpx 0 20rpx;
  background-color: #f6f2e9;
}

.filter-tags {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20rpx;
}

.filter-tag {
  position: relative;
  padding: 12rpx 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter-text {
  font-size: 32rpx;
  color: #7a756e;
  font-weight: 500;
  letter-spacing: 2rpx;
  transition: all 0.3s ease;
}

.filter-tag.active .filter-text {
  color: #3b352b;
  font-weight: 600;
  transform: translateY(-2rpx);
}

.filter-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background-color: #9ea97f;
  border-radius: 2rpx;
  animation: indicatorAppear 0.3s ease;
}

@keyframes indicatorAppear {
  from {
    transform: translateX(-50%) scaleX(0);
  }
  to {
    transform: translateX(-50%) scaleX(1);
  }
}

/* 分割线 */
.divider {
  height: 1rpx;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 30rpx;
}

/* 瀑布流列表 */
.waterfall-list {
  height: calc(100vh - 280rpx);
}

.waterfall-container {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 15rpx;
}

.waterfall-column {
  width: 345rpx;
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
}

.apparel-img {
  width: 100%;
  height: 100%;
  display: block;
}

/* 修复文字样式 */
.apparel-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx 25rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4) 30%, transparent 70%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 120rpx;
}

.apparel-name {
  font-size: 34rpx;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 8rpx;
  letter-spacing: 1rpx;
  text-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.7);
  line-height: 1.2;
  white-space: normal;
  word-break: break-all;
  display: block;
}

/* 触摸效果 */
.nav-back,
.filter-tag,
.apparel-item {
  transition: all 0.2s ease;
}

.nav-back:active {
  opacity: 0.8;
  transform: scale(0.95);
}

.filter-tag:active .filter-text {
  opacity: 0.8;
  transform: scale(0.98);
}

.apparel-item:active {
  opacity: 0.9;
  transform: translateY(-4rpx);
}
</style>