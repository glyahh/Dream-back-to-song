<template>
  <!-- 
    登录页整体容器
    说明：已去掉开发用说明文案，只保留实际用户看到的登录界面
  -->
  <!-- 整个页面直接是山水背景，不再模拟手机外框、顶部图标或底部横线 -->
  <view class="page-wrap">
    <!-- 使用 <image> 做整页背景，兼容微信小程序（避免在 wxss 里直接引用本地图片） -->
    <image class="page-bg" src="/static/login-bg.png" mode="aspectFill" />
    <!-- 中心白色登录卡片 -->
    <view class="login-card">
        <!-- 登录标题 -->
        <view class="card-header">
          <text class="login-title">登录</text>
        </view>

        <!-- 已识别手机号展示：来自微信授权 / 最近一次登录 -->
        <view class="phone-display">
          <text class="phone-text">{{ maskedPhone }}</text>
        </view>

        <!-- 一键登录按钮：当前版本统一走「手机号 + 验证码」登录。
             第一次点击时提示无法自动获取手机号，并跳转到验证码登录页；
             当已经有手机号记录时，直接一键进入首页。 -->
        <button
          class="primary-btn"
          :class="{ 'primary-btn--disabled': !isAgreed }"
          :disabled="!isAgreed"
          @click="handleOneTapLogin"
        >
          一键登录
        </button>

        <!-- 其他手机号登录 -->
        <view class="alt-phone" @click="handleOtherPhone">
          <text class="alt-phone-text">其他手机号</text>
        </view>

        <!-- 协议勾选 -->
        <view class="agreement-row" @click="toggleAgree">
          <view class="agree-checkbox" :class="{ 'agree-checkbox--checked': isAgreed }">
            <view v-if="isAgreed" class="agree-inner-dot" />
          </view>
          <text class="agreement-text">
            我已阅读并同意
            <text class="link-text" @click.stop="handleOpenUser">《用户协议》</text>
            和
            <text class="link-text" @click.stop="handleOpenPrivacy">《隐私政策》</text>
          </text>
        </view>

        <!-- 第三方登录 -->
        <view class="third-wrap">
          <!-- 一比一还原微信圆形图标按钮（图标建议放置在 /static/icon-wechat.png） -->
          <view class="third-btn wechat-btn" @click="handleWechatLogin">
            <image class="third-img" src="/static/icon-wechat.png" mode="aspectFit" />
          </view>
          <!-- 一比一还原 QQ 圆形图标按钮（图标建议放置在 /static/icon-qq.png） -->
          <view class="third-btn qq-btn" @click="handleQQLogin">
            <image class="third-img" src="/static/icon-qq.png" mode="aspectFit" />
          </view>
        </view>
      </view>
  </view>
</template>

<script>
// 说明：本页面为微信小程序登录原型 UI，在 uni-app 中即可预览交互效果
import { getUserProfile } from '@/utils/userProfile.js'

export default {
  data() {
    return {
      // 当前识别手机号，初始为空，待用户授权后由微信能力或后端写入
      phone: '',
      // 是否已勾选协议
      isAgreed: false,
    }
  },
  onShow() {
    // 从本地资料中读取最近一次登录使用的手机号，在一键登录按钮上方展示
    const profile = getUserProfile()
    this.phone = profile.phone || ''
  },
  computed: {
    // 掩码后的手机号显示，保护隐私
    maskedPhone() {
      if (!this.phone) return ''
      // 简单掩码逻辑：保留前三位和后四位
      return this.phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    },
  },
  methods: {
    // 切换协议勾选
    toggleAgree() {
      this.isAgreed = !this.isAgreed
    },

    // 一键登录点击：
    // - 如果还没有手机号：提示当前无法自动获取微信手机号，引导去短信验证码登录页
    // - 如果已有手机号（用户之前用验证码登陆过）：直接进入首页
    handleOneTapLogin() {
      if (!this.isAgreed) {
        uni.showToast({
          title: '请先阅读并同意协议',
          icon: 'none',
        })
        return
      }
      if (!this.phone) {
        // 第一次点击，无手机号记录：明确告知无法自动获取手机号，引导到验证码登录
        uni.showModal({
          title: '请先绑定手机号',
          content:
            '当前版本暂不支持自动获取微信绑定手机号，请先使用手机号码 + 短信验证码登录。登录成功后，下次即可在此一键登录。',
          confirmText: '去验证码登录',
          success: (res) => {
            if (res.confirm) {
              uni.navigateTo({
                url: '/pages/login/phone',
              })
            }
          },
        })
        return
      }
      // 已有手机号记录，直接完成一键登录
      this.completeLogin()
    },

    // 完成登录：统一的跳转逻辑
    completeLogin() {
      uni.reLaunch({
        url: '/pages/main_index/main_index',
      })
    },

    // 其他手机号登录点击
    handleOtherPhone() {
      // 跳转到手机号 + 验证码登录页
      uni.navigateTo({
        url: '/pages/login/phone',
      })
    },

    // 打开用户协议
    handleOpenUser() {
      uni.showToast({
        title: '打开《用户协议》',
        icon: 'none',
      })
    },

    // 打开隐私政策
    handleOpenPrivacy() {
      uni.showToast({
        title: '打开《隐私政策》',
        icon: 'none',
      })
    },

    // 微信登录点击
    handleWechatLogin() {
      uni.showToast({
        title: '微信登录（示意）',
        icon: 'none',
      })
    },

    // QQ 登录点击
    handleQQLogin() {
      uni.showToast({
        title: 'QQ 登录（示意）',
        icon: 'none',
      })
    },
  },
}
</script>

<style>
/* 页面整体布局：全屏山水背景 + 居中白色卡片，不再出现手机轮廓、顶部图标和底部横线 */
.page-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 40rpx 20rpx;
  box-sizing: border-box;
  /* 使用渐变做基础底色，真正的山水纹理由 page-bg 图片承担，避免 wxss 直接引用本地图片 */
  background: linear-gradient(180deg, #dfe6d7 0%, #d0ddc7 60%, #c8d5be 100%);
  min-height: 100vh;
  position: relative;
}

/* 整页背景图，放在内容下层，兼容微信小程序 */
.page-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* 中心白色登录卡片，宽度和圆角与设计稿一致 */
.login-card {
  width: 86%;
  max-width: 680rpx;
  /* 略带一点米黄色的灰白，贴近示例图中的卡片底色 */
  background-color: #ebeae1;
  border-radius: 32rpx;
  /* 加大上下内边距，使卡片整体更“长”一些 */
  padding: 64rpx 56rpx 96rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 让卡片整体略微下移，贴近示例图位置比例，可按需微调 */
  margin-top: 180rpx;
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.16);
  z-index: 1;
}

.card-header {
  align-self: flex-start;
  margin-bottom: 56rpx;
}

.login-title {
  /* 模拟示例图中偏宋体 / 仿宋的标题感觉 */
  font-size: 44rpx;
  color: #111111;
  font-weight: 600;
  letter-spacing: 4rpx;
  line-height: 1.4;
}

.phone-display {
  margin-bottom: 80rpx;
}

.phone-text {
  font-size: 34rpx;
  /* 稍大的字间距，贴近示例中稀疏的数字排布 */
  letter-spacing: 8rpx;
  color: #111111;
  font-weight: 500;
}

/* 主按钮：一键登录 */
.primary-btn {
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  border-radius: 48rpx;
  background-color: #9ea97f;
  color: #ffffff;
  font-size: 30rpx;
  text-align: center;
  margin-bottom: 32rpx;
  border: none;
  letter-spacing: 4rpx;
}

.primary-btn.button-hover {
  opacity: 0.9;
}

.primary-btn--disabled {
  background-color: #cfd4c0;
}

/* 其他手机号 */
.alt-phone {
  margin-bottom: 56rpx;
}

.alt-phone-text {
  font-size: 26rpx;
  color: #b0b0b0;
}

/* 协议勾选区域 */
.agreement-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 72rpx;
}

.agree-checkbox {
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  border-width: 2rpx;
  border-style: solid;
  border-color: #c6c6c6;
  margin-right: 16rpx;
  justify-content: center;
  align-items: center;
  display: flex;
}

.agree-checkbox--checked {
  border-color: #9ea97f;
  background-color: #9ea97f;
}

.agree-inner-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background-color: #ffffff;
}

.agreement-text {
  flex: 1;
  font-size: 22rpx;
  color: #666666;
  line-height: 1.6;
}

.link-text {
  color: #9ea97f;
}

/* 第三方登录图标区域（参考示例图：底部两个等间距圆形按钮） */
.third-wrap {
  margin-top: 40rpx;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
}

.third-btn {
  /* 略大一点的圆形，接近示例图比例 */
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  margin: 0 60rpx;
  align-items: center;
  justify-content: center;
  display: flex;
  /* 与登录卡片背景色、主按钮同一色值，保证色块完全一致 */
  background-color: #9ea97f;
  /* 去掉明显阴影，让按钮更扁平简洁 */
  box-shadow: none;
}

/* 微信圆形按钮：与登录卡片背景色保持一致 */
.wechat-btn {
  background-color: #9ea97f;
}

/* QQ 圆形按钮：与登录卡片背景色保持一致 */
.qq-btn {
  background-color: #9ea97f;
}

/* 图标图片尺寸：靠近示例图的白色图标占比 */
.third-img {
  /* 再放大一圈，让微信 / QQ 图标在圆形内部更饱满醒目 */
  width: 95rpx;
  height: 95rpx;
}

/* 小屏设备上同样保持居中，无额外布局变化 */
@media screen and (max-width: 750px) {
  .page-wrap {
    flex-direction: row;
    align-items: center;
  }
}
</style>
