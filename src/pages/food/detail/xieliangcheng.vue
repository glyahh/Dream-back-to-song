<template>
  <view class="detail-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">食谱</text>
      <view class="right-actions"></view>
    </view>

    <!-- 主内容区 -->
    <view class="main-content">
      <!-- 圆形图片容器（仅图片，不含爱心） -->
      <view class="circle-image-container">
        <view class="image-circle">
          <image class="dish-image" :src="dish.image" mode="aspectFill" />
        </view>
      </view>

      <!-- 爱心按钮：放在圆形右侧外部，牌匾正上方 -->
      <view class="like-btn" @click="toggleLike">
        <text class="like-icon" :class="{ liked: dish.liked }">
          {{ dish.liked ? '❤️' : '🤍' }}
        </text>
      </view>

      <!-- 右侧菜品名称（竖排） -->
      <view class="right-dish-name">
        <view class="name-plaque">
          <text class="dish-name-text">{{ dish.name }}</text>
        </view>
      </view>

      <!-- 竖排食谱内容（仅一段，宽度=圆形总宽540rpx） -->
      <view class="recipe-content-vertical">
        <view class="vertical-text">
          【食材】大橙子四个、螃蟹三只、猪肥膘半两、姜汁一匙、香雪酒、醋、盐。<br> 【制作步骤】
          橙子切去顶部留盖，挖出橙肉留橙壳备用；螃蟹蒸熟后拆取蟹肉与蟹黄；猪肥膘切细末
          与蟹肉混合，加入姜汁、香雪酒、醋与盐拌匀；将蟹肉馅填入橙壳，盖上橙盖用竹签固
          定；上笼屉以旺火蒸六分钟即可。
        </view>
      </view>

      <!-- 开始制作按钮 -->
      <view class="start-btn-container">
        <button class="start-btn" @click="startMaking">
          开始制作
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dish: {
        id: 1,
        name: '东坡肉',
        image: '/static/xieniangcheng-detail.png', // 请确保路径正确
        liked: false,
      }
    }
  },

  onLoad(options) {
    if (options.id) {
      this.dish.id = options.id;
    }
    if (options.name) {
      this.dish.name = decodeURIComponent(options.name);
    }
  },

  data() {
    return {
      dish: {
        id: 1,
        name: '东坡肉',
        image: '/static/xieniangcheng-detail.png',
        liked: false,
      },
      isNavigating: false
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
            url: '/pages/food/category/meat'
          })
        },
        complete: () => {
          setTimeout(() => {
            this.isNavigating = false
          }, 300)
        }
      })
    },

    toggleLike() {
      this.dish.liked = !this.dish.liked;
      uni.showToast({
        title: this.dish.liked ? '已点赞' : '已取消点赞',
        icon: 'none',
        duration: 800
      });
    },

    startMaking() {
      // 预留跳转链接，请替换为你实际的页面路径
      uni.navigateTo({
        url: '/pages/making/making?id=' + this.dish.id
      });
    }
  }
}
</script>

<style scoped>
.detail-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  position: relative;
  font-family: 'SimSun', 'STSong', serif;
}

/* 导航栏 */
.nav-bar {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background-color: rgba(200, 210, 190, 0.95);
  height: 200rpx;
  padding-top: env(safe-area-inset-top);
}

/* 左上角大返回按钮 */
.back-btn {
  width: 60rpx; /* 增大点击区域 */
  height: 60rpx;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  margin-top:140rpx;
}

.back-icon {
  font-size: 64rpx; /* 稍微加大图标 */
  color: #333;
  font-weight: 300;
  margin-top: -8rpx;
  margin-left: -6rpx;
}

.nav-title {
  font-size: 50rpx;
  font-weight: 700;
  color: black;
  letter-spacing: 8rpx;
  font-family: 'LiSu', 'SimLi', serif;
  flex: 1;
  text-align: center;
  margin-left: -40rpx; /* 因按钮变宽，标题需左移补偿 */
  margin-top:130rpx;
}

.right-actions {
  width: 80rpx; /* 保持对称 */
}

/* 主内容区 */
.main-content {
  position: relative;
  padding-top: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 圆形图片容器 */
.circle-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 60rpx;
}

.image-circle {
  position: relative;
  width: 400rpx;
  height: 400rpx;
  border-radius: 50%;
  overflow: hidden;
  border: 15rpx solid #f0e6d3;
  background-color: #fff;
}

.dish-image {
  width: 100%;
  height: 100%;
  display: block;
}

/* 爱心按钮：移到圆形右侧外部，牌匾正上方 */
.like-btn {
  position: absolute;
  top: 300rpx; /* 与牌匾顶部对齐（牌匾 top: 220rpx） */
  right: 70rpx; /* 调整到圆形右侧外部（圆形中心+半径+间距） */
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #f6f2e9;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.like-icon {
  font-size: 45rpx;
  transition: all 0.3s ease;
}

.like-icon.liked {
  color: #e74c3c;
  transform: scale(1.1);
}

/* 右侧菜品名称（竖排） */
.right-dish-name {
  position: absolute;
  top: 570rpx;
  right: 55rpx;
  z-index: 5;
}

.name-plaque {
  width: 100rpx;
  height: 260rpx;
  background-color: #5d4f3a; /* 深棕绿 */
  border: 4rpx solid #c8b69a; /* 浅米色边框 */
  border-radius: 12rpx; /* 圆角模拟牌匾 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0;
  box-sizing: border-box;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3); /* 立体感 */
}

.dish-name-text {
  font-size: 44rpx;
  color: #e6d7b8; /* 米白色文字 */
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 20rpx;
  font-family: 'LiSu', 'SimLi', serif;
  line-height: 1.3;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.6);
  white-space: nowrap;
}

/* 竖排食谱内容：宽度 = 480 + 15*2*2 = 540rpx，右对齐 */
.recipe-content-vertical {
  width: 470rpx; /* 修改为与圆形图片一致的宽度 */
  padding: 0 0 60rpx;
  display: flex;
  justify-content: flex-end; /* 右对齐 */
  margin: 0 auto; /* 居中对齐 */
  height:700rpx;
}

.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 32rpx;
  color: #5a4a42;
  line-height: 1.8;
  letter-spacing: 8rpx;
  font-family: 'KaiTi', 'SimKai', 'STKaiti', serif;
  border-radius: 15rpx;
  padding: 40rpx 35rpx;
  width: 100%;
  box-sizing: border-box;
}


/* 开始制作按钮 */
.start-btn-container {
  display: flex;
  justify-content: center;
  padding: 0 40rpx 60rpx;
  width: 100%;
}

.start-btn {
  width: 400rpx;
  height: 100rpx;
  background-image: url('/static/begin.jpg'); /* ←←← 关键修改 */
  background-size: contain; /* 保证图片完整显示，不拉伸变形 */
  background-repeat: no-repeat;
  background-position: center;
  color: #333;
  font-size: 45rpx;
  font-weight: bold;
  font-family: 'LiSu', 'SimLi', serif;
  border: none; /* 移除虚线边框 */
  background-color:#f6f2e9;
  padding-top: -25rpx;
}

.start-btn::after {
  border: none;
}

.start-btn:active {
  background-image: url('/static/begin.jpg');
  background-size: contain;
  transform: scale(0.98);
}
</style>