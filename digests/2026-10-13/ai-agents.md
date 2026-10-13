# OpenClaw 生态日报 2026-10-13

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-13 04:24 UTC

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

# OpenClaw 项目动态日报 — 2026-10-13

## 1. 今日速览

OpenClaw 项目今日保持极高的社区活跃度：过去 24 小时共产生 500 条 Issue 更新（新开/活跃 321 条，关闭 179 条）与 500 条 PR 更新（待合并 358 条，已合并/关闭 142 条），同时发布了 v2026.10.5-beta.2 和 v2026.10.2 两个版本。值得注意的是，**P0 级稳定性问题（特别是内存泄漏与崩溃循环）在当前 Issue 池中占比偏高**，多条长驻高优问题（如 Gateway 内存泄漏 #91588、SQLite 损坏 #126821）在今日仍有持续讨论，说明项目在快速迭代的同时积累了一定的技术债。好消息是伴随着 v2026.10.5-beta.2 发布，更新流程、Windows 更新路径等问题已有一批针对性修复进入验证阶段。


## 2. 版本发布

### v2026.10.5-beta.2

**核心更新：**
- **更新完成与恢复机制改进：** `openclaw update` 现在可以自行处理陈旧的 handoff 租约、已完成回执以及历史遗留的 2026.9.8 恢复记录，不再因 `update-recovery-pending` 状态而中断更新。
- **服务配置保持：** 更新期间保留服务堆限制（heap limit）与 webhook 监听器配置，避免更新后运行环境发生非预期变更。
- **Windows 更新路径修复：** 处理 Windows 短路径（short-path）相关问题，改善 Windows 平台上的更新体验。

### v2026.10.2

**核心更新：**
- **首个稳定版升级体验修复：** 从稳定版 2026.10.1 升级至 2026.10.2 现在可以干净地完成，成功执行的就地更新不再以错误结束。
- **多平台更新路径修复：** Windows、克隆文件系统（cloned-filesystem）以及私有 Node 环境下的更新流程不再停滞或回滚。相关引用：#168849、#169031。

> ⚠️ **迁移注意事项：** 本次两个版本均为更新流程修复型发布，建议处于 2026.10.x 系列且此前遇到更新卡顿或回滚问题的用户优先升级至 v2026.10.2 或 v2026.10.5-beta.2。使用 Windows 平台 + Scheduled Task 部署的用户请特别关注更新 handoff 相关修复。


## 3. 项目进展

今日合并/关闭的 PR 数量为 142 条，以下是其中对项目方向有重要推进作用的合并 PR 与高质量待合并 PR：

### 已合并/关闭

- **#170446 — refactor(ui): replace Worktrees Web Awesome tabs**（[@steipete](https://github.com/steipete)）：将 Worktrees 界面迁移到自研 Solid Tabs 原语，统一技术栈并减少对 Web Awesome 的依赖。链接：https://github.com/openclaw/openclaw/pull/170446
- **#170509 — perf(logging): keep routine egress and model activity at debug**（[@steipete](https://github.com/steipete)）：将常规出口请求、模型响应日志降级为 debug 级别。实测繁忙 Gateway 初始日志窗口曾产生 17,230 条未替换转发日志、1,381 条模型响应日志与 181 条目录摘要，此改动将显著降低日志量。链接：https://github.com/openclaw/openclaw/pull/170509

### 今日新开、值得关注的 PR

- **#170625 — improve(control-ui): reduce sidebar work on reload**（[@steipete](https://github.com/steipete)）：优化 Control UI 侧边栏在深链接刷新时的重建逻辑。此前冷加载记录到约 15 秒内出现 14 个可见状态。链接：https://github.com/openclaw/openclaw/pull/170625
- **#170627 — fix(gateway): show thinking off when Claude defaults to off**（[@obviyus](https://github.com/obviyus)）：修复启动横幅误报 `thinking=medium` 的问题，当 Claude Opus 4.7/4.8 未配置 thinking 时实际默认为关闭状态。链接：https://github.com/openclaw/openclaw/pull/170627
- **#170618 — fix(sessions): avoid redundant work during all-agent cleanup**（[@steipete](https://github.com/steipete)）：避免全代理会话清理时重复扫描未变更的存储并重复启动回收 worker，同时修复 CLI 误报超时的问题。链接：https://github.com/openclaw/openclaw/pull/170618
- **#170624 — fix: remove synchronous guard snapshots and restore CI preparation**（[@steipete](https://github.com/steipete)）：移除代理删除与更新守卫中的不必要同步快照子进程，修复测试夹具与身份管理问题。链接：https://github.com/openclaw/openclaw/pull/170624
- **#170600 — fix(gateway): settle targetless update notices once**（[@duyufansh2008](https://github.com/duyufansh2008)）：修复无目标更新运行中 Gateway 恢复检查重复发出相同警告的问题（受影响实例曾记录 903 条重复警告）。链接：https://github.com/openclaw/openclaw/pull/170600

**整体判断：** 今日合入的 PR 以 UI 技术栈统一和日志性能优化为主，而新提交的 PR 则集中在对更新流程、会话生命周期和代理运行时的清理简化。多个大型重构 PR（如 #170626、#170596）已进入待审队列，说明项目正从功能扩张期过渡到架构整理与稳定性加固期。


## 4. 社区热点

### 讨论最热烈

- **#91588 — Gateway Memory Leak — RSS 350MB→15.5GB，导致反复 OOM 崩溃**（39 条评论，P0）
  链接：https://github.com/openclaw/openclaw/issues/91588
  Gateway 进程存在严重内存泄漏，2-3 天内 RSS 从启动时的 ~350MB 增长至 15.5GB，最终被 OS OOM Killer 杀死，触发 `launchd-handoff` 反复重启循环。自创建（2026-06-09）至今已持续 4 个月以上，是当前社区最关注的稳定性问题。

- **#159356 — llama.cpp manager 报告就绪但 embedding 子进程退出，返回 HTTP 500**（26 条评论，P2）
  链接：https://github.com/openclaw/openclaw/issues/159356
  用户报告在扩增 RAM 后问题有所缓解，但根因未明。该 Issue 反映出本地模型部署场景下资源门槛与进程生命周期管理的矛盾。

- **#159662 — prepared-model-catalog.worker.js 无界内存泄漏，~4-5GB/小时**（22 条评论，P0）
  链接：https://github.com/openclaw/openclaw/issues/159662
  Worker 线程内存持续增长，与工作负载、模型提供商或插件配置无关。冷重启 + 提供商 bisect 已复现，表明是通用性缺陷。

### 高赞/高共鸣

- **#76493 — 允许 `mcp.servers[].env` 中使用 SecretRef 对象**（👍 4）
  链接：https://github.com/openclaw/openclaw/issues/76493
  社区对安全实践（密钥间接引用）有明确诉求，当前 schema 限制阻碍了正确的密钥管理流程。

- **#50093 — WhatsApp: 断线重连后补发错过的消息**（19条评论，P1，👍 1）
  链接：https://github.com/openclaw/openclaw/issues/50093
  消息静默丢失对用户造成实际困扰，该功能请求代表了通道可靠性的核心需求。

**分析：** 社区热点集中反映出两个核心诉求——**①运行稳定性**：内存泄漏与进程假死是用户最痛的问题；**②消息不丢失**：通道断开后的消息补偿机制是高频期望。


## 5. Bug 与稳定性

### P0 严重级（崩溃/数据损失）

| Issue | 描述 | 状态 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) | Gateway 内存泄漏，350MB→15.5GB，OOM 反复崩溃 | OPEN（2026-06-09 创建） |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | `prepared-model-catalog.worker.js` 无界内存泄漏，~4-5GB/h | OPEN（2026-09-27） |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 2026.9.6 回归：捕获大型外部插件时 Gateway 阻塞数分钟 | OPEN（2026-09-29） |
| [#158390](https://github.com/openclaw/openclaw/issues/158390) | `plugin-captures` 临时目录不清理，磁盘持续被占满 | OPEN（2026-09-25） |
| [#126821](https://github.com/openclaw/openclaw/issues/126821) | SQLite 损坏在重建后 15-24h 内复发，出现“瘫痪网关”模式 | OPEN（2026-08-20，今日有更新） |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) | `MEMORY.md`/`USER.md` 被 provenance ratchet 永久排除出引导注入，无诊断/无恢复手段 | OPEN（2026-09-20） |
| [#160060](https://github.com/openclaw/openclaw/issues/160060) | Windows 待机恢复后 Gateway 静默死亡，~54 分钟后无日志消失 | OPEN（2026-09-28，今日有更新） |
| [#168750](https://github.com/openclaw/openclaw/issues/168750) | 更新激活 Doctor 约 24 分钟后失败：`Database maintenance authority check cannot admit a nested effect` | CLOSED（2026-10-12） |

### P1 重要级

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — hook/tool 子进程未被回收，产生僵尸进程积累（18 条评论）
- [#101929](https://github.com/openclaw/openclaw/issues/101929) — context-overflow-midturn-precheck 估算值虚高 2.3-2.6x，触发不必要的截断
- [#168955](https://github.com/openclaw/openclaw/issues/168955) — 2026.10.1 启动回归：ready 时间从 ~410s 恶化至 ~1030s（Windows）
- [#154891](https://github.com/openclaw/openclaw/issues/154891) — 失败的配置热重载会连带破坏无关插件，直到完整重启
- [#164799](https://github.com/openclaw/openclaw/issues/164799) — 版本变更后代理逐个 admit 耗时数分钟，readyz 503 直到重启

### 已有关联修复 PR 的 Issue

- [#137729](https://github.com/openclaw/openclaw/issues/137729)（.trim() 崩溃）— 已关闭，linked-pr-open
- [#158936](https://github.com/openclaw/openclaw/issues/158936)（macOS 看门狗 SIGTERM）— 已关闭，linked-pr-open
- [#164214](https://github.com/openclaw/openclaw/issues/164214)（包发布恢复卡死）— 已关闭，linked-pr-open

### 今日新增重要 Bug

- **#170331** [P2] — beta.2 更新候选配置读取失败退出，systemd 单元不变，Gateway 仍从旧版本重启。链接：https://github.com/openclaw/openclaw/issues/170331
- **#170332** [P3] — beta 更新在原始状态捕获期间数据库发生变化时仍继续执行。链接：https://github.com/openclaw/openclaw/issues/170332

> **稳定性评估：** 今日 Issue 池中 P0 级问题涉及内存泄漏（3 起）、SQLite 损坏（1 起）、数据丢失风险（2 起）与静默崩溃（2 起）。结合今日新版本的发布背景，**内存泄漏类 P0 问题已跨越多个 minor 版本仍未解决**，是当前项目健康度的最大隐患。


## 6. 功能请求与路线图信号

### 高优先级/可能进入下一版本

- **#50093 — WhatsApp 断线重连后补发错过的消息**（P1）
  链接：https://github.com/openclaw/openclaw/issues/50093
  消息可靠性是通道类功能的基础能力，有 20 条评论的高关注度，近期有被纳入开发计划的

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-10-13 | 数据窗口：过去 24 小时 | 数据源：GitHub 公开动态**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现 **"一超多强、分层演进"** 的格局：以 OpenClaw 为绝对核心（单日 500+ Issue/PR 更新），Zeroclaw、NanoBot、CoPaw 等构成第二梯队，另有 NanoClaw、PicoClaw、LobsterAI 等在特定场景深耕。生态整体正在经历从 **"功能扩张期"向"稳定性加固期"转型**——内存泄漏、会话数据完整性、成本计费准确性成为多项目共通的痛点，同时记忆持久化、多 Agent 编排/权限治理、渠道可靠性等方向正加速成为差异化竞争焦点。值得一提的是，安全与权限边界问题在多项目中同时浮现（Moltis 访问策略绕过、CoPaw 技能安装破坏二进制、Zeroclaw 配对令牌授权），标志着生态开始进入 **"安全合规敏感期"**。


## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（+321 新开 / 179 关闭） | 500（+358 待合并 / 142 关闭） | ✅ v2 个版本 | ⚠️ 高活跃，P0 内存泄漏跨版本未决，技术债偏高 |
| **Zeroclaw** | 38（+34 新开 / 4 关闭） | 50（+47 待合并 / 3 关闭） | 无 | ⚠️ 成本计费/会话时间戳 bug 集中，大量 XL 级 PR 积压 |
| **NanoBot** | 1（新开） | 30（+14 待合并 / 16 关闭） | 无 | ✅ 健康，架构重构推进，多个 PR 存在 conflict 需协调 |
| **CoPaw** | 18（+16 新开 / 2 关闭） | 31（+23 待合并 / 8 关闭） | 无 | ⚠️ Bug 响应快，但 Windows 平台问题集中（文件句柄/日志轮转/liveness） |
| **LobsterAI** | 2（1 开 1 关） | 12（+9 合并/关闭） | 无 | ✅ 合并节奏快，安全漏洞已关闭，UI 打磨与平台覆盖并行 |
| **PicoClaw** | 5 | 7（6 合并） | 无 | ✅ 良好，系统性清理 3 月历史积压，Termux 兼容性修复落地 |
| **NanoClaw** | 0 | 6（2 合并 / 4 待审） | 无 | ✅ 稳定维护期，"高修复、零新增"健康窗口 |
| **Moltis** | 1（安全相关） | 2（新提交） | 无 | ✅ 良好，安全加固与权限治理演进中 |
| **IronClaw** | 2 | 0 | 无 | ✅ 功能稳定期，质量评估机制持续运转 |
| **TinyClaw** | 0 | 0 | 无 | — 无活动 |
| **ZeptoClaw** | 0 | 0 | 无 | — 无活动 |
| **EasyClaw** | 0 | 0 | 无 | — 无活动 |


## 3. OpenClaw 在生态中的定位

**OpenClaw 是生态绝对的"母舰"与参照基准**，其定位具备三重属性：

- **规模断层领先**：单日 1000 条 Issue/PR 更新，是第二名 Zeroclaw 的约 12 倍；v2026.10.x 系列持续迭代，且同日发布 stable 与 beta 双版本，验证了其分层发布能力。
- **架构风向标**：UI 技术栈统一（自研 Solid Tabs 替代 Web Awesome）、日志治理（高频日志降级 debug）等动作，均被生态内项目视为演进方向。NanoClaw、LobsterAI、PicoClaw 等均明确以 OpenClaw 上游为基线进行二次开发。
- **技术债的警示器**：P0 级内存泄漏（Gateway 350MB→15.5GB、`prepared-model-catalog.worker.js` 每小时 4-5GB）跨越 3 个 minor 版本仍未根治，SQLite 损坏 2 个月内复发，提示 **"规模领先 ≠ 稳定性领先"**。社区对其稳定性问题的持续高关注（#91588 累计 39 评论）也说明用户的稳定性容忍度在降低。

对比同类项目：OpenClaw 走 **"全功能一体化"路线**，与 Zeroclaw 面向成本敏感/企业治理、NanoBot 面向模块化安全扩展、Moltis 面向多 Agent 权限治理形成鲜明差异。


## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **内存泄漏与资源回收** | OpenClaw、LobsterAI、CoPaw | Gateway/worker 进程无界内存增长导致 OOM；MCP bridge 崩溃后残留僵尸进程（LobsterAI #2845）；Windows 文件句柄占用导致删除失败（CoPaw #8206） |
| **会话数据持久化与完整性** | NanoBot、Zeroclaw、NanoClaw | JSONL→SQLite 集中化迁移（NanoBot #5943）；SQLite 重写 `created_at` 破坏时间线（Zeroclaw #11420/#11675）；审批卡片错误进入会话线程（NanoClaw #4080） |
| **成本计费与 Token 可观测性** | Zeroclaw、LobsterAI | OpenRouter 费用恒为 $0.00（Zeroclaw #11204）；隐藏推理 token 漏计（#11613）；积分统计口径不透明（LobsterAI #2842 隐藏积分芯片） |
| **渠道集成可靠性** | NanoClaw、NanoBot、PicoClaw、CoPaw | 飞书进度卡片误撤回（NanoClaw #4079）；WhatsApp 断线后消息补发（NanoBot #50093）与官方 API 接入（#6152）；Telegram MarkdownV2 兼容（PicoClaw）；Console 静默空完成（CoPaw #8172） |
| **扩展机制与权限安全模型** | Moltis、CoPaw、IronClaw、Zeroclaw | 非网关 turn 绕过 chat 访问策略（Moltis #1303）；`spawn.allow` 白名单机制（Moltis #1302）；GitHub 安装 skill 破坏二进制文件（CoPaw #8179）；托管 MCP 扩展零侵入接入（IronClaw #8136）；roster 绑定令牌授权（Zeroclaw #11286） |
| **记忆与持续性 Agent 形态** | Zeroclaw、NanoBot、IronClaw | 持久化记忆与成熟 runtime 对齐（Zeroclaw #8891）；跨会话世界状态同步（NanoBot #6182、IronClaw #8136，均涉及 Plazmi 场景） |
| **质量评估与可观测性机制** | IronClaw、OpenClaw、Zeroclaw | 每日基准失败分类报告（IronClaw #8135）；繁忙 Gateway 日志量治理（OpenClaw #170509）；成本仪表盘可信度建设 |


## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构关键差异 |
|---|---|---|---|
| **OpenClaw** | 全功能一体化旗舰（多 Agent、网关、UI、插件体系） | 追求功能覆盖度的个人开发者 / 团队 | Gateway 中央枢纽 + launchd-handoff 进程管理；Rust 与 Node 混合 |
| **Zeroclaw** | 成本治理、会话数据完整性、企业级记忆/RAG | 成本敏感型企业用户、合规导向团队 | 成本账本 + SQLite session + rotation 凭证体系；XL 级架构 PR 多 |
| **NanoBot** | 模块化扩展、SQLite 集中化、多 IM 渠道（WhatsApp/Telegram/飞书） | 自托管用户、需要渠道矩阵的开发者 | ToolRegistry 解耦 + 命名连接复用 + 有界 worker pool；重构节奏激进 |
| **CoPaw** | 审批流、上下文管理、Creator 插件生态 | 需要精细审批控制的工作流用户 | 审批竞态修复 + 上下文主动回收；QwenPaw Creator 插件机制 |
| **LobsterAI** | 桌面端体验、Computer Use、Agent 生态（Expert Plaza） | 桌面优先用户、需要 GUI 操作者 | Intel Mac 支持 + MCP bridge 生命周期管理 + 版本化 CDN 目录分发 |
| **PicoClaw** | 轻量级、边缘部署、渠道兼容性 | Termux/Android 用户、低资源环境 | 系统 CA 证书池修复 + OpenAI 兼容层 + logger 可配置；历史 PR 清理为主 |
| **NanoClaw** | 渠道打磨、审批流体验、CLI 工具链 | 飞书/Teams/IM 深度用户 | 卡片线程归属修复 + OneCLI agent grants API 迁移；"高修复、零新增" |
| **Moltis** | 多 Agent 权限治理、行为一致性 | coordinator/worker 拓扑用户 | chat 与 sub-agent 双路径对齐 + `spawn.allow` 白名单；安全驱动演进 |
| **IronClaw** | 质量评估、基准测试体系 | 对模型/框架质量边界敏感的研究者 | 每日 failure taxonomy 报告 + 扩展机制零侵入设计 |

**共性趋势**：除 OpenClaw 外，多数项目今日重心是 **"修复存量、清理积压"**（LobsterAI 合并 9 PR、PicoClaw 合并 6 条 3 月前 PR），而非新功能开发，侧面验证了生态整体进入整合期。


## 6. 社区热度与成熟度

| 活跃度分层 | 项目 | 阶段特征 |
|---|---|---|
| **第一梯队：高速迭代** | OpenClaw、Zeroclaw、NanoBot | 单日 PR 更新 ≥30；功能与 bug 并行爆发；OpenClaw 在稳定性修复与功能推进间拉锯，Zeroclaw 积压大量 XL 级 PR 待审，NanoBot 重构与兼容修复双线推进 |
| **第二梯队：

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-13

## 1. 今日速览

过去24小时内，NanoBot 项目保持高活跃度：共更新 30 条 Pull Requests（14 条待合并，16 条已合并/关闭），PR 吞吐量显著，显示团队与社区协作节奏紧凑；Issues 侧仅新增 1 条，但该 Issue 提出了一个具有扩展价值的功能设想（Plazmi 世界状态同步示例）。无新版本发布，项目处于特性开发与重构并行推进的阶段。整体健康度良好，注意存在多个 PR 标记为 `conflict`，需及时协调合并顺序。


## 3. 项目进展

今日合并/关闭的 16 个 PR 中，多个重要改动已落地，覆盖重构、Bug 修复与体验改进：

- **重构：图片生成工具组合方式**（[#6172](https://github.com/HKUDS/nanobot/pull/6172)）— 将 `ImageGenerationTool` 从 `AgentLoop` 中解耦，改为由应用运行时自行组装并注册到共享 `ToolRegistry`，进一步推动架构向模块化演进。
- **修复：飞书助手创建与配对恢复**（[#6157](https://github.com/HKUDS/nanobot/pull/6157)）— 修复配置飞书助手后无法“再添加一个助手”的问题，且将配对回复投递与发送者审批分离，失败时可恢复。
- **功能：图片请求支持命名连接复用**（[#6160](https://github.com/HKUDS/nanobot/pull/6160)）— 图片生成现在可选择 Models 中创建的命名连接，不再局限于固定提供商名。
- **合并：音频转写格式兼容修复**（[#3588](https://github.com/HKUDS/nanobot/pull/3588)）— 解决了将非 WAV 音频上传至自托管 Whisper 后端（whisper.cpp /inference）时仅接受 16kHz mono WAV 的问题。该 PR 自 5 月发起，今日终获合并，累计跨度超 5 个月。
- **文档：新增 Sol AI 至开源合作伙伴**（[#6180](https://github.com/HKUDS/nanobot/pull/6180)）— 完善项目生态展示。

以上改动表明项目正在持续强化扩展性（解耦、命名连接、工具注册机制），同时重视对既有功能的稳定性修复。


## 4. 社区热点

今日讨论最活跃、最值得关注的 PR/Issue：

- **#5943 [OPEN] refactor(session): centralize state ownership in SQLite**（[链接](https://github.com/HKUDS/nanobot/pull/5943)）— 该 PR 由 @chengyongru 发起，涉及将 session 持久化从 JSONL 全面迁移至 SQLite 事务，并通过有界 worker pool 管理运行时状态，避免阻塞事件循环。这是当前积压列表中规模最大的架构性变更，影响面广，属核心模块负责人主导的长期重构。
- **#6181 [OPEN] fix(documents): preserve empty PPTX table columns**（[链接](https://github.com/HKUDS/nanobot/pull/6181)）— 新提交的缺陷修复，直击 PPTX 表格解析时空单元格导致列错位的实际痛点，社区关注度高，因其影响数据分析类用户。
- **#6182 [OPEN] Proposal: optional Plazmi world catch-up example through restricted MCP tools**（[链接](https://github.com/HKUDS/nanobot/issues/6182)）— 新 Issue 提出借助受限 MCP 工具实现“Plazmi 虚拟世界”跨会话时间同步的示例。背后诉求是希望 NanoBot 能支持持续性世界状态（虚拟角色/家事管理场景），并强调“示例级别、工具受限、可与现有 enabledTools 指南对接”，体现用户对安全可控扩展性的偏好。


## 5. Bug 与稳定性

- **PPTX 表格空列丢弃导致列错位**（[#6181](https://github.com/HKUDS/nanobot/pull/6181)）— 中高严重度，解析 `Name / Q1 / Q2` 含空格时行数据错位（`Alice\t100`），影响下游结构化提取。已有 fix PR 待合并，附真实 PPTX 回归测试。
- **飞书助手配对回复失败不可恢复**（[#6157](https://github.com/HKUDS/nanobot/pull/6157)）— 已合并修复，将回复投递与发送者审批解耦，失败时可恢复，避免用户被静默卡住。
- **自托管 Whisper 后端音频格式不兼容**（[#3588](https://github.com/HKUDS/nanobot/pull/3588)）— 已合并，解决 whisper.cpp `/inference` 仅接受 16kHz mono WAV 的局限。
- **Codex 图像生成 SSE 流式响应可能丢失**（[#6011](https://github.com/HKUDS/nanobot/pull/6011)）— 待合并。`AsyncClient.post()` 缓冲读入响应体，连接断开时已生成图像可能被丢弃。已提供基于 `client.stream()` 的修复方案，建议优先审阅。


## 6. 功能请求与路线图信号

- **Plazmi 世界状态跨会话同步（新 Issue #6182，[链接](https://github.com/HKUDS/nanobot/issues/6182)）** — 用户提议通过受限 MCP 工具展示一个“重新回到虚拟世界”的 catch-up 示例。若采纳，将增强 NanoBot 在持续角色/世界模拟场景下的可示范性，且以“受限工具”方式实现，契合项目的安全边界理念。
- **WhatsApp Agent Platform 官方渠道支持（[#6152](https://github.com/HKUDS/nanobot/pull/6152)）** — 待合并。该 PR 接入 WhatsApp 官方 Agent 平台 API，面向商务/客服场景，若合入将显著扩展 NanoBot 的触达渠道。
- **OpenRouter 原生图像生成 API（[#5718](https://github.com/HKUDS/nanobot/pull/5718)）** — 待合并。确保 OpenRouter 图像生成兼容其最新 Images API，并开放更多模型选项。
- **Telegram 自定义 Bot API Base URL（[#4919](https://github.com/HKUDS/nanobot/pull/4919)）** — 待合并。支持自建 Bot API 网关或企业代理场景，适合私有化部署用户。
- **可配置本地受信扩展面（[#6032](https://github.com/HKUDS/nanobot/pull/6032)）** — 待合并。为浏览器端插件提供基于扩展清单的受控加载机制，强化自托管安全模型。
- **集成托管安装与可恢复应用内更新（[#6168](https://github.com/HKUDS/nanobot/pull/6168)、[#6154](https://github.com/HKUDS/nanobot/pull/6154)）** — 两者延承 #5817 统一更新管线，前者为 WebUI 与恢复流程打通，后者产出五目标预构建预览候选包，标志着更新分发体系正趋向完整。

结合今日合并与待合并 PR 看，**下一版本大概率会包含**：更彻底的 SQLite session 持久化、WebUI 组件画廊与扩展机制、WhatsApp 官方渠道连接、以及更健壮的图片工具注册模型。


## 7. 用户反馈摘要

- **来自 #6182（Plazmi Issue）的意愿**：用户希望 NanoBot 能示范“代理在真实 UTC 时钟持续推进的世界中跨会话工作”，并主动提出可贡献受限 MCP 工具的示例——这表明部分用户对“持续性 AI 体”持有强烈兴趣，期待在安全可控前提下探索此场景。
- **#6180 文档 PR 中的用户表达**：Sol AI 项目作者在描述中强调“记录真实生产构建、agent 工作流与坦诚的架构决策”，侧面反映了 NanoBot 用户群体对“真实部署经验”的重视，说明社区的参考性案例需求旺盛。


## 8. 待处理积压

以下 PR/Issue 长期未闭合，需要维护者重点关注：

- **#5943 refactor(session): SQLite 集中化状态所有权**（[链接](https://github.com/HKUDS/nanobot/pull/5943)）— 9 月创建，仍标记 `conflict`，且涉及面广泛。核心架构 PR，长期搁置会加大后续 Session 相关改动的成本，建议及时处理冲突并推进合并。
- **#4919 Telegram 自定义 Bot API Base URL**（[链接](https://github.com/HKUDS/nanobot/pull/4919)）— 7 月创建，待合并。功能成熟度较高，且有明确用户场景（#4702），搁置可能导致用户流失到其他支持自建 Bot API 的框架。
- **#5718 OpenRouter 原生图像生成**（[链接](https://github.com/HKUDS/nanobot/pull/5718)）— 9 月创建，标记 `conflict`，若 OpenRouter 已默认走新 API，旧实现存在兼容性风险，建议优先协调。
- **#3588 音频格式转换（已合并，但值得留意其后续回归）**（[链接](https://github.com/HKUDS/nanobot/pull/3588)）— 虽然本轮已关闭，但该问题自 5 月存在长达 5 个月，建议维护者复盘何时获得社区推动，以改进长期 Issue/PR 的响应机制。
- **#6152 WhatsApp Agent Platform 渠道**（[链接](https://github.com/HKUDS/nanobot/pull/6152)）— 新的生态扩展渠道，长期未合入将影响该场景下 NanoBot 的竞争力。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-13

## 1. 今日速览

过去 24 小时项目保持高活跃度：共更新 38 条 Issues（新开/活跃 34 条、关闭 4 条）和 50 条 PR（待合并 47 条、合并/关闭 3 条），无新版本发布。Bug 报告与修复 PR 集中在**成本统计准确性**（OpenRouter 费用归零、隐藏推理 token 漏计）与**会话数据完整性**（SQLite/ACP 存储时间戳被重写）两条主线上，均有对应 fix PR 在途。安全侧 roster 绑定配对令牌的许可异常已获批准（#11699 已关闭），相关大型 PR 仍在审查中；memory 子系统 tracker 讨论热度持续，持久化记忆与 RAG 能力是社区最关注的方向。

## 3. 项目进展

今日无新版本，但完成了 4 个 Issue 与 1 个 PR 的关闭：

- **#11699**（docs）已关闭：记录 roster 绑定配对令牌的 holding-crate 许可异常获得批准（[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/11699)）。这为 #11286（绑定配对令牌到 roster 用户，XL 级）扫清了流程障碍。
- **#11108** 已关闭：修复 `map_tool_name_alias()` 将 `browser_open`/`web_search` 错误映射为 `shell` 的问题，保留内建浏览器与搜索工具语义（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11108)）。
- **#10996** 已关闭：插件安装过程中种子化 channel 实例配置与授权（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10996)）。
- **#11088** 已关闭：将 multi-agent 设置指南从 Contributing 移至 Agents 文档区（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11088)）。
- **#10331** 已关闭：修复 runtime 中因 worker 死亡而被遗弃的 terminal settlement intents 恢复逻辑（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10331)）。

另有 47 条 PR 待合并，其中**成本/Token 修复**（#11670）、**JPEG 内存投影**（#11672）、**ZeroCode 时间显示**（#11622）均处于待合并状态，若明日合入将直接缓解 4 个活跃 bug。整体看，项目在安全异常审批、文档归位、老 bug 收敛上均有小幅推进，但大量 XL 级 PR（#10391、#11264、#11286、#11456、#11473、#10499）仍积压待审，合并节奏偏慢。

## 4. 社区热点

- **#8692**（15 评论）：Maintainer decision queue for RFCs and design issues——社区对 RFC/设计决策流程的等待时间不满，要求建立显式的维护者决策队列，提升治理透明度（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）。
- **#8891**（11 评论）：Persistent memory 多 PR 上线 tracker——用户持续关注跨会话记忆与成熟 agent runtime 的对齐进度，属于 roadmap 级诉求（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8891)）。
- **#11254**（9 评论，RFC）：A2A protocol crate——讨论 agent-to-agent 通信协议的架构归属与跨边界重构，是平台化方向的重要候选（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11254)）。
- **#11420**（8 评论，bug）：SQLite 会话后端每次 turn 重写所有消息的 `created_at`——数据完整性问题，直接影响用户侧的时间线展示，已有 #11622 部分缓解（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)）。
- **#11204**（5 评论，bug）：OpenRouter 费用显示 $0.00——用户对成本仪表盘的可信度提出质疑，属于付费服务核心体验问题（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)）。

热点背后共同指向两点：**平台级能力（记忆、A2A、多 agent 编排）的落地节奏**，以及**成本与数据准确性**的信任建设。

## 5. Bug 与稳定性

按严重程度排列（S1 > S2 > S3），并标注修复状态：

**S1 — 工作流阻断**
- #11179：`sop::engine` 测试跨秒边界时 flaky，导致 CI Required Gate 无故变红（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11179)，暂无 PR）。

**S2 — 行为降级**
- #11420：SQLite 会话重写导致所有消息 `created_at` 被统一刷新（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)，#11622 显示时间线但未彻底修复）。
- #11675：ACP session store 在替换裁剪后的 transcript 时同样重写 `acp_messages` 的 `created_at`（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11675)，暂无 PR）。
- #11204：OpenRouter 费用恒为 $0.00，全部 token 被归为 "free tok"（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)，暂无 PR）。
- #11613：成本账本丢弃 provider 端的 `total_tokens`，隐藏推理 token 被漏计（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)，**已有 #11670 fix PR 待合并**）。
- #10950：`cost.warn_at_percent` 预算警告被 runtime 忽略（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10950)，#11589 提供 override 机制但非直接修复）。
- #10777：Anthropic thinking/effort 配置在 turn 间翻转并重写整个缓存历史段（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)，待复现）。
- #11655：Core conflict supersede 在无向量分数时隐藏无关记忆（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11655)，暂无 PR）。
- #11606：`model_routing_config upsert_agent` 重写整个 config，伪造 risk/runtime 配置并重置 limits（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)，**已有 #11693 fix PR**）。
- #11696：每 turn 从磁盘重建 system prompt，导致 prompt cache 全部失效、成本上升（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11696)，暂无 PR）。

**S3 — 次要问题**
- #11703：延迟工具激活会改动 system prompt 并 bust prompt cache（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11703)，暂无 PR）。
- #11654：JPEG admission 在内存上限检查前就复制输入并解析头部（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11654)，**已有 #11672 fix PR 待合并**）。
- #11694：ZeroCode Cost 页混用 UTC 与本地日口径且无标注（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)，暂无 PR）。

**稳定性总评**：成本/计费类 bug 集中爆发（5 个），但修复 PR 跟进迅速；会话时间戳数据完整性为新增问题面，需警惕与 #11420 合并影响。

## 6. 功能请求与路线图信号

- **#11664**（新）Level 5 Dark Factory Workflow：用户期望结构化的多 agent 编排、任务生命周期管理，与 #10025（zeroclaw swarm RFC）方向一致，可能并入后续编排能力规划（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11664)）。
- **#11662**（新）Separate Channels from Core：要求 channel 与核心解耦，减少未使用 channel 的“死重”与安全攻击面。与 #10999/#10996 的插件化方向互为支撑（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11662)）。
- **#11074**（accepted）`search_routes` 提示词路由：镜像 `model_routes`，让不同搜索意图走不同 provider，已纳入计划（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/11074)）。
- **#11235**（RFC，needs-author-action）知识库 RAG 文档检索：agent 从操作者文档中检索回答，需作者补充信息后继续（[链接](https

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-10-13

## 1. 今日速览

项目在过去 24 小时内保持中等活跃度：5 条 Issue 更新、7 条 PR 动态，无新版本发布。维护者集中处理了 6 条 PR，其中 5 条为 3 月提交的历史外部贡献，覆盖 logger 配置、Termux 证书兼容、Gemini 工具调用兼容、飞书/Telegram 通道改进等方向，显示出维护者正在系统性地清理积压。社区侧新增 1 个缺陷报告（Telegram MarkdownV2）和 1 个功能提案（Plazmi MCP 集成），同时 OneBot 自动表情回复的诉求已完成从 Issue 到 PR 闭环。整体项目健康度良好，但存在一个 PR 被 CLA 流程问题阻塞的情况，值得关注。

## 2. 版本发布

今日无新版本发布。合并的 6 条 PR 预计将进入下一个版本周期，建议关注后续 Release 动态。

## 3. 项目进展

今日 6 条 PR 被合并/关闭，项目在以下方面取得实质推进：

- **OneBot 通道**：新增 `reaction_enabled` 配置项（默认关闭），控制群消息自动表情回复行为（[#3396](https://github.com/sipeed/picoclaw/pull/3396)）
- **日志系统**：logger 时间格式支持通过 config.json 配置，不再硬编码（[#1500](https://github.com/sipeed/picoclaw/pull/1500)）
- **Android/Termux 兼容性**：修复所有 LLM provider 在 Termux 上因系统 CA 证书池为空导致的 TLS 握手失败（[#1397](https://github.com/sipeed/picoclaw/pull/1397)）
- **OpenAI 兼容层**：对非 Google provider 剥离工具调用中的 `extra_content` 字段，修复 Gemini 扩展思维输出导致的 API 校验错误（[#1509](https://github.com/sipeed/picoclaw/pull/1509)）
- **飞书通道**：实现话题内线程隔离与回复嵌套，与 Telegram 通道行为对齐，防止上下文串扰（[#1676](https://github.com/sipeed/picoclaw/pull

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-13

## 今日速览

过去 24 小时 NanoClaw 无新 Issue、无新版本发布，6 条 PR 中有 2 条已合并/关闭、4 条待审查，整体处于**稳定维护期**。活跃度评估为**中等偏活跃**：虽无新问题涌入，但修复与集成工作持续推进——审批卡片线程修复、飞书消息误撤回修复均已落地，另有 OneCLI 兼容性修复与测试环境隔离 PR 待合入。社区侧出现 1 条添加第三方博客到 Community 板块的 PR，生态内容建设仍在继续。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日共有 **2 条 PR 被合并/关闭**，分别解决渠道集成与审批流程两个方向的问题：

- **#4080 审批卡片进入请求者自己的会话线程**（已合并）  
  修复了当审批请求（如 `ncl destinations-add` 等待管理员审批）发生在审批人自己的 DM 线程中时，卡片被投递到 DM 顶层、审批人看不到的问题。`requestApproval` 现在会将卡片正确加入对应线程。这是即时消息审批流的关键体验修复。  
  🔗 https://github.com/nanocoai/nanoclaw/pull/4080

- **#4079 飞书渠道修复：进度卡片误撤回 + 语音摘要模型读取 .env**（已合并）  
  修复了飞书群中“大狗撤回了一条消息”的误操作——原逻辑在 turn 结束后仅以折叠后的可见步骤判断是否有可见过程，导致工具执行完毕后卡片被误删。现改为用 `allSteps` 判断，并新增缺陷注入回归测试。同时 `VOICE_SUMMARY_MODEL` 改为调用时动态读取 `.env`，不再只读启动时的 `process.env`。  
  🔗 https://github.com/nanocoai/nanoclaw/pull/4079

此外，**#3674**（Teams 出站文件携带 mime type）这条已搁置 44 天的 PR 今日有新的更新活动，虽未合并，但重新进入维护者视线，值得关注。

---

## 社区热点

今日无 Issue 产生，社区讨论热度集中在 PR 上：

- **#4083 Add Sol AI to Community section**（⭐ 0，待审查）  
  外部开发者 @TheSolai 提交 PR，将自己运营的 AI Agent 博客（基于 OpenClaw 构建）添加到 NanoClaw 的 Community 板块。这反映出**社区成员希望将第三方实战资源聚合进项目官方推荐列表**的诉求，也侧面说明 NanoClaw/OpenClaw 的生态正在吸引内容创作者。  
  🔗 https://github.com/nanocoai/nanoclaw/pull/4083

- **#4082 与 4081** 虽无评论，但其内容涉及 OneCLI 升级（410 Gone 错误）与测试环境隔离，属于开发者群体普遍关心的**工具链稳定性**话题，预计合入讨论时会引起维护者关注。

---

## Bug 与稳定性

今日无新增 Bug Issue，但 PR 中暴露/修复了 3 个稳定性问题，按严重程度排列：

| 严重度 | 问题 | 状态 | 详情 |
|--------|------|------|------|
| 🔴 高 | **OneCLI 1.43+ 对 `agents set-secrets` 等 API 返回 `410 Gone`** | 有修复 PR（#4082 待合并） | 导致 OneCLI 安装无法从 1.42.0 临时版本升级，阻塞用户使用新版 agent grants API。修复为改用 OneCLI agent grants API 并将 gateway 版本固定至 1.45.0。 |
| 🟠 中 | **飞书工具执行完毕后进度卡片被误撤回**（4 号群频繁出现“大狗撤回了一条消息”） | 已修复（#4079 已合并） | 根因：turn 结束后折叠 steps 仅剩旁白，`hasVisibleProcess` 误判为无可见过程。 |
| 🟡 低 | **测试环境变量污染**：`scripts/update-skills.test.ts` 受调用者环境中 `NANOCLAW_REGISTRY_REMOTE` / `NANOCLAW_CHANNELS_REMOTE` 影响 | 有修复 PR（#4081 待合并） | 端到端刷新测试未清理这些环境变量，导致本地开发测试不稳定。 |

🔗 相关链接：
- Bug 修复 PR #4082：https://github.com/nanocoai/nanoclaw/pull/4082
- Bug 修复 PR #4079：https://github.com/nanocoai/nanoclaw/pull/4079
- 测试修复 PR #4081：https://github.com/nanocoai/nanoclaw/pull/4081

---

## 功能请求与路线图信号

今日无新 Issue 形式的请求，但从 PR 中可以读到以下路线图信号：

1. **即时通信渠道体验持续打磨**（大概率进入下一版本）  
   今日两条已合并 PR 均围绕渠道体验：审批卡片线程归属（#4080）、飞书消息撤回误判（#4079）。加上待合并的 Teams mime type 修复（#3674），说明**多 IM 渠道的适配是当前迭代重心**。

2. **OneCLI 依赖升级是近期必经之路**  
   #4082 明确为“让 OneCLI 安装脱离 1.42.0 临时版本”，涉及 agent grants API 迁移。如果 1.45.0 验证稳定，这项升级很可能随下个版本发布。

3. **社区内容建设**  
   #4083 若被合并，Community 板块将迎来首个外部实践博客，暗示项目已开始有意扩充生态推荐位，为后续扩大社区影响力做铺垫。

---

## 用户反馈摘要

虽然今日无 Issue 评论，但从 PR 描述中可以提炼真实用户场景：

- **飞书群日常使用痛点**（来自 #4079）：4 号群频繁看到“大狗撤回了一条消息”，实际上就是进度卡片在工具跑完后被误撤。用户的实际体验是“刚跑完工具就看不到执行过程了”。这暴露出折叠逻辑在真实多轮场景中的判断缺陷。
- **OneCLI 用户升级受阻**（来自 #4082）：用户在尝试使用 OneCLI 1.43+ 的新 API 时遇到 `410 Gone`，这是服务端废弃旧接口未兼容旧客户端导致的典型问题，且因 gateway 版本固定而无法绕过。
- **Teams 渠道文件传输兼容性**（来自 #3674）：出站文件因缺少 mime type 被 Teams 拒绝，说明 Teams 渠道的字节流处理还不够健壮，至今已搁置 44 天，用户等待时间较长。

---

## 待处理积压

| 项目 | 创建时间 | 等待时长 | 说明 |
|------|---------|---------|------|
| **#3674 fix(delivery): carry a mime type on outbound files so Teams accepts them** | 2026-08-30 | **44 天** | 核心渠道功能修复，今日有更新活动但未合并，可能是评审流程推进较慢，建议维护者优先跟进。🔗 https://github.com/nanocoai/nanoclaw/pull/3674 |
| **#4082 OneCLI agent grants API 迁移与 gateway 版本升级** | 2026-10-12 | 1 天 | 影响用户从 1.42.0 升级的阻塞问题，修复方案明确，建议尽快 review。🔗 https://github.com/nanocoai/nanoclaw/pull/4082 |
| **#4081 测试环境隔离** | 2026-10-12 | 1 天 | 对开发者体验有直接改进，改动小，风险低，可快速合入。🔗 https://github.com/nanocoai/nanoclaw/pull/4081 |

---

**总结**：NanoClaw 当前处于一个“高修复、零新增问题”的健康窗口期，渠道层（飞书、Teams、审批）的稳定性投入明显，OneCLI 的升级换代是短中期内的关键路径。社区新增外部资源 PR 表明生态在萌芽。建议维护者节奏上优先处理 #4082 与 #3674，以尽快解除用户侧的两个功能阻塞。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-13


## 1. 今日速览

过去 24 小时项目活跃度较低，属于稳定的日常维护期。共新增/更新 2 条 Issue，无 PR 变动，无新版本发布。两条 Issue 分别指向**扩展机制的功能提案**（#8136）与**每日基准测试失败分类报告**（#8135），后者报告了 52 个非通过基准任务，且初步分析显示全部为模型质量问题而非代码缺陷。项目整体健康度良好，社区讨论集中在扩展性设计方向与质量评估体系上，无紧急回归或安全事件。


## 2. 版本发布

过去 24 小时内无新版本发布。


## 3. 项目进展

今日无合并或关闭的 PR，没有代码层面的功能推进。项目当前处于功能稳定期，公开活动集中于 Issue 讨论与质量评估层面。

值得关注的是，社区通过 Issue 持续提供设计输入（#8136），这类反馈正在为下一轮功能迭代积累需求素材，虽无代码合入，但对项目路线图有潜在推动作用。


## 4. 社区热点

今日仅有的两条 Issue 均为新开，尚无评论或反应，讨论热度尚未形成。

| Issue | 类型 | 要点 |
|---|---|---|
| [#8136 Proposal: optional hosted-MCP Plazmi extension using declarative auth and egress](https://github.com/nearai/ironclaw/issues/8136) | 功能提案 | 基于 Reborn 扩展指南中已有的声明式托管 MCP 元数据 + API-key 认证 + egress 配置缝隙，为可选的 [Plazmi](https://plazmi.gg) 伴生组件提供支持，避免在宿主中引入厂商逻辑。 |
| [#8135 Daily ironclaw failure taxonomy — 2026-10-12](https://github.com/nearai/ironclaw/issues/8135) | 质量评估 | 针对 officeqa 基准套件的 52 个非通过任务进行分析，结论为全部属于模型质量错误（DeepSeek-V4-Flash 相关），并非框架缺陷。 |

两条 Issue 分别代表了社区对**扩展性设计**（#8136）和**质量可观测性**（#8135）两方面的关注——前者体现了用户希望在不污染核心代码的前提下扩展能力的诉求；后者展示了项目所建立的日常质量评估机制正在持续运转。


## 5. Bug 与稳定性

今日无新增 Bug 报告。Issue #8135 报告的 52 个非通过基准任务经初步分析确认均为模型质量问题（DeepSeek-V4-Flash 输出错误），不涉及 IronClaw 框架本身的缺陷或回归。无需修复 PR。


## 6. 功能请求与路线图信号

**唯一功能信号：**[#8136](https://github.com/nearai/ironclaw/issues/8136) — 请求在现有扩展机制（declarative extension surfaces）之上允许接入可选的托管 MCP Plazmi 伴生组件，利用已有的声明式认证和 egress 配置，而不是在宿主中硬编码厂商逻辑。

该提案具有以下特点：

- 遵循项目现有的扩展模式（extension guidance），没有引入新的架构范式；
- 明确限定为“单独安装的扩展”（separately installed extension），对核心宿主零侵入；
- 如果维护者认可该方向，实现成本可能较低（复用现有 seam），并可能作为项目扩展生态丰富度的一个正向案例。

是否纳入下一版本取决于维护团队对 Plazmi 生态价值的判断，但提案本身的设计思路与项目架构理念一致，值得关注。


## 7. 用户反馈摘要

虽然两条 Issue 暂无用户评论，但从 Issue 本身可以提炼出以下用户诉求：

- **扩展生态需求（#8136）：** 用户希望 IronClaw 能承载更多第三方 MCP 服务，但**核心诉求不是“接入 Plazmi 本身”**，而是“在现有声明式扩展机制上就能接入，不需要改宿主代码”。这反映了用户对架构整洁性和可扩展性的重视。
- **质量透明度需求（#8135）：** 用户以日报形式持续公开基准测试失败分类结果，说明社区对模型质量与框架质量的边界有清晰的认知诉求，希望了解失败的责任归属（框架 vs. 模型）。


## 8. 待处理积压

当前无长期未响应的 Issue 或 PR。今日两条 Issue 均为新创建，处于等待社区/维护者回复的初始阶段。此前积累的基准失败分类系列报告（如 #8135）值得维护者持续跟踪：如果该系列报告持续产出且非通过任务数量呈上升趋势，建议汇总分析模型更新的质量波动，必要时与模型提供商同步问题。


---
*本日报基于 2026-10-13 的 GitHub 公开数据自动生成，仅供项目健康度参考。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-13

> 数据来源：[github.com/netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI) | 统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时项目活跃度处于**中等偏上**水平：PR 更新 12 条，其中 9 条已被合并/关闭，合并节奏较快；Issues 更新 2 条，一开一关，社区讨论热度一般。今日无新版本发布，主要工作集中在 **UI/UX 打磨**（agent 头部、会话标题、artifact 预览）与 **平台兼容性修复**（Intel Mac 支持、MCP 桥退出逻辑）。值得关注的是，外部第三方评测组织主动提交收录邀请（#2801），以及一个 main 分支上的安全漏洞被报告并关闭（#2793），两者均反映出项目受到外部开发者与安全研究者的持续关注。

---

## 2. 版本发布

今日无新版本发布（最新 Releases 为空）。

---

## 3. 项目进展

今日合计 **9 条 PR 被合并/关闭**，覆盖功能新增、Bug 修复与发布流程。重要推进如下：

- **[#2843 Release/2026.9.24](https://github.com/netease-youdao/LobsterAI/pull/2843)** — 2026.9.24 版本发布分支合并，覆盖 renderer/build/docs/main/openclaw/skills/cowork/im 等多个模块，是近期功能集中交付的标志性合并。
- **[#2844 feat(computer-use): support Intel Macs with a mac-x64 runtime](https://github.com/netease-youdao/LobsterAI/pull/2844)** — 为 Computer Use 新增 `mac-x64` 运行时（0.2.2），补齐 Intel Mac（含 Rosetta 环境）支持；此前仅提供 `win-x64` 和 `mac-arm64`，Intel Mac 用户在 Kit 市场中无法看到该能力。这是平台覆盖范围的重要补全。
- **[#2845 fix(computer-use): exit the MCP bridge when its stdio closes](https://github.com/netease-youdao/LobsterAI/pull/2845)** — 修复 MCP 网关崩溃（crash loop/SIGKILL）后 stdio MCP server 无法收到信号退出的问题；现在 stdin 关闭即退出，避免僵尸进程残留。
- **[#2840 feat(agent): polish agent header and add double-click task rename](https://github.com/netease-youdao/LobsterAI/pull/2840)** — 移除已不可达的 emoji 头像渲染分支（自 2026.5.9 起统一使用 SVG 头像），并为任务新增双击重命名交互。
- **[#2846 feat(cowork): generate titles for new desktop sessions](https://github.com/netease-youdao/LobsterAI/pull/2846)** — 新桌面会话根据首条提问异步生成简短标题，失败静默保留原标题，不阻塞对话。
- **[#2841 fix(artifacts): let zoomed image, SVG and Mermaid previews pan to every edge](https://github.com/netease-youdao/LobsterAI/pull/2841)** — 修复放大后的图片/SVG/Mermaid 预览无法平移至左侧/边缘的问题（transform-origin + overflow-auto 容器的经典坑）。
- **[#2842 feat(cowork): hide per-turn credits chip until the breakdown is reworked](https://github.com/netease-youdao/LobsterAI/pull/2842)** — 暂时隐藏每轮积分显示（如 "21.78 积分"），因当前统计口径未反映图像生成成本，待拆解逻辑重做后再开放。

综合来看，项目今日在 **桌面端体验** 与 **Computer Use 能力覆盖** 两个方向上前进了一小步，且通过 Release 分支合入为下一正式版本蓄力。

---

## 4. 社区热点

- **[Issue #2801 [OPEN] 第三方 agent harness 榜单免费收录邀请](https://github.com/netease-youdao/LobsterAI/issues/2801)** — 今日最活跃的 Issue。Nautilus 组织于 10/12 上线公开 harness 榜单，主动为 LobsterAI 提供免费 L1 收录位（判据预注册 + 独立判读 + 复现命令），点名 LobsterAI 为"国产代表位"。评论 2 条，👍 0。
  - **诉求分析**：第三方评测基础设施希望借助知名开源项目建立公信力，而 LobsterAI 作为 6.1k star 的国产开源项目被选中，侧面说明其行业代表性已获外部认可。对项目方而言是低成本获取独立第三方评测背书的机会。
- **[Issue #2793 [CLOSED] 技能卸载时可致任意目录删除的安全漏洞](https://github.com/netease-youdao/LobsterAI/issues/2793)** — 由安全研究者报告，影响 main 分支，v0.2.4 不受影响。虽然已关闭，但评论仅 1 条，建议后续跟进确认修复方式与披露细节。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | 说明 |
|--------|------|------|------|
| 🔴 高危 | [Skill-controlled metadata 可导致卸载技能时删除任意目录（#2793）](https://github.com/netease-youdao/LobsterAI/issues/2793) | 已关闭（10/12） | 仅影响 `main` 分支，最新标签 v0.2.4 不受影响。涉及 `openclawSourceDir` 字段与 `ipcHandlers/skills/handlers.ts`。未在该 Issue 中看到对应修复 PR 引用，需确认关闭原因（已修复 / 标记为已知问题）。 |
| 🟠 中危 | [IM 后台累加器销毁时抛异常导致 `IMCoworkHandler.destroy()` 崩溃（#2850，修复 #926）](https://github.com/netease-youdao/LobsterAI/pull/2850) | 待合并 | 修复方案为对累加器 rejection callback 使用可选调用。属崩溃类问题，但影响面限于 IM 协作处理器销毁路径。 |
| 🟠 中危 | [Computer Use MCP bridge 在网关崩溃后不退出，残留进程（#2845）](https://github.com/netease-youdao/LobsterAI/pull/2845) | 已合并 | 进程生命周期问题，POSIX 下 stdin 关闭即退出，避免 SIGKILL/crash loop 场景下的僵尸进程。 |
| 🟡 低危 | [Zoomed 图片/SVG/Mermaid 预览无法平移至边缘（#2841）](https://github.com/netease-youdao/LobsterAI/pull/2841) | 已合并 | UI 交互缺陷，transform scale 不扩展滚动边界所致，已修复。 |

---

## 6. 功能请求与路线图信号

- **[PR #2849 [OPEN] feat(experts): configurable expert plaza and summon flow](https://github.com/netease-youdao/LobsterAI/pull/2849)** — 引入可配置的 **Expert Plaza**（专家广场），用户可发现并召唤任务专用 Agent；Kits 统一移入共享 Kits/Skills/Connectors 目录，内容通过 Overmind + 版本化 CDN 目录分发。这是 Agent 生态的一项重要演进信号，若合入，下一版本可能具备"可远程发现与加载专家"的能力。
- **[PR #2848 [CLOSED] feat: open with](https://github.com/netease-youdao/LobsterAI/pull/2848)** — 文件关联/“打开方式”集成，增强桌面端与操作系统文件管理器的互操作。
- **[PR #2847 [CLOSED] feat: desktop companion composer](https://github.com/netease-youdao/LobsterAI/pull/2847)** — 桌面端 Companion 模式下的 Composer（输入区）能力。
- **[PR #2846](https://github.com/netease-youdao/LobsterAI/pull/2846) 的异步标题生成** 与 **[PR #2840](https://github.com/netease-youdao/LobsterAI/pull/2840) 的任务双击重命名** 表明团队正在系统性打磨桌面交互细节，属于体验优化优先级较高的阶段。

结合 Release/2026.9.24 分支合并与 Expert Plaza 的新功能 PR，下一版本的方向可能是 **Agent/Expert 可扩展生态 + 桌面体验精致化** 双线并行。

---

## 7. 用户反馈摘要

- **外部评测机构主动收录（#2801）**：Nautilus 组织在 Issue 中表达了希望将 LobsterAI 收录进其公开 harness 榜单的意愿，并强调"结果好坏都可引用、不收费"。这代表外部专业机构对项目技术栈与社区地位的正面认可，也隐含用户对 **第三方可复现评测** 的需求。
- **安全研究者的关注（#2793，已关闭）**：报告者 @carfeii 精确指出受影响版本、commit hash 与模块，属于高质量漏洞报告。说明已有外部安全研究者对 main 分支进行代码审计，项目需在安全响应透明度上保持开放态度（例如在关闭 Issue 时补充修复说明）。
- 内部用户在 Artifact 预览放大平移问题（#2841）上有直接反馈："zooming an image to 160% 后左侧无法触达"，该问题已在同日修复并合并，响应速度值得肯定。

---

## 8. 待处理积压

- **[PR #2672 chore(deps): bump mermaid from 10.9.8 to 12.1.0](https://github.com/netease-youdao/LobsterAI/pull/2672)** — Dependabot 自动依赖升级 PR，已开启 **约 1 个月**（创建于 09/14），最新更新 10/12。Mermaid 跨大版本升级（10 → 12）涉及渲染行为变更，建议维护者安排 review，避免长期滞后导致依赖链安全/兼容性风险。
- **[PR #2850 fix(im): safely destroy background accumulators](https://github.com/netease-youdao/LobsterAI/pull/2850)** — 修复崩溃类问题（#926），今日新开，处于待合并状态。
- **[PR #2849 feat(experts): configurable expert plaza and summon flow](https://github.com/netease-youdao/LobsterAI/pull/2849)** — 涉及多模块（renderer/docs/main/cowork）的新功能，改动面较大，需要充分的 review 与测试。

---

*报告生成时间：2026-10-13 | 数据窗口：过去 24 小时 | 数据源：LobsterAI GitHub 仓库公开数据*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-10-13

## 1. 今日速览

过去 24 小时内，Moltis 项目保持中等活跃度：新增 1 个 **安全相关 Issue**（访问策略绕过），新提交 2 个 **功能增强 PR**（暂未合并），无新版本发布。当前 PR 队列为空闲后重新积累的状态，两个 PR 均围绕 **agent 权限边界与行为一致性** 展开，与本日 Issue 暴露的安全问题形成呼应，说明项目正处于安全加固与权限治理的演进阶段。整体项目健康度良好，Issue 响应及时，PR 方向与社区反馈高度一致。

---

## 3. 项目进展

今日 **无 PR 被合并或关闭**，因此没有可直接衡量的新增功能落地。但两个新提交的 PR 清晰展现了项目下一步的技术路线：

| PR | 核心内容 | 影响范围 |
|---|---|---|
| [#1301](https://github.com/moltis-org/moltis/pull/1301) | 对齐 chat 与 sub-agent 两条路径：persona、`system_prompt_suffix`、`delegate_only`、预设模型等字段在两种模式下行为一致 | 消除同一 agent 在直接聊天与被子 agent 调用时的行为差异，有益于 coordinator/worker 架构 |
| [#1302](https://github.com/moltis-org/moltis/pull/1302) | 为 `agents.presets.<id>` 新增可选 `spawn.allow` 白名单，限制 `spawn_agent` 只能生成到指定 preset；在 `resolve_preset` 阶段强制校验，并动态裁剪工具 schema/描述 | 提供细粒度的 agent 生成权限控制，支撑 org-chart / 协调者拓扑 |

**项目向前推进的判断**：这两个 PR 分别从 **行为一致性** 和 **安全边界** 两个维度完善 agent 治理能力。结合 Issue #1303 暴露的访问策略绕过问题，可以认为 Moltis 正在向 **多 agent 场景下的企业级权限模型** 演进，即使今日无合并动作，代码方向已十分明确。

---

## 4. 社区热点

今日没有出现高评论量、高反应的讨论帖（评论数均为 0），但仍有两个值得关注的交叉热点：

- **[#1303 访问策略绕过 Issue](https://github.com/moltis-org/moltis/issues/1303)** — 由 @texxronn 提交，指出非网关 turn 在 channel-bound 会话上运行时，回复被直接投递到频道，**绕过账号的 chat 访问策略**，且 Web UI 无任何警告。这属于安全类问题，虽然评论不多，但性质严重，是社区需要优先回应的信号。
- **[#1302 spawn.allow 权限控制 PR](https://github.com/moltis-org/moltis/pull/1302)** — 实际上为 Issue #1303 这一类权限边界问题提供了 **预防性机制**。Issue 暴露漏洞，PR 提供白名单能力，二者时间上几乎同时出现，表明社区对 **agent 权限最小化** 的需求正在浮出水面。

背后的共同诉求是：**Moltis 在多会话、多 agent 场景下，需要一套明确且可强制执行的访问控制模型**，不能因为会话来源不同（web/cron/webhook/sessions_send）而出现安全语义的漂移。

---

## 5. Bug 与稳定性

今日仅报告 1 个 Bug，按严重程度排序如下：

| 严重程度 | Issue | 描述 | 状态 |
|---|---|---|---|
| **高（安全）** | [#1303](https://github.com/moltis-org/moltis/issues/1303) | 非网关 turn（web UI / cron / webhook / `sessions_send`）运行在 **channel-bound 会话** 上时，回复被投递到频道内，绕过账号的 chat 访问策略；且 Web UI 无任何警示 | 待修复，暂无 fix PR。但 [#1302](https://github.com/moltis-org/moltis/pull/1302) 的 `spawn.allow` 白名单机制可在一定程度上缓解同类问题 |

**风险提示**：这是一个 **权限边界（authorization boundary）** 的漏洞，攻击面不限于 web UI——任何可触发非网关 turn 的入口都可能受影响。建议优先确认其影响范围，并考虑在修复前临时限制 channel-bound 会话的非网关 turn 行为。

---

## 6. 功能请求与路线图信号

今日没有用户明确提出的新功能请求，但从 PR 和 Issue 中可以提炼出以下路线图信号：

- **Agent 权限白名单（大概率进入下一版本）** — [#1302](https://github.com/moltis-org/moltis/pull/1302) 的 `spawn.allow` 设计已经具体到配置结构和校验位置，且作者在描述中写到 "Depends on..."（依赖项），说明这是一系列权限功能的第一块积木，后续可能扩展出 `spawn.deny`、角色继承等能力。
- **Chat 与 sub-agent 行为一致性（潜力功能）** — [#1301](https://github.com/moltis-org/moltis/pull/1301) 涉及 `delegate_only` 和预设模型等字段的双路径对齐，这意味着 Moltis 正在明确 "agent 自身身份" 与 "作为子代理被调用" 的语义边界。这可能是为更复杂的多 agent 编排做准备。
- **安全问题驱动 UI 改进（可能被纳入）** — Issue #1303 中提到 "without any web UI warning"，如果修复方案包含 UI 层面的风险提示，这将成为 Web UI 的一个增强点。

综合来看，**权限控制（#1302）** 最有可能被纳入下一个版本，**行为一致性（#1301)** 次之，UI 安全警告则取决于 #1303 的修复策略。

---

## 7. 用户反馈摘要

今日评论量为 0，但 Issue #1303 本身包含了有价值的用户反馈：

- **核心痛点**：@texxronn 发现 web turn 在 channel-bound 会话上的行为与预期严重不符——上下文被降级为 public（无工具、无私有上下文）可以接受，但 **回复被发送到频道内** 是不可接受的。这暴露了 "降级执行" 与 "结果投递" 之间的语义割裂：虽然限制了工具和上下文，但输出通道却没有被相应隔离。
- **使用场景**：用户显然在运行 web UI / cron / webhook 等多入口与频道绑定的会话，并且依赖 chat 访问策略来区分不同账号的权限边界。当前的设计让这些边界可以被轻易绕过。
- **满意/不满意**：对 "降级到 public context" 的机制表示理解（"intended"），但对 **输出缺少同等保护** 明确不满意，且对 UI 无警告表示担忧。

这类反馈的隐含期望是：**安全语义应当是一致且可预期的**——输入端降级，输出端也应当降级或阻断，而不是静默投递。

---

## 8. 待处理积压

今日所有 Issues/PRs 均为最近 24 小时内创建或更新，**没有长期未响应的重要积压项**。但有两个 PR 需要维护者关注：

- **[#1301 Chat ↔ sub-agent parity](https://github.com/moltis-org/moltis/pull/1301)** — 创建 2026-10-12，已过一天等待 review，涉及行为对齐，可能需要详细测试确认没有破坏现有 coordinator/worker 设置。
- **[#1302 Preset spawn.allow](https://github.com/moltis-org/moltis/pull/1302)** — 创建 2026-10-12，作者标注了依赖项，需确认其基座 PR 的状态，并评估与 [#1303](https://github.com/moltis-org/moltis/issues/1303) 安全问题的配合修复计划。

另外，**Issue #1303 目前没有 assignee，也无人评论**，作为安全相关的高严重度问题，建议维护者尽快在 issue 中给出初步确认和回应时间表，避免用户对项目安全响应能力失去信心。

---

> 本报告基于 2026-10-12 至 2026-10-13 的 GitHub 数据生成，所有链接指向 Moltis 官方仓库。数据来源：github.com/moltis-org/moltis

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-10-13

## 1. 今日速览

过去 24 小时项目活跃度处于**高位**：共产生 18 条 Issue 更新（16 条新开/活跃、2 条关闭）和 31 条 PR 更新（23 条待合并、8 条已合并/关闭），无新版本发布。社区反馈响应速度较快，多个新报 Bug 在当天即获得对应修复 PR（如 #8174 → #8204、#8179 → #8198、#8194 → #8196、#8177 → #8197、#8105 → #8188）。值得注意的是，Windows 平台稳定性问题（文件句柄占用、日志轮转失效、liveness 探测异常）正在成为当前最集中的用户痛点，另有约 6 个较新 Bug 尚未出现对应修复 PR，建议维护者优先跟进。

## 3. 项目进展

今日共有 8 个 PR 被合并/关闭，主要集中在**审批流程修复、上下文管理优化、Creator 插件发布和官网内容更新**：

- **fix(approval): preserve decisions and handle timeout races**（[#8188](https://github.com/agentscope-ai/QwenPaw/pull/8188)，已关闭）— 修复工具审批竞态条件：用户点击审批时若工具尚未进入等待状态，决定可能丢失并导致“同意被执行为拒绝”。该 PR 关闭了 Issue [#8105](https://github.com/agentscope-ai/QwenPaw/issues/8105)。
- **fix(context): reclaim active results earlier and verify overflow recovery**（[#8193](https://github.com/agentscope-ai/QwenPaw/pull/8193)，已关闭）— 优化长对话上下文压缩策略：此前已消费的 active 工具结果仅在超出硬限制后才被折叠，导致可回收输出持续累积；现改为更早回收，并以测试验证溢出恢复路径。
- **feat(creator): release 2.0.1 with controlled media production**（[#8121](https://github.com/agentscope-ai/QwenPaw/pull/8121)，已关闭）— QwenPaw Creator 插件发布 2.0.1，仅携带上一个上游 release 之后完成的插件工作，版本从 1.3.0 升至 2.0.1。
- **fix(task_tracker): register run only after the producer task exists**（[#8007](https://github.com/agentscope-ai/QwenPaw/pull/8007)，已关闭）— 修正 TaskTracker 记账逻辑：此前使用占位 Future 提前注册 run，若任务创建失败会留下错误记录。
- 另有 3 条官网博客更新类 PR 合并（[#7806](https://github.com/agentscope-ai/QwenPaw/pull/7806)、[#6701](https://github.com/agentscope-ai/QwenPaw/pull/6701)、[#6548](https://github.com/agentscope-ai/QwenPaw/pull/6548)），无功能变更。

整体来看，项目今日在**关键 Bug 修复**和**稳定性加固**上前进了一步，但仍有 23 个 PR 等待合并，其中多个修复对应着活跃 Issue。

## 4. 社区热点

今日讨论最活跃的条目如下：

- **[#8174 [Feature] web_search 内置 tavily provider 无 API-key 配置入口——付费配额不可用](https://github.com/agentscope-ai/QwenPaw/issues/8174)**（4 评论）— 用户指出内置 `web_search` 的 tavily provider 始终以 keyless 模式发起请求，持有付费 Tavily 订阅的用户无法消耗自有配额。这是当前社区呼声最高的配置能力缺口，已直接催生 PR [#8204](https://github.com/agentscope-ai/QwenPaw/pull/8204)。
- **[#7016 [Bug] 工具调用 404](https://github.com/agentscope-ai/QwenPaw/issues/7016)**（4 评论）— 2.1.0 版本流式会话时页面持续调用 offload 接口返回 404 "Tool call not found"。该 Issue 已存在约 2 个月仍未关闭，今日仍有更新，是典型的**长期未解决积压 Bug**。
- **[#8172 [Bug] Console 聊天间歇性静默空完成——回合约 1 秒结束、output 为空、模型从未被调用](https://github.com/agentscope-ai/QwenPaw/issues/8172)**（3 评论）— Docker/NAS 部署 2.2.0，console 渠道聊天时偶发“模型从未被调用但 run 正常结束”的空响应，前端无任何回复，影响可感知。
- **[#8073 [Bug] V2.2.2.beta4 无法访问会话页面](https://github.com/agentscope-ai/QwenPaw/issues/8073)**（3 评论，已关闭）— 局域网其他设备访问本地服务时 Chat 页面报错。今日关闭，但关闭原因未在数据中体现。
- **[#8206 [Bug] qwenpaw-creator 在 Windows 上项目删除必然失败（WinError 5：包含已打开 creator.log 的项目目录无法重命名）](https://github.com/agentscope-ai/QwenPaw/issues/8206)**（1 评论，新开）— 新上报的 Windows 平台删除功能硬失败问题，直接暴露了 Windows 文件句柄管理缺陷。

**背后诉求**：高讨论度条目主要指向三个方向——（1）用户希望为自带服务接入自有凭据（Tavily API key）；（2）Windows 平台在文件操作、进程探测、日志轮转上的体验与 Linux 存在明显差距；（3）对话/工具调用链路在真实部署环境中的偶发空响应问题被反复触发。

## 5. Bug 与稳定性

按严重程度排列今日活跃 Bug：

| 严重度 | Issue | 描述 | Fix PR |
|---|---|---|---|
| **高** | [#8172](https://github.com/agentscope-ai/QwenPaw/issues/8172) | Console 聊天间歇性静默空完成：run 约 1 秒结束、无输出、模型从未被调用 | 无 |
| **高** | [#8206](https://github.com/agentscope-ai/QwenPaw/issues/8206) | Windows 上项目删除必然失败：项目目录含已打开的 creator.log，重命名报 WinError 5 | 无 |
| **高** | [#8179](https://github.com/agentscope-ai/QwenPaw/issues/8179) | 从 GitHub 安装 skill 会静默破坏二进制文件：所有非 UTF-8 字节被替换为 U+FFFD，图片/字体不可读 | ✅ [#8198](https://github.com/agentscope-ai/QwenPaw/pull/8198) |
| **中** | [#8194](https://github.com/agentscope-ai/QwenPaw/issues/8194) | qwenpaw-creator 启动中止：`os

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