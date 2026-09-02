# OpenClaw 生态日报 2026-09-02

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-02 07:53 UTC

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

好的，这是 2026-09-02 的 OpenClaw 项目动态日报。

---

# OpenClaw 项目动态日报 | 2026-09-02

## 1. 今日速览

过去 24 小时项目活跃度极高。Issue 侧更新 500 条（56% 新开/活跃，44% 关闭），PR 侧更新 500 条（63% 待合并，37% 已合并/关闭），并发布了补丁版本 v2026.8.2。值得警惕的是，今日集中出现多起从 2026.7.1-2 升级至 2026.8.1 后导致的 Gateway 无法启动、crash-loop 等 P0/P1 级回归（#135171、#133984、#134353），虽然多数已有修复 PR 或已关闭，但升级路径的稳定性仍是当前最大风险。社区对 WhatsApp/Telegram 等渠道的消息可靠性、会话状态一致性以及资源泄漏问题讨论激烈，整体项目健康度呈“高活跃、高压力”状态。

## 2. 版本发布

**v2026.8.2**（2026-08-02 发布）

本次为补丁版本，重点引入新的桌面端交互能力：

- **Home agent 侧边/底部停靠**：通过 `Cmd/Ctrl+Shift+H` 可在工作区右侧或底部开启 Home agent dock，无需离开当前页面即可与 agent 协作。支持预览/移除工作上下文快照，或将选中文本直接附加到消息中（相关 #133632, #133676）。

**迁移与注意事项**：Release Notes 未明确提及破坏性变更。但结合今日 Issue 反馈，**从 2026.7.1-2 升级至 2026.8.1 的路径存在已知配置迁移缺陷**（见 #133984），若你正计划升级，建议直接升级至 2026.8.2 并提前备份 `~/.openclaw` 下的配置与状态目录。

## 3. 项目进展

今日有 183 个 PR 被合并/关闭，以下为关键合并项，主要集中在会话稳定性、CLI 正确性、脚本基础设施与 UI 体验：

- **fix: Responses sessions compact before reaching context limit** (#130993, P1, XL)：修复 OpenAI Responses 长会话压缩管道的 6 个缺陷，包括上下文边界重放导致过早压缩、多阶段压缩失败等，是长会话可靠性的重要修复。
- **feat: make full session actions available from chat header** (#128995, P2, XL)：将侧边栏的会话操作（置顶、标记未读、设置图标、复制 ID、移动到分组）同步到聊天窗口头部菜单，补齐 Web UI 交互缺口。
- **fix(cli): resolve alias targets from the write snapshot** (#128223, S)：修复 `openclaw models aliases add` 在别名解析时读取失效快照的问题，确保别名解析基于最新配置。
- **fix(scripts): stabilize Vitest shard timing keys / clean up tsgo process trees** (#120105, #123975)：优化 CI 测试分片的时间键稳定性，并为 `tsgo` 包装器增加进程树清理与超时看门狗，减少 CI 基础设施故障。
- **fix(release): authorize focused beta evidence** (#128371, XL)：解决 beta.3 发布阻塞，允许冻结候选版本仅运行变更相关测试组即可获得发布验证清单。

## 4. 社区热点

今日讨论热度前几名的 Issue 揭示了社区对资源控制、数据安全与渠道可靠性的高度关注：

- **#116201 Realtime voice work can retain unbounded provider and consult state**（59 评论）：最热门 Issue。用户 `@vincentkoc` 指出实时语音会话在慢速/突发场景下，超期 consult 工作与 provider 帧无法被硬性回收，存在会话状态无限增长的隐患。属于 P1 且影响 session-state。
- **#40001 Write tool lacks append mode — isolated cron sessions destroy shared files**（14 评论）：P1 数据丢失问题。多个隔离 cron 会话使用 `write` 工具会**整体覆盖**共享文件（如 `memory/YYYY-MM-DD.md`）而非追加，社区反响强烈（👍 1），认为这是静默数据丢失的高危设计缺陷。
- **#96834 WhatsApp 1:1: inbound image wedges main lane ~3min**（14 评论）：P1 消息丢失问题。WhatsApp 发送图片给主 agent 时，消息通道会卡死约 3 分钟才进入真实处理，多模态输入路径存在缺陷。
- **#69208 Umbrella: duplicate transcript, replay, and context assembly across channels**（14 评论）：P1 会话状态问题。由维护者提出的跨渠道（MSTeams、webchat、Telegram 等）重复 transcript/回放/上下文组装问题总集，属于一类系统性缺陷。
- **#53763 [Feature]: Built-in headless browser**（12 评论）：P3 功能请求。用户强烈希望内置 headless Chromium，摆脱对外部 Chrome 或第三方 API 的依赖，反映 agent 网页访问体验的普遍痛点。

## 5. Bug 与稳定性

今日报告的 Bug 集中于**升级路径、会话状态损坏与消息丢失**三大类。按严重程度排列如下：

**P0 - 已解决/关闭**
- **#135171**：2026.8.1/8.2 Gateway 启动 crash-loop，内置 Perplexity 插件需 capability 同意但无法查看/启用/禁用。已关闭。
- **#107227**：2026.7.1 启动迁移门禁致命但 `doctor` 无法修复，导致 crash-loop。已关闭。
- **#134453**：Windows 上 `doctor --fix` 因找不到文件而中止，但交互式 `openclaw doctor` 可完成。已关闭。

**P1 - 待处理（含活跃讨论）**
- **#133984**：2026.7.1-2 → 2026.8.1 升级后 Gateway 无法启动，`doctor --fix` 跳过配置键迁移（source-repro, crash-loop）。
- **#135347**：强制内存重建索引后共享 agent 数据库膨胀至 35GB，删除后恢复会毁灭会话（data-loss, crash-loop）。
- **#116201**：Realtime voice 会话状态无限增长（59 评论，session-state）。
- **#115546**：CLI 预算压缩在大会话上 100% 失败，超时在 4.9s-50s 内提前触发且无重试，导致 wake 死亡螺旋。
- **#117262**：SQLite 事务锁竞争导致 ~33s 事件循环停顿。
- **#128140**：`memory_search` 工具始终 15 秒超时，但 CLI `memory search` 正常。
- **#97616**：hook/tool 子进程泄漏导致僵尸进程堆积。

**已有修复 PR 的活跃 Bug**
- #136067（CLI remote exec 不应在无可用节点时显示）、#136036（网关认可 Full Access 委托）、#135517（网关在最终响应前释放 continuation 许可）、#135798（配置脱敏跳过空字符串）等 8 个 PR 已提交处理。

## 6. 功能请求与路线图信号

今日活跃功能请求中，以下方向可能进入后续版本：

- **Per-agent Dreaming 配置**（#67413, 👍 5）：社区强烈希望按 agent 粒度控制 memory-core dreaming（当前所有 workspace 同时触发导致 OOM）。**已有对应实现 PR #133163**（feat: add safe-start config and per-agent Dreaming），目前处于 “needs proof” 状态，若验证通过有望进入 2026.9.x。
- **内置 Headless 浏览器**（#53763）：呼声较高，属于 agent 网页访问的基础能力补全，但涉及较大的依赖复杂度，短期可能不会落地。
- **A2A 单向派发模式**（#44309）：避免 agent 间对话的回复乒乓，适合任务投递场景，P2 且已有明确语义设计。
- **OpenRouter 成本暴露**（#9016）：用户希望代理能感知每次调用的费用并附加到回复中，对成本敏感型用户有吸引力。
- **Memory 写入管道 MVP**（#42648）与 **heading-aware 分块 + 实体提取**（#44395）：长期开放的 memory 增强路线图信号，目前仍无实现 PR。

## 7. 用户反馈摘要

从今日活跃 Issues 中可提炼出以下真实用户痛点：

- **升级恐惧症**：多位用户（#133984, #134353, #107227）反馈从 2026.7.x 升级到 2026.8.1 后需要手动执行十几个修复步骤，`doctor --fix` 无法解决迁移问题，导致 Gateway 完全不可用。用户对升级路径的信任度正在下降。
- **数据安全焦虑**：`write` 工具无追加模式（#40001）导致 cron 会话静默覆盖共享文件，用户将此描述为“silent data loss”，情绪强烈。
- **“我在放弃这个项目”**：用户 `@abenarroch` 在 #88087 中直言因后台任务 UX 差与 cron 静默唤醒失败，决定拆掉 DigitalOcean droplet——“成本不值得这种体验”，这是对稳定性的明确负面反馈。
- **渠道可靠性抱怨**：WhatsApp 图片卡顿 3 分钟（#

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告（2026-09-02）

## 1. 生态全景

当前个人 AI 助手 / 自主智能体开源生态处于“高活跃、高竞争、分层演进”阶段。头部项目单日 Issues/PR 更新量可达数百条，围绕会话稳定性、渠道可靠性、上下文管理展开密集修复；中腰部项目则通过工具补全、安全沙箱、架构 RFC 等方式寻求差异化突破。社区对“升级回归”“静默数据丢失”“消息卡顿”等稳定性问题的容忍度明显降低，质量优先于新功能成为普遍诉求。同时，MCP 生态、嵌入式边缘设备、桌面可视化等方向开始萌芽，生态正从“单机 Agent”向“多端 + 多通道 + 可观测”的平台形态演进。

## 2. 各

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-02

## 1. 今日速览

过去24小时NanoBot项目保持高活跃度：共产生3条Issue更新（2条开放、1条关闭）和16条PR更新，其中6条PR已合并/关闭，10条仍处于开放待合并状态。值得关注的是，多个历史遗留问题今日均有实质推进——长期存在的AgentLoop空任务组泄漏问题（#5428）及对应修复PR（#5623、#5430）已闭环，WebUI、TUI、Dream模块的多个缺陷修复已合并。此外出现两个值得注意的新信号：macOS Seatbelt沙箱后端PR（#5628）和copy_file/move_file文件系统工具PR（#5626），后者直接回应了超长滞留Bug #2061的社区痛点。今日无新版本发布，整体项目健康度良好，修复节奏紧凑。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共6条PR合并/关闭，主要集中在**代理核心稳定性、WebUI与TUI体验修复、文档澄清**三个方向：

- **AgentLoop任务组生命周期修复（#5430）** — 移除了`_active_tasks`中已完成会话的空集合条目，覆盖单任务、多任务及替换组生命周期场景。这是对Issue #5428的直接修复，与另一条开放PR #5623形成同一问题的两条修复路线，最终#5430先行合并。长期运行网关的内存占用将因此显著改善。
  https://github.com/HKUDS/nanobot/pull/5430

- **WebUI面板会话删除修复（#5624）** — 允许新创建的WebUI面板在首条消息持久化之前被删除，并在网关重启丢失暂存工作区范围后仍可删除乐观空面板，同时补充了服务端删除的回归测试。
  https://github.com/HKUDS/nanobot/pull/5624

- **Dream模块上下文去重（#5622）** — 修复了Dream整合流程中`SOUL.md`、`USER.md`和`memory/MEMORY.md`内容在同一模型请求中被重复发送两次的问题，属于直接的token浪费与上下文污染修复。
  https://github.com/HKUDS/nanobot/pull/5622

- **TUI输入状态保留（#5621）** — 修复了提交后立即输入的内容被错误合并或清除的问题，保留延迟IME提交行为，TUI测试163项全部通过。
  https://github.com/HKUDS/nanobot/pull/5621

- **edit_file工具文档澄清（#5604）** — 明确`occurrence`、`line_hint`、`replace_all`三个选择器互斥，避免Agent误用组合导致运行时拒绝。
  https://github.com/HKUDS/nanobot/pull/5604

- **无效PR关闭（#5603）** — 尝试检测“声称执行但未实际执行动作”的轮次，被标记为invalid后关闭。
  https://github.com/HKUDS/nanobot/pull/5603

此外还有10条PR处于开放待合并状态，其中#5623（同#5428问题的另一实现）、#5431（后台任务失败报告）、#5568（Runner接管上下文压缩）均为核心代理层改动，有待维护者评估。

---

## 4. 社区热点

**[Issue #2061 — 工作区内复制文件失败]** 今日最受关注的问题，创建于2026年3月15日，历经近半年仍未解决。Agent反复调用`list_dir`和`read_file`但从不下发文件写入或复制操作，对话在飞书中显示正常但文件从未生成。该Issue在9月1日仍有更新，说明用户仍在持续反馈和跟进。其特殊之处在于：**这一问题直接催生了#5626（copy_file/move_file工具PR）**，社区已尝试从工具层面补足能力缺口，但Issue本身仍未有明确修复方案或维护者确认。
https://github.com/HKUDS/nanobot/issues/2061

**[PR #5626 — copy_file和move_file文件系统工具]** 虽评论为0，但作为对#2061的直接回应，其战略意义明显。当前文件工具仅有`read_file`、`write_file`、`edit_file`、`list_dir`，Agent只能链式调用读-写来模拟复制，效率低且容易产生偏差。该PR有望从根上解决文件复制/移动场景。
https://github.com/HKUDS/nanobot/pull/5626

**[Issue #5586 — ephemeral运行时上下文块]** 虽然只有1条评论，但对应的功能PR #5627已经在次日（今日）提交，社区响应速度很快。诉求是让运行时上下文块可以选择不写入历史持久化，避免临时内容在后续轮次中被无限重放。这对隐私敏感和上下文长度控制都有价值。
https://github.com/HKUDS/nanobot/issues/5586

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 问题 | 状态 | 对应Fix PR |
|---------|------|------|-----------|
| 高 | **#2061 文件复制操作永远无法完成** — Agent反复列举目录和读取文件但不执行写/复制，功能完全不可用；飞书用户场景下文件静默丢失 | 开放，持续近半年无修复方案 | #5626（copy_file/move_file工具，已提交待审） |
| 中 | **#5428 AgentLoop空任务组泄漏** — `_active_tasks`映射中长期保留空集合，长时间运行网关内存持续增长 | 已关闭 | #5430（已合并）、#5623（开放中，带conflict标记） |
| 中 | **Dream提示词重复注入** — SOUL/USER/MEMORY内容在单个请求中发送两次，浪费token且干扰模型注意力 | 已修复 | #5622（已合并） |
| 低 | **TUI提交后输入丢失** — 用户提交后立即键入的内容被清除或错误合并 | 已修复 | #5621（已合并） |
| 低 | **WebUI面板删除受限** — 未持久化的新面板无法删除，网关重启后暂存范围丢失 | 已修复 | #5624（已合并） |
| 低 | **tool_hints未遵守max_length限制** — 普通类型（非路径/命令）工具参数过长时不截断 | 开放 | #5629（今日提交） |

整体来看，Bug修复管线通畅，多数问题能在提交后1-2天内获得修复PR。

---

## 6. 功能请求与路线图信号

今日出现的功能类PR较多，按可能的纳入概率与版本影响排序：

- **[PR #5627 — ephemeral运行时上下文块]** 直接实现#5586的功能请求——为`RuntimeContextBlock`增加`ephemeral`标志，当前请求可用但不持久化、不重放。该功能对敏感信息处理和上下文压缩有双向价值，与#5568的context compaction方向互补，很可能合并进入下一版本。
  https://github.com/HKUDS/nanobot/pull/5627

- **[PR #5625 — WebUI首次运行AI设置引导]** 将全新安装后的模型配置错误态替换为中性的引导流程，引导用户选择AI服务商、支持预配置前的输入输入、提供三个清晰起点。这属于新用户体验的关键短板修复，对降低上手门槛有明显作用。
  https://github.com/HKUDS/nanobot/pull/5625

- **[PR #5628 — macOS Seatbelt沙箱后端]** 为`tools.exec.sandbox`新增`seatbelt`后端，通过`sandbox-exec(1)`实现macOS进程级隔离，策略对齐`bwrap`：工作区可读写、媒体只读、工作区父目录不可读（保护config.json及API密钥）。对macOS用户的本地代码执行安全是一步实质性补强，但需维护者评估Seatbelt在不同macOS版本间的兼容性。
  https://github.com/HKUDS/nanobot/pull/5628

- **[PR #5626 — copy_file/move_file工具]** 直接补齐文件操作能力缺口，实现简单、动机明确，与#2061强关联，建议优先审阅。
  https://github.com/HKUDS/nanobot/pull/5626

- **[PR #5614 — Telegram富消息流式发送]** 实现富消息的流式传输和最终正确发送，作者标注“仓促提交，本周内自测”，属于实验性PR，合并可能还需数轮迭代。
  https://github.com/HKUDS/nanobot/pull/5614

---

## 7. 用户反馈摘要

来自Issue #2061的评论（共3条，飞书环境）：

用户使用飞书与NanoBot对话，请求在workspace内复制文件时，出现过两种令人困惑的现象：一是Agent与用户的对话在飞书端显示完全正常——没有报错、没有中断，但期望的文件从未出现在工作区中；二是Agent反复调用`list_dir`和`read_file`工具，却始终没有发起任何`write_file`或其他写入动作。用户对“对话看起来正常但操作无果”的状态尤为困扰，因为这类故障模式极难被自动化监控捕获，几乎完全依赖人工检查磁盘才能发现。

该反馈间接揭示了一个工具设计缺口：在没有`copy_file`原语的情况下，模型对“复制”操作缺少可靠的底层映射——既没有现成工具可用，又未能组织出读-写链来完成目标。社区在#5626中直接引用了这一痛点作为PR动机，说明该反馈已获得实质性的开发响应。

---

## 8. 待处理积压

- **[Issue #2061 — 文件复制失败]** 创建于2026-03-15，至今已开放近6个月。虽然#5626从工具层面进行了补足，但该Issue本身仍未获得维护者的明确分析结论——尤其是Agent为何反复读目录却不下发写入动作的根因，是否涉及Agent规划能力缺陷。建议维护者审阅#5626的同时回复该Issue，明确#5626合并后此问题的解决路径。
  https://github.com/HKUDS/nanobot/issues/2061

- **[PR #2078 — Zalo集成重构]** 创建于2026-03-16，已开放超过5个月。重构基于nightly分支的模块化插件架构，避免破坏现有频道配置，但长期未获合并或许可存在分支漂移风险。建议维护者明确其状态：是等待作者更新、需要补充测试，还是暂时不纳入主线。
  https://github.com/HKUDS/nanobot/pull/2078

- **[PR #5431 — 后台任务失败报告]** 自2026-08-18起开放至今，与已合并的#5430同出作者且改动区域高度相关，当前标注conflict，修复冲突后可一并推进。该改动对后台任务异常可见性有实际价值。
  https://github.com/HKUDS/nanobot/pull/5431

- **[PR #5623 — 空任务组清理的备选实现]** 与已合并的#5430解决同一问题（#5428），但实现路径不同，当前标记conflict。既然#5430已落地，建议维护者评估是关闭#5623还是将其中的补充覆盖转入后续优化。
  https://github.com/HKUDS/nanobot/pull/5623

- **[PR #5568 — Runner接管上下文压缩]** 自2026-08-27开放，涉及将本地请求压力上下文压缩流程从分散调用收敛至`AgentRunner`统一管理。该改动与#5627的ephemeral上下文存在交互可能，建议尽早审阅以免两条PR在架构上发生冲突。
  https://github.com/HKUDS/nanobot/pull/5568

---

**总结**：NanoBot项目今日处于“多线并行、闭环迅速”的健康状态——代理生命周期问题从发现到合并修复闭环约两周，工具短板由社区PR快速补位，新功能提案次日即有实现。主要风险集中在#2061的长期悬而未决和#2078、#5431等跨月积压PR上，建议维护者优先给出明确回应，避免社区贡献者持续等待。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-02

> 数据周期：过去 24 小时 | 数据来源：github.com/zeroclaw-labs/zeroclaw

## 1. 今日速览

过去 24 小时内，Zeroclaw 项目共产生 43 条 Issue 更新（38 条活跃 / 5 条关闭）与 50 条 PR 更新（49 条待合并 / 1 条已合并），无新版本发布。社区讨论高度集中于多个 RFC 架构提案（会话运行时所有权、文件附件架构、沙箱策略、WASM 插件运行时），其中 #9487 以 31 条评论成为最热 Issue。安全领域值得高度警惕：今日仍有 3 个 S0 级安全缺陷处于 Open 状态（#10165、#10495、#8279），其中 #10495 已有修复 PR 但仍卡在待作者响应阶段。整体活跃度评估为 **高**，但 PR 合并积压严重（49 条待合并），维护者审查带宽或成为当前瓶颈。

---

## 2. 项目进展

今日仅 1 条 PR 被合并/关闭，5 条 Issue 被关闭，整体推进节奏较慢，但几项关键修复已完成闭环：

- **PR #9871（已合并）— Matrix 通道 homeserver 发现修复**：修复 #9855，改用 `server_name_or_homeserver_url()` 构建 Matrix 客户端，使服务器名可通过标准 `/.well-known/matrix/client` 委托发现，同时保留直接 URL 支持。这是 S0 级通道接入缺陷的正式修复。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/9871

- **Issue #10306（已关闭）— Web/TypeScript CI 门禁任务完成**：为 `web/` 目录添加 TS 类型检查门禁，并让裸 `tsc -b` 失败时指向 `cargo web check` 而非输出 75 条误导性错误。CI 基础设施向前迈进一步。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10306

- **Issue #9395（已关闭）— 插件 WASI HTTP egress 无目标策略问题关闭**：该 S0 级安全缺陷（插件 egress 无目的地策略、无配置旋钮）已完成处置。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9395

- **Issue #10063（已关闭）— Anthropic 兼容网关拒绝工具结果中的 image_url 块**：该 S1 缺陷已关闭，同类问题 #10501 在 OpenAI 兼容 Provider 上仍处于 Open 状态，说明修复可能尚未覆盖所有兼容层。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10063

**今日关键信号**：49 条 PR 待合并，存在一条由 @JordanTheJet 发起的巨型堆叠安全 PR 链（#10248 → #10275 → #10321，RFC 7141 安全改造 Stage 2–6），覆盖 OIDC 令牌验证、RPC 强制认证、principal 私有内存、会话存储边界、路由层认证、浏览器 PKCE 注册等多个模块，均处于待审查状态。这条链的合并进度将直接决定下一版本的安全能力基线。

---

## 3. 社区热点

今日讨论热度最高的议题全部集中在架构级 RFC 与安全设计决策上：

- **#9487（31 评论）— RFC: 运行时拥有的会话会话与传输面适配器**：提案进入第 5 修订版，讨论聚焦于网关传输与会话生命周期的解耦。值得注意的是，作者明确提出“对第 4 修订版的公开投票不延续，维护者应记录新的讨论窗口再重新开启投票”，反映出社区对 RFC 投票流程的规范性有较高期待。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9487

- **#9488（25 评论）— RFC: 统一文件与附件架构**：第 10 修订版替换了第 9 修订版的投票快照，围绕对话表面的文件/附件处理提出统一架构。与 #9487 同属 @NiuBlibing 发起的架构系列。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9488

- **#6996（20 评论）— RFC

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-02

## 今日速览

项目今日无新版本发布，整体活跃度中等。4 条 Issue 更新全为新开启（无关闭），其中 QQ 频道连接失效（#3349）和飞书配置报错（#3355）为新增 Bug 报告。PR 侧有 5 条动态：2 条关闭（含 1 条合并）、3 条待合并，合并的 #3359 为流程契约类改进，另有 3 条来自社区贡献者的 Telegram 消息上下文修复待并入。最值得关注的是存在近 6 周的 MCP 连接失败导致聊天界面挂起的高热度 Bug（#3269），当前仍未关闭。整体来看，项目功能迭代节奏平稳，社区贡献活跃，但稳定性类 Issue 的闭环速度有待提升。

## 版本发布

无（过去 24 小时无新 Release）

## 项目进展

今日合并/关闭 2 个 PR，核心进展如下：

- **#3359 合并：repository-reviews 契约强制执行**  
  https://github.com/sipeed/picoclaw/pull/3359  
  由 @dkropachev 提交并关闭，重构了 "Repository Reviews" 模块，新增可重建的产品契约（含资源分类、API 引用边界、生命周期/保留规则、确定性验收门禁），并强制执行 `rrw_*` / `rdf_*` / `rrf_*` 资源所有权及 `rfn_*` 兼容性约束。属于工程效能/治理层面改进，不直接影响终端用户功能。

- **#1349 关闭：QQ 频道附件类型支持**  
  https://github.com/sipeed/picoclaw/pull/1349  
  该 PR 历经近 6 个月后于今日关闭（合并或超时关闭待确认）。内容为 QQ 频道支持解析和回复更多附件类型（表情、语音、图片、视频、文件），并优先使用 Markdown 消息回复。若已合并，则对 QQ 频道用户是实质功能补全。

另外有 3 个待合并的社区 PR（均来自 @hugodeco），聚焦消息回复上下文问题：

- #3358：让 agent 的响应线程化到触发消息
- #3357：Telegram 群组中回复 bot 自己消息视为隐式提及
- #3356：回复文件消息时重新附加引用的文档

这 3 个 PR 共同提升了 Telegram 场景下对话连续性，属于体验优化。

## 社区热点

今日最热门的 Issue 是 **#3269 — MCP server 连接失败导致 agent 循环挂起，聊天界面停止回复**（8 条评论，1 个 👍）：  
https://github.com/sipeed/picoclaw/issues/3269

虽然该 Issue 已存在 44 天（7 月 20 日创建），但今日从 stale 状态被激活，说明仍有用户受到影响。核心诉求是：当 MCP（Model Context Protocol）服务器连接异常时，agent 循环会阻塞而非优雅降级，导致整个 Picoclaw 聊天界面不可用。评论区的关注集中在容错与超时机制上。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 是否有修复 PR |
|--------|-------|------|---------------|
| 🟠 高 | [#3269](https://github.com/sipeed/picoclaw/issues/3269) | MCP 连接失败导致 agent 循环 hang，聊天界面停止响应。影响所有使用 MCP 的用户 | ❌ 无 |
| 🟠 高 | [#3349](https://github.com/sipeed/picoclaw/issues/3349) | QQ 频道 gateway 报 401 错误：请求头 Authorization 参数格式错误（code 11241），docker 和 Linux x86 版本均复现 | ⚠️ 可能与 #1349 相关，待确认 |
| 🟡 中 | [#3355](https://github.com/sipeed/picoclaw/issues/3355) | 飞书（Feishu）配置报错——`config.json contains unknown field(s): channel_list.feishu.app_id`，用户按文档配置后无法启动 | ❌ 无 |

其中 #3355 是新提交的配置兼容性问题，需确认是否为字段名变更或文档未同步。QQ 频道的 401 错误则可能与今日关闭的 #1349 改动有关联，建议维护者追溯确认。

## 功能请求与路线图信号

- **#3345 — 轻量级 PicoClaw worker 模式（家庭边缘计算）**  
  https://github.com/sipeed/picoclaw/issues/3345  
  这是当前最重要的路线图信号：用户提议 PicoClaw 在低成本 RISC-V/ARM/MIPS 板子、树莓派、旧 Android 手机上以 "worker 模式" 运行，配合一台更强的主设备组成分布式 agent 网络。该提案戳中了边缘设备 + 个人 AI 助手组合的典型场景。目前仅 1 条评论，尚未有官方回应，但结合 PicoClaw 的定位（嵌入式 AI 助手），该方向具备被纳入 roadmap 的潜力。

- **Telegram 消息上下文改进（#3356/#3357/#3358）**  
  这三个待合并 PR 虽然不是新功能请求，但反映了一个明确的用户体验诉求：在群聊中 bot 的回复应与触发消息正确关联。若合并顺利，预计会进入下一个 nightly 版本，并使 Telegram 渠道的可用性明显提升。

## 用户反馈摘要

- **稳定性敏感度高（#3269）**：用户的根本痛点是 "一旦 MCP 连接异常，整个 agent 就不可用，且没有自动恢复或超时退出机制"。对于依赖 MCP 工具链的用户，这会造成日常使用不可靠的印象。
- **配置门槛与文档一致性（#3355、#3349）**：新用户按配置指引设置飞书和 QQ 频道时遭遇报错，体现了两类问题——文档字段与代码实际接受的不一致（#3355），以及频道渠道的鉴权流程变化未被充分告知（#3349）。这会增加上手成本，对个人开发者用户群的影响尤其明显。
- **对功能演进有正面期待（#3345）**：用户主动提出将 PicoClaw 用于多设备组网场景，说明社区对项目的定位有超出 "单机助手" 的期望，也愿意参与共建。

## 待处理积压

- **#3269（44 天未关闭）— MCP 连接失败导致 agent hang**  
  https://github.com/sipeed/picoclaw/issues/3269  
  高影响力、已有 8 条评论和 1 个 👍，当前无 assignee、无 fix PR。该问题直接影响聊天可用性，建议维护者优先处理或给出临时绕过方案。

- **#3345（8 天未回应）— 轻量级 worker 模式提案**  
  https://github.com/sipeed/picoclaw/issues/3345  
  功能提案尚无官方回应，若产品路线图支持边缘设备组网场景，尽早回复可以维护社区参与感。

- **#1349（近 6 个月存续后今日关闭）— QQ 附件支持**  
  https://github.com/sipeed/picoclaw/pull/1349  
  今日关闭但状态未明确为 "merged"，需确认该 PR 的最终去向。若被关闭未合并，QQ 频道的附件支持将依然缺失，且浪费了贡献者的工作。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 2026-09-02

## 今日速览

- 过去 24 小时项目保持中高活跃度：PR 更新 13 条（3 条已合并/关闭、10 条待合并），无新版本发布，新开 Issue 2 条。
- 核心贡献者 @zvi-fried 的 **provider 契约重构系列**（7 个 PR）仍是当前最主要的工作主线，覆盖运行时、宿主、setup、codex/opencode provider 与 core-owned 配置模型，已进入第 7 天仍未合并，合并冲突风险需关注。
- 两条新 Issue 均由 @DawoudIO 提交，聚焦 `destinations` 命令的真实部署问题，其中 [#3700](https://github.com/nanocoai/nanoclaw/issues/3700) 报告出站发送在目标已删除后仍返回成功，属于误导性的错误报告，建议优先排查。
- 合并的 3 个 PR 均为测试与基础设施性质（依赖升级、测试期望修正），无新功能落地——功能进展仍积压在待合并队列中。
- 整体健康度良好但存在两个隐患：一是错误报告机制可能损害用户信任（#3700），二是 7 个强关联重构 PR 长期未合并，需要核心团队尽快安排批量 review。

## 版本发布

过去 24 小时无新版本发布（最新 Releases 为空），项目仍处于开发迭代周期。

## 项目进展

今日共 3 个 PR 被合并/关闭，均为测试与基础设施改进：

- **[#3698](https://github.com/nanocoai/nanoclaw/pull/3698) 合并：容器运行时版本升级（chore）**
  将 Bun 1.3.12 → 1.4.0、Claude Code 2.1.238 → 2.1.257、Claude Agent SDK 0.3.238 → 0.3.257；CI、registry-skill 验证与发布验证统一使用 Bun 1.4.0。属于无破坏性的基础设施更新，为后续功能铺平道路。

- **[#3672](https://

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-02

## 今日速览

过去 24 小时项目保持高活跃迭代节奏：共处理 PR 18 条（8 条待合并、10 条已合并/关闭），Issues 9 条（3 条打开、6 条关闭）。核心进展集中在 WebUI 组件统一、NEAR AI 模型能力透传、agent-loop 代码结构重构以及 Slack 集成修复。值得关注的是，一个已连续失败 33 次的 Slack canary 测试终于被定位并修复，同时新一周的 Dogfooding & QA 史诗任务已开启，说明项目正处于密集的自测与加固周期。无新版本发布。

---

## 项目进展

今日合并/关闭的 PR 数量达 10 条，覆盖了大量结构性改进。以下按主题归类：

**模型能力透传链路打通**

- **#7998** feat(llm): preserve NEAR AI model capabilities through discovery — 新增 provider-neutral 模型目录条目，保留旧 API 的同时提供增量 `list_model_catalog()` 发现能力（[链接](https://github.com/nearai/ironclaw/pull/7998)）
- **#7997** feat(webui): show model capability icons across Inference — 在推理模型选择界面上渲染 Text/Image 输入与输出能力图标，支持悬停描述与无障碍标签（[链接](https://github.com/nearai/ironclaw/pull/7997)）

**agent-loop 代码结构重构**

- **#8028** refactor(agent-loop): align state and stage ownership — 将检查点状态拆分为内聚的模块，同时保持公共路径和序列化字节不变（[链接](https://github.com/nearai/ironclaw/pull/8028)）
- **#8031** refactor(agent-loop): decompose capability stage mechanics — `capabilities.rs` 从 2,938 行缩减至 890 行，保留唯一的 `CapabilityStage::process` 执行路径（[链接](https://github.com/nearai/ironclaw/pull/8031)）

**Slack 集成修复**

- **#8027** fix(live-qa): find the Slack run by message identity, not envelope event_id — 修复自 08/28 起连续 33 次失败的 canary 测试，根因是 harness 依赖了错误的 event_id 查找 run（[链接](https://github.com/nearai/ironclaw/pull/8027)）
- **#8014** fix(slack): preserve explicit mentions across callback dedup — 当 Slack 同时传递 `message` 和 `app_mention` 回调时保留显式 @提及（[链接](https://github.com/nearai/ironclaw/pull/8014)）

**WebUI 组件统一**

- **#8024** feat(webui): use shared SearchField for Workspace and Logs — 为共享 `SearchField` 新增紧凑尺寸，并迁移 Workspace 树和 Logs 目标过滤器（[链接](https://github.com/nearai/ironclaw/pull/8024)）
- **#8023** refactor(webui): adopt shared components in Extension Configure — 密码输入迁移至共享 `Input`，本地状态消息改用 `InlineNotice`（[链接](https://github.com/nearai/ironclaw/pull/8023)）
- **#8022** refactor(webui): migrate Automations notices to InlineNotice — 自动化页面和通知渠道面板的加载/保存反馈统一至共享组件（[链接](https://github.com/nearai/ironclaw/pull/8022)）

**工程基础设施**

- **#8013** ci: parallelize affected crate tests with nextest — 使用 nextest 以 4 个测试进程并行运行受影响包的测试，缩短 CI 反馈时间（[链接](https://github.com/nearai/ironclaw/pull/8013)）

项目整体朝着"组件复用 + 模型能力可见 + agent-loop 可维护性"三个方向扎实前进了一步。

---

## 社区热点

今日公开评论数整体偏低（几乎都为 0），但几个议题的关注度从其更新频率和上下文可见一斑：

- **#7921** [OPEN] [p2] perf(llm): OpenAI-family backends send no prompt_cache_key — measured ~82%→29% cache-hit collapse past ~200 calls — 该性能问题 8/27 创建，今天仍有更新，说明维护者或社区在持续跟进。核心痛点：OpenAI 系后端未实现 prompt caching，导致长时间对话中缓存命中率从 82% 骤降至 29%（[链接](https://github.com/nearai/ironclaw/issues/7921)）

- **#8026** [OPEN] Epic: Dogfooding & QA bug fixing 08/31/2026 - 09/06/2026 — 新一周 QA 史诗开启，无具体描述，仅作为团队内部自测和缺陷修复的收口容器（[链接](https://github.com/nearai/ironclaw/issues/8026)）

- **#8006** [OPEN] feat(channels): add durable progressive replies and native Slack Agent UI — 大型功能 PR（size: XL），涉及 Slack Agent UI 的实质性增强，目前仍待合并，值得关注其后续演进（[链接](https://github.com/nearai/ironclaw/pull/8006)）

整体来看，今日社区活跃度主要由团队驱动的重构与修复贡献，外部用户主动反馈相对较少。

---

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| 高（性能） | #7921 | OpenAI 系后端缺少 prompt_cache_key 导致缓存命中率从 82% 崩至 29%（约 200 次调用后） | 打开，无关联 fix PR（[链接](https://github.com/nearai/ironclaw/issues/7921)） |
| 中（功能性） | #8025 | 输入包含特殊字符时输出错误，内容被截断或直接报错，疑似与上次编码变更有关 | 打开，无 fix PR（[链接](https://github.com/nearai/ironclaw/issues/8025)） |
| 中（测试稳定性） | #8027 | Slack canary 测试连续 33 次失败，根因是使用错误的 event_id 查找 run | 已修复并合并（[链接](https://github.com/nearai/ironclaw/pull/8027)） |
| 低（边缘场景） | #8014 | Slack 将同一帖子同时作为 `message` 和 `app_mention` 回调时，显式 @提及丢失 | 已修复并合并（[链接](https://github.com/nearai/ironclaw/pull/8014)） |

其中 #8027 的修复对项目健康度有显著意义——它解除了持续 5 天的定时验证红灯，且修复方式（按消息身份而非 envelope event_id 查找）更为稳健。

---

## 功能请求与路线图信号

- **新 QA 周期启动**：#8026 开启了 08/31-09/06 的 Dogfooding & QA 史诗，叠加此前 #7843（上一周期）已关闭，表明项目有规律的自测节奏，下一版本发布前的质量加固正在推进（[链接](https://github.com/nearai/ironclaw/issues/8026)）

- **Slack Agent 体验增强**：#8006 提出"durable progressive replies + native Slack Agent UI"，结合 #8029（以 accepted outcome 而非 dispatch routing 驱动 Slack 准入），Slack 侧的用户交互体验正在被系统性完善（[链接](https://github.com/nearai/ironclaw/pull/8006)）

- **WebUI 会话事件传输统一**：#8010 实现 session-event transport 统一 + web-app run-completion 通知，这是一项较大规模的 WebUI 架构调整，若合并将为多端实时体验打基础（[链接](https://github.com/nearai/ironclaw/pull/8010)）

- **UI 组件标准化趋势**：从 #8024/#8023/#8022 合并的模式可以看出，项目正逐步用共享组件替换各处本地样式实现，这通常会为后续 UI 一致性和可维护性带来长期收益。

从当前 PR 分布看，下一版本大概率包含：模型能力图标展示、Slack 交互增强、agent-loop 重构后的性能提升以及 WebUI 组件标准化更新。

---

## 用户反馈摘要

- **特殊字符处理问题**：#8025 由新用户 @kapibarazoku0422-create 报告，描述在输入字段使用特殊字符时输出异常——字符被剥离或触发错误。用户推测与上次发布的编码变更有关，但目前仅有 1 条评论、0 个 👍，尚未获得维护者的公开确认。建议后续复现并确认是否与特定输入法或 Unicode 组合字符有关（[链接](https://github.com/nearai/ironclaw/issues/8025)）

- **性能退化敏感度**：虽然 #7921 属于开发者自测而非外部用户报告，但其反映的场景（长时间多轮对话后缓存命中率骤降）与真实用户使用大模型 Agent 的体验直接相关。用户可能感知到响应速度逐渐变慢或成本上升（[链接](https://github.com/nearai/ironclaw/issues/7921)）

- **内部反馈循环有效**：连续 33 次 canary 失败被 #8027 定位并修复，说明项目的自监测机制（scheduled canary run）在真实有效地捕捉回归问题，且修复动机明确（"every scheduled canary run has failed"）。

整体用户侧主动反馈较少，更多是开发团队通过 dogfooding 和 canary 机制发现并修复问题。

---

## 待处理积压

以下事项已持续一段时间未获得合并或关闭，建议维护者关注：

- **#7020** [OPEN] chore(deps): bump tokio-tungstenite from 0.29.0 to 0.30.0 — 依赖更新 PR 自 08/02 起已打开整整 31 天。版本跨度较大，涉及 tokio-ecosystem 组。可能存在兼容性顾虑未解决，但长期滞留会加剧技术债（[链接](https://github.com/nearai/ironclaw/pull/7020)）

- **#7984** [OPEN] fix(tools): size tool_search replies to the first-look envelope — 工具搜索回复大小优化 PR，自 08/28 起打开，今天收到更新。实测显示回复从 16,066 B 压缩到模型实际感知的 857 B，但尚未合并（[链接](https://github.com/nearai/ironclaw/pull/7984)）

- **#8025** [OPEN] Bug: unexpected behavior with special characters in input — 1 天前报告的特殊字符 bug，尚无维护者响应。若不及时回复可能影响新用户的信任感（[链接](https://github.com/nearai/ironclaw/issues/8025)）

- **#7921** [OPEN] [p2] OpenAI-family backends send no prompt_cache_key — 此性能问题已打开 6 天且涉及核心推理链路，目前没有关联的 fix PR。解决方案可能需要跨后端统一 prompt caching 策略，建议排期评估（[链接](https://github.com/nearai/

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-02

## 1. 今日速览

今日项目整体活跃度中等，以沉淀和发布准备为主。Issue 侧共更新 8 条，其中 6 条为 4 月创建的老 Issue 被 stale 机制自动关闭，人工新增讨论较少；PR 侧更新 13 条，其中 6 条于近两日完成合并/关闭，集中在引导流程优化、视频分享、Windows 安装修复和发布分支调整，另有 1 条安全加固 PR（#2590）尚待合入。整体看，项目正处于 8 月版本发布收尾窗口，社区反馈的热点 Bug 已有一批对应的修复 PR 在队列中待合并。

## 2. 版本发布

今日无新版本发布（Releases: 0）。

值得关注的是，PR [#2597](https://github.com/netease-youdao/LobsterAI/pull/2597) 将 in-app browser 功能从 `release/2026.8.31` 发布线中 revert（回退），表明该版本即将或已进入发布阶段，但内置浏览器功能被推迟至后续版本。使用 2026.8.31 版本的用户不会看到该功能。

## 3. 项目进展

今日有 6 条 PR 完成合并/关闭，主要推进方向如下：

**发布分支管理**
- [#2597](https://github.com/netease-youdao/LobsterAI/pull/2597) revert(browser): 从 2026.8.31 发布线移除内置浏览器功能，保留特性分支与合并历史以便后续重新应用。

**新功能落地**
- [#2593](https://github.com/netease-youdao/LobsterAI/pull/2593) feat(artifacts): 支持模型生成视频的分享功能，保留任务 ID 与输出序号溯源、禁止本地视频绕过来源校验、复用分享权限体系，并补充测试与接入文档。

**体验优化与修复**
- [#2594](https://github.com/netease-youdao/LobsterAI/pull/2594) fix(onboarding): 精简引导流程的光标尺寸、加速结果浮层展示、平滑入场动画，并修复切到输入提示步骤时的一帧布局闪烁。
- [#2596](https://github.com/netease-youdao/LobsterAI/pull/2596) fix(analytics): 为聊天界面登录 CTA 点击补充埋点上报并更新分析规范。
- [#2592](https://github.com/netease-youdao/LobsterAI/pull/2592) 用户引导（user guide）相关修复。

**平台构建稳定性**
- [#2595](https://github.com/netease-youdao/LobsterAI/pull/2595) fix(platform: windows): NSIS 安装包新增 Web 临时盘预检逻辑。

综合来看，今日合入内容以小型 UI/UX 打磨和发布治理为主，项目整体向更稳定的发布状态迈进。

## 4. 社区热点

今日无高热度新讨论，评论最多的是以下被 stale 机制关闭（不代表问题已解决）的历史 Issue：

- [#1569](https://github.com/netease-youdao/LobsterAI/issues/1569)（6 条评论，已关闭）「提问后不运行，也不显示任何信息」，用户反馈程序卡死且无日志输出，排查困难。
- [#1561](https://github.com/netease-youdao/LobsterAI/issues/1561)（3 条评论，已关闭）「模型无法获取上传的文件」，用户指出新版本改动导致文件不再进入 project 目录，模型感知不到文件上下文。
- [#1566](https://github.com/netease-youdao/LobsterAI/issues/1566)（3 条评论，已关闭）「最新版本无论输入什么都回复相同内容」，用户怀疑模型输出被固定，附带了完整日志包。

诉求核心：旧版本功能回归（文件目录行为/回复卡死）是用户最敏感的痛点，且 stale 自动关闭可能让用户感到问题未被真正解决。建议维护者审核这些 Issue 后重新打开或转为追踪任务。

## 5. Bug 与稳定性

按严重程度排列（⚠️ = 有对应修复 PR，但尚未合入）：

**高严重 — 并发导致数据损坏/消息丢失**
- [#1099](https://github.com/netease-youdao/LobsterAI/issues/1099)（Open）IM 消息并发处理缺少串行化，导致重复会话创建和消息响应丢失。⚠️ 修复 PR [#1100](https://github.com/netease-youdao/LobsterAI/pull/1100) 已提交 5 个月未合并。
- [#1089](https://github.com/netease-youdao/LobsterAI/issues/1089)（由 PR 提及）CoworkRunner `startSession`/`continueSession` 并发调用导致流式消息损坏和消息重复。⚠️ 修复 PR [#1090](https://github.com/netease-youdao/LobsterAI/pull/1090) 待合并。

**中严重 — 功能回归**
- [#1561](https://github.com/netease-youdao/LobsterAI/issues/1561)（已 stale 关闭）上传文件后模型无法感知，系新版本行为变化。无对应修复 PR。
- [#1566](https://github.com/netease-youdao/LobsterAI/issues/1566)（已 stale 关闭）任意输入回复相同内容，附日志。无对应修复 PR。
- [#1551](https://github.com/netease-youdao/LobsterAI/issues/1551)（已 stale 关闭）网络环境切换导致网关反复重启。无对应修复 PR。

**低严重 — 体验/文案**
- [#1563](https://github.com/netease-youdao/LobsterAI/issues/1563)（已 stale 关闭）流量包服务条款页面存在文字错误。

**安全加固（新增）**
- [#2590](https://github.com/netease-youdao/LobsterAI/pull/2590)（Open）对 MCP stdio 命令参数和外部 URL 增加边界校验，防止 shell 元字符注入与协议白名单缺失风险，建议优先合入。

## 6. 功能请求与路线图信号

今日没有新提交的功能请求，近期用户及开发者提出的需求/增强如下：

- **会话内容全文搜索**（PR [#1125](https://github.com/netease-youdao/LobsterAI/pull/1125)，Open）：在现有标题搜索基础上扩展消息内容全文搜索、上下文摘要与关键词高亮，已待合并 5 个月，预计可进入下一版本。
- **快捷恢复手段**（Issue [#1567](https://github.com/netease-youdao/LobsterAI/issues/1567)，已 stale 关闭）：用户建议输入框提供“停止当前话题/压缩上下文”快捷按钮，或提供操作指令 help。此需求与 #1566、#1569 相关联，属于高危故障下的自救能力，建议结合对话状态管理一并考虑。
- **Docker 沙箱就绪探测**（PR [#1103](https://github.com/netease-youdao/LobsterAI/pull/1103)，Open）：在设置界面展示 Docker 守护进程可用性（read-only probe），帮助用户提前判断沙箱功能是否可用。PR 描述明确本轮不改执行模式，属渐进式铺垫。
- **视频分享能力**（PR [#2593](https://github.com/netease-youdao/LobsterAI/pull/2593)，今日已合并）：已随下一个版本发布，支持模型生成视频的来源溯源与安全分享。

## 7. 用户反馈摘要

从今日 Issues 中提炼真实用户声音：

- **「无反馈错误」最挫败**：#1569 用户反馈“提问后不运行，也不显示任何信息”，连日志也没有，导致用户完全无法自我排查。这指向错误提示与运行状态展示的缺失。
- **隐式行为变更招致不满**：#1561 用户指出“以前传文件后文件会放到 project 目录下，模型知道从目录搜索”，新版本改变了这一行为且未告知，模型不知道有上传文件。用户对文件上传的工作机制有明确预期，行为变更应通过更新说明或 UI 提示同步。
- **功能回归影响信任**：#1566 用户报告“无论输入什么都回复相同内容”，且版本为 2026.4.3。这类问题如果复现率高，会严重损害对模型稳定性的信任，用户主动附带日志压缩包也体现出配合修复的意愿。
- **网络切换场景受关注**：#1551 用户报告网络环境切换导致网关反复重启，恢复原网络后即恢复正常。笔记本、外勤等移动场景下此类问题影响明显。

## 8. 待处理积压

以下项目长期未获响应或未合并，请维护者重点关注：

**高优先级 — 并发类 Bug 修复 PR 滞留 5 个月**
- [#1100](https://github.com/netease-youdao/LobsterAI/pull/1100)（2026-03-31 创建，Open）修复 IM 并发导致重复会话与消息丢失，直接对应未关闭 Issue [#1099](https://github.com/netease-youdao/LobsterAI/issues/1099)。
- [#1090](https://github.com/netease-youdao/LobsterAI/pull/1090)（2026-03-31 创建，Open）修复 CoworkRunner 并发调用导致流式消息损坏/重复。

**高优先级 — 新提交的安全加固**
- [#2590](https://github.com/netease-youdao/LobsterAI/pull/2590)（2026-09-01 创建，Open）MCP stdio 命令与外部 URL 校验，涉及命令注入面，建议尽快安排 review。

**中优先级 — 用户功能 PR**
- [#1125](https://github.com/netease-youdao/LobsterAI/pull/1125)（2026-03-31 创建，Open）会话内容全文搜索与关键词高亮。
- [#1101](https://github.com/netease-youdao/LobsterAI/pull/1101)（2026-03-31 创建，Open）跨 provider 切换模型后立即发消息偶发「模型服务调用失败」的竞态修复。
- [#1102](https://github.com/netease-youdao/LobsterAI/pull/1102)（2026-03-31 创建，Open）定时任务启停开关增加 tooltip 提示。
- [#1103](https://github.com/netease-youdao/LobsterAI/pull/1103)（2026-03-31 创建，Open）Docker 沙

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 | 2026-09-02

## 今日速览

Moltis 项目今日活跃度中等，主要集中于 HTTP MCP 服务器验证修复与推理能力增强两个方向。共关闭 1 个 Bug Issue（#1250）、合并 1 个对应修复 PR（#1251），另有 2 个 PR 待合并，1 个新版本（20260902.01）已发布。项目在响应速度上表现优秀——Bug 从报告到修复闭环仅用一天，体现了健康的维护节奏；同时 `@reasoning-max` 的新功能 PR 表明项目仍在积极扩展核心能力面。

## 版本发布

### 20260902.01
- **发布日期**：2026-09-02
- **要点**：结合今日 PR/Issue 动态，该版本大概率包含 `streamable-http` MCP 服务器验证修复以及可能的推理能力增强。
- **破坏性变更**：未发现明确破坏性变更说明。
- **迁移注意事项**：请 `streamable-http` MCP 用户升级后重新运行 `moltis doctor` 验证状态；若使用 `docker compose` 部署，注意 #1252 提及的 bind-mount 权限问题可能仍存在于旧配置中。建议关注 Release 页面获取完整变更日志。

## 项目进展

### 已合并/关闭
- **PR #1251: Fix doctor validation for streamable HTTP MCP servers**（[链接](https://github.com/moltis-org/moltis/pull/1251)）— 核心修复：将 MCP 传输类型提取为共享的 typed 定义，使 `doctor` 正确识别 `streamable-http` 及别名；并对字面量/配置解析后的 URL 进行验证，对凭证存储占位符降级为信息提示。该 PR 直接修复了今日关闭的 Issue #1250，解决了实际用户痛点，标志着 `moltis doctor` 对远程 MCP 服务器的诊断能力显著增强。

### 待合并（信号）
- **PR #1253: feat(reasoning): add max effort level**（[链接](https://github.com/moltis-org/moltis/pull/1253)）— 为推理链新增 `max` 档位，并扩展 `@reasoning-max` 模型后缀解析，同时针对不支持该档位的 Provider 做兼容处理。
- **PR #1252: docs(docker): document the bind-mount permission fix for fresh deploys**（[链接](https://github.com/moltis-org/moltis/pull/1252)）— 为全新部署时的 bind-mount 权限问题提供文档修复，关闭了 #293。

**整体节奏**：项目今日修复 1 个实际 Bug，新增 1 个功能提案，另有 1 个文档改进，前进步伐稳健。

## 社区热点

今日社区讨论集中于 #1250 及对应修复 PR #1251，核心关注点为**远程 MCP 服务器的 doctor 诊断误报**。

- **Issue #1250**（[链接](https://github.com/moltis-org/moltis/issues/1250)）：用户 @xorets 报告 `moltis doctor` 将配置正确且可正常工作的 `streamable-http` MCP 服务器误判为故障，原因在于其没有 stdio 命令。该 Issue 虽无评论，但迅速获得官方 PR 修复，说明此类问题可能并非个例，且与多 MCP 传输协议兼容性相关。
- **PR #1251**（[链接](https://github.com/moltis-org/moltis/pull/1251)）：修复方案引入共享的 typed MCP transport 定义，背后诉求是**让 Moltis 的诊断逻辑与 MCP 协议演进的多样性保持一致**。

## Bug 与稳定性

### 已修复
- **[中] `moltis doctor` 误报 streamable-http MCP 服务器缺失命令**（Issue #1250，[链接](https://github.com/moltis-org/moltis/issues/1250)）：影响所有使用 `streamable-http` 传输方式部署的服务器，导致健康检查误判。该问题已由 PR #1251（[链接](https://github.com/moltis-org/moltis/pull/1251)）在当日修复并合并，闭环速度优秀。

### 风险提示
- **PR #1252 的文档修复对应 Issue #293**：涉及全新部署时 `docker compose up` panic（无法打开 `moltis.db`），虽然属于部署配置问题而非核心代码 Bug，但会影响新用户的第一体验，值得关注修复进度。

## 功能请求与路线图信号

- **推理能力增强**（PR #1253，[链接](https://github.com/moltis-org/moltis/pull/1253)）：新增 `max` 推理等级，并向下兼容不支持该等级的 Provider。这是一个明确的功能迭代方向——在推理模型的差异化能力上保持前沿，并兼顾生态兼容。若合并，`max` 档位大概率进入下一版本。
- **远程 MCP 服务器的深度诊断**（PR #1251 蕴含的后续方向）：对凭证存储占位符的“信息性提示”处理暗示未来可能支持更复杂的远程服务器配置校验。

## 用户反馈摘要

- **实际使用场景**：用户 @xorets 使用远程 `streamable-http` MCP 服务器（配置了 `transport` 与 `url`），在 `moltis doctor` 健康检查时遇到误报。配置文件简洁标准（`transport = "streamable-http"`, `url = "http://example:3131/mcp"`, `display_name`），说明这是典型生产配置，而非边缘用法。
- **痛点**：诊断工具对本应支持的标准配置产生“假阳性”，会削弱用户对 `doctor` 的信任度。这提醒项目方在支持新协议传输方式时，诊断逻辑需同步更新。
- **无声案例**：Issue #1250 无评论、高响应（当日关闭），说明用户可能尚未展开讨论便已获得解决，体验良好。

## 待处理积压

- **PR #1252 / Issue #293（[PR 链接](https://github.com/moltis-org/moltis/pull/1252)、[Issue #293](https://github.com/moltis-org/moltis/issues/293)）**：全新 Docker 部署时因 bind-mount 权限问题导致 gateway panic。该 Issue 已由 PR 提供文档修复方案，但尚未合并，建议维护者尽快处理，减少新用户摩擦。
- **PR #1253 推理能力增强**：功能完整、涉及界面多端（schema、路由、前端 selector），建议在 CI 通过后尽快合并，避免长分支漂移。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-02

> 数据来源：github.com/agentscope-ai/QwenPaw（以下链接均指向该仓库）

---

## 1. 今日速览

过去 24 小时项目保持高活跃度：**26 条 Issue 更新（15 条新开/活跃、11 条关闭）、40 条 PR 更新（15 条合并/关闭）**，并发布 `v2.2.0-beta.6`，同时 `v2.2.0b7` 版本号已提交。当前社区关注焦点集中在三类问题上：**cron 任务误触发/补发、自定义 Provider 配置回归、多 agent 任务执行可见性**。安全治理模块出现 2 条高危 Issue（#7443 指令绕过、#7496 CRITICAL 规则行为异常），已有对应修复 PR 提交。整体来看，项目迭代节奏快，社区反馈积极，但稳定性回归问题仍需关注。

---

## 2. 版本发布

### v2.2.0-beta.6（2026-09-01 发布，安装验证已于今日通过）

**包含的变更：**

- **fix(desktop): bundle ReMe entry-point plugins**（#7458）— 修复 ReMe 记忆插件在桌面端打包后未随主程序加载的问题
- **test(console): 扩展 console 单元测试**（#7452）— 新增 **617 个测试用例，语句覆盖率提升 +10.61pp**，显著加强前端稳定性保障

**破坏性变更：** 无明确破坏性变更。

**迁移注意事项：** 建议桌面端用户升级后检查 ReMe 记忆功能是否正常加载；若使用自定义 Provider，需关注 #7474 中 `ModelInfo.max_tokens` → `max_output_length` 迁移可能带来的配置兼容问题（详见下方 Bug 部分）。

**后续版本信号：** PR #7485 已将版本号提升至 **v2.2.0b7**，下一迭代版本已在构建中。

---

## 3. 项目进展

今日合并/关闭的重要 PR 及对应进展：

| PR | 内容 | 意义 |
|---|---|---|
| [#7473](https://github.com/agentscope-ai/QwenPaw/pull/7473) | fix(webui): MCP 区块容器暗色模式修复 | 修复暗色模式下 MCP Clients 页面白色矩形背景问题（对应 Issue #7471） |
| [#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465) | fix(memory): 规范化不同 embedding 后端的维度配置 | 修复 DashScope Embedding 索引重建被误判为未保存的问题（对应 Issue #7464） |
| [#7452](https://github.com/agentscope-ai/QwenPaw/pull/7452) | test(console): +617 测试用例 | 前端测试覆盖率提升 10.61pp，质量基建持续加强 |
| [#7341](https://github.com/agentscope-ai/QwenPaw/pull/7341) | test(integration): 覆盖冲刺批次 5 — 495 个用例 | 集成测试覆盖端点契约、CLI 和模块内部 |
| [#7260](https://github.com/agentscope

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报

**日期：2026-09-02** | 数据来源：GitHub (github.com/gaoyangz77/easyclaw)

---

## 1. 今日速览

今日项目活跃度处于**低位稳定**状态：过去24小时内无新开/关闭的 Issue，也无提交或合并的 PR，社区讨论暂歇。但同日连续发布 **2 个版本（v1.9.0、v1.9.1）**，说明开发侧仍在稳步推进，属于"集中发布、消化讨论"的节奏。v1.9.0 侧重引擎升级与兼容性修复，v1.9.1 带来 Agent Office 可视化功能及隐私安全记录能力，整体项目健康度良好，无阻塞性问题。建议关注后续用户对新版本功能的反馈。

---

## 2. 版本发布

### 🎉 v1.9.1 —— TK Copilot v1.9.1
> 发布链接：[v1.9.1 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.1)

**主要更新：**
- **像素风 Agent Office**：将各部门（Agent）运行状态以像素画风格可视化呈现，并支持作为 Desktop 屏保运行，增强可观测性与桌面趣味性。
- **隐私安全的办公室活动记录**：记录办公活动数据，保障隐私前提下支持未来回放；同时确保面板（Panel）与网关（Gateway）事件流保持同步。

**破坏性变更：** 无（此版本未涉及底层数据或接口变更）。

**迁移注意事项：** 若使用屏保功能，建议在桌面环境配置中手动指定新增的 Agent Office 屏保程序；活动记录功能需确认存储路径权限。除此之外无需数据迁移。

---

### 🎉 v1.9.0 —— TK Copilot v1.9.0
> 发布链接：[v1.9.0 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.0)

**主要更新：**
- **OpenClaw 引擎升级至 v2026.8.1**：
  - 支持**原子化旧数据库迁移**，降低升级过程的数据损坏风险；
  - 新增**可靠的全局默认模型切换**机制，切换模型时仅重启网关而不影响现有会话。
- **移除 NVIDIA 提供商支持**：不再支持 NVIDIA 作为模型/算力提供方。
- **错误提示增强**：在界面中更清晰地展示激活与网关重启的错误。

**破坏性变更：**
- ⚠️ **移除 NVIDIA 提供商支持**：若现有配置依赖 NVIDIA 提供商，升级后需迁移至其他受支持的提供商。
- 数据库迁移为一次性操作，升级后不可回退到旧版数据库格式。

**迁移注意事项：**
1. 升级前请**备份数据库**，虽然采用原子迁移，仍建议保留备份。
2. 若原配置使用 NVIDIA，请提前切换至其他 Provider 并测试连通性。
3. 全局默认模型切换会短暂重启网关，属预期行为，客户端会自动重连。

---

## 3. 项目进展

过去 24 小时内暂无 PR 合并或关闭记录（[PRs 页面](https://github.com/gaoyangz77/easyclaw/pulls)）。

不过从 v1.9.0 与 v1.9.1 的连续发布来看，项目实际上完成了以下**重大推进**：

- **引擎基础升级完成**：OpenClaw v2026.8.1 的接入标志着底层引擎的大版本同步，为后续功能开发铺平道路；
- **可观测性建设**：Agent Office 提供了可视化 + 可回放的运行全景，是项目从"工具"向"平台"演进的一个重要信号；
- **稳定性和体验优化**：模型切换到不含会话中断的优雅重启、错误信息可视化，均属于开发者体验关键改进。

**综合判断**：项目在该周期内完成了"引擎升级 → 功能可视化"的阶段性一步，技术债得到部分清理，整体向前迈进了约一整个迭代周期。

---

## 4. 社区热点

过去 24 小时无新增或活跃的 Issue/PR 讨论（[Issues 页面](https://github.com/gaoyangz77/easyclaw/issues)）。

结合最新版本内容，可预判社区后续的关注热点：

- **NVIDIA 支持移除**：这通常会引起社区较大反响，尤其是依赖 NVIDIA 推理的开发者，可能就迁移路径、替代方案展开讨论；
- **Agent Office 像素风与屏保玩法**：这类视觉化功能易在社区引发"晒配置""主题自定义"类话题。

请维护者关注未来 48 小时内的用户反馈，尤其是针对 v1.9.0 破坏性变更的讨论。

---

## 5. Bug 与稳定性

过去 24 小时未报告新的 Bug、崩溃或回归问题。

**版本说明中的稳定性相关信息：**
- v1.9.0 引入的"全局默认模型切换重启网关"机制，从设计上避免了会话中断，是对近期稳定性类反馈的主动修复；
- v1.9.1 强调"保持面板和网关事件流同步"，也暗示了此前可能存在事件同步偏差的修复。

**潜在风险提醒：**
- ⚠️ **数据库迁移**：v1.9.0 的原子化迁移虽减小了风险，但涉及大数据库时建议密切关注迁移耗时与日志；
- ⚠️ **NVIDIA Provider 下线**：这属于有意为之的兼容性移除，而非缺陷，但可能造成升级后运行时错误（如配置残留），建议发布升级指引。

当前无已知的严重（Severity: High/Critical）未解决 Bug。

---

## 6. 功能请求与路线图信号

无新功能请求提交，但版本内容释放了明确的路线图信号：

| 信号 | 来源 | 推测方向 |
|------|------|----------|
| 像素风 Agent Office + 屏保 | v1.9.1 | 项目可能向"桌面化 / 轻量展示层"演进，或计划推出独立桌面客户端 |
| 活动记录 + 回放 | v1.9.1 | 为接下来的"智能复盘""流程分析"类功能做数据层铺垫 |
| 全局模型切换并发会话保持 | v1.9.0 | 在多模型、多租户场景下的高可用能力布局 |
| 移除 NVIDIA | v1.9.0 | 资源聚焦，可能为自研推理适配（或与某云厂商深度合作）让路 |

以上均为基于版本的推测，后续可结合用户反馈加以验证。

---

## 7. 用户反馈摘要

今日无新增用户评论（[Issues 评论时间线](https://github.com/gaoyangz77/easyclaw/issues)），暂无原始语料可提炼。

参考历史反馈模式，预计用户对本次更新的核心关切点包括：

- **升级成本**：v1.9.0 的数据库迁移是否顺畅、是否有意外阻塞；
- **NVIDIA 替代方案**：哪些 Provider 可平替，迁移成本多高；
- **Screen Saver 功能兼容性**：是否支持多显示器、是否影响系统休眠；
- **事件流同步**：面板中的活动记录是否准确反映真实执行状态。

建议在 README 或 Release notes 中附上常见问题解答（FAQ），以降低用户升级门槛。

---

## 8. 待处理积压

当前**无长期未响应的重要 Issue 或 PR** 需要提醒维护者关注：

- 公开 Issue 列表为空（或近 24 小时无更新）；
- PR 队列为空。

项目无积压债务，维护响应状态健康。建议维护者：

1. 趁社区安静期，在讨论区或 Discord/微信群发布 v1.9.x 的**升级指引与变更详解**，主动引导用户平滑升级；
2. 对新版本可能引发的配置错误，做好 issue 模板中的版本信息采集，便于快速定位问题。

---

> **日报总结**：EasyClaw 在 2026-09-02 处于"发布后预热期"，社区静默但项目在前进。主线是引擎升级（v1.9.0）+ 可视化可观测（v1.9.1）。没有新问题出现是积极的信号，但大力度的破坏性变更（NVIDIA 移除、数据库迁移）需要关注未来一周的用户反馈。整体项目健康度：**良性发展**。

*数据快照时间：2026-09-02 24:00 UTC · 下次日报预计覆盖 48h 窗口以观察新版本反馈*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*