---
status: accepted
---

# 项目助手由 Java 统一接入 Python

2026-10-16，用户决定前端经 Java 转发到 Python。Java 保持项目的统一服务入口，Python 在 `Dream-Back-To-Song_backend/agent/` 独立运行，承担助手 API、业务工具及动作回执；模型与工具循环由 OpenCode 负责，见 [ADR-0002](0002-opencode-harness.md)。前端只维护 Java 服务地址。

取舍是增加一次服务转发及其超时、取消和错误映射，但避免 Agent 接入绕过项目服务边界。现有 Java 业务仍由 Java 实现；现有客户端本地状态仍由客户端现有逻辑操作，Python 不因成为助手中枢就获得数据库或客户端存储的直接写权限。数据与动作协议见 [SPEC-002](../specs/002-home-intelligent-search.md)。
