# OpenClaw 生态日报 2026-09-24

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-24 02:05 UTC

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

# OpenClaw 项目动态日报 — 2026-09-24

## 1. 今日速览

过去24小时项目更新量处于极高水平：**500条 Issue 更新**（新开/活跃 460，关闭 40）、**500条 PR 更新**（待合并 392，已合并/关闭 108）。但社区活跃度主要集中于**稳定性问题的集中爆发**：**v2026.9.6 macOS 应用因启动崩溃已被撤回**，与此同时多个 P0 级问题（Gateway 内存泄漏、启动挂起/超时、更新失败、Windows 计划任务配置缺陷）仍在持续发酵。392条 PR 待合并也显示维护者评审积压较重，但已出现针对 macOS 崩溃的热修复 PR（#156881），说明维护团队正在优先响应。整体来看，项目处于**高活跃、高压力**的状态，稳定性是当前最大挑战。

---

## 2. 版本发布

### v2026.9.6（已撤回）

> **⚠️ macOS 应用请勿更新至 2026.9.6**。该版本 macOS 应用在应用内更新后可能每次启动均崩溃（#156861），已从 Sparkle 更新源撤回；2026.9.7 Mac 热修复正在开发中。如果应用已无法启动，请重新安装 2026.9.5 macOS 构建。

- **发布链接**: https://github.com/openclaw/openclaw/releases
- **关联 Issue**: #156861 — [fix(macos): update to 2026.9.6 leaves OpenClaw completely unlaunchable on both Macs](https://github.com/openclaw/openclaw/issues/156861)
- **修复 PR**: [#156881 fix(macos): prevent launch aborts from async sleep frames](https://github.com/openclaw/openclaw/pull/156881)（P0，已提交，处于 preflight 验证阶段）
- **迁移注意**: 已升级并遇到启动崩溃的用户需手动降级至 2026.9.5；此前版本（2026.9.4/2026.9.5）升级至 2026.9.6 的用户均受影响。

---

## 3. 项目进展

今日无大规模功能合并，但以下 PR 反映了项目在**发布流程规范、UI 细节、长期遗留问题**上的持续推进：

| PR | 状态 | 内容 |
|---|---|---|
| [#156811 fix(release): require Gateway and Telegram validation](https://github.com/openclaw/openclaw/pull/156811) | **CLOSED (已合并)** | 修复发布验证流程漏洞：操作员通道豁免不再能绕过失败的测试通道，且 Windows/macOS Gateway 安装和升级覆盖成为强制验证项。 |
| [#151138 fix(agents): stage inline tool images so history shows them](https://github.com/openclaw/openclaw/pull/151138) | **CLOSED** | 修复内联工具图片因隐私数据清理导致历史记录中显示“Omitted from history”占位的问题，历史回放现在能正确显示图片。 |
| [#156921 fix(ui): remove blank space from nested tool groups](https://github.com/openclaw/openclaw/pull/156921) | OPEN（待评审） | 修复 Web UI 中嵌套工具调用组折叠时出现大面积空白的问题。 |
| [#156832 refactor(feishu): deslop Feishu](https://github.com/openclaw/openclaw/pull/156832) | OPEN（待评审） | 对飞书插件进行大规模重构，消除工具注册、客户端准入、CardKit 请求、回复投递逻辑的重复实现，提高传输行为一致性。 |
| [#156859 refactor: retire pre-June config and upgrade test support](https://github.com/openclaw/openclaw/pull/156859) | OPEN（P0，待作者） | 移除 650 行 6 月之前的配置迁移和升级验证支持代码，精简代码库。 |

**总体趋势**：项目正在通过重构清理技术债（飞书插件、旧配置迁移）、强化发布验证流程，并持续修复 Web UI 细节；但今日无重大用户可见功能落地，精力集中在稳定性修复和内部治理。

---

## 4. 社区热点

今日讨论最活跃的 Issue 集中在**内存泄漏、多代理会话失控、回复丢失**三大问题上：

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#91588 Gateway 内存泄漏：RSS 从 350MB 涨至 15.5GB，导致 OOM 崩溃](https://github.com/openclaw/openclaw/issues/91588) | 39 | P0 级稳定性问题，运营 2-3 天后必然 OOM，用户希望尽快定位泄漏源并热修复。 |
| [#126360 AgentSelectionRequiredError 刷屏日志：日志插件、Control UI 全局 RPC、系统代理回合均缺 agentId](https://github.com/openclaw/openclaw/issues/126360) | 19 | 多代理显式所有权模式下，内部组件未正确传递 agentId 目标，导致系统试图处理消息时持续报错。 |
| [#80319 QA 工具默认套件混淆 Codex 原生工具与 OpenClaw 动态工具对齐](https://github.com/openclaw/openclaw/issues/80319) | 17 | 测试框架误报工具丢失，实际为 QA harness 问题，但也暴露出 Codex 与 OpenClaw 工具体系的一致性风险。 |
| [#148707 回复丢失：当第二次运行抢占同会话进行中的回合时，报 “Reply operation has no active tool authority snapshot”（2026.9.4 回归）](https://github.com/openclaw/openclaw/issues/148707) | 16 | 9.4 新引入的会话回归，交互回合被抢占后回复完全丢失且无重试，严重损害用户信任。 |
| [#152981 Gateway 启动挂起 ~17 分钟：模型运行时发布超时（Windows）](https://github.com/openclaw/openclaw/issues/152981) | 15 | 2026.9.5 的 Windows 回归，多代理配置下启动阶段卡死，阻断正常使用。 |

**分析**：社区最集中的声音是——“我们理解功能开发节奏，但请先保证现有环境稳定可运行”。内存泄漏、OOM、回复丢失、启动挂起这些问题的共同特征是**在真实生产环境中频繁触发且后果严重**，用户期望维护者将资源倾斜到这些高影响回归上。

---

## 5. Bug 与稳定性

按严重程度排列（P0 → P1 → P2），重点标注是否已有修复 PR：

### 🔴 P0 级

| Issue | 问题 | 状态 |
|---|---|---|
| [#156861 macOS 更新至 2026.9.6 后完全无法启动](https://github.com/openclaw/openclaw/issues/156861) | macOS 应用每次启动即崩溃，已从更新源撤回 | ✅ 修复 PR #156881 已提交（preflight 验证中） |
| [#91588 Gateway 内存泄漏导致 OOM 崩溃](https://github.com/openclaw/openclaw/issues/91588) | RSS 从 350MB 涨至 15.5GB，2-3 天后进程被杀，触发 launchd 重启循环 | ⚠️ 无新修复 PR（标签 no-new-fix-pr，需维护者评审） |
| [#152981 Gateway 启动挂起 ~17 分钟，模型运行时发布超时](https://github.com/openclaw/openclaw/issues/152981) | 2026.9.5 回归，Windows 多代理配置下启动失败 | ⚠️ 无新修复 PR |
| [#156712 openclaw triage 子进程不退出，持有 gateway-lifecycle 锁，阻止应用重启](https://github.com/openclaw/openclaw/issues/156712) | 修复子进程残留导致完全无法重启 | ⚠️ 需实机复现（manual-only） |
| [#146887 2026.9.3 → 2026.9.4 更新失败（四阶段全部失败）](https://github.com/openclaw/openclaw/issues/146887) | stdio MCP 超时崩溃候选 doctor、lint 硬门禁、托管服务恢复失败 | ⚠️ 无新修复 PR |
| [#152935 2026.9.4 → 2026.9.5 容器升级后所有 agent schema 19 被拒](https://github.com/openclaw/openclaw/issues/152935) | 需要离线 Doctor 手动迁移数据库 | ⚠️ 无新修复 PR |
| [#156674 2026.9.5 macOS Gateway 资源耗尽，Codex workers 长期存活](https://github.com/openclaw/openclaw/issues/156674) | 8GiB VM 上 CPU/内存耗尽，停止 gateway 后系统才恢复响应 | ⚠️ 无新修复 PR |

### 🟠 P1 级

| Issue | 问题 | 状态 |
|---|---|---|
| [#148707 回复丢失（2026.9.4 回归）](https://github.com/openclaw/openclaw/issues/148707) | 回合被抢占后回复丢失，无重试无补偿 | ⚠️ 标签 needs-info，无新修复 PR |
| [#140010 Windows 睡眠恢复后 UI/WebSocket 重连失败 30-60s+](https://github.com/openclaw/openclaw/issues/140010) | 冻结恢复被繁忙的 Gateway 事件循环阻塞 | ⚠️ 无新修复 PR，需要产品决策 |
| [#121617 压缩后 “Already compacted” 误判为终端失败](https://github.com/openclaw/openclaw/issues/121617) | 同回合内需要二次压缩时被错误阻断 | ⚠️ 有 PR 关联（linked-pr-open） |
| [#128067 beta.7 六类可靠性缺陷汇总](https://github.com/openclaw/openclaw/issues/128067) | 持久化、投递、重启恢复等六大类问题 | ⚠️ 无新修复 PR |
| [#128140 memory_search 工具总是 15 秒超时，但 CLI 正常](https://github.com/openclaw/openclaw/issues/128140) | 工具调用与 CLI 表现不一致 | ⚠️ 无新修复 PR |
| [#138272 Android Talk 网关中继在任务回合掉线](https://github.com/openclaw/openclaw/issues/138272) | 跨三个版本均存在，负责任务时必现 | ⚠️ 需实机复现 |
| [#121661 CLI 子代理 announce-wake 回合无工具运行，模型伪造工具调用](https://github.com/openclaw/openclaw/issues/121661) | 安全/行为缺陷，需产品决策+安全评审 | ⚠️ 无新修复 PR |
| [#123354 Matrix E2EE 在 Megolm 会话轮换后停止解密](https://github.com/openclaw/openclaw/issues/123354) | 仅影响轮换后的设备，其他设备正常 | ⚠️ 无新修复 PR |

### 🟡 P2 级（部分）

| Issue | 问题 | 状态 |
|---|---|---|
| [#146860 Windows 计划任务 LogonType InteractiveToken 更新永久卡住](https://github.com/openclaw/openclaw/issues/146860) | 更新 activate 阶段无限等待，最终 abandoned | ⚠️ 无新修复 PR |
| [#140129 Anthropic 缓存固定在 ~46k，长期会话完整重写历史](https://github.com/openclaw/openclaw/issues/140129) | 2026.9.2 回归，短会话正常 | ⚠️ 无新修复 PR |
| [#151962 幻影用户消息：内部运行字符串被当作提示词提交](https://github.com/openclaw/openclaw/issues/151962) | 心跳轮询等内部消息出现在用户视角 | ⚠️ 需补充信息 |
| [#156674 同日资源压力问题详见图上](https://github.com/openclaw/openclaw/issues/156674) | — | — |

**今日最重要的稳定性信号**：仓库中大量问题带有 `clawsweeper:needs-maintainer-review` 标签，但 P0 修复 PR 仅 macOS 一例（#156881）。内存泄漏 #91588 已持续 3 个月+，至今无新修复 PR，建议维护团队优先处理。

---

## 6. 功能请求与路线图信号

### 可能被纳入下一版本的功能

| Issue/PR | 内容 | 信号 |
|---|---|---|
| [#44309 为 A2A 交接添加单向派发模式（无回复乒乓）](https://github.com/openclaw

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-09-24）

## 1. 生态全景

今日个人 AI 助手/自主智能体开源生态呈现**高活跃、高分化**态势。以 OpenClaw 为首的大型项目遭遇集中稳定性危机（macOS 崩溃撤回、内存泄漏、启动挂起等多线 P0 问题并发），社区声量巨大但用户信任经受考验。与此同时，NanoClaw 成功发布 v2.4.0，NanoBot、CoPaw 在功能合并与测试覆盖率上稳步推进，Zeroclaw 聚焦安全体系加固，Moltis 完善沙箱隔离——整体生态呈现"核心动荡、外围加速迭代"的格局。社区诉求高度一致：在功能快速扩张的同时，优先保证生产环境可稳定运行；内存/上下文管理、渠道一致性体验、安全审批机制成为多项目共同攻坚方向。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度 |
|---|---|---|---|---|
| OpenClaw | 500（新开/活跃460，关闭40） | 500（待合并392，合并/关闭108） | v2026.9.6（macOS 撤回） | ★☆☆☆☆ P0 集中爆发，高活跃高压 |
| NanoBot | 6（新开2，关闭4） | 34（待合并15，合并/关闭19） | 无 | ★★★★☆ 问题收敛快，维护高效 |
| Zeroclaw | 13（全部活跃） | 50（待合并47，合并/关闭3） | 无 | ★★★☆☆ 有 S0 审批绕过隐患，PR 积压 |
| PicoClaw | 1（CRITICAL 证书过期，12天未处理） | 2（1合并/关闭，1待合并） | 无 | ★★☆☆☆ 基础设施维护滞后 |
| NanoClaw | 4（关闭2，开放2） | 27（待合并10，合并/关闭17） | **v2.4.0** | ★★★★☆ 版本落地，升级阻塞问题关闭 |
| IronClaw | 0 | 2（均待合并） | 无（1.4.1-rc.2 准备中） | ★★★★☆ 无风险，节奏平稳 |
| Moltis | 0 | 1（待合并） | 无 | ★★★☆☆ 间歇期，功能延展中 |
| CoPaw | 43（新开/活跃17，关闭26） | 24（待合并15，合并/关闭9） | 无 | ★★★☆☆ 工程质量投入大，飞书问题突出 |
| EasyClaw | 0 | 0 | **v1.9.22 / v1.9.21** | ★★★★☆ 版本迭代密集，但社区反馈缺失 |
| TinyClaw / ZeptoClaw / LobsterAI | 无活动 | 无活动 | 无 | — 休眠 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态中**社区规模最大、功能覆盖面最广**的核心参照项目，其 Issue/PR 日更新量（各 500 条）远超其他项目一至两个数量级，具备完整的渠道矩阵（Mac/Windows/Android/Matrix/飞书/Telegram）和复杂的多代理运行时。其技术路线为"高功能密度+快速迭代"，但今日多个 P0 问题同时暴露，说明其架构复杂度正在反噬稳定性。相比之下，NanoClaw 同样做网关与多代理，但以 v2.4.0 实现了"升级不重置配置"的平滑迁移；NanoBot 更注重防御性编程（如并发写入加锁、压缩阈值保护）；Zeroclaw 则在审批链路安全上更谨慎。OpenClaw 的社区影响力仍位居首位，但若稳定性问题持续发酵，用户向更轻量、更稳定的替代品迁移的风险正在上升。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **内存/上下文管理** | OpenClaw（#91588 内存泄漏 OOM、#148707 回复丢失）、NanoBot（#5884 压缩并发覆盖、#5879 大 read_file 中止）、CoPaw（#7853 媒体块无界累积、#7628 压缩超预算）、NanoClaw（升级路径优化） | 上下文压缩不能丢数据、不能超预算、不能阻塞交互；内存泄漏需根治 |
| **渠道集成一致性** | OpenClaw（飞书重构 #156832）、Zeroclaw（WhatsApp 语音控制 #10922、#11059）、CoPaw（飞书 queue consumer 卡死 #7534）、NanoBot（Telegram 通知轰炸 #5870） | 多消息渠道的基础能力（语音、审批、通知）需对齐，且行为可预测、不打扰 |
| **安全与审批机制** | Zeroclaw（#10968 无人值守回合绕过 ApprovalManager）、CoPaw（沙箱 ACL #7943）、Moltis（#1272 per-agent 强制沙箱）、OpenClaw（发布流程强制 Gateway 验证） | 自主运行必须有审批兜底，沙箱和权限管控需下探到 agent 粒度 |
| **升级/发布可靠性** | OpenClaw（v2026.9.6 撤回、#146887 更新失败）、NanoClaw（v2.4.0 迁移注意）、CoPaw（#7534）、IronClaw（RC2 安全补丁） | 升级不能破坏存量配置，发布前需强制验证通道，回滚路径要清晰 |
| **WebUI 体验与可观测性** | NanoBot（#5851 用量统计、#5813 重启提示清除）、CoPaw（#7940 侧边栏优化）、NanoClaw（社区门户）、OpenClaw（#156921 嵌套工具组空白） | 用户需要可视化掌控 token 消耗、活动状态，并能清晰看到 Agent 在做什么 |

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | 全渠道多代理 AI 助手，功能密度最高 | 追求强功能的个人/团队 | 插件化渠道 + 统一 Gateway，重构频繁，技术债高企 |
| **NanoBot** | Provider 扩展 + WebUI 用量分析 + 技能系统 | 开发者与量化使用用户 | 模块化 Provider 层，重视 token 经济性，社区治理规范 |
| **NanoClaw** | 网关技能化 + 社区门户 + 多平台渠道 | 社区/团队部署者 | 网关可插拔（OneCLI / Iron Proxy），升级平滑 |
| **Zeroclaw** | WhatsApp Web 体验 + 安全体系（审批/沙箱） | 安全敏感型用户 | Rust 运行时，强调风险画像与审批链完整性 |
| **CoPaw** | 团队协作 + 飞书集成 + 质量工程 | 企业团队（尤其飞书用户） | 测试驱动（单日 +2720 用例），合规意识强 |
| **IronClaw** | 技能系统语义 + 供应链安全 | Rust 生态 / 多租户部署 | 虚拟技能根目录，安全更新及时 |
| **Moltis** | 多代理沙箱隔离 | 多代理部署运维者 | per-agent mounts/run_as/force，隔离能力深 |
| **EasyClaw** | 达人电商（Affiliate）自动化 | TikTok 电商运营者 | 垂直场景工具，版本迭代快、社区反馈弱 |
| **PicoClaw** | 搜索工具 + 远程设备配对 | 轻量嵌入式场景 | 依赖外部基础设施（官网证书已过期） |

## 6. 社区热度与成熟度分层

- **快速迭代期（功能推进为主）：** NanoClaw（版本正式发布，架构调整落地）、NanoBot（Provider 扩展 + WebUI 增强，19 条 PR 合并）、CoPaw（工程质量投入，测试覆盖率大幅提升）。这些项目保持每日大量合入，同时兼顾稳定性修复。
- **质量巩固期（稳定压倒一切）：** OpenClaw（P0 全栈修复，但 fix 节奏未跟上 Issue 声量）、Zeroclaw（安全加固优先，但 PR 积压 47 条待 review）、IronClaw（安全依赖更新 + 文档澄清）。此阶段项目社区讨论集中在对既有功能的信任修复。
- **低活跃/停滞期：** PicoClaw（代码有进展但基础设施 12 天未修复，拉低可信度）、Moltis（单 PR 独苗）、EasyClaw（发布密集但无社区反馈闭环）、TinyClaw/ZeptoClaw/LobsterAI（完全休眠）。

## 7. 值得关注的趋势信号

| 趋势 | 信号来源 | 对开发者的参考价值 |
|---|---|---|
| **"稳定性优先"成为社区最强音** | OpenClaw 内存泄漏 Issue 39 条评论、macOS 撤回事件；CoPaw 飞书卡死；NanoBot 并发数据丢失 | 在功能规划中必须为稳定性预留 buffer，P0 修复应形成 SLO 承诺；发布前增加强制验证矩阵 |
| **上下文管理是系统级瓶颈** | OpenClaw（压缩误判、内存泄漏）、NanoBot（压缩并发覆盖）、CoPaw（媒体块无界累积、压缩超预算） | 需要从"对话历史管理"升级为"上下文资源治理"，包括预算计算、并发保护、降级策略 |
| **安全审批是自主运行的前提** | Zeroclaw #10968（无人值守绕过 ApprovalManager）引发 S0 级关注；Moltis 强制沙箱 PR | 任何 headless/定时/子代理场景都必须显式挂载审批链，安全机制不能依赖 interactive 会话 |
| **渠道建设从"能通"转向"体验一致"** | OpenClaw 飞书重构、Zeroclaw WhatsApp 多个语音控制 bug、NanoBot Telegram 通知轰炸、CoPaw 飞书卡死 | 多渠道之间的行为差异正在成为用户流失点；建议建立跨渠道行为契约测试 |
| **第三方贡献者开始涌入** | io.net 官方为 NanoBot 贡献 Provider；Keenable 为 PicoClaw 提供搜索接入 | 生态开放性在增强，但项目维护者需加快 review 节奏（Zeroclaw #8692 决策队列已有 15 条评论），避免挫伤外部贡献积极性 |
| **基础设施可观测性是隐形刚需** | PicoClaw 官网证书过期 12 天无人修复；OpenClaw Gateway 内存监控缺失 | 开源项目的官网/文档站/更新源也应纳入自动化监控（证书续期、状态页），否则代码活跃度会被基础设施事故一票否决 |

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-24

## 1. 今日速览

过去 24 小时 NanoBot 项目保持高度活跃。PR 更新量达 34 条，其中 19 条已合并或关闭，15 条待合并，显示维护团队正在快速推进功能落地和问题修复。Issues 侧更新 6 条，其中 4 条已关闭，新开 2 条，整体问题收敛速度快于新增速度。今日无新版本发布，但有多项高优先级修复（含 1 个 P0 级并发问题）正在审查中，代码库健康度良好。

---

## 3. 项目进展

今日合并/关闭的 PR 覆盖了 Provider 扩展、WebUI 体验、文档修正与稳定性修复等方向，尤其是 **io.net 官方贡献的新 Provider** 和 **Linear 集成体验的全面改进**，是项目生态扩展的重要一步。

### 关键合并/关闭 PR

- **【新 Provider】** [feat(providers): add IO Intelligence (io.net) provider #5875](https://github.com/HKUDS/nanobot/pull/5875) — 由 io.net 官方团队提交，为 Nanobot 用户提供开箱即用的 IO Intelligence 推理服务。
- **【功能完善】** [feat(linear): improve native agent UX #5871](https://github.com/HKUDS/nanobot/pull/5871) — 全面优化 Linear 集成：支持 Linear mentions 和委派议题、OAuth 回调与权限状态展示、工作区健康检查、OAuth 安全撤销、配对引导等。
- **【Bug 修复】** [fix(agent): preserve state for required Codex compaction #5883](https://github.com/HKUDS/nanobot/pull/5883) — 修复 Codex 请求超出本地输入预算时，governor 在 Codex 原生压缩前过早清除 provider state 的问题。
- **【WebUI 增强】** [feat(webui): add usage ranges, activity calendar and model breakdowns #5851](https://github.com/HKUDS/nanobot/pull/5851) — 扩展 token 用量统计：支持 7/30/365 天和保留历史范围、键盘可访问的活动日历、实际 provider/model 分解表和每日数字表格。
- **【WebUI 修复】** [fix(webui): clear stale restart prompt after reconnect #5813](https://github.com/HKUDS/nanobot/pull/5813) — 修复 gateway 重启后 WebUI 保留旧的“需重启”快照、反复提示重启的问题。
- **【文档修正】** [docs: correct context compaction behavior and document /compact #5882](https://github.com/HKUDS/nanobot/pull/5882) — 修正用户指南中关于 context compaction 的过时描述，明确空闲压缩会用摘要替换对话而非保留原文，并补充 `/compact` 命令文档。
- **【可观测性】** [fix(agent): log mid-turn injected messages #5878](https://github.com/HKUDS/nanobot/pull/5878) — 中轮注入消息现在会输出内容预览到 INFO 日志，便于调试。

> 💡 综合来看，今日进展集中在 **生态集成（新增 Provider、完善 Linear）**、**WebUI 用户体验细化** 和 **稳定性修复** 三大方向。新增 provider 和功能合入表明项目正处于快速扩展期。

---

## 4. 社区热点

今日讨论热度最高的议题是 **Telegram 自动压缩通知被反复推送** 的体验问题，以及 **微信（WhatsApp）语音消息原生支持** 的长期需求。

- **[#5870 [CLOSED] Telegram: context compaction completion notice is repeated multiple times](https://github.com/HKUDS/nanobot/issues/5870)** — 用户报告在个人聊天中反复收到 “Context compacted.” 通知，一次对话中曾出现 6 条，且后续仍在增加。该 Issue 收到 3 条评论，社区关注度高。相关修复 PR [fix: stop sending context compaction notifications #5780](https://github.com/HKUDS/nanobot/pull/5780) 已提出，旨在让自动压缩通知不可见、仅保留 `/compact` 手动触发时的通知。
  
  > **诉求分析：** 用户对后台自动行为的无感知性有较高要求，频繁的通知干扰了正常对话流程。社区期待更克制的通知策略。

- **[#2152 [CLOSED] Native WhatsApp voice message support (STT + TTS)](https://github.com/HKUDS/nanobot/issues/2152)** — 用户自建了 Fish Audio 集成来实现 WhatsApp 语音消息收发，但由于需要每次更新后手动补丁 WhatsApp bridge，长期希望能有原生支持。该 Issue 积累了 2 个 👍 和 2 条评论，今日关闭（可能已达成替代方案或转为其他形式跟踪）。

- **[#5879 [OPEN] Large read_file results survive compaction as unsummarized delta and abort the turn](https://github.com/HKUDS/nanobot/issues/5879)** — 大量 `read_file` 输出即使在历史摘要成功后仍会导致一次 turn 中止，是影响工具调用稳定性的实际痛点，已有 2 条评论，与 [fix(tools): keep read_file progressing on oversized lines #5824](https://github.com/HKUDS/nanobot/pull/5824) 相关。

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排列如下：

| 严重程度 | Issue/PR | 描述 | 修复状态 |
|---------|----------|------|---------|
| **P0（严重）** | [fix(memory): prevent history compaction from overwriting concurrent appends #5884](https://github.com/HKUDS/nanobot/pull/5884) | `MemoryStore.compact_history()` 未使用 `_append_lock`，读取快照后直接原子替换文件，可能覆盖并发的追加写入，导致数据丢失。 | **已有修复 PR 待合并** |
| **P1（高）** | [#5870 Telegram: context compaction completion notice is repeated multiple times](https://github.com/HKUDS/nanobot/issues/5870) | 压缩完成通知在同一对话中重复出现，污染聊天记录。 | 已关闭；修复 PR [#5780](https://github.com/HKUDS/nanobot/pull/5780) 待合并 |
| **P1（高）** | [#5879 Large read_file results survive compaction as unsummarized delta and abort the turn](https://github.com/HKUDS/nanobot/issues/5879) | 大型 `read_file` 结果超出输入预算，导致 turn 异常中止，降低了工具在长文件场景下的可用性。 | 开放中；关联 PR [#5824](https://github.com/HKUDS/nanobot/pull/5824)（增大行级容错） |
| **P2（中）** | [#5881 [bug] 0.3.5版本要求_nanobot必须要搬到workspace外](https://github.com/HKUDS/nanobot/issues/5881) | 升级 0.3.5 后，若 `_nanobot` 配置目录位于 workspace 内，则会拒绝启动。用户质疑该限制的必要性。 | 开放中，无评论，需维护者确认设计原因 |
| **P2（中）** | [fix(tokens): warm fallback tokenizer in background #5861](https://github.com/HKUDS/nanobot/pull/5861) | fallback tokenizer 首次下载可能在 chat 场景阻塞请求。 | 修复 PR 待合并 |

---

## 6. 功能请求与路线图信号

以下信号可能影响下一版本的路线图：

| 功能方向 | 出处 | 说明 |
|---------|------|------|
| **智能化内存管理** | [feat(memory): gate idle transcript replacement on a token threshold #5885](https://github.com/HKUDS/nanobot/pull/5885) | 空闲压缩目前对每个过期会话（包括短会话）都用 LLM 摘要替换，影响恢复质量。该 PR 建议仅在超过 token 阈值时才替换短会话，保护小型 ad-hoc 会话的原文可用性。 |
| **手动专属技能调用** | [feat(skills): support manual-only invocation #5405](https://github.com/HKUDS/nanobot/pull/5405) | 支持 `disable-model-invocation: true`，让具有副作用（如部署、发布）的技能仅可手动触发，默认不被模型调用。 |
| **Codex 可观测性** | [feat(provider): langfuse tracing for codex #5520](https://github.com/HKUDS/nanobot/pull/5520) | 为 Codex Provider 补齐 Langfuse 可观测性，按真实 HTTP 请求记录一次 generation（主流程和压缩流程分离）。 |
| **共享会话隔离配置** | [feat(heartbeat): add isolated_session config to allow shared session #4551](https://github.com/HKUDS/nanobot/pull/4551) | 新增 `gateway.heartbeat.isolatedSession` 配置（默认 true），允许 heartbeat 在选定的目标聊天会话中执行，以复用上下文。 |
| **DeepSeek 视觉输入** | [fix(providers): preserve image inputs for deepseek-flash #5886](https://github.com/HKUDS/nanobot/pull/5886) | DeepSeek 官方 Vision 文档支持模型图像输入，但当前 DeepSeek 多模态处理逻辑会静默丢弃图像，此 PR 修复该问题。 |
| **会话文件/网页合一的预览体验** | [feat(webui): unify session file and website previews #5847](https://github.com/HKUDS/nanobot/pull/5847) | 将会话内文件与网站预览整合到同一可缩放预览面板，支持 tab 切换和会话恢复。 |

---

## 7. 用户反馈摘要

| 反馈来源 | 用户痛点 / 诉求 | 情绪倾向 |
|---------|----------------|---------|
| [#5870](https://github.com/HKUDS/nanobot/issues/5870) 评论 | 用户对 Telegram 压缩完成通知的重复推送感到明显困扰，要求后台自动行为尽量不打扰用户。 | 负面（被打扰） |
| [#5881](https://github.com/HKUDS/nanobot/issues/5881) | 中文用户对 0.3.5 版本新增的 workspace 路径限制表示不理解：“同一个实例 workspace 为啥要把 _nanobot 单独放出去？”，认为迁移成本不合理。 | 困惑 / 不满 |
| [#2152](https://github.com/HKUDS/nanobot/issues/2152) | 用户自建了 WhatsApp 语音集成，但需要每次更新后手动补丁 bridge，说明社区存在对“桥接类集成”的强原生诉求。 | 期待 / 无奈 |
| [#5879](https://github.com/HKUDS/nanobot/issues/5879) | 大型 `read_file` 导致 turn 中止，影响热插拔工具在长文件处理时的可靠性。 | 负面（受阻） |

---

## 8. 待处理积压

以下 Issue/PR 已开放较长时间，建议维护者评估优先级：

| 项目 | 创建时间 | 说明 |
|------|---------|------|
| [feat(heartbeat): add isolated_session config to allow shared session #4551](https://github.com/HKUDS/nanobot/pull/4551) | 2026-06-26

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-24

数据来源：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：13 条 Issue 全部处于开放/活跃状态，50 条 PR 有更新（47 条待合并、3 条已合并/关闭），无新版本发布。当前开发重心集中在两条主线：**WhatsApp Web 渠道完善**（4 个相关 Bug/功能请求）和**安全体系加固**（含 1 个 S0 级安全风险 Bug）。同时多个 RFC 与架构级讨论并行推进，社区仍在等待维护者对积压决策队列（#8692）的响应。值得注意的信号：一个大型 docs PR（#9817）今日以 parking-lot 状态关闭，其内容已被拆分为两个更小、更可执行的 PR（#11078、#11079），说明项目正在向"小步快跑"的治理模式收敛。

---

## 2. 版本发布

**无新版本发布。** 上一个版本为 v0.8.5，对应发布效率改进 tracker（#10814）仍在推进中。

---

## 3. 项目进展

过去 24 小时共 3 个 PR 合并/关闭，可见记录 1 条：

- **[CLOSED] [#9817 docs(rfc): route by what the author knows and gate RFC intake on an explicit trigger](https://github.com/zeroclaw-labs/zeroclaw/pull/9817)** — 以 parking-lot 状态关闭，作者 @JordanTheJet。原 PR 试图一次性修改 RFC 路由规则与 intake 门槛，今日被拆分为两个独立的小 PR 继续落地：
  - [#11079 docs(contributing): route ordinary work by what the author knows](https://github.com/zeroclaw-labs/zeroclaw/pull/11079)（XS，今日新开）
  - [#11078 feat(intake): require alternatives on the RFC form](https://github.com/zeroclaw-labs/zeroclaw/pull/11078)（XS，今日新开）

  这一拆分体现了维护者将大型文档 PR 切分为可快速合入的小改动的治理策略，有助于降低 review 负担、提升合并效率。

另有 47 个 PR 待合并，其中多个大型安全/架构 PR 仍在等待维护者 review，包括 RPC 认证（#10259）、文件系统沙箱策略（#7821）、文件系统写操作约束（#9977）等，这些是项目安全基座的关键组成部分。

---

## 4. 社区热点

| 排名 | 条目 | 评论数 | 主题 |
|---|---|---|---|
| 1 | [#8692 [Tracker]: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 15 | 维护者决策队列 |
| 2 | [#10970 RFC: Host-scoped admission control and per-agent resource bounds](https://github.com/zeroclaw-labs/zeroclaw/issues/10970) | 5 | 主机级多代理资源边界 |
| 3 | [#10922 [Bug]: WhatsApp Web ignores suppress_voice when queueing automatic TTS](https://github.com/zeroclaw-labs/zeroclaw/issues/10922) | 5 | WhatsApp Web TTS 行为 |

**分析与诉求：**

- **#8692 是今日讨论度最高的 Issue**（15 条评论），它是一个 tracker，旨在为所有需要维护者/代码所有者决策的 RFC、设计问题、发布策略问题建立显式队列。该 Issue 创建于 7 月 4 日，至今仍在更新，说明社区对 RFC 决策积压有明确痛点——多个 RFC（#10970、#11027）已在等待 `needs-maintainer-review` 标签下的响应。其👍数为 0，可能意味着讨论集中在流程设计而非广泛支持。
- **#10970 的 RFC 讨论**代表了多代理部署场景下的真实诉求：当一台机器运行大量 agent 时，需要主机级的并发 turn、工具执行和内存边界，以保证"以延迟换稳定"。该 RFC 标记 `risk:high`、`needs-maintainer-review`，涉及 agent-loop 与 operator-ux 两个 topic。
- **#10922（WhatsApp Web suppress_voice）** 连续多日保持活跃评论，叠加今日新出现的 #11059（force_voice 被忽略），说明 WhatsApp Web 渠道的语音消息控制逻辑存在系统性缺陷，社区对渠道成熟度的关注度正在上升。

---

## 5. Bug 与稳定性

今日报告的活跃 Bug 按严重程度排列：

### 🔴 S0 — 数据丢失/安全风险

- **[#10968 [Bug]: Unattended agent turns run with no ApprovalManager](https://github.com/zeroclaw-labs/zeroclaw/issues/10968)**（P1，`risk:high`）
  无人值守的 agent 回合（cron、heartbeat、headless SOP、spawn_subagent）在运行时不会构建 `ApprovalManager`，导致基于风险画像的工具审批被**静默忽略**。报告者 @JordanTheJet 指出 `agent::run` 仅在 `interactive=true` 时创建审批管理器（`crates/zeroclaw-runtime/src/agent/loop_.rs:1721`）。目前**尚无对应 fix PR**，建议优先处理。

### 🟠 S2 — 功能降级

- **[#10985 [Bug]: Dashboard-started turns get freshly built channel instances](https://github.com/zeroclaw-labs/zeroclaw/issues/10985)**（P1，`risk:high`，`status:in-progress`）
  从 Web dashboard 启动的回合无法通过 channel-backed 工具（`poll`、`reaction`、`ask_user`、`escalate` 等）访问 session-bound

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-09-24）

## 今日速览

PicoClaw 项目在过去 24 小时进入活跃度偏中低但有关键事件待处理的状态。外网官网 **picoclaw.io 的 TLS 证书过期问题已持续 12 天未解决（Issue #3377）**，当前为 CRITICAL 级别，直接导致项目首页对所有浏览器不可访问，是今日最紧迫的稳定性风险。PR 方面，1 个待合并的新功能（Keenable 搜索供应商）继续保持活跃，另 1 个为期一个月的手机配对功能 PR（#3344）已于今日关闭，但数据未明确标注是否成功合并。整体上，代码开发节奏平稳，但基础设施维护滞后明显拉低了项目健康度评分。

## 版本发布

今日无新版本 Release。

---

## 项目进展

**已关闭 PR（1 条）：**

- **[#3344] Add Build Remote Agent phone pairing (gbr/1)**（关闭于 2026-09-23，自 08-23 创建起历时 31 天）
  - 功能内容：新增 Build Remote Agent 配对设备适配器，允许手机通过 `gbr/1` 协议旁观本桌面代理；支持二维码 + 8 位码配对，可附加 `http://127.0.0.1:8788` 或 stdio。
  - 状态说明：数据仅显示 "CLOSED"，未标注 merged 或 rejected。若为合入，则意味着远程协作场景下的移动端旁观能力已落地；若被拒绝，可能涉及协议稳定性或安全性争议。建议维护者明确标注关闭原因，方便社区追踪。
  - 链接：https://github.com/sipeed/picoclaw/pull/3344

**待合并 PR（1 条）：**

- **[#3370] feat(tools): add Keenable web search provider**
  - 推进方向：新增 Keenable 作为 `web_search` 提供方，支持免 API Key（`POST /v1/search/public` 仅需 `X-Keenable-Title` 头），用户只需设置 `tools.web.keenable.enabled: true` 即可开箱使用。该 PR 已开放 16 天，今日仍在更新，说明可能在响应 review 意见，值得关注其合并进度。
  - 链接：https://github.com/sipeed/picoclaw/pull/3370

总体来看，项目在「搜索工具灵活性」和「远程设备配对」两个方向有实际推进，功能迭代未停滞。

---

## 社区热点

- **[Issue #3377] [CRITICAL] TLS certificate for picoclaw.io expired on 2026-09-10**（评论 2，👍 1）
  - 是本周全站唯一有讨论的 Issue，也是当前社区最聚焦的议题。
  - 链接：https://github.com/sipeed/picoclaw/issues/3377

**热点分析：** 该 Issue 虽为证书过期类基础设施问题，但引发关注的核心诉求是 **“项目官方网站对所有用户永久不可用”**。评论者必然包含对“为何 12 天仍未修复”的质疑。背后的更深层诉求是：**希望项目组为 picoclaw.io 建立证书自动续期与监控告警机制**，而非仅做一次性修复。此讨论热度不高（仅 2 条评论），但 1 个 👍 说明至少已有用户专门表达共鸣，考虑到该问题直接影响所有潜在用户的第一印象，其实际影响面远超讨论热度。

---

## Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 | 是否有 Fix PR |
|---------|----------|------|------|--------------|
| CRITICAL | [#3377](https://github.com/sipeed/picoclaw/issues/3377) | picoclaw.io TLS 证书于 2026-09-10 过期，所有浏览器拒绝连接，官网完全下线 | **OPEN**（12 天未关闭） | 否 |

**详情：** 该问题为纯运维事故，但已升级为对项目品牌和可访问性的直接打击。由于仓库 README 引用该域名作为主页，任何新用户通过 GitHub 访问项目时点击官网链接都会遭遇安全警告，这会显著损害项目可信度。当前未出现关联的修复 PR，意味着证书续期可能仍依靠手工处理，缺乏自动化保障。**建议优先级 P0，应立即续期并部署自动续期方案（如 certbot + 定时任务）。**

---

## 功能请求与路线图信号

- **PR #3370（Keenable web search provider）**：新增第三方搜索供应商接入能力，且主打“零配置、免 API Key”。这是一个典型的轻量、易用性导向的功能请求，符合个人 AI 助手用户对开箱即用体验的期待。结合 PicoClaw 已有 `web_search` 工具框架判断，**该 PR 被纳入下一版本的可能性较高**。
  - 链接：https://github.com/sipeed/picoclaw/pull/3370

- **PR #3344（Build Remote Agent phone pairing）**：将桌面代理的“旁观”能力扩展到手机端，反映了用户对 **“随时随地查看/监控 Agent 运行状态”** 的移动场景需求。虽然该 PR 已关闭，但此需求方向大概率不会消失，后续可能以其他协议或独立插件形式重现。
  - 链接：https://github.com/sipeed/picoclaw/pull/3344

- **来自 Issue #3377 的隐含需求**：社区未直接提功能请求，但该事故暴露出项目 **基础设施可观测性缺失** 的问题。建议路线图中考虑为官网/文档站添加独立状态页（status page）或自动化证书监控。

---

## 用户反馈摘要

> 注：由于数据中未提供 Issue 评论的具体内容，以下结论基于 Issue 标题、摘要及评论区存在性进行合理提炼。

- **真实痛点：** 用户 `@dimonb` 明确表达：“Every browser and every TLS client now refuses the connection, so the site is effectively down for all visitors.” —— 这是一次完整的访问失败体验，痛点在于**“项目主页完全不可达”**，而非某页面加载缓慢或某功能报错。用户特别标注了证书精确过期时间（2026-09-10 23:59:59 UTC），显示其对问题进行了仔细核查。
- **时间敏感性诉求：** 用户在摘要末尾强调 “This is time-sensitive: the longer ...”（后文截断），透露出对拖沓修复的担忧，希望维护者意识到越拖影响越大。
- **不满意点（推测）：** 该 Issue 创建于 09-12，更新于 09-23，前后 11 天仅 2 条评论，未见维护者回应或“进行中”标记。社区大概率对响应速度不满，这比证书本身更损害用户信任。
- **使用场景：** 官网是用户了解项目最新状态、下载入口和文档的起点，证书过期截断了整个获客与信息链路，影响所有潜在新用户。

---

## 待处理积压

1. **[Issue #3377] TLS 证书过期（CRITICAL，已开放 12 天）**
   - 创建于 2026-09-12，最后更新于 2026-09-23，无维护者回复迹象。
   - 风险：每多过一天，官网不可用的负面影响就叠加一天，且可能被搜索引擎降权。
   - 链接：https://github.com/sipeed/picoclaw/issues/3377

2. **[PR #3370] Keenable web search provider（待合并 16 天）**
   - 创建于 2026-09-07，最后更新于 2026-09-23，说明近期有动静，但尚未合并。
   - 风险：如长期不合并，外部贡献者的积极性会受挫；且 Keenable 端点若调整，PR 可能需要频繁 rebase。
   - 链接：https://github.com/sipeed/picoclaw/pull/3370

3. **[PR #3344] Build Remote Agent phone pairing（31 天后关闭，状态不明确）**
   - 创建于 2026-08-23，今日关闭。建议维护者补充关闭原因标签（merged/rejected/superseded），否则社区无法判断该功能是否落地。
   - 链接：https://github.com/sipeed/picoclaw/pull/3344

---

**核心建议：** 立即处理 #3377 证书续期，并考虑自动化；在 #3370 保持 review 推进；补充 #3344 的关闭原因说明。当前项目代码活跃度尚可，但基础设施维护需要补齐，以恢复社区对项目的整体健康度评价。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报 — 2026-09-24

## 今日速览

过去 24 小时 NanoClaw 整体非常活跃：**27 条 PR 更新**（10 条待合并、17 条已合并/关闭）、**4 条 Issue 更新**（2 条关闭、2 条开放），并正式发布 **v2.4.0**。今日核心事件是 v2.4.0 发布落地，配合一批围绕「升级路径 / update-nanoclaw」和「网关架构重构」的修复 PR 集中合入，项目完成了一次从架构调整到稳定性补强的完整闭环。维护者核心团队（@glifocat、@zvi-fried 等）提交密度高，同时也有外部贡献者（#12）的修复被合并，社区参与度良好。值得关注的是，两个长期困扰用户的升级阻塞类 Issue（#3869、#3828）今日关闭，表明升级体验问题已在 v2.4.0 中得到针对性解决。

## 版本发布

### v2.4.0 — 2026-09-24

发布链接：[NanoClaw v2.4.0](https://github.com/nanocoai/nanoclaw/releases)

**主要更新内容：**

- **Credential Gateway 技能化**：网关现在通过技能（Skill）安装。OneCLI 仍为默认网关，新增 **Iron Proxy**（Iron Control）作为可选网关，支持 API KEY 与原生 ChatGPT 登录，凭据存储和 OAuth 刷新由 Iron Control 托管（[#3825](https://github.com/nanocoai/nanoclaw/pull/3825)）。
- **社区门户配置**：支持 Echo 的硬化镜像（hardened image）以及托管 Slack App 的快速配置。
- **模型与速度控制**：新增安装级和按组（per-group）的模型、速度控制项。
- **Mattermost 频道**：新增 Mattermost 官方频道渠道支持。
- **OpenCode Provider 重构**：重做了 OpenCode provider 的认证与连接逻辑，改用共享的 credential-connection 接口，不再直接调用 OneCLI。

**迁移注意事项：**

- 现有安装的已选网关会被自动检测并保留，升级不会重置网关配置（[#3816](https://github.com/nanocoai/nanoclaw/pull/3816)）。
- 网关合同（gateway contract）

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-09-24）

## 1. 今日速览
过去24小时项目活动处于中等偏低水平：Issues 保持零新增/零关闭，2 条 PR 均为待合并状态，无新版本发布。核心维护者提交了 `1.4.1-rc.2` 的发布准备 PR（#8110），包含依赖安全更新；文档维护者同步提交了技能根目录的说明澄清（#8109）。社区外部互动较少（无评论与点赞），但项目内部维护节奏平稳，无紧急 Bug 报告，整体健康度良好。

## 2. 版本发布
今日无正式版本发布。值得关注的是，待合并 PR [#8110](https://github.com/nearai/ironclaw/pull/8110) 正在准备 `1.4.1-rc.2` 候选版本：在 RC1 基础上保持同一 Google 扩展 OAuth 就绪修复范围，并将锁文件更新至修复安全公告的 `wasmtime 47.0.4` 与 `rustls 0.23.45`。该 PR 合并后预计近期会发布 RC2，供下游测试验证。

## 3. 项目进展
今日无 PR 被合并或关闭，进展体现为两个待审核提交对新版和文档的推进：

- **[#8110](https://github.com/nearai/ironclaw/pull/8110)（chore/release）**：促进度分支从 `1.4.1-rc.1` 升为 `rc.2`，同时刷新依赖锁文件，补齐 wasmtime 与 rustls 的安全补丁。这会提升 1.4.1 发布候选版的供应链安全性，为正式版铺路。
- **[#8109](https://github.com/nearai/ironclaw/pull/8109)（docs/skills）**：删除旧的主机目录发现说明，明确运行时发现机制与 `scoped virtual skill roots`（`/skills`、`/system/skills`、可选 `/tenant-shared/skills`）的对应关系。该改动仅澄清信任分配与路径语义，不改变运行时行为，有助于减少用户部署时的误解。

## 4. 社区热点
今日没有高互动的 Issue 或 PR——两个 PR 的评论数为 0，👍 数为 0，Issues 为空。这反映出社区外部讨论较少，但以下两个主题可能成为后续关注焦点：

- **依赖安全更新**：`#8110` 中提到的 wasmtime 与 rustls 补丁版本，与当前安全公告库相关，供应链安全用户会关心此类变更对生产环境的影响。
- **技能部署路径语义**：`#8109` 涉及虚拟技能根目录的文档澄清，对于在多租户或自定义部署中使用旧磁盘导入方式的用户，理解 `scoped virtual skill roots` 有助于避免配置错误。

相关链接：[#8110](https://github.com/nearai/ironclaw/pull/8110) · [#8109](https://github.com/nearai/ironclaw/pull/8109)

## 5. Bug 与稳定性
今日无新增 Bug、崩溃或回归报告。稳定性方面，`#8110` 将 `wasmtime` 与 `rustls` 分别升级至 47.0.4 和 0.23.45，以响应“current advisory database”的要求，这是一项预防性维护，说明项目正主动修复已知上游漏洞。无其他稳定性风险事件。

## 6. 功能请求与路线图信号
今日无新功能请求 Issue。路线图信号主要来自两个 PR：

- `1.4.1` 即将正式落地：`#8110` 表明 RC2 将延续 Google 扩展 OAuth 修复，这是该版本的核心范围。
- 技能系统文档趋向规范化：`#8109` 强调 `scoped virtual skill roots` 并区分“运行时发现”与“旧版磁盘导入”，或许暗示技能加载机制未来会进一步统一到该模型。

暂无其他明确的新功能信号。

## 7. 用户反馈摘要
今日无用户评论或新 Issue，因此无新增用户反馈。间接信息来自 `#8109`：文档维护者主动修订技能根目录的说明，可能是在回应此前用户/贡献者对“主机目录发现”过时内容的困惑，或是为即将到来的技能系统变更提前做准备。没有用户表达不满，也没有正面的感谢评论可供引用。

## 8. 待处理积压
当前没有长期未响应或超期未处理的重要 Issue/PR。两个待合并 PR 均为 2026-09-23 创建，距离本日报相隔不到 24 小时，不构成积压。

需要维护者关注的新增待审项：

- [#8110](https://github.com/nearai/ironclaw/pull/8110)：发布准备类 PR，风险低，若本周无新问题建议尽快合并以推进 RC2。
- [#8109](https://github.com/nearai/ironclaw/pull/8109)：文档类 PR，风险低，按常规流程审查即可。

如需引入更多社区反馈，可以考虑在合并后通过 Release Notes 和文档更新通告安全依赖升级与技能路径说明，以吸引用户讨论。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-09-24）

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-24

## 1. 今日速览

过去24小时内，Moltis 项目活跃度较低：Issues 无新增或关闭，PR 仅有1条更新，无新版本发布。唯一活跃的 PR #1272 处于待合并状态，为沙箱（sandbox）功能引入了 per-agent 的配置项，是近期功能性增强的延续。整体来看，项目当前处于功能开发与合并的间歇期，社区讨论和反馈量较少，健康度平稳。

---

## 2. 版本发布

今日无新版本发布（最新 Releases 为空）。

---

## 3. 项目进展

**关键 PR：#1272 [OPEN] feat(sandbox): per-agent mounts, run_as and a forced sandbox**
- 作者：[@Bergmann89](https://github.com/Bergmann89)
- 创建：2026-09-16 | 最后更新：2026-09-23
- 链接：[https://github.com/moltis-org/moltis/pull/1272](https://github.com/moltis-org/moltis/pull/1272)

该 PR 为 agent 预设的 `[sandbox]` 配置块新增了三个 per-agent 控制项：

- `sandbox.mounts` — 为特定 agent 的沙箱容器添加额外的主机绑定挂载
- `sandbox.run_as` — 指定容器运行的 `uid:gid`
- `sandbox.force` — 强制该 agent 始终在沙箱内运行，禁止降级

这些改动从功能层面提升了沙箱的灵活性与安全性，允许不同 agent 根据自身需求定制隔离环境，同时通过 `force` 选项为高安全要求的 agent 提供强制沙箱保障。目前 PR 仍处于打开状态，尚未合并；其在功能上对齐了多 agent 场景下的隔离需求，可视为项目在安全/隔离能力方向上的一次有意义推进。

---

## 4. 社区热点

今日无高热度 Issues 或 PR 讨论（PR #1272 评论数为0）。

唯一活跃的 PR #1272 尚未引发公开讨论，可能是其仍处于代码审查阶段，或讨论集中在内部评审中。建议关注该 PR 后续合并动态，以及合并后是否引发用户对沙箱配置的使用反馈。

---

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。项目稳定性方面暂无需要紧急关注的事项。

---

## 6. 功能请求与路线图信号

PR #1272 本身即是一个功能增强请求的实际落地：per-agent mounts、run_as 与 force 选项反映出了用户对以下能力的潜在需求：

- 针对不同 agent 定制宿主资源访问范围（mounts）
- 指定沙箱运行身份以满足权限管理要求（run_as）
- 强制沙箱机制以确保敏感 agent 不会在无隔离状态下运行（force）

考虑到该 PR 已存在一周且持续更新，且功能设计完整（threaded from the...），若代码审查顺利，极有可能被纳入下一个版本。该 PR 的合入将为后续基于 agent 粒度的安全策略配置奠定接口基础。

---

## 7. 用户反馈摘要

由于今日无新 Issues 且 PR #1272 无评论，暂未收集到具体的用户痛点或使用场景反馈。当前公开反馈渠道较为沉寂，无法提炼有效的用户满意度信号。

---

## 8. 待处理积压

**PR #1272 已等待约8天（自2026-09-16创建，最新更新为2026-09-23）**，目前仍处于 OPEN 状态。考虑到其功能覆盖沙箱核心能力，建议维护团队关注代码审查进度，避免长时间的悬挂等待。若需要补充作者信息或调整实现方案，请及时在 PR 内沟通。

链接：[https://github.com/moltis-org/moltis/pull/1272](https://github.com/moltis-org/moltis/pull/1272)

---

*以上日报基于 2026-09-24 的 GitHub 公开数据生成，重点反映项目在功能开发、社区互动和稳定性方面的当前状态。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-24

> 数据来源：github.com/agentscope-ai/CoPaw | 统计周期：过去 24 小时

---

## 1. 今日速览

过去 24 小时项目活跃度较高：**43 条 Issue 更新**（新开/活跃 17，关闭 26），**24 条 PR 更新**（待合并 15，合并/关闭 9）。无新版本发布。社区讨论重心集中在 **QwenPaw Hub 多租户版本的后续规划**（#7318，33 条评论）、**长期记忆不可靠**（#7571）及 **上下文管理机制缺陷**（#7628、#7853、#7836）。合并侧亮点包括：**修复空文本块毒化会话历史**（#7409）、**区分模型错误与网络传输错误**（#7563）以及**测试覆盖率 +3.28pp 的批量补测**（#7941）。整体来看，项目在稳定性和工程质量上持续投入，但多会话通道（飞书）的稳定性问题仍较突出。

---

## 2. 版本发布

**无新版本发布。** 当前最新版本线仍为 v2.2.x（含 2.2.2-beta 系列）。

---

## 3. 项目进展

今日共 9 个 PR 被合并/关闭，按重要性排序：

| PR | 内容 | 意义 |
|---|---|---|
| [#7409](https://github.com/agentscope-ai/QwenPaw/pull/7409) fix(agents): drop empty assistant text blocks | 丢弃推理耗尽 token 后产生的空文本块 | 直接修复 #7402（Ark Responses API 400 错误），阻止空白输出污染会话历史 |
| [#7563](https://github.com/agentscope-ai/QwenPaw/pull/7563) fix(chat): distinguish model errors from transport failures | 移除发送前阻塞式模型检查，仅在后端明确返回 `MODEL_NOT_CONFIGURED` 时提示配置 | 网络超时、代理错误、5xx 不再被误报为"未配置模型"，显著改善错误可诊断性 |
| [#7941](https://github.com/agentscope-ai/QwenPaw/pull/7941) test(unit): make the batch-3 lock and portability tests cross-platform | 批量三：新增 47 个测试文件、**2720 个测试用例** | 语句覆盖率从 70.51% 提升至 **73.79%**（+3.28pp，+4200 条语句覆盖），对"锁与可移植性"测试做了跨平台适配 |
| [#7927](https://github.com/agentscope-ai/QwenPaw/pull/7927) fix(web): replace html2text with markdownify | 将 GPL-3.0 依赖 `html2text` 替换为 MIT 许可的 `markdownify` | 消除许可证合规风险；同时修复了标题重复、元数据混入正文的问题 |
| [#7952](https://github.com/agentscope-ai/QwenPaw/pull/7952) fix(hub): distinguish invitation redemption failure reasons | 将 5 种邀请兑换失败原因从单一 `PermissionError` 中拆分 | 运营/支持人员可区分"批次被撤销"与"邀请码输入错误"，提升可运维性 |
| [#7940](https://github.com/agentscope-ai/QwenPaw/pull/7940) feat(console): refine sidebar interactions and persist avatars | 侧边栏改为紧凑可移动导航，支持折叠/图标/详细三态切换，头像持久化 | Console 交互细节优化，提升日常使用流畅度 |
| [#6854](https://github.com/agentscope-ai/QwenPaw/pull/6854) add localized approval purpose descriptions | 为审批请求添加多语言用途描述 | 首次贡献者 PR，改善工具调用审批时的用户理解度 |
| [#7955](https://github.com/agentscope-ai/QwenPaw/pull/7955) docs(website): add download provenance and usage policy | 官网明确下载物为 Apache-2.0 开源构建，新增使用政策页 | 法务合规与透明度增强 |

**整体判断**：今日合并以 bug 修复、测试补强和合规清理为主，未引入大型功能特性，但「空文本块过滤」和「错误码细分」对会话稳定性和排障体验有实质提升。

---

## 4. 社区热点

| Issue/PR | 评论数 | 主题 | 热度分析 |
|---|---|---|---|
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) [OPEN] | **33** | QwenPaw Hub 多租户版后续方向讨论 | 4 👍。社区对"团队级运行"有强烈需求，Hub 是官方首个响应。讨论聚焦下一步优先建设什么（权限、技能管理、可观测性等），是典型的路线图收集帖 |
| [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) [OPEN] | 8 | "总是记不住，还是会遗忘"——插件开发场景中模型反复遗忘路径约定 | 0 👍但评论活跃。用户在真实开发工作流中反复受挫：规定了 TODO 文件生成目录、代码开发路径，模型仍会"忘记"。这触及 Agent 长期记忆/指令遵循的核心痛点，评论区应有较多共鸣与建议 |
| [#4474](https://github.com/agentscope-ai/QwenPaw/issues/4474) [CLOSED] | 9 | 是否支持 chatgpt-5.5 | 已关闭，说明官方或社区已给出答复。模型支持是用户最基础的诉求 |
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) [OPEN] | 8 | ToolResultPruner 跳过媒体块导致 base64 无界累积、撑爆上下文 | 0 👍但属于高影响 bug：`view_image` 产生的 base64 数据永不裁剪，会话必炸。用户对机制剖析深入，提供了复现路径 |
| [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) [CLOSED] | 8 | RetryChatModel 硬编码 32768 context_size | 已关闭，涉及所有版本的全模型上下文窗口误判，属于典型的"低级但影响面巨大"的缺陷 |

**热点背后的核心诉求**：① 多用户/团队部署能力；② 可靠的长期记忆与指令保持；③ 新模型快速适配；④ 上下文窗口的精细化管控。

---

## 5. Bug 与稳定性

按严重程度排列（🔥 = 已有关联 fix PR，✅ = 已关闭）：

### 严重

| Issue | 问题 | 状态 |
|---|---|---|
| [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) | **飞书会话 queue consumer 卡死**：高优先级卡片消息处理路径卡住后，同一会话新消息永远无法新建消费者，会话静默无响应 | OPEN，无 fix PR。影响生产可用性，建议优先处理 |
| [#7836](https://github.com/agentscope-ai/QwenPaw/issues/7836) | **scroll 驱逐策略丢弃用户消息**：工具密集任务中，位于工具输出跨度两端的用户 turn 被整体驱逐，而 history.db 仍有记录，活动窗口丢失请求 | OPEN，🔥 [#7872](https://github.com/agentscope-ai/QwenPaw/pull/7872) 已提交修复 |
| [#7853](https://github.com/agentscope-ai/QwenPaw/issues/7853) | **ToolResultPruner 不裁剪媒体块**：`view_image` 的 base64 在上下文中无界累积，最终超出模型窗口 | OPEN，无 fix PR。建议纳入 2.2.x 补丁 |
| [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) | **上下文压缩仍可超出 provider 完整请求预算**：压缩触发条件和最终预算未将隐藏/系统消息计入，活跃轮次仍可能失败 | OPEN，无 fix PR。与 #7853 同属上下文管理链路 |
| [#7943](https://github.com/agentscope-ai/QwenPaw/issues/7943) | **Windows 沙箱 ACL 锁定卷根目录**：workspace 设为 `C:\` 时，继承 ACE 可能导致整个卷无法访问 | OPEN（2 条评论），新报告，需关注 Windows 用户影响面 |

### 中等

| Issue | 问题 | 状态 |
|---|---|---|
| [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | **Daily Paper 静默失败**：arxiv.org 不可达时以误导性的"完成但无内容"收场，真实原因是 `httpx` 网络错误且无代理/端点配置 | OPEN，无 fix PR。对依赖该插件的用户每日造成困惑 |
| [#7767](https://github.com/agentscope-ai/QwenPaw/issues/7767) | **guardrail 插件构建中发现的 4 个 bug**：console 附件陈旧 blob（第 2+ 张图发的是第一张的字节）、一次性 cron 偶发丢触发、console 尾部消息丢失、`on_acting` 从不触发 | OPEN，复合报告，建议拆分跟踪 |
| [#7857](https://github.com/agentscope-ai/QwenPaw/issues/7857) | **ACP 关闭回退跳过会话清理并泄漏事件循环**：同步回退路径可清空服务注册表但不执行清理，新建事件循环未关闭 | OPEN，无 fix PR |

### 已关闭（确认

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-09-24

## 1. 今日速览

过去24小时内，EasyClaw 项目在 Issues 和 PR 层面均无新增活动（新开/活跃 0，关闭 0；PR 提交/合并 0），社区互动层面处于静默期。项目核心动态集中在版本发布：连续发布 v1.9.22 与 v1.9.21 两个版本，重点围绕达人联盟（Affiliate）模块的样品筛选、商务拓展（BD）负责人打通以及桌面工作区持久化体验展开优化。整体活跃度评估为 **中等偏低**，版本迭代节奏稳定（24小时内发版2次），但社区反馈通道暂无新增输入，建议关注后续是否有用户对 v1.9.22 新功能的反馈集中涌入。

---

## 2. 版本发布

### 🔖 v1.9.22 — TK Copilot v1.9.22

- **发布时间**：2026-09-24（基于日报生成当日）
- **更新内容**：
  1. **桌面端体验**：桌面工作区标签页可在重启后保留，并修复了授权恢复流程。
  2. **达人联盟模块**：改进达人联盟（Affiliate）样品筛选逻辑与人工消息处理机制；统一商品标识展示，并优化选品控制（原文可能截断，推测为"优化选择流程"）。
- **破坏性变更**：无（更新内容均为功能增强与修复，无接口或数据格式变更说明）。
- **迁移注意事项**：建议用户清理浏览器缓存后重启客户端，以确保桌面标签持久化与授权恢复逻辑正确加载。

### 🔖 v1.9.21 — TK Copilot v1.9.21

- **发布时间**：2026-09-24 前后（与 v1.9.22 同日或前日）
- **更新内容**：
  1. **达人联盟**：支持筛选达人联盟样品历史；从达人列表直接打开商务拓展（BD）负责人详情页面。
  2. **商务流程**：统一商务开发人员选择逻辑，支持分页浏览提案（Proposals），并增加 Affiliate AI 筛选模式的说明提示。
- **破坏性变更**：无。
- **迁移注意事项**：如使用达人列表相关功能，需注意 BD 负责人字段可能因数据源打通而显示更完整，建议检查现有导出模板是否兼容新增字段。

> **版本说明**：v1.9.22 与 v1.9.21 几乎同日发布，推测 v1.9.21 为紧急优化后追赶合入，或为小步快跑式迭代。两者在 Affiliate 模块的功能存在连贯性——先打通 BD 查看链路（v1.9.21），再优化样品筛选与消息处理（v1.9.22），建议采用 v1.9.22 作为基线版本。

---

## 3. 项目进展

今日无合并/关闭的 PR（共 0 条），因此无法从 PR 维度评估代码推进量。项目进展主要体现在 **双版本连续发布** 上：

- **功能推进**：
  - 桌面工作区持久化（重启保留标签页）
  - 授权恢复流程修复
  - Affiliate 样品筛选与历史查看
  - BD 负责人详情直达
  - 商品标识统一与选品控制优化
- **整体向前迈进**：尽管 PR 活动为零，但 release 节奏密集，表明内部开发管线活跃，代码提交已通过 CI/CD 直接转为产品功能，而非经过公开 PR 流程。项目健康度良好，但可观察性较依赖 release 说明。

---

## 4. 社区热点

今日无任何活跃或被评论的 Issues / PRs（共 0 条）。

**分析**：数据空缺可能原因有二：一是项目处于功能快速迭代期，用户尚未充分体验新版本后反馈；二是该仓库的 Issues 使用率本身偏低，用户更多通过其他渠道（如 Telegram、Discord）反馈。建议关注明日是否有针对 v1.9.22 新功能的用户反馈出现。

---

## 5. Bug 与稳定性

今日报告 Bug 数：**0**。

暂无用户新上报的崩溃、回归或稳定性问题。但需注意：v1.9.22 中提到 "修复授权恢复流程"，暗示 v1.9.21 或更早版本可能存在授权恢复的隐含缺陷，该问题已在最新版中修复。建议升级至 **v1.9.22**，如仍遇到授权闪退或会话丢失，欢迎在仓库提交 Issue。

---

## 6. 功能请求与路线图信号

今日无新功能请求（0 Issues）。

从新版本发布内容可提取的路线图信号：

| 方向 | 相关版本 | 说明 |
|------|---------|------|
| Affiliate 深度集成 | v1.9.21 / v1.9.22 | 持续优化样品筛选、BD 查看、商品标识，表明该项目在达人电商领域有明确深耕方向 |
| 桌面端体验 | v1.9.22 | 标签持久化与授权恢复，侧面反映桌面端用户规模已值得投入资源优化 |
| AI 辅助筛选 | v1.9.21 | "理解 Affiliate AI 筛选模式"提示出现，可能后续增强 AI 在选品/筛选中的能力 |

这些信号暗示下一版本可能进一步增强 **AI 在达人筛选与选品中的自动化**（基于 v1.9.21 的“AI 筛选模式说明”），以及 **跨设备会话同步**（基于桌面标签持久化）。

---

## 7. 用户反馈摘要

今日无用户评论或 Issue 文本可供分析（0 条）。缺乏一手反馈数据。

**延伸说明**：由于无直接用户语音，无法提炼真实痛点。但结合版本更新动作可间接推测：

- 用户可能在多标签工作流中存在上下文丢失痛点 → 促使开发团队做标签持久化
- Affiliate 样品筛选繁琐 → 促使优化筛选与历史查看
- 授权恢复不稳定 → 本次已修复

建议维护者在版本发布后主动邀请用户反馈，或公开部分用户反馈数据以增强社区信任感。

---

## 8. 待处理积压

当前积压数据：**0 条待响应 Issue / PR**。仓库维护状况健康，无陈年历史遗留问题。

**对维护者的提示**：由于今日社区活动为零，但版本发布密集，建议在下一版本 Release Notes 中关联明确的 GitHub Issue 或 PR 编号，引导用户建立 "发现-反馈-追踪" 的闭环习惯，减少社区沟壑。同时可考虑在仓库首页增加 "最近更新" 板块，方便用户跟踪版本演进。

---

*本报告由 AI 生成，数据来源于 EasyClaw GitHub 仓库公开信息。所有链接均可通过 [github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw) 访问。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*