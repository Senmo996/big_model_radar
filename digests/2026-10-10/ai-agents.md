# OpenClaw 生态日报 2026-10-10

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-10 03:12 UTC

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

## OpenClaw 项目动态日报 — 2026-10-10

---

### 1. 今日速览

过去24小时内，OpenClaw 项目共更新 Issues 500 条（新开/活跃 393 条，关闭 107 条），PR 更新 500 条（待合并 338 条，已合并/关闭 162 条），无新版本发布。**项目活跃度极高**：Issue 和 PR 更新量均达到 500 条上限，说明社区讨论和贡献者提交均处于峰值。需要高度关注的是，**P0 级和高影响 Bug 占比显著**，多个严重问题（SQLite WAL 无限增长、更新永久阻塞、消息静默丢失等）在评论量和更新频率上表现出强烈的用户痛点。项目整体处于高吞吐的修复和迭代密集期，维护者响应与 triage 压力较大。

---

### 2. 版本发布

今日无新版本发布。最近一个已知版本为 **2026.9.8**（macOS 原生更新目标版本）。

---

### 3. 项目进展

今日合并/关闭的 PR 和 Issue 反映出以下领域的推进：

#### 已合并修复
| PR | 内容 | 关键意义 |
|---|---|---|
| [#168056](https://github.com/openclaw/openclaw/pull/168056) | 自定义 OpenAI 兼容推理模型忽略 `thinking` 级别 | 修复 `reasoning_effort` 因端点默认值被压制的回归 |
| [#150149](https://github.com/openclaw/openclaw/pull/150149) | 修复 vLLM Qwen/DeepSeek 推理级别被丢弃 | 完善声明式 reasoning effort 支持，覆盖更多服务模板方言 |
| [#168065](https://github.com/openclaw/openclaw/pull/168065) | Doctor 程序在拒绝维护同意后跳过诊断 | 交互式体验改进，拒绝维护后仍能执行只读诊断 |
| [#158495](https://github.com/openclaw/openclaw/pull/158495) | 为 promised-stream 恢复路径增加回归测试覆盖 | 纯测试补充，无生产行为变化 |

#### 今日关闭的关键 Issue
| Issue | 处理结果 |
|---|---|
| [#164214](https://github.com/openclaw/openclaw/issues/164214)（macOS 2026.9.8 发布恢复卡死） | 已关闭（修复在即） |
| [#162047](https://github.com/openclaw/openclaw/issues/162047)（Windows 升级耗时 35 分钟+） | 已关闭 |
| [#140932](https://github.com/openclaw/openclaw/issues/140932)（本地 EmbeddingGemma 缺前缀） | 已关闭，recall@1 16/25 → 23/25 |
| [#133692](https://github.com/openclaw/openclaw/issues/133692)（隔离 cron 拒绝 superseded 运行时） | 已关闭 |

**整体判断**：项目正持续收割 2026.9.x 系列回归问题，尤其在模型路由/推理参数传递、插件捕获、Windows/macOS 升级路径等方向上有实质修复落地。

---

### 4. 社区热点

| 排名 | Issue | 评论数 | 核心诉求 |
|---|---|---|---|
| 1 | [#143524](https://github.com/openclaw/openclaw/issues/143524) — Agent SQLite WAL 无限增长至 1.4–2.8 GB | **115** | Windows 单网关环境下 WAL 永不 checkpoint，阻塞启动并导致消息丢失；用户希望有自动恢复/压缩路径 |
| 2 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — hook/tool 子进程泄漏导致 zombie 累积 | 18 | 长时运行后系统资源退化，请求有明确“回归”标记，用户反馈积极（👍1） |
| 3 | [#161976](https://github.com/openclaw/openclaw/issues/161976) — WhatsApp DM 在重启后持久注册表交接反复失败 | 18 | 网关重启后自动回复无法送达，但下一条消息到达时又能补发——稳定的可靠性要求 |
| 4 | [#157325](https://github.com/openclaw/openclaw/issues/157325) — 卡死的 agent-DB 资源导致所有 agent 回复失败 | 17 | 故障影响面广（全部 agent、含飞书+WhatsApp），且必须重启网关才能恢复 |
| 5 | [#69208](https://github.com/openclaw/openclaw/issues/69208) — 跨通道重复 transcript/replay/上下文组装问题 | 16 | 归类为 umbrella issue，覆盖多通道同类 bug |

**分析**：#143524 的 115 条评论显着领先，说明这是一个影响面广、复现路径清晰、用户情绪强烈的问题。它和 #157325 共同指向 **SQLite/agent 数据库层缺乏自愈和压缩能力**——这可能是 2026.9.x 稳定性欠账中最需要优先处理的系统性问题。

---

### 5. Bug 与稳定性

按严重程度排序（P0 优先，标注是否已有 fix PR）：

#### P0 / 发布阻塞级

| Issue | 描述 | Fix PR |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Agent SQLite WAL 增长至 GB 级并阻塞 gateway 启动（Windows） | 无 |
| [#157325](https://github.com/openclaw/openclaw/issues/157325) | 卡死的 agent-DB 资源使所有 agent 回复失败，需重启恢复 | 无 |
| [#167771](https://github.com/openclaw/openclaw/issues/167771) | 更新被 `update-recovery-pending`/租约数据库身份变更永久阻塞，无修复路径 | 无 |
| [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs 超前于 release（IsolatedSessions 配置在文档中出现但版本不存在） | 无 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 2026.9.6 回归：捕获大型外部插件时 gateway 阻塞数分钟 | 无 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) | `MEMORY.md`/`USER.md` 因 provenance ratchet 被永久静默排除，无诊断/CLI/恢复 | 无 |
| [#56217](https://github.com/openclaw/openclaw/issues/56217) | 1Password secret provider 崩溃循环耗尽服务账号速率限制 | 无 |
| [#101814](https://github.com/openclaw/openclaw/issues/101814) | 2026.6.11 后所有通道进入 broken state（每会话一条消息后永久静默） | 无 |

#### P1 / 高影响

| Issue | 描述 | Fix PR |
|---|---|---|
| [#161976](https://github.com/openclaw/openclaw/issues/161976) | WhatsApp DM 回复在持久注册表交接后反复失败 | 无 |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 插件捕获阻塞事件循环（P0，见上） | 无 |
| [#119411](https://github.com/openclaw/openclaw/issues/119411) | memory 文件 watcher 永不重新索引，`Dirty: no` 但实际落后 | 无 |
| [#118185](https://github.com/openclaw/openclaw/issues/118185) | 同一 claude-cli turn 被两个 writer 写入 transcript 两次，内容不一致 | 无（有 linked PR） |
| [#101929](https://github.com/openclaw/openclaw/issues/101929) | context-overflow 预估高估 2.3–2.6× vs 实际计费 | 无 |
| [#159499](https://github.com/openclaw/openclaw/issues/159499) | Windows 2026.9.6 `ready` 耗时 ~220s，两个插件注册阶段占 175s | 无 |
| [#157647](https://github.com/openclaw/openclaw/issues/157647) | Claude CLI 后台 Bash turn 静默且触发 no-output watchdog | 无 |
| [#154891](https://github.com/openclaw/openclaw/issues/154891) | 失败的配置热重载使无关插件永久不可用 | 无 |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | Billing cooldown 在中断结束后仍持续 ~5 小时 | 无 |

**关键观察**：今日无新 P0 注册，但既有 P0 全部堆积且多数无 fix PR——**高优先级问题修复进展缓慢**，需关注维护者的 triage 节奏。

---

### 6. 功能请求与路线图信号

| Issue | 需求 | 信号强度 |
|---|---|---|
| [#14785](https://github.com/openclaw/openclaw/issues/14785) | 降低工具 schema token 开销（~3,500 tok/session） | 已有提案，明确 token 消耗表，P2 |
| [#16555](https://github.com/openclaw/openclaw/issues/16555) | 投递队列消息 TTL/过期时间 | 与 #143524 相关，重启后队列陈旧消息问题积累 |
| [#101422](https://github.com/openclaw/openclaw/issues/101422) | 可配置 memory recall 资格与索引排除路径 | Markdown-first 工作区用户呼声高（👍1） |
| [#16670](https://github.com/openclaw/openclaw/issues/16670) | 将 Memory/Embedding 设置纳入 onboarding wizard 必选步骤 | 👍2，切中用户首次配置痛点 |
| [#66252](https://github.com/openclaw/openclaw/issues/66252) | 每 Agent TTS/STT 覆盖配置 | 多语言场景需求明确，P3 |
| [#13219](https://github.com/openclaw/openclaw/issues/13219) | 每模型用量日志（成本追踪） | 有 linked PR，可能纳入短期路线图 |
| [#17840](https://github.com/openclaw/openclaw/issues/17840) | 可选 reaction-triggered agent turns | 交互式模式（投票/菜单）需求，P2 |
| [#38714](https://github.com/openclaw/openclaw/issues/38714) | Discord reaction 事件接入 Hooks | 与 #17840 互为补充，但当前无明确对应 PR |

**趋势**：用户需求集中在 **成本可见性（token 开销、用量日志）**与**消息生命周期管理（TTL、重试、去重）**两大方向，与近期稳定性 Issue 主题高度一致。

---

### 7. 用户反馈摘要

**正向信号**：
- #140932（EmbeddingGemma 前缀问题）修复后 recall@1 从 16/25 提升至 23/25，用户获得**实质性检索质量提升**。
- 今日被关闭的 #164214、#162047 等升级/发布问题，表明社区对原生升级路径体验敏感，且 close 速度验证了团队在跟进。

**负面/痛点**：

| 用户场景 | 反馈 |
|---|---|
| Windows 网关运行（#143524, #162047） | WAL 增长 + 启动阻塞 + 升级耗时过长，Windows 端体验明显落后于 Linux/macOS |
| 中文用户（#51429） | 代码中 hardcode 个人路径 `/Users/wangtao` 被合入并发布——对 QA 流程的信任产生负面情绪 |
| 多 Agent 并发（#43367） | "concurrent agent add/config overwrites + session-lock failures" 使多 Agent 编排在实际生产环境不可靠 |
| 长回复延迟（#91941） | 飞书 streaming 卡片从后缀增量改为全量更新后，长回复延迟严重 |
| 订阅计费（#115642） | 5 小时固定冷却期在故障恢复后仍然阻塞——"billing cooldown outlives the outage" 表达精准 |

**总体满意度**：修复质量获得认可，但**跨平台（Windows）和多通道可靠性**是用户情绪最集中的短板。

---

### 8. 待处理积压

以下高影响问题长期未获得修复 PR 或维护者确认，建议重点跟进：

| Issue | 年龄 | 状态 | 风险 |
|---|---|---|---|
| [#48920](https://github.com/openclaw/openclaw/issues/48920) — Live Docs 超前于 release | 2026-03-17 起（207 天） | 👍4，**P0**，当前仅标记 `needs-product-decision` | 用户配置无法生效且文档误导 |
| [#56217](https://github.com/openclaw/openclaw/issues/56217) — 1Password 崩溃循环耗尽速率限制 | 2026-03-28 起（196 天） | P0，既有 linked PR 但未合并 | 生产故障面大，供应商限流可能造成长尾影响 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) — MEMORY.md/USER.md 被永久排除 | 2026-09-20 起（20 天） | P0，`needs-product-decision` + `needs-security-review` | 核心记忆功能静默失效 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) — SQLite WAL 无限增长 | 2026-09-09 起（31 天） | 评论 115 条，**无 fix PR** | 影响面广且用户情绪最强烈 |
| [#167771](https://github.com/openclaw/openclaw/issues/167771) — 更新被永久阻塞 | 2026-10-09 起（1 天） | 新报告，无 triage 结论 | 更新通道可用性高风险 |
| PR [#118680](https://github.com/openclaw/openclaw/pull/118680) — clawsweeper 自动修复模型兼容路由 | 2026-08-03 起（68 天） | 等待人工评审 |

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-10-10）

## 1. 生态全景

当前生态呈现“一超多强、剧烈分化”的格局：OpenClaw 以单日 **1000 条 Issue/PR 更新** 牢牢占据绝对核心位，NanoBot、Zeroclaw、CoPaw 等构成第二梯队，而 IronClaw、TinyClaw、Moltis、ZeptoClaw 已处于零活动状态。整体生态正处于**高吞吐修复期**，数据库状态自愈、Windows 平台支持、渠道消息可靠性、成本可见性成为多项目共性的“稳定性欠账”。头部项目因 P0 级缺陷积压而面临社区热度与维护能力之间的张力，同时 NanoClaw、EasyClaw 通过正式版本发布透出产品化成熟信号。对开发者而言，当前阶段“跑得快”与

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-10

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共更新 11 条 Issues（新开/活跃 5 条，关闭 6 条）与 36 条 PR（待合并 21 条，已合并/关闭 15 条）。核心看点集中在三方面：一是长期搁置的 **NANOBOT_HOME / Windows 多实例冲突**问题迎来两个修复 PR 和一个新的 CLI 方案（#6128）；二是 **DeepSeek 托管 web_search 工具导致 Chat Completions 报错**的 bug 被两条独立 PR 修复；三是 Telegram 频道体验优化（相册发送、媒体 URL 识别）持续有新 PR 提交。项目处于密集修复与功能迭代并行阶段，整体健康度良好，无新版本发布。

## 2. 版本发布

过去 24 小时**无新版本发布**。注意：部分已合入 main 的修复（如 Slack 压缩通知静默 #5780、Request API 声明 #5204）尚未进入正式 release。

## 3. 项目进展

今日合并/关闭的 PR 覆盖了配置管理、bug 修复、文档更新等多个方向，主要推进：

- **Windows 多实例支持（修复 #1739）**：
  - [PR #1767](https://github.com/HKUDS/nanobot/pull/1767)（关闭）：尊重 `NANOBOT_HOME` 环境变量，解决多实例共用 `~/.nanobot` 导致 Telegram token 冲突。
  - [PR #6126](https://github.com/HKUDS/nanobot/pull/6126)（关闭）：在默认配置路径和 workspace 解析中全面支持 `NANOBOT_HOME`，并补充 Windows 文档。
  - 配套新增 [PR #6128](https://github.com/HKUDS/nanobot/pull/6128)（待合并）：增加 `--home <directory>` 全局 CLI 选择器，一条命令即可初始化独立实例，改进了此前需手动指定 config + workspace 的繁琐流程。

- **DeepSeek web_search 兼容性（修复 #6085）**：两条独立 PR 合入/关闭，在 Chat Completions 路径过滤掉仅 Responses API 支持的 `{"type": "web_search"}` 工具：
  - [PR #6104](https://github.com/HKUDS/nanobot/pull/6104)
  - [PR #6086](https://github.com/HKUDS/nanobot/pull/6086)

- **WhatsApp 时间戳修复（修复 #6120）**：[PR #6127](https://github.com/HKUDS/nanobot/pull/6127)（关闭）在 SDK 边界将 neonize 的毫秒时间戳转换为秒，恢复 replay filter 的正确行为。

- **请求 API 声明机制**：[PR #5204](https://github.com/HKUDS/nanobot/pull/5204)（关闭，priority: p1）允许 provider 和 model preset 声明支持的请求 API（Chat Completions / Responses / Anthropic Messages），从架构上避免 Responses-only 模型被错误路由。

- **文档维护**：[PR #6129](https://github.com/HKUDS/nanobot/pull/6129)（关闭）刷新了过时的运行时注释与 docstrings，覆盖存储格式、事件标记、媒体路径等，降低 contributor 理解和维护成本。

整体看，项目今日在 **多实例支持、已知 bug 修复、架构声明能力** 三个方向均有实质落地，且修复大多附带测试与文档。

## 4. 社区热点

今日评论最多的 Issue 集中在模型兼容性与后台行为控制：

- **[#5898 gpt-6 系列经 GitHub Copilot 不可用（已关闭，4 条评论）](https://github.com/HKUDS/nanobot/issues/5898)**：用户在 v0.3.5 上通过 GitHub Copilot 使用 OpenAI 6 模型系列失败，报错 “Mode provider request failed”。该问题在今日关闭，说明已通过 provider 配置更新或文档说明解决。用户对**新模型快速跟进**有较高期待。

- **[#6029 静默上下文压缩与后台 idle/dream 周期广播（已关闭，3 条评论）](https://github.com/HKUDS/nanobot/issues/6029)**：后台自动压缩和心跳循环会向活跃频道推送 “Compressing context…” 通知，打扰用户。该 issue 已关闭——相关 PR #6110 说明 “自动压缩通知默认静默” 的 option 1 已合入 main。表明**默认行为向“少打扰”演进**获得社区认可。

- **[#1739 Windows 多实例配置冲突（OPEN，2 条评论，最后更新于今日）](https://github.com/HKUDS/nanobot/issues/1739)**：自 3 月提出，今日因 #1767 / #6126 的合入再次被关注，@tobicon 的 Windows 部署场景（多实例 Telegram 冲突）是社区刚需。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 | 对应修复 |
|---|---|---|---|
| **高** | [#1739 NANOBOT_HOME 在 Windows 被忽略，多实例冲突](https://github.com/HKUDS/nanobot/issues/1739) | OPEN（今日更新） | [PR #1767](https://github.com/HKUDS/nanobot/pull/1767)、[PR #6126](https://github.com/HKUDS/nanobot/pull/6126) 已合入，等待验证后关闭 |
| **高** | [#6122 `reasoning_effort="minimal"` 与 `thinking.type="disabled"` 矛盾](https://github.com/HKUDS/nanobot/issues/6122) | OPEN（创建于今日） | 暂无 fix PR，需调整 DeepSeek provider 的 thinking 参数生成逻辑 |
| **中** | [#6085 DeepSeek websearch 导致 LLM 调用不可用](https://github.com/HKUDS/nanobot/issues/6085) | CLOSED | [PR #6104](https://github.com/HKUDS/nanobot/pull/6104) / [PR #6086](https://github.com/HKUDS/nanobot/pull/6086) 已修复 |
| **中** | [#6120 WhatsApp replay filter 因时间戳单位差异永不触发](https://github.com/HKUDS/nanobot/issues/6120) | CLOSED | [PR #6127](https://github.com/HKUDS/nanobot/pull/6127) 已修复 |
| **低** | [#5898 gpt-6 系列经 GitHub Copilot 报错](https://github.com/HKUDS/nanobot/issues/5898) | CLOSED | 配置/版本适配 |
| **低** | [#6006 QQ 引用消息无法到达 agent](https://github.com/HKUDS/nanobot/issues/6006) | CLOSED | 已解决 |
| **低** | [#6029 后台压缩通知干扰（feature-like bug）](https://github.com/HKUDS/nanobot/issues/6029) | CLOSED | 默认静默已合入 main |

整体 bug 修复流转速度快，多数当日或次日即有对应 PR；仅 #6122 为新增未响应项。

## 6. 功能请求与路线图信号

- **Telegram 媒体体验增强**（大概率进入下一版本）：
  - [#6121 多张图片以相册形式发送](https://github.com/HKUDS/nanobot/issues/6121) → 对应 [PR #6125](https://github.com/HKUDS/nanobot/pull/6125)（OPEN）
  - [#6123 带 query string 的远程媒体 URL 按路径扩展名分类](https://github.com/HKUDS/nanobot/issues/6123) → 对应 [PR #6124](https://github.com/HKUDS/nanobot/pull/6124)（OPEN）
  - 两者为同一贡献者 @gianfrancodemarco 提交，属于 Telegram 频道体验打磨。

- **实例管理 CLI**：[PR #6128](https://github.com/HKUDS/nanobot/pull/6128)新增 `--home` 全局参数，配合 NANOBOT_HOME 修复，多实例用户配置文件与 workspace 将更加直观可控。

- **Workspace picker 增强**：[#6111 在 Windows 上增加驱动器列表、文件夹创建和常用位置快捷方式](https://github.com/HKUDS/nanobot/issues/6111)（OPEN，今日创建），面向 Windows 桌面用户的可用性优化。

- **provider 扩展持续活跃**：Claude on Vertex AI（[#5955](https://github.com/HKUDS/nanobot/pull/5955)）、CoreWeave（[#6103](https://github.com/HKUDS/nanobot/pull/6103)）、Keenable MCP（[#6014](https://github.com/HKUDS/nanobot/pull/6014)）、Z.AI 拆分（[#3207](https://github.com/HKUDS/nanobot/pull/3207)）等一批 provider PR 均在待合并队列，说明生态对接热度高。

- **WebUI 推理强度选择**：[PR #5983](https://github.com/HKUDS/nanobot/pull/5983) 将 reasoning effort 从高级选项自由文本改为目录驱动的下拉选择，改善配置体验。

## 7. 用户反馈摘要

- **模型兼容性焦虑**（#5898）：用户升级到 v0.3.5 后无法使用 GPT-6 系列，反馈 “provider request failed”，说明新模型发布后用户期待 Nanobot 快速跟进，版本滞后会造成明显挫败感。

- **后台行为干扰**（#6029）：用户对 idle compaction / dream cycle 期间自动向活跃频道广播 “Compressing context…” 表示不满。这反映了**“后台维护应对使用者透明、低噪音”**的普遍诉求，已通过默认静默获得解决。

- **平台差异痛点**（#1739）：Windows 用户按文档设置 `NANOBOT_HOME` 不生效，导致两个实例共用同一配置和 Telegram token。这类跨平台一致性问题是桌面/服务器双栖用户的高频吐槽点。

- **配置矛盾困惑**（#6122）：DeepSeek 的 `reasoning_effort="minimal"` 会同时发送 `thinking.type="disabled"`，用户指出这与官方文档冲突，说明 **provider 特定参数需要按文档口径做内部一致性校验**。

## 8. 待处理积压

- **[#1739 Windows NANOBOT_HOME 多实例冲突（3 月 8 日创建）](https://github.com/HKUDS/nanobot/issues/1739)**：虽有两个 fix PR 合入，但 issue 尚未关闭，建议维护者确认 fix

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 — 2026-10-10

## 1. 今日速览

过去 24 小时项目活动保持高位：26 条 Issue 更新（19 条活跃/新开，7 条关闭）和 50 条 PR 更新（44 条待合并，6 条已合并/关闭），暂无新版本发布。值得关注的是，**Telegram 通道、ZeroCode 客户端、成本核算与内存泄漏等关键缺陷集中浮出水面**，且多为 P1 级问题，部分已有对应修复 PR（如 #11618 → #11619）。同时，A2A 协议、RAG 知识库等 RFC 仍在持续讨论中，整体项目正处于 v0.9.0 功能冲刺与稳定性加固并行的阶段。

## 2. 版本发布

无新版本发布（最新 Releases 为空）。

## 3. 项目进展

过去 24 小时内有 6 条 PR 被合并/关闭（具体列表未在数据中列出），7 个 Issue 被关闭，对应以下工作项完成：

- **图片批量驱逐功能** — [#11166](https://github.com/zeroclaw-labs/zeroclaw/issues/11166) 已关闭：per-request 图片上限超额时按批次驱逐图像块，避免每次新图片都重写 prompt cache。
- **技能 HTTP DNS 解析绑定** — [#10550](https://github.com/zeroclaw-labs/zeroclaw/issues/10550) 已关闭：在请求截止时间内绑定 DNS 解析，并增加可控制的 resolver 接口，完善端到端测试链路。
- **MCP 嵌套对象序列化 Bug 修复** — [#11371](https://github.com/zeroclaw-labs/zeroclaw/issues/11371) 已关闭：修复嵌套对象参数在工具执行前被错误序列化为字符串的问题。
- **ZeroCode 静默暂停 Bug 修复** — [#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741) 已关闭：修复 ZeroCode 在收到正常完成响应但未观察到终端轮次通知时，错误地暂停后续排队工作的行为。
- **成本记录 session_id 语义修正** — [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) 已关闭：修复 daemon 生命周期内所有成本记录共享同一 session_id、无法按会话区分支出的问题。
- **移除 StreamErrorWithUsage 包装器** — [#11545](https://github.com/zeroclaw-labs/zeroclaw/issues/11545) 已关闭：在 #10480 落地后清理冗余代码。
- **并行测试 Flaky 修复** — [#11180](https://github.com/zeroclaw-labs/zeroclaw/issues/11180) 已关闭：修复并行运行时门控下测试读取其他测试记录导致的间歇性失败。

以上进展表明运行时稳定性与成本可观测性正在持续补强，为 v0.8.6/v0.9.0 的交付扫清障碍。

## 4. 社区热点

- **[#8692 Maintainer 决策队列 Tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（15 条评论）— 作为 RFC、设计问题、发布策略的统一决策队列，持续吸引维护者与贡献者讨论，是当前社区协作的核心协调点。
- **[#7432 Runtime and Gateway 交付 Tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)**（6 条评论）— 承载 Phase 2 runtime（v0.8.6）和 Phase 3 gateway 分离（v0.9.0）的交付蓝图，社区对版本节奏和剩余 gap 高度关注。
- **[#9887 图像降级处理方案](https://github.com/zeroclaw-labs/zeroclaw/issues/9887)**（6 条评论）— 讨论将超大图像降级而不是直接丢弃，并支持用 0 禁用多模态上限。该 issue 被标记为 blocked / parking-lot，但需求呼声很高。
- **[#11420 SQLite 会话时间戳丢失 Bug](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)**（6 条评论）— API 用户发现每次对话轮次后所有消息的 `created_at` 被统一重写，直接影响依赖时间戳的集成方，讨论集中在修复策略与影响范围上。

热点诉求：**社区一方面关注项目治理与版本节奏的透明度，另一方面对一些影响真实使用体验的细节缺陷（如时间戳、图像处理策略）表现出强烈兴趣。**

## 5. Bug 与稳定性

今日 Bug 数量较多，按严重程度排列如下：

### 严重（S1 / P1）

- **Telegram 监听器永久阻塞** — [#11608](https://github.com/zeroclaw-labs/zeroclaw/issues/11608)：单个 blackholed HTTP 请求可导致通道监听器永久卡死，`listener_health` 检测到异常但无法恢复。暂无 fix PR。
- **Telegram 429 重试策略错误** — [#11615](https://github.com/zeroclaw-labs/zeroclaw/issues/11615)：忽略 `retry_after` 字段并立即重试，加剧限流，可能导致回复完全丢失。暂无 fix PR。
- **重复批准 shell 命令中止 Agent 循环** — [#11612](https://github.com/zeroclaw-labs/zeroclaw/issues/11612)：同一轮次内重复执行已批准的 shell 命令会触发保护机制，直接终止 ACP 会话。第三方安全测试团队 DefuzeX 报告。相关 PR：[#11617](https://github.com/zeroclaw-labs/zeroclaw/pull/11617)（关闭 steering channel，可能修复该问题）。
- **`map_key_sections` 内存泄漏** — [#11614](https://github.com/zeroclaw-labs/zeroclaw/issues/11614)：`Box::leak` 导致每次调用泄露 schema 路径，daemon 内存持续增长。暂无 fix PR。
- **OpenRouter 费用显示为 $0.00** — [#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)：所有 token 被归类为 `free tok`，`usage.cost` 未被摄取。暂无 fix PR。

### 中等（S2 / P1-P2）

- **SQLite 会话时间戳被重写** — [#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)（P1）：每轮对话后全部消息 `created_at` 被统一替换，破坏 API 数据完整性。
- **ZeroCode 消息丢失** — [#11618](https://github.com/zeroclaw-labs/zeroclaw/issues/11618)（P1）：daemon 返回 `SESSION_BUSY` 时消息被静默丢弃。**已有 fix PR：[#11619](https://github.com/zeroclaw-labs/zeroclaw/pull/11619)**。
- **ZeroCode 放弃挂起的 ask_user 提示** — [#11623](https://github.com/zeroclaw-labs/zeroclaw/issues/11623)（P2）：`ask_user` 请求被客户端清空后无响应，工具 600 秒后超时且无记录。
- **成本台账遗漏 `total_tokens`** — [#11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)（P2）：OpenAI 兼容供应商的隐藏推理 token（如 Gemini）被低估。
- **ZeroCode 禁用重复工具保护** — [#11484](https://github.com/zeroclaw-labs/zeroclaw/issues/11484)（P2）：工具防护机制在 ZeroCode 会话中失效，可能导致重复调用。
- **Linux 桌面版 GPU 持续占用** — [#11632](https://github.com/zeroclaw-labs/zeroclaw/issues/11632)（P2）：Tauri 应用空闲时 WebKitWebProcess 约 100% GPU 渲染，影响资源占用。

## 6. 功能请求与路线图信号

### RFC 与架构级设计

- **[#11254 RFC: A2A 协议 crate（zeroclaw-a2a）](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)** — 提议为 Agent-to-Agent 协议建立独立 crate，属于跨架构 refactor，风险等级 high。
- **[#11235 RFC: Knowledge Corpus（RAG）](https://github.com/zeroclaw-labs/zeroclaw/issues/11235)** — 为 agent 增加基于文档检索的知识问答能力，是 agent 能力边界的重大扩展。
- **[#11074 RFC: search_routes 路由](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)** — 为 `web_search_tool` 增加 hint-based provider 路由，类似现有 `model_routes`。

### 功能增强（已进入 PR 阶段）

- **内置工具 schema 延迟加载** — [#11473](https://github.com/zeroclaw-labs/zeroclaw/pull/11473)：通过 `tool_search` 延迟暴露内置工具 schema，减小上下文占用。
- **单工具 Provider 轮次** — [#11467](https://github.com/zeroclaw-labs/zeroclaw/pull/11467)：为 #10222 增加默认关闭的 `single_tool_rounds` 选项。
- **子审批路由到目标操作员** — [#11462](https://github.com/zeroclaw-labs/zeroclaw/pull/11462)：让代理子任务通过既有审批路由向目标操作员

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-10-10

## 1. 今日速览

过去 24 小时 PicoClaw 主要处于**依赖维护与稳定性修复**节奏：共 4 条 Issue 更新（新开 2、关闭 2）、6 条 PR 更新（1 条待合并、5 条已关闭）。5 条关闭 PR 全部为 Dependabot 发起的 Go 依赖升级，且均带 `stale` 标记，**说明依赖更新批量积压后被自动关闭**，维护响应度值得关注。今日新开 1 个 Android 构建 DNS 解析失败的 Bug（#3420），直播影响网关连接能力。无新版本发布。整体活跃度中等偏积极，社区诉求集中在部署便捷性和客户端消息处理体验上。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日**无核心功能 PR 被合并**，关闭的 5 条 PR 均为依赖升级：

- [#3389](https://github.com/sipeed/picoclaw/pull/3389) `golang.org/x/crypto` 0.53.0 → 0.57.0
- [#3388](https://github.com/sipeed/picoclaw/pull/3388) `modelcontextprotocol/go-sdk` 1.6.1 → 1.8.0
- [#3387](https://github.com/sipeed/picoclaw/pull/3387) `anthropic-sdk-go` 1.55.1 → 1.74.0
- [#3386](https://github.com/sipeed/picoclaw/pull/3386) `mautrix/go` 0.27.0 → 0.31.0
- [#3385](https://github.com/sipeed/picoclaw/pull/3385) `line-bot-sdk-go/v8` 8.20.1 → 8.22.0

这些 PR 全部在 2026-09-24 创建、10-09 关闭并标注 `stale`，**并非人工合并而是被自动关闭**。依赖项始终处于过期状态会增加安全风险和兼容性问题，建议维护者尽快处理这些积压的 Dependabot PR。

值得关注的是唯一的**待合并功能性 PR**：

- [#3414](https://github.com/sipeed/picoclaw/pull/3414) `feat(agent): add wall-clock turn time budget` — 为 agent 增加单轮墙钟时间预算（默认禁用），超时后强制停止工具调用并输出阶段性总结，可有效防止 agent 死循环或无限执行。该 PR 已停留 9 天且被标记 `stale`，应尽快评审。

## 4. 社区热点

- [#3377](https://github.com/sipeed/picoclaw/issues/3377) TLS 证书过期导致官网完全不可用 — **4 条评论、2 👍**，是近期讨论最集中的 Issue。作者指出 picoclaw.io 的证书已于 2026-09-10 过期，所有浏览器拒绝连接，项目主页持续不可访问。此事直接暴露了项目基础设施的运维缺口，社区影响面较大。

- [#3391](https://github.com/sipeed/picoclaw/issues/3391) Pico 客户端多行输入被拆分为多条消息 — 2 条评论，属于影响日常使用体验的功能缺陷，用户粘贴代码、诗歌等场景会破坏消息结构。

- [#3415](https://github.com/sipeed/picoclaw/issues/3415) 反向代理挂载子路径的请求 — 1 条评论，用户希望 Web Console 能部署在 `https://example.com/pico/` 下，属于企业/个人部署场景的高频需求。

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 状态 |
|--------|-------|------|------|
| 🔴 严重 | [#3420](https://github.com/sipeed/picoclaw/issues/3420) | **Android 构建中纯 Go 二进制无法解析 DNS**，gateway 所有外部 API 请求失败（`dial udp 127.0.0.1:53: connect: connection refused`），可能导致 Android 端完全不可用 | 今日新开，0 评论，**暂无 fix PR** |
| 🔴 严重 | [#3377](https://github.com/sipeed/picoclaw/issues/3377) | **官网 TLS 证书过期**，所有浏览器拒绝访问 picoclaw.io | 已标记 CLOSED，但关闭原因是 `stale` 而非修复，**需要确认站点是否已恢复** |
| 🟡 中等 | [#3391](https://github.com/sipeed/picoclaw/issues/3391) | Pico 客户端将多行消息按换行符拆分发送，破坏消息结构 | 已 CLOSED（stale），未有修复说明 |

其中 #3420 为**今日新上报的严重问题**，涉及 Android 端网络可用性，且目前无任何回应或修复 PR，是当前最需要优先介入的 Bug。建议维护者确认是否因 `CGO_ENABLED=0` 导致 Android 下 DNS 解析回退到 `/etc/resolv.conf` 失败，并考虑改用 `netgo` 或内置 DNS 解析器。

## 6. 功能请求与路线图信号

- **反向代理子路径支持**（[#3415](https://github.com/sipeed/picoclaw/issues/3415)）：请求为 Web Launcher 增加 `--prefix` / `-p` 之类的启动参数，使页面、登录、API、WebSocket、附件等所有请求都挂在 `/pico/` 下。这在 Nginx 托管多应用的场景中几乎是必需能力。考虑到 PicoClaw Web Console 的定位，该功能有较大概率被纳入后续版本。

- **Agent 单轮时间预算**（[#3414](https://github.com/sipeed/picoclaw/pull/3414)）：已提 PR，通过 `agents.defaults.turn_time_budget_seconds` 配置控制 agent 每轮的最长执行时间，超时后强制收敛总结。该 PR 若被合并，将是 agent 稳定性方面的重要增强，特别是在长任务场景下能显著降低 token 消耗。

## 7. 用户反馈摘要

- **基础设施痛点**：从 #3377 的 4 条评论和 2 个点赞可以看出，用户非常依赖 picoclaw.io 作为项目入口，证书过期导致官网持续挂机，影响了用户对项目维护活跃度和专业度的信心。
- **客户端消息处理体验**：#3391 表明用户在移动端 TUI 中粘贴多行代码或诗原文时会被强制拆分，破坏消息的完整性和语义，此类消息处理细节直接影响日常使用的满意度。
- **部署灵活性诉求**：#3415 反映出部分用户希望将 PicoClaw 作为同域名下的子路径服务接入现有 Nginx 架构，而当前仅支持根路径部署，对资源受限或多应用共存的场景不友好。
- **Android 可用性风险**：#3420 虽然没有评论，但题目直接指向"官方 Android 构建无法连网"，这类问题如不快速修复，会导致 Android 用户大量流失。

## 8. 待处理积压

| 项目 | 类型 | 存活时间 | 状态 | 建议 |
|------|------|----------|------|------|
| [#3377](https://github.com/sipeed/picoclaw/issues/3377) TLS 证书过期 | Issue（基础设施） | 已 28 天（创建于 09-12） | CLOSED（stale） | **需确认 picoclaw.io 是否已恢复 HTTPS 访问**；若未恢复应重新打开并紧急运维 |
| [#3415](https://github.com/sipeed/picoclaw/issues/3415) 反向代理子路径支持 | Issue（功能） | 8 天 | OPEN（stale 标记） | 属于明确可行的部署增强，建议纳入近期规划 |
| [#3414](https://github.com/sipeed/picoclaw/pull/3414) agent 时间预算 | PR（功能） | 9 天 | OPEN（stale 标记） | 完整的防死循环能力，建议尽快安排 code review |
| 5 个 Dependabot 依赖升级 PR（[#3385](https://github.com/sipeed/picoclaw/pull/3385)、[#3386](https://github.com/sipeed/picoclaw/pull/3386)、[#3387](https://github.com/sipeed/picoclaw/pull/3387)、[#3388](https://github.com/sipeed/picoclaw/pull/3388)、[#3389](https://github.com/sipeed/picoclaw/pull/3389)） | 依赖维护 | 已关闭（stale） | 依赖包括 `x/crypto`、`anthropic-sdk-go`、MCP SDK

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-10

## 1. 今日速览

过去 24 小时 NanoClaw 项目保持高活跃度：共有 2 条 Issue 更新、13 条 PR 更新（其中 10 条已合并/关闭）以及 1 个新版本发布。核心事件是首个 CalVer 版本 v2026.10.0 正式发布，标志着项目更新机制从跟随 `main` 分支切换为跟随正式发布版。同时合并了 9 个 bug 修复 PR，涉及 CLI 参数规范化、slash 命令解析统一、OneCLI 安装器修复、Dial 工具兼容性等多个模块。社区侧有一个长期未修复的 Telegram 投递 bug（#3569）和一个新的 OneCLI 2.x 网关能力请求（#4068）引发讨论。整体来看，项目正处于发布节奏规范化与稳定性修复并行的健康轨道上。

## 2. 版本发布

### v2026.10.0（2026-10-09 发布）

[Release v2026.10.0](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.10.0) 是 NanoClaw 首个采用日历版本号的正式版本，具有里程碑意义，主要变化：

- **更新机制切换**：`/update-nanoclaw` 从此版本开始默认安装正式发布版本，不再跟随 `main` 分支的最新提交。这降低了用户意外获取不稳定开发版的风险。
- **发布前验证**：该版本先在 `beta` 频道上作为 2026.10.0-rc.1 和 2026.10.0-rc.2 进行了两轮测试，验证通过后才推送到稳定频道。
- **无破坏性变更**：根据发布 PR #4065 的描述，本次为常规发布，从 rc.2 升为正式版，变更内容已全部包含在 rc 阶段中。

**迁移注意事项**：使用 `/update-nanoclaw` 的用户将自动切换到新机制，无需手动操作。自建部署的用户若此前手动跟踪 `main` 分支，建议评估是否继续跟踪主分支或转为跟随正式 release tag。

## 3. 项目进展

今日合并/关闭了 10 个 PR，其中包含 1 个发布 PR、8 个 bug 修复/改进 PR 和 1 个 CI 配置变更。主要进展可归纳为以下主题：

**架构一致性改进（3 个 PR）**
- [#4063 fix(host): open session, skill and run-log directories by descriptor](https://github.com/nanocoai/nanoclaw/pull/4063)：新增 `src/anchored-dir.ts` helper，会话、技能和运行日志目录改为一次打开、复用文件描述符，减少路径竞态和重复打开。
- [#4062 fix(commands): parse slash commands once for the gate and the runner](https://github.com/nanocoai/nanoclaw/pull/4062)：命令门卫和 agent runner 共用同一套 slash 命令解析器，消除两处解析逻辑不一致的问题。
- [#4061 fix(cli): normalize ncl arguments once in dispatch](https://github.com/nanocoai/nanoclaw/pull/4061)：`ncl` dispatch 在入口处一次性完成参数规范化，后续流程统一使用同一份参数对象。

**渠道与技能修复（3 个 PR）**
- [#4060 fix(add-mattermost): check the owner lookup result during setup](https://github.com/nanocoai/nanoclaw/pull/4060)：Mattermost 安装流程现在会校验 owner 查找结果，避免无效 owner ID 导致后续失败。
- [#4052 fix(add-dial-tool): scope Dial through the OneCLI policy API (gateway 1.42)](https://github.com/nanocoai/nanoclaw/pull/4052)：适配 OneCLI gateway 1.42.0 的 policy API，替换已返回 410 的 legacy rules API，修复 `/add-dial-tool` 在钉住版本下的不可用问题。
- [#4059 fix(setup): use a full URL and explicit curl options for the OneCLI installer](https://github.com/nanocoai/nanoclaw/pull/4059)：OneCLI 安装命令改为完整 URL 和显式 curl 选项，消除安装脚本歧义。

**测试与基础设施（3 个 PR）**
- [#4064 test(drivers): keep fs.constants in the driver tests' fs stub](https://github.com/nanocoai/nanoclaw/pull/4064)：修复在 `/add-iron-proxy` 等技能作用下驱动测试因缺失 `fs.constants` 而导入失败的问题。
- [#4065 chore(release): v2026.10.0](https://github.com/nanocoai/nanoclaw/pull/4065)：v2026.10.0 正式发布 PR。
- [#4058 ci: move all jobs to namespace-profile-paradixe](https://github.com/nanocoai/nanoclaw/pull/4058)：按创始人 2026-10-08 批准的规则，将所有 GitHub Actions job 迁移到 `namespace-profile-paradixe` 或自托管 s6 runner，不再使用 GitHub 托管标签。

这一系列修复表明项目在打磨 CLI 入口的一致性、降低对 OneCLI 网关 legacy API 的依赖，并持续收紧 CI 基础设施。

## 4. 社区热点

今日讨论热度集中在以下两个 Issue：

**[#3569 [OPEN] Telegram: URLs with an odd number of underscores never deliver](https://github.com/nanocoai/nanoclaw/issues/3569)**（2 条评论）

该 Issue 虽然创建于 8 月 27 日，但今天仍保持活跃，同时在最新 Issues 列表中。核心问题：所有 NanoClaw 的 Telegram 安装均钉在 `@chat-adapter/telegram@4.29.0`，当消息中未转义 MarkdownV2 标记（`_`、`*`、`~`、`` ` ``）的总数为奇数时，消息永远无法送达。上游已在 4.32.0 修复，但仓库仍未升级依赖。评论背后的诉求是希望项目尽快升级 chat-adapter 依赖，因为这是影响所有 Telegram 用户的通病。

**[#4068 [OPEN] Support OneCLI 2.x gateway (needed for Google Docs edit scope)](https://github.com/nanocoai/nanoclaw/issues/4068)**（1 条评论）

新开的 capability 请求，提出 OneCLI gateway 当前钉在 1.42.0，导致 Google Docs 连接只申请 `drive.file` 和 `drive.readonly` 权限，无法获得 `https://www.googleapis.com/auth/documents` 编辑范围。用户需要 OneCLI 2.x 才能支持 Google Docs 的编辑能力。这是一个实际使用场景驱动的功能诉求。

## 5. Bug 与稳定性

**高严重度**

- **[#3569 Telegram URLs with an odd number of underscores never deliver](https://github.com/nanocoai/nanoclaw/issues/3569)**（OPEN，无 fix PR）
  影响：所有 Telegram 渠道用户，包含奇数个未转义 MarkdownV2 标记的消息（如带下划线的 URL）永远无法送达。
  状态：上游已修复（4.32.0），但 NanoClaw 仍钉在 4.29.0，尚无升级 PR。该 Issue 已存活超 40 天，建议优先处理。

**中严重度（已修复）**

- OneCLI 安装器 URL 形式不明确（[#4059](https://github.com/nanocoai/nanoclaw/pull/4059)）——已合并，改为完整 URL 和显式选项。
- Mattermost 安装时 owner 查找结果未校验（[#4060](https://github.com/nanocoai/nanoclaw/pull/4060)）——已合并，增加校验和明确错误信息。
- Dial 工具在 OneCLI gateway 1.42 下返回 410（[#4052](https://github.com/nanocoai/nanoclaw/pull/4052)）——已合并，改用 policy API。

**低严重度（已修复）**

- 驱动测试在含 gateway 技能环境下导入失败（[#4064](https://github.com/nanocoai/nanoclaw/pull/4064)）——已合并。
- 会话/技能/运行日志目录重复打开造成目录句柄不一致（[#4063](https://github.com/nanocoai/nanoclaw/pull/4063)）——已合并。
- slash 命令在 gate 与 runner 中解析不一致（[#4062](https://github.com/nanocoai/nanoclaw/pull/4062)）——已合并。
- ncl 参数规范化时机不统一（[#4061](https://github.com/nanocoai/nanoclaw/pull/4061)）——已合并。

总体来看，今日修复了一批此前遗留的兼容性和一致性问题，但 Telegram 渠道的严重 bug 仍未解决。

## 6. 功能请求与路线图信号

**[#4068 Support OneCLI 2.x gateway](https://github.com/nanocoai/nanoclaw/issues/4068)** 是今日唯一的新增功能请求。从现有 PR 可以观察到，OneCLI 网关兼容性是一个持续的主题：

- `#4052` 适配了 OneCLI 1.42 的 policy API
- `#4059` 修复了 OneCLI 安装器命令

结合 #4068 来看，用户对 OneCLI 的版本需求正在从 1.x 向 2.x 过渡，Google Docs edit scope 是一个明确的使用场景。如果 OneCLI 2.x 是向后兼容的，升级 pin 版本可能是一个低成本的改进；若涉及 breaking changes，则需要进行更充分的评估。建议维护者关注该 Issue 的评论反馈，评估是否将 OneCLI 2.x 支持纳入下个版本的路线图。

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中可提炼出以下真实用户反馈：

- **Telegram 渠道可靠性问题（#3569）**：用户实际遇到了消息无法送达的问题，且因为所有安装都钉在同一版本，问题具有普遍性。用户期望项目能及时跟进上游依赖修复，而不是长期滞留在旧版本。
- **Google Docs 集成能力受限（#4068）**：用户在 NanoClaw 中使用 Google Docs 时无法获得编辑权限，原因是底层 OneCLI gateway 版本过旧。这反映了用户对文档协作类工作流的真实需求，同时也是渠道集成深度的体现。

此外，来自 PR #4052 的修复表明用户在安装 Dial 工具时已经遇到了 gateway 版本不兼容的实际故障，这一反馈已转化为代码层面的修复。

## 8. 待处理积压

以下 Issue/PR 长期未得到响应或合并，建议维护者关注：

- **[#3569 Telegram 消息投递 bug](https://github.com/nanocoai/nanoclaw/issues/3569)**：创建于 8 月 27 日，已超过 40 天，影响所有 Telegram 用户，上游已有修复，仅需升级依赖。目前无 fix PR，属于高影响低成本的修复项。
- **[#3751 fix(whatsapp): ignore @newsletter JIDs at the inbound boundary](https://github.com/nanocoai/nanoclaw/pull/3751)**：创建于 9 月 9 日，已超过 30 天，无评论、无合并。WhatsApp 渠道的入站边界需要过滤 newsletter JID，属于渠道健壮性改进。
- **[#3752 fix(whatsapp): keep every pending question answerable in a chat](https://github.com/nanocoai/nanoclaw/pull/3752)**：同样创建于 9 月 9 日，超过 30 天未合并。该 PR 试图保证聊天中每个待回答的问题都能保持可回答状态，对于多轮对话场景很重要。

这三个 PR/Issue 长期搁置可能影响用户对项目的信任度，尤其是 #3751 和 #3752 都是 WhatsApp 渠道的实质性修复，建议维护者抽出时间评审。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-10

## 今日速览

过去 24 小时 LobsterAI 没有新 Issue、没有新 Release，PR 更新 6 条：2 条待合并，4 条已关闭/合并。项目当日聚焦于 Windows 平台稳定性修复与桌面伴侣功能增强，其中 Windows 防火墙回环、配置锁死等问题得到闭环修复。整体活跃度处于中上水平，维护者响应及时，项目健康度良好。

## 版本发布

无。过去 24 小时无新版本发布。

## 项目进展

今日关闭/合并的 4 个 PR 主要覆盖 Windows 启动稳定性、配置锁恢复、Library 目录监控健壮性，以及桌面伴侣翻译/朗读功能：

- [#2817 fix(openclaw): allow loopback through Windows Firewall for the gateway](https://github.com/netease-youdao/LobsterAI/pull/2817)
  修复 Windows 用户重启后网关无法被 `127.0.0.1` 探活的问题。根因是 Windows 防火墙拦截了对 `LobsterAI.exe` 的入站回环连接，导致应用等待 300 秒网关启动超时。属重要稳定性修复。

- [#2819 fix(openclaw): reclaim orphaned config locks and stop endless config recovery](https://github.com/netease-youdao/LobsterAI/pull/2819)
  修复 Windows 用户每次任务启动都会重启网关、并卡在“AI 引擎启动中”的问题。根因是 2026-09-07 遗留的 0 字节 `openclaw.json.lock` 文件。PR 通过回收孤儿配置锁并终止无限恢复流程解决。

- [#2815 fix(library): skip deleted artifact dirs when watching and purge expired missing items](https://github.com/netease-youdao/LobsterAI/pull/2815)
  修复启动时对已删除 Library 目录反复报 `ENOENT` watcher 错误的问题。此前用户机器上每次启动平均出现 53 次堆栈日志，现改为跳过已删除目录并清理过期缺失项。

- [#2816 feat(desktop-companion): add translation and read-aloud cards](https://github.com/netease-youdao/LobsterAI/pull/2816)
  为桌面伴侣新增选中文本的翻译与朗读卡片，工具栏固定展示 Translate、Read aloud、Copy、Ask，其余操作收纳至 More 菜单。属于功能增强。

整体来看，项目在 Windows 平台稳定性和桌面端易用性上均有明显推进，尤其是 openclaw 网关的启动链路得到显著加固。

## 社区热点

过去 24 小时没有新 Issue，6 条 PR 均为 0 评论、0 👍，因此没有传统意义上的高热度讨论。但从 PR 内容看，当前社区最集中的诉求是 **Windows 启动链路稳定性**：

- [#2817 Windows 防火墙回环拦截导致网关启动超时](https://github.com/netease-youdao/LobsterAI/pull/2817)
- [#2819 配置锁残留导致网关无限重启](https://github.com/netease-youdao/LobsterAI/pull/2819)
- [#2820 新增 Windows 回环连接与网络过滤器诊断采集器](https://github.com/netease-youdao/LobsterAI/pull/2820)

其中 #2820 正是为 #2817 这类无法完全修复的边界情况补充的排查工具，说明维护者正在系统性改善 Windows 支持场景。

## Bug 与稳定性

今日无新增 Issue 报告 Bug，但合并/关闭的 3 个 PR 均来自真实用户反馈的问题：

| 严重程度 | 问题描述 | 状态 |
| --- | --- | --- |
| 高 | Windows 防火墙拦截回环连接，网关 300 秒超时无法启动 | 已修复 [#2817](https://github.com/netease-youdao/LobsterAI/pull/2817) |
| 高 | 0 字节配置锁导致每次任务启动重启网关，卡在启动页 | 已修复 [#2819](https://github.com/netease-youdao/LobsterAI/pull/2819) |
| 中 | Library 目录已删除，启动时反复输出 53 次 watcher 错误堆栈 | 已修复 [#2815](https://github.com/netease-youdao/LobsterAI/pull/2815) |

以上问题均已有关闭/合并的修复 PR，当前未观察到新的回归类报告。

## 功能请求与路线图信号

- [#2818 feat: add Atlas Cloud as a provider](https://github.com/netease-youdao/LobsterAI/pull/2818)
  新增 Atlas Cloud 作为 Global 区域的模型服务商，与 OpenRouter 并列。改动量 5 文件、+38/-4，属于轻量级 provider 扩展，若被接受将进一步提升平台可接入性。

- [#2820 feat(support): add Windows loopback connection and network filter collectors](https://github.com/netease-youdao/LobsterAI/pull/2820)
  面向支持场景新增两个双击诊断工具，用于采集 Windows 回环连接和网络过滤规则，定位引擎无法访问 `127.0.0.1` 的问题。该 PR 今日创建，当前待合并。

- [#2816 feat(desktop-companion): add translation and read-aloud cards](https://github.com/netease-youdao/LobsterAI/pull/2816)
  今日已关闭，预计进入主线。说明桌面伴侣的“划词翻译 + 朗读”能力是明确路线图方向。

综合来看，下一阶段可能包含更多云服务商接入、Windows 网络诊断能力增强，以及桌面伴侣交互升级。

## 用户反馈摘要

过去 24 小时没有 Issue 评论可供提炼，但从 PR 描述中可以还原以下真实用户场景：

- **Windows 用户重启后无法启动引擎**：应用等待 300 秒网关启动超时，`/startupz` 探活请求全部 `fetch failed`，最终定位为 Windows 防火墙默认拦截了对 `LobsterAI.exe` 的回环连接。（[#2817](https://github.com/netease-youdao/LobsterAI/pull/2817)）

- **Windows 用户每次任务启动都重启网关**：应用长期停留在“AI 引擎启动中”页面，直到手动重启。根因是配置写入进程被杀后遗留的 0 字节锁文件。（[#2819](https://github.com/netease-youdao/LobsterAI/pull/2819)）

- **Library 目录删除后启动日志被刷屏**：用户机器上每个被删除的目录都会产生一条 watcher 错误堆栈，累计 53 次，且问题持续存在。（[#2815](https://github.com/netease-youdao/LobsterAI/pull/2815)）

这些痛点均已由对应 PR

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

# CoPaw 项目动态日报 — 2026-10-10

> 数据来源：GitHub Issues/PR 活动（2026-10-09 至 2026-10-10）
> 数据范围：过去 24 小时 Issues 更新 19 条，PR 更新 28 条，新版本发布 0 个


## 1. 今日速览

过去 24 小时 CoPaw 项目保持中等偏高的社区活跃度：共更新 19 条 Issue（新开/活跃 12，关闭 7）与 28 条 PR（待合并 15，合并/关闭 13），但无新版本发布。今日社区讨论集中在**稳定性与安全**两大主题，其中一条关于 MCP Driver 配置接口导致 **root RCE 并被植入挖矿木马**的安全报告（[#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153)）最为严重，需维护者优先响应。代码合并方面，媒体负载拒绝恢复（[#8010](https://github.com/agentscope-ai/QwenPaw/pull/8010)）、EXIF 方向保留（[#8136](https://github.com/agentscope-ai/QwenPaw/pull/8136)）、LAN HTTP 终端身份（[#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089)）等修复已合入，项目在媒体处理健壮性与前端稳定性上有所推进。整体来看，项目修复节奏正常，但安全漏洞报告与多项复发 Bug 提示 **2.2.x 系列在配置管理与嵌入管道的健壮性上仍需加强**。


## 3. 项目进展

今日共 13 条 PR 被合并/关闭，以下为已合入且对项目有实质推进的变更：

### 核心稳定性修复
- **[fix(agents): recover from media payload rejections instead of failing](https://github.com/agentscope-ai/QwenPaw/pull/8010)**（[#8010](https://github.com/agentscope-ai/QwenPaw/pull/8010)，fixes [#8009](https://github.com/agentscope-ai/QwenPaw/issues/8009)）
  - 修复超大图片被 Provider 拒绝后**整个会话永久不可用**的问题：被拒的媒体块不再无限重放导致后续所有请求（包括纯文本）400 失败。
- **[fix(media): preserve EXIF orientation during image resizing](https://github.com/agentscope-ai/QwenPaw/pull/8136)**（[#8136](https://github.com/agentscope-ai/QwenPaw/pull/8136)，fixes [#8129](https://github.com/agentscope-ai/QwenPaw/issues/8129)）
  - 图片缩放前应用 EXIF 方向，旋转/镜像图片在模型请求中保持正确视觉方向；不缩放图片保持原样，输出继续剔除无关 EXIF 元数据。
- **[fix(console): support terminal identity over LAN HTTP](https://github.com/agentscope-ai/QwenPaw/pull/8089)**（[#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089)）
  - 在非安全上下文的 LAN HTTP 环境下，`crypto.randomUUID()` 不可用时回退到 `crypto.getRandomValues()` 生成 UUID v4，修复 Console 在局域网部署时崩溃的问题（关联 [#8147](https://github.com/agentscope-ai/QwenPaw/issues/8147)）。

### 前端体验优化
- **[fix(console): keep only the page title in settings headers](https://github.com/agentscope-ai/QwenPaw/pull/8130)**（[#8130](https://github.com/agentscope-ai/QwenPaw/pull/8130)）
  - 统一设置页标题样式，移除多个设置页面中"标签栏"与"内容区"的重复卡片容器，消除堆叠边框与视觉割裂。
- **[fix(console): wrap composer controls when space is limited](https://github.com/agentscope-ai/QwenPaw/pull/8145)**（[#8145](https://github.com/agentscope-ai/QwenPaw/pull/8145)）
  - 修复输入框空间受限时控件换行异常，保证前缀与操作组完整展示。

### 性能与本地模型
- **[fix(skills): offload pool download copy and sweep orphan stages](https://github.com/agentscope-ai/QwenPaw/pull/8055)**（[#8055](https://github.com/agentscope-ai/QwenPaw/pull/8055)）
  - 将技能池大体积下载（~13k 文件 / 80 MB）的文件复制工作从事件循环移出，避免阻塞服务，同时清理孤儿暂存目录。
- **[feat(local-models): update QwenPaw-Flash 9B, 27B and 35B-A3B](https://github.com/agentscope-ai/QwenPaw/pull/8155)**（[#8155](https://github.com/agentscope-ai/QwenPaw/pull/8155)）
  - 更新本地推荐模型：保留 2B/4B/9B 档位，新增 27B 与 35B-A3B 的 Q4_K_M（24 GiB）与 Q8_0（48 GiB）建议。

**评估**：今日合入的修复集中在**媒体处理容错**、**前端稳定**与**本地模型推荐**三块，项目稳定性得到实际增强；另有若干 PR 仍处于 Review 或待合并状态（见第 8 节）。


## 4. 社区热点

### 讨论热度最高

| 排名 | Issue/PR | 评论数 | 核心主题 |
|------|----------|--------|----------|
| 1 | [#7678 [Bug] spawn subAgent 全部 timeout 失败](https://github.com/agentscope-ai/QwenPaw/issues/7678) | 10 | 子代理（subAgent）任务全部超时，调大 timeout 无效 |
| 2 | [#8040 embedding reindex 静默失败](https://github.com/agentscope-ai/QwenPaw/issues/8040) | 5 | CJK 分块超限导致整批静默丢弃，为 #5950 复发 |
| 3 | [#8120 页面加载失败](https://github.com/agentscope-ai/QwenPaw/issues/8120) | 4 | 多设备频繁出现页面加载失败，影响体验 |
| 4 | [#8153 [Security] MCP Driver 配置接口 root RCE](https://github.com/agentscope-ai/QwenPaw/issues/8153) | 2 | 入侵证据链完整：被植入 SSH 公钥与 systemd 挖矿木马 |

### 热点分析

- **子代理可靠性是最大痛点**：[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) 虽已关闭，但其描述的"一旦 spawn subAgent 必定 timeout、无论怎么调大超时都没用"现象获得 10 条评论，用户还拉取了后端日志排查。该问题与今日新开的 [#8162](https://github.com/agentscope-ai/QwenPaw/issues/8162)（OpenAI Responses API 流式事件空响应导致会话中断）高度相关，均指向**多代理协作/流式解析链路的稳定性缺口**。
- **安全事件引发信任危机**：[#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153) 虽然评论数不多，但内容是最严重的——攻击者通过 MCP Driver 配置接口以 root 权限执行命令、植入 SSH 公钥并部署挖矿木马。用户完整的溯源证据链（已脱敏）对项目声誉影响大，预计后续会有更多安全讨论。
- **嵌入管道老问题复发**：[#8040](https://github.com/agentscope-ai/QwenPaw/issues/8040) 标记为 #5950 的复发，用户通过实证重放确认了根因：**单个 CJK chunk 超过 Provider 单条 token 限制时，整批被静默丢弃但日志显示成功**。这类"日志与事实不符"的问题对用户信任伤害较大。


## 5. Bug 与稳定性

按严重程度排列如下：

### 🔴 严重（需紧急处理）

- **[【Security】MCP Driver 配置接口导致 root RCE，服务器被植入挖矿木马](https://github.com/agentscope-ai/QwenPaw/issues/8153)**（[#8153](https://github.com/agentscope-ai/QwenPaw/issues/8153)）
  - 状态：OPEN，**无 fix PR**
  - 影响：攻击者可通过 MCP Driver 配置接口以 root 权限执行任意命令，完成 SSH 公钥持久化与 systemd 挖矿木马部署，已造成真实生产环境入侵。
  - 建议：立即检查 MCP Driver 配置接口的认证与授权机制，评估是否需要紧急 patch 或安全公告。

###

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报

**日期：2026-10-10**  
**数据来源：** [github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)

---

## 1. 今日速览

过去 24 小时，EasyClaw 项目处于「以版本迭代驱动、社区讨论平静」的状态。具体表现为：

- **无新 Issue、无新 PR**：社区提交和反馈活动为零，属于正常低频区间；
- **发布 1 个新版本**：v1.9.28 带来达人工作台多店铺筛选、BD 工作范围、达人 Excel 导入导出等实质性功能更新；
- **活跃度评估**：3/10 —— 代码更新持续进行，但社区讨论和协作贡献较少，**项目处于维护者单侧推进模式**；
- **总体判断**：项目技术演进方向清晰（聚焦商务拓展与达人管理流程），但社区参与度有待提升。

---

## 2. 版本发布

### [v1.9.28 - TK Copilot v1.9.28](https://github.com/gaoyangz77/easyclaw/releases)

**发布时间：** 2026-10-10（推测）

**更新内容：**

| 领域 | 更新详情 |
|------|----------|
| 达人工作台 | 支持多店铺筛选，帮助运营人员跨店铺统一管理达人资源 |
| 权限/工作范围 | 为商务拓展（BD）人员提供「个人工作台」与「公共工作台」两种范围视图 |
| 达人数据管理 | 支持达人 Excel 导出与导入，简化 BD 交接流程 |
| 流程职责 | 明确差评跟进的责任归属，完善售后/风控链路 |

**破坏性变更：** 未发现已知破坏性变更。

**迁移注意事项：**
- 若使用达人 Excel 导出功能，请确认导出字段的映射关系与本地模板一致；
- 启用「公共工作台」范围后，请注意团队内可见性权限的变化，建议先在测试环境验证。

---

## 3. 项目进展

过去 24 小时内**无 PR 被合并或关闭**，因此没有直接的代码合并动态可报告。

但结合 v1.9.28 的发布内容来看，项目完成了一次**围绕 BD 工作流闭环**的小步快跑迭代，具体进展包括：

- 补齐了达人工作台从 **筛选 → 导出 → 交接 → 差评跟进** 的完整操作链路；
- 通过「个人/公共」范围划分，暗示了**多角色权限体系**正在逐步成熟。

> 整体判断：项目在产品功能层面仍在稳定前进，但推进速度与社区参与度挂钩不强。

---

## 4. 社区热点

过去 24 小时内 **无活跃 Issue 或 PR 讨论**。

**分析：**

- 社区讨论热点缺失可能与以下因素有关：
  - 项目正处于版本刚发布的「观察期」，用户尚未充分测试新功能；
  - 项目使用者可能多为 BD/运营角色，而非开发者，参与 GitHub 讨论的意愿较低；
  - 维护者尚未在 Issues 区抛出讨论话题引导社区反馈。

**建议：** 维护者可在新版本发布后，主动在 Discussions 或 Issues 中发起「v1.9.28 使用反馈征集」，以激活社区。

---

## 5. Bug 与稳定性

过去 24 小时内 **无新报告的 Bug、崩溃或回归问题**。

- 未发现需要紧急修复的严重问题；
- 也无已确认的 fix PR 在等待合并。

**稳定性评价：** 当前暂无公开问题报告，但考虑到新版本刚发布，建议关注未来 48 小时内用户是否反馈 Excel 导入导出的编码兼容性或权限范围切换相关的问题。

---

## 6. 功能请求与路线图信号

过去 24 小时内 **无用户提交新功能请求**。

**从 v1.9.28 更新内容推断的路线图信号：**

- **多店铺/多角色支持**正在成为核心演进方向 —— 后续可能出现更细粒度的权限管理（如：店长、运营、BD 分角色视图）；
- **Excel 批量操作**的引入意味着项目正从「在线操作工具」向「数据协作平台」过渡，后续可能增加：
  - 更多字段的自定义导出模板；
  - 批量导入时的数据校验与去重；
  - 与第三方数据源（如 ERP）的同步接口。

**预判：** 下一版本（v1.9.29 或 v1.10）可能聚焦于「导入数据的冲突处理」或「BD 交接后的任务追踪」。

---

## 7. 用户反馈摘要

过去 24 小时内 **无新增 Issue 评论**，因此无法提炼新的真实用户反馈。

**基于 v1.9.28 发布内容的功能推测：**

- **目标用户痛点**：BD 人员在多店铺、多达人之间切换低效，达人信息交接依赖人工整理，差评跟进责任不清；
- **满意点**：✓ 多店铺筛选 + 个人/公共工作台切分，直接对应了 BD 日常使用场景；✓ Excel 导入导出显著降低交接成本；
- **潜在不满点**：✗ 功能更新集中在 BD/达人侧，普通创作者（达人）端的体验优化未见更新；
- **待验证点**：Excel 导出/导入的格式兼容性、大批量数据下的性能、公共工作台的权限安全。

---

## 8. 待处理积压

过去 24 小时内 **无新增挂起 Issue 或 PR**，当前无已知长期未响应的社区请求。

| 类型 | 数量 | 说明 |
|------|------|------|
| 长期未关闭 Issue | 0 | — |
| 待合并 PR | 0 | — |
| 需要维护者回应的讨论 | 0 | — |

**评价：** 积压清零是健康信号，但也说明社区反馈通道尚未被充分利用。

---

## 总结 & 项目健康度

| 维度 | 评分（5分制） | 说明 |
|------|:---:|------|
| 开发活跃度 | ⭐⭐⭐ | 版本持续更新，但缺乏社区协作者 |
| 社区参与度 | ⭐ | 24h 无 Issue/PR 互动 |
| 稳定性 | ⭐⭐⭐⭐⭐ | 无已知 Bug 或回归 |
| 路线图清晰度 | ⭐⭐⭐⭐ | BD 工作流方向明确 |
| 整体健康度 | ⭐⭐⭐ | 稳步进化，但社区基础薄弱 |

**维护者建议：**
1. 在 Release 说明中增加「如何反馈问题」的引导链接；
2. 主动邀请活跃用户参与内测群或 Discussions；
3. 对已发布的新功能，在 1 周内跟进使用者反馈，形成迭代闭环。

---

*本报告基于 2026-10-10 的 GitHub 公开数据分析生成。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*