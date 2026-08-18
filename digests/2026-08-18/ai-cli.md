# AI CLI 工具社区动态日报 2026-08-18

> 生成时间: 2026-08-18 00:36 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告

**日期**：2026-08-18  
**分析范围**：Claude Code / OpenAI Codex / Gemini CLI / GitHub Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code

---

## 1. 生态全景

AI CLI 工具已从"单机辅助编程"阶段迈入**企业级、多代理架构、跨主机协作**的新阶段。随着 MCP（模型上下文协议）成为事实标准，`Agent` 对话和任务编排能力日渐成熟，工具的复杂度与问题也随之上升。各工具在经历快速功能迭代的同时，正将重心转向 **MCP 生态稳定性、Agent 可靠性与权限治理**，以及 **Windows/macOS 桌面端的稳定性和一致性**。模型能力大幅提升（如 GPT-5.6 上下文提升至 872K）正倒逼工具的上下文管理、会话恢复与资源控制能力相匹配。总体处于高速迭代与生态标准固化并行的阶段。

---

## 2. 各工具活跃度对比

基于当日报告数据汇总（数字为估算与分类汇总）：

| 工具 | 版本状态 | Issues（高关注*） | 重要 PR | 活跃度评级 |
|------|----------|-------------------|---------|------------|
| Claude Code | 补丁版 v2.1.234 | ~13 个 | ~12 | ★★★★★ |
| OpenAI Codex | 预发布版 alpha.21 | 10 个 | 20+ 个批量 | ★★★★★ |
| Gemini CLI | Nightly v0.56.0 | 10 个 | 10 个 | ★★★★☆ |
| GitHub Copilot CLI | 无更新 | 10 个 | 1 个 | ★★★☆☆ |
| OpenCode | 无版本发布 | ~10 个 | 10 个 | ★★★★☆ |
| Qwen Code | 正式版 v0.21.13 + Nightly | 11 个 | 10 个 | ★★★★☆ |
| Kimi Code CLI | 公告仅 24 小时无活动 | — | — | ★☆☆☆☆ |

> \*"高关注"指获得 ≥3 条评论、≥2 👍 或 P1 标记的 Issue。

从 Issue 总量与讨论热度看，Claude Code 和 OpenAI Codex 处于第一梯队；Gemini、OpenCode、Qwen 紧随其后；Copilot 与 Kimi 活跃度相对较低。

---

## 3. 共同聚焦的功能方向

### 3.1 MCP 生态稳定性与安全

**几乎所有活跃工具（除 Kimi）均在关注**，但角度各异：

- **OAuth 认证兼容性**：Copilot 的 GitLab/Atlassian MCP 认证失败（#4439、#4480）；OpenCode 的 MCP token 刷新并发 bug（#43074）；自提 Codex MCP OAuth token 颜值失效（#17265）。
- **BigInt 序列化 / 类型安全**：Copilot #4211；Gemini 工具数量超400报错（#24246）。
- **MCP 进程生命周期控制**：Codex Windows 本地 stdio 频繁重启（#38754）。
- **Security/权限**：OpenCode 的 per-server trust（#40125）、Gemini 的“扩展环境变量注入 MCP 进程（#28863）。

### 3.2 Agent 可靠性与状态透明化

Gemini 社区最聚焦：子代理 `MAX_TURNS` 误报 GOAL（#22323）、修复恢复时终止原因被改写（#28815）、Generalist 挂死（#21409）。Claude Code 同样有“后台子 Agent OOM”影响（#81343）。核心诉求是 **Agent 能中断、可恢复、状态可信**。

### 3.3 会话生命周期管理与跨会话恢复

克隆 分出现：

- **恢复/重建**：Copilot #4505（过期连接卡死）及 #4508（长会话指令文件不更新）、OpenCode 异步会话无回调（#38762）、Qwen 压缩后状态丢失（#9312）。
- **跨设备/远程恢复**：Codex macOS 远程控制回归（#37403）、Copilot 远程恢复本地 session（#4514）、OpenCode `--continue` 注入活跃会话见（#43133）。

### 4.4 权限与人为因素：更细粒度的审批控制

**Copilot #28969（195 👍）**、**Qwen 自动修复创作者风暴（#95）**、**Claude Code 的权限数字键不一致（#73325）**、Gemini 的“禁用 agents”配置失效（#22093）等，逐步表明**用户希望拥有更高透明度和主动权的权限体系**，不能盲目自动执行 AI 的决定（或代理的委派）。与此同时用户对**捕获输入（粘贴）被无端拦截**等单一行为回归也持续高度敏感。

### 3.5 跨平台（尤其 Windows）稳定性

Claude Code 的 Windows 桌面 GPU 崩溃（#80444 一系）、Copilot 的 stdin/MCP 间歇重启（#19xx）、Codex 磁盘高频读循环（#38518）、Qwen 的 Ctrl+V 粘贴回归（#9061）、OpenCode 的 Windows ARM64 TUI 失败（#19130）——**Windows 依然是多工具社区最集中投诉的平台**。

### 3.6 模型选择与上下文预算约束

Codex 模型目录（#4390）、Claude 内置 skill 上下文暴涨（#63566）、Qwen 压缩后 token 数语义不符（#9309）、Gemini 工具数量超 400 限制（#24246）——随着模型能力扩展，**对上下文的管理不透明度和 token 消耗合理性成为新型不满意度**。

---

## 4. 差异化定位分析

| 工具 | 技术路线/定位 | 目标用户 | 特色/亮点 | 相对短板 |
|------|----------------|----------|-----------|----------|
| Claude Code | 深度编辑器强化、安全 hook、插件机制 | 核心开发者、灵活 P&A 的企业 | 多代理/远程增强（如消息队列）、工程化意识强 | Windows 桌面端稳定性问题集中 |
| OpenAI Codex | MCP 深化+远程桌面端扩展、企业级治理（OTel） | 企业级开发团队、多端协作 | 新版模型能力适配（872K）、远程控制 | MCP/OAuth Bug 验证进度长、多端差异明显 |
| Gemini CLI | “轻量级”（原教旨）CLI、Agent 可靠性与记忆系统研究 | 注重研究性质、开发者 | 子代理机制高度关注、私有记忆安全（Auto Memory）防护 | 工具缺少权威逻辑、历史遗留 bug（挂起）较多 |
| GitHub Copilot CLI | GitHub 生态集成、企业 MCP OAuth 优先 | 企业/团队、GitHub 重度用户 | 官方支持、企业级 MCP 安全保障 | 功能演进较保守、自定义空间有限（去除 CLI 功能引发负面反馈） |
| OpenCode | 开源、多模型网关（咨询自建）、MCP 可编程化 | 初创/个人开发者、模型自由选择者 | **模型提供商兼容性（多配置、多平台）**、插件系统、Windows Path | 规模较小、工程资源力度要求高 |
| Qwen Code | CI/Code Review 自动化、WebShell 生态扩展 | 重工程自动化、团队型用户 | **代码质量自动修复管线-效率导向**、WebShell 扩展能力强 | 细节质量问题（粘贴/渲染）、长会话一致性工资 |

---

## 5. 社区热度与成熟度

| 工具 | 社区热度 | 迭代节奏 | 成熟度评估 |
|------|----------|----------|------------|
| Claude | 非常热（需求主导，强烈的方式符号） | 节奏快（每日补丁） | 中等：初版功能丰富但多 window 端回归；工程化补充丰富，整体基线较好 |
| Codex | 热（Issue/PR 量化高且增长快） | 激烈（预发布、批量 PR） | 超前：企业级治理思路明确（OTel、远程、双端）；基础同步性问题仍多 |
| Gemini CLI | 中等偏高 | 行政（Nightly 频出） | 专注下探 child-agent、内存可靠性；生产可用性瓶颈明显（挂死、状态错误） |
| Copilot CLI | 中等（增长，Issue 集中在 1.0.79+） | 低频、Monday-Night 节奏 | 官方背书强，但近期 OAuth/进程反复引起信任风险；需要快速修补 |
| OpenCode | 中等 | 开发持续，版本空间比较大 | 用户基初能力不凡：多云、MCP 生态；Windows 通道是决定采纳的门槛 |
| Qwen Code | 活跃 | 每周版本（v0.21.x + Nightly） | 已进入企业级 CI/Code Review 场景；但主流程输入回归需尽早解决 |

---

## 6. 值得关注的趋势信号

1. **MCP 协议已全面进入"合规验证与稳定期"**：  
   多工具且同步处理 OAuth 刷新、RFC 8414 对齐、进程竞争这些问题，是 MCP 从"能用"走向"生产可用"的必经阶段。进行深度风险评估的团队建议**锁定 P0 MCP 服务版本及验证环境**，并与厂商保持同步认证方案。

2. **Agent 的"可靠性"比"智能"更重要**：  
   为对子代理不报错、不挂死、假成功（误报 GOAL）的投诉，已然超过了对"功能多少"的诉求。**迈向多 Agent 指挥的核心参数在于任务响应的确定性**——与状态、反馈、恢复路径有关设计时先行的思路较差，未来小方向是 "Agent 状态机固化 + 审计 JSON 化"。

3. **上下文窗口增大反而放大了"压缩/记忆"的矛盾**：  
   GPT-5.6cotext 到 872K 后，用户开始要求 token 治理精细化（避免全量加载、结构语义可见、压缩不丢失状态）。这意味着 tools 可逐步用中**押注 Token 预算分配算法（budgeting/压缩调度）的产品将入场机会**。

4. **Windows 桌面端是当前"最后一公里"的决定性战场**：  
   多个平台（Claude Desktop 崩、Codex 磁盘读卡、Qwen CtrlV、Copilot natrm）系数一致指向 Windows UI/进程模型是“准入安全”的试金石。**未彻底解决 Windows 多形态兼容（MSIX/Native/arm64）的 CLI 将无法获得主流企业采用**。

5. **"海峰起身技术"（即企业级治理）正向 CLI 工具标准化铺开**：  
   OTel 代理（Codex）、A2A 跨主机协议（Claude Code）、权限/模型的精确管控（企业 → 边缘设备）的出现显示：**纯个人工具向企业主力工具的跃迁，需要把"可观测性"和"可治理性"制作量在建 CD**。

6. **开源社区对于工具“尊重用户控制权”****的期待在上升**：  
   Codex（CONTribute 策略）、Gemini（扩展的安全同意链）等都体现了维护方在“AI 自动化”同时加强人工介入的边界。推荐开发者在选型转场所有工具时，**务必备注用户级允许的手主动优先级与撤销权限**，这很可能成为"效率 vs 失控"困境的决策关键。

---

## 附：给技术决策者的 3 个建议

1. **如果你的团队重度使用 Windows**：  
   可优先观测 Claude Code / OpenCode / Qwen Code 的 Windows 路径问题，师兄解决前建议在 DevOps 会话隔离演练环境。

2. **对 MCP 生态依赖较深并追求**（如内部数据/系统）**的关键链路**，建议无论如何也要做 OAuth token 刷新的降级方案，并保留遇到 Copilot 或 OpenCode 偏好在补丁层的问题回退点。

3. **追求对 Agent 执行可信任、可审计的长跑型团队**：可关注 Gemini CLI 在子代理状态修复与远程控制的一致性，搭配 Codex 的新可观测性方案，实现双工具互补。

---

> 本报告数据与观点基于 2026-08-18 对应各 GitHub 仓库的 Issues/PR 及版本发布信息，自动整理而成，不代表各工具官方的立场或未来规划。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截至 2026-08-18）

> **说明**：部分 PR 的评论数在原始数据中显示为 `undefined`（可能因 API 字段映射问题）。本报告主要通过观察 PR 讨论活跃度、关联 Issue 的评论互动量、以及多个贡献者针对同一方向进行持续修复的趋势来综合判断热度。

---

## 一、热门 Skills 排行

### 1. skill-creator 生态修复系列（热度最高）
- **PR #1298** — 修复 `run_eval.py` 始终报告 0% 召回率问题
  - **功能**：修复评估脚本中技能描述无法触发（trigger）的核心 bug，同时修补 Windows 流读取、触发检测逻辑及并行 worker。
  - **热度理由**：关联 #556 有 12 条评论、多个独立复现、相关 PR 达 3-4 个（#1298、#1099、#1050），是当前社区最集中的 bug 修复焦点。
  - **状态**：OPEN
  - 🔗 https://github.com/anthropics/skills/pull/1298

### 2. document-typography（文档排版质检）
- **PR #514** — 为生成的文档提供排版质量检查（孤儿词、寡行段落、编号对齐）
  - **功能**：防止 AI 生成文档的常见排版问题，具有极高的通用适用性。
  - **社区讨论点**：用户普遍反映 Claude 生成文档存在此类问题，属于高频需求。
  - **状态**：OPEN
  - 🔗 https://github.com/anthropics/skills/pull/514

### 3. ODT 文档处理技能
- **PR #486** — OpenDocument 格式创建、模板填充及解析为 HTML
  - **功能**：支持 .odt/\.ods 文件的创建、填充、读取和转换，适合 ISO 标准格式场景。
  - **状态**：OPEN（3月创建后持续更新至4月）
  - 🔗 https://github.com/anthropics/skills/pull/486

### 4. PDF 文件引用大小写修复
- **PR #538** — 修复 8 处大小写不匹配的文件引用
  - **功能**：修复因大小写不一致导致在 case-sensitive 文件系统上技能失效的问题。
  - **值得关注**：看似琐碎的修复，实则影响大量用户实际部署稳定性。
  - **状态**：OPEN（3月提交，4月更新）
  - 🔗 https://github.com/anthropics/skills/pull/538

### 5. ServiceNow 平台综合技能（覆盖面最大的领域技能）
- **PR #568** — ServiceNow 平台助手（ITSM、ITOM、SecOps、ITAM/SAM、FSM、SPM 等）
  - **功能**：目前仓库中最为广泛的企业级平台技能之一，覆盖全部主模块。
  - **讨论**：跨度最大（3月创建至今仍维护中）。该 PR 的更新标注为 Latent Collaboration（异步协作）模式完成。
  - **状态**：OPEN
  - 🔗 https://github.com/anthropics/skills/pull/568

### 6. Pyxel 复古游戏开发
- **PR #525** — pyxel-mcp 集成（写代码 → 运行 → 截图 → 迭代）
  - **功能**：让 Claude 能为 Pyxel 游戏引擎编写 8-bit/像素风游戏。
  - **热度理由**：作者正是 Pyxel 引擎作者 & MCP 服务器作者，是开发者自带 SDK 的典型案例。
  - **状态**：OPEN（3月创建，7月仍在活跃维护）
  - 🔗 https://github.com/anthropics/skills/pull/525

### 7. 前端设计技能优化
- **PR #210** — 提升 frontend-design skill 的清晰度与可执行性
  - **功能**：让技能中每个指令在单次会话中可执行，指针更明确。
  - **热度理由**：这是高热度 core skill 的重写/优化，涉及基础技能的打磨。
  - **状态**：OPEN（1月创建，3月更新）
  - 🔗 https://github.com/anthropics/skills/pull/210

---

## 二、社区需求趋势（来自 Issues）

| 趋势 | 典型案例 | 关注度 |
|------|---------|--------|
| **✅ 安全与信任机制** | #492 社区技能在 anthropic/ 命名空间下导致信任边界风险 — 43 条评论 | 🔥🔥🔥 |
| **📦 企业级共享与协作** | #228 企业内部对 org-wide 技能库的诉求，跨 Slack 共享技能 8 个 👍 | 🔥🔥🔥 |
| **🔧 评估与质量保障** | #556 run_eval.py 触发率为 0%（影响倒数的 bug） | 🔥🔥 |
| **🧠 高效内存/状态管理** | #1329 compact-memory 象征性标识，让长对话保持轻量 | 🔥 |
| **🛡️ Agent 治理与安全** | #412 agent-governance 提案 Agent 系统安全治理 & 审计日志 | 🔥 |
| **🎨 UI 视觉质量** | UIZZE (#1598) 基于 80 万真实截图的“anti-UI-slop” | 🔥 |

**最集中的方向**：安全（#492 + #1175）、可靠性（工具链修复）、企业协作（#228）。

---

## 三、高潜力待合并 Skills（近期可能落地）

### 1. self-audit — 推理质量门控
- **PR #1367** — 机械化核查 + 四维推理质量门禁（v1.3.0）
- **判断依据**：作者在 Issue #1385 中同步提交了对应的系统提案，说明作者在深度维护中；7 月在持续更新中。
- 🔗 https://github.com/anthropics/skills/pull/1367

### 2. skill-quality-analyzer + skill-security-analyzer（元技能）
- **PR #83** — 对 Skill 本身进行结构化与安全标准画像
- **判断依据**：与 #492 安全 Issue 相关：社区在期待此类验证工具。
- **关键信息**：11 月至今 open，暂无合并。
- 🔗 https://github.com/anthropics/skills/pull/83

### 3. ODT 技能（#486）
- 功能上可直接产生用户可交付的 ODF 文件，跨平台兼容性好，兴趣度高。
- 🔗 https://github.com/anthropics/skills/pull/486

### 4. frontend-design 重写（#210）
- 极小金额改动，几乎无风险；对核心技能质量提升价值大。
- 🔗 https://github.com/anthropics/skills/pull/210

### 5. pyxel 游戏开发（#525）
- 作者自带动效实时反馈闭环（write→run→inspect→iterate），业界案例极具吸引力。
- 🔗 https://github.com/anthropics/skills/pull/525

---

## 四、生态洞察（一句话）

> **当前社区最核心的诉求是「让评估工具有效、让分发安全可信、让技能可被企业和创作者无缝共享」** —— 即从“能创建技能”进化到“技能的质量保证体系与生态治理”。

换句话说：社区正在从“创造技能的时期”进入“**让技能在现实项目中可靠地跑起来**”的阶段（bug 修复类 PR 密度最高、安全信任审查，而企业级管理工具、组织内分发、评测设施是三个主要缺口方向。

---

# Claude Code 社区动态日报 — 2026-08-18

## 今日速览

今日发布补丁版本 v2.1.234，新增 `CLAUDE_CODE_PROJECT_DIR_NAME` 环境变量与 `selection:clear` 快捷键绑定。社区热点集中在 Windows 桌面版 GPU 崩溃（多个相关 issue）、跨会话消息丢失回退，以及消息队列模式的高赞需求（198 个 👍）。

## 版本发布

**v2.1.234**（最新补丁版）

- 新增可选环境变量 `CLAUDE_CODE_PROJECT_DIR_NAME`：为每个会话设置独立配置目录的主机，可为逐项目转录目录选择简短名称。
- 新增 `selection:clear` 快捷键绑定操作，可在应用内绑定按键以清除选中内容。

🔗 [查看 Release 详情](https://github.com/anthropics/claude-code/releases)

## 社区热点 Issues

### 高热度需求

1. **消息队列模式**

   Feature Request: Message queue mode — queue messages instead of interrupting active tasks
   这是当前社区最强烈的需求，获得 198 个赞。核心诉求是：Claude 忙碌时，希望后续消息进入排队而不是强行打断当前任务。该 Issue 被官方标记为 CLOSED，可能是因为已进入内部路线图（但未公开）。
   链接：https://github.com/anthropics/claude-code/issues/50246

2. **Bash 工具过度使用**

   [MODEL] Frequently uses Bash tools (sed/grep/etc) when use-case is well aligned to other builtin tools (Read/Grep/etc)  当 Read/Grep 等内建工具更合适时，模型仍频繁调用 Bash（sed/grep 等），开发者已大量反馈（97 赞，27 条评论）。这是模型工具选择策略的典型问题，影响 token 效率与沙箱安全性。
   链接：https://github.com/anthropics/claude-code/issues/19649

3. **跨机器多 Agent 协作（A2A 协议）**

   [FEATURE] Multi-agent collaboration across machines (Agent-to-Agent protocol)  38 条评论，尚在讨论中。社区对原生 A2A 协议的预期较高，但 Anthropic 目前尚未有正式回应。
   链接：https://github.com/anthropics/claude-code/issues/28300

### 高关注度 Bug

4. **Windows 桌面版 GPU 崩溃（MSIX 应用）**

   1.24012.1 fatal GPU-process crash via in-app Browser tab；崩溃后修复前 MSIX 包无法再启动（appxState=2），需 Repair。已有 39 条评论。
   链接：https://github.com/anthropics/claude-code/issues/80444

5. **Windows 桌面版 GPU 崩溃（CIG限制）**

   CIG（MicrosoftSignedOnly）+ 第三方签名的 vk_swiftshader.dll 导致每次浏览器预览 GPU 崩溃（0x060C201E），21 条评论。与上条同根因。
   链接：https://github.com/anthropics/claude-code/issues/81341

6. **跨会话消息静默丢失（Windows 回归）**

   Desktop app (Windows): cross-session messages silently dropped — held for approval UI never offers，约 5 分钟后过期。1.28929.0 起回归。13 条评论，影响多标签会话。
   链接：https://github.com/anthropics/claude-code/issues/86298

7. **Esc 键误拒工具授权**

   Pressing Esc 退出 /btw 模式，反而拒绝 pending tool-use prompt。macOS、TUI 模式，回归类 bug。9 条评论，10 赞。核心是 Esc 事件的优先级错误。
   链接：https://github.com/anthropics/claude-code/issues/64568

8. **macOS 文件系统 MCP 服务不可用**

   filesystem MCP server unusable in both package generations，schema 分发逻辑紊乱。10 条评论。
   链接：https://github.com/anthropics/claude-code/issues/80094

9. **/claude-api skill 上下文爆满**

    `/claude-api` 内置 skill 无条件加载全部多语言包（约 23 万 tokens），无论问题多简单。9 条评论。
   链接：https://github.com/anthropics/claude-code/issues/63566

10. **VS Code 扩展 Thinking 块为空**

    Fable 5 thinking 内容在 VS Code 2.1.233 扩展中返回空；2.1.228 正常。
    链接：https://github.com/anthropics/claude-code/issues/86865

### 近期闭坑（值得关注）

11. **ugrep 死循环比 ripgrep 慢 4 个数量级**

    2.1.233 内嵌 ugrep 在 unanchored bounded-repetition 模式下持续输入，对应 ripgrep 仅需 53 ms。
    链接：https://github.com/anthropics/claude-code/issues/87129

### 其他值得关注

12. **后台子 Agent 内存爆炸 → 全局 OOM**

    单个 Task 工具中的 run_in_background 在 100 秒内增长至 9.5 GiB anon-RSS，触发整机内核 OOM。
    链接：https://github.com/anthropics/claude-code/issues/81343

13. **权限快捷数字键歧义**

     العالمي CLI 兼容 Approve 为 `1`，而 Windows 桌面版为 Deny 为 `1`，造成肌肉记忆误操作。
    链接：https://github.com/anthropics/claude-code/issues/73325

## 重要 PR 进展

**修复：插件与脚本维护（今日集中合并）**

1. **阻止模型自调用循环插件（ralph-wiggum）**

   改用 disable-model-invocation 限制模型自主运行 /ralph-loop。
   链接：https://github.com/anthropics/claude-code/pull/87395

2. **移除失效 Statsig 域名（init-firewall.sh）**

    hostname 不再解析导致 devcontainer 启动失败，删掉 allowlist 条目。
   链接：https://github.com/anthropics/claude-code/pull/72451

3. **validate-settings.sh：大小写敏感 frontmatter 匹配导致的静默失败**

   gswith `set -euo pipefail` 下 grep 无匹配返回 1 且无任何诊断信息。
   链接：https://github.com/anthropics/claude-code/pull/79131

4. **容器隔离示例（含 guard hook）**

   引入 guard-destructive-git preToolUse hook，catch push/hard reset/branch -D 等危险命令。
   链接：https://github.com/anthropics/claude-code/pull/30692

5. **$PATH 文档澄清：excludedCommands 需要冒号通配符**

   `"docker"` 只能匹配裸命令；挂上 `:*` 才能拦截带参数调用。
   链接：https://github.com/anthropics/claude-code/pull/29284

以下为 8 月 5 日起持续维护的一组脚本修复（均为 8 月 17 日关闭）

6. **frontmatter 解析边界修复**

   避免将 Markdown 内的 `---` 误认为 YAML frontmatter 起始。
   链接：https://github.com/anthropics/claude-code/pull/84004

7. **maintenance 脚本 top-level 错误能正确传递失败状态**
   链接：https://github.com/anthropics/claude-code/pull/84003

8. **gh wrapper 参数校验**

   gh issue list --limit 这类带参缺参导致的错误（此前尝试转发原命令）。
   链接：https://github.com/anthropics/claude-code/pull/83999

9. **标签值校验（--add-label / --remove-label）**

   修复 $2 unbound + 读不一致。
   链接：https://github.com/anthropics/claude-code/pull/83995

10. **循环重复 issue 的自引用拒绝**

    修复评论重复后（原 Base 数量）、自引用又发布的缺陷。
    链接：https://github.com/anthropics/claude-code/pull/83993

11. **test-hook.sh 期望决策断言**

   新 --expect allow|deny|ask 参数，防止 hook 与预期相反还通过。
   链接：https://github.com/anthropics/claude-code/pull/83992

12. **test-hook.sh jq 缺失依赖率先报错**

   不再把 `jq empty` 的失败错当成“无效 JSON”。
   链接：https://github.com/anthropics/claude-code/pull/83990

## 功能需求趋势

- **消息队列**（替代强制中断） —— 16: 198 40 辆，高比例要求下进入官方计划可能性很高。
- **跨机器 Agent-to-Agent 协议**：多 Agent 编排延伸至跨主机（38 条），尚在早期讨论。
- **子 Agent/后台 + 多会话控制权限键一致性**：旗舰级流程需求（后台运行未独立建项，但 #81343 突显资源控制缺失）。
- **模型工具选择改进**：倾向使用内置语义工具而非 Bash 命令（#1964987，已连续多次收集）。
- **稳定性**：Windows GPU 崩溃（#8044 / #81341 / #85540）与跨会话消息丢失（#86298/#86237）都是强 Regression，占今天主题。

## 开发者关注点

- **Windows 桌面端（MSIX）高危**：GPU 崩溃原覆盖多个触发面 —— 链接、浏览器预览、GPU 进程，功能主路径不可用且只能通过修复（Repair）后才能恢复。
- **跨会话消息可靠性回退**：2.1.227 引入回退后，消息可能显示但未入队（#86237），或进入审批但界面不可见（#86298），指向桌面端消息流录存问题。
- **国内常用技能包隐患**：/claude-api 这类内置 skill 默认全量加载，token 消耗和上下文爆炸两方面均有显著代价（#63566 / #87191 —— 后者涉及多语言 bundle 230k。
- **权限键不一致引发 muscle-memory 误操作**（CLI 1=Approve vs 桌面 1=Deny，同时 3-option 与 2-option 的 No 也不等，更不利于稳定性。

---

日报按官方数据与社区实际反馈整理，仅供内部参考，不构成对 Anthropic 官方未来指向的推断。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 - 2026-08-18

## 今日速览

今日社区动态聚焦于三大主线：**MCP 生态稳定化**（token 刷新与进程治理）、**代理与沙箱安全加固**（Linux 能力集剥离与 OTel 代理策略）、**远程/桌面协作体验修复**（macOS 回归与 Windows 桌面性能问题）。此外，GPT-5.6 上下文窗口提升至 872K 的 PR 提交，标志着模型能力边界上的又一关键扩展。

---

## 版本发布

**rust-v0.148.0-alpha.21**（8月17日）
- 面向 Rust 工具的预发布构建版本，无公开变更说明。建议关注后续 WHATS_NEW 文档。

---

## 社区热点 Issues（Top 10 精选）

### 1. 增加禁用 60 秒自动回复机制 - #28969
[查看详情](https://github.com/openai/codex/issues/28969)

社区反响热烈，获得 **79 条评论、195 👍**。用户希望提供配置文件选项以禁用 CLI/计划模式中的自动回复计时器，尤其强调长任务中的人工主导权。反映了多轮自主交互过程中对控制权设计的关切。

### 2. MCP OAuth Token 自动刷新失效问题 - #17265
[查看详情](https://github.com/openai/codex/issues/17265)

📌 **57 👍**，Pro 用户广泛关注。Codex 虽在存有 `refresh_token`，但无法自动刷新已过期的 MCP 路由访问令牌，导致工具调用持续失效。该问题已横跨近 5 个月，社区等待修复方案。

### 3. macOS 桌面端远程控制回归 - #37403
[查看详情](https://github.com/openai/codex/issues/37403)

🔧 回归报告：后 8 月 7 日桌面遍升级，用户无法通过移动端 Remote Control 恢复 CLI 线程，错误显示 `already has an active writer`。跨设备工作流的中断引发广泛适用场景担忧。

### 4. Windows 桌面本地 stdio MCP 服务异常反复拉起 - #38754
[查看详情](https://github.com/openai/codex/issues/38754)

⚠️ 新近更新后获得高关注度。每个语气/任务轮回都会重复 spawn 本地 MCP 服务进程且未被回收，导致资源泄漏和性能下降，影响于多轮会话场景。

### 5. 磁盘高延迟读循环导致桌面卡顿（Windows） - #38518
[查看详情](https://github.com/openai/codex/issues/38518)

📌 切换对话触发 350-800 MiB/s 持续读循环，系统级卡顿，性能回归 vs. 前版本。引发关于会话存储结构的深层疑问。

### 6. 不安全的文档前缀规则推荐 - #39085
[查看详情](https://github.com/openai/codex/issues/39085)

社区指出自动评审文档中示例前缀规则存在安全隐患，建议将精确匹配是非作为首选；**对安全审计与沙箱配置文风影响重大**。

### 7. Windows 端类型无效 item_ 推理 ID 校验缺陷 - #38955
[查看详情](https://github.com/openai/codex/issues/38855)

📦 与自定义提供商的分页入选特殊地址（`rs_` vs `item_`）不匹配，即便通过回放验证，导致过程中间错误。目前 #reviews 高热度，波及兼容性横切面。

### 8. 嵌入式返回空的历史记录 - #38762
[查看详情](https://github.com/openai/codex/issues/38762)

🧠 本地存迁移下 `resume` 后子线程显示空白历史，**离线迁移场景下的致命问题**，不仅依赖在线 API，且闪现度极低。倾向于 hint in C++迁移。

### 9. 1800+ 语法“远程 Python脚本死循环” - #38706
[查看详情](https://github.com/openai/codex/issues/38706)

远程压缩 job 404 异常，紧凑型 Auto-compact 导致任务终止。核心为“远程上下文不断压紧到极致”情形下任务无法存活。开发者反馈优先级高。

### 10. Windows Chrome 插件重装不注册 Native Messaging 主机 - #23283
[查看详情](https://github.com/openai/codex/issues/23283)

重装后插件失效且未重新生成注册项，影响 Windows 端 developer 上深度浏览器集成的可用性，且长期未解决（3 个月）。

---

## 重要 PR 进展（Top 10）

1. **GPT-5.6 上下文窗口提升至 872k tokens** - [PR #39102](https://github.com/openai/codex/pull/39102)
   支持 `gpt-5.6-sol/terra/luna` 的上下文重置（override up to 872k），同时适配 Bedrock 元数据绑定。

2. **运程 MCP 协议库更新 (rmcp 升级至 v3.1.2)** - [PR #39101](https://github.com/openai/codex/pull/39101)
   移除本地兼容壳层，原生支持多卷 tool result 解析与 OAuth protected-resource 元数据——直接改善 MCP 生态联动性。

3. **析出 Linux 沙箱 Capabilities** - [PR #39103](https://github.com/openai/codex/pull/39103)
   统一向 bubblewrap 调用传递 `--cap-drop ALL`，并在内部强制校验空 capability 集；提升沙箱安全底座。

4. **代码审查公平透明化：外部贡献策略** - [PR #39089](https://github.com/openai/codex/pull/39089)
   明确社区最佳介入点在高质量 issue 而非直接代码提交，兼讲维护者负担与信息损耗。

5. **新增 `codex queue` 命令** - [PR #39092](https://github.com/openai/codex/pull/39092)
   向既有线程队投递消息，支持基于 UUID/名称定位活动会话，兼容多样来源，强化 `/agents` 仪表板的校验基础。

6. **TUI 新增 Agents Overview Dashboard** - [PR #39094](https://github.com/openai/codex/pull/39094)
   支持 `/agents` 全屏查看所有 root sessions + 子代理状态、搜索+ 导航+ 项目分组过滤，刷新机制。

7. **TUI Dashboard 迭代（detail + 操作）** - [PR #39112](https://github.com/openai/codex/pull/39112)
   可直接从概览面板发起任务、重命名、停止执行；宽终端桌面增强，只显示 root 会话逻辑更清晰。

8. **AOT OTel Proxy 策略系列（多 PR 合集）** - #39105 ~ #39109 + #39091
   - `codex-http-client` 增加 blocking 与 async 统一代理、自定义 CA、NO_PROXY，**企业级部署网络合规性**升级。
   - Windows 低位实验管理栈同步感策略，Elevated 辅助 line 复用业已配置 HTTP 策略。

9. **实时会话镜像交互请求** - [PR #39113](https://github.com/openai/codex/pull/39113)
   将执行、审批、补丁等交互请求盒化到 realtime 会话中，用户无需切换即可评审。

10. **跟踪执行-服务器请求生命周期** - [PR #39098](https://github.com/openai/codex/pull/39098)
    从入队、派发、回调到生效分布的全链路 span 加入，为定位 client-handled 异常与策略回调提供**可观测性**

---

## 功能需求趋势

从 Issue 与 PR 综合大量投票，社区集中的几个关键方向：

1. **更细粒度的权限与审批机制**（#28969 等）：对 await 自动安装、自动审批要可控还是禁止（手动模式）。
2. **MCP 生态务实化**（多主题：token 缓存刷新、协议扩展如 rmcp 升级、Chrome 插件可靠性）——追求“一挂上即稳定”。
3. **代理与自动调节**：子代理任务唤醒（#15723）、安全行动规则开展、拒绝递归委派（#13491 —— fork worker 加大交互）。
4. **沙箱安全级确定性**（prd 补充 --cap-drop + 哨兵 style 校验）——开发者渴望 Linux 沙盒的“安全可验证”。
5. **一手三分法体验**：远程/本地任务在 Desktop/移动**双端**线路交互锐度，问题隐患度高（#37403、#23418、#28238）。
6. **Windows 原生属适度存疑调整**：含 stdio 进程反复拉起、native host 重刷（#23283、#38754、#38955）。
7. **性能稳定系数**：读话题型即在 350MB/s 级别回归 + 运行时回归 ✓（#38518 等），重点关注核心编排引擎 与 IO 设计。
8. **企业级治理与可观测自适应**（OTel 代理/Uploads、容量裁剪）双向并行。

---

## 开发者关注点

- **MCP/OAuth 纠错**：刷新与重连接路径不完善，成为第三方服务验证的长期 blocker（#17265 历经 4 个月未修）。
- **桌面与 CLI 差异**：查看"同一配置在 CLI 正常、App 异常"等多现内置（G #33599、#33282）。
- **模型行为引导**：GPT-5.6 有时会因内部“验证步骤”扁平化简单任务流程，需细粒度 prompt/上下文策略（#39059）。
- **CLI 细节润色**：backspace 超删，（#17793）；TUI /resume 过滤器重置（#36010），反观 M1 Pro padding 类似得。
- **指标可视化与日志可查性弱**：请求完成者吃根在每个环节 ✨ 回应 Trace ID（2 Security Ticket / Q3 Jan），可减少 #elementary occasions quadruple inその。
- **回放链存在不得体缺陷**：截止 #38763 空历史，更加无法流畅 resume：任务消失对持续开发阻碍大。

---
*本报告基于 github.com/openai/codex 数据自动汇总，部分内容代表社区当前讨论观点，不代表官方立场，仅为信息整理。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-18

## 今日速览

昨日社区活跃度极高，**Agent 子代理的可靠性问题**（MAX_TURNS 误报、generalist 挂死）依然是核心焦点。**Auto Memory 相关一组密集提交的 Issue（#26516 系列）**开始引起关注。此外今日有大量 **SSR Agent 修复 PR** 涌入，涵盖从 hook 状态保留到子代理权限控制的多个修复，其中“agents disabled 却仍执行子代理”的回归问题已被修复（PR #28867），同时 ACP 模式下工具调用的权限审批流程也有重要修复（PR #28870）。

## 版本发布

**Nightly 版 v0.56.0-nightly.20260817.g9a15c45fb** 发布，包含一项 SSR Agent 修复：为 `packages/cli` 的 tsconfig 添加 `composite` 标记（PR [#28813](https://github.com/google-gemini/gemini-cli/pull/28813)），解决构建或工具链问题。

---

## 社区热点 Issues

### 1. Subagent MAX_TURNS 后误报 GOAL 成功
- **Issue**：[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
- **热度**：12 条评论 | 👍 2 | P1 Bug
- **解析**：`codebase_investigator` 子代理在达到 `MAX_TURNS` 后仍返回 `Termination Reason: "GOAL"`，掩盖了实际的中断事件。这是一个核心可靠性问题，被社区 12 条评论讨论，是今天最热门的 Issue 之一。

### 2. Generalist agent 无限期挂死
- **Issue**：[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- **关键**：8 条评论，👍 8，P1
- **解析**：一个老问题（3 月创建）尚未解决。简单操作（创建文件夹）也会 hang，用户必要时需通过提示词阻止其 defer 到子代理才能绕过。社区关注度持续居前（8 赞），强烈建议官方尽快修复。

### 3. 稳健的组件级评估（组件级评估）
- **Issue**：[#24353](https://github.com/google-gemini/gemini-cli/issues/24353)
- **关键**：7 条评论，P1 EPIC
- **解析**：这是行为评估系统的后续 EPIC，目标是构建更稳健的组件级评估框架，增强 CLI 的自动化测试能力。对维护者和外部贡献者都很重要。

### 4. AST 感知工具的价值评估
- **Issue**：[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
- **关键**：7 条评论，P2 EPIC
- **解析**：评估 AST 感知的文件读取、搜索和代码库映射是否能提升 agent 效率并降低 token 消耗。这是一个前瞻性研究任务，更像是设计验证，关系到下一代“代码库导航”工具（例如 tilth 或 glyph）的引入。

### 5. Auto Memory 重试低信号会话
- **Issue**：[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
- **关键**：5 条评论，P2
- **解析**：Auto Memory 会对低信号的会话不断重试，导致处理循环，无法终结。这是本周 Auto Memory 系列焦点之一，说明记忆系统的鲁棒性仍是难点。

### 6. Auto Memory 的安全性问题
- **Issue**：[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
- **关键**：4 条评论，P2 **安全**
- **解析**：本地 transcript 上传前内容已在 model context，且易触发日志泄漏。加上提取 prompt 的“先上传后脱敏”模式，暴露出 Auto Memory 功能的隐私红线问题。

### 7. Shell 命令卡在“等待输入”
- **Issue**：[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
- **关键**：4 条评论，👍 3，P1
- **解析**：命令执行完成但 CLI 仍显示“等待用户输入”，用户必须手动干预。这个週期从 4 月至今（8 月更新）仍存在，属于非常影响日常使用的核心 bug。

### 8. 子代理素行权限未被遵守
- **Issue**：[#22093](https://github.com/google-gemini/gemini-cli/issues/22093)（已关闭）
- **关键**：3 条评论，P2
- **解析**：这是 v0.33.0 的回归 bug，只有 MCP 也页面配置为“禁用 agents”但仍被使用。对应修复 PR #28867 今日已关闭，属于重要的权限控制修复。

### 9. 工具数量超过 400 报错
- **Issue**：[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
- **关键**：3 条评论，P2
- **解析**：当可用工具超过 400 时直接 400 错误，社区期望模型能更聪明的按需限制工具范围。这会限制大 MCP 生态用户的使用体验。

### 10. /chat 分享功能不包含子代理轨迹
- **Issue**：[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)
- **关键**：2 条评论，👍 1，P3
- **解析**：子代理的轨迹虽然已保存，但通过 `/chat share` 无法轻松分享——这会降低调试和评估效率。期待后续支持可查看、可评估的子代理轨迹分享。

---

## 重要 PR 进展

### 1. 修复：ACP 模式下缺少待使用的工具调用状态通知
- **PR**：[#28870](https://github.com/google-gemini/gemini-cli/pull/28870)（Open，P1）
- **说明**：在用户确认权限之前，缺少 `pending` 工具调用状态的前置上报，导致客户端无法正确显示等待状态（违反 ACP 协议）。

### 2. 修复：Agent 模式禁用仍执行子代理（回归）
- **PR**：[#28867](https://github.com/google-gemini/gemini-cli/pull/28867)（Closed，P2）
- **说明**：修复了 v0.33.0 以来 `loadBuiltInAgents()` 执行检查的先后问题，确保在“禁用代理”配置下不会再运行子代理（generalist 等）。正是 issue #22093。

### 3. 修复：subagent 恢复时保留原始终止原因
- **PR**：[#28815](https://github.com/google-gemini/gemini-cli/pull/28815)（Closed，**P1**）
- **说明**：当子代理通过 `complete_task` 恢复后，原本的 `MAX_TURNS`/`TIMEOUT` 等终止原因会被重写为 “GOAL”，导致误报成功。修复后保留原始原因，恢复透明度。

### 4. 修复：消息总线失败时静默挂起
- **PR**：[#28816](https://github.com/google-gemini/gemini-cli/pull/28816)（Closed，P2）
- **说明**：`MessageBus.request()` 的 `publish()` 是飞来 Promise，如果不注册失败回调，会静默 hang 60 秒，严重影响开发调试效率。

### 5. 修复：TUI 初始化无限挂起
- **PR**：[#28812](https://github.com/google-gemini/gemini-cli/pull/28812)（Closed，**P1**）
- **说明**：在裸 Linux 环境下，`getProcessInfo()` 依赖 Unix `ps` 命令，若进程信息获取失败会导致 CLI 卡死“初始化...”，通过增加执行超时止损解决。

### 6. 修复：非根调度器（子代理）工具调用在 hook 状态丢失
- **PR**：[#28817](https://github.com/google-gemini/gemini-cli/pull/28817)（Closed，P2）
- **说明**：子代理的工具调用（`Executing` 状态）如果首次出现且不需要审批，会在进入 hook 状态丢弃，修复了相关逻辑错误，避免状态不一致。

### 7. 修复：autocomplete 清除命令后不补空格
- **PR**：[#28868](https://github.com/google-gemini/gemini-cli/pull/28868)（Closed，P2）
- **说明**：清晰命令补全添加空格后，每次执行都必须手动加空格才能回车，PR 修复了这一个高频 UX 问题。

### 8. 修复：maxTurns 等配置被 Browser Agent 忽略
- **PR**：[#2886?](https://github.com/google-gemini/gemini-cli/pull/2886?)（等待补充）
- **说明**：Browser Agent 有时会忽略 `settings.json` 中的 `maxTurns` 等配置参数，目前的 PR 未直接出现在前列，但相关跟踪中有多个延伸修复（详见 #22267），看来是 Agent 配置系统还没有完全链路统一。

### 9. 功能：扩展环境变更需用户主动内容措施
- **PR**：[#28863](https://github.com/google-gemini/gemini-cli/pull/28863)（Open，**安全**）
- **说明**：修复扩展更新可能绕过用户同意，以及可能注入不受信任的环境变量到 MCP 服务器进程的安全问题，通过将环境配置合成到“同意字符串”并过滤运行时环境变量。

### 10. 功能：默认忽略 .gemini 文件夹
- **PR**：[#28866](https://github.com/google-gemini/gemini-cli/pull/28866)（Open，P1）
- **说明**：在用户主目录运行 Gemini CLI 时，chokidar watcher 会把 `.gemini` 配置目录加入索引遍历，影响文件搜索体验，此 PR 将 `.gemini` 加入默认忽略名单（基于 Issue #28826）。

---

## 功能需求趋势

1. **Agent 可靠性核心地位**：围绕子代理（sub-agent）的 issue 占谈 1/3 以上（#22323、#21968、#23571、#21409、#21000），核心痛点在于子代理的“自动化失败恢复”和“任务完成终止原因透明化”。

2. **记忆系统（Auto Memory）成新焦点**：SandyTao520 一条 File 系列（#26516、#26522、#26525、#265 23）从重试、隐私（红秤）、非法容器等切入，展示了记忆系统在安全性和质量上面临系统性挑戰。

3. **AST 感知的资产管理**：#22745 与 #22746 两连 EPIC 进行 AST 工具在代码库映射中的应用调研，可能引入全新 Native 工具集（tilth/glyph），值得关注。

4. **权限与隐私**：除 #26525 扩展 “Auto Memory” 主动去识别外，#28863 也强调扩展如果管理势力变化，“同意”机制需要更严密 —— 用户对环境变量的知情权、同意权是重点。

5. **性能与体验**：Shell 操作卡死（#25166）、TUI 初始化 hang（#28812）、watcher 性能（# 28866）是容器使用最核心的痛点。

---

## 开发者关注点

- **Agent 模式配置可靠性**：#22093 被多次讨论（agents 禁用但仍执行），侧面反映**用户对 Agent 功能可控性和安全边界**期望很高，使用此配置的需求明显。
- **使用工作量极高的“挂死”问题**：#25166（待输入）、初始化 hang（#28812）等都属于直接卡住的体验问题，修复 PR 虽为 P1，但用户端和更新时间跨度较大，修复时间跨度过长。
- **Auto Memory 隐私保护顾虑**：开发者对 Auto Memory 背后“本地文件被读取后传输、日志记录”表达担忧，突出考虑：应该先实现本机脱敏再写模型，并减少日志敏感信息。
- **状态显示**：#22323 的这类“成功但其实是超时未尽”的虚假报告最容易影响信任，因此在子代理（sub-agent）的“… 的恢复逻辑处理中格外留意” 状态一致性。

---

*数据窗口：2026-08-17 ~ 2026-08-18 · 来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)*
*日报自动生成，仅供参考*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-18

## 今日速览

今日社区高度关注 MCP（Model Context Protocol）生态的稳定性问题，特别是 OAuth 认证兼容性缺陷（#4439、#4480）和结构化数据处理的 BigInt 序列化崩溃（#4211）。同时，会话管理相关的功能请求成为新一轮讨论焦点，覆盖了滚动、恢复、压缩等多个方面。值得留意的是，近期大量 issue 集中在 `1.0.79`/`1.0.80` 版本上，提示近期版本更新可能引入了部分回归问题。

---

## 社区热点 Issues（10个）

### 1. [#4480] Atlassian MCP OAuth 认证失败 — 迁移到 1.7.9 的回归问题
??? **重要性与社区反应**：该问题直接影响企业用户（Atlassian 的 MCP 服务器），测试时已收到 6 个 👍，看似是较新的回归，且与另一个 GitLab MCP OAuth 断线问题（#4439）症状高度相关，可能与 1.8 (1.7.9) 引入的 RFC 8414 执行规则调整有关。
??? **Issue**：链接： https://github.com/github/copilot-cli/issues/4489

### 2. [#4439] Copilot CLI 1.8 (1.7.9) 拒绝 GitLab MCP OAuth 元数据 — RFC 8414 发布者失配
??? **重要性与趋势**：这是一个比 Atlassian 问题更早的同类报告，且已被官方标注为 **CLOSED**，显示团队在快速跟进修复。两个问题合并说明半年前新版本中 OAuth 元数据检查策略受到了一些争议。
??? **链接**：https://github.com/github/copilot-cli/issues/4439

### 3. [#4211] MCP 响应支持 BigInt — 任务中断
??? **重要性**：**MCP 社区的课题（triage marked）**，但优先级很高。结构化工具返回超出 JavaScript 安全范围的整数时，CLI 直接挂起。对于依赖大数据交互的开发者，该问题可能长期存在，社区通过 👍 表达关注。
??? **链接**：https://github.com/github/copilot-cli/issues/4211

### 4. [#4509] `--no-alt-screen` 被悄悄移除：全屏模式无法关闭
此问题尽管只有少量评论，但意义深远。alt-screen 对某些终端工作流极为不友好，且该问题被标记为 **triage**，说明尚未处理。用户对前沿版本的 **CLI 操作破坏性变更** 提出了尖锐批评，评上 👍 也体现共鸣。
??? **链接**：https://github.com/github/copilot-cli/issues/4509

### 5. [#4390] 企业已开启的模型（如 Claude Sonnet 5等）在模型目录中不可用
??? **重要发现**：这是一条高需求点——特别是面向企业和**高级模型订阅**（Claude Sonnet 5/Opus 5），在企业 Admin 后台开启了模型，但 Copilot CLI 的设备仍无法访问该模型，严重影响了**大规模组织用户**的采购体验，社区共7个赞，讨论热烈。
??? **链接**：https://github.com/github/copilot-cli/issues/4390

### 6. [#4198] 内存看门狗在 23% 上下文用量时强制压缩，K 数次陷入循环直至内存耗尽
这是一个**关切的深度 bug**：内存压力被错误理解为上下文超限，导致聊过多/长时间连续压缩只能恢复很小量，从而继续循环直至进程崩溃。会引发的内存。 watch dog 应该 focus 在上下文用量而非总 VMM 内存。
??? **链接**：https://github.com/github/copilot-cli/issues/4506

### 7. [#4505] 恢复的 session 对中断响应保留过期的连接 item ID，所有提示词报 “ID 不匹配”
网络会话的恢复路径存在安全与结构性设计 Bug，严重阻碍恢复后的工作连续性，项目直接导致后续所有提示报错（即便 fork 也不行）。
??? **链接**：https://github.com/github/copilot-cli/issues/4505

### 8. [#4499] 会话选择器：已选但未激活的行无法与其他非激活行区分（低对比度）
遵循用户对**低对比度**的 a11y 疑问。即便界面不同，可以在设计上被轻易混为一谈。涉及具体可交互界面，同时也是用户 a 11y 痛点。
??? **链接**：https://github.com/github/copilot-cli/issues/4455

### 9. [#4514] 无法远程恢复本地 session（Triage）
随着协作场景扩大，远程同步session、/resume 能力变的很关键，此处恢复了本地直接失败。投票较少，但问题较新，也是一种信号。
??? **链接**：https://github.com/github/copilot-cli/issues/4514

### 10. [#4508] 长会话无法加载更新后的 `instructions` 文件
对于长期持续运行的 agents（超过 compaction）没有更新工作路径的 CWD 指导，直接导致自动化流程剥夺，坚定的项目会时不时中断任务可靠性。
??? **链接**：https://github.com/github/copilot-cli/issues/4508

---

## 重要 PR 进展

- **[#4510] Remove GitHub Copilot CLI documentation from README** — 作者: @prioritizedprotection086；创建: 2026-08-17；状态：OPEN。该 PR 直接删除 README 中的 CLI 使用说明，不符合常规营造的预期习惯，易招致反对，但其范围十分广，未经过社区讨论，得给赶上近来的大部分最新 Revert 引发争议一个参考。  
 ???链接: https://github.com/github/copilot-cli/pull/4510

---

## 功能需求趋势

- **MCP 生态的可行性与规范性**：很明显，目前 high concern 围绕 **OAuth 连接**（GitLab/Atlassian 等）、**BigInt 等类型的序列化处理**，以及 **Docker MCP 容器的生命周期** 展开，远程 MCP 的受理需要加剧的对等策略支持。
- **会话管理和恢复的可用性**：远超普通聚焦：光标滚动（#4313）、恢复时 stale 会话控制（#4505）、远程恢复（#4514）、长时间 session 压缩拉体育，这提示用户对 **CLI作为主力的生产环境开发工具** 的要求已经持续增高。
- **模型的客制化控制**：从“models 目录不可用”到“自定义 agent 不遵循 model 设置”（#2950），确认社区不满一刀切式模型策略，期望更细力度，尤其对 `Claude 5` 之类的新版本 + 中大型客户。

---

## 开发者关注点

- **失去对 UI 与输入的控制权**： 惊呼 #Canding: 从删除 `--no-alt-screen` 修改（#4509）到 SHIFT vs CTRL+Enter 输入键位流程冲突（#4481），开发者对使用“小改动但常见且不将就”的 UX 改动非常敏感，官方在快速迭代回归里无意间削弱了个性化空间。
- **System 特定回归的重率极高**：多个报告都**直接指向 1.0.79+**（GitHub OAuth**—-验证相关 设定 MCP 响应 BigInt）。
- **MCP 相关可靠性被诉的重灾区**，其中关于 `enabledPlugins` 在 `-p` 区别于 `interactive` 的不一致对于采用非交互模式的 CI 使用者显著。

---

## 今日总结

**重点关注的题眼**：围绕 GitHub 官方 1.8 最近的 MCP 重构丛生反复（连续两个 RFC 8414 认证失配），企业级 MCP 可用性能暴露明显，需要尽快再评估。**次要但重要**：在移除 `--no-alt-screen` 后的终端渲染体验，会是使用终端工作流的 Power User 的一次明显的 barrier。  
最终建议用户关注官方的已获得的回应，并观察今天晚上的叠代 fix 发行节奏。

---
> ???? 本日报数据来源 GitHub，仅做技术分析，不代表任何组织立场。  
> ????? 日期：2026-08-18，祝各位一天 coding 顺利！

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-18

## 今日速览

今日社区聚焦于 **Windows 平台稳定性**与 **模型网关兼容性** 两大议题，多个高热度 Issue 集中在 Windows 原生二进制、npm 安装路径、MCP 工具暴露等方面。PR 方面，核心修复给出地推进：**MCP token 刷新序列化**、**活跃会话注入保护**、以及 **网络文件系统禁用 WAL** 三个修复合并/提交，彰显稳定性仍是 V2 迭代主线。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues

### 1. 集成端点 410 错误 —— “legacy inference endpoint retired”
**#43105** ｜ 评论 15 ｜ 👍 0
用户报告使用 `https://opencode.ai/inference/v1` 作为端点时，所有 CLIs 均返回 `410 Gone`，但在 opencode 2 中尝试不受影响。疑似全局端点遗留问题，影响面较大。
[查看 Issue #43105](https://github.com/anomalyco/opencode/issues/43105)

### 2. Windows ARM64 原生二进制 TUI 启动失败
**#19130** ｜ 评论 18 ｜ 👍 12
用户在 Windows 11 ARM64 上运行 ARM64 原生二进制时，命令行可用但 TUI 初始化失败（`bun:ffi dlopen TinyCC error`）。该 Issue 历史较长，Win ARM 路径的早期支持问题仍未解决，受到社区高频关注。
→ [查看 Issue #19130](https://github.com/anomalyco/opencode/issues/19130)

### 3. 计费错误：出现异常高额收费
**#43009** ｜ 评论 6 ｜ 👍 1
用户报告“deepseek-v4-pro”请求被收取过高费用，希望解释并重置限额。若为计费缺陷，可能影响信任与商业化落地。
→ [查看 Issue #43009](https://github.com/anomalyco/opencode/issues/43009)

### 4. ChatGPT / OpenAI EU OAuth 拒绝 GPT-5.6 系列模型
**#40243** ｜ 评论 9 ｜ 👍 4
EU 数据驻留 workspace 用 OAuth 调用 GPT-5.6 被拒绝，而官方 Codex CLI 成功。OAuth 权限管理差异造成模型不可用，影响 EU 企业级用户。
→ [查看 Issue #40243](https://github.com/anomalyco/opencode/issues/40243)

### 5. MCP 工具已连接但不暴露给 agent
**#33027** ｜ 评论 8 ｜ 👍 3
`pdfrag` MCP 连接成功后 6 个工具不出现于 agent 列表中，说明 MCP 工具注册链路仍存在一致性 bug，影响依赖 MCP 的重度用户。
→ [查看 Issue #33027](https://github.com/anomalyco/opencode/issues/33027)

### 6. Plan Mode + Question 工具自动切换 Build 模式
**#7801** ｜ 评论 11 ｜ 👍 32
这是最受期待的功能请求：用户在 Plan 模式提问时，希望系统若判定需要执行代码可自动切至 Build，减少手动切换摩擦。
→ [查看 Issue #7801](https://github.com/anomalyco/opencode/issues/7801)

### 7. 归档会话无法恢复
**#24153** ｜ 评论 8 ｜ 👍 11
建议添加「Unarchive」服务。当前归档操作不可逆，导致用户操作盛行（宁可保留也不归档）。
→ [查看 Issue #24153](https://github.com/anomalyco/opencode/issues/24153)

### 8. Windows 外部目录路径与权限不支持
**#36681** ｜ 评论 7 ｜ 👍 0
JSON 权限配置 `external_directory` 缺少 Windows 路径规范，文档不清，权限无法生效。
→ [查看 Issue #36681](https://github.com/anomalyco/opencode/issues/36681)

### 9. Go gateway 模型列表与可调用模型不一致
**#42962**｜评论 3
`/zen/go/v1/models` 通告的模型对 chat completion 返回 503/400，列表≠实际可部署服务，易造成调用错误信息与选型误导。
→ [查看 Issue #42962](https://github.com/anomalyco/opencode/issues/42962)

### 10. `--continue` 注入正在使用的会话
**#43133** ｜ 评论 1（新）｜ 🔥 新增
`opencode run --continue` 选择最近更新会话，但另一实例正在使用该会话时，CLI 提示会被静默注入，导致外部干扰会话——属于数据安全级别 bug，已有修复 PR #43140。
→ [查看 Issue #43133](https://github.com/anomalyco/opencode/issues/43133)

---

## 重要 PR 进展

### 1. feat(plugin): expose MCP server transforms
**#43125** ｜ 新增
将 MCP 定义与配置解耦，并允许 Effect / Promise 插件 `list/get/set/update/remove` MCP transforms，注册顺序先于外部插件，利好 URL 策略改写。
→ [查看 PR #43125](https://github.com/anomalyco/opencode/pull/43125)

### 2. fix(core): 支持旧版 previous-channel 数据库
**#43142** ｜ 新增
让 V2 数据库导入器容忍 `opencode-next.db` 早期 schema（缺 project/session 列），修复 #43139 与 #41341。
→ [查看 PR #43142](https://github.com/anomalyco/opencode/pull/43142)

### 3. fix(core): 网络文件系统上禁用 WAL
**#43141** ｜ 新增
对 NFS / SMB 等网络 FS 自动切换 SQLite rollback journal（避免 WAL 锁），另有环境变量 `OPENCODE_DB_WAL=true|false` 可覆盖。
→ [查看 PR #43141](https://github.com/anomalyco/opencode/pull/43141)

### 4. fix(core): MCP OAuth token 刷新序列化 ✨
**#43074** ｜ 已合并
修复多个 MCP client 并发使用同一 refresh token 导致的 `invalid_grant`。
→ [查看 PR #43074](https://github.com/anomalyco/opencode/pull/43074)

### 5. refactor(app): 迁移 app 至共享服务端数据层
**#43017** ｜ 已合并
迁移 app 消费者至共享同步层，移除重复 sync / reducers / legacy caches，为后续 2.0 统一布局铺路。
→ [查看 PR #43017](https://github.com/anomalyco/opencode/pull/43017)

### 6. fix(session): `--continue` 跳过 in-flight 会话
**#43140** ｜ 新增
直接修复 #43133：第二实例不再向活跃会话注入 prompt，加入 liveness 检查。
→ [查看 PR #43140](https://github.com/anomalyco/opencode/pull/43140)

### 7. fix(provider): Azure DeepSeek 适配器选择
**#43135** ｜ 新增
修复 Azure 上 DeepSeek-V4 未走专用 `deepseek()` adapter 的问题——此前只进 generic Azure chat adapter，导致 reasoning effort 失效与 custom variant 失败。
→ [查看 PR #43135](https://github.com/anomalyco/opencode/pull/43135)

### 8. fix(console): preserve inference sessions
**#43124** ｜ 新增
修复 legacy Zen 路由转发至 managed inference gateway 时 session header 丢失的问题，确保持续计费与 debug 可追溯。
→ [查看 PR #43124](https://github.com/anomalyco/opencode/pull/43124)

### 9. feat(plugin): 新增与效果化 MCP 配置
**#40125** ｜ 新增
允许每个 MCP 自定义信任策略：不使用全局关闭校验，而是 `fingerprint pinning` 信任特定自签名证书，补足 `caFile` 场景。
→ [查看 PR #40125](https://github.com/anomalyco/opencode/pull/40125)

### 10. feat(ai): Vertex 请求标签支持
**#43129** ｜ 已合并
在 Vertex Gemini provider 中显式传递 billing labels，不干扰标准 Gemini 路由。
→ [查看 PR #43129](https://github.com/anomalyco/opencode/pull/43129)

---

## 功能需求趋势

从本期 Issues 中可提炼出以下四个社区热门需求领域：

- **跨平台一致性在 Windows 上强烈**（特别是 ARM64 版本、npm 安装权限、路径处理、`cmdlet` permission）——往往是企业用户采用的关键阻塞点。
- **会话生命周期管理**：归档恢复（#24153）、`--continue` 安全性（#43133）、协议会话转发保留（#43124）等，都是强烈诉求。
- **MCP 配置更灵活**：per-server trust（#40125）、MCP server 定义 Transform（#43125），用户希望 MCP 机制能从“能连”走向“可编程”。
- **计费 / 网关稳定性**：端到端稳定性（#43009、#42962）与可持续计费（#43105），说明社区用户正把 opencode 作为生产依赖。
- **Mobile UI 与跨设备体验**：#42834 推理强度选择与发送按钮重叠 → 移动端继续优化缺口。

---

## 开发者关注点

- **错误上报链路不完全透明**：多个 issue 出现[”没有相关的 reproduction“]、以 shell session 为单位无法定位的 bug（如 #22861），期待引入 session 级别 trace / 更好的 debug 导出。
- **Windows 通道仍然是痛源**：npm global crash（#42592）、postinstall 二进制拷贝 stub（#41370）、grep 工具提取失败（#40623)——这周 Windows 问题占了相当比例，开发者的配置成本高于预期。
- **模型覆盖陈旧/断裂**：ChatGPT 欧区 OAuth（#40243）与 Azure DeepSeek adapter 修复（#43135），反应对大模型服务商同时支持可控性与适配度要求高。
- **强制更新频率与乱收费担忧**：Multiple 模型公开上线与建议的 4小时频率（#43009），社区对收费与模型重置机制的透明性有很高的期待。

---

© 2026 OpenCode 社区日报 | 数据来源：github.com/anomalyco/opencode | 更新至 2026-08-18

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-18

## 1. 今日速览

Qwen Code 发布 **v0.21.13**，主要带来 Web Shell 文本文件拖拽附件能力及对话 Fork 功能。开发组持续大幅投入 CI/Review 自动化管线（autofix、沙箱验证、平台兼容性），同时 **Windows Ctrl+V 粘贴回归**、**自动修复流程资源浪费**、**上下文压缩丢失** 等问题引发社区集中讨论。

---

## 2. 版本发布

### v0.21.13
- **亮点**：
  - Web Shell Compose 已支持通过拖拽/粘贴/编辑文件作为文本附件（与图片并列）🔗 [#9180](https://github.com/QwenLM/qwen-code/pull/9180)
  - 用户可以从任意 Assistant 回复处 fork 对话。
- 另发布 nightly 版本 `v0.21.11-nightly.20260817`，含 autofix 默认拒绝脚印网关等改进。

---

## 3. 社区热点 Issues（Top 10）

### 1. [P1] Windows CLI 粘贴完全失效——自 0.21.x 回归
- **#9061**: 从 0.21.0 到 0.21.11 之间起，Windows 下 Ctrl+V 完全无响应；系统剪切板正常，降级 0.21.0 后恢复。评论多人同感。
- 讨论热度高（6+），直接影响高频用户。
- [issue #9061](https://github.com/QwenLM/qwen-code/issues/9061)

### 2. [P1] Qwen Autofix：review 风暴与重复参与分配消跑 runner 容量
- **#9296**: 8月16日约500次运行中 59% 被取消，发现 4 类效率类 bug，包括对**已关闭/已合并 PR 仍启动 autofix**（P0），管道存在严重浪费。
- 是被社区 manager 提出、描述清晰的 PoC。
- [issue #9296](https://github.com/QwenLM/qwen-code/issues/9296)

### 3. 消息被多次投递且打断当前会话 (Qwen 3.8 Max)
- **#9324**: 桌面版推测模型每轮思考时主动提示“收到多条相同请求”，且持续中断当前任务。用户手动暂停。触发是否与粘贴、滚动、tab 切换有关，仍需开发确认状态 need-information。
- 高活跃（7条评论），涉及核心模型一致性问题。
- [issue #9324](https://github.com/QwenLM/qwen-code/issues/9324)

### 4. [P2] VP 模式下内容未底部对齐：最后消息与输入框间有空白
- **#9300**: 默认模式（useTerminalBuffer=true），大量空白区域。用户明显感知视觉低质，待 need-discussion。
- [issue #9300](https://github.com/QwenLM/qwen-code/issues/9300)

### 5. [P2] 上下文压缩后状态丢失（/compression-fast 后 /rewind 等）
- **#9312**: 将 102k tokens 压缩到 87k 后，重启/切换模型后上下文未恢复，预期保留原始压缩结果。
- 落在核心的能力一致性上，和 #9309 同族。
- [issue #9320](https://github.com/QwenLM/qwen-code/issues/9320)

### 6. 压缩时 token 系统计算仍可见错误
- **#9309**: 先 compress-fast（170k→7?），再 compress 后读取的数值与预期函数差 ✖️ 对不上。缩小 session 可信推测需断区。
- [issue #9309](https://github.com/QwenLM/qwen-code/issues/9309)

### 7. 取消 Prompt 时（Ctrl+C）已输入内容不再恢复
- **#8316**: 已复现个人的再次人工重打（可能手动复制找回），造成生产重复 3 周左右，评论多要求回滚行为。
- [issue #8316](https://github.com/QwenLM/qwen-code/issues/8316)

### 8. [P2] Multi-workspace daemon 资源超额占用的追踪
- **#8051** & **#8091**: daemon有注册数与 session 计数上限，但请求体、WebSocket 与实际内存不受限。官方回 FIL，正拆分可审 PR。
- 长期后台演进，影响 `qwen serve` 的使用边界。
- [issue #8051](https://github.com/QwenLM/qwen-code/issues/8051) / [issue #8091](https://github.com/QwenLM/qwen-code/issues/8091)

### 9. [P2] 微信通道 typing 状态在长 task 中过期
- **#9353**: 模型运行超过微信侧单次 typing 有效期后，用户看到状态消失；建议轮询 或 周期续发。
- 新增但从平台扩展角度有 3 条讨论，并有 PR 配套。
- [issue #9353](https://github.com/QwenLM/qwen-code/issues/9353)

### 10.[P2] 新文件权限硬编 0600，忽略 umask、不可配置
- **#9250**: `serve` 新建文件始终 owner-only，无 override；个人用户权限权控受影响，衍生加了环境变量 fix 的 PR #9364。
- 权限痛点明确。
- [issue #9250](https://github.com/QwenLM/qwen-code/issues/9250)

---

## 4. 重要 PR 进展（Top 10）

### 1. feat(webui): 为导出 HTML 查看器增加全局展开/折叠控制
- **#9367**: 给 `/export` 模板追加全局开关，广播至每个折行语义节点。直接体现 #8208 的扩展生态。
- [PR #9367](https://github.com/QwenLM/qwen-code/pull/9367)

### 2. fix(ci): 恢复 macOS/Windows 测试 trigger
- **#9370**: 增加了平台敏感分类器和 nightly main 触发，避免 mac/win 长期无覆盖。
- [PR #9370](https://github.com/QwenLM/qwen-code/pull/9370)

### 3. feat(review): Aone Code 读取路径（第二 code review 平台）
- **#9226**: 在 #9092 的基础上增加 alibaba 内部 Aone 读取支持，寄存器算法一致。
- [PR #9226](https://github.com/QwenLM/qwen-code/pull/9162)

### 4. feat(daemon) — serve 新文件 mode 可配
- **#9364**: 实现环境变量 `QWEN_SERVE_NEW_FILE_MODE`(owner/system policy) 从 working dir factory 穿线。
- [PR #9364](https://github.com/QwenLM/qwen-code/pull/9364)

### 5. feat(mcp) — MCP 2026 core & WebShell Apps host
- **#8992**: 添加 2026 MCP 协议，自动协议协商 + ⽀ ppx `ui://` 与 WebView refresh 验证。
- 延长 WebShell 生态扩展半径。
- [PR #8992](https://github.com/QwenLM/qwen-code/pull/8992)

### 6. fix(web-shell) — 限制 daemon transcript 保留防 OOM
- **#9303**: 浏览器端释放 snapshot、replay 回源同cap，预防大量显存撑到 webview 崩溃。
- [PR #9303](https://github.com/QwenLM/qwen-code/pull/9303)

### 7. add /takeover from N 参数
- **#9321**: 为接手机器人提供 `@qwen-code /takeover from N` 作为 round 计数种子，方便即时接手中断的 review 场景。
- [PR #9321](https://github.com/QwenLM/qwen-code/pull/9321)

### 8. feat(review) — 增加进展曲线位置时输出加入 “approact vs patch” 判断
- **#9340**: 超过 N 轮且 diff 显著增长时，在回帖末尾追加 1 段指导意见：问题可能出在外部尺寸而不是当前 patch。
- [PR #9340](https://github.com/QwenLM/qwen-code/pull/9340)

### 9. feat(triage) — 沙箱验证中增加确定漂移门
- **#9130**: 新增的/修改单元默认重跑 5 轮（可配），连续多次至少一次通过，失败即快速向 autofix轮转。
- [PR #9130](https://github.com/QwenLM/qwen-code/pull/9130)

### 10. refactor(review) — scope 收敛基于 PR diff 自观察
- **#9267**: 介于旧 oracle 事后证明，改为拿到 PR `base..head` diff 临时创建目击 prism，再推进留 top 层。
- [PR #9267](https://github.com/QwenLM/qwen-code/pull/9267)

---

## 5. 功能需求趋势

从近期 Issues / PR 提炼，社区需求聚合三个方向：

1. **专业性可运维（serve/daemon）**
   - 文件权限可配置（#9250、#9364）
   - 多 workspace 资源限制的落地（#8051/#8091）
   - daemon 跨平台网络过滤标准化（#9158）

2. **智能化编辑与校验自动化**（自研代码质量层）
   - 沙箱化验证 + flaky 滚动（#9130）
   - autofix 接管状态机（#9297、#9321）
   - 平台敏感跨机测试触发（#9370）

3. **集成与 WebShell 生态**
   - MCP 2026 支持带应用 host（#8992）
   - 导出 HTML/目录脚本（#9367、#9340）
   - 微信通道文件发送（#9352、#9353）
   - OCR 之外动态模型列表（ModelStudio）（#9368）

---

## 6. 开发者关注点（高频用户与痛点）

| 主题 | 关键反馈 | 负面/影响 |
|------|----------|-----------|
| **Windows 输入回归** | Ctrl+V 失效（#9061）、UI 拷贝选中字段无响应（支持 UA，对应 /about） | 高频“无谓停止”，最新版 v0.21.13 仍未解决 |
| **上下文压缩一致性** | 多份报告（#9309、#9320）显示 compress 后 rewind/状态不可靠、token 计数徘徊 | 直接阻塞长会话工作流 |
| **会话中断恢复** | Ctrl+C 提示后内容立即丢失（#8316 已一个半月未统一修复） | 常见正确性为先的 IDE 常态化需求 |
| **agent-team 稳定性** | 交互页标签页打开错误 agent 信息崩溃（#9290），agent-team 授权不对等问题 #9283 | 多 agent 场景可用性下降 |
| **多平台可访问** | mac/win 对粘贴/渲染存在细节差（#9300、#9061、#3806 UI 闪烁） | 平台拥注重望很交 |
| **自动化管线预算** | 关闭的 PR 仍在自动打架/资源消耗（#9296） | 用户对资源之争（runner 负载）表达显式不满 |

---

> 报告生成时间：2026-08-18 · 数据源：github.com/QwenLM/qwen-code (Issues+PR Releases)

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*