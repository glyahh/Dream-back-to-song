// 统一封装登录相关接口，便于后续接入后端

// 发送短信验证码，占位实现
export async function sendVerifyCode(phone) {
  // 这里预留真实后端调用示例，方便后续接入：
  // return new Promise((resolve, reject) => {
  //   uni.request({
  //     url: 'https://your-api-domain.com/api/auth/send-code',
  //     method: 'POST',
  //     data: { phone },
  //     success: (res) => {
  //       if (res.data && res.data.success) resolve(true)
  //       else reject(new Error(res.data.message || '发送失败'))
  //     },
  //     fail: reject,
  //   })
  // })

  // 课程项目阶段：直接模拟成功
  return Promise.resolve(true)
}

// 校验短信验证码，占位实现
export async function verifyCode(phone, code) {
  // 预留真实后端调用示例：
  // return new Promise((resolve, reject) => {
  //   uni.request({
  //     url: 'https://your-api-domain.com/api/auth/verify-code',
  //     method: 'POST',
  //     data: { phone, code },
  //     success: (res) => {
  //       if (res.data && res.data.success) resolve(true)
  //       else reject(new Error(res.data.message || '验证码错误'))
  //     },
  //     fail: reject,
  //   })
  // })

  // 课程项目阶段：直接模拟所有验证码通过
  return Promise.resolve(true)
}

