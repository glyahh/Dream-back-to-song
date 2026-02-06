<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">编辑资料</text>
      <text class="nav-sub">留下与你宋朝相遇的一点痕迹</text>
    </view>

    <view class="card">
      <view class="avatar-row">
        <view class="avatar-label">头像</view>
        <image class="avatar-img" :src="form.avatar" mode="aspectFill" />
        <button class="avatar-btn" type="default" size="mini" @click="changeAvatar">
          更换
        </button>
      </view>

      <view class="field">
        <text class="field-label">昵称</text>
        <input
          class="field-input"
          v-model="form.nickname"
          maxlength="16"
          placeholder="请输入昵称"
          placeholder-class="placeholder"
        />
      </view>

      <view class="field">
        <text class="field-label">一句话签名</text>
        <textarea
          class="field-textarea"
          v-model="form.bio"
          maxlength="40"
          placeholder="可以写一写此刻心情或与宋朝的缘分"
          placeholder-class="placeholder"
          auto-height
        />
        <view class="counter">{{ form.bio.length }}/40</view>
      </view>
    </view>

    <button class="save-btn" @click="handleSave">保存</button>
  </view>
</template>

<script>
import { getUserProfile, saveUserProfile } from '@/utils/userProfile.js'

export default {
  data() {
    return {
      form: {
        nickname: '',
        avatar: '/static/avatar.png',
        bio: '',
      },
      presetAvatars: [
        '/static/touxiang/touxiang1.png',
        '/static/touxiang/touxiang2.png',
        '/static/touxiang/touxiang3.png',
        '/static/touxiang/touxiang4.png',
        '/static/touxiang/touxiang5.png',
        '/static/touxiang/touxiang6.png',
        '/static/touxiang/touxiang7.png',
        '/static/touxiang/touxiang8.png',
        '/static/touxiang/touxiang9.png',
        '/static/touxiang/touxiang10.png',
      ],
    }
  },
  onLoad() {
    const profile = getUserProfile()
    this.form = { ...this.form, ...profile }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    changeAvatar() {
      // 简单做法：从预设头像里随机换一个；如果需要可以改为弹出选择列表
      const idx = Math.floor(Math.random() * this.presetAvatars.length)
      this.form.avatar = this.presetAvatars[idx]
    },
    validate() {
      if (!this.form.nickname.trim()) {
        uni.showToast({ title: '请填写昵称', icon: 'none' })
        return false
      }
      return true
    },
    handleSave() {
      if (!this.validate()) return
      try {
        saveUserProfile(this.form)
        uni.showToast({ title: '已保存', icon: 'success' })
        setTimeout(() => {
          uni.navigateBack()
        }, 500)
      } catch (e) {
        uni.showToast({ title: '保存失败，请稍后重试', icon: 'none' })
      }
    },
  },
}
</script>

<style scoped>
.page {
  background-color: #f5f0e8;
  min-height: 100vh;
  padding-bottom: 80rpx;
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

.card {
  margin: 20rpx 26rpx 0;
  padding: 26rpx 24rpx 40rpx;
  background-color: #fff;
  border-radius: 18rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
}

.avatar-row {
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar-label {
  font-size: 26rpx;
  color: #333;
  margin-right: 20rpx;
}

.avatar-img {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  border: 4rpx solid rgba(158, 169, 127, 0.3);
}

.avatar-btn {
  padding: 0 24rpx;
  height: 56rpx;
  line-height: 56rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #9ea97f;
  background-color: #f4f6ec;
  border: none;
}

.field {
  margin-top: 18rpx;
}

.field-label {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.field-input {
  padding: 18rpx 20rpx;
  border-radius: 12rpx;
  background-color: #f8f6f2;
  font-size: 26rpx;
  color: #333;
}

.field-textarea {
  padding: 18rpx 20rpx 30rpx;
  border-radius: 12rpx;
  background-color: #f8f6f2;
  font-size: 24rpx;
  color: #333;
  min-height: 140rpx;
}

.placeholder {
  color: #b0b0b0;
}

.counter {
  text-align: right;
  font-size: 22rpx;
  color: #999;
  margin-top: 6rpx;
}

.save-btn {
  margin: 40rpx 40rpx 0;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 999rpx;
  background-color: #9ea97f;
  color: #ffffff;
  font-size: 28rpx;
  border: none;
  letter-spacing: 4rpx;
}
</style>

