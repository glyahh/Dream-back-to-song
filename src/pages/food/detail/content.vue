<template>
  <view class="experience-page content-page">
    <view class="nav-bar">
      <button class="back-btn" aria-label="返回" @click="goBack"><text class="back-icon">‹</text></button>
      <text class="nav-title">食谱</text>
      <view class="nav-spacer" />
    </view>

    <view v-if="food" class="content">
      <view class="dish-hero">
        <view class="image-circle">
          <image class="food-image" :src="food.image" :alt="food.name" mode="aspectFill" />
        </view>
        <view class="name-plaque"><text class="food-name">{{ food.name }}</text></view>
      </view>
      <text class="example">{{ food.example }} · {{ food.servings }}</text>
      <text class="summary">{{ food.summary }}</text>

      <view class="section">
        <text class="section-title">食材</text>
        <view class="ingredients">
          <text v-for="ingredient in food.ingredients" :key="ingredient" class="ingredient">{{ ingredient }}</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">制作步骤</text>
        <view v-for="(step, index) in food.steps" :key="index" class="step">
          <text class="step-title">{{ index + 1 }} · {{ step.title }}</text>
          <text class="step-text">{{ step.text }}</text>
        </view>
      </view>

      <view class="making-entry">
        <text v-if="progressError" class="progress-error">{{ progressError }}</text>
        <button class="experience-action making-btn" @click="startMaking">{{ makingLabel }}</button>
      </view>
    </view>

    <view v-else class="empty-state">
      <text class="empty-title">内容不存在</text>
      <button class="experience-action return-btn" @click="goToFood">返回饮食</button>
    </view>
  </view>
</template>

<script>
import { foodContents } from '@/utils/foodContents.js'
import { getFoodMakingProgress } from '@/utils/foodMakingProgress.js'

export default {
  data() {
    return { food: null, progress: null, progressError: '' }
  },
  onLoad(options) {
    this.food = foodContents.find((food) => food.key === options.key) || null
  },
  onShow() {
    if (!this.food) return
    try {
      this.progress = getFoodMakingProgress(this.food)
      this.progressError = ''
    } catch {
      this.progress = null
      this.progressError = '进度读取失败'
    }
  },
  computed: {
    makingLabel() {
      if (this.progressError) return '进入制作'
      if (this.progress?.completed) return '查看结果'
      return this.progress ? '继续制作' : '开始制作'
    },
  },
  methods: {
    startMaking() {
      uni.navigateTo({ url: `/pages/food/making/guide?key=${this.food.key}` })
    },
    goBack() {
      const url = this.food
        ? `/pages/food/category/${this.food.category}`
        : '/pages/food/index'
      if (getCurrentPages().length === 1) {
        uni.redirectTo({ url })
        return
      }
      uni.navigateBack({ delta: 1, fail: () => uni.redirectTo({ url }) })
    },
    goToFood() {
      uni.redirectTo({ url: '/pages/food/index' })
    },
  },
}
</script>

<style scoped src="../../../styles/experience.css"></style>

<style scoped>
.content {
  max-width: 720px;
  margin: 0 auto;
  padding: 40rpx 32rpx calc(60rpx + env(safe-area-inset-bottom));
}

.dish-hero {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 28rpx 28rpx 0;
}

.image-circle {
  width: 400rpx;
  height: 400rpx;
  max-width: 400px;
  max-height: 400px;
  border: 15rpx solid #f0e6d3;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
}

.food-image {
  display: block;
  width: 100%;
  height: 100%;
}

.name-plaque {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx 16rpx;
  border: 4rpx solid #c8b69a;
  border-radius: 12rpx;
  background: #5d4f3a;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}

.food-name {
  color: #e6d7b8;
  font-size: 44rpx;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 16rpx;
  line-height: 1.3;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

.example,
.summary,
.section-title,
.step-title,
.step-text {
  display: block;
}

.example {
  margin: 12rpx 0 24rpx;
  font-size: 28rpx;
  text-align: center;
}

.summary,
.ingredient,
.step-text {
  font-size: 32rpx;
  line-height: 1.8;
  font-family: 'KaiTi', 'SimKai', 'STKaiti', serif;
}

.summary {
  padding: 0 12rpx;
}

.section {
  margin-top: 32rpx;
  padding: 30rpx;
  border: 4rpx solid #c8b69a;
  border-radius: 20rpx;
  background: #fff;
}

.section-title {
  margin-bottom: 24rpx;
  font-size: 40rpx;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 6rpx;
}

.ingredients {
  display: flex;
  flex-wrap: wrap;
}

.ingredient {
  width: 50%;
  box-sizing: border-box;
  padding: 6rpx 16rpx 6rpx 0;
}

.step + .step {
  margin-top: 28rpx;
}

.step-title {
  margin-bottom: 10rpx;
  font-size: 34rpx;
  font-family: 'LiSu', 'SimLi', serif;
}

.making-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40rpx;
}

.making-btn {
  width: 400rpx;
  max-width: 100%;
  background-size: contain;
  font-size: 45rpx;
}
</style>
