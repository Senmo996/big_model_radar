# OpenClaw 生态日报 2026-09-15

> Issues: 466 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-15 02:19 UTC

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

# OpenClaw 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时，OpenClaw 仓库保持了极高的社区活跃度：共更新 466 条 Issue（新开/活跃 297 条，关闭 169 条）和 500 条 PR（待合并 280 条，合并/关闭 220 条），讨论集中在 **消息传递可靠性**、**更新/升级失败**、**Gateway 稳定性与子进程泄漏**、**会话状态与安全** 等核心稳定性议题。今日无新版本发布，但多个 P0 级问题（更新失败、Windows 更新卡死、多代理迁移崩溃循环）已拿到对应修复 PR，整体处于“高活跃、高压修复”状态。风险面集中在 2026.9.3/9.4 更新链路的可靠性，以及若干影响消息不丢失和会话状态的回归问题，社区反馈强烈，维护者响应及时。

- 活跃度：🔴 极高（Issue+PR 日更新近千条）
- 健康度：🟡 中等偏下 — P0/P1 问题密集，但修复 PR 跟进迅速

## 2. 版本发布

今日无新版本发布（最新 Release 仍为 2026.9.4）。但社区正密集报告 2026.9.3/9.4 的更新与升级可靠性问题，详见第 5 节。

## 3. 项目进展

虽然今日无版本发布，但多个关键修复 PR 处于待合并状态，主要进展集中在以下几类：

- **更新与恢复可靠性**：`steipete` 提交 `fix(update): keep stale-plugin refresh out of the candidate canary deadline`（[#148694](https://github.com/openclaw/openclaw/pull/148694)），直接修复 P0 更新失败问题（关联 #148614），将过期插件刷新移出候选验证的启动预算，避免 SQLite 完整性检查器被误报为启动失败。另有 `fix(setup): activate saved sign-ins through Gateway reload`（[#148312](https://github.com/openclaw/openclaw/pull/148312)）修复重启后凭据失效问题。
- **Gateway 稳定性**：`fix(gateway): isolate deferred config reload context`（[#146913](https://github.com/openclaw/openclaw/pull/146913)）隔离延迟配置重载的异步上下文，避免 turn 级作用域泄漏；`fix(gateway): bound unattributable proxy warnings per source`（[#134404](https://github.com/openclaw/openclaw/pull/134404)）对无法归因的代理告警做限流，防止日志刷屏。
- **性能优化**：`perf(fleet): run registry operations in SQLite workers`（[#148290](https://github.com/openclaw/openclaw/pull/148290)）与 `refactor(tasks): prepare cold task and flow reads asynchronously`（[#148574](https://github.com/openclaw/openclaw/pull/148574)）将 SQLite 读操作移入 worker，缓解主线程阻塞；`perf(memory): honor explicit embedding batch item limits`（[#140508](https://github.com/openclaw/openclaw/pull/140508)）优化 embedding 分批重试策略。
- **Web UI 体验**：`feat: let users unpin Home and group its conversation`（[#148582](https://github.com/openclaw/openclaw/pull/148582)）、`feat(models): show Codex usage per OpenAI account`（[#146143](https://github.com/openclaw/openclaw/pull/146143)）、`feat: background task views show what exec commands actually printed`（[#148138](https://github.com/openclaw/openclaw/pull/148138)）、`fix(ui): keep the selected agent across Settings pages`（[#148667](https://github.com/openclaw/openclaw/pull/148667)）等多项 UI 改进已进入待审查队列。

上述修复若顺利合并，将显著降低 2026.9.4 用户在更新、升级、日常运行中的故障率，并提升大规模部署下的主线程响应能力。

## 4. 社区热点

以下 Issues 在过去 24 小时讨论最激烈，反映了社区的集中诉求：

- **[#25592 — Text between tool calls leaks to messaging channels（40 条评论）](https://github.com/openclaw/openclaw/issues/25592)**：代理在工具调用之间产生的内部文本（错误处理、处理确认等）被当作可见消息发到 Slack/iMessage 等通道，严重影响用户体验。该问题被标记为 P1，且挂了 `impact:security` 和多个 `clawsweeper` 评审标签，社区讨论热度最高。背后诉求是**希望 OpenClaw 严格区分“内部处理输出”与“面向用户的消息”**。
- **[#97616 — OpenClaw leaks unreaped hook/tool child processes（30 条评论）](https://github.com/openclaw/openclaw/issues/97616)**：hook/工具执行泄漏子进程，导致僵尸进程堆积和运行时性能退化。这是一个回归问题，用户希望尽快修复以恢复长期运行稳定性。
- **[#88312 — Codex app-server turn-completion stall returns（22 条评论，👍 5）](https://github.com/openclaw/openclaw/issues/88312)**：5.27 回归问题——Codex 应用服务器多工具回合卡在“turn complete”确认之前。该问题有 5 个 👍，是社区高频痛点，且与另一 P0 追踪 #145252 关联。
- **[#119720 — Synchronous agent persistence blocks Gateway event loop at scale（20 条评论）](https://github.com/openclaw/openclaw/issues/119720)**：大规模部署下同步持久化和转录维护阻塞事件循环。用户 `todddickerson` 给出了详细的现状分析，说明部分修复已落地但问题仍存。
- **[#48788 — centralized filename encoding utility（20 条评论）](https://github.com/openclaw/openclaw/issues/48788)**：多编码 Content-Disposition 文件名处理的中长期架构方案，社区讨论了跨通道（飞书、Shift-JIS、EUC-KR 等）的统一解决方案，属于典型的基础设施改进需求。

PR 侧，虽然没有直接评论数，但以下 PR 因标题、关联 Issues 和活跃度被高频关注：`fix(update)`（[#148694](https://github.com/openclaw/openclaw/pull/148694)）、`fix(cli-runner)`（[#148250](https://github.com/openclaw/openclaw/pull/148250)）和 `fix: agent turn fails with Unknown CLI backend`（[#148670](https://github.com/openclaw/openclaw/pull/148670)）。

## 5. Bug 与稳定性

今日报告的 Bug 数量多、覆盖面广，按严重程度排序如下：

**P0 / 发布阻断（release blocker）：**

- **[#148614 — Update failure: runtime-verification-failed (2026.9.3)](https://github.com/openclaw/openclaw/issues/148614)**（新开，6 条评论）— macOS/arm64 更新到 2026.9.4 失败，阶段为 `runtime-verification-failed`。✅ 已有修复 PR：[#148694](https://github.com/openclaw/openclaw/pull/148694)
- **[#146860 — Windows managed update handoff cannot obtain process start identity](https://github.com/openclaw/openclaw/issues/146860)**（P0）— 当 Gateway 计划任务使用 `LogonType: InteractiveToken` 时，更新交接无法获得子进程身份，导致更新卡在 activating 并最终 abandoned。
- **[#145252 — [Tracking] 2026.9.3/2026.9.4 update, upgrade and recovery reliability](https://github.com/openclaw/openclaw/issues/145252)**（P0，维护者追踪）— 汇总 9.3/9.4 更新、升级、恢复可靠性问题，已有 9 条评论。
- **[#145510 — Update failure: runtime-verification-failed (2026.9.3)](https://github.com/openclaw/openclaw/issues/145510)**（P0）— 与 #148614 相同症状，win32/x64 平台。
- **[#123326 — Explicit multi-agent Codex migration crash-loops Gateway startup](https://github.com/openclaw/openclaw/issues/123326)**（P0）— 多代理安装启动崩溃循环，即使是无需 sidecar 的场景。✅ 已有 PR [#125345](https://github.com/openclaw/openclaw/pull/125345) 尝试解决（但该 PR 状态为等待作者）。

**P1 / 高影响：**

- **[#144911 — MCP server init timeout crashes the Gateway](https://github.com/openclaw/openclaw/issues/144911)**（P1）— stdio MCP 服务器 30 秒初始化超时触发未处理的 Promise rejection，导致整个 Gateway 崩溃。
- **[#139847 — Message sent while a reply run is active is dropped](https://github.com/openclaw/openclaw/issues/139847)**（P1，回归）— 2026.9.2 起，回复运行期间到达的新消息会因缺少工具权限快照而被丢弃。
- **[#125333 — totalTokens inflation still reproduces on 2026.8.1-beta.2](https://github.com/openclaw/openclaw/issues/125333)**（P0 标记、P1 影响）— 令牌数虚增问题在 CLI 之外的路径仍未修复，影响上下文压缩决策。
- **[#125570 — Skill Workshop update overwrites live skill's description](https://github.com/openclaw/openclaw/issues/125570)**（P1）— 技能更新应用覆盖活动技能的描述字段，导致技能路由失效（数据丢失类）。
- **[#125764 — Telegram adapter network-failed outbound sends dead-lettered after a single attempt](https://github.com/openclaw/openclaw/issues/125764)**（P1）— 瞬时网络故障导致 Telegram 消息永久死信，且无重试、无告警。
- **[#144809 — claude-cli turns longer than RUN_STALE_TAKEOVER_MS lose their reply](https://github.com/openclaw/openclaw/issues/144809)**（P1）— 长回合生成的回复因“no active tool authority snapshot”而丢失。
- **[#148387 — Fresh install auto-enables codex plugin and widens plugins.allow](https://github.com/openclaw/openclaw/issues/148387)**（P2，但影响安全）— 全新安装默认启用 codex 插件并放宽 plugins.allow，存在安全边界扩大风险。

**已关闭/已解决：**

- [#145072 — macOS npm update fails at "global install swap"](https://github.com/openclaw/openclaw/issues/145072)（P0，已关闭，✅ 修复已合并）
- [#99586 — Runtime tool surface returns blank body after gateway-touching operations](https://github.com/openclaw/openclaw/issues/99586)（P2，已关闭）

## 6. 功能请求与路线图信号

今日涌现的功能请求中，以下方向可能进入近期路线图：

- **集中式文件名编码工具**（[#48788](https://github.com/openclaw/openclaw/issues/48788)）— 已有 20 条讨论，社区希望为多编码（Shift-JIS、EUC-KR、GB18030）提供统一处理。若维护者认同，可能成为跨通道基础设施改造。
- **持久任务状态表面**（[#52640](https://github.com/openclaw/openclaw/issues/52640)）— 为长时间运行的通道回合提供第一方的持久任务状态 UI 抽象。这对 Discord 用户尤其重要，当前已有 PR 在做基础工作（如 [#148138](https://github.com/openclaw/openclaw/pull/148138) 后台任务输出展示）。
- **Skill Graph 按需加载**（[#74100](https://github.com/openclaw/openclaw/issues/74100)）— 构建技能依赖图谱，减少启动时的 Token 消耗。虽然标记为 P3/stale，但社区在持续表达诉求，可能作为性能改进项。
- **/stream 模式切换命令**（[#74077](https://github.com/openclaw/openclaw/issues/74077)）— 允许用户在当前会话中直接切换预览流式模式，无需改配置重启。
- **Sessions 面板按“最后有效活动”排序**（[#51028](https://github.com/openclaw/openclaw/issues/51028)）— 用户希望排除心跳噪声，按真实对话活动排序。这个需求与 [#148582](https://github.com/openclaw/openclaw/pull/148582)（允许取消固定 Home）共同指向 **Web UI 会话管理的精细化**。

此外，以下 PR 若被合并，将直接带来路线图级别的能力：

- **Codex 用量展示**（[#146143](https://github.com/openclaw/openclaw/pull/146143)）— 在 Web UI 中按 OpenAI 账户显示 Codex 使用量/额度

---

## 横向生态对比

# 个人 AI

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-15

---

## 1. 今日速览

过去24小时项目活跃度极高：共 6 条 Issue 更新（其中 5 条新开/活跃、1 条关闭）和 24 条 PR 更新（13 条待合并、11 条已合并/关闭）。值得注意的信号是，新开的 5 个 Issue 中有 4 个来自同一用户针对 iOS PWA/移动端 WebUI 的集中体验反馈，反映出项目在移动端适配方面仍存在明显短板；与此同时，PR 流水线保持高效运转，涉及 provider 容错、cron 调度校验、WebUI 交互优化等多个方向。无新版本发布，但修复类 PR 密集，整体项目推进节奏良好。

---

## 2. 版本发布

今日无新版本发布，省略。

---

## 3. 项目进展

今日共有 11 个 PR 被合并/关闭，其中包含多个值得关注的功能修复与改进：

### 关键合入 PR

- **[#5760] fix(webui): adapt chat toolbar to available width** — 聊天工具栏自适应可用宽度，宽屏下保持紧凑平铺、窄屏下避免遮挡消息内容，是 WebUI 细节体验的重要优化。  
  https://github.com/HKUDS/nanobot/pull/5760

- **[#5743] fix(webui): simplify settings catalog controls and headings** — 简化设置目录控件，Calendar 成为 Automations 默认视图，并统一使用共享 composer 创建自动化，降低用户认知负担。  
  https://github.com/HKUDS/nanobot/pull/5743

- **[#5686] fix(cron): defer timer rearming while jobs execute** — 修复 cron 回调执行期间 `_arm_timer()` 取消自身任务导致 `CancelledError` 的严重竞态问题，提升定时任务可靠性。  
  https://github.com/HKUDS/nanobot/pull/5686

- **[#5751] fix(cron): preserve pending runs when editing automation details** — 修复编辑自动化名称/指令时因重新计算下一次触发时间而导致任务被跳过或永远不执行的问题。  
  https://github.com/HKUDS/nanobot/pull/5751

- **[#5730] fix: stream internal model calls with idle timeouts** — Dream 等内部任务改用流式模型请求并增加空闲超时，避免长耗时模型调用触发 HTTP 超时后耗尽总时限。  
  https://github.com/HKUDS/nanobot/pull/5730

- **[#5734] fix(memory): clarify Dream prompt write permissions** — 明确 Dream 任务对记忆文件的写权限边界，避免 Codex 因提示词中的权限限制而拒绝更新长期记忆。  
  https://github.com/HKUDS/nanobot/pull/5734

- **[#5684] docs: refresh README with current WebUI feature gallery** — 更新 README，加入当前 WebUI 截图与功能导览，改善新用户上手路径。  
  https://github.com/HKUDS/nanobot/pull/5684

**总结**：今日合入 PR 聚焦三类成果——cron 调度可靠性显著增强、WebUI 交互细节持续打磨、内部模型调用链路的稳定性提升。项目在自动化任务与前端体验两个核心方向均有实质进展。

---

## 4. 社区热点

### 最受关注 Issue：DuckDuckGo 搜索挂起问题终结

- **[#2804] web_search via DuckDuckGo hangs indefinitely**（已关闭，4 条评论，跨越 5 个月终于收尾）  
  该 Issue 于 4 月 5 日创建，报告 `asyncio.to_thread(ddgs.text, ...)` 可能无限期挂起并阻塞整个会话的消息处理。期间积累 4 条评论，今日关闭，表明修复方案已落地或已做替代处理。长期问题得到解决是社区的重要正向信号。  
  https://github.com/HKUDS/nanobot/issues/2804

### 新活跃热点：NVIDIA NIM 超时错误导致 agent 停止

- **[#5674] agent stops working when provider Nvidia NIM returns a specific error**（1 条评论，已关联 fix PR）  
  用户报告 NIM 返回 "timed out after 300s/600s" 错误后，NanoBot 将错误误判为模型输出，导致 agent 停止工作。该帖已获得开发者响应并提交修复 PR #5769，是当前最热门的 provider 稳定性议题。  
  https://github.com/HKUDS/nanobot/issues/5674  
  关联 PR：https://github.com/HKUDS/nanobot/pull/5769

### 移动端体验集中反馈

用户 @morandot 在今日连续提交 4 个 WebUI 移动端/PWA 相关 Issue（#5770–#5773），形成一组密集的体验问题信号，涉及冷启动白屏、顶部渲染异常、侧边栏交互缺陷等，详见下文 Bug 部分。

---

## 5. Bug 与稳定性

按严重程度排列今日报告与修复中的问题：

### 高严重度

- **[#5674] NIM 特定超时错误导致 agent 永久停止**（OPEN）  
  NIM 返回 "timed out after 300s/600s" 时被误判为模型输出，整个 agent 停止工作。属于 provider 错误分类缺陷，影响面大。  
  ✅ 已有修复 PR：**[#5769] fix(providers): fail over on NIM-style timeout errors**，通过异常消息文本识别超时并触发故障转移。  
  https://github.com/HKUDS/nanobot/issues/5674  
  https://github.com/HKUDS/nanobot/pull/5769

- **[#2804] DuckDuckGo 搜索无限挂起阻塞会话消息**（CLOSED）  
  搜索工具挂起导致整个会话消息管道被阻塞，今日关闭，修复已合入。  
  https://github.com/HKUDS/nanobot/issues/2804

### 中低严重度（WebUI 移动端体验系列）

- **[#5773] PWA 冷启动显示长时间空白屏**（OPEN，无 fix PR）  
  从主屏幕图标启动 PWA 时首帧渲染前出现明显空白，感知性能弱于 Safari 直接打开。  
  https://github.com/HKUDS/nanobot/issues/5773

- **[#5772] iOS PWA standalone 模式顶部渲染褪色/半透明**（OPEN，无 fix PR）  
  顶部侧边栏切换按钮及下方消息内容区域在 standalone 模式下显得半透明/模糊。  
  https://github.com/HKUDS/nanobot/issues/5772

- **[#5771] 移动端会话列表需两次点击才能打开会话**（OPEN，无 fix PR）  
  首次点击无效果，需点击第二次才实际打开会话，直接影响核心使用路径。  
  https://github.com/HKUDS/nanobot/issues/5771

- **[#5770] 打开移动端侧边栏时自动聚焦搜索按钮并显示 "Search ⌘K" 提示**（OPEN，无 fix PR）  
  触屏设备上无 hover 状态，白色提示胶囊意外弹出，造成界面干扰。  
  https://github.com/HKUDS/nanobot/issues/5770

### 已修复的 cron/API 边界问题（PR 已合入）

- cron 回调执行中任务被自身取消（#5686）→ 已修复合入
- 编辑自动化时任务被跳过/丢失（#5751）→ 已修复合入
- 内部模型调用因非流式超时失败（#5730）→ 已修复合入

---

## 6. 功能请求与路线图信号

### 可能进入下一版本的功能请求

- **波兰语本地化支持** — PR [#5767] 添加完整波兰语翻译（1,536 条公共消息 + 497 条配置面板消息），WebUI 国际化布局再进一步。  
  https://github.com/HKUDS/nanobot/pull/5767

- **aimlapi.com 作为内置 provider** — PR [#5666] 由 aimlapi 官方团队提交，提供 1000+ 模型聚合 API 的接入支持并附带合作优惠，属于带有商务合作属性的新 provider 集成。  
  https://github.com/HKUDS/nanobot/pull/5666

- **Telegram 自定义 Bot API 基础 URL** — PR [#4919] 支持自托管 Bot API server 或企业网关，满足对数据主权有要求的用户群体，持续等待合并中。  
  https://github.com/HKUDS/nanobot/pull/4919

- **稳定的每次调用工具上下文** — PR [#5750] 通过 ContextVar 向工具实现暴露 `tool_call_id` 等调用上下文，修复 #5749，对工具链开发者是重要基础能力。  
  https://github.com/HKUDS/nanobot/pull/5750

### 路线图方向判断

从今日活跃 PR 看，项目正沿四个方向推进：① provider 容错体系升级（NIM 超时分类、半开探测序列化）；② 输入参数严格校验（cron 字段冲突、stream 布尔类型、多模态字段类型）；③ WebUI 移动端体验补课；④ 国际化与渠道接入扩展。其中第②类 PR（#5762、#5763、#5765、#5766）全部由同一开发者 @FanouZeng-TT 提交，形成系统性的 API 健壮性改进批次。

---

## 7. 用户反馈摘要

### 真实痛点与使用场景

- **超时错误导致服务中断的挫败感**（#5674）：用户明确指出 "the agent stops working because nanobot thinks its the model output"，错误

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时项目保持高活跃度：共产生 22 条 Issue 更新（新开/活跃 11，关闭 11），50 条 PR 更新（待合并 38，合并/关闭 12），无新版本发布。开发与审查并行推进，安全与稳定性修复是今日主线——OpenCode 会话头修复（#10603）与共同配对码策略（#6613）等历史问题正式关闭，同时出现了 2 个新的 S1 级 Bug（#10863、#10854）需重点关注。总体看，项目处于高速迭代期，社区贡献活跃，但 PR 积压（38 条待合并）与高风险问题仍需维护者持续投入。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共有 12 条 PR 合并/关闭，以及 11 条 Issue 关闭，核心进展如下：

**网关安全加固完成**
- [#10307 [CLOSED] fix(gateway): one shared pairing-code policy, stronger default](https://github.com/zeroclaw-labs/zeroclaw/pull/10307) — 统一配对码生成策略，将默认配对码从 6 位数字提升为更安全的长度与字符集，解决了长期存在的配置旋钮无消费者问题（对应 #6613 关闭）。
- [#6613 [CLOSED] Allow setting, and default to, a much stronger pairing code](https://github.com/zeroclaw-labs/zeroclaw/issues/6613) — 用户对弱配对码的安全担忧正式解决。

**渠道层基础设施统一**
- [#10748 [CLOSED] fix(channels): route every outbound HTTP client through the runtime proxy](https://github.com/zeroclaw-labs/zeroclaw/pull/10748) — 修复了部分渠道绕过运行时代理策略的问题，确保 Slack、Telegram、Matrix、Email 等所有渠道的出站 HTTP 流量遵守部署代理配置。
- [#10747 [CLOSED] refactor(channels): build every channel's transcription manager one way](https://github.com/zeroclaw-labs/zeroclaw/pull/10747) — 将 8 个原生渠道各自的转录管理器实现统一，消除了此前因代码漂移导致的 4 个同类 Bug（#9153、#10032、#10487、#10494）。

**多项 Issue 修复确认关闭**
- [#10603 OpenCode providers never send x-opencode-session](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — S1 级问题已关闭（修复见 #10604）。
- [#10232 Daemon diagnostics drop the underlying error chain](https://github.com/zeroclaw-labs/zeroclaw/issues/10232) — 守护进程错误链丢失问题已修复。
- [#10585 Log sink regression races migration tests](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)、[#10794 Windows nextest publish_contract failure](https://github.com/zeroclaw-labs/zeroclaw/issues/10794)、[#10087 memory-postgres tests in required CI](https://github.com/zeroclaw-labs/zeroclaw/issues/10087) — CI 与测试相关问题批量收敛。
- [#10588 提升 multimodal.max_image_size_mb 默认值至 20](https://github.com/zeroclaw-labs/zeroclaw/issues/10588)、[#10796 ZeroCode 聊天输入忽略 Delete 键](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)、[#10789 本地化 ZeroCode 守护进程启动诊断](https://github.com/zeroclaw-labs/zeroclaw/issues/10789)、[#10792 澄清 Windows reload-refusal 恢复](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) 等也一并关闭。

## 4. 社区热点

| 条目 | 类型 | 评论数 | 关注点 |
|---|---|---|---|
| [#10549 RFC: Simplify RFC voting by removing mandatory discussion windows](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | Issue（OPEN） | 10 | 社区对流程效率的诉求强烈，讨论最热 |
| [#10366 RFC: Clarify PR review evidence, freshness warnings, and author-action boundaries](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) | Issue（OPEN） | 8 | 高风险的流程改革 RFC，影响所有贡献者协作方式 |
| [#10603 OpenCode providers never send x-opencode-session](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | Issue（已关闭） | 3 👍3 | S1 级 Bug，修复后仍引发社区后续讨论 |

**热点分析**：两大 RFC(#10549、#10366) 与核心协作流程直接相关。前者要求取消强制讨论窗口、让 REVISE 状态及时终止当前快照，反映出贡献者希望加快决策节奏；后者聚焦 PR 审查证据与作者操作边界，回应了大型 PR（XL size）审核效率低、证据可追溯性不足的痛点。两者若落地，将显著改变项目贡献协作模式，值得持续关注。

## 5. Bug 与稳定性

**🔴 高危（S1 / P1）**

| Issue | 描述 | 状态 |
|---|---|---|
| [#10863 Telegram retries rejected voice updates indefinitely, blocking later messages](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) | Telegram 语音更新被拒绝后无限重试，阻塞后续消息投递，已引发生产事故 | 🆕 新开，需紧急处理 |
| [#10854 Literal image marker in tool output is promoted into malformed provider image](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | 工具输出中的文本 `[IMAGE:...]` 标记被误识别为真实图片并发送给 Provider，导致请求失败 | 🆕 新开，已有 follow-up 标记 |
| [#10857 ZeroCode attaches images to sessions whose model has no vision capability](https://github.com/zeroclaw-labs/zeroclaw/issues/10857) | ZeroCode 未检查模型视觉能力即附加图片，导致 Provider 返回 400 | 🆕 新开 |
| [#10603 OpenCode providers never send x-opencode-session](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | 影响 Go 模型和账号安全 | ✅ 已关闭（#10604 修复） |

**🟡 中危（S2 / P2）**

| Issue | 描述 | 状态 |
|---|---|---|
| [#10625 Internal `[media attachment]` placeholder delivered to users](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | 非视觉模型场景下，内部占位符被直接暴露给用户 | 待处理 |
| [#10842 Telegram reaction tool silently no-ops](https://github

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026-09-15

## 1. 今日速览

过去 24 小时项目整体变动较少：1 条 Issue 更新、2 条 PR 更新，无新版本 Release。v0.10.0 sprint 规划文档 PR #3379 已关闭，路线图从草案阶段推进到可执行设计阶段；但一个功能型 PR #3370 与一个含根因分析的 Bug Issue #3365 均被标记为 stale，说明维护响应速度有所放缓。整体评估：项目正处于迭代筹划期，规划文档有实质推进，但社区提交的 Review 和 Bug 修复需要尽快跟上。

## 2. 版本发布

本期无新版本发布。

## 3. 项目进展

**v0.10.0 sprint 计划文档落定**：PR #3379 已关闭，该 PR 将 `.todo.md` 草案细化成 `docs/design/v0.10.0-sprint.md` 设计文档，明确 Tracks 60–66 共 7 个实施单元，并给出了具体实施顺序：`60 → 65 → 61 → 62 → 63 → 64 → 66`，每个 Track 对应一个独立 PR。虽然此 PR 属于文档型变更，但它为 v0.10.0 的开发排期提供了实现级依据，项目下一阶段工作方向由此固化。链接：[#3379](https://github.com/sipeed/picoclaw/pull/3379)

## 4. 社区热点

今日讨论最集中的是 Issue #3365（评论 2，👍 1）。该 Issue 报告了 QQ Channel 适配器在特定依赖组合下完全

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 2026-09-15

## 1. 今日速览
项目活跃度**极高**（PR 更新 50 条，Issue 更新 6 条）。过去 24 小时内有 **38 个 PR 被合并/关闭**，属于一次集中的代码合并潮，主要涉及历史遗留 PR 的清理与核心 CLI/设置/渠道方向的修复落地。新产生 3 个待处理 Bug（含 1 个安全风险、1 个稳定性风险），当前开发重心聚焦于 **OpenCode 集成、持久化交接安全与核心数据库稳定性优化**。总体而言项目处于高强度的维护与功能打磨阶段，健康度良好但需警惕数据库锁与错误信息泄露隐患。

## 2. 版本发布
**无**（过去 24 小时无新版本 Release）。

## 3. 项目进展
今日关闭了大量积压的 PR（跨度从 #3090 至 #3487），标志着一次关键的代码清理与核心功能升级落地：

- **CLI 与设置体验重构**：合并了 `#3484 setup: keep pasted auth secrets out of argv`，修复了 OAuth token 粘贴到子进程命令行导致信息泄露的问题；合并 `#3486 feat(setup): expose the build-time preseed catalog (--catalog-preseeds)` 与 `#3487 feat(setup): accept a client timezone preseed (--tz)`，使无人值守自动化部署成为可能。
- **核心渠道/堆栈升级**：合并 `#3465 fix(channels): Chat SDK 4.29.0 -> 4.32.0 lockstep bump + keep Telegram "/" commands`，修复了 Telegram 链接含 `_` 或 `*` 时消息被丢弃的顽固 Bug。
- **强化卸载与安全**：合并 `#3483 fix: harden uninstall ownership and failure handling`，消除了卸载流程中的 TOCTOU（竞态）风险，防止误删被替换的目标文件。
- **Agent 编排能力增强**：合并 `#3396 feat: create agents from templates in chat` 及 `#3428 feat(slack-agent-flow): carry the template ref through Slack creation (re-port)`，首次支持终端用户通过聊天直接指定模板（如 `sales/sdr`）创建子代理，而不再局限于空模板手工编写。
- **针对 Telegram/WhatsApp 的体验优化**：合并了 `#3468`（WhatsApp Cloud 25 秒打字指示灯周期）与 `#3470/#3471`（修复 pnpm 的 `minimumReleaseAge` 门禁配置层级错误，避免拉取 3 天内发布的新包导致不稳定）。

这波合并使项目在 **安全合规性、CLI 可自动化能力和消息渠道稳定性** 上迈出了一大步。

## 4. 社区热点
- **[PR #3654] fix(onecli): NO_PROXY for host.docker.internal**（[链接](https://github.com/nanocoai/nanoclaw/pull/3654)）
  这是当前最受关注的**非合并状态** PR（08-29 创建，持续到 09-14 仍无更新），讨论焦点在于 OneCLI 网关激活时，代理变量破坏了宿主侧 MCP 服务器的 HTTP 连通性。评论区长期存在关于代理机制与 Docker 内宿主机访问冲突的讨论，核心诉求是**打通容器与宿主机的 MCP 服务发现**。该 PR 已长时间无人跟进，是社区潜在的“悬而未决”痛点。
- **[Issue #3814] Raw process/turn-error text can be delivered to a public channel**（[链接](https://github.com/nanocoai/nanoclaw/issues/3814)）
  新开 Issue，虽然暂时无评论，但涉及**严重的安全隐患**（错误信息越权泄露）。该问题直指 `poll-loop.ts` 中 `deliverErrorResult` 的缺陷，将容器子进程 `claude` 的原始崩溃文本直接投递到当前触发的频道——如果是公开频道，将暴露内部上下文。安全社区对此类 CWE-497 (Exposure of Sensitive System Information) 问题敏感度极高。

## 5. Bug 与稳定性
按严重程度排序（

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-15

## 1. 今日速览

项目在过去24小时活跃度较低：有1条新Issue和1条待合并的PR，无新版本发布，无PR合并或关闭。新Issue为每日自动化的测试失败分类报告，反映当前主要问题集中在模型质量而非基础设施；而PR #8077（MCP响应泄漏诊断修复）已存在9天仍未合并，是当前最值得关注的合并阻塞点。整体来看，项目处于正常维护节奏，未见紧急回归或批量关闭的迹象。

---

## 2. 版本发布

无。

---

## 3. 项目进展

今日无合并/关闭的PR，暂无已完成的功能或修复可直接记录。

值得关注的是 **PR #8077**（fix(mcp): classify response leak diagnostics）仍处于待合并状态。该PR由 @linhongyu510 提出，旨在：
- 将 `response_leak_blocked` 哨兵统一集中到 `ironclaw_host_api::http`，避免重复定义；
- 让MCP通道将该哨兵分类为MCP可见的原因，而非单纯地阻断泄漏，从而在保证安全性的同时提供更明确的诊断信息；
- 关闭Issue #8009（响应泄漏诊断分类问题）。

这属于MCP（Model Context Protocol）安全/诊断链路的精细化完善，合入后将为host端与MCP客户端提供更清晰的责任划分和错误定位能力。

- PR链接：https://github.com/nearai/ironclaw/pull/8077

---

## 4. 社区热点

当前社区动态不足以形成"热点"，仅两条活跃条目：

**#8100 Daily ironclaw failure taxonomy — 2026-09-14**（作者：@pranavraja99）
- 这是一个每日自动生成的失败分类报告，零评论、零点赞，表明它是机器产出的例行记录，而非社区讨论焦点。
- 链接：https://github.com/nearai/ironclaw/issues/8100

**#8077 fix(mcp): classify response leak diagnostics**（作者：@linhongyu510）
- 同样零评论，缺少维护者反馈，说明仍处于待review队列。
- 链接：https://github.com/nearai/ironclaw/pull/8077

两均条均无互动，社区讨论活跃度极低。

---

## 5. Bug 与稳定性

今日报告的问题主要来自 #8100 的测试失败分类：

- **officeqa 套件 43 个 non-pass 任务**：报告指出几乎所有失败均为**真实模型质量错误**，具体涉及 DeepSeek-V4-Flash 在导航/操作流程上的能力不足。这属于模型侧问题而非代码Bug，不产生代码修复诉求。
- 报告中未提及崩溃、回归、基础设施故障或安全问题。
- 严重程度评定：**低**（基于模型能力缺陷，不阻断项目交付）。

若将PR #8077关联的原始Issue #8009一并考虑，则存在一个已分类的 **MCP egress 泄漏诊断不明确**的问题，严重程度中等（影响可观测性），但已有PR覆盖。

- #8100 链接：https://github.com/nearai/ironclaw/issues/8100
- #8077（修复#8009）链接：https://github.com/nearai/ironclaw/pull/8077

---

## 6. 功能请求与路线图信号

今日无新的功能请求。

基于现有PR和Issue，可观察到的路线图信号：
- **MCP诊断可观测性增强**（#8077）：将泄漏阻断原因分类为MCP可见的独立诊断信息，属于MCP生产环境可观测性的长期投入方向。该PR若能合并，下一版本可能包含更精细的egress诊断能力。
- **自动化失败分类流水线**（#8100）：这本身就是项目持续集成质量的常规机制，说明团队在利用自动化方式跟踪模型质量退化，且未来可能将类似报告扩展到更多测试套件。

---

## 7. 用户反馈摘要

从现有数据中可提炼的有限反馈如下：

- **模型质量瓶颈凸显**：officeqa 43个非通过任务几乎全部是模型能力错误，反映用户在实际办公场景中遇到的瓶颈是模型逻辑/导航能力，而非工具链本身。
- **诊断信息需求**：PR #8077 的存在暗示MCP使用者（或开发者）需要更明确地获知"泄漏被阻断"的具体原因，原始的通用阻断消息不足以支撑平台开发者的排障需求。

暂无满意/不满意评价、使用场景细节或更多用户评论。

---

## 8. 待处理积压

以下条目值得维护者关注：

1. **PR #8077（fix(mcp): classify response leak diagnostics）**
   - 已存在9天（9月6日创建），更新停留于9月14日，零评论，处于**待review状态**。修复的#8009是诊断相关Issue，不应长期搁置，建议尽快安排review合并。
   - 链接：https://github.com/nearai/ironclaw/pull/8077

2. **#8100 Daily ironclaw failure taxonomy — 2026-09-14**
   - 虽为自动化Issue且无互动，但其中officeqa 43个非通过任务中近全部为模型质量问题，这连续多日出现将会影响基准测试可信度。建议关注DeepSeek-V4-Flash在officeqa上的持续表现，评估是否需要在模型版本层面标记已知问题。
   - 链接：https://github.com/nearai/ironclaw/issues/8100

---

**总体评估**：项目健康度良好，无紧急风险。当前瓶颈在于MCP诊断修复PR长期未合并，建议维护者优先推进。模型质量维度（DeepSeek-V4-Flash在officeqa上的表现）需要连续多日数据观察，以判断是否为退化趋势。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报 — 2026-09-15

## 今日速览

过去 24 小时 LobsterAI 共产生 25 次 GitHub 更新，其中 PR 更新为主（24 条），Issue 仅 1 条。值得注意的是，PR 中多数为 Dependabot 自动依赖升级机器人提交，人工参与的核心 PR 集中在 OpenClaw 运行时升级与网关修复方向。无新版本 Release 发布。项目当前处于依赖例行维护与升级适配期，人工代码提交活跃度中等偏低，但上游升级驱动的改动密度较高，整体保持健康推进节奏。此外，一个与 IM 消息静默丢弃直接相关的核心 Bug（#1035）正在被标记为 stale，需要警惕其被自动关闭的风险。

## 项目进展

今日合并/关闭的 10 条 PR 中，**1 条功能性 PR 和 2 条修复类 PR 值得重点关注**，其余为依赖升级例行合并：

- **[已合并] feat: upgrade OpenClaw to v2026.8.1 and improve artifact workflows**（[#2665](https://github.com/netease-youdao/LobsterAI/pull/2665)）
  核心改动：将内置 OpenClaw 运行时从 v2026.6.1 升级至 v2026.8.1，同时将 Electron 从 40.2.1 升级至 43.5.0，并适配了运行时集成与现有用户状态迁移。还改进了 Markdown 编辑、Library 组织和内置浏览器体验。这是今日最重要的功能性推进，意味着项目对上游 AI 运行时能力进行了大幅同步，并为后续 AI agent 功能打下了基础。

- **[已合并] fix(dev): exclude generated directories from Vite watching**（[#2663](https://github.com/netease-youdao/LobsterAI/pull/2663)）
  修复了开发启动时因临时目录包含循环 Windows 符号链接而导致的超时/崩溃问题，将 `.work`、`artifacts`、`dist-electron` 从 Vite watcher 中排除。对 Windows 开发者体验有明显改善。

- 其余关闭的 PR 为 Dependabot 自动更新，包括 mermaid 12.0.0、react-dom 19.2.8、vite 8.3.0、trufflehog 3.97.1、better-sqlite3 13.0.3 等依赖的版本升级，均已合并，排除了项目依赖更新积压。

## 社区热点

今日讨论最集中的 Issue 是 **[#1035 [OPEN] fix(im): NimGateway 重连后消息去重缓存未清空，导致正常消息被静默丢弃](https://github.com/netease-youdao/LobsterAI/issues/1035)**（1 条评论）。

该 Issue 由 @MaoQianTu 于 3 月 30 日报告，昨日（9 月 14 日）被标记为 stale。其核心内容是：`src/main/im/nimGateway.ts` 中的 `processedMessages` 去重缓存被声明为模块级全局变量，导致所有 `NimGateway` 实例共享同一状态。当网关**重连**后，旧的会话 ID 仍残留在缓存中，若 5 分钟 TTL 未过期，重连后的正常消息会被误判为重复消息而被静默丢弃，用户无感知。

这一 Issue 的核心诉求在于**可靠性和消息可恢复性**——即时通讯场景下消息丢失是不可接受的，且"静默丢弃"使问题更难被用户察觉和反馈，属于典型的高影响低可见性 Bug。

## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| **高** | [#1035](https://github.com/netease-youdao/LobsterAI/issues/1035) | NimGateway 重连后，模块级消息去重缓存未清空，导致正常消息被静默丢弃 | OPEN，已被 stale 标记，**暂无 fix PR** |
| 中 | [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) | OpenClaw v2026.8.1 升级后，POPO 2.1.13 SDK 同步 require 与 host ESM import 产生 `ERR_REQUIRE_ESM_RACE_CONDITION`，导致插件加载后 POPO 账号监听器丢失 | **已有 fix PR**（OPEN），该 PR 同时带 `area: docs` 标签 |
| 中低 | [#2663](https://github.com/netease-youdao/LobsterAI/pull/2663) | 开发环境 Vite watcher 因循环 Windows 符号链接崩溃/超时 | **已合并**，修复完成 |

**分析**：高严重度的 #1035 是当前项目稳定性的主要隐患，且正在被 stale 流程处理中，存在被系统自动关闭而无人跟进的风险。建议维护者优先介入并分配修复人。中危的 POPO SDK 加载竞态已有对应 PR 在推进，闭环路径清晰。

## 功能请求与路线图信号

今日未出现典型的功能请求类 Issue，但可以从 PR 合并情况推断项目路线图信号：

1. **AI 运行时同步升级**（[#2665](https://github.com/netease-youdao/LobsterAI/pull/2665)）：OpenClaw 和 Electron 的大版本升级是今日最核心的变化。这表明项目将持续跟随上游 AI 运行时能力，下一版本大概率会引入 OpenClaw v2026.8.1 带来的模型接入增强、agent 编排能力改进以及 Electron 43 的底层优化。

2. **依赖大版本跳跃是潜在路线图铺垫**：今日新开的 #2672（mermaid 10→12）、#2671（react-dom 18→19.3）等均是将主依赖直接跃升至下一个大版本，虽为自动化提交，但也侧面反映了项目对前端依赖刷新保持开放态度，可能伴随 UI/编辑器相关功能的现代化重构。

3. **构建与安全流水线升级**：新开 PR #2667 和 #2666 分别将 trufflehog 升级到 3.97.4、actions/labeler 升级到 v7，体现出 CI/CD 链路和安全扫描工具的持续维护节奏，是项目工程化健康度的重要指标。

## 用户反馈摘要

- **消息可靠性痛点**（来自 [#1035](https://github.com/netease-youdao/LobsterAI/issues/1035)）：用户在网关重连后出现消息无感知丢失。核心痛点是"静默"二字——没有报错、没有重发机制、用户完全无感知，只有事后对账才能发现问题。这种问题对 IM 场景的信任伤害极大。
- **开发环境体验反馈**（来自 [#2663](https://github.com/netease-youdao/LobsterAI/pull/2663) 的合入）：合并开发者提交排除 Vite 监视目录的修复，表明 Windows 平台上开发体验不佳，临时目录中的符号链接循环会导致长时间卡死或崩溃，影响了开发效率。
- **升级适配阵痛**（来自 [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664)）：OpenClaw 升级后引入的 ESM 竞态问题导致 POPO 账号监听器失效，这类问题虽然只影响插件加载阶段，但可能导致用户在重启后某些账号能力静默失效，升级验证需要更完整的回归测试覆盖。

## 待处理积压

以下为值得维护者重点关注的长期未处理项：

| 类型 | 编号 | 标题 | 关注原因 |
|------|------|------|----------|
| Issue | [#1035](https://github.com/netease-youdao/LobsterAI/issues/1035) | fix(im): NimGateway 重连后消息去重缓存未清空 | 高严重度消息丢失 Bug，已 stale 标记，需紧急处理 |
| PR | [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) | chore(deps-dev): bump the electron group across 1 directory with 2 updates | 自 4 月 2 日创建至今 5 个月仍在 OPEN 状态，Electron 43.5.0→44.3.0 升级未能落地，可能在等待 #2665 的 Electron 升级先合入 |
| PR | [#2460](https://github.com/netease-youdao/LobsterAI/pull/2460) | chore(deps-dev): bump rimraf from 5.0.10 to 6.1.3 | 8 月 10 日创建，超过一个月未合并，rimraf 6.x 包含破坏性变更，需要维护者确认兼容性 |
| PR | [#2461](https://github.com/netease-youdao/LobsterAI/pull/2461) | chore(deps-dev): bump eslint-plugin-react-hooks from 5.2.0 to 7.1.1 | 已被 stale 标记但仍 OPEN，react-hooks 插件大版本升级可能与现有代码风格冲突，值得明确关闭或推进 |
| PR | [#2459](https://github.com/netease-youdao/LobsterAI/pull/2459) | chore(deps): bump @nodesecure/js-x-ray from 14.3.0 to 16.0.0 | 8 月 10 日创建，被 stale 标记，安全扫描工具的大版本升级应尽快处理以保持供应链安全 |

---

**总结**：LobsterAI 今日整体处于依赖升级与 OpenClaw 运行时适配的繁忙期，核心功能 PR 的合入将项目推向 v2026.8.1 对应的新能力基线。但 #1035 的高严重度消息丢失问题被 stale 标记，是当前项目健康度风险中最需要关注的一点，建议维护团队在 30 天内给出修复方案或处置决定。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 | 2026-09-15

## 1. 今日速览
过去24小时项目活跃度较低：无Issue更新、无新版本发布，仅有1个待合并PR（#1269）在途。该PR针对OAuth PKCE测试的竞态问题进行修复，属于测试基础设施层的稳定性加固。整体来看，项目处于平稳维护期，无用户侧回归风险，但外部社区参与度明显偏低。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日无PR被合并或关闭，代码库暂无功能变更落地。待合并PR #1269（[链接](https://github.com/moltis-org/moltis/pull/1269)）若成功合入，将修复OAuth PKCE成功/断开连接测试的时序竞态，提升CI的稳定性和可信度，为后续认证模块的改动提供更可靠的验证基线。项目整体今日处于“单元推进、零合入”的状态。

## 4. 社区热点
今日无高互动Issue/PR。#1269（[链接](https://github.com/moltis-org/moltis/pull/1269)）为唯一活跃PR，目前暂无评论和反应，但其修复的CI失败（[Actions日志](https://github.com/moltis-org/moltis/actions/runs/32917698826/jobs/98024870973)）映射出维护团队近期对认证流程测试可靠性的专注。由于该PR为内部测试改进，社区参与度较低，未观察到外部用户驱动的讨论热点。

## 5. Bug 与稳定性
今日无用户报告的生产环境Bug。唯一稳定性问题是CI测试`moltis-064r`失败，根因是PKCE成功/断开连接测试依赖立即关闭的回调弹窗的页面/关闭事件，存在时序竞态。严重程度：**低**（仅影响测试稳定性，不涉及运行时功能）。已有对应修复PR #1269（[链接](https://github.com/moltis-org/moltis/pull/1269)），但尚未合并。

## 6. 功能请求与路线图信号
今日无新功能请求Issue。从#1269（[链接](https://github.com/moltis-org/moltis/pull/1269)）的改动策略（等待持久的主页面身份验证状态）推断，项目短期重点在于OAuth流程的测试健壮性，而非新增用户功能。目前未出现明确的路线图信号，下一版本可能以CI/测试稳定性改进为主。

## 7. 用户反馈摘要
今日无Issue或PR评论，无法从数据中提炼出用户的真实痛点或使用反馈。项目外部互动处于静默状态，建议持续关注未来几天的社区动态。

## 8. 待处理积压
当前唯一积压项为PR #1269（[链接](https://github.com/moltis-org/moltis/pull/1269)），创建于2026-09-15，尚在待合并状态。由于该PR与CI测试失败直接相关，建议维护者尽快Review并合入，以避免后续PR因同一问题而产生噪音。除此之外，目前无长期未响应的Issue或PR。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-09-15）

## 📊 今日速览

CoPaw 今日保持高活跃度，过去 24 小时内共产生 45 条 Issue 更新（新开/活跃 32 条，关闭 13 条）和 50 条 PR 更新（待合并 39 条，已合并/关闭 11 条）。当前无新版本发布。社区反馈集中在**记忆丢失/遗忘、会话丢失、模型配置丢失、定时任务无输出**等稳定性问题上，同时有 4 个高质量 PR 处于待合并状态，涉及 ACP 协议权限选择、MCP Java 错误信封识别、Docker 运行时对齐等方向。总体健康度中等偏上——社区反馈非常活跃，但稳定性类问题积压较多，需重点关注。

---

## 📦 版本发布

今日无新版本发布。

---

## 🚀 项目进展

今日未展示具体合并/关闭的 PR 明细（11 条已合并/关闭），但从活跃 PR 和关闭 Issue 中可以观察到以下推进方向：

### 已关闭 Issue 反映的修复进展
- **[已修复] 读取大型 Excel 文件导致 Agent 被强制中断**（[#4354](https://github.com/agentscope-ai/QwenPaw/issues/4354)）— 大文件读取稳定性问题已解决
- **[已修复] auto_memory_interval 写入记忆文件但不同步向量索引**（[#4220](https://github.com/agentscope-ai/QwenPaw/issues/4220)）— 记忆同步问题已闭环
- **[已修复] daily_paper 处理含代理字符 PDF 时崩溃**（[#7199](https://github.com/agentscope-ai/QwenPaw/issues/7199)）— 特殊字符编码错误已解决
- **[已关闭] 任务在不同时点重复输出 3 次**（[#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)）— 判定为 invalid

### 待合并 PR 反映的板块进展
#### UI / Console 体验优化（多条并行）
- `feat(console)`: 将聊天文件抽屉移至右侧（[#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)）、通过 `send_file_to_user` 发送的文件显示在响应工件列表中（[#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750)）、侧边栏折叠状态跨刷新持久化（[#7681](https://github.com/agentscope-ai/QwenPaw/pull/7681)）
- `fix(console)`: SettingsCenter 使用语义化 token（[#7682](https://github.com/agentscope-ai/QwenPaw/pull/7682)）、支持 vi/pt-BR 语言选择（[#7752](https://github.com/agentscope-ai/QwenPaw/pull/7752)）、恢复 PawPort 入口（[#7770](https://github.com/agentscope-ai/QwenPaw/pull/7770)）

#### 核心架构与协议兼容性
- `fix(acp)`: 按协议 kind 选择权限选项，修复 trusted 会话回退到交互式提示的问题（[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)，对应 Issue [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726)）
- `fix(mcp)`: 识别 Java jsonRpcError 信封（[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)）、保留解码后的 HTTP 错误响应（[#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)，修复 #7716）
- `fix(providers)`: 报告机器人验证页面和真实 HTTP 状态码（[#7684](https://github.com/agentscope-ai/QwenPaw/pull/7684)，对应 #7587)

#### 安全与基础设施
- `fix(desktop)`: 本地 API 请求在原生宿主中增加认证（[#7769](https://github.com/agentscope-ai/QwenPaw/pull/7769)）
- `fix(hub)`: 审计登录尝试和被拒绝的运行时创建（[#7683](https://github.com/agentscope-ai/QwenPaw/pull/7683)）
- `fix(docker)`: 应用 Python 运行时与桌面端对齐（[#7751](https://github.com/agentscope-ai/QwenPaw/pull/7751)）

#### 功能扩展
- `feat(chat)`: 适配 AgentScopeRuntimeWebUI 1.2 并稳定队列（[#7382](https://github.com/agentscope-ai/QwenPaw/pull/7382)）
- `feat(qwenpaw-data)`: QwenPaw-Data app 0.3.0 集成（[#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637)）
- `feat(context)`: 改进视觉压缩（[#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)）
- `fix(tools)`: glob 搜索支持花括号展开（[#7761](https://github.com/agentscope-ai/QwenPaw/pull/7761)）

---

## 🔥 社区热点

### 最受关注 Issue TOP 5（按评论数）

1. **定时任务经常无输出，结果被折叠在步骤或 thinking 中**（[#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)，6 评论，@tina0501853）
   用户反馈定时任务频繁无输出，正常对话中也偶尔出现结果被折叠在 thinking 中或干脆没有结果的情况。反映了**任务输出可靠性**的核心诉求。

2. **spawn subAgent 任务全部 timeout 失败**（[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)，6 评论，@xiaohushi512）
   Windows 2.2.0 版本中，所有涉及 spawn subAgent 的任务均以 timeout 失败，即使将 timeout 参数调至很长也无效。**子 Agent 是高级编排的关键能力，此问题严重阻塞复杂任务链路**。

3. **总是记不住，还是会遗忘**（[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)，6 评论，@xiaohushi512）
   用户反复强调工作目录规则，但 Agent 仍会遗忘并跑到错误路径开发，导致部署时源码被覆盖。**记忆系统在长周期任务中的一致性是核心痛点**。

4. **模型故障切换具体在哪里配置？**（[#7749](https://github.com/agentscope-ai/QwenPaw/issues/7749)，4 评论，@HZJprince）
   用户已更新到 2.2.1，但在智能体模型配置界面找不到故障切换的配置入口，希望提供截图说明。**文档/产品引导不足的问题**。

5. **内存耗尽由三条路径复合导致**（[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)，4 评论，@Nobodyanonymou-s）
   深入的技术分析指出容器内存耗尽不是单一 bug，而是**无界流缓冲区、keep-alive 实例堆积、doom-loop 门卫绕过**三条路径叠加的结果。社区提供了可控复现和最小修复方案，是高质量的技术贡献。

---

## 🐛 Bug 与稳定性

按严重程度排序：

### 🔴 严重（核心功能故障 / 安全风险）

1. **内存耗尽三路径复合**（[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)，v2.2.0，OPEN）
   无界流缓冲区 + keep-alive 实例堆积 + doom-loop 门卫绕过，导致容器以 ~1MB/s 速度持续增长直至 OOM。关联长期内存增长 Issue [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222)（运行 2 天内存涨至 20.7GB）。**暂无关联 fix PR**，但反馈中包含 minial fixes 建议。

2. **spawn subAgent 全部任务 timeout**（[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)，win2.2.0，OPEN）
   用户明确表示所有 spawn subAgent 处理均失败，超时设置无效。**暂无关联 fix PR**。

3. **Agent 切换导致历史会话不可点击、lastChatIdByAgent 被删**（[#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745)，2.2.1-beta.2，OPEN）
   控制台每次切换 Agent 时都会触发会话簿记缺陷，历史会话无法点击。**暂无关联 fix PR**。

4. **kimi-code 越界写入绕过工作目录硬限制**（[#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727)，2.2.0，OPEN）
   `_paths` 提取不识别 kimi 工具调用中的路径字段，导致写文件到工作区外的操作未被拦截。**潜在安全风险**，暂无关联系 PR。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时内 ZeptoClaw 项目活跃度较低，但有一项重要收尾工作完成：**CI 安全审计（rustsec audit）的权限问题已通过配对 Issue #676 和 PR #677 全部闭环**。1 条 Issue 关闭（#676），1 条 PR 合并/关闭（#677），无新版本发布、无新开 Issue/PR。整体而言，项目处于平稳维护节奏，核心仓库健康度良好，未出现任何需要紧急处理的回归或安全事件。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

### 合并/关闭的 PR

| PR | 标题 | 状态 | 要点 |
|----|------|------|------|
| [#677](https://github.com/qhkm/zeptoclaw/pull/677) | fix(ci): allow rustsec audit check reporting | 已关闭 | 修复 GitHub Actions 安全审计任务因缺少 `checks: write` 权限而无法上报审计结果的问题 |

**解析**：PR #677 是今日项目进展的核心。此前 `rustsec/audit-check` 在执行安全审计时虽然成功发现了"无漏洞"的结论，但由于 workflow 未向该 job 授予 `checks: write` 权限，导致 action 在创建 check run 阶段失败。修复方案遵循**最小权限原则**，仅为审计 job 单独授予 `contents: read` 和 `checks: write`，不影响其他 workflow。这一改动直接提升了 CI 管线的可靠性，使安全审计结果能够稳定回传至 PR/commit 状态，对项目长期质量保障有正向意义。

---

## 4. 社区热点

过去 24 小时内**无活跃讨论**。唯一值得关注的 Issue #676 和 PR #677 均为 @qhkm 自提自修，评论数为 0，无社区讨论热度。

**说明**：项目社区互动较少，但维护者对 CI 异常响应迅速，自驱动修复能力较强。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 说明 | 修复状态 |
|----------|-------|------|----------|
| 中 | [#676](https://github.com/qhkm/zeptoclaw/issues/676) | CI 中 `Security audit` job 执行 `rustsec/audit-check` 时，因缺少 `checks: write` 权限，在 push 运行中审计成功但创建 check run 失败，报错 `Resource not accessible by i...` | 已修复（PR #677 已关闭） |

**分析**：此问题属于 CI 管线稳定性缺陷而非产品代码 Bug，未影响运行时功能或用户数据安全。但该问题会导致安全审计结果无法有效展示，间接影响供应链安全监控能力。修复 PR 已随 Issue 同步关闭，问题已闭环。

---

## 6. 功能请求与路线图信号

无新功能请求。从 PR #677 的修复思路来看，维护者对 CI 权限配置的精细化治理持积极态度，未来可能会继续收敛其他 workflow job 的权限范围，值得关注。

---

## 7. 用户反馈摘要

过去 24 小时内无用户评论或新 Issue 反馈，因此**无法提炼直接的用户反馈**。唯一信息来自 Issue #676 的问题描述，反映了维护者对 CI 安全审计可观测性的内部诉求——即"即使没有漏洞，审计结果也应被正常记录和展示"这一工程需求。

---

## 8. 待处理积压

当前无长期未响应的 Issue 或 PR。过去 24 小时内关闭的 #676/#677 均为 4 天内创建的近期事项，响应及时，无积压风险。

---

**补充说明**：本日报基于 2026-09-15 抓取的 GitHub 数据生成，样本窗口较短，部分统计（如评论数、点赞数）存在数据缺失或延迟可能。整体项目活跃度评分：⭐⭐（1-5 星，基于事件数量与响应速度综合评估）。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*