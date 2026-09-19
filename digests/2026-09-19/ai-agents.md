# OpenClaw 生态日报 2026-09-19

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-19 02:13 UTC

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

# OpenClaw 项目动态日报 — 2026-09-19

---

## 1. 今日速览

过去 24 小时，OpenClaw 仓库保持高强度活跃：**500 条 Issue 更新**（新开/活跃 352 条，关闭 148 条）、**500 条 PR 更新**（待合并 267 条，已合并/关闭 233 条），并有新版本 **v2026.9.5** 发布，聚焦升级安全性与历史会话保留。社区讨论热度集中在 **Gateway 内存/性能问题、子代理消息传递丢失、SQLite 稳定性、WebUI 体验**等方向。值得注意的积极信号是：多个长期 P0/P1 问题（如 #148529 的 632-agent 大规模启动性能、#150201 的 Windows 升级卡死）已在过去几天内被关闭，说明维护团队正在集中清理积压的高优问题。但与此同时，仍有数个 P0 级稳定性问题（#149538、#143524 等）处于无修复 PR 状态，项目健康度整体可控但风险犹存。

---

## 2. 版本发布

### v2026.9.5（2026-09-19 发布）

**核心主题：更安全的升级与历史会话保留**

本版本围绕升级链路做了针对性增强（Release Notes 摘要）：

- **Doctor 保留会话历史与重复修复状态** —— 升级时不再丢失已有会话记录及 Doctor 的修复进度；
- **可完成带无效保留历史的升级** —— 此前因历史数据损坏而卡住的升级流程，现可正常走完；
- **避免反复停滞/停止仍在启动中的 Gateway** —— 修复了升级过程中 Gateway 仍在启动时被反复打断的问题。

关联引用：#149741、#149956、#148901、#149308（#14… 截断）。

**迁移注意事项**：本次版本无明显破坏性变更公告，但建议升级前运行 `openclaw doctor` 检查数据库完整性；若此前版本存在 SQLite 孤儿外键或 WAL 膨胀问题，请参考 #142586 的修复结果先行处理。

---

## 3. 项目进展

过去 24 小时有

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告
**分析日期：2026-09-19 | 数据来源：各项目 GitHub 公开仓库**

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现**开源参照物 + 同源 fork 分化**的格局：以 OpenClaw 为核心的"Claw 家族"（ZeroClaw、PicoClaw、NanoClaw、IronClaw、TinyClaw、ZeptoClaw、EasyClaw、CoPaw 等）占据生态主流，通过分叉在安全加固、轻量化、企业集成、多租户管理等方向差异化演进。社区活跃度高度分化——头部项目（OpenClaw、CoPaw）日 PR 动辄 50–500 条，尾部项目（TinyClaw、EasyClaw）连续无活动，生态呈现明显的"赢家通吃"与长尾并存特征。跨项目共同涌现实质性技术焦点：**渠道功能对齐、工具调用兼容性、存储生命周期治理、agent 执行安全性**，标志着生态正从"能跑通"向"稳定、安全、可治理"过渡。

---

## 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | Release | 活跃度 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 条（新开/活跃 352，关闭 148） | 500 条（待合并 267，合并/关闭 233） | **v2026.9.5** | 🔥🔥🔥🔥🔥 | 高强度迭代；P0 积压风险可控 |
| **CoPaw**（QwenPaw） | 25 条（新开/活跃 17，关闭 8） | 50 条（待合并 33，合并/关闭 17） | **v2.2.2-beta.1** | 🔥🔥🔥🔥 | 高活跃，Bug 多但修复响应快 |
| **Zeroclaw** | 21 条（新开/活跃 16，关闭 5） | 50 条（待合并 40，合并/关闭 10） | 无 | 🔥🔥🔥🔥 | 良好；安全类积压需优先处理 |
| **NanoBot** | 5 条新增/更新 | 14 条（合并/关闭 5） | 无（最新 0.3.5） | 🔥🔥🔥 | 快速迭代，回归修复响应极快（当日修复） |
| **LobsterAI** | 1 条新开 + 5 条 stale | 22 条（合并/关闭 8） | 无 | 🔥🔥🔥 | 开发侧活跃，社区侧冷清；6 个月登录 Bug 未闭环 |
| **NanoClaw** | 7 条新开/活跃 | 5 条待合并（**0 合并**） | 无 | 🔥🔥 | 外部贡献活跃但维护端吸收瓶颈明显 |
| **PicoClaw** | 1 条更新 | 4 条（合并 1） | 无 | 🔥🔥 | 平稳中速迭代；有 s stale 化苗头 |
| **IronClaw** | 1 条更新 | 2 条待合并（**0 合并**） | 无 | 🔥 | 合并节奏偏慢；40 天 XL 级 PR 悬置 |
| **ZeptoClaw** | 0 条 | 3 条（合并/关闭 2） | 无 | 🔥 | 健康；兼容性与安全双向推进 |
| **Moltis** | 0 条 | 2 条待合并 | 无 | 🔥 | 低活跃但方向明确（Groq 兼容） |
| **TinyClaw** | — | — | — | 💤 | 无活动 |
| **EasyClaw** | — | — | — | 💤 | 无活动 |

---

## 3. OpenClaw 在生态中的定位

**生态核心参照系**：OpenClaw 是唯一日均处理 1000 条 Issue/PR 动态的项目，相当于同族项目总和的 3–5 倍，且保持高频版本发布（v2026.9.5），是社区公认的技术基线。

- **相对优势**：维护规模与发布节奏遥遥领先；v2026.9.5 聚焦安全升级与会话保留，直接回应了大规模部署的两个核心痛点；近期已关闭多个 P0 积压（632-agent 启动性能、Windows 升级卡死），展现出集中清理高优问题的治理能力。
- **技术路线**：以 Gateway 为核心的长时间运行架构，强调**升级链路韧性**（Doctor 保留会话历史、避免启动中 Gateway 被打断）和 SQLite 稳定性，面向生产级持续运行场景。
- **社区规模**：从其他项目的 PR 描述可见其"生态底座"角色——LobsterAI 合入的 PR 直接声明"修复 OpenClaw 启动阻塞/飞书凭据错位"，说明下游项目已深度复用其代码并回补修复，构成**上游开源 + 下游分叉反哺**的共生结构。
- **相对短板**：Gateway 内存/性能问题、子代理消息传递丢失、WebUI 体验等长期议题仍处于讨论密集但修复分散状态；另有数个 P0 无修复 PR，说明规模本身也带来了稳定性治理压力。

---

## 4. 共同关注的技术方向

### 4.1 渠道能力对齐（涉及：NanoBot、PicoClaw、Moltis、ZeptoClaw）
- **NanoBot**：Discord 补齐 `replyToMessage`，对齐 Telegram 行为（#5800）；新增 Linear Agent 原生渠道（#5495）
- **PicoClaw**：QQ 频道支持更多附件类型，回复降级机制（#1349）
- **Moltis**：Groq 纳入 OpenAI-compatible 一级 provider，摆脱 genai fallback 降级（#1276）
- **ZeptoClaw**：OpenAI 兼容端点解析推理模型 `reasoning_content`（#703）

**共同诉求**：多 IM/Provider 交互必须在功能、Schema、路由层面与"一级渠道"完全一致，降级路径不再被接受。

### 4.2 存储/历史生命周期管理（涉及：OpenClaw、NanoClaw、Zeroclaw）
- **OpenClaw**：v2026.9.5 核心主题即历史会话保留与损坏历史恢复
- **NanoClaw**：`conversations/` 目录无限增长（#3735）、PreCompact 全量重写导致生产 OOM 崩溃循环（#3716）
- **Zeroclaw**：归档测试独立于 workspace fixtures（#10772）

**共同诉求**：对话归档/BLOB 需要 retention 策略、轮换机制与数量上限，否则在大规模部署中直接演变为 OOM/磁盘溢出事故。

### 4.3 执行安全与审批治理（涉及：Zeroclaw、NanoBot、ZeptoClaw）
- **Zeroclaw**：Git 全局选项绕过风险分类器（S0，#10966）、审批强制与 `always_ask` 保留（#9724）
- **NanoBot**：`tools.exec.jevGuard` 可选预检（#5815）；后台上下文压缩静默化（#5780）
- **ZeptoClaw**：面板密码登录限速，防暴力破解（#702）

**共同诉求**：自主 agent 的工具执行必须有可配置的安全护栏，且安全机制本身不能被参数注入绕过。

### 4.4 Agent 循环稳定性（涉及：NanoBot、NanoClaw、OpenClaw）
- **NanoBot**：跨会话回复串线回归（#5798/#5794）、网关重启后 RecoveryCoordinator 重入队（#5808/#5809）
- **NanoClaw**：心跳看门狗误杀合法 turn，可永久阻塞回复（#3455）
- **OpenClaw**：子代理消息传递丢失

**共同诉求**：多会话/多代理并发下的消息路由与恢复语义是最容易出严重回归的环节，需要系统性测试覆盖。

### 4.5 WebUI/移动端体验（涉及：OpenClaw、NanoBot、PicoClaw）
- **NanoBot**：移动端两次

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## NanoBot 项目动态日报 — 2026-09-19

### 1. 今日速览
过去 24 小时内 NanoBot 项目保持高度活跃：新增/更新 Issue 5 条、PR 14 条，其中 5 个 PR 被合并或关闭，无新版本发布。合并内容中包括一个高优先级的跨会话回复串线修复（#5794），以及 Discord 的 `replyToMessage` 功能对齐（#5800，并关闭了 3 月以来的 #1663）；另外还有大量 WebUI、agent 循环、Discord 生命周期清理相关补丁在今日集中产出。整体看，项目正处于**渠道能力补齐 + 稳定性/回归修复**双线并行的快速迭代期，社区活跃度和维护响应速度都较高。

### 2. 版本发布
无新版本发布（最新版本仍为 0.3.5）。但请注意：今天合并的 #5794 直接修复了 #5798 用户报告的 0.3.5 会话串线回归，预计会随下一补丁版本发布。

### 3. 项目进展
今日有 5 个 PR 被合并/关闭，核心进展如下：

| PR | 概要 | 影响 |
|---|---|---|
| [#5794](https://github.com/HKUDS/nanobot/pull/5794) | 修复 agent 循环中跨会话响应投递错误：用户在会话 A 发消息后切到 B，A 的回复可能错误出现在 B | 解决影响多会话场景的严重数据混乱问题，直接对应 #5798 |
| [#5800](https://github.com/HKUDS/nanobot/pull/5800) | Discord 新增 `replyToMessage` 配置项，与 Telegram 行为对齐（默认关闭），支持常规/附件/流式回复 | 关闭 3 月 7 日提出的 [#1663](https://github.com/HKUDS/nanobot/issues/1663)，补齐跨渠道功能一致性 |
| [#5812](https://github.com/HKUDS/nanobot/pull/5812) | Agent 恢复（recovery）时显式继续消息现在能正确进入 turn processor | 修复网关重启后 WebUI 恢复流程可能中断的问题 |
| [#5810](https://github.com/HKUDS/nanobot/pull/5810) | 当仅启用 WebUI 时，Channels 设置页不再错误地默认过滤为 Enable，而是展示全部可配置渠道 | 改善纯 WebUI 用户的设置页可用性 |
| [#5495](https://github.com/HKUDS/nanobot/pull/5495) | 新增原生 Linear Agent 渠道，支持 OAuth PKCE、签名 webhook、SQLite 持久化队列、内置 WebUI 面板 | 大功能合并（8月23日提交，历时近四周 review），标志着渠道生态扩展到项目管理工具 |

合并 PR 中修复类占 4 个，新功能占 1 个，整体在**修复高影响 bug 的同时持续拓展渠道能力**。

### 4. 社区热点
今日讨论最集中的是 Issue [#5798](https://github.com/HKUDS/nanobot/issues/5798)（回复串会话问题，1 条评论）。用户明确表示 0.3.0 无此问题、0.3.5 出现，属于典型回归。该 Issue 直接促成了 PR #5794 的修复，属于高优先级的稳定性反馈。

其次是 PR [#5780](https://github.com/HKUDS/nanobot/pull/5780)，作者在描述中直言后台上下文压缩通知“quite annoying”，建议要么改为不可见、要么增加配置开关。这反映出用户对**后台静默操作**的敏感度，已有 PR 提出方案，但其中还包含“是否保留手动 /compact 可见”的产品取舍，值得维护者决策。

此外，Issue [#5771](https://github.com/HKUDS/nanobot/issues/5771)（移动端两次点击才能打开会话）虽评论仅 1 条，但属于高频移动使用场景的体验问题，今天的 [#5805](https://github.com/HKUDS/nanobot/pull/5805) 已提交针对性修复。

### 5. Bug 与稳定性
按严重程度排列（均标注是否已有修复 PR）：

| 严重度 | Issue | 描述 | 修复 PR |
|---|---|---|---|
| 🔴 高 | [#5798](https://github.com/HKUDS/nanobot/issues/5798) | 多会话间回复串线（0.3.5 回归，0.3.0 正常） | **已合并** [#5794](https://github.com/HKUDS/nanobot/pull/5794)，但 Issue 尚未关闭，待用户验证 |
| 🟠 中高 | [#5808](https://github.com/HKUDS/nanobot/issues/5808) | `/stop` 取消 WebUI 后续轮次后，网关重启会让这些消息被 `RecoveryCoordinator` 重新入队，导致已取消内容再次执行 | 已有 [#5809](https://github.com/HKUDS/nanobot/pull/5809)（open） |
| 🟠 中 | [#5806](https://github.com/HKUDS/nanobot/issues/5806) | Discord 渠道 stop 后，`_working_emoji_tasks` 和 `_pending_reactions` 未被清理，任务残留 | 已有 [#5807](https://github.com/HKUDS/nanobot/pull/5807)（open） |
| 🟡 中低 | [#5771](https://github.com/HKUDS/nanobot/issues/5771) | 移动端 WebUI 会话列表需点击两次才能打开，首次点击被隐藏操作区拦截 | 已有 [#5805](https://github.com/HKUDS/nanobot/pull/5805)（open） |

值得肯定的是：今日报告的 #5808、#5806 均在当天就获得了对应修复 PR（#5809、#5807），维护响应速度极快。

### 6. 功能请求与路线图信号
- **跨渠道功能对齐是明确方向**：今天合并的 #5800 使 Discord 获得与 Telegram 相同的 `replyToMessage` 能力，直接关闭 #1663。可以预期其他渠道（如 Slack、WhatsApp）后续也会按此模式补齐回复、主题等语义。
- **上下文压缩静默化**：#5780 已在 PR 层面提出将自动压缩通知改为不可见、仅保留 `/compact` 手动可见。该 PR 目前 open，但大概率会进入下一版本，或者至少增加一个配置开关。
- **安全/执行护栏**：新 PR [#5815](https://github.com/HKUDS/nanobot/pull/5815) 提出可选的 `tools.exec.jevGuard` 预检（默认关闭，复用 OpenRouter Decisions API），反映项目开始关注 exec 工具的安全治理，这可能会成为后续安全方向的一个锚点。
- **Agent 架构演进**：PR [#5811](https://github.com/HKUDS/nanobot/pull/5811)（open）计划将子代理执行迁移为私有内存会话、复用 AgentLoop 上下文与压缩路径，属于内部架构重构，方向是统一执行与恢复逻辑。

### 7. 用户反馈摘要
- **稳定性回归最影响信任**：#5798 用户特别强调“0.3.0 没有这个问题”，说明功能回退会让老用户对项目信心打折，修复 PR 虽已合并，但建议在下一版本 release notes 中明确提及，并引导用户验证。
- **移动端体验是当前短板**：#5771 用户反馈“列表读取起来像无响应”，这不是功能缺失，而是交互层 hit-test 问题。移动端 WebUI 的使用比例正在上升，建议后续将移动端触控优化纳入常规回归范围。
- **后台操作要“隐形优先”**：#5780 的作者（同时也是 PR 贡献者）抱怨自动压缩通知打扰正常对话，说明用户对非主动触发的系统消息持负面态度，后台任务应当默认静默，重要信息可汇总或提供开关。

### 8. 待处理积压
- **Issue #1663 刚被关闭**（3 月 7 日 → 9 月 18 日，历时 6 个多月）：该 Ticket 从提出到落地耗时较长，但最终通过 PR #5800 完成。类似的“渠道功能对齐”类请求在路线图中可能长期存在，建议项目方在功能面板中为该类请求添加“已纳入路线图”的标签，避免用户长期等待后失联。
- **PR #5495 的 review 周期长达近一个月**（8 月 23 日创建 → 9 月 18 日合并）：虽然最终合并，但大功能 PR 的长时间悬置会阻塞渠道生态贡献者的积极性。建议维护者对于大 PR 提供阶段性 review feedback，或拆分更小的里程碑。
- 当前有 9 个 open PR 待 review，其中 [#5815](https://github.com/HKUDS/nanobot/pull/5815)、[#5811](https://github.com/HKUDS/nanobot/pull/5811) 是相对较大的改动，建议维护者在接下来 2–3 天内优先处理，避免再次出现类似 #5495 的长周期等待。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## Zeroclaw 项目动态日报 — 2026-09-19

---

### 1. 今日速览

项目过去 24 小时活跃度处于高位：21 条 Issue 更新（16 条新开/活跃，5 条关闭）、50 条 PR 更新（40 条待合并，10 条合并/关闭），无新版本发布。安全域是今日主线——昨日刚关闭的 Git 风险分类绕过漏洞（#9627）今日出现同类变体（#10966，S0 级）；另一条 S0 级修复 PR #9635 已合并，修复了 Global Options 绕过问题。runtime/agent 循环的审批强制、Anthropic 多模态净化器重写签名推理、渠道溯源落地是当前最主要的工程推进方向。整体项目健康度良好，但安全类积压需要优先处理。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日关闭的 PR 共 10 条，其中 4 条为实质改动，推进了安全、合规测试、渠道溯源与 Zerocode UI 性能：

- **[PR #9635] fix(config): resolve git subcommand past global options in risk classifier** 🟢 已合并
  修复 Git 全局选项（如 `-C`、`--git-dir`）导致风险分类器绕过审批门禁的 S0 级漏洞。该 PR 刷新到已合并的 #9678 标准化 Shell 命令解析器之上，从根本解决了子命令识别问题。对应 Issue #9627 已关闭。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9635

- **[PR #10910] test(agent): record the sealed tool-registry parity contract** 🟢 已合并
  将 ScopedToolRegistry 封印后的第一条 agent-policy parity 记录翻转为 Tested 状态，使测试边界与编译器强制行为对齐，删除了过时的分割线。对应 Issue #9649 已关闭。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10910

- **[PR #10907] feat(channels): stamp external ingress provenance** 🟢 已合并
  共享渠道分发目前给运行时准入传递的是占位 envelope（标记为 internal/trusted），没有渠道消息身份。此 PR 改为从规范化渠道元数据为 envelope 盖章，为 #10891 的 provenance 链路打通第一段。注意：PR 标签仅 `channel:telegram`，但改动在共享渠道分发层，后续应扩展至其他渠道。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10907

- **[PR #10648] fix(zerocode): reduce repeated label and pinned-preview rendering work** 🟢 已合并
  缓存解析后的 Fluent bundle，避免每个格式化调用重建目录；限制 pinned 首条消息预览为借用/垃圾回收字符串，降低 UI 渲染开销。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10648

另外，[Issue #10772]（zeroclaw-eval 归档测试独立于 workspace fixtures）与 [Issue #10709]（Astra 设置文档）作为 Task/Docs 类型已关闭，属于工程卫生与文档完善。

---

### 4. 社区热点

- **[Issue #4853] install skills from .well-known agent-skills discovery indexes**（8 条评论，P2，高风险，`status:blocked`）
  存活 6 个月的特性请求至今仍是社区讨论热点。Agent Skills 组织正标准化 `.well-known` URI（agentskills/agentskills#254），Cloudflare 已在内部使用、Vercel 在 `np` 中支持。社区诉求明确：希望 ZeroClaw 跟进官方标准以支持从标准发现索引安装技能。
  https://github.com/zeroclaw-labs/zeroclaw/issues/4853

- **[Issue #8850] Move optional channels & tools from compile-time feature flags to runtime plugins**（4 条评论，P2，高风险）
  讨论焦点在于将可选渠道/工具从 Cargo 编译期特性迁移到 WASM 运行时插件，以缩小默认二进制体积。这是 #9584（插件安装/列表的 egress 授权仪式）背后的架构驱动力。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8850

- **[PR #9724] fix(approval): always_ask survives Full autonomy**（maintainer 注记 + 风险:high + size:XL）
  维护者 @Audacity88 亲自刷新了分支、修复了 canonical 策略所有权与委托代理准入，并保持原贡献者署名。这条 PR 已积压 1.5 个月，维护者介入后应加速评审进程。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9724

---

### 5. Bug 与稳定性

今日 Bug 报告集中在安全绕绕、多模态净化、预算告警与渠道标识四类：

**S0 — 数据丢失/安全风险**

- ⚠️ **[Issue #10966] [新开] Git --attr-source 可隐藏变更子命令，绕过审批分类**
  共享 Git 全局选项扫描器不消费 `

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目日报 — 2026-09-19

### 1. 今日速览
过去 24 小时项目保持中等活跃度：1 条 Issue 更新，4 条 PR 动态，其中 1 条 PR 被合并（QQ 频道附件能力增强），3 条 PR 仍在待合并状态。无新版本发布。合并的 #1349 是沉淀已久的功能增强，对渠道能力有实质提升；新 Issue #3355 关于飞书配置报错，已带有 stale 标记，需关注后续处理。总体而言，项目处于平稳推进期，社区讨论集中在配置兼容性与渠道功能扩展上。

---

### 2. 版本发布
无新版本发布，此项省略。

---

### 3. 项目进展
**已合并 PR：**
- [#1349 [CLOSED] feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349) — 由 @aishannon 提交，合并后 QQ 频道渠道现支持解析 emoji 结构、处理语音/图片/视频/文件消息，并支持回复本地附件（先上传后发送）。回复优先使用 Markdown 消息，失败时降级。这是对渠道层能力的一次明显增强，扩大了 PicoClaw 在 QQ 场景下的适用范围。

**待合并 PR（共 3 条）：**
- [#3347 [OPEN] fix laggy interface](https://github.com/sipeed/picoclaw/pull/3347) — Web UI 在大文本量下卡顿的修复，涉及前端渲染优化。
- [#3371 [OPEN] feat(providers): add opencode-go provider with session header support](https://github.com/sipeed/picoclaw/pull/3371) — 新增 opencode-go provider，支持按模型 ID 自动路由 endpoint 并传递 `x-opencode-session` 头。
- [#3222 [OPEN] refactor(deltachat): cleanup implementation, documentation -200LOC](https://github.com/sipeed/picoclaw/pull/3222) — DeltaChat 通道重构，移除遗留特性、更新文档、减少约 200 行代码。

整体来看，项目今日推进了消息渠道的实用性与广度，但更多改进仍在等待维护者评审与合并。

---

### 4. 社区热点
今日讨论热度集中在唯一一条 Issue 上：
- [#3355 [OPEN] [stale] [BUG] 连接飞书报错-附解决方案](https://github.com/sipeed/picoclaw/issues/3355) — 用户 @ttghub 报告了飞书配置中 `config.json` 包含未知字段（`channel_list.feishu.app_id`）导致连接失败。该 Issue 附带解决方案，且有 2 条评论，说明用户在自行定位并提供修复建议。

**背后诉求分析：** 该 Issue 反映出配置文件的 schema 校验可能与实际文档或常见用法不匹配，用户期望要么放宽校验规则，要么更新文档说明。同时该 Issue 已带 stale 标记，说明此前曾有较长时间无响应，社区需要维护者明确反馈配置字段的定义与去向。

---

### 5. Bug 与稳定性
仅 1 条 Bug 相关 Issue：

- **[#3355] 飞书配置报错（未知字段 `app_id`）** — 严重程度：中。影响飞书渠道的初始化，但有用户已提供解决方案。目前无关联 fix PR。建议维护者确认该字段是否已废弃或改名，并更新配置 schema 或文档。链接：https://github.com/sipeed/picoclaw/issues/3355

---

### 6. 功能请求与路线图信号
- **扩展 Provider 生态**：PR #3371 中的 opencode-go provider 反映了用户对多 provider 接入的需求，该 PR 如果合并，将进一步增强模型接入的灵活性。链接：https://github.com/sipeed/picoclaw/pull/3371
- **渠道能力持续增强**：合并后的 QQ 附件支持，以及待处理的 DeltaChat 重构（#3222），说明项目正在往更多渠道和更深的附件能力方向发展。链接：https://github.com/sipeed/picoclaw/pull/3222
- **UI 流畅度优化**：PR #3347 针对 Web UI 的卡顿问题，说明在功能丰富的同时，社区也开始关注用户体验与性能。链接：https://github.com/sipeed/picoclaw/pull/3347

这些方向很可能被纳入下一个版本的候选范围，尤其是已合并的 QQ 能力增强和已被实际验证的 UI 修复。

---

### 7. 用户反馈摘要
- **配置摩擦仍是痛点**：Issue #3355 显示，配置飞书时用户会因为未知字段而无法启动，且错误信息没有给出清晰的处置建议，用户需要自行排查并总结解决方案。这反馈出配置文件校验需要更好的错误提示与文档同步。链接：https://github.com/sipeed/picoclaw/issues/3355
- **用户愿意自助贡献修复**：该 Issue 作者不仅报障，还附带了解决方案，说明社区用户参与度高，乐于反馈并帮助项目改进。

---

### 8. 待处理积压
以下 Issue / PR 存在较长时间未合并或响应，建议维护者优先处理：

- **#3222 [OPEN] refactor(deltachat): cleanup implementation, documentation -200LOC** — 创建于 2026-07-03，已等待 2 个多月，代码清理幅度明确，合并成本相对低，延迟合入会增加后续冲突风险。链接：https://github.com/sipeed/picoclaw/pull/3222
- **#3355 [OPEN] [stale] [BUG] 连接飞书报错** — 创建于 2026-09-01，已带 stale 标记，用户提供了解决方案。若此配置方式确实已废弃，应在文档中明确；若为 bug，应尽快修复或关闭。链接：https://github.com/sipeed/picoclaw/issues/3355
- **#3371 [OPEN] feat(providers): add opencode-go provider** — 创建于 2026-09-08，10 天未获评审，若该 provider 仍有使用价值，建议尽快安排 review。链接：https://github.com/sipeed/picoclaw/pull/3371

---

**项目健康度评估：** PicoClaw 处于健康的中速迭代周期，渠道功能持续增强，社区贡献活跃。但存在少量 issue 被 stale 化、PR 等待时间过长的问题，建议维护者定期清理积压，以保持社区黏性。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-19

## 1. 今日速览

过去24小时内，NanoClaw 保持中等偏高的社区活跃度：新增/活跃 Issue 7 条，待合并 PR 5 条，无新版本发布。今日值得关注的是**存储/内存类稳定性问题持续发酵**——`#3735` 和 `#3716` 两条关于对话归档目录无限增长的 Issue 仍在讨论中，其中 `#3716` 被用户明确指认为生产环境 OOM 崩溃循环的真实原因。与此同时，社区贡献者提交了 5 个功能/修复 PR，覆盖 macOS 状态栏、Slack token 轮换、Codex HTTP SSE 传输和定时任务无状态运行等方向，说明外部贡献依旧活跃。但需注意：今日 **0 条 Issue 关闭、0 个 PR 被合并**，项目维护端对社区输入的吸收速度可能存在瓶颈。

---

## 2. 版本发布

**无。** 过去24小时无新版本发布或预发布。

---

## 3. 项目进展

今日 **0 个 PR 被合并/关闭**，但以下 5 个待合并 PR 反映了项目正在推进的实质改进方向：

| PR | 涉及领域 | 关键改进 |
|---|---|---|
| [#3420](https://github.com/nanocoai/nanoclaw/pull/3420) | macOS 安装 | 使状态栏 Swift 代码与 plist 标签支持 `installSlug`，修复多实例安装时状态栏监控错误服务的问题 |
| [#3852](https://github.com/nanocoai/nanoclaw/pull/3852) | Slack 集成 | 在 direct-mode 配置前轮换 manager token，解决 Slack 配置 token 12小时过期导致的配置失败 |
| [#3851](https://github.com/nanocoai/nanoclaw/pull/3851) | Codex 传输层 | 使 Responses transport 可配置（HTTP SSE 代替 WebSockets），规避代理环境下的可靠性问题 |
| [#3850](https://github.com/nanocoai/nanoclaw/pull/3850) | Codex 传输层 | 修复 Codex HTTP SSE 传输（同一作者系列修复） |
| [#3741](https://github.com/nanocoai/nanoclaw/pull/3741) | 定时任务 | 新增 `--fresh-session` 选项，使定时任务系列可以无状态运行，避免对话历史无限增长导致成本递增 |

**评估：** 虽无合并，但 PR 内容直指用户真实痛点（传输稳定性、token 过期、状态膨胀、历史累积成本），若被采纳将显著改善大规模部署体验。项目整体处于「社区推动型」演进阶段。

---

## 4. 社区热点

今日最受关注的是两条均含 3 条评论的存储类 Issue：

- **[#3735](https://github.com/nanocoai/nanoclaw/issues/3735) — conversations/ archives grow without bound**  
  作者报告 `archiveTranscriptFile()` 每次压缩都写入归档文件且从不清理，目录随 agent group 生命周期无限增长。该用户称其部署集群已受到影响，诉求非常明确：**需要 retention 策略、轮换机制或数量上限**。

- **[#3716](https://github.com/nanocoai/nanoclaw/issues/3716) — PreCompact conversation-archive 导致生产 OOM**  
  `@DawoudIO` 指出每次 `PreCompact` 钩子触发都会将完整对话历史重新序列化写入新文件，且目录无任何轮换/清理——这与其生产环境观察到的 **OOM 崩溃循环** 直接相关。

**分析：** 两条 Issue 虽然讨论的是不同代码路径，但本质指向同一类问题：**对话历史产生的二进制大对象（BLOB）缺乏生命周期管理**。这暗示项目的存储治理能力未跟上功能增长，属于架构层面的系统性缺口。从评论数来看，这两条 Issues 应是本周社区焦点，维护者应优先回应。

---

## 5. Bug 与稳定性

按严重程度排列（含今日新增与持续活跃）：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3455](https://github.com/nanocoai/nanoclaw/issues/3455) | claim 与首个 SDK 事件之间心跳不更新，`CLAIM_STUCK_MS` 看门狗误杀长时间运行的合法 turn，可永久阻塞回复且重试无法自恢复 | **已开放 27 天**，仅 1 条评论，无 fix PR |
| 🔴 高 | [#3716](https://github.com/nanocoai/nanoclaw/issues/3716) | PreCompact 全量重写对话并无限写入，被指认为生产 OOM 崩溃循环元凶 | 3 条评论，无 fix PR |
| 🟠 中 | [#3735](https://github.com/nanocoai/nanoclaw/issues/3735) | `conversations/` 目录无限增长，无 retention/rotation/cap | 3 条评论，无 fix PR |
| 🟠 中 | [#3714](https://github.com/nanocoai/nanoclaw/issues/3714) | 三个文档化的 operator 环境变量覆盖项（auto-compact 窗口、转录轮换）从未转发到 session 容器，导致无法通过环境变量配置 | 已有 1 条评论，无 fix PR |
| 🟡 中 | [#3855](https://github.com/nanocoai/nanoclaw/issues/3855)（今日新增）| `groups config update --model` 接受任意字符串且无验证、无告警、退出码为 0，且无途径查询合法模型列表 | 待分诊 |
| 🟡 中 | [#3854](https://github.com/nanocoai/nanoclaw/issues/3854)（今日新增）| 对 `groups/<folder>/CLAUDE.md` 的编辑在 spawn 时被静默覆盖，`groups restart` 也无任何提示 | 待分诊 |
| ⚪ 低 | [#3853](https://github.com/nanocoai/nanoclaw/issues/3853)（今日新增）| `CLAUDE.md` 中的 `ncl` 管理命令表格已落后（缺 policies、messaging-groups send、sessions history） | 文档，待更新 |

**稳定性结论：** 持续活跃的存储类 Bug（#3735、#3716）与长期未解决的高严重度心跳问题（#3455）仍是项目健康度的主要威胁。今日新增的 2 个配置类 Bug（#3855、#3854）反映 CLI/配置层的输入验证与可预测性也存在缺口。

---

## 6. 功能请求与路线图信号

结合今日待合并 PR 与活跃 Issue，以下方向有较大概率进入下一版本：

| 功能/改进 | 相关 PR/Issue | 信号强度 |
|---|---|---|
| **定时任务无状态运行**（`--fresh-session`） | [#3741](https://github.com/nanocoai/nanoclaw/pull/3741) | 强——直接解决用户报告的历史累积成本递增问题，功能已完成待审 |
| **Codex 传输层可配置化**（HTTP SSE 代替 WebSockets） | [#3851](https://github.com/nanocoai/nanoclaw/pull/3851)、[#3850](https://github.com/nanocoai/nanoclaw/pull/3850) | 强——两位贡献者连续提交两个 PR，说明代理/防火墙场景下的 WebSocket 问题对用户影响广泛 |
| **对话归档生命周期管理**（retention/rotation/cap） | [#3735](https://github.com/nanocoai/nanoclaw/issues/3735)、[#3716](https://github.com/nanocoai/nanoclaw/issues/3716) | 中——目前仅有 Issue 诉求，尚无对应 PR，属于维护者需主动规划的能力 |
| **Slack 集成可运维性**（token 轮换） | [#3852](https://github.com/nanocoai/nanoclaw/pull/3852) | 中——PR 已提交待审，若合并可消除 Slack 配置中一个常见故障点 |
| **模型名验证** | [#3855](https://github.com/nanocoai/nanoclaw/issues/3855) | 弱（新开）——但属于低成本高 UX 收益的改进，有望被快速处理 |

---

## 7. 用户反馈摘要

从今日活跃 Issues 的评论与描述中提炼的真实用户声音：

- **部署规模用户对存储成本敏感**：`@TO-maschenborn` 表示 "On our fleet this reaches..."（舰队级部署受影响），说明对话档案无限增长不是理论问题，而是已在大规模环境中产生实际运维压力。

- **生产环境稳定性诉求强烈**：`@DawoudIO` 连续提交两条 Issue（#3716、#3455）且都标记为高严重度，描述中直接使用 "real cause of a production OOM crash loop"、"can permanently block replies" 等措辞，显示出生产环境用户正在承受稳定性代价。

- **配置文档与实现不一致令用户困惑**：`@nilsborg` 在 #3714 中提到三个环境变量 "documented in-source as operator overrides, but nothing forwards them"——文档声称可配置、实际代码路径不通，这类差异会直接损害用户对项目的信任。

- **CLI 反馈机制不透明**：`@bmultini` 在 #3855 中演示了错误配置仍返回退出码 0 的行为，在 #3854 中记录了编辑被静默丢弃，"gives no sign of it"——用户期望 CLI 对无效输入给出明确反馈，而非"成功执行"的假象。

---

## 8. 待处理积压

以下为长期未解决、可能影响项目公信力的高价值 Issue/PR，提请维护者关注：

| 项目 | 创建时间 | 年龄 | 重要性 | 备注 |
|---|---|---|---|---|
| [#3455](https://github.com/nanocoai/nanoclaw/issues/3455) — 心跳看门狗误杀合法 turn，可永久阻塞会话 | 2026-08-23 | 27 天 | 🔴 高 | 被标为 "high severity"，无 fix PR，持续无维护者响应 |
| [#3716](https://github.com/nanocoai/nanoclaw/issues/3716) — PreCompact OOM 崩溃循环 | 2026-09-04 | 15 天 | 🔴 高 | 用户明确指出生产事故元凶，仅 3 条评论，零官方回应 |
| [#3714](https://github.com/nanocoai/nanoclaw/issues/3714) — operator 环境变量无效 | 2026-09-04 | 15 天 | 🟠 中 | 影响部署灵活性，且涉及文档一致性问题 |
| [#3735](https://github.com/nanocoai/nanoclaw/issues/3735) — conversations 目录无限增长 | 2026-09-07 | 12 天 | 🟠 中 | 与 #3716 同类问题，需统一设计存储治理方案 |
| [#3420](https://github.com/nanocoai/nanoclaw/pull/3420) — macOS 状态栏 slug-aware 修复 | 2026-08-20 | 30 天 | 🟠 中 | PR 已就绪但 30 天未合并，可能因堆叠在 #3408 上而阻塞 |
| [#374

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-19

## 今日速览

过去 24 小时 IronClaw 项目整体活跃度中等偏冷：无新版本发布、无 PR 被合并或关闭，主要动作集中在 2 条待合并 PR 的持续推进（#8102、#7456）与 1 条长期 Issue 的更新（#7537，更新于 2026-09-18）。⚠️ 值得注意的是，核心贡献者 @henrypark133 的 XL 级长期 PR #7456 与主仓库已有近 6 周未合并，需关注其状态。社区讨论的热点集中在 LLM 请求路径的通用推理/努力程度控制诉求，以及 Google OAuth 通过 Web UI 配置后扩展激活失败的 Bug，后者已有修复 PR 待合并。整体看，项目处于「稳步推进但合并节奏放缓」的状态，Bug 修复与基础设施重构是当前主线。

---

## 版本发布

今日无新版本发布，无相关 Release 信息。

---

## 项目进展

**今日无 PR 被合并或关闭。** 但有 2 条 PR 处于活跃待合并状态，分别对应修复与新架构重构，是近期值得关注的进展：

- 🔧 **扩展激活 Bug 修复（#8102）** — 由 @henrypark133 于 2026-09-18 提交并持续更新，修复了当运维人员通过 Web UI（而非环境变量）配置 Google OAuth 客户端时，Gmail/Google Calendar 扩展无法激活的问题。OAuth 全流程（授权、换取 token）可正常完成，但最终激活阶段失败。该 PR 将 provider 实例的就绪状态检测改为实时解析，并优先读取管理员配置。若合并，将解决一个影响 Web UI 配置部署场景的通用问题。
  🔗 https://github.com/nearai/ironclaw/pull/8102

- 🏗️ **持久化存储 profile 无关化重构（#7456）** — 由核心贡献者 @henrypark133 发起的 XL 级 PR，已持续约 6 周（8 月 10 日创建，9 月 18 日最后更新）。目标是将 Reborn 每个 profile 的根目录统一挂载到 `IRONCLAW_REBORN_HOME`，并采用 profile 无关的 `state/`、`system/`、`workspaces/`、`runtime/`、`logs/`、`cache/`、`tmp/` 命名空间。同时持久化类型化安全信封，防止仅重启 profile 转换削弱租户/工作区隔离。该 PR 涉及 sandbox、CI、docs、dependencies 多个 scope，合并后将显著改善多 profile 场景下的存储一致性与隔离安全性。
  🔗 https://github.com/nearai/ironclaw/pull/7456

整体来看，今日虽无合并动作，但上述两条 PR（一个新修复、一个方向性重构）均在持续更新，显示项目在扩展稳定性与底层架构两线上均有进展。

---

## 社区热点

- 💬 **#7537：LLM 通用 per-request thinking/effort 控制** — 目前最受关注的 Issue（2 条评论），创建于 2026-08-12，更新于 2026-09-18，仍在活跃讨论中。核心诉求是：在 LLM 请求路径上增加一个通用的「thinking/effort」控制机制 —— 允许按请求（或按模型默认）设置思考强度，由各 provider adapter 映射到其原生参数。触发案例是 NEAR AI 上的 DeepSeek V4 Flash（0731 checkpoint 输出过于冗长 verbose），但该控制必须通用化、provider-native，而非针对单一模型 hack。
  🔗 https://github.com/nearai/ironclaw/issues/7537

该 Issue 的讨论热度反映了开发者对「细粒度控制模型推理成本/输出风格」的普遍需求，尤其是在多 provider 抽象层中，这种能力需要被建模为通用协议，而非各 adapter 自行扩展。

---

## Bug 与稳定性

今日报告 1 个功能性 Bug，严重程度中等偏高（影响 Web UI 配置场景的扩展可用性），已有修复 PR 待合并：

| 严重程度 | Bug 描述 | 修复状态 |
|---------|---------|---------|
| 中-高 | **Google 扩展通过 Web UI 配置 OAuth 后无法激活** — OAuth 流程完整走通（授权、换取 token、返回），但最终激活失败。影响任何通过 Web UI 配置 Google OAuth 客户端的部署，Gmail/Google Calendar 扩展不可用（#8102 PR 描述） | 已提交 PR #8102，待合并 |
| 低 | **DeepSeek V4 Flash 输出冗长** — 在 NEAR AI 的 0731 checkpoint 上，模型输出 verbose，缺少按请求的 thinking/effort 控制手段（#7537 提及） | 无直接 fix PR，已作为通用功能请求处理 |

🔗 Bug #8102：https://github.com/nearai/ironclaw/pull/8102
🔗 Issue #7537：https://github.com/nearai/ironclaw/issues/7537

---

## 功能请求与路线图信号

- 🎯 **通用 per-request thinking/effort 控制（#7537）** — 这是一个明确的路线图信号：IronClaw 计划在 LLM provider 抽象层引入通用的思考强度控制能力，每个 provider 适配器需将「思考等级」映射为各自的原生参数（如 DeepSeek 的 `chat_template_kwargs`）。该需求已存在 1 个月以上且持续更新，考虑到它带 `scope: llm` 标签且与现有 provider 适配架构强相关，**有较大概率被纳入下一版本的 LLM 核心能力迭代**。当前无对应实现 PR 出现，或许是待 #7456 这类基础设施合并后再推进。

- 🧩 **扩展激活机制增强（#8102）** — 该 PR 虽为 Bug 修复，实则在调整扩展系统的配置解析逻辑（管理员配置优先、实时侦测 provider 实例就绪状态），这暗示扩展系统将更灵活地支持 Web UI 配置与运行时动态更新，可能成为后续扩展管理功能改进的基础。

---

## 用户反馈摘要

基于公开 Issue/PR 描述，可提炼以下真实用户反馈（未含隐藏评论内容）：

- 😣 **「OAuth 走通了，但激活失败」的困惑体验**（来自 #8102）：用户/运维按 Web UI 完成 Google OAuth 全流程，却无法激活扩展，错误信息指向 Provider 层的配置解析问题。这类问题会显著降低 Web UI 配置路径的可信度，尤其对非 env-var 偏好的中小部署不友好。
  🔗 https://github.com/nearai/ironclaw/pull/8102

- 😤 **「verbose 输出不可控」的模型使用痛点**（来自 #7537）：用户在特定 DeepSeek 检查点（0731）上遇到输出冗长问题，且由于缺少通用的 thinking/effort 控制，无法通过标准请求参数调节，只能等待 provider 侧修复或依赖模型自身的模板。这反映了在 multi-provider 环境下，抽象层未暴露细粒度推理控制能力时，用户会被迫接受某些 provider 的默认行为。
  🔗 https://github.com/nearai/ironclaw/issues/7537

---

## 待处理积压

以下问题/PR 长期未被合并或关闭，建议维护者关注：

- 🕘 **PR #7456：持久化存储 profile 无关化** — 创建于 2026-08-10，已开放约 40 天，最后一次更新为 2026-09-18。XL 级、风险中、涉及 sandbox/CI/docs/dependencies 多 scope，且为 core contributor 提交。长时间未合并可能意味着设计讨论或代码 review 陷入僵局，或与后续路线图存在依赖。若该 PR 搁置过久，可能导致分支冲突累积，建议维护者给出明确回复或分拆合并计划。
  🔗 https://github.com/nearai/ironclaw/pull/7456

- 🕘 **Issue #7537：通用 thinking/effort 控制** — 创建于 2026-08-12，已开放约 5 周，虽 9 月 18 日有更新，但尚未被官方标记为 planned / accepted。该需求具有明确的用户价值与模型通用性，长期悬而未决可能影响社区对 LLM 路径演进方向的信心，建议维护者明确是否纳入路线图，并指定负责人/里程碑。
  🔗 https://github.com/nearai/ironclaw/issues/7537

---

**总体评估**：IronClaw 今日项目健康度「良好但合并节奏偏慢」。虽然无版本发布与合并动作，但 #8102 新修复提交与 #7456 持续更新表明核心贡献者仍在积极工作。当前最大风险是 #7456 这类长期开放的架构级 PR，建议维护团队在近期安排 review 或拆分，以降低分支漂移成本并让社区看到确定性进展。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-19

## 1. 今日速览

过去 24 小时项目保持高水平开发迭代：共 22 条 PR 更新，其中 8 条已合并/关闭，14 条待合并；Issues 侧新增 1 条活跃问题（#2654），其余 5 条为长期停滞的 stale 问题。今日无新版本发布。整体来看，**项目开发活动活跃**，社区侧新讨论较少，但长期未解决的问题（特别是构建、登录相关）仍未得到闭环，项目健康度受开发侧驱动为主。

## 2. 版本发布

今日无新版本发布（Releases 为空）。

## 3. 项目进展

今日合并/关闭了 8 个 PR，主要集中在 **OpenClaw 稳定性、Cowork 会话体验、IM 渠道修复** 三个方向，重要合并包括：

- **OpenClaw 启动恢复强化**（#2701）— 修复 9.18 排查中可复现的启动阻塞与飞书凭据错位，目标分支为 `release/2026.9.18`。同时强化 Windows 网关生命周期（IPC 断开后的子进程管理），提升升级启动兼容性。
- **Cowork 工作区改进**（#2696）— 引入 Codex 风格的工作区审查、内联问题停靠及 Tasks 面板，该 PR 来自下游 fork 的重新基座，包含 4 个独立提交。
- **子代理会话可见性**（#2703）— 新增子代理会话在会话视图中的可见性，提升协作/调试体验。
- **IM 渠道修复**（#2718、#2717）— 修复微信/QQ 扫码登录通道路由问题，并新增定时任务的微信投递回执（feat）。
- **OpenClaw 工作区设置恢复**（#2702）— 修复工作区设置无法恢复的问题。
- **发布分支**（#2715）— Release/2026.9.18 的发布分支已合并/关闭。

这些合入表明项目在 **稳定性、协作体验、渠道消息** 三个领域均有实际落地，尤其是对 OpenClaw 启动问题的系列修复，为 9 月 18 日发布分支的稳定奠定了基础。

## 4. 社区热点

今日讨论最活跃的 Issue 为 **#2654**（2 条评论，今日唯一新开的活跃 issue）：

- **#2654 [OPEN] fix(user_plugins): persist hooks field in syncToDisk** — 由 @maxbxkj 提出，指出 `hooks` 配置在 Gateway 重启后丢失，根因定位在 `openclawConfigSync.ts` 的 `getUserPlugins` 未返回 `hooks` 字段。作者给出了三步修复建议，已有 2 条评论，反映出用户对配置持久化问题的精细追踪和修复期望。

其余 5 条 Issue 均为 stale 状态（创建于 3月30日，每次更新仅有 1 条评论），讨论热度较低。

## 5. Bug 与稳定性

今日报告的 Bug / 稳定性问题按严重程度排列：

- **（高）登录态未下发**（#1016）— 使用网易员工登录完成后，客户端收不到 auth token，导致用户无法正常使用。该问题已开放近 6 个月，仍无 fix PR。  
  [Issue #1016](https://github.com/netease-youdao/LobsterAI/issues/1016)

- **（中高）内网 registry 不可达导致构建阻塞**（#1015、#1025）— 两个问题同源：`npm.nie.netease.com` 在内网不可达时会导致打包卡死 5 分钟以上，外部开发者完全无法构建。其中 #1025 给出了根因（`scripts/ensure-openclaw-plugins.cjs` 无可达性检查），但两份 issue 均未链接到对应的修复 PR。（今日 #2701 间接涉及启动阶段暂存关闭请求，未直接回应此问题）  
  [Issue #1015](https://github.com/netease-youdao/LobsterAI/issues/1015) · [Issue #1025](https://github.com/netease-youdao/LobsterAI/issues/1025)

- **（中）讯飞 API token 超限**（#1023）— 讯飞引擎报 `input token limit is 97280`，疑似内部 token 上限设置过高，用户建议增加引擎自定义参数。暂无 fix PR。  
  [Issue #1023](https://github.com/netease-youdao/LobsterAI/issues/1023)

- **（中）hooks 配置丢失**（#2654）— 今日新报告的 Gateway 重启后 hooks 配置被 `syncToDisk` 丢弃问题，已有建议修复方案（增加 hooks 列、返回 hooks 字段、合并 hooks）。暂无关联 PR。  
  [Issue #2654](https://github.com/netease-youdao/LobsterAI/issues/2654)

- **（低）main.ts 架构拆分化**（#1024）— 用户反馈 `src/main/main.ts` 业务逻辑过重，维护困难，希望拆分。属于技术债类反馈，暂无对应 PR。  
  [Issue #1024](https://github.com/netease-youdao/LobsterAI/issues/1024)

**今日修复相关 PR 动态**（部分已合入，部分待合并）：

- 已合入的 OpenClaw 启动恢复系列（#2701、#2702）。
- 待合并的 #2719（修复旧版本残留导致的启动失败）、#2709（Windows SQLite 暂存目录失败回退）、#2711（SKILL.md 无效 YAML 时版本保留）、#2714（付费媒体生成前检查用户意图）等，均指向稳定性提升。

## 6. 功能请求与路线图信号

今日活跃的功能请求较少，主要为：

- **引擎更多参数自定义**（#1023）— 用户希望为讯飞等引擎添加 token 上限等参数的自定义设置，间接反映对模型引擎可配置性的需求。
- **main.ts 架构拆分**（#1024）— 用户期望更清晰的企业级 Electron 项目结构，建议将 main.ts 拆分为 core/ 等多个模块。

结合今日 PR 趋势，以下方向可能被纳入后续版本：

- **Cowork 智能模式**（#2716）— 新增 Auto 和 Max 两种模型选择模式，Auto 自动选模型、Max 使用用户最强模型，说明协同会话的模型路由策略已在开发中。
- **技能市场体验优化**（#2713、#2712、#2711）— 标签计数、重复导入确认、版本保留三个 PR 全面改进技能安装/展示流程。
- **MCP 工具过滤与并行调用**（#2710）— 支持 OpenClaw 的 per-server 工具过滤与并行工具调用，增强 MCP 配置能力。

## 7. 用户反馈摘要

来自今日活跃 Issue 及近期评论的真实用户反馈要点：

- **配置持久化**（#2654）：用户对配置同步逻辑有明确期望——hooks 字段不应在重启后丢失，说明用户依赖插件 hooks 进行自动化，对配置完整性敏感。
- **内网依赖阻碍外部贡献**（#1015、#1025）：外部开发者明确表示“无法访问网易内网”导致构建阻塞，且“没有进度提示”，感受为“卡死”。此类问题对开源社区吸引力的负面影响较大。
- **登录流程断裂**（#1016）：用户描述“浏览器显示成功但客户端未收到登录态”，对体验的不一致性感到困扰。
- **交付节奏快、维护有压力**（#1024）：用户提到“您那边的更新太快了，我有点跟不上节奏”，同时建议拆分 main.ts，体现社区用户虽然积极跟进，但也希望项目保持更好的可维护性。

## 8. 待处理积压

以下 Issue/PR 长期未获回应或持续推进，建议维护者关注：

- **#1016 登录态未下发** — 已开放近 6 个月，影响核心登录功能，无任何 fix PR，应优先排查。
- **#1015 / #1025 内网 registry 构建阻塞** — 影响所有外部开发者，直接阻碍开源协作，且 #1025 已给出根因，修复成本较低，建议尽快合并相关脚本修改。
- **#1023 讯飞 API token 上限问题** — 已长时间未获处理，用户等待回复。
- **#1024 main.ts 拆分建议** — 属结构性建议，虽无紧急影响，但回应可增强社区信任。
- 另有多个 Open PR（如 #2719、#2716、#2710 等）均标注 `OPEN`，若为关键修复建议及时 review 或给出明确状态。

*多数 stale Issues 为 3 月 30 日创建，期间仅有 1 次自动更新，建议维护团队定期 triage，避免公开问题堆积影响社区体验。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-19

## 1. 今日速览

过去24小时，Moltis 项目整体活跃度**偏低但方向明确**：无新 Issues、无版本发布，仅新增 2 个 Pull Requests，其中核心亮点是 #1276 为 Groq 添加 OpenAI-compatible 支持并修复了空 required 严格 schema 的问题（当前均处于待合并状态）。此外还有一项 docs 目录的 npm 依赖例行更新（#1275）。项目今日表现出**功能补强 + 依赖维护**双线推进的节奏，整体健康度良好。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

### 今日 PR 情况：0 合并 / 0 关闭（2 个待合并）

截至今日，两个 PR 均尚未合并，但**若 #1276 成功落地，将显著提升项目对 OpenAI 生态外部服务商的兼容性**，尤其是将 Groq 从降级的 genai fallback 路径中解救出来，恢复其多模型注册、工具 schema 完整传递与正确的 model-id 路由。这是对 provider 抽象层的一次实质性扩展。

| PR | 标题 | 类型 | 状态 | 关注点 |
|---|---|---|---|---|
| [#1276](https://github.com/moltis-org/moltis/pull/1276) | Add Groq as OpenAI-compatible provider + fix empty-required strict schemas | 功能 + 修复 | OPEN | 新 provider 支持 + schema 生成修正 |
| [#1275](https://github.com/moltis-org/moltis/pull/1275) | chore(deps): bump smol-toml 1.7.0 → 1.8.0 in /docs | 依赖维护 | OPEN | 文档站构建依赖更新 |

## 4. 社区热点

今日没有评论数众多或高反应的讨论帖，两个 PR 均为新提交且无评论。**焦点集中在 #1276**：

- **PR [#1276](https://github.com/moltis-org/moltis/pull/1276)（作者：@Kaboka22）** 指出 Groq chat 之前实际上是**不可用的**——不在 `OPENAI_COMPAT_PROVIDERS` 列表中，导致回退到 genai fallback（仅注册一个模型、丢弃所有工具 schema、破坏 model-id 路由）。这背后反映的是**用户对 Groq、OpenRouter、Together 等新兴 OpenAI-compatible 服务商接入的强烈诉求**，以及项目 provider 注册机制需要更清晰的“一级公民”与“fallback”边界。

## 5. Bug 与稳定性

今日无新 Bug 报告，但 #1276 揭示了一个**潜在的严重稳定性/功能性问题**：

- **严重程度：高（已提交修复 PR）** — Groq 作为 OpenAI-compatible provider 未被正确识别，导致所有 Groq 模型请求走 genai fallback，丢失工具调用能力和模型路由准确性。该问题直接影响 Groq 用户的实际使用，**修复 PR 为 #1276**，待维护者 review 合并。

## 6. 功能请求与路线图信号

- **Groq 成为一级 OpenAI-compatible provider（信号强）**：#1276 将 Groq 纳入 `OPENAI_COMPAT_PROVIDERS`，使其不再依赖 genai fallback 路径。这说明用户希望项目能**优先识别主流 OpenAI-compatible 服务商**，而非全部默认走通用 fallback。
- **严格模式下的空 required 字段处理（信号中）**：#1276 同时修复了空 `required` 列表的严格 schema 生成问题，这暗示用户对**结构化输出/工具调用的 schema 正确性**要求日益提高（相关 issue 可能即将出现）。
- 结合当前趋势，**OpenRouter、Together AI、Mistral 等**也可能在后续被纳入同级支持名单。

## 7. 用户反馈摘要

| 来源 | 用户反馈/痛点 |
|---|---|
| [#1276](https://github.com/moltis-org/moltis/pull/1276) | “Groq chat was effectively unusable”——用户在使用 Groq 时遭遇模型数量受限、工具 schema 被丢弃、model-id 路由错乱三重问题，体验被严重降级。该反馈说明用户对**多 provider 下功能一致性**（尤其是工具调用）有很高的期望。 |

总体来看，用户的诉求集中在：**“凡是 OpenAI API 兼容的服务商，理应获得与 OpenAI 本身同等的功能待遇”**——这应当成为 Moltis provider 层设计的重要考量。

## 8. 待处理积压

今日新增的 2 个 PR 均为当日/前一日更新，不存在长期滞留。当前最重要的待办是：**尽快 review 并合并 [#1276](https://github.com/moltis-org/moltis/pull/1276)**，避免 Groq 用户继续处于不可用状态。

---
*本日报基于 moltis-org/moltis 仓库公开 GitHub 数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目日报 2026-09-19

> 数据来源：GitHub agentscope-ai/QwenPaw（CoPaw 同源仓库）。过去 24 小时数据：Issue 动态 25 条、PR 动态 50 条、新版本 1 个。

## 1. 今日速览

项目整体活跃度 **高**：过去 24 小时有 25 条 Issue 动态（新开/活跃 17，关闭 8），50 条 PR 动态（待合并 33，已合并/关闭 17），并发布 v2.2.2-beta.1。社区讨论集中在多租户 Hub 路线、上下文记忆/滚动淘汰机制、插件隔离与安全提示注入。质量方面，今日出现多起与上下文管理、安全、驱动并发更新相关的 Bug，但多数已配套修复 PR，说明社区响应速度较快。整体看，项目处于 **功能扩展与稳定性加固并行** 的阶段。

## 2. 版本发布

### v2.2.2-beta.1
发布链接：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.2-beta.1

主要更新：
- **feat(console): improve grouped chat history** — 控制台分组聊天历史体验优化（PR [#7665](https://github.com/agentscope-ai/QwenPaw/pull/7665)）
- **feat(memory): unify ReMe slash commands** — 统一 ReMe 记忆相关斜杠命令（PR [#7444](https://github.com/agentscope-ai/QwenPaw/pull/7444)

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

## ZeptoClaw 项目动态日报 — 2026-09-19

### 1. 今日速览
过去 24 小时 Issues 无新增、无关闭，社区反馈面较为平静；PR 侧有 3 条更新，是今日主要活跃点。其中两条 PR（#703、#701）已关闭/合并，分别针对 OpenAI 兼容端点的推理模型回复解析与工具 Schema 兼容性做出实质修复；另一条安全加固 PR（#702）仍在开放中。项目整体处于功能完善与兼容性修复阶段，活跃度中等，工程节奏健康。

---

### 3. 项目进展

今日两条已关闭 PR 为项目带来了实质性的兼容性与健壮性提升：

- **#703 [CLOSED] feat(providers): read reasoning-model replies on OpenAI-compatible endpoints**  
  修复了 OpenAI 兼容端点在返回推理模型回复时，`content` 字段可能为 `null`（常见于 token 预算耗尽、模型只输出了 `reasoning_content`）导致被 `unwrap_or_default()` 静默转成空字符串的问题。该改动补充了 `reasoning_content` 的读取逻辑，避免推理模型的重要思考内容丢失。  
  https://github.com/qhkm/zeptoclaw/pull/703

- **#701 [CLOSED] feat(providers): sanitize tool schemas and coerce model tool-args for strict/local backends**  
  在出站方向上统一对 `ToolRegistry::definitions*()` 产出的工具 Schema 执行 `sanitize_schema()` 清洗；同时修复了外部 MCP 服务与插件返回的 `input_schema` 原样透传可能导致的格式问题。该改动增强了 ZeptoClaw 对接严格模式/本地后端的兼容性与稳定性。  
  https://github.com/qhkm/zeptoclaw/pull/701

两条 PR 的合并使项目在“推理模型支持”与“工具调用兼容性”两条能力线上均向前迈进一步，符合当前 LLM 生态向 reasoning model 与本地部署演进的大方向。

---

### 4. 社区热点

今日无高热度讨论（Issues 更新为 0，PR 评论数均为 0，👍 数均为 0）。相对值得关注的是开放中的安全加固 PR：

- **#702 [OPEN] fix(panel): rate-limit password login attempts**  
  针对公开面板密码登录接口无速率限制、仅依赖 bcrypt 成本作为唯一刹车的问题，提出每 socket 对端 IP 在 60 秒滚动窗口内最多尝试 5 次，第 6 次直接返回 HTTP 429 与 `Retry-After: 60`，且限制发生在 JSON 解析与密码校验之前。虽然无用户评论，但从 PR 内容看，该项目正主动补强面向公网部署的安全基线。  
  https://github.com/qhkm/zeptoclaw/pull/702

---

### 5. Bug 与稳定性

今日无新提交的 Issue，但两条已合并 PR 实际修复了以下稳定性/兼容性问题，按严重程度排列：

| 严重程度 | 问题描述 | 是否已有 fix PR |
|---|---|---|
| 中 | 推理模型在 OpenAI 兼容端点返回 `content=null` 时，思考内容（`reasoning_content`）被静默丢弃 | ✅ #703 |
| 中 | 工具 Schema 未清洗即透传到严格模式/本地后端，可能导致请求被拒或行为异常（外部 MCP Server 与插件输入的 Schema 原先原样透传） | ✅ #701 |
| 高（安全） | 面板密码登录接口无速率限制，存在暴力破解风险 | ✅ #702（待合并） |

整体来看，今日无新增崩溃或回归报告，项目稳定性良好。

---

### 6. 功能请求与路线图信号

今日 Issues 无新请求，但合并的 PR 透露了清晰的路线图信号：

- **推理模型（Reasoning Model）兼容性**（#703）—— 已落地，表明 ZeptoClaw 正在跟进 Anthropic、OpenAI 等厂商的 reasoning model 输出格式差异，预计后续会继续完善相关生态（如 token 预算耗尽时的降级策略）。
- **严格模式/本地后端的工具调用适配**（#701）—— 已落地，说明项目在扩展对非 OpenAI 原生 API 的兼容面，特别是本地推理服务（如 vLLM、llama.cpp 类后端）。

这两个方向均已被纳入实际开发并获得合并，符合“推理模型 + 本地化部署”的前沿趋势，极大概率进入下一版本。

---

### 7. 用户反馈摘要

今日 Issues 与 PR 层面均无用户评论（评论数 undefined，疑似无评论活动），无法提炼直接的用户痛点或满意度信息。从 PR 提交的动机可以间接推断：

- 有用户/开发者正在以 OpenAI 兼容模式对接推理模型，并实际遇到 `content` 返回空值导致回复不完整的问题；
- 有用户/开发者面向公网部署 ZeptoClaw 面板，对密码暴力破解风险存在顾虑（或项目作者主动自查）。

具体反馈请见后续 Issue 讨论动态。

---

### 8. 待处理积压

当前唯一开放 PR 为：

- **#702 [OPEN] fix(panel): rate-limit password login attempts**  
  由 @qhkm 于 2026-09-18 提交，更新于同日。该 PR 为安全加固，等待维护者 review 与合并。无评论、无冲突信息、无阻塞标记，建议尽快安排合并或给出反馈。  
  https://github.com/qhkm/zeptoclaw/pull/702

Issues 侧无长期未响应的积压条目。整体积压状况良好，项目维护响应及时。

---

*报告生成时间：2026-09-19，数据来源：github.com/qhkm/zeptoclaw*

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*