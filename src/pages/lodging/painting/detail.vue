<template>
  <view class="experience-page painting-detail-page">
    <view class="nav-bar">
      <button class="back-btn" aria-label="返回名画列表" @click="goBack"><text class="back-icon">‹</text></button>
      <text class="nav-title">名画赏析</text>
      <view class="nav-spacer" />
    </view>

    <view v-if="painting" class="detail-content">
      <button class="painting-frame" :aria-label="'查看' + painting.name + '大图'" @click="previewPainting">
        <image class="painting-image" :src="painting.image" :alt="painting.name" mode="aspectFit" />
        <text class="preview-label">查看大图</text>
      </button>

      <view class="info-section">
        <text class="painting-name">{{ painting.name }}</text>
        <view v-if="painting.facts.length" class="painting-facts">
          <text v-for="fact in painting.facts" :key="fact.label" class="painting-fact">{{ fact.label }}：{{ fact.value }}</text>
        </view>
        <text class="painting-summary">{{ painting.summary }}</text>
      </view>

      <view v-for="highlight in painting.highlights" :key="highlight.title" class="detail-section">
        <text class="section-title">{{ highlight.title }}</text>
        <text class="section-content">{{ highlight.text }}</text>
      </view>
    </view>

    <view v-else class="empty-state">
      <text class="empty-title">内容不存在</text>
      <button class="experience-action" @click="goBack">返回名画列表</button>
    </view>
  </view>
</template>

<script>
import { paintingContents } from '@/utils/paintingContents.js'

export default {
  data() {
    return { painting: null }
  },
  onLoad(options) {
    this.painting = paintingContents.find((painting) => painting.key === options.key) || null
  },
  methods: {
    previewPainting() {
      uni.previewImage({
        current: this.painting.image,
        urls: [this.painting.image],
        fail: () => uni.showToast({ title: '图片暂时无法打开', icon: 'none' }),
      })
    },
    goBack() {
      const url = '/pages/lodging/painting/gallery'
      const pages = getCurrentPages()
      if (pages[pages.length - 2]?.route === 'pages/lodging/painting/gallery') {
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
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 180rpx;
}

.detail-content {
  max-width: 720px;
  margin: 0 auto;
  padding: 40rpx 30rpx calc(40rpx + env(safe-area-inset-bottom));
}

.painting-frame {
  display: block;
  width: 100%;
  margin: 0 0 30rpx;
  padding: 0;
  border: 4rpx solid #c8b69a;
  border-radius: 20rpx;
  background: #fff;
  color: #5a4a42;
  cursor: zoom-in;
  overflow: hidden;
}

.painting-frame::after {
  border: 0;
}

.painting-frame:focus-visible {
  outline: 2px solid #5d4f3a;
  outline-offset: 2px;
}

.painting-image {
  display: block;
  width: 100%;
  height: 500rpx;
  max-height: 500px;
}

.preview-label {
  display: block;
  padding: 12rpx;
  font-size: 28rpx;
  font-family: 'KaiTi', 'SimKai', serif;
  line-height: 1.5;
}

.info-section,
.detail-section {
  margin-bottom: 24rpx;
  padding: 30rpx;
  border: 4rpx solid #c8b69a;
  border-radius: 20rpx;
  background: #fff;
}

.painting-name,
.painting-summary,
.section-title,
.section-content {
  display: block;
}

.painting-name {
  margin-bottom: 20rpx;
  font-size: 42rpx;
  font-family: 'SimSun', 'STSong', serif;
  letter-spacing: 2rpx;
}

.painting-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx 24rpx;
  margin-bottom: 24rpx;
}

.painting-fact {
  font-size: 28rpx;
  line-height: 1.6;
}

.painting-summary,
.section-content {
  font-size: 32rpx;
  font-family: 'KaiTi', 'SimKai', 'STKaiti', serif;
  line-height: 1.8;
}

.section-title {
  margin-bottom: 20rpx;
  font-size: 38rpx;
  font-family: 'LiSu', 'SimLi', serif;
  letter-spacing: 4rpx;
}
</style>
