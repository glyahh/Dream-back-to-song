<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">我的收藏</text>
      <text class="nav-sub">把喜欢的宋风碎片留在这里</text>
    </view>

    <view class="tabs">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: currentTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
      </view>
    </view>

    <scroll-view class="scroll" scroll-y>
      <view v-if="currentTab === 'goods'" class="grid">
        <view
          v-for="item in goods"
          :key="item.id"
          class="grid-item"
          @click="openGoods(item)"
          @longpress="toggleCollectGoods(item)"
        >
          <image class="grid-img" :src="item.img" mode="aspectFill" />
          <view class="grid-info">
            <text class="grid-title">{{ item.title }}</text>
            <text class="grid-price">¥{{ item.price }}</text>
          </view>
          <view class="grid-tag">好物</view>
        </view>
        <view v-if="!goods.length" class="empty">
          <text class="empty-title">还没有收藏好物</text>
          <text class="empty-desc">在「集市」中点击小星星即可加入收藏。</text>
        </view>
      </view>

      <view v-else class="list">
        <view
          v-for="item in notes"
          :key="item.id"
          class="note-card"
          @click="openNote(item)"
          @longpress="toggleCollectNote(item)"
        >
          <text class="note-tag">{{ item.tag }}</text>
          <text class="note-title">{{ item.title }}</text>
          <text class="note-content">{{ item.excerpt }}</text>
          <view class="note-footer">
            <text class="note-from">{{ item.from }}</text>
            <text class="note-time">{{ item.time }}</text>
          </view>
        </view>
        <view v-if="!notes.length" class="empty">
          <text class="empty-title">还没有收藏内容</text>
          <text class="empty-desc">看到喜欢的帖子与文章时，可以先收入这里。</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'goods',
      tabs: [
        { key: 'goods', label: '好物' },
        { key: 'notes', label: '内容' },
      ],
      goods: [],
      notes: [],
    }
  },
  onLoad() {
    this.initCollections()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initCollections() {
      try {
        const savedGoods = uni.getStorageSync('me_collections_goods')
        const savedNotes = uni.getStorageSync('me_collections_notes')
        if (Array.isArray(savedGoods)) this.goods = savedGoods
        if (Array.isArray(savedNotes)) this.notes = savedNotes
        if (this.goods.length || this.notes.length) return
      } catch (e) {
        // ignore
      }
      // 默认示例
      this.goods = [
        {
          id: 'g1',
          title: '汴梁旧帖 · 宣纸套装',
          price: 56,
          img: '/static/market_newitem/汴梁旧帖.png',
        },
        {
          id: 'g2',
          title: '风荷雅盏 · 茶杯',
          price: 88,
          img: '/static/market_newitem/风荷雅盏.png',
        },
      ]
      this.notes = [
        {
          id: 'n1',
          tag: '#生活在宋朝',
          title: '如果在汴京开一家小茶肆',
          excerpt: '门口挂一盏暖黄灯笼，案上只做两三款茶点，让来往行人坐下歇脚、翻翻画册……',
          from: '来自「发现 · 话题广场」',
          time: '收藏于 01-20',
        },
      ]
      this.persist()
    },
    persist() {
      try {
        uni.setStorageSync('me_collections_goods', this.goods)
        uni.setStorageSync('me_collections_notes', this.notes)
      } catch (e) {
        // ignore
      }
    },
    switchTab(key) {
      this.currentTab = key
    },
    openGoods(item) {
      uni.navigateTo({
        url: '/pages/market/detail?from=collections',
      })
    },
    openNote(item) {
      uni.showModal({
        title: item.title,
        content: item.excerpt,
        showCancel: false,
      })
    },
    toggleCollectGoods(item) {
      uni.showModal({
        title: '取消收藏',
        content: `不再收藏「${item.title}」？`,
        success: (res) => {
          if (res.confirm) {
            this.goods = this.goods.filter((g) => g.id !== item.id)
            this.persist()
            uni.showToast({ title: '已取消收藏', icon: 'none' })
          }
        },
      })
    },
    toggleCollectNote(item) {
      uni.showModal({
        title: '取消收藏',
        content: `不再收藏这条内容吗？`,
        success: (res) => {
          if (res.confirm) {
            this.notes = this.notes.filter((n) => n.id !== item.id)
            this.persist()
            uni.showToast({ title: '已取消收藏', icon: 'none' })
          }
        },
      })
    },
  },
}
</script>

<style scoped>
.page {
  background-color: #f5f0e8;
  min-height: 100vh;
  padding-bottom: 40rpx;
  box-sizing: border-box;
}

.nav {
  padding: 60rpx 30rpx 10rpx;
}

.nav-back {
  font-size: 34rpx;
  color: #666;
}

.nav-title {
  display: block;
  margin-top: 12rpx;
  font-size: 32rpx;
  color: #111;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.nav-sub {
  display: block;
  margin-top: 4rpx;
  font-size: 24rpx;
  color: #7a7a7a;
}

.tabs {
  margin: 12rpx 30rpx 8rpx;
  display: flex;
  gap: 12rpx;
}

.tab-item {
  padding: 10rpx 26rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #777;
  background-color: #f0ebe1;
}

.tab-item.active {
  background-color: #9ea97f;
  color: #fff;
}

.scroll {
  height: calc(100vh - 210rpx);
}

.grid {
  padding: 10rpx 26rpx 26rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rpx;
}

.grid-item {
  background-color: #fff;
  border-radius: 18rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.grid-img {
  width: 100%;
  height: 180rpx;
  display: block;
}

.grid-info {
  padding: 10rpx 12rpx 12rpx;
}

.grid-title {
  font-size: 24rpx;
  color: #333;
  margin-bottom: 4rpx;
}

.grid-price {
  font-size: 22rpx;
  color: #9ea97f;
}

.grid-tag {
  position: absolute;
  top: 10rpx;
  left: 10rpx;
  padding: 4rpx 10rpx;
  border-radius: 999rpx;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 20rpx;
}

.list {
  padding: 10rpx 30rpx 26rpx;
}

.note-card {
  background-color: #fff;
  border-radius: 18rpx;
  padding: 18rpx 20rpx 16rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
}

.note-tag {
  font-size: 22rpx;
  color: #9ea97f;
  margin-bottom: 6rpx;
  display: block;
}

.note-title {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 6rpx;
}

.note-content {
  font-size: 24rpx;
  color: #666;
  line-height: 1.7;
  margin-bottom: 10rpx;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  font-size: 22rpx;
  color: #b0b0b0;
}

.empty {
  padding: 80rpx 20rpx 40rpx;
  text-align: center;
  color: #999;
}

.empty-title {
  font-size: 30rpx;
  margin-bottom: 8rpx;
}

.empty-desc {
  font-size: 24rpx;
}
</style>

