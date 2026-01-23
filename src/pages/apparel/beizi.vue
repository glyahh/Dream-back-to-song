<template>
  <view class="clothing-page">
    <!-- 顶部背景和内容 -->
    <view class="header-section">
      <image
        class="header-bg"
        src="/static/apparel1.png"
        mode="aspectFill"
      />

      <!-- 返回按钮 -->
      <view class="back-btn" @click="goBack">
        <view class="back-icon">‹</view>
      </view>

      <!-- 顶部标题 -->
      <view class="top-title">
        <text class="page-title">服饰详情</text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content-section">
      <!-- 标题信息 -->
      <view class="title-info">
        <text class="main-title">宋代褙子</text>
        <text class="subtitle">《歌乐图》·南宋</text>
        <view class="tag-section">
          <text class="tag-item">褙子</text>
          <text class="tag-item">直对襟</text>
        </view>
      </view>

      <!-- 介绍区块 -->
      <view class="introduction-section">
        <text class="section-title">介绍</text>
        <text class="introduction-text">
          图片出自南宋《歌乐图》，描绘了南宋宫廷歌乐女伎演奏、排练的场景。画中九位女伎皆着红色窄袖褙子，高髻饰以角状配饰。
          褙子又称背子、绰子，最能代表宋代服饰的特色，形制一般为直领对襟，前襟敞开且不施襟纽。
        </text>
        <view class="expand-btn" @click="expandIntroduction">
          <text class="expand-text">展开</text>
        </view>
      </view>

      <!-- 相关推荐区块 -->
      <view class="recommend-section">
        <view class="section-header">
          <text class="section-title">相关推荐</text>
          <view class="view-all" @click="goToAllRecommend">
            <text class="view-all-text">更多</text>
            <text class="arrow">›</text>
          </view>
        </view>

        <!-- 横向滚动列表 -->
        <scroll-view
          class="recommend-scroll"
          scroll-x
          show-scrollbar="false"
        >
          <view
            v-for="(item, index) in recommendList"
            :key="index"
            class="recommend-item"
            @click="goToRecommendDetail(item.id)"
          >
            <image
              class="recommend-img"
              :src="item.image"
              mode="aspectFill"
            />
            <view class="recommend-info">
              <text class="recommend-name">{{ item.name }}</text>
              <text class="recommend-dynasty">{{ item.dynasty }}</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      recommendList: [
        {
          id: 1,
          name: '圆领袍',
          image: '/static/apparel2.png'
        },
        {
          id: 2,
          name: '百褶裙',
          image: '/static/apparel5.jpg'
        },
        {
          id: 3,
          name: '直裰',
          image: '/static/apparel6.jpg'
        },
        {
          id: 4,
          name: '宋制襕衫',
          image: '/static/apparel4.jpg'
        },
        {
          id: 5,
          name: '宋制抹胸',
          image: '/static/apparel3.png'
        }
      ]
    }
  },
  methods: {
    // 返回apparel页面
    goBack() {
      uni.navigateBack();
    },

    // 展开介绍
    expandIntroduction() {
      uni.showToast({
        title: '展开详细介绍',
        icon: 'none'
      });
      // 这里可以添加展开逻辑，比如跳转到详细介绍页
      // uni.navigateTo({
      //   url: '/pages/apparel/introduction'
      // });
    },

    // 前往所有推荐
    goToAllRecommend() {
      uni.navigateTo({
        url: '/pages/apparel/recommend'
      });
    },

    // 前往推荐详情
    goToRecommendDetail(id) {
      uni.navigateTo({
        url: `/pages/apparel/recommend-detail?id=${id}`
      });
    }
  }
}
</script>

<style scoped>
.clothing-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
}

/* 顶部背景区域 - 高度增加为屏幕的十分之四 */
.header-section {
  position: relative;
  height: 60vh !important;
  min-height: 400rpx;
  overflow: hidden;
}

.header-bg {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

/* 返回按钮 */
.back-btn {
  position: fixed;
  top: 80rpx;
  left: 30rpx;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  z-index: 20;
}

.back-icon {
  font-size: 50rpx;
  color: #333;
  font-weight: 300;
  margin-top: -6rpx;
  margin-left: -6rpx;
}

/* 顶部标题 - 楷体白字 */
.top-title {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;
  width: 100%;
  text-align: center;
}

.page-title {
  font-size: 48rpx;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 8rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
  font-family: 'KaiTi', 'STKaiti', '楷体', serif;
}

/* 内容区域 - 参考原代码的圆角效果 */
.content-section {
  background-color: #f6f2e9;
  padding: 0 30rpx 30rpx;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  margin-top: -330rpx; /* 向上移动以覆盖部分图片 */
  position: relative;
  z-index: 10;
}

/* 标题信息 - 靠左对齐 */
.title-info {
  padding-top: 60rpx; /* 增加上边距，因为内容区域上移了 */
  margin: 30rpx 0;
  text-align: left;
}

.main-title {
  display: block;
  font-size: 52rpx;
  font-weight: 700;
  color: #3b352b;
  letter-spacing: 4rpx;
  margin-bottom: 15rpx;
  margin-left:10rpx;
  font-family: 'KaiTi', 'STKaiti', '楷体', serif;
}

.subtitle {
  display: block;
  font-size: 32rpx;
  color: #9ea97f;
  letter-spacing: 2rpx;
  margin-bottom: 25rpx;
}

.tag-section {
  display: flex;
  gap: 40rpx;
  margin-top: 20rpx;
  width: fit-content;
  align-self: flex-start;
}



.tag-item {
  font-size: 28rpx;
  color: white;
  font-weight: 250;
  letter-spacing: 2rpx;
  position: relative;
  background-color: rgba(158, 169, 127, 0.5);
  padding: 8rpx 20rpx;
  border-radius: 40rpx; /* 两端圆形 */
}


.tag-item::after {

}

/* 介绍区块 */
.introduction-section {
  margin: 40rpx 0;
  padding: 40rpx;
  border-radius: 30rpx;
}

.introduction-section .section-title {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  color: #3b352b;
  margin-bottom: 30rpx;
  letter-spacing: 4rpx;
}

.introduction-text {
  display: block;
  font-size: 32rpx;
  line-height: 1.6;
  color: #666;
  margin-bottom: 30rpx;
  text-align: justify;
  font-family: 'KaiTi', 'STKaiti', '楷体', serif;
}

.expand-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0;
  border-top: 1rpx solid rgba(158, 169, 127, 0.2);
}

.expand-text {
  font-size: 28rpx;
  color: #9ea97f;
  font-weight: 500;
  letter-spacing: 2rpx;
}

/* 相关推荐区块 */
.recommend-section {
  margin: 40rpx 0;
  padding: 40rpx;
  border-radius: 30rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 40rpx;
  font-weight: 600;
  color: #3b352b;
  letter-spacing: 4rpx;
  font-family: 'KaiTi', 'STKaiti', '楷体', serif;
}

.view-all {
  display: flex;
  align-items: center;
  padding: 12rpx 24rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid rgba(158, 169, 127, 0.2);
}

.view-all-text {
  font-size: 26rpx;
  color: #9ea97f;
  font-weight: 500;
  margin-right: 8rpx;
}

.arrow {
  font-size: 32rpx;
  color: #9ea97f;
  font-weight: 300;
}

/* 横向滚动列表 */
.recommend-scroll {
  white-space: nowrap;
}

.recommend-item {
  display: inline-block;
  width: 250rpx;
  margin-right: 30rpx;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  vertical-align: top;
}

.recommend-item:last-child {
  margin-right: 0;
}

.recommend-img {
  width: 100%;
  height: 300rpx;
  display: block;
}

.recommend-info {
  padding: 20rpx;
}

.recommend-name {
  display: block;
  font-size: 28rpx;
  color: #3b352b;
  font-weight: 600;
  margin-bottom: 8rpx;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.recommend-dynasty {
  display: block;
  font-size: 24rpx;
  color: #9ea97f;
}

/* 触摸效果 */
.back-btn:active,
.view-all:active,
.recommend-item:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.expand-btn:active {
  opacity: 0.8;
}
</style>