<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">设置</text>
      <text class="nav-sub">按自己的节奏使用这幅画卷</text>
    </view>

    <view class="section">
      <view class="item">
        <view class="item-main">
          <text class="item-title">消息通知</text>
          <text class="item-desc">有新互动、新订单时提醒我</text>
        </view>
        <switch :checked="settings.notify" @change="onToggle('notify', $event)" color="#9ea97f" />
      </view>

      <view class="item">
        <view class="item-main">
          <text class="item-title">声音提示</text>
          <text class="item-desc">推送消息时播放提示音</text>
        </view>
        <switch :checked="settings.sound" @change="onToggle('sound', $event)" color="#9ea97f" />
      </view>

      <view class="item">
        <view class="item-main">
          <text class="item-title">节省流量模式</text>
          <text class="item-desc">在移动网络下减少大图与动效</text>
        </view>
        <switch :checked="settings.dataSaver" @change="onToggle('dataSaver', $event)" color="#9ea97f" />
      </view>
    </view>

    <view class="section">
      <view class="item" @click="clearCache">
        <view class="item-main">
          <text class="item-title">清理本地缓存</text>
          <text class="item-desc">包括浏览记录、临时图片等</text>
        </view>
        <text class="item-extra">约 {{ cacheSize }} MB</text>
      </view>
      <view class="item" @click="about">
        <view class="item-main">
          <text class="item-title">关于「梦回宋朝」</text>
          <text class="item-desc">项目说明与致谢</text>
        </view>
        <text class="arrow">→</text>
      </view>
    </view>

    <view class="logout" @click="logout">
      退出登录
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        notify: true,
        sound: true,
        dataSaver: false,
      },
      cacheSize: '6.3',
    }
  },
  onLoad() {
    this.initSettings()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initSettings() {
      try {
        const stored = uni.getStorageSync('me_settings')
        if (stored && typeof stored === 'object') {
          this.settings = { ...this.settings, ...stored }
        }
      } catch (e) {
        // ignore
      }
    },
    saveSettings() {
      try {
        uni.setStorageSync('me_settings', this.settings)
      } catch (e) {
        // ignore
      }
    },
    onToggle(key, e) {
      const value = e.detail.value
      this.settings = { ...this.settings, [key]: value }
      this.saveSettings()
    },
    clearCache() {
      uni.showModal({
        title: '清理缓存',
        content: '确定要清理本地缓存吗？不会影响订单与账号数据。',
        success: (res) => {
          if (res.confirm) {
            // 这里只做示意，可根据需要清理特定 key
            this.cacheSize = '0.0'
            uni.showToast({ title: '已清理', icon: 'success' })
          }
        },
      })
    },
    about() {
      uni.showModal({
        title: '关于「梦回宋朝」',
        content:
          '这是一幅可以慢慢逛的宋朝画卷，从衣食住行到市井烟火，尝试用小程序的形式重构一段日常。当前版本为课程项目演示用，所有数据均为示意。',
        showCancel: false,
      })
    },
    logout() {
      uni.showModal({
        title: '退出登录',
        content: '退出后仍可再次登录，不会丢失订单与收藏数据。',
        success: (res) => {
          if (res.confirm) {
            uni.showToast({ title: '已退出（示意）', icon: 'none' })
            setTimeout(() => {
              uni.reLaunch({
                url: '/pages/index/index',
              })
            }, 600)
          }
        },
      })
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

.section {
  margin: 16rpx 26rpx 0;
  background-color: #fff;
  border-radius: 18rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.item {
  flex-direction: row;
  display: flex;
  align-items: center;
  padding: 20rpx 22rpx;
  border-bottom: 1rpx solid #f1f1f1;
}

.item:last-child {
  border-bottom: none;
}

.item-main {
  flex: 1;
}

.item-title {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 4rpx;
}

.item-desc {
  font-size: 22rpx;
  color: #999;
}

.item-extra {
  font-size: 22rpx;
  color: #999;
}

.arrow {
  font-size: 26rpx;
  color: #ccc;
}

.logout {
  margin: 40rpx 30rpx 0;
  padding: 14rpx 0;
  text-align: center;
  border-radius: 999rpx;
  background-color: #ffffff;
  color: #c14b40;
  font-size: 26rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.05);
}
</style>

