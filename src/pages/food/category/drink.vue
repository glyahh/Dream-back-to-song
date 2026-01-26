<template>
  <view class="drink-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">饮品</text>
      <view class="right-actions"></view>
    </view>

    <!-- 搜索栏 -->
    <view class="search-section">
      <view class="search-bar">
        <text class="search-icon">🔍</text>
        <input
          class="search-input"
          type="text"
          confirm-type="search"
          placeholder="请输入关键词"
          placeholder-class="search-placeholder"
          v-model="searchKeyword"
          @confirm="onSearch"
        />
      </view>
    </view>

    <!-- 菜品网格 -->
    <view class="dish-grid">
      <view
        v-for="(dish, index) in filteredDishes"
        :key="dish.id"
        class="dish-card"
        :class="{ 'card-pressed': pressedIndex === index }"
        @touchstart="handleTouchStart(index)"
        @touchend="handleTouchEnd"
        @click="goToDishDetail(dish)"
      >
        <image class="dish-img" :src="dish.image" mode="aspectFill" />

        <!-- 菜品名称（右上角竖排） -->
        <view class="dish-name-container">
          <view class="plaque-outer">
            <view class="plaque-main"></view>
            <view class="plaque-inner-border"></view>
            <view class="corner corner-tl"></view>
            <view class="corner corner-tr"></view>
            <view class="corner corner-bl"></view>
            <view class="corner corner-br"></view>
          </view>
          <text class="dish-name">{{ dish.name }}</text>
        </view>

        <!-- 点赞收藏按钮（右下角） -->
        <view class="action-buttons">
          <view class="action-circle like-circle" @click.stop="toggleLike(dish)">
            <text class="action-icon" :class="{ liked: dish.liked }">❤️</text>
          </view>
          <view class="action-circle favorite-circle" @click.stop="toggleFavorite(dish)">
            <text class="action-icon" :class="{ favorited: dish.favorited }">👍</text>
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
      searchKeyword: '',
      pressedIndex: -1,
      isNavigating: false,
      dishes: [
        {
          id: 1,
          name: '茶',
          image: '/static/food_drink.jpg',
          liked: false,
          likeCount: 68,
          favorited: false,
          favoriteCount: 35,
          description: '宋代茶文化，清香淡雅，回味悠长'
        },
        {
          id: 2,
          name: '酒',
          image: '/static/food_drink.jpg',
          liked: true,
          likeCount: 55,
          favorited: false,
          favoriteCount: 28,
          description: '宋代美酒，醇厚甘甜，温润如玉'
        },
        {
          id: 3,
          name: '汤',
          image: '/static/food_drink.jpg',
          liked: false,
          likeCount: 42,
          favorited: true,
          favoriteCount: 21,
          description: '养生汤品，温润滋补，清香淡雅'
        },
        {
          id: 4,
          name: '露',
          image: '/static/food_drink.jpg',
          liked: false,
          likeCount: 38,
          favorited: false,
          favoriteCount: 19,
          description: '花露饮品，清香怡人，甘甜爽口'
        }
      ]
    }
  },
  computed: {
    filteredDishes() {
      if (!this.searchKeyword.trim()) {
        return this.dishes
      }
      const keyword = this.searchKeyword.toLowerCase()
      return this.dishes.filter(dish =>
        dish.name.toLowerCase().includes(keyword) ||
        dish.description.toLowerCase().includes(keyword)
      )
    }
  },
  methods: {
    goBack() {
      if (this.isNavigating) return
      this.isNavigating = true
      uni.navigateBack({
        delta: 1,
        fail: () => {
          this.isNavigating = false
          uni.redirectTo({
            url: '/pages/food/index'
          })
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false
          }, 300)
        }
      })
    },
    onSearch() {
      console.log('搜索关键词:', this.searchKeyword)
    },
    handleTouchStart(index) {
      this.pressedIndex = index
    },
    handleTouchEnd() {
      setTimeout(() => {
        this.pressedIndex = -1
      }, 150)
    },
    toggleLike(dish) {
      dish.liked = !dish.liked
      dish.likeCount += dish.liked ? 1 : -1
      uni.showToast({
        title: dish.liked ? '已点赞' : '已取消点赞',
        icon: 'none',
        duration: 800
      })
    },
    toggleFavorite(dish) {
      dish.favorited = !dish.favorited
      dish.favoriteCount += dish.favorited ? 1 : -1
      uni.showToast({
        title: dish.favorited ? '已收藏' : '已取消收藏',
        icon: 'none',
        duration: 800
      })
    },
    goToDishDetail(dish) {
      const detailPages = {
        1: '/pages/food/detail/cha',             // 茶
        2: '/pages/food/detail/jiu',             // 酒
        3: '/pages/food/detail/tang',            // 汤
        4: '/pages/food/detail/lu'               // 露
      }
      const pagePath = detailPages[dish.id]
      if (pagePath) {
        uni.navigateTo({
          url: `${pagePath}?id=${dish.id}&name=${encodeURIComponent(dish.name)}`
        })
      } else {
        uni.showToast({
          title: '页面开发中',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style scoped>
.drink-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
  padding-top: env(safe-area-inset-top);
}

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40rpx 30rpx 25rpx;
  background-color: rgba(200, 210, 190, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);
  height: 110rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  margin-top: 55rpx;
}

.back-icon {
  font-size: 56rpx;
  color: #333;
  font-weight: 300;
  margin-top: -8rpx;
  margin-left: -6rpx;
}

.nav-title {
  font-size: 50rpx;
  font-weight: 700;
  color: #4a593d;
  letter-spacing: 8rpx;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  margin-top: 55rpx;
  flex: 1;
  text-align: center;
  margin-left: -15rpx;
}

.right-actions {
  width: 80rpx;
}

.search-section {
  padding: 40rpx 30rpx 20rpx;
}

.search-bar {
  height: 85rpx;
  background-color: #fff;
  border-radius: 45rpx;
  display: flex;
  align-items: center;
  padding: 0 35rpx;
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.06);
}

.search-icon {
  font-size: 36rpx;
  color: #9ea97f;
  margin-right: 25rpx;
}

.search-input {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  height: 100%;
  text-align: center;
}

.search-placeholder {
  color: #b0b0b0;
  font-size: 30rpx;
  text-align: center;
}

.dish-grid {
  padding: 0 25rpx 40rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30rpx;
}

.dish-card {
  background-color: #fff;
  border-radius: 25rpx;
  overflow: hidden;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  position: relative;
  height: 500rpx;
}

.dish-card.card-pressed {
  opacity: 0.85;
  transform: scale(0.98);
}

.dish-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.dish-name-container {
  position: absolute;
  top: 25rpx;
  right: 25rpx;
  min-width: 80rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.plaque-outer {
  position: relative;
  width: 85rpx;
  height: 180rpx;
}

.plaque-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #2c5530 0%, #1e3a24 100%);
  clip-path: polygon(
    15% 0%,
    85% 0%,
    100% 15%,
    100% 85%,
    85% 100%,
    15% 100%,
    0% 85%,
    0% 15%
  );
  box-shadow:
    0 6rpx 20rpx rgba(0, 0, 0, 0.4),
    inset 0 0 30rpx rgba(0, 0, 0, 0.3);
}

.plaque-inner-border {
  position: absolute;
  top: 6rpx;
  left: 6rpx;
  right: 6rpx;
  bottom: 6rpx;
  background: transparent;
  clip-path: polygon(
    15% 0%,
    85% 0%,
    100% 15%,
    100% 85%,
    85% 100%,
    15% 100%,
    0% 85%,
    0% 15%
  );
  border: 2rpx solid rgba(255, 255, 255, 0.7);
  box-shadow:
    inset 0 0 15rpx rgba(255, 255, 255, 0.2),
    0 0 10rpx rgba(255, 255, 255, 0.1);
}

.corner {
  position: absolute;
  width: 16rpx;
  height: 16rpx;
  background: transparent;
  border: 2rpx solid rgba(255, 255, 255, 0.6);
}

.corner-tl {
  top: 2rpx;
  left: 2rpx;
  border-right: none;
  border-bottom: none;
  border-radius: 4rpx 0 0 0;
}

.corner-tr {
  top: 2rpx;
  right: 2rpx;
  border-left: none;
  border-bottom: none;
  border-radius: 0 4rpx 0 0;
}

.corner-bl {
  bottom: 2rpx;
  left: 2rpx;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 4rpx;
}

.corner-br {
  bottom: 2rpx;
  right: 2rpx;
  border-left: none;
  border-top: none;
  border-radius: 0 0 4rpx 0;
}

.dish-name {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  display: block;
  font-size: 36rpx;
  font-weight: 0;
  color: #e6d7b8;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 8rpx;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
  line-height: 1.2;
  text-shadow:
    0 2rpx 4rpx rgba(0, 0, 0, 0.8),
    0 0 10rpx rgba(230, 215, 184, 0.3);
  padding: 25rpx 0;
  text-align: center;
  white-space: nowrap;
}

.action-buttons {
  position: absolute;
  bottom: 25rpx;
  right: 25rpx;
  display: flex;
  flex-direction: column;
  gap: 15rpx;
  align-items: center;
}

.action-circle {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(100, 100, 100, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 6rpx 15rpx rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.action-circle:active {
  transform: scale(0.95);
}

.action-icon {
  font-size: 36rpx;
  transition: all 0.3s ease;
  display: block;
  margin-bottom: 5rpx;
}

.like-circle .action-icon.liked {
  color: #ffc107;
  filter: drop-shadow(0 0 8rpx rgba(255, 193, 7, 0.5));
}

.like-circle.active {
  background-color: rgba(255, 193, 7, 0.3);
}

.favorite-circle .action-icon.favorited {
  color: #f44336;
  filter: drop-shadow(0 0 8rpx rgba(244, 67, 54, 0.5));
}

.favorite-circle.active {
  background-color: rgba(244, 67, 54, 0.3);
}

.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}

@media (hover: hover) {
  .dish-card:hover {
    transform: translateY(-8rpx);
    box-shadow: 0 15rpx 35rpx rgba(0, 0, 0, 0.12);
  }

  .dish-card:hover .plaque-main {
    background: linear-gradient(135deg, #365c3a 0%, #25472a 100%);
    box-shadow:
      0 8rpx 25rpx rgba(0, 0, 0, 0.5),
      inset 0 0 40rpx rgba(0, 0, 0, 0.4);
  }

  .dish-card:hover .plaque-inner-border {
    border-color: rgba(255, 255, 255, 0.9);
    box-shadow:
      inset 0 0 20rpx rgba(255, 255, 255, 0.3),
      0 0 15rpx rgba(255, 255, 255, 0.2);
  }

  .dish-card:hover .corner {
    border-color: rgba(255, 255, 255, 0.8);
  }

  .dish-card:hover .dish-name {
    color: #f0e6cc;
    text-shadow:
      0 2rpx 6rpx rgba(0, 0, 0, 0.9),
      0 0 15rpx rgba(240, 230, 204, 0.4);
  }

  .action-circle:hover {
    transform: scale(1.05);
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.2);
  }

  .like-circle:hover .action-icon {
    transform: scale(1.2);
  }

  .favorite-circle:hover .action-icon {
    transform: scale(1.2);
  }
}
</style>

