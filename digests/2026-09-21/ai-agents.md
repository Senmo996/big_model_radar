# OpenClaw 生态日报 2026-09-21

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-21 02:13 UTC

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

# OpenClaw 项目动态日报 — 2026-09-21

## 1. 今日速览

过去24小时内，OpenClaw 项目保持了极高的社区活跃度：**500 条 Issue 更新**（新开/活跃 287 条，关闭 213 条）与 **500 条 PR 更新**（待合并 300 条，已合并/关闭 200 条）并驾齐驱，无新版本发布。Issue 侧的核心焦点集中在 **2026.9.5 升级引发的各类故障**（更新死锁、doctor 失败、回滚异常）与**长期存在的稳定性问题**（SQLite WAL 膨胀、Gateway 内存泄漏、进程 zombie 累积）。PR 侧则呈现明显的"维护者主导"特征：`@steipete` 一人贡献了超过 10 个 PR，覆盖测试稳定性、CI 优化、UI 修复与插件系统，项目整体处于密集修复与加固阶段。

---

## 2. 版本发布

**无新版本发布。** 最近稳定版仍为 2026.9.5。但值得注意的是，今日有大量 Issue 集中在 2026.9.5 的升级故障上（详见下文 Bug 与稳定性部分），社区对新版本质量的信任度有所下降。

---

## 3. 项目进展

过去 24 小时内，PR 侧呈现"数量大、单个规模小、以修复为主"的特征——200 条 PR 被合并或关闭，但真正对用户产生直接可感知影响的 Feature PR 极少。以下为值得关注的已关闭/合并 PR：

| PR | 内容 | 意义 |
|---|---|---|
| [#154178](https://github.com/openclaw/openclaw/pull/154178) | 将 transcript 工具的 list/show 查询移出主线程，改由共享 worker 执行 | 减少主线程阻塞，是对 [#119720](https://github.com/openclaw/openclaw/issues/119720) 所报告问题的持续修复 |
| [#154131](https://github.com/openclaw/openclaw/pull/154131) | 移除 compaction checkpoints 功能（大幅重构，涉及多端、多扩展） | 简化功能面，减少维护分支，属技术债清理 |
| [#154260](https://github.com/openclaw/openclaw/pull/154260) | 稳定 bounded Codex 预览测试 | 测试基础设施加固 |

**整体评估：** 合并的 PR 以内部质量提升为主（测试加速、CI 稳定性、代码重构），没有重大的新功能落地。项目当前阶段的策略重心明显是"止血"而非"扩张"。

---

## 4. 社区热点

今日讨论热度最高的 Issue 集中反映了社区对 **升级安全性和系统稳定性** 的焦虑：

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 35 | Agent SQLite WAL 文件无限膨胀（1.4–2.8 GB），阻塞 Gateway 启动。P0 级 bug，已有明确复现路径 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 31 | hook/tool 子进程 zombie 累积，导致运行时性能劣化。持续近 3 个月未修复，社区耐心接近耗尽 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | 31 | MCP server init 超时导致 Gateway 进程崩溃（unhandled rejection）。P0 级崩溃 bug |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | 29 | Gateway 内存泄漏，RSS 从 350MB 涨至 15.5GB 导致 OOM。已持续 3 个月以上 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | 20 | 632-agent 大规模部署下 Gateway 就绪但不服务，/health 全部超时 |
| [#152759](https://github.com/openclaw/openclaw/issues/152759) | 20 | `openclaw update` 静默失败，doctor-failed 但用户无感知 |

**热点分析：** 前五大热点中四个是长期未解决的 P0/P1 级稳定性问题。社区情绪呈现一定的"疲态"——用户反复在评论中表示"升级后环境从稳定变为不稳定"（[#153257](https://github.com/openclaw/openclaw/issues/153257)）、"升级失败但无任何提示"（[#152759](https://github.com/openclaw/openclaw/issues/152759)）。这与 2026.9.5 版本更新问题集中爆发有直接关联。

---

## 5. Bug 与稳定性

今日 Issue 中的 Bug 报告按严重程度排列如下：

### P0 级（Crash / 数据丢失 / 升级阻断）

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#153882](https://github.com/openclaw/openclaw/issues/153882) | **升级死锁：** 插件状态迁移等待更新父进程自身持有的 lease，导致 Doctor 中止、Gateway 停滞（2026.9.4→9.5） | 已关闭 |
| [#153704](https://github.com/openclaw/openclaw/issues/153704) | **升级确定性失败：** 2026.9.5 候选版本的 doctor 在固定 ~299s 处死于 agent-db 预迁移完整性检查，错误指向推理路由 | 已关闭 |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | **启动挂起：** 2026.9.5 Gateway 启动在 model-runtime 侧车处挂起 ~17 分钟后以超时失败 | 开放 |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | **升级导致环境崩溃：** 2026.9.5 将稳定环境变为 8 小时故障恢复 | 开放 |
| [#153067](https://github.com/openclaw/openclaw/issues/153067) | **持续状态拷贝风暴：** Gateway 每 ~5 秒重新拷贝整个状态 DB（~170MB/次，~5.9TB/天） | 已关闭 |
| [#146887](https://github.com/openclaw/openclaw/issues/146887) | **跨四阶段升级失败：** stdio MCP 超时崩溃 doctor → lint 硬门禁 → managed-service-handoff-restore-failed | 开放 |
| [#144742](https://github.com/openclaw/openclaw/issues/144742) | **发布缺失：** 2026.9.4 未包含 #144208 修复，导致废弃 v1 handoff lease 行使每次配置写入失败 | 开放，标记 maintainer |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) | **自升级死锁与回滚 cron 失败：** v6.33→v9.4 自动升级死锁，自动回滚后 cron 被破坏 | 开放 |

### P1 级（功能异常 / 性能劣化）

| Issue | 问题描述 | 状态 |
|---|---|---|
| [#153706](https://github.com/openclaw/openclaw/issues/153706) | 已关闭的 ACP 会话错误断言为原生 Codex 运行时 | 开放，P2 |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | claude-cli 后端超长回合丢失完整回复（"no active tool authority snapshot"） | 开放 |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行中到达的聊天消息被丢弃（2026.9.2 回归） | 开放，已有明确 fix-shape |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | 混合 requester-settle 批次在所有权检查后无限重试 | 开放，已有明确 fix-shape |
| [#132303](https://github.com/openclaw/openclaw/issues/132303) | `tools.deny` 对 claude-cli 后端不生效（安全边界被绕过） | 开放，待安全审查 |
| [#145995](https://github.com/openclaw/openclaw/issues/145995) | 插件检查间歇性失败：SQLite 状态源未稳定 | 开放，标记 manual-only |

### 关键评估

- **升级链路是当前最大风险点**：从 2026.9.3→9.4→9.5 的升级失败报告呈现海量且多样化特征（死锁、超时、回滚失败、静默失败），说明 Doctor 与更新管线在真实环境中的容错能力严重不足。
- **长期 P0 未闭环**：SQLite WAL 膨胀（[#143524](https://github.com/openclaw/openclaw/issues/143524)）、内存泄漏（[#91588](https://github.com/openclaw/openclaw/issues/91588)）、zombie 进程（[#97616](https://github.com/openclaw/openclaw/issues/97616)）三个核心稳定性问题均持续多月且无 fix PR。
- **部分 P0 已被关闭但仍未修复**：多个 P0 显示"CLOSED"但标注 `no-new-fix-pr` 或 `needs-maintainer-review`，说明修复尚未落地，只是 Issue 被清理或标记为需要维护者进一步审查。

---

## 6. 功能请求与路线图信号

今日存在明确用户需求且有推进信号的功能请求：

| Issue/PR | 内容 | 信号 |
|---|---|---|
| [#45608](https://github.com/openclaw/openclaw/issues/45608) | 在 /new、/reset 和每日重置前执行静默 agentic memory flush（与 compaction 机制一致） | 获得 4 👍，已有评论讨论，处于 needs-maintainer-review 与 needs-product-decision 状态，被标记为 diamond lobster，说明维护者高度关注 |
| [#110950](https://github.com/openclaw/openclaw/issues/110950) | 统一所有自动化为 cron（heartbeat、watcher、scheduled 统一） | 已关闭但附有讨论链接，这是一项架构级提案，可能在未来版本中看到影子 |
| [#71058](https://github.com/openclaw/openclaw/issues/71058) | 支持单 Gateway 多 Azure/Teams bot | P2，已获 1 👍，多账户支持仍是企业用户诉求 |
| [#131457](https://github.com/openclaw/openclaw/issues/131457) | 飞书渠道增加 progress 流式模式（对齐 Slack/Discord/Telegram 能力） | P3，开放中，等待 product-decision |
| [#119992](https://github.com/openclaw/openclaw/issues/119992) | 为 message 工具增加每回合发送预算，防止同回合内重复答案风暴 | P1，开放中，存在 linked PR，说明有修复尝试 |
| [#154135](https://github.com/openclaw/openclaw/pull/154135) | **在 Settings 中配置搜索 provider 并验证**（XL 级新功能 PR） | 由 @steipete 提出，标记兼容性与安全边界风险，处于 needs proof 状态 |

**路线图判断：** 从 PR 活跃度看，**搜索功能配置化 UI** 是最接近落地的下一版本候选功能；**memory flush 语义统一** 和 **cron 统一架构** 则属于中期演进方向。

---

## 7. 用户反馈摘要

从今日 Issue 与评论中提炼的用户声音：

**「升级恐惧」是当前社区情绪的主基调：**
- > "I genuinely regret upgrading to OpenClaw 2026.9.5. Before this update, my environment was stable." — [@abuegab1-spec in #153257](https://github.com/openclaw/openclaw/issues/153257)
- > "The update is silent and unactionable — it shows 'repairing' then exits; npm still reports 2026.9.4." — [@davidchyi-beep in #152759](https://github.com/openclaw/openclaw/issues/152759)
- 官方自动生成的升级失败报告（如 [#153049](https://github.com/openclaw/openclaw/issues/153049)、[#153654](https://github.com/openclaw/openclaw/issues/153654)）表明 Doctor 虽能采集诊断信息，但**无法自主恢复**，用户被留在"半升级"状态。

**对长期未修复问题的挫败感：**
- [#97616](https://github.com/openclaw/openclaw/issues/97616)（zombie 进程）持续近 3 个月、31 条评论仍无 fix PR，用户表达了对项目修复节奏的担忧。
- [#91588](https://github.com/openclaw/openclaw/issues/91588)（内存泄漏）持续 3+ 个月，用户通过手动 `wal_checkpoint(TRUNCATE)` 自救，但问题依旧复发。

**对严重 bug 的幽默与讽刺（中文社区）：**
- [#51429](https://github.com/openclaw/openclaw/issues/51429)："看起来有人把工作路径 hardcode 进代码里而且居然被合并发布了" —— 某位开发者将个人路径 `/Users/wangtao` 硬编码并合入发布版，至今未修复，用户以讽刺方式表达了对代码审查流程的质疑。

**值得肯定的一面：**
- 自动生成的升级失败报告（Doctor 报告）帮助用户提供精确诊断信息，提升了 Issue 的可复现性，这是项目工程化水平的体现。
- 部分 Issue 在一天内被迅速关闭（如 [#153882](https://github.com/openclaw/openclaw/issues/153882)），说明维护者对严重的升级阻断问题保持敏感。

---

## 8. 待处理积压

以下为长期未响应或需要维护者特别关注的 Issue/PR：

### 长期开放且无 fix PR 的高优 Issue

| Issue | 创建时间 | 持续时间 | 备注 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏导致 OOM | 2026-06-09 | **3.5 个月** | P1，needs-maintainer-review，29 条评论 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) zombie 进程累积 | 2026-06-29 | **近 3 个月** | P1，31 条评论，无 fix PR |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) google-vertex 无法处理 undefined/null | 2026-03-06 | **6.5 个月** | P0，3 👍，标记 stale |
| [#51429](https://github.com/openclaw/openclaw/issues/51429) 硬编码路径合并进发布版 | 2026-03-21 | **6 个月** | P2

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：** 2026-09-21
**分析范围：** OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、Moltis、CoPaw（QwenPaw）、EasyClaw


## 1. 生态全景

生态整体处于**"规模扩张后遗症"与"架构收敛"并存的阵痛期**——核心参照项目 OpenClaw 日处理 500 条 Issue 与 500 条 PR，但焦点高度集中于升级故障与长期 P0 bug，社区情绪从兴奋转向"升级恐惧"；与此同时，垂直化项目正加速分化：LobsterAI 以 24 小时 4 个版本的节奏在 OpenClaw 兼容层之上叠加商业化与浏览器能力，CoPaw（QwenPaw）通过 beta 版本快速迭代插件与多租户方向，而 Zeroclaw、NanoClaw 则不约而同地进行大规模架构提案验收与历史 PR 清理。跨项目共通的技术诉求高度一致——**升级可靠性与可回滚性、上下文/内存的长期稳定性、IM 通道深度集成、OpenAI 协议兼容性与 MCP 生态互操作**正在成为决定项目能否从"可用"走向"可信"的分水岭。


## 2. 各项目活跃度对比

| 项目 | Issues（更新/新开） | PRs（更新/合并关闭） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（287 活跃 / 213 关闭） | 500（300 待合并 / 200 合并关闭） | 无 | ⚠️ **修复高压期**：升级故障集中爆发，5 个长期 P0 未闭环，"止血"优先于扩张 |
| **NanoBot** | 4（3 活跃 / 1 关闭） | 55（36 合并 / 19 待合并） | 无 | ✅ **健康迭代**：Bug 报告与修复 PR 同日关联，维护者响应迅速，功能与加固并行 |
| **Zeroclaw** | 50（17 活跃 / 33 关闭） | 50（6 合关 / 44 待合并） | 无 | 🔶 **架构收敛期**：33 条 RFC 批量验收落地，但 44 条 PR 积压暴露审阅带宽瓶颈 |
| **PicoClaw** | 6（4 活跃 / 2 关闭） | 5（2 关闭 / 3 待合并） | 无 | 🔶 **低活跃有隐忧**：钉钉崩溃"修复不完整"（#973 关闭但 #3382 复现），多个 PR stale 超 3 周 |
| **NanoClaw** | 1（新增 1） | 40（38 合并关闭 / 2 待合并） | 无 | ✅ **集中清债**：38 条 PR 单日合并且无新增严重 bug，WhatsApp/OpenCode 双线推进 |
| **IronClaw** | 0（完全冻结） | 8（3 关闭 / 5 待合并） | 1.4.1-rc.1 候选 | ✅ **发布前窄幅收敛**：依赖批量升级、0 新 bug 报告，为 1.4.1 正式版铺路 |
| **LobsterAI** | 3（更新） | 13（5 合并 / 8 待合并） | **4 个版本** | ✅ **高频迭代**：1-2 天一次 release，OpenClaw 兼容 + 商业化 + 浏览器三线并进；但 2 个高严重度 Issue 滞留 176+ 天未回复 |
| **Moltis** | 0 | 1（1 待合并） | 无 | ✅ **平静维护**：唯一 PR 修复工具选择语义边界，积压健康 |
| **CoPaw（QwenPaw）** | 25（18 活跃 / 7 关闭） | 36（13 合并 / 23 待合并） | v2.2.2-beta.3 | ✅ **活跃迭代**：对社区反馈响应快（3 个高严重 bug 当日有 PR），但 3 个严重问题（数据丢失/注入/上下文溢出）无解 |
| **EasyClaw** | 0 | 0 | v1.9.19 | ✅ **低频有序**：无积压无 bug，但社区反馈滞后，外部贡献未激活 |


## 3. OpenClaw 在生态中的定位

**核心参照与"承重墙"角色**：OpenClaw 以 500/500 的日更新量级稳居生态绝对核心，其 GitHub 活跃度是第二名 CoPaw 的 14 倍（Issue）/ 14 倍（PR），社区规模无可争议地第一。但它同时扮演着"生态地基"的角色——LobsterAI 的版本发布节奏中明确跟踪 OpenClaw 版本兼容性（v2026.8.1 升级、共享状态 schema 迁移），NanoClaw 与 Zeroclaw 的频道适配与 RFC 讨论也以其 Gateway 架构为参照。

**技术路线的优势与代价**：
- **优势**：插件系统 + Gateway 架构生态最完整，`@steipete` 单人单日 10+ PR 的维护者投入力度在生态中绝无仅有；Doctor 自动诊断报告提升了 Issue 可复现性，工程化水平领先。
- **代价**：架构复杂度同样居首——2026.9.5 升级引发死锁、静默失败、回滚异常等多形态故障，升级链路容错能力严重不足。社区定位正在从"功能引领者"暂时滑向"稳定性追赶者"，信任度因连续升级事故而承压。

**与同类差异化**：当 NanoBot/CoPaw 可以做到"当日报告 Bug 当日修复"时，OpenClaw 的五个长期 P0（SQLite WAL 膨胀、内存泄漏、zombie 进程等）持续 3+ 个月无 fix PR，体量带来的修复惯性已成为其最大挑战。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **升级/更新的可靠性与可回滚性** | OpenClaw、NanoBot、Zeroclaw | OpenClaw 升级死锁/静默失败/回滚异常；NanoBot 自更新 PR 出现冲突；Zeroclaw 多条 RFC 涉及迁移与状态持久化。**升级安全已成为社区第一焦虑点** |
| **上下文窗口与内存管理** | OpenClaw、NanoBot、CoPaw、PicoClaw | OpenClaw SQLite WAL 膨胀至 GB 级 + Gateway 内存泄漏 350MB→15.5GB；NanoBot 本地 token 估算低估 30–50% 导致压缩永不触发；CoPaw ToolResultPruner 不裁剪 base64 导致上下文无界累积；PicoClaw Web UI 长对话输入卡顿。**长会话稳定性是跨项目共通的"硬骨头"** |
| **IM 通道的深度集成** | NanoClaw、PicoClaw、OpenClaw、LobsterAI | NanoClaw WhatsApp 群聊显示名称/@提及/回复路由修复；PicoClaw IRCv3 多行消息；OpenClaw 飞书 progress 流式；LobsterAI 定时任务微信目标大小写修复。**Agent 从"API 玩具"走向"日常 IM 协作者"的必经之路** |
| **OpenAI 协议兼容与聚合** | Zeroclaw、PicoClaw、NanoBot、CoPaw | Zeroclaw Chat Completions profile（连接 Open WebUI/LobeChat 生态）；PicoClaw OpenAI 兼容自定义提供商；NanoBot 统一 SSE/SDK 消费者行为；CoPaw OpenCode 免费模型 403。**以 OpenAI 协议为"通用语"融入更大生态已成共识** |
| **MCP 生态互操作性** | LobsterAI、CoPaw、OpenClaw | LobsterAI MCP Bridge 环境变量丢失（401）；CoPaw MCP OAuth 静态 Bearer 握手失败；OpenClaw MCP server init 超时崩溃。**MCP 是工具生态的"高速公路"，但入口体验仍粗糙** |
| **安全边界与治理** | Zeroclaw、OpenClaw、CoPaw | Zeroclaw git 工具绕过 allowed roots + shell 命令分级确认 RFC；OpenClaw `tools.deny` 对 claude-cli 不生效；CoPaw 持久化提示注入攻击。**Agent 权限治理从"功能选项"升级为"安全底线"** |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用 Agent 框架 + Gateway + 插件生态 | 开发者/团队，追求高度可扩展 | Node.js 单体 + 插件系统 + 多通道 Gateway；生态最丰富但复杂度最高 |
| **LobsterAI** | **桌面应用化**：Agent + 浏览器 + 商业化闭环 | 普通消费者/桌面端用户 | Electron 类桌面壳 + OpenClaw 集成 + 订阅/试用系统 + 应用内浏览器（WebAuthn） |
| **CoPaw（QwenPaw）** | Qwen 生态 + 插件系统 + 多租户 Hub | Qwen 模型用户、团队协作 | 插件 API（qwenpaw-pet）+ 桌面端 + E2E 强测试门禁；多租户 Hub 讨论量最高（31 评论） |
| **NanoBot** | 轻量快速接入 + CLI 自更新 | 个人开发者/CLI 爱好者 | 多 Provider 聚合（OpenAI-compatible）+ WebUI + 内存级上下文压缩 |
| **NanoClaw** | **IM 原生适配**：WhatsApp/OpenCode Provider | IM 重度用户/群聊场景 | 原生通道适配器优先，38 条 PR 集中打磨 WhatsApp 与 OpenCode Provider |
| **Zeroclaw** | 多渠道 Agent 框架 + RFC 驱动架构演进 | 中大型部署 | 设计先行的 RFC 治理（33 条批量验收）；强调安全建模（沙箱、命令分级） |
| **IronClaw** | **Rust 高性能 + 办公扩展**（Gmail/Calendar） | 企业/运维，重视性能与稳定 | Rust 实现 + 依赖机器人高频清理；当前处于发布前窄幅收敛 |
| **PicoClaw** | 轻量嵌入式，IRC/钉钉/飞书 | 极简部署/特定 IM 社区 | 轻量级实现，但修复不完整问题（#973/#3382）提示测试覆盖有待加强 |
| **Moltis** | 工具编排语义的精细化 | 开发者（API 调用方） | 专注工具选择逻辑与配置语义（空数组 vs 不覆盖），

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-21

## 今日速览

过去 24 小时 NanoBot 项目保持高度活跃：共 55 条 Pull Request 更新，其中 36 条已合并/关闭，另有 19 条待合并，合并节奏明显加快；Issues 侧更新 4 条（3 活跃 / 1 关闭）。社区同时提交了 WebUI 体验优化、新 Provider 接入、核心上下文压缩修复等多条 PR，且 Bug 报告与修复 PR 出现同日关联（#5833 → #5834），维护者响应迅速。无新版本发布，整体项目健康度良好，处于功能迭代与稳定性加固并行阶段。

## 版本发布

过去 24 小时内无新版本发布。最新 Release 信息暂缺，建议关注 `main` 分支近期频繁合并的 UI/Provider 相关改动，预计下一版本将集中包含 WebUI 交互优化与多项 Provider 修复。

## 项目进展

过去 24 小时共合并/关闭 36 条 PR（以下为展示列表中可见的 Closed PR，完整清单请查看仓库 PR 页面）。主要进展集中在 **WebUI 交互优化、Provider 生态扩展、Agent 架构重构** 三个方向：

- **WebUI：Baizhi Agent Toolkit MCP 预设**（#5830，已合并）：新增可选的 Baizhi Cloud Agent Toolkit MCP 预设，用户可通过 WebUI Apps 直接绑定自有账户，无需手工拼接 MCP 配置。该预设仅暴露 `websearch_search`、`web_scrape`、`web_extract` 三个工具，降低接入门槛。
- **WebUI：OAuth 重新认证体验修复**（#5836，已合并）：区分「OAuth 凭据被拒绝」与「临时目录故障」两种失败场景，在确认授权失败时隐藏模型搜索和选择入口，并提供 **“Sign in again”** 按钮；网络/限流故障时保留缓存选项，修复了此前认证失败后无法操作的问题。
- **WebUI：移除 legacy 消息投影逻辑**（#5823，已合并）：作为 #5819 的后续重构，删除了运行时旧版消息投影路径，`/webui-thread` 现在无条件返回 canonical `events` 并拒绝旧格式消息。这标志着 WebUI 事件协议迁移完成，降低后续维护成本。
- **新 Provider：Unifically**（#5832，已合并）：基于现有 OpenAI-compatible 路径新增内置 provider，注册 `UNIFICALLY_API_KEY` 与 `https://api.unifically.com/v1` 端点，同时补充了配置文档与测试。
- **Agent 测试契约修复**（#5835，已合并）：修复 CI 中因 `consolidate_history` 回调缺失导致的测试失败，确保了上下文压缩成为强制要求后的测试契约一致。

此外，`#5825`（可复用 JEV 客户端）、`#5811`（子代理改由私有 session 执行）等重构型 PR 处于待合并状态，信号表明项目正在为 Agent 执行路径的统一与安全加固打基础。

## 社区热点

- **[#5833] SSE Responses consumer 丢失 `response.reasoning_text.*` 事件（新 Issue）** [链接](https://github.com/HKUDS/nanobot/issues/5833)  
  社区成员 `@remote-controlled-man` 在对比 `openai_responses/parsing.py` 中两个流消费者时，发现 raw-SSE 消费者静默丢弃 `response.reasoning_text.*` 事件，而 SDK 消费者能正确处理。该 Issue 发布当天即被认领并开出修复 PR **#5834**，体现了项目对 Provider 层一致性问题的敏感性。背后诉求是保证 xAI Grok、OpenAI Codex 等 raw-SSE 路径的推理文本展示能力与 SDK 路径对齐。

- **[#5524] WebUI 会话结束通知铃声（good first issue）** [链接](https://github.com/HKUDS/nanobot/issues/5524)  
  这个「好入门」Issue 已存在近一个月，但仍在 9/20 被更新。用户期望在长任务（工具调用、文件编辑）完成时通过声音提示，避免紧盯屏幕。此类「非阻塞但提升感知」的 UX 需求正在积累，适合新贡献者切入。

- **[#5817] 自更新功能 PR 出现冲突** [链接](https://github.com/HKUDS/nanobot/pull/5817)  
  `nanobot update` / `--dev` 自更新流程的 PR 被打上 `[conflict]` 标记，需要解决冲突后才能合并。自更新能力是 CLI 工具完善度的重要标志，社区关注度较高，建议维护者安排 review。

## Bug 与稳定性

按严重程度排列：

- **P1｜Memory：上下文压缩永不触发（#5402，对应 PR #5403）** [Issue](https://github.com/HKUDS/nanobot/issues/5402) | [PR](https://github.com/HKUDS/nanobot/pull/5403)  
  本地 tiktoken 估算比 API 实际 token 数低估 30–50%，导致对话超出上下文窗口后仍不触发压缩。修复 PR 改用 API 报告的 prompt tokens 作为触发依据，处于待合并且带 `[conflict]` 标记。这是当前最影响长对话稳定性的未解决问题。
- **P2｜SSE：raw-SSE 消费者丢失推理文本事件（#5833）** [链接](https://github.com/HKUDS/nanobot/issues/5833)  
  影响 xAI Grok / OpenAI Codex 的 `response.reasoning_text.delta/done` 事件透传。已有修复 PR **#5834**，正常推进中。
- **P2｜Discord：stop 时 reaction 状态未清理（#5807）** [链接](https://github.com/HKUDS/nanobot/pull/5807)  
  `_reset_runtime_state()` 遗漏了延迟的 working-emoji 任务和 pending-reaction 消息注册表，可能导致停止后残留 UI 状态。修复 PR 已包含回归测试。
- **P2｜WebUI：临时聊天在导航后丢失（#5837）** [链接](https://github.com/HKUDS/nanobot/pull/5837)  
  临时聊天在切换会话时可能丢失消息并回退到欢迎界面，尤其在回复进行中或 compact workbench 卸载面板时。修复方案将内存消息缓存提升到 app-session 层。
- **P2｜Provider：NIM 风格超时错误无法触发 fallback（#5769）** [链接](https://github.com/HKUDS/nanobot/pull/5769)  
  NVIDIA NIM 将 `timed out after 300s` 包装为 `RuntimeError`，现有逻辑仅识别 `*Timeout*` 类名，导致超时不切换模型。修复 PR 按异常文本分类并允许 fallback 切换。
- **已关闭：#5808 WebUI follow-ups 在 gateway 重启后被错误重放** [链接](https://github.com/HKUDS/nanobot/issues/5808)  
  停止活动 turn 会丢弃内存队列中的 follow-ups，但恢复日志仍保留这些消息，导致重启后重新入队。该 Issue 已关闭，修复路径大概率已并入近期重构。

## 功能请求与路线图信号

- **WebUI 通知铃声（#5524）** [链接](https://github.com/HKUDS/nanobot/issues/5524)：默认关闭 + Settings 开关，适合作为体验增强项。目前无对应 PR，可作 good first issue。
- **Session 搜索性能优化（#5509）** [链接](https://github.com/HKUDS/nanobot/issues/5509)：建议引入 SQLite FTS5 索引作为 JSONL 存储的异步镜像。属架构级优化，短期内可能不会优先实现，但值得排期。
- **自更新流程（#5817）** [链接](https://github.com/HKUDS/nanobot/pull/5817)：`nanobot update` + `--dev`

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时，ZeroClaw 项目出现显著的架构决策收敛信号：50 条 Issue 更新中 33 条被关闭，其中绝大多数是状态为 `status:accepted` 的 RFC，说明一批历经多月讨论的架构提案已于昨日完成批量验收并进入实施队列。与此同时，PR 积压压力持续加大——50 条 PR 更新中 44 条仍处于待合并状态，多条高风险、大尺寸（size:XL）的修复等待维护者审查。活跃度方面，新开/活跃 Issue 17 条，各通道（尤其 WhatsApp Web、Matrix）相关的功能与修复 PR 贡献较为集中。整体项目健康度良好，处于“讨论收敛、实施待启动”的过渡阶段；但维护者审阅带宽是当前瓶颈。

## 2. 版本发布

过去 24 小时无新版本发布。上次已知合并包括 PR #8966（2026-09-18 合入 master，涉及 provider 流恢复机制），目前 master 分支的发布节奏相对平稳。


## 3. 项目进展

**已合并/关闭的 PR（6 条）**：其中值得关注的是 `fix(browser): make full browser automation opt-in, separate from browser_open`（[#9830](https://github.com/zeroclaw-labs/zeroclaw/pull/9830)），将完整的 Chrome 自动化能力从默认开启改为 opt-in，修补了 headless 常驻 daemon 上因自动注册而带来的安全暴露面。

**33 条 Issue 关闭**：这批关闭的 RFC 覆盖了 2026 年 4 月至 8 月间提出的核心设计提案，涉及内存架构、安全策略、通道协议、运行时行为等。代表性条目包括：

- [RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)（26 评论，存储与生命周期策略解耦）
- [RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)（25 评论，兼容 OpenAI 协议）
- [RFC: Add a per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)（24 评论，shell 命令分级确认）
- [RFC: Goal mode v1](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)（23 评论，有界多轮目标执行）

这些 RFC 的关闭意味着项目已完成第一轮架构收敛，下一步将是按 RFC 拆分实施工单并落地代码改动。结合当前 44 条待合并 PR 中有多条直接引用上述 RFC（如 #7821 sandbox_policy），未来 1-2 个月预计会进入密集的实现和审查高峰期。


## 4. 社区热点

以下 Issue 在过去 24 小时获得最多评论（均已在 9/20 关闭）：

- **[RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)** (26 评论) — 社区对内存架构一致性的诉求强烈，讨论焦点是 Memory trait 不应既负责存储又负责治理策略。用户希望网关和通道无需重新实现生命周期逻辑。

- **[RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)** (25 评论) — 这是生态互操作性的强信号。多个客户端（Open WebUI、LobeChat、Aider、LangChain）都在讲 OpenAI 协议，社区希望 ZeroClaw 能直接接入这一生态，而不是只提供 WebSocket 和 ACP。

- **[RFC: Per-execution confirmation tier for high-risk shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)** (24 评论) — 安全与易用性平衡是另一热点。社区参考 Claude Code 的 allow/ask/deny 模式，希望为高风险命令提供可配置的确认档位。

- **[RFC: Realtime speech-to-speech channel for Gemini Live](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)** (22 评论) — 用户对实时语音交互的兴趣浓厚，提案已重构为 broker contract 形态，作为可选 feature-gated 通道。

热点背后的共同诉求是：**ZeroClaw 正从“能跑很多渠道的 agent 框架”向“平台级架构 + 良好生态兼容 + 可治理的安全模型”演进**，社区对这三条的讨论热度最高。


## 5. Bug 与稳定性

按严重程度排列（均已存在对应 fix PR）：

| # | 严重度 | 问题描述 | 对应 PR | 状态 |
|---|--------|----------|---------|------|
| 1 | 🔴 高（安全） | git 工具绕过 allowed roots 限制，`git_operations` 可在授权目录外操作 | [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) | OPEN 待审查 |
| 2 | 🔴 高（安全） | Bluesky 和 Reddit 通道未校验发送者授权，任意发送者可向通道投递消息 | [#9428](https://github.com/zeroclaw-labs/zeroclaw/pull/9428) | OPEN 待审查 |
| 3 | 🔴 高（数据丢失） | ACP 交互中断后回合进度丢失，已接受提示词和工具结果无法恢复 | [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) | OPEN 待审查 |
| 4 | 🔴 高（运行时） | 带有图片的请求被 provider 拒绝（HTTP 400）后无法自动恢复 | [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) | OPEN 待审查 |
| 5 | 🟠 中（工具正确性） | 非图像 data-URI 标记在工具结果中被错误处理，导致内容异常 | [#10860](https://github.com/zeroclaw-labs/zeroclaw/pull/10860) | OPEN 待审查 |
| 6 | 🟠 中（通道体验） | WhatsApp

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 2026-09-21

## 今日速览

过去 24 小时项目活跃度中等：6 条 Issue 更新（4 条活跃、2 条关闭）、5 条 PR 更新（3 条待合并、2 条关闭），无新版本发布。社区讨论集中在 Web UI 长对话性能问题与 IRC 长消息支持两项长期诉求（各 13 条评论）。值得警惕的是 #973 钉钉崩溃问题虽标记关闭，但新 Issue #3382 报告在 v0.3.1 上仍可稳定复现，提示该问题修复可能不完整。同时，v0.11.0 冲刺规划文档已合入主仓库，显示项目在架构演进层面仍在持续推进。

## 项目进展

今日无代码 PR 被合并，但有 2 个 PR 关闭：

- **[docs: add Pilot MCP setup example](https://github.com/sipeed/picoclaw/pull/3367)**（已关闭）：补充 Pilot Protocol 的 MCP CLI 快速开始指引，新增健康检查命令说明，并澄清配置过程保留已有配置且无需 API key。属于生态接入文档完善。
- **[docs: v0.11.0 sprint plan — agentic web3, module trust, ACP/mesh depth](https://github.com/sipeed/picoclaw/pull/3383)**（已关闭）：合入 v0.11.0 冲刺设计文档（Tracks 67–75），包含排序 DAG、决策记录、各轨道文件映射、实现验证清单与风险登记册，并同步更新 .todo.md 增加 v0.11.0 检查清单。虽非代码变更，但明确了下一版本的开发蓝图与验收标准。

此外有 3 个功能 PR 仍在开放等待合并（见「待处理积压」），代码层面的功能推进暂未落地。

## 社区热点

- **[#3281 Web UI 长对话输入卡顿](https://github.com/sipeed/picoclaw/issues/3281)**（13 评论，👍 2）：用户报告同一会话内聊天历史稍长时，输入框出现明显延迟。该 Issue 已存在两个月并被打上 stale 标记，但评论热度不减，反映 Web UI 长会话性能是真实的日常痛点，影响面较广。
- **[#3287 IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)**（13 评论）：IRC 协议默认 512 字节限制导致长消息被客户端拆分，PicoClaw 无法识别为同一条完整消息。社区对此需求讨论积极，且已有对应实现 PR（#3354），属呼声与技术方案均成熟的议题。
- **[#3369 OpenCode Go 会话头支持](https://github.com/sipeed/picoclaw/issues/3369)**（👍 2）：用户提出 OpenCode Go 请求需要 `x-opencode-session` 头关联活动会话，PicoClaw 虽已跟踪 session ID 但 OpenAI 兼容提供商无法映射该值。该 Issue 已关闭，推测已通过其他途径解决或纳入路线图。

## Bug 与稳定性

按严重程度排列：

1. **[#3382 钉钉网关 Stream SDK 重连时 panic（send on closed channel）](https://github.com/sipeed/picoclaw/issues/3382)**（严重，新建无评论）：用户明确报告在 picoclaw v0.3.1（commit 2cf030d2）+ dingtalk-stream-sdk-go v0.9.1 上，#973 所述崩溃仍可复现。**关键风险**：#973 已经标记关闭，但该问题并未真正解决，可能属于修复不完整或回归。建议维护者优先复开 #973 或重新评估 fix 方案。
2. **[#3281 Web UI 长对话输入卡顿](https://github.com/sipeed/picoclaw/issues/3281)**（中等）：性能缺陷，非崩溃级别，但直接影响日常使用体验，两个月未得到有效处理，社区耐心可能持续消耗。
3. **[#973 QQ/钉钉长跑后崩溃（已关闭）](https://github.com/sipeed/picoclaw/issues/973)**：虽关闭，但被 #3382 明确指出仍可复现，需维护者核实关闭原因（可能误关或修复未覆盖钉钉通道）。

## 功能请求与路线图信号

- **OpenAI 兼容自定义提供商**（[#3366](https://github.com/sipeed/picoclaw/issues/3366)）：用户希望添加 "OpenAI Compatible" 自定义提供商以接入自托管路由器。虽然已 stale，但属生态扩展类需求，与 #3369 的诉求同源（都涉及 OpenAI 兼容层的能力增强），若 v0.11.0 工作计划包含 ACP/mesh 深度方向，此需求有较大概率被纳入。
- **IRCv3 多行消息集成**（[#3287](https://github.com/sipeed/picoclaw/issues/3287)）：已有对应 PR（#3354）实现 `draft/multiline` 接收支持，且 PR 状态为开放、stale。该功能若合入将直接解决用户痛点，建议维护者在本轮 sprint 中优先review。
- **OpenCode Go 会话头映射**（[#3369](https://github.com/sipeed/picoclaw/issues/3369)，已关闭）：说明用户对该需求有实际场景，关闭原因值得关注——若为已实现，应在 release notes 中说明；若为推迟，则应在路线图中跟踪。

## 用户反馈摘要

- **Web UI 长会话性能**（#3281）：用户明确描述了操作路径（单会话多轮历史 → 输入框迟滞），这是可复现的体验问题。结合 13 条评论的讨论度，可以推断不少用户遇到了相同情况。
- **钉钉通道稳定性**（#3382/#973）：用户提供了详细的复现时间、版本与崩溃位置（client.go:161），显示通道稳定性问题已影响真实部署。一个值得注意的细节是用户提到“Feishu u...”——可能飞书通道也有类似迹象，但内容截断无法确认。
- **IRC 长消息语义**（#3287）：用户指出 IRC 自动拆分导致 PicoClaw 把一条消息误认为多条，属于协议语义处理的准确性诉求，而非单纯功能新增。
- **OAuth 作用域配置**（PR #3378）：修复 `RefreshAccessToken` 硬编码 `"openid profile email"` 覆盖自定义 Scopes 的问题。这暴露了现有用户在配置非默认 OAuth 提供商时的配置失效痛点。

## 待处理积压

以下 Issue/PR 长期未获得维护者响应或未推进，已全部带有 `[stale]` 标记，建议维护者分类处理：

| 项目 | 创建时间 | 状态 | 备注 |
|------|---------|------|------|
| [#3281 Web UI 输入卡顿](https://github.com/sipeed/picoclaw/issues/3281) | 2026-07-21 | OPEN | 性能 bug，2 个月未解决，13 评论 |
| [#3287 IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287) | 2026-07-22 | OPEN | 功能需求，已有对应 PR，13 评论 |
| [#3366 OpenAI 兼容提供商](https://github.com/sipeed/picoclaw/issues/3366) | 2026-09-04 | OPEN | 功能需求，与 v0.11.0 方向可能相关 |
| [#3378 OAuth Refresh 作用域修复](https://github.com/sipeed/picoclaw/pull/3378) | 2026-09-12 | OPEN | 明确 bug 修复，无评论，未合入 |
| [#3354 IRCv3 多行消息实现](https://github.com/sipeed/picoclaw/pull/3354) | 2026-08-31 | OPEN | 解决 #3287 的代码实现，stale 未合并 |
| [#3353 工具反馈动画边界修复](https://github.com/sipeed/picoclaw/pull/3353) | 2026-08-31 | OPEN | 防止消息持续被编辑的稳定性修复，stale 未合并 |

> 注：`[stale]` 标记意味着已超过维护者设定的响应窗口，但部分 issue（如 #3281、#3287）仍有稳定活跃的评论更新，说明用户关注度未减。特别是 #3354 与 #3353 两个代码 PR 已在队列中等待 3 周以上且无任何 review 记录，建议优先处理以避免社区贡献流失。

---

*本日报基于 PicoClaw GitHub 公共数据生成，数据采集时间 2026-09-21。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时内，NanoClaw 项目 PR 活动极其活跃，共更新 40 条 Pull Request，其中 38 条被合并或关闭、2 条仍待合并，表明维护者正在进行一次集中的历史 PR 清理与合并；Issues 侧仅新增 1 条 Bug 报告，用户反馈量保持平稳。合并的 PR 覆盖 WhatsApp 通道、OpenCode Provider、CLI 工具链、CI 流程及多个内置 Skill 的修复与增强，项目整体稳定性与生态完备度显著提升。无新版本发布，项目处于功能积累与质量加固阶段。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日共 38 条 PR 被合并或关闭，是近期 PR 合并量最大的一天。其中以 @glifocat 提交的修复类 PR 为主，覆盖范围广泛，核心进展包括：

- **WhatsApp 通道多问题修复**：#2565 修复了群 @-提及无法通过 `contextInfo.mentionedJid` 识别的问题；#746 修复了认证失败时服务反复重启的问题；#2328 将回复默认目的地改为消息来源，改善多目标群组中的对话路由。[PR #2565](https://github.com/nanocoai/nanoclaw/pull/2565) | [PR #746](https://github.com/nanocoai/nanoclaw/pull/746) | [PR #2328](https://github.com/nanocoai/nanoclaw/pull/2328)
- **OpenCode Provider 多项增强**：#2152 修复了服务端进程组未杀干净的问题并支持可配置的 `IDLE_TIMEOUT_MS`；#2153 改用原生 instructions 配置加载 CLAUDE.md 及 fragments，提升上下文注入的可靠性。[PR #2152](https://github.com/nanocoai/nanoclaw/pull/2152) | [PR #2153](https://github.com/nanocoai/nanoclaw/pull/2153)
- **CLI 与迁移工具完善**：#2416 修复 `ncl groups create` 和 `ncl wirings create` 未创建 companion 行的问题；#2287 修正迁移脚本探测 OneCLI 健康端点的逻辑。[PR #2416](https://github.com/nanocoai/nanoclaw/pull/2416) | [PR #2287](https://github.com/nanocoai/nanoclaw/pull/2287)
- **内部工具链修复**：#2309 用 in-tree better-sqlite3 wrapper 取代外部 sqlite3 CLI 依赖；#2265 修复 Chat SDK bridge 中 `send_card` 静默失效的问题；#2402 修复仓库重命名后 CI workflows 误判仓库身份而 no-op 的问题。[PR #2309](https://github.com/nanocoai/nanoclaw/pull/2309) | [PR #2265](https://github.com/nanocoai/nanoclaw/pull/2265) | [PR #2402](https://github.com/nanocoai/nanoclaw/pull/2402)

这批合并涵盖了从核心通道适配到开发者工具链的多个层次，项目在消息通道兼容性、Agent 运行稳定性、CLI 易用性三方面均获得实质推进。

## 4. 社区热点

今日社区热度集中在两条条目上：

- **#3858（Issue）**：WhatsApp 群聊中 Agent 无法看到发送者显示名称，只有 JID。该问题直接暴露了原生适配器在 IM 场景下的信息缺失，影响多参与者对话中 Agent 的上下文理解能力，极易引发社区共鸣。当前尚无评论和回复，值得维护者优先关注。[Issue #3858](https://github.com/nanocoai/nanoclaw/issues/3858)
- **#3463（PR，Open）**：OpenCode Provider 增加 `message.part.delta` 文本回退逻辑，修复因时序竞争导致最终快照缺失时助手文本丢失的问题。该 PR 针对 issue #2985 中实测约 78ms 的竞态窗口，技术分析扎实，属于社区贡献的典型高质量修复，目前仍待合并。[PR #3463](https://github.com/nanocoai/nanoclaw/pull/3463)

此外，38 条 PR 的集中合并本身就构成一种社区热点信号——大量由同一贡献者提交、跨越数月的老 PR 在今日被集中处理，说明维护者正在进行一次系统性的技术债清理。

## 5. Bug 与稳定性

| 严重程度 | 问题描述 | 状态 |
|---------|---------|------|
| 高 | **#3858 Agent 无法区分 WhatsApp 群聊参与者**：所有消息只显示 JID，不显示显示名称，Agent 无法按名称区分对话成员，直接影响群聊场景可用性。 | 无 fix PR，待三分类 |
| 中 | **OpenCode Provider 时序竞争导致文本缺失**（#2985）：snapshot 未在 `session.idle` 前落地时，助手消息丢失，窗口约 78ms。 | 已有 fix PR #3463，待合并 |
| 低 | **WhatsApp 服务重启抖动**（#746 对应问题 #748）：认证失败或失效后反复重启，浪费资源且可能触发速率限制。 | 已修复并合并 |

整体来看，今日无新增崩溃级或安全级 Bug，大多数历史稳定性问题已在本次合并中被覆盖。

## 6. 功能请求与路线图信号

从今日合并的 PR 中可以识别出以下路线图信号：

- **IM 通道体验深化**：对 WhatsApp 的 @-提及、回复路由、显示名称等多轮修复表明官方在认真打磨 IM 通道的对话体验，下一版本有望看到更完整的 WhatsApp 群聊支持。
- **OpenCode Provider 成为重点维护对象**：连续多条 PR（#2152、#2153、#3346、#3463）都围绕 OpenCode 的会话恢复、超时处理、上下文加载，说明这是当前 Agent 运行时的核心组件，正在向生产级稳定性迭代。
- **CLI 工具链补全**：`ncl groups create` / `wirings create` 的 companion 行修复、`~/.local/bin/ncl` symlink 安装等，预示着 CLI 正在成为官方推荐的日常管理入口。
- **Skill 生态持续扩展**：#706 新增 icloud-tools skill（CalDAV/CardDAV/IMAP/SMTP），将 NanoClaw 的接入能力延伸到个人云服务领域。

综合来看，下一版本可能聚焦于 IM 群聊体验优化、OpenCode Provider 稳定性提升以及 CLI 工具链的正式化。

## 7. 用户反馈摘要

来自 issue #3858 的真实用户场景：

> 在 WhatsApp 群组中，Agent 无法通过名称区分参与者。每条入站消息到达模型时，发送者显示的只是手机 JID，没有显示名称。

这是典型的真实部署痛点——当 AI Agent 被加入真实群聊时，缺乏显示名称意味着它无法理解“谁在说话”，极大限制了其在群组协作（如团队群、客服群）中的实用性。该反馈虽简短但直指 IM 通道适配的核心短板，反映了用户对 Agent 深度融入日常 IM 工作流的期待。

由于今日其余 ISSUE/PR 评论数均较低（数据未显示高讨论量），暂未捕获到更多丰富用户反馈。

## 8. 待处理积压

- **#3463（Open，待合并）**：opencode provider 的文本回退修复，已存在近一个月，等待维护者 review 合并。该修复对解决已知时序竞态问题直接有效，建议尽快处理。[PR #3463](https://github.com/nanocoai/nanoclaw/pull/3463)
- **历史 Blocked PR 状态需确认**：今日多条曾处于 "Blocked" 或 "Needs Review" 状态的 PR（如 #746、#701、#700、#706、#2290、#2288、#2287）被关闭，但其中 #706（icloud-tools skill）和 #701（日期时间上下文注入）从摘要看仍有价值，建议维护者确认关闭原因是否为“以其他方式实现”或“主动放弃”，避免有价值的工作被误关。
- **#3858（新 Bug）**：尚无任何回应，作为当前唯一 Open Issue，应纳入下一个 triage 周期。若确认是原生适配器的共性缺失，可能需要在多条通道上同时修复。[Issue #3858](https://github.com/nanocoai/nanoclaw/issues/3858)

---

**日报总结**：NanoClaw 项目今日处于“大扫除+质量加固”状态，38 条 PR 的批量合并显著降低了积压技术债，WhatsApp 适配与 OpenCode Provider 是当前最活跃的改进方向。项目健康度良好，需关注的是新报告的高影响 Bug #3858 和仍悬而未决的 PR #3463。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-21

## 今日速览

过去24小时内，IronClaw 项目在 Issue 层面完全冻结（0 条新增/活跃/关闭），开发重心集中在 Pull Request 通道，共 8 条 PR 有新动态，其中 3 条已关闭（含 1 条功能修复） 。依赖机器人（Dependabot）批量提交了 4 个更新组（Rust 依赖×2、GitHub Actions×1、Wasm 依赖×1），长期积压的依赖升级在此前一周内密集合入。项目开启 1.4.1-rc.1 版本候选流程，但尚无正式 Release 产出。整体活跃度中等偏低，以维护性工作为主，功能性开发暂缓。

## 项目进展

今日关闭的 3 条 PR 中，2 条为依赖更新合入，1 条为重要的功能修复。

- **#8102 修复 Gmail/Google Calendar 扩展激活失败问题（已关闭）** — 这是一个值得关注的功能修复。PR 解决了当运维人员通过 **Web UI**（而非环境变量）配置 Google OAuth Client 时，Gmail/Google Calendar 扩展无法激活的问题。此前 OAuth 流程（用户授权→回调→令牌交换）可正常完成，但随后激活步骤报错 **`Provider...`**（摘要截断，推测为 provider 实例状态校验失败）。修复方式为：在扩展激活时 **实时解析 provider 实例的就绪状态**，并优先读取管理员配置。该修复意味着 Web UI 配置路径与 env var 配置路径在实际运行行为上终于对齐，消除了一个部署场景下的严重配置障碍。PR 于 9 月 18 日创建，21 日关闭，处理效率较高。
  https://github.com/nearai/ironclaw/pull/8102

- **#8099 / #8079 依赖批量升级（已关闭）** — Rust 依赖组 25 项更新与 GitHub Actions 组 6 项更新均已合入。其中值得注意的升级包括：`uuid` 从 1.24.0 升至 1.26.1、`base64` 从 0.22.1 升至 0.23.1、`actions/setup-node` 从 4.x 直升 7.0.0（跨越两个大版本）、`anthropics/claude-code-action` 同步升级。这些合入为项目清除了大量旧版本依赖项的维护债。
  https://github.com/nearai/ironclaw/pull/8099
  https://github.com/nearai/ironclaw/pull/8079

- **#8105 发布 1.4.1-rc.1 版本候选（待合并）** — 版本管理 PR，将 `ironclaw` 包版本锁定为 `1.4.1-rc.1`，以便 CI 工作流在合并提交上打上 `ironclaw-v1.4.1-rc.1` 标签。由于 `cut_ironclaw_release.py` 脚本会拒绝清单版本与请求版本不一致的标签，因此该版本号提升必须在打标签前合入。
  https://github.com/nearai/ironclaw/pull/8105

**整体评估**：项目在过去 24 小时内的实质代码变更不大，但连续多日的依赖更新合入说明项目正在为 1.4.1 版本发布做准备，处于"发布前清理"阶段。

## 社区热点

所有 8 条 PR 均无评论（评论数为 `undefined`），Issue 也为 0 条，因此没有真正意义上的社区讨论热点。若按关注度排序：

1. **#8105 版本候选 PR**（创建当日即更新）— 直接关系下一步发布流程，虽无评论但因涉及版本号锁定，是发布管线中的关键节点。
   https://github.com/nearai/ironclaw/pull/8105

2. **#8104 Dependabot 大规模 Rust 依赖升级（29 项）** — 一次性跨目录升级 29 个 Rust 包，属于"everything-else 组"的聚合升级。这类 PR 虽无人工讨论，但通常需要维护者重点审查（如 `base64` 0.23 版本可能包含 API 变更）。
   https://github.com/nearai/ironclaw/pull/8104

3. **#8103 GitHub Actions 升级（8 项）** — 包含 `actions/setup-node` 从 4.x 直接跳升至 7.0.0 的大版本跨越，以及 `claude-code-action` 的 45 个补丁版本升级，对 CI 稳定性有直接影响。
   https://github.com/nearai/ironclaw/pull/8103

**诉求分析**：当前 PR 主要以自动化和发布流程为主。这些 PR 的密集出现（叠加此前一周的 #8099、#8079 合入）表明项目正在**集中清理技术债务**，为后续功能开发或正式版发布腾出稳定的依赖基线。

## Bug 与稳定性

今日没有新增 Issue 形式的 Bug 报告。已关闭的 PR #8102 实质上解决了一个**严重级别较高的功能性 Bug**：

- **问题**：通过 Web UI 配置 Google OAuth Client 的部署中，Gmail/Google Calendar 扩展无法激活。OAuth 流程本身完成成功但激活失败（报 `Provider...` 错误，具体消息被摘要截断）。
- **严重程度**：高 — 这是核心办公效率扩展（Gmail + Google Calendar）在特定但合理的配置路径（管理员使用 Web UI 而非环境变量）下的完全不可用问题。
- **修复状态**：已有 FIX PR #8102，今日已合并。
- **关联影响**：修复方式为"实时解析 provider 实例状态"而非简单读取静态标志，暗示此前 system 对 provider 状态管理存在缓存或时序缺陷。合入后 Web UI 配置路径与 env var 配置路径行为统一。
  https://github.com/nearai/ironclaw/pull/8102

## 功能请求与路线图信号

虽然今日没有新的用户功能请求，但有两个明确的路线图信号：

1. **1.4.1 版本路线图**：#8105 将包版本锁定为 1.4.1-rc.1，意味着 1.4.1 的正式版已进入发布倒计时。功能修复 PR #8102 将被包含在此版本中，从 RC 到正式版可能只需数日。
   https://github.com/nearai/ironclaw/pull/8105

2. **扩展配置管理方向的投入**：#8102 修复的是 Web UI 配置 OAuth 的路径，这表明项目在**管理界面与扩展系统的集成**上仍在打磨。考虑到该 PR 的修复需要对 provider 状态解析逻辑进行改动，后续可能还会有更多围绕扩展激活/状态管理的优化。

3. **依赖基线的现代化**：今日 4 条 Dependabot PR 累积升级了 35+ 个依赖项（`uuid`、`base64`、`setup-node` 跨大版本升级），说明项目正在紧跟上游。零 Issue 新增 + 大量依赖合并的组合，显示项目当前处于"**稳基座、待出击**"的阶段。

## 用户反馈摘要

由于今日没有任何 Issue 评论、PR 评论或新 Issue 创建，无法从社区互动中提取用户反馈。仅能参考 PR #8102 的问题描述中所体现的**部署用户痛点**：

- **痛点**：管理员通过 Web UI 配置 OAuth 后，Gmail/Google Calendar 扩展激活失败。这是实际使用场景中容易触发且影响业务连续性的问题 — 特别是已通过环境变量配置可正常工作的前提下，Web UI 配置路径的失败更容易让人困惑（用户会认为自己的配置操作有误）。
- **用户场景**：典型的多租户/团队部署 — 运维人员希望不依赖基础设施层（环境变量）即可完成 OAuth 配置，但此路径此前是不完整的。
- **潜在后续影响**：此修复或能吸引更多用户采用 Web UI 配置路径，从而改善项目对非容器化/非 Kubernetes 部署的友好度。

## 待处理积压

| 项目 | 创建时间 | 状态 | 说明 |
|------|----------|------|------|
| **#7834 Wasm 依赖升级（wasmtime 等 4 项）** | 2026-08-23 | OPEN | 已挂起近 1 个月，且带有 `size: L`、`risk: medium`、`contributor: experienced` 标签。Wasmtime 等核心依赖不升级会阻碍新的 WASI 特性支持。9 月 20 日有更新，说明仍在处理中。 |
| **#8078 Tokio 生态依赖升级（tower-http 等 2 项）** | 2026-09-06 | OPEN | 半个月未合入，本次更新（9/20）可能是补充变更。tower-http 0.7.1 为补丁版本，风险低，推测卡在 CI 或审阅环节。 |
| **#8103 Actions 组升级（8 项）** | 2026-09-20 | OPEN | 存在 `setup-node` 7.0.0 大版本跨越，虽待合并但需重点确认兼容性。 |
| **#8104 Rust 依赖组升级（29 项）** | 2026-09-20 | OPEN | 与已合入的 #8099 存在包范围重叠（同组不同集合），需关注是否产生重复或冲突。 |

**长期积压自 8 月以来的 Wasm 依赖升级（#7834）是当前最需要维护者关注的 PR**，近 1 个月的跨度已超出一般的依赖升级节奏，建议尽快推进合并或给出明确的时间预期。
https://github.com/nearai/ironclaw/pull/7834
https://github.com/nearai/ironclaw/pull/8078
https://github.com/nearai/ironclaw/pull/8103
https://github.com/nearai/ironclaw/pull/8104

---

**项目健康度评估**：项目当前处于 **1.4.1 发布前的窄幅收敛状态** — 无新 Bug 报告（说明社区使用平稳）、依赖清理活跃（维护意愿强）、功能开发暂停但已有重要修复合入。建议关注未来 48 小时内 #8105 的合并情况，一旦合入，1.4.1 正式版有望在 1-3 天内发布。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-21

## 1. 今日速览

过去24小时LobsterAI整体活跃度较高：共3条Issue更新、13条PR更新、4个版本发布。项目正处于高频迭代期，核心开发者在PR合并与版本发布上节奏密集（24小时内发布4个版本，均由[@fisherdaddy](https://github.com/fisherdaddy)主导）。本周版本呈现出明确的**OpenClaw兼容性加固**与**浏览器能力扩展**双线推进态势（标签统计显示 `area: openclaw` 与 `area: renderer` 分别出现5次/6次），同时商业化功能（订阅试用、低余额优惠）也在同步落地。较久远的用户Issue仍以stale状态积压，当前社区支持响应度较低，值得关注。

> 活跃度评估：★★★★☆（发布与PR活跃度高，Issue社区互动一般）


## 2. 版本发布

过去24小时内发布了4个版本：

### [LobsterAI 2026.9.20](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.20)（最新）
- **feat: subagent session visibility**（PR [#2703](https://github.com/netease-youdao/LobsterAI/pull/2703)）— subagent 会话可见性改进
- **feat(browser): add passkey/WebAuthn support for the in-app agent browser**（PR [#2723](https://github.com/netease-youdao/LobsterAI/pull/2723)）— 应用内Agent浏览器新增 WebAuthn/passkey 支持（macOS）
- **feat: scheduled tasks 更新**（内容截断，关联PR [#2722](https://github.com/netease-youdao/LobsterAI/pull/2722) 修复了定时任务中微信目标大小写与重发逻辑）

### 前三日版本（未在24h窗口内，仅作趋势参考）
- **2026.9.17**: [OpenClaw 共享状态 schema 启动前迁移 + 修复快照回滚与 agent 媒体迁移](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.17)
- **2026.9.15**: [OpenClaw 兼容性修复 + xAI 认证凭据迁移至 SQLite](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.15)
- **2026.9.14**: [升级 OpenClaw 至 v2026.8.1 + Markdown 编辑支持](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.14)

**破坏性变更/迁移注意**：2026.9.17 与 2026.9.15 版本涉及 OpenClaw 共享状态 schema 迁移与认证凭据存储位置变更（迁移至 SQLite），升级到这些版本的用户需注意 OpenClaw 配置的兼容性；2026.9.20 中涉及 scheduled task 的微信目标 ID 大小写规范化逻辑变更，若用户此前配置了错误大小写的微信目标，系统将自动修复并在重发时给出会话过期提示。


## 3. 项目进展

今日合并/关闭的 PR（5条）明确了三条推进方向：

**A. 浏览器能力扩展**
- [#2723](https://github.com/netease-youdao/LobsterAI/pull/2723)（已合并）— 应用内Agent浏览器新增 passkey/WebAuthn 支持，包含 macOS 原生集成、页面观察器、preload bridge 与 i18n 字符串。该功能已随 2026.9.20 版本发布。

**B. 代码清理与架构简化**
- [#2724](https://github.com/netease-youdao/LobsterAI/pull/2724)（已合并）— **移除 Cowork 后台任务功能**：删除后台任务存储、OpenClaw `tasks.list/tasks.cancel` gateway 调用及相关 IPC 通道/渲染端 UI。这是一次架构简化，可能影响依赖后台任务的用户（虽为移除，但说明项目在收缩功能边界、聚焦核心体验）。

**C. 商业化与订阅功能落地**
- [#2720](https://github.com/netease-youdao/LobsterAI/pull/2720)（已合并）— 接入**0.01元试用**与**低余额购买优惠**：通过主进程IPC获取活动状态、按隐私授权/账号类型/订阅状态控制展示、每周一次+累计三次关闭的频控、优惠token透传等完整链路。商业化基础设施在快速完善。
- [#2722](https://github.com/netease-youdao/LobsterAI/pull/2722)（已合并）— 定时任务微信目标大小写修复与重发拒绝提示。

> **项目整体判断**：项目正在沿"OpenClaw深度集成 + 浏览器能力增强 + 商业化闭环"三线并进，且核心贡献者高度集中（fisherdaddy主导大部分PR），版本节奏快（1-2天一次release），整体项目活跃度处于高位。当日还合并了 Release/2026.9.18 分支（[#2725](https://github.com/netease-youdao/LobsterAI/pull/2725)），说明发布流程运转正常。

**待合并 PR 观察（8条待合并）**：
- [#2728](https://github.com/netease-youdao/LobsterAI/pull/2728)（new）— 修复 OpenClaw SQLite 只读结果文件问题
- [#2727](https://github.com/netease-youdao/LobsterAI/pull/2727)（new）— 持久化 OpenClaw entry hooks 到 SQLite，修复 gateway 重启后 hooks 丢失
- [#2726](https://github.com/netease-youdao/LobsterAI/pull/2726)（new）— 新增数字员工、专家团队与能力市场（功能型大 PR）
- [#2721](https://github.com/netease-youdao/LobsterAI/pull/2721)（new）— IM 配置无需重启 gateway 即生效


## 4. 社区热点

今日最活跃的讨论集中在以下 Issue/PR：

### [Issue #1003: 关于Notion MCP的问题](https://github.com/netease-youdao/LobsterAI/issues/1003)（OPEN，创建于 2026-03-28，最近更新 09-20）
- 用户报告 MCP Bridge 启动 `npx @notionhq/notion-mcp-server` 时环境变量未正确传递，导致 Notion 返回 401。
- 用户已排查多日，尝试了 Token 填写、环境变量名修改等多种方式，最终将问题定位在 Bridge 层 `child_process.spawn` 的 env 处理上。
- **背后诉求**：MCP（Model Context Protocol）是 LobsterAI 与外部工具集成的核心桥梁，环境变量传递问题将直接影响所有需要认证的 MCP Server 接入。该 Issue 已存在近半年且未被官方回复，用户语气略显无奈（"请大神们查阅修正"）。

### [Issue #1007: Agent Engine 无限重启](https://github.com/netease-youdao/LobsterAI/issues/1007)（OPEN，创建于 2026-03-29，最近更新 09-20）
- 用户反馈 Agent Engine 无限重启仍经常发生，请求指导修改配置。
- **背后诉求**：Agent Engine 是 LobsterAI 的核心运行时，无限重启意味着核心功能不可用，属于严重影响日常使用的稳定性问题。

> 两个高热度 Issue 均创建于 3 月底且已 stale，从更新时间 09-20 可以看出它们昨天被机器人或用户重新touch过，但官方均未正式回复。社区对官方支持响应速度的不满可能正在积累。


## 5. Bug 与稳定性

| 严重程度 | Issue / PR | 描述 | 状态 |
|---------|-----------|------|------|
| 🔴 高 | [#1007](https://github.com/netease-youdao/LobsterAI/issues/1007) | Agent Engine 无限重启 | OPEN，无官方回应，无 fix PR |
| 🔴 高 | [#1003](https://github.com/netease-youdao/LobsterAI/issues/1003) | MCP Bridge 环境变量未传给 Notion MCP Server，导致 401 | OPEN，无官方回应，无 fix PR |
| 🟡 中 | [#2728](https://github.com/netease-youdao/LobsterAI/pull/2728) | OpenClaw SQLite 结果文件被只读（fix PR） | 待合并，作者 [@fisherdaddy](https://github.com/fisherdaddy) |
| 🟢 低 | [#2722](https://github.com/netease-youdao/LobsterAI/pull/2722) | 定时任务微信目标大小写被错误规范化、重发时被静默拒绝 | ✅ 已合并并发布（2026.9.20） |
| 🟢 低 | [#1068](https://github.com/netease-youdao/LobsterAI/issues/1068) | 删除当前 Agent 后切换 Agent 任务列表不自动刷新 | CLOSED（stale 自动关闭） |

**分析**：两个高严重度 Issue 均为 3 月底创建，至今无官方回复，已进入 stale 状态。建议维护者尽快响应——尤其是 Agent Engine 无限重启问题，可能影响大量用户的核心使用体验。

---

## 6. 功能请求与路线图信号

### 今日新增信号

**A. 数字员工/专家团队/能力市场（PR [#2726](https://github.com/netease-youdao/LobsterAI/pull/2726)，待合并）**
外部贡献者 [@alison-xx](https://github.com/alison-xx) 提交了一个大型功能 PR：
- 能力市场工作流：发现技能、创建数字员工、安装专家团队、浏览专家套件与工具插件、配置 MCP 工具暴露
- 使用 LobsterAI 品牌、原生 Agent、SQLite 持久化和现有 OpenClaw 集成

这表明社区对**Agent 生态/技能市场**有明确需求，且已经有人付诸实现。如果合并，将显著扩展 LobsterAI 的可扩展性边界。

**B. IM 配置热加载（PR [#2721](https://github.com/netease-youdao/LobsterAI/pull/2721)，待合并）**
- 当前保存 IM 配置会强制重启整个 gateway，打断正在进行的任务，且与配置文件 watcher 竞争。
- PR 通过 live gateway 应用配置更改，避免重启。这是对运维体验的重要改进。

**C. 长期积压的功能请求（创建于 3 月底，仍处于 OPEN/stale）**：
- [#1008](https://github.com/netease-youdao/LobsterAI/pull/1008) — 新增 6 个预设 Agent 模板
- [#1009](https://github.com/netease-youdao/LobsterAI/pull/1009) — Prompt 模板库（变量填充 + 复制支持）
- [#1011](https://github.com/netease-youdao/LobsterAI/pull/1011) — 可扩展的 artifacts 预览管线（HTML/React/Mermaid）
- [#1013](https://github.com/netease-youdao/LobsterAI/pull/1013) — Prompt 输入框内斜杠触发技能选择器

**路线图判断**：项目当前重心在 OpenClaw 兼容性、浏览器能力和商业化上。两个大的社区功能 PR（#2726 能力市场、#2721 IM 热加载）均由活跃贡献者提交、质量较高，有可能被纳入下个版本；而 3 月底积压的 4 个功能 PR 的被合并优先级较低。社区贡献的"artifacts 预览"（[#1011](https://github.com/netease-youdao/LobsterAI/pull/1011)）与此前发布的 Markdown 编辑（2026.9.14 release）相关，但核心团队似乎已转向浏览器 WebAuthn 方向。


## 7. 用户反馈摘要

从今日更新的 Issue 评论中提炼：

**😟 Notion MCP 接入受挫（Issue [#1003](https://github.com/netease-youdao/LobsterAI/issues/1003)）**
> 用户反复尝试 Token 配置与环境变量修改均失败，最终定位到 MCP Bridge 层代码的 env 传递问题。这类问题对普通用户极不友好——MCP 配置本身就有门槛，环境变量在传递链中被静默丢弃导致 401 错误，难以从用户侧排查。

**😟 Agent Engine 稳定性焦虑（Issue [#1007](https://github.com/netease-youdao/LobsterAI/issues/1007)）**
> "现在还是经常遇到"——用户表明问题长期存在。Agent Engine 无限重启会中断所有正在进行的 Agent 任务，对依赖自动化的用户（开发者、内容创作者）影响严重。

**😐 删除 Agent 后任务列表不刷新（Issue [#1068](https://github.com/netease-youdao/LobsterAI/issues/1068)）**
> 已关闭（stale）。用户删除当前 Agent 后切到 main agent，任务列表无法自动刷新，需手动操作。UI 体验类 bug，属于日常交互中的"摩擦点"，已随 stale 策略自动关闭。

**整体用户情绪**：社区用户对产品的功能方向是认可的（有多个高质量功能 PR 提交），但对核心稳定性问题（Agent Engine 崩溃、MCP 配置）和官方响应速度存在明显不满。


## 8. 待处理积压

### 需维护者重点关注

| 项目 | 类型 | 创建时间 | 最后更新 | 天数 | 说明 |
|------|------|---------|---------|------|------|
| [#1007](https://github.com/netease-youdao/LobsterAI/issues/1007) Agent Engine 无限重启 | Issue | 2026-03-29 | 2026-09-20 | ~176天 | 高严重度，长期无官方回应，已 stale |
| [#1003](https://github.com/netease-youdao/LobsterAI/issues/1003) Notion MCP 环境变量问题 | Issue | 2026-03-28 | 2026-09-20 | ~177天 | 高严重度，影响 MCP 生态接入，已 stale |
| [#1008](https://github.com/netease-youdao/LobsterAI/pull/1008) 新增 6 个预设 Agent 模板 | PR | 2026-03-29 | 2026-09-20 | ~176天 | 功能完整但长期未合并，可能因优先级/评审资源不足 |
| [#1009](https://github.com/netease-youdao/LobsterAI/pull/1009) Prompt 模板库 | PR |

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度较低：Issues 无新增/关闭/活跃记录，PR 仅 1 条（待合并），无新版本发布。唯一动态是 PR #1280 针对工具选择逻辑中的边界情况提交修复，反映出项目目前处于集中打磨稳定性的阶段，而非功能快速迭代期。综合来看，项目健康度良好，社区讨论平静，维护节奏正常。

## 2. 版本发布

无新版本发布。项目可能正处于上一个大版本后的稳定维护期，建议关注后续合并节奏。

## 3. 项目进展

### 今日合并/关闭 PR：无
### 待合并 PR 进展

- **[#1280 [OPEN] fix(tools): preserve preset tools for empty active_tools](https://github.com/moltis-org/moltis/pull/1280)** — 作者 @mikemikimike，创建/更新于 2026-09-21
  - 修复内容：当 `active_tools` 被显式设为空数组时，当前逻辑会覆盖预设工具列表，导致预设工具配置失效。本 PR 将其视为「无 per-turn 覆盖」，从而保留预设工具控制；同时保持非空 per-turn 工具列表仍受预设 allow/deny 策略约束。
  - 项目意义：这属于工具链配置语义的精确化修复，解决了用户「显式清空」与「意图保留预设」之间的歧义，避免因误传空数组而丢失工具配置。该 PR 尚未合并，但若合入，将提升工具编排在边缘场景下的一致性与可预测性。

## 4. 社区热点

今日仅有 1 条 PR，且评论数据缺失（undefined），未出现高讨论量或高赞议题。PR #1280 是当前唯一边际热点，其关联的 Issue [#1277](https://github.com/moltis-org/moltis/issues/1277) 指出了实际行为与预期不符的问题。核心诉求是：**空数组应代表「不覆盖」而非「清空全部工具」**——这是一个语义约定问题，反映用户对配置接口的直觉期望。虽然讨论热度不高，但该诉求具有普遍性，任何使用动态工具覆盖的开发者都可能遇到。

## 5. Bug 与稳定性

### 今日报告 Bug：1 个（来源于 PR 关联 Issue）

| 严重程度 | 描述 | 状态 |
|---------|------|------|
| 中低 | 显式传入空 `active_tools` 数组时，预设工具被意外清空，导致工具控制失效（[Issue #1277](https://github.com/moltis-org/moltis/issues/1277)） | 已有修复 PR [#1280](https://github.com/moltis-org/moltis/pull/1280)，待合并 |

该 Bug 不属于崩溃类或数据损坏类问题，但会影响依赖预设工具配置的自动化场景，修复方案清晰，风险较低。

## 6. 功能请求与路线图信号

今日无独立的新功能请求 Issue。PR #1280 虽为 Bug 修复，但其修正的「显式空数组 = 无覆盖」语义背后，可能隐含用户对更细粒度工具控制能力的期待——未来版本或许会引入「清空全部工具」的显式语法（例如新增专用参数），以区分「无覆盖」和「主动清空」两种意图。建议维护者关注这一语义模糊点，在文档中明确约定。

## 7. 用户反馈摘要

由于今日无新增 Issue 评论，以下反馈提炼自 PR #1280 的描述及关联 Issue #1277 的动机：

- **真实痛点**：在使用预设工具包（preset tools）时，若客户端/上游调用方构造请求时恰好传入空 `active_tools`，则会导致预设工具被意外剥离，破坏原有 Agent 能力。
- **预期行为**：用户倾向于将「显式空数组」理解为“本次不覆盖”，而非“清空一切”。
- **潜在方向**：该反馈折射出对工具配置语义可预测性的需求——用户希望接口行为更符合直觉，减少因数据边界引发的隐性故障。

## 8. 待处理积压

- **[Issue #1277](https://github.com/moltis-org/moltis/issues/1277)**：已由 PR #1280 给出修复方案，但 PR 尚未合并。提示维护者及时 review 并合入，以关闭该问题闭环。
- 未发现其他长期未响应的历史 Issue 或 PR，积压情况健康。

---

*报告基于 Moltis 仓库 2026-09-21 全天公开事件数据生成，全部链接均可直接访问。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw 项目动态日报 — 2026-09-21

> 数据说明：本报告基于 GitHub 仓库 `agentscope-ai/QwenPaw`（即 CoPaw 项目）公开数据生成。

## 1. 今日速览

过去 24 小时项目保持了高速迭代节奏：共产生 25 条 Issue 更新（18 条新开/活跃、7 条关闭）和 36 条 PR 更新（23 条待合并、13 条已合并/关闭），同时发布了 v2.2.2-beta.3 新版本。社区讨论热度集中在多租户 Hub 功能规划（#7318，31 条评论）与多个功能性 Bug 上，核心维护团队通过 8 条 PR 合并/关闭快速响应了音频处理、CI 发布流程、前端测试覆盖率等问题。整体来看，项目处于活跃的功能开发与稳定性加固并行的阶段，对社区反馈的响应速度较快。

## 2. 版本发布

**v2.2.2-beta.3** 于 2026-09-20 发布，包含两项修复：

- **fix(console): restore assistant response actions**（#7851）— 修复了控制台中助手响应操作按钮失效的问题，可能涉及消息操作（如复制、重新生成、编辑等）的回归。
- **fix(e2e): re-anchor console selectors broken by the #7502 redesign** — 修复了 #7502 前端界面改版导致的 E2E 测试选择器失效，并强化了会话列表断言，属于测试基建修复。

**迁移注意事项**：本次为 Beta 版本，未发现破坏性变更或特殊迁移要求。使用 `qwenpaw-pet` 插件的用户请注意 #7856 中报告的 bug（详见下文"Bug 与稳定性"），该问题在 2.2.2b2 中仍然存在，v2.2.2-beta.3 的发布说明中尚未包含对应修复。

## 3. 项目进展

今日合并/关闭的重要 PR 集中在 Bug 修复、测试覆盖与 CI 流程优化，整体推进了以下方向：

- **音频内容兼容性修复**（对应 #7876）：两条几乎相同的 PR 合并/关闭——
  - [fix(agents): handle unknown audio part rejections by @lorenzozanee (#7887)](https://github.com/agentscope-ai/QwenPaw/pull/7887)
  - [fix(agents): handle unknown input_audio rejections by @axelray-dev (#7886)](https://github.com/agentscope-ai/QwenPaw/pull/7886)
  - 这两个修复解决了 DeepSeek 等模型拒绝 `input_audio` 内容部分后会话永久崩溃的问题，音频回退分类器现在能正确识别未知变体错误，并触发重试与能力学习路径。
- **插件兼容性修复**：[fix(pet): forward approval actor to native service by @Osier-Yi (#7904)](https://github.com/agentscope-ai/QwenPaw/pull/7904) — 修复了 `qwenpaw-pet` 0.1.1 导致工具审批 HTTP 500 的问题，属于插件 API 适配修复。
- **前端测试覆盖率显著提升**：[test(console): raise frontend statement coverage by +1027 statements by @yutai78786 (#7894)](https://github.com/agentscope-ai/QwenPaw/pull/7894) — 纯测试代码变更，Console 语句覆盖率从 64.45% 提升至 67.65%（+3.19 个百分点），是纯增量质量提升。
- **CI 流程优化**：
  - [ci(release): unfreeze merges as soon as the release finishes by @yutai78786 (#7901)](https://github.com/agentscope-ai/QwenPaw/pull/7901) — 解决发布会后 PR 因 cron 延迟而长时间处于冻结状态的问题。
  - [ci(release): gate artifact publishing on the test gate by @yutai78786 (#7862)](https://github.com/agentscope-ai/QwenPaw/pull/7862) — 发布时测试门禁与 E2E watch 集成的加固，属发布质量保障改进。
- **桌面端功能落地**：[feat(desktop): auto-detect local paths in chat output and open file explorer on click by @wangfei010313 (#5836)](https://github.com/agentscope-ai/QwenPaw/pull/5836) — 该 PR 关闭 #4830，桌面端聊天消息中的本地文件/目录路径现在会自动识别为可点击链接，点击后在系统文件管理器中打开，对桌面用户体验有明显提升。

当前仍有 23 条 PR 在待合并队列中，覆盖模型管理统一、多标签终端、社区集成等重要功能，预计下一版本迭代空间较大。

## 4. 社区热点

- **[#7318 [Discussion] QwenPaw Hub 多租户版本：你希望我们接下来做什么？](https://github.com/agentscope-ai/QwenPaw/issues/7318)**（评论 31，👍 4）
  这是本周期最活跃的讨论帖。QwenPaw 原本是个人 AI 助手，社区多次要求支持团队运行，Hub 是对此需求的首次回应。用户围绕多租户权限管理、管理员技能管理、团队协作效率等话题展开讨论。该 Issue 已持续活跃近一个月（创建于 8 月 26 日），说明团队/企业场景需求迫切，是路线图的重要信号。

- **[#7853 [Bug] ToolResultPruner 跳过媒体块导致 base64 无界累积](https://github.com/agentscope-ai/QwenPaw/issues/7853)**（评论 6）
  该问题直指上下文管理机制的严重缺陷：`ToolResultPruner` 不裁剪 base64 图像数据，导致会话上下文不断膨胀直到超出模型窗口。属于架构层面的 bug，讨论热度较高，社区对修复方案有较多关注。

- **[#7724 [Bug] 会话丢失](https://github.com/agentscope-ai/QwenPaw/issues/7724)**（评论 5）
  用户报告 Windows 桌面端会话和模型配置同时丢失的问题，且提到此前已反复遇到模型丢失问题（关联 #7708）。属于高影响稳定性问题，用户情绪明显。

- **[#7884 [Question] 压缩后刷新前端，历史信息无法全量加载](https://github.com/agentscope-ai/QwenPaw/issues/7884)**（评论 4）
  用户抱怨聊天历史过短、"回头翻看不到"，体验诉求强烈。反映用户对会话历史持久化长度的期望与当前实现存在落差。

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 修复状态 |
|---|---|---|---|
| **严重（数据丢失）** | [#7724 会话丢失](https://github.com/agentscope-ai/QwenPaw/issues/7724) | Windows 桌面端 2.2.1：对话记录在会话列表中完全消失，同时大模型配置丢失，需退出重选。用户表示反复遭遇此类问题（关联 #7708） | ❌ 无 PR |
| **严重（上下文溢出）** | [#7853 ToolResultPruner 跳过媒体块](https://github.com/agentscope-ai/QwenPaw/issues/7853) | base64 图像数据永不裁剪，会话上下文无界累积直至超出模型窗口 | ❌ 无 PR |
| **严重（安全）** | [#7859 持久化提示注入](https://github.com/agentscope-ai/QwenPaw/issues/7859) | 工具结果的 system-reminder 中持续出现注入指令，指示 agent 删除所有技能，来源未在本地磁盘找到 | ❌ 无 PR |
| **高** | [#7888 聊天页 React 崩溃](https://github.com/agentscope-ai/QwenPaw/issues/7888) | Chat 页面卡在 "Something went wrong"，浏览器扩展注入 `<font>` 导致 React commitPlacement 报 NotFoundError | ❌ 无 PR |
| **高** | [#7883 DeepSeek 拒绝 PDF（回归）](https://github.com/agentscope-ai/QwenPaw/issues/7883) | 工具返回 PDF 被序列化为 OpenAI 风格嵌套文件，DeepSeek 以 400 拒绝；#7597 曾修复此问题但该修复未覆盖全部场景 | ❌ 无 PR |
| **高** | [#7856 qwenpaw-pet 破坏工具审批](https://github.com/agentscope-ai/QwenPaw/issues/7856) | qwenpaw-pet 0.1.1 丢失 `actor` 参数导致审批点击返回 HTTP 500 | ✅ [#7904](https://github.com/agentscope-ai/QwenPaw/pull/7904) + [#7898](https://github.com/agentscope-ai/QwenPaw/pull/7898) |
| **高** | [#7882 OpenCode 免费模型 403](https://github.com/agentscope-ai/QwenPaw/issues/7882) | OpenCode 供应商标记为免费模型无法通过 API 调用（403 FreeTierError），UI 仍显示免费 | ❌ 无 PR |
| **高** | [#7905 DoomLoopGate 误终止](https://github.com/agentscope-ai/QwenPaw/issues/7905) | 纯文本轮次无新工具调用证据时，DoomLoopGate 错误升级为 TERMINATE | ✅ [#7906](https://github.com/agentscope-ai/QwenPaw/pull/7906) |
| **中** | [#7895 idle cleanup 丢弃消息](https://github.com/agentscope-ai/QwenPaw/issues/7895) | 空闲清理在等待消费者停机时，另一消费者收到的新消息被丢弃 | ✅ [#7896](https://github.com/agentscope-ai/QwenPaw/pull/7896) |
| **中** | [#7876 音频永久破坏会话](https://github.com/agentscope-ai/QwenPaw/issues/7876) | DeepSeek 拒绝 `input_audio` 内容后音频回退分类器不触发，会话永久不可恢复 | ✅ [#7887](https://github.com/agentscope-ai/QwenPaw/pull/7887) / [#7886](https://github.com/agentscope-ai/QwenPaw/pull/7886) |
| **中** | [#7890 零停机 reload 丢失 runtime hook](https://github.com/agentscope-ai/QwenPaw/issues/7890) | 插件注册的 runtime hook 在 reload 后静默丢弃，middleware 正常，行为不一致 | ❌ 无 PR |
| **中** | [#7866 文件标签页显示陈旧内容](https://github.com/agentscope-ai/QwenPaw/issues/7866) | Agent 重写文件后，file-area 标签页不刷新，会话卡片正常 | ✅ [#7902](https://github.com/agentscope-ai/QwenPaw/pull/7902) |
| **低** | [#7877 工作目录面板 UI 缺陷](https://github.com/agentscope-ai/QwenPaw/issues/7877) | 浏览区域仅约 3 行、「最近项目」为空、选目录后「应用」仍禁用三处 UI 问题 | ❌ 无 PR |
| **低** | [#7879 MCP OAuth 握手失败](https://github.com/agentscope-ai/QwenPaw/issues/7879) | 无法接入需要静态 Bearer Key 的 MCP server（如企查查 QCC），授权流程缺少 client_id/resource | ❌ 无 PR |

整体来看，高危 bug 的修复响应速度较快（今日已有 3 个高严重度问题被 PR 覆盖），但 #7853、#7859、#7724 三个严重问题尚无修复方案，建议维护团队优先

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-09-21

> 数据来源：[github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw) | 统计周期：2026-09-20 至 2026-09-21

---

## 1. 今日速览

- 过去 24 小时**无新 Issue、无新 PR**，社区提交与讨论处于静默状态，整体活跃度偏低。
- 项目发布了 **v1.9.19（TK Copilot）**，继续围绕达人联盟工作台用户体验与多语言支持进行迭代。
- 当前无待合并 PR、无待关闭 Issue，仓库维护状态干净，无积压的代码评审负担。
- 虽有新版本释出，但社区侧反馈尚未同步跟进，近期的迭代节奏仍是“维护者主动推进、社区响应滞后的”单边模式。
- 综合来看，项目处于**稳定的低频迭代期**，健康度良好，但外部贡献参与度有待激活。

---

## 2. 版本发布

### v1.9.19 — TK Copilot

- **发布时间**：2026-09-21（近 24 小时内）
- **发布链接**：[Releases v1.9.19](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.19)

**更新要点**：

1. **达人联盟工作台队列筛选**：每个 Affiliate workbench 队列现在支持按**本地时间预设范围**或**自定义日期范围**过滤，默认仍为“所有时间”。
2. **样本申请页增强**：展示请求的 **SKU** 信息。
3. **卖家关系备注**：新增卖家关系备注功能。
4. **多语言标签补全**：所有支持语言的完整工具标签已完成本地化。

**破坏性变更**：无。

**迁移注意事项**：

- 无数据库迁移或配置变更要求。
- 新增的日期筛选与 SKU 展示为纯前端/交互增强，升级后即可使用，无需额外操作。

---

## 3. 项目进展

今日 **无合并/关闭的 PR**（[PR 列表](https://github.com/gaoyangz77/easyclaw/pulls) 为空），但版本发布本身即为项目进展：

- 进一步细化了达人工作台的**时间维度管理能力**，满足运营人员按本地时间周期复盘的需求。
- 增强了 **SKU 级信息透明度**，减少样品申请处理中的歧义。
- 多语言标签的完善说明项目在**国际化合规性**上持续投入，为更多地区用户落地做准备。

总体判断：v1.9.19 属于**小版本功能性迭代**，没有核心架构变更，项目整体向前稳步推进。

---

## 4. 社区热点

今日 **无活跃 Issue 或 PR 讨论**（[Issues 列表](https://github.com/gaoyangz77/easyclaw/issues) 为空，[PR 列表](https://github.com/gaoyangz77/easyclaw/pulls) 为空），因此没有可分析的高讨论度话题。

值得关注的是，新版本发布后社区尚未在 Issues 中产生反馈，这可能意味着一是项目使用者以直接升级使用为主、较少发帖；二是等待用户使用一段时间后才会沉淀使用体验。

**建议**：维护者可适当在 release note 末尾引导用户到 Issues 区反馈使用问题，以激活社区互动。

---

## 5. Bug 与稳定性

今日 **无新报告的 Bug、崩溃或回归问题**。

结合近 24 小时仓库状态，可以认为：

- 当前没有已知的严重稳定性问题。
- v1.9.19 为增量更新，未涉及核心链路重构，回归风险较低。
- 版本发布后 24 小时内无问题上报，初步属于**稳定发布**。

后续需持续观察未来 2~3 天是否有 v1.9.19 相关的使用问题上报。

---

## 6. 功能请求与路线图信号

今日 **无新功能请求 Issue**。

不过 v1.9.19 的更新内容本身透露了产品路线图信号：

- **时间筛选的精细化**（本地时间预设 + 自定义范围）意味着下一步可能扩展至更多报表页面。
- **卖家关系备注**的上线，说明项目正在向**卖家关系管理（SRM）**方向延伸，未来或增加更完整的卖家分层/标签体系。
- **多语言标签全量补齐**，暗示项目正在筹备面向更多非英语/非中文市场的正式推广。

这些信号均来自版本更新而非用户请求，说明维护者对产品迭代有自己的规划节奏，路线图更多由**产品内部驱动**。

---

## 7. 用户反馈摘要

今日 **无 Issue 评论** 可供提取。

从 v1.9.19 的发布说明可以间接推断用户侧关注的痛点正在被主动解决：

- 用户在使用达人工作台时可能有“按周期复盘”的需求 → 新增本地时间范围筛选。
- 样本申请环节中“不知道申请的是哪个 SKU”的困惑 → 新增 SKU 展示。
- 多语言用户的标签理解障碍 → 补齐所有支持语言的标签。

但由于缺少直接的 Issue/Comments 数据，无法评估用户对本次更新的满意度。建议关注下一次版本发布周期前是否有相关反馈出现。

---

## 8. 待处理积压

今日 **无长期未响应的重要 Issue 或 PR**。

- 当前 Issues 列表为空：[Issues](https://github.com/gaoyangz77/easyclaw/issues)
- 当前 PR 列表为空：[Pull Requests](https://github.com/gaoyangz77/easyclaw/pulls)

这在开源项目中属于**理想的健康状态**——没有陈旧问题堆积，也没有因长期无人维护导致的“僵尸 Issue”风险。

**维护者提醒**：虽然当前无积压是好事，但也说明外部贡献池尚未被有效利用。如果项目希望扩大社区参与，可以考虑在 README 或 `CONTRIBUTING.md` 中标注 `good first issue` 或 `help wanted` 标签，吸引新贡献者。

---

**总结**：EasyClaw 今日处于低活跃但有序推进的状态。v1.9.19 的发布体现了维护者在功能细节与国际化上的持续打磨，项目没有遗留债务，整体健康度良好。建议下一阶段关注社区参与度的提升。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*