# OpenClaw 生态日报 2026-09-11

> Issues: 445 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-11 01:56 UTC

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

# OpenClaw 项目动态日报 — 2026-09-11

## 1. 今日速览

过去 24 小时项目保持极高活跃度：共更新 445 条 Issues（新开/活跃 241 条，关闭 204 条）和 500 条 PR（待合并 232 条，合并/关闭 268 条），并发布了一个 LTS 版本。Issue 侧聚焦在消息丢失、SQLite 锁竞争、僵尸进程泄漏等稳定性问题上，其中 P0/P1 级问题占比较高；PR 侧以 UI 修复、插件分类重构和沙箱安全修复为主。整体看，项目正处于高强度迭代与稳定性加固并行阶段，社区反馈密集，维护者响应速度较快。

---

## 2. 版本发布

### v2026.6.35 — 2026 年 6 月扩展稳定版（LTS）最终版

**链接**: https://github.com/openclaw/openclaw/releases/tag/v2026.6.35

**更新内容**：
- 更安全的 provider 和 channel 边界：内置 provider 与 channel 适配器现在会限制不可信响应体的大小，在昂贵操作之前拒绝超大输入，并在传输异常时保留安全恢复能力
- 这是 2026.6.x 系列的最终 LTS 版本，后续维护将只含安全与关键修复

**迁移注意事项**：
- 当前 Issue 列表中已出现多起从 2026.7.x / 2026.8.x 升级到 2026.9.x 的回归报告（如 #142585、#135776、#140770），建议仍停留在 2026.6.x LTS 线的用户关注升级路径的兼容性验证后再迁移
- 若使用官方渠道插件（Discord、Slack 等），请注意核心与插件版本对齐问题（参考 #135776）

---

## 3. 项目进展

今日合并/关闭的 PR 中，以下几项值得关注：

- **[#144438] fix(agents): preserve captured fallback model selections** — 修复了回退模型在选中与物化阶段重复消费 alias 导致 `middle` 被错误当成 `final` 的问题。关联 #130706、#143961
  链接: https://github.com/openclaw/openclaw/pull/144438

- **[#144469] fix(deepseek): honor thinking controls for canonical Flash** — 修复 DeepSeek canonical Flash 能力声明与思考控制不生效的问题，并补充了 canonical-model 分析
  链接: https://github.com/openclaw/openclaw/pull/144469

- **[#144531] fix: attribute slow session list requests** — 为慢会话列表请求增加可观测性，区分列表投影、请求等待和分页复用，帮助运维定位瓶颈
  链接: https://github.com/openclaw/openclaw/pull/144531

- **[#141742] feat(cron): show readable timer wake timestamps** — cron 调试日志中增加人类可读的 `nextAt` 时间戳，改善运维体验，关闭 #58574
  链接: https://github.com/openclaw/openclaw/pull/141742

另外，今日有 204 条 Issue 关闭，其中包括多起长期存在的问题：beta 反馈收集 #125626、更新状态卡死 #139714、overflow retry 成功但未送达 #132762、Molty 模型选择器 #101763、launchd stderr 被丢弃 #90711、channel 持久化 ingress 采用 #109657 等，说明维护团队正在加速验收并闭环历史积压。

---

## 4. 社区热点

今日讨论热度最高的 Issues：

- **[#125626] OpenClaw 2026.8.1 beta feedback**（24 评论，已关闭）— 官方 beta 反馈收集帖，社区集中反映 2026.8.1 beta 的问题，是今日关闭的 Issues 中讨论量最大的
  链接: https://github.com/openclaw/openclaw/issues/125626

- **[#91009] Codex PreToolUse native hook relay 产生 CPU-bound 进程并阻塞 Gateway RPC**（22 评论，P0，仍开启）— 自 6 月初报告至今仍活跃讨论，社区对 Codex 集成的 CPU 占用和 RPC 阻塞问题关注度极高
  链接: https://github.com/openclaw/openclaw/issues/91009

- **[#97616] OpenClaw 泄漏未回收的 hook/tool 子进程导致僵尸进程堆积**（15 评论，P1，仍开启）— 反映长时间运行后系统资源退化，属稳定性类热门问题
  链接: https://github.com/openclaw/openclaw/issues/97616

- **[#114612] SQLite 无界增长：memory_index_chunks 与 memory_embedding_cache 无保留策略**（13 评论，P2，仍开启）— 生产实例磁盘被填满的隐患，社区关注度高
  链接: https://github.com/openclaw/openclaw/issues/114612

- **[#139714] post-core update 后 update_runs 行永远无法终结**（13 评论，已关闭）— 升级后 `openclaw status` 永远显示 "update in progress"，影响面广
  链接: https://github.com/openclaw/openclaw/issues/139714

**热点诉求分析**：社区当前最关心三大方向 —— **(a)** Codex 集成稳定性（CPU 占用、进程泄漏）；**(b)** 长时间运行后的数据库与进程资源管理；**(c)** 升级路径中的状态一致性问题。这些都直接影响生产环境可用性。

---

## 5. Bug 与稳定性

### P0（严重/阻断）

| Issue | 问题 | 状态 |
|---|---|---|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook relay 产生 CPU-bound 进程，阻塞 Gateway RPC | 开启 6/6 至今 |
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | 2026.9.3 Doctor 拒绝合法的 legacy workspace 迁移 | 开启 9/8 |
| [#144066](https://github.com/openclaw/openclaw/issues/144066) | gpt-5.4/-mini 间歇性误路由到 openai-codex（stale auth_profile_state.order） | 开启 9/10 |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) | Windows 上 gateway restart 将启动中的 gateway 误杀（181s 超时） | 开启 9/6 |
| [#135776](https://github.com/openclaw/openclaw/issues/135776) | `openclaw update` 后官方渠道插件仍停留在旧版本（版本倾斜） | 开启 9/2 |

### P1（高优先级）

| Issue | 问题 | 是否有 fix PR |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | hook/tool 子进程泄漏，僵尸进程堆积 | 无 |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | ssh spawn 挂起（2026.8.1 回归） | 无 |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行期间新消息被丢弃（2026.9.2 回归） | 无 |
| [#142476](https://github.com/openclaw/openclaw/issues/142476) | cron session reaper 同步 PRAGMA integrity_check 阻塞事件循环 14-76s | 无 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | requester-settle 批次在所有权检查后永远重试 | 无 |
| [#117262](https://github.com/openclaw/openclaw/issues/117262) | 3 个并发写句柄导致 SQLite 事件循环停顿 ~33s | 无 |

### 值得注意的中优先级问题

- **未关闭的 P1**: [#121617](https://github.com/openclaw/openclaw/issues/121617)（compaction 误判 "nothing new to compact"）、[#104719](https://github.com/openclaw/openclaw/issues/104719)（memory-wiki fallback 忽略工具 deadline）、[#121187](https://github.com/openclaw/openclaw/issues/121187)（yielded requester 重试 NO_REPLY）、[#128971](https://github.com/openclaw/openclaw/issues/128971)（Telegram 终态回执 delivery_ambiguous 导致丢失）、[#95866](https://github.com/openclaw/openclaw/issues/95866)（强制重启丢弃 in-flight 回复）

- **安全类**: [#112110](https://github.com/openclaw/openclaw/issues/112110) — 子代理 MCP 工具执行时权限作用域错误地评估到父会话，属授权缺陷，P1，已 stale

### 今日新增并已有对应 PR 的 Issue

- **#143980** — Docker 沙箱代理中 `taskSuggestions.accept` 失败 → 已有 PR **#144573**（给 suggest_task 一个宿主 cwd）
  链接: https://github.com/openclaw/openclaw/pull/144573
- **#144493** — memory-core chunking 升级期间搜索返回空 → 已有 PR **#144572** 与 **#144576**（在升级期间提供词法结果）
  链接: https://github.com/openclaw/openclaw/pull/144572 | https://github.com/openclaw/openclaw/pull/144576
- **#144556** — Codex 图片请求中重放旧 Telegram 照片 → 已有 PR **#144567**
  链接: https://github.com/openclaw/openclaw/pull/144567
- **#144557** — 可信网络下 OpenAI OAuth 语音转录失败 → 已有 PR **#144566**
  链接: https://github.com/openclaw/openclaw/pull/144566

---

## 6. 功能请求与路线图信号

今日开放的功能请求类 Issue 可以归纳为以下方向：

**自动更新与升级体验**
- [#12855](https://github.com/openclaw/openclaw/issues/12855) — 内置自动更新（可配置计划、确认提示、更新后通知），P2，已进入 maintainer/product-decision 讨论
- [#107930](https://github.com/openclaw/openclaw/issues/107930) — 改进 Node.js 版本变更时的升级体验，P2，有社区讨论但尚无 PR

**可观测性与消息可靠性**
- [#109370](https://github.com/openclaw/openclaw/issues/109370) — 在 `message_sent` hooks 上暴露投递关联数据（MessageReceipt、delivery id、runId），帮助插件幂等对账，P2
- [#109657](https://github.com/openclaw/openclaw/issues/109657)（已关闭）— 在 WhatsApp/Discord/Slack/Signal/iMessage 上采用 core durable ingress drain，表明该方向核心已落地，正在向渠道扩展

**交互体验**
- [#8285](https://github.com/openclaw/openclaw/issues/8285) — 自动发送 intent/acknowledgment 文本消息，降低用户等待焦虑，P3

**路线图信号**：今日 PR 中，[#142759](https://github.com/openclaw/openclaw/pull/142759)（扩展产品分类与图标）和 [#142760](https://github.com/openclaw/openclaw/pull/142760)（为 152 个内置插件分配唯一用途分类）已经 ready for maintainer look，说明 ClawHub 生态的分类规范化正在推进，后续插件市场可视化和检索会更好。这些大 PR 是产品化前端的信号。

---

## 7. 用户反馈摘要

从今日活跃的 Issue 评论中提炼的真实用户声音：

- **生产环境资源担忧**：多位用户反映长时间运行后资源持续恶化 —— 僵尸进程累积（#97616，"over time these accumulate as zombies"）、SQLite 表无界增长（#114612，"will fill disk over time"）、19 GB 孤儿临时数据库（#136311）。用户对"无保留策略""无法自动恢复"表达了明确的挫败感。

- **升级路径脆弱**：多个用户在从 2026.7.x/2026.8.x 升级到 2026.9.x 时遇到问题 —— Doctor 拒绝合法迁移（#142585）、更新后 status 永远显示更新中（#139714）、插件版本倾斜导致 Discord 无法加载（#135776）、Node.js 版本变更导致手动重装（#107930）。升级体验是当前用户满意度短板。

- **消息丢失是最敏感的痛点**：多条 Issue 指向消息在特定条件下被丢弃 —— 回复运行中到达的新消息（#139847）、Telegram 终态回执歧义时丢消息（#128971）、overflow retry 成功但无最终交付（#132762）。这类问题直接破坏用户对 agent 的信任。

- **Windows 用户面临额外困难**：多条 Windows 专属问题 —— Scheduled Task 无法无人值守启动（#143757）、gateway restart 误杀启动中的进程（#140162）、doctor 快照清理失败（#138260），Windows 平台稳定性仍是薄弱环节。

- **正面信号**：截至 9 月 10-11 日，有 204 条 Issue 被关闭，其中包含多起自 6 月以来

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**报告日期**：2026-09-11  
**分析范围**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw、EasyClaw 共 12 个项目

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现**金字塔结构**：OpenClaw 作为核心底座占据生态中枢位置，日均处理超 900 项 Issue/PR 活动，并催生出 LobsterAI、EasyClaw 等直接基于其内核的封装型项目；外围则分化出 NanoBot、Zeroclaw、CoPaw 等独立路线，在 WebUI 体验、安全加固、多租户部署等细分维度建立差异化优势。全行业正从功能竞争进入**稳定性与安全性深水区**——消息丢失、进程泄漏、SQLite 资源膨胀、升级回退问题跨项目高频出现，各团队均投入大量精力进行稳定性加固与积压清理。同时，安全审计（沙箱逃逸、权限绕过、令牌泄露）开始成为社区主动关注的重要议题。整体而言，生态活力充沛但成熟度分层明显，底座型项目强者恒强，垂直场景项目仍存在大量结构性机会。

---

## 2. 各项目活跃度对比

| 项目 | Issues（24h） | PR 动态（24h） | Release | 整体活跃度 | 健康度评估 |
|------|--------------|---------------|---------|-----------|-----------|
| **OpenClaw** | 445（新开/活跃 241，关闭 204） | 500（待合并 232，合并/关闭 268） | 1 个 LTS 最终版 | ★★★★★ 极高 | 高强度迭代+稳定性加固并行，维护者响应快，但 P0/P1 积压仍多 |
| **CoPaw** (QwenPaw) | 26（新开/活跃 19，关闭 7） | 38（待合并 27，合并/关闭 11） | v2.2.1-beta.2 | ★★★★☆ 高 | 功能迭代高峰期，但安全/稳定性问题占比上升，需警惕 |
| **NanoBot** | 3（新开 2，关闭 1） | 22（待合并 11，合并 9，关闭未合入 2） | 无 | ★★★★☆ 高 | 前后端同步增强，但 8+ PR 带 conflict 标签，合并受阻风险 |
| **Zeroclaw** | 50（全部活跃/新开） | 50（全部待合并，0 合并） | 无 | ★★★★☆ 提交活跃 | 合并吞吐为零，瓶颈显著；S0 安全漏洞待修复 |
| **ZeptoClaw** | 3（安全相关，全部关闭） | 19（18 合并，1 待合并） | 无 | ★★★★☆ 中高 | 安全加固+技术债集中清理，节奏健康 |
| **LobsterAI** | 0 | 13（10 合并，3 待处理） | 无 | ★★★★☆ 中高 | OpenClaw 升级后密集修复期，响应速度快，闭环质量高 |
| **IronClaw** | 1 | 8（2 关闭，6 待合并） | 无 | ★★★☆☆ 中高 | 稳定迭代，依赖自动更新为主，功能 PR 少量 |
| **Moltis** | 0（关闭 2 个历史 Bug） | 7（3 合并，4 待合并） | 无 | ★★★☆☆ 中上 | 修复积压+功能推进并存，无长期僵尸 Issue |
| **NanoClaw** | 3（1 个 high 级 Bug 敞开） | 6（3 合并，3 待处理） | 无 | ★★★☆☆ 中等 | agent-runner 核心改进持续，高优 Bug 敞开 14 天需注意 |
| **EasyClaw** | 0 | 0 | 4 个（v1.9.11~v1.9.14） | ★★☆☆☆ 开发侧活跃 | 发布节奏稳定，但社区互动极低，外部贡献者参与不足 |
| **PicoClaw** | 2 | 7（全部待合并，5 为 stale 依赖更新） | 无 | ★★☆☆☆ 中低 | 社区提交活跃，但维护者响应慢，合并延迟明显 |
| **TinyClaw** | — | — | — | ☆☆☆☆☆ 无活动 | 24 小时零动态，处于停滞/休眠状态 |

---

## 3. OpenClaw 在生态中的定位

**核心底座，生态中枢。** OpenClaw 以日均 445 条 Issue、500 条 PR 的体量，甩开其他项目 10~100 倍，其社区规模与维护者响应速度在生态内无出其右。发布的 v2026.6.35 LTS 最终版标志着其建立了**长期稳定版本线**（2026.6.x）与**快速迭代版本线**（2026.9.x）并行的版本管理机制，这在同类项目中是独有的成熟度信号。

**技术路线差异**——OpenClaw 走的是"全功能底座+插件生态"路线：内置 provider/channel 边界安全控制、152 个内置插件的用途分类体系、ClawHub 生态规范化、cron/记忆/沙箱等内建能力，构成一个高度可扩展的通用 agent 平台。相比之下：

| 维度 | OpenClaw | NanoBot / Zeroclaw / CoPaw |
|------|----------|---------------------------|
| **架构定位** | 通用底座，生态中心 | NanoBot：WebUI/Telegram 优先的轻量 agent；Zeroclaw：Rust 安全强化的独立实现；CoPaw：多 IM 渠道+Hub 多租户 |
| **版本策略** | 双轨制（LTS + 快速迭代） | 无 LTS，滚动发布为主 |
| **生态辐射** | LobsterAI、EasyClaw 直接基于其内核 | 各自独立演进，生态互通有限 |
| **社区规模** | 445 Issues / 500 PR 每日 | NanoBot 22 PR、Zeroclaw 50 PR、CoPaw 38 PR |

**优势**：最大社区、最全功能、插件生态完善、有明确的稳定性治理框架（LTS + 安全修复线）。**潜在风险**：功能膨胀导致的稳定性压力（P0/P1 问题数居高不下）、升级路径复杂化已引发下游派生项目（LobsterAI、EasyClaw）的密集兼容性修复需求。

---

## 4. 共同关注的技术方向

以下为多项目同时涌现的需求信号：

| 技术方向 | 涉及项目 | 具体诉求 |
|---------|---------|---------|
| **消息可靠性与持久化** | OpenClaw（#139847 运行中新消息被丢弃、#128971 Telegram 终态歧义丢消息、#132762 overflow retry 成功未送达）；CoPaw（#7579 模型回复从上下文丢失）；NanoBot（#5429

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

## NanoBot 项目动态日报（2026-09-11）

> 数据来源：github.com/HKUDS/nanobot | 覆盖时段：过去24小时


### 1. 今日速览

过去24小时 NanoBot 处于高活跃迭代状态：3条 Issue 更新（2 新开/活跃、1 关闭）、22条 PR 活动（11 待合并、9 已合并/关闭、2 关闭后未合入），无新版本发布。今日合并 PR 横跨 WebUI、Telegram、MCP OAuth、TUI、exec 执行器五大模块，其中 MCP OAuth 自动刷新、Telegram 命令路由修复属于直接影响生产稳定性的关键改动。值得注意的是，当前有 8+ 个 PR 因存在合并冲突被标记 `conflict` 标签，积压问题需维护者关注。

### 2. 版本发布

无新版本发布（最新 Releases 为空）。


### 3. 项目进展

今日共有 **9 个 PR 合并/关闭**，主要集中在以下方向：

**🔐 MCP/Provider 稳定性**
- [#5573 [CLOSED] fix(mcp): refresh expired OAuth tokens automatically](https://github.com/HKUDS/nanobot/pull/5573) — 持久化 OAuth 令牌绝对过期时间与授权服务器元数据，支持在网关重启后自动刷新，并在 401 后主动发现授权服务器进行一次刷新。修复了 MCP 长连接场景下的令牌过期静默失效问题。

**💬 Telegram 频道修复**
- [#5711 [CLOSED] fix(telegram): adapt command spellings within the channel](https://github.com/HKUDS/nanobot/pull/5711) — Telegram 频道内帮助与回复信息中的命令拼写从连字符形式适配为 Telegram 习惯的下划线形式。
- [#5707 [CLOSED] fix(tg): route /compact and /evaluator-prompt to the command router](https://github.com/HKUDS/nanobot/pull/5707) — 修复 `/compact`、`/evaluator-prompt` 在 Telegram 端被静默丢弃的问题，现可正确路由到内置命令处理器。

**🖥️ WebUI 体验优化（3 个连续 PR）**
- [#5722 [CLOSED] feat(webui): refine sidebar hierarchy and selection feedback](https://github.com/HKUDS/nanobot/pull/5722)
- [#5723 [CLOSED] fix(webui): align standalone page widths with conversations](https://github.com/HKUDS/nanobot/pull/5723)
- [#5725 [CLOSED] fix(webui): align chat elements and fix prompt rail grouping](https://github.com/HKUDS/nanobot/pull/5725)

这组改动统一了独立页面的内容宽度（49.5rem）、修正了聊天消息尾部图标与文本边缘的对齐偏移、并以滑动圆角背景替代下划线式选中态，提升了 WebUI 的整体一致性。其中部分改动在关闭后又被新 PR [#5725](https://github.com/HKUDS/nanobot/pull/5725) 再次合并，说明存在反复打磨的情况。

**⚙️ 执行器与 TUI**
- [#5708 [CLOSED] fix(exec): preserve UTF-8 across streaming output chunks](https://github.com/HKUDS/nanobot/pull/5708) — 修复 exec 长任务输出中跨 4096 字节块的 UTF-8 字符被截断成乱码的问题，改用增量解码器并在 EOF 时刷新。
- [#5469 [CLOSED] fix(tui): show measured request context](https://github.com/HKUDS/nanobot/pull/5469) — TUI 底部状态栏改为显示最近一次 provider 实际上报的上下文 token 用量（含缓存命中率），而非累计值。
- [#5710 [CLOSED] feat(webui): organize projects and simplify sidebar navigation](https://github.com/HKUDS/nanobot/pull/5710) — 将项目文件夹与话题历史分离：侧边栏固定为 Topics、Projects、Automations 三个入口，进入项目后展示独立目录视图。

**整体判断**：项目正处于前后端同步增强阶段，WebUI 迭代密度最高（今日 4 个相关 PR），同时 Telegram/MCP 等通道稳定性持续加固。


### 4. 社区热点

| 条目 | 类型 | 评论数 | 热度分析 |
|------|------|--------|----------|
| [#5726 初始密码问题](https://github.com/HKUDS/nanobot/issues/5726) | Issue | 1 | 新用户部署在无头服务器（headless）上，启动后不知道 Web UI 登录密码，被迫通过另一台机器的浏览器访问但无法鉴权。属于典型的首次使用体验阻碍 |
| [#5647 WebUI 会话标题生成修复](https://github.com/HKUDS/nanobot/issues/5647) | Issue（已关闭） | 2 | 关联 PR #5528 修复了 `unifiedSession` 模式下标题投影到错误会话的 bug，今日正式关闭。社区对会话管理细节有较高关注度 |
| [#5429 AgentLoop 后台任务异常丢失](https://github.com/HKUDS/nanobot/issues/5429) | Issue | 1 | 开发者指出 `schedule_background()` 的回调只用 `set.discard` 丢弃任务，从不获取异常，导致后台任务失败无日志。该 Issue 已存在近一个月，今日终于有对应 PR |

**热点诉求**：开发者与使用者共同关注**后台任务的可见性**（Issue #5429）和**部署后的可发现性**（Issue #5726），本质上都指向“系统在处理异常/边缘情况时是否对用户有足够的信号反馈”。


### 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题 | 状态 | Fix PR |
|--------|------|------|--------|
| 高 | **后台任务异常被静默丢弃**（#5429）— AgentLoop 后台任务（会话归档、WebUI 标题生成等）失败时无任何日志，仅剩 asyncio 通用报错 | OPEN | ✅ [#5724](https://github.com/HKUDS/nanobot/pull/5724) 已提交：在 done callback 中调用 `task.result()` 并记录 CRITICAL 日志，同时为 `TaskGroup` 用法兜底 |
| 中 | **Headless 部署下无初始密码提示**（#5726）— 用户不知 `channels.websocket.tokenIssueSecret` 即为登录凭据 | OPEN | ✅ [#5727](https://github.com/HKUDS/nanobot/pull/5727) 文档 PR 已提交，说明密钥存储位置与 LAN 访问指引 |
| 中 | **Discord 压缩通知在 `sendProgress: false` 下仍发送两条独立消息**（#5719） | OPEN | ✅ [#5720](https://github.com/HKUDS/nanobot/pull/5720) 改为就地编辑原始通知，避免刷屏 |
| 低 | **iOS PWA 点击异常** — 首次点击会话行被 Safari 的 `:hover` 链吞掉，状态栏样式也受影响 | OPEN | ✅ [#5641](https://github.com/HKUDS/nanobot/pull/5641) 已提交但带 `conflict` 标签，需解决合并冲突 |
| 低 | **WebUI 搜索开关导致 API 类型被覆盖** — 关闭搜索后未恢复之前选择的 API 类型 | OPEN | ✅ [#5698](https://github.com/HKUDS/nanobot/pull/5698) 已提交，同样带 `conflict` |

**观察**：今日提交的修复 PR 覆盖了全部现存 bug，响应速度良好。但 3 个修复 PR 带有 `conflict` 标签，合并受阻风险值得注意。


### 6. 功能请求与路线图信号

结合 OPEN 状态 PR 与近期 Issue，以下功能具备较高进入下一版本的可能性：

**🎨 WebUI 体验类**
- **[#5602 完成通知声音](https://github.com/HKUDS/nanobot/pull/5602)**（OPEN，closes #5524）— 新增 `notificationSound` 偏好设置，回合完成时播放提示音，默认关闭。解决了用户停留在页面时无任何听觉反馈的痛点，属于低侵入性优化，有望合入。
- **[#5356 跨聊天频道设置流程改进（NAN-112）](https://github.com/HKUDS/nanobot/pull/5356)**（OPEN）— 重新设计频道目录为两列分组布局，将依赖安装与频道激活解耦，防止前端竞态。该 PR 从 8/12 起已 open 近一个月，但仍无 `conflict` 标签，可能在做大范围测试。
- **[#5352 模型提供商删除控制](https://github.com/HKUDS/nanobot/pull/5352)**（OPEN，带 `conflict`）— 增加删除保护：当模型预设或图片生成仍引用该提供商时阻止删除，并有本地化弹窗反馈。

**🗂️ 自动化与数据管理**
- **[#5620 Cron 可配置投递与批量归档](https://github.com/HKUDS/nanobot/pull/5620)**（OPEN，带 `conflict`）— 允许为 cron 任务指定独立结果投递目标、添加归档生命周期状态，同时保留运行历史。适合长时间运行的自动化任务，是明显的规模化管理需求。

**🧠 记忆系统加固**
- **[#5630 Dream 内存文件大小保护](https://github.com/HKUDS/nanobot/pull/5630)**（OPEN，带 `conflict`）— 因 #5622 移除了旧的 `_DREAM_FILE_EMBED_CAP = 8000` 字节上限，SOUL.md/USER.md/MEMORY.md 可无界增长并注入每次请求，需重新引入 guardrail。
- **[#5702 Archive 提示词的工作区

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-11

> 数据来源：github.com/zeroclaw-labs/zeroclaw | 统计窗口：过去 24 小时 | 生成时间：2026-09-11


## 1. 今日速览

过去 24 小时内，Zeroclaw 项目保持高热度的 Issue 讨论与 PR 提交态势，但**合并活动为零**——50 条 PR 更新全部处于待合并状态，没有一条被合并或关闭，合并瓶颈仍然显著。Issue 侧 50 条更新全部为活跃/新开，无关闭，其中多条 P1 级安全 Bug（S0/S1 严重度）仍在持续讨论，包括 delegate 工具绕过父级 allowlist、shell 工具工作区边界绕过等。值得关注的是，多条长期存在的 P1 问题（如 Windows 测试失败 #7462、web_fetch 压缩响应乱码 #9207）已进入 in-progress 状态，并有针对性 PR 在队列中等待合入（如 #8955 Telegram 媒体组批处理、#10337 git 操作 allowed-roots 修复）。社区讨论热点集中在 RFC 流程简化、发布签名机制整合以及跨平台 CI 覆盖。整体来看，**项目提交活跃但合并吞吐受阻**，安全修复与功能 PR 的积压可能成为近期健康度主要风险。


## 3. 项目进展

**合并/关闭：无。** 过去 24 小时没有 PR 被合并或关闭。

**待合并 PR 中的重要推进**（这些 PR 已提交并处于待合并状态，代表了项目当前的技术方向）：

- **#10768 — feat(channels): add Sendblue iMessage/SMS channel**（@danperks，2026-09-10）— 新增原生 Sendblue 通道，为 iMessage 提供非 macOS 主机的接入路径，与现有 AppleScript 桥接的 `imessage` 通道互补。标签含 `size:XL`，是较大的功能 PR。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10768)

- **#10751 — fix(plugins): report a full plugin connection budget as connection-limit-reached, not a denial**（@JordanTheJet，2026-09-10）— 修复 #10506 中 wasi:http 顺序请求在工具插件执行中偶发失败的问题，将「连接预算已满」从「拒绝」改为明确的「达到连接限制」语义。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10751)

- **#10337 — fix(tools): honor allowed roots for git operations**（@vrurg，2026-08-25，`needs-author-action`）— 修复 git 操作 allowed-roots 缺陷（Fixes #10334），将 Git 仓库发现、工作目录和 linked-worktree 元数据绑定到授权根目录。`risk:high`、`size:XL`，等待作者响应。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)

- **#8955 — fix(telegram): batch media group attachments**（@IftekharUddin，2026-07-10）— 对应 #5514，将 Telegram 相册/媒体组在 listener 本地缓冲后合并为一次 agent turn。`size:XL`、`needs-author-action`，已等待两个月。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/8955)

- **#10262 — fix(rpc): close RPC connections on daemon reload and unstick zerocode quickstart**（@IftekharUddin，2026-08-22）— 修复 daemon 热重载后 RPC 连接未关闭的问题，同时解决 zerocode quickstart 卡住的现象。`size:XL`。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10262)

- **#10735 — fix(rpc): heap-pin the largest process_line dispatch branches for Windows stack**（@Project516，2026-09-10）— 针对 Windows 栈溢出问题，将 `RpcDispatcher::process_line` 中最大的 match 分支堆固定，减小异步状态机栈占用。`size:XS`，小而精准的修复。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10735)


## 4. 社区热点

**#7462 — [Bug]: 74 test failures on Windows**（19 条评论）— 今日最热 Issue。Windows 11（简体中文，代码页 936）上运行测试套件产生 74 个失败，根因包括 Unix-only 测试命令、路径语义和控制台编码。CI 仅运行 Linux 因此未能捕获。社区对该问题的讨论热度最高，同时关联 #7461（CI 增加 Windows/macOS 矩阵），反映了**跨平台支持是社区强烈诉求**。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)

**#9101 — Consolidate release attestation mechanisms**（9 条评论）— 讨论 v0.8.3 发布了三种并行的签名/来源验证机制（cosign、GitHub artifact attestations、slsa-github-generator），导致 CI 时间翻倍、发布资产从预期的约 20 个膨胀到 53 个。社区对**发布流程的简化与一致性**表达了明确诉求。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)

**#10549 — RFC: Simplify RFC voting**（8 条评论）— 提议取消强制讨论窗口、让 REVISE 立即停止当前快照，减少 RFC 流程的固定等待时间。反映了贡献者对**流程效率**的持续关注。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)

**#5514 — batch Telegram media groups into one multimodal turn**（8 条评论）— 用户反馈在 Telegram 发送多张图片时，agent 会对每张图片产生一条独立回复，体验割裂。对应的 PR #8955 已存在但处于 `needs-author-action` 状态。这是**真实用户痛点**的典型代表。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)

**#6157 — Nextcloud Talk use correct bot message API**（8 条评论）— 讨论 Nextcloud Talk 通道使用错误的 bot message API 导致消息发送失败，处于 `blocked` 状态，需要上游支持。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)


## 5. Bug 与稳定性

按严重度排列（S0 最高）：

| 严重度 | Issue | 标题 | 状态 | 关联 PR |
|--------|-------|------|------|---------|
| **S0** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | delegate 绕过父级工具 allowlist，子 agent 可调用父级策略排除的工具 | accepted，4 评论 | 无（高危安全漏洞） |
| **S0** | [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) | shell 工具工作区边界绕过（symlink 指向外部可读写） | accepted，2 评论 | 无（高危安全漏洞） |
| S1 | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | 退出 web dashboard 聊天窗口导致 agent 停止工作 | in-progress，5 评论 | 无 |
| S1 | [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) | web_fetch 对压缩响应（gzip/brotli/deflate）返回乱码 | in-progress，5 评论 | 无 |
| S1 | [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) | ACP 失败的 turn 在切换会话后消失 | in-progress，5 评论 | 无 |
| S1 | [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) | 不完整的终端响应可能被报告为成功 | in-progress，4 评论 | PR #10417（待合并） |
| S1 | [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent 任务无墙钟超时，in-flight 锁仅在进程启动时清理 | in-progress，3 评论 | 无 |
| S1 | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | 停止 agent 会从上下文中擦除工具调用和思考过程 | accepted，2 评论 | 无 |
| S2 | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | Windows 上 74 个测试失败（Unix-only 命令、路径语义、控制台编码） | in-progress，19 评论 | 关联 #7461（CI 矩阵扩展） |
| S2 | [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) | 配置 flush 可能覆盖并发写入 | accepted，4 评论 | 无 |

**其他值得关注的 Bug：**
- **#9486**（P1/P2）— 高熵检测器将 Solana 钱包地址替换为 `[REDACTED_HIGH_ENTROPY_TOKEN]`，且 `high_entropy_tokens=false` 在通道路径上不生效。agent 无法在 Telegram 上说出钱包地址，对依赖 Solana MCP 的用户是直接的功能阻断。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)
- **#9393**（P1）— Bluesky 和 Reddit 通道无发送者授权，且没有中央门禁覆盖。安全审计发现的问题，2-4 条评论。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9393)
- **#9390**（P1）— 紧急停止仅是 CLI 侧的状态文件，运行时路径不读取它——意味着紧急停止功能实际上可能不生效。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9390)
- **#9391**（P1）— 命令审计日志默认启用但实际不写入任何内容。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9391)
- **#8519**（P1）— cargo-audit ignores 与 wasmtime-wasi CVE 修复存在 drift，需协调 audit.toml/deny.toml。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)
- **#8642**（P1）— MCP/工具 schema 克隆导致 agent 循环中 RSS 无界增长（从 #5542 拆出）。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)
- **#8800**（P1）— Windows 上被杀死的 zeroclaw 进程残留端口绑定，新 daemon 无法启动。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8800)
- **#9198**（P2/P1）— Discord 输入指示器在 dashboard daemon 重载后卡死。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)

**已有修复 PR 等待合入的 Bug：**
- #5514（Telegram 媒体组）→ PR #8955
- #9421（不完整终端响应）→ PR #10417
- #9332（多模态上下文计量严重低估）→ PR #9713（do-not-merge）


## 6. 功能请求与路线图信号

**较有可能进入下一版本的功能/改进：**

- **跨平台 CI 测试矩阵**（#7461）— 将测试任务扩展到 Windows/macOS。与 #7462（Windows 74 个测试失败）直接关联，当前 CI 仅跑 Linux 导致 Windows 回归长期漏检。社区讨论热度最高，优先级 P2 已 accepted。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7461)

- **发布签名/来源证明机制整合**（#9101）— 从三种并行机制收敛为一种统一的签名方案，目标约 20 个发布资产。P1、size:M、已 accepted。影响发布工程效率与供应链安全。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)

- **RFC 投票流程简化**（#10549）— 取消强制讨论窗口，REVISE 立即停止当前快照。目前处于 `needs-maintainer-review`。若通过将提升 RFC 迭代效率。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)

- **CI Rust 构建缓存改进**（#7108）— 通过更有效的缓存与任务调度缩短 CI 关键路径。已 accepted、P2、risk:high。当前 PR CI 即使小改动也常需 15-20 分钟。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7108)

- **PR 审查证据与新鲜度警告的 RFC**（#10366）— 澄清 PR 审查证据、过期警告与作者操作边界，并新增 expedited merge lane 提案。已 accepted，若落地将影响合入流程。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)

- **新增通道：Sendblue iMessage/SMS**（PR #10768）— 已提交的 XL 级功能 PR，若合入将扩展非 Apple 主机的 iMessage 接入能力。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10768)

- **eval 实时执行模式**（PR #9214）— 带沙箱工具面的 live execution 模式，安全标签 `security:bubblewrap`，`needs-author-action`。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)


## 7. 用户反馈摘要

- **Windows 用户体验受损**：Windows 11 用户无法运行完整测试套件（74 个失败），且被杀死的进程会残留端口占用导致新 daemon 无法启动（#8800），web dashboard 配合 Edge 浏览器时问题更明显。跨平台支持缺口是**最集中的用户痛点**。

- **Telegram 多图体验割裂**：用户发送多张图片时收到 agent 的多条独立回复而非整合的多模态回复，影响实际使用体验（#5514）。对应修复 PR #8955 等待两个月未合入，用户等待时间较长。

- **安全功能存在实际使用障碍**：Solana 钱包地址被高熵检测器错误打码（#9486），使用俄语的用户反馈 agent 无法正确回答「我的钱包是什么」这类基本问题，且关闭配置不生效。安全机制需要更精细的上下文判断。

- **Web dashboard 中断问题引发强烈不满**：多个 issue（#8559、#8794）反馈退出聊天窗口或停止 agent 会丢失上下文——工具调用记录和思考过程从上下文中消失，下次消息完全无法感知之前的工作。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-11

## 1. 今日速览

过去 24 小时项目整体活跃度处于**中低水平**：无新版本发布、无 PR 合并/关闭，7 条待合并 PR 中 5 条为 Dependabot 依赖升级（均已 stale）。Issue 侧有 2 条更新：老 Issue #3265（deltachat 启动报错）被 stale 机制关闭，但贡献者随即提交了修复 PR #3376；QQ 频道不可用问题 #3349 已积压 12 天且无人回复。整体呈"社区提交活跃、维护者合并与响应节奏偏慢"的状态，项目健康度中等，需加快积压处理以维持社区动力。

## 2. 项目进展

过去 24 小时 **0 个 PR 被合并或关闭**，主分支代码无新变更落地。

值得注意的待合并 PR：

- [#3376 fix(deltachat): initialize as custom channel to solve config validation error](https://github.com/sipeed/picoclaw/pull/3376) — 由 @luisgdev 提交，将 deltachat 注册为自定义通道，修复 #3265 中报告的 `channel "deltachat" has unknown type "deltachat"` 配置校验错误。该 PR 直击问题根因，**建议优先 review 合并**。
- [#3371 feat(providers): add opencode-go provider with session header support](https://github.com/sipeed/picoclaw/pull/3371) — 新增 OpenCode Go provider 支持（`https://opencode.ai/zen/go/v1`），按模型 ID 自动路由端点并透传 `x-opencode-session` 会话头，属于新功能扩展。

## 3. 社区热点

- **[#3265 Gateway startup fails with 'channel deltachat has unknown type deltachat'](https://github.com/sipeed/picoclaw/issues/3265)**（6 条评论，👍 1）
  用户 @Cipher208 强调 **config.json 中根本没有配置 deltachat**，Gateway 却报出 deltachat 未知类型错误导致启动失败。该 Issue 存活近两个月（7/19 创建）后被 stale 关闭，但 #3376 修复 PR 的出现表明社区并未放弃。核心诉求指向配置加载逻辑缺陷：**未启用的通道不应触发校验阻挡启动**。

- **[#3349 QQ频道无法正常使用](https://github.com/sipeed/picoclaw/issues/3349)**（4 条评论）
  中文用户 @bxwl5 反馈

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-09-11）

## 今日速览

过去 24 小时 NanoClaw 项目保持中等活跃度：3 条 Issue 更新中有一项 **priority/high** 的容器相关 Bug 仍处于敞开状态；6 条 PR 动态中 3 条已合并/关闭、3 条待处理。合并内容包括两项 agent-runner 核心改进（admission gate 扩展点、SQLite 连接参数顺序修复）以及一项安装验证修复，整体健康度良好，但高优先级容器问题已敞开 14 天，值得关注。

## 项目进展

过去 24 小时共有 3 个 PR 被合并/关闭，其中两项集中在 agent-runner，一项在 setup/verify，具体如下：

- **#3707 feat(agent-runner): 新增 registerAdmissionGate 轮询循环扩展点**（已合并）  
  新增 `container/agent-runner/src/admission-gate.ts`，提供 `registerAdmissionGate`、`evaluateAdmission` 和测试重置入口，并在外层 poll-loop 顶部接入。这为后续准入策略、背压控制、调度质量等能力提供了正式的扩展接口。  
  https://github.com/nanocoai/nanoclaw/pull/3707

- **#3708 fix(agent-runner): 调整 SQLite

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

## IronClaw 项目日报 — 2026-09-11

### 1. 今日速览

项目当日活跃度中等偏高：过去 24 小时内有 1 条 Issue 更新、8 条 PR 动态，其中 2 条 PR 已关闭（1 条功能 PR + 1 条依赖更新）。无新版本发布。值得关注的是，今日关闭的 #8072 为 Telegram 集成了 Bot API 命令菜单注册功能，是近期较重要的用户可见特性；同时一条自动化失败分类报告（#8093）揭示了 DeepSeek-V4-Flash 在 officeqa 基准上的模型质量问题。其余动态以 Dependabot 依赖更新为主（6/8），人工提交的 #8092（IME 修复）与 #8090（MCP 目录键控修复）尚在待合并状态。整体项目健康度良好，功能迭代与稳定性维护并行推进。

---

### 2. 版本发布

今日无新版本发布（Releases 为空）。

---

### 3. 项目进展

今日有 2 条 PR 进入关闭状态（合并或关闭）：

- **[#8072] feat(telegram): register the Bot API command menu at activation**（已合并）  
  https://github.com/nearai/ironclaw/pull/8072  
  为 Telegram 渠道新增 Bot API 命令菜单注册功能：在扩展激活时通过 `setMyCommands` 将频道声明的命令（`/model`、`/status`、`/new`、`/stop`、`/interrupt`）注册到 Telegram 聊天菜单按钮，并在停用时通过 `deleteMyCommands` 尽力清理。此 PR 标记为 size: L、risk: low，经过约 1 周评审后合入，显著提升了 Telegram 端用户的可发现性与交互便捷度。

- **[#8080] [dependencies, rust] chore(deps): bump the everything-else group across 1 directory with 21 updates**（已关闭）  
  https://github.com/nearai/ironclaw/pull/8080  
  批量更新 Rust 依赖 21 个（含 uuid、base64、rust_decimal 等），属于常规依赖维护，保持供应链安全与兼容性。

此外，8 条 PR 中仍有 6 条处于待合并状态，以下两条为功能性修复，值得关注：

- **#8092 fix(webui): preserve IME composition in the chat composer**（待合并）  
  https://github.com/nearai/ironclaw/pull/8092  
  修复 WebUI 聊天编辑器对中文、日文等 IME（输入法）组合输入的处理：避免 Enter 键在组合状态下被误判为发送，并处理了 Safari 在 `isComposing=false` 但 `keyCode=229` 的边界情况。该修复对东亚语言用户至关重要。

- **#8090 fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension**（待合并）  
  https://github.com/nearai/ironclaw/pull/8090  
  修复了托管 MCP 服务器工具列表按扩展 ID 单槽存储导致多用户互相覆盖的问题，改为按调用者分别缓存目录，避免用户 A 与用户 B 的发现结果互相覆盖。这属于多租户场景下的数据隔离修复。

---

### 4. 社区热点

今日社区讨论热度总体较低，但以下条目值得关注：

- **[#8093] Daily ironclaw failure taxonomy — 2026-09-10**（唯一 Issue）  
  https://github.com/nearai/ironclaw/issues/8093  
  这是每日自动生成的失败分类报告，由 @pranavraja99 发布。报告分析 `officeqa` 套件的 42 个非通过任务，结论是"绝大多数为真实模型错误"，并具体指出 DeepSeek-V4-Flash 在导航类任务中表现异常。虽然当前评论和点赞为 0，但此类报告是持续跟踪模型质量、识别基准测试套件有效性（test-suite validity）的重要信号，潜在影响模型选型与后端路由决策。

---

### 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 条目 | 状态 |
|---------|------|------|
| 高 | **#8090**：托管 MCP 目录按扩展 ID 共享，导致用户之间工具列表互相覆盖。参见 PR https://github.com/nearai/ironclaw/pull/8090 | 🔧 已有修复 PR 待合并 |
| 中 | **#8092**：WebUI 聊天编辑器在 IME 组合输入期间 Enter 键被误触发送（尤其影响 Safari + 中文/日文输入法）。参见 PR https://github.com/nearai/ironclaw/pull/8092 | 🔧 已有修复 PR 待合并 |
| 中 | **#8093**：`officeqa` 基准中 42 个非通过任务，判断为 DeepSeek-V4-Flash 真实模型错误（涉及导航类错误）。参见 https://github.com/nearai/ironclaw/issues/8093 | ⚠️ 待跟进（模型侧或基准侧） |

其中 #8093 虽表现为基准失败，但根源可能是模型能力缺陷而非代码 Bug，需要在模型层面调查。另外，若 #8092 的 IME 问题影响范围过大，建议优先 review 和合并。

---

### 6. 功能请求与路线图信号

今日无新功能请求 Issue 提交，但以下 PR 透露出路线图信号：

- **Telegram 命令菜单注册（#8072，已合并）**：此前用户需手动记忆命令，现通过 Bot API 原生菜单展示，属于 Telegram 渠道可用性的补齐，预计未来将围绕多平台命令一致性继续迭代。
- **MCP 多租户隔离（#8090，待合并）**：修复按调用者键控目录的问题，说明项目正在强化 hosted-MCP 对多用户/多凭据的支持，后续可能推进更细粒度的权限模型。
- **IME 输入优化（#8092，待合并）**：反映出项目对非拉丁语系用户体验的关注，下一步可能扩展到更多 Web 编辑器场景（如 markdown 编辑器、搜索栏等）。

以上表明项目短期路线侧重"平台体验完善 + 多租户稳定性"，而非新增大型功能。

---

### 7. 用户反馈摘要

今日 Issue/PR 评论区无用户直接反馈，但可从数据中间接提炼：

- **DeepSeek-V4-Flash 在 officeqa 上表现不佳**（#8093）：42 个非通过任务中绝大多数属于模型真实错误，尤其导航类任务。这提示使用该模型的用户（或其下游应用）在涉及多步导航的 QA 场景中可能频繁失败，需谨慎选型。
- **MCP 目录互相覆盖**（#8090）：在企业/团队共用实例中，不同用户调用同一 hosted-MCP 服务器时工具列表会被后者覆盖，导致实际可用工具不可预期。这反映多用户场景下的配置隔离诉求较强。
- **Telegram 命令可发现性**（#8072）：此前 Telegram 用户需翻阅文档才能找到可用命令，合并该 PR 后新用户上手成本明显下降，属于积极变化。

---

### 8. 待处理积压

当前无长期未响应（超过 7 天无更新）的 Issue 或 PR，但以下 PR 的合并优先级需维护者关注：

- **#8090 fix(mcp)**：创建于 2026-09-08，已 3 天未合并，且影响面较大（多用户数据覆盖），建议尽快 review。
- **#8092 fix(webui)**：创建于 2026-09-10，涉及 IME 关键输入场景，若项目团队有东亚成员或用户，建议优先处理。
- **#8097**（Dependabot 批量更新，24 个 Rust 包）与 **#8094 / #8095 / #8096**（JS 依赖更新）建议设置自动合并或定期批量处理，避免积压导致依赖滞后。

另注意到 **#8072** 从创建到合并花费约一周，对于标记为 "size: L, risk: low" 的 PR 来说偏慢，或可优化 review 流程。

---

**整体评价**：项目保持健康的迭代节奏，合并了有价值的 Telegram 功能，同时有两项关键修复（MCP 隔离、IME）在等待合并。唯一需要警惕的是模型侧质量问题（officeqa 非通过率），建议结合每日 failure taxonomy 报告跟踪趋势，必要时调整默认模型路由策略。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-11

## 今日速览

LobsterAI 过去 24 小时进入**高频修复模式**：共产生 13 条 PR 更新，其中 **10 条已关闭/合并、3 条依赖升级 PR 仍在等待处理**；无新 Issue 上报，也无新版本发布。所有已合入 PR 均围绕 **OpenClaw v2026.8.1 升级后的兼容性与稳定性**展开，集中修复了 Gateway 启动阻塞、配置同步异常、任务历史过滤失效等 8 个缺陷，并引入 2 项耗能优化（内存保存、技能自动审核改为 opt-in）。整体来看，项目正处在一次**上游大版本升级后的密集打磨期**，工程响应速度快、QA 反馈闭环质量高，但升级遗留问题仍较多，建议持续关注后续两天的回归情况。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日共处理 13 条 PR，其中 10 条已关闭/合并。项目主要完成了 **OpenClaw v2026.8.1 集成后的系统性修复**，覆盖启动、迁移、配置同步、任务系统与协同功能五大方向。

### 🔧 核心稳定性推进（9 条修复）

| PR | 方向 | 解决的问题 |
|---|---|---|
| [#2649](https://github.com/netease-youdao/LobsterAI/pull/2649) | 构建/文档/主程序/OpenClaw | 修复 Gateway 在旧会话和工作区迁移完成后仍因设备身份未迁移而退出 |
| [#2647](https://github.com/netease-youdao/LobsterAI/pull/2647) | 文档/主程序/OpenClaw | 在启动前隔离损坏的 workspace attestation，避免 NUL 字节文件阻塞所有 Gateway 启动 |
| [#2642](https://github.com/netease-youdao/LobsterAI/pull/2642) | 主程序/OpenClaw | 修复旧会话存在重复 session header 时归档被阻断、Gateway 无法启动的问题 |
| [#2648](https://github.com/netease-youdao/LobsterAI/pull/2648) | 主程序/OpenClaw | 消除 IM 开关编辑时的重复重启，MCP 配置改为热重载 |
| [#2644](https://github.com/netease-youdao/LobsterAI/pull/2644) | 文档/主程序/OpenClaw | 避免配置同步时因探针短暂超时而误显示引擎启动页 |
| [#2646](https://github.com/netease-youdao/LobsterAI/pull/2646) | 渲染器 | 定时任务历史日期过滤改为本地执行，规避上游不支持 `startMs`/`endMs` 参数的问题 |
| [#2645](https://github.com/netease-youdao/LobsterAI/pull/2645) | 渲染器/协同 | 修复 Windows 上引擎故障弹层折叠后状态 pill 遮挡按钮导致无法点击恢复的问题 |
| [#2640](https://github.com/netease-youdao/LobsterAI/pull/2640) | 文档/主程序/OpenClaw | 将模型选择限制在会话内，防止会话切换意外写回全局默认模型 |
| [#2641](https://github.com/netease-youdao/LobsterAI/pull/2641) | 渲染器/主程序/OpenClaw/协同 | 将自动技能审核改为 opt-in，避免长任务后产生额外模型消耗 |

### ✨ 新功能（1 条）

| PR | 方向 | 新增能力 |
|---|---|---|
| [#2643](https://github.com/netease-youdao/LobsterAI/pull/2643) | 渲染器/主程序/OpenClaw/协同 | 新增「启用压缩前记忆保存」开关（默认关闭），用户可自主决定是否接受该功能的额外 token 消耗 |

### 📦 依赖升级（3 条，仍开启）

- [#2459](https://github.com/netease-youdao/LobsterAI/pull/2459) — @nodesecure/js-x-ray 14.3.0 → 16.0.0
- [#2461](https://github.com/netease-youdao/LobsterAI/pull/2461) — eslint-plugin-react-hooks 5.2.0 → 7.1.1
- [#2464](https://github.com/netease-youdao/LobsterAI/pull/2464) — react-dom 18.3.1 → 19.2.8

**项目进展总结**：以上游 OpenClaw v2026.8.1 为目标，项目完成了**从“能启动”到“稳定运行”**的关键跨越——解决了 4 类启动阻塞、2 类重启异常、1 类配置回退问题，同时在新版本中引入了 2 个成本控制开关。整体进度良好，升级后的**核心链路已趋于稳定**。

---

## 社区热点

今日无 Issues 活跃，讨论热度集中在 PR 的迭代与评审上。以下两条 PR 值得关注：

### 1. [PR #2643 — feat(openclaw): add opt-in memory flush setting](https://github.com/netease-youdao/LobsterAI/pull/2643)

该 PR 是今日唯一的新功能，讨论核心在于**如何在功能完整性与用户成本之间取平衡**。OpenClaw 的压缩前记忆保存会额外调用模型产生 token 消耗，项目选择将其设为**默认关闭**的开关，并配以中英双语说明。参考了 #2641 的设置交互方式，体现了项目对**用户可控性**的重视。

### 2. [PR #2641 — fix(openclaw): make automatic skill review opt-in](https://github.com/netease-youdao/LobsterAI/pull/2641)

与 #2643 同出一辙，将 OpenClaw v2026.8.1 默认开启的 Skill Workshop 自动审核改为**用户手动开启**。评审关注点在于：升级后默认行为改变带来的**隐性成本增加**，这可能也是社区用户在升级后最直接的痛点。

---

## Bug 与稳定性

今日共修复 8 个 bug，全部已有对应的 fix PR 并已合并。按严重程度排列如下：

### 🔴 严重（阻断启动）

| 严重度 | 问题描述 | 触发场景 | Fix PR |
|---|---|---|---|
| 严重 | 旧会话/工作区迁移完成后，Gateway 因设备身份仍为 JSON 而退出 | 执行 `memory index --force` 后重启 | [#2649](https://github.com/netease-youdao/LobsterAI/pull/2649) |
| 严重 | 空或全 NUL 的 workspace attestation（如 59 字节 NUL 文件）导致 Gateway 每次启动即失败 | 从旧版本升级至 OpenClaw v2026.8.1 的 Windows 用户 | [#2647](https://github.com/netease-youdao/LobsterAI/pull/2647) |
| 严重 | 旧会话含重复 session header 时，SQLite 与档案校验数据不一致，阻塞归档进而阻断启动 | 携带重复 header 的旧 transcript 升级 | [#2642](https://github.com/netease-youdao/LobsterAI/pull/2642) |

### 🟡 中等（功能异常）

| 严重度 | 问题描述 | 触发场景 | Fix PR |
|---|---|---|---|
| 中等 | 编辑 IM 开关时 Gateway 重复重启两次；安装 MCP 时也可能多次重启 | Agent 编辑 IM 开关 / 安装 MCP 配置 | [#2648](https://github.com/netease-youdao/LobsterAI/pull/2648) |
| 中等 | 配置同步期间就绪探针短暂超时，导致已运行的 Gateway 误显示引擎启动页 | 普通配置同步 | [#2644](https://github.com/netease-youdao/LobsterAI/pull/2644) |
| 中等 | 定时任务历史选择日期后接口报错（`cron.runs` 拒绝 `startMs`/`endMs`） | 在任务历史中筛选日期 | [#2646](https://github.com/netease-youdao/LobsterAI/pull/2646) |

### 🟢 轻微（UI/交互）

| 严重度 | 问题描述 | 触发场景 | Fix PR |
|---|---|---|---|
| 轻微 | Windows 上折叠引擎启动失败弹层后，状态 pill 遮挡拖拽区域，恢复/修复按钮无法点击 | Windows 引擎启动失败后折叠弹层 | [#2645](https://github.com/netease-youdao/LobsterAI/pull/2645) |
| 轻微 | 会话内切换模型会意外写入 agent/共享默认配置 | 已有会话内切换模型 | [#2640](https://github.com/netease-youdao/LobsterAI/pull/2640) |

---

## 功能请求与路线图信号

今日无新的功能请求 Issue，但从已合并 PR 中可以捕捉到两条明确的**路线图信号**：

1. **成本可感知与可控**（[#2643](https://github.com/netease-youdao/LobsterAI/pull/2643)、[#2641](https://github.com/netease-youdao/LobsterAI/pull/2641)）：连续两个 PR 将“可能产生额外模型消耗”的功能改为 opt-in，并补充了中英文成本说明。这暗示项目正在**强化 token 成本透明度**，后续新功能大概率会附带成本评估。

2. **配置同步的精细化**（[#2644](https://github.com/netease-youdao/LobsterAI/pull/2644)、[#2640](https://github.com/netease-youdao/LobsterAI/pull/2640)）：针对配置在 LobsterAI 与上游 OpenClaw 之间的双向同步问题，项目正在建立**更细粒度的作用域控制**（如 session-scoped 模型选择、迁移完成后停止默认补写）。预计下一版本会包含更完善的配置迁移与作用域隔离机制。

---

## 用户反馈摘要

由于今日无新增 Issue，以下反馈提取自已合并 PR 的 QA/评审描述：

- **“Agent 编辑 IM 开关时 gateway 重启两次，安装 MCP 时有时也出现多次重启”**（来自 [#2648](https://github.com/netease-youdao/LobsterAI/pull/2648)）— 用户对**不必要的重启**较为敏感，影响使用连续性。
- **“已经运行的 Gateway 因短暂探针超时反复显示引擎启动页”**（来自 [#2644](https://github.com/netease-youdao/LobsterAI/pull/2644)）— 配置同步过程中用户会被**误导性界面打断**，易造成“引擎崩溃”的误解。
- **“在 Windows 上折叠引擎失败弹层后按钮无法点击”**（来自 [#2645](https://github.com/netease-youdao/LobsterAI/pull/2645)）— Windows 桌面端**窗口交互细节**的 bug 会影响恢复操作路径。
- **“长对话压缩前记忆保存会额外调用模型，产生较多 token 消耗”**（来自 [#2643](https://github.com/netease-youdao/LobsterAI/pull/2643)）— 用户对**模型调用的额外成本**有明确顾虑，需要显式开关。

整体来看，用户的核心诉求集中在**升级后的稳定性**与**运行成本可控性**两个方面。

---

## 待处理积压

当前有 **3 条长期未合并的依赖升级 PR**，均已存在约一个月且未收到更新：

| PR | 依赖升级 | 创建时间 | 关注点 |
|---|---|---|---|
| [#2459](https://github.com/netease-youdao/LobsterAI/pull/2459) | @nodesecure/js-x-ray 14.3.0 → 16.0.0 | 2026-08-10 | 跨大版本升级（14→16），需关注 API 破坏 |
| [#2461](https://github.com/netease-youdao/LobsterAI/pull/2461) | eslint-plugin-react-hooks 5.2.0 → 7.1.1 | 2026-08-10 | 跨大版本（5→7），可能有新规则与 breaking changes |
| [#2464](https://github.com/netease-youdao/LobsterAI/pull/2464) | react-dom 18.3.1 → 19.2.8 | 2026-08-10 | React 18 → 19 核心升级，影响面大 |

这三条 PR 均出自 Dependabot，目前处于 **stale 状态**。React 19 与 React Hooks 新大版本升级涉及面广，建议维护者评估安排一个**独立的依赖升级批次**，在 OpenClaw 集成稳定后进行专项验证与合并。

---

*本日报数据截至 2026-09-11，基于 GitHub Issues/PR 元数据自动生成。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 · 2026-09-11

## 1. 今日速览
过去24小时内 Moltis 共关闭 2 个历史遗留 Bug 并关闭/合并 3 个 PR，其中两个修复 PR（#1252、#1260）直接治愈了 Docker 部署数据文件缺失和 exec 工具错误提示两大问题；与此同时有 4 个 PR 仍处于待合并状态，包括 AGY 流式集成、推理强度 max 档位和 cron 时间窗口修复等实质性功能/修复。依赖更新 PR 持续批量涌入，项目维护节奏健康。整体活跃度中上，正处于一个「修复积压 + 功能推进」并存、无新版本释放的稳定迭代窗口。

## 3. 项目进展
今日合并/关闭的 PR 主要覆盖部署可靠性、执行工具错误诊断和依赖安全维护三个维度：

- **Docker 部署修复落地**（[#1252](https://github.com/moltis-org/moltis/pull/1252)）：doc PR 弥补了 bind-mount 场景下权限引起的数据库初始化 panic 说明，解决了新用户首次 `docker compose up` 即崩溃的问题。该 PR 直接对应关闭的 Issue #293，补上了部署文档最后一块缺口，降低了新用户的上手门槛。
- **exec 工具错误报告质量提升**（[#1260](https://github.com/moltis-org/moltis/pull/1260)）：重构了 `NotFound` 错误分类逻辑，不再将「shell 缺失」误报为「工作目录不存在」。这是对工具可诊断性的直接改进，减少用户排查故障时的误导方向。
- **前端依赖安全更新**（[#1256](https://github.com/moltis-org/moltis/pull/1256)）：browserslist 由 4.28.2 升至 4.28.8，属于常规安全/维护性更新，说明项目在持续跟上生态依赖演进。

以上三项合计，项目今日在「新用户部署体验」「已有用户排障效率」「前端供应链安全」三个方向均向前推进了一个小台阶。

## 4. 社区热点
今日无高评论、高反应度的争议性讨论，但有一个 PR 值得关注：

- **cron active_hours 解析缺陷修复**（[#1262](https://github.com/moltis-org/moltis/pull/1262)）：这个待合并 PR 很有代表性——文档默认配置 `end = "24:00"` 会触发 chrono 解析失败，进而导致系统以 fail-open 模式将所有时段视为活跃，cron 调度等于形同虚设。该问题影响所有使用默认配置的 cron 用户，是典型的「配置文档很好、实际跑起来静默失效」的隐性 Bug，值得社区用户去验证和催更。

此外，两个功能型 PR（#1258、#1253）分别支持 AGY 流式接入和 max 推理档位，虽然没有形成帖内讨论，但在外部 agent 集成与推理控制路径上属于明显的生态扩展信号。

## 5. Bug 与稳定性
今日无新报告 Bug，关闭的 2 个均为积压 Bug，按影响程度排序：

| 严重程度 | Issue | 问题摘要 | 状态 |
|---------|-------|---------|------|
| 中高 | [#293](https://github.com/moltis-org/moltis/issues/293) | 全新 Docker Compose 部署因 bind-mount 权限/目录初始化问题导致无 db 文件，gateway 启动 panic | 已关闭，修复 PR [#1252](https://github.com/moltis-org/moltis/pull/1252) 同步文档 |
| 中低 | [#279](https://github.com/moltis-org/moltis/issues/279) | `sh` 不在 PATH 时 exec 工具误报「working directory does not exist」，实际为 shell 缺失 | 已关闭，修复 PR [#1260](https://github.com/moltis-org/moltis/pull/1260) |

两个 Bug 均为主线缺陷，今日全部关闭，无新增回归。比较值得注意的是 #293 从 3 月创建到 9 月修复，积压了约半年，反映出 Dokumentation 类修复容易被边缘化的现实；#279 的误导性错误信息也可能曾在某些环境下导致用户误删/误改目录配置，修复及时价值较高。

## 6. 功能请求与路线图信号
今日没有新的功能请求 Issue，但从待合并 PR 中能看到两个清晰的路线图信号：

- **外部 agent 集成加深**（[#1258](https://github.com/moltis-org/moltis/pull/1258)）：为官方 `agy` CLI 提供一等公民的流式传输支持，复用其 OAuth 会话，同时把 AGY 的 `stream-json` 输出翻译为 Moltis 的标准消息体系。该 PR 若合并，意味着 Moltis 对外部 agent 的接入策略从「协议适配」走向「会话级互通」，生态开放度明显扩大。
- **推理强度档位扩展**（[#1253](https://github.com/moltis-org/moltis/pull/1253)）：新增 `max` 推理等级，并在 Schema、解析、UI 选择器和后端 clamp 逻辑全链路打通。从用户视角看，这回应了「最强推理」场景下现有档位不够用的需求，预计会在下一个 minor 版本中随 UI 更新一并发布。

## 7. 用户反馈摘要
从已关闭 Issue 中可以直接提炼出两个真实用户痛点：

- **新用户部署门槛仍偏高**（[#293](https://github.com/moltis-org/moltis/issues/293)）：用户 `@temobard` 在全新环境使用官方 Docker Compose 流程时直接 panic，说明部署环节「照文档走不通」是对新用户最大的挫败点。该反馈推动了 PR #1252 的文档补充，但未来是否应在启动时输出更友好的错误提示、避免 panic 级别退出，仍值得维护团队考虑。
- **误报指示比不报更伤排查效率**（[#279](https://github.com/moltis-org/moltis/issues/279)）：用户 `@elsbrock` 明确指出了错误信息指向的「working directory」根本不存在问题，实际是 `sh` 缺失。这种误导性报错会让用户在容器镜像、挂载配置上反复浪费时间，用户对诊断信息准确性的要求可见一斑。#1260 通过区分 spawn 错误类型来解决，方向是完全正确的。

## 8. 待处理积压
在开放 PR 中，以下几个值得维护者优先处理：

- **[#1253] feat(reasoning): add max effort level**（[链接](https://github.com/moltis-org/moltis/pull/1253)）：创建于 2026-09-02，已开放 9 天，是功能型 PR 中等待最久的一个。全链路改动，涉及 Schema/后端/UI，reviewer 工作量较大，但该功能对用户感知明显，建议加速 review，避免下个版本窗口错过。
- **[#1258] feat(external-agents): add direct AGY streaming**（[链接](https://github.com/moltis-org/moltis/pull/1258)）：创建于 2026-09-04，已开放 7 天。涉及外部 agent 协议转换，代码面较广，若项目计划在 9 月下旬发布版本，应尽快组织 review。
- **[#1262] fix(cron): treat active_hours end="24:00" as end-of-day**（[链接](https://github.com/moltis-org/moltis/pull/1262)）：创建于 2026-09-07，已开放 4 天。该修复影响默认配置的 cron 用户，属于「配置合法但静默失效」的缺陷修复，建议优先合入，并及时发布 patch。

整体来看，项目当前积压以「已提交待 review」为主，无长期僵尸 Issue；依赖更新类 PR（如 #1263、#1256）已形成自动化流程，不会成为维护负担。项目健康度整体良好，下一阶段重点应放在消化 4 个待合并 PR 上。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-11

> 数据来源：CoPaw 项目仓库（实际仓库：github.com/agentscope-ai/QwenPaw）  
> 统计周期：过去 24 小时（2026-09-10 ~ 2026-09-11）

---

## 1. 今日速览

过去 24 小时项目维持高热迭代节奏：26 条 Issue 更新（新开/活跃 19 条，关闭 7 条），38 条 PR 更新（待合并 27 条，已合并/关闭 11 条），并发布 1 个新 Beta 版本。社区讨论热度集中在 QwenPaw Hub 多租户版（#7318，24 条评论），同时浮现多项值得警惕的信号：Windows 安全沙箱被突破（#7672）、Telegram 轮询在代理黑洞下静默死亡（#7662）、`subagent_model` 配置完全失效（#7676）等。整体看项目处于功能迭代高峰期，但稳定性/安全类反馈占比上升，需关注修复节奏与社区信任度。

---

## 2. 版本发布

### v2.2.1-beta.2（2026-09-10）

**更新内容（据 Release Notes）**

- feat(console): 改进移动端 agent 选择器（@zhaozhuang521，PR #7623）
- chore: 版本号提升至 2.2.1b2（@cuiyuebing，PR #7643）
- fix(console): 对齐 qwenpaw CSS 选择器（@zhaozhuang521，内容截断）

**影响评估**：本次为 Patch 级 Beta 迭代，聚焦 Console 前端体验与选择器细节修正，未涉及后端架构变更。

**破坏性变更 / 迁移注意**：Release Notes 未提及破坏性变更或迁移步骤。但注意 #7642（Chrome 流式渲染空白）报告指出 2.2.0 的 console assets 构建日期为 2026-09-04，建议 2.2.0 用户关注此版本是否包含相关修复。

🔗 发布页面：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2

---

## 3. 项目进展

过去 24 小时共 11 条 PR 被合并/关闭（完整合并列表未在今日 Top 20 中完全展示，以下为可见条目）：

- **fix(memory): fall back when plugin backend is unavailable**（#7663，已关闭）— Agent 配置的 memory 后端插件未注册时，回退到内置 ReMeLight 后端而非启动失败，且磁盘配置保持不变。这修复了插件环境迁移/依赖缺失场景下的启动稳定性问题。由 @jinliyl 提交。  
  🔗 https://github.com/agentscope-ai/QwenPaw/pull/7663

- **feat(commands): add session management slash commands (/sessions, /session)**（#6978，已关闭）— 为 IM 渠道（Matrix、QQ、Telegram 等）和 HTTP 调用者补上会话管理能力：列出、切换、创建/删除会话，此前仅 Console 侧边栏和 TUI `/resume` 可用。来自首位贡献者 @LUOSENGWA。  
  🔗 https://github.com/agentscope-ai/QwenPaw/pull/6978

**趋势判断**：会话管理（HA 侧）/ 记忆回退 / 多端一致性是当前主攻方向。结合 v2.2.1-beta.2 发布，说明 `main` 分支的修复已开始向 Beta 通道流转。但 11 条合并/关闭中仅 2 条在可见列表中，其余合并内容需待完整 Release Notes 确认。

---

## 4. 社区热点

### 最热 Issue 讨论

1. **[Discussion] QwenPaw Hub 多租户版即将推出：你希望我们接下来做什么？**（#7318）— 24 条评论 / 4 👍，创建于 08-26，至今仍活跃。社区连续追问多用户访问、管理员管理技能（关联 #2324），团队化部署需求是当前最强呼声。  
   🔗 https://github.com/agentscope-ai/QwenPaw/issues/7318

2. **[Bug] 模型回复意外从上下文丢失（"模型看不到自己刚说的话"）**（#7579）— 10 条评论。该 Bug 影响 2.2.0 正式版用户，症状可复现且影响信任感，评论区互动密集。  
   🔗 https://github.com/agentscope-ai/QwenPaw/issues/7579

3. **[Feature] platform.agentscope.io/deploy 首页优化**（#7177）— 9 条评论，移动端操作痛点（入口位置、误触停止）引发共鸣。  
   🔗 https://github.com/agentscope-ai/QwenPaw/issues/7177

### PR 侧

今日 Top 20 PR 均无评论热度数据，无法横向比较 PR 讨论度。但以下 PR 关联最热 Issue，值得关注：#7680（subagent model 诊断，关联 #7676）、#7655（FTS 损坏修复，关联 #7596）、#7673（Release Notes 补全）。

---

## 5. Bug 与稳定性

按严重程度排列：

### 🔴 严重（安全/数据丢失）

- **[安全沙箱被突破] Research on QwenPaw2 security sandbox in windows 1/4**（#7672）— 2.2.0 在 Windows 上安全沙箱被第三方研究文章指出可被突破，附知乎外链。无对应 fix PR，建议维护者优先评估。  
  🔗 https://github.com/agentscope-ai/QwenPaw/issues/7672

- **[模型"失忆"] 助手回复已持久化但在后续请求中缺失**（#7579，Open）— 2.2.0 Desktop 用户复现"空响应"症状，模型看不到自己刚生成的内容。暂无直接 fix PR，10 条评论讨论激烈。  
  🔗 https://github.com/agentscope-ai/QwenPaw/issues/7579

### 🟠 高（功能阻塞）

- **[飞书会话静默卡死] queue consumer 长驻不返回**（#7534，Open）— 高优先级卡片消息后 consumer 卡死，同一 session 新消息无法新建消费者。无 Traceback 且无法自愈。  
  🔗 https://github.com/agentscope-ai/QwenPaw/issues/7534

- **[subagent_model 配置完全无效] spawned subagents 总是继承父 agent 的 active_model**（#7676，Open）— 2.2.1-beta.1/2 均复现。已有 #7680（PR）添加回归测试与配置加载失败诊断日志，尚不能确认完全修复。  
  🔗 Issue:

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报（2026-09-11）

## 1. 今日速览

过去 24 小时 ZeptoClaw 项目处于**安全加固 + 积压清理**双主线状态：3 个长期未决的安全相关 Issue 今日集中关闭，配套的 Panel WebSocket 认证修复 PR（#674）已合入；同时新增 1 个 CI 权限配置问题（P2-high），对应修复 PR（#677）处于待合并状态。此外，18 个 Dependabot 依赖更新 PR 批量合入，涵盖 Rust 生态、Docker 镜像、GitHub Actions 与前端依赖，显示维护者正在集中处理技术债。整体活跃度评估为**中高**，修复效率与合并节奏均明显加快，项目健康度良好。

## 2. 版本发布

今日无新版本 Release。

## 3. 项目进展

**重点合入：Panel WebSocket 认证安全修复（#674）**  
[PR #674](https://github.com/qhkm/zeptoclaw/pull/674)（`fix(panel): replace websocket bearer URLs with tickets`）已关闭，摘要确认面板 WebSocket 连接不再将长期有效的 API token 或 JWT 放入 `?auth=` 查询参数，改为通过受 CSRF 保护的端点获取 30 秒一次性 ticket，并在 WebSocket 升级时消费。该修复消除了 token 泄露至访问日志、浏览器历史、中间遥测等途径的风险，是今日安全加固的核心落地。

**待合并：CI 审计任务权限修复（#677）**  
[PR #677](https://github.com/qhkm/zeptoclaw/pull/677)（`fix(ci): allow rustsec audit check reporting`，Open）为 `rustsec/audit-check` 授予 `checks: write` 权限，使安全审计结果能够正常发布为 check run。当前 main 分支审计无漏洞，但此前因权限不足导致报告失败。该 PR 为唯一的待合并 PR，风险低。

**依赖批量合入（18 个 PR）**  
今日集中合入了大量由 Dependabot 提交的依赖更新，值得注意的是其中多数 PR 创建于 6 月初，积压约 3 个月后于今日统一关闭，主要包括：

- **Rust 生态**：`rpassword` 7.4.0→7.5.4（[#625](https://github.com/qhkm/zeptoclaw/pull/625)）、`tower-http` 0.6.10→0.6.11（[#617](https://github.com/qhkm/zeptoclaw/pull/617)）、`scraper` 0.26.0→0.27.0（[#620](https://github.com/qhkm/zeptoclaw/pull/620)）、`tokio` 1.52.1→1.52.3（[#623](https://github.com/qhkm/zeptoclaw/pull/623)）、`serde_json` 1.0.149→1.0.150（[#627](https://github.com/qhkm/zeptoclaw/pull/627)）
- **Docker**：`rust` 1.95→1.98-slim-trixie（[#658](https://github.com/qhkm/zeptoclaw/pull/658)）、`debian` trixie-slim 基线更新（[#630](https://github.com/qhkm/zeptoclaw/pull/630)）
- **GitHub Actions**：`docker/metadata-action` 6.0.0→6.1.0（[#618](https://github.com/qhkm/zeptoclaw/pull/618)）、`docker/build-push-action` 7.1.0→7.2.0（[#622](https://github.com/qhkm/zeptoclaw/pull/622)）、`codecov/codecov-action` 6.0.0→6.0.1（[#624](https://github.com/qhkm/zeptoclaw/pull/624)）、`taiki-e/install-action` 2.78.2→2.79.7（[#626](https://github.com/qhkm/zeptoclaw/pull/626)）、`docker/login-action` 4.1.0→4.2.0（[#628](https://github.com/qhkm/zeptoclaw/pull/628)）
- **前端 / 文档**：`astro` 6.3.x→6.3.7（[#615](https://github.com/qhkm/zeptoclaw/pull/615)、[#614](https://github.com/qhkm/zeptoclaw/pull/614)）、`react` + `@types/react` 19.2.4→19.2.6（[#616](https://github.com/qhkm/zeptoclaw/pull/616)）、`tailwindcss` 4.2.2→4.3.0（[#619](https://github.com/qhkm/zeptoclaw/pull/619)）、`@types/node` 25.3.5→25.9.1（[#621](https://github.com/qhkm/zeptoclaw/pull/621)）

依赖栈整体保持在新版本水平，体系运行环境风险下降。

## 4. 社区热点

今日较活跃的讨论集中在**安全相关的 Issue 批量关闭**与**新的 CI 权限问题**上：

- **[#653](https://github.com/qhkm/zeptoclaw/issues/653)、[#655](https://github.com/qhkm/zeptoclaw/issues/655)、[#656](https://github.com/qhkm/zeptoclaw/issues/656)（均 Closed，作者 @morler）**：这三个 Issue 都由同一社区用户提交，均指向 Panel 的 token 处理安全问题——WS 认证 token 放查询参数、非恒定时间字符串

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报（2026-09-11）

## 1. 今日速览

- 过去 24 小时无新增/关闭 Issue，无新增/合并 PR，社区互动量为 0。
- 连续发布 4 个新版本（v1.9.11 ~ v1.9.14），修复了多项稳定性问题并优化安装包体积。
- 项目整体处于高频迭代阶段，开发侧活跃，但外部贡献者互动较低。
- 现有版本修复集中在「会话恢复」「启动稳定性」「依赖瘦身」，对桌面端用户体验有明显正向提升。
- 项目健康度良好，发布节奏稳定，后续需关注社区反馈是否跟上。

## 2. 版本发布

### [v1.9.14](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.14) — TK Copilot v1.9.14
**主要内容：**
- 修复飞书中断会话在客户端启动后仍被阻塞，只有表情回应却没有回复的问题。
- 启动时恢复中断会话状态，同时保留聊天历史与模型选择。

**破坏性变更：** 无  
**迁移注意事项：** 无需手动操作，升级后自动恢复会话。

### [v1.9.13](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.13) — TK Copilot v1.9.13
**主要内容：**
- 移除仅开发时需要的文件及其他平台的 SQLite 二进制，显著缩小安装包体积。
- 对相同内置依赖去重，同时保留插件加载与已有会话启动能力。

**破坏性变更：** 无  
**迁移注意事项：** 由于依赖去重，建议升级后验证插件加载是否正常。

### [v1.9.12](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.12) — TK Copilot v1.9.12
**主要内容：**
- 将 vendor SQLite 状态迁移隔离到 Node 子进程中执行，提升桌面端启动稳定性。
- 加强 Windows 和 Intel Mac 打包验证，确保 signed release 携带运行时依赖。

**破坏性变更：** 无  
**迁移注意事项：** 若此前在 Windows 上遇到启动依赖缺失，本次已加强验证，建议重新安装/升级。

### [v1.9.11](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.11) — TK Copilot v1.9.11
**主要内容：**
- 升级 OpenClaw 至 v2026.9.3。
- 允许正常 Gateway 重启完成，不再因过早触发频道保护而中断。
- 发送聊天请求前等待 Gateway 认证，改进启动诊断，修复 Windows 构建依赖加载。

**破坏性变更：** 无  
**迁移注意事项：** OpenClaw 升级为底层组件升级，建议关注与已有插件/扩展的兼容性。

## 3. 项目进展

- 今日无合并/关闭的 PR 记录，也无新增 PR。
- 但 4 个连续版本发布表明已完成多项功能开发与问题修复，并已进入稳定发布流。
- 项目在「会话恢复」、「启动稳定性」和「安装包体积控制」上向前推进了关键一步，尤其 v1.9.14 解决了飞书场景下的实际阻塞问题。

## 4. 社区热点

- 今日无活跃讨论的 Issue 或 PR，因此无热点内容。
- 相关列表可查看：[Issues](https://github.com/gaoyangz77/easyclaw/issues) / [Pull Requests](https://github.com/gaoyangz77/easyclaw/pulls)

## 5. Bug 与稳定性

今日无新报告 Bug。从版本发布中可见近期修复的稳定性问题，按严重程度排列：

1. **严重（功能性阻塞）**：飞书中断会话在客户端启动后仍被阻塞，导致只有表情回应但没有实际回复。  
   - 修复版本：v1.9.14
2. **中（启动可靠性）**：桌面端启动时 vendor SQLite 状态迁移可能阻塞或失败，导致启动不稳定。  
   - 修复版本：v1.9.12
3. **中（平台兼容）**：Windows 构建依赖加载异常，影响发布包可用性。  
   - 修复版本：v1.9.11
4. **低（安装体验）**：安装包体积过大，包含开发文件与多余 SQLite 二进制。  
   - 优化版本：v1.9.13

所有上述问题均已有对应的修复版本，无需额外跟进。

## 6. 功能请求与路线图信号

- 今日无用户提出的新功能请求。
- 从版本发布看，项目当前路线图信号集中在：
  - **会话状态恢复与持久化**（v1.9.14）
  - **桌面端启动稳定性**（v1.9.12）
  - **安装包瘦身与依赖去重**（v1.9.13）
  - **底层 OpenClaw 升级与认证安全**（v1.9.11）

这些方向预计将在后续版本中继续深化，尤其是跨平台兼容性和会话恢复的可靠性。

## 7. 用户反馈摘要

- 因今日无新增或活跃的 Issue 评论，暂无用户反馈数据可提取。
- 欢迎用户通过 [GitHub Issues](https://github.com/gaoyangz77/easyclaw/issues) 反馈使用体验与问题。

## 8. 待处理积压

- 当前无长期未响应的 Issue 或 PR。
- 项目维护者对问题响应和版本发布均保持较高效率，无明显积压风险。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*