const base = import.meta.env.VITE_AGENT_API_BASE || 'http://127.0.0.1:8080/api/agent'

export function agentRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: base + path, method, data, timeout: 15000,
      success(response) {
        if (response.statusCode === 200 && response.data?.code === 0) resolve(response.data.data)
        else reject(new Error(response.data?.message || '助手服务暂不可用'))
      },
      fail() { reject(new Error('连接失败，请重试')) },
    })
  })
}

export function agentId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}
