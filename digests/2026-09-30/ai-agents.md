# OpenClaw 生态日报 2026-09-30

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-30 02:52 UTC

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

# OpenClaw 项目动态日报 — 2026-09-30

## 1. 今日速览

过去 24 小时社区活动极其活跃：共 500 条 Issue 更新（其中新开/活跃 434 条、关闭 66 条），PR 更新同样达到 500 条（待合并 343 条、已合并/关闭 157 条），并发布了 1 个新版本。当前 GitHub 上的热度集中在 **P0/P1 级稳定性问题**——尤其是 `prepared-model-catalog.worker.js` 内存泄漏、Gateway 状态生命周期（state-lifecycle）竞争、SQLite WAL 无限增长三大类问题，多条 Issue 被标记为 `impact:ux-release-blocker`。项目维护者（clawsweeper）正在积极处理 2026.9.6 → 2026.9.7 的修复清单，但大量 P0 问题仍处于 `no-new-fix-pr` 状态，短期发布压力较大。

---

## 2. 版本发布

### v2026.8.33（extended-stable）
- **发布说明**：这是仅针对 gateway 的 `extended-stable` 版本（相当于 LTS）。基于 2026 年 8 月底的 OpenClaw 代码快照，集成了关键安全更新、可靠性与性能修复，以及新模型支持。
- **当前最新版**：2026.9.6
- **破坏性变更**：无（该版本定位为稳定维护版）
- **迁移注意事项**：LTS 用户建议从 2026.9.6 评估后再升级；升级时注意 schema 迁移（有用户报告从 9 月初版本升级至 2026.9.6 时 schema 17→18 迁移后出现 crash-loop，见 Issue #157160）

**相关链接**：https://github.com/openclaw/openclaw/releases

---

## 3. 项目进展

今日无大规模功能合并，但有几个值得注意的 PR 处于 CLOSED 状态（说明已在近期完成合并或被关闭）：

- **[#161025] refactor(plugins): deslop plugin platform sixth pass**（已关闭）— 插件平台的第六轮内部清理，移除冗余转发层和重复的 metadata 投影。无用户可见变化。 https://github.com/openclaw/openclaw/pull/161025
- **[#158470] feat: show built-in Docker and clawctl supervisor guidance**（已关闭）— Web UI 现在会为 Docker Compose 和 clawctl 外部监督的 Gateway 显示具体的宿主命令，解决运维人员不知道如何在宿主机上操作的问题。 https://github.com/openclaw/openclaw/pull/158470

**持续推进中的重点 PR：**
- **#161267（P0）fix(plugins): Gateway freezes on model changes with large plugins** — 修复安装大型插件后，`config.patch` 更改模型导致 Gateway 冻结数分钟、最终要求“recovery restart”的严重问题。该 PR 已标记 `ready for maintainer look`。 https://github.com/openclaw/openclaw/pull/161267
- **#158447（P0）fix(updater): identify the config-read child by env, not by import query** — 修复从 Bun Gateway 启动托管更新时产生无限子进程链的问题（报告曾达 8,462 个后代进程）。 https://github.com/openclaw/openclaw/pull/158447
- **#161057 refactor(skills): make Skill Workshop a direct, versioned self-learning loop** — 重构技能工作坊，修复背景评审大量失败、向技能目录倾倒数百 MB 临时文件、Codex 运行时上每周评审停止等问题。 https://github.com/openclaw/openclaw/pull/161057

---

## 4. 社区热点

### 最热 Issue：#143524 — SQLite WAL 无限制增长（94 条评论）
**标题**：Agent SQLite WAL grows to 1.4–2.8 GB in days despite wal_autocheckpoint=1000; blocks gateway startup (Windows)

**诉求分析**：这是当前社区最关注的问题。单个 agent 的 SQLite WAL 文件在数天内膨胀至 2.8 GB，且不触发 checkpoint。手动 `wal_checkpoint(TRUNCATE)` 后又会快速回升。该问题直接阻塞 Windows 用户的 Gateway 启动，且与 `impact:crash-loop`、`P0`、`ux-release-blocker` 关联，受影响的用户群体集中但反馈强度极高。值得注意的是该 Issue 创建于 9 月 9 日，至今已 20 天仍未解决，期间评论大量增加，用户对修复进度有明显不满。

🔗 https://github.com/openclaw/openclaw/issues/143524

### 高热度 Issue：#119720 — 同步持久化阻塞事件循环（21 条评论）
**标题**：Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale

**分析**：该问题经历了多轮修复跟进（#140231 减少溢出恢复、#138984 修复原子重写），说明项目组在持续处理大规模场景下的阻塞问题，但尚未根治。社区讨论主要围绕如何在不阻塞事件循环的前提下，保证 agent 持久化和 transcript 的一致性。这可能是 2026.9.7 的目标之一。

🔗 https://github.com/openclaw/openclaw/issues/119720

### 社区活跃 PR：#161503 — Gmail watcher 恢复（刚提交即获关注）
**标题**：fix(gmail): recover watcher after transient restart bind conflicts

**分析**：短小精悍的修复 PR，解决 Gateway 重启时端口绑定冲突导致 Gmail 转发停止。用户 @kazuyuki-eguchi 提供了重启跟踪日志，说明社区参与质量较高，P1 级别且标记 ready，预期很快合并。

🔗 https://github.com/openclaw/openclaw/pull/161503

---

## 5. Bug 与稳定性

> 严重度排序：P0（严重/阻塞）→ P1（高） → P2/P3（中/低）。标记 🔴 表示尚无修复 PR，🟡 表示有修复 PR 在途，🟢 表示已关闭/已解决。

### P0 级（按影响面排序）

| 问题 | 状态 | 链接 |
|---|---|---|
| 🔴 **SQLite WAL 无限增长导致 Gateway 启动阻塞（Windows）** — 1.4–2.8 GB 且不触发 checkpoint（#143524，94 条评论，社区最热） | 20 天未修复，clawsweeper 标记 `no-new-fix-pr` | https://github.com/openclaw/openclaw/issues/143524 |
| 🔴 **A stuck agent-DB resource 导致所有 agent 回复失败**，直到重启 Gateway（#157325） | 无 fix PR | https://github.com/openclaw/openclaw/issues/157325 |
| 🔴 **`prepared-model-catalog.worker.js` 无界内存泄漏，~4-5 GB/h**，与 provider 无关（#159662）| 无 fix PR；#159596/#160548/#160522 均报告同类问题 | https://github.com/openclaw/openclaw/issues/159662 |
| 🟡 **Gateway 内存锯齿：prepared-model-catalog worker 涨满堆上限后触发回收，吞掉所有等待中的 turn**（#159596） | 暂无 fix PR，但 #161267 部分相关 | https://github.com/openclaw/openclaw/issues/159596 |
| 🔴 **Gateway 在插件 doctor post-session-state 后 crash-loop**，即使修复 busyTimeoutMs=0 仍复现（#157160） | 已关闭（可能因重复或已处理？但状态为 CLOSED，需确认是否真正修复） | https://github.com/openclaw/openclaw/issues/157160 |
| 🔴 **Gateway worker 获取 state-lifecycle 后不释放，后续所有 acquire 失败直到重启**（#158095） | 无 fix PR | https://github.com/openclaw/openclaw/issues/158095 |
| 🔴 **2026.9.7 Fixes Tracker：18/21 个候选 P1 已准备**（#157531） | 跟踪中，剩余 3 个待定 | https://github.com/openclaw/openclaw/issues/157531 |

### P1 级（按评论热度排序）

| 问题 | 状态 | 链接 |
|---|---|---|
| 🟢 **Windows 隔离 cron 设置传递不可克隆的 Proxy 给 session history worker**（#157067） | 已关闭（19 条评论） | https://github.com/openclaw/openclaw/issues/157067 |
| 🔴 **两个并发 run 导致重复回复（session lane 背压问题）**（#111897，`needs-info`） | 与 #54488 相关，待维护者定位 | https://github.com/openclaw/openclaw/issues/111897 |
| 🔴 **子进程 zombie 积累导致运行时退化**（#97616） | 6 月底报告，至今未修 | https://github.com/openclaw/openclaw/issues/97616 |
| 🔴 **Subagent 完成结算无限重试** — “owner changed before settlement” 导致每轮都重新注入结果（#159612） | 无 fix PR | https://github.com/openclaw/openclaw/issues/159612 |
| 🔴 **2026.9.5 起 Gateway 启动时间随插件数量线性增长**，discord/codex/weixin 占满 120s 发布预算（#155859） | 无 fix PR | https://github.com/openclaw/openclaw/issues/155859 |
| 🟡 **显式 `--max-old-space-size` 使 worker 的 resourceLimits 失效**（#157630 / #157575） | 无独立 fix PR，但 #161267 相关 | https://github.com/openclaw/openclaw/issues/157630 |
| 🟢 **macOS npm update 失败：`Package rollback launcher backup changed`**（#145072） | 已关闭（fix-shape-clear） | https://github.com/openclaw/openclaw/issues/145072 |
| 🔴 **macOS app 启动看门狗误杀慢启动 Gateway，进入重启循环**（#158936） | 无 fix PR | https://github.com/openclaw/openclaw/issues/158936 |

### 值得注意的并发/数据一致性类问题（P1）

- **Session SQLite 迁移失败报告**（#161290，已关闭，9 条评论）— doctor recover 后仍有剩余问题 https://github.com/openclaw/openclaw/issues/161290
- **2026.9.6 Gateway 持有 state-lifecycle lease 但 worker 报告另一个进程在持有**（#159094） https://github.com/openclaw/openclaw/issues/159094
- **Session writer 队列因重复 agent DB integrity 工作等待数分钟**（#157617） https://github.com/openclaw/openclaw/issues/157617

---

## 6. 功能请求与路线图信号

### 可能进入下一版本（2026.9.7）的信号
- **2026.9.7 Fixes Tracker（#157531）** — 已确认 18/21 个 P1 候选修复，主要集中在 **privacy/security** 和 **stability**。该 tracker 是判断 2026.9.7 范围的最直接依据。 https://github.com/openclaw/openclaw/issues/157531
- **#16670（P2）Onboarding Wizard 将 Memory/Embedding 设为必选步骤** — 已有 9 条评论、2 个 👍，社区呼声持续；若无太大阻力，优先级可能提升。 https://github.com/openclaw/openclaw/issues/16670

### 社区的长线功能建议
- **[RFC] 任务级决策模型与可检查评估（#156341）** — 提议为不同决策任务选择独立模型、并复用现有 Decision 运行时与 Labs 控制，同时让评估过程可检查。目前 P3，属探索性。 https://github.com/openclaw/openclaw/issues/156341
- **Search（#158332）消息-less 会话间投递触发 politeness loops** — 用户提出现象背后是产品设计问题：无内容回复时平台会催促模型生成可见文本，导致会话间礼貌循环。可能需要产品决策（`needs-product-decision` 已标记）。 https://github.com/openclaw/openclaw/issues/158332

### 已进入推进管线的功能性 PR
- **Skill Workshop 直连学习回路（#161057）** — 重构 Skill Workshop 使其有版本控制、可验证的自学习能力
- **Supervisor guidance（#157679 / #158470）** — 向外部部署运维人员展示正确的 supervisor 命令，两个 PR 均有截图 proof，接近合并

---

## 7. 用户反馈摘要

1. **重度用户对 SQLite 稳定性极度焦虑**：#143524 的 94 条评论中，多位 Windows 用户报告 WAL 增长发生在**不同 agent、不同任务**中，且 9.2/9.3 版本均受影响。有用户表示“每天手动 checkpoint 不是可接受的运维方案”，对 20 天未修复表示不满。

2. **内存问题成为升级 2026.9.6 的最大阻力**：多条 Issue（#159596、#159662、#160548）独立报告 `prepared-model-catalog.worker.js` 内存无界增长。一位用户 @svdinu-jpg 给出了冷重启 + provider 二分复现路径，确认与 provider 无关。这严重影响了自托管用户的升级意愿。

3. **macOS 更新体验两极分化**：虽然有 #145072 已关闭（fix-shape-clear 已处理），但 #158936 证明 macOS 上慢启动被看门狗误杀仍然存在。用户反馈“重启后 40-70 秒冷启动是常态”，看门狗过于激进。

4. **插件生态繁荣但运行时成本高**：#157989 用户 @jeanmonet 指出每个 CLI 命令重写 ~1.1-1.4 GB 插件源文件、每次 Gateway 启动重写 ~6.5 GB，导致 SSD 严重磨损。这本质上是插件运行时设计（source capture）与用户硬件寿命之间的冲突。

5. **社区对修复速度的总体感受**：在 2026.9.7 Fixes Tracker（#157531）中维护者保持了透明沟通，但大量 P0 集中爆发（SQLite、内存、生命周期三类），用户仍期待更快的发布节奏。

---

## 8. 待处理积压

以下为长期未响应或迟迟未获得 fix PR 的重要问题，提醒维护者关注：

| Issue | 提出时间 | 状态 | 积压时长 | 链接 |
|---|---|---|---|---|
| **子进程 zombie 积累**（#97616） | 2026-06-29 | P1，`needs-maintainer-review` | 已超 3 个月 | https://github.com/openclaw/openclaw/issues/97616 |
| **SQLite WAL 无限增长**（#143524） | 2026-09-09 | P0，`no-new-fix-pr` | 20 天，社区持续施压 | https://github.com/openclaw/openclaw/issues/143524 |
| **重复/冗余回复（session lane 并发）**（#111897） | 2026-07-20 | P1，`needs-info`，有 1 👍 | 超 2 个月 | https://github.com/openclaw/openclaw/issues/111897 |
| **大型 SQLite 启动时重复完整 integrity check**（#118885） | 2026-08-03 | P1，涉及多轮重构后仍未解决 | 近 2 个月 | https://github.com/openclaw/openclaw/issues/118885 |
| **memory-wiki 补全回退忽略工具 deadline**（#104719） | 2026-07-11 | P1，`linked-pr-open`（有 PR 但未

---

## 横向生态对比

# AI 智能体开源生态横向对比分析报告（2026-09-30）


## 1. 生态全景

过去 24 小时，个人 AI 助手/自主智能体开源生态呈现“一超多强”的格局：以 OpenClaw 为核心的平台型项目保持极高社区热度（单日 500 条 Issue + 500 条 PR 更新），同时 NanoBot、Zeroclaw、CoPaw 等衍生/竞品项目在各自细分方向上快速迭代。整体生态正处于从“功能堆叠”向“稳定性与安全加固”转型的阵痛期——OpenClaw 三大 P0 问题（SQLite WAL 膨胀、内存泄漏、状态生命周期竞争）连续 20 天未根治，Zeroclaw 遭遇 S0 级安全审计，而 NanoBot、CoPaw 等则在容灾、数据隔离、终端稳定性上取得扎实进展。值得注意的是，多个项目不约而同地出现“目标驱动自主循环”“上下文预算管理”“多代理数据隔离”三类需求，指向下一代个人 AI 助手从“对话工具”向“长期自主代理”演进的共同方向。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 合并/关闭率 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 434，关闭 66） | 500（待合并 343，合并/关闭 157） | 1 个（v2026.8.33 extended-stable） | 31.4% | **

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-30

## 1. 今日速览

过去 24 小时内 NanoBot 项目保持了较高的社区活跃度：共发生 5 条 Issue 更新（4 条新开/活跃、1 条关闭）和 38 条 PR 更新（23 条待合并、15 条已合并/关闭）。无新版本发布。多个 Bug 修复 PR 在今日收尾，同时有较多功能类 PR 进入待审状态，说明项目正处于高频迭代和社区贡献密集的阶段。

## 2. 版本发布

无新版本发布，本期省略。

## 3. 项目进展

今日共 15 个 PR 被合并/关闭，从公开信息看，以下 PR 对项目稳定性与工程质量有实际推进：

- [#5968 fix(providers): honor configured fallbacks on "insufficient credits"](https://github.com/HKUDS/nanobot/pull/5968)：修复 OpenAI-compatible 网关因“insufficient credits”报错导致 fallback 模型被跳过的问题，直接关闭 Issue #5967，保证了多模型容灾路径的可靠性。
- [#5976 fix(my): scope subagent snapshots to the current session](https://github.com/HKUDS/nanobot/pull/5976)：收敛 `my` 工具中 subagent 快照的访问范围，避免跨会话数据泄露，属于安全性与数据隔离修复。
- [#5975 refactor(tui): organize source by feature boundaries](https://github.com/HKUDS/nanobot/pull/5975)：按功能边界重构 TUI 源码目录，提升可维护性，且通过 rename-only 第一提交保留文件历史。
- [#5978 fix(webui): hide provider models past OpenAI shutdown_date](https://github.com/HKUDS/nanobot/pull/5978)：过滤已下线的 OpenAI 模型，避免用户在模型选择器中选到不可用模型（对应 Issue #5977）。
- [#5982 Correct misleading Taiwanese WebUI messages](https://github.com/HKUDS/nanobot/pull/5982)：修正 zh-TW 语言包中 20 条误导性提示，改善繁体中文用户体验。

这些改动使项目在模型容错、安全边界、前端体验和代码组织方面均有小幅但明确的进步。

## 4. 社区热点

- [#5298 [enhancement] Proposal: budget model-visible MCP schemas for large tool sets](https://github.com/HKUDS/nanobot/issues/5298) 是今日评论数最多的 Issue（2 条评论）。用户关注大型 MCP 工具集带来的上下文成本问题，建议对可见 schema 做预算控制。该议题为 8 月提出，9 月 29 日仍有更新，说明讨论仍在持续。
- [#5900 [enhancement] Silent context compaction and reduce WeChat channel polling log verbosity](https://github.com/HKUDS/nanobot/issues/5900) 获得 1 条评论，诉求是希望自动上下文压缩不再向微信/WhatsApp 等渠道发送通知，并降低轮询日志噪声。这与社区对“后台行为应尽量无感”的期待一致。
- PR 方面，[#5968](https://github.com/HKUDS/nanobot/pull/5968) 修复了“余额不足时 fallback 失效”的问题，属于直接影响可用性的热点，今日已被关闭，预计会随下一版本发布。

## 5. Bug 与稳定性

按严重程度排列：

1. **高** — [#5967 Fallback models are skipped when a provider reports "insufficient credits" (HTTP 400)](https://github.com/HKUDS/nanobot/issues/5967)：当上游网关返回“insufficient credits”时，配置的 fallback 模型被静默跳过，直接返回原始错误，导致 agent 看起来“完全不可用”。已有修复 PR [#5968](https://github.com/HKUDS/nanobot/pull/5968) 并已关闭，预计已合入。
2. **中** — [#5977 Model picker lists OpenAI models that already shut down](https://github.com/HKUDS/nanobot/issues/5977)：模型下拉列表展示已下线的 OpenAI 模型，选择后请求立即失败。修复 PR [#5979](https://github.com/HKUDS/nanobot/pull/5979) 当前处于打开状态，另一版本 [#5978](https://github.com/HKUDS/nanobot/pull/5978) 已关闭，需要确认哪条分支进入主干。
3. **低** — [#5982 Correct misleading Taiwanese WebUI messages](https://github.com/HKUDS/nanobot/pull/5982)：属于文案误导问题，不阻塞功能，但影响用户理解，已随 PR 修正。

## 6. 功能请求与路线图信号

用户侧的新需求与已有 PR 高度重合，以下方向有较大概率进入后续版本：

- **MCP 工具上下文瘦身**：Issue [#5298](https://github.com/HKUDS/nanobot/issues/5298) 提出为大规模 MCP 工具集做 schema 预算管理；老 PR [#1759](https://github.com/HKUDS/nanobot/pull/1759) 也早已提出 lazy loading 与 auto-demotion 方案，目前仍因冲突待处理。该需求长期存在，值得维护者推进。
- **静默上下文压缩与日志降噪**：Issue [#5900](https://github.com/HKUDS/nanobot/issues/5900) 与 PR [#5780](https://github.com/HKUDS/nanobot/pull/5780) 高度相关，后者已实现自动压缩通知不可见，并保留 `/compact` 手动通知。若能合入，将直接满足用户诉求。
- **Telegram 群聊/话题粒度的回复策略**：Issue [#5972](https://github.com/HKUDS/nanobot/issues/5972) 提议按聊条或话题配置 `groupPolicy`，配套 PR [#5973](https://github.com/HKUDS/nanobot/pull/5973)（per-chat/topic override）和 [#5974](https://github.com/HKUDS/nanobot/pull/5974)（`/group` 管理命令）已提交，且两者具有依赖关系。功能实现相对完整，预计会进入 review 流程。
- 其他值得关注的功能 PR：
  - [#5983 feat(webui): add catalog-backed reasoning effort selection](https://github.com/HKUDS/nanobot/pull/5983) 将 reasoning effort 从高级选项提升为目录驱动选择。
  - [#5984 fix(codex): avoid release-pinned model catalog filtering](https://github.com/HKUDS/nanobot/pull/5984) 避免 Codex 模型发现因版本固定而漏掉新模型。
  - [#5985 feat(subagent): add session-owned task messaging and cancellation](https://github.com/HKUDS/nanobot/pull/5985) 为 subagent 增加消息发送与取消能力。

## 7. 用户反馈摘要

- **后台压缩通知打扰正常使用**：Issue [#5900](https://github.com/HKUDS/nanobot/issues/5900) 的提出者表示，自动上下文压缩会向微信/WhatsApp 推送通知，影响使用体验；在 PR [#5780](https://github.com/HKUDS/nanobot/pull/5780) 中，作者直接质疑这是否是预期行为，并称“quite annoying”。这是明确的不满信号。
- **MCP 工具集过大导致上下文成本上升**：Issue [#5298](https://github.com/HKUDS/nanobot/issues/5298) 的用户关注在大型工具集场景下的 token 开销，希望更精细化地控制暴露给模型的 MCP schema。
- **Fallback 失效导致服务中断**：Issue [#5967](https://github.com/HKUDS/nanobot/issues/5967) 中用户描述“agent appears to stop working”，说明该问题对生产使用影响较大，用户对此类兜底机制有较高期待。
- **Telegram 群组策略过于单一**：Issue [#5972](https://github.com/HKUDS/nanobot/issues/5972) 来自同一贡献者，反映在忙碌的超级群中使用论坛话题时，需要一个统一的“项目话题参与、公告话题静默”的差异化策略，现有的频道级配置无法表达这一需求。

## 8. 待处理积压

以下 Issue/PR 长时间未获得明确推进或存在冲突，建议维护者优先审视：

- [#1759 [conflict] feat: Reduces MCP tool

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-30

## 1. 今日速览

过去 24 小时项目非常活跃：Issues 更新 27 条（新开/活跃 23、关闭 4），PR 更新 50 条（待合并 47、合并/关闭 3），无新版本发布。安全与稳定性是当前最突出的主题：多条 S0 级安全 bug（#11198、#11239、#11123）被提出并持续跟进，涉及内存数据隔离与授权边界，说明核心安全审计仍在推进。功能侧同样密集，schema V4 迁移（#11218）、插件更新（#11262/#11261）、多模型支持（#9809）等大型 PR 均在队列中等待合并，项目处于快速迭代期，技术债清理与安全加固并行。零版本发布意味着近期功能将通过 master 分支直接交付。

---

## 3. 项目进展

**已合并/关闭 PR**

- **fix(config): stop clamping explicit context budgets to the 32k fallback stub**（#11260，CLOSED）
  - 修复了显式配置的上下文窗口被钳制到 32,000 token 回退值的问题，直接影响 #10068 报告的交互式会话上下文受限 bug。这是对上下文容量解析逻辑的关键修正，用户配置的 `max_context_tokens`（如 131072）现在可被正确识别。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/11260

- **feat(infra): IBM Db2 session-persistence backend [DEFERRED]**（#9254，CLOSED）
  - 官方决定暂时搁置 Db2 会话后端，等待原生驱动可用后再继续。这是对基础设施范围的理性收缩，避免在无原生驱动条件下引入维护负担。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/9254

**待合并的关键 PR（影响面大，值得关注）**

- **feat(config)!: schema V4 cut**（#11218，基于 #8754 重构）：迁移 V3 配置中的已废弃/惰性键，警告缺失的 schema_version。这是 #8310 路线图的落地实现，直接影响所有用户升级路径。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/11218

- **feat(cli): add zeroclaw plugin update with verified replacement**（#11262，stacked on #11261）：实现插件更新命令，支持验证替换和失败回滚，对应 #10995。两 PR 合计改动量大，是插件治理的关键补全。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/11262
  - https://github.com/zeroclaw-labs/zeroclaw/pull/11261

- **feat(providers): support multiple models per provider profile**（#9809）：允许单一凭证/端点支持多个模型（含独立 model id 与调参），对私有化部署和多模型调度有直接价值。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/9809

- **fix(config): accept tagged declarative cron schedules**（#11238）：修复配置编辑器无法写入声明式 cron 调度的问题，直指 #11237 的 S1 工作流阻断。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/11238

**整体判断**：项目仍在为 schema V4 和多模型等结构性能力蓄力，但大量 PR 处于 `needs-author-action` 状态（如 #8754、#10049、#9320 等），维护者需尽快处理积压反馈，否则合并节奏可能进一步放缓。

---

## 4. 社区热点

**#8832 [Feature]: Plugin-owned Kanban board for agent work — 10 条评论**
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/8832
- 讨论焦点：插件自持的看板面板，用于可视化 agent 任务编排。2026-09-28 已从 RFC 队列重新分类为普通 issue/PR 路径，且依赖的通用 per-instance 持久化状态（#11081）已合入。说明社区对“agent 可操作的持久化 UI 组件”有明确需求，插件生态正在从纯工具向带状态的工作面演进。该 issue 始终无 👍，但评论持续，说明是小众但深入的需求讨论。

**#10068 [Bug]: Interactive agent session caps context at 32,000 tokens — 6 条评论**
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10068
- 已关闭，但讨论热度高。用户反馈配置 131,072 token 但实际被钳制在 32k，属于典型配置不生效问题。今日 #11260 的合入使该 issue 闭环，社区对上下文规格的关注度可见一斑。

**Audacity88 安全审计系列（#11197、#11198、#11126、#11123）**
- 同一作者连续提出多个高严重度安全 bug，覆盖会话恢复、委托内存工具、排队操作、SOP 通配符等场景。每条均有 2-3 条评论，且被标记 `follow-up`，说明维护者已介入并持续追认。这构成了近期社区讨论的隐性主线——安全边界与授权一致性。
- 代表条目：https://github.com/zeroclaw-labs/zeroclaw/issues/11198

---

## 5. Bug 与稳定性

**S0 — 数据丢失 / 安全风险（3 条新报告 + 1 条确认）**

- **#11239 [Bug]: owned sessions reach the shared memory plane through spawn_subagent and execute_pipeline**（2026-09-29 新开）
  - 主体验证的 session 通过 `spawn_subagent` 和 `execute_pipeline` 两条工具路径可触达共享内存平面。与 #11198 同源——内存隔离在委托路径上未生效。暂无直接 fix PR，建议优先处理。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/11239

- **#11198 [Bug]: Delegated memory tools lose principal scope**（2026-09-27 新开，持续跟进）
  - 委托 agent 构造的替代内存工具丢失 principal 作用域，子 agent 可能访问宿主私有内存。这是内存租户隔离的关键缺口，与 #11239 为同一类问题，建议合并排查。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/11198

- **#11123 [Bug]: SOP execution accepts wildcard tool selectors without tools:execute**（2026-09-25 新开，持续跟进）
  - SOP 执行路径接受通配符工具选择器，即使未声明 `tools:execute` 权限。授权策略与执行路径不匹配，可能放大权限。暂无 fix PR。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/11123

- **#11197 [Bug]: Session resume restores

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-30

## 1. 今日速览

过去 24 小时项目保持中等偏上的社区活跃度：共 6 条 Issue 更新、3 条 PR 活动，无新版本发布。其中 5 条 Issue 与 Web UI 体验直接相关，表明浏览器端已成为用户最主要的使用入口，也是当前体验短板最集中的区域。用户 @racso2609 在一天内连续提交 3 个 UI 问题（#3406/#3407/#3408）并附带提交修复 PR #3410，形成了「用户发现-用户修复」的社区驱动闭环，值得关注。与此同时，#3281（Web UI 输入延迟）和 #440（agent 迭代硬限制）两个长生命周期 Issue 仍在持续讨论，构成项目健康度的长期隐患。

## 2. 版本发布

无新版本发布（最新 Releases 为空）。当前用户环境以 v0.3.1 为主（见 #3281 报告）。

## 3. 项目进展

> 今日无 PR 合并，2 个 PR 正在等待审查，1 个 PR 被关闭。

- **[#3410] fix(pico/web): surface steering queue state so queued/dropped messages are no longer invisible**（待合并）
  为 Web UI 引入 steering queue 状态可视化，允许客户端感知消息已排队、队列已满、以及消息被丢弃等状态，直接修复 #3408 中「消息悄然消失」的痛点。此前 `MaxQueueSize=10` 限制下，用户发送的消息在队列满时会被静默丢弃且无任何提示；该修复通过状态回传与 UI 反馈补齐了这一关键缺口。
  https://github.com/sipeed/picoclaw/pull/3410

- **[#3378] fix(auth): use configured scopes instead of hardcoded default in RefreshAccessToken**（待合并）
  修复 OAuth 令牌刷新时硬编码 `"openid profile email"` 范围的问题，改为使用 `OAuthProviderConfig.Scopes` 中配置的实际 scope。该修复对于接入自定义 OAuth 提供方的用户至关重要，否则刷新令牌可能因 scope 不一致而失败。
  https://github.com/sipeed/picoclaw/pull/3378

- **[#3337] [stale] Fix/mcp failure hangs agent loop**（已关闭）
  该 PR 旨在修复 MCP 服务器连接失败导致 AgentLoop 挂起、聊天界面完全停止响应的问题。PR 因标记为 stale 而被关闭，**但其所针对的 bug 隐患并未因此消失**——MCP 连接失败导致 agent 失去响应仍是高风险故障场景。建议维护者关注后续是否有新的修复方案进入主线。
  https://github.com/sipeed/picoclaw/pull/3337

## 4. 社区热点

- **[#3281] Web UI chat input is very laggy when history has a little bit long**（评论 16，👍 2）
  本日讨论量最高的 Issue。用户 @xpader 反馈在一个会话内积累较多聊天历史后，输入框出现明显卡顿，影响日常使用。该 Issue 自 7 月 21 日创建以来已持续两个多月，16 条评论说明影响面较广，且尚未有对应的修复 PR 被提出。
  https://github.com/sipeed/picoclaw/issues/3281

- **[#440] Replace hard iteration limit with context-window bounding and loop detection**（评论 7）
  关于 agent 运行机制的深水区讨论：用户 @drpedapati 认为 `max_tool_iterations: 20` 的硬编码上限对复杂任务过于苛刻，合法工作流会因「I've completed processing but have no response to give」而异常中断，建议改为基于上下文窗口的边界计算 + 循环检测机制。该 Issue 自 2 月 18 日存在至今，属于核心架构层面的长期需求。
  https://github.com/sipeed/picoclaw/issues/440

- **@racso2609 的 Web UI 问题集群（#3406/#3407/#3408）**
  该用户于 9 月 29 日集中提交了三个相互关联的 Web UI 问题，包括状态指示不清晰、会话消失（ghost session）、消息静默排队丢失。背后反映的是 Web UI 在「异步 agent 长期运行 + 多会话管理」场景下的系统性反馈缺陷，是所有交互类产品都会遭遇的「状态可见性」问题。该用户还同时提交了修复 PR #3410，展示了其解救贡献意愿。
  https://github.com/sipeed/picoclaw/issues/3406
  https://github.com/sipeed/picoclaw/issues/3407
  https://github.com/sipeed/picoclaw/issues/3408

## 5. Bug 与稳定性

按严重程度分级：

| 严重度 | Issue | 问题描述 | 修复状态 |
|--------|-------|---------|---------|
| 🔴 高 | [#3408](https://github.com/sipeed/picoclaw/issues/3408) | Web UI 中 agent 忙碌时发送的消息被静默排队，队列满（`MaxQueueSize=10`）时消息被直接丢弃，用户完全无感知。属于消息保真性问题，可能导致任务指令丢失 | 已有对应 PR [#3410](https://github.com/sipeed/picoclaw/pull/3410) 待合并 |
| 🔴 高 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 输入框在会话历史较长时出现严重卡顿（laggy），影响日常聊天输入体验 | 无对应修复 PR，已开放 2 个多月 |
| 🟡 中 | [#3407](https://github.com/sipeed/picoclaw/issues/3407) | 模型思考期间，新建会话从会话列表中消失（ghost session），用户无法回到当前对话 | 无修复 PR |
| 🟡 中 | [#3409](https://github.com/sipeed/picoclaw/issues/3409) | 后台子代理场景下，代理将调度原语（`ScheduleWakeup`/cron）误用作等待机制，短延迟（~300s）触发了非预期的自主循环 tick | 无修复 PR，属于 agent 行为语义问题 |
| 🟡 中 | [#3337](https://github.com/sipeed/picoclaw/pull/3337)（PR） | MCP 服务器连接失败时 `AgentLoop.Run` 直接返回错误退出，导致聊天界面停止响应。修复 PR 被 stale 关闭 | 问题未解决，PR 已关闭 |

## 6. 功能请求与路线图信号

- **[#440] 用上下文窗口边界 + 循环检测替代 `max_tool_iterations: 20` 硬限制**
  这是一条跨越 7 个月的架构级反馈。若被采纳，将取消对 agent 工具调用次数的简单上限，改为基于真实上下文窗口剩余空间 + 循环行为检测来决定何时终止。这会显著提升复杂多步任务（如并行读写、持续集成）的完成率，是 agent 内核层面为数不多的「硬伤级」改进需求。
  https://github.com/sipeed/picoclaw/issues/440

- **[#3406] Web UI 三合一增强：工作指示器 / 手动与频道会话分离 / 会话列表归档**
  用户提出三个明确诉求：①替换当前通用 spinner，提供更清晰的「思考中 / 排队等待 / 已结束」工作状态指示；②将手动创建的会话与 channel 触发的会话明确区分，避免混排；③会话列表支持归档入口，防止过长列表堆积。结合已提交的 PR #3410 来看，Web UI 反馈机制正在经历一轮系统性补强，上述请求中的「状态指示器」部分大概率会在后续版本

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-30

## 1. 今日速览

NanoClaw 过去 24 小时活跃度极高。核心维护者 @glifocat 提交并合入了 15 条 PR 中的大部分，主要集中在 **Gateway/Iron 代理配置、容器生命周期管理、OpenCode 集成以及安装/更新流程的修复**。两个已报告的 Bug（arm64 架构 Iron 代理安装失败、容器清理竞态）均已通过对应 fix PR 关闭，反映了出色的 Bug-修复闭环效率。项目正处于 2.4.0 之后的快速迭代期，无新版本发布，但多项潜在的稳定性改进和功能增强已进入合并队列，项目健康度良好。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

过去 24 小时共有 **7 条 PR 被合并/关闭**，涉及以下关键进展：

### 🐛 Bug 修复合入

| PR | 标题 | 关键影响 |
|---|---|---|
| [#3958](https://github.com/nanocoai/nanoclaw/pull/3958) | fix(log): never throw when a log value cannot be JSON-serialized | 修复日志系统在处理循环引用或 BigInt 时崩溃的问题，提升宿主稳定性 |
| [#3955](https://github.com/nanocoai/nanoclaw/pull/3955) | docs(opencode): keep gateway notes in the gateway skills | 将 OpenCode 技能的网关文档独立到各网关技能中，改善文档结构 |
| [#3954](https://github.com/nanocoai/nanoclaw/pull/3954) | docs(gateways): correct what the credential reread refuses in two comments | 修正网关凭据重新读取逻辑的注释说明 |
| [#3953](https://github.com/nanocoai/nanoclaw/pull/3953) | fix(iron-proxy): stop early on arm64 engines that cannot run amd64 images | **修复 #3888**：在 arm64 Docker 引擎上提前检测并停止 Iron Proxy 安装，避免 `exec format error` |
| [#3919](https://github.com/nanocoai/nanoclaw/pull/3919) | fix(opencode): check the model URL against the selected gateway at the prompt | **替代 #3965 的早期版本**：OpenCode 设置流程在提示阶段即校验模型 URL 与所选网关的兼容性 |
| [#3878](https://github.com/nanocoai/nanoclaw/pull/3878) | fix(setup): stop the ping agent's container before deleting its folder | 修复安装后清理阶段遗留临时容器的问题 |
| [#3947](https://github.com/nanocoai/nanoclaw/pull/3947) | fix(host): stop containers whose session or agent group was deleted | **修复 #3909**：宿主守护进程定期清理已删除会话/代理组对应的容器，无需等待重启 |

### 📌 总结

今日合入的修复覆盖了 **容器生命周期管理、日志系统健壮性、arm64 平台兼容性、安装/更新流程** 四个关键领域。特别是 #3947 修复了会话删除后容器残留的潜在资源泄漏问题，#3958 消除了日志系统本身的崩溃风险，这两项对生产环境的长期稳定性有直接贡献。项目整体在稳定性和多架构支持上迈进了扎实的一步。

## 4. 社区热点

今日最值得关注的讨论集中在以下 PR：

### 🔥 热度最高：Gateway 与本地模型配置系列

围绕 **Gateway 配置、本地模型 URL 校验、以及 Iron 纯 HTTP 访问支持** 展开了一系列 PR（#3964、#3966、#3965、#3919、#3953）。这些 PR 全部由核心维护者 @glifocat 在 9 月 29 日密集提交，表明：

- **用户痛点明确**：使用 Iron 代理时，本地 keyless 模型通过 `http://host.docker.internal:<port>/v1` 访问会反复触发审批卡片或直接失败
- **解决方案在快速迭代**：#3919 被 #3965 取代（后者增加了对所选网关的实时校验），#3964 进一步允许 provider 声明精确的 `host:port` 端点
- **架构适配需求迫切**：arm64 平台（如 NVIDIA DGX Spark）无法运行 amd64 的 Iron Control 镜像，#3953 为此提供了提前检测能力

### 📊 潜在关注：CI 供应链安全

[#3968](https://github.com/nanocoai/nanoclaw/pull/3968)（ci: pin workflow actions and cosign, add Dependabot）将 7 个 GitHub Actions 从浮动标签（`@v4`、`@v1`）改为精确版本并引入 Dependabot 自动更新。虽然技术性较强，但反映了项目对供应链安全的重视，通常会被社区正面看待。

### 👥 社区参与

唯一非 @glifocat 提交的 PR 是 [#3901](https://github.com/nanocoai/nanoclaw/pull/3901)（@barnuri 提交的 HTTPS 代理支持修复），该 PR 已开放 4 天仍为待合并状态，值得关注其反馈进度。

## 5. Bug 与稳定性

### 已关闭（已修复）

| 严重程度 | Issue | 问题 | 修复 PR |
|---|---|---|---|
| **高**（平台完全不可用） | [#3888](https://github.com/nanocoai/nanoclaw/issues/3888) | Iron Proxy 在 arm64 主机上安装失败：Iron Control 镜像仅支持 amd64，Docker 启动报 `exec format error` | [#3953](https://github.com/nanocoai/nanoclaw/pull/3953) 已合并 |
| **中**（资源泄漏/行为异常） | [#3909](https://github.com/nanocoai/nanoclaw/issues/3909) | 代理组被删除后，正在生成的会话容器仍会被创建，导致孤儿容器运行 | [#3947](https://github.com/nanocoai/nanoclaw/pull/3947) 已合并 |

### 待合并的修复 PR

| PR | 问题 | 当前状态 |
|---|---|---|
| [#3901](https://github.com/nanocoai/nanoclaw/pull/3901) | 宿主服务无法通过 HTTPS 代理访问互联网（Node.js 需 `NODE_USE_ENV_PROXY` 环境变量） | OPEN，待合并 |
| [#3962](https://github.com/nanocoai/nanoclaw/pull/3962) | `/update-nanoclaw` 在 liveness 探针失败时仍报告更新完成 | OPEN，待合并 |
| [#3956](https://github.com/nanocoai/nanoclaw/pull/3956) | `rollback` 命令未停止正在运行的 nohup 宿主，且未先停止代理容器就替换 `data/` | OPEN，待合并 |
| [#3918](https://github.com/nanocoai/nanoclaw/pull/3918) | result-door 提供方（如 OpenCode）在代理已通过 `send_message` 回复时仍会重复发送回复 | **Held**，等待 send_message ack 机制落地 |

### 风险评估

- **已合入修复不存在已知回归**，但 #3947 涉及容器扫描逻辑改动，建议关注下一个小版本中的容器管理行为变化
- #3918 当前被标记为 **Held**，说明该问题在现有架构下难以完全修复，需要等待后续功能支撑

## 6. 功能请求与路线图信号

根据当前待合并的 PR，以下功能方向有明显信号可能进入下一版本：

| 方向 | PR | 说明 |
|---|---|---|
| **Gateway 精确端点声明** | [#3964](https://github.com/nanocoai/nanoclaw/pull/3964) | Provider 可声明精确的 `host:port` 模型端点，核心自动审批，避免调用非默认端口的模型时反复弹出审批卡片 |
| **Iron 本地纯 HTTP 访问** | [#3966](https://github.com/nanocoai/nanoclaw/pull/3966) | 允许同一台机器上的 keyless 模型通过 `http://host.docker.internal:<port>/v1` 访问，仅开放声明的端口和 OpenAI 推理路由 |
| **OpenCode 网关实时校验** | [#3965](https://github.com/nanocoai/nanoclaw/pull/3965) | 设置过程中实时校验模型 URL 与所选网关的匹配性，避免保存后每次请求失败 |
| **HTTPS 代理支持** | [#3901](https://github.com/nanocoai/nanoclaw/pull/3901) | 让宿主服务可运行在仅能通过 HTTPS 代理访问互联网的机器上 |
| **CI 供应链硬化** | [#3968](https://github.com/nanocoai/nanoclaw/pull/3968) | GitHub Actions 和 cosign 版本固定 + Dependabot 自动更新 |
| **更新/回滚流程增强** | [#3956](https://github.com/nanocoai/nanoclaw/pull/3956)、[#3962](https://github.com/nanocoai/nanoclaw/pull/3962) | 回滚时正确停止宿主和代理容器；更新失败时准确检测 |

**特别值得关注**：`feat` 标签的 PR（#3964、#3966）与 `fix` 标签的 PR（#3965）同时提交，说明 **Gateway 本地模型体验是当前开发的核心主线**。这些功能彼此关联，预计会作为一个整体功能批次进入下一个 minor 版本。

## 7. 用户反馈摘要

由于今日两个 Issue 均无评论，用户反馈主要从 Issue/Pull Request 的问题描述中提炼：

- **arm64 用户（NVIDIA DGX Spark）无法使用 Iron Proxy 完整功能**（[#3888](https://github.com/nanocoai/nanoclaw/issues/3888)）：即使通过 Advanced setup 搭配 OpenCode 使用，Iron 的 control 环节直接崩溃，安装流程缺乏前置的架构检查，用户需要自行排查 Docker 镜像架构不匹配的问题
- **删除代理组后容器仍然残留**（[#3909](https://github.com/nanocoai/nanoclaw/issues/3909)）：`spawnContainer` 在读取代理组信息后有一段时间窗口，期间代理组被删除时，容器仍会启动。用户期望删除操作能立即反映在容器生命周期中
- **本地模型开发体验不顺畅**（[#3965](https://github.com/nanocoai/nanoclaw/pull/3965)、[#3966](https://github.com/nanocoai/nanoclaw/pull/3966)）：使用 Iron 时，本地 keyless 模型默认被建议使用 `http://host.docker.internal:<port>/v1`，但这会触发审批或直接失败。用户需求是**对本地开发场景更友好的默认行为**

整体而言，用户反馈集中在 **多架构支持**和 **本地/私有模型接入体验** 两个方面。

## 8. 待处理积压

### 需关注的长尾 PR

| PR | 创建时间 | 问题 | 风险 |
|---|---|---|---|
| [#3901](https://github.com/nanocoai/nanoclaw/pull/3901) | 2026-09-25（4 天） | HTTPS 代理支持修复（@barnuri 提交） | 唯一的社区贡献 PR 尚未获得处理，可能影响社区参与积极性 |
| [#3918](https://github.com/nanocoai/nanoclaw/pull/3918) | 2026-09-25（4 天） | result-door 重复回复问题 | 明确标记为 Held，依赖 send_message ack 机制，但该依赖功能尚未有对应 PR |
| [#3956](https://github.com/nanocoai/nanoclaw/pull/3956) | 2026-09-28（1 天） | 回滚流程缺陷（nohup 宿主未停止、代理容器未清理） | 回滚逻辑属于高风险路径，建议优先 review |
| [#3962](https://github.com/nanocoai/nanoclaw/pull/3962) | 2026-09-28（1 天） | 更新时检测到 liveness 探针失败仍报告成功 | 更新成功/失败的误报可能导致用户在损坏状态下继续操作 |

### 建议

- **优先处理 #3956 和 #3962**：更新/回滚路径的缺陷影响面大，可能导致用户环境损坏或误判
- **关注 #3901**：外部贡献者的 PR 及时回复有利于维持社区生态
- **跟进 #3918 的依赖**：确认 send_message ack 机制是否有排期，避免 PR 长期搁置

---

*报告生成时间：2026-09-30 | 数据来源：NanoClaw GitHub 仓库 | 语言：中文*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-30

## 1. 今日速览

IronClaw 在 2026-09-30 迎来一次稳定版本发布（`v1.4.1`），同步关闭了对应的发布 PR（#8120），表明 1.4.1 正式成为最新稳定渠道版本。社区侧保持两项开放 Issue（#7889 远程边缘工作者 RFC、#8113 首轮工具选择提案），共产生 3 条评论；开放 PR 中，#8119 提交了体量达 XL 的新功能实现（turn-0 工具选择，与 #8113 提案直接对应），另外一条由 CI 机器人驱动的代码知识图谱刷新 PR（#7988）仍在等待维护者审核。整体活跃度中等偏上：有发布、有功能提交、有长期 RFC 持续更新，但无紧急 Bug 报告或回归问题，项目状态健康稳定。

- 新版本：`ironclaw-v1.4.1`（稳定版，含 2 个 RC 验证过的修复）
- 开放 PR：2 条（1 条新功能，1 条 CI/维护）
- 开放 Issues：2 条（1 条 RFC，1 条功能提案）
- 紧急 Bug：0

---

## 2. 版本发布

### ironclaw-v1.4.1（2026-09-29）

Release 链接：https://github.com/nearai/ironclaw/releases  
发布 PR：#8120（[链接](https://github.com/nearai/ironclaw/pull/8120)）

**更新内容**：

- Google 扩展（Gmail、Google Calendar）激活修复：在以 Web UI 方式配置 Google OAuth 客户端（而非预先在环境变量/配置中注入）的部署上，现可正常完成扩展激活流程。
- Wasmtime 安全更新：随上游安全公告同步升级，增强 WASM 工具运行时的安全性。

**破坏性变更**：无。本次为从 `1.4.1-rc.2` 的稳定晋升，Release Notes 中未标注任何 breaking changes。

**迁移注意事项**：

- 使用 Google 扩展的运维人员，若此前因 OAuth 客户端配置方式导致激活失败，可在升级后在 Web UI 中重新配置 OAuth 客户端并再次尝试激活。
- 升级前建议确认 Wasmtime 相关的自定义插件/工具与新版运行时的兼容性，尤其涉及底层 WASM 系统接口的扩展。

---

## 3. 项目进展

今日关闭/合并的重要 PR：

- **#8120 [CLOSED] chore(release): promote 1.4.1-rc.2 to 1.4.1**（[链接](https://github.com/nearai/ironclaw/pull/8120)）  
  贡献者：@henrypark133（核心团队）。该 PR 将经过 RC 验证的 `1.4.1-rc.2` 正式提升为稳定版 `1.4.1`，更新了包版本、lockfile 及公共变更日志。合并这一 PR 意味着上述两项修复已进入稳定渠道，可供所有用户使用。

此外，值得关注的开放中的进展性 PR：

- **#8119 [OPEN] feat(loop-host): opt-in tool selection with embeddings**（[链接](https://github.com/nearai/ironclaw/pull/8119)）  
  贡献者：@CjS77（新贡献者），体量 XL，风险中等。这是一个功能实现，也同时对应 Issue #8113 的提案。值得强调的是，该 PR 恰好于 9 月 29 日提交（提案后 2 天就产生了实现），显示出该功能可能已有一段时间的内部讨论或来自社区的高热情。若被合并，它将把「turn-0 工具选择」引入 IronClaw 的 loop-host 组件，并为对话首个模型调用节省 `tool_search` 往返开销。

---

## 4. 社区热点

今日最受关注的讨论来自两条开放 Issue，均涉及「扩展 IronClaw 的能力边界」，但角度不同：

### #7889 [OPEN] RFC: extend the scheduler/orchestrator with opt-in remote edge workers
链接：https://github.com/nearai/ironclaw/issues/7889

- 作者：@kvnloo | 创建于 2026-08-25 | 最后更新于 2026-09-29 | 评论 1 条
- 核心诉求：IronClaw 已经支持并行任务、本地 workers、Docker sandbox workers、WASM 工具、资源限制、Routines 等，但 worker 池仍属于单一主机。作者提议引入「可选（opt-in）的远程边缘 workers」，以便让用户手中大量空闲的机器（多为闲置的个人电脑、边缘设备）加入到集群中，提升整体算力利用率。
- 分析：这是 IronClaw 从「单机/单集群」走向「分布式/边缘」扩展方向的重要信号。评论数虽然不多，但从前 24 小时 Activity 看，该 RFC 在 9 月 29 日仍有更新（很可能来自作者或维护者的补充说明），说明讨论仍在推进中，值得关注后续维护者的方向性表态。

### #8113 [OPEN] Proposal: opt-in turn-0 tool selection (BM25F + embeddings)
链接：https://github.com/nearai/ironclaw/issues/8113

- 作者：@CjS77 | 创建于 2026-09-27 | 更新于 2026-09-29
- 核心诉求：在对话首次模型调用之前，先对用户消息与已授权的工具目录（tool catalog）进行排名（基于 BM25F + 嵌入检索），将最相关的工具提前「广而告之」给模型。这样一来模型可以直接调用推荐的工具，省去先发起一次 `tool_search` 工具调用的往返成本。提案明确为「opt-in、默认关闭」（`RE...` 截断处应为环境变量名）。
- 分析：该提案直接指向成本与延迟优化，适用于工具数量较大、频繁使用 `tool_search` 的应用场景。2 天之内即有对应的 PR #8119 提交实现，效率极高。背后反映出用户对多轮工具检索开销的不满是真实的痛点，也说明贡献者（或核心团队）对性能优化的敏感度高。

---

## 5. Bug 与稳定性

今日无新增严重 Bug、崩溃或回归报告。v1.4.1 稳定版修复了两个与稳定性、安全相关的问题：

| 严重程度 | 问题描述 | 状态 |
|---|---|---|
| 中 | **Google 扩展激活失败**：当 operator 通过 Web UI 而非预配置方式提供 Google OAuth 客户端时，Gmail / Google Calendar 扩展无法激活。 | 已在 v1.4.1 中修复 |
| 中（安全） | **Wasmtime 安全漏洞**：依赖组件 Wasmtime 存在安全更新需求，可能影响 WASM 工具运行时的安全性。 | 已在 v1.4.1 中修复（依赖升级） |

无遗留待修复的公开 Bug 报告。

---

## 6. 功能请求与路线图信号

当前开放的两个 Issue 均为功能/方向性提议，且在路线图上可能存在先后之分：

| Issue/PR | 功能 | 状态 | 路线图信号 |
|---|---|---|---|
| [#8113](https://github.com/nearai/ironclaw/issues/8113) + [#8119](https://github.com/nearai/ironclaw/pull/8119) | turn-0 工具选择（BM25F + embeddings） | PR 已提交，待审核 | 高概率纳入下一个小版本（若审核通过可能 1.5.0 或 1.4.2） |
| [#7889](https://github.com/nearai/ironclaw/issues/7889) | 远程边缘 workers | RFC 讨论中 | 方向性探索，尚在早期，未来可能进入 2.x 路线图 |

从 PR #8119 的提交速度（XL 体量、风险中等、新贡献者）来看，IronClaw 对社区驱动的功能贡献持开放态度，且此功能为「默认关闭」设计，风险可控。建议关注其审核进展，尤其是在测试覆盖、性能评测方面是否有补充数据。

---

## 7. 用户反馈摘要

由于今日活跃讨论有限，主要反馈提炼自长期开放 RFC #7889 的讨论语境：

- **用户痛点 — 算力浪费**：不少用户拥有若干「大部分空闲」的机器，但 IronClaw 当前架构要求 worker 资源池绑定在单一主机上，导致资源无法跨主机汇聚。
- **使用场景**：自托管用户希望把几台闲置 PC 组成一台「虚拟超级计算机」，运行并行任务、定时 Routines 等。这与 IronClaw 的「安全优先审计模型」结合后，用户对「opt-in」设计表示认可——不默认开启、不引入额外的信任假设。
- **满意度倾向**：整体偏向正面。用户对 IronClaw 现有的 worker 抽象、Docker/WASM 沙箱、资源限制表示认可，认为「只差最后一块拼图（多主机）」。

由于今日无新 Bug 反馈、无用户抱怨，社区反馈面整体良好。

---

## 8. 待处理积压

| 项目 | 类型 | 当前状态 | 建议关注点 |
|---|---|---|---|
| [#7889](https://github.com/nearai/ironclaw/issues/7889) | RFC（远程边缘 workers） | 开放已 36 天，最近更新 9 月 29 日 | 建议维护者给出方向性反馈（接受/拒绝/延后），避免长期悬置 |
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | CI 维护 PR（知识图谱刷新） | 开放已 32 天（8 月 29 日创建，9 月 30 日更新） | CI 机器人自动生成的快照刷新 PR，建议维护者尽快 review/merge，否则长期滞留积累技术债。此项体量极小，风险低，但长期不动会削弱自动化流程的可信度 |

---

**总体评估**：IronClaw 项目在 2026-09-30 呈现健康、活跃的状态——稳定版本正常迭代、新功能提案转化为 PR 的速度快、未出现回归或安全事件。社区讨论的主要方向集中在「分布式扩展」与「性能优化」两大主题上，与项目自身的架构优势高度契合。唯一需要维护者留意的是 #7988 这类机器人 PR 的积压问题，以及 #7889 RFC 的明确回应，以维持社区贡献者的参与动力。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-30

> 数据统计区间：过去 24 小时（2026-09-29 至 2026-09-30）  
> 数据来源：github.com/netease-youdao/LobsterAI

---

## 1. 今日速览

过去 24 小时项目整体活跃度中等偏上：共更新 10 条 Issue（新开/活跃 8，关闭 2）和 11 条 PR，PR 全部被合并/关闭，未新增未合并 PR，说明核心维护团队的代码合并节奏保持高效。唯一略显隐忧的是：今日 PR 中约半数属于 "stale" 旧 PR 的清理关闭，真正代表最新开发方向的 PR 集中在 **gateway 重启预算**、**安装器 Skills 备份** 和 **Markdown/Cowork 体验优化** 三个方向。Issue 侧有 7 条标记为 stale 的 7 月底遗留问题仍未解决，其中包含多个 Windows 平台 Bug，维护者需注意积压风险。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共合并/关闭 11 条 PR，可分为「核心稳定性修复」「安装器用户体验」「渲染与交互增强」三组：

### 3.1 核心稳定性修复
- **[PR #2783] fix: gateway restart budget** — 修复 gateway 重启预算逻辑，避免网关在健康后短时间内崩溃时无限重启。与 #2707 属同一方向的连续修复，说明该问题经历了从根因定位到补丁收敛的过程。
- **[PR #2707] fix(openclaw): only refill gateway restart budget after a stability window** — 根因是 `doStartGateway()` 在首次就绪探针成功后就把重启计数归零，导致网关反复崩溃重启；修复为仅在稳定窗口后才补充重启预算。这是今日合并的一项关键稳定性改进。
- **[PR #2706] fix(installer): build Skills backup file records as PSCustomObject** — 修复 Windows PowerShell 5.1 上旧版 Skills 备份助手因 `Measure-Object` 计算 totalBytes 失败而走「备份失败」路径的问题。

### 3.2 安装器用户体验
- **[PR #2782] fix(installer): explain how to move user skills when backup aborts update** — 列出安装树中发现的用户技能文件夹，并使用中/英双语弹出对话框指导用户将其迁移至 per-user skills 根目录，替代原先仅英文的状态文本，直接回应了 Issue #2395 的安装痛点。

### 3.3 渲染与交互增强
- **[PR #2781] fix(markdown): keep currency dollars out of inline math** — 修复 remark-math 误将“$3/$15”中的货币符号配成 KaTeX 公式的问题，采用 Pandoc 分隔符规则判定行内公式。
- **[PR #2780] feat(artifacts): open markdown links in the matching artifact card** — 助手消息中的内联链接改为在对应 artifact 卡片中打开，并放宽 artifact 解析器以识别链接文件，同步扩展自动预览策略和切片状态。
- **[PR #2758] feat(cowork): display and refresh native OpenClaw progress cards** — 在 Cowork 输入框上方展示 OpenClaw 持久化进度卡片，并支持用户手动刷新、保留之前计划，卡片 Markdown、步骤状态、修订级 dismiss、断线重连更新均保持权威。

### 3.4 旧 PR 清理（stale 关闭）
- 4 条 4 月提交的功能/修复 PR（#1682 朗读功能、#1683 技能 URL 校验、#1707 切换 Agent 清空输入框、#1773 i18n 补全）今日被标记 stale 后关闭。其中 #1682 和 #1707 包含完整实现代码，关闭仅代表未合入主干，与原方案设计思路后续可能被重做，值得关注。

---

## 4. 社区热点

今日最活跃的 Issue 是 **[#2293] 重启后，多个 agent 下的 USER.md 被覆盖替换的 BUG**（6 条评论，已关闭），讨论核心为多 Agent 配置下用户数据隔离失效：用户修改任意 Agent 的「关于你」页面或 `USER.md` 后，其他 Agent 的内容被同步覆盖，重启后会以 main agent 的 `USER.md` 覆盖所有 Agent。虽然该 Issue 被标记为 stale 关闭，但其背后反映的诉求（**多 Agent 之间强隔离、用户数据不被隐式互相覆盖**）是 AI Agent 桌面端产品的关键信任基础，建议项目组明确验收结论。

次活跃的是 **[#2342] 左下角广告可以彻底关闭吗**（3 条评论，已关闭），用户希望彻底关闭左下角广告而不仅是点叉关闭，且 2026.7.15 版本前未被推送过该广告，属于对商业化尝试的不满反馈。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 严重（数据完整性） | [#2393] | 加速器在字符串改写时将字面 `\f` 字节对（5C 66）替换为 `\x0C`（form feed），导致写入文件静默损坏。100% 可重现，影响任何含 `\firecrawl`、`\foo`、`\filename` 等 token 的文本写入 | OPEN，无对应 fix PR |
| 🔴 严重（数据覆盖） | [#2293] | 多 Agent 的 `USER.md` 被 main agent 覆盖，用户不同 Agent 的定制化设置丢失 | CLOSED（stale），未给出明确修复结论 |
| 🟠 中高（安装阻塞） | [#2395] | 安装/更新失败：`The LobsterAI update stopped because user skills could not be backed up`，导致旧版本未被替换、更新中止 | OPEN，已有对应 fix PR #2782/#2706 |
| 🟡 中（功能异常） | [#2779] | 多分身配置下「梦境日记」面板恒为空，内置 OpenClaw runtime 2026.8.1 缺少 `doctor.memory.*` 的 `ambient-owner` 回退 | OPEN，上游已修复，待跟进 |
| 🟡 中（平台兼容） | [#2390] | exec 工具硬编码调用 powershell.exe（PS 5.1），而非系统已安装的 PS 7；且中文字符用户名（如 `M幸福`）导致路径编码异常 | OPEN，无对应 fix PR，已有 1 条评论 |
| 🟡 中（平台兼容） | [#2396] | exec 默认 shell wrapper 为 PS 5.1，导致 Linux 风格命令及含特殊字符的内联脚本（`node -e`/`pwsh -Command`）静默失败 | OPEN，无对应 fix PR |

其中 #2395 已出现修复 PR（#2782/#2706 合并），预计后续版本可解除安装阻塞；#2779 则是「上游已修、本仓待同步」的典型 tracking Issue；最值得注意的是 #2393，数据静默损坏属于严重度最高的缺陷，目前已开放两个月、无对应 PR，建议维护组尽快确认优先级。

---

## 6. 功能请求与路线图信号

- **技能重命名**（[#2391]）：用户明确表示「请添加一个功能：技能可以重命名」。目前项目已有 Skills 导入、校验（#1683）、备份（#2706/#2782）等周边能力，但核心的「技能再编辑/重命名」尚未落地。结合今日合并的 skills 相关安装器修复，技能管理可能是下一阶段重点，此需求被纳入的可能性较高。
- **定时任务增强**（[#2392]）：用户要求「定时任务可选择使用哪个 agent、哪个 skill」。当前定时任务能力较薄，该需求涉及任务调度与 Agent 执行引擎的联动，属于较大的功能模块，短期落地可能性中等。
- **彻底关闭广告开关**

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-30

## 1. 今日速览

过去 24 小时 Moltis 项目整体保持低活跃度：无版本发布、无 PR 合并或关闭，核心代码库未发生变动。社区侧有 1 个新 Issue（#1289）提交，为功能增强请求，未产生评论或点赞互动。项目未报告任何新的 Bug、崩溃或回归问题，仓库健康状态稳定，目前处于需求收集与功能规划期，维护者对新 Issue 的响应将决定社区活跃走向。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有合并或关闭的 Pull Request，无代码层面可量化的功能推进或修复。

唯一的项目动态是新增 Issue [#1289](https://github.com/moltis-org/moltis/issues/1289)，提出了新功能方向，这为后续路线图讨论提供了输入。整体来看，项目今日未向前推进实质代码变更，处于相对静默状态。

## 4. 社区热点

今日没有评论数较高的热门讨论，唯一动态为全新提交的 [Issue #1289 [Feature]: Goal mode or ralph loop](https://github.com/moltis-org/moltis/issues/1289)。

该 Issue 虽然尚无评论和点赞，但作为 24 小时内唯一社区输入，仍值得关注。从标题和摘要看，用户希望 Moltis 增加一种“目标模式（Goal mode）”或“ralph loop”循环机制，推测其诉求是让 AI 智能体能够在一个目标驱动下持续自主迭代执行，而不是每次都需要显式交互。这一方向与个人 AI 助手向自主代理（agentic）演进的趋势一致。

## 5. Bug 与稳定性

今日无新增 Bug、崩溃、性能回归或稳定性问题报告。未发现需要紧急修复的缺陷，也没有对应的 fix PR 在途。项目当前稳定性良好。

## 6. 功能请求与路线图信号

今日唯一且重要的路线图信号来自 [Issue #1289](https://github.com/moltis-org/moltis/issues/1289)：用户请求增加 **Goal mode 或 ralph loop**。

该请求的潜在含义是：允许用户设定一个目标，然后让 Moltis 自动规划、迭代、循环执行直到目标达成。这一功能如果落地，将显著提升 Moltis 的自主性和实用性，可能成为下一版本的一个重要特性候选。

需要注意的是，该请求目前仅来自单个用户，缺乏评论和点赞佐证，需求强度尚未形成社区共识。建议维护者：
- 在 Issue 中回复初步技术可行性判断；
- 根据 roadmap 明确是否纳入下一版本计划；
- 引导更多用户参与讨论以验证需求热度。

## 7. 用户反馈摘要

从今日唯一的 [Issue #1289](https://github.com/moltis-org/moltis/issues/1289) 可提炼以下用户信号：

- **用户画像**：提交者主动勾选了“已搜索现有请求”选项，说明其对项目已有一定了解，需求是经过思考后提出的。
- **使用场景**：用户期望 Moltis 能够以更自主的方式完成任务闭环，而不局限于单轮对话或明确指令，反映出对“目标驱动 + 循环执行”场景的真实诉求。
- **反馈特征**：该 Issue 没有勾选“来自聊天会话并提供上下文”的选项，说明此需求可能更多是产品能力层面的预期，而非对某个具体 Bug 或会话故障的抱怨。

由于该 Issue 尚无评论，暂无法获取更多用户的共鸣或争议信息，需等待后续讨论。

## 8. 待处理积压

今日没有长期未响应的重要 Issue 或 PR 进入警告区间。唯一新增的 [#1289](https://github.com/moltis-org/moltis/issues/1289) 创建于 2026-09-29，目前仍处于 OPEN 状态，等待维护者进行标签分类、初步评估与回复。

建议维护者尽快处理该 Issue 的首次响应，避免因响应迟缓使新提交者失去贡献热情。若确认纳入路线图，可以将其标记为 `enhancement`（当前尚未打标签），并补充计划版本信息。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-30

> 数据来源仓库：[github.com/agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)（CoPaw 项目）

---

## 1. 今日速览

CoPaw 过去 24 小时保持高活跃度：共 8 条 Issue 更新（6 条新开/活跃、2 条关闭），38 条 PR 更新（17 条待合并、21 条已合并/关闭，约 55% 已落地），无新版本发布。PR 侧的合并/关闭率较高，说明维护者响应积极；Issue 侧以 Bug 报告为主，集中在任务追踪计数、会话上下文污染、OpenAI 集成失败等方向。项目整体健康度良好，但数个影响面较大的稳定性问题尚无对应修复 PR，值得持续关注。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共有 21 条 PR 完成合并/关闭，主要推动了以下方面的改进：

- **终端子系统稳定性**：使用 `poll` 替代 `select`，支持高 POSIX 文件描述符，修复了进程 fd 超过 `FD_SETSIZE`（常见为 1024）时终端会话失效的问题。相关 PR：[#8032](https://github.com/agentscope-ai/QwenPaw/pull/8032)、[#8023](https://github.com/agentscope-ai/QwenPaw/pull/8023)
- **CI 与跨平台工程化**：修复媒体文件名跨平台路径、沙箱清理隔离、Windows 终端中断等问题，提升 CI 跨平台稳定性。[#8026](https://github.com/agentscope-ai/QwenPaw/pull/8026)
- **控制台 E2E 测试**：与重新设计的 UI 对齐，覆盖 ACP、Channels、Cron Jobs、Heartbeat 等模块，并验证自动保存与 API 状态同步。[#8037](https://github.com/agentscope-ai/QwenPaw/pull/8037)
- **桌面安装包**：禁用 NSIS 固体压缩，改善 Windows 安装包构建兼容性。[#8025](https://github.com/agentscope-ai/QwenPaw/pull/8025)
- **时区处理可移植性**：拒绝空白 Qoder 时区值，并将平台相关 OS 错误视为无效时区输入。[#8024](https://github.com/agentscope-ai/QwenPaw/pull/8024)

这些合并表明项目正在系统性地加固终端、桌面端、CI 等基础设施，整体朝着更稳定的跨平台方向推进。

---

## 4. 社区热点

今日讨论最集中的 Issue 围绕数据一致性与模型行为控制：

- **[#7991 TaskTracker 僵尸条目导致计数不准确](https://github.com/agentscope-ai/QwenPaw/issues/7991)** — 4 条评论。用户发现仪表盘显示 “2 running tasks”，但聊天列表 API 只返回 1 个 `status="running"` 的会话。问题直指 `task_tracker.get_global_status()` 与 `tracker.get_status(chat_id)` 作用域不一致，社区对可观测数据准确性关注度较高。
- **[#2359 HEARTBEAT_OK / CRON_OK 功能请求](https://github.com/agentscope-ai/QwenPaw/issues/2359)** — 3 条评论。用户建议参考 OpenClaw，引入 `HEARTBEAT_OK` / `CRON_OK` 让模型自行决定心跳或定时任务场景下是否发送处理结果。该请求已开放 6 个月，仍持续获得讨论。
- **[#8036 Creator OpenAI 集成与恢复失败](https://github.com/agentscope-ai

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