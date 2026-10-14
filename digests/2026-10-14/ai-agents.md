# OpenClaw 生态日报 2026-10-14

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-14 02:34 UTC

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

# OpenClaw 项目动态日报 — 2026-10-14

## 1. 今日速览

OpenClaw 项目今日保持高活跃度：过去 24 小时共产生 500 条 Issue 更新（新开/活跃 280 条，关闭 220 条）及 500 条 PR 更新（待合并 340 条，已合并/关闭 160 条），并发布 2 个新版本（v2026.10.5-beta.3 与 v2026.10.3）。值得关注的是，SQLite WAL 无限增长、Gateway 启动耗时膨胀、消息丢失/回复丢失等稳定性问题持续占据 Issue 热榜，其中 v2026.10.5-beta.3 明确包含“Updates leave the Gateway running”等升级流程修复，体现维护团队正集中攻坚升级与数据可靠性方向。整体来看，项目迭代频繁、社区反馈热烈，但多个 P0/UX-release-blocker 级 Bug 仍未关闭，发布健康度需持续盯防。

## 2. 版本发布

### v2026.10.5-beta.3
- **核心改进**：升级过程不再中断 Gateway 运行（pnpm 12 安装路径优化）；Windows 更新接受合格的计划任务账户及驱动校验；macOS 接受受保护的 Bun service 证书。
- **破坏性变更**：暂无明确标注。
- **迁移注意**：建议 Beta 用户关注升级过程中 Gateway 服务是否持续在线，若使用 Windows 计划任务或 macOS 受保护服务，需确认账户与证书配置满足新校验条件。

### v2026.10.3
- **规模**：90 commits · 79 PRs · 99 contributors。
- **内容**：与 v2026.10.5-beta.3 存在功能重叠，完整 Release Notes 可在 docs.openclaw.ai 查看。未特别标注破坏性变更。

## 3. 项目进展

今日合并/关闭的 PR 总量不多（160 条），主要有：

- **fix(cloud): refresh environments after plugin activation and keep repository labels stable（#171176，已关闭）** — 修复浏览器在 worker-plugin 激活前连接导致的环境快照为空、Machines 区域不显示的问题，提升云端环境状态同步及时性。
- **fix(test): unblock CI for gateway shutdown tests（#171503，已关闭）** — 解除 Gateway 关闭测试对无关 PR 的 CI 阻塞。

大量关键修复仍处于 OPEN/待合并状态（如 #171564 Telegram 双栈丢消息修复、#171570 Code Mode 恢复修复、#171573 Markdown 解析 CPU 尖峰修复），尚待维护者 review 或合入。项目整体处于高频提交与功能铺设状态，但合入速度略滞后于 Issue 涌入速度。

## 4. 社区热点

- **[#143524] Agent SQLite WAL 增长至 1.4–2.8 GB 阻塞 Gateway 启动（评论 123 条）** — 今日讨论量最大 Issue。Windows 单网关环境下，单个 agent 的 SQLite WAL 无法 checkpoint，耗尽磁盘后导致网关无法启动。用户 @desksk 提供了完整现场数据和手动 checkpoint 后复现路径，社区对根因（wal_autocheckpoint 失效、reader 阻塞）有多轮分析，但尚无 fix PR。
- **[#148707] “Reply operation has no active tool authority snapshot” 导致回复丢失（评论 19 条）** — 2026.9.4 回归，会话内第二次运行抢占 in-flight turn 时整个回复消失，无重试、无解析。用户 @WolvenRA 详细描述了操作现场，社区对 session-state 并发控制讨论热烈。
- **[#97616] 子进程僵尸累积导致运行时退化（评论 19 条）** — 已关闭（可能已在某版本合入修复，但 Issue 仍被引用讨论）。

高评论量集中在“数据丢失/崩溃/卡死”三类体验，说明用户对消息可靠性、进程生命周期管理高度敏感。

## 5. Bug 与稳定性

按严重程度排列（P0 最高）：

| 严重级别 | Issue | 摘要 | Fix PR 状态 |
|---|---|---|---|
| P0 | [#143524](https://github.com/openclaw/openclaw/issues/143524) | Agent SQLite WAL 无限增长至 GB 级，阻塞 Gateway 启动 | 无 PR |
| P0 | [#148707](https://github.com/openclaw/openclaw/issues/148707) | 第二 run 抢占 in-flight turn 时回复丢失（无重试） | 无 PR |
| P0 | [#155859](https://github.com/openclaw/openclaw/issues/155859) | Gateway 启动耗时随插件数线性增长，120s 预算被 discord/codex/weixin 占满 | 无 PR |
| P0 | [#158390](https://github.com/openclaw/openclaw/issues/158390) | plugin-captures 临时目录不 GC，磁盘持续写满 | 无 PR |
| P0 | [#166894](https://github.com/openclaw/openclaw/issues/166894) | Windows 多代理重启挂起 30 分钟–2 小时（2026.9.8） | 无 PR |
| P1 | [#114612](https://github.com/openclaw/openclaw/issues/114612) | memory_index_chunks / embedding_cache 无保留策略，磁盘将满 | 无 PR |
| P1 | [#154572](https://github.com/openclaw/openclaw/issues/154572) | sessions_spawn 到 claude-cli 子进程总是失败（~350ms） | 无 PR |
| P1 | [#168955](https://github.com/openclaw/openclaw/issues/168955) | 2026.10.1 启动 1030s vs 2026.9.9 的 410s，sidecars.control-ui-assets 阻塞 477s | 无 PR |
| P1 | [#144291](https://github.com/openclaw/openclaw/issues/144291) | 配置热重载中止所有 in-flight agent turn | 无 PR |
| P1 | [#101929](https://github.com/openclaw/openclaw/issues/101929) | 上下文溢出预估器超计 2.3–2.6x（已有 PR #168338 修复主要路径，但仍在追踪） | 部分修复 |

今日有 API 已对应 fix PR 的活跃条目：

- #171564 fix(telegram): prevent dropped replies on IPv4-first dual-stack hosts — 对应 #171438
- #171570 fix: keep pending Code Mode calls active during recovery — 对应 #171366
- #171573 fix: avoid per-token Markdown parsing after quoted tool XML — 对应 #171363

**项目健康度**：P0 级“message-loss / crash-loop / ux-release-blocker”问题数量较多且普遍缺少 fix PR，属于当前最大健康度风险；但维护者对部分回归已有快速响应（如 #101929 的修复已合入 main）。

## 6. 功能请求与路线图信号

- **[#155633] Add Databricks Unity Gateway as an official model provider** — 用户 @zozo123 提议将 Databricks Unity Gateway 作为官方 Provider，已附实现 PR #155634；代表企业级模型网关集成需求渐增。
- **[#91676] Opt-in skills.workshop.allowSandboxedAgents** — 请求允许沙箱代理使用 skill_workshop 工具，默认关闭；安全边界内开放能力属于合理演进方向。
- **[#111143] Pin plugin tabs in the Control UI sidebar** — 插件页签可固定到侧边栏，减少“More”菜单埋没频率使用页面；已有用户点赞。
- **[#45508] Self-hosted STT/TTS support in webchat** — 将 webchat 语音能力绕回网关配置，使自托管语音服务可见；被标记为 off-meta，但社区有 +2 点赞。

这些请求集中在“企业级集成”“沙箱安全可控”“UI 可定制性”三个方向，与项目当前“Gateway + 插件 + 多 Provider”的扩张期定位一致，部分已有对应 PR 或产品决策标签（needs-product-decision），可能进入后续版本规划。

## 7. 用户反馈摘要

- **升级流程不稳**：#170331、#170332 来自同一用户 @DonnieFi，报告 beta.2 更新时“candidate config read exits 1”和“live state DB 变化导致快照失败但更新继续进行”，结合 #156112（openclaw update 在 global install swap 步骤失败）与 #166221（更新时 SQLite preflight 崩溃），多用户在不同平台（Linux/npm/Windows/macOS）均遭遇更新失败或更新后状态不一致，是最集中的不满点。
- **SQLite/WAL 数据膨胀普遍**：除 #143524 外，#114612、#164294（Gateway 自身 WAL checkpoint 永久阻塞）等形成问题家族，用户对“磁盘空间被悄悄吃完”且“无自动清理机制”表示强烈担忧。
- **消息静默丢失**：#125764（Telegram 网络失败单次尝试即 dead-letter）、#158147（用户回复 bot 自身消息时文本丢失）、#126950（opaque callback 静默丢弃）等多渠道消息丢失反馈，说明“发送可靠性”是最影响信任的功能维度。
- **Telegram / Slack 适配器细节问题集中**：streaming 截断预览（#169930）、socket 模式连接泄漏（#128809）、callback 数据格式（#126950）等，反映主流渠道适配器仍处于打磨期。
- **积极反馈**：部分 PR 获“ready for maintainer look”评级；#103198（WebChat 图片附件路径错误）已关闭，用户对修复表示认可（+3）。

## 8. 待处理积压

- **[#38327] “Cannot convert undefined or null to object” on Google Vertex / Gemini 3.1 Pro Preview** — 自 2026-03-06 开设、持续 7 个月未关闭，P0 且位于 auth-provider 关键路径，已获 3 个 👍 但始终没有 fix PR。建议维护者优先排查该 Provider 适配层。
- **[#45508] Self-hosted STT/TTS provider support in webchat**（2026-03-13 创建）— 功能请求长期未获产品决策，期间 webchat 语音能力迭代可能已改变上下文，建议重新评估。
- **[#161379] Gateway 固定占用一个 CPU 核：prepared model catalog refresh loop** — 2026.9.6 回归（P1，crash-loop），10 月 10 日仍有更新，但无 fix PR，需关注资源泄漏对生产环境长期影响。
- **[#167557] Deferred plugin data/settings migration 永不收敛**（2026.9.8 升级后）— 影响 npm/Linux 用户插件升级，已滞留一周，处于 P0/ux-release-blocker 状态，需推动。

---

*本日报基于 GitHub 公开数据自动生成，仅客观汇总项目动态，不构成对项目健康状况的最终判断。*

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告

**分析周期**：2026-10-13 至 2026-10-14  
**数据来源**：各项目 GitHub 公开动态日报

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现“**一超多强、分化加速**”的态势。OpenClaw 以每日 500 条 Issue / 500 条 PR 的流量断层领先，但 P0 级数据可靠性与发布健康度问题持续积压；NanoBot、Zeroclaw、CoPaw、LobsterAI 等衍生项目在轻量化、插件治理、桌面体验、控制台基建等细分方向快速迭代；PicoClaw、IronClaw 等则进入低活跃或维护间歇期，部分项目甚至已完全静默。跨项目来看，**消息可靠性、成本可见性、会话持久化、插件化扩展机制**成为共同攻坚的技术主题，生态正从“功能铺设期”转向“稳定性与治理期”。

---

## 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500 条更新（新开/活跃 280，关闭 220） | 500 条更新（待合并 340，合并/关闭 160） | 2 个（v2026.10.5-beta.3、v2026.10.3） | 高活跃但 P0 大量积压，健康度风险偏高 |
| **NanoBot** | 6 新开，0 关闭 | 28 条（4 合并，24 待审） | 无 | 稳定化阶段，响应快，9 个 Bug 中 8 个已有 PR |
| **Zeroclaw** | 25 条更新，0 关闭 | 50 条（6 合并，44 待合并） | 无（v0.8.6 推进中） | 高强度活跃，合并通道积压，P1 成本/数据 Bug 未闭合 |
| **PicoClaw** | 7 条更新（1 新开，6 被 stale 关闭） | 无合并，1 draft 停滞，1 被 stale 关闭 | 无 | 低活跃，维护者响应不足，中高风险 |
| **NanoClaw** | 1 关闭（#30） | 1 合入，2 待合并 | 无 | 稳定迭代，核心可靠性修复落地 |
| **IronClaw** | 1 新开（#8136） | 1 个 dependabot PR 待合并 | 无 | 维护间歇期，稳定但社区声音弱 |
| **LobsterAI** | 1 新

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-14

## 1. 今日速览

过去 24 小时项目活跃度中等偏高：共 6 个新 Issue 全部处于开放状态，无关闭；PR 动态密集，28 条中有 4 条已合并/关闭，24 条待审，其中多位贡献者（fhgffy、chengyongru、gianfrancodemarco）在同日提交了多条针对性修复，显示社区协作节奏加快。无新版本发布。整体来看，项目正在经历一轮以 Bug 修复和 WebUI/工具链打磨为主的稳定化阶段，同时 Google Drive/Sheets 集成、SQLite 会话重构等较大特性仍在推进中。

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日有 4 条 PR 关闭/合并，虽然其中两条属于重构收尾，但反映了项目在代码质量和可维护性上的持续投入：

- **[#6201] refactor(tools): streamline built-in tool descriptions**（[链接](https://github.com/HKUDS/nanobot/pull/6201)）— 精简 `my`、`message`、`subagent`、`cron`、`apply_patch` 等 10+ 内置工具的描述与参数说明。此前每条工具定义都在每次模型请求中携带冗长的操作指引和实现细节，该 PR 显著降低 token 开销，属于对推理成本有实际影响的优化。

- **[#6179] refactor(webui): separate presentation views and expand component gallery**（[链接](https://github.com/HKUDS/nanobot/pull/6179)）— 新增 `bun run gallery` 命令，提供无需网关的 WebUI 组件参考环境，覆盖 159/202 个源码模块、120 个可交互示例系列，全部 18 个 channel 注册均有示例。这一基础设施改进将大幅降低后续 WebUI 开发与审查的门槛。

其余两条关闭的 PR 未在展示列表中，另有 24 条 PR 处于待合并状态，包括多个已获测试覆盖的 Bug 修复（邮件附件、cron 时区、XLSX 定位等），预计未来数日合并后项目稳定性将显著提升。

---

## 4. 社区热点

**今日最受关注 Issue：#6165 — Docker 镜像不可用 + 入门文档不佳**（[链接](https://github.com/HKUDS/nanobot/issues/6165)，2 条评论）

> 用户按 README 执行 `git clone && docker compose up` 后无法得到可运行的 Nanobot 实例。该 Issue 同时批评了入门引导流程。

这是今日唯一有评论互动的 Issue，反映了**开箱即用（Just Works）**的强烈预期落差。对一个快速迭代的 AI Agent 项目而言，Docker 镜像作为第一入口一旦失效，会直接抬高新用户的流失率，值得维护者优先处理。

**值得关注的 PR：#6200 — 免费云托管推广**（[链接](https://github.com/HKUDS/nanobot/issues/6200)）

> 第三方 @agentrohit37 为 NanoBot 用户提供 100 个免费云计算机（30 天/个），请求在 README 中加入链接。

这条 Issue 尚无评论，但代表了一类社区商业化/推广诉求与开源项目治理之间需要权衡的典型场景。是否在 README 中背书第三方托管服务，需要维护者明确表态。

---

## 5. Bug 与稳定性

按严重程度排列，当日报告的 Bug 如下：

| 严重度 | Issue/PR | 描述 | Fix 状态 |
|--------|----------|------|----------|
| **高** | [#6165](https://github.com/HKUDS/nanobot/issues/6165) | 默认 Docker 镜像不可用，`docker compose up` 无法启动可用实例，且文档引导不足 | **无**，尚无对应修复 PR |
| **中** | [#6192](https://github.com/HKUDS/nanobot/issues/6192) | `AutoCompact.check_expired` 在每个 1s 空闲 tick 执行全量 sessions/*.jsonl 扫描，涉及 `SessionManager.list_sessions()` 打开所有会话文件，存在性能隐患 | 无 |
| **中** | [#6194](https://github.com/HKUDS/nanobot/pull/6194) | API 请求结束后，不同 `session_id` 的锁永久留在注册表中，造成内存泄漏（修复 #4883） | ✅ 已有 PR [6194](https://github.com/HKUDS/nanobot/pull/6194)，改用 WeakValueDictionary |
| **中** | [#6198](https://github.com/HKUDS/nanobot/pull/6198) | 反向代理或 Cloudflare Tunnel 环境下，附件上传因 cookie 未发送而失败 | ✅ 已有 PR [6198](https://github.com/HKUDS/nanobot/pull/6198)，发送同源 cookie 并拒绝重定向 |
| **中** | [#6186](https://github.com/HKUDS/nanobot/pull/6186) | MIME 遍历时附件子节点被错误纳入正文提取，附带的 .eml 文件内容会污染父邮件正文 | ✅ 已有 PR [6186](https://github.com/HKUDS/nanobot/pull/6186) |
| **中** | [#6185](https://github.com/HKUDS/nanobot/pull/6185) | cron 无显式时区时使用宿主 UTC 偏移，跨 DST 切换后每日任务会偏移一小时 | ✅ 已有 PR [6185](https://github.com/HKUDS/nanobot/pull/6185)，改用 IANA ZoneInfo |
| **中** | [#6184](https://github.com/HKUDS/nanobot/pull/6184) | 同一邮件中文件名相同（或清洗后相同）的附件互相覆盖，后写入的附件丢失 | ✅ 已有 PR [6184](https://github.com/HKUDS/nanobot/pull/6184) |
| **低** | [#6197](https://github.com/HKUDS/nanobot/pull/6197) | `web_fetch` 未处理大小写不敏感的图片媒体类型（如 `Image/PNG`），导致图片被当作文本解码 | ✅ 已有 PR [6197](https://github.com/HKUDS/nanobot/pull/6197) |
| **低** | [#6183](https://github.com/HKUDS/nanobot/pull/6183) | XLSX 单元格中的字面 tab 被 `grep` 误判为分隔符，导致报告错误的 Excel 列位置 | ✅ 已有 PR [6183](https://github.com/HKUDS/nanobot/pull/6183) |

**小结**：9 个 Bug 中 8 个已有修复 PR，说明社区响应速度快、维护者/贡献者的测试意识较强。唯一没有修复方案的是 *Docker 镜像不可用*（#6165），建议尽快安排人手排查。

---

## 6. 功能请求与路线图信号

### Google Drive / Google Sheets 集成（较大概率进入下一版本）
- **#6187**（[链接](https://github.com/HKUDS/nanobot/issues/6187)）：新增 Google Drive 工具，允许 agent 读取共享文件夹中的文件，Docs/Sheets/Slides 自动导出为文本/CSV/PDF。
- **#6188**（[链接](https://github.com/HKUDS/nanobot/issues/6188)）：新增 Google Sheets 工具，支持读取和更新共享电子表格。

**对应 PR 已提交**：#6195（Drive 只读，[链接](https://github.com/HKUDS/nanobot/pull/6195)）、#6196（Sheets，[链接](https://github.com/HKUDS/nanobot/pull/6196)，stacked on #6195）。两个 PR 均带测试，闭环完整，预计在 #6195 合并后 #6196 可快速跟进。

### 第三方生态集成示例
- **#6182**（[链接](https://github.com/HKUDS/nanobot/issues/6182)）：提议贡献一个 Plazmi（星际家园）世界"追赶"示例，演示 agent 在跨会话的持续世界中通过受限制的 MCP 工具恢复上下文。该提案利用了现有的 `enabledTools` 机制，投入成本低，可以作为 MCP 配置指南的补充教学案例。

### 其他信号
- **#6200**（[链接](https://github.com/HKUDS/nanobot/issues/6200)）：免费云托管资源请求 README 链接，属于运营/治理决策，非技术路线。

---

## 7. 用户反馈摘要

**核心痛点：开箱即用体验受损（#6165）**

> 用户 `@jerkstorecaller` 明确表示：`docker compose up` 后没有得到可工作的 Nanobot，并指出"这就是 Docker 的全部意义——让开发者提供一个开箱即用的镜像，而不必让我们去读文档"。这既是技术 Bug，也是**入门流程设计问题**。值得注意的细节是 `cd nanobot` 这一步——用户反馈暗示仓库克隆后目录/配置可能与 Docker Compose 约定不一致。

**性能敏感型用户主动报障（#6192）**

> 用户 `@hsinchao-athena` 给出了精确的代码位置（`nanobot/agent/loop.py` ~1032 行），指出 `check_expired` 在每次 1s 空闲 tick 执行全量会话扫描。这是有经验用户对**长时间运行场景**稳定性/资源消耗的关注。

**社区正向贡献意愿强**

> 多位用户（`gianfrancodemarco`、`cairn-agent`、`agentrohit37`）主动提出功能建议或贡献示例，且都附带了较完整的实现思路（服务账号鉴权、enabledTools 限制等），说明项目在开发者社区中具备良好的贡献吸引力。

---

## 8. 待处理积压

以下为长期未合并/未响应的重点项，建议维护者优先关注：

- **[#5405] feat(skills): support manual-only invocation**（[链接](https://github.com/HKUDS/nanobot/pull/5405)，2026-08-16 创建，近 2 个月未合并）
  为技能添加 `disable-model-invocation: true` 选项，使部署、发布等有副作用的技能仅可被用户手动触发。该需求逻辑清晰、场景明确，长期未合并可能已产生 backlog 漂移，建议明确状态。

- **[#5943] refactor(session): centralize state ownership in SQLite**（[链接](https://github.com/HKUDS/nanobot/pull/5943)，priority: p1，2026-09-27 创建，已 17 天）
  将会话持久化从 JSONL 迁移到 SQLite 事务，并通过有界 worker pool 避免阻塞事件循环。p1 优先级的核心重构，评审周期偏长，需关注是否因其他高优 PR 被插队。

- **[#6158] fix(webui): make browser notification failures actionable**（[链接](https://github.com/HKUDS/nanobot/pull/6158)，2026-10-11 创建，标记 `conflict`）
  已存在冲突，需要维护者或作者解决后进入合并流程。

- **[#6168] feat(update): integrate managed installs and recoverable in-app updates**（[链接](https://github.com/HKUDS/nanobot/pull/6168)，2026-10-12 创建）
  PR 明确说明与 #5817、#6154

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-14

## 1. 今日速览

过去24小时项目保持高强度活跃：25条Issue更新全部为新增/活跃（无关闭），50条PR更新中有44条仍在待合并状态，合并效率（6条）明显低于新增速度。当前开发焦点集中在插件生态（WASM插件托管、CLI插件更新/替换/恢复）、成本追踪准确性（OpenRouter支出为零、token计数偏差）以及会话持久化数据损坏（created_at时间戳重写）三大方向。零新版本发布，v0.8.6相关PR仍在持续集成中。值得关注的是，多个影响成本准确性和数据完整性的P1级Bug已存在数周未合入修复，项目合并通道存在积压风险。

## 3. 项目进展

今日无新版本发布，但多项重要PR持续推进，整体朝v0.8.6目标稳步前进：

**插件生态（核心方向）**：由 @IftekharUddin 主导的插件系列PR仍在积极更新中——[#11347](https://github.com/zeroclaw-labs/zeroclaw/pull/11347) 将WASM插件主机纳入发行版工件（目标v0.8.6）；[#11262](https://github.com/zeroclaw-labs/zeroclaw/pull/11262)（CLI插件更新与验证替换）、[#11261](https://github.com/zeroclaw-labs/zeroclaw/pull/11261)（插件分阶段安装替换）、[#11236](https://github.com/zeroclaw-labs/zeroclaw/pull/11236)（通过remove恢复不完整安装）三个大型PR（均size:XL）仍在栈式开发中。另外 [#11310](https://github.com/zeroclaw-labs/zeroclaw/pull/11310)（签名清单文档一步签名）已关闭/合并，简化了插件签名流程。

**安全修复**：[#11656](https://github.com/zeroclaw-labs/zeroclaw/pull/11656) 修复 `FirejailSandbox` 忽略配置的 `firejail_args` 问题，此前安全配置虽被schema接受但从未实际生效。

**渠道稳定性**：[#11650](https://github.com/zeroclaw-labs/zeroclaw/pull/11650) 修复Telegram 429后立即重试的缺陷——不再用明文消息重试，而是遵循 `retry_after` 等待。

**运行时修复**：[#11725](https://github.com/zeroclaw-labs/zeroclaw/pull/11725) 修复 `session/steer` 消息只能在最终回答后到达的问题，改为在下一步工具调用前即时交付；[#11720](https://github.com/zeroclaw-labs/zeroclaw/pull/11720) 为 `model_routing_config` 补充动作特定必填参数的schema。

**测试加固**：[#11673](https://github.com/zeroclaw-labs/zeroclaw/pull/11673) 和 [#11671](https://github.com/zeroclaw-labs/zeroclaw/pull/11671) 分别解决文件系统分发循环测试的负载真实性和park-timeout测试在秒边界处的flaky问题（对应 #10261、#11179）。

**ZeroCode体验**：[#11573](https://github.com/zeroclaw-labs/zeroclaw/pull/11573) 增加会话行拖拽排列功能；[#11288](https://github.com/zeroclaw-labs/zeroclaw/pull/11288) 修复滚动条拖动跳回问题。

## 4. 社区热点

- **[#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)（8条评论，热度最高）**：SQLite会话后端每次对话都会重写所有消息的 `created_at`，导致每条消息的原始时间丢失。S2级行为退化，涉及gateway/api，用户 @joalvaradon 详细描述了影响范围。此问题与今日新报的 [#11675](https://github.com/zeroclaw-labs/zeroclaw/issues/11675)（ACP会话存储同样重写时间戳）和 [#11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711)（裁剪长对话导致旧消息永久删除）高度相关，反映出会话持久化层存在系统性设计缺陷——用户对数据完整性表达了集中关切。

- **[#7432](https://github.com/zeroclaw-labs/zeroclaw/issues/7432)（6条评论）**：v0.8.6/v0.9.0运行时与网关交付路线图tracker，今日仍在更新，是了解项目交付节奏的关键入口。

- **[#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)（5条评论）**：OpenRouter费用显示$0.00且所有token被分类为"free tok"，`usage.cost`从未被摄取。P1级Bug，直接影响用户对成本的信任。同日新增的 [#11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)（成本账本丢弃provider的 `total_tokens`）和 [#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)（ZeroCode成本页混用UTC与本地日期）共同指向成本子系统存在多项数据准确性缺陷。

- **[#10573](https://github.com/zeroclaw-labs/zeroclaw/issues/10573)（5条评论）**：要求将网关配对token绑定到名册用户。该功能已在9-28更新中确认基础依赖已合入，不再阻塞，社区关注度稳定。

## 5. Bug 与稳定性

按严重程度排列（S1 > S2 > S3）：

**S1 - 工作流阻塞**
- [#11179](https://github.com/zeroclaw-labs/zeroclaw/issues/11179)：`pending_park_retry_respects_pending_pool_cap` 测试在秒边界处间歇性失败，导致不必要的CI红牌。✅ 已有修复PR [#11671](https://github.com/zeroclaw-labs/zeroclaw/pull/11671)（将超时从1秒提高到3600秒）。

**S2 - 行为退化**
- [#11420](https://github.com/zeroclaw-labs/zeroclaw/issues/11420)：SQLite会话写入每次对话都重写 `created_at`，消息级时间戳全部丢失。⛔ 无修复PR。
- [#11204](https://github.com/zeroclaw-labs/zeroclaw/issues/11204)：OpenRouter使用量显示为0、全部token标记为"free tok"，成本仪表盘完全失真。⛔ 无修复PR。
- [#11606](https://github.com/zeroclaw-labs/zeroclaw/issues/11606)：`model_routing_config upsert_agent` 重写整个配置文件，伪造风险/运行时profile、丢失字段、重置agent限制。状态in-progress。⚠️ 相关修复PR [#11720](https://github.com/zeroclaw-labs/zeroclaw/pull/11720) 只覆盖schema层面，未解决配置重写核心问题。
- [#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)：Anthropic provider的thinking/effort配置在轮次间翻转并重写整个缓存历史段，需复现（r:needs-repro）。⛔ 无修复PR。
- [#11696](https://github.com/zeroclaw-labs/zeroclaw/issues/11696)：系统提示词每次对话从磁盘重建，导致任何personality文件修改都会击穿所有活跃会话的提示词缓存，产生额外成本。⛔ 无修复PR。
- [#11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711)：长对话裁剪会将会话存储中的旧轮次永久删除（而非仅从上下文移除）。⛔ 无修复PR。
- [#11706](https://github.com/zeroclaw-labs/zeroclaw/issues/11706)：`max_image_turns` 限制生效后视觉路由仍被固定，provider不会切换回普通模型。⛔ 无修复PR。
- [#11708](https://github.com/zeroclaw-labs/zeroclaw/issues/11708)：`model_routing_config` 工具schema缺少动作特定的必填参数，导致模型反复收到缺失字段错误。✅ 已有修复PR [#11720](https://github.com/zeroclaw-labs/zeroclaw/pull/11720)。
- [#10950](https://github.com/zeroclaw-labs/zeroclaw/issues/10950)：`cost.warn_at_percent` 配置被运行时忽略。⛔ 无修复PR。
- [#11613](https://github.com/zeroclaw-labs/zeroclaw/issues/11613)：成本账本丢弃provider的 `total_tokens`，导致隐藏推理token（如Gemini）被少计。⛔ 无修复PR。

**S3 - 轻微问题**
- [#11654](https://github.com/zeroclaw-labs/zeroclaw/issues/11654)：JPEG准入流程在检查解码内存上限前就复制输入和解析元数据，存在不必要的内存分配。
- [#11675](https://github.com/zeroclaw-labs/zeroclaw/issues/11675)：ACP会话存储替换修剪后的transcript时重写 `acp_messages` 和 `acp_tool_calls` 的时间戳。
- [#11694](https://github.com/zeroclaw-labs/zeroclaw/issues/11694)：ZeroCode成本页

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-10-14）

> 数据来源：github.com/sipeed/picoclaw | 统计区间：2026-10-13 ~ 2026-10-14

---

## 1. 今日速览

过去 24 小时项目活跃度处于低位：无新版本发布、无 PR 被合并，唯一新开的 issue 为 #3427（一个 MCP/CLI 集成提案）。7 条被更新的 issue 中有 6 条被 stale bot 自动关闭，其中包括 3 条带大量讨论或明确修复方案的 bug/增强请求——这反映出维护者当前对积压 issue 的响应严重不足，自动化清理可能掩盖了真实待办。社区侧仍有人在提交新集成提案（#3427），但整体讨论热度明显下降，项目处于“低速运转、社区仍有期待”的观望期。

---

## 2. 版本发布

**无新版本发布。** 上一个版本仍为 v0.3.1，今日无 Release 更新，也无 pre-release 或 tag 推送。

---

## 3. 项目进展

今日 **没有 PR 被合并**，代码主线和功能层面无实际推进。值得注意的动态：

- **PR #3416**（[链接](https://github.com/sipeed/picoclaw/pull/3416)）「feat(channels): add Sendblue iMessage and SMS transport」仍处于 **draft 状态**，未被标记为 ready-for-review，也未获得维护者评论。该 PR 自 10-05 创建以来已搁置 9 天，推进停滞。
- **PR #3370**（[链接](https://github.com/sipeed/picoclaw/pull/3370)）「feat(tools): add Keenable web search provider」今日被 **stale bot 关闭**。该 PR 提供了无需 API key 的 web_search 新 provider，属于功能增量，但未能获得合并。该 PR 是否会被恢复或由维护者手动重开，目前没有迹象。

**整体判断：** 项目过去 24 小时在功能开发上零进展，两个社区贡献 PR 一个停滞一个被自动关闭，主线合并速度为 0。项目健康度中风险。

---

## 4. 社区热点

今日讨论最集中的议题实际上是 **“被 stale bot 关闭”** 这一过程本身。从评论数据看：

| Issue | 评论数 | 状态 | 核心主题 |
|---|---|---|---|
| [#440](https://github.com/sipeed/picoclaw/issues/440) | 9 | 已关闭（stale） | 用上下文窗口/循环检测替代 `max_tool_iterations: 20` 硬限制 |
| [#3407](https://github.com/sipeed/picoclaw/issues/3407) | 3 | 已关闭（stale） | Web UI 幽灵会话（模型思考时会话消失） |
| [#3406](https://github.com/sipeed/picoclaw/issues/3406) | 2 | 已关闭（stale） | Web UI 的思考指示器、会话管理体验 |
| [#3405](https://github.com/sipeed/picoclaw/issues/3405) | 2 | 已关闭（stale） | 请求启用私有漏洞报告 |
| [#3404](https://github.com/sipeed/picoclaw/issues/3404) | 2 | 已关闭（stale） | 核心可靠性 bug 批处理报告 |

**特别关注 #440**：该 issue 提出了一个对 agent 行为有全局影响的设计改进（用上下文窗口边界 + 循环检测代替固定迭代上限），并且已有 9 条评论的讨论，说明用户对此有真实困扰。但该 issue 于今日被 stale bot 关闭，没有维护者介入的痕迹。这可能是近期社区最大的失望点。

今日真正新开的 **#3427**（[链接](https://github.com/sipeed/picoclaw/issues/3427)）是 Plazmi MCP/CLI 集成的提案，目前 0 评论，但代表了社区对“低依赖持久化 agent 会话”方向的新兴趣。

---

## 5. Bug 与稳定性

今日没有新增 bug 报告，但有一批既有 bug 报告被 stale bot 关闭，其中包含高价值问题。按严重程度排列如下：

### 🔴 高（安全相关）
- **#3405**（[链接](https://github.com/sipeed/picoclaw/issues/3405)）：用户请求启用 GitHub 私有漏洞报告，并指出仓库缺少 `SECURITY.md`。这不是漏洞本身，但意味着**安全披露渠道缺失**——如果有真实漏洞，外部研究者无法安全提交。状态：已关闭（stale）。

### 🟠 中高（核心功能可靠性）
- **#3404**（[链接](https://github.com/sipeed/picoclaw/issues/3404)）：用户对 `main` (bbf6893) 和 v0.3.1 进行了系统性排查，找出 agent loop、channels manager、config、updater 等多个核心模块的可复现 bug。更关键的是，用户在描述中提到“有些之前已经报告过甚至修过，但被 stale bot 在任何人处理前就关闭了”。状态：已关闭（stale），**未看到对应 fix PR**。

### 🟡 中（Web UI 功能体验）
- **#3407**（[链接](https://github.com/sipeed/picoclaw/issues/3407)）：Web UI 中，模型仍在思考时，当前会话可能从历史列表中消失，且无法恢复。这是直接影响日常使用的功能性问题。状态：已关闭（stale）。

**稳定性总评：** 核心 bug 和安全渠道问题都停留在“被报告但未解决”状态，且因 stale 自动化而关闭。维护者需要优先人工介入审阅 #3404 和 #3405 所涉及的问题。

---

## 6. 功能请求与路线图信号

当前处于开放状态且有价值的功能/集成请求如下：

| 编号 | 类型 | 内容 | 潜在纳入版本 |
|---|---|---|---|
| [#3427](https://github.com/sipeed/picoclaw/issues/3427) | 新提案 | 低依赖的 Plazmi MCP/CLI 持久会话示例 | 视维护者兴趣，有成为官方 example 的潜力 |
| [#3416](https://github.com/sipeed/picoclaw/pull/3416) | PR（草稿） | Sendblue iMessage/SMS 通道 | 若完善并获 review，可能纳入 v0.4 |
| [#3397](https://github.com/sipeed/picoclaw/issues/3397) | 功能请求 | 将 Tsubasa 加入 OpenAI-compatible provider 目录 | 低成本小改动，适合新贡献者或快速合并 |
| [#3406](https://github.com/sipeed/picoclaw/issues/3406) | 功能请求 | Web UI：clarify 思考状态、分离手动/通道会话、会话归档 | 涉及前端设计，更可能进入 0.4+ 的 UI 重构 |

**路线图信号：** 社区希望 PicoClaw 在三个方向继续演进——(1) 更丰富的消息通道（iMessage/SMS、Tsubasa），(2) 更可靠持久的 agent 会话（#3427、#440），(3) Web UI 的成熟度提升（#3406）。不过由于 stale bot 的清扫，大部分旧请求已被关闭，真正能进入下一版本的通道只剩还开放着的 #3427 和 #3416。

---

## 7. 用户反馈摘要

以下反馈来自各 issue 的描述和评论，反映真实使用中的痛点和期待：

- **agent 任务长度受限**（#440）：`max_tool_iterations: 20` 硬限制导致复杂任务在接近完成时被截断，用户反馈“已经处理完了，但没有输出”的错误令人困惑。**诉求：改为上下文窗口感知的边界 + 循环检测。**
- **Web UI 状态不可见**（#3406）：用户把 Web UI 作为日常主要聊天入口，但“是否还在思考”只有通用 spinner，无法区分“等待响应/正在处理/卡死”。**诉求：更清晰的 thinking 状态指示器。**
- **会话丢失恐惧**（#3407）：模型思考过程中会话从列表消失，且无法恢复，用户形容为“ghost session”。**诉求：至少确保会话列表与活跃会话的一致性。**
- **贡献者积极性受损**（#3404）：用户花时间做了系统性的 bug 复现，但因 stale bot 在维护者处理前将 issue 关闭，感到努力白费。**诉求：维护者需要建立“snooze”或“triaged”机制，避免有价值 issue 被自动清扫。**
- **安全研究者受阻**（#3405）：希望提交安全漏洞但找不到渠道，仓库缺少 SECURITY.md。**诉求：开启私有漏洞报告 + 提供安全联系途径。**

---

## 8. 待处理积压

以下事项需要维护者重点关注，否则社区参与度可能进一步下滑：

### 🔴 紧急
- **#3404**（[链接](https://github.com/sipeed/picoclaw/issues/3404)）：核心模块可靠性修复，带明确复现步骤，被 stale 关闭。**建议：重新打开并 triage。**
- **#3405**（[链接](https://github.com/sipeed/picoclaw/issues/3405)）：安全披露渠道缺失。**建议：快速添加 SECURITY.md 并启用私有报告。**

### 🟠 高
- **#3416**（[链接](https://github.com/sipeed/picoclaw/pull/3416)）：Sendblue 通道 PR，已 draft 9 天无维护者反馈。**建议：至少给出 review 或明确态度。**
- **#440**（[链接](https://github.com/sipeed/picoclaw/issues/440)）：核心 agent 循环改进提议，来自长期讨论，被 stale 关闭。**建议：迁移到 discussions 或纳入 roadmap 文档。**

### 🟡 中
- **#3370**（[链接](https://github.com/sipeed/picoclaw/pull/3370)）：Keenable 搜索 provider 被 stale 关闭，实现完整且低门槛。**建议：确认是否还有合并意向，或告知 contributor 如何 rebase 重开。**
- **#3427**（[链接](https://github.com/sipeed/picoclaw/issues/3427)）：今日新开，尚无回应。**建议：尽快回帖表明是否接受此类 example 类贡献。**

---

## 健康度总结

| 维度 | 评级 | 说明 |
|---|---|---|
| 项目活跃度 | ⭐⭐ | 无新版本、无合并、无维护者公开发声 |
| 社区贡献度 | ⭐⭐⭐ | 仍有新提案和外部 PR，但响应率低 |
| 稳定性信号 | ⭐⭐ | 核心 bug 修复停滞，可靠性反馈被自动关闭 |
| 维护者响应 | ⭐ | 24h 内未见维护者评论或操作（除自动化） |
| 风险提示 | 中高 | stale bot 关闭了 6 条包含有效信息的 issue，可能导致贡献者流失 |

**一句话总结：** PicoClaw 在功能和社区两个层面都进入了明显的“低功耗”周期，维护者需要尽快介入处理被自动化关闭的高价值 issue（尤其 #3404、#3405），否则项目可能面临贡献者和用户的信任流失。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-14

## 今日速览

过去 24 小时项目保持稳定迭代节奏：1 个关键 Issue（#30）关闭，该 Issue 记录了因缺少 `maxTurns` 上限导致的生产事故；PR 方面 2 个新功能（#4084 设置流程改进、#3503 macOS Apple 容器支持）处于待合并状态，1 个 agent-runner 修复（#3918）已关闭合入。整体活跃度中等：无新版本发布，社区讨论集中在 agent 稳定性问题上，但 PR/Issue 评论互动较少（多数条目评论数为 0），多为作者自述。

---

## 项目进展

### 合入/关闭

- **[#3918] fix(agent-runner): never lose or repeat a reply around send_message** — 已关闭（10-13 更新）
  - 修复流式与端到端两类 provider 在 `send_message` 环节可能丢失或重复回复的问题，核心改进 agent runner 对回合完成状态的判断逻辑。
  - 该 PR 属于 `kind/bug`、`core-team` 合入，直接影响 agent 运行的可靠性，是今日最重要的核心修复。
  - https://github.com/nanocoai/nanoclaw/pull/3918

- **[#30] fix: Add maxTurns limit to prevent agent loop runaway** — 已关闭（10-13 更新）
  - 为 `query()` 调用补充 `maxTurns` 参数上限，从根源上防止 agent 无限制循环。
  - 与 #3918 形成组合拳：一个防循环失控、一个防消息丢失/重复，今日两个稳定性修复均已落地。
  - https://github.com/nanocoai/nanoclaw/issues/30

### 待合并 PR（2 个）

| PR | 标题 | 状态 | 说明 |
|---|---|---|---|
| #4084 | feat(setup): new installs choose their update channel | OPEN（10-13 创建） | 新安装时直接选择更新通道，避免从 stable 分支误跑 main 代码 |
| #3503 | feat(add-apple-container): run v2 agent sessions on Apple container instead of Docker (macOS) | OPEN（08-24 创建，10-13 更新） | 新增 macOS 上的 Apple 容器运行时支持，已在个人环境运行 4 个月、团队环境 2 个月 |

- https://github.com/nanocoai/nanoclaw/pull/4084
- https://github.com/nanocoai/nanoclaw/pull/3503

---

## 社区热点

- **[#30] fix: Add maxTurns limit to prevent agent loop runaway** — 评论 3 条，👍 1，为该周期内唯一有实质讨论的 Issue。
  - 尽管该 Issue 已关闭，但其描述的生产事故（agent 在 32 秒内发送 21 条重复提醒消息）成为社区关注焦点，说明真实场景下 agent 行为失控会直接伤害用户信任。
  - https://github.com/nanocoai/nanoclaw/issues/30

---

## Bug 与稳定性

今日共处理 2 个稳定性相关问题，均与 agent 运行时行为直接相关，且均已修复关闭：

| 严重程度 | 问题 | 状态 |
|---|---|---|
| 高（生产事故） | #30 缺少 `maxTurns` 导致 agent 无限循环，32 秒内发送 21 条重复消息 | 已关闭（新增 maxTurns 限制） |
| 中（消息可靠性） | #3918 流式/EOT provider 在 `send_message` 周围可能丢失或重复回复 | 已关闭（runner 回合判断逻辑修复） |

- https://github.com/nanocoai/nanoclaw/issues/30
- https://github.com/nanocoai/nanoclaw/pull/3918

---

## 功能请求与路线图信号

### 可能进入下一版本的功能

1. **安装阶段选择更新通道（#4084）** — 10-13 新开 PR，解决新用户克隆 main 分支却默认走 stable 更新通道的潜在版本错位问题。该改动涉及安装流程，比较基础，很可能随下一个小版本发布。
   - https://github.com/nanocoai/nanoclaw/pull/4084

2. **Apple 容器运行支持（#3503）** — 为 v2 agent 会话提供 macOS 原生容器替代 Docker 的新 skill（`/add-apple-container`），已在实际环境中经过数月验证。如果合并，将扩大 macOS 用户的使用场景，适合作为向 Apple Silicon 生态延伸的信号。
   - https://github.com/nanocoai/nanoclaw/pull/3503

---

## 用户反馈摘要

- **生产环境稳定性诉求明确**：#30 的提交者（@randomm）报告的真实事故体现了当前版本缺少安全边界，用户需要系统内置循环防护，而非依赖外部控制。
- **消息不丢/不重是基本要求**：#3918 所修复的 send_message 重复/丢失问题虽然没有大量点赞，但属于直接影响日常对话质量的 bug，这类问题的关闭会显著改善使用体验。
- 两个功能 PR（#4084、#3503）目前均无外部评论，说明新功能尚未获得广泛的社区试用反馈，维护者可在合并前主动征集意见。

---

## 待处理积压

- **[#3503] feat(add-apple-container)** — 创建于 2026-08-24，已挂起近 2 个月，无评论、无 review 结论。虽然作者声明已在生产环境运行，但长时间未合并会让外部用户对该功能的可用性产生疑惑，建议维护团队评估其状态（是否需要测试、文档或代码调整）。
  - https://github.com/nanocoai/nanoclaw/pull/3503

---

*数据统计周期：2026-10-13 至 2026-10-14 | 数据来源：NanoClaw GitHub 仓库公开信息*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-14

## 1. 今日速览

过去24小时，IronClaw 项目整体活跃度处于较低水平，核心代码库无新合并或关闭的PR，亦无版本发布。社区侧有1条新开Issue（#8136）和1条由dependabot提出的依赖更新PR（#8137），均未产生讨论或评论。从数据看，项目处于正常的维护间歇期，无重大变更或社区热点事件，建议关注 #8136 所代表的扩展能力需求信号。

---

## 2. 版本发布

**无**。过去24小时内无新版本发布或预发布版本。

---

## 3. 项目进展

**今日无合并或关闭的 PR**，核心代码库没有代码变更合入。

唯一活跃的 PR 为 **#8137**（依赖更新），尚处于待合并状态：

- **#8137** [OPEN] `[dependencies, javascript] chore(deps): bump brace-expansion in /docs/internal/architecture-video` — 由 @dependabot[bot] 发起，将 `brace-expansion` 从 1.1.18 升级至 1.1.21（安全/稳定性修复，文档目录下的依赖）。
  https://github.com/nearai/ironclaw/pull/8137

该 PR 属于日常依赖维护，不涉及功能开发。总体而言，今日项目没有实质性的功能推进。

---

## 4. 社区热点

今日无高热度、多评论的讨论。两条新条目均为 0 评论、0 👍。

值得关注的信号是 **Issue #8136** — 虽然目前无人讨论，但它来自外部代理 @cairn-agent，提出的是一项架构层面的扩展诉求：

- **#8136** [OPEN] **Proposal: optional hosted-MCP Plazmi extension using declarative auth and egress**
  https://github.com/nearai/ironclaw/issues/8136

**诉求分析**：用户在提案中指出，IronClaw 的 Reborn 扩展指南已将 hosted-MCP 元数据、API key 认证和网络出口设计为声明式扩展面。该用户希望利用这现有“接缝”（seam），添加一个可选的 [Plazmi](https://plazmi.gg) 伴侣扩展，而不是把厂商特定逻辑写入宿主程序。初期范围是作为单独安装的扩展。

这反映出生态建设者对扩展机制**可插拔、声明式、避免宿主膨胀**的明确偏好，是一个值得维护者回应的架构反馈。

---

## 5. Bug 与稳定性

**今日无新的 Bug 报告**，无崩溃或回归问题。仓库在稳定性方面状态良好。

---

## 6. 功能请求与路线图信号

**功能请求：1 条新提案（#8136）**

- **#8136** 提出添加一个可选的 hosted-MCP Plazmi 扩展，使用声明式认证和出口，要求独立安装、不与宿主核心逻辑耦合。
  https://github.com/nearai/ironclaw/issues/8136

这不是一个需要写入核心的“新功能”，而是对**扩展机制的利用**。如果维护者认可该模式的合理性，则无需在下一版本中内置任何 Plazmi 相关代码；相反，该 Issue 可能指向一个路线图信号：**完善并正式化第三方扩展的开发接口与发布渠道**。结合当前只有 1 条相关 PR（依赖更新）的现状，建议维护者即使不认可该提案，也宜回复澄清扩展生态的边界与策略，以避免外部开发者走弯路。

---

## 7. 用户反馈摘要

今日无关联的 Issue/PR 评论可供提炼。但 #8136 的提案本身透露了使用场景与用户偏好：

- **使用场景**：用户希望在自己的项目中使用 Plazmi 这类 hosted-MCP 服务，并与 IronClaw 工作流集成。
- **对现有扩展机制的认可**：用户明确说 “Your Reborn extension guidance puts hosted-MCP metadata, API-key auth and egress in declarative extension surfaces” — 说明他们对现有扩展的设计文档是认可的，认为存在一个可用的接缝来挂载第三方服务。
- **诉求与不满**：用户不想为引入 Plazmi 而修改宿主代码或增加厂商逻辑，反映出对宿主**保持轻量、纯净**的期待，以及希望有一个更官方、更规范的第三方扩展接入流程。
- **挫败点（隐含）**：当前扩展生态可能缺少足够的示例或模板，导致外部开发者需要以提案形式询问如何实现这类扩展。这也是对文档/示例的一种隐性反馈。

---

## 8. 待处理积压

需要维护者关注的条目如下：

| 条目 | 类型 | 状态 | 关注原因 |
|------|------|------|----------|
| [#8136](https://github.com/nearai/ironclaw/issues/8136) | Issue 提案 | OPEN，0 评论 | 架构层扩展提案，目前无维护者回复；涉及第三方扩展机制，长期不回复可能流失外部生态贡献者 |
| [#8137](https://github.com/nearai/ironclaw/pull/8137) | 依赖更新 PR | OPEN，待合并 | 依赖安全/稳定性升级（brace-expansion 1.1.18 → 1.1.21），建议尽快合并以避免持续的安全扫描告警 |

另外，考虑到 #8136 来自外部代理账号（@cairn-agent），且仓库未设置 issue 模板强制标签，建议维护者尽快打上合适的标签（如 `proposal` / `extension-system`），并将其纳入 triage 流程，防止堆压。

---

**总体健康度评估**：今日项目无高风险变更，仓库稳定；社区声音较弱（0 讨论），但 #8136 是一个潜在的重要架构反馈，需要维护者在后续 48 小时内给出回应或至少分类归档，以维持良好的生态共建环境。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-10-14）

## 1. 今日速览

过去 24 小时项目活跃度较高，共产生 17 条 PR 更新（其中 8 条已合并/关闭、9 条待合并），另有 1 条新增安全相关 Issue。功能开发是今日主线：桌面伴侣（Desktop Companion）相关 PR 密集合并，涉及桌面端新会话标题生成、Composer、Open With 等多项体验优化；同时一个新的安全漏洞报告（#2851）对项目构成潜在风险，需优先跟进。依赖更新（Electron、Univer、KaTeX、Mermaid 等）仍在持续推进，但多条 PR 因重建导致重复待合并。整体来看，项目处于快速迭代期，工程化能力与安全意识需同步加强。

## 3. 项目进展

今日共合并/关闭 8 条 PR，其中 5 条为功能或修复类，3 条为依赖更新。重点进展如下：

- **桌面端多会话体验补全**（已合并）
  - [PR #2846](https://github.com/netease-youdao/LobsterAI/pull/2846)：为新建桌面会话异步生成简短标题，不阻塞首轮对话，失败静默保留原标题。覆盖所有 Agent，但排除 IM、定时任务与分叉场景。
  - [PR #2847](https://github.com/netease-youdao/LobsterAI/pull/2847)：新增 Desktop Companion Composer，为桌面伴生模式提供组合输入能力。
  - [PR #2848](https://github.com/netease-youdao/LobsterAI/pull/2848)：实现「打开方式」（Open With），在 Windows 平台强化文件/URI 与应用的关联处理。
  - 三者均由 @fisherdaddy 或 @btc69m979y-dotcom 提交，合并时间集中在 10-13，说明桌面端交互正在向「完整创作入口」方向快速演进。

- **专家广场（Expert Plaza）落地**（已合并）
  - [PR #2849](https://github.com/netease-youdao/LobsterAI/pull/2849)：新增可配置的专家广场，允许用户发现任务型 Agent 并以「可编辑的未发送提问」召唤进新会话；Kits 目录迁移至共享目录。专家内容通过 Overmind 机制单独维护和交付。

- **系统提示注入 Bug 修复**（已合并）
  - [PR #2812](https://github.com/netease-youdao/LobsterAI/pull/2812)：停止在首条消息中重复注入默认系统提示（`SYSTEM_PROMPT.md`）与 AGENTS.md 指令。该修复避免桌面端每会话首条消息出现冗余指令块，提升了提示词结构的干净度。

- **IM 后台清理 crash 修复**（已合并）
  - [PR #2850](https://github.com/netease-youdao/LobsterAI/pull/2850)：`IMCoworkHandler.destroy()` 在清理无 rejection 回调的后台投递累加器时不再抛异常，修复了 #926 的销毁时序问题。

- **依赖更新（旧编号关闭）**
  - [PR #2672](https://github.com/netease-youdao/LobsterAI/pull/2672)（mermaid 10.9.8 → 12.1.0）与 [PR #2459](https://github.com/netease-youdao/LobsterAI/pull/2459)（@nodesecure/js-x-ray 14.3.0 → 16.0.0）于 10-13 关闭，但二者新编号 PR（#2858、#2857）已重新提交并保持打开，依赖升级尚未真正合入主分支。

## 4. 社区热点

- **[Issue #2851 Security：Provider API Key 导出使用公开硬编码密码](https://github.com/netease-youdao/LobsterAI/issues/2851)**（今日唯一新增 Issue，0 评论，作者 @carfeii）
  - 这是今日最值得关注的安全报告。该 Issue 指出「Export Providers」功能虽使用 AES-GCM + PBKDF2（10 万次迭代）加密 API Key，但密码为公开硬编码值，因此任何获得导出文件的人都能轻易解密。虽然当前参与讨论人数不多，但属于高敏感度问题，可能直接影响密钥保管类用户信任度。
  - 背后诉求：用户希望导出加密具备**真正的保密性**（如用户自定义口令或系统密钥链），而非防君子不防小人的形式加密。该 Issue 已确认影响默认分支（2026-10-12 验证），预计会快速获得维护者回应并修复。

- **[PR #2860 feat: desktop companion](https://github.com/netease-youdao/LobsterAI/pull/2860)**（10-14 最新提交，覆盖 renderer/main/build/docs/cowork 及 Windows 平台）
  - 作为继 #2847/#2848 之后的又一项桌面伴侣能力，该 PR 目前缺少摘要说明，但从涉及的模块看，这是一次跨全栈的大功能更新。由于是当日新增且暂未合并，预计接下来的讨论和 review 热度会很高。

## 5. Bug 与稳定性

按严重程度排序如下：

| 严重程度 | 描述 | 状态 | 关联 PR/Issue |
|---------|------|------|--------------|
| 高 | **Provider API Key 导出加密可被公开密码解密**：任何获得导出文件者都能解密其中全部 API Key，涉敏感凭证泄露 | 已报告，未修复 | [Issue #2851](https://github.com/netease-youdao/LobsterAI/issues/2851) |
| 中 | **首条消息重复注入 AGENTS.md 系统指令**：桌面会话首条消息携带冗余指令块，增加 token 开销并可能干扰模型行为 | 已修复（#2812 已合并） | [PR #2812](https://github.com/netease-youdao/LobsterAI/pull/2812) |
| 低 | **IMCoworkHandler.destroy() 可能抛异常**：清理后台投递累加器时因缺少 rejection 回调导致崩溃 | 已修复（#2850 已合并） | [PR #2850](https://github.com/netease-youdao/LobsterAI/pull/2850)，修复 [#926](https://github.com/netease-youdao/LobsterAI/issues/926) |

## 6. 功能请求与路线图信号

今日动态释放的路线图信号集中于**桌面端工作站体验**与**生态扩展**两个方向：

- **桌面协同一体化**：从 #2846（标题生成）、#2847（Composer）、#2848（Open With）、#2860（Desktop Companion）可看到一条清晰的产品主线 —— 将 LobsterAI 从「聊天工具」升级为「桌面创作工作站」。尤其是 Windows 平台的多项改动，暗示对 Windows 桌面用户群体的重点倾斜。

- **可扩展的 Agent 市场**：PR #2849 的「Expert Plaza」是一个强信号。将专家内容外部化、通过 Overmind 独立交付，意味着项目正搭建类似「插件市场/技能商店」的生态基础设施。未来可能吸引第三方开发者贡献特定领域 Agent。

- **Provider 模型目录主动维护**：[PR #2859](https://github.com/netease-youdao/LobsterAI/pull/2859) 刷新了 DeepSeek、Moonshot、Qwen、Zhipu、MiniMax、Xiaomi 六家内置 Provider 的模型清单，并为已有用户做迁移（删除下架 id、注入新 id）。这显示了项目对模型迭代的跟进节奏，也暗示内置 Provider 的模型列表将进入常态化维护。

- **安全加固方向**：Issue #2851 虽为 Bug，但也指向一项潜在功能需求 —— 用户自定义导出加密口令或系统级密钥保护。考虑到安全类需求通常会被优先排期，建议关注后续是否转化为功能 PR。

## 7. 用户反馈摘要

| 用户 | 反馈要点 | 来源 |
|------|---------|------|
| @carfeii | 导出的 Provider 配置文件虽经 AES-GCM 加密，但密钥来自公开硬编码密码，安全保护形同虚设；任何接触文件者都能还原全部 API Key。该用户针对当前默认分支做了实证验证（2026-10-12），反馈可信度高、紧迫性强 | [Issue #2851](https://github.com/netease-youdao/LobsterAI/issues/2851) |
| @btc69m979y-dotcom | 在 PR #2846 提交中体现了「不阻塞首轮对话」「失败静默」的产品态度，即标题生成应作为后台增强而非用户流程的阻塞项，符合「最小打扰」的用户诉求 | [PR #2846](https://github.com/netease-youdao/LobsterAI/pull/2846) 提交说明 |
| @fisherdaddy | 在 PR #2812 中强调「首条消息不应重复系统指令」，间接反映用户对 token 浪费和指令冗余的敏感性 | [PR #2812](https://github.com/netease-youdao/LobsterAI/pull/2812) |

目前 Issue 评论区尚无外部用户互动，暂时缺少更广泛场景的功能痛点反馈；但安全类反馈通常仅需一例即可触发排期，值得特别留意。

## 8. 待处理积压

### 安全/稳定性优先
- **[Issue #2851](https://

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-10-14

## 1. 今日速览

Moltis 项目过去 24 小时整体活跃度处于**中等水平**，无新 Issue 报告、无新版本发布，但有两项功能型 PR 正在推进中。两项 PR（#1302、#1301）均围绕 **sub-agent 调用权限控制** 与 **Chat/子代理行为一致性** 展开，由同一作者 @ManuRakh 提交，目前均处于待合并状态，尚未进入合并阶段。Issues 侧完全静默，说明用户侧未报告新的问题或回归，社区讨论热度集中在功能增强方向。整体来看，项目正处在**功能深化期**，而非问题爆发期，健康度良好。

## 2. 版本发布

过去 24 小时无新版本发布，当前无最新 Release 信息。

## 3. 项目进展

今日无 PR 被合并或关闭，因此没有重大功能正式进入主线。不过，两项待合并的 PR 代表了项目近期的重要演进方向，值得关注：

| PR | 状态 | 内容概述 | 链接 |
|----|------|----------|------|
| #1302 | 🟡 待合并 | 新增 `agents.presets.<id>.spawn.allow` 配置，限制调用者只能 `spawn_agent` 到指定预设（如 org-chart / coordinator graphs），在 `resolve_preset` 阶段执行校验，并为调用方代理动态生成仅含合法目标的工具 schema/描述 | [查看 PR](https://github.com/moltis-org/moltis/pull/1302) |
| #1301 | 🟡 待合并 | 修复 Chat 与 sub-agent 之间的配置差异——当前部分预设字段（persona、system_prompt_suffix、delegate_only、preset model）仅影响 `spawn_agent` 子运行，直接与同名代理对话时行为不一致。PR 对齐两条路径，包括让 `build_sub_agent_prompt` 加载目标工作区配置等 | [查看 PR](https://github.com/moltis-org/moltis/pull/1301) |

两项 PR 均标注依赖关系，其中 #1302 的摘要明确写着 `Depends on:...`（原文截断，推测依赖 #1301 的行为对齐改动）。若两者合并，Moltis 将形成一套更严谨的 **agent 调用权限模型**，同时消除 Chat 与 sub-agent 两套执行路径的语义分裂，对构建 coordinator/worker 架构的用户是实质性改进。项目正在向「更可控、更一致」的 agent 编排方向稳步推进。

## 4. 社区热点

当前讨论最活跃的条目即为上述两项由 @ManuRakh 提交的 PR。虽然 Issue 侧无新讨论，但这组 PR 聚集了社区的主要注意力：

- **[PR #1302 — Preset spawn.allow 白名单机制](https://github.com/moltis-org/moltis/pull/1302)**：核心诉求是 **安全与职责边界**。在多代理系统中，调用方不应能随意 `spawn_agent` 到任意预设，需要一种声明式的授权机制来限制可调用的目标集合。这反映出社区对「多代理协作时的最小权限原则」有强烈需求。
- **[PR #1301 — Chat ↔ sub-agent 行为对齐](https://github.com/moltis-org/moltis/pull/1301)**：核心诉求是 **一致性与可预测性**。用户期望「直接与该代理聊天」和「通过 spawn_agent 调用该代理」得到的体验（persona、系统提示词、委派行为等）完全一致，否则 coordinator/worker 模式下的调试和运维会变得困难。

背后诉求可以归纳为：**随着 Moltis 被更多用于复杂多代理场景，社区正在推动项目提升代理间调用的安全性、可控性和行为一致性。**

## 5. Bug 与稳定性

过去 24 小时 **无新增 Bug、崩溃或回归问题** 报告。Issue 侧更新为 0，说明当前没有已知的严重稳定性问题被提交。项目处于相对稳定的状态。

## 6. 功能请求与路线图信号

今日无新功能请求（Issue 为 0），但从两项 PR 中可以捕捉到明确的路线图信号：

| 信号 | 来源 | 可能纳入的方向 |
|------|------|----------------|
| 预设级 spawn 白名单（spawn.allow） | [PR #1302](https://github.com/moltis-org/moltis/pull/1302) | 多代理安全模型，可能成为 1.x 版本的权限控制基础 |
| Chat 与 sub-agent 全字段对齐 | [PR #1301](https://github.com/moltis-org/moltis/pull/1301) | 执行路径统一化，减少「隐式不一致」 |

若两项 PR 被合并，可合理推测 Moltis 下一版本将重点强化 **多代理治理（governance）能力**——包括调用授权、配置继承和工具可见性控制。对于依赖 Moltis 构建复杂 agent 网络的开发者，这是值得关注的方向。

## 7. 用户反馈摘要

过去 24 小时无 Issue 评论数据可用，因此暂无新增的真实用户反馈可供提炼。从既有 PR 的内容看，作者 @ManuRakh 提交的两项改动均来自实际使用场景中的痛点（权限不受控、Chat/sub-agent 行为不一致），侧面说明**部分有深度的用户正在将 Moltis 用于生产级多代理编排**，并愿意通过代码贡献来回馈社区。

## 8. 待处理积压

当前最重要的待处理项是两项待合并的功能型 PR。两者均已创建 2 天（2026-10-12 创建，2026-10-13 最后更新），且存在依赖关系，建议维护者优先安排 review 以避免 diff 冲突扩大：

| 项目 | 创建/更新 | 备注 | 链接 |
|------|-----------|------|------|
| PR #1302 — spawn.allow 预设白名单 | 2026-10-12 / 10-13 | 功能完成，待审核；依赖 #1301 | [查看](https://github.com/moltis-org/moltis/pull/1302) |
| PR #1301 — Chat ↔ sub-agent 行为对齐 | 2026-10-12 / 10-13 | 涉及 prompt 构建逻辑，建议仔细回归测试 | [查看](https://github.com/moltis-org/moltis/pull/1301) |

此外，Issue 侧当前无长期未响应的积压问题（24 小时内新增/活跃/关闭均为 0），无其他需要提醒维护者关注的遗留项。

---

**总结**：Moltis 项目活跃度中等但不乏深度。两项待合并 PR 指向多代理场景下的权限控制与行为一致性，属于体系化能力建设而非零散修补。项目无新增 Bug、无版本发布、无用户投诉，整体健康度良好。下一步关键看这两项 PR 何时合入、以及合入后的回归测试效果。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (QwenPaw) 项目动态日报 — 2026-10-14

> 数据来源：[github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/QwenPaw) | 统计窗口：2026-10-13 至 2026-10-14

---

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共产生 18 条 Issue 更新（14 条新开/活跃、4 条关闭）和 39 条 PR 更新（19 条待合并、20 条已合并/关闭）。社区贡献者参与度显著，多位非核心成员提交了高质量修复 PR（如 #8229、#8226、#8227），覆盖聊天历史性能、配置持久化、控制台交互等多个方面。无新版本发布，但存在一个待合并的 v2.2.2 发布说明 PR（#7928），暗示版本迭代窗口临近。项目整体处于**密集迭代期**，功能开发（如 Python Code Mode、Hub 插件化、UIUX 基础建设）与 Bug 修复双线推进。

---

## 2. 版本发布

今日无新版本发布。需关注的是 PR #7928（`chore: release notes for v2.2.2`）自 9 月 22 日开启至今仍待合并，且 #8217、#8219、#8221 等多个控制台修复 PR 在今日合并/关闭，可能为 v2.2.2 的最终发布做准备。

---

## 3. 项目进展

今日合并/关闭的 PR 主要集中在**控制台体验、模型能力解析、架构基建**三个方向：

| 领域 | PR | 内容 | 规模 |
|------|-----|------|------|
| 控制台 | [#8217](https://github.com/agentscope-ai/QwenPaw/pull/8217) | 建立 UIUX 基础：为 lazyWithRetry 增加无副作用查询、优化 Push 轮询节流、为 30 个内置路由补充元数据、引入 Page Shell 渐进兼容 | XL |
| 控制台 | [#8219](https://github.com/agentscope-ai/QwenPaw/pull/8219) | 稳定分块恢复与重载配额：等待服务就绪后再恢复，避免自动重载配额被快速耗尽 | XL |
| 控制台 | [#8221](https://github.com/agentscope-ai/QwenPaw/pull/8221) | 约束后台轮询并发、解除模型选择器阻塞（未等待 provider 列表即渲染） | XS |
| 模型能力 | [#8190](https://github.com/agentscope-ai/QwenPaw/pull/8190) | 使用 `resolve_model_info()` 解析模型能力后再过滤历史媒体，修复文本模型（如 GLM-5.3）收到历史图片的问题 | S |
| 架构 | [#8128](https://github.com/agentscope-ai/QwenPaw/pull/8128) | **Skill Market 迁移至插件体系**：新增 `hub` 插件类型与 `register_market_provider()` API，支持自定义市场源 | XL |
| 依赖 | [#8220](https://github.com/agentscope-ai/QwenPaw/pull/8220) | agentscope 依赖升级至 2.0.10 | S |
| 观测性 | [#7964](https://github.com/agentscope-ai/QwenPaw/pull/7964) | 修复 Langfuse 工具观测从未记录 `output` 的问题（根因：`_drain` 提前返回 + ToolCoordinatorMiddleware 交互） | L |
| 工具流 | [#8212](https://github.com/agentscope-ai/QwenPaw/pull/8212) | 修复 GeneratorExit 期间的工具流收尾，避免 `RuntimeError: async generator ignored GeneratorExit` 日志 | XS |
| 网站 | [#8208](https://github.com/agentscope-ai/QwenPaw/pull/8208) | 更新官方博客 | XS |

**里程碑信号**：`#8128` 将 Skill 市场源插件化，与已关闭的 Issue #8015（自定义市场源）形成闭环，为内网/离线部署铺平道路。`#8217` 的 UIUX 基础建设则为控制台后续大规模交互重构奠定框架。

---

## 4. 社区热点

今日讨论热度最高的 Issue（按评论数排序）：

- **[#8071 [Feature] 插件级主题扩展点（语义令牌覆盖层）](https://github.com/agentscope-ai/QwenPaw/issues/8071)** — 3 条评论
  用户 @BeiMu-new 指出 #7741 引入的主题系统只允许用户选预设色调，插件作者仅有 `set(pluginId, { colorPrimary })` 一个旋钮，无法实现更深层定制。诉求核心：**插件需要与内置主题同级的语义令牌覆盖能力**，以实现组件级（如侧边栏、消息气泡）的视觉定制。

- **[#8171 [Bug] send_file_to_user 音频文件永久卡死会话](https://github.com/agentscope-ai/QwenPaw/issues/8171)** — 2 条评论
  这是 #7015 家族（已修复）的第三种拒绝形态。LM Studio 返回的 `At most 0 audio(s) may be provided` 未被音频回退/媒体能力分类器识别，导致工具结果中的音频 DataBlock 永久阻塞会话。属于**兼容性边角问题**，但后果严重。

- **[#8206 [Bug] Windows 上 qwenpaw-creator 项目删除总是失败](https://github.com/agentscope-ai/QwenPaw/issues/8206)** — 2 条评论
  项目自身日志文件被占用（WinError 5），导致含 open `creator.log` 的目录无法重命名/删除。**Windows 平台专属问题**，对使用自托管 Windows Server 的团队影响直接。

- **[#7056 [Feature] 后台任务回调/通知机制](https://github.com/agentscope-ai/QwenPaw/issues/7056)** — 2 条评论（8 月 15 日创建）
  用户要求为 `submit_to_agent` 派发的后台任务增加完成回调，而非只能轮询 `check_agent_task`。至今未关闭，属长期功能诉求。

**热点洞察**：社区关注点明显分为两派——**平台/部署层**（Windows 文件锁、内网市场源）与**开发者体验层**（插件主题扩展、后台任务回调）。两者均未被满足，是当前用户最迫切的需求方向。

---

## 5. Bug 与稳定性

今日报告的 Bug 按严重程度排序：

| 严重程度 | Issue | 描述 | 修复状态 |
|---------|-------|------|---------|
| 🔴 严重 | [#8171](https://github.com/agentscope-ai/QwenPaw/issues/8171) | 音频文件经 `send_file_to_user` 投递后，工具结果中的音频 DataBlock 被保留，导致会话**永久卡死**（LM Studio 400 拒绝未被分类器识别） | 无 PR，#7654（部分相关）仍开放 |
| 🔴 严重 | [#8228](https://github.com/agentscope-ai/QwenPaw/issues/8228) | 文件/截图工具输出以 **base64 存入 tool_result**，导致聊天历史响应超 10 MB，慢速网络下必然触发 30 秒控制台超时 | **已有修复 PR #8229**（截断超大工具输出） |
| 🟠 中等 | [#8206](https://github.com/agentscope-ai/QwenPaw/issues/8206) | Windows 上项目自身日志文件被占用（WinError 5），项目删除/重命名失败 | 无 PR，需平台相关修复（如日志句柄释放或延迟删除） |
| 🟠 中等 | [#8225](https://github.com/agentscope-ai/QwenPaw/issues/8225) | 保存 agent 配置触发的「零停机热重载」会**取消正在运行的 cron 任务**，且无任何提示 | 无 PR，需重载逻辑排除 cron 调度器 |
| 🟠 中等 | [#8222](https://github.com/agentscope-ai/QwenPaw/issues/8222) | `qwenpaw acp` 从不实例化 `PluginLoader`，导致 **ACP 会话中插件未加载**，跨进程任务回调无法唤醒 | 无 PR，需在 ACP 服务初始化时加载插件 |
| 🟠 中等 | [#8213](https://github.com/agentscope-ai/QwenPaw/issues/8213) | Hub 重启后不恢复 desired-running 的 Local 运行时，cron 任务静默跳过执行 | 无 PR，需状态持久化与启动恢复逻辑 |
| 🟡 一般 | [#8218](https://github.com/agentscope-ai/QwenPaw/issues/8218) | 默认 agent 无法修改模型，且默认模型 (`mimo-v2.5-free`) 已废弃，导致 `MODEL_EXECUTION_ERROR` | 无 PR，需更新默认模型并允许默认 agent 配置模型 |
| 🟡 一般 | [#8088](https://github.com/agentscope-ai/QwenPaw/issues/8088) | 图片消息被路由到 `chat_with_image` 子代理后陷入 Bash+PIL 裁剪循环，最终**静默取消**且无回复（已关闭） | 今日关闭，推测已处理 |

其他已关闭 Bug：#7981（chat_with_agent 前台超时误报"用户中断"）、#8186（控制台消息导航跳转覆盖滚轮滚动约 1.6 秒）。

---

## 6. 功能请求与路线图信号

| Issue | 需求 | 对应 PR / 状态 | 纳入下一版本可能性 |
|-------|------|---------------|-------------------|
| [#8071](https://github.com/agentscope-ai/QwenPaw/issues/8071) | 插件级主题扩展点（语义令牌覆盖层） | 无 PR | 中—主题系统 #7741 刚落地，扩展点设计需规划 |
| [#8233](https://github.com/agentscope-ai/QwenPaw/issues/8233) | 内置 CommandCode 和 Hugging Face provider 预设 | 无 PR，但现有 provider 目录已有先例 | 高—实现成本低（仅加预设条目+图标） |
| [#8126](https://github.com/agentscope-ai/QwenPaw/issues/8126) | skill-pool 下载改为可取消后台任务（进度+显式取消） | #8055 已移除事件循环冻结，#8126 为后续 | 中—当前同步请求仍会触发 30 秒超时 |
| [#8223](https://github.com/agentscope-ai/QwenPaw/issues/8223) | 主机级导航策略（侧边栏+设置共享） | **已有 PR #8230**（feat: host navigation allowlist） | 高—PR 已提交并在审查中 |
| [#8211](https://github.com/agentscope-ai/QwenPaw/issues/8211) | 受保护执行契约 prompt 的 i18n 支持 | 无 PR | 中高—已有滚动上下文管理的 i18n 机制可复用 |
| [#8015](https://github.com/agentscope-ai/QwenPaw/issues/8015) | 自定义 Skill/Plugin 市场源 | **已关闭**，由 #8128（Hub 插件化）实现 | ✅ 已解决 |

**路线图信号**：Hub 插件化（#8128）是当前架构演进的**主轴方向**——它将市场源从硬编码变为可插拔扩展点，与 #8071（插件主题扩展）、#8230（主机导航策略）共同勾勒出"**平台级可定制性**"的蓝图。此外，[#8224](https://github.com/agentscope-ai/QwenPaw/pull/8224)

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