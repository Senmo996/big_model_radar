# OpenClaw 生态日报 2026-09-05

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-05 01:53 UTC

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

# OpenClaw 项目动态日报 — 2026-09-05

## 1. 今日速览

过去24小时内 OpenClaw 项目保持极高活跃度：**500条 Issue 更新（463条新开/活跃，37条关闭）** 与 **500条 PR 更新（360条待合并，140条已合并/关闭）** 表明社区参与度与维护产出均在高速运转。然而，P1/P0 级回归与稳定性问题仍大量堆积，涉及消息丢失、会话状态损坏、崩溃循环等核心链路，且大量 issue 已挂起超过一周仍未获得修复 PR。整体评估：**功能迭代活跃，但稳定性债务明显，维护者响应速度面临挑战。**

---

## 2. 版本发布

**今日无新版本发布。** 最近版本停留在 v2026.9.1 及 v2026.8.1（社区反馈中提及），相关更新内容请关注后续 Release 公告。

---

## 3. 项目进展

今日共 **140 个 PR 被合并/关闭**，以下为值得关注的关键合并：

- **[fix(channels): apply acknowledgement settings without reconnecting](https://github.com/openclaw/openclaw/pull/138638)**（#138638）— 修复 `ackReactionScope` 配置修改后需重连渠道 monitor 的问题，涵盖 Discord/Matrix/Signal/Slack 多平台，合并后配置热加载更可靠。
- **[perf(agents): skip impossible tool image prefixes](https://github.com/openclaw/openclaw/pull/138601)**（#138601）— 优化工具图片结果超出上下文限制时的降级路径，避免无谓的重试投影，提升大上下文场景性能。
- **[fix: reduce memory spikes during large batch scans](https://github.com/openclaw/openclaw/pull/138604)**（#138604）— 修复大规模会话清单磁盘统计时的内存/CPU 峰值问题，优化并发队列分配策略。
- **[fix(sessions): restore incognito history and release stopped worker leases](https://github.com/openclaw/openclaw/pull/138585)**（#138585）— 修复无痕会话历史在 transcript 分支切换后不可用的问题，同时释放停止 worker 的磁盘数据库租约。
- **[fix(sessions): preserve full parsing for malformed metadata](https://github.com/openclaw/openclaw/pull/138733)**（#138733）— 修复会话元数据读取与完整读取对畸形数据的校验不一致问题。
- **[fix(sessions): write the transcript header when a reset lands on an empty window](https://github.com/openclaw/openclaw/pull/125336)**（#125336）— 修复空窗口 reset 后无法初始化 transcript header，导致下一轮用户消息推理失败的问题。
- **[fix(telegram): drop per-poll isolated worker poll-start info log](https://github.com/openclaw/openclaw/pull/138331)**（#138331）— 降低 Telegram getUpdates 轮询的 info 日志噪声，对大规模 bot 舰队运维友好。
- **[fix: start Mac Swift CI on hosted runners](https://github.com/openclaw/openclaw/pull/138527)**（#138527）— 解决 Mac Swift CI 任务因 Blacksmith runner 挂起而阻塞主 CI 槽位的问题，提升 CI 可用性。

此外，另有多项文档与脚本优化合并（#138092、#138618、#138527 等）。整体而言，项目在会话状态管理、渠道可靠性、性能调优方面均有实质推进。

---

## 4. 社区热点

今日讨论最热烈的 Issue/PR 反映了用户对**上下文管理、稳定性回归、多代理可靠性**的高度关注：

- **[#22438 [P2] feat: Tiered bootstrap file loading for progressive context control](https://github.com/openclaw/openclaw/issues/22438)**（18 评论）— 提出分层加载 bootstrap 文件以减少 token 浪费。该 issue 已挂起 6 个月但讨论持续升温，说明大量工作区较大的用户正面临上下文预算紧张的痛点，且尚无明确修复方案。
- **[#38327 [P1][Regression] "Cannot convert undefined or null to object" in 2026.3.2 with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327)**（16 评论，3 👍）— 版本回归问题在 6 个月后仍未解决，用户对谷歌 Vertex/Gemini 集成的稳定性表达了明显不满。
- **[#115908 [P1] Session transcript projection reconcile can livelock...](https://github.com/openclaw/openclaw/issues/115908)**（15 评论）— 核心会话系统的严重 livelock 问题可能导致所有 channel 传输阻塞，社区对事件循环阻塞的影响面讨论激烈。
- **[#108435 [P1][Regression] update to 2026.7.1: gateway fails to start](https://github.com/openclaw/openclaw/issues/108435)**（15 评论，3 👍）— 用户报告 systemd、ollama、手动启动三种方式均无法启动 gateway，属于高影响阻断问题。

**诉求分析**：社区对高优先级（P0/P1）的回归修复速度不满，尤其对涉及数据丢失、会话状态损坏、启动失败的问题期待更快响应。

---

## 5. Bug 与稳定性

以下为今日报告的严重问题按严重程度排列：

### 🔴 P0

- **[#48920 [P0] Live Docs are ahead of release](https://github.com/openclaw/openclaw/issues/48920)** — 文档中出现 `IsolatedSessions` 配置但最新版 2026.3.13 中并不存在，用户按文档操作即报错。已有 [#138690](https://github.com/openclaw/openclaw/pull/138690) 等 PR 在途，但状态仍为 needs-product-decision。

### 🟠 P1（精选高影响力）

- **[#38327 [Regression] google-vertex/gemini-3.1-pro-preview 报错 "Cannot convert undefined or null to object"](https://github.com/openclaw/openclaw/issues/38327)** — 自 2026.3.2 版本起就有报告，至今未修复。无 fix PR。
- **[#115908 Session transcript projection reconcile livelock 阻塞主线程](https://github.com/openclaw/openclaw/issues/115908)** — 持续写入下事件循环卡顿数十秒，影响所有 channel。无 fix PR。
- **[#108435 [Regression] 2026.7.1 升级后 Gateway 无法启动](https://github.com/openclaw/openclaw/issues/108435)** — 三种启动方式全部失败，阻断性极强。无 fix PR。
- **[#113306 SQLite snapshot restore 缺乏端到端崩溃与身份保证](https://github.com/openclaw/openclaw/issues/113306)** — 数据完整性风险。无 fix PR。
- **[#97616 子进程泄漏导致僵尸进程累积](https://github.com/openclaw/openclaw/issues/97616)** — 长期运行后性能劣化。无 fix PR。
- **[#135111 [Regression] v2026.8.1 版本间歇性 "Provider completed tool call with malformed JSON arguments"](https://github.com/openclaw/openclaw/issues/135111)** — claude-sonnet-5 上约 6 次间歇故障。无 fix PR。
- **[#119720 同步 SQLite 事务阻塞事件循环，ANALYZE 不执行](https://github.com/openclaw/openclaw/issues/119720)** — 36.7s 阻塞复现。无 fix PR。

### 🟡 P2（代表性）

- **[#53628 ${XDG_CONFIG_HOME} 安装 skill 时不解析](https://github.com/openclaw/openclaw/issues/53628)** — 行为 bug，已有 [#130005](https://github.com/openclaw/openclaw/pull/130005) 等相关 PR 在改造中，但此 issue 无关联 fix PR。
- **[#119087 Gateway 冷启动回归约 2.5x](https://github.com/openclaw/openclaw/issues/119087)** — 1-vCPU 容器上从 beta.1 到 beta.7 性能下降，有 linked PR。

---

## 6. 功能请求与路线图信号

以下功能请求讨论度高、或已有对应 PR 在推进，可能进入后续版本：

| Issue | 标题 | 状态 | 路线图信号 |
|---|---|---|---|
| [#22438](https://github.com/openclaw/openclaw/issues/22438) | Tiered bootstrap file loading | 18 评论，无 PR | 社区热度高，提升上下文利用率 |
| [#14785](https://github.com/openclaw/openclaw/issues/14785) | Reduce tool schema token overhead (~3,500 tok/session) | 11 评论，无 PR | 核心性能优化方向 |
| [#16670](https://github.com/openclaw/openclaw/issues/16670) | Onboarding Wizard 强制 Memory/Embedding 配置 | 9 评论，无 PR | 降低新用户配置门槛 |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | Agent-triggered context compaction（self-compact tool） | 8 评论，2 👍 | 自主上下文管理需求 |
| [#13219](https://github.com/openclaw/openclaw/issues/13219) | Per-model usage logging for cost tracking | 8 评论，1 👍 | 企业级成本治理需求 |
| [#38568](https://github.com/openclaw/openclaw/issues/38568) | 注入 context window % 到 system prompt | 7 评论，2 👍 | 让 agent 感知上下文余量 |
| [#51441](https://github.com/openclaw/openclaw/issues/51441) | 暴露实际后端模型名到 session_status | 9 评论 | LiteLLM 场景透明性 |
| [#88032](https://github.com/openclaw/openclaw/issues/88032) | Telegram 引用/回复上下文作为一等公民 | 6 评论 | 渠道上下文处理改进 |

**值得关注**：[PR #138745](https://github.com/openclaw/openclaw/pull/138745)（macOS 浏览器登录 Gateway）今日刚开启，且 [#138092](https://github.com/openclaw/openclaw/pull/138092)（macOS 设置迁移至 Dashboard）处于 needs proof 状态，**macOS 原生应用的账户体系即将迎来一次较大重构**，可能改变用户登录与 Gateway 连接的方式。

---

## 7. 用户反馈摘要

- **升级即回归的负面情绪累积**：多个 issue（#38327、#108435、#135111）中用户反馈"worked before, now fails"，且长时间未获解决，影响社区对版本稳定性的信任。
- **多代理编排的实际体验痛点**：[#43367](https://github.com/openclaw/openclaw/issues/43367) 用户报告并发添加代理时配置互相覆盖、session-lock 失败、子任务脱管。真实场景下的多代理可靠性远未达可用标准。
- **消息静默丢失令人困惑**：[#112259](https://github.com/openclaw/openclaw/issues/112259) 用户反馈 iMessage 消息被接收但"零回复"、无日志、不持久化，对用户可见性构成打击。
- **上下文 token 消耗被广泛抱怨**：多个 issue 提及 bootstrap 文件、tool schema、记忆搜索等对 context window 的挤占。高级用户对 token 成本敏感度很高。
- **对"Live Docs ahead of release"的强烈不满**：[#48920](https://github.com/openclaw/openclaw/issues/48920) 获得 4 👍，用户按照官方文档操作却报错，反映了文档与版本同步流程的缺陷。
- **内存/性能退化持续被关注**：冷启动 2.5x 退化（#119087）、同步 SQLite 阻塞事件循环（#119720）、内存峰值（PR #138604 已修复），性能类反馈高频出现。

---

## 8. 待处理积压

以下为长期未响应或需要维护者重点关注的事项：

### ⚠️ 长期未修复的严重 Issue

- **[#38327 [P1] google-vertex/gemini-3.1-pro-preview 回归](https://github.com/openclaw/openclaw/issues/38327)** — 创建于 2026-03-06，已挂起 6 个月，评论 16 条，无 fix PR。
- **[#48920 [P0] Live Docs ahead of release](https://github.com/openclaw/openclaw/issues/48920)** — 创建于 2026-03-17，已挂起近 6 个月，P0 级无结论。建议产品决策层尽快拍板。
- **[#14785 [P2] Tool schema token 开销优化](https://github.com/openclaw/openclaw/issues/14785)** — 创建于 2026-02-12，社区讨论充分但无实质推进。

### ⚠️ 长期无响应的 PR

- **[#104114 fix(agents): prioritize skill-creator over direct skill_workshop calls](https://github.com/openclaw/openclaw/pull/104114)** — 创建于 2026-07-11，近两个月未获维护者 proof 决策，当前状态 "needs maintainer proof decision"。
- **[#130005 feat(memory-core): allow machine-only dreaming without Dream Diary prose](https://github.com/openclaw/openclaw/pull/130005)** — 创建于 2026-08-26，状态 "needs proof"，尚无维护者响应。

### ⚠️ 需要特别关注的高风险领域

- **SQLite 数据完整性**：#113306、#71689、#119720 等均在 SQLite 路径上发现严重问题，建议维护者优先投入专项修复。
- **会话/消息丢失类问题**：#69208（umbrella issue）、#90944、#112259、#114211、#118018 等，已形成 issue 族，反映会话生命周期管理需要系统性重构。
- **并发/多代理稳定性**：#43367、#118018、[#129729](https://github.com/openclaw/openclaw/pull/129729)（PR 修复中）表明该领域长期不稳，虽有修复尝试但尚未收敛。

---

*数据来源：OpenClaw GitHub 仓库（openclaw/openclaw），统计时间 2026-09-04 至 2026-09-05。*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期**：2026-09-05  
**数据窗口**：2026-09-04 ~ 2026-09-05


## 1. 生态全景

个人 AI 助手开源生态整体处于 **功能高速迭代与稳定性债务并存的阶段**：以 OpenClaw 为首的核心项目单日处理 500+ Issue 与 500+ PR，展现出极强的社区活跃度，但 P0/P1 级回归与数据完整性问题的长时间悬而未决（部分达 6 个月）也表明维护能力正面临考验。与此同时，NanoBot、NanoClaw、CoPaw 等中坚项目分别围绕内存治理、Provider 契约重构、多租户架构等方向推进平台化升级，而 IronClaw、LobsterAI 则通过高频版本发布（LobsterAI 连续两日发版）与聚焦的体验修复维持稳定的迭代节奏。共性趋势是：**上下文管理、MCP 生态扩展、多渠道集成稳定性、Agent 通信可靠性**已成为全行业共同攻坚的技术高地。值得警惕的是，SQLite 存储层缺陷（LobsterAI #1071、OpenClaw #113306/#119720）与 OOM 问题（NanoClaw #3716、CoPaw #7534）在多项目中独立浮现，暗示底层持久化与资源管控仍是系统性短板。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | Issues（关闭） | PR（待合并） | PR（合并/关闭） | Releases | 健康度评估 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 463 | 37 | 360 | 140 | 无 | ⚠️ 高活跃但稳定性债务严重；P1 问题 6 个月未修 |
| **CoPaw** | 18 | 10 | 23 | 14 | 无（2.2.x beta 迭代） | ✅ 活跃收敛；MCP 安全/ Loop 模式响应快 |
| **LobsterAI** | 1（含严重 SQLite 缺陷） | 0 | 5 | 28 | ✅ 2 个（2026.9.3/9.4） | ✅ 交付效率高；⚠️ SQLite 问题 159 天未处理 |
| **NanoBot** | 2 | 3 | 21 | 8 | 无 | ✅ 健康；内存治理集中发力；Issue 净减少 |
| **PicoClaw** | 4 | — | 3 | 20 | 无 | ✅ 平稳；批量清理 stale PR，MCP 文档贡献活跃 |
| **NanoClaw** | 2 | — | 15 | 3 | 无 | ⚠️ 架构升级期；⚠️ OOM 生产事故待响应 |
| **IronClaw** | 5 | 2 | 9 | 4 | 无 | ✅ 健康；问题-修复闭环完整，无高危 Bug |
| **Moltis** | 1 | 0 | 1 | 0 | 无 | 🟡 低活跃但无阻塞；需及时 review |
| **EasyClaw** | 0 | 0 | 0 | 0 | ✅ 3 个（v1.9.3/9.4/9.5） | ✅ 发布驱动型迭代；无积压 |
| **TinyClaw / ZeptoClaw** | 0 | 0 | 0 | 0 | 无 | ⚪ 静默状态 |

**说明**：PicoClaw PR 总事件 23 条中含批量 stale 关闭；NanoClaw 关闭的 3 个 PR 为历史积压清理，无法确认是否合入主干。


## 3. OpenClaw 在生态中的定位

**社区规模断崖领先且几乎不可撼动**：单日 500 Issue / 500 PR 的流量分别是第二梯队（CoPaw 28/37、NanoBot 5/29、LobsterAI 1/33）的 10~20 倍以上，是生态中唯一达到"万级 Issue 体量"的项目。其生态位不仅是"参照系"，更是其他项目的 **功能风向标**——NanoBot、PicoClaw、IronClaw 的许多渠道修复、上下文优化方向均能在 OpenClaw 的历史 Issue/PR 中找到对应原型。

**技术路线差异**：OpenClaw 走的是"**多平台消息渠道 + 会话状态持久化 + 高度可配置 Agent**"的重型架构路线，其渠道覆盖（Discord/Matrix/Signal/Slack/Telegram/iMessage）和会话管理复杂度远超同类。这带来了更高的功能天花板，但也直接导致了今日我们看到的问题：SQLite 同步事务阻塞 36.7s、transcript 投影 livelock 阻塞全部 channel、多代理并发 session-lock 失败——**复杂度已成为稳定性最大的敌人**。相比之下，NanoBot 注重轻量 SDK 化（runtime-context 生命周期管理、ContextBuilder 可编程性），NanoClaw 则押注 Provider 契约的规范化治理，IronClaw 走"小而美"的渐进优化路线——它们在架构上避开了 OpenClaw 的部分系统性风险。

**社区诉求特征差异**：OpenClaw 用户集中在**高负载生产环境**（大规模 bot 舰队、多代理编排、超长上下文），对性能和稳定性的敏感度极高；而 NanoBot/Moltis 等项目的用户更关注**开发体验与集成便捷性**。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与案例 |
|---|---|---|
| **上下文/Token 管理** | OpenClaw、NanoBot | 分层 bootstrap 加载（OpenClaw #22438）、context 压缩可视化（NanoBot #5656）、临时 runtime-context 块（NanoBot #5659）、上下文余量注入 system prompt（OpenClaw #38568） |
| **MCP 生态接入与安全** | PicoClaw、NanoClaw、CoPaw、OpenClaw | MCP setup 文档贡献（PicoClaw #3368/#3367）、Zapier MCP 技能（NanoClaw #3715）、MCP 工具白名单运行时强制（CoPaw #7504 + #7470）——**从"能接入"走向"安全可控地接入"** |
| **SQLite/存储层数据完整性** | LobsterAI、OpenClaw | ON DELETE CASCADE 失效 + 非原子写（LobsterAI #1071，159 天未修）、SQLite snapshot 无崩溃保证（OpenClaw #113306）、同步事务阻塞事件循环（OpenClaw #119720）——**三个项目独立报告，说明是共性技术债** |
| **内存/资源无界增长** | NanoBot、NanoClaw、OpenClaw | 三个缓存无限增长 fix PR 来自同一贡献者（NanoBot #5663/5664/5665）、PreCompact 全量写盘导致 OOM（NanoClaw #3716）、大批次扫描内存峰值（OpenClaw PR #138604） |
| **Agent-to-Agent 通信可靠性** | NanoClaw、OpenClaw、CoPaw | 发送方身份保留（NanoClaw #3718）、失败反馈回源（NanoClaw #3719）、多代理配置覆盖/子任务脱管（OpenClaw #43367）、停止信号丢失（CoPaw #7567） |
| **Provider 兼容性** | OpenClaw、NanoClaw、IronClaw、CoPaw | Google Vertex/Gemini 回归（OpenClaw #38327）、provider 契约重构（NanoClaw 系列 PR）、OpenAI 兼容层 /cancel 修复（IronClaw #8059）、Volcengine Ark 400 错误（CoPaw #7549） |
| **WebUI 体验** | IronClaw、NanoBot、LobsterAI | 命令面板细节打磨（IronClaw #8063~8066，问题-修复一一闭环）、模型速度展示（NanoBot #5660/#5631）、登录漏斗优化（LobsterAI #2573/#2612/#2596） |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全渠道消息 Agent、深度会话管理、多代理编排 | 高负载生产力用户、bot 舰队运营者 | 重型多渠道网关 + 持久化会话 + 事件循环驱动；复杂度最高 |
| **CoPaw** | 个人 AI 助手桌面端 + Hub 多租户版（2.2.x 中） | 个人及小团队；中文用户占比高（Issue 大量中文反馈） | 多租户演进中；Skill 预加载、MCP 白名单等企业级管控先行 |
| **NanoBot** | SDK/框架化 Agent 能力（ContextBuilder、runtime-context） | 开发者、嵌入式 Agent 场景 | 可编程 SDK 为核心，强调生命周期管理与可组合性；并有 WebUI/TUI |
| **NanoClaw** | Provider 契约规范化、Skill 安全安装、A2A 通信 | 平台型开发者、多 Provider 混合用户 | Core-owned canonical provider 模式；Skill 安装边界治理 |
| **LobsterAI** | 桌面应用 + 订阅商业化 + 应用内浏览器 | 面向消费者的商业产品用户 | Electron 桌面；订阅/发布闭环是差异化优势 |
| **IronClaw** | Telegram 深度集成、OpenAI 兼容 API 服务 | 轻量个人用户、Telegram 重度用户 | 聚焦单一渠道体验打磨 + API 兼容层 |
| **PicoClaw** | 嵌入式/边缘场景（Sipeed 硬件基因）、IRC 等长尾渠道 | 硬件玩家、极简自托管用户 | 轻量化 + 多渠道适配；MCP 文档驱动生态扩展 |
| **Moltis** | 外部 AI 代理互操作（AGY 等 CLI 流式接入） | 多代理工具链用户 | 适配器型架构，复用第三方 OAuth 会话 |
| **EasyClaw** | Copilot/客服场景、隐私模式、未知发件人识别 | 电商/客服业务用户 | 业务场景驱动（隐私脱敏、调度重放），非通用框架 |


## 6. 社区热度与成熟度

**第一梯队：核心参照（万级流量）**  
- **OpenClaw**：生态绝对中心，功能迭代最激进，但稳定性信任何题突出——P1 回归 6 个月不修 + "Live Docs ahead of release" P0 事件正在消耗社区信任。

**第二梯队：快速迭代期（日 PR 20~40）**  
- **CoPaw**：2.2.x beta/RC 密集迭代，多租户方向明确，社区讨论热度高（Hub 话题 22 评论）；但 cron 重复调度、飞书队列卡死等生产问题仍待收敛。
- **LobsterAI**：交付效率最高的项目之一（连续两日发版），商业化路径清晰；但社区参与度低（仅 1 Issue），SQLite 严重缺陷久拖不决。
- **NanoBot**：健康度良好，内存治理呈现"同一贡献者系统性提交"的良性社区协作特征；0.3.0 行为回归需补文档标注。
- **PicoClaw**：平稳维护期，批量清理 stale PR 暗示维护者正在收拢技术债；MCP 文档贡献显示生态扩展意愿。

**第三梯队：质量巩固期（日 PR < 15）**  
- **IronClaw**：问题-修复闭环质量高（4 Issue 全部 24 小时内获 PR），无高危 Bug，属于"小而稳"的典范。
- **NanoClaw**：架构升级期，核心团队驱动重构（provider 契约、skill 安装机制），但 OOM 生产事故（#3716）与 Cursor 相关 PR 17 天未动构成近期风险点。
- **Moltis**：低活跃但无健康问题，属于早期项目等待关键 feature 合入破局。

**静默项目**：TinyClaw、ZeptoClaw 无活动，建议暂时移出重点观察列表。


## 7. 值得关注的趋势信号

**① 上下文管理正在从"被动优化"走向"主动治理"**  
OpenClaw 的 tiered bootstrap 加载、context window 感知 system prompt 注入，NanoBot 的 `/compact` 命令 + `context_compaction` 生命周期事件 + ephemeral runtime-context 块——头部项目已在系统性地将上下文控制权交给用户和 Agent 自身。**建议开发者关注 `context_compaction` 等生命周期事件的设计范式**，这可能是下一代 Agent 框架的标准能力。

**② MCP 生态进入"安全可控"阶段**  
PicoClaw 的 MCP setup 文档贡献（无需 API key 的 web search MCP）与 CoPaw 的 MCP 工具白名单运行时强制（安全性修复）、NanoClaw 的 Zapier MCP 托管 skill（私密 token 不落盘）共同表明：MCP 的接入门槛与安全边界正在同步规范化。**对开发者而言，尽早建立"最小权限 MCP 工具白名单"意识将是生产环境的强制要求**。

**③ 多租户/团队协作成为个人助手的必然演化方向**  
CoPaw #7318 讨论（22 评论）直接指向"个人工具不够用，团队需要共享"，而 OpenClaw 的多代理并发问题（#43367）则是团队化使用的另一种前置形态。**如果您的项目面向组织用户，多租户数据隔离与协作权限模型应在架构早期就纳入设计**，而非事后补救。

**④ SQLite 在小规模部署中的可靠性被集体低估**  
LobsterAI（CASCADE 失效+非原子写）、OpenClaw（同步事务阻塞 36.7s+快照无崩溃保证）、NanoClaw（OOM 写盘）——三个独立项目在存储层暴露的严重缺陷提示：**"默认存储"绝不等于"可靠存储"**。建议所有重度依赖 SQLite 的 Agent 项目尽快审计外键生效状态、写入原子性与 WAL 模式配置，并补充故障注入测试。

**⑤ Provider 兼容层正成为平台型项目的核心竞争力**  
NanoClaw 的 provider 契约重构（core-owned canonical 模式）、IronClaw 的 OpenAI 缓存键支持、CoPaw 的 Volcengine Ark 兼容性修复、OpenClaw 的 Gemini 回归迟迟未修——**Provider 层正在经历"从可调用到契约化治理"的升级**。外接模型提供商的请求格式差异（如 assistant 结尾、cache key 格式）已成为实际的生产事故源，平台型项目应将 Provider 兼容性视为一等公民。

**⑥ 外部服务策略变更驱动的适配会越来越频繁**  
NanoBot 当日即响应 OpenCode 的 session header 新策略（Issue+P1 PR 同日提交），说明 AI Agent 生态的互相依赖正在加深。**建议项目建立对上游服务商公告的监控机制**，避免因外部策略变更导致服务静默劣化。

**⑦ 用户对"静默失败"的容忍度已降到最低**  
CoPaw 的"停止后实际仍执行"、NanoClaw 的"投递失败无反馈"、OpenClaw 的"消息零回复无日志"——多个项目用户都在抱怨同一类问题：**系统不告诉用户到底发生了什么**。可观测性（失败可见、状态同步、来源追溯）正在从"加分项"变为"必选项"。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 🤖 NanoBot 项目动态日报 — 2026-09-05

> 数据区间：2026-09-04 ~ 2026-09-05 | 数据来源：GitHub (HKUDS/nanobot)

---

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共 5 条 Issue 更新（2 新开/活跃、3 关闭），29 条 PR 更新（21 待合并、8 已合并/关闭）。社区提交集中在 **WebUI 体验完善、内存/缓存边界加固、第三方 Provider 集成**三条主线上，其中 3 个内存相关的 fix PR 出自同一位贡献者，呈现明显的"稳定性集中治理"趋势。Issue 关闭数（3）大于新开数（2），说明维护团队正在消化历史问题；当日无新版本发布，但 0.3.0 的行为回归问题（#5645）已有关注，社区健康度总体良好。

---

## 2. 版本发布

**无新版本发布。**

> ⚠️ 相关背景：Issue #5645 指出 **0.3.0 相比 0.2.2 缺少 Current Time runtime-context 的默认注入**——这是一个行为层面的回归，建议维护者在下一个补丁版本中给出明确处理（是否恢复默认开启、或通过配置项控制）。

---

## 3. 项目进展

过去 24 小时共 8 个 PR 被合并/关闭，以下为已完成并合并/关闭的关键变更：

| PR | 作用域 | 要点 |
|---|---|---|
| [**#5660**](https://github.com/HKUDS/nanobot/pull/5660) `[CLOSED]` | WebUI | 在 context 使用 popover 中展示**模型生成速度（tokens/s）**，解决了 #5631 的需求，后端数据已具备，前端补齐展示 |
| [**#5639**](https://github.com/HKUDS/nanobot/pull/5639) `[CLOSED]` | TUI | 稳定会话标签、TUI 流式代码块可见性；将 OpenTUI 从 0.5.3 升级到 0.5.10，修复流式响应完成后围栏代码消失的问题 |
| [**#5657**](https://github.com/HKUDS/nanobot/pull/5657) `[CLOSED]` | WebUI | 重构 WebSocket 出站消息编码：提取 `recovery_state` 与 `turn_end` 的独立编码器，统一 `send_payload` 原语——为后续 WebUI 消息可靠性的进一步改进打基础 |

其他已合并/关闭的 5 个 PR 未在列表中展开，但从整体趋势看，**WebUI 可用性是当前迭代重点**——从模型速度展示到会话标题生成，前端体验的"最后一公里"正在被逐一补齐。

---

## 4. 社区热点

### 🗣️ 话题一：飞书渠道多轮回复整合（评论最多）

[**#5567**](https://github.com/HKUDS/nanobot/issues/5567) `[OPEN]` — **4 条评论，2 周未关闭**

```
用户 @yrxeva 核心诉求：
飞书渠道中，agent 处理一条用户消息会回复 n 条消息
（工具提示、进度消息、最终回复分开发送），
希望整合为一条流式卡片，保持 用户1条 → agent1条 的对应关系。
```

**分析**：这是典型的渠道 UX 设计问题，涉及流式输出与工具调用阶段的合并策略。评论数位居今日首位，说明该问题在飞书用户中有一定共识。目前无直接关联 PR，属于**开放的产品优化方向**。

### 🗣️ 话题二：OpenCode session header 紧急适配（时效性最强）

[**#5661**](https://github.com/HKUDS/nanobot/issues/5661) `[OPEN]` — 当天创建/更新

```
OpenCode 官方公告：2026-09-06 起，
缺少 x-opencode-session header 的请求将丢失 prompt-cache 优化，
甚至可能报错。
```

**配套 PR**：[**#5662**](https://github.com/HKUDS/nanobot/pull/5662) `[OPEN]` `[priority: p1]` — 已提交实现，为 `OpenAICompatProvider` 附加会话 header。

**分析**：外部服务商策略变更驱动的强时效性适配，PR 已快速跟进，p1 优先级说明维护者认可其紧急性。值得关注合并速度。

### 🗣️ 话题三：WebUI 展示模型速度

[**#5631**](https://github.com/HKUDS/nanobot/issues/5631) `[CLOSED]` — 2 条评论，已被 [**#5660**](https://github.com/HKUDS/nanobot/pull/5660) 解决

**分析**：用户提到"类似 deepseek harness"，说明社区用户习惯参考竞品/AI 工具链的体验，**本轮已闭环**。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 问题 | 状态 | 说明 |
|---|---|---|---|
| 🟥 **高** | [**#5645**](https://github.com/HKUDS/nanobot/issues/5645)：0.3.0 默认缺失 Current Time runtime-context | `[CLOSED]` | 版本行为回归——0.2.2 自动注入，0.3.0 需要显式传入，影响所有依赖 `build_messages()` 直接调用的用户。虽已关闭，但建议在产品文档中标注该变更 |
| 🟧 **中** | [**#5644**](https://github.com/HKUDS/nanobot/issues/5644)：通道 locale 注册表并发加载时丢失 locale（如 `en`） | `[CLOSED]` | 启动竞态问题，在 WebUI 多 locale 并发加载场景下触发，属于边界条件 bug |
| 🟨 **中（修复 PR 已提交）** | 内存无界增长问题集群 | 3 个 PR 待合并 | 同一贡献者 @Shizoqua 提交了 3 个内存边界修复，呈现系统性的稳定性治理：<br>• [**#5665**](https://github.com/HKUDS/nanobot/pull/5665) MCP browser OAuth 流注册表无限增长<br>• [**#5664**](https://github.com/HKUDS/nanobot/pull/5664) 空闲会话 summary 缓存无限增长<br>• [**#5663**](https://github.com/HKUDS/nanobot/pull/5663) Mattermost 线程上下文缓存无限增长 |

其他 WebUI 相关修复 PR（待合并）：[**#5648**](https://github.com/HKUDS/nanobot/pull/5648) 与 [**#5658**](https://github.com/HKUDS/nanobot/pull/5658) 都指向会话标题生成逻辑——PR #5528 引入 `target_session_key` 后出现了回归，标题无法正确生成。

---

## 6. 功能请求与路线图信号

### 🔮 可能被纳入下一版本的新功能

| 功能 | 来源 | 信号强度 |
|---|---|---|
| **context 压缩可视化** | [**#5656**](https://github.com/HKUDS/nanobot/pull/5656)：新增 `/compact` 命令 + 结构化 `context_compaction` 生命周期事件 | ⭐⭐⭐ 功能完整，含测试，设计清晰 |
| **临时 runtime-context 块** | [**#5659**](https://github.com/HKUDS/nanobot/pull/5659)：为 `RuntimeContextBlock` 增加 `ephemeral` 标志，允许附带请求但不持久化重放 | ⭐⭐⭐ 解决 #5586，对会话上下文管理有实际价值 |
| **文件复制/移动工具** | [**#5626**](https://github.com/HKUDS/nanobot/pull/5626)：新增 `copy_file` 和 `move_file` 两个文件系统工具 | ⭐⭐ 用户期待的基础 agent 能力 |
| **aimlapi.com 内置 Provider** | [**#5666**](https://github.com/HKUDS/nanobot/pull/5666)：来自 aimlapi 官方团队的接入 PR（附带合作意向） | ⭐⭐ Provider 生态扩展信号 |
| **OpenCode session header 支持** | [**#5662**](https://github.com/HKUDS/nanobot/pull/5662) `[priority: p1]` | ⭐⭐⭐ 时效性驱动，大概率快速合并 |
| **飞书渠道单消息整合** | [**#5567**](https://github.com/HKUDS/nanobot/issues/5567) | ⭐⭐ 4 条评论的开放 issue，暂无 PR，属于渠道层 UX 优化 |

### 💡 值得关注的产品方向

- [**#5659**](https://github.com/HKUDS/nanobot/pull/5659) 引出了一个更深层的问题：**runtime-context 的生命周期管理**——哪些信息应持久化、哪些只应在当前请求有效。这是 agent 框架设计中的核心权衡。
- Heartbeat 系列 PR（#4551、#4549）从 6 月 26 日开放至今仍未合并，若维护者有意向，建议明确排期。

---

## 7. 用户反馈摘要

| 用户声音 | 来源 | 类型 |
|---|---|---|
| "飞书渠道里 agent 回复 n 条消息，体验较差，希望一条消息对应一条回复" | [**#5567**](https://github.com/HKUDS/nanobot/issues/5567) | 渠道 UX 痛点：工具调用、进度、最终回复应当被聚合展示 |
| "0.2.2 自动带上的 Current Time，0.3.0 里不见了，同样的 `ContextBuilder.build_messages()` 调用结果变了" | [**#5645**](https://github.com/HKUDS/nanobot/issues/5645) | 版本回归：升级用户对默认行为变化感到困惑 |
| "希望在 WebUI 中直接看到模型速度和上下文信息，类似 deepseek harness" | [**#5631**](https://github.com/HKUDS/nanobot/issues/5631) | 功能渴望：对比竞品/参考工具，用户需要可观察性 —— **已解决（#5660）** |
| "重复 OAuth 尝试在快速重启后会无限累积" | 见 [**#5665**](https://github.com/HKUDS/nanobot/pull/5665) | 资源管控：长运行场景下的内存稳定性诉求 |

---

## 8. 待处理积压 ⏳

### 长期未合并的 PR（开放超过 1 个月）

| PR | 提交时间 | 积压天数* | 说明 |
|---|---|---|---|
| [**#4551**](https://github.com/HKUDS/nanobot/pull/4551) feat(heartbeat): isolated_session 配置 | 2026-06-26 | ~71 天 | 允许共享会话上下文的心跳执行模式，含配置兼容处理 |
| [**#4549**](https://github.com/HKUDS/nanobot/pull/4549) feat(heartbeat): 更便宜的 model_override | 2026-06-26 | ~71 天 | 心跳独立模型配置，与 #4551 同一系列 |
| [**#5431**](https://github.com/HKUDS/nanobot/pull/5431) fix(agent): 上报后台任务失败 | 2026-08-18 | ~18 天

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-05

## 1. 今日速览

过去 24 小时项目保持高活跃度：共更新 34 条 Issue（新开/活跃 24 条，

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 · 2026-09-05

## 1. 今日速览

过去 24 小时 PicoClaw 仓库活跃度较高：无新版本发布，新增 / 活跃 Issue 4 条（2 个 Bug、2 个功能请求），PR 事件 23 条（其中 20 条结束流程，3 条待合并）。值得关注的是，今日关闭的 PR 中有大量 3-4 月创建的历史 PR（多为 stale 标签），属于批量清理动作；真正新增的活跃贡献集中在 MCP 生态文档（Parallel Search、Pilot Protocol 两个 setup 示例）。社区讨论焦点集中在 Web UI 长历史输入卡顿、IRC 长消息支持，以及 OpenAI 兼容自定义 Provider 的新需求上。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

- **汇总性合并 PR 完成**：[#1541](https://github.com/sipeed/picoclaw/pull/1541) 关闭，内容涉及合并 #1536 #1535 #1531 三项修复：集中媒体临时目录（media tempdir）、Channel DoS 加固、DeepWiki 徽章。其中 media tempdir 集中化与 agent 读路径扩展，有助于统一文件访问管理；Channel DoS 加固则提升了多用户场景下的稳定性。
- **MCP 生态文档新增（待合并）**：社区贡献者提交了两个 MCP setup 示例，分别为 [Parallel Search MCP（#3368）](https://github.com/sipeed/picoclaw/pull/3368) 和 [Pilot Protocol MCP（#3367）](https://github.com/sipeed/picoclaw/pull/3367)。前者为 PicoClaw 增加 Web 搜索 / 页面提取能力且无需 API key；后者补充了 Pilot 的 CLI 快速开始与健康检查命令。两者均处于待合并状态，反映社区对 MCP 接入的强烈兴趣。
- **批量清理历史 PR**：大量带 `[stale]` 标签的 PR（如 [#3337](https://github.com/sipeed/picoclaw/pull/3337)、[#1683](https://github.com/sipeed/picoclaw/pull/1683)、[#1854](https://github.com/sipeed/picoclaw/pull/1854)、[#2088](https://github.com/sipeed/picoclaw/pull/2088)、[#2090](https://github.com/sipeed/picoclaw/pull/2090)、[#2240](https://github.com/sipeed/picoclaw/pull/2240)、[#2298](https://github.com/sipeed/picoclaw/pull/2298) 等）于昨日集中关闭。这批 PR 覆盖 Telegram / Slack / 飞书渠道修复、exec 脚本预检加固、GitHub Copilot stdio 传输、xAI compat 支持等主题，若未经 review 合并而直接 stale 关闭，建议维护者复查这些修复是否已通过其他途径合入主线。

## 4. 社区热点

- [#3287 [Feature] Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)（10 条评论，2026-07-22 创建，stale）：讨论最活跃。核心矛盾是 IRC 512 字节限制导致长消息被客户端自动拆分，PicoClaw 会把拆分片段当作独立消息处理，破坏对话连贯性。用户期望利用 IRCv3 能力

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-05

## 1. 今日速览

过去 24 小时 NanoClaw 项目保持较高活跃度：共产生 2 条新 Issue、18 条 PR 更新（其中 3 条已关闭，15 条待合并），暂无新版本发布。值得关注的是，今日关闭的 3 条 PR 均为数月前创建的老 PR（#2403、#2231、#2232），说明维护者正在清理历史积压；同时大量来自核心团队的 provider 契约重构 PR 仍在持续推进。但今日新增的 2 个 Issue 均指向生产环境稳定性隐患，其中 #3716 直接关联 OOM 崩溃循环，需要维护者优先关注。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共有 3 条 PR 被关闭（全部为 CLAUDE 状态），是近期关闭数量较多的一天，且均完成历史积压清理：

- **[#2403] ci: replace bump-version with explicit Release workflow + concurrency guard** — 由 @glifocat 提交，创建于 5 月 10 日，今日关闭。将 CI 中的版本号自动升级流程替换为显式 Release workflflow，并增加并发保护，改进发布流程的可控性与稳定性。链接：https://github.com/nanocoai/nanoclaw/pull/2403

- **[#2231] feat(chat-sdk-bridge): add sendAsRaw flag to bypass adapter Markdown round-trip** — 由 @tamasPetki 提交，创建于 5 月 3 日，今日关闭。新增 `sendAsRaw` 标志，可绕过适配器的 Markdown 往返转换，使原始消息内容不被转义或格式重排。链接：https://github.com/nanocoai/nanoclaw/pull/2231

- **[#2232] fix(chat-sdk-bridge): fall back to URL fetch for adapters without fetchData** — 同为 @tamasPetki 提交，创建于 5 月 3 日，今日关闭。为缺少 `fetchData` 实现的适配器增加 URL 回退机制，提升 SDK 桥接层的兼容性。链接：https://github.com/nanocoai/nanoclaw/pull/2232

三条 PR 均已在 GitHub 上标记为 CLOSED，但由于数据中没有展示合并 commit 信息，无法确认是合入主分支还是直接关闭。若全部合入，则意味着 chat-sdk-bridge 的兼容性和内容完整性得到实质增强，且 CI 发布链路完成一次重要的工程化升级。

此外，目前有 15 条待合并 PR，其中多条来自核心团队的大型重构（provider 契约体系重构、skills 安装机制等），表明项目正处在一次平台架构升级的进行中阶段。

---

## 4. 社区热点

**#3716 — PreCompact conversation-archive 引发生产环境 OOM 崩溃循环（2 条评论，今日最活跃 Issue）**
链接：https://github.com/nanocoai/nanoclaw/issues/3716

该 Issue 由 @DawoudIO 报告，是今日唯一获得评论的 Issue：每次 `PreCompact` hook 触发时，都会向 `/workspace/agent/conversations/` 目录写入一个全新文件，包含整个对话历史的完整重新序列化内容，且完全没有轮转、上限或清理机制。作者指出这是其生产环境 OOM 崩溃循环的真正原因。虽仅 2 条评论，但直接指向一个高影响的生产稳定性问题，作者还承诺补充更多细节（摘要中写明 “unlike the actual…”），值得核心团队第一时间回应。

**#3714 — Operator 环境变量覆盖无法传入会话容器（0 评论）**
链接：https://github.com/nanocoai/nanoclaw/issues/3714

作为 #1820 的后续，报告中指出 3 个已在源码中记录文档的环境变量（auto-compact 窗口、transcript rotation 等）从未从宿主机转发到会话容器，导致这些"operator overrides"实际上不可用，除非手动打补丁。这暴露了配置文档与容器编排实现之间的一致性缺口。

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 是否已有修复 |
|---------|----------|------|-------------|
| 🔴 严重（生产事故） | [#3716](https://github.com/nanocoai/nanoclaw/issues/3716) | PreCompact 每次触发都全量重写对话归档文件，无轮转/清理机制，导致生产 OOM 崩溃循环 | ❌ 无修复 PR，需紧急设计归档轮转策略 |
| 🟠 中等（配置失效） | [#3714](https://github.com/nanocoai/nanoclaw/issues/3714) | 文档宣称的 operator 环境变量覆盖实际上从未注入 session 容器，需打补丁才能使用 | ❌ 无修复 PR，需调整容器编排层 |
| 🟠 中等（安全边界） | [#3717](https://github.com/nanocoai/nanoclaw/pull/3717) | `form...`（摘要被截断）— 嵌入的 payload 可关闭所在的 prompt block 并在其周围伪造结构，属于 prompt 注入类安全修复 | ✅ 已有 PR，待合并 |
| 🟠 中等（安全绕过） | [#3680](https://github.com/nanocoai/nanoclaw/pull/3680) | validateSpec 中存在 allowlisted-extra mount 绕过漏洞，可突破容器挂载安全限制 | ✅ 已有 PR，待合并，创建于 8/30 |
| 🔵 轻度（体验问题） | [#3718](https://github.com/nanocoai/nanoclaw/pull/3718) | Agent 间消息在接收方无反向目的地时无法识别真实发送者，导致合法请求被拒 | ✅ 已有 PR，待合并 |
| 🔵 轻度（体验问题） | [#3719](https://github.com/nanocoai/nanoclaw/pull/3719) | Agent 消息失败、审批延迟、投递失败等异常情况没有反馈给发起方 | ✅ 已有 PR，待合并 |

最重要的判断：#3716 是一个生产环境会持续触发 OOM 的严重缺陷，且目前没有任何修复 PR，建议核心团队尽快确认问题并规划修复方案；#3714 则意味着现有容器部署模式下部分已文档化配置实际不可用，影响运维可观测性。

---

## 6. 功能请求与路线图信号

从今日 PR 中可以看到项目正在多个方向推进，以下信号值得关注：

**大概率进入下一版本的能力：**

- **[#3715] feat: add Zapier MCP tool skill**（@glifocat）— 新增 operator skill，使特定 agent 组可访问 Zapier 托管的 MCP 服务器，且不将私有连接令牌写入 NanoClaw 配置。这是一条完整的 delivery/skill PR，含安装器 skill 和分组配置，可能作为官方 skill 集成进下一版本。链接：https://github.com/nanocoai/nanoclaw/pull/3715

- **[#3720] feat(skills): add opt-in source installation with guarded recovery**（@zvi-fried，core-team）— 新增 `ncl skills list/plan/apply` 结构化安装命令，默认关闭源码安装，只能由 operator 显式启用。安装边界和安全回收机制已经过设计，是 skill 分发机制的一次重要扩展。链接：https://github.com/nanocoai/nanoclaw/pull/3720

**架构演进信号：**

- **Provider 契约重构系列** — @zvi-fried 持续推动 provider 体系向 core-owned canonical 模式迁移。今日仍在列表中的相关 PR 包括：/add-cursor 安装 skill（#3355）、Cursor Agent SDK payload（#3356）、opencode provider contract（#3588）、codex provider contract（#3584）、OpenCode contract 安装 skill（#3722）、core-owned speed 属性（#3592）等。这些 PR 的共同方向是：将 provider 的指令文本和安装逻辑收归核心控制，provider 只声明类型化事实。若合入，NanoClaw 的 provider 生态将获得统一且可校验的契约规范。

- **A2A 通信质量提升** — #3718（sender 身份保留）和 #3719（失败反馈回源）共同构成 agent-to-agent 通信可靠性的补全。

- **#3721 fix(skills): require explicit installation and respect operator policy** — 强化 skill 安装流程，要求显式调用且不能绕过部署拒绝策略，与 #3720 配套，体现了安全加固方向。链接：https://github.com/nanocoai/nanoclaw/pull/3721

**可能的路线图空白：** #3714 所暴露的“环境变量 override 无法注入容器”问题若修复，可能引导出一个更完善的 operator 配置注入机制，值得关注。

---

## 7. 用户反馈摘要

今日从 Issue 和 PR 中可提炼以下真实用户反馈：

**来自 @DawoudIO（#3716）：**
> 痛点：生产环境 OOM 崩溃循环的直接原因竟是 PreCompact 每次触发都会无上限地写入完整对话历史的序列化文件。这个"write-a-brand-new-file-per-firing"的设计在高频对话场景下迅速耗尽磁盘/内存，用户强调该目录完全没有 rotation、cap 或 cleanup 机制——这是生产事故级别的体验痛点，说明当前 conversation archive 实现缺乏最基本的资源管理。

**来自 @nilsborg（#3714）：**
> 痛点：文档宣称的 operator overrides 实际上"nothing forwards them from the host into the session container"，用户发现不修改代码就无法使用这些配置项。这是文档与实现不一致导致的信任受损，且作为 #1820 的 follow-up，说明该问题已困扰用户一段时间。需求在于：容器化部署时应提供一套可靠的主机到容器的配置注入通道。

**来自 @petrolette（#3717，PR）：**
> 安全关注：提交者主动发现并修复了 composed prompt blocks 中的 payload 转义问题，说明社区中已有贡献者关注 prompt 注入攻击面，且愿意直接提交修复。

**来自 @Koshkoshinsk（#3718、#3719，PR）：**
> 体验映射：a2a 通信中"合法请求被拒"（sender 身份不可识别）和"失败无通知"（投递失败/审批延迟不反馈）两个问题相互关联，反映用户在多 agent 协作场景下对消息可追溯性和失败可诊断性的明确诉求。

---

## 8. 待处理积压

以下为当前需维护者关注的事项：

**长期未合入的核心 PR（超过 2 周）：**

- **[#3355] feat(skills): add /add-cursor provider install skill** — @zvi-fried 创建于 8/19，待合并已 17 天。作为 Cursor 这一重要 provider 的安装 skill，阻塞 Cursor 用户开箱即用体验。链接：https://github.com/nanocoai/nanoclaw/pull/3355
- **[#3356] feat(providers): add Cursor Agent SDK payload** — 与 #3355 同批次，创建于 8/19，待合并 17 天。若与 #3355 共同合入将完成 Cursor provider 的完整落地。链接：https://github.com/nanocoai/nanoclaw/pull/3356

**生产稳定性风险（今日新增）：**

- **[#3716] PreCompact conversation-archive 导致 OOM** — 生产事故级 bug，尚无修复 PR，建议优先指派人员回应并规划修复路径。链接：https://github.com/nanocoai/nanoclaw/issues/3716

**待跟进的老 Issue：**

- **[#3714] operator env overrides 未注入容器** — 作为 #1820 的 follow-up，已积累一定上下文，且涉及文档与实现的一致性，建议安排容器编排层的修复与测试。链接：https://github.com/nanocoai/nanoclaw/issues/3714

---

**总体评估：** NanoClaw 当前正经历一次以 provider 契约为核心的架构升级期，核心团队提交密集、方向明确，项目健康度总体良好。但今日出现的生产 OOM 类 Issue（#3716）提示对话归档模块需要立即补上资源管理机制；同时 17 天未动的 Cursor 相关 PR 建议尽快合入或给出明确状态，以降低积压风险。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 | 2026-09-05

## 1. 今日速览

过去 24 小时项目保持中高速迭代状态：共更新 7 条 Issues（2 条关闭，5 条活跃）与 13 条 PR（4 条关闭/合并，9 条待合并）。今日合并的 4 条 PR 覆盖 Telegram 配对体验修复、OpenAI 缓存键支持与 CI 稳定性提升，均为低风险、范围聚焦的改进。值得关注的是 Web UI 方向出现了 4 个由同一贡献者提出的体验优化问题与一一对应的 PR，形成了完整的问题-修复闭环。项目整体健康度良好，无新版本发布，未见高风险或大范围破坏性变更。


## 2. 版本发布

过去 24 小时无新版本发布。


## 3. 项目进展

今日合并/关闭的 4 条 PR 均已完成并合入主分支，整体上修复了 2 个 Telegram 集成 bug、补齐了 OpenAI 请求路径的缓存键能力，并消除了 CI 超时隐患。

- **Telegram 首次 /start 配对提示修复**（[#8054](https://github.com/nearai/ironclaw/pull/8054)）：修复未配对用户在 Telegram 中点 Start 时收到命令清单而非配对提示的问题。根因是命令准入流程先于配对状态检查执行，PR 调整了执行顺序，确保首次接触即获得配对引导。
- **Telegram 个人账户关联错误文案修正**（[#8073](https://github.com/nearai/ironclaw/pull/8073)）：当管理员未配置 `telegram_api_id`/`telegram_api_hash` 时，将此前模糊的 "Something went wrong while linking" 改为明确提示"管理员未配置"，避免将问题归咎于用户账户。
- **OpenAI 请求路径增加对话缓存键**（[#8062](https://github.com/nearai/ironclaw/pull/8062)）：在每个会话中派生稳定、域隔离的伪匿名 prompt-cache key，并在所有受支持的 OpenAI Responses/Compatible Chat Completions 请求上发送，覆盖 OpenAI、Claude 等模型路径，有望显著降低重复对话的延迟与成本。
- **CI 架构扫描超时余量扩充**（[#8060](https://github.com/nearai/ironclaw/pull/8060)）：`ironclaw_architecture_tests` 三个二进制在最新一次绿跑中耗时达 176.8s，逼近 CI profile 的 180s 硬性超时上限。PR 为其增加了实际的时间余量，消除偶发超时失败风险。


## 4. 社区热点

今日 Issues/PR 中评论数普遍为 0，没有形成明显多轮讨论的热点。但从更新频率和 PR 关联度来看，**Web UI 体验优化系列**（[#8063](https://github.com/nearai/ironclaw/issues/8063)～[#8066](https://github.com/nearai/ironclaw/issues/8066)）与**Telegram 配对/连接文案系列**（[#7955](https://github.com/nearai/ironclaw/issues/7955)、[#7956](https://github.com/nearai/ironclaw/issues/7956)、[#8074](https://github.com/nearai/ironclaw/issues/8074)）是两个明确的集中关注方向：

- **Web UI 命令体验优化**：4 个问题全部由 @italic-jinxin 提交，且在提交后 24 小时内均有对应 PR 跟进，反映出贡献者对聊天界面可用性的系统化打磨意图。
- **Telegram 集成文案一致性**：三种不同场景（未配对首次启动、个人账户关联未配置、已配对用户访问未连接频道）下的提示文案存在语义混淆，@thisisjoshford 连续多条 Issue + PR 在统一这套交互语言。


## 5. Bug 与稳定性

按严重程度排列：

**中等问题（已有 fix PR）：**

- **命令结果卡片累积后坍缩**（[#8066](https://github.com/nearai/ironclaw/issues/8066)，OPEN）— 多次执行 `/model` 等命令后，历史结果卡片在 flex 布局中不断收缩，最终仅剩边框细线。修复 PR 为 [#8071](https://github.com/nearai/ironclaw/pull/8071)（已打开，待合并）。
- **已配对用户在未连接频道中收到错误的 connect_required 文案**（[#8074](https://github.com/nearai/ironclaw/issues/8074)，OPEN）— 已在第三个 Telegram 文案相关 Issue 中提出，目前尚无对应 PR。
- **/cancel 请求在所有状态下均返回 400**（PR [#8059](https://github.com/nearai/ironclaw/pull/8059)）— `POST /api/v1/responses/{id}/cancel` 对进行中和已完成的任务都返回 `400 invalid_request`，且任务持续推进。该 PR 为新人贡献，仍待合并。

**低等问题（今日已关闭）：**

- Telegram 首次 /start 返回命令清单而非配对提示（[#7956](https://github.com/nearai/ironclaw/issues/7956)，已修复）
- Telegram 个人账户关联报错信息误导用户（[#7955](https://github.com/nearai/ironclaw/issues/7955)，已修复）

未发现崩溃级或数据安全级高危 Bug。


## 6. 功能请求与路线图信号

今日有 4 个新功能请求，全部来自 Web UI 体验方向，且每个均有对应的实现 PR，显示这些请求很可能进入下一版本：

| 功能请求 | 对应 PR | 状态 |
|---|---|---|
| [命令结果卡片可关闭/取消](https://github.com/nearai/ironclaw/issues/8064) | [#8069](https://github.com/nearai/ironclaw/pull/8069) | PR 待合并 |
| [斜杠命令菜单中命令元数据对齐](https://github.com/nearai/ironclaw/issues/8065) | [#8070](https://github.com/nearai/ironclaw/pull/8070) | PR 待合并 |
| [导航命令菜单时保持活动命令可见](https://github.com/nearai/ironclaw/issues/8063) | [#8068](https://github.com/nearai/ironclaw/pull/8068) | PR 待合并 |
| [命令结果卡片防止收缩坍缩](https://github.com/nearai/ironclaw/issues/8066) | [#8071](https://github.com/nearai/ironclaw/pull/8071) | PR 待合并 |

此外，一条 [OpenAI 兼容层 /cancel 修复 PR](https://github.com/nearai/ironclaw/pull/8059)（新人贡献）显示外部开发者正在补强 Responses API 的取消语义，可能成为 API 稳定性的下一个改进点。


## 7. 用户反馈摘要

由于今日各 Issue/PR 下评论数为 0，以下从 Issue 描述中提炼用户暴露的使用痛点：

- **首次使用引导不友好**（[#7956](https://github.com/nearai/ironclaw/issues/7956)）：Telegram 用户首次点击 Start 后收到的是冰冷的功能清单，而非引导配对的提示，对非技术用户造成了第一印象障碍。
- **错误归因错误**（[#7955](https://github.com/nearai/ironclaw/issues/7955)）：管理员未配置 Telegram API 凭据时，用户端收到"你的账户无法关联"的误导性提示，实则问题在服务端部署配置。这不仅造成用户困惑，也可能导致用户反复重试或误判自身操作问题。
- **命令面板细节影响效率**（[#8063](https://github.com/nearai/ironclaw/issues/8063)～[#8066](https://github.com/nearai/ironclaw/issues/8066)）：来自同一贡献者的 4 个问题共同指向一个使用场景——重度依赖斜杠命令的用户在频繁操作中遇到了视觉混乱（不对齐、卡片坍缩、不可关闭、活动项丢失），这些问题虽不致命，但积累起来会显著影响日常操作流畅度。


## 8. 待处理积压

- **[#7988](https://github.com/nearai/ironclaw/pull/7988)（已开放 7 天）**：`chore(agents): refresh codebase knowledge graph`，由 CI 机器人自动提交的代码库知识图谱刷新，属于常规性维护 PR。通常应快速合入，已积压一周值得关注。
- **[#8074](https://github.com/nearai/ironclaw/issues/8074)（OPEN）**：已配对用户在未连接共享频道时被错误展示配对提示文案。该问题与今日已修复的两条 Telegram 文案问题同源，但目前尚无对应的 fix PR，建议尽快跟进，以避免 Telegram 体验修复留下死角。
- **[#8059](https://github.com/nearai/ironclaw/pull/8059)（开放 2 天，新人贡献）**：OpenAI 兼容层 `/cancel` 在所有状态下均失败的问题。从描述看这是确定性的 API 缺陷，且已有修复 PR，建议维护者尽快 review 合入。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-05

## 1. 今日速览

项目呈高活跃度状态，过去24小时 PR 更新达 33 条，其中 28 条已合并/关闭，且连续两天发布新版本（2026.9.3 与 2026.9.4），说明迭代节奏紧凑、交付效率较高。值得注意的是，超过 70% 的合并 PR 来自同一核心开发者的长线分支（如 `Liuzhq/*` 系列），显示贡献者集中度较高。Issue 侧活跃度较低，仅 1 条更新，但其中包含一个在审计中被发现的 SQLite 存储层严重缺陷，至今仍处开放状态，需引起维护团队重视。整体看，项目功能开发与发布管道运转顺畅，但数据可靠性与社区多样性方面存在隐忧。

## 2. 版本发布

🧩 **LobsterAI 2026.9.4**（2026-09-04）

主要更新：
- **可交互应用内浏览器（in-app browser）恢复**：#2602 重新启用了可交互的应用内浏览器能力，之前（9.3 版）刚引入的功能在本次中进一步完善。
- **安装前确认机制**：#2609 在安装前增加了确认步骤，并支持安装/更新后退出应用，降低操作误触风险。
- **发布相关功能**：PR #2613 完善了订阅恢复引导与资源状态同步，覆盖 Artifact、资料库和站点详情页。
- 另包含 CI 构建时长优化（#2616）与 Windows Unicode 路径支持（#2615）等工程改进。

迁移注意事项：无明确破坏性变更，但用户在安装新版时需留意新增的“安装前确认”交互，可能会改变原有静默安装习惯。

🧩 **LobsterAI 2026.9.3**（2026-09-03）

主要更新：
- **CoWork 登录提示**：#2573 未认证用户在尝试聊天时，若无自定义模型配置，将弹出专属引导弹窗，提升新手引导体验。
- **应用内浏览器初次实现**：#2574 初步引入可交互的应用内浏览器，为后续版本的应用内 Web 体验奠定基础。

迁移注意事项：无已知破坏性变更。

## 3. 项目进展

过去 24 小时共合并/关闭 28 个 PR，代码库在各功能域均有实质推进，核心进展包括：

**🔓 订阅与发布系统**
- [#2613 feat(publishing): 完善订阅恢复引导与资源状态同步](https://github.com/netease-youdao/LobsterAI/pull/2613) ✓ 已合并
  - 在 Artifact、资料库和站点详情中增加订阅恢复入口，区分自动恢复与订阅后重新部署两种恢复方式，并补全相关埋点与测试。对商业化落地是重要一步。

**💬 CoWork 体验优化**
- [#2612 fix(cowork): preserve model display during login refresh](https://github.com/netease-youdao/LobsterAI/pull/2612) ✓ 已合并
  - 修复登录刷新期间模型元数据暂时为空时，模型名称/状态消失的问题，同时避免展示过期模型，兼顾稳定与一致性。
- [#2573 feat(cowork): show login prompt before unauthenticated chat](https://github.com/netease-youdao/LobsterAI/pull/2573) ✓ 已合并
  - 未登录 + 未配置自定义模型时，发送消息前先弹出欢迎引导，不干扰已有的订阅、语音登录等提示。

**🖥️ 浏览器与桌面端能力**
- [#2617 fix(browser): improve in-app login and tab controls](https://github.com/netease-youdao/LobsterAI/pull/2617) ⏳ 待合并
  - 改进登录反馈可关闭性、保存凭据后保持设置页打开，并将页面下拉切换改为可滚动标签条。
- [#2615 fix(browser): support Unicode Windows install paths](https://github.com/netease-youdao/LobsterAI/pull/2615) ✓ 已合并
  - 修复 Windows 下含中文字符的安装路径无法启动浏览器 MCP 的问题。
- [#2503 fix(electron): add edit context menu for text inputs](https://github.com/netease-youdao/LobsterAI/pull/2503) ✓ 已合并
  - 为文本输入框增加剪切/复制/粘贴/全选右键菜单，仅作用于原生文本控件，不影响对话区和自定义菜单。

**📐 界面与交互细节**
- [#2501 fix(skills): portal upgrade progress overlay](https://github.com/netease-youdao/LobsterAI/pull/2501) ✓ 已合并
  - 技能升级进度遮罩改为通过 `document.body` 渲染，保证覆盖完整应用外壳；新增升级流程各阶段诊断日志。
- [#2599 fix(im): improve bot card layout](https://github.com/netease-youdao/LobsterAI/pull/2599) ✓ 已合并
  - 多实例机器人卡片限制为双列响应式布局，新增机器人卡片保持紧凑，卡片内容垂直居中。

**其他合并的 PR** 还包括语音额度文案更新（#2603）、分析事件追踪（#2596）、侧边栏提示淡出（#2532）、插件安装弹窗滚动修复（#2520）、消息选择保持（#2521）等多个体验修复。

## 4. 社区热点

🔥 **唯一且最活跃的 Issue：[#1071 [OPEN] SQLite 存储层三个数据完整性/可靠性缺陷](https://github.com/netease-youdao/LobsterAI/issues/1071)**

- 作者：@MaoQianTu | 创建于 2026-03-30 | 最近更新 2026-09-04 | 评论 1
- 核心诉求：作者对 SQLite 存储层进行了代码审计，指出三个可并行导致生产安全事故的缺陷：
  1. **`ON DELETE CASCADE` 失效**：`cowork_messages` 表的级联删除外键在默认 SQLite 配置下不生效，导致删除会话后孤儿消息无限累积；
  2. **`save()` 非原子写**：写入非原子，崩溃时可能损坏数据文件；
  3. **`storeInitPromise` 超时后永久故障**：初始化超时后无恢复机制，功能永久失效。

该 Issue 在 9 月 4 日被更新，说明讨论仍在持续。但由于评论数较少，尚未形成广泛社区共鸣。这可能是技术深度较高、普通用户难以评估，也可能是项目维护者尚未给予足够回应的信号。

## 5. Bug 与稳定性

按严重程度排序：

**🔴 严重 — 数据丢失/永久故障风险**
- **SQLite 存储层三个缺陷**：[Issue #1071](https://github.com/netease-youdao/LobsterAI/issues/1071)
  - `ON DELETE CASCADE` 失效导致孤儿消息累积；`save()` 非原子写可致崩溃后数据损坏；`storeInitPromise` 超时后永久不可恢复。
  - **⚠️ 尚无对应 fix PR**，目前仍处开放状态，建议尽快确认并指派修复计划。

**🟡 中等 — 特定场景功能异常**
- **Windows Unicode 路径失败**：[#2615 fix(browser): support Unicode Windows install paths](https://github.com/netease-youdao/LobsterAI/pull/2615) ✅ 已合并
  - Windows 中文路径下浏览器 MCP 启动失败，本次已通过切换到 UTF-8 编码读取可执行路径解决。
- **测试模式服务端 API 地址错误**：[#2614 fix(config): 修正测试模式服务端 API 地址](https://github.com/netease-youdao/LobsterAI/pull/2614) ✅ 已合并
  - 将默认地址从开发内网环境切换回标准内网环境，避免测试模式下请求到错误服务。

**🟢 低 — 交互体验缺陷**
- **浏览器登录保存反馈不可消除**：[#2617 fix(browser): improve in-app login and tab controls](https://github.com/netease-youdao/LobsterAI/pull/2617) ⏳ 待合并
- **登录刷新时模型显示消失**：[#2612 fix(cowork): preserve model display during login refresh](https://github.com/netease-youdao/LobsterAI/pull/2612) ✅ 已合并
- **技能升级遮罩未覆盖全应用**：[#2501 fix(skills): portal upgrade progress overlay](https://github.com/netease-youdao/LobsterAI/pull/2501) ✅ 已合并
- **插件安装弹窗长错误遮挡操作按钮**：[#2520 fix(plugins): keep install modal usable with long errors](https://github.com/netease-youdao/LobsterAI/pull/2520) ✅ 已合并

## 6. 功能请求与路线图信号

今日未出现全新的用户功能请求 Issue，但从近两日 Release 与 PR 中可观察到的路线图信号：

- **📌 应用内浏览器持续迭代**：从 9.3 首次引入（#2574），到 9.4 恢复可交互（#2602），再到 #2617 待合并的登录与标签页改进，说明应用内浏览器是当前产品重点方向之一，未来或承载更多登录态与 Web 内容场景。
- **📌 订阅商业化闭环逐步完善**：#2613 将订阅恢复入口嵌入到 Artifact、资料库、站点详情等多处，并区分自动恢复与重新部署两种恢复路径。配合 #2603 的免费试用文案更新，可以看出订阅转化与恢复是当前变现关键路径。
- **📌 登录引导体验被系统性地打磨**：#2573 的登录前弹窗、#2612 登录刷新模型保留、#2596 登录 CTA 埋点、#2532 登录提示淡出系列 PR，构成一套完整的登录漏斗优化方案。
- **📌 CI 工程效能受到关注**：#2616 将 npm audit 限时 90 秒并保留非阻塞审计行为的做法，暗示项目对 CI 时长和稳定性的敏感度正在提升。

预计下一版本（2026.9.5）可能纳入 #2617（in-app 浏览器标签交互改进）及其他待合并 PR。

## 7. 用户反馈摘要

基于今日唯一的活跃 Issue：

- **反馈者**：@MaoQianTu（疑似技术用户/审计者）
- **核心痛点**：用户对 SQLite 存储层的数据安全性表达了强烈担忧，认为三个缺陷“均可在生产环境下造成数据丢失或功能永久故障”。这类反馈通常意味着用户在使用中经历过或通过代码审计发现深层风险。
- **隐含期待**：用户期望存储层具备工业级可靠性——级联删除应严格生效、写入应原子化、初始化失败应可重试恢复。同时也暗示项目可能缺少对存储层的自动化测试与故障注入验证。

从整体 PR 活跃度来看，公开社区 Issue/评论参与度并不高（今日仅 1 条 Issue 更新），社区讨论氛围偏冷，主要贡献仍集中在少数核心维护者。这既是高效开发的体现，也可能导致用户侧长尾问题反馈滞后。

## 8. 待处理积压

⏰ **Issue 积压**

- [#1071 SQLite 存储层三个数据完整性/可靠性缺陷](https://github.com/netease-youdao/LobsterAI/issues/1071) — **已开放 159 天**（2026-03-30 创建），最近更新于 9 月 4 日。属于高影响、低响应优先级的关键数据安全 Issue，强烈建议维护者在下一个迭代周期内给出明确回应或修复计划。

⏳ **待合并 PR（5 条）**

- [#2617 fix(browser): improve in-app login and tab controls](https://github.com/netease-youdao/LobsterAI/pull/2617) — 应用内浏览器登录与标签条改进，已获得功能完成度，等待 review。
- 另有 4 条 PR 在数据概览中显示为 OPEN 状态（待合并），具体内容未在最新列表中完全展示，建议维护者集中 review 以避免合并积压。

---

*数据来源：GitHub（netease-youdao/LobsterAI）*  
*统计窗口：2026-09-04 ~ 2026-09-05*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-05）

## 1. 今日速览

过去 24 小时 Moltis 共有 1 条 Issue 更新（新开 1 条）和 1 条 PR 更新（待合并 1 条），没有新版本发布。整体活跃度处于“平稳但偏低”的状态：没有 Bug 或稳定性问题被报告，唯一的 Issue 是功能增强请求，唯一的 PR 是外部代理集成功能。项目当前无明显阻塞，主线健康，但需要维护者对新增 issue/PR 及时进行 triage 和 review。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有合并/关闭的 PR，因此没有代码合入主干。当前唯一处于待合并状态的 PR 是：

- [#1258 [OPEN] feat(external-agents): add direct AGY streaming](https://github.com/moltis-org/moltis/pull/1258)  
  该 PR 为 Moltis 增加对官方 `agy` CLI 的一等流式传输支持，复用其 Google OAuth 会话，避免额外依赖 Gemini CLI 或 API Key；同时将 AGY 的 `stream-json` 输出转换为 Moltis 的 text、reasoning、notice、tool、sub-agent、usage 及 resumable-session 等消息类型。如果该 PR 被合并，将显著增强 Moltis 与外部 AI 代理的互操作性，并降低用户接入 AGY 的配置成本。

---

## 4. 社区热点

今日没有评论数或 👍 数明显突出的讨论，整体社区互动较低。相对值得关注的是当天新开的功能请求：

- [#1259 [OPEN] [enhancement] [Feature]: Configurable default reasoning/thinking level (persist across sessions)](https://github.com/moltis-org/moltis/issues/1259)  
  用户希望设置默认的 reasoning/thinking 等级，并在多个会话之间持久化。这反映了用户对“减少重复配置、保持个人偏好”的需求。

另外，PR #1258 是过去两天内最实质的开发动作，虽然没有评论，但属于功能型 PR，是当前社区最值得关注的技术进展。

---

## 5. Bug 与稳定性

今日没有报告 Bug、崩溃、回归或稳定性相关问题。当前活跃的 Issue 为 enhancement 类型，活跃 PR 为 feature 类型，均不涉及稳定性风险。

---

## 6. 功能请求与路线图信号

- [#1259：可配置默认 reasoning/thinking level](https://github.com/moltis-org/moltis/issues/1259)  
  该请求希望 Moltis 能记住用户的默认推理等级，并跨会话持久化。这指向“会话偏好记忆”和“用户自定义体验”方向，是典型的效率型需求。

- [#1258：直接 AGY streaming 支持](https://github.com/moltis-org/moltis/pull/1258)  
  这个 PR 表明项目在积极扩展外部代理生态，尤其是 AGY 这类 CLI 工具的接入。通过复用 OAuth 会话和避免额外 API Key，项目试图降低用户接入第三方代理时的摩擦。

综合来看，如果 #1258 被合并，很可能进入下一个 minor 版本；#1259 则还需要维护者确认设计边界，例如是否需要支持 profile 级设置、是否与现有会话配置合并等。

---

## 7. 用户反馈摘要

目前两个活跃条目都没有评论，因此缺少直接用户讨论内容。但从 Issue 摘要和 PR 描述中可以提炼出两点真实诉求：

- 用户希望减少重复操作：`#1259` 的痛点在于每次使用不同 reasoning/thinking level 时都需要手动调整，无法记住默认值。
- 开发者/用户希望降低外部代理接入成本：`#1258` 强调复用已有 Google OAuth 会话、避免要求 Gemini CLI 或 API Key，反映了对“更轻量、更少凭证依赖”的明显偏好。

---

## 8. 待处理积压

当前没有长期未响应的 Issue 或 PR。两个活跃条目都处于刚创建或待 review 状态：

- [#1258 PR](https://github.com/moltis-org/moltis/pull/1258) 自 2026-09-04 创建后处于待合并状态，建议维护者尽快安排 reviewer，避免外部代理功能长时间滞留。
- [#1259 Issue](https://github.com/moltis-org/moltis/issues/1259) 创建于 2026-09-05，尚未有维护者响应，建议添加 `enhancement` 标签并启动 triage。

总体来看，项目当前无严重积压，但需要处理上述新增 issue/PR，以维持迭代节奏。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-05

> 数据来源：github.com/agentscope-ai/QwenPaw（CoPaw 项目） | 统计窗口：过去 24 小时
> 数据概览：Issues 更新 28 条（新开/活跃 18，关闭 10）｜PR 更新 37 条（待合并 23，已合并/关闭 14）｜新版本发布 0 个


## 1. 今日速览

过去 24 小时项目保持高活跃度：共更新 **28 条 Issue**（新开/活跃 18 条）与 **37 条 PR**（其中 14 条已合并/关闭），但无新版本发布，整体处于 **2.2.x 迭代周期的密集开发与问题收敛阶段**。社区讨论呈现两个明显热点：一是 **QwenPaw Hub 多租户版**（#7318）引发的路线图畅想（22 条评论），二是**任务执行生命周期体验**（停止、409 冲突、Loop 模式状态丢失）成为用户抱怨最集中的领域。稳定性方面，飞书会话队列卡死（#7534）、cron 任务重复调度（#7476）等可用于生产环境的关键问题仍在排查中。值得肯定的是，MCP 工具白名单未生效（#7470）和 Loop 模式参数丢失（#7552 / #7555）两个问题已迅速被对应 fix PR 跟进（#7504 / #7560），体现了维护团队对高优问题的响应速度。


## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases 为空）。

> 背景：当前 Issue 中出现的版本号包括 `2.2.0b5`、`2.2.0-beta.7`、`2.2.0`、`2.2.1b1` 等，说明项目正处于 **2.2.x 的 beta/RC 密集迭代阶段**。2.2.0 的正式版尚未发布。


## 3. 项目进展

今日合并/关闭的 PR 共 14 条，其中对项目有实质推进意义的主要包括：

- **[#7504 [已合并] fix(mcp): enforce per-tool whitelist on the agent runtime path](https://github.com/agentscope-ai/QwenPaw/pull/7504)**
  作者 @yuanxs21 修复了 MCP 按工具白名单在 agent 运行时路径上不生效的问题——此前 `card.config.tools` 仅用于 Console 展示，被禁用的 MCP 工具仍然出现在 agent 工具集中并可被调用。对应 Issue [#7470](https://github.com/agentscope-ai/QwenPaw/issues/7470) 已关闭。**这是 2.2.0 的一个安全性修复。**

- **[#7183 [已关闭] feat(skills): add workspace-scoped preload configuration](https://github.com/agentscope-ai/QwenPaw/pull/7183)**
  作者 @wuyak 为 Skill 增加了 workspace 级别的 `preload` 配置（默认为 `on_demand`），允许将高频核心 Skill 预加载，避免模型在每轮新会话中重复发现工具。对应 Feature Issue [#7182](https://github.com/agentscope-ai/QwenPaw/issues/7182) 已关闭。该功能属于体验优化向，减少首轮工具调用延迟。

- **[#7560 [已合并] fix(console): preserve selected loop mode query](https://github.com/agentscope-ai/QwenPaw/pull/7560)**
  作者 @zhaozhuang521 修复了 Loop 模式（Goal/Mission）选择后无法传递到后端的问题——通过 SDK beforeSubmit 返回携带 loop query，以 `inputData.query` 为准，防止重复添加 loop 前缀。对应 Issue [#7552](https://github.com/agentscope-ai/QwenPaw/issues/7552) 已关闭。

整体来看，今日 PR 集中在 **Bug 修复**（MCP 安全、Loop 模式、浏览器标签分组）与 **配置能力增强**（Skill 预加载、环境变量管理），尚未有大型功能合入。


## 4. 社区热点

**[#7318 [OPEN][讨论] QwenPaw Hub 多租户版将于 2.2.0 推出：接下来该做什么？（22 评论 / 3 👍）](https://github.com/agentscope-ai/QwenPaw/issues/7318)**

这是近期热度最高的讨论帖，由 @rayrayraykk 发起。QwenPaw 最初定位为个人 AI 助手，但社区多次提出团队化运行需求，QwenPaw Hub 即是对此的回应。讨论中关联了此前 [#2324 Multi-user access and admin-managed skills](https://github.com/agentscope-ai/QwenPaw/issues/2324) 等社区请求。22 条评论表明多租户/团队协作方向需求强烈，用户正在积极参与 2.2.0 的功能规划。

**[#7505 [OPEN][问答] qwenpaw 访问局域网 LLM SERVER 频繁出现 client disconnect 导致重试直至超时失败（12 评论）](https://github.com/agentscope-ai/QwenPaw/issues/7505)**

用户 @yjyz1011 反馈通过 LM Studio Server 访问局域网模型（qwen3.8 flash next q3）时频繁遇到 `client disconnect`，导致 LLM 访问反复重试、最终超时。12 条评论说明这不是个例，局域网/自托管 LLM 场景下的连接稳定性是真实痛点。

**[#6921 [CLOSED][Bug] 多步骤任务经常在输出规划后无提示停止，需用户说“继续”才继续执行（12 评论）](https://github.com/agentscope-ai/QwenPaw/issues/6921)**

此问题虽然已关闭，但 12 条评论使它成为近期的热点问题之一。用户 @rerbin 在 Windows 11 + 2.1beta2 上多次复现：模型输出"Now 2.1, 3.1, 3.2. Let me do all three."之后停止，无任何视觉提示，需要用户手动触发“继续”。这类"静默中断"严重损害用户体验，背后可能涉及 Agent 任务循环的结束条件判断问题。


## 5. Bug 与稳定性

按严重程度排列如下：

**高严重度 — 数据安全/任务失控**

- **[#7567 [CLOSED] 执行中的任务点停止后 UI 显示已停止，但实际仍在执行](https://github.com/agentscope-ai/QwenPaw/issues/7567)**
  用户 @rerbin 在 2.2 web 版反馈：点击停止后，输入框下方表示执行的 □ 图标消失、变为可发送状态，用户据此提交了修正指令，却触发 409 报错。刷新页面后发现原任务**仍在执行**有误的指令。属于停止信号丢失/未真正取消执行的问题，可能造成误操作和数据污染。该 Issue 被标记 `Close-and-review-later` 关闭，需要维护者跟进评审。

- **[#7476 [OPEN] cron 任务在 misfire_grace 窗口内被重复调度，备份脚本执行两次](https://github.com/agentscope-ai/QwenPaw/issues/7476)**
  用户 @feng183043996 反馈：每日 06:30 的 cron 备份任务被触发两次，同一时间生成两个间隔仅 17-48 秒的备份文件，可能导致数据覆盖或存储膨胀。与调度器时间窗口（misfire_grace）有关，需要核心调度逻辑修复。

**中高严重度 — 会话静默无响应**

- **[#7534 [OPEN] 飞书 session 的 queue consumer 长驻卡死，会话静默无响应，新消息无法恢复](https://github.com/agentscope-ai/QwenPaw/issues/7534)**
  用户 @feng183043996 报告：飞书私聊会话运行数小时后，某条高优先级消息（priority=10）处理完后 consumer 不再拉取下一条，不崩溃、无 Traceback，队列永远不空。之后同一 session 的普通消息（priority=20）到达也无法新建消费者。**该问题会导致渠道消息永久丢失**，需要紧急排查。

**中严重度 — 功能不可用/功能异常**

- **[#7559 [OPEN] 任务执行中通过对话框新发消息触发 409 报错，而非进入消息队列](https://github.com/agentscope-ai/QwenPaw/issues/7559)**
  用户 @rerbin 反馈：任务执行中通过对话框提交文件，直接报 `409 {"detail":"A task is alrea...`。用户认为新消息应进入队列等待而非报错。当前行为不符合用户的队列预期。

- **[#7549 [OPEN] 模型请求以 assistant 文本回复结尾时被 Volcengine Ark Responses API 拒绝（400）](https://github.com/agentscope-ai/QwenPaw/issues/7549)**
  用户 @xiaoka76 反馈：当对话 `input` 以 assistant 的 `output_text` 结尾而非用户消息或工具结果时，Volcengine Ark 返回 400 错误。属于特定模型提供商的协议兼容性问题，影响火山引擎用户。

- **[#7554 [OPEN] Windows 下 Shell 工具子进程继承控制台 stdin，读取 stdin 的命令挂起整个 cmd 且 Ctrl+C 无法杀死](https://github.com/agentscope-ai/QwenPaw/issues/7554)**
  用户 @Tonyin1652 反馈：Windows 控制台环境下，agent 执行读取 stdin 的 shell 命令时，子进程继承了服务控制台 stdin，导致共享 cmd 控制台挂起。需要 `CREATE_NEW_PROCESS_GROUP` 及 `stdin=DEVNULL` 处理。

- **[#7552 [CLOSED] Loop 模式选择（Goal/Mission）未传输到后端（已有 fix PR #7560）](https://github.com/agentscope-ai/QwenPaw/issues/7552)**
  已由 [#7560](https://github.com/agentscope-ai/QwenPaw/pull/7560) 修复并合并。

- **[#7555 [CLOSED] Loop 模式选择在切换页面后回退显示为“默认”（已有 fix PR #7560）](https://github.com/agentscope-ai/QwenPaw/issues/7555)**（同日由 #7560 修复）

- **[#7469 [OPEN] ReMe 后台 embedding/indexing 任务失败——`as_embedding:default accessed before start()`，新记忆无法索引（静默失败）](https://github.com/agentscope-ai/QwenPaw/issues/7469)**
  用户配置 OpenAI-compatible embedding 后端后，ReMe 后台索引任务静默失败，新记忆不生效。

**低严重度 — 体验/一致性**

- **[#7545 [CLOSED] 桌面端聊天输入框右键无“复制”选项（网页端正常）](https://github.com/agentscope-ai/QwenPaw/issues/7545)**
- **[#7548 [OPEN] 对话切换或重启后导航记录丢失，早期消息不可见但 history.db 中仍在](https://github.com/agentscope-ai/QwenPaw/issues/7548)**
- **[#7023 [CLOSED] 桌面端启动时阻塞 ~60 秒安装 managed Playwright Chromium，无跳过/懒加载选项](https://github.com/agentscope-ai/QwenPaw/issues/7023)**

**已有关联 fix PR 的 Bug 汇总：**

| Issue | 问题 | Fix PR | 状态 |
|---|---|---|---|
| [#7470](https://github.com/agentscope-ai/QwenPaw/issues/7470) | MCP 按工具白名单未在运行时生效 | [#7504](https://github.com/agentscope-ai/QwenPaw/pull/7504) | ✅ 已合并 |
| [#7552](https://github.com/agentscope-ai/QwenPaw/issues/7552) | Loop 模式选择未传到后端 | [#7560](https://github.com

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报（2026-09-05）

## 1. 今日速览

- 过去 24 小时 GitHub 上无新增 Issue，也无新增或关闭的 Pull Request，社区讨论与代码贡献处于静默状态。
- 项目发布了 3 个新版本（v1.9.3、v1.9.4、v1.9.5），表明维护者正在密集迭代，主要通过版本发布推动功能优化与缺陷修复。
- 从版本注释可见，近期重点在于解决后端连接稳定性、未知发件人识别、隐私模式扩展等方向，项目活跃度体现在发布节奏而非 GitHub 互动上。
- 整体项目健康度良好：无堆积问题、无阻塞性 PR，发布流程顺畅，但外部贡献者参与度较低。

## 2. 版本发布

过去 24 小时连续发布了 3 个版本，均为功能迭代与 Bug 修复，未发现破坏性变更或迁移警告。

### v1.9.5
- **改进**：在后端部署关闭连接后自动重新订阅所有频道，避免应用停留在“看似健康但无事件推送”的 socket 上。
- **修复**：Gateway 重启导致的中断客服调度现在会重放，而不是丢弃，确保会话不中断。
- **链接**：[v1.9.5 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.5)

### v1.9.4
- **改进**：未知发件人识别会按顺序处理完整未读对话，并明确说明保留策略导致更早消息被丢弃，避免误判“从未提及”。
- **改进**：识别结果通过现有联盟订阅推送投递，提高消息触达效率。
- **链接**：[v1.9.4 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.4)

### v1.9.3
- **新功能**：自动对未知发件人发起识别任务，并在面板中可读化显示未知发件人与协作工具的活动。
- **新功能**：隐私模式扩展，可掩蔽卖家店铺名、产品名、图片和 SKU；同时修复了表格交互问题。
- **链接**：[v1.9.3 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.3)

> 建议升级到最新 v1.9.5，以获取连接稳定性修复。如需使用隐私模式新能力，需确认 v1.9.3 相关配置项。

## 3. 项目进展

今日无 PR 合并或关闭记录，因此没有通过 PR 推动的具体功能变更。但连续发布的 3 个版本带来了显著进展：
- 后端连接健壮性提升（v1.9.5）
- 未知发件人识别流程完善（v1.9.3、v1.9.4）
- 隐私保护能力扩展（v1.9.3）

这些更新直接改善了 Copilot 在真实环境中的可靠性与合规性，项目整体向前迈进了关键一步。

## 4. 社区热点

今日无 Issue 或 PR 更新，因此没有活跃的社区讨论。版本发布本身可能引发后续反馈，但目前暂无评论可分析。

## 5. Bug 与稳定性

今日报告的 Bug 为 0 条。不过从版本描述中可以看出，v1.9.5 修复了以下稳定性问题：
- 后端部署断开连接后，应用仍持有“健康但无事件”的 socket（中等严重度）
- Gateway 重启导致客服调度中断（高严重度，因影响会话连续性）

这两个问题已在 v1.9.5 中修复，无需额外跟踪。

## 6. 功能请求与路线图信号

今日无新增功能请求。但从版本发布内容可以推断下一步方向：
- **自动化识别与可观测性**（v1.9.3）表明团队在加强 AI 代理的自主行为可视性。
- **隐私模式增强**（v1.9.3）显示合规与数据脱敏是重要路线图元素。
- **连接自愈能力**（v1.9.5）是稳定性优先的信号。

这些方向大概率会延续到后续版本，例如更细粒度的隐私控制或更智能的断线重连策略。

## 7. 用户反馈摘要

因今日无 Issue 评论，无法提炼直接用户反馈。但从版本更新内容反推，用户可能曾遇到的问题包括：
- 后端重启后应用收不到事件，需要手动重连
- 未知发件人无法被准确识别，导致会话信息缺失
- 隐私模式无法覆盖店铺名、产品名等敏感字段

这些痛点已在新版本中针对性解决。

## 8. 待处理积压

当前无长期未响应的重要 Issue 或 PR。项目积压为 0，维护者响应迅速，整体健康度高。

---

*数据来源：[EasyClaw GitHub](https://github.com/gaoyangz77/easyclaw)，统计时间截至 2026-09-05。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*