# AI CLI 工具社区动态日报 2026-09-29

> 生成时间: 2026-09-29 03:09 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-29）

## 1. 生态全景

当前 AI CLI 工具已进入“能力竞赛 + 可靠性治理”并行的阶段。各家通过快速迭代模型接入（Claude Sonnet 5.5 的 1M 上下文、Codex 的 provider 目录）、跨端同步（Skills/会话/远程控制）和 MCP 生态整合来争夺开发者；同时，社区反馈焦点正从功能新增转向稳定性、资源消耗和安全性。Windows 平台适配问题集中爆发，成为各工具共同的“软肋”；记忆与上下文管理则成为下一轮差异化竞争的核心战场。整体呈现“多强并立、快速补课”的态势。

## 2. 各工具活跃度对比

| 工具 | 重点 Issues 数（日报精选） | 重点 PR 数 | Release 动态 |
|------|---------------------------|------------|--------------|
| Claude Code | 10 | 6 | v2.1.284（Claude Sonnet 5.5，1M 上下文） |
| OpenAI Codex | 10 | 10 | v0.158.0 + 多项预发布 |
| Gemini CLI | 10 | 10 | v0.63.0-nightly.20260929 |
| GitHub Copilot CLI | 10 | 未单列 | v1.0.90-1 等 5 个版本 |
| Kimi Code CLI | 0 | 0 | 无（24 小时无活动） |
| OpenCode | 10 | 10 | v1.18.33 |
| Qwen Code | 10 | 10 | 无版本发布信息 |

## 3. 共同关注的功能方向

- **记忆与上下文治理**  
  Claude Code 社区要求 auto-memory 压缩阈值可配置（#91188，58 评论）；OpenAI Codex 用户以 89 👍 请求禁用自动对话 recap（#41622）；Gemini CLI 社区关注 AST 感知工具以降低 token 噪声（#22745）；Qwen Code 则将“非对话上下文 token 治理”作为跟踪议题（#12028）。共同诉求：**让用户掌控记忆行为，减少自动总结/压缩对工作流的干扰，并降低 token 成本。**

- **MCP/插件生态的可靠性与认证**  
  Codex 面临 MCP stdio fd 泄漏（#26984）和 OAuth token 刷新失败（#13852）；OpenCode 通过 PR #51979 修复 MCP OAuth 刷新并发问题；Copilot 修复 MCP OAuth 缓存 token 复用；Gemini 在 PR #29435 中处理 MCP 传输清理。共同痛点：**MCP 连接稳定性、认证流程、资源泄漏仍是普遍短板。**

- **跨端同步与远程控制**  
  Claude Code 的 Skills 跨 Desktop/CLI 同步需求以 157 👍 居所有功能请求榜首（#20697）；Codex 出现 Android 授权循环（#36268）、远程控制无法启用等问题（#36946）；Gemini 推进 A2A 服务器配置迁移（#29450）。各方均在尝试打通 Desktop/CLI/Mobile/远程的工作流闭环。

- **Agent 可靠性治理**  
  Gemini 出现子代理无限挂起（#21409）和 MAX_TURNS 被误报为 GOAL 成功（#22323）；Claude Code 有 Cowork 文件写入滞后（#93482）和 Fable 模型输出变成思考块（#91939）；Qwen Code 的 AUTO 模式审批无法覆盖（#11019）。**状态不透明、假成功、进程挂起**正严重侵蚀用户对 Agent 的信任。

- **安全与数据透明度**  
  会话记录 30 天静默删除（Claude #62476）、辅助模型 baseUrl 凭证泄露（Qwen #12856）、调试输出敏感信息脱敏（OpenCode v1.18.33）、策略目录权限校验（Gemini PR #29333）等表明，安全与合规正从“加分项”变为“硬底线”。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|----------|----------|----------|
| **Claude Code** | 大上下文模型、记忆系统、Skills、跨端生态；偏企业级工作流 | Anthropic 生态专业开发者、团队用户 | 深度整合 Claude 模型能力，强调 1M 上下文记忆和长时间会话；通过 Skills/插件扩展生态 |
| **OpenAI Codex** | MCP 集成、全屏 TUI、远程控制、成本治理 | OpenAI API 重度用户、桌面+CLI 混合用户 | Rust 实现，强调整合 OpenAI 产品矩阵（桌面应用、移动端远程），快速迭代但稳定性问题较多 |
| **Gemini CLI** | Agent/子代理、A2A 协议、bash 原生能力、沙箱安全 | Google 生态开发者、多 Agent 协作场景 | 重视零依赖沙箱和意图路由，鼓励模型直接调用 POSIX 工具；通过 A2A 服务器实现代理间通信 |
| **GitHub Copilot CLI** | GitHub 深度集成、轻量 CLI、规则文件兼容 | GitHub 用户、追求低配置的开发者 | 基于 Copilot 认证体系，兼容 Claude Code 规则；版本稳定（v1.0.x），但认证机制问题频发 |
| **Kimi Code CLI** | 无公开动态 | — | 尚处沉寂期，需观察后续投入 |
| **OpenCode** | 多 provider 聚合、本地模型、UI/UX、人工确认 | 追求灵活模型切换、重视交互体验的开发者 | 通过 provider 抽象支持云/本地模型；强调配置可读性、语言本地化和人工审批的细粒度控制 |
| **Qwen Code** | Managed Agent 架构、持久化执行、Web Shell、token 治理 | 企业级用户、需要复杂 Agent 编排的团队 | 走向“双引擎”架构（Legacy + Managed），聚焦 Agent 持久化、可恢复执行和上下文 token 优化 |

## 5. 社区热度与成熟度

- **Claude Code**：社区讨论深度最高（单 issue 58 条评论，功能请求 157 👍），版本迭代已到 2.1.x，功能最丰富，处于成熟主导地位，但新版本回归问题（Linux 冻结、Windows 性能）引发信任波动。
- **OpenAI Codex**：社区活跃度极高，Windows 相关 issue 占比过半，89 👍 的功能请求彰显量级，但版本仍在 0.x/alpha，稳定性问题集中，属于“高热度、快迭代、未成熟”阶段。
- **Gemini CLI**：社区规模相对小但官方响应迅速（PR 密集），版本 0.63 nightly，处于快速迭代期；子代理可靠性、进程挂起是当前主要负反馈。
- **GitHub Copilot CLI**：版本进入 1.0.x 表明基础

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-29）

---

## 1. 热门 Skills 排行

以下 PR 在评论数排序中位居前列，均处于 **Open** 状态：

**① skill-creator 可靠性修复（#1298）** — [链接](https://github.com/anthropics/skills/pull/1298)
- 功能：修复 trigger 评估误报，解决 Windows 下 `select()` 管道失败、无关工具中断扫描等问题，并将运行时失败从"误判为未触发"中隔离。
- 热点：社区对 skill 评估工具的跨平台兼容性与评估结果可信度高度关注；PR 自 6 月提交以来持续更新至 9 月中旬，讨论周期长。

**② mcp-builder 兼容 MCP 2.0（#1742）** — [链接](https://github.com/anthropics/skills/pull/1742)
- 功能：适配 `mcp>=2.0.0` 中 `streamablehttp_client` → `streamable_http_client` 的改名及自定义 header 新配置方式。
- 热点：MCP 生态版本演进带来的 breaking change，社区有明确的修复诉求（对应 issue #1668），更新活跃（9/27 仍有改动）。

**③ proofcore-contract-auditor（#1771）** — [链接](https://github.com/anthropics/skills/pull/1771)
- 功能：面向 Web3 开发者的智能合约审计 Skill，对 Solidity/Rust 做静态分析，并将审计证明锚定到 TON 区块链。
- 热点：区块链安全与"可验证审计"的结合，代表新领域的 Skill 扩展方向。

**④ md2video-audio（#1703）** — [链接](https://github.com/anthropics/skills/pull/1703)
- 功能：零成本将 Markdown 文档经 Marp 转为幻灯片，并生成带拟人配音的 MP4 视频。
- 热点：内容生产自动化，覆盖"文档 → 视频"的完整工作流，符合社区对多媒体生成类 skill 的期待。

**⑤ docx 文档处理增强（#1734 / #1792）** — [链接 #1734](https://github.com/anthropics/skills/pull/1734) · [链接 #1792](https://github.com/anthropics/skills/pull/1792)
- 功能：#1734 检测 docx 中孤立（orphaned）批注；#1792 让 LibreOffice 超时返回错误而非误报成功，并在输出后校验修订标记已清除。
- 热点：文档生成是社区最活跃的 Skill 品类之一，鲁棒性与输出可验证性是当前讨论焦点。

**⑥ pyxel 复古游戏开发（#525）** — [链接](https://github.com/anthropics/skills/pull/525)
- 功能：基于 Pyxel 的 Python 复古游戏开发、调试与无头验证 Skill。
- 热点：3 月提交、9 月仍在更新，长期讨论未合并，体现社区对"创意/游戏开发"类 skill 的兴趣与较高的验收标准。

**⑦ notion-spec-to-implementation + 简历审计（#1245）** — [链接](https://github.com/anthropics/skills/pull/1245)
- 功能：将产品或技术规格书拆解为 Notion 可执行任务（含验收标准）；同时附带一个量化简历审计 Skill。
- 热点：项目管理自动化与招聘场景的落地尝试，更新至 9/28，讨论仍在继续。

**⑧ AWT 端到端测试（#822）** — [链接](https://github.com/anthropics/skills/pull/822)
- 功能：为 Claude 提供视觉与浏览器控制能力，零代码自动生成并执行 E2E 测试。
- 热点：AI 驱动测试生成是反复出现的社区需求方向，PR 自 3 月提交后讨论持续至 9 月。

---

## 2. 社区需求趋势（来自 Issues）

| 方向 | 代表性 Issue | 热度 |
|---|---|---|
| **安全与信任边界** | [#492 社区 Skill 借 anthropic/ 命名空间分发，冒充官方造成权限信任滥用](https://github.com/anthropics/skills/issues/492) | 43 条评论，全仓最高 |
| **组织级 Skill 共享** | [#228 在 Claude.ai 内支持 org-wide 直接分享 Skill，替代手动下载/上传](https://github.com/anthropics/skills/issues/228) | 16 评论，👍 8 |
| **评估工具可靠性** | [#556 run_eval.py 中 `claude -p` 对所有查询触发率为 0%](https://github.com/anthropics/skills/issues/556) | 12 评论，👍 7 |
| **上下文窗口效率** | [#1487 claude-api Skill

---

# Claude Code 社区动态日报
**2026-09-29**

## 今日速览

今日最重磅的动态是 **v2.1.284 发布**，新增 **Claude Sonnet 5.5**（`claude-sonnet-5-5`）作为默认 Sonnet 模型，支持 1M 上下文。社区层面，**auto-memory 压缩阈值** 成为今日讨论度最高的话题（58 条评论），同时 **Skills 跨端同步** 以 157 个 👍 稳居功能请求榜首。此外，多个涉及 **Windows 平台性能** 和 **数据安全** 的 bug 报告引发了广泛关注。

---

## 版本发布

### v2.1.284

🔗 [查看 Release](https://github.com/anthropics/claude-code/releases)

- **新增 Claude Sonnet 5.5**（`claude-sonnet-5-5`），已设为 Anthropic API 上默认 Sonnet 模型
  - 上下文窗口：**1M tokens**
  - 定价：**$2 / $10 每 Mtok**，缓存读取 **$0.20/Mtok**
- **自动模式新增选项**：在工作目录之外读取文件前的确认提示中，增加 "Yes, but ask again next time" 应答选项

---

## 社区热点 Issues（10 个精选）

### 1. 🔥 auto-memory 压缩提醒阈值不可配置
**#91188** | [链接](https://github.com/anthropics/claude-code/issues/91188) | 💬 58 条评论
> [enhancement, memory]

**核心诉求**：`MEMORY.md` 的 auto-memory 压缩提醒阈值当前是硬编码的（首次加载 200 行 / 25KB），社区希望将其改为可配置或可单独抑制。

**为什么重要**：这是今日评论数最高的 issue，说明大量用户在日常使用中都受困于硬编码的压缩提醒，该问题已影响工作流效率。

---

### 2. ⭐ Skills 跨端同步（Desktop ↔ CLI）
**#20697** | [链接](https://github.com/anthropics/claude-code/issues/20697) | 💬 49 条评论 | 👍 157
> [enhancement, area:core]

**核心诉求**：让 Skills 能在 Claude Desktop 和 Claude Code CLI 之间同步。

**为什么重要**：157 个 👍 是当前所有开放 issues 中最高的，反映了跨端工作流在真实用户中的刚需。涉及 49 条评论的讨论也显示了这一问题的复杂性（文件路径、权限、版本兼容等）。

---

### 3. ⚠️ 会话记录 30 天后被静默删除
**#62476** | [链接](https://github.com/anthropics/claude-code/issues/62476) | 💬 25 条评论 | 👍 27
> [bug, reproduced]

**核心问题**：Claude Code 在默认情况下会在 30 天后静默删除会话记录，且未在首次使用时明确告知用户。

**为什么重要**：涉及数据安全和用户知情权，已确认可复现。对依赖长期会话上下文的专业用户影响尤其大，社区反应强烈。

---

### 4. 🐛 Windows: Cowork 文件写入落后一个提交
**#93482** | [链接](https://github.com/anthropics/claude-code/issues/93482) | 💬 15 条评论
> [bug, has repro, platform:windows, area:cowork, data-loss]

**核心问题**：Cowork 模式下 `device_commit_files` 报告写入成功，但磁盘内容滞后一个提交——静默写入 + 错误时间戳，属于数据丢失类严重 bug。

**为什么重要**：这是 Windows 平台上的数据一致性 bug，用户可能在不知情的情况下基于过期文件内容继续操作，风险很高。

---

### 5. 🪟 Windows 数据目录无法自定义
**#57998** | [链接](https://github.com/anthropics/claude-code/issues/57998) | 💬 15 条评论 | 👍 25
> [enhancement, platform:windows, area:desktop]

**核心诉求**：在 Windows 上支持通过 `CLAUDE_DATA_DIR` 环境变量或配置项，重定位 `%APPDATA%\Claude\` 数据目录。

**为什么重要**：Windows 用户对系统盘空间、企业环境漫游配置有硬性需求，25 个 👍 显示这是一个普遍痛点。

---

### 6. 🎨 Markdown 行内代码无法自定义主题色
**#73837** | [链接](https://github.com/anthropics/claude-code/issues/73837) | 💬 5 条评论 | 👍 9
> [bug, platform:linux, area:tui]

**核心问题**：Markdown 格式的行内代码（`` `code` ``）颜色被固定为 base palette，**绕过了主题的 `overrides` 配置**，用户无法自定义。

**为什么重要**：对重度使用 TUI 主题定制的开发者来说，这是一个明确的可用性缺陷。

---

### 7. 📊 Desktop 使用热力图数据丢失
**#87772** | [链接](https://github.com/anthropics/claude-code/issues/87772) | 💬 4 条评论
> [bug, has repro, platform:macos, data-loss, area:desktop]

**核心问题**：桌面版的使用热力图数据永远丢失——因为只有 CLI 会写入 stats cache。

**为什么重要**：macOS 桌面版用户无法看到历史使用记录，这是桌面端与 CLI 端数据管道的断裂。

---

### 8. 🚀 Windows 桌面版每分钟启动 17 个 git 进程
**#94478** | [链接](https://github.com/anthropics/claude-code/issues/94478) | 💬 4 条评论
> [bug, has repro, platform:windows, performance, area:desktop]

**核心问题**：Windows 桌面版持续以 **15-20 次/秒** 的频率启动 git.exe，每个进程伴随 conhost.exe，**每天约 200 万个短生命周期进程**，在同机放大了内核池泄漏至 ~6GB/天。

**为什么重要**：这是极端的性能问题，普通用户无法自行规避。虽然评论数不多，但影响是灾难级的（系统内存耗尽）。

---

### 9. 🤖 Fable 5.1：最终回答变成"思考块"，用户看不到
**#91939** | [链接](https://github.com/anthropics/claude-code/issues/91939) | 💬 4 条评论
> [bug, has repro, platform:windows, area:tui, area:model]

**核心问题**：使用 `claude-fable-5-1` 模型时，如果一轮对话以 `AskUserQuestion` 结束，模型的最终解释性回答会被错误地作为 **thinking block** 输出，用户完全看不到。

**为什么重要**：直接影响用户体验——模型给出了答案和问题表单，但用户看不到答案。属于模型集成层的 bug。

---

### 10. 🔧 2.1.284 按下 Enter 后永久冻结
**#98023** | [链接](https://github.com/anthropics/claude-code/issues/98023) | 💬 1 条评论
> [bug, has repro, platform:linux, regression]

**核心问题**：2.1.284 在 Linux 上按 Enter 发送消息时**永久冻结**。定位到新的 sandbox glob 展开器在同步遍历 `~` 目录解析 `"~/**/…"` denyRead 模式（跟随符号链接、无限内存）。2.1.280 表现正常。

**为什么重要**：这是 **2.1.284 的回归 bug**，Linux 用户升级后完全无法正常使用。虽然刚发布，但影响面极大，是当前最紧急的修复项。

---

## 重要 PR 进展

> 过去 24 小时共 6 个 PR 有更新，全部列出：

### 1. ✂️ diff: 首次编辑时仅在有待列出文件时打开面板
**#94847** | [链接](https://github.com/anthropics/claude-code/pull/94847) | OPEN

**变更**：diff 面板在会话首次 Edit/Write 成功后不再无条件自动打开——当写入发生在仓库外、被 gitignore 的文件或不同 worktree 时，会显示空面板（"No tracked changes"）。此修改将打开时机延迟到确认有文件可列之后。

**重要性**：消除了一个常见的 UI 干扰，提升编辑场景的流畅度。

---

### 2. ↩️ mods: 回退两项变更（agents-md 截断读取、diff 强制颜色）
**#98018** | [链接](https://github.com/anthropics/claude-code/pull/98018) | CLOSED

**变更**：回退 #96363 和 #96364。agents-md 和 diff 两个 mods 恢复到更早的行为。

**背景**：#96363/#96364 分别尝试修复 AGENTS.md 分页读取的重复附加问题和 git 强制颜色导致的 diff 内容为空问题，但引入回归，现整体回退。

---

### 3. 📄 agents-md: 分页读取的嵌套 AGENTS.md 不再计入"已交付"
**#96364** | [链接](https://github.com/anthropics/claude-code/pull/96364) | CLOSED

**变更**：对嵌套 `AGENTS.md` 的整个文件读取若因超 token 上限被 Read 工具自动分页，则不再视为已完整交付，后续 Read 会自动重新附加。

**重要性**：修复了子目录 AGENTS.md 在分页场景下被忽略的 bug。

---

### 4. 🎨 diff: 传递 `--no-color` 防止强制颜色清空 diff 内容
**#96363** | [链接](https://github.com/anthropics/claude-code/pull/96363) | CLOSED

**变更**：当 git 配置了 `color.ui=always` 时，`git diff` 输出会包含 ANSI 转义序列，导致 diff 面板无法解析 hunk header。通过 `--no-color` 强制禁用颜色输出。

---

### 5. 🔒 CI: GitHub Actions 工作流安全加固
**#97952** | [链接](https://github.com/anthropics/claude-code/pull/97952) | OPEN

**变更**：为调用 Claude 的三个工作流（`claude-issue-triage.yml`、`claude-dedupe-issues.yml`、`claude.yml`）添加安全加固：
- **出口防火墙 runner**
- 其他安全措施（共 3 项变更）

**重要性**：防止供应链攻击，保护调用 Claude API 的 CI 环境。

---

### 6. 🗑️ 关闭：AI 学习路线图交互式画布应用
**#31204** | [链接](https://github.com/anthropics/claude-code/pull/31204) | CLOSED

**变更**：一个 React + Vite 构建的交互式节点-边图学习路线图应用，带 localStorage 持久化。此 PR 已被关闭，**并非 Claude Code 核心代码**，是社区提交而非官方变更。

---

## 功能需求趋势

从当前 50 个 issues 中可提炼出社区最关注的 5 大方向：

### 1. 🧠 记忆系统可配置化（Memory & Context Management）
- **#91188** auto-memory 压缩阈值可配置
- **#98044** auto-memory 写入因符号链接路径反复弹窗
- **#89274** prose 强制换行问题跨会话复发（记忆未生效）

趋势解读：记忆是 Claude Code 的核心竞争力，但用户需要更细粒度的控制权，而非硬编码行为。

### 2. 🔄 跨端同步与一致性（Cross-platform Sync）
- **#20697** Skills 跨 Desktop/CLI 同步（157 👍）
- **#96867** 从移动端启动桌面 Code 会话
- **#87772** Desktop 热力图数据丢失，因仅 CLI 写缓存

趋势解读：用户希望 Desktop / CLI / Mobile 三端体验无缝衔接，当前数据管道断裂影响了信任感。

### 3. 🪟 Windows 平台体验全面修复
- **#57998** 数据目录可重定位（25 👍）
- **#94478** 桌面版每分钟 17 个 git 进程的严重性能问题
- **#93482** Cowork 文件写入滞后一个提交
- **#92307** 2.1.261 崩溃

趋势解读：Windows 用户占比不小但体验明显落后于 macOS，性能瓶颈、路径处理和权限管理是重点。

### 4. 🛡️ 安全与权限沙箱的精细化控制
- **#98046** 用户级 hooks 应在不受信任工作区中继续运行
- **#98047** 自动模式分类器"无判定"硬失败，打断工作流
- **#98044** 自动模式在符号链接路径下无法批准内存写入
- **#98017** 安全分类器误拦合法 admin UI 代码

趋势解读：Sandbox / 自动模式的方向正确，但分类器**误判成本过高**（硬失败），社区呼吁更平滑的降级机制。

### 5. 📊 数据保留透明度
- **#62476** 30 天静默删除会话记录（27 👍）
- **#94479** stats-cache 重建是否会丢失已清理会话的历史

趋势解读：用户开始关注 Claude Code 对本地数据的生命期管理策略，要求默认行为更透明、可配置。

---

## 开发者关注点（痛点 / 高频需求）

### 🔴 高优先级（影响日常使用）

| 痛点 | 相关 Issue | 影响 |
|------|-----------|------|
| **新版本回归导致不可用** | #98023（2.1.284 冻结）、#92307（2.1.261 崩溃） | Linux/Windows 用户升级后无法工作，需紧急回滚 |
| **自动模式误判/无判定** | #98047、#98017 | 写入被硬失败，需要不断重试，流程中断 |
| **docs 静默数据丢失** | #62476、#87772、#93482 | 用户对数据安全失去信任 |
| **Windows 极端性能问题** | #94478 | 单日 200 万进程，直接拖垮系统 |
| **2.1.284 新 Sandbox 路径解析回归** | #98023 | 符号链接/波浪号展开导致冻结 |

### 🟡 中频痛点（体验改善需求）

| 痛点 | 相关 Issue | 社区反应 |
|------|-----------|----------|
| **主题定制不完整** | #73837 | 9 👍，TUI 用户对定制有强烈诉求 |
| **Fable 模型输出格式错误** | #91939 | 答案不可见，交互割裂 |
| **工作区切换审批频繁** | #94265 | 每次 switch 都弹审批，影响效率 |
| **Background Agent 重复事件** | #95601 | 订阅方收到重复通知，状态机混乱 |
| **Desktop 自动更新中断远程会话** | #95276 | 远程控制连接全部掉线 |

### 🟢 高频功能请求

1. **Skills 跨端同步**（#20697，157 👍）
2. **Windows 数据目录重定位**（#57998，25 👍）
3. **auto-memory 阈值可配置**（#91188，58 条讨论）
4. **MCP server 阴影插件同名端点不告警**（#98035）
5. **移动端启动桌面会话**（#96867）

---

## 分析师小结

今天的动态可以用两个关键词概括：**新模型冲刺** 和

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-29

## 今日速览

- **v0.158.0 正式发布**，为全屏 TUI 带来 copy-on-select 与右键粘贴能力，并支持通过 `codex mcp add --oauth-client` 连接需要预注册 OAuth client secret 的 MCP 服务器。
- **Windows 桌面应用稳定性问题成为社区焦点**：启动卡死在 Loading、第二消息永久挂起、项目从侧边栏消失等大量 Windows 专属 bug 集中爆发。
- **PR 密集修复 MCP 与插件系统**：HTTP 连接池复用、插件 manifest 缓存、同时修复内容过滤后的重试与恢复引导。

---

## 版本发布

### rust-v0.158.0
- **TUI 增强**：全屏 TUI 支持 copy-on-select 与右键粘贴；**复制转录内容时保留 Markdown 格式**（#47639, #47896, #48118）
- **MCP 增强**：支持连接需要**预注册 OAuth client secret** 的 MCP 服务器，包括通过 `codex mcp add --oauth-client` 添加

另有 0.160.0-alpha.3、0.160.0-alpha.2、0.159.0-alpha.13、0.159.0-alpha.12 等预发布版本，暂无详细更新说明。

---

## 社区热点 Issues（Top 10）

### 1. [Windows] 内置插件（Computer Use、Browser、Chrome、LaTeX）全部不可用
- **Issue #25220** | 评论 44 | 👍 5
- Microsoft Store 安装的 Codex 中，所有内置插件在插件市场中显示为不可用，原因是 `copyfile` 在 EFS 加密的 WindowsApps 目录上失败。
- **为什么重要**：影响 Windows 上所有核心插件，且跨多个版本复现，是 Windows 用户当前最大的功能阻断。
- 链接：https://github.com/openai/codex/issues/25220

### 2. [Windows] 桌面更新后本地项目从侧边栏消失
- **Issue #42739** | 评论 36
- 更新 Windows 桌面应用后，Projects 区域显示"No projects"，但磁盘上的源文件夹和 Recent 中的聊天记录仍然存在。
- **为什么重要**：用户数据未丢失但 UI 无法展示，说明桌面应用的项目索引或持久化状态存在回归。
- 链接：https://github.com/openai/codex/issues/42739

### 3. MCP stdio 服务器泄漏 pipe fd + 孤儿子进程 → 累积 EMFILE
- **Issue #26984** | 评论 26 | 👍 7
- 长时间运行的 codex-cli 会话中，MCP stdio 服务器持续泄漏管道文件描述符并产生孤儿进程，最终导致 "Too many open files" (os error 24)。
- **为什么重要**：长期用户会频繁触发系统级资源耗尽，MCP 生态的稳定性瓶颈。
- 链接：https://github.com/openai/codex/issues/26984

### 4. Supabase MCP 反复要求重新认证：OAuth token 刷新失败
- **Issue #13852** | 评论 24
- MCP 服务器初始化阶段 OAuth token 刷新失败，导致 Supabase MCP 需要反复重新认证。
- **为什么重要**：直接破坏 MCP 工作流连续性，涉及 OAuth 凭据存储与刷新机制。
- 链接：https://github.com/openai/codex/issues/13852

### 5. 请求添加禁用自动对话总结（conversation recap）的设置
- **Issue #41622** | 评论 23 | **👍 89（本期最高）**
- 用户希望 `config.toml` 中增加一个文档化设置来禁用自动生成对话摘要，尤其是对已经理解上下文的用户而言，自动 recap 是噪音。
- **为什么重要**：89 个 👍 表明这是 CLI 用户群体中最迫切的功能需求之一。
- 链接：https://github.com/openai/codex/issues/41622

### 6. [Windows] 桌面版第二条消息永久挂起
- **Issue #47855** | 评论 16
- 第一条消息正常完成，第二条消息永远停留在 loading/running 状态，且从未到达 app-server。
- **为什么重要**：核心聊天功能在 Windows 上不可用，影响所有桌面重度用户。
- 链接：https://github.com/openai/codex/issues/47855

### 7. 桌面版缺少 git commit 和 push 按钮（回归）
- **Issue #47511** | 评论 15 | 👍 37
- Codex 桌面应用 26.917.51856 中，原本可见的 git commit/push 操作按钮消失，属于 UI 回归。
- **为什么重要**：git 操作是开发者工作流的核心闭环，37 👍 说明回调诉求强烈。
- 链接：https://github.com/openai/codex/issues/47511

### 8. [Android] "Authorize this phone" 无限循环
- **Issue #36268** | 评论 13
- 在 ChatGPT 安卓应用重装后，远程授权流程永远无法完成——Web 端认证成功，但应用始终未消费批准，主机端收不到配对 claims。
- **为什么重要**：远程控制功能对移动端用户完全不可用，且涉及跨端认证状态同步。
- 链接：https://github.com/openai/codex/issues/36268

### 9. [Windows 26.924] 每次冷启动都卡在 Loading
- **Issue #48466** | 评论 11 | 👍 3
- 每次冷启动桌面应用都卡在 Loading 界面，重启 app-server 后 UI 才恢复。
- **为什么重要**：26.924 版本在 Windows 上存在系统性启动缺陷，影响所有升级用户。
- 链接：https://github.com/openai/codex/issues/48466

### 10. [Windows] 0.158.0 sandbox 安装程序弹出可见终端窗口
- **Issue #48945** | 评论 6 | **👍 11**
- 升级到 codex-cli 0.158.0 后，`codex-windows-sandbox-setup.exe` 在启动和使用过程中弹出可见的终端窗口，干扰用户体验。
- **为什么重要**：0.158.0 新引入的 Windows 回归问题，👍 11 说明影响面较广。
- 链接：https://github.com/openai/codex/issues/48945

---

## 重要 PR 进展（Top 10）

### 1. 暴露原始错误详情给 turn lifecycle 贡献者
- **PR #49138** — 将后端元数据（如额度重置时间、速率限制快照）通过 `CodexErrorDetails` 传递给 `TurnErrorInput`，让错误钩子能获得比 `CodexErrorInfo` 类别更丰富的信息。
- 链接：https://github.com/openai/codex/pull/49138

### 2. 将显式 provider 模型目录视为权威
- **PR #49135** — 修复了配置了 `model_catalog_url` 的 provider 可能展示目录中不存在的捆绑模型，或在 catalog 刷新失败后使用过期模型的问题；模型匹配改为精确匹配而非前缀/命名空间后缀。
- 链接：https://github.com/openai/codex/pull/49135

### 3. 将内容过滤指导移入共享 Responses 重试处理器
- **PR #49130** — 把内容过滤的引导记录从采样循环移到 `handle_response_stream_error`，使采样和评估路径共享一致的恢复指导。
- 链接：https://github.com/openai/codex/pull/49130

### 4. 在预算前去重云与执行器技能列表
- **PR #49127** — 同时存在于云和执行器提供者的技能会重复占用目录空间；现在优先展示模型可见的云技能，并去重后再分配预算。
- 链接：https://github.com/openai/codex/pull/49127

### 5. 内容过滤重试时增加恢复指导
- **PR #49119** — 当 Responses 因 `content_filter` 停止时，重试请求现在会附带解释限制并提供合规替代方案的引导指令。
- 链接：https://github.com/openai/codex/pull/49119

### 6. 分析请求按线程的产品 SKU 归属
- **PR #49117** — 同一会话可共享 analytics client 但使用不同 product SKU，现在按线程注册 `apps_mcp_product_sku` 实现准确归属。
- 链接：https://github.com/openai/codex/pull/49117

### 7. 支持 X11 主选择区与中键粘贴
- **PR #49112** — 在 X11 下，鼠标选中内容会发布到 `PRIMARY`（即使禁用 copy-on-select），并支持中键粘贴；`CLIPBOARD` 行为保持不变。
- 链接：https://github.com/openai/codex/pull/49112

### 8. 为 agent 命令中心添加历史分页
- **PR #49106** — 命令中心原来只显示最近 10 条会话，现新增可键盘选择的 "Show more" 行，可增量加载更多历史任务并支持 loading/retry 状态。
- 链接：https://github.com/openai/codex/pull/49106

### 9. 重连后恢复未发送的 TUI 输入
- **PR #49105** — 将未发送与未确认的消息分开追踪；重连时，已确认未发送的消息自动恢复发送，避免输入内容丢失。
- 链接：https://github.com/openai/codex/pull/49105

### 10. 复用远程插件请求的 HTTP 连接池
- **PR #49100** — 每次调用 `PluginsConfigInput::remote_plugin_service_config` 都会新建 HTTP 客户端池；现在改为在 `PluginsConfigInput` 内共享一个惰性初始化的路由感知连接池。
- 链接：https://github.com/openai/codex/pull/49100

---

## 功能需求趋势

1. **Windows 桌面应用稳定性**（最高优先级）
   - 大量 issue 集中在桌面应用启动卡死（#48466、#48896）、消息挂起（#47855）、项目消失（#42739）等问题，用户对 26.924 版本的稳定性抱怨明显。

2. **MCP 连接与认证体验**（高频）
   - OAuth token 刷新失败（#13852）、stdio fd 泄漏（#26984）、app-server 关闭时 SIGKILL 导致 MCP 服务器无法清理（#48524），说明 MCP 的可靠性仍是社区核心关切。

3. **成本与额度控制**（呼声最高）
   - 89 👍 的 #41622（禁用自动 recap）位居本期点赞榜首；#38721 请求在 TUI status_line 中增加成本/预算指标；#48107 报告 auto-continue 在计划暂停后仍自动继续，耗尽每周额度。

4. **远程控制与跨设备同步**
   - Android 授权循环（#36268）、远程 Sections 中线程不可访问（#49090）、macOS 远程控制无法启用（#36946），远程控制功能的完成度有待提升。

5. **TUI 终端兼容性**
   - #49092 报告 157.0/158.0 在 mate-terminal 上复制粘贴失效；#49112 的 X11 PRIMARY 支持正是对该问题的直接回应。

---

## 开发者关注点

1. **Windows 是"重灾区"**：本期 30 条热门 issue 中超过一半为 Windows 专属问题——从 sandbox 安装器弹窗（#48945）、EFS 加密文件复制失败（#25220）到应用启动失败（#48466），Windows 用户大量遇到功能级阻断。

2. **资源泄漏与稳定性**：MCP fd 泄漏、SQLite pool 初始化错误被掩盖（#49102）、HTTP 连接池未复用（#49100），开发者对长期运行场景下的资源管理高度敏感。

3. **额度消耗失控焦虑**：auto-continue 绕过计划暂停机制持续消耗每周 Pro 额度（#48107），以及自动 recap 消耗 token（#41622），显示开发者对 token 和预算的控制需求强烈。

4. **认证流程反复"摩擦"**：OAuth token 刷新失败（#13852）、Android 授权循环（#36268）、远程认证完成后主机无响应，跨端认证状态同步是 CLU/app 协同的核心

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-29

> 数据来源: [github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 今日速览

- 📦 发布 v0.63.0-nightly.20260929 版本，修复认证无限循环问题。
- 🔥 社区围绕 Agent/子代理的可控性与可靠性展开激烈讨论，“手动激活技能”呼声最高（Issue #21165）。
- 🛠️ 多个高价值 PR 集中于修复进程挂起、高 CPU 占用与沙箱安全边界问题。

## 版本发布

### v0.63.0-nightly.20260929.gfe6350238
- **核心修复**：修复由文件争用（file contention）、无头密钥环（headless keyring）及 supervisor 状态丢失引发的认证无限循环问题（[#28341](https://github.com/google-gemini/gemini-cli/issues/28341)）。
- **PR**：[#29448](https://github.com/google-gemini/gemini-cli/pull/29448) by @villahernandez-coder

## 社区热点 Issues

以下精选过去 24 小时内更新最频繁、社区参与度最高的 10 个 Issue：

1. **[#21165] Allow skills to be activated manually like /commands**（评论 18 | 👍 2）
   - 社区最热功能请求。用户希望像 `/command` 一样手动触发技能（如 `/skill-name`），因为 agent 不会可靠地自动激活已安装技能。
   - 重要性：直指技能系统可控性短板，P2 优先级，官方已标记 `help wanted`。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/21165

2. **[#22323] Subagent recovery after MAX_TURNS is reported as GOAL success**（评论 13 | 👍 2）
   - Bug：`codebase_investigator` 子代理在达到最大轮数后被错误报告为 `GOAL` 成功，掩盖了中断事实。对依赖子代理做深度分析的开发者是重大误导。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/22323

3. **[#21409] Generalist agent hangs**（评论 8 | 👍 8）
   - 通用代理（generalist agent）在处理简单任务（如创建文件夹）时无限挂起，用户被迫等待一小时。临时绕过方案是不允许 agent 委托子代理。
   - 👍 8 说明影响面较大，属 P1 问题。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/21409

4. **[#19873] Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing**（评论 9 | 👍 1）
   - 设计提案：利用 Gemini 3 模型的 bash 原生能力，通过零依赖沙箱 + 意图路由，让模型更安全地直接使用 `grep`、`awk` 等 POSIX 工具。
   - 价值：长期看可显著降低工具调用 token 开销并提升代码探索效率。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/19873

5. **[#22745] Assess the impact of AST-aware file reads, search, and mapping**（评论 7 | 👍 1）
   - EPIC：系统评估 AST 感知工具对文件读取、搜索和代码库映射的改进空间，目标是减少 token 噪声、精确读取方法边界。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/22745

6. **[#21968] Gemini does not use skills and sub-agents enough**（评论 6 | 👍 0）
   - 用户反馈：Gemini 基本不会主动使用自定义技能和子代理，即使场景高度相关（如 gradle/git 技能）。显式指令后才工作。
   - 官方已加 `workstream-rollup` 标签，属于agent 主动性问题。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/21968

7. **[#22267] Browser Agent ignores settings.json overrides (e.g., maxTurns)**（评论 4 | 👍 0）
   - Bug：Browser Agent 完全忽略全局/项目级 `settings.json` 覆盖。`AgentRegistry` 读取了配置但 BrowserAgent 未生效。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/22267

8. **[#21983] Browser subagent fails in Wayland**（评论 4 | 👍 1）
   - Bug：Wayland 环境下 browser subagent 失败，属于环境兼容问题。P1 优先级。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/21983

9. **[#20079] ~/.gemini/agents/filename.md symlink is not recognized as an agent**（评论 4 | 👍 0）
   - 小痛点：`~/.gemini/agents/` 下的符号链接文件不被识别为 agent。影响使用 dotfiles 管理 agent 配置的用户。
   - 链接: https://github.com/google-gemini/gemini-cli/issues/20079

10. **[#22672] Agent should stop/discourage destructive behavior**（评论 3 | 👍 1）
    - 安全问题：模型在复杂 git 操作等场景会使用 `git reset`、`--force` 等破坏性命令，缺乏风险劝阻机制。
    - 官方已标记 `kind/customer-issue` + `workstream-rollup`。
    - 链接: https://github.com/google-gemini/gemini-cli/issues/22672

## 重要 PR 进展

以下 10 个 PR 为本期重点关注（合并/活跃/高价值）：

1. **[#29546] feat(cli): support skill activation via /skill-name in non-interactive mode**（OPEN）
   - 实现 Issue #21165 的非交互模式技能激活，为手动 `/skill-name` 调用打通路径。24 小时内新开，社区呼声高。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29546

2. **[#29436] fix(cli): prevent 100% CPU hang from @ within quotes in stdin**（OPEN, P1）
   - 修复通过管道/粘贴内容时，引号内 `@`（如 `import from "@scope/pkg"`）导致的正则灾难性回溯，解决 100% CPU 挂起。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29436

3. **[#29435] fix(cli,core): prevent process hang on session exit**（OPEN, P2, size/l）
   - 修复退出会话时 stdin 监听器未清理导致进程无法退出的问题，同时处理 MCP 传输清理。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29435

4. **[#29440] fix(core): use UTF-8 offsets for web-fetch citations**（OPEN）
   - 修复 `web-fetch` 对非 ASCII 响应（中文/emoji）的引用定位偏移错误，补充多字节回归测试。修复 #29039。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29440

5. **[#29450] refactor(a2a-server): implement V1 to V2 settings migration logic**（OPEN, P1, size/xl）
   - A2A 服务器配置加载器重构，支持分层 V2 配置格式，同时保持对扁平 V1 配置的透明向后兼容。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29450

6. **[#29542] fix(core): disable truncation when maxChars <= 0 in formatTruncatedToolOutput**（OPEN, P1）
   - 修复 `maxChars <= 0` 时索引切片导致输出意外膨胀的边界 bug，明确非正数禁用截断。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29542

7. **[#29328] fix(a2a-server): honour LOG_LEVEL and keep credentials out of the log**（CLOSED, P1, security）
   - 安全性修复：A2A 服务器日志硬编码 `level: 'info'` 导致 `LOG_LEVEL` 失效；同时将凭据移出日志输出。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29328

8. **[#29332] fix(core): bound how often one call may expand the sandbox**（CLOSED, P2）
   - 修复工具每次返回 `sandbox_expansion_required` 时无限递归展开，导致堆内存耗尽崩溃的问题。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29332

9. **[#29327] fix(sdk): honour AgentShellOptions env and timeoutSeconds**（CLOSED, P2）
   - 修复 `SdkAgentShell.exec` 忽略 `env` 和 `timeoutSeconds` 参数的问题——`timeoutSeconds: 1` 执行 `sleep 30` 会完整等待 30 秒。
   - 链接: https://github.com/google-gemini/gemini-cli/pull/29327

10. **[#29333] fix(core): vet the permissions of policy directories found by convention**（CLOSED, P2, enterprise）
    - 安全加固：`filterSecurePolicyDirectories` 只检查了系统策略目录，用户/工作区策略目录权限未受校验。修复提升企业环境安全性。
    - 链接: https://github.com/google-gemini/gemini-cli/pull/29333

## 功能需求趋势

从近 24 小时活跃的 50 条 Issues 中提炼社区最关注的功能方向：

1. **Agent 行为可控性**（约 40% Issue 涉及）
   - 手动激活技能（#21165）、禁止 agent 委托子代理（#21409）、阻止破坏性命令（#22672）——开发者希望更精确地控制 agent 行为边界。

2. **子代理（Subagent）可靠性与可观测性**
   - 子代理轨迹可通过 `/chat share` 分享（#22598）、子代理上下文纳入 bugreport（#21763）、MAX_TURNS 误报 GOAL 成功（#22323）——涉及调试和审查体验。

3. **上下文与 Token 效率优化**
   - AST 感知工具研究（#22745, #22746, #22747）、Tactful Extraction 分词提取（#19561）、文件型待办替代 WriteToDo（#18836）——token 成本是长期痛点。

4. **终端体验与稳定性**
   - 交互式 prompt 挂起（#22465）、终端 resize 闪烁（#21924）、错误 `\n` 转义（#22466）、stdin 输入卡死——终端侧体验问题进入集中反馈期。

5. **安全与权限**
   - 零依赖沙箱设计（#19873）、策略目录权限校验（#29333）、破坏性操作劝阻（#22672）——官方在 PR 侧与 Issue 侧同步加强了安全布局。

## 开发者关注点

以下是开发者反馈中反复出现的高频痛点：

- **子代理挂起/假成功**：多个 Issue（#21409, #22323）报告子代理要么无限挂起、要么在中断后误报 `GOAL` 成功，严重干扰工作流，社区迫切需要修复。
- **Agent 自主性不足**：技能和子代理不会自动被使用（#21968），需要显式指令才能触发——与手动激活的呼声（#21165）形成呼应。
- **配置覆盖失效**：浏览器代理完全忽略 `settings.json` 的 `maxTurns` 等覆盖配置（#22267），用户对“配置不生效”的挫败感强烈。
- **进程不退出**：PR #29435 与 #29436 共同针对 stdin 未清理和 `@` 引号内正则回溯导致的进程阻塞/CPU 100%，这是日常管道使用的关键稳定性问题。
- **环境兼容性**：Wayland 下浏览器子代理失败（#21983）、symlink agent 不识别（#20079）等边界场景成为小规模但持续存在的痛点。

> **分析师简评**：当前社区重心已从"功能扩展"转向"Agent 可靠性治理"。技能激活、子代理状态透明化、以及进程稳定性是三大

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 2026-09-29

## 今日速览

今日发布了 v1.0.90-1 补丁版本，主要修复了 MCP OAuth 缓存 token 复用和会话恢复后撤回提示残留的问题。社区方面，认证相关故障（token 停止刷新、每小时授权错误）成为最集中的痛点，同时 Nix/NixOS 环境下的 Bash 工具兼容性问题持续发酵，多个 MCP OAuth 流程缺陷也受到广泛关注。

## 版本发布

过去 24 小时内共发布 5 个版本（v1.0.90-1 → v1.0.89-6），值得关注的更新如下：

- **[v1.0.90-1](https://github.com/github/copilot-cli/releases)**（最新补丁）
  - **修复**：MCP OAuth 登录（如 Datadog）现在会复用仍然有效的缓存 token，避免重复授权
  - **修复**：撤回的运行中提示（withdrawn running prompts）在会话恢复后保持移除状态

- **v1.0.90-0**：包含多项修复和变更
- **[v1.0.89](https://github.com/github/copilot-cli/releases)**（2026-09-28）
  - 点击 `ask_user` 和 elicitation 表单输入框可聚焦并将光标置于点击位置
  - 新增对 Claude Code 规则文件（`.claude/rules`）的支持，作为自定义指令来源
  - 侧边栏会话在完成一轮未查看的对话后显示蓝点提示
- **v1.0.89-6**
  - **改进**：PR 创建现在遵循仓库的 Pull Request 模板，保留必需章节和清单结构
  - **改进**：支持通过 `TGREP_FILE_COUNT_THRESHOLD` 配置自动索引搜索的激活阈值
  - **修复**：Shell 输出不再显示尾随的命令完成元数据

## 社区热点 Issues

以下 10 个 Issue 在过去 24 小时内讨论最活跃或影响面最广：

1. **[#4929 进程内认证 token 停止刷新，所有提示失败直至重启](https://github.com/github/copilot-cli/issues/4929)**
   - 长期运行的 Copilot CLI 进程永久失去认证能力，每次提示和 `/ask` 都返回授权错误，执行 `/login` 也无法恢复，只有重启后恢复会话才能继续操作。13 条评论，均为 open 状态，疑似与 #4971 同源。

2. **[#4971 每小时遭遇一次授权错误，`/login` 无效](https://github.com/github/copilot-cli/issues/4971)**
   - 用户报告每小时固定出现 `Authorization error. Your credentials may be expired or invalid`，即使 `/login` 成功完成也无法解决，`mcp reload` 同样无效。该问题与 #4929 相互印证，指向进程级 token 缓存或刷新机制的缺陷。

3. **[#1274 CLI 持续收到 400 错误：invalid request body](https://github.com/github/copilot-cli/issues/1274)**
   - 近 20 次针对代码审查的请求约 95% 以 400 错误告终，用户怀疑是服务端校验或 CLI 请求构造存在缺陷。已开放近 8 个月，29 条评论、12 个 👍，是长期未解决的高热问题。

4. **[#1838 Nix/direnv 环境下因子

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-29）

## 1. 今日速览

昨日发布补丁版本 v1.18.33，主要修复 Cloudflare AI Gateway 超时、MCP 浏览器启动报错及调试输出敏感信息泄露等问题。社区讨论热度集中在 GPT-5.6 Sol 模型服务器过载（#39653）与 plan/build 模式切换失效（#38655）两个问题上，此外多项围绕 UI 体验与错误处理优化的 PR 正在积极迭代中。

## 2. 版本发布

### v1.18.33
- **Bugfixes**
  - Cloudflare AI Gateway 模型现在遵循 provider 的响应与流式超时设置（@danlapid）
  - MCP 浏览器启动器立即退出时，现在会正确上报启动失败
  - 调试配置输出现在会脱敏凭证与敏感请求头
  - Gemini thinking 相关修复（内容截断，详见 Release 页面）

🔗 https://github.com/anomalyco/opencode/releases

## 3. 社区热点 Issues

挑选了 10 个评论数最多、讨论最活跃的 Issue：

**1. GPT-5.6 Sol 服务器过载错误**（#39653，已关闭）
@akhansari 报告 Sol 模型连续数小时返回 "server overloaded" 错误，而 Pi 和 Codex 正常。获得 11 个 👍，17 条评论，说明受影响用户较多，可能为上游容量问题。

🔗 https://github.com/anomalyco/opencode/issues/39653

**2. Ollama 本地模型响应异常**（#37762，已关闭）
@jcrosby10 在 Windows 11 上使用 Ollama（64GB RAM / 4GB VRAM）准备邮件时遇到问题，云模型正常。社区 9 条评论讨论本地模型配置与性能瓶颈。

🔗 https://github.com/anomalyco/opencode/issues/37762

**3. `variants` 子配置命名规范文档歧义**（#39256，已关闭）
@linghengqian 要求澄清 model 文档中 `variants` 子配置使用 camelCase 还是 snake_case。6 条评论，反映文档规范对配置正确性的重要影响。

🔗 https://github.com/anomalyco/opencode/issues/39256

**4. 最新更新后无法切换 plan/build 模式**（#38655，已关闭）
@saharmestiri-blip 报告 v1.18.4 之后 build 模式被默认激活，无法切回 plan。6 条评论，属于影响核心工作流的高优回归。

🔗 https://github.com/anomalyco/opencode/issues/38655

**5. 【功能】按项目分组的会话标签页**（#51759，开启）
@hope-999 提议将当前扁平的顶部标签按项目分组，解决多项目会话混杂的问题。5 条评论，是新 UI 上线后呼声较高的体验改进。

🔗 https://github.com/anomalyco/opencode/issues/51759

**6. 响应延迟长达 10 分钟**（#39527，已关闭）
@kakakzka2-design 报告 OpenCode 回复极慢，重装与升级均无效。5 条评论，可能与系统环境或网络配置相关。

🔗 https://github.com/anomalyco/opencode/issues/39527

**7. 【功能】SIMPLE CHAT 纯聊天模式**（#39399，已关闭）
@0wwafa 希望 opencode.json 配置 simple chat 后，不再向模型发送额外的 prompt（如系统指令）。5 条评论，反映部分用户对极简对话模式的需求。

🔗 https://github.com/anomalyco/opencode/issues/39399

**8. 网络错误快速失败与简洁错误输出**（#39771，已关闭）
@openchat-ai 指出在弱网环境下（如 China 访问 GitHub HTTPS 被阻断），工具会卡在 60-120s 超时而无快速失败机制。4 条评论，对网络容错提出更高要求。

🔗 https://github.com/anomalyco/opencode/issues/39771

**9. NVIDIA API 路由返回 HTTP 429**（#37666，已关闭）
@TL8125 发现 NVIDIA GLM-5.2 经 OpenCode 调用返回 429，直连 API 正常。4 条评论，疑与路由鉴权或请求头处理有关。

🔗 https://github.com/anomalyco/opencode/issues/37666

**10. 免费模型 token 消耗异常**（#37748，已关闭）
@1273693845 质疑 "Kimi K3 (2x usage)" 标签与实际计费不符，$5.85 的消耗被近似计算。4 条评论，涉及免费额度计费透明度问题。

🔗 https://github.com/anomalyco/opencode/issues/37748

## 4. 重要 PR 进展

挑选 10 个功能/修复价值较高的 PR：

**1. 修复 $..$ 与同行 $$..$$ 数学公式渲染**（#51989，开启）
@wulart 在 #34850 移除旧匹配器后重新引入行内数学渲染，修复聊天输出中 LaTeX 公式无法显示的问题，同时避免货币符号误判。关闭 5 个相关 issue。

🔗 https://github.com/anomalyco/opencode/pull/51989

**2. 跨轮次保持图片裁剪稳定**（#51986，开启）
@carson2222 修复 `boundImages` 每轮重新计算裁剪阈值导致的图片集不一致问题，避免 25MiB/15MiB 阈值在同会话内反复抖动。

🔗 https://github.com/anomalyco/opencode/pull/51986

**3. Human-in-the-loop 确认级别（已关闭）**（#51967）
@arifonurmamade1-ops 实现 5 级人工确认（AUTO/SAFE/BALANCED/STRICT/CUSTOM），作为现有权限系统的叠加层。虽已关闭（可能未合并），但代表了权限治理方向的重要探索。

🔗 https://github.com/anomalyco/opencode/pull/51967

**4. Messages 路由启用默认缓存**（#51981，开启）
@opencode-agent 为 Alibaba、Cloudflare AI Gateway、Meta、MiniMax、Moonshot、ZAI Coding Plan 六个路由启用默认缓存策略，降低延迟与成本。

🔗 https://github.com/anomalyco/opencode/pull/51981

**5. 推理期间保持 Working 状态**（#51090，开启）
@opencode-agent 修复了仅含推理（reasoning）的轮次中错误显示 "Used 1 Thought" 并隐藏 Working 的问题，提升长时间推理时的反馈体验。

🔗 https://github.com/anomalyco/opencode/pull/51090

**6. 中文本地化术语对齐**（#51983，开启）
@imyu37 修复 #50204 合并时遗留的 4 处术语错误，确保 zh/zht 与既定术语体系一致。涉及文档与 UI 翻译质量。

🔗 https://github.com/anomalyco/opencode/pull/51983

**7. 暴露模型推理能力标记**（#50283，开启）
@zhengkaics 修复 models.dev 目录中 `reasoning` 标记被丢弃、应用侧硬编码为 false 的问题，使模型推理能力在 UI 中正确呈现。关闭 #50257。

🔗 https://github.com/anomalyco/opencode/pull/50283

**8. MCP OAuth 刷新单飞（single-flight）**（#51979，开启）
@holny 修复远程 MCP 服务器刷新令牌被并发使用导致失效的问题，将并行刷新合并为单个请求。关闭 #49773。

🔗 https://github.com/anomalyco/opencode/pull/51979

**9. 显示 provider 原始错误体**（#51978，开启）
@rekram1-node 改进错误处理：当 provider 返回不含 `error.message` 的错误体时，不再只显示 "HTTP N"，而是展示原始错误说明，便于排查问题。

🔗 https://github.com/anomalyco/opencode/pull/51978

**10. Shell 工具环境变量对齐 agent 约定**（#51975，已关闭）
@rekram1-node 为 shell 工具子进程注入 agent/会话标识环境变量，便于脚本识别调用方，且不增加模型 prompt 冗余。

🔗 https://github.com/anomalyco/opencode/pull/51975

## 5. 功能需求趋势

从全部 Issue 中提炼出以下社区重点关注方向：

- **会话管理 UI 改进**：项目分组标签页（#51759）、最近关闭标签恢复（PR #51973）、桌面窗口顶部拖拽区域（#41646）——新 tabbed UI 推出后，用户对多会话信息架构与窗口操作体验提出了更细致的要求。
- **文档规范与配置澄清**：`variants` 子配置 camelCase/snake_case 的歧义（#39256/#51987）连续出现，社区对配置项命名规范的文档化需求强烈。
- **轻量对话与简洁模式**：SIMPLE CHAT（#39399）等需求说明部分用户希望减少系统提示词干扰，获得更直接的对话体验。
- **持久性与稳定性增强**：doom_loop 跨步骤触发（#51965）、图片内存滚动窗口（#48095）等，关注长时间会话的资源管理与防崩溃能力。
- **文档生成与预览**：WYSIWYG 预览编辑 docx/HTML/Markdown（#39611），显示用户对非代码文档工作流的需求。
- **多语言与本地化**：zh/zht 术语修正（#39202、PR #51983），中文社区的活跃度持续提升。

## 6. 开发者关注点

- **上游服务可靠性**：GPT-5.6 Sol 服务器过载（#39653）、gemini-3.6-flash 上游错误（#39293）等，反映免费/第三方模型服务的不稳定已成为日常使用的主要障碍。
- **免费额度判定异常**：用户反馈"免费额度已用尽"误报（#39188）、自定义 agent 的 deny 策略导致免费模型不可用（#50627），额度计算与权限系统联动存在 bug。
- **网络容错能力不足**：弱网环境缺乏快速失败与回退（#39771）、ENETUNREACH 连接问题（#39316），开发者需要更健壮的错误恢复机制。
- **卡死与响应延迟**：多个 Issue 报告"不回复"或"数分钟才响应"（#39527、#38500、#39316），虽可能与本地配置有关，但仍是影响口碑的高频痛点。
- **平台适配细节**：Windows 快捷键冲突（#38585）、macOS 窗口拖拽困难（#41646）、主题不随系统切换（#38506）等平台相关体验问题不断累积。
- **计费与 token 透明度**：Kimi K3 的 "2x usage" 计费不符（#37748）、缓存记录缺少会话标识（#37598），开发者对用量数据的准确性和可解释性越来越敏感。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-29

## 今日速览

今日社区焦点集中在 **Managed Agent 架构演进**（Stage D/G 规划、Hosted MCP 运行时）与 **上下文 token 治理**（结构化 Auto Memory 就绪度跟踪、非对话上下文开销）两大方向。值得关注的是，多个 P2 级别的 bug（如 Remote-SSH 下 `EPIPE` 崩溃、辅助模型 baseUrl 凭证泄露）仍在持续讨论中，而 Runtime Broker 的整数解析修复和 Shell 输出捕获测试已进入 PR 阶段。

---

## 社区热点 Issues（10 个）

### 1. Managed Agent 双路径架构提案（评论 37）
**#12380** — [proposal(serve): Define Managed Agent dual-path architecture and staged delivery](https://github.com/QwenLM/qwen-code/issues/12380)
> 核心提案：定义分阶段 Managed Agent 架构，保留现有 TypeScript agent loop，模型推理与工具环境供给解耦，Sessions 获得持久所有权、Workspace 绑定、可恢复工具执行和稳定 WebSocket 连接。评论数最高，说明社区对架构方向高度关注。

### 2. Remote-SSH 下所有 `/session` 请求失败（评论 17）
**#12416** — [Remote-SSH: every POST /session fails with `write EPIPE`](https://github.com/QwenLM/qwen-code/issues/12416)
> Companion 0.24.2 在 Remote-SSH 场景下创建 session 即报 `write EPIPE` / `BridgeChannelClosedError`。已持续 8 天，开发者使用远端开发工作流的核心阻塞问题。

### 3. ACP Bridge 双引擎集成阶段 B（评论 13）
**#12737** — [feat(acp-bridge): Stage B host integration for paired Legacy and Managed engines](https://github.com/QwenLM/qwen-code/issues/12737)
> 调度决策（2026-09-28）：本地 `qwen serve` Managed 执行优先级下调，跟随 Hosted Managed 首个交付切片。保留已合并的 paired-host 基础、M1 保护和 M3 配置兼容。

### 4. 非对话上下文 token 治理跟踪（评论 11）
**#12028** — [tracking(core): non-conversation context token governance](https://github.com/QwenLM/qwen-code/issues/12028)
> 系统提示词、内置工具 schema、`QWEN.md` 和技能列表在每次请求中都会产生 token 开销。大上下文模型下这部分可能超过对话本身，社区在讨论如何治理。

### 5. 结构化 Auto Memory 就绪度跟踪（评论 7）
**#12947** — [Track structured Auto Memory rollout readiness on main](https://github.com/QwenLM/qwen-code/issues/12947)
> Auto Memory 落地前的正确性、有效性和验证工作的收尾跟踪。关联 #10151（结构化召回方案）和 #12028（token 治理伞形议题）。

### 6. 辅助模型选择器 NUL 分隔 baseUrl 导致凭证泄露（评论 6）
**#12856** — [Aux-model selectors persist a NUL-separated baseUrl that every public surface emits verbatim](https://github.com/QwenLM/qwen-code/issues/12856)
> 五个设置键（`visionModel`、`imageModel`、`advisorModel`、`fastModel`、`compactionModel`）以 `authType:<id>\0<baseUrl>` 格式持久化模型选择器。若 baseUrl 内嵌 userinfo（如 `https://user:sk-...@host/v1`），该凭证会原样暴露，属于安全问题。

### 7. Auto Memory 结构化召回与无损迁移提案（评论 6）
**#10151** — [Improve Auto Memory with structured recall and lossless migration](https://github.com/QwenLM/qwen-code/issues/10151)
> 社区讨论中的改进方案：保留现有 Auto Memory 作为兼容回退，为每个记忆文件添加结构化检索元数据（如 `ca...` 截断），实现按需无损召回。

### 8. Email 渠道支持（评论 6）
**#8281** — [Add an Email channel with IMAP and SMTP support](https://github.com/QwenLM/qwen-code/issues/8281)
> 社区长期（约 2 个月）关注的集成需求：通过专用邮箱与 Qwen Code agent 通信。首版计划提供 IMAP/SMTP 的最小功能集，与背景自动化路线图关联。

### 9. AUTO 模式下用户审批无法覆盖（评论 4）
**#11019** — [AUTO mode: user approvals never reach the classifier](https://github.com/QwenLM/qwen-code/issues/11019)
> 生产环境数据变更场景中，用户三次确认后工具调用仍被阻断。审批信号未到达分类器，且会话重建后审批模式回退为 AUTO。此问题涉及安全关键流程。

### 10. Web Shell 轨迹记录就地检查器（新 PR）
**#12971** — [feat(web-shell): inspect trajectory records in place](https://github.com/QwenLM/qwen-code/pull/12971)
> 在轨迹列表下方新增只读记录检查器，支持选择请求、工具调用、消息等记录，查看已加载转录中的字段，切换相关视图、展开有限内容并复制显示。Web Shell 可观测性增强。

---

## 重要 PR 进展（10 个）

### 1. Code Mode 启用 workflow 时保留缓存
**#12933** — [fix(core): preserve Code Mode cache when enabling workflow](https://github.com/QwenLM/qwen-code/pull/12933)
> 修复加载内置 review 技能导致 workflow 被意外启用的行为。显式 eager/visible 配置保持不变，避免模型已有的工具声明被改变。涉及缓存保留与工具发现逻辑。

### 2. Runtime Broker 精确读取整数
**#12972** — [fix(runtime-broker): read ready, seed and request integers exactly](https://github.com/QwenLM/qwen-code/pull/12972)
> Java runtime broker 现在通过统一规则精确读取协议整数：仅当 JSON 解析器返回 `Integer`/`Long` 等类型（携带精确值）时才计数。修复 worker 握手和存储记录的边界条件。

### 3. 基于 models.dev catalog 解析模型限制
**#11959** — [feat(core): resolve model limits and modalities from a models.dev catalog](https://github.com/QwenLM/qwen-code/pull/11959)
> 新增 models.dev 目录用于推断上下文窗口、输出限制和输入模态。CLI 内置裁剪快照，后台刷新使用 24 小时缓存 + ETag。显式模型配置优先级最高，缺失字段自动回退。

### 4. 本地 workspace-agent 协作
**#11206** — [feat(agents): add local workspace-agent collaboration](https://github.com/QwenLM/qwen-code/pull/11206)
> 在 #12854 持久化状态基础上，daemon 可启动/恢复 agent turns、绑定任务级 session、暴露可信 workspace API 并流式推送进度。Web Shell 可观察 agent 执行过程。

### 5. Private Hosted MCP 运行时
**#12946** — [feat(managed-agent): Implement private Hosted MCP runtime (H1)](https://github.com/QwenLM/qwen-code/pull/12946)
> 新增 `hosted-workspace-mcp/1` profile（Stage H1），包含 Hosted → Broker → Runtime 完整接线。Runtime 持有 stdio、Streamable HTTP、SSE 连接和凭证。模型获得固定工具 schema 并使用常规持久化工具生命周期。

### 6. 保留任务生命周期信号
**#12917** — [fix(memory): preserve task lifecycle signals](https://github.com/QwenLM/qwen-code/pull/12917)
> 关闭 #10183 延期的背景内存生命周期债：成功的 User Dream 独立于 best-effort 调度器元数据写入发出成功遥测。测试覆盖失败/取消的 planner 结果、取消时间点在 manifest 之前的场景。

### 7. 桥接工具调用参数预验证
**#12901** — [fix(core): pre-validate bridged tool_call arguments against the target schema](https://github.com/QwenLM/qwen-code/pull/12901)
> `tool_call` 桥接在 `resolveDeferredToolCall` 内部通过目标工具的 `validateToolParams` 预验证参数，无效调用以 `INVALID_...` 拒绝，不再进入调度器。

### 8. 收紧结构化召回契约
**#12916** — [fix(memory): tighten structured recall contracts](https://github.com/QwenLM/qwen-code/pull/12916)
> 保持密集 body-window 选择精确性的同时，用索引重叠检查替换重复的全命中扫描，统一使用规范 memory-scope 列表，并预留关键词词汇格式化开销。

### 9. 事件回放 review 收尾
**#12968** — [fix(managed-agent): Close the post-merge review of event replay](https://github.com/QwenLM/qwen-code/pull/12968)
> 跟进 #12840（事件重放, Stage D3）合并后的 7 条 review 建议（R1-1~R1-7），并补上 triage bot 提出的覆盖缺口。身份回填不再遍历内存中所有 Session。

### 10. Windows UIAccess 工作者签名
**#12442** — [fix(cua): sign Windows UIAccess workers before publishing](https://github.com/QwenLM/qwen-code/pull/12442)
> 在打包前对 Windows UIAccess worker 签名，从打包产物干净安装 SDK 并验证部署签名。生产发布需要可信代码签名证书。

---

## 功能需求趋势

| 方向 | 相关 Issue/PR | 热度 |
|------|--------------|------|
| **Managed Agent 架构** | #12380, #12737, #12946, #12867, #12952 | 🔥🔥🔥 极高 |
| **上下文 token 治理与内存优化** | #12028, #12947, #10151, #12853, #12916, #12917 | 🔥🔥🔥 极高 |
| **Durable/持久化执行** | #12899, #12956, #12972 | 🔥🔥 高 |
| **Web Shell 可观测性与 UI 修复** | #12971, #12919, #9305 | 🔥🔥 中高 |
| **安全与凭证管理** | #12856, #11019 | 🔥🔥 中高 |
| **远程/SSH 场景可靠性** | #12416 | 🔥🔥 中高 |
| **多渠道接入（Email 等）** | #8281 | 🔥 中 |
| **Code Mode 懒加载与并发** | #12898, #12931, #12933 | 🔥 中 |

**解读**：Managed Agent 相关条目占据社区讨论的主流，从架构定义（#12380）到具体实现（#12946、#12968），说明 Qwen Code 正在为多智能体协作和 Agent 持久化运行打基础。另一个显著趋势是 **token 治理**——社区对非对话内容（系统提示、工具描述、记忆）造成的 token 开销越来越敏感，结构化 Auto Memory 正在从提案走向落地。

---

## 开发者关注点

### 痛点与高频问题

1. **Remote-SSH 场景不可用**（#12416）
   - Companion 0.24.2 在 Remote-SSH 下所有 session 创建均失败，开发者无法在远程开发环境中使用 Qwen Code，P1 优先级，持续 8 天未解决。

2. **会话审批机制失效**（#11019）
   - AUTO 模式下用户审批无法覆盖工具调用，生产环境数据变更受阻；会话重建后审批模式回退为 AUTO，存在安全风险。

3. **模型选择器凭证泄露**（#12856）
   - 辅助模型 baseUrl 中的 userinfo 凭证通过 NUL 分隔格式持久化并在公共界面原样暴露，涉及 5 个设置键。

4. **系统提醒标签截断消息**（#12961）
   - 用户文本中未闭合的 `<system-reminder>` 标签会静默截断消息其余部分，影响多轮对话的上下文完整性。

5. **无频率门控的自动记忆提取**（#11471）
   - 自动记忆提取缺少频率控制，且 no-op 运行会让 cursor 留在原位，每个 turn 都重新 fork，造成不必要的性能开销。

6. **模型温度硬编码**（#12928）
   - 内部辅助请求硬编码 `temperature: 0.2`，与部分模型 API（如 gpt-6-astra）不兼容，返回 HTTP 400。

### 社区诉求特征

- **架构透明度**：开发者希望明确 Managed Agent 的交付节奏和本地/托管优先级的调度决策（#12737）。
- **可观测性**：轨迹记录检查器（#12971）、后台 agent 列表（#10954）等 PR 显示社区对调试和监控能力有持续需求。
- **安全底线**：凭证泄露（#12856）、审批绕过（#11019）等安全问题获得大量关注，优先级为 P2 及以上。
- **资源效率**：token 治理（#12028）和记忆提取频率（#11471）反映开发者对运行成本的敏感度在提升。

---

> 以上为 2026-09-29 日社区动态摘要。完整数据可访问 [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*