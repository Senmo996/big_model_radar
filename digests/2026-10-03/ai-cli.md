# AI CLI 工具社区动态日报 2026-10-03

> 生成时间: 2026-10-03 02:46 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-03）

## 1. 生态全景

当前 AI CLI 工具赛道已从"单点能力竞争"进入**平台化与生态化阶段**：主流工具均以周/天级频率发布版本，持续修复可靠性问题并扩展工具链集成（MCP、插件、自定义模型）。社区反馈高度集中在**扩展生态的可信度**（MCP 认证、插件配置失效）、**Agent 行为可靠性**（假成功、挂起、工具误用）以及**多模型/多提供商支持**（BYOK、Bedrock、自定义 provider）三大方向。同时，Windows 桌面端体验正在成为明显的短板，而 TUI/IDE 交互细节的优化开始受到密集关注。

## 2. 各工具活跃度对比

| 工具 | 过去 24h Release 数 | 热点 Issues（列出数） | 重要 PR（列出数） | 高频关键词 |
|---|---|---|---|---|
| Claude Code | 1（v2.1.288） | 10 | 未单列（随版本修复） | Mods 扩展性、认证错误、Diff 审查 UI |
| OpenAI Codex | 7（rust-v0.162.0-alpha.3~9） | 10 | 10 | VS Code 消息丢失、Windows 沙箱、MCP 截断 |
| Gemini CLI | 1（nightly） | 10 | 10 | Agent 假成功/挂起、AST、沙箱、MCP 超时 |
| GitHub Copilot CLI | 3（1.0.92-1/2/3） | 10 | 1（无描述） | MCP 认证、BYOK 失效、权限配置、模型路由 |
| Kimi Code CLI | 0 | 0 | 0 | 无活动 |
| OpenCode | 0 | 10 | 6+ | 桌面数据丢失、代理认证、配置不生效 |
| Qwen Code | 1（nightly） | 10 | 10 | Managed Agent、token 成本、会话损坏、CI 失明 |

> 注：Issues/PR 数为各日报中列出供分析的数量，非当日全部增量；Claude Code 和 OpenCode 的 PR 信息未完全单列。

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **扩展生态可信度** | Claude Code、Gemini、Copilot CLI、OpenCode、Qwen Code | 插件/skills/扩展配置不生效、MCP 认证与协议兼容问题、工具目录竞态、扩展加载容错 |
| **MCP 成熟度** | Copilot CLI、Codex、Gemini | OAuth token 并发刷新、协议无 fallback、结果截断未计 JSON 开销、初始发现超时导致假死 |
| **Agent 行为可靠性** | Gemini、Claude Code、Qwen Code | 子代理假成功（MAX_TURNS 误报为 success）、Auto Mode Bash-first 静默禁用规则、权限拒绝后无法正确终止 Turn |
| **模型/提供商/路由** | Copilot CLI、Codex、OpenCode、Claude Code | BYOK 非 OpenAI 兼容、reasoning effort 透传、Bedrock 变量未替换、模型降级导致上下文窗口装不下 |
| **Windows 桌面稳定性** | Codex、Copilot CLI、Claude Code、OpenCode | 沙箱 ACL 失败、后台进程弹窗、看门狗杀服务、trust 持久化失效、TLS 栈差异 |
| **Token/上下文成本治理** | Qwen Code、Codex、Gemini | 非对话上下文计费不可见、MCP 大结果截断、@directory 无限递归读取、重复工具响应污染上下文 |
| **TUI/交互体验** | Codex、Copilot CLI、Gemini | 鼠标捕获默认可关闭、复制保留纯文本、Ctrl+E 环境选择、输入响应顺序、交互选择列表确认 |

## 4. 差异化定位分析

- **Claude Code**：以 **Mods 扩展架构**为核心卖点，社区讨论集中在上层扩展 API（`$.ui.selection()`、插件系统）与 IDE 审查体验；目标用户是重度 VS Code 用户与团队协作场景。
- **OpenAI Codex**：当前处于 **高频 Rust 重写/alpha 迭代期**，功能演进快但稳定性问题密集（VS Code 扩展消息丢失为最大痛点）；定位偏底层执行环境与多提供商接入（Bedrock、自定义能力覆盖）。
- **Gemini CLI**：侧重 **Agent 架构正确性**——子代理状态可信度、调度器强制安全护栏、AST 感知工具评估；技术路线明显向"更强的自主推理+结构化代码理解"倾斜。
- **GitHub Copilot CLI**：以 **企业级集成**为重心：MCP 认证、远程会话（GitHub Mobile）、BYOK、权限配置；迭代方式谨慎（补丁级快速发布），对生态兼容问题反应快。
- **OpenCode**：桌面/本地优先，关注 **GUI 扩展基础设施、代理认证、计费透明度**；社区体量相对小，但反馈集中且严重（数据全丢）。
- **Qwen Code**：明确以 **Managed Agent 架构（M-slice）** 作为主线，推进 Runtime 工具执行、Session 持久化与目录变更控制；同时暴露国内网络环境下的 TLS 兼容等本地化问题。
- **Kimi Code CLI**：无社区动态，观察期。

## 5. 社区热度与成熟度

- **Claude Code 社区讨论深度最高**：#91870（Mods 扩展性）237 条评论，认证错误跨一年仍 121 条；Feature Request 获 201👍，显示用户对平台方向有明确期待。反应机制成熟，有 oncall 标签与定期 Community Update。
- **OpenAI Codex 处于快速迭代 + 投诉集中的阶段**：24h 内 7 个 alpha 版本，但 VS Code 扩展消息丢失跨多版本复现（#49834/#49975/#50403）已影响企业用户信任。Rust 重写期的"速度 vs 稳定"矛盾明显。
- **Gemini CLI 的 P1 Bug 治理意识强**：多个 P1 问题已进入 PR 收尾（状态关闭），且研究方向前瞻（AST、零依赖沙箱、意图路由），社区专业度较高，但用户基数与议题量相对温和。
- **GitHub Copilot CLI 修复节奏快，但重大架构讨论少**：3 个补丁版迅速响应输入序、MCP 重连、sandbox 临时目录；Issue 侧仍以兼容性为主，PR 讨论缺乏深度（唯一新 PR 无描述）。
- **Qwen Code 显示出平台演进期的双面性**：架构 PR（Managed Agent M5a/G3/W2）密集推进，同时也暴露会话删除损坏（P1）、凭据泄漏、CI 静默失败等工程基础问题，成熟度尚在爬坡。
- **OpenCode 体量最小但问题严重**：连续更新后数据全丢、自定义 Provider 完全不可用等致命缺陷会显著影响留存。

## 6. 值得关注的趋势信号

1. **"可扩展性"已成为 CLI 工具的第二战场**：Claude Code 的 Mods API、Gemini 的 skills/sub-agents、Qwen 的 Managed Agent 插件切片，都指向同一结论——AI CLI 不再只是聊天工具，而是**可编程的 Agent 运行时**。开发者选型时应评估扩展 API 的稳定性与生态活跃度，而非仅看模型能力。

2. **MCP 正从"能连"走向"可靠"**：多个工具同时出现 MCP 认证竞态、目录变更回归、结果截断不计开销等问题。MCP 作为事实标准的身份已确立，但**可靠性工程尚未跟上**——建设自有 MCP 生态时需要预留超时、降级、重试机制。

3. **模型路由/混合模型将成为企业落地刚需**：Copilot CLI 的 HydraFusion 降级失败、Codex 的 Bedrock Astra Ultrafast、BYOK Deepseek 失效等案例表明，企业用户要求 CLI 既能接入多种模型（含私有/国产），又能在路由降级时保持会话一致性。这是下一个差异化竞争点。

4. **Windows 桌面端体验是最大的未开发机会**：Codex、Copilot CLI、Qwen、OpenCode 均在 Windows 沙箱、ACL、临时目录、后台进程上有大量 issue。当前 Windows 用户明显是"二等公民"，能率先解决这一平台痛点的工具将获得企业桌面份额。

5. **Agent 可信度比 Agent 能力更受关注**：Gemini 子代理假成功和 Generalist 挂起、Claude Auto Mode 静默禁用规则、Qwen 权限拒绝死循环，都指向同一个问题——**当 Agent 出错时，用户能否信任它的状态报告？** 可观测性（为什么中断、消耗了多少 token、做了什么操作）将成为下一代 CLI 的标配。

6. **Token 成本透明化将影响付费意愿**：Qwen 用户抱怨系统提示词与工具 schema 被重复计费，Codex 用户质疑 24MB 冷启动流量与 MCP 大结果集开销。随着用量上升，**细粒度 token 分解、本地预算控制、按需截断**会从可选项变为必选项。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

### 1. 热门 Skills 排行

**skill-creator 工程修复** — #1298  
修复触发器评估误报、Windows 兼容性及运行时故障判定错误。作为官方 Skill 基础设施，讨论集中在评估稳定性对 Skill 质量门槛的影响。状态：**Open**  
🔗 https://github.com/anthropics/skills/pull/1298

**mcp-builder 适配 MCP 2.0** — #1742  
解决 `mcp>=2` 的 `streamable_http_client` 导入重命名和自定义 headers 配置问题。社区关注 MCP 生态快速迭代下 Skill 的兼容维护。状态：**Open**  
🔗 https://github.com/anthropics/skills/pull/1742

**proofcore-contract-auditor** — #1771  
为 Solidity/Rust 智能合约提供静态分析，并将审计证明锚定到 TON 区块链。讨论点集中在 Web3 场景的自动化验证与零存储 Merkle 协议。状态：**Open**  
🔗 https://github.com/anthropics/skills/pull/1771

**md2video-audio** — #1703  
将 Markdown 通过 Marp 编译为幻灯片，再生成带真人级配音的 MP4 视频。零成本内容制作方向引起关注。状态：**Open**  
🔗 https://github.com/anthropics/skills/pull/1703

**pyxel 复古游戏开发** — #525  
基于 Python Pyxel 库，支持 headless 输入驱动运行、逐帧检查和任务级状态验证。因可操作的调试思路获得社区关注。状态：**Open**  
🔗 https://github.com/anthropics/skills/pull/525

**document-typography 排版质量控制** — #514  
专门解决 AI 生成文档中的孤字折行、标题孤行和缩进错位。讨论认为这是所有生成文档的共性痛点。状态：**Open**  
🔗 https://github.com/anthropics/skills/pull/514

**notion-spec-to-implementation** — #1245  
将产品/技术 Spec 拆解为 Notion 任务，附验收标准和进度追踪。社区期待补齐 Notion 工作流自动化缺口。状态：**Open**  
🔗 https://github.com/anthropics/skills/pull/1245

---

### 2. 社区需求趋势

**Skill 分发信任与安全**  
43 条评论的 #492 指出社区技能在 `anthropic/` 命名空间下分发，构成信任边界滥用风险，并衍生出 XSS（#1394）等具体安全问题。  
🔗 https://github.com/anthropics/skills/issues/492

**企业级协作与共享机制**  
#228（16 评论）要求组织级 Skill 共享，避免手动下载传输 Skill 文件。反映 Skills 从个人开发走向团队协作的需求。  
🔗 https://github.com/anthropics/skills/issues/228

**官方 Skill 可靠性修复**  
多个高赞 issue 指向基础设施缺陷：`run_eval.py` 触发率 0%（#556）、skill-creator 静默基准失败（#1383）、mcp-builder 评估器完全损坏（#1390 与 #1383 关联的修复）。  
🔗 https://github.com/anthropics/skills/issues/556  
🔗 https://github.com/anthropics/skills/issues/1383  
🔗 https://github.com/anthropics/skills/issues/1390

**上下文窗口与资源治理**  
#1487 披露 claude-api Skill 一次性注入约 156k tokens，直接耗尽上下文窗口。与 #1175 的 SharePoint 文档处理担忧共同指向 token 效率诉求。  
🔗 https://github.com/anthropics/skills/issues/1487

**Agent 治理与安全模式**  
#412（6 评论）提出 agent-governance Skill，涵盖策略执行、威胁检测、信任评分与审计轨迹；#1385 提出三阶段质量门流水线（前校准 → 对抗式评审 → 交付校验）。  
🔗 https://github.com/anthropics/skills/issues/412  
🔗 https://github.com/anthropics/skills/issues/1385

---

### 3. 高潜力待合并 Skills

**pyxel — 复古游戏 Skill（#525）**  
独立完整的游戏开发工作流，含测试与验证机制，符合 Skill 可验证输出趋势。  
🔗 https://github.com/anthropics/skills/pull/525

**document-typography — 排版质量 Skill（#514）**  
定位 AI 生成文档的普遍质量问题，跨行业适用，且不受单一技术栈限制。  
🔗 https://github.com/anthropics/skills/pull/514

**awt — AI 驱动 E2E 测试（#822）**  
零代码测试生成、视觉与浏览器控制结合，直接响应测试自动化需求。  
🔗 https://github.com/anthropics/skills/pull/822

**odt — OpenDocument 文档处理（#486）**  
覆盖创建、填充与 HTML 转换，补充官方文档处理版图中缺失的粗粒度格式。  
🔗 https://github.com/anthropics/skills/pull/486

**blast-radius — 破坏性操作安全检查（#1776）**  
面向批量/破坏性写入前的检查清单（归档用户、撤销权限、删除数据行），填补了查询正确性与现实世界冲击之间的安全缺口，与 #412 的 agent 治理需求相互呼应。  
🔗 https://github.com/anthropics/skills/pull/1776

**testing-patterns — 测试方法论沉淀（#723）**  
覆盖单元测试、React 组件测试到 Testing Trophy 模型，属于“知识型”Skill 的典型代表。  
🔗 https://github.com/anthropics/skills/pull/723

---

### 4. Skills 生态洞察

社区最集中的诉求是通过标准化的信任分发与验证机制，提升 Skill 可靠性，同时从文档/演示类内容生产拓展到测试自动化、安全治理和企业级协作等真实生产场景。

---

# Claude Code 社区动态日报 — 2026-10-03

## 今日速览

今日发布 **v2.1.288**，为 Mods 新增 `$.ui.selection()` API，并为 Cloud Sessions 内置 `gh api` 命令。社区层面，Mods 扩展性讨论（#91870）以 237 条评论持续霸榜，认证错误（#8327）升至 121 条评论的高热度，同时 **VS Code Diff 审查 UI**（#33932, 201👍）与 **Auto Mode 滥用 Bash 工具**（#87971, 90👍）是最受瞩目的功能请求与缺陷报告。

---

## 版本发布

### v2.1.288

> 来源：GitHub Releases · 过去 24 小时发布

**更新内容：**

- **新增** `$.ui.selection()` API（Mods）：返回全屏模式下最后选中的文本；当选区落在单条 transcript 行内时，同时返回该行数据。
- **内置 `gh api`**：Cloud Sessions 镜像中未预装 GitHub CLI 时，现提供内置的 `gh api` 命令；同时修复了内置命令发送控制字符的问题。

---

## 社区热点 Issues

以下为过去 24 小时更新最活跃、或社区反响最强的 10 个 Issue：

### 1. Mods 扩展性讨论持续发酵
**#91870** — [Mods - make Claude 10x more extensible](https://github.com/anthropics/claude-code/issues/91870)  
- 标签：enhancement / area:hooks / area:plugins｜作者：@poteat  
- **237 条评论** · 130 👍 · 创建 2026-09-03，更新 2026-10-02  
- 摘要：官方发布了 Community Update，宣称新扩展能力"正在按 N 周计划推进"，社区正向反馈密集。作为 Mods 的首个核心讨论帖，其热度直接反映了开发者对 Claude Code 可扩展性的强烈诉求。

### 2. API Key 覆盖订阅导致的认证错误
**#8327** — ['Organization has been disabled' error when ANTHROPIC_API_KEY overrides Max/Pro subscription](https://github.com/anthropics/claude-code/issues/8327)  
- 标签：bug / platform:windows / area:auth / oncall｜作者：@Toowiredd  
- 121 条评论 · 19 👍 · 创建 2025-09-29，更新 2026-10-03  
- 摘要：持有有效 Pro/Max 订阅的用户，在设置 `ANTHROPIC_API_KEY` 后收到 *"This organization has been disabled"* 错误。该问题跨越一年仍在活跃讨论，已标记 oncall，影响面覆盖订阅用户的本地开发流程。

### 3. VS Code Diff 审查 UI 呼声最高
**#33932** — [[FEATURE] VS Code Extension: Diff review UI similar to GitHub Copilot Edits Review](https://github.com/anthropics/claude-code/issues/33932)  
- 标签：enhancement / area:ide / platform:vscode｜作者：@yakupadakli  
- 39 条评论 · **201 👍** · 更新 2026-10-03  
- 摘要：请求为 VS Code 扩展提供类 Copilot Edits Review 的 Diff 审查界面。这是当前 Issue 中点赞数最高的功能请求，表明 IDE 工作流中的审阅体验是用户强烈关注的短板。

### 4. LSP 插件配置失效
**#15148** — [LSP plugin lspServers config not being processed from marketplace.json](https://github.com/anthropics/claude-code/issues/15148)  
- 标签：bug / has repro / platform:macos / area:tools｜作者：@giovannirco  
- 23 条评论 · 73 👍 · 更新 2026-10-03  
- 摘要：marketplace.json 中定义的 `lspServers` 配置未被提取或处理，导致 typescript-lsp、pyright-lsp、gopls-lsp 等插件安装后无法工作。插件生态的信任度直接受影响。

### 5. Chrome MCP 出现域名拦截回归
**#43255** — [[BUG] Claude in Chrome MCP tools: "Navigation to this domain is not allowed" on all domains (v1.0.66)](https://github.com/anthropics/claude-code/issues/43255)  
- 标签：bug / regression / platform:macos / area:chrome｜作者：@dmarketingllm  
- 22 条评论 · 13 👍 · 更新 2026-10-03  
- 摘要：v1.0.66 中 Chrome MCP 工具对所有域名报 *"Navigation to this domain is not allowed"*，属于回归问题。浏览器自动化场景被阻断。

### 6. Auto Mode 的 Bash-first 指令静默禁用 CLAUDE.md
**#90450** — [[BUG] Auto Mode's Bash-first instruction silently disables nested CLAUDE.md and path-scoped rules](https://github.com/anthropics/claude-code/issues/90450)  
- 标签：bug / has repro / platform:windows / area:tools｜作者：@gabgoss  
- 18 条评论 · 48 👍 · 更新 2026-10-03  
- 摘要：Auto Mode 的 Bash-first 策略会静默禁用嵌套 CLAUDE.md 与路径级规则，导致项目级配置失效。与 #87971 同属 Auto Mode 工具选择问题的两面。

###

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-03

## 今日速览

VS Code 扩展自 10 月 1 日更新后出现消息"消失"或卡在发送队列的批量问题，多个 issue 指向 26.928/26.930 版本存在 "undefined" JSON 解析错误，引发跨公司报告。代码层面，今日密集发布 7 个 rust-v0.162.0-alpha 版本，并合入多项针对 TUI 复制、MCP 结果截断、Windows 沙箱的修复 PR。社区强烈要求 TUI 鼠标捕获默认为关闭，以及对复制行为提供纯文本选项。

## 版本发布

过去 24 小时共发布 7 个 alpha 版本（rust-v0.162.0-alpha.3 至 alpha.9），具体变更内容暂未公布：

- [rust-v0.162.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.9)
- [rust-v0.162.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.8)
- [rust-v0.162.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.7)
- [rust-v0.162.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.6)
- [rust-v0.162.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.5)
- [rust-v0.162.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.4)
- [rust-v0.162.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.3)

## 社区热点 Issues

### 1. Windows ChatGPT Work 项目上下文同步反复失败（44 评论）
[#42215](https://github.com/openai/codex/issues/42215) — Windows 11 桌面端在现有 ChatGPT Project 中启动本地 Work 聊天失败，项目包含 23 个源文件时在文件系统阶段的同步反复出错。已开放一个多月，仍无修复，社区持续关注。

### 2. Chrome 插件 / 浏览器 / 计算机使用拒绝访问特定站点（40 评论，16 👍）
[#29343](https://github.com/openai/codex/issues/29343) — 代码在访问某些网站时被静默拒绝，不报错也不执行。该 issue 已持续三个半月，是社区最关注的浏览器自动化问题，Pro 用户每月 €225 付费受影响。

### 3. VS Code：消息卡在 steer-like 待处理状态（11 评论，11 👍）
[#49991](https://github.com/openai/codex/issues/49991) — 26.928.31416 更新后，普通消息消失、无限旋转或卡在类似 steer 的待处理状态。Enterprise 用户受影响，评论数与 👍 数均较高。

### 4. VS Code：内部 fetch 响应未定义导致 JSON 解析错误（18 评论）
[#49834](https://github.com/openai/codex/issues/49834) — 排队消息发送锁释放时出现 `SyntaxError: "undefined" is not valid JSON`，Linux x64 环境，openai.chatgpt 26.928.31416。

### 5. 消息卡在发送队列 — "undefined" 非有效 JSON（16 评论）
[#49975](https://github.com/openai/codex/issues/49975) — 与 #49834 同源问题，Windows 环境，VS Code 扩展 26.928.31416，消息在 send-queue 锁释放时失败。

### 6. 队列消息静默失败 — "Failed to release queued message send lock"（7 评论）
[#50403](https://github.com/openai/codex/issues/50403) — 26.930.21537 仍复现，说明该 bug 跨两个版本存在，Pro 用户受影响。

### 7. VS Code：提交的 prompt 消失且不处理（3 评论）
[#50265](https://github.com/openai/codex/issues/50265) — 用户代表多个公司报告：10 月 1 日起，按 Send/Enter 后 composer 被清空但消息未处理。影响范围广，值得官方优先排查。

### 8. Windows 沙箱失败：apply deny-read ACLs（3 评论）
[#50490](https://github.com/openai/codex/issues/50490) — ChatGPT 26.928.2636.0，Windows 11。沙箱日志损坏导致浏览器操作工具无法启动，`deny_read_acl_state.json` 中 22 个条目处理失败。

### 9. 登录失败：workspace 路由发现超时（3 评论，5 👍）
[#48894](https://github.com/openai/codex/issues/48894) — Ubuntu 上 Codex 26.5917.62015 登录时 workspace routing discovery 超时，Pro Max 用户，尝试多个版本均复现。

### 10. 多注解审查操作从 Markdown 预览中消失（1 评论）
[#50496](https://github.com/openai/codex/issues/50496) — Codex App 26.930.31428，Windows。打开已有 Markdown 文件时，多注解审查操作缺失，疑似回归。

## 重要 PR 进展

### 1. daemon 更新失败时包含 installer stderr
[#50499](https://github.com/openai/codex/pull/50499) — 捕获 installer 最后 2 KiB stderr 并附加到错误信息中，解决 daemon 更新失败仅有退出码、无诊断信息的问题。

### 2. 注册型 Windows 沙箱刷新跳过托管配置加载
[#50480](https://github.com/openai/codex/pull/50480) — 仅注册（registration-only）刷新保留现有沙箱时不再额外拉取 cloud-policy，减少不必要的网络请求。

### 3. TUI workspace 命令改用 app-server 默认输出上限
[#50477](https://github.com/openai/codex/pull/50477) — 移除 WorkspaceCommand 固定的 64 KiB 上限，有界命令使用 app-server 默认值；`disable_output_cap` 仅用于需要关闭上限的场景。

### 4. 为 Amazon Bedrock Astra 模型启用 Ultrafast 服务层级
[#50472](https://github.com/openai/codex/pull/50472) — Bedrock 目录清除了所有 service-tier 元数据导致请求被省略，此 PR 修复了 ultrafast 层级的选择与自定义目录支持。

### 5. MCP 工具结果截断时计入 JSON 开销
[#50470](https://github.com/openai/codex/pull/50470) — 此前仅截断预览文本，忽略了 JSON 转义与包装器带来的额外字节。现在测量完整序列化结果并渐进缩减，确保不超字节预算。

### 6. 转录选择复制为纯文本，保留富 HTML
[#50467](https://github.com/openai/codex/pull/50467) — 修复复制粗体文本会粘贴为 `**hello**` 的问题，纯文本剪贴板不再包含 Markdown 格式与转义。直接回应 #50197、#49775 等复制相关反馈。

### 7. 注册认证故障重试与执行器重连抖动
[#50465](https://github.com/openai/codex/pull/50465) — 远程执行器在认证服务故障后自动恢复，并在共享故障后分散重连尝试；防止注册重试误覆盖已替换的注册信息。

### 8. 新增 `incremental_tools` 特性标志
[#50464](https://github.com/openai/codex/pull/50464) — 注册为默认关闭的开发中特性，并在顶层与 profile 特性设置中暴露配置项，为后续增量工具能力做准备。

### 9. 自定义模型提供商能力覆盖
[#50459](https://github.com/openai/codex/pull/50459) — 允许 Responses 兼容提供商配置 live web access 与 remote compaction：

```toml
[model_providers.custom.capabilities]
external_web_access = false
remote_compaction = "v2"
```

### 10. Rollout 附件打包为 gzip tar 归档
[#50446](https://github.com/openai/codex/pull/50446) — 将文件型 rollout 与缓冲 rollout 前缀合并为 `rollouts.tar.gz`，诊断信息保留为独立附件，并受既有大小限制约束。

## 功能需求趋势

- **TUI 交互行为可配置**：社区强烈要求鼠标捕获默认关闭（[#50370](https://github.com/openai/codex/issues/50370)）、复制格式可通过配置切换为纯文本（[#49775](https://github.com/openai/codex/issues/49775)），核心诉求是 TUI 不改变终端既有行为。
- **模型服务层级与自定义提供商能力**：Bedrock Astra 的 Ultrafast 层级支持（[#50472](https://github.com/openai/codex/pull/50472)）与自定义模型提供商能力覆盖（[#50459](https://github.com/openai/codex/pull/50459)）表明社区对多模型/多提供商接入的需求在增长。
- **MCP 结果处理的精细化**：多个 PR 涉及 MCP 结果截断（[#50470](https://github.com/openai/codex/pull/50470)、[#50458](https://github.com/openai/codex/pull/50458)），说明 MCP 生态使用量上升后，大结果集的处理成为实际问题。
- **Windows 环境稳定性**：沙箱初始化、ACL 设置、启动超时等 Windows 专属问题占比高，是当前最集中的平台痛点。

## 开发者关注点

1. **VS Code 扩展消息可靠性是当前最大痛点**：多个 issue（[#49834](https://github.com/openai/codex/issues/49834)、[#49975](https://github.com/openai/codex/issues/49975)、[#49991](https://github.com/openai/codex/issues/49991)、[#50403](https://github.com/openai/codex/issues/50403)、[#50265](https://github.com/openai/codex/issues/50265)）指向同一类问题——消息提交后消失、卡在队列或永不处理，且跨 Windows/Linux、跨 26.928/26.930 版本复现。已有 PR（[#50467](https://github.com/openai/codex/pull/50467)）修复复制问题，但发送队列的根因尚待排查。

2. **Windows 平台问题集中爆发**：从沙箱 ACL 失败（[#50490](https://github.com/openai/codex/issues/50490)）、浏览器工具无法启动（[#50495](https://github.com/openai/codex/issues/50495)）、启动挂起（[#49557](https://github.com/openai/codex/issues/49557)）到本地运行时准备超时（[#48729](https://github.com/openai/codex/issues/48729)），Windows 用户体验明显落后于 macOS/Linux。

3. **性能与资源消耗争议**：`codex exec` 每次冷启动下载约 24 MB 远程插件目录，批量使用场景下估算每日流量约 78 GB（[#47483](https://github.com/openai/codex/issues/47483)）；Windows 插件页扫描 60 个工作区根目录超过 30 秒超时（[#46974](https://github.com/openai/codex/issues/46974)）。

4. **认证与会话同步问题持续**：桌面端

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-03

## 1. 今日速览

今日共发布 1 个 nightly 版本（v0.64.0-nightly.20261003），主要修复了交互式选择列表的键盘确认问题。社区讨论焦点集中在 **Agent 可靠性** 上，多个 P1 Bug（如子代理状态误报、Generalist 代理挂起、终端交互卡死）正在等待复测或修复，同时多项涉及沙箱、MCP 超时、会话恢复的 PR 已进入收尾阶段。

## 2. 版本发布

**v0.64.0-nightly.20261003.gfb972b2f8**  
修复：`fix(cli): ensure Enter and Spacebar reliably confirm selection list options`（由 @ugorla-dev 提交，PR #29502）。该版本为常规 Nightly 发布，更新内容聚焦于交互层。  
查看完整 Changelog：https://github.com/google-gemini/gemini-cli/compare/v0.64.0-nightly.20261002.gc9096a847...v0.64.0-nightly.202

## 3. 社区热点 Issues（10 个）

1. **[P1] Subagent 在 MAX_TURNS 后误报为 GOAL 成功**
   - #22323 | 评论 13 | 👍 2
   - 影响严重：`codebase_investigator` 子代理在达到最大轮次后返回 `status: "success"`，掩盖了实际中断原因，导致任务结果不可信。社区持续关注，已被标记为 `need-retesting`。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22323

2. **[P1] Generalist 代理无限期挂起**
   - #21409 | 评论 8 | 👍 8
   - 用户反馈简单的“创建文件夹”操作在委托给 generalist agent 后就会永远卡住，只能取消。通过提示词禁止委派子代理可规避。该问题已持续数月，是 agent 可靠性的突出痛点。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21409

3. **[P2] Gemini 不会主动使用自定义 skills 和 sub-agents**
   - #21968 | 评论 7
   - 用户观察：即使有非常相关的 gradle、git 等 custom skill，Gemini 在自主执行时也基本不会调用，除非显式指令。社区认为这削弱了 skills 机制的生态价值。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21968

4. **[P1] Browser 子代理在 Wayland 下失败**
   - #21983 | 评论 4 | 👍 1
   - 在 Wayland 会话中 browser subagent 直接以 `Termination Reason: GOAL` 结束但未完成任务，涉及图形环境兼容性问题，已被标记为 `agent/browser` 专属 Bug。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21983

5. **[P2] 零依赖 OS 沙箱与执行后意图路由（EPIC）**
   - #19873 | 评论 9 | 👍 1
   - 提议利用 Gemini 3 模型的原生 bash 亲和力，在不牺牲安全性的前提下构建零依赖沙箱，并在命令执行后进行“意图路由”（判断该次执行是只读探索还是写入变更）。该 EPIC 涉及架构级能力，开发者讨论活跃。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/19873

6. **[P2] AST 感知的文件读取、搜索与代码映射评估**
   - #22745 | 评论 7 | 👍 1
   - 该 EPIC 旨在调研 AST 感知工具（如按方法边界精确定位、减少 token 噪声）是否值得引入，以提升代码导航质量和上下文利用率。与 #22746、#22747 形成关联任务。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22745

7. **[P2] Browser Agent 忽略 settings.json 覆盖配置**
   - #22267 | 评论 4
   - `AgentRegistry` 虽能读取全局/项目级 `settings.json`，但 Browser Agent 不生效，例如 `maxTurns` 覆盖被完全无视，导致用户无法定制行为。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22267

8. **[P2] Agent 应停止/劝阻破坏性行为**
   - #22672 | 评论 3 | 👍 1
   - 用户指出模型在复杂 git 操作、数据库维护等场景中可能使用 `git reset`、`--force` 等危险命令，请求在 prompt 或工具层加入安全护栏。体现了社区对安全管控的强烈需求。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22672

9. **[P2] 语音提供商在转录未就绪时提前 connect**
   - #28647 | 评论 3
   - Local Whisper 和另一种实现存在共同契约问题：`connect()` 在 provider 完全可用之前返回，导致录音音频被发送到无效的转录器，影响语音交互的可靠性。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/28647

10. **[P2] `~/.gemini/agents/` 下符号链接 agent 不被识别**
    - #20079 | 评论 4
    - 用户期望用 symlink 管理多个 agent 文件，但当前 CLI 不会把它当作合法 agent。这是文件管理灵活性问题，长期存在且仍被标记为需确认信息。
    - 链接：https://github.com/google-gemini/gemini-cli/issues/20079

## 4. 重要 PR 进展（10 个）

1. **[P1] 持久化状态写入失败安全化**
   - #29402 | 状态：已关闭
   - 修复中断保存导致 `state.json` 被截断、从而清空 CLI 持久状态的问题。改用临时文件 + fsync + 原子重命名策略。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29402

2. **[P1] 修复恢复会话时重复的工具响应**
   - #29400 | 状态：已关闭
   - 解决 `-r` 恢复会话时 `functionResponse` 消息被重复播放（一份存于 `toolCalls[].result`，另一份存于持久化 user 消息）导致的双重调用问题。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29400

3. **[P1] MCP 初始工具发现增加超时保护**
   - #29398 | 状态：已关闭
   - 当 MCP server 声明支持 tools 但返回错误的 JSON-RPC id 时，SDK 会空等 10 分钟，导致 CLI 假死。此 PR 将初始发现绑定到短超时，关闭 #28355。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29398

4. **[P1] 调度器层强制用户“保持”指令**
   - #29394 | 状态：已关闭
   - 解决模型在用户说“wait”“先解释”时仍执行破坏性工具调用的行动偏差。在调度器层面拦截 mutating 工具，高优修复，关联 #26390。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29394

5. **[P2] 防止中断回合造成上下文污染与死循环**
   - #29397 | 状态：已关闭
   - 中断（SIGINT/超时/工具中止）后注入的合成文本被写入历史，可能形成“agent 误认为用户已读到未完成回复”的上下文毒化。该 PR 阻断此路径。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29397

6. **[P2] 编辑时保留无关注释与代码**
   - #29399 | 状态：已关闭
   - 强化 replace 工具的契约，避免模型在修改时顺带重写大段无关内容；新增基于 OAuth 多段编辑的回归评测。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29399

7. **[P2] 扩展加载容错：单个坏扩展目录不再影响全部**
   - #29387 | 状态：已关闭
   - 修复 `security.allowedExtensions` 验证发生在 try/catch 之前的问题，使异常扩展目录可被跳过并保留告警。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29387

8. **[P1] A2A server 的 Express JSON 中间件注册顺序修复**
   - #29386 | 状态：已关闭
   - 修复 `express.json()` 注册在 A2A 路由之后导致 `req.body` undefined 的问题。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29386

9. **[P1] 支持 rootless Podman 的 keep-id 模式**
   - #29505 | 状态：待关联 issue（OPEN）
   - 修复 rootless Podman 下沙箱启动失败：容器内缺少映射 UID/GID 对应的用户条目，导致无法创建或切换用户。对容器化部署用户较重要。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29505

10. **[P1] 优化 @<directory> 引用的递归读取**
    - #29617 | 状态：待关联 issue（OPEN）
    - 原先 `@<directory>` 会立即递归展开成 `**` 模式，造成大量文件被提前读取。改为仅解析相对路径，避免上下文爆炸。
    - 链接：https://github.com/google-gemini/gemini-cli/pull/29617

## 5. 功能需求趋势

- **Agent 自省与透明度**：多个 Issue 指向 agent 对自身能力认知不足——不会主动使用 skills（#21968）、不了解自身 CLI 参数/热键（#21432）、无法在 `/bug` 报告中携带子代理上下文（#21763）。社区期望 agent 更“懂自己”。
- **AST/结构化代码理解**：出现一批围绕 AST 感知工具链的 EPIC（#22745、#22746、#22747），目标是提升文件读取精度、减少上下文噪声、支持按代码结构导航。
- **沙箱与安全执行**：#19873（零依赖 OS 沙箱）、#22672（限制破坏性命令）、#22232（浏览器会话锁恢复）表明开发者对运行安全和资源隔离的关注度上升。
- **浏览器 Agent 稳定性**：Wayland 兼容（#21983）、settings.json 覆盖失效（#22267）、fail-fast 策略改进（#22232）三条线并进，反映浏览器自动化场景是当前的运维短板。
- **会话与上下文管理**：围绕 token 增长和重复消息的修复非常集中——#19561 的“Tactful Extraction”、#24246 的工具数量超限 400 错误、#22466 的 `\n` 转义处理等，说明上下文预算管理仍是核心痛点。
- **任务跟踪从上下文迁移到文件**：#18836 和 #21000 建议将 WriteToDo 替换为持久的文件级任务跟踪（CRUD），以对抗 context rot 和跨会话记忆丢失。

## 6. 开发者关注点

- **Agent 状态可信度**：子代理达到 MAX_TURNS 后却被报告为成功（#22323），这类“假成功”会让自动化流水线做出错误决策，开发者希望增加对中断原因的真实标注。
- **卡死与交互失败**：generalist agent 挂起（#21409）、创建 Vite 应用时卡在交互式提示（#22465）、get-shit-done 输出钩子崩溃（#22186）等高频复现的交互问题严重干扰日常使用。
- **本地文件与配置管理**：symlink agent 不被识别（#20079）、settings.json 对子代理不生效（#22267）、模型乱建临时脚本（#23571）等问题反映文件系统级细节处理不够鲁棒。
- **工具生态可组合性**：技能和子代理不会被主动使用（#21968），开发者希望 CLI 能理解并自动匹配用户已配置的技能，而不是每次都靠显式指令。
- **MCP 与扩展稳定性**：MCP 超时、A

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-03）

## 今日速览

过去 24 小时 Copilot CLI 连续发布 `1.0.92-1` / `1.0.92-2` / `1.0.92-3` 三个补丁版，主要围绕 MCP 重连、Windows 沙箱临时目录、输入响应顺序和沙箱网络代理提示进行修复。Issue 侧热度集中在 MCP 认证与协议兼容、BYOK 自定义模型失效、权限配置未生效，以及模型路由切换导致的会话异常；多条新 triage issue 指向 `1.0.87` 之后的 MCP 工具目录变更回归和模型路由在降级时的上下文问题。

## 版本发布

过去 24 小时共发布 3 个版本，均为补丁级更新：

- **v1.0.92-3**  
  - 新增：对话前 `Ctrl+E` 环境选择器，可快速切换本地/云端运行。  
  - 修复：键盘、粘贴、鼠标输入在快速交互期间保持有序且响应不丢失。  
  - 修复：沙箱 shell 命令在代理拦截目标地址时提供网络绕过提示。  
  [Releases](https://github.com/github/copilot-cli/releases)

- **v1.0.92-2**  
  - 修复：Windows 沙箱命令现在将临时文件写入被授予的临时目录，使依赖“rename 临时文件”的工具可正常工作。  
  - 修复：Prompt 模式在 Stop-hook 续跑完成后只触发一次 `sessionEnd` hook。  

- **v1.0.92-1**  
  - 修复：空闲 Streamable HTTP 会话过期后，可重新连接远程 MCP 服务器。  
  - 修复：向正在运行的后台 agent 发消息时，会在下一个处理时机接管当前回合。  
  - 修复：上下文 rollover 会将最新请求保留在恢复上下文中。  
  - 修复：隐藏自动沙箱 CA 设置提示。  

## 社区热点 Issues

以下为过去 24 小时内更新最值得关注的 10 个 Issue：

1. **[#4438] `disable-model-invocation: true` 导致技能完全不可达**  
   作者：@grammy-jiang | 评论 11 | 👍 12 | 状态：OPEN  
   项目技能在 `SKILL.md` 中声明 `disable-model-invocation: true` 后，`copilot skill list` 仍显示该技能，但模型调用 `skill()` 工具会返回 `Skill not found`。社区认为这违背了“仅手动调用”的预期，属于技能可见性与可达性不一致的 bug。  
   https://github.com/github/copilot-cli/issues/4438

2. **[#4012] BYOK 下 `--reasoning-effort max` 对 `glm-5.2:cloud` 不支持**  
   作者：@doggy8088 | 评论 3 | 👍 23 | 状态：CLOSED  
   社区点赞最高的问题之一。用户使用 BYOK 配置合法模型时，CLI 仍拒绝 `--reasoning-effort max`，影响自定义模型的高级推理参数透传。  
   https://github.com/github/copilot-cli/issues/4012

3. **[#3172] 终端出现 “Somebody else is owning the clipboard” 异常提示**  
   作者：@laeubi | 评论 4 | 👍 13 | 状态：CLOSED  
   在终端复制文本后切到其他应用复制，再返回时状态栏出现这条消息并破坏布局。虽然已关闭，但代表输入/剪贴板交互的长期痛点。  
   https://github.com/github/copilot-cli/issues/3172

4. **[#1825] 空 Input Schema 的 MCP 工具会导致整个 CLI 失败**  
   作者：@IvanMurzak | 评论 3 | 👍 10 | 状态：CLOSED  
   无参数 MCP 工具使用空 JSON Schema，会被 Copilot CLI 拒绝，进而导致所有 prompt 在连接该 MCP server 时失败。这是 MCP 生态兼容性的经典问题。  
   https://github.com/github/copilot-cli/issues/1825

5. **[#4840] BYOK 连接 Deepseek 失效**  
   作者：@Bude2408 | 评论 3 | 👍 1 | 状态：OPEN  
   用户设置 `COPILOT_PROVIDER_BASE_URL` 后，CLI 选择 GPT5.4 并报错：`tools[4].type: unknown variant 'custom', expected 'function'`。BYOK 在非 OpenAI 兼容 provider 上仍然脆弱。  
   https://github.com/github/copilot-cli/issues/4840

6. **[#4482] `allowed_directories` 未生效，shell 命令仍被反复询问路径权限**  
   作者：@safich-havok | 评论 2 | 👍 0 | 状态：OPEN  
   用户在 `~/.copilot/permissions-config.json` 中配置了 `allowed_directories`，但 shell 命令仍触发 “path outside your allowed directory list” 提示；只有 `/add-dir` 才能临时修复。权限配置一致性受到质疑。  
   https://github.com/github/copilot-cli/issues/4482

7. **[#4569] GitHub Mobile 在远程 CLI 已响应后仍显示 “Queued for Copilot”**  
   作者：@okonech | 评论 2 | 👍 0 | 状态：OPEN  
   CLI 本地已收到远程 prompt 并立即回复，但 GitHub Mobile 不刷新，仍停留在排队状态；同一个 session 在 GitHub.com 上却正常。远程会话同步存在移动端专项问题。  
   https://github.com/github/copilot-cli/issues/4569

8. **[#5044] 回归：MCP 工具调用因无关工具 `_meta` 不一致而失败**  
   作者：@TimStewartJ | 评论 0 | 👍 0 | 状态：OPEN  
   新 triage issue。CLI 在 MCP server 尚未完成连接时就把已保存的工具快照提供给模型；一旦 `tools/list` 返回内容有 `_meta` 差异，模型调用就会报 “MCP tool catalog changed”。这是 `1.0.87` 后引入的竞态回归。  
   https://github.com/github/copilot-cli/issues/5044

9. **[#5045] `/compact` 使用 `gpt-6.1-sol` 反复得到空响应**  
   作者：@bikramjitk | 评论 0 | 👍 0 | 状态：OPEN  
   在 Linux / CLI 1.0.84-3 上执行 `/compact` 持续报 `Compaction failed: received empty response from model`，导致上下文压缩功能不可用。  
   https://github.com/github/copilot-cli/issues/5045

10. **[#5042] HydraFusion：路由模型 400 后切到小上下文模型，静态 prompt 无法加载**  
    作者：@zekariasasaminew | 评论 0 | 👍 0 | 状态：OPEN  
    会话在 gpt-5.6-sol 上运行 37 分钟后收到 400，下一轮被重新路由到 `mai-code-1.1-flash`，因上下文窗口装不下静态 prompt 而失败，且工具集在会话中发生变化。属于模型路由降级和会话一致性风险。  
    https://github.com/github/copilot-cli/issues/5042

## 重要 PR 进展

过去 24 小时仅出现 1 条新 PR，暂无法凑足 10 条可分析条目。以下为唯一可追踪 PR：

- **[#5046] Initial commit**  
  作者：@c6r8h48msf-debug | 创建：2026-10-02 | 更新：2026-10-03 | 状态：OPEN  
  仅标题为 “Initial commit”，无描述和具体变更内容，暂时无法判断功能或修复方向。  
  https://github.com/github/copilot-cli/pull/5046

社区近期的高频修复更多通过直接发布补丁版本完成，PR 讨论活跃度较低。

## 功能需求趋势

从过去 24 小时更新的 Issues 中，可以提炼出以下社区关注方向：

- **MCP 生态成熟度**：OAuth token 并发刷新互相取消（#4842）、协议版本无 fallback（#5039）、Entra 拒绝 127.0.0.1 回调（#5040）、`mcp.showStatusNotifications` 开关（#5034）、工具目录变更容错（#5044）。  
  MCP 已成为核心工作流，但认证和连接可靠性仍是最大短板。

- **BYOK / 自定义模型支持**：Deepseek 兼容性（#4840）、reasoning effort 透传（#4012）、Opus 5.5 的

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-10-03）

## 今日速览

今日无新版本发布，社区焦点集中在新提交的缺陷报告（无 Bash 的 Agent 启动失败、transport 配置被忽略）与一批历史 Issue 的集中关闭。PR 侧，代理认证、Windows 后台进程隐藏、SSE 流稳定性等修复正在推进，同时性能优化与 GUI 扩展基础设施也有新动作。

## 社区热点 Issues

- **GO 订阅两天内烧尽限额**（#52371）：用户质疑 $60 额度在一天内耗尽为显示 Bug，涉及计费透明度，讨论 6 条。 [链接](https://github.com/anomalyco/opencode/issues/52371)
- **自定义 Provider 保存永远报错**（#50650）：Desktop 中表单提交无条件抛出 `provider.custom.unavailable`，功能完全不可用，获得 3 👍。 [链接](https://github.com/anomalyco/opencode/issues/50650)
- **Windows 上 45 秒看门狗重启托管服务**（#52049）：客户端主动杀死后台服务导致所有会话/子代理中止，非崩溃但影响严重。 [链接](https://github.com/anomalyco/opencode/issues/52049)
- **连续更新后数据全部丢失**（#39560）：三次更新后会话、历史、插件与 Provider 全部消失，属严重数据可靠性问题，用户信任打击大。 [链接](https://github.com/anomalyco/opencode/issues/39560)
- **无 Bash 的 Agent 配置启动失败**（#52880）：同日新反馈，Bash-less 配置被子代理调度时被免费层错误拦截，5/5 失败而 Bash-capable 全部成功。 [链接](https://github.com/anomalyco/opencode/issues/52880)
- **providers.settings.transport 不生效**（#52879）：配置中显式设置 `transport: "http"` 后仍未被识别，配置解析存在缺陷。 [链接](https://github.com/anomalyco/opencode/issues/52879)
- **Bedrock Mantle 模型无法连接**（#40075）：v2 路径中 `${AWS_REGION}` 变量未替换，请求发往字面量主机名，导致所有 `openai.*` Bedrock 模型不可用。 [链接](https://github.com/anomalyco/opencode/issues/40075)
- **归档会话无恢复入口**（#40287）：桌面端归档后 UI 无“显示已归档”或“取消归档”选项，归档成为单向操作，用户只能改数据库恢复。 [链接](https://github.com/anomalyco/opencode/issues/40287)
- **手动创建的 Git worktree 无法被识别**（#31851）：worktree 不出现在工作区侧边栏，也无法作为独立项目打开，影响 Git 高级用户工作流。 [链接](https://github.com/anomalyco/opencode/issues/31851)
- **自动批准时仍播放权限音效**（#48579）：声音配置下，即使开启自动批准权限，权限提示音仍频繁播放，属于打扰性 UX 问题。 [链接](https://github.com/anomalyco/opencode/issues/48579)

## 重要 PR 进展

- **支持 Negotiate、NTLM 与 Basic 代理认证**（#52734）：解决代理 407 认证挑战，企业网关环境下的关键能力。 [链接](https://github.com/anomalyco/opencode/pull/52734)
- **Windows 后台子进程隐藏**（#52871）：隐藏后台服务、PTY 守护进程等控制台窗口，避免弹窗打扰，Closes #42440。 [链接](https://github.com/anomalyco/opencode/pull/52871)
- **评论中裸 @ 词按纯文本处理**（#52877）：修复“or should I use @here?”误附加文件的问题，提升注释交互准确性。 [链接](https://github.com/anomalyco/opencode/pull/52877)
- **使用压缩代理的模型进行摘要**（#52875）：修复 `agents.compaction.model` 配置被忽略、摘要始终走默认模型的缺陷。 [链接](https://github.com/anomalyco/opencode/pull/52875)
- **会话时间线 UI 空间与错误分组修正**（#52876）：统一错误间距与 Updates 对齐，收紧分组头间距，改善视觉一致性。 [链接](https://github.com/anomalyco/opencode/pull/52876)
- **GUI 扩展：类型化组合与生命周期原语**（#52868）：无 Effect 运行时的类型安全依赖声明，Host 可并行激活扩展并在编译期拒绝冲突。 [链接](https://github.com/anomal

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-03）

## 今日速览

今日社区动态围绕 **Managed Agent 架构的密集推进** 展开：多个核心 PR（M5a Runtime 工具、被动接管、Harnes换代）进入关键 review 阶段，同时 `v0.24.7-nightly` 发布带来 Code Mode 与权限审批修复。Issue 侧，**会话删除导致历史损坏（P1）**、**非对话上下文 token 治理**、**Agent Host 安全凭据问题** 成为开发者关注焦点。

## 版本发布

- **[v0.24.7-nightly.20261002.a011f66944](https://github.com/QwenLM/qwen-code/releases)**（2026-10-02）
  - fix(core): 对齐 Code Mode 文本与懒加载工具发现
  - fix(permissions): 尊重已批准的权限项

## 社区热点 Issues（10 个）

1. **[#12380] Managed Agent 双路径架构与分阶段交付提案**（评论 42）
   定义 Managed Agent 分阶段架构：保留现有 TypeScript agent 循环，让模型推理与工具环境预配解耦，并赋予 Session 持久所有权、Workspace 绑定、可恢复工具执行及稳定 WebSocket 支持。作为顶层设计，影响后续所有 M-slice 的落地。

2. **[#12091] `sessions/delete` 致活动会话永久损坏（P1）**（评论 6）
   删除仍被 runtime 附加的 session 时，`chats/<sessionId>.jsonl` 被移除，但仍在写入的 writer 会重建文件且首条记录带上悬空 `parentUuid`，导致 `degraded_history`、auto-continue 被永久禁用。P1 级别的高影响数据一致性 bug。

3. **[#12028] 非对话上下文 token 治理**（评论 18）
   系统提示词、内置工具 schema、`QWEN.md`、技能列表等非对话上下文在每次请求中都被计费，且在大上下文模型下占比惊人但不可见。社区持续关注 token 成本的透明化与治理手段。

4. **[#13157] Agent Host 应在权限流之前运行隔离守卫**（评论 6）
   在 `qwen serve --join` 的 Agent Host 场景中，越界的工具调用会先进入权限流程，而 PLAN-mode 下无交互客户端导致自动拒绝并终止整个 Host run。建议将 confinement guard 前置，避免无谓的 run 终止。

5. **[#13122] Agent Host 401 后重新注册遗留有效凭据**（评论 5）
   安全缺陷：`enrollAgentHost` 总是追加新 host 条目而无去重，重新加入同一 workspace 后旧 host 行及其有效凭据仍然存在，造成凭证泄漏面。

6. **[#13130] Qwen Code Desktop 所有 workspace 突然变为不可信**（评论 5）
   用户报告桌面端所有 workspace 包括主工作区突然变成 untrusted/read-only，UI 无恢复途径。重置信任配置、删除信任文件均无效，疑似 Windows 平台信任持久化逻辑缺陷。

7. **[#13208] Side queries 请求 max_tokens 可能超过模型上下文窗口**（评论 4）
   `defaultOutputCeiling()` 缺少窗口感知，只有主 turn 路径做了窗口裁剪。Side query（如侧栏问答）会把完整输出上限发送到模型 API，导致请求失败或计费异常。

8. **[#13234] TLS 栈选择性连接重置（国内网络场景）**（评论 4）
   同一机器上 curl（OpenSSL 3.0）和 Node 24（OpenSSL 3.5）成功，但 Electron/BoringSSL 的扩展和 daemon 失败——TCP RST 发生在 ClientHello 之后。涉及 TLS 指纹与运营商阻断问题，影响国内用户稳定性。

9. **[#13253] `toolSearchBridgeSentence` 四个新调用点缺失注册门控**（评论 3）
   与既有两个调用点不同，四个新增站点无条件发射 bridge sentence，导致功能未注册时仍输出引导句子。因超出 PR 行数限制，issue 中跟踪但无法在 #13033 内直接修复。

10. **[#13249] 夜间 CodeQL 静默失败，59 次运行中 57 次超时**（评论 3）
    CodeQL workflow 被自身 30 分钟 `timeout-minutes` 上限杀掉了 57/59 次调度运行（2026-08-05 起），且无任何通知，取消或空运行显示为绿色，CI 健康度严重失真。

## 重要 PR 进展（10 个）

1. **[#13167] feat(managed-agent): Run Managed session tools in a Runtime worker (M5a)**
   Managed 引擎 M5 切片第一部分：Managed session 的 Read/Write/Edit/Shell 工具调用在 Runtime worker 中准备和执行，带权限检查。

2. **[#13219] fix(managed-agent): bound retry loops with terminal states**
   为 managed-agent 异步重试循环引入预算和终止状态。修复了消息投影面对永久序列缺口时卡死的问题，以及若干循环无终止条件导致资源泄漏的隐患。

3. **[#13163] fix(managed-agent): stop a bound Turn under refused authorization**
   当授权被拒绝时，能正确取消绑定的 Turn，并修复 Bound-Workspace 准入修复。基于 #13112 构建，待其合并后 diff 会收敛。

4. **[#13173] fix(managed-agent): adopt the Runtime Session on a passive takeover**
   Hosted Turn 接管的取消路径现在先取得已死所有者的 Runtime Session，再执行读取与释放，避免竞争条件导致子进程泄漏。

5. **[#12354] feat: add ui.hideStatusBar to reduce flickering (Issue #6137)**
   新增 `ui.hideStatusBar` 设置（默认 false），隐藏终端底部状态栏以减少 UI 闪烁，覆盖 ink 与 OpenTUI 双渲染器，含测试。

6. **[#12640] perf(extensions): load list metadata before selected details**
   扩展管理器改为先加载轻量元数据列表（含激活状态），再按需加载所选扩展的详情。通过能力感知做特性检测，旧 daemon 继续使用完整响应。

7. **[#12531] fix(core): stop MCP server rules from authorizing a colliding server**
   MCP 服务器规则现在与注册拼写和工具的生产者身份比较，允许 `foo.bar` 不再意外授权 `foo_bar` 的服务器。身份与旧别名贯穿权限评估、调度和 ACP，覆盖多个调用路径。

8. **[#12107] perf(core): parallelize extension loading loops**
   扩展加载使用有界并发但保持目录顺序，并传播资源耗尽错误。失败的 refresh 保留上一套完整运行时集合且保持可重试，启动时最多重试一次。

9. **[#13174] feat(managed-agent): adopt the next Hosted Harness generation (G3)**
   实现 #12952 G3 提案的第 1、2 步：Hosted Session 不再绑定首次服务的 Harness 进程代际，Java 控制平面在重启后自动采纳下一代，避免所有绑定 Session 失败。

10. **[#13247] feat(managed-agent): let creators change a bound Session's directory (W2)**
    实现 #12380 的 W2 切片：创建者可通过控制平面以持久化、幂等方式修改 Managed Session 在授权 Workspace 内的相对目录，带完整事务语义。

## 功能需求趋势

从近 24 小时活跃的 Issue 与 PR 看，社区当前最关注的功能方向如下：

- **Managed Agent 架构（绝对热点）**：围绕 #12380 的切片 M5a/W2/G3 持续推进，涉及工具 Runtime 化、Session 持久化与接管、目录变更等。该方向占据今日 PR 的一半以上。
- **Token 成本治理**：无论是非对话上下文的计费透明化（#12028）、Side query 窗口感知的 max_tokens 裁剪（#13208），还是主 turn 输出下限与用户小上下文窗口的冲突（#13252），开发者对 token 可观测性和预算控制的需求密集。
- **会话可靠性与一致性**：`sessions/delete` 导致不可逆历史损坏（#12091）、managed session store 无界增长（#13184）等 issue 表明，会话生命周期管理与数据持久化仍是薄弱环节。
- **安全与信任机制**：Agent Host 凭据去重（#13122）、工作区信任状态恢复（#13130）、MCP 服务器规则碰撞（#12531）等安全问题被反复提及，信任与授权模型需要更健壮。
- **CI 与工程质量**：CodeQL 静默超时（#13249）暴露了 CI 可观测性缺口，开发者对自动化质量门禁的可靠性提出了更高要求。

## 开发者关注点

- **数据不可逆损坏**：多个 Issue 指向会话或文件被意外破坏且无法恢复的场景。#12091 删除活动会话导致历史永久损坏；#13130 信任状态无法找回。建议相关操作前增加备份或软删除机制。
- **代理/网络兼容性**：国内用户持续报告 TLS 栈相关的选择性重置（#13234），Electron/BoringSSL 在部分链路上失败。社区对网络环境适应性与降级策略有强烈诉求。
- **不可见成本**：非对话上下文 token 消耗和 Side query 的 token 越界问题（#12028、#13208）黏性极高，开发者要求提供可视化 token 分解和按窗口自动裁剪。
- **CI 信任度**：CodeQL 扫描连续超时却显示为绿的现状（#13249）令开发者对整个自动化质量体系产生怀疑，需要更明确的失败通知和超时告警。
- **Managed Agent 复杂度隐忧**：多个 review 周期长、follow-up 繁多的 PR（如 #13167、#13129）表明该部分设计复杂度极高，社区希望有更清晰的分期验收标准和更小的 review 批次。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*