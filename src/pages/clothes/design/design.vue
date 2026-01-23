<template>
  <view class="design-page">
    <!-- 顶部返回按钮 -->
    <view class="header">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">←</text>
        <text class="back-text">返回</text>
      </view>

      <!-- 性别选择 -->
      <view class="gender-selector">
        <view
          class="gender-option"
          :class="{ active: gender === 'female' }"
          @click="changeGender('female')"
        >
          女子
        </view>
        <view
          class="gender-option"
          :class="{ active: gender === 'male' }"
          @click="changeGender('male')"
        >
          男子
        </view>
      </view>
    </view>

    <!-- 模特展示区域 -->
    <view class="model-container">
      <!-- 模特底图 -->
      <image class="model-base" :src="modelImage" mode="widthFix" />

      <!-- 动态穿着的服装 -->
      <!-- 上衣 -->
      <image
        v-if="currentOutfit.top"
        class="clothing-layer top-layer"
        :src="currentOutfit.top.image"
        mode="widthFix"
      />

      <!-- 下装 -->
      <image
        v-if="currentOutfit.bottom"
        class="clothing-layer bottom-layer"
        :src="currentOutfit.bottom.image"
        mode="widthFix"
      />

      <!-- 外套/大袖衫 -->
      <image
        v-if="currentOutfit.outerwear"
        class="clothing-layer outerwear-layer"
        :src="currentOutfit.outerwear.image"
        mode="widthFix"
      />
    </view>

    <!-- 服装分类标签 -->
    <view class="category-tabs">
      <view
        v-for="category in categories"
        :key="category.id"
        class="category-tab"
        :class="{ active: activeCategory === category.id }"
        @click="activeCategory = category.id"
      >
        <text>{{ category.name }}</text>
      </view>
    </view>

    <!-- 服装选择区域 -->
    <scroll-view class="clothing-selector" scroll-x>
      <view class="selector-content">
        <!-- 形制选择 -->
        <view v-if="activeCategory === 'style'" class="style-selector">
          <view
            v-for="style in styles[gender]"
            :key="style.id"
            class="style-item"
            @click="selectStyle(style)"
          >
            <image class="style-icon" :src="style.icon" mode="aspectFit" />
            <text class="style-name">{{ style.name }}</text>
          </view>
        </view>

        <!-- 颜色选择 -->
        <view v-else-if="activeCategory === 'color'" class="color-selector">
          <view
            v-for="color in colors"
            :key="color.id"
            class="color-item"
            @click="selectColor(color)"
          >
            <view class="color-circle" :style="{ backgroundColor: color.value }"></view>
            <text class="color-name">{{ color.name }}</text>
          </view>
        </view>

        <!-- 布料选择 -->
        <view v-else-if="activeCategory === 'fabric'" class="fabric-selector">
          <view
            v-for="fabric in fabrics"
            :key="fabric.id"
            class="fabric-item"
            @click="selectFabric(fabric)"
          >
            <image class="fabric-preview" :src="fabric.preview" mode="aspectFit" />
            <text class="fabric-name">{{ fabric.name }}</text>
          </view>
        </view>

        <!-- 花纹选择 -->
        <view v-else-if="activeCategory === 'pattern'" class="pattern-selector">
          <view
            v-for="pattern in patterns"
            :key="pattern.id"
            class="pattern-item"
            @click="selectPattern(pattern)"
          >
            <image class="pattern-preview" :src="pattern.preview" mode="aspectFit" />
            <text class="pattern-name">{{ pattern.name }}</text>
          </view>
        </view>

        <!-- 具体服装选择 -->
        <view v-else class="clothing-items">
          <view
            v-for="item in getCurrentClothingItems()"
            :key="item.id"
            class="clothing-item"
            :class="{ selected: isItemSelected(item) }"
            @click="selectClothingItem(item)"
          >
            <image class="clothing-thumb" :src="item.thumbnail" mode="aspectFit" />
            <text class="clothing-name">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 当前服装信息 -->
    <view class="current-info">
      <view class="info-section" v-if="currentStyle">
        <text class="info-label">当前形制：</text>
        <text class="info-value">{{ currentStyle.name }}</text>
      </view>

      <view class="info-section" v-if="currentColor">
        <text class="info-label">当前颜色：</text>
        <view class="info-color">
          <view class="current-color-circle" :style="{ backgroundColor: currentColor.value }"></view>
          <text class="info-value">{{ currentColor.name }}</text>
        </view>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="action-buttons">
      <button class="btn reset-btn" @click="resetOutfit">重置</button>
      <button class="btn save-btn" @click="saveOutfit">保存搭配</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      gender: 'female', // 'female' 或 'male'
      activeCategory: 'top', // 'top', 'bottom', 'outerwear', 'style', 'color', 'fabric', 'pattern'
      currentStyle: null,
      currentColor: null,
      currentFabric: null,
      currentPattern: null,
      currentOutfit: {
        top: null,
        bottom: null,
        outerwear: null,
        accessories: null
      },

      // 模特图片
      modelImage: '/static/clothes/model/female_base.jpg',

      // 分类
      categories: [
        { id: 'top', name: '上衣' },
        { id: 'bottom', name: '下装' },
        { id: 'outerwear', name: '外衣' },
        { id: 'style', name: '形制' },
        { id: 'color', name: '颜色' },
        { id: 'fabric', name: '布料' },
        { id: 'pattern', name: '花纹' }
      ],

      // 形制数据
      styles: {
        female: [
          { id: 1, name: '直领对襟褙子', icon: '/static/clothes/icons/style1.png' },
          { id: 2, name: '交领襦裙', icon: '/static/clothes/icons/style2.png' },
          { id: 3, name: '大袖衫', icon: '/static/clothes/icons/style3.png' },
          { id: 4, name: '半袖襦', icon: '/static/clothes/icons/style4.png' },
          { id: 5, name: '抹胸+褙子', icon: '/static/clothes/icons/style5.png' }
        ],
        male: [
          { id: 6, name: '直裰', icon: '/static/clothes/icons/style6.png' },
          { id: 7, name: '道袍', icon: '/static/clothes/icons/style7.png' },
          { id: 8, name: '圆领袍', icon: '/static/clothes/icons/style8.png' }
        ]
      },

      // 颜色数据
      colors: [
        { id: 1, name: '豆绿', value: '#9bbf7f' },
        { id: 2, name: '姜黄', value: '#ffc773' },
        { id: 3, name: '藕荷粉', value: '#e4c2c1' },
        { id: 4, name: '水蓝', value: '#87ceeb' },
        { id: 5, name: '黛青', value: '#4a5b6d' },
        { id: 6, name: '月白', value: '#e3f0ff' },
        { id: 7, name: '朱红', value: '#d03c3c' },
        { id: 8, name: '玄色', value: '#1a1a1a' }
      ],

      // 布料数据
      fabrics: [
        { id: 1, name: '丝绸', preview: '/static/clothes/fabrics/silk.jpg' },
        { id: 2, name: '棉布', preview: '/static/clothes/fabrics/cotton.jpg' },
        { id: 3, name: '麻布', preview: '/static/clothes/fabrics/linen.jpg' },
        { id: 4, name: '锦缎', preview: '/static/clothes/fabrics/brocade.jpg' },
        { id: 5, name: '纱罗', preview: '/static/clothes/fabrics/gauze.jpg' }
      ],

      // 花纹数据
      patterns: [
        { id: 1, name: '缠枝花卉纹', preview: '/static/clothes/patterns/floral.png' },
        { id: 2, name: '四合如意纹', preview: '/static/clothes/patterns/ruyi.png' },
        { id: 3, name: '芙蓉花纹', preview: '/static/clothes/patterns/hibiscus.png' },
        { id: 4, name: '云纹', preview: '/static/clothes/patterns/cloud.png' },
        { id: 5, name: '龙凤纹', preview: '/static/clothes/patterns/dragon.png' },
        { id: 6, name: '几何纹', preview: '/static/clothes/patterns/geometric.png' }
      ],

      // 服装数据库
      clothingDatabase: {
        female: {
          top: [
            { id: 1, name: '褙子', thumbnail: '/static/clothes/tops/褙子.png', image: '/static/clothes/tops/full/抹胸.png', compatibleStyles: [1, 2, 5] },
            { id: 2, name: '大袖衫', thumbnail: '/static/clothes/tops/大袖衫.png', image: '/static/clothes/tops/full/半臂.png', compatibleStyles: [2, 4] },
            { id: 3, name: '半袖', thumbnail: '/static/clothes/tops/半袖.png', image: '/static/clothes/tops/full/襦.png', compatibleStyles: [2] }
          ],
          bottom: [
            { id: 4, name: '百褶裙', thumbnail: '/static/clothes/bottoms/百褶裙.png', image: '/static/clothes/bottoms/full/百褶裙.png', compatibleStyles: [1, 2] },
            { id: 5, name: '马面裙', thumbnail: '/static/clothes/bottoms/马面裙.png', image: '/static/clothes/bottoms/full/马面裙.png', compatibleStyles: [1, 2, 5] },
            { id: 6, name: '裤子', thumbnail: '/static/clothes/bottoms/裤子.png', image: '/static/clothes/bottoms/full/裤子.png', compatibleStyles: [3] }
          ],
          outerwear: [
            { id: 7, name: '直领褙子', thumbnail: '/static/clothes/outerwear/直领褙子.png', image: '/static/clothes/outerwear/full/直领褙子.png', compatibleStyles: [1, 5] },
            { id: 8, name: '大袖衫', thumbnail: '/static/clothes/outerwear/大袖衫.png', image: '/static/clothes/outerwear/full/大袖衫.png', compatibleStyles: [3] },
            { id: 9, name: '半袖襦', thumbnail: '/static/clothes/outerwear/半袖襦.png', image: '/static/clothes/outerwear/full/半袖襦.png', compatibleStyles: [4] }
          ]
        },
        male: {
          top: [
            { id: 10, name: '中衣', thumbnail: '/static/clothes/male/tops/中衣.png', image: '/static/clothes/male/tops/full/中衣.png', compatibleStyles: [6, 7, 8] }
          ],
          bottom: [
            { id: 11, name: '裤子', thumbnail: '/static/clothes/male/bottoms/裤子.png', image: '/static/clothes/male/bottoms/full/裤子.png', compatibleStyles: [6, 7, 8] }
          ],
          outerwear: [
            { id: 12, name: '直裰', thumbnail: '/static/clothes/male/outerwear/直裰.png', image: '/static/clothes/male/outerwear/full/直裰.png', compatibleStyles: [6] },
            { id: 13, name: '道袍', thumbnail: '/static/clothes/male/outerwear/道袍.png', image: '/static/clothes/male/outerwear/full/道袍.png', compatibleStyles: [7] },
            { id: 14, name: '圆领袍', thumbnail: '/static/clothes/male/outerwear/圆领袍.png', image: '/static/clothes/male/outerwear/full/圆领袍.png', compatibleStyles: [8] }
          ]
        }
      }
    }
  },

  methods: {
    // 返回上一页
    goBack() {
      uni.navigateBack()
    },

    // 切换性别
    changeGender(newGender) {
      this.gender = newGender
      this.modelImage = `/static/clothes/model/${newGender}_base.png`
      this.resetOutfit()
    },

    // 获取当前分类的服装项
    getCurrentClothingItems() {
      if (this.activeCategory === 'top' || this.activeCategory === 'bottom' || this.activeCategory === 'outerwear') {
        const items = this.clothingDatabase[this.gender][this.activeCategory]

        // 如果已选择形制，则过滤出兼容的服装
        if (this.currentStyle) {
          return items.filter(item =>
            item.compatibleStyles.includes(this.currentStyle.id)
          )
        }
        return items
      }
      return []
    },

    // 检查是否选中
    isItemSelected(item) {
      return this.currentOutfit[this.activeCategory]?.id === item.id
    },

    // 选择服装项
    selectClothingItem(item) {
      this.currentOutfit[this.activeCategory] = item

      // 应用当前选择的颜色、布料、花纹效果
      this.applyVisualEffects()
    },

    // 选择形制
    selectStyle(style) {
      this.currentStyle = style

      // 更换形制时，检查当前服装是否兼容，不兼容则清空
      Object.keys(this.currentOutfit).forEach(category => {
        if (this.currentOutfit[category] &&
            !this.currentOutfit[category].compatibleStyles.includes(style.id)) {
          this.currentOutfit[category] = null
        }
      })
    },

    // 选择颜色
    selectColor(color) {
      this.currentColor = color
      this.applyVisualEffects()
    },

    // 选择布料
    selectFabric(fabric) {
      this.currentFabric = fabric
      this.applyVisualEffects()
    },

    // 选择花纹
    selectPattern(pattern) {
      this.currentPattern = pattern
      this.applyVisualEffects()
    },

    // 应用视觉效果（颜色、布料、花纹）
    applyVisualEffects() {
      // 这里可以添加滤镜或叠加效果
      // 实际项目中可能需要使用canvas或着色器
      console.log('应用视觉效果:', {
        color: this.currentColor,
        fabric: this.currentFabric,
        pattern: this.currentPattern
      })
    },

    // 重置搭配
    resetOutfit() {
      this.currentOutfit = {
        top: null,
        bottom: null,
        outerwear: null,
        accessories: null
      }
      this.currentStyle = null
      this.currentColor = null
      this.currentFabric = null
      this.currentPattern = null
    },

    // 保存搭配
    saveOutfit() {
      if (!this.currentOutfit.top && !this.currentOutfit.bottom) {
        uni.showToast({
          title: '请至少选择一件服装',
          icon: 'none'
        })
        return
      }

      const outfitData = {
        gender: this.gender,
        style: this.currentStyle,
        color: this.currentColor,
        fabric: this.currentFabric,
        pattern: this.currentPattern,
        outfit: this.currentOutfit,
        timestamp: Date.now()
      }

      // 保存到本地存储
      let savedOutfits = uni.getStorageSync('savedOutfits') || []
      savedOutfits.unshift(outfitData)
      uni.setStorageSync('savedOutfits', savedOutfits)

      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.design-page {
  padding-top:90rpx;
  background-color: #f8f5f0;
  min-height: 100vh;
  padding-bottom: 100rpx;
}

/* 头部样式 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx 40rpx;
  background-color: #9ea97f;
  border-bottom: 1rpx solid #e8e1d7;
}

.back-btn {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #333;
}

.back-icon {
  font-size: 36rpx;
  margin-right: 10rpx;
}

.gender-selector {
  display: flex;
  background-color: #f0ece5;
  border-radius: 50rpx;
  padding: 4rpx;
}

.gender-option {
  padding: 12rpx 30rpx;
  border-radius: 50rpx;
  font-size: 28rpx;
  color: #666;
}

.gender-option.active {
  background-color: #fff;
  color: #9ea97f;
  font-weight: 500;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

/* 模特展示区域 */
.model-container {
  position: relative;
  height: 600rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40rpx 0;
}

.model-base {
  width: 300rpx;
  height: auto;
}

.clothing-layer {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300rpx;
  height: auto;
  pointer-events: none;
}

.top-layer {
  z-index: 10;
}

.bottom-layer {
  z-index: 5;
}

.outerwear-layer {
  z-index: 15;
}

/* 分类标签 */
.category-tabs {
  display: flex;
  overflow-x: auto;
  padding: 20rpx 40rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #e8e1d7;
  white-space: nowrap;
}

.category-tab {
  padding: 16rpx 32rpx;
  font-size: 26rpx;
  color: #666;
  border-radius: 40rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.category-tab.active {
  background-color: #9ea97f;
  color: #fff;
}

/* 服装选择区域 */
.clothing-selector {
  margin: 30rpx 40rpx;
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
}

.selector-content {
  min-height: 200rpx;
}

/* 形制选择 */
.style-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.style-item {
  width: 160rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  border-radius: 16rpx;
  border: 2rpx solid #e8e1d7;
  background-color: #fcfaf7;
}

.style-item:active {
  background-color: #f0ece5;
}

.style-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 16rpx;
}

.style-name {
  font-size: 24rpx;
  color: #333;
  text-align: center;
  line-height: 1.3;
}

/* 颜色选择 */
.color-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 30rpx;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color-circle {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-bottom: 16rpx;
  border: 2rpx solid #e8e1d7;
}

.color-name {
  font-size: 24rpx;
  color: #333;
}

/* 布料和花纹选择 */
.fabric-selector,
.pattern-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.fabric-item,
.pattern-item {
  width: 160rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fabric-preview,
.pattern-preview {
  width: 120rpx;
  height: 120rpx;
  border-radius: 12rpx;
  margin-bottom: 16rpx;
  border: 2rpx solid #e8e1d7;
}

.fabric-name,
.pattern-name {
  font-size: 24rpx;
  color: #333;
  text-align: center;
}

/* 服装项目选择 */
.clothing-items {
  display: flex;
  overflow-x: auto;
  gap: 20rpx;
  padding: 10rpx 0;
}

.clothing-item {
  flex-shrink: 0;
  width: 180rpx;
  padding: 20rpx;
  border-radius: 16rpx;
  border: 2rpx solid #e8e1d7;
  background-color: #fcfaf7;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.clothing-item.selected {
  border-color: #9ea97f;
  background-color: #f0f2e6;
}

.clothing-thumb {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 16rpx;
}

.clothing-name {
  font-size: 24rpx;
  color: #333;
  text-align: center;
}

/* 当前信息 */
.current-info {
  margin: 30rpx 40rpx;
  padding: 30rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
}

.info-section {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.info-label {
  font-size: 26rpx;
  color: #666;
  margin-right: 16rpx;
}

.info-value {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.info-color {
  display: flex;
  align-items: center;
}

.current-color-circle {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  margin-right: 16rpx;
  border: 2rpx solid #e8e1d7;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  padding: 0 40rpx;
  gap: 30rpx;
  margin-top: 40rpx;
}

.btn {
  flex: 1;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;
}

.reset-btn {
  background-color: #f0ece5;
  color: #666;
}

.save-btn {
  background-color: #9ea97f;
  color: #fff;
}
</style>