# OpenClaw 生态日报 2026-09-23

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-23 02:17 UTC

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

# OpenClaw 项目动态日报 — 2026-09-23

## 今日速览

过去24小时社区提交量维持高位：500条Issue更新（新开/活跃472条），500条PR更新（待合并353条）。Issue关闭率仅5.6%，大量P0/P1级Bug长期滞留至「needs-maintainer-review」或「needs-product-decision」状态，高优缺陷修复链路存在显著阻塞。本日无新版本发布，代码库处于持续积压合并的收敛期。社区热点高度集中在内存泄漏、消息静默丢失、更新器故障三类核心稳定性主题，用户对生产级可靠性的诉求非常迫切。

---

## 版本发布

今日无新版本发布（最新版本为2026.9.5）。

---

## 项目进展

今日共有147条PR被合并/关闭，以下为关键合并：

- **#156034** — [refactor(doctor): keep legacy main repair at the migration boundary](https://github.com/openclaw/openclaw/pull/156034)（已关闭）：将Doctor的删除默认代理迁移改为显式处理，属内部重构，无用户可见行为变化。
- **#156050** — [fix(ui): repair keyboard access, screen reader semantics, and contrast](https://github.com/openclaw/openclaw/pull/156050)（已关闭）：修复Control UI的键盘操作、屏幕阅读器语义和低对比度问题，改进无障碍体验。

另有多条PR获得「ready for maintenainer look」状态，推进至合并临界点，包括：

- **#156068** [fix(worker): serialize workspace helpers from explicit source](https://github.com/openclaw/openclaw/pull/156068)：修复Worker工作区传输时`ReferenceError: __name is not defined`错误。
- **#155486 / #155485 / #155487** — [UI状态规范化重构系列](https://github.com/openclaw/openclaw/pull/155486)（RonneyDa）：将canonical cron / channel / skills状态直接传入视图层，删除重复投影，净减约156行生产代码。
- **#155858** [fix(cron): persist command delivery evidence](https://github.com/openclaw/openclaw/pull/155858)：为命令式cron运行建立持久化的「运行回执→任务运行→外发投递结果」证据链。
- **#155433** [fix(update): preserve restart intent before macOS Gateway shutdown](https://github.com/openclaw/openclaw/pull/155433)：在LaunchAgent关闭前验证并记录重启意图，防止更新过程中重启信息丢失。

技术债清理是当前主线之一，Doctor组件、UI状态层、Worker序列化等模块持续被重构简化。

---

## 社区热点

### 最高讨论量

1. **#91588** — [Gateway内存泄漏：350MB→15.5GB导致OOM崩溃循环](https://github.com/openclaw/openclaw/issues/91588)（36条评论，P0，无修复PR）
   用户@peetercheng报告Gateway进程RSS在2-3天内从350MB涨至15.5GB，持续触发launchd-handoff重启。该问题已开放3.5个月，至今无fix PR，是当前社区最关注的稳定性问题。

2. **#44925** — [子代理完成结果静默丢失，无重试、无通知、无自动重启](https://github.com/openclaw/openclaw/issues/44925)（29条评论，P1，无修复PR）
   三个独立故障模式（完成公告失败、超时、重试缺失）导致子代理任务结果永久丢失。用户强调这涉及Telegram论坛模式下多会话编排的可靠性。

3. **#126360** — [显式多代理所有权下AgentSelectionRequiredError日志洪水](https://github.com/openclaw/openclaw/issues/126360)（18条评论，P1，无修复PR）
   配置`agents.ownership: "explicit"`且无默认代理时，系统代理轮次、日志插件、Control UI全局RPC均缺乏agentId目标，导致无法处理的操作刷屏。

### 共性诉求

热点问题高度集中于**消息/结果静默丢失**与**资源泄漏**两大类。用户普遍不满的是：故障发生后没有重试机制、没有用户可见的告警、没有自动恢复路径。这些问题直接侵蚀了OpenClaw作为生产级AI助手基础设施的可信度。

---

## Bug 与稳定性

### P0 严重级（影响生产可用性）

| 问题 | 状态 | 修复PR |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway内存泄漏（350MB→15.5GB） | 开放3.5个月 | ❌ 无 |
| [#119565](https://github.com/openclaw/openclaw/issues/119565) 并发MCP调用导致内存近线性放大 | 开放，stale | ❌ 无 |
| [#155764](https://github.com/openclaw/openclaw/issues/155764) 2026.9.5更新被`retained_plugin_source_conflict`阻塞 | 新报 | ❌ 无 |
| [#154381](https://github.com/openclaw/openclaw/issues/154381) 更新器验证仍被300秒上限卡住，无法获取9.5超时修复 | 新报 | ❌ 无 |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) Windows de-DE升级后Doctor维护阻塞 | 无修复PR | ❌ 无 |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) 订阅计费冷却时长远超故障持续时间 | 无修复PR | ❌ 无 |
| [#152689](https://github.com/openclaw/openclaw/issues/152689) 9.5 Codex重试循环填满os.tmpdir()（342MB×N） | ✅ 已关闭 | — |
| [#153377](https://github.com/openclaw/openclaw/issues/153377) 更新修复在finalize:doctor阶段自竞争 | ✅ 已关闭 | — |

### P1 高级别

- **消息/结果丢失类**：[#44925](https://github.com/openclaw/openclaw/issues/44925)（子代理完成丢失）、[#148707](https://github.com/openclaw/openclaw/issues/148707)（同会话二次运行抢占导致回复丢失）、[#126246](https://github.com/openclaw/openclaw/issues/126246)（Telegram发送卡在send_attempt_started）、[#125764](https://github.com/openclaw/openclaw/issues/125764)（Telegram网络故障仅一次尝试即死信）、[#112259](https://github.com/openclaw/openclaw/issues/112259)（零载荷分发静默丢弃）、[#135704](https://github.com/openclaw/openclaw/issues/135704)（iMessage回显绕过缓存）
- **状态损坏类**：[#97616](https://github.com/openclaw/openclaw/issues/97616)（hook/tool子进程泄漏成僵尸）、[#136311](https://github.com/openclaw/openclaw/issues/136311)（memory-core重建索引死锁）、[#125570](https://github.com/openclaw/openclaw/issues/125570)（Skill Workshop更新覆盖写作技能描述）、[#121617](https://github.com/openclaw/openclaw/issues/121617)（「Already compacted」误判阻塞二次压缩）
- **性能退化类**：[#134993](https://github.com/openclaw/openclaw/issues/134993)（文件系统发现忙循环吃满CPU核）、[#134925](https://github.com/openclaw/openclaw/issues/134925)（ARM64/Pi上每次turn主线程CPU 100%）、[#152961](https://github.com/openclaw/openclaw/issues/152961)（9.5 WorkerThread吃满CPU且RSS增长，已关闭）

### 关键观察

**P0/P1问题的修复PR覆盖率极低**；多数打上了`clawsweeper:no-new-fix-pr`与`clawsweeper:needs-maintainer-review`标签，说明维护者已知晓但尚未形成修复方案。Telegram渠道外发可靠性、内存管理、更新器鲁棒性是三大最痛区域。

---

## 功能请求与路线图信号

- **#53763** — [内置headless浏览器](https://github.com/openclaw/openclaw/issues/53763)（P3，12条评论）：希望捆绑headless Chromium作为一等工具，摆脱对外部Chrome/第三方API的依赖。该需求已有12条讨论，但尚无对应PR。
- **#10687** — [动态模型发现（OpenRouter等）](https://github.com/openclaw/openclaw/issues/10687)（P3，4👍）：模型目录静态化无法适配快速更新的供应商，社区呼声较高。
- **#79902** — [SQLite会话/转录扩展接口](https://github.com/openclaw/openclaw/issues/79902)（P3，14条评论）：面向高级用户提供标准化的会话数据访问层，避免解析不透明blob。
- **#96975** — [隔离子代理完成上下文](https://github.com/openclaw/openclaw/issues/96975)（P2，12条评论）：默认仅返回状态+子会话链接，避免父会话被重型子代理输出污染。
- **#73537** — [生产就绪稳定性标签](https://github.com/openclaw/openclaw/issues/73537)（P3，2👍）：用户请求在Release中标注生产就绪度。作者以家庭与业务助手场景呼吁更透明的稳定性信号。

已存在的PR与这些请求的交叉信号：`agentsapi` harness扩展（[#156092](https://github.com/openclaw/openclaw/pull/156092)、[#154217](https://github.com/openclaw/openclaw/pull/154217)）正在推进Agents API工具支持与token用量上报；Cron证据链持久化（[#155858](https://github.com/openclaw/openclaw/pull/155858)）为可观测性铺路。这两方向可能随2026.9.x迭代逐步落地。

---

## 用户反馈摘要

- **"这是生产级事故但无法自行恢复"** — 多个Issue（[#44925](https://github.com/openclaw/openclaw/issues/44925)、[#125764](https://github.com/openclaw/openclaw/issues/125764)）中，用户反复强调故障后「无重试、无通知、无恢复路径」，只能手动重启。这不是体验问题，而是可靠性问题。
- **"升级到2026.9.5后一切开始崩"** — [#152689](https://github.com/openclaw/openclaw/issues/152689)用户报告升级后Codex重试循环反复写入342MB插件快照直至填满临时目录；[#155764](https://github.com/openclaw/openclaw/issues/155764)用户卡在`retained_plugin_source_conflict`无法完成更新。9.5发布后的更新路径存在明显回归。
- **"内存从350MB涨到15.5GB，我没做任何特别的事"** — [#91588](https://github.com/openclaw/openclaw/issues/91588)的日常使用场景即触发，用户强调这不是极端负载，常规使用就会OOM。
- **正面反馈**：用户@Reneb-cafe（[#73537](https://github.com/openclaw/openclaw/issues/73537)）表达了对OpenClaw作为家庭/业务助手的深度依赖与感谢，认可其在Telegram集成、cron自动化、Home Assistant控制等场景的表现，但希望有更透明的稳定状态标注。

---

## 待处理积压

- **[[Bug] cacheRetention ignored for LiteLLM-proxied Anthropic models (#37966)](https://github.com/openclaw/openclaw/issues/37966)**（3月开放，stale）：LiteLLM代理的Anthropic模型静默忽略`cacheRetention`配置。已打`not-repro-on-main`标签，但用户侧问题未闭环。
- **[Models: fully dynamic model discovery (#10687)](https://github.com/openclaw/openclaw/issues/10687)**（2月开放，4👍）：动态模型发现搁置超过7个月，OpenRouter等快速变动目录无法适配。
- **[Totaltokens inflation still reproduces (#125333)](https://github.com/openclaw/openclaw/issues/125333)**（8月开放）：此前#123065的修复仅覆盖`api==="cli"`路径，内存刷新转录路径仍存在未设防的ratchet问题，且已有linked PR但无合并进展。
- **[TG代理外发死信永久化 (#112313)](https://github.com/openclaw/openclaw/issues/112313)**（7月开放，8条评论）：死信队列条目永久残留、无法清理，`openclaw health`永久报警。

---

*数据统计区间：2026-09-22至2026-09-23 UTC*
*数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-09-23**
**分析范围：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw、EasyClaw**


## 1. 生态全景

个人 AI 助手开源生态正处于 **“规模活跃、稳定性承压”** 的关键阶段。头部项目（OpenClaw、CoPaw、Zeroclaw）日均 PR 更新量高达 40-500 条，功能迭代速度极快，但高优缺陷修复链路普遍阻塞（OpenClaw P0/P1 修复 PR 覆盖率极低），生产级可靠性成为全行业共同痛点。各项目围绕 **“消息不丢失、资源不泄漏、更新不失败”** 三大稳定性主题集中攻坚，同时向多代理编排、CDSS 自助部署、Agent 间通信协议等方向探索架构演进。整体生态呈现 **“能力先行、稳定性补课、标准化萌芽”** 的三阶段叠动态势。


## 2. 各项目活跃度对比

| 项目 | Issues（当日） | PRs（当日） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500 条更新（新开/活跃 472，关闭率 5.6%） | 500 条更新（待合并 353，合并/关闭 147） | 无 | **⚠️ 偏弱**：高优缺陷修复覆盖率低，P0 问题滞留数月 |
| **CoPaw** | 39 条更新（关闭 28，新增/活跃 11） | 48 条更新（合并/关闭 24，待合并 24） | 无 | **✅ 良好**：问题收敛节奏好（关闭率 72%），但 2 个 S0 级 Bug 无修复 PR |
| **Zeroclaw** | 34 条更新（新开/活跃 19，关闭 15） | 50 条更新（待合并 32，合并/关闭 18） | 无 | **⚠️ 一般**：S0 级数据丢失/安全绕过仍开放，多领域 RFC 推进中 |
| **NanoClaw** | 2 条更新（1 个新 Bug） | 19 条更新（合并/关闭 5） | 无 | **✅ 良好**：CDSS 核心落地，但更新技能完全崩溃需优先处理 |
| **LobsterAI** | 5 条更新（全部 stale） | 12 条更新（合并/关闭 10） | ✅ **2026.9.22** | **✅ 良好**：迭代节奏快，但 Issue 积压近半年未响应 |
| **NanoBot** | 3 条新增 | 31 条更新（合并/关闭 15，待合并 16） | 无 | **✅ 良好**：合并速率稳健，p1 修复处于开放状态 |
| **IronClaw** | 无新增/关闭 | 3 条待合并 | 无 | **✅ 中等**：稳态推进，无用户可见变更 |
| **PicoClaw** | 2 条关闭 | 4 条更新（关闭 3，开放 1） | 无 | **⚠️ 中等**：stale 清理期，关键修复 PR 被关闭需人工裁决 |
| **EasyClaw** | 无变动 | 无变动 | ✅ **v1.9.20** | **✅ 良好**：低讨论、稳发布，无紧急问题 |
| **ZeptoClaw** | 无新增/关闭 | 3 条 Dependabot PR | 无 | **✅ 中等**：自动化依赖维护中，社区讨论低谷 |
| **Moltis** | 无新增/关闭 | 1 条 Dependabot PR | 无 | **✅ 低活跃但稳定**：维护窗口期 |
| **TinyClaw** | 无 | 无 | 无 | **➖ 无活动** |


## 3. OpenClaw 在生态中的定位

**优势与地位：**
- **社区规模绝对领先**：单日 500 条 Issue/PR 更新，远超 NanaBot（31）、Zeroclaw（50）、CoPaw（48）等同类项目，是当前生态中讨论量最大、贡献者最活跃的“核心参照系”。
- **功能覆盖面最广**：从 Telegram 多会话编排、cron 自动化、Home Assistant 控制到更新器/Doctor 维护体系，OpenClaw 已形成完整的生产级 AI 助手功能矩阵。
- **技术债清理积极**：Doctor 组件、UI 状态层、Worker 序列化等模块持续重构简化（#156034、#155486），架构演进方向清晰。

**技术路线差异：**
- 与 NanoBot（轻量级、Python 优先、追求开箱即用）不同，OpenClaw 选择了 **“重运行时 + 强可扩展”** 路线，支持 Gateway/Worker 分离、多租户资源和插件体系，但代价是配置复杂度和故障排查难度显著更高。
- 与 Zeroclaw（强调安全隔离、资源边界、Rust 工具链）相比，OpenClaw 更偏 Node.js/TypeScript 生态和快速功能迭代，安全性设计相对靠后。

**核心短板：**
- **生产级稳定性信任危机**：#91588 内存泄漏（350MB→15.5GB）、#44925 子代理结果静默丢失等 P0 级问题开放 3.5 个月无修复 PR，说明维护者带宽与社区规模严重不匹配。
- **更新路径频繁回归**：9.5 版本发布后连续出现更新器超时、插件源冲突等问题（#154381、#155764），正在侵蚀用户升级信心。

**对比结论**：OpenClaw 在生态中扮演 **“能力天花板与问题放大器”** 的双重角色——它定义了个人 AI 助手的可能性边界，但其稳定性短板也为中小型项目（如 NanoBot、IronClaw）提供了差异化生存空间。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息/结果投递可靠性** | OpenClaw、Zeroclaw、NanoBot | 子代理结果静默丢失（OpenClaw #44925）、外发消息无送达回执（Zeroclaw RFC #10929）、消息死信永久残留（OpenClaw #112313） |
| **内存与资源泄漏治理** | OpenClaw、NanoBot、Zeroclaw | Gateway 内存无限增长（OpenClaw #91588）、并发 MCP 调用内存放大（#119565）、Windows 日志无限增长（Zeroclaw #10931） |
| **更新器/升级路径鲁棒性** | OpenClaw、NanoClaw、LobsterAI、CoPaw | 更新被阻塞（OpenClaw #155764）、更新技能崩溃（NanoClaw #3869）、升级后网关无法启动（LobsterAI #2741、#2745） |
| **Telegram/IM 渠道体验** | OpenClaw、NanoBot、CoPaw、LobsterAI | 重复通知（NanoBot #5870）、Markdown 渲染异常（CoPaw #7585）、发送卡死（OpenClaw #126246）、微信同步延迟（LobsterAI #986） |
| **配置持久化与防丢失** | PicoClaw、LobsterAI、OpenClaw | SaveConfig 静默删除 api_key（PicoClaw #3373）、配置文件被重置（LobsterAI #1006）、cacheRetention 被忽略（OpenClaw #37966） |
| **模型/Provider 动态管理** | OpenClaw、CoPaw、Zeroclaw | 动态模型发现（OpenClaw #10687）、多模型 per provider（Zeroclaw #9809）、会话级模型指定（CoPaw #6318） |
| **多代理资源隔离与通信** | Zeroclaw、OpenClaw、CoPaw | Host-scoped 资源上限（Zeroclaw RFC #10970）、Agent 间会话消息（Zeroclaw RFC #11027）、隔离子代理上下文（OpenClaw #96975） |
| **自动压缩/上下文管理安全** | NanoBot、CoPaw | 压缩死锁（NanoBot #5849）、tool_call 结构丢失（CoPaw #5856） |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手（多 IM、cron、Home Assistant、插件体系） | 技术型个人用户、家庭自动化极客、小型团队 | Node.js/TypeScript，Gateway/Worker 分布式运行时 |
| **NanoBot** | 轻量级 AI 网关（多通道接入、工具调用、WebUI） | 个人开发者、快速原型团队 | Python 优先，单进程为主，模块化工具链 |
| **Zeroclaw** | 安全优先的多代理主机（资源隔离、权限控制、WhatsApp Web） | 对安全合规要求高的组织用户 | Rust 工具链 + 多 Agent 运行时，RFC 驱动架构演进 |
| **NanoClaw** | 客户部署自助服务（CDSS、多网关选择、Iron Proxy） | 商业客户、需要大规模部署的运营团队 | 在 OpenClaw 基础上包装 CDSS 能力层 |
| **LobsterAI** | 面向 IM 的 AI 助手桌面应用（微信/飞书/OpenClaw 网关集成） | 中文用户、IM 重度使用者 | 桌面客户端 + OpenClaw 兼容层 |
| **CoPaw** | 集成主流商业模型（GPT-5.6、Volcengine Ark）的聊天/任务工具 | AI 产品开发者、模型评测用户 | Python/TypeScript 混合，Responses API 深度适配 |
| **IronClaw** | WebUI 国际化 + host-runtime 内置工具（builtin.time） | 非英语用户、边缘设备使用者 | Rust host-runtime + TypeScript WebUI |
| **PicoClaw** | 轻量配置化 AI 助手（多 provider 网关、QQ 渠道） | 学生/个人用户、QQ 生态用户 | Python（FastAPI，无重运行时），配置驱动 |
| **EasyClaw** | 聚焦 TikTok Affiliate 电商运营（TK Copilot） | 跨境电商卖家、联盟营销从业者 | 垂直业务应用层，非通用 AI 框架 |
| **TinyClaw / Moltis / ZeptoClaw** | 生态补充位（TinyClaw 未知、Moltis 为 Rust WebAssembly 运行时、ZeptoClaw 为邮件处理） | 细分场景开发者 | 各自独立，尚处早期/维护期 |


## 6. 社区热度与成熟度分层

**第一梯队：快速迭代 + 高热度（风险与机遇并存）**

| 项目 | 活跃度特征 | 所处阶段 |
|---|---|---|
| **OpenClaw** | 日 PR 500 条，但 Issue 关闭率仅 5.6% | **能力扩张期 × 稳定性瓶颈期** |
| **CoPaw** | 日 PR 48 条，关闭率高（72%），但 S0 问题积压 | **功能快速迭代期** |
| **Zeroclaw** | 日 PR 50 条，RFC 密集，安全/多代理方向活跃 | **架构演进期** |
| **LobsterAI** | 日 PR 12 条，Release 节奏稳定（1-2 周/版本） | **成熟产品打磨期**，但 Issue 响应滞后（近半年无回复） |

**第二梯队：稳健推进 + 质量巩固**

| 项目 | 活跃度特征 | 所处阶段 |
|---|---|---|
| **NanoBot** | 日 PR 31 条，合并速率稳定 | **功能增强 + 稳定性修复并行期** |
| **NanoClaw** | 日 PR 19 条，CDSS 与兼容性加固主线明确 | **商业化能力建设期** |
| **IronClaw** | 日 PR 3 条，无合入 | **稳态维护期**，等待批量合并 |

**第三梯队：低活跃 / 维护期**

| 项目 | 活跃度特征 | 所处阶段 |
|---|---|---|
| **PicoClaw** | stale 清理为主，关键 PR 关闭 | **维护者带宽不足，风险积聚期** |
| **EasyClaw** | 无讨论但持续发版 | **垂直业务稳定运营期** |
| **ZeptoClaw / Moltis** | 仅 Dependabot 自动更新 | **维护模式 / 安静期** |
| **TinyClaw** | 完全无活动 | **停滞或休眠期** |


## 7. 值得关注的趋势信号

**① 稳定性已成为生产级 AI 助手的“入场券”**
OpenClaw 的 P0 内存泄漏、Zeroclaw 的 S0 数据丢失、CoPaw 的超时后不可恢复，都在释放同一信号：用户已将 AI 助手视为基础设施而非玩具。**“无重试、无通知、无恢复路径”** 的持续抱怨（OpenClaw #44925、#125764）意味着，**可观测性和自愈能力将取代功能数量成为下一阶段竞争焦点**。

**② 消息投递“回执机制”从可选变为必需**
Zeroclaw 的《Delivery receipts for outbound messages》（#10929）与 OpenClaw 的“Cron 运行证据链”（#155858）表明，社区正在从“发送即完成”转向“送达才闭环”。**对开发者而言，提前设计端到端消息追踪（发送→送达→回执→重试）是未来架构的必修课。**

**③ “Agent 间通信协议”开始萌芽**
Zeroclaw 提出 Agent-to-agent session messaging（#11027）与 OpenClaw 的子代理上下文隔离（#96975）方向一致，指向一个共同问题：**多代理协作尚无可复用的标准通信原语**。这与 Agent Skills `.well-known` 发现机制（Zeroclaw #4853）共同

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-23

## 今日速览

过去 24 小时内 NanoBot 项目保持高度活跃：PR 更新达 31 条，其中合并/关闭 15 条、待合并 16 条，反映出维护者与社区贡献者正专注于多项修复和功能增强的收尾工作；Issues 侧新增 3 条，其中 1 条 p1 级 Telegram 重复通知问题值得关注。无新版本发布，但多个 p1 修复处于开放状态，预示着近期可能迎来修复版本。整体来看，项目健康度良好，PR 合并速率稳健，社区参与度持续走高。

---

## 项目进展

### 今日合并/关闭重点 PR（15 条）

**稳定性修复**

- [fix(files): decode BOM-marked text correctly (#5867)](https://github.com/HKUDS/nanobot/pull/5867) — `read_file` 工具此前在 UTF-8 解码失败时回退到 latin-1，导致 BOM 标记的 UTF-16/UTF-32 文本返回乱码。此次修复在现有解码前检查 Unicode BOM，并清理 UTF-8 BOM 泄漏。
- [fix(exec): invoke quoted Windows executable without arguments (#5868)](https://github.com/HKUDS/nanobot/pull/5868) — 修复 PowerShell 下调用带引号但无参数的 Windows 可执行文件失败的问题，并补充回归测试。
- [fix(tools): handle boolean JSON subschemas during argument validation (#5859)](https://github.com/HKUDS/nanobot/pull/5859) — 修复工具参数校验在合法布尔 JSON subschema（true/false）上崩溃的问题。
- [refactor(utils): dedupe atomic JSONL write helper (#5872)](https://github.com/HKUDS/nanobot/pull/5872) — 将 MemoryStore、JsonlSessionStore 和 WebUI transcript rewriter 的原子 JSONL 写入逻辑统一为 `atomic_write_lines` 帮助函数，减少重复代码。

**Telegram 通道增强**

- [feat(tg): add support for streaming rich messages (#5614)](https://github.com/HKUDS/nanobot/pull/5614) — 在私聊中实现 rich message 流式发送（`sendRichMessageDraft`），并持久化最终回复。群聊继续使用现有 HTML/纯文本流式路径。

**Heartbeat 与 Provider 修复**

- [fix(heartbeat): make response evaluation more configurable (#4915)](https://github.com/HKUDS/nanobot/pull/4915) — 解决 #4896 中 heartbeat 迁移到 cron 后引入的回归，支持禁用评估器（始终发送 AI 回复），并强化评估 prompt。
- [fix(providers): preserve assistant content with tool calls (#5783)](https://github.com/HKUDS/nanobot/pull/5783) — 修复历史消息中同时包含 `tool_calls` 时被剥离 `content` 的问题，移除兼容性设置，新增回归测试。

**WebUI 改进**

- [feat(webui): streamline contextual message controls (#5831)](https://github.com/HKUDS/nanobot/pull/5831) — 将每条可见用户消息和完整助手消息视为独立视觉块，仅在悬停/键盘聚焦/触摸选中时显示上下文控制项，改善界面简洁度。

> **点评**：今日合并的 PR 覆盖面广，从底层 JSONL 工具函数去重到 Windows 可执行文件调用，再到 heartbeat 回归修复与 Telegram 流式消息支持，既有技术债清理，也有功能增强，项目整体处于稳健推进状态。

---

## 社区热点

**#5870 [p1] Telegram 重复压缩完成通知（3 条评论）** — [链接](https://github.com/HKUDS/nanobot/issues/5870)

用户 @3L1AS 报告在 Telegram 私聊中反复收到 `Context compacted.` 通知，同一对话中观察到 6 份重复副本，且后续继续增加。网关日志显示这些通知与自动上下文压缩相关联。这是当前 Issues 中评论最多、优先级最高的议题，社区关注度集中。

**#5849 自动压缩死锁分析（2 条评论）** — [链接](https://github.com/HKUDS/nanobot/issues/5849)

@Krislu1221 深入分析了自动压缩路径的缺陷：`summarize_transcript` 发送完整会话历史+系统提示给摘要模型，没有 token 预算保护，而手动路径正确使用了 `get_history(max_tokens=budget)`。一旦历史超出输入预算，压缩将永远无法成功。该分析获得共鸣，并已由 PR #5857 提供修复方案。

---

## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| 中优先（p1） | [#5870](https://github.com/HKUDS/nanobot/issues/5870) | Telegram 中 `Context compacted.` 通知多次重复出现，最多一次观察到 6 份副本 | 开放中，暂无 fix PR |
| 高优先（p1） | [#5849](https://github.com/HKUDS/nanobot/issues/5849) | 自动上下文压缩无 token 预算保护，历史超限后将永久死锁 | 已有 [fix PR #5857](https://github.com/HKUDS/nanobot/pull/5857)（开放中） |
| 中优先（p2） | [#5866](https://github.com/HKUDS/nanobot/pull/5866) | CLI Apps 目录安装包元数据未签名，注册表漂移可能执行被篡改的代码 | 等待审核 |
| 中优先（p2） | [#5314](https://github.com/HKUDS/nanobot/pull/5314) | 部分 OpenAI 兼容 provider 将嵌套对象/数组编码为 JSON 字符串，导致 MCP 工具调用验证失败 | 开放中（有冲突标签） |
| 中优先（p2） | [#5861](https://github.com/HKUDS/nanobot/pull/5861) | 门控启动时 fallback tokenizer 未预热，可能导致 token 计算不准确 | 开放中（p1 标签） |

---

## 功能请求与路线图信号

**1. 视频输入支持（#5869）** — [链接](https://github.com/HKUDS/nanobot/issues/5869)  
用户 @tjc0726 请求将视频从聊天通道直接发送给支持视频输入的 omni 模型（如 qwen3.8、mino-v2.6），而非仅保存到磁盘后给路径。当前无对应 PR，但 Qwen omni 系列的成熟可能推动该功能进入下个迭代。

**2. Linear 原生 agent UX 增强（#5871）** — [链接](https://github.com/HKUDS/nanobot/pull/5871)  
PR 支持 Linear 提及和委派 issue、真实的 OAuth 回调、授权工作区健康度检查、范围可见性、安全 OAuth 吊销、配对引导等。这是一个较大的功能集，且包含 WebUI 测试，可能随下一版本发布。

**3. 上下文感知消息控制（已合入 #5831）**  
WebUI 的消息操作按钮（复制、时间戳等）改为悬浮显示，减少视觉噪音。作为已完成功能，可能在下个版本的用户体验更新中体现。

---

## 用户反馈摘要

- **#5870 评论区**：用户指出通知重复问题随自动压缩频率升高而加剧，且仅出现在私聊中，群聊未复现，暗示可能是会话级别状态管理或消息发送机制的缺陷。
- **#5849 评论区**：贡献者 @Krislu1221 详细对比了手动路径（正确分块）与自动路径（无限制）的差异，并明确指出“超过输入预算后将永远无法恢复”，表达了对自动压缩死锁链路的高度担忧。
- **#5869 反馈**：用户以“any chance”开头，语气温和地提出视频直接输入 omni 模型的期望，侧面反映用户正在使用 NanoBot 作为多模态 AI 网关，并期待跟上最新模型能力。

---

## 待处理积压

**需要关注的长期开放 PR：**

- [fix: decode nested JSON tool arguments by schema (#5314)](https://github.com/HKUDS/nanobot/pull/5314) — 自 2026-08-10 开启，已标记 `conflict`，解决多个 OpenAI 兼容 provider 的工具调用兼容性问题。建议维护者解决冲突并优先审查。
- [fix(tools): keep read_file progressing on oversized lines (#5824)](https://github.com/HKUDS/nanobot/pull/5824) — 自 2026-09-20 开启，看似合理，但 3 天无更新，可能等待集成。
- [fix(channels): show unavailable channel plugins in status (#5842)](https://github.com/HKUDS/nanobot/pull/5842) — 自 2026-09-21 开启，增强 CLI 状态下插件依赖可见性，当前等待合并。

**重要 Issue：**

- [#5849](https://github.com/HKUDS/nanobot/issues/5849)（自动压缩死锁）虽已有 PR #5857，但 PR 停在开放状态已 2 天，建议尽快安排审查和合并，避免该问题在长会话场景下导致用户数据无法恢复。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-23

---

## 1. 今日速览

过去 24 小时项目活跃度较高：共产生 34 条 Issue 更新（19 条新开/活跃，15 条关闭）与 50 条 PR 更新（32 条待合并，18 条已合并/关闭），无新版本发布。安全与稳定性议题仍是讨论焦点，多个 S0/S1 级别的数据丢失与安全绕过 bug 处于活跃状态；WhatsApp Web 频道成为近期最集中的功能与修复方向。架构层面，多篇 RFC 密集提出，围绕 agent 间通信、资源隔离与消息可靠性展开，项目正处在能力边界扩张与安全加固并行的阶段。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 PR 较少且为维护性改动，但大量大型功能 PR 正在推进中：

**已合并/关闭：**

- [#11038 [CLOSED]](https://github.com/zeroclaw-labs/zeroclaw/pull/11038) `chore(security): ignore RUSTSEC-2026-0292 (imbl-sized-chunks double free)` — 解决了 master 和所有开放 PR 上 `Security` 任务持续失败的问题，解除安全 CI 阻塞。
- [#11042 [CLOSED]](https://github.com/zeroclaw-labs/zeroclaw/pull/11042) `docs(developing): record the replacement-first integration policy` — 将已接受的 RFC #6165（Core 投票通过）落实到常设文档，为后续移除、feature-gate 和迁移审查提供可引用依据。

**开放中的重要 PR（核心推进方向）：**

- [#10172 fix(runtime): preserve configured provider profile semantics](https://github.com/zeroclaw-labs/zeroclaw/pull/10172) — 修复带点分层的 provider profile 身份（`<family>.<alias>`）在运行时模型切换、RPC、gateway 和 ZeroCode 中被静默折叠的问题。XL 规模，已处于 parking-lot 状态但持续推进。
- [#10938 fix(tools): declare tool attachments explicitly instead of scanning tool text for image markers](https://github.com/zeroclaw-labs/zeroclaw/pull/10938) — 将工具附件由文本扫描方式改为显式声明，消除多模态标记在文本中被误改写的问题。XL 规模，依赖 #11046 合并。
- [#10931 fix(service): bound Windows task stdout and stderr logs](https://github.com/zeroclaw-labs/zeroclaw/pull/10931) — 以内部 service runner 替换 Windows 计划任务的 cmd 重定向方式，堵住日志无限增长的隐患。
- [#9809 feat(providers): support multiple models per provider profile](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — 允许单个 provider profile（一份凭据 + endpoint）下配置多个模型，XL 规模，是配置模型体系的重大扩展。
- [#10391 fix(delegate): bounded delegate filesystem tools now respect the target's own workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) — 修复委托工具越权访问文件系统的问题（对应 #9872），XL 规模。

整体来看，项目在“多 provider 模型管理”“工具与运行时安全边界”“Windows 服务稳定性”三条线上有显著推进。`#10938` 和 `#10391` 的合并将直接改善工具调用的正确性与安全性。

---

## 4. 社区热点

**最热门 Issues（按评论数）：**

- [#4853 [8 评论] install skills from .well-known agent-skills discovery indexes](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) — 讨论 Agent Skills 社区标准化的 `.well-known` URI 发现机制。Cloudflare 已在内部使用，Vercel 已在 npm 中支持——社区对跨平台技能标准化有明确诉求。

- [#10970 [5 评论] RFC: Host-scoped admission control and per-agent resource bounds](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) — 围绕“单机跑大量 agent 时如何优雅降级而非崩溃”的架构讨论，涉及并发上限、工具执行上限和 agent 内存隔离。

- [#10930 [5 评论] RFC: One durable primitive for questions an agent asks a human](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) — 提出将 SOP 审批门中已验证的持久化机制抽象为通用原语，供所有“agent 问人类问题”的场景复用。

- [#10929 [5 评论] RFC: Delivery receipts for outbound messages](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) — 指出当前 ZeroClaw 完全无法感知 agent 发出的消息是否送达，建议引入消息回执机制。

- [#11052 [3 评论] Render thematic breaks and setext headings for WhatsApp](https://github.com/zeroclaw-labs/zeroclaw/issues/11052) — 属于 #10475 引入 Markdown-to-WhatsApp 转换器后的后续问题：独立的 `***`/`---` 行仍会作为字面文本送达。

**分析：** 热门讨论集中在两个方向。一是架构层面——社区正积极思考多 agent 场景下的稳定性、消息语义（送达回执）和 agent 与人的交互原语；二是 WhatsApp Web 这一具体频道的 Markdown 渲染、TTS 策略等细节问题。此外 `#4853` 表明 ZeroClaw 社区高度关注外部生态标准（如 Agent Skills）的接入，项目需要在标准兼容与自有能力之间找到平衡。

---

## 5. Bug 与稳定性

按严重程度排列：

**S0 - 数据丢失 / 安全风险：**

- [#10797 [OPEN] markdown memory backend silently loses stored entries when `store()` calls overlap](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) — `MarkdownMemory::store` 基于旧的快照重写整个文件，并发写入时会静默丢失条目。**已有相关 PR [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)**（委托文件系统工具工作区隔离）在队列中，但内存后端本身的并发序列化仍需修复。

- [#11058 [OPEN] an explicit `allowed_commands` entry exempts a high-risk command from `block_high_risk_commands`](https://github.com/zeroclaw-labs/zeroclaw/issues/11058) — 当 `block_high_risk_commands = true` 时，若高危命令名称出现在 `allowed_commands` 中则被豁免，且因 `shell` 在 `auto_approve` 中，命令会在**无审批、无日志**的情况下直接执行。属安全绕过，**暂无对应 fix PR**。

- [#11055 [OPEN] the daemon never registers the channel-map factory](https://github.com/zeroclaw-labs/zeroclaw/issues/11055) — 在 daemon 部署中，webhook、cron 和 SOP turn 无法访问任何 channel 实例，channel 寻址工具在除两个入口外的所有路径上不可用。**非数据泄露但影响核心功能面**。

- [#9187 [CLOSED] WeChat sync cursor persisted before message enqueue](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) — 微信游标在消息入队前持久化，崩溃会丢失入站消息。已关闭，可能已修复或转为 follow-up。

**S1 - 工作流受阻：**

- [#10225 [OPEN] ZeroCode RPC sessions cannot reach configured channels through channel-backed tools](https://github.com/zeroclaw-labs/zeroclaw/issues/10225) — ZeroCode Code/RPC 会话中的 agent 无法通过 channel 工具使用 Git、GitHub 等外部渠道，已标注 `status:accepted`，**无对应 fix PR**。

**S2 - 行为降级：**

- [#10922 [OPEN] WhatsApp Web ignores suppress_voice when queueing automatic TTS](https://github.com/zeroclaw-labs/zeroclaw/issues/10922) — **已有 PR [#11057](https://github.com/zeroclaw-labs/zeroclaw/pull/11057)**。
- [#11059 [OPEN] WhatsApp Web ignores force_voice](https://github.com/zeroclaw-labs/zeroclaw/issues/11059) — 与上述同源，`send_via` 无法将 turn 路由到语音。**已有 PR [#11060](https://github.com/zeroclaw-labs/zeroclaw/pull/11060)**（堆叠在 #11057 之上）。
- [#10981 [CLOSED] Outgoing WhatsApp images carry no jpegThumbnail or dimensions](https://github.com/zeroclaw-labs/zeroclaw/issues/10981) — 手机端显示空白卡片。已关闭，疑已修复。
- [#10885 [CLOSED] tool-returned images disappear after an unrelated tool call within the same turn](https://github.com/zeroclaw-labs/zeroclaw/issues/10885) — 同轮中图片在无关工具调用后消失，Anthropic provider 历史保留逻辑缺陷。已关闭。

**S3 - 轻微问题：**

- [#10918 [CLOSED] Empty trailing chunk falsely marks an exact-fit HTTP response as truncated](https://github.com/zeroclaw-labs/zeroclaw/issues/10918) — `BoundedDecode::push` 的空尾块误判截断问题，已关闭。

**安全审计类（P1，已关闭）：**

- [#9392 [CLOSED] LINE group messages skip the allowlist and pairing handshake](https://github.com/zeroclaw-labs/zeroclaw/issues/9392)
- [#9391 [CLOSED] command audit logging defaults to enabled and writes nothing](https://github.com/zeroclaw-labs/zeroclaw/issues/9391)

**稳定性关注：**

- [#10594 [OPEN] cron records nothing when a job does not run](https://github.com/zeroclaw-labs/zeroclaw/issues/10594) — 静默的非执行在历史记录中完全不可见。

---

## 6. 功能请求与路线图信号

**RFC（能力边界 / 架构演进）：**

- [#11053 RFC: Knowledge graph as a first-class agent memory layer](https://github.com/zeroclaw-labs/zeroclaw/issues/11053) — 知识图谱目前是 `knowledge` 工具而非记忆层，本 RFC 提议将其提升为一等记忆。这是一个重大的架构讨论。
- [#11027 RFC: Agent-to-agent session messaging with receiver discretion](https://github.com/zeroclaw-labs/zeroclaw/issues/11027) — 解决独立会话中的 agent 如何互相传递发现、问题和协调消息。
- [#10970 RFC: Host-scoped admission control and per-agent resource bounds](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) — 多 agent 主机的资源边界与准入控制。
- [#10930 RFC: One durable primitive for questions an agent asks a human](https://github.com/zeroclaw-labs/zeroclaw/issues/10930) — 将 SOP 审批门的持久化能力泛化为通用原语。
- [#10929 RFC: Delivery receipts for outbound messages](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) — 消息送达回执机制。
- [#11017 RFC: Preserve applicable reviews and simplify expedited merge decisions](https://github.com/zeroclaw-labs/zeroclaw/issues/11017) — 治理层面的合并流程优化。

**功能增强：**

- [#4853 [OPEN] install skills from `.well-known` agent-skills discovery indexes](https://github.com/zeroclaw-labs/zeroclaw/issues/4853) — 支持从标准化的 `.well-known` URI 安装技能，已被标记 `status:in-progress` + `status:accepted`，说明维护者已认可并着手实现。
- [#11052 [OPEN] Render thematic breaks and setext headings for WhatsApp](https://github.com/zeroclaw-labs/zeroclaw/issues/11052) — **已有 PR [#11054](https://github.com/zeroclaw-labs/zeroclaw/pull/11054)**。
- [#9972 [OPEN] Tracker: eliminate user-facing literal output outside localization boundaries](https://github.com/zeroclaw-labs/zeroclaw/issues/9972) — 大规模本地化清理跟踪器，覆盖 CLI、工具、ZeroCode 与 Web 面板。

**对下一版本的启示：** `#4853` 与 `#11053` 是两个明确的路线图信号——前者表明项目正跟进 Agent Skills 生态标准，后者则预示着知识图谱将获得更深的架构地位。WhatsApp Web 在语音、Markdown、缩略图、原生投票等多个方向同时有 PR 在飞，表明该频道正在经历一次集中的体验补齐。

---

## 7. 用户反馈摘要

- **生态标准诉求强烈（#4853）**：评论中指出 Cloudflare 内部已在使用、Vercel 已在 npm 中支持 `.well-known` agent-skills URI，ZeroClaw 用户期望跟随该标准。这是社区对互操作性的直接需求。

- **OpenCode 兼容性问题（#11036）**：用户反馈使用 opencode 凭据 + 免费层模型 “big-pickle” 时，所有 provider 尝试均失败并返回 `403 FreeTierError`。该 issue 带有 `r:needs-repro` 和 `needs-author-action` 标签，说明维护者需要用户提供更多复现信息才能推进。

- **配置语义困惑（#11058）**：用户发现 `allowed_commands` 竟然会**覆盖** `block_high_risk_commands` 安全策略，使高危命令在无审批、无日志地执行。这反映出安全配置项之间的优先级关系在文档中不够清晰，用户希望 `block_

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 · 2026-09-23

## 1. 今日速览

过去 24 小时内，PicoClaw 没有新开 Issue，也没有新版本发布；2 个历史 Issue 被关闭，3 个历史 PR 被关闭，另有 1 个 PR 仍处于开放状态。从更新内容看，当前项目活跃度偏低，主要处于「stale 清理」阶段。值得注意的是，两个与配置安全/并发初始化相关的 Bug 虽被关闭，但对应修复 PR 也一同被标记为 stale，存在「问题未真正解决」的风险。项目整体健康度中等，维护者需要人工介入对关键 PR 做最终裁决。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去 24 小时没有明确显示被合并的 PR；4 条 PR 更新中有 3 条关闭、1 条开放：

- [#3375 fix(config): guard lazy sensitive-data cache against concurrent init](https://github.com/sipeed/picoclaw/pull/3375)  
  针对 #3374 的并发初始化修复，目前被标记为 `[stale]` 并关闭，未见合入主线。

- [#3372 fix(config): make the reaction tool configurable](https://github.com/sipeed/picoclaw/pull/3372)  
  修复 `reaction` 工具无法通过配置开关控制的问题，同样因 stale 被关闭，需确认是否仍会合入。

- [#1349 feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349)  
  来自 3 月的 QQ Channel 功能增强 PR，9 月 22 日被关闭；需要维护者确认该功能是已通过其他方式合入，还是正式放弃。

- [#3370 feat(tools): add Keenable web search provider](https://github.com/sipeed/picoclaw/pull/3370)  
  当前唯一处于开放状态的 PR，新增 Keenable 网页搜索 provider，仍等待 review。

整体来看，今日没有新代码进入主线，项目前进速度放缓。但 stale 清理有助于降低 Issue/PR 积压噪音；如果 #3375 和 #3372 的修复仍然有效，建议重新打开并合入。

## 4. 社区热点

今日评论最多的条目是两条由 @sting8k 提交的配置安全相关 Bug：

- [#3374 Data race in Config.initSensitiveCache can return a nil replacer and panic FilterSensitiveData](https://github.com/sipeed/picoclaw/issues/3374) — 评论 2
- [#3373 SaveConfig silently deletes every api_key after the first and leaves a dangling fallback](https://github.com/sipeed/picoclaw/issues/3373) — 评论 2

虽然两条 Issue 的 👍 数都为 0，但 2 条评论已是当前数据中的最高活跃度。背后诉求集中在「配置处理的可靠性与安全性」：用户希望 PicoClaw 在并发场景下不 panic，同时保存配置时不能发生静默数据丢失。这类问题对生产环境用户影响较大，值得维护者优先处理。

## 5. Bug 与稳定性

按严重程度排列：

- **高：配置保存静默丢数据**  
  [#3373 SaveConfig silently deletes every api_key after the first and leaves a dangling fallback](https://github.com/sipeed/picoclaw/issues/3373)  
  `model_list` 中超过一个 `api_keys` 时，`LoadConfig → SaveConfig` 往返会删除除第一个以外的所有 key，并留下指向不存在模型的 `fallbacks`。这是明显的无声数据丢失，目前未看到对应修复 PR。

- **中高：敏感数据缓存并发初始化 data race**  
  [#3374 Data race in Config.initSensitiveCache can return a nil replacer and panic FilterSensitiveData](https://github.com/sipeed/picoclaw/issues/3374)  
  `Config.sensitiveCache` 的懒加载没有同步保护，可能导致 `FilterSensitiveData` 收到 nil `*strings.Replacer` 并 panic。已存在修复 PR [#3375](https://github.com/sipeed/picoclaw/pull/3375)，但该 PR 目前已被关闭。

两条 Issue 都是 9 月 8 日创建、9 月 22 日更新后关闭，带有 `[stale]` 标记。需要维护者确认它们是否已被真实修复，还是只是被自动化流程关闭。

## 6. 功能请求与路线图信号

今日没有新开功能类 Issue，但开放 PR 提供了路线图信号：

- [#3370 feat(tools): add Keenable web search provider](https://github.com/sipeed/picoclaw/pull/3370)  
  新增 Keenable 作为 `web_search` provider，并声称无需 API key 即可使用，只需通过配置开启。这符合「降低工具使用门槛」的方向，若被维护，可能进入下一版本。

- [#3372 fix(config): make the reaction tool configurable](https://github.com/sipeed/picoclaw/pull/3372)  
  如果最终合入，将补齐 `ToolsConfig` 对 `reaction` 工具的配置能力，属于可配置性增强。

- [#1349 feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349)  
  QQ Channel 多类型消息支持（表情、语音、图片、视频、文件等）是较完整的渠道功能增强，但已关闭，需确认是否已被替代实现。

## 7. 用户反馈摘要

从现有 Issue 内容可以提炼出以下用户反馈：

- **并发场景 panic 影响可信度**：

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-23

## 今日速览

今日 NanoClaw 保持高活跃度，24 小时内共产生 2 条 Issue 更新和 19 条 PR 更新，其中 5 条 PR 已关闭/合并。开发焦点集中在三条主线：**CDSS（客户部署自助服务）功能推进**（#3864/#3865 合并）、**setup/update 流程稳定性修复**（#3861/#3863 合并，#3869 新 bug 曝光），以及 **Codex/Claude Code 运行时的上游兼容性加固**（#3866/#3867/#3868 待合并）。新 Issue #3869 显示 `/update-nanoclaw` 技能因遗漏传递导入而完全崩溃，阻塞了一个核心维护路径，需要优先处理。项目整体处于功能扩展与稳定性加固并行的积极阶段。

---

## 版本发布

今日无新版本发布。最新 Releases 为空。

---

## 项目进展

今日共 5 条 PR 关闭/合并，核心进展如下：

- **CDSS（Customer Deployment Self Serve）核心功能落地**：
  - **#3864** [CLOSED] feat(cdss): channel credential provider, instance specs, per-instance webhook paths —— 完成了 WP-6a 核心接缝：新增 `ChannelCredentialProvider`，允许将存储的聊天应用连接动态转换为实时适配器实例，无需重启且主机无需感知凭证存储位置。链接：https://github.com/nanocoai/nanoclaw/pull/3864
  - **#3865** [CLOSED] feat(cdss): Slack and Teams adapters per instance, pins, webhook mode, pending challenge —— 作为 #3864 的配套（WP-6b），在 channels registry 分支上为 Slack 和 Teams 增加了按实例配置的适配器，支持 webhook 模式与待处理挑战。链接：https://github.com/nanocoai/nanoclaw/pull/3865

- **setup 流程修复**：
  - **#3863** [CLOSED] fix(setup): register a freshly installed provider contract before the gateway store uses it —— 修复了在安装向导中途新安装 provider 合约后、网关存储首次写入前未注册导致的问题。该 PR 直接回应了 Issue #3862 中 Iron Proxy 配对失败的根因。链接：https://github.com/nanocoai/nanoclaw/pull/3863
  - **#3861** [CLOSED] fix(setup): remember the image-source answer across resume so the Echo perk is offered once —— 修复了设置向导在恢复运行时重复询问 Echo 加固镜像来源的问题，避免同一问题被问两次。链接：https://github.com/nanocoai/nanoclaw/pull/3861

- **历史 PR 清理**：**#1491** [CLOSED]（3 月 27 日创建的 Google Workspace CLI 集成技能）于今日被关闭，但未合并。该 PR 包含自定义 MCP 服务器和写操作护栏设计，关闭原因不明，建议维护者说明是否因设计方向变动而搁置。链接：https://github.com/nanocoai/nanoclaw/pull/1491

---

## 社区热点

今日讨论/关注度最高的条目集中在 runtime 稳定性与一个用户报告的阻塞性 bug：

- **#3869** [OPEN] update-nanoclaw: controller archive list is missing transitive imports — prepare crashes with MODULE_NOT_FOUND —— 这是一个用户报告的高影响 bug：`/update-nanoclaw` 技能在 `git archive` 文件列表中遗漏了控制器现在导入的 3 个模块，导致 `prepare` 阶段直接崩溃、无法执行任何操作。Issue 创建于 9 月 22 日，0 评论但影响面大（所有依赖该技能的用户均受影响）。后台已有 PR #3750 尝试修复同一问题，但尚未合并。链接：https://github.com/nanocoai/nanoclaw/issues/3869

- **#3868** [OPEN] chore(container): bump Claude Code to 2.1.280 and the Agent SDK to 0.3.280 —— core-team 成员提交的运行时升级 PR。要点：自 Claude Code 2.1.267 起，会话恢复会静默使用过期 system prompt，该 PR 通过一个选项阻止此行为。这是对已影响用户的潜在回归的防御性修复。链接：https://github.com/nanocoai/nanoclaw/pull/3868

- **#3866** [OPEN] fix(codex): wait for MCP servers before the first turn —— 针对 Codex 0.147.0 起 MCP 服务器仅有约 1 秒启动时间的问题，修复后 Codex 会等待 MCP 服务器就绪再开始 turn，并在 NanoClaw 自身工具服务器启动失败时快速报错。用户侧的直接感知是「首次 turn 可能缺少工具」的隐性故障。链接：https://github.com/nanocoai/nanoclaw/pull/3866

另外，**#3867**（pin @openai/codex 0.155.1）与 #3866 构成依赖关系，表明 core-team 正在系统性地跟进 Codex CLI 的上游变更。链接：https://github.com/nanocoai/nanoclaw/pull/3867

---

## Bug 与稳定性

按严重程度排序：

| 严重度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3869](https://github.com/nanocoai/nanoclaw/issues/3869) | `/update-nanoclaw` 控制器因 `git archive` 列表遗漏传递导入而崩溃，`prepare` 阶段直接退出，技能完全不可用 | 开放中，无直接 fix；但 [#3750](https://github.com/nanocoai/nanoclaw/pull/3750)已修复同一文件列表问题，待合并 |
| 🟠 中 | [#3862](https://github.com/nanocoai/nanoclaw/issues/3862) | Iron Proxy 网关下全新安装时，Codex 设备配对无法在首个 public-wizard 运行中 vault 登录（根因：wizard 进程中使用了过期的 provider-contracts barrel 文件） | 已关闭；fix PR [#3863](https://github.com/nanocoai/nanoclaw/pull/3863) 已合并 |
| 🟠 中 | [#3868](https://github.com/nanocoai/nanoclaw/pull/3868) | 自 Claude Code 2.1.267 起，恢复会话会静默复用首次请求时记录的 system prompt，导致恢复行为漂移 | 修复 PR 已提交，待合并 |
| 🟡 低 | [#3866](https://github.com/nanocoai/nanoclaw/pull/3866) | Codex 0.147.0 起，MCP 服务器启动超时（约 1 秒）可能导致首轮 turn 缺少工具；NanoClaw 自有工具服务器启动失败时无显式报错 | 修复 PR 已提交，待合并 |

---

## 功能请求与路线图信号

今日无新增的用户显式功能请求 Issue，但通过合并/活跃的 PR 可以看出以下路线图信号：

- **CDSS（Customer Deployment Self Serve）已进入落地阶段**：核心接缝（#3864）和 Slack/Teams 适配器（#3865）已合并，意味着下一版本可能支持运营人员在无需重启的情况下动态激活聊天应用适配器实例，这是 WP-6a/6b 的关键里程碑。
- **网关层架构收敛**：活跃 PR #3815（centralize the credential gateway contract）正在推进凭证网关契约的集中化，合并后网关贡献、provider 域、会话租约和审批决策将共享统一的 host-owned 契约。链接：https://github.com/nanocoai/nanoclaw/pull/3815
- **Iron Proxy 网关与多网关选择**：#3817（add Iron Proxy gateway skill）与 #3818（select the gateway without changing provider login）仍在开放中，结合 #3863 的合并，预计会随下一版本面向用户推出。链接：https://github.com/nanocoai/nanoclaw/pull/3817 | https://github.com/nanocoai/nanoclaw/pull/3818
- **Cursor Agent SDK 支持**：#3355（/add-cursor 安装技能）与 #3356（Cursor Agent SDK payload）仍在开放中，虽今日无更新，但属于已规划的新 provider 支持。链接：https://github.com/nanocoai/nanoclaw/pull/3355 | https://github.com/nanocoai/nanoclaw/pull/3356

---

## 用户反馈摘要

今日 Issue/PR 评论数为 0 或未记录，但从 Issue 描述中可以提炼直接的用户痛点：

- **更新流程断裂**（#3869，作者 @bgao）：用户尝试运行官方更新技能 `/update-nanoclaw`，但在第一步就因控制器模块缺失而崩溃。对于依赖该技能保持项目更新的用户，这是一个完全阻塞的体验；且该 Issue 与 9 月 8 日提交的 PR #3750 高度重合，说明该问题已存在约两周仍未得到合入修复，用户

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-23

## 1. 今日速览

过去24小时内，IronClaw 没有新的 Issue 被创建或关闭，但存在3条待合并的 Pull Request，显示项目处于“稳态推进”而非爆发期。其中 `#8108` 和 `#8107` 是最近两日新提交的，分别指向 host-runtime 时间类型修复与 WebUI 国际化扩展，开发节奏正常。没有新版本发布，也没有已合并/关闭的 PR，因此今日未产生面向用户的可见变更。整体活跃度评估为中等，当前集群的 PR 一旦合并，将显著改善时间运算正确性与多语言体验。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有合并或关闭的 PR，但以下3个待合并 PR 代表了当前推进的关键方向：

- **[#8108 fix(host-runtime): add builtin.time shift and typed input issues](https://github.com/nearai/ironclaw/pull/8108)** — 为 `builtin.time` 增加 `shift` 操作，并将 `seconds`/`minutes`/`hours`/`days`/`weeks` 的统一 TimeDelta 计算规范化。这意味着对时间算术的输入类型处理将更严格、更可预测。
- **[#8107 feat(webui): add Italian (it) locale](https://github.com/nearai/ironclaw/pull/8107)** — 将 WebUI 支持的语言扩展到第12种（意大利语），并确保 `it.ts` 包含完整的英文 key 合入，不存在静默 fallback 问题。
- **[#8092 fix(webui): preserve IME composition in the chat composer](https://github.com/nearai/ironclaw/pull/8092)** — 修复聊天输入框在 IME（中文、日文等）输入过程中的组合态被打断的问题，尤其处理了 Safari 中 `isComposing` 状态不准确的情况。

若上述 PR 在下一批合并，项目将在**时间运算健壮性**和**前端输入体验**两个维度上明显前进。

## 4. 社区热点

今日没有评论数或反应数特别高的 PR/Issue 可数据源支持。可从 PR 的触发背景推测如下：

- **#8107** 是对 issue **#7855**（请求增加意大利语）的响应，说明有真实的非英语用户群体在主动要求国际化支持。
- **#8092** 涉及 IME 合成状态，这类问题通常会困扰中日韩用户社群，回应了非拉丁文字输入场景中的高频痛点。

两件 PR 都反映出社区对 **WebUI 已有功能在多语言/多输入法下的完善**更为关注，而非单纯新增功能。

## 5. Bug 与稳定性

过去24小时暂无新报告的 Bug。当前待合并 PR 中隐含以下修复方向：

- **中优先级 — 时间函数输入类型相关问题**（`#8108`）：`builtin.time` 签名输入处理不当会导致 dispatch 错误。已有 fix PR，待并发合入。
- **中优先级 — 聊天输入框在 IME 组合期间被误触发命令或误发送**（`#8092`）：当浏览器 isComposing 状态误报时，用户可能在选词过程中按下 Enter 导致消息过早发送。已有 fix PR。
- **低优先级 — Safari 键盘事件兼容性**（`#8092` 附带处理）：Safari 下 keyCode 229 语义差异造成 Enter 行为不一致。

## 6. 功能请求与路线图信号

- **新增意大利语支持**：`#8107` 是对社区请求 `#7855` 的直接响应。该 PR 合并后，WebUI 将拥有完整十二种语言，并确立了**“sidecar 包必须全量合并英文 key union”**的技术约束，为后续第13+种语言提供可持续模式。
- 未发现其他显著的新功能请求信号。

## 7. 用户反馈摘要

当前没有今日活跃的 Issue 讨论线程可提取文本反馈。从 PR 视角可概括用户痛点：

- **中文/日文/韩文输入法用户**（`#8092`）在使用聊天输入框时，组成文字过程中会被命令菜单或快捷发送打断，期望浏览器原生 IME 组合键行为能被完整保留。
- **非英语用户**（`#8107` 背后请求）对 UI 语言覆盖的完整性敏感，不希望出现“部分英文部分母语”的混合界面。

## 8. 待处理积压

- **PR #8092（webui IME 修复）** 创建于 2026-09-10，已超过两周未合并。它解决了实打实的输入法兼容性问题，且已经附加了回归测试用例（caller-level regression cases）。当前无合并冲突迹象，建议维护者尽快安排 review，以免后续与 WebUI 其他改动产生冲突。
- **PR #8108** 与 **PR #8107** 分别为 9/22 创建的最新 PR，处于正常 review 窗口，暂不构成积压；但若数周未动，则需关注。

---

*本日报基于 2026-09-23 的 GitHub 数据自动生成。所有数据来源链接均已附上，项目整体呈健康趋势。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-23

## 1. 今日速览
过去 24 小时项目保持高活跃度：共 12 条 PR 更新，其中 10 条已合并/关闭，2 条待合并；新开/活跃 Issue 5 条，无关闭项。发布 1 个新版本（2026.9.22）。本次更新高度聚焦 **OpenClaw 网关稳定性与兼容性修复**（Windows 启动、模型策略、插件同步、缓存边界），另有 CoWork 会话体验增强。Issue 侧活跃度偏低，5 条中 4 条为 stale 状态，均未获维护者明确回复，社区需求响应有待加强。整体项目健康度良好，代码迭代节奏快，但 Issue 积压处理存在滞后风险。

## 2. 版本发布
### LobsterAI 2026.9.22
- **发布链接**：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.22
- **关键更新内容**：
  - **修复（IM）**：恢复原生定时任务与飞书消息投递渠道（PR #2737）
  - **修复（OpenClaw）**：恢复 Windows 网关退出能力，修复启动流程问题
- **破坏性变更**：无显式说明。
- **迁移注意事项**：如您正在 Windows 环境使用 OpenClaw 网关或依赖飞书渠道定时任务，建议升级后立即验证相关链路。若遭遇异常，可关注 #2741（nsp-clawguard 遗留启动问题）的后续修复版本。

## 3. 项目进展
今日合入 10 个 PR，核心方向为 **OpenClaw 稳定性加固** 与 **CoWork 体验优化**，具体如下：

| 方向 | PR | 内容摘要 |
|---|---|---|
| 模型策略修复 | [#2745](https://github.com/netease-youdao/LobsterAI/pull/2745) | 修复升级后遗留的无效 `modelPolicy.allow` 配置导致整个网关无法启动的问题 |
| 启动性能 | [#2746](https://github.com/netease-youdao/LobsterAI/pull/2746) | 避免 Clawguard 启动修复流程产生无谓的租约等待，减少启动阻塞 |
| 系统提示词缓存 | [#2744](https://github.com/netease-youdao/LobsterAI/pull/2744) | 将 “Active exec sessions” 快照移出 system prompt，避免后台进程每轮失效 prefix cache |
| Windows 兼容 | [#2743](https://github.com/netease-youdao/LobsterAI/pull/2743) | Backport koffi Windows 私密目录创建补丁，修复安全软件拦截 Add-Type 编译导致全链路故障 |
| 技能配置同步 | [#2742](https://github.com/netease-youdao/LobsterAI/pull/2742) | 过滤无效文件变化、RPC 超时后确认配置是否已生效，减少网关反复重启 |
| 插件兼容 | [#2741](https://github.com/netease-youdao/LobsterAI/pull/2741) | 兼容 2.4.13 发布包与 manifest 2.4.12 的错位，修复 nsp-clawguard 升级后无法启动 |
| 模型能力 | [#2748](https://github.com/netease-youdao/LobsterAI/pull/2748) | 将 Kimi K3 输出 token 上限从 8,192 提升至与 1M 上下文窗口匹配，本地化流式 wrapper |
| CoWork 体验 | [#2749](https://github.com/netease-youdao/LobsterAI/pull/2749) | 实时展示工具调用过程中的分步进度与 diff 统计，提取共享 diff-stats 辅助组件 |
| 主题修复 | [#2740](https://github.com/netease-youdao/LobsterAI/pull/2740) | CJK 正文字重恢复为 400，恢复 macOS 上粗体文本对比度 |
| 发布分支 | [#2747](https://github.com/netease-youdao/LobsterAI/pull/2747) | Release/2026.9.21 合入 |

**整体评价**：项目今日向前推进一个完整小版本，解决多个 upgrade 后首次启动类故障，显著提升了升级平滑性与 Windows 平台兼容性。

## 4. 社区热点
- **#1006 - 配置文件和工作空间文件在重启后被重置**
  - 链接：https://github.com/netease-youdao/LobsterAI/issues/1006
  - 今日最活跃 Issue（3 条评论），创建于 3 月 28 日，至今仍为 OPEN 状态。
  - 核心诉求：用户自定义的 `openclaw.json` 与 `AGENTS.md` 等内容被启动模板覆盖，只能通过定时任务 workaround 绕过。建议官方提供持久化机制。
  - **信号**：该问题持续近 6 个月未解决，是用户 Blocking 级别的痛点，与今日 PR #2727 的修复方向高度吻合——后者正在解决插件 entry hooks 持久化问题，说明项目已开始系统性补课。

其余 4 条 Issue 评论均 ≤2，讨论热度不高，但 #986（微信回复同步）、#981（Web Search 启动失败）反映了真实使用故障体验。

## 5. Bug 与稳定性
按严重程度排列：

| 严重度 | Issue/PR | 描述 | 修复状态 |
|---|---|---|---|
| 🔴 高 | [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) | 配置文件/工作空间文件重启后被重置，用户配置丢失 | 无官方修复；[#2727](https://github.com/netease-youdao/LobsterAI/pull/2727) 正解决插件 hooks 持久化，可视为同类问题的部分覆盖 |
| 🔴 高 | [#981](https://github.com/netease-youdao/LobsterAI/issues/981) | 启动 app 报错 `Failed to start Web Search service`，Web Search 运行时启动失败（stale） | 无修复 PR |
| 🟡 中 | [#2745](https://github.com/netease-youdao/LobsterAI/pull/2745) | 遗留 model ID（如 `DeepSeek V4 Pro`）导致升级后整个网关无法启动 | 已合并 ✅ |
| 🟡 中 | [#2741](https://github.com/netease-youdao/LobsterAI/pull/2741) | nsp-clawguard 升级后无法启动，旧版 manifest 与发布包版本错位 | 已合并 ✅ |
| 🟡 中 | [#986](https://github.com/netease-youdao/LobsterAI/issues/986) | 微信回复不同步，需等全部生成完才一次性分条发送（stale） | 无修复 PR |
| 🟢 低 | [#983](https://github.com/netease-youdao/LobsterAI/issues/983) | 快捷键修改不支持按下新组合键方式（stale） | 无修复 PR |

**稳定性评价**：今日合入的 PR 针对性解决了 2 个高影响启动故障（#2745、#2741），意味着本周遇到升级后无法启动的用户可通过最新版恢复。但遗留的 #1006、#981 仍属高风险，建议维护者优先响应。

## 6. 功能请求与路线图信号
- **配置持久化机制（强信号）**：Issue #1006 要求官方提供用户配置持久化方案。当前 PR #2727（persist OpenClaw entry hooks across sync）已在实际解决插件配置同步丢失问题，预计后续版本将扩展至 `openclaw.json`、`AGENTS.md` 等用户自定义文件的持久化。
- **流式/同步消息体验（中信号）**：Issue #986 对微信客户端消息发送节奏表达不满。同类问题在 CoWork 领域已通过 PR #2749 实现实时进度流式展示，IM 通道的流式改造可能是下一阶段候选。
- **国际化完善（弱信号）**：#982 指出预设 Agents 名称/描述未跟随系统语言切换。涉及 renderer 层 i18n 覆盖，相对独立，工作量可控，适合作为 good first issue。

## 7. 用户反馈摘要
- **配置覆盖抱怨**（#1006）：用户称 "目前只能通过定时任务 workaround 解决"，指出保护机制过于激进，影响正常自定义需求——典型的高级用户因过度产品保护而产生的挫败感。
- **消息体验差评**（#986）："前面等待时间长，后面又消息狂发"，反映用户对 IM 机器人响应节奏敏感，期待接近实时的交互反馈。
- **升级故障反馈**（#2741 描述）：2026-09-22 macOS 升级后 nsp-clawguard 问题反馈，用户日志显示旧 npm 安装记录指向不存在目录，阻断 gateway ready——说明升级路径的兼容检查仍需加强。
- **文档如实**（#983）：用户引用官方文档承诺的 "按下新的组合键修改快捷键" 功能，但实现未跟上文档，属于典型的产品功能与文档不一致问题。

## 8. 待处理积压
**⚠️ 长期未响应/未解决项，提醒维护者关注：**

| 项目 | 创建时间 | 持续时间 | 备注 |
|---|---|---|---|
| [#1006 配置文件重置](https://github.com/netease-youdao/LobsterAI/issues/1006) | 2026-03-28 | 近 6 个月 | 用户已用 workaround 自救，但属于核心体验缺失 |
| [#986 微信回复同步](https://github.com/netease-youdao/LobsterAI/issues/986) | 2026-03-27 | 近 6 个月 | stale 标记，无维护者回复 |
| [#981 Web Search 启动失败](https://github.com/netease-youdao/LobsterAI/issues/981) | 2026-03-27 | 近 6 个月 | 影响核心搜索能力，无维护者回复 |
| [#982 预设 Agents 国际化](https://github.com/netease-youdao/LobsterAI/issues/982) | 2026-03-27 | 近 6 个月 | 已定位代码位置，待排期 |
| [#983 快捷键组合键修改](https://github.com/netease-youdao/LobsterAI/issues/983) | 2026-03-27 | 近 6 个月 | 文档功能未实现 |
| [#1277 dependabot electron 升级](https://github.com/netease-youdao/LobsterAI/pull/1277) | 2026-04-02 | 近 6 个月 | electron 43→44 依赖升级 PR 长期未合并，存在安全/兼容隐患 |

**给维护者的提示**：5 条 stale Issue 全部来自 3 月 27-28 日，距今近半年仍未关闭或回复。建议安排一次批量 triage，明确「将修复 / 下版本排期 / 关闭」三种处理方式，避免社区产生「项目只管发版、不管反馈」的印象。

---

*本日报基于 GitHub 公开数据自动生成，统计窗口为 2026-09-22 至 2026-09-23 的 24 小时动态。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-23）

## 今日速览

Moltis 项目今日整体活跃度较低，处于典型的维护窗口期。过去 24 小时内无新 Issue 创建或关闭，无新版本发布，仅产生 1 条由 Dependabot 发起的依赖更新 PR。该 PR 目前处于待合并状态，未获得社区评论或反应。项目主分支开发节奏趋于平缓，社区讨论热度不足，需关注后续贡献者参与度变化。

## 版本发布

今日无新版本发布。

## 项目进展

今日无 PR 被合并或关闭，因此没有功能特性、Bug 修复或重构变更正式进入主分支。项目中唯一活跃的 PR 为依赖升级类，由 Dependabot 自动提交，不涉及业务逻辑变更。

- [#1284 [dependencies, rust] chore(deps): bump wasmtime-wasi from 36.0.9 to 36.0.11 in the cargo group across 1 directory](https://github.com/moltis-org/moltis/pull/1284)（待合并）

该 PR 将 wasmtime-wasi 从 36.0.9 升级至 36.0.11，属补丁版本范围内的常规安全/稳定性维护。项目今日整体代码基线未发生任何实际演进。

## 社区热点

今日无 Issues 或 PR 获得评论、点赞或其它形式的互动，未形成社区热点。

## Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。

## 功能请求与路线图信号

今日未收到新的功能请求。PR #1284 所涉及的 wasmtime-wasi 依赖升级属于纯技术债维护，不改变项目对外行为，不影响既定路线图。结合近期无新 Issue 和版本发布的情况，项目或在准备更大规模的版本更新，当前处于代码整合前的安静期。

## 用户反馈摘要

今日无 Issue 或 PR 评论产生，无法提炼到用户反馈。

## 待处理积压

[PR #1284](https://github.com/moltis-org/moltis/pull/1284) 由 Dependabot 创建，已在 Cargo 依赖组中发起 wasmtime-wasi 36.0.9 → 36.0.11 的升级，目前处于待合并状态。该 PR 属于常规自动化维护，建议维护者在工作周期内尽快审查并合并，以保持依赖链安全和最新。除此之外，今日无其他长期未响应的积压事项。

---

**项目健康度总结**：Moltis 今日处于稳定的低活跃状态，自动化依赖维护持续推进，但缺少社区互动与代码合并，活跃度指标偏低。建议关注后续社区讨论热度，并确保依赖更新 PR 及时处理。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 · 2026-09-23

## 今日速览

过去24小时 CoPaw 项目保持高活跃度：共产生 39 条 Issue 更新（28 条关闭，11 条新增/活跃）与 48 条 PR 更新（24 条待合并，24 条已合并/关闭），合并/关闭占比 50%，说明开发与问题收敛节奏良好。修复面集中在工具调用、模型 Provider 兼容性、Console 交互与桌面宠物插件等方向；新增 Bug 报告中的高严重度问题（LLM 超时后进程不可恢复）需要重点关注。整体来看，项目处于功能迭代与稳定性加固并行的健康状态。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日合并/关闭的 PR 主要覆盖以下方向，标志着相关功能或修复已合入主干：

- **修复桌面宠物插件的工具审批阻断问题**：`qwenpaw-pet` 插件启用时，Console 中的工具审批请求全部返回 HTTP 500，导致待处理的工具调用无法放行。PR [#7933](https://github.com/agentscope-ai/QwenPaw/pull/7933) 修复了 `resolve_request_wrapped() got an unexpected keyword argument 'actor'` 报错，使审批流程恢复可用；对应的另一份修复 PR [#7898](https://github.com/agentscope-ai/QwenPaw/pull/7898) 也已关闭。
- **测试基础设施跨平台加固**：PR [#7938](https://github.com/agentscope-ai/QwenPaw/pull/7938) 修复了上一批测试合入后导致的 Windows-latest 单元测试收集失败与可移植性问题，保障了 CI 稳定性。
- **Responses API Prompt Caching 支持**：PR [#6668](https://github.com/agentscope-ai/QwenPaw/pull/6668) 为 OpenAI Responses Provider 增加了可选的 prompt caching（GPT-5.6+）能力，支持通过 `extra_body` 传递 `prompt_cache_options`，属于模型层性能优化。
- **模型管理体验改进合入**：PR [#3819](https://github.com/agentscope-ai/QwenPaw/pull/3819) 用可浏览的远程模型列表 + 批量导入替换了原有的 "Auto Discover Models" 按钮，可搜索、勾选、批量添加模型，改善了模型配置效率。
- **本地模型工具调用支持增强**：PR [#1512](https://github.com/agentscope-ai/QwenPaw/pull/1512) 为本地模型增加了 OpenAI 风格嵌套工具调用的解析能力，保留 tool call id 与原始参数，并补充了回归测试。

整体来看，今日合入的变更以 Bug 修复和测试基建为主，同时包含模型层能力增强，为后续迭代积累了更稳定的底座。

---

## 社区热点

本周讨论最集中的 Issue 反映了三类用户诉求：

- **按会话/对话级别控制模型与思考强度**：[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)（8 评论）与 [#7062](https://github.com/agentscope-ai/QwenPaw/issues/7062)（3 评论）都指向同一需求：模型与 `reasoning_effort` 不应仅绑定在 agent 或 provider 级别，而应细粒度到会话。用户希望不同角色/对话使用不同思考深度，而不必为每个档位单独配置模型条目。此类需求在今日关闭列表中多次出现，表明该方向已被维护者重视并可能进入开发队列。
- **任务停止语义与 409 冲突**：[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)（8 评论）报告 UI 显示“已停止”但任务实际仍在执行，用户随后发送新消息则触发 409。同类问题也出现在 [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)（6 评论）与 [#7929](https://github.com/agentscope-ai/QwenPaw/issues/7929)（2 评论）。该系列问题直接关联“停止”操作的信任度与多任务并发用户体验，社区呼声较高，今日虽有关闭，但根因一致性需要关注。
- **上下文压缩导致 tool_call 结构丢失**：[#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856)（5 评论）报告 `LightContextManager.pre_reasoning()` 将结构化 tool_call 转为纯文本后引发 400 错误与消息计数不一致。这是长会话场景下的稳定性关键问题，仍处于 OPEN 状态，应该优先跟进。

---

## Bug 与稳定性

今日活跃的 Bug 按严重程度排列如下：

| 严重程度 | Issue | 状态 | 是否有 PR |
|---------|-------|------|----------|
| 🔴 严重 | [#7935](https://github.com/agentscope-ai/QwenPaw/issues/7935) LLM `Request timed out` 后进程永不自动恢复，后续所有请求持续超时，必须手动重启（2.2.1） | OPEN | 无 |
| 🔴 严重 | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) 工作区文件浏览器 SSE 监听在包含大型仓库时冻结整个服务器，所有频道停止响应 | OPEN | 无 |
| 🟠 中高 | [#7850](https://github.com/agentscope-ai/QwenPaw/issues/7850) 后台 `reload_driver` 读-改-写覆盖并发策略写入，造成驱动卡片策略丢失 | OPEN | 无 |
| 🟠 中高 | [#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856) 上下文压缩导致 tool_call 结构丢失并触发 400 错误 / 消息数量不匹配（v1.1.12.post2） | OPEN | 无 |
| 🟠 中 | [#7549](https://github.com/agentscope-ai/QwenPaw/issues/7549) Volcengine Ark Responses API 拒绝以 assistant 文本结尾的请求，400 `MissingParameter: partial` | OPEN | 无 |
| 🟡 中 | [#7890](https://github.com/agentscope-ai/QwenPaw/issues/7890) 零停机 reload 丢失插件注册的 runtime hook，middleware 保留，行为不一致 | CLOSED | 已修复（今日合入相关修复） |
| 🟡 中 | [#7934](https://github.com/agentscope-ai/QwenPaw/pull/7934)（PR） 网关返回 Cloudflare 挑战页时被误报为凭据错误，已在 PR 中修正分类逻辑 | OPEN | 本 PR 即为修复 |

其中 [#7890](https://github.com/agentscope-ai/QwenPaw/issues/7890) 今日已关闭，说明零停机 reload 的 hook 丢失问题已得到解决，但社区仍应关注 reload 语义一致性是否全面。

---

## 功能请求与路线图信号

今日活跃的功能诉求在前述热点中已部分体现（会话级模型/思考强度控制）。结合近期 PR，以下方向可能进入下一版本：

- **会话级模型指定与思考深度控制**：多个 Issue（[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)、[#7062](https://github.com/agentscope-ai/QwenPaw/issues/7062)、[#6229](https://github.com/agentscope-ai/QwenPaw/issues/6229)、[#4840](https://github.com/agentscope-ai/QwenPaw/issues/4840)）持续提出类似需求，且 PR [#7940](https://github.com/agentscope-ai/QwenPaw/pull/7940) 已在优化 Console 侧边栏交互，暗示 UI 层将同步重构，会话级选择器可能随之下一个版本落地。
- **模型自动降级/故障转移**：[#4882](https://github.com/agentscope-ai/QwenPaw/issues/4882)、[#5351](https://github.com/agentscope-ai/QwenPaw/issues/5351)、[#5572](https://github.com/agentscope-ai/QwenPaw/issues/5572) 均为同一方向（主模型故障/配额耗尽时自动切换备选模型），今日多个相关 Issue 被关闭，暗示该能力已进入实现阶段或被规划。
- **会话/项目式管理**：[#5283](https://github.com/agentscope-ai/QwenPaw/issues/5283)（参照 codex 以项目形式管理会话）与 PR [#7931](https://github.com/agentscope-ai/QwenPaw/pull/7931)（durable paginated transcript history）指向会话持久化与组织方式的升级，后者已提交 PR，可能优先合入。
- **主题/皮肤自定义**：[#5909](https://github.com/agentscope-ai/QwenPaw/issues/5909)、[#7287](https://github.com/agentscope-ai/QwenPaw/issues/7287) 表达了对外观定制的明确意愿，`configurable theme/skin module` 的设计提案已进入讨论阶段。

---

## 用户反馈摘要

- **任务控制是第一信任点**：多位用户报告“点了停止但实际仍在执行”（[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)），并因随后发送新消息触发 409（[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)、[#7929](https://github.com/agentscope-ai/QwenPaw/issues/7929)）。用户对停止操作的准确性高度敏感，侧面反映该交互直接决定对 AI 助手的信任度。
- **配置/工作目录理解成本高**：新用户反映“不知道在哪里选择文件夹”“退出去又变回旧目录”，且桌面端工作目录设置与预期不符（[#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705)）。这提示文档和引导需要进一步改善，尤其是桌面版。
- **Telegram 频道体验待优化**：Markdown 表格在 Telegram 上原样输出 `|` 和 `---`，阅读体验受影响（[#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)），反映多平台消息格式兼容性仍需打磨。
- **子代理可见性不足**：后台子代理任务运行时无法查看内部进展，执行后内容不完整（[#4923](https://github.com/agentscope-ai/QwenPaw/issues/4923)），表明多智能体协作的透明度和可观测性仍是用户关注点。
- **记忆文件被误覆盖**：用户担心 MEMORY/AGENTS/SOUL 文件可能被模型通过 `write_file` 意外覆盖，期望在工具层强制只读（[#4020](https://github.com/agentscope-ai/QwenPaw/issues/4020)），反映用户对数据安全与人格一致性的期待。

---

## 待处理积压

| 类型 | 编号 | 说明 | 建议 |
|------|------|------|------|
| Issue（严重） | [#5856](https://github.com/agentscope-ai/QwenPaw/issues/5856) | 上下文压缩导致 tool_call 结构丢失，引发 400 错误，自 2026-07-08 开启，当前仍 OPEN | 建议列入近期 P0 修复计划 |
| Issue（严重） | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | 工作区文件浏览器在大型仓库场景冻结整个服务器，各频道消息处理中断 | 需优先处理事件循环阻塞问题 |
| Issue（中高） | [#7549](https://github.com/agentscope-ai/QwenPaw/issues/7549) | Volcengine Ark 提供商拒绝以 assistant 文本结尾的请求，影响特定模型使用 | 建议适配 Ark API 要求 |
| Issue（一般） | [#3251](https://github.com/agentscope-ai/QwenPaw/issues/3251) | 前端页面无法修改模型的 base URL，自 2026-04-10 开启 | 需确认是否为设计如此或历史遗留 |
| PR | [#4938](https://github.com/agentscope-ai/QwenPaw/pull/4938) | 插件扩展演示，自 2026-06-03 开启并处于 Under Review | 若不再计划合入，建议明确关闭以免积压 |
| PR | [#4955](https://github.com/agentscope-ai/QwenPaw/pull/4955) | 为后台子代理添加生命周期事件（心跳/取消传播），自 2026-06-04 开启并处于 Under Review | 对多智能体稳定性有价值，建议推动评审 |

---

**项目健康度评估**：总体良好——Issue 关闭率高（28/39）、PR 合并/关闭占比 50%、测试覆盖率持续提升、多个长期悬而未决的问题已合入修复。但两个高严重度 Bug（`#7935` 超时后进程不可恢复、`#7721` SSE 冻结服务器）目前无对应修复 PR，需优先投入；从 Issue 关闭趋势看，会话级模型控制、模型自动降级等功能已进入开发流程，下一版本值得期待。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 — 2026-09-23

## 1. 今日速览

ZeptoClaw 项目在过去 24 小时内处于**低活跃度但健康的维护状态**。今日无新 Issue、无 Issue 关闭、无新版本发布，表明项目处于相对平稳的迭代周期。PR 方面共有 3 条更新，全部为 Dependabot 发起的**自动化依赖更新**（待合并状态），涉及 GitHub Actions 工具链与 Rust 邮件解析库。虽无功能性代码合并或新特性落地，但持续进行依赖维护反映了项目在供应链安全与依赖新鲜度上的规范性投入。整体判断：项目健康，维护节奏稳定，社区讨论暂处低谷。

---

## 3. 项目进展

今日无已合并或已关闭的 PR，项目核心代码无功能性推进。但以下 **3 个待合并 PR** 展示了项目在构建与依赖层面的持续维护投入：

- **[#704] fix(deps): bump docker/build-push-action from 7.2.0 to 7.3.0** — 由 @dependabot[bot] 提交，将 CI 中 Docker 镜像构建与推送 Action 从 v7.2.0 升级至 v7.3.0，属于 CI 工具链的常规维护更新。
  🔗 https://github.com/qhkm/zeptoclaw/pull/704

- **[#706] fix(deps): bump actions/checkout from 6.0.2 to 7.0.1** — 由 @dependabot[bot] 提交，将代码检出 Action 从 v6.0.2 跨大版本升级至 v7.0.1。考虑到 major version 跨越，**建议维护者关注可能的破坏性变更**后再合并。
  🔗 https://github.com/qhkm/zeptoclaw/pull/706

- **[#705] fix(deps): bump mail-parser from 0.11.3 to 0.11.9** — 由 @dependabot[bot] 提交，将 Rust 邮件解析库 `mail-parser` 从 0.11.3 升级至 0.11.9（含多个 patch 版本修复），涉及项目核心邮件处理能力的基础依赖，建议及时合并以获取上游 bug 修复。
  🔗 https://github.com/qhkm/zeptoclaw/pull/705

**项目进展评估**：今日无功能推进，但依赖更新 PR 的持续生成与待合并状态表明项目处于**维护模式**。如果这些 PR 被合并，项目将获得更新更稳定的 CI 工具链与邮件解析能力。

---

## 4. 社区热点

今日无讨论活跃或评论数较高的 Issue / PR。三条 PR 均来自 Dependabot 自动化流程，**无开发者或用户参与评论**，亦无 👍 反应。项目社区互动处于低谷，但这在自动化依赖更新占主导的日常中属于正常现象，不构成健康度隐忧。

---

## 5. Bug 与稳定性

今日**无新增 Bug 报告**、无崩溃或回归问题提交。

不过，针对邮件解析相关的回归测试覆盖问题，结合此前 Issue #437 关闭情况（该问题已关闭，但邮件解析回归测试未能包含依赖自定义 from 地址的用例），建议项目维护者持续关注 `mail-parser` 升级（PR #705）是否会对自定义 `From` 地址的处理逻辑带来潜在回归。目前该 PR 尚在待合并状态，合并前建议运行完整测试套件，特别是邮件解析相关用例。

---

## 6. 功能请求与路线图信号

今日无新功能请求提交。从依赖更新方向来看，项目正在紧跟上游工具链更新（GitHub Actions），未发现明显的路线图变化信号。

---

## 7. 用户反馈摘要

今日无 Issue 评论或用户反馈产生。

---

## 8. 待处理积压

今日**无长期未响应的重要 Issue 或 PR**。三条 PR 均为 2026-09-22 创建，目前处于正常待合并窗口期，尚未构成积压。建议维护者优先关注 **PR #706**（actions/checkout 跨大版本升级），确认兼容性后尽早合并或给出反馈，避免积压。

---

*本日报基于 qhkm/zeptoclaw 公开 GitHub 数据自动生成，数据统计周期为 2026-09-22 至 2026-09-23。*

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-09-23

## 1. 今日速览

今日项目整体活跃度较低：Issues 与 PR 在过去 24 小时内均无新增或变动，社区讨论暂停于平稳状态。项目发布了 v1.9.20（TK Copilot）版本，带来多项 Affiliate 工作台体验优化与流程改进，表明维护团队仍保持正常发布节奏。综合来看，项目处于"低讨论、稳发布"的良性维护期，无紧急问题或回归信号。

## 2. 版本发布

**[v1.9.20 — TK Copilot v1.9.20](https://github.com/gaoyangz77/easyclaw/releases)**

本次发布聚焦 Affiliate 工作台的操作体验与入驻流程改进，主要内容包括：

- **搜索式商店选择器**：在 Affiliate 工作台中新增可搜索的商店选择器，帮助用户在大量店铺中快速定位目标，减少手动滚动查找的时间成本。
- **教程与引导更新**：刷新了操作教程，提供更精确的 campaign 设置指导，降低新手上手门槛。
- **日本店铺入驻支持**：新增对日本 shop 入驻流程的支持，扩大平台覆盖范围。
- **campaign 名称预校验**：在提交前对 campaign 名称进行合法性验证，减少因命名不符合规范而产生的返工。
- **AI 模型拒绝区分**：在 campaign 创建流程中，明确区分因 AI 模型拒绝导致的失败与其他类型错误，便于用户对症处理。

**破坏性变更**：无。本次更新为功能增强与体验优化，未引入破坏性变更。

**迁移注意事项**：无特殊迁移要求，升级即可。

## 3. 项目进展

今日无 PR 合并或关闭记录。不过，v1.9.20 的发布本身就代表项目在持续向前推进，尤其是以下方向值得关注：

- **国际化支持**：日本店铺入驻支持表明项目正扩展至更多地域市场，这往往是业务拓展的重要信号。
- **流程可观测性**：区分 AI 模型拒绝与其他错误，说明项目在实际使用中积累了反馈，正在提升错误处理的可诊断性。

从版本更新频率来看，项目保持约每 1-2 周一个迭代的节奏，整体推进稳定。

## 4. 社区热点

今日无新增或活跃的 Issues / PRs，无高讨论度帖子。

上一个版本（v1.9.19）的 release 页面依旧可供参考：[v1.9.19 Release 讨论](https://github.com/gaoyangz77/easyclaw/releases)

## 5. Bug 与稳定性

今日未报告新的 Bug、崩溃或回归问题。v1.9.20 中"AI 模型拒绝区分"功能暗示在真实使用场景中，用户曾经面临"分不清是 AI 拒绝还是系统错误"的困惑，该问题已在本次版本中得到改善，属于前置问题的修复。

## 6. 功能请求与路线图信号

虽然今日无新功能请求提交，但从 v1.9.20 的发布内容可以推断以下路线图信号：

- **多地域市场支持**：日本店铺入驻功能表明项目正从单一市场向多地域扩展，未来可能继续增加更多国家和地区的支持。
- **流程引导与校验加强**：campaign 名称预校验、教程更新等细节改进，指向项目正逐步从"能用"向"好用"过渡，注重用户操作成功率。
- **达人联（Affiliate）生态深化**：本次更新明确涉及达人联（affiliate）工作台的多个优化点，说明该模块是当前迭代的重点方向。

## 7. 用户反馈摘要

今日无直接的用户评论或 Issue 反馈可供分析。

结合发布内容推测，用户关注点可能集中在：
- 运营多店铺时的查找效率问题（对应搜索式商店选择器）
- 新商家（特别是日本商家）的入驻流程顺滑度（对应店铺入驻支持）
- 创建 campaign 时的错误类型可理解性（对应 AI 模型拒绝区分）

随着 v1.9.20 的发布，这些痛点预计将得到缓解，可在下一版本周期中观察用户反馈是否因此变化。

## 8. 待处理积压

今日无长期未响应或积压的 Issue / PR 记录。

当前项目健康度评估：**良好**。虽社区讨论不活跃，但版本更新节奏稳定，无积压问题，修复方向明确。

---

*数据来源：EasyClaw GitHub 仓库（github.com/gaoyangz77/easyclaw）*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*