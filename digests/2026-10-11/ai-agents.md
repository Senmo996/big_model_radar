# OpenClaw 生态日报 2026-10-11

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-11 02:45 UTC

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

# OpenClaw 项目动态日报 — 2026-10-11

> 数据来源：github.com/openclaw/openclaw（过去 24 小时）

---

## 1. 今日速览

过去 24 小时项目保持**极高活跃度**：共 500 条 Issue 更新（新开/活跃 396，关闭 104）、500 条 PR 更新（待合并 392，已合并/关闭 108），并发布 v2026.10.1。**稳定性是当前主线**——P0 级问题多达 9 个且多数尚无修复 PR，集中在 SQLite WAL 无限增长（#143524，118 条评论）、write 工具导致数据丢失（#40001）、Gateway 崩溃/挂起（#160521/#167652/#164396）、更新流程永久锁死（#167771）等。好消息是今日有 3 个 P0 级问题被关闭（#168307/#162047/#164113），且 #168755 修复了 Gateway 主线程同步读 SQLite 阻塞问题，说明维护者正在密集处理。社区对 Windows 平台稳定性、消息丢失、数据安全三类问题反馈最强烈。

---

## 2. 版本发布

### v2026.10.1（10月11日发布）

**核心主题：Sessions 与 Memory 连续性加固**

- **Sessions**：跨 registry 变更保留 usage；从远程工作区交付 worker 附件；阻止队列取消（queued cancellations）和 transcript aliases 阻塞进行中的 turn；保持 continuation signatures 对齐。
- **Memory**：迁移 embedding caches。

⚠️ **迁移注意**：本次发布涉及 embedding cache 迁移，升级后首次启动可能触发缓存重建，属预期行为。未标注破坏性变更，建议升级前备份 `~/.openclaw/agents/*/agent/` 下的数据库文件。

---

## 3. 项目进展

### 已合并/关闭的重要 PR

| PR | 说明 | 价值 |
|---|---|---|
| [#168755](https://github.com/openclaw/openclaw/pull/168755) `fix(gateway): prepare agent sessions from worker reads` | 将 Agents API 的 SQLite 同步读取从 Gateway 主线程移出，避免阻塞所有客户端 | 直接缓解主线程阻塞类问题（关联 #160959/#157617 系列） |
| [#150200](https://github.com/openclaw/openclaw/pull/150200) `fix(exec): avoid truncated verdicts from reasoning reviewers` | 给 reasoning 审核模型自动分配 bounded thinking allowance，防止 1024-token 上限截断 JSON 审核判定 | 修复 exec 审批误判为人工介入的问题 |

### 已关闭的 P0 问题（今日清理）

- [#168307](https://github.com/openclaw/openclaw/issues/168307) Gateway 2026.9.9 Windows 单核 CPU 空转 6+ 小时（P0，已关闭）
- [#162047](https://github.com/openclaw/openclaw/issues/162047) Windows 2026.9.7 升级 Doctor 耗时 35 分钟+（P0，已关闭）
- [#164113](https://github.com/openclaw/openclaw/issues/164113) 无特权 LXC 容器中 FICLONE EPERM 导致升级失败（P0，已关闭）

### 值得关注的在途 PR

- [#168587](https://github.com/openclaw/openclaw/pull/168587) 修复强制 Node 关闭时命令挂起问题，移除 V8 编译器 blanket workaround（对应 #163788）
- [#168401](https://github.com/openclaw/openclaw/pull/168401) ChatGPT 登录会话服务端压缩（remote compaction V2），消除客户端侧 0 缓存 token 的重复摘要请求
- [#168772](https://github.com/openclaw/openclaw/pull/168772) Cron receipt custody 重构（worker-owned cron 系列的 2a PR），移除调度器写操作的序列化瓶颈
- [#168778](https://github.com/openclaw/openclaw/pull/168778) 修复 WhatsApp 最终回复在无关 reload 后消失的问题

**整体判断**：项目在"去 Lit 化迁移至 Solid 2"（#

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向对比分析报告（2026-10-11）

## 1. 生态全景

当前个人 AI 助手/自主智能体生态正处于**高速分化与平台化并行**的阶段：以 OpenClaw 为核心的基础平台保持极高迭代密度，单日 Issue/PR 更新均超 500 条，并发布 v2026.10.1 版本，主攻 Sessions/Memory 连续性和稳定性；NanoBot、LobsterAI、CoPaw、Zeroclaw 等则围绕渠道接入、办公集成、前端稳定性和安全隔离各占生态位，形成“核心平台 + 垂直扩展”的格局。社区共同诉求集中在**稳定性与数据安全、多消息渠道信任边界、工具调用安全、模型/Provider 兼容性**四大方向。整体来看，项目正在从“功能叠加”转向“质量巩固”，大版本前重构与安全加固成为高频动作，而浏览器自动化、Computer Use 等自主操作能力已从路线图逐步进入落地阶段。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 396，关闭 104） | 500（待合并 392，合并/关闭 108） | **v2026.10.1** | 极高活跃；平台级迭代，P0 问题集中但处理积极 |
| **NanoBot** | 3（新开 1，关闭 2） | 67（合并/关闭 38，待合并 29） | 无 | 健康良好；功能迭代与稳定性加固并行 |
| **Zeroclaw** | 13（活跃/新开 11，关闭 2） | 50（待合并 39，合并/关闭 11） | 无 | 高活跃但合并偏慢；大版本前整合期，安全修复关键 |
| **PicoClaw** | 2（活跃/新开 2） | 2（关闭 2） | 无 | 中等；新功能探索与遗留问题清理并行，有 stale 风险 |
| **NanoClaw** | 0 | 6（合并 1，

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## NanoBot 项目日报 — 2026-10-11

### 1. 今日速览

过去 24 小时内，NanoBot 项目保持高度活跃：共更新 3 个 Issue（1 个新开、2 个关闭），PR 活动量显著（67 条更新，其中 38 条已合并/关闭、29 条待合并）。虽然暂无新版本发布，但 WebUI/Provider 设置体验、Telegram 媒体分类修复以及工具调用安全加固等多条 PR 进入合并或待合并状态，表明项目正处于功能迭代与稳定性加固并行的阶段。总体来看，项目健康度良好，维护者响应及时，社区贡献活跃。

---

### 2. 版本发布

无新版本发布（过去 24 小时 Release 数量为 0），此部分略过。

---

### 3. 项目进展

今日合并/关闭的 PR 数量达 38 条，其中较重要的进展集中在 WebUI 体验、Telegram 兼容性修复和内部机制优化：

- **[#6145 [已合并] feat(webui): improve model and provider settings UX**](https://github.com/HKUDS/nanobot/pull/6145) — 模型与提供商设置改为可搜索模型字段，引入加载反馈、共享目录结果与显式重试操作；提供商选择与高级请求设置更易键盘操作。该 PR 可独立合并，目标为 `main` 分支。
- **[#6144 [已合并] fix(webui): clarify Chinese temporary chat tooltip**](https://github.com/HKUDS/nanobot/pull/6144) — 修正简体/繁体中文临时聊天提示文案，将“关页”改为“关闭页面”并明确模型提供商，使说明更自然且控制在 20 字以内。
- **[#4819 [已合并] fix(memory): replace WeakValueDictionary with plain dict for consolidation locks**](https://github.com/HKUDS/nanobot/pull/4819) — 将会话合并锁从 `WeakValueDictionary` 改为普通 `dict`，避免锁对象被垃圾回收导致身份不稳定，修复潜在的偶发并发问题。
- **[#6149 [待合并] fix(telegram): classify remote media URLs by path extension**](https://github.com/HKUDS/nanobot/pull/6149) — 修复 `_get_media_type()` 从带 query string 的 URL（如 `card.jpg?width=672`）中错误提取扩展名的问题，使图片/视频被误判为文档的情况得到纠正。

此外，多条新功能 PR 进入待合并队列（详见第 6 节），涵盖新渠道接入、Provider 扩展和 WebUI 增强。整体项目正朝更完善的设置管理、更广的渠道与提供商覆盖方向推进。

---

### 4. 社区热点

今日讨论最集中的是两个已关闭/活跃的 Issue，均涉及实际问题且已有关联修复方案：

- **[#6123 [OPEN] Telegram: classify remote media URLs with query strings by path extension](https://github.com/HKUDS/nanobot/issues/6123)** — 由 @gianfrancodemarco 报告，2 条评论。Telegram 渠道从完整 URL 推断媒体类型时，扩展名变为 `jpg?width=672`，导致图片被当作文档处理。该问题触发了 PR [#6149](https://github.com/HKUDS/nanobot/pull/6149) 的修复，社区反馈与代码修复形成良好闭环。
- **[#1739 [CLOSED] Bug: Multiple instances on Windows via NANOBOT_HOME causes conflict / ignored configuration](https://github.com/HKUDS/nanobot/issues/1739)** — 由 @tobicon 于 3 月报告，今日关闭。Windows 下 `NANOBOT_HOME` 被忽略导致多实例冲突，经过长时间讨论后终于收尾。该问题暴露了 Windows 环境下环境变量处理与文档说明的不足。

PR 方面，[#6152 WhatsApp Agent Platform 渠道](https://github.com/HKUDS/nanobot/pull/6152) 与 [#6147 工具调用安全加固](https://github.com/HKUDS/nanobot/pull/6147) 获得较多关注，前者满足用户连接 WhatsApp 官方 API 的诉求，后者修复了潜在的提示注入级安全问题。

---

### 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| **高（安全）** | [#6147 [PR] fix(providers): tighten tool calls and compatibility fallbacks](https://github.com/HKUDS/nanobot/pull/6147) | 助手文本中的 `<tool_call>` 标记可能被当作真实工具调用执行（含引号示例），存在提示注入风险。移除 #4662 引入的明文提取逻辑，改用 API 结构化字段 | 待合并，P1 优先级 |
| **中（功能回归）** | [#6123 [Issue]](https://github.com/HKUDS/nanobot/issues/6123) / [#6149 [PR]](https://github.com/HKUDS/nanobot/pull/6149) | Telegram 将从带 query string 的 URL 提取的扩展名误判，导致图片/视频被当作文档 | Issue 开放，修复 PR 已提交 |
| **中（配置）** | [#1739 [Issue]](https://github.com/HKUDS/nanobot/issues/1739) | Windows 下 `NANOBOT_HOME` 环境变量被忽略，多实例运行时配置冲突 | 已关闭（解决） |
| **低（API 行为）** | [#6122 [Issue] DeepSeek: reasoning_effort="minimal" sends contradictory thinking controls](https://github.com/HKUDS/nanobot/issues/6122) | `reasoning_effort="minimal"` 同时发送 `thinking.type="disabled"`，与 DeepSeek 推理模式文档矛盾 | 已关闭（解决） |

---

### 6. 功能请求与路线图信号

今日有多项新功能请求进入待合并队列，反映社区对扩展性与可配置性的强烈需求：

- **[#6152 [NEW] feat(channels): add WhatsApp Agent Platform channel](https://github.com/HKUDS/nanobot/pull/6152)** — 接入 WhatsApp 官方 Agent Platform API，基于 `api.whatsapp.com/agent/v1`，满足用户通过 WhatsApp 使用 nanobot 的诉求。
- **[#6148 [NEW] feat(settings): add removable provider connections](https://github.com/HKUDS/nanobot/pull/6148)** — 允许用户删除已添加的 Provider 连接并持久化，解决现有配置重载后“空默认值重现”的问题。依赖 #6145，与设置体验优化一脉相承。
- **[#61150 [NEW] feat(webui): simplify local login and network access](https://github.com/HKUDS/nanobot/pull/6150)** — 在自动打开浏览器失败（如 WSL）时，launcher 直接打印带认证信息的完整登录链接，简化本地登录流程。
- **[#6091 [暂停] feat(apps): add managed computer use with Cua Driver](https://github.com/HKUDS/nanobot/pull/6091)** — 添加受管理的计算机使用能力（Cua Driver），因维护者要求暂停，作为草稿保留。
- **[#5915](https://github.com/HKUDS/nanobot/pull/5915)、[#5666](https://github.com/HKUDS/nanobot/pull/5666)** — 新增 Cheaper Inference、aimlapi.com 等 OpenAI 兼容网关 Provider，反映社区对聚合服务商的支持需求。
- **[#5776 [NEW] feat(webui): add search to shared ProviderPicker](https://github.com/HKUDS/nanobot/pull/5776)** — 为共享供应商选择器添加搜索过滤，改善模型/搜索/转写等设置的可用性。
- **[#5930 [NEW] feat(feishu): allow bot-to-bot messages in groups](https://github.com/HKUDS/nanobot/pull/5930)** — 修复飞书群聊中机器人互相 @ 时消息被丢弃的问题，并支持 allowlist 与跳数限制。
- **[#6068](https://github.com/HKUDS/nanobot/pull/6068)、[#6014](https://github.com/HKUDS/nanobot/pull/6014)** — 新增 FXMacroData、Keenable 等 MCP 预设，扩展 Apps 可接入的外部数据源。
- **[#5537](https://github.com/HKUDS/nanobot/pull/5537)、[#5405](https://github.com/HKUDS/nanobot/pull/5405)** — 分别提议持久化会话焦点（`my` 工具）以及支持仅手动调用的技能模式（`disable-model-invocation: true`），均带有 `conflict` 标签，需维护者处理冲突后合入。

以上功能若被纳入，下一版本预计将显著增强渠道兼容性、Provider 灵活性与 WebUI 可用性。

---

### 7. 用户反馈摘要

从今日活跃的 Issue 评论中可以提炼出以下真实用户反馈：

- **Windows 多实例用户 @tobicon（[#1739](https://github.com/HKUDS/nanobot/issues/1739)）**：遵循文档使用 `set NANOBOT_HOME=...` 运行多个实例时，环境变量未生效，导致 Telegram 渠道冲突。该问题从 3 月持续到 10 月才关闭，反映 Windows 环境下的配置文档与实际行为存在偏差，此类平台差异值得维护者后续注意。
- **Telegram 媒体处理用户 @gianfrancodemarco（[#6123](https://github.com/HKUDS/nanobot/issues/6123)）**：使用 Scryfall 等 CDN 上的图片 URL（带 query string）时，nanobot 将图片当作文档发送，影响连续图片展示体验。用户对 URL 解析细节的预期是：按路径末尾的实际扩展名判断媒体类型。
- **DeepSeek 用户 @chengyongru（[#6122](https://github.com/HKUDS/nanobot/issues/6122)）**：指出 `reasoning_effort="minimal"` 与 `thinking.type="disabled"` 同时发送的矛盾行为，说明用户对推理模型的深度配置有细粒度控制需求，且关注官方文档的一致性。

整体来看，用户对配置精度、平台兼容性和媒体处理的正确性有较高期待，同时愿意主动报告细节问题并等待修复。

---

### 8. 待处理积压

以下为长期未响应或等待维护者处理的重要 Issue/PR，建议优先关注：

- **[#5405 [OPEN] feat(skills): support manual-only invocation](https://github.com/HKUDS/nanobot/pull/5405)** — 自 8 月 16 日创建至今约 2 个月，带 `conflict` 标签，需解决冲突后合入。该功能对部署/发布类技能的安全使用很重要。
- **[#5537 [OPEN] feat(my): persist session focus across turns](https://github.com/HKUDS/nanobot/pull/5537)** — 自 8 月 25 日起挂起，修复 #3292，同样带 `conflict` 标签。用户期望会话焦点能跨轮次与重启保留。
- **[#5727 [OPEN] docs(webui): explain headless login secret](https://github.com/HKUDS/nanobot/pull/5727)** — 9 月 10 日提出，补充无头服务器上 WebUI 登录密钥的存储位置与用法，带 `conflict` 标签，文档类改动长期未处理。
- **[#5776 [OPEN] feat(webui): add search to shared ProviderPicker](https://github.com/HKUDS/nanobot/pull/5776)** — 9 月 15 日提出，改善多场景供应商选择体验，同带 `conflict` 标签。
- **[#6091 [OPEN/草稿] feat(apps): add managed computer use with Cua Driver](https://github.com/HKUDS/nanobot/pull/6091)** — 维护者要求暂停，已保存 head 并作为草稿保留，需等待工作恢复后再继续。

这些积压项多为功能增强且带有冲突标记，建议维护者安排时间处理冲突或明确搁置计划，避免社区贡献者长期等待。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-11

## 1. 今日速览

过去 24 小时 Zeroclaw 保持高活跃度：Issue 侧共 13 条更新（11 条活跃/新开、2 条关闭），PR 侧共 50 条更新（39 条待合并、11 条已合并/关闭），当日无新版本发布。项目重心明确集中在两条主线：**v0.9.0 网关分离所需的 RPC 功能对齐**（JordanTheJet 多组 RPC parity PR 今日集中刷新）和**per-agent 身份隔离的 S0 级安全修复**（#9646/#9647 对应 PR #9746/#9745 仍在关键审查阶段）。今日关闭的 2 条 Issue（#11586、#11612）均为 Bug，其中 #11612 由外部安全测试团队报告并已修复。整体评估：项目处于大版本发布前的密集整合期，协作活跃但合并速度偏慢，大量 XL 级 PR 长期在审，安全

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-10-11）

## 今日速览

过去 24 小时项目共有 2 条 Issue 更新（均为活跃/新开，0 条关闭）、2 条 PR 进入关闭状态，且无新版本发布。PR #3421 于 10 月 10 日创建并关闭，为 PicoClaw 新增了 HTTP API 服务能力，是平台化集成方向的积极信号。社区讨论热度仍集中在 Web UI 长历史输入延迟（#3281，18 条评论）与高优先级路线图“浏览器自动化”（#293，👍8）上。整体来看，项目保持中等活跃度，新功能探索与遗留问题清理并行。

## 版本发布

无。

## 项目进展

- [PR #3421: feat(apiserve) serve PicoClaw agents over HTTP for internal services](https://github.com/sipeed/picoclaw/pull/3421)  
  10 月 10 日创建并关闭。该 PR 新增了一个独立服务，允许内部服务通过 `POST /v1/messages` 等端点在 Bearer API Key 认证下驱动 agent，且不侵入现有 channel、gateway 或 config 代码。这为 PicoClaw 的服务化调用和内部系统集成提供了轻量路径，具备明显的平台延伸价值。

- [PR #3393: feat(provider) add Cheaper Inference provider](https://github.com/sipeed/picoclaw/pull/3393)  
  9 月 25 日创建，10 月 10 日关闭，且被标记为 stale。该 PR 计划接入 OpenAI 兼容的 LLM 网关 Cheaper Inference，以比原厂模型降低 15–60% 成本。从 stale 与关闭状态看，该改动可能未被正式合并，建议维护者补充关闭原因或改以配置化方式继续支持低成本 provider。

## 社区热点

- [Issue #3281: Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)  
  当前讨论量最高的 Issue，共 18 条评论、2 个 👍，10 月 10 日仍有更新。用户普遍反馈在单一会话历史较长时，Web 端输入框出现明显卡顿，直接影响日常对话体验。

- [Issue #293: Feature: Autonomous Browser Operations](https://github.com/sipeed/picoclaw/issues/293)  
  尽管是 2 月提出的功能请求，但 8 条评论与 8 个 👍 表明社区关注度持续存在。用户对 AI 自主浏览网页、导航与数据提取能力表现出较强期待。

## Bug 与稳定性

- [Issue #3281：Web UI 输入延迟（严重程度：中）](https://github.com/sipeed/picoclaw/issues/3281)  
  涉及 PicoClaw 0.3.1 与 Go 1.25.11，Web 端在长对话历史下输入响应变慢。当前没有关联的修复 PR，且 Issue 被标记为 stale，但社区讨论仍活跃。建议优先排查前端渲染或状态管理在大消息列表下的性能瓶颈，避免该问题进入 0.4.x 时代成为稳定性短板。

## 功能请求与路线图信号

- [Issue #293：Autonomous Browser Operations](https://github.com/sipeed/picoclaw/issues/293)  
  官方标记为 `priority: high, type: roadmap`，目前仍 open，未进入实现阶段。凭借 8 个 👍 和较长的讨论历史，浏览器自动化是下一阶段最受期待的功能方向。

- [PR #3421：HTTP API 服务](https://github.com/sipeed/picoclaw/pull/3421)  
  若该 PR 被正式合并，PicoClaw 将具备面向内部服务的 HTTP 接口能力，可能成为后续版本的重要集成特性。

- [PR #3393：Cheaper Inference provider](https://github.com/sipeed/picoclaw/pull/3393)  
  虽已关闭，但“低成本推理”需求真实存在。社区中仍有用户希望接入更多 OpenAI 兼容网关以降低调用费用，未来不排除以其他形式重新落地。

## 用户反馈摘要

- 长对话历史下 Web UI 输入明显延迟，用户期望在长上下文中仍能保持流畅交互（#3281）。
- 用户对浏览器自动操作能力兴趣浓厚，希望 AI 能自主导航页面、提取数据并执行操作，且直接影响到路线图讨论（#293）。
- 成本敏感用户希望引入更便宜的模型入口，多个模型可用同一 API Key 访问，并降低 15–60% 费用（#3393）。

## 待处理积压

- [Issue #3281：Web UI 性能 Bug](https://github.com/sipeed/picoclaw/issues/3281)  
  开放近 3 个月，评论数达 18 条，无 fix PR，且已被 stale 标记。需维护者重新评估优先级并推进修复。

- [Issue #293：浏览器自动化路线图](https://github.com/sipeed/picoclaw/issues/293)  
  开放 8 个月，虽为高优先级 roadmap，但尚未启动。建议给出明确的阶段计划或原型时间表，避免社区期待持续悬置。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报 — 2026-10-11

## 1. 今日速览

过去 24 小时 NanoClaw 项目整体活跃度中等偏上：**无新增 Issue、无新版本发布**，但 **6 条 PR 有更新**，其中 1 条已合并（#4069），5 条仍处于待合并状态。已合并的 #4069 升级了 agent 容器内的 Claude Code、Agent SDK 与 Codex 版本，并将 **Claude Haiku 5.5 设为默认 Haiku 模型**，直接影响所有基于该镜像的容器用户。其余 5 条活跃 PR 集中于**容器运行时稳定性、渠道身份识别与安装器体验**，其中 @wakqasahmed 的 4 条渠道相关修复 PR（#3446、#3450、#3276 等）在 10-10 集中更新，说明维护者正在持续推进渠道适配层的合并评审。目前项目没有明显回归风险，整体处于“稳定迭代 + 渠道完善”阶段。

## 2. 版本发布

**无新版本发布。**

## 3. 项目进展

### 已合并/关闭

| PR | 说明 | 链接 |
|----|------|------|
| [#4069](https://github.com/nanocoai/nanoclaw/pull/4069) | **chore(container): 升级 Claude Code 至 2.1.296、Agent SDK 至 0.3.296、Codex 至 0.162.1**，由 @gavrielc 提交。这三个版本将 **Claude Haiku 5.5 设为默认 Haiku 模型**，同时同步了上游 agent 容器的基础依赖，属于一次低风险例行升级。 | [链接](https://github.com/nanocoai/nanoclaw/pull/4069) |

### 待合并的重要活跃 PR（今日有更新）

| PR | 功能/修复方向 | 链接 |
|----|--------------|------|
| [#4057](https://github.com/nanocoai/nanoclaw/pull/4057) | **修复 DockerHandle.stop() 在 `--rm` 自动移除仍进行时报告 teardown 失败的问题**，避免虚假的容器停机错误。 | [链接](https://github.com/nanocoai/nanoclaw/pull/4057) |
| [#3446](https://github.com/nanocoai/nanoclaw/pull/3446) | **在 unknown-sender 审批门禁中自动丢弃自动发送者**（Discord bot / Slack bot / Telegram bot），避免产生无法被发送者点击通过审批卡。 | [链接](https://github.com/nanocoai/nanoclaw/pull/3446) |
| [#3275](https://github.com/nanocoai/nanoclaw/pull/3275) | **在 `/update-nanoclaw` 升级路径上安装或刷新 `~/.local/bin/ncl` 符号链接**，修复升级后 `ncl` 命令不存在的回归。 | [链接](https://github.com/nanocoai/nanoclaw/pull/3275) |
| [#3276](https://github.com/nanocoai/nanoclaw/pull/3276) | **对附件暂存的消息 ID 做路径分隔符清洗**，修复 Google Chat 消息 ID（`spaces/<space>/messages/<id>`）因含 `/` 被 `isSafeAttachmentName` 拒绝的问题。 | [链接](https://github.com/nanocoai/nanoclaw/pull/3276) |
| [#3450](https://github.com/nanocoai/nanoclaw/pull/3450) | **Telegram：在 sender_scope 门禁中信任频道自身的身份**，修复广播频道匿名消息被当作未知发送者拦截的问题。 | [链接](https://github.com/nanocoai/nanoclaw/pull/3450) |

这 5 条 PR 如全部合并，将带来：**容器停机流程更可靠、渠道接入自动性更高、升级体验更完整、Telegram/Google Chat 渠道实际可用性明显提升**。它们共同指向“多渠道生产环境可落地”这一路线方向。

## 4. 社区热点

由于当日无新增 Issue 且各 PR 的评论与反应数据未披露（均为 0/undefined），无法按评论数排序。但从更新时间和内容热度来看，以下两条 PR 关注度较高：

- **[#4057](https://github.com/nanocoai/nanoclaw/pull/4057)（Docker 停机虚假失败修复）**：创建于 10-08，今日 10-11 仍有更新，属于近 24 小时最“热”的 PR。其背后诉求是使用 `--rm` 创建 agent 容器的用户频繁遇到“停机时报错但实际容器已正常移除”的困扰，影响自动化清理链路的信任度。
- **[#3446](https://github.com/nanocoai/nanoclaw/pull/3446)（自动丢弃机器人发送者）**：该 PR 解决的是 Discord/Slack/Telegram 机器人发送者在 unknown-sender 门禁中被当作人类、产生永远无法点击通过的审批卡问题。这类问题直接影响自动化对话/通知场景的可用性，社区中反馈此类问题的用户通常都希望“非人发送者不进入人工审批”。

## 5. Bug 与稳定性

当日无新增 Issue，因此以下问题均来自已有 PR 中披露的 Bug 修复，按严重程度排列：

| 严重程度 | 问题 | 修复状态 |
|---------|------|---------|
| **高** | 使用 `--rm` 的 agent 容器在 `docker stop` 触发的自动移除未完成时，`D

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 (2026-10-11)

## 1. 今日速览
- 过去 24 小时项目仅有 **2 条 Issue 更新**（1 条新开、1 条关闭），**无新 PR、无新版本**，整体社区活跃度处于低位。
- 新开 Issue **#8131** 中，用户对文档宣称的“OpenAI 兼容端点”支持提出强烈质疑，需要维护者尽快澄清。
- 长期未决的 DeepSeek 认证失败问题 **#1047**（创建于 2026-03-12）在今日被关闭，可能标志该问题已获得解决或用户已放弃跟进。
- 项目代码层面今日无可见合并，但 Issue 生命周期管理仍在进行，健康度整体平稳。

## 2. 版本发布
今日无新版本发布，此部分省略。

## 3. 项目进展
- 今日 **无 PR 合并或关闭**，代码层面没有可观察的向前推进。
- 值得关注的是，存在近 7 个月的 DeepSeek 配置问题 **#1047** 已于今日关闭。该 Issue 曾报告 `401 Unauthorized` 认证错误，虽无评论与修复 PR，但其关闭可能意味着问题已解决，或用户已通过其他途径绕过。  
  [查看 #1047](https://github.com/nearai/ironclaw/issues/1047)

## 4. 社区热点
- **#8131 [OPEN] Is this a joke? (ironclaw onboard provider list)**  
  作者引用官方文档中关于“支持超过二十个推理 provider，包括任意 OpenAI 兼容端点”的说明，但实际运行时遇到阻碍。标题带有明显的失望与不满情绪，虽暂无评论和点赞，但这是今日唯一活跃的新 Issue，反映了用户对**文档与实现一致性**的高度关注。  
  [查看 #8131](https://github.com/nearai/ironclaw/issues/8131)

## 5. Bug 与稳定性
| 严重程度 | Issue | 状态 | 说明 |
|---------|-------|------|------|
| 中高 | [#1047](https://github.com/nearai/ironclaw/issues/1047) DeepSeek 认证失败 | 已关闭 | 用户调用 DeepSeek 时收到 `401 Unauthorized`，提示 API key 无效。该问题已关闭，但无关联 Fix PR，需确认是否由文档/配置更新解决。 |
| 待确认 | [#8131](https://github.com/nearai/ironclaw/issues/8131) OpenAI 兼容端点支持 | 开启 | 用户对文档宣称的支持范围提出质疑，可能涉及功能缺失或文档误导，尚未有维护者回应，无 Fix PR。 |

## 6. 功能请求与路线图信号
- **DeepSeek provider 支持**：从 #1047 可以看出用户实际使用 DeepSeek 的需求真实存在，虽然该 Issue 已关闭，但 provider 的易用性（如 API Key 配置、错误提示）可能需要进一步优化。
- **OpenAI 兼容端点完整支持**：#8131 直接质疑该功能的可用性。如果该问题属实，那么“任意 OpenAI 兼容端点”的支持能力可能被提上路线图，或至少要求文档澄清适用范围与配置方法。当前无相关 PR 迹象。

## 7. 用户反馈摘要
- 用户对文档的**准确性**非常敏感。当宣称的功能与实际情况不符时，容易产生不信任感（案例：#8131）。
- 用户在使用第三方 provider（如 DeepSeek）时，遇到**认证错误且无法自行解决**的情况，往往会卡住并最终关闭 Issue，这可能意味着帮助文档或错误提示还不够友好（案例：#1047）。
- 两个 Issue 均无评论，说明目前未形成深入讨论，但用户的初体验反馈值得重视。

## 8. 待处理积压
- 当前无长期未响应的遗留 Issue，但今日新开 **#8131** 处于“等待维护者回应”状态。考虑到该 Issue 标题情绪化，若长时间无响应，可能导致用户不满升级。建议维护者**优先查看并给出解释**，包括：澄清文档描述、提供复现步骤或快速修复方案。  
  [查看 #8131](https://github.com/nearai/ironclaw/issues/8131)

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-11

---

## 1. 今日速览

过去 24 小时项目整体非常活跃：**PR 更新 22 条（其中 21 条已合并/关闭，1 条待合并）**，Issue 仅 1 条新开，无新版本发布。合并的 PR 高度集中在 **OpenClaw 运行时可靠性、Office 编辑体验、Artifacts 预览刷新** 三大方向，且绝大多数由核心维护者 @fisherdaddy 提交，呈现明显的**密集修复迭代节奏**。唯一的新 Issue（#2839）并非技术缺陷，而是外部用户对公司"双休制度"的求证提问，反映出项目社区已吸引到关注公司治理的非技术用户。整体健康度良好，修复响应速度快。

---

## 2. 版本发布

今日无新版本发布（最新 Releases 无）。

---

## 3. 项目进展

今日 21 个 PR 被合并/关闭，是近期代码合并量较大的一天。按主题归类如下：

### 🖥️ OpenClaw 运行时与网关稳定性（10+ PR）
| PR | 内容摘要 |
|---|---|
| [#2835](https://github.com/netease-youdao/LobsterAI/pull/2835) | 修复 macOS 上安装 Computer Use 后网关"二次重启"假象——实际上并未真正重启，而是状态误判 |
| [#2824](https://github.com/netease-youdao/LobsterAI/pull/2824) | 配置恢复停滞时不再禁用 composer、任务接收和 IM 连接，避免整个引擎被误报为失败 |
| [#2825](https://github.com/netease-youdao/LobsterAI/pull/2825) | 等待网关启动改用清醒时间（awake time）计时，修复机器休眠后启动被误判超时的问题 |
| [#2826](https://github.com/netease-youdao/LobsterAI/pull/2826) | 运行停止前重新检查未完成的进度卡片计划，修复长任务中进度卡片卡在"本轮已结束"的问题 |
| [#2827](https://github.com/netease-youdao/LobsterAI/pull/2827) / [#2823](https://github.com/netease-youdao/LobsterAI/pull/2823) | 停止回合时丢弃排队的引导输入（steer input），防止 OpenClaw 原生队列将其重放为新回合 |
| [#2831](https://github.com/netease-youdao/LobsterAI/pull/2831) | 持久化配置时丢弃已退役的 `meta.lastTouchedAt` 字段，修复 2026.9.4 → 2026.9.24 升级后网关无法启动的问题 |

### 📝 Office 编辑与文件处理
| PR | 内容摘要 |
|---|---|
| [#2833](https://github.com/netease-youdao/LobsterAI/pull/2833) | **新增 Word 编辑器插入表格和图片功能**（10×8 尺寸网格、方向键+回车操作），对齐 Word 桌面端行为 |
| [#2828](https://github.com/netease-youdao/LobsterAI/pull/2828) | Windows 上 Excel/WPS 打开文件导致保存失败（`EPERM`），现在会提示用户关闭文件并自动重试保存 |
| [#2822](https://github.com/netease-youdao/LobsterAI/pull/2822) | 修复主进程默认会话缺少剪贴板权限处理，导致电子表格编辑器无法复制/剪切 |

### 🖼️ Artifacts 预览与 UI 细节
| PR | 内容摘要 |
|---|---|
| [#2836](https://github.com/netease-youdao/LobsterAI/pull/2836) | Artifact 面板内置浏览器及 SVG/代码/文本/图片预览现在能正确响应 agent 的原地编辑（之前只处理 `change` 事件） |
| [#2832](https://github.com/netease-youdao/LobsterAI/pull/2832) | 预览在 agent 后续回复重写文件时保持打开，不再因 artifact id 变化而自动关闭 |
| [#2838](https://github.com/netease-youdao/LobsterAI/pull/2838) | "我的文件"预览在保存 Word 文档时保持打开，不再显示"加载中…"并重新加载 |
| [#2829](https://github.com/netease-youdao/LobsterAI/pull/2829) | 侧边栏 36px 刷新后 agent 行与嵌套任务行视觉无法区分，本次通过字体、缩进等实现两级层次 |
| [#2837](https://github.com/netease-youdao/LobsterAI/pull/2837) | **移除 composer 上方的 OpenClaw 进度卡片**——其展示的 agent 自述计划在实践中经常错误或缺失，维护成本高 |

### 🧰 工程与测试
| PR | 内容摘要 |
|---|---|
| [#2834](https://github.com/netease-youdao/LobsterAI/pull/2834) | 修复 `npm test` 意外修改被跟踪的 `logs/cowork.log` 的问题（该文件在 983ec2a0 被错误提交） |

---

## 4. 社区热点

今日值得关注的热点有两个：

### 🔸 Issue #2839：关于网易有道双休制度的求证（新开）
- 链接：[#2839](https://github.com/netease-youdao/LobsterAI/issues/2839)
- 作者：@dujeongil-galaxy（非典型开发者 ID，更像外部调研者）
- 评论：1 条

该 Issue 并非技术问题，而是从招聘平台整理的数据（双休率约 70%、平均下班 19:30、B 级评价）出发，向项目方求证：
1. "低强度周/远程弹性"算不算双休？
2. 官方写"周末双休"但员工提到晚间/周末待命，统计口径如何计算？
3. 同类数据有无数公开判据（年假天数、加班时长分布）？

**分析**：此 Issue 出现在 AI 开源项目仓库中较为罕见，推测可能来自调研机构、求职者或媒体。项目维护者需决定是否回应——这更多是公司 HR 政策层面的问题，而非技术 issue。对于项目本身，该问题也侧面反映了**项目知名度提升，吸引到非技术用户的目光**。

### 🔸 PR #2590：MCP stdio 命令与外部 URL 安全加固（仍待合并）
- 链接：[#2590](https://github.com/netease-youdao/LobsterAI/pull/2590)
- 创建于 2026-09-01，**已停留 40 天**，当前为唯一待合并 PR

这是一个安全加固 PR：MCP stdio command/args 未经校验直接进入 openclaw.json，renderer 提供的 URL 也直接传给 `shell.openExternal`。对执行第三方插件的应用来说属于**安全边界漏洞**。此 PR 长时间未合并值得注意。

---

## 5. Bug 与稳定性

今日修复的问题按严重程度排列如下（均已有关联修复 PR）：

| 严重程度 | 问题 | 复现场景/影响 | 修复 PR |
|---|---|---|---|
| 🔴 严重 | 升级后网关无法启动：`Auth profile migration failed`（#2831） | Windows 上从 2026.9.4 升级到 2026.9.24 时，`meta.lastTouchedAt` 残留导致迁移失败 | [#2831](https://github.com/netease-youdao/LobsterAI/pull/2831) |
| 🔴 严重 | 网关"二次重启"假象，Computer Use 安装后无法使用（#2835） | macOS 用户安装 Computer Use 后，再次选择 kit 发送消息触发假重启，实际无 SIGTERM，但 UI 显示重启 | [#2835](https://github.com/netease-youdao/LobsterAI/pull/2835) |
| 🟠 中等 | Windows 上 Excel/WPS 打开文件时保存失败（#2828） | Windows 文件锁导致 `EPERM`，用户无法保存文档 | [#2828](https://github.com/netease-youdao/LobsterAI/pull/2828) |
| 🟠 中等 | 机器休眠后网关启动被误判超时（#2825） | 睡眠唤醒后第一检查发现已等待数小时，启动被终止，引擎不稳定 | [#2825](https://github.com/netease-youdao/LobsterAI/pull/2825) |
| 🟠 中等 | Artifacts 预览不刷新 agent 的原地编辑（#2836） | HTML 在 agent 编辑后不刷新，SVG/代码/图片等错过多次编辑 | [#2836](https://github.com/netease-youdao/LobsterAI/pull/2836) |
| 🟡 一般 | 配置恢复停滞时整个引擎被禁用（#2824） | 配置恢复卡住时 composer 被禁用，任务被拒收，IM 断开 | [#2824](https://github.com/netease-youdao/LobsterAI/pull/2824) |
| 🟡 一般 | 侧边栏 agent 与任务行视觉混淆（#2829） | 36px 刷新后无法区分 agent 行与嵌套任务行 | [#2829](https://github.com/netease-youdao/LobsterAI/pull/2829) |
| 🟡 一般 | 测试污染工作区（#2834） | macOS 上每次 `npm test` 都向被跟踪的 `logs/cowork.log` 追加行 | [#2834](https://github.com/netease-youdao/LobsterAI/pull/2834) |

---

## 6. 功能请求与路线图信号

从今日 PR 和 Issue 中可以识别到以下产品方向信号：

| 信号 | 用户诉求 | 状态 |
|---|---|---|
| **Word 编辑能力补全**（#2833） | 用户反馈"Word 文件编辑不支持插入表格、图片"——核心库支持但 UI 未暴露 | ✅ 已实现，首次接入表格+图片插入，对齐 Word 行为 |
| **进度卡片反馈准确性**（#2837） | 进度卡片的 agent 自述计划"经常错漏"，用户曾被误导（如 #2826 中的 MiniMax-M3.1-Flash 卡住） | ✅ 已移除 composer 上方的进度卡片，省去校正成本 |
| **非 main agent 个性化欢迎**（#1660，合入） | 用户切换到非 main agent 时首页欢迎语仍为固定文案，

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

## Moltis 项目动态日报 — 2026-10-11

---

### 1. 今日速览

过去24小时，Moltis 项目整体活跃度处于**中高水平**，围绕社交渠道接入与模型兼容性出现了一波集中的社区反馈。共更新 4 条 Issues（全部新开）、1 条 PR（待合并），无新版本发布。所有 Issues 均由同一用户（@texxronn）提交，涉及 Discord 渠道权限、OpenAI gpt-6 支持、自定义触发词及运行时时间注入四个方向，其中 Discord 相关讨论与已有 PR #1295 形成呼应，是当前最明确的社区关注焦点。整体来看，项目仍处于快速迭代期，但存在若干影响实际体验的问题待修复，维护者响应速度将成为关键。

---

### 2. 版本发布

昨日无新版本发布。

---

### 3. 项目进展

**今日无合并或关闭的 PR**，项目主线推进暂以社区反馈积累为主。

值得关注的是，待合并 PR **[#1295 fix(discord): classify direct messages as direct chats](https://github.com/moltis-org/moltis/pull/1295)** 已进入待处理队列。该 PR 修复了所有 Discord 会话被一律视为“共享频道（shared）”的问题——当前实现导致 1:1 私聊中工具调用被无条件禁用，即使用户是账户配置的 `operators` 也不例外。若该 PR 成功合并，将显著改善 Discord 频道上操作者的使用体验，并与新 Issue #1300 形成完整的修复方案闭环。项目维护者应尽快对其进行 Review 与合并。

---

### 4. 社区热点

今日讨论最集中的主题是 **Discord 渠道上操作者信任边界与工具权限**，相关 Issue 与 PR 互相印证，形成了明确的社区诉求链条：

- **[#1300 Discord: forward DM vs guild so operator DMs can be trusted (tools)](https://github.com/moltis-org/moltis/issues/1300)** — 评论 1，作者指出当前实现“永远把 Discord 会话视为共享”，即使发送者是 `operators` 列表成员，工具也会被剥离。这实质上是一个权限模型缺陷，直接影响到操作者使用 Discord 进行远程运维管理。

- **[#1295 PR · fix(discord): classify direct messages as direct chats](https://github.com/moltis-org/moltis/pull/1295)** — 正是针对上述问题的修复，说明社区已有人在动手解决，且与 Issue 提交几乎同步出现。

讨论背后的核心诉求：**自托管 AI Agent 的用户希望在不同社交平台上获得一致的“操作者信任”边界**——私聊中应当给予完整工具权限，而群聊中则保持默认封闭。当前“一刀切”的共享判定显著削弱了多平台可用性，属于影响日常使用的实际问题。

---

### 5. Bug 与稳定性

昨日共报告 **2 个 Bug/缺陷**，按严重程度排序如下：

**① [#1299 Bug: runtime datetime never injected](https://github.com/moltis-org/moltis/issues/1299)** — 中等偏上  
- **现象**：Agent 无法回答“当前日期/时间”类问题。按照设计，`runtime_datetime_message()` 应在每次对话轮次中注入 `[The current user datetime is …]`，但实际上主机构建上下文时 `time` 参数为 `None`、`today` 未设置，导致注入逻辑永远不会触发。  
- **影响**：涉及所有需要时间感知的对话（如日程安排、定时任务、时效性回答），属于功能性缺陷。  
- **现状**：无 fix PR，评论 0 条，尚未获得维护者关注。

**② [#1300 Discord: forward DM vs guild so operator DMs can be trusted](https://github.com/moltis-org/moltis/issues/1300)** — 中等  
- **现象**：Discord 所有会话（包括操作者私聊）均被强制按共享渠道处理，工具被剥离。  
- **影响**：操作者无法通过 Discord 私聊使用任何工具，限制远程管理能力。  
- **现状**：已有对应修复 PR **#1295**，属于即将修复状态，但需等待合并。

另外，**[#1298 gpt-6-luna 工具调用兼容性](https://github.com/moltis-org/moltis/issues/1298)** 同时具有 Bug 特征（作为功能请求提交），也需要在路线图规划中予以考虑。

---

### 6. 功能请求与路线图信号

今日收到 **2 个功能请求**，结合已有 PR 可初步判断路线图方向：

**① [#1298 Feature: native support for OpenAI gpt-6 models (reasoning + tools)](https://github.com/moltis-org/moltis/issues/1298)**  
- **需求**：内置 `openai` provider 对 `gpt-6-luna` 模型支持不完善，使用工具时报 `HTTP 400: Function tools with reasoning_effort are not supported for gpt-6-luna in /v1/chat/completions`，需改用 `/v1/responses` 或将 `reasoning_effort` 设为 `'none'`。  
- **信号**：反映用户已在尝试最新 OpenAI 模型，且期望与工具调用同时使用。随着 gpt-6 系列逐步普及，该能力的接入优先级将上升。建议维护者评估在 openai provider 中增加对 `/v1/responses` 接口的适配或自动降级逻辑。

**② [#1297 Feature: configurable mention/trigger word for a shared channel](https://github.com/moltis-org/moltis/issues/1297)**  
- **需求**：在 WhatsApp 等渠道的共享群组中，用户希望通过自定义触发词（如 `@Rio`）唤醒 Agent，而不是依赖当前 `mention_mode = "mention"` 方式（在已关联设备上可能无法识别 @ 提及）。  
- **信号**：这反映了自托管用户在群聊场景下对“精准唤起”的强需求，提升在共享环境中的可用性。该功能需要渠道层适配，实现复杂度中等，若纳入下一版本将显著改善群聊体验。

**路线图判断**：结合 PR #1295（Discord DM 分类修复）与 Issue #1300，可预见 **下一版本可能围绕“渠道级别细粒度权限控制”进行改进**——包括私聊/群聊区分、操作者信任传递、以及可配置的触发词。Discord 与 WhatsApp 是当前最有代表性的两个渠道，建议优先覆盖。

---

### 7. 用户反馈摘要

从今日 Issues 的提交内容和评论中，可提炼出以下真实用户痛点：

| 痛点 | 来源 | 场景说明 |
|------|------|----------|
| **平台渠道感知不完整** | [#1300](https://github.com/moltis-org/moltis/issues/1300) | Discord 私聊与群聊无法区分，导致操作者失去工具权限，属于权限模型盲区 |
| **新模型适配滞后** | [#1298](https://github.com/moltis-org/moltis/issues/1298) | 用户尝试 gpt-6-luna 时发现工具调用被 API 拒绝，需等待项目适配 |
| **共享群聊中控制力不足** | [#1297](https://github.com/moltis-org/moltis/issues/1297) | 用户希望采用自定义触发词，避免在群聊中误唤醒或无法唤醒 Agent |
| **基础时间感知失效** | [#1299](https://github.com/moltis-org/moltis/issues/1299) | 用户询问日期/时间时 Agent 无法回答，说明运行时环境信息注入存在明显断点 |

用户整体反馈**偏积极**——4 条 Issues 内容均基于真实使用场景描述具体问题，且在同一时间段内集中提交（均为 2026-10-10），说明提交者正在高频使用 Moltis 并在多个维度遇到阻力。特别是 Discord 问题同时出现 Issue 与 PR，说明社区参与度较高，形成了“发现问题—提出修复”的高效循环。

---

### 8. 待处理积压

**重点提醒——PR #1295 等待合并已超过 5 天**：

- **[#1295 fix(discord): classify direct messages as direct chats](https://github.com/moltis-org/moltis/pull/1295)**  
  创建于 2026-10-05，最后更新于 2026-10-10。该 PR 直接解决 Discord 操作者私聊中被错误限制工具权限的问题，并关联到新 Issue #1300，目前仍处于待合并状态。建议维护者尽快安排 Review 与合并，以解除当前 Discord 渠道的功能阻塞。

**其他说明**：今日新增的 4 条 Issues 创建时间均在 48 小时内，暂不构成“长期未响应”积压，但仍建议在 3 天内逐一给出初步回应，特别是针对 #1299 时间注入 Bug —— 该问题没有对应 PR，且会影响日常对话体验，需要维护者介入排查根因。

---

*本日报基于 Moltis GitHub 仓库公开数据生成，涵盖 2026-10-10 至 2026-10-11 的更新动态。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-10-11

## 1. 今日速览

过去 24 小时 CoPaw（QwenPaw）项目保持稳步活跃：**15 条 Issue 更新**（6 新开/活跃，9 关闭），**18 条 PR 更新**（8 待合并，10 已合并/关闭），无新版本发布。核心进展集中在 **Console 前端稳定性修复**——大型 PR #8154 一次性修复了 4 个长期存在的页面加载/崩溃类 Issue（#8120、#8094、#7815、#7074）；同时 Files 面板刷新、聊天空消息渲染等小问题也通过独立 PR 收口。值得关注的是，仍有多项高严重度 Bug 处于开放状态（#7311 工具全挂近两个月未修复、#8172 静默空完成、#8163 长路径损坏等），且新增了鸿蒙原生客户端（#8164）等较大规模的功能 PR，项目正在向多端扩展方向推进。整体健康度中等偏好：Bug 修复节奏快，但历史积压仍有待清理。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

**合并/关闭的 PR 中，以下推进尤为关键：**

- **Console 加载失败/崩溃类问题集中修复** — PR [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154)（size/XXL）今日合并，修复了 4 个相关 Issue：页面加载失败（[#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120)）、启动画面无重试机制（[#8094](https://github.com/agentscope-ai/QwenPaw/issues/8094)）、lazy chunk 加载失败后无法恢复（[#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)）、运行崩溃需刷新（[#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074)）。该 PR 重置失败的 lazy 状态、限制自动重试次数（每会话一次）、并改进了 Safari/WebView 下的错误检测。这是今日对用户体验提升最直接的一次合并。

- **Files 面板刷新逻辑修复** — PR [#8149](https://github.com/agentscope-ai/QwenPaw/pull/8149) 修复了 [#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)（刷新后已展开文件夹不更新），刷新时重建分页游标、失效缓存并忽略过期响应，同时保留展开状态和已加载页码。

- **聊天渲染细节修复**：PR [#8157](https://github.com/agentscope-ai/QwenPaw/pull/8157) 修复复制图标大小导致 SVG 报错（[#8143](https://github.com/agentscope-ai/QwenPaw/issues/8143)）；PR [#8159](https://github.com/agentscope-ai/QwenPaw/pull/8159) 跳过空白文本消息，避免 Scroll 标题独立成块时最终回答被隐藏（[#8158](https://github.com/agentscope-ai/QwenPaw/issues/8158)）。

- **Hub 配置校验增强**：PR [#8168](https://github.com/agentscope-ai/QwenPaw/pull/8168) 和 [#8169](https://github.com/agentscope-ai/QwenPaw/pull/8169) 分别在 provider discovery 挂起和 DashScope 自动探测场景下修正 context window 校验逻辑。

- **被取代/主动关闭的 PR**：PR [#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889) 被 rebase 后的 [#8170](https://github.com/agentscope-ai/QwenPaw/pull/8170) 取代；[#7132](https://github.com/agentscope-ai/QwenPaw/pull/7132)（侧边栏图钉）因当前侧边栏重新设计已超出需求而关闭；[#7096](https://github.com/agentscope-ai/QwenPaw/pull/7096) 因 main 分支已升级 agentscope 依赖而不再需要。

---

## 4. 社区热点

今日讨论最集中的几个 Issue/PR 及背后诉求：

| 热度 | Issue/PR | 评论数 | 状态 | 诉求分析 |
|---|---|---|---|---|
| 🔥🔥🔥 | [#7311](https://github.com/agentscope-ai/QwenPaw/issues/7311) v2.1.1b2 missing `_qwenpaw_remote_backend` — all tools broken | 4 | **OPEN**（至今 47 天） | 用户报告所有 agent 工具因缺失模块而不可用，重装无法解决。这是严重的发布打包回归，至今未分配 fix PR，社区关注度极高。 |
| 🔥🔥 | [#8162](https://github.com/agentscope-ai/QwenPaw/issues/8162) OpenAI Responses API 流式空响应 | 7 | CLOSED | 用户报告会话运行 1-3 步即无提示中断。虽然已关闭，但评论数最多，且修复 PR [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165) 仍待合并——需确认修复是否真正落地。 |
| 🔥🔥 | [#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120) 频繁页面加载失败 | 5 | CLOSED | 多设备复现的加载失败问题，#8154 已合并修复，等待用户验证。 |
| 🔥🔥 | [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) Console 无法从 lazy chunk 加载失败中恢复 | 5 | CLOSED | 技术性较强的前端缺陷，社区反馈同样指向稳定性。 |
| 🔥 | [#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153) MCP Driver 配置接口导致 root RCE（标记 invalid） | 2 | CLOSED | 尽管标记为 invalid，但报告包含完整入侵链（挖矿木马、SSH 持久化），反应了用户对 MCP 配置接口安全性的严重关切，值得维护者复核。 |

**整体来看**，社区最迫切的诉求是**稳定性和可恢复性**——无论是页面加载失败、会话无提示中断，还是工具不可用，都直接影响日常使用。安全类讨论虽被归为 invalid，但描述了实际入侵事件，建议官方对该路径进行安全审计并公开结论。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（核心功能受影响，无修复方案或长期未解决）

1. **（长期未修复）** [#7311](https://github.com/agentscope-ai/QwenPaw/issues/7311) — v2.1.1b2 缺少 `_qwenpaw_remote_backend` 模块，所有工具报 `ModuleNotFoundError`。打开 47 天，无关联 fix PR，重装无效。**严重程度：最高**。

2. **[#8172](https://github.com/agentscope-ai/QwenPaw/issues/8172)（OPEN）** — Console 聊天间歇性静默空完成：约 1 秒结束、output 为空、模型从未被调用。2.2.0 Docker 部署，复现路径清晰（`qwenpaw-data` agent + OpenAI 兼容网关）。目前无 fix PR。

3. **[#8163](https://github.com/agentscope-ai/QwenPaw/issues/8163)（OPEN）** — Windows 长路径导致 `qwenpaw-creator` Review 决策日志写入失败（503），且残留空目录导致后续重试全部 409 冲突，变成"永久不可恢复"。已有修复 PR [#8167](https://github.com/agentscope-ai/QwenPaw/pull/8167) 待合并。

4. **[#8150](https://github.com/agentscope-ai/QwenPaw/issues/8150)（OPEN）** — 飞书入站图文混发（post 消息内嵌图片）被静默丢弃：文字正常送达、图片既未下载也不告警。影响内容完整性，无 PR。

5. **[#8171](https://github.com/agentscope-ai/QwenPaw/issues/8171)（OPEN）** — `send_file_to_user` 发送音频文件后，会话被永久卡死（LM Studio 返回"At most 0 audio(s)"，媒体能力分类器未识别该拒绝形态）。相关 PR [#7654](https://github.com/agentscope-ai/QwenPaw/pull/7654) 仍开放。

### 🟡 中等（已有修复或已关闭）

| Issue | 问题 | 状态 | 修复 PR |
|---|---|---|---|
| [#8162](https://github.com/agentscope-ai/QwenPaw/issues/8162) | Responses API 流式解析只处理增量事件，空响应中断会话 | CLOSED | [#8165](https://github.com/agentscope-ai/QwenPaw/pull/8165)（待合并） |
| [#8120](https://github.com/agentscope-ai/QwenPaw/issues/8120) | 多设备频繁页面加载失败 | CLOSED | [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154)（已合并） |
| [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | lazy chunk 加载失败后无法恢复 | CLOSED | [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154)（已合并） |
| [#8094](https://github.com/agentscope-ai/QwenPaw/issues/8094) | 启动画面无重试，WebView2 缓存可永久阻塞启动 | CLOSED | [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154)（已合并） |
| [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074) | 运行崩溃需手动刷新，高频 | CLOSED | [#8154](https://github.com/agentscope-ai/QwenPaw/pull/8154)（已合并） |
| [#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995) | Files 面板刷新后展开文件夹内容不更新 | CLOSED | [#8149](https://github.com/agentscope-ai/QwenPaw/pull/8149)（已合并） |
| [#8143](https://github.com/agentscope-ai/QwenPaw/issues/8143) | SVG width/height 收到非数字值（"small"），控制台报错刷屏 | CLOSED | [#8157](https://github.com/agentscope-ai/QwenPaw/pull/8157)（已合并） |
| [#8158](https://github.com/agentscope-ai/QwenPaw/issues/8158) | 模型输出 Scroll 标题为独立文本块时，最终回答渲染为空气泡 | CLOSED | [#8159](

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*