<template>
  <view class="course-detail-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">课程详情</text>
      <view class="right-actions"></view>
    </view>

    <!-- 课程内容 -->
    <scroll-view class="detail-scroll" scroll-y>
      <view class="detail-container">
        <!-- 课程封面 -->
        <view class="course-cover">
          <image class="cover-image" :src="courseInfo.image" mode="aspectFill" />
          <view class="cover-overlay">
            <view class="play-btn-large" @click="playCourse">
              <text class="play-icon-large">▶</text>
            </view>
          </view>
        </view>

        <!-- 课程基本信息 -->
        <view class="info-section">
          <text class="course-title">{{ courseInfo.title }}</text>
          <text class="course-subtitle">{{ courseInfo.subtitle }}</text>
          <view class="course-meta-info">
            <view class="meta-item">
              <text class="meta-label">时长</text>
              <text class="meta-value">{{ courseInfo.duration }}</text>
            </view>
            <view class="meta-item">
              <text class="meta-label">难度</text>
              <text class="meta-value">{{ courseInfo.level }}</text>
            </view>
            <view class="meta-item">
              <text class="meta-label">分类</text>
              <text class="meta-value">{{ courseInfo.category }}</text>
            </view>
          </view>
        </view>

        <!-- 课程介绍 -->
        <view class="detail-section">
          <view class="section-title">课程介绍</view>
          <text class="section-content">{{ courseInfo.description }}</text>
        </view>

        <!-- 课程大纲 -->
        <view class="detail-section">
          <view class="section-title">课程大纲</view>
          <view class="outline-list">
            <view
              v-for="(item, index) in courseInfo.outline"
              :key="index"
              class="outline-item"
            >
              <view class="outline-number">{{ index + 1 }}</view>
              <view class="outline-content">
                <text class="outline-title">{{ item.title }}</text>
                <text class="outline-desc">{{ item.desc }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 学习要点 -->
        <view class="detail-section">
          <view class="section-title">学习要点</view>
          <view class="points-list">
            <view
              v-for="(point, index) in courseInfo.points"
              :key="index"
              class="point-item"
            >
              <text class="point-icon">•</text>
              <text class="point-text">{{ point }}</text>
            </view>
          </view>
        </view>

        <!-- 相关课程 -->
        <view class="related-section">
          <view class="section-title">相关课程</view>
          <scroll-view class="related-scroll" scroll-x>
            <view class="related-container">
              <view
                v-for="(item, index) in relatedCourses"
                :key="index"
                class="related-item"
                @click="goToRelatedCourse(item.id)"
              >
                <image class="related-image" :src="item.image" mode="aspectFill" />
                <text class="related-name">{{ item.title }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
    </scroll-view>

    <!-- 底部操作栏 -->
    <view class="bottom-actions">
      <button class="action-btn collect-btn" @click="collectCourse">
        <text class="btn-icon">{{ courseInfo.collected ? '★' : '☆' }}</text>
        <text class="btn-text">{{ courseInfo.collected ? '已收藏' : '收藏' }}</text>
      </button>
      <button class="action-btn start-btn" @click="startCourse">开始学习</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courseId: null,
      courseInfo: {
        title: '宋代服饰形制详解',
        subtitle: '了解宋代服饰的基本形制与特点',
        image: '/static/cloth_index1.jpg',
        duration: '15分钟',
        level: '初级',
        category: '形制',
        description: '本课程将深入讲解宋代服饰的基本形制与特点，包括褙子、圆领袍、直裰等经典服饰的形制特征、穿着方式以及历史背景。通过本课程的学习，您将全面了解宋代服饰文化的精髓。',
        outline: [
          { title: '宋代服饰概述', desc: '介绍宋代服饰的整体特点和发展脉络' },
          { title: '褙子的形制特点', desc: '详细讲解褙子的形制、裁剪和穿着方式' },
          { title: '圆领袍的官服制度', desc: '了解圆领袍在宋代官服体系中的地位' },
          { title: '直裰与道袍', desc: '探索宋代文人服饰的形制特征' },
          { title: '总结与实践', desc: '总结课程要点，进行实践操作' }
        ],
        points: [
          '掌握宋代服饰的基本形制特征',
          '了解不同服饰的穿着场合和礼仪',
          '学习宋代服饰的制作工艺',
          '理解宋代服饰文化的历史意义'
        ],
        collected: false
      },
      relatedCourses: [
        { id: 2, title: '褙子的制作工艺', image: '/static/cloth_index2.jpg' },
        { id: 3, title: '宋代服饰色彩搭配', image: '/static/cloth_index3.jpg' },
        { id: 4, title: '官服与民服的区别', image: '/static/apparel2.png' }
      ]
    }
  },
  onLoad(options) {
    if (options.id) {
      this.courseId = parseInt(options.id)
      this.loadCourseInfo(this.courseId)
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    loadCourseInfo(id) {
      // 根据id加载不同的课程信息
      const courses = {
        1: {
          title: '宋代服饰形制详解',
          subtitle: '了解宋代服饰的基本形制与特点',
          image: '/static/cloth_index1.jpg',
          duration: '15分钟',
          level: '初级',
          category: '形制',
          description: '本课程将深入讲解宋代服饰的基本形制与特点，包括褙子、圆领袍、直裰等经典服饰的形制特征、穿着方式以及历史背景。通过本课程的学习，您将全面了解宋代服饰文化的精髓。',
          outline: [
            { title: '宋代服饰概述', desc: '介绍宋代服饰的整体特点和发展脉络' },
            { title: '褙子的形制特点', desc: '详细讲解褙子的形制、裁剪和穿着方式' },
            { title: '圆领袍的官服制度', desc: '了解圆领袍在宋代官服体系中的地位' },
            { title: '直裰与道袍', desc: '探索宋代文人服饰的形制特征' },
            { title: '总结与实践', desc: '总结课程要点，进行实践操作' }
          ],
          points: [
            '掌握宋代服饰的基本形制特征',
            '了解不同服饰的穿着场合和礼仪',
            '学习宋代服饰的制作工艺',
            '理解宋代服饰文化的历史意义'
          ]
        },
        2: {
          title: '褙子的制作工艺',
          subtitle: '学习褙子的裁剪与缝制技巧',
          image: '/static/cloth_index2.jpg',
          duration: '20分钟',
          level: '中级',
          category: '工艺',
          description: '本课程将详细讲解褙子的制作工艺，包括选料、裁剪、缝制等各个环节的技巧和方法。通过实际操作演示，帮助您掌握褙子的制作技能。',
          outline: [
            { title: '选料与准备', desc: '介绍褙子制作所需的材料和工具' },
            { title: '裁剪技巧', desc: '详细讲解褙子的裁剪方法和注意事项' },
            { title: '缝制工艺', desc: '学习褙子的缝制技巧和细节处理' },
            { title: '装饰与整理', desc: '了解褙子的装饰工艺和整理方法' }
          ],
          points: [
            '掌握褙子的裁剪技巧',
            '学习传统缝制工艺',
            '了解装饰细节的处理方法',
            '完成一件完整的褙子制作'
          ]
        },
        3: {
          title: '宋代服饰色彩搭配',
          subtitle: '掌握宋代服饰的色彩美学',
          image: '/static/cloth_index3.jpg',
          duration: '12分钟',
          level: '初级',
          category: '美学',
          description: '本课程将介绍宋代服饰的色彩美学，包括传统色彩的运用、搭配原则以及不同场合的色彩选择。',
          outline: [
            { title: '宋代色彩体系', desc: '介绍宋代服饰的传统色彩' },
            { title: '色彩搭配原则', desc: '学习宋代服饰的色彩搭配方法' },
            { title: '场合与色彩', desc: '了解不同场合的色彩选择' }
          ],
          points: [
            '了解宋代传统色彩',
            '掌握色彩搭配技巧',
            '学会根据场合选择色彩'
          ]
        },
        4: {
          title: '官服与民服的区别',
          subtitle: '深入了解宋代社会等级与服饰',
          image: '/static/apparel2.png',
          duration: '18分钟',
          level: '中级',
          category: '历史',
          description: '本课程将深入探讨宋代官服与民服的区别，了解宋代社会等级制度在服饰上的体现。',
          outline: [
            { title: '官服制度', desc: '介绍宋代官服的基本制度' },
            { title: '民服特点', desc: '了解宋代民服的基本特征' },
            { title: '等级差异', desc: '分析官服与民服的区别' }
          ],
          points: [
            '理解宋代官服制度',
            '了解民服的基本特点',
            '掌握等级差异的表现'
          ]
        },
        5: {
          title: '宋代配饰文化',
          subtitle: '探索宋代配饰的精致工艺',
          image: '/static/pibo.png',
          duration: '10分钟',
          level: '初级',
          category: '配饰',
          description: '本课程将介绍宋代配饰文化，包括各种配饰的种类、制作工艺和文化内涵。',
          outline: [
            { title: '配饰种类', desc: '介绍宋代常见的配饰类型' },
            { title: '制作工艺', desc: '了解配饰的制作工艺' },
            { title: '文化内涵', desc: '探索配饰的文化意义' }
          ],
          points: [
            '了解宋代配饰种类',
            '学习配饰制作工艺',
            '理解配饰的文化内涵'
          ]
        }
      }
      if (courses[id]) {
        this.courseInfo = { ...this.courseInfo, ...courses[id] }
      }
    },
    playCourse() {
      uni.showToast({
        title: '开始播放课程',
        icon: 'none'
      })
      // 这里可以跳转到视频播放页面
    },
    collectCourse() {
      this.courseInfo.collected = !this.courseInfo.collected
      uni.showToast({
        title: this.courseInfo.collected ? '收藏成功' : '取消收藏',
        icon: 'success'
      })
    },
    startCourse() {
      this.playCourse()
    },
    goToRelatedCourse(id) {
      uni.redirectTo({
        url: `/pages/clothes/course/detail?id=${id}`
      })
    }
  }
}
</script>

<style scoped>
.course-detail-page {
  background-color: #f6f2e9;
  min-height: 100vh;
  font-family: 'PingFang SC', 'Noto Sans SC', system-ui, -apple-system, sans-serif;
  padding-bottom: 120rpx;
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
  height: calc(100vh - 140rpx - 120rpx);
}

.detail-container {
  padding-bottom: 40rpx;
}

.course-cover {
  position: relative;
  width: 100%;
  height: 500rpx;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 100%;
  display: block;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-btn-large {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.3);
}

.play-icon-large {
  font-size: 50rpx;
  color: #9ea97f;
  margin-left: 6rpx;
}

.info-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.course-title {
  display: block;
  font-size: 42rpx;
  font-weight: 700;
  color: #3b352b;
  margin-bottom: 12rpx;
  letter-spacing: 2rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.course-subtitle {
  display: block;
  font-size: 28rpx;
  color: #7a756e;
  margin-bottom: 30rpx;
  line-height: 1.6;
}

.course-meta-info {
  display: flex;
  gap: 40rpx;
}

.meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.meta-label {
  font-size: 24rpx;
  color: #999;
  margin-bottom: 8rpx;
}

.meta-value {
  font-size: 28rpx;
  color: #9ea97f;
  font-weight: 600;
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

.outline-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.outline-item {
  display: flex;
  align-items: flex-start;
}

.outline-number {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #9ea97f;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 600;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.outline-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.outline-title {
  font-size: 28rpx;
  color: #3b352b;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.outline-desc {
  font-size: 26rpx;
  color: #7a756e;
  line-height: 1.6;
}

.points-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.point-item {
  display: flex;
  align-items: flex-start;
}

.point-icon {
  font-size: 32rpx;
  color: #9ea97f;
  margin-right: 16rpx;
  margin-top: -4rpx;
}

.point-text {
  flex: 1;
  font-size: 28rpx;
  color: #5a5a5a;
  line-height: 1.8;
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

.bottom-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  border-top: 1rpx solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.action-btn {
  flex: 1;
  height: 80rpx;
  border-radius: 40rpx;
  font-size: 28rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
}

.collect-btn {
  background-color: #f0ece5;
  color: #666;
  margin-right: 20rpx;
}

.start-btn {
  background-color: #9ea97f;
  color: #ffffff;
}

.btn-icon {
  font-size: 32rpx;
}

.btn-text {
  font-size: 28rpx;
}

.back-btn:active,
.play-btn-large:active,
.related-item:active,
.action-btn:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

