# OpenClaw 生态日报 2026-08-11

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-11 00:53 UTC

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

# OpenClaw 开源项目动态日报 2026-08-11

## 今日速览

过去24小时内 OpenClaw 项目保持了极高活跃度：共更新 500 条 Issue（新开/活跃 407 条，关闭 93 条）和 500 条 PR（待合并 349 条，合并/关闭 151 条），但今日无新版本发布。社区讨论焦点集中在**消息重复发送/丢失**（Telegram 重复回复 #86519、#96242）、**会话状态异常**（transcript livelock #115908、子代理会话残留 #47975）以及**认证/授权稳定性**（Codex OAuth 刷新超时 #89278）等长期顽疾上。值得注意的是，多个维护者驱动的重构 PR（如 #121715 网关类型化重构、#121767 导出命名冲突清理）正在推进中，表明项目在功能迭代的同时也在进行内部架构整治。整体来看，项目处于**高频迭代、但稳定性问题仍有积压**的状态。

---

## 项目进展

今日有 151 条 PR 被合并/关闭，其中以下维护者主导的 PR 对项目健康度提升有较大价值：

- **#121653** `feat(skills): reconcile learned skill collections` — 为可写工作区引入每日一次、隔离的模型会话，对技能集合执行原子化 `reconcile` 操作，并优化 `/learn` 命令的更新逻辑。**已关闭**。该 PR 提升了技能管理的系统性，避免技能重复/过期。（[链接](https://github.com/openclaw/openclaw/pull/121653)）

- **#121637** `fix(ui): prevent terminal garble after Gateway reconnect` — 修复 Control UI `/terminal` 页面在 Gateway 重启后渲染乱码/失效的问题。**已关闭**。属于 UI 体验修正。（[链接](https://github.com/openclaw/openclaw/pull/121637)）

- **#121658** `refactor(cloud-workers): centralize placement lifecycle fences` — 集中管理 Cloud worker 的会话存储、incarnation、worktree、canonical-owner 等生命周期栅栏逻辑，减少重复代码。**已关闭**。（[链接](https://github.com/openclaw/openclaw/pull/121658)）

- **#121776** `refactor(logging): remove dead console config fallback` — 删除控制台配置中已失效的完整配置回退加载器及冗余测试。**已关闭**。（[链接](https://github.com/openclaw/openclaw/pull/121776)）

**总结**：今日合并的 PR 以内部重构和维护性改进为主（占约 4 成），说明项目在保持新功能输出的同时，有意在偿还技术债务。

---

## 社区热点

### 讨论最激烈的 Issue

1. **#121058** — “Silent reply failures still recurring after #116277 closed — no queued reply payload”（47 条评论，[链接](https://github.com/openclaw/openclaw/issues/121058)）
   - 核心诉求：一个已关闭的“静默回复失败”问题再次复发，监控已抓取到新日志。用户对问题被标记关闭但实际未解决表达不满，需求是彻底修复而非表面关闭。

2. **#7707** — “Feature Request: Memory Trust Tagging by Source”（33 条评论，[链接](https://github.com/openclaw/openclaw/issues/7707)）
   - 核心诉求：为核心问题，夹带安全与数据完整性。为记忆条目打上来源信任标签（用户指令/网页抓取/第三方技能），防止恶意指令通过不受信内容投毒记忆。这是一个在 AI Agent 安全领域非常前置的思考，社区在此展开了长时间讨论。

### 最受关注的 PR

1. **#121586** — `feat(browser): add zero-click Chrome extension bootstrap`（由维护者 steipete 提交，[链接](https://github.com/openclaw/openclaw/pull/121586)）
   - 通过零点击配对流程，简化浏览器扩展的安装与连接，解决用户手动复制配对信息的痛点。

2. **#121715** — `refactor(gateway): migrate internal agent turn callers to the typed facade`（[链接](https://github.com/openclaw/openclaw/pull/121715)）
   - 将网关内部 10 处通过合成 RPC 客户端和伪造帧调用 agent turn 的代码迁移至类型化门面，减少 wire 层开销，提升内部调用的可信度。

---

## Bug 与稳定性

按严重程度排列（P1 为最高）：

### 高优先级（P1）

| 编号 | 标题 | 简述 | 状态 |
|------|------|------|------|
| #86519 ([链接](https://github.com/openclaw/openclaw/issues/86519)) | Agent 在 Telegram 上重复回复 2-10 次 | 5.20 更新后出现，5.22 部分修复但未根治。**已关闭** | 已有关闭记录，但 #96242 仍在跟踪 |
| #96242 ([链接](https://github.com/openclaw/openclaw/issues/96242)) | 多条独立路径导致 Telegram 重复消息 | 3 条已确认的独立代码路径导致同一消息发送两次 | **已关闭** |
| #115908 ([链接](https://github.com/openclaw/openclaw/issues/115908)) | session transcript projection 在持续写入下自锁 | 非收敛重建循环阻塞 Node 主线程数十秒，导致所有通道停摆 | 开放（无新 fix PR） |
| #89278 ([链接](https://github.com/openclaw/openclaw/issues/89278)) | Codex OAuth 刷新超时导致 cron/heartbeat 失败 | 刷新过程超过 10 秒，一些任务无法等待 | 开放（已有相关 PR #121764、#93952 在推进） |
| #40001 ([链接](https://github.com/openclaw/openclaw/issues/40001)) | write 工具缺少 append 模式，隔离 cron 破坏共享文件 | 多个会话并发写同一文件时静默互相覆盖，造成数据丢失 | 开放（无 fix PR） |
| #97616 ([链接](https://github.com/openclaw/openclaw/issues/97616)) | hook/tool 子进程泄漏，大量 zombie 堆积 | 主进程下子进程未被回收，runtime 性能逐渐退化 | 开放（PR #121108 在尝试修复子进程终止） |

### 中优先级（P2/P3）

- #119087 ([链接](https://github.com/openclaw/openclaw/issues/119087)) — Gateway 冷启动从 7.1-beta.1 到 7.2-beta.7 在 1-vCPU 容器下显著退化 ~2.5 倍（P1，开放）
- #119401 ([链接](https://github.com/openclaw/openclaw/issues/119401)) — 直接消息/DM 中的 NO_REPLY 抑制无条件生效，即使配置了 `silentReply` 策略也无法强制显示回复（P2，开放）
- #121085 (在 PR #121108 中跟踪) — 附加 Unix 进程的超时杀掉根 PID 但遗漏子进程（P1，有 fix PR）
- #93081 ([链接](https://github.com/openclaw/openclaw/issues/93081)) — Windows 安装下 Ctrl+C 无法正常工作（P2，开放）
- #119796 ([链接](https://github.com/openclaw/openclaw/issues/119796)) — Windows 上 vitest teardown 因 sqlite 句柄未释放而报 EBUSY 错误（P2，开放）

**分析**：今天的数据集中显示了几个**高频复发模块**：Telegram 回复链路（重复/静默失败）、会话 transcript 同步、OAuth 刷新与授权继承（Codex、OpenAI、Claude CLI）。其中 Telegram 相关的一系列问题（#121058、#86519、#96242、#120735）表明该通道的稳定性是当前用户感知最明显的短板。

---

## 功能请求与路线图信号

以下功能请求讨论度较高且已有 PR 关联，推测可能进入后续版本规划：

- **#22438** ([链接](https://github.com/openclaw/openclaw/issues/22438)) — **分层引导文件加载**：为大型工作区按需加载 bootstrap 文件，控制 LLM 上下文占用。已存在相关 PR 链接。（P2，社区活跃）
- **#42475** ([链接](https://github.com/openclaw/openclaw/issues/42475)) — **按 Agent 设置的 Gateway 级成本预算**：提供每日/月费用上限，防止失控消耗。（P2，有链接 PR）
- **#27445** ([链接](https://github.com/openclaw/openclaw/issues/27445)) — **`announceTarget` 路由选项**：允许子代理完成消息路由到父会话作为用户消息触发，而非直接发到频道。已有相关 PR。
- **#38568** ([链接](https://github.com/openclaw/openclaw/issues/38568)) — **在系统提示词中注入上下文窗口使用率**：让 Agent 感知当前上下文占比，辅助自我管理。
- **#40786** ([链接](https://github.com/openclaw/openclaw/issues/40786)) — **类 .gitignore 的备份排除模式**：增强 `openclaw backup create` 的可用性与安全性。

还有部分值得关注但尚无 PR 关联的需求：#7707 记忆信任标记（33 条评论，呼声高）、#15032 子代理粒度工具限制（提示词注入防御）、#117178 控制台危险操作二次确认。

---

## 用户反馈摘要

**痛点关键词：重复回复、消息丢失、会话卡死、OAuth 超时、数据被覆盖**

- **Telegram 体验受损**（来自 #86519、#96242、#120735、#119401）：多个用户反映 Telegram 通道上的消息重复发送、sticker 无法被 agent 分析、NO_REPLY 抑制过于激进等体验问题。用户 @w3-design1 报告 5.20 后出现 2-10 倍的重复回复，#120735 的发送者 @sloptop-the-terrible 指出 Telegram 贴纸到达时没有描述且未暂存到磁盘，agent 完全无法感知。

- **会话状态不可靠**（来自 #115908、#97983、#47975）：iOS/WebChat 的消息追加到 transcript 但不触发 assistant 回复（#97983）；子代理会话结束后主会话无响应（#47975）；transcript 投影发生自锁阻塞所有通道（#115908），@CanadaOrNaw 提到 Node main thread 在持续写入下被阻塞数十秒。

- **OAuth/认证链路脆弱**（来自 #89278、#83598、#98702、#118793）：@kopl-blip 在 #89278 中报告 Codex OAuth 刷新成功但 cron/heartbeat 因 10 秒超时而失败；@ChattanoogaDan 在 #83598 中指出 claude-cli OAuth 刷新在 2026.5.12 中仍失效，即使有修复。@germankovacevic-lab 在 #118793 中表示 Claude CLI 的 “session limit” 错误直接死掉而不是触发 model fallback 链。

- **数据安全顾虑**（来自 #40001、#40786）：cron 会话的 write 工具覆盖共享文件而不是追加（#40001），用户 @altsoulkiller 称 “silent data loss” —— 多个会话并发写同一文件时互相覆盖；#40786 提出备份时无法排除 .env 等敏感文件。

- **正面信号**：部分用户对功能构想表示支持（#27445 获得 5 👍、#28300 主题定制获得 5 👍）；#38568 获得 2 👍+6 评论，侧面说明用户对上下文感知能力的关注。

---

## 待处理积压

以下问题长期未获得明确 fix PR 或维护者回复，值得项目维护团队关注：

1. **#7707** ([链接](https://github.com/openclaw/openclaw/issues/7707)) — “记忆信任标记” 自 2026-02-03 提出，33 条评论讨论了近 6 个月，仍处于 `needs-product-decision` 状态，长期无结论。这是安全向功能，延迟决策有累积风险。

2. **#9986** ([链接](https://github.com/openclaw/openclaw/issues/9986)) — “触发模型回退的上下文超限” 自 2026-02-05 提出，当前模型上下文超限时不会触发配置的 fallback 链，而是冻结/报错。该能力对运行可靠性影响大。

3. **#15032** ([链接](https://github.com/openclaw/openclaw/issues/15032)) — 子代理粒度工具权限限制，2026-02-12 提出，目前仍无对应 PR。

4. **#28300** ([链接](https://github.com/openclaw/openclaw/issues/28300)) — 主题定制系统，获得 5 👍，但处于低优 P3，长期无人接手。

5. **#121058** ([链接](https://github.com/openclaw/openclaw/issues/121058)) — 静默回复失败在 #116277 关闭后复发，用户请求二次跟进但尚未有维护者回应。

---

*本日报基于 GitHub 数据自动生成，数据截止 2026-08-11。参与式准确性以官方仓库最新状态为准。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告（2026-08-11）


## 1. 生态全景

当前个人 AI 助手开源生态处于**百花齐放、分化加速**的成熟前夜。以 OpenClaw 为代表的核心项目保持日均 500+ Issue/PR 的超高迭代节奏，同时 NanoBot、IronClaw、CoPaw 等第二梯队项目围绕特定场景构建差异化能力。各项目不约而同地暴露出**消息投递可靠性、渠道认证稳定性**等共性工程短板，表明行业已从“功能探索期”转入“可靠性巩固期”。与此同时，**安全加固（OAuth、权限边界、数据隔离）** 成为跨项目共识，MCP 协议生态加速整合，桌面端产品（CoPaw、LobsterAI、EasyClaw）正在形成另一种面向个人生产力的产品形态。整体来看，生态正处于从“能用”到“好用”的关键跨越阶段。


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃） | PR（合并/待合并） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 407 新开 / 93 关闭 | 151 合并 / 349 待合并 | 无 | ⭐⭐⭐ 高频迭代，架构重构与稳定性问题并存 |
| **NanoBot** | 1 新开 / 3 关闭 | 10 合并 / 13 待合并 | 无 | ⭐⭐⭐⭐ 响应快、质量高，安全加固显著 |
| **Zeroclaw** | 0 新开 / 50 更新 | 1 合并 / 49 待合并 | 无 | ⭐⭐ 安全审计密集但修复滞后，合并瓶颈明显 |
| **PicoClaw** | 4 更新 | 7 合并 / 2 待合并 | 无（v0.3.1 最新） | ⭐⭐⭐⭐ 合并率高，小而精，维护者响应及时 |
| **NanoClaw** | 3 新开 | 10 合并 / 10 待合并 | 无 | ⭐⭐⭐⭐ 活跃度高，双线并行，可靠性待加固 |
| **IronClaw** | 50 更新 | 50 更新 | **v1.1.1-rc.1** | ⭐⭐⭐⭐ 架构治理收口期，CI 基础设施待优化 |
| **LobsterAI** | 1 关闭 | 20 合并 / 14 待合并 | 无 | ⭐⭐⭐⭐ 工程节奏好，但高影响 Bug 响应慢 |
| **TinyClaw** | 0 | 0 | — | ⚪ 无活动 |
| **Moltis** | 3 新开 | 0 合并 / 1 待合并 | 无 | ⭐⭐⭐ Bug 集中在一后端，修复节奏放缓 |
| **CoPaw** | 34 新开/活跃 | ~31 待合并 / 少量合并 | 无（v2.1.0 RC 期） | ⭐⭐⭐⭐ 发布候选期，回归问题集中整改中 |
| **ZeptoClaw** | 0 | 0 | — | ⚪ 无活动 |
| **EasyClaw** | 0 | 0 | **v1.8.96 + v1.8.97** | ⭐⭐ 社区互动低，但开发管线稳定 |


## 3. OpenClaw 在生态中的定位

**行业事实标准与规模标杆。** 从数据维度看，OpenClaw 日均 500+ Issue 和 500+ PR 的体量是第二梯队（NanoBot、IronClaw、CoPaw 等日均 20-50 条）的 10-20 倍，社区规模处于绝对领先地位。其技术路线以**“网关-会话-技能”三层架构**为核心，强调多通道（Telegram/Discord/Matrix 等）的协议抽象和云端 worker 编排；相比 NanoBot 更聚焦“轻量单机 + MCP 生态”、Zeroclaw 偏重“合规与安全审计”、IronClaw 侧重“企业级渠道集成”，OpenClaw 在**广度（按渠道数）与深度（内部架构治理）上均保持领先**。值得关注的是，其 PR 合并率仅约 30%（151/500），说明大量 PR 长期积压，维护带宽已近上限；同时多个维护者主导的**类型化重构**（#121715、#121658）表明，项目已意识到早期快速迭代累积的技术债需要系统性偿还。综合判断，OpenClaw 短期内仍将保持生态核心地位，但其稳定性短板（Telegram 重复回复、OAuth 超时）正在给 NanoBot、IronClaw 等项目留出差异化空间。


## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **消息可靠性** | OpenClaw（#121058 静默丢弃重复）、NanoClaw（#3226 静默丢弃、#3223 错误静默路由）、PicoClaw（#3311 工具失败静默循环） | 用户在多个项目中同时表达对**静默失败**的零容忍；消息丢失/重复/不可见被直接等同于“代理忽略用户”，是对信任根基的最大侵蚀 |
| **MCP 集成与 OAuth 授权** | NanoBot（#5297 已实现）、NanoClaw（#3092/#3221）、OpenClaw（Codex OAuth #89278）、CoPaw（MCP 兼容性系列 Issue） | 远程 MCP 服务器的网页授权和配置兼容性成为跨项目刚需；Streamable HTTP 标准正在被多项目同步采纳 |
| **安全加固与隐私保护** | OpenClaw（#7707 记忆信任标记）、Zeroclaw（#9647 知识图谱隔离、#9627 git 绕过、#9397 WhatsApp fail-open）、NanoClaw（#3222 DM 日志脱敏） | 从“功能安全”到“数据安全”的系统性升级：多代理数据隔离、日志脱敏、安全默认值（fail-closed）、许可绕过漏洞修复是多项目共同焦点 |
| **记忆/上下文管理与成本控制** | OpenClaw（#40001 并发写覆盖）、NanoBot（#5324 10M token 异常消耗）、CoPaw（ReMe 记忆路线图）、PicoClaw（#3311 工具循环浪费） | 上下文管理、记忆系统稳健性和 token 成本可观测性是跨项目核心关切，直接关乎运行经济性 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 通用自主代理，全渠道接入 | 开发者/高阶用户 | 网关-会话-技能三层架构，云端 worker，类型化重构推进中 |
| **NanoBot** | 轻量级个人助手 + MCP 生态 | 个人开发者/小团队 | 模块化单体，plugin 体系，Docker 友好 |
| **Zeroclaw** | 合规优先 / 安全审计 | 企业/安全敏感组织 | 知识图谱、SOP 引擎、风险分类器，治理流程重 |
| **PicoClaw** | 嵌入式/边缘 AI 代理 | 嵌入式开发者 | 轻量化、低功耗、小体积，硬件协同 |
| **NanoClaw** | 多代理 + 渠道可扩展 | 中高级用户 | 模块迁移注册表，宿主接缝，沙箱隔离 |
| **IronClaw** | 企业级渠道集成 | 团队/企业 | Reborn 架构，扩展系统，Telegram linked-device |
| **LobsterAI** | AI 编程助手/桌面应用 | 个人开发者（Windows） | Electron 桌面端 + cowork 协作界面 |
| **CoPaw** | 全功能桌面 AI 助手 | 普通个人用户 | Tauri 桌面端 + 插件市场 + 多模型管理 |
| **Moltis** | 多容器隔离的代理沙箱 | 开发者/自动化场景 | 容器隔离、多后端（Docker/Apple Container） |
| **EasyClaw** | 电商/客服任务自动化 | 电商运营人员 | 桌面端 + 客服会话/达人任务工作流 |


## 6. 社区热度与成熟度

**第一梯队（日均 500 级）**：OpenClaw —— 生态最大，但 PR 合并率仅 30%，处于**规模驱动的快速扩张期**，架构治理在追赶扩张速度。

**第二梯队（日均 20-50 级）**：NanoBot、NanoClaw、CoPaw、IronClaw —— 均处于**快速迭代兼质量巩固的并行期**。NanoBot 和 PicoClaw 日合并率高（60%+），维护效率领先；IronClaw 和 CoPaw 正处发布候选期，以稳定性收敛为主要特征；LobsterAI 工程节奏快（日合并 20 PR）但高影响 Bug 长期搁置。

**第三梯队（低活跃或停滞）**：Zeroclaw（高讨论低合并，安全修复积压严重）、Moltis（合并放缓，bug 集中在一后端）、EasyClaw（社区静默但版本迭代稳定）、TinyClaw/ZeptoClaw（无活动，或已被替代）。

**成熟度判断**：PicoClaw 和 NanoBot 虽然体量小，但在响应速度、合并质量和安全投入上表现突出，是**工程成熟度/社区规模比最高**的项目；Zeroclaw 尽管讨论活跃，但"提交-合并"链路不畅，成熟度受限；OpenClaw 的长期健康度受困于 349 个待合并 PR 的积压压力。


## 7. 值得关注的趋势信号

**1）可靠性成为竞争分水岭。** 从 OpenClaw 的 Telegram 重复回复到 NanoClaw 的静默丢消息，跨项目用户的共识是：“出错可以，但不能无感知。” 建议关注是否有项目率先建立**结构化错误上报与可观测性基础设施**（如 IronClaw 的 logprobs 采集只是前奏），这将成为下一代助手体验的分水岭能力。

**2）安全审计系统化、售卖化。** Zeroclaw 的 @belumume 系列安全审计（跨 7+ 组件）和 CoPaw 对杀毒软件误报的讨论表明，**安全已从单点修复走向系统化审计**，安全能力将成为开源 AI 助手竞争的重要维度。开发者应关注默认安全（fail-closed）设计、以及 MCP/OAuth 等外部集成的权限最小化。

**3）MCP 协议加速标准化。** 多个项目同步支持远程 Streamable HTTP MCP（NanoClaw、NanoBot）与 OAuth 网页授权，预示着 MCP 正在成为 AI Agent 工具调用的实际标准。开发者在自建 Agent 时，优先考虑 MCP 兼容能最大化生态复用价值。

**4）架构成熟度与项目生命周期分化。** OpenClaw 和 IronClaw 的模块化重构、NanoClaw 的迁移注册表、CoPaw 的插件市场统一——头部项目已进入第二阶段的架构治理，而 Zeroclaw 的合并瓶颈暴露了治理流程尚未跟上活跃度。建议技术选型时优先关注**架构治理能力**（而非仅功能数量）以判断项目长期可维护性。

**5）桌面端 AI 助手产品形态正在成熟。** CoPaw、LobsterAI、EasyClaw 三家从不同角度（通用助手、编程辅助、电商运营）切入桌面端，形成了与 OpenClaw 等纯后台代理互补的产品路线。这与开发者对本地交互、可视化、隐私控制的重视相呼应，预计后续会有更多“反转后端”的产品设计出现。

**6）成本可观测性需求抬头。** NanoBot 的 token 异常消耗报告、OpenClaw 的 #42475 成本预算请求、CoPaw 的“已接收字符数”争议——用户对 AI 助手的**算力消费透明度和控制力**的要求正在提升，这将是商业化/大规模部署绕不开的议题。


*报告基于 2026-08-11 GitHub 公开数据生成，数据完整性以各仓库官方状态为准。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-11

> 数据周期：2026-08-10 至 2026-08-11

## 1. 今日速览

NanoBot 项目今日保持高度活跃，过去 24 小时 **合并/关闭 10 个 PR、新增 13 个待合并 PR，另有 3 个 Issue 结案、1 个新 Issue 待处理**。今日开发重心集中在三条主线：**WebUI 安全架构调整**（跨域设置服务、认证 WebSocket 化）、**Agent 稳定性修复**（无意义编辑拒绝、反射替换、循环上限），以及 **重要功能落地**（MCP 浏览器 OAuth 授权已合并，直接回应了此前社区对网页授权功能的诉求）。值得关注的是，Dream 记忆整理消耗异常（超 10M token）的严重 bug 报告发布后，**当日即有对应修复 PR 合并**，反映出项目对回归问题的响应速度较快。目前仍有一个新报告的「推理重复消息」bug 尚无修复方案，需持续跟踪。


## 2. 版本发布

过去 24 小时无新版本发布。


## 3. 项目进展

今日合并/关闭的重要 PR 覆盖了多个方向，核心进展如下：

### 🔐 WebUI 安全架构调整（连串重构）
- **[PR #5317] fix(webui): move mutations to authenticated WebSocket requests**（已合并）：将 WebUI 状态变更操作从 GET/query-string 迁移至认证 WebSocket 的请求/响应帧，属安全加固，对防护 CSRF 类攻击有实质意义。
- **[PR #5321] refactor(webui): make gateway own settings services**（已合并）：引入网关持有的 WebUI 设置服务，采用显式配置路径与原子化读写操作，设置管理走向更规范的服务边界。

### 🧩 MCP 生态能力增强
- **[PR #5316] feat(mcp): add browser OAuth for remote servers**（已合并）：为远程 Streamable HTTP 和 SSE MCP 服务器添加浏览器 OAuth 支持（基于官方 MCP SDK），附带 Xmind、Notion、Linear 一键预设。**这直接落地了 Issue #5297 的功能请求**，对 MCP 实用性和生态扩展是重要里程碑。

### 🛠 Agent 稳定性与代码质量
- **[PR #5325] fix(files): reject no-op edits**（已合并）：拒绝 `edit_file` 中 new_text 与 old_text 完全一致的调用，直接修复了 #5324 中 Dream 记忆整理因无意义编辑陷入无限循环的问题，当日快速响应值得肯定。
- **[PR #5319] refactor(agent): replace reflective runtime state access**（已合并）：以显式 `RuntimeControl` 协议替换反射式循环状态访问，提升可维护性与安全性。

### 📱 渠道层修复
- **[PR #5310] fix(weixin): honor forced QR login**（已合并）：修复微信渠道强制二维码登录未完全生效的问题。


## 4. 社区热点

- **[Issue #5324] Dream 记忆整理无限循环 / 消耗超 10M token**（2 条评论，已关闭）
  链接: https://github.com/HKUDS/nanobot/issues/5324
  本日最值得关注的问题。用户报告 Dream 记忆整理异常运行 23 分钟、消耗约半个月用量（10M+ token）。关联 PR #5325 当日即合入修复根因（edit_file 接受 no-op 编辑导致持续触发循环），项目对「算力/成本异常」类问题的响应速度和修复质量均属上乘。

- **[Issue #5297] 希望 MCP 增加 OAuth 网页授权功能**（3 条评论，已关闭）
  链接: https://github.com/HKUDS/nanobot/issues/5297
  社区对 MCP 服务器网页授权有明确刚需（如 Xmind MCP 需 OAuth），**该请求随 PR #5316 合并而落地**，社区诉求得到高效闭环。

- **[Issue #5327] 推理过程中重复输出同一消息**（0 条评论，OPEN）
  链接: https://github.com/HKUDS/nanobot/issues/5327
  新报告的随机性 bug，尚无讨论和修复方案，需在日报中标记跟进。


## 5. Bug 与稳定性

| 严重度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#5324](https://github.com/HKUDS/nanobot/issues/5324) | Dream 记忆整理无限循环，23 分钟消耗 10M+ token | 已关闭，**[PR #5325](https://github.com/HKUDS/nanobot/pull/5325) 已修复** |
| 🟠 中高 | [#5327](https://github.com/HKUDS/nanobot/issues/5327) | 推理中随机重复同一消息，影响对话质量与 Token | OPEN，**暂无对应 PR** |
| 🟡 中 | [#5300](https://github.com/HKUDS/nanobot/issues/5300) | MCP 连接失败未隔离，anyio cancel scope 跨任务崩溃导致网关卡死 | 已关闭，未找到明确修复关联 |
| 🟡 中 | [#5326](https://github.com/HKUDS/nanobot/pull/5326) | 表单控件焦点光环样式问题（UI 低危） | OPEN（待合并） |
| 🟢 低 | [#5315](https://github.com/HKUDS/nanobot/pull/5315) | 工作区会话创建失败时首条消息丢失、空状态体验不佳 | 已合并修复 |


## 6. 功能请求与路线图信号

- **MCP 网页 OAuth 授权（#5297）**：已通过 [PR #5316](https://github.com/HKUDS/nanobot/pull/5316) 实现，**大概率进入下一版本发布计划**（或已合入主干）。
- **OrcaRouter 作为命名网关 Provider（[PR #5328](https://github.com/HKUDS/nanobot/pull/5328)，OPEN）**：新增 OpenAI 兼容路由网关支持，聚合 150+ 模型，自带零信任安全能力，属于生态扩展型功能，值得关注。
- **Agent Plugins 与 CLI Apps 集成（[PR #5288](https://github.com/HKUDS/nanobot/pull/5288)，OPEN）**：推动 Agent Plugins 成为可移植技能/MCP 运行时的中立边界，是架构长期演进方向。
- **结构化 Token 用量记录接口（[PR #5299](https://github.com/HKUDS/nanobot/pull/5299)，OPEN）**：在现有 `/api/settings/usage` 之外新增按天明细记录 API，回应用户对 Token 消耗透明化的需求。


## 7. 用户反馈摘要

- **Token 成本敏感度高（#5324）**：用户对异常消耗非常敏感（「超 10M token，约半个月用量」），社群对算力成本控制有较高期望。
- **MCP 配置实际场景复杂（#5297、#5300）**：远程 MCP 服务器往往需要 OAuth 网页授权流程，且部分服务如 Xmind MCP 必须依赖该流程才能使用；同时 MCP 连接失败（HTTP 530/Cloudflare 1033）时若容错不当，会导致程序崩溃或 CPU 异常飙升，直接影响生产使用信心。
- **AI 推理可预测性期望（#5327）**：重复消息「似乎随机出现」，用户难以理解触发条件，反馈该类问题需附带更清晰的可复现路径。


## 8. 待处理积压

| 类型 | 编号 | 说明 | 建议 |
|---|---|---|---|
| 🐛 Bug | [#5327](https://github.com/HKUDS/nanobot/issues/5327) | 推理中随机重复消息，社区已报告但 0 讨论、0 PR | 建议尽快确认 issue 有效性与复现条件，标记优先级 |
| 🔧 PR | [#5288](https://github.com/HKUDS/nanobot/pull/5288) | Agent Plugins + CLI Apps 集成，7 天未有实质进展 | 涉及架构演进，建议维护者安排评审 | 
| 🔧 PR | [#5179](https://github.com/HKUDS/nanobot/pull/5179) | MCP SDK v2 迁移（含 legacy 兼容），创建超 10 天，**带 conflict 标记** | 需尽快处理冲突，避免长期分叉 |
| 🐛 PR | [#5271](https://github.com/HKUDS/nanobot/pull/5271) | 后台任务覆盖会话数据（p0 级），待合并中 | 虽非今日新增，但优先级 p0，持续提示跟进 |
| 🔧 PR | [#5320](https://github.com/HKUDS/nanobot/pull/5320) | Docker 权限降级修复（p1），CI 验证已加强 | 涉及安全合规，建议优先合入 |

---

**日报总结**：NanoBot 项目今日呈现「响应快、合入多、安全问题重视程度高」的健康态势，MCP OAuth 功能的落地和 Dream 循环 bug 的紧急修复是今日亮点。需关注的新增风险是 #5327 的重复消息 bug 尚无修复方案。整体项目处于快速迭代窗口，但存在 **4 个待合并 PR 已标记 conflict**，建议维护者尽快协调，避免累积技术债。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-11

## 今日速览

过去24小时项目活跃度维持高位：共 50 条 Issue 更新、50 条 PR 更新，但全部集中在存量事项的推进（新增 0 条 Issue、0 个新版本），无新版本发布。值得关注的是，安全审计类 Issue 持续占据讨论焦点——多条由 @belumume 和 @metalmon 提交的高危安全缺陷（知识图谱数据隔离、git 命令绕过风险分类器等）正在等待维护者响应，已有多条进入 `status:in-progress`。合并方面，24 小时内仅有 1 个 PR 被合并/关闭（#8301，测试类），49 个 PR 仍在待合并状态，且大量标记 `needs-author-action`。整体判断：项目处于高活跃、低合并的积压状态，安全治理是当前主线。

---

## 版本发布

过去 24 小时无新版本发布。当前版本停留在 v0.8.3（参考 Issue #9562 中用户报告）。关注 #6808 治理 RFC 中提到的 "Starting 0.8.0-beta-1 | Current 0.8.3" 的滚动计划。


## 项目进展

**今日合并/关闭 PR（1 个）：**

- **[#8301] test(hardware): cover catalog tool name format**（已关闭）— @WeeLi-009 贡献，为目录工具名格式添加回归测试，确保工具名均为 `lower_snake_case` 标识符。纯测试改动，无生产代码变更。标签：trusted contributor, risk:low, size:XS
  https://github.com/zeroclaw-labs/zeroclaw/pull/8301

**整体推进评估：**

项目今日代码合并几乎停摆——仅有一个小测试 PR 被关闭，且该 PR 实际创建于 6 月 24 日，属于积压清理。49 个待合并 PR 中，大量带有 `needs-author-action` 标签（如 #8576、#8486、#9110、#8955、#8561、#8443 等），说明作者侧的响应是当前合并瓶颈。另一方面，多条高优先级 Issue 已获 `status:accepted` 或 `status:in-progress`（如 #9397 WhatsApp 安全、#9647 知识图谱归属、#9779 SOP 默认目录问题），说明维护者对方向已认可，但修复 PR 尚未跟进，预计后续几天会有对应的 PR 出现。

---

## 社区热点

**讨论最活跃的 Issue：**

1. **#6808 RFC: Work Lanes, Board Automation, and Label Cleanup**（23 条评论）— 这是一份治理性 RFC，目标是通过自动化工作流路由（work lanes）和标签清理来降低维护成本。更新至 Rev. 24，已进入 "Ratification deferred / rollout in progress" 状态。该 RFC 也侧面解释了为何大量 PR 带 `stale-candidate` 标签——项目正在重新梳理标签体系。
   https://github.com/zeroclaw-labs/zeroclaw/issues/6808

2. **#7100 RFC: Per-model capability & context-window config**（13 条评论）— 讨论模型能力（vision 支持、上下文窗口大小）从 provider 默认值中解耦，改为按模型的显式配置。核心痛点是 provider 家族默认值会误报模型的视觉能力，以及未设置时默认回退到 32000 token 与模型实际容量不符。
   https://github.com/zeroclaw-labs/zeroclaw/issues/7100

3. **#8692 Tracker: Maintainer decision queue for RFCs and design issues**（12 条评论）— 面向治理流程的决策队列。说明当前大量 RFC 和设计问题积压，维护者需要明确的优先级排序机制。
   https://github.com/zeroclaw-labs/zeroclaw/issues/8692

4. **#9397 RFC: Treat empty WhatsApp Web `allowed_groups` as permit-none**（12 条评论）— 目前 `allowed_groups` 默认为空列表，而空列表会导致所有群组都被允许（fail-open），RFC 提议改为 fail-closed（空列表 = 拒绝全部）。@belumume 负责准确性，体现了社区对默认安全语义的重视。
   https://github.com/zeroclaw-labs/zeroclaw/issues/9397

**评论人画像：** @Audacity88 活跃于治理流程类讨论；@belumume 主导安全审计类话题；@metalmon 关注运行时安全缺陷。

---

## Bug 与稳定性

**按严重程度排列：**

| 严重级别 | Issue | 摘要 | 状态 | 修复 PR |
|---------|-------|------|------|---------|
| S0 | [#9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647) | 知识图谱无 per-agent 归属，任意 agent 可读写其他 agent 的知识 | in-progress | 暂无 |
| S0 | [#9627](https://github.com/zeroclaw-labs/zeroclaw/issues/9627) | git 写动词通过 `-C`/`--git-dir` 等全局选项绕过风险分类器和审批门 | in-progress | 暂无 |
| S0 | [#9855](https://github.com/zeroclaw-labs/zeroclaw/issues/9855) | Matrix 通道未遵循 `.well-known/matrix/client` 委托解析 homeserver | accepted | 暂无 |
| S1 | [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) | `web_fetch` 对 gzip/brotli/deflate 压缩响应返回乱码 | in-progress | 暂无 |
| S1 | [#9425](https://github.com/zeroclaw-labs/zeroclaw/issues/9425) | 运行中的 SOP 作业在 Web 仪表盘无取消路径 | in-progress | 暂无 |
| S1 | [#9035](https://github.com/zeroclaw-labs/zeroclaw/issues/9035) | Docker Compose 网关保持 loopback 绑定，发布端口无法访问 | in-progress | 暂无 |
| S1 | [#9779](https://github.com/zeroclaw-labs/zeroclaw/issues/9779) | `[sop] sops_dir` 文档默认值未被守护进程兑现，SOP 静默不加载 | accepted | 暂无 |
| S1 | [#9389](https://github.com/zeroclaw-labs/zeroclaw/issues/9389) | 未认证 POST /api/pair 的锁定基于攻击者可控 header | in-progress | 暂无 |
| S1 | [#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) | 命令审计日志默认启用但实际不写任何内容 | in-progress | 暂无 |
| S1 | [#9392](https://github.com/zeroclaw-labs/zeroclaw/issues/9392) | LINE 群消息跳过 allowlist 和配对握手 | in-progress | 暂无 |
| S1 | [#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393) | Bluesky 和 Reddit 无发送者授权，且无中央门卫覆盖 | in-progress | 暂无 |
| S1 | [#9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395) | 插件 wasi:http 出站无目标策略和配置旋钮 | in-progress | 暂无 |
| S2 | [#9768](https://github.com/zeroclaw-labs/zeroclaw/issues/9768) | 守护进程未在 SIGUSR1 上重载，降级安全警告反而引导用户发信号杀死守护进程 | accepted | 暂无 |
| S3 | [#9844](https://github.com/zeroclaw-labs/zeroclaw/issues/9844) | ZeroCode 仪表盘 CPU 指标不标识测量进程（展示 daemon 的 CPU 而非自身） | accepted | 暂无 |

**值得注意的趋势：** @belumume 发起的系列安全审计（#9389~#9397 区间）构成系统性发现——同一审计跨度覆盖 gateway、channels、plugins、runtime 多个组件，这些问题有望成为后续批量修复的输入。目前无一条已获修复 PR，是潜在的合并推进方向。安全审计所引用的 cada una línea 均已在 HEAD 上验证，可信度和可操作性较强。


## 功能请求与路线图信号

**下一版本（v0.9.x）可能纳入的方向：**

1. **OpenAI 兼容网关端点** — PR #8486（@REL-mame，size:XL）为网关新增 OpenAI Chat Completions 协议的支持，使 LangChain、Continue.dev、OpenAI SDK 等生态工具可直接对接。相关 issue #8550、#8603、#6850。该 PR 已获 `enhancement` 标签，但目前停留 `needs-author-action`。
   https://github.com/zeroclaw-labs/zeroclaw/pull/8486

2. **PowerShell 原生支持** — PR #9182（@NiuBlibing，principal contributor）为 Windows 引入 PowerShell 作为 `runtime.shell` 的优选路径（`-NoProfile -NonInteractive -Command`），保留 `cmd.exe /C` 为默认。提升 Windows 平台的体验一致性。
   https://github.com/zeroclaw-labs/zeroclaw/pull/9182

3. **Hailo-Ollama 原生支持** — PR #9109（@vadelma-agent）对接 Hailo-Ollama 的 `/api/chat` 和 `/api/tags` 契约，为边缘 AI 推理硬件铺路。
   https://github.com/zeroclaw-labs/zeroclaw/pull/9109

4. **LLM-judge 评估器** — PR #9222（@IftekharUddin）新增按维度打分的 LLM-judge grader，但刻意保持 "diagnostic until calibrated" 状态，不会作为闸门。体现对评估可靠性的审慎态度。
   https://github.com/zeroclaw-labs/zeroclaw/pull/9222

5. **git 写命令风险分类修复** — Issue #9627 虽然当前无修复 PR，但其 S0 级别和清晰的定位（`args.first()` 误读）意味着修复成本不高，可能很快由报告者或其他贡献者提交补丁。

---

## 用户反馈摘要

从近期 Issue 和评论中提炼的用户声音：

- **知识图谱数据安全是刚需**（#9647）：用户明确表达了对多 agent 共享知识的担忧——"任何 agent 可以读取并篡改另一个 agent 捕获的知识"，这在大规模部署中是不可接受的。该问题被评为 S0（数据丢失/安全风险）。

- **压缩响应导致工具不可用**（#9207）：@jhugard 反馈 `web_fetch` 对 gzip 站点返回垃圾二进制数据，"这无法被 agent 解析"，直接阻塞了工作流。这类基础工具的质量问题影响面广。

- **无法取消运行中的任务**（#9425）：仪表盘能"看到"任务在跑，但无法停止。"Approve 和 Deny 只在运行尚未开始时显示"——缺乏对进行中流程的管控手段。

- **文档默认值与实际行为不符**（#9779）：运营商依赖文档中声明的 `sops_dir` 默认值配置系统，结果 SOP 引擎静默不加载，"无错误、无警告、无日志"。对可观测性的抱怨是反复出现的主题（参见 #9391 审计日志假启用、#9844 指标标识错误）。

- **WebChat 滚动行为干扰阅读**（#9562）：流式回复期间自动滚动覆盖手动滚动，"在 agent 回复时无法阅读历史消息"——影响实际使用体验的小问题。

---

## 待处理积压

**长期未响应或可能失速的 PR（标记 `needs-author-action` 或 `stale-candidate`）：**

| PR | 内容 | 上次更新 | 标签 | 关注点 |
|----|------|---------|------|--------|
| [#8576](https://github.com/zeroclaw-labs/zeroclaw/pull/8576) | OpenAI STT 凭据的环境变量回退支持 | 08-11 | needs-author-action, stale-candidate | 修复 #7899，改进了配置生命周期的一致性体验。已挂 40 天 |
| [#8486](https://github.com/zeroclaw-labs/zeroclaw/pull/8486) | OpenAI Chat Completions 网关端点 | 08-11 | needs-author-action | size:XL，实现量大，需要作者响应 review 意见。已挂 43 天 |
| [#9110](https://github.com/zeroclaw-labs/zeroclaw/pull/9110) | Lark verification_token 恒定时间比较 | 08-11 | needs-author-action, risk:high | 安全修复，改动极小（XS），但已挂 25 天未合入 |
| [#8955](https://github.com/zeroclaw-labs/zeroclaw/pull/8955) | Telegram 媒体组附件批处理 | 08-11 | needs-author-action | Telegram 体验提升，已挂 32 天 |
| [#8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | Telegram multi_message 流式模式 | 08-11 | needs-author-action | 对齐 Discord/Matrix 能力，已挂 42 天 |
| [#8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443) | Matrix 单消息进度草稿 | 08-11 | needs-author-action | 跨三个 channel 的差异化体验，已挂 44 天 |
| [#8655](https://github.com/zeroclaw-labs/zeroclaw/pull/8655) | ZeroCode 代码面板与提示草稿整合 | 08-10 | stale-candidate, needs-author-action | 大规模重构（XL），涉及核心 UX 方向 |
| [#8713](https://github.com/zeroclaw-labs/zeroclaw/pull/8713) | file_download SSRF 门的 `allowed_private_hosts` 加入机制 | 08-10 | needs-author-action | 安全增强，挂 38 天 |

**特别提醒：** 多条 7 月中旬创建的 PR（#8576、#8486、#8561、#8443）在进入 8 月后依然标注 `needs-author-action`，维护者若持续不响应会积累成历史包袱。另外注意 #8301（今日唯一合并项）虽已关闭，但其 `stale-candidate` 标签的存在说明该项目已启用自动过期机制——积压的 49 个 PR 若长期无动作可能面临自动关闭风险。建议维护者优先处理小改动、高价值的安全类 PR（#9110、#8713），再攻克大的功能 PR。

---

**日报总结：** Zeroclaw 在 8 月 11 日处于高讨论、低合并的节奏。安全缺陷报告密集而修复滞后是当前项目健康度的最大风险——跨多个 channel 的身份验证与授权一致性问题已呈系统化趋势。另一方面，功能 PR 体量大（多个 XL）、

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026‑08‑11

> 数据更新窗口：2026‑08‑10 至 2026‑08‑11


## 1. 今日速览

PicoClaw 今日活跃度中等偏上，24 小时内共产生 4 条 Issue 更新和 9 条 PR 更新，其中 7 条 PR 已完成合并/关闭，合并率约 78%；两条 OPEN 状态的 PR 恰好对应今日两个仍待处理的稳定性 Issue，修复方向明确。过去两三日内社区集中提交了多项质量修复（表格渲染、安全边界加固、多模型展示等），且均已成功合入主干，说明项目维护节奏正常、维护者响应及时。当前无新版本 Release，v0.3.1 仍为最新稳定版。整体项目健康度良好，重点待办集中在**工具循环失败静默重试**与 **customAllowPatterns 优先级**两个问题上。


## 2. 版本发布

无（在过去 24 小时窗口内没有新 Release）。


## 3. 项目进展

今日有 7 个 PR 被合并或关闭，主要推进了以下几个方向：

**安全与执行边界加固（较大变更）** — [#3297 fix(security): harden remote prompt and exec boundaries](https://github.com/sipeed/picoclaw/pull/3297)
- 将远程发送者与聊天元数据置于归一化的 user-role 信封中，而非放进 provider 系统指令，减少提示词注入面
- 远程 exec 默认改为禁用，启用后需独立按调用审批，并在执行时重新强制 origin 策略
- 配置迁移至 schema v4
- 此 PR 为安全敏感变更，合入后配置结构有调整，自托管用户升级前需留意配置文件迁移。

**Telegram 表格富文本渲染** — [#3327 feat(telegram): render tables with native rich messages](https://github.com/sipeed/picoclaw/pull/3327)
- 将 GFM/HTML 表格在 Telegram 上以 Bot API 原生富文本呈现，替代原先等宽代码块，显著改善表格类对话的阅读体验。

**消息分割死锁修复** — [#3295 fix(channels): prevent SplitMessage hang on oversized fence headers](https://github.com/sipeed/picoclaw/pull/3295)
- 修复当开 fence 的 info 字符串超过 maxLen 时 `SplitMessage` 死循环挂起的问题，新增回归测试覆盖。

**Web 前端构建修复** — [#3326 fix(web): remove duplicate pnpm lock entries](https://github.com/sipeed/picoclaw/pull/3326)
- 消除 `pnpm-lock.yaml` 中字节级重复的 semver 条目，修复 `pnpm install --frozen-lockfile` 因锁文件损坏而失败的问题（影响 CI 与本地开发安装）。

**i18n 捷克语补全** — [#3296 i18n: complete Czech code wrap labels](https://github.com/sipeed/picoclaw/pull/3296)

另有两个较早的 PR（#1547 合并 PR、#2132 模型级 max_tokens 配置）于今日关闭，后者对应配置项解耦的增强功能。


## 4. 社区热点

今日讨论热度较高的是老 Issue [#3301](/sipeed/picoclaw/issues/3301) —— **通过 dispatch rules 路由到非默认 agent 的会话中 `/clear` 与自动压缩失效**（3 条评论，虽被标记为 `stale` 但更新于 8‑10），核心诉求是 `dispatch` 路由后会话管理命令的语义一致性，涉及多 agent 场景下的会话生命周期管理。

另一个值得关注的是 [#3311](/sipeed/picoclaw/issues/3311) **工具重复失败静默循环**（1 条评论，含生产环境具体复现）。该 Issue 描述了一个“看似卡死、用户长时间得不到响应”的高影响行为，在 Telegram 场景中尤其影响体验，评论区关注度高。该 Issue 已有一个对应的修复 PR（#3312，见下），维护方已有明确处理方向。


## 5. Bug 与稳定性

按严重程度从高到低排列：

| 严重级别 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#3311](/sipeed/picoclaw/issues/3311) | 工具每次调用返回相同错误时，agent 会静默循环重试直到 `max_tool_iterations`，期间用户得不到任何响应（生产环境 Telegram 实测，一条 git 命令消息数分钟无回应） | OPEN；已有对应修复 PR [#3312](/sipeed/picoclaw/pull/3312) |
| 🟠 中 | [#3301](/sipeed/picoclaw/issues/3301) | 经 dispatch rules 路由到非默认 agent 的聊天中，`/clear` 和会话自动压缩不生效 | OPEN，等待处理 |
| 🟠 中 | [#3314](/sipeed/picoclaw/pull/3314) | `customAllowPatterns` 不生效：即使将 `git push` 加入允许列表，默认拒绝规则仍优先（`guardCommand` 中默认 deny 模式始终优先于自定义 allow 模式） | OPEN，修复 PR 已提交待 review |
| 🟡 低（已修复） | [#3297](/sipeed/picoclaw/pull/3297) | 远程执行边界不够严格（提示词注入面、远程 exec 默认开启等） | 已合入 |
| 🟡 低（已修复） | [#3295](/sipeed/picoclaw/pull/3295) | `SplitMessage` 在 oversized fence headers 时死锁挂起 | 已合入 |


## 6. 功能请求与路线图信号

- **AI Router 预设（Issue #3298，已关闭）**：作者请求将 AI Router 添加为 OpenAI 兼容 provider 预设，以便用户可选具名路由而非手动设置 `api_base`。该 Issue 今日被标记关闭，但提交者表示愿意以贡献者身份参与实现——**此功能很可能以 PR 形式在后续版本回归**。
- **/list models 展示全部配置模型（Issue #3294，已关闭）**：用户期望 `/list models` 列出所有 `model_list` 中配置的模型，而非仅当前一个。该 Issue 今日关闭但未见对应实现 PR，可能已通过其他方式解决或在其他 PR 中处理。
- **Telegram 表格富文本**（PR #3327）：已合入，是近两日社区提交的新功能改进，预告后续版本电报端表格体验有较大提升。
- 模型级 max_tokens 配置（PR #2132）：今日关闭，合入后模型可独立设置 token 上限，属于配置细粒度优化。


## 7. 用户反馈摘要

- **生产稳定性关注**（Issue #3311）：用户 @lucapette 反馈在真实 Telegram 生产环境中，工具反复失败（如 git 无凭据）时 agent“静默空转”，用户永远不会收到答案。痛点在于**错误不可见 + 重试无上限**，用户期望要么快速失败要么给出明确错误提示。
- **安全与自定义的冲突**（Issue #3314）：@j-v 报告配置了 exec allow list 后 `git push` 仍被拦截，表示“按照测试它应该是可以工作的”。反馈核心是 **自定义配置优先级低于默认安全策略，且缺乏清晰的绕过路径**。
- **会话管理语义不一致**（Issue #3301）：@j-v 提出的 dispatch 后 `/clear` 失效问题，反映多 agent 路由场景下命令空间未按 agent 隔离，用户需要对“哪个 agent 在哪个会话拥有什么命令上下文”有更强可控性。
- 正反馈：今日合入的 Telegram 表格渲染、SplitMessage 修复等均源自社区反馈并快速落地，说明维护者积极倾听用户、迭代效率高。


## 8. 待处理积压

以下条目值得维护者优先关注：

- **🔴 PR #3312 `fix(agent): stop turn early on repeated identical tool failure`** — 对应 Issue #3311，直接解决“工具循环失败不回复用户”的生产问题。建议优先 review 并合入。
- **🟠 PR #3314 `Fix: agent not able to execute shell command added to customAllowPatterns`** — 修复自定义 allow 规则被默认 deny 覆盖的问题，阻塞了部分用户的 shell 操作场景，等待维护者 review。
- **🟠 Issue #3301 `/clear and session auto-compression don't work in chats routed to non-default agent`** — 旧 Issue（7‑29 创建）至今无修复 PR 关联，多 agent 会话管理相关问题被多次提及，建议明确排期。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-11

## 1. 今日速览

过去24小时内 NanoClaw 社区活跃度较高，**核心团队与外部贡献者均有密集动作**。PR 更新达 20 条（10 合并/关闭，10 待合并），显示项目在可维护性重构与功能推进上双线并行。值得注意的是，**今日新开的 3 个 Issue 中有 2 个直指同一类"静默丢消息"稳定性隐患**（#3226、#3223），且 #3226 已由报告者附带提交了修复 PR（#3224），说明社区对可靠性问题响应敏锐、行动迅速。Telegram 配对码安全性也出现重复提交（#3225、#3229），属于安全加固热点。整体而言，项目进展健康，但**可靠性治理（静默失败、日志丢失）是当前社区最关切的议题**。

---

## 3. 项目进展

### 今日合并/关闭的 PR 亮点（共 10 条）

**重构与架构治理（@zvi-fried 主导的系列重构）**

- **#3212 refactor(db): add module migration registry** — 为数据库模块引入迁移注册表，统一 schema 演进管理。已合并。
- **#3214 refactor(host): unify module lifecycle hooks** — 统一宿主模块生命周期钩子，简化启动/关闭流程。已合并。
- **#3213 refactor(channels): register question renderers** — 渠道层问答渲染器改为登记制，降低渠道扩展成本。已合并。
- **#3211 docs(skills): define single-responsibility integration rule** — 以文档形式确立 skill 集成的单一职责原则，为后续扩展立规。已合并。
- **#3186 refactor: add host seams for skill-owned capabilities** — 为 skill 自有能力增加宿主接缝，增强沙箱隔离能力。已合并。

这组重构表明项目正处于**系统性结构治理期**，核心团队（@zvi-fried 连续 5 条提交）在持续降低后续功能迭代的耦合成本。

**安全与权限**

- **#3215 fix(permissions): redact DM resolution logs** — 对 DM 解析日志做脱敏处理，移除用户 ID 等敏感信息。已合并。
- **#3216 docs(hardened-image): note that install_packages covers apt and npm only** — 文档澄清 `install_packages` 仅覆盖 apt/npm，防止误用。已关闭。
- **#3222 feat(permissions): add opt-in privacy-safe DM logs** — 新增 `privacySafeLogs` 可选配置，默认保留详细日志，开启后脱敏。已关闭。
- **#3228 fix: deduplicate turn-scoped chat delivery** — 修复回合级聊天投递的重复消息问题。已关闭。
- **#3219 Telegram and container env** — 相关性较低的一次关闭。

> **今日整体进展评估**：核心推进集中在**权限日志隐私保护**（#3215、#3222 双管齐下）与**模块化重构**两个方向。前者对自托管用户有直接价值（避免 DM 日志泄露身份 ID），后者为后续功能扩展铺垫结构基础。

---

## 4. 社区热点

### 热度最高：#3226 — 平台重用消息 ID 导致入站消息静默丢弃

- 链接：[#3226](https://github.com/nanocoai/nanoclaw/issues/3226)
- 作者：@dweekly（今日活跃 contributor）
- 状态：新开，0 评论

**分析与诉求**：该 Issue 描述了一个"用户完全无感知"的数据丢失场景——平台在长会话中重用消息 ID 时，入站消息会在数据库层因主键冲突被静默丢弃。作者措辞犀利地指出*"从用户侧看与'代理忽略我'无异"*，直指消息可靠性的信任根基。此 Issue 作者立刻提交了 **#3224 fix PR**，形成"报告+修复"的闭环。这代表了一类**对"静默失败"零容忍**的开发者诉求——比"出错"更糟的是"出错但没人知道"。

### 高关注：#3075 — 长时运行后日志丢失 + 重复插入错误 + 无 systemd 单元

- 链接：[#3075](https://github.com/nanocoai/nanoclaw/issues/3075)
- 作者：@libellebilai-collab
- 状态：已存活 25 天，1 条评论

**分析与诉求**：这是当前积压最久的未关闭 Issue，报告了实际部署中（WSL2 + Docker、Matrix 渠道）长时间运行后出现**日志静默丢失与入库重复插入冲突并存**的双重故障，同时抱怨项目**未提供 systemd 单元**影响生产部署。该 Issue 与 #3226 同属消息层可靠性问题，值得维护团队一并排查。

### 密集提交热点：Telegram 配对码安全加固（两个 PR 指向同主题）

- **#3225**（@dweekly）：CSPRNG 生成配对码 + 目录/存储文件权限收紧
- **#3229**（@chiptoe-svg）：`Math.random()` → `crypto.randomInt`，码空间从 4 位加宽

两位独立贡献者在同一时间窗口提交了同一问题的修复方案（且都遵循贡献指南），说明**配对码可预测性问题已被社区普遍认知为安全漏洞**。建议维护者尽快协调合并方案，避免重复劳动。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重度 | Issue/PR | 问题描述 | 修复状态 |
|--------|----------|----------|----------|
| **高** | [#3226](https://github.com/nanocoai/nanoclaw/issues/3226) | 平台重用消息 ID 时入站消息**静默丢弃**，用户无感知，等同于"代理忽略用户" | ✅ 已有 [#3224](https://github.com/nanocoai/nanoclaw/pull/3224) 修复 PR（待合并） |
| **中高** | [#3223](https://github.com/nanocoai/nanoclaw/issues/3223) | 定时任务出错时错误消息**无法路由且静默丢弃**，运维方永远不知道任务失败 | ❌ 暂无修复 PR |
| **中** | [#3075](https://github.com/nanocoai/nanoclaw/issues/3075) | 长时运行后日志丢失 + 入站消息重复插入错误；无 systemd 单元 | ❌ 无 PR，已存活 25 天 |
| **低** | [#3222](https://github.com/nanocoai/nanoclaw/pull/3222) | 现有 DM 详细日志可能泄露用户 ID 等隐私（默认开启） | ✅ 已合并（opt-in 脱敏方案） |

> **趋势判断**：今日 Bug 报告高度集中在**消息可靠传递链路**（静默丢弃、重复插入、错误路由），涉及数据库主键策略、错误消息路由机制两个底层模块。这与 Telegram/Chat SDK 等渠道扩展的 PR（#3193）并存，提示在快速扩展渠道能力的同时，**基础消息管道的健壮性需要加固**。

---

## 6. 功能请求与路线图信号

### Agent Plugins 1.0.0（模板功能迁移）

- [#3220 feat!: agent templates become Agent Plugins 1.0.0 directories](https://github.com/nanocoai/nanoclaw/pull/3220)（核心团队，含安全加固：stamp-time symlink/caps/secret hardening）
- 与 [#2909 template setup flow in the wizard and first-agent stamping](https://github.com/nanocoai/nanoclaw/pull/2909) 构成"模板功能 2 部曲"的整体路线图
- 信号：**Agent 模板正在升级为正式插件体系**，可能成为 1.0 版本核心卖点

### 远程 Streamable HTTP MCP 服务器支持

- [#3092 feat: support remote Streamable HTTP MCP servers](https://github.com/nanocoai/nanoclaw/pull/3092)（核心团队，引擎 + Claude provider）
- [#3221 feat(providers): remote Streamable HTTP MCP servers for codex and opencode](https://github.com/nanocoai/nanoclaw/pull/3221)（跟进 #3092 补齐 codex/opencode 支持）
- 信号：**多 provider 统一支持远程 MCP** 是明确的路线图方向，两个 PR 构成完整闭环

### CLI 增强

- [#3218 feat(cli): accept bounded JSON from stdin](https://github.com/nanocoai/nanoclaw/pull/3218)（待合并）— CLI 增加 `--stdin-json` 模式，便于脚本化调用

> **路线图判断**：短期内 Agent Plugins 体系（#3220 + #2909）有较高概率进入下一版本；远程 MCP 支持（#3092 已存活 22 天）也是确定性方向。

---

## 7. 用户反馈摘要

### 真实用户痛点

**"用户从外部看，消息丢了和'代理不理人'完全没有区别。"** — @dweekly（[#3226](https://github.com/nanocoai/nanoclaw/issues/3226)）

> 这是今日最直击要害的用户反馈。它揭示了一个关键体验问题：**技术栈内部的静默丢弃会直接转化为最差的用户体验**——用户无法区分"代理能力不足"和"系统故障"，这对 AI 助手的信任感是致命的。该反馈同时附带了修复 PR，是高质量的贡献。

**"我们跑的是 fork，部署的是 Docker Desktop + WSL2 的实际生产环境。长期运行后会丢日志、入库冲突，而且你们没有 systemd 单元文件，裸跑 Node 进程维护很痛苦。"** — @libellebilai-collab（[#3075](https://github.com/nanocoai/nanoclaw/issues/3075)）

> 25 天未获响应是该项目最大的用户满意度风险。真实生产环境用户报告故障的同时还提出了**部署体验缺失**（无 systemd 单元）的具体需求，值得维护团队优先回应。

### 主动贡献型用户反馈

**"默认保持现有详细日志行为，对需要隐私保护的用户提供 opt-in 脱敏选项。"** — @zvi-fried（[#3222](https://github.com/nanocoai/nanoclaw/pull/3222)）

> 这位 contributor 通过"默认安全 + 可选脱敏"的方式兼顾了**可观测性与隐私保护**，间接反映了用户对 DM 日志中身份信息暴露的担忧。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 存留时间 | 优先级建议 |
|------|------|------|----------|------------|
| Issue | [#3075](https://github.com/nanocoai/nanoclaw/issues/3075) | Silent log loss + duplicate-insert errors + 无 systemd 单元 | **25 天** | 🔴 高 — 真实生产环境故障 + 部署体验需求，长期无回应损害社区信任 |
| PR | [#3092](https://github.com/nanocoai/nanoclaw/pull/3092) | feat: support remote Streamable HTTP MCP servers（核心团队） | 22 天 | 🟠 中高 — 已有配套 #3221 补齐 codex/opencode，双 PR 等待审查 |
| PR | [#2909](https://github.com/nanocoai/nanoclaw/pull/2909) | feat(setup): template setup flow in the wizard（核心团队） | **40 天** | 🟠 中高 — 与 #3220 构成模板功能 2 部曲，阻塞 Agent Plugins 完整落地 |
| Issue | [#3223](https://github.com/nanocoai/nanoclaw/issues/3223) | 定时任务错误消息无法路由且静默丢弃 | 1 天 | 🟡 中 — 与 #3226 同属静默失败家族，建议合并排查 |

**维护者特别关注建议**：

1. **优先响应 #3075**（25 天）——社区对长期无响应的维护者的耐心有限，且该 Issue 集聚了生产故障与部署体验双重诉求。
2. **协调 #3225 与 #3229 的合并**——两个 Telegram 配对码加固 PR 功能重叠，建议尽快合一，避免贡献者重复劳动并确立安全基线。
3. **排查"静默失败"全景**——#3226、#3223、#3075 三案都指向"消息丢失且无感知"，建议仓库维护者进行一次系统性可靠性审计，引入结构化错误上报机制。

---

*报告生成时间：2026-08-11 | 数据来源：[NanoClaw GitHub](https://github.com/nanocoai/nanoclaw)*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-11

---

## 1. 今日速览

过去 24 小时项目活跃度较高：共产生 50 条 Issue 更新和 50 条 PR 更新，其中 Issue 以架构治理类审计问题关闭为主（占比近半），PR 则以功能开发与修复为主线。值得关注的是，**v1.1.1-rc.1 候选补丁版本已于昨日发布**，重点修复 channel 交付、MCP 兼容性、WebUI streaming 稳定性等问题。围绕 #7145、#7147、#7149 等一批"文档—架构真实性审计"系列 issue 的集中关闭，表明项目正在进行系统性的架构约束收口，整体健康状况良好，CI/基础设施效率问题（如 shard artifact 体积过大）成为社区关注焦点。

GitHub 趋势：[Trending](https://github.com/nearai/ironclaw)

---

## 2. 版本发布

**ironclaw-v1.1.1-rc.1**（2026-08-10 发布）

- **定位**：1.1 系列的紧急补丁候选版本（release candidate）
- **核心范围**：channel 交付与 pairing、IronHub/自定义 MCP 兼容性、WebUI streaming 稳定性、持久化检索（durable retrieval）加固、从 1.0/ 1.1 两个受支持的稳定前代版本安全升级
- **⚠️ 注意**：从 1.0.0 升级时需 **先停止所有 writer 进程** 再进行升级操作，属于强制性的升级前置条件

发布链接：[v1.1.1-rc.1](https://github.com/nearai/ironclaw/releases)

---

## 3. 项目进展

今日合并/关闭的 PR 中，以下几个对项目推进意义较大：

- **PR #7336**（已合并，size: L）— `fix(loop-host): dedup consumed steering replays`。为已消费的 steering 消息建立有界持久身份窗口，对延迟的队列消息重放进行去重，防止重复触发模型迭代并产生重复回复。直接提升 agent 循环的正确性和可靠性。 [链接](https://github.com/nearai/ironclaw/pull/7336)
- **PR #7446**（已合并，size: XL）— `feat(channels): rich working indicator`。将 Slack/Telegram 渠道上单一的"Ironclaw is thinking..."替换为多样化的状态提示（反应、失败状态、进度提醒），显著改善渠道端用户体验。 [链接](https://github.com/nearai/ironclaw/pull/7446)
- **#7145、#7147、#7149、#7150、#7151 等一批架构审计 Issue** 集中关闭，配合 #7036、#7067 等治理类 issue 的关闭，表明项目在"Reborn 架构重构"的约束落地环节正快速推进，多个架构约束缺口已进入修复管线。

此外，多条与 Reborn 重构相关的 Epic（#6926、#6941、#6483、#6484、#6485、#6727 等）陆续关闭，标志着 v1.1.0 线的多个目标已按计划交付。

---

## 4. 社区热点

以下 Issue/PR 获得较多讨论或反映了社区诉求：

| 项目 | 评论数 | 波动 | 诉求分析 |
|---|---|---|---|
| [Issue #7137](https://github.com/nearai/ironclaw/issues/7137) — live-canary shard artifacts 体积过大（700MB–1.5GB / shard，单次运行总计超 5GB） | 12 | 新开 | 暴露 CI 存储配额压力与排查效率问题；已有 PR #7466 提出裁剪方案，社区认可度高 |
| [Issue #7145](https://github.com/nearai/ironclaw/issues/7145) — extension_host → loops 重分层（按四端口残差而非文件数缩放） | 4 | 已关闭 | 架构治理方向的技术讨论，涉及对上一轮估算方式错误的纠正 |
| [Issue #7147](https://github.com/nearai/ironclaw/issues/7147) — 两个 shrink-only 架构棘轮存在无追踪 slack | 3 | 已关闭 | 架构审计，确保约束持续有效 |
| [Issue #6257](https://github.com/nearai/ironclaw/issues/6257) — PDF 发送/生成报 `Invalid value (attachments.mime_type)` | 3 | 持续开放（7 月 19 日创建） | 用户功能阻断性 bug，长期未闭环，建议优先处理 |
| [Issue #5882](https://github.com/nearai/ironclaw/issues/5882) — Slack 反复重连导致认证流程损坏 | 3 | 已关闭 | 用户侧集成稳定性问题，影响具体使用场景 |
| [Issue #7473](https://github.com/nearai/ironclaw/issues/7473) — connect-nudge 去重节流被错误释放 | 0 | 新开 | 潜在重复打扰用户的问题；已有配套修复 PR #7475 |

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高：影响用户核心体验

- **connect-nudge 重复通知**（[Issue #7473](https://github.com/nearai/ironclaw/issues/7473)）：`post_notice → release_connect_nudge` 将"无 vendor ref 的已投递"误判为"未投递"，导致用户收到重复"请连接"提醒。已有修复 PR [#7475](https://github.com/nearai/ironclaw/pull/7475)（L 级，含 Slack/web push 场景处理）。
- **Agent 断言未验证状态**（[PR #7474](https://github.com/nearai/ironclaw/pull/7474)，对应 #7246、#7247、#7294）：agent 在自动化状态、扩展授权、记忆召回等场景中"断言了从未验证的状态"，已通过三合一补丁批量修复，每个 issue 对应一个 commit。

### 🟡 中：影响稳定性或特定功能

- **thread_index 行缺少有序投影元数据导致线程不可见**（[PR #7470](https://github.com/nearai/ironclaw/pull/7470)）：sidebar 的 `list_threads` 无法读取此类线程，正在修复。
- **Hosted run 因 `lease_expired` 崩溃**（[PR #7471](https://github.com/nearai/ironclaw/pull/7471)）：进程日志心跳与数据平面共享 max-size-2 的连接池，突发读流量挤压心跳执行；修复方案为租约过期恢复安全运行 + 心跳独立连接池。

### 🟢 低：功能性缺陷

- **PDF 附件 `Invalid value (attachments.mime_type)` 报错**（[Issue #6257](https://github.com/nearai/ironclaw/issues/6257)）：用户无法发送/生成 PDF，创建至今超 3 周，未见修复 PR，期待维护者关注。
- **_CLI 工作目录与技能根目录重叠时默认工作区异常_**（[PR #7455](https://github.com/nearai/ironclaw/pull/7455)，对应 [#7431](https://github.com/nearai/ironclaw/issues/7431)）：`repl/run/serve` 会将 cwd 挂载为本地运行时工作区，而 `$HOME` 与存储根目录重叠导致异常，修复方案为回退默认工作区。

---

## 6. 功能请求与路线图信号

- **Company Brain FDE**（[Issue #7465](https://github.com/nearai/ironclaw/issues/7465)，新开）：企业知识库功能定义与探索，属于新方向的开辟。
- **Durable state profile-agnostic**（[Issue #7467](https://github.com/nearai/ironclaw/issues/7467)，新开）+ 对应 PR [#7456](https://github.com/nearai/ironclaw/pull/7456)：消除 Reborn 存储对部署 profile 的耦合，支持 profile 切换时数据不丢失。这是 v1.1 之后的架构健壮性重要更新。
- **Extensions vNext（Web Push、富消息、Telegram 用户会话、Signal）**（[Issue #7354](https://github.com/nearai/ironclaw/issues/7354)，已开）：目标 8 月 14 日前交付，PR #7446 已提供部分能力基础。
- **Telegram linked-device**（[PR #7464](https://github.com/nearai/ironclaw/pull/7464)，XL 级）：将个人 Telegram 账号作为真正的 MTProto linked-device 接入，用户可在 Telegram 设置中查看和撤销，配套标准操作工具集。
- **per-token logprobs 采集与回落**（[PR #7468](https://github.com/nearai/ironclaw/pull/7468) + [#7469](https://github.com/nearai/ironclaw/pull/7469)）：可选开关，将 logprobs 写入本地 sidecar 并聚合为置信度汇总，为未来可观测性铺路（默认关闭，对现有用户零影响）。
- 更长远地，[Issue #7046](https://github.com/nearai/ironclaw/issues/7046)（管理员从 AI 对话配置所有工具/渠道/扩展）与 #7044（channel-first 引导）均表明项目正在强化"对话即界面"的核心理念。

---

## 7. 用户反馈摘要

从今日 Issue 评论中可提炼以下用户声音：

- **Slack 集成的认证体验是当前主要吐槽点**。多次重连后认证流程进入不可恢复的损坏状态，用户只能重装扩展（[#5882](https://github.com/nearai/ironclaw/issues/5882)）；另有 near.foundation 账户的 Slack 安装直接失败（[#6834](https://github.com/nearai/ironclaw/issues/6834)）。两者均已关闭，但社区对此类问题的敏感度较高。
- **PDF 处理是实际业务场景中的硬需求**，`attachments.mime_type` 校验报错直接阻断用户工作流（[#6257](https://github.com/nearai/ironclaw/issues/6257)），且已持续 3 周无修复动作，用户忍耐度在下降。
- **web UI 中编辑 `AGENTS.md` 不会更新系统提示词**（[#3762](https://github.com/nearai/ironclaw/issues/3762)）自 5 月 18 日报告以来仍开放，属于"改动了但感觉没生效"的困惑型体验问题，对信任度有隐性伤害。
- **任务因工具调用过多而失败**（[#7447](https://github.com/nearai/ironclaw/issues/7447)）——agent 陷入冗余 fetch-retry 循环（4 次近重复 GitHub 查询）并耗尽 tool-call 预算，用户希望 agent 具备更智能的分页/结果读取策略。

---

## 8. 待处理积压

以下长期未响应或未闭环的事项，建议维护团队关注：

| 项目 | 创建时间 | 状态 | 说明 |
|---|---|---|---|
| [Issue #3762](https://github.com/nearai/ironclaw/issues/3762) — AGENTS.md 编辑不同步系统提示词 | 2026-05-18 | Open | 近 3 个月未解决，影响用户对 web UI 编辑能力的信任 |
| [Issue #6257](https://github.com/nearai/ironclaw/issues/6257) — PDF 附件 MIME 类型报错 | 2026-07-19 | Open | 用户功能阻断，无 fix PR |
| [PR #5101](https://github.com/nearai/ironclaw/pull/5101) — live-canary 复用 cargo-component 安装器 | 2026-06-20 | Open | 搁置近 2 个月，CI 基础设施改进；结合 #7137 和 #7466 可联动处理 |
| [Issue #7046](https://github.com/nearai/ironclaw/issues/7046) — 从 AI 对话配置所有工具/渠道 | 2026-08-03 | Open | 大型 Epic，无 commit 关联 |
| [Issue #7038](https://github.com/nearai/ironclaw/issues/7038) — Storybook + AI-first 设计系统 | 2026-08-03 | Open | 有完整提案（PR #7257），但无进度更新 |

---

*本日报由 AI 开源项目分析师自动生成。数据源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-11


## 今日速览

过去24小时 LobsterAI 项目开发活跃度极高，共产生 34 条 PR 活动（20 条合并/关闭，14 条待处理）以及 1 条 Issue 关闭。核心贡献者 @fisherdaddy 主导了当日绝大多数代码合并，集中在 **cowork 功能增强** 与 **openclaw 稳定性修复** 两大方向。值得关注的是，一个长期困扰用户的 `qwen-portal-auth` 配置循环写入问题（#1243）已在今日关闭，但该 Issue 状态为 stale 关闭，是否真正修复需进一步确认。此外，dependabot 批量提交了多条前端依赖（vite、react-dom 等）升级 PR，说明项目正在推进依赖现代化。整体来看，项目正处于高频迭代期，工程节奏良好，社区反馈渠道通畅。


## 版本发布

今日无新版本发布。


## 项目进展

今日合并/关闭了 20 条 PR，主要集中在以下几个方面：

**1. cowork 功能体验优化（核心亮点）**

- **#2471** [已合并] `feat(cowork): render submitted file attachments as clickable cards` — 此前非图片附件提交后会被压缩成原始 "输入文件: /path" 文本行，现改为渲染为文件类型卡片（图标 + 文件名 + 类型），与提交前预览保持一致。这是对多模态交互体验的重要补齐。
- **#2472** [已合并] `feat: cowork activity group collapse` — 支持活动分组折叠，减轻长会话的视觉负担。
- **#2469** [已合并] `feat(cowork): add collapse-agent-tasks shortcut and allow modifier shortcuts while typing` — 新增折叠 agent 任务快捷键，且允许在输入状态下使用修饰键快捷键。
- **#2468** [已合并] `refactor(cowork): unify streaming loading indicators into single` — 统一流式加载指示器，消除多组件间不一致的加载反馈。

**2. openclaw 稳定性修复**

- **#2454** [已合并] `fix(openclaw): stop tool-loop guard from killing legitimate polling` — 修复工具循环保护误杀合法轮询的问题，避免正常请求被误判为死循环。
- **#2470** [已合并] `fix(openclaw): surface provider runtime failures on late chat error` — 此前延迟最终响应挂起时，真实的 provider/LLM 运行时故障（如空闲超时故障转移）被误当作陈旧工具失败而吞掉，本次修复让真实错误得以暴露。

**3. 平台兼容修复**

- **#2467** [已合并] `fix(python-runtime): repair stale pip shims on Windows runtime upgrade` — 修复 Windows 上运行时升级后 pip shim 残留导致健康检查误判的深层问题。
- **#2466** [已合并] `Fix/renderer init ipc stall retry` — 修复渲染进程初始化 IPC 卡死后的重试逻辑。

**4. 依赖升级（dependabot）**

- **#1766** / **#1764** / **#1763** 等三个 4 月 20 日创建的 PR 于今日关闭：vite 5.4.21→8.0.13（#1766）、react-dom 18.3.1→19.2.6（#1764）、@vitejs/plugin-react 4.7.0→6.0.1（#1763）。这三个旧 PR 被关闭的同时，对应的新版本升级 PR（#2465/#2464/#2463）已在同日新开，说明依赖升级链路保持了自动续接。值得注意的是，vite 从 5.x 直接跨到 8.x，react-dom 从 18.x 跨到 19.2.x，中间可能存在 breaking changes，需关注合并后功能回归。


## 社区热点

今日 PR 层面讨论热度最高的当属 **#2473**（`feat(cowork): add right-click context menu for local file links`），这是目前唯一一条仍处于 OPEN 状态的 feature PR，且涉及面广（renderer/main/cowork/artifacts 四个模块），新增了本地文件右键菜单（打开方式/另存为/复制路径/复制内容/复制图片/在文件夹中显示），并新增 `dialog:saveFileCopy` IPC 处理器。该 PR 今日刚创建，预计后续会有较多 review 讨论。

Issue 层面仅有一条活动记录 **#1243**（qwen-portal-auth 配置循环写入导致网关频繁重启），今日以 stale 状态关闭。该 Issue 自 4 月创建以来历经约 4 个月，期间累计 2 条评论，说明此问题存在但社区关注度一般。关闭原因更可能是长期未活跃后的自动 stale 处理，而非已修复——这一点值得警惕。

此外，**#2452**（`fix(openclaw): preserve provider for slashed model ids`，作者 @ump45nose）已挂起 4 天未合并，涉及含 `/` 的模型 ID（如 `deepseek-ai/DeepSeek-V4-Flash`）的 provider 前缀丢失问题，是社区贡献者提交的非维护者 PR，建议维护者关注。


## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---------|----------|------|------|
| 🟠 高 | #1243 | `qwen-portal-auth` 插件配置循环写入导致网关每 5-20 分钟自动重启一次 | 今日以 stale 关闭，需确认是否已真正修复 |
| 🟡 中 | #2454（PR） | 工具循环保护误杀合法轮询请求 | 已合并修复 ✅ |
| 🟡 中 | #2470（PR） | provider 运行时错误被延迟响应机制吞掉 | 已合并修复 ✅ |
| 🟢 低 | #2467（PR） | Windows 运行时升级后 pip shim 残留 | 已合并修复 ✅ |
| 🟢 低 | #2466（PR） | 渲染进程初始化 IPC 卡死无重试 | 已合并修复 ✅ |

**#1243 需要特别关注**：该 Issue 描述了网关每 5-20 分钟自动重启并伴随 "AI 引擎正在启动网关..." 弹窗的严重用户体验问题。虽然今日已关闭，但关闭标记为 `[stale]`，极可能是超时自动关闭而非修复后关闭。建议维护者确认该问题的实际修复状态，如未修复应重新激活跟踪。


## 功能请求与路线图信号

结合今日 PR 与 Issue 数据，可以识别出以下路线图信号：

1. **本地文件交互深度增强** — #2473 的右键上下文菜单（打开方式、另存为、复制路径/内容/图片、在文件夹中显示）显示项目正朝着更完善的本地文件协作方向演进。该能力对 AI 编程助手和文档协作场景至关重要，预计在后续版本中会继续强化。

2. **cowork 界面信息密度优化** — #2472（活动分组折叠）+ #2469（折叠快捷键）+ #2468（加载指示器统一）三连击说明项目正在系统性地优化 cowork 长会话的视觉秩序和信息架构，下一版本中 cowork 体验会有显著提升。

3. **依赖栈现代化** — vite 5→8、react-dom 18→19 的批量升级表明项目计划在下个版本中完成前端核心依赖的更新换代，这可能伴随 Electron 或 Node 版本要求的提升。依赖升级 PR（#2465/#2464/#2463 等）目前均处于 OPEN 状态，还未合并。

4. **Windows 平台稳定性加固** — #2467 对 Windows pip shim 的修复，结合此前发布的 Windows 系统要求（Win10 64位 1909+），说明项目对 Windows 用户群体（可能占比较大）的体验稳定性持续投入。


## 用户反馈摘要

由于今日活跃 Issue 较少，从已关闭的 #1243 中可提取的关键用户声音：

- **痛点**：`qwen-portal-auth` 插件导致网关高频重启（每 5-20 分钟一次），伴随强制弹窗提示，属于破坏性体验问题。
- **使用场景**：用户配置了包括非 Qwen 模型在内的多种模型，问题同样触发，说明该 Bug 影响面不止 Qwen 用户，涉及所有使用该插件配置的模型。
- **时间跨度**：该问题自 2026-04-01 报告至 2026-08-10 关闭，历时 4 个多月，期间仅 2 条评论。如此核心的稳定性问题长期未达社区热度的确反映出一个隐忧——可能大量用户遇到问题后直接更换工具而非提交反馈，项目方需要警惕用户流失风险。

整体而言，项目功能开发速度快（单日 20 条合并），但**长期悬而未决的高影响 Bug** 处理节奏偏慢，建议维护团队在高速迭代功能的同时，建立关键稳定性问题的快速响应机制。


## 待处理积压

**需维护者重点关注：**

1. **#1243**（Issue，已 stale 关闭）— `qwen-portal-auth` 配置循环写入导致网关频繁重启。虽然已关闭，但极可能未修复。若确认未修复，建议重新打开并安排优先处理，或至少在下次 release 中明确说明修复状态。

2. **#2452**（PR，OPEN 已 4 天）— 社区贡献者 @ump45nose 提交的 `fix(openclaw): preserve provider for slashed model ids`。含 `/` 的模型 ID（如 DeepSeek-V4-Flash）存在 provider 前缀丢失问题，影响实际使用。社区贡献的 PR 长时间未获 review 会挫伤贡献者积极性，建议尽快处理。

3. **14 条待合并 PR** — 其中包括 10+ 条 dependabot 依赖升级 PR（#2459-#2465），以及 #2473（右键菜单功能 PR）。依赖升级 PR 从 4 月 20 日创建至今已近 4 个月，虽然旧版 PR 今日已关闭并替换为新版本，但建议考虑批量合并策略，避免依赖长期滞后导致安全风险累积。

---

*本日报由 AI 生成，数据来源：[github.com/netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 (2026-08-11)

## 今日速览

过去24小时内 Moltis 项目保持中等活跃度，共新增 3 条 Issues（全部为 Bug 报告）和 1 条待合并 PR。值得关注的是，3 个 Bug 全部集中在 Apple Container 1.x 后端（沙盒生命周期检测误判、资源限制未生效、构建依赖 URL 错误），显示出该后端在当前版本中仍是稳定性短板。同日，大型功能 PR `#531`（浏览器交互式 UI）出现最新动态更新，暗示维护者正在推进该功能。从数据看，社区反馈及时、Issue 维护活跃，但合并节奏放缓，项目处于"问题高发 — 集中修复"的过渡阶段。

---

## 版本发布

今日无新版本发布（最新 Release 暂无更新）。

---

## 项目进展

今日无 PR 合并/关闭事件，但存在 1 条值得关注的**待合并 PR**：

- **PR #531 — `feat(browser): interactive browser viewing UI with CDP screencast`**（[@penso](https://github.com/penso)，创建于 2026-03-31，更新于 2026-08-10）
  - 链接：https://github.com/moltis-org/moltis/pull/531
  - **分析**：该 PR 从 3 月 31 日持续活跃至今，8 月 10 日仍被更新，说明这是一项长期打磨的核心体验升级。功能涵盖：创建浏览器会话、通过 CDP screencast 实时画面观看、鼠标/键盘/滚动交互、会话历史与操作日志回放，以及 per-agent 浏览器配置文件的 cookie 隔离。若合并，这将使 Moltis 从"命令驱动"的 Agent 工具进一步迈向"可视化交互"阶段，对调试和安全审计（cookie 隔离）有直接价值。

整体而言，项目今日没有合并事件，但 PR #531 的长线活跃表明功能开发仍在进行中，方向聚焦于"可视化 Agent 交互"。

---

## 社区热点

今日最活跃的讨论集中在 Issue **#1185**（Apple Container 1.x 沙盒运行状态误判）：

- **Issue #1185 — `[Bug]: Apple Container 1.x sandbox starts but Moltis treats it as not running`**（[@mikz](https://github.com/mikz)，创建于 2026-08-08，更新于 2026-08-10）
  - 链接：https://github.com/moltis-org/moltis/issues/1185
  - **热度**：3 条评论（今日唯一有评论的 Issue）
  - **背景**：用户反馈 Mac 沙盒容器已成功启动，但 Moltis 的状态检测误判为"未运行"，导致后续操作（如执行命令、读取日志）被阻断。评论区的讨论核心指向容器存活性探针（liveness probe）的实现细节——当前可能是通过进程 PID 探测，而非 Apple Container 框架的状态 API。
  - **分析**：这反映了用户在真实自动化场景中对"状态同步准确性"的高度依赖。若状态误判，整个 Agent 流程将卡死，直接影响 working session 体验。

---

## Bug 与稳定性

今日共报告 3 个 Bug，全部为 Level 2（功能性缺陷）级别，无崩溃或数据丢失类严重问题。按严重程度排序如下：

| 严重度 | Issue | 标题 | 影响 | FIX PR |
|--------|-------|------|------|--------|
| 高 | [#1185](https://github.com/moltis-org/moltis/issues/1185) | Apple Container 1.x sandbox starts but Moltis treats it as not running | 阻断沙盒内正常操作，状态误判 | 暂无 |
| 高 | [#1188](https://github.com/moltis-org/moltis/issues/1188) | resource limits not applied for apple-container backend | 用户设置的内存/CPU限制未生效，可能导致资源超配 | 暂无 |
| 中 | [#1189](https://github.com/moltis-org/moltis/issues/1189) | Sandbox build failing due to wrong gogcli github URL | 构建依赖拉取失败，阻断沙盒创建 | 暂无 |

> 三个 Bug 均由不同用户（@mikz、@holgzn）报告，集中在 apple-container 后端。**信号**：该后端近期改动可能存在回归或测试覆盖不足，维护者可优先安排回归测试用例（涉及沙盒生命周期和资源配额）。

---

## 功能请求与路线图信号

今日无新增功能请求 Issue，但可在 PR #531 中看到明确的路线图信号：

- **浏览器可视交互 UI 即将落地**（PR #531）：支持实时画面（CDP screencast）、鼠标/键盘/滚动交互、会话历史回放、per-agent 浏览器配置文件的 cookie 隔离。这是 Moltis 向"可观察、可交互、可审计" Agent 工具演进的关键一步，极可能被纳入下一版本（如 v1.5+）。该功能对开发者调试 Agent 行为、以及需要多账号隔离的爬虫/自动化任务场景有明显价值。

---

## 用户反馈摘要

从今日 Issue 的讨论中可提炼出以下真实用户痛点：

1. **状态检测准确性的信任依赖**（来自 #1185）：用户 @mikz 明确指出容器实际已运行，但 Moltis 误判为未运行，导致流程中断。该类问题会破坏用户对自动化流程可靠性的信心，尤其是批量脚本执行场景。
2. **资源限制的透明执行**（来自 #1188）：用户 @holgzn 报告设置在 Mac 沙盒后端上的内存/CPU 限制未生效，说明用户对资源隔离有明确的预期管理，且倾向于为不同任务设置不同配额。
3. **环境依赖的脆弱性**（来自 #1189）：gogcli 的 URL 写死错误导致构建失败，这类"配置级"问题虽然修复成本低，但会让新用户在第一印象上产生挫败感——尤其在沙盒构建入口被阻断时。

---

## 待处理积压

1. **PR #531 — 浏览器交互 UI 功能**（已存在 4 个月+，仍在等待合并）
   - 链接：https://github.com/moltis-org/moltis/pull/531
   - 建议：维护者尽快给予明确信号（进入 review 流程或标记下一版本里程碑），避免长分支带来的冲突成本。目前该 PR 仍保持活跃更新，建议优先安排 code review。

2. **Issue #1185 — Apple Container 状态误判**（存在 3 天，评论讨论中，尚无 FIX PR 关联）
   - 链接：https://github.com/moltis-org/moltis/issues/1185
   - 建议：需要维护者确认 liveness 检测逻辑并指派负责人，这是当前影响 sandbox 主流程最直接的 Bug。

3. **Issue #1188 / #1189 — 均为今日新开**（等待首响）
   - 链接：https://github.com/moltis-org/moltis/issues/1188  /  https://github.com/moltis-org/moltis/issues/1189
   - 建议：两个均为 apple-container 相关，可合并为一轮修复任务，避免 backlog 碎片化。

---

**健康度总评**：❌ 开源社区活跃度中上，但 apple-container 后端稳定性存在明显短板。三个 Bug 集中在同一后端，建议维护者将其列为本周优先级，并补充相应的回归测试。功能侧 PR #531 是当前最值得投入的里程碑级能力，建议加速推进以避免陈旧化。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-11

## 1. 今日速览

项目整体活跃度高，24小时内产生40条Issue更新与50条PR更新，显示出社区参与度和维护响应均处于良好状态。值得关注的变化是——项目内部已将核心仓库**从 agentscope-ai/QwenPaw 转向 agentscope-ai/CoPaw**（部分Issue标题和PR描述仍使用旧名），且接近v2.1.0正式发布节点，本次发布周期以稳定性修复和Creator插件整合为重心。热点讨论集中在MCP工具链的兼容性与背压问题、前端UI在特定场景下的可用性缺陷（IME崩溃、CPU空转、任务面板遮挡）以及2.0版本多处回归问题。值得肯定的是，多数新提交的PR已准确对应到Issue并进入修复流程，说明维护者对社区反馈的响应较为及时。

- 活跃度评价：**高**（Issue新开/活跃34条，PR新增/待合并31条）
- 项目阶段判断：处于 **v2.1.0 发布候选期**，以Bug修复与稳定性收敛为主要特征


## 2. 版本发布

24小时内无新版本发布。


## 3. 项目进展

本轮合并的1个PR带来实质改进，另有多个接近合并状态：

| PR | 状态 | 贡献 |
|---|---|---|
| [#6809 fix(providers): sanitize Chat Completions content for strict providers](https://github.com/agentscope-ai/CoPaw/pull/6809) | 已关闭（合并） | 修复严格校验的OpenAI兼容提供方（如StepFun）拒收请求的问题。请求中不再携带内部运行时字段及Responses API文本类型，消除了400障碍。直接解决了Issue #6803 |
| [#6398 feat: add reranker support for ReMe memory search](https://github.com/agentscope-ai/CoPaw/pull/6398) | 已关闭（合并） | 为ReMe记忆检索增加重排序支持：通过 `RerankerConfig` 配置，候选集可进行过采样（N x candidate_multiplier）后经外部reranker API精排，截断至 max_results，并重建检索答案文本 |
| [#6615 fix(config): handle corrupted agent config](https://github.com/agentscope-ai/CoPaw/pull/6615) | 已关闭 | 修复 agent.json 损坏（截断写入/无效UTF-8）时 `load_agent_config()` 直接抛原始异常的问题 |
| [#6878 feat(console): add hidden-folders toggle to project directory picker](https://github.com/agentscope-ai/CoPaw/pull/6878) | 已关闭 | 为项目目录选择器增加显示隐藏文件夹开关 |

**当前重点推进中的主要合并区块：**

- **#6870** [feat(creator): settings center, agent skills, mm-plugins compose orchestration, async media generation, and cross-platform hardening](https://github.com/agentscope-ai/CoPaw/pull/6870) — Creator插件的大型集成PR，包含设置中心、Agent技能、多模态插件编排、异步媒体生成和跨平台加固，插件版本提升至 **1.3.0**。虽未合并但体量较大，预计需要额外review时间
- **#6880** [feat(console): unify apps, plugins, and skills in the marketplace](https://github.com/agentscope-ai/CoPaw/pull/6880) — 将应用、插件、技能三类市场统一到 `/market` 路由下，保留各业务逻辑
- **#6875** [chore: update release notes for v2.1.0](https://github.com/agentscope-ai/CoPaw/pull/6875) — 准备v2.1.0发布文档，含中英文双语说明及全语言README同步

综合来看，项目当前同时在推进三种类型的工作：**稳定性修复**（如上PR）、**v2.1.0发布文档就绪**、以及**Creator插件功能扩展**。


## 4. 社区热点

本期讨论焦点高度集中在国产模型/工具链与桌面端体验上：

**总结：** 本期热点是围绕 `MCP协议` 工具链的具体兼容性故障以及 `Desktop UI` 在复杂交互场景下的体验问题。两者均非潜在需求，而是社区在实际日常使用中直接遇到的硬阻塞，反馈密度高且复现步骤详实，对用户的日常使用影响大。

**热点一：MCP 工具链兼容性问题（多条Issue前后呼应）**

- [#6405 [Question] 升级2.0以后，MCP工具总是提示Tool notfound](https://github.com/agentscope-ai/CoPaw/issues/6405) — 用户升级后发现工具总是提示未找到
- [#6839 [Bug] MCP工具调用时，总是将像数字的字符串以数字格式传参](https://github.com/agentscope-ai/CoPaw/issues/6839) — 工具参数中纯数字字符串被类型推断为数字，导致类型校验失败
- [#6724 [Feature] Configurable MCP tool-call timeout](https://github.com/agentscope-ai/CoPaw/issues/6724) — MCP调用无超时上限，慢服务会无限期阻塞
- [#6803（详见Bug板块）](https://github.com/agentscope-ai/CoPaw/issues/6803) — OpenAI兼容端点被严格校验提供方拒收
- [#6812（详见Bug板块）](https://github.com/agentscope-ai/CoPaw/issues/6812) — Gemini 400错误

**热点二：聊天界面可用性问题（回归风险）**

- [#6826 对话中助手消息结束时间显示异常](https://github.com/agentscope-ai/CoPaw/issues/6826) — 助手实际思考2分钟，页面显示仅数秒
- [#6876 后台任务面板占满聊天窗口](https://github.com/agentscope-ai/CoPaw/issues/6876) — 长任务卡片常驻且无法折叠，把对话流挤到不可见
- [#6885 中文输入法 compositionEnd 导致 UI 崩溃](https://github.com/agentscope-ai/CoPaw/issues/6885) — 消息队列无法使用（v2.1.0b2新增回归）
- [#6828 空闲时前端持续重绘 ~20% CPU](https://github.com/agentscope-ai/CoPaw/issues/6828) — CSS动画导致渲染线程空转

**热点三：安装部署问题（Windows平台）**

- [#6810 Windows 安装/更新被 NM host 锁文件阻塞](https://github.com/agentscope-ai/CoPaw/issues/6810) — 浏览器扩展进程锁文件导致安装中断，弹出不止4个「无法打开要写入的文件」


## 5. Bug 与稳定性

按严重程度排列：

### 严重级（崩溃/数据问题）

| Issue | 描述 | 是否有Fix PR |
|---|---|---|
| [#6885 Console UI crashes on Chinese IME compositionEnd](https://github.com/agentscope-ai/CoPaw/issues/6885) | v2.1.0b2回归，中文输入法组合输入期间UI崩溃，消息队列不可用 | **已有** [#6889 PR（fix(console): preserve textarea target for IME events）](https://github.com/agentscope-ai/CoPaw/pull/6889) |
| [#6814 SIGBUS in sqlite3WalFindFrame while opening Scroll history.db on macOS](https://github.com/agentscope-ai/CoPaw/issues/6814) | macOS上打开WAL模式SQLite数据库直接崩溃（SIGBUS），与模型推理无关 | 无 |
| [#6847 Qwenpaw被杀软打死，WorkBuddy不会](https://github.com/agentscope-ai/CoPaw/issues/6847) | 执行任务时被杀毒软件拦截甚至强制终止进程，影响Windows生产可用性 | 无（讨论方向指向需排查行为特征） |

### 中级（功能异常/兼容性）

| Issue | 描述 | 是否有Fix PR |
|---|---|---|
| [#6813 consume_model_response raises KeyError: '__aiter__'](https://github.com/agentscope-ai/CoPaw/issues/6813) | 自动标题生成持续失败，受 agentscope 2.x ChatResponse (dict子类) 影响 | 无 |
| [#6803 OpenAI-compatible requests rejected by strict providers (StepFun 400)](https://github.com/agentscope-ai/CoPaw/issues/6803) | 请求携带内部字段遭严格校验方拒收 | **已有** [#6809 已合并](https://github.com/agentscope-ai/CoPaw/pull/6809) |
| [#6812 Model 'unknown' execution failed in Google API](https://github.com/agentscope-ai/CoPaw/issues/6812) | Gemini provider发送的tool schema包含 `$schema` 字段，Google API不允许额外字段 | 无 |
| [#6821 reasoning_content relay fails for thinking-mode models → 400](https://github.com/agentscope-ai/CoPaw/issues/6821) | 多轮对话中thinking-mode模型（DeepSeek V4等）因 `reasoning_content` 未回传而报400错误 | 无 |
| [#6867 Gemini compaction error - missing thought_signature](https://github.com/agentscope-ai/CoPaw/issues/6867) | Gemini压缩时函数调用缺少 `thought_signature` 字段 | 无（与#6812同根因） |
| [#6782 2.0.1 docker版插件市场应用市场维护中](https://github.com/agentscope-ai/CoPaw/issues/6782) | Docker版本市场始终提示维护中 | 无 |
| [#6683 App Center安装qwenpaw-creator失败：No module named 'utils.env'](https://github.com/agentscope-ai/CoPaw/issues/6683) | 插件顶层模块与依赖 `utils` 包命名冲突导致加载即失败 | 无（但#6870大型PR可能有间接修复） |

### 轻微级（UI/体验缺陷）

- [#6826 助手消息结束时间显示异常（实际耗时2分钟显示几秒）](https://github.com/agentscope-ai/CoPaw/issues/6826) — **已有** [#6845 PR（fix(chats): preserve assistant completion time）](https://github.com/agentscope-ai/CoPaw/pull/6845)
- [#6820 前端UI界面未实时显示模型输出/工具调用/思考过程](https://github.com/agentscope-ai/CoPaw/issues/6820)
- [#6828 空闲时前端持续重绘约20% CPU（CSS动画导致）](https://github.com/agentscope-ai/CoPaw/issues/6828)
- [#6780 2.0.1版空闲几十分钟后卡死，只能重启进程](https://github.com/agentscope-ai/CoPaw/issues/6780)


## 6. 功能请求与路线图信号

### 已有合并/进行中PR支撑的功能（高概率进入v2.1.0）：

| 请求 | 对应PR | 说明 |
|---|---|---|
| [#4634 窗口大小和位置记忆](https://github.com/agentscope-ai/CoPaw/issues/4634) | [#6877 feat(desktop): remember window geometry](https://github.com/agentscope-ai/CoPaw/pull/6877) | 使用Tauri官方 window-state 插件持久化窗口位置和大小 |
| [#4237 In-chat observability for running shell commands](https://github.com/agentscope-ai/CoPaw/issues/4237) | （后台任务面板功能对比重叠加推进） | 已有“后台任务面板”，但#6876指出UX有改进空间 |
| [#6585 聊天框下方“已接收字符数”需要关闭入口](https://github.com/agentscope-ai/CoPaw/issues/6585) | 无直接对应PR，但在2.0.1+用户群体中呼声较高 | 动态数字闪烁导致用户注意力分散 |
| [#6810 Windows 安装前终止进程占用](https://github.com/agentscope-ai/CoPaw/issues/6810) | 无 | 安装器需增加前置检查，否则持续影响Windows用户 |

### 长期路线图信号：

- **ReMe4 路线图**（#6840）：ReMe Light (0.4.1.4) 已随 v2.1.0b2 落地，用户询问 Auto-Link、三模态搜索、4类摘要权重的实现时间表。当前[#6772 PR（feat(memory): add embedding hot updates and Daily Paper to ReMe Light）](https://github.com/agentscope-ai/CoPaw/pull/6772) 正在扩展 ReMe Light 能力
- **Auto-Dream 容错**（#6841）：单个集成单元失败即将整个任务标记为 error，用户建议失败容忍与重试。**已有** [#6884 PR（fix: make Auto-Dream integration resilient）](https://github.com/agentscope-ai/CoPaw/pull/6884)
- **MCP 超时可配置化**（#6724）：`MCPClientConfig` 目前无 timeout 字段（被 Pydantic 静默丢弃），`call_tool` 无上限阻塞 —— 需在短期修复
- **会话标题自动刷新**（#6881）：自动记忆更新后会话标题应随之刷新
- **统一市场页面**（#6880，进行中）：应用/插件/技能三类市场的统一入口，已在PR中


## 7. 用户反馈摘要

**满意度较高方面：**
- 用户对项目的功能愿景和执行速度表示认可（如#6585的“非常不错的项目”）
- ReMe Light 的落地获得了关注度的正向反馈（#6840用户明确提到匹配了公告的ReMe4架构）

**主要痛点（真实用户原声）：**
- **MCP 工具链**：升级2.0后MCP工具持续不可用，用户反复排查但“总提示找不到”；参数以字符串还是数字传递的类型推断问题，直接导致工具调用失败
- **前端流式体验**：需要等“全部完成了才显示出”输出，用户等不到任何中间过程；动画闪烁被形容为“眼睛疼”
- **后台任务面板遮挡**：连续多个任务卡片把聊天窗口占满，“用户看不到自己与Agent的实际对话内容”；且每个卡片信息密度低、无法折叠
- **长时间空闲后死锁**：“不使用时几十分钟后自己卡死，只能关闭进程重新启动”，影响无人值守场景
- **杀毒误报**：“Qwenpaw执行任务时经常被杀软拦截，甚至强制关停进程”
- **安装器问题**：“NSIS 连续弹出不止4个「无法打开要写入的文件」错误”


## 8. 待处理积压

| 类型 | Issue/PR | 创建时间 | 状态 | 建议 |
|---|---|---|---|---|
| Issue | [#4237 [Feature] In-chat observability for running shell commands](https://github.com/agentscope-ai/CoPaw/issues/4237) | 2026-05-12 | 讨论中，已搁置近3个月 | 后台任务面板虽已存在但缺少 kill/extend 交互，建议结合#6876的反馈进行迭代 |
| Issue | [#4634 [Feature] 窗口大小和位置记忆](https://github.com/agentscope-ai/CoPaw/issues/4634) | 2026-05-22 | 本月已有相关PR [#6877](https://github.com/agentscope-ai/CoPaw/pull/6877)，仍建议尽快合并 | 低风险改进 |
| Issue | [#6405 [Question] 升级2.0后MCP工具总是提示Tool notfound](https://github.com/agentscope-ai/CoPaw/issues/6405) | 2026-07-23 | 已讨论近3周，无明确结论 | 建议维护者提供MCP命名规则/配置校验指引或修复工具名注册逻辑 |
| PR | [#5992 [first-time-contributor] Add per-session model overrides](https://github.com/agentscope-ai/CoPaw/pull/5992)

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-08-11

---

## 1. 今日速览

EasyClaw 项目在过去 24 小时内**社区互动处于低活跃状态**，Issues 与 PR 更新均为 0 条，未产生新的讨论或合并请求。项目团队在此周期内连续发布了 **两个新版本（v1.8.96、v1.8.97）**，核心聚焦于**桌面端工作流教程的补充**（v1.8.97）与**客服会话启动、达人任务重试机制的可靠性提升**（v1.8.96），表明开发重心仍偏向于用户体验优化与稳定性加固，而非新功能开发。整体来看，项目目前处于**稳定的迭代发布期**，社区输入偏低可能是由于功能迭代已趋于成熟，或与近期发布节奏较快、用户尚在消化有关。

---

## 2. 版本发布

### v1.8.97 — 教程更新
- **发布时间**：2026-08-10 前后
- **更新内容**：
  - 新增**更新后的桌面端与达人（Affiliate）工作流教程**，帮助用户更清晰地了解客户端操作路径与推广任务执行流程。
- **破坏性变更**：无
- **迁移注意**：无代码变动，纯文档/教程更新

### v1.8.96 — 可靠性提升
- **发布时间**：2026-08-09 前后
- **更新内容**：
  - 提升**客服会话启动**的稳定性与响应效率
  - 改善**达人（Affiliate）任务重试**机制，降低任务失败的几率
- **破坏性变更**：无
- **迁移注意**：建议用户更新至该版本以获得更稳健的会话与任务体验

> ⚠️ **注意**：两个 release 的安装说明中均提及 macOS 系统下可能出现的 `'RivonClaw' is damaged and can't be opened` 警告——这是 macOS Gatekeeper 对未签名应用的常规拦截，并非应用损坏，用户需在系统设置中手动允许运行。特别值得注意的是，该提示中出现的应用名称 `RivonClaw` 与项目名称 `EasyClaw` 不一致，可能存在品牌/署名方面的混淆，值得维护者检查。

---

## 3. 项目进展

今日无合并或关闭的 PR（过去 24 小时 PR 更新为 0）。

**项目整体推进评估**：虽然 PR 挂零，但连续两个版本的发布表明开发管线运转正常，特别是 v1.8.96 中的可靠性修复（客服会话启动与任务重试）对实际用户体验有直接正向影响——这属于**隐性的技术债务消解**，虽然不可见，但对项目长期健康有利。v1.8.97 的教程补充则有助于降低新用户的上手门槛，对社区增长有间接促进。

---

## 4. 社区热点

今日暂无活跃讨论或高互动 Issues/PRs。

**分析**：持续观察 EasyClaw 的社区动态，当其 Issues 与 PR 长时间零更新时，可能反映出：
- 用户群体以集成商/开发者为主，倾向于通过私有渠道获取支持；或
- 项目已达到一定的功能成熟度，用户需求已基本被满足

建议维护者关注下 Discord/Telegram 等非 GitHub 渠道的讨论热度，以便更全面地评估社区活跃度。

---

## 5. Bug 与稳定性

今日无新增 Bug 报告，无新的崩溃或回归问题。

**遗留观察项**：macOS 安装时广泛出现的 Gatekeeper 拦截提示（涉及应用名 `RivonClaw`），虽已在 release notes 中给出解决方案，但该问题近期持续出现在多个版本中，已有用户可能在首次安装时因困惑而流失——建议维护者评估启用 Apple Developer 签名以彻底解决此类用户体验问题。

---

## 6. 功能请求与路线图信号

今日无新功能请求提交。结合近期两个版本的迭代方向（教程、客服会话、任务重试），可以推测该项目下一阶段的路线图可能仍然围绕：

- **用户体验打磨**：会话管理、任务可靠性
- **增长赋能**：达人/Affiliate 工作流的完善（与当前热门的分销/联盟营销场景契合）

如果社区中有此类需求声音，维护者可将上述两个方向视为明确的优先级信号。

---

## 7. 用户反馈摘要

今日无新的 Issues 评论，无公开的用户反馈可供提炼。

结合安装说明脚本及历史用户行为推断：

- **高频痛点**：macOS 首次启动被拦截（需要手动放行），这是目前最可能影响新用户留存的因素
- **满意点**：发布频率稳定、更新日志双语（中英文）说明齐全，降低了非中文用户的阅读门槛

---

## 8. 待处理积压

今日无新积压事项。但对于长期项目健康度，建议维护者关注以下几个长期观察项：

| 观察项 | 说明 | 建议 |
|---|---|---|
| macOS 签名问题 | 多个版本连续出现 Gatekeeper 拦截提示，且应用显示名与项目名不一致 | 评估 Apple Developer 签名，统一应用显示名 |
| 社区输入持续低迷 | 过去近一周 Issues/PR 活动接近零 | 主动发起社区讨论（如 Roadmap 投票、用户访谈），维持社区粘性 |

---

*本日报基于 2026-08-11 的 GitHub 公开数据生成，仅供参考。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*