# OpenClaw 生态日报 2026-09-16

> Issues: 477 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-16 02:12 UTC

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

# OpenClaw 项目动态日报 — 2026-09-16

## 1. 今日速览

过去24小时项目活跃度极高：**477条Issue更新**（304条新开/活跃、173条关闭）与**500条PR更新**（340条待合并、160条已合并/关闭）均属近期高位，社区反馈、Bug报告、PR提交流量全面旺盛。值得关注的是，今日**无新版本发布**，但大量积压的高优先级Bug（含多个P0）和性能优化PR正在密集推进中，项目可能正处于一个重要的修复冲刺窗口期。整体健康度判断：**活跃但承压**——社区参与度强劲，但维护者评审积压明显，"needs-maintainer-review"标签在多个高热度Issue上反复出现。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共 **160 条 PR 被合并/关闭**，主要推进方向包括：

| 方向 | 代表PR | 说明 |
|------|--------|------|
| **性能优化（主线）** | #149478、#149421、#149526、#149452、#149511 | steipete 持续提交系列性能优化：SQLite upsert复用、查询编译减少、任务维护深拷贝消除、全局召回跳过无关项目读取、共享状态库复用开销降低。这些改动针对大规模会话存储和Gateway线程CPU占用，属于内核级别的减负 |
| **稳定性修复** | #149523、#149531 | 修复transcript关闭测试和工作树取消恢复测试在负载下不稳定的问题，消除无关PR检查被阻塞的CI噪声 |
| **故障恢复增强** | #148580 | rate-limit Retry-After超过maxRetryDelayMs时改为故障转移而非在turn内空等，直接回应用户报告的"429导致turn睡死"问题 |
| **UI/UX修复** | #149405、#149351 | Web UI保存的中断回复只显示一次；行内评论编辑控件与样式优化 |
| **新功能推进** | #146676、#148209、#101294 | 通话中切换语音（Talk/Discord）、Android侧边栏切换已保存Gateway、WhatsApp手机号登录均处于waiting on author状态，等待作者响应维护者反馈 |

**核心信号**：Gateway运行时的CPU/内存/数据库开销优化是今日PR的最大主线，与当前最热门的几个性能Bug（#97616僵尸进程、#91588内存泄漏、#119720事件循环阻塞）形成呼应，说明维护者正在系统性地回应大规模部署用户的性能痛点。

---

## 4. 社区热点

| Issue | 评论数 | 核心诉求 |
|--------|--------|----------|
| [#25592 工具调用间文本泄漏到消息通道](https://github.com/openclaw/openclaw/issues/25592) | 40 | **最热Issue**。Agent在工具调用间产生的内部处理文本被当作可见消息发送到Slack/iMessage等通道，严重损害UX和隐私。2月创建至今评论持续增加，被标记为diamond lobster高评分、needs-product-decision |
| [#97616 子进程泄漏导致僵尸进程累积](https://github.com/openclaw/openclaw/issues/97616) | 31 | hook/tool执行后子进程不被回收，zombie持续累积导致运行时降级，被标记为回归问题 |
| [#91588 网关内存泄漏RSS从350MB涨到15.5GB](https://github.com/openclaw/openclaw/issues/91588) | 25 | 2-3天内内存从350MB涨至15.5GB触发OOM，连锁引发重启循环，影响严重 |
| [#91009 Codex hook进程CPU占用100%+](https://github.com/openclaw/openclaw/issues/91009) | 24 | **P0级别**。PreToolUse hook relay进程CPU饥饿并阻塞Gateway RPC，6月报告至今未关闭 |
| [#119720 同步持久化阻塞Gateway事件循环](https://github.com/openclaw/openclaw/issues/119720) | 20 | 大规模场景下agent持久化和transcript维护阻塞事件循环，被标记为diamond lobster |

**分析**：社区聚焦的核心诉求集中在**运行时稳定性**（僵尸进程、内存泄漏、CPU占用）和**消息正确性**（文本泄漏、消息丢失）两大方向。其中#25592是当前社区讨论时间跨度最长、参与度最高的问题，涉及产品决策（哪些文本应该内部消化、哪些允许透出），需要产品团队明确边界。

---

## 5. Bug 与稳定性

按严重程度排列今日活跃的Bug类Issue：

### P0 级（严重崩溃/发布阻塞）

| Issue | 问题 | 状态 |
|--------|------|------|
| [#91009 Codex hook进程CPU饥饿阻塞RPC](https://github.com/openclaw/openclaw/issues/91009) | 多进程CPU 100%+，Gateway RPC stall | ⚠️ 无fix PR，6月至今 |
| [#143524 SQLite WAL增长至2.8GB阻塞启动](https://github.com/openclaw/openclaw/issues/143524) | Windows平台wal_autocheckpoint失效 | ⚠️ 无fix PR |
| [#115642 计费冷却时间远超故障持续时间](https://github.com/openclaw/openclaw/issues/115642) | 订阅认证5小时冷却不可恢复，release blocker | ⚠️ 无fix PR |
| [#148866 gateway.bind=lan导致重启循环](https://github.com/openclaw/openclaw/issues/148866) | Ubuntu/systemd下永久重启循环 | ✅ 今日已关闭 |
| [#123326 多Agent Codex迁移崩溃循环](https://github.com/openclaw/openclaw/issues/123326) | Gateway启动崩溃循环 | ✅ 已关闭 |
| [#144739 npm更新跑旧版本候选状态](https://github.com/openclaw/openclaw/issues/144739) | 2026.9.3→9.4更新失败 | ⚠️ 无fix PR |
| [#146637 npm更新在Linux Mint上失败](https://github.com/openclaw/openclaw/issues/146637) | global install swap阶段失败 | ⚠️ 无fix PR |

### P1 级（高影响）

| Issue | 问题 | 修复状态 |
|--------|------|----------|
| [#144911 MCP server超时崩溃Gateway](https://github.com/openclaw/openclaw/issues/144911) | 未处理rejection导致整个Gateway宕机 | ✅ fix-shape-clear + queueable-fix，修复方案明确 |
| [#139847 回复运行时新消息被丢弃](https://github.com/openclaw/openclaw/issues/139847) | "no active tool authority snapshot"回归 | ✅ fix-shape-clear + queueable-fix |
| [#148707 第二个run抢占导致回复丢失](https://github.com/openclaw/openclaw/issues/148707) | 2026.9.4回归，回复整体丢失 | ⚠️ 信息待补充 |
| [#137332 requester-settle批次无限重试](https://github.com/openclaw/openclaw/issues/137332) | 失败子运行永久pending | ✅ fix-shape-clear + queueable-fix |
| [#97616 子进程泄漏僵尸累积](https://github.com/openclaw/openclaw/issues/97616) | 长时间运行后降解 | ⚠️ 无fix PR |
| [#91588 网关内存泄漏OOM](https://github.com/openclaw/openclaw/issues/91588) | RSS 350MB→15.5GB | ⚠️ 无fix PR |

**值得关注的信号**：多个P1问题已获得"fix-shape-clear"（修复形态明确）和"queueable-fix"（可排队修复）标签，说明维护者已识别根因并排入修复管线；但几个长时间未解决的P0（#91009、#143524）仍缺乏明确的修复路径，对生产用户是持续风险。

---

## 6. 功能请求与路线图信号

### 可能被纳入下一版本的功能（已有PR推进）

- **通话中切换语音**（#146676）：Talk/Discord通话中请求切换语音，覆盖浏览器/iOS/Android，涉及多个客户端，功能完整度较高，处于waiting on author
- **WhatsApp手机号登录**（#101294）：为无QR环境提供替代登录方式，解决了headless部署的实际痛点，等待作者更新
- **Android侧边栏切换Gateway**（#148209）：改善Android端多Gateway管理体验，PR已ready for maintainer look
- **CLI日志--plain模式彻底去色**（#149595）：新提交的修复，解决CLI输出转义问题

### 社区呼声较高但尚未进入开发的功能需求

| Issue | 需求 | 状态 |
|--------|------|------|
| [#51441 暴露实际后端模型](https://github.com/openclaw/openclaw/issues/51441) | 让Agent感知LiteLLM路由后的真实模型 | 等待产品决策 |
| [#51572 session-memory hook覆盖reset/prune](https://github.com/openclaw/openclaw/issues/51572) | 会话记忆钩子只在compaction时触发，idle reset/prune时丢失上下文 | 等待产品决策 |
| [#60602 每Agent Bedrock requestMetadata注入](https://github.com/openclaw/openclaw/issues/60602) | 多Agent成本归属 | 等待产品决策 |
| [#46058 聊天优先Android原生界面](https://github.com/openclaw/openclaw/issues/46058) | 独立Android fork验证后寻求共建方向 | 讨论中 |

---

## 7. 用户反馈摘要

从今日活跃的Issue评论中提炼真实用户声音：

**最集中的痛点：消息丢失与错发**

- "Text between tool calls leaks to messaging channels"（#25592）——用户对内部处理文本被广播到外部通道感到困扰，涉及隐私和观感双重问题
- "Reply operation has no active tool authority snapshot"（#139847、#148707、#144809）——多个用户在9.2/9.4版本遇到回复丢失，且错误信息对用户不友好（#139847作者原话："The user sees the generic ⚠️ Something went wrong"），说明错误码的可诊断性不足
- "Heartbeat internal output leaks to Telegram user chat"（#143278）——心跳轮询的内部输出被当作正常消息发送给了用户
- "Inbound iMessage messages re-delivered 2-3x"（#143632）——重复投递且携带内部序列化上下文，用户明确表示体验到"ghost copies"

**生产环境用户的声音**

- #123799生产部署用户明确要求："We are an affected production deployment and need operational guidance"——对于#123706的修复，旧版本（2026.5.12）用户需要可操作的升级/回退指引，而非仅在新版本中修复
- #91588内存泄漏用户详细记录了OOM触发launchd-handoff重启循环的完整过程，说明密集中断对可用性的严重影响

**肯定与期待**

- #126781用户主动确认2026.9.1已覆盖大部分需求："OpenClaw 2026.9.1 now covers most of this request through existing parts"——说明新版本迭代确实解决了部分历史诉求
- #51441、#51572等功能请求评论虽不多但持续有👍，代表用户对Agent可观测性和记忆管理有稳定需求

---

## 8. 待处理积压

以下Issue长期未解决且影响面大，建议维护者优先关注：

| Issue | 创建时间 | 持续天数 | 严重度 | 积压原因分析 |
|--------|----------|----------|--------|--------------|
| [#25592 工具调用间文本泄漏](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | ~205天 | P1/diamond lobster | 需要产品决策明确边界，needs-product-decision标签已挂7个月 |
| [#91009 Codex hook进程CPU饥饿](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | ~102天 | P0 | 至今无fix PR，涉及Codex集成底层 |
| [#91588 网关内存泄漏OOM](https://github.com/openclaw/openclaw/issues/91588) | 2026-06-09 | ~99天 | P1 | 无fix PR，需要深入的内存分析 |
| [#102175 prompt cache跨边界失效](https://github.com/openclaw/openclaw/issues/102175) | 2026-07-08 | ~70天 | P2/安全 | 涉及安全评审，需要谨慎验证 |
| [#115367 外部插件读取门禁失效](https://github.com/openclaw/openclaw/issues/115367) | 2026-07-28 | ~50天 | P1/安全 | 所有主流聊天表面均为外部插件，安全边界缺口 |
| [#136311 记忆索引重建锁永不释放](https://github.com/openclaw/openclaw/issues/136311) | 2026-09-02 | ~14天 | P1 | 19GB孤儿DB累积，问题持续恶化 |
| [#128140 memory_search工具15秒超时](https://github.com/openclaw/openclaw/issues/128140) | 2026-08-

---

## 横向生态对比

# 个人AI助手开源生态横向对比分析报告（2026-09-16）

## 1. 生态全景

当前个人AI助手/自主智能体开源生态呈现**核心高活跃、外围分化静默**的格局：OpenClaw 以单日477条Issue、500条PR的流量稳居生态中心，但合并/关闭率仅约1/3，维护者评审积压是明显瓶颈。围绕核心项目，NanoBot、Zeroclaw、CoPaw、NanoClaw 等衍生项目在跨端体验、A2A协议、多租户Hub、运维可靠性等细分方向高速迭代；LobsterAI 则处于深度跟随核心引擎升级的兼容性修复周期。与此同时，IronClaw、TinyClaw、EasyClaw 等项目24小时无任何活动，Moltis、ZeptoClaw 仅剩零星维护，生态已出现清晰的头部集中与尾部沉寂分化。

## 2. 各项目活跃度对比

| 项目 | Issues更新 | PR更新 | Release | 今日关键动态 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 477（新开/活跃304，关闭173） | 500（待合并340，合并/关闭160） | 无 | 性能优化为主线，多个P0/P1 Bug待修 | 活跃但承压，评审积压明显 |
| **NanoBot** | 3 | 21（合并/关闭13，待合并8） | **v0.3.5** | TUI随wheels分发，跨端统一体验落地 | 高活性、健康 |
| **Zeroclaw** | 50（新开/活跃38，关闭12） | 50（待合并40，合并/关闭10） | 无 | A2A外呼客户端Phase 1合入，WASM插件治理推进 | 高活跃，开发主线清晰 |
| **NanoClaw** | 5（新开2，关闭3） | 40（合并/关闭21，待合并19） | 无 | handoff安全机制合并，更新流程Bug暴露 | 较高活跃，运维稳定性承压 |
| **CoPaw** | 26（新开9，关闭17） | 50（合并/关闭25，待合并25） | 无 | MCP兼容与多模态修复合入，多租户Hub引发热议 | 较高活跃，Issue处理效率良好 |
| **LobsterAI** | 3（2条stale关闭） | 30（合并/关闭20，待合并10） | 无（Release PR已合并） | 密集修复OpenClaw v2026.8.1兼容性问题 | 中等偏良好 |
| **PicoClaw** | 2 | 5（合并/关闭2，待审3） | 无 | QQ通道稳定性增强合并，mesh可观测性补强 | 稳定，但stale积压需关注 |
| **Moltis** | 1 | 1（新提交，无合并） | 无 | 长期功能请求#205重新活跃；BuildKit缓存PR待审 | 平稳，迭代节奏较慢 |
| **ZeptoClaw** | 0 | 18（全部Dependabot待合并） | 无 | 依赖维护静默期，含3个major升级 | 依赖维护正常，开发停滞 |
| **IronClaw** | 0 | 0 | 无 | 无活动 | 静默 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | 静默 |
| **EasyClaw** | 0 | 0 | 无 | 无活动 | 静默 |

## 3. OpenClaw 在生态中的定位

- **绝对核心与上游基准**：OpenClaw 单日477条Issue/500条PR的流量是第二梯队（Zeroclaw/CoPaw各50条）的约10倍，社区规模断层领先。其性能优化主线（SQLite复用、编译减少、深拷贝消除）直接回应大规模部署痛点，是生态技术的风向标。
- **技术路线差异**：OpenClaw 采取**单一重量级核心+周边衍生**的路线，自身聚焦Gateway运行时稳定性与消息正确性；衍生项目则通过分叉/插件方式在特定场景做深——NanoBot 走Python/TUI跨端路线，Zeroclaw 押注A2A协议与WASM插件治理，PicoClaw 深入嵌入式mesh网络，LobsterAI 专注桌面端OpenClaw集成。
- **社区规模对比**：OpenClaw 的高热度伴随严重评审积压（340条待合并PR，多个P0无fix PR）；相比之下，NanoBot 21条PR中13条已合并/关闭，LobsterAI 20/30合并率，体现出小项目更敏捷的迭代闭环。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息正确性与文本泄漏** | OpenClaw（#25592工具调用间文本泄漏）、Zeroclaw（#10885图片在工具调用间消失）、CoPaw（#7567停止后任务仍执行） | Agent内部处理文本/图片被错误广播到外部通道，或停止指令未真正终止任务，严重损害UX与隐私 |
| **运行时稳定性与资源泄漏** | OpenClaw（#97616僵尸进程、#91588内存泄漏15.5GB、#119720事件循环阻塞）、Zeroclaw（#10659 budget超限丢进度）、CoPaw（#7678 subAgent全部超时） | 长时间运行后CPU/内存耗尽、后台任务失控、进度丢失，是生产部署的首要障碍 |
| **可观测性与诊断能力** | OpenClaw（#139847错误信息不友好）、NanoClaw（/add-telemetry）、PicoClaw（mesh PeerStatus/SSE）、Zeroclaw（OSC终端状态上报）、CoPaw（用量仪表盘） | 用户要求Agent内部状态、超时原因、用量归属可感知，避免“静默失败” |
| **安全加固与供应链** | NanoBot（#5697 SSRF、#5778邮件认证）、NanoClaw（#3823 Mattermost回调认证）、Zeroclaw（#5869 RUSTSEC集群）、OpenClaw（#115367插件门禁失效） | 入站附件SSRF、回调认证缺失、传递依赖漏洞、插件安全边界，安全从附加项变为硬性要求 |
| **配置灵活性与部署可定制** | Moltis（#205 per-model body参数）、PicoClaw（#1780 QQ参数可配置、#3372 reaction开关）、OpenClaw（#51441暴露真实后端模型） | 用户不再满足固定配置，要求参数、工具、provider行为均可插拔、可调、可禁用 |
| **跨渠道/跨端体验一致** | NanoBot（TUI/Web/聊天三端统一）、OpenClaw（#146676通话中切换语音、#101294 WhatsApp登录）、NanoClaw（Proton Mail、语音通话） | 同一Agent在不同消息渠道间无缝延续会话，是普遍期待 |

## 5. 差异化定位分析

| 项目 | 定位 |

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-16

## 1. 今日速览

今日 NanoBot 迎来 **v0.3.5 正式发布**，核心亮点是将 TUI 终端工作台从"单独下载"变为随 Python 平台 wheels 分发，实现了浏览器、终端、聊天应用三端统一的对话体验；发布配套的 release PR（#5785）与打包 PR（#5787）均已合并。过去 24 小时内 PR 活动量极高（21 条更新，其中 13 条已合并/关闭，8 条待合并），修复集中在 Dream 迭代上限、飞书/QQ 渠道 bug、安全加固（SSRF、邮件认证）等方面。Issues 侧活跃度中等（3 条），核心痛点集中在 Dream 长时循环失控（#5781）与 QQ 渠道压缩通知噪音（#5784），前者已有对应 fix PR（#5782）待合并。整体项目处于高活性、健康状态，维护者响应速度较快。

---

## 2. 版本发布

### 🎉 v0.3.5（2026-09-16 发布）

**更新内容：**
- 工作台正式进入终端：运行 `nanobot` 启动原生终端客户端，`nanobot webui` 运行浏览器界面，两端共享同一 Agent 与对话上下文。
- 改进跨端对话连续性：浏览器、终端和聊天应用之间可无缝延续同一会话。

**关键配套变更（来自 PR #5787）：**
- 原生 TUI 已打包进五平台（Windows/macOS/Linux 多架构）wheels，PyPI 安装后可直接启动终端客户端，无需首次运行时从 GitHub 下载或单独安装 Bun。这大幅降低终端用户的安装摩擦。

**破坏性变更与迁移注意事项：**
- 本次发布未提及明显的破坏性变更。
- 注意 `dream.maxIterations` 确认已废弃，Dream 运行迭代上限受全局 `maxToolIterations` 约束；修复 PR #5782 正在恢复独立配置（默认 15），升级后如需调整 Dream 迭代行为，建议后续关注该配置的正式回归。

https://github.com/HKUDS/nanobot/releases/tag/v0.3.5

---

## 3. 项目进展

过去 24 小时合并/关闭了 13 条 PR，项目在多条线上同步推进：

**发布工程**
- **#5785** chore(release): prepare v0.3.5 — 完成版本准备的端到端 Checklist
- **#5787** build: bundle native TUI in platform wheels — 将 TUI 原生二进制集成进平台 wheels，支撑 v0.3.5 开箱即用的终端体验

**核心修复**
- **#5782** fix(dream): enforce configured iteration limit — 修复 Dream 自动合并任务无视独立迭代限制、长时空转的根因（Closes 未来将关联 #5781），恢复 `agents.defaults.dream.maxIterations`，默认 15 次
- **#5775** fix(tools): scope file-read dedup to model context — 修复 `read_file` 去重逻辑在上下文被压缩后返回过期 stub 的问题，要求原始读取结果仍完整保留时才可去重
- **#5774** fix(memory): recover archive tool calls before raw fallback — 增强归档请求的异常恢复，优先重试而非直接降级到 RAW 模式

**渠道与安全加固**
- **#5697** fix(qq): protect inbound attachment downloads from SSRF — 对 QQ 入站附件 URL 做 SSRF 防护（URL 校验、禁重定向、仅接受 HTTP 200）
- **#5778** fix(email): require trusted authentication results — 强化邮件接收方认证，要求明确配置接收服务并校验认证身份与发件域一致
- **#5768** fix(feishu): use /page/cli verification URL for QR onboarding — 修复飞书 QR 扫码登录时报"链接已过期"的问题

**WebUI 与性能**
- **#5757** fix(session): search older pages of persisted conversation history — 修复 WebUI 长对话中搜索漏掉历史页的问题
- **#5786** refactor(webui): animate segmented control indicator — 重构分段控件，增加平滑动画与减少动效支持
- **#5728** perf: reduce streaming text processing and classic CLI redraws — 优化流式文本标签解析与 CLI 重绘，降低长回答的本地 CPU 开销

项目整体在"发布基建、核心工具稳定性、渠道安全、WebUI 体验、性能"五个维度均有实际产出，v0.3.5 的发布更是将产品形态推向了真正的跨端一致体验。

---

## 4. 社区热点

- **#5781 [OPEN] Dream runs for 1–2 h looping on the same read_file calls**（👍 0，评论 3）
  https://github.com/HKUDS/nanobot/issues/5781

  今日最活跃的 Issue。用户 @BrianMwangi21 报告计划中的 Dream 合并任务演变为 25–111 分钟的超长 Agent 循环，模型反复读取同一两个文件数十次，且 `dream.maxIterations` 配置被忽略、全局 200 次迭代上限兜底失效。**核心诉求**：Dream 任务应具有独立、可配置的迭代上限，避免单次后台任务吃掉大量计算资源和 token。该 Issue 已被 PR #5782 针对性修复，预计很快合入。

- **#5784 [OPEN] QQ: automatic compaction notices are sent as standalone messages**（评论 1）
  https://github.com/HKUDS/nanobot/issues/5784

  用户自托管 QQ 渠道，自动压缩通知（"Compressing context…" / "Context compacted."）以普通聊天消息形式推送给用户，且 QQ 渠道无法折叠此类消息。属于 #5719 同一类噪音问题，已有 PR #5780 提出让自动压缩通知不可见（手动 `/compact` 保留提示），社区共识较强。

---

##

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-16

## 今日速览

过去24小时内，Zeroclaw 项目保持**高活跃度**：共 50 条 Issue 更新（38 条新开/活跃，12 条关闭）和 50 条 PR 更新（40 条待合并，10 条合并/关闭），无新版本发布。当前开发主线集中在 **A2A 协议外呼客户端、WASM 插件化（加载验证/egress 治理/CLI 验证）与运行时图片消息处理链路** 三大方向。值得关注的是，今日新开 4 个 Anthropic/provider 相关 Bug（#10885、#10887、#10889）和 1 个 Telegram 测试超时问题（#10883），图片上下文在工具调用间的保持仍是高发缺陷区；同时 #9324（A2A outbound Phase 1）与 #2754（Docker heredoc 修复）等 PR 关闭，标志着 A2A 外呼与容器部署稳定性取得实质进展。

## 项目进展

> 注：PR 列表未单独标注 "merged"，此处以 `[CLOSED]` 状态为依据，视为已合入或已关闭处理。

### 重要合入/关闭 PR

- **[#9324] feat(a2a): outbound client config, shared wire-model, tools (#9106)** — [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)
  - **A2A 外呼客户端 Phase 1 落地**：实现 4 个 `a2a_*` 工具（zeroclaw-tools）、共享 A2A v1.0 Serde wire model（zeroclaw-api），以及默认关闭的 `[a2a.client]` 配置块。对应 RFC #9106 中维护者评审意见的六项要求全部落实。这是 ZeroClaw 迈向「主动调用外部 A2A 智能体」的关键一步。

- **[#9876] feat(zerocode): report turn state to the terminal over OSC title and progress** — [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/9876)
  - Zerocode 现在通过 OSC 2（终端标题）和 OSC 9;4（机器可读进度）输出运行状态，生产者与消费端解耦，为终端 UI 增强打基础。

- **[#2754] fix(docker): resolve heredoc chown placement and use quoted EOF** — [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/2754)
  - 修复 Dockerfile 中 `chown` 被写入 `config.toml` 字面文本的严重错误（heredoc 未闭合+未加引号导致变量展开），该问题会导致 `/zeroclaw-data` 权限配置静默失效。属部署稳定性修复。

### 关键状态变化

- **WASM 插件治理三级火箭**：`#10746`（安装时 load-verify）、`#10750`（channel 插件 egress 治理）、`#10752`（`plugin info` / `plugin list --verify` 展示加载状态）均在持续 review 中，三者形成「安装验证 → 运行时网络管控 → 可观测性」闭环。
- **CI 性能优化**：`#10874`（去除 `needs: [fmt]` 阻塞，解决 GitHub-hosted runner 短缺时 70 分钟空等）和 `#10896`（编译任务直接 pin runner label）陆续提交，直击 CI 排队痛点。
- **A2A RFC 已有关闭 PR**：#9106 的 Phase 1 已通过 #9324 落地，Phase 2+ 有望在后续迭代中继续。

## 社区热点

### 最高讨论热度 Issues

- **[#6909] RFC: Computer-use support for desktop screen interaction and input control** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/6909)（评论 16，🔥 最高）
  由 @NiuBlibing 发起，历经 3 次修订（2026-08-24 维护者接管并做安全澄清），已获 `status:accepted`。社区对桌面端屏幕交互 + 输入控制的关注度最高，安全边界（bounded approval units、execution-time revalidation、session arming）是讨论核心。

- **[#9106] RFC: A2A outbound client (A2ATool)** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9106)（评论 11）
  @kingstar001 提出，旨在让 ZeroClaw agent 主动调用外部 A2A 智能体，补齐 #3566 只做 inbound 的缺口。已有对应 PR #9324 合入 Phase 1，社区对跨 agent 协作的诉求强烈。

- **[#9346] RFC: Define the unified package/capability/config/runtime-state catalog contract** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9346)（评论 9）
  社区希望一个产品级 catalog 统一集成、内置组件、可安装插件，当前 #8908、#8909 只覆盖了 CLI 和 gateway 的窄视图，ECP 需要整体设计。

- **[#8583] Tracker: channel/source shared-boundary cleanup and orchestration line-culling** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/8583)（评论 6）
  架构清理 tracker，要求新 channel/webhook/流式消息复用共享生命周期、schema、信任、配置模式。社区对频道接入的「重复造轮子」现象有明确担忧。

- **[#5869] security: rumqttc v0.25.1 pins rustls-webpki 0.102.x … RUSTSEC advisory cluster** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/5869)（评论 5）
  一个传递依赖引发 4 个 RUSTSEC advisory（0049/0098/0099/0104/0134），TLS 栈其余部分已修复，仅 `rumqttc` 卡住旧版本。社区对供应链安全的态度是「零容忍」。

### 讨论诉求分析

社区讨论集中在三方面：**① 扩展性**（桌面控制、A2A 外呼、XMPP 原生接入）；**② 安全边界**（所有 RFC 都伴随对权限粒度、审批边界、信任模型的密集讨论）；**③ 架构整洁**（catalog 统一、channel 共享边界清理）。整体技术社区氛围偏向「既要功能迭代，也要架构纪律」。

## Bug 与稳定性

### S1（阻塞级）

- **[#8627] WhatsApp Web 设备链接被 passkey/SHORTCAKE 新门禁阻断** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/8627)（`priority:p1`, `status:accepted`, `risk:high`）
  扫描二维码后设备链接永远无法完成。受 WhatsApp 官方新验证机制影响，属于上游平台变更导致的兼容性问题。**无 fix PR**。

- **[#10659] Budget-exceeded Code 回合在会话恢复后丢失可见进度** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)（`priority:p1`, `follow-up`, `zerocode`, `risk:high`）
  长回合达到每日成本上限后，已流式输出的内容和已完成工具活动被丢弃，S1 工作流阻断。**无 fix PR**。

- **[#9882] Image markers 绕过 run_model_query 直接派发接缝的内容验证** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/9882)（`priority:p1`, `status:in-progress`, `status:no-stale`）
  从 #9819 分裂出的遗留路径，`run_model_query` 只剥离音频标记，不执行 `prepare_messages_for_provider`，图片标记可绕过验证。**状态：in-progress**。

### S2（降级行为，按风险排序）

- **[#10885] 工具返回的图片在同一回合内、经无关工具调用后消失** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10885)（新开 09-15，`follow-up`, `risk:high`）
  ZeroCode 图片描述任务中，图片在后续模型请求中丢失。**可能与 #10480 (fix image request reject recovery) 相关**，待确认是否覆盖。

- **[#10888] 过期 tool-result 图片剥离在第二次请求时重写消息并导致缓存前缀失效** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10888)（新开 09-15，已关闭）
  #10778 的姊妹问题，序列化字节在重放历史中「恰好改变一次」，使后续全部缓存失效。**已关闭**（可能已修复或合并处理）。

- **[#10889] Anthropic 原生 provider 在最后一条消息以图片块结尾时丢弃滚动缓存断点** — [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10889)（新开 09-15）
  `apply_cache_to_last_message` 只处理 Text/ToolResult，Image/ToolUse 等块类型被跳过。**无 fix PR**。

- **[#10887] 非视觉能力门禁将「形状像标记的无图散文」误判为硬错误** — [

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-16

## 1. 今日速览

过去 24 小时（截至 2026-09-15）项目保持稳定的迭代节奏：无新版本发布，2 条 Issue 处于活跃状态（均为待处理的 Bug），5 条 PR 有更新，其中 2 条已合并/关闭、3 条仍在待审。`@sting8k`、`@stpinkie` 等贡献者活跃，修复与功能开发双线推进。项目整体健康度良好，但存在 2 个标记为 `stale` 的并发/数据丢失类 Bug 及 3 个对应修复 PR 等待维护者处理，需要关注审查时效。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭了 2 条重要的 PR，分别覆盖外部渠道稳定性和网络可观测性：

- **[#1780] [已合并] QQ 通道连接稳定性增强**（`@xiang33`，2026-03-19 创建，2026-09-15 关闭）
  将 QQ channel 的重连间隔、重试次数、速率限制改为可通过配置文件或环境变量自定义，同时保持完全向后兼容。这对依赖 QQ 通道的部署环境是一个实用的稳定性提升。
  🔗 https://github.com/sipeed/picoclaw/pull/1780

- **[#3380] [已关闭] Mesh 可观测性：Peer 连接/评分/带宽、活动流、SSE 事件（Track 63）**（`@stpinkie`，2026-09-15 创建并关闭）
  为 `PeerStatus` 增加连接信息（`conns[]`，含多地址、方向、传输协议、流数量、建立时间）、延迟 EWMA、PeerScoreStore 评分、最后活跃时间；接入 `libp2p.BandwidthReporter` 带宽统计；新增活动流与 SSE 事件推送。这是 mesh 可观测性路线图上的一次系统性补强。
  🔗 https://github.com/sipeed/picoclaw/pull/3380

这两项合一起，PicoClaw 在**外部渠道稳定性**和**内部网络可见性**两个维度均有实质进展。

## 4. 社区热点

今日最受关注的是 `@sting8k` 提交的 2 个 Bug 报告与对应的修复 PR，两者互为关联：

- **[#3374] Data race in Config.initSensitiveCache 可返回 nil replacer 并导致 FilterSensitiveData panic**（创建 2026-09-08，更新 2026-09-15，评论 1）
  🔗 https://github.com/sipeed/picoclaw/issues/3374
- **[#3373] SaveConfig 静默删除除第一个外的所有 api_key，并留下失效的 fallback 引用**（创建 2026-09-08，更新 2026-09-15，评论 1）
  🔗 https://github.com/sipeed/picoclaw/issues/3373

这两个 Issue 分别针对**并发安全**和**配置数据完整性**，都是配置子系统中的底层问题，虽然单个评论数量不多，但隐蔽性高、潜在影响面大，是社区中值得优先关注的技术债信号。

## 5. Bug 与稳定性

按严重程度排序今日活跃的 Bug：

- **[严重] SaveConfig 静默删除多 API key，残留悬空 fallback 引用（#3373）**
  多 `api_keys` 配置在 `LoadConfig` → `SaveConfig` 往返后仅保留第一个 key，且残留指向不存在模型的 `fallbacks` 引用。这是**静默数据丢失**，可能导致生产环境密钥失效且无明显报错。目前**暂无 fix PR**，需尽快修复。
  🔗 https://github.com/sipeed/picoclaw/issues/3373

- **[高] initSensitiveCache 数据竞争可返回 nil replacer 并 panic（#3374）**
  `sensitiveCache` 的懒加载未做同步，导致 `sync.Once` 形同虚设，多个 goroutine 并发访问时可能触发 panic。已由 **PR #3375** 提交修复（加锁保护懒加载初始化）。
  🔗 Issue: https://github.com/sipeed/picoclaw/issues/3374 | Fix PR: https://github.com/sipeed/picoclaw/pull/3375

- **[中] reaction 工具无法通过配置正确禁用（PR #3372）**
  `reaction` 工具在 `ToolsConfig.IsToolEnabled` 中无对应分支，始终返回默认值 `true`，导致用户无法关闭该工具（与 `agent_init.go` 中的条件注册行为不一致）。该 PR 属于配置逻辑修复，非崩溃级问题。
  🔗 https://github.com/sipeed/picoclaw/pull/3372

## 6. 功能请求与路线图信号

今日活跃 PR 中体现了两个方向的功能增强信号：

- **新增第三方 Web 搜索 Provider — Keenable（#3370）**
  添加 `web_search` provider，支持无 API key 开箱即用（调用公开端点 `POST /v1/search/public`）。若合并，将扩充 PicoClaw 的搜索工具可选性，降低新用户接入门槛。
  🔗 https://github.com/sipeed/picoclaw/pull/3370

- **mesh 可观测性功能族（#3380 已关闭/合并）**
  标志 Track 63 的闭环，为后续 mesh 场景的监控、诊断和用户仪表盘奠定基础设施，是路线图上的明确推进信号。

结合已有 PR 判断：**配置可自定义化**是当前社区贡献的一个集中趋势（QQ 通道参数、reaction 可开关、搜索 provider 可插拔），下一版本大概率会吸收这类面向部署灵活性的改动。

## 7. 用户反馈摘要

从今日活跃 Issue 的内容及评论提炼：

- **配置数据安全是真实痛点**：`api_key` 在配置往返后被静默删除、且无任何警告，用户将难以察觉生产环境密钥失效，影响配置管理的信任度（#3373）。
- **并发场景稳定性受关注**：涉及 lazy cache 的 data race 会导致 `FilterSensitiveData` 在运行时 panic，说明在多 goroutine 调用配置模块的场景下用户遇到了实际崩溃（#3374）。
- **配置自由度诉求清晰**：从 QQ channel 参数、reaction 工具开关到搜索 provider 可插拔，社区贡献者持续在「让运行时行为可配置」的方向上提交代码，反映用户对定制化部署的普遍期待。

## 8. 待处理积压

以下 Issue/PR 均已标记 `[stale]`，创建时间超一周，需要维护者关注审查或决策：

- **#3374 (Issue)** — `initSensitiveCache` data race，2026-09-08 创建；已有对应 PR #3375 待合并。
  🔗 https://github.com/sipeed/picoclaw/issues/3374

- **#3373 (Issue)** — SaveConfig 静默丢失 api_key，2026-09-08 创建；**暂无修复 PR**，需介入。
  🔗 https://github.com/sipeed/picoclaw/issues/3373

- **#3375 (PR)** — 修复 #3374 的补丁，2026-09-08 创建；等待 review/merge。
  🔗 https://github.com/sipeed/picoclaw/pull/3375

- **#3372 (PR)** — 使 reaction 工具可配置化，2026-09-08 创建；等待 review/merge。
  🔗 https://github.com/sipeed/picoclaw/pull/3372

- **#3370 (PR)** — 新增 Keenable 搜索 provider，2026-09-07 创建；等待 review/merge。
  🔗 https://github.com/sipeed/picoclaw/pull/3370

其中 **#3373 和 #3375** 属于 config 子系统正确性问题，建议优先处理；三个 fix/feature PR 均为 `stale` 状态，请维护者尽快安排代码审查，避免贡献者流失。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-16

## 1. 今日速览

过去 24 小时 NanoClaw 保持较高的开发活跃度：共更新 PR 40 条，其中 21 条已合并/关闭，19 条待合并；Issues 更新 5 条，2 条新开、3 条已关闭。无新版本发布。核心领域（agent-runner、providers、channels）存在多条并行开发线，包括性能优化、渠道适配器扩展与安全加固。特别值得关注的是 update/按切流程（#3828）与 Codex WebSocket 超时（#3338）两个未解决的运维稳定性问题，以及 Mattermost 回调安全修复（#3823）正在推进中。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 中，以下几条对项目有实质性推进：

- **[#3813] Add durable handoff safety and mission control**（已关闭）— 引入了宿主持有的持久化 handoff ledger，支持指纹合约、追加事件与 CLI 资源；在 bridge 层强制结构化 Slack 代理间投递，包含精确参与者路由、持久化回执与有限 bot 跳数。这是通道与核心协作领域的重要基础设施增强。  
  https://github.com/nanocoai/nanoclaw/pull/3813

- **[#3826] feat(providers): declare default tone settings**（已关闭）— 在运行时契约中允许 provider 声明默认 tone 及原生设置映射，core 负责解析并传给 provider factory。  
  https://github.com/nanocoai/nanoclaw/pull/3826

- **[#3827] refactor(codex): use the provider tone contract**（已关闭）— 基于新契约简化 Codex「友好默认/人格设置」的映射逻辑，是对 #3826 的直接落地。  
  https://github.com/nanocoai/nanoclaw/pull/3827

- **[#3829] perf(cross-session-context): bound echo fan to the hot set**（已关闭）— 将跨会话 echo 扇出移出消息关键路径，并限制在会话热集内，使唤醒延迟不再随兄弟会话数量增长。  
  https://github.com/nanocoai/nanoclaw/pull/3829

- **[#3830] test(webhook): allocate free ports from the kernel**（已关闭）— 修复 webhook 端口测试因随机选端口导致的 EADDRINUSE 偶发失败。  
  https://github.com/nanocoai/nanoclaw/pull/3830

- **[#3822] Ignore .worktrees/**（已关闭）— 仓库卫生改进，避免工作树出现在 untracked 文件列表。  
  https://github.com/nanocoai/nanoclaw/pull/3822

整体上，项目在性能（#3829、#3832）、安全（#3823）、provider 契约抽象（#3826、#3827）与自动化运维可靠性（#3830）四条线上均有所前进。

## 4. 社区热点

- **[#3338] Codex WebSocket idle retry is hidden until NanoClaw’s 10-minute turn timeout**（OPEN，3 条评论）— 今日讨论最集中的 Issue。核心矛盾：Codex CLI 自身每 5 分钟会检测 WebSocket 空闲并内部重连，但 **codex app-server** 没有将该失败透传给 NanoClaw；NanoClaw 只能等待 10 分钟超时，Telegram 请求因此静默挂起。诉求是希望 NanoClaw 能感知底层 WebSocket 状态并缩短无响应窗口。  
  https://github.com/nanocoai/nanoclaw/issues/3338

- **[#3828] update: cutover drain can never succeed**（OPEN，新开）— 昨天刚创建即受关注：/update-nanoclaw 先停止宿主服务再等待 agent 容器退出，但宿主本就是唯一会停止空闲容器的进程，导致 drain 永远无法完成。这对自托管更新场景是直接阻断问题。  
  https://github.com/nanocoai/nanoclaw/issues/3828

两个热点共同指向**运维与更新可靠性** —— 用户对无人值守安装和升级的失败容忍度很低。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| **高** | [#3828](https://github.com/nanocoai/nanoclaw/issues/3828) | `/update-nanoclaw` cutover drain 永远无法成功：服务已停止，但等待的容器只能被该服务停止 | 新开，OPEN，暂无 fix PR |
| **高** | [#3338](https://github.com/nanocoai/nanoclaw/issues/3338) | Codex WebSocket 空闲重试被隐藏，NanoClaw 等待 10 分钟超时时请求保持静默 | OPEN（8 月创建），暂无 fix PR |
| **中** | [#3684](https://github.com/nanocoai/nanoclaw/issues/3684) | update-nanoclaw 可变状态快照在 `data/`/`groups/` 为符号链接时捕获的是链接而非内容，回滚会还原到已前向迁移的数据 | 已关闭（建议关注修复是否已覆盖） |
| **中** | [#3354](https://github.com/nanocoai/nanoclaw/issues/3354) | setup 在非登录 SSH 会话中产生 0 字节 channel 文件；onecli 检查在 PATH 修复前执行 | 已关闭 |
| **低** | [#1981](https://github.com/nanocoai/nanoclaw/issues/1981) | v2 setup 在 headless Linux 上误判 systemd 缺失（Ubuntu Hetzner + Node 22） | 已关闭 |

另有一个相关性能修复 PR 在今日合并，有助于缓解 #3828 中涉及的会话并发问题：

- **[#3832] perf(host): reconcile and drain sessions concurrently; fixed-rate delivery polls**（OPEN）— 将宿主周期性会话循环改为并行，避免 tick 时间随 mailbox 延迟和会话数线性增长。该 PR 可能部分改善 #3828 描述的 drain 场景耗时，但并未解决其根本逻辑矛盾。  
  https://github.com/nanocoai/nanoclaw/pull/3832

## 6. 功能请求与路线图信号

从今日 OPEN 的 PR 和 Issue 中，可以识别出以下路线图信号：

- **多渠道扩展仍是主线**：包括原生 Proton Mail 适配器（#3726）、AgentMail 邮件渠道（#3743）、/add-voice 全双工浏览器语音通话（#3764）。邮件与语音是社区持续的诉求方向。
- **可观测性**：#3796（/add-telemetry，OpenTelemetry 追踪）显示用户对 agent 容器内部运行状态的可观测性需求增强。
- **Provider 认证与配置抽象**：#3825（OpenCode 通过 Iron Proxy 认证）与 #3824（共享 credential-connection 接口）说明项目正统一多 provider 的认证管理，这一方向大概率延续到后续版本。
- **投递模式可配置化**：#3781（tools-only delivery）与 #3713（per-agent-group delivery mode）直指 provider 无法可靠输出 final-text envelope 时的降级方案，对稳定性有明显价值，预计会被优先推进。
- **安全加固**：#3823（Mattermost 回调认证）已在 PR 阶段，与 #3831（迁移指南）配套，属于近期重点。

## 7. 用户反馈摘要

从今日出现/活跃的 Issues 评论中提取的真实用户痛点：

- **无人值守/非交互安装仍是重灾区**：多位用户强调在 **SSH 非登录会话、headless Linux、干净机器** 上安装时遇到 PATH 假设问题、systemd 检测失败（#1981、#3354）。用户期望 setup 完全不依赖交互式 shell 预设。
- **更新流程的脆弱性让用户焦虑**：#3684 用户 dweekly 指出 `rollback` 可能在 symlink 场景下“成功但无意义”，造成数据已经前向迁移但报告成功回滚的假象；#3828 用户则直指更新流程在自托管场景下根本无法完成。这些 bug 直接影响用户对项目可维护性的信任。
- **对“静默超时”容忍度低**：Telegram 请求在 10 分钟内无回复（#3338）对即时通信场景是不可接受的，社区期待更积极的超时/重连透传机制。
- **正面的测试改进反馈**：#3830 修复端口测试 flake 获得合并，说明用户/贡献者对 CI 稳定性敏感，社区测试基础设施在持续加固。

## 8. 待处理积压

以下 Issue/PR 长期未得到回应或解决，建议维护者关注：

- **[#3338] Codex WebSocket idle retry hidden** — 创建于 8 月 18 日，至今 OPEN，仅 3 条评论，无 fix PR。涉及即时消息用户体验，建议排期排查。  
  https://github.com/nanocoai/nanoclaw/issues/3338

- **[#3828] update cutover drain can never succeed** — 昨天新开但严重度极高，需要尽快确认修复方案或回滚相关改动。  
  https://github.com/nanocoai/nanoclaw/issues/3828

- **[#3713] feat(config): record a per-agent-group delivery mode** — 9 月 3 日创建，已停留两周以上，且与 #3781 形成依赖关系，建议合并推进。  
  https://github.com/nanocoai/nanoclaw/pull/3713

- **[#3764] feat(channels): /add-voice** — 9 月 11 日创建，目前无 review 进展，功能涉及语音交互，社区关注度可能较高。  
  https://github.com/nanocoai/nanoclaw/pull/3764

- **[#3697] Keenable MCP tool skill** 与 **[#3726] Proton Mail 适配器** 均已开放超过 10 天，若内部无战略冲突，建议尽快给出明确接收/拒绝信号，降低外部贡献者的不确定性。  
  https://github.com/nanocoai/nanoclaw/pull/3697  
  https://github.com/nanocoai/nanoclaw/pull/3726

---

**项目健康度小结**：开发节奏活跃，性能和安全修复合入及时；但更新流程系统性缺陷（#3828）与长时间静默超时（#3338）两个问题若得不到快速响应，可能影响自托管用户对项目的信任度。外部贡献者

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-16

## 今日速览

过去24小时项目活跃度显著集中于 **OpenClaw 集成修复**：共计 30 条 PR 更新（合并/关闭 20 条、待合并 10 条），其中近 20 条是针对 OpenClaw v2026.8.1 升级后的兼容性修复与回归处理，已完成密集合并。Issue 方面仅 3 条更新，2 条为 stale 自动关闭，1 条用户反馈的广告问题仍在讨论中。整体来看，项目正处于一次较深度的上游依赖兼容性修复周期，代码产出稳定但社区公开讨论偏少，健康度中等偏良好。

## 版本发布

今日无新 Release 发布。但 PR #2687（`Release/2026.9.15`）已合并，说明 v2026.9.15 版本的发布流程正在进行。建议关注该版本中包含的 OpenClaw 兼容修复与稳定性补丁。

## 项目进展

今日合并/关闭的 PR 呈现高度聚焦的特征，绝大部分围绕 **OpenClaw v2026.8.1 集成后的兼容性修复**，判断属于一次成体系的升级收尾。代表性的已合并 PR：

- **运行时依赖打包修复**（#2686、#2685）：解决 `pnpm pack` 重写 `workspace:*` 依赖导致本地补丁丢失的问题，确保 OpenClaw 运行时携带本地修改。修复了 `npm run electron:dev:openclaw` 启动失败的问题。
- **上下文压缩与输出预算**（#2684）：修复长会话中被错误从 8192 降到 1 个输出 token 的问题，保证推理模型正常返回正文。
- **历史转录回放校验**（#2682）：为旧任务中缺失 ID、类型错误或为空的字段增加校验，避免请求准备阶段崩溃。
- **技术错误详情恢复**（#2677）：恢复升级后丢失的异常摘要在错误卡片上的展示（如 `Cannot read properties of undefined (reading 'trim')`）。
- **启动自修复机制**（#2679、#2681）：网关升级后自动备份引擎数据、运行官方修复流程、隔离损坏的 legacy dreaming JSON，阻断启动失败循环。
- **POPO SDK 加载竞态**（#2664）：修复 `ERR_REQUIRE_ESM_RACE_CONDITION`，避免插件加载期间丢失 POPO 账号监听。

此外，多个 3 月底提交的老 PR（#1142–#1146）被作为 stale 关闭，包括技能快捷创建、Agent 图标修复、定时任务 UI 改进、团队配置模板等，说明维护者正在集中清理长期未合入的贡献。

## 社区热点

- **[#2342: 左下角广告可以彻底关闭吗？](https://github.com/netease-youdao/LobsterAI/issues/2342)（OPEN）**：当前唯一处于打开状态的 issue。用户对 v2026.7.15 版本中出现的左下角广告表达了明确不满，虽然可以手动关闭单次广告，但希望彻底禁用。已有对应 PR #2374 但迟迟未合并，是本日最值得关注的用户诉求。

- **[#2374: feat: add permanent setting to hide sidebar ad banner](https://github.com/netease-youdao/LobsterAI/pull/2374)（OPEN）**：为解决 #2342 提交的 PR，在「设置 → 通用」中增加永久隐藏侧边栏广告的开关。该 PR 已存在近两个月未获合并，社区与维护者之间的回复未体现在公开数据中，显得较为冷清。

- **[#2680: fix(openclaw): preserve model policy during config sync](https://github.com/netease-youdao/LobsterAI/pull/2680)（OPEN）**：OpenClaw 迁移后配置同步反复覆盖模型策略的问题，修复逻辑清晰，与 #2684 等已合并 PR 同属一批提交，预计很快会被合入。

## Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | 修复 PR |
|---|---|---|---|
| 高 | 长会话输出 token 被错误压缩至 1，模型协议成功但无正文，重复续答无法恢复 | 已修复 | [#2684](https://github.com/netease-youdao/LobsterAI/pull/2684) |
| 高 | OpenClaw 运行时缺失本地补丁（`prepareReplayMessages` 导出缺失），`electron:dev:openclaw` 启动失败 | 已修复 | [#2686](https://github.com/netease-youdao/LobsterAI/pull/2685) |
| 中 | 历史转录中坏数据导致 OpenClaw 请求准备阶段抛错，任务反复无法继续 | 已修复 | [#2682](https://github.com/netease-youdao/LobsterAI/pull/2682) |
| 中 | 升级后错误卡片丢失技术详情，仅显示 provider/model/modelSource | 已修复 | [#2677](https://github.com/netease-youdao/LobsterAI/pull/2677) |
| 中 | 损坏的 `.dreams/` JSON 阻断网关启动，普通重试和配置重建无法恢复 | 已修复 | [#2681](https://github.com/netease-youdao/LobsterAI/pull/2681) |
| 中 | POPO 2.1.13 插件加载时出现 `ERR_REQUIRE_ESM_RACE_CONDITION`，网关丢失账号监听 | 已修复 | [#2664](https://github.com/netease-youdao/LobsterAI/pull/2664) |
| 低-中 | 配置同步删除 OpenClaw 迁移产出的 `modelPolicy` 字段，导致反复写入和下发 | 待合并 | [#2680](https://github.com/netease-youdao/LobsterAI/pull/2680) |

此外，早期报告的 URL 拼接错误（#1151）和记忆提取器测试缺失（#1149）已被 stale 关闭，但对应的 PR 可能未落库，需留意是否有未完成的测试补强工作。

## 功能请求与路线图信号

- **永久隐藏广告开关**（#2342 → #2374）：用户强烈需求，PR 已存在于 7 月，建议尽快合入并发布。
- 从关闭的 stale PR 中可以吸收的功能性建议仍具复用价值：#1142 技能快捷创建入口、#1144 定时任务列表展示最后运行时间、#1145 团队配置模板导入导出。维护者若认为方向合理，可重新排期实现。
- OpenClaw 兼容性修复系列体现了项目正加速向 OpenClaw 引擎深度集成。未来版本可能重点投资于网关升级的自修复能力（如 #2679 的 doctor 修复流程），这对依赖稳定性很重要。

## 用户反馈摘要

- 来自 #2342 的用户反馈显示：用户对强制出现、又无法彻底关闭的广告有强烈的负面感受，将直接影响用户对产品的信任度。希望项目方尽快回应，明确广告策略，或合入 #2374。
- 从 #1149（补充 Vitest 测试）和 #1151（修复 Gemini URL 拼接）两个已被关闭的 PR 来看，有外部贡献者提交了高质量的缺陷修复和测试补强，但经过近半年的 pending 后被 close，可能让贡献者感到意兴阑珊。建议维护者在关闭这类 PR 时留下明确说明或引导转向新版代码库。

## 待处理积压

以下项目长期未获响应，值得维护者关注：

- **[#2374: hide sidebar ad banner 开关（7月21日创建，OPEN）](https://github.com/netease-youdao/LobsterAI/pull/2374)**：直接回应用户的迫切诉求，已近 2 个月未合并。
- **[#2680: preserve model policy during config sync（OPEN）](https://github.com/netease-youdao/LobsterAI/pull/2680)**：与已合并的多个 OpenClaw 修复同批，只差最后合入。
- **[#1181: hide OpenClaw main agent sessions（4月1日创建，OPEN）](https://github.com/netease-youdao/LobsterAI/pull/1181)**：OpenClaw 主 Agent 内部会话（hardcoded `[OpenClaw]` 标题）出现在用户会话列表的问题，已 pending 超过 5 个月。
- **[#1277: electron 依赖升级（dependabot，OPEN）](https://github.com/netease-youdao/LobsterAI/pull/1277)**：electron 43.5.0 → 44.3.0、electron-builder 的自动升级 PR，搁置已久，建议确认是否存在兼容性阻塞。

---

*报告生成时间：2026-09-16 | 数据来源：GitHub API*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

好的，这是 Moltis 项目在 2026-09-16 的每日动态日报。

---

# Moltis 项目动态日报 — 2026-09-16

## 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度 **偏低**：共 1 条 Issue 更新（#205 功能请求重新获得评论）、1 条新提交的 PR（#1270 构建优化），无新版本发布，也无 PR 被合并或关闭。社区讨论焦点集中在 **自定义 OpenAI 端点的 body 参数配置** 这一长期需求上，说明用户对第三方模型服务的接入灵活性仍有较高期待。基础设施方面，新 PR 旨在通过 BuildKit 缓存大幅缩短 Docker 镜像构建时间，反映项目正在持续改善开发者体验。总体来看，项目处于 **平稳的迭代期**，无新增 Bug 或稳定性风险信号。

## 2. 版本发布

今日无新版本发布（Latest Releases 为空），故本部分省略。

## 3. 项目进展

今日 **没有已合并或关闭的 PR**，但有一个新的待审查 PR 值得关注：

- **[#1270 [OPEN] feat(build): cache cargo across image builds, and script building the image](https://github.com/moltis-org/moltis/pull/1270)**  
  作者 @Bergmann89 于 2026-09-15 提交。该 PR 指出：此前每次 Docker 镜像构建都会因源码变动而重新编译整个 Rust 依赖树，因为 cargo 的 target 目录与 crate 注册表位于被打包进镜像层、无法复用的位置。现在将其改为 BuildKit 缓存挂载（cache mounts），使得重建时仅编译发生变更的部分并重新链接，大幅减少增量构建时间。该优化对 CI 效率和本地镜像构建体验有直接正向影响，但尚未合并，等待维护者 review。

> 虽然今日没有功能合并，但 #1270 的方案若被采纳，将显著改善项目构建流水线的效率，属于重要的基础设施进步。

## 4. 社区热点

今日唯一活跃的 Issue 是：

- **[#205 [OPEN] [Feature]: Allow setting body parameters for custom OpenAI endpoints (and per-model)](https://github.com/moltis-org/moltis/issues/205)**  
  该 Issue 由 @TheGoddessInari 于 2026-02-22 提出，在沉寂数月后于 2026-09-15 再次获得评论更新（目前共 2 条评论）。其核心诉求是：在使用自定义 OpenAI 兼容端点时，希望能够为 **全局 / 每个模型** 分别设置 HTTP 请求体（body）中的参数。评论者与作者很可能正在对接多种 OpenAI 兼容服务（如本地代理、私有网关或第三方托管），需要传递额外的、模型特有的字段（如不同的采样参数、自定义元数据等）。这一话题反映了用户在真实部署中对 **细粒度、可定制化 API 配置** 的迫切需求。

## 5. Bug 与稳定性

今日 **未报告任何新的 Bug、崩溃或回归问题**。项目没有新增 fix PR，也没有稳定性事件记录。唯一的构建相关 PR #1270 属于优化而非修复，且只影响镜像构建阶段，不涉及运行时逻辑。因此可判断项目当前处于 **较为稳定的状态**。

## 6. 功能请求与路线图信号

今日唯一的功能请求是 **#205**，要求允许为自定义 OpenAI 端点（且 per-model）设置 body 参数。该请求若被实现，将直接提升 Moltis 对多种 AI 后端（OpenAI 官方、Azure、本地 vLLM、Ollama 等）的适配能力，并允许用户针对不同模型精细控制请求体字段。结合当前构建优化 PR #1270 的趋势，项目似乎在同时投资于 **外部兼容性** 与 **内部工程效率**。虽然没有明确路线图，但 #205 的再次活跃可能使其进入维护者视野，并在未来版本中获得实现。

## 7. 用户反馈摘要

由于 Issue 评论内容未完整公开，以下仅基于标题与摘要进行合理提炼：

- **使用场景**：用户正在使用自定义 OpenAI 端点（可能指向自建或第三方兼容服务），且需要为不同模型传递不同的请求体参数。
- **核心痛点**：当前配置可能只支持全局统一请求体，或无法覆盖模型特有的参数，导致接入灵活性受限。
- **诉求表达**：用户已在提交前搜索过历史请求，确认该需求未被提出，表明这是现有功能缺口，且用户对项目已有的自定义端点支持是认可的，但希望配置粒度进一步细化。
- **情绪倾向**：未发现抱怨或不满，更多是建设性的功能建议；从该 Issue 长期开放但时隔数月仍被关注来看，用户群体对它的存在有持续关注。

## 8. 待处理积压

- **[#205 [OPEN] [Feature]: Allow setting body parameters for custom OpenAI endpoints (and per-model)](https://github.com/moltis-org/moltis/issues/205)**  
  该 Issue 自 2026-02-22 创建至今已开放近 7 个月，虽然最近有评论更新，但始终未被标记为已计划或已完成。考虑到它代表了实际用户对多模型接入的明确需求，建议维护者评估其优先级并给出响应（如标记为 planned、milestone 或请求更多细节），以避免长期悬置导致社区用户流失。

> 目前没有其他长期未响应的重要 PR；新提交的 #1270 还需要维护者尽快 review。

---

**总结**：Moltis 今日活跃度较低，但呈现两个积极信号：一是长期功能请求重新获得讨论，二是有人主动提交构建优化 PR。项目无新 Bug、无版本发布，整体健康度良好，但需要在功能请求的响应速度和 PR review 上保持关注。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-16

## 今日速览

过去 24 小时项目活跃度较高：共 26 条 Issue 更新（新开 9 条 / 关闭 17 条），PR 更新 50 条（待合并 25 条 / 合并关闭 25 条），无新版本发布。Issue 处理效率明显提升，关闭数接近新开数的两倍，社区响应速度良好。开发侧仍保持高强度合并节奏，25 条 PR 完成合并/关闭，覆盖 MCP 兼容性、多模态文件处理、Console UI 等多个方向。社区侧最热话题集中在 QwenPaw Hub 多租户版（讨论帖 27 条评论）和 subAgent 执行可靠性问题，反映出用户对团队化部署与 Agent 稳定性的双重关注。

---

## 项目进展

今日合并/关闭的 25 条 PR 中，以下几项对项目推进最为关键：

| PR | 状态 | 内容 |
|---|---|---|
| [#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636) | 已合并 | 修复 PDF 文档块在 OpenAI chat-completions 请求中被序列化为 `{"type":"file"}` 导致的问题，无论模型是否支持多模态（对应 Issue #7689）。这是对 #7621 修复的补充，覆盖了多模态模型路径。 |
| [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) | 已合并 | 修复 MCP 客户端 HTTP 错误响应解码问题（对应 Issue #7716），过滤过期的 body-framing 头，防止 HTTPX 二次解压报错，恢复 2.2.x 的 MCP 连接能力。 |
| [#7759](https://github.com/agentscope-ai/QwenPaw/pull/7759) | 已合并 | Console 前端恢复键盘焦点指示器，使用对比度安全的 focus-ring token，改善可访问性。 |
| [#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736) | 已关闭 | 添加 DeepSeek V4 Flash 的 provider catalog 能力声明（图像输入、1M token 上下文、reasoning effort 支持）。该 PR 被更晚的 [#7794](https://github.com/agentscope-ai/QwenPaw/pull/7794) 取代继续推进。 |
| [#7737](https://github.com/agentscope-ai/QwenPaw/pull/7737) | 已关闭 | 扩展多智能体协作触发关键词，让 skill-selection 提示在第一轮就能识别团队协作请求。该 PR 被 [#7795](https://github.com/agentscope-ai/QwenPaw/pull/7795) 取代继续推进。 |
| [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | 已关闭 | subAgent 模型覆盖丢失的诊断改进，记录异常日志而非静默失败。被 [#7796](https://github.com/agentscope-ai/QwenPaw/pull/7796) 取代继续推进。 |

**整体判断**：项目在 MCP 兼容性修复、多模态请求处理、Console 可用性三个方向持续收敛；另外 3 条 first-time-contributor 的 PR 被关闭后由更新版本取代，说明社区贡献流入但需要维护者跟进打磨。

---

## 社区热点

### 1. QwenPaw Hub 多租户版讨论 — [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)（27 条评论，👍 4）

这是当前社区热度最高的讨论帖。QwenPaw 团队宣布 2.2.0 将推出多租户版 Hub，并公开征集下一步功能建议。需求集中在：团队内多用户访问、管理员管理的技能库、成员权限控制、统一模型网关。该 Issue 直接驱动了新 PR [#7779](https://github.com/agentscope-ai/QwenPaw/pull/7779)（Hub 模型网关 + 成员治理 + 用量仪表盘），显示了社区需求 → 路线图 → 开发的完整链路。

### 2. subAgent 全部超时失败 — [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)（7 条评论）

用户反馈在 Windows 2.2.0 上，一旦任务 spawn subAgent 就全部失败并超时，即使设置了很长的 timeout 也无济于事。该讨论涉及多个相关 Issue（#7567），是当前最突出的稳定性问题之一。

### 3. 停止后任务实际仍在执行 — [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)（7 条评论）

Web 端点击停止后界面显示已停止，但刷新页面发现任务仍在后台继续执行，且用户输入的修正指令因 409 报错被拒绝。这属于用户信任度伤害较高的问题，需要优先处理。

其他值得关注的讨论：Docker 容器内 browser_use 失败（#5872）、历史对话右侧选项（#7739）、Agent 无限 Thinking 状态（#3871），均已关闭，说明社区诉求得到了维护者回应。

---

## Bug 与稳定性

### 严重级别：高

| Issue | 描述 | 状态 |
|---|---|---|
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | spawn subAgent 后所有任务超时失败，设置超时无效 | OPEN，无 fix PR，需定位 |
| [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 点击停止后实际任务仍在执行，引发 409 冲突 | OPEN，无 fix PR |
| [#7775](https://github.com/agentscope-ai/QwenPaw/issues/7775) | 达到 max_iters 时回合无最终答案、无警告，仅显示最后的中间文本 | OPEN，无 fix PR，ReAct 循环的核心体验问题 |
| [#7792](https://github.com/agentscope-ai/QwenPaw/issues/7792) | 微信视频/音频附件变成 `file://` URL，原样发送给 OpenAI 兼容 API 导致 400 错误 | OPEN，无 fix PR |
| [#7786](https://github.com/agentscope-ai/QwenPaw/issues/7786) | Cloud/NFS 部署下打开 workspace 文件浏览器冻结整个进程 5-6 分钟 | OPEN，无 fix PR，阻塞型 I/O 在事件循环上的问题 |
| [#7767](https://github.com/agentscope-ai/QwenPaw/issues/7767) | guardrail 插件构建报告的 4 个 bug：console 附件陈旧 blob、cron 单次触发丢失、console tail-drop、on_acting 不触发 | OPEN，无 fix PR |

### 严重级别：中

| Issue | 描述 | 状态 |
|---|---|---|
| [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | PDF 文档块发给多模态 chat-completions 端点被拒绝，补丁 #7621 只修了纯文本模型路径 | **已修复**，PR #7636 已合并 |
| [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 升级 2.2.x 后 MCP 无法连接注册 | **已修复**，PR #7735 已合并 |
| [#7771](https://github.com/agentscope-ai/QwenPaw/issues/7771) | 上下文压缩/新对话后，历史列表产生无意义空白标签 | OPEN，无 fix PR |
| [#7764](https://github.com/agentscope-ai/QwenPaw/issues/7764) | Dagu MCP 客户端因 `httpx.DecodingError: zlib incorrect header check` 保持 inactive | CLOSED（可能已引导解决） |

### 严重级别：低

- [#7772](https://github.com/agentscope-ai/QwenPaw/issues/7772) — newapi 代理后的模型无法连接（已关闭，可能为配置问题）
- [#7193](https://github.com/agentscope-ai/QwenPaw/issues/719

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 — 2026-09-16

## 1. 今日速览

ZeptoClaw 今日处于典型的"依赖维护静默期"：过去 24 小时内无 Issue 新增或关闭，亦无新版本发布。仓库的主要动态集中在 18 条由 Dependabot 自动提交的依赖更新 PR，覆盖 Rust 核心依赖、文档站 JavaScript 依赖、GitHub Actions 与 Docker 基础镜像，全部处于待合并状态。今日没有人工提交的代码 PR 被合并，功能性开发节奏趋缓，但依赖维护的自动化活跃度较高。需要特别关注的是其中包含 3 个 major 版本升级（astro 6→7、base64 0.22→0.23），可能引入破坏性变更，建议维护者尽快安排评审与测试。整体而言，项目处于稳定维护期，社区交互活跃度低，但供应链健康管理运转正常。

## 3. 项目进展

今日没有 PR 被合并或关闭，代码主干（main）无功能性变更。18 条待合并 PR 全部为 Dependabot 依赖更新，涉及范围包括：

- **Rust 核心依赖（5 条）**：clap、

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*