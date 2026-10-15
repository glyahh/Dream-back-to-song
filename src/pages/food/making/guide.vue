<template>
  <view class="experience-page guide-page">
    <view class="nav-bar">
      <button class="back-btn" aria-label="返回详情" @click="goBack"><text class="back-icon">‹</text></button>
      <text class="nav-title">{{ progress?.completed ? '制作完成' : '制作步骤' }}</text>
      <view class="nav-spacer" />
    </view>

    <view v-if="!food" class="empty-state">
      <text class="empty-title">内容不存在</text>
      <button class="experience-action primary-btn" @click="goBack">返回饮食</button>
    </view>

    <view v-else-if="!progress" class="empty-state">
      <text class="storage-error" role="alert">{{ storageError }}</text>
      <button class="experience-action primary-btn retry-load" @click="loadProgress">重试</button>
    </view>

    <view v-else class="guide-content">
      <view v-if="progress.completed" class="completion">
        <text class="complete-icon" aria-hidden="true">✓</text>
        <text class="completion-title">{{ food.name }}制作完成</text>
        <view class="complete-image-container">
          <image class="food-image" :src="food.image" :alt="food.name" mode="aspectFit" />
        </view>
      </view>

      <view v-else class="step-panel">
        <text class="guide-food-name">{{ food.name }}</text>
        <text class="step-count">第 {{ progress.stepIndex + 1 }} / {{ food.steps.length }} 步</text>
        <view class="step-image-container">
          <image class="food-image" :src="food.image" :alt="food.name" mode="aspectFit" />
        </view>
        <view class="step-description">
          <text class="current-step-title">{{ currentStep.title }}</text>
          <text class="current-step-text">{{ currentStep.text }}</text>
        </view>
      </view>

      <text v-if="storageError" class="storage-error" role="alert">{{ storageError }}</text>

      <view v-if="progress.completed" class="actions">
        <button class="experience-action secondary-btn return-detail" @click="goBack">返回详情</button>
        <button class="experience-action primary-btn restart-making" @click="restartMaking">重新制作</button>
      </view>
      <view v-else class="actions">
        <button v-if="progress.stepIndex > 0" class="experience-action secondary-btn previous-step" @click="moveStep(-1)">上一步</button>
        <button v-if="isLastStep" class="experience-action primary-btn complete-making" @click="completeMaking">完成</button>
        <button v-else class="experience-action primary-btn next-step" @click="moveStep(1)">下一步</button>
      </view>
    </view>
  </view>
</template>

<script>
import { foodContents } from '@/utils/foodContents.js'
import { getFoodMakingProgress, saveFoodMakingProgress } from '@/utils/foodMakingProgress.js'

export default {
  data() {
    return { food: null, progress: null, storageError: '' }
  },
  onLoad(options) {
    this.food = foodContents.find((food) => food.key === options.key) || null
    if (this.food) this.loadProgress()
  },
  computed: {
    currentStep() {
      return this.food.steps[this.progress.stepIndex]
    },
    isLastStep() {
      return this.progress.stepIndex === this.food.steps.length - 1
    },
  },
  methods: {
    loadProgress() {
      try {
        const saved = getFoodMakingProgress(this.food)
        this.progress = saved || { stepIndex: 0, completed: false }
        this.storageError = ''
        if (!saved) this.persistProgress(this.progress)
      } catch {
        this.progress = null
        this.storageError = '进度读取失败，请重试'
      }
    },
    persistProgress(progress) {
      try {
        saveFoodMakingProgress(this.food, progress)
        this.progress = progress
        this.storageError = ''
      } catch {
        this.storageError = '进度未保存，请重试'
      }
    },
    moveStep(offset) {
      if (this.progress.completed) return
      const stepIndex = this.progress.stepIndex + offset
      if (stepIndex >= 0 && stepIndex < this.food.steps.length) {
        this.persistProgress({ stepIndex, completed: false })
      }
    },
    completeMaking() {
      if (this.isLastStep && !this.progress.completed) {
        this.persistProgress({ stepIndex: this.progress.stepIndex, completed: true })
      }
    },
    restartMaking() {
      if (this.progress.completed) this.persistProgress({ stepIndex: 0, completed: false })
    },
    goBack() {
      const url = this.food
        ? `/pages/food/detail/content?key=${this.food.key}`
        : '/pages/food/index'
      const pages = getCurrentPages()
      const previous = pages[pages.length - 2]
      if (this.food && previous?.route === 'pages/food/detail/content' && previous.options?.key === this.food.key) {
        uni.navigateBack({ delta: 1, fail: () => uni.redirectTo({ url }) })
      } else {
        uni.redirectTo({ url })
      }
    },
  },
}
</script>

<style scoped src="../../../styles/experience.css"></style>

<style scoped>
.guide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  max-width: 720px;
  margin: 0 auto;
  padding: 40rpx 30rpx calc(60rpx + env(safe-area-inset-bottom));
}

.step-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.guide-food-name {
  font-size: 32rpx;
  font-family: 'LiSu', 'SimLi', serif;
}

.step-count {
  margin: 20rpx 0 36rpx;
  font-size: 44rpx;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 6rpx;
}

.step-image-container,
.complete-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  max-width: 100%;
  max-height: 500px;
  border: 4rpx solid #c8b69a;
  border-radius: 20rpx;
  background: #fff;
  overflow: hidden;
}

.step-image-container {
  width: 600rpx;
  height: 500rpx;
  margin-bottom: 40rpx;
}

.food-image {
  display: block;
  width: 100%;
  height: 100%;
}

.step-description {
  box-sizing: border-box;
  width: 600rpx;
  max-width: 100%;
  min-height: 120rpx;
  margin-bottom: 40rpx;
  padding: 30rpx;
  border: 4rpx solid #c8b69a;
  border-radius: 20rpx;
  background: #fff;
  text-align: center;
}

.current-step-title,
.current-step-text {
  display: block;
}

.current-step-title {
  margin-bottom: 16rpx;
  font-size: 38rpx;
  font-family: 'LiSu', 'SimLi', serif;
}

.current-step-text {
  font-size: 36rpx;
  font-family: 'KaiTi', 'SimKai', 'STKaiti', serif;
  line-height: 1.7;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
  width: 600rpx;
  max-width: 100%;
}

.actions .experience-action {
  width: 260rpx;
  max-width: 48%;
}

.next-step:only-child {
  margin-left: auto;
}

.completion {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 40rpx;
}

.complete-icon {
  margin-bottom: 24rpx;
  color: #9ea97f;
  font-size: 120rpx;
}

.completion-title {
  margin-bottom: 40rpx;
  font-size: 44rpx;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 6rpx;
  text-align: center;
}

.complete-image-container {
  width: 500rpx;
  height: 500rpx;
  margin-bottom: 60rpx;
}
</style>
