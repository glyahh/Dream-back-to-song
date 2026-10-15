<template>
  <view class="player-page">
    <view class="nav-bar">
      <view class="back-btn" @click="goBack">
        <text class="back-icon">‹</text>
      </view>
      <text class="nav-title">课程播放</text>
      <view class="right-actions"></view>
    </view>

    <view class="player-container">
      <view v-if="videoSrc" class="video-wrap">
        <video
          class="video-player"
          :src="videoSrc"
          :poster="videoMeta.poster"
          controls
          object-fit="contain"
          @error="onVideoError"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { getCourseVideoById } from '@/utils/courseVideos'

export default {
  data() {
    return {
      videoSrc: '',
      downloading: false,
      videoMeta: {
        title: '课程视频',
        poster: '',
        sourceUrl: '',
        licenseNote: ''
      }
    }
  },
  onLoad(options) {
    const id = Number(options.id)
    const meta = getCourseVideoById(id)
    if (!meta) {
      uni.showToast({ title: '课程不存在', icon: 'none' })
      setTimeout(() => this.goBack(), 600)
      return
    }

    this.videoMeta = meta
    this.videoSrc = ''
    this.downloading = false
    this.resolveVideoSrc(meta)
  },
  methods: {
    logDebug(stage, payload = '') {
      if (process.env.NODE_ENV === 'production') return
      // eslint-disable-next-line no-console
      console.log(`[video-player] ${stage}`, payload)
    },
    stringifyError(err) {
      if (!err) return 'unknown error'
      if (typeof err === 'string') return err
      return err.message || JSON.stringify(err)
    },
    async resolveVideoSrc(meta) {
      const fallbackUrl = meta.playUrl || meta.sourceUrl
      if (!fallbackUrl) {
        this.logDebug('missing-play-url', { meta })
        return
      }

      // #ifdef MP-WEIXIN
      try {
        const { getCachedFile, downloadAndCache } = await import('@/utils/videoCache')
        const url = fallbackUrl
        this.logDebug('resolve-start', { url })

        const cached = await getCachedFile(url)
        if (cached) {
          this.logDebug('cache-hit', { cached })
          this.videoSrc = cached
          return
        }

        this.logDebug('cache-miss', { url })
        this.downloading = true
        uni.showLoading({ title: '下载中…', mask: true })
        const savedFilePath = await downloadAndCache(url, { maxBytes: 200 * 1024 * 1024 })
        this.logDebug('download-success', { savedFilePath })
        this.videoSrc = savedFilePath
      } catch (e) {
        const msg = this.stringifyError(e)
        this.logDebug('download-failed-fallback-remote', { msg, fallbackUrl })
        this.videoSrc = fallbackUrl
      } finally {
        this.downloading = false
        uni.hideLoading()
      }
      return
      // #endif

      this.logDebug('non-weixin-direct-play', { fallbackUrl })
      this.videoSrc = fallbackUrl
    },
    onVideoError(e) {
      const detail = e && e.detail ? e.detail : {}
      this.logDebug('video-component-error', { detail, videoSrc: this.videoSrc })
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style scoped>
.player-page {
  min-height: 100vh;
  background-color: #f6f2e9;
}

.nav-bar {
  height: 140rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #f6f2e9;
}

.back-btn {
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  font-size: 40rpx;
  color: #333;
}

.nav-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #3b352b;
}

.right-actions {
  width: 70rpx;
}

.player-container {
  padding: 24rpx;
}

.video-player {
  width: 100%;
  height: 420rpx;
  background: #000;
  border-radius: 16rpx;
}

.video-wrap {
  position: relative;
  width: 100%;
  border-radius: 16rpx;
  overflow: hidden;
}
</style>
