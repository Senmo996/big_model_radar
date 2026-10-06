# AI CLI 工具社区动态日报 2026-10-06

> 生成时间: 2026-10-06 03:43 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-06）

## 1. 生态全景

当前 AI CLI 工具进入「高频迭代 + 平台化分化」阶段：头部工具如 OpenAI Codex、Qwen Code 以周级甚至日级节奏发布版本，围绕 Agent 架构、云电脑、多智能体协作构建差异化能力。与此同时，社区反馈高度集中于 Agent 自主性失控、Windows/WSL 支持缺陷、MCP 集成成熟度不足、数据持久化与权限边界等共性问题。整体呈现“功能创新快于稳定性建设”的态势——各工具都在抢跑新场景，但基础体验的打磨尚未跟上扩张速度。

## 2. 各工具活跃度对比

> 注：Issues/PR 数为日报中列举的社区热点条目及重点 PR，并非当日全部增量；未披露数据以“—”标注。

| 工具 | 社区热点 Issues | 重点 PR 数 | Releases |
|------|----------------|-----------|----------|
| Claude Code | 1+（LSP 插件配置失效 #15148） | — | v2.1.290 |
| OpenAI Codex | 10 | 10（合并 PR 20+） | rust-v0.160.1 + 2 alpha |
| Gemini CLI | 6（5 个 P1 Bug） | —（安全加固/崩溃修复为主） | v0.64.0-nightly |
| GitHub Copilot CLI | 9 | 1 | v1.0.92、v1.0.92-5、v1.0.93-0、v1.0.93-1 |
| Kimi Code CLI | 0 | 0 | 无 |
| OpenCode | 10 | 7 | 无 |
| Qwen Code | 10 | 10 | CLI v0.25.0、Desktop v0.25.0、SDK v0.1.18 |

**简要解读**：OpenCode 与 Qwen Code 社区讨论最密集，且都有架构级议题；OpenAI Codex 合并 PR 数量最多，但长期未关闭的遗留问题也最多；Copilot CLI 发布频繁但代码变动较小，处于稳健维护期；Kimi Code 当日完全静默。

## 3. 共同关注的功能方向

### 3.1 Agent 自主性边界与循环控制
- **OpenCode**：#15533 自动压缩死循环、#49414 未知 finish reason 导致无限步骤、#49042 Agent 自动续跑 500+ 步。
- **Gemini CLI**：#21409 Generalist 代理永久挂起、#22323 子代理超时被误报为成功。
- **OpenAI Codex**：子代理单任务消耗 2.42 亿 tokens、占周配额 11%，引发配额失控担忧。

**共性诉求**：需要强制循环熔断、决策点暂停、配额上限与状态透明化，防止模型在无人介入的情况下无限消耗资源。

### 3.2 Windows/WSL 一等公民支持
- **OpenAI Codex**：#41463 Windows+WSL 项目创建失败、#16994 自动化 rollout 不生效，均为数月未决的老 issue。
- **OpenCode**：PR #16069 增加 PowerShell 一等公民支持（今日关闭，历时 7 个月落地）。
- **Gemini CLI**：#21983 浏览器代理在 Wayland 下失败，映射出 Linux 桌面环境适配不足。

**共性诉求**：跨平台不再“能用就行”，开发者要求各平台行为一致、路径解析正确、自动化链路可靠。

### 3.3 MCP 集成深度与认证体验
- **Copilot CLI**：#1803 支持 `resources/read` 原语、#4991 Cloudflare MCP OAuth 失败。
- **OpenCode**：#26195 Google Drive MCP OAuth 流无法打开浏览器，今日提交修复 PR #53468。
- **

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills（截至 2026-10-06）

---

## 1. 热门 Skills 排行

以下 PR 位于当前仓库评论/关注度前列，状态均为 Open，涵盖核心元技能修复与新技能贡献。

### 1.1 `skill-creator` — 触发器评估隔离与跨平台修复  
- **PR**: [#1298](https://github.com/anthropics/skills/pull/1298)  
- **功能**：修复 skill-creator 评估流程中触发器误报/漏报问题，隔离 worker 命令探测，处理 Windows 管道 `select()` 失败，避免运行时故障被错误当作负例。  
- **讨论热点**：社区关注技能评估的确定性、Windows 兼容性以及运行时故障对优化方向的误导。  
- **状态**：Open

### 1.2 `mcp-builder` — MCP SDK 2.0 兼容性修复  
- **PR**: [#1742](https://github.com/anthropics/skills/pull/1742)  
- **功能**：适配 `mcp>=2.0.0` 中 `streamable_http_client` 重命名及自定义 HTTP 头的配置方式变化。  
- **讨论热点**：新版 MCP 服务器的连接可靠性，尤其是依赖 streamable HTTP 的远程服务集成。  
- **状态**：Open

### 1.3 `proofcore-contract-auditor` — 智能合约审计新技能  
- **PR**: [#1771](https://github.com/anthropics/skills/pull/1771)  
- **功能**：为 Web3 开发者提供 Solidity/Rust 智能合约静态分析，并将审计证明锚定到 TON 区块链。  
- **讨论热点**：Web3 安全、链上审计公证、零存储 Merkle 协议的实际应用价值。  
- **状态**：Open

### 1.4 `md2video-audio` — Markdown 转视频新技能  
- **PR**: [#1703](https://github.com/anthropics/skills/pull/1703)  
- **功能**：将 Markdown 文档基于 Marp 转为幻灯片并生成带拟人化配音的 MP4 视频，零成本工作流。  
- **讨论热点**：内容创作自动化、教学/演示场景的视频化效率。

---

# Claude Code 社区动态日报 — 2026-10-06

## 今日速览

v2.1.290 发布，核心是插件/Mod Hook 系统的能力增强（`serverToolUses` 与 `agentId`）。社区侧最受关注的是长期未修复的 LSP 插件配置失效问题（#15148，👍 73）和 Fable

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-06

## 今日速览

昨日 Codex 发布了 `rust-v0.160.1` 稳定版修复及两个 alpha 版本，MCP 远程服务器在 Windows 环境下的环境变量保留问题得到解决。社区最热门的讨论集中在 Windows + WSL 项目创建失败、Dots 任务授权与文件持久化问题，以及子代理（Subagents）配额消耗异常。PR 方面，超过 20 个合并请求聚焦于沙箱安全加固、TUI 优化与 Daybreak 门控策略。

## 版本发布

### rust-v0.160.1
- **修复**：当远程 stdio MCP 服务器配置了显式远程环境变量时，现在会正确保留 `SYSTEMROOT`、`TEMP`、`TMP`，使得 Unix 主机能够继承 Windows 执行器的启动环境。
- **Changelog**：[#51121](https://github.com/openai/codex/pull/51121)

### rust-v0.162.0-alpha.16 / rust-v0.162.0-alpha.15
- 两个 Alpha 预发布版本，暂无详细变更说明。

---

## 社区热点 Issues（10 条）

1. **[Windows + WSL] Cannot create projects – AbsolutePathBuf deserialized without a base path** — [#41463](https://github.com/openai/codex/issues/41463)
   - **热度**：63 评论 / 34 👍，创建于 8 月底，至今仍开放。
   - **核心**：Codex 桌面版在 Windows + WSL2 环境下无法创建项目，路径反序列化缺少基准路径。
   - **关注原因**：Windows/WSL 是高频开发场景，该问题持续一个多月仍未解决，社区讨论激烈。

2. **[Windows ↔ Android] Remote pairing loop — “Approve this phone” repeats** — [#49618](https://github.com/openai/codex/issues/49618)
   - **热度**：26 评论 / 16 👍，已关闭。
   - **核心**：Windows 桌面版与 Android 端远程配对确认循环，扫码后手机反复要求审批。
   - **关注原因**：跨设备配对体验是远程开发工作流的关键环节。

3. **[Dots] Previously working cloud-computer files unavailable; Reboot test did not reproduce** — [#49682](https://github.com/openai/codex/issues/49682)
   - **热度**：22 评论 / 6 👍。
   - **核心**：Dot 云电脑上原本正常的服务文件在同一天内丢失，终端会话消失，重启后未能复现。
   - **关注原因**：Dots 的文件持久化和状态可靠性直接影响用户信任。

4. **[DOT] UNKNOWN task creation, stale disconnect notifications, ambiguous task reads** — [#50127](https://github.com/openai/codex/issues/50127)
   - **热度**：15 评论。
   - **核心**：DOT 工作流中任务创建不明确、断连通知过期、任务读取歧义、Luna schema 失败。
   - **关注原因**：Dots 是当前 Codex 重点能力，这类基础流程不稳定的问题影响面较大。

5. **[Windows/WSL] Desktop automations create runs but no rollout materializes** — [#16994](https://github.com/openai/codex/issues/16994)
   - **热度**：14 评论 / 5 👍，4 月创建仍开放。
   - **核心**：Windows/WSL 上的自动化任务创建成功但 rollout 不出现，恢复时报 “no rollout found”。
   - **关注原因**：老牌 issue，说明 Windows 自动化链路缺陷长期未解决。

6. **[Enhancement] Codex Desktop: project management for registering projects and moving threads** — [#25498](https://github.com/openai/codex/issues/25498)
   - **热度**：13 评论 / 7 👍。
   - **核心**：建议从侧边栏注册本地文件夹为项目、跨项目迁移会话线程。
   - **关注原因**：项目级组织管理是桌面重度用户的普遍诉求，缺乏该功能会限制工作流整理效率。

7. **[Windows Desktop][GPT-5.6 Sol] Turn runs indefinitely after successful tool result** — [#32714](https://github.com/openai/codex/issues/32714)
   - **热度**：12 评论 / 2 👍。
   - **核心**：工具调用成功返回后，回合持续运行不结束，无后续推理。
   - **关注原因**：回合挂起会阻塞整个会话，Windows 平台高推理强度下的稳定性问题。

8. **[Dots][GitHub tools] Later user authorization is not reliably recognized** — [#50769](https://github.com/openai/codex/issues/50769)
   - **热度**：12 评论。
   - **核心**：用户已授权开发与发布，但后续任务仍反复触发只读权限拦截。
   - **关注原因**：Dots 自动化权限状态同步存在缺陷，影响长时间无人值守任务。

9. **[Enhancement] Auto Resume / Goal after limit reached once limit is reset (5h)** — [#28931](https://github.com/openai/codex/issues/28931)
   - **热度**：8 评论 / **42 👍**（点赞最高）。
   - **核心**：达到 5 小时或周限额后，自动恢复 Goal 任务。
   - **关注原因**：长任务执行被额度中断是高频痛点，该需求社区认可度极高。

10. **[Enhancement] Configurable custom pet animation sequences and activity events** — [#20863](https://github.com/openai/codex/issues/20863)
    - **热度**：9 评论 / 8 👍。
    - **核心**：自定义宠物（`pet.json`）支持可配置动画序列与活动事件。
    - **关注原因**：趣味性功能，但社区参与度稳定，体现 Codex 桌面端个性化生态的延展需求。

---

## 重要 PR 进展（10 条）

1. **[#51256] Start the Windows sandbox service during registered Core setup** — [链接](https://github.com/openai/codex/pull/51256)
   - 修复注册 Core 设置时 Windows 沙箱服务未启动导致无法预配沙箱的问题。

2. **[#51253] Enforce Fast and Ultra Fast policies independently** — [链接](https://github.com/openai/codex/pull/51253)
   - 新增默认启用的 `features.ultrafast_mode`，使 Fast 与 Ultra Fast 策略可独立配置。

3. **[#51249] Handle partial answers consistently across agent workflows** — [链接](https://github.com/openai/codex/pull/51249)
   - 统一处理部分答案（partial answers），避免空片段被计为最终响应。

4. **[#51241] Add a partial answer message phase** — [链接](https://github.com/openai/codex/pull/51241)
   - 新增 `MessagePhase::PartialAnswer`，区分助手回答中间态与最终态。

5. **[#51235] Remove default model labels from TUI model pickers** — [链接](https://github.com/openai/codex/pull/51235)
   - TUI 模型选择器不再追加 `(default)` 标签，保留 `(current)` 标记。

6. **[#51230] Make session lookup pagination stable and report listing failures** — [链接](https://github.com/openai/codex/pull/51230)
   - 修复会话查找分页不稳定问题，避免重复标签检测遗漏。

7. **[#51223] Remove legacy personality template metadata** — [链接](https://github.com/openai/codex/pull/51223)
   - 移除旧人物模板元数据，向后兼容旧的 catalog 格式。

8. **[#51221] Separate environment requests from runtime selections** — [链接](https://github.com/openai/codex/pull/51221)
   - 引入 `TurnEnvironmentRequest`，将调用方环境输入与会话运行时的环境选择解耦。

9. **[#51220] Honor the OTLP metrics temporality preference** — [链接](https://github.com/openai/codex/pull/51220)
   - 支持通过 `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` 配置指标的累计或增量时间性。

10. **[#51211] Reject sandbox-writable bubblewrap executables from PATH** — [链接](https://github.com/openai/codex/pull/51211)
    - 沙箱安全加固：过滤 PATH 中位于可写根目录下的可执行文件，防止沙箱逃逸。

---

## 功能需求趋势

从近期 Issues 与 PR 综合来看，社区关注方向集中在以下四点：

- **Dots 稳定性与权限一致性**：文件丢失（[#49682](https://github.com/openai/codex/issues/49682)）、授权不同步（[#50769](https://github.com/openai/codex/issues/50769)）、任务状态不透明（[#50127](https://github.com/openai/codex/issues/50127)）等高频问题说明 Dots 仍是当前迭代重心。
- **项目与会话管理**：项目注册、线程跨项目迁移、会话可见性限制（[#25498](https://github.com/openai/codex/issues/25498)、[#25761](https://github.com/openai/codex/issues/25761)）等诉求反映桌面端在大型工作区场景下的管理能力欠缺。
- **Windows / WSL 一等公民支持**：从项目创建失败（[#41463](https://github.com/openai/codex/issues/41463)）到自动化不生效（[#16994](https://github.com/openai/codex/issues/16994)），Windows 生态问题数量多、生命周期长，开发者期待更完善的平台适配。
- **删除与数据控制**：多条关于“无法删除 Work 会话”的 issue（[#46232](https://github.com/openai/codex/issues/46232)、[#45442](https://github.com/openai/codex/issues/45442)、[#47023](https://github.com/openai/codex/issues/47023)）表明用户在数据自主控制方面有强烈诉求。

---

## 开发者关注点

- **Windows 平台稳定性是最大痛点**：WSL 环境配置、路径解析、自动化恢复等老问题长期未关闭，累计大量评论与点赞。社区对 Windows 平台的耐心正在消耗。
- **限流与恢复机制需求强烈**：`Auto Resume after limit`（#28931）获得 42 👍，说明长任务用户在额度中断后需要自动续跑而非手动重启。
- **子代理资源消耗令人担忧**：单个任务处理 2.42 亿 tokens、消耗 11% 周配额（[#46023](https://github.com/openai/codex/issues/46023)），社区对子代理的 token 控制与配额透明度提出质疑。
- **删除功能缺失是隐私隐患**：多条 issue 强调“对话无法删除”构成隐私与数据控制问题，尤其是 Work 场景下的企业用户。
- **Dots 权限逻辑需透明化**：用户已授权但任务仍被拦截（[#50769](https://github.com/openai/codex/issues/50769)）等案例，表明权限状态同步与展示需要更清晰的反馈机制。

---
*本日报由 AI 自动汇总生成，数据来源：[github.com/openai/codex](https://github.com/openai/codex)*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-06）

## 1. 今日速览

今日 Gemini CLI 发布 v0.64.0-nightly 夜间版，社区讨论高度聚焦于 Agent/子代理稳定性问题：generalist 代理挂起、子代理超时被误报为成功、浏览器代理在 Wayland 下失败等 P1 级缺陷引发较多关注。PR 侧以安全加固（grep 注入防护）和关键崩溃修复（进程挂起、100% CPU 占用）为主线。

## 2. 版本发布

**v0.64.0-nightly.20261006.gfb972b2f8**（2026-10-06）
- 自动化夜间版本发布，无独立更新说明。
- 完整变更比较：[v0.64.0-nightly.20261005...v0.64.0-nightly.20261006](https://github.com/google-gemini/gemini-cli/compare/v0.64.0-nightly.20261005.gfb972b2f8...v0.64.0-nightly.20261006.gfb972b2f8)

## 3. 社区热点 Issues

### 🐛 高优先级 Bug（P1）

1. **[#21409] Generalist agent 永久挂起**  
   P1 | 8 评论 | 8 👍  
   `gemini-cli` 委派给 generalist 代理时永久挂起，等待超过一小时仍无响应；指示模型不使用子代理后问题消失。社区有 8 人点赞，属于影响面较大的阻断性问题。  
   https://github.com/google-gemini/gemini-cli/issues/21409

2. **[#22323] 子代理 MAX_TURNS 恢复被误报为 GOAL 成功，中断被隐藏**  
   P1 | 13 评论 | 2 👍  
   `codebase_investigator` 子代理在达到最大轮次限制后仍返回 `Termination Reason: "GOAL"` 和 `status: "success"`，掩盖了真实的中断原因。共 13 条评论，是今日讨论量最大的 Issue。  
   https://github.com/google-gemini/gemini-cli/issues/22323

3. **[#21983] browser 子代理在 Wayland 环境下失败**  
   P1 | 4 评论 | 1 👍  
   Wayland 会话中浏览器子代理直接以 `GOAL` 终止，无法完成预期操作，影响 Linux 桌面用户。  
   https://github.com/google-gemini/gemini-cli/issues/21983

4. **[#22186] get-shit-done 输出钩子导致崩溃**  
   P1 | 3 评论  
   输出摘要即将完成时 Gemini CLI 反复崩溃。由于该钩子常用于自动化工作流，崩溃会中断整体任务。  
   https://github.com/google-gemini/gemini-cli/issues/22186

5. **[#21763] `/bug` 报告不包含子代理上下文**  
   P1 | 2 评论  
   排查子代理问题时，生成的 bug 报告只有主会话内容，缺少子代理内部信息，导致问题定位困难。  
   https://github.com/google-gemini/gemini-cli/issues/21763

### 💡 重要功能与增强

6. **[#19873] 零依赖 OS 沙箱 + 执行后意图路由，释放模型 bash 原生能力**  
   P2 | 9 评论 | 1 👍  
   提议让 Gemini 3 模型以原生 bash 方式

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-06）

## 1. 今日速览

过去 24 小时 Copilot CLI 发布了 v1.0.93-1 与 v1.0.93-0 两个修复版本，重点解决语言服务器常驻和紧凑命令展开问题。社区讨论集中于 MCP 连接稳定性、BYOK 多模型配置以及 AutoPilot 模式的人机确认机制。PR 方面仅有 1 条新提交，暂无实质功能合入。

## 2. 版本发布

**v1.0.93-1**  
- 常规修复与变更（无详细说明）。  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.93-1

**v1.0.93-0**  
- **Fixed**：禁用沙箱时，预热语言服务器可在 LSP 请求之间保持运行。  
- **Fixed**：点击被截断的紧凑 shell 命令可展开显示。  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.93-0

**v1.0.92**  
- 新增 `copilot config` 子命令，支持列出、读取、设置和删除配置项。  
- 新增对话前 Ctrl+E 环境选择器，可切换本地或云端运行环境。  
- Entra 保护的 MCP 服务器可静默续期仅访问令牌的凭据。  
- 遗留 HTTP+SSE MCP 连接的处理调整（原文描述不完整）。  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.92

**v1.0.92-5**  
- **Improved**：Microsoft Entra 登录后可选择使用哪个账户，并支持通过 `/logout` 退出这些 OAuth 会话。  
- **Fixed**：Entra 保护的 MCP 服务器可静默续期仅访问令牌的凭据。  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.92-5

## 3. 社区热点 Issues

**1. 支持在 Copilot CLI 中配置多个 BYOK 模型**  
#3282 | 👍 31 | 💬 13 | 已关闭  
社区强烈希望支持多个 BYOK 模型，而不是仅通过环境变量配置单个。当前 TUI 中无法直接切换 BYOK 模型，需重启会话。  
https://github.com/github/copilot-cli/issues/3282

**2. macOS 安全更新后 Copilot CLI 完全不可用**  
#4998 | 👍 9 | 💬 9 | 开放  
安装 macOS 最新安全更新并重启后，新建和恢复的会话均无法处理提示。问题定位到 `.mcp-writer.binding` 持久化了过期的文件系统设备 ID，影响面较大。  
https://github.com/github/copilot-cli/issues/4998

**3. Mission Control 仪表盘链接 404**  
#4775 | 👍 2 | 💬 8 | 开放  
GitHub Mission Control 的 “Created by me” 面板将远程会话链接指向不存在的 `/copilot/tasks/<uuid>`，实际会话地址在 `/agents/tasks/<uuid>`，导致从仪表盘无法直接访问。  
https://github.com/github/copilot-cli/issues/4775

**4. 允许为 BYOK 配置自定义 HTTP 请求头**  
#3399 | 👍 14 | 💬 7 | 已关闭  
部分 LLM 服务端需要 `X-Tenant-ID`、`X-Organization-ID` 等自定义请求头，社区希望 BYOK 配置能支持自定义 header，以满足企业隔离和路由需求。  
https://github.com/github/copilot-cli/issues/3399

**5. 恢复的会话保留过期的连接 item ID**  
#4505 | 👍 3 | 💬 6 | 已关闭  
重新打开并恢复会话后，所有提示均报 `400 input item ID does not belong to this connection`，且 `/fork` 也无法恢复，影响长会话的可靠性。  
https://github.com/github/copilot-cli/issues/4505

**6. 添加 `/effort` 命令快速切换推理力度**  
#3074 | 👍 12 | 💬 4 | 已关闭  
当前通过 `/model` 切换推理力度步骤繁琐，社区希望有类似 `/effort` 的直接命令，根据任务复杂度快速在 Low/Medium/High 之间切换。  
https://github.com/github/copilot-cli/issues/3074

**7. 支持 MCP `resources/read` 原语**  
#1803 | 👍 13 | 💬 2 | 开放  
MCP 服务器可通过 `resources` 原语暴露数据，但 Copilot CLI 目前仅支持 tools，无法读取 resources，限制了与 MCP 生态的集成深度。  
https://github.com/github/copilot-cli/issues/1803

**8. Cloudflare MCP 连接 OAuth 后失败**  
#4991 | 👍 0 | 💬 3 | 开放  
Cloudflare 远程 MCP 服务器在成功 OAuth 后报 `MCP error -32603: Subscription limit reached`，随后 UI 提示需要重新认证，OAuth 流程实际未完成。  
https://github.com/github/copilot-cli/issues/4991

**9. AutoPilot 模式应暂停等待用户确认**  
#3595 | 👍 2 | 💬 3 | 开放  
在代码审查场景中，AutoPilot 会自动选择修复方案而不等待用户逐条确认，社区希望增加“决策点暂停”机制，用于需要人工审批的环节。  
https://github.com/github/copilot-cli/issues/359

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-10-06）

## 今日速览

Agent 循环失控与自动压缩（auto-compaction）问题成为今日社区最集中的痛点，多起 Issue 指向**无用户输入时 Agent 无限自续**及**压缩后注入合成消息导致的死循环**。与此同时，MCP OAuth 认证流程（尤其是 Google Drive MCP）正处于修复窗口期，两个相关 PR（#53468、#53471）于今日提交/关闭。性能方面，`git diff` 进程风暴导致的请求超时问题已获得针对性修复（#53449）。

---

## 社区热点 Issues

### 1. Auto-compaction 无限循环：assistant 自然结束时仍注入 "Continue..." — [#15533](https://github.com/anomalyco/opencode/issues/15533)
**26 条评论 · 12 👍** — 今日最热 Issue。当助手自然结束回合（如通过 question 工具提问或正常完成回复）时，`SessionCompaction.process()` 仍无条件注入合成 "Continue..." 用户消息，触发反复压缩死循环。该问题自 3 月创建至今仍处于 OPEN 状态，社区持续关注。

### 2. 撤销静默移除 Go 隐私措辞与提供商归属，并补充遥测/保留政策 — [#39875](https://github.com/anomalyco/opencode/issues/39875)
**7 条评论 · 49 👍** — 今日最高赞 Issue。Go 订阅用户指控近两周两次提交更改了 OpenCode 的隐私披露，未加说明地移除了 Go 提供商归属标识，要求恢复隐私措辞并将数据保留政策透明化。社区反响强烈，关联 #39860、#39857 等多个历史 Issue。

### 3. opencode mcp auth 无法打开浏览器完成 Google Drive OAuth 流 — [#26195](https://github.com/anomalyco/opencode/issues/26195)
**10 条评论 · 11 👍** — 运行 `opencode mcp auth gdrive` 输出 "Authentication successful!" 但浏览器从未打开、令牌未保存。OAuth 流程中途失败且无明确错误，直接导致 Google Drive MCP 无法使用。今日 PR #53468 已提交修复。

### 4. 间歇性 OpenAI 服务不可用：上游连接故障跨模型、跨会话出现 — [#52269](https://github.com/anomalyco/opencode/issues/52269)
**8 条评论** — 部分请求成功、部分持续失败并触发自动重试，重启后短暂恢复。错误为 `Service Unavailable: upstream connect error or disconnect/reset before headers`。9 月 30 日创建，更新频繁，影响面广但尚无明确结论。

### 5. Agent 步骤循环在未知 finish reason 下永不终止 — [#49414](https://github.com/anomalyco/opencode/issues/49414)
**4 条评论** — 当 provider 的 finish reason 未被 opencode 识别（unknown）且无工具调用时，`SessionPrompt.run` 的步骤循环永远不退出，形成无界请求风暴。与 #15533 同属"循环失控"集群，社区的关注度正在上升。

### 6. Snapshot 在 git < 2.45 上失败：`git add --all --sparse` 未知选项 — [#52953](https://github.com/anomalyco/opencode/issues/52953)
**3 条评论** — `--sparse` 参数在 Git 2.45 才加入 `git add`，导致旧 Git 环境下每次编辑都记录 `failed to capture snapshot`，checkpoint/revert 功能完全失效。影响所有使用 Git 2.44 及以下版本的用户。

### 7. 配置目录任意文件写入触发无防抖兼容性重载 — [#53393](https://github.com/anomalyco/opencode/issues/53393)
**2 条评论** — v2.0.23 中，`ConfigCompatibilityPlugin` 对 `config.changes()` 不做防抖处理，而后者会在全局配置目录内任意文件系统事件（包括 `~/.claude/skills` 监视器重订阅）时触发重载，造成重复加载与性能损耗。昨日创建、今日更新，属于较新的回归问题。

### 8. GitHub Copilot 登录后模型列表同步永不执行 — [#51928](https://github.com/anomalyco/opencode/issues/51928)
**3 条评论 · 3 👍** — OAuth 登录成功且账号已存储，但 `/models` 与 `opencode models` 中没有 Copilot 模型。服务器日志中没有任何同步尝试记录——登录后模型列表同步从未被触发，只能手动干预。

### 9. Agent 自动继续跑 500+ 步且无任何用户输入 — [#49042](https://github.com/anomalyco/opencode/issues/49042)
**2 条评论** — 自定义 OpenAI 兼容 provider 下，模型产出最终文本后 Agent 循环不停自动续跑，数百步无用户介入，无护栏机制。与 #49414 相似但触发路径不同（正常完成 vs. 未知 finish reason）。

### 10. permission.edit 规则未匹配绝对路径/`~` 模式，fail-open 使 deny 规则失效 — [#40945](https://github.com/anomalyco/opencode/issues/40945)
**3 条评论 · 1 👍** — `permission.edit` / `write` 规则按 worktree 相对路径匹配，绝对路径或 `~` 通配符静默失效。对于 `deny` 规则这意味着安全防护直接旁路——如 `"~/.ssh/**": "deny"` 根本不生效，属于安全隐患。

---

## 重要 PR 进展

### 1. fix(mcp): 为仅在请求时强制认证的服务器触发 OAuth — [#53468](https://github.com/anomalyco/opencode/pull/53468)
今天提交，目标关闭 #26195。Google 官方 MCP 连接器（gmailmcp/drivemcp/calendarmcp）接受 `initialize` 但只在请求时校验认证，opencode 在初始化阶段未检测到 OAuth 需求直接跳过。该 PR 通过配置文件逃生舱口强制触发 OAuth。

### 2. fix(core): 批量处理 untracked 文件 diff，替代每个文件一次 git 进程 — [#53449](https://github.com/anomalyco/opencode/pull/53449)
每 untracked 文件执行 2 个 git 进程（`statUntracked` + `patchUntracked`），257 个文件时 `/api/vcs/diff` 超过 60 秒超时。重写为批量生成后，同样场景大幅缩短耗时。解决文件数量大时的严重性能瓶颈。

### 3. fix(server): 始终将 opencode 报告为 MCP 客户端名称 — [#53471](https://github.com/anomalyco/opencode/pull/53471)
今日关闭。与 #51825 同源，修复 `clientInfo.name` 误用 `options.app.name`（携带 CLI/desktop/acp 等遥测标签）的问题。MCP 服务器看到的客户端名称不再随运行方式变化。

### 4. [beta] feat(windows): 增加一等公民 pwsh/PowerShell 支持 — [#16069](https://github.com/anomalyco/opencode/pull/16069)
今日标记关闭。Windows 下默认 shell 优先选择 PowerShell 而非 Git Bash，并用 `tree-sitter-powershell` 解析命令以正确扫描权限（cmdlet、env paths、`FileSystem::` providers 等）。3 月创建至今，跨越 7 个月终于落地。

### 5. fix(core): 迁移 v1 thinking block-binding 退出机制 — [#52327](https://github.com/anomalyco/opencode/pull/52327)
v1 用户通过模型 `thinking` 配置中的 `blockBinding: false`（或 Bedrock `reasoning` 配置）退出 thinking 块绑定，但该选项在 v2 中丢失。此 PR 补齐迁移路径，解决 v1 → v2 的配置兼容性问题。

### 6. fix(opencode): 将 grep 作用域限制到精确文件路径 — [#52886](https://github.com/anomalyco/opencode/pull/52886)
修复 #45185。精确文件 grep 调用之前未限定在目标文件上，可能扫描无关内容；同时保留 include 过滤并补充回归测试。`grep.test.ts` 7 项测试全部通过。

### 7. fix(acp): 公告内置 compact 命令 — [#53460](https://github.com/anomalyco/opencode/pull/53460)
Zed 因 compact 命令未在 capabilities 中

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-06

## 今日速览

昨日 Qwen Code 同步发布了 CLI v0.25.0 与 Desktop v0.25.0，其中 CLI 新增了本地 workspace-agent 协作能力。社区讨论热度集中在 Managed Agent 架构提案（#12380，46 条评论）及其衍生话题，包括 Kubernetes 工具运行时、会话取消语义等。与此同时，v0.25.0 引入了 WeChat 集成回归、认证插件仓库加载卡住等多起 P1 级 bug，引起开发者集中反馈。

## 版本发布

### CLI v0.25.0 / Desktop v0.25.0 / SDK TypeScript v0.1.18

- **CLI v0.25.0** 亮点是 `feat(agents): add local workspace-agent collaboration`（[#11206](https://github.com/QwenLM/qwen-code/pull/11206)），支持本地 workspace-agent 协同。官方声明无 Breaking Changes。
- **Desktop v0.25.0**（[release notes](https://github.com/QwenLM/qwen-code/releases)）包含两项修复：保留 session 创建失败的诊断信息，以及为 Java SDK 添加 managed runtime。
- **SDK TypeScript v0.1.18** 捆绑 CLI 0.25.0 / 0.24.7 构建（release notes 文本存在重复，但确认与 CLI 同步发布）。

## 社区热点 Issues

### 1. Managed Agent 双路径架构提案（[#12380](https://github.com/QwenLM/qwen-code/issues/12380)）
46 条评论，社区最热议题。提案定义了分阶段的 Managed Agent 架构：保留现有 TypeScript agent 循环、模型推理与工具环境供给解耦、Session 获得持久所有权、Workspace 绑定、可恢复工具执行及稳定 WebSocket 协议。涉及 session-management、multi-agent、platform-distribution 等多个 roadmap 标签，是后续多个 issue/PR 的母题。

### 2. Kubernetes 工具运行时进度跟踪（[#13395](https://github.com/QwenLM/qwen-code/issues/13395)）
14 条评论。跟踪 #12380 提案下 Kubernetes 工具运行时实现、可移植性与验收门禁，当前实现位于 PR #13289。社区关注跨平台交付进度。

### 3. memory.agentMaxTurns 配置被忽略（[#13458](https://github.com/QwenLM/qwen-code/issues/13458)）
`planUserAutoMemoryDreamByAgent` 硬编码 `MAX_TURNS2 (8)` 而非读取 `memory.agentMaxTurns` 配置，导致用户自定义预算失效。属配置类高优 bug，已在 2026-10-06 更新。

### 4. WeChat 集成在 v0.25.0 中回归（[#13480](https://github.com/QwenLM/qwen-code/issues/13480)）
扫码配置微信渠道时被拒，报错 "please upgrade WeChat interface version in OpenClaw"。该问题曾在 v0.14.1 修复，现回归，影响 P1。

### 5. 需鉴权的插件仓库加载卡死（[#13447](https://github.com/QwenLM/qwen-code/issues/13447)）
启动时加载需要密钥的 HTTP 插件仓库，git 用户名输入框无法输入也无法跳过，导致每次启动卡住。影响面为本地开发环境，P1。

### 6. POSIX Shell 取消留下孤儿进程（[#13441](https://github.com/QwenLM/qwen-code/issues/13441)）
取消普通 shell 命令后，忽略 TERM 信号的子进程在进程组 leader 退出后继续运行。在 real child_process 与 lydell-node-pty 两种传输上都可复现。

### 7. LSP 动态注册支持矛盾（[#13491](https://github.com/QwenLM/qwen-code/issues/13491)）
LSP 客户端在 `initialize` 中宣传支持动态注册，但收到 `client/registerCapability` 请求时返回 JSON-RPC -32601。P3，但属于协议合规问题。

### 8. XML 工具调用误恢复引用中的 markup（[#13492](https://github.com/QwenLM/qwen-code/issues/13492)）
`extractXmlToolCalls` 会把参数值中引用的示例 XML 当作真实工具调用恢复，导致合法的 `write_file` 文档内容被丢弃。与 #10692 同属工具调用恢复准确性方向。

### 9. Web Shell 计划审批渲染诉求（[#13340](https://github.com/QwenLM/qwen-code/issues/13340)）
建议 ExitPlanMode 审批弹窗将计划渲染为 markdown，并让 Plan & Review 强制 Todo 结构。目前计划以纯文本（字面 `##`/`#`）展示，体验较差。

### 10. 后台 agent 协调缝隙（[#8097](https://github.com/QwenLM/qwen-code/issues/8097)）
同时运行多个后台 Explore subagent 时出现：父 agent 重复子 agent 工作、提前完成、非交互式 `send_message` 三个协调失败。是 multi-agent 方向的长期问题。

## 重要 PR 进展

### 1. session-centric 多智能体协作（[#13467](https://github.com/QwenLM/qwen-code/pull/13467)）
将基于 thread/ticket 的 workspace-agent 协作替换为会话中心架构：在普通聊天会话中 @ 提及 agent，agent 在会话内联回答，展示名称、实时状态、工具步骤与 token 用量。推动 multi-agent 协作走向统一会话模型。

### 2. 恢复函数式 XML 工具调用（[#13437](https://github.com/QwenLM/qwen-code/pull/13437)）
通过现有 fallback 恢复完整 function/parameter XML，涵盖 wrapped、bare、split 响应；只移除实际恢复的 span，fenced 示例文档保持文本。补上 #10692 指出的工具调用恢复缺口。

### 3. 停止宣传不支持的 LSP 动态注册（[#13494](https://github.com/QwenLM/qwen-code/pull/13494)）
将 completion、hover、definition、references、document symbols、code actions 六项能力标记为不支持动态注册，并补充初始化回归测试。对应 #13491。

### 4. Managed Agent 本地 Runtime 工具结果持久化（[#13291](https://github.com/QwenLM/qwen-code/pull/13291)）
M5b：本地 Managed session 的每个 Runtime 工具结果均持久化到记录 session 的同一权威位置；调用发出前发布最终参数与工具定义、绑定 trace 结果。

### 5. 发布域记录前检查重放（[#13376](https://github.com/QwenLM/qwen-code/pull/13376)）
H2.5 阶段修复：`commitDomainRecord` 原先在 `commit()` 检测到重放命令前就发布新资源体，现改为先查重放再发布。属于 Managed Hook 加固。

### 6. 下一代 Hosted Harness 采用（[#13174](https://github.com/QwenLM/qwen-code/pull/13174)）
实现 G3 提案：Hosted Session 不再固定绑定初次服务的 Harness 进程代次；重启后 Java 控制平面自动采用下一代，而不是让所有绑定 Session 失败。

### 7. 权限被拒时停止绑定的 Turn（[#13163](https://github.com/QwenLM/qwen-code/pull/13163)）
Workspace 绑定 Session 的创建者可在创建权限被撤销、Workspace 开始排空或注册变化时取消已放行的运行 Turn，前提是保留读权限且部署启用 Workspace 文件。

### 8. Managed Agent 配置与 API 表面卫生（[#13335](https://github.com/QwenLM/qwen-code/pull/13335)）
修复 #12692 R2 审查中的 9 项配置/API 问题：去除聚合预算输入大小限制、清理死 `kubernetes*`/`cliEntry` 配置、修复 `scan-delay` split-brain 默认值、未类型化值等。

### 9. 跨会话恢复保留取消意图（[#13436](https://github.com/QwenLM/qwen-code/pull/13436)）
恢复会话时保留显式用户取消，同时让传输失败与超时仍可进行中断恢复。恢复的尝试在模型分发前记录自己的执行身份，防止后续崩溃继承旧身份。对应 #6710/#13463。

### 10. 清理死 REPLACE 合并策略声明（[#12613](https://github.com/QwenLM/qwen-code/pull/12613)）
`settingsSchema.ts` 为 `modelProviders` 和 `providerProtocol` 声明 `mergeStrategy: REPLACE`，但合并引擎并不消费 REPLACE，属于死代码，予以移除。

## 功能需求趋势

- **Managed Agent / 平台分发体系**：社区当前最核心的方向。从 #12380 架构提案到 K8s 工具运行时（#13395）、Hosted Harness 代次切换（#13174）、Session 持久化与可恢复执行（#13291、#13376），说明 Qwen Code 正在向平台化、服务化方向演进。
- **多智能体协作会话化**：#13467 废弃 thread/ticket 模型、变为 session 内联协作；#8097 提出的 agent 协调缝隙也指向同一方向。
- **Web Shell / 桌面端交互完善**：#13340 要求 plan approval 的 markdown 渲染与 Todo 结构强制；#13474/#13473 指出 token 计数格式化反直觉（1000.0k vs 1.0M）。
- **内存与记忆管理精细控制**：#13458（maxTurns 配置被忽略）、#13465（MAX_TURNS 令牌裸曝）、#13477（workspace 可移除安全预算）、#13490（per-agent 预算键分离），社区希望记忆 agent 的预算与安全边界可配置、可隔离。
- **工具调用恢复的健壮性**：#10692、#13437、#13492 构成完整线索——XML 工具调用恢复需要更精确，不能误伤引用的文档示例。

## 开发者关注点

- **回归问题集中爆发**：WeChat 集成在 v0.25.0 再坏（#13480）、shell 取消后残留进程（#13441）、计划审批 UI 体验差（#13340），表明发布质量与回归测试覆盖仍需加强。
- **配置与安全边界**：`memory.agentMaxTurns` 被硬编码（#13458）、workspace 可覆盖安全预算（#13477）、已关闭 issue 仍有遗留（#13122），开发者在配置生效范围上花了大量精力。
- **协议合规性**：LSP 动态注册宣传与实际行为不符（#13491）、ACP 取消与中断无法区分（#6710）、XML 工具调用恢复误判（#13492），这类协议/语义精确性问题频繁出现。
- **鉴权与加载阻塞**：私密插件仓库启动卡死（#13447）直接影响日常使用，属于 P1 级痛点。
- **前端细节体验**：token 计数显示为 `1000.0k` 而非 `1.0M`（#13474）、模糊编辑删除空白行（#13483）、JSONL

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*