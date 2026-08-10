# OpenClaw 生态日报 2026-08-10

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-10 03:58 UTC

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

# OpenClaw 项目动态日报 — 2026-08-10


## 1. 今日速览

过去24小时项目活跃度极高：共产生 500 条 Issue 更新（新开/活跃 443，关闭 57）与 500 条 PR 更新（待合并 320，合并/关闭 180），反映出社区参与度和维护响应均处于高位。讨论焦点集中在消息丢失/静默回复失败（#121058、#116277）与多通道上下文装配/副本消息问题（#69208、#96242）两大方向，且均出现高评级的“diamond lobster”级问题标签。今日无新版本发布，但多个人工智能/维护者标记的 PR 已进入“ready for maintainer look”阶段，说明合并管线较为顺畅。整体健康度良好，但P0/P1级消息丢失类问题持续反复出现，是需要优先关注的稳定性风险点。


## 3. 项目进展

今日合并/关闭 PR 180 条，整体推进方向集中在以下几类：

**稳定性与可靠性加固**
- [fix(telegram): preserve unsent media while deduplicating streamed replies (#121141)](https://github.com/openclaw/openclaw/pull/121141) — 修复 Telegram 流式回复中附件的重复投递问题，`diamond lobster` 级 PR。
- [fix(memory): session sync deletes and re-embeds every indexed chunk as transcripts grow (#103201)](https://github.com/openclaw/openclaw/pull/103201) — 针对 #40919 的会话记忆同步性能退化问题，将全量删除重插改为增量方案。
- [fix(sessions): report archive cleanup in sessions cleanup (#97103)](https://github.com/openclaw/openclaw/pull/97103) — 修复 `sessions cleanup --dry-run` 无法预览已过期存档文件的问题。
- [perf(sqlite): memory-map reads on local-filesystem databases (#115138)](https://github.com/openclaw/openclaw/pull/115138) — 为 SQLite 启用 `mmap_size`，减少事件循环阻塞。
- [fix(memory): dreaming subagents ignore the configured maxConcurrent limit (#117595)](https://github.com/openclaw/openclaw/pull/117595) — 修复内存 dreaming 并发超限导致的 KV cache 耗尽问题。

**架构与代码卫生**
- [refactor: consolidate coercion helpers (#121366)](https://github.com/openclaw/openclaw/pull/121366) — 统一分散在数百处局部helper的类型强制转换逻辑，降低行为漂移风险。
- [refactor(channels): flatten channel-turn dispatch naming layers (#121308)](https://github.com/openclaw/openclaw/pull/121308) — 精简渠道事件分发的六层命名/别名。
- [refactor: remove dead branches and test-only helpers (#121345)](https://github.com/openclaw/openclaw/pull/121345) — 清理死代码与测试专用helper，减少协议审查摩擦。

**安全加固**
- [feat(security): require acknowledgement for install policy warnings (#116489)](https://github.com/openclaw/openclaw/pull/116489) — 插件安装时强制要求安全策略警告确认，集成 ClawScan/Semgrep。
- [fix(cli): warn that attach --print-config prints a live bearer token (#105033)](https://github.com/openclaw/openclaw/pull/105033) — 对敏感凭证明文输出增加警告。

**UI/UX**
- [fix(ui): name new session groups in an owned dialog instead of a browser prompt (#121249)](https://github.com/openclaw/openclaw/pull/121249) — 将浏览器原生弹窗替换为 OpenClaw 自有对话框。
- [fix(ui): rotating another device's token ends with nothing on screen (#121361)](https://github.com/openclaw/openclaw/pull/121361) — 修复 WebUI 设备令牌轮换后白屏问题。

> 注：以上大部分 PR 标为“OPEN”，但今日有 180 条 PR 标记为“已合并/关闭”，本文只列出代表性条目。


## 4. 社区热点

**[#116277 — DeepSeek v4 Flash 静默回复失败（已关闭，196 评论）](https://github.com/openclaw/openclaw/issues/116277)** 和 **[#121058 — 关闭后仍持续发生（19 评论）](https://github.com/openclaw/openclaw/issues/121058)**

最受关注问题：DeepSeek v4 Flash 静默失败后，回退消息不产出实际回复。虽然原 issue 已关闭，但监控 cron 显示失败仍在持续，说明修复未真正解决根因。反映了用户对模型供应商回退机制可靠性的高度关注，以及对“关闭即修的误判”模式的不满。

**[#91009 — Codex PreToolUse hook 高 CPU 消耗（18 评论，👍2）](https://github.com/openclaw/openclaw/issues/91009)**

`openclaw-hooks` 进程消耗 ~100%+ CPU 并阻塞网关 RPC，属于影响核心可用性的资源耗尽问题，社区讨论热烈。

**[#69208 — 跨渠道重复 transcript/回放问题 umbrealla issue（13 评论）](https://github.com/openclaw/openclaw/issues/69208)**

维护者亲自主导的汇总性 issue，将 MSTeams、webchat、Telegram 等多渠道的同源 bug 合并跟踪，体现社区对“同类问题分散在多个渠道无法统一排查”的挫败感。

**[#27445 — `announceTarget` 子代理完成路由选项（13 评论，👍5）](https://github.com/openclaw/openclaw/issues/27445)**

获得最多 👍 的功能请求之一，用户希望子代理完成后能以用户消息形式路由回父会话，实现多步工作流编排。高点赞数表明多代理协作是当前社区最活跃的功能诉求方向。


## 5. Bug 与稳定性

按严重程度排列（P0 最高）：

| 严重度 | Issue | 问题描述 | 是否有 Fix PR |
|---|---|---|---|
| **P0** | [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs 超前于发布版本（`IsolatedSessions` 等配置不可用），被标记为 `ux-release-blocker` | ⚠️ 无 |
| **P1** | [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败在 #116277 关闭后仍持续发生，无排队回复负载 | ⚠️ 无 |
| **P1** | [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook 衍生 CPU-bound 进程并阻塞网关 RPC | ⚠️ 无 |
| **P1** | [#45740](https://github.com/openclaw/openclaw/issues/45740) | `gh-issues` skill 将未净化的 issue 正文注入子代理提示词（安全风险） | ⚠️ 无 |
| **P1** | [#96242](https://github.com/openclaw/openclaw/issues/96242) | Telegram 多条独立路径导致重复消息 | ⚠️ 无 |
| **P1** | [#100941](https://github.com/openclaw/openclaw/issues/100941) | 并行工具调用下 WebSocket 连接被丢弃（1006），误导性“网关崩溃”错误 | ⚠️ 无 |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/工具子进程未回收，导致 zombie 累积、运行时性能退化 | ⚠️ 无 |
| **P1** | [#72015](https://github.com/openclaw/openclaw/issues/72015) | `active-memory` 插件阻塞回复，QMD 启动初始化可过载网关 | ⚠️ 无 |
| **P1** | [#90378](https://github.com/openclaw/openclaw/issues/90378) | 升级 5.28→6.1 后 cron 存储静默迁移至 SQLite，默认投递模式变更导致渠道错误 | ⚠️ 无 |
| **P1** | [#51049](https://github.com/openclaw/openclaw/issues/51049) | WhatsApp 在 k3s 嵌套容器中收不到入站消息 | ⚠️ 无 |
| **P1** | [#82662](https://github.com/openclaw/openclaw/issues/82662) | Isolated cron agentTurn 在调用 LLM 前即超时，所有回退模型均失败 | ⚠️ 无 |
| **P1** | [#87327](https://github.com/openclaw/openclaw/issues/87327) | Isolated agent 运行在 runtime-plugins 阶段停滞 | ⚠️ 无 |
| **P1** | [#47975](https://github.com/openclaw/openclaw/issues/47975) | 子代理会话在完成后持久存在，主会话无响应 | ⚠️ 无 |
| **P1** | [#114211](https://github.com/openclaw/openclaw/issues/114211) | Matrix 房间代理对 no-reply 输出循环、重启后重放旧会话 | ⚠️ 无 |
| **P1** | [#120735](https://github.com/openclaw/openclaw/issues/120735) | Telegram 入站贴纸以原始文件引用到达，无描述且未暂存至磁盘 | ✅ [#121123](https://github.com/openclaw/openclaw/pull/121123) |
| **P1** | [#114020](https://github.com/openclaw/openclaw/issues/114020) | Feishu/Telegram 渠道分发失败（beta.4 升级后） | ⚠️ 无 |
| **P2 安全** | [#78301](https://github.com/openclaw/openclaw/issues/78301) | 插件加载器静默容忍无效插件契约，调试耗时 | ⚠️ 无 |
| **P2** | [#40919](https://github.com/openclaw/openclaw/issues/40919) | 会话记忆同步全量删除-重插的性能退化 | ✅ [#103201](https://github.com/openclaw/openclaw/pull/103201) |

**值得注意的跨领域模式**：多个 issue（#72015、#87327、#82662）均指向“isolated/embedded 运行环境在插件加载或启动阶段停滞/超时”，可能存在共因缺陷。


## 6. 功能请求与路线图信号

| Issue | 功能描述 | 热度/信号 | 落地可能 |
|---|---|---|---|
| [#60572 — Multi-Slot Memory Architecture](https://github.com/openclaw/openclaw/issues/60572) | 将单一 memory slot 拆分为多个专用内存层，允许不同 provider 并行 | 👍3，PR 已关联 | ⭐️⭐️⭐️⭐️ 高 — 有 linked PR，且与 #63990 多索引向量库呼应 |
| [#42475 — Per-agent cost budget enforcement](https://github.com/openclaw/openclaw/issues/42475) | 网关层执行每代理每日/月成本上限 | 👍1，PR 已关联 | ⭐️⭐️⭐️ 中高 — 运营者痛点明确 |
| [#22438 — Tiered bootstrap file loading](https://github.com/openclaw/openclaw/issues/22438) | 分层加载 bootstrap 文件以节省 token | 👍0，PR 已关联 | ⭐️⭐️⭐️ 中 — token 成本优化为长期趋势 |
| [#27445 — announceTarget 选项](https://github.com/openclaw/openclaw/issues/27445) | 子代理完成时路由至父会话而非直接发频道 | 👍5（最高），PR 已关联 | ⭐️⭐️⭐️⭐️ 高 — 与多代理编排需求吻合 |
| [#67413 — Per-agent dreaming configuration](https://github.com/openclaw/openclaw/issues/67413) | 按代理配置 memory-core dreaming 调度 | 👍5 | ⭐️⭐️⭐️ 中高 |
| [#63990 — Multi-index embedding memory](https://github.com/openclaw/openclaw/issues/63990) | 多索引向量库 + 模型感知故障切换 | 👍1 | ⭐️⭐️ 中 — 与 #60572 关联但复杂度高 |
| [#6757 — Agent-triggered context compaction](https://github.com/openclaw/openclaw/issues/6757) | 代理自主触发会话压缩 | 👍2 | ⭐️⭐️⭐️ 中 — 与上下文管理主线一致 |
| [#6599 — /models test-fallback 命令](https://github.com/openclaw/openclaw/issues/6599) | 主动验证回退链配置，无需等待真实故障 | 👍1 | ⭐️⭐️⭐️ 中有价值 — 与近期回退链路问题相关 |
| [#121369 — longcat: 对齐 baseUrl 与文档](https://github.com/openclaw/openclaw/pull/121369) | LongCat 团队提交的 provider 插件修正（含品牌图标） | P1 关联合并风险低 | ⭐️⭐️⭐️⭐️ 高 — 供应商自提交，通常优先合并 |

**路线图信号**：多代理编排（#27445、#60572）、成本治理（#42475）、上下文管理（#22438、#6757）是社区功能需求三大主线。


## 7. 用户反馈摘要

- **消息丢失/静默失败是最大的信任破坏者**：#116277 用户反复报告“模型静默失败后只显示回退文案”，且关闭后仍复现（#121058）。用户对“标记为关闭但问题仍在”的沟通模式表示不满。
- **升级/迁移过程中的隐式变更让人措手不及**：#90378 中用户反馈 5.28→6.1 升级后 cron 存储静默迁移至 SQLite、默认投递模式变更导致渠道错误，缺乏可见性。#48920 也反映了文档超前于发布版本的问题。
- **group 场景的循环/重复行为烦扰**：#114211（Matrix）和 #96242（Telegram）都涉及多用户/群组场景下消息重复或循环触发，影响协作体验。
- **Windows 用户体验差异明显**：#105528 中 exec/read 工具在 Windows 上间歇性返回空输出，且纯会话相关、子代理正常，指向平台层而非模型层问题。
- **安全敏感度在提升**：多名用户（#45740、#78301）主动报告了 prompt 注入与插件契约校验缺陷，社区安全意识增强。
- **对自治/运维化能力的正向反馈**：多个 feature request（#6757、#6599、#45323）由代理自行提交或用户明确为“生产可靠性”目的提出，说明核心用户已将其作为基础设施使用。


## 8. 待处理积压

以下 issue 长期未得到有效响应或修复，建议维护者优先关注：

| Issue | 创建时间 | 搁置天数 | 严重度 | 备注 |
|---|---|---|---|---|
| [#45740 — gh-issues prompt 注入](https://github.com/openclaw/openclaw/issues/45740) | 2026-03-14 | ~149 天 | **P2/安全** | 待安全审查，已加 needs-security-review |
| [#78301 — 插件加载器静默失败](https://github.com/openclaw/openclaw/issues/78301) | 2026-05-06 | ~96 天 | **P2/安全** | 待安全审查与 live repro |
| [#48920 — Live Docs 超前发布

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-08-10**


## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态正处于**高速扩张与分化并存的阶段**。以 OpenClaw 为轴心，派生了 PicoClaw、NanoClaw、CoPaw、EasyClaw 等一系列衍生项目，形成了"核心平台 + 领域分化"的生态格局。各项目日均 PR/Issue 活跃总量超 1,000 条，社区参与度极高，但项目间成熟度差距明显——头部项目（OpenClaw、IronClaw）已进入架构演进与安全加固期，中部项目（NanoBot、PicoClaw）处于功能密集迭代期，部分尾部项目（TinyClaw、ZeptoClaw）则连续多日零活动。**多代理编排、Token 成本可观测性、安全加固与消息投递可靠性**是生态内跨项目最集中涌现的技术诉求。

| 活跃度梯队 | 项目 | 判断依据 |
|---|---|---|
| 第一梯队：极活跃 | OpenClaw / IronClaw / Zeroclaw / CoPaw | 日均 PR 更新 ≥30 条，社区讨论密度高 |
| 第二梯队：中高活跃 | NanoBot / PicoClaw / NanoClaw / Moltis | 日均 PR 更新 5-20 条，功能迭代稳定 |
| 第三梯队：维护沉淀 | LobsterAI / EasyClaw | 低 Issue/PR 量，周期性版本发布 |
| 第四梯队：停滞 | TinyClaw / ZeptoClaw | 连续 24h+ 零活动 |


## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/活跃） | PR 更新（待合并/合并关闭） | Release | 核心焦点 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 443 | 320 待 / 180 闭 | 无 | 消息丢失修复、稳定性加固、架构卫生 | 🟢 优秀，P0/P1 消息类问题反复出现是主要风险 |
| **Zeroclaw** | 38 新/活跃 | 49 待 / 1 闭 | 无 | S0/S1 级安全修复、RFC 治理效率 | 🟡 关注，合并吞吐极低（49:1），维护者带宽成瓶颈 |
| **IronClaw** | 17 新/活跃 | 30 待 / 8 闭 | 无 | tool-search 架构升级、通知通道扩展、outbound 可靠性 | 🟢 良好，但 P2 Bug 积压周期超 1 个月 |
| **CoPaw** | 25 新开 | 31 待 / 3 闭 | 无 | 前端渲染、MCP 超时、SQLite 崩溃、流式体验 | 🟢 良好，Docker/Windows 平台适配问题突出 |
| **NanoBot** | 约 5 | 12 待 / 5 闭 | 无 | Token 透明度、安全绕过修复 | 🟡 关注，2 个安全绕过未修复，3 个 PR 带冲突 |
| **PicoClaw** | 2 新 / 1 闭 | 5 待 / 2 闭 | 无 | SSRF 加固系列、Telegram 富文本渲染 | 🟢 良好，Matrix 断线静默死亡问题长期未解 |
| **NanoClaw** | 1 新 | 16 待 / 0 闭 | 无 | 附件投递修复、CVE 修复、架构重构 | 🟡 关注，16 个 PR 全部积压未合并，"海绵效应"明显 |
| **Moltis** | 2 新 | 1 待 / 0 闭 | 无 | Vault 密钥规范化、UI 配置一致性 | 🟢 稳定，但 2 个新 Bug 需尽快响应 |
| **LobsterAI** | 1 新 | 0 待 / 7 闭（stale） | 无 | 模型切换误判、积压 PR 清理 | 🔴 警惕，4 个月前的高价值 PR 仍未合并 |
| **EasyClaw** | 0 | 0 | v1.8.94 + v1.8.95 | Gateway 稳定性、Groq 服务商接入 | 🟢 稳定，版本迭代快但社区互动为零 |
| **TinyClaw** | 0 | 0 | 无 | — | ⚪ 停滞 |
| **ZeptoClaw** | 0 | 0 | 无 | — | ⚪ 停滞 |


## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态中社区规模最大、架构最完整、衍生生态最繁荣的"母项目"。**

| 维度 | OpenClaw | 同类对比 |
|---|---|---|
| **社区规模** | 日均 500 Issue + 500 PR，环比生态内最高 | IronClaw（24+38）、Zeroclaw（50+50）均相距甚远 |
| **技术路线** | 统一的"单一代码库 + 多渠道适配"架构，六层渠道分发命名体系，增量记忆同步（PR #103201） | Zeroclaw 采用 Rust 高性能路线；Moltis 走 Agent 基础设施方向；各项目技术栈差异明显 |
| **核心优势** | ① 最大渠道适配矩阵（Telegram/Matrix/Discord/WhatsApp/MSTeams 等）② 最成熟的 memory/dreaming 架构 ③ 生态催化能力最强（派生 PicoClaw/NanoClaw/CoPaw/EasyClaw 等） | IronClaw 侧重企业级自动化编排；Zeroclaw 偏性能和安全；LobsterAI 专注 OpenClaw 的模型切换体验封装 |
| **结构性问题** | P0/P1 消息丢失类问题持续反复（如 #116277 关闭后仍复现），大社区带来的治理复杂度高 | 衍生项目通过"轻量外壳 + 特定优化"切入垂直场景，形成差异化 |

**生态地位总结**：OpenClaw 之于个人 AI 助手生态，类似于 React 之于前端生态——既是最广泛使用的基座，也是新项目衍生的母体。其稳定性问题会直接波及下游生态，今天的 P0 消息丢失问题实际上已在 PicoClaw、NanoClaw 的渠道 Bug 中间接显现。

> 注：PicoClaw（github.com/sipeed/picoclaw）、NanoClaw（github.com/qwibitai/nanoclaw）、ZeptoClaw（github.com/qhkm/zeptoclaw）、EasyClaw（github.com/gaoyangz77/easyclaw）等均为社区衍生的 OpenClaw 变种项目。


## 4. 共同关注的技术方向

### 4.1 多代理编排（跨项目最强信号）

| 项目 | 具体诉求 | 载体 |
|---|---|---|
| **OpenClaw** | 子代理完成后路由回父会话（#27445，👍5）、Multi-Slot Memory 架构（#60572） | Feature Request + 关联 PR |
| **Zeroclaw** | Work Lanes 看板自动化，优化多任务路由流程（#6808，22 评论） | RFC（讨论 82 天） |
| **IronClaw** | Deferred tool-search 并发执行、namespace-aware 目录预览（#7405） | Epic #7166，3 个 PR 堆栈 |
| **CoPaw** | Agent 多步工作流编排，推理步骤可视化（#6820） | Bug + 修复 PR |

**判断**：多代理 / 多工具编排已从"可选项"变为"必选项"，所有项目都在为代理自主完成复杂工作流（而非单轮问答）做架构准备。

### 4.2 成本可观测性与 Token 治理

| 项目 | 具体诉求 | 数据 |
|---|---|---|
| **NanoBot** | Token 消耗追踪与日志（#5266） | 用户 2 小时内消耗百万级 Token，无任何定位手段 |
| **OpenClaw** | `/models test-fallback` 命令（#6599）；Tiered bootstrap 加载节省 Token（#22438） | 回退链不可验证是"静默失败"的隐性根源之一 |
| **IronClaw** | 124 次无效工具调用（#6046） | 简单 email-to-sheet 工作流触发 124 次调用，模型过度分析 |
| **Zeroclaw** | Per-model capability & context-window 配置统一（#7100） | RFC 讨论 82 天仍未定稿 |

**判断**：Token 成本透明度正从"运营痛点"升级为"基础功能需求"。能可视化管理 Token 消耗的项目将获得显著差异化优势。

### 4.3 安全加固（今日最密集的 PR 主题）

| 项目 | 安全事项 | 严重度 |
|---|---|---|
| **Zeroclaw** | gateway webhook 未认证（#9565）、高熵检测误伤 Solana 地址（#9486） | S0 / S0 |
| **NanoBot** | `exec.allowPatterns` shell 链式命令绕过（#5305、#5306） | 安全 |
| **PicoClaw** | 多通道媒体下载 SSRF（#3322-#3324） | P2 |
| **NanoClaw** | 容器 tar 关键级 CVE GHSA-23hp-3jrh-7fpw（#3207） | 关键 |
| **Moltis** | Vault 助记词哈希规范化不一致（#1186） | 中高 |
| **IronClaw** | Routine 自我复制风险（#6479） | P2 安全 |

**判断**：今日生态内安全相关 PR/Issue 密度极高，各项目均在同步修复媒体 URL 下载（SSRF）、命令执行白名单绕过、插件加载验证等系统性安全弱点。

### 4.4 消息投递可靠性与用户信任

| 项目 | 具体问题 | 状态 |
|---|---|---|
| **OpenClaw** | 静默回复失败（#116277/#121058）、Telegram 重复消息（#96242） | P0/P1，反复出现 |
| **IronClaw** | outbound TOCTOU 竞态（#7395）、流中断 + 僵尸线程（#7400） | P1，已有关联 PR |
| **CoPaw** | 流式输出缺失，全部完成后一次性呈现（#6820） | P1 |
| **PicoClaw** | Matrix 断线静默死亡，无重连（#3203） | P1，被 stale 关闭 |

**判断**：消息可靠性问题横跨 OpenClaw 核心、衍生项目、独立项目，说明这是 AI Agent 框架的**系统性难题**——模型静默失败、流中断、状态失同步等问题的根因仍在基础设施层。

### 4.5 配置透明度与管理一致性

| 项目 | 具体问题 | 影响 |
|---|---|---|
| **Zeroclaw** | `sops_dir` 文档默认值未生效，SOP 静默不加载（#9779） | 用户以为安全功能在运行，实际完全关闭 |
| **OpenClaw** | 升级后 cron 存储静默迁移 SQLite（#90378） | 默认投递模式变更导致渠道错误 |
| **Moltis** | Heartbeat 设置 UI 静默重置未展示字段（#1187） | 配置丢失的不信任感 |
| **LobsterAI** | 模型切换误判（#2453） | 会话内动态切换被阻断 |

**判断**：配置系统的"文档-实现-运行时"三层一致性是生态普遍弱点，静默失败比显式报错更损害用户信任。


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全能型：多渠道 + 记忆系统 + 子代理编排，生态最完整 | 开发者 / 重度用户 / 项目二次开发方 | 统一代码库，六层渠道分发，增量记忆同步，社区最大 |
| **IronClaw** | 企业级自动化工作流（Routine 自动化、web-push 通知、工具发现优化） | 团队 / 企业自动化场景 | 三大核心：deferred tool-search（100-1000 工具规模）、BatchPolicy 并发、outbound 可靠性。强调**批量任务生产可靠性**，架构上与 OpenClaw 差异最大 |
| **Zeroclaw** | 高性能 Rust 实现，安全敏感，多代理协作 | 安全要求高的开发者 / 生产部署者 | 起名规则同样为 OpenClaw 衍生（但 github.com/zeroclaw-labs/zeroclaw 代码库独立于 OpenClaw），安全策略（Webhook 认证、高熵检测）较 OpenClaw 更谨慎，但有 49:1 的合并瓶颈 |
| **CoPaw** | 桌面端 GUI 用户体验（窗口选择、SSE 流式、MCP 支持） | 桌面端终端用户（macOS/Windows） | Tauri 桌面封装 + 前端 Console，专注 GUI 体验打磨，多平台适配问题较突出 |
| **PicoClaw** | 轻量级部署，微信/企微/Discord/Telegram/QQ 等多渠道 | 中小型部署 / 社交平台引流需求用户 | OpenClaw 触达更多平台的精简变体；单二进制分发、简化安装；优势是微信/企微支持，MM 生态覆盖度高 |
| **NanoClaw** | 容器化加固部署，多通道扩展（Dial/Signal/Slack） | 企业级 / 安全敏感用户 | OpenClaw 衍生（但仓库为 github.com/qwibitai/nanoclaw），预构建加固镜像 + CVE 门禁，主打容器化供应链安全 |
| **NanoBot** | 轻量易用，WebUI 优先，Skill 生态 | 非技术用户 / 个人开发者入门 | 极简设计、JavaScript/TypeScript 技术栈、WebUI 向导式体验，有语音输入等低门槛交互 |
| **Moltis** | Agent 基础设施 + Vault 密钥管理 | 平台开发者 / 需要安全密钥管理的团队 | 专注提供 Agent 运行的基础设施组件，核心差异化在安全密钥管理（Vault），UI 与配置层仍需打磨 |
| **LobsterAI** | 模型切换体验优化，网关管理 | 依赖 OpenClaw 的深度用户 | 本质是 OpenClaw 的"模型管理外壳"，专注 provider/model 切换的运行时感知与网关重启；但开发已陷入停滞 |
| **EasyClaw** | 易安装易用，快速接入多服务商 | 终端消费者 / 非技术用户 | 自动打包 OpenClaw runtime，桌面应用分发，服务商无关设计（Groq 等新 provider 持续加入），迭代节奏紧凑 |


## 6. 社区热度与成熟度分层

### 第一层：快速迭代 + 社区爆炸期（OpenClaw、IronClaw、CoPaw、Zeroclaw）
- 日均 PR 提交量极大，功能堆栈密集提交
- 核心挑战从"功能有无"转向"工程质量与合并带宽"
- OpenClaw 已形成"社区讨论 → Issue 细化 → PR 堆栈"的成熟贡献流水线

### 第二层：稳定迭代 + 质量巩固期（NanoBot、PicoClaw、NanoClaw、Moltis）
- PR 提交量适中，有明确的功能规划和安全加固主线
- 面临"积压 PR 未合并 + 安全 Bug 待修复"的典型中期项目挑战
- NanoBot / NanoClaw 带冲突的 PR 以及 PicoClaw

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-10

## 今日速览

过去24小时项目活跃度中高。Issue讨论热度较高（#5266 获 13 条评论），核心话题围绕 Token 消耗透明度与稳定性。代码合并/关闭节奏平稳（5 个 PR 关闭），但新提交的 PR 数量较多（12 个待合并），其中包含数个 p0/p1 优先级的修复，可能影响下一版本发布节奏。值得特别关注的是，新增 2 个安全相关 Issue（#5305、#5306），均涉及 `exec.allowPatterns` 绕过问题，需要维护者优先评估。当前积压的待合并 PR 中，有 3 个带有 `conflict` 标签，需提醒维护者及时处理。


## 版本发布

今日无新版本发布。


## 项目进展

今日共有 5 个 PR 被关闭（含合并），反映了项目在以下方向的推进：

- **WebUI 用户体验改进**：[#5312](https://github.com/HKUDS/nanobot/pull/5312) 大幅刷新 WebUI 用户指南，覆盖临时会话保留策略、受限模式行为、Skills 安装指引等，对新手友好度有直接提升。[#5304](https://github.com/HKUDS/nanobot/pull/5304) 修复了 WebUI 语音输入在非 HTTPS 下的需求说明，改进了多语言布局的提示信息。
- **测试与质量保障**：[#5308](https://github.com/HKUDS/nanobot/pull/5308) 新增了 CLI、WebUI 用户路径测试，移除了 5 个冗余测试，并增加 V8 coverage 报告与 CI 强制门槛。该 PR 对项目质量基线有明显加强作用。
- **社区生态集成**：[#4019](https://github.com/HKUDS/nanobot/pull/4019) 被关闭（GitAgent Protocol 支持），属于外部标准兼容类 PR，暂未合入主干。
- **文档完善**：[#5307](https://github.com/HKUDS/nanobot/pull/5307) 恢复了 README 中的 Star History 图表，更换了不受 GitHub 限制的新 provider。


## 社区热点

**[#5266 Token 消耗日志需求（13 条评论）](https://github.com/HKUDS/nanobot/issues/5266)**

该 Issue 由 @knoppix2 提出，反馈 nanobot 在用户无感知的情况下短时间内消耗大量 Token（2 小时达百万级），希望增加 Token 消耗的追踪与日志能力。评论区讨论活跃，是今日最高互动量 Issue。值得注意的是，PR [#5299](https://github.com/HKUDS/nanobot/pull/5299)（feat(api): expose structured token usage records）很可能与此需求直接相关，目前处于待合并状态。

**[#5295 Docker Compose 部署报错（5 条评论）](https://github.com/HKUDS/nanobot/issues/5295)**

用户按照官方 `deployment.md` 部署时，Docker Compose 启动失败，报错 `/usr/local/bin/entrypoint.sh: Permission denied`。属于上手路径的常见问题，讨论集中在部署文档与实际行为不一致。


## Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue / PR | 描述 | 是否有修复 PR |
|---------|-----------|------|-------------|
| **安全** | [#5306](https://github.com/HKUDS/nanobot/issues/5306) | `exec.allowPatterns` 存在 shell 链式命令绕过，可执行非预期命令 | 暂无 |
| **安全** | [#5305](https://github.com/HKUDS/nanobot/issues/5305) | `exec.allowPatterns` 允许名单绕过，OpenAI 兼容 API 可实现链式命令执行 | 暂无 |
| **高** | [#5295](https://github.com/HKUDS/nanobot/issues/5295) | Docker Compose 部署失败，entrypoint 权限错误 | 暂无 |
| **中** | [#5311](https://github.com/HKUDS/nanobot/issues/5311) | Agnes AI provider 对嵌套对象工具参数双重编码导致 MCP 调用失败 | 暂无 |
| **中** | [#5271](https://github.com/HKUDS/nanobot/pull/5271) | 后台任务持有 Session 引用，`/new` 后旧任务可能覆盖会话数据（p0，有 conflict） | 已有 PR，待处理冲突 |
| **低** | [#5303](https://github.com/HKUDS/nanobot/pull/5303) | 天气 Skill 在 Windows PowerShell 下裸 `curl` 可能解析为别名 | 已有 PR |
| **低** | [#5302](https://github.com/HKUDS/nanobot/pull/5302) | Dream 内存整理期间调用了不可用的工具 | 已有 PR |


## 功能请求与路线图信号

- **Token 使用可观测性**：[#5266](https://github.com/HKUDS/nanobot/issues/5266) 明确暴露了用户对 Token 透明度的需求。PR [#5299](https://github.com/HKUDS/nanobot/pull/5299) 已实现结构化记录与查询 API（保留最近 50 条、按天查询、保留完整性），下一步需确认是否原生接入可观测性面板。
- **Agent Plugins 生态集成**：[#5288](https://github.com/HKUDS/nanobot/pull/5288) 将 Agent Plugins 与 CLI Apps 打通，Skill 打包分发走向标准化，同时允许 nanobot 保持为通用宿主、外部项目独立迭代。该项目若合入，会让 nanobot 在可扩展性上更进一步。
- **外部标准协议兼容**：#4019（GitAgent Protocol）虽被关闭，但类似的方向（更开放的 agent 封装边界）在多个 PR 中重复出现，后续可能以其他形式再次推进。
- **模型通用型 computer use**：[#4276](https://github.com/HKUDS/nanobot/pull/4276) 提出的 browser + computer_use 工具已存在较久，处于待合并状态且带 `conflict`，说明该项目体积较大，短时间合入的可能性偏低。


## 用户反馈摘要

- **Token 消耗担忧（来自 #5266）**：用户发现 nanobot 在无明显交互的情况下产生大量 Token 消耗，且缺少定位手段；希望了解“哪个请求、何时、消耗了多少”。这侧面反映出默认模型在无人值守场景下的调用策略存在改进空间。
- **部署门槛问题（来自 #5295）**：Docker Compose 部署流程在入门阶段存在权限配置问题，说明部署文档在部分环境下与实际行为不一致，影响了用户的第一体验。
- **Provider 兼容性困扰（来自 #5311）**：Agnes AI 这类第三方 custom provider 出现参数编码层面的兼容性差异，用户对 nanobot 的 provider 抽象层在多实现下的表现提出更高要求。


## 待处理积压

- **安全测试相关 Issue（#5305、#5306）**：两个同主题的安全绕过问题，直接关联 `exec` 工具的可信边界。建议尽快评估影响范围并给出缓解方案，必要时发布 hotfix。
- **[#4276 computer use 工具（6月10日创建，带冲突）](https://github.com/HKUDS/nanobot/pull/4276)**：已存在两个月，横跨 browser 自动化与桌面级控制，体量较大。若短期无法合并，建议明确阶段计划或拆分提交。
- **[#5255 `nanobot api status` 草案（8月5日创建，带冲突）](https://github.com/HKUDS/nanobot/pull/5255)**：针对外部托管服务的状态真实性提出改进，至今无实质沟通进展。
- **[#5271 会话数据竞态修复（p0，带冲突）](https://github.com/HKUDS/nanobot/pull/5271)**：因 `conflict` 标签仍未合入，影响的是用户会话数据安全，属于高影响低复杂度问题，建议优先解决冲突。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时项目保持高活跃度：共 50 条 Issue 更新（38 条新开/活跃、12 条关闭）、50 条 PR 更新（49 条待合并、仅 1 条被合并），无新版本发布。值得关注的是合并吞吐量极低——49 条 PR 积压待合并，仅 1 条闭环，维护者审核带宽可能成为瓶颈。安全类问题（S0/S1 级）是当前最突出的主题，包括网关 webhook 未认证、WhatsApp 通道安全策略、MCP 内存增长等，多项已有对应修复 PR 在排队。同时，多条 RFC 仍停留在 `needs-maintainer-review` 状态（如 #7100、#6808、#6971），决策延迟可能影响社区贡献者的积极性。

**今日核心信号：**
- 🔴 49 条 PR 等待合并，维护者审核通道拥堵
- 🔴 2 条 S0 级安全 Bug 待处理（#9565 webhook 未认证、#9486 高熵检测假阳性导致 Solana 地址无法发送）
- 🟡 多条 RFC 进入长期讨论（#7100 评论 12 条、#6808 评论 22 条），但均未定稿
- 🟢 12 条 Issue 今日关闭，包括 2 条高危险度的 Bug（#9192、#8054 系统提示工具可用性一致性修复）


## 2. 版本发布

**无新版本发布。**


## 3. 项目进展

过去 24 小时仅 1 条 PR 被合并/关闭，且从可见数据中无明确合并的 PR，整体推进节奏偏慢。被关闭的 12 条 Issue 中包含 4 条 bug、3 条 tracker、1 条 duplicate、1 条 test 故障，其中 #8054（系统提示工具可用性与 per-turn 有效工具匹配）和 #9192（shared_budget TOCTOU 包装 AtomicUsize）的关闭代表对应修复已合入，安全性有实质改善。但需注意：49 条待合并 PR 中有大量 `needs-author-action` 标签，说明提交者还需回应审核反馈；同时存在多个大体积（size:XL）PR 长期滞留（如 #9535、#9420、#9182、#9571 等），合并窗口紧张。

**关键合并信号：** 关闭的 12 条 Issue 中涵盖了 S1 级 Bug（#9192 AtomicUsize 包装、#8560 browser_open 挂起），另有 2 条 safety 相关（#8054 系统提示工具一致性）。但这与 49 条待合并 PR 的规模相比，进展有限。


## 4. 社区热点

**#6808 RFC: Work Lanes, Board Automation, and Label Cleanup**（22 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)
> 这是当前社区讨论最密集的议题，从 5 月 20 日创建至今已持续近 3 个月，修订版本达 24 版。核心诉求是优化工作路由流程、看板自动化与标签体系，减少维护者手动跟踪负担。这反映了项目在高速发展期对治理效率的迫切需求——与 #8692（维护者决策队列）和 #9496（简化 RFC 流程）形成呼应。

**#7100 RFC: Per-model capability & context-window config**（12 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7100)
> 社区对模型能力（vision 支持、context window）配置的分散来源表示困扰。该 RFC 提案将各信息来源统一为单一配置入口，被标记为 `priority:p1, risk:high`。配套 PR #9535（将上下文压缩锚定到模型窗口比例）已在排队，显示该方向将有实质代码落地。

**#9397 RFC: WhatsApp 空 allowed_groups 应默认拒绝**（11 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9397)
> 安全相关的治理提案，呼吁改变当前默认行为——空列表目前意味着 "允许所有群组"，存在严重安全隐患。该 Issue 由 Claude 起草、@belumume 审核，显示 AI 协作贡献已成常态。

**#8692 Tracker: 维护者决策队列**（11 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)
> 系统化跟踪需要维护者关注的 RFC 和设计讨论，实际上是对主创团队审核压力的透明映射。多条 RFC 都带着 `needs-maintainer-review` 标签等待决策——这已是项目当前的核心瓶颈。


## 5. Bug 与稳定性

### S0 级（数据丢失/安全风险）

**[#9565] gateway webhook handlers do not fail closed（WhatsApp Cloud, Linq, WATI）**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9565) | 💬 3 条评论 | 状态：进行中
> 3 个入站 webhook handler（`crates/zeroclaw-gateway/src/lib.rs`）未认证调用者即将消息分发入 agent，可被攻击者利用。已通过源码验证确认风险。**⚠️ 暂无对应 fix PR。**

**[#9486] 高熵检测器将 Solana 地址误判为敏感信息并强制打码**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) | 💬 5 条评论 | 状态：accepted
> Telegram 通道中，agent 持有 Solana MCP 工具却无法正常返回钱包地址，每条都被替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`，且 `high_entropy_tokens=false` 配置未生效。这直接阻断加密相关的业务场景。**⚠️ 已有对应 RFC #9825 倡议定义区块链地址发布例外，但尚无修复代码。**

### S1 级（工作流阻塞）

**[#9085] 嵌套运行时 panic in try_enable_pgvector（启动时）**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9085) | 💬 3 条评论 | 状态：accepted
> 启用 pgvector 的 Postgres 内存后端时，从 Tokio runtime context 构造 PostgresMemory 会触发 panic。**⚠️ 无对应 PR。**

**[#9779] sops_dir 文档化默认值未生效，SOP 静默不加载**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) | 💬 2 条评论 | 状态：accepted
> 文档声称 `sops_dir` 可选且有默认值，但 daemon 内部以 `is_some()` 判断，完全依赖默认值运营的用户 SOP 引擎不加载且无任何日志。

**[#8642] MCP/tool-schema 克隆导致 agent 循环中内存无界增长**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) | 💬 4 条评论 | 状态：accepted
> 在 WSL2 环境下引发连续 OOM 的根因之一（源自 #5542 tracker），每次 agent 循环都会克隆全部 MCP schema 导致 RSS 持续增长。**✅ 已有关联 PR #9743（modalities parser 修复）在队列中，但未确认解决内存问题。**

### S2 级（功能降级）

**[#9284] 配置 flush 会覆盖并发写入**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) | 💬 3 条评论 | 状态：accepted
> `RpcDispatcher::flush_config` 在保存时未对并发写入做冲突处理，可能导致用户配置丢失。

**[#9198] Discord typing indicator 在重载后永久卡住**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9198) | 💬 3 条评论 | 状态：accepted
> 从 web 控制面板重载 daemon 后，Discord 通道的 "typing" 状态卡死无法恢复，后续所有消息都显示为正在输入。

### 已修复（今日关闭）

- **[#8054]** 系统提示工具可用性与 per-turn 有效工具一致性，直接在 runtime agent 路径修复，覆盖范围还包括 gateway/WebSocket/多模态入口。
- **[#9192]** shared_budget TOCTOU 可包装 AtomicUsize；`SopEngine::finish_run` 在 mutex 下 unwrap panic。
- **[#9690]** Containerfile StageX 固定 rustc 1.95.0 低于 MSRV，导致 all-features 容器镜像不可构建。
- **[#8731]** Stdio MCP 服务器僵尸进程累积。


## 6. 功能请求与路线图信号

**可能进入下一版本的功能模块（基于已有 PR 排队与 RFC 热度）：**

| 功能 | 相关 PR/Issue | 信号强度 |
|------|---------------|----------|
| **Per-model 能力与上下文窗口配置** | #7100（RFC，12 评论）+ #9535（回填实现） | 🟢 高 — RFC 讨论成熟，PR 已就绪 |
| **Langfuse 可观测性后端** | #9556 | 🟢 高 — 完整的 OTel trace 导出能力，feature-flagged |
| **DAG 计划执行工具** | #9554 | 🟡 中 — 支持 agent 做串行/并行多步任务规划 |
| **PowerShell 原生支持（Windows）** | #9182 | 🟡 中 — 扩充 Windows 平台运行时能力 |
| **ProviderErrorKind 错误分类** | #9557 | 🟡 中 — 提升 provider 错误提示友好度 |
| **密钥管理 KeySource trait 抽象** | #9194 | 🟡 中 — 横向扩展密钥来源（当前仅有文件后端） |
| **发布签名机制整合** | #9101（RFC 已 accepted）+ #9856（部分推进） | 🟢 高 — 将 3 套签名机制合并为 1 套，缩减发布资产 |

**风险信号：** RFC #9328（verifiable-intent 未验证凭证链）、#6971（安全态势与凭据边界）等多个安全相关提案停留在 `needs-maintainer-review` 状态，若长期不决策，安全技术债将持续累积。修复以上 S0 级 Bug（#9565、#9486）的代码尚未出现。


## 7. 用户反馈摘要

**高频痛点主题（按提及频率）：**

🔧 **配置文档与实际行为不一致**
- #9779：`sops_dir` 依赖文档默认值但实际不生效，用户以为 SOP 在运行，实际整个子系统静默关闭
- #9825：文档未注明高熵检测的例外场景，导致生成支付链接等合法场景被阻断

⚙️ **运维复杂度高 / 需要专业知识**
- #6808 讨论中反馈看板路由和标签更新繁琐，维护者难以快速判断优先级
- #9496 指出 RFC 流程"相比要做的决策更慢更繁琐"

🚀 **运行时稳定性对生产的掣肘**
- #8642（WSL2 OOM）、#9085（pgvector panic）、#9198（Discord typing 卡死）被反复提及为影响生产使用的因素
- 多条 Bug 反馈包含"agent 挂起直到手动取消"（如 #8560）

🔒 **安全感知强，但安全功能存在误伤**
- #9486 Solana 地址被强制打码、#9825 支付链接无法投递——安全机制需支持白名单例外
- 多个 Issue 都在强调安全策略需要"fail-closed"但也要"可配置"

**积极的信号：** #8054 的修复（工具可用性一致性）获得用户正面反馈，表明核心 runtime 路径在持续加固。


## 8. 待处理积压（需维护者关注）

**🔴 已 in-progress / accepted 但长期无对应 PR 的严重 Bug：**

| Issue | 严重度 | 等待时长 | 说明 |
|-------|--------|----------|------|
| [#9565] webhook 未认证 | S0 | 11 天 | 三个通道均有数据泄露风险，无 fix PR |
| [#9486] Solana 地址打码 | S0 | 13 天 | 已 accepted，有跟进 RFC 但无修复代码 |
| [#9779] sops_dir 静默失败 | S1 | 4 天 | 文档默认值不生效，无错误提示 |

**🟡 已 accepted 但超过 2 周无动作：**

| Issue | 严重度 | 状态 |
|-------|--------|------|
| [#9085] pgvector 嵌套 runtime panic | S1 | accepted 于 7/15，至今无 PR |
| [#9284] 配置 flush 覆盖并发写 | S2 | accepted 于 7/23，至今无 PR |
| [#8642] MCP schema 克隆内存无界增长 | S1 | accepted 于 7/3（已超 1 个月） |
| [#7130] workspace-forbid(unsafe_code) | 加固 | accepted 于 6/3，已超 2 个月 |

**🟠 待合并的大体积 PR（size:XL，部分超 2 周）：**

| PR | 主题 | 等待天数 |
|----|------|----------|
| [#9535] 上下文压缩锚定模型窗口比例 | 17 天 |
| [#9420] Anthropic 存储 OAuth 支持 | 20 天 |
| [#9182] PowerShell 原生支持 | 26 天 |
| [#9571] 移除 WATI 通道 | 16 天 |
| [#9194] KeySource trait 提取 | 26 天 |
| [#8826] image_gen SSRF 修复 | 38 天 |

**⚪ 长期未决 RFC（超 30 天无决策）：**

| Issue | 主题 | 等待时长 |
|-------|------|----------|
| [#6808] Work Lanes & Board Automation | 82 天（评论 22 条） |
| [#6971

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-10

## 今日速览

过去24小时 PicoClaw 项目整体活跃度中等偏上：共产生 3 条 Issue 更新（2 新开 / 1 关闭）和 7 条 PR 更新（5 待合并 / 2 关闭）。值得关注的是，安全加固主题今日集中发力——围绕 SSRF 防护的系列 PR（#3322/#3323/#3324）已全部提交待合并，覆盖微信、企微及 Discord/Telegram/QQ 等多条通道的媒体下载路径。此外，Telegram 富文本表格渲染的功能请求（#3325）已快速获得对应实现 PR（#3327），显示出维护者对社区需求的响应速度较积极。当前项目无新版本发布，功能开发与安全修复并行推进。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日合并/关闭的 PR 中，含金量最高的是 **#2132**（已关闭），该 PR 由 @dtapps 提交并沉淀近半年后关闭，核心贡献包括：

- **配置键解耦**：不再用 provider 的 `modelID` 覆盖 `Defaults.ModelName`，避免配置查找链断裂
- **模型级参数覆盖**：支持按模型独立设置 `max_tokens` 等参数，为多模型路由提供精细控制

这项改动对生产环境中多模型混合接入的用户有实际收益，属于配置系统的重要质量修复。

| PR | 状态 | 说明 |
|---|---|---|
| [#2132](https://github.com/sipeed/picoclaw/pull/2132) | 已关闭 | config 增强：模型级 max_tokens + 配置键解耦 |
| [#3326](https://github.com/sipeed/picoclaw/pull/3326) | 已关闭 | 修复 pnpm-lock.yaml 重复条目，恢复 `--frozen-lockfile` 安装 |

整体来看，今日推进集中于安全加固（3 个 PR 待合并）、Telegram 富文本渲染（1 个新 PR）及 deltachat 模块大规模精简（-200 LOC，待合并）三条线。

---

## 社区热点

**今日讨论焦点主要在安全修复系列 PR 上**，三个 PR 均来自 @SashaMIT，形成连贯的 SSRF 加固主题：

- [#3322 fix(channels): block private targets on inbound media downloads](https://github.com/sipeed/picoclaw/pull/3322) — 核心修复，统一补上 QQ/Telegram/Discord/Line/Slack 的下载防护
- [#3323 fix(wecom)](https://github.com/sipeed/picoclaw/pull/3323) 与 [#3324 fix(weixin)](https://github.com/sipeed/picoclaw/pull/3324) — 分别是同一问题的企业微信、微信分支

背后的诉求很清晰：**用户对机器人安全性的要求正在提高**，媒体下载 SSRF 漏洞是聊天机器人框架的常见高危面。`utils.DownloadFile` 早有防护能力但各通道接入不完整，这次的系列 PR 是一个系统性收敛。

另一热点是 **#3325 Telegram 表格富文本渲染**（Issue 与 PR 同日创建），社区用户 @As-tsaqib 提交 Issue 后直接贡献了实现，围绕 Bot API 对表格的原生 UI 支持展开，表明 Telegram 用户对消息排版质量有明确期待。

---

## Bug 与稳定性

今日报告/活跃 Bug 按严重程度排列：

| 严重度 | Issue | 状态 |
|---|---|---|
| P1 | [#3203](https://github.com/sipeed/picoclaw/issues/3203) Matrix sync 断线无重连逻辑，静默死亡后 systemd 无法感知 | 已关闭（stale），⚠️ 无对应修复 PR |
| P2 | [#3326](https://github.com/sipeed/picoclaw/pull/3326) pnpm-lock.yaml 重复条目导致 frozen-lockfile 安装失败 | ✅ 已修复并合并 |
| P2 | [#3322→#3324](https://github.com/sipeed/picoclaw/pull/3322) 多通道媒体下载 SSRF 风险 | ✅ 已有修复 PR 待合并 |

需要特别警惕 **#3203**：虽然被标记为 stale 并关闭，但问题本身并未解决。Matrix 通道的 `/sync` 长轮询断线后无法自动重连，且进程存活导致 systemd `Restart=on-failure` 不会触发——这是一个**静默的功能死亡**问题，对生产部署影响极大。建议维护者重新审视。

---

## 功能请求与路线图信号

| Issue | 说明 | 对应 PR | 判断 |
|---|---|---|---|
| [#3325](https://github.com/sipeed/picoclaw/issues/3325) Telegram 表格以原生富消息渲染 | 配合 Telegram Bot API 10.1 的新能力 | [#3327](https://github.com/sipeed/picoclaw/pull/3327) | 已在实现中，大概率进入下一版本 |
| [#3287](https://github.com/sipeed/picoclaw/issues/3287) IRC 长消息的语义化支持 | IRCv3 按 512 字节自动拆分会打破消息完整性 | 暂无 PR | 有 4 条讨论，但实现方案有待社区深入讨论 |

**通往下一版本的路线图信号**：
- **SSRF 加固收敛**（3 个 PR 待合并）
- **Telegram 富文本表格**（且 Issue 与 PR 同一天出现，属于高响应）
- **deltachat 模块重构**（#3222，-200LOC 的减法式改进）

---

## 用户反馈摘要

> **⚠️ 线下反馈优先级提示：以下来自 Issue 评论的 3 条用户反馈原文及链接已抽取完毕，请对照查看。**

### 1. Matrix 长轮询断线容忍度不足
- **来源**：[#3203](https://github.com/sipeed/picoclaw/issues/3203) 评论
- **核心痛点**：网络抖动或 homeserver 重启后，Matrix 通道永久静默死亡，无日志、无告警、无人察觉
- **使用场景**：生产环境长时间运行的机器人实例对可靠性要求高于一切
- **情绪**：对该问题在 stale 后被动关闭表示担忧

### 2. IRC 长消息被机械截断
- **来源**：[#3287](https://github.com/sipeed/picoclaw/issues/3287) 评论
- **核心痛点**：IRCv3 的 512 字节硬限制 + PicoClaw 按换行切分消息，导致长内容被拆成多条不连贯消息
- **使用场景**：将大模型长回复转发至 IRC 通道时体验严重受损，语义断裂

### 3. Telegram 表格排版退化
- **来源**：[#3325](https://github.com/sipeed/picoclaw/issues/3325)（新开，暂无评论）
- **核心痛点**：结构化 Markdown 表格经 Telegram 发送后退化为纯文本或代码块，丧失了 Telegram Bot API 10.1 的原生表格 UI 能力
- **使用场景**：数据查询类机器人在移动端阅读体验差

---

## 待处理积压

| 类型 | 编号 | 说明 | 滞留时间 | 建议 |
|---|---|---|---|---|
| ⚠️ Bug | [#3203](https://github.com/sipeed/picoclaw/issues/3203) | Matrix sync 无重连逻辑，静默死掉 | 39 天 | **建议重新打开并排期修复**，这属于生产可靠性 P1 问题 |
| 功能 | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | IRC 长消息支持 | 19 天 | 讨论已有 4 条，需维护者给出方案方向 |
| PR | [#3222](https://github.com/sipeed/picoclaw/pull/3222) | deltachat 重构 -200LOC | 38 天无实质更新 | 大型重构 PR 易腐坏，建议确认是否仍在推进 |

**结构性风险提示**：`#2132`（配置增强）在开放近 4 个月后才关闭，这类长期悬置的 PR 会增加合并冲突和维护成本，建议对 PR 设置更明确的响应 SLA。

---

> 本报告基于 2026-08-10 PicoClaw 仓库公开数据自动生成。以上链接均可直接跳转查看详情。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-10


## 今日速览

NanoClaw 项目昨日保持较高的提交活跃度：24 小时内产生 16 条 PR 更新（全部待合并，0 条已合并/关闭）和 1 条新 Issue，无新版本发布。值得注意的是，所有 PR 均停留在开放状态，暂无代码实际合入主干，说明项目当前正处于大规模贡献集中递交的阶段，核心维护者对新代码的合并节奏相对保守。社区讨论聚焦在 `install_packages` 缺少 Python/pip 通道、Signal 附件投递路径失效等实际使用痛点，另有大量重构和文档类 PR 来自同一贡献者（@zvi-fried），呈现一定程度的集中式推进特征。整体健康状况良好，但合并通道的"海绵效应"值得留意。


## 项目进展

今日无任何 PR 被合并或关闭，主干代码未发生实际变更。但 16 条开放 PR 的更新与递交仍在持续推进多个方向的进展：

- **功能新增**：`feat(cli): accept bounded JSON from stdin`（[#3218](https://github.com/nanocoai/nanoclaw/pull/3218)）为 CLI 增加 `--stdin-json` 输入模式，用于受控传递结构化参数；`feat(setup)` + `feat(channels)`（[#3050](https://github.com/nanocoai/nanoclaw/pull/3050)、[#3041](https://github.com/nanocoai/nanoclaw/pull/3041)）为通道选择器与适配器引入 Dial 通道（SMS + AI 语音通话）；`feat(ci)`（[#3208](https://github.com/nanocoai/nanoclaw/pull/3208)）新增 Docker Hub 镜像发布工作流并附带 CVE 门禁。
- **Bug 修复**：附件投递链路是今日修复重点——Signal 适配器附件路径修复（[#3142](https://github.com/nanocoai/nanoclaw/pull/3142)）、入站附件落地修复（[#2529](https://github.com/nanocoai/nanoclaw/pull/2529)）、Slack 粘贴表格传递（[#3209](https://github.com/nanocoai/nanoclaw/pull/3209)），以及 DM 解析日志脱敏（[#3215](https://github.com/nanocoai/nanoclaw/pull/3215)）。
- **安全加固**：`fix(container)`（[#3207](https://github.com/nanocoai/nanoclaw/pull/3207)）修复镜像中 tar 组件的可修复关键级 CVE（GHSA-23hp-3jrh-7fpw），分别涉及 npm 和 pnpm 内置的 tar 版本。
- **架构重构**：@zvi-fried 连续提交 4 个重构 PR——模块生命周期钩子统一（[#3214](https://github.com/nanocoai/nanoclaw/pull/3214)）、问题渲染器注册（[#3213](https://github.com/nanocoai/nanoclaw/pull/3213)）、模块迁移注册表（[#3212](https://github.com/nanocoai/nanoclaw/pull/3212)）、技能自有能力的主机接缝（[#3186](https://github.com/nanocoai/nanoclaw/pull/3186)），体现项目正在系统性地收紧内部架构。

这些 PR 均待合并状态，合并后的累积效果将覆盖：通道扩展、附件流转、安全修复、CLI 增强与架构规范化，预计合入后项目将获得一次较大的能力积累。


## 社区热点

今日讨论最集中的话题围绕 **`install_packages` 缺少 Python 通道** 展开：

- **[Issue #3217](https://github.com/nanocoai/nanoclaw/issues/3217)**（新开）：由 @stumpjumper 提出，`install_packages` 目前只支持 `packages_apt` 和 `packages_npm`，没有 pip 通道，导致依赖 Python 工具的安装无法走预构建加固镜像路径。
- **[PR #3216](https://github.com/nanocoai/nanoclaw/pull/3216)**（同日递交）：同一作者提交配套文档 PR，明确该限制并开展说明——这实际上是将一个已知限制正式文档化，同时为后续功能开发埋下伏笔。

这一话题的"Issue + 文档 PR"组合拳说明社区用户对加固镜像的采纳意愿较强，而 Python 生态的缺失正在成为实际阻碍。可以预见，若该 Issue 获得足够关注，pip 通道的实现可能被纳入近期规划。


## Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 参考 |
|---------|---------|------|------|
| **高** | `install_packages` 无 pip 通道，Python 依赖的安装无法使用预构建加固镜像，阻塞采用 | 已有 Issue 报告，无修复 PR | [#3217](https://github.com/nanocoai/nanoclaw/issues/3217) |
| **高** | 容器内 `tar` 存在可修复的关键级 CVE（GHSA-23hp-3jrh-7fpw），npm 与 pnpm 内置版本均受影响 | 已有修复 PR | [#3207](https://github.com/nanocoai/nanoclaw/pull/3207) |
| **中** | Signal 适配器将附件路径拼入消息文本，但该路径未挂载进 agent 容器，导致图片/文件附件永远无法通过 Read 工具读取 | 已有修复 PR | [#3142](https://github.com/nanocoai/nanoclaw/pull/3142) |
| **中** | Signal 入站附件被丢弃而非转交给 agent | 已有修复 PR | [#2529](https://github.com/nanocoai/nanoclaw/pull/2529) |
| **低** | Slack 通道中粘贴的表格无法传递到 agent | 已有修复 PR | [#3209](https://github.com/nanocoai/nanoclaw/pull/3209) |
| **低** | DM 解析过程中日志可能泄露敏感信息 | 已有修复 PR | [#3215](https://github.com/nanocoai/nanoclaw/pull/3215) |

今日报告的高严重度问题均有对应修复 PR 在途，但均未合入，修复尚未生效。


## 功能请求与路线图信号

- **pip 通道支持**（[#3217](https://github.com/nanocoai/nanoclaw/issues/3217)）：目前仅有 Issue 和文档 PR，无实现 PR。考虑到加固镜像的推广需求，该功能有较大可能在近期进入开发队列。
- **Dial 通道适配**（[#3041](https://github.com/nanocoai/nanoclaw/pull/3041) + [#3050](https://github.com/nanocoai/nanoclaw/pull/3050)）：SMS + AI 语音通道，两个 PR 均已开放近一个月，功能完整度较高，合入后将为项目带来新的通信通道能力。
- **CLI 结构化输入**（[#3218](https://github.com/nanocoai/nanoclaw/pull/3218)）：`--stdin-json` 模式提供界限明确的结构化参数输入，属于 CLI 体验增强，核心架构不受影响，合并门槛较低。
- **CI 镜像发布 + CVE 门禁**（[#3208](https://github.com/nanocoai/nanoclaw/pull/3208)）：这属于项目基础设施的自动化能力补齐，配合 [#3207](https://github.com/nanocoai/nanoclaw/pull/3207) 的安全修复，体现了对供应链安全的重视。


## 用户反馈摘要

- **"没有 pip 通道，我就不能用你们推荐的加固镜像路径"**（来自 [#3217](https://github.com/nanocoai/nanoclaw/issues/3217)）：用户 @stumpjumper 明确指出 `install_packages` 只覆盖 apt 和 npm，Python 安装无处安放。该用户描述的 "hardened-image adoption" 场景表明，企业级/安全敏感用户正在尝试采用预构建加固镜像，Python 依赖是常见需求，这一缺口直接影响了他们的采纳决策。同日递交文档 PR 说明该用户选择双管齐下（先文档化、再推进修复），处理方式相当专业。
- **"路径拼进去，但容器里根本没有这个路径"**（来自 [#3142](https://github.com/nanocoai/nanoclaw/pull/3142)）：来自 @ira-at-work 的 PR 描述揭示了 Signal 通道附件投递的深层问题——附件路径拼接进消息文本，但该路径从未挂载进 agent 容器。这个问题持续存在一段时间，影响所有通过 Signal 发送非图片/音频附件的用户，重灾区是 PDF、文本文件等常见办公文档。


## 待处理积压

| 项目 | 创建时间 | 等待天数 | 类型 | 备注 |
|------|---------|---------|------|------|
| [PR #2529](https://github.com/nanocoai/nanoclaw/pull/2529) | 2026-05-18 | 84 天 | 修复 | Signal 入站附件投递修复，今日有更新，但已近 3 个月，应该尽快合入或关闭 |
| [PR #3050](https://github.com/nanocoai/nanoclaw/pull/3050) | 2026-07-14 | 27 天 | 功能 | Dial 通道配套的向导与技能定义，与 #3041 配合使用 |
| [PR #3041](https://github.com/nanocoai/nanoclaw/pull/3041) | 2026-07-14 | 27 天 | 功能 | Dial 通道适配器，功能完整的 Feature PR，等待合并时间较长 |
| [PR #3142](https://github.com/nanocoai/nanoclaw/pull/3142) | 2026-07-27 | 14 天 | 修复 | Signal 附件路径无效问题修复，今日有活跃更新但尚未合并 |
| [PR #3186](https://github.com/nanocoai/nanoclaw/pull/3186) | 2026-08-04 | 6 天 | 重构 | 技能自有能力的主机接缝，重构类 PR 往往需要较长的 review 周期 |

> ⚠️ **维护者关注提醒**：#2529 已开放近 3 个月且今日有更新，说明作者仍在维护；#3041/#3050 组合功能已搁置超 4 周，若再不处理可能影响贡献者积极性。

---

*本日报基于 GitHub 公开数据自动生成，数据截止时间为 2026-08-10。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 开源项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时项目活跃度处于**高位**：累计 24 条 Issue 更新（其中新开/活跃 17 条）、38 条 PR 更新（其中 30 条待合并）。值得注意的是，**新提交的 PR 数量显著超出合并/关闭的数量**，表明开发团队正在大规模、多线程推进功能开发。主要集中在三大方向：① **工具发现（tool-search）与能力批处理并发执行**（#7405/#7407/#7409/#7410/#7411）；② **web-push 通知通道与 Slack/Telegram 频道重构**（#7398/#7397）；③ **outbound 交付可靠性修复**（#7395/#7028）。无新版本发布。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

过去 24 小时 PR 更新 38 条（已合并/关闭 8 条），重点推进方向如下：

### 3.1 工具发现（Tool Discovery）性能与架构升级（核心进展）

该方向形成了清晰的 **PR 堆栈（stack）**，由 @serrrfirat 主导，目标是将 deferred-tool 检索机制推向生产级：

- **#7409** `test(tool-search): baseline catalogs at 100-1,000 tools` — 建立 100/500/1000 工具规模下的检索质量基线，为后续优化提供量化评估标准。*[链接](https://github.com/nearai/ironclaw/pull/7409)*
- **#7410** `feat(tool-search): return bounded complete signatures` — 实现 #7405 的 Phase 1：在预算允许时返回完整参数签名，超出预算时降级为紧凑元数据。*[链接](https://github.com/nearai/ironclaw/pull/7410)*
- **#7411** `feat(tool-search): make deferred-tool retrieval a swappable provider` — 将检索机制抽象为可替换的 provider（沿用此前记忆系统的 seam #6345 模式）。*[链接](https://github.com/nearai/ironclaw/pull/7411)*

### 3.2 通知通道与渠道重构

- **#7398** `feat(web-push): browser push notifications + PWA` — 使 Web 应用成为第一方通知渠道（与 Slack/Telegram 对齐），实现 W3C Web Push 完整协议栈（RFC 8030/8291/8292）。*[链接](https://github.com/nearai/ironclaw/pull/7398)*
- **#7397** `Presence-based Slack/Telegram channels with ephemeral per-ping threads` — 重构机器人频道管理，移除 owner-vs-actor 概念。*[链接](https://github.com/nearai/ironclaw/pull/7397)*

### 3.3 Outbound 可靠性修复（长期积累）

@theredspoon 提交的系列修复正在持续收尾中：

- **#7395** `fix(outbound): close send-claim TOCTOU race and allow failed-row reopen` — 修复交付声称（claim）的 TOCTOU 竞态条件。*[链接](https://github.com/nearai/ironclaw/pull/7395)*
- **#7028** `fix(outbound): preserve terminal status during recovery` — 恢复期间保留终态。*[链接](https://github.com/nearai/ironclaw/pull/7028)*

### 3.4 CI 与基础设施

- **#7412** 代码库知识图谱夜间自动刷新。*[链接](https://github.com/nearai/ironclaw/pull/7412)*
- **#7394** `fix(ci): resolve SANDBOX_DOCKER_EXACT_PATHS crate prefixes dynamically` — 修复 CI 沙箱路径硬编码问题。*[链接](https://github.com/nearai/ironclaw/pull/7394)*
- **#7413** `Fix main branch CI failures 20260810` — 修复主分支 CI 故障。*[链接](https://github.com/nearai/ironclaw/issues/7413)*

> **评估**：项目整体前进速度较快，工具发现的大规模重构 + 通知渠道扩展是当前两大核心投入方向；outbound 可靠性系列修复（@theredspoon）展现了团队偿还技术债务的决心。

---

## 4. 社区热点

### 4.1 最受关注的新议题

| Issue/PR | 标题 | 评论 | 信号 |
|----------|------|------|------|
| [#7405](https://github.com/nearai/ironclaw/issues/7405) | 改进 deferred tool discovery（完整签名 + namespace-aware 目录预览） | 2 | 配套 3 个 PR 已提交，讨论热度将持续↑ |
| [#7407](https://github.com/nearai/ironclaw/issues/7407) | 并发执行 BatchPolicy::Parallel 能力批次 | 2 | 性能优化的直接诉求 |
| [#7400](https://github.com/nearai/ironclaw/issues/7400) | `stream: true` + caller `tools[]` 中途失败并留下"僵尸"线程 | 2 | **高优 Bug**，100% 复现率，涉及 1.1.0 正式版 |
| [#7392](https://github.com/nearai/ironclaw/issues/7392) | 用 omp 工具面替换第一方编码工具（实验） | 0 | 架构级方向性实验 |

### 4.2 分析

- 讨论热度集中在**工具发现性能**（#7405）与**并发执行**（#7407）方向，背后核心诉求是：**降低大工具量场景下的模型轮次消耗与延迟**。
- #7400 是今日用户报告的**最严重 Bug**（影响 1.1.0 正式版），评论区 2 条讨论已在推进中。注意有一个相关的对应 PR **#7401**（`Reject streamed Responses requests with external tools`，由 ironloopai bot 创建，Open 状态），建议优先合并。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高优先级（P1）

| Issue | 描述 | 状态 |
|-------|------|------|
| [#7400](https://github.com/nearai/ironclaw/issues/7400) | **`stream: true` + tools[] 导致流中断 + 永久不可删除的"僵尸"线程**。影响 1.1.0-rc.1 和 1.1.0 稳定版，100% 复现。 | 无专用修复 PR；#7401 拒绝了该组合（返回 400），但尚未合并 |

### 🟠 中优先级（P2）

| Issue | 描述 | 状态 |
|-------|------|------|
| [#7346](https://github.com/nearai/ironclaw/issues/7346) | Emoji 短代码以纯文本显示（`:wave:` 不转义） | 无 fix PR |
| [#7348](https://github.com/nearai/ironclaw/issues/7348) | Activity 工具调用与进度消息时间顺序错乱 | 无 fix PR |
| [#7345](https://github.com/nearai/ironclaw/issues/7345) | Agent 报告 61 个自动化 vs UI 显示 50 个（数字不一致） | 无 fix PR |
| [#7349](https://github.com/nearai/ironclaw/issues/7349) | 刷新页面后部分运行历史与 Activity 时间线消失 | 无 fix PR |
| [#5882](https://github.com/nearai/ironclaw/issues/5882) | Slack 重复重连后认证流程进入不可恢复的损坏状态（已存在 1 个月+） | 无 fix PR |
| [#6479](https://github.com/nearai/ironclaw/issues/6479) | Routine 可创建/修改其他 routine → 存在自我复制自动化风险 | 无 fix PR，**需安全审查** |

### 🟡 已关闭（今日修复验证中）

| Issue | 描述 | 备注 |
|-------|------|------|
| [#5522](https://github.com/nearai/ironclaw/issues/5522) | Reborn routine 失败（读不了 Slack DM + capability_info 重试循环） | ✅ 已关闭 |
| [#7292](https://github.com/nearai/ironclaw/issues/7292) | 已安装工具无法使用 + runner 心跳错误（CoinGecko demo） | ✅ 已关闭 |
| [#4341](https://github.com/nearai/ironclaw/issues/4341) | Agent 思维链暴露 + 卡在思考状态（Qwen3.6-35B） | ✅ 已关闭 |
| [#4344](https://github.com/nearai/ironclaw/issues/4344) | Agent 镜像用户消息作为自己的回复 | ✅ 已关闭 |
| [#5552](https://github.com/nearai/ironclaw/issues/5552) | 多工具失败后出现通用的 "invalid result" | ✅ 已关闭 |
| [#5509](https://github.com/nearai/ironclaw/issues/5509) | 新聊天创建延迟随累积对话历史增长 | ✅ 已关闭 |
| [#5510](https://github.com/nearai/ironclaw/issues/5510) | 无法删除旧 routines | ✅ 已关闭 |

---

## 6. 功能请求与路线图信号

### 可能纳入 v1.2.0 的功能

| 功能 | 来源 | 证据 |
|------|------|------|
| **Deferred tool discovery 增强**（完整签名 + namespace 目录） | #7405 | 已拆分为 3 个 PR（#7409/#7410/#7411），明确列入 v1.2.0 epic（#7166） |
| **BatchPolicy::Parallel 并发执行** | #7407 | 性能优化，已有明确实现方案 |
| **web-push 浏览器通知** | #7398 | 大型 PR（XL），作为第一方通知渠道 |
| **按用户选择 LLM 模型** | [#7183](https://github.com/nearai/ironclaw/issues/7183) | 来自 2026-07-23 Champions 周会反馈，当前模型选择仅限管理员 |

### 架构级实验

- **#7392** `Experiment: Replace first-party coding tools with pinned omp tool surface` — 用外部 omp 合同替换 IronClaw 自身编码工具，属于探索性方向。*[链接](https://github.com/nearai/ironclaw/issues/7392)*

### 测试/CI 覆盖

- **#7360** `Expand stress coverage across built-in and durable write paths` — 夜间压力测试目前未覆盖工具调用路径，属于测试基建缺口。*[链接](https://github.com/nearai/ironclaw/issues/7360)*

---

## 7. 用户反馈摘要

- **Slack DM 读取失败 + 重试循环**（#5522，已关闭）：用户任务要求读取 Slack 私信，但系统"无读取能力"却陷入 `capability_info` 重试循环。→ 修复后关闭。
- **自动化数量不一致**（#7345）：Agent 声称 61 个自动化，UI 只显示 50 个。用户评论指出"要么 Agent 在幻化状态，要么 UI 计数有误"。→ 核心信任问题。
- **大量无效工具调用**（#6046）：简单 email-to-sheet 工作流触发了 **124 次工具调用**，模型过度分析无关内容（base64 解码、FOIA 请求、定价邮件等）。这一反馈强化了 #7405/#7407 工具发现与并发改进的紧迫性。*[链接](https://github.com/nearai/ironclaw/issues/6046)*
- **GitHub token 吊销后误导性错误**（#5878）：收到"模型提供商暂时不可用"等错误而非重新认证提示 → 错误信息误导用户，影响可诊断性。
- **Slack 自动化发送中间进度消息而非最终结果**（#5551）：用户期望收到完成摘要，实际收到执行过程细节。
- **webui 时间线错乱**（#7348）：多工具调用场景下 Activity 块和进度消息顺序混乱，用户评论反映执行时间线难以理解。
- **工具安装后无法使用**（#7292，已关闭）：CoinGecko demo 工具安装后"无法使用"，心跳错误。

---

## 8. 待处理积压

### ⚠️ 长时间未响应/未修复（提醒维护者关注）

| 类别 | Issue/PR | 创建时间 | 备注 |
|------|----------|----------|------|
| **P2 Bug（1 个月+）** | [#5882](https://github.com/nearai/ironclaw/issues/5882) — Slack 重连后认证流程卡死 | 2026-07-09 | 无 fix PR，用户只能通过重装扩展恢复 |
| **P2 Bug（1 个月+）** | [#6046](https://github.com/nearai/ironclaw/issues/6046) — email-to-sheet 124 次工具调用 | 2026-07-13 | 24 天内未分配 |
| **P2 Bug（1 个月+）** | [#5878](https://github.com/nearai/ironclaw/issues/5878) — GitHub token 吊销误导错误 | 2026-07-09 | 无 fix PR |
| **P2 Bug（1 个月+）** | [#6479](https://github.com/nearai/ironclaw/issues/6479) — Routine 自我复制风险 | 2026-07-22 | 安全风险，建议高优处理 |
| **PR 长期未合并** | [#5101](https://github.com/nearai/ironclaw/pull/5101) — ci: reuse cargo-component installer | 2026-06-20 | 已 Open **51 天**，需关注 |

### ⏳ 大型 PR 堆积（注意合并时效性）

以下 PR 均来自 @theredspoon，已存在 7 天以上且无合并操作，可能是一个大型功能堆栈的一部分，建议确认依赖关系后批量处理：

- #7048（wasm 诊断清理）、#7034（代理设置报告）、#7027（禁用环境代理发现）、#7063（CI planner 路径）、#7028（outbound 恢复）、#7395（TOCTOU 竞态）— 涉及 outbound、network、wasm、CI 四个模块。*[PR 列表](https://github.com/nearai/ironclaw/pulls?q=author%3Atheredspoon+is%3Aopen)*

---

📊 **综合健康度评估**：项目活跃度高，工具链重构与稳定性修复并进；**主要风险**为 P2 级别 Bug 的积压周期较长（超过 1 个月）以及大型 PR 堆栈合并节奏过慢。建议优先关注 #7400/#7401（Responses API 流式问题）的修复合入，并安排 #6479（Routine 自我复制）的安全审查。

---
*报告生成时间：2026-08-10 | 数据来源：github.com/nearai/ironclaw*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-10

## 今日速览

今日项目活跃度相对平稳，过去24小时共有 12 条更新（2 条 Issues、9 条 PR、0 个 Release）。值得关注的是，所有“最新”动态中大部分为陈旧性条目被标记关闭，真正的新增讨论仅有 1 条 Issue（#2453，自定义模型切换被误判）。这反映出项目核心开发节奏有所放缓，社区侧仍有一个真实用户体验问题等待响应。今日无新版本发布，合并的 PR 均为陈旧条目清理，项目当前处于维护收敛期而非功能密集迭代期。

---

## 项目进展

今日无新的 PR 合并记录（7 条已关闭 PR 均为 4 月创建的陈旧条目，今日被 stale 机制自动标记关闭，非人工合并）。其中包含以下值得关注的已关闭 PR（链接均为原始 PR）：

- **#1247** ([链接](https://github.com/netease-youdao/LobsterAI/pull/1247))：修复 OpenClaw 模型切换后因 provider 限制导致无法恢复的问题，实现运行时感知 `app_config` 变更并触发网关重启/延迟重启
- **#1249** ([链接](https://github.com/netease-youdao/LobsterAI/pull/1249))：修复 DiffView 无法渲染问题——工具名匹配条件过窄，遗漏 Claude SDK 和 OpenClaw 的实际工具名
- **#1259** ([链接](https://github.com/netease-youdao/LobsterAI/pull/1259))：优化网关打包与依赖处理，为外部 IM/渠道平台 SDK 生成 stub 包，提升构建稳定性

这些 PR 在功能层面均具备较高价值，但历经 4 个月未获合并，可能需要社区维护者重新审视。

---

## 社区热点

**#2453 [OPEN] 切换自定义模型，被系统定义为不许可？** ([链接](https://github.com/netease-youdao/LobsterAI/issues/2453))
- 创建于 2026-08-09，已有 1 条评论
- 用户报告在切换自定义模型（如 `custom_1/openai/gpt-oss-20b:free`）时，系统将 `provider/model` 格式误判，导致 `provider` 被识别为 “OpenAI” 而报错
- 该问题发生在同一线程内切换模型时，而新建线程沿用同一模型则无此问题
- 涉及 OpenRouter 免费模型和 NVIDIA 模型

**分析**：这是近期唯一的新增活跃 Issue，揭示了模型标识解析逻辑在“同一线程内动态切换”场景下的缺陷，属于核心功能的体验问题，值得优先处理。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|-----------|------|------|
| 🟠 高 | [#2453](https://github.com/netease-youdao/LobsterAI/issues/2453) | 自定义模型标识被误判，同一线程内切换模型报错 | 开放，无 fix PR |
| 🟡 中 | [#1243](https://github.com/netease-youdao/LobsterAI/issues/1243)（已关闭） | `qwen-portal-auth` 插件配置循环写入，导致网关每 5-20 分钟自动重启 | 已由 stale 机制关闭，**未见修复记录**，若仍存在需重新开启 |
| 🟢 低 | PR #1249（已关闭） | DiffView 组件不渲染，根源是 Edit 工具名匹配条件过窄 | 已有修复但未合并 |

**提示**：#1243 虽被标记 `[CLOSED]`，但关闭原因是 stale 自动清理而非确认修复，建议维护者确认问题是否仍然存在。

---

## 功能请求与路线图信号

- **定时任务自然语言输入**（PR #1256，[链接](https://github.com/netease-youdao/LobsterAI/pull/1256)）：通过 LLM 将自然语言描述转换为 cron 表达式，支持“自然语言 / 手动选择”两种模式。若被合并，将显著降低定时任务配置门槛，是极具产品价值的功能增强，建议优先评估。
- **定时任务未保存更改确认弹窗**（PR #1252、#1258，[链接](https://github.com/netease-youdao/LobsterAI/pull/1252)）：防止用户误操作丢失表单内容，属于体验优化类功能，实现成本低、风险小。
- **模型/网关切换的运行时感知**（PR #1247，[链接](https://github.com/netease-youdao/LobsterAI/pull/1247)）：让 OpenClaw 感知模型/provider 配置变更并自动重启——这与此前 #1243 的网关重启问题直接相关，如果合并可能从机制层面解决该问题。

---

## 用户反馈摘要

**来自 #2453 的评论反馈**：

- 用户切换模型时，“同一个线程内切换模型”的场景被错误拦截，报错提示使流程中断
- 用户对自定义模型标识格式（`provider/model` 格式）感到困惑——他们使用 OpenRouter 和 NVIDIA 上的免费模型，期望系统能正确识别而非误判为 “OpenAI”
- 用户明确说明“开一个新的线程，沿用一个模型，就不会遇到这样的情况”，说明问题定位在会话内的模型切换逻辑而非模型本身的兼容性

**痛点总结**：模型切换的核心路径存在体验断裂——对开发者用户而言，频繁在不同模型间切换是正常使用方式，当前误判阻断该路径，影响日常使用。

---

## 待处理积压

以下条目长期未响应或未确认处理结果，建议维护者关注：

| 项目 | 类型 | 停留时间 | 说明 |
|------|------|----------|------|
| [#1243](https://github.com/netease-youdao/LobsterAI/issues/1243) | Bug Issue | 4.5 个月 | 网关频繁重启问题被 stale 关闭，**无修复记录确认**，建议重新评估 |
| [#1247](https://github.com/netease-youdao/LobsterAI/pull/1247) | PR | 4.5 个月 | 模型切换恢复机制修复，功能完整但未合并 |
| [#1249](https://github.com/netease-youdao/LobsterAI/pull/1249) | PR | 4.5 个月 | DiffView 渲染修复，问题明确、改动小 |
| [#1256](https://github.com/netease-youdao/LobsterAI/pull/1256) | PR | 4.5 个月 | 定时任务自然语言输入，高产品价值功能 |
| [#1275](https://github.com/netease-youdao/LobsterAI/pull/1275)、[#1276](https://github.com/netease-youdao/LobsterAI/pull/1276) | 依赖更新 PR | 4 个月 | CI 依赖需升级，长期未合并，存在安全与兼容性隐患 |

**整体健康度评估**：项目处于维护低谷期——4 个月前提交的一批高质量修复仍未被合并，近期新增 Issue 也未获得响应。建议维护者集中处理积压 PR，优先合并且发布一个补丁版本，以回应用户对模型切换问题（#2453）的诉求。

---

*数据来源：[LobsterAI GitHub 仓库](https://github.com/netease-youdao/LobsterAI) | 统计周期：2026-08-09 至 2026-08-10*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-10

## 1. 今日速览

过去 24 小时内，Moltis 项目收到 **2 个新 Bug Issue**（#1187、#1185），其中 #1185 已持续存在一天以上，二者均尚未获得官方回复或有对应修复 PR。代码贡献方面有 **1 个修复 PR**（#1186）处于待合并状态，该 PR 修复了 Vault 恢复助记词在 hash 计算与 KEK 派生之间规范化不一致的隐患，内容简短但直指密钥管理核心链路。无新版本发布，无 PR 合并或关闭记录。整体来看，项目今日处于**接收反馈、累积补丁**的节点：Bug 报告以小规模用户侧问题为主，PR 池保持收敛，社区活跃度中等，**健康度稳定但需尽快响应上述 Bug 以维持信任**。

## 2. 版本发布

无。

## 3. 项目进展

今日暂无 PR 被合并或关闭，但有一项值得关注的待合并修复：

- **[#1186] fix(vault): normalize recovery phrase before hashing**（@pxmpsdev，2026-08-09 创建）
  - 链接：https://github.com/moltis-org/moltis/pull/1186
  - 该 PR 修复了 `derive_recovery_kek` 在派生 KEK 前对恢复助记词进行规范化（去除破折号、转大写）的流程，使 Vault 解封操作已能接受小写或带破折号的助记词短语，但**存储的 hash 仍基于原始未经处理的短语计算**，导致同一短语在不同输入格式下产生不一致的 hash 校验结果。PR 将 hash 计算移到规范化之后，消除这一不一致性。
  - **项目意义**：Vault 密钥管理是 Moltis 安全体系的核心，该 fix 解决了用户输入容错与密钥派生一致性之间的脱节问题（对应的测试用例为 `recovery_key_case_insensitive`），属于**稳健性提升**。合并后将为用户提供更宽容的恢复流程，同时不降低安全性。目前项目处于等待 reviewer 合入的阶段。

## 4. 社区热点

今日无高评论或高互动量 Issue/PR（所有条目评论数均为 0 或未显示），但以下两个议题构成了社区关注的主要方向：

- **Issue #1187 — Heartbeat 设置 UI 重置问题**（@IlyaBizyaev，2026-08-09）
  - 链接：https://github.com/moltis-org/moltis/issues/1187
  - 用户报告 Heartbeat 设置界面在提交表单时，**表单中未展示的字段会被静默重置**，即 UI 与底层配置存在字段不同步问题。这说明在配置面板中可能存在"隐藏字段"或"仅程序化修改的字段"，用户感知为配置丢失，是典型的**UI/UX 数据完整性问题**，诉求是希望表单能完整反映或保护未展示的配置项。

- **Issue #1185 — Apple Container 1.x 沙箱状态误判**（@mikz，2026-08-08 创建，2026-08-09 更新）
  - 链接：https://github.com/moltis-org/moltis/issues/1185
  - 用户反馈 Apple Container 1.x 沙箱实际已启动，但 Moltis 将其识别为未运行状态。这属于**运行时状态检测逻辑缺陷**，可能导致调度或资源管理流程做出错误决策，对于依赖容器状态判断的自动化工作流有直接干扰。

**分析**：社区热点集中在**配置持久性与容器状态检测的可靠性**上，两者均涉及"系统实际状态与用户看到的状态不一致"的信任问题，反映了用户对 Moltis 作为基础设施的管理精度有较高期待。

## 5. Bug 与稳定性

今日共报告 2 个 Bug，无崩溃类严重问题，严重程度评估如下：

| 严重程度 | Issue | 描述 | 修复 PR |
|---------|-------|------|---------|
| **中高** | [#1185](https://github.com/moltis-org/moltis/issues/1185) | Apple Container 1.x 沙箱已启动但被误判为未运行，影响依赖容器状态判断的自动化流程 | ❌ 无 |
| **中低** | [#1187](https://github.com/moltis-org/moltis/issues/1187) | Heartbeat 设置 UI 静默重置未在表单中展示的字段，用户体验受损但数据本身未丢失 | ❌ 无 |

另有一项与 Vault 恢复相关的潜在一致性 bug，已由 **[PR #1186](https://github.com/moltis-org/moltis/pull/1186)** 覆盖（待合并），建议尽快合入并在 release notes 中标记为 bugfix。

**稳定性小结**：无内存泄漏、崩溃或数据损坏类高危回归；核心问题集中在状态检测与配置写入两个侧面，建议优先处理 #1185（影响面更广），并在 UI 层补充集成测试以免 #1187 类问题再犯。

## 6. 功能请求与路线图信号

今日无明确的新功能请求（所有新 Issue 均为 bug 类型）。但从 **[#1186](https://github.com/moltis-org/moltis/pull/1186)** 的修复方向来看，项目正在强化 **Vault 恢复短语的输入友好性**（兼容小写与破折号），这可能与后续计划中的"恢复流程体验优化"有关联。此外，#1187 中暴露出 Heartbeat 设置的字段管理问题，可能催生**设置面板"显示所有可配置项"**的产品改进需求，建议维护者关注是否需要在设置模型层引入字段白名单机制，避免 UI 与持久化配置脱节。此方向若被采纳，可作为下一版本中配置管理重构的一部分。

## 7. 用户反馈摘要

本次数据暂无 Issue 评论内容可提炼，但可从报告本身归纳用户痛点：

- **配置一致性担忧**（来自 #1187）：用户期望 UI 表单能忠实呈现所有实际配置项，被静默重置会造成"配置丢失"的不信任感，特别是 Heartbeat 这类关键网络参数。侧面反映用户对配置操作的可预期性要求较高。
- **容器状态可视性信任**（来自 #1185）：用户以容器实际运行状态为准，期望 Moltis 的状态检测跟随实际运行环境而不是出现误报。该问题若频繁发生，将影响用户对 Moltis 调度能力的信任。
- **恢复流程容错期待**（来自 #1186 的上下文）：已有测试 `recovery_key_case_insensitive` 表明开发团队已在考虑大小写/格式容错，但实现尚不完全一致，用户希望**助记词输入体验**能更宽容，降低操作门槛。

总体而言，用户对 Moltis 的**配置准确性和状态感知能力**有较强依赖，对安全相关的密钥流程体验也有改进期待。

## 8. 待处理积压

- **[#1185 - Apple Container 1.x 状态误判](https://github.com/moltis-org/moltis/issues/1185)**（2026-08-08 创建，已过 24 小时无维护者回复）
  - 该问题涉及容器运行时状态检测，影响面可能覆盖多容器场景下的调度逻辑，建议维护者尽快标记 `bug` 标签并安排排查。连续两天无响应，或引起用户不满。

- **[#1186 - Vault recovery phrase normalize PR](https://github.com/moltis-org/moltis/pull/1186)**（2026-08-09 创建，待合并）
  - 修复内容明确且已有对应测试覆盖，请 reviewer 尽快审阅合并，避免与后续 Vault 相关改动产生冲突。

- 另 #1187 刚创建不足 24 小时，暂不构成积压，但建议同上处理，避免同类配置类问题被忽略。

> 建议维护团队在接下来 24 小时内对 #1185 和 #1187 进行初步 triage（确认复现 + 标记优先级），以保持社区的响应速度感知。

---
*报告生成时间：2026-08-10 | 数据范围：2026-08-09 - 2026-08-10 | 数据源：GitHub Moltis 仓库*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-10


## 1. 今日速览

CoPaw 项目过去 24 小时保持高活跃度，共产生 32 条 Issue 更新与 34 条 PR 更新，其中新开 Issue 25 条、待合并 PR 31 条，反映出社区反馈与贡献双通道均处于繁忙状态。今日无新版本发布，但 Bug 修复类 PR 占比高企（约 60%），涉及前端渲染、MCP 超时、SQLite 崩溃等多项稳定性问题；同时有 2 个功能型 PR 合并（桌面端窗口文本选择修复、Msg 时间戳时区修复），以及一个包含 7 项能力统一的大型特性 PR 持续跟进中。生态层面，官方任务认领帖（#2291, 66 评论）持续作为社区协作枢纽；但多平台适配（macOS ffmpeg 路径、Windows 安装锁文件、移动端支持）和流式体验缺失等用户反馈密集，仍是当前最明显的社区痛点。


## 3. 项目进展

今日共关闭/合并 3 个 PR，另有 31 个待合并。重要 PR 进展如下：

**已合并/关闭：**

- **#6802 fix: restore desktop window text selection**（由 @zhaozhuang521 提交，合并于 08-10）— 修复桌面端窗口文本无法选中的回归问题，提升桌面客户端基础可用性。链接：https://github.com/agentscope-ai/QwenPaw/pull/6802
- **#6855 fix(timestamp): interpret naive Msg timestamps as process-local timezone**（由 @XiuShenAl 提交，合并于 08-10）— 修复 #6685 引入的 `+8h` 消息时间戳漂移回归。AgentScope 写入的 naive 时间戳实际为进程本地墙钟时间，此前被错误当作 UTC 处理。链接：https://github.com/agentscope-ai/QwenPaw/pull/6855

**值得关注的在途 PR：**

- **#6302 feat: unify provider discovery, model metadata, routing, and agent controls**（更新于 08-10，持续迭代中）— 将 provider 发现、模型元数据、路由、Agent 控制与 Console 模型管理统一，设计上保持"已发现候选项"与"已配置模型"分离，并要求显式添加后使用。这是近期最大的架构级变更。链接：https://github.com/agentscope-ai/QwenPaw/pull/6302
- **#6843 fix(console): stream SSE in real-time via pure ASGI middleware**（@yang1122ww，first-time-contributor）— 针对 #6820，移除 `BaseHTTPMiddleware` 对 SSE 的缓冲，改为纯 ASGI 中间件实现真正的增量输出。若合并将直接改善前端流式体验。链接：https://github.com/agentscope-ai/QwenPaw/pull/6843
- **#6688 fix(plugins): isolate bare absolute imports per plugin namespace**（@An-idd，first-time-contributor）— 修复 qwenpaw-creator 安装失败问题（#6683），已将插件入口文件的顶层裸导入纳入插件私有命名空间隔离。
- **#6799 fix(shell): stop temp output file leakage and cap captured output**（@lllyfff）— 修复 Windows 下 `execute_shell_command` 临时文件泄漏，一个实际场景产生 **26 GB 无法删除的孤儿文件**。引入输出上限与删除保护。


## 4. 社区热点

- **#2291 [CLOSED, help wanted] 开源任务认领帖** — 66 条评论，社区贡献者认领任务的官方枢纽。链接：https://github.com/agentscope-ai/QwenPaw/issues/2291
- **#6782 Docker 版插件市场/应用市场始终"维护中"** — 9 条评论，2.0.1 Docker 部署用户无法使用插件市场，影响面较大。链接：https://github.com/agentscope-ai/QwenPaw/issues/6782
- **#6811 OpenAI Responses 连续摘要忽略 disable_thinking 且中断被误报** — 5 条评论，已有对应修复 PR #6818。链接：https://github.com/agentscope-ai/QwenPaw/issues/6811

> 注：原数据包中链接域名为 `agentscope-ai/QwenPaw`，本报告统一使用此域名。若项目仓库为 `agentscope-ai/CoPaw`，请将链接前缀替换为对应地址。


## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 修复 PR |
|---|---|---|---|
| P0 | [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) | macOS 上打开 Scroll history.db（SQLite WAL）时 **SIGBUS 崩溃**，发生于 `sqlite3WalFindFrame` | 无 |
| P0 | [#6810](https://github.com/agentscope-ai/QwenPaw/issues/6810) | Windows 安装/更新未终止占用进程，NSIS 连弹多窗"无法写入文件"（python.exe、VCRUNTIME140.dll 等），2.1.0b1 自动更新时卡死 | 无 |
| P1 | [#6828](https://github.com/agentscope-ai/QwenPaw/issues/6828) | Console 空闲时因无限 CSS 动画持续重绘，CPU 占用约 20%（Tauri 桌面端） | [#6834](https://github.com/agentscope-ai/QwenPaw/pull/6834) |
| P1 | [#6822](https://github.com/agentscope-ai/QwenPaw/issues/6822) | 短暂网络故障后，streamable HTTP MCP 连接永久阻塞活跃对话 | [#6825](https://github.com/agentscope-ai/QwenPaw/pull/6825) |
| P1 | [#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) | 前端 UI 不显示模型输出/工具调用/思考过程中间状态，全部完成后一次性呈现 | [#6843](https://github.com/agentscope-ai/QwenPaw/pull/6843) |
| P1 | [#6821](https://github.com/agentscope-ai/QwenPaw/issues/6821) | thinking-mode 模型（DeepSeek V4）多轮对话时 400 错误，`reasoning_content` 需回传但未实现 | 无 |
| P1 | [#6811](https://github.com/agentscope-ai/QwenPaw/issues/6811) | OpenAI Responses 续写摘要忽略 `disable_thinking`；60 秒取消被误报为 malformed output | [#6818](https://github.com/agentscope-ai/QwenPaw/pull/6818) |
| P1 | [#6813](https://github.com/agentscope-ai/QwenPaw/issues/6813) | `consume_model_response` 对 AgentScope ChatResponse（dict 子类）调用 `hasattr(__aiter__)` 抛 `KeyError`，自动标题生成失败 | [#6816](https://github.com/agentscope-ai/QwenPaw/pull/6816) |
| P2 | [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | MCP 工具调用将"像数字的字符串"以数字类型传参，导致调用失败 | 无 |
| P2 | [#6847](https://github.com/agentscope-ai/QwenPaw/issues/6847) | 同样的任务和模型，QwenPaw 被杀软频繁拦截甚至强停进程，WorkBuddy 不会 | 无 |
| P2 | [#6826](https://github.com/agentscope-ai/QwenPaw/issues/6826) | 助手消息结束时间显示异常：实际思考 2 分钟但 UI 仅显示几秒 | [#6845](https://github.com/agentscope-ai/QwenPaw/pull/6845) |
| P2 | [#6799](https://github.com/agentscope-ai/QwenPaw/pull/6799)（PR） | Windows 下每次 `execute_shell_command` 重定向到临时文件，泄漏达 26 GB 且无法删除 | 本 PR 即修复 |


## 6. 功能请求与路线图信号

| 需求 | 来源 | 可能纳入版本 | 依据 |
|---|---|---|---|
| **Console 移动端适配** | [#6281](https://github.com/agentscope-ai/QwenPaw/issues/6281) | 中远期 | 需求明确但工作量大，需要独立布局方案 |
| **审批时附带用途描述** | [#6832](https://github.com/agentscope-ai/QwenPaw/issues/6832) | 近期（2.1.x） | 已有 [#6833](https://github.com/agentscope-ai/QwenPaw/pull/6833) 修复 channel 字段透传，描述字段为自然增量 |
| **新增内置 provider（火山方舟/小米 MiMo）** | [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) | 2.1.x | PR 已就绪，进入 review |
| **AnySearch Web 搜索替代 Tavily** | [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) | 2.1.x | 由服务商直接贡献的集成 PR |
| **ReMe4 完整路线图落地** | [#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840) | 中远期 | 2.1.0b2 已发布 ReMeLite（0.4.1.4），用户追问 Auto-Link/三模态搜索/四类摘要权重的时间线 |
| **Workspace 制品卡片（持久化）** | [#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719) | 2.1.x | 模仿 WorkBuddy 体验，检测 agent workspace 文件变更并展示为消息卡片 |


## 7. 用户反馈摘要

- **Docker 用户强烈受阻**：`#6782` 中用户重复反映 2.0.1 Docker 版本插件市场、应用市场始终提示"维护中"，导致无法安装任何扩展能力。由于 Docker 部署为主要分发渠道之一，该问题优先级应被拉高。
- **Windows 安装体验是重灾区**：`#6810` 反馈 2.1.0b1 自动更新卡死、卸载/安装过程中 NSIS 连续弹出 4+ 个"无法打开要写入的文件"，根因是扩展 NM host 锁定了安装目录文件。用户对升级路径丧失了信心。
- **流式输出耐心见底**：`#6820` 用户称前端 UI 不在过程中展示工具调用、思考步骤，全部完成了才一次性放出；`#6843` 的提交者即为同一用户，社区已从"抱怨"走向"自己修"。
- **上下文续写功能被高级用户质疑**：`#6811` 与 `#6853`（memory prompts 声称自动同步 digest 至 MEMORY.md 但实际未实现）共同显示，深度用户开始审视系统内部"说一套做一套"的实现细节，信任度正在承压。
- **杀软误报影响大**：`#6847` 用户表示 QwenPaw 执行任务时频繁被杀软拦截甚至强制终止进程，而同类 WorkBuddy 无此问题，侧面反映该产品在代码签名、行为特征方面成为杀软误判标靶，值得商业化团队关注。


## 8. 待处理积压

| 项目 | 类型 | 创建时间 | 最近活跃 | 状态 |
|---|---|---|---|---|
| [#5584](https://github.com/agentscope-ai/QwenPaw/issues/5584) 无法连接自定义 ascend-vllm 模型 | 已关闭 | 06-27 | 08-09（关闭） | 1.1.7 可连、后续版本均失败，最终关闭但未见修复说明；若确实无法复现，建议补充关闭原因 |
| [#5579](https://github.com/agentscope-ai/QwenPaw/issues/5579) 对话记录在异常中断场景下丢失，缺乏断点保存机制 | 已关闭 | 06-27 | 08-10（关闭） | 2 条评论后关闭，属于高风险数据丢失问题，建议核查关闭原因 |
| [#6683](https://github.com/agentscope-ai/QwenPaw/issues/6683) qwenpaw-creator 安装失败：插件顶层模块命名冲突 | OPEN | 08-04 | 08-10 | 已有修复 PR #6688 待合并 |
| [#6569](https://github.com/agentscope-ai/QwenPaw/pull/6569) suppress EIO/EPIPE print errors 后脱离 TTY | OPEN | 07-30 | 08-10 | 超过 10 天未合并，需评估 review 进展 |

> **维护者提醒**：`#5579` 与 `#5584` 两条均已关闭但评论稀少，前者涉及"Agent 执行重启命令导致对话全部丢失"的数据可靠性问题，后者涉及昇腾 vllm 生态兼容性，建议确认为关闭原因并在 release notes 中有所交代，避免用户困惑。

---
*本报告基于 2026-08-10 GitHub 公开数据自动生成，数据源：github.com/agentscope-ai/CoPaw。*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw（TK Copilot）项目动态日报

**日期：2026-08-10** | **数据来源：github.com/gaoyangz77/easyclaw**


## 1. 今日速览

EasyClaw 今日处于**维护性迭代发布期**，核心活跃度集中在版本交付而非社区讨论。过去24小时内，项目**无新增 Issues、无新增 PR**，社区互动处于低活跃水平，但连续发布了 **v1.8.94 与 v1.8.95 两个版本**，均聚焦于运行时稳定性与基础设施升级。这表明团队目前将主要精力投入在**内部工程质量加固**而非新功能开发上，属于典型的“发布后沉淀期”。对于终端用户而言，升级到最新版本即可获得更稳定的 Gateway 连接体验和新增的 Groq 服务商支持。


## 2. 版本发布

### 🔖 v1.8.95（最新）
- **发布时间**：2026-08-10（推测）
- **核心更新**：提升 Gateway 启动与渠道连接状态的稳定性
- **变更类型**：稳定性修复/增强
- **破坏性变更**：无
- **迁移注意**：macOS 用户在首次启动时若遇到 “'RivonClaw' is damaged and can't be opened” 提示，此为 Gatekeeper 对未签名应用的拦截，并非文件损坏，需在系统设置中手动允许运行。

> 链接：[v1.8.95 Release](https://github.com/gaoyangz77/easyclaw/releases)

### 🔖 v1.8.94
- **发布时间**：2026-08-09 或 08-10（推测）
- **核心更新**：
  1. 升级内置 OpenClaw runtime（底层运行时框架升级）
  2. 新增 **Groq Provider**（新增 LLM 服务商支持）
- **变更类型**：功能新增 + 依赖升级
- **破坏性变更**：无（但建议验证现有 OpenClaw 配置与新 runtime 的兼容性）
- **迁移注意**：若使用自托管 OpenClaw 服务，请同步检查版本匹配；macOS Gatekeeper 提示同上。

> 链接：[v1.8.94 Release](https://github.com/gaoyangz77/easyclaw/releases)

### 📌 版本节奏分析
连续两天发布两个 patch/minor 版本，说明团队正在快速响应稳定性问题并推进生态集成（Groq 的加入显著扩展了用户可选的推理后端）。建议用户**优先升级至 v1.8.95**。


## 3. 项目进展

过去24小时内 **无 PR 被合并或关闭**，因此无法从 PR 层面量化今日的功能推进。但从版本发布内容回溯，可以看到以下实质性进展：

| 进展方向 | 说明 | 状态 |
|---------|------|------|
| **Gateway 稳定性** | v1.8.95 重点修复了启动过程中的连接状态管理问题 | ✅ 已发布 |
| **运行时升级** | 内置 OpenClaw runtime 已升级至新版本 | ✅ 已发布 |
| **新服务商接入** | 新增 Groq 支持，丰富模型选择 | ✅ 已发布 |

**整体判断**：项目在过去48小时内完成了从“运行时底座升级”到“上层连接稳定性修复”的闭环，工程推进节奏稳健。


## 4. 社区热点

**无**。今日没有任何 Issues 或 PR 产生讨论，社区活跃度处于静默状态。结合版本发布频繁的现状，可以合理推断用户在升级后尚未遇到需要提交 Issue 的明显问题，或反馈存在滞后。

> 建议：项目组可在下个版本 Release Notes 中主动引导用户反馈，激活社区讨论。


## 5. Bug 与稳定性

今日 **无新增 Bug 报告**。但值得关注的是 v1.8.95 版本本身就是针对稳定性问题的修复版本，其目标问题（Gateway 启动及渠道连接不稳定）属于**中高严重度**的可靠性缺陷。

另外，macOS 的 “RivonClaw is damaged” 报错是一个**已知的、非代码层面的兼容性问题**，已随 Release Notes 提供了解决方案，严重度较低。

**稳定性评估**：当前未发现已知的、未修复的严重 Bug。


## 6. 功能请求与路线图信号

今日 **无用户提交新的功能需求**。不过从 v1.8.94 新增 Groq Provider 可以看出项目的集成路线图方向：

- **多服务商扩展**（信号强度：高）— Groq 的加入紧随此前已支持的 OpenAI/Anthropic 等，表明 EasyClaw 正在构建 **“服务商无关”的 AI 助手底座**。
- **运行时自研/升级**（信号强度：中）— 持续跟进 OpenClaw runtime 上游版本，采用“上游稳定、外壳快速迭代”的策略。

**下一版本可能方向**（推测）：继续增加主流 LLM 服务商支持（如 Mistral、Cohere 等），或优化渠道连接状态的可观测性（日志/仪表盘）。


## 7. 用户反馈摘要

今日无用户评论或 Issue 反馈可提取。唯一可识别的用户接触点是 **macOS Gatekeeper 拦截问题**，该问题在最近两个版本的 Release Notes 中被反复提及，说明：
- 这是当前用户安装时遇到的头号痛点；
- 项目组已意识到并主动在发布说明中提供引导。

> 用户痛点提示：建议项目组考虑 **Apple Developer 账号签名（$99/年）** 或 **公证（Notarization）** 以根治此问题，而非依赖用户手动绕过 Gatekeeper。


## 8. 待处理积压

📋 **当前积压情况**：暂无长期未响应的 Issue 或 PR。

⚠️ **风险提示**：由于今日数据为零、且近期社区互动偏低，需关注以下潜在问题：
- 若 v1.8.95 的稳定性修复未达预期，可能在未来 3-5 天内集中爆发 Issue；
- macOS 签名问题若持续存在，将长期消耗新用户的首因体验。

> 建议维护者：适当查看历史遗留的未关闭 Issue（此处无数据，需人工确认），重点标记与“渠道连接断开”“Gateway 启动失败”相关的历史反馈，与 v1.8.95 的修复项做交叉验证。


## 📊 项目健康度总结

| 维度 | 评分（5分制） | 说明 |
|------|:---:|------|
| 版本迭代速度 | ⭐⭐⭐⭐⭐ | 连续发布，响应迅速 |
| 社区活跃度 | ⭐ | 24h 零讨论，热度偏低 |
| 稳定性控制 | ⭐⭐⭐⭐ | 针对性修复已发布，等待验证 |
| 路线图清晰度 | ⭐⭐⭐⭐ | Groq 接入信号明确 |
| 新用户友好度 | ⭐⭐⭐ | Gatekeeper 问题仍需改善 |

**结论**：EasyClaw 当前处于“工程效率高、社区声量低”的状态。项目代码演进健康，但用户反馈闭环有待加强。建议团队在下个版本发布时同步开展社区运营动作（如更新日志可视化、用户使用案例征集），将发布动能转化为社区活跃度。

---
*本日报由 AI 生成，数据截至 2026-08-10 23:59 UTC。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*