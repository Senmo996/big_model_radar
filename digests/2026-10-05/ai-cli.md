# AI CLI 工具社区动态日报 2026-10-05

> 生成时间: 2026-10-05 02:53 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告（2026-10-05）

## 1. 生态全景

当前 AI CLI 工具已从“单点可用”进入“系统化竞争”阶段：各主流工具保持高频率迭代，社区讨论量巨大，反馈焦点集中在跨设备协同、Agent 可靠性、沙箱安全与权限可控性上。同日已有 OpenAI Codex、Gemini CLI、GitHub Copilot CLI、Qwen Code 四个工具发布新版本，而 Claude Code 与 OpenCode 虽无发版，但 PR 与 Issue 活跃度依然居高。整体来看，工具正在从功能扩张转向企业级稳定性、安全审计和透明化治理，安全修复集群（如 Gemini CLI 路径穿越、OpenCode 流式响应）与跨端行为一致性（OpenCode GUI/TUI 对齐）是当日重要底色。

## 2. 各工具活跃度对比

> 注：Issues/PR 数为各仓库“当日更新/筛选出的热点”数量，非全量数据；Qwen Code 材料有截断。

| 工具 | 热点 Issues | PR 进展 | Release |
|---|---|---|---|
| Claude Code | 10 | 5 | 无 |
| OpenAI Codex | 10 | 10 | 3 个 alpha（rust-v0.162.0-alpha.12 ~ .14） |
| Gemini CLI | 10 | 10 | 1 个 nightly（v0.64.0-nightly.20261005） |
| GitHub Copilot CLI | 10 | 0 | 1 个 patch（v1.0.92-4） |
| Kimi Code CLI | 无活动 | 无 | 无 |
| OpenCode | 10 | 10 | 无 |
| Qwen Code | 50 条活跃（列表截断） | 未完整披露 | 1 个 nightly（v0.24.7-nightly.20261004） |

## 3. 共同关注的功能方向

- **远程协同与跨设备连接**
  - OpenAI Codex：Remote 在 Android 配对失败（#48774）、Dots 无法读取远程会话（#50157）、代理网络下任务无法跨端恢复（#49829）。
  - Claude Code：remote-control 会话取消归档后无法重新连接（#98310）。
  - OpenCode：GUI 一次性配对链接适配（#53257）、QR 配对跨域支持（#53262）。

- **沙箱与权限细粒度控制**
  - OpenAI Codex：桌面自动化静默回退沙箱（#15310）、浏览器 URL 拒绝策略无恢复路径（#44881）。
  - Gemini CLI：glob 路径穿越修复（#29522）、检查点目录穿越修复（#29521）、a2a-server 信任绕过修复（#29525）。
  - GitHub Copilot CLI：Ubuntu 沙箱 preflight 失败（#5052）。
  - Claude Code：插件 skill 细粒度禁用诉求持续高热（#14920，95 👍）。

- **Agent / 子代理可靠性**
  - Gemini CLI：Subagent 误报 GOAL 成功（#22323）、generalist agent 挂起（#21409）、子代理上下文缺失（#21763）。
  - Claude Code：子代理压缩时 Hook 字段缺失（#91910）。
  - Qwen Code：managed-agent 锁竞争导致 Turn 停顿（#13333）。

- **上下文管理与可观测性**
  - OpenCode：compact 静默丢弃 reasoning 摘要（#44080）。
  - Claude Code：fable-5 长对话下 Advisor 失效（#67609）。
  - Gemini CLI：`/rewind` 后历史以模型回复结尾导致 400（#29527）。
  - GitHub Copilot CLI：HydraFusion 降级后上下文膨胀、工具集变化（#5042）。

- **用量/额度透明化**
  - OpenAI Codex：banked reset 过期时间过短（#28888）。
  - OpenCode：免费额度异常耗尽（#40078/#52623）、免费 429 响应缺少重置时间（PR #53254）。
  - Gemini CLI：展示服务器报告的配额限制和重置窗口（PR #29429）。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 企业级代码库操作、Hooks 审计、插件生态 | 注重审计与治理的团队 | 以稳定性和可追溯性见长，社区最关心的不是功能数量，而是细粒度控制（skill 禁用） |
| **OpenAI Codex** | 远程协同、自主代理（Dots）、跨设备 | 多设备/云端协同的开发者 | Rust 重写版快速迭代，大量围绕 Remote/Dots 的跨端问题，处于功能扩张期 |
| **Gemini CLI** | Subagent 自主执行、浏览器 Agent、安全修复 | Google 生态用户、自动化重度用户 | 对 Agent 运行时安全高度重视，当日修复多个路径穿越/环境泄露漏洞；A2A 协议是特色 |
| **GitHub Copilot CLI** | MCP 生态、模型路由（HydraFusion）、配置管理 | GitHub 深度用户、企业 Copilot 客户 | 依托 GitHub 身份与模型栈，新增 `copilot config` 补强配置能力，但当日 PR 无更新，迭代节奏偏稳 |
| **OpenCode** | TUI/GUI 双端一致、多模型适配、上下文可视化 | 追求轻量、可定制化的独立开发者 | 大量 UI/UX 打磨（侧边栏信息密度）与行为对齐，社区对免费额度和流式稳定性非常敏感 |
| **Qwen Code** | managed-agent、Kubernetes 运行时、托管会话 | 云端/托管场景、Qwen 模型用户 | 偏重后端基础设施与并发性能，本地模型上下文假设错误是社区高频问题 |

## 5. 社区热度与成熟度

- **OpenAI Codex、Gemini CLI、OpenCode** 明显处于“快速迭代期”：当日各有 10 个 PR 活跃，Codex 连发 3 个 alpha 版，Gemini CLI 同时有安全修复与依赖大更新（75 项 npm 依赖），OpenCode 密集合入 TUI 增强与 GUI 修复。社区反馈量大，问题也集中在“新功能带来的稳定性缺口”。

- **Claude Code** 社区成熟度最高：虽无新版本，但 Issue 讨论质量高，长线需求（#14920 持续近 10 个月）仍有 95 👍，说明用户对核心体验的诉求稳定且克制，项目处于“精修期”。

- **GitHub Copilot CLI** 处于“稳中有补”状态：Release 为 patch 级别，PR 零更新，但 Issue 区 24 条更新暴露的身份验证、平台兼容、MCP 生命周期问题，说明其社区在使用深度上不低，只是发版节奏偏保守。

- **Kimi Code CLI** 当日无任何活动，需持续观察是否处于维护沉寂期。

## 6. 值得关注的趋势信号

- **安全边界正在成为选型的关键考量。** 多线程安全修复（Gemini CLI 路径穿越/信任绕过、Codex ACL 恢复、OpenCode 流式资源释放）与沙箱配置静默忽略（Codex #15310、Copilot #5052）叠加出现，说明 AI CLI 已具备高权限执行能力，用户对“可预测的沙箱行为”要求正在追上“功能数量”。

- **远程化是下一竞争战场，但体验远未成熟。** Codex Remote、Claude Remote Control、OpenCode 配对在 Android/代理/WebSocket 等场景下集中失败，跨端会话恢复仍是普遍痛点。谁先解决“代理友好 + 断线重连 + 会话迁移”，谁就能捕获企业用户。

- **Agent 能力越强，透明性缺口越大。** Gemini 的 subagent 误报成功、Claude 的 advisor 长对话失效、OpenCode 的 compact 静默丢上下文，都在指向同一个问题：用户无法验证 Agent 内部发生了什么。`/bug` 不包含子代理上下文（Gemini #21763）更是强化了这种“黑箱感”。未来可观测性（trace、审计 hook、子代理轨迹分享）将是刚需。

- **细粒度权限控制是跨工具的共同诉求。** 从 Claude 的 skill 级禁用、Codex 的浏览器 URL 级授权，到 Gemini 的沙箱信任折叠，用户希望从“允许/拒绝”进化为“何时、何处、哪个工具、基于什么上下文”的精确策略。这将是企业落地 AI CLI 的硬门槛。

- **计费与额度不透明正在阻碍开发者采纳。** 免费额度异常扣除、重置时间缺失、reset 过期过短等问题在 Codex、OpenCode、Gemini 三个社区同时出现。为 AI CLI 设计清晰的用量可见性和配额预期，不仅是商业问题，也是开发者信任的基础。

---

*数据来源：GitHub 上 Anthropics Claude Code、OpenAI Codex、Google Gemini CLI、GitHub Copilot CLI、Moonshot Kimi CLI、Anomaly OpenCode、QwenLM Qwen Code 各仓库 2026-10-05 当日公开动态。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills 摘要生成失败。

---

# Claude Code 社区动态日报 — 2026-10-05

## 今日速览

过去 24 小时无新版本发布，社区讨论聚焦于两类问题：一是 **fable-5 模型在长对话下 Advisor 工具失效**（#67609，27 条评论、45 👍），二是 **Windows 桌面端稳定性问题集中爆发**——MSIX 更新被 git 守护进程阻塞、会话恢复失败、OneDrive 目录下工作树残留等。最受关注的功能需求仍是**插件技能的细粒度控制**（#14920，95 👍），该 Issue 已持续近 10 个月热度不减。

---

## 社区热点 Issues

### 1. Advisor 工具在 fable-5 长对话下返回 "unavailable"
**#67609** · `[bug, has repro, platform:macos, area:model, area:core]` · 27 评论 · 45 👍
当请求模型为 `claude-fable-5` 且对话 transcript 超过约 100K tokens 时，服务端 advisor 工具返回 `advisor_tool_result_error`，较小规模对话下相同配置正常，导致 advisor 功能在大上下文场景下完全失效。
https://github.com/anthropics/claude-code/issues/67609

### 2. 无法单独禁用 Claude 插件的某个 skill
**#14920** · `[enhancement, platform:macos, area:core]` · 19 评论 · 95 👍
用户希望只保留 `:commit` 而禁用 `commit-commands:commit-push-pr`、`commit-commands:clean_gone` 等用不上的 skill。95 👍 为当前列表最高，是社区呼声最高的功能请求，已持续近 10 个月仍未解决。
https://github.com/anthropics/claude-code/issues/14920

### 3. Windows/MSIX：git fsmonitor 守护进程阻塞新版启动
**#91763** · `[bug, has repro, platform:windows, area:desktop]` · 17 评论
`git fsmonitor--daemon` 继承了 AppX 容器 job，在更新强制关闭后仍存活，导致新版本无法启动（0x80070020）。Issue 提供了完整 root cause 分析和无需重启的 workaround，是 Windows 桌面端最严重的更新阻塞问题。
https://github.com/anthropics/claude-code/issues/91763

### 4. `/model opusplan` 突然报 "Unsupported model"
**#92007** · `[bug, platform:windows, area:model]` · 9 评论 · 13 👍
用户手动运行 `/model opusplan` 失败，该命令此前正常工作了数月。发生在 Claude Code 2.1.260、Windows 11 桌面 App 的 Code 标签页内，疑似模型名或服务端配置变更导致的回归。
https://github.com/anthropics/claude-code/issues/92007

### 5. 子代理压缩时 Hook 载荷字段缺失
**#91910** · `[bug, has repro, platform:linux, area:hooks, area:agents]` · 8 评论
三个相关缺陷：子代理压缩时 `PreCompact`/`PostCompact` 缺少 agent 字段；`SessionStart`（matcher `compact`）同样缺 agent 信息；内部 summarizer 调用触发 `SubagentStop` 时指向从未创建的 `agent_transcript_path`。影响依赖 Hook 做审计/追踪的团队。
https://github.com/anthropics/claude-code/issues/91910

### 6. 外部文件变更系统提示断言了不可验证的原因
**#71585** · `[bug, area:core]` · 5 评论
当文件在 Read 与下一次 read/edit 之间被修改时，系统注入的提示声称变更"由用户或 linter 造成"，且暗示用户已知情。模型将其作为事实转述，可能导致 Agent 对真实变更来源产生错误归因。
https://github.com/anthropics/claude-code/issues/71585

### 7. 发给用户的消息被输出为隐藏 thinking 块
**#97504** · `[bug, platform:windows, area:model, platform:vscode]` · 3 评论 · 7 👍
模型意图发给用户的文本偶尔以 `thinking` 块而非 `text` 块输出，用户永远看不到。仅发生在包含工具调用的回复中，且为间歇性，带工具调用的回复中用户可见性受损。
https://github.com/anthropics/claude-code/issues/97504

### 8. Remote Control：取消归档的会话无法重新连接
**#98310** · `[bug, has repro, platform:linux]` · 2 评论 · 3 👍
`claude remote-control` 服务器模式下，会话从 claude.ai 归档再取消归档后无法再次使用，消息卡在 "Sending…" 约 2 分钟后报 "offline"，不会重新派发到运行中的主机。
https://github.com/anthropics/claude-code/issues/98310

### 9. 过期的 MCP 缓存向所有会话注入断连工具
**#99513** · `[bug, platform:macos, area:mcp]` · 1 评论
`~/.claude.json` 中陈旧的 `claudeAiMcpEverConnected` 缓存导致每个 CLI 会话都接收到 16 个已断开 claude.ai connector（bioRxiv、ChEMBL、ClinicalTrials 等）的完整工具/指令载荷，存在隐私与 token 浪费双重问题。
https://github.com/anthropics/claude-code/issues/99513

### 10. macOS 语音按住说话在长按时中断
**#99548** · `[bug, has repro, platform:macos, area:tui]` · 0 评论
200ms 释放超时比真实的按键重复间隔（0.5–1.4 秒）短，导致按住说话时录音中途停止，该 issue 当日创建即带完整复现路径。
https://github.com/anthropics/claude-code/issues/99548

---

## 重要 PR 进展

当日更新 5 个 PR，以下为主要看点：

### 1. sec-default：组织工具策略上限覆盖个人插件
**#99540** · `[OPEN]` · @poteat
组织可要求对某 connector 工具进行审批，该策略 mod 现在能将此上限扩展到个人安装的插件上（如同 deny 规则一样），且所有决策 hook 都带 `.catch` 兜底，防止策略绕过。
https://github.com/anthropics/claude-code/pull/99540

### 2. 修复 pr-review-toolkit 所有 agent 的 YAML frontmatter
**#87077** · `[OPEN]` · @anishsamant
每个 agent 的 description 是包含 `Daisy: "..."` / `Assistant: "..."` 对话行的未加引号标量，YAML 将其解析为嵌套映射导致 frontmatter 加载为空，agent 的 name/description/model 全部丢失。
https

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-05

## 1. 今日速览

今日发布 3 个 Rust 版 alpha 版本（0.162.0-alpha.12 ~ alpha.14），均未附带详细变更说明。社区讨论热度集中在 **Codex Remote 在 Android 上配对失败**（53 条评论）与 **桌面自动化沙箱配置被静默忽略**（23 条评论）两大问题上；同时，多个围绕 Windows 原生稳定性、TUI 配置默认值和遥测分析的 PR 已合入主线。

---

## 2. 版本发布

**rust-v0.162.0-alpha.14 / alpha.13 / alpha.12**

三个版本均仅标注 `Release 0.162.0-alpha.x`，未提供额外的发布说明。建议关注后续 alpha 版本中的功能差异与回归修复。

- [rust-v0.162.0-alpha.14](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.14)
- [rust-v0.162.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.13)
- [rust-v0.162.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.12)

---

## 3. 社区热点 Issues（10 个）

### 1. Codex Remote 在 Android 上配对失败（#48774）
- 评论 53 | 点赞 26 | 状态：OPEN
- 同一账号在 Windows 桌面端已启用 “Allow connections”，手机扫码后进入授权流程即失败。
- **重要性**：Remote 跨设备配对是当前核心场景，问题影响面大，社区反馈强烈。
- [查看 Issue](https://github.com/openai/codex/issues/48774)

### 2. 桌面自动化静默回退到 workspace-write 沙箱（#15310）
- 评论 23 | 点赞 17 | 状态：OPEN
- 计划任务启动线程时无视 `danger-full-access` 配置，静默降级为 `workspace-write`，用户手动进入 UI 后才恢复。
- **重要性**：安全策略被静默忽略，影响自动化任务的可预测性，是配置与执行不一致的典型案例。
- [查看 Issue](https://github.com/openai/codex/issues/15310)

### 3. Windows 内置 LaTeX 编译器无法找到标准目录（#48311）
- 评论 17 | 点赞 8 | 状态：OPEN
- Windows 桌面应用内置 LaTeX 编译器连最小文档也无法编译，诊断信息仅有平台目录缺失提示。
- **重要性**：Windows 原生工具链的路径兼容问题，影响文档工作流。
- [查看 Issue](https://github.com/openai/codex/issues/48311)

### 4. Windows 持久任务 follow-up 失败：AbsolutePathBuf 反序列化错误（#49477）
- 评论 14 | 点赞 2 | 状态：OPEN
- 云端创建的线程在 Windows 桌面端继续时，在 turn 开始前报 `invalid turn/start params: AbsolutePathBuf deserialized without a base path`。
- **重要性**：阻塞跨端任务续跑，且错误信息对用户不友好。
- [查看 Issue](https://github.com/openai/codex/issues/49477)

### 5. 银行式重置额度 30 天过期太短（#28888）
- 评论 5 | 点赞 15 | 状态：OPEN
- 用户请求延长 banked reset 的过期时间，以覆盖度假、出差等低频重度使用场景。
- **重要性**：获得高赞，虽是 enhancement 但反映用量管理机制的弹性不足。
- [查看 Issue](https://github.com/openai/codex/issues/28888)

### 6. 语音听写在 VS Code 扩展中返回 403（#49351）
- 评论 7 | 点赞 3 | 状态：OPEN
- 同一账号在 ChatGPT macOS 桌面端可正常听写，VS Code 扩展内却收到 403 Forbidden。
- **重要性**：扩展生态的认证链路存在独立故障，影响 IDE 内语音输入体验。
- [查看 Issue](https://github.com/openai/codex/issues/49351)

### 7. Dots 中的 GitHub 工具授权状态不可靠（#50769）
- 评论 8 | 点赞 0 | 状态：OPEN
- 已授权的开发/发布操作在后续报告任务中仍被 read-only 拦截。
- **重要性**：授权状态跨任务不一致，直接阻碍 Dots 自动化的实际可用性。
- [查看 Issue](https://github.com/openai/codex/issues/50769)

### 8. Dot 无法读取远程 Codex 会话：不支持的 placement 格式版本 1/2（#50157）
- 评论 8 | 点赞 2 | 状态：OPEN
- 两个显式提供的远程会话 ID 均读取失败，与 #49729 疑似关联。
- **重要性**：Dots 无法访问既有远程会话，跨端协同和数据互通失效。
- [查看 Issue](https://github.com/openai/codex/issues/50157)

### 9. Dot 任务在桌面端打开失败：WebSocket 需要代理时 app-server 不可用（#49829）
- 评论 7 | 点赞 1 | 状态：OPEN
- 企业/代理网络环境下，Dot 创建的云任务在桌面端无法恢复，Web 端可正常打开。
- **重要性**：代理场景下的连接兼容性缺失，影响企业用户的核心工作流。
- [查看 Issue](https://github.com/openai/codex/issues/49829)

### 10. 浏览器访问拒绝后无法恢复：缺乏细化授权与升级通道（#44881）
- 评论 3 | 点赞 3 | 状态：OPEN
- 浏览器工具的 URL 拒绝策略过于宽泛，用户无法通过此前授权的方式恢复任务，缺少显式的重新授权路径。
- **重要性**：浏览器工具的授权策略设计问题，容易造成任务死锁。
- [查看 Issue](https://github.com/openai/codex/issues/44881)

---

## 4. 重要 PR 进展（10 个）

### 1. 在 turn analytics 中记录工具变更次数（#50964）
- 新增 `tools_change_count` 字段，对比每次采样前的完整工具列表，统计会话中工具集的变化频率。
- [查看 PR](https://github.com/openai/codex/pull/50964)

### 2. 将 stable 环境工具暴露置于 feature flag 之后（#50962）
- 新增默认关闭的 `stable_environment_tools` 开关，控制是否在 executor 就绪前即对外暴露环境类工具。
- [查看 PR](https://github.com/openai/codex/pull/50962)

### 3. 现有 turn analytics 补充工具变更统计（#50943）
- 在 `codex_turn_event` 中加入 `tools_change_count`，便于后台按客户端标签分析工具使用变化。
- [查看 PR](https://github.com/openai/codex/pull/50943)

### 4. 安全恢复损坏的 Windows deny-read ACL 状态（#50940）
- 修复 `deny_read_acl_state.json` 格式损坏后恢复流程失败的问题，恢复时保留已有未知限制。
- [查看 PR](https://github.com/openai/codex/pull/50940)

### 5. 连接模式下 TUI 新会话改用服务端模型默认值（#50913）
- 修复客户端模型配置过期或模型目录为空时启动失败的问题。
- [查看 PR](https://github.com/openai/codex/pull/50913)

### 6. 新 TUI 线程尊重服务端 reasoning summary 配置（#50811）
- 修复客户端设置覆盖服务端 reasoning summary 默认值的问题。
- [查看 PR](https://github.com/openai/codex/pull/50811)

### 7. 合格的 remote-control 启动改用托管 daemon（#50803）
- `codex remote-control` 在满足条件时优先复用托管 daemon，否则回退到前台服务模式。
- [查看 PR](https://github.com/openai/codex/pull/50803)

### 8. Windows daemon junction 更新失败时回退到 mklink（#50802）
- 当进程内 reparse-point 操作被系统策略阻止时，改用系统 `mklink /J` 完成 junction 创建。
- [查看 PR](https://github.com/openai/codex/pull/50802)

### 9. Vim Normal 模式下从空 draft 直接打开斜杠命令（#50788）
- 空 draft 中输入 `/` 不再进入搜索，而是直接打开 slash command 菜单；仅在未启用 slash commands 时保持原行为。
- [查看 PR](https://github.com/openai/codex/pull/50788)

### 10. 持久化 Command Center 分组选择（#50786）
- 将分组偏好保存到客户端用户配置，重启后恢复用户选择，避免总是重置为 project 分组。
- [查看 PR](https://github.com/openai/codex/pull/50786)

---

## 5. 功能需求趋势

从今日 Issue 中可以归纳出以下社区关注方向：

- **跨设备协同与远程访问**：Android/iOS 上的 Remote 配对、Dots 读取远程会话、代理环境下的 WebSocket 连接等问题集中出现，说明远程协同已成为 Top 级需求，但跨端稳定性仍有较大提升空间。
- **用量与限频透明度**：多个 Issue 指出 Android 端看不到 Codex 用量额度、banked reset 过期过短、桌面用量统计与请求 Token 数不一致。用户对资源消耗的可观测性要求日趋明确。
- **沙箱与权限策略**：自动化任务沙箱配置被忽略、浏览器工具 URL 级拒绝缺少恢复路径、Dots 授权状态跨任务失效，均指向权限系统需要更细粒度、更可预期的设计。
- **Dots（自主代理）生态成熟度**：从创建任务、读取会话、执行授权到跨端打开，Dots 全链路均出现

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-05

## 1. 今日速览

- 发布 nightly 版本 **v0.64.0-nightly.20261005.gfb972b2f8**，属于常规夜间构建。
- 大量历史 Issue 被维护者机器人批量重新标记和更新，集中在 **Subagent 可靠性**（误报成功、挂起、上下文缺失）和 **浏览器 Agent 稳定性**。
- PR 方面出现一轮 **安全修复集群**（glob 路径逃逸、检查点目录穿越、外部检查器环境泄露），并有多项模型 ID 解析回归修复。

## 2. 版本发布

**v0.64.0-nightly.20261005.gfb972b2f8**（2026-10-05）

- 常规 nightly 自动发布，无独立的功能摘要。
- 完整变更日志可对比前一个 nightly：[v0.64.0-nightly.20261003...20261005](https://github.com/google-gemini/gemini-cli/compare/v0.64.0-nightly.20261003.gfb972b2f8...v0.64.0-nightly.20261005.gfb972b2f8)

## 3. 社区热点 Issues

以下 10 个 Issue 当前讨论最活跃或影响面最大：

1. **[P1] Subagent 在 MAX_TURNS 后误报 GOAL 成功** — #22323
   `codebase_investigator` 子代理在达到最大轮次后仍返回 `Termination Reason: "GOAL"`，实际未做任何分析。13 条评论，是当前最受关注的 Agent 可靠性缺陷。
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **[P1] Generalist agent 挂起** — #21409
   用户反馈一旦 Defer 到 generalist agent 就会永久挂起（等待一小时无响应），手工禁止使用子代理可绕过。8 个 👍，属于社区痛点。
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **[P1] get-shit-done 输出钩子导致崩溃** — #22186
   输出接近完成（打印用户摘要）时 CLI 崩溃，复现稳定，影响实际使用。
   https://github.com/google-gemini/gemini-cli/issues/22186

4. **[P1] Browser subagent 在 Wayland 下失败** — #21983
   浏览器子代理在 Wayland 环境无法正常工作，Termination Reason 仅显示 GOAL，无更多诊断。Linux 桌面用户受影响。
   https://github.com/google-gemini/gemini-cli/issues/21983

5. **[P1] Bugreport 不包含 subagent 上下文** — #21763
   `/bug` 报告只包含主会话内容，无法定位子代理内部故障，与 #22323 等子代理问题形成叠加。
   https://github.com/google-gemini/gemini-cli/issues/21763

6. **[P2] Browser Agent 忽略 settings.json 覆盖** — #22267
   用户配置的 `maxTurns` 等设置不生效，`AgentRegistry` 虽正确合并配置但 Browser Agent 运行时未使用。
   https://github.com/google-gemini/gemini-cli/issues/22267

7. **[P2] 工具数量超过 128 时出现 400 错误** — #24246
   可用工具过多导致请求被 API 拒绝（描述中同时出现 128 和 400 两个数字，可能指 128 后触发、400 报错）。期望 Agent 能按需裁剪工具范围。
   https://github.com/google-gemini/gemini-cli/issues/24246

8. **[P2] 模型常在随机位置创建临时脚本** — #23571
   模型倾向在项目各处散落临时脚本，用户清理 workspace 成本高，社区希望写入行为更收敛。
   https://github.com/google-gemini/gemini-cli/issues/23571

9. **[P2] Agent 应阻止/劝阻破坏性行为** — #22672
   复杂 git 操作中模型会使用 `git reset`、`--force` 等危险命令，社区呼吁更安全的默认行为。
   https://github.com/google-gemini/gemini-cli/issues/22672

10. **[P2] Gemini 不会主动使用 skills 和 sub-agents** — #21968
    用户反馈模型几乎不会自主调用自定义 skills 和子代理，即使相关场景也不使用，需显式指令才执行，削弱 Agent 能力。
    https://github.com/google-gemini/gemini-cli/issues/21968

## 4. 重要 PR 进展

以下 10 个 PR 今日有更新或处于活跃状态：

1. **fix(cli): 限制流式纯文本高度以减少闪烁** — #29629
   限制 `MarkdownDisplay` 中流式输出部分的高度，避免长输出时终端的全屏清除重绘，提升渲染平滑度。
   https://github.com/google-gemini/gemini-cli/pull/29629

2. **fix(core): 保留显式 Gemini 3 Pro Preview 模型 ID** — #29420（已关闭）
   修复 `--model gemini-3-pro-preview` 被隐式改写为 `3.1` 的问题，用户显式指定的模型版本应保持不被 rollout 覆盖。
   https://github.com/google-gemini/gemini-cli/pull/29420

3. **fix(quota): 展示服务器报告的配额限制和重置窗口** — #29429（已关闭，P1）
   读取 `ErrorInfo.metadata` 中 `quotaResetTimeStamp` 等字段，让用户能看到具体的配额限额和重置时间。
   https://github.com/google-gemini/gemini-cli/pull/29429

4. **fix(cli): 沙箱中持久化文件夹信任** — #29423（已关闭）
   修复 podman/docker 沙箱环境下信任决策未写回宿主 `trustedFolders.json`，导致每次启动重复询问的问题。
   https://github.com/google-gemini/gemini-cli/pull/29423

5. **fix(core): 请求内容不以 model turn 结尾** — #29527（P1）
   修复 `/rewind`、流式中断后发送历史以模型回复结尾导致 400 Bad Request 的问题。
   https://github.com/google-gemini/gemini-cli/pull/29527

6. **fix(core): 外部安全检查器最小化环境变量并限制输出** — #29523
   `CheckerRunner` 此前向第三方 checker 传递完整进程环境（含 `GEMINI_API_KEY`），且输出无上限，存在信息泄露与内存风险。
   https://github.com/google-gemini/gemini-cli/pull/29523

7. **fix(core): 保持 glob 工具匹配在已验证搜索目录内** — #29522
   `GlobToolInvocation` 对 `dir_path` 做了校验，但 `pattern` 未校验，glob 12 中绝对路径会绕过 cwd 逃逸到系统根目录，构成路径穿越漏洞。
   https://github.com/google-gemini/gemini-cli/pull/29522

8. **fix(core): 遗留 checkpoint 路径限制在检查点目录内** — #29521（P1）
   `path.join` 会归一化 `..` 导致 tag 形如 `x/../../secret` 写入目录之外，现加以约束。
   https://github.com/google-gemini/gemini-cli/pull/29521

9. **fix(a2a-server): 不从请求 agentSettings 派生工作区信任** — #29525
   `createTask()` 直接透传调用方的 `agentSettings.isTrusted` 到隔离环境，其他入口已做规范化，此为信任绕过修复。
   https://github.com/google-gemini/gemini-cli/pull/29525

10. **chore(deps): npm 依赖 75 项批量更新** — #29632
    包括 `@modelcontextprotocol/sdk`（1.23→1.30.1）、`@octokit/rest` 等，涉及面较广，待合入。
    https://github.com/google-gemini/gemini-cli/pull/29632

> 另有多个已关闭 PR 在今日被活动刷新（#29431 跳过无效 TOML 策略规则、#29422 保留显式版本化模型 ID、#29432 调度器销毁时清理排队工具），说明维护者正在集中收尾破窗修复。

## 5. 功能需求趋势

从今日活跃的 Issues 中可提炼出社区近期最关注的几个方向：

- **Agent 自主性提升**：希望模型更主动地使用自定义 skills 和 sub-agents（#21968）；让 Agent 能感知自身能力边界和 CLI 工具（#21432）。
- **Subagent 透明化**：可查看、分享子代理运行轨迹（#22598），`/bug` 报告包含子代理上下文（#21763）。
- **AST 感知的代码读取与检索**：用 AST 感知工具替代行号式文件读取，减少 token 消耗，提高代码定位精确度（#22745/#22746/#22747）。
- **持久化任务跟踪**：用文件系统替换基于上下文的 WriteToDo，避免 context rot 和跨会话丢失（#18836）。
- **浏览器 Agent 稳定性**：自动会话接管、锁恢复（

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-10-05

## 今日速览

今日发布了补丁版本 `v1.0.92-4`，新增 `copilot config` 配置管理子命令，并优化了首次启动和大量 MCP 服务器连接时的响应速度。Issue 区在过去 24 小时更新了 24 条，主要集中在 MCP 稳定性、身份验证、模型路由与各平台兼容性上。PR 方面暂无新进展。

## 版本发布

### v1.0.92-4

**新增功能**
- 新增 `copilot config` 子命令，用于列出、读取、设置和删除配置项。
- Canvas 动作现在支持返回图片（原 changelog 条目未完整显示）。

**改进**
- 首次启动时将内置 CLI 包解压放到子进程中执行，加快 first-run 启动速度。
- 同时连接多个 MCP 服务器时，提升了启动响应速度。

## 社区热点 Issues

1. [**#4998** macOS 更新/重启后 `.mcp-writer.binding` 残留导致 Copilot CLI 完全不可用](https://github.com/github/copilot-cli/issues/4998)  
   macOS 安全更新后，新会话和恢复会话都无法处理 prompt。属于平台级阻断问题，社区有 8 条评论、8 个 👍，目前仍为打开状态。

2. [**#640** `Invalid session ID: read_sql_files` 错误](https://github.com/github/copilot-cli/issues/640)  
   虽然已被关闭，但 24 条评论和 10 个 👍 说明影响范围较大，涉及 sessions 与 tools 联动时的会话 ID 处理问题。

3. [**#5008** 启动时出现 `Failed to read model provider attribution: Error: Not authenticated`](https://github.com/github/copilot-cli/issues/5008)  
   1.0.89 起每次新会话都会出现两次该错误，约 3 秒后签到才完成，疑似启动竞态。7 条评论、5 个 👍，已被关闭但仍值得关注。

4. [**#5042** HydraFusion 模型路由降级后，小上下文模型无法加载静态 prompt，工具集中途变化](https://github.com/github/copilot-cli/issues/5042)  
   长会话中 routed model 返回 400 后，同一会话被切换为小上下文模型，导致静态 prompt 无法载入且工具集发生变化。对依赖 HydraFusion 的用户影响较大。

5. [**#5051** 外部 provider 下约 20 分钟后请求超时并反复重发](https://github.com/github/copilot-cli/issues/5051)  
   使用 LM Studio 等外部 provider 时，Prompt 处理阶段会超时并重发。涉及自定义 provider 用户的稳定性，目前刚打开，1 条评论。

6. [**#5052** Ubuntu 26.04 工具沙箱 preflight 失败，但 bubblewrap 命名空间测试通过](https://github.com/github/copilot-cli/issues/5052)  
   工具调用在沙箱初始化时报 `unshare --user --net` 失败，而直接运行 bubblewrap 测试却正常。Linux 平台兼容性问题，值得关注。

7. [**#4971** 每约一小时出现一次 `Authorization error. Your credentials may be expired or invalid`](https://github.com/github/copilot-cli/issues/4971)  
   执行 `/login` 也无法解决，`mcp reload` 同样无效。属于身份验证与凭据刷新的高频痛点，3 条评论。

8. [**#4972** Windows 下 MCP worker 通过 wrapper 启动后，退出会话进程仍然存活](https://github.com/github/copilot-cli/issues/4972)  
   会话退出只终止了 wrapper，但后代 worker 进程残留。Windows 平台的 MCP 进程生命周期问题，3 条评论。

9. [**#4969** plugin marketplace 中单个插件描述超过 1024 字符会导致整个 marketplace 添加失败](https://github.com/github/copilot-cli/issues/4969)  
   Zod 校验过于严格，一个超长描述就拒绝整个 marketplace，且没有部分加载机制。插件生态易用性问题，1 条评论。

10. [**#5010** HEIC 图片附件无法被 assistant 识别，而 PNG 正常](https://github.com/github/copilot-cli/issues/5010)  
   通过 `--attachment` 传入 HEIC 时命令成功退出，但模型看不到图片，也没有显式的不支持提示。图片附件格式支持仍需完善。

## 重要 PR 进展

过去 24 小时内 GitHub 仓库没有 PR 更新，因此暂无重要 PR 可汇报。

## 功能需求趋势

从今日更新的 Issue 中可以看到社区关注度较高的几个方向：

- **MCP 生态稳定性**：MCP 服务器进程残留、大小写匹配、绑定文件残留、整体 marketplace 校验失败等问题频繁出现。
- **身份验证与凭据生命周期**：启动时未认证、每小时授权错误、`/login` 无法根治等问题说明 CLI 的鉴权状态管理仍需加强。
- **模型路由与上下文管理**：HydraFusion 降级后上下文不足、自定义 agent model 被忽略、空 completion 被误报为错误，是用户对模型层的主要不满。
- **平台兼容性**：macOS 安全更新、Windows MCP worker、Ubuntu 沙箱 preflight、企业代理下的 SDK 无头模式，均反映出跨平台适配仍有缺口。
- **配置与多仓库工作流**：新增的 `copilot config` 是明显补强；同时有用户提出希望在一个会话中加载多个仓库的自定义 instructions。
- **可观测性与诊断**：OTel span 中模型归属错误、后台 agent 状态显示不准确，说明用户对可观测性和状态展示也越来越敏感。

## 开发者关注点

- **认证问题干扰正常使用**：多个 Issue 指向凭据过期、重登无效、启动时未认证等场景，且这些错误会让用户误以为 CLI 完全不可用。
- **MCP 配置“一坏全坏”**：单个插件描述超长导致整个 marketplace 被拒绝，单个 MCP server 失败也会影响整体会话可用性，社区希望有更好的隔离与错误提示。
- **会话/模型状态混乱**：模型中途切换、工具集变化、空响应被渲染成重试错误，都会打断开发者心流，且诊断成本较高。
- **平台特性差异明显**：macOS、Windows、Linux 各自存在不同的问题，尤其是沙箱与子进程生命周期，开发者需要更稳定的跨平台体验。
- **附件与多模态支持待完善**：HEIC 无法作为图片被模型读取，说明原生多模态输入格式覆盖面还不够广。

---
数据来源：https://github.com/github/copilot-cli

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-10-05）

## 1. 今日速览

今日没有新版本发布，社区动态主要集中在大量历史 Issue 的收尾关闭与 TUI/GUI 功能增强 PR 的密集提交上。值得关注的是，围绕会话上下文管理（#44080）、流式响应异常（#52440）以及跨端 GUI 与 TUI 行为对齐（#53076、#53257）成为开发者讨论的核心焦点。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 社区热点 Issues

### #26846 [CLOSED] OpenCode 在 NixOS+WSL 环境中段错误
- **作者**: @muckelba | 评论: 10 | 👍: 16
- **链接**: https://github.com/anomalyco/opencode/issues/26846
- **关注点**: 在 NixOS 的 WSL 环境下运行 `nix run` 直接触发 segmentation fault，稳定版和 Dev 版均受影响。该问题收到 16 个 👍，是今日热度最高的 Issue 之一，社区关注度极高。

### #44080 [OPEN] compact 静默丢弃仅含 reasoning 的摘要，导致不可逆上下文丢失
- **作者**: @Thexinyi | 评论: 4
- **链接**: https://github.com/anomalyco/opencode/issues/44080
- **关注点**: 这是一个严重的数据完整性问题——当 `/compact` 使用的模型只返回思考内容而无正文时，OpenCode 会将空正文消息作为会话摘要，并销毁原始对话历史。该问题直接影响长期会话的可靠性，属于高风险 bug。

### #40485 [CLOSED] deepseek-v4-flash 通过 opencode-go 返回 403/挂起，同 key 下其他模型正常
- **作者**: @wqlooo1 | 评论: 7 | 👍: 6
- **链接**: https://github.com/anomalyco/opencode/issues/40485
- **关注点**: 特定模型经特定 provider 网关访问失败，而同一 API key 下 deepseek-v4-pro 和 minimax-m3 工作正常，可见问题可能出在 opencode-go 对该模型的适配层，而非全局配置。

### #40078 [CLOSED] 免费额度异常耗尽，提示 "Free usage exceeded, subscribe to Go"
- **作者**: @mike2003 | 评论: 5 | 👍: 4
- **链接**: https://github.com/anomalyco/opencode/issues/40078
- **关注点**: 用户仅使用少量请求后即触发免费额度上限，疑似策略变更或计费 bug。该问题与 #52623（中文用户反馈额度异常）高度相似，暗示免费额度计算可能存在系统性缺陷。

### #52623 [CLOSED] 使用额度异常
- **作者**: @zhouying-lawyer | 评论: 5
- **链接**: https://github.com/anomalyco/opencode/issues/52623
- **关注点**: 用户声称 5 小时未使用 API 却显示额度已用尽，周/月额度同样异常。附带了详细截图，是典型的额度计费争议，与 #40078 形成互补证据。

### #28141 [CLOSED] Big Pickle 模型返回 AI_APICallError
- **作者**: @mohammeditegypt-dot | 评论: 6
- **链接**: https://github.com/anomalyco/opencode/issues/28141
- **关注点**: OpenCode Zen 的 big-pickle 模型从 5月18日起停止响应，而其他免费模型（如 DeepSeek V4 Flash Free）正常。该问题持续近 5 个月后关闭，但直接影响了依赖该模型的用户。

### #34375 [CLOSED] 最新版 OpenCode 无法打开或无响应
- **作者**: @ignishub | 评论: 6
- **链接**: https://github.com/anomalyco/opencode/issues/34375
- **关注点**: 在多个 shell（fish/bash/sh）中以 1.17.11 版本运行时仅显示黑屏，说明 TUI 启动阶段存在兼容性问题。此类问题通常与终端检测或渲染初始化相关。

### #40348 [CLOSED] 全局 AGENTS.md 规则被反复遗忘
- **作者**: @xdewx | 评论: 3
- **链接**: https://github.com/anomalyco/opencode/issues/40348
- **关注点**: `~/.config/opencode/AGENTS.md` 中的全局规则（如 "不要自动提交"）跨会话甚至会话内被模型遗忘，用户被迫反复提醒。这直接影响日常使用体验，属于高频痛点。

### #40779 [CLOSED] macOS 26.5.1 高内存占用
- **作者**: @MarcoLeongDev | 评论: 2 | 👍: 1
- **链接**: https://github.com/anomalyco/opencode/issues/40779
- **关注点**: 与旧版 Issue #9239 的单进程大内存占用不同，新版问题表现为大量进程分散占用内存，用户在 16GB 内存的 M2 Air 上明显感受到性能压力。

### #40627 [CLOSED] 无法通过点击任务条目打开运行中的子代理
- **作者**: @Guation | 评论: 3
- **链接**: https://github.com/anomalyco/opencode/issues/40627
- **关注点**: 运行中的子代理无法通过点击其任务入口打开查看，只能先打开已完成子代理再用导航按钮切换。这是多代理工作流中的交互缺陷，影响排查效率。

## 4. 重要 PR 进展

### #53076 [OPEN] fix(app): 使 GUI 的 inbox、steer、queue 和 revert 行为与 TUI 对齐
- **作者**: @Hona | 创建: 2026-10-04 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53076
- **要点**: 全面对齐 GUI 与 TUI 在待办事项、撤销/重做、队列和压缩方面的行为差异，TUI 不受影响。PR 中附有详细的行为对照表，对桌面端用户是一大利好。

### #53257 [OPEN] fix(app): 在 GUI 中处理一次性配对链接
- **作者**: @Hona | 创建: 2026-10-05 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53257
- **要点**: #50970 和 #50972 将密码配对替换为一次性 `/auth/connect/<code>` 链接，但 GUI 的多个入口（Add server 对话框、桌面端、30 天会话过期场景）未适配。此 PR 补齐了这些遗漏。

### #53262 [OPEN] fix(app): 使 QR 配对跨域工作
- **作者**: @Brendonovich | 创建: 2026-10-05 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53262
- **要点**: 为 `server.connect` 添加 `access-control-allow-origin: *` 以支持托管 Web 应用在不同源上扫码配对，同时让 `redeemPairingLink` 区分错误类型，提升配对流程的可用性。

### #53264 [OPEN] feat(tui): 侧边栏上下文使用量和成本按阈值着色
- **作者**: @Nowaker | 创建: 2026-10-05 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53264
- **要点**: 为 TUI 侧边栏的 context 使用量和成本添加阈值颜色指示，方便用户直观感知资源消耗状态。PR 基于 #53205 叠加，需注意只查看最后一个 commit。

### #53261 [OPEN] feat(tui): 侧边栏 MCP 按状态显示计数
- **作者**: @Nowaker | 创建: 2026-10-05 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53261
- **要点**: 新增 `sidebar.mcp_summary` 配置项，在侧边栏 MCP 标题旁显示各状态（如已连接、失败）的摘要计数，帮助用户快速了解 MCP 服务健康状态。

### #53259 [OPEN] feat(tui): 侧边栏 Todo 标题后显示待办计数
- **作者**: @Nowaker | 创建: 2026-10-05 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53259
- **要点**: 为 TUI 侧边栏 Todo 标题添加可选计数显示，让用户一眼看到当前待办数量。与 #53261 同样是 Nowaker 对 TUI 侧边栏信息密度的一系列增强。

### #53205 [OPEN] feat(tui): 添加紧凑型侧边栏上下文显示
- **作者**: @Nowaker | 创建: 2026-10-04 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53205
- **要点**: 新增 `sidebar.context` 配置项，提供 "expanded"（四行）和 "compact"（单行）两种显示模式，适配不同屏幕空间需求。

### #53254 [OPEN] fix(opencode): 免费额度限制时显示重置时间
- **作者**: @werlang | 创建: 2026-10-05 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53254
- **要点**: 针对 #52894，修复免费 429 响应缺少重置时间的问题。此前免费额度提示为静态文本，而 Go 订阅限制会显示 "It will reset in X" 的倒计时，此 PR 让免费用户也能看到恢复时间。

### #52440 [OPEN] fix(opencode): 重试前完成流式响应部分
- **作者**: @markttq | 创建: 2026-10-01 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/52440
- **要点**: 修复 #44894：# 当 provider 流在尝试中失败时，活跃的 reasoning 和 text parts 可能收不到结束事件。重试循环在清理前未正确 finalize 这些 parts，该 PR 确保状态清理前完成资源释放。

### #53253 [OPEN] fix(edit): 匹配混合换行符文件中的 LF 区域
- **作者**: @ggbdpq | 创建: 2026-10-05 | 更新: 2026-10-05
- **链接**: https://github.com/anomalyco/opencode/pull/53253
- **要点**: 修复 #45880：`detectLineEnding` 只要检测到单个 `\r\n` 就把整个文件当作 CRLF 处理，导致混合换行符文件中的 LF 区域编辑错误。此 PR 让 edit 工具在混合换行符文件中正确匹配目标区域。

## 5. 功能需求趋势

### AI 模型生态适配仍是核心关注点
过去 24 小时内的 Issue 涉及 DeepSeek v4 Flash/Pro、Big Pickle、Nemotron 3 Ultra、QWEN 3.8 Max 等多个模型的异常问题，涵盖免费额度、403 错误、流中断、max_tokens 范围等。社区对多模型稳定接入的需求非常强烈。

### TUI 信息密度与可读性增强
来自 @Nowaker 的三连发 PR（#53205、#53259、#53261）显示社区对 TUI 侧边栏的深度打磨需求集中释放，包括上下文显示模式切换、Todo 计数、MCP 状态摘要等，体现开发者对 "工作效率可视化" 的追求。

### GUI 与 TUI 行为一致性
多桌面端 PR（#53076、#53257、#53262）表明项目正处于 "GUI 补齐期"——随着桌面应用逐渐成熟，开发团队正系统性对齐 GUI 与 TUI 的功能差异，包括配对流程、队列、撤销、子代理展示等。

### 上下文管理的安全性与可恢复性
#44080（compact 上下文丢失）和 #40348（规则被遗忘）分别从数据安全和行为一致性两个维度揭示了上下文管理中的痛点。开发者对 "不可逆操作" 的容错机制、规则持久化有很高期待。

### 代理/多代理工作流可视化
#40627（点击打开运行中的子代理）与 #40564（并行多代理 UI 可视化）反映了用户对多代理任务运行状态透明化的需求，尤其在大规模并行任务场景下，直观的视觉反馈至关重要。

## 6. 开发者关注点

### 免费额度与计费透明度
多条 Issue（#40078、#52623）与 1 个 PR（#53254）涉及免费额度的异常扣除/不透明提示。开发者对额度重置时间、使用量统计的透明性有迫切需求。

### 流式响应稳定性
#40451（模型中途自动停止）、#40732（Streaming response failed: ResourceExhausted）、#40459（CLI 无响应）等 Issue 显示流式响应的稳定性是影响日常使用体验的核心痛点，尤其是在长任务和高峰时段。

### 全局规则与配置的持久性
#40348 代表性极强：全局 AGENTS.md 规则跨会话被反复遗忘，导致用户不断重复相同的约束指令。这在需要精细控制 AI 行为的项目中尤为致命。

### 特定环境兼容性
NixOS+WSL 段错误（#26846）、macOS 内存膨胀（#40779）、Windows 桌面端空白响应（#40483）、QR 配对跨域（#53262）等环境特异性问题表明，跨平台兼容仍是需要持续投入的方向。

### 插件与扩展生态
#34004 要求补全 Anthropic-compatible 自定义 provider 的桌面工作流，#40506 希望引入 OmniRoute 简化 provider 切换，#40782 请求添加 computer-use 能力。开发者期待 OpenCode 在保持轻量的同时，提供更丰富的扩展能力和第三方集成选项。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-05）

## 今日速览

- 发布 `v0.24.7-nightly.20261004` 版本，主要修复 Code Mode 文本与懒工具发现的对齐问题，以及权限审批流程。
- 多智能体（managed-agent）持续占据开发主线：本轮活跃 PR 集中在认证券、Kubernetes 运行时、SSE 性能优化等基础设施方向。
- 本地模型支持成为社区强诉求：#13415 指出本地 Qwen3.x 模型被错误假设为 1M 上下文导致自动压缩失效，对应修复 PR #13421 已提交。


## 版本发布

**v0.24.7-nightly.20261004.9915c7ff8f**

- fix(core): 对齐 Code Mode 文本与 lazy tool discovery 行为（PR #12990）
- fix(permissions): 优化已批准权限的处理逻辑（内容截断，详见 Release 页面）

🔗 https://github.com/QwenLM/qwen-code/releases


## 社区热点 Issues

本期共追踪 50 条活跃 Issue，以下按优先级与社区关注度选出 10 条：

**1. P1 | 临时存储故障永久卡死运行中的 Turn**
`bug(hosted)`: Managed Session Store 短暂不可达时，Harness 会永久停止写入该 Session 日志，导致 Turn 既无法完成也无法取消，一次瞬时故障演变为永久阻塞。评论 3 条。
🔗 https://github.com/QwenLM/qwen-code/issues/13413

**2. P1 | ≥8 并发 Turns 在模型回复后停顿（lock convoy）**
`managed-agent` 在普通硬件上运行 8 个以上并发会话时，store 路径出现锁竞争，模型已回答但 Turn 无法继续。评论 7 条，为当前性能类最高热度 Issue。
🔗 https://github.com/QwenLM/qwen-code/issues/13333

**3. P1 | ACP 无法区分用户取消与异常中断**
`POST /session/:id/continue` 在守护进程重启后无法区分显式用户取消和意外中断，两者恢复为相同的 ACP 历史形状。该 Issue 自 7 月创建至今仍未关闭，评论 4 条。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*