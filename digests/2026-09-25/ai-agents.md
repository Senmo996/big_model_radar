# OpenClaw 生态日报 2026-09-25

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-25 02:22 UTC

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

## OpenClaw 项目动态日报 — 2026-09-25

> 数据窗口：2026-09-24 ~ 2026-09-25 | 数据来源：GitHub Issues / PRs / Releases | 项目：openclaw/openclaw

---

### 1. 今日速览

过去 24 小时项目活跃度极高：累计 500 条 Issue 更新（450 条新开/活跃、50 条关闭）与 500 条 PR 更新（102 条合并/关闭、398 条待合并），无新版本发布。当前 Issue 积压仍以 P0/P1 级 Bug 为主，集中在 **gateway 事件循环阻塞、数据库锁竞争、MCP 传输可靠性、模型目录重建风暴** 四大类；值得关注的是多个高热度 Issue 已进入 `clawsweeper:queueable-fix` / `clawsweeper:fix-shape-clear` 状态，说明维护团队已介入并初步确认修复方向。社区侧，单 Issue 最高评论 30 条，讨论热度集中在升级回滚、CPU 100% 烧核、会话状态丢失等生产环境阻断问题上。

---

### 2. 版本发布

**无新版本发布**。当前主线仍处于 2026.9.6 之后的修复窗口（已有 #157531 "2026.9.7 Fixes Tracker" 作为下一版本修复清单跟踪 issue 被创建）。

---

### 3. 项目进展

今日合并/关闭的 PR 中有几个值得注意的节点（102 条已合并/关闭，以下为已关闭且有明确交付物的代表）：

| PR | 标题 | 状态 | 意义 |
|---|---|---|---|
| [#157709](https://github.com/openclaw/openclaw/pull/157709) | fix: preserve channel-owner revocation across recovery | CLOSED | 修复恢复流程中渠道所有者撤销状态丢失的问题，保护安全边界 |
| [#157107](https://github.com/openclaw/openclaw/issues/157107) | 2026.9.6: prepared-model-catalog worker rebuilds plugin generation every ~6s forever | CLOSED | 属于 P0 级阻断问题，关闭说明紧急修复已落地或已确定根因 |
| [#157011](https://github.com/openclaw/openclaw/issues/157011) | 2026.9.5→2026.9.6 managed update always rolls back | CLOSED | 更新回滚问题关闭，涉及 update-history reconciliation 栈溢出 |
| [#155920](https://github.com/openclaw/openclaw/issues/155920) | Control UI models page polls every 2.7s and stages state DB snapshot | CLOSED | 性能/IO 浪费问题已有结论 |
| [#153067](https://github.com/openclaw/openclaw/issues/153067) | Gateway re-copies entire state DB every ~5s per instance | CLOSED | 约 5.9 TB/天 的 staging 写入问题关闭，与 #150138 同源修复 |

此外，今日有多个维护者驱动的重构 PR 进入 "ready for maintainer look" 状态，包括：

- [#157422](https://github.com/openclaw/openclaw/pull/157422) — fix(gateway): avoid blocking requests during worker inference persistence（XL，涉及 session-state / availability，安全敏感）
- [#154069](https://github.com/openclaw/openclaw/pull/154069) — perf(sessions): publish transcript projections off thread（XL，性能优化）
- [#157555](https://github.com/openclaw/openclaw/pull/157555) — refactor: receive channel webhooks on the Gateway HTTP port（XL，多 channel，安全敏感）

整体来看，项目今日从"问题报告密集"转向"修复方案就绪"，多个 P0 级 issue 被关闭，修复管线运转正常。

---

### 4. 社区热点

今日评论数最高的 Issues 揭示了社区最关心的几个问题：

| Issue | 标题 | 评论 | 关注点 |
|---|---|---|---|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server init timeout crashes the Gateway — unhandled rejection "service child cleanup identity lost" | 30 | **MCP 子进程清理路径崩溃**，30s initialize 超时导致整个 Gateway 进程退出。P1，已有 clawsweeper:fix-shape-clear + queueable-fix 标签 |
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | Model-catalog expiry/rebuild loop pins one CPU core | 23 | **单核 CPU 100% 持续燃烧**：readFullModelCatalog() 每次读取都触发 refreshExpiredCatalog()，60s TTL 循环触发。识别为 worker #154276/#153422 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway reaches ready but never serves; every /health probe times out | 21 | **632-agent 舰队规模下事件循环饥饿**，health 探针全部超时，RSS 持续上涨直至 OOM |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) | Large SQLite transcript cleanup blocks the gateway event loop | 20 | SQLite 大事务清理导致主事件循环阻塞 |
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | 2026.9.3 Doctor refuses valid legacy workspace setup and attestation import | 17 | 升级迁移回归，Doctor 拒绝迁移合法 legacy 配置 |

**热点诉求分析**：
- **生产可用性焦虑**：多个 issue 牵涉 632-agent、28-agent 等规模部署场景，说明 OpenClaw 已被大量用户用于真实生产环境，任何事件循环阻塞/CPU 燃烧都会直接影响线上服务；
- **升级链条脆弱**：2026.9.5 → 2026.9.6 的升级回滚问题（#157011）、Doctor 迁移拒绝（#142585）、旧版本配置不兼容（#152252）反映出用户对升级路径稳定性有很高要求；
- **MCP/CLI 生态稳定性**：MCP server 超时崩溃（#144911）、MCP loopback 不自动重连（#98435）、claude-cli transcript 路径错误（#145309）说明外围工具链的健壮性是当前主要痛点。

---

### 5. Bug 与稳定性

按严重程度排列今日活跃的高危 Bug（P0/P1 / crash-loop / release-blocker）：

**P0 / 阻断级**

| Issue | 问题 | 状态 | Fix PR |
|---|---|---|---|
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway ready 后不服务，/health 超时，事件循环饥饿（632-agent） | OPEN | 无，needs-info |
| [#157234](https://github.com/openclaw/openclaw/issues/157234) | Update recovery fails with active agent DB lease | OPEN | 无，needs-maintainer-review |
| [#157107](https://github.com/openclaw/openclaw/issues/157107) | 2026.9.6 prepared-model-catalog worker 每 6s 重建，agent 永不 admission | **CLOSED** | 已解决/收敛 |
| [#157011](https://github.com/openclaw/openclaw/issues/157011) | 2026.9.5→2026.9.6 更新永远回滚（call stack exceeded） | **CLOSED** | 已解决/收敛 |
| [#115256](https://github.com/openclaw/openclaw/issues/115256) | Desktop app boot-loops gateway, doctor 推荐的 fix 被 app 立即回退 | OPEN | 无 |
| [#152252](https://github.com/openclaw/openclaw/issues/152252) | Config write 写入旧 Gateway 不认识的 key，启动 hard-fail exit 78 | OPEN | 无，bulk-filed |
| [#157415](https://github.com/openclaw/openclaw/issues/157415) | Doctor --fix 拒绝外部安装 acpx/codex 的 post-session 插件迁移 | OPEN | 无，manual-only |
| [#143752](https://github.com/openclaw/openclaw/issues/143752) | 包激活被中断可导致 CLI 无 package-only replay | OPEN | 无 |
| [#119565](https://github.com/openclaw/openclaw/issues/119565) | 并发 MCP 调用导致 Codex native hooks 内存近线性放大 | OPEN | 无，needs-live-repro |

**P1 / 严重**

| Issue | 问题 | Fix PR |
|---|---|---|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server 30s init 超时 → Gateway 崩溃 | 无（fix-shape-clear，queueable） |
| [#155753](https://github.com/openclaw/openclaw/issues/155753) | Model-catalog expiry/rebuild 循环，单核 100% | 无（needs-maintainer-review） |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool 子进程泄漏，zombie 积累 | 无（needs-info） |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | Requester-settle 批次因 ownership check 永远重试 | 无 |
| [#110190](https://github.com/openclaw/openclaw/issues/110190) | Runtime context carrier 置于用户消息之后，模型混淆 | 无（needs-product-decision） |
| [#145309](https://github.com/openclaw/openclaw/issues/145309) | claude-cli 忽略 CLAUDE_CONFIG_DIR，transcript 丢失 | 无（fix-shape-clear，queueable） |
| [#150132](https://github.com/openclaw/openclaw/issues/150132) | claude-cli 长输出被 8MiB stdout cap 截断，丢掉最终回复 | 无（source-repro） |
| [#144797](https://github.com/openclaw/openclaw/issues/144797) | 复用 claude-cli live session 保留已删除的 --mcp-config，工具 401 | 无（recovery-stuck） |

**趋势判断**：
- 多个 "prepared-model-catalog worker" 相关 issue（#155753、#157107、#156191、#156930、#155859）指向**同一类模型目录重建风暴**问题，可能有一个共同的根因，建议关注合并修复而非逐个打补丁；
- P0 issue 中约一半带有 `clawsweeper-recovery-stuck` 标签，表明恢复路径（recovery）是当前稳定性短板；
- 今日已有 #157730（fix: prevent Doctor timeouts while restoring the Gateway）等 PR 在进行针对性修复，说明维护团队正在集中处理 recovery 路径。

---

### 6. 功能请求与路线图信号

今日讨论中值得关注的功能型 Issue / PR：

| Issue / PR | 内容 | 潜在去向 |
|---|---|---|
| [#99583](https://github.com/openclaw/openclaw/issues/99583) | **智能会话自动标题**：懒生成 + 便宜模型 + 话题感知重命名（已有 llm-slug-generator，P3） | 可能进入后续小版本 |
| [#41366](https://github.com/openclaw/openclaw/issues/41366) | **持久化自然语言规则学习** + 多提及回复语义 | 长期功能，需产品决策 |
| [#81960](https://github.com/openclaw/openclaw/issues/81960) | Onboarding 支持多 provider / 多 model 配置 | P3，需产品决策 |
| [#47910](https://github.com/openclaw/openclaw/issues/47910) | **Provider 按失败类别 fallback**（auth-broken provider 隔离） | 已 CLOSED，但设计思路可能进入后续版本 |
| [#9637](https://github.com/openclaw/openclaw/issues/9637) | TUI 增加无障碍配置（禁用 emoji / unicode） | P2，needs-product-decision，screenreader 友好 |

**路线图信号**：
- #157531 "2026.9.7 Fixes Tracker" 已经建立，说明 2026.9.7 版本已经开始排期；
- 今日 PR 中大量 `refactor(cli)` / `refactor(plugins)` / `refactor(ai)` 系列的 "deslop" 重构（#157748、#157819、#157765、#157664）是维护者主动清理技术债的信号，属于纯内部质量改进，不改变用户可见行为；
- 性能优化 PR（#154069 transcript projections off thread、#157422 worker inference persistence）将进入主线，后续版本 gateway 事件循环压力有望缓解。

---

### 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼出的用户真实声音：

**高频痛点**

1. **升级即回滚**（#157011）：*"Managed update 2026.9.5 → 2026.9.6 always rolls back — RangeError 'Maximum call stack size exceeded' in update-history reconciliation (survives doctor --fix)"* — 用户执行了 doctor --fix 仍未解决问题，升级工具链的容错性不足；
2. **健康检查失效**（#149538）：*"Gateway reaches ready but never serves; every /health probe times out while the event loop is starved"* — 就绪状态与实际服务能力脱节，用户无法及时感知故障；
3. **CPU / 内存异常消耗**（#155753）：*"readFullModelCatalog() re-triggers refreshExpiredCatalog() on every read"* — 单个 worker 烧满一个核，用户被迫手动重启；
4. **CLI 长期会话不稳定**（#144797）：*"reused claude-cli live session keeps a deleted --mcp-config; all mcp__openclaw__* tools die mid-session with HTTP 401"* — 会话复用场景下 MCP 工具不可用，影响实际开发流程；
5. **长任务丢回复**（#150132）：*"finished all their work — commits, deploys, files on disk — and then the gateway threw away the final reply"* — 71 分钟 / 107 分钟的自主构建完成后最终回复被丢弃，用户损失严重。

**满意度信号**

- 仍有用户主动提交功能提案并获 👍（#99583 获 2 👍、#110190 获 1 👍、#84242 获 3 👍），社区对项目长期演进保持兴趣；
- `roboclaw-bot` 等自动化账号持续活跃，说明项目已建立机器人辅助的 issue 分类/标注流程（clawsweeper 系列标签），维护效率在提升。

---

### 8. 待处理积压

以下为长期未关闭或需要维护者重点关注的事项：

**长期无响应 / 停滞**

| Issue | 标题 | 创建 | 当前状态 |
|---|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes | 2026-06-29 | P1，needs-info，已被 👍 1 |
| [#98435](https://github.com/openclaw/openclaw/issues/98435) | MCP loopback transport does not auto-reconnect after gateway restart | 2026-07-01 | P1，needs-maintainer-review / needs-product-decision / needs-security-review |
| [#119565](https://github.com/openclaw/openclaw/issues/119565) | Concurrent MCP calls cause memory amplification with Codex native hooks | 2026-08-05 | P0，needs-live-repro，已有 👍 1 |
| [#115256](https://github.com/openclaw/openclaw/issues/115256) | Desktop app boot-loops the gateway | 2026-07-28 | P0，release-blocker，needs-live-repro |
| [#112349](https://github.com/openclaw/openclaw/issues/112349) | memory-core dreaming: deep-phase promotion ignores minRecallCount / minUniqueQueries | 2026-07-21 | P2，source-repro，已有复现路径 |
| [#84242](https://github.com/openclaw/openclaw/issues/84242) | memory-lancedb memory_store registered but not exposed as callable tool | 2026-05-19 | P2，已有 👍 3，维护者已确认但未排期 |
| [#150743](https://github.com/openclaw/openclaw/issues/150743) | QQ channel sustainability: Tencent handoff stalled | 2026-09-17 | P2，生态/支持模式问题，需产品决策 |

**需要特别提醒的 PR 积压**

| PR | 内容 | 备注 |
|---|---|---|
| [#127775](https://github.com/openclaw/openclaw/pull/127775) | fix: preserve requester-scoped memory in system-agent turns | 创建于 2026-08-22，仍为 OPEN，已带 stale 标签，但标记 ready for maintainer look |
| [#144046](https://github.com/openclaw/openclaw/pull/144046) | fix(gateway): report busctl-incompatible when busctl rejects --json | 创建于 2026-09-10，needs proof，长期未合并 |
| [#144363](https://github.com/openclaw/openclaw/pull/144363) | fix(sessions): recognize visible dashboard subagent lineage in sessions_send | 创建于 2026-09-10，needs proof |
| [#149568](https://github.com/openclaw/openclaw/pull/149568) | fix(agents): constrain sessions_spawn agentId schema | 创建于 2026-09-16，needs proof |

**积压判断**

- 创建一月以上仍未合并的 PR 多为 `needs proof` 状态，说明维护者倾向于"先有充分验证再合入"，但这也会导致修复周期变长；
- `clawsweeper:needs-product-decision` 标签反复出现（#110190、#98435、#41366、#81960 等），说明产品侧决策是

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期：2026-09-25** | **数据窗口：24 小时** | **覆盖项目：12 个**

---

## 1. 生态全景

当前个人 AI 助手开源生态呈现"**一超多强、命名同源、路线分化**"的格局。以 OpenClaw 为参照核心，一批 `-claw` 命名衍生项目（Zeroclaw、NanoClaw、PicoClaw、IronClaw 等）正在从不同维度切入同一赛道，但技术栈、目标场景与成熟度差异显著。生态整体处于**功能快速迭代与生产可用性爬坡并存**的阶段：一方面各项目日合并 PR 量持续高位（今日合计约 150+ 条），OpenAI Responses API 迁移、上下文压缩、MCP 工具链等新能力快速落地；另一方面，升级回滚、事件循环阻塞、会话状态丢失等生产环境阻断问题在各项目中交替出现，说明**稳定性已成为全生态的共识短板**。值得注意的积极信号是，多数项目的自动化运维工具（stale bot、issue 分类机器人、夜间 benchmark）已开始承担大量基础设施工作，维护者正将精力聚焦于架构级重构与安全治理。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（450 新开/活跃，50 关闭） | 500（102 合并/关闭，398 待合并） | 无 | 🟢 **极高活跃**，P0 修复集中落地，修复管线运转正常，但积压量大 |
| **CoPaw (QwenPaw)** | 21（15 新开/活跃，6 关闭） | 22（6 合并/关闭，16 待合并） | 无 | 🟢 **高速迭代**，8 个 PR 来自首贡者，社区参与度上升；PR 合并偏慢 |
| **Zeroclaw** | 24（20 新开/活跃，4 关闭） | 50（约 8 合并/关闭，42 待合并） | 无 | 🟡 **评审瓶颈**，大量 PR 带 `needs-author-action`，安全 S0 问题无 fix |
| **NanoBot** | 14（8 新开/活跃，6 关闭） | 39（26 合并/关闭，13 待合并） | 无 | 🟢 **迭代高效**，26 条 PR 合入，闭环速度快；存在死锁隐患 |
| **LobsterAI** | 18（2 活跃，16 stale 清理） | 11（6 合并/关闭，5 待合并） | 无 | 🟡 **反馈滞后**，代码合入正常但社区 Issue 大量被 stale 自动关闭，含 5 条安全漏洞 |
| **NanoClaw** | 2（均新开） | 13（3 关闭，10 待合并） | 无 | 🟢 **响应迅速**，所有 Bug 24h 内获得 fix PR；但贡献者集中于 1 人 |
| **PicoClaw** | 2（1 新开，1 关闭） | 8（0 合并，8 待合并） | 无 | 🟡 **PR 积压**，合并数为 0，存在重复提报现象 |
| **IronClaw** | 1（新开） | 1（待合并） | **v1.4.1-rc.2** ✅ | 🟢 **稳定收敛**，唯一发布新版本的活跃项目，RC 节奏正常 |
| TinyClaw | 0 | 0 | 无 | ⚪ 停更 |
| Moltis | 0 | 0 | 无 | ⚪ 停更 |
| ZeptoClaw | 0 | 0 | 无 | ⚪ 停更 |
| EasyClaw | 0 | 0 | 无 | ⚪ 停更 |

> **注**：OpenClaw 数据量级远高于其他项目（500 vs 最高 50），其 issue/PR 计数口径为"更新次数"而非独立条数，但仍可确认其活跃度高出 1-2 个数量级。

---

## 3. OpenClaw 在生态中的定位

### 3.1 核心参照地位

OpenClaw 是生态中**唯一具备"事实标准"属性的项目**——LobsterAI 的合入 PR 直接标注 `fix(openclaw)`（如 #2761 修复 GLM-5.3 输出截断），说明已有项目将其作为内嵌引擎；多个衍生项目（PicoClaw、NanoClaw、TinyClaw 等）的命名即暗示同源架构继承。其日均 500 条 Issue/PR 更新、102 条 PR 合并的量级，是第二名（Zeroclaw 50 条 PR）的 **10 倍**。

### 3.2 技术路线差异

| 维度 | OpenClaw | 衍生产品路线 |
|---|---|---|
| **架构** | Gateway + worker + CLI + Desktop 全栈，插件化能力目录 | Zeroclaw 走 Rust 重写 + OIDC 安全加固路线；PicoClaw 走轻量移动客户端路线；NanoClaw 专注 Iron Proxy 网关与多 agent 组网 |
| **部署规模** | 已验证 632-agent 舰队级部署，生产

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-25

## 1. 今日速览

过去 24 小时 NanoBot 项目保持**高活跃度**：14 条 Issue 更新（8 条新开/活跃、6 条关闭），39 条 PR 更新（13 条待合并、26 条已合并/关闭），无新版本发布。项目在 **WebUI 体验优化**（活动本地化、页面刷新、聊天挂载）、**渠道稳定性**（Discord/Matrix/Telegram 修复）和 **Provider 兼容性**（OpenAI Responses API、Anthropic extended thinking）三条主线上集中推进，26 条 PR 合并/关闭表明迭代速度较快。同时社区报告了自动压缩死锁、0.3.5 版本回归等值得关注的问题，但多数已有对应修复或正在开发中。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 PR 覆盖多个关键模块，项目整体向前迈进了明显一步。

### Agent 可靠性

- **修复后台任务异常丢失**：[#5431](https://github.com/HKUDS/nanobot/pull/5431) 与 [#5724](https://github.com/HKUDS/nanobot/pull/5724) 合并，用生命周期感知的完成回调替换 `set.discard`，检索并记录后台任务异常，关闭了 [#5429](https://github.com/HKUDS/nanobot/issues/5429)。此前后台任务失败只会留下 asyncio 泛化错误，难以排查。

### WebUI 体验

- **Agent 活动文本全语言本地化**：[#5367](https://github.com/HKUDS/nanobot/pull/5367) 合并，覆盖全部 10 种 WebUI 语言，关闭 [#5366](https://github.com/HKUDS/nanobot/issues/5366)。
- **全局页面 URL 清理与聊天延迟挂载**：[#5905](https://github.com/HKUDS/nanobot/pull/5905) 合并，设置/应用等全局页面不再序列化聊天 ID 到 URL，避免不必要的聊天请求。
- **聊天刷新与移动端交互优化**：[#5904](https://github.com/HKUDS/nanobot/pull/5904) 合并，用 tab 级缓存恢复会话 + 静默布局占位，取代原来的整页 loading。

### 渠道修复

- **Matrix 回复语义修复**：[#5292](https://github.com/HKUDS/nanobot/pull/5292) 合并，回复消息正确关联触发用户事件，关闭 [#5274](https://github.com/HKUDS/nanobot/issues/5274)。
- **Discord 反应任务清理**：[#5807](https://github.com/HKUDS/nanobot/pull/5807) 合并，跟踪并取消所有延迟 emoji 任务，关闭 [#5806](https://github.com/HKUDS/nanobot/issues/5806)。

### 模型能力

- **Anthropic extended thinking 双模式支持**：[#1387](https://github.com/HKUDS/nanobot/pull/1387) 合并，Anthropic 模型使用 `thinking` dict 带 token 预算，其他模型继续走 `reasoning_effort`。

---

## 4. 社区热点

- **[#5849 Auto-compaction 死锁](https://github.com/HKUDS/nanobot/issues/5849)** — `summarize_transcript` 无 token-budget 保护，一旦历史超过输入预算将永远无法恢复压缩。该问题由 @Krislu1221 深度分析提出，直击长会话场景的核心稳定性，社区高度关注，但目前尚无对应修复 PR。

- **[#5896 OpenAI Responses API / muse-spark 支持](https://github.com/HKUDS/nanobot/issues/5896)** — `muse-spark` 模型在 `opencode.ai/zen/go/v1` 网关下请求 `/chat/completions` 返回 500，需要切到 `/responses`。用户 @coinwh 在 9 月 24 日一天内密集提交了 4 个 Issue（#5896/#5908/#5909/#5910），涉及 provider 兼容性、实时速率显示、消息队列、草稿持久化，是今日最活跃的贡献者。该 Issue 已有对应 PR [#5906](https://github.com/HKUDS/nanobot/pull/5906)。

- **[#5881 0.3.5 版本 `_nanobot` 目录强制外置](https://github.com/HKUDS/nanobot/issues/5881)** — 升级后因新增校验规则拒绝启动，用户质疑“同一个实例 workspace 为啥要把 `_nanobot` 单独放出去”。虽已关闭，但用户对版本升级带来的行为变化存在困惑，值得在 release notes 中加强说明。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-25

## 1. 今日速览

过去 24 小时 Zeroclaw 项目保持中等偏高活跃度：共更新 24 条 Issues（新开/活跃 20 条，关闭 4 条）和 50 条 Pull Requests（待合并 42 条），无新版本发布。值得关注的是，今日关闭的 4 个 Issue 覆盖安全依赖审计（#9899）、Web Dashboard 工作流阻断（#8559）、SOP 自动模式运行挂起（#9805）和频道中断作用域 key 冲突（#10948），均为 P1/P2 级别的实质性修复。另一重要信号是 PR 队列中有大量 PR 带有 `needs-author-action` 标签（超 10 个），说明维护者已进行了首轮评审并等待作者响应，项目整体处于"密集评审→等待迭代"的节奏中。在版本规划方面，多项路线图 tracker（#6489、#8288、#8289、#8358）持续活跃，指向 v0.8.6/v0.9.0 的插件化与安全加固方向清晰可见。

---

## 2. 版本发布

过去 24 小时无新版本发布，无 release 信息可报告。

---

## 3. 项目进展

**已关闭/合并的 PR（重点）：**

- **#10259 feat(security): enforce authenticated principals on RPC with native+peercred** [CLOSED] — 这是 OIDC 里程碑（#8289）stage 3 的关键交付，为 RPC 层强制认证主体身份，采用 native + peercred 机制，部分取代了 #8672。合并后意味着 OIDC 三阶段中的认证阶段已基本落地。由 @JordanTheJet 提交，标签含 `size:XL`、`domain:security`、`risk:high`，是一项跨 daemon/runtime/gateway/CLI 的大型改动。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10259

- **#9899 [Tracker]: remove the matrix-sdk → imbl advisory waivers** [CLOSED] — 移除了 `matrix-sdk` 依赖链上 `bitmaps`/`imbl` 的安全公告豁免条目（RUSTSEC-2026-0247、RUSTSEC-2026-0292），意味着 `cargo deny check` 的安全门禁已完全恢复，不再依赖 waivers。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9899

**已关闭的 Bug（4 条）：**

- **#8559 Agents stop their work when exiting the chat window in web dashboard** [CLOSED] — S1 级工作流阻断问题已解决，agent 在用户退出聊天窗口后不再中断任务循环。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8559

- **#9805 SOP: auto-mode runs from channel/cron triggers are never executed and rot as 'running' forever** [CLOSED] — SOP 自动模式从 channel/cron 触发时永远卡在 running 状态的严重缺陷已修复。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9805

- **#10948 interruption-scope keys collide across component boundaries** [CLOSED] — 中断作用域 key 的编码歧义导致跨组件碰撞问题已解决。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10948

**项目整体推进评估：** 今日合并/关闭的工作横跨安全认证（RPC 认证）、依赖安全治理（CVE waivers 清理）、SOP 执行稳定性、Dashboard 交互缺陷和频道核心修复五个维度，均为高价值/高优先级事项。尤其是 #10259 的完成，将 OIDC 里程碑（#8289）向前推进了一大步，对 v0.8.6/v0.9.0 的发布就绪度有实质贡献。

---

## 4. 社区热点

**评论数最多的 Issues（TOP 3）：**

- **#6489 [Tracker]: Unified capability catalog and plugin migration roadmap** — 评论 8 条
  这是项目的"北极星"产品路线图 tracker，目标是统一 built-ins、已安装包、配置实例和运行时观测为一套完整的能力目录（"Everything is a plugin"）。社区持续讨论表明插件化迁移是当前最受关注的产品方向。
  https://github.com/zeroclaw-labs/zeroclaw/issues/6489

- **#8519 Reconcile cargo-audit ignores and remediate wasmtime-wasi CVEs** — 评论 7 条
  安全依赖审计的追踪问题，涉及 `cargo audit` 与 `cargo deny` 之间 ignore 列表漂移以及 wasmtime-wasi 的 CVE 修复。社区关注度高说明 WASM 运行时安全是用户的重要关切点。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8519

- **#9899 [Tracker]: remove the matrix-sdk → imbl advisory waivers** — 评论 6 条（已关闭）
  围绕 RUSTSEC-2026-0247/0292 两条安全公告的清理工作，今日关闭意味着该议题社区讨论已达成结论。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9899

**热点诉求分析：** 社区讨论集中在两大主题：一是**插件化/统一能力目录**（#6489），反映出用户希望获得"单一事实来源"的能力发现和管理体验；二是**依赖供应链安全**（#8519、#9899），用户对 CVE 管理和安全门禁的透明度有较高要求。这些讨论与 #8850（optional channels/tools 迁移到 runtime plugins）和 #8358（ZeroRelay v0.9.0 readiness）形成了呼应的路线图信号。

---

## 5. Bug 与稳定性

**S0 级（数据丢失/安全风险）—— 重点关注：**

- **#10968 [Bug]: Unattended agent turns run with no ApprovalManager, so risk-profile tool approvals are silently inert**
  无人值守的 agent 回合（cron、heartbeat、headless SOP、spawn_subagent）不会构建 `ApprovalManager`，导致风险工具的审批策略静默失效。涉及 `security:policy`、`topic:agent-loop`、`domain:security` 等多个高权重标签，是当前最严重的安全缺陷。**目前未见对应 fix PR，需持续关注。**
  https://github.com/zeroclaw-labs/zeroclaw/issues/10968

- **#10797 [Bug]: markdown memory backend silently loses stored entries when `store()` calls overlap**
  `MarkdownMemory::store` 并发写入时无序列化保护，存在静默数据丢失风险（S0）。已有对应 fix PR #11035（Qdrant 时间边界修复）但那是 Qdrant 后端的修复，markdown 后端仍需单独处理。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10797

**S1 级（工作流阻断）：**

- **#11087 [Bug]: Windows — after closing the window the app can be neither reopened nor quit**
  新报告的 Windows 平台问题：关闭主窗口后 `zeroclaw-desktop.exe` 进程存在但无法重新打开或退出。社区新用户反馈，目前无 fix PR。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11087

- **#8559** 已关闭（见项目进展部分）。

**S2 级（功能降级）：**

- **#11094 Apple preflight tests can fail when the retry sleep mock intercepts subprocess polling** — 测试基础设施的 mock 泄漏问题。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11094

- **#11093 Stable docs promotion leaves root llms files out of sync** — 文档发布流程缺陷，`llms.txt`/`llms-full.txt` 未随 stable 版本切换而同步。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11093

**S3 级（轻微问题）：**

- **#11097 Plugin egress remedy commands do not escape apostrophes in existing grants** — 补救命令 JSON 序列化未处理撇号转义。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11097

**已有关联 fix PR 的 Bug：**

- #10921（Qdrant 时间边界）→ #11035 [OPEN]
- #10948（interruption-scope key 碰撞）→ 已关闭，修复完成

---

## 6. 功能请求与路线图信号

**新提交的功能请求（今日/近期）：**

- **#11103 feat(providers): add Cheaper Inference as a typed OpenAI-compatible provider** — 新增 OpenAI 兼容 provider 接入。**已有对应 PR #11104（OPEN）**，说明该请求已被快速响应，可能有较大概率进入下一版本。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11103

- **#11100 Preserve configured provider aliases in cost-rate catalog prefill** — Dashboard/Zerocode 中成本费率预填应保留 provider alias 而非降级为 family。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11100

- **#11088 [Docs]: Move multi-agent setup guide from Contributing to Agents** — 文档结构优化请求，社区用户主动为文档维护提出改进。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11088

- **#11096 RFC: Risk-based merge-result freshness** — 关于 PR 合并前应基于最新 master 基线的风险控制 RFC，由 @Audacity88 提交，社区可能在酝酿更严格的 CI 合并策略。
  https://github.com/zeroclaw-labs/zeroclaw/issues/11096

**路线图信号（结合大型 Tracker 判断）：**

- **#6489 Unified capability catalog** — "Everything is a plugin" 的北极星方向持续推进，与 #8850（optional channels → runtime plugins）构成完整的插件化迁移路线。
  https://github.com/zeroclaw-labs/zeroclaw/issues/6489

- **#8288 SOP milestone: daemon-owned SOP control plane to 5/5** — 13 个 SOP 能力项的验收推进中，今日 SOP 相关 PR #10155（run logs 与触发去重）仍在开放中。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8288

- **#8289 OIDC milestone: canonical principals and inbound authentication** — #10259 合并后 stage 3 已落地，剩余 stage 的推进节奏值得关注。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8289

- **#8358 ZeroRelay native transport and v0.9.0 readiness** — v0.9.0 发布就绪度的核心 tracker，新 PR #11099（relay frontdoor link + QR）正在推动。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8358

---

## 7. 用户反馈摘要

**从今日活跃 Issues 中提取的真实用户声音：**

- **Web Dashboard 使用体验（#8559 已关闭）：** 用户反馈"当退出聊天窗口后 agent 完全停止工作，无法在后台继续查看文件或监控进度"。这一 S1 级问题今日已关闭，但反映了用户对"后台任务持续运行"的强烈期望——agent 的工作不应与前端窗口生命周期绑定。这与 #10968（无人值守回合审批）共同指向一个核心诉求：**agent 应能独立于交互界面自主完成任务**。

- **Windows 桌面端体验（#11087 新报告）：** 用户报告关闭窗口后进程滞留且无法重新打开/退出，应用陷入"僵尸状态"。这是典型的桌面端生命周期管理缺陷，Windows 平台用户对桌面应用的退出行为有较高预期。

- **社区贡献者积极但等待响应：** 大量 PR 处于 `needs-author-action` 状态（包括 @RustLangLatam、@metalmon、@tidux 等活跃贡献者），说明维护者已投入评审但作者需要时间跟进，社区贡献管道整体健康。

- **文档诉求（#11088）：** 用户主动提出将 multi-agent 配置指南从 Contributing 区移到 Agents 区，表明新手用户在使用多 agent 部署时遇到了文档查找困难。

- **平台生态扩展（#11103）：** 社区用户提交新 provider 请求，体现了对 LLM 网关多样性的需求——用户希望 ZeroClaw 能覆盖更多 OpenAI 兼容的推理服务。

---

## 8. 待处理积压

**需维护者关注的重要事项

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-09-25）

## 1. 今日速览

今日项目整体活跃度中等偏上：Issue 侧有 2 条更新（1 条新开、1 条关闭），PR 侧有 8 条更新（全部处于待合并状态），但合并数为 0，且无新版本发布。⚠️ 值得注意的异常是：用户 @chentianxiong123 先后提交了两个内容完全相同的 Issue（[#3390](https://github.com/sipeed/picoclaw/issues/3390) 已关闭、[#3391](https://github.com/sipeed/picoclaw/issues/3391) 仍开放），这可能反映了用户对 Pico 客户端多行输入拆分问题的高度关注，也可能存在重复提交的情况。当前 8 个待合并 PR 中，5 个为依赖升级、3 个为功能性改动（OpenAI API 迁移、DeltaChat 配置修复、opencode-go provider），但合并节奏偏慢，项目整体处于功能开发与依赖维护并行的阶段，健康度稳定但存在 PR 积压风险。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日无 PR 被合并或关闭，功能进展主要体现在待合并 PR 的持续更新上：

- **[#3381](https://github.com/sipeed/picoclaw/pull/3381) [stale] Switch Openai to responses API**：将 OpenAI provider 迁移至新的 Responses API，属于架构级升级，或为下一版本的核心变更之一。创建于 09-17，昨日（09-24）有更新，但尚未合并。
- **[#3376](https://github.com/sipeed/picoclaw/pull/3376) [stale] fix(deltachat): initialize as custom channel to solve config validation error**：修复 DeltaChat channel 启用时的配置校验错误（`unknown type "deltachat"`），对应已知 Issue [#3265](https://github.com/sipeed/picoclaw/issues/3265)。创建于 09-10，昨日有更新。
- **[#3371](https://github.com/sipeed/picoclaw/pull/3371) feat(providers): add opencode-go provider with session header support**：新增 `opencode-go` provider，支持按模型 ID 自动路由至正确的端点族，并携带 `x-opencode-session` 会话头。创建于 09-08，昨日有更新。

此外，另有 5 条 dependabot 依赖升级 PR 持续累积（见下文“待处理积压”）。整体来看，若上述 PR 能在近期合并，项目将在模型 API 支持、渠道配置健壮性和依赖安全三方面取得明显进展。

## 4. 社区热点

今日社区讨论热度较低，最受关注的是重复提交的 Pico 客户端多行输入 Bug：

- **[#3390](https://github.com/sipeed/picoclaw/issues/3390) [已关闭]**：报告 Pico 客户端将多行粘贴内容按换行拆分为多条消息，该 Issue 有 1 条评论，是今日唯一有评论的 Issue。
- **[#3391](https://github.com/sipeed/picoclaw/issues/3391) [开放]**：与 #3390 内容完全一致，在 #3390 关闭后不久被重新提交。

**分析**：两个 Issue 指向同一问题。用户先在 #3390 中反馈，随后 #3391 再次出现，这暗示用户可能认为原 Issue 未得到妥善解决或对关闭处理不满意。维护者宜将 #3391 与 #3390 关联处理，及时响应用户诉求，并为已关闭的 #3390 补充说明关闭原因。

## 5. Bug 与稳定性

今日共报告 1 个 Bug（含 1 条重复提交记录）：

| 严重程度 | Issue | 状态 | 问题描述 | 修复 PR |
|---|---|---|---|---|
| 中 | [#3390](https://github.com/sipeed/picoclaw/issues/3390) | 已关闭 | Pico channel 将多行输入（如诗歌、代码块）按换行符拆分，逐行发送为多条独立消息，破坏消息结构 | 无 |
| 中 | [#3391](https://github.com/sipeed/picoclaw/issues/3391) | 开放 | 同 #3390（重复提交） | 无 |

该 Bug 不影响服务端，但直接影响 Pico 客户端（移动 TUI）用户的多行文本输入体验，属于功能性缺陷。目前尚无关联的修复 PR。

## 6. 功能请求与路线图信号

今日无新增的功能请求类 Issue（新开 Issue 均为 Bug 报告）。但结合当前待合并 PR，可以识别出以下路线图信号：

- **OpenAI Responses API 迁移（[#3381](https://github.com/sipeed/picoclaw/pull/3381)）**：表明项目正跟进 OpenAI 最新 API 演进，预计将成为下一版本的核心变更，可能影响模型调用方式与响应解析逻辑。
- **opencode-go provider 新增（[#3371](https://github.com/sipeed/picoclaw/pull/3371)）**：引入新 provider 并支持会话头，扩展第三方模型接入范围，暗示项目在持续扩充渠道与模型生态。
- **DeltaChat 自定义 channel 修复（[#3376](https://github.com/sipeed/picoclaw/pull/3376)）**：修复配置校验逻辑，属于功能正确性提升，若合入将解决用户启用 DeltaChat 时的启动失败问题。
- **5 条依赖升级 PR（[#3385](https://github.com/sipeed/picoclaw/pull/3385) - [#3389](https://github.com/sipeed/picoclaw/pull/3389)）**：覆盖 Anthropic SDK、M

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**2026-09-25** | 数据来源：github.com/nanocoai/nanoclaw

---

## 1. 今日速览

过去 24 小时 NanoClaw 项目活跃度较高：共产生 2 条 Issue、13 条 PR，其中 3 条 PR 已关闭（#3882/#3885/#3890）。当前 PR 待合并队列达 10 条，全部为 9 月 24 日集中提交，显示维护团队正在密集推进一轮 bug 修复与稳定性加固。今日无新版本发布；Issue 集中围绕 Iron Proxy 网关的 ARM64 兼容性和审批策略改进，已有对应 fix PR 在途，整体项目健康度良好。

---

## 2. 版本发布

**无** —— 过去 24 小时无新版本发布。

---

## 3. 项目进展

今日关闭/合并 3 条 PR，均属于针对 2.4.0 反馈的修复跟进，核心进展如下：

- **[#3882] fix(cli): list every approval status and drop reason the host writes**（[链接](https://github.com/nanocoai/nanoclaw/pull/3882)）—— 修复 `ncl approvals help` 和 `ncl dropped-messages help` 的枚举与实际主机写入不一致的问题，仅变更帮助文本及底层枚举元数据。该 PR 同时是 #3889 的前置修复（后者进一步删除 `unknown_sender_public` 幽灵原因项）。
- **[#3885] fix(setup): keep the Claude CLI offer to runs that chose Claude**（[链接](https://github.com/nanocoai/nanoclaw/pull/3885)）—— 防止在用户尚未选择 agent runtime 时过早弹出 Claude CLI 安装/登录向导，避免失败运行中的误导性引导。
- **[#3890] feat(agent-runner): explain inbound message blocks in the chat system prompt**（[链接](https://github.com/nanocoai/nanoclaw/pull/3890)）—— 在聊天会话 system prompt 中明确解释 `<message>`、`<dm-history>` 等入站块的语义，减少多 agent 组跨会话上下文中的歧义。

整体来看，今日关闭的 PR 主要打磨 CLI 交互准确性和部署鲁棒性；项目正在消化 2.4.0 发布后的社区反馈，进入精细化修整阶段。

---

## 4. 社区热点

今日热点集中在 **Iron Proxy 相关 Issue 与 PR 的联动讨论**（注：2 条 Issue 与多数 PR 均为 @glifocat 提交，呈现单个活跃贡献者集中驱动的特征）：

- **[#3888] Iron Proxy setup fails on arm64 hosts**（[链接](https://github.com/nanocoai/nanoclaw/issues/3888)）—— 在 NVIDIA DGX Spark（aarch64）上安装 Iron Proxy 时，`ironsh/iron-control` 镜像仅支持 amd64，导致容器 `exec format error`。该 Issue 直接催生了修复 PR [#3891](https://github.com/nanocoai/nanoclaw/pull/3891)（run Iron Control on arm64 hosts），24 小时内完成问题-修复闭环，响应速度值得肯定。
- **[#3881] Iron Proxy: per-host auto-approval rule**（[链接](https://github.com/nanocoai/nanoclaw/issues/3881)）—— 提议为 Iron Proxy 网关增加"按主机粒度的自动审批规则"，使工具技能调用已允许的主机时无需逐请求审批卡片。该需求直指审批协调器当前仅自动放行模型域名和只读主机白名单的限制，属于用户体验优化型诉求，暂无对应 PR，但可能与 #3893 的 heartbeat 修复共同构成网关体验优化方向。

**共性诉求**：两个热点都围绕 Iron Proxy 的部署灵活性与审批效率，说明社区用户正在将 Iron Proxy 用于更丰富的生产场景（如 ARM 边缘设备），且对高频工具调用的审批交互有降噪需求。

---

## 5. Bug 与稳定性

按严重程度排列今日报告的 Bug 及其处理状态：

| 严重度 | 问题描述 | Issue/PR | 状态 |
|--------|----------|-----------|------|
| **高** | Iron Control 镜像仅支持 amd64，ARM64 主机（如 NVIDIA DGX Spark）安装 Iron Proxy 失败（exec format error），阻塞部署 | [#3888](https://github.com/nanocoai/nanoclaw/issues/3888) | 已有 fix PR [#3891](https://github.com/nanocoai/nanoclaw/pull/3891) 待合并 |
| **中** | Claude 流式输出长内容块时，容器 heartbeat 超时被宿主扫描误杀 | [#3893](https://github.com/nanocoai/nanoclaw/pull/3893) | fix PR 待合并 |
| **中** | Iron Proxy 安装失败/中止后，残留的 Iron Control 数据库卷和容器导致重装无法进行 | [#3883](https://github.com/nanocoai/nanoclaw/pull/3883) | fix PR 待合并 |
| **低** | CLI 帮助文本列出主机从不写入的 `unknown_sender_public` 丢弃原因，造成用户误解（源自 #3882 枚举推导过宽） | [#3889](https://github.com/nanocoai/nanoclaw/pull/3889) | fix PR 待合并 |
| **低** | `ncl approvals help` 状态枚举不完整，缺少 `expired` 之后新增的状态 | [#3882](https://github.com/nanocoai/nanoclaw/pull/3882) | 已关闭（修复完成） |
| **低** | 测试稳定性：重启就绪探测/交付轮询测试在 CI 高负载时出现超时抖动（两处时序 flake，其中一处为诊断逻辑 bug） | [#3887](https://github.com/nanocoai/nanoclaw/pull/3887) | fix PR 待合并 |
| **低** | 测试稳定性：portal 运行时测试用固定 sleep 代替等待日志清空，CI 上偶发失败 | [#3892](https://github.com/nanocoai/nanoclaw/pull/3892) | fix PR 待合并 |
| **低** | setup 失败时可能向未选择 Claude 的用户错误引导安装 CLI | [#3884](https://github.com/nanocoai/nanoclaw/pull/3884) | fix PR 待合并 |

**观察**：今日无崩溃级回归报告；所有 Bug 均已有相应 fix PR，修复覆盖率 100%，且多数在 24 小时内提交，项目对问题响应非常及时。

---

## 6. 功能请求与路线图信号

- **Iron Proxy per-host 自动审批规则**（[#3881](https://github.com/nanocoai/nanoclaw/issues/3881)）—— 用户希望为可信主机配置一次性的自动批准，而非每次请求都弹审批卡片。该诉求与现有 `NANOCLAW_GATEWAY_READ_ONLY_HOSTS` 只读白名单机制形成互补，推测可能作为 Iron Proxy 的配置扩展进入后续版本（当前无对应 PR）。
- **WhatsApp 频道多 agent 发送者标识**（[#3510](https://github.com/nanocoai/nanoclaw/pull/3510)、[#3509](https://github.com/nanocoai/nanoclaw/pull/3509)）—— 两个 PR 自 8 月 25 日发起，今日有更新但仍未合并。功能为：多个 agent 组共享一个 WhatsApp 号码时，通过新增 `OutboundMessage.senderLabel` 在消息前标注实际应答的 agent 名称，并在共享模式下将已知 agent 标签视为自我回声。**这是目前最明确的下一版本功能候选**，涉及 `area/channels` 和 `area/core`，若合并将显著改善共享模式的可读性。
- **路线图信号总结**：当前功能需求集中在"多渠道多 agent 的会话可观测性"和"Iron Proxy 的运维灵活性"两大方向，与项目近期在 agent-runner、setup 等模块的加固工作形成呼应。

---

## 7. 用户反馈摘要

今日 Issue 评论数为 0（2 条 Issue 均无评论），直接用户讨论样本有限，从 Issue 描述和 PR 动机中提炼的痛点如下：

- **部署环节的架构限制**：用户 @glifocat 明确报告在 ARM64 设备（NVIDIA DGX Spark）上遇到镜像架构不兼容问题，并主动验证了具体原因（镜像 tag 最后构建时间 2026-06-15，仅 amd64）。这反映出真实用户正在将 NanoClaw 部署到非 x86 硬件（尤其是 ARM 边缘/工作站设备），且对安装失败原因有技术排查能力。
- **CLI 信息的准确性**：#3882/#3889 表明用户在使用 `ncl dropped-messages help` 时被不存在的枚举值误导，这类看似微小的文档-行为不一致会直接打击运维效率与工具可信度。
- **安装中断后的恢复**：#3883 中用户遭遇"因故中断的安装清理不干净，重装无门"的场景，这在真实部署中非常常见（网络中断、手动 Ctrl-C、资源不足被杀等），修复会显著降低 Iron Proxy 的试错成本。
- **多 agent 共享号码的混乱**：#3509/#3510 指出 WhatsApp 共享模式下所有回复都显示同一个 `ASSISTANT_NAME`，读者无法分辨是哪位 agent 应答 —— 这是多 agent 协作落地时的典型痛点。

**整体满意度信号**：虽然遇到上述问题，但用户以提交 fix PR 的方式参与修复，而非仅仅抱怨，侧面说明项目代码可维护性与贡献门槛对活跃用户友好。

---

## 8. 待处理积压

- **[#3510] whatsapp: per-agent sender label in shared mode**（[链接](https://github.com/nanocoai/nanoclaw/pull/3510)）—— 创建于 2026-08-25，今日有更新但**已滞留 30 天未合并**，且仍为 OPEN 状态。
- **[#3509] delivery: pass the sending agent's label to channel adapters**（[链接](https://github.com/nanocoai/nanoclaw/pull/3509)）—— 与 #3510 为配套 PR（companion），同样滞留 30 天。两条 PR 涉及 `area/channels` 和 `area/core`，跨越核心 delivery 层与频道适配层，可能需要维护者确认设计后再合并。**建议维护者优先安排评审**，因为这是当前唯一未闭合的长期功能积压，且直接影响 WhatsApp 共享模式的用户体验。

---

## 附：项目健康度观察

- **吞吐能力**：单日 13 条 PR 的高产出，配合 0 条无关联 Issue，说明项目处于活跃迭代期。
- **修复闭环**：今日所有 Bug 均已在 24 小时内获得 fix PR，闭环速度优秀。
- **社区参与**：Issue/PR 主要来自 @glifocat（12/15），社区贡献者分布较集中，可以关注是否存在外部贡献者参与度不足的隐忧。
- **CI/测试文化**：3 条 PR（#3887/#3892/#3893）专门修复测试稳定性和诊断逻辑，反映项目对 CI 可靠性的重视。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-25

---

## 1. 今日速览

过去 24 小时项目保持平稳运转，主要动作集中在 **1 条新 Issue**、**1 条待合并 PR** 和 **1 个新 RC 版本发布** 上。`ironclaw-v1.4.1-rc.2` 作为 `1.4.0` 的二度补丁候选版本发布，修复了 Google 扩展在运维方通过 Web UI 配置 OAuth 客户端时的激活问题，说明团队正在快速收敛 1.4.x 分支的稳定性问题。Issue 侧有 1 条模型失败分类报告（#8111），内容涉及 DeepSeek 模型在 OCR 数字化文件上的质量评估，属于质量监控范畴。项目整体健康度良好，虽无重大功能合并，但 Release 节奏稳定、维护活跃。

---

## 2. 版本发布

### [ironclaw-v1.4.1-rc.2](https://github.com/nearai/ironclaw/releases) — 2026-09-24

**版本定位**：`1.4.1` 的第二轮候选补丁（patch candidate），基于 `1.4.0` 之上，与 RC1 携带相同修复。

**修复内容**：
- Google 扩展（Gmail、Google Calendar）现在可以在部署环境中通过 **Web UI 而非仅环境变量** 来配置 Google OAuth 客户端，从而正常激活使用。

**破坏性变更**：无（RC 版本，属于缺陷修复）。

**迁移注意事项**：
- 该版本为 RC 候选，建议生产环境暂缓升级，等待正式版发布。
- 对于已通过环境变量方式配置 Google OAuth 的部署，升级后行为不变；新增的 Web UI 配置路径可作为替代方案。
- 建议在 staging 环境验证一次完整的 Google 扩展授权流程（Gmail / Calendar），确认 OAuth 客户端通过 UI 配置后能正常完成授权回调。

> ⚠️ Release Notes 原文在 “Authorization c” 处截断，完整更新说明请到 [Releases 页面](https://github.com/nearai/ironclaw/releases) 查看。

---

## 3. 项目进展

今日 **无合并/关闭的 PR**，但存在 1 条待合并 PR：

- **[#7988 [size: XS, risk: low, contributor: core] chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)**
  - 状态：OPEN（2026-08-29 创建，2026-09-24 更新）
  - 内容：由夜间 `Codebase Graph Refresh` 工作流自动生成的代码库记忆引导（bootstrap）快照刷新，属于 CI/基础设施维护。
  - 意义：该 PR 确保 agents 侧的代码库知识图谱与当前默认分支保持一致，属于常规性维护动作，不涉及新功能。
  - 建议：该 PR 已打开近一个月，建议维护者尽快 review 并合并，避免代码库记忆与主分支 drift 过大。

---

## 4. 社区热点

今日唯一活跃 Issue：

- **[#8111 [OPEN] Daily ironclaw failure taxonomy — 2026-09-24](https://github.com/nearai/ironclaw/issues/8111)**
  - 作者：@pranavraja99
  - 创建/更新：2026-09-24 | 评论：0 | 👍：0
  - 内容：当日失败分类报告，分析了 `officeqa` 套件（38 个非通过任务），结论是 **全部 38 个失败均为 deepseek-v4-flash 模型在 OCR 数字化 Treasury 文档上的真实模型质量问题**。

**分析**：该 Issue 是日常自动化质量监控报告，虽然无人工评论，但反映了一个值得关注的信号——当前默认模型（deepseek-v4-flash）在处理 OCR 数字化文档场景下表现不佳，可能成为下一阶段模型选型或 benchmark 调优的输入。此类报告虽非直接用户反馈，但对项目质量演进具有参考价值。

---

## 5. Bug 与稳定性

今日无新 Bug、崩溃或回归类 Issue/PR 上报。

关于 #8111 中的 38 个失败案例，其性质判定为 **模型能力缺陷** 而非平台 Bug，属于外部模型质量问题，不在 IronClaw 代码库修复范围内。如需改善，可能的路径包括：
- 调整默认模型配置（切换更强模型）
- 在 benchmark 中增加 OCR 场景的针对性评测
- 优化文档预处理链路

当前**无对应 fix PR**，建议维护团队持续跟踪该分类报告，评估是否需要在产品层面对 OCR 输入场景做降级或提示。

---

## 6. 功能请求与路线图信号

今日无明确的新功能请求 Issue。

从版本发布和 PR 中可以提取的路线图信号：

1. **Google 扩展 OAuth 配置 Web UI 化**（来自 v1.4.1-rc.2）：降低扩展激活门槛，使运维方无需接触环境变量即可完成 OAuth 客户端配置。这是对部署易用性的明确增强，预计将随 1.4.1 正式版发布。
2. **代码库知识图谱自动维护**（来自 PR #7988）： nightly workflow 持续刷新 agents 的代码库记忆，属于面向 agent 能力的后台基础设施投入，暗示项目正持续强化 agents 端侧的代码理解能力。

两者结合来看，IronClaw 当前阶段同时关注 “部署简化” 和 “agent 基础设施自动化”，下一版本（1.4.1 正式版）预计以稳定性修复和部署体验优化为主。

---

## 7. 用户反馈摘要

今日 Issues/PRs 均无用户评论，因此无直接的用户情绪数据。

基于 #8111 的间接推断：
- 用户/维护者在使用 deepseek-v4-flash 处理 OCR 数字化文档时，遇到了大比例（38 个任务全部失败）的质量问题。虽然该报告来自自动化分类，但失败任务数量可观，若此类任务进入真实用户工作流，将直接影响用户体验。
- 痛点场景：**OCR 数字化文档的问答/推理**——这是办公自动化、文书记档等场景的高频需求，模型在此类输入上的表现需重点关注。

建议维护团队在模型路由策略中考虑对 OCR 来源文档的特殊处理，或提供模型选择建议。

---

## 8. 待处理积压

### 需维护者关注

- **[#7988 chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)**
  - 创建于 2026-08-29，已打开 **27 天**，期间有更新但未合并。
  - 该 PR 由 CI 自动生成，风险低、体量小（XS），阻塞时间过长会导致 agents 侧代码知识图谱与主分支逐步脱节，建议尽快合并（或关闭后手动触发一次刷新）。

### 观察项

- **[#8111 Daily ironclaw failure taxonomy](https://github.com/nearai/ironclaw/issues/8111)**
  - 该系列为每日自动报告，虽非阻塞性问题，但 `officeqa` 套件连续出现大量模型失败时，建议升级为需人工介入的跟踪议题。

---

*本日报基于 2026-09-25 00:00 UTC 前 24 小时的 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-25


## 1. 今日速览

过去24小时内，LobsterAI 仓库共更新 18 条 Issue（其中 16 条被自动关闭，2 条仍开放）与 11 条 PR（5 条待合并，6 条已合并/关闭），无新版本发布。值得注意的是，本次关闭的 16 条 Issue 全部为 `[stale]` 自动清理，说明社区近期提交的大量反馈尚未获得维护团队的人工跟进处理。PR 侧则有持续且高质量的代码修复合入（尤其是在 OpenClaw 集成修复、UI 调整、图片附件与模型能力同步等方面），表明项目核心开发仍然活跃。综合来看，项目处于**稳步维护但社区反馈处理滞后**的阶段，需警惕积压风险。

- 今日唯一新开 PR：`#2763`（修复整轮重放冲突，open）
- 今日新开 Issue：0 条，活跃 Issue 2 条（`#1861`、`#2385`，均为历史遗留）
- stale 自动清理：16 条 Issue / 4 条 PR


## 2. 版本发布

过去 24 小时内无新版本发布，`Latest Releases` 为空。项目当前处于功能迭代与稳定化阶段。


## 3. 项目进展

今日合并/关闭的 PR 数量为 6 条，整体呈现**修复驱动**的特征：

| PR | 标题 | 状态 | 影响 |
|---|---|---|---|
| [#2761](https://github.com/netease-youdao/LobsterAI/pull/2761) | fix(openclaw): resolve model output-length truncation issues | ✅ 已合并 | 修复 GLM-5.3 等模型由于 `max_tokens` 默认值过低导致的输出截断问题；模型目录扫描覆盖第三方预装插件（volcengine、zai、deepseek 等），扩大模型支持面。 |
| [#2762](https://github.com/netease-youdao/LobsterAI/pull/2762) | feat(ui): align palette and layout | ✅ 已合并 | UI 全面重构：去除蓝色偏色、主内容区改为通栏布局、侧边栏导航改为胶囊按钮、窗口尺寸自适应调整。 |
| [#2760](https://github.com/netease-youdao/LobsterAI/pull/2760) | feat(ui): align palette and layout | ✅ 已合并 | 与 #2762 同标题，可能是修复后的重新提交，推测为同一 UI 调整工作的收尾。 |
| [#2759](https://github.com/netease-youdao/LobsterAI/pull/2759) | fix(openclaw): repair and continue malformed OpenAI-compatible tool calls | ✅ 已合并 | 修复畸形工具调用导致任务中途失败的问题：支持原始控制字符的字符串修复，并允许最多两次内部续传，提升工具链稳定性。 |
| [#2358](https://github.com/netease-youdao/LobsterAI/pull/2358) | fix(cowork): show feedback when session rename fails | ✅ 已合并 | 会话重命名失败时增加本地化错误反馈（Fixes #670），消除静默失败问题。 |
| [#2373](https://github.com/netease-youdao/LobsterAI/pull/2373) | fix(cowork): sync image attachments with model capability | ✅ 已合并 | 修复图片附件与模型视觉能力的同步问题，对应 #1861 的核心诉求，可能已部分解决该历史 Issue。 |

**总结**：本次合入的修复重点聚焦于 OpenClaw 引擎稳定性（输出截断、工具调用容错）与 UI 体验优化，同时解决了两个长期存在的合作模块（Cowork）体验问题，项目整体在**稳定性和体验一致性上有所推进**。


## 4. 社区热点

> 注：以下 Issue 均已被 stale 自动关闭，但背后仍反映真实用户诉求。

### 4.1 高讨论量 Issue（4 条评论）

- [#2079 执行结果窗口滚动到顶端会假死](https://github.com/netease-youdao/LobsterAI/issues/2079)（作者 @fcinfo，创建 2026-05-30）— 复现明确的 UI 假死问题，长时间未获人工确认。
- [#2120 建议：预输入任务、延长任务时长、优化技能 UI](https://github.com/netease-youdao/LobsterAI/issues/2120)（作者 @nbjoe，创建 2026-06-06）— 包含 3 条具体产品建议，反映用户对工作连续性和界面美观度的关注。
- [#2121 重复输出是否在消耗大量 token？](https://github.com/netease-youdao/LobsterAI/issues/2121)（作者 @nbjoe，创建 2026-06-07）— 用户对 token 消耗的疑虑，涉及透明度和成本问题。
- [#2131 LobsterAI 支持 hermes agent 有计划吗？](https://github.com/netease-youdao/LobsterAI/issues/2131)（作者 @wtgoku-create，创建 2026-06-09）— 对第三方 agent 集成的关注。

### 4.2 安全类 Issue 聚合（最高关注度）

- 安全研究员 @YLChen-007 连续提交 5 条 Security Advisory（#2176、#2181、#2286、#2287、#2288），涉及**本地文件读取、SSRF 防护绕过、token 代理未授权访问、文件外泄、符号链接穿越**等。这些 Issue 均被 stale 自动关闭，这是需要高度警惕的信号。

**分析**：社区热点集中在**性能问题、token 成本透明化、多 agent 扩展、以及安全漏洞响应**。前两者说明用户开始用生产级标准要求工具；后者说明安全问题提交流程可能存在沟通缺口。


## 5. Bug 与稳定性

过去 24 小时内无新增 Bug 报告，但今日关闭的 stale Issue 揭示了大量历史遗留的严重问题。按严重程度排列如下：

| 等级 | Issue | 问题描述 | 是否有修复 PR |
|---|---|---|---|
| 🔴 严重 | [#2214 数据备份导致主进程卡死](https://github.com/netease-youdao/LobsterAI/issues/2214) | 100% 可复现，备份大数据库（71.6 MB）时主进程崩溃，只能强制结束。 | ❌ 无 |
| 🔴 严重 | [#2230 同一模型比 CodeBuddy 慢 10 倍以上](https://github.com/netease-youdao/LobsterAI/issues/2230) | DBX 模型对比：CodeBuddy 2m24s / 67K Token vs LobsterAI 25min / 60M Token，差距巨大。 | ❌ 无 |
| 🟠 高 | [#2176 任意本地文件读取（Security）](https://github.com/netease-youdao/LobsterAI/issues/2176) | 自动加载 artifact 时解析 `MEDIA:` 引用导致文件读取。 | ❌ 未标记 |
| 🟠 高 | [#2286 本地 token 代理未授权访问（Security）](https://github.com/netease-youdao/LobsterAI/issues/2286) | 任何本地进程可重放用户已认证的 API 能力。 | ❌ 未标记 |
| 🟠 高 | [#2287 任意主机文件外泄（Security）](https://github.com/netease-youdao/LobsterAI/issues/2287) | NIM 集成将模型生成的本地路径作为附件外发。 | ❌ 未标记 |
| 🟠 高 | [#2288 符号链接穿越文件泄露（Security）](https://github.com/netease-youdao/LobsterAI/issues/2288) | HTML 预览服务器未正确限制符号链接。 | ❌ 未标记 |
| 🟠 高 | [#2215 NSIS 安装反复失败（Resource extraction failed）](https://github.com/netease-youdao/LobsterAI/issues/2215) | 安装路径干扰（C 盘 vs G 盘副本），NSIS 卸载逻辑缺陷。 | ❌ 无 |
| 🟠 高 | [#2216 Memory Search 无法切换 Embedding Provider](https://github.com/netease-youdao/LobsterAI/issues/2216) | 当 OpenAI 配额耗尽时记忆搜索完全不可用，DB 锁阻塞索引重建（EBUSY）。 | ❌ 无 |
| 🟠 中 | [#1861 图片附件不随模型切换重新处理](https://github.com/netease-youdao/LobsterAI/issues/1861) | 视觉/非视觉模型切换后附件状态不同步，今日合并的 #2373 可能已修复此问题。 | ✅ 已合并 #2373 |
| 🟡 低 | [#2385 对话框无法添加文件夹](https://github.com/netease-youdao/LobsterAI/issues/2385) | 缺少 @文件夹 的支持能力。 | ❌ 无 |

**重点警示**：5 条安全 Advisory 全部被 stale 自动关闭，建议维护者立即审查这些 Issue 的状态并给出官方回应。


## 6. 功能请求与路线图信号

### 已有关联 PR 的功能请求（大概率进入下一版本）

| Issue / PR | 功能请求 | 关联 PR | 进展 |
|---|---|---|---|
| [#2342 隐藏侧边栏广告横幅的需求](https://github.com/netease-youdao/LobsterAI/issues/2342) | 永久隐藏侧边栏广告 | [#2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — 新增 Settings → General 永久关闭选项 | 🟡 待合并（open，7/21 创建） |
| OpenClaw 进度卡片需求（推测来自社区反馈） | 多步骤任务显示实时计划与当前步骤 | [#2758](https://github.com/netease-youdao/LobsterAI/pull/2758) — 在 Cowork 中显示原生 OpenClaw progress card | 🟡 待合并（open，9/24 创建） |
| OrcaRouter 网关集成需求（推测） | 新增 LLM 路由网关提供商 | [#2504](https://github.com/netease-youdao/LobsterAI/pull/2504) — 端到端镜像 OpenRouter 集成 | 🟡 待合并（open，8/17 创建，stale 标记） |

### 无关联 PR 但有明确路线图信号的请求

- [#2120 任务预输入和延长运行时长](https://github.com/netease-youdao/LobsterAI/issues/2120)：增强 Claw 运行连续性，避免监控中断。与 [#2758 进度卡显示](https://github.com/netease-youdao/LobsterAI/pull/2758) 方向一致，可能被纳入后续多任务编排版本。
- [#2239 编程工具的 OpenClaw 化建议](https://github.com/netease-youdao/LobsterAI/issues/2239)：建议通过 MCP 协议与编程工具（OpenCode、CodeBuddy CN）深度联动，属于架构级别的生态扩展方向。
- [#2180 AI Collaborator 提案](https://github.com/netease-youdao/LobsterAI/issues/2180)：将 OpenClaw 从底层工具集升级为面向非精英程序员的 AI 协作平台。目前处于提案阶段。
- [#2131 hermes agent 集成](https://github.com/netease-youdao/LobsterAI/issues/2131)：第三方 agent 集成需求，目前无计划信号。

### 路线图信号总结

下一版本可能包含：**隐藏广告开关（#2374）、OpenClaw 原生进度卡（#2758）、OrcaRouter 提供商支持（#2504）**。中长期方向可能是**多任务编排与编程工具联动**。


## 7. 用户反馈摘要

### 性能与效率痛点

- **任务中断困扰**（#2120）：用户在数据获取脚本监控时遇到 `terminated` 提示，脚本仍在运行但监控已停止，影响开发连续性。
- **Token 消耗疑虑**（#2121）：用户发现重复输出文字，怀疑大量消耗 token，提出"是否是 Claw 的问题"。
- **性能差距不可接受**（#2230）：在同模型、同提示词条件下，LobsterAI 比 CodeBuddy 慢 10 倍、消耗 900 倍 token（25 分钟 vs 2m24s，60M vs 67K），用户用截图展示了差异。

### UI/UX 反馈

- 技能界面双列展示在 2560×1600 全屏下不够美观，建议改为 3 列（#2120）。
- 对话框无法添加文件夹，缺少 `@文件夹` 交互（#2385）。

### 稳定性反馈

- 备份功能直接导致主进程卡死（#2214），用户只能强制结束进程。
- 安装失败反复出现，最终定位是安装路径干扰和卸载逻辑缺陷（#2215）。

### 满意点

- 用户认可 MCP 全面支持的能力（#2239 中提到 "LobsterAI 已全面支持 MCP"），并认为这是其生态扩展的核心优势。


## 8. 待处理积压

> 以下条目为长期未获人工响应或仍在等待合并的重要 Issue / PR，建议维护者优先关注。

### 🔴 高优先级

| 条目 | 创建时间 | 待处理时长 | 说明 |
|---|---|---|---|
| [#2176 任意本地文件读取（Security）](https://github.com/netease-youdao/LobsterAI/issues/2176) | 2026-06-18 | ~99 天 | 安全漏洞，被 stale 自动关闭 |
| [#2181 SSRF 防护绕过（Security）](https://github.com/netease-youdao/LobsterAI/issues/2181) | 2026-06-21 | ~96 天 | 安全漏洞，被 stale 自动关闭 |
| [#2286 Token 代理未授权访问（Security）](https://github.com/netease-youdao/LobsterAI/issues/2286) | 2026-07-07 | ~80 天 | 安全漏洞，被 stale 自动关闭 |
| [#2287 任意文件外泄（Security）](https://github.com/netease-youdao/LobsterAI/issues/2287) | 2026-07-07 | ~80 天 | 安全漏洞，被 stale 自动关闭 |
| [#2288 符号链接文件泄露（Security）](https://github.com/netease-youdao/LobsterAI/issues/2288) | 2026-07-07 | ~80 天 | 安全漏洞，被 stale 自动关闭 |
| [#2214 数据备份导致主进程卡死](https://github.com/netease-youdao/LobsterAI/issues/2214) | 2026-06-26 | ~91 天 | 高严重度 Bug，100% 可复现 |
| [#2230 性能严重劣于竞品](https://github.com/netease-youdao/LobsterAI/issues/2230) | 2026-06-30 | ~87 天 | 10

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

# CoPaw（QwenPaw）项目动态日报 — 2026-09-25

> 数据来源：[github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)（仓库显示为 QwenPaw）  
> 统计窗口：2026-09-24 ~ 2026-09-25

---

## 1. 今日速览

过去 24 小时项目活跃度维持在**较高水平**：共产生 21 条 Issue 动态（新开/活跃 15，关闭 6）和 22 条 PR 动态（待合并 16，合并/关闭 6），无新版本发布。社区讨论的热点集中在 **QwenPaw Hub 多租户路线图**（#7318，32 条评论）上，同时多个稳定性缺陷（飞书会话卡死、上下文压缩越界、媒体 URL 污染会话等）被集中报告或修复。值得注意的信号是：**8 个今日新开 PR 来自首次贡献者**，覆盖微信扫码超时、插件目录计数、代码围栏闭合等边界修复，说明外部贡献渠道正在发挥作用。整体来看，项目处于**快速迭代、社区参与度上升**的阶段，但长期存在的上下文管理类和渠道稳定性类问题仍是健康度短板。

---

## 3. 项目进展

今日合并/关闭 6 个 PR，主要分布在**控制台 UI 修复、provider 流恢复、附件发送**三个方向：

- **[#7972 fix(console): default session list grouping to source](https://github.com/agentscope-ai/QwenPaw/pull/7972)**（已合并）  
  将侧边栏会话列表默认分组从 `date` 改为 `source`，是 #7968（侧边栏改版导致分组功能失效）的跟进修复，并同步更新了相关测试。

- **[#7971 fix(console): gate tool-call lifecycle queries on execution start](https://github.com/agentscope-ai/QwenPaw/pull/7971)**（已合并）  
  修复控制台在 `plugin_call` 消息完成时就轮询 `/api/tool-calls/{sid}/{tcid}`、而后端 `on_acting` 尚未注册调用的问题，避免空轮询和误报。

- **[#7960 fix(providers): recover after stalled stream cleanup](https://github.com/agentscope-ai/QwenPaw/pull/7960)**（已合并）  
  为流式读取停滞的 provider 清理引入 60 秒单调时钟上限，解除该 provider/model key 的永久隔离状态，使同一进程内后续请求可自动恢复。

- **[#5659 fix(chat): allow sending attachments without text](https://github.com/agentscope-ai/QwenPaw/pull/5659)**（已关闭）  
  允许在存在附件但文本输入为空时提交消息，并补充覆盖「纯文本 / 文本+附件 / 纯附件 / 空提交」的测试用例。该 PR 在 6 月 30 日提交，今日关闭。

- **[#7961 fix(web): replace GPL html2text dependency](https://github.com/agentscope-ai/QwenPaw/pull/7961)**（待合并）  
  将 `web_fetch` 的 GPL-3.0 依赖 `html2text` 替换为 MIT 许可的 `markdownify`，改善项目开源许可证合规性。

- **[#7965 fix(context): reclaim historical media in Scroll and align thinking omission with token counting](https://github.com/agentscope-ai/QwenPaw/pull/7965)**（待合并）  
  针对 #7853 的跟进：修复长图会话/工具循环下 Scroll 策略无法回收历史媒体内容的问题，并统一思考省略逻辑与 token 计数方式。

> 综合来看，项目今日在**控制台体验、provider 容错恢复、依赖合规**三方面均有实质进展；但 16 个 PR 仍在待合并状态，其中包括实时语音（#7785）与持久化转录（#7931）两个较大功能，合并节奏偏慢。

---

## 4. 社区热点

- **[#7318 [Discussion] QwenPaw Hub 多租户版 2.2.0 已发布：接下来该构建什么？](https://github.com/agentscope-ai/QwenPaw/issues/7318)** — 32 条评论 · 👍 4  
  最热讨论。QwenPaw 起步于个人 AI 助手，但社区反复提出团队化运行需求，Hub 是官方首次回应。讨论串中引用 #2324（多用户访问 + 管理员管理技能）等历史需求，背后诉求是**从「个人工具」向「团队基础设施」演进**的方向选择。

- **[#7576 [Bug] RetryChatModel 硬编码 32768 上下文导致所有模型触发 CONTEXT_UNFIT](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — 6 条评论，已关闭  
  确认影响 v2.1.0 到 v2.2.0 全部版本，`retry_chat_model.py` 中 `context_size=getattr(...)` 的兜底值强制所有模型使用 32768 token 窗口，引发高 token 模型出错。用户对该问题的存在时间和影响范围表达了明显不满。

- **[#7628 [Bug] 上下文压缩仍可能超出 provider 完整请求预算](https://github.com/agentscope-ai/QwenPaw/issues/7628)** — 6 条评论  
  讨论核心：压缩触发条件和最终预算应基于**实际发送给 provider 的完整请求**，而非仅当前可见的对话上下文。属于上下文管理领域的深水区问题。

- **[#7715 [Bug] Daily Paper 在 arxiv.org 不可达时静默失败](https://github.com/agentscope-ai/QwenPaw/issues/7715)** — 4 条评论  
  邮件提示「completed with no returned content」而真实原因是 `httpx` 连接错误，用户需要代理/端点配置能力，并对误导性错误信息表示困惑。

- **[#7534 [Bug] 飞书会话 queue consumer 卡死后会话静默无响应](https://github.com/agentscope-ai/QwenPaw/issues/7534)** — 4 条评论  
  详细描述了高优先级卡片消息处理路径卡死后、同一会话新消息无法唤起新 consumer 的完整链路，属于渠道稳定性的严重缺陷。

> **分析**：社区讨论的焦点集中在「项目未来的产品形态」（Hub 多租户）和「核心运行时可靠性」（上下文超限、渠道卡死、静默失败）两大类问题上，说明用户在认可功能迭代速度的同时，对生产环境稳定性有更高要求。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 | Fix PR |
|---|---|---|---|---|
| **高** | [#7534 飞书会话 consumer 卡死](https://github.com/agentscope-ai/QwenPaw/issues/7534) | 高优消息处理后 consumer 不再拉取下一条、无崩溃日志，同一 session 新消息无法恢复 | OPEN（2026-09-03） | 无 |
| **高** | [#7628 上下文压缩超出完整请求预算](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 压缩触发与最终预算是基于可见上下文而非完整请求，可能导致活跃 turn 失败 | OPEN（2026-09-08） | 无 |
| **高** | [#7966 切换 provider 后会话永久损坏](https://github.com/agentscope-ai/QwenPaw/issues/7966) | 历史记录中的 `file://` 媒体 URL 被 OpenAI 兼容端点以 `invalid_parameter_error` 拒绝，每个 turn 都失败 | OPEN（2026-09-24） | [#7973](https://github.com/agentscope-ai/QwenPaw/pull/7973)（待合并） |
| **中** | [#7856 qwenpaw-pet 0.1.1 破坏工具审批](https://github.com/agentscope-ai/QwenPaw/issues/7856

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