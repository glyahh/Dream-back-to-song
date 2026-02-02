<template>
  <view class="detail-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">详情</text>
      <view class="right-actions"></view>
    </view>

    <!-- 详情内容 -->
    <scroll-view class="detail-scroll" scroll-y>
      <view class="detail-container">
        <!-- 主图 -->
        <image class="detail-image" :src="detailInfo.image" mode="aspectFill" />

        <!-- 基本信息 -->
        <view class="info-section">
          <text class="detail-name">{{ detailInfo.name }}</text>
          <text class="detail-dynasty">{{ detailInfo.dynasty }}</text>
          <text class="detail-description">{{ detailInfo.description }}</text>
        </view>

        <!-- 详细信息 -->
        <view class="detail-section">
          <view class="section-title">形制特点</view>
          <text class="section-content">{{ detailInfo.features }}</text>
        </view>

        <view class="detail-section">
          <view class="section-title">历史背景</view>
          <text class="section-content">{{ detailInfo.history }}</text>
        </view>

        <view class="detail-section">
          <view class="section-title">穿着场合</view>
          <text class="section-content">{{ detailInfo.occasion }}</text>
        </view>

        <!-- 相关推荐 -->
        <view class="related-section">
          <view class="section-title">相关推荐</view>
          <scroll-view class="related-scroll" scroll-x>
            <view class="related-container">
              <view
                v-for="(item, index) in relatedItems"
                :key="index"
                class="related-item"
                @click="goToRelated(item.id)"
              >
                <image class="related-image" :src="item.image" mode="aspectFill" />
                <text class="related-name">{{ item.name }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detailId: null,
      detailInfo: {
        name: '褙子',
        dynasty: '宋代女装',
        image: '/static/cloth_index3.jpg',
        description: '褙子是宋代女性最流行的外衣，直领对襟，两侧开衩，长度过膝，是宋代服饰文化的典型代表。',
        features: '褙子采用直领对襟设计，两侧开衩至腋下，方便活动。衣身修长，过膝长度，袖口宽窄适中。整体造型简洁优雅，体现了宋代女性服饰的精致美学。',
        history: '褙子起源于北宋，最初为内穿服饰，后逐渐演变为外衣。在南宋时期达到流行高峰，成为宋代女性标志性服饰。其设计体现了宋代社会对女性美的独特理解，既实用又美观。',
        occasion: '褙子适合日常穿着，也可作为正式场合的外衣。常与抹胸、长裙搭配，形成完整的宋代女性服饰体系。在不同季节可选用不同材质，体现了宋代服饰的实用性。'
      },
      relatedItems: [
        { id: 2, name: '圆领袍', image: '/static/cloth_index2.jpg' },
        { id: 3, name: '百褶裙', image: '/static/apparel2.png' },
        { id: 4, name: '对襟衫', image: '/static/apparel5.jpg' }
      ]
    }
  },
  onLoad(options) {
    if (options.id) {
      this.detailId = parseInt(options.id)
      this.loadDetailInfo(this.detailId)
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    loadDetailInfo(id) {
      // 根据id加载不同的详情信息
      const details = {
        1: {
          name: '褙子',
          dynasty: '宋代女装',
          image: '/static/cloth_index3.jpg',
          description: '褙子是宋代女性最流行的外衣，直领对襟，两侧开衩，长度过膝，是宋代服饰文化的典型代表。',
          features: '褙子采用直领对襟设计，两侧开衩至腋下，方便活动。衣身修长，过膝长度，袖口宽窄适中。整体造型简洁优雅，体现了宋代女性服饰的精致美学。',
          history: '褙子起源于北宋，最初为内穿服饰，后逐渐演变为外衣。在南宋时期达到流行高峰，成为宋代女性标志性服饰。其设计体现了宋代社会对女性美的独特理解，既实用又美观。',
          occasion: '褙子适合日常穿着，也可作为正式场合的外衣。常与抹胸、长裙搭配，形成完整的宋代女性服饰体系。在不同季节可选用不同材质，体现了宋代服饰的实用性。'
        },
        2: {
          name: '圆领袍',
          dynasty: '宋代官服',
          image: '/static/cloth_index2.jpg',
          description: '圆领袍是宋代官员的常服，圆领窄袖，体现官阶等级，是宋代官服制度的典型代表。',
          features: '圆领袍采用圆领设计，领口紧贴颈部。袖口窄小，便于活动。衣身长度及膝，下摆宽大。整体造型庄重威严，体现了宋代官服的等级制度。',
          history: '圆领袍承袭唐代官服制度，在宋代得到进一步发展。不同品级的官员穿着不同颜色的圆领袍，体现了严格的等级制度。是宋代官场文化的重要体现。',
          occasion: '圆领袍主要用于官员日常办公和正式场合。不同场合可搭配不同的配饰，如腰带、官帽等，形成完整的官服体系。'
        }
      }
      if (details[id]) {
        this.detailInfo = details[id]
      }
    },
    goToRelated(id) {
      uni.redirectTo({
        url: `/pages/clothes/recommend/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.detail-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

.nav-bar {
  height: 140rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #f6f2e9;
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.back-icon {
  font-size: 40rpx;
  color: #333;
  font-weight: 300;
  margin-top: -4rpx;
  margin-left: -4rpx;
}

.nav-title {
  font-size: 50rpx;
  font-weight: 700;
  color: #3b352b;
  letter-spacing: 4rpx;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
}

.right-actions {
  width: 70rpx;
}

.detail-scroll {
  height: calc(100vh - 140rpx);
}

.detail-container {
  padding-bottom: 40rpx;
}

.detail-image {
  width: 100%;
  height: 600rpx;
  display: block;
}

.info-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.detail-name {
  display: block;
  font-size: 42rpx;
  font-weight: 700;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 2rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.detail-dynasty {
  display: block;
  font-size: 28rpx;
  color: #9ea97f;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.detail-description {
  display: block;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
  letter-spacing: 1rpx;
}

.detail-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 20rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.section-content {
  display: block;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
  letter-spacing: 1rpx;
}

.related-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
}

.related-scroll {
  white-space: nowrap;
}

.related-container {
  display: inline-flex;
  gap: 20rpx;
}

.related-item {
  width: 200rpx;
  display: inline-block;
  vertical-align: top;
}

.related-image {
  width: 100%;
  height: 200rpx;
  border-radius: 16rpx;
  margin-bottom: 12rpx;
}

.related-name {
  display: block;
  font-size: 24rpx;
  color: #3b352b;
  text-align: center;
  font-weight: 500;
}

.back-btn:active,
.related-item:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

