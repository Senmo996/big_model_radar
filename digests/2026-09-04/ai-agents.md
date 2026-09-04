# OpenClaw 生态日报 2026-09-04

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-04 01:52 UTC

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

# OpenClaw 开源项目动态日报 — 2026-09-04

## 1. 今日速览

过去 24 小时项目保持高强度迭代：共产生 500 条 Issue 更新（新开/活跃 351 条，关闭 149 条）与 500 条 PR 更新（待合并 390 条，合并/关闭 110 条），并发布 v2026.9.1 新版本。当前积压中 P0 级别问题共 4 项（其中 3 项已有对应 fix PR），P1 问题约 30 项，整体修复节奏较快但新报告问题的速度同样较高。社区讨论热度集中在 SQLite 数据损坏、进程/内存泄漏、Windows 升级路径三大主题。

## 2. 版本发布

### [v2026.9.1](https://github.com/openclaw/openclaw/releases/tag/v2026.9.1)

**主要亮点：**
- **所有聊天中的图表渲染**：Mermaid 代码块现可在 Control UI 及原生 macOS、iOS、Android 应用中渲染为图表，支持放大预览，移动端渲染失败时提供重试（#134913, #135746, #135470, #135342）
- **从安装到聊天的流程优化**：新安装引导流程有所改进（Release 说明此处截断，未展示完整细节）

由于 Release 说明不完整，建议关注以下风险点：
- 8 月 31 日发布的 v2026.8.1 中大量问题（SQLite 损坏、进程泄漏、context 处理等）仍在修复中，升级前需关注这些修复是否已合入 v2026.9.1
- 若从 2026.7.x 旧版本升级，请参阅 #136203（Windows 升级遗留状态）和 #137377（doctor --fix 在 Windows 上失败）中的经验

---

## 3. 项目进展

今日合并/推进了多个重要功能与修复：

### 已合并（CLOSED PR）

| PR | 内容 | 意义 |
|---|---|---|
| [#137635](https://github.com/openclaw/openclaw/pull/137635) perf(skills): 预准备 watch 源路径 | 减少重复 symlink 扫描，优化技能监视器性能 | 生产 +14/-15（净 -1），无行为变更 |
| [#137638](https://github.com/openclaw/openclaw/pull/137638) perf(backup): 刷新归档空闲看门狗 | 将每次遍历都重建定时器改为复用操作自有定时器 | 降低备份过程中的资源消耗 |

### 待合并的重要 PR（已就绪）

| PR | 内容 | 状态 |
|---|---|---|
| [#135599](https://github.com/openclaw/openclaw/pull/135599) **插件热管理**：不重启 Gateway 即可安装/启用/禁用/重载插件，运行中会话可采纳新代码 | 涵盖 CLI、Gateway RPC、Control UI、agent 操作全链路 | 👀 待维护者审查，size: XL |
| [#134943](https://github.com/openclaw/openclaw/pull/134943) **插件自定义 Control UI**：开放公共 feature-plugin SDK，插件作者无需修改 UI 核心即可提供集成工作区功能 | 支持 agent 脚手架构建插件并直接呈现 UI | 👀 待维护者审查，size: XL |
| [#136533](https://github.com/openclaw/openclaw/pull/136533) **修复 heartbeat 会话忽略 transcript 字节上限**（#136452 P0）：无界 transcript 增长导致 V8 OOM | P0 修复 | 📣 需要 proof |
| [#136998](https://github.com/openclaw/openclaw/pull/136998) **修复 Gateway 关闭后的迟到请求失败**：避免 Control UI 加载中关闭 Gateway 导致异步请求悬挂 | 关联 #127256, #136145, #136036 | 👀 待维护者审查 |
| [#137527](https://github.com/openclaw/openclaw/pull/137527) **Doctor 报告私有化与可恢复**：防止预填报告 URL 或 GitHub CLI 错误文本泄露，支持跨进程安全恢复 | 修复 #124396 | 👀 待维护者审查 |

### 新提交的值得关注 PR

- [#137779](https://github.com/openclaw/openclaw/pull/137779) fix(agents): 传递 durable session key 作为可见 spawn 父级谱系（修复 #137690）
- [#137775](https://github.com/openclaw/openclaw/pull/137775) improve(config): 退役 `messages.suppressToolErrors`，确保工具失败永远不会静默结束运行（回应 #39406）
- [#137776](https://github.com/openclaw/openclaw/pull/137776) fix(ai): 保护 transcript 转换和错误分类器中未防护的 `.trim()` 调用，防止崩溃（修复 #137729）

---

## 4. 社区热点

### 🔥 最多评论 Issue

| Issue | 评论数 | 热点分析 |
|---|---|---|
| [#125626](https://github.com/openclaw/openclaw/issues/125626) OpenClaw 2026.8.1 beta 反馈 | 24 | 版本验证集中反馈帖，说明 beta 验证流程活跃，但也反映 8.1 分支问题较多 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) SQLite 无界增长：memory_index_chunks + memory_embedding_cache 无保留策略，将逐步填满磁盘 | 11 | 生产环境长期运行的核心存储问题，被标记为 "diamond lobster"（高影响等级）但尚未有 fix PR——社区关注度高 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/tool 子进程泄漏导致 zombie 堆积和运行时性能退化 | 10 | 跨 3 个月仍未解决的进程管理问题，影响长期运行部署的稳定性 |
| [#110190](https://github.com/openclaw/openclaw/issues/110190) 运行时上下文载体位于用户消息之后导致模型困惑和推理 token 浪费 | 9 | 影响所有用户的 prompt 构造问题，与 #123265 (role:"custom" 序列化问题) 形成系列 |

### 🔥 热门 PR

- [#137780](https://github.com/openclaw/openclaw/pull/137780) 修复 legacy identity 迁移后 owner-only 命令失效（由社区用户 @shakkernerd 报告触发）
- [#137313](https://github.com/openclaw/openclaw/pull/137313) 修复 Discord 仅转发消息（无附加文字）无法到达 agent 的问题
- [#137685](https://github.com/openclaw/openclaw/pull/137685) UI：Dashboard 添加 composer 启动器

### 诉求分析

社区讨论热度与当前痛点高度一致：**数据安全（SQLite 损坏/无界增长）**、**资源管理（进程/内存泄漏）** 和 **升级路径可靠性** 是用户最关心的三大主题。同时，Discord 转发、Telegram 网络失败等消息通道问题也获得较高关注，反映多平台适配质量对用户留存的重要性。

---

## 5. Bug 与稳定性

### 🔴 P0 严重问题

| Issue | 问题 | 状态 |
|---|---|---|
| [#126821](https://github.com/openclaw/openclaw/issues/126821) | SQLite 损坏在重建后的数据库上 15-24h 内复发，5 天内 5 次事件，包括 "paralyzed gateway" 模式（拒绝所有服务但进程不退） | OPEN，无 fix PR，clawsweeper: needs-maintainer-review |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 升级后 Doctor 维护被阻塞，遗留旧 workspace 状态 | OPEN，fix-shape-clear + queueable-fix，待认领 |
| [#123327](https://github.com/openclaw/openclaw/issues/123327) | 共享状态 WAL checkpoint 在 ext4 上将索引页复制到 SQLite page 1，导致头部被覆盖（数据损坏） | OPEN，needs-info，无 fix PR |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | totalTokens 膨胀在 2026.8.1-beta.2 上仍可复现，#123065 的修复仅覆盖 `api === "cli"`，memory-flush 路径是无保护的棘轮 | OPEN，linked-pr-open |
| [#136452](https://github.com/openclaw/openclaw/issues/136452) | compaction.maxActiveTranscriptBytes 对 heartbeat 驱动的会话静默不生效，无界 transcript 增长 → V8 OOM | OPEN，已有 fix PR [#136533](https://github.com/openclaw/openclaw/pull/136533) 待验证 |

### 🟠 P1 重点问题（有 fix PR 或接近修复）

| Issue | 问题 | fix PR |
|---|---|---|
| [#134938](https://github.com/openclaw/openclaw/issues/134938) | doctor --fix 在 legacy exec-approvals gate 上死锁（2026.8.1 回归） | 已关闭（已修复） |
| [#135970](https://github.com/openclaw/openclaw/issues/135970) | codex 插件 dist/extensions/codex 缺少 node_modules（Managed Codex app-server binary not found） | 已关闭（已修复） |
| [#136113](https://github.com/openclaw/openclaw/issues/136113) | claude-cli stdout 超过 ~50KB 时返回空响应（25 个 turn 中丢失 11 个） | 已关闭（已修复） |
| [#134307](https://github.com/openclaw/openclaw/issues/134307) | MCP oauth 服务器在 claude-cli 运行时缺席工具目录 | 已关闭（已修复） |
| [#137377](https://github.com/openclaw/openclaw/issues/137377) | Windows 上 Doctor --fix 最终重启步骤失败（2026.8.2） | 已关闭（已修复） |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | 命令执行器在 spawn ssh 时挂起（2026.8.1 回归，8.2 仍存在） | OPEN，无 fix PR |

### 🟡 资源泄漏系列（持续关注）

- [#125344](https://github.com/openclaw/openclaw/issues/125344)（已关闭）memory-core 本地 embedding worker 和 codex app-server 无 idle TTL 泄漏
- [#86119](https://github.com/openclaw/openclaw/issues/86119)（OPEN）子代理/cron 运行后孤儿 node server.js worker 进程积累（5/24 报告，至今未修复）
- [#136311](https://github.com/openclaw/openclaw/issues/136311)（OPEN）Gateway 每次启动都重新获取 reindex 锁，导致索引无法修复；19GB 孤儿 temp DB 积累
- [#136175](https://github.com/openclaw/openclaw/issues/136175)（OPEN）2026.8.2 全量本地 memory reindex 使 CPU 饱和并阻塞诊断
- [#136284](https://github.com/openclaw/openclaw/issues/136284)（OPEN）legacy .tmp-\<uuid\> memory-core shadow reindex 文件永久泄漏

---

## 6. 功能请求与路线图信号

### 高可能性进入下一版本

| Issue/PR | 功能 | 信号 |
|---|---|---|
| [#135599](https://github.com/openclaw/openclaw/pull/135599) | 插件热管理/热重载 | 超大 PR，覆盖面广，已就绪待审查 |
| [#134943](https://github.com/openclaw/openclaw/pull/134943) | 插件定制 Control UI 的公开 SDK | 同上，互为补充 |
| [#72741](https://github.com/openclaw/openclaw/issues/72741) | 外部安全和护栏检查的标准接口 | 9 条评论，security 标签，社区关注度高 |
| [#137775](https://github.com/openclaw/openclaw/pull/137775) | 退役 `messages.suppressToolErrors`，工具失败不再静默 | 直接回应 #39406 的长期讨论 |

### 社区呼声较高的新功能方向

- **[#121729](https://github.com/openclaw/openclaw/issues/121729)** 用户友好的每日模型消费限额（共享 + 每 agent）：运维人员希望放心运行无人值守 agent → 有望与 cron/automation 功能联动
- **[#126781](https://github.com/openclaw/openclaw/issues/126781)** /loop 和 Automations 支持持久化 Lobster 工作流：返回稳定 flow ID，Gateway 重启不产生重复运行
- **[#120244](https://github.com/openclaw/openclaw/issues/120244)** cron 维护窗口 + 角色隔离（RFC）：社区有后续讨论，但无明确实现计划
- **[#132781](https://github.com/openclaw/openclaw/issues/132781)** streaming 模式下用最新 commentary 替代静态 "Working" 标签

### 需产品决策的功能请求（可能被延后）

- [#39406](https://github.com/openclaw/openclaw/issues/39406) 配置项压制瞬时工具错误警告（9 条评论，当前已有 PR #137775 走"彻底移除"路线而非"配置化"）
- [#122019](https://github.com/openclaw/openclaw/issues/122019) `openclaw update status` 需评估已配置插件兼容性和不可逆迁移风险
- [#126874](https://github.com/openclaw/openclaw/issues/126874) Windows CI 仅覆盖 0.60% 测试套件——基础设施问题，产品决策层面需评估 Windows 支持优先级

---

## 7. 用户反馈摘要

### 用户痛点

- **生产环境数据安全焦虑**：多名用户报告 SQLite 损坏、无界增长问题（#114612、#126821、#123327），且修复周期长。评论中反映生产部署在等待修复期间需要临时脚本自行清理，操作负担重。
- **Windows 升级体验不佳**：多个 Windows 相关升级问题集中爆发（#136203 de-DE 升级阻塞、#137377 doctor --fix 失败、#134179 Gateway 启动失败），Windows 用户升级路径仍需打磨。
- **资源泄漏影响长期运行**：进程泄漏和内存无界增长问题反复出现（#97616、#86119、#136175），用户的 Docker 部署在运行数周后出现明显性能退化。
- **模型上下文处理不稳定**：#110190（上下文载体位置）、#123265（role:"custom" 序列化）、#127239（context window 回退到 200k 硬编码）等问题影响所有使用大上下文模型的高级用户，且相互交织，用户难以自行排查。

### 用户认可的方向

- Mermaid 图表渲染进入所有客户端（v2026.9.1亮点）被认为是直观的体验提升
- 插件热管理 PR（#135599）获得较多正向关注，用户希望减少重启 Gateway 的运维负担
- 社区对"修复 Windows CI 覆盖 0.60% 测试"问题（#126874）表达了支持，认为这有助于防止 Windows 特定的回归问题

### 特殊提交方式说明

- [#124911](https://github.com/openclaw/openclaw/issues/124911) 由 "Tony，Scott Hanselman 的 OpenClaw agent" 代提交，帖中明确说明分析由 agent 完成，非 Scott 本人。这反映了用户对 agent 自主性和维护者响应方式的新需求：

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告（2026-09-04）

## 1. 生态全景

本次跟踪的 12 个开源项目中，9 个有实际动态，3 个完全无活动。**OpenClaw 以 500 条 Issue、500 条 PR 的单日更新量级一骑绝尘**，是生态绝对核心；CoPaw（31 Issue / 29 PR）与 Zeroclaw（50 Issue / 50 PR）构成第二梯队，但 Zeroclaw 出现 50 条 PR 全部未合并的异常信号。整个生态正处于**快速迭代、多线并进**的阶段：SQLite 存储可靠性、上下文窗口管理、插件热管理、消息通道稳定性是跨项目反复出现的共性痛点，安全沙箱与指令防护开始被社区进行对抗性测试。与此同时，多个项目（NanoBot、IronClaw、LobsterAI）合并率超过 50%，显示部分子生态已进入质量巩固期；而 PicoClaw、Moltis 活跃度偏低，TinyClaw、ZeptoClaw、EasyClaw 暂无活动，生态分化明显。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 合并/关闭率 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 351，关闭 149） | 500（合并/关闭 110，待合并 390） | v2026.9.1 | 22% | 高活跃 + 高压力；P0 积压 4 项，修复节奏快但新问题涌入更快 |
| **Zeroclaw** | 50 | 50 | 无 | 0%（50 条全部待合并） | 高活跃但合并流程异常，疑似评审瓶颈，健康度中低 |
| **CoPaw** | 31（含关闭/活跃） | 29（合并 9，待合并 20） | **v2.2.0 Stable** | 31% | 健康中高；2.2.0 发布 + 2.2.1 开发线开启，但有安全报告待澄清 |
| **NanoBot** | 3 新开 / 1 关闭 | 25（合并 13） | 无 | 52% | 高；合并率高，修复精准，核心维护者响应迅速 |
| **IronClaw** | 7（4 活跃 / 3 关闭） | 17（合并 9） | 无 | 53% | 高；TS 类型化战役收官，CI 恢复稳定 |
| **LobsterAI** | 6（1 新开 / 2 关闭 / 3 活跃） | 15（合并 10） | 无（下版本 2026.9.4 筹备中） | 67% | 高；安装器/语音/UI 多方向稳定推进 |
| **NanoClaw** | 5（4 新开） | 23（合并 3） | 无 | 13% | 中；架构重构期（provider 契约），20 条 PR 积压 |
| **PicoClaw** | 5（4 活跃 / 1 关闭） | 7（合并 1） | 无 | 14% | 中低；依赖升级为主，重要 Bug 无维护者回复 |
| **Moltis** | 0 | 1（待审查） | 无 | 0% | 低；几乎停滞，仅 1 条 PR 在审 |
| **TinyClaw / ZeptoClaw / EasyClaw** | 无活动 | 无活动 | 无 | — | 停滞 / 数据不足 |

*注：各项目统计口径为"过去 24 小时更新量"，非新开数；合并/关闭率含关闭的 Issue 与 PR，仅供参考。*

## 3. OpenClaw 在生态中的定位

- **社区规模与活跃度断层领先**：单日 500 条 Issue + 500 条 PR，是第二梯队（Zeroclaw/CoPaw）的 10 倍，其余项目普遍在个位数到 30 条区间。这一量级说明 OpenClaw 是生态内事实上的**标准参照实现**。
- **技术路线优势**：完整覆盖 **Gateway + Control UI + 原生客户端（macOS/iOS/Android）** 的全栈架构，是所有项目中客户端矩阵最完整的。相比 NanoBot 的 SDK 定位、LobsterAI 的桌面壳层定位、CoPaw 的 Web 优先定位，OpenClaw 是唯一能同时服务于**个人单机用户**与**生产自托管部署**的项目。
- **生态治理领先**：建立了 P0/P1 分级、beta 用户验证帖、doctor 诊断工具、Windows 升级指引等系统化反馈机制。插件热管理（#135599）与插件自定义 UI 公开 SDK（#134943）两个大型 PR 显示其在向**平台化生态**演进——这是其他项目尚未触及的深度。
- **值得警惕的风险**：SQLite 数据损坏、进程/内存泄漏、Windows 升级路径三大顽疾长期未根治（#126821、#97616、#136203），且新问题报告速度（351 条新开）超过修复速度（149 条关闭），P0 问题平均解决周期偏长。若核心稳定性问题持续积压，可能为 Zeroclaw、CoPaw 等竞品创造迁移窗口。

## 4. 共同关注的技术方向

### ① 数据存储

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-04

## 1. 今日速览

过去 24 小时 NanoBot 项目保持高度活跃：共产生 25 条 PR 更新，其中 13 条已合并/关闭、12 条仍在审查中，合并率约 52%；Issues 侧新增 3 个开放议题、关闭 1 个历史问题，无新版本发布。修复面覆盖 WebUI 状态恢复、Matrix/Signal 通道健壮性、SDK 事件完整性、Provider 缓存策略等多个模块，社区提交质量高、核心维护者响应迅速。整体看，项目正处于快速迭代的稳定期，移动端与 UI 体验优化正在形成下一波集中方向。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共合并/关闭 13 条 PR，按模块分类如下：

**WebUI 与前端**
- [fix(webui): clear stale stream state after Gateway reconnect](https://github.com/HKUDS/nanobot/pull/5514) — 关闭 #5512，修复 Gateway 重启后 WebUI 一直处于 spinner 状态的问题，根因是 `useNanobotStream` 未订阅 `onRunStatus` 更新，现已清理陈旧流状态。
- [fix(webui): show language names only in their native form](https://github.com/HKUDS/nanobot/pull/5646) — 语言选择器仅显示各语言的本土名称，移除英文显示名，并补充了回归测试。

**通道层（Matrix / Signal / Channels）**
- [fix(matrix): propagate stream delivery failures](https://github.com/HKUDS/nanobot/pull/5637) — Matrix 流式消息投递失败不再被静默吞掉，改为走通道管理器重试策略，失败 delta 会恢复后重发。
- [fix(matrix): complete Element SAS request flow](https://github.com/HKUDS/nanobot/pull/5385) — 支持现代 Element `m.key.verification.request` 事件，完整跑通 SAS 加密验证流程，并拒绝过期/冲突请求。
- [fix(signal): honor wildcard in inbound allowlists](https://github.com/HKUDS/nanobot/pull/5472) — Signal 通道 DM 和群组 allowlist 现支持 `*` 通配符，并补充了接收路径回归测试。
- [fix(channels): preserve indentation across message splits](https://github.com/HKUDS/nanobot/pull/5334) — 长消息拆分为多条时不再丢失缩进，并确保 Signal UTF-16 偏移与真实 chunk 对齐。
- [fix(channels): bound origin reply fingerprint cache](https://github.com/HKUDS/nanobot/pull/5634) — 修复 `_origin_reply_fingerprints` 无限增长的问题，为去重缓存加上容量上限，避免长驻 Gateway 内存泄漏。

**SDK / Agent / Provider**
- [fix(sdk): preserve queued events on stream close](https://github.com/HKUDS/nanobot/pull/5635) — 流队列满时关闭不再丢弃最旧的未读事件，而是等待队列腾出空间再写入结束哨兵。
- [fix(agent): observe session reply timeout task failures](https://github.com/HKUDS/nanobot/pull/5515) — 会话回复超时后台任务的失败将被正确捕获，不再被静默丢弃；正常取消仍保持静默。
- [fix(providers): apply fallback policy to raised errors](https://github.com/HKUDS/nanobot/pull/5413) — 当 LLM Provider 抛出异常而非返回 `finish_reason="error"` 响应时，fallback 链现在也能执行既有错误策略。
- [fix(provider): preserve Codex prompt cache affinity](https://github.com/HKUDS/nanobot/pull/5632) — Codex `session-id` 头与 Responses `prompt_cache_key` 统一使用同一 SHA-256 派生路由键，提升 prompt 缓存命中率。
- [fix(tool_hints): respect max_length for plain tool values](https://github.com/HKUDS/nanobot/pull/5629) — 非路径/非命令类工具参数（如 grep pattern、搜索词、glob）现在也会遵循 `max_length` 截断，避免超长参数破坏 UI 展示。

**小结**：13 条合并 PR 横跨 UI、通道、SDK、Provider 四大层，既有崩溃/回归修复，也有性能与健壮性优化，项目整体稳定性在今日有显著提升，尤其是 Matrix 验证流程和流式投递可靠性两个方向补齐了关键短板。

## 4. 社区热点

- [Issue #5644: Channel locale registry drops a locale (e.g. `en`) when two locales load concurrently](https://github.com/HKUDS/nanobot/issues/5644) — 这是今日评论数最多的 issue（1 条评论），讨论点在 `locale-registry.ts` 中 `translationsByChannel.get(channel) ?? new Map()` 的“先取后写”竞态。该代码路径在启动时若两个 locale 并发加载，后完成的写入会覆盖先完成的 Map 引用，导致 `en` 等 locale 丢失。这是一个值得深挖的并发模型问题。

- [PR #5649: feat(webui): visualize per-request context reuse](https://github.com/HKUDS/nanobot/pull/5649) — 将 token 用量从每条 assistant 消息挪到 composer 弹出层，以百分比和堆叠条可视化“上下文复用率”，并保留跨刷新的请求历史。这是今天最有产品亮点的功能 PR，直击用户对上下文窗口利用率的观察需求。

- [Issue #5512 → PR #5514 闭环](https://github.com/HKUDS/nanobot/issues/5512) — “Gateway 重启后 WebUI 无限 spinner”自 8 月 24 日报告以来获得关注，今日对应修复 PR 合并，issue 同步关闭。从报告到修复约 10 天，体现了项目对用户可感知故障的响应效率。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 高 | [#5645](https://github.com/HKUDS/nanobot/issues/5645) | **回归**：nanobot-ai 0.3.0 中 `ContextBuilder.build_messages()` 不再默认注入 Current Time 运行时上下文，与 0.2.2 行为不一致，影响所有依赖时间感知的 Agent 场景 | 开放，无 fix PR |
| 🟠 中 | [#5644](https://github.com/HKUDS/nanobot/issues/5644) | WebUI 启动时两个 locale 并发加载会丢弃其中一个（如 `en`），典型竞态条件 | 开放，无 fix PR |
| 🟡 低 | [#5647](https://github.com/HKUDS/nanobot/issues/5647) | `unifiedSession` 模式下前端 envelope 缺少 `webui` 标志时不会生成会话标题 | 开放，已有 fix PR [#5648](https://github.com/HKUDS/nanobot/pull/5648) |
| ✅ 已修复 | [#5512](https://github.com/HKUDS/nanobot/issues/5512) | Gateway 重启后 WebUI 停留在 spinner 状态，`isStreaming` 永远为 true | 已关闭，PR #5514 已合并 |

重点关注 #5645 这一回归问题：0.3.0 升级可能让现有用户的 Agent 在无时间上下文的情况下运行，建议尽快确认是否为有意修改并提供迁移说明或兼容开关。

## 6. 功能请求与路线图信号

今日没有新增强型功能请求 issue，但来自 PR 的信号很明确：

- **上下文可视化**（[#5649](https://github.com/HKUDS/nanobot/pull/5649)）：按请求展示 token 用量与上下文复用率堆叠条，预计会成为 WebUI 下一个亮点功能，也可能进入 0.4 版本。
- **移动端体验**（[#5640](https://github.com/HKUDS/nanobot/pull/5640) + [#5641](https://github.com/HKUDS/nanobot/pull/5641)）：触屏键盘换行、发送按钮交互、iOS PWA 单次点击/状态栏适配，集中解决移动端短板。
- **Cron 可配置投递与批量归档**（[#5620](https://github.com/HKUDS/nanobot/pull/5620)）：为定时任务增加显式结果投递目标与归档生命周期，属于较重的功能演进。
- **模型重试状态展示**（[#5504](https://github.com/HKUDS/nanobot/pull/5504)）：将模型重试生命周期事件推送到 WebSocket 并在 TUI/WebUI 中渲染倒计时进度。

结合上述 PR 状态，cron 能力（#5620）与模型重试 UI（#5504）已沉淀较久，大概率进入下个 minor 版本；移动端与上下文可视化是新增的高确定性方向。

## 7. 用户反馈摘要

从今日 issue 与 PR 描述中可提炼出以下真实用户声音：

- **升级挫折**（#5645）：用户从 0.2.2 升级到 0.3.0 后，同一个调用代码产生的 prompt 少了 Current Time 上下文，直接导致 Agent 行为变化，且文档与新行为不一致。这说明升级兼容性文档需要加强。
- **移动端使用痛点**（#5640/#5641）：iOS Safari 首击被 `:hover` 吞掉、触屏键盘 Enter 行为不符合预期、PWA 状态栏遮挡内容——真实移动端用户在体验细节上受到明显阻碍。
- **多语言用户诉求**（#5646/#5644）：语言选择器不应强制要求用户看懂英文名；同时并发加载导致界面语言回退会让非英语用户感到困惑。
- **静默失败困扰**（#5637）：Matrix 消息投递失败时只写日志

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

好的，这是 2026-09-04 的 Zeroclaw 项目动态日报。

---

## Zeroclaw 项目日报 (2026-09-04)

### 1. 今日速览

过去 24 小时项目活跃度极高，共产生 50 条 Issue 更新和 50 条 PR 更新，无新版本发布。社区讨论聚焦于安全策略、架构演进和可验证意图等核心议题，多个高优先级（P1/P2）Bug 处于修复中。值得注意的是，PR 更新量大但合并数为 0，可能存在合并流程瓶颈或大量功能正等待最终评审。

### 2. 版本发布

无新版本发布。

### 3. 项目进展

今日没有 PR 被合并或关闭，但 50 条待合并 PR 展示了大量已完成的功能开发和技术债清理工作，整体项目推进速度依然很快，主要集中以下方向：

- **核心架构重构**：[#10557](https://github.com/zeroclaw-labs/zeroclaw/pull/10557) 将 cron 模块抽取为独立 crate `zeroclaw-cron`，并引入了预条件门控，大幅降低核心运行时复杂度。
- **稳定性和正确性修复**：
    - [#10582](https://github.com/zeroclaw-labs/zeroclaw/pull/10582) 修正了附件图像类型判定逻辑，改为基于 provider 可加载契约，避免错误将 SVG 等格式标记为图片。
    - [#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599) 修复 cron 任务静默失败问题，确保未执行的任务会被记录。
    - [#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600) 修复渠道报告虚假成功的问题，避免 agent 误以为消息已发送。
- **功能增强**：
    - [#10583](https://github.com/zeroclaw-labs/zeroclaw/pull/10583) 为网关 `/api/upload` 端点扩展任意文件上传能力，并支持 RPC 级别的文档标记。
    - [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) 为持久化的 ACP 会话记录添加分页加载支持。
    - [#10567](https://github.com/zeroclaw-labs/zeroclaw/pull/10567) 在记忆召回条目中增加日期标记，帮助模型区分新旧信息。

### 4. 社区热点

今日讨论最激烈的 Issue 集中在安全架构与网关能力扩展上，反映了社区对安全可控和功能完善性的高度关注：

- **#6996 Granular sandbox policy - filesystem restrictions (RFC)** (23评论): [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)
    - 这是一个关于细化文件系统沙箱策略的 RFC，讨论了应用层路径准入与操作系统沙箱（Bubblewrap/Landlock）之间的策略漂移问题。该问题已持续讨论 3 个月，评论数最高，说明社区对安全边界定义有极高关注度，且方案设计难度较大。
- **#9328 [Bug] verifiable-intent evaluates constraints without verifying the credential chain** (14评论): [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)
    - 该 Bug 指向可验证意图（VI）实现中的一个严重安全漏洞：约束条件在未验证凭证链的情况下被评估。这引发了关于 VI 参考实现正确性和安全性的广泛讨论。
- **#8692 [Tracker] Maintainer decision queue for RFCs and design issues** (14评论): [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)
    - 这是为 RFC 和设计问题设立的维护者决策队列跟踪器。高评论数体现了社区对项目治理流程透明化的诉求。
- **#10050 RFC: Verbatim channel send over the gateway** (13评论): [链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)
    - 社区希望网关能提供一条路由，让调用者可以直接发送原始消息到指定渠道，而不需要经过 agent 轮次。该请求已获接受（status:accepted），说明这是一个明确的路线图方向。

### 5. Bug 与稳定性

今日报告和活跃的 Bug 数量较多，按严重程度排列如下：

- **S1 (工作流阻断)**:
    - **#10609 zerocode ignores launch directory** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)): 用户报告本地启动的 zerocode 会话忽略启动目录，强制使用 agent 工作区作为 cwd，导致工作流受阻。**已有对应修复 PR [#10565](https://github.com/zeroclaw-labs/zeroclaw/pull/10565) 待合并**。
    - **#10603 OpenCode providers never send x-opencode-session** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)): 导致 Go 模型无法使用并可能触发账户风险标记。
- **S2 (功能降级)**:
    - **#10068 Interactive agent session caps context at 32,000 tokens** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10068)): 交互式 agent 会话语境被硬限制在 32K tokens，无视配置的 131072 上限。
    - **#9328 verifiable-intent credential chain validation gap** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9328)): 可验证意图约束检查存在安全逻辑漏洞。
    - **#10529 [Feature] Anthropic thinking.display progress** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10529)): 该请求在 1 天后被关闭，可能是因 PR 已实现或在讨论后关闭。
    - **#10202 log-based dependencies never reach tracing subscriber** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10202)) 和 **#10238 ZeroCode stale Connected state** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10238)) 均已关闭，可能已修复。

### 6. 功能请求与路线图信号

今日提交的 PR 揭示了项目近期功能开发重点，部分 RFC 已获接受成为既定方向，预估会进入后续版本：

- **技能与工具链扩展**: [#10578](https://github.com/zeroclaw-labs/zeroclaw/pull/10578) 为 Web 部件添加 `/upload` 指令；[#10591](https://github.com/zeroclaw-labs/zeroclaw/pull/10591) 为 MCP hosts 新增独立启动器 (bootstrap)。
- **会话与上下文管理增强**: [#10595](https://github.com/zeroclaw-labs/zeroclaw/pull/10595) 为长思考输出缓存包装行；[#10597](https://github.com/zeroclaw-labs/zeroclaw/pull/10597) 记录模型报告的上下文使用量；[#10584](https://github.com/zeroclaw-labs/zeroclaw/pull/10584) 实现 Todo tracker 关闭状态的持久化。
- **配置与默认值优化**: [#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589) 将 `multimodal.max_image_size_mb` 默认值提升至 20 MiB，以适配主流 API。
- **渠道支持**: [#10581](https://github.com/zeroclaw-labs/zeroclaw/pull/10581) 为 Twitch 渠道增加设置指南，表明该集成功能已趋于成熟。

### 7. 用户反馈摘要

- **工作区路径期望**: [Issue #10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609) 用户期望 zerocode 遵循终端启动目录，而不是强制跳转至 agent workspace。这反映出部分用户倾向于将 agent 作为本地文件上下文工具使用，而非隔离的沙箱环境。
- **上下文窗口受限**: [Issue #10068](https://github.com/zeroclaw-labs/zeroclaw/issues/10068) 用户反馈交互式会话的 32K 硬限制导致长对话频繁被截断，严重影响了使用体验和任务连续性。
- **集成可靠性**: [Issue #10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) 用户指出对 OpenCode Relay 的集成存在功能缺失，且有可能导致供应商侧的账户风险，显示了对集成完整性和合规性的担忧。
- **渠道健康状态误报**: [Issue #9811](https://github.com/zeroclaw-labs/zeroclaw/issues/9811) 用户发现 `/health` 端点将从未成功连接的 Telegram 渠道报告为健康状态，这对依赖健康检查的运维工作造成了误导。

### 8. 待处理积压

以下为创建时间较早、仍处于开放状态且讨论度较高的重要 Issue，建议维护者重点关注：

- **#6996 RFC: Granular sandbox policy** ([链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)): 创建于 2026-05-28，已持续 3 个月，23 条评论，仍处于 `needs-maintainer-review` 状态，需尽快做出决策。
- **

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-04

## 1. 今日速览

过去 24 小时 PicoClaw 仓库保持中等活跃度：共 5 条 Issue 更新（4 活跃 / 1 关闭），7 条 PR 更新（6 待合并 / 1 已合并），无新版本发布。值得关注的是，今日活跃的 Issue 与 PR 中相当比例带有 `stale` 标签，说明项目当前更多是在消化存量问题，而非迎来新的需求高峰。最核心的进展集中在 Slack 媒体上传修复（#3340）以及 LINE 通道 webhook 配置告警改进（#3329，已合并），另有 5 个依赖自动升级 PR 待处理，维护者评审压力较小，项目整体健康度良好。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日仅 1 个 PR 被合并/关闭：

- **[#3329 [CLOSED] fix(line): warn on inert webhook_host / webhook_port instead of seeding them](https://github.com/sipeed/picoclaw/pull/3329)** — 作者 @ex-takashima，修复 #3328。LINE 通道的 `webhook_host` / `webhook_port` 配置项被声明、默认化并绑定环境变量，但从未被读取——LINE 通道的 Webhook 实际挂载在共享网关 HTTP 服务器上。该 PR 将"静默无效配置"改为"输出警告"，避免用户误以为这两个配置生效。这是一次面向可配置性与可观测性的小步改进，说明项目正在打磨通道配置的一致性与用户体验。

其余 6 个 PR 均处于待合并状态，其中 5 个为 Dependabot 自动依赖升级。生态依赖的持续更新表明项目在跟进上游库的 Bug 修复与安全补丁，但**尚未有人工审查通过的实质性功能 PR 在今日落地**，项目功能性进展相对平缓。

## 4. 社区热点

- **[#3281 [OPEN] [stale] Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)** — 今日最热 Issue，9 条评论，+1，最近更新于 09-04。用户 @xpader 反馈 Web UI 在单个会话聊天历史稍长时，输入框出现明显卡顿。该问题已存在近一个半月且被打上 `stale` 标签，但评论数仍在增长，说明有较多用户遇到同样体验瓶颈。背后诉求指向 **Web 前端性能优化**——长上下文会话的渲染与输入响应机制有待改进。

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#3349](https://github.com/sipeed/picoclaw/issues/3349) | QQ 频道无法使用，websocket 获取失败（401 Authorization 头错误），Docker 与 Linux x86 版本均受影响，有明确错误日志 | 开放，无 PR |
| 🟠 中 | [#3338](https://github.com/sipeed/picoclaw/issues/3338) | Slack 媒体上传总是报 `file size cannot be 0`，`SendMedia` 未设置 `FileSize` 导致 SDK 拒绝所有上传 | 开放，**已有 fix PR #3340** |
| 🟠 中 | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 聊天历史较长时输入严重卡顿 | 开放，无 PR，已 stale |
| 🟡 低 | [#3346](https://github.com/sipeed/picoclaw/issues/3346) | RKLLM 模型在 ARM 开发板上回复异常（信息有限，仅 1 条评论） | 开放 |

今日已关闭的 Bug：[#3339](https://github.com/sipeed/picoclaw/issues/3339)（Antigravity 429 问题，判定为服务端配额问题，非代码缺陷）。

## 6. 功能请求与路线图信号

今日无明确的新功能请求。从 PR 与 Issue 的对应关系来看：

- **Slack 媒体上传修复**（#3340）与 **LINE webhook 配置告警**（#3329）均属于通道层体验优化，不涉及架构级变更，预计可随下一小版本发布。
- [#3349 QQ 频道无法使用](https://github.com/sipeed/picoclaw/issues/3349) 可能促使维护者检查 QQ 通道的鉴权实现，若确认是代码问题，会进入修复队列。

暂未观察到新功能方向的信号，项目当前阶段侧重于**稳定性修复与依赖维护**。

## 7. 用户反馈摘要

- **Web UI 性能是明显痛点**（#3281）：多个用户反映长会话下输入延迟严重，影响日常使用体验，希望优化前端渲染或输入响应机制。
- **Slack 图片上传失效令人困惑**（#3338）：用户 @octavioturra 指出根因是 `FileSize` 字段未设置，说明用户对 Slack API 行为有较深理解，且上传功能属于高频刚需。
- **QQ 频道鉴权错误阻碍使用**（#3349）：用户测试了 Docker 和 Linux x86 两种部署方式均失败，错误信息明确指向 Authorization 头格式问题，对部署信心有一定影响。
- **Antigravity 用户遇到"灵异"配额错误**（#3339，已关闭）：OAuth 与模型发现都正常，但生成请求全部返回 429，用户排查后确认为服务端配额问题而非客户端 bug，项目方已关闭该 issue。

## 8. 待处理积压

需要维护者关注的长期未响应/未解决项：

- **[#3281 Web UI 长历史输入卡顿](https://github.com/sipeed/picoclaw/issues/3281)** — 创建于 07-21，已 stale，但评论数持续增长。这是当前社区反馈最集中的体验问题，建议至少给出官方回应或临时缓解方案。
- **[#3346 RKLLM 回复异常](https://github.com/sipeed/picoclaw/issues/3346)** — 创建于 08-27，仅 1 条评论，ARM 部署场景的反馈较少，容易被忽略。建议维护者确认是否为模型量化/推理代码的已知问题。
- **[#3349 QQ 频道无法使用](https://github.com/sipeed/picoclaw/issues/3349)** — 创建于 08-30，3 条评论，涉及完整错误日志，目前无维护者回应，建议尽快确认是否为 401 鉴权 bug。
- **5 个 Dependabot 依赖 PR 待人工审核**：包括 [aws-sdk-go-v2 #3364](https://github.com/sipeed/picoclaw/pull/3364)、[golang.org/x/term #3362](https://github.com/sipeed/picoclaw/pull/3362)、[irc-go #3363](https://github.com/sipeed/picoclaw/pull/3363)、[protobuf #3361](https://github.com/sipeed/picoclaw/pull/3361)、[larksuite oapi-sdk-go #3360](https://github.com/sipeed/picoclaw/pull/3360) — 均为 09-03 创建，尚无维护者 comment，建议尽快批量处理避免积压。

---

**项目健康度总结**：PicoClaw 当前处于"稳定维护、消化存量"阶段。社区活跃度中等，Issue 响应速度一般（多个重要 Bug 超过一周无维护者回复）；依赖升级自动化运转良好，但有 5 个 PR 待审可能形成小规模积压。建议维护者优先响应 #3349（QQ 频道全挂）与 #3281（Web UI 卡顿）两个用户反馈最集中的问题。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报 — 2026-09-04

## 今日速览

过去24小时项目活跃度较高：共产生 5 条 Issue 更新（4 条新开）和 23 条 PR 更新，其中 3 条 PR 已合并/关闭。Issue 侧主要集中于 CLI 行为缺陷（挂载路径拼接、任务 recurrence 不重算）与测试基础设施并发问题；PR 侧则有一批由 @zvi-fried 主导的 provider 契约重构系列持续迭代，加上 @mmv 与 @davekim917 各自提交的渠道优化与 SQLite 健壮性修复。今日无新版本发布，核心仓库正处于 **多线推进但频密变更** 的阶段，需关注 20 条待合并 PR 的积压消化。

---

## 项目进展

今日合并/关闭了 3 条 PR，整体推进节奏正常：

- **[#3126 [已关闭] fix(agent-runner): never deliver silence, never deliver `<internal>` thinking**（@glifocat，core-team）  
  合并后 agent-runner 将不再投递沉默内容与内部思考块，是投递管道的实质性行为修正，修复了此前可能向渠道发送空消息或泄露内部推理的问题。
  https://github.com/nanocoai/nanoclaw/pull/3126

- **[#3461 [已关闭] chore(deps): bump all @chat-adapter/\* + chat 4.29.0 -> 4.38.1**（@DawoudIO）  
  将 9 个 `@chat-adapter/*` 包及 `chat` 从 4.29.0 统一升至 4.38.1，工作区与 `/add-<channel>` 技能保持同步，消除版本漂移隐患。
  https://github.com/nanocoai/nanoclaw/pull/3461

此外，长期未动的 **[#3440 docker-driver: fix SELinux-blocked mounts, group-writable rw mounts, stray NUL byte**（@dwalthour）](https://github.com/nanocoai/nanoclaw/pull/3440) 于今日（9/4）有更新，虽未合并，但说明维护者正在推进评审。这是容器挂载安全性（SELinux）与权限控制的关键修复，值得关注。

整体来看，今日主线的推进集中在 **provider 契约体系** 与 **agent-runner 核心行为修复** 两个方向，项目正在向更模块化、契约可验证的架构收敛。

---

## 社区热点

虽然今日 Issue/PR 的评论数普遍较低，但以下条目呈现了清晰的热度信号：

- **[#3706 ncl groups config add-mount 静默产生双重嵌套路径**（@DawoudIO）](https://github.com/nanocoai/nanoclaw/issues/3706)  
  评论 1 条，是今日唯一带评论的 Issue。用户指出 `--container` 参数接受绝对路径时静默生成错误的双重嵌套路径。该问题指向 CLI 参数校验与路径归一化的缺失——用户按直觉输入绝对路径（`--container /workspace/shared-repos`）是自然行为，工具应容错或明确拒绝，而非静默产出坏配置。

- **[#3704 是否接受 SqliteAgentMailbox 的受保护 session-assembly 钩子**（@davekim917）](https://github.com/nanocoai/nanoclaw/issues/3704)  
  这是一条"征求意见"型的 Issue，来自维护 fork 的开发者，询问核心维护者是否愿意开放子类化扩展点。这类讨论虽然评论数为 0，但它代表社区对 **扩展性** 的真实需求，也是判断项目公共 API 演化方向的重要信号。

- **@zvi-fried 的 provider 契约重构系列**（#3581/#3584/#3585/#3586/#3588/#3591/#3592 共 7 条 PR）  
  虽然单条评论不多，但 7 条 PR 同日保持更新、覆盖 runtime/host/setup 全链路，是当前最大的结构性变更。诉求是把 provider 行为从"隐式约定 + 硬编码"变成"显式声明 + 可验证契约"，降低第三方 provider 接入成本。
  https://github.com/nanocoai/nanoclaw/pull/3581

---

## Bug 与稳定性

按严重程度排列今日报告的 Bug：

| 严重度 | 编号 | 问题 | 状态 | Fix PR |
|---|---|---|---|---|
| 高 | [#3705](https://github.com/nanocoai/nanoclaw/issues/3705) | `ncl tasks update --recurrence` 不重算 `process_after`，任务仍按旧 cadence 触发。例如从每周改为每日，下次触发仍是下周 | 无 fix PR | — |
| 中 | [#3706](https://github.com/nanocoai/nanoclaw/issues/3706) | `add-mount --container` 传绝对路径时静默生成双重嵌套路径，用户无从得知配置已损坏 | 无 fix PR | — |
| 中 | [#3709](https://github.com/nanocoai/nanoclaw/issues/3709) | Mailbox SQLite 测试使用固定的 `/tmp` fixture 路径，并发 vitest 进程互相删除数据库 | 无 fix PR（但有对应方向：见 #3710 测试清理 PR） | — |
| 低 | [#3426](https://github.com/nanocoai/nanoclaw/issues/3426) [已关闭] | `send_card` 文档承诺按钮回调，但 bridge 丢弃无 `url` 的 action；agent 错误归咎平台 | 已关闭 | 需关注修复是否随 #3126 一并落地 |

值得肯定的是，@davekim917 提交了 **[#3708 fix busy_timeout 先于 journal_mode 执行**](https://github.com/nanocoai/nanoclaw/pull/3708)，修正 SQLite 打开连接时因 PRAGMA 顺序导致的锁等待失效问题，属于数据库层的稳定性加固，与 #3709 的测试不稳定问题同源相关。

---

## 功能请求与路线图信号

- **[#3704 受保护的 session-assembly 钩子（@davekim917）](https://github.com/nanocoai/nanoclaw/issues/3704)** — 请求为 `SqliteAgentMailbox` 增加受保护钩子供子类扩展。考虑到 @davekim917 同时提交了 **#3707（admission-gate 轮询缝）**，开发者正尝试以最小侵入方式将 fork 功能回馈主干，**有较大概率被纳入后续版本**。

- **[#3713 记录 per-agent-group 投递模式（@glifocat）](https://github.com/nanocoai/nanoclaw/pull/3713)** — 新增列与管道记录 agent group 的投递契约，专为不支持 `<message to>` 信封契约的模型设计的降级通道。目前"仅存储、无人读取"，属于前瞻性的配置基础设施，预计后续版本会消费该字段。

- **[#2003 语音转录 V2（@jorgenclaw）](https://github.com/nanocoai/nanoclaw/pull/2003)** — 4 月 25 日提交，容器侧实现、默认主权模式。今日有更新，说明评审仍在推进，是 **AI 助手多模态交互**方向的重要候选。

- **Cursor 支持套件（#3356 + #3355）** — Cursor Agent SDK provider payload 与 `/add-cursor` 安装技能持续迭代，配合 zvi-fried 的契约重构系列，预计在 provider 契约体系稳定后统一合入。

---

## 用户反馈摘要

- **CLI 输入的自然性与校验缺失（#3706）**：用户 @DawoudIO 指出，`--container` 的帮助文本只写"a container path"，没有任何"必须相对路径"的约束，用户输入绝对路径是"the natural thing to type"。这说明 CLI 设计需要遵循 **最小惊讶原则**——要么接受并规范化绝对路径，要么在参数校验阶段显式报错，而非默默产出坏配置。

- **文档与实现的不一致导致归因错误（#3426，已关闭）**：`send_card` 文档告知 agent 支持按钮（actions），但 bridge 在 #2265 后丢弃无 `url` 的 action。agent 看到按钮消失后，根据 `fallbackText` 的措辞推断"平台不支持卡片"，向用户输出错误归因。这是 **文档-实现不一致+agent 误导链** 的典型案例，值得在文档自动化校验上做文章。

- **fork 维护者的扩展诉求（#3704）**：开发者维护自己的 `NanoclawAgentMailbox` 子类，依靠 `compose.ts` 单点注册携带 fork 私有表、列和触发器。当前 seam 可用但不够稳定，建议核心团队明确扩展点策略，避免 fork 长期建立在"恰好能编译"的脆弱的私有接口上。

---

## 待处理积压

| 类型 | 编号 | 标题 | 等待时长 | 备注 |
|---|---|---|---|---|
| PR | [#2003](https://github.com/nanocoai/nanoclaw/pull/2003) | feat(skill): voice transcription V2 | 132 天（4/25 创建） | 功能体量大，涉及容器侧实现与主权模式，建议维护者明确给出阶段性反馈 |
| PR | [#3355](https://github.com/nanocoai/nanoclaw/pull/3355) + [#3356](https://github.com/nanocoai/nanoclaw/pull/3356) | Cursor provider 支持套件 | 16 天（8/19 创建） | 依赖 provider 契约重构系列，建议在 #3581 系列合入后优先推进 |
| PR | [#3440](https://github.com/nanocoai/nanoclaw/pull/3440) | docker-driver: SELinux-blocked mounts 修复 | 13 天（8/22 创建） | 今日有更新，评审进行中；涉及容器安全，建议加急 |
| PR | [#3462](https://github.com/nanocoai/nanoclaw/pull/3462) | fix(mcp-tools): send_message 重复投递防护 | 12 天（8/23 创建） | 与 #2404 同属重复投递 bug 类，建议与 #3126 的修复一并回归验证 |
| Issue | [#3426](https://github.com/nanocoai/nanoclaw/issues/3426) | send_card 按钮文档误导（已关闭但未验证修复） | 14 天 | 已关闭但未见对应测试或文档更新，建议确认修复真正落地 |

---

**总结**：NanoClaw 今日处于 **高活跃、多线并行、部分积压** 的状态。核心架构层（provider 契约、agent-runner 投递管道）有实质性推进，社区反馈的 CLI 易用性与扩展性问题值得在下一迭代中优先回应。建议维护者重点关注：① #3705 recurrence 重算这一功能性 bug；② 20 条待合并 PR 的分批合入节奏；③ provider 契约系列与 Cursor 支持套件的依赖合入路径。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-04

## 1. 今日速览

过去24小时项目保持高活跃度：共更新17条PR（8条待合并、9条已合并/关闭）和7条issue（4条活跃、3条已关闭），无新版本发布。WebUI TypeScript 类型化与 `@ts-nocheck` 清除战役在合并了4个PR（#8037、#8038、#8039、#8040）及关闭3个关联issue后正式收官，前端代码库健康度显著提升。`main` 分支的两个回归问题（#8055、#8058 相关）已快速修复，CI 恢复稳定。性能优化（#8043、#7984）与子代理审批可见性（#8046）等核心 PR 合并，同时两个大型 PR（#8053、#8061）仍在推进且今日有更新。长期架构决策 #7903（持久化沙箱执行器）于今日再次更新，是当前最值得关注的设计讨论。

## 2. 版本发布

过去24小时内无新版本发布，最新 Releases 为空。近期核心改进仍在 main 分支累积，尚未形成新的发布标签。

## 3. 项目进展

今日共9条 PR 合并/关闭，集中完成三大类工作：

**WebUI TypeScript 类型化战役收官（4个PR + 3个issue）** — 该战役是本轮最大工程动作：移除 40 个冗余 `@ts-nocheck` 并建立抑制基线棘轮（[#8037](https://github.com/nearai/ironclaw/pull/8037)）；为前端 API 边界添加运行时解码与 URL 校验（[#8038](https://github.com/nearai/ironclaw/pull/8038)）；64 个生产组件和 hooks 补全显式类型（[#8039](https://github.com/nearai/ironclaw/pull/8039)）；移除全部 94 个测试侧 `@ts-nocheck` 并类型化测试基础设施（[#8040](https://github.com/nearai/ironclaw/pull/8040)）。对应 issue [#8033](https://github.com/nearai/ironclaw/issues/8033)、[#8035](https://github.com/nearai/ironclaw/issues/8035)、[#8036](https://github.com/nearai/ironclaw/issues/8036) 全部关闭。WebUI 代码库从此具备完整的静态类型保障。

**main 分支回归修复（2个PR）** — [#8055](https://github.com/nearai/ironclaw/pull/8055) 修复了 `webui_v2::static_assets` 单元测试因 `666ebcbf08` 提交导致的 panic，该问题一度阻塞所有基于 main 的开放 PR；[#8058](https://github.com/nearai/ironclaw/pull/8058) 修复了 `api-boundary.test.ts` 中沿用旧拼写 `"web-push"` 导致的架构门禁失败。两个均为小尺寸修复，CI 已恢复绿色。

**子代理能力落地（1个PR）** — [#8046](https://github.com/nearai/ironclaw/pull/8046)（R3 slice 3a）实现：当子代理 child run 被自身的审批或凭证门阻塞时，现在会向 owner 的收件箱发送通知，解决了此前子代理阻塞完全不可见的问题。这是子代理路线图 R3 的关键一块，配套的 [#8061](https://github.com/nearai/ironclaw/pull/8061)（R3 slice 3b，验证门卡片重放）已在今日更新，说明该路线图仍在持续推进中。

**性能优化（2个PR）** — [#8043](https://github.com/nearai/ironclaw/pull/8043) 将流式文本更新从按 delta 全量再净化改为合并更新，将 O(N·k) 降为 O(N)；[#7984](https://github.com/nearai/ironclaw/pull/7984) 将 `tool_search` 回复尺寸约束到模型首次可查看的 envelope 内（此前实测 16,066 B 序列化后被截断为 857 B，结果数组整体丢失）。

综合来看，本轮合并消除了前端类型债务、修复了 CI 阻塞、推进了子代理可见性，并修正了两处性能/正确性问题，项目整体向前迈进了扎实一步。

## 4. 社区热点

**[#7903 — Decision spike: persistent per-user sandboxed executor](https://github.com/nearai/ironclaw/issues/7903)** — 今日更新（9-04），是当前评论最多的 issue（2条），标记 `risk: high`、`scope: agent`、`scope: sandbox`、`reborn`，属于架构决策型调研任务。该 issue 讨论 Reborn 架构中是否将完整 agent loop 保留在可信宿主进程、只向持久化 Docker 沙箱发送 `builtin.shell` 命令的边界设计。核心矛盾是：当前设计保持了强权限边界，但每个新 CLI 都需要宿主与沙箱之间的命令管线铺线工作。该讨论持续一周以上仍在进行，说明这是牵动 Reborn 架构走向的关键决策，值得社区持续关注。

**其他讨论动态**：[#8009](https://github.com/nearai/ironclaw/issues/8009)（MCP egress

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-04

## 1. 今日速览

过去 24 小时项目整体活跃度较高：共产生 6 条 Issue 更新（新开 1 条、关闭 2 条 stale、活跃 3 条）和 15 条 PR 更新（合并/关闭 10 条、待合并 5 条），无新版本发布。值得注意的是，10 条关闭的 PR 集中在安装器体验优化、语音配额交互、IM 机器人卡片、应用内浏览器恢复等多个方向，显示主分支迭代节奏紧凑。新开的 Issue #2601（MCP Apps 渲染支持）指向了下一阶段的产品演进方向。当前项目处于 2026.8.31 发布后的稳定迭代期，下一目标版本为 2026.9.4。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 覆盖了多个用户可感知的改进，项目整体在稳定性、安装体验、交互细节三个维度均有推进，预计集成于下一版本（2026.9.4）。

**安装与更新体验**
- [#2609 feat(update): confirm before install and quitting the app](https://github.com/netease-youdao/LobsterAI/pull/2609)：更新时若存在 Agent 运行中任务或定时任务，将弹出确认对话框而非静默中断；同时移除了下载中途取消操作，改为静默下载后通知。退出应用（Cmd+Q、Dock、托盘）时也将提示确认。
- [#2605 fix(installer): declare Windows installer DPI-aware to fix blurry icons](https://github.com/netease-youdao/LobsterAI/pull/2605)：修复 Windows 安装程序图标模糊问题。
- [#2606 fix(installer): launch helper processes without a console window](https://github.com/netease-youdao/LobsterAI/pull/2606)：修复 Windows 安装辅助进程弹出控制台窗口的问题。

**架构与构建优化**
- [#2607 fix(openclaw): stop peer install from bloating plugin bundle size](https://github.com/netease-youdao/LobsterAI/pull/2607)：移除 dsh 的 MCP 服务器注册及代理编码任务委托，删除 dshCodeMcpServer/dshSessionClient、McpRuntime 解析钩子，不再因 dsh 功能开关而重新同步 OpenClaw 配置，显著减小插件包体积。
- [#2608 fix: dsh drop mcp delegation](https://github.com/netease-youdao/LobsterAI/pull/2608)：与 #2607 配套的文档与代码清理。

**界面与交互修复**
- [#2604 fix(cowork): dim exhausted voice input button](https://github.com/netease-youdao/LobsterAI/pull/2604)：当日 ASR 配额耗尽时，语音输入按钮显示稳定的置灰状态，同时保持可点击以唤起配额提示，并补充了相应测试。
- [#2603 fix(i18n): refine voice quota exhausted copy](https://github.com/netease-youdao/LobsterAI/pull/2603)：更新中文语音配额耗尽提示文案，采用免费试用订阅表述与紧凑时长格式。
- [#2599 fix(im): improve bot card layout](https://github.com/netease-youdao/LobsterAI/pull/2599)：多实例机器人卡片限制为双列响应式布局，空添加卡片保持紧凑并垂直居中。

**功能回归与恢复**
- [#2602 feat(browser): restore interactive in-app browser](https://github.com/netease-youdao/LobsterAI/pull/2602)：为 2026.9.4 版本恢复应用内交互式 Agent 浏览器，包括浏览器 MCP 桥接、持久化浏览器配置文件、加密存储的凭据、审批门控的 Agent 自动填充及手动凭据捕获。

**版本发布流程**
- [#2600 Release: 2026.8.31](https://github.com/netease-youdao/LobsterAI/pull/2600)：准备 2026.8.31 版本发布，包含引导式首次运行体验、更快的 Library 浏览、客户端模型生成视频分享支持、更清晰的登录与配额提示、更强的 Windows 安装器恢复能力。

## 4. 社区热点

今日社区讨论热度总体温和，评论量均不多，但新 Issue #2601 反映了值得关注的产品方向信号。

| Issue/PR | 评论数 | 状态 | 看点 |
|----------|--------|------|------|
| [#2601 Support rendering MCP Apps / Prefab UI in the desktop client](https://github.com/netease-youdao/LobsterAI/issues/2601) | 1 | OPEN（新开） | 请求桌面客户端支持 MCP Apps 扩展（`io.modelcontextprotocol/ui`）返回的交互式 HTML UI（`ui://` 资源、MIME `text/html;profile=mcp-app`）。当前客户端会忽略这些资源，用户希望获得 `_meta.ui.resourceUri` 上的工具结果渲染能力。 |
| [#1556 [stale] doc bug: IM机器人配置指南404](https://github.com/netease-youdao/LobsterAI/issues/1556) | 3 | 今日关闭 | 用户报告文档链接 404，虽已 stale 自动关闭，但文档入口的可用性问题值得留意。 |
| [#1552 [stale] feat: AI产物 Markdown 预览及文件卡片支持](https://github.com/netease-youdao/LobsterAI/issues/1552) | 2 | 今日关闭 | 用户希望 Write 工具完成后展示文件卡片并支持应用内预览，避免将全文贴入聊天或切换文件管理器。 |

**趋势信号**：结合 #2602（应用内浏览器恢复）和 #2601（MCP Apps 渲染），社区对「Agent 产物/工具的富交互呈现」的需求正在聚合。如何让 Agent 生成的 UI 在客户端内可交互、可预览，可能是下一阶段体验升级的重点方向。

## 5. Bug 与稳定性

今日无新增严重崩溃类 Bug。以下为当前活跃的稳定性隐患，均无对应修复 PR，且被标记为 stale，存在被机器人自动关闭的风险：

**中高严重性**
- [#1089 CoworkRunner startSession/continueSession 无重入保护，并发调用导致流式消息损坏和消息重复](https://github.com/netease-youdao/LobsterAI/issues/1089)：同一 `sessionId` 上并发执行两个异步流迭代，修改共享 `ActiveSession` 状态，导致消息流损坏。IPC 层 fire-and-forget 调用方式放大了触发概率。影响消息可靠性与用户体验。
  - 位置：`src/main/libs/coworkRunner.ts`，第 1425-1533 行。
- [#1088 Prefetch 异步回调不校验 turnToken，可能跨轮次污染](https://github.com/netease-youdao/LobsterAI/issues/1088)：Prefetch 是「发后即忘」的异步操作，恢复执行时不校验 turn 是否仍是发起时的轮次，可能将上一轮的用户消息写入新轮次。
  - 位置：`src/main/libs/agentEngine/openclawRuntimeAdapter.ts:3809-3814`。

**低严重性 / 配置相关**
- [#1082 package.json → openclaw.version：v2026.3.2，不支持最新版本有风险](https://github.com/netease-youdao/LobsterAI/issues/1082)：用户反馈版本锁定偏旧，且有合规要求（国家互联网应急中心要求更新到最新版本）。

**今日通过 PR 修复的稳定性问题**
- [#2605、#2606](https://github.com/netease-youdao/LobsterAI/pull/2605)：Windows 安装器 DPI 模糊与辅助进程控制台窗口问题已在安装器层面修复。
- [#2609](https://github.com/netease-youdao/LobsterAI/pull/2609)：安装更新时不再静默中断运行中的 Agent 轮次或定时任务。

## 6. 功能请求与路线图信号

- **MCP Apps / Prefab UI 渲染支持**（[#2601](https://github.com/netease-youdao/LobsterAI/issues/2601)）：新开 Issue，用户请求在桌面客户端中渲染 MCP Apps 扩展返回的交互式 HTML UI。结合已合并的 [#2602（恢复应用内浏览器）](https://github.com/netease-youdao/LobsterAI/pull/2602)，两者叠加可以构成完整的「MCP 返回 UI → 应用内渲染 → 用户交互」链路。**此需求很可能被纳入 2026.9.4 之后的版本规划。**
- **AI 产物文件卡片与 Markdown 预览**（[#1552](https://github.com/netease-youdao/LobsterAI/issues/1552)）：issue 今日被 stale 关闭，但需求本身未在代码层面实现。若后续有对应 PR 推进，有较大概率被采纳。
- **定时任务失败推送 IM 告警**（[#1078](https://github.com/netease-youdao/LobsterAI/pull/1078)）：PR 仍处于打开状态，功能上补全了成功/失败通知不对称的缺口，是运维场景下的实用增强。

## 7. 用户反馈摘要

- **文档可用性**（来自 [#1556](https://github.com/netease-youdao/LobsterAI/issues/1556)）：用户在跟随 IM 机器人配置指南时遭遇 404 错误。建议检查文档站链接重定向与失效页面清理流程。该 issue 已 stale 自动关闭，但链接失效问题可能仍然存在。
- **版本合规压力**（来自 [#1082](https://github.com/netease-youdao/LobsterAI/issues/1082)）：真实用户绑定 `openclaw.version: v2026

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-04）

## 今日速览

过去24小时项目整体活跃度较低：无新开或关闭的 Issue、无新版本发布，唯一动态为一条 Pull Request（#1257）持续处于待审查状态。该 PR 聚焦 hook 生命周期事件的完整性修复，旨在打通工具调用的端到端关联，并补齐事件分发缺口，具备明确的工程价值。社区讨论氛围平静，未出现关注度集中的热点议题，项目总体处于平稳迭代期。

## 版本发布

过去 24 小时无新版本发布。

## 项目进展

- 今日无新增合并或关闭的 PR，项目进展主要体现在仍开放中的 **[#1257 fix(hooks): complete lifecycle dispatch](https://github.com/moltis-org/moltis/pull/1257)**：
  - 为 `BeforeToolCall`、`AfterToolCall`、`ToolResultPersist` 增加可选 `tool_call_id` 参数，用于将一次工具调用在多个 hook 间的执行上下文关联起来，同时保持旧 JSON payload 的兼容性。
  - 补全了此前已声明但未实际分发的 `AgentEnd`、`MessageSending`、`MessageSent` 事件，围绕 native 非流式场景完善生命周期覆盖。

该 PR 虽尚未正式合入，但修复方向的落地将显著增强项目在可观测性与事件驱动集成上的能力，是迈向更稳定版本的重要准备步骤。建议维护者优先安排 review。

## 社区热点

- 今日社区讨论热度较低，唯一活跃的 PR 为 **[#1257](https://github.com/moltis-org/moltis/pull/1257)**（暂无评论与点赞）。
- 该 PR 反映的诉求较为明确：开发者希望 hook 系统具备完整、可关联的事件追踪能力，以此提升调试效率与扩展第三方集成的可靠性。

## Bug 与稳定性

过去 24 小时无用户直接报告的崩溃或回归问题。综合 PR #1257 描述，可确认当前存在以下稳定性/可观测性缺口：

1. **事件分发不完整（中严重度）**：`AgentEnd`、`MessageSending`、`MessageSent` 在部分场景（如 native 非流式）未被实际触发，可能导致基于事件的业务逻辑缺失或状态不同步。
2. **hook 间缺少调用关联（中低严重度）**：一次工具调用在多个 hook 之间没有公共关联字段，难以进行端到端的调用链追踪与排障。

两者均有明确修复方案，对应 PR 为 **[#1257](https://github.com/moltis-org/moltis/pull/1257)**，尚未合并。

## 功能请求与路线图信号

- **[#1257](https://github.com/moltis-org/moltis/pull/1257)** 引入的可选 `tool_call_id` 属于向后兼容的增量扩展，没有破坏现有 payload 结构，表明项目正在规划增强 hook 链路的关联能力。
- 结合事件分发的补全，下一版本可能会进一步强化生命周期管理的规范性和一致性，值得关注后续是否补充相应文档与测试覆盖。

## 用户反馈摘要

目前暂无新增的 Issue 评论或公开用户反馈数据。从 PR #1257 的改动内容可侧面推断用户侧的主要困扰：

- 工具调用过程中，多个 hook 事件之间缺少统一关联 ID，导致追踪一次完整调用链路较为困难；
- 已声明的事件未被实际触发，影响事件驱动型应用的稳定预期。

这些痛点反映出开发者对运行流程可观测性和事件契约兑现的高要求。建议合入该 PR 后，增加相关 release notes 说明与迁移指引。

## 待处理积压

- **[[#1257] fix(hooks): complete lifecycle dispatch](https://github.com/moltis-org/moltis/pull/1257)**（OPEN）：创建于 2026-09-02，最新更新于 2026-09-03，目前处于待审查状态，尚无反对意见。该 PR 对 hook 系统功能完整性具有明确正向价值，为避免后续冲突和保证修复及时落地，建议维护者尽快安排 code review 并考虑合入下一版本。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-09-04）

## 1. 今日速览

过去24小时项目活跃度处于**高位**：共产生 31 条 Issue 更新和 29 条 PR 更新，并正式发布 v2.2.0 稳定版（含 QwenPaw Hub 多租户能力）。社区讨论焦点集中在多租户 Hub 路线图（#7318，17 条评论）与两起安全相关报告（#7511、#7443）上，其中 #7511 安全沙箱突破问题已关闭，疑似已获处理。与此同时，开发侧持续推进：console 主题令牌统一（#7487）、侧边栏重设计（#7502）、消息滚动分页（#7542）等 PR 均在活跃迭代中，并有 2.2.1b1 版本号提交（#7522），表明 **2.2.0 进入稳定期、2.2.1 开发线已开启**。整体健康度良好，但在安全审查、长对话性能与渠道兼容性方面仍存在值得关注的隐患。

## 2. 版本发布

### v2.2.0（Stable）
- **发布链接**：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0
- **核心新增**：
  - **QwenPaw Hub**：支持多用户自助托管（本地进程或 Docker 运行时），提供工作区级访问控制、凭据管理和反向代理支持（[#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112)）
  - **QwenPaw Data**：数据组件能力增强（Release 描述被截断，详细说明待补充）
- **破坏性变更**：
  - 根据 Issue [#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474) 可知，PR [#7337](https://github.com/agentscope-ai/QwenPaw/pull/7337) 引入了 `ModelInfo.max_tokens` 至 `max_output_length` 的字段迁移。**自定义提供商（custom provider）的 JSON 配置文件需同步更新字段名**，否则启动时将报错。
- **迁移注意事项**：
  - 自定义提供商用户请在 `providers/custom/*.json` 中将 `max_tokens` 改为 `max_output_length`（[#7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)）
  - 安装验证跟踪见 [#7515](https://github.com/agentscope-ai/QwenPaw/issues/7515)

## 3. 项目进展

过去 24 小时合并/关闭的 PR 共 9 条，以下为关键合并项：

| PR | 内容 | 状态 |
|---|---|---|
| [#7441](https://github.com/agentscope-ai/QwenPaw/pull/7441) | **feat(memory): Auto Fin 定时记忆源 + ReMe 升级至 0.4.1.11**，修复运行时状态收集，Auto Fin 现与 Daily Paper 并列为 Agent 记忆设置项 | ✅ 已合并 |
| [#7520](https://github.com/agentscope-ai/QwenPaw/pull/7520) | **feat(agent): 增加受保护的执行合约**，教 Goal 模式区分 complete/blocked，并对齐 Goal 提示词与工具描述 | ✅ 已合并 |
| [#7522](https://github.com/agentscope-ai/QwenPaw/pull/7522) | **chore: 版本号提升至 2.2.1b1**，标志 2.2.1 开发线启动 | ✅ 已合并 |
| [#7267](https://github.com/agentscope-ai/QwenPaw/pull/7267) | **fix(channels): 渠道契约检查可移植性修复**，解决 Windows 非 UTF-8 代码页下契约检查器误读问题（首次贡献者） | ✅ 已合并 |

待合并 PR 共 20 条，其中值得关注的在审/待合入项：

- [#7487](https://github.com/agentscope-ai/QwenPaw/pull/7487) 主题令牌统一（浅色/深色语义化），已覆盖侧边栏、聊天、Agent、设置等界面
- [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) Console 侧边栏与设置体验重新设计
- [#7542](https://github.com/agentscope-ai/QwenPaw/pull/7542) 聊天记录滚动加载分页（首次贡献者），解决上下文压缩后历史消息不可见问题
- [#7524](https://github.com/agentscope-ai/QwenPaw/pull/7524) 修复免费模型出现在 PRO 标签页的问题
- [#7530](https://github.com/agentscope-ai/QwenPaw/pull/7530) Console 单元测试扩展（+245 用例，语句覆盖率提升 5.02pp）
- [#7536](https://github.com/agentscope-ai/QwenPaw/pull/7536) OpenCode API 新增 `x-opencode-session` header 的兼容修复（对应 #7531）

## 4. 社区热点

1. **[#7318 QwenPaw Hub 多租户版路线图讨论](https://github.com/agentscope-ai/QwenPaw/issues/7318)**（17 评论 · 👍 3）
   社区讨论最热 Issue。用户围绕 Hub 多租户版应优先建设什么展开讨论，回应了社区长期以来的多用户/管理员托管诉求（关联 #2324）。2.2.0 中 Hub 已正式发布，该 Issue 将直接指导后续迭代方向。

2. **[#7511 安全沙箱被突破](https://github.com/agentscope-ai/QwenPaw/issues/7511)**（9 评论 · 已关闭）
   由 @Jiongcheng-Li 报告的严重安全漏洞（附知乎分析链接）。虽已关闭，但同作者另开 Issue [#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)（危险指令易绕过，6 评论），安全类问题在社区中引发持续关注，建议维护者考虑发布安全公告说明处置情况。

3. **[#4036 添加模型步骤过于繁琐](https://github.com/agentscope-ai/QwenPaw/issues/4036)**（6 评论 · good first issue）
   已开放超 4 个月，社区仍持续讨论。核心诉求指向设置流程 UX 优化：用户需要 5 步操作才能完成一个模型的添加。

4. **[#7443 危险指令易绕过](https://github.com/agentscope-ai/QwenPaw/issues/7443)**（6 评论）
   与 #7511 同源的 Jailbreak 类安全问题，目前仍为 OPEN，暂未见关联修复 PR。

## 5. Bug 与稳定性

### 严重（安全/数据）

- **[#7511 安全沙箱被突破](https://github.com/agentscope-ai/QwenPaw/issues/7511)** — 已关闭，未见对应 fix PR 引用，建议维护者补充说明
- **[#7443 危险指令易绕过](https://github.com/agentscope-ai/QwenPaw/issues/7443)**（OPEN）— 高危安全 / jailbreak 风险，暂无关联修复 PR

### 中等（功能异常）

- **[#7534 飞书会话 queue consumer 卡死，会话静默无响应](https://github.com/agentscope-ai/QwenPaw/issues/7534)**（OPEN）— 高优先级（卡片类）消息处理路径卡死后，同会话新消息无法新建消费者，影响飞书渠道可用性
- **[#7531 OpenCode API 需要 `x-opencode-session` header](https://github.com/agentscope-ai/QwenPaw/issues/7531)**（OPEN）— 已有修复 PR [#7536](https://github.com/agentscope-ai/QwenPaw/pull/7536) 待合并，**09/06 后缺 header 的请求将出错**
- **[#7510 /memory/status 返回 500](https://github.com/agentscope-ai/QwenPaw/issues/7510)**（OPEN）— Windows Desktop 2.2.0-beta.7 上 Reme 资源与诊断接口异常
- **[#7431 codex 后端空响应](https://github.com/agentscope-ai/QwenPaw/issues/7431)**（OPEN）— 非流式下发 agentMessage/delta 时（如火山方舟 agentplan 网关 + codex 0.144.x），返回空响应且 usage 全 0
- **[#7476 cron 任务重复调度](https://github.com/agentscope-ai/QwenPaw/issues/7476)**（OPEN）— misfire_grace 窗口内任务被调度两次，导致备份脚本重复执行
- **[#7474 自定义提供商加载失败](https://github.com/agentscope-ai/QwenPaw/issues/7474)**（已关闭）— 由 #7337 字段迁移引起，确认已在 2.2.0 中解决

### 轻度（体验/兼容）

- **[#7529 Langfuse 工具输出空白](https://github.com/agentscope-ai/QwenPaw/issues/7529)**（OPEN）— 已有修复 PR [#7532](https://github.com/agentscope-ai/QwenPaw/pull/7532)（异步生成器关闭导致 Observation 更新丢失）
- **[#7505 局域网 LLM server 频繁 client disconnect](https://github.com/agentscope-ai/QwenPaw/issues/7505)**（OPEN）— LAN 场景下连接稳定性问题，LM Studio + qwen3.8 flash next q3 环境
- **[#7507 WeCom 逐字输出缓慢](https://github.com/agentscope-ai/QwenPaw/issues/7507)**（OPEN）— 150ms 节流导致飞书流式输出明显落后于微信渠道
- **[#7516 企业微信无法发送 base64 图片](https://github.com/agentscope-ai/QwenPaw/issues/7516)**（OPEN）— 渠道兼容性问题
- **[#7513 deepseek-v4-pro 工具调用混合问题](https://github.com/agentscope-ai/QwenPaw/issues/7513)**（OPEN）— 第三方模型工具调用异常
- **[#7512 会话输出期间无法切换会话](https://github.com/agentscope-ai/QwenPaw/issues/7512)**（已关闭）

## 6. 功能请求与路线图信号

| Issue/PR | 需求 | 状态/信号 |
|---|---|---|
| [#7519](https://github.com/agentscope-ai/QwenPaw/issues/7519) | 手机移动端远程连接桌面端，查看/切换对话、处理工具审批、访问工作区文件 | 已有原生移动端草稿 PR [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378)（Expo/React Native，DO NOT MERGE），需求可能与移动端路线图高度重合 |
| [#7518](https://github.com/agentscope-ai/QwenPaw/issues/7518) / [#7514](https://github.com/agentscope-ai/QwenPaw/issues/7514) | 远程 WebUI 首次加载对话内容速度优化（移动端尤其明显） | 已关闭重复问题（#7518），#7514 保持 OPEN；有 PR [#7542](https://github.com/agentscope-ai/QwenPaw/pull/7542) 间接改善（滚动分页） |
| [#7543](https://github.com/agentscope-ai/QwenPaw/issues/7543) | 在线更新改为后台下载、更新完提醒安装，避免前台更新导致不可用 | 已关闭（Close-and-review-later），社区体验诉求明确，建议排期 |
| [#7533](https://github.com/agentscope-ai/QwenPaw/issues/7533) | 消息按钮交互支持（上一轮返回选项按钮，点击后继续对话）+ 自定义 channel | OPEN，涉及 Console 与渠道层，属于交互形态扩展 |
| [#7535](https://github.com/agentscope-ai/QwenPaw/issues/7535) | Matrix 渠道支持 Element 兼容：recovery-key 设备验证 + MAS next-gen OIDC (MSC2965) 登录 | OPEN，针对 Element 客户端的适配需求 |
| [#7527](https://github.com/agentscope-ai/QwenPaw/issues/7527) | 上下文压缩（compaction）时保留 agent 人设与对话风格（称呼、情感状态、互动风格） | OPEN，强化长期对话连续性的诉求，与 #7431 等上下文类问题方向一致 |
| [#7540](https://github.com/agentscope-ai/QwenPaw/issues/7540) | 增加配置开关，允许移除 env_context 中硬编码的 "About" 身份提示行 | OPEN，服务自定义人设（SOUL.md）用户，改动小、价值明确 |
| [#1775](https://github.com/agentscope-ai/QwenPaw/issues/1775) | Codex 风格 steer mode（agent 执行过程中实时补充信息纠正行为） | 老 Issue（3月创建），评论再次活跃，核心交互能力增强请求 |

## 7. 用户反馈摘要

- **配置/UX 门槛**：[#4036](https://github.com/agentscope-ai/QwenPaw/issues/4036) 用户反馈"添加新模型太复杂"，5 步往返操作导致体验割裂，属高频操作路径，建议简化或提供引导式流程。
- **移动端体验焦虑**：[#7519](https://github.com/agentscope-ai/QwenPaw/issues/7519) 与 [#7514](https://github.com/agentscope-ai/QwenPaw/issues/7514) 共同指向用户"离开电脑后仍希望继续使用 QwenPaw"的诉求，且对远程 WebUI 的加载速度敏感。移动端接入 + 性能优化是被反复提及的期待方向。
- **安全信任感**：[@Jiongcheng-Li](https://github.com/Jiongcheng-Li) 连续提交两个安全问题（[#7511](https://github.com/agentscope-ai/QwenPaw/issues/7511)、[#7443](https://github.com/agentscope-ai/QwenPaw/issues/7443)），显示部分用户正对 Agent 类产品的指令安全边界做对抗性测试

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