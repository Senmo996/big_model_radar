# OpenClaw 生态日报 2026-10-06

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-06 03:43 UTC

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

# OpenClaw 开源项目动态日报 — 2026-10-06

## 1. 今日速览

过去 24 小时 OpenClaw 项目保持极高活跃度：Issue 与 PR 更新各达 500 条，其中新开/活跃 Issue 419 条、待合并 PR 370 条，释放了 1 个新 beta 版本（v2026.10.1-beta.1）。社区讨论高度聚焦于 **prepared-model-catalog worker 内存泄漏**（多个 P0 级 issue，RSS 增长至 8–13 GiB）与 **update 流程验证/回滚失败**（多个 P0 级 issue，影响用户升级路径）。当前项目健康度整体可控但稳定性承压：内存泄漏、更新失败、Windows 兼容性构成三大风险群，WebUI 性能与记忆系统（short-term recall）为次级热点。值得注意的是，今日有 2 个 P0 级 issue 关闭（#158095、#161953），表明部分关键修复已落地。

---

## 2. 版本发布

### v2026.10.1-beta.1
- **发布日期**：2026-10-06
- **Release 链接**：https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.1

**更新内容（Highlights）**：
- **Sessions 与记忆**：修复注册表变更后会话与记忆保留丢失的问题；支持从远程工作区交付 worker 附件；阻止排队取消和转录别名阻塞活跃对话轮次；保持续签签名一致性；迁移 embedding 缓存。

**破坏性变更**：无明确标注。
**迁移注意事项**：涉及 embedding 缓存迁移，升级后首次启动可能触发后台迁移任务，建议在低峰期操作并预留磁盘空间。会话注册表逻辑有调整，建议升级前备份 `~/.openclaw` 目录。

---

## 3. 项目进展

今日无新合并 PR 的明确标注，但以下已关闭的 P0 issue 暗示相关修复已合入主分支，标志着关键稳定性问题的突破：

### 关键修复落地

| Issue | 问题描述 | 状态 | 影响 |
|-------|---------|------|------|
| [#158095](https://github.com/openclaw/openclaw/issues/158095) | Gateway worker 在 `acquireSqliteWorkerLifecycle` 后状态生命周期残留，导致后续所有 acquire 失败直至重启 | CLOSED | P0 级崩溃循环的根因修复 |
| [#161953](https://github.com/openclaw/openclaw/issues/161953) | Windows 上 `sessions.create` 因 `\\?\` SQLite 路径泄漏进创建发布守卫而必定失败 | CLOSED | 修复 Windows 平台会话创建完全不可用的问题 |
| [#161734](https://github.com/openclaw/openclaw/issues/161734) | `doctor --fix` 对未变更的存档重复执行昂贵的准入检查（两事务/每存档） | CLOSED | 性能优化，降低诊断修复耗时 |
| [#164459](https://github.com/openclaw/openclaw/issues/164459)、[#147160](https://github.com/openclaw/openclaw/issues/147160)、[#148681](https://github.com/openclaw/openclaw/issues/148681) | 多个 update 失败（`finalize:doctor`、`update-executor-settlement`） | CLOSED | 更新链路稳定性修复 |

### 值得关注的待合并修复（已就绪，等待维护者审查）

以下 PR 已标记 **"ready for maintainer look"**，验证充分，有望在近期合并：

| PR | 内容 | 优先级 | 影响域 |
|----|------|--------|--------|
| [#165909](https://github.com/openclaw/openclaw/pull/165909) | perf(sessions): worker 退休后复用分支摘要，避免长对话全量重扫（handler 均值 707ms 优化） | P2 | 性能 |
| [#165932](https://github.com/openclaw/openclaw/pull/165932) | perf(sessions): 无关子代理更新时复用未变更的 sessions.list 行快照 | P2 | 性能 |
| [#165923](https://github.com/openclaw/openclaw/pull/165923) | perf(plugins): 跨调用复用插件实例身份对象，减少重复分配 | P3 | 性能 |
| [#165806](https://github.com/openclaw/openclaw/pull/165806) | fix: 桌面端流在 Gateway 未确认关闭时不再挂起 | P2 | 稳定性 |
| [#165902](https://github.com/openclaw/openclaw/pull/165902) | fix: 使用 patched `source-map-js` 解除 CI 安全审计阻塞 | P2 | CI/工程 |

**整体判断**：项目在性能优化（session 读取路径）和稳定性修复（桌面流、Windows 兼容）上持续投入；但 P0 级内存泄漏（prepared-model-catalog）仍处于修复中，未见对应 fix PR 合并。

---

## 4. 社区热点

### 热点 Issue TOP 5

| Issue | 评论数 | 核心诉求 |
|-------|--------|---------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) — Agent SQLite WAL 增长至 1.4–2.8 GB，阻塞 Gateway 启动（Windows） | 108 | 数据存储稳定性；checkpoint 机制失效；影响生产可用性 |
| [#149361](https://github.com/openclaw/openclaw/issues/149361) — WebUI 性能与稳定性 Umbrella Issue | 50 | WebUI 在桌面和移动端卡顿、历史加载异常、连接重连问题 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) — 同步 Agent 持久化与转录维护阻塞 Gateway 事件循环 | 23 | 高负载下事件循环阻塞，影响所有会话响应 |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) — 插件生成中途 supersede 杀死系统 Agent 回合与 planner 回退 | 21 | MCP 配置热加载导致回合异常终止，用户被误导执行 `openclaw onboard` |
| [#150635](https://github.com/openclaw/openclaw/issues/150635) — 短期记忆召回条目被夜间逐出，dreaming deep phase 永远无法促进 | 18 | 记忆系统核心机制失效，512 条上限导致死锁 |

### 热点 PR 概览

| PR | 状态 | 关注点 |
|----|------|--------|
| [#154043](https://github.com/openclaw/openclaw/pull/154043) — per-request MCP header provider | OPEN / ready | 解决 221 次重编目录/222 次运行的目录失效问题 |
| [#165370](https://github.com/openclaw/openclaw/pull/165370) — session reader 化工具权限指纹 | OPEN / ready | 减少 Gateway 线程 session 状态读取 |
| [#165801](https://github.com/openclaw/openclaw/pull/165801) — Tlon 群 DM 作者伪造修复 | OPEN / P0 | 安全边界：组内任意成员可伪装 owner |

**分析**：社区热度最高的议题集中于 **数据存储可靠性**（WAL 增长）与 **内存管理**（worker 泄漏），这两类问题直接影响用户日常使用的稳定性。WebUI 性能是另一个被高频提及的体验瓶颈。安全类 issue（Tlon 权限伪造、模型身份伪造）虽然评论数不高，但 P0 标记暗示潜在影响面较大。

---

## 5. Bug 与稳定性

### P0 级（严重，影响核心功能可用性）

| Issue | 问题 | 是否有 fix PR |
|-------|------|--------------|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL 无界增长至数 GB（Windows），阻断 Gateway 启动 | ❌ 无 |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | `prepared-model-catalog.worker.js` 内存泄漏 4–5 GB/h（provider-agnostic） | ❌ 无 |
| [#160548](https://github.com/openclaw/openclaw/issues/160548) | 2026.9.6 中 prepared-model-catalog worker 泄漏 ~1 GiB/5min，回收时杀死所有等待中的 turn | ❌ 无 |
| [#159596](https://github.com/openclaw/openclaw/issues/159596) | Gateway 内存锯齿波：worker 涨至堆上限触发 ~200 次/天 critical 事件 | ❌ 无 |
| [#164074](https://github.com/openclaw/openclaw/issues/164074) | 原生更新在 retained 包指纹变化后卡在 publication-complete | ❌ 无 |
| [#157319](https://github.com/openclaw/openclaw/issues/157319) | 2026.9.6 更新验证失败：state-migrated-no-rollback + codex 插件陈旧记录 | ❌ 无 |
| [#153426](https://github.com/openclaw/openclaw/issues/153426) | 受信记忆根文件（MEMORY.md/USER.md）被 provenance ratchet 永久排除注入 | ❌ 无（P0） |
| [#151795](https://github.com/openclaw/openclaw/issues/151795) | `--link` 方式安装插件不受信任，channel 拒绝启动 | ❌ 无（P0） |
| [#142821](https://github.com/openclaw/openclaw/issues/142821) | 默认开启的模型可见转录脱敏毒化重放的 agent 上下文 | ❌ 无（P0，有 linked PR） |

### P1 级（重要，影响特定场景）

| Issue | 问题 | 是否有 fix PR |
|-------|------|--------------|
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步持久化阻塞 Gateway 事件循环 | 🔧 部分修复已合入 |
| [#139710](https://github.com/openclaw/openclaw/issues/139710) | 插件生成 supersede 杀死系统 Agent 回合 | ❌ 无 |
| [#161976](https://github.com/openclaw/openclaw/issues/161976) | WhatsApp 回复在持久化注册表切换后反复失败 | ❌ 无 |
| [#157630](https://github.com/openclaw/openclaw/issues/157630) / [#157575](https://github.com/openclaw/openclaw/issues/157575) | 显式 `--max-old-space-size` 静默覆盖 worker 的 resourceLimits | ❌ 无 |
| [#160522](https://github.com/openclaw/openclaw/issues/160522) | prepared-model-catalog worker 达到 1.15 GB 超过 `maxOldGenerationSizeMb: 512` | ❌ 无（有 linked PR） |
| [#160959](https://github.com/openclaw/openclaw/issues/160959) | 2026.9.6 回归：捕获大型外部插件时 Gateway 阻塞数分钟 | ❌ 无 |
| [#148789](https://github.com/openclaw/openclaw/issues/148789) | 模型回退链在 session 级故障时耗尽所有候选并错误归因 | ❌ 无 |
| [#150132](https://github.com/openclaw/openclaw/issues/150132) | claude-cli `--include-partial-messages` 计入 8 MiB 冻结 stdout 上限，长回合丢失最终回复 | ❌ 无（有 linked PR） |
| [#155396](https://github.com/openclaw/openclaw/issues/155396) | Codex 工具回合在 final-answer recovery 中因 `provenance_rejected` 失败 | ❌ 无 |

### P2 级（值得关注）

- [#150635](https://github.com/openclaw/openclaw/issues/150635) — 短期记忆 512 条上限导致 dreaming 永不促进（P2，无 fix）
- [#164923](https://github.com/openclaw/openclaw/issues/164923) — 某 workspace 短时记忆促进 0/512，兄弟 workspace 正常 50–90%（P2，调查中）
- [#120385](https://github.com/openclaw/openclaw/issues/120385) — Code Mode 工具目录在 cron/memory-flush 回合不完整（P2，无 fix）

**要点**：内存泄漏问题群（prepared-model-catalog worker）为当前最大技术债，涉及至少 5 个独立 issue，均无已合并修复，公关风险高。Windows 相关 issue（WAL、会话创建）数量虽少但影响严重。

---

## 6. 功能请求与路线图信号

### 可能被纳入下一版本的需求

| Issue/PR | 内容 | 判断依据 |
|----------|------|---------|
| [#154043](https://github.com/openclaw/openclaw/pull/154043) — per-request MCP header provider | MCP 头按请求注入，避免声明式 header 变更导致目录重编（221/222 次重编率） | PR 标记 ready for review，且数据支撑充分 |
| [#165370](https://github.com/openclaw/openclaw/pull/165370) — session authority B1 | 工具权限指纹、技能准备迁移至 session reader | 标志着架构向非阻塞方向演进 |
| [#51441](https://github.com/openclaw/openclaw/issues/51441) — 暴露解析后的后端模型名 | 让 agent 知道实际路由到哪个模型（LiteLLM 场景） | 9 条评论，P2，社区关注度中等 |
| [#165685](https://github.com/openclaw/openclaw/issues/165685) — 机器可读的 collector reason | 为 registry 结算的 yield 提供诊断信息 | P3，需求明确，属于工具链完善 |
| [#114146](https://github.com/openclaw/openclaw/issues/114146) — Talk 模块 `baseUrl` 配置 | 支持 OpenAI Realtime 兼容的第三方端点（阿里百炼等） | 已关闭（可能是重复或已内部解决） |

### 路线图信号

- **架构演进**：多个 PR 将 session 状态读取移出 Gateway 线程（#165370、#165909、#165932），表明团队正系统性地解决事件循环阻塞问题。
- **插件安全**：#151795（--link 插件不受信任）和 #154310（symlink_escape 白名单）显示安全边界正在收紧。
- **记忆系统重构**：#150635 和 #164923 暴露出短期记忆机制（512 条上限 + 夜间逐出）的设计缺陷，预计后续会有针对性的 redesign。

---

## 7. 用户反馈摘要

### 主要痛点

1.

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告

**报告日期**：2026-10-06 ｜ **统计窗口**：过去 24 小时

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现**头部效应显著、分层加剧**的格局：以 OpenClaw 为核心的头部项目保持极高迭代速度（单日 500+ Issue/PR 更新），在功能广度、社区规模上与其他项目拉开数量级差距；腰部项目（NanoClaw、CoPaw、Zeroclaw、NanoBot）各自围绕特定场景深耕，维持中等至高活跃度；而 PicoClaw 等尾部项目已出现维护者失联、社区 fork 的信任危机信号。跨项目看，**稳定性与安全性取代功能创新成为当前主旋律**——内存泄漏、数据丢失、配置损坏、安全漏洞等生产环境问题大量涌现，多个项目处于"快速扩张后补稳定性债"的阶段。同时，iMessage/SMS 等个人通信渠道集成、MCP 生态适配、SKILL 格式兼容成为多项目共同涌入的方向。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 核心风险/信号 | 健康度 |
|------|------------|---------|---------|--------------|--------|
| **OpenClaw** | 419 新开/活跃 | 370 待合并 | ✅ v2026.10.1-beta.1 | P0 内存泄漏（prepared-model-catalog，RSS 8–13 GiB）无 fix PR；更新失败群 | 🟡 **高活跃、稳定性承压** |
| **NanoClaw** | 1 关闭 | 12 合并 / 9 待合并 | ✅ v2026.10.0-rc.2 | macOS 更新竞态已修复；OneCLI 网关 410 已修复；发布冲刺期 | 🟢 **高活跃、健康** |
| **CoPaw** | 41 活跃 / 1 关闭 | 1 合并 / 22 待合并 | ❌ 无 | P0 级上下文污染（会话永久 400）；22 个 PR 积压（最长 51 天） | 🟡 **高活跃、合并瓶颈** |
| **Zeroclaw** | 22 活跃 / 2 关闭 | 3 合并 / 47 待合并 | ❌ 无（v0.8.6 筹备中） | S0 级配置数据丢失（109 KB→702 B）；bubblewrap 沙箱修复在途 | 🟡 **高活跃、有隐患** |
| **NanoBot** | 4 活跃 / 1 关闭 | 7 合并 / 17 待合并 | ❌ 无 | Token 消耗可观测性需求强烈；2 个安全修复（DNS 固定、日志泄露）待合并 | 🟢 **中高活跃、健康** |
| **LobsterAI** | 7 活跃 / 2 关闭 | 3 合并 / 3 待合并 | ❌ 无 | 外部研究员提交 4 个安全漏洞，修复响应迅速 | 🟢 **中高活跃、健康** |
| **IronClaw** | 2 新开 | 2 新提交 / 0 合并 | ❌ 无 | WebChat 后台状态过期（修复 PR 在途）；Sendblue 扩展待审 | 🟢 **中等活跃、健康** |
| **Moltis** | 2 新开 | 2 待合并 / 0 合并 | ❌ 无 | Discord 私聊分类错误、SKILL.md YAML 解析缺陷，均有修复 PR | 🟢 **低活跃、健康** |
| **PicoClaw** | 0 新增（4 stale） | 1 新增 / 0 合并 | ❌ 无 | **维护者失联**：stale bot 批量关 Issue、社区 fork 公告、安全披露通道缺失 | 🔴 **维护风险偏高** |
| **TinyClaw** | — | — | — | 24h 无活动 | ⚪ 静默 |
| **ZeptoClaw** | — | — | — | 24h 无活动 | ⚪ 静默 |
| **EasyClaw** | — | — | — | 24h 无活动 | ⚪ 静默 |

---

## 3. OpenClaw 在生态中的定位

**社区规模断崖式领先**：单日 Issue 更新量（419）接近其他所有活跃项目总和（约 75 条）的 5.6 倍；待合并 PR 370 条，是第二名 Zeroclaw（47 条）的 7.9 倍。这反映出 OpenClaw 已建立**生态级正反馈循环**——用户基数大 → 问题反馈多 → 修复与功能迭代快 → 吸引更多用户。

**技术路线差异**：OpenClaw 是唯一在**记忆系统**（short-term recall、dreaming deep phase、memory consolidation）和**worker 架构**（prepared-model-catalog、Gateway event loop 隔离）上深度投入的项目，其 `Sessions + 记忆 + 多通道 + 插件` 的架构复杂度显著高于其他项目。NanoClaw/Zeroclaw 等虽同属"类 OpenClaw"架构，但模块深度和迭代密度仍有差距。

**核心风险**：当前 OpenClaw 的**最大技术债是 worker 内存泄漏**（5+ 独立 P0 issue、无合并修复），直接影响生产部署稳定性；**更新流程验证/回滚失败**（多个 P0）则威胁用户升级信心。这两个问题群若持续发酵，可能动摇其领先地位，为竞品创造窗口。

**生态参照意义**：OpenClaw 已成为事实上的**功能基准与兼容性对标物**——LobsterAI 的 SKILL.md 解析对齐 OpenClaw、多个项目提供 OpenClaw 兼容层，均说明其生态位已从"单个项目"上升为"事实标准"。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|------|---------|---------|
| **个人通信渠道集成（iMessage/SMS）** | NanoClaw（#4043）、IronClaw（#8127）、PicoClaw（#3416） | 三个项目同日出现 Sendblue 扩展 PR，说明用户对"智能体接入个人短信/Apple 生态"的需求已形成跨项目共识，且采用同一第三方服务 |
| **MCP 协议适配与稳定性** | NanoBot（#6065/#6066 超时修复）、CoPaw（#8047 HTTP 422 协议识别）、Moltis（#1294 per-sender 凭据）、LobsterAI（#989 Tavily 401） | 超时配置脱钩、协议降级判断、多用户凭据隔离、密钥传递断裂——MCP 从"能用"到"好用"仍有大量工程细节待补齐 |
| **内存/资源管理** | OpenClaw（prepared-model-catalog 泄漏群）、CoPaw（TaskTracker 僵尸条目）、NanoBot（Token 消耗不可追踪） | 长驻进程的资源泄漏与可观测性是规模化部署的共同痛点；NanoBot 的 Token 使用记录 API 可作为轻量级参考方案 |
| **SKILL.md 格式兼容性** | LobsterAI（#2800 对齐 OpenClaw）、Moltis（#1292/#1293 YAML 解析） | 技能生态正在跨项目流动，frontmatter 解析规则的一致性成为互操作前提 |
| **更新/升级链路可靠性** | OpenClaw（update 失败群）、NanoClaw（macOS 快照竞态）、Zeroclaw（v0.8.6 筹备） | 更新失败、回滚困难、跨版本竞态——升级路径的稳健性直接决定用户信任 |
| **安全边界加固** | LobsterAI（4 个安全漏洞）、NanoBot（DNS 固定/日志泄露）、Zeroclaw（authority recheck）、OpenClaw（Tlon 身份伪造） | 凭据泄漏、路径逃逸、未认证代理、权限伪造——智能体持有用户凭据的架构放大了安全缺陷的影响面 |
| **Windows 兼容性** | OpenClaw（WAL 增长、`\\?\` 路径）、CoPaw（Windows 沙箱 COM 问题）、LobsterAI（平台不一致） | Windows 在生产环境中的占比推高了该平台的兼容性修复优先级 |

---

## 5. 差异化定位分析

| 项目 | 定位 | 目标用户 | 架构关键差异 |
|------|------|---------|-------------|
| **OpenClaw** | 全功能个人 AI 助手平台（"操作系统"级） | 技术发烧友、自托管用户、开发者 | worker 多进程架构 + 记忆系统（dreaming）+ 多通道统一抽象；插件生态最丰富 |
| **NanoClaw** | 轻量级 OpenClaw 兼容实现，注重发布可重复性 | 个人开发者、频道管理员 | 首个采用日历化版本号的项目；`/update-nanoclaw` 跟踪发布而非 main；Sendblue/OneCLI 等务实集成 |
| **Zeroclaw** | 安全/权限敏感的本地优先运行框架 | 安全开发者、本地模型用户 | 强调 authority recheck、sandbox（bubblewrap）隔离；有本地小模型运行时 profile 规划（#5287） |
| **CoPaw** | 面向第三方 Agent 协议（opencode/Qoder）的兼容层 | 多模型/多供应商用户 | 侧重供应商协议适配（OpenCode、DeepSeek、DBX MCP）；控制台配置流优化 |
| **NanoBot** | 极简、高可观测性 chatbot 框架 | 轻量用户、Token 敏感用户 | 首批落地 Token 使用记录 API；WebUI 细节打磨；并发渠道（Telegram/Discord）均衡发展 |
| **LobsterAI** | 桌面应用形态的 AI 助手（Electron） | 桌面端普通用户 | 桌面 GUI + 技能市场 + 安全加固；SKILL.md 兼容 OpenClaw |
| **IronClaw** | 企业/自托管场景的远程 Agent 执行框架 | 自托管用户、局域网部署 | 强调 benchmark 质量追踪（每日 failure taxonomy）；WebChat + 通知体系 |
| **PicoClaw** | 轻量多渠道个人 Agent | 个人开发者 | 曾以 IRC 等小众渠道见长；目前维护停滞，社区 fork 接棒 |
| **Moltis** | 多身份/多租户会话管理 | 群聊运营者、团队协作 | 关注 per-sender MCP 凭据、DM/shared 会话分类等精细权限模型 |

---

## 6. 社区热度与成熟度分层

**🟢 快速迭代期**（功能与修复双线高速推进，发布节奏稳定）：
- **OpenClaw** — 日更 beta

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-06

## 1. 今日速览

过去 24 小时 NanoBot 项目保持**高活跃度**：5 条 Issue 更新（4 条新开/活跃，1 条关闭），24 条 PR 更新（17 条待合并，7 条已合并/关闭），无新版本发布。今日关闭的 PR 集中在 WebUI 体验打磨、MCP 超时修复与文档解析准确性；待合并队列中出现了 iMessage/SMS 新渠道、Cron 调度保护、安全 DNS 修复等多个值得关注的重要 PR。社区讨论热度最高的仍是**Token 消耗可观测性**问题（15 条评论），热门空缺功能集中在群聊 Agent 行为控制与模型配置灵活性。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共有 7 个 PR 进入已合并/关闭状态，覆盖面较广：

- **MCP 稳定性**：[#6066](https://github.com/HKUDS/nanobot/pull/6066) 修复 MCP streamable HTTP 读超时固定 30 秒的问题，使超时配置关联到 `tool_timeout`，直接修复 Issue [#6065](https://github.com/HKUDS/nanobot/issues/6065)。
- **Token 可观测性**：[#5299](https://github.com/HKUDS/nanobot/pull/5299) 实现结构化 Token 使用记录 API（`/api/settings/usage/records`），保留最近 50 条记录，回应社区长期对 Token 消耗追踪的需求。
- **WebUI 打磨**：[#6075](https://github.com/HKUDS/nanobot/pull/6075) 修复宽公式溢出与数学排版间距；[#6073](https://github.com/HKUDS/nanobot/pull/6073) 恢复中日韩（CJK）文本行高并优化换行；[#6074](https://github.com/HKUDS/nanobot/pull/6074) 统一图标风格与交互反馈，移除不一致的悬浮阴影与缩放效果。
- **文档解析**：[#6060](https://github.com/HKUDS/nanobot/pull/6060) 修复只读模式下 XLSX 单元格超出声明维度时被静默丢弃的问题，涉及文档预览、`read_file` 与 `grep`。
- **测试稳定性**：[#6076](https://github.com/HKUDS/nanobot/pull/6076) 隔离 Star 邀请状态、稳定子 Agent 迟到结果的测试等待逻辑，修复 Windows Python 3.14 构建失败。

整体来看，项目今日聚焦于**体验修复与稳定化**，没有大的功能里程碑落地，但待合并队列中有多项新功能已在排队。

## 4. 社区热点

- **[#5266 增强：Token 消耗日志（15 条评论）](https://github.com/HKUDS/nanobot/issues/5266)** — 今天讨论最激烈的话题。用户反馈 NanoBot 在用户无明显操作的情况下，2 小时内消耗了“数百万”Token，且完全无法追踪是哪个调用产生的。用户诉求是记录每次调用的时间与 Token 消耗量。该 Issue 创建于 8 月，今天仍有更新，说明社区对成本可观测性的关注度持续高涨。值得注意的是，今日关闭的 PR [#5299](https://github.com/HKUDS/nanobot/pull/5299) 恰好实现了 Token 使用记录 API，**可能部分回应此需求**，但最终仍取决于该 PR 是否真正合并及功能覆盖范围。
- **[#6065 Bug：MCP streamable HTTP 固定 30 秒读超时（1 条评论）](https://github.com/HKUDS/nanobot/issues/6065)** — 当 FastMCP 工具真实响应超过 30 秒时请求必失败，超时设置与 `tool_timeout` 脱钩。同日 PR [#6066](https://github.com/HKUDS/nanobot/pull/6066) 已提交修复，响应速度很快。

## 5. Bug 与稳定性

按严重程度排列：

- **[Security / P1] [#6069 修复：钉住 bytes 类型主机名的验证 DNS](https://github.com/HKUDS/nanobot/pull/6069)** — `pin_resolved_url_dns()` 在连接栈传入 bytes 主机名时比较失败（`str(b"example.com")` → `"b'example.com'"`），导致 DNS 固定逻辑失效、存在二次解析风险。已有修复 PR，标记为 P1 安全修复，**待合并**。
- **[Security] [#6067 修复：MCP 发现错误日志中的凭据泄漏](https://github.com/HKUDS/nanobot/pull/6067)** — `resources/list` 或 `prompts/list` 失败时，原始异常会写入日志，其中可能包含 URL userinfo、路径凭据、查询签名以及服务器端提供的任何密钥。已有修复 PR，**待合并**。
- **[Bug] [#6065 MCP streamable HTTP 固定 30 秒读超时](https://github.com/HKUDS/nanobot/issues/6065)** — 超时与 `tool_timeout` 不联动，长任务必然失败。**修复 PR [#6066](https://github.com/HKUDS/nanobot/pull/6066) 今日已关闭**。
- **[Bug] [#6070 Cron 调度在运行期间被编辑后丢失](https://github.com/HKUDS/nanobot/issues/6070)** — 运行中的 Cron

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-06

## 1. 今日速览

项目过去 24 小时整体活跃度**高**：Issues 更新 24 条（新开/活跃 22、关闭 2），PR 更新 50 条（待合并 47、已合并/关闭 3），无新版本发布。开发节奏紧凑，大量功能 PR 处于审查或待作者行动状态。社区关注焦点集中在本地小模型场景（#5287）、S0 级配置数据丢失（#10495）以及 Linux 沙箱后端故障（#11538/#11539/#11540）上，其中 bubblewrap 探测问题已有对应修复 PR（#11559）。整体看项目健康度良好，但高严重度 Bug 和长期开放性 Issue 需要维护者优先关注。

---

## 2. 版本发布

**无新版本发布**（过去 24 小时 Releases 数量为 0）。多个 PR 标记了 `release:v0.8.6`（如 #10993、#11519、#11302、#11306、#11533），表明 v0.8.6 仍在筹备中。

---

## 3. 项目进展

过去 24 小时共关闭/合并 3 条 PR，其中 1 条为实质性合并，2 条因独立审查未通过而被暂停（parked）：

- **[#11533] test(runtime): isolate bootstrap WARN capture in parallel tests**（已合并，`risk:low`，`size:S`）— 修复并行测试中 `Lagged` 导致的 WARN 捕获不稳定问题，提升 CI 可靠性，是 #11294 同类并行测试竞态治理的延续。
  链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11533

- **[#11205] feat(security): add the authority recheck foundation**（已关闭，parked）与 **[#11223] test(security): ratchet authority effects behind the recheck**（已关闭，依赖 #11205）— 安全权限重查机制的基础实现和测试均因"重查未在效果点生效"被暂停。独立审查发现 generation 读取时机早于 sink 执行，且凭证撤销不会推进 generation，**当前不满足安全目标**。这属于安全功能的一次严格把关，而非功能回退。
  链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11205 | https://github.com/zeroclaw-labs/zeroclaw/pull/11223

除此之外，47 条 PR 仍在待合并队列中，以下几条值得关注（详细见第 6 节）：#11559（bubblewrap 探测修复）、#11556（Signal 媒体附件）、#11535（AgentEnd 成本归因）、#11302（插件通道实例绑定）、#11132（RPC 转向/会话操作 parity）。

---

## 4. 社区热点

- **[#5287] [Feature]: define a compact local_small runtime profile and prompt-budget contract** — 10 条评论、2 👍，创建于 2026-04-04，已持续活跃 6 个月。本地优先用户对"prompt 膨胀、宽松 fallback 解析、内部工具指令泄漏到用户可见输出"的痛点非常强烈，该 Issue 已成为本地部署场景的长期需求锚点。
  链接：https://github.com/zeroclaw-labs/zeroclaw/issues/5287

- **[#10495] [Bug]: Config::save() can replace an operator's populated config.toml with a near-empty file** — 6 条评论，S0 数据丢失/安全风险。用户报告 109 KB（25 个 agent）的配置文件被覆盖为 702 字节的空壳，属于**数据丢失级**事故，社区情绪紧张。目前尚无直接的 fix PR 出现，是今天最值得警惕的问题。
  链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10495

- **[#7891] [Feature]: Add Signal media attachment support** — 4 条评论，与今日新开 PR #11556 直接对应，说明社区需求已进入实现阶段。
  链接：https://github

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-10-06

## 1. 今日速览

过去 24 小时 PicoClaw 仓库共发生 9 条 Issues/PR 更新，但**没有新版本发布**，整体活跃度偏低。当前 5 条 Issue 中 4 条被标记为 `[stale]`，仅 1 条（#3366）被关闭且同样由 stale 机器人处理，反映出**维护者响应严重滞后**。PR 方面有 1 条新增的 Sendblue 通道实现（#3416），是近期少见的"新鲜"贡献，但另有 3 条 PR 处于待合并状态且被标记 stale。社区层面出现用户主动 fork 并公告继续维护的信号（#3398），叠加多条 issue 提到 "maintainers 未响应"，项目健康度评估为 **风险偏高**：代码有外部贡献但维护管线明显堵塞。

---

## 3. 项目进展

### 关闭的 PR

| PR | 标题 | 状态 | 说明 |
|---|---|---|---|
| [#3354](https://github.com/sipeed/picoclaw/pull/3354) | feat(irc): assemble IRCv3 multiline messages | CLOSED（stale） | 为 IRC 通道实现 `draft/multiline` 消息拼接，使长/多行 IRC 消息作为单一输入到达 agent。此功能本身有价值，但 **已在 10-05 被 stale bot 标记关闭**，未能合并。 |

该项目在过去 24 小时 **没有合并任何 PR**。结合 #3354 的关闭，实际进展为 **零合并、一例贡献被自动关闭**。这一点对维护者而言是明确的警示信号：功能完整的 PR 如果持续无人 review，社区贡献将流失。

---

## 4. 社区热点

### 最活跃讨论：Issue #3366（6 条评论，已关闭）

- [**[Feature] Add support for OpenAI compatible providers**](https://github.com/sipeed/picoclaw/issues/3366) — @ItachiSan 提议增加 "OpenAI Compatible" 自定义 provider，以支持自托管路由器（如 9Router）。该 issue 有 6 条评论，是当前讨论最多的条目，但于 10-05 被 stale bot 关闭。

**背后诉求**：用户希望将 PicoClaw 连接到任意 OpenAI 兼容端点（自托管网关/路由器），这是 agent 工具链中非常普遍的集成需求。issue 被自动关闭但需求本身真实且未被满足，建议维护者手动重新打开。

### 高信号 Issue：#3398（1 条评论）

- [**[Notice] Active Fork & Continued Maintenance: afjcjsbx/picoclaw**](https://github.com/sipeed/picoclaw/issues/3398) — 社区用户宣布因原仓库"目前无人维护"，已建立活跃 fork 并公告。此 issue 虽评论数少，但**信号极强**：社区对维护持续性的信任正在下降。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 高 — 安全报告通道缺失

- [#3405](https://github.com/sipeed/picoclaw/issues/3405) — [stale] **Please enable private vulnerability reporting**（@x1F916，👍 1）
  - 用户称发现若干安全相关问题，但仓库未启用 GitHub 私有漏洞报告，也没有 `SECURITY.md` 或安全联系渠道。安全披露通道缺失属于**高危治理问题**，且该 issue 已被标记 stale，存在被自动关闭的风险。

### 🟠 中 — 核心可靠性缺陷集合

- [#3404](https://github.com/sipeed/picoclaw/issues/3404) — [stale] **Reliability fixes with reproducers (wave 1)**（@x1F916）
  - 用户通读了 agent loop、channels manager、config、updater 等核心模块，报告了多个**可复现 bug**（基于 `main` bbf6893 及 v0.3.1）。特别指出：部分问题此前已被报告甚至修复，但 "issues/PRs 在任何人处理前就被 stale bot 关闭"。

  ⚠️ **目前没有对应的 fix PR 在途**，此 issue 是当前最重要的稳定性改进来源。

### 🟡 低 — 无新增 Bug 报告

今日没有新出现的崩溃或回归报告。

---

## 6. 功能请求与路线图信号

### 可能纳入下版本的功能（依据已有 PR/Issue）

| 功能 | 来源 | 状态 | 纳入可能性 |
|---|---|---|---|
| **Sendblue iMessage/SMS 通道** | PR [#3416](https://github.com/sipeed/picoclaw/pull/3416) | OPEN，最新提交 | ⭐⭐⭐ 新提交、功能完整（含文档与 webhook 指引），若维护者恢复响应，是最可能合并的 PR |
| **Keenable web 搜索 provider** | PR [#3370](https://github.com/sipeed/picoclaw/pull/3370) | OPEN / stale | ⭐⭐ 实现完整且无需 API key，但已悬置近 30 天 |
| **OpenAI 兼容自定义 provider** | Issue [#3366](https://github.com/sipeed/picoclaw/issues/3366) | CLOSED (stale) | ⭐⭐ 被关闭但需求明确，社区呼声高，建议重新开放 |
| **Tsubasa provider 目录条目** | Issue [#3397](https://github.com/sipeed/picoclaw/issues/3397) | OPEN / stale | ⭐ 低成本小改动，可作为 quick win |
| **Web UI 卡顿修复** | PR [#3347](https://github.com/sipeed/picoclaw/pull/3347) | OPEN / stale | ⭐ 已构建测试并修复，但非 TS 开发者提交，需维护者审查质量 |

### 路线图信号

- 当前 PR 集中于 **通道扩展（channels）与工具提供商（web search）**，与 issue 中用户对"更多 provider/通道"的核心诉求一致。
- 没有来自维护者的路线图声明或 milestone 更新。所有路线图信号均来自社区贡献方向。

---

## 7. 用户反馈摘要

从各 issue 评论提炼的真实用户声音：

- **"项目无人维护"的共识正在形成**（#3398）：用户明确表示"repository currently appears to be unmaintained"，并因此建立 fork。这是社区信任危机的直接信号。
- **对 stale bot 机制不满**（#3404）：用户描述"issues/PRs were closed by the stale bot before anyone could look at them"——反映自动关闭机制在低活跃维护下反而成为**用户贡献的阻碍**。
- **渴望更多通道与提供商接入**（#3397、#3366、#3416）：用户希望与自有 IM 工具（iMessage/SMS）和自托管模型网关无缝集成，使用场景集中在**个人日常通信渠道接入 agent**。
- **愿意为稳定性出力**（#3404、#3405）：用户自称已通读核心代码、提供复现步骤、甚至主动检查安全配置，说明**社区有高质量贡献者但缺乏有效接收渠道**。
- **对 Web UI 体验的朴素改进**（#3347）：非专业前端用户自助修复卡顿，体现了社区"自给自足"的状态，但也意味着维护者缺位。

---

## 8. 待处理积压（提醒维护者关注）

下列条目长期未获维护者响应，处于 stale 状态或即将被自动关闭，**建议优先处理**：

| 条目 | 类型 | 搁置时长 | 风险说明 |
|---|---|---|---|
| [#3404](https://github.com/sipeed/picoclaw/issues/3404) Reliability fixes with reproducers | Issue | 自 09-28 起，已 stale | 核心模块多处 bug 有复现步骤，不处理则稳定性口碑持续受损 |
| [#3405](https://github.com/sipeed/picoclaw/issues/3405) Enable private vulnerability reporting | Issue | 自 09-28 起，已 stale | 安全披露通道缺失，若被 stale 关闭将造成安全隐患 |
| [#3370](https://github.com/sipeed/picoclaw/pull/3370) Keenable web search provider | PR | 自 09-07 起，已 stale | 功能完整但 30 天未 review，合入成本会随时间上升 |
| [#3347](https://github.com/sipeed/picoclaw/pull/3347) fix laggy interface | PR | 自 08-27 起，已 stale | UI 卡顿修复，社区用户已自测通过 |
| [#3398](https://github.com/sipeed/picoclaw/issues/3398) 社区 fork 公告 | Issue | 自 09-28 起，已 stale | 若不回应，社区会默认 fork 为"正统延续" |
| ~~[#3366](https://github.com/sipeed/picoclaw/issues/3366) OpenAI compatible providers~~ | Issue | **已于 10-05 被关闭** | 需求真实但被 stale bot 关闭，建议手动重开 |

---

### 总结

PicoClaw 今日的代码产出并不为零——有新的 Sendblue 通道 PR 提交，但**所有关键流程均卡在维护响应缺失**：PR 无人 review、Issue 被 stale bot 批量关闭、安全通道未开通、社区 fork 已公开叫板。项目当前最需要的不是新功能，而是**维护者恢复响应**或**明确交接治理权**。否则即便社区持续贡献，项目健康度仍将继续下滑。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-06

## 1. 今日速览

过去 24 小时 NanoClaw 项目活跃度处于高位：共处理 PR 21 条，其中 12 条已合并/关闭，9 条待合并；关闭 Issue 1 条；发布新候选版本 v2026.10.0-rc.2。核心工作集中在 macOS 更新流程修复、OneCLI 技能适配加固、并发渠道分支合并与 CI 依赖治理上。尤其值得关注的是，v2026.10.0-rc.2 是首个采用日历化版本号、且 `/update-nanoclaw` 默认安装的候选版本，标志着项目发布策略的重要转变——更新将跟随发布版本而非 `main` 分支。项目整体处于发布冲刺期，稳定性修复与功能扩展双线推进。

## 2. 版本发布

### v2026.10.0-rc.2

- **发布时间**：2026-10-05
- **发布 PR**：[#4038](https://github.com/nanocoai/nanoclaw/pull/4038)
- **版本变更**：`package.json` 版本号从 `2026.10.0-rc.1` 提升至 `2026.10.0-rc.2`
- **核心要点**：
  1. 这是 2026.10.0 的第二个候选版本，也是该项目**首个采用日历化版本号**的发布。
  2. 自该版本起，`/update-nanoclaw` 默认安装**发布版本**而非 `main` 分支最新提交，发布追踪策略发生根本性转变，对生产环境的可重复性有积极意义。
  3. `beta` 频道用户将收到此候选版本；`stable` 频道仍然等待正式版。
- **破坏性变更**：无明确破坏性变更，但升级路径从"跟踪分支"切换为"跟踪发布"，用户需要留意更新源的变化。
- **迁移注意事项**：macOS 用户进行 2.3.0 → 2.4.0 这类跨版本更新时，建议等待 v2026.10.0-rc.2 之后的正式版本再操作，因已知 macOS 更新存在快照竞态问题（见 Bug 部分），虽已有修复 PR，但建议修复版本正式发布后再执行升级。

## 3. 项目进展

过去 24 小时合并/关闭的 PR 共 12 条，主要集中在以下几个方向：

### 稳定性与更新机制
- **[#4037](https://github.com/nanocoai/nanoclaw/pull/4037) fix(update): wait for the launchd host to exit after bootout** — 修复 macOS 更新时 `launchctl bootout` 返回后宿主进程尚未退出、快照与关闭竞态的问题。这是对 Issue #4021 的直接修复。
- **[#4035](https://github.com/nanocoai/nanoclaw/pull/4035) test(setup): reuse exec-checked stubs in the restart readiness tests** — 修复重启就绪测试在 macOS 满载测试套件中因首个 exec 检查排队导致的超时问题。

### OneCLI 技能加固（系列修复）
- **[#4036](https://github.com/nanocoai/nanoclaw/pull/4036) fix(onecli): hold the gateway on 1.42.0 and stop /add-dial-tool on 1.42+** — 将 OneCLI 网关固定到 1.42.0，避免 1.43+ 版本在 agent secret-assignment API 上返回 410 导致 `/add-onecli`、`/add-vercel` 等技能中断。
- **[#4039](https://github.com/nanocoai/nanoclaw/pull/4039) fix(onecli): upgrade guide refuses an empty gateway pin** — 阻止升级指南写入空网关版本号，防止 Docker Compose 意外运行 `latest` 镜像导致数据库迁移事故。
- **[#4041](https://github.com/nanocoai/nanoclaw/pull/4041) fix(onecli): migration warning points back to the pin, not the old version** — 修正升级指南中回滚指引的措辞，避免用户从 1.45.0 错误回退到旧版本。

### 渠道分支整合
- **[#4000](https://github.com/nanocoai/nanoclaw/pull/4000) chore(channels): merge main into channels** — 将 main 分支 463 个提交合并进 channels 分支，解决长期分叉导致的冲突累积问题。
- **[#3995](https://github.com/nanocoai/nanoclaw/pull/3995) fix(channels): load every adapter and make the branch green** — 修复 channels 分支的测试与类型检查，使其重新恢复绿色状态。

### 安全与依赖治理
- **[#4007](https://github.com/nanocoai/nanoclaw/pull/4007) ci: let Dependabot see skill-pinned npm versions** — 使技能固定的 npm 依赖版本对 Dependabot 可见，解决 `@whiskeysockets/baileys` 7.0.0-rc.9 等关键漏洞长期不可见的问题。
- **[#4009](https://github.com/nanocoai/nanoclaw/pull/4009) ci: merge agent-image pin bumps by hand, drop the auto-approver** — 调整 CI 策略：agent-image 版本升级 PR 改为人工合并，不再自动批准。

### 其他修复
- **[#4015](https://github.com/nanocoai/nanoclaw/pull/4015) feat(gateway): skip the approval card for reads that carry no credential** — 无凭据的读取请求不再触发审批卡，显著减少 Iron Proxy 场景下网页浏览产生的审批噪音。
- **[#4017](https://github.com/nanocoai/nanoclaw/pull/4017) fix(setup): fetch the current WhatsApp Web version before linking** — 修复 WhatsApp 版本检查被限流（429）时静默使用 Baileys 过期内置版本的问题。

**综合评估**：项目在 24 小时内完成了大量防御性修复和发布流程收尾，从更新机制、渠道分支、技能兼容、CI 安全四条线同步推进，整体方向是**为 v2026.10.0 正式版做最后冲刺**。

## 4. 社区热点

过去 24 小时评论数最高的 PR/Issue 如下：

### 最受关注的新功能：iMessage/SMS 渠道
- **[#4043](https://github.com/nanocoai/nanoclaw/pull/4043) feat(channels): add Sendblue iMessage and SMS skill**（开放中）
  - 由社区贡献者 @lookevink 提交，为 NanoClaw 增加 Sendblue 技能，支持直接进行 iMessage/SMS 文本对话。
  - 包含免费账户验证、webhook 设置、操作员 DM 接线、编号审批回复和完整卸载说明。
  - **背后诉求**：用户希望将 NanoClaw 延伸到 iMessage/SMS 这一高频通信渠道，且该 PR 设计相当周全（安全入站、审批流），说明社区对多渠道消息代理的需求旺盛。

### 高关注度的 Agent 核心修复
- **[#3918](https://github.com/nanocoai/nanoclaw/pull/3918) fix(agent-runner): never lose or repeat a reply around send_message**（开放中，9/25 创建，近两周持续活跃）
  - 修复 Agent 在 `send_message` 周边可能丢失或重复回复的问题，同时覆盖流式提供商（如 Claude）和端末提供商（如 OpenCode）。
  - **背后诉求**：这是 Agent 运行稳定性的基础问题，回复丢失/重复直接影响用户体验和任务可靠度，社区关注度高是合理的。

### Issue 侧的 macOS 更新问题
- **[#4021](https://github.com/nanocoai/nanoclaw/issues/4021)**（已关闭）— macOS 更新停止服务后不等待宿主退出，快照与关闭竞态，导致重新引导失败并报 I/O error 5。已在 #4037 中修复。
  - **背后诉求**：跨版本更新是用户最危险的操作，任何竞态都可能导致数据不一致或回滚成本。该 Issue 快速关闭、修复 PR 同步合并，体现了项目维护者对更新路径的重视。

## 5. Bug 与稳定性

按严重程度排列：

### 高严重度（已修复）
1. **macOS 更新竞态导致重新引导失败**（[#4021](https://github.com/nanocoai/nanoclaw/issues/4021) → [#4037](https://github.com/nanocoai/nanoclaw/pull/4037)）
   - 现象：`launchctl bootout` 返回后宿主进程未退出，快照与关闭竞态，重新引导失败并报 I/O error 5。
   - 影响：macOS 用户跨版本更新（如 2.3.0 → 2.4.0）时可能中断切换、需要回滚。
   - 状态：✅ 已修复、已合并。
2. **OneCLI 网关 1.43+ 返回 410 导致技能中断**（[#4036](https://github.com/nanocoai/nanoclaw/pull/4036)）
   - 现象：OneCLI 1.43 起对 agent secret-assignment API 返回 410，`/add-onecli` 和 `/add-vercel` 技能失效。
   - 影响：使用新网关版本的用户核心技能不可用。
   - 状态：✅ 已修复（网关固定在 1.42.0）。
3. **OneCLI 空网关版本导致 Docker Compose 运行 latest**（[#4039](https://github.com/nanocoai/nanoclaw/pull/4039)）
   - 现象：升级指南在网关版本为空时写入 `ONECLI_VERSION=`，触发 `latest` 镜像运行，可能意外迁移数据库。
   - 影响：生产环境灾难性风险。
   - 状态：✅ 已修复。

### 中严重度（已解决）
4. **技能依赖中的已知安全通告**（[#4042](https://github.com/nanocoai/nanoclaw/pull/4042)、[#4007](https://github.com/nanocoai/nanoclaw/pull/4007)）
   - `@resend/chat-sdk-adapter@0.1.1` 携带 4 个中危 npm audit 漏洞；另有 `@whiskeysockets/baileys` 7.0.0-rc.9 关键漏洞被 Dependabot 长期忽略。
   - 状态：✅ 前者适配器已升级至 0.3.0；后者 Dependabot 可见性已修复。
5. **WhatsApp Web 版本检查限流时静默使用过时内置版本**（[#4017](https://github.com/nanocoai/nanoclaw/pull/4017)）
   - 状态：✅ 已修复。

## 6. 功能请求与路线图信号

从当前开放的 PR 中可读出以下路线图信号：

| 信号 | PR | 方向判断 |
|---|---|---|
| **iMessage/SMS 官方集成** | [#4043](https://github.com/nanocoai/nanoclaw/pull/4043) | 若被合并，意味着 NanoClaw 将突破传统 IM 渠道，进入短信/Apple 生态，扩展"不可替代"的触达场景 |
| **FXMacroData MCP 工具技能** | [#4040](https://github.com/nanocoai/nanoclaw/pull/4040) | 社区正在持续补充 MCP（Model Context Protocol）工具的快速接入能力，继 Tavily 之后的又一数据源技能；说明 MCP 生态接入是活跃方向 |
| **Lean 模式：低上下文定时任务** | [#3932](https://github.com/nanocoai/nanoclaw/pull/3932) | 为定时任务提供"最小上下文"运行模式，使小模型/本地模型也能低成本执行任务。这指向**资源效率优化**方向，可能吸引更多个人开发者用户 |
| **Provider Wrapper 机制** | [#3925](https://github.com/nanocoai/nanoclaw/pull/3925)、[#3930](https://github.com/nanocoai/nanoclaw/pull/3930) | 允许安装方包装 provider、实现按查询模型切换和失败重试；属于扩展性架构改进，为第三方接入铺路 |
| **细粒度审批控制** | [#4015](https://github.com/nanocoai/nanoclaw/pull/4015) | 无凭据读取免审批卡已合并，后续可能继续优化审批卡策略，减少高流量场景下的操作噪音 |

以上 PR 多数已获得 `follows-guidelines` 标记并处于开放等待合并状态，预计 v2026.10.0 正式版发布后，维护者将逐步审阅合并。

## 7. 用户反馈摘要

- **macOS 更新用户（@zanvan）**：[#4021](https://github.com/nanocoai/nanoclaw/issues/4021) 报告 2.3.0 → 2.4.0 更新时因竞态导致切换中断，好在"能干净回滚，但代价大"。这反映出用户在更新失败时最在意的是**可回滚性**和**失败透明度**。修复方案（等待宿主进程退出后再做快照）直接回应了这一痛点。
- **Iron Proxy 场景用户**：[#4015](https://github.com/nanocoai/nanoclaw/pull/4015) 的 PR 描述中提到"一个网页产生十几张审批卡"，这反映出**高流量网页浏览场景中审批噪音过大**是实际使用瓶颈。修复后读取类无凭据请求不再产生卡片，体验提升明显。
- **OneCLI 升级用户**：[#4036](https://github.com/nanocoai/nanoclaw/pull

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-06

## 1. 今日速览

过去 24 小时项目活跃度温和：新开 2 个 Issue、新提交 2 个 PR，无版本发布、无 PR 合并。#8126 是一份自动化的每日失败分类（failure taxonomy）报告，显示 officeqa 基准套件中有 37 个非通过用例，并指向模型质量问题而非框架缺陷；#8124 则是一个来自自托管部署用户的 WebChat 后台标签页状态过期 Bug，同时伴随一个针对性的修复 PR。#8127 新增 Sendblue iMessage/SMS 扩展，是一个新的渠道集成功能，表明项目在消息通道扩展上仍在持续推进。总体而言，项目当前处于"提交活跃、合并暂缓"的节奏，社区讨论量较低（所有条目评论数均为 0），但 Issue 质量较高，均附带详细环境与复现信息。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有 PR 被合并或关闭。两个新提交的 PR 进入待审查状态，代表着两个正在推进的方向：

- **多通道消息扩展**：[#8127 feat: add Sendblue iMessage and SMS extension](https://github.com/nearai/ironclaw/pull/8127) — 新增一个 bundled Sendblue 扩展，使 IronClaw 能够通过 iMessage/SMS 与用户直接通信，涵盖手机配对、认证 webhook 接收、终端回复以及 DM 目标存储，并复用现有 host 生命周期与会话路径。这是一项实质性新功能，若合并将显著拓宽 IronClaw 的触达渠道。
- **WebChat 稳定性修复**：[#8125 fix(webui): keep run state and notification inbox fresh in background tabs](https://github.com/nearai/ironclaw/pull/8125) — 处理 #8124 中列出的 stale-state 问题（前两项），通过 `query-client.ts` 中开启 `refetchOnWindowFocus` 以及在通知模块中的一个单行配置，使后台标签页返回时能立即刷新 run/action 状态。该 PR 呈报为"最小改动"，仅两个单行 flag，合并成本较低。

虽然今日无合并，但两个 PR 若顺利合入，将分别在"新渠道能力"和" WebChat 前端稳定性"两个维度产生可见进展。（注：PR 描述中未给出评论数，GitHub 数据中 `comments` 字段为 undefined，此处按 0 处理）

## 4. 社区热点

今日所有 Issue/PR 的评论数均为 0，未形成明显讨论热点。相对值得关注的是：

- [#8124 WebChat stale action status and silent Web Push gap](https://github.com/nearai/ironclaw/issues/8124)：来自自托管用户的详细 Bug 报告，问题描述最为完整（包含环境、预期行为和实际表现的对比）。反映了自托管用户在非 TLS 部署下无法使用 Web Push 完成通知的痛点，这是从真实使用场景中暴露出的平台能力缺口。
- [#8126 Daily ironclaw failure taxonomy](https://github.com/nearai/ironclaw/issues/8126)：自动化生成的每日失败分类报告，虽然无人工讨论，但这类制度化质量追踪本身反映了项目对 benchmark 健康度的持续关注。本次分析显示 officeqa 的 37 个非通过用例中绝大部分是 DeepSeek-V4-Flash 的模型精度问题。

## 5. Bug 与稳定性

按影响程度排列：

- **中 — WebChat 后台标签页状态过期**（[#8124](https://github.com/nearai/ironclaw/issues/8124)）：用户报告在 `ironclaw serve` 1.4.1 自托管且使用普通 HTTP 的环境下，后台标签页中 tool/action 状态信息（`tool-activity`、`activity` 等）停止更新，且任务完成后没有通知提示。影响日常操作效率，不损坏数据。**已有修复 PR**（[#8125](https://github.com/nearai/ironclaw/pull/8125)），但仅覆盖前两项（stale state），第三项"无声 Web Push"（非 HTTPS 部署下通知无法送达）尚无对应修复方案，需要平台层考虑 fallback 机制。

- **低（质量监控，非代码缺陷）— officeqa 失败分类**（[#8126](https://github.com/nearai/ironclaw/issues/8126)）：officeqa 套件 37 个非通过用例主要归因于 DeepSeek-V4-Flash 的数值推理精度问题，是模型质量而非 IronClaw 框架缺陷。该报告属于自动化质量追踪，无紧急修复需求，但值得模型侧关注。

## 6. 功能请求与路线图信号

- **iMessage/SMS 通道支持**（[#8127](https://github.com/nearai/ironclaw/pull/8127)）：由社区贡献者 @lookevink 直接以 PR 形式实现，说明 iMessage/SMS 是很明确的外部需求。该 PR 设计上遵循了"现有 host 生命周期与会话路径"，体现了对既有架构约束的尊重，被合入主干的可能性较高。如果合并，下一版本很可能会将 Sendblue 作为预置扩展纳入。

- **Web Push 在非 HTTPS 环境的降级方案**（来自 [#8124](https://github.com/nearai/ironclaw/issues/8124) 的第三部分）：用户在非 TLS 自托管场景下无法收到后台完成通知，目前的期望是"至少应该有一种替代通知方式"。这暗示了一个潜在的功能需求——为 LAN/HTTP 部署提供 Web Push 之外的本地通知 fallback（如浏览器 Notification API 或内嵌提示音），但尚未形成明确提案或对应 PR。

- **模型质量跟踪的产品化**（来自 [#8126](https://github.com/nearai/ironclaw/issues/8126)）：每日自动生成失败分类报告是一项有价值的质量基础设施，但将其暴露为 Issue 的形式可能不是最终形态。未来或将逐步演化为可查询的 dashboard，与 `nearai.github.io/benchmarks` 深度整合。

## 7. 用户反馈摘要

- **来自 @heraisys-sas 的部署心得**（[#8124](https://github.com/nearai/ironclaw/issues/8124)）：使用场景为单租户自托管，在局域网内通过普通 HTTP 访问 WebChat。反馈了三点：后台标签页状态不刷新、任务完成无通知、非 HTTPS 下 Web Push 不可用。用户的期望表达得很明确——"回到标签页时应看到最新状态，且任何网络环境下都应有完成通知"。该用户同时提交了修复 PR（#8125），说明其具备一定技术能力且愿意反哺项目，属于高质量的社区贡献者。
- **Officeqa 质量分析**（[#8126](https://github.com/nearai/ironclaw/issues/8126)）：提供了 DeepSeek-V4-Flash 在 officeqa 任务上的具体失败类型归属，可用于后续模型选型参考。

## 8. 待处理积压

目前所有工作项均为 24 小时内新建，无长期未响应的积压 Issue 或 PR。需要关注的是：

- [#8125 后台刷新修复 PR](https://github.com/nearai/ironclaw/pull/8125) 已等待约 1 天，改动量小、目标明确，建议维护者尽快安排审查，以响应 #8124 用户的诉求。此 PR 只解决了问题的一半，合并后需决定 #8124 是否保留以追踪剩余的通知降级问题。
- [#8127 Sendblue 扩展 PR](https://github.com/nearai/ironclaw/pull/8127) 属于新功能，涉及外部服务凭证托管和 webhook 安全，建议在审查中重点关注 credential 管理和扩展的沙箱边界，以控制合并风险。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-06

## 今日速览

过去 24 小时内，LobsterAI 仓库保持中等偏高的活跃度：共更新 9 条 Issue（新开/活跃 7 条，关闭 2 条）和 6 条 PR（3 条已合并/关闭，3 条待合并）。无新版本发布。今日最突出的动态是一名外部安全研究员（@carfeii）集中提交了 4 个安全相关 Issue，并同步提供了修复 PR，项目安全维护响应迅速；同时 3 个功能性修复 PR 已合并，整体项目处于“安全加固 + 持续迭代”状态。

## 版本发布

今日无新版本发布。

## 项目进展

今日共有 3 个 PR 被合并/关闭，均为功能性修复：

- **[#2800 fix(skills): align SKILL.md frontmatter parsing with OpenClaw](https://github.com/netease-youdao/LobsterAI/pull/2800)**  
  修复 LobsterAI 与 OpenClaw 在解析 SKILL.md frontmatter 时的差异（如未加引号的 `description: Use when: ...`），避免技能列表丢失技能信息。这提升了技能生态兼容性。

- **[#2785 fix: P2P direct-message policy fails open instead of closed](https://github.com/netease-youdao/LobsterAI/pull/2785)**  
  修复 NIM P2P 点对点消息策略失效问题（即 #2784），将默认行为从“放行所有”修正为“未显式允许时拒绝”，堵住了一个潜在的安全漏洞。

- **[#2799 fix(skills): stop using temp extraction dir names as skill ids](https://github.com/netease-youdao/LobsterAI/pull/2799)**  
  修复技能安装时将临时解压目录名作为技能 ID 的问题，避免了重复导入和更新检查不匹配。该修复完善了技能安装的幂等性和市场同步逻辑。

以上 PR 的合并表明技能管理、IM 安全策略等模块正在稳步改进，项目整体向前迈进了关键一步。

## 社区热点

今日讨论最集中的是安全研究员 @carfeii 在同一时段提交的 4 个安全相关 Issue，均指向 `main` 分支（未影响最新 tag v0.2.4），并全部附带修复 PR：

- [#2795 OAuth access and refresh tokens are written to diagnostic logs](https://github.com/netease-youdao/LobsterAI/issues/2795)
- [#2796 HTML preview server follows symlinks outside its permitted directory](https://github.com/netease-youdao/LobsterAI/issues/2796)
- [#2797 OpenClaw token proxy accepts unauthenticated requests and forwards them with the user's bearer token](https://github.com/netease-youdao/LobsterAI/issues/2797)
- [#2793 Skill-controlled metadata lets an installed skill cause arbitrary directory deletion on uninstall](https://github.com/netease-youdao/LobsterAI/issues/2793)

这些 Issue 展示了社区对安全质量的严格要求，也反映出 LobsterAI 在 pre-release 阶段仍存在若干安全设计缺陷。另一条老 Issue [#831 最新版不支持 custom 自定义的 gemini 中转模型](https://github.com/netease-youdao/LobsterAI/issues/831) 有 4 条评论，虽为 stale 状态但仍在活跃讨论，显示用户对自定义模型接入的持续需求。

## Bug 与稳定性

今日报告的问题中，4 个为安全漏洞（严重程度高），1 个为既有功能 bug（已修复），另有 1 个长期存在的平台差异问题。按严重程度排列：

1. **[#2793 技能可控元数据导致卸载时任意目录删除](https://github.com/netease-youdao/LobsterAI/issues/2793)**（严重）  
   已安装技能可借助 `_meta.json` 中的 `openclawSourceDir` 字段在卸载时删除任意目录。已有修复 PR [#2794](https://github.com/netease-youdao/LobsterAI/pull/2794)（待合并）。

2. **[#2795 OAuth 令牌写入诊断日志](https://github.com/netease-youdao/LobsterAI/issues/2795)**（严重）  
   `api:fetch` 在日志中完整记录请求/响应体，可能导致访问令牌和刷新令牌泄露。已有修复 PR [#2798](https://github.com/netease-youdao/LobsterAI/pull/2798)（待合并，涵盖 #2795/#2796/#2797）。

3. **[#2796 HTML 预览服务器允许符号链接逃逸](https://github.com/netease-youdao/LobsterAI/issues/2796)**（中等）  
   仅做词法路径检查，未解析符号链接，可能被用于越权读取文件。已在 #2798 中修复。

4. **[#2797 OpenClaw token proxy 接受未认证请求](https://github.com/netease-youdao/LobsterAI/issues/2797)**（中等）  
   临时 HTTP 代理未校验请求来源，可能被本机其他程序利用用户令牌。已在 #2798 中修复。

5. **[#2784 NIM P2P direct-message 策略失败开放](https://github.com/netease-youdao/LobsterAI/issues/2784)**（中等）  
   已通过 PR #2785 修复并合并，Issue 已关闭。

6. **[#834 Windows 与 Mac 上“增值服务”页面不一致](https://github.com/netease-youdao/LobsterAI/issues/834)**（低）  
   平台间打开不同 URL、价格显示不同，且 Windows 页面未登录。该 Issue 自 3 月起处于 stale 状态，今日更新但尚未解决。

## 功能请求与路线图信号

- **[#831 支持 custom 自定义的 gemini 中转模型](https://github.com/netease-youdao/LobsterAI/issues/831)**（4 条评论，热度较高）  
  用户希望能在最新版中使用自定义的 Gemini 中转 API。此需求涉及模型接入灵活性，可能需要在配置层增加自定义 endpoint 支持，目前未见对应 PR，但社区讨论活跃，值得在下一版本评估。

- **[#829 SQLite 参数未针对桌面应用调优](https://github.com/netease-youdao/LobsterAI/issues/829)**  
  建议根据桌面场景调整 SQLite 默认参数。此项偏向性能优化，可能进入后续稳定性迭代。

- **[#989 Tavily MCP 报 401 未授权](https://github.com/netease-youdao/LobsterAI/issues/989)**（今日关闭）  
  可能是配置问题或权限校验 bug，已关闭但未见修复说明，需关注后续是否复发。

## 用户反馈摘要

从今日更新的 Issue 评论与描述中，可以提炼以下用户声音：

- **配置痛点**：用户 @zwy123zwy 在 #989 中反馈“Tavily MCP 报错 401 未授权，api-key 已配置”，说明 MCP 工具在密钥传递或权限校验环节存在体验断裂。
- **功能诉求**：用户 @qinhuai0607010 强调“最新版不支持 custom 自定义的 gemini 中转模型”，表明部分用户依赖第三方中转服务，期望保留灵活的自定义模型接入能力。
- **平台一致性**：用户 @flt2018 详细描述了 Windows/macOS 两端“增值服务”页面不一致的问题，并指出价格显示单位差异（0.1/0.2/0.5 vs 10/20/50）及登录态不同步，疑似存在产品配置或前端 bug。
- **安全关注**：@carfeii 提交的 4 个安全 Issue 均包含影响版本定位、复现路径及修复建议，展现了专业的安全研究视角，也提示项目在 pre-release 阶段需加强安全审计。

## 待处理积压

以下历史 Issue/PR 长期未解决，建议维护者优先关注：

- **[#829 SQLite 参数均为默认值，未针对桌面应用调整](https://github.com/netease-youdao/LobsterAI/issues/829)**  
  创建于 2026-03-25，stale 状态，已开放 6 个月，涉及桌面端性能体验。

- **[#831 最新版不支持 custom 自定义的 gemini 中转模型](https://github.com/netease-youdao/LobsterAI/issues/831)**  
  创建于 2026-03-25，有 4 条评论，属于高频功能需求，但长期未获得官方回应。

- **[#834 Windows 和 Mac 上点击“增值服务”打开的页面不一致](https://github.com/netease-youdao/LobsterAI/issues/834)**  
  创建于 2026-03-25，涉及平台一致性和支付页面显示错误，影响商业转化，建议尽快核实。

- **[#1277 chore(deps-dev): bump the electron group across 1 directory with 2 updates](https://github.com/netease-youdao/LobsterAI/pull/1277)**  
  Dependabot 于 2026-04-02 提交的 Electron 依赖升级 PR，已有 6 个月未合并。长期积压可能造成 Electron 版本滞后，存在安全与兼容性风险。

---

*数据来源：LobsterAI GitHub 仓库（github.com/netease-youdao/LobsterAI），统计周期 2026-10-05 至 2026-10-06。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-10-06

---

## 1. 今日速览

过去 24 小时项目保持**中等活跃度**：共产生 2 条新 Issue 与 2 个待合并 PR，全部由同一位贡献者 @tomachianura 创建。今日无新版本发布、无 PR 被合并，项目当前处于**稳定迭代与修复阶段**。值得关注的是，今日工作围绕两个明确主题展开：**Discord 私聊分类错误**和 **Skills 系统 YAML 格式缺陷**，两者均已有对应修复 PR 在途，响应迅速。整体来看，项目维护者对社区反馈的反应速度较好，健康度良好。

---

## 3. 项目进展

今日**无已合并/关闭的 PR**，但有两个修复性 PR 正在等待合并，均为针对性修复：

| PR | 内容 | 影响 |
|---|---|---|
| [#1295](https://github.com/moltis-org/moltis/pull/1295) | `fix(discord): classify direct messages as direct chats` — 修复 Discord 所有聊天被统一分类为 shared 的问题，保证 1:1 DM 按 direct chat 处理 | 修复聊天分类逻辑，直接影响共享会话中的消息归属与权限隔离 |
| [#1293](https://github.com/moltis-org/moltis/pull/1293) | `fix(skills): quote SKILL.md frontmatter and refuse unparseable skills` — 让 `create_skill` 和 `update_skill` 输出可被 discovery 正确解析的 YAML 元数据 | 修复技能文件的生成物与解析逻辑不一致问题，提升系统可靠性 |

**项目整体进度**：虽然今日无合并事件，但两个 PR 都已就绪，一旦合入将解决两个已报告的稳定性问题。项目正逐步补齐多通道适配细节与技能系统数据完整性，方向明确。

---

## 4. 社区热点

今日 2 条 Issue 与 2 条 PR 均为新开状态，尚无评论和点赞，讨论热度暂未形成。但**从内容关联性来看**，社区关注点集中在以下方向：

- **共享聊天（群组/DM）的会话边界问题**：Issue [#1294](https://github.com/moltis-org/moltis/issues/1294) 提出共享聊天下 per-sender MCP 凭据的诉求，PR [#1295](https://github.com/moltis-org/moltis/pull/1295) 则解决私聊被误判为共享聊天的分类缺陷。两者共同指向**多用户会话隔离与凭据管理**这一核心体验痛点。
- **技能发现与创建的一致性**：Issue [#1292](https://github.com/moltis-org/moltis/issues/1292) 报告了 `create_skill` 成功但产出文件无法解析的矛盾，PR [#1293](https://github.com/moltis-org/moltis/pull/1293) 进行了针对性修复。

> 两个 Issue 目前虽无评论，但均直接对应今日的修复 PR，说明与维护者关注方向高度一致。

---

## 5. Bug 与稳定性

今日报告 1 个 Bug，无崩溃或安全问题，按严重程度排列如下：

---

### 🟡 [#1292](https://github.com/moltis-org/moltis/issues/1292) — `create_skill` 写入无引号的 YAML frontmatter，导致生成的技能文件无法被 discovery 解析

- **严重程度**：中等（功能返回“成功”，但产出物不可被系统消费，属于数据完整性问题）
- **触发场景**：技能描述中包含 `: `、` #`、`&`、`!`、`-` 等特殊字符时，frontmatter 被写入为普通 YAML 标量，导致 `skill discovery` 读取失败或读取错误
- **状态**：已有修复 PR [#1293](https://github.com/moltis-org/moltis/pull/1293) 等待合并
- **影响**：技能创建功能的反馈不一致——用户被告知创建成功，但技能可能无法被系统发现和使用

---

### 🔵 附带发现 — Discord 私聊分类错误（PR [#1295](https://github.com/moltis-org/moltis/pull/1295) 修复）

- **问题描述**：由于 Discord 通道 ID 不编码会话类型，当前所有 Discord 聊天均被分类为共享聊天（`ChannelType::Discord => true`），导致 1:1 私聊也按共享会话逻辑运行
- **严重程度**：功能逻辑缺陷，不影响数据安全，但会导致私聊场景下会话行为异常
- **状态**：修复 PR 已提交

---

## 6. 功能请求与路线图信号

今日唯一的新功能请求为：

**[#1294](https://github.com/moltis-org/moltis/issues/1294) — 共享聊天中支持 per-sender MCP 凭据**

- **请求内容**：在 Telegram/Discord 群组或 Slack 频道等共享会话中，为不同的消息发送者提供独立的 MCP 凭据，实现按发送人归因的访问控制
- **现状痛点**：当前共享会话内所有消息由同一个 session 处理，所有 MCP 服务收到相同的静态凭证，无法区分消息来源
- **路线图信号**：此功能虽然尚未有对应 PR，但与今日的 [#1295](https://github.com/moltis-org/moltis/pull/1295)（正确区分 DM 与共享聊天）高度关联，两者共同指向 **“多用户、多身份会话”** 这一演进方向。推测该功能可能会在后续版本中分阶段实现：先正确分类会话类型，再引入 per-sender 的凭据管理机制。

---

## 7. 用户反馈摘要

今日 2 条 Issue 均无评论区互动，最直接的“用户反馈”来自 Issue 作者 @tomachianura 的描述：

- **不满意点**：`create_skill` 返回 `{"created": true}`，但实际生成的 SKILL.md 文件因未加引号的 YAML frontmatter 无法被 discovery 解析（[#1292](https://github.com/moltis-org/moltis/issues/1292)）。用户认为这是一种**误导性的成功反馈**，即系统报告成功但产出物不可用，这会破坏用户对技能系统的信任。
- **使用场景**：Discord 私聊被误判为共享聊天会影响运营者与 bot 之间的 1:1 操作体验（[#1295](https://github.com/moltis-org/moltis/pull/1295)）；共享聊天中群消息无法按发送者归因，限制了对 MCP 工具的精细化授权（[#1294](https://github.com/moltis-org/moltis/issues/1294)）。

> 反馈中反映了对系统**反馈真实性**、**会话身份边界**的关注，两者均为实际使用中的体验痛点。

---

## 8. 待处理积压

**今日无积压问题。**

当前所有 Issue 和 PR 均为 24 小时内新开，不存在超过合理响应周期仍未获得维护者关注的项目。经检索，数据范围内没有长期未关闭的 Issue 或 PR 需要提醒维护者跟进。

---

*本日报数据来源于 [Moltis GitHub 仓库](https://github.com/moltis-org/moltis)，统计窗口为 2026-10-05 至 2026-10-06。*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

## CoPaw 项目动态日报 — 2026-10-06

> 数据来源：github.com/agentscope-ai/QwenPaw（CoPaw 仓库）  
> 统计周期：过去 24 小时

---

### 1. 今日速览

过去 24 小时项目活跃度处于**高位**：共 42 条 Issue 更新（41 条活跃、1 条关闭）与 23 条 PR 更新（22 条待合并、1 条合并/关闭），无新版本发布。社区反馈以 **Bug 报告**为主，集中在会话上下文污染、供应商兼容性、安全沙箱边界等问题；值得关注的是，今日多条新开 Bug 均有对应修复 PR 在途，显示维护者响应迅速。但 22 条 PR 长期处于待合并状态（最早可追溯至 8 月中旬），**合并积压**可能是当前迭代的主要瓶颈。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 项目进展

今日仅 1 条 PR 被关闭，另有若干关键 PR 在今日获得更新（状态未变）：

- **[#8113 [CLOSED] feat(channels): pilot backward-compatible DingTalk plugin](https://github.com/agentscope-ai/QwenPaw/pull/8113)** — 将钉钉渠道收发实现独立为 `dingtalk` channel 插件，通过 PluginLoader 加载，兼容优先，原配置/凭据/会话文件无需重新配置。这是钉钉渠道从内置实现走向插件化的第一步，具有一定架构意义，但 PR 被关闭而非合并，具体原因需维护者确认。

- **[#7307 [OPEN] feat(console): chain provider config straight into model management](https://github.com/agentscope-ai/QwenPaw/pull/7307)**（今日更新） — 简化控制台添加模型的流程，将原来跨两个弹窗的五步操作整合为一步，提升核心配置路径的可用性。已存在 40 天仍未合并，值得关注。

- **[#7066 [OPEN] fix(drivers): persist rotated refresh_token for OAuth2 auth-code providers](https://github.com/agentscope-ai/QwenPaw/pull/7066)**（今日更新） — 修复远程 MCP 服务器使用 OAuth2 Authorization Code + 轮换 refresh_token 时令牌未持久化的问题，影响 XMind 等服务的长期稳定性。已存在 51 天。

整体而言，今日无重大功能落地，项目进展主要体现在**修复 PR 的持续累积**上。

---

### 4. 社区热点

按评论数排序，今日最受关注的 Issue 为：

- **[#7599 [Bug] 使用 opencode go 套餐时一直出现 "MissingSessionID"](https://github.com/agentscope-ai/QwenPaw/issues/7599)**（评论 4） — 用户 @tina0501853 报告在使用 opencode go 套餐模型时频繁遭遇 `MissingSessionID` 错误，导致模型连接测试失败。该 Issue 创建于 9 月初，持续活跃至今，说明**多日未解决且影响面较大**，背后可能是 OpenCode 协议会话头管理缺陷。

- **[#8022 [Bug] send_file_to_user 产生的 file/image 内容块 + 空 assistant 消息污染会话上下文](https://github.com/agentscope-ai/QwenPaw/issues/8022)**（评论 4） — AI 助手自动整理的高质量 Bug 报告：文件发送产生的内容块与空 assistant 消息叠加，导致后续所有请求对所有模型持续 400，且未按模型能力降级 content。反映用户对**会话上下文持久化机制**的担忧。

- **[#7991 [Bug] TaskTracker 僵尸条目使 running_task_count 膨胀，与 /api/chats 不一致](https://github.com/agentscope-ai/QwenPaw/issues/7991)**（评论 4） — Dashboard 显示 2 个运行任务，但 API 只返回 1 个 `status="running"` 的会话，聚合计数器与 per-chat 计数器作用域不一致。**监控数据可信度**问题引发讨论。

- **[#7948 [Bug] Web 控制台设计缺陷破坏用户输入](https://github.com/agentscope-ai/QwenPaw/issues/7948)**（评论 3） — 用户对控制台 UI 提出批评，认为设计存在问题影响正常输入操作。该类 UX 反馈虽非功能缺陷，但对用户留存有直接影响。

**热点诉求分析**：开发者当前最痛的点集中在三方面 — ① 供应商协议兼容（MissingSessionID、MCP 握手）；② 会话/上下文状态管理（污染、僵尸条目、计数不一致）；③ 控制台可用性。这三者共同指向**核心会话链路的健壮性**。

---

### 5. Bug 与稳定性

以下按严重程度排列今日活跃的 Bug，并标注是否已有修复 PR：

| 严重度 | Issue | 问题简述 | 对应修复 PR |
|--------|-------|---------|------------|
| 🔴 严重 | [#8022](https://github.com/agentscope-ai/QwenPaw/issues/8022) | 文件内容块 + 空 assistant 消息污染上下文，**所有模型持续 400** | 无直接 PR；[#8010](https://github.com/agentscope-ai/QwenPaw/pull/8010) 可恢复媒体负载被拒绝的会话（部分相关） |
| 🔴 严重 | [#8064](https://github.com/agentscope-ai/QwenPaw/issues/8064) | DeepSeek 发送 PDF 后**会话永久损坏**，后续全部 400 | [#8010](https://github.com/agentscope-ai/QwenPaw/pull/8010)（相关） |
| 🔴 严重 | [#8105](https://github.com/agentscope-ai/QwenPaw/issues/8105) | 工具审批按钮失效，同意/拒绝均执行拒绝 | 无 |
| 🟠 高 | [#7980](https://github.com/agentscope-ai/QwenPaw/issues/7980) | `grep_search` 匹配内部 `history.db-wal`，导致会话状态中毒、死循环 | [#7988](https://github.com/agentscope-ai/QwenPaw/pull/7988) |
| 🟠 高 | [#7599](https://github.com/agentscope-ai/QwenPaw/issues/7599) | opencode go 套餐持续 `MissingSessionID`，连接测试失败 | 无（长期未解决） |
| 🟠 高 | [#8077](https://github.com/agentscope-ai/QwenPaw/issues/8077) | Qoder 第三方 Agent：自定义模型不可见 + 上下文用量计隐藏（3 个缺陷） | 无 |
| 🟠 高 | [#8073](https://github.com/agentscope-ai/QwenPaw/issues/8073) | V2.2.2.beta4 局域网访问时对话页无法打开 | 无 |
| 🟡 中 | [#8093](https://github.com/agentscope-ai/QwenPaw/issues/8093) | 运行时阻止多模态输入，但 catalog/prober 声称 `supports_multimodal=true` | 无 |
| 🟡 中 | [#8088](https://github.com/agentscope-ai/QwenPaw/issues/8088) | 图片路由到 chat_with_image 后陷入 Bash+PIL 裁剪循环，最终静默取消 | 无 |
| 🟡 中 | [#8106](https://github.com/agentscope-ai/QwenPaw/issues/8106) | 容器内插件安装失败：`PIP_TARGET` 泄漏 + PYTHONPATH stdlib 遮蔽 | 无 |
| 🟡 中 | [#8047](https://github.com/agentscope-ai/QwenPaw/issues/8047) | DBX MCP 的 HTTP 422 未被视为 legacy 协议证据，streamable_http 驱动不激活 | [#8051](https://github.com/agentscope-ai/QwenPaw/pull/8051) |
| 🟡 中 | [#8074](https://github.com/agentscope-ai/QwenPaw/issues/8074) | GPT-6 模型连接测试失败：token 参数白名单只匹配 `gpt-5*` | [#8090](https://github.com/agentscope-ai/QwenPaw/pull/8090) |
| 🟢 低 | [#8046](https://github.com/agentscope-ai/QwenPaw/issues/8046) | 转录时间戳因固定 UTC offset 而非 DST 规则导致偏移 | [#8050](https://github.com/agentscope-ai/QwenPaw/pull/8050) |
| 🟢 低 | [#8035](https://github.com/agentscope-ai/QwenPaw/issues/8035) | 转录设置页无法配置 `transcription_model`，切换供应商后静默失败 | [#8052](https://github.com/agentscope-ai/QwenPaw/pull/8052) |
| 🟢 低 | [#8013](https://github.com/agentscope-ai/QwenPaw/issues/8013) | 技能池下载 80MB 大技能 30 秒超时，后端仍在执行但前端已 abort | [#8055](https://github.com/agentscope-ai/QwenPaw/pull/8055) |
| 🟢 低 | [#8002](https://github.com/agentscope-ai/QwenPaw/issues/8002) | Windows 沙箱关闭时，内联 Office COM

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