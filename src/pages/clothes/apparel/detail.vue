<template>
  <view class="apparel-detail-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">{{ detailInfo.name }}</text>
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

        <!-- 形制特点 -->
        <view class="detail-section">
          <view class="section-title">形制特点</view>
          <text class="section-content">{{ detailInfo.features }}</text>
        </view>

        <!-- 历史背景 -->
        <view class="detail-section">
          <view class="section-title">历史背景</view>
          <text class="section-content">{{ detailInfo.history }}</text>
        </view>

        <!-- 穿着场合 -->
        <view class="detail-section">
          <view class="section-title">穿着场合</view>
          <text class="section-content">{{ detailInfo.occasion }}</text>
        </view>

        <!-- 制作工艺 -->
        <view class="detail-section" v-if="detailInfo.craft">
          <view class="section-title">制作工艺</view>
          <text class="section-content">{{ detailInfo.craft }}</text>
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
        image: '/static/apparel1.png',
        description: '褙子是宋代女性最流行的外衣，直领对襟，两侧开衩，长度过膝，是宋代服饰文化的典型代表。',
        features: '褙子采用直领对襟设计，两侧开衩至腋下，方便活动。衣身修长，过膝长度，袖口宽窄适中。整体造型简洁优雅，体现了宋代女性服饰的精致美学。',
        history: '褙子起源于北宋，最初为内穿服饰，后逐渐演变为外衣。在南宋时期达到流行高峰，成为宋代女性标志性服饰。其设计体现了宋代社会对女性美的独特理解，既实用又美观。',
        occasion: '褙子适合日常穿着，也可作为正式场合的外衣。常与抹胸、长裙搭配，形成完整的宋代女性服饰体系。在不同季节可选用不同材质，体现了宋代服饰的实用性。',
        craft: '褙子制作需要精细的裁剪和缝制工艺。首先选择合适的布料，然后按照形制要求进行裁剪，注意对襟的对称和开衩的位置。缝制时要保持针脚均匀，领口和袖口需要特别处理，确保穿着舒适。'
      },
      relatedItems: [
        { id: 2, name: '圆领长袍', image: '/static/apparel2.png' },
        { id: 3, name: '宋制抹胸', image: '/static/apparel3.png' },
        { id: 4, name: '宋制褴衫', image: '/static/apparel4.jpg' }
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
      uni.navigateBack({
        fail: () => {
          // 如果无法返回，则跳转到列表页
          uni.redirectTo({
            url: '/pages/clothes/apparel/index'
          })
        }
      })
    },
    loadDetailInfo(id) {
      // 根据id加载不同的详情信息
      const details = {
        1: {
          name: '褙子',
          dynasty: '宋代女装',
          image: '/static/apparel1.png',
          description: '褙子是宋代女性最流行的外衣，直领对襟，两侧开衩，长度过膝，是宋代服饰文化的典型代表。',
          features: '褙子采用直领对襟设计，两侧开衩至腋下，方便活动。衣身修长，过膝长度，袖口宽窄适中。整体造型简洁优雅，体现了宋代女性服饰的精致美学。',
          history: '褙子起源于北宋，最初为内穿服饰，后逐渐演变为外衣。在南宋时期达到流行高峰，成为宋代女性标志性服饰。其设计体现了宋代社会对女性美的独特理解，既实用又美观。',
          occasion: '褙子适合日常穿着，也可作为正式场合的外衣。常与抹胸、长裙搭配，形成完整的宋代女性服饰体系。在不同季节可选用不同材质，体现了宋代服饰的实用性。',
          craft: '褙子制作需要精细的裁剪和缝制工艺。首先选择合适的布料，然后按照形制要求进行裁剪，注意对襟的对称和开衩的位置。缝制时要保持针脚均匀，领口和袖口需要特别处理，确保穿着舒适。'
        },
        2: {
          name: '圆领长袍',
          dynasty: '宋代官服',
          image: '/static/apparel2.png',
          description: '圆领长袍是宋代官员的常服，圆领窄袖，体现官阶等级，是宋代官服制度的典型代表。',
          features: '圆领长袍采用圆领设计，领口紧贴颈部。袖口窄小，便于活动。衣身长度及膝，下摆宽大。整体造型庄重威严，体现了宋代官服的等级制度。',
          history: '圆领长袍承袭唐代官服制度，在宋代得到进一步发展。不同品级的官员穿着不同颜色的圆领长袍，体现了严格的等级制度。是宋代官场文化的重要体现。',
          occasion: '圆领长袍主要用于官员日常办公和正式场合。不同场合可搭配不同的配饰，如腰带、官帽等，形成完整的官服体系。',
          craft: '圆领长袍的制作需要严格按照官服制度进行。选料考究，多使用丝绸等高档面料。裁剪时要保证圆领的精确度，袖口和衣身的比例要协调。'
        },
        3: {
          name: '宋制抹胸',
          dynasty: '宋代女装',
          image: '/static/apparel3.png',
          description: '宋制抹胸是宋代女性的内衣，贴身穿着，外搭褙子，是宋代女性服饰体系的重要组成部分。',
          features: '宋制抹胸采用贴身设计，上端有系带，下端呈三角形或方形。材质轻薄，多使用丝绸或棉布。颜色多样，常见的有白色、粉色等。',
          history: '抹胸在宋代女性服饰中占有重要地位，是内穿服饰的代表。与褙子搭配穿着，形成了宋代女性独特的服饰风格。',
          occasion: '抹胸作为内衣，主要与褙子、长裙等外衣搭配穿着。适合日常和正式场合，是宋代女性服饰的基础。',
          craft: '抹胸制作相对简单，但需要选择柔软透气的面料。裁剪时要贴合身形，系带的位置和长度要合适，确保穿着舒适。'
        },
        4: {
          name: '宋制褴衫',
          dynasty: '宋代男装',
          image: '/static/apparel4.jpg',
          description: '宋制褴衫是宋代男性的常服，交领右衽，宽袖长袍，体现了宋代文人的风雅气质。',
          features: '宋制褴衫采用交领右衽设计，宽袖长袍，衣身宽松。整体造型简洁大方，体现了宋代文人的审美追求。',
          history: '褴衫在宋代文人中非常流行，是文人雅士的标志性服饰。其简洁的设计和宽松的剪裁，体现了宋代文人的风雅气质。',
          occasion: '褴衫适合文人日常穿着，也可作为正式场合的服饰。常与头巾、腰带等配饰搭配，形成完整的文人服饰体系。',
          craft: '褴衫制作需要注重宽松舒适，裁剪时要留出足够的活动空间。交领的制作要精确，确保右衽的正确性。'
        },
        5: {
          name: '对襟短袄',
          dynasty: '宋代常服',
          image: '/static/apparel5.jpg',
          description: '对襟短袄是宋代男女通用的上衣，对襟直领，简洁大方，是宋代常服的代表。',
          features: '对襟短袄采用对襟直领设计，衣身较短，袖口适中。整体造型简洁大方，适合日常穿着。',
          history: '对襟短袄在宋代非常流行，是男女通用的常服。其简洁的设计和实用的功能，使其成为宋代服饰的重要组成部分。',
          occasion: '对襟短袄适合日常穿着，也可作为工作服。男女皆可穿着，体现了宋代服饰的实用性。',
          craft: '对襟短袄制作相对简单，但要注意对襟的对称性。裁剪时要保证衣身的长度适中，袖口要便于活动。'
        },
        6: {
          name: '直裰',
          dynasty: '宋代男装',
          image: '/static/apparel6.jpg',
          description: '直裰是宋代文人的常服，直身长袍，体现文人风骨，是宋代男性服饰的典型代表。',
          features: '直裰采用直身设计，衣身修长，下摆宽大。整体造型简洁优雅，体现了宋代文人的风骨。',
          history: '直裰在宋代文人中非常流行，是文人雅士的标志性服饰。其简洁的设计和修长的剪裁，体现了宋代文人的审美追求。',
          occasion: '直裰适合文人日常穿着，也可作为正式场合的服饰。常与头巾、腰带等配饰搭配，形成完整的文人服饰体系。',
          craft: '直裰制作需要注重修长优雅，裁剪时要保证衣身的长度和宽度比例协调。下摆的处理要自然，确保穿着时的美观。'
        }
      }
      if (details[id]) {
        this.detailInfo = details[id]
        // 根据id设置相关推荐
        const relatedMap = {
          1: [
            { id: 3, name: '宋制抹胸', image: '/static/apparel3.png' },
            { id: 5, name: '对襟短袄', image: '/static/apparel5.jpg' }
          ],
          2: [
            { id: 4, name: '宋制褴衫', image: '/static/apparel4.jpg' },
            { id: 6, name: '直裰', image: '/static/apparel6.jpg' }
          ],
          3: [
            { id: 1, name: '褙子', image: '/static/apparel1.png' },
            { id: 5, name: '对襟短袄', image: '/static/apparel5.jpg' }
          ],
          4: [
            { id: 2, name: '圆领长袍', image: '/static/apparel2.png' },
            { id: 6, name: '直裰', image: '/static/apparel6.jpg' }
          ],
          5: [
            { id: 1, name: '褙子', image: '/static/apparel1.png' },
            { id: 3, name: '宋制抹胸', image: '/static/apparel3.png' }
          ],
          6: [
            { id: 2, name: '圆领长袍', image: '/static/apparel2.png' },
            { id: 4, name: '宋制褴衫', image: '/static/apparel4.jpg' }
          ]
        }
        if (relatedMap[id]) {
          this.relatedItems = relatedMap[id]
        }
      }
    },
    goToRelated(id) {
      // 使用 navigateTo 而不是 redirectTo，保持导航栈
      uni.navigateTo({
        url: `/pages/clothes/apparel/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.apparel-detail-page {
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
  object-fit: cover;
  background: linear-gradient(180deg, rgba(246, 242, 233, 0.3) 0%, rgba(246, 242, 233, 0) 100%);
}

.info-section {
  padding: 50rpx 40rpx;
  background: linear-gradient(180deg, #ffffff 0%, #faf9f6 100%);
  margin: -40rpx 30rpx 30rpx;
  border-radius: 40rpx 40rpx 0 0;
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 2;
}

.detail-name {
  display: block;
  font-size: 48rpx;
  font-weight: 700;
  color: #3b352b;
  margin-bottom: 16rpx;
  letter-spacing: 4rpx;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
  text-align: center;
  position: relative;
}

.detail-name::after {
  content: '';
  position: absolute;
  bottom: -8rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background: linear-gradient(90deg, transparent 0%, #9ea97f 50%, transparent 100%);
  border-radius: 2rpx;
}

.detail-dynasty {
  display: block;
  font-size: 26rpx;
  color: #9ea97f;
  margin: 0 auto 30rpx;
  font-weight: 500;
  text-align: center;
  letter-spacing: 2rpx;
  padding: 8rpx 24rpx;
  background-color: rgba(158, 169, 127, 0.1);
  border-radius: 20rpx;
  width: fit-content;
}

.detail-description {
  display: block;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 2;
  letter-spacing: 1rpx;
  text-align: justify;
  padding: 30rpx 0;
  border-top: 1rpx solid rgba(158, 169, 127, 0.2);
  border-bottom: 1rpx solid rgba(158, 169, 127, 0.2);
  margin-top: 20rpx;
}

.detail-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin: 0 30rpx 20rpx;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
  position: relative;
}

.detail-section::before {
  content: '';
  position: absolute;
  left: 30rpx;
  top: 40rpx;
  width: 6rpx;
  height: 32rpx;
  background: linear-gradient(180deg, #9ea97f 0%, #c4d0a8 100%);
  border-radius: 3rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 20rpx;
  margin-left: 20rpx;
  letter-spacing: 2rpx;
  font-family: 'LiSu', 'SimLi', 'STLiti', 'KaiTi', serif;
  position: relative;
}

.section-content {
  display: block;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 2;
  letter-spacing: 1rpx;
  text-align: justify;
  margin-left: 20rpx;
}

.related-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin: 0 30rpx 30rpx;
  border-radius: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.related-section .section-title {
  margin-left: 0;
  margin-bottom: 30rpx;
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
  background-color: #faf9f6;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.related-image {
  width: 100%;
  height: 200rpx;
  display: block;
  margin-bottom: 0;
}

.related-name {
  display: block;
  font-size: 24rpx;
  color: #3b352b;
  text-align: center;
  font-weight: 500;
  padding: 16rpx 12rpx;
  background-color: #ffffff;
}

.back-btn:active {
  opacity: 0.8;
  transform: scale(0.95);
}

.related-item:active {
  opacity: 0.9;
  transform: scale(0.96);
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.12);
}
</style>

