---
status: accepted
---

# OpenCode 承担助手的模型与工具循环

2026-10-16，用户确认采用 OpenCode harness，Python 负责业务与网关。主模型为 `opencode/deepseek-v4.1-flash-free`。本决策替代早期的“轻量 LangChain harness”；第一版不叠加 LangChain 或 Deep Agents 的另一套 Agent 循环。

本机官方 OpenCode 1.19.0 常驻 HTTP 服务已通过 Python 调用真实菜谱 MCP、同一会话追问及 JSON Schema 输出测试，返回费用记录为 0。独立 Chat Completions 请求及严格禁用原生工具的配置返回免费层 403，不能把 OpenCode Server 当普通模型代理。官方输入中的 `tools` 是工具开关，不是 LangChain 函数定义；工具执行发生在 OpenCode 内。

Python 通过私有 HTTP 接口提交会话消息，并向 OpenCode 暴露经过核验的 MCP 业务工具。Java 提供唯一面向前端的入口。制作等客户端状态经客户端原有函数执行，实际回执进入工具结果后才能宣称成功。

OpenCode 的原生工具权限设为 `ask`，只精确允许业务 MCP 工具；Python 自动拒绝其他权限请求，不将其作为产品里的用户确认弹窗。已实测拒绝 bash/read/write/glob/grep/task/webfetch/websearch 及独立 question 通道，写入目标未生成；结果不外推到未测试版本。运行时只监听回环地址，使用独立工作目录和数据目录，不转发其 shell、文件、配置、认证等管理接口。权限处理失联时不得自动批准。

代价是多维护一个常驻进程，并受当前免费模型与运行时版本约束。固定并记录验收版本；免费策略变化时明确失败，不自动切换付费模型。以后只有实际能力需要、且重新评估循环归属时，才引入 LangChain/Deep Agents。

依据：[官方 Server 文档](https://opencode.ai/docs/server/)、[1.19.0 消息输入与循环实现](https://github.com/anomalyco/opencode/blob/733b2c627e5aec39cb33cc22373bdce33053ef2c/packages/opencode/src/session/prompt.ts)、[1.19.0 MCP 工具执行](https://github.com/anomalyco/opencode/blob/733b2c627e5aec39cb33cc22373bdce33053ef2c/packages/opencode/src/session/tools.ts)。本地实测路径与限制见 SPEC-002。
