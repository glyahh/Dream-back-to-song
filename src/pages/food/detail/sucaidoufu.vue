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
      <!-- 圆形图片容器 -->
      <view class="circle-image-container">
        <view class="image-circle">
          <image class="dish-image" :src="dish.image" mode="aspectFill" />
        </view>
      </view>

      <!-- 爱心按钮 -->
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

      <!-- 竖排食谱内容 -->
      <view class="recipe-content-vertical">
        <view class="vertical-text">
          【食材】嫩豆腐一块、时蔬适量、姜丝少许、生抽、盐、香油。<br> 【制作步骤】
          豆腐切块，用淡盐水浸泡片刻去腥；时蔬洗净切段备用；热锅下油，放入姜丝爆香；
          下入豆腐块，小火慢煎至两面微黄；加入时蔬翻炒，调入生抽和盐调味；
          最后淋入香油，翻炒均匀即可出锅。
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
        name: '素炒豆腐',
        image: 'https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/food_vegetarian.jpg',
        liked: false,
      },
      isNavigating: false
    }
  },
  onLoad(options) {
    if (options.id) {
      this.dish.id = options.id
    }
    if (options.name) {
      this.dish.name = decodeURIComponent(options.name)
    }
  },
  methods: {
    goBack() {
      if (this.isNavigating) return
      if (getCurrentPages().length < 2) {
        uni.redirectTo({ url: '/pages/food/category/vegetarian' })
        return
      }
      this.isNavigating = true
      uni.navigateBack({
        delta: 1,
        fail: () => {
          this.isNavigating = false
          uni.redirectTo({
            url: '/pages/food/category/vegetarian'
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
      this.dish.liked = !this.dish.liked
      uni.showToast({
        title: this.dish.liked ? '已点赞' : '已取消点赞',
        icon: 'none',
        duration: 800
      })
    },
    startMaking() {
      uni.navigateTo({
        url: '/pages/food/making/sucaidoufu_making?id=' + this.dish.id
      })
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

.nav-bar {
  display: flex;
  align-items: center;
  padding: 30rpx;
  background-color: rgba(200, 210, 190, 0.95);
  height: 200rpx;
  padding-top: env(safe-area-inset-top);
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
  margin-top: 140rpx;
}

.back-icon {
  font-size: 64rpx;
  color: #333;
  font-weight: 300;
  margin-top: -8rpx;
  margin-left: -6rpx;
}

.nav-title {
  pointer-events: none;
  font-size: 50rpx;
  font-weight: 700;
  color: black;
  letter-spacing: 8rpx;
  font-family: 'LiSu', 'SimLi', serif;
  flex: 1;
  text-align: center;
  margin-left: -40rpx;
  margin-top: 130rpx;
}

.right-actions {
  width: 80rpx;
}

.main-content {
  position: relative;
  padding-top: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

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

.like-btn {
  position: absolute;
  top: 300rpx;
  right: 70rpx;
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

.right-dish-name {
  position: absolute;
  top: 570rpx;
  right: 55rpx;
  z-index: 5;
}

.name-plaque {
  width: 100rpx;
  height: 260rpx;
  background-color: #5d4f3a;
  border: 4rpx solid #c8b69a;
  border-radius: 12rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0;
  box-sizing: border-box;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

.dish-name-text {
  font-size: 44rpx;
  color: #e6d7b8;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: 20rpx;
  font-family: 'LiSu', 'SimLi', serif;
  line-height: 1.3;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.6);
  white-space: nowrap;
}

.recipe-content-vertical {
  width: 470rpx;
  padding: 0 0 60rpx;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  height: 700rpx;
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

.start-btn-container {
  display: flex;
  justify-content: center;
  padding: 0 40rpx 60rpx;
  width: 100%;
}

.start-btn {
  width: 400rpx;
  height: 100rpx;
  background-image: url('https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/begin.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: #333;
  font-size: 45rpx;
  font-weight: bold;
  font-family: 'LiSu', 'SimLi', serif;
  border: none;
  background-color: #f6f2e9;
  padding-top: -25rpx;
}

.start-btn::after {
  border: none;
}

.start-btn:active {
  background-image: url('https://dream-back-to-song.oss-cn-hangzhou.aliyuncs.com/static/begin.jpg');
  background-size: contain;
  transform: scale(0.98);
}
</style>

