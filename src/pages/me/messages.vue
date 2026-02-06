<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">消息通知</text>
      <text class="nav-sub">与你的宋风世界保持联络</text>
    </view>

    <view class="tabs">
      <view
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: currentTab === tab.key }"
        @click="switchTab(tab.key)"
      >
        {{ tab.label }}
        <text v-if="unreadCount(tab.key)" class="tab-badge">{{ unreadCount(tab.key) }}</text>
      </view>
    </view>

    <scroll-view class="scroll" scroll-y>
      <view class="list">
        <view
          v-for="msg in filteredMessages"
          :key="msg.id"
          class="msg-card"
          :class="{ unread: !msg.read }"
          @click="openMessage(msg)"
        >
          <view class="msg-main">
            <view class="msg-title-row">
              <text class="msg-title">{{ msg.title }}</text>
              <view v-if="!msg.read" class="msg-dot" />
            </view>
            <text class="msg-content">{{ msg.preview }}</text>
          </view>
          <text class="msg-time">{{ msg.time }}</text>
        </view>
        <view v-if="!filteredMessages.length" class="empty">
          <text class="empty-title">暂时没有消息</text>
          <text class="empty-desc">安静也是难得的宋式生活节奏。</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'system',
      tabs: [
        { key: 'system', label: '系统' },
        { key: 'social', label: '互动' },
        { key: 'order', label: '订单' },
      ],
      messages: [],
    }
  },
  computed: {
    filteredMessages() {
      return this.messages.filter((m) => m.category === this.currentTab)
    },
  },
  onLoad() {
    this.initMessages()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initMessages() {
      try {
        const stored = uni.getStorageSync('me_messages')
        if (Array.isArray(stored)) {
          this.messages = stored
          return
        }
      } catch (e) {
        // ignore
      }
      this.messages = [
        {
          id: 'm1',
          category: 'system',
          title: '欢迎来到「梦回宋朝」',
          preview: '为你准备了一份宋风指南，带你从衣食住行走进画卷。',
          content:
            '欢迎来到「梦回宋朝」。你可以从首页的「遇见宋朝」开始，按衣、食、住、行慢慢浏览，也可以在「发现」页关注你喜欢的作者，或者在「集市」中收集几件宋风好物。',
          time: '昨天 21:40',
          read: false,
        },
        {
          id: 'm2',
          category: 'social',
          title: '山河入梦 赞了你的发布',
          preview: '「用《山家清供》里的方子做了碗蟹酿橙……」',
          content:
            '山河入梦 赞了你的发布：「用《山家清供》里的方子做了碗蟹酿橙……」。对方觉得你的宋风生活很有味道。',
          time: '今天 09:12',
          read: false,
        },
        {
          id: 'm3',
          category: 'order',
          title: '订单已发货',
          preview: '你的「风荷雅盏 · 茶杯」已由汴京驿站发出。',
          content:
            '你的「风荷雅盏 · 茶杯」已由汴京驿站打包发出，预计三至五日抵达。收货后记得在「我的订单」中确认哦。',
          time: '02-01 20:30',
          read: true,
        },
      ]
    },
    persist() {
      try {
        uni.setStorageSync('me_messages', this.messages)
      } catch (e) {
        // ignore
      }
    },
    switchTab(key) {
      this.currentTab = key
    },
    unreadCount(category) {
      return this.messages.filter((m) => m.category === category && !m.read).length
    },
    openMessage(msg) {
      this.messages = this.messages.map((m) =>
        m.id === msg.id ? { ...m, read: true } : m
      )
      this.persist()
      uni.showModal({
        title: msg.title,
        content: msg.content,
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

.tabs {
  margin: 12rpx 30rpx 8rpx;
  display: flex;
  gap: 12rpx;
}

.tab-item {
  position: relative;
  padding: 10rpx 24rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  color: #777;
  background-color: #f0ebe1;
}

.tab-item.active {
  background-color: #9ea97f;
  color: #fff;
}

.tab-badge {
  margin-left: 6rpx;
  font-size: 20rpx;
}

.scroll {
  height: calc(100vh - 210rpx);
}

.list {
  padding: 10rpx 26rpx 26rpx;
}

.msg-card {
  background-color: #fff;
  border-radius: 18rpx;
  padding: 16rpx 18rpx 12rpx;
  margin-bottom: 14rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  gap: 10rpx;
}

.msg-card.unread {
  background-color: #fdfbf4;
}

.msg-main {
  flex: 1;
}

.msg-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 4rpx;
}

.msg-title {
  font-size: 26rpx;
  color: #333;
}

.msg-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background-color: #f29b38;
  margin-left: 8rpx;
}

.msg-content {
  font-size: 24rpx;
  color: #666;
  line-height: 1.6;
}

.msg-time {
  font-size: 22rpx;
  color: #b0b0b0;
  padding-top: 4rpx;
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
</style>

