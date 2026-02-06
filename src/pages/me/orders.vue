<template>
  <view class="page">
    <view class="nav">
      <text class="nav-back" @click="goBack">←</text>
      <text class="nav-title">我的订单</text>
    </view>

    <view class="tabs">
      <view
        v-for="tab in statusTabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: currentStatus === tab.key }"
        @click="switchStatus(tab.key)"
      >
        {{ tab.label }}
      </view>
    </view>

    <scroll-view class="scroll" scroll-y>
      <view v-if="filteredOrders.length" class="order-list">
        <view
          v-for="item in filteredOrders"
          :key="item.id"
          class="order-card"
          @click="goDetail(item)"
        >
          <view class="order-header">
            <text class="order-shop">宋风雅集 · 官方店</text>
            <text class="order-status" :class="'status-' + item.status">{{ statusText[item.status] }}</text>
          </view>
          <view class="order-body">
            <image class="order-img" :src="item.img" mode="aspectFill" />
            <view class="order-info">
              <text class="order-title">{{ item.title }}</text>
              <text class="order-desc">{{ item.desc }}</text>
              <text class="order-time">{{ item.time }}</text>
            </view>
          </view>
          <view class="order-footer">
            <text class="order-price">共 {{ item.count }} 件 · 实付 ¥{{ item.price }}</text>
            <view class="order-actions">
              <button
                v-if="item.status === 'pending'"
                class="btn ghost"
                @click.stop="cancelOrder(item)"
              >
                取消订单
              </button>
              <button
                v-if="item.status === 'pending'"
                class="btn primary"
                @click.stop="payOrder(item)"
              >
                去支付
              </button>
              <button
                v-if="item.status === 'shipped'"
                class="btn primary"
                @click.stop="confirmOrder(item)"
              >
                确认收货
              </button>
              <button
                v-if="item.status === 'finished'"
                class="btn ghost"
                @click.stop="viewLogistics(item)"
              >
                查看物流
              </button>
            </view>
          </view>
        </view>
      </view>

      <view v-else class="empty">
        <text class="empty-title">还没有相关订单</text>
        <text class="empty-desc">去「集市」看看宋风好物吧～</text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentStatus: 'all',
      statusTabs: [
        { key: 'all', label: '全部' },
        { key: 'pending', label: '待付款' },
        { key: 'shipped', label: '待收货' },
        { key: 'finished', label: '已完成' },
      ],
      statusText: {
        pending: '待付款',
        shipped: '待收货',
        finished: '已完成',
      },
      orders: [],
    }
  },
  computed: {
    filteredOrders() {
      if (this.currentStatus === 'all') return this.orders
      return this.orders.filter((item) => item.status === this.currentStatus)
    },
  },
  onLoad() {
    this.initOrders()
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    initOrders() {
      // 模拟本地订单数据，可与后续真实接口对接
      const mock = [
        {
          id: 'order1',
          title: '汴河清赏 · 茶器礼盒',
          desc: '一盏茶、一方木托，随手即是宋人茶席。',
          img: '/static/market_newitem/风荷雅盏.png',
          time: '下单时间：2026-02-01 20:14',
          status: 'pending',
          count: 1,
          price: 189,
        },
        {
          id: 'order2',
          title: '千里江山 · 手卷书签套装',
          desc: '从画卷中取一角，夹在书页之间。',
          img: '/static/market_allitem/汴梁旧帖.png',
          time: '下单时间：2026-01-20 14:32',
          status: 'shipped',
          count: 2,
          price: 98,
        },
        {
          id: 'order3',
          title: '宋韵点心盘 · 桂花款',
          desc: '仿汴京点心盘，晨起一碟，伴书香茶烟。',
          img: '/static/market_allitem/风荷雅盏.png',
          time: '下单时间：2026-01-05 09:10',
          status: 'finished',
          count: 1,
          price: 129,
        },
      ]
      try {
        const stored = uni.getStorageSync('me_orders')
        this.orders = Array.isArray(stored) && stored.length ? stored : mock
      } catch (e) {
        this.orders = mock
      }
    },
    switchStatus(key) {
      this.currentStatus = key
    },
    persist() {
      try {
        uni.setStorageSync('me_orders', this.orders)
      } catch (e) {
        // ignore
      }
    },
    payOrder(item) {
      uni.showToast({ title: '模拟支付成功', icon: 'success' })
      this.orders = this.orders.map((o) =>
        o.id === item.id ? { ...o, status: 'shipped' } : o
      )
      this.persist()
    },
    cancelOrder(item) {
      uni.showModal({
        title: '取消订单',
        content: '确定要取消这笔订单吗？',
        success: (res) => {
          if (res.confirm) {
            this.orders = this.orders.filter((o) => o.id !== item.id)
            this.persist()
            uni.showToast({ title: '已取消', icon: 'none' })
          }
        },
      })
    },
    confirmOrder(item) {
      uni.showToast({ title: '已确认收货', icon: 'success' })
      this.orders = this.orders.map((o) =>
        o.id === item.id ? { ...o, status: 'finished' } : o
      )
      this.persist()
    },
    viewLogistics(item) {
      uni.showToast({
        title: '物流信息：包裹已送达「汴京驿站」',
        icon: 'none',
      })
    },
    goDetail(item) {
      uni.navigateTo({
        url: '/pages/market/detail?from=orders',
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
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

.nav {
  padding: 60rpx 30rpx 20rpx;
  display: flex;
  align-items: center;
}

.nav-back {
  font-size: 34rpx;
  color: #666;
  margin-right: 12rpx;
}

.nav-title {
  font-size: 32rpx;
  color: #111;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.tabs {
  margin: 0 30rpx 10rpx;
  padding: 10rpx;
  background-color: #fbf8f2;
  border-radius: 999rpx;
  display: flex;
  gap: 8rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 12rpx 0;
  font-size: 24rpx;
  color: #888;
  border-radius: 999rpx;
}

.tab-item.active {
  background-color: #9ea97f;
  color: #fff;
}

.scroll {
  height: calc(100vh - 220rpx);
}

.order-list {
  padding: 10rpx 30rpx 30rpx;
}

.order-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 22rpx 22rpx 18rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
}

.order-header {
  display: flex;
  align-items: center;
  margin-bottom: 18rpx;
}

.order-shop {
  flex: 1;
  font-size: 26rpx;
  color: #333;
}

.order-status {
  font-size: 24rpx;
}

.status-pending {
  color: #c97a40;
}

.status-shipped {
  color: #9ea97f;
}

.status-finished {
  color: #999;
}

.order-body {
  display: flex;
  margin-bottom: 16rpx;
}

.order-img {
  width: 140rpx;
  height: 140rpx;
  border-radius: 16rpx;
  margin-right: 16rpx;
  background-color: #eee;
}

.order-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.order-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 6rpx;
}

.order-desc {
  font-size: 24rpx;
  color: #888;
}

.order-time {
  font-size: 22rpx;
  color: #b0b0b0;
}

.order-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4rpx;
}

.order-price {
  font-size: 24rpx;
  color: #333;
}

.order-actions {
  display: flex;
  gap: 12rpx;
}

.btn {
  padding: 6rpx 18rpx;
  border-radius: 999rpx;
  font-size: 24rpx;
  line-height: 1.6;
}

.btn.primary {
  background-color: #9ea97f;
  color: #fff;
}

.btn.ghost {
  background-color: #fff;
  color: #666;
  border: 1rpx solid #ddd;
}

.empty {
  padding: 120rpx 40rpx 40rpx;
  text-align: center;
  color: #999;
}

.empty-title {
  display: block;
  font-size: 30rpx;
  margin-bottom: 10rpx;
}

.empty-desc {
  font-size: 24rpx;
}
</style>

