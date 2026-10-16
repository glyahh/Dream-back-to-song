<template>
  <view class="assistant-page">
    <view class="assistant-nav" :style="{ paddingTop: `${statusBarHeight + 8}px` }">
      <button class="back-btn" aria-label="返回" @click="goBack">‹</button>
      <text class="assistant-title">宋朝助手</text>
      <view class="nav-spacer" />
    </view>
    <scroll-view class="conversation" scroll-y :scroll-into-view="bottomId">
      <view v-if="!turns.length" class="welcome">想了解什么，或一起做道菜？</view>
      <view v-for="turn in turns" :key="turn.turnId" class="turn">
        <view class="user-message-row"><view class="user-message"><text selectable>{{ turn.input.text }}</text></view></view>
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
          <view v-if="turn.status === 'running' && !hasAnswerText(turn)" class="turn-status"><text>正在思考</text><text class="thinking-dots">···</text></view>
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
        <view class="composer-leading">
          <button class="plus-btn" aria-label="更多功能" @click.stop="menuOpen = !menuOpen">+</button>
          <view v-if="menuOpen" class="composer-menu">
            <button @click="clearContext">清空对话</button>
          </view>
        </view>
        <input v-model="text" class="message-input" placeholder="说说你的想法" confirm-type="send" :disabled="sending" @confirm="send" />
        <button v-if="activeTurn" class="send-btn" @click="stop">停止</button>
        <button v-else class="send-btn" :disabled="sending || !text.trim()" @click="send">发送</button>
      </view>
    </view>
  </view>
</template>

<script>
import { agentBase, agentId, agentRequest } from '@/utils/agentApi.js'
import { executeAgentAction, openAgentContent } from '@/utils/agentActions.js'
import { createAgentStream } from '@/utils/agentStream.js'
import { createTextBatcher } from '@/utils/agentTextQueue.js'

const HISTORY_KEY = 'agent_session_v1'
const isActive = (turn) => ['running', 'waiting_client'].includes(turn.status)
const isTerminal = (turn) => ['completed', 'failed', 'cancelled'].includes(turn?.status)
const decodeRouteQuery = (value) => {
  if (typeof value !== 'string') return ''
  try { return decodeURIComponent(value.replace(/\+/g, ' ')) }
  catch { return value }
}

export default {
  data() {
    return { sessionId: '', turns: [], text: '', error: '', sending: false, refreshing: false,
      visible: false, timer: null, bottomId: '', entry: { source: 'assistant' }, pending: null, initialQuery: false,
      entryRequestId: '', entryText: '', stream: null, streamTurnId: '', streamError: false,
      streamCursors: {}, streamBatcher: null, streamQueueTurnId: '', statusBarHeight: 0, menuOpen: false,
      saveTimer: null, scrollTimer: null }
  },
  computed: {
    activeTurn() { return this.turns.find(isActive) },
  },
  onLoad(options) {
    try {
      if (typeof uni.getSystemInfoSync === 'function') this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
      const saved = uni.getStorageSync(HISTORY_KEY)
      if (saved) {
        this.sessionId = saved.sessionId
        this.turns = saved.turns || []
        this.pending = saved.pending || null
        this.streamCursors = saved.streamCursors || {}
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
    hasAnswerText(turn) {
      return Boolean(turn?.blocks?.some((block) => block.type === 'text' && block.text))
    },
    saveNow() {
      uni.setStorageSync(HISTORY_KEY, { sessionId: this.sessionId, turns: this.turns, pending: this.pending,
        streamCursors: this.streamCursors })
    },
    save(immediate = false) {
      if (immediate) {
        clearTimeout(this.saveTimer)
        this.saveTimer = null
        this.saveNow()
        return
      }
      if (this.saveTimer) return
      this.saveTimer = setTimeout(() => {
        this.saveTimer = null
        this.saveNow()
      }, 200)
    },
    pausePolling() {
      this.visible = false
      this.menuOpen = false
      clearTimeout(this.timer)
      this.stopStream()
      this.save(true)
    },
    scheduleScroll() {
      if (this.scrollTimer) return
      this.scrollTimer = setTimeout(() => {
        this.scrollTimer = null
        this.bottomId = ''
        this.$nextTick(() => { this.bottomId = 'conversation-end' })
      }, 30)
    },
    appendStreamText(text) {
      if (!this.streamQueueTurnId) return
      const turn = this.turns.find((item) => item.turnId === this.streamQueueTurnId)
      if (!turn) return
      const block = turn.blocks.find((item) => item.type === 'text')
      if (block) block.text += text
      else turn.blocks.unshift({ type: 'text', text })
      this.save()
      this.scheduleScroll()
    },
    stopStream() {
      this.streamBatcher?.close?.()
      this.streamBatcher = null
      this.stream?.close?.()
      this.stream = null
      this.streamTurnId = ''
    },
    startStream(turn) {
      if (!turn || !isActive(turn) || (this.stream && this.streamTurnId === turn.turnId)) return
      this.stopStream()
      this.streamTurnId = turn.turnId
      this.streamQueueTurnId = turn.turnId
      this.streamBatcher = createTextBatcher((text) => this.appendStreamText(text))
      this.streamError = false
      this.stream = createAgentStream({
        url: `${agentBase}/sessions/${this.sessionId}/turns/${turn.turnId}/events`,
        after: this.streamCursors[turn.turnId] || 0,
        onOpen: () => { this.streamError = false },
        onEvent: (event) => this.applyStreamEvent(event),
        onError: () => { this.streamError = true },
        onClose: () => { if (this.streamTurnId === turn.turnId) this.stream = null },
      })
    },
    applyStreamEvent(event) {
      const payload = event.payload
      if (!payload || payload.turnId !== this.streamTurnId) return
      const seq = Number(payload.seq)
      const cursor = this.streamCursors[payload.turnId] || 0
      if (payload.type !== 'heartbeat') {
        if (!Number.isInteger(seq) || seq <= cursor) return
        if (seq > cursor + 1) {
          this.stopStream()
          const turn = this.turns.find((item) => item.turnId === payload.turnId)
          if (turn) this.startStream(turn)
          return
        }
        this.streamCursors[payload.turnId] = seq
      }
      const turn = this.turns.find((item) => item.turnId === payload.turnId)
      if (!turn) return
      if (payload.type === 'text_delta' && payload.delta) {
        this.streamBatcher?.push(payload.delta)
        turn.status = 'running'
      } else if (payload.type === 'turn_waiting_client') {
        turn.status = 'waiting_client'
      } else if (payload.type === 'turn_completed' || payload.type === 'turn_failed' || payload.type === 'turn_cancelled') {
        this.streamBatcher?.flush?.()
        const index = this.turns.findIndex((item) => item.turnId === payload.turnId)
        if (index >= 0 && payload.turn) {
          this.turns.splice(index, 1, payload.turn)
          this.save(true)
        } else {
          const status = payload.type === 'turn_completed' ? 'completed'
            : payload.type === 'turn_cancelled' ? 'cancelled' : 'failed'
          turn.status = status
          if (payload.error) turn.error = payload.error
          this.save(true)
        }
        this.stopStream()
        if (!payload.turn) this.refresh()
      }
      this.scheduleScroll()
    },
    async ensureSession() {
      if (!this.sessionId) {
        this.sessionId = (await agentRequest('POST', '/sessions', {})).sessionId
        this.save(true)
      }
    },
    mergeTurns(serverTurns) {
      const visibleTurns = new Map(this.turns.map((turn) => [turn.turnId, turn]))
      return serverTurns.map((serverTurn) => {
        const visibleTurn = visibleTurns.get(serverTurn.turnId)
        if (visibleTurn && isTerminal(visibleTurn) && !isTerminal(serverTurn)) return visibleTurn
        return serverTurn
      })
    },
    async refresh() {
      if (this.refreshing) return
      this.refreshing = true
      clearTimeout(this.timer)
      try {
        await this.ensureSession()
        const session = await agentRequest('GET', `/sessions/${this.sessionId}`)
        this.turns = this.mergeTurns(session.turns)
        if (this.initialQuery && this.turns.some((turn) => turn.input.requestId === this.entryRequestId)) {
          this.initialQuery = false
          if (this.text === this.entryText) this.text = ''
        }
        if (this.pending && this.turns.some((turn) => turn.input.requestId === this.pending.requestId)) {
          this.pending = null
          this.text = ''
        }
        this.save(true)
        this.error = ''
        const turn = this.activeTurn
        this.startStream(turn)
        if (turn) {
          for (const action of turn.actions.filter((action) => !action.receipt)) {
            // Recheck immediately before executing a delivered action, including after a page reopen.
            const latest = await agentRequest('GET', `/sessions/${this.sessionId}/turns/${turn.turnId}`)
            if (!isActive(latest)) break
            const receipt = await executeAgentAction(action)
            await agentRequest('POST', `/sessions/${this.sessionId}/actions/${action.actionId}/receipt`, receipt)
          }
        }
        this.scheduleScroll()
      } catch (error) { this.error = error.message }
      finally {
        this.refreshing = false
        if (this.visible && this.activeTurn && (!this.stream || this.streamError)) this.timer = setTimeout(() => this.refresh(), 800)
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
        this.save(true)
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
    async clearContext() {
      this.menuOpen = false
      try {
        const turn = this.activeTurn
        if (turn) await agentRequest('POST', `/sessions/${this.sessionId}/turns/${turn.turnId}/cancel`, {})
        this.stopStream()
        this.sessionId = (await agentRequest('POST', '/sessions', {})).sessionId
        this.turns = []
        this.pending = null
        this.text = ''
        this.streamCursors = {}
        this.error = ''
        this.save(true)
        this.scheduleScroll()
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
.assistant-nav { position: relative; display: flex; align-items: center; min-height: 88rpx; padding: 8px 24rpx 18rpx; box-sizing: border-box; border-bottom: 1px solid #dfdfd2; }
.assistant-title { flex: 1; text-align: center; font-size: 34rpx; }
.back-btn, .nav-spacer { width: 70rpx; }
.back-btn { padding: 0; background: transparent; font-size: 50rpx; line-height: 1.2; }
button::after { border: none; }
.conversation { flex: 1; height: 0; }
.welcome { padding: 100rpx 36rpx; text-align: center; color: #71796b; }
.turn { max-width: 760px; padding: 26rpx; margin: 0 auto; }
.user-message-row { display: flex; justify-content: flex-end; min-width: 0; }
.user-message { display: inline-block; max-width: 88%; min-width: 0; margin-left: 0; padding: 22rpx 26rpx; box-sizing: border-box; border-radius: 24rpx 24rpx 4rpx 24rpx; background: #dfe6d5; overflow-wrap: anywhere; word-break: break-all; white-space: pre-wrap; }
.user-message text { display: block; max-width: 100%; overflow-wrap: anywhere; word-break: break-all; }
.assistant-message { width: 100%; min-width: 0; margin-top: 26rpx; line-height: 1.8; }
.answer { display: block; max-width: 100%; white-space: pre-wrap; overflow-wrap: anywhere; word-break: break-word; font-size: 30rpx; }
.content-cards { display: flex; flex-direction: column; align-items: stretch; width: 100%; gap: 16rpx; margin-top: 20rpx; }
.content-card { display: flex; align-items: center; width: 100%; min-width: 0; box-sizing: border-box; gap: 20rpx; padding: 18rpx; text-align: left; background: #fffdf7; border-radius: 16rpx; line-height: 1.5; }
.content-card > view { flex: 1; min-width: 0; }
.content-card image { width: 120rpx; height: 120rpx; flex-shrink: 0; border-radius: 10rpx; }
.card-title, .card-summary { display: block; }
.card-title { font-size: 30rpx; }
.card-summary { margin-top: 8rpx; font-size: 24rpx; color: #72776c; }
.turn-status, .action-result { display: block; color: #707b67; font-size: 25rpx; }
.thinking-dots { display: inline-block; min-width: 42rpx; animation: thinking 1.2s steps(4, end) infinite; }
@keyframes thinking { 0% { opacity: 0.25; } 50% { opacity: 1; } 100% { opacity: 0.25; } }
.turn-error, .connection-error { color: #9b4637; font-size: 26rpx; }
.composer { padding: 20rpx 24rpx calc(20rpx + env(safe-area-inset-bottom)); background: #fffdf7; }
.composer-row { display: flex; gap: 16rpx; align-items: center; }
.composer-leading { position: relative; flex-shrink: 0; }
.plus-btn { width: 58rpx; height: 58rpx; padding: 0; color: #4f654d; background: #eeeee4; border-radius: 50%; font-size: 42rpx; line-height: 54rpx; }
.composer-menu { position: absolute; z-index: 20; bottom: 72rpx; left: 0; width: 190rpx; padding: 8rpx; background: #fffdf7; border: 1rpx solid #dfdfd2; border-radius: 14rpx; box-shadow: 0 8rpx 24rpx rgba(52, 62, 53, 0.16); }
.composer-menu button { width: 100%; padding: 14rpx 8rpx; color: #343e35; background: transparent; font-size: 26rpx; }
.message-input { flex: 1; min-width: 0; padding: 18rpx; background: #eeeee4; border-radius: 14rpx; font-size: 28rpx; }
.send-btn { padding: 0 26rpx; font-size: 28rpx; color: white; background: #4f654d; border-radius: 14rpx; }
.connection-error { display: flex; gap: 16rpx; align-items: center; margin-bottom: 12rpx; }
.connection-error button { padding: 0 12rpx; font-size: 24rpx; }
.conversation-end { height: 20rpx; }
.sources { margin-top: 16rpx; font-size: 24rpx; }
.sources a { color: #4f654d; text-decoration: underline; }
.sources button { padding: 4rpx 0; text-align: left; font-size: 24rpx; color: #4f654d; background: transparent; }
</style>
