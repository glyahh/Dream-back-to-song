<template>
  <view class="page-wrap">
    <image class="page-bg" src="/static/login-bg.png" mode="aspectFill" />
    <view class="login-card">
      <view class="card-header">
        <text class="back" @click="goBack">←</text>
        <text class="login-title">手机号登录</text>
      </view>

      <view class="field">
        <text class="field-label">手机号码</text>
        <view class="field-input-row">
          <text class="field-prefix">+86</text>
          <input
            class="field-input"
            type="number"
            maxlength="11"
            v-model="phone"
            placeholder="请输入手机号"
            placeholder-class="placeholder"
          />
        </view>
      </view>

      <view class="field">
        <text class="field-label">短信验证码</text>
        <view class="field-input-row">
          <input
            class="field-input"
            type="number"
            maxlength="6"
            v-model="code"
            placeholder="请输入验证码"
            placeholder-class="placeholder"
          />
          <view
            class="code-btn"
            :class="{ disabled: counting || !validPhone }"
            @click="sendCode"
          >
            {{ counting ? (countDown + 's') : '获取验证码' }}
          </view>
        </view>
      </view>

      <button
        class="primary-btn"
        :class="{ 'primary-btn--disabled': !validPhone || !validCode }"
        :disabled="!validPhone || !validCode"
        @click="confirmLogin"
      >
        登录
      </button>

      <view class="back-login" @click="backToLogin">
        返回登录
      </view>
    </view>
  </view>
</template>

<script>
import { getUserProfile, saveUserProfile } from '@/utils/userProfile.js'
import { sendVerifyCode, verifyCode } from '@/utils/auth.js'

export default {
  data() {
    return {
      phone: '',
      code: '',
      counting: false,
      countDown: 60,
      timer: null,
    }
  },
  computed: {
    validPhone() {
      return /^1\d{10}$/.test(this.phone)
    },
    validCode() {
      return this.code && this.code.length === 6
    },
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    backToLogin() {
      // 防止出现无法返回的情况：直接回到登录首页
      uni.reLaunch({
        url: '/pages/index/index',
      })
    },
    async sendCode() {
      if (this.counting || !this.validPhone) return
      try {
        await sendVerifyCode(this.phone)
        uni.showToast({
          title: '验证码已发送',
          icon: 'none',
        })
        this.counting = true
        this.countDown = 60
        this.timer = setInterval(() => {
          this.countDown -= 1
          if (this.countDown <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.counting = false
          }
        }, 1000)
      } catch (e) {
        uni.showToast({
          title: '发送失败，请稍后重试',
          icon: 'none',
        })
      }
    },
    async confirmLogin() {
      if (!this.validPhone) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
        return
      }
      if (!this.validCode) {
        uni.showToast({ title: '请输入 6 位验证码', icon: 'none' })
        return
      }
      // 预留后端验证码校验接口
      try {
        await verifyCode(this.phone, this.code)
      } catch (e) {
        uni.showToast({ title: '验证码错误或已失效', icon: 'none' })
        return
      }
      // 保存当前手机号到本地资料，供一键登录界面展示
      try {
        const base = getUserProfile()
        saveUserProfile({
          ...base,
          phone: this.phone,
        })
      } catch (e) {
        // 本地存储失败可以忽略，不影响后续跳转
      }
      uni.showToast({ title: '登录成功（示意）', icon: 'success' })
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/main_index/main_index',
        })
      }, 600)
    },
  },
}
</script>

<style scoped>
.page-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #dfe6d7 0%, #d0ddc7 60%, #c8d5be 100%);
  min-height: 100vh;
  position: relative;
}

.page-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.login-card {
  width: 86%;
  max-width: 680rpx;
  background-color: #ebeae1;
  border-radius: 32rpx;
  padding: 64rpx 56rpx 80rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 180rpx;
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.16);
  z-index: 1;
}

.card-header {
  margin-bottom: 40rpx;
  flex-direction: row;
  display: flex;
  align-items: center;
}

.back {
  font-size: 34rpx;
  color: #666;
  margin-right: 12rpx;
}

.login-title {
  font-size: 40rpx;
  color: #111111;
  font-weight: 600;
  letter-spacing: 4rpx;
}

.field {
  margin-bottom: 26rpx;
}

.field-label {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 10rpx;
  display: block;
}

.field-input-row {
  flex-direction: row;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 10rpx 16rpx;
}

.field-prefix {
  font-size: 26rpx;
  color: #333;
  margin-right: 10rpx;
}

.field-input {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.placeholder {
  color: #b0b0b0;
}

.code-btn {
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 22rpx;
}

.code-btn.disabled {
  background-color: #cfd4c0;
}

.primary-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 48rpx;
  background-color: #9ea97f;
  color: #ffffff;
  font-size: 30rpx;
  text-align: center;
  margin-top: 20rpx;
  border: none;
  letter-spacing: 4rpx;
}

.primary-btn--disabled {
  background-color: #cfd4c0;
}

.back-login {
  margin-top: 26rpx;
  text-align: center;
  font-size: 26rpx;
  color: #b0b0b0;
}
</style>

