# AI CLI 工具社区动态日报 2026-10-13

> 生成时间: 2026-10-13 04:24 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-13）

---

## 1. 生态全景

当前 AI CLI 工具已从"单次对话生成代码"正式迈入**工程化 Agent 阶段**——各家都在集中解决沙箱权限、长会话可靠性、多模型路由与子代理调度等基础设施问题，而非单纯比拼模型能力。社区情绪呈现明显的"功能先行、治理滞后"特征：文件写入、上下文压缩、MCP 集成等能力上线后，随之而来的权限误伤、静默丢上下文、进程泄漏等副作用成为最集中的吐槽点。与此同时，**多 Agent 协作与可编程权限链路**正成为下一代差异化竞争高地。整体看，该赛道仍处于快速纠偏与迭代期，尚无工具在稳定性与可治理性上建立绝对领先。

---

## 2. 各工具活跃度对比

> 注：下表数据基于各工具日报中列出的热点条目统计，并非 GitHub 全量数据。

| 工具 | 热点 Issues | PR 更新 | Release | 社区热度峰值 |
|---|---|---|---|---|
| **Claude Code** | 10 个（含 78👍 / 40 评论） | 无 | 无 | #16550 文件写入：40 评论、78 👍 |
| **OpenAI Codex** | 7 个 | 24 个 PR 合并（10/12） | 无 | #48195 守护进程：132 👍；#30408 MCP 泄漏：53 评论 |
| **Gemini CLI** | 10 个 | 10 个（1 修复 + 9 开放） | v0.65.0-nightly | #22323 MAX_TURNS 误报：13 评论 |
| **Copilot CLI** | 10 个 | 无 | 4 个（v1.0.96 → v1.0.97-2） | #970 Gatekeeper：22 👍 |
| **Kimi Code CLI** | — | — | 无 | 过去 24 小时无活动 |
| **OpenCode** | 10 个 | 10 个 | 无 | #7602 跨模型 Fallback：120 👍、32 评论 |
| **Qwen Code** | 10 个 | 10 个 | v0.25.1-nightly | #12380 双路径架构：56 评论 |

**简读**：OpenAI Codex 合并 24 个 PR 显示修复力度最大；Copilot CLI 一夜间发 4 个版本，迭代节奏最快；OpenCode 以 120 👍 的 Fallback 需求成为今日"最强社区呼声"；Kimi CLI 处于静默期。

---

## 3. 共同关注的功能方向

### 3.1 模型路由与降级灵活性（最强烈共性需求）
- **OpenCode**：#7602 要求跨模型 Fallback（模型 A 失败自动切模型 B），120 👍 为今日全生态最高赞。
- **Claude Code**：#69002 为 auto mode 分类器配置独立备用模型，避免单点故障。
- **Copilot CLI**：BYOK 子 Agent 使用错误 wire API（#5103）、短模型名无法匹配（#5127），多模型路由实现粗糙。
- **Qwen Code**：#14004 直接质疑"工具厂商同时卖模型订阅"的利益冲突。

### 3.2 沙箱与权限链路可控性
- **Claude Code**：Worktree 隔离误拒绝合法命令（#95122）、PreToolUse hook 的 `allow` 裁决被覆盖（#100385）、桌面权限不一致（#91495）。
- **Gemini CLI**：sandbox 命令解析 bug 导致 per-command 规则失效（PR #29726）；零依赖沙箱提案（#19873）。
- **Copilot CLI**：preToolUse hook 的 "ask" 决策被错误拒绝（已在 v1.0.97-0 修复）；终端安全策略阻碍会话恢复（#5123）。

### 3.3 子代理 / 多 Agent 可靠性
- **Gemini CLI**：#22323 MAX_TURNS 中断误报成功、#21409 通用 agent 永久挂起、#22267 Browser Agent 忽略配置，子代理体系问题最集中。
- **Qwen Code**：#13785 公共 API 增加代理身份维度、#13902 Agent 身份投递、H4 工作流子运行时（PR #13858）。
- **Copilot CLI**：#5124 `--agent` 启动后被静默取消。

### 3.4 MCP 生态深度兼容与稳定性
- **OpenAI Codex**：#30408 MCP 进程泄漏，RSS 达 9+ GB，53 评论。
- **Copilot CLI**：#5068 Entra 登录失败，MCP 多轮往返支持。
- **OpenCode**：MCP 401 后无法触发重新认证（PR #55013）。
- **Qwen Code**：You.com MCP 集成需求（#13987）。

### 3.5 长会话上下文管理与恢复
- **Claude Code**：#98747 idle compaction 静默丢弃上下文，无 opt-out。
- **Copilot CLI**：#5100 120 秒事件超时永久不可用、#5114 等待 5 小时仍无法继续。
- **OpenCode**：#54690 图片负载不计入上下文导致长会话 400、#54683 空输入工具调用挂起。
- **Gemini CLI**：#22186 get-shit-done 输出阶段反复崩溃。

### 3.6 Windows 平台体验
- **Claude Code**：Bash 工具 `\\` 折叠破坏路径与正则（#88561）。
- **OpenAI Codex**：WSL2 自动启动守护进程争议（#48195）、Windows Desktop 设置加载失败（#51917）。
- **OpenCode**：cmd.exe 子进程弹窗抢焦点（#52281）。
- **Copilot CLI**：终端安全策略循环死锁（#5123）。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 深度项目文件操作、细粒度权限链（hook / worktree / sandbox） | Anthropic 模型重度用户、长跑会话开发者 | 以**权限治理复杂度**为代价换取 Agent 自主性；社区最关心"能否直接写文件" |
| **OpenAI Codex** | 云任务、桌面端、MCP 重度集成 | ChatGPT/OpenAI 生态用户、桌面 GUI 偏好者 | **平台化**路线：Desktop + 云任务 + 守护进程，但"静默常驻"引发信任危机 |
| **Gemini CLI** | Subagent 体系（Browser Agent、codebase_investigator）、终端 UX 精细打磨 | 重度终端

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-10-13，来源：github.com/anthropics/skills）

---

## 一、热门 Skills 排行（关注度 Top 8 PR）

> 说明：以下 PR 当前均为 **Open** 状态，按社区讨论热度与代表性排序。

**1. mcp-builder 兼容性修复（#1742）**
- 功能：修复 `mcp>=2.0.0` 下 `streamable_http_client` 重命名及自定义 HTTP headers 配置方式变化导致的连接失败
- 热点：MCP 协议升级引发的生态连锁适配，是当前基础设施类最高频议题
- 状态：Open，持续更新至 2026-10-08
- 链接：https://github.com/anthropics/skills/pull/1742

**2. skill-creator 触发评测隔离与 Windows 修复（#1298）**
- 功能：修复技能触发评测中的误报/漏报——多 worker 命令探针竞争、Windows 下 select() 管道失效、运行时错误被误判为非触发
- 热点：直指官方 skill-creator 评测工具链的核心可靠性缺陷，与 Issues #556、#1352、#1383 互为印证
- 状态：Open（已持续 3 个月，更新至 2026-09-16）
- 链接：https://github.com/anthropics/skills/pull/1298

**3. ProofCore 智能合约审计（#1771）**
- 功能：新增 Web3 技能，对 Solidity/Rust 智能合约做静态分析，并将审计证明锚定到 TON 区块链
- 热点：首个区块链原生技能，社区关注 Web3 场景扩展；但垂直领域过窄，是否纳入官方仓库存疑
- 状态：Open（2026-09-15 创建，9 月 16 日后无更新）
- 链接：https://github.com/anthropics/skills/pull/1771

**4. md2video-audio 文档转视频（#1703）**
- 功能：零成本将 Markdown 文档编译为带拟人语音的 MP4 视频（Marp 幻灯片 + TTS）
- 热点：内容创作自动化方向，社区对"文档→多模态产物"的转换类技能兴趣浓厚
- 状态：Open
- 链接：https://github.com/anthropics/skills/pull/1703

**5. AWT 端到端测试（#822）**
- 功能：开源 AI Watch Tester，赋予 Claude 视觉与浏览器控制能力，零代码自动生成并执行 E2E 测试
- 热点：测试生成是社区长期高频需求方向；PR 跨度大（2026-03 至 09 仍在活跃更新）
- 状态：Open
- 链接：https://github.com/anthropics/skills/pull/822

**6. Notion 规格转实现 & 量化简历审计（#1245）**
- 功能：双技能提交——①将产品/技术规格拆解为可执行的 Notion 任务（含验收标准与进度跟踪）；②量化金融简历审计
- 热点：展示"工作流自动化 + 垂直领域质量审查"两条主线；但双技能捆绑提交增加了评审复杂度
- 状态：Open（更新至 2026-09-30）
- 链接：https://github.com/anthropics/skills/pull/1245

**7. document-typography 文档排版质检（#514）**
- 功能：自动修复 AI 生成文档的孤儿词换行、孤行标题（widow）、编号错位等排版问题
- 热点：直击 AI 生成文档的普遍痛点（Claude 生成的每份文档都受影响），讨论度高但已搁置较久
- 状态：Open（2026-03 后无实质更新）
- 链接：https://github.com/anthropics/skills/pull/514

**8. skill-creator 安全加固（#1961）**
- 功能：修复 eval viewer 的脚本逃逸、DNS rebinding、跨站 POST 与转义缺陷
- 热点：与 Issues #1394（XSS）联动，反映官方工具链安全审计正成为社区贡献新方向
- 状态：Open（2026-10-03 创建，更新活跃）
- 链接：https://github.com/anthropics/skills/pull/1961

---

## 二、社区需求趋势（来自 Issues）

**1. 安全与信任治理（最热议题）**
- **#492「anthropic/ 命名空间信任边界滥用」**（46 条评论）——社区技能借官方命名空间分发，诱导用户授予过高权限。这是当前社区最大声量的诉求：要求官方建立社区技能的安全审查与命名隔离机制。
  https://github.com/anthropics/skills/issues/492
- 同方向还包括 #1175（SharePoint 权限设计）、#1394（eval-viewer XSS）。

**2. 核心工具链稳定性（skill-creator / mcp-builder / claude-api）**
- #556「run_eval.py 触发率恒为 0%」（12 条评论，7 👍）
- #1352「并行 worker 交叉匹配 UUID 导致假阴性」
- #1383「静默 benchmark 失败、Windows 触发评测损坏」
- #1390「mcp-builder evaluation.py 对所有真实服务器错误打分 0/N」
- #1487「claude-api 技能单次注入 ~156k tokens 耗尽上下文」
- 结论：官方自带 Skill 的评测链路可信度不足、token 效率失控，是阻碍用户信任的核心矛盾。

**3. 企业级能力：组织内共享（#228，16 条评论，8 👍）**
- 用户期望 Skills 直接在组织内共享，而非手动下载 .skill 文件经 Slack/Teams 传递后再手动上传——预示着企业分发的产品化需求。

**4. 新 Skill 方向提案**
- **Agent 安全治理**：#412「agent-governance」（策略执行、威胁检测、信任评分、审计追踪）——已关闭但方向被 #492 承接放大
- **上下文压缩**：#1329「compact-memory」（符号化紧凑表示法降低长程 agent 记忆开销）
- **推理质量门控**：#1385「三阶段质量管线」（任务前校准→对抗评审→交付验证）

**5. 插件去重问题（#189，9 👍）**
- `document-skills` 与 `example-skills` 安装后内容重复，污染上下文窗口——反映官方仓库插件边界划分不清晰。

---

## 三、高潜力待合并 Skills（近期可能落地）

| PR | Skill | 潜力分析 |
|---|---|---|
| [#1961](https://github.com/anthropics/skills/pull/1961) | skill-creator 安全加固 | 修复已被社区审计确认的 XSS/逃逸漏洞，安全类修复通常优先合入 |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder MCP>=2 适配 | MCP 协议升级是硬性兼容需求，阻塞所有下游用户，合入概率高 |
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评测修复 | 对应多个高赞 Issue（#556/#1352/#1383），官方修复压力大 |
| [#1980](https://github.com/anthropics/skills/pull/1980) | webapp-testing 消除 shell=True | CWE-78 命令注入修复，小而明确的安全改进，易合入 |
| [#1977](https://github.com/anthropics/skills/pull/1977) | algorithmic-art wrapAround 修复 | 明确 bug 修复（取模边界），附带 Issue 引用，典型 quick-win |
| [#822](https://github.com/anthropics/skills/pull/822) | AWT 端到端测试 | 长期活跃维护，测试类高需求，但体量大、评审周期长 |
| [#1771](https://github.com/anthropics/skills/pull/1771) | proofcore-contract-auditor | 垂直度高但功能完整，若官方有意拓展 Web3 场景则可能纳入 |

---

## 四、Skills 生态洞察

**当前社区最集中的诉求是：在官方 Skill 工具链（skill-creator/mcp-builder/claude-api）评测失真、token 失控、安全漏洞频发的背景下，社区一边积极修复与加固官方基础设施，一边推动安全治理机制（命名空间隔离、技能审计）的建立——即"先让官方工具可信，再谈生态繁荣"。** 与此同时，新 Skill 供给呈现明显的文档处理（DOCX/ODT/PDF/排版）与测试生成（AWT/E2E）双主线，但任何新 Skill 的信任门槛正在变高，社区开始用安全审计的眼光审视每一份提交。

---

# Claude Code 社区动态日报 — 2026-10-13

数据来源：github.com/anthropics/claude-code

## 今日速览

- 今日无新版本 Release，但 Issue 区讨论热度不减：最受关注的仍是 **#16550「允许 Claude 直接写/更新项目文件」**，获 78 👍 与 40 条评论，社区需求强烈。
- 沙箱/Worktree 隔离的「误拒绝」、模型安全护栏误报、桌面端权限不一致，成为今日开发者反馈最集中的三大痛点。

---

## 版本发布

过去 24 小时无新版本 Release，本节从略。

---

## 社区热点 Issues

以下 10 个 Issue 最能代表今日社区讨论焦点：

### 1. [FEATURE] Allow Claude to Write/Update Project Files  
**#16550** | 评论 40 | 👍 78  
这是当前社区呼声极高的功能请求：用户希望 Claude 在会话中能直接写入/更新项目文件，减少反复审批和手工复制粘贴。虽然创建时间较早，但今日仍有大量新增讨论，说明需求长期未获满足。  
https://github.com/anthropics/claude-code/issues/16550

### 2. [BUG] 2.1.286 idle compaction 静默丢弃工作上下文  
**#98747** | 状态：CLOSED | 评论 22 | 👍 30  
用户报告自 2.1.286 起，空闲会话会在 prompt cache 过期前被自动压缩，且无 opt-out、无警告，日志中甚至标记为 "manual"。对于长跑会话，这等于丢失了构建好的上下文基础。虽已关闭，但社区普遍认为该行为不可接受。  
https://github.com/anthropics/claude-code/issues/98747

### 3. [BUG] 桌面内置浏览器忽略「允许所有网站」权限  
**#91495** | 评论 19 | 👍 23  
Claude Code Desktop 内置浏览器未遵守用户授予的全局站点权限，导致在桌面端进行浏览器自动化时频繁被拦截。该问题影响权限模型的统一性和可用性。  
https://github.com/anthropics/claude-code/issues/91495

### 4. [FEATURE] 为 auto mode classifier 配置独立模型（环境变量）  
**#69002** | 评论 4 | 👍 26  
当 auto mode 的分类器模型（如 Sonnet）故障时，整个运行会直接停止。用户希望允许通过环境变量指定备用模型，实现分类器降级。评论不多但赞数高，是成本与稳定性方向的高价值需求。  
https://github.com/anthropics/claude-code/issues/69002

### 5. [BUG] Bash 工具将 `\\` 折叠成 `\`，破坏正则和路径  
**#88561** | 评论 7 | 👍 4  
在 Windows 上，Bash 工具在命令文本传给 shell 前会把双反斜杠静默折叠为单反斜杠，且发生在单引号、双引号甚至 heredoc 内部，违反 POSIX 语义，直接影响正则表达式与网络路径处理。有复现步骤，社区关注度高。  
https://github.com/anthropics/claude-code/issues/88561

### 6. [BUG] 桌面全局「自动修复 CI」开关不适用于本地 gh 创建的 PR  
**#68083** | 评论 7 | 👍 8  
桌面端全局 toggle 声称自动修复 CI 并处理评论，但对从本地 `gh` 创建的 PR 完全不生效，也不会持久化到 `claude_desktop_config.json`。开发者认为桌面配置与 CLI 工作流明显脱节。  
https://github.com/anthropics/claude-code/issues/68083

### 7. [BUG] Opus 5.5 安全护栏误报，拦截 reasoning_extraction  
**#96118** | 评论 7 | 👍 2  
用户反馈在使用 Opus 5.5（1M）时，安全护栏将合法消息标记为违规，导致工具调用被中断，并出现 API Error。防护机制过于宽泛，已影响正常编码任务（部分用户提及 Fable 5.1 也存在类似问题）。  
https://github.com/anthropics/claude-code/issues/96118

### 8. [BUG] Worktree 隔离拒绝不含 git 的合法 Bash 命令  
**#95122** | 评论 3 | 👍 1  
自 2.1.272/2.1.273 起，在 worktree 隔离模式下，即使命令只操作 worktree 内路径且不含任何 git 调用，也会被误拒。循环、`$(…)`、变量赋值、heredoc 等场景 3 天内触发 75 次拒绝。属版本回归，且有完整复现。  
https://github.com/anthropics/claude-code/issues/95122

### 9. [BUG] Worktree 隔离覆盖 PreToolUse hook 的显式 allow  
**#100385** | 评论 1 | 👍 1  
即使用户通过 PreToolUse hook 返回 `permissionDecision: allow`，Worktree 隔离的 Bash 守卫依然拒绝命令。hook 裁决已记录在 transcript 中，但没有设置或 hook 输出可覆盖这一层强制拦截，权限链路存在矛盾。  
https://github.com/anthropics/claude-code/issues/100385

### 10. [BUG] Chrome 扩展权限弹窗在已批准会话中重复触发  
**#101654** | 评论 2 | 👍 0  
刚创建的新 Issue：使用 Claude in Chrome 扩展自动填写表单时，扩展自带权限弹窗反复出现，无视 Claude Code 本身的权限模式。涉及浏览器自动化的高频场景，可能是下一个热门问题。  
https://github.com/anthropics/claude-code/issues/101654

---

## 重要 PR 进展

过去 24 小时无 PR 更新，本节从略。

---

## 功能需求趋势

综合分析今日 Issues，社区最关注的功能方向集中在：

- **更自由的项目文件写入/更新**：期望 Claude 能直接修改项目文件，减少人工中转（#16550）。
- **模型路由与降级灵活性**：为分类器、main model 配置独立模型或 fallback，避免单点故障中断工作流（#69002, #78263）。
- **桌面端体验补齐**：快速从 Code 会话开启新会话、固定会话到侧边栏、插件/Mods 注册命令可被发现（#100913, #101671, #99691）。
- **沙箱权限可编程化**：允许 hook 或 mod 动态为单次 Bash 调用添加文件 deny 规则，以及让 hook 的 allow 裁决真正生效（#101377, #100385）。
- **权限提示收敛与一致性**：桌面浏览器权限、Chrome 扩展权限、“允许所有网站”等设置应统一遵循 Claude Code 的权限模式（#91495, #101654）。

---

## 开发者关注点

- **沙箱误伤问题严重**：Worktree 隔离连续出现误拒绝，且无法被显式 hook allow 覆盖，开发者对「可控性」信心下降。
- **上下文压缩不可控**：Idle compaction 静默丢弃上下文、不可关闭，对长会话用户是直接生产力损失。
- **安全护栏误报频繁**：Opus 5.5 / Fable 5.1 等模型将正常编码操作标记为违规，影响自动化任务可信度。
- **Bash 工具文本处理缺陷**：`\\` 折叠问题破坏 Windows 平台的 shell 语义，修复优先级应提高

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-13

## 今日速览

过去 24 小时无新版本发布，但核心仓库的 Issue 区持续高热：MCP 服务器进程泄漏问题（#30408）以 53 条评论成为社区最关注对象，而 CLI 默认自动启动后台守护进程的争议（#48195）获得 132 个 👍，是社区情绪最强烈的议题。与此同时，团队在 10 月 12 日集中合并了 24 个 PR，覆盖 TUI 修复、WSL 兼容性、权限恢复与网络代理安全加固，显示修复节奏明显加快。

## 社区热点 Issues

### 1. MCP server 进程泄漏 — 每个线程生成独立进程且从不清理（#30408）
- **评论 53 | 👍 16 | 状态 OPEN**
- **重要性**：长期存在的严重内存泄漏问题。Codex app-server 为每个新对话创建一套全局 MCP server 进程，但对话归档或关闭后从未终止这些进程，导致 RSS 可达 9+ GB。这直接影响所有重度使用 MCP 的桌面端用户。
- **链接**：https://github.com/openai/codex/issues/30408

### 2. CLI 应将 `daemon_auto_start` 设为默认关闭（#48195）
- **评论 16 | 👍 132（所有 Issue 中最高） | 状态 OPEN**
- **重要性**：自 0.157.0 起，CLI 会在 WSL2 等环境中自动启动一个持久化、自更新的后台守护进程，用户认为这过度侵入且默认行为不可接受。高赞数表明开发者对“静默常驻”机制普遍反感。
- **链接**：https://github.com/openai/codex/issues/48195

### 3. macOS Desktop：云任务重启后从侧边栏消失（#51675）
- **评论 20 | 👍 5 | 状态 OPEN**
- **重要性**：生产版本 26.1002.52244 中，云任务在重启后不显示于侧边栏，但 Dots 列表可列出，直接读取可恢复。影响用户对云任务持久性的信任，社区正等待 root cause 定位。
- **链接**：https://github.com/openai/codex/issues/51675

### 4. Windows Desktop：工作区设置加载失败仍阻塞新对话（#51917）
- **评论 17 | 👍 7 | 状态 OPEN**
- **重要性**：用户报告在更新至 26.1007.21434、build 13901 后，“Couldn't load workspace settings”错误依旧。这说明该问题跨版本未修复，持续阻碍 Windows 用户创建新对话。
- **链接**：https://github.com/openai/codex/issues/51917

### 5. Desktop/Browser Use：无法发现 Chrome 和内置浏览器标签页（#47270）
- **评论 18 | 👍 1 | 状态 OPEN**
- **重要性**：macOS 上 Browser Use 无法发现或控制任何浏览器标签页，属于核心自动化场景的功能缺失，评论数增长表明影响范围不小。
- **链接**：https://github.com/openai/codex/issues/47270

### 6. CLI 对 gpt-6.1-sol 报“不支持”但未解释资格条件（#49396）
- **评论 11 | 👍 7 | 状态 OPEN**
- **重要性**：Codex CLI 0.156.1 在 ChatGPT 登录状态下提示 gpt-6.1-sol 不受支持，却未说明用户需要何种套餐或条件。社区认为错误信息缺乏可操作的引导，影响新模型推广。
- **链接**：https://github.com/openai/codex/issues/49396

### 7. macOS：更新后“More details”选项从消息选择菜单消失（#52483）
- **评论 9 | 👍 9 | 状态 OPEN**
- **重要性**：26.1007.21159 版本中，原本可用的“更多详情”入口消失，影响用户查看模型完整输出。因涉及高频 UI 操作，

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-13

## 今日速览

今日发布 v0.65.0-nightly.20261013 版本，修复扩展加载失败时影响其他扩展启动的 CLI bug；社区讨论热度集中在 Subagent 的可靠性问题上——`MAX_TURNS` 中断被误报为成功、通用 agent 挂起、Browser Agent 配置不生效等反馈引发了较多讨论；安全与终端 UI 类 PR 也进入活跃审核期。

## 版本发布

**v0.65.0-nightly.20261013.g51617c1bc**  
- 修复：当某个扩展未通过 allowlist 检查时，不再阻塞其他扩展的加载（PR #29720，来自 @jesussamuel-byte）  
[查看完整 Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.65.0-nightly.20261012.g9b6e0265d...v0.65.0-nightl)

---

## 社区热点 Issues

1. **Subagent 到达 MAX_TURNS 后误报成功**（#22323，13 条评论）  
   `codebase_investigator` 子代理在未开始分析时即因达到最大轮次被中断，却向主 agent 返回 `status: "success"`、`Termination Reason: "GOAL"`，掩盖了真实的中断原因，影响上层调度决策。  
   [GitHub Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **利用模型 bash 亲和的零依赖 OS 沙箱**（#19873，9 条评论）  
   建议利用 Gemini 模型原生熟悉 POSIX 工具链的特性，设计零依赖沙箱与执行后意图路由，在安全与模型能力之间取得平衡。  
   [GitHub Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)

3. **通用 agent 挂起**（#21409，8 条评论，8 👍）  
   用户反馈一旦切换到通用子代理，即使简单操作（如创建文件夹）也会永久挂起，最长等待 1 小时后取消；手动指示模型不使用子代理则不出现，指向子代理调度/通信层面的阻塞问题。  
   [GitHub Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

4. **Gemini 不主动使用 skills 和 sub-agents**（#21968，7 条评论）  
   尽管用户配置了 gradle、git 等自定义 skills，模型在相关场景下仍不会主动调用，只有显式指令才使用，说明自主调度能力不足。  
   [GitHub Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

5. **Browser Agent 忽略 settings.json 覆盖**（#22267，4 条评论）  
   `AgentRegistry` 在初始化时正确读取并合并了 `settings.json` 中的 `maxTurns` 等覆盖项，但 Browser Agent 实际运行过程中完全忽略这些配置。  
   [GitHub Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

6. **增强 browser_agent 的会话接管与锁恢复能力**（#22232，4 条评论）  
   当前 `BrowserManager.ts` 遇到持久化会话锁（如已有实例或残留进程）时直接 fail-fast，缺乏自动接管与恢复机制，影响稳定性。  
   [GitHub Issue #22232](https://github.com/google-gemini/gemini-cli/issues/22232)

7. **browser subagent 在 Wayland 环境下失败**（#21983，4 条评论）  
   在 Wayland 显示服务器下运行 browser subagent 时异常退出，且终止原因被记录为 GOAL，误导排查方向。  
   [GitHub Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)

8. **使用原生文件工具创建和维护任务跟踪器**（#21000，4 条评论）  
   探讨用文件系统级工具替代现有的 `WriteToDo` 内存式任务跟踪，以降低 token 消耗并避免上下文腐烂。  
   [GitHub Issue #21000](https://github.com/google-gemini/gemini-cli/issues/21000)

9. **`~/.gemini/agents/` 下的 symlink 不被识别为 agent**（#20079，4 条评论）  
   用户通过 symlink 管理 agent 文件，但 CLI 不会将其识别为有效 subagent，限制了配置灵活性。  
   [GitHub Issue #20079](https://github.com/google-gemini/gemini-cli/issues/20079)

10. **get-shit-done output hook 导致崩溃**（#22186，3 条评论）  
    当 get-shit-done 输出快完成（打印用户摘要阶段）时，CLI 反复崩溃并弹出错误提示，疑似 hook 在输出结束阶段存在竞态或资源清理问题。  
    [GitHub Issue #22186](https://github.com/google-gemini/gemini-cli/issues/22186)

---

## 重要 PR 进展

1. **修复 grep 命令选项注入漏洞**（#29536，closed）  
   通过显式 `-e` 分隔符将搜索模式与命令选项隔离，修复 `git grep` 和系统 `grep` 中的命令行注入风险（CWE-88）。  
   [GitHub PR #29536](https://github.com/google-gemini/gemini-cli/pull/29536)

2. **防止快速连续 Ctrl-C 导致会话中毒**（#29728，open，p1）  
   修复用户快速按两次 `Ctrl+C` 时，第一次取消操作未完成、第二次直接触发 `/quit` 的竞态条件，避免会话状态被污染。  
   [GitHub PR #29728](https://github.com/google-gemini/gemini-cli/pull/29728)

3. **ChatRecordingService 增量 delta 修补与有界历史窗口**（#29568，closed）  
   以 append-only delta 替代全量 `$set` 消息重写，并对内存保留添加窗口上限，显著降低大规模会话的内存与带宽开销。  
   [GitHub PR #29568](https://github.com/google-gemini/gemini-cli/pull/29568)

4. **终端同步输出与 spinner 渲染隔离**（#29725，open，p2）  
   在终端复用器（如 tmux）中消除屏幕闪烁：为交互式 UI 增加同步输出包装器，并隔离 spinner 的渲染状态。  
   [GitHub PR #29725](https://github.com/google-gemini/gemini-cli/pull/29725)

5. **恢复终端宽度变化时的防抖静态刷新**（#29644，open，p1）  
   在 `AppContainer.tsx` 中恢复 `refreshStatic()` 对 `terminalWidth` 变化的 100ms 防抖响应，修复水平 resize 时 inline 模式下的渲染问题。  
   [GitHub PR #29644](https://github.com/google-gemini/gemini-cli/pull/29644)

6. **移除 VS Code 扩展启动时的 Marketplace 更新检查**（#29638，open）  
   删除 `vscode-ide-companion` 每次激活时的 `checkForUpdates()` 网络请求，减少扩展启动延迟与不必要的流量。  
   [GitHub PR #29638](https://github.com/google-gemini/gemini-cli/pull/29638)

7. **将纯空白 UTF-16/UTF-32 文件视为空**（#29722，open）  
   修复 `isEmpty()` 仅按 UTF-8 解码导致 NUL 残留、无法识别空白文件的 bug，统一不同编码下的文件空判断逻辑。  
   [GitHub PR #29722](https://github.com/google-gemini/gemini-cli/pull/29722)

8. **修复 `Ctrl+R` 反向搜索的 Unicode 高亮索引**（#29699，open）  
   当命令包含大小写展开后长度变化的 Unicode 字符（如 `İ`）时，`useReverseSearchCompletion` 计算高亮偏移多出 1，导致光标错位。  
   [GitHub PR #29699](https://github.com/google-gemini/gemini-cli/pull/29699)

9. **原子写入临时文件名超出 NAME_MAX 限制**（#29703，open）  
   写 215–255 字节的文件名时，临时文件追加 41 字节的 `<uuid>.tmp` 后缀，导致 `ENAMETOOLONG` 错误；修复为不超出 255 字节的上限。  
   [GitHub PR #29703](https://github.com/google-gemini/gemini-cli/pull/29703)

10. **修复 sandbox 命令解析错误识别为 trap**（#29726，open）  
   在 POSIX 平台，`wrapCommandForBackgroundPIDs` 将所有包装命令识别为 `trap`，导致 `sandbox.toml` 中 per-command 规则和会话权限审批全部失效。  
    [GitHub PR #29726](https://github.com/google-gemini/gemini-cli/pull/29726)

---

## 功能需求趋势

从今日收集的 Issue 来看，

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-13）

## 今日速览
今日发布 v1.0.97 系列迭代（v1.0.96 → v1.0.97-2），重点修复自定义 Agent 深层发现、新增 agent 级声明式 hooks，并默认开启内联图片渲染。社区讨论热度最高的是 macOS Gatekeeper 拦截安装问题，以及 Windows 下 MCP Entra 登录失败；BYOK 多模型路由与长会话可靠性问题成为新焦点。

## 版本发布
过去 24 小时共推送 4 个版本，均以修复与稳定性为主：

- **[v1.0.97-2](https://github.com/github/copilot-cli/releases/tag/v1.0.97-2)**
  - 修复：仓库中定义超过 100 个或嵌套较深的自定义 Agent 文件时，现在可以全部被发现。

- **[v1.0.97-1](https://github.com/github/copilot-cli/releases/tag/v1.0.97-1)**
  - 包含多项修复与变更。

- **[v1.0.97-0](https://github.com/github/copilot-cli/releases/tag/v1.0.97-0)**
  - 新增：为自定义 Agent 添加 agent 级声明式 hooks。
  - 改进：支持内联图片的终端默认渲染图片，不再需要实验模式；可通过 `/settings inlineImages false` 关闭。
  - 修复：Autopilot 不再错误拒绝 preToolUse hook 返回的 "ask" 决策。

- **[v1.0.96](https://github.com/github/copilot-cli/releases/tag/v1.0.96)**（2026-10-12）
  - 交互式沙箱设置可提示可用的环境密钥，并允许在保存前添加掩码主机。
  - `/model` 与 `/config` 中的模型 ID 现在大小写不敏感，并保存规范 ID。
  - 企业策略解析期间，仍可保留 `/allow-all` 的使用。

## 社区热点 Issues
以下为过去 24 小时内更新、讨论最集中的 10 个 Issue：

1. **[macOS Gatekeeper 拦截 Copilot CLI 升级](https://github.com/github/copilot-cli/issues/970)**
   - 作者：@jdesulme | 👍 22 | 评论 8
   - 每次通过 Homebrew 升级后，macOS 都会提示“Apple 无法验证 copilot 是否含恶意软件”，用户必须手动前往隐私与安全允许。企业安全策略下该问题尤为突出，社区呼声很高。

2. **[Windows 下 MCP Entra 登录失败](https://github.com/github/copilot-cli/issues/5068)**
   - 作者：@markwtwjeffries | 👍 12 | 评论 3
   - Windows 上连接 Entra ID 保护的 MCP 服务器时，交互式登录报“advertised scopes could not be safely validated”，影响 Azure DevOps MCP 等场景。

3. **[Claude Sonnet 模型缺少 prompt caching 优化](https://github.com/github/copilot-cli/issues/3808)**
   - 作者：@Qiuym9 | 👍 8 | 评论 3
   - 长系统提示与重复上下文会导致每次请求重新计算，开发者希望 Copilot CLI 能利用 Anthropic 的 prompt caching 降低延迟与 token 成本。

4. **[会话达到限制后等待 5 小时仍无法继续](https://github.com/github/copilot-cli/issues/5114)**
   - 作者：@yurivict | 评论 3
   - 会话触发 429 限制后，即使等待 5 小时，调用“continue”也不会从断点恢复，并可能被旧 cap 继续阻塞。严重影响长时间任务。

5. **[会话事件 120 秒超时后永久不可用](https://github.com/github/copilot-cli/issues/5100)**
   - 作者：@ElliotChong-MS | 评论 1
   - 长会话中若主机 120 秒未确认 `tool.execution_partial_result` 事件，后续所有 prompt 提交都会失败，必须 resume 才能恢复。

6. **[BYOK 子 Agent 使用错误 wire API](https://github.com/github/copilot-cli/issues/5103)**
   - 作者：@SivaKesava1 | 评论 1
   - BYOK 模式下 `COPILOT_PROVIDER_WIRE_API` 对所有请求生效，但子 Agent 可能运行在另一模型族，导致请求使用不兼容的 API 并返回 400。

7. **[BYOK 短模型名无法匹配到提供商模型](https://github.com/github/copilot-cli/issues/5127)**
   - 作者：@SivaKesava1 | 评论 1
   - 配置 BYOK providers/models 后，只有“provider-qualified” ID 可被识别，短名称模型（如 `gpt-5.4-mini`）即使唯一也会匹配失败，并可能误报“No GitHub OAuth token”。

8. **[`--agent <name>` 启动后约 1 秒被静默取消](https://github.com/github/copilot-cli/issues/5124)**
   - 作者：@wzhmvz | 评论 0
   - 启动时指定自定义 Agent 后，状态栏短暂显示已选中，但 MCP Servers reload 完成后 Agent 自动消失，导致选择失效。

9. **[多插件 `additionalContext` 只有最后一个生效](https://github.com/github/copilot-cli/issues/5122)**
   - 作者：@rwunsch | 评论 0
   - 多个插件在 `userPromptSubmitted` 钩子中返回 `additionalContext` 时，只有最后加载插件的文本能到达模型，其他插件的结果被静默丢弃。

10. **[终端安全策略阻碍会话恢复，陷入死循环](https://github.com/github/copilot-cli/issues/5123)**
    - 作者：@immuzz | 评论 0
    - Windows 重启后尝试恢复既有会话时，因终端安全确认反复被拒，最终只得到大量手动操作指引，基础恢复流程体验不佳。

## 重要 PR 进展
过去 24 小时内无 PR 更新。

## 功能需求趋势
从近期 Issues 中可以提炼出以下社区关注方向：

- **MCP 生态深度兼容**：支持 MCP 2026-07-28 多轮往返请求（`input_required`）、增强 Entra/WAM 账户代理、修复 OAuth issuer 校验，以及内置连接器（Atlassian Rovo、Dataverse）的稳定性。
- **BYOK 与多模型路由**：短名称模型自动匹配、子 Agent 按模型选择 wire API、内置 Agent 默认模型识别

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-13

## 今日速览

今日社区最受关注的是跨模型 Fallback 支持（#7602，32 评论 / 120 👍），以及 V1→V2 迁移引发的会话数据不可见、系统管理配置丢失等问题引发集中讨论。PR 侧则密集修复了 Bun fetch 超时导致 provider 请求中断、review 面板媒体加载失败、MCP 401 后无法触发重新认证等关键问题。

## 版本发布

过去 24 小时无新版本发布。

## 社区热点 Issues

1. **[FEATURE] Native Model Fallback / Failover Support（#7602）**
   - 评论 32 · 👍 120 · CLOSED
   - 社区最热需求：当前仅支持同模型 ID 下的 provider 回退，用户需要“模型 A 失败自动切换到模型 B”的跨模型 Fallback 机制，尤其是长时间运行的 agent 会话中。
   - https://github.com/anomalyco/opencode/issues/7602

2. **[FEATURE] 支持更多 DBMS 用于状态存储（#14212）**
   - 评论 15 · 👍 24 · CLOSED
   - 迁移到 Drizzle 后，社区期待 Postgres 等更多数据库后端，便于团队共享会话与状态存储。
   - https://github.com/anomalyco/opencode/issues/14212

3. **Windows 子进程弹窗抢焦点（#52281）**
   - 评论 7 · OPEN
   - Windows 11 上 `cmd.exe` 子进程（git 探测、MCP spawn）即使设置 `windowsHide` 仍闪现控制台窗口并窃取焦点，严重干扰交互式开发。
   - https://github.com/anomalyco/opencode/issues/52281

4. **Desktop 缩放比例重启后重置（#50168）**
   - 评论 7 · OPEN
   - `Ctrl +/-` 设置的缩放比例在重启后丢失，`wireZoom()` 显式重置为 1，属于桌面端 UX 回归。
   - https://github.com/anomalyco/opencode/issues/50168

5. **deepseek-v4-pro 多轮请求失败（#42135）**
   - 评论 7 · CLOSED
   - 新会话首轮正常，从第二轮起失败；flash 与官方 API 均正常，指向 opencode-go /responses 网关对 deepseek-v4-pro 多轮消息处理存在缺陷。
   - https://github.com/anomalyco/opencode/issues/42135

6. **deepseek-v4-pro 在 /v1/messages 返回 400（#42091）**
   - 评论 6 · CLOSED
   - Anthropic 兼容端点下，deepseek-v4-pro 在 content 为字符串时报 `Empty input messages`，而 deepseek-v4-flash 同请求返回 200——同一网关不同模型的解析行为不一致。
   - https://github.com/anomalyco/opencode/issues/42091

7. **图片/文件负载不计入上下文导致长会话 400（#54690）**
   - 评论 4 · triaging
   - 会话包含大量 base64 截图时，负载未计入上下文窗口，长会话以 `invalid_request_error` 崩溃而非触发压缩。上下文管理逻辑存在盲区。
   - https://github.com/anomalyco/opencode/issues/54690

8. **空输入工具调用挂起会话（#54683）**
   - 评论 4 · triaging
   - 模型偶尔发出空输入的工具调用（如空 `shell` 命令、空 `write` 对象），provider 执行后永不完成，导致会话永久卡在 running 状态。
   - https://github.com/anomalyco/opencode/issues/54683

9. **V1 迁移因遗留消息 ID 中止（#54736）**
   - 评论 4 · OPEN
   - V1→V2 数据迁移在 Schema 校验时失败：遗留消息 ID 不满足 `msg_` 前缀要求。升级用户可能被阻断在迁移阶段。
   - https://github.com/anomalyco/opencode/issues/54736

10. **V1 全局会话在 V2 列表不可见（#54679）**
    - 评论 4 · triaging
    - 迁移后 V1 的 `global` 项目会话默认被 cwd 范围的 session list 过滤，用户无法在相同工作目录看到历史会话。
    - https://github.com/anomalyco/opencode/issues/54679

## 重要 PR 进展

1. **[fix(core)] 禁用 Bun fetch 空闲超时（#55007）**
   - 修复 provider 请求在约 5–6 分钟无数据后被 Bun 强制断连的问题。该超时已导致多种长耗时 LLM 请求意外失败。
   - https://github.com/anomalyco/opencode/pull/55007

2. **[fix(core)] 以最低优先级发现系统配置目录（#54921）**
   - 关闭 #51107、#53074：恢复 Linux `/etc/opencode`、macOS `/Library/Application Support/opencode`、Windows `%ProgramData%\opencode` 的读取支持。
   - https://github.com/anomalyco/opencode/pull/54921

3. **[fix(core)] 加载托管配置文件目录（#51337）**
   - 关闭 #51107：补齐 V1 系统级管理配置目录在 V2 的加载逻辑，支持管理员统一配置。
   - https://github.com/anomalyco/opencode/pull/51337

4. **[fix(app)] review 面板加载图片与音频（#55015）**
   - 修复 readme 面板中“Unable to load image”的 bug：解码时丢失 MIME 类型导致 FileMedia 无法构建 data URL。
   - https://github.com/anomalyco/opencode/pull/55015

5. **[fix(app)] 保留最多 256 MiB 原始媒体字节用于 artifact 预览（#55018）**
   - 解决大于 25 MiB 的视频/二进制文件只能显示占位符的问题，提升 workspace 媒体文件的预览体验。
   - https://github.com/anomalyco/opencode/pull/55018

6. **[fix(mcp)] 工具调用被 401 拒绝时标记需要重新认证（#55013）**
   - 关闭 #53942：MCP server OAuth 刷新失败后，当前状态仍显示 Connected 且持续报错——现在会标记 `needs_auth` 并提示用户重新认证。
   - https://github.com/anomalyco/opencode/pull/55013

7. **[fix(cli)] 恢复 v2 的 models --refresh 标志（#55014）**
   - 关闭 #53682：v2 CLI 重写时丢失了 `opencode models --refresh`/`--verbose`，文档仍有描述但命令会报 `Unrecognized flag`。
   - https://github.com/anomalyco/opencode/pull/55014

8. **[fix(session)] 回放报错 assistant 轮次时保留 thinking 块（#54693）**
   - 关闭 #38620：将 #51953 的方案移植到 V2 session 核心，回放中思考块不再丢失。
   - https://github.com/anomalyco/opencode/pull/54693

9. **[feat(core)] 支持从 .agents/opencode 加载项目配置（#54594）**
   - 关闭 #47742：允许仓库使用 `.agents/<harness>/` 目录维护项目级 OpenCode 配置，增强与 Codex 等 harness 的兼容性。
   - https://github.com/anomalyco/opencode/pull/54594

10. **[fix(app)] 粘贴到未

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-13）

## 今日速览

- 发布 `v0.25.1-nightly` 版本，聚焦 Managed Agent 连接器与 Broker 健壮性修复。
- 社区围绕 Managed Agent 双路径架构（`#12380`）展开热烈讨论，Kubernetes 工具运行时进度同步更新。
- 多智能体 API、Web Shell 后台状态可视化、CI 稳定性等成为开发者关注焦点，XML 工具调用恢复类 bug 持续追踪。

## 版本发布

**v0.25.1-nightly.20261012.18f80f5666**  
[发布说明](https://github.com/QwenLM/qwen-code/releases/tag/v0.25.1-nightly.20261012.18f80f5666)

- `fix(managed-agent): connector and broker robustness from the #12692 R2 review`：基于 `#12692` 第二轮评审，增强 Managed Agent 连接器与 Broker 的容错能力。

## 社区热点 Issues

1. **[#12380] Managed Agent 双路径架构与分阶段交付提案**  
   [链接](https://github.com/QwenLM/qwen-code/issues/12380)  
   评论数最高（56），持续更新中。提案定义分阶段架构：保留现有 TypeScript agent 循环、模型推理与工具环境分离、Session 持久化所有权、Workspace 绑定、可恢复工具执行及稳定 WebSocket 通信。这是当前社区最核心的长期演进方向。

2. **[#13395] Kubernetes 工具运行时进度与跨平台交付门禁**  
   [链接](https://github.com/QwenLM/qwen-code/issues/13395)  
   跟踪 Kubernetes 工具运行时（PR #13289）的进展，2026-10-13 已核对主干基准，涉及跨平台交付门禁。该问题是平台分发的重要一步，关注度持续攀升。

3. **[#13492] XML 工具调用恢复丢弃包含带引号工具标记的外层调用**  
   [链接](https://github.com/QwenLM/qwen-code/issues/13492)  
   部分修复（PR #13515），但外层调用恢复仍待 PR #13579 合并。影响工具调用解析的可靠性，多轮讨论中。

4. **[#13785] Multi-Agent API：公共契约上的代理身份维度**  
   [链接](https://github.com/QwenLM/qwen-code/issues/13785)  
   请求在现有公开 API 上增加代理身份维度，使多智能体执行可归属、树形结构且可中断。这是多智能体协作落到工程实现的关键需求，社区反响积极。

5. **[#10700] 孤立的工具调用闭合标签泄漏为纯文本**  
   [链接](https://github.com/QwenLM/qwen-code/issues/10700)  
   2026-10-07 在最新主干上仍可复现，XML 恢复仅匹配平衡 invoke 对，导致生成内容中的孤立 `</parameter></invoke>` 泄漏。该 bug 长期存在，直接影响输出质量。

6. **[#14011] “Harness SWE”基准套件：用 Qwen Code 自身功能构建基准任务**  
   [链接](https://github.com/QwenLM/qwen-code/issues/14011)  
   新提出的基准套件，使用小型真实仓库和特性实现指令，覆盖 todo 跟踪、计划模式、skills/workflows、子代理委派等自身特性。获得社区点赞与讨论，是测试与演示的新方向。

7. **[#13898] Web Shell：显示后台子代理的实时状态**  
   [链接](https://github.com/QwenLM/qwen-code/issues/13898)  
   请求在 Web Shell / Desktop 会话窗口为后台子代理（`run_in_background`）增加常驻状态卡片（运行中/完成/失败/取消、耗时、剩余数量）。提升多任务可视化体验。

8. **[#13951] CI 失败：集成测试在 Checkout 阶段报 “pack has 1 unresolved delta”**  
   [链接](https://github.com/QwenLM/qwen-code/issues/13951)  
   PR #13815 的 CI 运行中 `Integration Tests (no-AK, No Sandbox)` 失败，疑似自托管 runner 的 Git 缓存问题。影响 CI 稳定性，触发多个相关修复 PR。

9. **[#13502] 取消溯源：PR 13436 推迟的五个决策**  
   [链接](https://github.com/QwenLM/qwen-code/issues/13502)  
   跟踪取消操作的溯源设计，已有部分实现（`cancelReason: 'user'` + 时间戳），其余决策仍在讨论。涉及会话管理核心语义。

10. **[#14004] 将 Agent 运行机制与 LLM 订阅分离以消除利益冲突**  
    [链接](https://github.com/QwenLM/qwen-code/issues/14004)  
    指出构建工具的公司同时销售其消耗的云 LLM 订阅，存在定价激励冲突。虽是 P3 优先级，但引发关于商业模式透明度的讨论。

## 重要 PR 进展

1. **[#14016] fix(cli): 恢复 ↑/↓ 在输入历史中的导航功能**  
   [链接](https://github.com/QwenLM/qwen-code/pull/14016)  
   修复 Virtualized History 中裸 ↑/↓ 不再循环输入历史的问题，与 `#12518` 变更后的回归一致。

2. **[#13902] feat: 将 Project Agent 身份与 Agent Team 投递到 ACP/daemon 线路**  
   [链接](https://github.com/QwenLM/qwen-code/pull/13902)  
   参考 `#13785`，为子代理帧增加 `_meta.agent` 身份维度，实现可归属的多智能体协作。

3. **[#14017] fix(ci): 修复复用 runner 的 checkout 与 Java 锁等待**  
   [链接](https://github.com/QwenLM/qwen-code/pull/14017)  
   在自托管 runner 上清理 Git 元数据、避免 Java 锁竞争，解决 `#13951` 等 CI 常见故障。

4. **[#13918] fix(managed-agent): 租户级 InnoDB 锁不得阻塞无关 Session**  
   [链接](https://github.com/QwenLM/qwen-code/pull/13918)  
   隔离 `recovery_blocked` Session 对其他 Session 的干扰，限制影响范围，增强托管环境稳定性。

5. **[#13955] feat(managed-agent): 成员间消息通过 session_command 通道传递**  
   [链接](https://github.com/QwenLM/qwen-code/pull/13955)  
   托管团队内成员可端到端互发消息，无需触发模型轮次，降低通信开销。

6. **[#13858] feat(managed-agent): H4 工作流子运行时**  
   [链接](https://github.com/QwenLM/qwen-code/pull/13858)  
   实现 Managed Agent 提案 `#12380` 中 H 阶段的工作流子运行时，支持通过 Workflow 工具声明启动子 Session。

7. **[#14014] fix(managed-agent): 按提交序列排序发送者命令，使成员重启 IT 中断实时等待**  
   [链接](https://github.com/QwenLM/qwen-code/pull/14014)  
   修复 relay 中每个发送者命令的顺序问题，并重构成员重启集成测试，确保重启能正确中断等待。

8. **[#13931] feat(managed-agent): 添加 L4 Shell 与 MCP 会话生命周期**  
   [链接](https://github.com/QwenLM/qwen-code/pull/13931)  
   为 `hosted-workspace-shell/1` 和 `hosted-workspace-mcp/1` 增加持久化关闭与删除语义，完善托管工作区生命周期管理。

9. **[#13642] feat(runtime-broker): 为终端 JDBC 历史添加有界保留**  
   [链接](https://github.com/QwenLM/qwen-code/pull/13642)  
   新增可选的有界 JDBC 清理任务，在请求外删除旧记录，保留恢复与发布能力，降低资源占用。

10. **[#10709] fix(core): 重试孤立的 XML 工具调用闭合标签**  
    [链接](https://github.com/QwenLM/qwen-code/pull/10709)  
    通过有界无效流重试路径拒绝 `</parameter></invoke>` 这类孤立片段，避免泄漏并保持文档完整性，与 `#10700` 直接相关。

## 功能需求趋势

- **多智能体与协作**：从 `#12380`、`#13785`、`#13902` 等可见，社区强烈期望在公共协议上落地多智能体身份、树形执行与成员间通信，形成完整的 Agent 团队机制。
- **Web Shell / 桌面端体验增强**：`#13898`（后台子代理状态）、`#14019`（智能 UI）、`#13998`（turn 折叠 bug）等表明 UI 交互细节与实时状态可视化是迭代重点。
- **运行时与平台分发**：`#13395` Kubernetes 工具运行时、`#13931` 托管会话生命周期等推动跨平台交付和云端部署能力。
- **工具调用可靠性**：`#10700`、`#13492`、`#10709` 持续聚焦 XML 解析与恢复机制，确保模型输出格式错误的容忍度。
- **CI/CD 与安全审计**：`#13951`、`#13078`（CVE 审计失败）、`#14017` 引发对 CI 基础设施稳定性和依赖漏洞扫描的关注。
- **生态集成与本地化**：`#13987`（You.com MCP）、`#13967`（VS Code 本地化）显示社区对扩展服务接入与多语言支持的持续兴趣。

## 开发者关注点

- **CI 频繁失败**：多个 PR 在自托管 runner 上遇到 Git 缓存损坏、Java 锁等问题，严重拖慢开发效率，已有针对性修复但仍需系统化治理。
- **XML 恢复逻辑缺陷**：工具调用格式异常时容易导致文本泄漏或调用丢失，影响生成质量，开发者期待更稳健的纠错机制。
- **托管环境隔离不足**：单个 Session 的阻塞或锁可能波及其他 Session，亟需故障隔离和更细粒度的生命周期管理。
- **Web Shell 交互细节**：turn 折叠后重要信息被隐藏、后台任务状态不直观等交互问题，直接影响用户对 AI 能力的感知。
- **账单与权限透明度**：用户开始关注工具厂商既当运动员又当裁判的商业模式，以及对工作区信任、取消操作语义等底层机制的明确化需求。

> 数据来源：GitHub `QwenLM/qwen-code` 仓库，采集时间 2026-10-13。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*