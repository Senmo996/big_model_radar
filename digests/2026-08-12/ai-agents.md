# OpenClaw 生态日报 2026-08-12

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-12 01:00 UTC

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

# OpenClaw 开源项目动态日报 — 2026-08-12

## 一、今日速览

过去24小时，OpenClaw项目保持高水平活跃度：共计500条Issue更新（新开/活跃392条，关闭108条）和500条PR更新（待合并282条，合并/关闭218条）。Issue评论热度集中在可靠性问题（silent reply failures、turn timeouts、message truncation），大量issue被维护自动化打标为`needs-maintainer-review`与`needs-product-decision`，表明核心Bug仍在等待主线维护者介入。PR侧以Web UI、Slack/Telegram通道修复和性能优化为主，但合并/关闭比例（43.6%）与大量标注`waiting on author`的PR并存，提示维护者审查带宽或作者响应可能成为目前流程的主要瓶颈。**值得关注的是，今日无新版本发布。**


## 二、版本发布

**无新版本发布。**
上一次发布为2026.8.1-beta.1，该版本因缺少配套`@openclaw/*`插件导致启动收敛控制器进入不可恢复的启动循环（见#121675），已关闭，但风险提示仍在。


## 三、项目进展

今日关闭/合并的PR数量为218条，主要进展集中在以下几个方面：

1. **状态与存储层收尾**
   - [#122182 - fix(state): recover agent databases left incomplete by v17 upgrade（已关闭）](https://github.com/openclaw/openclaw/pull/122182)：修复早期v17升级残留的不完整agent数据库物理布局。与此前#122176（retire commitments schema）配合，状态存储层的清理已基本完成。
   - [#122095 - improve: remove redundant slow heartbeat admission test（已关闭）](https://github.com/openclaw/openclaw/pull/122095)：删除耗时93-182秒的冗余心跳全栈测试，显著缩短CI时间。

2. **客户端与UI层迭代**
   - [#122243 - fix(ui): keep composer accessory clicks from taking focus（已关闭）](https://github.com/openclaw/openclaw/pull/122243)：修复Control UI编辑器被动附属组件点击抢焦点问题。
   - [#122206 - fix: speed up streamed assistant output（已关闭）](https://github.com/openclaw/openclaw/pull/122206)：修复直接使用OpenAI Responses接口时流式输出延迟问题。
   - [#122183 / #122179 - macOS provisional notification修复（已关闭）](https://github.com/openclaw/openclaw/pull/122183)：统一了权限状态报告与实际通知发送行为。

3. **通道与集成修复**
   - [#122074 - feat(google): add current-turn native video input（已关闭）](https://github.com/openclaw/openclaw/pull/122074)：补齐Google AI Studio Gemini模型的原生视频输入链路。

4. **测试基础设施**：高频PR作者`@steipete`今日合并了4个PR，覆盖macOS通知、v17升级恢复、CLI测试提速、UI焦点修复，是当前最活跃的核心贡献者之一。`@vincentkoc`的#122216完成了browser插件测试隔离。


## 四、社区热点

1. **[#121058 — Silent reply failures still recurring（63条评论，Open）](https://github.com/openclaw/openclaw/issues/121058)**
   最热Issue。#116277被关闭后，静默回复失败的监控cron仍在持续记录新事件（含今日一条）。问题未真正解决便被关闭，已影响用户对项目issue管理流程的信心。

2. **[#7707 — Memory Trust Tagging by Source（37条评论，Open，P2）](https://github.com/openclaw/openclaw/issues/7707)**
   记忆投毒防护话题热度延续。用户提出按来源（用户命令/网页/第三方技能）标记记忆信任等级，属于安全增强型需求，目前缺少维护者回应（`needs-maintainer-review`+`needs-product-decision`）。

3. **[#92201 — Anthropic thinking signature invalid on replay（22条评论，Closed，P1）](https://github.com/openclaw/openclaw/issues/92201)**
   嵌入式runner重放时thinking签名失效的Bug已关闭，但用户关注度高，反映Anthropic流式签名处理的复杂性。

4. **[#119009 — Runaway retry loop烧掉$204（关闭，5条评论但影响大）](https://github.com/openclaw/openclaw/issues/119009)**
   模型调用重试风暴导致的成本失控事件，2次事件累计$204.74。每次重试都重置progress clock导致never detected as stalled。已关闭，属于成本管控的重要警示信号。

5. **PR侧关注：** [#121818 - feat: clone GitHub projects from session picker](https://github.com/openclaw/openclaw/pull/121818)（size: XL，标有`⏳ waiting on author`）和[#121459 - let limited browsers request admin access](https://github.com/openclaw/openclaw/pull/121459)（P1，size: XL）两个跨模块大PR均已进入等待作者状态，用户期待度高。


## 五、Bug 与稳定性

| 严重级别 | Issue | 说明 | Fix PR 状态 |
|---|---|---|---|
| **P0** | [#121675](https://github.com/openclaw/openclaw/issues/121675) | 2026.8.1-beta.1发布时未同步发布@openclaw/*插件，启动收敛守卫致不可恢复的引导循环 | 已关闭 |
| **P1** | [#121058](https://github.com/openclaw/openclaw/issues/121058) | 静默回复失败在关闭#116277后仍复现 | 无 |
| **P1** | [#87744](https://github.com/openclaw/openclaw/issues/87744) | Codex-backed Telegram turn超时，永远不达turn/completed（17条评论，3👍） | 无 |
| **P1** | [#84516](https://github.com/openclaw/openclaw/issues/84516) | Codex长回复在~1000-1100字符处静默截断（stop=null, aborted=false） | 无 |
| **P1** | [#74586](https://github.com/openclaw/openclaw/issues/74586) | AM embedded run中止memory_search工具调用但误判为超时 | 无 |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | 未回收hook/tool子进程导致zombie积累和运行性能下降 | 无 |
| **P1** | [#97983](https://github.com/openclaw/openclaw/issues/97983) | iOS/WebChat消息追加到transcript但不触发assistant回复 | 无 |
| **P1** | [#71689](https://github.com/openclaw/openclaw/issues/71689) | tasks registry因SQLite损坏导致启动恢复失败 | 无 |
| **P1** | [#39476](https://github.com/openclaw/openclaw/issues/39476) | A2A sessions_send双向调用导致重复消息 | 有linked PR |
| **P1** | [#114020](https://github.com/openclaw/openclaw/issues/114020) | 2026.7.2-beta.4后Feishu通道需声明runDispatchLifecycle | 无 |
| **P1** | [#89315](https://github.com/openclaw/openclaw/issues/89315) | gateway堆内存无限增长致cgroup OOM（已关闭但值得关注） | 关闭 |
| **P1** | [#47975](https://github.com/openclaw/openclaw/issues/47975) | 子代理会话完成后主会话无响应 | 无 |

集中趋势：**session-state和message-loss是当前最高频的impact标签**，其次是auth-provider。多个P1问题标有`clawsweeper:needs-live-repro`或`needs-maintainer-review`，说明维护者在验证或分配流程上存在瓶颈。尤其值得警惕的是telegram与codex通道的可靠性问题反复出现，且涉及数据丢失风险。


## 六、功能请求与路线图信号

1. **记忆信任分级（#7707）**：用户对memory-poisoning攻击的担忧上升。结合 `impact:security` 标签，可能被纳入安全加固路线图。
2. **网关级代理成本预算（#42475，20条评论）**：增加每个代理的日/月费用上限，在gateway层阻止超支。在#119009烧掉$204后，成本管控的呼声可能更高。对应已有`session-cost-usage.ts`基础设施，落地成本相对可控。
3. **可配置流式watchdog超时（#68596，15条评论，8👍）**：扩展推理模型（deepseek-r1、kimi-k2.5）触发30s watchdog误报。已有`CLI_RESUME_WATCHDOG_DEFAULTS`，改造成本低，社区关注度高。
4. **provider按失败类型隔离（#47910）**：认证失败的provider不再参与fallback链。与成本控制、稳定性直接相关，属优化现有逻辑。
5. **多Azure/Teams机器人支持（#71058）、多索引embedding记忆（#63990）、per-agent TTS/STT覆盖（#66252）**：均为企业级+生产可靠性方向的增强，领域特征集中，可能进入下一阶段的平台化方向。
6. **MathJax/LaTeX支持（#42840，10👍）**：Control UI渲染数学公式。虽标记为P3且off-meta，但10个👍代表一定的用户基数。
7. **Session快照功能（#13700）**：`/session save|load` 用于上下文checkpoint。与开发工作流相关性高，但尚未有进展。


## 七、用户反馈摘要

高频痛点字眼：**"silently"（静默失败）** 、 **"timeout"（超时）** 、 **"message loss"（消息丢失）** 、 **"duplicate"（重复）** 、 **"unresponsive"（无响应）** 。

1. **静默失败模式持续困扰用户（#121058、#84516、#57256、#58957）** ：多个场景中系统既不报错也不工作（无`aborted`标志但输出被截断、`recovered=1`但transport没恢复、status报告unavailable但实际插件正常工作）。用户在评论中表达的挫败感最强——**问题不在于Bug本身，而在于无法分辨Bug是否发生**。

2. **长上下文/长会话场景下的可靠性滑坡（#74586、#58957、#48575）** ：模型切续接、子代理完成、长回复等场景反复触发误判、截断或无响应，影响深度使用体验。

3. **成本失控的愤怒（#119009）** ：重试循环在两次事件中烧掉超过$200，用户认为系统"从未被检测为停滞，因为每次重试都重置了时钟"。这不仅是可靠性问题，更是**可观测性和成本管控的缺失**。

4. **注意：** 评论区存在一定比例的AI生成/增强评论（例如路径中出现的`openclaw-hooks`等进程名），以及自动化机器人打标签的痕迹，社区讨论真实性需结合具体上下文判断。


## 八、待处理积压

**长期未响应Issue（对维护者预警）：**
- **#7707（Memory Trust Tagging，2026-02-03创建，37条评论）** ：已积压189天，带`needs-security-review`、`needs-product-decision`，超过6个月无实质推进。
- **#14785（Reduce tool schema token overhead，2026-02-12创建）** ：每会话3.5k tokens开销，涉及成本优化，积压181天，8条评论。
- **#42840（MathJax/LaTeX support，2026-03-11创建，10👍）** ：UI基础功能需求，积压154天，无任何官方回应。
- **#16670（Memory/Embedding onboarding mandatory，2026-02-15创建）** ：新用户配置引导，积压178天。
- **#42475（Per-agent cost budgets，2026-03-10创建，20条评论）** ：成本管控核心需求，积压155天，在当前成本相关Issue热度上升的背景下，优先级应被重估。

**待合并的高价值/高风险PR（供审查优先级参考）：**

| PR | 说明 | 风险标签 | 状态 |
|---|---|---|---|
| [#101248](https://github.com/openclaw/openclaw/pull/101248) | subagents完成路由`completionTarget`，面向#27445 | 🚨 message-delivery, security-boundary | 📣 needs proof |
| [#121818](https://github.com/openclaw/openclaw/pull/121818) | 会话选择器支持GitHub项目克隆 | 🚨 compatibility, security-boundary, availability | ⏳ waiting on author |
| [#121459](https://github.com/openclaw/openclaw/pull/121459) | 受限浏览器可请求管理员访问 | 🚨 compatibility, availability | ⏳ waiting on author |
| [#122350](https://github.com/openclaw/openclaw/pull/122350) | 模型目录读取响应性修复（大安装场景CPU耗尽） | 🚨 availability | ⏳ waiting on author |
| [#122346](https://github.com/openclaw/openclaw/pull/122346) | Slack Enterprise Grid按workspace隔离策略 | 🚨 security-boundary | ⏳ waiting on author |

**流程漏洞提示：** [#122029](https://github.com/openclaw/openclaw/issues/122029)指出Telegram分发测试文件（17个文件、~8k LOC）从未在CI任何lane中执行，而#121908在ci-gate全绿时破坏了19个断言。建议维护者检查CI门禁覆盖范围。

**总结：** OpenClaw在客户端扩展与性能优化上非常活跃，但在**核心可靠性和维护者响应速度**层面存在系统性压力。大量长期积压的产品决策请求（`needs-product-decision`）与闭环缓慢的issue管理是当前健康度的主要隐忧。建议优先推进：(1) 静默失败可观测性改进（#121058、#84516）；(2) codex/telegram通道可靠性；(3) 成本管控机制（#42475 + #119009教训）；(4) CI覆盖面修复（#122029）。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向分析报告

**报告日期：2026-08-12**


## 一、生态全景

当前个人 AI 助手/自主智能体开源生态整体处于**从功能扩张转向可靠性优先**的关键转折期。12 个采样项目中 8 个保持活跃，其中 OpenClaw 以 500+/500+ 的 Issue/PR 日更量占据绝对规模优势，但全生态普遍面临**静默失败、消息丢失、维护者响应瓶颈**三大共性挑战。安全加固（shell 逃逸、API 密钥泄漏、恶意 WebP 解码）成为多项目并行重点，成本失控（OpenClaw 重试风暴烧掉 $204）、上下文窗口管理、MCP 协议兼容等议题热度持续攀升。值得注意的是，多项目不约而同出现**架构重构信号**（IronClaw "Reborn" 可插拔化、CoPaw Scroll 上下文统一、Zeroclaw SOP 控制面），暗示生态正从"功能竞赛"步入"质量与架构收敛"阶段。


## 二、各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 核心动态 | 健康度 |
|------|-----------|---------|---------|----------|--------|
| **OpenClaw** | 500 条（新/活跃 392，关闭 108） | 500 条（待合并 282，合并/关闭 218） | 无 | 状态存储层收尾、UI 迭代、通道修复；静默回复失败复现（#121058） | 🟡 中低 |
| **NanoBot** | 6 条（关闭 4，开放 2） | 140 条（合并/关闭 119） | 无 | 3 个安全问题全部响应；WebUI 改版、sandbox 隔离 | 🟢 良好 |
| **Zeroclaw** | 50 条（新/活跃 40） | 50 条（待合并 48） | 无 | SOP 控制面收尾；多个 P1 安全 PR 待审查 | 🟡 中等 |
| **IronClaw** | 23 条（新/活跃 13，关闭 10） | 50 条（待合并 25，合并/关闭 25） | 无 | "Reborn" 架构重构主线；上下文窗口/工具披露 bug 集中修复 | 🟢 中高 |
| **CoPaw** | 23 条（活跃 11） | 49 条（合并/关闭 ~25） | **v2.1.0-beta.3** | 代码块渲染统一、MCP 工具超时；中文 IME/崩溃类 bug 待解 | 🟢 良好 |
| **LobsterAI** | 4 条（关闭 4） | 10 条（合并/关闭 7） | **2026.8.11** | Thinking Levels 配置化落地、Cowork 右键菜单、Esc 关闭遮罩 | 🟢 良好 |
| **PicoClaw** | 2 条（新/活跃 1，关闭 1） | 6 条（全部待合并） | 无 | webhook 配置问题闭环快；命令白名单/路由压缩修复待合并 | 🟡 中上 |
| **NanoClaw** | 1 条（新增 #3226 消息静默丢弃） | 8 条（合并/关闭 3） | 无 | 远程 MCP 支持全线打通；Agent Plugins 1.0.0 候选 | 🟡 中等 |
| **Moltis** | 0 条 | 2 条（全待合并） | 无 | CalDAV 连接器大 PR 待评审；session 修复待合并 | 🟡 中低 |
| **TinyClaw** | 0 | 0 | — | — | ⚪ 无活动 |
| **ZeptoClaw** | 0 | 0 | — | — | ⚪ 无活动 |
| **EasyClaw** | 0 | 0 | — | — | ⚪ 无活动 |

> 注：CoPaw 为 QwenPaw（github.com/agentscope-ai/QwenPaw），命名差异源于数据源标注。


## 三、OpenClaw 在生态中的定位

**规模维度：** OpenClaw 是生态绝对头部，日活 Issue/PR 量（各 500）是第二梯队（50-140）的 4-10 倍。其生态地位类似 Kubernetes 之于容器编排——具备最完整的通道矩阵（Slack/Telegram/Feishu/A2A 等）、最深的插件体系（`@openclaw/*` npm 系列）和最大的社区基数。

**技术路线差异：**

| 维度 | OpenClaw | 同类对比 |
|------|----------|----------|
| 架构哲学 | 单体核心 + 丰富插件生态 | IronClaw 走向"A CP 内核化"、CoPaw 依赖 AgentScope 框架 |
| 状态存储 | 自定义 v17 升级 + agent 数据库 | NanoBot 简单文件/会话隔离；CoPaw 依赖 Scroll 上下文 |
| 集成深度 | 全通道覆盖（含 A2A 双向调用） | Zeroclaw 聚焦 WhatsApp/Telegram；PicoClaw 专攻嵌入式/树莓派 |
| 扩展方式 | `@openclaw/*` 插件 | NanoClaw 走 MCP 工具协议；NanoBot 靠 Python 脚本/App 生态 |

**核心矛盾：** OpenClaw 的优势（功能广度、用户基数）同时是其劣势来源——500 条日更 Issue 中大量标 'needs-maintainer-review'（维护者响应不足），P1 级静默失败跨多个版本复现（#121058），版本发布因未同步插件导致启动循环（#121675）后长期无新版本。相较之下，NanoBot 合并吞吐（85%）和 Zeroclaw 安全响应速度（P1 漏洞当天出 PR）反而优于 OpenClaw，**社区健康度与规模呈负相关**——这是 OpenClaw 当前最大的结构性风险。


## 四、共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|----------|----------|
| **静默失败与可观测性** | OpenClaw（#121058/#84516）、NanoClaw（#3226）、NanoBot（#5327/#5256） | 消息被丢弃/截断时不报错也无提示，用户无法区分"未收到"与"被忽略"；需要显式反馈信号（错误码、状态标注） |
| **成本管控** | OpenClaw（#42475/#119009 烧 $204）、Zeroclaw（#2269/#9713）、PicoClaw（#3317）、IronClaw（#6984） | 每次重试重置 progress clock 导致永不检测为停滞；需要 per-agent 预算上限、按 token 记账、缓存命中可视化 |
| **安全边界加固** | NanoBot（#5306 shell 链逃逸/#4783 API 密钥泄漏）、Zeroclaw（#9883 WebP 解码/#9872 delegate 隔离）、CoPaw（#6916 插件提权） | 命令执行白名单可绕过；API 密钥经 env 泄漏给子进程；插件可静默创建定时任务；多代理工作区隔离失效 |
| **上下文/记忆管理** | OpenClaw（#7707 记忆信任分级）、IronClaw（#7484/#7485 窗口驱逐/token 估算）、PicoClaw（#3301 路由代理压缩失效）、Zeroclaw（#9323 执行预算） | 128 条消息硬上限多处写死；token 估算双端不一致导致上下文减半；路由代理场景自动压缩失效 |
| **MCP 生态兼容** | NanoClaw（#3092/#3221 远程 MCP 全 provider）、CoPaw（#6874 MCP 超时）、NanoBot（#5333 OpenRouter Server Tools）、IronClaw（#7508 GitHub MCP 扩展） | MCP 正成为工具接入标准，但超时配置、缓存失效、provider 差异导致稳定性问题 |
| **协议兼容层** | Zeroclaw（#8603 Chat Completions 兼容）、IronClaw（#7482 ACP 可插拔 agent loop）、NanoClaw（#3220 Agent Plugins） | 对接 Open WebUI/LobeChat/Aider 等主流客户端；将 agent loop 外包给 ACP 协议化实现 |


## 五、差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|------|----------|----------|-------------|
| **OpenClaw** | 全能型助手，全渠道接入 | 技术用户/团队，生产部署 | 单体核心 + npm 插件生态，状态存储复杂（v17 升级） |
| **NanoBot** | 轻量快速迭代，高合并吞吐 | 独立开发者、Python 生态用户 | Python 脚本/App 生态，安全加固快速响应 |
| **Zeroclaw** | 高安全合规，SOP 流程控制 | 企业级、需审计的部署 | Rust 基础 + 严格权限模型（principal grants），RFC 驱动 |
| **IronClaw** | 内核化/协议化，ACP 演进 | 平台构建者、多租户部署 | 正从单体转向"kernel + ACP agent"；NEAR AI 背书 |
| **CoPaw (QwenPaw)** | Agent 协作场景，IM 渠道优化 | 中文用户、QQ 群场景 | 依赖 AgentScope 框架；Scroll 统一上下文；发布节奏快（2 天/版本） |
| **LobsterAI** | 桌面端协同（Cowork） | 桌面重度用户、网易生态 | Electron 桌面应用，多模型独立配置（Thinking Levels） |
| **PicoClaw** | 嵌入式/树莓派场景 | 极客、边缘设备用户 | 资源占用低，支持 DeepSeek 等轻量模型 |
| **NanoClaw** | MCP 先行者，插件化 | 延伸 Claude Code/OpenCode 用户 | 全部 provider 统一支持远程 MCP；Agent Plugins 1.0.0 目录 |
| **Moltis** | 本地数据连接（CalDAV） | 个人数据主权敏感用户 | 本地持久化 + 原子快照 + 可信只读 Agent 工具 |


## 六、社区热度与成熟度分层

**第一梯队（快速迭代期）：OpenClaw、CoPaw、IronClaw**

高日更量（23-500 Issue），功能迭代与架构重构并行。OpenClaw 在质量巩固上存在结构性压力（合并比仅 43.6%）；CoPaw 保持 2 天/版的发布节奏但崩溃类 bug（#6919）和中文 IME（#6885）待解；IronClaw 处于 "Reborn" 重构攻坚期，P1 bug 集中关闭但新架构风险待观察。

**第二梯队（质量巩固期）：NanoBot、Zeroclaw、LobsterAI**

合并吞吐/发布节奏稳定，安全响应快（NanoBot 3 个安全问题全闭环；Zeroclaw P1 漏洞当天有 PR）。NanoBot 以 119/140 的合并量证明流程高效；LobsterAI 有明确的月度发布节奏。主要风险是功能增长放缓、部分需求积压（Zeroclaw 48/50 PR 待合并）。

**第三梯队（蓄力期）：PicoClaw、NanoClaw、Moltis**

日更量较小但方向明确。PicoClaw 社区协作效率高（问题-修复闭环 <24h）但合并吞吐低；NanoClaw 在 MCP 能力上领先且 Agent Plugins 1.0.0 候选将带来架构升级；Moltis 2 条 PR 待合并且 24h 无合并动作，需关注维护者响应。

**休眠梯次：** TinyClaw、ZeptoClaw、EasyClaw（无活动）。


## 七、值得关注的趋势信号

**1. 可靠性 > 功能性成为主流诉求。** "silently"（静默）、"timeout"（超时）、"message loss"（消息丢失）是跨项目最高频词汇。用户最强烈的挫败感不来自 Bug 本身，而来自**无法分辨 Bug 是否发生**。对开发者而言，可观测性设计（显式成功/失败/截断信号）将成为 AI Agent 产品的核心竞争力。

**2. 成本失控倒逼预算治理。** OpenClaw 的 $204 重试风暴事件（#119009）在多个项目中引发连锁讨论：Zeroclaw 的 token 核算、PicoClaw 的缓存 token 可见性、IronClaw 的 Anthropic cache_control 显式断点。**每次重试都重置 progress clock 导致永不检测为停滞**——这一"无限重试陷阱"应成为所有 agent 开发者的设计红线。

**3. MCP 正成为工具接入的事实标准。** NanoClaw 在全部 provider 统一远程 MCP；CoPaw 增加 MCP 超

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-12

## 今日速览

过去24小时内，NanoBot 项目保持了高度的开发活跃度：PR 更新总量达 140 条，其中 **119 条已合并或关闭**，显示出维护团队具备极强的合并吞吐能力和社区高参与度。Issue 方面共更新 6 条，其中 4 条关闭、2 条仍开放。最值得关注的是，此前报告的 **3 个安全相关 Issue（#4783、#4784、#5306）** 已全部获得开发者响应——前两个已关闭（修复完成），最后一个已有对应修复 PR（#5345）。此外，`exec.allowPatterns` 的安全绕过问题与 `/goal` 消息重复 bug 仍为当前最受关注的稳定性隐患，但均有对应修复 PR 在推进。整体上，项目正处于快速迭代、安全加固与生态扩展并行的健康周期中。

## 版本发布

过去 24 小时内无新版本发布。

## 项目进展

今日 119 条 PR 被合并/关闭，涉及功能增强、bug 修复、文档改进及新 provider 接入等方向。尤其值得关注的是，当日有大量较早期（2-3 月）提交的 PR 被最终处理（多为关闭，带 `[conflict]` 标记），表明维护团队正在清理历史积压，专注于当前更高质量的贡献。以下为今日处于开放状态的关键 PR，代表了项目当前的重点推进方向：

- **#5342 — feat(webui): redesign apps discovery**（[链接](https://github.com/HKUDS/nanobot/pull/5342)）：WebUI 应用发现页面重新设计，引入 Discover / Installed / All apps 分类视图，新增精选应用批次（基于 nanobot.wiki 注册表，含缓存离线回退），并优化第三方应用 Logo 加载逻辑。这是 UI/UX 层面的重要迭代，发布于今日。
- **#5344 — fix(agent): warn instead of silently spiraling on repeated identical tool calls**（[链接](https://github.com/HKUDS/nanobot/pull/5344)）：针对 Agent 工具调用循环无检测的问题，当模型反复调用相同工具、相同参数时给出警告而非静默消耗完迭代预算。这将显著提升 Agent 的可观测性和排错体验。
- **#5345 — [Security] `exec.allowPatterns` shell-chain bypass fix**（[链接](https://github.com/HKUDS/nanobot/pull/5345)）：针对安全漏洞 #5306 的修复，修改了 `shell.py` 中 shell 链命令的匹配逻辑，并新增对应测试文件。安全加固是当前最高优先级的任务之一。
- **#5328 — feat(providers): add OrcaRouter as a named gateway provider**（[链接](https://github.com/HKUDS/nanobot/pull/5328)）：新增 OrcaRouter 网关 provider，聚合 150+ 模型（OpenAI、Anthropic、Google、DeepSeek、Qwen、MiniMax、xAI），提供统一端点与零信任安全层。
- **#5283 — feat(workspace): per-session sandbox isolation for non-WebUI channels**（[链接](https://github.com/HKUDS/nanobot/pull/5283)）：为非 WebUI 渠道提供基于会话的文件系统沙箱隔离（`per_session_sandbox` 模式），每个会话获得独立的受限工作目录。

在今日合并的 PR 中，历史积累的大量 provider 支持、Cron 功能增强、Telegram 内联键盘等均在列表中有所体现，覆盖了从核心 agent 循环到渠道适配的广泛层面。

## 社区热点

今日讨论最为集中的 Issue 为：

- **#5327 — [bug] Nanobot repeats multiple times the same message while reasoning**（[链接](https://github.com/HKUDS/nanobot/issues/5327)）— **9 条评论**，已关闭。用户在推理过程中频繁遇到消息重复的问题，评论数量居首。该 issue 的关闭可能与本日 #5344 的修复方向有关（重复工具调用检测）。
- **#5256 — [bug] /goal message produces dozens of repeated replies**（[链接](https://github.com/HKUDS/nanobot/issues/5256)）— 2 条评论，仍开放。与 #5327 问题成因类似，但发生在 `/goal` 场景中。该 issue 已有对应修复 PR #5257（fix(agent): bound sustained-goal continuation when the turn goes idle）。
- **#5306 — [Security] `exec.allowPatterns` shell-chain bypass**（[链接](https://github.com/HKUDS/nanobot/issues/5306)）— 安全漏洞类，1 条评论。已有对应修复 PR（#5345），修复效率较高，社区对安全问题的响应速度较为满意。

这些热点集中在两个主题：**Agent 行为失控（消息重复/循环）** 与 **安全边界（命令执行限制绕过）**。前者反映了用户对 Agent 自主运行可靠性日益增长的需求，后者则说明项目安全模型正在受到社区白帽的持续审视——这是开源项目成熟的重要信号。

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 状态 | 说明 |
|-----------|----------|------|------|
| **严重（安全）** | [#5306](https://github.com/HKUDS/nanobot/issues/5306) | OPEN | `exec.allowPatterns` 可被 shell 链绕过，导致未授权命令执行。已有 PR [#5345](https://github.com/HKUDS/nanobot/pull/5345) 修复 |
| **严重（安全）** | [#4784](https://github.com/HKUDS/nanobot/issues/4784) | CLOSED | Provider API 密钥通过 `os.environ` 全局变量在 provider 间泄漏，已修复 |
| **严重（安全）** | [#4783](https://github.com/HKUDS/nanobot/issues/4783) | CLOSED | CLI 子进程继承完整 `os.environ`，API 密钥暴露给可执行程序，已修复 |
| **中等（功能）** | [#5327](https://github.com/HKUDS/nanobot/issues/5327) | CLOSED | 推理过程中消息重复回复，已关闭（修复可能已合并） |
| **中等（功能）** | [#5256](https://github.com/HKUDS/nanobot/issues/5256) | OPEN | `/goal` 消息导致数十条重复回复，PR [#5257](https://github.com/HKUDS/nanobot/pull/5257) 已提交修复 |

安全修复完成 + 新安全漏洞 P0 响应及时，项目安全防线处于良性循环。功能性 bug 均有对应修复 PR 在列，项目整体稳定性预期向好。

## 功能请求与路线图信号

- **#5333 — [openrouter] support Server Tools**（[链接](https://github.com/HKUDS/nanobot/issues/5333)，已关闭）：用户请求支持 OpenRouter 的 Server Tools（Web Search、Web Fetch、Fusion 等），提及更早的 commit 已包含部分相关逻辑，该请求表明社区对 LLM 生态工具（特别是 Web 搜索类）有持续需求。相关方向可能在后续版本中继续完善。
- **#5328 — OrcaRouter 作为命名网关 provider**（[链接](https://github.com/HKUDS/nanobot/pull/5328)）：模型路由网关的集成不断增多，说明 NanoBot 正在朝"多云多模型聚合入口"方向发展。
- **#5342 — WebUI 应用发现页面重新设计**（[链接](https://github.com/HKUDS/nanobot/pull/5342)）：App/MCP 生态发现体验提升，配合 nanobot.wiki 注册表，显示项目正在构建更成熟的插件生态。

以上功能方向（Server Tools、新 provider、WebUI 生态）预计将在后续版本中持续深化，并可能吸引更多用户通过 MCP/App 生态扩展 NanoBot 能力边界。

## 用户反馈摘要

- **Positive（来自 #5333 用户）**："First of all, thank you for creating such an amazing project. I really appreciate it."——用户对项目整体持高度正面评价，且在提出新功能需求时态度积极。
- **Agent 重复输出（#5327）**：用户反馈"Nanobot repeats the same message several times while reasoning"，现象是**随机出现**，与推理过程和"Good points, let me investigate the issue"等过渡用语关联。结合 #5256，Agent 在等待用户输入时期重复发送消息的问题令用户困扰，说明**对话循环控制**是当前影响用户体验的核心瓶颈之一。
- **安全关注（#4783/#4784）**：用户 hamba1y 连续提交两个安全相关 Issue，指出 API 密钥在子进程和 provider 间的泄漏风险。该用户对安全边界有较深理解，也反映出**社区对密钥管理的第三方集成安全**存在担忧。
- **Windows 兼容性（#5341）**：有 PR 专门修复 Windows PowerShell 下 `curl` 别名问题，说明有用户在 Windows 环境使用技能工作流。

整体而言，用户满意度较高（尤其是功能丰富度），但 Agent 行为可预测性和安全性是当前主要痛点。

## 待处理积压

以下重要 PR/Issue 已开放较长时间且未见合并或更新，需维护者予以关注：

- **#4291 — feat(spawn): allow subagents to use configurable model presets**（[链接](https://github.com/HKUDS/nanobot/pull/4291)）：已开放约 2 个月（6/11 创建），系增强型功能（子代理可使用独立模型预设），无冲突标记但至今未合入，评论区暂无维护者响应。
- **#4145 — fix: resolve #3958 — Weather Skill**（[链接](https://github.com/HKUDS/nanobot/pull/4145)）：已开放约 2 个月（6/1 创建），为 Weather 技能修复及多文件贡献。虽在 daily 数据中显示为更新，但截至当前仍处于未合并状态（且带 `[conflict]` 标记），需维护者进行冲突消解。
- **#5283 — per-session sandbox isolation**（[链接](https://github.com/HKUDS/nanobot/pull/5283)）：该 PR 已开放 5 天且带 `[conflict]` 标记，涉及安全增强，建议优先处理。
- 同时，**大量早期（2-3 月）的 PR 在本日被标记为 `[conflict]` 后关闭**，虽清理了积压，但其中部分功能型 PR（如 #1383 贡献指南、#1321 Tavily 搜索、#1199 fallback 模型）可能仍有价值，建议在关闭时同步说明具体原因，避免贡献者产生挫败感。
- 值得注意的是，`[conflict]` 标签 PR 的清理说明维护者在集中回应积压 PR，但这也意味着部分功能可能被推迟到后续版本中重新实现或由其他路径替代。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-08-12

## 今日速览

ZeroClaw 项目当前处于**高强度 RFC 讨论与安全加固并行的活跃阶段**。过去 24 小时内共有 50 条 Issue 更新（40 条活跃/新开）和 50 条 PR 更新（48 条待合并），社区讨论热度集中在 **SOP 授权模型、Goalmode（目标模式）、Chat Completions API 兼容层**等架构级议题上。此外，安全领域持续成为重点：多条 P1 级安全漏洞（WebP 解码、delegate 工作区解析、HTTP 出口加固）正在被密集修复。尽管暂无新版本发布，但多项大型 PR（SOP 控制面、插件配置验证、日志 Token 核算）处于待审查和合并流程中，预示着 v0.9.0 将带来显著的能力与安全升级。

⚠️ **需要关注的一个信号**：48/50 条待合并 PR 中绝大多数长期挂着 `needs-author-action` 标签，多条 PR 已停滞 1-3 周，维护者审查带宽存在瓶颈。48 条 PR 待合并是当前项目健康度的主要风险，这与活跃的 RFC 讨论形成鲜明对比。

**活跃度评级：🔥 高（讨论密集、安全修复积极、但合并等待周期偏长）**


## 项目进展

过去 24 小时内**没有显示 PR 被合并或关闭**，但从最近动态可以看出以下重要工作已接近到位：

- **SOP 控制面集成**（#9841，XL 级）：修复了 SOP headless 运行问题及评审中发现的 5 个缺陷，是 #9494 的延续，还解决了 SOP 从 CLI 运行时工作区解析错误的问题。若合并，SOP 控制面将向 5/5 完成度迈进一大步。
- **WhatsApp Web 批准流**（#9385，L 级）：为 WhatsApp Web 传输实现 `request_approval`，使 `always_ask` 工具可以在对话框中由人工决策而非默认拒绝。
- **插件配置验证**（#9126，XL 级）：要求 `config_read` 清单声明 Draft 2020-12 `config_schema` 并校验，显著提升插件系统的安全性。

> 📌 说明：合并/关闭的 PR 在选择的数据集中未列出明细，以上为基于当前活跃 PR 状态的推断。


## 社区热点

### 1. RFC: Goal mode v1 — bounded foreground Matrix work (#8303)
**19 条评论 | 👍 1 | 更新于 08-11**

这是当前最受关注的架构提案，明确了首个迭代的目标边界（不包含重启交接、广播频道准入、Web 和异步子任务），体现了社区对复杂架构演进"小步快跑"的认可。背后的诉求是：用户需要 ZeroClaw 具备跨多轮 Agent Turn 执行持久化目标的能力，这是迈向真正自主 Agent 的关键一步。

### 2. RFC: ZeroClaw Chat Completions profile (#8603)
**18 条评论 | 创建于 07-02，更新于 08-11**

呼声极高的兼容层提案——让 ZeroClaw 暴露 OpenAI Chat Completions 协议，以便接入 Open WebUI、LobeChat、Continue.dev、Aider 等主流 LLM 客户端。讨论热度持续不减说明社区对"融入更广泛 AI 生态"有强烈期待，这也是 Agent 平台能否破圈的关键。

### 3. RFC: Shell 高危险命令确认层级 + Claude Code 风格命令策略 (#7155)
**17 条评论 | 更新于 08-11，Rev 3**

安全领域的核心讨论之一：借鉴 Claude Code 的 allow/ask/deny 命令模式，为高风险 Shell 命令增加确认层级。社区诉求明确——在**安全性与操作效率之间建立可配置的平衡**，这一议题若落地将直接影响日常使用体验。

### 4. RFC: 可插拔入站认证和规范主体 (#7141)
**14 条评论 | Rev 8 | 状态: in-progress**

关于身份和访问（OIDC、可插拔 provider）的持续修订。这关系到 ZeroClaw 在多用户、企业级场景下的部署能力。

### 5. [已关闭] RFI: Token 消耗与成本管理 (#2269)
**13 条评论 | 2 月 28 日创建，8 月 11 日关闭**

社区对产品化 Agent 工作负载中 token 成本控制的广泛输入已收敛（目前已关闭）。关闭引发了一个问题：结论是否已被采纳、将如何在设计中体现？建议维护者公布 RFI 的总结。


## Bug 与稳定性

### 🔴 P1 高危

| Issue | 问题描述 | Fix PR |
|---|---|---|
| #9883 | **Inbound WebP 转换在共享图像校验器前无界解码**，恶意 WebP 附件可触发拒绝服务。Split from #9819，`webp_to_png` 调用 `image:` 解码无大小限制 | **无 fix PR**（刚报告） |
| #9872 | **有界 delegate 目标将文件系统解析到委托者的工作区**——`researcher` 代理的 file_write/file_edit/shell 写入的是 `executive_assistant` 的工作区，隔离失效 | **无直接 fix PR**（#9841 修复了相关 headless SOP 问题） |
| #9768（已关闭） | daemon reload 不在 SIGUSR1 上，降级安全警告却引导操作者发送会杀死 daemon 的信号 | **已关闭**（应已修复） |

### 🟠 P2 中危

| Issue | 问题描述 | Fix PR |
|---|---|---|
| #9035（已关闭） | Docker Compose 网关在端口发布后仍可能环回绑定，导致端口无法访问 | **已关闭**（应已修复） |

### 安全加固相关 PR（均已提交，待审查）：

- **#9862**（P1，L 级）：http_request 响应体流式读取 + 禁止 fal.ai 自动重定向，防止响应体被完全缓冲
- **#9781**（P1，M 级）：WebAuthn 断言数据校验——检查 37 字节固定头、绑定 `rpIdHash`、强制 User Present 标志（此前 WebAuthn 断言数据几乎不受校验）
- **#9580**（P1，L 级）：加固内置 HTTP 出口，将网络分类原语移入 `zeroclaw-infra::net_guard`，拒绝所有非全局 IPv4/IPv6 地址


## 功能请求与路线图信号

以下议题表明 v0.9.0 的构成正在变得更加清晰（结合已接受的 RFC 和进行中的 PR）：

- **SOP 能力权限契约**（#9598，Rev 2）：`required_permissions` 接入共享 principal grants 和运行时安全决策防线，不重复造轮子——理论上已被接受，将落地到 v0.9.0
- **SOP 面板状态可见性**（#9682 tracker + #9694 PR）：zerocode TUI 中展示 SOP 列表和运行状态图标（仅状态可见，无控制按钮）——已接近完成
- **Log Token 核算**（#9713，XL 级 PR）：历史裁剪事件暴露 token 计量，解决资金来源模糊的问题（此前仅显示结构化计数，让大段裁剪看起来像正常消耗，见 #9619）
- **PowerShell 原生支持**（#9182，XL 级 PR）：在 Windows 上以 `-NoProfile -NonInteractive -Command` 路由 powershell/pwsh，保留旧版 cmd.exe /C 路径——Windows 用户体验的关键增强
- **系统提示 Token 优化**（#9561，XS 级 PR）：从渲染的人格提示中移除 `### FILENAME.md` 标签——省 Token、更干净
- **执行树迭代预算所有权**（#9323）：`ToolLoop.shared_budget` 在生产路径上为 None，无实际约束——这是防止无限循环 Fan-out 风险的关键机制

### 更深层的治理信号：

**#9496（已接受，P1）**——"精简 RFC 流程"被标为 accepted，说明维护团队已意识到当前 **7天讨论期 + 全体一致同意 + 手工计票** 的流程正在阻碍决策速度。这从侧面解释了为什么 #8692（保留 13 条评论的决策队列跟踪器）持续增长，而 #8692 正是为了让 RFC 不被卡在维护者队列中。


## 用户反馈摘要

从各 Issue 的评论内容中可以提炼出以下真实用户声音：

**❌ 痛点与不满：**

- **工作区隔离失效**（#9872）：用户报告 `executive_assistant` 代理到 `researcher` 时，"Researcher" 的文件写入落在 "Executive Assistant" 的工作区——这不仅是 Bug，更让用户对多代理场景的信任度受损
- **Docker 部署端口不通**（#9035）：用户报告 `docker compose up -d` 后端口仍不可达，响应 "Connection refused"。影响面广且启动流程即失败，属于 S1 work-blocking
- **配置保存后不生效**（#7897）：用户反馈保存安全策略和通道配置后，长运行的子系统仍使用旧状态，必须 `/admin/reload` 才能生效——配置变更生效链路太长
- **内存连接器依赖失效**（#9644）：用户发现 ZeroClaw 连接 `JasonDocton/lucid-memory`（项目已休眠）——集成后上游 4 天就停止维护，影响技术选型信任度

**💡 明确需求（决策信号）：**

- **Chat Completions 兼容**（#8603）：明确指向 "我要用 Open WebUI / LobeChat / Aider 连接 ZeroClaw" —— 这是 Agent 平台对接主流 LLM 工具链的关键需求
- **token 成本管控**（#2269）：产品化部署中，通过单一高端模型的 Agent 运行成本让用户难以承受——需要分级/熔断/预算控制
- **SIGUSR1 信号处理错误**（#9768）：用户测试后反馈 daemon reload 不在文档所述的 SIGUSR1 上，且降级警告引导了错误的信号——影响运维可操作性和系统信任度


## 待处理积压 ⚠️

以下重要议题长期停滞或持续无法推动，提醒维护者关注：

### 长期未关闭 / 未响应的关键议题

- **#8718 / #5907（4月19日创建，P2，needs-author-action）**：Opt-in LSP 支持 ZeroCode 编码工作流——LSP 是减少幻觉、提升本地模型代码质量的关键能力，已有 Claude Code / OpenCode 的先例。自 4 月提出，仍在等待作者操作
- **#6653（5月14日创建，P3，needs-author-action）**：为模拟安装定义宿主架构策略——窄场景但影响真实部署的兼容性
- **#7929（P2，needs-author-action）**：合并 Web UI / zerocode TUI / 通道运行时三处 slash 命令注册表——命令漂移问题持续存在

### ⏳ PR 积压

**48/50 条 PR 处于待合并状态**，其中多条标有 `needs-maintainer-review`。以下 PR 等待时间较长，可能影响对应功能发布节奏：

- #9126（7-18 创建，XL 级，插件配置验证）
- #9182（7-20 创建，XL 级，Windows PowerShell 支持）
- #9385（7-26 创建，WhatsApp Web 批准流）
- #9580（7-31 创建，HTTP 出口安全加固）
- #9841（8-08 创建，XL 级，SOP 缺陷修复——状态保持需维护者关注）

### 📌 特别提醒

- **#9883（WebP 解码漏洞）** 尚无修复 PR，P1 高危且影响所有处理图像附件的通道（WhatsApp、Telegram、Signal 等），建议优先排期
- **#9872（delegate 工作区隔离失效）** 尚无直接 fix PR，需确认 #9841 是否覆盖，或需要独立修复方案
- **维护者审查队列** 可以直接跟踪 tracker #8692 获取实时状态


## 项目健康度总结

| 维度 | 状态 | 说明 |
|---|---|---|
| 社区活跃度 | 🟢 高 | 50 条 Issue 更新 + 50 条 PR 更新，热点 RFC 均保持 10+ 评论 |
| 合并效率 | 🟡 中下 | 48/50 PR 待合并，大量 `needs-author-action`，存在卡顿风险 |
| 安全响应 | 🟢 高 | 多条 P1 安全 PR 已提交，响应速度快 |
| 版本节奏 | 🟡 观察期 | v0.9.0 目标明确，但依赖上述积压 PR 的合并进度 |
| 依赖健康 | 🟡 中 | Lucid 连接器废弃中（#9644），无明显外部阻塞 |

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-12

## 今日速览

PicoClaw 过去24小时保持温和活跃：新增/活跃 Issue 2 条、关闭 1 条；PR 更新 6 条但全部仍处于待合并状态，无新版本发布。整体来看，项目处于稳定的日常维护节奏，社区贡献者持续提交修复。较值得关注的是，`webhook_host` 配置项"存在但无人消费"的问题在一天内完成了"报告 → 提交 PR"的快速响应闭环，体现了项目良好的社区协作效率。但需注意，目前已有多个 `stale` 标记的 PR 等待维护者合并，合并吞吐量偏低。**健康度：中上，活跃度中等，维护响应及时，合并节奏需关注。**

---

## 版本发布

过去24小时内无新版本发布。当前最新版本为 v0.3.1（commit `2cf030d`）。多份 Issue 和 PR 均基于该版本报告，建议维护者在近期考虑发布 v0.3.2，以包含目前积压的多个已就绪修复。

---

## 项目进展

过去24小时无 PR 被合并或关闭，以下是 6 个待合并 PR 所涵盖的功能改进方向：

- **路由代理上下文管理修复**（[#3316](https://github.com/sipeed/picoclaw/pull/3316)）：修复 dispatch rules 路由到非默认 agent 时历史记录不被保留、自动压缩不触发的问题，直接回应用户报告的 #3301。
- **Telegram 私聊话题支持**（[#3315](https://github.com/sipeed/picoclaw/pull/3315)）：修复私有 bot 聊天中 `IsTopicMessage` 话题模式无法识别的问题。
- **Prompt 缓存 token 日志**（[#3317](https://github.com/sipeed/picoclaw/pull/3317)）：在 LLM 响应调试日志中增加 cache token 输出，对 DeepSeek 等通过网关报告的缓存元数据做透传。
- **Shell 命令允许列表修复**（[#3314](https://github.com/sipeed/picoclaw/pull/3314)）：修复 `customAllowPatterns` 不生效的问题——默认拒绝模式始终优先于自定义允许模式，导致合法命令（如 `git push`）被拦截。
- **原生 Exa 搜索提供商**（[#3299](https://github.com/sipeed/picoclaw/pull/3299)）：新增 `tools.web` 下的 Exa 原生集成，支持 `d/w/m/y` 时间范围过滤。
- **LINE webhook 配置告警**（[#3329](https://github.com/sipeed/picoclaw/pull/3329)）：修复 #3328，`webhook_host` / `webhook_port` 之前无消费方，改为启动时输出警告，避免用户误以为配置已生效。

---

## 社区热点

**Issue #3301（路由代理会话压缩失效）** 是今日讨论最集中的话题，收获 3 条评论，且关联的修复 PR #3316 已经提交。该问题直接影响使用 dispatch rules 将对话路由到指定 agent/channel 的用户——上下文管理、自动压缩和 seahorse bootstrap 全部失效，意味着长时间对话的 token 消耗不受控，对于真实生产场景有实际影响，社区反馈积极，修复方案已在评审中。链接：[#3301](https://github.com/sipeed/picoclaw/issues/3301)

---

## Bug 与稳定性

按严重程度排序：

1. **[严重] 路由代理的会话历史与压缩失效**（[#3301](https://github.com/sipeed/picoclaw/issues/3301)，开启中）：当对话经由 dispatch rules 路由到非默认 agent 时，历史记录不被记忆，自动压缩不触发，导致 token 消耗不可控。已有修复 PR [#3316](https://github.com/sipeed/picoclaw/pull/3316) 待合并。
2. **[中等] `customAllowPatterns` 允许列表失效**（[PR #3314](https://github.com/sipeed/picoclaw/pull/3314)）：默认拒绝模式优先级高于自定义允许模式，导致用户显式放行的命令（`git push`）无法执行。修复已提交。
3. **[较低] LINE webhook 配置无效**（[#3328](https://github.com/sipeed/picoclaw/issues/3328)，开启中）：`webhook_host` / `webhook_port` 有默认值有文档但代码中无消费方，属"文档与实现不一致"类问题。同一天内已有 PR [#3329](https://github.com/sipeed/picoclaw/pull/3329) 提交修复方案。
4. **[已关闭] `/list models` 显示不全**（[#3294](https://github.com/sipeed/picoclaw/issues/3294)）：`/list models` 只显示当前模型而非全部配置模型。该 Issue 已关闭（疑似因 stale 自动关闭），但问题本身从反馈内容看并未解决，建议维护者核实关闭原因。

---

## 功能请求与路线图信号

- **Exa 原生搜索提供商**（[#3299](https://github.com/sipeed/picoclaw/pull/3299)）：新增独立于现有搜索提供商的 Exa 集成，信号明确的产品能力扩展，可覆盖更多 web search 用户需求。该 PR 从 7 月 26 日起已置 stale，建议维护者尽快排期评审。
- **Provider 缓存 token 可观测性**（[#3317](https://github.com/sipeed/picoclaw/pull/3317)）：对 DeepSeek 等模型的 cache token 做日志输出，虽然是小改进，但反映了用户对成本可视化（特别是缓存命中带来的成本优化）的潜在需求。
- **Telegram 话题模型支持扩展**（[#3315](https://github.com/sipeed/picoclaw/pull/3315)）：将话题支持从论坛 supergroup 扩展到私有 bot 聊天，是 Telegram 渠道功能完整性的重要补充。

---

## 用户反馈摘要

- **真实痛点**：用户 @j-v 同时提交了问题（#3301）和修复方案（#3316、#3314），说明其在实际部署中遇到"路由代理不记忆会话"和"安全允许列表失效"两个问题，其中 `git push` 被拦截在真实 agent 工作流中会显著影响可用性。使用场景为 Discord/Telegram 渠道 + Raspberry Pi 部署 + DeepSeek 模型。
- **配置信任问题**：用户 @qing-wang 报告的 LINE webhook 配置无效，属于"给了默认值、给了文档、但代码不读"的隐性失效，对用户信任有较大影响。值得点赞的是项目当天即提交修复 PR。
- **命令行为与命名预期不符**：`/list models` 命令名称为"Configured models"，用户 @2suige-coder 据此预期列出全部已配置模型，实际仅显示当前模型，功能与命名语义存在偏差。

---

## 待处理积压

- **PR #3299（Exa 搜索提供商）**：自 7 月 26 日创建至今已超过两周，已标记 stale，功能完整且包含配置与文档，建议优先评审。链接：[#3299](https://github.com/sipeed/picoclaw/pull/3299)
- **PR #3314（命令允许列表修复）**：涉及安全边界场景的 bug 修复，建议尽早合并以解除用户侧命令执行的阻塞。链接：[#3314](https://github.com/sipeed/picoclaw/pull/3314)
- **PR #3315 / #3316 / #3317**：均标记为 stale，等待维护者评审。其中 #3316 与 Issue #3301 是一对，功能影响面较大，建议与 #3314 一同优先处理。
- **Issue #3294（已关闭，疑似未解决）**：确认该 Issue 是因 stale 自动关闭还是维护者手动关闭，若问题仍然存在建议重新打开并分配修复。链接：[#3294](https://github.com/sipeed/picoclaw/issues/3294)

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-12

> 数据来源: github.com/nanocoai/nanoclaw | 统计周期: 2026-08-11 ~ 2026-08-12


## 1. 今日速览

项目在过去24小时保持中高活跃度，核心贡献者围绕 **远程 MCP 服务器支持**这一主线持续发力，多条相关 PR 形成完整的功能推进链条。当前共有 8 条 PR 处于活跃状态，其中 3 条已合并/关闭，5 条待合并；值得关注的是，合入的 3 条 PR 中 2 条为远程 MCP 支持的功能链环节，显示该项目正处于集成扩张期。与此同时，新上报的 Issue #3226 直指消息可靠性问题——平台复用消息 ID 时入站消息被静默丢弃，虽仅 1 条新 Issue，但涉及用户可感知的消息丢失风险，提出者来自社区而非核心团队，需引发重视。无新版本发布，项目整体处于"功能累积、版本待发"阶段。


## 3. 项目进展

**今日合并/关闭 PR（3 条），全部为核心功能推进：**

- **远程 Streamable HTTP MCP 服务器支持（引擎 + Claude Provider）** — PR #3092（已关闭，未合并）
  由核心团队成员 @amit-shafnir 提交，为引擎和 Claude provider 添加了对远程 Streamable HTTP MCP 服务器的支持（`mcpServers` 中的 `{ type: 'http', url }` 条目）。该 PR 虽未直接合并，但其功能已在后续 PR #3221 中落地，构成了完整的能力闭环。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3092)

- **codex 和 opencode Provider 的远程 MCP 支持补齐 — PR #3221（已合并）**
  @amit-shafnir 在 PR #3092 的基础上，为 codex 和 opencode 两个 provider 补齐了远程 Streamable HTTP MCP 服务器的支持。此前这两个 provider 仍假设仅接受 stdio 类型的 `McpServerConfig`，HTTP 条目会导致配置写入时抛错。该 PR 消除了这一限制，使 MCP 支持在所有 provider 间保持一致性。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3221)

- **新增 Tavily MCP 工具技能 — PR #3190（已合并）**
  社区贡献者 @manisrinivasan2k1 提交的 Tavily 搜索工具技能，作为一个 standalone utility skill 加入（代码位于 `.claude/skills/`），无需修改核心源码。该合入丰富了项目可用的工具生态。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3190)

**整体评价：** 今日合并内容虽少但密度高，均围绕 MCP 扩展展开。结合 #3220（Agent 模板重塑为 Agent Plugins）和 #3195（事务性更新）等活跃 PR，项目正在为下一版本积攒功能筹码。


## 4. 社区热点

今日社区讨论最集中的是 Issue **#3226**："当平台在同一会话中复用消息 ID 时，入站消息被静默丢弃"。

[Issue 链接](https://github.com/nanocoai/nanoclaw/issues/3226)

**热度分析：**
- 唯一的活跃 Issue，创建后 24 小时内即有 1 条评论，说明社区对消息可靠性问题较为敏感。
- 提交者 @dweekly 并非核心团队成员，属于用户侧反馈，代表真实使用场景中的痛点。

**核心诉求：**
该问题描述了这样一个场景：如果某个聊天平台在同一个会话中复用了之前用过的消息 ID，新消息会被 NanoClaw 静默丢弃——既不会到达 agent，也没有任何可见的提示。从用户视角来看，这完全等同于"agent 无视了我"。

**深层影响分析：**
- 该问题触及消息去重机制的设计边界——当前去重逻辑可能以 `messageId` 为唯一键，但未考虑跨消息的 ID 复用场景。
- 比功能缺失更严重的在于"静默"二字：用户无法区分"agent 没收到"和"agent 收到了但不想理我"，这会直接侵蚀用户对 agent 的信任感。
- 评论区虽仅 1 条，但该问题的讨论价值很高——它指向了一个可能是所有平台集成都存在的通用缺陷。


## 5. Bug 与稳定性

**🔴 高优先级 — 消息静默丢弃（新增）**

- **Issue #3226**（OPEN）：平台复用消息 ID 时入站消息被静默丢弃，用户无法感知消息丢失，与"agent 无视"无法区分。目前 **尚无对应 fix PR**，建议维护团队尽快确认去重实现并给出修复方案。
  [查看 Issue](https://github.com/nanocoai/nanoclaw/issues/3226)

**🟡 中优先级 — 更新过程非事务性（待合并）**

- **PR #3195**（OPEN，核心团队）：NanoClaw 升级当前非事务性，中途失败可能导致部分更新状态。已有修复方案待合并。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3195)

**🟢 待观察 — 相关基础设施修复**

- **PR #3145**（OPEN）：数据库迁移 021，为现有 messaging-group wirings 补充缺失的 channel destinations，保留已有 destination 和自定义名称。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3145)

- **PR #2134**（OPEN，已积压 3 个月+）：为 Apple Silicon + Colima 环境在 launchd plist 中补充所需的环境变量。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/2134)


## 6. 功能请求与路线图信号

**MCP 支持正在成为全项目的能力基座。** 结合今日动态与历史 PR，可以清晰看到以下演进路径：

该能力推进由核心团队成员持续驱动（#3092 → #3221），当前核心引擎和全部三家 provider（Claude、codex、opencode）均已完成远程 Streamable HTTP MCP 服务器支持，MCP 生态能力覆盖面趋于完整。

| 功能方向 | 相关 PR | 状态 | 信号强度 |
|---------|---------|------|---------|
| 远程 Streamable HTTP MCP（引擎+Claude） | #3092 | 已关闭 | 已落地 |
| 远程 MCP（codex+opencode） | #3221 | 已合并 | 已落地 |
| Agent 模板 → Agent Plugins 1.0.0 目录 | #3220 | 待合并 | 强 — 核心团队标记 breaking change |
| Setup 向导中的模板流程与首个 agent 印章 | #2909 | 待合并 | 强 — 与 #3220 配套 |
| 升级流程事务化 | #3195 | 待合并 | 中 — 稳定性改进 |

**下一版本候选功能：** #3220 + #2909 构成了 Agent Plugins 1.0.0 的完整功能对（模板加载已在 #2890 落地 + 向导流程）。两者均由核心团队成员提交且相互依赖，合并后可能触发一次 minor 或 major 版本跳升（#3220 含 breaking changes）。叠加今日已合并的 MCP 扩展，下一版本的核心主题大概率是 **"插件化架构 + 多 Provider MCP 支持"**。


## 7. 用户反馈摘要

- **消息可达性=信任底线（Issue #3226）：** 用户明确指出静默丢弃消息的行为让用户无法区分"消息丢失"和"agent 忽略用户"。此反馈揭示了一个产品设计层面的深层问题：对于 AI agent 类应用，消息处理管道中的任何操作（包括丢弃和去重）都应提供用户可见的反馈信号。这种"可见性缺口"从用户视角看比功能缺陷本身更容易引发不满。
- **配置迁移顾虑（PR #3145）：** 从迁移设计保留已有 destination 和自定义名称来看，用户对配置迁移的数据保留有明确期待。这侧面说明项目已有一定规模的自定义配置用户群体，且这些配置对用户有较高价值。


## 8. 待处理积压

- **PR #2134**（OPEN，创建于 2026-04-29，积压 **105 天**）：Apple Silicon + Colima 环境变量补充，长期未获维护者响应。该 PR 直接影响 macOS 用户群体的本地开发体验，建议维护者尽快安排 review 或明确搁置原因。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/2134)

- **PR #3145**（OPEN，创建于 2026-07-28，积压 15 天）：数据库迁移填补 destinations 缺失，对于已有存量数据的用户存在潜在修复价值，建议尽快合入或给出时间表。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3145)

- **PR #3195**（OPEN，创建于 2026-08-06，等待 6 天）：升级事务性修复，影响所有用户的升级体验安全。建议在下一版本发布前优先处理。
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3195)


> **分析师注：** 今日项目健康度整体良好——核心团队持续稳健地推进架构级功能（MCP、插件化），社区贡献者也保持着稳定的输入节奏。需要重点关注的是：Issue #3226 暴露的消息去重设计缺陷，以及 #2134 这座积压日久的"老 PR"。前者关乎用户信任，后者考验维护者对社区贡献的响应意愿。建议维护团队尽快确认去重修复方案，并对 #2134 给出明确处理意见。

---
*本报告基于 GitHub 公开数据自动分析生成，仅供参考。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-12

## 今日速览

IronClaw 过去 24 小时活跃度处于高位：**23 条 Issue 更新（13 新开/活跃、10 已关闭）、50 条 PR 更新（25 待合并、25 已合并/关闭）**，无新版本发布。值得关注的是，今日更新中出现了 **“Reborn 架构可插拔化”的核心 theme**——一条 risk: high 的 Epic（#7482）主张将 agent loop 与 per-integration tool 代码从内核剥离，转向 ACP 协议化，且大量今日提交的 bug fix 围绕 loop 上下文窗口、token 估算与工具披露协议的语义缺陷展开，说明内核正在经历系统性改造。整体项目处于 `v1.3.0` 功能密集集成的攻坚阶段，PR 合并节奏正常（25 合/闭），可持续关注后续 Release 计划。

---

## 项目进展

今日无新版本发布，以下为近期合并/关闭的重点工作，代表项目投入的方向。

### 核心架构与稳定性（已合并/关闭）

- **[已合并] PR #7456** — [fix(reborn): make durable storage profile-agnostic](https://github.com/nearai/ironclaw/pull/7456)：将 Reborn 持久化存储从 profile 依赖中解耦，统一目录为 `state/`、`workspaces/` 等 profile-agnostic 命名空间，并持久化类型化的安全封套，防止重启切换 profile 导致租户/工作区隔离弱化。对应 Epic #7467。
- **[已合并] PR #7477** — [feat(channels): unified channel model](https://github.com/nearai/ironclaw/pull/7477)：实现 `docs/internal/design/2026-08-10-unified-channel-model.md` 全部 12 条 + §13 强制约束，Web/Slack/Telegram 统一为一个 `ChannelAdapter` 处理 inbound、回复与通知。
- **[已关闭] PR #7471** — [fix(processes): lease expiry recovers safe runs instead of failing them](https://github.com/nearai/ironclaw/pull/7471)：进程日志心跳池与数据面 PostgreSQL 流量隔离；超出 lease 的 run 在 replay-safe checkpoint 上恢复而非直接失败。
- **[已合并] PR #7470** — [fix(threads): restore listability for unprojected thread index rows](https://github.com/nearai/ironclaw/pull/7470)：修复 thread_index 行无 ordered-projection 元数据时从 `list_threads` 侧边栏消失的 bug。
- **[已合并] PR #7514** — [fix: enable Railway shell for hosted volume profile](https://github.com/nearai/ironclaw/pull/7514)：为生产 Railway host 开放 sandbox shell。
- **[已合并] PR #7511** — 标记 [Ignore] 的占位 PR，无实际变更。

### LLM 与上下文管理（已合并/关闭）

- **[已关闭] PR #6997** — [feat(llm): explicit Anthropic cache_control breakpoints on both transports](https://github.com/nearai/ironclaw/pull/6997)：关闭 #6984（P0 #1），在 rig adapter 与 OAuth 传输上均显式打 `cache_control` 断点，替代单纯依赖 Anthropic 自动缓存，针对 token 成本与延迟优化。
- **[已关闭] PR #7503** — [fix(loop): retain accepted task across context eviction](https://github.com/nearai/ironclaw/pull/7503)：在 128-message 截断与 token 预算裁剪时钉住任务消息，超出预算时fail 为 `BudgetExceeded` 而非静默丢弃。

### 待合并（风向标）

- **#7513** (feat(cli): ACP serve command with streaming + cancel) — ACP 协议化落地的第一步，与 Epic #7482 方向一致。
- **#7509** (fix(safety): redact model-bound secrets without rejecting turns) — 敏感信息由拒绝改为确定性脱敏。
- **#7504** (fix(loop): compact context on window eviction) — 有界窗口驱逐改造为类型化强制压缩信号。
- **#7512** (fix(memory): resolve target aliases in domain contract layer) — 修复 #7505。
- **#7515** (feat(slack): bind remaining eight core standard messaging ops)。
- **#7464** (feat(telegram): linked-device) — MTProto 真设备绑定。
- **#7498** (feat: automation suggestion cards V1 backend) — 对应 #7038。
- **#7516** (feat(webui): operator surface for IronHub agent link)。
- **#7365** (feat(memory): always-on MEMORY.md prompt lane)。

---

## 社区热点

### 最热门 Issue：#7482 — Epic: Pluggable agent loops（3 条评论，0 👍）

[#7482 — Epic: Pluggable agent loops — ACP executor, edge credential injection, kernel architecture](https://github.com/nearai/ironclaw/issues/7482)（@serrrfirat，2026-08-11）

> IronClaw becomes the **kernel** — scheduling, tenancy, capability membrane, secrets mediation, egress boundary, durable audit, inbound channels — and stops owning the two things that don't scale: the agent loop and per-integration tool code. Loops become **off-the-shelf ACP agents**.

这是今日最重量级的架构讨论。作者主张铁爪收敛为纯 kernel（调度、租户、能力膜、secrets mediation、出口边界、审计、入站通道），将 agent loop 与工具实现外包给 ACP agent。背后诉求是：**不在内核中维护每个集成的工具代码，将循环逻辑推向可插拔的 ACP 生态**。这解释了近期一连串 loop 相关 bug（#7484/7485/7486/7490）都带 `reborn` 标签——内核正处于重构期，健康度信号需持续观察。

### 热点 PR：#7516 — IronHub agent link 的 WebUI 操作面（新 PR，评论 0）

[#7516 — feat(webui): operator surface for the IronHub agent link](https://github.com/nearai/ironclaw/pull/7516)（@neo-sky，2026-08-12，新增）

部署者无法仅通过 WebUI 完成 Edge Agent 与 IronHub 的绑定（此前只有 CLI 能取注册 URL 和共享 key）。该 PR 在 Extensions 页面新增操作面板，披露注册 URL（用于粘贴到 IronHub）并展示已安装的 hub 共享 key 状态，补齐部署链路。

### 热点 bug 系列（QA 复现组）

- **#7508** (OPEN) — [GitHub MCP extension startup gives confusing endpoint verification prompt instead of connecting](https://github.com/nearai/ironclaw/issues/7508)（@joe-rlo，Railway 实例）

  > "already registered and installed" 但随后又要求做 endpoint verification，提示不透明。

  侧面看，QA 侧在 Railway 上验证 IronClaw 时，扩展安装状态与认证状态容易脱节。

---

## Bug 与稳定性

按严重程度与功能影响排列（**修复状态标注**）。

### 高风险（P0/P1，影响核心用户体验）

| Issue | 标题 | 优先级/标签 | 严重度 | 修复 PR |
|---|---|---|---|---|
| [#6879](https://github.com/nearai/ironclaw/issues/6879) | Automation runs 执行不稳定（触发时直接以交互式聊天节奏执行，小模型表现差） | p1, epic, v1.3.0 | **隧道级**：同一 prompt 有时成功有时无输出。 | 暂无（已列入 v1.3.0 目标） |
| [#7485](https://github.com/nearai/ironclaw/issues/7485) | token 估算器双端不一致，transcript 端 `bytes/2` 将 ASCII 按 2 chars/token 计算——有效上下文窗口减半 | [bug, scope: agent, reborn] | **高**：直接压制模型可用上下文，影响长任务。 | 待确认 |
| [#7484](https://github.com/nearai/ironclaw/issues/7484) | 上下文窗口静默驱逐任务——128 条消息硬上限在三个位置独立写死，任务消息可能被驱逐 | [bug, scope: agent, reborn] | **高**：任务丢失。 | PR #7503 已合并，但仅解决“accepted task”的钉住与超预算 fail，128 上限本身是否保留待确认 |
| [#7486](https://github.com/nearai/ironclaw/issues/7486) | 类型化 no-progress escape 对幂等读/轮询误判（输出按 `(signature, output)` 哈希判定 `NoChange`） | [bug, scope: agent, reborn] | **中高**：长期运行的合法工作流被误杀。 | 暂无 |
| [#7489](https://github.com/nearai/ironclaw/issues/7489) | `result_read` 24 KiB 预览上限 + 2000 行文件不可编辑墙 | [enhancement, scope: tool/builtin, reborn] | **中**：两个叠加的往返膨胀因素。 | 评论中指向 #7435 OMP cutover 解决 |

### 功能性 Bug（已关闭，确认修复）

- **[已关闭]** [#7488](https://github.com/nearai/ironclaw/issues/7488) — 三个披露桥接工具硬编码 `Exclusive`（tool_disclosure.rs:836,849），`tool_search`/`tool_describe` 被串行化。→ 已通过相应 fix 关闭。
- **[已关闭]** [#7487](https://github.com/nearai/ironclaw/issues/7487) — `tool_search` 返回匹配时未返回 schema，“describe-first”安全网被解除；oneOf required 折叠为空。→ 已修复。
- **[已关闭]** [#7294](https://github.com/nearai/ironclaw/issues/7294) — Agent 错误地记住了另一个 scope/thread 的 Telegram 例行任务（“you already have this set up！”）。
- **[已关闭]** [#7247](https://github.com/nearai/ironclaw/issues/7247) — Agent 谎称 GitHub 已连接（未验证鉴权状态）。
- **[已关闭]** [#7246](https://github.com/nearai/ironclaw/issues/7246) — Agent 对自动化状态编造信息（页面上无 automation，却声称发送中）。
- **[已关闭]** [#7483](https://github.com/nearai/ironclaw/issues/7483) — 内置 NEAR AI provider 对话框留空 API key 时，test-connection 与 list-models 均失败（未走已认证的 runtime session）。
- **[已关闭]** [#6984](https://github.com/nearai/ironclaw/issues/6984) — 显式 Anthropic cache_control 接入 OAuth transport（由 PR #6997 关闭）。
- **[已关闭]** [#7317](https://github.com/nearai/ironclaw/issues/7317) — 文档与发布不同步（见下文“用户反馈”）。
- **[已关闭]** [#7405](https://github.com/nearai/ironclaw/issues/7405) — deferred tool discovery 改进。

### 新报告、暂无修复

- **[OPEN] #7505** — [Memory target-alias resolution is contract-level but only native resolves it](https://github.com/nearai/ironclaw/issues/7505)：`write.md` prompt 被 mem0 复用，但写入的别名（如 `target: memory`）语义只被 native 解析，mem0 存储时未展开。→ **PR #7512 已提交**，待合并。
- **[OPEN] #7508** — GitHub MCP 扩展启动验证提示混乱。
- **[OPEN] #7490** — `retry_disposition()` infra 重试分发表是死代码。
- **[OPEN] #7476** — `classify_delivery_outcome` 对 `Failed` 忽略 `vendor_message_refs`，模型看不到 partial-send 证据（同类 gap 的 [#7475](https://github.com/nearai/ironclaw/issues/7475) 已修 notices 路径）。

---

## 功能请求与路线图信号

- **[Epic, v1.3.0] #7038** — [Storybook + AI-first Design System（theming, assets, interactions, IA）](https://github.com/nearai/ironclaw/issues/7038)（@rdisandro，2026-08-03）：WebUI 设计系统打包。已有 #7498（automation suggestion cards）作为 V1 后端先行落地，设计系统本体仍在推进。
- **[Epic, risk: high] #7482** — [Pluggable agent loops via ACP](https://github.com/nearai/ironclaw/issues/7482)：IronClaw 内核化，agent loop 与工具代码外置为 ACP agent。这是下一大版本最关键的去重/可扩展性投资。PR #7513（CLI `--acp --stdio`）已作为先锋提交，后续大概率有更多 ACP 化组件。
- **[Epic] #7467** — [Reborn durable state profile-agnostic + legacy profile migration](https://github.com/nearai/ironclaw/issues/7467)：PR #7456 已为其奠基。下一部是迁移旧 profile root 的兼容层。
- **[Feature] #7496** — [host-mediated IdentyClaw Passport（builtin.idcp + practitioner helper）](https://github.com/nearai/ironclaw/issues/7496)：无 stock 路径让 agent 安全使用 IdentyClaw Passport（私钥/JWT 需 host 侧

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-12

## 1. 今日速览

过去 24 小时项目保持高活跃度：**1 个新版本发布（2026.8.11）、10 条 PR 更新（7 条已合并/关闭）、4 条 Issue 更新**。核心开发集中于 Cowork 协同体验优化（本地文件右键菜单、Escape 键关闭遮罩、侧边栏定时任务标识）以及模型思考等级（Thinking Levels）的配置化落地——服务器端驱动选项已合入主分支，前端模型选择器正在修复各模型独立记忆的问题。此外，4 条长期未响应的 stale Issues 被批量清理关闭，维持了仓库的整洁度。整体来看，项目处于功能迭代密集期，主线清晰、发布节奏稳定。

- **独特性信号**：新的 `2026.8.11` Release 同时包含功能新增（可配置思考等级、任务会话标识）与可靠性改进，且由 `fisherdaddy` 主导的 UI 细节修复（Escape 关闭、图标对齐）显示项目对交互品质有持续打磨。
- **活跃度评估**：🥈 中高 — 开发活跃，但 Issue 侧活跃度较低（新增用户反馈很少），当前是「推进多于收集」的阶段。


## 2. 版本发布 — LobsterAI 2026.8.11

- **发布日期**：2026-08-11
- **核心新增**：
  - `feat(cowork)`: 新增 `collapse-agent-tasks` 快捷键，并支持在打字时使用修饰键快捷键
  - `feat(cowork)`: 侧边栏中标记定时任务（scheduled task）会话，区分自动任务与人工会话
  - `feat(models)`: 引入可配置的模型思考等级（Thinking Levels）——服务器端驱动选项与默认值，支持 `max` 产品级映射至运行时 `xhigh`
  - `feat(cowork)`: 本地文件链接支持右键上下文菜单（打开方式/另存为/复制路径/复制内容/在文件夹中显示）
- **修复与改进**：
  - UI：Escape 键关闭最上层遮罩弹窗（含 IME 合成处理）
  - 稳定性：启动/运行时可靠性提升（来自 `release/2026.8.10` 分支的合并）
  - 设置：增强未保存修改的退出确认机制（来自 PR #1241 的闭合）
- **破坏性变更**：无明确破坏性变更声明；`agents.thinking_level`/`cowork_sessions.thinking_level` 字段引入新的持久化行为，但对旧配置应向后兼容。
- **迁移注意**：现有本地文件链接的 `reveal-in-folder` 内联行为被右键菜单替代；若有自动化脚本依赖该内联交互，需适配。建议在 Release Notes 中补充数据迁移说明（如 `cowork_sessions` 新增列）。

🔗 [查看 Release 详情](https://github.com/netease-youdao/LobsterAI/releases)


## 3. 项目进展

今日共 **7 条 PR 被合并/关闭**，跨越 3 个功能域：

**A. 模型思考等级（Thinking Levels）配置化 —— 核心推进**
- `#2457 feat(models): add configurable thinking levels`（已合并）为本次发布的主体功能：服务器端驱动选项、OpenClaw alias 映射、持久化 per-session/per-agent 选择。这是从「全局固定」到「每个模型独立可调」的重要架构升级。
- `#2475 fix(model-selector): give each model its own thinking level`（当前打开）是紧随其后的修复 —— 解决前一版本中两个模型思考深度互斥的 bug。

**B. Cowork 流程与交互打磨**
- `#2473 feat(cowork): add right-click context menu for local file links`（已合并）将本地文件操作从单一「在文件夹中显示」增强为完整右键菜单（打开/另存为/复制路径/复制内容/复制图片），并新增 `dialog:saveFileCopy` IPC 通道。
- `#2476 feat(ui): dismiss the topmost overlay on Escape`（已合并）修复多模态弹窗嵌套时 Esc 行为错乱的问题——通过 layer id 注册机制，只让最上层响应。
- `#2474 fix(sidebar): align sites icon stroke weight`（已合并）视觉细节对齐。

**C. 分支整合**
- `#2477 Release/2026.8.10 → main` 合并，包含启动可靠性、定时任务识别、本地文件工作流等累积更新。

🔗 相关链接：[#2457](https://github.com/netease-youdao/LobsterAI/pull/2457) | [#2475](https://github.com/netease-youdao/LobsterAI/pull/2475) | [#2473](https://github.com/netease-youdao/LobsterAI/pull/2473) | [#2476](https://github.com/netease-youdao/LobsterAI/pull/2476) | [#2477](https://github.com/netease-youdao/LobsterAI/pull/2477) | [#2474](https://github.com/netease-youdao/LobsterAI/pull/2474)


## 4. 社区热点

过去 24 小时无超高热度讨论（评论最多的 Issue 仅 2 条），但以下条目体现了用户的核心痛点：

1. **「现有大模型受限后无法切换到其他大模型」**（#1240，2 条评论）— 核心诉求：**故障隔离**。用户因 API 配额耗尽，希望能在其他模型上继续工作，而非整个 LobsterAI 瘫痪。该 Issue 已在今日关闭（stale），但背后的**「单点故障隔离」**需求仍未在产品层面解决。
2. **「一直循环跳出遮罩启动网关」**（#1183，1 条评论，仍开放）— 涉及 Windows 上模型开关保存后触发网关启动死循环，是**影响正常使用的稳定 Bug**，创建于 4 月，至今仍开放。
3. **「Settings 关闭无确认，API Key 静默丢失」**（#1237，2 条评论）— 配置丢失属于**数据安全级痛点**，已有对应 PR #1241 修复，但该 Issue 已 stale 关闭。**提示：确认修复已进入 Release。**

🔗 相关链接：[/issues/1240](https://github.com/netease-youdao/LobsterAI/issues/1240) | [/issues/1183](https://github.com/netease-youdao/LobsterAI/issues/1183) | [/issues/1237](https://github.com/netease-youdao/LobsterAI/issues/1237)


## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
| --- | --- | --- | --- |
| 🟠 高 | [#1237](https://github.com/netease-youdao/LobsterAI/issues/1237) | Settings 未保存关闭导致 API Key 等配置**静默丢失** | **已有对应 fix PR #1241**（已合并），但该 Issue 已 stale 关闭 — 建议验证修复有效性 |
| 🟠 高 | [#1183](https://github.com/netease-youdao/LobsterAI/issues/1183) | Windows 上关闭模型开关保存后，**循环跳出「启动网关」遮罩**，无法正常使用 | 🔴 仍开放，未发现关联 fix PR — **强烈建议优先排查** |
| 🟡 中 | [#1240](https://github.com/netease-youdao/LobsterAI/issues/1240) | 单模型 API 受限导致**全局任务中断**，且切换其他模型同样受限 | 已关闭（stale），但问题可能在当前版本仍存在 — 属于架构层面的故障隔离缺失 |
| 🟡 中 | [#2062](https://github.com/netease-youdao/LobsterAI/issues/2062) | 任务超过最大时长自动停止，用户不清楚任务是终止还是后台运行 | 已关闭（stale），当前版本可能已调整超时逻辑 |

🐛 **当前最需要关注的 Bug**：`#1183` 为 Windows 平台下的网关循环启动问题，创建 4 个月未修复且无分配 PR，应尽快排查。


## 6. 功能请求与路线图信号

今日合并的 PR 对应了过往用户请求的落地：

| 功能需求信号 | 对应 PR | 状态 |
| --- | --- | --- |
| **「任务完成时提醒我」（窗口不在前台）** — 来自 PR #1239（已合并） | `feat(main): AI 任务完成时闪烁任务栏/Dock 图标` | ✅ 已落地 |
| **「配置不要静默丢失」** — 来自 Issue #1237 | PR #1241 `Settings 关闭确认机制` | ✅ 已合并，待验证 |
| **「每个模型有自己的设置」** — 本地复现（见 PR #2475） | 观察思考等级互斥 → 触发 per-model 修复 | ✅ 已修复（#2475） |
| **「隐藏内部会话」** — 来自 PR #1181（仍打开） | `隐藏 OpenClaw 主 agent 会话不在会话列表展示` | ⏳ 待合并，属于体验优化 |

**路线图研判**：项目正沿「**多模型独立配置 → 会话管理精细化 → 交互细节打磨**」的方向推进。建议社区用户关注 `#2475` 的合入时机（修复了思考等级互斥，影响所有多模型用户）。

🔗 相关链接：[/pull/1239](https://github.com/netease-youdao/LobsterAI/pull/1239) | [/pull/1241](https://github.com/netease-youdao/LobsterAI/pull/1241) | [/pull/2475](https://github.com/netease-youdao/LobsterAI/pull/2475) | [/pull/1181](https://github.com/netease-youdao/LobsterAI/pull/1181)


## 7. 用户反馈摘要

- **真实痛点**：
  - **「我烧光了某个模型的 API 配额，结果整个 LobsterAI 都瘫痪了，其他模型也切不过去。」**（#1240）— 反映当前**故障域过大**，用户期望单模型故障不影响整体可用性。
  - **「改了 API Key 忘了点保存，关掉就全没了，也没提示。」**（#1237）— 这是典型的使用习惯陷阱，如今已有确认弹窗修复（#1241），值得在更新日志中周知。
  - **「不知道任务是停了还是在后台跑，超时提示太模糊。」**（#2062）— 用户对长时任务状态可见性不足。
- **使用场景**：用户（`@zolufly-web`）在 QQ 对话框安排任务 → 多任务窗并发使用不同模型（Gemini 3 Flash / Gemini 3.1 Pro Preview）→ 遇到 API 限流时希望无缝切换，但失败了。此场景说明**多模型冗余切换**是重度用户的核心工作流，当前实现未满足。
- **满意点**：无明确正面反馈，但 PR #2476（Esc 关闭遮罩）与 #2474（图标对齐）表明开发者主动处理 UI 反馈类细节，这类更新通常被社区以低票面的方式默默认可。


## 8. 待处理积压

以下项目长期未响应/未合并，建议维护者关注：

| 类别 | 项目 | 时长 | 建议动作 |
| --- | --- | --- | --- |
| **开放 Bug（高优先级）** | [#1183](https://github.com/netease-youdao/LobsterAI/issues/1183) 循环跳出启动网关遮罩（Windows） | **4+ 个月** | 分配负责人排查，关联 #1181 的部分实现可能与此相关 |
| **开放 PR（功能就绪）** | [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) 隐藏 OpenClaw 主 agent 会话 — 功能已实现但未合并 | **4+ 个月** | 若功能为正向体验优化，建议评估合入下个版本 |
| **依赖更新** | [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) 批量升级 Electron 40 → 43（含 electron-builder） | **4+ 个月** | 升级跨度较大（跨 3 个主版本），建议单独版本验证后合入 |
| **已 stale 但未验证** | [#1241](https://github.com/netease-youdao/LobsterAI/pull/1241) Settings 确认机制 — 需确认是否已包含在 2026.8.11 发布中 | — | 需在 Release Notes 中标记并验证 |

---

📌 **分析师点评**：项目正以「功能推进 + UI 打磨」双轨前进，模型思考等级配置是近期最大的架构变化，值得关注用户在新版本下的反馈。唯一需要警惕的是 **#1183 的长期未修复** 与 **#1240 暴露的故障隔离设计缺失**，两者都会在重度使用场景下削弱用户信任感。整体健康度良好，发布节奏稳定。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目日报 — 2026-08-12

> 数据窗口：2026-08-11 至 2026-08-12 | 数据源：[github.com/moltis-org/moltis](https://github.com/moltis-org/moltis)

---

## 1. 今日速览

过去24小时内，Moltis 项目**Issues 活跃度为零**（无新开、无关闭、无评论），但 **2 条 PR 处于待合并状态**，其中 #1190 为一项规模较大的本地 CalDAV 连接器功能 PR，另一条为沿用两周的 session 管理修复。整体而言，项目今日处于**"功能蓄力、合并停滞"**的平静期，社区讨论活跃度偏低，但两条待合并 PR 均指向实质性功能增强。建议维护者重点关注 #1190 的审查与推进，避免功能集持续堆叠形成合并压力。

---

## 2. 版本发布

**今日无新版本发布。** 省略。

---

## 3. 项目进展

今日 **无 PR 被合并或关闭**，因此没有功能被正式合入主线。但两条待合并 PR 值得关注：

- **[#1190](https://github.com/moltis-org/moltis/pull/1190) — Add durable local CalDAV connectors**（创建于 8/11，更新于 8/11，作者 @penso）：这是一条**功能型大 PR**，涵盖本地 CalDAV 连接器的持久化基础设施、原子快照、调度、投影以及受限本地全文搜索，并新增了 Settings 中的连接器账户/数据集管理界面。同时引入了一个受信任的只读 `connectors` Agent 工具供本地数据集访问。若合并，将显著增强 Moltis 在本地数据集成与个人数据管理方面的能力。
- **[#1182](https://github.com/moltis-org/moltis/pull/1182) — fix(sessions): allow deleting and archiving the main session**（创建于 8/1，更新于 8/11，作者 @shixi-li）：修复 #1132 中 `main` 会话无法删除/归档的问题，移除 `delete_impl` 和 `is_archivable_entry` 中的 `main` 守卫。

> **一句话总结**：项目在本地数据连接器方向上将迈出重要一步，但**合并节奏偏慢**，两条 PR 均需尽快安排审查。

---

## 4. 社区热点

今日**没有高讨论度或高评论量的 Issue/PR**（公开评论区活跃度为零）。唯一值得关注的是 **[PR #1190](https://github.com/moltis-org/moltis/pull/1190)** —— 虽然尚未产生讨论热度，但其功能范围（CalDAV 连接器持久化 + 本地全文搜索 + 新的 Agent 工具）覆盖面广，可能引发后续使用场景与安全边界的讨论。其背后诉求反映了**个人 AI 助手对本地数据（日历、联系人等）持久化访问的强烈需求**。

---

## 5. Bug 与稳定性

**今日无新增 Bug 报告。**

唯一与稳定性相关的事项是处于待合并状态的 **[PR #1182](https://github.com/moltis-org/moltis/pull/1182)**，它修复的问题 #1132（`main` 会话无法删除/归档）影响日常会话管理体验，属于**低严重度**缺陷，已有对应修复 PR，等待合并。

---

## 6. 功能请求与路线图信号

今日无新 Issue 形式的显式功能请求，但可以从两条 PR 推断以下路线图信号：

| 信号来源 | 功能方向 | 推测纳入版本 |
|---------|---------|------------|
| [#1190](https://github.com/moltis-org/moltis/pull/1190) | Durable local CalDAV connectors（本地持久化连接器 + 原子快照 + 本地全文搜索 + `connectors` Agent 工具） | 极可能进入下一里程碑，属**基础能力层增强** |
| [#1190](https://github.com/moltis-org/moltis/pull/1190) 附带部分 | Settings > Connectors 管理界面（账户/数据集/权限） | 同上，UI 层配合落地 |

此外，#1190 中提到的"prompt-compiled dataset plans"与"trusted read-only connector tool"暗示项目在 **Agent 工具安全边界**方面的思考，可能与后续的权限模型演进相关。

---

## 7. 用户反馈摘要

今日公开评论区无新用户反馈。基于现有 PR 内容可做有限推断：

**潜在用户痛点（来自 #1182 对应的 issue #1132）**：用户无法删除/归档 `main` 会话，导致会话列表无法清理，影响日常使用体验。该痛点的存在说明**结构化会话管理**（可删除、可归档、可批量清理）对社区用户而言是基础诉求。

> ⚠️ 由于今日 Issue 活动为零，本节内容有限。建议结合更长时间窗口（近 7 天）的 Issue 讨论做综合反馈分析。

---

## 8. 待处理积压

以下 PR 已等待较长时间或状态停滞，需维护者关注：

- **[#1182](https://github.com/moltis-org/moltis/pull/1182) — fix(sessions): allow deleting and archiving the main session**
  - 创建于 **8/1**，已 **11 天**未合并，8/11 有更新
  - 阻塞问题 #1132 的关闭
  - 修复逻辑简单（移除两处 `main` 守卫），风险低，建议尽快安排 review 与合并

- **[#1190](https://github.com/moltis-org/moltis/pull/1190) — Add durable local CalDAV connectors**
  - 创建于 8/11，功能范围较大
  - 若无明显阻塞问题，建议尽早开始设计评审，避免后续分支冲突

> 💡 **观察建议**：两条 PR 都处于 OPEN 状态超过一天，当前合并速度偏慢（24h 内无合并动作）。建议关注是否有人手瓶颈或 CI 阻塞问题，可在维护者通讯渠道中确认。

---

## 附：项目健康度快速扫描（8 项指标）

| 指标 | 状态 | 说明 |
|------|------|------|
| Issue 活跃度 | 🟢 正常 | 无新增，社区讨论平静 |
| PR 合并效率 | 🟡 偏慢 | 两条 PR 待合并，24h 无合并 |
| 版本发布节奏 | ⚪ 无发布 | — |
| Bug 修复推进 | 🟡 有修复待合并 | #1182 待合并 |
| 新功能产出 | 🟢 积极 | #1190 功能覆盖面较大 |
| 沟通透明性 | ⚪ 待观察 | 无公开评论数据可评估 |
| 待处理积压 | 🟡 低风险 | 1 条 PR 等待 11 天 |
| 项目整体活跃度 | 🟡 中等偏低 | 24h 仅 2 条 PR 更新 |

---

*数据窗口为 2026-08-11 至 08-12 的 GitHub 活动；部分 PR 的评论数显示为 `undefined`，不排除有评论但未被 API 返回，建议人工复核。日报由 AI 分析师自动生成，仅供项目健康度参考。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-12


**一句话总结：** 过去24小时社区活跃度极高（23条Issue/49条PR），QwenPaw v2.1.0-beta.3正式发布，基于Scroll的上下文重构PR复审中，前端体验优化持续合并。


## 1. 今日速览

CoPaw 项目在 2026-08-12 显示出强劲的社区活跃度与开发节奏。过去24小时内有 **23 条 Issue 更新**与 **49 条 PR 更新**，其中各约半数处于活跃/待合并状态，说明社区反馈与核心开发并行推进。**v2.1.0-beta.3** 已正式发布，包含文件工作区博客功能与 capability 缓存修复，同时多项针对桌面端体验、LaTeX 渲染、MCP 工具稳定性的 PR 处于合并流程中。整体来看，项目正处于 Beta 冲刺期，社区反馈渠道通畅，但 **MCP 工具稳定性**与 **中文输入法**相关问题仍是用户关注焦点，需团队优先跟进。


## 2. 版本发布

**v2.1.0-beta.3** 已正式发布（链接：[Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.0-beta.3)）

**更新内容：**
- **新增 `files workspace blog` 功能**（PR [#6783](https://github.com/agentscope-ai/QwenPaw/pull/6783)）
- **修复 capability 缓存问题**：过期缓存条目现在会正确清理，并在模型切换时清空（PR [#6723](https://github.com/agentscope-ai/QwenPaw/pull/6723)）
- 常规版本号更新

**迁移注意事项：** Beta 版本，暂无破坏性变更说明。建议用户关注 `stale capability cache` 修复是否改善 MCP 工具定期失效的问题（见 Issue #6732）。


## 3. 项目进展

今日合并/关闭的重要 PR 展示了项目在前端体验与后端修复两端的持续优化：

**已合并（CLOSED）：**
- **代码块渲染统一**（[#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911)）：统一渲染代码块，LaTeX 和 Mermaid 块增加本地化 Preview/Source 标签，响应明暗主题
- **文件预览修复**（[#6915](https://github.com/agentscope-ai/QwenPaw/pull/6915)）：修复 Unicode PDF 文件名和 SVG 文件预览失败问题，下载响应改用 RFC 5987 编码
- **渠道冲突检测**（[#6909](https://github.com/agentscope-ai/QwenPaw/pull/6909)）：在保存渠道配置前增加 bot 重复使用提示
- **原生输入优化**（[#6891](https://github.com/agentscope-ai/QwenPaw/pull/6891)）：macOS/Windows 原生输入可靠性改进
- **v2.1.0 发布说明**（[#6875](https://github.com/agentscope-ai/QwenPaw/pull/6875)）：中英文发布文档同步

**关键待合并/审查中（OPEN）：**
- **Scroll 上下文集成**（[#6779](https://github.com/agentscope-ai/QwenPaw/pull/6779)）：将 Scroll 收敛为唯一上下文实现，与 AgentScope 生命周期对齐——重大架构调整
- **统一市场页**（[#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880)）：合并 apps/plugins/skills 市场至统一 `/market` 页面
- **MCP 工具超时**（[#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)）：为 MCP 工具调用添加可配置超时（默认120秒）

**整体判断：** 项目正从功能添加逐步转向体验打磨与架构收敛，多组件统一（上下文、市场）是当前主线。


## 4. 社区热点

**MCP 工具失效问题（Issue #6732）**
链接：[#6732](https://github.com/agentscope-ai/QwenPaw/issues/6732) | 10条评论

**描述：** 用户报告 MCP 工具每隔数小时失效，需重启 docker 容器恢复。已关闭（有对应修复）。

**诉求分析：** 这是影响面较广的稳定性问题，涉及 capability 缓存的正确失效。v2.1.0-beta.3 中的缓存修复（PR #6723）正是针对此问题，今日已关闭。

**LaTeX 公式渲染（Issue #6893）**
链接：[#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893) | 7条评论

**描述：** 用户反馈对话框中 LaTeX 公式无法渲染，认为 QwenPaw 应该具备此能力。

**诉求分析：** 该需求在多个 issue 中出现（#5453、#4756、#6893），是社区长期高频诉求。PR #6911 已经统一了代码块渲染能力，为 LaTeX 预览提供了基础，预计后续版本支持。

**插件安全漏洞（Issue #6916）**
链接：[#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916) | 1条评论

**描述：** 报告插件可静默创建定时任务并注入用户可见消息，无任何审批。被标记为安全权限模型缺口。

**诉求分析：** 安全类 issue 通常具有最高的优先级，需要维护者尽快确认并补上权限校验。


## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue | 描述 | 状态 |
|-------|-------|------|------|
| 🔴 高 | [#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919) | **v2.0.1 频繁崩溃**（console process/reply 报错） | OPEN，无 fix PR |
| 🔴 高 | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | **中文输入法导致消息队列不可用**（v2.1.0b2） | OPEN，无 fix PR |
| 🟠 中 | [#6918](https://github.com/agentscope-ai/QwenPaw/issues/6918) | **Agent 间消息创建重复会话**（shadow instances） | OPEN，无 fix PR |
| 🟠 中 | [#6883](https://github.com/agentscope-ai/QwenPaw/issues/6883) | **日记页面子文件夹笔记分组到错误日期** | OPEN，无 fix PR |
| 🟡 低 | [#6871](https://github.com/agentscope-ai/QwenPaw/issues/6871) | **历史消息时间戳偏移 +8 小时** | CLOSED/已修复 |

**特殊情况：** MCP 工具失效（#6732）已关闭，由 v2.1.0-beta.3 的缓存修复覆盖。插件安全（#6916）作为关键安全缺口 OPEN 中。


## 6. 功能请求与路线图信号

| 功能请求 | Issue 链接 | 对应 PR | 纳入可能性 |
|---------|------------|---------|-----------|
| **统一市场页**（apps/plugins/skills 合并） | — | [#6880](https://github.com/agentscope-ai/QwenPaw/pull/6880) | 高，已在实现中 |
| **LaTeX/公式渲染** | [#6893](https://github.com/agentscope-ai/QwenPaw/issues/6893)、[#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453)、[#4756](https://github.com/agentscope-ai/QwenPaw/issues/4756) | [#6911](https://github.com/agentscope-ai/QwenPaw/pull/6911)（已合并） | 极高，基础已就绪 |
| **MCP 工具超时可配置** | [#6724](https://github.com/agentscope-ai/QwenPaw/issues/6724) | [#6874](https://github.com/agentscope-ai/QwenPaw/pull/6874) | 高，审查中 |
| **Chat 工作目录与 Agent workspace 隔离** | [#6900](https://github.com/agentscope-ai/QwenPaw/issues/6900) | — | 中，涉及较大的架构变更 |
| **Agent 主动投递消息至收件箱** | [#6917](https://github.com/agentscope-ai/QwenPaw/issues/6917) | — | 中，设计明确但优先级未定 |
| **AnySearch 搜索集成**（替代 Tavily） | — | [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) | 待评估（三方 PR） |
| **QQ 机器人工作流限流优化** | [#6897](https://github.com/agentscope-ai/QwenPaw/issues/6897) | — | 中 |


## 7. 用户反馈摘要

- **MCP 工具失效是最大的情绪触发点：**“每隔几小时 mcp 工具就失效，重启才能恢复”——多用户遇到同一问题，虽然已修复，但影响的范围和用户等待成本需要评估 Beta.3 的推广节奏。
- **中文输入法崩溃严重打断工作流：** 用户在 v2.1.0b2 中“消息队列完全不可用”，且需要等待“agent 运行中”状态才能复现，日常可用性受影响大。
- **LaTeX 渲染是用户对“专业工具”的核心期待：** 多次对比“Cherry Studio 可以、QwenPaw 不行”，这直接影响用户对产品完成度的心智认知。
- **QQ 场景存在限流痛点：** 用户表示“没必要的详细工作流全部发到 QQ 会触发限流，建议开发组优化”——说明在 IM 渠道的信息降噪上有明确需求。
- **社区对微信群有需求：** “微信用户人群多啊，便于交流”——侧面反映了当前社区交流渠道的不足。


## 8. 待处理积压

**长期未响应的 PR（需关注）：**

| PR | 时间 | 说明 |
|----|------|------|
| [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) | 7月21日 | 统一 provider 发现/模型元数据/路由，超3周未审查，功能请求 #6167 |

**需要决策的 Issue：**

| Issue | 时间 | 说明 |
|-------|------|------|
| [#6916](https://github.com/agentscope-ai/QwenPaw/issues/6916)（安全） | 8月11日 | 插件静默创建定时任务，安全缺口，建议尽快处理 |
| [#6919](https://github.com/agentscope-ai/QwenPaw/issues/6919)（崩溃） | 8月11日 | v2.0.1 稳定版崩溃，需要安排回归检查 |
| [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885)（IME） | 8月10日 | 中文输入法导致消息队列问题，高频用户场景 |

**提醒：** 工具描述不准确（[PR #6898](https://github.com/agentscope-ai/QwenPaw/pull/6898)）已关闭但值得确认合入，`read_file` 对二进制文件的处理方式影响 9B 模型在工具选择上的表现。


## 项目健康度总结

| 指标 | 状态 | 说明 |
|------|------|------|
| 社区活跃度 | 🟢 高 | 24h 内 23 Issue / 49 PR |
| 发布节奏 | 🟢 健康 | Beta 迭代频繁（2天/版本） |
| Bug 响应时间 | 🟡 中等 | 部分 bug 有 PR，但核心崩溃类仍待处理 |
| 架构演进 | 🟢 积极 | 上下文统一、市场统一表明长期正确性投资 |
| 安全隐患 | 🟠 需关注 | #6916 插件权限缺口待确认 |
| 用户满意度 | 🟡 中等 | LaTeX 与 MCP 稳定性仍是高频抱怨点 |

**核心建议：** 优先推进中文 IME（#6885）与崩溃（#6919）的修复，同时确认 Scroll 上下文重构（#6779）能否在 beta.4 落地——这将是 v2.1.0 稳定版的重要前提。

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