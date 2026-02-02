<template>
  <view class="course-page">
    <!-- 顶部导航栏 -->
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">课程讲解</text>
      <view class="right-actions"></view>
    </view>

    <!-- 课程列表 -->
    <scroll-view class="course-scroll" scroll-y>
      <view class="course-container">
        <view
          v-for="(course, index) in courses"
          :key="index"
          class="course-card"
          @click="goToCourseDetail(course)"
        >
          <image class="course-image" :src="course.image" mode="aspectFill" />
          <view class="course-overlay">
            <view class="course-info">
              <text class="course-title">{{ course.title }}</text>
              <text class="course-subtitle">{{ course.subtitle }}</text>
              <view class="course-meta">
                <text class="course-duration">{{ course.duration }}</text>
                <text class="course-level">{{ course.level }}</text>
              </view>
            </view>
            <view class="play-btn">
              <text class="play-icon">▶</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        {
          id: 1,
          title: '宋代服饰形制详解',
          subtitle: '了解宋代服饰的基本形制与特点',
          image: '/static/cloth_index1.jpg',
          duration: '15分钟',
          level: '初级'
        },
        {
          id: 2,
          title: '褙子的制作工艺',
          subtitle: '学习褙子的裁剪与缝制技巧',
          image: '/static/cloth_index2.jpg',
          duration: '20分钟',
          level: '中级'
        },
        {
          id: 3,
          title: '宋代服饰色彩搭配',
          subtitle: '掌握宋代服饰的色彩美学',
          image: '/static/cloth_index3.jpg',
          duration: '12分钟',
          level: '初级'
        },
        {
          id: 4,
          title: '官服与民服的区别',
          subtitle: '深入了解宋代社会等级与服饰',
          image: '/static/apparel2.png',
          duration: '18分钟',
          level: '中级'
        },
        {
          id: 5,
          title: '宋代配饰文化',
          subtitle: '探索宋代配饰的精致工艺',
          image: '/static/pibo.png',
          duration: '10分钟',
          level: '初级'
        }
      ]
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    goToCourseDetail(course) {
      uni.navigateTo({
        url: `/pages/clothes/course/detail?id=${course.id}`
      })
    }
  }
}
</script>

<style scoped>
.course-page {
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

.course-scroll {
  height: calc(100vh - 140rpx);
}

.course-container {
  padding: 30rpx;
}

.course-card {
  position: relative;
  width: 100%;
  height: 320rpx;
  border-radius: 24rpx;
  overflow: hidden;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.course-image {
  width: 100%;
  height: 100%;
  display: block;
}

.course-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 30rpx;
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8rpx;
  letter-spacing: 1rpx;
  font-family: 'SimSun', 'Songti SC', 'STSong', serif;
}

.course-subtitle {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12rpx;
}

.course-meta {
  display: flex;
  gap: 20rpx;
}

.course-duration,
.course-level {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.8);
  padding: 4rpx 12rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12rpx;
}

.play-btn {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
}

.play-icon {
  font-size: 32rpx;
  color: #9ea97f;
  margin-left: 4rpx;
}

.back-btn:active,
.course-card:active {
  opacity: 0.8;
  transform: scale(0.98);
}
</style>

