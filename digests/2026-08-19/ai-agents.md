# OpenClaw 生态日报 2026-08-19

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-19 00:36 UTC

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



---

## 横向生态对比

# 个人 AI 智能体开源生态横向对比分析报告（2026-08-19）

## 1. 生态全景

当前个人 AI 智能体/自主 Agent 开源生态表现为 **“高活跃头部 + 明显长尾分化”**：以 ZeroClaw、IronClaw、Moltis 为代表的核心项目在 24 小时内均保持数十条级别 Issue/PR 更新或版本发布，而 TinyClaw、ZeptoClaw、EasyClaw 等项目则处于零活动状态。整个行业正处于从“对话式 Chatbot”向“可执行自动化工作流”迈进的关键阶段——多轮上下文记忆、跨渠道一致性、容器兼容性、成本治理与安全审计已成为用户最高频的诉求。项目间出现明显归一化趋势：解决“任务持续执行”问题的方式趋同（持久化记忆 + 会话作用域 + 工具路由），盈利与商业化尝试也开始与底座能力解耦。

---

## 2. 各项目活跃度对比（2026-08-18 ~ 2026-08-19）

| 项目 | Issues（24小时） | PR（24小时） | Release | 健康度判断 |
|------|-----------------|--------------|------------------|------------|
| **OpenClaw** | 未提供 | 未提供 | 未提供 | 核心参照项，暂无观测数据 |
| **ZeroClaw** | 50 条更新（31 活跃/19 关闭） | 50 条更新（3 合并/关闭） | 无 | 活跃度高，但维护者评审为最大瓶颈 |
| **IronClaw** | 22 条重点 update | 39 条重点 update | `v1.3.0-rc.2` | 高度活跃，双轨推进（稳定化 + 新特性） |
| **Moltis** | 2 个 Issue 关闭 | 5 个 PR（4 合并/关闭） | 2 个版本 | 高活跃且维护者响应速度快，长尾清理完成 |
| **NanoBot / PicoClaw / LobsterAI** | 未提供 | 未提供 | 未提供 | 今日无动态数据 |
| **TinyClaw** | 无活动 | 无活动 | 无 | 休眠状态 |
| **ZeptoClaw** | 无活动 | 无活动 | 无 | 休眠状态 |
| **EasyClaw** | 无活动 | 无活动 | 无 | 休眠状态 |

> 注：Issues/PR 数据均为“该时间窗口内更新/新建/关闭”的数量，而非项目总量。

---

## 3. OpenClaw 在生态中的定位

根据生态结构推断，OpenClaw 是这些分支项目的“公共底座”——大量派生项目（ZeroClaw、NanoClaw、Pico、TinyClaw 等）以其名为基础做垂直演化，说明OpenClaw已经建立命名规范与影响迁移。

对比当前三个活跃项目：

- **ZeroClaw**：重运行时机制（目标模式、多轮记忆、渠道接入），本质上像在 OpenClaw 基础上补“长期任务和持久状态”能力。
- **IronClaw**：重生产化，跟进稳定发布（v1.3.0-rc.2）、WebUI 设计系统、Slack/Google Docs 等垂直集成，更像是面向企业的桌面端口/桌面分发。
- **Moltis**：重个人数据底座与自托管基础设施（Podman 兼容、本地 Files 库、设置浏览器），定位更接近“本地数据中心”。

若 OpenClaw 保持“中型的通用 Agent”角色，其优势是生态入口与规范统一；挑战是缺少上述项目在特定圈层的深度——长期记忆（ZeroClaw）、企业行政/费用可视化（IronClaw）、个人数据管理（Moltis）。社区规模上，仅从每天派生项目的活跃度看，OpenClaw 衍生可扩展到十级显著，但生态分散度升高，是否意味着核心需要急于建立更多官方插件和协议，值得关注。

---

## 4. 共同关注的技术方向

### 4.1 长期记忆与跨会话持久化
- **ZeroClaw**：#8303 提出“Goal mode”跨多轮探索，#9998 引入 Session 级 Session 作用域的持久化 Prompt 附件；直接解决 daemon 重启 / 对话被截断后丢失上下文的问题。
- **IronClaw**：#7185 报告“跨对话记忆不可靠”，用户多委抱怨上下文丢失；新里程碑 #7731 尝试集成为 Mnesis 记忆提供者从框架层寻找解。
- **Moltis**：虽然更关注本地文件持久化（PR #1206，Files 库），但也体现个人 AI 助手对数据留存和备份机制的重视。

**核心矛盾**：当前“上下文只能靠单轮 prompt”已远不能满足生产应用，多轮任务状态分割和可恢复性是所有项目正在攻克的“标配”。

### 4.2 自动化引擎和“可持续执行任务”
- **ZeroClaw**：目标半目标的 **bounded foreground Matrix work** 是唯一被 maintainer 认可并标记为 accept 的大方向。
- **IronClaw**：#26879 指出自动化运行触发执行不稳定；而 PR #7713 把 `/benchmark` 放进 QA 环境做闭环。
- **Moltis**：特斯拉车联接器（PR #1201）和 heartbeat 更新，本质上是把外部数据纳入 Agent 自动运营。

### 4.

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>



</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-19

> 数据窗口：2026-08-18 ~ 2026-08-19 | 来源：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时项目保持**高活跃但偏“讨论型”**状态：Issues 更新 50 条（新开/活跃 31、关闭 19），PR 更新 50 条（待处理 47、已合并/关闭 3），**无新版本发布**。值得警惕的是 PR 队列中仍有大量 `do-not-merge` + `needs-maintainer-review` 标签的积压大 PR（安全、配置、Telegram/WhatsApp 频道等），说明**维护者评审是当前最大瓶颈**。社区讨论最密集的话题集中在：RFC 目标模式（bounded foreground matrix）、Windows 测试套件持续失败、依赖安全扫描告警，以及一批 7 月提交的 PR 长期未合入。整体项目健康度中等偏上，但有必要在瓶颈上看到积极的审阅结论。

---

## 2. 版本发布

过去 24 小时无新版本 Release（最新 Releases 无）。**无版本发布。** 请等待维护者给出 v0.8 里程碑相关节奏（见 [RFC #5574 相关决策 #5626](https://github.com/zeroclaw-labs/zeroclaw/issues/5626)）。

---

## 3. 项目进展

今日可确认的合并/关闭项并不多（整体 3 个），其中最值得关注的是：

- **PR #10009 [CLOSED] — `fix(memory): key conversation autosave suppression on turn origin`** — 修复了对话记忆自动保存的一条隐蔽规则：原来的判断逻辑通过截取前缀（`[cron:`、`[Heartbeat Task` 等）来跳过合成对话保存，但心跳机制worker会绕过该前缀导致“误保存/漏保存”。合并后记忆系统对对话来源的判断将更加准确，可显著减少噪声记忆和 token 消耗。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10009

- **Issue #10097 [CLOSED] — Advisory scan failed (2026-08-18)** — 自动安全扫描告警已关闭（大概率已通过 deny.toml 忽略列表或依赖升级解决），但数据中未透出具体处置；建议持续关注 deny.toml 审计清单与 wasmtime-wasi CVE 的追责。但其关联的背景任务仍在进行中——[#8519 仍在跟踪 cargo-audit/deny 的 ignore 清单漂移](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)。

更多 PR（总计 50 条）中，大部分“待合并”高亮还处于等待 maintainer review 状态，整体来看项目的前进速度慢于三天前的篇排产，需要维护者的合入节奏再抓一遍。

---

## 4. 社区热点

### 最热 Issue：Goal mode v1 —— 为跨多轮任务做出有边界持续性的目标执行
[#8303 — RFC: Goal mode v1 — bounded foreground Matrix work 💬 22 条](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)

- **背景**：ZeroClaw 缺少一个“跨多个 agent turn 都可持续推进的有限目标”的耐久机制。
- **演进点**：早期提案计划一次性引入重启交接、channel 进入、Web、异步子任务；本次 RFC 剥离掉这些边界，只专注在“前景矩阵工作”（bounded foreground Matrix work），复杂度大幅收敛。
- **评论区诉求**：用户核心抱怨是“目标执行没法在多轮间延续”，易丢上下文，这是 Agent 框架向生产级演进必须要有的能力。目前标记 `status:accepted, no-stale`，风险 high —— 维护者已认可方向，等待实现。

### Windows 74 个测试的挫败感

[#7462 — 74 test failures on Windows — Unix-only commands, path semantics, console encoding 💬 17 条](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)

- 中文 Windows 11 环境（代码页 936）下运行测试套件，74 个用例失败；CI 只跑 Linux 因此长期无声。
- 社区讨论构成几个方向：Unix 命令行假设、路径语义、控制台编码（GBK vs UTF-8）。
- 已 `P1 + accepted + no-stale`，背后是 Windows 用户的对基础可用性的强烈需求；这个 Issue 不去、ZeroClaw 就无法宣称跨平台稳定。

### 新 RFC：#9998 — Session-scoped persistent prompt attachments 💬 4 条

[#9998 — RFC:控制 态:Session 作用域的持久化 Prompt 附件](https://github.com/zeroclaw-labs/zeroclaw/issues/9998)

- 创建于 08-14，迅速拿到 4 条最终回复。针对会话历史被截断 / daemon 重启后丢失用户目标和约束的问题；尤其在**并行会话**中此问题暴露明显。
- 从路径标记看（agent、channel、memory、runtime、security、ACP），这实际上可能成为跨模块的较高优先级话语权。

### 其他需要综合关注的 PR 讨论

- #10107（[今天 08-19 新建、p1](https://github.com/zeroclaw-labs/zeroclaw/pull/10107)）：修复 Google STT API key 出现在 URL 中的安全风险。
- #8642（[P1 bug](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)）：MCP/Tool schema 克隆导致解限的 RSS 内存增长（从 WSL2 OOM 拆出），被 4 个开发者跟进。

---

## 5. Bug 与稳定性

按严重度排序（P1 → P2 ）：

### 😡 P1 / 高风险

- **Windows 74 个测试失败（%7462）** — S2 退化、P1、已 accepted、no-stale；无 fix PR 指认。
  拆解：CI 从未跑 Windows → 错别字/路径语义/控制台编码累积成墙；这必然要新增 Windows 测试 job 的根因治理层面。
  链接： https://github.com/zeroclaw-labs/zeroclaw/issues/7462

- **MCP/tool-schema 克隆导致不规范 RSS 增长（#8642）** — 从 WSL2 OOM 多根因果中拆单，内存刀式/被困已经波及 WSL2 重度用户；目前显式需要内存布局确认实验。
  链接： https://github.com/zeroclaw-labs/zeroclaw/issues/8642

- **Advisory 扫描告警（#10097 已关闭）** — 说明新增 advisory 传入时已使扫描失败一次，但关闭记录未内嵌具体处置；该告警把 `deny.toml` 的 ignore 治理推到台前。背景件 #8519 继续开。
  链接： https://github.com/zeroclaw-labs/zeroclaw/issues/8519

- **PR #10107**：Google STT API key 在 URL 中裸奔（今日新提交修复）——一旦代理日志/监控捕获 URL，密钥即外泄；S1 级安全修复，已开 PR。
  链接： https://github.com/zeroclaw-labs/zeroclaw/pull/10107

### ♿ P2 / 中等

- **# 10009 记忆自动保存抑制 bug（已合并）** — 修复后 prompt 前缀指令论，保证 heartbeat 不被误判。
- **#9719（pr #9748）** — 旧 provider refresh 可能重写新会话的内存：引入 per-session generation counter 来避免替换 session 写回，修复已提交待 review。
  链接： https://github.com/zeroclaw-labs/zeroclaw/pull/9748

- **#9203）** — HTTP fan-in（POST /sop）实现已提交但等待维护者审批；absent 之外还存在无匹配不 fallback 的API 404 等。
  链接： https://github.com/zeroclaw-labs/zeroclaw/pull/9203

---

## 6. 功能请求与路线图信号

**从 Issue 看用户实际需求方向：**

1. **目标记忆/多轮持久化是最高呼声** — #8303（agreed RffC 推进中）加上 #9998（session-scoped attachments），两者合流给出生产级 Agent 的完整蓝图：长任务不丢上下文、重启后可恢复。下一步不意外出现在 0.8 版再把别的组件（acp/telegram/memory）收集打通。

2. **Slash 命令注册表统一（#7929）** — 用户明显被 web / ZeroCode TUI / channel 间的命令漂移搞疲惫了；这批断开的命令让客服机器人更不值得信任。已有 8 条评论，`Risk: high`，如果排除混淆 P2 已接受，值得在版本 0.9 引入“单一命令真实数据源 + 生成器”。

3. **渠道流式消息补齐** — DingTalk（#8228）、Telegram shared group（#9772）、WhatsApp 策略修正（#9609）在 P2 下都有 PR/Issue，方向是**多渠道全渠道一致体验**；#9772（Telegram 群组共享 session）已造成序列 40+评论数的用户关注 —— 这是多人在群里协作的核心。

4. **配置 / 可观测体验**：
   - 活跃日志路径展示到零度诊断（#8650）
   - 活动运行时上下文 visible in Dashboard（#8382）
   - cron shell 原始 stdout 输出（#8409）——明显诞生于 Dogfooding 场景，用户想要更接近 Unix 管道的体验。

5. **清理为何释放 / 继承路径**：
   - 删除孤儿 SkillForge engine（#8309）、老 DORA 遥测（#9451 in review）等。这些“清理型 PR”实际上为 0.8.0 的破坏性做了低风险测试。

---

## 7. 用户反馈摘要

抽自 Issues 评论（尽量原文角度）：

- “**In this tos-moving, list modeling depends…**”（#8303）一名开发者表示即使接受 RFC，也需要内核不同的“多轮状态转移/分批工作”能力；不能忍受每个任务都塞进一个 turn。
- “**CI 一个人的平台特殊考虑，所有人能力受影响极大。**”（#7462 评论）Windows 用户用简体中文控制台 936 代码页跑 74 个失败时，信任感损耗明显。这要比任何文档文案都背书。
- “**我们已经在生产环境跑 Slack/Telegram 队列，session 不清理的历史会爆 token 费用。”**（#8134，session_ttl_hours）——用户明确想看到 token 花费时长。类似反馈是渠道内存清理优先级被拉高的

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>



</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>



</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-08-19

## 今日速览

项目当前处于高度活跃状态，过去 24 小时内有 22 条 Issue 更新、39 条 PR 更新，并发布了 `v1.3.0-rc.2` 候选版本。核心方向集中在 **v1.3.0 稳定化** 与 **v1.4.0 功能路线图** 的双轨推进：一边修复升级崩溃、自动化运行不可靠等影响用户的关键问题，另一边持续推进新的设计系统、通知收件箱、Google Docs 语义编辑等新能力。社区讨论焦点集中在工具/扩展生态痛点，以及 Slack 等渠道的用户接入体验。

---

## 版本发布

### [ironclaw-v1.3.0-rc.2](https://github.com/nearai/ironclaw/releases/tag/v1.3.0-rc.2)（2026-08-18）

**主要修复：**

- **修复 1.2.x 升级崩溃**：修复了升级时 `activation_state` 字段导致的启动时崩溃循环问题，从 1.2 升级到 1.3 的用户现在可以正常启动。
- **Reborn 运行时支持可选 Worker SSH**：支持在运行 IronClaw 时通过公钥认证访问 worker 的 SSH（端口 2222），作为可选项启用。

**迁移注意：** 升级至 `v1.3.0-rc.2` 时需注意，此版本为候选版，建议在升级前备份部署数据，并验证自定义扩展与大模型的兼容性。

---

## 项目进展

今日共关闭/合并 15 项 PR，以下是火星与代表进展：

- **[PR #7734 — 重构、拆解测试模块（已关闭）](https://github.com/nearai/ironclaw/pull/7734)**：完成两个测试模块的提取，共迁移 317 个测试，零生产代码改动，提升测试模块的可维护性。
- **[PR #7713 — 测试 /benchmark 在 qa-automation-preview 上的闭环（已关闭）](https://github.com/nearai/ironclaw/pull/7713)**：验证了 `/benchmark` 命令在 QA 环境中的日常工作流，为后续自动回归基准测试铺平道路。

此外，今日多个 open PR 已获得更新，包括：

- **[PR #7735 — 为对话产物添加运行时间证据](https://github.com/nearai/ironclaw/pull/7735)**：为 bug 报告提供更精确的时间数据，便于开发者复现性能问题。
- **[PR #7737 — Slack 文档修复](https://github.com/nearai/ironclaw/pull/7737)**：修复 Slack 渠道文档中缺失的权限 scopes（`reactions:read/write`、`im:write`），使其与实现一致。
- **[PR #7724 — WebUI 语音输入](https://github.com/nearai/ironclaw/pull/7724)**：通过 NEAR AI Whisper 在 composer 中实现语音转文字，支持边写边转文字，提高创作效率。
- **[PR #7728 — Google Docs 语义编辑工具](https://github.com/nearai/ironclaw/pull/7728)**：新增 4 个语义编辑能力（结构化检查、批量编辑、表格填充、确定性验证），适配 Google Docs。
- **[PR #7682 — Slack 匿名用户连接引导私密化与一键连接](https://github.com/nearai/ironclaw/pull/7682)**：把 Slack 通道中连接的用户引导信息变成私密消息，并提供一键连接链接（关联 Issue #7681）。
- **[PR #7697 — 持久化用户收件箱与产品 API](https://github.com/nearai/ironclaw/pull/7697)**：为通知与用户收件箱添加持久化、分页、未读计数、已读/归档等全生命周期 API。

整体来看，项目在强化质量收尾（测试、文档、可靠性）的同时，也持续交付新能力，社区与团队贡献活跃。

---

## 社区热点

- **[Issue #6879 — 自动化运行引擎执行不稳定](https://github.com/nearai/ironclaw/issues/6879)**（活跃，8-18 更新，评论 1）：社区指出自动化触发运行存在结构性不一致，小型模型（如 DeepSeek V4 Flash）在自动执行时容易失败。问题被标记为 v1.3.0 / v1.4.0 两版共性，反馈与讨论热度高。

- **[Issue #7185 — 对话间记忆不可靠（已关闭）](https://github.com/nearai/ironclaw/issues/7185)**（2 条评论，8-18 更新关闭）：多测试人员报告跨对话时上下文记忆丢失，影响 agent 连续协作任务的体验。该问题已关闭，但是用户注意力集中的代表。

- **[Issue #7673 — BudgetLedger 记账细化收割点问题](https://github.com/nearai/ironclaw/issues/7673)**（1 条评论，8-18 更新）：社区更关注成本核算，兴趣时间窗口限制了重复计费、持久化退出兼容问题的反馈。

- **[PR #6994 — OOBE 自动化任务原型（WebUI）](https://github.com/nearai/ironclaw/pull/6994)**（持续更新中）：作为 WebUI 设计系统的一部分，该 PR 的首屏自动化引导设计获得持续更多关注，承载了 WebUI 的用户体验演进方向。

---

## Bug 与稳定性

### 严重（High）

- **[Issue #7720 — 1.3.0-rc.1 升级后崩溃循环（待处理）](https://github.com/nearai/ironclaw/issues/7720)**：任何从 1.2.x 升级到 1.3.0-rc.1 的部署都会在启动时崩溃，导致 worker HTTP/SSH 端口失效。此问题已在 **rc.2 中修复**（新版本发布）。用户可直接升级至 v1.3.0-rc.2。关闭前的兼容性测试建议持续关注。

### 中等（2）

- **[Issue #7714 — libSQL 写连接驱动引起级联失效（已关闭）](https://github.com/nearai/ironclaw/issues/7714)**：在 PinchBench 测试中，资源治理器的增量日志写停滞导致 40 秒级联错误。该问题已被修复并关闭。
- **[Issue #7638 — 线程删除失败用 UI 阻断报警（已关闭）](https://github.com/nearai/ironclaw/issues/7638)**：已用全局 toast 替换 `window.alert()`，提升 WebUI 操作一致性。

### 低（2）

- **[Issue #7639 — 页面反馈横幅统一（已关闭）](https://github.com/nearai/ironclaw/issues/7639)**：统一了 Jobs、Projects、Workspace 等页面的 inline notice 组件，已合并/关闭。
- **[Issue #7727 — Catalog capabilities 字段未被使用](https://github.com/nearai/ironclaw/issues/7727)**（未关闭）：字段为必填但实际读取，且对 manifest v3 工具的读取也一样，可能是值得优先处理的轻微——如后续有在使用则另有价值。

---

## 功能请求与路线图信号

- **[Mnesis 作为内存提供者（epic）](https://github.com/nearai/ironclaw/issues/7731)**：新增里程碑（v1.4.0），探索集成 Mnesis 作为内存供应商。若对相关对话记忆（#7185）问题，可作为未来替代方案。
- **[Sandbox 方案（CLIs）（epic）](https://github.com/nearai/ironclaw/issues/7732)**：以 CLI 形式实现 e2e 沙箱化，反映出对安全性与稳定性的要求升级。
- **[树形交付面：oamp 核心工具组装](https://github.com/nearai/ironclaw/pull/7491)**：大规模进行中，将被更新为 `read`、`write`、`edit`、`glob`、`grep`、`bash` 六个代码面，强化开发工具的标准化。
- **[Google Docs 语义编辑工具](https://github.com/nearai/ironclaw/pull/7728)**：v1.3.0 并存原 11 个传统工具，新增语义能力，预计对脚本编辑/表格处理有较大提升。
- **[Slack 未绑定用户连接引导逻辑升级](https://github.com/nearai/ironclaw/pull/7682)**：将隐私性与接线提升到新台阶（对应 #7681），体现了产品体验的精细。
- **[Voice-to-Text 河南 AI Whisper](https://github.com/nearai/ironclaw/pull/7724)**：用于快速输入，可能成为 WebUI 输入新路径。

---

## 用户反馈摘要

从本期 Issues 评论与多方反馈获取：

- **跨会话记忆不可靠是主流痛点**（#7185）：用户在测试时多次发现对话间的上下文丢失，影响真实工作流连续性。`Companion` 等多个角色也同时反馈沟通不可靠的结构性问题，而非偶发噪音。
- **自动化运行“运气”依赖**（#6879）：部分启动成功但更多情况是触发成功后变成“无产出的普通对话”，对自动化没有好结果。用户驻留在深层原因剖析与快速修复。
- **BudGdtLedger 记账偏向宽容**（#7673）：用户在 review 中发现计数逻辑过于保守，预期外提前停止与超额预算不存在，可预期体验平稳。

---

## 待处理积压

以下为较长时间未合并/关闭但状态活跃，提醒维护者关注：

- **[PR #3676 — 安全文档重写](https://github.com/nearai/ironclaw/pull/3676)**（5 月创建，一直更新中）：重构“安全”章节，面向评估者解释 secret 与沙箱保护机制。虽然该 PR 持续更新，但从 5 月至今已暴露 3 个多月，建议加速进度。
- **[PR #6994 — WebUI OOBE 原型](https://github.com/nearai/ironclaw/pull/6994)**（8 月中旬更新）：体现 WebUI 首次引导设计的尝试，仍需评审。
- **[PR #7038 对应设计系统生态](https://github.com/nearai/ironclaw/pull/7257)**：防线延缓，设计系统需要首阶段评审。
- **[Issue #6879 — 自动化运行不稳定的 epic](https://github.com/nearai/ironclaw/issues/6879)**：虽然处于 open 状态，但持续多天问题即未被修复，作为 v1.3.0 与 v1.4.0 双版本目标，建议留意其调度优先级。

---

**报告日期**：2026-08-19  
**数据来源**：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)  
**生成时间**：基于 2026-08-18 至 2026-08-19 的 24 小时数据。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>



</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 — 2026-08-19

## 1. 今日速览

过去 24 小时 Moltis 项目保持高活跃度和高强度迭代：共关闭 2 个 Issue、4 个 PR，并新发布 2 个版本。项目在容器兼容性、配置管理、文件管理和外部 API 集成方面均有实质性进展，其中 Podman 支持问题从用户报告到修复历时近一个季度，今日正式闭环。有 1 个新的特斯拉 Fleet API 连接器 PR 待合并，社区对外部生态连接的期待正在转化为现实交付。整体而言，项目正处于功能密集落地、维护者响应迅速的稳定推进期。

## 2. 版本发布

今日发布了两个新版本：

- [v20260818.08](https://github.com/moltis-org/moltis/releases/20260818.08) — 2026-08-18
- [v20260818.06](https://github.com/moltis-org/moltis/releases/20260818.06) — 2026-08-18

两次发布均未附 changelog 描述，但从时间线和合并内容推断，极有可能包含以下改动：OpenAI reasoning 工具调用路由优化、心跳配置修复（PR #1209）、README 星标图修复（PR #1211）以及 Podman 沙箱支持改进（PR #1106）。由于未提供官方迁移说明，建议升级前关注各 PR 是否引入配置文件结构变化（如 heartbeat.update 现在按 patch 处理），并回测相关配置。

## 3. 项目进展

今日合并 / 关闭的重要 PR 共 5 个，主要集中在后端稳定性、新功能落地和文档完善：

- **[PR #1198] Route OpenAI reasoning tool calls through Responses** — 将结合 `reasoning_effort` 与函数调用的 OpenAI 内建请求路由到 Responses API，并保持 Chat Completions 对无工具 / 无推理场景的兼容。这改善了多模型生态下复杂推理工具的可用性，属于基础设施层的重要升级。
- **[PR #1209] fix(gateway): treat heartbeat.update params as patch, not full config** — 修复 `heartbeat.update` 将入参覆盖整个配置导致的字段丢失问题，改为 patch 合并逻辑，直接修复了关闭的 issue #1187。
- **PR #1206] Add managed Files library and Settings browser** — 新增数据目录备份的 Files 库，支持流式上传、下载、移动、删除等身份认证 API，同时提供 Finder 风格的 Settings 浏览器和容器只读挂载适配，大幅拓宽了 Moltis 作为个人 AI 助手的本地文件管理能力。
- **PR #1106] fix(sandbox): Support Podman escape hatches** — 添加互斥的 Podman 沙箱主机 socket 透传和特权嵌套模式，支持沙箱重建、失败关闭，并改进了 rootless Podman 诊断。这是从初期 sandbox 角度完整修正 Podman 兼容性问题。
- **PR #1211] fix(readme): restore broken star history chart** — 将已损坏的 Star 历史图表切换为无需 token 的替代数据源，修复了项目 README 展示问题。

这些改动综合表明，Moltis 在功能广度、配置正确性和文档可用性上都有正向提升，尤其 Files 库的上线与 Settings 浏览器呼应了从“ AI 内联工具”到“全生命周期个人数据管理”的演进。

## 4. 社区热点

今日最受关注的 Issue 是：

- **[Issue #1095] [Bug]: Podman is not working via Moltis**（评论 2，👍 0）(https://github.com/moltis-org/moltis/issues/1095)

该问题由 @RokkuCode 在 2026-06-03 创建，直到 2026-08-18 才关闭，存活 2 个半月，期间积累了 2 条评论。用户明确诉求是：当 Podman 作为容器运行时与 Moltis 结合时不工作。这反映了社区对 Podman 作为 Docker 替代的真实生产需求，且此前索引内正处于功能缺失状态。今天的关闭意味着核心问题已被解决，是一条值得关注的高价值 Fix。

另外 **PR #1210**（Tesla Fleet API 连接器， OPEN）以及 **PR #1206**（Files 库 + Settings 浏览器）都属于新功能规模化上线，预计会引发用户试用和后续讨论。

## 5. Bug 与稳定性

- **⚠️ 高严重度（已修复）— Podman 兼容性崩溃**（Issue #1095）：Non-Podman 环境通过 Moltis 不可用，属于运行时阻断级问题。已由 PR #1106 在 8 月 18 日合并修复，同时补强诊断和失败安全逻辑。
- **⚠️ 中严重度（已修复）— Heartbeat 更新 UI 覆盖段**（Issue #1187）：`heartbeat.update` 接口 sliently 重置了表单，另一未表示字段（如 priority 或保留的配置项）导致数据丢失。该问题已由 PR #1209 改为 patch 合并修复。
- **较低严重度（已修复）— 文档图标断裂**（README Streak图）：star history 图表因 GitHub 星标 API 要求 token 而损坏，已通过切换数据源修复（PR #1211）。

无新增未修复的崩溃或回归问题被报告。

## 6. 特征功能与路线图信号

- **特斯拉数据连接器（PR #1210）**：新增 `moltis-connector-tesla` 只读适配器，将特斯拉车辆数据同步到本地快照存储，不发送车辆命令、不唤醒睡眠汽车。作者 @penso 的持续投入将连接器生态拓展到 IoT / 车辆数据，这暗示 Moltis 正在向“个人数据中台 + AI 自动化”的平台级演进。
- **Files 库与 Settings 浏览页（PR #1206）**：内置受限本地的文件管理 API 和支持 Folder 风格的设置浏览界面，意味着 Moltis 正走向商业化可配置的应用底座，服务于“自托管 + AI”这一核心场景。
- **OpenAI Responses API 路由（PR #1198）**：将工具调用 + reasoning_effort 的场景迁移到响应性更强的 Responses API，这条路线表明对高端推理层面的官方适配与兼容性优化成为常态。

## 7. 用户反馈摘要

在此前用户反馈之上，有两个关键声音值得提炼：

- **@RokkuCode（Issue #1095）**：核心痛点是 Podman 作为运行环境无法被 Moltis 识别和利用，很可能影响那些不使用 Docker Desktop、采用轻量级或根容器的用户。这类用户期待项目不把容器绑定在 Docker 上，而是抽象化底层容器运行时。该 issue 关闭后建议密切关注 Podman 后续用例反馈。
- **@IlyaBizyaev（Issue #1187）**：用户抱怨 UI 层面静默丢失不在表单里的配置字段，带来“UI 与配置文件不同步”的困惑。这说明用户经常通过文件手动修改配置，希望 UI 操作表现可预测的补丁而非覆盖。修复方向正确，但未来应期望增加用户配置导入导出的显式提示。

此外，**PR #1206** 的 Files 库 UI 并未出现在 Issue 反馈中，但结合 Settings 浏览器新增，可预期用户对「图形化配置 + 本地文件管理」的需求正在被大力满足。

## 8. 待处理积压

- **PR #1210 – Add Tesla Fleet API connector （OPEN）**  
  https://github.com/moltis-org/moltis/pull/1210  
  2026-08-18 创建，目前待合并。该 PR 是 8 月新增的重要功能分支，需关注 review 轮次与合并状态；一旦合并，将丰富 connector 生态，引入外部 API 同步模式。

- 另有两个 2026-06 创建的旧 Issue（#1095、#1106 关联）在 8 月中旬才关闭，整体上长期积压的问题已在今日前半缓解，未再观察到新的长期未响应的 bug 或 PR。  
  但可留意 **#1209 关联的 #1187** 修复是否会再次引爆「UI 与实际 config 差异」等细微反馈，值得在新修复版本中持续监控。

---

**总结**：Moltis 今日完成“老债清零、新栏竖立”，既有 Podman 长尾 issue 的关闭，又有 Files 库、Tesla 连接器等功能储备。整体健康度良好，修复速度与功能进度匹配活跃，证明项目运转在常态化和系统中。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>



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