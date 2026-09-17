# OpenClaw 生态日报 2026-09-17

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-17 02:16 UTC

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

# OpenClaw 项目动态日报 — 2026-09-17

> 数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw) | 统计窗口：2026-09-16 ~ 2026-09-17

---

## 1. 今日速览

过去 24 小时项目处于 **超高风险、超高活跃** 状态。Issue 与 PR 更新均为 500 条，其中 Issue 新开/活跃 333 条（关闭 167 条），PR 待合并 294 条（合并/关闭 206 条），无新版本发布。**核心热点集中在 2026.9.3 → 2026.9.4 更新失败链路、Gateway 内存泄漏/事件循环饥饿导致的 P0 级稳定性事故，以及大规模多代理部署（632-agent 集群）下的严重性能回退。** 维护者通过 `#145252` 跟踪 issue 集中协调更新可靠性问题，且大量修复 PR 已处于 "ready for maintainer look" 状态，说明团队正在高强度响应。整体项目健康度呈 "**重度应激但修复活跃**" 状态——问题密度极高，但合入/关闭速度同样惊人（206 个 PR、167 个 issue 在过去 24 小时关闭）。

---

## 2. 版本发布

**今日无新版本发布（Releases: 0）**。当前用户群正处于 2026.9.3 → 2026.9.4 升级阵痛期，大量 P0 更新失败报告（见 §5）等待修复后随下一个 patch 版本发布。

---

## 3. 项目进展

过去 24 小时共有 **206 个 PR 被合并/关闭**，以下为今日已关闭的关键 PR：

| PR | 内容 | 状态 |
|---|---|---|
| [#148931](https://github.com/openclaw/openclaw/pull/148931) | 重构 QR 渲染测试：删除冗余 mock 套件，保留真实运行时行为验证 | ✅ 已关闭 |
| [#150482](https://github.com/openclaw/openclaw/pull/150482) | 修复 Slack 监控架构：解决 #150457 引入的静态导入循环，修复 CI lint 失败 | ✅ 已关闭 |
| [#150453](https://github.com/openclaw/openclaw/pull/150453) | 恢复新 PR wrapper 的初始化：修复 `review-init` 在插件发现阶段因缺失运行时导入而退出的问题（关闭 #150449） | ✅ 已关闭 |

**等待合并队列中值得关注的高价值 PR（294 条待合并）**：

- [#150481](https://github.com/openclaw/openclaw/pull/150481)：**降低会话历史加载开销**——历史读取不再解码无关会话，有界上下文读取跳过超出限制的旧条目。直击大规模部署 CPU 峰值问题。
- [#149916](https://github.com/openclaw/openclaw/pull/149916)：修复 `continuation-skip` 模式下已完成工作区每轮重复注入上下文的问题（关闭 #149867）——直接降低 token 成本。
- [#110179](https://github.com/openclaw/openclaw/pull/110179)：修复 ADC-only 认证提供方在 Gateway 路由下 "No API key found" 的问题（关闭 #110103）。
- [#149291](https://github.com/openclaw/openclaw/pull/149291)：会话列表诊断新增 6 项当前线程 CPU 时间指标——为 #145679 提供可观测性基础。
- [#150337](https://github.com/openclaw/openclaw/pull/150337)：修复发布验证引导与 pnpm 缓存竞态问题（关闭 #150336）。
- [#99556](https://github.com/openclaw/openclaw/pull/99556)：Gateway 聊天历史净化中过滤 Responses 风格 media block 内联图片字节。

**结论**：项目虽然处于事故高发期，但修复管线运转顺畅，且开始出现针对大规模部署性能的主动优化（#150481、#149291），说明维护者正在从"堵漏"向"性能治理"过渡。

---

## 4. 社区热点

今日讨论热度最高的几个 Issue：

| Issue | 标题 | 评论数 | 热度信号 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw 泄漏未收割的 hook/tool 子进程，导致僵尸进程堆积与运行时退化（P1） | 30 | 👎 1 👍 1 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏：RSS 从 350MB 增长至 15.5GB，反复 OOM 崩溃（P1） | 25 | 👍 1 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init 超时导致 Gateway 崩溃——未处理的 rejection（P1） | 24 | — |
| [#111897](https://github.com/openclaw/openclaw/issues/111897) | 同一 session lane 下两个并发 run 均完成，导致重复/冗余回复（P1） | 19 | 👍 1 |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | 多代理显式所有权下 `AgentSelectionRequiredError` 刷屏（P1） | 17 | — |
| [#150201](https://github.com/openclaw/openclaw/issues/150201) | Windows 2026.9.3 候选版本快照失败；Gateway SQLite 检查超时（P0） | 14 | — |
| [#149361](https://github.com/openclaw/open

---

## 横向生态对比

# OpenClaw 生态横向对比分析报告（2026-09-17）

> 覆盖项目：OpenClaw / NanoBot / Zeroclaw / PicoClaw / NanoClaw / IronClaw / LobsterAI / TinyClaw / Moltis / CoPaw / ZeptoClaw / EasyClaw


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态正处于**从单机工具向多代理基础设施演进的阵痛期**。以 OpenClaw 为参照核心，生态整体活跃度呈"头部超高活跃、中部密集迭代、尾部显著分化"的格局——核心项目单日 Issue/PR 双双突破 500 条，而部分外围项目已多日零活动。各项目共同面临**多代理部署稳定性、内存与资源治理、会话/记忆生命周期管理**三类高频技术债，同时围绕**网关路由、渠道适配、可观测性**展开架构升级。一个显著信号是：**OpenClaw 的 2026.9.3→2026.9.4 升级事故**成为整个生态的"压力测试"，周边项目（LobsterAI、NanoClaw 等）均在为兼容其新 Gateway 架构做适配性修复，说明 OpenClaw 的技术路线已事实上成为社区共同维护的"基础设施层"。


## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PRs（24h） | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 333，关闭 167） | 500（待合并 294，合并/关闭 206） | 无 | ⚠️ 重度应激但修复活跃 |
| **NanoBot** | 3（2 活跃，1 关闭） | 20（4 合并/关闭，16 待审查） | 无 | ✅ 良好，发布前密集修复 |
| **Zeroclaw** | 50（关闭 0） | 50（合并/关闭 1） | 无 | 🟡 设计密度高、落地节奏慢 |
| **PicoClaw** | 0（1 stale 关闭） | 0（2 stale 关闭） | 无 | ⚠️ 低活跃，PR 审查积压 |
| **NanoClaw** | 2 新开 | 34（9 合并/关闭，25 待合并） | 无 | ✅ 良好，迭代极快 |
| **IronClaw** | — | — | — | ⚪ 无活动 |
| **LobsterAI** | 9 旧 Issue 被清理 | 3 合并 + 15 stale 关闭 | 无 | ✅ 中等活跃，健康度良好 |
| **TinyClaw** | — | — | — | ⚪ 无活动 |
| **Moltis** | 2（1 新开，1 关闭） | 3（1 合并，2 待审核） | 无 | 🟡 中等偏上，PR 审核周期偏长 |
| **CoPaw** | 25（14 新开/活跃，11 关闭） | 37（24 待合并，13 合并/关闭） | 无 | ✅ 功能迭代与稳定性加固并行 |
| **ZeptoClaw** | — | — | — | ⚪ 无活动 |
| **EasyClaw** | 0 | 0 | 2（v1.9.17/v1.9.18） | ✅ 低社区活跃、高开发输出 |

**分层统计**：12 个项目中，高活跃 4 个（OpenClaw/NanoClaw/CoPaw/NanoBot），中活跃 4 个（Zeroclaw/LobsterAI/Moltis/EasyClaw），低活跃/无活动 4 个（PicoClaw/IronClaw/TinyClaw/ZeptoClaw）。仅 EasyClaw 当日发布新版本，其余项目均处于功能积累/修复收口期。


## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态的"基础设施参照系"**——其 GitHub 动态被 NanoBot、Zeroclaw、PicoClaw、NanoClaw、LobsterAI、CoPaw 等项目同步追踪并作为兼容目标。具体对比：

| 维度 | OpenClaw | 同类项目 |
|---|---|---|
| **社区规模** | Issue/PR 单日 500 条，24h 内合并 206 PR、关闭 167 Issue，维护者响应速度极高 | NanoClaw（34 PR）、CoPaw（37 PR）同属活跃梯队，但体量差一个数量级 |
| **技术路线** | 重度依赖 Gateway 网关架构 + 大规模多代理编排（已见 632-agent 集群），强调统一消息总线与会话历史管理 | NanoClaw 走"多网关可选"路线（Iron Proxy vs OneCLI）；CoPaw 走 AgentScope 生态 + Hub 多租户；Zeroclaw 侧重记忆架构与 Goal Mode |
| **核心优势** | 修复管线极其强悍（206 PR/天），高压力下仍能推进性能治理（如 #150481 会话历史加载优化） | NanoBot 以 TUI 体验和 provider fallback 见长；Moltis 以 sandbox 安全和斜杠命令交互取胜 |
| **当前风险** | 2026.9.3→2026.9.4 升级链路存在 P0 级稳定性事故（Gateway 内存泄漏、事件循环饥饿），对下游生态形成"连带地震" | LobsterAI 专门针对 OpenClaw 网关事故做"自愈修复"功能，是生态内典型的"OpenClaw 兼容层"项目 |

**结论**：OpenClaw 是生态的"风险源头"与"修复标杆"双重角色——它的稳定性事故会辐射到依赖它的周边项目，而它的高强度修复文化也为生态设定了"快响应"的基准线。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话历史与上下文成本** | OpenClaw（#150481 历史读取解码开销）、NanoBot（#5792 跨会话串线）、Zeroclaw（#9048 会话历史 vs 长期记忆分离）、CoPaw（#6318 会话级模型指定） | 降低历史加载开销、防止会话间消息串扰、会话级隔离是生态共识；上下文成本控制已从前沿话题变为日常运维需求 |
| **记忆架构独立化** | Zeroclaw（记忆三连 RFC：#6850/#9103/#9048）、NanoBot（#5379 记忆整合截断）、CoPaw（#4171 memory-distill 工具插件） | 记忆正在从"功能特性"演化为"独立子系统"：生命周期策略与存储解耦、会话历史与长期记忆分离、记忆蒸馏/压缩成为新工具品类 |
| **异步任务生命周期管理** | PicoClaw（#3343 无限循环调 Telegram API 228,000 次）、LobsterAI（#1107 幽灵事件，停止轮询后仍发通知）、CoPaw（#7813/#7814 SSE 流冻结）、Moltis（#1271 MCP 会话丢失后永久失败） | 多个项目暴露同一类缺陷：**任务取消信号不传递、异常分支不清理、无自动熔断**——异步反馈动画、轮询、SSE 流均缺生命周期状态机 |
| **多 Provider 故障转移** | NanoBot（#5764 FallbackProvider 半开穿透、#5769 NVIDIA NIM 超时不触发转移）、OpenClaw（#110179 ADC-only 认证路由）、LobsterAI（#2688 共享凭据冷却豁免） | 半开状态探测、非标准错误识别、集中式认证/计费故障隔离是"多模型路由"落地前的必要前置条件 |
| **渠道适配层稳定性** | PicoClaw（Telegram 隐式提及/文档引用）、NanoClaw（WhatsApp newsletter JID/多问题应答）、CoPaw（微信/飞书媒体与消息格式）、LobsterAI（钉钉 conversationId 前缀） | 渠道适配是生态最短的那块板：**每个渠道都有真实场景下的边界缺陷**，尚未出现一个"渠道层"项目能统一解决 |
| **配置即验证** | Zeroclaw（#10511 凭据错误被误报为成功）、NanoClaw（#3844 setup.sh npm prefix）、EasyClaw（v1.9.18 模板下拉校验） | 用户对"配置保存即生效、错误及时暴露"的诉求贯穿整个生态；静默截断（Zeroclaw bootstrap 6000 字符）和假成功（凭据误存）是信任杀手 |
| **CI 稳定性** | NanoClaw（Bun 1.4.0 spawnSync 挂起六小时）、CoPaw（shell 逃逸检测默认开启）、LobsterAI（stale 清理机制）、Moltis（#1270 cargo 构建缓存） | 基础设施级工程债（CI 挂起、构建缓存、安全默认值）开始占据社区注意力，说明项目已度过"功能探索期"进入"工程化时期" |


## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 通用自主智能体基础设施，大规模多代理编排 | 高要求开发者/企业，需 632-agent 级集群 | **Gateway 网关中枢 + 统一消息总线**；强调会话 lane、跨 session 并发控制、Gateway 内存治理 |
| **NanoBot** | 个人 AI 助手，TUI 优先的轻量级代理 | 个人开发者、自托管用户、多 provider 切换需求者 | **单进程 + FallbackProvider 故障转移**；重视 TUI 响应性、cron 调度、记忆整合；体积小、依赖轻 |
| **Zeroclaw** | 架构前卫的 Agent 运行时，设计驱动型社区 | 架构敏感型开发者、记忆专项研究者 | **记忆生命周期与存储后端解耦**；Goal Mode 前台任务状态机；RFC 驱动的重型设计文化 |
| **PicoClaw** | Telegram 场景优化的轻量代理 | Telegram 重度用户、个人 bot 维护者 | **Telegram 适配层优先**；当前受困于维护者带宽，PR 大量 stale 关闭 |
| **NanoClaw** | 多渠道 AI 助手网关 | 需要 WhatsApp/Webhook/多渠道接入的部署者 | **Iron Proxy 网关 + 可插拔投递契约**；per-agent-group delivery mode；OpenCode 提供商支持 |
| **LobsterAI** | OpenClaw 的"运维增强层" | 网易生态及企业用户 | **OpenClaw 兼容 + 自愈修复**；分阶段回滚、SQLite schema 迁移、托管 provider 凭

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-17

## 今日速览

过去24小时 NanoBot 项目保持高活跃度：Issue 侧共 3 条更新（2 条活跃讨论，1 条已关闭）；PR 侧密集更新高达 20 条，其中 4 条已合并/关闭，16 条待审查。值得关注的是，多条核心修复 PR（会话消息序列化、TUI 响应性、编辑工具行为修正）集中在 9 月 14-16 日提交，显示维护者在稳定性和体验细节上有明显推进。无新版本发布，项目处于功能积累向发布窗口过渡的阶段。

---

## 项目进展

今日合并/关闭的 4 条 PR 覆盖了工具层、TUI 体验、测试与文档：

| PR | 类型 | 说明 |
|---|---|---|
| [#2595](https://github.com/HKUDS/nanobot/pull/2595) | 重构 | 重命名工具进度路径中的局部变量（`thought` → `display_text`），提升代码可读性 |
| [#5791](https://github.com/HKUDS/nanobot/pull/5791) | 修复/性能 | 修复 TUI 在 agent 输出期间输入框无响应的问题，通过有界 FIFO 批处理保证输入回调不被饿死；已在今日关闭（合并） |
| [#5756](https://github.com/HKUDS/nanobot/pull/5756) | 测试/安全 | 隔离 SSRF/代理测试在存在系统级代理的主机（Windows 注册表 / macOS SystemConfiguration）上保持可重复执行 |
| [#5789](https://github.com/HKUDS/nanobot/pull/5789) | 文档 | 刷新 README WebUI 截图，覆盖新主题创作、多面板工作台、上下文缓存、MCP 目录与自动化日历视图 |

**整体评估**：TUI 响应性修复与安全测试加固的合并提升了日常使用体验与工程健壮性；16 条待合并 PR 中大量为 p2 级修复，预计近期将有一个小版本集中落地。

---

## 社区热点

### 🟡 1. [#4419 Feature: Automatic reasoning effort escalation](https://github.com/HKUDS/nanobot/issues/4419)
- 作者：@orrinwitt ｜ 创建于 2026-06-20 ｜ 最后更新 2026-09-16 ｜ 评论：5
- 讨论热度最高（5 条评论），虽创建已近 3 个月，但 9 月 16 日仍被更新，说明讨论持续活跃。用户希望 nanobot 能从默认的 `reasoningEffort` 自动升级到更强的推理档位（应根据问题复杂度动态决定模型思考深度）。这与当前多家模型厂商推出可调推理参数趋势紧密契合，反映出用户对智能化资源分配的诉求。

### 🟢 2. [#5731 Add AnySearch extract as web_fetch backend](https://github.com/HKUDS/nanobot/issues/5731)
- 作者：@cleverLucky ｜ 创建于 2026-09-11 ｜ 评论：1
- 来自 AnySearch 团队，提出将其统一实时搜索工具（支持 API / MCP / Skill 三种集成方式）作为 nanobot 的 `web_fetch` 后端接入。此前已有 #5505 的前置沟通，属于合作集成类需求，对扩展 nanobot 的实时信息获取能力有明确价值。

### ⚪ 3. [#5790 [增强] 代码仓库](https://github.com/HKUDS/nanobot/issues/5790)
- 作者：@heyang-930 ｜ 创建于 2026-09-16 ｜ 状态：已关闭
- 用户请求“代码仓库邀请链接”，非技术需求，已在 1 条评论后关闭。属于低价值噪声 issue。

---

## Bug 与稳定性

以下为当前待合并 PR 中涉及的问题修复，按严重程度排列：

| 严重度 | Issue / PR | 问题描述 | 状态 |
|---|---|---|---|
| **P1** | [#5792](https://github.com/HKUDS/nanobot/pull/5792) | 跨会话消息竞争：Session A 的响应可能出现在 Session B；修复方案为每会话单一 FIFO 工作者 + 快照批次注入 | 已提交修复 PR（待合并） |
| **P2** | [#5794](https://github.com/HKUDS/nanobot/pull/5794) | 跨会话响应投递错误（同一 bug 的独立修复） | 已提交修复 PR（待合并） |
| **P2** | [#5796](https://github.com/HKUDS/nanobot/pull/5796) | `edit_file` 在非 Markdown 文件内联替换时移除分隔空白，可能粘连相邻 token 改变语义 | 已提交修复 PR（待合并） |
| **P2** | [#5795](https://github.com/HKUDS/nanobot/pull/5795) | `edit_file` fallback 编辑时丢失缩进并插入多余空行 | 已提交修复 PR（待合并） |
| **P2** | [#5793](https://github.com/HKUDS/nanobot/pull/5793) | 递归 `list_dir` 在父目录含 `build`/`dist` 等忽略名时误判子目录为空 | 已提交修复 PR（待合并） |
| **P2** | [#5764](https://github.com/HKUDS/nanobot/pull/5764) | `FallbackProvider` 半开状态下并发探测全部穿透至恢复中的主 provider | 已提交修复 PR（待合并） |
| **P2** | [#5769](https://github.com/HKUDS/nanobot/pull/5769) | NVIDIA NIM 风格超时错误（`RuntimeError` 消息文本）无法触发故障转移 | 已提交修复 PR（待合并） |
| **P2** | [#5765](https://github.com/HKUDS/nanobot/pull/5765) | OpenAI 兼容接口将字符串 `"false"` 视为 truthy，导致非预期 SSE 流式模式 | 已提交修复 PR（待合并） |
| **P2** | [#5766](https://github.com/HKUDS/nanobot/pull/5766) | cron 工具允许多个冲突调度字段并存时静默丢弃部分配置 | 已提交修复 PR（待合并） |
| **P2** | [#5762](https://github.com/HKUDS/nanobot/pull/5762) | cron 工具接受过去时间 `at`，导致任务永不触发 | 已提交修复 PR（待合并） |
| **P2** | [#5379](https://github.com/HKUDS/nanobot/pull/5379) | 记忆整合时 `history.jsonl` 原始回退内容被截断，导致公共原始数据丢失 | 已提交修复 PR（待合并） |

**稳定性趋势**：编辑工具（两处）、cron 工具（两处）、会话消息路由（两处修复）为本轮 bug 高发区域，但均已由社区提交修复 PR，健康度良好。其中 p1 级跨会话串线问题亟需维护者优先审查合并。

---

## 功能请求与路线图信号

### 活跃功能请求
| Issue/PR | 诉求 | 信号强度 |
|---|---|---|
| [#4419](https://github.com/HKUDS/nanobot/issues/4419) 自动推理强度升级（默认 + 升级档位） | 根据问题难度动态选择 `reasoningEffort`，默认低档、必要时自动升级，以平衡成本与质量 | 高：5 条评论，持续讨论；与现有 `config.reasoningEffort` 字段天然衔接 |
| [#5731](https://github.com/HKUDS/nanobot/issues/5731) 集成 AnySearch 为 web_fetch 后端（key 可选 / 匿名配额） | 统一实时搜索工具，支持 API、MCP、Skill 三模式，可增强 nanobot 的网络搜索与抓取能力 | 中：来自第三方团队主动集成，有 #5505 合作基础 |

### 已提交的功能型 PR（待合并，有望进入下一版本）
- [#5718](https://github.com/HKUDS/nanobot/pull/5718) feat(provider): 支持 OpenRouter 原生图像生成 API — 扩展 `generate_image` 可用的模型与 provider
- [#5520](https://github.com/HKUDS/nanobot/pull/5520) feat(provider): 为 Codex 增加 Langfuse tracing — 使 Codex provider 拥有与 OpenAI 兼容 provider 同等的可观测性
- [#5652](https://github.com/HKUDS/nanobot/pull/5652) feat(gateway): 新增带签名的直接投递 webhook — 允许 CI/监控/计费等可信系统绕过 agent 循环，直接推送通知文本到消息总线
- [#5797](https://github.com/HKUDS/nanobot/pull/5797) fix(mcp): 向 Parallel 标识 nanobot 请求（User-Agent: `nanobot/<version>`） — 便于统计集成使用量并持续支持

**路线图判断**：项目正沿着“多 provider 适配 + 可观测性 + 平台集成”三条线前进；OpenRouter 图像生成与 Langfuse tracing 落地概率较高。建议关注 #4419 的推理强度自动化讨论，可能沉淀为 agent 层的通用能力。

---

## 用户反馈摘要

- **跨会话串线问题**（来自 #5792、#5794 的 PR 描述）：用户在 A 会话发送消息后快速切换到 B 会话发送消息，A 的响应会出现在 B 中。这属于高频使用场景下的体验缺陷，社区已有两位作者分别提交修复，反映出该问题确实影响真实可用性。
- **编辑工具行为不一致**（来自 #5796、#5795）：`edit_file` 在处理尾随空白、缩进和换行时的非预期行为可能导致编辑后的代码语义改变，这对依赖工具进行文件操作的用户是较大的可信度打击。
- **cron 调度静默失效**（来自 #5766、#5762）：过去时间被接受但任务永不触发，且无报错——这类“假成功”让用户难以排障，反映了校验层仍有缺口。
- **推理成本精细化需求**（来自 #4419 讨论）：用户认可 nanobot 已支持 `reasoningEffort`，但手动设置无法兼顾简单问答与复杂推理任务，希望系统自动感知问题复杂度并动态调配资源。这是成本敏感型个人/团队用户的核心诉求。

---

## 待处理积压

### 长时间未合并的 PR（需维护者关注）
| PR | 创建时间 | 等待时长* | 说明 |
|---|---|---|---|
| [#5152 fix(subagent): mark partial completion results](https://github.com/HKUDS/nanobot/pull/5152) | 2026-07-28 | ~50 天 | 为后台兄弟子代理的完成状态补充元数据与提示，保持父 turn 正确收尾；涉及 WebUI 与外部渠道历史清理 |
| [#5379 fix(memory): preserve full consolidation input](https://github.com/HKUDS/nanobot/pull/5379) | 2026-08-13 | ~34 天 | 修复记忆整合丢弃 `history.jsonl` 原始内容的问题 |
| [#5520 feat(provider): langfuse tracing for codex](https://github.com/HKUDS/nanobot/pull/5520) | 2026-08-24 | ~23 天 | 增加 Codex 的可观测性，功能完整但可能受 Codex 底层 httpx 传输限制影响，需 reviewer 验证 |

\* 按 2026-09-17 估算；上述 PR 在 9 月 16 日均有更新，说明仍在活跃推进，但合并周期较长。

### 值得注意的长期开放 Issue
- [#4419 automatic reasoning effort escalation](https://github.com/HKUDS/nanobot/issues/4419) 已开放近 3 个月，仍有新评论；如近期无排期，建议维护者给出明确回应（如 milestone 或暂缓声明）。

---

**总结**：NanoBot 在 9 月中旬展现出典型的“发布前密集修复”特征——大量 p2 级 bug fix 集中在编辑工具、cron、provider fallback 与会话调度等关键路径，且修复质量较高（大部分附测试）。项目健康度良好，社区贡献活跃，唯一需要注意的是部分 PR 积压时间偏长，建议维护者在本轮修复窗口后安排一次集中 review 与版本发布。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-09-17）

## 今日速览

过去 24 小时项目保持高强度讨论态势：共产生 50 条 Issue 更新和 50 条 PR 更新，但 Issue 关闭数为 0、PR 合并/关闭仅 1 条，表明当前阶段以设计讨论与评审迭代为主，实际合并节奏放缓。最受关注的议题集中在记忆子系统架构拆分（#6850、#9103、#9048）、Goal Mode 路线图落地（#8303、#9702、#9703 及跟踪器 #10341）以及 eval 评测框架的推进（#9967 及 #9214-#9248 系列 PR）。值得注意的是 p1 级别的阻塞性 Bug 仍在活跃讨论中（#8505 Telegram 配置故障、#10230 守护进程初始化栈溢出），尽管已有部分修复 PR 在列，但均未合并。项目整体处于"设计密度高、落地节奏慢"的阶段，核心架构方向仍在收敛中。

## 项目进展

过去 24 小时仅有 1 条 PR 被合并/关闭，信噪比较低。但多条高价值 PR 正在排队等待审查或作者响应：

- **[#10910] test(agent): record the sealed tool-registry parity contract**（🟡 开放）— 刚创建的测试类型 PR，为工具注册表可观测性奠定基座。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10910)

- **[#10197] fix(acp): persist interrupted turn progress**（🟡 开放，需维护者审查）— 针对 S0 数据丢失风险（#10121）的修复，利用检查点机制保留中断的 Code/ACP 轮次，属高风险高价值修复。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)

- **[#10511] feat(quickstart): block persist when the provider rejects the credential**（🟡 开放）— 修复快速启动将错误凭据误报为成功的问题，直接回应用户侧常见的配置踩坑。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10511)

- **[#8966] feat(agent): carry live provider identity on usage events**（🟡 开放，需维护者审查）— 大型改动，让上下文窗口与用量事件感知真实服务提供方，已在维护者注记中获得认可但仍在审查中。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8966)

**核心判断**：尽管合并数趋近于零，但 ACP 中断恢复、quickstart 凭据校验等高优先级修复已完成开发、只待合并，预示下一波合并潮将显著改善稳定性和首次体验。

## 社区热点

今日讨论最热烈的问题集中在**记忆架构**与**Goal Mode 路线图**两条主线上，两者都是决定项目长期形态的深层设计议题：

1. **[#6850] RFC: Decouple memory lifecycle policy from storage backends**（25 条评论）— 讨论如何将记忆存储后端与生命周期治理策略解耦，已有 25 条评论，是当前全项目最活跃的设计讨论。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)

2. **[#8303] RFC: Goal mode v1 — bounded foreground Matrix work**（22 条评论）— 定义可控的前台目标执行边界。多次迭代与修订表明社区对目标模式的交付范围仍有强烈关注。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)

3. **[#9103] RFC: separate authoritative memory storage from optional enrichment connectors**（19 条评论) — 为记忆存储与增强连接器划定清晰边界，体现社区对架构正交性的持续追求。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9103)

4. **[#9048] RFC: Separate conversation history from agent-curated long-term memory**（16 条评论）— 会话历史与长期记忆的分离呼声，直指混合写入 `MemoryCategory::Conversation` 的现实问题。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9048)

5. **[#8692] [Tracker]: Maintainer decision queue for RFCs and design issues**（15 条评论）— 社区自发建立维护者决策队列跟踪器，反映出对 RFC 决策节奏加快的共同期待。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)

**背后诉求**：社区的核心焦虑是"正确的架构边界"——包括记忆生命周期归属、会话 vs 长期记忆、目标模式 V1/V2/V3 的切分——这些讨论本质上是在为项目长期可维护性争取更稳的地基。

## Bug 与稳定性

按严重程度排列：

**S0 - 数据丢失 / 安全风险**

- **[#10121] partial Code/ACP turns disappear if the process exits before completion**（p1，zerocode/tui）— Code/ACP 会话若中途退出即丢失全部流式内容。已有修复 PR #10197 在列但需维护者审查。 [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) / [PR #10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)

**S1 - 流程阻断**

- **[#8505] Telegram channel cannot be configured**（p1，channel:telegram）— 快速启动/ZeroCode 配置后 Telegram 仍不响应，"channels doctor" 仍报未配置。对应 E2E 测试已在 #8766 中规划，暂无修复 PR。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8505)

- **[#10230] Daemon startup or reload can overflow during agent initialization**（p1，zerocode/tui）— 快速启动配置加载时触发 Tokio worker 栈溢出，仍在等待复现。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)

- **[#9697] ZeroCode cannot connect to daemon launched by Windows Task Scheduler**（p1，zerocode/tui，S3 严重度但标记 p1）— Windows 计划任务场景下 daemon 就绪检测失败，仍待修复。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9697)

**S2 - 行为降级**

- **[#10523] Bootstrap file truncation at 6000 chars is invisible**（p1，runtime/daemon）— `AGENTS.md` 等被静默截断至 6000 字符，用户无感知，已有修复 PR #10567 在列（为记忆条目补上日期戳，间接缓解同类可见性问题）。 [Issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10523) / [PR #10567](https://github.com/zeroclaw-labs/zeroclaw/pull/10567)

- **[#10302] ZeroCode Code pane can stay in Processing state while browsing history**（p2，zerocode/tui）— UI 状态残留并持续占用 CPU。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)

**值得注意**：今日新 Bug 报告为 0，但既有 p1/p2 Bug 的修复进度仍是重要观察指标。

## 功能请求与路线图信号

当前无新版本发布，但社区功能请求方向清晰，结合已有 PR 可推断下一版本候选范围：

**高概率进入下一版本（已有实现 PR）**

- **eval 评测框架系列**（#9214-#9248 共 11 个 PR）：live execution mode、JUnit 报告、pass@k、LLM-judge、run receipts 等，构成完整评测闭环。当前全部标记 `needs-author-action`，作者响应后将进入快速通道。 [PR 列表起点](https://github.com/zeroclaw-labs/zeroclaw/pull/9214) / [跟踪器 #9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967)

- **Telegram 未授权通知可配置化**（PR #10401，事件 #10400）：将硬编码提示改为 Fluent 文案体系，让通知文本随授权方式自适应。 [PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)

**设计已接受、等待实现排期**

- **记忆架构三连**（#6850、#9103、#9048）：都在 RFC 已接受状态，但需要 V2 的存储/增强边界决策推动。 [跟踪器 #8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)

- **Goal Mode V1/V2/V3**（#8303、#9702、#9703）：V1、V2 已被接受，V3 是未来 RFC；有专项跟踪器 #10341 协调实现批次。 [跟踪器 #10341](https://github.com/zeroclaw-labs/zeroclaw/issues/10341)

**值得关注的新信号**

- **ZeroCode 会话可用性**（#10141）获得多个后续跟进 Issue（#8894 归档/清理、#8383 Dashboard 上下文显示、#10302 状态残留），表明 ZeroCode 将成为下一波 UX 打磨的重点目标。 [母题 #10141](https://github.com/zeroclaw-labs/zeroclaw/issues/10141)

- **bootstrap 安装清单与 MCP launcher**（PR #10591）与 **terminal multiplexer 生命周期导出**（#10167）表明项目正在向外部生态集成扩展。

## 用户反馈摘要

从今日活跃评论中提炼的用户真实声音：

1. **"配置了却没有生效"是最大的信任杀手**：Telegram 配置后 bot 不响应、doctor 仍报错（#8505）；quickstart 成功保存了错误的 API key，直到第一条消息才发现（对应 PR #10511 的修复动机）。用户明显期待"配置即验证"。

2. **本地模型用户对 prompt 膨胀敏感**：`compact_context` 截断 bootstrap 文件且不告知用户（#10523），直接削弱了用户对本地模式的掌控感。`local_small` 运行时规格（#5287）持续获得 👍（2 个），说明本地优先是真实需求。

3. **会话管理是 ZeroCode 的体验洼地**：用户 klonuo 的反馈极具代表性——"It's quite frustrating to get into previous session"，复制代码需要两个 ASCII 按钮、无法便捷地管理历史会话（#10141）。多个关联 Issue 表明这不是孤例。

4. **社区认可架构拆分方向，但希望节奏更快**：#8692 跟踪器的建立说明社区已自发组织起决策队列，对 RFC 的"接受/拒绝/延期"抱有更高期待。

5. **Windows 场景被持续吐槽**：Windows 计划任务启动的 daemon 无法连接（#9697）已是跨版本 bug，用户表达"which I expected to be resolved"的失望情绪。

## 待处理积压

以下问题长期未响应或处于关键阻塞状态，建议维护者优先介入：

**阻塞级 PR 积压（作者已就绪，等待维护者行动）**

- **eval 框架系列 11 个 PR**（#9214-#9248）：全部超过 50 天未合并、均标记 `needs-author-action`，但其中多个已由 distinguished contributor 完成且设计成熟。这是目前最大的功能积压块，长期悬置会影响贡献者积极性。 [起点](https://github.com/zeroclaw-labs/zeroclaw/pull/9214) / [跟踪器 #9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967)

- **[#10197] fix(acp): persist interrupted turn progress**：S0 数据丢失修复，已标记 `needs-maintainer-review`，等待审查。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)

- **[#10583] feat(gateway): accept any file on /api/upload**：web 与 RPC 行为对齐，已标记 `needs-maintainer-review`。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10583)

- **[#10401] feat(channels): configurable Telegram unauthorized notice**：对应 p2 功能请求的实现，等待审查。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)

- **[#8966] feat(agent): carry live provider identity on usage events**：XL 级改动，维护者已补充注记但仍未合并。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8966)

**长期活跃的高风险设计 Issue（等待决策落地）**

- **记忆架构三连**（#6850、#9103、#9048）加上跟踪器 #8891 — 均已接受、均 `no-stale`，但 V2 的边界决策尚未收敛。这三项直接决定后续存储层和网关层的开发方向。 [跟踪器 #8891](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)

- **[#8692] Maintainer decision queue tracker**：社区已习惯用它跟踪决策进度，建议维护者定期更新状态以维持信任。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)

**持续无进展的 p1 Bug**

- **[#8505] Telegram channel cannot be configured**（S1）已存活 80 天，虽有 E2E 测试规划（#8766）但缺少直接修复方案。 [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8505)

---

*本报告基于 2026-09-17 的 GitHub 项目动态数据自动生成，反映截至发布时刻的项目健康度。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-17

## 1. 今日速览

过去 24 小时 PicoClaw 项目整体活跃度较低：无新 Issue、无新 PR、无新版本发布。当日更新集中在存量维护动作上——1 个有关 Telegram 工具反馈动画的 Bug Issue 被标记为 stale 并关闭，2 个同样被标记为 stale 的 Telegram 相关修复 PR 也被关闭。另有 1 个已开放 25 天的手机配对功能 PR 仍处于待合并状态，未获得维护者明确反馈。综合来看，项目当前处于低活跃期，维护审查节奏较慢，Telegram 适配层成为近期社区关注与贡献的主要聚焦点。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日有 2 个 PR 被标记为 stale 并关闭，均来自同一贡献者 @hugodeco，集中修复 Telegram 适配层的问题：

- **[CLOSED] [stale] fix(telegram): treat replies to the bot's own messages as implicit mentions**（[#3357](https://github.com/sipeed/picoclaw/pull/3357)）  
  在 `mention_only: true` 的群组中，用户直接回复机器人消息时，如果回复内容不含 @提及，机器人会忽略该消息。该 PR 旨在将“回复机器人消息”视为隐式提及，以保持对话连续性。此类修复对 Telegram 场景下的多轮对话体验有实质提升，但该 PR 因长期无人 review 被 stale bot 自动关闭，建议维护者评估后重新开放或合并。

- **[CLOSED] [stale] fix(telegram): re-attach quoted documents when replying to a file message**（[#3356](https://github.com/sipeed/picoclaw/pull/3356)）  
  修复了用户引用文档消息时，引用的回复仅携带字面 `[file]` 占位符、无法保留文档上下文的问题，使代理能够正确处理带有文档引用的后续对话。该修复同样因长期未获响应被关闭。

**总体评估**：两个 PR 均属于 Telegram 适配层的明确缺陷修复，价值清晰，但均在过去 25 天内未获得维护者审阅而进入 stale 状态。该项目当前存在 PR 审查积压的迹象，贡献者投入与维护者响应之间有明显落差。

---

## 4. 社区热点

今日无新产生的高热度讨论。存量中最受关注的事件是已关闭的 Issue：

- **[CLOSED] [stale] [BUG] Tool feedback animation can edit a Telegram message indefinitely after a failed turn**（[#3343](https://github.com/sipeed/picoclaw/issues/3343)）  
  作者 @raine 报告了一个严重问题：工具反馈动画在代理回合失败后，仍持续每 3 秒调用一次 Telegram 的 `editMessageText`，连续运行数日，累计发出超过 228,000 次编辑请求，最终触发了 Telegram 服务端的限流策略。该 issue 共收到 4 条评论，是今日缓存数据中评论最多的条目。背后的核心诉求是：**代理生命周期与异步反馈动画之间缺少终止信号同步机制**，同时也侧面反映出项目缺少对第三方 API 配额消耗的防护机制。该 issue 已于今日被 stale 关闭，但问题本身并未标记为已修复。

---

## 5. Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 是否有修复 PR |
|---------|---------|------|-------------|
| 高 | **无限循环调用 Telegram API 触发限流**（[#3343](https://github.com/sipeed/picoclaw/issues/3343)）：工具反馈动画在代理回合失败后未终止，持续调用 `editMessageText`，产生 228,000+ 次请求，触发 Telegram 服务端 `retry_after` 限流。此问题可能导致机器人在数小时内无法正常服务，属于影响用户可用性的稳定性缺陷。 | Issue 已关闭（stale），无修复标记 | 未发现对应修复 PR |

暂无其他新增 Bug 或崩溃报告。

---

## 6. 功能请求与路线图信号

当前数据中没有新的功能请求 Issue。功能层面值得关注的是处于开放状态的 PR：

- **[OPEN] Add Build Remote Agent phone pairing (gbr/1)**（[#3344](https://github.com/sipeed/picoclaw/pull/3344)）  
  提出新增 **Build Remote Agent** 配对设备适配器，允许手机以旁观者身份连接桌面代理实例。协议采用 `gbr/1`，依赖 `gbr-agent` v0.6.0+，支持 QR 码和 8 位配对码两种方式，连接范围限制在 `http://127.0.0.1:8788` 或 stdio。  
  该 PR 已开放 25 天，尚无维护者评论。从协议设计和依赖外部工具来看，这可能是一个面向特定用户群（Build Remote Agent 生态用户）的功能增强，是否纳入下一版本取决于维护者对该生态的路线图规划。

---

## 7. 用户反馈摘要

以下反馈来自 Issue [#3343](https://github.com/sipeed/picoclaw/issues/3343) 的评论与描述：

- **真实痛点**：用户在代理回合结束后，系统仍持续对 Telegram 消息进行编辑操作，且无法主动停止。用户被迫承受数以万计的无效 API 调用，并最终因限流导致服务不可用。这说明**异步任务的取消与清理机制存在缺陷**，且缺少对第三方 API 调用频率的自我保护。
- **使用场景**：该问题发生在工具反馈动画场景中——代理执行某工具调用失败后，UI 动画层没有收到回合终止的信号，仍按照原定节奏对消息进行轮询编辑。暴露出内部事件系统在异常分支下的状态泄漏。
- **不满意之处**：此类问题持续数天未被发现或自动熔断，说明项目缺少运行时健康监控和异常调用检测能力。

---

## 8. 待处理积压

| 类型 | 编号 | 标题 | 停滞时长 | 建议 |
|------|------|------|---------|------|
| PR | [#3344](https://github.com/sipeed/picoclaw/pull/3344) | Add Build Remote Agent phone pairing (gbr/1) | 25 天，无维护者响应 | 尽快安排 review，明确是否纳入路线图；若暂不采纳，建议给出明确反馈，避免贡献者等待。 |
| PR | [#3357](https://github.com/sipeed/picoclaw/pull/3357) | fix(telegram): treat replies to the bot's own messages as implicit mentions | 16 天后于今日被 stale 关闭 | 修复场景清晰、影响面小，建议重新打开并合入。 |
| PR | [#3356](https://github.com/sipeed/picoclaw/pull/3356) | fix(telegram): re-attach quoted documents when replying to a file message | 16 天后于今日被 stale 关闭 | 同上，属于 Telegram 适配层的明确缺陷修复，建议恢复审阅。 |
| Issue | [#3343](https://github.com/sipeed/picoclaw/issues/3343) | Tool feedback animation can edit a Telegram message indefinitely after a failed turn | 创建 26 天，今日被 stale 关闭，**问题未标记修复** | Bug 仍然存在，建议不要以 stale 关闭替代修复跟踪。建议重新打开并分配至相关模块维护者。 |

---

*本日报由 AI 助手基于 GitHub 公共数据自动生成，数据统计时间为 2026-09-17。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-17

## 今日速览

过去 24 小时 NanoClaw 仓库保持了非常高的开发活跃度：共产生 34 条 PR 更新（其中 9 条已合并/关闭，25 条等待合并），2 条新 Issue，无新版本发布。核心开发团队（@glifocat、@zvi-fried）仍在围绕 Iron Proxy 网关集成、opencode 提供商支持、CI 稳定性加固三条主线高强度推进，多项 PR 互为依赖、形成特性组连续提交。值得关注的是，今日新报告的 2 条 Issue 都指向同一个根因——Bun 1.4.0 的 `spawnSync` 在 CI 中失去子进程退出事件导致轮询循环死锁（oven-sh/bun#34069），该问题已有一条修复 PR（#3841）提交，且维护者反应迅速，当日即works around。项目整体健康度良好，虽无发版但功能迭代和缺陷修复节奏很快。


## 项目进展

今日合并/关闭的 9 条 PR 中，以下 3 条对项目推进有实质意义：

- **#3836 [已关闭] ci(registry-skills): bound the skill test jobs at 20 minutes**（@glifocat）— 将 `registry-skills` 测试任务上限定为 20 分钟，避免 `bun test` 挂起时占用 GitHub runner 长达 6 小时。这是一条重要的 CI 基础设施加固，直接缓解了 #3839 暴露的长时间挂起问题。链接：https://github.com/nanocoai/nanoclaw/pull/3836

- **#3843 [已关闭] fix(iron-proxy): complete WebSocket handshakes and keep upstream framing in the tunnel**（@glifocat）— 修复了 Iron 前端代理的两处问题：WebSocket 握手未完成和上游帧结构在隧道中丢失。该 PR 的目标分支是 `feat/iron-proxy-gateway`，将合入 #3817（Iron Proxy gateway 技能），属于 Iron Proxy 网关功能的内聚性修复。链接：https://github.com/nanocoai/nanoclaw/pull/3843

- **#3824 [已关闭] refactor(gateway): add provider credential connections**（@glifocat）— 添加了共享的凭证连接接口，使 agent 提供商可以描述认证方式而无需拥有网关的管理 API。这是为 #3817 和 #3825 打基础的架构层重构。链接：https://github.com/nanocoai/nanoclaw/pull/3824

**综合判断**：Iron Proxy 网关的落地正在快速推进——从 #3817（新增网关技能）、#3818（设置流程解耦）、#3824（凭证连接抽象）、#3825（OpenCode 通过 Iron 认证）到 #3843（前端代理修复），已形成一个完整的特性组。加上 #3713（per-agent-group delivery mode）和 #3781（tools-only delivery 强化），项目正在实质性地向"多网关、多提供商、可配置投递契约"的架构方向演进。


## 社区热点

今日讨论最活跃的 PR 集中在 WhatsApp 渠道修复（评论数最多，均为 `undefined` 未显示具体数值，但置顶展示说明关注度较高）：

- **#3752 [OPEN] fix(whatsapp): keep every pending question answerable in a chat**（@horsehcj）— 确保聊天中每个待处理问题都可以被回答。创建于 2026-09-09，更新于 2026-09-16，已持续活跃一周。链接：https://github.com/nanocoai/nanoclaw/pull/3752

- **#3751 [OPEN] fix(whatsapp): ignore @newsletter JIDs at the inbound boundary**（@horsehcj）— 在入站边界忽略 @newsletter JID。链接：https://github.com/nanocoai/nanoclaw/pull/3751

这两条 PR 共同指向一个诉求：**WhatsApp 渠道在真实使用场景中的消息边界处理**。前者关注多轮对话中"问题-回答"状态机的完整性，后者关注广播/通讯录型 JID 对入站消息的干扰。同为渠道集成，这两条 PR 与 #2301（add-github 轮询模式）都在扩展 NanoClaw 作为"AI 助手渠道网关"的可用性。

- **#101 [已关闭] Add GitHub integration skill**（@Alakazam03）— 这条创建于 2026-02-06 的 PR 今日被更新/关闭，属于历史遗留 PR 的收尾，但"让 Claude 通过 GitHub 操作仓库"的需求仍然活跃（见 #2301）。链接：https://github.com/nanocoai/nanoclaw/pull/101

**社区诉求分析**：渠道集成（WhatsApp、GitHub）和网关选择（Iron Proxy vs OneCLI）是当前社区讨论的两个最大热点。前者反映真实用户对日常可用性的需求，后者反映部署者对灵活性和安全性的追求。


## Bug 与稳定性

按严重程度排列：

**🔴 严重 — CI 六小时挂起（阻塞性）**

- **#3839 [OPEN] [kind/bug] registry-skills: add-opencode reapply pass hangs in bun test until the 6-hour cancel**（@glifocat）— 核心问题：Bun 1.4.0 的 `spawnSync` 丢失子进程退出事件后以 100% CPU 空转，且对 `bun test` 的 timeout 免疫，导致 CI 任务被 GitHub 6 小时默认上限终止。复现环境：Linux GitHub runner + Bun 1.4.0。链接：https://github.com/nanocoai/nanoclaw/issues/3839
  - **已有修复 PR**：#3841 [OPEN] fix(opencode): run the memory hook with async spawn so bun test cannot wedge（@glifocat），通过将同步 spawn 改为异步解决。链接：https://github.com/nanocoai/nanoclaw/pull/3841

- **#3842 [OPEN] [hardening] upload-trace still runs curl through Bun's spawnSync, which can wedge the poll loop**（@glifocat）— 同一根因的第二处问题：`upload-trace` 仍通过 Bun 的 `spawnSync` 调用 curl，同样可能卡死轮询循环。作者明确指出 #3841 未覆盖该路径。链接：https://github.com/nanocoai/nanoclaw/issues/3842
  - **状态**：尚无修复 PR，但该 Issue 与 #3841 同根同源，预计会由同一维护者处理。

**🟡 中等 — 安装脚本路径缺陷**

- **#3844 [OPEN] fix(setup): replace broken sudo retry with user-owned npm prefix fallback**（@DorZvulun）— `setup.sh` 在 Linux 上通过发行版包管理器安装 Node 时（如 Fedora `dnf`、Debian/Ubuntu `apt`），pnpm 安装的 sudo 重试机制永久失败，报 `EACCES`。该 PR 提议改用用户拥有的 npm prefix 回退方案。链接：https://github.com/nanocoai/nanoclaw/pull/3844

**🟢 低 — 测试稳定性**

- **#3803 [OPEN] test(webhook): recover on the fixture-owned port**（@glifocat）— 测试随机恢复端口可能被占用，导致在无关 PR 运行中出现二次 `EADDRINUSE` 和 `ECONNREFUSED` 失败。链接：https://github.com/nanocoai/nanoclaw/pull/3803

**项目稳定性态势**：Bun 1.4.0 的 `spawnSync` 缺陷是当前最突出的稳定性风险，已知两处受影响代码路径（#3841 fixes、#3842 pending）。维护者反应迅速，当日即提交了修复 PR 和 CI 时限加固（#3836），处置效率较高。

另外，两条较早的 Bug 修复 PR 仍在积压中，未见今日合入迹象：

- **#2681 [OPEN] fix(service): skip linger on per-home-encrypted systems (#2680)**（@glifocat，2026-06-03 创建）
- **#3156 [OPEN] fix(agent-runner): carry channel attachments to providers as structured parts**（@glifocat，2026-07-30 创建）


## 功能请求与路线图信号

结合今日活跃 PR 和已有特性分支，以下功能很可能会纳入下一个版本：

1. **Iron Proxy 网关（高概率，已在推进中）** —— #3817（feat: add Iron Proxy gateway，仍是 OPEN 状态）是该特性组的主干 PR。配合 #3824（credential connections，已合入）、#3825（OpenCode via Iron Proxy）、#3818（setup 中可选择网关）和 #3843（前端代理修复，已合入），Iron Proxy 预计将作为 OneCLI 之外的第二个可选网关在下一版本中推出。链接：https://github.com/nanocoai/nanoclaw/pull/3817

2. **per-agent-group 投递模式配置** —— #3713（feat: record delivery mode）+ #3781（enforce tools-only delivery）共同将"每个 agent group 可配置投递契约"变为现实，解决部分提供商无法稳定发送 final-text envelope 的问题。链接：https://github.com/nanocoai/nanoclaw/pull/3713

3. **渠道扩展** —— 新贡献者 @horsehcj 的 WhatsApp 两条修复（#3751、#3752）已持续活跃一周，说明渠道质量是社区关注的重点方向。

4. **开源协作相关** —— #2301（add-github 轮询模式）已存续 4 个月，但持续被更新（今日仍有活动）。如果合入，将允许 NAT/防火墙后的部署通过轮询方式使用 GitHub 集成，不需要暴露入站端口。链接：https://github.com/nanocoai/nanoclaw/pull/2301


## 用户反馈摘要

由于当前 Issue 和 PR 的评论数均为 0，暂无直接的用户评论可供提炼，但从 Issue 描述和提交记录中可获得的反馈信号包括：

- **CI 稳定性痛点（来自维护者 @glifocat）**：Bun 1.4.0 的 `spawnSync` 挂起问题是实际在 CI 中观察到的严重问题（"traced the six-hour CI hang to Bun's spawnSync"）。维护者遭受了实质性的效率损失，因此连续提交了 3 条相关修复/加固（#3836、#3841、#3842）。

- **真实用户安装场景（来自贡献者 @DorZvulun）**：`setup.sh` 在 Fedora 43 上通过 `dnf install nodejs` 安装的 Node 环境下失败（`npm error code EACCES`），这是 Linux 发行版用户的实际部署痛点，贡献者提供了具体的复现环境。

- **渠道消息边界问题（来自贡献者 @horsehcj）**：WhatsApp 渠道存在两个真实使用问题——newsletter JID 被误当作普通消息处理、聊天中多个待处理问题无法一一回答。这些是渠道接入后真实运行才会暴露的边界情况。

总体而言，目前社区反馈以技术贡献者/维护者的自驱动改进为主，仍处于早期使用者的打磨阶段。


## 待处理积压

以下长期未合并的 PR 值得维护者关注（按创建时间排序）：

- **#2301 [OPEN] feat(add-github): polling mode, git access question, safe OneCLI secret merge**（@ira-at-work）— 创建于 2026-05-06，已存续 4 个多月。为 GitHub 集成增加无端口轮询模式，解决 NAT/防火墙后的部署问题。功能被多次更新，看起来仍在活跃开发，但长期未合入主线。链接：https://github.com/nanocoai/nanoclaw/pull/2301

- **#2634 [OPEN] feat: add add-paws4claws skill**（@ira-at-work）— 创建于 2026-05-28，已存续近 4 个月。为 AWS 凭证代理守护进程添加集成技能。链接：https://github.com/nanocoai/nanoclaw/pull/2634

- **#2681 [OPEN] fix(service): skip linger on per-home-encrypted systems (#2680)**（@glifocat）— 创建于 2026-06-03，修复 per-home 加密系统上的 linger 问题，已被标记且是核心团队成员提交，但等待超过 3 个月。链接：https://github.com/nanocoai/nanoclaw/pull/2681

- **#3196 [OPEN] Fix/add mount readonly**（@teran13）— 创建于 2026-08-07，涉及多个 area（containers/ncl-cli/security/skills/tools），安全相关改动往往需要更仔细的 review。链接：https://github.com/nanocoai/nanoclaw/pull/3196

- **#3156 [OPEN] fix(agent-runner): carry channel attachments to providers as structured parts**（@glifocat）— 创建于 2026-07-30，修复渠道附件传递给提供商的问题，是渠道集成质量的关键改进，等待超过 1 个半月。链接：https://github.com/nanocoai/nanoclaw/pull/3156

---

**日报小结**：NanoClaw 项目今日活跃度极高（34 条 PR 更新），核心团队正集中火力推进 Iron Proxy 网关、opencode 认证增强和 CI 稳定性加固。Bun spawnSync 挂起问题是当前最紧迫的技术债，修复进展良好。长期积压的渠道类 PR（WhatsApp、GitHub）值得留意，若能在后续版本统一收口，项目的渠道生态完整度将明显提升。整体项目健康度：**良好**，无阻塞性事故，有明确的技术演进主线。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-17

---

## 今日速览

过去24小时项目主要以**历史积压清理**为主：9条旧Issue和15条stale PR被统一关闭，全部为2026年3月底创建、此后长期未更新的条目。与此同时，**3条全新PR（#2688、#2689、#2690）在24小时内完成合并**，集中在OpenClaw网关修复与稳定性加固上，说明项目核心开发仍在持续推进。整体活跃度中等，但健康度良好——既有自动化清理机制运转正常，也有实质性代码更新落地。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日合并的3条核心PR均聚焦OpenClaw集成层的稳定性和可恢复性：

| PR | 内容 | 影响 |
|---|---|---|
| [#2690](https://github.com/netease-youdao/LobsterAI/pull/2690) | 按阶段跟踪修复失败（preparation/snapshot/doctor/configuration/gateway），失败时可从修复前快照回滚；提取共享错误消息解析逻辑到`openclawRepair.ts`，并新增对应UI状态 | 快速修复（Quick Repair）从"黑盒"变为可分阶段诊断、可回滚 |
| [#2689](https://github.com/netease-youdao/LobsterAI/pull/2689) | 在启动修复前增加兼容模式：先备份并迁移OpenClaw SQLite状态schema，使legacy配置迁移不再依赖格式良好、可读的配置文件 | 解决了配置损坏时无法启动修复的"先有鸡还是先有蛋"问题 |
| [#2688](https://github.com/netease-youdao/LobsterAI/pull/2688) | 让托管provider（`lobsterai-server`代理）豁免OpenClaw凭证冷却机制，上游模型认证/计费故障不再导致共享代理凭据被禁用5小时 | 提升多模型场景下的可用性，避免单点故障波及全局 |

**项目整体向前推进方向**：OpenClaw网关的**自愈能力**（#2689/#2690）和**多provider模型调用的可靠性**（#2688）是当前优化的重点。

---

## 社区热点

今日所有Issue和PR均已关闭，整体讨论热度不高（评论数2-3条）。相对讨论最集中的是：

- **[#1112 表格Table顶部和底部有不明意义的留白](https://github.com/netease-youdao/LobsterAI/issues/1112)**（3条评论）：UI细节问题，附带截图对比，已由[#1122](https://github.com/netease-youdao/LobsterAI/pull/1122)修复。

其余Issue评论均为2条，其中值得关注的是三个并发/竞态类Bug的报告（[#1099](https://github.com/netease-youdao/LobsterAI/issues/1099)、[#1105](https://github.com/netease-youdao/LobsterAI/issues/1105)、[#1107](https://github.com/netease-youdao/LobsterAI/issues/1107)），均由同一开发者（@MaoQianTu）提交且每条都附带详细的分析与修复PR，显示出社区中已有**深度技术用户**在主动贡献质量较高的Bug报告和代码修复。

---

## Bug 与稳定性

今日关闭的Bug类Issue共7条，严重程度分类如下：

### 高严重度（并发/数据一致性问题，均已有修复PR）

| Issue | 问题 | 修复PR |
|---|---|---|
| [#1099](https://github.com/netease-youdao/LobsterAI/issues/1099) | IM消息并发处理导致重复会话创建和消息响应丢失 | [#1100](https://github.com/netease-youdao/LobsterAI/pull/1100) ✅ |
| [#1107](https://github.com/netease-youdao/LobsterAI/issues/1107) | 定时任务`pollOnce()`无重入保护，停止轮询后仍发送幽灵事件 | [#1108](https://github.com/netease-youdao/LobsterAI/pull/1108) ✅ |
| [#1090](https://github.com/netease-youdao/LobsterAI/pull/1090) | CoworkRunner并发调用导致流式消息损坏和消息重复 | 此PR本身即为修复（Closes #1089） ✅ |

### 中严重度（功能异常，均有修复PR）

| Issue | 问题 | 修复PR |
|---|---|---|
| [#1096](https://github.com/netease-youdao/LobsterAI/issues/1096) | md转pdf时调用了在线服务，打开多个浏览器页面且结果中带会员框 | 无独立PR记录 |
| [#1105](https://github.com/netease-youdao/LobsterAI/issues/1105) | 钉钉定时任务通知因conversationId带前缀无法送达 | [#1106](https://github.com/netease-youdao/LobsterAI/pull/1106) ✅ |
| [#1101](https://github.com/netease-youdao/LobsterAI/pull/1101) | 跨provider切换模型后立即发消息报错（gateway重启竞态） | 此PR本身即为修复 ✅ |

### 低严重度（UI/体验问题）

| Issue | 问题 | 修复PR |
|---|---|---|
| [#1112](https://github.com/netease-youdao/LobsterAI/issues/1112) | 表格上下留白 | [#1122](https://github.com/netease-youdao/LobsterAI/pull/1122) ✅ |
| [#1124](https://github.com/netease-youdao/LobsterAI/issues/1124) | 退出登录后安装最新版仍弹"Lobster AI无法关闭" | 无 |
| [#1139](https://github.com/netease-youdao/LobsterAI/issues/1139) | 新建重名agent后任务记录未刷新，需切换后再切回 | 无 |

> 注：今日关闭的Issue全部打上了`stale`标记，且没有新增Issue。其中#1112、#1096等UI类Bug虽然已有关闭的修复PR，但用户侧是否已验证修复效果，建议维护者确认。

---

## 功能请求与路线图信号

今日关闭的功能类Issue/PR共5条，均在3月底提出并有对应实现：

| 功能请求 | 对应PR | 状态 |
|---|---|---|
| [#1117 工具权限弹窗支持键盘快捷键](https://github.com/netease-youdao/LobsterAI/issues/1117)（Enter确认/Escape拒绝） | [#1119](https://github.com/netease-youdao/LobsterAI/pull/1119) | 已合并 ✅ |
| [#1120 会话出错后一键Retry重发最后一条消息](https://github.com/netease-youdao/LobsterAI/issues/1120) | [#1121](https://github.com/netease-youdao/LobsterAI/pull/1121) | 已合并 ✅ |
| [#1125 会话内容全文搜索与关键词高亮](https://github.com/netease-youdao/LobsterAI/pull/1125) | 此PR本身 | 已合并 ✅ |
| [#1138 工具错误高亮与跳转最新按钮](https://github.com/netease-youdao/LobsterAI/pull/1138) | 此PR本身 | 已合并 ✅ |
| [#1103 Docker sandbox就绪探测与状态UI](https://github.com/netease-youdao/LobsterAI/pull/1103) | 此PR本身 | 已合并 ✅ |

**路线图信号**：这批功能请求体现出用户对**键盘驱动工作流**（快捷键、Retry）、**会话内容检索**（全文搜索）和**错误可见性**的强烈需求。其中快捷键、Retry、全文搜索均已实现并合并，极有可能在下一版本中与用户见面。

---

## 用户反馈摘要

从今日关闭的Issue评论中可提炼以下用户痛点：

1. **并发场景可靠性问题**（来自@MaoQianTu）：同一IM会话快速连发多条消息时会出现重复会话、消息丢失；定时任务轮询在停止后仍发"幽灵事件"。说明**IM集成在真实高频使用下存在稳定性缺口**，这是企业/团队场景的关键路径。

2. **流式输出损坏**（[#1090](https://github.com/netease-youdao/LobsterAI/pull/1090)）：用户反馈流式消息在并发调用时出现损坏和重复，直接影响到核心对话体验。

3. **模型切换后的竞态**（[#1101](https://github.com/netease-youdao/LobsterAI/pull/1101)）：跨provider切换后立即发消息可能失败，说明配置变更的异步完成时机对用户不够透明。

4. **搜索结果局限**（[#1125](https://github.com/netease-youdao/LobsterAI/pull/1125)）：原搜索只能匹配会话标题，历史会话多了之后"找不到内容"成为痛点。

5. **操作被打断**（[#1117](https://github.com/netease-youdao/LobsterAI/issues/1117)）：工具权限弹窗强制鼠标操作，打断了"键盘驱动编码流"。

6. **错误恢复路径缺失**（[#1120](https://github.com/netease-youdao/LobsterAI/issues/1120)）：会话出错后只能手动复制内容新建会话，用户明确表示"完全没有恢复路径"。

**总体评价**：用户对项目的功能覆盖度认可度较高（实际在使用IM、定时任务、agent管理等功能并发现深层问题），但对**高频使用场景下的稳定性和效率细节**有明确期待。

---

## 待处理积压

从数据来看，今日关闭的Issue/PR均非长期未响应——它们是stale机器人自动清理的产物。但需要特别留意的是：

- **[#1124](https://github.com/netease-youdao/LobsterAI/issues/1124)（安装时弹"Lobster AI无法关闭"）**：属于安装器/卸载流程相关问题，此类问题影响用户升级路径，但未看到对应的修复PR。虽然Issue被stale关闭，问题本身可能仍然存在，建议维护者确认是否已通过其他渠道修复。
- **[#1139](https://github.com/netease-youdao/LobsterAI/issues/1139)（重名agent任务记录不刷新）**：涉及状态同步/刷新逻辑，同样无修复PR记录。
- **[#1096](https://github.com/netease-youdao/LobsterAI/issues/1096)（md转pdf在线服务问题）**：涉及第三方在线服务依赖，建议评估是否替换为本地转换方案。

> ⚠️ **维护者提醒**：stale机器人关闭Issue时会标记为`[stale]`并自动关闭，但这并不等于问题已解决。上述无修复PR关联的4条Issue（#1096、#1124、#1139及未列出的其他stale条目）建议人工复核一遍，确认是已在其他分支/版本修复、还是仍然存在——若仍存在，可考虑重新打开并排期处理。

---

*本日报基于LobsterAI GitHub仓库2026年9月16日至17日公开数据生成，仅供项目健康度参考。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-17

## 1. 今日速览
- 过去24小时项目更新量适中：2条Issue（1新开、1关闭）、3条PR（1关闭/合并、2待审核），无新版本发布。
- 核心事件是长期PR #926 正式关闭/合并，为Moltis带来5个新斜杠命令，交互维度有所扩展。
- Sandbox安全与构建效率方面，两条PR（#1272、#1270）正在等待审核，方向明确但尚未合入。
- 新Issue #1271暴露了远程MCP server的容错缺口（启动失败不重试、会话丢失后调用全部失败），是当前最需要关注的技术债信号。
- 整体评估：项目健康度中等偏上，功能迭代活跃，但PR审查周期偏长可能成为交付瓶颈。

## 2. 版本发布
无。

## 3. 项目进展
- [PR #926 已关闭/合并：feat: add /btw, /fast, /insights, /steer, /queue commands and auxiliary model config](https://github.com/moltis-org/moltis/pull/926)  
  一次引入5个斜杠命令：`/btw`（临时旁路提问，直接LLM调用，不污染会话）、`/fast`、`/insights`、`/steer`、`/queue`，并新增辅助模型配置骨架。该PR自2026-04-29开启，历经近5个月后关闭，说明功能从设计到落地周期较长，也反映维护者带宽有限。合并后Moltis的交互控制力明显增强，尤其`/btw`适合不打断主会话的快速问题。

## 4. 社区热点
- [Issue #1246 [已关闭]：can't run on sandbox after a node is added](https://github.com/moltis-org/moltis/issues/1246)  
  过去24小时唯一有评论（1条）的Issue，已于今日关闭。用户反馈在sandbox环境中添加节点后无法运行，问题得到解决或结案。该Issue反映了多节点与sandbox结合使用是用户的真实高频场景。

其余Issue/PR评论数均为0，社区讨论热度不高，当前处于功能开发与贡献集中期，而非大规模用户反馈期。

## 5. Bug 与稳定性
- [Issue #1271 [OPEN，严重程度：高]：A remote MCP server that fails at startup is never retried, and a lost session ends every later call](https://github.com/moltis-org/moltis/issues/1271)  
  作者报告了两个相互关联的健壮性问题：  
  1. `McpManager::start_enabled`在MCP server启动失败后直接记录日志并放弃，`mcp_health.rs`健康监控只在状态变化时重启，因此“启动即失败”的server永远不会被重试；  
  2. 如果一次会话丢失，之后所有调用都会失败，没有恢复机制。  
  该问题影响远程MCP服务的可用性，目前无关联fix PR，建议维护者优先响应。

- [Issue #1246 [已关闭]：sandbox添加节点后无法运行](https://github.com/moltis-org/moltis/issues/1246)  
  已关闭，但关闭原因（修复、重复还是放弃）需结合上下文确认。作为已解决或已受理的sandbox类问题，可归类为稳定性闭环之一。

## 6. 功能请求与路线图信号
- [PR #1272 [OPEN]：feat(sandbox): per-agent mounts, run_as and a forced sandbox](https://github.com/moltis-org/moltis/pull/1272)  
  为每个agent预设提供独立的`[sandbox]`配置：`mounts`（额外host绑定挂载）、`run_as`（容器运行uid:gid）、`force`（强制禁止该agent在sandbox外运行）。这释放了sandbox配置从“全局粗粒度”走向“per-agent精细控制”的信号，与多agent/多租户场景强相关，很可能被纳入下一版本。

- [PR #1270 [OPEN]：feat(build): cache cargo across image builds, and script building the image](https://github.com/moltis-org/moltis/pull/1270)  
  使用BuildKit缓存挂载解决“每次镜像构建都全量重编译依赖”的问题。虽然偏基础设施，但直接关系CI速度和开发者体验，属于影响工程效率的路线图级改进。

- Issue #1271虽为bug报告，但隐含了“MCP连接生命周期管理”的功能诉求：启动失败重试、会话自动恢复。预计将推动`crates/gateway/src/mcp_health.rs`健康监控逻辑的增强。

## 7. 用户反馈摘要
- [Issue #1246](https://github.com/moltis-org/moltis/issues/1246) 的用户反馈显示：在使用Moltis的sandbox功能时，增加一个节点后整个环境无法运行。这暴露出“多节点 + sandbox”组合场景的边际条件验证不足；该问题关闭后，用户的该路径应已恢复。
- 目前仅有1条评论可供挖掘，缺少更深入的用户情感数据。从现有信息看，用户对Moltis的sandbox与MCP远程连接能力有实际依赖，且对稳定性问题较为敏感。

## 8. 待处理积压
- [PR #1270：cache cargo across image builds](https://github.com/moltis-org/moltis/pull/1270) 已等待1天以上，尚无review；构建缓存优化对日常开发效率影响明显，建议尽快审核。
- [PR #1272：per-agent mounts, run_as and forced sandbox](https://github.com/moltis-org/moltis/pull/1272) 涉及沙箱安全边界，需要仔细审查，建议安排安全方向维护者跟进。
- [Issue #1271：远程MCP server启动失败不重试 + 会话丢失后所有调用失败](https://github.com/moltis-org/moltis/issues/1271) 今日新开、零回复，属于高影响稳定性问题，希望尽快确认并指派处理。
- 长期未关闭的PR #926耗时近5个月才合并，提示项目PR审查队列可能存在积压。建议维护者关注开放PR的年龄分布，避免大特性长期阻塞后续迭代。

---
**数据来源**：Moltis GitHub 仓库（github.com/moltis-org/moltis），统计窗口为 2026-09-16 过去24小时。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-17

> 数据来源：github.com/agentscope-ai/CoPaw（数据文件标注为 QwenPaw，日报内容以数据为准）

---

## 1. 今日速览

过去 24 小时项目活跃度较高：25 条 Issue 更新（新开/活跃 14 条、关闭 11 条），37 条 PR 更新（待合并 24 条、合并/关闭 13 条），无新版本发布。社区讨论热度集中在多租户 Hub 路线图（#7318，29 条评论）与 spawn subAgent 全量超时故障（#7678，9 条评论）。稳定性问题是当前社区关注重点：内存耗尽复合路径（#7722）、Console SSE 流冻结（#7813/#7814/#7815）等均在 24 小时内被详细报告并附带修复建议。值得关注的是，今日合并的 PR 覆盖 WebUI 适配、统一工作台外壳、shell 安全默认收紧等多个方向，项目整体处于功能迭代与稳定性加固并行的阶段，新贡献者（first-time-contributor）提交占比不低，社区参与度良好。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日合并/关闭的重要 PR 共 5 个，覆盖控制台体验、WebUI 适配、安全默认值与插件生态：

- **[#7382] feat(chat): adapt AgentScopeRuntimeWebUI 1.2 and stabilize queues**（已合并）  
  适配 AgentScopeRuntimeWebUI 1.2，修复从空白会话发送首条消息后切换页面被拉回、自定义取消导致 SSE 提前中断等竞态问题。  
  https://github.com/agentscope-ai/CoPaw/pull/7382

- **[#7790] feat(console): add unified chat workbench shell**（已合并）  
  引入会话级可调整宽度的右侧工作台外壳——Files、Changes、Terminal、Tools 按需打开，以可关闭标签页取代固定能力栏，在小屏幕上释放聊天区空间。  
  https://github.com/agentscope-ai/CoPaw/pull/7790

- **[#4171] feat: add memory-distill tool plugin with title-diffing distillation engine**（已合并）  
  新增记忆蒸馏工具插件，采用标题差异比对引擎从日常笔记中识别新信息，宣称约 92% 噪音消减。  
  https://github.com/agentscope-ai/CoPaw/pull/4171

- **[#7120] security: enable shell evasion checks by default + regression test**（已合并）  
  将全部 7 项 shell 逃逸检测（命令替换、混淆参数、反斜杠转义空白等）从默认关闭翻转为默认开启，并补充回归测试，收紧默认安全基线。  
  https://github.com/agentscope-ai/CoPaw/pull/7120

- **[#7783] fix(ACP): Improves the experience of delegating work to external ACP runners**（已合并）  
  修复 ACP 外部 runner 委派中文本重复/碎片化的问题（增量 delta 与 finish_prompt 全文重复投递），并改进交互体验。  
  https://github.com/agentscope-ai/CoPaw/pull/7783

此外，[#7779]（Hub 模型网关、成员治理与用量面板）仍在开放中，与 #7318 的多租户 Hub 讨论直接呼应，值得关注。

---

## 4. 社区热点

- **[#7318] [Discussion] QwenPaw Hub 多租户版将于 2.2.0 推出：你希望我们接下来做什么？**（29 条评论，👍 4）  
  作者 @rayrayraykk 发起，回应社区长期对团队化运行的需求。讨论围绕 Hub 多租户能力展开，是近期社区参与度最高的路线图讨论。  
  https://github.com/agentscope-ai/CoPaw/issues/7318

- **[#7678] [Bug] spawn subAgent 任务全部超时失败**（9 条评论）  
  用户报告 Windows 2.2.0 中 spawn subAgent 后所有任务必然超时，即便将 timeout 调至极长仍无效；用户附上了自行调用 AI 调试的日志分析过程，足见排查耗时。  
  https://github.com/agentscope-ai/CoPaw/issues/7678

- **[#6318] [Feature] 支持按 conversation 级别指定模型**（7 条评论）  
  用户希望在 agent 默认模型基础上，允许为单个对话指定不同模型。该诉求在评论区持续活跃，属于高频工作流需求。  
  https://github.com/agentscope-ai/CoPaw/issues/6318

**诉求分析**：三条高热度议题分别指向团队化部署（Hub）、核心 Agent 运行稳定性（subAgent 超时）与模型路由灵活性——三者恰好构成"多用户、可靠执行、精细控制"三个维度的社区核心期待。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 严重 | [#7722] Memory exhaustion compounds through three paths | 容器内存以约 1MB/s 速率耗尽直至 OOM：无界流缓冲区、keep-alive 实例堆积、doom-loop 门控绕过三条路径叠加。附可控复现与最小修复方案 | 开放，已有修复 PR [#7808] |
| 🔴 严重 | [#7678] spawn subAgent 全部超时失败 | Windows 2.2.0 中 spawn subAgent 必然超时，调长 timeout 无效 | 开放，暂无 fix PR |
| 🟠 重要 | [#7815] Console 懒加载页面失败后无法恢复 | 失败后所有导航停留在错误页，必须整页刷新；重试机制无法成功 | 开放 |
| 🟠 重要 | [#7813] SSE 帧载荷为 null 字面量时流冻结 | 单个畸形 SSE 帧（裸 null）即可终止整个流式回合，异常只被记录不终止响应 | 开放 |
| 🟠 重要 | [#7814] `_strip_event_headlines` 可输出裸 null；stream_one 失败时无终止事件 | Console SSE 路径两处健壮性缺口 | 开放 |
| 🟠 重要 | [#7792] WeChat 音视频附件变成 file:// URL 发送到 API 报 400 | 微信/企微通道媒体附件经 tool_result 后以 file:// 裸传 OpenAI 兼容端点，被上游拒绝 | 开放 |
| 🟠 重要 | [#7817] 飞书 p2p 发消息报 230101 及文件事件缺失 | 飞书自建机器人 p2p 场景不接受 open_id 作为 receive_id；文件事件未被框架处理 | 开放，含根

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-09-17

## 1. 今日速览

EasyClaw 项目今日处于低社区活跃、高开发输出的状态。过去 24 小时**无新开 Issue、无新开 PR、无关闭/合并记录**，社区侧处于静默窗口期；但开发侧**连续发布两个版本**（v1.9.17 → v1.9.18），表明主分支仍在稳定迭代中。v1.9.18 聚焦卖家批量运营效率（模板说明与数据保护），v1.9.17 则侧重于富媒体知识库与后端连接稳定性，两者均属于生产环境的实用改进而非重构性变更。整体活跃度评估为 **中等**——开发动作频率较高，社区互动暂缓。项目健康度良好，无回归信号。

---

## 2. 版本发布

### v1.9.18 — 批量模板用户体验与数据保护

> 发布链接：[GitHub Releases v1.9.18](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.18)

**新增特性：**

- **Creator 批量更新模板增强**：下载模板时，每个列均附带悬停说明注释；新增本地化 Instructions 工作表，包含填表示例，帮助卖家理解字段含义。
- **数据守卫下拉菜单**：模板中的保护操作列仅接受 `Protect` 或 `Unprotect` 两个值，防止误输入；手动标签列仅接受该卖家自己的已有标签，降低数据污染风险。

**破坏性变更：** 无。该版本为增强性更新，不改变现有 API 或数据结构，但模板格式本身已更新——建议已保存的旧版模板在 v1.9.18 下重新下载以获得下拉校验功能。

**迁移注意事项：** 团队内部使用的历史批量模板，在升级后首次上传时若包含非法保护值或非自有标签，将被模板校验拒绝，属预期行为，需提前同步相关操作人员。

### v1.9.17 — 富媒体知识库与连接稳定性

> 发布链接：[GitHub Releases v1.9.17](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.17)

**新增特性：**

- **Product Knowledge 富媒体支持**：可上传图片和视频至产品知识库；支持粘贴 Markdown 并实时渲染为格式化内容；新增多 SKU 产品的紧凑型媒体卡编辑器，便于集中管理同一产品的多样媒体资产。
- **后端订阅连接稳定性修复**：常规 token 刷新期间，后端订阅现在保持连接不断开，避免买家消息在短暂的重新连接窗口期丢失。

**破坏性变更：** 无。媒体卡编辑器是新增交互组件，不影响既有数据模型。

**迁移注意事项：** 因 token 刷新逻辑有改动，升级该版本后建议观察后台日志中订阅重连相关记录，确认一切正常运行。富媒体知识库功能需前端配合，若为自托管部署，请同时更新前端静态资源。

---

## 3. 项目进展

过去 24 小时无独立 PR 被合并或关闭，项目进展全部体现在上述两个 Release 中：

- **卖家运营体验**：v1.9.18 的模板说明与校验机制，直接降低了批量操作时的学习成本和错误概率，属于对高频操作路径的实质优化。
- **内容管理能力**：v1.9.17 将 Product Knowledge 从纯文本/链接扩展至富媒体层，使多 SKU 产品的展示和维护更加直观，为后续商品内容营销场景打下基础。
- **通信可靠性**：v1.9.17 修复了 token 刷新窗口期的消息断连问题，这是面向买家消息实时性场景的关键稳定性补强。

综合来看，项目在“创作者工具链”和“实时通信可靠性”两个维度上各前进了一步，均为增量式进步，无大规模架构调整。

---

## 4. 社区热点

今日无活跃讨论的 Issue 或 PR。这可能是由于近期版本发布吸收了主要反馈，且部分用户正处于升级验证阶段。

社区注意力目前主要集中于 [Releases 页面](https://github.com/gaoyangz77/easyclaw/releases) 的更新说明区域，建议维护者关注两个版本的下载量和评论动态——特别是 v1.9.18 的模板校验机制是否在企业用户中引起适配问题。

---

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归。作为参考，v1.9.17 版本更新说明中明确提及修复了“token 刷新期间买家消息丢失”的问题，该问题属于消息链路稳定性缺陷，影响实时业务，现已修复并随 v1.9.17 发布。没有关联的 fix PR 需要额外跟踪。

当前项目处于稳定状态，无已知待处理的高优先级缺陷。

---

## 6. 功能请求与路线图信号

今无新功能请求提交。基于最近两个发布版本的内容，可以提炼以下路线图信号：

- **批量运营工具深度优化**：v1.9.18 对 Template 的详细说明和数据校验，表明项目正从“功能完备”向“防错可用”演进，未来可能进一步扩展模板自动化能力（如自动映射类目、批量校验图片规格）。
- **知识库富媒体化**：v1.9.17 对 Product Knowledge 的图片/视频支持，暗示项目将产品资料管理视为核心场景，后续版本很可能继续强化媒体资产的版本管理、检索和跨平台分发。
- **实时通信稳定性**：针对 token 刷新窗口期的修复，说明开发团队对消息零丢失有明确要求，后续可能有更多围绕连接生命周期、断线重连策略的优化。

这些信号均未在 v1.9.18 中完全展开，预计会在下一阶段版本中继续延伸。

---

## 7. 用户反馈摘要

由于今日无 Issues 讨论，无法提供直接引用，但可从更新说明中推断：

- **模板易用性诉求**：新增的“列悬停说明 + 本地化 Instructions 示例”表明此前存在用户对模板字段含义不清楚的情况，尤其面向多语言团队时问题更突出——改进方向是降低新手理解成本。
- **对输入错误的防护需求**：新增下拉校验，说明用户在使用手动标签或保护操作时出现过误输入，导致批量任务失败或数据污染。
- **买家消息断连痛点**：v1.9.17 专门修复 token 刷新窗口期的消息丢失，意味着已有用户在实际运营中注意到该问题并推动了修复，现实场景为高频 token 刷新下的持续在线客服或自动回复。

建议维护者在接下来的版本说明中，就这些修复增加“用户影响”描述，便于社区确认问题是否已被解决。

---

## 8. 待处理积压

今日无长期未响应的 Issue 或 PR。当前积压为 0，维护响应及时。为保持健康度，建议维护者：

- 在未来一周密切关注 v1.9.18 模板校验机制上线后的新 Issue 反馈，尤其是下拉校验在批量场景下是否出现误拦截。
- 若 v1.9.17 的富媒体功能引发新的前端兼容性问题（如旧浏览器不支持媒体卡编辑器），建议提前准备 hotfix 路径。

> 项目整体仓库：[https://github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)

---

**报告日期**：2026-09-17  
**数据范围**：2026-09-16 至 2026-09-17 UTC  
**数据来源**：GitHub Issues / Pull Requests / Releases API

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*