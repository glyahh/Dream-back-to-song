<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">意见反馈</text>
      <text class="nav-sub">一起把这幅宋朝画卷画得更好</text>
    </view>

    <scroll-view class="scroll" scroll-y>
      <view class="card">
        <view class="section">
          <text class="section-title">本次体验感受</text>
          <view class="rate-row">
            <text
              v-for="n in 5"
              :key="n"
              class="rate-item"
              :class="{ active: n <= rate }"
              @click="setRate(n)"
            >
              ★
            </text>
            <text class="rate-text">{{ rateText }}</text>
          </view>
        </view>

        <view class="section">
          <text class="section-title">反馈类型</text>
          <view class="tag-row">
            <view
              v-for="tag in tags"
              :key="tag"
              class="tag"
              :class="{ active: form.tags.includes(tag) }"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </view>
          </view>
        </view>

        <view class="section">
          <text class="section-title">具体描述</text>
          <textarea
            class="textarea"
            v-model="form.content"
            maxlength="300"
            placeholder="可以写下你喜欢/不喜欢的部分、希望新增的功能，或是你心中理想的宋朝体验……"
            placeholder-class="textarea-placeholder"
          />
          <text class="counter">{{ form.content.length }}/300</text>
        </view>

        <view class="section">
          <text class="section-title">联系方式（选填）</text>
          <input
            class="input"
            v-model="form.contact"
            placeholder="邮箱 / 微信号 / 手机号，方便我们与你取得联系"
            placeholder-class="textarea-placeholder"
          />
        </view>

        <button class="btn primary" @click="submit">提交反馈</button>
      </view>

      <view v-if="history.length" class="history">
        <text class="history-title">最近反馈</text>
        <view
          v-for="item in history"
          :key="item.id"
          class="history-item"
        >
          <text class="history-time">{{ item.time }}</text>
          <text class="history-content">{{ item.content }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      rate: 5,
      tags: ['界面设计', '交互体验', '内容建议', '功能需求', '性能问题'],
      form: {
        tags: [],
        content: '',
        contact: '',
      },
      history: [],
    }
  },
  computed: {
    rateText() {
      const map = {
        1: '略显生硬',
        2: '还有提升空间',
        3: '整体还不错',
        4: '已经很喜欢',
        5: '仿佛真的在宋朝',
      }
      return map[this.rate] || ''
    },
  },
  onLoad() {
    this.initHistory()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initHistory() {
      try {
        const stored = uni.getStorageSync('me_feedback_history')
        if (Array.isArray(stored)) {
          this.history = stored
        }
      } catch (e) {
        // ignore
      }
    },
    saveHistory() {
      try {
        uni.setStorageSync('me_feedback_history', this.history.slice(0, 5))
      } catch (e) {
        // ignore
      }
    },
    setRate(n) {
      this.rate = n
    },
    toggleTag(tag) {
      const exists = this.form.tags.includes(tag)
      this.form.tags = exists
        ? this.form.tags.filter((t) => t !== tag)
        : this.form.tags.concat(tag)
    },
    submit() {
      if (!this.form.content.trim()) {
        uni.showToast({ title: '请写一点具体内容', icon: 'none' })
        return
      }
      const now = new Date()
      const time = `${now.getFullYear()}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${now
        .getDate()
        .toString()
        .padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
      const record = {
        id: `f_${Date.now()}`,
        time,
        rate: this.rate,
        tags: this.form.tags,
        content: this.form.content.trim(),
        contact: this.form.contact.trim(),
      }
      this.history.unshift(record)
      this.saveHistory()
      this.form = { tags: [], content: '', contact: '' }
      this.rate = 5
      uni.showToast({ title: '感谢你的反馈', icon: 'success' })
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

.scroll {
  height: calc(100vh - 180rpx);
}

.card {
  margin: 10rpx 30rpx 20rpx;
  padding: 22rpx 24rpx 24rpx;
  border-radius: 20rpx;
  background-color: #fbf8f2;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
}

.section {
  margin-bottom: 18rpx;
}

.section-title {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 10rpx;
}

.rate-row {
  flex-direction: row;
  display: flex;
  align-items: center;
}

.rate-item {
  font-size: 32rpx;
  color: #d0c3a6;
  margin-right: 4rpx;
}

.rate-item.active {
  color: #f0b54a;
}

.rate-text {
  margin-left: 12rpx;
  font-size: 24rpx;
  color: #7a7a7a;
}

.tag-row {
  flex-wrap: wrap;
  display: flex;
  gap: 10rpx;
}

.tag {
  font-size: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 999rpx;
  background-color: #f0ebe1;
  color: #666;
}

.tag.active {
  background-color: #9ea97f;
  color: #fff;
}

.textarea {
  width: 100%;
  min-height: 160rpx;
  border-radius: 16rpx;
  background-color: #fff;
  padding: 14rpx 16rpx;
  font-size: 24rpx;
  box-sizing: border-box;
}

.textarea-placeholder {
  color: #b0b0b0;
}

.counter {
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #999;
  text-align: right;
}

.input {
  width: 100%;
  border-radius: 16rpx;
  background-color: #fff;
  padding: 14rpx 16rpx;
  font-size: 24rpx;
  box-sizing: border-box;
}

.btn.primary {
  width: 100%;
  margin-top: 8rpx;
  padding: 12rpx 0;
  border-radius: 999rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 26rpx;
}

.history {
  padding: 0 30rpx 26rpx;
}

.history-title {
  font-size: 24rpx;
  color: #7a7a7a;
  margin-bottom: 8rpx;
}

.history-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 12rpx 14rpx;
  margin-bottom: 10rpx;
}

.history-time {
  font-size: 22rpx;
  color: #b0b0b0;
  margin-bottom: 4rpx;
  display: block;
}

.history-content {
  font-size: 24rpx;
  color: #555;
  line-height: 1.6;
}
</style>

