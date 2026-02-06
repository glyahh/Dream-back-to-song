<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">我的发布</text>
      <text class="nav-sub">在这里收集你的小宋朝</text>
    </view>

    <view class="composer">
      <textarea
        class="composer-input"
        v-model="draft"
        maxlength="120"
        placeholder="分享一段此刻心情、今日所见的宋风片段……"
        placeholder-class="composer-placeholder"
      />
      <view class="composer-footer">
        <text class="composer-count">{{ draft.length }}/120</text>
        <view class="composer-btn" @click="publish">发布</view>
      </view>
    </view>

    <scroll-view class="scroll" scroll-y>
      <view v-if="posts.length" class="post-list">
        <view
          v-for="item in posts"
          :key="item.id"
          class="post-card"
        >
          <view class="post-header">
            <view class="post-user">
              <image class="post-avatar" src="/static/avatar.png" mode="aspectFill" />
              <view class="post-user-info">
                <text class="post-name">烟雨朦胧</text>
                <text class="post-time">{{ item.time }}</text>
              </view>
            </view>
            <text class="post-topic">{{ item.topic }}</text>
          </view>
          <text class="post-content">{{ item.content }}</text>
          <view class="post-footer">
            <view class="post-action" @click="toggleLike(item)">
              <text>{{ item.liked ? '💚' : '🤍' }}</text>
              <text class="post-action-text">{{ item.likes }}</text>
            </view>
            <view class="post-action" @click="removePost(item)">
              <text>删除</text>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty">
        <text class="empty-title">还没有发布内容</text>
        <text class="empty-desc">先写一小段文字，让更多人看到你眼中的宋朝。</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      draft: '',
      posts: [],
    }
  },
  onLoad() {
    this.initPosts()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initPosts() {
      try {
        const stored = uni.getStorageSync('me_posts')
        if (Array.isArray(stored)) {
          this.posts = stored
          return
        }
      } catch (e) {
        // ignore
      }
      this.posts = []
    },
    persist() {
      try {
        uni.setStorageSync('me_posts', this.posts)
      } catch (e) {
        // ignore
      }
    },
    publish() {
      if (!this.draft.trim()) {
        uni.showToast({ title: '写点内容再发布吧', icon: 'none' })
        return
      }
      const now = new Date()
      const time = `${now.getMonth() + 1}月${now
        .getDate()
        .toString()
        .padStart(2, '0')}日 ${now.getHours().toString().padStart(2, '0')}:${now
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
      this.posts.unshift({
        id: `p_${Date.now()}`,
        content: this.draft,
        time,
        likes: 0,
        liked: false,
        topic: '#生活在宋朝',
      })
      this.draft = ''
      this.persist()
      uni.showToast({ title: '已发布', icon: 'success' })
    },
    toggleLike(item) {
      this.posts = this.posts.map((p) =>
        p.id === item.id
          ? {
              ...p,
              liked: !p.liked,
              likes: p.likes + (p.liked ? -1 : 1),
            }
          : p
      )
      this.persist()
    },
    removePost(item) {
      uni.showModal({
        title: '删除发布',
        content: '确定要删除这条内容吗？',
        success: (res) => {
          if (res.confirm) {
            this.posts = this.posts.filter((p) => p.id !== item.id)
            this.persist()
            uni.showToast({ title: '已删除', icon: 'none' })
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

.composer {
  margin: 12rpx 30rpx 10rpx;
  padding: 18rpx 20rpx 14rpx;
  background-color: #fbf8f2;
  border-radius: 18rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
}

.composer-input {
  min-height: 120rpx;
  font-size: 24rpx;
  color: #333;
}

.composer-placeholder {
  color: #b0b0b0;
}

.composer-footer {
  margin-top: 8rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.composer-count {
  font-size: 22rpx;
  color: #999;
}

.composer-btn {
  padding: 8rpx 20rpx;
  border-radius: 999rpx;
  background-color: #9ea97f;
  color: #fff;
  font-size: 24rpx;
}

.scroll {
  height: calc(100vh - 260rpx);
}

.post-list {
  padding: 4rpx 30rpx 26rpx;
}

.post-card {
  background-color: #fff;
  border-radius: 18rpx;
  padding: 18rpx 20rpx 16rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10rpx;
}

.post-user {
  display: flex;
  align-items: center;
}

.post-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 10rpx;
}

.post-user-info {
  display: flex;
  flex-direction: column;
}

.post-name {
  font-size: 26rpx;
  color: #333;
}

.post-time {
  font-size: 22rpx;
  color: #b0b0b0;
}

.post-topic {
  align-self: center;
  font-size: 22rpx;
  color: #9ea97f;
}

.post-content {
  font-size: 24rpx;
  color: #444;
  line-height: 1.7;
  margin-bottom: 12rpx;
}

.post-footer {
  display: flex;
  justify-content: flex-end;
  gap: 20rpx;
}

.post-action {
  display: flex;
  align-items: center;
  gap: 4rpx;
  font-size: 24rpx;
  color: #666;
}

.post-action-text {
  font-size: 22rpx;
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

