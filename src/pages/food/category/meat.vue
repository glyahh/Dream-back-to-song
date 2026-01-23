<template>
  <view class="meat-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">肉食</text>
      <view class="right-actions">
        <!-- 保持对称 -->
      </view>
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
          <!-- 牌匾外框 -->
          <view class="plaque-outer">
            <!-- 牌匾主体 -->
            <view class="plaque-main"></view>
            <!-- 白色内边框 -->
            <view class="plaque-inner-border"></view>
            <!-- 四角装饰 -->
            <view class="corner corner-tl"></view>
            <view class="corner corner-tr"></view>
            <view class="corner corner-bl"></view>
            <view class="corner corner-br"></view>
          </view>
          <text class="dish-name">{{ dish.name }}</text>
        </view>

        <!-- 点赞收藏按钮（右下角） -->
        <view class="action-buttons">
          <!-- 点赞按钮 -->
          <view class="action-circle like-circle" @click.stop="toggleLike(dish)">
            <text class="action-icon" :class="{ liked: dish.liked }">❤️</text>

          </view>

          <!-- 收藏按钮 -->
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
      dishes: [
        {
          id: 1,
          name: '东坡肉',
          image: '/static/dongporou.png',
          liked: false,
          likeCount: 42,
          favorited: false,
          favoriteCount: 23,
          description: '东坡肉，杭州名菜，肥而不腻，酥香味美'
        },
        {
          id: 2,
          name: '螃蟹羹',
          image: '/static/pangxiegeng.png',
          liked: true,
          likeCount: 38,
          favorited: false,
          favoriteCount: 15,
          description: '宋代流行的蟹肉羹，鲜美细腻，营养丰富'
        },
        {
          id: 3,
          name: '蟹酿橙',
          image: '/static/xieliangcheng.png',
          liked: false,
          likeCount: 56,
          favorited: true,
          favoriteCount: 31,
          description: '将蟹肉酿入橙中，橙香蟹鲜，别具风味'
        },
        {
          id: 4,
          name: '鲜笋蒸鸡',
          image: '/static/xiansunzhenge.jpg',
          liked: false,
          likeCount: 29,
          favorited: false,
          favoriteCount: 12,
          description: '春笋与鸡肉同蒸，鲜嫩爽口，清香四溢'
        },
        {
          id: 5,
          name: '山煮羊',
          image: '/static/shanzhuyang.png',
          liked: true,
          likeCount: 67,
          favorited: true,
          favoriteCount: 45,
          description: '山羊肉慢火炖煮，肉质酥烂，汤浓味醇'
        },
        {
          id: 6,
          name: '煎小鸡',
          image: '/static/jianxiaoji.png',
          liked: false,
          likeCount: 34,
          favorited: false,
          favoriteCount: 18,
          description: '嫩鸡肉香煎，外酥里嫩，香气扑鼻'
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
          uni.redirectTo({
            url: '/pages/food/index'
          });
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
      console.log('点击菜品:', dish.name, 'ID:', dish.id);

      // 根据菜品ID跳转到对应的详情页
      const detailPages = {
        1: '/pages/food/detail/dongporou',       // 东坡肉
        2: '/pages/food/detail/pangxiegeng',     // 螃蟹羹
        3: '/pages/food/detail/xieliangcheng',   // 蟹酿橙
        4: '/pages/food/detail/xiansunzhengji',  // 鲜笋蒸鸡
        5: '/pages/food/detail/shanzhuyang',     // 山煮羊
        6: '/pages/food/detail/jianxiaoji'       // 煎小鸡
      };

      const pagePath = detailPages[dish.id];

      console.log('跳转路径:', pagePath);

      if (pagePath) {
        uni.navigateTo({
          url: `${pagePath}?id=${dish.id}&name=${encodeURIComponent(dish.name)}`,
          success: (res) => {
            console.log('跳转成功', res);
          },
          fail: (err) => {
            console.log('跳转失败', err);
            uni.showToast({
              title: '页面未找到',
              icon: 'none'
            });
          }
        });
      } else {
        console.log('找不到对应页面，ID:', dish.id);
        uni.showToast({
          title: '页面开发中',
          icon: 'none'
        });
      }
    }
  }
}
</script>

<style scoped>
.meat-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
  padding-top: env(safe-area-inset-top);
}

/* 导航栏 - 添加淡绿色背景 */
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40rpx 30rpx 25rpx; /* 增加上边距让标题偏下 */
  background-color: rgba(200, 210, 190, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 15rpx rgba(0, 0, 0, 0.05);
  height:110rpx;
}

/* 返回按钮位置调低 */
.back-btn {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  margin-top: 55rpx; /* 向下移动一点 */
}

.back-icon {
  font-size: 56rpx; /* 稍微调大 */
  color: #333;
  font-weight: 300;
  margin-top: -8rpx;
  margin-left: -6rpx;
}

/* 标题加宽、偏下 */
.nav-title {
  font-size: 50rpx; /* 增大字体 */
  font-weight: 700;
  color: #4a593d; /* 深绿色，与背景协调 */
  letter-spacing: 8rpx; /* 增加字间距 */
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  margin-top: 55rpx; /* 向下移动 */
  flex: 1;
  text-align: center;
  margin-left: -15rpx; /* 平衡左右对称 */
}

.right-actions {
  width: 80rpx; /* 保持对称 */
}

/* 搜索栏 */
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

/* 搜索框文字水平居中 */
.search-input {
  flex: 1;
  font-size: 30rpx;
  color: #333;
  height: 100%;
  text-align: center; /* 文字水平居中 */
}

.search-placeholder {
  color: #b0b0b0;
  font-size: 30rpx;
  text-align: center; /* placeholder也居中 */
}

/* 菜品网格 */
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
  height: 500rpx; /* 固定高度 */
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

/* 菜品名称容器（右上角） - 墨绿牌匾样式 */
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

/* 牌匾外框容器 */
.plaque-outer {
  position: relative;
  width: 85rpx;
  height: 180rpx;
}

/* 牌匾主体 - 墨绿色背景 */
.plaque-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #2c5530 0%, #1e3a24 100%);
  /* 四角凹进去的形状 */
  clip-path: polygon(
    15% 0%,     /* 左上开始 */
    85% 0%,     /* 上边 */
    100% 15%,   /* 右上 */
    100% 85%,   /* 右边 */
    85% 100%,   /* 右下 */
    15% 100%,   /* 下边 */
    0% 85%,     /* 左下 */
    0% 15%      /* 左上 */
  );
  box-shadow:
    0 6rpx 20rpx rgba(0, 0, 0, 0.4),
    inset 0 0 30rpx rgba(0, 0, 0, 0.3);
}

/* 白色内边框 */
.plaque-inner-border {
  position: absolute;
  top: 6rpx;
  left: 6rpx;
  right: 6rpx;
  bottom: 6rpx;
  background: transparent;
  /* 内边框形状比主体小一点 */
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

/* 四角装饰 */
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
  color: #e6d7b8; /* 古典金色 */
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

/* 点赞收藏按钮容器（右下角） */
.action-buttons {
  position: absolute;
  bottom: 25rpx; /* 下方留距离 */
  right: 25rpx; /* 右方留距离 */
  display: flex;
  flex-direction: column;
  gap: 15rpx;
  align-items: center;
}

/* 圆形按钮 */
.action-circle {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(100, 100, 100, 0.4); /* 灰色透明背景 */
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

.action-count {
  font-size: 22rpx;
  color: #fff;
  font-weight: 500;
  text-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.3);
}

/* 点赞按钮状态 */
.like-circle .action-icon.liked {
  color: #ffc107;
  filter: drop-shadow(0 0 8rpx rgba(255, 193, 7, 0.5));
}

.like-circle.active {
  background-color: rgba(255, 193, 7, 0.3); /* 点赞后的黄色背景 */
}

/* 收藏按钮状态 */
.favorite-circle .action-icon.favorited {
  color: #f44336;
  filter: drop-shadow(0 0 8rpx rgba(244, 67, 54, 0.5));
}

.favorite-circle.active {
  background-color: rgba(244, 67, 54, 0.3); /* 收藏后的红色背景 */
}

/* 触摸效果 */
.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}

/* H5悬停效果 */
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