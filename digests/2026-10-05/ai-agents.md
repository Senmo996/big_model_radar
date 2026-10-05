# OpenClaw 生态日报 2026-10-05

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-05 02:53 UTC

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

# OpenClaw 项目动态日报 — 2026-10-05

## 1. 今日速览

过去 24 小时 OpenClaw 仓库保持极高活跃度：共发生 **500 条 Issue 更新**（新开/活跃 359，关闭 141）与 **500 条 PR 更新**（待合并 299，合并/关闭 201），平均不到 3 分钟就有一条 Issue/PR 状态变化。无新版本发布。热度集中在**消息送达可靠性（message-loss）**、**会话状态一致性（session-state）**、**安全边界（security）** 与 **更新/回滚流程稳定性** 四大主题，多个 P0/P1 Bug 积压并带有 `clawsweeper:no-new-fix-pr` 标记，说明维护者对部分高危问题的响应仍显不足；但 201 条 PR 被合并/关闭，合并管线本身运转顺畅。社区关注度最高的 Issue 是 #42475（每 Agent 成本预算，25 评论），已悬置近 7 个月。

---

## 2. 版本发布

今日无新版本 Release。最新稳定版本仍为 **2026.9.8**（2026-10-03 发布），但该版本已出现多项更新路径回归（详见下文 #164066、#164396、#164422）。

---

## 3. 项目进展

今日关闭的 PR 中较重要的有：

- **[#165284] fix: terminal outcome type cycle fails architecture CI** — [链接](https://github.com/openclaw/openclaw/pull/165284)
  修复了 CI 因 terminal-error 包装器与 outcome 类型之间的循环依赖而失败的问题，将类型导入改为从叶子模块引用。*已关闭（今日创建，当日关闭）*
- **[#165285] fix: align metadata browser checks with compact catalog refreshes** — [链接](https://github.com/openclaw/openclaw/pull/165285)
  修复 #165281：metadata-observation 浏览器测试期望行为与 #165190 移除的 compact catalog 重复数据不一致。*已关闭*

值得关注的活跃 PR（未合并但接近就绪）：

- **[#165291] fix(agents): finalize tool-authored replies at batch boundaries** — [链接](https://github.com/openclaw/openclaw/pull/165291)
  修复插件作者返回的最终回复被模型重复陈述、隐藏同级失败、或被结果中间件撤回的问题。XL 级变更，涉及安全敏感文件，关联 #164558。
- **[#165129] refactor(cron): hold message authority for remaining transports and delete the native checker** — [链接](https://github.com/openclaw/openclaw/pull/165129)
  cron 消息权威性重构第二部分，覆盖十余种消息通道，消除 Gateway 线程上的同步 SQL 与未经授权的 provider 调用。
- **[#164607] feat: manage channel identity links in the existing Profile** — [链接](https://github.com/openclaw/openclaw/pull/164607)
  为 Profile 管理新增频道身份关联 UI，管理员无需手动编辑配置即可将频道发送者与 Profile 绑定（关联 #162164）。

整体判断：项目处于**功能重构与稳定性修复并行**的高速迭代期，`deslop` 系列内部清理（#165198/#165288/#165225/#165276）在持续降低维护成本，但对外可见的新功能推进速度相对放缓。

---

## 4. 社区热点

今日讨论度最高的 Issues（评论数 ≥ 14）：

- **[#42475] [Feature]: Per-agent cost budget enforcement at the gateway level**（25 评论） — [链接](https://github.com/openclaw/openclaw/issues/42475)
  要求网关在调用模型前强制每日/每月每 Agent 成本上限。该需求自 2026-03-10 提出以来已积累 7 个月讨论，是社区最渴望的运营能力之一。现状 `session-cost-usage.ts` 仅做会话级追踪，无法阻止失控支出。
- **[#97616] [Bug]: OpenClaw leaks unreaped hook/tool child processes**（18 评论） — [链接](https://github.com/openclaw/openclaw/issues/97616)
  回归性 Bug：`openclaw-hooks`、`bash`、`codex` 等子进程未被回收，长时间运行后僵尸进程堆积导致性能劣化。用户普遍反映"每隔几天必须重启 gateway"。
- **[#150635] [Bug]: short-term recall retention evicts recalled entries nightly**（17 评论） — [链接](https://github.com/openclaw/openclaw/issues/150635)
  512 条目上限导致夜间 ingestion 阶段将已 recall 的条目全部逐出，dreaming deep phase 永远无法晋升。此 Bug 触及记忆系统核心机制，被标记为 `diamond lobster` 高价值问题。
- **[#114612] [Bug]: SQLite unbounded growth (memory_index_chunks + memory_embedding_cache)**（16 评论） — [链接](https://github.com/openclaw/openclaw/issues/114612)
  生产实例磁盘被无限增长的记忆索引表填满，无保留策略、无 eviction，且不受 session maintenance pruning 覆盖。
- **[#121661] [Bug]: CLI-backed subagent announce-wake turns run tool-free**（15 评论） — [链接](https://github.com/openclaw/openclaw/issues/121661)
  模型在 CLI 后端的 announce-wake 轮次中无法调用真实工具，转而伪造工具调用及其输出。用户

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向分析报告（2026-10-05）

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态处于**高速迭代、但成熟度明显分化**的阶段：以 OpenClaw 为核心的“重型全功能 Agent 网关”项目保持极高社区吞吐，而 NanoClaw、NanoBot、Zeroclaw 等则在轻量部署、发布治理、安全加固等方向并行推进。社区关注点正从“功能堆叠”转向**可靠性、可观测性与成本控制**——消息丢失、会话状态不一致、token 消耗不可追踪、配置被意外覆盖是最集中的痛点。与此同时，MCP/插件生态治理、本地模型适配、更新/回滚流程稳定性成为多项目共同攻坚的技术方向。整体看，生态“头部活跃、尾部空窗”，IronClaw 及多个项目出现低活动或零活动，维护资源明显向头部集中。

## 2. 各项目活跃度对比

| 项目 | Issue 动态 | PR 动态 | 今日 Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500 更新（新开/活跃 359，关闭 141） | 500 更新（待合并 299，合并/关闭 201） | 无（最新稳定版 2026.9.8） | 极高活跃，合并管线顺畅；但 P0/P1 积压，更新路径出现回归 |
| **NanoBot** | 7 更新（活跃 4） | 52 更新（合并/关闭 14） | 无 | 稳定迭代；38 条待合并 PR 存在 conflict，token 可观测性呼声高 |
| **Zeroclaw** | 43 更新 | 50 更新（合并/关闭 5） | 无 | 活跃；安全/测试加固为主，P0 配置丢失已有 fix PR |
| **PicoClaw** | 4 更新 | 9 更新（合入/关闭 7） | 无 | 维护节奏稳；社区响应/CLA 流程有短板，DingTalk panic 未闭环 |
| **NanoClaw** | 8 新/活跃 | 27 更新（合并/关闭 10） | **v2026.10.0-rc.1** | 活跃；发布/更新链路重构，长期 Telegram/任务可观测性 Bug 待解 |
| **IronClaw** | 0 | 5 更新（合并/关闭 1） | 无 | 低活跃；仅 Dependabot 依赖维护，无人工社区互动 |
| **LobsterAI** | 5 更新（活跃 3，关闭 2） | 6 更新（待合并 3，关闭 3） | 无 | 中等；MCP/OpenClaw 集成有实质进展，历史 Bug 多被 stale |
| **CoPaw** | 11 更新（活跃 10，关闭 1） | 8 更新（待合并 7，关闭 1） | 无 | 中等偏高；修复 PR 前置，但内存耗尽/插件隔离等架构级问题未解决 |
| **TinyClaw / Moltis / ZeptoClaw / EasyClaw** | 0 | 0 | 无 | 无活动，进入观察期 |

## 3. OpenClaw

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-05

## 1. 今日速览

过去 24 小时 NanoBot 项目保持高强度社区协作：PR 更新 52 条（其中 14 条已合并/关闭），Issue 更新 7 条（4 条活跃）。虽然无新版本发布，但多个修复 PR 集中落地，覆盖 WebUI 可用性、provider 参数正确性和文档修正。值得注意的是，38 条待合并 PR 与多数 PR 带有 conflict 标记，维护者审查与 rebase 压力较大，长期开放的 PR（如 #5388、#5152）持续累积，需关注合并积压问题。

## 2. 版本发布

无。

## 3. 项目进展

今日关闭/合并的 PR 中，以下变更对项目有实质推进：

- **`fix(providers): preserve temperature for compatible reasoning models`（#6005，已合并）** — 修复了 `reasoningEffort` 导致所有 38 个 openai_compat provider 静默丢失 `temperature` 参数的问题。对应 Issue #6002，影响面较大，合入后 Mistral 等兼容模型的温度配置恢复生效。[PR #6005](https://github.com/HKUDS/nanobot/pull/6005)
- **`fix(webui): restore sidebar menu focus on Escape`（#6058，已合并）与 `fix(webui): restore sidebar focus after submenu Escape`（#6059，已合并）** — 连续两项 WebUI 键盘可访问性修复，解决了侧边栏菜单按 Escape 后焦点丢失的问题，为键盘流用户补齐交互连续性。[PR #6058](https://github.com/HKUDS/nanobot/pull/6058) | [PR #6059](https://github.com/HKUDS/nanobot/pull/6059)
- **`fix(webui): dismiss mobile sidebar on current topic selection`（#6061，已合并）** — 修复移动端点击当前已打开话题时抽屉不关闭的问题，补齐移动端侧栏交互一致性。[PR #6061](https://github.com/HKUDS/nanobot/pull/6061)
- **`docs(memory): correct Git layout and history search example`（#6054，已合并）** — 修正内存文档中 Git 仓库路径错误及 Python 搜索示例的输出截断逻辑，降低用户按文档操作时的踩坑概率。[PR #6054](https://github.com/HKUDS/nanobot/pull/6054)
- **`feat(subagent): add session-owned task messaging and cancellation`（#5985，已关闭）** — 为 subagent 引入会话级任务创建、消息、检查、定向取消与实时观察能力，WebUI 可保留任务进度与结果。功能量级较大，虽关闭但可能经历进一步迭代后重新提交。[PR #5985](https://github.com/HKUDS/nanobot/pull/5985)

整体来看，今日合并以 WebUI 体验修复为主，同时解决了 provider 层的参数正确性问题，项目在稳定性和交互细节上均有前进。

## 4. 社区热点

今日讨论最集中的 Issue 为：

- **#5266 — Logs about token consumption（13 条评论，持续活跃）** — 用户反馈 nanobot 在无明显用户活动时两小时内消耗约百万 token，要求记录每次调用的 token 用量以便追踪。该 Issue 创建于 8 月 6 日，至今仍被持续关注，反映了成本可观测性已成为重度用户的刚需。[Issue #5266](https://github.com/HKUDS/nanobot/issues/5266)

PR 侧虽评论数据未显示，但以下两项长期开放且今日仍有更新的 PR 值得关注：

- **#5388 — feat(agent): budget model-visible MCP schemas** — 创建 8 月 13 日，今日仍活跃。为 MCP schema 添加可选的字节预算限制，属于模型上下文管理方向的前沿探索。[PR #5388](https://github.com/HKUDS/nanobot/pull/5388)
- **#5152 — fix(subagent): mark partial completion results** — 创建 7 月 28 日，持续更新中。改进子代理部分完成结果的追踪与通知机制，与 #5985 的功能方向互补。[PR #5152](https://github.com/HKUDS/nanobot/pull/5152)

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue | 描述 | Fix PR 状态 |
|---|---|---|---|
| 高 | [#6002](https://github.com/HKUDS/nanobot/issues/6002) | `reasoningEffort` 导致所有 38 个 openai_compat provider 静默丢弃 `temperature`，影响面覆盖绝大多数兼容模型 | ✅ 已合并（#6005） |
| 中 | [#6008](https://github.com/HKUDS/nanobot/issues/6008) | WebUI 侧边栏状态初始获取失败后静默回退默认值，后续用户操作（pin、重命名、归档）被静默覆盖 | 🔄 #6009 待合并 |
| 中 | [#6031](https://github.com/HKUDS/nanobot/issues/6031) | 模型故障转移（fallback）成功后，QQ、Telegram、Discord 等聊天渠道用户无任何信号，不知道回复来自不同模型 | 🔄 #6062 待合并 |
| 中 | [#6029](https://github.com/HKUDS/nanobot/issues/6029) | 后台空闲压缩/心跳周期会向活跃渠道广播“Compressing context…”等通知，打扰用户 | 🔄 无直接 fix（#5900 相关） |
| 低 | [#6024](https://github.com/HKUDS/nanobot/issues/6024) | Obsidian CLI 在 nanobot 环境下报“无法找到 Obsidian”，疑似 XDG_RUNTIME_DIR 未传递至子进程 | ❌ 已关闭，无修复记录 |

今日无崩溃级或数据损坏级 Bug 报告。已合并的 #6005 解决了影响面最大的 provider 参数丢失问题。仍有两个中等级别问题等待对应 PR 合入。

## 6. 功能请求与路线图信号

- **Token 消耗可观测性（#5266）** — 要求记录每次调用的 token 消耗时间与来源。当前无直接实现 PR，但结合 subagent 功能扩展和 MCP 预算控制（#5388），成本控制已成为路线图中的明确方向。[Issue #5266](https://github.com/HKUDS/nanobot/issues/5266)
- **静默上下文压缩（#5900、#6029）** — 多项请求要求上下文压缩和后台维护周期不向聊天渠道发送通知。已有 PR #6062 触及渠道通知控制（针对 fallback），但针对 idle/dream 周期仍有待实现。[Issue #5900](https://github.com/HKUDS/nanobot/issues/5900) | [Issue #6029](https://github.com/HKUDS/nanobot/issues/6029)
- **Fallback 模型渠道通知（#6031）** — 请求在 chat 渠道（非 WebUI）通知用户当前由 fallback 模型响应。对应 PR #6062 已在待合并队列，预计将进入下一版本。[Issue #6031](https://github.com/HKUDS/nanobot/issues/6031)
- **侧边栏状态持久性（#6008）** — 要求初始获取失败后保持只读状态并重试，避免覆盖用户数据。对应 PR #6009 已提交，功能层面较完整。[Issue #6008](https://github.com/HKUDS/nanobot/issues/6008)

以上功能若对应 PR 顺利合入，预计会集中在下一小版本发布中。

## 7. 用户反馈摘要

- **Token 成本焦虑明显**（#5266，13 条评论）：用户对“无明显活动却消耗百万 token”表示困惑与不满，强调需要可定位、可追溯的 token 日志。这是当前社区呼声最高的诉求。
- **渠道打扰影响信任感**（#5900、#6029）：用户设置了 `idleCompactAfterMinutes: 15` 后，每次上下文压缩都会向 WeChat、WhatsApp 等渠道推送通知，被认为是一种“噪音骚扰”，希望默认静默。
- **故障转移缺乏透明度**（#6031）：用户认可模型 failover“已经能用”，但对“回复突然来自不同模型而毫无提示”感到困扰，期望渠道端也能获知模型切换事件。
- **WebUI 细节体验受关注**（#6008）：侧边栏状态静默丢失会让用户的整理工作白费，且 UI 无任何错误提示，这类“静默失败”对信任感损伤较大。
- **子代理能力期待高**（#5985、#5152）：社区对 subagent 的任务管理、取消、进度观察表现出持续兴趣，多个相关 PR/Issue 保持活跃。

## 8. 待处理积压

以下 PR/Issue 长期开放且无明确合入计划，提请维护者关注：

- **[PR #5152](https://github.com/HKUDS/nanobot/pull/5152)** — fix(subagent): mark partial completion results。创建于 2026-07-28，已超 2 个月，带有 conflict 标记，持续更新但未合入。
- **[PR #5204](https://github.com/HKUDS/nanobot/pull/5204)** — refactor(providers): declare Responses capabilities。创建于 2026-08-01，P1 优先级，重构 Responses 能力声明，长期未动。
- **[PR #5388](https://github.com/HKUDS/nanobot/pull/5388)** — feat(agent): budget model-visible MCP schemas。创建于 2026-08-13，已近 2 个月，属于上下文管理前沿特性，值得评估。
- **[PR #5483](https://github.com/HKUDS/nanobot/pull/5483) / [PR #5545](https://github.com/HKUDS/nanobot/pull/5545)** — session 删除后防止会话被重建/恢复，两个 PR 针对同一类竞态问题，分别来自不同作者，需要注意重复设计问题。
- **[PR #5537](https://github.com/HKUDS/nanobot/pull/5537)** — feat(my): persist session focus across turns。2026-08-25 创建，有文档与测试，等待评审。
- **[Issue #5266](https://github.com/HKUDS/nanobot/issues/5266)** — token 消费日志功能请求。已开放 2 个月且评论活跃，是社区关注度最高的未解决 Issue，却尚无对应实现 PR。

若维护者能优先处理 P1/P2 且已就绪的老 PR，将显著降低积压风险，并提升社区贡献者的积极性。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-05

## 1. 今日速览

过去 24 小时项目保持高活跃度：**43 条 Issue 更新、50 条 PR 更新**，其中 5 条 PR 已合并/关闭。核心工作集中在三条主线：**运行时测试加固与并行 gate 下的确定性修复**（#9965、#11533、#11534）、**配置安全与数据完整性防护**（#10495 P0 配置丢失风险的 fix PR #11527 已开出）、**ZeroCode 终端体验修复**（剪贴板 #11529、终端退出处理 #11528）。值得关注的是，由 `@JordanTheJet` 提交的 #11526 是一项大改动（risk:high, size:XL），旨在让运行时完全遵守供给的能力边界，暗示内部架构正在向更严格的插件/工具隔离演进。项目整体呈现"测试基建加固 + 安全/数据可靠性优先"的健康状态。

## 2. 版本发布

过去 24 小时无新版本发布。最新里程碑仍为 **v0.8.6**（大量 PR 标注 `release:v0.8.6`），更大范围的 gateway 分离工作由 tracker #7432 追踪至 v0.9.0。

## 3. 项目进展

今日合并/关闭的 5 条 PR 中，可见的 2 条如下：

- **[#11521](https://github.com/zeroclaw-labs/zeroclaw/pull/11521) docs(runtime): record the Core Team approval of the composition exception** — 记录了 Core Team 对运行时组合异常的正式批准，属于架构决策的文档固化，消除待定权威状态。
- **[#11518](https://github.com/zeroclaw-labs/zeroclaw/pull/11518) fix(approval): preserve CLI input failure provenance** — 修复 CLI 审批提示在 EOF/读取错误场景下的失败归因，使模型与审计日志能区分"运行时 fail-closed 拒绝"与"用户拒绝"。对应 Issue [**#11335**](https://github.com/zeroclaw-labs/zeroclaw/issues/11335) 今日同步关闭。

这两条 PR 均围绕 **审批链路的事故可追溯性** 展开，属于安全审计方向的补强。

与此同时，今日新开的 PR 密集，包括：
- [#11526](https://github.com/zeroclaw-labs/zeroclaw/pull/11526) 运行时能力边界的完整修复（依赖 #11187），将供给工具设为默认的完整注册表，合并后原生工具与供给工具将不再重复构造。
- [#11527](https://github.com/zeroclaw-labs/zeroclaw/pull/11527) 针对 [**#10495**](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) 的直接修复，拒绝未经加载的全量保存覆盖现有配置，避免 109KB 配置被 702 字节空配置替换的灾难。
- [#11530](https://github.com/zeroclaw-labs/zeroclaw/pull/11530) / [#11531](https://github.com/zeroclaw-labs/zeroclaw/pull/11531) 修复 Tailscale tunnel 只发布网关端口、未发布 WSS/enrollment 端点，以及 URL 端口号与实际不符的问题。
- [#11529](https://github.com/zeroclaw-labs/zeroclaw/pull/11529) / [#11528](https://github.com/zeroclaw-labs/zeroclaw/pull/11528) 改善 ZeroCode 终端复制（本地剪贴板 fallback）和终端退出/SIGTERM 处理。

## 4. 社区热点

- **[#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) — 14 条评论**（[bug, cron, runtime, tests, priority:p1]）：加固并行运行时 gate 下会写入可执行 shim 的测试 fixture。讨论焦点在于多线程化后生成 shim 再 spawn 的竞态条件，该 issue 长期处于 in-progress，评论活跃说明测试基建是当前社区关注重点。
- **[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) — 9 条评论，2👍**（[enhancement, agent, config, provider, runtime, security, priority:p2]）：提议定义紧凑的 local_small 运行时 profile 与 prompt 预算契约。该 issue 强调本地优先场景下减少 prompt 膨胀、禁用宽松 fallback 解析、防止内部工具指令泄漏到用户可见输出，反映出 **local-first 用户对隐私与精简的强烈诉求**。
- **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432) — 6 条评论**（[Tracker, runtime, gateway, release:v0.9.0]）：v0.8.6/v0.9.0 runtime 与 gateway 交付路线图的 source of truth。社区对 Phase 2/3 交付节奏高度关注。
- **[#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) — 5 条评论**（[bug, config, priority:p0, risk:high]）：Config::save() 可用 702 字节空配置覆盖 109KB 的用户配置，严重等级 S0（数据丢失）。5 条评论说明该数据丢失问题已在社区引发足够重视，今日 #11527 已开出修复 PR。

## 5. Bug 与稳定性

按严重程度排列：

**🔴 P0 / S0 — 数据丢失风险**
- [**#10495**](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) `Config::save()` 可用近空文件覆盖用户完整配置，`~/.zeroclaw/config.toml` 从 109KB（25 agents）被替换为 702 字节。**已有 fix PR：[#11527](https://github.com/zeroclaw-labs/zeroclaw/pull/11527)**（拒绝未经加载的全量保存，写入前保留原字节）。

**🟠 P1 / S1 — 工作流阻塞**
- [**#11525**](https://github.com/zeroclaw-labs/zeroclaw/issues/11525) Android 16 / Termux (aarch64) 上 `quickstart` 无法创建 agent，配置持久化失败。**暂无 fix PR**。这是移动端用户 onboarding 的完全阻塞，严重度较高但平台范围有限。
- [**#10536**](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) macOS Seatbelt 忽略 shell 命令的 `allowed_roots` 配置，安全策略识别但系统层仍返回 Operation not permitted。涉及安全沙箱，**暂无 fix PR**。
- [**#10876**](https://github.com/zeroclaw-labs/zeroclaw/issues/10876) Gateway 配置写入 auth 节后未实时同步到 RPC 授权权威，需 daemon 重载才生效。状态为部分交付，CLI 发布与文档仍开放。
- [**#11418**](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) ZeroCode "Copy" 按钮完全无效果，剪贴板无响应。**已有 fix PR：[#11529](https://github.com/zeroclaw-labs/zeroclaw/pull/11529)**（本地 Linux 剪贴板 writer + OSC 52 fallback 上报）。

**🟡 P2 / S2 — 行为降级**
- [**#11420**](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) SQLite 会话后端在每轮对话后重写整份 transcript，所有消息行被盖上同一 `created_at` 时间戳，导致 `GET /api` 返回的逐条消息时间全部丢失。**暂无 fix PR**。
- [**#11371**](https://github.com/zeroclaw-labs/zeroclaw/issues/11371) MCP 嵌套对象参数在工具执行前被序列化为字符串，`{"allowMultiple": false}` 变成 `"{\"allowMultiple\": false}"`，破坏工具调用。标记 `release:v0.8.6`，**暂无 fix PR**。
- [**#11517**](https://github.com/zeroclaw-labs/zeroclaw/issues/11517) Web Chat 在 agent turn 运行中刷新页面，用户 prompt 从屏幕和 localStorage 同时消失。涉及 hydration 与运行中状态快照的顺序问题，**暂无 fix PR**。
- [**#11515**](https://github.com/zeroclaw-labs/zeroclaw/issues/11515) Cost ledger 遭遇 torn-write 时仅 WARN 丢弃记录，无 quarantine、无对齐校验，导致 rollup 数据不完整。**暂无 fix PR**。

**🟢 P3 / S3 — 轻微问题**
- [**#11416**](https://github.com/zeroclaw-labs/zeroclaw/issues/11416) Slack "is thinking…" 状态在 v0.8.5 后在 channel 线程中消失，用户只能看到 👀 反应。行为回归，标记 `release:v0.8.6`，**暂无 fix PR**。

## 6. 功能请求与路线图信号

- **[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) compact local_small runtime profile**：定义紧凑本地模型模式的 prompt 预算契约、禁用宽松 fallback 解析、防止系统指令泄漏到用户输出。该请求获得 2👍，与 [#7951](https://github.com/zeroclaw-labs/zeroclaw/issues/7951)（effort-based 本地/云端模型路由）协同指向 **local-first 路线图**。虽然两者均标记 `status:parking-lot`，但社区对本地模型的关注度持续上升，未来版本（v0.9.0+）有望纳入。
- **[#10550](https://github.com/zeroclaw-labs/zeroclaw/issues/10550) 绑定 skill HTTP DNS 解析**：要求 DNS 解析受请求 deadline 约束，并增加可测试的 resolver seam。属于安全加固方向，当前 `status:in-progress`。
- **[#11442](https://github.com/zeroclaw-labs/zeroclaw/issues/11442) 逐步退役遗留原生工具适配器**：要求以 skills/plugins/MCP 替代产品级 SaaS 集成。这是一个架构方向信号，暗示项目正在向插件化生态迁移。
- 新 PR [#11468](https://github.com/zeroclaw-labs/zeroclaw/pull/11468) 修复 Ollama/llama.cpp 的 thinking 控制开关未生效问题，将 `think` 设置与全局 `reasoning_enabled` 正确转发；[#11532](https://github.com/zeroclaw-labs/zeroclaw/pull/11532) 为结构化 Agent 路径补齐 `max_system_prompt_chars` 截断，两者均为 v0.8.6 的小步体验改进。

## 7. 用户反馈摘要

- **数据安全焦虑（最强烈）**：[#10495](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) 的用户报告称一个测试运行直接抹掉了 25 个 agent 的配置，这种"静默数据丢失"是 S0 级事故，直接催生了 #11527 的防御性修复。用户对配置写入的安全护栏有极高期待。
- **移动端 onboarding 受阻**：[#11525](https://github.com/zeroclaw-labs/zeroclaw/issues/11525) 用户使用 Android 16/Termux 跑 quickstart，中文报错信息显示"磁盘上没有任何更改"，说明配置持久化在 Termux 环境下存在兼容性问题。移动端用户是真实存在的群体，但当前体验断裂。
- **本地模型用户对透明度的要求**：[#5287](https://github.com/zeroclaw-labs/zeroclaw/issues/5287) 的诉求揭示了一个深层痛点——本地模型用户担心内部工具/系统指令泄漏到输出中，且 prompt 膨胀消耗宝贵的本地上下文窗口。这与 [#11484](https://github.com/zeroclaw-labs/zeroclaw/issues/11484)（ZeroCode Agent turns 禁用重复工具防护）相呼应：用户在使用本地模型（如 Underdog-Woof-4B-1.1 via MLX-LM）时观察到 `web_fetch` 被重复调用同一 URL，缺少防护机制。
- **桌面端即时体验问题**：[#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) 用户反馈 "Copy" 一键复制完全无效；[#10301](https://github.com/zeroclaw-labs/zeroclaw/issues/10301) 用户抱怨 SSH 终端下 Code pane 会话历史难以导航与复制。这类交互细节直接影响日常使用满意度，好在 #11529 已试图解决剪贴板问题。

## 8. 待处理积压

**长期未响应的 Issue：**
- [**#9190**](https://github.com/zeroclaw-labs/zeroclaw/issues/9190)（2026-07-20 创建，2 评论）：Reliable provider API key 轮换能选中备用 key 但无法应用。`status:no-stale` 说明维护者知道该问题但未解决，已积压 **77 天**。这可能影响生产环境的高可用性。
- [**#7951**](https://github.com/zeroclaw-labs/zeroclaw/issues/7951)（2026-06-19 创建，2 评论）：Effort-based 本地/云端路由，`status:parking-lot`，已积压 **108 天**。虽被暂停但社区持续关注，与 #5287 的需求关联度高。
- [**#8527**](https://github.com/zeroclaw-labs/zeroclaw/issues/8527)（2026-06-30 创建，1 评论）：大文件生成应通过 channel 附件路由，`status:icebox`。虽已冻结，但用户场景（生成 HTML/代码替代粘贴到聊天）真实存在。

**长期未合并的 PR：**
- [**#10768**](https://github.com/zeroclaw-labs/zeroclaw/pull/10768)（2026-09-10 创建）：Sendblue iMessage/SMS 频道，标记 `needs-author-action`、`stale-candidate`。功能本身有明确价值（非 macOS 主机接入 iMessage），已积压 **25 天**，如果作者不回应将被自动关闭。
- [**#10698**](https://github.com/zeroclaw-labs/zeroclaw/pull/10698)（2026-09-07 创建）：Web 端可视化 cron 编辑器，同样 `needs-author-action` + `stale-candidate`。该 PR 能显著降低 Web 用户配置定时任务的门槛，值得维护者推进。
- [**#10504**](https://github.com/zeroclaw-labs/zeroclaw/pull/10504)（2026-08-31 创建）：turn-path 中止的 typed stop 分类重构，标记 `needs-author-action`，已积压 **35 天**。架构改进类 PR 搁置过久会引入更多 merge conflict。

---

**总结**：Zeroclaw 项目处于 **有纪律的活跃状态**——测试确定性、数据安全、审批可追溯性是当前技术债清理的三大主攻方向。社区

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-10-05）

## 1. 今日速览

过去 24 小时项目保持中等偏上活跃度：4 条 Issue 更新、9 条 PR 更新，无新版本发布。核心维护者 @x1F916 批量合入 5 个稳定性修复 PR（配置持久化、ARM 更新匹配、通道 Reload 崩溃、异步工具结果投递、Agent 上下文解析），有效降低了多个已知隐患的触发风险。社区侧活跃度集中在 QQ 机器人通道接口过期（#3394）与 CLAassistant 签名检测（#3392）两个议题上，但两者均尚无可落地的修复 PR。整体来看，项目维护节奏稳定，外部贡献者通道存在一定阻塞值得注意。

## 2. 版本发布

过去 24 小时无新版本发布。上一版本仍为 v0.3.1（部分 Issue 仍引用该版本复现问题）。

## 3. 项目进展

今日合入/关闭的 PR 共 7 个，其中 @x1F916 的 5 个修复 PR 构成主要进展：

- [#3403 fix(agent): deliver async tool results to the originating session](https://github.com/sipeed/picoclaw/pull/3403) — 修复异步工具（`spawn`）结果错发至默认 agent 主会话的问题，确保结果按 `<channel>:<chat_id>` 路由回源会话。此前来自不同聊天/用户的结果会混杂在同一个默认会话中。**合并**
- [#3402 fix(agent): resolve the owning agent in context managers](https://github.com/sipeed/picoclaw/pull/3402) — 继承 #3316，修复由路由（非默认）agent 拥有的会话在 `Assemble` 中使用 `registry.GetDefaultAgent()` 的问题。**合并**
- [#3401 fix(channels): make Reload synchronous and nil-safe](https://github.com/sipeed/picoclaw/pull/3401) — 修复 `Manager.Reload` 的 3 个问题：启用的通道因 readiness/factory 失败时（如 Telegram 未设置 token）会在 nil 上调用 `Stop`/`Start` 导致 panic；并发重新加载的同步问题。**合并**
- [#3400 fix(config): persist all api_keys and enabled flag of multi-key models](https://github.com/sipeed/picoclaw/pull/3400) — 修复多 key 模型配置保存时丢失 `Enabled` 字段及只保留第一个 key 的问题，该 bug 会导致每次迁移后的自动保存破坏原始配置。**合并**
- [#3399 fix(updater): select the matching 32-bit ARM release asset](https://github.com/sipeed/picoclaw/pull/3399) — 修复 `picoclaw update` 在 32 位 ARM 上误装 arm64 归档的问题（`"arm"` 子串匹配到 `arm64`）。**合并**

另有 2 个较早 PR 被关闭（stale 机制标记）：[#3353 fix(channels): bound tool feedback animations](https://github.com/sipeed/picoclaw/pull/3353) 与 [#3233 Fix pr 3222 backward compat](https://github.com/sipeed/picoclaw/pull/3233)。前者实际修复了工具反馈动画无限编辑消息的问题，但未能及时通过审查流程。

**评估**：上述合入的 5 个 PR 针对性解决了配置可靠性、更新器跨架构可用性、通道生命周期安全及多 agent 会话语义等核心稳定性问题，项目在“可靠性”维度的健康度有明显提升。

## 4. 社区热点

- [#3394 [BUG] QQ机器人的接口更新了，但QQ聊天通道的接口似乎没有更新](https://github.com/sipeed/picoclaw/issues/3394)（评论 2）— 社区用户反馈 QQ 官方接口变更后 PicoClaw 的 QQ 通道未同步跟进。这是当日最直接的“用户受影响”型 Issue，涉及 OneBot/QQ 通道的可用性，但尚无维护者响应或对应修复 PR。

- [#3392 [BUG] CLAassistant does not detect signature](https://github.com/sipeed/picoclaw/issues/3392)（评论 2）— 贡献者反映 PR #3381 的 CLA 签名未被 CLAassistant 识别。该问题直接影响外部贡献者的代码合入流程，属于社区贡献链路中的“流程堵塞”，评论者已在 PR 中同步表达挫败感。

两者背后共同指向：项目的外部贡献者体验需要维护者关注——一个卡在接口适配，一个卡在 CLA 流程。

## 5. Bug 与稳定性

按严重程度排序：

- **高危**：[#3382 [stale] v0.3.1: DingTalk gateway still panics on stream SDK reconnect](https://github.com/sipeed/picoclaw/issues/3382)（已关闭）— DingTalk 流式通道在 SDK 重连时向已关闭 channel 发送数据导致 panic（`client.go:161`），且用户确认 v0.3.1 仍可复现，是 #973 的回归。该 Issue 已被 stale bot 自动关闭，但问题本身没有修复 PR，属于已知未解决的稳定性隐患。
- **中危**：[#3394 QQ通道接口未更新](https://github.com/sipeed/picoclaw/issues/3394) — QQ 机器人接口变更后通道失效，影响使用 QQ 通道的用户。无关联 fix PR。
- **已修复（今日合入）**：配置保存丢失字段（#3400）、32 位 ARM 更新装错架构（#3399）、`Reload` 触发 nil panic（#3401）、async 工具结果错投（#3403）、agent 上下文管理器取错对象（#3402）。

**整体判断**：今日合入的 PR 解决了多个潜在 panic 和配置损坏问题，但 DingTalk 重连 panic 仍未闭合，且 stale bot 清理了该 Issue，存在“问题被自动化关闭但实际未修复”的风险。

## 6. 功能请求与路线图信号

- [#3395 [Feature] Make OneBot auto-ack reaction configurable](https://github.com/sipeed/picoclaw/issues/3395)（评论 1）+ 对应 PR [#3396 feat(channels/onebot): add opt-in toggle for acknowledgement reactions](https://github.com/sipeed/picoclaw/pull/3396) — 用户希望 OneBot 通道的自动 emoji 反应（`set_msg_emoji_like` emoji 289）可配置。PR 已提交但被标记为 stale，若维护者回应则大概率进入下一版本。
- [#3381 feat: Switch Openai to responses API](https://github.com/sipeed/picoclaw/pull/3381)（Open）— 将 OpenAI provider 迁移至 Responses API，属于底层能力升级，改动较大。该 PR 已搁置约 2 周（创建于 9/17），且正是 CLAassistant 问题的“受害者”，需要维护者介入。

两个信号共同表明：社区正在推动 OneBot 通道的可配置化与 OpenAI 新 API 适配，但都因审查/流程滞后而处于悬置状态。

## 7. 用户反馈摘要

- **QQ 通道用户（#3394）**：提出“QQ 机器人的接口更新了，但 PicoClaw 的 QQ 聊天通道接口似乎没有更新”，反映出使用 NapCat/QQ 官方 Bot 方案的用户对通道时效性的敏感——上游接口变动会直接导致聊天功能不可用。
- **贡献者流程体验（#3392）**：在 PR #3381 上反馈“CLAassistant does not detect signage of CLA”，并附上复现链接，说明外部贡献者在签署 CLA 后仍被流程卡住，影响合入。
- **异步工具使用用户（#3403 相关）**：反馈异步工具（`spawn`）结果错发至默认会话，导致多会话间消息混杂，影响实际使用——已通过今日 PR 修复。
- **32 位 ARM 用户（#3399 相关）**：通过 `picoclaw update` 时错误安装 arm64 归档，导致二进制无法运行——已修复。

用户整体诉求集中在“通道可用性”、“上游接口跟进”和“工具结果准确性”，对项目的响应速度有一定期待。

## 8. 待处理积压

- [#3381 [OPEN] feat: Switch Openai to responses API](https://github.com/sipeed/picoclaw/pull/3381) — 停滞 2 周+，被 CLA 问题卡住，且无维护者评论。这是较大的功能升级 PR，长期搁置会影响后续 OpenAI 兼容性。
- [#3396 [OPEN] feat(channels/onebot): add opt-in toggle for acknowledgement reactions](https://github.com/sipeed/picoclaw/pull/3396)（关联 Issue #3395）— 已被 stale 标记但未关闭，等待维护者审查。对应 Issue 从 9/27 起无维护者响应。
- [#3394 [OPEN] QQ通道接口未更新](https://github.com/sipeed/picoclaw/issues/3394) — 用户明确报告通道失效，无维护者介入，可能是近期最重要的待处理事项。
- [#3382 [CLOSED by stale] DingTalk 重连 panic](https://github.com/sipeed/picoclaw/issues/3382) — 已关闭但问题未解决，需要人工重新打开并确认修复计划。
- [#3392 [OPEN] CLAassistant 签名检测失败](https://github.com/sipeed/picoclaw/issues/3392) — 流程性阻塞，影响贡献者链路，建议维护者检查 CLA bot 配置或手动确认签名。

---

**总评**：今日项目在“核心代码健康度”上成色不错（5 个修复 PR 合入），但“社区反馈响应”与“外部贡献流程”存在明显短板——多个 Issue/PR 已徘徊 1-2 周无维护者互动，且有 1 个已知恐慌问题被 stale bot 关闭。建议维护者优先处理 QQ 通道接口更新、DingTalk panic 重新开启与 CLAassistant 配置检查，以维持社区信任。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-05

---

## 1. 今日速览

NanoClaw 今日活跃度处于高位：24 小时内新增/活跃 Issues 8 条、PR 更新 27 条（其中 10 条已合并/关闭），并正式发布首个日历版本号候选版 **v2026.10.0-rc.1**，标志着项目从语义化版本（2.x）向日历版本（YYYY.M.PATCH）切换，且 `/update-nanoclaw` 的默认安装源从 `main` 分支尖峰改为已发布版本。Bug 修复集中在 Telegram 投递、容器生命周期、更新流程及 CLI 行为上，多由同一批核心维护者（@glifocat、@antonio-antuan 等）高频提交。整体项目健康度良好，但存在数个长期未闭环的顽固 Bug（见"待处理积压"），需留意。

---

## 2. 版本发布

### v2026.10.0-rc.1（候选版）

- **链接**：[v2026.10.0-rc.1](https://github.com/nanocoai/nanoclaw/releases/tag/v2026.10.0-rc.1) ｜ [发布 PR #4025](https://github.com/nanocoai/nanoclaw/pull/4025)

**核心变化：**

- **版本号体系切换**：`package.json` 从 `2.4.0` 跳至 `2026.10.0-rc.1`，即日起采用日历版本号 `YYYY.M.PATCH`。
- **更新渠道机制**：`/update-nanoclaw` 默认安装最新发布版本（`stable` 渠道），不再跟随 `main` 分支尖端。`beta` 渠道会安装最新的 `-rc.N` 候选版本；该候选版正是 `beta` 渠道的默认安装对象。
- **发布流程重构**：新增 pre-release 路径，`RELEASING.md` 增补一行说明，后续版本发布将全部走新流水线。

**破坏性变更与迁移注意：**

- **OneCLI Linux 安装路径变更**：2026.10.0 在 OneCLI 升级指南中新增一条 `[BREAKING]` 说明，所有 OneCLI Linux 安装会受影响。修复 PR 已合入（见下方 #4028），核心差异为：本地 Linux 网关监听地址从 `127.0.0.1:10254` 改为 Docker 网桥地址（通过 `ONECLI_URL` 环境变量指定）。

---

## 3. 项目进展

今日合并/关闭了 **10 条 PR**，核心推进集中在以下方向：

### 3.1 更新与发布链路（已闭环）

- **[#3986] feat(update): 默认跟随发布标签而非 main 分支**（已合并）— 这是 rc.1 发布的基础，更新行为从"跟主干"改变为"跟版本"。[链接](https://github.com/nanocoai/nanoclaw/pull/3986)
- **[#4025] 发布 v2026.10.0-rc.1**（已合并）— 首个日历版本候选版的发布 PR。[链接](https://github.com/nanocoai/nanoclaw/pull/4025)
- **[#4028] docs: OneCLI 升级指南兼容 Linux 网关地址**（已合并）— 修复 rc.1 对 OneCLI Linux 安装的破坏性影响。[链接](https://github.com/nanocoai/nanoclaw/pull/4028)

### 3.2 容器与运行环境修复（已关闭）

- **[#3998] fix(container): 信任网关 CA 证书到 agent 浏览器**（已合并）— 解决 Chrome/Chromium 忽略 `NODE_EXTRA_CA_CERTS` 和 `SSL_CERT_FILE`、导致通过凭据网关访问 HTTPS 页面失败的问题。[链接](https://github.com/nanocoai/nanoclaw/pull/3998)
- **[#3999] fix(claude): 传递 `CLAUDE_CODE_AUTO_COMPACT_WINDOW` 到容器**（已合并）— 此前该环境变量只在容器内读取、却从未从宿主机注入，文档声明与实际行为不符。[链接](https://github.com/nanocoai/nanoclaw/pull/3999)

### 3.3 日志与 WhatsApp 安全（已关闭）

- **[#3983] fix(log): BigInt/循环引用时保留嵌套 toJSON 脱敏**（已合并）— 修复 `safeStringify` 异常回退导致日志脱敏失效的问题。[链接](https://github.com/nanocoai/nanoclaw/pull/3983)
- **[#4024] fix(add-whatsapp): 固定 Baileys 至 7.0.0-rc14**（已合并）— 修复 GHSA-qvv5-jq5g-4cgg 消息伪造安全通告（影响 rc.9～rc.12）。[链接](https://github.com/nanocoai/nanoclaw/pull/4024)

**整体评价**：上述 PR 合计覆盖了"发布链路、容器 CA、环境变量透传、日志安全、消息伪造漏洞"五个关键环节，项目在 24 小时内的稳定性和安全水位有明显提升。

---

## 4. 社区热点

当前数据中单条内容的评论数均不高（最多为 1 条），但可从**更新频率**和**讨论串联**判断热点：

### 4.1 Telegram 投递故障（持续发酵）

**[#3569] URL 含奇数个下划线时消息永不投递** — 创建于 8 月 27 日，今日仍有更新。所有 NanoClaw 安装都被钉在 `@chat-adapter/telegram@4.29.0`，而上游在 4.32.0 已修复 MarkdownV2 转义问题。背后诉求：**依赖锁定策略太僵化**，导致已知上游修复无法及时落地。[链接](https://github.com/nanocoai/nanoclaw/issues/3569)

### 4.2 任务型 agent 的可见性讨论（两条关联 Issue）

- **[#3223] 定时任务失败被静默丢弃**（8/10 创建，今日更新）：错误消息不可路由，operator 永远不知道任务挂了。[链接](https://github.com/nanocoai/nanoclaw/issues/3223)
- **[#3301] 聊天会话内任务输出被吃**（8/17 创建，今日更新）：自 2.1.48 one-door 改造后，任务行在聊天会话中触发会切换整个查询模式，导致日志丢失、回复被吞、系列未列出。[链接](https://github.com/nanocoai/nanoclaw/issues/3301)

这两条共同反映社区对**任务执行可观测性**的强烈需求，且都未得到修复响应，是潜在的"最受伤用户"聚集点。

### 4.3 发布流程变更引发讨论

**[#4025] rc.1 发布**与 **[#3986] 更新渠道机制**（均已合并）是今日最核心的讨论对象，涉及更新行为变更、OneCLI 兼容性等话题，属于带动大量联动的枢纽型 PR。

---

## 5. Bug 与稳定性

按严重程度排列（🔴 高 / 🟠 中 / 🟡 低）：

### 🔴 #3643 — 硬编码 30 分钟上限杀死本地模型长任务 [priority/high]

- **现象**：本地模型后端（OpenCode → OpenAI 兼容本地服务器）的长 agent 回合被宿主清理进程强制杀死，日志显示 `heartbeatAgeMs=1829985 ceilingMs=1800000`（即约 30.5 分钟 > 30 分钟上限）。
- **严重性**：本地模型推理普遍较慢，此限制几乎必然触发，且无配置项可调。
- **状态**：无 fix PR，今日有更新。[链接](https://github.com/nanocoai/nanoclaw/issues/3643)

### 🔴 #3569 — Telegram: 奇数个未转义 MarkdownV2 标记导致消息永久失败

- **现象**：整条消息中 `_ * ~ \`` 未转义数量为奇数即被 Telegram API 拒绝。
- **严重性**：影响所有使用 Telegram 的安装；上游已修复，但 NanoClaw 钉在旧版 `@chat-adapter/telegram@4.29.0`。
- **状态**：无 fix PR。相关修复 PR #4029（mailto 下划线场景）已开出但在开放队列。[链接](https://github.com/nanocoai/nanoclaw/issues/3569)

### 🟠 #3223 — 定时任务错误被静默丢弃

- **现象**：定时任务触发的 agent turn 抛错时，错误消息因缺少路由字段而无法投递，operator 无感知。
- **状态**：8 月 10 日创建，至今无 fix PR，今日仍有更新。[链接](https://github.com/nanocoai/nanoclaw/issues/3223)

### 🟠 #4033 — poll-loop 跟进任务导致 in_reply_to 错位

- **现象**：`processQuery` 为每个跟进任务排队一个 `QueuedTurn`，但 provider 在一个输入上产生多个 `result` 时队列会落后，后续回复被标记到较早消息的 `in_reply_to`。由 Claude 行为触发。
- **状态**：今日新开，无 fix PR。[链接](https://github.com/nanocoai/nanoclaw/issues/4033)

### 🟠 #4021 — macOS 更新流程与关机竞态

- **现象**：`/update-nanoclaw` 在 macOS 上 `launchctl bootout` 后不等待进程退出即继续，快照与关闭竞态，2.3.0 → 2.4.0 更新曾触发 I/O error 5，虽回滚成功但耗时。
- **状态**：今日新开，无 fix PR。[链接](https://github.com/nanocoai/nanoclaw/issues/4021)

### 🟡 #4020 — inbound escapeXml 未逆转导致 `&amp;`

- **现象**：agent 复述用户消息中的 URL 时，`&` 被显示为 `&amp;`，链接不可点击。
- **状态**：今日新开，无 fix PR。[链接](https://github.com/nanocoai/nanoclaw/issues/4020)

---

## 6. 功能请求与路线图信号

### 6.1 预计将被纳入下一版本（已有对应 PR）

| 请求 | PR | 说明 |
|------|-----|------|
| **#4032** 投递失败时告知 agent | 同名 PR（开放中） | 解决 `MAX_DELIVERY_ATTEMPTS` 后 agent 误以为消息已送达的问题，属于核心可观测性增强。[PR 链接](https://github.com/nanocoai/nanoclaw/pull/4032) |
| **#4027** 允许 agent 重启/清除自己创建的 agents | 无对应 PR 但关联 #4026 | `cli_scope: group` 下 coordinator 无法重启子 agent；#4026 修复了 `groups restart --id` 忽略 `--id` 的问题，部分覆盖。核心诉求仍开放。[Issue 链接](https://github.com/nanocoai/nanoclaw/issues/4027) |
| **#3450** Telegram 渠道自身身份纳入 sender_scope 门控 | 开放中 | 广播频道消息因 `sender_chat` 映射为 `chat:<id>` 而无法通过成员校验，频道机器人无法工作。PR 于 8 月 22 日创建，仍未合并。[链接](https://github.com/nanocoai/nanoclaw/pull/3450) |

### 6.2 路线图信号

- 从 #3986、#4007、#4009 三条 PR 看出，维护者正在系统性改造 **依赖管理与发布自动化**：Dependabot 可见性扩展、取消 image pin 自动合并、引入更新渠道。这暗示下一阶段核心工作是"工程基础设施加固"而非新功能扩张。

---

## 7. 用户反馈摘要

从今日活跃的 Issues 评论中可提炼出以下真实痛点：

1. **"我知道上游修了，但 NanoClaw 不带我玩"**（#3569）— 用户 @shachartal 指出 Telegram 适配器被钉在 3 个版本之前，上游 4.32.0 已修复下划线投递问题，但 NanoClaw 仍停留在 4.29.0。这类反馈揭示社区对**依赖更新节奏**的不满。

2. **"失败不可见比失败本身更痛苦"**（#3223、#3301）— 两个独立用户（@chiptoe-svg、@glifocat）分别报告"定时任务失败无通知"和"聊天内任务输出被吃"，共同指向任务执行的可观测性缺失。用户能接受失败，但不能接受失败发生却不知道。

3. **"本地模型用户被惩罚

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-05

> 数据来源：github.com/nearai/ironclaw | 覆盖窗口：2026-10-04 ~ 2026-10-05

---

## 1. 今日速览

过去 24 小时内，IronClaw 项目处于**低活跃度、自动化依赖维护主导**的状态。无新 Issue 开启或关闭，无用户功能讨论，社区互动几乎为零；全部 5 条 PR 更新均由 Dependabot 自动发起，其中 1 条被合并/关闭，4 条仍待处理。项目无新版本发布，无代码功能提交被合入，整体进展集中体现为对 Rust 生态（tokio、wasm）和 GitHub Actions 的依赖追踪与更新。活跃度评估：**维护通道正常运转，但开发者社区参与度极低**，缺少人工评审互动值得关注。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日唯一合并/关闭的 PR 为依赖自动化更新，未包含功能或修复代码：

- **[#8078 [CLOSED] chore(deps): bump the tokio-ecosystem group across 1 directory with 2 updates](https://github.com/nearai/ironclaw/pull/8078)** — 由 `@dependabot[bot]` 发起，更新 `tower-http` 从 0.7.0 至 0.7.1 以及 `tokio-tungstenite`。该项合并表明维护者仍在持续跟进 tokio 生态的 patch 级更新，有助于修复潜在漏洞并维持异步运行时/HTTP 组件的基础稳定性。

整体而言，项目今日没有功能性代码合入，未推进任何用户可见的新能力或修复；项目进展以低风险依赖升级为主。

---

## 4. 社区热点

今日没有来自真实用户的 Issue/PR 讨论，社区热点缺位。所有 5 条活跃/更新的 PR 均为 Dependabot 自动生成，且均无评论、无点赞，**未形成任何技术讨论或用户反馈**。

其中最值得关注的是两个大型依赖批量更新（虽无“热度”，但体量较大，评审压力可观）：

- **[#8114 [OPEN] chore(deps): bump the everything-else group across 1 directory with 31 updates](https://github.com/nearai/ironclaw/pull/8114)** — 单 PR 涉及 31 个依赖包升级（含 `thiserror`、`uuid`、`base64` 等），标记 `size: XL, risk: low`，已开放 8 天。
- **[#8103 [OPEN] chore(deps): bump the actions group across 1 directory with 8 updates](https://github.com/nearai/ironclaw/pull/8103)** — 涉及 8 个 GitHub Actions 更新（如 `claude-code-action` 从 1.0.183 升至 1.0.228、`setup-node` 从 4.0.2 升至 7.0.0），已开放 15 天。

这些 PR 背后是维护者/自动化 bot 对供应链安全与工具链最新化的持续诉求，但由于缺乏人工参与，可能存在被长期搁置的风险。

---

## 5. Bug 与稳定性

今日无用户报告的 Bug、崩溃或回归问题。0 条新增 Issue。

稳定性相关的唯一信号来自合并的 PR [#8078](https://github.com/nearai/ironclaw/pull/8078)，其对 tokio 生态组件（`tower-http`、`tokio-tungstenite`）进行了补丁级升级，属于常规稳定性维护。未发现需要紧急响应的稳定性事件。

---

## 6. 功能请求与路线图信号

今日无用户发起的功能请求或路线图讨论。

从当前依赖更新 PR 的构成可**侧面推断项目技术方向**：

- **Rust 生态**是绝对核心（tokio、wasmtime、wit-component 等）；
- **Wasm 运行时/WASI** 方向持续获得较大更新批次（见 #7834，涉及 wasmtime、wasmtime-wasi、wit-component、wit-parser 四个包），暗示项目对 Wasm 支持的依赖较重；
- 大量 **GitHub Actions** 维护（#8103）说明 CI/CD 基础设施仍处于活跃迭代期。

上述均为自动化维护信号，不代表新功能承诺。建议关注后续是否会出现与 wasmtime 升级相关的兼容性 PR，以判断 Wasm 执行栈是否正迁移至新版本。

---

## 7. 用户反馈摘要

今日无可报告的用户反馈。

全部 Issue 数量为 0，全部 PR 由 `@dependabot[bot]` 提交且无评论、无反对/赞成票。无法从数据中提取用户痛点、使用场景或满意/不满意情绪。该状态为**社区互动空窗期**，需要持续观察。

---

## 8. 待处理积压

以下 4 条 Dependabot 依赖更新 PR 仍处于开放状态，均无人工评审标记，建议维护者关注并安排合并/关闭：

| PR | 标签 | 等待时长 | 优先级建议 |
|---|---|---|---|
| [#7834 wasm 组 4 更新](https://github.com/nearai/ironclaw/pull/7834) | `size: L, risk: medium, wasm` | **43 天**（自 08-23） | 高 — 涉及 wasmtime 等核心组件，长时间搁置可能拉大版本差距 |
| [#8103 actions 组 8 更新](https://github.com/nearai/ironclaw/pull/8103) | `github_actions` | 15 天（自 09-20） | 中 — 含 `setup-node` 大版本跨跃（4→7），建议确认 CI 兼容性 |
| [#8114 everything-else 组 31 更新](https://github.com/nearai/ironclaw/pull/8114) | `size: XL, risk: low` | 8 天（自 09-27） | 中 — 包数量多但风险低，建议拆分或批量快速处理 |
| [#8123 tokio-ecosystem 组 3 更新](https://github.com/nearai/ironclaw/pull/8123) | `tokio` | 1 天（自 10-04） | 低 — 常规小批量，可随下一轮评审合并 |

**重点提醒**：#7834 已积压超过一个月且包含风险评估为 medium 的 wasmtime 相关升级，属于最值得优先人工介入的积压项。建议维护者尽快确认升级影响面，避免 Wasm 体验与上游脱节。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-05

## 1. 今日速览

过去 24 小时项目保持中等偏上活跃度：Issue 侧 5 条更新（3 条活跃/新开、2 条关闭），PR 侧 6 条更新（3 条待合并、3 条关闭），无新版本发布。开发侧主要集中于渲染器与协作体验优化，@alison-xx 连开 3 个功能/修复 PR，覆盖长问题可读性、工件路径推断和模型选择分组；MCP 工具选择相关两个 PR（#2710、#2789）今日关闭，意味着 MCP 精细化配置能力有实质收敛。不过，社区侧活跃讨论仍集中在多个历史遗留 Bug（定时任务可靠性、MCP 环境变量透传、Agent Engine 重启），且半数已带 stale 标签，说明维护响应存在一定滞后。整体看项目在前端体验与 MCP/OpenClaw 集成的迭代节奏良好，但调度稳定性问题的积压仍是健康度短板，综合评定为 **中等活跃、局部风险**。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日关闭/合并的 PR 共 3 个，均属功能增强范畴：

- **feat(mcp): pass per-server toolFilter and parallel tool calls to OpenClaw**（[#2710](https://github.com/netease-youdao/LobsterAI/pull/2710)）
  该 PR 打通了 OpenClaw 已有的 per-server MCP 工具选择能力（`mcp.servers.*.toolFilter`）与并行工具调用开关，使其在 LobsterAI 配置同步中真正生效。解决了此前"用户无法只加载会话所需 MCP 工具"的问题，是 MCP 集成深度的一次关键补全。

- **feat: mcp tool picker**（[#2789](https://github.com/netease-youdao/LobsterAI/pull/2789)）
  与 #2710 配合，为渲染器侧提供 MCP 工具的交互式选择界面，从配置和 UI 两个层面完成 MCP 工具选择的闭环，今日一并关闭，功能完整性显著提升。

- **feat(preset-agents): add 6 new preset agent templates**（[#1008](https://github.com/netease-youdao/LobsterAI/pull/1008)）
  将预设 Agent 模板从 6 个场景扩展至 12 个，覆盖社区高频需求场景。不过该 PR 已带 stale 标签，距今 6 个多月才关闭，且不明确是否为正常合入，维护者需确认补丁内容是否已落库。

整体来看，MCP/OpenClaw 方向的「配置同步 + 工具选择 UI」双端能力已形成完整链路，是近期最有价值的进展；预设 Agent 模板库的扩充则为开箱体验提供增量。

## 4. 社区热点

今日评论数最高的均为 2 条评论的 Issue，但由于都带 stale 标签，实际更多是被机器人刷新而非新讨论，仍需关注背后的用户诉求：

- **#850 定时任务关闭后仍触发执行**（[Issue](https://github.com/netease-youdao/LobsterAI/issues/850)）
  评论 2 条。用户明确预期"关闭后不再触发"，实际行为是关闭后继续执行。属于调度核心逻辑的可复现 Bug，用户已提供截图证据。该问题已开放超过 6 个月，属于社区高感知问题。

- **#1003 关于 Notion MCP 的问题**（[Issue](https://github.com/netease-youdao/LobsterAI/issues/1003)）
  评论 2 条。用户排查了 Token 配置和环境变量命名，仍收到 Notion 401，判断问题出在 LobsterAI 的 MCP Bridge 层（`child_process.spawn` 环境变量未传递/未正确命名）。该 Issue 今日被标记 CLOSED（stale），但并未说明是否真正修复，用户诉求仍是开放验证状态。

- **#1007 请教解决 agent engine 无限重启的方法**（[Issue](https://github.com/netease-youdao/LobsterAI/issues/1007)）
  评论 2 条。用户持续遇到 Agent Engine 无限重启，附有截图，寻求配置层面的解决方案。同样被 stale 关闭，未见官方修复说明。

三点共同指向：**任务调度可靠性**、**MCP 子进程环境隔离**和**Agent Engine 进程稳定性**，是当前社区最关注的确定性痛点，建议维护团队优先安排专项排查。

## 5. Bug 与稳定性

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 高 | [#837](https://github.com/netease-youdao/LobsterAI/issues/837) | 定时任务触发异常后一直失败，重启才能恢复；锁屏状态下定时任务会复现异常，且所有后续任务均持续失败 | OPEN，stale，无直接 Fix PR |
| 高 | [#850](https://github.com/netease-youdao/LobsterAI/issues/850) | 定时任务关闭后仍触发执行，与用户预期逻辑不符 | OPEN，stale，无直接 Fix PR |
| 中高 | [#1007](https://github.com/netease-youdao/LobsterAI/issues/1007) | Agent Engine 无限重启，配置调整未能解决 | CLOSED（stale，非修复性关闭），无 Fix PR |
| 中 | [#1003](https://github.com/netease-youdao/LobsterAI/issues/1003) | MCP Bridge 未将环境变量正确传给 `child_process.spawn` 启动的 Notion MCP Server，导致 401 | CLOSED（stale），无直接 Fix PR |

今日未发现新的崩溃或回归类 Bug，但没有一个历史稳定性问题获得明确的修复 PR。其中 #2710/#2789 的 MCP 配置能力增强可能间接改善 #1003 的工具加载场景，但环境变量透传是否已

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

# CoPaw 项目动态日报 — 2026-10-05

> 数据来源：github.com/agentscope-ai/CoPaw（issues/PR 实际指向 QwenPaw 仓库）  
> 统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时项目活跃度中等偏高：**11 条 Issue 更新**（10 条活跃、1 条关闭）与 **8 条 PR 更新**（7 条待合并、1 条关闭）并行推进，无新版本发布。社区反馈集中在**稳定性问题**（内存耗尽、事件循环冻结、会话丢失）与**插件安装环境缺陷**两大方向，其中 #8106 引发的插件安装故障已获得对应修复 PR #8107，显示维护响应及时。但多个人工智能链路关键 Bug（#7722、#7840）处于长期搁置状态，评论数高却未见修复方案，需关注积压风险。整体判断：项目处于频繁迭代期，Bug 反馈活跃，但核心稳定性问题消化速度待提升。

---

## 2. 版本发布

无新版本发布（最新 Releases 为空）。

---

## 3. 项目进展

今日无 PR 被合并，仅 **1 个 PR 被关闭**，另有 **1 个新 PR** 直接修复昨日上报的严重 Bug，整体进展偏向前端稳定性补强与 Bug 修复阶段。

### 今日关闭

| PR | 内容 | 状态 |
|----|------|------|
| [#7299 fix(console): reject conflicting chat payloads](https://github.com/agentscope-ai/QwenPaw/pull/7299) | 拒绝聊天进行中二次非重连 `POST /api/console/chat` 的冲突负载，避免 API 返回 200 但消息实际未执行的状态不一致问题 | **CLOSED**（first-time-contributor） |

### 待合并重点 PR（今日更新）

| PR | 内容 | 关联 Issue | 亮点 |
|----|------|-----------|------|
| [#8107 fix(plugins): sanitize pip subprocess env and tolerate cache-invalidation failures](https://github.com/agentscope-ai/QwenPaw/pull/8107) | 清理 pip 构建环境中泄漏的 `PIP_TARGET`，并容忍 `importlib.invalidate_caches()` 失败 | 修复 #8106 | first-time-contributor，size/S |
| [#8102 fix(console): recover boot from failed entry loads with watchdog error surface](https://github.com/agentscope-ai/QwenPaw/pull/8102) | 控制台入口 chunk 加载失败时展示错误态 + Reload 按钮，带一次自动重试 | 修复 #8094 | size/M |
| [#8108 fix(console): make lazy-route loading retryable after chunk failures](https://github.com/agentscope-ai/QwenPaw/pull/8108) | 懒加载路由在 chunk 失败后可真正重试，避免卡死在失败页 | 修复 #7815 | size/S |

**小结**：今日项目进展主要体现在**修复前置**——4 个 PR 对应 4 个已上报 Bug 的修复方案，其中 #8107 直接命中插件安装阻塞问题，若合并将解除容器环境 Pluign 安装的硬阻塞。但核心的内存栈与事件循环问题未见专门修复，整体进度属于“打补丁”阶段。

---

## 4. 社区热点

### 讨论热度最高

| Issue | 评论数 | 主题 | 诉求分析 |
|-------|-------|------|---------|
| [#7722 [Bug]: Memory exhaustion compounds through three paths](https://github.com/agentscope-ai/QwenPaw/issues/7722) | **6** | 容器内存以 ~1MB/s 速率耗尽，最终 OOM 挂起，且包含**三条复合路径**（无界流缓冲、keep-alive 实例堆积、doom-loop 门禁绕过） | 用户做了深度取证（v2.2.0 复现、逐路径分析），期望不止修表面症状，而是系统性重构资源生命周期 |
| [#7840 [Bug]: Plugins share the host event loop](https://github.com/agentscope-ai/QwenPaw/issues/7840) | **5** | 插件同步 I/O 冻结整个实例 40 秒，无契约、无监控、无隔离 | 反映**插件隔离性**已成为用户真正痛点——不是功能缺失，是架构级风险 |

### 次热点

- [#7026 deepseek-v4-pro 调用时 chat_template_kwargs 未被 extra_body 包装](https://github.com/agentscope-ai/QwenPaw/issues/7026)（3 评论）——模型兼容性，OpenAI SDK TypeError。
- [#7599 opencode go 套餐模型一直 "MissingSessionID"](https://github.com/agentscope-ai/QwenPaw/issues/7599)（3 评论）——第三方模型接入兼容性。

**社区声音**：用户已从“使用问题”转向“架构审计”层面——#7722 的完整内存分析、#7840 对插件隔离的强烈建议，说明用户群体技术深度较高，对项目架构演进的期待值大。

---

## 5. Bug 与稳定性

按严重程度排序。标注是否已有修复 PR。

### 严重（导致不可用/数据丢失）

| Issue | 简述 | 状态 | 对应修复 PR |
|-------|------|------|------------|
| [#7722 内存耗尽（三路径复合）](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 容器内存持续增长直至 OOM，服务完全挂起 | OPEN（6 评论，9/12 创建） | 无 |
| [#7840 插件同步 I/O 冻结整个实例](https://github.com/agentscope-ai/QwenPaw/issues/7840) | 任一插件同步调用阻塞事件循环，所有 agent/channel 全部冻结 ~40s | OPEN（5 评论，9/17 创建） | 无 |
| [#8109 流错误导致会话 100% 丢失](https://github.com/agentscope-ai/QwenPaw/issues/8109) | agent 间调用流错误后，被调用 agent 的会话内容完全丢失 | **CLOSED**（今日关闭，10/05 创建） | 未知（已关闭但摘要未说明修复） |

### 中等（核心功能受阻）

| Issue | 简述 | 状态 | 对应修复 PR |
|-------|------|------|------------|
| [#8106 插件安装失败：PIP_TARGET 泄漏 + PYTHONPATH shadowing](https://github.com/agentscope-ai/QwenPaw/issues/8106) | 容器中安装带 `requirements.txt` 的插件必失败，报 `Cannot set --home and --prefix together` | OPEN（10/04 创建） | [#8107](https://github.com/agentscope-ai/QwenPaw/pull/8107)（OPEN） |
| [#8105 工具审批按钮失效——同意/拒绝均执行拒绝](https://github.com/agentscope-ai/QwenPaw/issues/8105) | 审批形同虚设，只能等待超时；审批提示的信封图标无响应 | OPEN（10/04 创建） | 无 |
| [#8092 内容审查误报被当作 bad_request，无重试无回退](https://github.com/agentscope-ai/QwenPaw/issues/8092) | 阿里式网关 `data_inspection_failed` 误判正常对话，直接终止 turn | OPEN（10/03 创建） | 无 |

### 轻微（体验/恢复性问题）

| Issue | 简述 | 状态 | 对应修复 PR |
|-------|------|------|------------|
| [#8094 控制台启动画面无重试无错误提示，WebView2 缓存可永久阻断启动](

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