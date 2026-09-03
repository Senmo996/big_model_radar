# OpenClaw 生态日报 2026-09-03

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-03 01:57 UTC

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

## OpenClaw 项目动态日报 — 2026-09-03

---

### 1. 今日速览

项目今日整体活跃度**极高**：24小时内共处理500条 Issue 更新与500条 PR 更新，其中新开/活跃 Issue 353条、PR 365条，整体吞吐量居于大型开源项目头部水平。但需要警惕的是，**Issue 净增长（206条）显著超过关闭速度**，且活跃 PR 中仅135条被合并/关闭，合并率约27%，项目正面临明显的待办积压压力。当前无新版本发布，社区讨论集中在**多代理会话管理、MCP 工具注入、消息投递可靠性、升级回归**四大主题上，P0/P1 级缺陷占比偏高，稳定性是当前最需要关注的问题。

---

### 2. 版本发布

今日无新版本发布。上一版本为 **2026.8.1**，目前社区有多个 Issue 报告该版本存在状态迁移与认证迁移的回归问题（见下文 Bug 部分），建议维护者在下一版本中优先修复。

---

### 3. 项目进展

今日有 **135条 PR 被合并/关闭**，**147条 Issue 被关闭**。由于未展示合并 PR 的具体列表，从已关闭 Issue 及活跃 PR 的关联信息可确认以下进展：

**已确认修复落地：**

| 关联 PR | 修复内容 |
|---|---|
| [#122067](https://github.com/openclaw/openclaw/pull/122067) | 完成 agent schema v17 迁移的 Doctor 路径修复，避免物理 schema 与声明版本不一致（Closes #122056） |
| [#134057](https://github.com/openclaw/openclaw/pull/134057) | CI 中 Kova 归档获取改为带重试的固定 codeload 下载，解决 extended-stable 发布拉取失败 |
| [#136561](https://github.com/openclaw/openclaw/pull/136561) | 修复 cron 表达式编辑导致的 stagger 窗口精度丢失问题 |

**已关闭且有明确修复迹象的 Issue：**
- [#86612](https://github.com/openclaw/openclaw/issues/86612) Docker 沙箱重启循环 — 已关闭
- [#123273](https://github.com/openclaw/openclaw/issues/123273) 命名智能体图片附件失败 — 已关闭
- [#124343](https://github.com/openclaw/openclaw/issues/124343) yield 占用的 subagent 永久挂起 — 已关闭
- [#134608](https://github.com/openclaw/openclaw/issues/134608) 2026.8.1 认证迁移后凭据丢失 — 已关闭
- [#96692](https://github.com/openclaw/openclaw/issues/96692) Slack 线程回复丢失 — 已关闭（有 linked open PR）

**当前活跃的开发方向**（从开放 PR 观察）：发布流水线解耦（[#136790](https://github.com/openclaw/openclaw/pull/136790) 应用资产不再阻塞 npm 发布）、Control UI 大量细节修复（仪表盘小部件、通知卡片、会话命名、任务面板稳定性）、provider 账号优先级暴露（[#132450](https://github.com/openclaw/openclaw/pull/132450)）。

---

### 4. 社区热点

今日讨论最集中的议题如下：

**🔥 [#99551 Codex worker 强化追踪](https://github.com/openclaw/openclaw/issues/99551)**（17条评论，已关闭）
> 由一次安全事故（worker `019f18dc`）驱动的横向加固追踪，设立了多个子 Issue 覆盖工具搜索、会话状态、安全边界。

**反映趋势**：项目开始系统性地追查 worker 级故障模式，从单点

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向分析报告

**报告日期：2026-09-03** | **数据窗口：过去 24 小时** | **覆盖项目：12 个**


## 1. 生态全景

当前生态处于「规模扩张与架构收敛并存的密集迭代期」。以 OpenClaw 为参照系的 "Claw 系" 项目群（Zeroclaw、NanoClaw、PicoClaw、TinyClaw、ZeptoClaw、EasyClaw、CoPaw 等）已形成事实上的家族生态，但 OpenClaw 单日净增 206 个 Issue、合并率仅 27%，头部项目正承受显著的规模治理压力。社区关注焦点从「能否跑通」转向「跑得稳、管得住、看得清」——多代理会话所有权、上下文生命周期、消息投递可靠性、MCP 工具边界安全成为跨项目共性议题。安全事件（sandbox 突破、危险指令绕过、供应链投毒风险）在同日多点暴露，标志着生态进入安全加固的集中响应期。与此同时，WebUI 体验、可观测性、渠道多模态化等「成熟度指标」开始主导差异化竞争。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | 合并/关闭 PR | Release | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（353 新/活跃） | 500（365 待处理） | 135 | — | ⚠️ 极高吞吐但积压恶化（净增 +206），P0/P1 缺陷占比偏高 |
| **NanoBot** | 2 | 23 | 4 | — | ✅ 健康；PR 队列积压 19 条，含 2 条 P1 |
| **Zeroclaw** | 50（35 活跃） | 50（47 待合并） | 3 | — | ⚠️ 架构决策密集，RFC 审阅带宽成瓶颈 |
| **PicoClaw** | 1 | 1 | 1 | — | ⚠️ 低活跃；QQ 通道 401 故障未修复 |
| **NanoClaw** | 2（新） | 21（18 待合并） | 3 | — | ✅ 重构+修复双线推进，但合并吞吐偏弱 |
| **IronClaw

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-03

## 1. 今日速览

过去24小时 NanoBot 项目保持高活跃度：共产生 2 条 Issue 更新和 23 条 PR 更新，其中 4 条 PR 已被合并/关闭，19 条正在等待审查合并。新功能与修复覆盖范围广泛，涉及 WebUI 界面打磨、OAuth 令牌持久化、会话安全加固、Streaming 消息支持、运行时上下文生命周期等多个方面。项目整体呈现出「功能开发与稳定性加固并行推进」的健康态势，多个来自社区的外部贡献者（如 @Shizoqua、@Re-bin、@chengyongru 等）在同一天内提交了多条高质量 PR，协作活跃度显著。唯一值得注意的是，当前 PR 队列积压量较大（19 条待合并），其中包含 2 条 P1 优先级的修复 PR 处于等待状态，需维护者优先处理。

## 2. 版本发布

过去24小时内无新版本发布。

## 3. 项目进展

今日共有 3 条 PR 被合并/关闭（另有 1 条合并/关闭记录未在列表中完整展示），均属质量改进与架构优化：

### 架构演进：AgentRunner 接管上下文压缩
- **[#5568] refactor(agent): let runner own context compaction**（已关闭）— 将上下文压缩流程从 AgentLoop 迁移至 AgentRunner，由 Runner 在每次 provider 调用前检查模型实际请求并触发 Memory consolidator。同步压缩机制使上下文管理更精确，减少请求侧 token 压力。来源: https://github.com/HKUDS/nanobot/pull/5568

### 稳定性修复：清理活跃任务组内存泄漏
- **[#5623] fix(agent): drop empty active-task groups after tasks finish**（已关闭）— 修复 `AgentLoop._active_tasks` 映射中长期残留空集合导致的内存泄漏问题。对长时间运行的网关服务而言具有重要意义，避免了会话键到空任务集的无界累积。来源: https://github.com/HKUDS/nanobot/pull/5623

### WebUI 体验优化：首次运行引导
- **[#5625] feat(webui): guide first-run AI setup**（已关闭）— 将首次运行时带有警示感的「Model not configured」状态替换为中性的「Choose your AI」引导页面，直接跳转至 Models 设置。降低了新用户的初次使用门槛，使首次配置流程更自然。来源: https://github.com/HKUDS/nanobot/pull/5625

此外，今日还有一条 WebUI 相关的 PR（#5636）正在推进 UI 一致性改进，说明项目在用户体验打磨上持续投入。

## 4. 社区热点

今日社区讨论焦点集中在 #5586 这一功能性议题上，同时 #5631 作为一条中文 Issue 也值得关注：

### 运行时上下文的生命周期灵活性（#5586）
- 链接: https://github.com/HKUDS/nanobot/issues/5586
- 讨论概述: 用户 @iChizer0 提出让运行时上下文块（Runtime-context blocks）支持 `ephemeral` 标记，即允许某些上下文仅用于当前模型请求、不持久化到会话历史中。当前所有运行时上下文都会被写入 session 行并在后续轮次重放，这既消耗 token 又可能造成信息污染。
- 社区反应: 此 Issue 是今日除 PR 外唯一有评论讨论的议题，且已有一个对应实现 PR（#5627）在 9 月 2 日提交，说明该需求获得了快速响应。
- 诉求分析: 这反映了用户对「控制上下文生命周期」的深层需求——不仅仅是「能否附加内容」，而是「附加的内容在什么时候应该消失」。对于涉及敏感信息或临时工具的对话场景，这是一个合理且必要的增强。

### WebUI 信息透明度需求（#5631）
- 链接: https://github.com/HKUDS/nanobot/issues/5631
- 内容概述: 中文用户 @Ying-Zi66 建议在 WebUI 中展示模型速度与上下文使用量信息（类似 DeepSeek harness 的展示方式）。
- 诉求分析: 这一需求代表了从「能用」到「好用」的进阶诉求——用户希望获得对推理性能和成本消耗的可见性，通常在深度使用后才会提出。该需求尚未有对应 PR，可作为后续路线图的参考信号。

## 5. Bug 与稳定性

过去24小时有 11 条与 Bug 修复相关的 PR 被提交或更新，按严重程度排序如下：

### P1 高风险（需优先关注）

| PR | 问题 | 状态 |
|---|---|---|
| [#5633] fix(session): reject session keys with path traversal components | 会话密钥直接拼接为文件路径，恶意 session id（如 `../../etc/passwd`）可能导致路径穿越漏洞，可访问 sessions 目录之外的文件 | 待合并，修复 #5564 |
| [#5403] fix(memory): use API-reported prompt tokens to trigger consolidation | 本地 tiktoken 估计与现代模型实际 token 数偏差 30-50%，导致上下文压缩在超出窗口时仍不触发 | 待合并，修复 #5402 |

> 链接：https://github.com/HKUDS/nanobot/pull/5633 · https://github.com/HKUDS/nanobot/pull/5403

这两条 PR 均涉及敏感问题（安全漏洞与核心功能失效），且已被标记为 P1，建议维护者优先安排 review。

### P2 中风险

- **[#5638] fix(copilot): store OAuth token in data directory**（待合并）— GitHub Copilot OAuth 凭据写入非持久化目录，容器部署下可能丢失。来源: https://github.com/HKUDS/nanobot/pull/5638
- **[#5446] fix(codex): persist OAuth tokens in Nanobot data directory**（待合并）— Codex OAuth 令牌使用了 oauth-cli-kit 的平台数据目录，容器/多环境部署下不可靠。来源: https://github.com/HKUDS/nanobot/pull/5446
- **[#5637] fix(matrix): propagate stream delivery failures**（待合并）— Matrix 频道流式发送失败被静默吞掉，且发送完成前即移除缓冲，导致消息可能丢失。来源: https://github.com/HKUDS/nanobot/pull/5637
- **[#5635] fix(sdk): preserve queued events on stream close**（待合并)— 队列满时关闭流会丢弃最旧的未读事件。来源: https://github.com/HKUDS/nanobot/pull/5635
- **[#5634] fix(channels): bound origin reply fingerprint cache**（待合并）— `_origin_reply_fingerprints` 缓存无界增长，长期运行网关可能内存膨胀。来源: https://github.com/HKUDS/nanobot/pull/5634
- **[#5632] fix(provider): preserve Codex prompt cache affinity**（待合并）— session-id 与 prompt_cache_key 不一致可能导致缓存命中率下降。来源: https://github.com/HKUDS/nanobot/pull/5632
- **[#5630] fix(agent): add size guardrails to Dream memory files and requests**（待合并）— 此前 #5622 修复系统提示词重复 bug 时移除了文件大小上限（原 8000 字符），导致 SOUL.md / USER.md 等文件可能无界增长并被注入每个请求。来源: https://github.com/HKUDS/nanobot/pull/5630

### 回归风险信号

- [#5630] 本身是 #5622 的回归修复，表明项目在快速迭代中需要加强回归测试。来源: https://github.com/HKUDS/nanobot/pull/5630

## 6. 功能请求与路线图信号

### 可能纳入下一版本的功能

- **Ephemeral 运行时上下文**（#5586 → #5627）：已有实现 PR（[#5627] feat: support ephemeral runtime context blocks）— 允许运行时上下文块标记为 `ephemeral`，仅对当前请求可见，不持久化、不重放。该功能的实现将影响 agent 循环的核心逻辑，属于架构级增强，有望随下个版本发布。来源: https://github.com/HKUDS/nanobot/pull/5627
- **Telegram 富消息流式发送**（#5614）：实现 Telegram 频道的流式富消息（rich message）发送，显著提升 TG 用户的使用体验。来源: https://github.com/HKUDS/nanobot/pull/5614
- **Cron 投递目标与批处理归档**（#5620)：为定时任务增加可配置的投递目标，引入「批量归档」生命周期状态。来源: https://github.com/HKUDS/nanobot/pull/5620
- **MiniMax 音乐生成支持**（#5212）：为已有的 music provider 栈补充 MiniMax 音乐生成的工具合约发现与技能指引。来源: https://github.com/HKUDS/nanobot/pull/5212

### 早期需求信号（尚无对应 PR）

- **WebUI 速度/上下文展示**（#5631）：在输入框附近或回答结束后展示模型速度与上下文使用量，类似 DeepSeek harness。来源: https://github.com/HKUDS/nanobot/issues/5631

### 长期演进方向（来自已合并 PR）

从 #5625（首次运行 Ai 引导）和 #5636（侧边栏控件对齐）可以看出，项目在用户体验和界面一致性上的打磨正在加速，这通常是产品进入成熟期的标志。

## 7. 用户反馈摘要

### 来自 Issue #5586 的讨论（今日唯一有评论的 Issue）

- **使用场景痛点**：运行时上下文块（runtime-context blocks）目前只能「永久附加」到会话历史中，每次后续对话都会被重放。对于适合一次性使用的工具输出、临时文件内容、一次性凭证等场景，这既浪费 token 预算（需要为不相关的内容付费），又可能在后续轮次中造成信息混淆。
- **用户预期**：希望增加 `ephemeral` 标记让上下文块「用完即走」，在当前请求中生效、在历史中消失。
- **隐含评价**：该 Issue 在 4 天内获得了 2 条评论和一个实现 PR（#5627），说明维护者和贡献者认可这一需求的有效性，响应速度体现了项目对社区反馈的重视。

## 8. 待处理积压

### 长期未响应的 PR（按等待时长排序）

- **[#4551] feat(heartbeat): add isolated_session config to allow shared session**（创建于 2026-06-26，已等待 69 天）— 为心跳网关增加 `isolatedSession` 配置，允许在目标聊天会话中执行并继承上下文。标记有 `conflict`，需要解决冲突后才能合并。链接: https://github.com/HKUDS/nanobot/pull/4551

### 其他 P1 待合并 PR

- **[#5403] fix(memory): use API-reported prompt tokens to trigger consolidation**（创建于 2026-08-16，已等待 18 天）— P1 优先级，影响记忆压缩核心功能，修复 #5402。链接: https://github.com/HKUDS/nanobot/pull/5403
- **[#5633] fix(session): reject session keys with path traversal components**（创建于 2026-09-02）— 安全漏洞修复，虽提交时间较新但严重性高。链接: https://github.com/HKUDS/nanobot/pull/5633

### 标记冲突的 PR（需注意后续 merge 难度）

- [#5212] MiniMax 音乐生成（2026-08-02 创建）
- [#5520] Codex Langfuse 追踪（2026-08-24 创建）
- [#4551] 心跳隔离会话（2026-06-26 创建）
- [#5611] 推理过程重放绑定到最后助手轮次（2026-08-30 创建）

以上 PR 均因 main 分支演进导致冲突，建议维护者集中安排一次冲突解决或提供协助。

---

**项目健康度评估**：整体活跃度 4.5/5。社区贡献者参与度高、修复响应快、功能迭代方向清晰。主要风险点在于 PR 队列积压（19 条待合并）和 4 条 PR 已出现冲突，若维护者 review 带宽不足，可能拖慢后续版本发布节奏。建议优先处理 2 条 P1 修复（#5633、#5403）及 1 条安全相关 PR（#5633），其次解决带 `conflict` 标记的积压 PR。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-03

## 1. 今日速览

过去 24 小时项目保持高活跃度：**50 条 Issue 更新**（35 条活跃 / 15 条关闭）与 **50 条 PR 更新**（47 条待合并 / 3 条已合并或关闭）。核心讨论集中在**架构级 RFC**（会话持久化所有权、内存生命周期策略、沙箱策略、wire protocol 一等公民）与**安全缺陷修复**（独立 delegate 绕过命令黑名单等 S0 级问题）。无新版本发布，但大量 RFC 已进入修订或接受状态，项目正处于**架构定型与安全加固并行的密集决策期**。维护者决策队列 tracker 的持续活跃暗示 RFC 审阅带宽仍是当前瓶颈。

## 2. 版本发布

过去 24 小时无新版本发布。多个已接受 RFC 仍在实施批次中，建议关注后续里程碑规划。

## 3. 项目进展

过去 24 小时有 **3 个 PR 被合并/关闭**（具体清单未在展示数据中展开），另有 **15 个 Issue 被关闭**，其中包含多项已完成并落地的修复与追踪事项：

- **Matrix 通道修复落地**：[#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855)（S0 级：homeserver 无法通过 `.well-known/matrix/client` 委派解析）已关闭，Matrix 通道发现机制修复完成。
- **遗留 HMAC node transport 退役**：[#10243](https://github.com/zeroclaw-labs/zeroclaw/issues/10243) 已关闭，无接收端的遗留模块被正式废弃或替代。
- **配置与 CLI 体验修复**：[#10147](https://github.com/zeroclaw-labs/zeroclaw/issues/10147)（CLI 跨进程无法完成配置 section 初始化）与 [#9760](https://github.com/zeroclaw-labs/zeroclaw/issues/9760)（Web Quickstart 未显示通道描述符默认值）均已关闭。
- **稳定性修复批次**：[#10456](https://github.com/zeroclaw-labs/zeroclaw/issues/10456)（MCP SSE 超大事件后残留解析）、[#10193](https://github.com/zeroclaw-labs/zeroclaw/issues/10193)（Matrix 推理文本与状态提示碰撞）、[#10286](https://github.com/zeroclaw-labs/zeroclaw/issues/10286)（ZeroCode 转录缺历史修剪后的持久 turns）均已关闭。
- **基础设施维护**：[#10510](https://github.com/zeroclaw-labs/zeroclaw/issues/10510) 完成 mdBook 0.5.4 升级并采纳内置图片缩放；[#9680](https://github.com/zeroclaw-labs/zeroclaw/issues/9680) 完成 CLI/硬件路径标签所有权审计。

总体来看，项目在过去 24 小时清理了一批持续数周的 Bug 积压，安全与文档基础设施同步推进。

## 4. 社区热点

今日讨论最密集的 Issues 集中在**架构 RFC 与决策治理**，评论数前五的 Issue 全部为 RFC 或 tracker：

| Issue | 标题 | 评论数 | 状态 |
|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 32 | 修订 5，待维护者审查 |
| [#6850](https://github.com/zeroclaw-labs/zeroclaw/issues/6850) | RFC: Decouple memory lifecycle policy from storage backends | 25 | 已接受 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy — filesystem and network restrictions | 22 | 进行中，待维护者审查 |
| [#9103](https://github.com/zeroclaw-labs/zeroclaw/issues/9103) | RFC: separate authoritative memory storage from optional enrichment connectors | 19 | 已接受 |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | RFC: Make wire protocol first-class in provider construction and onboarding | 19 | 待维护者审查 |

**背后诉求分析**：社区目前的讨论重心明显指向三个方向——**(a)** 会话与状态的所有权边界（#9487、#9600、#10526），反映了多工作流并发修改同一契约带来的协调痛点；**(b)** 安全策略的层次化与可组合性（#6996、#10165），尤其关注 sandbox 策略与应用层策略的漂移问题；**(c)** 存储与生命周期的解耦（#6850、#9103），诉求是让 gateway/channel 不必重复实现治理逻辑。此外，[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（维护者决策队列 tracker）有 14 条评论，说明社区明显感受到 RFC 决策积压的压力。

## 5. Bug 与稳定性

过去 24 小时报告的 Bug 按严重程度排列如下：

| 严重度 | Issue | 问题描述 | Fix PR 状态 |
|---|---|---|---|
| **S0** 数据丢失/安全风险 | [#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165) | **独立 delegate 绕过自身 `block_high_risk_commands` 策略**——当 `risk_profile` 配置了阻止高风险命令时，通过 independent delegate 执行 `rm` 等命令仍会成功，风险配置文件被忽略 | [#10188](https://github.com/zeroclaw-labs/zeroclaw/pull/10188) 修复中，待维护者审查 |
| **S1** 工作流阻断 | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | Web dashboard 中退出聊天窗口会中断运行中的 agent 任务（被视为用户打断），无法后台继续工作或查看文件 | 暂无 fix PR |
| **S1** | [#10501](https://github.com/zeroclaw-labs/zeroclaw/issues/10501) | MCP 工具结果图片在 OpenAI-compatible provider 上返回 400——图片内容部分被放入 `role: "tool"` 消息，而 OpenAI 兼容端点只接受 `role: "user"` | [#10566](https://github.com/zeroclaw-labs/zeroclaw/pull/10566) 修复中 |
| **S2** 降级行为 | [#10523](https://github.com/zeroclaw-labs/zeroclaw/issues/10523) | 启用 `compact_context` 时，bootstrap 文件（`AGENTS.md` 等）在 6,000 字符处静默截断，操作者无法感知 | 暂无 fix PR |
| **S2** | [#10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | 交互式 agent 会话硬编码 32,000 token 上限，忽略 `max_context_tokens = 131072` 配置 | [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) 通过 `context_compact_ratio` 侧向解决，待作者更新 |

已关闭的 Bug 修复包括：[#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855)（S0 Matrix 发现，已修复）、[#10456](https://github.com/zeroclaw-labs/zeroclaw/issues/10456)（S2 MCP SSE 解析）、[#10193](https://github.com/zeroclaw-labs/zeroclaw/issues/10193)（S3 Matrix 推理碰撞）、[#10147](https://github.com/zeroclaw-labs/zeroclaw/issues/10147)（S2 配置初始化）、[#10286](https://github.com/zeroclaw-labs/zeroclaw/issues/10286)（S2 ZeroCode 转录）。

## 6. 功能请求与路线图信号

多个 RFC 已进入**已接受（accepted）**状态，预计将进入实施批次；另有若干新 RFC 提交/修订，是下一版本能力的重要信号：

**已接受、等待实施：

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-03

## 1. 今日速览
过去 24 小时项目活跃度处于较低水平：共 1 条 Issue 更新（均为活跃状态）和 1 条 PR 更新（已关闭/合并）。当前最突出的问题是 QQ 频道通道完全不可用（Issue #3349），社区反馈集中在鉴权失败；同时一个长周期 PR（#1349，QQ 频道多附件支持）今日完成合并，为项目带来多模态交互能力增强。整体来看，项目处于“功能推进 +  Bug 待修”并行的正常迭代节奏，但需尽快响应 QQ 通道故障以免影响用户体验。

## 2. 版本发布
今日无新版本发布（最新 Releases 为空），故省略。

## 3. 项目进展
**已合并 PR：QQ 频道附件类型全面支持**
- PR [#1349](https://github.com/sipeed/picoclaw/pull/1349)（`feat(qq): support parsing and replying to more attachment types`）已关闭，状态为已合并。
- 核心内容：
  1. 支持解析 QQ 频道的 emoji 结构。
  2. 支持处理来自 QQ 频道的语音、图片、视频和文件消息。
  3. 支持在回复中发送本地语音、图片、视频和文件（发送前先上传）。
  4. 回复时优先使用 Markdown 消息，失败后回退其他方式。
- 影响：该 PR 从 2026-03-11 创建到 2026-09-02 更新，历时近 6 个月才合并，属于跨度较大的功能增强。合并后，PicoClaw 在 QQ 频道的多模态交互能力得到显著提升，也为后续版本发布积累了关键特性。

项目整体向前迈进一步：QQ 频道通道从“仅文本”扩展至“富媒体 + 结构化消息”，为开发者接入更丰富的交互场景提供了基础。

## 4. 社区热点
**Issue #3349：QQ 频道无法正常使用**（[链接](https://github.com/sipeed/picoclaw/issues/3349)）
- 状态：OPEN | 更新：2026-09-02 | 评论：2 | 👍：0
- 热点分析：
  - 这是当前唯一活跃的 Issue，也是社区讨论最集中的地方。用户在 Docker 和 Linux x86 版本上均复现该问题，影响面较广。
  - 报错核心：`failed to get websocket info: code:401`，服务端返回“请求头 Authorization 参数格式错误”。这表明客户端可能缺少有效的 Bot 鉴权信息或鉴权格式与新版 QQ 开放平台不匹配。
  - 由于 PR #1349 恰好涉及 QQ 频道消息处理，社区可能对“为何功能增强仍未解决基础鉴权”存有疑虑，建议维护者重点关注。

## 5. Bug 与稳定性
**P0 级 Bug（阻断核心功能）：QQ 频道通道整体不可用**
- Issue [#3349](https://github.com/sipeed/picoclaw/issues/3349)（OPEN，严重级别：高）
  - 现象：初始化 WebSocket 连接时返回 401，错误码 `11241 / 40011005`，提示 Authorization 头格式错误。
  - 影响：所有 QQ 频道机器人无法连接，属完全不可用状态。
  - 已确认：Docker 版和 Linux x86 版均受影响。
  - 是否有修复 PR：暂未见关联的修复 PR。
  - 建议：维护者应优先排查鉴权代码与新版 QQ 开放平台接口的兼容性，并尽快发布 hotfix。

## 6. 功能请求与路线图信号
今日无新建的功能请求 Issue，但合并的 PR #1349 传递了清晰的路线图信号：
- **QQ 频道多模态功能正式落地**：该 PR 实现了语音、图片、视频、文件的收发与回复，并优先使用 Markdown 消息，说明项目正朝着“更丰富的交互格式”方向演进。
- 结合 Issue #3349 的社区反馈，预计下一版本会同时包含 QQ 通道的鉴权修复和上述多模态功能，形成一次“修复 + 增强”的打包发布。

## 7. 用户反馈摘要
来自 Issue #3349 的反馈（基于评论内容与摘要）：
- **真实痛点**：用户尝试了官方推荐的 Docker 和 Linux 二进制两种部署方式，均遇到相同鉴权错误，说明问题不是环境差异所致，而是代码层面的通用缺陷。
- **使用场景**：用户期望将 QQ 频道作为机器人接入渠道，但当前无法完成初始连接，导致所有机器人功能不可用。
- **满意/不满意**：对现状不满意，认为基础连接稳定性存在问题，且错误信息指向明确（Authorization 格式错误），希望快速修复。

## 8. 待处理积压
- **Issue #3349（QQ 频道无法使用）**：创建于 2026-08-30，更新于 2026-09-02，尚不足一周，不属于“长期未响应”，但因其影响面大且无修复 PR，需维护者优先排期处理。
- 其他长期未关闭的 PR/Issue 今日无更新记录，暂无额外积压提示。

---
**附：项目仓库**：https://github.com/sipeed/picoclaw

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报

**日期：2026-09-03** | **数据窗口：过去 24 小时**

---

## 1. 今日速览

过去 24 小时内 NanoClaw 项目保持高度活跃：共产生 2 条新 Issue、21 条 PR 更新（其中 18 条待合并，3 条已合并/关闭），虽无新版本发布，但开发与审查管线繁忙。**核心信号**是 @zvi-fried 主导的 provider contract 大规模重构系列已有 8 条相关 PR 仍在推进，且多个 bug 修复 PR 集中在 delivery、tasks、channels 等核心模块，表明项目正处在一轮架构收敛+稳定性加固的叠加期。供应链安全修复出现**新旧 PR 交替**（#2973 关闭、#3492 接力），需维护者尽快裁决合并路径。总体健康度良好，但 18 条待合并 PR 中不少是 8 月下旬产物，合并吞吐有待加强。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

过去 24 小时共有 3 条 PR 合并/关闭，另有 18 条 PR 处于开放状态，项目整体处于**大规模重构推进 + Bug 修复加速落地**的双线节奏。

### 已合并/关闭的 PR（3 条）

- **[#2973] fix(supply-chain): activate the minimumReleaseAge gate**（由 @sturdy4days，7 月 7 日创建，9 月 3 日关闭）  
  这是一条存在了近两个月的供应链安全修复 PR，目标是修复 `pnpm-workspace.yaml` 中 `minimumReleaseAge` 配置项错误嵌套在 `pnpm:` 键下导致失效的问题。该 PR 今日被关闭，**很可能是因为 #3492 提出了修复同一问题的新方案**（见下）。供应链安全看板上的这个老问题需要尽快在 #3492 上收口。  
  https://github.com/nanocoai/nanoclaw/pull/2973

- **[#3672] test(skill-directives): expect the slack-raw-text files add-slack copies**（由 @orgads，8 月 30 日创建，9 月 2 日关闭）  
  测试类修复，同步 `skill-directives` 测试断言以匹配 `add-slack` 对 slack-raw-text 文件的复制行为，属于持续集成/测试维护类工作。  
  https://github.com/nanocoai/nanoclaw/pull/3672

- **[#3593] test(codex): pin speed → service_tier rendering**（由 @zvi-fried，8 月 28 日创建，9 月 2 日关闭）  
  为 #3584（Codex provider contract 重构）配套的测试固定 PR，锁定 `speed: fast` 到 `service_tier = "fast"` 的渲染行为。两者组合说明 Codex 重构已进入测试收尾阶段。  
  https://github.com/nanocoai/nanoclaw/pull/3593

### 重要进展解读

- **Provider contract 重构系列仍在途**：@zvi-fried 已连续提交 8 条核心重构 PR（#3584、#3585、#3586、#3588、#3591、#3592），覆盖 Codex/OpenCode 适配、setup 安装校验、host provider 契约、核心拥有的 speed 属性等。这一系列 PR 将 provider 从"硬编码+自由文本"模式切换为"契约声明+核心渲染"模式，是架构层面的长期利好。虽然尚未合并，但 #3593 测试的关闭意味着系列中部分模块已进入验收阶段。
- **新 Bug 修复 PR 快速跟进**：@santisiri 今日提交了两条 bug 修复 PR（#3702、#3703），分别针对任务调度延迟和 delivery 重试浪费问题，均为体验向的快速响应。

---

## 4. 社区热点

> 注：本次数据中 PR 评论数字段为 `undefined`，无法基于评论数排序；以下是基于讨论活跃度（Issue 评论）、作者身份（core-team）和影响范围综合判断的热点。

### Issue 热点

- **[#3529] update-nanoclaw skill refresh: local adapters fail validation or get overwritten, no opt-out**（作者 @glifocat，8 月 25 日创建，9 月 2 日更新，2 条评论）  
  这是当前唯一有评论互动的 Issue，揭示了 `update-nanoclaw` 的 skill 刷新机制存在的**设计缺陷**：更新流程假设 `src/channels/index.ts` 中的所有 channel 导入都来自 skill，导致社区自研 adapter 被覆盖或无法通过校验，且没有退出（opt-out）机制。2 条评论虽然不多，但问题直指更新机制对"本地自定义代码"的破坏性，属于**阻断用户升级**的高影响力问题。  
  https://github.com/nanocoai/nanoclaw/issues/3529

- **[#3701] Would you accept a gateway-declared credential lane in validateSpec?**（作者 @davekim917，9 月 2 日创建，0 条评论）  
  这是一个架构演进方向的提问：维护 24 个 agent group 的 fork 用户在 gateway 模型下需要独立的凭据通道，主动询问核心团队是否愿意在 `validateSpec` 中接收"gateway 声明的凭据通道"。0 评论表明核心团队尚未回应，但提问本身质量高（有明确使用场景），值得持续跟进。  
  https://github.com/nanocoai/nanoclaw/issues/3701

### PR 热点

- **Provider contract 重构系列（#3584、#3585、#3586、#3588、#3591、#3592）**：8 月 27-28 日集中提交的 6 条核心重构 PR（另有 #3593 已关闭），均由 core-team 成员 @zvi-fried 主导，覆盖 provider contract 的完整落地路径。虽然评论量未知，但标签齐全（面积覆盖 agent-runner/configuration/containers/core/ncl-cli/providers 等），是目前**项目最大的 PR 集群**，很可能代表了核心团队既定的架构方向，也是社区观察项目路线图的主要窗口。

- **[#3703] fix: delivery spends no attempt on an adapter that reports itself disconnected**（作者 @santisiri，9 月 3 日创建）  
  提交当天即进入待合并状态，针对 `ChannelAdapter.isConnected()` 契约未被 delivery 消费的问题。这属于"契约存在但未被遵守"的典型缺陷，修复方向明确，是社区会乐于看到快速合并的 PR。  
  https://github.com/nanocoai/nanoclaw/pull/3703

---

## 5. Bug 与稳定性

按严重程度从高到低排列，共 8 个活跃 Bug 相关条目：

### 🔴 严重（安全/供应链）

- **[#3680] fix(mount-security): close allowlisted-extra mount bypass in validateSpec**（PR，作者 @prathish-ks，8 月 30 日创建）  
  安全修复 PR：`validateSpec` 中存在 allowlisted-extra mount 绕过漏洞，可能影响容器挂载的安全边界。该 PR 涉及 containers/credentials/providers 多个安全敏感区，建议优先审查。  
  https://github.com/nanocoai/nanoclaw/pull/3680

- **[#3492] fix(pnpm): turn the minimumReleaseAge gate on (hoist out of the pnpm: key) + regression test**（PR，作者 @amit-shafnir，8 月 23 日创建）  
  供应链安全修复，与 #2973 为同一问题的不同实现。`minimumReleaseAge` 配置被错误嵌套在 `pnpm:` 块下导致失效，新发布的包可能在同一天被拉取使用，存在被投毒的风险。该 PR 额外补充了回归测试。**维护者应尽快裁决 #2973 与 #3492 的取舍，避免问题继续悬空。**  
  https://github.com/nanocoai/nanoclaw/pull/3492

### 🟠 主要（核心功能/数据正确性）

- **[#3703] fix: delivery spends no attempt on an adapter that reports itself disconnected**（PR，作者 @santisiri，9 月 3 日创建）  
  Delivery 从不检查 `ChannelAdapter.isConnected()`，导致断线重连中的 adapter 会消耗全部 3 次投递尝试。修复后可在投递前跳过不健康 adapter，节省重试资源并提升消息送达率。  
  https://github.com/nanocoai/nanoclaw/pull/3703

- **[#3702] fix: tasks run feeds the reconcile queue so the run starts now, not at the next resync tick**（PR，作者 @santisiri，9 月 3 日创建）  
  `ncl tasks run` 插入 due 行后未驱动 reconcile 队列，导致任务最长可延迟 60 秒（`SWEEP_INTERVAL_MS`）才开始执行。修复后任务即刻启动，属交互体验的关键修复。  
  https://github.com/nanocoai/nanoclaw/pull/3702

- **[#3596] fix(teams): namespace colon-bearing user ids so card clicks and sender resolution match**（PR，作者 @orgads，8 月 28 日创建）  
  含冒号的 Teams 用户 ID 在 card-click 授权和 sender

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-03

> 数据来源：github.com/nearai/ironclaw | 覆盖窗口：2026-09-02 至 2026-09-03

## 1. 今日速览

过去 24 小时 IronClaw 保持高活跃度：共产生 28 条 PR 更新（17 条待合并、11 条已合并/关闭）和 10 条 Issue 更新（4 条已关闭），其中一批高质量的 WebUI 类型化重构 PR 已落地或进入评审阶段。核心方向集中在三块：**WebUI v2 前端 TypeScript 技术债清理**（#8032–#8036、#8038–#8040）、**回复/通知会话链路的正确性与新能力**（#8006、#8010、#8051）、以及 **CI/工具链稳定性与性能修复**（#8042、#8045、#8050）。无新版本发布。项目整体健康度良好，PR 合并节奏快，但部分依赖更新和 macOS 兼容性修复已积压较久，值得关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日共合并/关闭 11 条 PR，其中数条有实质功能推进，项目在「Chat 回复体验」「WebUI 架构质量」「CI 基础设施」三个方向同时向前迈进。

### 3.1 已合并/关闭的重要 PR

| PR | 规模/风险 | 说明 |
| --- | --- | --- |
| [#8006 feat(channels): add durable progressive replies and native Slack Agent UI](https://github.com/nearai/ironclaw/pull/8006) | XL / low | **今日最重要的功能合并**。落地了完整的渐进式回复机制：通过 provider-neutral 的 `ReplyDocument` 统一跨渠道回复语义，并叠加了原生 Slack Agent UI 展示层。该 PR 经历了 CI 反复失败，最终在 #8042、#8045 修复后合并，是项目 messaging 能力的一个里程碑。 |
| [#8051 fix(reply): the answer is the current model call's text; earlier calls are narration](https://github.com/nearai/ironclaw/pull/8051) | XL / low / docs | 修复了渐进式回复将多个模型调用的文本拼接导致答非所问的问题——Slack/Telegram 上出现把 "Let me find the conversation first" 这类叙述性文本作为最终答复的情况。 |
| [#8050 ci: stop cold-compiling every Reborn lane](https://github.com/nearai/ironclaw/pull/8050) | L / medium / ci | **CI 性能重大优化**。此前每个 Reborn 测试 lane 都会冷编译全部依赖闭包，最重的三个 lane 在单个 job 中重复编译两次。引入稳定的 hermetic Cargo home、push-only 共享缓存方案后，预计大幅缩短 CI 等待时间。 |
| [#8042 fix(cli,ci): keep serve alive when stderr closes, bind before the banner, and judge only named mutants in the critical gate](https://github.com/nearai/ironclaw/pull/8042) | L / low | 修复了多次导致 #8006 被 merge-queue 弹出的两个 CI flake：serve 在 stderr 关闭时不应退出、需要在 banner 打印前完成端口绑定。 |
| [#8045 fix(ci): wait for CLI listener readiness in smoke tests](https://github.com/nearai/ironclaw/pull/8045) | XS / low | 将 smoke test 的就绪判定从 banner 输出改为真实的 loopback TCP 连接，消除头号 flake 源。 |

### 3.2 已合并的依赖更新

- [#8003 chore(deps): bump the everything-else group with 17 updates](https://github.com/nearai/ironclaw/pull/8003) — Rust 依赖组（uuid、base64、toml 等 17 个包）批量升级。

### 3.3 整体评价

核心产品功能（#8006 + #8051）完成了一个重要闭环：渐进式回复的语义现在明确了——“最终答案是当前模型调用的文本，早前调用是叙述”。同时 CI 基础设施在该过程中经受住了实战检验，3 条 CI 相关修复合并后，merge-queue 的稳定性应有明显改观。WebUI 类型化重构系列 PR 已进入评审阶段，若后续合并将移除 170 个文件的 `@ts-nocheck`、消除约 1,354 个类型诊断。

---

## 4. 社区热点

今日数据中，所有 Issue 和 PR 的评论数均为 0，未出现围绕单一 PR 的社区集中讨论。热点信号主要来自**技术议题本身的高度聚焦**和**系列化 issue 的组织方式**。

### 最受关注的技术议题：#8041 工具失败类型的语义陷阱

[#8041 A tool failure whose kind is wrong sends the model somewhere it cannot recover](https://github.com/nearai/ironclaw/issues/8041)

- 作者指出 `FailureKind` 是一个封闭词表，每个变体对应固定的恢复路径：`InputEncode` 表示“参数错了，改正重试”，`UnknownCapability` 表示“工具不存在，去发现新工具”。如果错误的 `FailureKind` 被返回，模型会被引导到错误恢复路径且无法自行跳出。
- 这是**模型可恢复性**层面的核心 bug，直接关联待合并的 [#7985 fix(memory): a missing document is a domain failure, not a malformed request](https://github.com/nearai/ironclaw/pull/7985)——该 PR 正是把“文档不存在”从 `InputEncode`（输入错误）修正为 domain failure，让模型有机会用其他工具排查。
- 这组联动（Issue #8041 + PR #7985 + #7989）说明 core 团队正在系统梳理工具错误分类对模型行为的影响，是今日最值得追踪的技术线。

### 工作量最集中的板块：WebUI v2 类型化系列（8 个条目）

[#8032](https://github.com/nearai/ironclaw/issues/8032) / [#8033](https://github.com/nearai/ironclaw/issues/8033) / [#8034](https://github.com/nearai/ironclaw/issues/8034) / [#8035](https://github.com/nearai/ironclaw/issues/8035) / [#8036](https://github.com/nearai/ironclaw/issues/8036) + 对应 PR [#8038](https://github.com/nearai/ironclaw/pull/8038) / [#8039](https://github.com/nearai/ironclaw/pull/8039) / [#8040](https://github.com/nearai/ironclaw/pull/8040)

- 由 @italic-jinxin 一人发起，按“API 边界 → 生产组件 → 测试基建 → CI 防护”四层拆解，目标把 `@ts-nocheck` 覆盖率从 170 个文件 / 61,800 行降至 0。
- 5 个配套 Issue 全部建于 9 月 2 日，3 个对应 PR 同日创建，显示这是一次有计划的集中攻坚而非零散修补。
- 该系列反映了项目对 WebUI 长期可维护性的投入信号。

---

## 5. Bug 与稳定性

按严重程度排列：

### 高严重度

**Issue #8041：错误 FailureKind 使模型进入不可恢复状态**（[链接](https://github.com/nearai/ironclaw/issues/8041)）
- 影响：模型在错误的恢复路径上反复循环（例如被告知“参数错误”但实际是工具缺失），产生无效重试和上下文污染。
- 状态：Open，0 评论。同类问题的 partial fix 已在 PR #7985（missing document → domain failure）中实现，但 #8041 作为系统性问题的跟踪 Issue 仍需泛化的解决方案。

**PR #8044：cache-gate 对新 Claude 系列静默降级**（[链接](https://github.com/nearai/ironclaw/pull/8044)）
- 影响：`supports_prompt_cache` 是 `claude-3` / `claude-4` 等前缀的 allowlist。任何新系列（`claude-fable-*`、`claude-mythos-*`）都会静默降级为 `CacheRetention::None`，造成显式/隐式缓存全部失效。
- 状态：Open，fix PR 已提交，将 allowlist 改为 denylist 并在 OpenAI Responses 发送 `prompt_cache_key`。

### 中严重度

**PR #8043：流式文本更新为 O(N·k) 复杂度**（[链接](https://github.com/nearai/ironclaw/pull/8043)）
- 影响：每次 provider delta 都对全文重新 sanitize + 拷贝，N 字节响应、k 个 delta 时总成本为 O(N·k)。回归测试数据：16 KiB 在 1,000 个 delta 中消耗 1,000 次全量处理。
- 状态：Open，fix PR 建议合并流式更新而非逐 delta 全量重处理。

**Issue #7985（PR）：missing document 被错误归类为 InputEncode**（[链接](https://github.com/nearai/ironclaw/pull/7985)）
- 影响：文档不存在属于 domain failure，却被映射为 `FailureKind::InputEncode`，导致模型认为自己的输入有误而反复修正工具调用参数。
- 状态：PR 已提交一周（8-28 创建），至今未合并，建议维护者确认。

### 低严重度 / 工程稳定性

| 条目 | 问题 | 状态 |
| --- | --- | --- |
| [#7991 fix(ci): the pre-push gate cannot run on macOS](https://github.com/nearai/ironclaw/pull/7991) | `readlink -m` 是 GNU 扩展，BSD `readlink` 导致 pre-push 测试在 macOS 开发机上必然失败 | Open，等待合并 |
| [#7989 fix(coding): list_dir names the path it could not find](https://github.com/nearai/ironclaw/pull/7989) | `list_dir` 对不存在路径仅返回 `list_dir failed`，模型无法

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-03

## 1. 今日速览

过去 24 小时项目维护活动主要围绕**旧 Issue/PR 的 stale 清理**与**发布线范围控制**展开：8 条 Issue 更新中有 6 条被关闭（均为 stale 自动关闭），10 条 PR 更新中 3 条新 PR 被合并/关闭、7 条待合并。今日**无新版本发布**，也没有全新创建的 Issue；社区讨论热度整体偏低，但出现了 1 个新的安全加固 PR（#2590）和 2 个功能型 PR（全文搜索、Docker 探针）仍未合并。项目整体处于常态化维护期，活跃度中等，维护者正在推进发布分支的收尾工作，但 3 月底遗留的 6 个功能/修复 PR 已积压超过 5 个月，需要引起注意。

---

## 2. 版本发布

**无新版本发布。**

过去 24 小时没有检测到新的 Release 或版本标签更新。当前最新版本仍停留在 **2026.4.3**（来自 Issue #1566 中的用户描述）。

---

## 3. 项目进展

过去 24 小时有 **3 个 PR 被关闭**，均为 9 月 2 日新建，具体如下：

| PR | 标题 | 类型 | 影响 |
|---|---|---|---|
| [#2598](https://github.com/netease-youdao/LobsterAI/pull/2598) | fix guide win | Bug 修复 | 修复 Windows 平台下 guide 页面相关问题，具体改动在 renderer 层，推测为引导页展示异常。 |
| [#2597](https://github.com/netease-youdao/LobsterAI/pull/2597) | revert(browser): remove in-app browser from 2026.8.31 release | 回退 | 将 8.31 发布线中的内置浏览器功能回退，把功能移动到后续发布窗口。说明项目在**严格管控发布范围**，不会把未成熟功能带入正式版。 |
| [#2596](https://github.com/netease-youdao/LobsterAI/pull/2596) | fix(analytics): track chat login CTA clicks | 埋点修复 | 为聊天页登录 CTA 点击补充 analytics 事件追踪，同时更新埋点规格文档。 |

**项目整体评估：**

- 修复了 1 个 Windows 引导页问题；
- 完成了一个重要的发布范围决策（回退内置浏览器，避免影响 8.31 版本稳定性）；
- 补全了登录转化路径的埋点数据。

此外，仍有 **7 个 PR 待合并**，其中包含 1 个安全加固 PR（[#2590](https://github.com/netease-youdao/LobsterAI/pull/2590)，MCP 命令注入防护），建议优先处理。

---

## 4. 社区热点

今日没有新产生高讨论量的 Issue 或 PR。最活跃的讨论集中在以下 3 个已关闭的旧 Issue 中：

### 🔹 #1569 提问后不运行，也不显示任何信息 — **6 条评论**
**链接**: https://github.com/netease-youdao/LobsterAI/issues/1569

用户反馈在提问后，程序既不执行也不展示任何提示。**6 条评论**说明该问题曾引发多名用户讨论和排查，但最终因长期无进展被 stale 机制关闭。这反映出部分用户对"无声失败"现象的不满——**没有错误提示等于没有可操作的恢复路径**。

### 🔹 #1561 模型无法获取上传的文件 — **3 条评论**
**链接**: https://github.com/netease-youdao/LobsterAI/issues/1561

用户**明确指认这是新版本引入的回归 bug**："以前是传文件之后，文件会放到 project 目录下，那个时候模型知道从这个目录下搜索"。这类带回归对比的反馈具有较高可信度，值得维护者回溯文件上传机制的变更记录。

### 🔹 #1566 最新版本无论输入什么都回复相同内容 — **3 条评论**
**链接**: https://github.com/netease-youdao/LobsterAI/issues/1566

用户附带完整日志 ZIP 包，反馈模型输出与输入完全无关。虽然该问题已关闭，但如果是后端的全局性故障，需要确认是否已在新版本中修复。

**社区诉求分析：** 用户最关心的三件事是：(1) 故障时能给出明确提示而不是静默失败；(2) 回归 bug 要更快修复；(3) 提供恢复手段（如停止生成、压缩上下文）。

---

## 5. Bug 与稳定性

过去 24 小时**没有新提交的 Bug Issue**，但有 6 个旧 Bug Issue 被 stale 机制关闭。以下按严重程度列出仍值得关注的 Bug 及修复状态：

| 严重度 | Issue | 问题描述 | 当前状态 |
|---|---|---|---|
| 🟢 高 | [#1569](https://github.com/netease-youdao/LobsterAI/issues/1569) | 提问后无任何响应，无错误提示 | 已关闭（stale），无对应 fix PR |
| 🟢 高 | [#1566](https://github.com/netease-youdao/LobsterAI/issues/1566) | 最新版（2026.4.3）所有输入返回相同回复 | 已关闭（stale），无对应 fix PR |
| 🟡 中 | [#1561](https://github.com/netease-youdao/LobsterAI/issues/1561) | 新版本文件上传后模型无法感知（回归） | 已关闭（stale），无对应 fix PR |
| 🟡 中 | [#1551](https://github.com/netease-youdao/LobsterAI/issues/1551) | 网络环境切换导致网关反复重启 | 已关闭（stale），无对应 fix PR |
| 🔴 未修复 | [#1099](https://github.com/netease-youdao/LobsterAI/issues/1099) | IM 消息并发导致重复会话创建和消息丢失 | **仍 OPEN（stale）**，有 fix PR [#1100](https://github.com/netease-youdao/LobsterAI/pull/1100) 待合并 |
| 🔴 未修复 | [#109

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

```markdown
# Moltis 项目日报 · 2026-09-03

## 1. 今日速览
过去 24 小时项目保持较高活跃度：发布了 3 个新版本（`20260902.01`、`20260902.02`、`20260902.03`），新开 2 个 Issue，新提交 3 个 PR；但同时有 0 个 PR 被合并或关闭，合入流程存在一定滞后。贡献者 @GTanger 是今日主要推动者，提交了 1 个 Bug 报告、1 个功能请求以及 2 个功能/修复 PR，覆盖 hook 生命周期完善与 reasoning 能力扩展。整体看，开发迭代节奏快，但维护者 review/merge 压力开始显现。项目仓库：https://github.com/moltis-org/moltis

## 2. 版本发布
- [Releases 页面](https://github.com/moltis-org/moltis/releases) 今日新增 3 个版本：`20260902.01`、`20260902.02`、`20260902.03`。
- 本次数据未包含 Release Notes，无法确认具体变更内容。三个版本在同一天连续发布，推测为针对当天反馈的快速迭代或热修复。
- 无破坏性变更或迁移注意事项披露，建议用户关注 release tag 差异或直接升级测试。

## 3. 项目进展
今日无已合并/关闭的 PR，因此没有代码正式进入主线。但以下 3 个 PR 正在等待合并，反映了当前项目推进方向：
- [#1257 fix(hooks): complete lifecycle dispatch](https://github.com/moltis-org/moltis/pull/1257)：补全 `AgentEnd`、`MessageSending`、`MessageSent` 事件分发，同时为工具调用增加 `tool_call_id` 以关联一次调用的完整链路。对应修复 #1255 并部分满足 #1254。
- [#1253 feat(reasoning): add max effort level](https://github.com/moltis-org/moltis/pull/1253)：为 reasoning 模型新增 `max` 档位，支持 OpenAI Codex Responses API 的 max reasoning effort，并同步更新模型解析与 UI 展示。
- [#1256 chore(deps-dev): bump browserslist from 4.28.2 to 4.28.8](https://github.com/moltis-org/moltis/pull/1256)：依赖安全/兼容性更新。
一旦这些 PR 被合并，项目将在 hook 完整性、可观测性和推理能力上限上取得明显进步。

## 4. 社区热点
今日 Issue/PR 评论数均为 0，但以下两条 Issue 与对应 PR 形成了明显的“问题-修复”热点：
- [#1255 [Bug] AgentEnd, MessageSending, and MessageSent hooks are declared but never dispatched](https://github.com/moltis-org/moltis/issues/1255)
- [#1254 [Feature] Include a stable tool call ID in hook payloads](https://github.com/moltis-org/moltis/issues/1254)
- 热点背后的核心诉求：社区用户正在构建多步骤 agent 场景，需要可靠、可关联的 hook 事件来追踪工具调用全链路，而当前声明了事件却不触发，直接影响了自动化工作流的稳定性。

## 5. Bug 与稳定性
- **中高严重度**：[#1255 Hook 未分发](https://github.com/moltis-org/moltis/issues/1255) 报告 `AgentEnd`、`MessageSending`、`MessageSent` 三个生命周期事件已声明但从未被调度，影响所有依赖这些事件的 shell 钩子用户。虽然用户是在最新版 `20260902.01` 上复现，但相关缺陷在旧版本也可能存在。已有修复 PR [#1257](https://github.com/moltis-org/moltis/pull/1257) 待合并。
- 未发现崩溃、数据丢失或安全类严重 bug。

## 6. 功能请求与路线图信号
- [#1254 Include a stable tool call ID in hook payloads](https://github.com/moltis-org/moltis/issues/1254)：请求在 `BeforeToolCall`、`AfterToolCall`、`ToolResultPersist` 等 hook 间传递共享的 `tool_call_id`，实现一次工具调用的端到端关联。该能力已被 PR #1257 实现，极有可能进入下一版本。
- [#1253 feat(reasoning): add max effort level](https://github.com/moltis-org/moltis/pull/1253)：新增 `max` 推理档位，表明项目正在追踪 OpenAI Codex 等前沿模型的推理能力边界，可能成为下一版本的卖点之一。
- 以上信号共同指向：Moltis 正在强化 agent 可观测性、hook 完整性和模型能力上限配置。

## 7. 用户反馈摘要
- 用户 @GTanger 在 [#1255](https://github.com/moltis-org/moltis/issues/1255) 中明确表示已在最新官方版 `20260902.01` 上复现问题，说明该 bug 影响当前稳定版用户，且用户遵循了完整的 preflight checklist，反馈质量较高。
- 在 [#1254](https://github.com/moltis-org/moltis/issues/1254) 中，用户提出“进程按事件触发”但缺少共享关联 ID 的痛点，真实反映了在多轮工具调用场景下，无法将日志、结果持久化与某一具体调用对齐的问题。
- 整体来看，用户对项目迭代速度敏感（连续 3 个版本），但也因修复 PR 未及时合入而承担了等待成本。

## 8. 待处理积压
所有 Issue/PR 均为 24 小时内创建，暂无长期无人响应的历史积压。但当前 3 个 PR 均未合并，建议维护者按优先级处理：
1. [#125

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报

**日期：2026-09-03** | 数据源：GitHub（agentscope-ai/QwenPaw 仓库）

---

## 1. 今日速览

CoPaw（QwenPaw）项目过去 24 小时保持高活跃度：27 条 Issue 更新（19 条新开/活跃、8 条关闭），38 条 PR 更新（25 条待合并、13 条已合并/关闭），并发布 v2.2.0-beta.7 版本。修复合入集中在记忆嵌入维度标准化、macOS 桌面端 StdIO MCP 进程冲突、WebUI 暗色模式样式等问题，项目稳定性持续改善。值得注意的是，两个安全相关 Issue（#7511 沙箱被突破、#7443 危险指令绕过）同日活跃，建议维护团队优先核实并响应。此外，多个 2.2.0 beta 版本引入的回归（如 custom provider 加载失败、cron 重复调度）正在被用户密集反馈。

---

## 2. 版本发布

### v2.2.0-beta.7（Beta）

**发布时间：** 2026-09-02 | [Release 页面](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.7)

**主要更新内容：**
- **fix(memory):** 标准化 memory 后端特定的 embedding 维度（PR [#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465)），修复不同 embedding 后端维度不一致导致的 ReMe 记忆索引失败问题。
- **fix(webui):** 为 MCP 客户端页面容器增加暗色模式样式覆盖（PR [#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473)），修复暗色模式下白底容器突兀显示的问题。
- **chore:** 版本号更新至 v2.2.0b7（PR [#7485](https://github.com/agentscope-ai/QwenPaw/pull/7485)）。

**破坏性变更与迁移注意：**
- 该版本继承了 PR [#7337](https://github.com/agentscope-ai/QwenPaw/pull/7337) 引入的 `ModelInfo.max_tokens` → `max_output_length` 迁移变更。已有用户报告此迁移导致 **自定义提供商（custom provider）配置文件加载失败**（Issue [#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)），使用自定义 provider 的用户在升级前需确认配置文件已适配新字段。
- Release 验证 Issue（[#7503](https://github.com/agentscope-ai/QwenPaw/issues/7503)）要求在发布后 4 小时内完成全平台安装验证，截止 2026-09-02 14:50 UTC。

---

## 3. 项目进展

今日合入/关闭的 PR 重点推进了以下方向的修复：

### ✅ 已合并修复（进入 v2.2.0-beta.7）
| PR | 内容 | 关联 Issue |
|---|---|---|
| [#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465) | 标准化 memory 后端的 embedding 维度 | 修复 ReMe 嵌入维度不匹配问题 |
| [#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473) | WebUI 暗色模式 MCP 容器样式修复 | [#7471](https://github.com/agentscope-ai/QwenPaw/issues/7471) |

### ✅ 今日合并/关闭的其他 PR
| PR | 内容 | 对应修复 |
|---|---|---|
| [#7489](https://github.com/agentscope-ai/QwenPaw/pull/7489) | **fix(desktop):** 保留 PyInstaller multiprocessing runtime hook，修复 macOS 桌面端 StdIO MCP 子进程触发 backend_guard 导致后端被杀的问题 | [#7481](https://github.com/agentscope-ai/QwenPaw/issues/7481) 已关闭 |
| [#7508](https://github.com/agentscope-ai/QwenPaw/pull/7508) | **feat(skill):** make-skill v2（标注 DO NOT MERGE，已关闭，未合入） | — |

**项目推进评估：** 今日合入的修复集中在桌面端稳定性（macOS MCP 进程冲突）和 UI 细节（暗色模式），均为用户直接反馈的高频问题。v2.2.0-beta.7 在 memory 和 WebUI 两个维度完成修复并如期发版，整体迭代节奏良好。

---

## 4. 社区热点

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

## EasyClaw 项目动态日报（2026-09-03）

### 1. 今日速览
过去 24 小时内，项目未新增或关闭任何 Issue / PR，社区互动层面相对平静。但连发两个新版本（v1.9.1、v1.9.2），表明核心开发保持活跃，产品迭代节奏较快。当前项目整体处于“开发侧高产出、社区侧低反馈”的状态，建议后续关注用户采纳与反馈回流的补充。

### 2. 版本发布
今日发布两个版本，均无破坏性变更提示，迁移成本预计较低。

- **v1.9.2** — [Release v1.9.2](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.2)  
  - 重新设计联盟营销（Affiliate）工作区：支持大型创作者表格分页展示、无需直接发送私信即可邀请创作者、审阅样品申请时可同时查看产品库存与创作者表现数据。  
  - 围绕“员工决策”重新设计创作者升级（escalation）流程，使 Agent 能够基于实际决策结果采取后续行动。  
  - 说明：原始 Release 描述被截断，此处基于可见内容整理，建议维护者补充完整 changelog。

- **v1.9.1** — [Release v1.9.1](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.1)  
  - 新增像素风 Agent Office（代理办公室），可将各业务部门的运行状态可视化，并支持作为桌面屏保运行。  
  - 在保护隐私的前提下记录办公室活动，用于未来回放，同时保持控制面板与网关事件流同步。

### 3. 项目进展
今日无合并或关闭的 PR，因此没有新增的代码合并记录。但两个版本发布本身代表了项目向前迈进了重要一步：  
- v1.9.1 引入可视化运维/展示层，增强了 Agent 运行状态的可观测性和趣味性；  
- v1.9.2 则聚焦联盟营销业务功能深化，提升创作者管理与审核效率。  
综合来看，项目在短时间内完成两个功能方向的迭代，推进节奏积极。

### 4. 社区热点
今日没有任何活跃的 Issue 或 PR 讨论，因此无热门条目可列。社区热点暂时缺失，可能因用户尚处于新版本试用期，或讨论集中在其他渠道（如 Discord、微信群）。

### 5. Bug 与稳定性
今日未报告新的 Bug、崩溃或回归问题。项目稳定性状态良好，未出现需要紧急修复的缺陷。

### 6. 功能请求与路线图信号
虽然今日没有用户提交新的功能请求，但两个新版本透露了清晰的路线图信号：  
- **运营可视化**：像素风 Agent Office 表明项目正在加强对 Agent 行为的可视化与回放能力，未来可能演进为更完善的可观测性工具。  
- **联盟营销深度优化**：v1.9.2 对创作者工作区的重构，说明项目将“联盟营销”作为核心业务场景持续打磨，后续可能围绕该场景增加更多自动化决策与数据集成功能。  
这些方向大概率会继续出现在下一个版本的开发计划中。

### 7. 用户反馈摘要
今日没有新的 Issue 评论或 PR 讨论，无法提炼具体的用户反馈。建议项目方主动在社区（如 GitHub Discussions、社交媒体）引导用户对新版本功能发表意见，以弥补这一数据空缺。

### 8. 待处理积压
当前无长期未响应的重要 Issue 或 PR。项目积压状态健康，维护者对问题的响应及时性值得肯定。

---
**链接汇总**  
- 项目主页：https://github.com/gaoyangz77/easyclaw  
- 所有 Releases：https://github.com/gaoyangz77/easyclaw/releases  
- Issues 列表：https://github.com/gaoyangz77/easyclaw/issues  
- Pull Requests：https://github.com/gaoyangz77/easyclaw/pulls

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*