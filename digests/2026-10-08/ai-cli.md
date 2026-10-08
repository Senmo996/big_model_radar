# AI CLI 工具社区动态日报 2026-10-08

> 生成时间: 2026-10-08 03:26 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-08）

> 数据说明：以下分析基于 2026-10-08 各工具 GitHub 社区动态日报，Issues/PR 数量为日报中“社区热点/重要进展”的可统计条目，非仓库全量数据；Kimi Code CLI 过去 24 小时无活动。

---

## 1. 生态全景

当前 AI CLI 工具已从“单模型封装”全面迈向“平台化竞逐”。**模型层**快速迭代（Haiku 5.5、GPT-6.1 Sol 同日落地），**工具层**竞争焦点集中于 MCP 生态、沙箱安全、Windows 支持与多智能体协作。**成本治理**成为新热点——无头模式计费、token 死循环消耗等运营问题开始主导社区讨论。**安全默认化**是普遍趋势：多工具主动修复粘贴路径展开、未信任工作区覆写等高危问题。整体判断：生态处于“功能丰富度领先于稳定性”的快速演进期，跨平台体验与生产级可靠性是当前最大短板。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 重要 PR | Release（24h） | 关键版本内容 |
|---|---|---|---|---|
| **Claude Code** | 7 | 多个（hookify 安全修复为主） | 1（v2.1.293） | Haiku 5.5 默认模型；subagentStatusLine 新增 agentType |
| **OpenAI Codex** | 10 | 10 | 4（rust-v0.161.0 + 3 alpha） | GPT-6.1 Sol 默认模型；Bedrock 多智能体 V2；MCP 客户端登录 |
| **Gemini CLI** | 10 | 10 | 1（v0.65.0-nightly） | CI 循环修复；终端用户轮换不变量；专注 p1 安全修复 |
| **GitHub Copilot CLI** | 10 | 0（24h 内无更新） | 6（v1.0.93 → v1.0.94-3） | Haiku 5.5 支持；沙箱向所有用户开放；受管策略禁用 Assisted Permissions |
| **Kimi Code CLI** | 0 | 0 | 0 | 无活动 |
| **OpenCode** | 10 | 10（其中 8 个 TUI PR 来自同一作者） | 未发布新版本 | TUI 批量增强；代价是桌面版 sidecar OOM 等稳定性问题 |
| **Qwen Code** | 10 | 10 | 1（v0.25.0-nightly） | 远端 Hosts 替换保留 bindings；Managed Agent 架构推进 |

**解读**：Copilot CLI 发布频率最高（6 个版本/天）但 PR 挂零，处于“ release 驱动修复”模式；OpenCode PR 数量惊人但高度集中于单一贡献者；Claude Code 单版本节奏更稳；Kimi Code 明显处于维护停滞期。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 典型诉求 |
|---|---|---|
| **Windows 平台稳定性** | Claude Code（git 进程泄漏、MSIX 集成失败）、OpenAI Codex（沙箱 ACL 失败）、Copilot CLI（WSL2 剪贴板、25H2 沙箱）、OpenCode（sidecar OOM） | 沙箱初始化、剪贴板、进程管理、打包环境均存在系统性缺陷 |
| **MCP 生态成熟度** | Claude Code（structuredContent 丢失）、Copilot CLI（OAuth 认证、tools/list 阻塞）、Gemini CLI（OAuth 离线访问）、Qwen Code（list_changed 动态刷新）、OpenCode（多提供商协议兼容） | 认证、并发调度、动态发现、数据完整性，全链路问题 |
| **沙箱与权限模型** | Gemini CLI（@ 路径展开、settings.json 覆写）、Copilot CLI（/add-dir 不生效）、Codex（Windows 沙箱）、Qwen Code（PreToolUse 输入）、OpenCode（skill 引用误拦截） | 安全不再默认可选，权限语义与真实场景严重脱节 |
| **Token 成本治理** | Claude Code（无头模式 1.8× 消耗）、Qwen Code（5–14M token 死循环）、Copilot CLI（token 用量透明化请求）、OpenCode（context 费用可视化） | “成本失控”成为企业/重度用户采纳的新障碍 |
| **多智能体/子代理可靠性** | Claude Code（agentType 区分）、Gemini CLI（MAX_TURNS 误报成功、无限挂起）、Qwen Code（会话化多智能体）、Codex（Cloud Tasks 委派失败） | 子代理中断、状态误报、上下文隔离问题普遍且严重 |
| **自动更新策略** | Claude Code（静默更新断开 Remote Control）、OpenCode（强制更新打断会话） | 用户需要“可控性”而不是“惊悚更新” |

---

## 4. 差异化定位分析

| 工具 | 生态根基 | 核心差异化 | 目标用户 |
|---|---|---|---|
| **Claude Code** | Anthropic 模型 | Remote Control 远程会话、hooks 插件体系、深度集成 Anthropic API（Haiku 5.5 低成本化） | 已绑定 Anthropic 技术栈的团队，看重模型能力与远程协作 |
| **OpenAI Codex** | OpenAI 模型 + 云基础设施 | **Dots 云任务委派**、多设备协同、多智能体 V2、Bazel 工程化 | 云原生团队，需要自动化任务编排与跨设备工作流 |
| **Gemini CLI** | Google 生态（OAuth/Cloud） | 深度安全修复（p1 批量落地）、AST 感知代码理解探索、终端原生 bash 意图路由 | Google 生态开发者，对代码理解效率敏感 |
| **GitHub Copilot CLI** | GitHub 生态 | 沙箱强制隔离、**受管策略**（企业级权限边界）、多模型支持（Claude）、Plugin skill | 企业级用户，安全合规是第一优先级 |
| **OpenCode** | 开源中立 | 高度可定制的 TUI、多提供商兼容（OpenAI/Anthropic/Kimi/GLM 等）、社区驱动 | 终端极客、多模型用户、对 UI 定制有强诉求的开发者 |
| **Qwen Code** | 阿里云 Qwen 模型 | **Managed Agent 双路径架构**、ACP 会话语义、K8s/CSI 运行时 | 需要前瞻性智能体编排架构的团队、阿里云生态用户 |

**技术路线分水岭**：Codex 与 Qwen Code 走“云端优先、架构升级”路线（云任务、Managed Agent、K8s 运行时）；Gemini CLI 与 OpenCode 走“本地体验、社区驱动”路线（AST 感知、TUI 定制）；Claude Code 与 Copilot CLI 走“企业服务、生态锁定”路线（Remote Control、受管策略）。

---

## 5. 社区热度

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills | 数据截止：2026-10-08  
> 说明：PR 原始数据中的评论数字段未显示，以下按仓库给出的列表顺序视为“社区关注度排序”。

## 1. 热门 Skills 排行（Top 8 PR）

### 🥇 #1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures
- **功能**：修复 skill-creator 在触发评估时的误报/漏报，解决 Windows 下 `select()` 管道失败，以及运行时失败被误判为“非触发”的问题。
- **社区讨论热点**：Skill 评估准确性、跨平台兼容性、负例测试的有效性。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1298

### 🥈 #1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers
- **功能**：适配 `mcp>=2.0.0` 中 `streamable_http_client` 的重命名，并支持自定义 HTTP headers 的配置方式。
- **社区讨论热点**：MCP 生态快速迭代下的依赖兼容问题，修复 #1668。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1742

### 🥉 #1771 feat(skills): add proofcore-contract-auditor for smart contract notarization
- **功能**：面向 Web3 开发者的智能合约审计 Skill，支持 Solidity/Rust 静态分析，并将审计证明锚定到 TON 区块链。
- **社区讨论热点**：区块链审计、零存储 Merkle 协议、加密存证与 AI 结合。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1771

### #1734 Detect orphaned docx comments
- **功能**：检测 DOCX 文档中孤立/无效的评论，提升文档处理 Skill 的精准度。
- **社区讨论热点**：文档元数据清理、生成文档质量边界。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1734

### #1703 Add md2video-audio skill
- **功能**：直接用 Markdown 编译为带拟人配音的 MP4 视频，整合 Marp 幻灯片与语音合成。
- **社区讨论热点**：零成本内容生产、Markdown 到多媒体的一站式工作流。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1703

### #1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills
- **功能**：一个 PR 包含两个 Skill：将产品/技术 Spec 转成 Notion 可执行任务，以及量化简历审计。
- **社区讨论热点**：需求到实现的任务拆解、招聘场景自动化。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1245

### #1792 fix(docx): report LibreOffice timeout as an error and verify the output
- **功能**：`docx` Skill 在 LibreOffice 超时时不再误报成功，并验证输出 DOCX 是否仍含修订标记。
- **社区讨论热点**：文档转换可靠性、错误处理与输出校验。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1792

### #1730 fix(claude-api): replace dead URLs in academy-guide and tool-use-concepts
- **功能**：替换 claude-api 相关文档中的失效 URL，确保引用链接可用。
- **社区讨论热点**：Skill 文档维护质量、外部依赖稳定性。
- **状态**：Open  
- 🔗 https://github.com/anthropics/skills/pull/1730

---

## 2. 社区需求趋势（来自 Issues）

### 🔐 技能分发的安全与信任边界
- #492：社区技能被放入 `anthropic/` 命名空间，可能导致用户误认为官方技能并授予过高权限。
- 需求方向：官方安全审查、签名机制、社区技能与官方技能的明确隔离。
- 🔗 https://github.com/anthropics/skills/issues/492

### 🏢 组织级技能共享与分发
- #228：目前技能只能下载后手动上传，无法在组织内直接共享。
- 需求方向：共享技能库、组织级 Skill Library、一键分发链接。
- 🔗 https://github.com/anthropics/skills/issues/228

### 🛠️ Skill 开发/评估工具链可靠性
- #556：`run_eval.py` 使用 `claude -p` 时技能触发率为 0%。
- #1390：mcp-builder 的 evaluation.py 对所有真实 MCP server 都会静默失败，评分恒为 0/N。
- #1383：skill-creator 存在静默 benchmark 失败、Windows 触发评估异常、技能遮蔽等问题。
- 需求方向：可复现、可诊断、跨平台的技能评估基础设施。
- 🔗 https://github.com/anthropics/skills/issues/556  
- 🔗 https://github.com/anthropics/skills/issues/1390  
- 🔗 https://github.com/anthropics/skills/issues/1383

### ⚡ 上下文窗口效率
- #1487：`claude-api` skill 一次注入约 156k tokens，直接撑爆上下文窗口。
- 需求方向：按需加载、延迟注入、token 精简。
- 🔗 https://github.com/anthropics/skills/issues/1487

### 🧠 新技能方向提案
- #1329 compact-memory：用符号化表示压缩长期运行 Agent 的持久记忆，节省上下文。
- #412 agent-governance：Agent 系统治理模式，包括策略执行、威胁检测、审计。
- #1385 Reasoning Quality Gate Pipeline：推理质量门禁，覆盖任务前校准、对抗性审查、交付验证。
- 🔗 https://github.com/anthropics/skills/issues/1329  
- 🔗 https://github.com/anthropics/skills/issues/412  
- 🔗 https://github.com/anthropics/skills/issues/1385

---

## 3. 高潜力待合并 Skills（关注度高但尚未合并）

这些 PR 均处于 Open 状态，且功能完整、讨论活跃，有可能在近期落地：

### #525 Add pyxel skill for retro game development
- Python 复古游戏开发 Skill，支持 headless 输入驱动运行、帧级检查与任务状态验证。
- 🔗 https://github.com/anthropics/skills/pull/525

### #514 Add document-typography skill
- 针对 AI 生成文档的排版质量控制，解决孤词、孤行、标题悬空、编号错位等问题。
- 🔗 https://github.com/anthropics/skills/pull/514

### #822 feat: add AWT (AI Watch Tester)
- 零代码 E2E 测试 Skill，基于视觉和浏览器控制自动生成测试。
- 🔗 https://github.com/anthropics/skills/pull/822

### #486 Add ODT skill
- 支持 ODT/ODS 创建、模板填充、解析为 HTML，扩展办公文档生态。
- 🔗 https://github.com/anthropics/skills/pull/486

### #83 Add skill-quality-analyzer and skill-security-analyzer
- 两个元技能：从结构、文档、安全等维度分析 Claude Skill 质量。
- 🔗 https://github.com/anthropics/sk

---

# Claude Code 社区动态日报（2026-10-08）

## 今日速览

v2.1.293 发布，新增 Claude Haiku 5.5 作为默认 Haiku 模型。社区热点集中在 Windows 桌面版进程泄漏、自动更新打断 Remote Control 会话、无头模式成本开销高于交互模式等问题。安全方面，多个 PR 修复了 hookify 插件在异常时“默认放行”的漏洞。

## 版本发布

### v2.1.293
- **新增 Claude Haiku 5.5**（`claude-haiku-5-5`），现为 Anthropic API 默认 Haiku 模型：1M context，$0.10/$0.50 per Mtok（超过 100K token 提示词为 $0.50/$2.50）。
- **`subagentStatusLine` payload 增加 `agentType`**，脚本可区分自定义子代理类型。

## 社区热点 Issues

### 1. Windows 桌面版每秒产生约 17 个 git 进程，导致内核池泄漏约 6 GB/天
**#94478** · [链接](https://github.com/anthropics/claude-code/issues/94478) · 10 评论
Windows 桌面应用持续高频拉起 `git.exe`，每天产生约 200 万个短生命周期进程，并放大内核池泄漏。该问题直接影响 Windows 用户长期稳定性，社区反应强烈但尚无 👍。

### 2. Desktop 1.44121.4+ 不再为计划任务会话自动启用 Remote Control（回归）
**#92276** · [链接](https://github.com/anthropics/claude-code/issues/92276) · 10 评论 · 6 👍
从 1.40609.0 到 1.44121.4 之间引入回归，计划任务启动的会话无法自动启用 Remote Control。6 个 👍 显示影响面较大，是桌面端远程方案的常见入口。

### 3. 无头模式 `claude -p` 比交互模式多消耗约 1.8 倍 5 小时窗口
**#97074** · [链接](https://github.com/anthropics/claude-code/issues/97074) · 7 评论 · 2 👍
相同负载下，`sdk-cli` 入口按 token 消耗的 5 小时窗口显著高于交互式 `cli`。对 CI/CD 重度用户是成本敏感问题，可能需要重新评估无头模式的计费/配额策略。

### 4. Windows MSIX 安装下 Code 标签页终端集成失败
**#99192** · [链接](https://github.com/anthropics/claude-code/issues/99192) · 7 评论 · 1 👍
PowerShell 终端集成文件被写入 MSIX 虚拟化 AppData，而终端 shell 在包外读取真实 `%APPDATA%`，导致集成永远无法加载。典型 Windows 打包环境问题。

### 5. 功能请求：为 effort 切换增加单键 action
**#61904** · [链接](https://github.com/anthropics/claude-code/issues/61904) · 7 评论 · 3 👍
请求 `chat:cycleEffort` / `increaseEffort` / `decreaseEffort` 全局快捷键。社区指出该请求已三次提交，但均被 stale bot 自动关闭而缺少维护者评审——流程问题引发讨论。

### 6. MCP 工具响应中 `structuredContent` 存在时 `text-content` 块被静默丢弃
**#79944** · [链接](https://github.com/anthropics/claude-code/issues/79944) · 6 评论 · 5 👍
当 MCP server 同时返回结构化 JSON 和文档正文文本时，Claude Code 只展示结构化块，正文丢失。5 👍 表明 MCP 数据完整性是多用户痛点。

### 7. 桌面版“静默更新”在用户离开时退出并重启应用，所有 Remote Control 会话被断开
**#95364** · [链接](https://github.com/anthropics/cl

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

### 1. 今日速览

今日 Codex 社区动态主要围绕 **Windows 平台稳定性** 与 **Dots 云任务可靠性** 两大焦点。**Windows 沙箱因文件占用导致 ACL 更新失败（os error 32）** 成为最突出的问题，已引发多个高热度 Issue，且官方在 PR #51896 中已有针对性修复。此外，**GPT-6.1 Sol 成为默认模型**是今日发布内容中的重要更新，而 **Bazel 构建系统支持**的系列 PR 则表明官方正在为更工程化的发布流程做准备。

### 2. 版本发布

过去 24 小时发布了 4 个版本，其中 `rust-v0.161.0` 包含明显的功能更新，其余为 alpha 增量版本。

- **rust-v0.161.0 (0.161.0)**
  - **新模型**：GPT-6.1 Sol 现已成为 bundled 与 Amazon Bedrock 目录中的默认模型（#49318, #49339）。
  - **Amazon Bedrock**：支持多智能体 V2 与 Ultra reasoning；Bedrock Mantle 新增支持 AWS GovCloud 区域（#49345, #49813）。
  - **MCP 服务器**：支持客户端登录 MCP 服务器。
  - [版本链接](https://github.com/openai/codex/releases/tag/rust-v0.161.0)

- **rust-v0.162.0-alpha.20 / alpha.18.1 / alpha.17.1**：均为 0.162.0 系列的增量修复版，无独立的变更日志说明。
  - [alpha.20](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.20) | [alpha.18.1](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.18.1) | [alpha.17.1](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.17.1)

### 3. 社区热点 Issues

以下 10 个 Issue 反映了当前社区最集中的痛点，尤其是 **Windows 沙箱故障** 与 **dots 云任务不稳定** 两类问题。

- **【问题爆发】Windows 沙箱因文件占用导致全面阻塞**
  - [#51601 Windows app 26.1002.51308: sandbox setup fails with sharing violation when validating its own active runtime](https://github.com/openai/codex/issues/51601) ：更新后所有命令无法执行，报错 `helper_unknown_error: setup`。60 条评论，20 👍，是今日最热的 Windows 故障。
  - [#51590 Windows sandbox fails opening running node_repl.exe for ACL update (error 32)](https://github.com/openai/codex/issues/51590) ：定位到具体原因是 `node_repl.exe` 被占用时无法进行 ACL 更新，导致 Computer Use 与 shell 均被阻断。
  - [#51634 Windows sandbox provisioning fails with os error 32 when any runtime file is in use (0.162.0-alpha.2 regression)](https://github.com/openai/codex/issues/51634) ：明确指出是 0.162.0-alpha.2 helper 的回归性问题。
  - [#51778 Windows sandbox fails in Codex & OWL 26.1002.52244](https://github.com/openai/codex/issues/51778) ：最新版本（26.1002.52244）中该问题依然存在。

- **【Dots 功能可靠性】云任务委派失败**
  - [#50015 Dot cannot resume or create cloud tasks, while direct messages in the original tasks execute successfully](https://github.com/openai/codex/issues/50015) ：Dot 委派给云任务的消息持续报 `AppServerBackendRequestError`，但直接创建可成功。
  - [#51372 dot cloud task creation and continuation fail with AppServerBackendRequestError / UNKNOWN while manual creation works](https://github.com/openai/codex/issues/51372) ：与 #50015 现象几乎一致，表明此为系统性问题而非偶发。

- **【高关注】Windows 桌面端崩溃与 Remote 配对**
  - [#51340 [Windows] Codex desktop crashes in windows-updater.node with 0xC0000005](https://github.com/openai/codex/issues/51340) ：崩溃发生在更新模块，重装/修复均无效，指向本地更新链路的问题。
  - [#48774 Codex Remote pairing fails on Android](https://github.com/openai/codex/issues/48774) ：跨设备配对认证流程中，授权后无法完成连接，涉及 auth 与 remote 模块。

- **【存储/会话】云环境与线程状态异常**
  - [#51675 [macOS Desktop] Cloud tasks disappear from sidebar after restart](https://github.com/openai/codex/issues/51675) ：云任务在重启后从侧边栏消失，但通过 Dots 列表与直接读取可恢复。
  - [#50182 codex cloud does not discover current Cloud environments](https://github.com/openai/codex/issues/50182) ：CLI 无法发现当前用户的云环境，影响自动化与脚本集成。

### 4. 重要 PR 进展

以下 10 个 PR 多为针对今日社区反馈的快速修复，以及 Bazel 构建基础设施的推进。

- **【直接修复今日 Windows 沙箱问题】**
  - [#51896 Preserve native errors in Windows sandbox ACL diagnostics](https://github.com/openai/codex/pull/51896) ：修复 Windows 沙箱 ACL 诊断仅显示外层错误、隐藏原生失败原因的问题，有助于精准定位 os error 32 根因。
  - [#51890 Add the missing `mxc-sdk` UTF-8 resource patch for Bazel](https://github.com/openai/codex/pull/51890) ：为 `mxc-sdk` 添加 UTF-8 资源补丁，修复 Windows 资源编译问题，与沙箱稳定性相关。

- **【Dots 与云任务稳定性】**
  - [#51895 Report specific reasons for WebSocket continuation failures](https://github.com/openai/codex/pull/51895) ：当 WebSocket 续传因请求属性或输入变化而失败时，不再返回笼统的 `other` 错误，便于排查云任务中断根因。
  - [#51884 Add experimental prediction forks that inherit parent context](https://github.com/openai/codex/pull/51884) ：新增 `experimentalPredictionMode`，为 fork 线程提供继承父上下文的能力，以最大化提示缓存复用，提升云任务性能。

- **【工程基建：Bazel 构建系统支持】（系列 PR）**
  - [#51848 Align Bazel release builds with Cargo and fix platform compatibility](https://github.com/openai/codex/pull/51848) ：对齐 Cargo 与 Bazel 发布构建，修复 Windows 命令行限制、MSVC 运行时冲突等问题。
  - [#51856 Build Bazel release artifacts alongside Cargo artifacts](https://github.com/openai/codex/pull/51856) ：发布流程将同时产出 Cargo 与 Bazel 构建产物。
  - [#51855 Add Bazel support to the Codex package build action](https://github.com/openai/codex/pull/51855) ：为 CI 的 package build 增加 `build-system` 输入，支持 Bazel。

- **【工具与配置优化】**
  - [#51892 Preserve tool call completeness when recorded arguments are truncated](https://github.com/openai/codex/pull/51892) ：修复截断记录参数时误将 `tool_calls_complete` 置空的问题，确保工具调用记录完整性。
  - [#51872 Keep global app-server config independent of the launch directory](https://github.com/openai/codex/pull/51872) ：防止全局请求继承启动目录的项目配置，避免 marketplace 移除失败或配置重载失效。
  - [#51865 Use readable plugin mentions without suppressing same-name skills](https://github.com/openai/codex/pull/51865) ：优化插件提及显示名（如 `@Postman`），并修复同名 Skill 无法同时提交的问题。

### 5. 功能需求趋势

从今日 Issues 与 PR 中，可以提炼出以下社区最关注的功能方向：

- **Windows 平台稳定性与沙箱兼容性**：这是当前压倒性的第一优先级。大量 Issue 围绕沙箱初始化失败、文件占用冲突、应用崩溃展开。社区对 Windows 的支持质量要求极高，任何回归都会被迅速放大。
- **Dots 功能深化与多设备管理**：Dots 是当前功能演进的核心。社区需求包括：
  - 允许单个 Dot 控制多台个人电脑，并支持按任务选择执行设备（#49824）。
  - 在侧边栏显示任务执行位置及是否由 Dot 管理（#51234）。
- **工程项目管理与组织能力**：
  - 官方正在推进将项目注册、线程跨项目移动等能力（#25498）。
  - 为云环境提供更完整的生命周期管理（编辑、删除、发布）也是高优先级（#50251）。
- **用户体验细节**：自动化任务的静默模式（#33100）、深色模式下的 UI 对比度（#44052）、会话恢复的流畅度（#29590）等细节优化被持续提出。

### 6. 开发者关注点

综合今日反馈，开发者的核心痛点与高频需求集中在：

1. **Windows 沙箱故障已成为最大拦路虎**：从 0.162.0-alpha.2 到 26.1002.52244，多个版本均存在因文件占用（os error 32）导致沙箱无法初始化、进而阻断所有命令执行的问题。痛点集中在 Running中进程（如 `node_repl.exe`）的 ACL 更新冲突，且错误信息不透明，普通用户难以自行排查。
2. **Dots 云任务委派可靠性亟待提升**：多个 Issue 表明，Dot 创建的云任务在恢复或新建时频繁报 `AppServerBackendRequestError / UNKNOWN`，而手动创建的云任务可正常工作。这说明 Dots 的委派链路存在与手动任务不同的缺陷，影响了自动化与多设备协同体验。
3. **云环境与线程状态管理混乱**：云环境在侧边栏消失（#51675）、CLI 无法发现云环境（#50182）、环境无法编辑（#50251）等问题，暴露出云资源在不同客户端（桌面端、Web、CLI、Dots）之间的状态同步与生命周期管理不完善。
4. **编码问题带来的本地化缺失**：#51926 指出，Windows 桌面版 MSIX 清单仅声明 `en-US`，导致系统语言为中文时界面强制显示英文，尽管安装包内已包含中文语言包。这影响了非英语用户的体验，且属于低层配置问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Gemini CLI 社区动态日报（2026-10-08）

### 1. 今日速览

昨夜发布 v0.65.0-nightly 版本，主要修复 CI 工作流缺失循环与终端用户轮换不变量问题。社区讨论热度集中在**子代理（Subagent）可靠性**（如 #22323 MAX_TURNS 误报成功、#21409 挂起）与 **AST 感知工具链**的探索。安全类 PR 表现活跃，多个 p1 级安全修复（`@` 路径展开、未信任工作区写入）已进入收尾阶段。

---

### 2. 版本发布

**v0.65.0-nightly.20261008.g44d764ee5**（[Release 详情](https://github.com/google-gemini/gemini-cli/releases/tag/v0.65.0-nightly.20261008.g44d764ee5)）

- `fix(ci)`: 在 unassign-inactive-assignees 工作流中补充缺失的循环逻辑
- `fix(core)`: 强制终端用户轮换不变量（terminal user turn invariant），并规范化请求内容

---

### 3. 社区热点 Issues（Top 10）

**1. Subagent 在 MAX_TURNS 后误报 GOAL 成功** — [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)（13 评论 · p1 · bug）
`codebase_investigator` 子代理在达到最大轮次后返回 `status: "success"` 和 `Termination Reason: "GOAL"`，但实际上并未执行任何分析。中断被伪装为成功，**严重影响用户对结果的信任判断**。该 issue 已持续 7 个月，目前处于 `need-retesting` 状态。

**2. 通用子代理（generalist agent）无限挂起** — [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)（8 评论 · 8 👍 · p1 · bug）
简单操作（如创建文件夹）也会导致无限挂起，用户等待长达一小时。社区已找到绕过办法：指示模型不要 defer 到子代理。这是当前**影响面最大的稳定性问题**之一。

**3. 基于零依赖 OS 沙箱的 bash 意图路由** — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)（9 评论 · p2 · enhancement）
利用 Gemini 3 模型原生的 bash 操作习惯（`grep`/`cat`/`sed`/`awk`），通过沙箱化执行 + 事后意图路由来提升工具使用效率，同时不牺牲安全性。属于大型架构增强提案。

**4. AST 感知的文件读取/搜索/映射评估（EPIC）** — [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)（7 评论 · p2 · feature）
探索通过 AST 感知工具实现精确的方法边界读取、减少 token 噪声、优化代码库映射。包含多个子任务（#22746、#22747），是当前**代码理解效率优化**的核心方向。

**5. Gemini 不主动使用 skills 和子代理** — [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)（7 评论 · p2 · bug）
模型不会主动调用用户自定义的 skills（如 gradle/git），只有在被明确指示时才使用。反映模型对上下文工具的描述理解不足，是 agent 自主性的关键短板。

**6. 工具数量超过 128 时触发 400 错误** — [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)（3 评论 · p2 · bug）
当可用工具超过 API 限制时直接报 400 错误，期望是更智能地按需裁剪工具范围。该问题对插件生态和工具扩展有重要影响。

**7. Agent 应阻止/劝阻破坏性操作** — [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)（3 评论 · p2 · feature）
模型在复杂 git 操作或数据库维护场景下可能会使用 `git reset --force` 等危险命令，缺乏安全护栏。社区建议增加破坏性操作的检测与劝阻机制。

**8. Browser Agent 忽略 settings.json 覆盖** — [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)（4 评论 · p2 · bug）
`AgentRegistry` 正确合并了配置，但 `browser_agent` 实际执行时不读取 `maxTurns` 等覆盖值。配置链路断裂，影响浏览器子代理的可控性。

**9. symlink 形式的自定义 agent 不被识别** — [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)（4 评论 · p2 · bug）
`~/.gemini/agents/` 下的 symlink 文件无法被识别为 agent，限制了用户的配置管理灵活性（如 dotfiles 仓库管理）。

**10. Bug 报告缺少子代理上下文** — [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)（2 评论 · p1 · bug）
`/bug` 报告只包含主会话内容，不含子代理内部的执行轨迹，导致调试效率大幅降低。有 `p1` 优先级标签。

---

### 4. 重要 PR 进展（Top 10）

**1. [p1] 修复 VSCode IDE Companion 的 IdeServer.stop() 死锁** — [#29674](https://github.com/google-gemini/gemini-cli/pull/29674)（size/l · 新增）
`IdeServer.stop()` 在 MCP 会话存在时永不 resolve，阻塞关闭流程。修复后与 `/ide` 扩展的断开更可靠。

**2. [p1] 阻止未信任工作区擦除自身 settings.json** — [#29466](https://github.com/google-gemini/gemini-cli/pull/29466)（安全 · 已关闭）
`gemini mcp add` 在未信任目录中执行时会**静默覆写**项目 `.gemini/settings.json` 并报告成功。此 PR 是默认状态下的高危数据丢失修复。

**3. [p1] 粘贴文本默认禁止 @path 展开** — [#29458](https://github.com/google-gemini/gemini-cli/pull/29458)（安全 · 已关闭）
粘贴 `user@host:~/project$ cat @id_rsa` 类文本可能触发文件上传。通过将 `ui.escapePastedAtSymbols` 默认值改为 `true`，消除意外泄露风险。

**4. [p1] 修复 OAuth URL 被终端截断** — [#29460](https://github.com/google-gemini/gemini-cli/pull/29460)（安全 · 已关闭）
长 Google OAuth URL 在被终端换行截断后导致 `Error 400: invalid_request`。改用 OSC 8 终端超链接保持 URL 完整性。

**5. [p1] read-many-files 上下文膨胀修复** — [#29457](https://github.com/google-gemini/gemini-cli/pull/29457)（core · 已关闭）
二进制资源（图片/PDF/音频）因模糊子串匹配被误判为"显式请求"，导致不必要的上下文加载。改用 glob 精确匹配，大幅削减 token 浪费（b/561554390）。

**6. [p1] shell 命令注入支持取消传播** — [#29459](https://github.com/google-gemini/gemini-cli/pull/29459)（cli · 已关闭）
`!{...}` 注入命令使用独立的 `AbortController`，导致 ESC 取消永远无法中断挂起子进程。现在取消信号可正确传播。

**7. [p1] 修复 Google OAuth 无限验证/重试循环** — [#29655](https://github.com/google-gemini/gemini-cli/pull/29655)（auth · 已关闭）
为浏览器验证重试与 OAuth 重试增加有界次数，避免用户"卡死"在认证循环中。

**8. 忽略过滤性能优化：支持子树剪枝** — [#29582](https://github.com/google-gemini/gemini-cli/pull/29582)（core · size/l）
引入层级化目录状态记忆化与通配符目录模式展开，解决大型仓库上的**多秒级阻塞延迟**。配合符号链接缓存，文件发现效率显著提升。

**9. MCP OAuth：为 Google 端点请求离线访问权限** — [#29578](https://github.com/google-gemini/gemini-cli/pull/29578)（mcp）
修复远程 MCP 服务器（Google Docs/Sheets/Drive 等）无法在首次登录时拿到 refresh token 的问题，并保留 `clientSecret` 以支持后台刷新。

**10. 遥测：支持自定义 OTLP Headers** — [#29641](https://github.com/google-gemini/gemini-cli/pull/29641)（telemetry · 已关闭）
允许为 OTLP HTTP/gRPC 端点配置自定义鉴权头，打通 Grafana Cloud、Honeycomb、Datadog 等平台的认证链路。

---

### 5. 功能需求趋势

从近期 Issue 与 PR 提炼出以下社区最关注的方向：

| 方向 | 代表条目 |

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-10-08

## 今日速览

昨日共发布 6 个版本，重点新增 Claude Haiku 5.5 模型支持，并针对沙箱与受管策略做了多项修复；Issue 侧围绕 Windows/WSL2 平台问题、MCP 认证与沙箱权限的反馈持续升温，另有多个新提交的 sandbox 与插件相关问题等待处理；过去 24 小时无新 PR 更新。

## 版本发布

过去 24 小时共发布 6 个版本（v1.0.93 至 v1.0.94-3），主要更新如下：

- **v1.0.94-3**：新增 Claude Haiku 5.5 模型选项及 `--model` completions 支持；修复受管设置抑制 bypass-permission 标志时缺少策略警告的问题。
- **v1.0.94-2**：包含多项修复与变更（未详细说明）。
- **v1.0.94-1**：修复 split-view  reconciliation 过程中点击 Sessions 侧边栏行无法可靠切换会话的问题。
- **v1.0.94-0**：当受管设置要求更新 CLI 版本时，在不阻塞正常提示的前提下展示更新引导；受管策略现可禁用 Assisted Permissions，并将会话保持为 Manual Approval 模式。
- **v1.0.93**（2026-10-07）：新增企业级 `permissions.limitTo` 以强制网络请求的托管域边界；在活动 turn 期间安全 `/user` 命令可立即执行、不安全的远程命令被拒绝且不弹窗，并支持对 relay host 广播的命令排队；新增 Plugin skill。
- **v1.0.93-4**：命令沙箱向所有用户开放（`/sandbox` 与 `--sandbox`）；同步修复上述 `/user` 命令与 Plugin skill command 相关问题。

---

## 社区热点 Issues（10 个）

### 1. WSL2 (ARM64) `/copy` 失败：`clip.exe exited with code 1` 引号 bug
**#3534** | 作者 @TheDr1ver | 评论 8 | 👍 6 | 更新 2026-10-07
在 WSL2 Ubuntu ARM64 下使用 1.0.55-1 时，所有剪贴板写入均因 `cmd.exe` 包装层引号处理错误而失败，属于长期未修复的平台兼容性问题，影响 WSL2 ARM 用户日常操作。

🔗 https://github.com/github/copilot-cli/issues/3534

### 2. 复制的命令包含不可见字符，导致 "command not found"（已关闭）
**#2285** | 作者 @robinsujob | 评论 6 | 👍 10 | 状态 CLOSED
从代码块复制命令到外部终端时混入不可见字符，触发误粘贴问题。社区反馈热度高、👍 多，目前已关闭，推测已在近期版本中修复。

🔗 https://github.com/github/copilot-cli/issues/2285

### 3. 诡异的 "Somebody else owns the clipboard" 提示破坏布局（已关闭）
**#3172** | 作者 @laeubi | 评论 6 | 👍 14 | 状态 CLOSED
当其他应用占用剪贴板后返回 Copilot CLI，状态栏出现该提示并破坏终端布局。同属剪贴板交互类问题，现已关闭。

🔗 https://github.com/github/copilot-cli/issues/3172

### 4. Windows 最新 25H2 构建报 "Sandboxing is enabled but is not supported on this host"（已关闭）
**#4652** | 作者 @JohannesZahn | 评论 4 | 更新 2026-10-07 | 状态 CLOSED
Windows 25H2 下开启 `--sandbox` 后仍被警告不支持，用户需手动更新系统。该 issue 已关闭，可能与 v1.0.93-4 全面开放沙箱有关联。

🔗 https://github.com/github/copilot-cli/issues/4652

### 5. MCP: Cloudflare 连接在 OAuth 成功后报 "Subscription limit reached"
**#4991** | 作者 @domgordon-MSFT | 评论 4 | 更新 2026-10-07 | 状态 OPEN
Cloudflare 远程 MCP 服务器在 OAuth 认证和协议初始化成功后被判失败，运行时记录 `MCP error -32603`，随后 MCP UI 又要求重新认证，用户无法实际使用该 MCP 服务器。

🔗 https://github.com/github/copilot-cli/issues/4991

### 6. `/add-dir` 未将目录加入沙箱 allow list
**#5076** | 作者 @rynoV | 评论 3 | 创建 2026-10-07 | 状态 OPEN
在 1.0.93 中执行 `/add-dir ../other-folder` 后，沙箱内尝试访问该目录的 shell 命令仍被拒绝，功能与文档不符，属于较新的功能性缺陷。

🔗 https://github.com/github/copilot-cli/issues/5076

### 7. Assisted permissions 回归：过度要求审批
**#5066** | 作者 @rynoV | 评论 3 | 👍 1 | 更新 2026-10-07 | 状态 OPEN
用户反馈 Assisted Permissions 最近开始对大量本应直接执行的命令要求人工审批（如当前目录下查找文件的 PowerShell 命令），影响自动化体验，怀疑与 v1.0.94-0 受管策略改动有关。

🔗 https://github.com/github/copilot-cli/issues/5066

### 8. Windows: MCP Entra 登录失败 — scopes 验证错误
**#5068** | 作者 @markwtwjeffries | 评论 2 | 👍 8 | 创建 2026-10-06 | 状态 OPEN
Windows 下每次全新交互式登录 Entra ID 保护的 MCP 服务器（Azure DevOps MCP）均失败，报 `this server's advertised scopes could not be safely validated`。👍 8 表示开发者对此问题关注度较高。

🔗 https://github.com/github/copilot-cli/issues/5068

### 9. `create_pull_request` 报错但 PR 实际已创建
**#5028** | 作者 @achamayou | 评论 2 | 更新 2026-10-07 | 状态 OPEN
远程 WSL 主机上的会话调用 `create_pull_request` 返回 `runtime settings are not configured for this session`，但 PR 已成功创建。错误信息具有误导性，可能影响自动化流程的可靠性判断。

🔗 https://github.com/github/copilot-cli/issues/5028

### 10. tools/list 刷新与超时取消的 MCP 请求互相阻塞
**#4731** | 作者 @tecrogue | 评论 3 | 状态 CLOSED
对 stdio MCP 服务器的工具调用超时后，运行时立即向该仍被占用的服务器派发 `tools/list` 刷新，导致刷新也超时，且该服务器所有工具在进程生命周期内被永久剥离。反映了 MCP 调度层存在深层资源竞争问题。

🔗 https://github.com/github/copilot-cli/issues/4731

---

## 重要 PR 进展

过去 24 小时内无 PR 更新。

---

## 功能需求趋势

从最新 Issues 中可以提炼出以下社区关注方向：

1. **沙箱（Sandbox）成熟度**：`/add-dir` 权限不生效（#5076）、Windows 25H2 沙箱不可用（#4652）、沙箱内置策略 bug（#4867）、`/ide` 沙箱下无法发现工作区（#4909）等，沙箱仍需在权限模型、跨平台一致性和策略可配置性上继续打磨。

2. **MCP 生态接入稳定性**：Cloudflare MCP 认证后订阅限制（#4991）、Windows Entra MCP scopes 验证失败（#5068）、MCP 工具超时导致工具目录被剥离（#4731）、`tool_search_tool` 在服务器未注册完毕时静默返回"无工具"（#5069）、macOS 本地子网网络权限缺失导致 MCP 无法连接（#5072）——MCP 的多平台认证与并发处理是当前开发者最关心的方向。

3. **模型支持扩展**：v1.0.94-3 新增 Claude Haiku 5.5 模型选择支持，说明社区对不同模型（尤其低成本快速模型）的需求持续存在；同时仍有用户反馈实验模式下无法使用 Hydrafusion（#4975）。

4. **上下文管理与 token 成本透明化**：多位用户提出在 session 中暴露累积 token 用量（#5065）、由 agent 主动建议在缓存温暖期执行 `/compact`（#5064）以及加速上下文重建（#5067），表明开发者对 token 成本的敏感度正在上升。

5. **插件系统演进**：插件技能命令修复（v1.0.93-4）、技能选择器出现错误命名空间条目（#5073）、插件安装权限失败（#4937）等问题，说明插件生态正在起步但体验仍不稳定。

---

## 开发者关注点

1. **Windows + WSL2 平台痛点集中**：剪贴板 bug（#3534）、Windows 沙箱权限滥用（#4788、#4679）、winget 更新别名被覆盖（#5071）、Windows Terminal 键绑定弹窗默认选中"是"（#5074）——Windows 系问题占活跃 Issue 近一半，跨平台一致性仍是最大短板。

2. **受管策略与权限模式的副作用**：v1.0.94-0 引入的"受管策略可禁用 Assisted Permissions"虽是有意设计，但多位用户反馈权限审批频率明显上升（#5066），需要平衡安全与效率。

3. **取消/中断与钩子事件的语义模糊**：用户中止 turn 时没有钩子事件（#5075）、Ctrl+C 复制文本误触发取消对话框（#4789）、Ctrl-D 在 elicitation 输入框触发会话关闭（#4866）——交互层对输入细节的语义区分仍需细化。

4. **远程/本地 MCP 服务器的诊断信息不足**：`tool_search_tool` 静默返回空结果（#5069）与 `create_pull_request` 报错但实际成功（#5028）共同指向一个问题：Copilot CLI 在远程执行和 MCP 场景下的错误信息与真实状态不一致，增加了自动化集成的排障难度。

5. **macOS 本地网络隐私权限缺失（#5072）**：`NSLocalNetworkUsageDescription` 未声明导致本地子网 MCP 全部通信失败，影响 macOS 26 用户的本地联调场景，需要尽快在应用层补充权限描述。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode 社区动态日报 — 2026-10-08

### 今日速览

今日社区活跃度集中在 TUI 体验增强与桌面版稳定性问题上。以 @Nowaker 为代表的开发者提交了 15+ 个 TUI 功能增强 PR，涵盖会话侧栏、消息导航与状态展示；同时桌面版 session 加载卡死、sidecar OOM 等问题持续在 Issue 区发酵。此外，权限系统与多提供商兼容性成为最大共性痛点。

### 社区热点 Issues（10 个）

**1. Desktop: 自定义 Provider 保存永远报 "unavailable on this server"**  
`#50650` | 评论 7 | 👍 4 | [链接](https://github.com/anomalyco/opencode/issues/50650)  
Desktop 版设置页提供"自定义 OpenAI 兼容 Provider"表单，但保存逻辑无条件抛出 `provider.custom.unavailable`，用户根本无法保存任何自定义 Provider。该问题从 9 月 22 日持续至今仍无修复，影响所有 Desktop 用户。

**2. 权限系统: skill 引用文件被误拦截**  
`#53835` | 评论 6 | 今日创建 | [链接](https://github.com/anomalyco/opencode/issues/53835)  
通过 Superpowers 插件安装的 skill 在读取其 Markdown 参考文件时，被权限系统误判为需要访问 npm 插件缓存目录。agent 本应只需读取 skill 及其引用文件，却被无端要求越权访问。该问题直指权限模型对插件边界判断的缺陷。

**3. 桌面版 sidecar 进程 OOM 崩溃**  
`#47553` | 评论 6 | [链接](https://github.com/anomalyco/opencode/issues/47553)  
桌面版 sidecar 进程存在明显内存泄漏，内存持续增长至 V8 堆上限（~3GB）后被系统以 OOM 杀死并反复崩溃。Windows 10 上严重受影响。该 Issue 持续一个月仍未解决，社区已开始质疑桌面版稳定性。

**4. Step-cap 后消息导致 Claude thinking 模型 400**  
`#32548` | 评论 6 | 已关闭 | [链接](https://github.com/anomalyco/opencode/issues/32548)  
当 agent 触达 step 上限后，prompt loop 追加一条包含 "MAXIMUM STEPS REACHED" 的 assistant 消息，这导致最后一条消息变成 assistant turn，Anthropic 将其视为 response prefill，thinking 模型直接拒绝请求。已关闭。

**5. OpenCode Go 新模型全部失败**  
`#37771` | 评论 3 | 👍 8 | [链接](https://github.com/anomalyco/opencode/issues/37771)  
`kimi-k3`、`kimi-k2.6`、`glm-5.2`、`grok-4.5`、`qwen3.7-max` 等 7 个最新的 OpenCode Go（`zen/go/v1`）模型全部失败，根源是请求中携带了非标准的 `mcp`/`system` 字段，被严格校验器拒绝返回 HTTP 400。以 8 个 👍 成为今日社区高赞问题。

**6. 同一项目多实例共享同一 Session**  
`#31307` | 评论 5 | 👍 4 | [链接](https://github.com/anomalyco/opencode/issues/31307)  
同一项目目录下启动两个 `opencode` 实例时，两个终端显示相同的 session 内容，互相干扰。这是一个较为根本的会话隔离缺陷，已关闭但仍引发广泛讨论。

**7. Moonshot/Kimi 模型挂起或连接失败**  
`#41273` | 评论 3 | [链接](https://github.com/anomalyco/opencode/issues/41273)  
Moonshot/Kimi 模型在 OpenCode 中请求挂起或报 "socket connection was closed unexpectedly"，但直接 cURL 流式调用完全正常。用户怀疑是 OpenCode 内置 Moonshot provider 实现问题。

**8. 推理内容混入 content 导致 Thought 刷屏**  
`#40865` | 评论 3 | 👍 2 | [链接](https://github.com/anomalyco/opencode/issues/40865)  
使用第三方 OpenAI 兼容中转服务时，模型推理内容被逐字推入 `content` 字段，TUI 中出现大量 `Thought` 块刷屏。对使用代理/中转服务的用户造成严重体验问题。

**9. Desktop prompt 输入框被抢焦点**  
`#41332` | 评论 2 | [链接](https://github.com/anomalyco/opencode/issues/41332)  
agent 执行长任务时不断抢走用户输入焦点，并强制跳转到 prompt 输入框第 0 位，导致用户无法在 agent 工作同时在终端中工作或起草新 prompt。已关闭。

**10. Compaction 因重复 tool_call_id 永久失败**  
`#40235` | 评论 2 | [链接](https://github.com/anomalyco/opencode/issues/40235)  
中断的 tool 调用会在消息中留下第二个相同 `callID` 的 tool part，后续 compaction 回放时触发 `Duplicate value for 'tool_call_id'` 错误，导致 compaction 永远无法完成。会话进入持久不可压缩状态。

### 重要 PR 进展（10 个）

**1. feat(tui): navigate the transcript by prompt, landmark and block**  
`#53333` | [链接](https://github.com/anomalyco/opencode/pull/53333)  
为 TUI 添加按 prompt、landmark 和 block 层级导航 transcript 的能力，大幅改善长会话的历史浏览体验。

**2. feat(tui): single-press session abort 与 /abort**  
`#53656` | 依赖 #53655 | [链接](https://github.com/anomalyco/opencode/pull/53656)  
新增一键中止当前会话能力，并配套 /abort 命令。在 #53655 中先实现 abort 请求时立即显示"正在中止"的反馈状态。

**3. feat(tui): show and load the messages a long session hides**  
`#53660` | [链接](https://github.com/anomalyco/opencode/pull/53660)  
修复长会话中部分消息被 UI 隐藏但无入口加载的问题。对长会话重度用户是刚需。

**4. feat(tui): 可编辑 prompt 在 TUI 加载前显示**  
`#53698` | [链接](https://github.com/anomalyco/opencode/pull/53698)  
TUI 初始化阶段即渲染可编辑 prompt 输入框，优化冷启动后的输入体验。

**5. fix(core): 文件 logger 空闲时停止每秒唤醒**  
`#53674` | [链接](https://github.com/anomalyco/opencode/pull/53674)  
修复文件 logger 空闲时每秒唤醒来检查日志写入的行为，减少无意义的 CPU 消耗和电源损耗。

**6. feat(tui): 按阈值给 context 使用率和费用着色**  
`#53264` | [链接](https://github.com/anomalyco/opencode/pull/53264)  
基于配置的阈值，TUI 侧栏中 context 使用率与费用以不同颜色展示，帮助用户直观感知资源消耗。

**7. feat(tui): sidebar 按状态统计 MCP 数量**  
`#53261` | [链接](https://github.com/anomalyco/opencode/pull/53261)  
在 sidebar 标题处按 connected/disabled/failed 等状态展示 MCP 计数，方便快速掌握 MCP 运行态。

**8. feat(tui): 通过拖动 header 重排 sidebar 区块**  
`#53217` | [链接](https://github.com/anomalyco/opencode/pull/53217)  
新增拖动 sidebar 区块 header 以调整区块顺序的功能，配合 #53201 的 tui.json 配置排序，提供两种灵活定制方式。

**9. feat(tui): 为 sidebar 区域提供 order/hide 配置**  
`#53201` | [链接](https://github.com/anomalyco/opencode/pull/53201)  
用户可通过 `tui.json` 控制 sidebar 各区块（session transcript、MCP、todo 等）的显示顺序与显隐。

**10. fix(core): 日志时间戳使用本地时间**  
`#47867` | [链接](https://github.com/anomalyco/opencode/pull/47867)  
修复文件与 stderr 日志时间戳使用 UTC 而非本地时间的问题，方便开发者日志排障。

> **社区观察**：以上 8 个 TUI PR 均来自同一作者 @Nowaker，每个 PR 保持独立小提交并关联对应 Issue，作者明确说明 v1 为维护分支、v2 版本待适配。这种集中批量贡献构成了当前社区最活跃的开发驱动力量。

### 功能需求趋势

从今日 Issue 与 PR 中可提炼以下社区关注方向：

- **TUI 可定制性**：variant 状态栏显示、session_id 展示、时间戳粒度控制、sidebar 区块排序与显隐——用户希望 TUI 能按个人偏好深度定制（相关 PR：#53848、#53639、#53654、#53201）
- **长会话管理**：消息加载、transcript 导航、abort 操作、compaction 稳定性——长会话不可避免，社区需要更好的浏览与打断能力
- **Desktop 稳定性与功能补齐**：sidecar OOM、session 加载、自定义 provider 保存、输入焦点抢占——桌面版仍显成熟度不足，功能上落后 TUI（无会话分支，见 #33469）
- **权限/安全策略完善**：skill 引用缓存目录、`../` 相对路径绕过绝对路径规则、bundled skill 的信任边界——现有权限模型面对插件生态暴露设计短板（#53835、#41067）
- **新模型快速适配与兼容性**：OpenCode Go 新模型批量失败、OpenRouter tool_search 注入导致 Anthropic 协议报错——用户对模型接入速度有强诉求，且要求不同协议间能稳定互通（#37771、#53840）
- **AI 图片解析能力缺失**：社区反馈 AI 模型本身支持读图，在 OpenCode 中无法使用（#41087）

### 开发者关注点

- **Sidecar 进程内存失控**（#47553）：Windows 10 用户反复遭遇 sidecar OOM，且 1.18.29 版本仍未解决，严重动摇开发者对桌面版办公的信心
- **权限规则不匹配语义**（#41067）：`write`/`edit`/`read` 以 `path.relative(worktree, filePath)` 提交路径，`~` 和绝对路径规则永远无法命中工作区外文件——安全规则看似严谨实则失效
- **代理/中转服务适配**（#40865、#41273）：OpenAI-compatible 代理下推理内容混入正文、Moonshot 连接异常，社区在第三方模型接入上消耗大量排障时间
- **桌面版自动更新无法关闭**（#41329）：用户在创建会话时被强制更新打断，情绪反应强烈（"upset and a bit heartbroken"），凸显自动更新不可控的挫败感
- **中断/失败后的恢复能力**（#40235、#41338）：tool 中断后 compaction 永久失败、subagent 中断后上下文丢失——一次性失败导致不可逆的状态损坏，这是工程化可靠性最大的缺口

---

以上为 2026-10-08 OpenCode 社区动态日报，数据来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-08）

## 今日速览

Managed Agent 双路径架构持续推进，今日多个关联 PR 进入审查或更新阶段（#13526、#13550、#13598），同时 H5b/H5c 评审积压 40 条建议已专项跟踪。社区对 token 消耗失控（#10887）和内容泄漏类 bug（#10797）保持高关注，安全类 issue 如 #13570、#13566 持续发酵。


## 版本发布

**v0.25.0-nightly.20261007.8003d28042**（nightly）
- 修复：替换远端 Hosts 时不再丢失既有 bindings（#13430）
- 测试：core 相关测试用例补充


## 社区热点 Issues

1. **[#12380] Managed Agent 双路径架构提案：定义托管 Agent 双路径架构与分阶段交付**（评论 49）
   - 核心提案：保留现有 TypeScript agent loop，模型推理与工具环境供给解耦，Session 持有持久所有权、Workspace 绑定、可恢复工具执行和稳定 WebSocket。
   - 影响面覆盖 session-management、multi-agent、platform-distribution 多个 roadmap。
   - https://github.com/QwenLM/qwen-code/issues/12380

2. **[#13395] Kubernetes 工具运行时进度跟踪与跨平台交付门禁**（评论 15）
   - 当前进展：草案 PR #13526 已包含 CSI 运行时基础，提案 #12380 仍开放，跨平台门禁讨论活跃。
   - https://github.com/QwenLM/qwen-code/issues/13395

3. **[#6710] 恢复后区分用户取消与意外中断：ACP 会话语义修正**（评论 13）
   - 真实 REST/SSE 请求 + 原生 read_file 验证仍可复现，保持打开状态。涉及 daemon 恢复后的取消语义边界。
   - https://github.com/QwenLM/qwen-code/issues/6710

4. **[#10887] 重复工具错误无提前终止：会话在死循环中燃烧 5-14M tokens**（评论 10，P1）
   - 高优先级性能问题，通过真实 daemon/ACP Session 验证仍在 main 上复现。社区对 token 浪费反馈强烈。
   - https://github.com/QwenLM/qwen-code/issues/10887

5. **[#13570] Auto 模式误杀仅提及 amend 短语的惰性文本，且无逃生通道**（评论 7，安全）
   - 命令文本中即使不构成实际操作，只要包含 amend 短语即被拦截，破坏用户自定义规则优先级。
   - https://github.com/QwenLM/qwen-code/issues/13570

6. **[#10797] 非思考脚手架标签（工具结果块、系统提醒）泄漏到用户可见输出**（评论 8）
   - 核心内容生成污染问题，在真实 CLI/tmux 运行中仍可复现。
   - https://github.com/QwenLM/qwen-code/issues/10797

7. **[#13321] 实现任务无进展时应限制成功的只读探索**（评论 6）
   - 防止代理在无产出时无限探索文件，已与 #13601 关联，本地验证 99 次真实文件读取后正常收敛。
   - https://github.com/QwenLM/qwen-code/issues/13321

8. **[#13632] featreq：MCP 服务器 tools/list_changed 通知触发工具刷新**（评论 5）
   - 交互会话中 MCP 服务器动态更新工具列表后，当前会话工具注册表不刷新。社区期望动态工具发现能力。
   - https://github.com/QwenLM/qwen-code/issues/13632

9. **[#13633] featreq：用户取消 turn（Esc / Ctrl+C）时触发 hook**（评论 4）
   - 钩子消费者需要明确的 turn 结束语义，提议新增 StopFailureErrorType `user_cancelled` 值。
   - https://github.com/QwenLM/qwen-code/issues/13633

10. **[#13566] web-shell 审批卡片泄漏模型提供的兄弟文本，注释过度声称覆盖**（评论 6，安全）
   - 上轮 PR 合并时两个审阅线程被直接关闭，遗留三个未修复项。
   - https://github.com/QwenLM/qwen-code/issues/13566


## 重要 PR 进展

1. **[#13526] feat(runtime)：私有 CSI 运行时基础**（OPEN）
   - 搭建实验性私有 CSI 文件运行时基础，关闭不支持的私有入口点，为后续 DRAINED/RELEASED 状态机打底。
   - https://github.com/QwenLM/qwen-code/pull/13526

2. **[#13530] docs(managed-agent)：AgentDefinition 执行设计（D8b/D8c）**（OPEN）
   - 中英双语设计文档：新 Session 如何固定存储的 AgentDefinition 修订版，权限策略与工具启用如何生效，先评审后落地。
   - https://github.com/QwenLM/qwen-code/pull/13530

3. **[#13467] feat(agents)：会话中心化多智能体协作**（CLOSED）
   - 用 @-mention 在同一会话内联获得智能体回复，含名称、实时状态、工具步骤、token 用量与逐消息工具调用。已合并。
   - https://github.com/QwenLM/qwen-code/pull/13467

4. **[#13550] feat(managed-agent)：H4b 子会话运行时**（OPEN）
   - Managed Agent 扩展运行时 H 阶段第 4b 切片，基于 #13505 堆叠实现子会话运行时。
   - https://github.com/QwenLM/qwen-code/pull/13550

5. **[#13583] feat(agents)：移除线程后端，A2A 迁移到会话**（OPEN）
   - 会话多智能体工作第二步：删除旧的线程协作后端，将 A2A 完全迁移至聊天会话。依赖 #13467。
   - https://github.com/QwenLM/qwen-code/pull/13583

6. **[#9417] fix(cli)：工作树守卫中 heredoc 展开失败时拒绝执行**（OPEN）
   - 未加引号的 heredoc 正文中 bash 会展开 `$(...)`、反引号和 `${...}`，旧实现直接丢弃正文，存在安全风险。该 PR 改为 fail-closed。
   - https://github.com/QwenLM/qwen-code/pull/9417

7. **[#13163] fix(managed-agent)：拒绝授权时停止绑定的 Turn**（OPEN）
   - Workspace 绑定 Session 创建权限被撤销后，创建者仍可取消已准入运行中的 Turn，需恢复接管能力。
   - https://github.com/QwenLM/qwen-code/pull/13163

8. **[#13436] fix(acp)：跨会话恢复保留取消意图**（OPEN）
   - 保留用户显式取消意图，同时令基础设施中断可恢复。已补充约 840 行测试，恢复后的尝试保留独立执行身份。
   - https://github.com/QwenLM/qwen-code/pull/13436

9. **[#13398] fix(hooks)：在工具准入前应用 PreToolUse 输入**（OPEN）
   - 将文档化的 `PreToolUse.updatedInput` 替换在权限检查、确认与工具准备前生效，且替换不能绕过 deny 规则。
   - https://github.com/QwenLM/qwen-code/pull/13398

10. **[#13568] fix(lsp)：文件查询路由到适用的服务器**（OPEN）
   - 默认文件级 LSP 操作按扩展名/语言与物理 workspace 位置选择可用服务器，覆盖定义、引用、悬浮、文档等。
   - https://github.com/QwenLM/qwen-code/pull/13568


## 功能需求趋势

- **Managed Agent 架构全面铺开**：从双路径提案（#12380）到 CSI 运行时基础（#13526）、子会话运行时（#13550）、自动化运行时（#13598）、设计文档（#13530），托管智能体生态正在系统性落地。
- **多智能体协作从线程模式走向会话模式**：核心工作（#13467）已合并，后续删除线程后端（#13583）和评估 model-facing 文本（#13613）都在推进。
- **MCP 能力补全**：tools/list_changed 动态刷新（#13632）是重要信号，社区需要更像“活”的 MCP 工具发现。
- **可观测性与生命周期钩子**：用户取消 turn 时触发 hook（#13633）、事件保留与 replay-floor 推进（#13621）等，表明生产级可运维性是关注重点。
- **token 效率与防失控机制**：死循环 token 消耗（#10887）、只读探索无进展限制（#13321）、工具输出预算（#13599）等成为高频话题。

## 开发者关注点

- **token 资源浪费严重**：#10887 与 #13321 表明代理在死循环和无产出探索中消耗大量 token，社区对上限与提前终止机制呼声高。
- **输出内容污染**：多起标签泄漏 bug（#10797、#10791、#10700）持续未闭环，用户对输出干净度敏感。
- **取消语义不透明**：用户取消与基础设施中断的区分（#6710），以及取消时无 hook 通知（#13633），是会话级开发的常见困扰。
- **安全边界与逃生通道**：auto 模式误杀（#13570）、web-shell 未消毒文本（#13566）、env 路径无归属检查（#13513）集中体现了安全策略需要更精细的粒度与用户可控性。
- **错误信息传递不足**：subagent 失败时主代理只收到“subagent execution failed”，缺少根因传递（#13597）。
- **配置一致性**：`/update` 在交互与非交互模式下行为不一致（#13634），需统一执行语义。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*