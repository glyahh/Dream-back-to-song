<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">我的关注</text>
      <text class="nav-sub">与这些宋风同好常来常往</text>
    </view>

    <scroll-view class="scroll" scroll-y>
      <view v-if="followings.length" class="list">
        <view
          v-for="item in followings"
          :key="item.id"
          class="user-card"
        >
          <view class="user-main">
            <image class="avatar" :src="item.avatar" mode="aspectFill" />
            <view class="info">
              <text class="name">{{ item.name }}</text>
              <text class="desc">{{ item.desc }}</text>
              <text class="meta">{{ item.meta }}</text>
            </view>
          </view>
          <view class="actions">
            <view
              class="btn ghost"
              @click="toggleFollow(item)"
            >
              {{ item.followed ? '已关注' : '+ 关注' }}
            </view>
            <view class="btn primary" @click="sayHi(item)">私信</view>
          </view>
        </view>
      </view>
      <view v-else class="empty">
        <text class="empty-title">还没有关注任何人</text>
        <text class="empty-desc">可以从「发现」页的热门内容里，关注第一位作者试试。</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      followings: [],
    }
  },
  onLoad() {
    this.initFollowings()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initFollowings() {
      // 从发现页的本地存储中恢复已关注的用户 id
      let ids = []
      try {
        const stored = uni.getStorageSync('discover_follow_ids')
        if (Array.isArray(stored)) ids = stored
      } catch (e) {
        ids = []
      }
      // 预置几位“可关注”的用户，与发现页示例呼应
      const candidates = [
        {
          id: 'user_shanhe',
          name: '山河入梦',
          avatar: '/static/guanzhu/1.png',
          desc: '偏爱浅色宋服与旧画册。',
          meta: '近期常在「宋韵服饰大赏」分享搭配',
        },
        {
          id: 'user_qinghe',
          name: '清河小筑',
          avatar: '/static/touxiang/touxiang2.png',
          desc: '在院子里泡茶读书的人。',
          meta: '分享宋代居住空间与书房布置灵感',
        },
        {
          id: 'user_meishi',
          name: '一碗清欢',
          avatar: '/static/touxiang/touxiang4.png',
          desc: '抄书、做点心，看雨落在瓦檐上。',
          meta: '常发布宋人饮食手记与复刻食谱',
        },
      ]
      this.followings = candidates
        .map((c) => ({
          ...c,
          followed: ids.includes(c.id),
        }))
        .filter((c) => c.followed)
    },
    saveIds() {
      const ids = this.followings.filter((f) => f.followed).map((f) => f.id)
      try {
        uni.setStorageSync('discover_follow_ids', ids)
      } catch (e) {
        // ignore
      }
    },
    toggleFollow(item) {
      this.followings = this.followings.map((f) =>
        f.id === item.id ? { ...f, followed: !f.followed } : f
      )
      this.followings = this.followings.filter((f) => f.followed)
      this.saveIds()
      uni.showToast({
        title: item.followed ? '已取消关注' : '已关注',
        icon: 'none',
      })
    },
    sayHi(item) {
      uni.showToast({
        title: `已向「${item.name}」发送招呼（示意）`,
        icon: 'none',
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

.list {
  padding: 10rpx 30rpx 26rpx;
}

.user-card {
  background-color: #fff;
  border-radius: 18rpx;
  padding: 18rpx 20rpx 14rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.04);
}

.user-main {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #eee;
  margin-right: 16rpx;
}

.info {
  flex: 1;
}

.name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 4rpx;
}

.desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 2rpx;
}

.meta {
  font-size: 22rpx;
  color: #b0b0b0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12rpx;
}

.btn {
  padding: 6rpx 20rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
}

.btn.ghost {
  background-color: #fff;
  color: #666;
  border: 1rpx solid #ddd;
}

.btn.primary {
  background-color: #9ea97f;
  color: #fff;
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

