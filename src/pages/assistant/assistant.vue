<template>
  <view class="assistant-page">
    <view class="assistant-nav">
      <button class="back-btn" aria-label="返回" @click="goBack">‹</button>
      <text class="assistant-title">宋朝助手</text>
      <view class="nav-spacer" />
    </view>
    <scroll-view class="conversation" scroll-y :scroll-into-view="bottomId">
      <view v-if="!turns.length" class="welcome">想了解什么，或一起做道菜？</view>
      <view v-for="turn in turns" :key="turn.turnId" class="turn">
        <view class="user-message"><text selectable>{{ turn.input.text }}</text></view>
        <view class="assistant-message">
          <template v-for="(block, index) in turn.blocks" :key="index">
            <text v-if="block.type === 'text'" class="answer" selectable>{{ displayText(block.text) }}</text>
            <view v-else-if="block.type === 'cards'" class="content-cards">
              <button v-for="item in block.items" :key="item.id" class="content-card" @click="openCard(item)">
                <image :src="item.image" mode="aspectFill" :alt="item.title" />
                <view><text class="card-title">{{ item.title }}</text><text class="card-summary">{{ item.summary }}</text></view>
              </button>
            </view>
            <text v-else-if="block.type === 'action_result'" class="action-result" :aria-label="block.status === 'succeeded' ? '操作完成' : '操作未完成'">{{ block.status === 'succeeded' ? '✓' : '未完成' }}</text>
            <view v-else-if="block.type === 'sources'" class="sources">
              <view v-for="source in block.items" :key="source.sourceId">
                <!-- #ifdef H5 -->
                <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a>
                <!-- #endif -->
                <!-- #ifndef H5 -->
                <button @click="copySource(source)">{{ source.title }}</button>
                <!-- #endif -->
              </view>
            </view>
          </template>
          <text v-if="turn.status === 'running'" class="turn-status">正在思考…</text>
          <text v-if="turn.status === 'waiting_client'" class="turn-status">正在处理…</text>
          <text v-if="turn.status === 'failed'" class="turn-error" role="alert">{{ turn.error || '本轮未完成' }}</text>
          <text v-if="turn.status === 'cancelled'" class="turn-status">已停止</text>
        </view>
      </view>
      <view id="conversation-end" class="conversation-end" />
    </scroll-view>
    <view class="composer">
      <view v-if="error" class="connection-error" role="alert"><text>{{ error }}</text><button @click="refresh">重试连接</button></view>
      <view class="composer-row">
        <input v-model="text" class="message-input" placeholder="说说你的想法" confirm-type="send" :disabled="sending" @confirm="send" />
        <button v-if="activeTurn" class="send-btn" @click="stop">停止</button>
        <button v-else class="send-btn" :disabled="sending || !text.trim()" @click="send">发送</button>
      </view>
    </view>
  </view>
</template>

<script>
import { agentId, agentRequest } from '@/utils/agentApi.js'
import { executeAgentAction, openAgentContent } from '@/utils/agentActions.js'

const HISTORY_KEY = 'agent_session_v1'
const isActive = (turn) => ['running', 'waiting_client'].includes(turn.status)
const decodeRouteQuery = (value) => {
  if (typeof value !== 'string') return ''
  try { return decodeURIComponent(value.replace(/\+/g, ' ')) }
  catch { return value }
}

export default {
  data() {
    return { sessionId: '', turns: [], text: '', error: '', sending: false, refreshing: false,
      visible: false, timer: null, bottomId: '', entry: { source: 'assistant' }, pending: null, initialQuery: false,
      entryRequestId: '', entryText: '' }
  },
  computed: {
    activeTurn() { return this.turns.find(isActive) },
  },
  onLoad(options) {
    try {
      const saved = uni.getStorageSync(HISTORY_KEY)
      if (saved) {
        this.sessionId = saved.sessionId
        this.turns = saved.turns || []
        this.pending = saved.pending || null
        this.text = this.pending?.text || ''
      }
      this.entry = { source: options.source || 'assistant' }
      if (options.q) {
        this.entryText = decodeRouteQuery(options.q).trim()
        this.entryRequestId = options.requestId || `entry:${this.entry.source}:${this.entryText}`
        if (!this.pending && !this.turns.some((turn) => turn.input.requestId === this.entryRequestId)) {
          this.text = this.entryText
          this.initialQuery = true
        }
      }
    } catch { this.error = '历史读取失败' }
  },
  async onShow() {
    this.visible = true
    await this.refresh()
  },
  onHide() { this.pausePolling() },
  onUnload() { this.pausePolling() },
  methods: {
    displayText(text) { return text.replace(/\*\*([^*]+)\*\*/g, '$1') },
    save() {
      uni.setStorageSync(HISTORY_KEY, { sessionId: this.sessionId, turns: this.turns, pending: this.pending })
    },
    pausePolling() {
      this.visible = false
      clearTimeout(this.timer)
    },
    async ensureSession() {
      if (!this.sessionId) {
        this.sessionId = (await agentRequest('POST', '/sessions', {})).sessionId
        this.save()
      }
    },
    async refresh() {
      if (this.refreshing) return
      this.refreshing = true
      clearTimeout(this.timer)
      try {
        await this.ensureSession()
        const session = await agentRequest('GET', `/sessions/${this.sessionId}`)
        this.turns = session.turns
        if (this.initialQuery && this.turns.some((turn) => turn.input.requestId === this.entryRequestId)) {
          this.initialQuery = false
          if (this.text === this.entryText) this.text = ''
        }
        if (this.pending && this.turns.some((turn) => turn.input.requestId === this.pending.requestId)) {
          this.pending = null
          this.text = ''
        }
        this.save()
        this.error = ''
        const turn = this.activeTurn
        if (turn) {
          for (const action of turn.actions.filter((action) => !action.receipt)) {
            // Recheck immediately before executing a delivered action, including after a page reopen.
            const latest = await agentRequest('GET', `/sessions/${this.sessionId}/turns/${turn.turnId}`)
            if (!isActive(latest)) break
            const receipt = await executeAgentAction(action)
            await agentRequest('POST', `/sessions/${this.sessionId}/actions/${action.actionId}/receipt`, receipt)
          }
        }
        this.bottomId = ''
        this.$nextTick(() => { this.bottomId = 'conversation-end' })
      } catch (error) { this.error = error.message }
      finally {
        this.refreshing = false
        if (this.visible && this.activeTurn) this.timer = setTimeout(() => this.refresh(), 800)
        else if (this.visible && this.initialQuery && !this.error && !this.sending) {
          this.send()
        }
      }
    },
    async send() {
      if (this.sending || this.activeTurn || !this.text.trim()) return
      this.sending = true
      try {
        await this.ensureSession()
        if (this.pending && this.pending.text !== this.text.trim()) throw new Error('请先重发上一条未确认的消息')
        this.pending = this.pending || { requestId: this.initialQuery && this.text.trim() === this.entryText
          ? this.entryRequestId : agentId(), text: this.text.trim(), entry: this.entry }
        this.initialQuery = false
        this.save()
        await agentRequest('POST', `/sessions/${this.sessionId}/turns`, this.pending)
        this.pending = null
        this.text = ''
        this.save()
        await this.refresh()
      } catch (error) { this.error = error.message }
      finally { this.sending = false }
    },
    async stop() {
      const turn = this.activeTurn
      if (!turn) return
      try {
        await agentRequest('POST', `/sessions/${this.sessionId}/turns/${turn.turnId}/cancel`, {})
        await this.refresh()
      } catch (error) { this.error = error.message }
    },
    async openCard(item) {
      // Opening a user-selected card is a direct navigation, independent of model actions.
      try { await openAgentContent(item.id) }
      catch { this.error = '页面暂时无法打开' }
    },
    goBack() {
      uni.navigateBack({ fail: () => uni.redirectTo({ url: '/pages/main_index/main_index' }) })
    },
    copySource(source) {
      uni.setClipboardData({ data: source.url, fail: () => { this.error = '链接复制失败' } })
    },
  },
}
</script>

<style scoped>
.assistant-page { height: 100vh; display: flex; flex-direction: column; background: #f6f3eb; color: #343e35; }
.assistant-nav { display: flex; align-items: center; padding: calc(20rpx + env(safe-area-inset-top)) 24rpx 18rpx; border-bottom: 1px solid #dfdfd2; }
.assistant-title { flex: 1; text-align: center; font-size: 34rpx; }
.back-btn, .nav-spacer { width: 70rpx; }
.back-btn { padding: 0; background: transparent; font-size: 50rpx; line-height: 1.2; }
button::after { border: none; }
.conversation { flex: 1; height: 0; }
.welcome { padding: 100rpx 36rpx; text-align: center; color: #71796b; }
.turn { max-width: 760px; padding: 26rpx; margin: 0 auto; }
.user-message { margin-left: 12%; padding: 22rpx 26rpx; border-radius: 24rpx 24rpx 4rpx 24rpx; background: #dfe6d5; }
.assistant-message { margin-top: 26rpx; line-height: 1.8; }
.answer { display: block; white-space: pre-wrap; font-size: 30rpx; }
.content-cards { display: flex; flex-direction: column; gap: 16rpx; margin-top: 20rpx; }
.content-card { display: flex; align-items: center; gap: 20rpx; padding: 18rpx; text-align: left; background: #fffdf7; border-radius: 16rpx; line-height: 1.5; }
.content-card image { width: 120rpx; height: 120rpx; flex-shrink: 0; border-radius: 10rpx; }
.card-title, .card-summary { display: block; }
.card-title { font-size: 30rpx; }
.card-summary { margin-top: 8rpx; font-size: 24rpx; color: #72776c; }
.turn-status, .action-result { display: block; color: #707b67; font-size: 25rpx; }
.turn-error, .connection-error { color: #9b4637; font-size: 26rpx; }
.composer { padding: 20rpx 24rpx calc(20rpx + env(safe-area-inset-bottom)); background: #fffdf7; }
.composer-row { display: flex; gap: 16rpx; align-items: center; }
.message-input { flex: 1; min-width: 0; padding: 18rpx; background: #eeeee4; border-radius: 14rpx; font-size: 28rpx; }
.send-btn { padding: 0 26rpx; font-size: 28rpx; color: white; background: #4f654d; border-radius: 14rpx; }
.connection-error { display: flex; gap: 16rpx; align-items: center; margin-bottom: 12rpx; }
.connection-error button { padding: 0 12rpx; font-size: 24rpx; }
.conversation-end { height: 20rpx; }
.sources { margin-top: 16rpx; font-size: 24rpx; }
.sources a { color: #4f654d; text-decoration: underline; }
.sources button { padding: 4rpx 0; text-align: left; font-size: 24rpx; color: #4f654d; background: transparent; }
</style>
