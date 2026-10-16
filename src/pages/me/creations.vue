<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">我的创作</text>
      <text class="nav-sub">宋风灵感手记</text>
    </view>

    <scroll-view class="scroll" scroll-y>
      <view class="summary-card">
        <view class="summary-line">
          <text class="summary-number">{{ creations.length }}</text>
          <text class="summary-label">篇创作 · 记录宋风灵感</text>
        </view>
        <view class="summary-tags">
          <text class="tag">#服饰稿样</text>
          <text class="tag">#宋画临摹</text>
          <text class="tag">#食单配方</text>
        </view>
        <view class="summary-btn" @click="openEditor">+ 新建创作</view>
      </view>

      <view class="creation-list">
        <view
          v-for="item in creations"
          :key="item.id"
          class="creation-card"
          @click="preview(item)"
        >
          <view class="creation-header">
            <text class="creation-title">{{ item.title }}</text>
            <text class="creation-type">{{ item.type }}</text>
          </view>
          <text class="creation-content" decode>{{ item.excerpt }}</text>
          <view class="creation-footer">
            <text class="creation-time">{{ item.time }}</text>
            <view class="creation-meta">
              <text class="meta-item">✏️ {{ item.words }} 字</text>
              <text class="meta-item">🌙 {{ item.mood }}</text>
            </view>
          </view>
        </view>
        <view v-if="!creations.length" class="empty">
          <text class="empty-title">还没有创作</text>
          <text class="empty-desc">可以从一件衣、一盏茶、一幅画开始写起。</text>
        </view>
      </view>
    </scroll-view>

    <!-- 底部创作编辑弹层 -->
    <view v-if="showEditor" class="editor-mask" @click="closeEditor">
      <view class="editor-panel" @click.stop>
        <view class="editor-header">
          <text class="editor-title">新建创作</text>
          <text class="editor-close" @click="closeEditor">×</text>
        </view>
        <view class="editor-body">
          <input
            class="editor-input"
            v-model="form.title"
            placeholder="给这篇小记起个名字"
            placeholder-class="editor-placeholder"
          />
          <picker
            mode="selector"
            :range="typeOptions"
            :value="typeIndex"
            @change="onTypeChange"
          >
            <view class="editor-picker">
              <text class="picker-label">创作类型</text>
              <text class="picker-value">{{ form.type || '点击选择' }}</text>
            </view>
          </picker>
          <textarea
            class="editor-textarea"
            v-model="form.content"
            maxlength="400"
            placeholder="记录一段与你心中宋朝有关的灵感、画面或片段……"
            placeholder-class="editor-placeholder"
          />
          <view class="editor-counter">
            {{ form.content.length }}/400
          </view>
        </view>
        <view class="editor-footer">
          <button class="btn ghost" @click="closeEditor">暂不保存</button>
          <button class="btn primary" @click="submit">保存创作</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { creationTypes, getLocalCreations, saveLocalCreations, createLocalCreation } from '@/utils/localCreations.js'
export default {
  data() {
    return {
      creations: [],
      creationsLoaded: false,
      showEditor: false,
      form: {
        title: '',
        type: '',
        content: '',
      },
      typeOptions: creationTypes,
      typeIndex: 0,
    }
  },
  onShow() {
    this.initCreations()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initCreations() {
      try {
        this.creations = getLocalCreations()
        this.creationsLoaded = true
      } catch {
        this.creationsLoaded = false
        uni.showToast({ title: '创作读取失败，请重新打开', icon: 'none' })
      }
    },
    persist(creations) {
      if (!this.creationsLoaded) {
        uni.showToast({ title: '请先重新打开页面读取创作', icon: 'none' })
        return false
      }
      try {
        saveLocalCreations(creations)
        this.creations = creations
        return true
      } catch {
        uni.showToast({ title: '创作未保存，请重试', icon: 'none' })
        return false
      }
    },
    openEditor() {
      this.form = {
        title: '',
        type: '',
        content: '',
      }
      this.showEditor = true
    },
    closeEditor() {
      this.showEditor = false
    },
    onTypeChange(e) {
      const index = Number(e.detail.value || 0)
      this.typeIndex = index
      this.form.type = this.typeOptions[index]
    },
    submit() {
      if (!this.form.title.trim()) {
        uni.showToast({ title: '请填写标题', icon: 'none' })
        return
      }
      if (!this.form.type) {
        uni.showToast({ title: '请选择创作类型', icon: 'none' })
        return
      }
      if (!this.form.content.trim()) {
        uni.showToast({ title: '请写一点内容', icon: 'none' })
        return
      }
      try {
        if (this.persist([createLocalCreation(this.form), ...this.creations])) {
          this.showEditor = false
          uni.showToast({ title: '已保存', icon: 'success' })
        }
      } catch (error) { uni.showToast({ title: error.message, icon: 'none' }) }
    },
    preview(item) {
      uni.showModal({
        title: item.title,
        content: item.content || item.excerpt,
        showCancel: false,
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

.scroll {
  height: calc(100vh - 180rpx);
}

.summary-card {
  margin: 10rpx 30rpx 20rpx;
  padding: 24rpx 26rpx 20rpx;
  border-radius: 20rpx;
  background-color: #fbf8f2;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.04);
}

.summary-line {
  display: flex;
  align-items: baseline;
  margin-bottom: 10rpx;
}

.summary-number {
  font-size: 40rpx;
  color: #9ea97f;
  font-weight: 600;
  margin-right: 10rpx;
}

.summary-label {
  font-size: 24rpx;
  color: #666;
}

.summary-tags {
  margin-bottom: 14rpx;
}

.tag {
  font-size: 22rpx;
  color: #9ea97f;
  background-color: rgba(158, 169, 127, 0.08);
  padding: 4rpx 14rpx;
  border-radius: 999rpx;
  margin-right: 8rpx;
}

.summary-btn {
  margin-top: 2rpx;
  align-self: flex-start;
  padding: 8rpx 20rpx;
  border-radius: 24rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 24rpx;
  text-align: center;
  display: inline-block;
}

.creation-list {
  padding: 0 30rpx 30rpx;
}

.creation-card {
  background-color: #fff;
  border-radius: 18rpx;
  padding: 20rpx 22rpx 18rpx;
  margin-bottom: 18rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
}

.creation-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.creation-title {
  flex: 1;
  font-size: 28rpx;
  color: #333;
}

.creation-type {
  font-size: 22rpx;
  color: #9ea97f;
  padding: 4rpx 12rpx;
  border-radius: 999rpx;
  background-color: rgba(158, 169, 127, 0.08);
}

.creation-content {
  font-size: 24rpx;
  color: #555;
  line-height: 1.7;
  margin-bottom: 14rpx;
}

.creation-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.creation-time {
  font-size: 22rpx;
  color: #b0b0b0;
}

.creation-meta {
  display: flex;
  gap: 12rpx;
}

.meta-item {
  font-size: 22rpx;
  color: #888;
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

.editor-mask {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
}

.editor-panel {
  width: 100%;
  background-color: #fbf8f2;
  border-radius: 30rpx 30rpx 0 0;
  padding: 24rpx 30rpx 30rpx;
  box-sizing: border-box;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.editor-title {
  font-size: 30rpx;
  color: #333;
  font-weight: 600;
}

.editor-close {
  font-size: 32rpx;
  color: #999;
}

.editor-body {
  margin-top: 4rpx;
}

.editor-input {
  width: 100%;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 16rpx 18rpx;
  font-size: 26rpx;
  margin-bottom: 14rpx;
  box-sizing: border-box;
}

.editor-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 14rpx 18rpx;
  margin-bottom: 14rpx;
}

.picker-label {
  font-size: 24rpx;
  color: #666;
}

.picker-value {
  font-size: 24rpx;
  color: #333;
}

.editor-textarea {
  width: 100%;
  min-height: 180rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 16rpx 18rpx;
  font-size: 24rpx;
  box-sizing: border-box;
}

.editor-placeholder {
  color: #b0b0b0;
}

.editor-counter {
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #999;
  text-align: right;
}

.editor-footer {
  margin-top: 16rpx;
  display: flex;
  justify-content: flex-end;
  gap: 16rpx;
}

.btn {
  padding: 8rpx 24rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
}

.btn.ghost {
  background-color: transparent;
  color: #666;
  border: 1rpx solid #ccc;
}

.btn.primary {
  background-color: #9ea97f;
  color: #fff;
}
</style>

