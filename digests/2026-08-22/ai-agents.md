# OpenClaw 生态日报 2026-08-22

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-22 00:35 UTC

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

# OpenClaw 项目动态日报 — 2026-08-22

## 今日速览

- 过去 24 小时 Issues 更新 **500 条**（新开/活跃 487，关闭 13），PR 更新 **500 条**（待合并 386，合并/关闭 114），社区提交节奏处于高位。
- 今日**无新版本发布**，但主线有大量针对 Beta 2026.8.1 的回归验证与修复 PR 在途。
- 最受关注的问题集中在**网关稳定性**：内存泄漏、SQLite 损坏、Codex hook CPU 打满、消息投递丢失/卡死等 P0/P1 问题仍然待修。
- 多个长期累积的 P1/P0 问题缺少新版 Fix PR，社区对维护者 review 进度表示集中关注。
- 整体项目仍在快速修复轨道，但**生产可靠性**是当前体验的主要瓶颈。

---

## 项目进展

过去 24 小时合并/关闭了多个关键修复，主要在**会话状态、配置诊断、消息路由、OAuth 恢复**方面：

- **保留会话指派归属，避免 Doctor/升级后 Owner 丢失** — [#127706 fix(sessions): preserve assigned owners through Doctor and startup repairs](https://github.com/openclaw/openclaw/pull/127706)
- **无写权限时报出可操作错误**，不再暴露内部 lock 文件 errno — [#127703 fix(config): diagnose an unwritable config directory](https://github.com/openclaw/openclaw/p

---

## 横向生态对比

# AI Agent 开源生态横向对比分析报告 — 2026-08-22

## 一、生态全景

当前个人 AI 助手/自主智能体开源生态正处于「功能扩张 → 可靠性收敛」的关键转折期。维持了 300+ 次的单日 PR/Issue 跑动量（OpenClaw 单日合计 1000 条），但生产环境稳定性和安全防护成为各项目的普遍痛点：网关级故障、特权泄漏、流式中断不重试、通道数据丢失同框频发。与此同时，安全议程、多用户部署架构、可观测性及成本追踪是国内外一线开发工作面和关注焦点，且多项目已产生实质合并（NanoBot 的 PromptGuard、CoPaw 的 Hub、Zeroclaw 的 mTLS 中继）。可以说，生态正处于从「能跑」到「能生产」的关键转变。

---

## 二、各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 487，关闭 13） | 500（待合并 386，合并/关闭 114） | 无（Beta 2026.8.1 回归中） | 高活跃，生产稳定性仍是瓶颈（网关内存泄漏、SQLite 损坏、投递丢失） |
| **CoPaw** | 34（活跃 19，关闭 15） | 36（待合并 21，合并/关闭 15） | 无（v2.1.1b2 版本推进） | 健康，功能与质量双向推进（Hub、长会话性能、Windows 覆盖率修复） |
| **Zerclaw** | 50（活跃 49，关闭 1） | 50（待合并 48，合并/关闭 2） | 无 | 高活跃但**安全 S0 与合并积压**（2 个 P0 级漏洞 + 48 PR 阻塞） |
| **NanoBot** | 5（新增 1，关闭 4） | 37（待合并 14，合并/关闭 23） | 无 | 优良，架构打磨期（分流合并率 62%），安全能力上收，稳定性好 |
| **NanoClaw** | 1（新增） | 24（待合并 13，合并/关闭 11） | 无 | 健康，渠道扩展 + CI 加固双轮驱动 |
| **Moltis** | 2（新增） | 8（待合并 7，关闭 1） | 无 | 修复驱动，迭代节奏稳健；存在少量历史 PR 积压 |
| **EasyClaw** | 0 | 0 | **2 个**（v1.8.108/109，全部为飞书增强） | 稳定维护期，社区外部贡献低 |
| **TinyClaw / ZeptoClaw** | — | — | — | 24 小时无活跃，清淡/休眠 |

---

## 三、OpenClaw 在生态中的定位

OpenClaw 以 **单日 500 Issue + 500 PR** 远超同类（第二梯队为 50 级别），是全生态的「引力中心」和事实参照标准。集中优势在：
- **社区规模**：983 条 PR 积压与缓解量即是其生态动力的直接体现；吞吐级是其他项目的 10~20 倍。
- **基础设施广度**：几乎所有下游项目的钩子（渠道适配、session/owner 保留、OAuth 恢复、消息路由）都在主版本中与首发，因此依然是多数周边项目的上游依赖。
- **技术路径差异**：架构路线走更贴合即插即用的桥接式 (gateway), 使其在多通道投递中理论最强，实际最强。

**短板**：贡献密集但回归验证拖累，P0/P1（内存泄漏、SQLite 损坏、CPU bound hook）长期待修，且合并管道堆积。相比之下，CoPaw 与 NanoBot 在「测试/覆盖质保」和「架构类型系统化」上的推进反而更实。

---

## 四、共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| 通道/网关稳定性和可靠性 | **OpenClaw**（网关 内存/SQLite/消息卡死）、**NanoBot**（DingTalk 后台任务泄漏、流式中段不重试）、**Claw**（教程 Matrix ESM 崩溃）、**M.Q.**（WhatsApp 出站 Markdown/入站文件路径） | 消息透传全链路可靠、重断开与持久化、出口支撑工具需要稳定 local_path/上下文 |
| 安全：注入与权限边界 | **Zerclaw**（插件子进程变量最小白名单、中继 mTLS 盲转发）、**该 bot**（PromptGuard 注入检测）、**M**（Slack 重定向过滤）、**CoPaw**（S0 权限绕过风险） | 从「模型对抗」前移到「系统边界」：注入检测、子进程隔离、传输加密 |
| 可观测性与用量追踪 | **NanoBot**（typed usage contract + 轨迹记录）、**Zerclaw**（日志桥接 tracing pipeline） | 为每次 retry/fallback 留下记录，安全可归因 |
| 长会话/可用性体验 | **OpenClaw**（Doctor/升级不丢保留归属）、**CoPaw**（长 chat 响应性）、**NanoBot**（TUI LaTeX、iOS PWA safe-area）、**Moltis线程路由** | 大规模实景会话流畅性 + 会话状态不清不丢失 |
| 多渠道/多模态接入 | **NanoClaw**（Mattermost、WhatsApp Cloud、Matrix、Slack）、**EasyClaw**（飞书连续三阶段打磨）、**NanoBot**（DeepSeek V4 Flash Vision） | 办公与消息生态（飞书/钉钉/ Slack/WhatsApp）是当前接入主战场 |
| 安全架构深化 | **Zeroclaw**（S0 secure transport + browser enrollment）、**Moltis**（本地工具文件持久策略） | 从单机工具走向多用户/远程接入的正确配套 |

---

## 五、差异化分析定位

| 项目 | 功能侧重 | 目标用户 | 技术特色 |
|---|---|---|---|
| **OpenClaw** | 通用型 gateway 分发与回话生命周期 | 自主Agent团队/开发者 | 多通道桥接层 + 单实例，上游集散地 |
| **NanoBot** | 多 Provider 统一 App、WebUI/TUI、安全模块、技能权限 | 企业/开发者全生态运行时的稳定 & 可观测 | 业务可链路抽象（typed usage + trajectory-backend），主动上安全能力 |
| **Zeroclaw** | 全自动组织（双任务）、插件隔离、远程中继 | 多重点环境做到安全的 Agent 编排者 | 自研 plugin 子进程隔离 + zerorelay 远程入口加密 |
| **NanoClaw** | Telegram/Matrix/WhatsApp/Mattermost 全渠道多实例 | 业务/Email 型全渠道场景用户 | 渠道集成广度最广、Pipeline 动态扩展（channel instantiation） |
| **Moltis** | 模块化多 Agent 桌边工具（browser、cron、i18n） | 运维/个人效率工具 | 模块化 API 面，强调本地工具链安全增强（Obscura 隐身等） |
| **CoPaw** | 自托管多用户 Hub + Console 长会话体验 | 企业部署、DevOps 团队 | 从「单机 App」→「多租户 Hub」，充分测试产品化投入 |
| **EasyClaw** | 飞书客服/卡片场景单点深度 | 飞书生态大客服运营 | 单场景 MVP 打磨（发布里里重点前后台应对） |

---

## 六、社区热度与成熟度分层

**第一档：快速迭代（高吞吐 + 出现过短缺）**
- **OpenClaw**：500×500 强度，two-layer推動，核心稳定有风险。
- **Zerclaw**：安全议题火力最浓，但合并管道（48 PR 待合）开始更新短板。
- **CoPaw**：功能/质量均衡推进，生产级特征持续落地。

**第二档：质量巩固期（合并率高、架构收敛）**
- **NanoBot**：入/关闭比率 62%，明显已经把「类型契约 + 安全 + 可观测」当红利吃掉。
- **NanoClaw**：渠道接入与可持续性（CI 基础）一吃二，处于增强高风险能力收敛阶段。

**第三档：带修真（修复驱动）**
- **Moltis**：真实用例驱动、修复速度中上，但发布节奏/历史 PR 压一压。

**第四档（稀有焕新维护）**
- **EasyClaw**：版本活跃、社区无外部噪音，聚焦飞书刚需场景。

**低活跃/休眠**
- **TinyClaw、ZeptoClaw**：24h 无动作，长期走高风险。

---

## 七、值得关注的趋势信号

1. **「能跑 → 能跑稳」的隐性共识**：今日内多个重量级合并不如数量可见的架构性修复+测试基建（CoPaw Windows 覆盖率非 0 的修复、NanoBot typed usage 后端）说明了什么。对于开发者：**把度量造假/测试盲区视为重大债务**，回归环境做先。
2. **安全场景从「提示工程化」向「资源隔离 + 传输加密」转移**：Zeroclaw 的 mTLS relay + prerender 子进程隔离、Moltis 下载还原和 NanoBot PromptGuard 落地，已是多维防线组合。这会成为新一轮 Agent 框架标配。
3. **可观测性成为企业逻辑回归的「基础设施将那」**：统一 usage contract、tra

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-08-22）

## 1. 今日速览

过去24小时 NanoBot 项目保持了**高活跃度**：共产生 37 条 PR 更新（14 条待合并、23 条已合并/关闭），5 条 Issue 更新（1 条新开、4 条已关闭），无新版本发布。PR 合并/关闭比率达 62%，且多集中在架构重构（typed LLM usage contract）、缺陷修复（Dream cursor、cron 任务）与新模型支持（DeepSeek V4 Flash Vision）上，说明项目正经历一轮密集的**代码质量与基础设施打磨期**。Issue 侧响应速度良好，绝大多数报告均在 24 小时内闭合；唯一新开 Issue 指向 DingTalk 通道的后台任务监听缺口，值得跟进。整体来看，项目在功能扩张之外，开始重点关注**稳定性与可观测性**的建设。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 覆盖多个核心模块，推进了以下关键改进：

**架构与基础设施**
- [#5478 refactor(providers): define typed LLM usage contract](https://github.com/HKUDS/nanobot/pull/5478)（已合并）— 将各 provider 的动态 usage 字典替换为不可变类型契约，统一 OpenAI Chat/Responses、Anthropic、Bedrock 的 token 与缓存语义。这是后续用量追踪、计费可观测性的基石性重构。
- [#5479 feat(trajectory): add unified provider usage backend](https://github.com/HKUDS/nanobot/pull/5479)（已合并）— 在 usage contract 基础上，为每次 retry/fallback 记录无 content 的轨迹行，为诊断和成本分析提供了数据基础。
- [#5475 refactor: remove remaining dead code](https://github.com/HKUDS/nanobot/pull/5475)（开放中）— 清理无消费者代码、移除未使用的 `websocket-client` 依赖，缩小 WebUI/TUI 导出面，降低维护成本。

**功能与兼容性**
- [#5474 feat(providers): support DeepSeek V4 Flash Vision](https://github.com/HKUDS/nanobot/pull/5474)（已合并）— 注册 `deepseek-v4-flash-vision-exp` 模型，并保留多模态内容结构，顺带修复了纯文本模型的字符串强制逻辑。
- [#5476 feat(tui): render LaTeX as Unicode](https://github.com/HKUDS/nanobot/pull/5476)（已合并）— TUI 界面现在可将 LaTeX 公式渲染为 Unicode 文本，并保留代码块等特殊上下文，显著改善终端场景下数学内容的可读性。
- [#1149 feat(safety): Add PromptGuard for prompt injection detection](https://github.com/HKUDS/nanobot/pull/1149)（已合并）— 来自社区的安全模块，提供系统提示覆盖、角色混淆、工具调用 JSON 注入等攻击检测能力。该 PR 自 2 月提出，今日正式合并，项目在 AI 安全方向上取得实质进展。

**稳定性与体验回归**
- [#5442 fix(dream): advance cursor when tool errors were recovered](https://github.com/HKUDS/nanobot/pull/5442)（已合并，修复 #5441）— Dream 运行中若工具错误被模型后续纠正，不再整体判负，cursor 可正确推进，避免重复历史批次。
- [#5407 fix(cron): retire persisted heartbeat/dream system jobs when disabled](https://github.com/HKUDS/nanobot/pull/5407)（已合并）— 解决配置关闭后 cron 作业仍持久化触发、浪费 token 的回归问题。
- [#5477 fix(webui): keep iOS PWA controls inside safe area](https://github.com/HKUDS/nanobot/pull/5477)（已合并）— 修复 iOS 安装为 PWA 后控件被刘海/圆角遮挡的问题，并同步 `theme-color` 与深浅色主题。
- [#5414 fix(slack): validate file downloads across redirects](https://github.com/HKUDS/nanobot/pull/5414)（已合并）— 验证 Slack 私有下载 URL 的完整重定向链，阻断潜在的 SSRF 或恶意跳转风险。

整体来看，项目正从“功能堆叠”转向“架构收敛 + 安全加固 + 体验细节”，尤其 typed usage contract 与 PromptGuard 的落地，为下一阶段的稳定性和安全能力打下基础。

## 4. 社区热点

- **[#5198 [bug] Not possible to change models in a specific session](https://github.com/HKUDS/nanobot/issues/5198)**（已关闭，4 条评论）— 今日评论最多的 Issue。用户抱怨在聊天界面点击模型标识无法切换模型（不像 ChatGPT/Claude 等 SaaS 产品）， `/model` 命令也仅支持回退模型而非主动切换。评论中围绕“会话内模型切换”的设计空间展开讨论。该诉求直接指向 WebUI 交互与 Cloud SaaS 的对齐问题，预计会推动后续 UI 交互优化。

- **[#1168 Nanobot 连接 Notion MCP 失败！](https://github.com/HKUDS/nanobot/issues/1168)**（已关闭，2 条评论）— 中文用户报告，API Key 多次核对仍无法连接 Notion MCP，但在 Claude 端可正常登录。该 Issue 从 2 月持续至今日关闭，说明 MCP 连接失败类问题有典型的**环境/配置差异**属性，对文档和错误诊断信息提出了更高要求。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| **高** | [#5463 DingTalk does not observe or drain inbound background tasks](https://github.com/HKUDS/nanobot/issues/5463) | DingTalk 通道将每个入站消息封装为 `asyncio.Task`，但任务生命周期没有终结观察器，引用长期滞留 `_background_tasks` 集合，存在任务泄漏风险。 | 🆕 新开，无 fix PR |
| **中** | [#5454 Streaming providers: mid-stream server_error skips retry](https://github.com/HKUDS/nanobot/issues/5454) | Codex 等流式 provider 在已有 content/reasoning 输出后发生 `server_error` 时，不会触发重试，只有首个 delta 之前失败才重试。影响流式响应完整性。 | 已关闭，修复方向可参考 retry 逻辑 |
| **中** | [#5441 Dream: recovered tool error permanently blocks memory cursor](https://github.com/HKUDS/nanobot/issues/5441) | Dream 运行中一旦出现工具错误（即使是 `edit_file` 且被后续纠正），整轮被判“未完成”，`memory/.dream_cursor` 不前进，导致后续所有 Dream 运行重复处理同一历史批次，产生重复编辑。 | 已关闭，✅ 已由 [#5442](https://github.com/HKUDS/nanobot/pull/5442) 修复 |
| **低** | [#5198 无法在会话内切换模型](https://github.com/HKUDS/nanobot/issues/5198) | 行为缺陷而非崩溃：模型视为“顶层选择 + 回退列表”，不可在会话中动态切换。 | 已关闭，暂无 PR |
| **低** | [#1168 Notion MCP 连接失败](https://github.com/HKUDS/nanobot/issues/1168) | 环境相关配置问题，API 校验无误但连接失败。 | 已关闭，2 条评论 |

另有一条相关的预防性修复正在开放中：
- [#5457 fix(channels): scope dispatcher exception boundary to message processing](https://github.com/HKUDS/nanobot/pull/5457) — 修复 `ChannelManager._dispatch_outbound` 中单条消息异常导致整个后台任务终止、后续消息无法发送的隐患。

## 6. 功能请求与路线图信号

- **统一搜索能力**：PR [#5234 feat(agent): integrate mst-python as a metasearch provider](https://github.com/HKUDS/nanobot/pull/5234)（开放 19 天，p1 优先级）— 将 MST 聚合 DuckDuckGo/Google/Brave/Bing 等搜索引擎结果，通过 RRF 融合排序。这代表项目在 **agent 工具的搜索覆盖广度**上的明确投入。

- **技能系统权限细分**：PR [#5405 feat(skills): support manual-only invocation](https://github.com/HKUDS/nanobot/pull/5405)（开放中）— 支持 `disable-model-invocation: true`，部署/发布等副作用型技能可限制为仅用户手动触发，降低 agent 自动操作风险。这是技能安全模型的一次重要完善。

- **可观测性与用量追踪**：PR [#5481 feat(trajectory): add unified provider usage backend](https://github.com/HKUDS/nanobot/pull/5481)（开放中，stacked on #5480）— 为每次 retry/fallback 记录轨迹，持续完善 token 消耗与故障归因的可见性，**企业级部署的关键能力**。

- **WebUI 回合可观测性**：PR [#5420 feat(webui): add turn observability and safe recovery](https://github.com/HKUDS/nanobot/pull/5420)（开放中，标注 `conflict`）— 将用户单轮对话投影为统一答案面板，展示中断原因和 usage 累计，提升 WebUI 排错能力。需要注意解决分支冲突。

- **新模型跟进**：DeepSeek V4 Flash Vision 已在 [#5474](https://github.com/HKUDS/nanobot/pull/5474) 中合入，说明响应式支持新模型是常态能力。

## 7. 用户反馈摘要

- **体验对标 SaaS 产品**：#5198 中用户明确提到“unlike UIs of Cloud SaaS AIs”，希望模型切换交互向 ChatGPT/Claude 看齐。这暗示 NanoBot 的 WebUI 在基础交互的**心智模型**上仍与商业产品存在差距，但用户对项目迭代有信心，才会提出详细对比。

- **配置排障成本高**：#1168 的用户“核查了好几次 API”仍未解决，且在 Claude 端可以正常连接。这类反馈指向 **MCP 连接错误信息不够具体**，建议在错误输出中增加 endpoint、认证类型、网络状态等诊断上下文。

- **对“已恢复的错误”处理敏感

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 2026-08-22

## 今日速览

项目活跃度持续处于高位：过去 24 小时共更新 50 条 Issue（49 活跃 / 1 关闭）与 50 条 PR（48 待合并 / 2 已合并或关闭），无新版本发布。安全与稳定性议题成为今日关注焦点，包括一条 **S0 级安全绕过**（独立 delegate 绕过 `block_high_risk_commands`）与一条 **S0 级数据丢失**（Code/ACP 会话在进程退出时丢失局部结果）。多个安全、插件与发布链路的 PR 今日均有推进，但 48 个 PR 仍处于待合并状态，合并管道存在一定积压。

## 版本发布

今日无新版本发布，暂无迁移/破坏性变更说明。

---

## 项目进展

过去 24 小时有 **2 个 PR 已合并/关闭**（概览未列出具体编号）。从活跃 PR 列表看，以下几个方向有明显推进：

- **安全：插件隔离与传输加密**
  - [#10093 fix(hardware): isolate manifest-installed plugin subprocesses](https://github.com/zeroclaw-labs/zeroclaw/pull/10093)：清理插件子进程继承的环境变量，只保留最小白名单。
  - [#10142 feat(zerorelay): secure transport and browser enrollment frontdoor](https://github.com/zeroclaw-labs/zeroclaw/pull/10142)：远程 WSS 强制 mTLS，并引入盲转发器，是较大的安全架构变更。

- **日志与可观测性**
  - [#10203 fix(log): bridge log-facade records into the tracing pipeline](https

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>



</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-08-22）

## 今日速览

- 过去 24 小时内项目活跃度高：共 24 条 PR 更新，其中 13 条处于待合并状态、11 条已合并/关闭；同时新增 1 条 Issue。
- 核心团队保持高频提交，工作重心集中在 **Telegram 多渠道实例化**、**“从模板创建 Agent”功能链路**，以及多条渠道适配器的稳定性修补。
- 新通道 Mattermost 集成正式合入主分支，开源生态可接入渠道进一步扩展。
- 唯一的新 Issue（#3426）指出了 `send_card` 文档与桥接层实现不一致导致的用户体验问题，属于流程集成缺陷，目前尚无回复或修复 PR。
- 整体项目健康度良好：维护者响应积极，合并吞吐量较高；但部分“半成品”文档/契约问题仍需及时跟进。

## 项目进展

今日合并/关闭的 PR 中，以下几项值得重点关注：

- **Mattermost 通道集成合入（#3202）**  
  这是社区贡献者 @wakqasahmed 提交的新渠道，参照 `slack.ts` 模式实现注册，关闭了 Issue #1379。合入后 NanoClaw 在 Chat SDK 层面又增加一个主流办公沟通渠道。  
  🔗 https://github.com/nanocoai/nanoclaw/pull/3202

- **Driver attach 接口正式定稿（#3429）**：该 PR 不再把 attach 逻辑硬编码在各命令中，而是让 driver 以 `SessionExecSpec { bin, argsTty, argsPlain }` 的方式描述运行时如何启动一个交互式进程，为日后的终端 attach 工具铺平抽象基础。  
  🔗 https://github.com/nanocoai/nanoclaw/pull/3429

- **容器依赖升级（#3439）**：Claude Code CLI 从 2.1.197 升级至 2.1.238，Agent SDK 同步从 ^0.3.197 升到 ^0.3.238，保障容器内代理运行时与最新命令行生态兼容。  
  🔗 https://github.com/nanocoai/nanoclaw/pull/3439

- **多个渠道与 CI 稳定性修复合入**：
  - `fix(matrix): use a refresh-safe ESM patch`（#3403）——修复 Matrix 在 Node 22 下由于 extensionless ESM 导入失败，改为提交内置 pnpm patch 并随安装回放。
  - `fix(providers): accept provider file events`（#3402）——让分支型 provider 已发出的事件能够被接收。
  - `fix(whats app-cloud): keep skill payload compatible with main`（#3401）——修复 WhatsApp Cloud 技能在合入 main 分支后注册依赖缺失的问题。
  - `ci: test registry-backed skills`（#3424）以及 `fix: restore stable CI required check`（#3430）——让主分支 CI 的 required check 重新变成可靠信号，而不是持续处于缺失状态。  
  🔗 https://github.com/nanocoai/nanoclaw/pull/3403 | https://github.com/nanocoai/nanoclaw/pull/3402 | https://github.com/nanocoai/nanoclaw/pull/3402 | https://github.com/nanocoai/nanoclaw/pull/3401 | https://github.com/nanocoai/nanoclaw/pull/3424 | https://github.com/catworkshop/claw/pull/3430

整体而言，今日项目在“inbound 渠道接入”和“CI/安装链路加固”两条线上均有明显推进。

## 社区热点

今日活跃的 PR 基本来自核心团队（`core-team`），反映了本周主要开发方向：

- **“聊天中创建 Agent” 链路（#3396 + #3428）**：`create_agent` 工具新增可选 `template` 引用，并计划打通 Slack 创建流程。该 PR 为端到端功能，但涉及 `templates` 注册表，讨论热度较高。  
  🔗 https://github.com/nanocoai/nan

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>



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

# Moltis 项目日报 — 2026-08-22

## 1. 今日速览

- 项目过去 24 小时处于典型的「修复驱动」迭代状态：新增 2 个 Issue，共有 8 条 PR 处于活跃状态，其中 7 条待合并、1 条已关闭。
- 修复主要集中在 **WhatsApp、Cron 调度、浏览器隐私模式、i18n、Web 安全校验** 等真实使用场景，说明项目正在从“功能搭建”转向“环境适配与稳定化”。
- 两条新 Issue 均指向生产环境可感知的问题：Slack 共享频道工具失效、heartbeat 活跃时段配置逻辑与文档不符，属于较高质量反馈。
- 没有发版动作，但有多个功能修复 PR 等待合入，next minor/patch 版本预计会有较密集更新。
- 整体健康度良好，维护响应及时；少数历史 PR 长期未合并是当前主要流程压力点。

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日有 1 个 PR 关闭/完成，另有 7 个修复 PR 在等待合并。

### 已关闭

- [#1220 fix(whatsapp): render Markdown in outbound messages](https://github.com/moltis-org/moltis/pull/1220)
  将模型生成的 Markdown 在出站前转换为 WhatsApp 原生格式，同时保留 session 与 Web UI 中的原始 Markdown。这个改动补上了 WhatsApp 场景下用户与模型对话的展示体验短板。

### 待合并 PR（重点）

- [#1228 fix(whatsapp): persist inbound files for local tools](https://github.com/moltis-org/moltis/pull/1228)  
  为本地工具提供 WhatsApp 入站文件的稳定 `local_path`，并限制 20MB 上限，是工具链落地的重要基础能力。
- [#1227 fix(browser): enable Obscura stealth mode by default](https://github.com/moltis-org/moltis/pull/1227)  
  默认开启 Obscura 浏览器 sidecar 的 `--stealth` 模式，并通过 `tools.browser.obscura_stealth` 提供给运维关闭。
- [#1226 fix(cron): deliver scheduled output to the originating chat](https://github.com/moltis-org/moltis/pull/1226)  
  让定时任务的输出能正确回到触发它的聊天会话，并保留线程/话题路由。
- [#1225 fix(i18n): update and

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-22

> 数据来源：[github.com/agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)（CoPaw） | 统计窗口：过去 24 小时
> 数据口径：Issues 34 条（活跃 19 / 关闭 15），PR 36 条（待合并 21 / 合并或关闭 15），新版本 Release 0 个

---

## 1. 今日速览

过去 24 小时 CoPaw 项目保持高活跃度：34 条 Issue 更新（19 条活跃、15 条关闭）与 36 条 PR 更新（21 条待合并、15 条已合并/关闭）并行推进，社区反馈与代码合入节奏均衡。核心看点有三：一是 `v2.1.1b2` 版本号 bump PR（#7200）已被关闭/合并，预示 2.1.1 迭代进入收尾阶段；二是自托管多用户 Hub（#7112）与长会话性能优化（#7176）两个重量级 PR 合入，标志项目在部署形态与大规模使用体验两个方向取得实质进展；三是工程质量投入显著——前端/后端测试覆盖计划（#5580、#5437、#5433、#5419、#5007、#5006、#5005、#5004 等 8 个测试相关 Issue）同日集中关闭，测试基建从计划走向落地。社区侧热度集中在 MCP 连接稳定性（#6524，6 条评论）、工具调用 404（#7016）、embedding 健康检查超时（#7156）等稳定性问题上，另有 5 条以上 UI/交互体验类新需求提出，用户对"视觉干扰"与"审批模式"的改进呼声较高。

---

## 2. 版本发布

今日无新版本 Release。但 [#7200 chore: bump the version to v2.1.1b2](https://github.com/agentscope-ai/QwenPaw/pull/7200) 已关闭/合并，说明 v2.1.1 的 beta 2 构建号正在推进，预计下一版本发布已进入准备流程。结合 [#7206 报告 v2.1.1-beta.1 存在 `/compact` 回归问题](https://github.com/agentscope-ai/QwenPaw/issues/7206)（Pydantic ValidationError），v2.1.1b2 的发布可能包含该回归的修复。

---

## 3. 项目进展

今日合入/关闭的 PR 中，以下 4 项对项目推进最为关键：

**功能与架构**
- **[#7112 feat(hub): add self-hosted multi-user Hub with local and Docker runtimes](https://github.com/agentscope-ai/QwenPaw/pull/7112)**（已合并/关闭）——新增 QwenPaw Hub，支持自托管多用户控制平面，可为本地账户运行隔离的 QwenPaw App 实例。`qwenpaw hub --config` 即可启用，现有 `qwenpaw app` 流程不受影响。这是项目从单机工具走向多用户协作平台的重要架构性一步。

**性能与稳定性**
- **[#7176 perf(console): keep long chat sessions responsive](https://github.com/agentscope-ai/QwenPaw/pull/7176)**（已合并/关闭）——优化长会话下 Console 的响应性，消除流式更新时重复的 Markdown 同步解析等性能瓶颈。直接回应了社区对长对话卡顿的长期抱怨。

**工程质量**
- **[#7205 test(coverage): fix Windows integration coverage always reading 0](https://github.com/agentscope-ai/QwenPaw/pull/7205)**（已合并/关闭）——修复 Windows 平台 nightly 集成测试覆盖率始终读取为 0 的问题，并增加 fail-closed 防护，避免静默的空覆盖集合再次上传。自 6 月 26 日（#5531）起该问题持续了近两个月，本次属于重要的测试可信度修复。
- **[#7200 chore: bump the version to v2.1.1b2](https://github.com/agentscope-ai/QwenPaw/pull/7200)**（已合并/关闭）——版本号推进。

此外，今日有 8 个测试计划类 Issue 集中关闭（[#5580](https://github.com/agentscope-ai/QwenPaw/issues/5580)、[#5437](https://github.com/agentscope-ai/QwenPaw/issues/5437)、[#5433](https://github.com/agentscope-ai/QwenPaw/issues/5433)、[#5419](https://github.com/agentscope-ai/QwenPaw/issues/5419)、[#5007](https://github.com/agentscope-ai/QwenPaw/issues/5007)、[#5006](https://github.com/agentscope-ai/QwenPaw/issues/5006)、[#5005](https://github.com/agentscope-ai/QwenPaw/issues/5005)、[#5004](https://github.com

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-08-22

> 数据来源：github.com/gaoyangz77/easyclaw | 数据窗口：过去24小时

---

## 1. 今日速览

EasyClaw 今日整体保持**温和活跃**。

过去24小时，项目在社区协作层面（Issues 与 PR）**无新增、无关闭、无讨论**，所有工作重心集中在**连续发布两个小版本**（v1.8.108、v1.8.109），全部围绕**飞书（Feishu）集成能力**的修复与增强展开。

项目整体处于稳定维护期，开发路径清晰（聚焦飞书生态），但社区互动和外部贡献活跃度较低。

**健康度评估：** 🟢 稳定 — 版本迭代节奏良好，无紧急安全事件、无积压待处理、无活跃 Bug 报告。

---

## 2. 版本发布

连续发布两个**补丁/增强版本**，均围绕飞书消息处理域的体验优化与可靠性修复，无破坏性变更（无注释提示）。

### 🔖 v1.8.109 — TK Copilot

- **更新内容**：Acknowledge Feishu customer-service cards without requiring a chat lookup
  - 中文：无需查询会话即可确认飞书客服卡片
- **影响**：简化了客服卡片确认流程，消除不必要的会话回查基线，直接提升使用效率；开发者考虑：如需保存客服卡片确认状态，调用方行为发生变化。
- **安装注意事项**：macOS 用户可能遇到 `'RivonClaw' is damaged` 提示，这是 Gatekeeper 拦截未签名应用，文件实为正常码。
- **GitHub 链接**：[点击查看 Release v1.8.109](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.109)

### 🔖 v1.8.108 — TK Copilot

> **更新内容**：Restore reliable Feishu delivery custody for visible messages
> **中文解释**：恢复飞书可见消息的可靠发送托管

- **影响**：修复了此前托管的可回退性问题，确保可见消息在飞书传输中被正确追踪，避免消息发送状态未确定的状态。对于依赖飞书消息交付闭环用户，此版本是重要稳定性升级。
- **安装注意事项**：同上，macOS 返回值 `'RivonClaw is damaged'` 属正常拦截情况，需要手动允许或重新签名。
- **GitHub 链接**：[https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.108](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.108)

---

## 3. 项目进展

**今日合并/关闭的 PR：** 无

**今日合并 Fresh 的 PR：** 无

**说明：** 今日进展完全由两个 Release 驱动，未发现外部 code contributions。若 v1.8.108/v1.8.109 的变更来源是 Commit 而非 PR，那么这些变更对应的功能调整推动飞书场景的成熟度前进两步：

- 从「消息可发」→「消息托管可靠」
- 从「卡片需查会话确认」→「进入即确认」

整体项目演化方向：**通过快速迭代重稳平台核心场景（飞书）的可靠性，暂不扩展新场景。**

---

## 4. 社区热点

**今日无任何活跃 Issue 或 PR**，因此无具体讨论热点。

**讨论动态分析：**
- 外发 Issue/PR 均为 0，说明社区参与者对项目的积极性不高，或者在稳定期。
- 近期不断的版本更新（如连续两天发版）可能意味着维护者本身就是主要代码贡献者，但相对缺少外部反馈。

---

## 5. Bug 与稳定性

**今日未报告新 Bug、崩溃、回归问题。**

值得指出的是，**安装过程中的 macOS Gatekeeper 报错** 并非由本体触发，而是「未签名应用 + macOS 安全策略」造成的常见环境兼容问题。此问题已连续出现在多期 Release Notes 中，属于**用户影响面大但程度较轻**的问题，可考虑在后续版本添加签名或提供一键式 Mark 信任脚本，减少用户障碍。

---

## 6. 功能请求与路线图信号

**今日无新 Issue 提出功能请求。**

结合近期涨茂的发布轨迹，可以得到较强的路线图信号：

- **飞书（Feishu）深度集成** 是当前主线，v1.8.108（交付托管）+ v1.8.109（卡片确认）均为飞书场景更新；
- 下一版本可能继续聚焦：
  - 飞书未读消息的批量处理
  - 消息确认豁免 / 免托管模式
  - macOS 安装体验优化（签名或支持说明）

暂无外部 PR 表明 `next` 版本会扩展新平台或新功能。

---

## 7. 用户反馈摘要

**由于今日无 Issues 无从提炼用户讨论，摘要基于官方 Release 发布说明中的指引性反馈：**

- **用户痛点**：macOS 用户首次安装会看到 “Can't be opened” 安全警告，存在“误认为程序损坏”的门槛。
- **使用场景**：核心场景是飞书客服消息与卡片处理，说明目标用户集中在客户服务/运营群体，操作是“发送可见消息”和“确认卡片”。
- 无明显负面抱怨文字，但连续两个版本均出现安全提示，说明反馈不那省事。

---

## 8. 待处理积压

**无长时间未响应 Issue 或 PR。**

当前项目的市场稳定、无积压，维护者注意力仍投放在版本前沿，数据健康。

---

*报告生成时间：2026-08-22 | 数据窗口：滚动 24h | 数据源：github.com/gaoyangz77/easyclaw*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*