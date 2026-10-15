# SPEC-001 内容来源与素材记录

整理日期：2026-10-16。对应 [SPEC-001](001-content-details.md) 模块 A。

## 食谱

正文为适合分步展示的日常做法示例，依据下列资料重新编写。所列来源支持食材搭配或操作方法，不证明这些现代配方属于宋代；不引用养生、治疗功效，不复制来源照片。

| 条目 | 具体示例与资料 | 采用范围及调整 |
| --- | --- | --- |
| 素蒸茄子 | 蒜香蒸茄子；[李锦记](https://hk.lkk.com/zh-hk/recipes/steamed-eggplant-with-garlic) | 蒸软后加蒜香调味汁；用量按两人份整理，不使用现成品牌酱料 |
| 素炒时蔬 | 小白菜炒荷兰豆；[The Woks of Life](https://thewoksoflife.com/everyday-vegetable-stir-fry/) | 按蔬菜软硬程度依次入锅；本示例只用植物原料，省去蚝油及动物高汤 |
| 素汤 | 白菜香菇豆腐汤；[The Woks of Life](https://thewoksoflife.com/tofu-soup/) | 采用白菜、菌菇与豆腐组合；省去原食谱鸡蛋和动物高汤，改用清水 |
| 素面 | 清汤青菜面；[Omnivore’s Cookbook](https://omnivorescookbook.com/soy-sauce-noodles/) | 生抽、香油调汤，面与汤分开准备；本示例不用猪油及动物高汤 |
| 拌面 | 葱油拌面；[The Woks of Life](https://thewoksoflife.com/soy-scallion-noodles-cong-ban-mian/) | 小火熬葱油、调汁拌熟面；整理为两人份 |
| 汤饼 | 家常手工面片汤；[下厨房·大锤子妈](https://www.xiachufang.com/recipe/106571826/) | 参考和面、醒面、擀切面片的方法，配菜改为白菜香菇；名称保留，明确不是宋代原方复原 |
| 绿豆糕 | 原味压模绿豆糕；[China Sichuan Food](https://www.chinasichuanfood.com/mung-bean-cake/) | 采用去皮绿豆、油脂与糖配比；普通锅煮软替代压力锅，不加抹茶或豆沙 |
| 枣泥酥 | 家常枣泥一口酥；[下厨房·辰辰妈8665](https://www.xiachufang.com/recipe/106637923/) | 参考黄油酥皮、包馅切段和烤制方法；馅量减为 250 克、芝麻减为 5 克，使用即用枣泥 |
| 杏仁饼 | 烤制杏仁小饼；[Just One Cookbook](https://www.justonecookbook.com/almond-cookies/) | 采用食用甜杏仁粉、面粉与植物油的小饼做法，整理为克重；不替换成药用苦杏仁 |
| 酒 | 成品黄酒温饮；[古越龙山](https://shaoxingwine.com.cn/home/nous/drink.html) | 仅采用隔水温饮方式，不涉及酿造，不引用健康功效 |
| 汤 | 红枣汤饮；[Maangchi：Jujubes](https://www.maangchi.com/ingredient/jujubes/comment-page-1) | 依据红枣加水煮饮的方法，自定两杯份量，以枣肉软、汤色变化判断；不是原方复刻 |
| 露 | 桂花清饮；[Teasenz](https://www.teasenz.com/osmanthus-tea) | 仅采用食用桂花的冲泡参数；可不加糖，不引用功效，不称为蒸馏花露 |

## 名画

沿用工程原有 OSS 图片，未新增或生成替代画作；赏析结合现有画面撰写，作品鉴定信息仅取可确认部分。

| 项目显示名称 | 依据 | 本轮处理 |
| --- | --- | --- |
| 千里江山图 | [故宫馆藏](https://www.dpm.org.cn/collection/paint/228354.html) | 记录北宋、王希孟、绢本设色；不填精确创作年份 |
| 清明上河图 | [故宫馆藏](https://www.dpm.org.cn/collection/paint/228226.html) | 记录北宋、张择端、绢本设色；现图不称为完整长卷 |
| 秋窗读书图 | [清华大学图书馆·宋画全集目录](https://lib.tsinghua.edu.cn/arts/info/1021/1141_2.htm) | 目录相关题名为“秋窗读易图”。保留项目原名，配图对应关系未充分核实，省略作者、时代、材质和尺寸 |
| 妆靓仕女图 | [台北故宫·中国古代绘画中的镜影图](https://www.npm.gov.tw/NewChineseArtDownload.ashx?bid=3293) | 资料存在“传宋 苏汉臣 靓装仕女图”等表述；保留项目原名，不直接认定作品或填入“北宋” |

## AI 配图

- 按用户补充要求参照现有分类图片的灰绿、米黄与古朴器皿，生成宋风清供静物画意的独立成品示意：青瓷、淡彩、纸纹与留白，无题字、水印或现代包装。
- 第一张素蒸茄子作为其余图片的风格参照。生成工具为本次会话的 imagegen；图片只表示成品外观，不证明历史原貌或逐克对应的实拍结果。
- 外部原图：`../../../项目资源/梦回宋朝/generated/food-details-source/`（从工程根目录定位时为 `../项目资源/梦回宋朝/generated/food-details-source/`）。该目录保存 12 张按 key 命名的 PNG 与 `manifest.json`，记录生成文件路径、统一风格说明、文件哈希。
- 工程内仅保留 `src/static/food-details/<key>.jpg`：12 张、512 × 512，FFmpeg 转换为 JPEG，质量参数 `-q:v 5`；总计 274,840 字节（约 268.4 KiB），上限 1 MiB。
- 已弃用的第一批摄影风格试图未进入工程，生成工具原始文件保留在 Codex 外部生成目录。

## 验收记录

模块 A 的自动检查为 `tools/content-details.test.mjs`，纳入 `npm run verify`：检查四类菜品内容结构、来源、图片对应与体积、名画内容结构。食谱内容是否完整、图片主体与风格是否一致另经人工检查；结构测试不等同于实际下厨验证。

2026-10-16 验收通过：3 项内容/素材检查、93 个页面及引用、微信构建、H5 构建、后端 1 项测试全部通过。运行图 274,840 字节，12 张原图副本哈希一致。外部日志：`项目资源/梦回宋朝/cleanup-backup/spec-001-module-a-verify.log`。

本模块只交付内容与素材；分类入口、详情页面、制作进度和名画预览按后续 B、C、D 模块分别验收。
