# OpenClaw 生态日报 2026-08-25

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-25 00:37 UTC

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

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**分析日期：2026-08-25**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正经历从“基础设施搭建”向“体验打磨与场景深化”的快速跃迁。头部项目保持高频迭代（单日 PR 更新 20-50 条），性能优化（搜索索引、数据库写入）、安全加固与跨平台稳定性是本周的共性投入。与此同时，社区对 WebUI 交互体验、OpenAI/主流协议兼容性、自动化成本控制（零 token 触发）的诉求集中爆发，表明用户已从“能用”进入“好用”阶段，且对生态互操作性（协议兼容、provider 平迁）的需求愈发强烈。值得注意的是，Zeroclaw 的 S0 级安全漏洞（delegate 绕过安全策略）为本生态的安全治理敲响警钟，安全与功能迭代的赛跑正在加速。

## 2. 各项目活跃度对比

| 项目 | Issues（新增/活跃） | PRs（更新/合并） | Release | 健康度评估 |
|---|---|---|---|---|
| **NanoBot** | 8 条（全开启） | 26 条（12 合并，14 待合并） | 无 | 🟢 高活，功能交付与性能优化并进，但部分 PR 冲突滞留 |
| **Zeroclaw** | 50 条（43 活跃，7 关闭） | 50 条（5 合并，45 待合并） | 无 | 🟡 高活但积压显著，S0 安全漏洞处理中，合并瓶颈需警惕 |
| **NanoClaw** | 21 条 PR 更新 | 21 条（3 合并/关闭） | **v2.3.0** | 🟢 高活，新版本发布 + 核心团队密集提交，严重 Bug 响应快 |
| **IronClaw** | 23 条（14 活跃，9 关闭） | 35 条（17 合并，18 待合并） | 无 | 🟢 高活，CI 基建与 WebUI 优化双线推进，修复响应快 |
| **PicoClaw** | 2 条 | 3 条（2 合并） | 无 | 🟢 中低活，维护型推进，无严重回归 |
| **LobsterAI** | 3 条（关闭） | 11 条（10 合并） | 无 | 🟢 中活，集中前端体验打磨，无新开 Issue |
| **ZeptoClaw** | 1 条（新开） | 0 条 | 无 | 🟡 低活，需求收集期，高质量 UX 提案待响应 |
| **Moltis / CoPaw** | 无数据 | 无数据 | — | ⚪ 数据缺失，需补充观测 |
| **TinyClaw / EasyClaw** | 0 条 | 0 条 | — | ⚪ 无活动 |

## 3. OpenClaw 在生态中的定位

OpenClaw 作为生态的核心参照项目，虽本报告未提供其直接动态数据，但从分支项目（NanoClaw、PicoClaw、Zeroclaw 等）的命名与定位可清晰看出其**生态源头与标准制定者**的角色。各分支项目均围绕 OpenClaw 的能力边界进行垂直深耕：Zeroclaw 补全协议兼容与安全治理、NanoClaw 扩展多渠道适配、PicoClaw 探索轻量/嵌入式场景、NanoBot 强化自动化与成本控制。OpenClaw 的优势在于其先发积累的社区规模与技术栈完整性，而生态竞争的核心则转向“谁能最先把 OpenClaw 的能力封装成让目标用户无痛使用的体验”——这正是各分支项目的差异化战场。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **WebUI / 前端实时体验** | PicoClaw（#806）、NanoBot（#5512）、IronClaw（#7297） | 非技术用户门槛、流式状态同步（`isStreaming` 卡死/重置）、错误消息清理，WebUI 正成为“可用性”的默认基线 |
| **协议兼容与 provider 平迁** | Zeroclaw（#8603）、NanoBot（#5350）、NanoClaw（#2475） | 暴露 OpenAI Chat Completions 协议以接入通用客户端；DashScope→QwenCloud 平滑迁移；Claude/Codex 间能力对齐，共建“不锁定”的互操作层 |
| **自动化成本控制** | NanoBot（#5510/#4549）、NanoBot（#5510 与 #4549） | 零 token 条件触发器、heartbeat 使用廉价模型，社区强烈倾向“能不用 LLM 就不用”的轻量事件驱动设计 |
| **存储与性能瓶颈突破** | NanoBot（FTS5 索引）、LobsterAI（SQLite 写放大修复）、NanoClaw（better-sqlite3 崩溃） | 会话增长后的查询延迟、全量写盘、原生模块兼容性，数据层已成为规模化的共同瓶颈 |
| **安全策略与自动化边界的碰撞** | Zeroclaw（#10165）、NanoBot（#5496）、NanoClaw（#3497） | delegate 绕过高危命令拦截、超时保护盲区、依赖库段错误，安全与稳定性是自动化场景信任的基石 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **NanoBot** | 个人自动化与性能敏感场景 | 个人开发者/自动化运维者 | SQLite FTS5 全文检索、条件触发器运行时、统一 usage 后端，围绕“轻量、低 token 消耗”设计 |
| **Zeroclaw** | 安全治理与生态兼容性 | 企业对安全有严格要求的团队/高级用户 | 独立 delegate 风险隔离、reliable fallback 链路、README 驱动的本地化策略，注重可审计性 |
| **NanoClaw** | 多渠道接入与运行时多样性 | 需要 Slack/Mattermost/Dial 等多平台覆盖的团队 | 基于 NanoCo Chat SDK 适配器、宿主协调状态持久化、Apple Container 会话驱动，强调运行时可移植性 |
| **IronClaw** | CI 基础设施与 WebUI 打磨 | 开发者体验敏感的项目型用户 | 四条并行 CI 加速轨道（setup-rust composite/nextest）、共享页面外壳与加载原语、基于真实数据的 onboarding 建议生成 |
| **PicoClaw** | 轻量/嵌入式部署 | 技术爱好者、低成本硬件用户 | 安全凭据加载顺序修复、多 PR 整合，走“小而稳”路线 |
| **LobsterAI** | 桌面端资源管理与协作 | 桌面重度用户、团队协作用户 | 跨平台缩略图渲染器、SQLite 写入优化、协作上下文菜单保留，强前端体验打磨 |
| **ZeptoClaw** | CLI 交互优化 | 终端重度用户/开发者 | REPL UX 加固（安全退出、命令表格），聚焦交互式工作流的连续性 |

## 6. 社区热度与成熟度

**快速迭代 + 功能交付期（风险与速度并存）**：**NanoBot**、**Zeroclaw**、**NanoClaw**、**IronClaw**。四个项目每日 PR 更新均达 20-50 条，功能特性密集合入。NanoBot 与 NanoClaw 在“报告-修复”闭环上反应最快（如 #5512 当天出 fix），健康度最佳；Zeroclaw 虽有 S0 漏洞与 45 条待合并 PR 的积压压力，但其安全披露机制与 RFC 讨论（#8603，24 条评论）显示出成熟社区应有的治理意识。

**质量巩固与体验打磨期**：**LobsterAI**、**PicoClaw**。PR 合并集中在 UI 细节、稳定性修复与依赖清理，无新功能大版本推进，属于“存量优化”阶段。

**需求收集与早期探索期**：**ZeptoClaw**。单日仅 1 条高质量 Issue，但尚无维护者响应与代码产出，处于社区反馈驱动的萌芽阶段。

## 7. 值得关注的趋势信号

- **“零 token”架构正成为自动化场景的核心竞争力**。NanoBot 的 ConditionalTriggerRuntime 获得社区高度认可（#5510），同时用户自发推动 heartbeat 廉价化（#4549），这表明行业共识正在形成：**自动化任务的基建应尽可能脱离 LLM 推理成本，仅将模型用于真正需要智能的环节**。开发者应优先采纳事件驱动与条件监视架构，而非轮询式 LLM 调用。
- **协议兼容层是生态卡位的关键战场**。Zeroclaw 的 Chat Completions RFC 获得 24 条评论，NanoBot 的 QwenCloud 平迁诉求连续两周未关闭，NanoClaw 则通过“skills + persona 透传”让 provider 切换等于改配置。**“不锁定用户”已经超越口号，成为客户端 SDK、渠道适配器、模型提供方的实际竞品维度**，新项目在设计 API 时应默认考虑 OpenAI 协议兼容。
- **WebUI 不再是“加分项”，而是“及格线”**。从 PicoClaw 的高优先级路线图（#806）到 NanoBot 的 WebUI 卡死 bug（#5512），再到 IronClaw 的连续前端体验优化，终端用户默认期望浏览器访问。前端实时状态同步（流式结束信号、错误清理）已成为决定用户留存的最敏感指标。
- **自动化信任危机初现**。Zeroclaw 的 S0 安全问题（高危命令被 delegate 绕过）与 NanoBot 的工具循环无检测（#5344）共同指向：当 agent 自主执行范围扩大，**安全策略的传递性（delegate 是否继承风险约束）与死循环检测必须成为默认能力，而非可选配置**。
- **技术债合并正在挤压社区贡献意愿**。多个项目（NanoBot #5344/#5349、Zeroclaw 45 条待合并 PR、LobsterAI 5 个月未动的 Electron 依赖 PR）存在 PR 长期滞留、冲突标记 stale 的现象。维护者需引入自动化冲突检测或专门的“PR 清理日”，否则将逐步消磨外部贡献者的积极性——**在生态竞争加剧的当下，响应速度就是社区吸引力**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-25

## 今日速览

过去 24 小时项目活跃度处于高位：新增/活跃 Issues 8 条（全部保持开启，无关闭），PR 更新 26 条（12 条合并/关闭，14 条待合并），均为近期高位水平。合并动作集中在性能优化（FTS5 全文搜索）、零 token 条件触发器、统一用量后端等方向，社区侧有 AnySearch 团队主动提交新 provider 集成方案，外部贡献意愿强。与此同时，多个长期开放的 PR 仍受冲突阻碍，平台型改动（配置编辑器、用量上报/追踪）正密集排队，整体呈现「功能迭代加速、稳定性和性能修复并进」的健康态势。目前无新版本发布。

---

## 项目进展

今日 12 条 PR 被合并/关闭，以功能落地和稳定性修复为主，项目重心从「接口定义」向「功能交付」推进：

- **会话搜索性能量级提升**：[#5507](https://github.com/HKUDS/nanobot/pull/5507) 引入 SQLite FTS5 全文搜索索引（对应 Issue #5509），解决会话增长后 JSONL 全量扫描的延迟问题，并提供安全回退机制。
- **自动化零 token 触发**：[#5508](https://github.com/HKUDS/nanobot/pull/5508) 新增 `ConditionalTriggerRuntime` 条件触发器（对应 Issue #5510），以纯 Python 条件监视替代心跳轮询，事件驱动且不消耗 token。
- **用量计量重构落地**：[#5481](https://github.com/HKUDS/nanobot/pull/5481) 合入统一 provider 用量后端（叠加于此前已合并的 [#5480](https://github.com/HKUDS/nanobot/pull/5480) 类型化 LLMUsage 契约之上），为 WebUI/TUI 会话建立完整用量记录链路。
- **关键超时漏洞补上**：[#5496](https://github.com/HKUDS/nanobot/pull/5496) 修复 no-tools 请求绕过 wall-clock 超时保护的问题，消除一个可能导致会话长时间挂起的隐患。
- **Windows 平台稳定性**：[#5517](https://github.com/HKUDS/nanobot/pull/5517) 解决 exec 会话在 Windows 下进程退出时序竞态问题，明确根退出与子进程就绪握手逻辑。
- **WebUI 工作区感知**：[#5506](https://github.com/HKUDS/nanobot/pull/5506) 将选中的 WebUI 项目同步为模型当前工作目录，同时保留共享工具契约前缀以维持 prompt-cache 复用。

此外，12 条合并/关闭中有多条属于同一特性栈（如 #5480/#5481），围绕统一 usage 与重试语义的底层重构已基本完成。

---

## 社区热点

当前讨论热度最高的是两条带有评论的 Issue：

- **[#5350 QwenCloud provider 兼容路径](https://github.com/HKUDS/nanobot/issues/5350)**（2 条评论）：提出在现有 DashScope 支持之外，增加向后兼容的 QwenCloud provider。该问题自 8 月 12 日创建以来持续未关闭，体现了 Qwen 国际化用户对「迁移无痛」的迫切诉求——已有 DashScope 的配置、密钥和存量数据不应作废，需要平滑过渡。
- **[#5512 WebUI 在 Gateway 重启后卡死](https://github.com/HKUDS/nanobot/issues/5512)**（1 条评论）：报告 WebUI 聊天界面在 Gateway 重启后永远停在「旋转中」状态，前端的 `isStreaming` 无法被重置。当天即有对应修复 PR [#5514](https://github.com/HKUDS/nanobot/pull/5514) 提交，属于社区「报告 - 修复」速度极快的互动，也反映出 WebUI 实时状态同步是当前用户最敏感的体验点。

另外，已开放近两个月的 [#4549 heartbeat model_override](https://github.com/HKUDS/nanobot/pull/4549) 虽无新评论，但持续被关注（更新于 8 月 24 日）。该 PR 允许为 heartbeat 配置更廉价的模型，背后诉求是控制巡检类自动任务的 token 成本，在自动化场景扩大的当下，这个需求正在变得越来越实际。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 |
|---|---|---|
| 高 | **[#5512 WebUI 在 Gateway 重启后卡在 spinning 状态](https://github.com/HKUDS/nanobot/issues/5512)**：前端收不到 `goal_status: idle`，导致聊天界面永久停滞 | 已有修复 PR [#5514](https://github.com/HKUDS/nanobot/pull/5514)（开启中），同天提交 |
| 中 | **[#5516 rich messages 与 streaming 互斥](https://github.com/HKUDS/nanobot/issues/5516)**：启用 `rich_messages: true` 时若开了 streaming（默认开启），富文本消息永远不会渲染，最终退回旧版 HTML 编辑方式 | 尚无修复 PR |
| 中 | **[#5344 工具循环无检测](https://github.com/HKUDS/nanobot/pull/5344)**（修复 PR 待合）：agent 反复调用相同工具相同参数直到耗尽 `max_iterations`，从外部看像卡死 | 修复 PR 已提交但停留 2 周以上，标记 conflict |
| 低 | **[#5349 测试时区缺陷](https://github.com/HKUDS/nanobot/pull/5349)**（修复 PR 待合）：settings 相关测试在 ~5 小时窗口期内因 `timezone_name` 未传参而失败 | 修复 PR 已提交，但滞留 2 周且有 conflict |
| 低 | **[#5515 会话回复超时任务未观察失败](https://github.com/HKUDS/nanobot/pull/5515)**（修复 PR 开启）：`SendSessionMessageTool` 的后台超时任务只丢弃不观察，消息总线故障时无人感知 | 修复 PR 开启待审 |

今日另有两条稳定性相关修复已合并：`#5496` 堵上 no-tools 请求超时盲区，`#5517` 修复 Windows 进程时序竞态。整体看，严重 Bug 出现后社区响应速度很快（#5512 当天出 fix），但多个低/中危修复 PR 因冲突长期滞留，需要维护者介入处理。

---

## 功能请求与路线图信号

- **明确已纳入路线图（对应 PR 已合）**：
  - **[#5509 会话搜索性能](https://github.com/HKUDS/nanobot/issues/5509)** → 已由 PR [#5507](https://github.com/HKUDS/nanobot/pull/5507) 合入，FTS5 索引成为搜索基础能力。
  - **[#5510 零 token 条件触发器](https://github.com/HKUDS/nanobot/issues/5510)** → 已由 PR [#5508](https://github.com/HKUDS/nanobot/pull/5508) 合入，未来的自动化将支持轻量事件驱动。
  - **[#5512 WebUI 重连状态 bug](https://github.com/HKUDS/nanobot/issues/5512)** → 已有修复 PR [#5514](https://github.com/HKUDS/nanobot/pull/5514)，预计很快合入。

- **新提出、大概率进入下一迭代**：
  - **[#5513 cron 结果路由到可配置频道并支持批量归档](https://github.com/HKUDS/nanobot/issues/5513)**：把自动化噪声与个人对话分离，是运维类用户较集中的诉求。
  - **[#5511 多步任务的崩溃安全台账](https://github.com/HKUDS/nanobot/issues/5511)**：持久化任务进度，Gateway 重启后无需用户重述任务，是稳定性方向的延伸。
  - **[#5350 QwenCloud provider 路径](https://github.com/HKUDS/nanobot/issues/5350)**：涉及 provider 层兼容性改造，需要评估与现有 DashScope 支持并存的设计。

- **外部团队主动接入**：
  - **[#5505 AnySearch 作为 web_search provider](https://github.com/HKUDS/nanobot/issues/5505)**：AnySearch 团队提出将自身作为新的搜索 provider 并计划直接提交 PR，支持匿名配额、无需 API key。这类「上游主动集成」对生态扩展是积极信号，是否合入取决于项目组对多搜索源并存的优先级判断。

---

## 用户反馈摘要

- **Qwen 国际化用户迁移顾虑**（来自 [#5350](https://github.com/HKUDS/nanobot/issues/5350)）：用户明确表示「existing DashScope provider IDs, API keys, endpoints, and saved configurations may still be in active use」，希望新增 QwenCloud 时不破坏存量配置。核心诉求是**向后兼容**，不愿意因为平台演进而重配已有环境。
- **WebUI 状态同步是体验敏感点**（来自 [#5512](https://github.com/HKUDS/nanobot/issues/5512)）：描述「frontend never receives the final `goal_status: idle` push」以及「turn appears hung even though the backend may」，说明用户即使在后端已完成请求的情况下，也无法容忍前端永久 loading 状态。**前端实时性直接决定功能是否「可用」**。
- **自动化成本敏感**（来自 [#5510](https://github.com/HKUDS/nanobot/issues/5510) 与 [#4549](https://github.com/HKUDS/nanobot/pull/4549)）：多个用户都在推动「能不用 LLM 就不用」的设计，心跳轮询烧 token、heartbeat 想换更便宜的模型，反映自动化场景正在从

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-25

## 今日速览

过去 24 小时项目保持高强度迭代：50 条 Issue 更新（43 条活跃、7 条关闭）与 50 条 PR 更新（45 条待合并、5 条合并/关闭），无新版本发布。最值得关注的是 S0 级安全漏洞 #10165（独立 delegate 绕过 `block_high_risk_commands` 安全策略）仍在处理中，且多条高优先级 PR 处于 `do-not-merge`/`needs-author-action` 状态，合并积压明显。社区讨论集中于 OpenAI Chat Completions 协议兼容性（RFC #8603，24 条评论），反映用户对生态互操作性的强烈需求。整体项目健康度良好，但安全修复与 PR 积压是当前主要风险点。

## 版本发布

无新版本发布（过去 24 小时 Release 数为 0）。

---

## 项目进展

今日共 5 条 PR 被合并/关闭，对应多项稳定性与跨平台修复落地：

### 已合并 PR（3 条）

| PR | 标题 | 核心内容 |
|---|---|---|
| [#10208](https://github.com/zeroclaw-labs/zeroclaw/pull/10208) | fix(tests): fix Windows platform test failures | 修复 Windows 平台 `bash` 调用失败与测试用例问题，覆盖 cron、provider、browser/shell/web/mcp 等多个工具模块 |
| [#9563](https://github.com/zeroclaw-labs/zeroclaw/pull/9563) | fix(channels): populate the typed media envelope from Telegram | 修复 Telegram 渠道图片/文档附件只以文本标记存在、`msg.attachments` 为空的问题，补齐媒体类型化数据通道 |
| [#10027](https://github.com/zeroclaw-labs/zeroclaw/pull/10027) | fix(providers): report the served model in reliable fallback failure logs | 让 reliable provider 回退日志输出实际服务的模型而非请求模型，对应问题 #10023 |

### 对应关闭的 Issue（6 条）

- [#10023](https://github.com/zeroclaw-labs/zeroclaw/issues/10023)（fallback 日志模型名不准确）— 已由 #10027 修复
- [#10251](https://github.com/zeroclaw-labs/zeroclaw/issues/10251)（Telegram listen_* 测试断言墙钟超时）— 已修复
- [#9590](https://github.com/zeroclaw-labs/zeroclaw/issues/9590)（并发 `models refresh` 丢失缓存条目）— 已修复
- [#10106](https://github.com/zeroclaw-labs/zeroclaw/issues/10106)（精确代理选择器拒绝转录服务）— 已修复
- [#10224](https://github.com/zeroclaw-labs/zeroclaw/issues/10224)（自定义 provider 5xx 错误被记录为重复转义 JSON）— 已修复
- [#10190](https://github.com/zeroclaw-labs/zeroclaw/issues/10190)（reasoning fallback 分类器误匹配复合错误子句）— 已修复

**项目向前迈进的判断**：本轮合并集中在测试稳定性、渠道媒体数据完整性和 provider 可观测性三个方向，属于基础设施加固，为后续功能迭代打底。但 45 条待合并 PR 的整体积压未显著缓解。

---

## 社区热点

### 🔥 最热 Issue：Chat Completions 协议兼容性讨论

[#8603 — RFC: ZeroClaw Chat Completions profile](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)（24 条评论）

> 用户希望 ZeroClaw 暴露 OpenAI Chat Completions 协议兼容层，使 Open WebUI、LobeChat、Continue.dev、Aider、LangChain 等主流客户端可以直接接入。目前 ZeroClaw 仅支持 WebSocket、ACP 和按渠道 webhook，生态兼容性受限。

**背后诉求**：社区强烈希望 ZeroClaw 成为可替换 OpenAI 后端的通用 AI 网关，而非封闭的独立平台。

### 💬 维护者决策队列关注度高

[#8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（14 条评论）

> 社区对 RFC/设计提案的积压与决策效率表示关注，希望维护者明确接受/拒绝/推迟的时间表。

### 其他活跃讨论

- [#7431](https://github.com/zeroclaw-labs/zeroclaw/issues/7431)（6 条评论）：为自然语言路由请求增加 pre-turn tool elicitation 提示，已接受（accepted）
- [#9512](https://github.com/zeroclaw-labs/zeroclaw/issues/9512)（5 条评论）：请求为每个自定义 CI 门禁标注来源 Issue/事故
- [#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)（4 条评论）：S0 安全漏洞，独立 delegate 绕过 `block_high_risk_commands`
- [#7759](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)（4 条评论）：WebSocket 生命周期与 agent turn 解耦，支持后台运行与断线恢复
- [#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363)（4 条评论）：配置元数据在非英语 locale 下未本地化

---

## Bug 与稳定性

### 🔴 S0 — 数据丢失/安全风险

**[#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)（in-progress，risk:high）— 独立 delegate 绕过 `block_high_risk_commands` 安全策略**

> 高危命令（如 `rm`）通过 independent delegate 执行时，即使 delegate 自身 `risk_profile` 设置了 `block_high_risk_commands = true`，拦截策略仍被绕过。这是当前最严重的安全问题，尚无可直接关联的 fix PR。

### 🟠 S1 — 严重异常（无新报告）

### 🟡 S2 — 功能降级

| Issue | 描述 | 状态 |
|---|---|---|
| [#9812](https://github.com/zeroclaw-labs/zeroclaw/issues/9812) | Provider fallback 使用 primary 的 model id，导致 fallback 永远不会触发，且将 fallback 拖入 cooldown | `r:needs-repro`，status:stale，risk:high |
| [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) | Cron 手动触发与运行历史读取在 agent 重命名窗口期存在 check-then-act 竞态 | 新开（1 条评论），risk:high |
| [#9820](https://github.com/zeroclaw-labs/zeroclaw/issues/9820) | calculator 工具：模型输出字面量 `<TOOLCALL>` 伪语法而非真实函数调用（NVIDIA NIM 模型，Raspberry Pi 5） | 待处理，risk:high |
| [#10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) | 交互式 agent 会话上下文被硬编码限制在 32,000 tokens，忽略配置的 131,072 | in-progress |
| [#10073](https://github.com/zeroclaw-labs/zeroclaw/issues/10073) | `StoragePolicy::Rolling` 在持续事件量下存在

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

好的，作为AI智能体与个人AI助手领域开源项目分析师，根据您提供的 PicoClaw GitHub 数据，我为您生成了 **2026年8月25日** 的项目动态日报。

---

### PicoClaw 项目动态日报 | 2026-08-25

#### 1. 今日速览
项目今日活跃度处于**中等水平**，主要集中于代码合并与Bug修复，而非新功能开发。具体表现为：有 3 条 PR 更新，其中 2 条已关闭（合并），涉及安全配置修复与多 PR 整合；Issues 侧更新 2 条，重点关注高优先级的 Web UI 功能请求（#806）。尽管暂无新版本发布，但通过合并历史 PR 和修复配置验证问题，项目正在稳步提升代码质量和稳定性，整体健康度良好。

---

#### 2. 版本发布
**今日无新版本发布**。不适用。

---

#### 3. 项目进展
今日合并（关闭）了 2 个 PR，标志着项目在维护性修复和内部整合上取得进展：

- **[PR #1929] (已关闭) fix: apply security credentials before config validation in web handlers** — 该补丁修复了 Web 启动器配置保存（PUT/PATCH `/api/config`）时因校验顺序错误而导致的失败问题。此修复增强了系统的安全配置管理能力，解决了用户在启用 pico 通道时因 `.security.yml` 凭据未被提前加载而无法保存配置的困扰。
- **[PR #1551] (已关闭) fix: merge PR #1428 #1422 #1417** — 这是一个整合性 PR，一次合并了三个来自开源社区的独立修复补丁。这有助于降低维护成本，加快社区贡献的落地速度。

---

#### 4. 社区热点
- **[Issue #806] [OPEN] [Feature]: Add webUI support** — 该 Issue 是今日讨论度最高的议题（10条评论，8个赞），虽然创建于 2 月，但在 8 月 24 日仍有更新。该提案要求开发专用 Web UI 以降低非技术用户的使用门槛，属于高优先级路线图。社区反馈的核心诉求是：**PicoClaw 不能仅局限于终端用户（TUI），需要拥抱浏览器端以吸引更广泛的用户群体**。该议题与项目正在进行的 Refactoring 工作相关，预计后续会有更多设计讨论。

---

#### 5. Bug 与稳定性
今日报告了一个新 Bug，且有一个已知 Bug 的修复 PR 被合并：

- **[Issue #3338] [OPEN] [BUG] Slack does not attach image media content** (优先级: 中等)
  **状态**: 已被标记为 `stale`。
  **详情**: 这是一个功能性问题。由于 `SendMedia` 在构建 `slack.UploadFileParameters` 时未设置 `FileSize`，导致所有 Slack 媒体上传失败并报错 `file.upload.v2: file size cannot be 0`。该问题在 8 月 17 日被报告，目前有 1 条评论，关注度较低。
  **证据链**: 该问题直接关联到 Slack 集成功能，是实际用户使用的痛点，但由于被标记为 stale，需要维护者介入确认是否在路线图中。
- **[PR #1929] (已关闭)**：该 PR 修复了“安全凭据在配置校验前未被应用”的 Bug（具体现象为错误提示 `channels.pico.token is required`）。**该 Bug 虽已修复，但并未找到对应的 Issue 记录。**

---

#### 6. 功能请求与路线图信号
- **[Issue #806] [Feature]: Add webUI support** (优先级: High, 路线图)
  **信号分析**: 该功能请求非常明确且优先级高。考虑到项目正处于 "Refactoring now" 阶段，Web UI 被视为降低用户门槛的关键一步。**参考 PR #3299 (Exa web search provider)**：虽然目前处于 `stale` 状态，但它扩展了 `tools.web` 能力，这表明项目正在加强 Web 搜索与交互层的能力建设。结合来看，**Web 端相关的功能（UI 与搜索）很可能成为下一版本的重点方向**。

---

#### 7. 用户反馈摘要
- **关于 Web UI (Issue #806)**：核心痛点在于当前 TUI 界面对于"非技术"用户不够友好，用户期望通过浏览器获得更直观的管理体验。这表明项目目前的主要用户仍偏向于开发者或技术爱好者，但在寻求破圈。
- **关于 Slack 上传 (Issue #3338)**：用户明确报告了 Slack 媒体上传的失败率 100%，这属于较低级的实现缺陷（遗漏参数），影响了特定渠道（Slack）的实用性。
- **关于安全配置 (PR #1929)**：用户反馈在 Web 保存配置时遇到了不应出现的校验错误，表明新 Web Handler 的配置加载顺序存在逻辑缺陷，这会打断用户对 Web 功能的使用信任。

---

#### 8. 待处理积压
以下事项需维护者重点关注，以避免社区贡献流失或问题恶化：

- **[PR #3299] [OPEN] [stale] Add native Exa web search provider** — 该 PR 已存在近一个月且被标记为 stale。作为新 web provider 的扩展，它提供了新的搜索数据源。若与 #806 (Web UI) 方向一致，建议维护者评估并回复。
- **[Issue #3338] [OPEN] [stale] Slack does not attach image media content** — 已进入 stale 状态。建议维护者标记为 `confirmed` 或分配负责人，以免该功能缺陷长期存在。
- **[Issue #806] [OPEN] 长期未关闭的高优先级路线图 Issue** — 该 Issue 已持续半年，虽然近期有更新，但尚未转化为具体的开发任务分解。既然处于 "Refactoring now" 阶段，建议维护者在该 Issue 下同步重构进度，以安抚社区期待。

---
**总结**：PicoClaw 项目今日属于**维护型推进**，重点在于修复存量隐患（配置加载、历史 PR 整合）。社区对 Web UI 的需求依然强烈，是后续路线图的最大指向。目前暂无明显的生态断裂或严重回归，但 Slack 上传 Bug 与 Exa 搜索 PR 的搁置是需要警惕的积压信号。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-25

## 1. 今日速览

项目今日保持高活跃度：过去 24 小时有 21 条 PR 更新，其中 3 条已合并/关闭，另有 1 个新版本 v2.3.0 发布。核心团队集中提交了一批关键工作，包括持久化宿主协调状态的基础架构（#3508）、macOS 平台更新控制器修复（#3506）、Mattermost 适配器接入（#3502）等，显示项目正在向更稳健的运行时与更广的渠道覆盖面推进。与此同时，社区报告了一个影响 macOS 安装的严重 Bug（better-sqlite3 segfault，见 #3497），但已有多条相关修复 PR 在途，整体健康度良好。

## 2. 版本发布

### v2.3.0 — 新的 Slack 体验（含破坏性变更）

链接：https://github.com/nanocoai/nanoclaw/releases/tag/v2.3.0

本次发布的重点是面向经典单机器人 Slack 安装的 **per-agent provisioned Slack apps（按 Agent 配置 Slack 应用）**，并带来了：agent 可从 Slack 内直接 spawn、以及一系列 UX 改进。

**破坏性变更提示**：这条变更对经典 Slack 安装主要以“决策门槛”形式出现，而非强制迁移——现有 Slack 集成继续按原方式工作，新安装和非 Slack 集成则不受影响。维护者希望通过此版本收集社区反馈，[请在讨论区或 Release 页面给出意见](https://github.com/nanocoai/nanoclaw/releases/tag/v2.3.0)，以便后续确定迁移路径。

## 3. 项目进展

今日共有 3 条 PR 完成合并/关闭。从 PR 列表中可直接观察到：

- **#2474 feat(setup): AI-coding-CLI picker — pick Claude Code or Codex during setup**（关闭/合并）  
  为安装流程引入 registry 框架，允许将失败步骤和辅助任务委托给 Claude Code 或 OpenAI Codex，并为未来 Aider/Gemini-CLI 等留下适配器接口。  
  https://github.com/nanocoai/nanoclaw/pull/2474

- **#2475 feat(codex): surface skills + persona to codex agents (parity with Claude)**（关闭/合并）  
  让 Codex agent 获得与 Claude Code 相同的 persona 与技能目录，使 provider 切换从内容重写简化为配置变更。  
  https://github.com/nanocoai/nanoclaw/pull/2475

另外，Issue #2767 已关闭（见下文社区热点），Telegram 渠道的 legacy-Markdown 兼容层随上游适配器修复而废弃。

整体来看，上述合并推动了**安装流程智能化**与**跨 Provider 能力对齐**两大方向，结合待合并队列中核心团队的多项工作，项目在渠道扩展、稳定性修复、内部架构清理上同时前进。

## 4. 社区热点

今日讨论最集中的议题围绕以下几条展开：

- **#3508 [core-team] feat(db): durable host-coordination state and the seams that will consume it**  
  链接：https://github.com/nanocoai/nanoclaw/pull/3508  
  核心团队提交的基础架构 PR，目标是让宿主重启不再丢失审批等待者、投递重试计数、停止/重启意图等关键状态。该 PR 虽标记为“休眠基础工作”，但其设计将影响未来所有协调流程的可靠性，社区关注度高。

- **#3396 / #3428：通过模板在聊天中创建 Agent**  
  #3396：https://github.com/nanocoai/nanoclaw/pull/3396  
  #3428：https://github.com/nanocoai/nanoclaw/pull/3428  
  两条 PR 配合，从 CLI/工具层到 Slack 创建流程打通“模板创建 agent”能力。其中 #3428 明确说明 supersedes 被提前合并的 #3397，说明团队在维护提交顺序上花了额外功夫，社区在评论中也对此有讨论。该功能有望成为 v2.4 的核心特性。

- **v2.3.0 的 Slack 破坏性变更讨论**  
  Release 页面：https://github.com/nanocoai/nanoclaw/releases/tag/v2.3.0  
  由于涉及经典 Slack 安装的未来走向，评论区在收集老用户对“per-agent app”模式的看法，是今日最有可能产生长讨论串的地方。

## 5. Bug 与稳定性

| 严重程度 | 问题 | 状态 | 说明 |
|---|---|---|---|
| 🔴 高 | **#3497 better-sqlite3 13 segfaults on open on MacOS** | 有修复 PR | Node 22 低于 22.14.0 时，`new Database()` 直接段错误，导致安装后无可用数据库层、`pnpm test` 无法完成。声明的最低 Node 版本 (`>=22`) 无法拦住问题。 |
| 🟠 中 | **#3506 fix(update): macOS 主机的 transaction controller 正确性** | 已有 PR（#3506，open） | 实际在 macOS 上运行 `/update-nanoclaw` 时遇到的 6 个缺陷，含一个在 Linux 回退模式下同样触发的共享代码问题。 |
| 🟠 中 | **#3499 fix(update): update controller 路径比较中的 symlink 解析** | 已有 PR（#3499，open） | 路径比较未解析符号链接，可能导致更新控制器误判文件状态。 |
| 🟡 低 | **#2767 Telegram legacy-Markdown sanitizer 已过时** | 已关闭 | 上游 `@chat-adapter/telegram@4.30.0` 已原生支持 MarkdownV2，不再需要本地 workaround。 |

上述 Bug 均已有对应修复 PR 或已在最新版本中解决，暂无未覆盖的严重稳定性风险。

## 6. 功能请求与路线图信号

从今日 PR 和 Issue 中可以提取出以下路线图信号：

- **Mattermost 渠道官方化**  
  #3502（使用 NanoCo Chat SDK 适配器）与 #3507（Mattermost 安装技能）同日提交，说明 Mattermost 正从社区集成走向官方支持。  
  https://github.com/nanocoai/nanoclaw/pull/3502  
  https://github.com/nanocoai/nanoclaw/pull/3507

- **Apple Container 会话驱动**  
  #3503 引入 `NANOCLAW_RUNTIME_DRIVER=container` 驱动，支持在 macOS microVM 中运行会话，是驱动层缝的第一个 overlay，预计后续会有更多运行时后端。  
  https://github.com/nanocoai/nanoclaw/pull/3503

- **MindsHub Provider 指南**  
  #3493 为 MindsHub 增加了 provider 指南和安装技能，属于纯文档补充，消息来自社区成员。  
  https://github.com/nanocoai/nanoclaw/pull/3493

- **从模板创建 Agent（chat-driven templates）**  
  #3396（`create_agent` 工具支持 `template` 参数）和 #3428（Slack 流程透传模板引用）共同指向一个更强的用户自定义 Agent 工作流，预计是下一个小版本的核心功能。

- **Dial 渠道补齐**  
  #3501 将 Dial 渠道补充进 README 与 changelog，结合此前已合入的 adapter（#3041/#3050），Dial 已成为完整支持的一等渠道。  
  https://github.com/nanocoai/nanoclaw/pull/3501

## 7. 用户反馈摘要

- **#2767（关闭）**：维护者或贡献者主动发现 Telegram 适配器上游已修复 `parse_mode=MarkdownV2` 支持，并清除了本地 workaround。这说明社区在持续跟踪上游依赖变更，主动消减技术债。  
  https://github.com/nanocoai/nanoclaw/issues/2767

- **#3497（新开）**：用户 @brentkearney 报告了 macOS 上 better-sqlite3 的段错误，并明确指出问题与 Node 版本下限声明不符——安装流程在旧 Node 22 上会通过所有检查、最终却得不到可用的数据库层。这是典型的“版本门槛声明不足”导致的用户挫折，提示维护者应提高对 Node 小版本要求的可见性。  
  https://github.com/nanocoai/nanoclaw/issues/3497

## 8. 待处理积压

以下 PR 已存在较长时间但仍未合并，建议维护者优先关注：

- **#2361 tighten codex provider contracts**（2026-05-09 创建，今日仍有更新）  
  将 Codex provider 契约对齐到当前 `codex app-server` JSON-RPC 规格，并让 `CODEX_MODEL` 变为可选覆盖。  
  https://github.com/nanocoai/nanoclaw/pull/2361

- **#2337 feat(providers): surface Claude Code skill

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-25

## 1. 今日速览

过去24小时 IronClaw 项目保持了较高的开发活跃度：共产生23条 Issue 更新（新开/活跃14条，关闭9条）和35条 PR 更新（待合并18条，已合并/关闭17条），合入率为约49%。当前无新版本发布。开发重点集中在三个方面：一是 CI 基础设施优化（T1 setup-rust composite 已合并，T2 nextest 管道推进中）；二是 WebUI 的 onboarding suggestions 流程闭环（#7815 相关前后端修复已落地）；三是新增了多项针对用户反馈的 bug 修复（Telegram 设置、登录页 UI 等）。整体项目健康度良好，修复响应速度快，但有零星的 QA 回归和配置类问题值得关注。

---

## 2. 版本发布

过去24小时内无新版本发布。当前最新版本仍为 **1.3.0**（由 Issue #7856 中的部署信息佐证，commit `70795c16ed0cec21eb8cba16d2dcf851d25dc83d`）。下一版本 **1.4.0** 已出现相关建议标签（见 #7849），预计还会有数个里程碑 PR 合并后才会发版。

---

## 3. 项目进展

今日共有17条 PR 合并/关闭，其中具有代表性的合入项如下：

- **[#7821 [CLOSED] ci: 单一 setup-rust composite — toolchain 固定、mold 链接器、集中化构建配置（T1）](https://github.com/nearai/ironclaw/pull/7821)** — 关闭 Issue #7798。将43处散布在12个 workflow 文件中的 `dtolnay/rust-toolchain` 调用收敛为一个 `.github/actions/setup-rust` composite action，从根本上消除 "本地绿、CI 红" 的 toolchain 漂移问题。这是四条并行 CI 加速轨道的第一个合入项。

- **[#7833 [CLOSED] feat(suggestions): 使用用户 no-approval 只读工具生成建议（#7812）](https://github.com/nearai/ironclaw/pull/7833)** — 关闭 Issue #7812。建议卡片生成器不再局限于硬编码的四能力白名单，而是基于用户已连接的账号（如 Gmail）在无审批、只读权限下生成建议，使建议真正 grounded 在用户实际数据上。

- **[#7001 [CLOSED] feat(loop): 保持缓存的系统前缀跨模型调用字节稳定](https://github.com/nearai/ironclaw/pull/7001)** — 关闭 Issue #6985。修复了内联循环控制 nudges 和时间戳导致整个缓存前缀失效的 P0 性能问题，是 pi-harness 适配计划的一部分。

- **[#7857 [CLOSED] fix(webui): 启动建议任务后刷新会话列表](https://github.com/nearai/ironclaw/pull/7857)** — 修复 Issue #7845（激活建议任务后左侧面板不出现会话条目）的根因，在非轮询会话查询中增加刷新机制，并附带了回归测试。

- **[#7854 [CLOSED] fix(webui): 移除 Gateway v2 登录页眉](https://github.com/nearai/ironclaw/pull/7854)** — 清理登录页 UI，同步移除11个语言包中的废弃 `login.tagline` 键，并增加了过期 locale 键守卫测试。

- **[#7794 [CLOSED] refactor(webui): 引入共享页面外壳与加载原语](https://github.com/nearai/ironclaw/pull/7794)** — 关闭 Issue #7792。Automations、Extensions、Admin、Workspace、Settings 五个页面的滚动/间距/骨架屏逻辑收敛为共享组件。

**CI 辅助排查**：另有一条临时性 bisect PR（[#7852](https://github.com/nearai/ironclaw/pull/7852)）和 Windows 探针 PR（[#7858](https://github.com/nearai/ironclaw/pull/7858)），用于隔离 T1 的 E2E 失败是否由 profile 变更引起，已按预期关闭。

---

## 4. 社区热点

> 注意：数据中的评论数字来自外部展示，#7257 等 PR 的评论数显示为 undefined，此处仅以已知评论数筛选。

- **[#7812 [CLOSED] Onboarding 建议应遵守用户级工具权限并使用只读工具生成](https://github.com/nearai/ironclaw/issues/7812)** — 3条评论。用户 `@sergeiest` 指出建议生成目前只见内部搜索工具，无法基于用户真实数据生成建议。该 Issue 已被 #7833 合入解决，从提出到关闭仅2天，是社区驱动开发的正面案例。

- **[#7297 [OPEN] 每次提示失败后 UI 中的错误消息不断堆叠](https://github.com/nearai/ironclaw/issues/7297)** — 2条评论。Railway QA 实例上的 bug，用户反馈旧错误消息（service_unavailable、runner heartbeat 失败等）从未被清除，导致 UI 越来越混乱。这是一个典型的 UX 累积性 bug，已开放19天，值得关注。

- **[#7798 [CLOSED] CI 加速 T1 setup-rust composite action](https://github.com/nearai/ironclaw/issues/7798)** — 2条评论。来自核心维护者 `@henrypark133`，反映了 CI 基础设施建设是社区开发者最关心的问题之一——43处重复 toolchain 配置不仅拖慢 CI，也增加了维护成本。

**分析**：社区讨论热点集中在**建议生成质量**和 **CI 稳定性**两大方向。前者代表终端用户可感知的产品体验改进，后者代表开发者体验的基础设施投资。两者获得同等的社区关注度，说明 IronClaw 项目在用户与开发者双端都有持续投入。

---

## 5. Bug 与稳定性

### 高优先级

- **[#7297 [OPEN] 每次失败提示后错误消息在 UI 中不断累积](https://github.com/nearai/ironclaw/issues/7297)**
  严重程度：中高（UX 持续恶化）
  状态：开放19天，无关联 fix PR。建议优先安排修复，可以在下一次错误产生时清除旧的 runner 心跳错误。

### 中优先级

- **[#7856 [OPEN] MCP 工具发现静默跳过 camelCase 工具名](https://github.com/nearai/ironclaw/issues/7856)**
  严重程度：中（功能性 bug，工具不可用但没有报错）
  状态：新开 Issue，无 fix PR。问题在于托管 MCP 发现机制要求工具名直接可作为标识符使用，camelCase 名称会被静默跳过，用户难以察觉。

- **[#7853 [OPEN] Telegram 设置提供个人账号关联但无法完成（缺少工具）](https://github.com/nearai/ironclaw/issues/7853)**
  严重程度：中（功能不可用，错误信息不明确）
  状态：**已有对应 fix PR [#7861](https://github.com/nearai/ironclaw/pull/7861)**，由 `@henrypark133` 于今日提交，恢复被 #7766 意外丢弃的设备关联设置引导。

- **[#7845 [CLOSED] 激活建议任务后左侧面板未创建/渲染会话条目](https://github.com/nearai/ironclaw/issues/7845)**
  严重程度：中（功能可用但视觉缺失）
  状态：**已修复**，通过 PR #7857 合入，附带回归测试。

- **[#7842 [OPEN] 请求执行期间出现通用 "invalid result" 错误](https://github.com/nearai/ironclaw/issues/7842)**
  严重程度：中（错误信息不具诊断价值）
  状态：来自 x-ai-product-feedback 渠道，新开无响应。需要复现步骤与日志。

### 低优先级 / 体验相关

- **[#7841 [OPEN] Telegram 设置以 "admin must configure" 告终](https://github.com/nearai/ironclaw/issues/7841)** — 来自用户反馈渠道，可能与 #7853 同源。
- **[#7840 [OPEN] Slack 连接引导缺失](https://github.com/nearai/ironclaw/issues/7840)** — 用户反馈应用没有清晰引导连接 Slack。

**稳定性总结**：今日有2个已关闭 bug（#7845、#7851 CI 修复），1个已提交修复待合入（#7853 → #7861），其余多为新反馈待诊断。main 分支 CI 在 08-24 出现过一次失败（#7851），已及时修复。

---

## 6. 功能请求与路线图信号

- **[#7849 [OPEN] [enhancement, v1.4.0] 为 Google Workspace 捆绑 agent-first GSuite CLI](https://github.com/nearai/ironclaw/issues/7849)** — 高风险、建议 P1。作者 `@serrrfirat` 指出当前 Gmail list/read 直接映射到 provider 的 wire format，模型需要多次 read 才能理解一封邮件的完整内容。该 Issue 已标记 **v1.4.0**，说明路线图中已有此规划，且是 #6879 的一部分。

- **[#7855 [OPEN] 添加意大利语支持](https://github.com/nearai/ironclaw/issues/7855)** — 来自 `@sergeiest`，要求与现有语言列表保持一致。属于低成本但能扩大用户基础的功能，可考虑在小版本中纳入。

- **[#7860 [OPEN] 拆分 ironclaw_extension_manager::lifecycle_product_service（1,774 行）](https://github.com/nearai/ironclaw/issues/7860)** — 由 `@henrypark133` 提出，架构层面避免单文件过大超过 `.claude/rules/architecture.md` 的 1,500-3,000 行上限区间。建议按 `ExtensionHostLifecycleProductService` 与 `ExtensionLifecycleProductService` 两个职责拆分为独立文件。

- **[#7843 [OPEN] Epic: Dogfooding & QA bug fixing 08/24-08/30](https://github.com/nearai/ironclaw/issues/7843)** — 新一周的 QA 周期已启动，说明项目有稳定的 bug 修复节奏（上周的 Epic #7685 已关闭）。

---

## 7. 用户反馈摘要

来自 Issues 评论及用户反馈渠道：

- **建议质量与实际数据脱节（已解决）**：用户 @sergeiest 在 #7812 中指出建议生成不读取用户真实数据，导致建议"无根"。该问题已通过 #7833 解决，建议卡现在可使用用户已连接账号的只读数据生成。从用户反馈到修复仅2天，响应及时。

- **错误信息持续累积破坏聊天体验（开放中）**：#7297 的用户描述了 Railway 测试实例上的具体场景——连续的 runner 心跳失败和 service_unavailable 错误堆积在聊天底部，旧错误永远不会清除，界面越来越混乱。这是一个直接影响用户信任度的问题。

- **Telegram 设置流程断裂**：#7853/#7841 的反馈显示 Telegram 设置向导在个人账号关联一步死路——agent 报告"没有可用工具"或"需要管理员配置"。流程设计上提供的能力与实际可用工具集不匹配，容易让用户感到困惑甚至受骗。

- **camelCase 工具名静默失效**：#7856 反映了扩展开发的边缘案例——工具名以 camelCase 命名时被 MCP 发现逻辑静默跳过，没有任何警告，开发者难以排查。

- **Slack 连接引导不清晰**：#7840 来自 x-ai-product-feedback 渠道，用户希望产品能明确引导连接 Slack。这类反馈指向 onboarding 流程还有进一步完善空间。

---

## 8. 待处理积压

- **[#6774 [OPEN] 在 Extensions > Registry UI 中记录 Gmail 终端设置步骤](https://github.com/nearai/ironclaw/issues/6774)** — 开放28天，仅1条评论。用户 deepak.jangir 要求文档化 Gmail 等 Google 服务的 CLI 设置步骤。这是纯文档改进，建议排入下一个 sprint。

- **[#7516 [OPEN] feat(webui): IronHub agent link 的操作员界面](https://github.com/nearai/ironclaw/pull/7516)** — 开放13天，作者是 new contributor `@neo-sky`。当前操作员只能通过 CLI 获取 IronHub 注册 URL 与共享密钥，无法从 WebUI 完成。PR 规模为大（XL），风险低，涉及 channel/web 与 secrets 两个 scope，建议维护者尽快 review，避免打击新贡献者积极性。

- **[#7456 [OPEN] fix(reborn): 使持久化存储与 profile 无关](https://github.com/nearai/ironclaw/pull/7456)** — 开放15天，高风险（涉及安全信封与租户隔离）。PR 已将 Reborn profile 根目录与具体 profile 解耦，但需要重点审查安全边界问题。由核心成员 `@henrypark133` 提交，长期滞留可能阻塞后续工作。

- **[#7818 [OPEN] feat(subagent): 后台模式 — receipt 生成、子级交付、激活、修复扫描](https://github.com/nearai/ironclaw/pull/7818)** — 开放3天，XL 规模，显式标注了部署门禁（deployment gate）。作为 R2 后台 subagent 的 producer 半部，合入策略需要与 #7788 的 surface 协同，建议持续跟踪。

- **[#7817 [OPEN] ci: nextest 测试管道（T2）](https://github.com/nearai/ironclaw/pull/7817)** — T1 已合入，T2 仍在推进。该 PR 承诺削减 Tests (Reborn) workflow 的墙钟时间，并给出完整的失败信息（所有失败的测试名而非仅失败的 job）。作为 CI 加速四条轨道的第二弹，建议在 T1 观察稳定后尽快合入。

---

*本日报基于 GitHub 公开数据自动生成，数据截至 2026-08-25。所有链接均指向原始 Issue/PR 页面。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-08-25）

## 1. 今日速览

过去24小时内，LobsterAI 项目保持了较为活跃的迭代节奏：共处理 PR 11 条，其中 10 条已合并/关闭，仅剩 1 条依赖更新待合并；Issue 侧有 3 条历史问题被关闭（均为 stale 自动关闭），无新开 Issue。合并的 PR 集中在渲染层交互优化、技能面板细节、文件分享/收藏流程、协作场景上下文菜单、插件安装弹窗体验，以及一项重要的 SQLite 写入性能优化，整体项目健康度良好，能够看出维护团队在持续响应用户反馈并推进前端体验打磨。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 中有多项实质功能推进与体验优化：

- **跨平台缩略图与本地产物生命周期增强**（[#2524](https://github.com/netease-youdao/LobsterAI/pull/2524)）：新增隔离的跨平台缩略图渲染器，支持图片、视频、PDF、Office、HTML 等格式；统一 16:9 缩略图尺寸与缓存策略；仅展示关联有效任务的本地产物，并防止已删除任务的延迟事件重新创建资料关系；同时支持云端资源恢复状态与 Node 网站重新部署提示。这是一次较大的基础设施类合并。
- **文件分享与收藏交互完善**（[#2522](https://github.com/netease-youdao/LobsterAI/pull/2522)）：分享打包时保留 Unicode 文件名、兼容历史版本文件名展示、优化收藏状态即时更新与失败回滚、避免收藏事件触发重复列表刷新，并统一了订阅与发布额度限制弹窗样式。
- **协作消息选择保留**（[#2521](https://github.com/netease-youdao/LobsterAI/pull/2521)）：修复了用户选中助手文本后，右键/上下文菜单打开前选区被清除的问题，同时保持只读文本的选中态。
- **插件安装弹窗可用性修复**（[#2520](https://github.com/netease-youdao/LobsterAI/pull/2520)）：约束插件安装弹窗在视口范围内，使内容、日志与错误详情可独立滚动，长错误信息不再遮挡操作按钮；添加了关闭按钮与 IPC 错误处理增强。
- **SQLite 写入放大消除**（[#1193](https://github.com/netease-youdao/LobsterAI/pull/1193)）：修复了每次单行变更都会触发整个内存数据库 `db.export()` + 全量写盘的性能问题，为后续大规模使用扫清了一个重要隐患。
- 另有多项 UI 细节调整，如技能面板默认 tab 改为 marketplace（[#2527](https://github.com/netease-youdao/LobsterAI/pull/2527)）、credits 加载设置 UI（[#2528](https://github.com/netease-youdao/LobsterAI/pull/2528)）、kits 图标 URL 更新（[#2526](https://github.com/netease-youdao/LobsterAI/pull/2526)）、IM 图标与登录引导更新（[#2525](https://github.com/netease-youdao/LobsterAI/pull/2525)、[#2523](https://github.com/netease-youdao/LobsterAI/pull/2523)）。

整体来看，项目在资源库（Library）体验、协作编辑、技能插件体验与渲染层稳定性上均取得明显推进。

## 4. 社区热点

今日社区讨论热度整体不高，最活跃的 Issue 为：

- **#1187 建议在设置模型api的选项中增加上下文窗口大小设置和输出token设置**（[链接](https://github.com/netease-youdao/LobsterAI/issues/1187)）：3 条评论，1 个 👍。用户反馈在使用 deepseek 模型时遇到上下文溢出错误，反映出不同模型上下文窗口大小差异导致的配置兼容性问题，是较为普遍的真实痛点。
- **#1195 自建skill被安装到OpenClaw的skill目录下**（[链接](https://github.com/netease-youdao/LobsterAI/issues/1195)）：3 条评论，含完整复现步骤与截图。用户对技能安装路径的预期与实现不一致，说明技能安装/发现机制的可见性有待提升。
- **#1192 自定义已有工具的默认配置**（[链接](https://github.com/netease-youdao/LobsterAI/issues/1192)）：2 条评论，用户希望可以为已有工具（如 browser）指定默认配置（如无头模式），反映了对工具行为精细控制的需求。

三项均为用户真实诉求，遗憾的是今日被系统标记为 stale 自动关闭，建议维护者评估其后续价值。

## 5. Bug 与稳定性

今日无新报告 Bug；关闭的 3 条均为 stale 标记的历史问题。已合并 PR 中修复了以下稳定性问题：

- **插件安装弹窗在长错误信息下按钮不可用**（[#2520](https://github.com/netease-youdao/LobsterAI/pull/2520)）：严重程度中等，影响插件安装失败场景下的恢复操作，已修复。
- **助理文本选中状态在右键菜单打开前丢失**（[#2521](https://github.com/netease-youdao/LobsterAI/pull/2521)）：严重程度较低，影响协作场景下复制/编辑操作，已修复。
- **收藏/分享流程中重复刷新与文件名乱码风险**（[#2522](https://github.com/netease-youdao/LobsterAI/pull/2522)）：中等偏低，已修复。
- **SQLite 全量写盘导致的性能放大**（[#1193](https://github.com/netease-youdao/LobsterAI/pull/1193)）：严重程度较高，属性能隐患，已通过 debounce + 批量事务修复。

三条 stale 关闭的 Bug 类 Issue：
- [#1195 技能安装路径错误](https://github.com/netease-youdao/LobsterAI/issues/1195)：功能可见性 bug，用户必现，已 stale 关闭，尚无对应修复 PR。
- [#1187 Deepseek 上下文溢出](https://github.com/netease-youdao/LobsterAI/issues/1187)：配置兼容性问题，已 stale 关闭。
- [#1192 工具默认配置不可覆盖](https://github.com/netease-youdao/LobsterAI/issues/1192)：体验限制，已 stale 关闭。

## 6. 功能请求与路线图信号

今日提交的功能请求类 Issue 有三条，均被 stale 标记关闭，但需求信号值得关注：

- **模型 API 上下文窗口/输出 token 配置**（[#1187](https://github.com/netease-youdao/LobsterAI/issues/1187)）：用户对多模型适配的需求明确，结合项目正在推进多模型支持的背景，此功能未来可能被纳入设置面板。
- **工具级默认配置覆盖**（[#1192](https://github.com/netease-youdao/LobsterAI/issues/1192)）：用户希望绕过模型指令随机性，通过硬编码方式固定工具行为。该需求与当前 PR 中“保留消息选择”等精细化交互优化方向吻合，有一定纳入后续迭代的合理性。
- **技能安装目录向用户透明**（[#1195](https://github.com/netease-youdao/LobsterAI/issues/1195)）：用户期望在 UI 技能面板中直接看到已安装技能。今日合并的 [#2527 默认展示 marketplace tab](https://github.com/netease-youdao/LobsterAI/pull/2527) 可能与体验优化相关，安装路径问题尚未有对应修复。

## 7. 用户反馈摘要

从今日关闭的 Issue 与相关评论中，可以提炼出以下用户声音：

- **上下文溢出困扰实际使用**（[#1187](https://github.com/netease-youdao/LobsterAI/issues/1187)）：用户明确贴出了错误提示原文，说明在使用 deepseek 等长上下文模型时，应用侧上下文窗口设置不匹配，直接影响会话连续性。用户诉求是希望能在设置中手动指定上下文大小，可预期获得更大模型适配灵活度。
- **技能安装路径认知偏差**（[#1195](https://github.com/netease-youdao/LobsterAI/issues/1195)）：用户详细记录了完整复现步骤与环境信息（Windows 10, 2026.3.26 版），并附上截图，展示了从创建 skill → 让 agent 安装 → 提示重启生效 → 重启后技能面板无显示的完整链路。用户预期“面板可见”，实际安装在 OpenClaw 目录，说明技能生命周期对用户不够透明。
- **工具默认配置的强诉求**（[#1192](https://github.com/netease-youdao/LobsterAI/issues/1192)）：用户使用 browser 工具时希望无头模式，但大模型指令跟随不稳定，导致用户转向“写死默认配置”的方案。这反映部分用户对确定性的强烈需求，信任固定配置胜过大模型自由发挥。

整体来看，用户愿意提供详细复现信息与真实使用场景，反馈质量较高。

## 8. 待处理积压

- **#1277 dependabot 依赖更新（electron 40.2.1 → 43.4.1）**（[链接](https://github.com/netease-youdao/LobsterAI/pull/1277)）：已存在近 5 个月（创建于 2026-04-02），今日仍在等待合并。Electron 大版本跨级更新涉及破坏性变更评估，建议维护者尽快安排 review。
- **三条 stale 关闭的用户 Issue**（[#1187](https://github.com/netease-youdao/LobsterAI/issues/1187)、[#1192](https://github.com/netease-youdao/LobsterAI/issues/1192)、[#1195](https://github.com/netease-youdao/LobsterAI/issues/1195)）：均为 2026-04-01 创建后长期未见官方回复而被标记 stale 自动关闭。这三条分别涉及多模型配置兼容性、工具行为确定性、技能安装可见性，具备明确需求信号，建议维护者主动 reopen 并评估可行性。
- **PR #2524 跨平台缩略图**（[链接](https://github.com/netease-youdao/LobsterAI/pull/2524)）已合并，但其描述中提及“服务端联调说明”，若有配套后端改动或文档待跟进，建议在后续版本中追踪落地完整性。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>



</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>



</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 — 2026-08-25

## 1. 今日速览

过去 24 小时项目活跃度较低，共新增 1 个 Issue（#650），无新增 PR、无版本发布。核心事件是用户 @Suraware 提交了面向交互式 REPL（`zeptoclaw agent`）的 UX 加固提案，指出当前 `Ctrl+C`/`Ctrl+D` 导致的静默退出和孤立 `/` 命令处理不友好两方面问题。该 Issue 直接暴露了 CLI 体验中影响会话连续性的设计缺口，目前尚未有对应 PR 或维护者回复，整体项目仍处于需求收集与反馈期，活跃度一般，但 Issue 质量较高，具备讨论价值。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日无 PR 被合并或关闭，因此没有代码层面的实质性推进。唯一与项目演进相关的信号是 #650 的提出，它明确了 REPL 交互中两个待改进的方向，但距离实现仍有距离。项目整体进度在当前 24 小时内保持平稳，未有提交或合并活动。

## 4. 社区热点

**[#650 [OPEN] feat(cli): REPL UX hardening - safe Ctrl+C/Ctrl+D, lone '/' command table](https://github.com/qhkm/zeptoclaw/issues/650)** — 作者: @Suraware | 评论: 0 | 👍: 0

尽管该 Issue 目前还没有评论或反应，但它是今日唯一活跃的话题，且直指命令行工具日常使用中的高频痛点：

- **会话安全问题**：当前实现将任何 `Ctrl+C` / `Ctrl+D` 直接映射为 `Err(Interrupted | Eof) => Goodbye!` 的静默退出逻辑，用户体验上与"误触即销毁会话"无异。
- **命令解析缺口**：单独输入 `/` 会被当作未知命令处理，而作者期望其成为命令表格的入口，背后是对 CLI 可发现性和帮助机制提升的诉求。

该请求兼具 bug 报告和功能建议双重属性，反映了用户对交互式体验的更高期待，值得维护者着重评估。

## 5. Bug 与稳定性

今日无崩溃级或数据损坏级 Bug 报告。唯一涉及稳定性/可用性的问题来自 #650，按严重程度归为 **中低（交互体验缺陷）**：

- **静默退出**：在长会话中误触 `Ctrl+C` 会直接终止整个 REPL 进程，已运行的会话状态无法保留，属于设计层面的意外行为。
- **无帮助引导**：`/` 被当作未知命令处理，未能发挥命令发现的作用。

上述两项目前均**尚未有对应的 Fix PR**，也未见到维护者标注优先级或计划。

## 6. 功能请求与路线图信号

#650 是当前唯一明确的功能请求，核心建议包括：

- 在 REPL 中安全处理 `Ctrl+C` / `Ctrl+D`，避免误操作导致会话意外终结。
- 为单独的 `/` 输入增加命令表格展示（或至少提供命令提示），以增强可发现性和交互引导。

结合项目的 CLI 工具定位，这条请求大概率会被纳入后续迭代的交互优化范围。若维护者认可该方向，预计会出现对应实现 PR；也可作为下一版本 UX 增强项的重要候选。

## 7. 用户反馈摘要

由于 #650 目前尚无任何评论，社区直接反馈有限。但从 Issue 描述中可以提取作者（@Suraware）作为真实用户的痛点：

- **痛点一**：长时间运行交互式会话时，误触退出键造成会话丢失，过程和结果不可恢复。
- **痛点二**：输入孤立 `/` 时无从得知可用命令，需要频繁查阅文档，影响使用效率。
- **使用场景**：以 `zeptoclaw agent` 作为日常交互式工具进行多轮对话或任务执行，希望终端操作更接近成熟 REPL（如 Python/IPython 的容错机制）。

整体用户情绪偏正面建设性，以功能改进建议为主，未见对项目本身的不满或抵触情绪。

## 8. 待处理积压

当前数据中未发现长期未响应或长时间滞留的 Issue/PR。唯一在列的 #650 是新提交 Issue（创建于 2026-08-24），尚未得到维护者回应，尚不足以构成积压问题。建议维护者在下一个工作周期内对该 Issue 做出初步响应（如贴上标签或表达认同），以保持社区互动活跃度。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*