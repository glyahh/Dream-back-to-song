# 梦回宋朝

介绍宋代衣食住行的文化体验小程序，支持微信小程序与 H5。前端使用 uni-app / Vue 3，后端使用 Java 21 / Spring Boot / MyBatis / MySQL。

## 开发

需要 Node.js 22、npm 和 JDK 21。首次使用先执行 `npm ci`。

```powershell
npm run dev:mp-weixin
npm run dev:h5
```

微信开发者工具导入 `dist/dev/mp-weixin`。生产构建使用 `npm run build:mp-weixin` 或 `npm run build:h5`。

后端独立启动：

```powershell
cd Dream-Back-To-Song_backend
.\mvnw.cmd spring-boot:run
```

按后端 `.env.example` 配置本地 `.env`，默认使用 dev 配置，端口 8080，接口前缀 `/api`。数据库脚本位于 `Dream-Back-To-Song_backend/Sql_script`，按 `00_create_database.sql`、`01_schema.sql`、`02_seed_data.sql` 顺序导入；种子脚本会清空演示表，仅用于开发。前端目前仍以静态数据和本地存储为主，登录校验为模拟实现。

本地微信开发和助手联调建议直接在根目录执行：

```powershell
.\script\start-all.ps1
```

它会分别打开前端 watch、Java 后端和 Python Agent 窗口。微信开发者工具首次导入 `dist/dev/mp-weixin` 后保持窗口不变；前端修改保存即可热重载，Java 修改执行 `.\script\restart-backend.ps1`，Agent 修改执行 `.\script\restart-agent.ps1`，结束时执行 `.\script\stop-all.ps1`。

## 验证

助手本地联调需要 Python 3.11+ 与 OpenCode 1.19.0；Python 网关仅使用标准库。推荐使用 `.\script\start-all.ps1` 一键启动；需要单独排查服务时再分别启动：

```powershell
npm run agent:catalog
$env:OPENCODE_BIN = '本机 opencode.exe 的绝对路径'
python Dream-Back-To-Song_backend/agent/server.py
```

```powershell
cd Dream-Back-To-Song_backend
.\mvnw.cmd spring-boot:run '-Dspring-boot.run.profiles=dev,agent-local' '-Dspring-boot.run.arguments=--server.port=8080'
```

前端请求 `http://127.0.0.1:8080/api/agent`；其他本地端口可通过 `VITE_AGENT_API_BASE` 指定后再启动/构建前端。Python 默认监听 8091，Java 的助手接口仅在 `agent-local` profile 注册并绑定本机。助手已接入 80 项内容/导航、17 套制作流程、本机个人功能及购物车；未完成的业务动作不开放。网页检索使用 Exa 官方免 Key、免费限流 MCP，另支持读取公开文本网页；免费模型或检索不可用时如实提示，不切换付费。H5 已进行真实模型联调，微信开发者工具扫码后的交互验收待完成，需允许本地 HTTP 调试。

```powershell
npm run verify
```

依次检查内容素材与制作进度、助手动作、生成目录及 Python 契约、页面及引用、微信/H5 构建，再通过 Maven Wrapper 执行后端测试。任何一步失败都会返回非零退出码。真实模型与开发者工具交互另行验收。

## 目录

| 目录 | 内容 |
| --- | --- |
| `src` | 页面、应用入口与公共工具 |
| `Dream-Back-To-Song_backend` | 后端源码、数据库脚本、配置及技术文档 |
| `docs` | 项目介绍、里程碑、SPEC 与验收记录 |
| `tools` | 验证、OSS 上传及视频转码脚本 |

依赖和构建产物保留在本地并由 Git 忽略；`project.private.config.json` 是本地微信开发者工具配置。

## 素材与工具

已有页面引用 OSS 图片和视频；新增菜品的压缩配图位于 `src/static/food-details`，随应用构建。原始图片位于工程外的 `../项目资源/梦回宋朝/images`，不参与构建；生成的菜品原图单独归入 `../项目资源/梦回宋朝/generated/food-details-source`。Git 指南位于同级 `documents`，清理前快照位于 `cleanup-backup`。

运行 `tools/oss_upload_static_assets.py` 仅选择图片文件上传，默认素材路径基于脚本位置计算；也可用 `STATIC_ASSETS_DIR` 指定其他目录。上传需要 Python 的 `oss2`，并配置 `ALIYUN_OSS_ACCESS_KEY_ID`、`ALIYUN_OSS_ACCESS_KEY_SECRET`。不要将密钥提交到仓库。

视频转码使用 `imageio-ffmpeg`，输入和输出为 `tools/course-videos-source`、`tools/course-videos-h264`；视频上传工具读取后者。视频工具从工程根目录运行，这两个目录均不提交 Git。

## 文档

- [项目介绍与里程碑](docs/项目介绍-组员对齐.md)
- [菜品与名画详情 SPEC](docs/specs/001-content-details.md)
- [内容来源与素材记录](docs/specs/001-content-sources.md)
- [SPEC 验收与架构、代码审查](docs/specs/001-acceptance-review.md)
- [项目助手实施 SPEC](docs/specs/002-home-intelligent-search.md)
- [助手运行时架构决策](docs/adr/0002-opencode-harness.md)
- [前端接口需求](Dream-Back-To-Song_backend/项目文档/前端接口文档_1.md)
- [后端接口实现](Dream-Back-To-Song_backend/项目文档/后端接口文档_1.md)
- [数据库设计](Dream-Back-To-Song_backend/项目文档/数据库设计文档_1.md)
- [已有问题与验证边界](docs/已知问题.md)

前后端在同一个 Git 仓库维护，从工程根目录统一提交。后端目录保留现有名称，不再包含独立 `.git`；两端仍分别启动。本地配置、依赖和构建产物不提交。

2026-10-16 合并前的两个仓库历史已备份到工程外的 `../项目资源/梦回宋朝/cleanup-backup/20261016-monorepo-migration`。现有 SPEC 与审查文档保留当时的双仓库验收记录。
