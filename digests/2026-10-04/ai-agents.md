# OpenClaw 生态日报 2026-10-04

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-04 03:17 UTC

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

# OpenClaw 开源项目动态日报 — 2026-10-04


## 1. 今日速览

过去24小时OpenClaw项目保持极高活跃度：**500条Issue更新**（390条新开/活跃，110条关闭）、**500条PR更新**（289条待合并，211条已合并/关闭），并发布了**v2026.9.8**版本。社区讨论高度聚焦于**三块硬骨头**：SQLite数据库膨胀与I/O压力（#143524、#160386）、更新/升级流程的可靠性（#164066、#157818、#164504），以及会话状态与消息投递的一致性（#159612、#161976、#137332）。值得注意的是，v2026.9.8的发布并未完全平息更新类问题——今日仍有新Issue #164066报告该版本的托管更新依然回滚，说明9.8遗漏了主分支上的两项关键修复。项目整体处于**密集修复+大规模重构并行**的状态。

- **Issue总量**：500条更新（390条活跃 / 110条关闭）
- **PR总量**：500条更新（289条待合并 / 211条已合并或关闭）
- **新版本**：v2026.9.8（58 commits · 43 PRs · 21 contributors）
- **活跃讨论**：#143524（105条评论）、#119720（22条）、#137332（21条）
- **最严重问题**：3个P0级Bug仍处于打开状态，均与数据库/状态管理相关


## 2. 版本发布 — v2026.9.8

**发布时间**：2026-10-03
**规模**：58 commits · 43 pull requests · 21 contributors
**发布标签**：`openclaw-release-publication:docs-v1`

**发布说明与变更日志**：Release notes 与 changelog 内容相同，提供两种格式，详见 [Release notes](https://docs.openclaw.ai/releases/2026.9.8)。

**注意事项**：今日新开Issue #164066指出，v2026.9.8的托管更新仍然回滚——激活Doctor以“undergoing offline maintenance”拒绝，而实际修复（#160671、#163803）只存在于main分支而未进入9.8。**建议仍在2026.9.5及更早版本的用户暂缓通过chat触发的托管更新**，或等待包含完整修复的下一个补丁版本。

🔗 [查看 Release](https://github.com/openclaw/openclaw/releases) · [Issue #164066](https://github.com/openclaw/openclaw/issues/164066)


## 3. 项目进展

今日有211条PR被合并或关闭，其中以下合并/关闭的PR值得关注（因数据未区分单个PR的合并时间，以下基于PR状态与更新时间推断）：

**重点修复与功能推进**：

- **#164728 | fix(daemon)：从Doctor恢复禁用的Windows Gateway任务** — 解决Windows上已注册但被禁用的Gateway任务无法通过Doctor恢复的问题。已关闭。 [PR链接](https://github.com/openclaw/openclaw/pull/164728)

- **#164504 | fix(update)：在完整性限制下降级候选校验而非拒绝更新** — 修复候选包超过50,000条/1GiB完整性限制时更新失败的问题，让回滚未失败时更新可以继续。已关闭。 [PR链接](https://github.com/openclaw/openclaw/pull/164504)

- **#137332 已关闭** — 混合终端 requester-settle 批次在所有权检查后无限重试的问题被修复，影响标注为 P1 / 消息丢失 / 会话状态。 [Issue链接](https://github.com/openclaw/openclaw/issues/137332)

**大规模重构推进**：维护者 @steipete 提交了多份“deslop”系列重构PR，覆盖核心子系统、Gateway、包管理、配置与会话、QA Lab、Control UI等（#164708、#164707、#164603、#164645、#164643、#164577）。这些重构声明“无用户可见变化”，目的在于降低复杂度、消除重复代码，为后续迭代铺路。

**其他值得关注的开放PR（合入后影响面较大）**：

- **#164592 | feat：配置共享hook/cron容量和有界Gateway停止** — 新增 `cron.maxConcurrentRuns`（默认8）等配置项。 [PR链接](https://github.com/openclaw/openclaw/pull/164592)

- **#164501 | feat：增加版本化升级配方** — 为旧版本安装提供无需旧运行时即可启动的认证升级路径。 [PR链接](https://github.com/openclaw/openclaw/pull/164501)

- **#158568 | fix(agents)：拒绝畸形工具调用后继续执行** — 避免provider拒绝单个工具调用导致整个run终止。 [PR链接](https://github.com/openclaw/openclaw/pull/158568)


## 4. 社区热点

### 🥇 #143524 — SQLite WAL无限增长（105条评论）
**[Bug]: Agent SQLite WAL grows to 1.4–2.8 GB in days despite wal_autocheckpoint=1000; blocks gateway startup (Windows)**
- **标签**：P0、崩溃循环、UX发布阻塞、金色小虾
- **核心诉求**：Windows单网关部署，单个agent的SQLite WAL文件不断增长至2.8GB且从不checkpoint，手动清理后数天内再次膨胀至1.4GB+。这直接阻塞网关启动。
- **分析**：这是**当前社区最关注的稳定性问题**，105条评论说明大量用户受困于此。至今无fix PR关联，维护者仍在排查。

🔗 https://github.com/openclaw/openclaw/issues/143524

### 🥈 #119720 — 同步持久化阻塞Gateway事件循环（22条评论）
**Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale**
- **标签**：P1、崩溃循环、会话状态、钻石龙虾
- **核心诉求**：agent的同步持久化和transcript维护在大规模运行时阻塞Gateway事件循环。
- **分析**：用户 @todddickerson 详细记录了落地部分修复后的现状，此前 #140231 和 #138984 已修复部分相关路径，但问题未完全解决。

🔗 https://github.com/openclaw/openclaw/issues/119720

### 🥉 #137332 — 混合终端批次无限重试（21条评论，已关闭）
**[Bug]: mixed terminal requester-settle batches retry forever after ownership check**
- **标签**：P1、消息丢失、钻石龙虾、来源可复现
- **分析**：虽已关闭但讨论热度高（21条评论），说明社区对“子代理完成状态的可靠确认”路径有持续关注。这是修复后关闭的典型案例。

🔗 https://github.com/openclaw/openclaw/issues/137332

**整体观察**：社区讨论热度与**数据完整性、消息可靠性**强相关。最受关注的问题不是单一功能缺失，而是**长期运行后的稳定性与数据一致性**。


## 5. Bug 与稳定性

### P0 / 发布阻塞（3项，均无fix PR）

| Issue | 问题描述 | Fix PR |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Windows上SQLite WAL增长至2.8GB，阻塞网关启动（105条评论） | ❌ 无 |
| [#159612](https://github.com/openclaw/openclaw/issues/159612) | 子代理完成结算无限重试："owner changed before settlement"每一轮重新注入结果（14条评论） | ❌ 无 |
| [#164066](https://github.com/openclaw/openclaw/issues/164066) | v2026.9.8托管更新仍回滚：激活Doctor拒绝（#160671和#163803不在9.8中） | ❌ 无（修复在main上） |

### P1 / 高严重度（精选）

| Issue | 问题描述 | Fix PR |
|---|---|---|
| [#160386](https://github.com/openclaw/openclaw/issues/160386) | 2026.9.6在大会话存储上造成严重SQLite I/O压力、WebUI RPC超时 | ❌ 无 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 泄漏未回收的hook/tool子进程，造成僵尸进程累积和运行时退化 | ❌ 无 |
| [#161379](https://github.com/openclaw/openclaw/issues/161379) | 网关永久占用单核：模型目录刷新循环（TTL 60s < 每agent刷新时间） | ❌ 无 |
| [#158126](https://github.com/openclaw/openclaw/issues/158126) | 网关关闭步骤失败："Worker environment inventory has closed" → exit 1 | ❌ 无 |
| [#121617](https://github.com/openclaw/openclaw/issues/121617) | 压缩后"Already compacted"误判为终结故障，同轮内第二次压缩失败 | ❌ 无 |
| [#162031](https://github.com/openclaw/openclaw/issues/162031) | 2026.9.7网关崩溃循环：运行时工具组装时"Unhandled promise rejection: undefined"（已关闭） | ✅ #162031 已关闭 |

### 新出现的Bug（今日新开）

- **#164394** — Control UI WebChat 转录在滚动到历史中间时持续微抖动（9条评论） [链接](https://github.com/openclaw/openclaw/issues/164394)
- **#164515**（由PR #164721关联关闭）— `sessions_send` 消息在后续历史回放时文本变化 [PR链接](https://github.com/openclaw/openclaw/pull/164721)

**趋势分析**：SQLite相关（WAL膨胀、I/O压力、数据库锁定）是当前最集中的稳定性短板，且在Windows平台尤为突出。更新/回滚可靠性是第二大类别，9.8版本仍未能完全解决。此外多个P1级问题长期打开且无关联fix PR，可能成为下一个版本发布的阻塞项。


## 6. 功能请求与路线图信号

结合今日Issues与PR，以下几个功能信号值得关注：

### 可能进入下一版本

1. **可配置共享hook/cron容量**（[#164592 PR](https://github.com/openclaw/openclaw/pull/164592)）
   - 新增 `cron.maxConcurrentRuns`（默认8）、共享cron-agent/hook执行上限及Gateway停止总预算
   - 状态：开放，等待维护者查看

2. **版本化升级配方**（[#164501 PR](https://github.com/openclaw/openclaw/pull/164501)）
   - 为旧版本提供无需旧运行时即可启动的认证升级路径，可恢复中断的更新
   - 状态：需要证明，安全敏感变更待审查
   - 这直接回应了社区多个更新失败Issue（#157818、#164066）

3. **可选TOTP验证exec批准**（[#67440](https://github.com/openclaw/openclaw/issues/67440)）
   - 4月提出，至今仅有6条评论，但安全价值高。当前没有任何fix PR关联，短期可能不会落地

4. **任务级决策模型RFC**（#156341，今日已关闭）— 已关闭未采纳

5. **可配置记忆召回资格与索引排除路径**（[#101422](https://github.com/openclaw/openclaw/issues/101422)）— 持续6条评论+1个👍

### 短期可能纳入的修复类PR

- **#164723 | fix(copilot)：将池化工具处理器锚定到其尝试的异步作用域** — Copilot代理从第二轮对话起每次工具调用都失败 [PR链接](https://github.com/openclaw/openclaw/pull/164723)
- **#164726 | fix(duckduckgo)：发送真实User-Agent而非伪装浏览器UA** — DuckDuckGo搜索以202 bot-challenge页拒绝请求 [PR链接](https://github.com/openclaw/openclaw/pull/164726)
- **#164719 | fix(heartbeat)：在对应会话中回复该会话自己的后台命令完成** — 修复heartbeat target "none"时exec完成不回话的问题 [PR链接](https://github.com/openclaw/openclaw/pull/164719)


## 7. 用户反馈摘要

### 真实用户痛点

1. **数据库维护是最大痛点**：多位用户反馈数据库文件无限增长、完整性检查冗余、I/O压力导致WebUI超时（#143524、#160386、#118885）。用户 @u00018300-collab 报告在464MB数据库、33个会话、零空闲页的情况下会话回收需9-47秒，远超5秒busy timeout，导致“database is locked”错误。

2. **更新/回滚体验不佳**：用户 @amarsmission 报告7-agent安装的 `openclaw update` 因300秒canary上限失败；用户 @DasX 在9.8发布当天就报告托管更新仍回滚。这严重影响了用户对新版本的信任。

3. **子代理/消息可靠性问题**：多个Issue指向子代理完成状态误判（#159612）、WhatsApp重启后回复丢失（#161976）、消息重复注入（#121187）等消息投递问题。

4. **CLI后端体验分裂**：@spunzon 报告claude-cli后端下assistant轮次渲染两次（实时逐块+拼接聚合记录），WebUI和Android受影响而Telegram不受影响。

### 积极信号

- **社区参与度高**：21位贡献者参与v2026.9.8，今日有大量新贡献者提交PR（如 @yahyadeveloper9 的README贡献者添加）。
- **维护者响应积极**：@steipete 主导的大规模重构系列说明项目正在主动降低技术债。
- **反馈闭环**：部分问题已通过main分支修复（#160671、#163803），等待随下个版本发布。

### 用户不满点

- **修复速度与发布节奏不匹配**：多个修复合入main但未进入已发布的9.8（#164066），用户不得不等待下个版本。
- **Windows平台支持不足**：WAL增长（#143524）、会话创建失败（#161953）、Gateway任务恢复（#164728）等多个Windows专属问题。


## 8. 待处理积压

### 长期未关闭的高优先级Issue（无fix PR，需维护者关注）

| Issue | 创建时间 | 标签 | 评论 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | P1、消息丢失、崩溃循环 | 17 |
| [#81182](https://github.com/openclaw/openclaw/issues/81182) | 2026-05-12 | P1、会话状态 | 8 |
| [#81595](https://github.com/openclaw/openclaw/issues/81595) | 2026-05-14 | P2、可观测性 | 6 |
| [#67440](https://github.com/openclaw/openclaw/issues/67440) | 2026-04-16 | 安全增强、TOTP | 6 |
| [#121953](https://github.com/openclaw/openclaw/issues/121953) | 2026-08-11 | P1、DeepSeek cron停顿 | 13 |
| [#144291](https://github.com/openclaw/openclaw/issues/144291) | 2026-09-10 | P1、配置热重载中止所有in-flight轮次 | 11 |

### 今日最值得维护者优先关注的积压

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)**（105条评论，P0，无fix） — SQLite WAL无限增长是目前社区影响面最大、讨论度最高的问题。建议优先定位并规划修复。
2. **[#119720](https://github.com/openclaw/openclaw/issues/119720)**（22条评论，P1，无fix） — 同步持久化阻塞Gateway事件循环

---

## 横向生态对比

# 个人AI助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-10-04**
**分析范围：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw、EasyClaw**


## 1. 生态全景

个人AI助手/自主智能体开源生态正处于**密集修复与架构演进并行**的高速迭代期，以OpenClaw为首的项目日处理Issue/PR总量达千级，展现出极强的社区活力。生态内部的关注焦点正从单一功能开发转向**长期运行稳定性与数据一致性**，SQLite存储膨胀、更新/回滚可靠性、子代理消息不丢失等基础设施级问题成为多项目共同攻坚的核心。同时，**移动端适配、MCP生态深度集成、本地模型支持**等面向真实用户体验的差异化竞争正在加速展开。整体而言，该生态已越过“概念验证”阶段，进入“大规模真实部署后的稳定性补课期”。


## 2. 各项目活跃度对比

| 项目 | Issues更新（新开/活跃） | PR更新（待合并/已合并） | Release | 合并率 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（390活跃/110关闭） | 500（289待合并/211合并） | ✅ v2026.9.8 | 42.2% | 🟡 **高活跃、高负载**。3个P0未修，SQLite问题严重，但修复速度极快 |
| **NanoBot** | 2 | 46（25待合并/21合并） | ❌ | 45.7% | 🟢 **健康高速迭代**。无重大回归，移动端和MCP方向推进扎实 |
| **Zeroclaw** | 50（43活跃/7关闭） | 50（49待合并/1合并） | ❌ | 2.0% | 🔴 **审查瓶颈明显**。海量PR积压，S0级数据隔离泄漏待合并；但关闭6个issue含多个P1，修复推进实在 |
| **NanoClaw** | 7（4活跃/3关闭） | 31（18待合并/13合并） | ❌ | 41.9% | 🟢 **稳定高效**。安全修复和更新流程改进为主，高安全Issue #2970已闭环 |
| **CoPaw** | 7（6活跃/1关闭） | 10（10待合并/0合并） | ❌ | 0% | 🟡 **修复就绪但合并停滞**。10个PR覆盖多项关键修复，审核吞吐成瓶颈 |
| **PicoClaw** | 1 | 0 | ❌ | — | 🟠 **低活跃待响应**。QQ接口过期bug持续8天未处理 |
| **IronClaw** | 1 | 0 | ❌ | — | 🟠 **低活跃**。新Issue阻塞macOS本地开发核心路径，24小时无响应 |
| **LobsterAI** | 6（全为stale） | 1（1待合并） | ❌ | 0% | 🔴 **维护停滞**。多个3月提出的高严重度Bug未修复，stale bot正在清理 |
| TinyClaw / Moltis / ZeptoClaw / EasyClaw | 0 | 0 | ❌ | — | ⚪ **无活动** |


## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的绝对核心和参照基准**，其社区规模（日更新500+500）、发布频率（月度级版本）和贡献者数量（单版本21人）远超同类项目。其优势在于：

- **全功能旗舰定位**：覆盖Gateway、多终端、子代理、Hook/Cron、Doctor等完整功能面，是生态中“什么都有”的综合性框架；
- **大规模重构与技术债清理**：通过“deslop”系列重构主动降低复杂度，为后续迭代铺路，技术上更具前瞻性；
- **社区反馈闭环成熟**：P0/P1问题虽然多，但Issue追踪细致、PR关联清晰，即便存在修复未进版本的延迟，整体仍处于“高负载但有序”的状态。

与同类相比，OpenClaw的**问题是生态复杂度的集中体现**——SQLite膨胀、更新回滚、会话一致性等问题在NanoClaw（更新流程）、Zeroclaw（SQLite）、LobsterAI（SQLite级联删除）中均有对应版本，但OpenClaw的规模和数据使其成为最受关注的风向标。


## 4. 共同关注的技术方向

**（按多项目共鸣强度排序）**

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **SQLite存储与数据一致性** | OpenClaw（#143524 WAL膨胀2.8GB）、LobsterAI（#879外键未启用）、Zeroclaw（持久化相关）、NanoBot（cron等数据流） | 数据库无限增长、I/O压力、锁等待超时，长期运行后稳定性成最大痛点 |
| **更新/回滚流程可靠性** | OpenClaw（#164066 9.8回滚）、NanoClaw（#4004/#4003 更新崩溃/回滚删数据）、Zeroclaw（大量待审更新PR） | 用户对更新机制缺乏信任，多个项目均在修复更新过程中崩溃、回滚不干净、修复未进版本等问题 |
| **子代理/消息投递可靠性** | OpenClaw（#137332无限重试、#159612结算重试）、NanoClaw（#3918消息不丢失不重复）、Zeroclaw（#11239共享内存泄漏）、CoPaw（#8095消息归属错误） | 子代理完成状态确认、消息不丢失不重复、会话归属正确性是跨项目的共性难题 |
| **Windows/macOS跨平台支持** | OpenClaw（#143524 Windows WAL、#164728 Gateway任务恢复）、Zeroclaw（#10734 Windows栈溢出）、IronClaw（#8122 macOS凭据失败） | Windows平台稳定性（栈溢出、数据库、服务恢复）和macOS凭据管理是共性短板 |
| **后台任务可观测性** | NanoClaw（#3223调度错误静默丢弃）、OpenClaw（#159612结算状态不可见）、Zeroclaw（#6105 cron上下文缺失） | 定时任务、后台维护操作失败时用户无法感知，错误信息不可路由 |
| **cron/定时任务能力** | OpenClaw（#164592 可配置并发）、NanoBot（#5922 DST时区偏移）、Zeroclaw（#6105 cron上下文） | 定时任务的时区处理、并发控制、上下文传递需要更精细的设计 |
| **移动端体验** | NanoBot（#6021-6023触控优化、#5640移动键盘）、OpenClaw（Control UI WebChat微抖动#164394） | 移动WebUI正在从“可用”走向“好用”，输入、导航、渲染均需适配 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能自主智能体框架：多终端、子代理、Hook/Cron、Gateway、Doctor | 高级开发者/团队，追求最大灵活性与生态兼容性 | Node.js全栈；大规模重构中；SQLite为基础设施；Windows/Gateway架构 |
| **NanoBot** | WebUI体验、MCP深度集成、移动端适配、技能记忆 | 产品型开发者/个人用户，重视交互与开箱即用 | Python；MCP为集成主路径；WebUI触控/TUI输入优化活跃 |
| **Zeroclaw** | 高性能Rust运行时、安全加固、CI效能、跨平台可靠性 | 基础设施开发者/对性能和安全要求高的用户 | Rust；RpcDispatcher、Seatbelt、共享内存平面；强调稳定性与运行时机能 |
| **NanoClaw** | 更新/回滚流程、安全加固、CI自动化、OneCLI | 注重部署可靠性和安全合规的用户 | TypeScript；更新通道机制（stable/beta/main）；强调过程安全 |
| **CoPaw** | Console/控制台体验、会话管理、Provider兼容性 | 自托管用户、深度依赖多Agent编排的场景 | QwenPaw系；“体验正确性”修复潮，聚焦会话一致性 |
| **PicoClaw** | 即时通讯平台适配（QQ等） | 轻量级个人用户 | 低活跃维护，跟随上游平台接口变化 |
| **IronClaw** | 本地开发工作流（serve/doctor） | macOS/本地开发者 | 官方CLI与扩展系统；凭据管理与Doctor诊断 |
| **LobsterAI** | 桌面客户端+AI辅助研发 | 中文用户、桌面端深度用户 | Electron类桌面应用；广告/商业化内置；sql.js存储 |

**关键差异**：OpenClaw走“大而全”平台路线，Zeroclaw是“高性能Rust实现”，NanoBot偏“体验优先的MCP前端”，NanoClaw聚焦“过程安全”，CoPaw深耕“控制台会话管理”。这些项目共同构成从底层运行时到前端体验的全栈生态图谱。


## 6. 社区热度与成熟度

**第一梯队：快速迭代阶段（日PR量30+，修复合并推进快）**
- **OpenClaw**：极大规模、高发布频率、重度社区反馈，处于“密集修复+大规模重构”并存状态
- **NanoBot**：PR合并率高，移动端/MCP方向连续落地，项目健康度最佳
- **Zeroclaw**：开发提交密集但审查瓶颈突出，正处于“功能产出→待审积压”阶段，需关注合并效率
- **NanoClaw**：合并节奏稳定，安全/更新流程双线推进，是除OpenClaw外最扎实的迭代者

**第二梯队：质量巩固阶段（PR量少、以修复和兼容性为主）**
- **CoPaw**：修复PR已就绪但合并停滞，处于“功能正确性修复潮”积蓄期
- **PicoClaw**、**IronClaw**：低活跃，以单点Bug反馈为主，等待维护者响应

**第三梯队：维护停滞/无活动**
- **LobsterAI**：stale bot介入，长期Bug无修复，社区热度消退
- **TinyClaw / Moltis / ZeptoClaw / EasyClaw**：24小时内完全无动态，处于休眠状态


## 7. 值得关注的趋势信号

**趋势一：数据基础设施成为第一竞争力**
SQLite WAL膨胀（OpenClaw）、外键约束失效（LobsterAI）、共享内存泄漏（Zeroclaw）——跨项目涌向同一类问题，说明AI智能体长期运行后的数据文件管理能力正在取代单点功能，成为用户留存的核心门槛。建议开发者将“万级消息/百GB级存储下的稳定性”纳入架构设计的默认考量。

**趋势二：更新机制是“信任的最后一公里”**
从OpenClaw 9.8回滚到NanoClaw更新删数据再到Zeroclaw安全PR积压，更新/回滚的可靠性直接影响用户对项目的信任度。**可版本化升级路径、更新通道（stable/beta/main）、回滚安全**正在成为标配。对开发者而言，发布流程的自动化与原子性是长期主义的体现。

**趋势三：消息不丢失、不重复是智能体走向生产环境的硬性要求**
子代理状态确认（OpenClaw #159612）、回复不丢不重（NanoClaw #3918）、消息归属错误（CoPaw #8095）——当智能体从聊天工具走向自动化工作流（调度任务、子代理编排），消息投递的可靠性就成为用户最敏感的神经。这一方向值得投入系统性的设计而非补丁式修复。

**趋势四：移动端与本地模型是下一波用户增量的入口**
NanoBot在移动WebUI上的连续投入与OpenClaw的Control UI微抖动修复共存，预示移动场景正从“附加品”变为“一等公民”。同时，NanoClaw #3643本地模型30分钟硬限制被用户强烈反感，说明本地模型推理的时长弹性是尚未被满足的刚需。

**趋势五：后台自动化任务的可观测性缺口明显**
NanoClaw调度错误静默丢弃、Zeroclaw cron上下文缺失、NanoBot请求静默压缩——用户的自动化工作流（scheduled tasks、dream/heartbeat、后台维护）正在增加，但失败可感知、上下文可追踪、通知可路由的能力尚未跟上。这是生态“从辅助对话到自主运行”转变中的必然阵痛，也是差异化机会所在。

---

*报告完*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-04

## 今日速览

项目今日活跃度极高，过去 24 小时共有 46 条 PR 更新和 2 条新 Issue，其中 21 条 PR 已合并/关闭，25 条待合并，显示出强劲的迭代节奏。重点集中在 WebUI 触控优化（批量合并）、MCP 连接稳健性、TUI 输入稳定性三条主线上，并出现了 1 条 p0 级（最高优先级）Bug 修复 PR。Issue 侧仅 2 条，整体社区反馈平稳，未见集中回归或重大故障报告，项目处于健康、高速的持续迭代状态。

---

## 项目进展

今日共 21 条 PR 被合并/关闭（列表展示 5 条），核心进展如下：

### WebUI 移动端体验显著增强（3 条合并）
- [PR #6023](https://github.com/HKUDS/nanobot/pull/6023) — **放大预览控件触控目标**：为移动设备优化预览标签页、关闭按钮等控件的触控区域，不影响桌面端图标密度。
- [PR #6022](https://github.com/HKUDS/nanobot/pull/6022) — **触控导航保持键盘可见**：修复 iOS 键盘弹出时页面视口偏移问题，使导航栏与输入框始终处于可视区域。
- [PR #6021](https://github.com/HKUDS/nanobot/pull/6021) — **隐藏不可用的网站预览操作**：避免在 Safari 等无法渲染隔离预览的浏览器中显示无效操作入口。

### 移动键盘输入与流式发送落地（1 条合并，9 月 3 日→10 月 4 日）
- [PR #5640](https://github.com/HKUDS/nanobot/pull/5640) — 手机/平板等粗指针设备上，普通 Enter 键改为插入换行（避免误发送），通过发送按钮提交；同时支持活跃响应期间发送新草稿，桌面端行为不变。该 PR 经历约一个月的开发与审查后成功合并，是移动端体验的重要里程碑。

### API 错误语义规范化（1 条合并）
- [PR #5763](https://github.com/HKUDS/nanobot/pull/5763) — **多模态字段类型错误返回 400**：非法 JSON 字段类型从 5xx 改为 4xx 客户端错误，仅超大文件保留 413 响应，提升 API 语义准确性。

> 除上述外，另有 16 条 PR 已合并/关闭，因数据限制未逐一列出。整体上，移动端可用性、MCP 集成完整性和 TUI/API 稳定性是当前迭代的重点方向。

---

## 社区热点

本日虽无单条高评论的“爆款”，但存在多个高关注度的 PR 集群与一条高优先级修复，反映社区集中诉求：

### 1. TUI 可靠性三连修（同一作者 @dajiaohuang）
- [PR #6026](https://github.com/HKUDS/nanobot/pull/6026)（p0）：修复自动发送时先删队首再发送的问题，避免发送异常导致输入内容丢失。
- [PR #6025](https://github.com/HKUDS/nanobot/pull/6025)：支持 Kitty 终端键盘 Enter 键提交命令。
- [PR #6027](https://github.com/HKUDS/nanobot/pull/6027)：修复已保存文件编辑事件合并顺序错乱。

作者同时提交 3 条串行修复，说明 TUI 用户在真实环境中遭遇了多个输入/编辑可靠性问题，这是一组高信号反馈。

### 2. WebUI 触控优化系列（@Re-bin 三连 PR）
[#6023](https://github.com/HKUDS/nanobot/pull/6023)、[#6022](https://github.com/HKUDS/nanobot/pull/6022)、[#6021](https://github.com/HKUDS/nanobot/pull/6021) 同日合并，表明移动端 WebUI 适配是近期社区共识。

### 3. cron 时区问题引发关注
[PR #5922](https://github.com/HKUDS/nanobot/pull/5922)（p1）修复当未显式设置 `CronSchedule.tz` 时，仅用当前 UTC 偏移量导致夏令时切换后定时任务提前/延后一小时的问题。该问题影响所有依赖本地时间的定时场景，属于典型的“老 bug 被社区挖出”类型。

---

## Bug 与稳定性

按严重程度排列（含已提交修复的 PR）：

| 严重度 | 编号 | 问题描述 | 状态 |
|---|---|---|---|
| 🔴 p0 | [PR #6026](https://github.com/HKUDS/nanobot/pull/6026) | TUI 自动发送失败时丢失输入文本与附件 | 已有修复 PR，待合并 |
| 🟠 p1 | [PR #5922](https://github.com/HKUDS/nanobot/pull/5922) | cron 任务在夏令时切换后偏离预定时间 1 小时 | 已有修复 PR，待合并 |
| 🟡 p2 | [PR #5914](https://github.com/HKUDS/nanobot/pull/5914) | Napcat 通道中图片声明非数字 `file_size` 导致消息被错误丢弃 | 已有修复 PR，待合并 |
| 🟡 p2 | [PR #6013](https://github.com/HKUDS/nanobot/pull/6013) | 枚举校验使用 Python `in`，导致 `True` 被 `[1]` 接受、`0` 被 `[false]` 接受，不符合 JSON Schema 规范 | 已有修复 PR，待合并 |
| ⚪ 未分级 | [Issue #6024](https://github.com/HKUDS/nanobot/issues/6024) | Obsidian CLI 在 nanobot 中报“unable to find Obsidian”，终端中正常；疑似 `XDG_RUNTIME_DIR` 未传递给 CLI | 无修复 PR，待排查 |

未发现新的崩溃级回归；上述问题均为社区报告的特定场景缺陷，且有 4 条已具备修复方案，整体稳定性受控。

---

## 功能请求与路线图信号

### 今日新请求
- [Issue #6029](https://github.com/HKUDS/nanobot/issues/6029)：**后台维护任务静默化** — 请求支持静默上下文压缩（`idleCompactAfterMinutes`）和抑制“正在压缩上下文…”等频道广播，用于后台空闲检查/梦境/心跳周期。这表明用户已将 nanobot 用于自动化/无人值守场景，不希望后台噪音干扰活跃对话。

### 路线图信号
- **移动端体验**：随着 [PR #5640](https://github.com/HKUDS/nanobot/pull/5640) 的合并，以及触控三连 PR 的落地，移动 WebUI 已从“可用”迈向“好用”，下一版本大概率会继续打磨这一方向。
- **MCP 集成深度**：[PR #6018](https://github.com/HKUDS/nanobot/pull/6018)（分页资源/提示发现）和 [PR #6019](https://github.com/HKUDS/nanobot/pull/6019)（无工具能力服务器连接）均处理 MCP 协议边界情况，说明 MCP 生态接入的完整性正被社区主动补全。
- **技能记忆（Skill Memory）**：[PR #1651](https://github.com/HKUDS/nanobot/pull/1651) 提出可选的技能记忆层（`SKILLS.jsonl`）和查询感知检索，开放 7 个月仍在活跃更新，属于长期孵化的能力，若合并将显著增强多轮工作流复用。
- **子代理增强**：[PR #5985](https://github.com/HKUDS/nanobot/pull/5985) 为会话增加了专属子代理的创建、消息通信与定向取消能力，展示了对复杂任务编排的前瞻投入。

---

## 用户反馈摘要

- **环境变量传递问题（Issue #6024）**：用户使用 `uv tool` 安装 nanobot-ai 0.3.5，在 Ubuntu/GNOME Wayland 环境下，nanobot 无法定位 Obsidian（尽管终端可正常工作）。用户明确指出怀疑是 `XDG_RUNTIME_DIR` 未正确传递到 CLI 子进程，这暴露了桌面环境下 GUI 应用与 CLI 集成时环境变量隔离的典型痛点，值得维护者调查。
- **后台噪音困扰（Issue #6029）**：用户希望后台自动维护（空闲压缩、dream/heartbeat）能够“安静运行”，不向频道推送状态通知。这反映出 nanobot 被更多用户用于半无人

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-04

## 1. 今日速览

过去 24 小时 Zeroclaw 仓库保持**高活跃度**：50 条 Issue 更新（其中 43 条活跃/新开、7 条关闭）与 50 条 PR 更新（49 条待合并）同时发生，说明社区讨论和开发提交均处于高位。值得警惕的是 PR 合并率偏低（仅 1/50），大量安全加固、Windows 修复和功能实现积压在待审队列中，可能成为交付瓶颈。今日共关闭 6 个 Issue，其中包括 Windows 栈溢出（#10734）和 zerocode 工作目录回归（#11387）等 P1 级问题，关键 Bug 修复推进明显。无新版本发布，当前迭代仍处于 v0.8.6/v0.9.0 的开发推进期。

## 2. 版本发布

今日无新版本发布。近期版本聚焦 v0.8.6（运行时机能补全）与 v0.9.0（网关分离与架构演进），多个关联 issue 已标记相应 release 标签。

## 3. 项目进展

今日虽仅 1 条 PR 被合并/关闭（具体条目未在 Top 列表中标注），但结合 Issue 关闭情况，以下实质性进展值得关注：

- **Windows 平台稳定性修复**：#10734（RpcDispatcher 栈溢出，P1）关闭，表明由 `Advisory Windows nextest` 暴露的栈溢出问题已通过对应 PR 合入解决。
- **zerocode 回归修复**：#11387（zerocode 忽略启动目录，回归 #10609）关闭，本地启动会话的工作目录行为恢复正常。
- **历史缓存前缀 Bug 修复**：#10701（图片附件导致整个历史缓存前缀失效）关闭，对应的 PR #10623 已合入，修复了文本+图片轮次的滚动断点逻辑。
- **Anthropic 缓存优化**：#10662（OAuth 系统前缀低于缓存最小值且占用 breakpoint 插槽）关闭，减少了不必要的缓存标记消耗。
- **CI 缓存与调度改进**：#7108（改进 Rust 构建缓存和 CI 关键路径）关闭，此前 PR CI 常需 15-20 分钟，优化后预期可显著缩短。
- **sessions_send 生命周期明确定义**：#10293 关闭，该 API 的契约（重命名/废弃/替代）已有结论。

这些闭环表明项目在**跨平台可靠性、回归控制、CI 效能、Provider 缓存策略**四个方向均有实际产出。不过需注意，大量待合并的安全 PR（见下文）尚未合入主干。

## 4. 社区热点

以下 Issue 是今日讨论最集中的话题（按评论数排序）：

| Issue | 标题 | 评论数 | 状态 | 核心诉求 |
|-------|------|--------|------|----------|
| [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) | harden runtime-written executable test fixtures under the parallel runtime gate | 13 | OPEN (P1, in-progress) | 测试代码在并发运行时会写入可执行 shim，需加固测试夹具，避免偶发失败。 |
| [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) | feat(ci): improve cached Rust builds and CI critical path | 9 | CLOSED | 社区对 CI 时延（15-20 分钟）长期不满，今日关闭说明改进终于落地。 |
| [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | RpcDispatcher::process_line runs within 2% of its 2 MB stack guard | 8 | CLOSED (P1) | Windows 下真实栈溢出，由 nextest 测试暴露，已修复。 |
| [#9799](https://github.com/zeroclaw-labs/zeroclaw/issues/9799) | long-lived ephemeral daemon can enter sustained multi-core CPU spin | 7 | OPEN (P1, needs-repro) | 守护进程运行 17 小时 CPU 占用 140-177%，尚未成功复现。 |
| [#6105](https://github.com/zeroclaw-labs/zeroclaw/issues/6105) | Agent doesn't have context of the cron job it's run | 6 | OPEN (P2, accepted) | Cron 触发任务时 agent 无法感知自己因哪个定时任务而运行。 |

**趋势分析**：开发者最关心的是**测试稳定性**、**CI 效率**、**跨平台（Windows）可靠性**以及**守护进程资源消耗**。其中 #9965 评论最多，说明并行测试门禁下的偶发失败正在消耗维护者大量排错精力；#6105 从 4 月持续至今仍开放，反映 cron 运行上下文缺失对真实用户 workflow 有明显影响。

## 5. Bug 与稳定性

按严重程度分级，今日活跃的 Bug 如下：

### 🔴 严重（S0/S1）

- **[#11239](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) S0 - 数据丢失/安全风险（OPEN，P1, v0.9.0）**：owned sessions 通过 `spawn_subagent` 和 `execute_pipeline` 泄漏到共享内存平面，跨会话数据隔离被打破。修复 PR 链为 [#11408](https://github.com/zeroclaw-labs/zeroclaw/pull/11408)、[#11409](https://github.com/zeroclaw-labs/zeroclaw/pull/11409)、[#11410](https://github.com/zeroclaw-labs/zeroclaw/pull/11410)、[#11411](https://github.com/zeroclaw-labs/zeroclaw/pull/11411)（均待合并）。
- **[#10225](https://github.com/zeroclaw-labs/zeroclaw/issues/10225) S1 - 工作流阻塞（OPEN，P1, in-progress）**：ZeroCode RPC 会话无法通过 channel-backed 工具触达已配置渠道，git_forge 等工具不可用。暂无对应 fix PR。
- **[#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536) S1 - 工作流阻塞（OPEN，P1, in-progress）**：macOS Seatbelt 忽略 `allowed_roots` 配置，shell 命令仍被拒绝。
- **[#11418](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) S1 - 工作流阻塞（OPEN，P3, needs-repro）**：zerocode TUI 中 “Copy” 按钮完全无效，剪贴板无响应。

### 🟠 中等（S2）

- **[#11478](https://github.com/zeroclaw-labs/zeroclaw/issues/11478)（OPEN，P1, needs-repro）**：>64KB 的图片在 provider 请求中被静默截断，模型只能看到图片顶部。Matrix/Telegram 均能复现，问题位于共享的图片内联路径。
- **[#11420](https

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-10-04）

## 1. 今日速览

过去 24 小时项目社区动态较少：共 1 条 Issue 更新，无新增 Pull Request，也无新版本发布。当前唯一活跃的 #3394 为 QQ 机器人接口适配的既有问题，在昨日（10-03）产生了新的讨论，说明用户仍在持续关注。整体来看，项目今日处于低活跃维护状态，代码合并与发布流程暂无可见动作，但社区侧存在功能性 bug 反馈等待跟进，项目健康度总体平稳、略偏“待响应”。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日无 PR 被合并或关闭，代码层面无可见推进。唯一的动态来自 Issue 侧：#3394 在昨日被更新（评论 +1），使该问题的讨论热度有所上升，但尚无对应修复 PR 出现。

## 4. 社区热点

**#3394 [BUG] QQ机器人的接口更新了，但QQ聊天通道的接口似乎没有更新，希望修复**  
- 链接：https://github.com/sipeed/picoclaw/issues/3394  
- 热度：当前唯一活跃 Issue，评论 2 条，作者 @qinglt  
- 背后诉求：QQ 官方机器人接口已经更新，但 PicoClaw 的 QQ 聊天通道仍在使用旧接口，导致功能可能不可用或出错。用户希望项目能够及时跟进上游平台接口变化，保持通道可用性。这反映了社区对即时通讯渠道稳定性的高敏感度，也暴露出项目在外部依赖变更时的响应速度问题。

## 5. Bug 与稳定性

**中等严重程度：QQ 聊天通道接口过期**  
- Issue：#3394，链接 https://github.com/sipeed/picoclaw/issues/3394  
- 影响范围：使用 QQ 机器人通道的用户，可能出现连接失败、消息收发异常等。  
- 状态：Issue 仍为 OPEN，无关联 fix PR，尚未有官方修复排期说明。  
- 标签：[stale]，但用户昨日仍有互动，说明问题并未被遗忘。

## 6. 功能请求与路线图信号

本期无新的功能需求 Issue。不过 #3394 本身带有较强的“维护性需求”属性——用户并非要求全新特性，而是希望项目能跟随 QQ 官方接口的更新进行适配。这种需求通常应被纳入下一版本的兼容性修复范畴，建议维护者将其列入短期维护计划，避免即时通讯通道因外部变更而长期失效。

## 7. 用户反馈摘要

- 用户 @qinglt 明确反馈 QQ 机器人接口已更新，但 PicoClaw 的 QQ 聊天通道未同步更新，导致实际使用受阻。  
- 评论区的具体讨论细节未包含在当前数据中，但从 Issue 标题和摘要看，用户诉求清晰且直接：修复接口适配，恢复通道正常功能。  
- 由于该 Issue 已存在约一周且带有 [stale] 标签，用户可能期待更及时的维护响应。

## 8. 待处理积压

**#3394 [BUG] QQ机器人的接口更新了，但QQ聊天通道的接口似乎没有更新，希望修复**  
- 创建于 2026-09-26，最近更新 2026-10-03，链接 https://github.com/sipeed/picoclaw/issues/3394  
- 已持续约 8 天仍未关闭，无相关 fix PR。  
- 提醒维护者：这是一项影响真实用户的功能性问题，即使被标记为 [stale]，但昨日用户仍在互动，建议尽快确认接口兼容状态并给出排期，或至少在 Issue 中回复临时规避方案，以降低社区焦虑。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-04

## 1. 今日速览

过去 24 小时项目保持高活跃度：共 7 条 Issue 更新（其中 3 条已关闭）、31 条 PR 更新（13 条已合并/关闭，18 条待合并），无新版本发布。当前迭代焦点集中在**更新/回滚流程稳定性**、**本地通道安全性加固**以及 **CI/发布流程自动化**三个方向。一个 high 级别、涉及容器冷杀的 bug (#3643) 仍处于开放状态且今日有更新，需保持关注。整体来看，项目正处于快速修复与流程优化阶段，合并节奏稳定，社区参与度良好。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 共 13 条，覆盖安全修复、更新流程、CI 自动化和本地通道兼容性等方面，具体可归纳为以下四组：

**安全加固（3 条）**
- [#4013 fix(chat-sdk): authenticate the loopback Gateway webhook](https://github.com/nanocoai/nanoclaw/pull/4013)：为本地 Discord Gateway 回调 webhook 增加鉴权，防止未认证进程伪造事件，直接对应已关闭的安全 Issue #2970。
- [#3985 fix(setup): keep proxy credentials out of readable service files](https://github.com/nanocoai/nanoclaw/pull/3985)：修复代理 URL 中的凭据被写入 0644 权限 systemd 服务文件的问题。
- [#3989 fix(onecli): pin the gateway to 1.42.0 for the host-enforcement bypass fix](https://github.com/nanocoai/nanoclaw/pull/3989)（来自外部贡献者 @drsmk238）：新安装的 OneCLI 网关固定到 1.42.0，修补凭据注入绕过漏洞。

**更新/回滚流程稳定性（3 条）**
- [#4016 fix(update): load gateway helpers before cutover swaps node_modules](https://github.com/nanocoai/nanoclaw/pull/4016)：修复更新切换（cutover）在升级 tsx/esbuild 时崩溃的问题，对应 Issue #4004。
- [#3997 fix(setup): commit applied skill files so a fresh install can update](https://github.com/nanocoai/nanoclaw/pull/3997)：保证全新安装后无需手动提交也能执行 `/update-nanoclaw`。
- [#4001 test(setup): mirror host pnpm patches and overrides in the nested-pnpm probe](https://github.com/nanocoai/nanoclaw/pull/4001)：修复本地后端（/add-matrix、/add-imessage）安装后主机测试失败的问题。

**CI 与发布流程优化（3 条）**
- [#3987 feat(release): self-approved x.y.z-rc.N pre-releases; widen stable approvers](https://github.com/nanocoai/nanoclaw/pull/3987)：允许维护者自行批准预发布版本，稳定版仍需双人审批。
- [#3912 ci(labels): run the area labeler after label-pr, not in parallel](https://github.com/nanocoai/nanoclaw/pull/3912)：修复 area 标签器覆盖 kind/guideline 标签的竞争问题。
- [#4011 docs(contributing): write down the core-or-fork rule](https://github.com/nanocoai/nanoclaw/pull/4011)：补充贡献文档，明确“niche 修复请提交到个人 fork”的规则。

**本地通道修复（1 条）**
- [#4008 fix(add-imessage): open chat.db under Node with core's prebuilt better-sqlite3](https://github.com/nanocoai/nanoclaw/pull/4008)：通过使用 core 的预编译 better-sqlite3 修复 iMessage 本地后端读取 `chat.db` 的问题。

另有一项依赖安全更新：[#4005 build(deps): bump @grpc/grpc-js to 1.14.5 in the Iron approval bridge](https://github.com/nanocoai/nanoclaw/pull/4005)，修复 1.14.4 中的两个安全公告。

## 4. 社区热点

今日讨论焦点集中在以下两个开放问题上：

- **[#3643 Hardcoded 30-min ABSOLUTE_CEILING_MS cold-kills long local-model turns (priority/high)](https://github.com/nanocoai/nanoclaw/issues/3643)**：2 条评论，今日有更新。该问题指出 30 分钟的硬性容器上限导致本地模型长时间推理任务被中途杀死，且没有配置入口。这触及本地模型用户的核心痛点，属于高优先级问题，但目前尚未看到关联的 fix PR。

- **[#3223 Scheduled-task turns that error produce an unroutable error message](https://github.com/nanocoai/nanoclaw/issues/3223)**：1 条评论，今日有更新。该问题讨论调度任务出错后错误消息静默丢失，操作者无法得知任务失败。这反映了后台自动化任务可观测性不足的诉求，可能会推动错误上报机制的改进。

## 5. Bug 与稳定性

按严重程度排列今日关注的 Bug：

| 严重程度 | Issue | 状态 | 对应 Fix PR |
|---|---|---|---|
| 高（安全） | [#2970 Local action forgery via unauthenticated forwarded gateway loopback webhook](https://github.com/nanocoai/nanoclaw/issues/2970) | 今日关闭 | 已有 [#4013](https://github.com/nanocoai/nanoclaw/pull/4013) |
| 高（功能） | [#3643 Hardcoded 30-min ABSOLUTE_CEILING_MS cold-kills long local-model turns](https://github.com/nanocoai/nanoclaw/issues/3643) | 开放中 | 暂无，需增加配置项 |
| 中高（更新流程） | [#4004 update cutover crashes when the update bumps tsx or esbuild](https://github.com/nanocoai/nanoclaw/issues/4004) | 今日关闭 | 已有 [#4016](https://github.com/nanocoai/nanoclaw/pull/4016)，已合并 |
| 中高（更新流程） | [#4003 update rollback can delete half of data/ and leave the host down](https://github.com/nanocoai/nanoclaw/issues/4003) | 今日关闭 | 与 #4004 同源，由 #4016 修复 |
| 中 | [#3223 Scheduled-task errors are silently dropped](https://github.com/nanocoai/nanoclaw/issues/3223) | 开放中 | 暂无 |
| 中 | [#3301 Tasks firing in chat sessions run one-door: logs dropped](https://github.com/nanocoai/nanoclaw/issues/3301) | 开放中 | 暂无，涉及 2.1.48 回归 |
| 低 | [#3984 PreCompact hook fails: compact-instructions.ts calls getAllDestinations() without a registered mailbox](https://github.com/nanocoai/nanoclaw/issues/3984) | 开放中 | 暂无 |

## 6. 功能请求与路线图信号

- **更新通道机制（可能进入下一版本）**：[#3986 feat(update): follow release tags by default via update channels](https://github.com/nanocoai/nanoclaw/pull/3986)（开放中）引入了 `stable` / `beta` / `main` 三种更新通道，默认跟随最新 release 标签而非 main 分支。这是对现有更新机制的重大改进，解决用户“被 main 分支不稳定状态影响”的诉求。

- **审批流程简化（针对 Iron Proxy 场景）**：[#4015 feat(gateway): skip the approval card for reads that carry no credential](https://github.com/nanocoai/nanoclaw/pull/4015)（今日新开）允许操作者跳过不涉及凭据的读取操作的审批卡片，减少 Iron Proxy 场景下的审批噪音。

- **CI 自动化持续演进**：今日合并/关闭了 3 条 CI 相关 PR，体现了项目维护者对仓库自动化流程的重视，[#4010](https://github.com/nanocoai/nanoclaw/pull/4010) 和 [#4009](https://github.com/nanocoai/nanoclaw/pull/4009)（均开放中）继续推进 agent-image 自动升级 PR 的打开与人工合入边界。

## 7. 用户反馈摘要

从开放 Issue 的描述和评论中可以提炼出以下真实用户痛点：

- **本地模型用户被容器硬性限制困扰**（#3643）：使用 OpenCode 等本地模型后端时，长任务会被无预警的 30 分钟硬上限杀死，用户希望有可配置的出口，而不是被强制中断。这是 render 进程与本地模型会话时长不匹配的直接矛盾。

- **调度任务失败不可见**（#3223）：用户指出调度任务出错后错误消息不可路由且被静默丢弃，操作者无法感知失败。这反映出对后台任务可观测性的迫切需求，用户即使在失败时也希望能收到可追溯的通知。

- **升级后行为回归**（#3301）：升级到 2.1.48 后，旧任务的聊天会话被强制切换为任务模式，导致日志丢失、回复被吞，且系列（series）不再显示。该问题自 8 月 17 日提出，今日仍有更新，说明此回归仍在影响用户，需要优先定位。

## 8. 待处理积压

以下 Issue/PR 开放时间较长或涉及核心流程，建议维护者优先关注：

**长期未闭环的高影响 Issue：**
- [#3301 Tasks firing in chat sessions run one-door](https://github.com/nanocoai/nanoclaw/issues/3301)：自 8 月 17 日开放至今，属于 2.1.48 的回归问题，已影响老用户正常使用。
- [#3223 Scheduled-task errors are silently dropped](https://github.com/nanocoai/nanoclaw/issues/3223)：自 8 月 10 日开放，影响调度任务的可观测性，且无关联 fix PR。

**开放时间较长、等待合并的关键 PR：**
- [#3918 fix(agent-runner): never lose or repeat a reply around send_message](https://github.com/nanocoai/nanoclaw/pull/3918)：自 9 月 25 日创建，涉及 agent-runner 核心消息不丢失不重复，对消息可靠性至关重要，已开放 10 天。
- [#3986 feat(update): follow release tags by default via

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-04

## 1. 今日速览

过去 24 小时项目活跃度较低：无新版本发布，无 PR 合并或关闭；唯一动态为一条新 Issue（#8122），报告 macOS 上 `ironclaw serve` 因 credential 读取失败（`BackendUnavailable`）而无法启动。该 Issue 直指本地开发核心工作流，但截至数据采集时尚未获得任何评论与维护者响应。整体来看，项目今日处于低活跃的开发间歇期，唯一的新增信号值得后续重点关注。

---

## 2. 版本发布

无新版本 Release，此部分省略。

---

## 3. 项目进展

今日无 PR 被合并或关闭，因此核心代码库在可见层面没有新增提交记录。从公开数据看，项目当前没有正在推进中的功能合并或修复动作，整体开发节奏处于停滞/等待状态。建议读者结合后续几日的 PR 动态评估项目是否进入正常迭代周期。

---

## 4. 社区热点

今日唯一一条 Issue（#8122）虽然评论数为 0，但它是当前社区讨论的唯一焦点，也是唯一一个「活跃」信号：

- **#8122** `ironclaw serve fails with credential read failed: BackendUnavailable for extension web-app on macOS (local-dev profile)`  
  🔗 https://github.com/nearai/ironclaw/issues/8122

**背后的诉求分析**：该问题触及开发者最常用的本地开发路径——`ironclaw serve` 搭配 `local-dev` profile 启动 web-app extension。用户环境完全健康（`ironclaw doctor` 8/8 通过），但服务无法启动，说明问题既不是环境配置不当，也不是依赖缺失，而更可能是 credential 后端在 macOS 上的兼容性/初始化缺陷。考虑到这是 macOS（Apple Silicon）平台上的稳定复现（1.4.1 和 1.4.0 均出错），社区对跨平台 credential 管理的稳定性诉求正在浮现。

---

## 5. Bug 与稳定性

**今日新增 1 个 Bug 报告，按严重程度排列：**

| 严重程度 | Issue | 摘要 | 是否已有修复 PR |
|---------|-------|------|----------------|
| 高 | #8122 | macOS 上 `ironclaw serve` 启动失败，报 `credential read failed: BackendUnavailable`，影响 `extension web-app`，`local-dev` profile；`ironclaw doctor` 全部通过 | 无 |

**详细分析**：

- **环境**：Apple Silicon（aarch64-apple-darwin），macOS Darwin 27.0.0，IronClaw 1.4.1 official release，及 1.4.0（cargo install）均复现。
- **可能根因**：`BackendUnavailable` 通常表示底层凭据存储后端（如 macOS Keychain 或跨平台 secret service）未成功初始化或调用被系统拒绝。结合 `doctor` 全过，问题可能藏在 extension 子系统的凭据读取路径，而非全局 CLI 的 credential store。
- **风险**：该 Bug 直接阻塞所有 macOS 用户的 `ironclaw serve` 本地开发，属于影响面较大的回归/启动故障，建议尽快定位。目前无 fix PR 挂起。

---

## 6. 功能请求与路线图信号

今日无用户提交的纯新功能请求。但 #8122 中暴露的需求侧面为路线图提供了两个可能的信号：

1. **诊断能力增强**：用户需要 `ironclaw serve` 在 credential 后端不可用时输出更明确的定位信息（例如提示检查 Keychain 权限、环境变量或凭证存储类型），而当前错误信息过于笼统。
2. **macOS 凭证适配文档/加固**：结合 `doctor` 全过但 `serve` 失败的表现，项目可能需要为 macOS 平台补充专门的 credential 故障排查文档，或在内部增加对 Darwin 平台的更细粒度检测逻辑。

以上信号目前仅为推测，需观察后续 Issue 讨论与维护者反馈。

---

## 7. 用户反馈摘要

从今日唯一 Issue #8122 中可提炼出以下真实用户反馈：

- **使用场景**：macOS（Apple Silicon）上的本地开发者，通过官方安装脚本（`ironclaw-installer.sh`）安装 1.4.1，尝试启动 `ironclaw serve` 并在 `local-dev` 模式下运行 web-app extension。
- **满意点**：环境自检工具 `ironclaw doctor` 表现出色，8/8 项全部通过，证明项目在环境检测方面的投入有效。
- **痛点**：
  - `serve` 命令直接失败，blocking 本地开发流程；
  - 错误信息 `credential read failed: BackendUnavailable` 指向性不强，用户难以自行定位是 Keychain 权限、系统配置还是项目自身缺陷；
  - 用户在两个版本（1.4.1 official release 与 1.4.0 源码构建）上均复现，说明该问题不是单版本偶发，降低了用户对稳定性的信任感。

---

## 8. 待处理积压

今日数据库中暂无长时间未响应的重要 Issue 或 PR 可列入积压队列。但需要提醒维护者关注 **#8122**：

- **Issue #8122**（创建于 2026-10-03，截至数据采集已有约 24 小时无评论、无标签、无指派）  
  🔗 https://github.com/nearai/ironclaw/issues/8122

该 Issue 触及 macOS 用户的核心开发路径，且复现稳定，建议在下一个工作周期内尽早响应（即使是给出临时 workaround），以缓解用户等待焦虑并避免形成负面社区印象。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-04

## 今日速览

过去 24 小时内，LobsterAI 共产生 6 条 Issue 更新和 1 条 PR 更新，但无新版本发布、无 PR 被合并或关闭。所有更新的 Issue 均带 `stale` 标签，且最后更新时间集中在 2026-10-03，说明这些更新大概率是 stale bot 的自动标记，而非新的用户讨论或维护者响应。当前项目处于低活跃维护期：新功能合并停滞、多个历史 Bug 仍待处理，维护者需要优先审阅唯一待合并的 PR #2374，并回应积压的稳定性问题。

## 版本发布

无。

## 项目进展

过去 24 小时内没有 PR 被合并或关闭，**代码主分支没有可见的功能性推进**。当前唯一活跃 PR 为：

- [#2374 [OPEN] [area: renderer] feat: add permanent setting to hide sidebar ad banner](https://github.com/netease-youdao/LobsterAI/pull/2374)  
  作者 @bunnysayzz，创建于 2026-07-21，最后更新 2026-10-03，仍处于待合并状态。该 PR 为用户提供“永久隐藏侧边栏广告横幅”的开关，直接回应 issue #2342 的用户诉求。

整体来看，项目在本次窗口中“停留”而非“前进”，需要维护者推动 PR 评审与合并。

## 社区热点

讨论热度相对集中在少数带 `stale` 标签的旧 Issue 上，评论数为 2 条：

- [#884 [OPEN] [stale] [问题]关于账户登录和付费加油包的问题](https://github.com/netease-youdao/LobsterAI/issues/884)  
  用户以“小白”身份询问：登录与不登录的功能区别、付费加油包积分使用场景、以及与自己配置的 Model 是否协同。背后诉求是**官方收费/账户体系说明不足**，新用户体验门槛较高。

- [#885 [OPEN] [stale] 微信链接不可用](https://github.com/netease-youdao/LobsterAI/issues/885)  
  用户附截图反馈微信相关链接失效。看似是文档/外链维护问题，但可能直接影响用户加入社区或获取支持的路径。

此外，PR #2374 虽然时间跨度长，但功能需求明确（永久关闭广告横幅），说明部分用户对内置广告的体验仍有不满。

## Bug 与稳定性

按严重程度排列如下：

| 严重度 | Issue | 问题摘要 | 是否有 Fix PR |
|---|---|---|---|
| 高 | [#879 [OPEN] [stale] bug(sqlite): 外键约束未启用，删除 session 不会级联删除 messages，导致数据库持续膨胀](https://github.com/netease-youdao/LobsterAI/issues/879) | sql.js 默认关闭外键约束，虽然建表声明了 `ON DELETE CASCADE`，但实际删除 session 时 message 不会级联删除，长期运行会导致数据库膨胀 | 未发现 |
| 高 | [#883 [OPEN] [stale] Desktop client (Windows): all slash commands (e.g. /status, /reasoning, /help) don't work](https://github.com/netease-youdao/LobsterAI/issues/883) | Windows 桌面端所有斜杠命令不可用，影响核心交互功能 | 未发现 |
| 中 | [#867 [OPEN] [stale] autoDeleteNonPersonalMemories() 方法存在的事务不一致问题](https://github.com/netease-youdao/LobsterAI/issues/867) | 方法存在事务一致性问题，可能影响记忆自动删除流程的可靠性 | 未发现 |
| 低 | [#885 [OPEN] [stale] 微信链接不可用](https://github.com/netease-youdao/LobsterAI/issues/885) | 文档/资源链接失效，影响社区入口 | 未发现 |

以上问题均已在 2026-03 被报告，目前仍处于开放状态，说明维护团队在稳定性修复方面存在积压风险。

## 功能请求与路线图信号

- [#873 [OPEN] [stale] 给产品用ears原则转化prd，适合产品spec输入给AI，同时增加研发常用的skill git worktree](https://github.com/netease-youdao/LobsterAI/issues/873)  
  用户建议引入 EARS 原则将 PRD 转为可输入给 AI 的产品规格，并增加研发常用的 `git worktree` skill。这是对 AI 辅助研发工作流的具体扩展方向，可能与项目后续 Skill 生态规划相关。

- [#2374 [OPEN] feat: add permanent setting to hide sidebar ad banner](https://github.com/netease-youdao/LobsterAI/pull/2374)  
  虽然是一个 PR 而非 Issue，但其功能实质是“可永久隐藏广告位”，属于用户主诉体验优化，若被合并，可能进入下一版本。

- [#884 中关于登录/加油包/自带 Model 协同的提问](https://github.com/netease-youdao/LobsterAI/issues/884)  
  虽不是正式 Feature Request，但反映了产品在“账户体系”与“自带模型”之间的关系上需要更清晰的文档或引导。

## 用户反馈摘要

- **新手引导不足**：#884 中用户自述“小白”，对登录/付费/积分/自带模型的组合关系不清楚，说明当前文档或产品内引导未覆盖基础使用路径。
- **核心功能异常影响体验**：#883 中 Windows 桌面端所有斜杠命令失效，属于高频功能完全不可用，用户挫败感强。
- **外部渠道维护缺失**：#885 微信链接失效，用户截图反馈，说明项目对外沟通渠道存在维护不到位的问题。
- **广告位体验不受欢迎**：PR #2374 的存在表明用户希望有“永久关闭广告”的能力，而不是每次手动关闭横幅。

整体来看，用户对 LobsterAI 的 AI 功能本身仍有较高期待，但在文档清晰度、桌面端稳定性、以及商业化功能透明度方面存在明显不满意。

## 待处理积压

以下 Issue/PR 存在时间较长且长期未关闭，建议维护者优先关注：

- [#867 autoDeleteNonPersonalMemories() 事务不一致问题](https://github.com/netease-youdao/LobsterAI/issues/867) — 2026-03-25 创建，已积压超过 6 个月。
- [#879 SQLite 外键约束未启用，数据库持续膨胀](https://github.com/netease-youdao/LobsterAI/issues/879) — 2026-03-25 创建，影响长期运行稳定性。
- [#883 Windows 桌面端所有斜杠命令不可用](https://github.com/netease-youdao/LobsterAI/issues/883) — 2026-03-25 创建，核心功能缺陷。
- [#885 微信链接不可用](https://github.com/netease-youdao/LobsterAI/issues/885) — 2026-03-26 创建，社区入口问题。
- [#2374 隐藏侧边栏广告横幅的 PR](https://github.com/netease-youdao/LobsterAI/pull/2374) — 2026-07-21 创建，已等待 review 超过两个月。

所有 Issue 均被标记为 `stale`，若维护者不主动介入，这些问题将逐渐失去社区关注，继而影响项目健康度与用户信任。

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

# CoPaw 项目动态日报 — 2026-10-04

> 数据来源：GitHub（agentscope-ai/CoPaw · QwenPaw） | 统计窗口：2026-10-03 ~ 2026-10-04

## 1. 今日速览

过去 24 小时项目活跃度较高：**7 条 Issue 更新**（6 条活跃 / 1 条关闭），**10 条 PR 更新**（全部待合并）。虽然无新版本发布，但 PR 提交密集，集中在会话管理、模型能力解析、Provider 兼容性与控制台体验四大方向。需要关注的是，**今日合并/关闭 PR 数为 0**，审查吞吐可能成为当前迭代瓶颈；Bug 类 Issue 占比接近 70%，稳定性仍是社区关注重点。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日无 PR 被合并或关闭，但 **10 个 PR 处于待合并状态**，覆盖多个关键修复方向，已形成一批「修复就绪但等待审查」的积压：

| 方向 | PR | 解决的问题 |
|---|---|---|
| 媒体能力一致性 | [#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100) | 运行时图像支持判断使用原始模型记录，与 catalog 解析后的能力不一致，导致多模态模型被错误拦截 |
| 会话归属修复 | [#8091](https://github.com/agentscope-ai/QwenPaw/pull/8091) | 点击侧边栏历史会话时 `lastActiveChatId` 未更新，引发新建任务时打开错误会话（对应 #7661） |
| Agent 间消息归属 | [#8095](https://github.com/agentscope-ai/QwenPaw/pull/8095) | `chat_with_agent` 消息被注册为独立会话，用户归属错误 |
| 超时处理 | [#8098](https://github.com/agentscope-ai/QwenPaw/pull/8098) | 前台代理会话超时后返回明确 tool result，而非直接取消父轮次 |
| Provider 兼容 | [#8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) | GPT-6 系模型需 `max_completion_tokens`，旧检查只匹配 `gpt-5*`（对应 #8074） |
| 截断可观测性 | [#8096](https://github.com/agentscope-ai/QwenPaw/pull/8096) | 输出超限时 `finish_reason="length"` 被丢弃，截断与完整回答无法区分 |
| Qoder 增强 | [#8099](https://github.com/agentscope-ai/QwenPaw/pull/8099) | 支持自定义 provider 与上下文用量展示 |
| 控制台 LAN 支持 | [#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089) | LAN HTTP 下 `crypto.randomUUID()` 不可用，会话视图渲染失败 |
| 测试补充 | [#8097](https://github.com/agentscope-ai/QwenPaw/pull/8097) | 覆盖 PDF 工具结果重放的回归用例 |
| 持久化链路 | [#7004](https://github.com/agentscope-ai/QwenPaw/pull/7004) | 持久化 `spawn_subagent` 父子会话关联（8 月 13 日提交，仍在队列） |

整体来看，项目正在经历一轮「体验正确性」修复潮，若上述 PR 合并，将显著改善会话一致性、Provider 兼容性和控制台可靠性。

## 4. 社区热点

- [#7661 错误的创建新会话](https://github.com/agentscope-ai/QwenPaw/issues/7661)（评论 5 | 👍 0）
  今日评论最多，且是 9 月 10 日的历史 Issue，在 PR #8091 提交后再次被关注。用户复现路径清晰：新建任务 → 自动创建会话 → 二次提问时被错误分配到新会话。背后诉求是**侧边栏导航与会话状态管理的一致性**，属于核心交互流程问题。
- [#8101 /chat/<id> 深链接跨 agent 失效](https://github.com/agentscope-ai/QwenPaw/issues/8101)（新建 1 天，评论 1）
  外部插件/集成通过深链接打开会话时，跨 agent 直接失败，同 agent 也无法激活会话。涉及自托管部署的集成场景，评论区讨论仍在发酵。

## 5. Bug 与稳定性

按严重程度与影响面排列：

| 严重度 | Issue | 描述 | 是否有 fix PR |
|---|---|---|---|
| 🔴 高 | [#8094 Console 启动卡死](https://github.com/agentscope-ai/QwenPaw/issues/8094) | WebView2 缓存过期后 boot splash 无重试、无错误提示，可能永久阻塞启动 | ❌ 无 |
| 🔴 高 | [#8101 深链接会话无法激活](https://github.com/agentscope-ai/QwenPaw/issues/8101) | `/chat/<id>` 深链接跨 agent 失效，同 agent 也无法激活会话 | ❌ 无 |
| 🔴 高 | [#8092 内容审查误报导致对话中断](https://github.com/agentscope-ai/QwenPaw/issues/8092) | Ali 风格网关误报 `data_inspection_failed` 被归类为 `bad_request`，无重试无降级，正常对话被终止 | ❌ 无 |
| 🟠 中 | [#8074 GPT-6 连接测试 400](https://github.com/agentscope-ai/QwenPaw/issues/8074) | `max_completion_tokens` 白名单不匹配 GPT-6 系列，main 分支上仍未修复 | ✅ [#8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) |
| 🟠 中 | [#7661 错误的创建新会话](https://github.com/agentscope-ai/QwenPaw/issues/7661) | 历史会话点击后新建任务，会话归属错乱 | ✅ [#8091](https://github.com/agentscope-ai/QwenPaw/pull/8091) |
| 🟠 中 | [#8093 多模态能力声明与实际不符](https://github.com/agentscope-ai/QwenPaw/issues/8093) | 部分模型 catalog 显示支持多模态，但运行时拦截图片输入 | ✅ [#8100](https://github.com/agentscope-ai/QwenPaw/pull/8100) |
| 🟡 低 | [#7535 Matrix 矩阵兼容性](https://github.com/agentscope-ai/QwenPaw/issues/7535) | 已关闭，未合并入主版本（见下节） | 已关闭 |

前三项高危 Bug 均无 fix PR，建议优先分配人力；其中 #8094 与 #8092 直接影响自托管用户的可用性。

## 6. 功能请求与路线图信号

- **Matrix 频道 Element 兼容性增强**（[#7535](https://github.com/agentscope-ai/QwenPaw/issues/7535)）：请求支持 recovery-key 设备验证与 MAS next-gen OIDC (MSC2965) 登录，**已于 10 月 3 日关闭**。关闭可能意味着暂不纳入路线图，建议维护者同步说明原因，避免用户困惑。
- **Qoder 自定义 provider 支持**（[#8099](https://github.com/agentscope-ai/QwenPaw/pull/8099)）：来自开发者侧的功能补强，有望随该 PR 进入下个 2.2.x 版本。
- **更精细的截断可观测性**（[#8096](https://github.com/agentscope-ai/QwenPaw/pull/8096)）：将 `finish_reason="length"` 暴露在 chat response metadata 中，满足长输出场景的调试需求。
- **终端身份支持 LAN HTTP**（[#8089](https://github.com/agentscope-ai/QwenPaw/pull/8089)）：低风险小修复，对局域网自托管用户友好。

以上 PR 均为待合并状态，预计合并后将统一释放这批改进。

## 7. 用户反馈摘要

从今日 Issue 描述与讨论中可提炼以下痛点和场景：

- **核心流程数据混乱**（#7661）：用户按「新建任务 → 提问 → 再提问」的常规路径操作，会话侧边栏却不断产生「幽灵会话」，直接影响日常使用信任感。
- **版本跟进存在落差**（#8074）：用户报告称 2.2.0 存在问题，并**主动在 main 分支复核后确认未修复**，说明社区有深度用户，也反映修复链路较长。
- **自托管 + 外接服务集成场景活跃**（#8092、#8101）：容器部署 + Telegram 频道 + OpenAI 兼容网关、外部插件深链接等组合是真实使用方式；内容审查误伤与深链接失效会直接阻断这类用户的自动化工作流。
- **对潜在启动故障缺乏容错预期**（#8094）：用户指出 WebView2 缓存导致启动不可恢复，期望有重试机制与错误提示——这类反馈体现出对 Console 稳定性的更高要求。

## 8. 待处理积压

| 项目 | 创建时间 | 状态 | 备注 |
|---|---|---|---|
| [#7004 持久化 spawn 父子会话关联](https://github.com/agentscope-ai/QwenPaw/pull/7004) | 2026-08-13 | PR 待合并

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