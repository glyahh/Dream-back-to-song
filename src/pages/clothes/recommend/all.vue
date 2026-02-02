<template>
  <view class="recommend-all-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">全部推荐</text>
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

    <!-- 推荐列表 -->
    <scroll-view class="recommend-scroll" scroll-y>
      <view class="recommend-container">
        <view
          v-for="(item, index) in filteredList"
          :key="index"
          class="recommend-item"
          @click="goToDetail(item.id)"
        >
          <image class="recommend-image" :src="item.image" mode="aspectFill" />
          <view class="recommend-info">
            <text class="recommend-name">{{ item.name }}</text>
            <text class="recommend-dynasty">{{ item.dynasty }}</text>
            <text class="recommend-desc">{{ item.description }}</text>
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
      recommendList: [
        {
          id: 1,
          name: '褙子',
          dynasty: '宋代女装',
          image: '/static/cloth_index3.jpg',
          description: '宋代女性最流行的外衣，直领对襟，两侧开衩',
          category: 'female'
        },
        {
          id: 2,
          name: '圆领袍',
          dynasty: '宋代官服',
          image: '/static/cloth_index2.jpg',
          description: '宋代官员常服，圆领窄袖，体现官阶等级',
          category: 'official'
        },
        {
          id: 3,
          name: '百褶裙',
          dynasty: '宋代民间',
          image: '/static/apparel2.png',
          description: '宋代女性下装，褶裥细密，行走飘逸',
          category: 'female'
        },
        {
          id: 4,
          name: '对襟衫',
          dynasty: '宋代常服',
          image: '/static/apparel5.jpg',
          description: '宋代男女通用上衣，对襟直领，简洁大方',
          category: 'folk'
        },
        {
          id: 5,
          name: '披帛',
          dynasty: '宋代配饰',
          image: '/static/pibo.png',
          description: '宋代女性配饰，长条状，增添飘逸美感',
          category: 'accessory'
        },
        {
          id: 6,
          name: '直裰',
          dynasty: '宋代男装',
          image: '/static/apparel6.jpg',
          description: '宋代文人常服，直身长袍，体现文人风骨',
          category: 'male'
        },
        {
          id: 7,
          name: '道袍',
          dynasty: '宋代男装',
          image: '/static/apparel4.jpg',
          description: '宋代男性外衣，交领右衽，宽袖飘逸',
          category: 'male'
        },
        {
          id: 8,
          name: '抹胸',
          dynasty: '宋代女装',
          image: '/static/apparel3.png',
          description: '宋代女性内衣，贴身穿着，外搭褙子',
          category: 'female'
        }
      ]
    }
  },
  computed: {
    filteredList() {
      if (this.activeFilter === 'all') {
        return this.recommendList
      }
      return this.recommendList.filter(item => item.category === this.activeFilter)
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    switchFilter(filterId) {
      this.activeFilter = filterId
    },
    goToDetail(id) {
      uni.navigateTo({
        url: `/pages/clothes/recommend/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.recommend-all-page {
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

.recommend-scroll {
  height: calc(100vh - 240rpx);
}

.recommend-container {
  padding: 30rpx;
}

.recommend-item {
  display: flex;
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.recommend-image {
  width: 240rpx;
  height: 240rpx;
  flex-shrink: 0;
}

.recommend-info {
  flex: 1;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.recommend-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 8rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.recommend-dynasty {
  font-size: 24rpx;
  color: #9ea97f;
  margin-bottom: 12rpx;
  font-weight: 500;
}

.recommend-desc {
  font-size: 26rpx;
  color: #7a756e;
  line-height: 1.6;
}

.back-btn:active,
.filter-tag:active,
.recommend-item:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

