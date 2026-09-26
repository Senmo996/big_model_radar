# OpenClaw 生态日报 2026-09-26

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-26 02:26 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-26

## 1. 今日速览

过去24小时项目活跃度极高：共计 500 条 Issue 更新（其中新开/活跃 451 条，关闭 49 条）和 500 条 PR 更新（其中 382 条待合并，118 条已合并/关闭），反映出 2026.9.6 发布后社区反馈密集、修复工作正在紧锣密鼓地进行。当前处于 **2026.9.7 发布前的关键修复窗口期**：多个 P0 级 Bug（模型目录 worker 资源泄漏、更新流程失败、crash-loop）持续占据讨论焦点，核心维护者 @steipete 提交了大量性能优化和数据库迁移安全修复 PR，项目整体处于高强度的稳定化冲刺阶段。

---

## 3. 项目进展

今日有 118 条 PR 被合并/关闭，核心进展集中在 Gateway 性能优化、会话状态修复和更新流程安全加固。以下为其中最重要的合并/关闭 PR：

- **[#158486] perf(gateway): offload placement turn claims from the main thread**（已关闭/合并）— 将并发 turn 的 placement claim 从主线程卸载到后台，解决了主 isolate 中 SQLite `exec` 耗时 2,337ms 的性能瓶颈，最长调用栈 922ms 来自本地 turn 结算。这是对 Gateway 主线程阻塞问题的重要修复。 [链接](https://github.com/openclaw/openclaw/pull/158486)

- **[#158524] fix(agents): preserve continuation after sessions_yield**（已关闭/合并）— 修复子代理请求者在 `sessions_yield` 后因合成 aborted assistant 消息残留在完成消息快照中而无法恢复的可见问题，解决了 #158361 关联的失败。 [链接](https://github.com/openclaw/openclaw/pull/158524)

- **[#158497] improve(gateway): reduce presence work for concurrent viewers**（已关闭/合并）— 当多个 Control UI 客户端同时连接/切换会话时，之前会反复重建和序列化完整的 presence 名单并在 Gateway 线程同步查询 SQLite。此 PR 将同一事件循环内的 presence 变更合并为一次发布，显著降低主线程 CPU 开销。 [链接](https://github.com/openclaw/openclaw/pull/158497)

- **[#158408] improve: reduce Gateway work for concurrent session viewers**（已关闭/合并）— 会话行事件之前会为每个连接的客户端重复执行同步 Gateway 工作来投影 active runs。此修改减少了多客户端连接时的主线程 CPU 消耗，同时保持后到的接收者仍能看到 run 替换、会话重绑定等可见性信息。 [链接](https://github.com/openclaw/openclaw/pull/158408)

- **[#158222] refactor(cron): read run history through its worker**（待合并）— 将 Cron run-history 读取从 Gateway 主线程移出，在 Tasks runtime 退役前为 Cron 建立独立的 history 投影，保持响应形状和过滤/分页行为不变，是 TaskFlow 退役计划的一部分。 [链接](https://github.com/openclaw/openclaw/pull/158222)

- **[#158163] fix(update): back up every database before migrations and restore them on rollback**（待合并，P0）— 修复更新失败回滚后旧版本无法打开被迁移数据库的问题，确保所有数据库在迁移前有完整备份，回滚时恢复一致快照。这是对多个更新失败 Issue（#154381、#155094、#154460、#154924 等）的直接回应。 [链接](https://github.com/openclaw/openclaw/pull/158163)

综合来看，项目当前重心非常明确：**解决 Gateway 主线程性能瓶颈、修复更新流程的可靠性、消除 2026.9.6 引入的模型目录 worker 资源泄漏**。这些工作是在为 2026.9.7 稳定版铺路，距离发布还需攻克多个 P0 阻塞项。

---

## 4. 社区热点

过去24小时讨论最活跃的议题集中在 2026.9.5/9.6 升级后的严重回归问题，社区情绪明显焦虑，部分用户表达了后悔升级的情绪。

- **[#153257] OpenClaw 2026.9.5 Turned a Stable Environment Into an 8-Hour Failure Recovery Session** — 35 条评论，1 👍。用户 @abuegab1-spec 直言“I genuinely regret upgrading”，将一次普通升级描述为“8小时故障恢复会话”，引发社区广泛共鸣。这表明 2026.9.5 的稳定性问题对用户信任造成了实际损害。 [链接](https://github.com/openclaw/openclaw/issues/153257)

- **[#155753] Model-catalog expiry/rebuild loop pins one CPU core** — 31 条评论。`readFullModelCatalog()` 每次读取都会触发 `refreshExpiredCatalog()`，而实时 catalog TTL 仅约 60 秒，导致一个 CPU 核心被无限占用。该问题明确了 worker 身份指向 #154276 / #153422，是 2026.9.5 性能问题的核心线索之一。 [链接](https://github.com/openclaw/openclaw/issues/155753)

- **[#157842] 2026.9.6: prepared-model-catalog worker retains ~77 MB per agent turn** — 15 条评论。Gateway RSS 持续增长直到外部 watchdog 重启，每个非心跳 agent turn 增加约 70-80 MB 堆内存，超出其 512 MB 限制。这是 2026.9.6 引入的 worker 的严重内存泄漏问题。 [链接](https://github.com/openclaw/openclaw/issues/157842)

- **[#157107] 2026.9.6: prepared-model-catalog worker rebuilds plugin generation every ~6s forever** — 14 条评论（已关闭）。28-agent 安装上 Gateway 启动后所有 channel 连接，但没有任何 agent run 能被执行，因为 model-catalog worker 无限重建插件生成。2026.9.5 在相同实例上运行正常。 [链接](https://github.com/openclaw/openclaw/issues/157107)

- **[#42475] Per-agent cost budget enforcement at the gateway level** — 24 条评论，1 👍。3月份提出的老 Issue 持续获得关注，用户对成本失控的担忧与日俱增，但一直停留在 needs-product-decision 状态，没有进入实施阶段。 [链接](https://github.com/openclaw/openclaw/issues/42475)

**社区诉求分析**：高热度议题呈现明显共性——**2026.9.5 和 2026.9.6 连续两个版本的发布质量未达预期**，问题集中在模型目录 worker 的资源失控（CPU 烧满、内存泄漏、重建循环）和更新流程不可靠（global install swap 失败、回滚损坏数据库）。用户最迫切的需求是：①尽快修复 worker 资源问题；②保证更新/回滚过程的安全性；③提升发布前的回归测试覆盖。持续的 P0 问题正在快速消耗社区对稳定版的信任。

---

## 5. Bug 与稳定性

过去24小时内的 Bug 报告和回归问题数量居高不下。以下按严重程度排列：

### P0 级（发布阻塞，影响面大）

| 问题 | 状态 | 是否有修复 PR |
|------|------|--------------|
| **#153257** — 2026.9.5 升级导致稳定环境变成 8 小时故障恢复会话（crash-loop） | OPEN，35 评论 | 无明确 PR |
| **#157842** — 2026.9.6 prepared-model-catalog worker 每个 agent turn 泄漏 ~77MB，超过 512MB 限制 | OPEN，15 评论 | 无明确 PR |
| **#155753** — readFullModelCatalog() 每次读取触发 refreshExpiredCatalog() 导致单个 CPU 核心无限占用 | OPEN，31 评论 | 无明确 PR |
| **#156112** — `openclaw update` 在 global install swap 步骤确定性失败，但直接 npm install -g 同版本成功 | OPEN，11 评论 | 间接由 #158163 覆盖 |
| **#152804** — 2026.9.5 回归：minimax-portal 升级后丢失模型目录，报 “Unknown model” | OPEN，11 评论 | 无明确 PR |
| **#157812** — Windows 自动更新反复失败，三种不同失败模式（managed-service-preflight、$OPENCLAW_STATE_DIR 未展开、reconcile:abandoned） | OPEN，6 评论 | 无明确 PR |
| **#157107** — 2026.9.6：worker 每 ~6 秒重建插件生成，agent run 永远不被接纳 | CLOSED，14 评论 | 可能已在合并分支处理 |
| **#137177** — 内置 `@wecom/wecom-openclaw-plugin@2026.7.2` 插件无法安装 | OPEN，10 评论 | 无明确 PR |
| **#155720** — macOS：Gateway 在 restart drain 中退出，但 LaunchAgent 未加载，静默宕机约 24 小时 | OPEN，5 评论 | 无明确 PR |
| **#154812** — Gateway RSS 逃逸 V8 堆（9.32 GiB），导致主机 OOM | OPEN，7 评论 | 无明确 PR |

### P1 级（严重但非阻塞）

| 问题 | 状态 | 是否有修复 PR |
|------|------|--------------|
| **#144809** — claude-cli 长 turn 丢失完整回复（“no active tool authority snapshot”） | OPEN，12 评论 | 无明确 PR |
| **#137332** — 混合 terminal requester-settle 批次在所有权检查后无限重试 | OPEN，18 评论 | 无明确 PR |
| **#121661** — CLI-backed 子代理 announce-wake turns 无工具运行，模型编造工具调用和输出 | OPEN，9 评论 | 无明确 PR |
| **#140129** — Anthropic 缓存卡在 ~46k tools+system prefix，session:sanitized 重写历史指纹 | OPEN，11 评论 | 无明确 PR |
| **#154104** — 闲置 Gateway 带 4 个 Matrix E2EE 账户时约 50% CPU + 52MB/min 磁盘写入（回归） | OPEN，6 评论 | 无明确 PR |

**关键判断**：prepared-model-catalog worker 相关的 #155753、#157842、#157107 三个 P0 问题指向同一根因——**2026.9.6 引入的 worker 在目录刷新、插件捕获和内存管理方面存在系统性缺陷**。#157842 明确是 9.6 新增 worker 的内存泄漏，目前尚无可用的发布级修复。此外，更新流程失败在 2026.9.4 → 2026.9.5 升级路径上形成了问题聚类（#154381、#155094、#154460、#154924、#156112），#158163 的数据库备份/回滚方案有望成为这些问题的统一修复。

---

## 6. 功能请求与路线图信号

过去24小时用户提出的功能需求延续了近期主线，集中在**成本控制、消息可靠性和配置可见性**三个方向。结合开放 PR 情况，以下功能有可能被纳入 2026.9.7 或其后版本：

- **Per-agent 成本预算**（#42475，24 评论，自 3 月悬而未决）：在 gateway 层面强制每日/每月成本上限，防止失控支出。虽然长期处于 needs-product-decision 状态，但 **PR #119135 "smart model tiering for cost optimization"**（8月提出，仍开放待合并）正从另一角度回应成本关切，将简单请求路由到更廉价模型，可能为预算控制提供基础能力。 [Issue 链接](https://github.com/openclaw/openclaw/issues/42475) | [PR 链接](https://github.com/openclaw/openclaw/pull/119135)

- **Tiered bootstrap 文件加载**（#22438，20 评论）：避免大工作区将全部 bootstrap 文件加载到每个会话（包括子代理和 cron 任务）中浪费上下文窗口。目前无直接对应 PR，但 Token 效率是社区持续关注的方向（见 #14785 "Reduce tool schema token overhead"）。 [链接](https://github.com/openclaw/openclaw/issues/22438)

- **WhatsApp 重连后消息回填**（#50093，14 评论）与 **Gateway 重启后消息补发**（#55792，8 评论）：两个问题本质相同——消息在断线/重启窗口内静默丢失。这是消息可靠性方向的高频诉求。虽然这两个 Issue 已 stale，但**消息丢失问题在多 channel 重复出现**（#16555 delivery queue TTL，7 评论），传递了对 delivery queue 持久化策略重新设计的普遍需求。 [Issue 1](https://github.com/openclaw/openclaw/issues/50093) | [Issue 2](https://github.com/openclaw/openclaw/issues/55792)

- **暴露实际后端模型**（#51441，9 评论）：使用 LiteLLM 等路由代理时，agent 只看到请求的模型别名（如 `litellm/complex`），看不到实际使用的后端模型（如 `openai/gpt-5.4`），造成盲区。这直接影响用户对成本和能力的判断，在成本敏感型用户中关注度上升。 [链接](https://github.com/openclaw/openclaw/issues/51441)

- **Cron 任务自动重试**（#49740，5 评论）：cron 失败后要等下一次周期才能重试（日任务需等 24 小时）。用户期望 `--retry-count` 和 `--retry-delay` 参数。此需求与 #158222 的 cron worker 重构在时间线上重合，值得维护者将二者结合考虑。 [链接](https://github.com/openclaw/openclaw/issues/49740)

- **Per-session 活动状态 API**（#39127，5 评论）：通过 gateway API + WS statechange 暴露每个会话的 busy/idle/awaiting_user/awaiting_subagent 状态，避免客户端轮询。这是对 Control UI 体验的重要增强信号。 [链接](https://github.com/openclaw/openclaw/issues/39127)

---

## 7. 用户反馈摘要

- **升级后悔情绪**：用户 @abuegab1-spec 在 #153257 中明确表示“I genuinely regret upgrading to OpenClaw

---

## 横向生态对比

# AI 智能体与个人 AI 助手开源生态横向对比报告

**报告日期：2026-09-26**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于 **密集迭代与稳定性阵痛并存** 的阶段。头部项目 OpenClaw 在 2026.9.6 发布后遭遇多个 P0 级 worker 资源泄漏与更新流程故障，社区信任受到考验，维护团队正全力冲刺 2026.9.7 稳定版。与此同时，NanoClaw、CoPaw 等中坚力量在快速消化自身版本回归问题，Zeroclaw 则在 OIDC 安全栈上持续推进里程碑式重构。生态内横跨多个项目的共性需求高度集中——**成本控制、消息投递可靠性、上下文/token 效率、配置热加载与可观测性**——反映出用户从"功能可用"向"生产可用"的诉求迁移。整体而言，生态生命力旺盛，但"发布质量"正成为决定社区信心的核心战场。


## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃 + 关闭） | PR 更新（待合并 + 合并/关闭） | Release | 今日合并 PR 亮点 | 健康度评估 |
|------|-------------------------------|-------------------------------|---------|-----------------|-----------|
| **OpenClaw** | 500（451 活跃 / 49 关闭） | 500（382 待合并 / 118 合并/关闭） | 无（9.7 待发布） | Gateway 主线程性能优化、sessions_yield 修复、presence 合并发布 | ⚠️ 高强度稳定化冲刺，P0 堆积但响应极快 |
| **NanoClaw** | 5（5 新开 / 0 关闭） | 50（48 待合并 / 2 关闭） | 无 | Claude 默认输出风格修复（prompt cache 恢复） | ⚠️ 集中修复 v2.4.0 回归，PR 合入滞后 |
| **CoPaw** | 12（12 新开 / 0 关闭） | 13（13 待合并 / 0 合并/关闭） | 无 | 无（全部待合并） | ⚠️ 高活跃但 PR 审查严重积压，合并通道拥堵 |
| **Zeroclaw** | 50（37 活跃 / 13 关闭） | 50（41 待合并 / 9 合并/关闭） | 无 | OIDC RPC 强制认证、主体工具选择器、agent 便携导出 | ✅ 健康，安全基建持续推进 |
| **NanoBot** | 4（2 活跃 / 2 关闭） | 13（11 待合并 / 2 合并/关闭） | 无（v0.3.5 为最近版） | WebUI 草稿持久化、测试套件精简 703 行 | ✅ 健康，体验优化与质量巩固并重 |
| **LobsterAI** | 0（0 / 0） | 10（9 待审 / 1 合并/关闭） | 无 | 模型调用开始后停止整轮重放（错误透传） | ✅ 平稳，但 5 条 4 月旧 PR 积压 5 个月未闭环 |
| **IronClaw** | 0（0 / 0） | 2（2 待合并 / 0） | 无 | 无（今日无合入） | ✅ 低频维护，健康但关注度低 |
| **EasyClaw** | 0（0 / 0） | 0（0 / 0） | ✅ v1.9.23 | —（发布驱动） | ✅ 常态迭代，社区互动较少 |
| **TinyClaw** | — | — | — | — | 过去 24h 无活动 |
| **Moltis** | — | — | — | — | 过去 24h 无活动 |
| **ZeptoClaw** | — | — | — | — | 过去 24h 无活动 |
| **PicoClaw** | — | — | — | — | 数据缺失，无法评估 |


## 3. OpenClaw 在生态中的定位

**生态核心参照与规模绝对领先者。** OpenClaw 以单日 500+500 的 Issue/PR 更新量级，几乎是第二名 Zeroclaw/NanoClaw 的 10 倍，是当前个人 AI 助手赛道无可争议的焦点项目。其优势体现在三个方面：

- **工程响应速度**：核心维护者 @steipete 亲自下场提交性能优化与数据库迁移安全修复 PR，118 条 PR 单日合并/关闭，展现了头部项目的资源投入力度。
- **技术路线侧重**：当前工作重心集中在 Gateway 主线程性能（SQLite exec 优化、presence 合并发布、run-history 读取卸载）、更新/回滚安全（数据库迁移前全量备份）与 worker 资源治理（model-catalog 内存泄漏）——这是一条典型的 **"大规模部署稳定性优先"** 路线，而非功能堆叠。
- **社区声量**：#153257 "8 小时故障恢复会话" 获得 35 条评论，用户公开表达升级后悔情绪，这种强度的社区反馈在生态内独一档——既是压力，也说明其用户基数足够庞大。

**对比同类**：NanoClaw 和 CoPaw 同样面临版本回归困扰，但影响面与讨论烈度远不及 OpenClaw；Zeroclaw 在安全架构（OIDC）上走得更快，但社区规模和合并节奏差距明显。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|----------|---------|----------|
| **模型成本控制与低成本网关** | OpenClaw、NanoBot、Zeroclaw、LobsterAI | OpenClaw #42475 的 gateway 级 per-agent 成本预算已搁置 6 个月；NanoBot/PR #5915 与 Zeroclaw/#11103 同日均新增 "Cheaper Inference" 低成本网关 provider；LobsterAI 新增 Requesty 聚合网关——多项目同日出现同类 PR，信号极强 |
| **消息投递可靠性与去重** | OpenClaw、NanoClaw、CoPaw、Zeroclaw | OpenClaw 多个 Issue 反映断线/重启窗口消息静默丢失（#50093/#55792）；CoPaw #7983 修复 QQ 网关 session 恢复重放历史事件导致重复消息；NanoClaw #3918 修复已回复后 result-door 重复发送；Zeroclaw #10600 要求区分"已投递"与"已丢弃" |
| **上下文窗口与 token 效率** | OpenClaw、NanoClaw、CoPaw | OpenClaw #22438 要求 tiered bootstrap 加载避免浪费子代理上下文；NanoClaw #3893 修复 Claude 默认输出风格破坏 prompt caching；CoPaw #7628 上下文压缩未按完整请求预算计算导致活跃对话失败 |
| **配置热加载 / 动态生效** | OpenClaw、Zeroclaw、LobsterAI | LobsterAI #2764 将 gateway 策略改为热加载免重启；Zeroclaw #11133 修复会话重用时的环境转发验证；OpenClaw 更新流程失败（#156112）背后是 global install swap 不可靠 |
| **可观测性 / 运行透明度** | OpenClaw、NanoBot、LobsterAI、NanoClaw | OpenClaw #39127 请求 per-session 活跃状态 API；NanoBot #5908 要求流式输出显示实时 tokens/sec；LobsterAI #2758 将 OpenClaw 进度卡片可视化为前端；NanoClaw #3916 日志无轮转，历史与实时混杂 |
| **工具调用安全与语义边界** | CoPaw、Zeroclaw、NanoBot | CoPaw #7980 grep_search 命中二进制文件导致状态中毒死循环；Zeroclaw #11108 工具别名将 browser_open/web_search 错误映射为 shell（有安全隐患）；NanoBot #5005 要求 `rm` 拒绝规则改为 target-aware |
| **安全身份认证（前沿）** | Zeroclaw（生态内领先） | OIDC 主体强制认证已在 RPC 层合并（#10259/#10263/#11082），将身份认证下沉到运行时基础设施层面，为其他项目提供了可借鉴的架构范式 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|------|---------|---------|-----------------|
| **OpenClaw** | 全功能个人 AI 助手（多 channel、Gateway、子代理、Cron），追求大规模部署稳定性 | 核心用户群庞大，覆盖个人到小团队 | 高性能 Gateway + SQLite 事件驱动架构；Worker 隔离；Dart/Flutter 技术栈（Control UI 表现突出） |
| **Zeroclaw** | **安全优先**的 agent 运行时，OIDC/RPC 认证、agent 便携化导出、SOP 控制面 | 对身份认证、权限边界有严格要求的组织用户 | Rust 实现，强调编译期安全与资源控制；WASM 插件路线；"一切皆插件"的统一能力目录愿景 |
| **NanoClaw** | 安装/更新体验优先，本地模型与自定义网关适配，容器化 agent 调度 | 本地模型用户、自托管爱好者 | 容器化运行 agent，使用 sweep 机制治理空闲容器；关注安装路径的可靠性 |
| **NanoBot** | 轻量级、多 channel 适配（飞书/Napcat/Email），WebUI 体验打磨 | 中小团队、追求开箱即用 | OpenAI 兼容网关聚合策略；WebUI 草稿持久化与 tokens/sec 可视化；测试套件精简（703 行净删除） |
| **LobsterAI** | **OpenClaw 集成深度优化** + 多模型网关聚合 + Cowork 协作界面 | 基于 OpenClaw 需要定制化 UI/协作层的开发者 | 针对 OpenClaw Agent Runner 的错误处理、进度卡片展示、策略热加载做深度定制；Provider 层中立聚合 |
| **CoPaw (QwenPaw)** | 上下文压缩机制深度打磨、多 provider（含本地 llama.cpp）兼容、国际化 | 国产模型与本地部署用户、QQ 渠道重度用户 | 自研上下文压缩触发逻辑；对 provider 上下文窗口元数据敏感；APScheduler/cron 细节处理 |
| **IronClaw** | 低频维护，host

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报

**日期：2026-09-26** | 数据来源：github.com/HKUDS/nanobot

---

## 1. 今日速览

过去 24 小时 NanoBot 项目保持了较高的社区活跃度：**PR 更新 13 条（其中 2 条已合并/关闭，11 条待合并）**，**Issues 更新 4 条（2 条新开/活跃，2 条已关闭）**，无新版本发布。WebUI 草稿持久化功能修复已合入（#5912），测试套件同步完成了 703 行的净精简（#5907），项目代码质量与用户体验均有所提升。社区贡献集中在 **WebUI 体验优化、渠道兼容性修复、MCP 工具发现完整性** 三个方向，总体项目健康度良好。

---

## 2. 版本发布

无新版本发布。最近一次发布仍为 [v0.3.5](https://github.com/HKUDS/nanobot/releases/tag/v0.3.5)（对应公告 Issue [#5788](https://github.com/HKUDS/nanobot/issues/5788)）。

---

## 3. 项目进展

### ✅ 已合并/关闭

| PR | 说明 | 影响 |
|---|---|---|
| [#5912](https://github.com/HKUDS/nanobot/pull/5912) — fix(webui): preserve composer drafts across navigation and reloads | **已关闭**。修复 WebUI 切换会话或刷新页面时丢失未发送草稿的问题，支持从 localStorage 恢复文本、会话提及与引用上下文；普通新主题草稿也可恢复，附件保留在内存中并支持导航不丢失 | 直接解决了 Issue [#5910](https://github.com/HKUDS/nanobot/issues/5910)，是一项显著的用户体验修复 |
| [#5907](https://github.com/HKUDS/nanobot/pull/5907) — test: consolidate redundant coverage across the test suite | **已关闭**。跨 34 个文件整合 Python 与 WebUI 重复测试，净删除 703 行；参数化 46 个 Python 测试组，保留全部 171 个原始输入与断言；生产代码零改动 | 缩减测试运行时间，提升维护性 |

### 🔄 新增待合并 PR

过去 24 小时内新出现 4 个可合并的修复型 PR，均附带测试，优先级为 p2：

- [#5916](https://github.com/HKUDS/nanobot/pull/5916) — fix(mcp): load all pages of server tools before registration。修复 MCP 服务端分页返回 `tools/list` 时仅注册第一页、后续页工具不可用的问题
- [#5914](https://github.com/HKUDS/nanobot/pull/5914) — fix(napcat): keep a message whose image declares a non-numeric file_size。修复 Napcat 图片 `file_size` 为非数字时消息被误拒绝的问题
- [#5913](https://github.com/HKUDS/nanobot/pull/5913) — fix(agent): ignore an unparsable NANOBOT_MAX_CONCURRENT_REQUESTS instead of raising。修复环境变量为空字符串时启动崩溃的问题，改为回退到默认值（无限并发）
- [#5915](https://github.com/HKUDS/nanobot/pull/5915) — feat(providers): add Cheaper Inference as a named gateway provider。新增 OpenAI 兼容 LLM 网关提供商，模型价格比官方列表低 15–60%

**小结**：MCP 分页工具发现的修复、Napcat 图片兼容性修复、环境变量容错修复，以及 WebUI 草稿持久化，共同说明项目正在积极消化社区反馈，并持续完善多平台适配与健壮性。

---

## 4. 社区热点

### 🔥 [#5903 — [bug] Feishu: hidden session-checkpoint marker is delivered to the user](https://github.com/HKUDS/nanobot/issues/5903)

评论 2 条。用户在飞书（Lark）渠道发现，会话空闲自动压缩后，内部标记消息 “Continue the active task from the working-memory checkpoint above.” 被当作普通聊天消息发送给用户，且该消息被持久化并带有 `"_hidde...` 前缀。这暴露了 **内部系统消息与用户可见消息边界管理** 的问题，是渠道适配层的一个典型缺陷。目前尚无针对性的 fix PR，但 [#5780](https://github.com/HKUDS/nanobot/pull/5780)（停止发送上下文压缩通知）与其直接相关。

### 🔥 [#5908 — feat(webui): show live tokens/sec while streaming a reply](https://github.com/HKUDS/nanobot/issues/5908)

评论 2 条。用户希望在 WebUI 流式输出时看到实时 tokens/sec 指标，以判断模型是正常工作还是卡住。这是一个 **开发者体验/可观测性** 类需求，与项目近期 WebUI 交互优化的方向一致，实现成本较低，估计会被纳入后续版本。

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| **高（用户可见）** | [#5903](https://github.com/HKUDS/nanobot/issues/5903) | 飞书渠道将内部会话检查点标记消息暴露给最终用户，造成聊天记录污染与困惑 | 无直接 fix PR；[#5780](https://github.com/HKUDS/nanobot/pull/5780) 部分相关 |
| **中（启动崩溃）** | [PR #5913](https://github.com/HKUDS/nanobot/pull/5913) | `NANOBOT_MAX_CONCURRENT_REQUESTS` 为空字符串时，裸 `int()` 转换抛出异常导致启动失败 | 已有 fix PR，待合并 |
| **中（消息丢失）** | [PR #5914](https://github.com/HKUDS/nanobot/pull/5914) | Napcat 渠道图片 `file_size` 字段非数字时（如 `"auto"`），`int()` 抛异常导致整条消息被丢弃 | 已有 fix PR，待合并 |
| **中（工具不可用）** | [PR #5916](https://github.com/HKUDS/nanobot/pull/5916) | MCP 服务器分页返回工具列表时，只有第一页被注册，后续页工具即使通过 `enabledTools` 显式选择也无效 | 已有 fix PR，待合并 |
| **低（骚扰性通知）** | [PR #5780](https://github.com/HKUDS/nanobot/pull/5780) | 自动上下文压缩会向用户发送通知，PR 作者认为这可能是 #5656 的非预期副作用，建议默认隐藏、仅对 `/compact` 保留 | 待维护者确认设计意图 |
| **长期待解（安全）** | [#5005](https://github.com/HKUDS/nanobot/pull/5005) | exec 工具中 blanket `rm` 子串拒绝规则过于严格，需改为 target-aware 守卫，允许清理 scoped 临时目录 | 存在冲突，已挂起 2 个月 |

---

## 6. 功能请求与路线图信号

### 可能纳入下一版本的 WebUI 功能

- **[#5908 — 实时 tokens/sec 指示器](https://github.com/HKUDS/nanobot/issues/5908)**：流式回复期间展示生成速度，帮助用户判断模型是否正常。WebUI 近期已合并草稿持久化，tokens 指示器很可能是下一个交互优化点

### 已有 PR 支撑的路线图信号

- **新 Provider 支持**：[PR #5915](https://github.com/HKUDS/nanobot/pull/5915) 添加 Cheaper Inference 网关提供商，延续了项目“低成本多网关”生态策略
- **MCP 能力深化**：除 #5916 分页修复外，[#5386](https://github.com/HKUDS/nanobot/pull/5386)（保留 MCP Apps 结果元数据）仍在等待处理，MCP 相关功能在持续演进
- **Email 渠道增强**：三连 PR — [#5609](https://github.com/HKUDS/nanobot/pull/5609)（Microsoft OAuth）、[#5606](https://github.com/HKUDS/nanobot/pull/5606)（收件人别名过滤）、[#5605](https://github.com/HKUDS/nanobot/pull/5605)（仅在真正送达后标记 `\Seen`），表明 Email 通道正在向企业级场景完善

### 已实现的路线图信号

- **WebUI 草稿持久化**（[#5910](https://github.com/HKUDS/nanobot/issues/5910) → [PR #5912](https://github.com/HKUDS/nanobot/pull/5912)）已合入，构成一次“用户需求 → 功能落地”的完整闭环

---

## 7. 用户反馈摘要

- **飞书

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-26

---

## 1. 今日速览

过去24小时内，项目共发生 **50条Issue更新**（37条新开/活跃，13条关闭）和 **50条PR更新**（41条待合并，9条已合并/关闭），无新版本发布。活跃度处于高位，核心话题集中在三块：**OIDC安全栈的推进、Runtime/插件架构的持续重构、以及数个高优先级安全Bug的修复**。今日合并的关键PR（#10259、#10263、#9986等）为agent安全认证、主体工具选择器、agent便携化铺平了道路，整体项目健康度良好，安全与基础设施投入明显加大。

---

## 2. 版本发布

暂无新版本发布。

---

## 3. 项目进展

今日合并/关闭的9个PR中，有多个里程碑级改动落地：

- **OIDC安全栈持续合并**：
  - [#10259 `feat(security): enforce authenticated principals on RPC with native+peercred`](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) — 在RPC层强制执行"已认证主体"策略，原生/peercred身份验证已合并入master。这是#8289 OIDC大栈的第3阶段。
  - [#10263 `feat(security): compose principal tool selectors into agent sessions`](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) — 将主体的工具选择器合成进入agent会话，进一步细化权限控制，同样来自#8289。

- **Agent便携化**：
  - [#9986 `feat(agents): export an agent to a portable bundle`](https://github.com/zeroclaw-labs/zeroclaw/pull/9986) — 支持 `zeroclaw agents export <alias> --out <dir>`，导出包括manifest、配置闭包和工作区树的可移植agent包，方便agent在安装环境间移植。

- **稳定性修复**：
  - [#11046 `fix(tools): stop inlining base64 into screenshot results`](https://github.com/zeroclaw-labs/zeroclaw/pull/11046) — 截图工具不再将base64图片嵌入结果文本，消除冗余，避免了不必要的token消耗。
  - [#10397 `fix(mcp): send tool result text blocks, not the whole CallToolResult envelope`](https://github.com/zeroclaw-labs/zeroclaw/pull/10397) — MCP工具结果发送时仅提取文本块，避免模型解析整个信封。
  - [#11072 `fix(nix): set meta.mainProgram on flake packages`](https://github.com/zeroclaw-labs/zeroclaw/pull/11072) — 修复Nix flake包的 `lib.getExe` 回退警告。

**结论**：项目在"安全身份认证"、"agent可移植性"和"工具输出精简"三个方向上有实质推进，距离完整的OIDC/安全路线图又近一步。

---

## 4. 社区热点

今日讨论最热烈的Issues集中在**架构治理**与**主机级资源控制**，反映出社区对长期演进方向的关注：

- **[#8692 `[Tracker]: Maintainer decision queue for RFCs and design issues`](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（评论15，👍0）— 这是一个维护者决策跟踪器，专门为RFC、设计问题、发布策略等需要维护者拍板的事项建立队列。评论最多说明了社区对**治理透明度和决策效率**的迫切需求，或者说对积压设计决策的担忧。

- **[#10970 `RFC: Host-scoped admission control and per-agent resource bounds`](https://github.com/zeroclaw-labs/zeroclaw/issues/10970)**（评论8）— 针对单机运行多个agent时的资源边界提出RFC，希望系统在高负载时"延迟劣化"而非"稳定性崩溃"。这是多agent实际部署场景中非常现实的诉求。

- **[#7108 `feat(ci): improve cached Rust builds and CI critical path`](https://github.com/zeroclaw-labs/zeroclaw/issues/7108)**（评论8）— CI当前每次PR花15-20分钟，社区对**构建缓存和job调度优化**有强烈兴趣，直接关系到开发体验。

- **[#6489 `[Tracker]: Unified capability catalog and plugin migration roadmap`](https://github.com/zeroclaw-labs/zeroclaw/issues/6489)**（评论9）— "一切皆插件"的北方星产品愿景，希望统一集成和WASM插件视图。这是架构方向的风向标。

**PR侧**，虽然评论数未显示，但以下PR受到的关注度较高：
- [#11082 `feat(security): OIDC principals, enrollment and the gateway auth surface (#8289)`](https://github.com/zeroclaw-labs/zeroclaw/pull/11082) — 将#8289的OIDC栈合并为一个大PR，规模为XL级，安全模块大改。
- [#11133 `fix(rpc): revalidate forwarded environment on session reuse`](https://github.com/zeroclaw-labs/zeroclaw/pull/11133) — 修复会话重用时的环境转发验证，涉及权限边界，刚提交即获得关注。

---

## 5. Bug 与稳定性

今日报告了若干Bug，其中**最高严重级别为S0**（数据丢失/安全风险）：

| 严重级别 | Issue | 描述 | 是否有fix PR |
|---|---|---|---|
| **S0** | [#11110 `[Bug]: RPC workspace confinement retains a retargetable cwd symlink`](https://github.com/zeroclaw-labs/zeroclaw/issues/11110) | RPC工作区的符号链接可被重定向，可能让授权检查失效，构成数据丢失/安全风险 | 尚无直接PR |
| **S2** | [#11055 `[Bug]: The daemon never registers the channel-map factory`](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) | daemon部署下webhook、cron和SOP的turn没有可用通道，通道寻址工具在八成入口不可用 | 尚无直接PR |
| **S2** | [#10513 `[Bug]: RPC sops.run returns a run ID for a step nothing will execute`](https://github.com/zeroclaw-labs/zeroclaw/issues/10513) | RPC执行SOP步骤时返回了永远不会被执行的run ID，已关闭 | 疑似已修复（关闭） |
| **S2** | [#11059 `[Bug]: WhatsApp Web ignores force_voice`](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) | WhatsApp发送通道不读 `force_voice`，语音路由失效 | 尚无PR |
| **S2** | [#11108 `[Bug]: Preserve browser and search tool semantics instead of rewriting calls to shell`](https://github.com/zeroclaw-labs/zeroclaw/issues/11108) | 工具别名映射将`browser_open`、`web_search`错误映射为`shell`，内置浏览器/搜索工具反而被绕过 | 尚无PR |
| **S3** | [#11097 `[Bug]: Plugin egress remedy commands do not escape apostrophes`](https://github.com/zeroclaw-labs/zeroclaw/issues/11097) | 插件出网补救命令在序列化grant列表时未转义单引号，可能导致配置命令失败 | 尚无PR |
| **S3** | [#11093 `[Bug]: Stable docs promotion leaves root llms files out of sync`](https://github.com/zeroclaw-labs/zeroclaw/issues/11093) | stable文档升级脚本未同步根级`llms.txt`，版本切换后文件陈旧 | 尚无PR |

另外，今日有 **2个Windows相关的CI测试Bug** 被关闭（#10805），说明平台兼容性杂项在持续修缮中。

---

## 6. 功能请求与路线图信号

今日新出现的功能请求，以及暗示后续版本方向的路标：

- **[#11103 `feat(providers): add Cheaper Inference as a typed OpenAI-compatible provider`](https://github.com/zeroclaw-labs/zeroclaw/issues/11103)**（新开，2评论）— 添加 `cheaperinference` 类型化provider，接入低成本LLM网关。反映用户对**成本优化**和多样模型接入的呼声。

- **[#11100 `feat(providers): Preserve configured provider aliases in cost-rate catalog prefill`](https://github.com/zeroclaw-labs/zeroclaw/issues/11100)** — 在仪表盘和Zerocode中预填成本费率时保留完整的provider身份（`family.alias`），当前alias被降级为family导致配置丢失。

- **[#11052 `Feature: Render thematic breaks and setext headings for WhatsApp`](https://github.com/zeroclaw-labs/zeroclaw/issues/11052)** — WhatsApp出站Markdown渲染器需要支持 `***`、`---` 等主题分隔符和setext标题，否则真实模型输出会原样显示给用户。

**路线图信号**：
- **统一能力目录**（#6489）仍是主线，强调"Everything is a plugin"。
- **SOP控制面** (#8288) 目标5/5，但今天暴露的 #10513/#11055 说明SOP的daemon端仍不完整。
- **插件化通道/工具** (#8850) 持续推进，从编译时feature flag迁移到WASM插件。

**判断**：下一版本（可能v0.9.0）将重点消化OIDC安全栈、完善SOP控制面，并继续向"运行时插件化"演进。低成本provider和WhatsApp渲染等细节功能也可能被纳入后续patch版本。

---

## 7. 用户反馈摘要

从今日Issues/PR评论中提炼的真实用户反馈：

- **部署场景痛点**：daemon环境下webhook、cron、SOP的通道缺失（#11055）意味着"channel-addressed tools are unusable outside two entry points"，aster部署的agent功能大幅受限。
- **工具调用语义被破坏**：#11108指出内置浏览器/搜索工具被工具别名映射错误改写为shell，导致GLM输入"browser_open/url>http..."被发送到shell执行，**不是预期行为**，有安全隐患。
- **消息投递不确定性**：#10600（相关联PR）的动机来自用户无法区分"已投递"与"已丢弃"，agent可能向人谎报"已消息"。美国用户希望在真实投递前不报成功。
- **WhatsApp渠道体验粗糙**：#11059/#11052显示WhatsApp通道对TTS控制、Markdown格式支持不完整，真实模型输出会原样出现"***"等符号。
- **CI耗时影响贡献意愿**：#7108的评论表示small changes通常要等15-20分钟的CI，社区希望改进缓存和关键路径。
- **WASM插件开发体验**：#10505中开发者反馈WIT版本落后会得到"no matching implementation in the linker"这种难懂报错，希望有更明确的诊断信息。

---

## 8. 待处理积压

以下重要Issue/PR长期未闭环，需维护者关注：

| 类型 | 编号 | 标题 | 持续天数 | 状态 |
|---|---|---|---|---|
| PR | [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) | `fix(acp): persist interrupted turn progress` | 37天 | 待合并，风险:high, size:XL |
| PR | [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) | `feat(runtime): paginate persisted ACP transcripts` | 23天 | 待合并，size:XL |
| PR | [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) | `fix(runtime): recover from rejected image requests` | 27天 | 待合并，size:

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-09-26）

## 1. 今日速览

过去

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-26

## 今日速览

过去 24 小时 NanoClaw 保持高活跃度：新增 5 个 Issue（全部开放）和 50 条 PR 更新（其中 48 条待合并、2 条已关闭）。值得关注的是，今日提交的大量 PR 集中在**安装/更新流程**与**Agent 运行时稳定性**两大方向——说明维护团队正在系统性修复一批从 v2.4.0 暴露出来的回归问题。Issue 侧以 Bug 为主，其中 3 个已对应的 fix PR 已提交，响应速度较快；但 50 条 PR 中仅 2 条被合并/关闭，合并速度不及提交速度，开发商与审阅方的节奏存在一定脱节（可能受 PR 数量激增所累）。

## 项目进展

今日仅 2 条 PR 被合并或关闭，其中可见的 1 条如下：

- **#3917 [CLOSED] fix: seed Claude's default output style, not Concise, which defeated prompt caching**（[@gavrielc](https://github.com/gavrielc)，2026-09-25）— 修复自 v2.4 起 Claude 默认被设为 `Concise` 输出风格，导致会话无法从 prompt cache 回读、缓存完全失效的问题。属于性能/成本修复，合入后长对话场景的响应延迟和 token 消耗应有明显改善。链接: https://github.com/nanocoai/nanoclaw/pull/3917

另一条关闭的 PR 未在展示列表中，无法确认内容。总体看，今日合入量偏少，但待合并的 48 条 PR 中包含大量高价值修复（见下文"Bug 与稳定性"），预示着未来几天项目将迎来一次集中的版本跃迁。

## 社区热点

- **#3906 [Bug] `update-nanoclaw`: controller archive misses `setup/` since #3816**（作者: @glifocat，评论: 1）— 唯一有评论的新 Issue，指向 v2.4.0 中 `/update-nanoclaw` 的升级流程在提取 controller 时遗漏 `setup/` 目录，并且 stage-rooted 命令在依赖存在前运行，导致整个升级流程提前中止。该问题直接影响用户升级路径，评论中应有额外补充细节。链接: https://github.com/nanocoai/nanoclaw/issues/3906

- **#3916 [Bug] Host logs never rotate and carry no date**（作者: @BuckG71，评论: 0）— 虽然不是今日评论最多的 Issue，但实为今日最贴近真实用户痛点的报告：`logs/nanoclaw.log` 与 `logs/nanoclaw.error.log` 各自积累至 10 MB / 29 MB 且可追溯至 5 月，无日期切割导致按时间段搜索时可跨四个月匹配到同一时段，将历史日志误读为实时事件。这类日志治理问题在运维接触者中比较有共鸣。链接: https://github.com/nanocoai/nanoclaw/issues/3916

## Bug 与稳定性

今日 5 个新 Issue 全部为 Bug，按严重程度排序如下：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3911](https://github.com/nanocoai/nanoclaw/issues/3911) | `ncl groups restart --id <other group>` 从 agent 会话执行时重启的是调用者自身，而非目标组——操作指令作用对象错误，一旦在自动化流程中触发可能造成非预期的服务重启 | 暂无 fix PR |
| 🔴 高 | [#3909](https://github.com/nanocoai/nanoclaw/issues/3909) | 竞态条件：`spawnContainer` 在读取 agent group 后、容器启动前，若该 group 被删除，Host 仍然会启动一个容器（孤儿容器占用资源） | 暂无 fix PR |
| 🟠 中 | [#3906](https://github.com/nanocoai/nanoclaw/issues/3906) | `/update-nanoclaw` 升级流程在解包 controller archive 时缺少 `setup/` 目录，且 stage-rooted 命令在依赖未就绪时执行，升级流程被阻断 | **已有 fix PR [#3913](https://github.com/nanocoai/nanoclaw/pull/3913)** |
| 🟠 中 | [#3907](https://github.com/nanocoai/nanoclaw/issues/3907) | 嵌套 pnpm 向 stdout 打印 workspace warning 时，网关探测将输出与预期值比较失败，误报 "No installed gateway could be detected" | **已有 fix PR [#3910](https://github.com/nanocoai/nanoclaw/pull/3910)** |
| 🟡 低 | [#3916](https://github.com/nanocoai/nanoclaw/issues/3916) | 日志无日期轮转，长周期运行后单文件巨大且历史与实时日志混杂，影响事故排查准确性 | 暂无 fix PR |

此外，今日提交的 PR 中还有多条 Bug 修复值得关注（尚未合并）：

- **#3918** — 修复 agent 已通过 `send_message` 回复后，result-door 仍重复发送同一条回复的问题。链接: https://github.com/nanocoai/nanoclaw/pull/3918
- **#3908** — 修复 agent 唤醒失败时，失败通知循环发回给自身造成死循环的问题。链接: https://github.com/nanocoai/nanoclaw/pull/3908
- **#3893** — 修复 Claude 流式生成长 content block 时，host 扫描误判空闲并杀掉容器的问题（心跳机制按 provider event 更新，而 Claude SDK 在一个 block 内不产生新 event）。链接: https://github.com/nanocoai/nanoclaw/pull/3893
- **#3919** — OpenCode 设置流程在提示阶段即拦截 Iron Proxy 无法路由的本地 model URL，避免设置后每次调用失败。链接: https://github.com/nanocoai/nanoclaw/pull/3919
- **#3915** — Iron Proxy 允许列表中出现非法条目时跳过并提示修复，而非中止整个 setup。链接: https://github.com/nanocoai/nanoclaw/pull/3915

## 功能请求与路线图信号

目前没有独立的 feature request Issue，但以下 PR/Issue 透露了项目未来的演进方向：

- **可插拔的调度策略（#3903）**：为 due-session 唤醒引入插拔式准入控制点，让安装方可以不改源码自行决定并发上限、任务优先级、静默时段等调度规则。这暗示 v2.5+ 可能在调度与资源控制方面开放更多自定义能力。链接: https://github.com/nanocoai/nanoclaw/pull/3903

- **可配置的 sweep 时间窗口（#3646）**：将 `ABSOLUTE_CEILING_MS`（30 分钟）与 `CLAIM_STUCK_MS`（60 秒）硬编码改为通过环境变量可调。这是社区对本地模型后端（推理速度慢）的实际适配需求，预计会被纳入下一版本。链接: https://github.com/nanocoai/nanoclaw/pull/3646

- **自动化发送者识别（#3446）**：自动放行 bot/webhook 发送者越过 unknown-sender 审批门，减少机器人与审批流的摩擦。属于渠道层面的体验优化。链接: https://github.com/nanocoai/nanoclaw/pull/3446

- **日志治理**（来自 #3916）— 一个长期存在但未被优先处理的基础设施需求。结合该 issue 的实际运维场景，可以考虑在后续版本将日志轮转/日期分割纳入默认配置。

## 用户反馈摘要

- **升级/安装路径的痛感最为集中**（#3906、#3907、#3913、#3910、#3915、#3919、#3920）：用户对"设置完成后无法正常使用"的容忍度较低。今日有大量 PR 专门围绕 setup/update 路径做加固，说明 v2.4.0 在安装体验上存在系统性回退，社区的核心诉求是"升级不出错、安装后可运行"。
- **日志即事故现场**（#3916）：用户从运维视角反馈，NanoClaw 在长时间运行后日志文件不可读、不可过滤，直接影响生产环境的故障诊断能力。用户提到 "filtering by time-of-day matched the same hours across four months"，属于易复现且真实性强的痛点。
- **本地模型/自定义网关的路径不受重视**（#3907、#3919、#3893）：嵌套 pnpm 提示导致网关检测失败、本地模型 URL 不可路由到在提示时才暴露、本地模型推理慢导致容器被 sweep 清理，这些均指向**特定部署形态（本地模型、自定义安装）的验证不足**。社区对这些长尾场景比较敏感，希望尽早得到官方支持。

## 待处理积压

以下 PR 长期未合入，值得维护者关注：

- **#3185 [OPEN] fix(discord): strip \n delimiter in webhook interaction custom_id**（作者: @omerh，创建于 2026-08-04）— 已悬置 50+ 天。该 PR 修复 Discord 上所有审批按钮被误判为拒绝的严重问题，属于渠道层稳定性的关键修复。链接: https://github.com/nanocoai/nanoclaw/pull/3185

- **#3446 [OPEN] Auto-drop automated senders in the unknown-sender gate**（作者: @wakqasahmed，创建于 2026-08-22）— 已悬置 30+ 天。修复 bot/webhook 发送者被审批门错误拦截的问题，虽然今日有更新，但一直未能获得合入。链接: https://github.com/nanocoai/nanoclaw/pull/3446

- **#3302 [OPEN] fix(onecli): correct default OneCLI gateway bind address**（作者: @wakqasahmed，创建于 2026-08-17）— 修复 OneCLI 网关绑定地址错误，容器内 agent 无法通过 API 访问的问题，已悬置约 40 天。链接: https://github.com/nanocoai/nanoclaw/pull/3302

综合来看，NanoClaw 正处于 v2.4.0 发布后的一个集中修复期，开发活跃度高、修复响应快，但 PR 合入率偏低可能成为短期瓶颈。建议维护团队优先处理升级流程、日志治理和 Discord 审批三个用户可感知的问题，以稳定社区信心。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-26

## 1. 今日速览

过去 24 小时项目处于低频维护节奏：无新开或关闭的 Issue，亦无新版本发布，仅有 2 条 PR 处于待合并状态，且均为更新而非新建。两条 PR 分别涉及 host-runtime 时间功能修复（#8108，来自新贡献者）与代码库知识图谱的自动化刷新（#7988，CI bot），反映项目在核心功能完善与基础设施维护两个方向都有持续动作。整体而言，项目活跃度偏低但健康度稳定，社区讨论热度较低，等待核心维护者推进 PR 合并。

## 2. 版本发布

无。

## 3. 项目进展

今日没有 PR 被合并或关闭，因此没有代码实际进入默认分支。不过有 2 条 PR 正在待合并队列中，是近期值得关注的功能推进：

- **[#8108](https://github.com/nearai/ironclaw/pull/8108) — fix(host-runtime): add builtin.time shift and typed input issues**：为 `builtin.time` 新增 `operation: "shift"` 支持，允许相对于显式时间戳或当前时间进行有符号的秒、分钟、小时、天、周边移计算。使用固定时长语义，并通过宽累加器避免有符号抵消时的溢出问题。由新贡献者提交，风险低，属于文档/功能修复类变更。
- **[#7988](https://github.com/nearai/ironclaw/pull/7988) — chore(agents): refresh codebase knowledge graph**：由 CI bot 自动生成的代码库记忆引导快照刷新，属于常规基础设施维护，无功能变更。

两者合并后将分别带来时间计算能力的实质增强和代码库知识图谱的时效性更新，建议维护者优先审视。

## 4. 社区热点

今日无高讨论热度的 Issue 或 PR。

两条 PR 均无评论数据（评论字段为 undefined），没有形成讨论。值得留意的是 #8108 来自 **new contributor**（@Bortlesboat），是社区外部贡献的信号；而 #7988 是 bot 自动生成的例行维护 PR。社区层面的实质性互动目前较少，关注度集中在 #8108 的功能设计上，但由于评论缺失，暂无法提炼更深层的开发者诉求。

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归类 Issue。有一个潜在 bug 修复在等待合并：

- **[#8108](https://github.com/nearai/ironclaw/pull/8108) — fix(host-runtime): add builtin.time shift and typed input issues**：该 PR 标题中的 "typed input issues" 暗示其修复了 `builtin.time` 在类型化输入时存在的某些问题。结合其新增的边界处理（如宽累加器防溢出），可以推断原实现在时间偏移的边界条件或类型处理上存在缺陷。已有 fix PR 待合入，严重程度待维护者确认。

## 6. 功能请求与路线图信号

今日无用户提交的功能请求 Issue。但从待合并 PR 中可以读出潜在的路线图信号：

- `builtin.time` 的 `shift` 操作（#8108）是一项明确的功能扩展，且已有人实现，若合并顺利，很可能进入下一版本。该功能覆盖相对时间计算，暗示项目在时间处理能力上正从“读时间”向“时间运算”延伸。
- #7988 的知识图谱刷新说明项目在持续投资 agent 记忆/知识基础设施，这类自动化维护工作的持续发生本身就是一种路线图信号——知识图谱相关能力正在产品化打磨。

## 7. 用户反馈摘要

由于今日无活跃 Issue 评论，且两条 PR 均无评论记录，无法提取真实的用户痛点或满意度反馈。从 #8108 的变更内容可侧面推断：开发者对时间偏移计算存在实际需求，且期望处理负数偏移、跨单位偏移组合等边界场景。这一需求若得到验证，后续可能引发更多时间函数相关的 Issue 或 PR。

## 8. 待处理积压

- **[#7988](https://github.com/nearai/ironclaw/pull/7988) — chore(agents): refresh codebase knowledge graph**：该 PR 创建于 2026-08-29，已等待 28 天未合并。虽然是 CI 自动生成的例行刷新，但长时间滞留会导致知识图谱与默认分支偏差扩大，建议维护者尽快处理。
- **[#8108](https://github.com/nearai/ironclaw/pull/8108)**：创建于 2026-09-22，等待 4 天，属于正常等待期。但作为新贡献者的首次 PR，及时响应有助于提升外部贡献者留存率。

---

*数据来源：https://github.com/nearai/ironclaw*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-26

## 今日速览

过去 24 小时项目活跃度中等偏上：Issues 侧完全沉寂（0 新增/0 关闭），PR 侧相对活跃（10 条更新，其中 1 条已合并关闭，9 条待审）。新提交的 PR 集中于 OpenClaw 集成的稳定性修复（#2763、#2764、#2765）与功能扩展（#2758、#2766），说明项目当前正处在深化 OpenClaw 运行时集成、同时扩展模型提供商生态的阶段。值得注意的是，5 条来自 4 月的旧 PR（#1547、#1550、#1628、#1634、#1660）在同一天被 touch（更新于 2026-09-25），但仍处于未合并状态，显示维护者或 CI 在批量审视积压 PR，但尚未做出合入/关闭决策。无新版本发布。

---

## 版本发布

无新版本发布。

---

## 项目进展

今日唯一合并/关闭的 PR 是 OpenClaw 相关的稳定性修复，另有 5 条新 PR 进入待审队列，整体项目向"更稳定的 OpenClaw 集成 + 更丰富的模型提供商选择"方向推进。

**已合并/关闭**

- [#2763 [CLOSED] fix(openclaw): stop whole-turn replay after a model call started](https://github.com/netease-youdao/LobsterAI/pull/2763)
  - 作者：@fisherdaddy
  - 核心修复：当一个模型调用已经开始后，该轮次的关键用户消息即已提交；在失败时重放整个回合会与之冲突，并将真实报错掩盖为笼统的 "LLM request failed."。此 PR 在 `OverloadRetryState` 中新增 `modelCallStarted` 标记，并在 `agent-runner-error-handler.ts` 中据此阻止外层的整轮重放，使真实的 provider 错误得以透出。
  - 意义：提高错误诊断准确性，减少 OpenClaw 集成中因过度重试导致的歧义性故障，对依赖第三方模型供应商的开发者尤为重要。

**新提交待审 PR（部分）**

- [#2766 feat(providers): add Requesty as a model provider](https://github.com/netease-youdao/LobsterAI/pull/2766)：将 Requesty（一个聚合多模型的 LLM 网关）作为内置模型提供商加入，参照 OpenRouter 的接入方式，默认禁用。
- [#2765 fix(openclaw): preserve accepted work through recovery and compaction](https://github.com/netease-youdao/LobsterAI/pull/2765)：在压缩与网关重启后保留已接受的工作成果，同时降低固定运行时启动开销。
- [#2764 fix(openclaw): reload live gateway policies without restarting](https://github.com/netease-youdao/LobsterAI/pull/2764)：`gateway.tools`、`gateway.trustedProxies` 等三个配置项改为热加载，策略更新无需重启网关。
- [#2758 feat(cowork): display and refresh native OpenClaw progress cards](https://github.com/netease-youdao/LobsterAI/pull/2758)：在 Cowork 输入框上方显示 OpenClaw 持久化的进度卡片，并支持手动刷新保留原有计划。

这些 PR 整体表明：项目正在提升多轮/长任务的可靠性（#2763、#2765）、降低运维摩擦（#2764），并扩展生态连接能力（#2766）。

---

## 社区热点

今日数据中所有 PR 的评论数均为 undefined，Issues 为 0 条，无法依据评论/反应数据判定讨论热度。但从 PR 的提交动力来看，有两个值得关注的方向：

- **[#2766 引入 Requesty 模型提供商](https://github.com/netease-youdao/LobsterAI/pull/2766)**：这是对"更多模型选择"诉求的直接回应。Requesty 的定位与 OpenRouter 类似，用户在项目内选择"全家桶"式模型网关的意愿在增强。此前项目已支持 OpenRouter，新增 Requesty 标志着该项目有意成为多模型网关的中立聚合层。
- **[#2758 OpenClaw 原生进度卡片展示](https://github.com/netease-youdao/LobsterAI/pull/2758)**：将 OpenClaw 持久化的任务进度可视化到 Cowork 界面上，反映了用户对长任务执行过程透明度的需求——用户希望看到"Agent 现在做到哪一步了"，而不是干等结果。

---

## Bug 与稳定性

今日报告的 Bug 类 PR 按严重程度排列如下：

| 严重程度 | PR / Issue | 问题描述 | 状态 |
|---|---|---|---|
| 高（运行时故障） | [#1550 fix(scheduledTask): 投递模式为"不通知"时，去除发送给网关的 channel/to 字段](https://github.com/netease-youdao/LobsterAI/pull/1550) | 通过会话/IM 创建的定时任务，在投递模式设为"不通知"并**实际触发执行**时，网关报校验错误 "Channel is required when multiple channels are configured"；而 UI 手动创建的同配置任务无此问题。根因是两种创建路径构建 delivery 对象的方式不一致。 | ⚠️ 有修复 PR，待合并（4 月提交，5 个月有余） |
| 中（错误信息误导/失败重放） | [#2763 fix(openclaw): stop whole-turn replay after a model call started](https://github.com/netease-youdao/LobsterAI/pull/2763) | 整轮重放会与已开始的模型调用冲突，导致用户看到无意义的 "LLM request failed." 而非真实的 provider 错误。 | ✅ 已合并 |
| 中（配置生效延迟） | [#2764 fix(openclaw): reload live gateway policies without restarting](https://github.com/netease-youdao/LobsterAI/pull/2764) | 修改 `gateway.tools`、`gateway.trustedProxies`、`gateway.allowRealIpFallback` 会触发整个 Gateway 重启，成本高且有中断风险。 | 🔶 有修复 PR，待合并 |
| 低（UI 状态不一致） | [#1547 fix(scheduledTask): 修复定时任务通知渠道选择后无法改回"不通知"的问题](https://github.com/netease-youdao/LobsterAI/pull/1547) | 定时任务编辑页中，通知渠道从 IM 改为"不通知"并保存后，再次编辑仍显示之前的 IM 渠道。根因来自历史 commit `61cfe60` 两处代码设计不一致。 | ⚠️ 有修复 PR，待合并 |

其中 #1550 是积压最久的运行时 Bug（4 月提出，至今 5 个多月未合入），建议维护者优先排期；#2763 今日已修复，错误透传问题得到缓解。

---

## 功能请求与路线图信号

结合今日 PR 与积压 PR，以下功能需求可能被纳入下一版本：

- **多模型网关扩展（强信号）**：[#2766 新增 Requesty 提供商](https://github.com/netease-youdao/LobsterAI/pull/2766) 表明模型提供商聚合是明确的路线方向，未来可能持续接入更多类似 OpenRouter/Requesty 的聚合服务。
- **OpenClaw 进度可视化（中强信号）**：[#2758 原生进度卡片](https://github.com/netease-youdao/LobsterAI/pull/2758) 意图把 OpenClaw 的持久化进度带到前端，配合 [#2765 的压缩后保留已接受工作](https://github.com/netease-youdao/LobsterAI/pull/2765)，说明长任务的生命周期管理和可观测性正在成为重点。
- **非 main agent 个性化（中信号）**：[#1660 非 main agent 首页欢迎区域显示 agent 名称和描述](https://github.com/netease-youdao/LobsterAI/pull/1660) 已提交 5 个月，表达了对多 Agent 协作时身份区分与个性化体验的需求，可能随同一批次 UI 优化合入。
- **全局搜索体验升级（中信号）**：[#1634 全局搜索修复与搜索体验升级](https://github.com/netease-youdao/LobsterAI/pull/1634) 打破当前 Agent 限制、修复 Redux 状态不稳定问题，并升级搜索面板 UX——这是用户对"全局视角"操作工具的普遍预期。

---

## 用户反馈摘要

今日无 Issue 评论可供提炼，但从 PR 描述中可以读出明确的用户痛点：

- **真实错误被掩盖**（#2763）：用户在实际使用中遇到模型调用失败时，看到的是 "LLM request failed." 这样的模糊提示，无法判断是哪个 provider 出了问题。修复后原始错误得以透出，将显著改善排查体验。
- **配置生效需要重启不堪其扰**（#2764）：修改网关策略触发重启会影响在线服务，用户期望"改了就能用"。该项正被修复为热加载。
- **对更多模型提供商的需求仍在增长**（#2766）：Requesty 的提交说明有用户希望在同一客户端内使用更多模型渠道，且偏好"一个 API 访问多模型"的网关模式。
- **定时任务"不通知"配置在多入口下行为不一致**（#1550、#1547）：通过 IM 会话创建的定时任务与 UI 手动创建的任务，在"不通知"模式下的配置行为不同，导致运行时错误和编辑回显异常，反映出两种交互路径的底层数据模型需要统一。

---

## 待处理积压

以下 5 条 PR 均由 @gongzhi-netease 于 2026 年 4 月创建，至今 5 个多月未合并、未被关闭，今日（9-25）被 touch 后状态依然为 open 且标记 stale。若仍计划合入，建议维护者明确时间表；若已不再适用，请尽快关闭以避免积压噪音。

| PR | 内容 | 状态 | 最后更新 |
|---|---|---|---|
| [#1547 fix(scheduledTask): 通知渠道无法改回"不通知"](https://github.com/netease-youdao/LobsterAI/pull/1547) | 修复定时任务编辑回显 Bug（+2 行） | stale, open | 2026-09-25 |
| [#1550 fix(scheduledTask): "不通知"模式下去除发给网关的 channel/to](https://github.com/netease-youdao/LobsterAI/pull/1550) | 修复会话创建的定时任务触发时报 Channel required 错误 | stale, open | 2026-09-25 |
| [#1628 feat(ui)：优化模型选择器 UI 及统一会话工具栏样式](https://github.com/netease-youdao/LobsterAI/pull/1628) | 模型选择器重构、供应商图标、下拉面板定位优化 | stale, open | 2026-09-25 |
| [#1634 fix(cowork): 全局搜索修复与搜索体验升级](https://github.com/netease-youdao/LobsterAI/pull/1634) | 修复搜索范围被当前 Agent 限制，全方面 UX 升级 | stale, open | 2026-09-25 |
| [#1660 feat(cowork): 非 main agent 首页显示 agent 名称和描述](https://github.com/netease-youdao/LobsterAI/pull/1660) | 个性化欢迎区域，main agent 保持原样 | stale, open | 2026-09-25 |

---

*本日报由 AI 生成，数据来自 GitHub 公开仓库 netease-youdao/LobsterAI，统计窗口为 2026-09-25 至 2026-09-26。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-26

> 数据区间：2026-09-25 至 2026-09-26（GitHub 活动快照）  
> 数据源：[agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)（Issues/PRs 镜像于 QwenPaw 仓库）

---

## 1. 今日速览

过去 24 小时项目活跃度处于**高位**：共产生 25 条更新（12 条 Issue、13 条 PR），但**无新版本发布、无 PR 合并/关闭**，提交大量涌入而审查合并存在积压。值得关注的是，Issue 与 PR 呈现出高度的**“当日上报、当日修复”联动特征**——今日新增的 #7980、#7984、#7979 等 Bug 均有对应 fix PR（#7988、#7987、#7986），且出现了 4 位 first-time-contributor，社区参与度正在扩大。另一方面，功能类需求（#7957、#7978、#7990）持续积累，说明项目已进入功能深化与体验打磨阶段。

---

## 2. 版本发布

**无。** 过去 24 小时无新 Release，项目处于功能迭代与 Bug 修复的密集提交期，尚未打出新版本号。

---

## 3. 项目进展

今日**无 PR 被合并或关闭**，13 条 PR 全部处于待合并状态。但 PR 提交本身已清晰地勾勒出下一版本的功能与修复版图：

- **稳定性修复集群**：针对今日集中报告的 Bug，社区已快速提交修复 PR——如 grep_search 二进制过滤（#7988）、Playwright 扩展禁用问题（#7987）、QQ 网关消息重放（#7983）、自定义端点上下文窗口误判（#7986）。这表明项目具备**快速响应生态反馈**的能力，但合并通道的拥堵可能延缓修复生效。
- **功能增强持续打磨**：老牌 PR 如工具调用可见性切换（#7357）、每媒体内联能力上限（#7359）、滚动消息分页（#7542）仍在等待合并，覆盖了聊天 UI、Provider 配置、上下文管理三个核心方向。
- **国际化与细节修复**：#7985 修复了代码片段计数标签的 i18n 复数后缀，#7825 修复了 cron 数字星期与 APScheduler ISO 星期错位问题——这类细节修复表明项目正从“能用”走向“好用”。

---

## 4. 社区热点

| 排名 | 条目 | 评论数 | 链接 | 核心诉求 |
|------|------|--------|------|----------|
| 1 | #7628 上下文压缩仍可能超出 provider 完整请求预算 | 7 | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 上下文压缩的触发器与实际预算未基于“发给 provider 的完整请求”计算，可能导致活跃对话失败。这是对核心机制的深度质疑，涉及 QwenPaw 2.2.0b7 的架构行为。 |
| 2 | #7884 压缩后刷新前端，历史信息无法全量加载 | 5 | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7884) | 用户对“压缩后聊天记录翻不到”的体验强烈不满，诉诸情感化表达（“知道这个体验多差么？？？”），反映上下文压缩对普通用户的可感知副作用。 |
| 3 | #7957 建议支持手动停用/禁用预制模型和频道 | 3 | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7957) | 用户希望隐藏未使用的预制模型/频道，提及“强迫症”场景，本质是 UI 定制化与信息密度控制需求。 |
| 4 | #7948 Web 控制台设计破坏用户输入 | 3 | [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7948) | 控制台 UI 存在影响输入的功能性问题，虽描述尚不完整，但“破坏用户输入”的定性使其值得优先关注。 |

**热点分析**：今日讨论热度集中在**上下文压缩的前后端一致性问题**（#7628 + #7884 合计 12 条评论），说明压缩机制虽已上线，但其触发边界（后端预算）与用户感知（前端历史可回溯性）之间仍存在显著落差。这不仅是一个技术 Bug，更是一个影响用户信任的体验断层。

---

## 5. Bug 与稳定性

按严重程度降序排列：

| 严重度 | Issue | 描述 | 状态 | 对应修复 PR |
|--------|-------|------|------|-------------|
| 🔴 严重 | [#7980](https://github.com/agentscope-ai/QwenPaw/issues/7980) | `grep_search` 无二进制文件过滤，默认搜索会命中内部 `history.db-wal`，二进制字节进入会话状态导致**状态中毒与不可恢复的死循环** | 待处理 | ✅ [#7988](https://github.com/agentscope-ai/QwenPaw/pull/7988) |
| 🔴 严重 | [#7981](https://github.com/agentscope-ai/QwenPaw/issues/7981) | `chat_with_agent` 前台超时后，调用方收到“用户中断”的误导信息，且父 turn 无最终答案 | 待处理 | ❌ 暂无 |
| 🟠 较高 | [#7946](https://github.com/agentscope-ai/QwenPaw/issues/7946) | QQ 官方机器人网关在 session 恢复时重放历史事件，导致**重复消息处理**（用户环境：QwenPaw 2.2.1 + fnOS） | 待处理 | ✅ [#7983](https://github.com/agentscope-ai/QwenPaw/pull/7983) |
| 🟠 较高 | [#7984](https://github.com/agentscope-ai/QwenPaw/issues/7984) | Browser SDK 持久 profile 模式下，Playwright 注入 `--disable-extensions` 且用户无法移除，扩展（如代理工具）无法加载 | 待处理 | ✅ [#7987](https://github.com/agentscope-ai/QwenPaw/pull/7987) |
| 🟡 中等 | [#7979](https://github.com/agentscope-ai/QwenPaw/issues/7979) | 本地 llama.cpp 提供商被静态云端目录误判为 1M 上下文（实际 32k），**压缩永不触发** | 待处理 | ✅ [#7986](https://github.com/agentscope-ai/QwenPaw/pull/7986) |
| 🟡 中等 | [#7924](https://github.com/agentscope-ai/QwenPaw/issues/7924) | Console 中 Markdown 表格超宽、横向滚动条沉底、不会自动限宽，长内容无法折行 | 待处理 | ✅ [#7989](https://github.com/agentscope-ai/QwenPaw/pull/7989) |
| 🟢 较低 | [#7948](https://github.com/agentscope-ai/QwenPaw/issues/7948) | Web 控制台设计破坏用户输入（描述待补充） | 待处理 | ❌ 暂无 |

**小结**：今日报告的 Bug 呈现明显的“系统集成”特征——涉及 QQ 网关、Playwright、llama.cpp、SQLite 内部文件等多个外部依赖边界。其中 #7980 的“状态中毒 + 死循环”和 #7981 的超时误导信息属于高影响缺陷，建议维护者优先审查合并对应修复（#7988 和未来 PR）。

---

## 6. 功能请求与路线图信号

**新增功能请求（今日）：**

- [#7957](https://github.com/agentscope-ai/QwenPaw/issues/7957)：支持手动停用/禁用预制模型与频道——面向 UI 定制化与信息精简。
- [#7978](https://github.com/agentscope-ai/QwenPaw/issues/7978)：侧边栏增加跨 Agent 的 “Recent Sessions” 面板，含实时状态指示器——多 Agent 管理场景的刚需。
- [#7990](https://github.com/agentscope-ai/QwenPaw/issues/7990)：模型目录为 Aliyun Token Plan 模型声明 `thinking_param_style`——模型目录数据完善度问题，直接影响 Console 思考控件展示。

**可能纳入下一版本的信号（依据已有 PR）：**

- **聊天 UI 增强**：#7357（工具调用卡片显隐切换）、#7542（滚动消息分页）——这两个 PR 已挂起近一个月，若合并将使聊天界面的可读性与历史回溯能力大幅提升。
- **Provider 配置精细化**：#7359（每媒体内联能力上限）与 #7986（自定义端点上下文窗口修正）共同指向 Provider 层配置的灵活性与准确性。
- **数据生命周期管理**：#7923（tool_result 块按 `blocks_retention_days` 过期）可作为历史记录无限增长的解决方案，与用户反馈 #7884 的诉求存在潜在协同。

---

## 7. 用户反馈摘要

- **对历史记录丢失的强烈不满**：Issue #7884 中用户明确表达了对“压缩后聊天记录无法回溯”的愤怒，认为这是严重的体验倒退。该反馈与 #7924、#7542 形成一组“历史记录可读性”问题集群，建议维护者将该方向列为体验优化的优先项。
- **对控制台输入体验的抱怨**：#7948 用户反馈 Web 控制台存在破坏输入的设计问题，虽细节不足，但“破坏用户输入”的措辞暗示问题可能涉及输入框焦点、按键拦截或内容丢失，需要维护者主动联系补充复现信息。
- **定制化呼声**：#7957 用户以“强迫症”自述，希望隐藏不使用的预制模型和频道——这类声音代表了一部分追求简洁界面的用户群体，与 #7978 的“跨 Agent 监控面板”需求叠合，说明侧边栏/控制台的信息架构已是用户关注重点。

---

## 8. 待处理积压

以下条目长期未合并或响应，建议维护者优先关注：

| 类型 | 条目 | 创建时间 | 搁置时长 | 说明 |
|------|------|----------|----------|------|
| PR | [#7542](https://github.com/agentscope-ai/QwenPaw/pull/7542) 滚动消息分页 | 2026-09-04 | 22 天 | first-time-contributor 提交，解决了压缩后消息不可回溯的痛点，与 #7884 用户抱怨直接相关 |
| PR | [#7357](https://github.com/agentscope-ai/QwenPaw/pull/7357) 工具调用可见性切换 | 2026-08-27 | 30 天 | 已挂起一个月的功能型 PR，长期未审查 |
| PR | [#7359](https://github.com/agentscope-ai/QwenPaw/pull/7359) 每媒体内联能力上限 | 2026-08-27 | 30 天 | 同 #7357，均为社区贡献的完整功能实现，长时间未获合并信号 |
| Issue | [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) 上下文压缩超预算 | 2026-09-08 | 18 天 | 今日最热 Issue（7 条评论），仍无关联 PR，核心机制问题 |

**健康度提示**：PR 合入通道的拥堵（今日 13 条 PR 全部待合并，最老 PR 已挂 30 天）可能导致社区贡献者的积极性受挫，尤其是 first-time-contributor 的提交（#7989、#7988、#7987、#7982）若长期得不到反馈，将影响开源生态的可持续性。

---

*本日报由 AI 分析师自动生成，数据来源于 CoPaw/QwenPaw GitHub 仓库公开信息，仅供项目健康度参考。*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 (2026-09-26)

## 1. 今日速览

过去 24 小时 EasyClaw 项目保持平稳节奏：无新 Issue 或 PR 提交/关闭，社区讨论活跃度较低；但项目发布了 v1.9.23 版本，包含功能增强与稳定性修复，表明维护团队持续迭代。整体来看，项目处于「发布驱动」的常态阶段，代码维护与交付节奏正常，社区互动热度有待观察。建议关注后续数日 Issue 与 PR 的跟进情况，以判断社区活跃度趋势。

## 2. 版本发布

### v1.9.23 (TK Copilot)

- **发布时间**：2026-09-26（基于提交数据推测）
- **更新内容**：
  - 新增达人联盟样品明细下钻功能，分页体验更清晰，新增达人表现数据列，导出功能可靠性提升
  - 修复可滚动面板的内边距问题，确保内容留白始终保持在滚动区域内
- **破坏性变更**：无（变更集中于功能增强与 UI 修复，未涉及接口或数据模型调整）
- **迁移注意事项**：由于未声明破坏性变更，现有用户可正常升级；建议升级后关注达人联盟页面分页与导出功能是否符合预期。若您使用自定义样式覆盖了面板内边距，请确认修复后的效果。

## 3. 项目进展

今日无已合并/关闭的 PR（共 0 条），项目代码库未增加新提交。不过，v1.9.23 版本的发布承载了近期开发成果：达人联盟样品明细下钻属于功能扩展，进一步完善了联盟数据分析链路；滚动面板内边距修复则解决了 UI 细节问题，提升了交互体验。总体而言，项目保持稳定迭代，但今日并无具体代码层面的「跨越式」进展。

## 4. 社区热点

今日无新开或活跃的 Issue/PR（共 0 条），因此没有讨论热点。根据历史版本信息推测，达人联盟相关功能（样品明细、数据展示）是近期社区关注度较高的方向，后续可留意用户对新版下钻功能的反馈。

## 5. Bug 与稳定性

今日无新增 Bug 报告。v1.9.23 中修复的「可滚动面板内边距」属于 UI 稳定性问题，已在最新版本中解决，无遗留风险，严重程度为「低」。项目当前无已知的严重崩溃或回归问题。

## 6. 功能请求与路线图信号

今日无新功能请求。从 v1.9.23 的更新内容来看，达人联盟样品明细下钻功能已落地，结合此前版本持续围绕达人数据展示与导出做增强，可以判断**达人数据深度分析**是当前产品迭代的主线方向之一。未来版本可能继续优化相关数据维度、筛选与导出能力。

## 7. 用户反馈摘要

今日无 Issue 评论可提炼。基于版本发布内容推断，用户对以下两点反馈可能较为积极：
- 达人联盟样品明细分页与达人表现数据列解决了数据查看不便的痛点
- 滚动面板内边距修复使得长列表滚动操作体验更舒适

## 8. 待处理积压

当前无长期未响应的关键 Issue 或 PR。项目积压情况健康，维护响应及时。

> 链接说明：由于今日无具体 Issues/PRs，相关链接标注为占位，可访问 [EasyClaw Issues 页面](https://github.com/gaoyangz77/easyclaw/issues) 和 [Pull Requests 页面](https://github.com/gaoyangz77/easyclaw/pulls) 获取最新列表。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*