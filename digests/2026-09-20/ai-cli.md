# AI CLI 工具社区动态日报 2026-09-20

> 生成时间: 2026-09-20 02:13 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-20）

> 数据窗口：2026-09-19 ~ 2026-09-20，基于各工具 GitHub 社区日报整理。

---

## 1. 生态全景

当前 AI CLI 工具已进入「高频迭代 + 社区压力测试」阶段：OpenAI Codex 单日发布 4 个 alpha、31 个 PR 更新，Qwen Code 发布 v0.24.1 正式版，Claude Code 更新 v2.1.278，Gemini CLI 保持 nightly 节奏。社区关注重点正从“模型能力”转向**可靠性、权限透明度、跨平台一致性、会话与上下文管理**；同时 MCP/ACP 协议层兼容性、静默数据损坏、隐私泄漏等问题成为共性痛点。整体上，各工具都在从“能用”向“可信、可控、可预测”演进。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issue 数 | PR 更新/合并数 | Release 情况 | 备注 |
|---|---|---|---|---|
| Claude Code | 10（Top 10 热点） | 1 | v2.1.278 | 主要变更：auto mode 默认切换服务端分类器 |
| OpenAI Codex | 10（Top 10 热点） | 31 | 4 个 alpha（rust-v0.156.0-alpha.6~9） | PR 多集中在 TUI transcript 重构 |
| Gemini CLI | 10（Top 10 热点） | 5 | 1 个 nightly | AST 感知代码导航进入 PR 阶段 |
| GitHub Copilot CLI | 48（24h 更新总量） | 0 | 无 | 系统清理历史 issue，无代码合并 |
| Kimi Code | 7（1 新开 + 6 关闭） | 5 | 无 | 批量关闭历史 HTTP header 连接错误 |
| OpenCode | 10（Top 10 热点） | 10 | 无 | 关注 ACP over WebSocket、会话管理 |
| Qwen Code | 10（精选） | 10 | 4（v0.24.1 + nightly/desktop/SDK） | 含破坏性变更：停止输出 active_goal 事件 |

> 注：除 Copilot CLI 外，Issue 数为日报精选的 Top 10 或提及数，并非仓库当日全部新增/更新总量。

---

## 3. 共同关注的功能方向

### 3.1 会话管理与会话恢复
- **OpenAI Codex**：TUI transcript 搜索、紧凑浏览、选择复制，构建完整历史记录回放体系。
- **Claude Code**：MRU 会话切换、/resume 仅加载 50 条限制、快速标记会话完成。
- **Gemini CLI**：`resume latest` 定位错误、检查点损坏导致崩溃。
- **OpenCode**：会话自动命名、会话选择器、/move 跨项目路径。
- **Qwen Code**：从持久化历史恢复工作流，支持 retry/rerun。

### 3.2 跨平台稳定性
- **Windows**：Claude Code Cowork 写入滞后、Bash 转义折叠；Codex 浏览器控制认证失败、EPERM 死循环；Kimi 非 UTF-8 输出；OpenCode PE loader 错误；Qwen Windows CI 连续失败。
- **macOS**：Claude WindowServer 高 CPU；Qwen PTY 不可用；OpenCode TUI 挂起。
- **Linux/Wayland**：Gemini 浏览器子代理失败；Copilot WSL2 白屏死锁。

### 3.3 MCP/ACP 协议生态可靠性
- **Copilot CLI**：Figma M

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-20）

> 说明：所有 PR 评论数均未披露（undefined），以下排序综合创建/更新时间、功能代表性与社区讨论热度（结合关联 Issue）得出。

---

## 1. 热门 Skills 排行

### 🥇 Pyxel — 复古游戏开发
**PR:** [#525](https://github.com/anthropics/skills/pull/525) | **状态:** Open
- **功能：** 引导 Claude 使用 Python 创建、调试和验证复古风格游戏，支持确定性 headless 运行、逐帧检查与任务级状态验证。
- **讨论热点：** 社区关注其调试方法论——通过状态检查而非人工目测来验证游戏逻辑，这一模式对其他视觉密集型应用同样适用。
- **关注度：** 创建于 3 月，持续更新至 9 月中旬，是长期活跃的代表性创意类 Skill。

### 🥈 md2video-audio — Markdown 转专业视频（含语音）
**PR:** [#1703](https://github.com/anthropics/skills/pull/1703) | **状态:** Open
- **功能：** 零成本将 Markdown 文档经 Marp 转成幻灯片，并配以拟真语音合成视频（MP4）。
- **讨论热点：** 社区对“文档直接成片”的工作流兴趣浓厚，尤其在内容营销和培训材料场景中。
- **关注度：** 9 月初创建，9 月 15 日仍活跃，是最新的多媒体类 Skill 之一。

### 🥉 AWT — AI 驱动的端到端测试
**PR:** [#822](https://github.com/anthropics/skills/pull/822) | **状态:** Open
- **功能：** 基于开源工具 AI-Watch-Tester，赋予 Claude 视觉与浏览器控制能力，零代码生成并运行 E2E 测试。
- **讨论热点：** 热门关注点在于“视觉验证 + 浏览器操作”相结合，被视为 AI 原生测试工具的重要方向。
- **关注度：** 3 月创建后沉寂，9 月 19 日被重新激活，显示社区仍在持续关注。

### 🏅 document-typography — AI 生成文档排版质检
**PR:** [#514](https://github.com/anthropics/skills/pull/514) | **状态:** Open
- **功能：** 检测并修复 AI 生成文档的常见排版问题：孤行、寡行、编号错位。
- **讨论热点：** 直击“每个人都遇到过但从未有人解决”的痛点，社区共鸣度高。
- **关注度：** 3 月创建后未再更新，但需求稀缺性强，仍具较高讨论价值。

### 🏅 ODT — OpenDocument 全流程处理
**PR:** [#486](https://github.com/anthropics/skills/pull/486) | **状态:** Open
- **功能：** 创建、填写、读取并转换 .odt/.ods 文件，支持将 ODT 解析为 HTML。
- **讨论热点：** 社区关注点集中在 LibreOffice 生态兼容性与 ISO 开放格式的合规场景。
- **关注度：** 3 月创建，4 月仍有更新，是办公文档类 Skill 中最受关注的补充。

### 🏅 proofcore-contract-auditor — 智能合约审计
**PR:** [#1771](https://github.com/anthropics/skills/pull/1771) | **状态:** Open
- **功能：** 针对 Solidity 和 Rust 智能合约的自动化静态分析，并将审计证明锚定到 TON 区块链（零存储 Merkle 协议）。
- **讨论热点：** Web3 安全 + 区块链存证是新兴方向，社区对“可验证审计”的技术路线存在正向讨论。
- **关注度：** 9 月 15 日新提交，次日有更新，处于早期高活跃阶段。

### 🏅 blast-radius — 批量危险操作检查清单
**PR:** [#1776](https://github.com/anthropics/skills/pull/1776) | **状态:** Open
- **功能：** 在执行归档用户、撤销权限、批量删除、群发邮件等不可逆操作前，提供结构化的“爆炸半径”检查清单。
- **讨论热点：** 社区认可“查询正确 ≠ 操作正确”的核心观点——这类安全兜底型 Skill 极适合纳入企业级治理流程。
- **关注度：** 9 月 17 日提交，次日更新，是目前最年轻的 PR 之一。

---

## 2. 社区需求趋势

| 需求方向 | 代表 Issue | 热度（评论数） | 说明 |
|---------|-----------|:---:|------|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492) | 43 | 社区 Skills 在 anthropic/ 命名空间下造成信任滥用，是当前最尖锐的安全议题 |
| **组织级技能共享** | [#228](https://github.com/anthropics/skills/issues/228) | 16 | 企业用户强烈希望内网共享技能，避免手动分发文件 |
| **触发可靠性 / 评估无效** | [#556](https://github.com/anthropics/skills/issues/556) | 12 | run_eval.py 对任何查询都报 0% 触发率，反映官方测试工具可用性不足 |
| **上下文窗口效率** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 | claude-api 一次注入约 156k tokens，提示社区对“技能体积”的敏感度上升 |
| **Agent 治理与安全模式** | [#412](https://github.com/anthropics/skills/issues/412) | 6 | 社区提出 agent-governance 方向，包含策略执行、威胁检测、审计追踪（已关闭但讨论活跃） |

**趋势总结：** 社区已从“如何创建技能”转向“**如何安全、可信、高效地规模化使用技能**”——组织共享、权限边界和上下文成本成为新的核心诉求。

---

## 3. 高潜力待合并 Skills

以下 PR 主题明确、更新活跃，预计近期有较高合并可能：

| Skill | PR | 最后更新 | 为何值得关注 |
|-------|-----|---------|-------------|
| **blast-radius** | [#1776](https://github.com/anthropics/skills/pull/1776) | 2026-09-18 | 安全类 Skill 是官方最可能快速响应的领域，表格化检查清单设计极具实操性 |
| **proofcore-contract-auditor** | [#1771](https://github.com/anthropics/skills/pull/1771) | 2026-09-16 | 区块链审计 + 加密存证的新颖组合，补充了当前生态的 Web3 空白 |
| **md2video-audio** | [#1703](https://github.com/anthropics/skills/pull/1703) | 2026-09-15 | 文档到视频的全自动流水线，多媒体方向竞争力强 |
| **AWT (E2E 测试)** | [#822](https://github.com/anthropics/skills/pull/822) | 2026-09-19 | 9 月突然重新活跃，可能正在根据官方反馈修改，值得持续跟踪 |
| **Pyxel** | [#525](https://github.com/anthropics/skills/pull/525) | 2026-09-16 | 横跨半年的长期 PR 仍在更新，作者维护意愿明确 |

---

## 4. Skills 生态洞察

> **社区最集中的诉求不再是“更多技能”，而是让技能**更可靠地触发（#556 #1769）、更安全地分发（#492）、更省本地共享（#228）——从“技能数量”竞赛转向“**技能工程化**”是当前最大的生态信号。

---

# Claude Code 社区动态日报 — 2026-09-20

## 今日速览

昨日发布 v2.1.278，将 Claude API 及企业版用户的 auto mode 默认切换为服务端分类器（不计入 classifier 开销）。社区方面，Windows 平台 Cowork 数据写入延迟、Bash 工具转义符丢失等 bug 持续发酵，同时隐私（自动反馈框）与本地网络权限问题引发关注。

---

## 版本发布

### v2.1.278
- **核心变更**：Claude API 和企业版用户，以及 Bedrock、Vertex、Foundry 及网关的 auto mode 默认改用服务端分类器，不再对 classifier 开销单独计费。可通过 `CLAUDE_CODE_AUTO_MODE_SERVER=0` 在 Bedrock/Vertex/Foundry/网关中退出该行为，并会触发警告。
- 对用户影响：默认行为更省成本，但需要服务端支持；自定义环境需关注兼容性。

---

## 社区热点 Issues（Top 10）

### 1. Cowork 文件写入静默滞后 — 磁盘内容落后一次提交（Windows）
[#93482](https://github.com/anthropics/claude-code/issues/93482) · 评论 8 · 👍 0  
`device_commit_files` 报告覆盖成功，但磁盘内容总是滞后一个提交，mtime 却是新的——典型的静默数据丢失隐患。Windows 平台、可复现，社区关注度高。

### 2. 远程控制：陈旧环境无法删除，幽灵会话导致永久 404
[#77372](https://github.com/anthropics/claude-code/issues/77372) · 评论 7 · 👍 2  
新注册的环境在下次启动时也出现 404，会话创建后无法在 worker-attach 中找到。影响远程使用场景的可靠性。

### 3. Bash 工具静默折叠 `\\` 为 `\`，破坏正则与路径
[#88561](https://github.com/anthropics/claude-code/issues/88561) · 评论 6 · 👍 2  
在单引号、双引号甚至 heredoc 内，`\\` 都在 shell 解析前被意外折叠。直接违反 POSIX 引号语义，影响 Windows 用户的路径和正则表达式。

### 4. Linux 下 Write/Edit 工具静默解码 `\uXXXX`，破坏转义文本
[#72957](https://github.com/anthropics/claude-code/issues/72957) · 评论 3 · 👍 0  
文件内容中的 `\uXXXX` 被当作 JSON 转义解码后写入磁盘，导致无法通过工具存储字面转义序列。

### 5. Bash 权限规则：字面 `*` 被重解释为通配符
[#95614](https://github.com/anthropics/claude-code/issues/95614) · 评论 2 · 👍 0（今日新提交）  
允许规则中的字面 `*`（如 grep 正则 `"onclick.*Tab"`）在回放时被当作通配符，可能意外放行不应允许的命令——安全风险。

### 6. 自动草拟反馈框可一键泄漏会话内容（macOS）
[#92649](https://github.com/anthropics/claude-code/issues/92649) · 评论 2 · 👍 0  
被动自动草拟的反馈框默认开启，无 opt-in、无确认，单次按键即可将私有会话内容发送出去。隐私敏感用户需立即关注。

### 7. macOS 本地网络权限因 Mach-O UUID 碰撞被静默拒绝
[#95444](https://github.com/anthropics/claude-code/issues/95444) · 评论 1（今日活跃）  
CLI 与 "Claude Code URL Handler.app" 的 Mach-O UUID 冲突，导致 macOS 本地网络权限被静默拒绝。影响网络相关功能。

### 8. Windows：一个损坏的 MCP 服务器条目拖垮所有冷启动
[#86756](https://github.com/anthropics/claude-code/issues/86756) · 评论 2 · 👍 0  
`claude_desktop_config.json` 中一个损坏的 MCP 条目（如错误的 ollama 配置）会导致每次冷启动会话直接失败、worker 退出。应优雅降级而非全盘失败。

### 9. Desktop 高 CPU：WindowServer 47% 持续占用（macOS）
[#94003](https://github.com/anthropics/claude-code/issues/94003) · 评论 3 · 👍 0  
响应流式输出时 WindowServer 持续 ~47% CPU，Core Animation 层树被以 120Hz 频率反复遍历。桌面端性能明显异常。

### 10. Desktop 伪造用户消息 + 泄漏 system-reminder（macOS）
[#93749](https://github.com/anthropics/claude-code/issues/93749) · 评论 1（今日更新）  
桌面应用中重现伪造用户轮次并在 assistant 消息中泄漏 system-reminder 的问题，与 #81855 / #79293 同源，仍未修复。多轮跟踪中。

---

## 重要 PR 进展

当前仅 1 条 PR 在过去 24 小时内有更新：

### #95587 — diff 面板行为统一
[PR #95587](https://github.com/anthropics/claude-code/pull/95587) · 作者 @poteat · 创建 2026-09-19  
修复 diff 模式与内置面板在三处行为差异：会话恢复时若有既有编辑则自动打开 diff 面板（与内置面板恢复历史行为一致）；`/clear` 后不再残留面板；会话行起始状态跟随引擎状态。

---

## 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **会话管理体验**：MRU 顺序切换会话（#93666）、快速标记会话完成（#95294）、/resume 仅加载 50 条的限制（#87392）——用户希望更灵活、更高效的会话组织。
2. **IDE 集成细化**：VS Code 扩展模型选择持久化（#75912）、diff 面板自动打开的干扰（#84542）——深度集成后的细节打磨成为焦点。
3. **模型与子代理选择**：Fable 子代理的模型选择提示（#76379）、状态栏新增 auth 方式字段（#95598）——透明度和可控性需求上升。
4. **反馈机制**：查看/跟踪已提交反馈（#92520）、反馈框隐私问题（#92649）——反馈功能正在被更多用户审视。
5. **安全与权限**：Bash 通配符重解释（#95614）、Mac 本地网络权限（#95444）——权限系统的可预测性和最小权限原则是刚需。

---

## 开发者关注点

- **Windows 平台问题密集**：Cowork 数据滞后（#93482）、Bash 转义折叠（#88561）、MCP 冷启动崩溃（#86756）、Enter 键行为回归（#93239）、Skill 描述丢失（#95582）均与 Windows 相关——平台稳定性亟待加强。
- **静默数据损坏类 bug 优先级高**：Write/Edit 的 `\uXXXX` 解码（#72957）和 Cowork 写入滞后（#93482）都是“报告成功但内容错误”的静默故障，对开发者信任影响最大。
- **隐私与权限透明度**：自动反馈框的潜在泄漏（#92649）和 MAC 本地网络被静默拒绝（#95444）都涉及“用户不知情的行为”，社区对此类问题反应强烈。
- **性能退化**：macOS 桌面端 WindowServer 高 CPU（#94003）和远程控制 404 问题（#77372）直接影响日常使用体验，是高频投诉点。
- **文档滞后**：多组已修复的 v2.1.205 行为变更（agent-view、MCP 导入、插件 LSP 等）在官方文档中仍未更新（#75875–#75883 系列），社区中有系统性反馈文档维护滞后的问题。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-20）

> 数据来源：github.com/openai/codex | 本期覆盖时间：2026-09-19 ~ 2026-09-20

## 今日速览

今日 Codex 仓库发布了 4 个 `rust-v0.156.0-alpha` 系列迭代版本，继续保持高频 alpha 节奏；PR 侧有超过 20 个 TUI（终端界面）相关的合并，集中在 transcript（对话记录）浏览、搜索、复制与界面样式统一上。社区争议焦点仍是浏览器安全策略误杀、Windows 桌面稳定性与模型容量限制问题。

---

## 版本发布

过去 24 小时内发布了以下预发布版本（均为 Rust  crate 版本，未附带详细变更说明）：

- **rust-v0.156.0-alpha.9**：https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.9
- **rust-v0.156.0-alpha.8**：https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.8
- **rust-v0.156.0-alpha.7**：https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.7
- **rust-v0.156.0-alpha.6**：https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.6

> 注：发布说明仅有版本号，无具体更新内容，社区暂无法得知这些 alpha 版本的具体变更。

---

## 社区热点 Issues

以下为过去 24 小时内更新最活跃、社区关注度最高的 10 个 Issue：

### 1. 账户级容量错误：周配额可用但仍报容量不足
[#43337](https://github.com/openai/codex/issues/43337) — 评论 56 | 👍 5

ChatGPT Pro 20x 用户反馈，尽管每周配额完全可用，CLI 仍对所有 Codex 模型返回“容量不足”错误。该问题在 macOS 和 Linux 上均可复现，涉及 `gpt-6-astra` 和 `gpt-5.6-luna`。这是当前最热 Issue，说明配额计算或服务端容量控制逻辑存在缺陷。

### 2. Windows 浏览器控制不支持 API Key 认证
[#43410](https://github.com/openai/codex/issues/43410) — 评论 41 | 👍 17

Windows 上通过 Edge 插件使用浏览器控制时，API Key 认证模式会报 `unsupported Codex auth method: apikey`。点赞数 17 是本期最高，表明大量 API Key 用户受此影响。

### 3. Windows 桌面版 GPT-6 Astra 模型缺失
[#42853](https://github.com/openai/codex/issues/42853) — 评论 33 | 👍 5

Windows 桌面应用（`26.901.4073.0`）的模型选择器中缺少 GPT-6 Astra，即使账号为 ChatGPT Pro 也无法选择。反映出 Windows 版模型推送落后于其他平台。

### 4. Chrome 插件与浏览器/电脑使用功能误拦截合法网站
[#29343](https://github.com/openai/codex/issues/29343) — 评论 30 | 👍 12

Chrome 插件会静默拒绝加载某些网站，且无明确原因提示。该 Issue 已持续 3 个月仍在更新，是本期内最受关注的安全策略误杀案例。

### 5. Windows 桌面更新后本地项目消失
[#42739](https://github.com/openai/codex/issues/42739) — 评论 17

更新 Codex Windows 桌面应用后，“项目”列表变为空，但源文件夹和最近对话仍在。疑似应用更新导致项目索引损坏。

### 6. 桌面恢复会话时崩溃：不支持的 `thread_tools` 特性
[#29361](https://github.com/openai/codex/issues/29361) — 评论 8

macOS 桌面版在打开/恢复线程时反复崩溃（SIGKILL），根因是桌面端发送了捆绑 CLI 不支持的 `thread_tools` feature override。属于前后端版本不匹配问题。

### 7. Windows 浏览器/电脑使用功能初始化失败
[#44500](https://github.com/openai/codex/issues/44500) — 评论 7 | 👍 3

Windows 上 Browser Use 和 Computer Use 初始化时报 `nodeRepl.fetch request failed`，两个核心 Agent 功能在 Windows 上均不可用。

### 8. Intel Mac 缺少 Computer Use “Any App” 模式
[#44878](https://github.com/openai/codex/issues/44878) — 评论 6

Intel Mac（x86_64）上 Computer Use 的设置中没有 “Any App” 选项，托管服务无法启动。目前仅 Apple Silicon 支持完整功能。

### 9. Windows 上 `cua_node` EPERM 循环导致 UI 冻结、内存耗尽
[#42484](https://github.com/openai/codex/issues/42484) — 评论 6

Windows 上 `cua_node` 的 `rename_staging` 陷入 EPERM 无限循环，导致桌面 UI 完全冻结，内存占用高达约 59 GB。属于严重的 Windows 稳定性问题。

### 10. 所选模型持续容量不足
[#43688](https://github.com/openai/codex/issues/43688) — 评论 6 | 👍 6

在 macOS 和 Windows 上，所选模型持续报“容量不足”，即使用户的配额显示可用。与 #43337 高度相关，可能为同一服务端问题。

---

## 重要 PR 进展

过去 24 小时内共有 31 个 PR 更新，本期几乎所有 PR 均由 `copyberry[bot]` 提交，核心围绕 TUI 的 **transcript（记录）系统重构与界面统一**。以下为 10 个关键 PR：

### 1. 为 TUI 添加 compact transcript 浏览与提示词导航
[#46739](https://github.com/openai/codex/pull/46739)

双击 `Esc` 进入紧凑模式，支持左右箭头选择提示词、上下滚动、`Ctrl+T` 切换详情、`Enter` 回退到指定提示词。大幅增强终端内历史记录回溯能力。

### 2. 为 TUI 添加 transcript 搜索与活动详情控制
[#46734](https://github.com/openai/codex/pull/46734)

新增增量搜索（`F3` 或 `/` 唤起），可跨完整历史匹配，支持前后导航，且关闭搜索后恢复原阅读位置。

### 3. 将交互式 transcript 集成到 alternate-screen TUI
[#46733](https://github.com/openai/codex/pull/46733)

在 `features.transcript_v2` 开启时，历史输出和实时输出会渲染在输入框上方，支持滚动、选择、复制、链接打开和分页加载。

### 4. 为 transcript 查看器添加选择与复制功能
[#46732](https://github.com/openai/codex/pull/46732)

支持鼠标选择、单词/行选择、拖拽自动滚动、`Ctrl+Space` 键盘选择、复制选中文本，以及修改键点击打开链接。

### 5. 在 TUI 中渲染动态工具活动并保持历史排序
[#46731](https://github.com/openai/codex/pull/46731)

修复了动态工具项（如进行中的命令）在历史回放和实时输出中不一致的问题，并保证并发工具完成时保持正确顺序。

### 6. 恢复持久化 TUI transcript 中的富工具详情
[#46710](https://github.com/openai/codex/pull/46710)

此前加载历史记录时，工具调用和文件变更会被降级为简单的状态摘要。该 PR 恢复了对命令、MCP 调用、补丁等完整详情展示。

### 7. 在 recorder 容量压力下恢复已执行工具调用的元数据
[#46712](https://github.com/openai/codex/pull/46712)

修复了孤儿输出映射和未完成任务导致 recorder 容量耗尽、进而阻止新工具调用附加元数据的问题。属于内存管理层面的修复。

### 8. 在 TUI 换行时保留逻辑源文本与样式
[#46708](https://github.com/openai/codex/pull/46708)

显示换行会丢失空白并添加 gutter，导致渲染行无法可靠反映原始文本。该 PR 保证逻辑源文本、样式和超链接元数据在换行后不丢失。

### 9. 统一 TUI picker 样式并改进紧凑会话布局
[#46697](https://github.com/openai/codex/pull/46697)

移除旧的 selection-list 外观，全面使用统一的宽选择样式、填充标签、多行提示与独立溢出行。同时改进 resume/fork picker 的工具栏与搜索行布局。

### 10. 将 transcript 滚动锚定到条目并限制视口渲染
[#46721](https://github.com/openai/codex/pull/46721)

将基于行偏移的滚动改为基于条目锚定，避免分页、流式输出和窗口 resize 时内容变化导致滚动位置漂移，并限制离屏内容的渲染开销。

---

## 功能需求趋势

从近期 Issue 和 PR 中可提炼出以下社区最关注的功能方向：

### 1. 浏览器安全策略的精细化控制（最突出）
- 至少 10 个 Issue 涉及安全策略误杀合法网站，包括：微信公众号文章（#34118）、视频号管理页（#35549）、淘宝（#44943）、1688.com（#45346）、pixiv（#42932）、Naver Blog（#43241）、campus.163.com（#40354）、企业微信文档（#34006）、以及其他被阻止网站（#40123）。
- 核心诉求：即使用户显式授权，浏览器操作仍可能被静默阻断，且无恢复提示。

### 2. 配额与容量系统的透明化
- 多个 Issue（#43337、#43688、#28303）反映“配额可用但模型容量不足”的矛盾现象。
- 社区希望获得清晰的容量状态展示和更好的错误提示。

### 3. Windows 平台的一等公民支持
- 高频问题集中在 Windows 专属 bug：模型缺失（#42853）、浏览器控制认证失败（#43410）、EPERM 文件锁死循环（#42484）、项目索引丢失（#42739）、桌面崩溃（#36574）。
- Windows 用户体验明显落后于 macOS。

### 4. TUI/终端体验增强
- 从 PR 来看，TUI transcript 系统正在经历大规模重构：搜索、选择、复制、分页、样式统一等。
- 社区对终端内历史记录浏览有强烈需求。

### 5. 认证方式的扩展
- #43410 显示 API Key 用户无法使用浏览器控制能力，社区期望 API Key 能获得与 ChatGPT 账号同等的功能权限。

---

## 开发者关注点

综合以上数据，开发者反馈中的高频痛点如下：

- **安全策略过于激进且不透明**：误杀国内平台（微信、淘宝、1688、Naver 等）频率极高，且“允许列表”形同虚设，是当前最大的信任危机。
- **模型容量错误频繁**：配额显示可用但无法使用，严重干扰开发流程，且跨 macOS/Windows 普遍存在。
- **Windows 稳定性问题突出**：包括文件系统级 EPERM 死循环导致的内存耗尽（59GB）、桌面端崩溃、项目索引丢失等，说明 Windows 版本质量尚未达到生产标准。
- **版本碎片化**：桌面应用和 CLI 的捆绑版本不一致（如 `0.153.x` 与 `0.156-alpha` 系列并行），`thread_tools` 等特性不匹配导致崩溃（#29361）。
- **平台功能不对等**：Intel Mac 和 Windows 用户无法使用部分 Computer Use / 模型功能，而 Apple Silicon 和 macOS 总是优先获得完整能力。

---

*本日报由 GitHub 公开数据自动汇总生成，仅供技术交流参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-20）

## 今日速览

- 发布 v0.62.0-nightly.20260920.gcfbcaa8df 夜间版本
- AST 感知代码导航正式进入 PR 阶段（#29396），而检查点损坏校验（#29292）与 `resume latest` 定位错误（#29411）等两个影响日常使用的 Bug 均已有修复补丁
- 本地/离线模型支持（#5938）仍是社区呼声最高的功能需求，获 37 👍

## 版本发布

**v0.62.0-nightly.20260920.gcfbcaa8df**：仅发布 nightly 标签，完整变更日志见 [compare/v0.62.0-nightly.20260919...20260920](https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260919.gcfbcaa8df...v0.62.0-nightly.20260920.gcfbcaa8df)。

## 社区热点 Issues

### 1. 本地/离线模型支持（Ollama、LM Studio 等）— #5938
企业离线推理需求，数据隐私严格的组织无法使用云 AI 服务。评论 13 条、👍 37，是目前社区最强烈的功能诉求。
https://github.com/google-gemini/gemini-cli/issues/5938

### 2. 子代理 MAX_TURNS 被误报为 GOAL 成功 — #22323
`codebase_investigator` 子代理在达到最大轮次限制（未做任何分析）后仍报告 `success`，中断被隐藏，影响代理健康状态判断。P1 严重度，机器人已标记需重测。
https://github.com/google-gemini/gemini-cli/issues/22323

### 3. 通用代理（Generalist agent）无限挂起 — #21409
用户反映创建文件夹这类简单变更也会卡死，等待一小时后只能手动取消；显式禁用子代理可绕过。P1 高优问题，社区 8 👍。
https://github.com/google-gemini/gemini-cli/issues/21409

### 4. 畸形检查点导致 `/resume` 崩溃 — #29194
合法 JSON 但 `history` 为非数组（`null`、`123`）的检查点文件绕过校验，触发原始 `TypeError`。已由 PR #29292 提供校验修复。
https://github.com/google-gemini/gemini-cli/issues/29194

### 5. `resume latest` 打开最近启动而非最近活跃的会话 — #29410
长期主会话 + 新 spike 会话时，裸 `--resume` 落到过期会话导致后续对话错位。用户已提交 PR #29411，社区响应积极。
https://github.com/google-gemini/gemini-cli/issues/29410

### 6. Auto Memory 日志与编辑存在隐私隐患 — #26525
P2 安全 Bug：Auto Memory 将转录内容发送给模型后才提示编辑，且服务可能记录现有技能。需要确定性编辑并减少日志输出。
https://github.com/google-gemini/gemini-cli/issues/26525

### 7. 编辑工具 CLI 输出与实际文件变更不一致 — #25783
Edit 工具在终端显示改动通过，但 GitHub 上实际文件未变化，严重影响用户对工具的信任。已被关闭，但值得关注后续修复回归。
https://github.com/google-gemini/gemini-cli/issues/25783

### 8. 工具超过 128 个时报 400 错误 — #24246
当启用工具数量超过 128（甚至 400）时 Gemini CLI 直接报 400，社区期望按启用范围自动裁剪工具集。
https://github.com/google-gemini/gemini-cli/issues/24246

### 9. 浏览器子代理在 Wayland 环境下失败 — #21983
`Termination Reason: GOAL` 但实际未完成任务，Wayland 下浏览器子代理不可用，影响 Linux 桌面用户。P1。
https://github.com/google-gemini/gemini-cli/issues/21983

### 10. AST 感知文件读取/搜索/映射评估 EPIC — #22745
探索 AST 感知工具实现精确方法边界读取、减少 token 噪音、改进 codebase investigator。对应 PR #29396 今日已进入提交阶段。
https://github.com/google-gemini/gemini-cli/issues/22745

## 重要 PR 进展

### 1. feat(agent): AST 感知结构化搜索工具 — #29396（size/xl）
实现 #22745 的核心部分：基于轻量 AST 分析的 `ast_search` 工具，支持符号级导航而非猜测行号或整文件读取，大幅降低 token 开销。
https://github.com/google-gemini/gemini-cli/pull/29396

### 2. fix(checkpoint): 校验 history 为数组 — #29292（size/s）
针对 #29194，在 `loadCheckpoint` 中对 `history` 字段做类型校验，避免 `/resume` 崩溃，用户已手动验证。
https://github.com/google-gemini/gemini-cli/pull/29292

### 3. fix(config): 阻止重写显式锁定的 flash 模型 — #29222（size/s）
修复 `--model gemini-2.5-flash` 在 Vertex 等后端被静默改写为 `gemini-3.5-flash` 导致无访问权限报错的问题。
https://github.com/google-gemini/gemini-cli/pull/29222

### 4. fix(cli): 持久化状态写入失败安全 — #29402（size/m）
采用唯一临时文件 + `fsync` + 原子重命名，防止中断的保存清空 `state.json`，为状态管理提供崩溃安全保证。
https://github.com/google-gemini/gemini-cli/pull/29402

### 5. fix

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-20

## 今日速览

过去 24 小时无新版本发布、无 PR 合并或更新；社区讨论集中在新出现的 MCP 服务器兼容性问题（#4870）、长会话 OOM 崩溃（#4699）以及桌面端会话意外中断（#4905）上。同时，多个历史 issue 于 9 月 19 日集中关闭，表明维护团队正在进行一轮系统性清理。

## 社区热点 Issues（10 个）

过去 24 小时内共更新 48 条 Issue，以下为最值得关注的 10 条：

1. **[Figma MCP 服务器工具注册失败，CLI 将 -32601 错误作为致命错误处理](https://github.com/github/copilot-cli/issues/4870)**
   - 状态：Open（triage）| 评论：7 | 👍：11
   - 该远端 MCP 服务器在 VS Code 中工作正常，但在 CLI 中因 `server/discover` 探针返回 `-32601`（方法不存在）即被标记为失败，导致工具未被注册。反映了 MCP 服务器发现机制的健壮性问题。

2. **[长 `--resume` 会话触发 V8 堆 OOM 崩溃，诊断文件写入用户 cwd](https://github.com/github/copilot-cli/issues/4699)**
   - 状态：Open | 评论：5 | 👍：6
   - 1.0.82 版本在 14 小时内崩溃 3 次，每次均在 4 GiB 堆上限；且 Node 诊断报告被写入 cwd，可能污染工作目录。涉及会话恢复、内存管理与文件系统副作用三个层面。

3. **[WSL2 + Windows Terminal 下 TUI 中途白屏、输入死锁，Ctrl+C 无效](https://github.com/github/copilot-cli/issues/4069)**
   - 状态：Closed | 评论：8 | 👍：9
   - 活跃会话中 stdout 出现 EIO、Rust JSON-RPC 传输层出现 EPIPE，界面完全卡死。该问题已关闭但没有附修复版本，仍需观察是否在 1.0.70+ 中解决。

4. **[Alpine Linux 上任何工具调用即触发段错误](https://github.com/github/copilot-cli/issues/107)**
   - 状态：Closed | 评论：16 | 👍：4
   - 一个跨越近一年的老问题，在 0.0.328 版本中容器场景下必现，最近于 9 月 19 日关闭。作为评论数最高的问题之一，值得确认最终修复方式。

5. **[Rewind 在非 git 仓库中不可用（要求使用 jj 等其他 VCS）](https://github.com/github/copilot-cli/issues/1381)**
   - 状态：Closed | 评论：5 | 👍：11
   - 用户使用 jj 作为版本控制，Rewind 被硬性绑定到 git。VS Code 版 Copilot 无此限制。社区对 VCS 中立性有较高诉求，现已关闭。

6. **[自动模型选择：希望 CLI 支持按成本/效果智能选择模型](https://github.com/github/copilot-cli/issues/1801)**
   - 状态：Closed | 评论：2 | 👍：10
   - 对标 VS Code 中的模型托管选项，社区希望 CLI 也能自动选择最合适、最具成本效益的模型。虽已关闭，但需求具有一定代表性。

7. **[多个 sessionStart/subagentStart hook 同时输出 additionalContext 时仅最后一个生效](https://github.com/github/copilot-cli/issues/3589)**
   - 状态：Open | 评论：2 | 👍：2
   - 插件/自定义 hook 场景下，多个 `additionalContext` 输出会互相覆盖而非合并，导致上下文注入缺失。该 issue 在今天（9 月 20 日）仍有更新，说明问题已得到维护者注意。

8. **[桌面端 App 会话数分钟后即死亡：凭据注册失效导致 github-mcp-server 目录过期](https://github.com/github/copilot-cli/issues/4905)**
   - 状态：Open（triage）| 评论：4 | 👍：2
   - 桌面 App 1.1.22 内置 CLI（1.0.84-5）的会话会在启动数分钟后失效，表现为 "GitHub credential registration is no longer available for this session"，进而令 github-mcp-server 的目录服务不可用。属较新的高优问题。

9. **[Linux 终端中文本选择导致视口偏移，footer 显示过期的 copy_on_select](https://github.com/github/copilot-cli/issues/4913)**
   - 状态：Open（triage）| 评论：1 | 👍：0
   - Ghostty + tmux 场景下，鼠标选择会移动 transcript 和 composer 一行，双选单词时可能跨行扩展选区。最新 bug，影响终端选择交互。

10. **[Claude Opus 4.6 上下文被限制在 200K，尽管模型原生支持 1M token](https://github.com/github/copilot-cli/issues/3355)**
    - 状态：Closed | 评论：4 | 👍：4
    - 上下文窗口缩水 80%，导致深度技术会话频繁触发自动压缩。涉及模型能力利用与 context management 策略，近期关闭。

## 重要 PR 进展

过去 24 小时无 Pull Request 更新或合并。请关注后续版本发布以获取代码层面的变更。

## 功能需求趋势

根据近 24 小时更新的全部 Issue，社区关注的功能方向可归纳为：

- **MCP 服务器兼容性与生命周期管理**（#4870、#4905、#4907、#2892）：MCP 服务器发现、重连机制、子代理场景下的传输稳定性成为高频主题，且至少有两个 triage 状态的新 issue 与此相关。
- **模型能力与上下文窗口的充分释放**（#3355、#3481、#1801、#3523）：用户希望 CLI 能利用更大的上下文窗口（1M）、正确应用 long_context 配置，并支持自动模型选择，以降低 token 成本和减少手动配置。
- **上下文注入机制的可组合性**（#3589、#1423、#3621）：多个来源的 additionalContext、路径级自定义指令、大指令文件等场景，暴露出上下文被意外覆盖、膨胀或触发无限压缩等行为。
- **终端渲染与交互可达性**（#4913、#3005、#3411、#3439）：包括鼠标选择视口偏移、屏幕阅读器反馈缺失、提示音控制、tmux/mintty 渲染回归等，反映 TUI 在多样终端环境下的适配压力。
- **非 git 工作流支持**（#1381）：对 jj 等其他 VCS 的支持诉求，表明 CLI 不应与 git 强绑定。

## 开发者关注点

- **MCP 生态对接的可靠性**：多个 issue 指向 CLI 与远程/本地 MCP 服务器之间的协议兼容性不足，尤其是对错误码的处理与重连策略，容易导致工具静默不可用。
- **长会话稳定性仍是最大痛点**：OOM 崩溃（4 GiB 堆上限）、会话状态损坏、凭据认证失效，严重影响长时间 coding agent 场景的可信度。
- **上下文管理行为不透明且难以控制**：200K 上下文硬上限、自动压缩无限循环、additionalContext 丢失或冲突，开发者希望更明确的可配置性和可视化反馈。
- **环境兼容性欠账**：Alpine/musl 的段错误、WSL2 下的终端卡死、Windows/mintty 的渲染性能回退等平台相关问题仍需系统性解决。
- **安全与数据完整性问题**：[checkpoint restore 执行 git clean -fd 会永久删除未跟踪文件](https://github.com/github/copilot-cli/issues/1675)、OOM 诊断文件写入 cwd，这些行为存在数据丢失风险，开发者期待更安全的默认策略。

> 注：本期版本发布与 PR 部分为空，日报聚焦于 Issue 动态与社区趋势。数据时间窗口：2026-09-19 至 2026-09-20。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-09-20

## 今日速览

昨日社区动态集中在历史遗留的连接错误（HTTP header 非法字符）问题批量关闭，同时一个新的 OpenCode Go 集成 Bug（#2653）浮出水面。此外，@he-yufeng 提交的 5 个 PR 均有更新，覆盖图片粘贴、非 UTF-8 输出、Windows 版本信息及 Shell 超时等多项修复。

## 社区热点 Issues

### 新开放 Issue

- **[#2653] [Bug] OpenCode Go 返回 400，缺少 x-opencode-session header**（OPEN）
  作者: @lcthe | 创建/更新: 2026-09-19 | 评论: 0 | 👍: 0
  该问题描述在使用 OpenCode Go 作为 Provider 时，请求因缺少 `x-opencode-session` header 而被拒绝。这是昨日唯一新开放的 Issue，同时涉及 Windows 平台，值得关注。
  🔗 https://github.com/MoonshotAI/kimi-cli/issues/2653

### 已关闭的连接错误系列（批量修复）

这批 Issue 均于 2026-09-19 被关闭，核心原因是 `platform.version()` 返回的字符串被拼接进 HTTP header，触发非法字符校验错误。

- **[#1266] HTTP header 校验错误：platform.version() 尾部空格导致连接失败**（CLOSED）
  作者: @asamawi | 创建: 2026-02-27 | 评论: 2 | 👍: 2
  最受关注的历史 Bug，影响 kimi-cli 1.15.0 + Python 3.13.12 + Ubuntu。尾部空白字符破坏了 HTTP header 合法性。
  🔗 https://github.com/MoonshotAI/kimi-cli/issues/1266

- **[#1364] Ubuntu 下非法 HTTP header 值导致连接错误**（CLOSED）
  作者: @laserwang | 创建: 2026-03-08 | 评论: 1
  影响版本 1.17.0，Ubuntu 22.04 环境，`kimi chat` 报 “Connection error”。
  🔗 https://github.com/MoonshotAI/kimi-cli/issues/1364

- **[#1368] Linux 下 platform.version() 含 # 字符导致连接错误**（CLOSED）
  作者: @chenyuchen993-cmyk | 创建: 2026-03-09 | 评论: 1
  同样是 1.17.0，`#` 在 HTTP header 中非法。
  🔗 https://github.com/MoonshotAI/kimi-cli/issues/1368

- **[#1371] LLM provider error: Connection error（IPv6 相关）**（CLOSED）
  作者: @liushuo1024 | 创建: 2026-03-09 | 评论: 1
  影响版本 1.17.0，问题描述中提及 IPv6 连接异常，推测与网络栈有关。
  🔗 https://github.com/MoonshotAI/kimi-cli/issues/1371

### 功能与计费

- **[#1442] 发票开具入口缺失**（CLOSED）
  作者: @abcair | 创建: 2026-03-15 | 评论: 2
  社区用户询问如何开票，界面中无发票窗口入口。属于企业用户高频需求。
  🔗 https://github.com/MoonshotAI/kimi-cli/issues/1442

- **[#1495] [增强] VSCode 扩展：可配置 Plan Mode 计划保存位置**（CLOSED）
  作者: @paomian | 创建: 2026-03-18 | 评论: 0
  请求在 `~/.kimi/config.toml` 中增加 `[paths] plans_dir` 配置，以自定义 Plan 文件输出目录，体现社区在 IDE 工作流精细化上的诉求。
  🔗 https://github.com/MoonshotAI/kimi-cli/issues/1495

## 重要 PR 进展

昨日更新的 5 个 PR 全部来自 @he-yufeng，覆盖 Shell、Windows 构建与 MCP 可靠性。

- **[#2183] [OPEN] fix(shell): 提前附加拖拽的图片路径**
  创建: 2026-05-07 | 更新: 2026-09-19
  提交 prompt 时，自动扫描用户文本中的本地图片路径，若模型支持图片输入则立即读取并转为 `ImageURLPart`，避免后续 `ReadMediaFile` 因路径失效而无法加载图片。修复 #2182。
  🔗 https://github.com/MoonshotAI/kimi-cli/pull/2183

- **[#2350] [OPEN] fix: 兼容非 UTF-8 的 worker 输出**
  创建: 2026-05-23 | 更新: 2026-09-19
  Web 会话运行器原先以严格 UTF-8 解码 worker stdout，在 Windows 上遇到 cp1252 字节时抛 `UnicodeDecodeError`，掩盖真实故障原因。此 PR 改为容错解码。修复 #2313。
  🔗 https://github.com/MoonshotAI/kimi-cli/pull/2350

- **[#2181] [CLOSED] fix: 为 Windows 二进制添加版本信息**
  创建: 2026-05-07 | 更新: 2026-09-19
  生成 PyInstaller 的 Windows version-info 文件，并注入 one-file 与 one-dir 构建产物，添加 CI 校验确保 `FileVersionInfo` 非空。修复 #2178。
  🔗 https://github.com/MoonshotAI/kimi-cli/pull/2181

- **[#2200] [CLOSED] fix(shell): 为长命令自适应调整超时**
  创建: 2026-05-08 | 更新: 2026-09-19
  自动延长 git submodule 清理、clone/fetch、包安装、构建等耗时命令的超时时间；普通命令维持 60s 默认值；调用方显式超时则保留原设置。
  🔗 https://github.com/MoonshotAI/kimi-cli/pull/2200

- **[#2259] [CLOSED] fix: 将 stdio MCP 的 stderr 重定向至日志**
  创建: 2026-05-13 | 更新: 2026-09-19
  将 stdio 型 MCP 子进程 stderr 写入 `~/.kimi/logs/mcp/<server>.log`，避免污染交互终端；非 stdio MCP 仍走原有配置路径，并补充了日志路径清理的回归测试。
  🔗 https://github.com/MoonshotAI/kimi-cli/pull/2259

## 功能需求趋势

- **跨平台稳定性**：多个 Linux/Ubuntu 连接错误指向同一个根因——`platform.version()` 未清洗就拼接进 HTTP header。这是过去半年最集中的技术债，如今得到批量清理。
- **IDE 工作流集成**：社区希望 VSCode 扩展具备更细粒度的配置能力，例如自定义 Plan 文件目录（#1495），表明 Plan Mode 在 IDE 场景中的使用已进入“可配置化”阶段。
- **新 Provider 兼容**：#2653 显示用户开始尝试将 OpenCode Go 作为后端 Provider，其对 protocol header 的严格要求未被当前 CLI 满足，预示多 Provider 适配仍是持续演进方向。
- **企业计费能力**：发票问题（#1442）虽已关闭，但反映出付费用户对财务流程工具链的明确需求，未来可能需要更正式的企业服务支持。

## 开发者关注点

- **HTTP header 生成逻辑需更健壮**：`platform.version()` 中的尾随空格、`#` 等字符均会摧毁请求合法性。开发者可关注相关修复是否会合入下一版本，并在自己的环境中验证。
- **Windows 编码坑仍在**：子进程输出非 UTF-8 导致的 `UnicodeDecodeError` 容易混淆故障分析，PR #2350 的合入将显著改善 Windows 下的可诊断性。
- **Shell 超时策略优化**：长命令（尤其是 git 与构建工具）此前固定 60s 超时，容易误杀；PR #2200 的改进方向对 CI/自动化脚本尤其实用。
- **MCP 调试体验**：stdio MCP stderr 与终端输出混流会干扰交互，PR #2259 将 stderr 归档到日志文件，这条链路值得跟进验证。

---
*本日报基于 GitHub 公开数据自动生成，数据采集时间截至 2026-09-19。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-20

## 今日速览

过去 24 小时无新版本发布。社区讨论焦点集中在**会话管理与可靠性**（重复消息、会话命名、subagent 崩溃）与**远程/网络访问能力**（ACP over WebSocket 获 9 个 👍 为最高呼声）；PR 侧则有多个涉及 CLI 非交互模式、TUI 细节与生态集成的改进。跨平台（Windows/macOS）兼容性问题依旧是开发者反馈的密集区。

---

## 社区热点 Issues

### 1. ACP over WebSocket for remote/network access ⭐ 社区最高赞
- **#13388** | 👍 9 | 💬 9 | 已关闭
- 请求通过 WebSocket 暴露 Agent Client Protocol（ACP），使编辑器/客户端可从另一台主机远程使用 OpenCode。9 个 👍 为今日最高，表明远程/网络访问是社区当前最迫切的能力空缺。
- https://github.com/anomalyco/opencode/issues/13388

### 2. OpenCode Desktop 会话名称偶发不被 AI 重命名
- **#13710** | 👍 2 | 💬 11（今日评论最多）| 已关闭
- 部分会话仍为 `New session - 2026-02-15T09:48:58.885Z` 格式，最新版本中该问题间歇性复现。评论数居首显示桌面端用户体验受此影响较大。
- https://github.com/anomalyco/opencode/issues/13710

### 3. Agent 发送重复消息
- **#20699** | 👍 1 | 💬 7 | 已关闭
- 用户发送 "hello!" 时，agent 产生两条 assistant 响应：一条隐藏但含问候文本，另一条显示但仅含 "I've already..." 的 reasoning。此问题直接损害对话体验，影响核心链路。
- https://github.com/anomalyco/opencode/issues/20699

### 4. Anthropic 原生 provider 嵌套数组参数触发 SchemaError
- **#34652** | 👍 0 | 💬 6 | 已关闭
- `todowrite` 等内置工具在 Anthropic 模型将嵌套参数以 JSON 字符串返回时，抛出硬性 SchemaError；OpenAI 等其他 provider 不受影响。属于特定 provider 兼容性缺陷，影响使用 Anthropic 模型的用户。
- https://github.com/anomalyco/opencode/issues/34652

### 5. MaxListenersExceededWarning 内存泄漏提示
- **#35499** | 👍 2 | 💬 4 | 已关闭
- 运行 `opencode web --mdns` 一段时间后出现 11 个事件监听器累积的警告，疑似内存泄漏。对长驻 Web 服务场景有稳定性隐患。
- https://github.com/anomalyco/opencode/issues/35499

### 6. 请求：根据首条消息内容自动命名会话
- **#38163** | 👍 1 | 💬 3 | 已关闭
- 新会话统一显示 "Nowa sesja"/"New session"，会话多了之后难以区分。社区希望从首条用户消息中自动生成会话名，与 #13710 同属会话命名体验的改进诉求。
- https://github.com/anomalyco/opencode/issues/38163

### 7. subagent 生成失败 — NOT NULL constraint failed: session_message.seq
- **#37912** | 👍 0 | 💬 3 | 已关闭
- 通过 `task` 工具生成 subagent 时因数据库约束错误失败，会话行已创建但消息未持久化，subagent 永远无法运行。属于阻断性数据层 bug。
- https://github.com/anomalyco/opencode/issues/37912

### 8. Serve 模式无法有效区分 worktree
- **#38113** | 👍 1 | 💬 3 | 已关闭
- Web UI 中打开 worktree 目录后，所有会话一律显示为 `project-a`，无路径或分支标识。影响使用 worktree 进行多任务并行开发的用户。
- https://github.com/anomalyco/opencode/issues/38113

### 9. TUI 因大二进制文件输入冻结
- **#38201** | 👍 0 | 💬 2 | 已关闭
- 项目目录含数百 MB 二进制文件时，TUI 正常渲染但回车无响应。project copy 刷新挂起导致整个界面不可用，属于性能/卡死类高频痛点。
- https://github.com/anomalyco/opencode/issues/38201

### 10. macOS TUI 自 v1.2.7 起挂起
- **#38110** | 👍 1 | 💬 2 | 已关闭
- `init` 阶段卡死且 Ctrl-C 无响应，v1.16.2 同样受影响。macOS 平台上的阻塞性回归问题，影响面较大。
- https://github.com/anomalyco/opencode/issues/38110

---

## 重要 PR 进展

### 1. docs(ecosystem): add oos — 跨项目会话搜索 TUI
- **#50083** | 📝 新增 | 打开
- 为 Ecosystem 页面添加 oos（Go TUI，支持跨项目会话搜索）。生态持续丰富，社区工具链在会话管理方向活跃。
- https://github.com/anomalyco/opencode/pull/50083

### 2. feat(core): 通知顶层工具可用性变更
- **#50067** | ✨ 新功能 | 打开
- 跟踪直接暴露给模型的工具列表，后续请求只播报告新增/移除的工具变更，与 Code Mode 的 delta 报告机制对齐。提升工具调用的精确度与上下文效率。
- https://github.com/anomalyco/opencode/pull/50067

### 3. fix(cli): 加固非交互运行
- **#50068** | 🐛 修复 | 打开
- `opencode run` 的退出状态改为由最终执行结果决定；取消非交互形式的 web 搜索选项；处理子会话的权限与表单阻塞。对 CI/自动化场景意义重大。
- https://github.com/anomalyco/opencode/pull/50068

### 4. fix(cli): service restart 无法停止旧进程时失败关闭
- **#50075** | 🐛 修复 | 打开
- 修复 `service restart` 将 2 秒健康检查超时误判为"无服务"，导致复用旧实例的问题。关闭时快速失败，避免服务状态不一致（关闭 #37795）。
- https://github.com/anomalyco/opencode/pull/50075

### 5. feat(app): 标签页显隐切换命令
- **#50074** | ✨ 新功能 | 打开（需合规审查）
- 新增运行时命令和快捷键，可切换桌面/Web 应用标题栏的会话标签条显隐（默认开启，持久化偏好）。桌面端 UI 可定制性提升（关闭 #50056）。
- https://github.com/anomalyco/opencode/pull/50074

### 6. fix(session): 表面化 drain 失败 + 校验 @mention 技能权限
- **#50071** | 🐛 修复 | 打开（需关联 issue）
- 两个会话层修复：`terminal()` 对中断原因分类有误（`Cause.hasInterrupts` 过于宽泛），导致真实失败被误判；同时校验 @mention 技能权限（关闭 #49740）。
- https://github.com/anomalyco/opencode/pull/50071

### 7. fix(tui): 默认变体只显示一次
- **#50069** | 🐛 修复 | 打开
- variant 菜单已有 Default 行时，provider 若也提供名为 `default` 的 variant，会出现两行相同的值。消除重复 UI 项（关闭 #50002）。
- https://github.com/anomalyco/opencode/pull/50069

### 8. fix(tui): /move 会话支持自定义目标路径
- **#49560** | 🐛 修复 | 打开
- `/move` 命令目前只能选择当前项目的 worktree，拒绝外部路径。此 PR 允许自定义目标路径，对跨项目会话迁移有实际价值（关闭 #49212 等 4 个 issue）。
- https://github.com/anomalyco/opencode/pull/49560

### 9. feat(tui): v2 open session selector — `-s` 支持
- **#50052** | ✨ 新功能 | 打开
- `opencode -s` 后不跟 session ID 时，直接打开 TUI `/sessions` 列表。降低命令行入口的会话选择摩擦（关闭 #48718 #36134）。
- https://github.com/anomalyco/opencode/pull/50052

### 10. refactor(app): 时间线行协调避免深比较
- **#48435** | ♻️ 重构 | 打开
- `reuseTimelineRows` 对每行使用 `Equal.equals` 深比较，引发 Effect 哈希与遍历开销。改为浅层操作，提升大对话时间线的渲染性能（关闭 #48434）。
- https://github.com/anomalyco/opencode/pull/48435

---

## 功能需求趋势

从近期 Issues 中可提炼出社区最关注的功能方向：

1. **远程/网络访问能力** — #13388（ACP over WebSocket）以 9 个 👍 领跑全场，标志着用户不再满足于本地 TUI，期望在另一台主机上远程驱动 OpenCode，或通过编辑器/客户端经 WebSocket 接入。

2. **会话管理自动化** — 多个请求围绕"自动命名"（#38163）、"恢复会话"（#43489 PR）、"会话选择器改进"（#50052 PR），说明会话数据在用户工作流中的重要性日益上升，手工管理成本过高。

3. **外部服务集成（Connectors）** — #38095 提议内置 OAuth 流程的一等公民连接器（Google Calendar/Gmail/Slack/Notion 等）；#38090 请求接入 Gitlawb Opengateway。社区希望 agent 能直接操作系统外的服务，而非仅处理本地文件。

4. **桌面/TUI 体验优化** — PWA 安全区适配（#35480）、TUI 滚动导航（#38114）、标签页显隐（#50074 PR）等 UI 细节被反复提及，桌面端和 Web 端的完成度仍在追赶用户预期。

5. **离线/自托管生态完善** — 树莓派本地编译（#18492 关联 PR #43496）、Claudexor 本地控制面（#38146）、oos 跨项目搜索（#50083 PR），显示社区在 AI 工具链中的"本地优先"意识持续升温。

---

## 开发者关注点

1. **跨平台兼容性是重灾区（Windows/macOS）**
   - Windows：npm 包安装后 PE loader 错误（#38169）、CLI 与新版 Windows 不兼容（#38178）、PowerShell 中文乱码（#37915）
   - macOS：TUI 挂起（#38110）、中文输入法 Esc 组合键取消行为异常（#37911）、GPU 进程崩溃（#37906）

2. **会话数据可靠性**
   - 导出导入后会话损坏、agent 循环输出（#38157）
   - subagent 生成因数据库约束失败（#37912）
   - `prompt_async` 尚未持久化即返回 204，存在数据丢失窗口（#38092）

3. **配置管理困扰**
   - `tui.jsonc` 存在时 `tui.json` 仍被重建且忽略前者配置（#38167）
   - `/commit` 命令指定模型在退出/恢复后失效（#38165）

4. **性能与稳定性**
   - 大二进制文件导致 TUI 输入冻结（#38201）
   - `--mdns` 模式事件监听器泄漏（#35499）
   - 文件查看器/文件树在 AI 编辑后

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Qwen Code 社区动态日报 — 2026-09-20

### 今日速览

v0.24.1 正式发布，其中包含一项破坏性变更（`active_goal` 流事件停止输出）以及多项工作流与 CI 修复。社区侧，#8182 与 #11872 两个老问题在讨论量上持续领跑，分别涉及 ACP 子进程内存分配和 macOS 上的 PTY 不可用问题；同时安全类 Issue #12246 和 Web Shell 包发布缺陷 #12185 双双被标记 P1，值得关注。

---

### 版本发布

**v0.24.1** 发布，主要变更：
- **Breaking Change**：`refactor(goal)!: stop emitting the active_goal stream event`（#12181，作者 @qqqys）
- 其余变更集中在 `fix(ci)`（Docker 缓存回收、清理 review 临时目录）、`fix(core)`（简化处理逻辑）等方向。
- 另有 `v0.24.1-nightly.20260919.c1c00cbaab`、`desktop-v0.24.1`、`sdk-typescript-v0.1.13`（内置 CLI v0.24.1）同步发布。

---

### 社区热点 Issues（10 条精选）

1. **[P1] Web Terminal 报错 "[Error: PTY not available]"**（#11872，11 评论）
   `@lydell/node-pty` 声明了但未打包，且 macOS 代码签名阻碍本地安装的 prebuild；`qwen serve` 与 Desktop Web Shell 均受影响。社区讨论集中，是目前平台类最热问题。
   🔗 https://github.com/QwenLM/qwen-code/issues/11872

2. **[P2] `qwen serve` 按宿主机内存为每个 ACP 子进程授权 50% V8 堆上限**（#8182，8 评论）
   `getAcpMemoryArgs()` 按宿主机内存计算一次并缓存，不按子进程数量均分，多 ACP 场景下内存可能被迅速耗竭。已在 #11907 关联设计讨论。
   🔗 https://github.com/QwenLM/qwen-code/issues/8182

3. **[P3] 会话摘要（away recap）固定用英文生成**（#11847，7 评论）
   系统提示词硬编码为英文，无法跟随会话语言；涉及 TUI `recap:` 行与 daemon `POST /session/:id/recap`。
   🔗 https://github.com/QwenLM/qwen-code/issues/11847

4. **[P2] deferred 工具发现会使 prompt 缓存前缀失效**（#6721，7 评论）
   模型搜索到隐藏 deferred 工具后，真实 schema 被解析并调用 `setTools()`，缓存前缀被破坏，影响上下文性能。
   🔗 https://github.com/QwenLM/qwen-code/issues/6721

5. **[P1] web-shell 包发布缺陷：`@/` 类型导入无法解析，且内联 6 个运行时依赖**（#12185，6 评论）
   发布管道已开始发布 `@qwen-code/web-shell`，但包自身构建存在三个问题，直接影响 npm 消费者。
   🔗 https://github.com/QwenLM/qwen-code/issues/12185

6. **[P1] 权限判断错误：`;` 使后台 `cd` 被误判为前台，导致受保护写入解析到错误路径**（#12246，4 评论）
   新提交的安全类问题，涉及 quote 读取与命令分段交互；耦合 shell 权限模型，建议跟进。
   🔗 https://github.com/QwenLM/qwen-code/issues/12246

7. **[P2] `serve` 启用 Local Control 时 EADDRINUSE**（#12277，4 评论）
   daemon 以 `--port 0` 启动占用临时端口后，Local Control 的第二个 HTTP 监听器尝试绑定 LAN 接口同一端口失败。
   🔗 https://github.com/QwenLM/qwen-code/issues/12277

8. **[P3] "agent" 函数描述约 2000 tokens，每次请求都发送**（#12272，4 评论）
   社区反馈该描述过长，浪费 token 预算；涉及 agent 工具 schema 的 token 优化需求。
   🔗 https://github.com/QwenLM/qwen-code/issues/12272

9. **[P2] LSP：服务器失败被上报为"无结果"**（#12220，4 评论）
   `NativeLspService` 每个 per-server 请求的异常只写 debug 日志，最终 `return []`；应向上抛出错误而非空数组。
   🔗 https://github.com/QwenLM/qwen-code/issues/12220

10. **[P2] 工作流脚本：`export const meta` 前的注释导致编译失败**（#12217，5 评论）
    正则 `/^\s*export\s+const\s+meta.../` 缺少 `/m` 标志，注释行直接让脚本无法启动并给出误导性提示。
    🔗 https://github.com/QwenLM/qwen-code/issues/12217

---

### 重要 PR 进展（10 条精选）

1. **feat(serve): 从持久化历史重试/重跑工作流**（#12190）
   支持 daemon 重启后从历史快照恢复的 run 执行 `retry`/`rerun`。状态为 `autofix/takeover`，推进中。
   🔗 https://github.com/QwenLM/qwen-code/pull/12190

2. **ci(pnpm): 全面切换 pnpm，移除 package-lock.json**（#11859，已合并）
   完成 #10444 的 Stage 2/3，CI 与发布使用同一 pinned pnpm 依赖图，`npm publish` 全部改用 pnpm。
   🔗 https://github.com/QwenLM/qwen-code/pull/11859

3. **feat: 添加阿塞拜疆语（az）支持**（#12284）
   新增 1874 条字符串的 `az.js` 语言文件，注册进 languages.ts 与 VS Code schema；社区贡献 PR。
   🔗 https://github.com/QwenLM/qwen-code/pull/12284

4. **feat(acp): 允许程序驱动的会话接收跨会话消息**（#12162）
   `qwen --acp` 进程（daemon 或 editor 驱动）现可接收来自其他会话的消息，审查规则与终端会话一致。
   🔗 https://github.com/QwenLM/qwen-code/pull/12162

5. **feat(web-shell): 当前对话内搜索并跳转**（#12234）
   最新提交 `c554b17` 修复了 Critical 审查项：对话框生命周期/焦点稳定、别名导航、IME 确认、可见性计数等。
   🔗 https://github.com/QwenLM/qwen-code/pull/12234

6. **feat(web-shell): Setup 卡片中选择 Live Voice 模型与音色**（#12199）
   配合 #12173（modelProviders）与 #12189（浏览器音频端点），补齐 Live Voice 配置体验。
   🔗 https://github.com/QwenLM/qwen-code/pull/12199

7. **fix(core): 允许 workflow meta 声明前有注释行**（#12245）
   修复 #12217：支持 `//` 与 `/* */` 注释行出现在 `export const meta` 之前，解决 V8 `Unexpected token` 问题。
   🔗 https://github.com/QwenLM/qwen-code/pull/12245

8. **fix(core): 为 Agent/shell 工具描述与参数 schema 增加每轮 token 预算**（#12142）
   防止模型可见工具表面积的无限增长，未来增大需要显式修改预算；同时修复测量暴露出的一个 mismatch。
   🔗 https://github.com/QwenLM/qwen-code/pull/12142

9. **fix(core): 当全部 LSP 请求失败时向上传播错误**（#12286）
   保留服务器成功但无匹配时的空结果，同时若所有请求均失败则抛出最后一个错误，修复 #12220 的"吞错"行为。
   🔗 https://github.com/QwenLM/qwen-code/pull/12286

10. **feat(daemon): 批量工作区会话目录 API**（#12254）
    新增只读、能力可发现的批量目录接口，单次 HTTP 请求可获取多个工作区的会话页，并附带 TypeScript SDK 支持。
    🔗 https://github.com/QwenLM/qwen-code/pull/12254

---

### 功能需求趋势

- **Web Shell 体验深化**：搜索会话内内容（#12231/#12234）、git 工作树管理（#12154）、Live Voice 模型选择（#12199）、批量会话目录（#12254），Web Shell 正从"能连能用"走向"全功能 IDE 界面"。
- **国际化（i18n）**：阿塞拜疆语 PR（#12284）进入社区贡献队列；会话摘要语言跟随（#11847）也表明多语言需求不止于界面。
- **资源管理与调优**：ACP 子进程内存上限（#8182/#11907）、MCP App 资源限制可配置（#12258）、agent 工具描述 token 预算（#12272/#12142）、上下文缓存有效性（#6721），说明用户对长会话、多进程场景下的资源消耗开始敏感。
- **会话可恢复性**：工作流从持久化历史恢复（#12190）、ACP 跨会话消息（#12162）、会话恢复摘要，围绕"程序驱动 + 长期运行"的使用模式展开。

---

### 开发者关注点

- **macOS / Web Shell 平台问题**：#11872（PTY 不可用、代码签名阻断 prebuild）以 11 条评论成为目前社区讨论热度最高的问题；#12185（web-shell 包发布缺陷）被标记 P1，npm 消费者直接受影响。
- **错误可见性与可诊断性**：LSP 失败被吞为"无结果"（#12220/#12286）、Docker 清理与 E2E 构建产物下载超时被误判为回归（#12274/#12260），开发者普遍希望失败能明确上报，而不是静默变空。
- **权限与安全敏感度高**：#12246（分号解析导致路径误判）发布即 P1；#11815（注释内操作符导致误拆分）也在排期，说明命令分段与权限模块仍处于安全打磨期。
- **Windows CI 稳定性承压**：#12270（bwrap 套件在 win32 运行）、#12262（git-remotes scp-like 测试在 Windows 失败），连续多个 nightly Windows leg 红盘，Windows 支持稳定性是国内开发者长期关注点。

---

*数据来源：github.com/QwenLM/qwen-code，统计窗口 2026-09-19 至 2026-09-20。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*