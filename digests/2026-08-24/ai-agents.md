# OpenClaw 生态日报 2026-08-24

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-24 00:37 UTC

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

# OpenClaw 项目动态日报 — 2026-08-24

## 1. 今日速览

过去24小时，OpenClaw 项目保持高度活跃：Issue 更新 500 条（新开/活跃 456 条，关闭 44 条），PR 更新 500 条（待合并 402 条，已合并/关闭 98 条）。Issue 中约 91% 为活跃讨论，关闭率仅 8.8%，PR 合并/关闭率约 19.6%，两者均低于健康区间，存在一定积压压力。新版本发布为 0，项目处于版本发布前的密集修复与验证期。值得关注的是，今日出现 3 个 P0 级 Bug（SQLite 损坏复发、iOS 应用功能失效、totalTokens 膨胀修复不完整），多个 P1 问题仍处于 "needs-product-decision" 或 "linked-pr-open" 状态，整个项目在稳定性和交付可靠性上面临较大挑战。

---

## 2. 版本发布

过去 24 小时内无新版本发布。此前最新的验证版本为 2026.8.1-beta.2，目前仍在进行发布验证（见 #125626），尚未进入正式发布流程。

---

## 3. 项目进展

今日合并/关闭了 98 个 PR，其中以下重要变更值得关注：

### 已合并/关闭

| PR | 标题 | 说明 |
|---|---|---|
| [#126424](https://github.com/openclaw/openclaw/pull/126424) | fix(gateway): keep conversation delivery within agent bindings | 修复多智能体场景下会话投递超出绑定范围的问题，涉及大量渠道（Discord/Slack/Telegram 等）的交付安全 |
| [#128371](https://github.com/openclaw/openclaw/pull/128371) | fix(release): authorize focused beta evidence | 解决 beta.3 发布阻塞：使发布验证支持聚焦式证据，而非强制全量验证清单 |
| [#128422](https://github.com/openclaw/openclaw/pull/128422) | improve(gateway): overlap macOS system-CA warmup with startup | 将 macOS 系统 CA 预热与启动流程重叠，减少首次启动时最长约 5 秒的延迟 |
| [#128423](https://github.com/openclaw/openclaw/pull/128423) | fix(gateway): preserve mixed media failure receipts | 修复 WebChat 混合媒体回复中，失败附件的错误信息被静默丢弃的问题 |
| [#123975](https://github.com/openclaw/openclaw/pull/123975) | fix(scripts): clean up tsgo process trees on timeout or signal | 修复 tsgo 构建进程超时/信号后残留僵死进程树的问题 |
| [#125471](https://github.com/openclaw/openclaw/pull/125471) | fix(models): keep Claude CLI OAuth available in Control UI | 修复 Gateway 重启后 Claude CLI OAuth 刷新所有权丢失、Control UI 中显示缺失的问题 |
| [#120900](https://github.com/openclaw/openclaw/pull/120900) | feat(ui): review install policy warnings | 支持管理员在 Control UI 中审阅安装策略警告并决定是否继续安装 |
| [#116489](https://github.com/openclaw/openclaw/pull/116489) | feat(security): require acknowledgement for install policy warnings | 安全策略命令返回 `warn` 时，需要操作者输入目标名称确认后方可继续安装 |
| [#110294](https://github.com/openclaw/openclaw/pull/110294) | fix(ci): bound docs-sync publish repo git fetch with timeout | 为文档发布工作流的 git fetch 添加超时，防止无限阻塞 |

### 关键信号

- **安全与合规增强**：`install policy warnings` 的 UI 确认功能（#120900）与后端强制确认（#116489）已合入，为插件/技能安装增加了一道人工审阅环节
- **发布管道修复**：#128371 解决了 beta 发布验证的阻塞问题，表明团队正积极推动 2026.8.1 正式版落地
- **性能优化**：#128422 优化了 macOS 首次启动路径，属启动性能改进

---

## 4. 社区热点

### 今日最活跃 Issue

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#125626](https://github.com/openclaw/openclaw/issues/125626) Release validation: v2026.8.1-beta.2 | 18 | 发布验证协调帖，多位测试者在同一线程中报告验证结果，反映社区对正式版发布的关注 |
| [#119796](https://github.com/openclaw/openclaw/issues/119796) Windows vitest teardown EBUSY on agent state DB | 15 | Windows 平台上测试套件因 SQLite 文件句柄未释放而失败，已关闭 |
| [#121953](https://github.com/openclaw/openclaw/issues/121953) Cron agent stalls on DeepSeek | 13 | DeepSeek API 对 `[cron:` 前缀消息降级处理，导致定时任务延迟数十秒至数分钟 |
| [#109490](https://github.com/openclaw/openclaw/issues/109490) Client-delegated message tool interrupts turn | 12 | 客户端委托的动态工具返回 `terminate: true` 后，智能体被错误中断，承诺的工作未执行（已关闭，标记为重复） |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) A2A sessions_send duplicate messages | 12 | Agent A 调用 `sessions_send` 给 Agent B 后，B 反向调用产生重复消息；自 3 月 8 日提出至今已近半年仍在讨论 |

### 解读

讨论热度最高的 Issue 集中在**跨智能体消息路由**（#39476、#109490）与**定时任务可靠性**（#121953）两大主题。这两类问题直接影响实际业务场景中多智能体协作和自动化调度的稳定性，社区关注度与诉求均较高。#39476 自 3 月提出以来已积累 12 条评论但仍在开放状态，提示维护者应优先推进修复方案。

---

## 5. Bug 与稳定性

### P0 级别

| Issue | 标题 | 状态 | 是否有 Fix PR |
|---|---|---|---|
| [#126821](https://github.com/openclaw/openclaw/issues/126821) | SQLite corruption recurs on pristine rebuilt DBs within 15–24h (2026.8.1-beta.2, WSL2) — 5 events in 5 days, incl. a "paralyzed gateway" mode | OPEN | 无 |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | totalTokens inflation still reproduces on 2026.8.1-beta.2 — #123065 fix only covers `api === "cli"` | OPEN | 无 |
| [#108520](https://github.com/openclaw/openclaw/issues/108520) | iOS app update breaks Talk Mode and chat — gateway connects but no functionality | OPEN | 无 |

### P1 级别

| Issue | 标题 | 是否有 Fix PR |
|---|---|---|
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout | 有（#128116 相关） |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool child processes leak as zombies, causing runtime degradation | 无 |
| [#126246](https://github.com/openclaw/openclaw/issues/126246) | Telegram durable outbound deliveries stuck in send_attempt_started, lost on restart | 无 |
| [#127948](https://github.com/openclaw/openclaw/issues/127948) | WhatsApp group replies render as BLANK bubbles when quote cache expired | 无 |
| [#111944](https://github.com/openclaw/openclaw/issues/111944) | Codex commentary not delivered to Telegram progress or block streaming | 无 |
| [#111857](https://github.com/openclaw/openclaw/issues/111857) | CLI budget reopens full compacted JSONL branch, inflating prompt estimates | 无 |
| [#112668](https://github.com/openclaw/openclaw/issues/112668) | sessions_yield abort-settle timeout still drops subagent announce | 无 |

### 今日新增/最新更新且值得关注的 Bug

- **telegram 消息投递卡死**（[#126246](https://github.com/openclaw/openclaw/issues/126246)）：回复停留在 `send_attempt_started` 状态，重启后消息丢失，暂无 fix PR
- **WhatsApp 群组回复空白气泡**（[#127948](https://github.com/openclaw/openclaw/issues/127948)）：引用缓存过期后，群聊回复变成空白气泡，属消息有效性缺陷

### 稳定性趋势

今日数据中，P0 级 Bug 为 3 个，其中 SQLite 损坏（#126821）与 totalTokens 膨胀（#125333）均指向 2026.8.1-beta.2 版本的已知缺陷修复不完整，提示该 beta 版本在存储层和 token 计数方面仍存在系统性风险。此外，多个 P1 Bug 尚未有修复 PR，积压风险较高。

---

## 6. 功能请求与路线图信号

### 新提出的功能需求（近一周）

| Issue | 标题 | 说明 |
|---|---|---|
| [#127948](https://github.com/openclaw/openclaw/issues/127948) | WhatsApp 群组回复空白气泡 | 严格说是 Bug，但暴露了引用缓存设计缺陷 |

### 值得关注的既有功能请求

| Issue | 标题 | 潜力 |
|---|---|---|
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | Add `/models test-fallback` command to verify fallback chain | 用户期望在故障发生前验证模型回退链，11 条评论，1👍 |
| [#72591](https://github.com/openclaw/openclaw/issues/72591) | Per-agent MCP server scoping | 12 个 agent + 10 个 MCP server 时需启动 120 个进程，资源浪费严重，已有 PR 线索较少 |
| [#91455](https://github.com/openclaw/openclaw/issues/91455) | Docs update for Kubernetes | 用户反馈 K8s 安装文档存在描述不清晰的问题 |
| [#75947](https://github.com/openclaw/openclaw/issues/75947) | UI quality update based on UX scoring | 用户对 Control UI 的可读性和导航体验不满意 |

### 与 PR 的关联判断

- **Workboard 列折叠**（[#128115](https://github.com/openclaw/openclaw/pull/128115)）与 **slash 命令参数**（[#123356](https://github.com/openclaw/openclaw/pull/123356)）已处于待合并状态，预计会被纳入下一版本
- **模型回退测试命令**（#6599）今日新增 1 条评论，仍处于活跃讨论，尚无对应 PR，建议维护者关注

---

## 7. 用户反馈摘要

### 高频痛点

1. **消息投递可靠性**（多平台）：Telegram（#126246）、WhatsApp（#127948）、Slack（#96692、[#102380](https://github.com/openclaw/openclaw/issues/102380)）、Discord（#111944）等多个渠道均出现消息无法投递、重复投递或显示异常的问题，用户对跨平台一致性体验有较高期望

2. **Windows 平台兼容性**（[#119796](https://github.com/openclaw/openclaw/issues/119796)、[#91144](https://github.com/openclaw/openclaw/issues/91144)）：多个 Windows 原生环境下的测试、调度任务、文件锁问题持续被报告，Windows 支持成熟度仍待提升

3. **配置与诊断体验**（[#60612](https://github.com/openclaw/openclaw/issues/60612)）：用户手动修改配置文件后会被 `openclaw doctor` 重置，反馈"警告无法被修复"；NVM node 路径问题长期存在

4. **上下文管理困惑**（[#108215](https://github.com/openclaw/openclaw/issues/108215)）：上下文使用率从 57% 骤降至 13% 且未触发压缩，用户对 token 变化原因感到困惑

5. **权限与安全边界**（[#79451](https://github.com/openclaw/openclaw/issues/79451)、[#78493](https://github.com/openclaw/openclaw/issues/78493)）：`tools.deny` 在 claude-cli 后端不生效、`sudo openclaw update` 导致文件所有权混乱，用户对安全机制的一致性提出质疑

### 用户正面反馈

- 多个 Issues 的关闭原因标记为 `already-fixed`（[#112246](https://github.com/openclaw/openclaw/issues/112246)、[#111745](https://github.com/openclaw/openclaw/issues/111745)、[#111969](https://github.com/openclaw/openclaw/issues/111969)），说明修复效率得到用户认可
- [#109490](https://github.com/openclaw/openclaw/issues/109490) 被标记为关闭且 close:duplicate，用户对问题分类和处理方式没有提出异议

---

## 8. 待处理积压

### 长期未响应的 Issue

| Issue | 提出时间 | 标题 | 状态 |
|---|---|---|---|
| [#39476](https://github.com/openclaw/openclaw/issues/39476) | 2026-03-08 | A2A sessions_send 重复消息 | 近 6 个月无 fix PR |
| [#72591](https://github.com/openclaw/openclaw/issues/72591) | 2026-04-27 | Per-agent MCP server scoping | 近 4 个月无 fix PR |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | 2026-02-01 | `/models test-fallback` 命令 | 近 7 个月无 fix PR |
| [#60612](https://github.com/openclaw/openclaw/issues/60612) | 2026-04-04 | Doctor 警告 NVM node 无法修复 | 近 5 个月无响应 |
| [#78493](https://github.com/openclaw/openclaw/issues/78493) | 2026-05-06 | `sudo openclaw update` 导致文件所有权混乱 | 近 4 个月无 fix PR |
| [#79451](https://github.com/openclaw/openclaw/issues/79451) | 2026-05-08 | tools.deny 在 claude-cli 后端不生效 | 已 closed（stale），但核心问题未解决 |

### 需要警惕的长期 PR

| PR | 提出时间 | 说明 |
|---|---|---|
| [#121576](https://github.com/openclaw/openclaw/pull/121576) | 2026-08-10 | 修复 stripModelSpecialTokens 插入多余空格问题，覆盖大量渠道，已 14 天未合入 |
| [#123209](https://github.com/openclaw/openclaw/pull/123209) | 2026-08-13 | 修复 channel schema 所有权归属问题，标记为 "waiting on author"，已 11 天 |
| [#102380](https://github.com/openclaw/openclaw/issues/102380)

---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-24

## 1. 今日速览

过去 24 小时 NanoBot 项目保持高度活跃：共 19 条 PR 动态，其中 5 条已合并/关闭、14 条仍处于待合并状态，覆盖 WebUI、Agent 运行时、TUI、Docker 与新增 Linear 频道集成等多个模块。Issue 侧相对平稳，2 条更新中 1 条关于 Docker 环境下 OAuth 登录失败的 Bug 已关闭，另有 1 条新功能请求（文档预览）被提出。无新版本发布，项目正处于功能密集开发与合并窗口期，整体健康度良好。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日共有 5 条 PR 被合并/关闭，推进了以下关键能力：

### 3.1 回合恢复机制落地（#5420，已合并）
用户控制的 WebSocket 回合恢复功能正式合入：为中断的会话持久化窄边检查点，WebUI 和 TUI 中提供显式的 **Continue / Dismiss** 恢复选项，且不会自动恢复；已持久化的最终答案无需再次调用模型即可恢复。
🔗 https://github.com/HKUDS/nanobot/pull/5420

### 3.2 WebUI 回答渲染修复（#5491，已合并）
修复多轮 answer → tool → answer 链路中模型回答文本被错误折叠进推理内容区域的问题。现在回答片段会合并为一条最终消息，推理/工具活动保持在独立区域内展示，同时保留 fork 边界所需的原始消息计数。
🔗 https://github.com/HKUDS/nanobot/pull/5491

### 3.3 进程身份可观测性（#5492，已合并）
CLI 进程现在按角色命名（`nanobot-agent`、`nanobot-webui`、`nanobot-gateway`），源码启动的 Bun 子进程显示为 `nanobot-tui` 而非泛化的 `bun`，Windows 下保留 `nanobot.exe` 身份，便于运维监控和问题定位。
🔗 https://github.com/HKUDS/nanobot/pull/5492

### 3.4 Docker OAuth 数据持久化修复（#5445，已合并）
修复 Docker 镜像中 OAuth 客户端数据未写入挂载目录的问题：XDG 应用数据现指向 Nanobot 实例目录，入口降权后凭据仍可写，容器重建后 OAuth 登录态可保留。
🔗 https://github.com/HKUDS/nanobot/pull/5445

### 3.5 死代码清理（#5475，已合并）
移除零消费者的运行时/设置/渠道/测试辅助函数、未使用的 `websocket-client` 依赖、无效配置字段，并收敛 WebUI/TUI 导出符号，降低维护成本。
🔗 https://github.com/HKUDS/nanobot/pull/5475

这 5 项合并覆盖了体验修复、可运维性和基础设施清理，加上 14 条待合并 PR 的储备，项目正在向更稳定的方向快速演进。

---

## 4. 社区热点

### #5444 — Docker 中 OpenAI OAuth 登录失败（已关闭，2 条评论）
这是过去 24 小时唯一有评论互动的 Issue。用户报告在 Docker 中运行 OAuth 登录流程时，虽然获得了 `auth/callback?code=...` 重定向 URL，但后续换取 token 步骤失败。该 Issue 创建于 8 月 19 日，昨日被关闭，对应修复 PR（#5445）已在同日合并，形成了完整的 "报告 → 修复 → 关闭" 闭环。背后的核心诉求是 **Docker 部署场景下的配置持久化与权限正确性**，这也是容器化部署最常见的痛点。
🔗 https://github.com/HKUDS/nanobot/issues/5444

### #5493 — 增加 html/.txt/.md 文档预览（新开，0 条评论）
新提出的功能请求，希望直接在频道/WebUI 中预览 HTML、文本和 Markdown 文档，并给出了原生 iframe + srcdoc 的安全沙箱方案。目前尚无讨论，但作为新建 Issue 值得后续跟进。
🔗 https://github.com/HKUDS/nanobot/issues/5493

---

## 5. Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 相关 PR |
|---|---|---|---|
| 高 | Docker 中 OAuth 登录凭据无法在容器重建后保留，导致登录失败 | 已修复（Issue 已关闭） | #5445 ✅ 已合并 |
| 中 | `AgentRunner` 的 wall-clock 超时保护只覆盖了 `_request_model()`，无工具请求（malformed-call 恢复、空响应终结等）直接调用 provider，可能导致回合卡死 | 修复 PR 待合并 | #5496 🔄 |
| 中 | OpenAI Codex provider 每次请求都重建 TLS 上下文，高并发下造成性能瓶颈和响应迟缓（py-spy 抓到 10 秒卡顿） | 修复 PR 待合并 | #5500 🔄 |
| 低 | WebUI 中一个回合聚合多次 prompt-token 报告时，`in`/`out`/`cache` 显示不清晰，用户难以区分累计输入与最终请求上下文 | 修复 PR 待合并 | #5490 🔄 |
| 低 | 回答文本被错误放进 reasoning 区域，影响阅读 | 已修复（已合并） | #5491 ✅ 已合并 |

总结：今日无新增 Bug 类 Issue 报告，5 个已知问题中 2 个已修复合入、3 个修复 PR 待合并，稳定性趋势向好。

---

## 6. 功能请求与路线图信号

### 新功能请求
- **#5493 文档预览**：用户希望支持 html/.txt/.md 文件的直接预览，属于 WebUI/频道体验增强。
  🔗 https://github.com/HKUDS/nanobot/issues/5493

### 待合并 PR 中的路线图信号

| 功能方向 | PR | 说明 |
|---|---|---|
| **配置体验统一** | #5497、#5498 | 新增传输无关的全量配置编辑器契约，并在 Agent TUI 中提供 schema 驱动的 `/config` 界面，支持乐观更新与密钥脱敏快照——预示着下一版本将大幅改善配置管理体验 |
| **原生 Linear 集成** | #5495 | 新增 Linear Agent 频道：OAuth PKCE + 每 workspace 轮换 token、签名 webhook、SQLite 去重队列、WebUI 配置流程——外部协作工具接入扩展 |
| **类型化 LLM 用量契约** | #5480 | 将动态 provider usage 字典重构为不可变类型化契约，统一 OpenAI/Anthropic/Bedrock 的 token 与缓存语义——为多 provider 用量统计打基础 |
| **TUI 空会话保护** | #5499 | 新聊天在收到首条消息前保持 transient，避免空会话同步到工作区 |
| **MCP 体系增强** | #5386、#5388 | 保留 MCP Apps 工具元数据与富结果、为模型可见的 MCP schema 增加可选字节预算 |
| **Matrix 验证完善** | #5385 | 完整实现 Element SAS 请求流程 |
| **子代理部分结果语义** | #5152 | 通知模型还有子代理在运行，避免过早推断 |

其中 #5497/#5498 组成的配置编辑器、#5495 的 Linear 频道是较大的功能块，预计会进入近期版本规划。

---

## 7. 用户反馈摘要

- **Docker OAuth 痛点（#5444）**：用户 Bennett-Yang 在 Docker 部署中尝试 OpenAI OAuth 登录，流程走到 "Exchanging authorization code for tokens..." 后失败。结合修复 PR 的内容判断，根因是容器内 XDG 数据目录未持久化、且以非 root 用户运行时凭据不可写。这是典型的容器化部署权限/持久化问题，已在本次修复中解决。
  🔗 https://github.com/HKUDS/nanobot/issues/5444

- **文档预览诉求（#5493）**：用户 john00010 希望方便地在应用内预览 HTML/TXT/Markdown 文档，并主动给出了 "iframe + srcdoc 实现安全沙箱" 的技术方案，说明该用户具备一定开发能力，且关注安全隔离。这一请求暗示实际使用中存在大量文档查看场景，可能与知识库/资料管理类用法相关。
  🔗 https://github.com/HKUDS/nanobot/issues/5493

---

## 8. 待处理积压

以下为长期未合并或存在冲突标记、需要维护者关注的重点 PR：

### 8.1 超两周长时未合并的 PR
- **#5152** `fix(subagent): mark partial completion results` — 创建于 7 月 28 日，已近一个月，涉及子代理部分完成结果语义，需要 Code Review 推进。
  🔗 https://github.com/HKUDS/nanobot/pull/5152

### 8.2 存在冲突标记的 PR
以下 3 条 PR 均被标记为 `conflict`，需要解决冲突或协调合并顺序：
- **#5480** `refactor(providers): define typed LLM usage contract`（8 月 21 日创建）
  🔗 https://github.com/HKUDS/nanobot/pull/5480
- **#5467** `fix(tui): preserve launch context in resume commands`（8 月 21 日创建）
  🔗 https://github.com/HKUDS/nanobot/pull/5467
- **#5430** `fix(agent): release completed task groups`（8 月 18 日创建，已 5 天未合并，存在会话内存泄漏隐患）
  🔗 https://github.com/HKUDS/nanobot/pull/5430

### 8.3 8 月中旬以来的 MCP/Matrix 相关 PR
- **#5385** Matrix SAS 验证流程（8/13）
- **#5386** MCP Apps 结果元数据保留（8/13）
- **#5388** MCP schema 字节预算（8/13）
这三条 PR 已积压 10 天，涉及 MCP 与 Matrix 生态集成，建议安排 Review。
  🔗 https://github.com/HKUDS/nanobot/pull/5385
  🔗 https://github.com/HKUDS/nanobot/pull/5386
  🔗 https://github.com/HKUDS/nanobot/pull/5388

---

**整体评估**：项目处于高活跃开发期，PR 吞吐量大（24 小时 19 条动态），修复类 PR 从提交到合并的周期较短（如 #5445 从创建到合并约 4 天），工程效率良好。需关注 3 条带 conflict 标记的 PR 的合并顺序，以及 8 月中旬 MCP/Matrix 积压 PR 的 Review 进度，避免技术债累积。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-24

## 1. 今日速览

过去 24 小时内，ZeroClaw 仓库保持高水平活跃：**Issues 更新 50 条**（新开/活跃 38 条，关闭 12 条），**PR 更新 50 条**（待合并 45 条，已合并/关闭 5 条），**无新版本发布**。社区讨论集中在一批重大架构 RFC（运行时会话、附件架构、Gemini Live 实时语音信道），其中多条 RFC 已进入多轮修订，讨论热度较高。维护侧并行推进多项规模较大的重构与修复（RPC 通道暴露、cron 策略修复、provider 生命周期核算、shell 审批路由恢复等），整体项目推进节奏紧凑，属于典型的“架构设计密集期 + 代码清理/修复期”并存的阶段。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

虽无新版本，但处于待合并状态的核心 PR 有 45 条，其中多项已完成关键修复并等待合入；过去 24 小时内 5 条 PR 进入已合并/关闭状态，其中最重要的进展是：

- **fix(channels): make the filesystem listener cancellation-aware**（[#10217](https://github.com/zeroclaw-labs/zeroclaw/pull/10217)）— 已关闭。该 PR 修复了 filesystem channel 在异步循环中调用阻塞 `recv()` 导致 Tokio worker 无法让出、阻止 supervisor 关停的问题。对应的 Issue [#9666](https://github.com/zeroclaw-labs/zeroclaw/issues/9666) 也标记为已解决。这是社区用户报告的关键稳定性修复。

此外，一批大型 PR 在今日继续得到更新，包括：

- **fix(rpc): expose configured channels to sessions**（[#10246](https://github.com/zeroclaw-labs/zeroclaw/pull/10246)）— 将已配置的 channel 句柄注入新/恢复的 RPC 代理，并补充 `rpc` 反向通道；
- **fix(runtime/cron): map command patches onto agent job prompts**（[#10258](https://github.com/zeroclaw-labs/zeroclaw/pull/10258)）— 修复 `zeroclaw cron update --command` 在 agent job 上产生无效列写入与 shell-policy 误检的问题；
- **fix(cron): preserve scheduler workspace policy**（[#10253](https://github.com/zeroclaw-labs/zeroclaw/pull/10253)）— 停止在 cron 执行阶段重复解析 `SecurityPolicy`，确保调度器策略不被误覆盖；
- **feat(memory): add category-scoped cross-agent grants**（[#10252](https://github.com/zeroclaw-labs/zeroclaw/pull/10252)）— 增加带类别维度的跨代理读权限，同时保留旧字符串条目的宽松兼容；
- **fix(gateway): redact duplicate idempotency keys from logs**（[#10256](https://github.com/zeroclaw-labs/zeroclaw/pull/10256)）— 避免将调用方控制的 `X-Idempotency-Key` 写入重复请求结构化日志，属于日志泄露风险修复。

整体来看，项目在“回归修复 + 安全加固 + 平台能力边界”三个维度同时推进，长期积压的稳定性问题正在被逐一消化。

## 4. 社区热点

讨论最激烈、评论数最高的 Issues 全部集中在 RFC 架构造设计讨论上：

- **[[OPEN] RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)**（评论 25，最高）— 该 RFC 建议让 runtime 持有会话所有权，并通过 transport surface adapters 作为统一入口（所有迁移入口统一提交 `InboundAction`），涉及 channel/gateway/runtime 的架构边界调整，目前仍处于作者修订阶段。
- **[[OPEN] RFC: Unified attachment architecture for web chat and channels](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)**（评论 19）— 针对 web chat 及各 channel 间附件处理碎片化的统一架构提案，修订历史持续更新。
- **[[OPEN] RFC: Decouple memory lifecycle policy from storage backends](https://github.com/zeroclaw-labs/zeroclaw/issues/6850)**（评论 17）— 讨论将可拔插存储与内存 life-cycle 策略解耦，重建操作者在不同 gateway/channel 复用之难。
- **[[OPEN] RFC: Realtime speech-to-speech channel for Gemini Live](https://github.com/zeroclaw-labs/zeroclaw/issues/8780)**（评论 17）— 已修订至 v2，主张将 Gemini Live 作为可选特性门控的实时语音通道，并以 broker 契约重构。

此外，[维护者 RFC 决策队列 #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 持续作为托管者顶层追踪，收集多篇 RFC 决策，评论 13 条，反映社区有大量待决策架构问题。热点的共同点在于：开发者已不满足与单一 channel/backend 的实现细节，更期待 Zeroer 在运行时、会话、附件、memory、realtime 等方面给出统一的架构标准。

## 5. Bug 与稳定性

- **（已有待合并修复）** **filesystem listener 阻塞导致 shutdown/supervisor 卡死**：Issue [#

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026-08-24

## 1. 今日速览

过去 24 小时 PicoClaw 整体活跃度偏低，仓库动作以自动化 stale 清理为主：2 个 Issue 和 5 个 PR 均因长时间无维护者响应被自动关闭，没有出现新的合并事件，也没有新版本发布。真正的“新动向”是 1 个新提交的 PR（#3344，Remote Agent 手机配对），以及 1 个已悬置近两个月的 DeltaChat 重构 PR（#3222）仍在等待评审。值得警惕的是：被 stale 关闭的 5 个 PR 中包含 WhatsApp 渠道修复、SSRF 加固、前缀缓存优化等实质改动，建议维护者尽快重新拾起，避免修复成果流失。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

过去 24 小时**没有代码被合并**。原仓库中的 5 个 PR 被标记为 stale 并自动关闭，均较早前提交、等待评审时间过长：

- [#3344](https://github.com/sipeed/picoclaw/issues/3344) 维护了 5 个 PR：
  - [fix(weixin): use CreateSafeHTTPClient for media downloads](https://github.com/sipeed/picoclaw/pull/3324

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-24

## 1. 今日速览

过去 24 小时内，NanoClaw 项目保持极高的开发活跃度：累计 50 条 PR 更新（其中 20 条已合并/关闭，30 条待合并），6 条 Issue 更新（其中 5 条活跃、1 条已关闭）。核心团队围绕 Chat SDK 4.32.0 升级、pnpm 依赖门禁修复、版本发布等展开集中交付；与此同时，社区与用户方面涌现出 2 条 macOS 特定环境问题，以及多个高严重度的稳定性 bug。v2.3.0 的 release PR 已合并关闭，新版本发布进入最终落地阶段。整体来看，项目处于功能合并与稳定性修复并行的健康迭代节奏。

## 2. 版本发布

官方 Releases 列表中暂无新版本 artifact。不过，v2.3.0 的发布 PR 今日已合并（#3495），该 PR 将所有 `[BREAKING]` 条目及迁移路径一并带入版本说明。值得关注的是同一批次的 #3496 将容器镜像重新固定至 `hardened-2026-08-23`，该举措是为了修复 2026-08-21 起新安装环境 setup 失败的问题。正式发布物预计将随后上线。

- [PR #3495: chore(release): v2.3.0](https://github.com/nanocoai/nanoclaw/pull/3495)
- [PR #3496: versions: repin to hardened-2026-08-23](https://github.com/nanocoai/nanoclaw/pull/3496)

## 3. 项目进展

今日合并/关闭的重要 PR 集中在以下方向：

| PR | 内容 | 状态 |
|----|------|------|
| [#3495](https://github.com/nanocoai/nanoclaw/pull/3495) | v2.3.0 release PR | 已合并 |
| [#3496](https://github.com/nanocoai/nanoclaw/pull/3496) | 修复 hardened 镜像安装失败（重新固定至 2026-08-23） | 已合并 |
| [#3466](https://github.com/nanocoai/nanoclaw/pull/3466) | Chat SDK 核心升级至 4.32.0，固定全部 Chat SDK channel skill 版本 | 已合并 |
| [#3467](https://github.com/nanocoai/nanoclaw/pull/3467) | 支持 channel adapter 声明打字指示器生命周期 | 已合并 |
| [#3469](https://github.com/nanocoai/nanoclaw/pull/3469) | 修复 pnpm `minimumReleaseAge` 门禁未生效的问题 + 回归测试 | 已合并 |

这批 PR 的核心价值体现在三方面：一是锁定了 Chat SDK 4.32.0，消除了多个 channel 间依赖漂移；二是修复了 pnpm 依赖发布年龄门禁未能实际生效的配置漏洞；三是打通了 v2.3.0 的发布路径。此外，main 分支上还存在一个三分支堆叠 PR 链（#3490 → #3491 → #3492），将 Chat SDK 4.32.0 升级、channel 打字指示器声明能力、以及 pnpm 门禁修复同时推入主干，是今日最大的一笔功能推进。

- [PR #3490: fix(deps): bump chat core to 4.32.0 and pin every Chat SDK channel skill to it](https://github.com/nanocoai/nanoclaw/pull/3490)
- [PR #3491: feat(typing): let a channel adapter declare its typing-indicator lifetime](https://github.com/nanocoai/nanoclaw/pull/3491)
- [PR #3492: fix(pnpm): turn the minimumReleaseAge gate on](https://github.com/nanocoai/nanoclaw/pull/3492)

## 4. 社区热点

今日讨论最活跃的 Issue 为 **#2404**（4 条评论），这是一个持续三个月以上的老问题：当 agent 在同一回合内既调用 `send_message` MCP 工具、又使用 `<message>` 块输出同一文本时，消息会被重复投递。该问题自 2026-05-10 创建至今仍未关闭，社区在昨日再次追加了讨论，反映了多输出路径冲突对实际使用体验的持续影响。

在 PR 侧，最受关注的是核心团队的三层堆叠 PR 链（#3490-3492）及对应的 registry twin（#3465-#3471）。这批 PR 将 Chat SDK 4.32.0 升级、打字指示器生命周期声明、pnpm 门禁修复捆绑推进，并在 `main`/`providers`/`channels` 三个分支间做分拆合并，引发了社区对合并顺序与 CI 策略的关注。

- [Issue #2404: Double delivery when agent uses send_message MCP tool and <message> blocks](https://github.com/nanocoai/nanoclaw/issues/2404)

## 5. Bug 与稳定性

按严重程度排列，今日报告的关键问题如下：

**高严重度：**

- **主机清扫（host-sweep）心跳死锁（#3455）**：claim 之后、首个 SDK 事件到来之前，心跳未更新，导致 claim-stuck 看门狗误杀合法运行中的进程，且在后续回合中重复发生，没有自愈机制。作者@DawoudIO 评价为“可永久阻塞会话回复”。**当前无关联 fix PR。**
  [Issue #3455](https://github.com/nanocoai/nanoclaw/issues/3455)

- **Discord 审批卡片按钮参数冗余导致静默拒绝+重复发送（#3456）**：`ask_question` 卡片每个按钮同时设置了 `id` 和 `value`，导致 Discord custom_id 被污染，每次点击都解析到错误选项。该问题已关闭，修复已合入。
  [Issue #3456](https://github.com/nanocoai/nanoclaw/issues/3456)

- **update-nanoclaw 控制器在 macOS 上失效（#3498）**：`path.resolve()` 未考虑 `/var` → `/private/var` 的符号链接，导致文档中的更新调用在 macOS 上变成 no-op，且 `hasSafeStatePaths` 安全检查同样失效。8 月 24 日新开，尚无 fix PR。
  [Issue #3498](https://github.com/nanocoai/nanoclaw/issues/3498)

- **better-sqlite3 在 macOS 上段错误（#3497）**：`better-sqlite3@13.0.3` 在不满足 Node >=22.14.0 的环境上打开数据库时直接崩溃，且声明的最低版本为 `>=22`，导致安装可通过所有检查但实际无法工作。8 月 24 日新开，尚无 fix PR。
  [Issue #3497](https://github.com/nanocoai/nanoclaw/issues/3497)

**中严重度：**

- **session-db 唯一约束冲突导致的发送崩溃（#3457）**：`insertMessage()` 使用普通 `INSERT`，当同一消息 ID 重试投递时触发 UNIQUE 约束错误，表面表现为反复的 “Message delivery failed, will retry”，并可能加重重复消息症状。**当前无关联 fix PR。**
  [Issue #3457](https://github.com/nanocoai/nanoclaw/issues/3457)

**遗留问题（5 月创建，仍在活跃讨论）：**

- **MCP 工具与 `<message>` 块重复投递（#2404）**：根因指向 MCP server 以独立子进程运行，与主轮询路径产生重复输出。长期未关闭，昨日仍有新评论。
  [Issue #2404](https://github.com/nanocoai/nanoclaw/issues/2404)

## 6. 功能请求与路线图信号

今日出现了数个可能进入下一版本的新功能信号：

- **手机配对远程 Agent（#3494）**：新增 `gbr/1` 协议适配器，允许手机通过二维码或 8 位配对码作为旁观者连接桌面 agent，仅绑定回环地址。该 PR 尚未合并，但扩展了远程 agent 的使用场景。
  [PR #3494](https://github.com/nanocoai/nanoclaw/pull/3494)

- **Codex provider 结构化认证（#3489）**：为 Codex provider 增加结构化的 setup-driver 认证流程，标志着对 Codex 生态的进一步支持。
  [PR #3489](https://github.com/nanocoai/nanoclaw/pull/3489)

- **Cursor Agent provider（#3355、#

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-08-24

## 1. 今日速览

过去 24 小时项目保持高活跃度：新增/活跃 Issue 9 条（全部为 Open），PR 更新 23 条（待合并 18，已合并/关闭 5），无新版本发布。核心开发依旧集中在**持久化 per-user sandbox（iron-proxy）**、**CI 流水线重构**和**用户级工具权限/可发现性**三大方向。今日无功能 PR 被合并入主分支，已合入内容以依赖更新为主，整体处于“功能开发集中但合入节奏放缓”的窗口期。值得警惕的是，来自 Slack 产品反馈渠道一次性涌入了 3 条集成类 Bug（Gmail、Notion、Slack），说明 WebUI 扩展安装流程存在真实用户摩擦。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日主要进展来自 **PR 与 Issue 的双线推进**，但主分支未接收新功能合入：

- **依赖更新（今日唯一合入主分支的内容）**
  - [PR #7730](https://github.com/nearai/ironclaw/pull/7730)：everything-else 组 6 项依赖更新（uuid、base64、toml 等）
  - [PR #7406](https://github.com/nearai/ironclaw/pull/7406)：actions 组 4 项更新（claude-code-action、setup-node 等）
  - [PR #7262](https://github.com/nearai/ironclaw/pull/7262)：wasm 组 2 项更新
  - 这些合并以确保依赖健康度为主，未引入破坏性变更。

- **重要功能 PR 仍在等待合并/评审**，这些 PR 是下一阶段项目前进的关键：
  - [PR #7810](https://github.com/nearai/ironclaw/pull/7810)（XL, risk: low）：iron-proxy 背后为 manifest 声明的直连执行凭据。这会完成 per-user sandbox 的“托管出口 + 调用归因”能力
  - [PR #7833](https://github.com/nearai/ironclaw/pull/7833)：suggestions 生成时使用用户自己的 no-approval + 只读工具（对应 [#7812](https://github.com/nearai/ironclaw/issues/7812)）
  - [PR #7817](https://github.com/nearai/ironclaw/pull/7817) / [#7821](https://github.com/nearai/ironclaw/pull/7821)：CI nextest 流水线与统一 setup-rust 工具链，属于并行 CI 提速计划（T2/T1）

- **两个 THROWAWAY CI 验证 PR**（[#7838](https://github.com/nearai/ironclaw/pull/7838)、[#7839](https://github.com/nearai/ironclaw/pull/7839)）已创建，用于验证 nextest 重构在 CI 的可行性，合并后即关闭，不改动产品代码。

总体判断：项目核心工程正集中在“沙箱运行时完整性”和“反馈→开发闭环”两条主线上，但短期在主分支的可见进展有限。

## 3. 项目进展

今日无重大合并，但可以看到两个积极信号：其一，**CI 重构系列（T1、T2、T3、T4）持续产出了 PR**，覆盖测试流水线、preflight 规范化、PR/queue 检查收敛，这批改动若落地可显著降低“本地绿色、CI 红色”的维护成本；其二，**从 Slack 产品反馈抓取的 3 个用户实际问题**（#7828/#7829/#7830）被火速拆成可追踪 Issue，说明项目已建立起从反馈信道到 Issue 的自动分类流程。项目整体处在为下一个里程碑“v1.4-long-term”做铺垫的阶段。

## 4. 社区热点

- [Issue #7730](https://github.com/nearai/ironclaw/issues/7730)：Epic“Persistent per-user sandbox with iron-proxy”今日新增 9 条评论，是过去 24h 评论最多的 Issue。讨论热度高是因为它定义了从“每条命令临时容器”变“常驻用户级沙箱”的架构走向，周围的直接引发的 PR #7810 同时也在推进中，强烈影响 sandbox 的后续演进。
- [Issue #7812](https://github.com/nearai/ironclaw/issues/7812)：3 条评论，关于 onboarding 建议生成时应尊重用户权限并只读调用工具。该想法已被 PR [#7833](https://github.com/nearai/ironclaw/pull/7833) 实现，属于“用户需求→PR”的高效闭环。
- **用户工具生态扩展**：多个 Issue 同时指向 WebUI 扩展安装/认证链路故障，虽然不是唯一热门话题，但三个不同的反馈（Gmail、Notion、Slack）在 24h 内同时出现，属于明显的“热点故障群”。

## 5. Bug 与稳定性

按严重度排序（由高到低，目前均无 PR 标注修复）：

| 严重度 | Issue | 描述 |
|---|---|---|
| **高** | [Issue #7829](https://github.com/nearai/ironclaw/issues/7829) | Gmail 因 Web 认证弹窗 1 秒后消失导致无法完成安装，用户无法进入 authorized 状态 |
| **高** | [Issue #7828](https://github.com/nearai/ironclaw/issues/7828) | Slack 在 NEAR Foundation 账户下无法完成 setup，官方域名账户受影响 |
| **中** | [Issue #7830](https://github.com/nearai/ironclaw/issues/7830) | Notion 扩展在 IronClaw 中 install 失败，原因待查（涉及扩展安装、认证或 UI 引导） |
| **中** | [Issue #7836](https://github.com/nearai/ironclaw/issues/7836) | 工具广告（prompt schema、namespace 预览、tool_search）不区分“可执行” vs “安装/认证但不可用”，导致模型总是调用失败，PinchBench 已可测到 |

其中 Gmail 与 Slack 的认证流程停流问题路径一致，建议维护者优先查看 WebUI 的 OAuth 弹窗生命周期是否是同一根因。`

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-08-24）

## 今日速览

过去24小时项目**无新版本发布、无新开 Issues/PRs**，全部更新均为歇置（stale）自动关闭的旧条目——共关闭 4 条 Issues 和 3 条 PRs，均为 2026-04-01 创建、2026-08-23 更新后不再活跃。值得关注的是，其中 **Issue #1200 对应的修复 PR #1201 已在关闭当天同步标注为 closed**，说明该 Bug 的修复已被纳入主分支（或当时已合并，后由 stale 机制标记关闭）。整体而言，项目当前无新增开发压力，但仍有部分历史遗留问题（如 `model key` 泄漏风险）未得到解决，需要维护者留意。

## 版本发布

今日无新版本 Release。

---

## 项目进展

今日无新 PR 提交，但包含了 3 条已关闭的 PR，其中 **1 条为 Bug 修复**、**1 条为 Agent 管理体验改进**、**1 条为模型级 Token 设置**：

- **[PR #1201: 修复 NIM 超大群消息中 teamTypeNum 硬编码错误，群名无法获取](https://github.com/netease-youdao/LobsterAI/pull/1201)**（对应 Issue #1200）  
  核心修复：解决群名获取失败、显示原始 ID 的问题，为 1 行修改，对接真实 SDK 的枚举映射。该 PR 的关闭标志着这一影响 NIM 群消息体验的 Bug 已被跟进处理，项目的群聊功能可用性回归。

- **[PR #1199: feat(model): add context window and token settings](https://github.com/netease-youdao/LobsterAI/pull/1199)**  
  添加了模型级 `contextWindow` 和 `maxTokens` 的配置能力，并被补入模型列表及直接聊天请求，同时传播到 Cowork/OpenClaw 配置。  
  （注：该 PR 最终状态为 closed，但未明确标注 merged，若要确认是否已合入，需额外查看分支合并情况。）

- **[PR #1197: Feature/Agent 管理页面交互优化](https://github.com/netease-youdao/LobsterAI/pull/1197)**  
  目标是优化侧边栏 + 卡片删除的交互路径，减少用户点击层级。该 PR 已关闭，可能因 stale 合入失败，但对应的交互问题仍存在，需要维护者评估是否继续推进。

**项目整体推进判断**：虽然今日数据中没有新开发的活跃 PR，但修复类 PR 成功落地，使项目在**稳定性修复**上（如群名回显的质量问题）迈出一步。由于 PR #1199 的模型层面设置后续能增强多模型管理的灵活性，可能会有相关 Roadmap 延伸。

---

## 社区热点

今日无高讨论热点，所有关闭的 Issues/PRs 的评论数均为 2 且已 stale。值得关注的热点源头并不是“今 日的新讨论”，但在本轮清理中透露出的用户关切仍有代表性：

- **[Issue #1200（NIM 群名获取 Bug）](https://github.com/netease-youdao/LobsterAI/issues/1200)** ——   社区最关注的核心痛点不是“找不到群名”，而是「团队成员 @ 机器人时，实际显示为原始 ID，极大影响使用感知」。该 Bug 虽然已有修复 PR，但衍生出的体验问题提醒官方应对云信 SDK 枚举及 ID 映射状态做更稳固的测试覆盖。

- **[Issue #1196（强制在任意工作目录生成 6 个 .md 文件）](https://github.com/netease-youdao/LobsterAI/issues/1196)** ——   用户抱怨「每次选择不同工作目录都要强制建 AGENTS.md、USER.md 等 6 个文件，删除后还会重建，目录会变得很乱」。在静态工作目录或项目管理方面，项目默认生成的 System Prompt 文件策略被认为是较重的，社区也在呼吁更轻量的全局配置方案。

- **[Issue #1202（agent 泄漏 model key）](https://github.com/netease-youdao/LobsterAI/issues/1202)** ——   安全类讨论。用户可以直接由 Agent 引导找到 API Key 所在位置，涉及敏感信息泄漏，属于高优先级关注（虽然整个 Issue 长期没有官方回复）。

**整体氛围**：社区当前更多关注既有功能的体验与安全边界，而非新功能的需求爆发，讨论在问题量上不高但大概率倾向于“工程可靠性”方向。

---

## Bug 与稳定性

- **[严重度：高] Agent 可泄漏 model key 配置** — [Issue #1202](https://github.com/netease-youdao/LobsterAI/issues/1202)  
  问题：Agent 会详细回答密钥配置文件/环境变量的路径，可被诱导获取敏感信息。  
  目前 **无对应的修复 PR**，需要重点跟踪预防。

- **[严重度：中] NIM 群聊中 teamTypeNum 硬编码错误** — [Issue #1200](https://github.com/netease-youdao/LobsterAI/issues/1200)  
  问题：超大群/普通群 @ 消息时群名读取异常（两处枚举反转）。  
  状态：**已有修复 PR #1201（closed）**，应已合入，功能需在量产环境下验证。

- **[严重度：低] 网关重启中间态无反馈** — [Issue #1198](https://github.com/netease-youdao/LobsterAI/issues/1198)  
  问题：网关重启至一半进度条消失，用户无法感知处于什么状态，后续对话提示“模型不可用”，影响中断时需要明确指引。  
  无对应修复 PR。

---

## 功能请求与路线图信号

1. **工作目录全局 `agents.md` 设置希望**  
   来自 Issue #1196，用户希望不生成 6 个默认 .md 文件，或可以放到隐藏目录与全局配置中。该请求若纳入实现，将影响工作目录的可维护性与团队默认系统提示设置，而带来的是否可以通过配置项切换用户随时选择目录设置各种 Agent.md 形文件，提升多项目适应性。

2. **模型级 Token Limit 与 Context Window 可配置化**  
   来自 PR #1199：已在模型配置中增加 Per -model 的 `contextWindow` 与 `maxTokens`。该方向表明项目开始支持不同模型在上下文长度与 token 上限上的差异化处理，属于模型部署领域的刚需，有助于后续多模型、多任务的精细化控制，很可能会被纳入即将接入的新版本。

---

## 用户反馈摘要

- **痛点集中**：
  - **设置过多且混乱**：在每个工作目录下强制创建 6 个 .md 文件让用户感到负担，且删除后被重建 **（#1196）**。
  - **状态不透明**：网关重启进度条消失、无法知晓服务是否还原，交互性体验大打折扣 **（#1198）**。
  - **群聊效果不可控**：群聊场景 @ 机器人，返回的是群 ID 而非真实名称，影响沟通效率 **（#1200）**。

- **安全的信任度风险**：Agent 主动披露系统内敏感命令与 key 路径，对于用户信任会产生负面影响 **（#1202）**。

- **交互路径繁琐**：Agent 管理页面中删除操作要通过卡片进入详情面板才能执行，步骤多、效率低（PR #1197 初衷即解决此问题）。

整体来看，用户核心关注点集中在「不要被强加规则」「隐私/密钥安全」「可见的状态反馈」三个方面。相比新增功能，社区对基础体验类的稳定性诉求更高。

---

## 待处理积压

- **高优先级** — **[Issue #1202：Agent 数据泄漏 Key 信息](https://github.com/netease-youdao/LobsterAI/issues/1202)**  
  存在敏感信息泄漏风险，至今无修复 PR，建议维护者立即查看（SQL 注入级别的安全优先），部分场景需在 prompt 层面加入拒答规则。

- **潜在建议** — **[PR #1197：Agent 管理页面交互优化](https://github.com/netease-youdao/LobsterAI/pull/1197)**  
  PR 作为设计改善措施关闭 / stale 处理，目前没有合并。若项目主要分支没有拦住该优化，建议后续再提交版本做好 adapter，避免源码变基产生冲突。

- **长期未关闭的轻量问题** — **[Issue #1198：网关重启中的 UI 反馈缺失](https://github.com/netease-youdao/LobsterAI/issues/1198)**，2 条评论后无人跟进，属于低阻碍但影响用户的微观问题，可在下次 UI 改造中一并处理。

---

> 本次日报基于 GitHub 数据的中性扫描，所有 Issue/PR 关联链接已内嵌；维护者可根据积压清单和反馈摘要，梳理下阶段开发优先级。整体项目健康度良好（修复本在），但安全项需重点关注。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-24

## 今日速览

过去 24 小时 Moltis 项目活跃度中等偏平稳：未发布新版本，3 条 Issue 有更新（2 条开放、1 条关闭），6 条 PR 全部处于 **待合并** 状态，其中 0 条被合并或关闭。值得注意的是，社区贡献者仍保持较大的提交动力，PR 集中在 memory、MCP、cron、skills 与 WhatsApp 集成等方向；但项目合并节奏偏慢，6 条 PR 均未合入主线。另一个值得注意的信号是 **2 月提交的 #245 WebSocket/TLS 兼容性问题至今仍开放且无关联修复 PR**，已影响真实浏览器用户，对项目健康度是一个较明显的减分项。

---

## 3. 项目进展

今日 Moltis **没有合并或关闭任何 PR**，主线未向前推进。不过以下 6 条待合并 PR 已经进入可评审状态：

- **fix(mcp): resolve current client after server restart** — #1231
  修复 MCP server 重启后，旧的 client 被关闭、新 client 建立时，活跃 chat turn 仍可能通过已关闭实例分发请求的问题。属于重要稳定性修复。
  https://github.com/moltis-org/moltis/pull/1231

- **fix(cron): deliver scheduled output to the originating chat** — #1226
  为 cron 调度输出增加 `deliver_to_current_chat` 通路，使用网关 channel context 解析原始消息目的地，同时保留 thread/topic 路由。
  https://github.com/moltis-org/moltis/pull/1226

- **fix(memory): normalize built-in backend config value** — #1235
  统一 memory 运行时名称与 `memory.config.get` 序列化逻辑，并补充 Rust round-trip 与 Settings 保存回归测试。
  https://github.com/moltis-org/moltis/pull/1235

- **fix(memory): bound local embedding encoder batches** — #1236
  限制本地 GGUF embedding，避免 tokenize chunk 超过 `n_ctx=512` 时导致整个 Moltis 进程崩溃。
  https://github.com/moltis-org/moltis/pull/1236

- **fix(skills): materialize recursive bundled sidecars** — #1234
  修复预发布版本/Docker 镜像中 `skill-creator` 的 `scripts/quick_validate.py` sidecar 被列出但实际无法读取的问题。
  https://github.com/moltis-org/moltis/pull/1234

- **Add opt-in WhatsApp document ingestion** — #1233
  为 WhatsApp 增加可选 `download_inbound_documents` 配置，让 agent 真正拿到文档字节，而非仅有 caption/filename/MIME。
  https://github.com/moltis-org/moltis/pull/1233

这些 PR 若合入，将显著改善 MCP 长期运行稳定性、cron 投递可靠性、memory embedding 崩溃风险，以及 WhatsApp 文档类实际工作流。

---

## 4. 社区热点

今日社区讨论热度不高，只有 1 个 Issue 出现多次评论：

- **#245 [OPEN] fix(tls): h2 in ALPN breaks WebSocket — browser negotiates h2, WS upgrade returns 405**
  这是 2026-02-26 创建的长期 Issue，过去 24 小时内仍被更新，目前有 2 条评论。主要诉求是：Moltis 在 TLS 下将 `h2` 置于 ALPN 首位，导致全新浏览器页面/新标签页在 WebSocket upgrade 时返回 405，只有已建立 h1.1 session 的旧标签页仍能维持连接。对真实用户来说，一次普通浏览器刷新就会触发中断。
  https://github.com/moltis-org/moltis/issues/245

该 Issue 高度疑似影响所有浏览器用户自然使用路径，但 6 个月仍未得到修复或明确 Fix PR，可能成为社区信任的持续性隐患。

---

## 5. Bug 与稳定性

按严重程度排序：

- **高：WebSocket 在 TLS 下被 ALPN h2 协商破坏，返回 405** — #245
  浏览器新开页面/刷新时，h2 被优先协商导致 WS upgrade 失败；只有旧标签页可以工作。影响用户范围广，且目前没有关联的修复 PR。
  https://github.com/moltis-org/moltis/issues/245

- **中：Tools stop working in shared Slack channels** — #1224
  用户报告在 Slack 共享频道中 Moltis tools 完全无法工作。Issue 已开放 3 天，暂无评论与对应 PR。由于涉及未指定渠道会话的 fallback 逻辑，可能影响企业多团队共享协作的常见场景。
  https://github.com/moltis-org/moltis/issues/1224

- **低/中：Bundled `skill-creator` sidecar 文件列出但不可读** — 由 PR #1234 描述
  在预构建 release 和 Docker 镜像中，`scripts/quick_validate.py` 被报告为 sidecar 文件，但请求时返回“not found”。已有修复 PR #1234，等待合并。
  https://github.com/moltis-org/moltis/pull/1234

此外，memory 相关进程崩溃风险得到了重视：#1236 指出 GGUF embedding 在超过 `n_ctx=512` 时可能直接终止整个 Moltis 进程，值得及时处理。

---

## 5. 功能申请与路线图信号

- **WhatsApp 文档下载与持久化** — PR #1233
  目前 WhatsApp 文档消息只带 caption、filename、MIME 信息，agent 无法查看文件内容。新 PR 增加了 per-account opt-in `download_inbound_documents`，将真实字节下载落地，属于自行输入在用户诉求中优先级较高的功能，很有可能被纳入 2026 年后续版本。
  https://github.com/moltis-org/moltis/pull/1233

- **Security hooks fail-closed 策略** — Issue #1230 [已关闭]
  虽然该 Issue 已经关闭，其观点仍然值得形成路线图：runtime hooks（如 shell-hook）超时/失败目前默认继续“放行”执行，从安全边界角度希望提供 opt-in fail-closed policy。说明部分用户在将 Moltis 作为安全监管层使用，建议官方考虑设计。
  https://github.com/moltis-org/moltis/issues/1230

- **cron 结果回传到原始聊天** — PR #1226
  支持用户创建 scheduled job 后，其结果自动回到发起对话的渠道/线程，是 ChatOps 体验的重要补充。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-24

> 数据来源：github.com/agentscope-ai/CoPaw（含 QwenPaw 镜像仓库）


## 1. 今日速览

过去 24 小时 CoPaw 项目保持中高活跃度：5 条新 Issue 全部处于开放讨论状态，无关闭；15 条 PR 中有 8 条完成合并/关闭，7 条仍在推进/评审中。合并集中在 **技能系统（skill-system）动态加载、自动标题同步、token 统计与 CLI 修复** 等方向，功能迭代节奏正常。值得关注的是，今日 Issue 侧出现 **1 条严重内存泄漏报告（20.7GB）、1 条对话状态错乱 Bug、1 条插件注册丢失 Bug**，稳定性类问题占比偏高，建议维护团队在下一版本优先处理。


## 2. 版本发布

过去 24 小时 **无新版本发布**。

当前 Issue 与 PR 中反复提及版本号为 **2.1.0**，该版本仍为线上最新版本，且多个问题（#7221、#7218）被标记为“main 分支亦存在”。


## 3. 项目进展

过去 24 小时有 **8 条 PR 被合并/关闭**，主要推进了以下工作：

### 🔧 Bug 修复
| PR | 说明 |
|---|---|
| [#6220](https://github.com/agentscope-ai/QwenPaw/pull/6220) | 修复 token_usage 缓存未初始化导致 shutdown 时异常 flush 的问题 |
| [#6203](https://github.com/agentscope-ai/QwenPaw/pull/6203) | Windows 平台 `tasklist` 进程探测补上 timeout 与窗口隐藏，修复潜在阻塞 |
| [#6616](https://github.com/agentscope-ai/QwenPaw/pull/6616) | 修复 `qwenpaw task` 命令构造非法 user message，导致任务从不真正执行的问题 |

### ✨ 新功能（技能系统 + 标题同步）
| PR | 说明 |
|---|---|
| [#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033) / [#7031](https://github.com/agentscope-ai/QwenPaw/pull/7031) | 技能系统引入 **动态加载 + 自动卸载 + frontmatter 路径修复**，打破“技能启动后静态不可变”的限制 |
| [#7032](https://github.com/agentscope-ai/QwenPaw/pull/7032) / [#7030](https://github.com/agentscope-ai/QwenPaw/pull/7030) | 自动标题同步：auto-memory 联动刷新会话标题，并增加可观测性 |
| [#7027](https://github.com/agentscope-ai/QwenPaw/pull/7027) | 合并上述两个方向，并清理 skill-system 临时备份文件 |

> 注：以上多条 PR 为同一功能的不同分支/迭代版本（同日合并），反映维护者在快速收敛技能系统与标题同步的实现，最终代码可能以 [#7033 + #7032 组合](https://github.com/agentscope-ai/QwenPaw/pull/7033) 为准。技能系统支持 **运行时动态加载/卸载** 对插件生态是重要基础能力升级。


## 4. 社区热点

### 🔥 讨论热度最高

| 排名 | 条目 | 评论数 | 类型 | 主题 |
|---|---|---|---|---|
| 1 | [#7221 reload_agent() drops plugin workspace-scoped registrations](https://github.com/agentscope-ai/QwenPaw/issues/7221) | 3 | Bug | 零宕机 reload 后插件注册（runtime hooks、modes、slash commands）全部丢失 |
| 2 | [#7222 qwenpaw-backend 内存无界增长至 20GB+](https://github.com/agentscope-ai/QwenPaw/issues/7222) | 2 | 性能 | 运行 2 天后内存涨至 20.7GB，拖慢整机 |
| 3 | [#7224 如何将 Aider CLI 接入为 QwenPaw agent](https://github.com/agentscope-ai/QwenPaw/issues/7224) | 1 | 帮助/集成 | 俄语提问，希望把 aider-chat 作为 agent 托管 |
| 4 | [#7218 peer closed connection (incomplete chunked read)](https://github.com/agentscope-ai/QwenPaw/issues/7218) | 1 | Bug | 长文本/长推理时连接被对端关闭 |
| 5 | [#7217 停止任务后下次对话完全按上次进行](https://github.com/agentscope-ai/QwenPaw/issues/7217) | 1 | Bug | 状态残留导致对话“人格分裂” |

### 📊 解读
- **#7221** 是今日最有价值的反馈：用户在推进零宕机配置热加载，但 reload 会丢掉插件 workspace 级注册，直接打击 **插件生态的核心体验**。此 Issue 与今日合并的动态技能加载 PR 属同一领域，说明方向正确但实现尚未完整覆盖插件注册。
- **#7222** 用户明确与历史问题 #9 做了区分（非启动泄漏，而是运行时累积），定位专业性高，值得优先安排排查。


## 5. Bug 与稳定性

按严重程度降序排列：

### 🔴 严重
| Issue | 描述 | 影响 |
|---|---|---|
| [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) | qwenpaw-backend 运行 2 天后内存 **无界增长至 20.7GB**，拖慢整机。区别于 #9 的启动阶段泄漏，此为 **运行时逐步累积**（重度文档/推理负载）。 | 长期运行不可用，直接影响生产部署。目前**尚无关联 fix PR**。 |

### 🟠 中等
| Issue | 描述 | 影响 | 关联 PR |
|---|---|---|---|
| [#7221](https://github.com/agentscope-ai/QwenPaw/issues/7221) | 版本 2.1.0（main 分支同样存在）：`reload_agent()` 在零宕机配置重载后 **丢弃插件所有 workspace-scoped 注册**（runtime hooks、modes、slash commands）。 | 插件开发/配置热更新工作流被阻断。 | 暂无直接修复 PR，但 [#7183 workspace-scoped always-on skills](https://github.com/agentscope-ai/QwenPaw/pull/7183) 部分相关 |
| [#7218](https://github.com/agentscope-ai/QwenPaw/issues/7218) | Win10 + 2.1.0：长文本/推理时间过长时出现 `peer closed connection without sending complete message body`。用户已让模型端优化超时但仍有发生。 | 长任务稳定性受损。 | 暂无 |

### 🟡 一般
| Issue | 描述 | 影响 | 关联 PR |
|---|---|---|---|
| [#7217](https://github.com/agentscope-ai/QwenPaw/issues/7217) | **对话状态污染**：中途停止任务/对话后，下一次对话完全按上一次的思考与内容执行，与用户当前问题无关。 | 会话隔离失效，严重影响多轮交互体验。 | 暂无 |


## 6. 功能请求与路线图信号

### 用户侧新需求（来自 Issue）
- **[#7224](https://github.com/agentscope-ai/QwenPaw/issues/7224) Aider CLI 集成**：用户希望将 `aider-chat` 作为 agent 接入 QwenPaw，由 QwenPaw 统一调度。反映社区对 **外部 CLI 工具/agent 接入能力** 的需求开始出现。

### 开发侧已有 PR 指向的路线图
- **[#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) 会话级多项目目录**（开放中）：一个 chat 可绑定多个项目目录，首个为 primary。这将是 **workspace 模型的重要升级**，与 #7221 插件 workspace 注册形成呼应。
- **[#7183](https://github.com/agentscope-ai/QwenPaw/pull/7183) workspace-scoped always-on skills**（开放中）：技能可声明“常驻加载”，面向专业 agent 的核心行为定义。与本次合并的动态技能加载互为补充，预计会进入后续版本。
- **[#7219](https://github.com/agentscope-ai/QwenPaw/pull/7219) Token Usage 全 Agent 趋势图**（开放中）：后端新增 `/api/agent-stats/llm-tool-trend` 接口，可观测性继续增强。
- **[#7187](https://github.com/agentscope-ai/QwenPaw/pull/7187) 标题生成排除 reasoning 内容**（开放中）：修复 #6979，防止模型思考内容被持久化为标题。低风险，大概率合入。
- **[#7223](https://github.com/agentscope-ai/QwenPaw/pull/7223) DeepSeek 模型目录刷新**（开放中）：下架已退役的 `deepseek-chat` / `deepseek-reasoner`，新增 v4 系列。建议尽快合入，避免用户选择已下线模型。
- **[#7220](https://github.com/agentscope-ai/QwenPaw/pull/7220) 拒绝超大尺寸图片**（开放中）：仅检查 2MiB 字节限制不够，需同时校验像素尺寸，修复 #7212。

### 判断
下一版本（2.2.0 或更高）大概率包含：**会话级多项目目录**、**always-on skills**、**token 趋势可视化**。建议同步关注 **reload 插件注册丢失** 与 **内存泄漏** 两个稳定性问题能否排期。


## 7. 用户反馈摘要

| 来源 | 用户声音 | 痛点/诉求 |
|---|---|---|
| [#7224](https://github.com/agentscope-ai/QwenPaw/issues/7224)（俄语） | “Ищу справку: как штатно подключить **Aider CLI** как агента, чтобы он запускал свой API/правил код, а QwenPaw управлял им” | 希望 QwenPaw 能作为 **agent 编排中枢**，托管外部 CLI agent（aider-chat），由 QwenPaw 发起并接收结果。属于 agent 互操作类需求。 |
| [#7218](https://github.com/agentscope-ai/QwenPaw/issues/7218) | 用户反馈自定义模型方说“你的工具有没设置超时时间，我这边 180S 你 130-140s 就被退出了”，并反问“我问了 qwenpaw，没有这样的设置啊？有吗？” | 用户困惑 **超时时间是否存在于配置项中**，说明相关超时参数不够透明，缺少文档/暴露配置。 |
| [#7217](https://github.com/agentscope-ai/QwenPaw/issues/7217) | 停止任务后，下一次对话“完全按照上一次的进行（包括其思考），不管问什么问题” | 中途中止后的 **状态清理不彻底**，直接影响日常使用信心。 |
| [#7221](https://github.com/agentscope-ai/QwenPaw/issues/7221) | 配置热更新后插件“runtime hooks, modes, slash commands”全部消失，需要重开进程才能恢复 | 插件开发者对 **配置热加载完整性** 有明确预期，当前实现不达预期。 |
| [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) | 用户做了严谨的复现描述（启动时间 → 增长到 20.7GB → 拖慢整机），并主动与 #9 区分 | 社区用户在**主动帮助维护者定位问题**，体现较高技术参与度。 |


## 8. 待处理积压

### ⏳ 长期未合并的 PR（>5 天）
| PR | 主题 | 待处理时长 | 说明 |
|---|---|---|---|
| [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976) | feat: session-scoped multi project directories | 11 天 | 功能重要，涉及文件工具路径与 cwd 语义变更，建议尽快安排 review。 |
| [#7066](https://github.com/agentscope-ai/QwenPaw/pull/7066) | fix(drivers): persist rotated refresh_token for OAuth2 auth-code providers | 8 天（Under Review） | 修复 XMind 等 MCP 远程服务器 OAuth2 refresh_token 轮换不持久化问题，属真实可用性缺陷。 |
| [#7033](https://github.com/agentscope-ai/QwenPaw/pull/7033) 等技能系统系列 | 动态技能加载 + 自动卸载 + frontmatter 修复 | 10 天 | 已有多条闭合/重复 PR，建议确认最终合并版本后关闭其余分支。 |

### ⚠️ 已关闭但需回归验证的 PR
- [#6203](https://github.com/agentscope-ai/QwenPaw/pull/6203)（Windows tasklist 探测修复）与 [#6220](https://github.com/agentscope-ai/QwenPaw/pull/6220)（token_usage 缓存修复）均为首次贡献者提交，**建议维护者完成回归测试**，确认 Windows 平台与退出流程无副作用。

### 📌 维护者提醒
- **内存泄漏（#7222）** 与 **reload 丢插件注册（#7221）** 是两个高优稳定性问题，均无关联 fix PR，建议在下一个迭代周期明确负责人。
- 多条重复 PR（#7033/#7031、#7032/#7030、#7027）同日出现，建议维护者规范分支管理流程，减少维护成本。

---

*日报生成时间：2026-08-24  |  数据窗口：过去 24 小时  |  项目健康度评估：⭐⭐⭐⭐（功能迭代活跃，稳定性问题需关注）*

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-08-24

## 1. 今日速览

今日 EasyClaw 项目整体活跃度**偏低**：过去 24 小时内未产生新的 Issues 或 Pull Requests，社区讨论与贡献处于静默期。项目发布了 **v1.8.114（TK Copilot）** 补丁版本，修复了 Windows 平台上定时及手动 Cron 任务因持久进程锁（durable process fencing）无法运行的问题。该修复直接回应了 Windows 用户的核心痛点，属于稳定性提升型发布。总体来看，项目处于小幅迭代、稳步维护的状态。

| 指标 | 数值 | 趋势 |
|---|---|---|
| 新 Issues | 0 | 持平 |
| 已关闭 Issues | 0 | 持平 |
| 新 PR | 0 | 持平 |
| 已合并/关闭 PR | 0 | 持平 |
| 新版本发布 | 1 | 活跃 |
| 社区讨论热度 | 低 | 静默 |

---

## 2. 版本发布

### v1.8.114（TK Copilot）

- **发布时间**：2026-08-24
- **链接**：[GitHub Releases - v1.8.114](https://github.com/gaoyangz77/easyclaw/releases)

**更新内容**

- 修复 Windows 上因持久进程锁（durable process fencing）导致定时与手动 Cron 任务无法运行的问题。

**破坏性变更**

- 无，属于纯修复性补丁，API 与配置接口均无变更。

**迁移注意事项**

- 直接升级即可，无需额外迁移操作。
- **macOS 用户注意**：若在安装时遇到 **"'RivonClaw' is damaged and can't be opened"** 提示，系 macOS Gatekeeper 拦截未签名应用所致，属已知平台限制，非本次更新引入的回归问题。

---

## 3. 项目进展

过去 24 小时内**没有** PR 被合并或关闭，也无新的 Pull Request 提交。

结合上一节版本发布来看，本次 **v1.8.114** 的修复发布即为当日最主要的功能推进，主要成果体现在：

- 解决了 Windows 平台上 Cron 调度任务被持久进程锁阻断的问题，恢复了定时任务与手动触发的正常执行。
- 该修复直接影响 Windows 用户的日常自动化流程稳定性，属于**高价值、低成本**的补丁迭代。

项目整体当前处于**维护期**，无新功能层面的推进。

---

## 4. 社区热点

过去 24 小时内**没有** Issues 或 PR 产生评论、讨论或反应，无热点话题。

社区当前处于静默期，未观察到集中的用户诉求或技术讨论热点。

---

## 5. Bug 与稳定性

过去 24 小时内没有新报告的 Bug、崩溃或回归问题。

当前唯一已知且已解决的稳定性问题即 v1.8.114 所修复的 **Windows 持久进程锁阻塞 Cron 任务** 问题。该问题严重程度为**高**——它直接导致 Windows 用户的定时任务和手动 Cron 运行完全不可用，属于功能性阻断缺陷。该问题已随 v1.8.114 发布而修复，相关修复代码已合入主分支。

> 注：macOS Gatekeeper 拦截未签名应用的问题为平台层安全机制限制，不属于应用 Bug，但建议维护者在后续版本中考虑对 macOS 构建进行签名以优化用户体验。

---

## 6. 功能请求与路线图信号

过去 24 小时内**没有**新的功能请求提交。

结合既有版本轨迹（v1.8.x 系列仍在持续高频迭代），短期内项目路线图可能聚焦于：

- **跨平台 Cron 调度稳定性加固**：本次修复表明 Windows 调度链路仍存在平台适配问题，后续可能推出更彻底的调度机制重构。
- **macOS 签名与分发优化**：Release 说明中反复出现 Gatekeeper 拦截提示，反映出用户安装门槛问题，签名或公证可能是下一阶段的潜在改进方向。

> 以上推断基于现有数据，无新增用户需求可确认纳入下一版本。

---

## 7. 用户反馈摘要

过去 24 小时内没有新的 Issues 或评论产生，因此没有可供提炼的真实用户反馈。

从 v1.8.114 的 Release 说明中可以间接观察到：

- **Windows 用户痛点**：定时及手动 Cron 任务无法运行，属于高频功能性阻塞问题，本次修复应可显著改善 Windows 用户的使用体验。
- **macOS 用户痛点**：安装时被 Gatekeeper 拦截提示 "app is damaged"（实为未签名所致），该问题在多个版本说明中被反复提及，说明仍有一批 macOS 用户在安装环节遇到困惑。

---

## 8. 待处理积压

过去 24 小时内没有新的 Issues 或 PR 产生，结合已有数据，暂未发现长期未响应的重要 Issue 或 PR。

**建议维护者关注**：

- 在后续版本中考虑为 macOS 构建增加代码签名或公证流程，以消除安装时的 Gatekeeper 警告。该问题在多个 Release 说明中被反复提及，虽非代码缺陷，但持续影响部分用户的安装体验。
- 持续观察 Windows 平台 Cron 调度是否完全恢复正常，如有后续用户反馈应优先处理。

---

*本日报由 AI 自动生成，数据来源：[EasyClaw GitHub 仓库](https://github.com/gaoyangz77/easyclaw)*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*