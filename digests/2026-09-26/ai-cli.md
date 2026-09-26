# AI CLI 工具社区动态日报 2026-09-26

> 生成时间: 2026-09-26 02:26 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告 — 2026-09-26

## 1. 生态全景

AI CLI 赛道已形成多强并立的差异化竞争格局：Claude Code 以插件生态（Mods）与 Connector 集成为核心推进扩展性，OpenAI Codex 依托 GPT-6 与 Amazon Bedrock 加速模型与多云部署，Qwen Code 则在 Managed Agent 架构和 A2A 协议上布局企业级多机协作，三者代表不同的技术路线。与此同时，稳定性问题在各工具间集中爆发——Windows 平台缺陷（Codex 窗口风暴、Qwen 更新链路）、认证异常（Codex 401、Copilot 令牌失效）、插件状态污染（Claude Telegram 系列 bug）共同说明行业正从「功能拉新」转向「基础设施可靠性」的精细化打磨。社区对模型行为可控性、会话持久化、计费透明化的诉求持续升温，正在倒逼厂商重构权限、缓存与渲染等底层机制。

## 2. 各工具活跃度对比

| 工具 | 版本发布 | 今日 Issues（列示数/热度信号） | 今日 PR（列示数/主要方向） |
|------|---------|------------------------------|---------------------------|
| **Claude Code** | v2.1.283（网关提示头、availableModelsMatch） | 10 条；最强诉求 #27302 多 Connector 账户（👍 390） | 5 条；Mods 类型声明、系统提示分段、diff 钩子修复 |
| **OpenAI Codex** | rust-v0.157.0 / v0.157.1 + 2 个 alpha | 10 条；#48237 401 认证（👍 102，94 评论） | 10 条；Windows daemon 修复、MCP 隐藏窗口、沙箱 .aws 保护 |
| **Gemini CLI** | v0.63.0-nightly（diff.external 修复） | 4 条列示（实际可能更多）；Subagent 可靠性与挂起是焦点 | 未列示明细，提及「一批高优 PR」 |
| **GitHub Copilot CLI** | v1.0.89-4（模型路由建议、插件开关） | 10 条；#2627 系统提示定制（👍 20）、#4438 技能不可达（👍 11） | **0 条**（过去 24h 无 PR） |
| **Kimi Code CLI** | 无 | 无 | 无 |
| **OpenCode** | 无（连续多日无正式版本） | 10 条；#9281 统一用量（👍 34）、#29703 会话历史丢失（👍 25） | 10 条；Agent Manager、安全加固、指令解析恢复 |
| **Qwen Code** | v0.24.6 正式版 + SDK TS v0.1.16 + Desktop v0.24.6 + nightly | 10 条；#12380 Managed Agent 架构（24 评论）、#12416 Remote-SSH EPIPE（P1） | 10 条；Hosted Harness、ACP

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据快照：2026-09-26 ｜ 来源：[anthropics/skills](https://github.com/anthropics/skills) 官方仓库**

---

## 一、热门 Skills 排行（Top 8）

> 说明：数据中所有 PR 评论数未公开，以下按社区讨论深度、更新活跃度与关注热度综合排序。所有 PR 当前均为 **open** 状态。

### 1. skill-creator 触发器评估修复（#1298）
- **功能**：修复 Skill 触发器（trigger）误报与评分失效问题——解决 Windows 下 `select()` 子进程管道失败、并发探测竞争、无关工具中断扫描等根因；同时避免运行时失败被误判为"非触发"，防止负例误通过。
- **讨论热点**：`skill-creator` 是社区创建新 Skill 的入口工具，其评估可靠性直接决定 Skill 质量门槛，Windows 兼容性成为核心诉求。
- **状态**：open ｜ 最近更新 2026-09-16
- [PR #1298](https://github.com/anthropics/skills/pull/1298)

### 2. proofcore-contract-auditor 智能合约审计（#1771）
- **功能**：面向 Web3 开发者的新 Skill，对 Solidity / Rust 智能合约做自动化静态分析，并通过 ProofCore 零存储 Merkle 协议将审计密码学证明锚定到 TON 区块链。
- **讨论热点**：区块链出圈场景首次进入官方 Skills 仓库；审计证明的上链存证机制是社区热议的差异化亮点。
- **状态**：open ｜ 近期活跃
- [PR #1771](https://github.com/anthropics/skills/pull/1771)

### 3. md2video-audio：Markdown 直出视频（#1703）
- **功能**：零成本将 Markdown 文档经 Marp 转为幻灯片，并合成真人感语音旁白，直接产出 MP4 视频。
- **讨论热点**：把"文档→演示→视频"全流程压缩进一个 Skill，代表内容生产自动化的重要方向。
- **状态**：open ｜ 最近更新 2026-09-15
- [PR #1703](https://github.com/anthropics/skills/pull/1703)

### 4. Pyxel 复古游戏开发（#525）
- **功能**：指导 Claude 用 Python Pyxel 库创建、调试、验证复古像素游戏，支持 headless 输入驱动运行与逐帧检查。
- **讨论热点**：游戏开发类 Skill 少有的完整方案，包含独立的行为/演示/发布参考文档；长期保持更新（最近 9-22）。
- **状态**：open ｜ 长期活跃
- [PR #525](https://github.com/anthropics/skills/pull/525)

### 5. document-typography 文档排版质检（#514）
- **功能**：自动拦截 AI 生成文档中的典型排版问题——孤行（1-6 词溢出到下一行）、标题寡妇段（节标题被孤立在页底）、编号错位。
- **讨论热点**：直击"AI 文档一眼假"的痛点，被评价为影响每份生成文档的通用质量关卡。
- **状态**：open ｜ 最近更新 2026-03-13
- [PR #514](https://github.com/anthropics/skills/pull/514)

### 6. AWT：AI 驱动的 E2E 测试（#822）
- **功能**：开源工具 [AI-Watch-Tester](https://github.com/ksgisang/AI-Watch-Tester) 的 Skill 封装，赋予 Claude 视觉与浏览器控制能力，零代码自动生成并运行端到端测试。
- **讨论热点**：测试生成赛道中少有的"视觉驱动"方案，近期持续活跃（9-19）。
- **状态**：open ｜ 长期活跃
- [PR #822](https://github.com/anthropics/skills/pull/822)

### 7. ODT / OpenDocument 全流程（#486）
- **功能**：创建、填充、读取 OpenDocument 格式文件（.odt/.ods），并支持 ODT 转 HTML；触发词覆盖 "ODT/ODS/ODF/OpenDocument/LibreOffice"。
- **讨论热点**：补齐了 PDF/DOCX 之外的办公文档生态位，开源 ISO 标准格式诉求明确。
- **状态**：open ｜ 最近更新 2026-04-14
- [PR #486](https://github.com/anthropics/skills/pull/486)

### 8. testing-patterns 全栈测试模式库（#723）
- **功能**：覆盖测试哲学（Testing Trophy 模型）、单元测试（AAA 模式/纯函数/边界）、React 组件测试（Testing Library）等完整测试栈的综合性 Skill。
- **讨论热点**：回答"该测什么、不该测什么"的元问题，定位为团队级测试规范落地工具。
- **状态**：open ｜ 最近更新 2026-09-21
- [PR #723](https://github.com/anthropics/skills/pull/723)

---

## 二、社区需求趋势（来自 Issues）

### 1. 安全与信任边界（最高关注，43 评论）
- **#492**：社区 Skill 借 `anthropic/` 命名空间分发，构成信任边界滥用漏洞——用户可能给非官方 Skill 授予过高权限。这是当前社区最尖锐的治理议题。
- **#1175**：在 SKILL.md 中直接写 SharePoint Online 访问控制/权限逻辑的安全与上下文窗口担忧。
- [Issue #492](https://github.com/anthropics/skills/issues/492) ｜ [Issue #1175](https://github.com/anthropics/skills/issues/1175)

### 2. 企业级组织共享（16 评论，👍8）
- **#228**：要求在 Claude.ai 内实现组织级 Skill 共享，替代"下载 .skill → Slack 传输 → 手动上传"的低效链路，直接推动 Skill 库/共享链接能力。
- [Issue #228](https://github.com/anthropics/skills/issues/228)

### 3. 评估与调试工具链（12 评论，👍7）
- **#556**：`run_eval.py` 用 `claude -p` 跑测试时触发器命中率恒为 0%，评估体系可信度受质疑。
- **#1390**：mcp-builder 的 evaluation.py 对真实 MCP 服务器打分恒为 0/N（TextContent 序列化错误被吞成工具报错）。评估基建的可靠性已成为生态瓶颈。
- [Issue #556](https://github.com/anthropics/skills/issues/556) ｜ [Issue #1390](https://github.com/anthropics/skills/issues/1390)

### 4. Skill 稳定性与运行机制
- **#62**：用户 12 个 Skill 全部消失（10 评论）。
- **#189**：document-skills 与 example-skills 插件内容重复，导致上下文窗口装进重复 Skill（👍9）。
- **#1487**：`claude-api` Skill 单次调用注入约 156k tokens，直接耗尽上下文窗口。
- [Issue #62](https://github.com/anthropics/skills/issues/62) ｜ [Issue #189](https://github.com/anthropics/skills/issues/189) ｜ [Issue #1487](https://github.com/anthropics/skills/issues/1487)

### 5. 新方向提案
- **#1329 compact-memory**：用符号化记法压缩长期运行代理的持久记忆，降低上下文消耗。
- **#412 agent-governance**（closed）：AI 代理系统的安全治理模式（策略执行/威胁检测/信任评分/审计轨迹）。
- **#1385 Reasoning Quality Gate**：任务前校准 → 对抗性评审 → 交付验证的三阶段质量门流水线。
- **#16 Expose Skills as MCPs**：将 Skill 能力以 MCP 协议暴露为可编程 API。
- **#29 AWS Bedrock 支持**：跨平台运行诉求持续存在。
- [Issue #1329](https://github.com/anthropics/skills/issues/1329) ｜ [Issue #412](https://github.com/anthropics/skills/issues/412) ｜ [Issue #1385](https://github.com/anthropics/skills/issues/1385) ｜ [Issue #16](https://github.com/anthropics/skills/issues/16) ｜ [Issue #29](https://github.com/anthropics/skills/issues/29)

---

## 三、高潜力待合并 Skills（近期可能落地）

均处于 open 状态，但近期有持续更新，合并概率较高：

| PR | Skill | 亮点 | 最近更新 |
|---|---|---|---|
| [#1792](https://github.com/anthropics/skills/pull/1792) | docx：LibreOffice 超时上报错误并校验产物 | 修正"假成功"缺陷，净化 DOCX 输出可信度 | 2026-09-25 |
| [#1734](https://github.com/anthropics/skills/pull/1734) | docx：检测孤立评论 | 定位文档结构完整性盲区 | 2026-09-25 |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder：适配 mcp≥2 导入变更与自定义 header | 解决上游库升级导致的兼容性断裂 | 202

---

# 🤖 Claude Code 社区动态日报 — 2026-09-26

## 📌 今日速览

今日最受关注的是 **v2.1.283 版本发布**，新增网关提示头分组能力与 `availableModelsMatch` 精确匹配设置。社区方面，**多 Connector 账户支持请求（#27302）已积累 390 赞**，成为当前最强诉求；同时 **Telegram 频道插件的 MCP 生命周期问题集中爆发**，多项 bug 指向插件状态缓存的机器级污染，是今日最突出的稳定性痛点。

---

## 🚀 版本发布

### v2.1.283

- **网关提示头增强**：新增 `x-claude-code-prompt-id` 网关提示头，允许 LLM 网关对同一用户提示词产生的多个请求进行分组。需通过 `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` 开启。
- **新增 `availableModelsMatch` 托管设置**：当设置为 `"exact"` 时，`availableModels` 条目将进行精确匹配（而非默认的模糊/前缀匹配），提供更严格的模型白名单控制。

🔗 [查看 Release 详情](https://github.com/anthropics/claude-code/releases)

---

## 🔥 社区热点 Issues（Top 10）

### 1. 支持多个 Connector 账户（同一连接器不同账号）— 评论 256 | 👍 390
**#27302** | 作者 @nathanmargaglio | 更新 2026-09-25

社区呼声最高的功能请求。用户希望在同一 Connector（如 GitHub、Gmail）下绑定多个不同账户，并在 Claude Code 与 claude.ai 网页端自由切换，目前只能使用单一账户，严重限制了多身份工作流。

🔗 https://github.com/anthropics/claude-code/issues/27302

---

### 2. Mods —— 让 Claude 扩展性提升 10 倍 — 评论 217 | 👍 126
**#91870** | 作者 @poteat | 更新 2026-09-26

Mods 插件系统的设计讨论帖，作者承诺在数周内（而非数月）交付函数钩子（function hooks）。社区反馈积极，设计方向已根据高信号反馈进行多次调整，是 Claude Code 插件生态的核心演进方向。

🔗 https://github.com/anthropics/claude-code/issues/91870

---

### 3. 模型系统性将 "verifiable" 误写为 "falsifiable" — 评论 6 | 👍 1
**#97305** | 作者 @blwfish | 更新 2026-09-26

一个精确、可复现的模型用词错误：4 个月内重复出现 4 次，且项目级修正无法跨项目迁移。反映出模型输出的持久性问题，以及项目记忆/规则作用域的局限性。

🔗 https://github.com/anthropics/claude-code/issues/97305

---

### 4. Telegram 频道插件：第二个会话杀死轮询器，频道永久失活 — 评论 3
**#81571** | 作者 @anish-nair-410 | 更新 2026-09-26

已复现 Bug：启动第二个 Telegram 会话会导致正在运行的 poller 被杀死，且无法自动恢复。对依赖 Telegram 渠道做异步协作的团队影响严重。

🔗 https://github.com/anthropics/claude-code/issues/81571

---

### 5. Opus 5.5 要求使用 unstable 版本 Claude Code — 评论 2 | 👍 5
**#96130** | 作者 @knksmith57 | 更新 2026-09-26

用户反馈 Opus 5.5 模型强制要求安装预发布（unstable）版本的 Claude Code 才能使用，稳定版用户无法获得新模型。社区对“模型与 CLI 版本强绑定”的发布策略提出质疑。

🔗 https://github.com/anthropics/claude-code/issues/96130

---

### 6. MCP OAuth 授权硬编码 `prompt=consent`，破坏 Entra 租户 — 评论 2
**#94804** | 作者 @mguttmann | 更新 2026-09-25

所有 Claude MCP 客户端（CLI、网页版、桌面端）在 OAuth 授权请求中硬编码 `prompt=consent`，导致禁用用户同意的 Entra（Azure AD）租户无法完成授权。此前 #49722 曾被错误地标记为已完成，实际从未修复。

🔗 https://github.com/anthropics/claude-code/issues/94804

---

### 7. 自动模式分类器误拦截授权部署操作 — 评论 2
**#91953** | 作者 @chrisfore | 更新 2026-09-26

Linux 平台上自动权限模式分类器会拒绝用户已明确授权的部署操作，且拒绝行为会在同一会话内叠加恶化。对自动化运维场景构成实际阻碍。

🔗 https://github.com/anthropics/claude-code/issues/91953

---

### 8. 恢复后台子代理时丢失 Prompt Cache — 评论 2 | 👍 2
**#94728** | 作者 @mustalk | 更新 2026-09-26

Bug（已复现）：恢复（resume）后台运行的子代理时，消息被标记为 `messages_changed`，导致 prompt cache 完全失效，且不生成 thinking 块。直接造成成本上升和响应变慢。

🔗 https://github.com/anthropics/claude-code/issues/94728

---

### 9. Opus 5.5 在工具调用链后忽略输出语言规则 — 评论 2
**#96601** | 作者 @BrianVegeta | 更新 2026-09-26

切换至 Opus 5.5 后，模型在连续工具调用（CI 日志、JSON、YAML 等英文输出）之后，频繁违反“用繁体中文回复”的规则，英文回复率从 0.4% 飙升至 4.2%。

🔗 https://github.com/anthropics/claude-code/issues/96601

---

### 10. 桌面端 (macOS) 语音快捷键只显示界面不录音 — 评论 1
**#97310** | 作者 @quango2304 | 更新 2026-09-26

macOS 桌面版全局语音快捷键触发“Speak to Claude”浮层后，不产生任何转写文本。该问题被标记为 invalid，但用户反馈仍值得关注语音输入链路的稳定性。

🔗 https://github.com/anthropics/claude-code/issues/97310

---

## 🔧 重要 PR 进展

### 1. mods：声明携带 `process.run` 截断标志与 `mtimeMs` 字段 — #97293
作者 @poteat | 更新 2026-09-25

为 mods 插件系统补充 TypeScript 声明：`$.process.run` 结果增加 `isStdoutTruncated` / `isStderrTruncated`，`$.fs.list` 条目增加 `mtimeMs`。需等待 npm CLI 实际支持这些字段后方可合并。

🔗 https://github.com/anthropics/claude-code/pull/97293

---

### 2. sec-default：系统提示词分段延伸至用户层 — #97241
作者 @poteat | 更新 2026-09-25

系统提示词的分段逻辑不再止步于用户层级，而是继续延伸。依赖引擎 `prompt.compose` 事件，测试目前为预期红色，需等待 CLI 版本支持。

🔗 https://github.com/anthropics/claude-code/pull/97241

---

### 3. diff：焦点钩子兼容引擎的两种元素命名 — #96953（已关闭）
作者 @poteat | 更新 2026-09-25

修复插件以 `cc-plugin-diff` 名称注册时，`ui.focus` 钩子因名称不匹配而失效的问题。

🔗 https://github.com/anthropics/claude-code/pull/96953

---

### 4. telemetry & agents-md：测试插件按名称连接收集器 — #96930（已关闭）
作者 @poteat | 更新 2026-09-25

仅改动测试代码：测试插件改为通过 `on('telemetry.log', { to: 'collector' })` 显式连接遥测收集器，使测试更贴近真实插件行为。

🔗 https://github.com/anthropics/claude-code/pull/96930

---

### 5. 为 Claude Code 添加缺失的来源 — #41611
作者 @tornikeo | 更新 2026-09-25

长期未合并的 PR，为 Claude Code 补充某个缺失的 source（来源）配置，具体功能细节待评审。

🔗 https://github.com/anthropics/claude-code/pull/41611

---

## 📊 功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

| 趋势方向 | 代表 Issue | 热度信号 |
|---------|-----------|---------|
| **多账户/多身份支持** | #27302 多 Connector 账户 | 👍 390，评论 256，持续高热 |
| **插件系统能力扩展** | #91870 Mods 函数钩子 | 👍 126，评论 217，官方承诺数周内交付 |
| **模型行为可控性** | #97179 模型擅自修改记忆规则、#96601 忽略语言规则 | 用户对模型“不听话”的容忍度下降 |
| **权限系统智能化** | #91953 自动分类器误判 | 自动化场景下的信任瓶颈 |
| **MCP 认证体验** | #94804 OAuth prompt=consent 硬编码 | 企业级用户受影响，修复未生效 |

---

## 💡 开发者关注点

### 1. Telegram 插件状态管理问题集中爆发
- #81571：第二会话杀死轮询器
- #78719：市场刷新后 MCP 启动失败
- #80822：headless 调用污染全局认证缓存，导致后续会话静默失败
- #97314：插件失败缓存是机器级的，单个会话故障会拖垮所有会话 15 分钟

> **核心痛点**：插件 MCP 的缓存与生命周期状态为机器级共享，缺少会话级隔离，一次误伤全局遭殃。

### 2. 模型发布策略与版本强绑定
- #96130：Opus 5.5 强制要求 unstable 版本 CLI，稳定版用户被排除在外。

### 3. 模型对用户规则的遵从度下降
- 多条 Issue 反映模型在工具调用后“忘掉”用户设置的语言、流程和记忆规则，且项目级修正无法跨会话迁移。

### 4. 权限系统误判与确认陷阱
- #91953：自动模式分类器误拦截已授权操作。
- #96096：Bypass 模式下 Chrome 工具仍反复弹权限确认，且“始终允许”无效。
- #97326：远程会话被确认弹窗卡死，但无 CLI 输入能力。

### 5. Prompt Cache 可靠性
- #94728：子代理恢复时缓存失效，导致成本上升。这是影响深层代理工作流的关键性能问题。

---

> **小编观察**：今日动态中，插件生态的“扩展性”（Mods）与“稳定性”（Telegram 系列 Bug）形成鲜明对比。官方将 Mods 作为长期发力点，但开发者当下更关心的是——**别让一个插件的故障瘫痪整台机器**。会话级隔离应成为插件系统的优先修复项。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-26

## 1. 今日速览

今日 Codex 发布了 0.157.0 正式版，引入 GPT-6 Sol/Luna 新模型及 Amazon Bedrock 支持；与此同时，Windows 平台控制台窗口反复弹出/闪烁问题成为社区最集中的痛点，相关 Issue 超过 8 条。此外，大量用户报告 401 认证错误（#48237 评论 94 条、👍 102 个），是当前热度最高的待解决问题。

---

## 2. 版本发布

### rust-v0.157.1
- 补丁版本，Changelog 无实质内容更新，仅提供版本对比链接。
- 链接：https://github.com/openai/codex/compare/rust-v0.157.0...rust-v0.157.1

### rust-v0.157.0
**新功能：**
- 新增 GPT-6 Sol 和 Luna 模型，支持 Amazon Bedrock 部署，并为旧模型提供迁移提示（#47332, #47347）
- 默认启用全屏转录，支持 Shift-click 扩展文本选择（#47178, #47414）
- 启用符合条件的后台服务器自动启动

**链接：** https://github.com/openai/codex/releases/tag/rust-v0.157.0

另有多个 0.158.0/0.159.0 alpha 预发布版本，主要为内部迭代，无公开变更说明。

---

## 3. 社区热点 Issues（Top 10）

### 1. #48237 — 401 Unauthorized 认证错误（热度最高）
- **现象：** 用户请求返回 `401 Unauthorized: Incorrect API key provided: sk-svcacct...`
- **评论 94 | 👍 102 | 状态：OPEN**
- **分析：** 今日最热 Issue，大量用户受影响，疑似服务端凭证校验异常。
- 链接：https://github.com/openai/codex/issues/48237

### 2. #48016 — Windows 上无法启动 Codex CLI
- **现象：** codex-cli 0.157.0 在 Windows 上启动失败，无订阅用户可复现
- **评论 22 | 👍 15 | 状态：OPEN**
- **分析：** Windows 平台启动阻塞问题，影响面较广。
- 链接：https://github.com/openai/codex/issues/48016

### 3. #48074 — Windows 安装 daemon 后终端窗口反复闪烁
- **现象：** 安装 Codex daemon 后，请求处理期间终端窗口反复闪烁
- **评论 14 | 👍 17 | 状态：OPEN**
- **分析：** 与后台守护进程的窗口创建逻辑相关，多人遇到。
- 链接：https://github.com/openai/codex/issues/48074

### 4. #48305 — 今日更新后 401 认证完全不可用
- **现象：** 更新后所有请求 401，用户称“完全阻塞工作”
- **评论 3 | 👍 1 | 状态：OPEN**
- **分析：** 与 #48237 同类，提交时间稍晚，可能是同批次问题。
- 链接：https://github.com/openai/codex/issues/48305

### 5. #48171 — Linux 桌面版无法打开历史聊天
- **现象：** 更新至 26.924.20706 后，历史聊天卡在 Loading
- **评论 6 | 👍 8 | 状态：OPEN**
- **分析：** Linux 桌面版回归问题，影响 ChatGPT Pro 用户。
- 链接：https://github.com/openai/codex/issues/48171

### 6. #48277 — CLI 更新后约 20 个顽固终端窗口持续打开
- **现象：** 用户手动关闭时仍不停弹出新窗口，约 20 个
- **评论 6 | 👍 2 | 状态：OPEN**
- **分析：** Windows 守护进程与终端创建失控的极端案例。
- 链接：https://github.com/openai/codex/issues/48277

### 7. #48195 — 请求将 `daemon_auto_start` 改为 opt-in
- **现象：** 0.157.0 起 CLI 默认自动启动后台守护进程，用户希望默认关闭
- **评论 4 | 👍 3 | 状态：OPEN**
- **分析：** 反映用户对守护进程默认开启的隐私与资源占用担忧。
- 链接：https://github.com/openai/codex/issues/48195

### 8. #40125 — Desktop 工作树子任务权限被降级
- **现象：** Full Access 工作树子项间歇性地被降级为 managed approval 模式
- **评论 13 | 👍 3 | 状态：OPEN**
- **分析：** 长期存在的权限持续性缺陷（自 8 月起持续更新）。
- 链接：https://github.com/openai/codex/issues/40125

### 9. #48212 — Linux Desktop 任务卡在 “Starting your task”
- **现象：** 更新至 26.924.20706 后，本地任务无法启动，CLI 正常
- **评论 5 | 👍 5 | 状态：OPEN**
- **分析：** 与 #48171 同版本回归，Linux 桌面端故障集中。
- 链接：https://github.com/openai/codex/issues/48212

### 10. #47370 — WSL2 下 F8 语音会话启动即停止
- **现象：** WSLg PulseAudio 音频后端导致语音会话无法持续
- **评论 4 | 👍 1 | 状态：OPEN**
- **分析：** WSL2 语音功能兼容性问题，影响 Linux 用户语音交互。
- 链接：https://github.com/openai/codex/issues/47370

---

## 4. 重要 PR 进展（Top 10）

### 1. #48318 — TUI 重连直到共享截止时间
- **修复：** 原来的 5 次重试限制可能早于 120 秒预算结束，导致恢复失败；现改为持续重试直到截止时间
- 链接：https://github.com/openai/codex/pull/48318

### 2. #48272 — 防止 Windows daemon 继承启动器 stdio
- **修复：** 分离的 Windows daemon 继承输出管道，导致调用方等待 EOF；现清除标准句柄继承标志
- 链接：https://github.com/openai/codex/pull/48272

### 3. #48238 — 抑制本地 Windows MCP 服务器的控制台窗口
- **修复：** 使用 `CREATE_NO_WINDOW` 启动本地 stdio MCP 服务器（含 Job Object 回退场景）
- 链接：https://github.com/openai/codex/pull/48238

### 4. #48224 — 压缩时保留模型与访问程序配对
- **修复：** 压缩使用上一模型时可能继承当前轮的访问程序，导致配对被服务器拒绝；现持久化恢复 `cyber_access_program`
- 链接：https://github.com/openai/codex/pull/48224

### 5. #48211 — 外部编辑器切换期间保持 Codex 可见
- **修复：** 全屏 TUI 调用外部编辑器时离开备用屏幕导致内容消失；现保留并重绘最后一帧
- 链接：https://github.com/openai/codex/pull/48211

### 6. #48206 — 警告查看器增加 keep-and-next 操作
- **功能：** 按 `k` 保留当前警告并前进到下一条，便于稍后回顾
- 链接：https://github.com/openai/codex/pull/48206

### 7. #48205 — 关闭警告查看器时消除已查看警告
- **修复：** 关闭查看器后已读警告不再残留在 badge 中
- 链接：https://github.com/openai/codex/pull/48205

### 8. #48176 — 保护沙箱可写根目录下的 `.aws` 目录
- **安全：** 即使父目录可写，`.aws` 仍保持默认保护，防止 AWS 凭证助手被篡改执行
- 链接：https://github.com/openai/codex/pull/48176

### 9. #48168 — 每次请求生成唯一 exec-server 进程 ID
- **修复：** 线程共享 executor 重试时可能复用旧进程句柄；现每次追加 UUID
- 链接：https://github.com/openai/codex/pull/48168

### 10. #48190 — SSE 帧解析前增加大小上限约束
- **安全：** 在解析前强制 `MAX_BODY`，防止超大字段和畸形 UTF-8 无限累积
- 链接：https://github.com/openai/codex/pull/48190

---

## 5. 功能需求趋势

1. **Windows 平台稳定性修复**
   控制台窗口弹出/闪烁/失控是今日最大痛点，涉及 daemon、MCP、hook、shell 命令多个触发点。

2. **后台守护进程自主性控制**
   社区明确表达希望 `daemon_auto_start` 默认关闭（#48195），要求守护进程生命周期可配置、可预期。

3. **Linux 桌面版体验追赶**
   多个 Linux 发行版（Fedora、Ubuntu）报告聊天加载、任务启动故障，表明 Linux 桌面端回归测试需加强。

4. **认证容错与诊断**
   401 错误成为热门话题，用户需要服务端状态页、更清晰的错误提示及自动重试机制。

5. **模型与部署生态扩展**
   GPT-6 Sol/Luna + Amazon Bedrock 支持表明 Codex 正扩展多云部署能力，社区将持续关注新模型适配。

6. **沙箱安全细粒度控制**
   `.aws` 保护、代理配置透传等 PR 说明 Sandbox 权限模型正在精细化演进。

---

## 6. 开发者关注点（痛点/高频需求）

- **Windows 控制台窗口风暴（最高频）：** 至少 8 个独立 Issue 指向同一类问题（#48074, #48277, #48114, #48325, #48090 等），且 0.156.0 回退可解决（#48087），说明 0.157.0 的 daemon 窗口创建逻辑为回归缺陷。
- **401 认证故障波及面广：** #48237（94 评论）与 #48305、#48308 协同发酵，服务端凭证校验疑似异常，阻塞用户正常开发工作。
- **升级后遗症明显：** 多个用户报告更新后（CLI 0.157.0 / Desktop 26.924.x）出现功能回归（聊天历史无法加载、任务卡死、窗口失控），升级验证流程需加强。
- **守护进程默认启用的争议：** 用户认为自动启动的后台进程不透明，希望默认关闭并增加首次启用提示。
- **Linux 桌面端可靠性：** 26.924.20706 在 Fedora/Ubuntu 等发行版上集中爆发会话加载与任务启动问题，影响 Linux 用户日常使用。
- **TUI 交互细节持续改进：** 外部编辑器切换、警告管理、文本粘贴等交互优化显示终端用户体验正在逐步打磨，但仍有提升空间（如 #17103 文本粘贴支持）。

---

*数据来源：github.com/openai/codex | 统计区间：2026-09-25 ~ 2026-09-26*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-26）

## 今日速览

今日发布了 v0.63.0-nightly 版本，修复了无效的 `diff.external` 配置覆盖问题。社区讨论热度集中在 **Subagent 可靠性**——MAX_TURNS 被误报为 GOAL 成功、Generalist Agent 无限挂起等 bug 引发较多开发者共鸣。与此同时，一批高优 PR 正在解决会话恢复状态污染、MCP 发现超时和无限认证循环等关键问题。

---

## 版本发布

- **v0.63.0-nightly.20260926.g2fe7c2d3f**：修复 `diff.external` 无效配置覆盖问题（PR #29467），并完成版本号自动更新。  
  https://github.com/google-gemini/gemini-cli/pull/29509

---

## 社区热点 Issues

1. **Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功，中断被掩盖**（#22323，评论 13）  
   `codebase_investigator` 子代理在触发最大轮次限制后，仍返回 `status: success` 和 `Termination Reason: GOAL`，即使未完成任何分析。社区认为这种“虚假成功”信号会直接影响上层任务决策，需优先修复。  
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **Generalist Agent 无限挂起**（#21409，评论 8，👍 8）  
   用户反馈一旦 Gemini CLI 委派给 generalist agent 就会永久挂起，简单的目录创建也要等待一小时。通过指示模型不使用子代理可绕过。该问题获得最多的 👍 数，反映其影响面较大。  
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **利用模型 bash 亲和力：零依赖 OS 沙箱与执行后意图路由**（#19873，评论 9）  
   该增强提案指出 Gemini 3 模型天然擅长使用 POSIX 工具链，希望在保证安全的前提下让模型以“原生 bash 用户”方式工作，并引入沙箱机制与执行后意图路由。属于安全与效率兼顾的设计方向。  
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **评估 AST 感知的文件读取、搜索和代码映射价值**（#22745，评论 7）  
   这是一个 EPIC，追踪 AST 感知工具是否能为代码库理解带来增益：更精准读取方法边界、减少上下文噪声、支持按结构导航等。社区关注其能否有效

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 · 2026-09-26

## 今日速览

昨日发布 v1.0.89-4，带来模型路由自动建议、插件启用开关等体验优化。社区侧，认证令牌失效与系统提示定制需求仍是讨论焦点；多个围绕自定义模型/端点的异常报告浮出水面，提示「模型接入链」已成为当前版本的主要风险点。PR 侧过去 24 小时暂无更新。

## 版本发布

**v1.0.89-4**
- **新增**：自动建议路由层级，并支持通过快捷键或点击快速切换
- **新增**：切走自动模型后弹出快速反馈提示
- **改进**：插件可直接启用/禁用；先前被标记为禁用但仍会加载的插件，现在会正确停止加载

## 社区热点 Issues

1. **#2627｜可配置系统提示，降低约 20.5k tokens 的固定开销** · 20 👍
   系统提示 + 工具定义在会话启动即占用近 30k tokens，用户希望裁剪固定开销。赞数位列本周榜首，说明高 token 消耗已成为普遍痛点。
   [查看 →](https://github.com/github/copilot-cli/issues/2627)

2. **#4438｜`disable-model-invocation: true` 导致技能完全不可达** · 11 👍 / 8 评论
   技能列表中正常展示，但模型经 `skill()` 调用时直接返回 `Skill not found`，该配置项本意是「仅限手动调用」，实际却变成彻底禁用。
   [查看 →](https://github.com/github/copilot-cli/issues/4438)

3. **#232｜为 Copilot CLI 增加 `--system-prompt` 参数** · 11 👍 / 6 评论
   已悬挂近一年，社区仍强烈希望获得仓库级指令之外的全局系统级提示词注入能力。
   [查看 →](https://github.com/github/copilot-cli/issues/232)

4. **#3501｜垂直滚动条导致文本错位** · 9 👍
   引入滚动条后 Windows 终端渲染异常，Console Host 与 Terminal 下均无法复现修复，Windows 用户受阻明显。
   [查看 →](https://github.com/github/copilot-cli/issues/3501)

5. **#4082｜CLI 与桌面端会话同步** · 9 👍
   要求「在 CLI 里开的会话能够在桌面应用里继续」，用户希望跨应用无缝续接工作上下文。
   [查看 →](https://github.com/github/copilot-cli/issues/4082)

6. **#4929｜进程内认证令牌停止刷新，所有提示失败直至重启** · 6 评论
   长时间运行的 CLI 进程在令牌失效后无法自愈，`/login` 无效，只能重启进程。对自动化/后台场景影响极大。
   [查看 →](https://github.com/github/copilot-cli/issues/4929)

7. **#4775｜Mission Control 仪表板链接 404：会话实际在 `/agents/tasks/<uuid>`** · 6 评论
   仪表板将远程会话链接指向 `copilot/tasks/<uuid>`，点击得到 404；CLI 端 `--resume=<uuid>` 却能正常恢复会话，前端路由与后端不匹配。
   [查看 →](https://github.com/github/copilot-cli/issues/4775)

8. **#4680｜CLI 向自定义 OpenAI 兼容端点发送错误模型 ID** · 4 评论
   配置的模型名为 `mimo-v2.5`，CLI 却在请求体里发送 `gpt-5.4-nano`，直接断掉整个会话。自定义端点兼容性再添一例。
   [查看 →](https://github.com/github/copilot-cli/issues/4680)

9. **#4960｜企业托管自定义模型在 `/model` 中可见但无法选中** · 2 评论
   通过 OpenAI 兼容提供商配置的企业自定义模型以 `(custom)` 展示，选中即卡死。该 issue 为新近上报，问题是否与 #4680 同源有待确认。
   [查看 →](https://github.com/github/copilot-cli/issues/4960)

10. **#4710｜`copilot-file-search` 线程失控：空转占满 CPU 并持续写磁盘** · 2 评论
    会话空闲时内部搜索线程仍在运行，单核打满且日志无上限增长。对长期挂机的 `--yolo` 用户是显著的资源泄漏隐患。
    [查看 →](https://github.com/github/copilot-cli/issues/4710)

## 重要 PR 进展

过去 24 小时内无 PR 创建或更新。v1.0.89-4 为当前活跃发布线，可关注主分支后续提交。

## 功能需求趋势

- **系统提示与上下文控制**：#232、#2627 均指向「用户应能自定义 system prompt / 裁掉固定 token 开销」，是目前赞数最高的两个需求方向。
- **会话可移植性**：#4082 希望会话能在 CLI 与桌面 App 间同步；#4775 则直指会话链接/路由的基础设施不一致。
- **模型选择机制**：#3053、#3138、#4960 反映出用户对「切换模型不丢失草稿」「reasoning effort 跟随模型」「企业自定义模型可选用」的精细控制需求。
- **技能系统完善**：#4438、#4838 表明技能（skill）的可见性与可用性存在预期落差，手动与模型调用两条路径的行为需要统一语义。

## 开发者关注点

- **认证稳定性是长期会话的头号问题**：#4929 中进程级令牌停止刷新后用户完全无力回天，社区期待 token 自刷新或自动重启机制。
- **自定义模型接入链脆弱**：#4680 与 #4960 暴露出模型 ID 覆盖、企业模型选择失败等兼容性问题，使用 OpenAI 兼容端点的用户受影响最重。
- **资源泄漏令人警惕**：#4710（文件搜索线程）、#4907（MCP 重连通知反复刷屏）、#4946（后台命令完成后触发 HTTP 400 thinking 错误）说明长驻会话在空闲/后台场景下仍有多处稳定性隐患。
- **配置与验证的严格度分歧**：#4969 报告 plugin marketplace 因单个描述超 1024 字符导致整个 marketplace 加载失败，社区认为应支持部分加载而非全盘拒绝。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-26

## 今日速览

今日社区动态以**批量关闭 7 月下旬遗留的旧 Issue** 为主（涉及计费异常、Desktop 崩溃、模型流式输出等问题），同时新涌现了 **Desktop 本地连接链接**（#51430）和 **OpenCode Go 订阅余额误判**（#51424）两个全新 Issue。PR 方面，社区提交了 **Agent Manager 与任务图管线**（#51426）、**六项安全加固**（#51407）等重量级变更，另有 **指令配置解析修复**（#51422）和 **使用量货币显示**（#51429）等功能。整体来看，**计费透明化、会话/目录管理、Desktop 稳定性** 是目前社区最集中的关切方向。


## 社区热点 Issues

### 1. 统一用量追踪 `/usage`（#9281） ⭐ 最热门
**状态：CLOSED，12 评论，34 👍**
OAuth 登录后没有内置方式查看套餐/速率限制用量，用户被迫去各个 provider 后台查看。
社区呼声极高，是近期 👍 数最高的 feature request。
🔗 https://github.com/anomalyco/opencode/issues/9281

### 2. TUI `/sessions` 选择器只显示最近会话（#13877）
**状态：CLOSED，11 评论**
TUI 内 `/sessions` 命令只能看到最近更新的少量会话，较旧的会话依然存在磁盘上但无法通过选择器访问，用户操作很受限。
🔗 https://github.com/anomalyco/opencode/issues/13877

### 3. 更改项目目录路径不应丢失会话历史（#29703）
**状态：CLOSED，10 评论，25 👍**
会话数据绑定项目文件夹路径，导致重命名/移动目录后所有聊天历史丢失。这是影响日常开发的数据持久性问题。
🔗 https://github.com/anomalyco/opencode/issues/29703

### 4. Windows 上启动第三个实例会删除全局 CLI（#35839）
**状态：CLOSED，7 评论**
Windows 10 + `npm i -g opencode-ai` 环境下，启动第三个 OpenCode 实例会导致全局 CLI 被移除。属于严重平台 bug。
🔗 https://github.com/anomalyco/opencode/issues/35839

### 5. 模型陷入重复工具调用死循环（#28596）
**状态：CLOSED，6 评论**
模型偶尔会用完全相同的参数无限循环调用工具，只能手动中断。Agent 需要加入循环检测/熔断机制。
🔗 https://github.com/anomalyco/opencode/issues/28596

### 6. OpenCode Go Token 额度显示异常（#37874）
**状态：CLOSED，5 评论**
中文用户反馈：仅使用 10 美元，月额度显示已消耗一半（官方 60 美元/月），疑似计费统计口径有误。
🔗 https://github.com/anomalyco/opencode/issues/37874

### 7. Composer 需要提示队列与中断控制（#37381）
**状态：CLOSED，6 评论**
响应流式输出时只能打断，无法在队列中预留下一条消息，希望能在当前轮次结束后自动发送。
🔗 https://github.com/anomalyco/opencode/issues/37381

### 8. 附加会话时出现重复消息（#27928）
**状态：CLOSED，5 评论**
Windows 机器运行 server、Mac 笔记本远程附加时，prompt 出现重复消息，影响远程/多机协作场景。
🔗 https://github.com/anomalyco/opencode/issues/27928

### 9. 启动时应提供会话选择器入口（#36134）
**状态：CLOSED，5 评论，2 👍**
希望支持 `opencode -r`（无参数值）或 `-s` 直接弹会话选择器，不用手动输入 `ses_...` ID。
🔗 https://github.com/anomalyco/opencode/issues/36134

### 10. 新增：Desktop 本地启动器的 loopback 连接链接（#51430） 🆕
**状态：OPEN，4 评论**
提议提供公开 Desktop 链接，供本地 launcher 请求已运行的 server 和精确项目目录，属于今日唯一新功能型 Issue。
🔗 https://github.com/anomalyco/opencode/issues/51430


## 重要 PR 进展

### 1. fix(desktop): 保留所选目录并支持本地连接链接（#51431） 🆕
关闭 #51430、修复 #50821。改进 Desktop 对目录选择的状态保留，同时落地本地连接链接设计提案。
🔗 https://github.com/anomalyco/opencode/pull/51431

### 2. feat(core): Agent Manager 与任务图管线（#51426） 🆕
分阶段实现 agent 优先平台：`AgentManager`（10 个生命周期状态、预算门控）、multiagent 运行及任务图管线。属较大架构级新功能。
🔗 https://github.com/anomalyco/opencode/pull/51426

### 3. fix(codemode): 六项递归/分配安全修复（#51407）
替换字符串、参数计数、内置递归深度、thenable 链与 rejection 诊断的边界加固，全部来自递归分配审计。
🔗 https://github.com/anomalyco/opencode/pull/51407

### 4. fix(core): 恢复 instructions 配置解析（#51422） 🆕
V2 保留了 `instructions` 字段但未移植 resolver，导致全局指令失效，此 PR 恢复该能力，关闭 #51341、#51262。
🔗 https://github.com/anomalyco/opencode/pull/51422

### 5. feat: 使用量货币显示（#51429） 🆕
允许自定义 usage 费用的显示货币，不再固定 USD。关闭 #32485，继续 #41208 的思路（fork 被删后重开）。
🔗 https://github.com/anomalyco/opencode/pull/51429

### 6. fix(shell): bash 路径参数反斜杠转义（#49691）
`/tmp/my\ project/x` 这类带反斜杠的路径参数未被正确处理，导致 resolvePath 拿到字面反斜杠。关闭 #49671。
🔗 https://github.com/anomalyco/opencode/pull/49691

### 7. fix(opencode): 原子化写入 auth.json 并加锁（#46131）
修复两种凭据丢失场景：auth 写入持久化 env 快照、无锁并发导致 auth.json 损坏。关闭 #46128。
🔗 https://github.com/anomalyco/opencode/pull/46131

### 8. fix(core): 跨进程序列化 MCP OAuth 刷新（#50994）
多个进程共享同一个 access token，轮转后同时刷新会导致凭据失效。关闭 #34520。
🔗 https://github.com/anomalyco/opencode/pull/50994

### 9. fix(config): 保留 MCP 数字 timeout 配置（#50911）
V2→V1 兼容层只接受字符串，导致数字 `timeout` 配置被丢弃。关闭 #50807。
🔗 https://github.com/anomalyco/opencode/pull/50911

### 10. fix(core): 忽略 JSONC 注释中的文件引用（#50899）
注释里出现 `{file:...}` 会导致 V2 尝试读取不存在的路径，从而拒绝合法 JSONC 配置。修复 #50898。
🔗 https://github.com/anomalyco/opencode/pull/50899


## 功能需求趋势

- **统一用量与计费透明化**：`/usage` 命令（#9281）、Go Token 额度异常（#37874）、订阅余额误判（#51424）、Go API 500（#39153）等多条 issue 指向同一个诉求——用户需要清晰、准确的用量仪表盘与配额提示。
- **会话管理的灵活性与持久化**：目录迁移不丢历史（#29703）、启动时可恢复会话（#36134）、TUI 会话选择器展示全部会话（#13877），社区期望会话与项目目录解耦、可跨路径保留。
- **桌面端稳定性与生命周期**：Windows 多实例导致 CLI 被删（#35839）、Desktop 持续崩溃（#36833）、工作区残留（#36234）、旧布局切换项目冻结（#39141），Desktop 已成为 bug 高发区。
- **第三方模型与 Provider 兼容性**：SiliconFlow SSE billing 事件（#39087）、GLM-5.2 中文流式碎片化（#36021）、Kimi 超限后乱码输出（#39098）——随着用户接入更多非 OpenAI 兼容服务，流式解析与错误处理成为重点。
- **Agent 行为可观测性与防护**：重复工具调用死循环（#28596）、`question` 工具多选崩溃（#33848）、composer 提示队列（#37381），希望 Agent 循环能被检测和中断，操作更可控。


## 开发者关注点

- **计费不透明是最大痛点**：多条 issue（#37874、#51424、#39153）指向 OpenCode Go 订阅的额度统计不准确、余额误判、甚至 500 错误，直接影响付费用户信任。
- **会话数据安全与可迁移**：项目路径变化导致历史丢失（#29703）、附加会话重复消息（#27928）、“Work State”结构化输出无法关闭（#39143），均涉及会话数据质量与可控性。
- **Windows 平台问题集中**：多实例删除全局 CLI（#35839）、Desktop 崩溃（#36833）、工作区路径残留（#36234）、同仓库多目录切换失败（#39119），Windows 用户反馈密度明显偏高。
- **第三方 Provider 兼容性风险**：流式输出碎片化（#36021）、SSE 非标准事件导致崩溃（#39087）、Kimi 超限后产生乱码内容（#39098），开发者对超出配额时的优雅降级有明确期待。
- **维护节奏观察**：今日大量关闭的 Issue 多创建于 7 月 27 日左右，间隔两个月后集中关闭，社区维护者可能在清理旧积压；但新功能型 Issue（#51430）仍能保持开放讨论，说明社区反馈通道畅通。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-26

## 今日速览

今日发布 **v0.24.6** 正式版（含 SDK TypeScript v0.1.16 与 Desktop v0.24.6），核心变更为新增 Java SDK Hosted Harness 私有客户端；社区讨论集中在 **Managed Agent 双路径架构提案**（#12380，24条评论）与 **Windows 平台更新/安装问题**（多条 P1 高优 bug 持续发酵）；此外 `web_fetch` 网络工具在代理与多地址场景下的健壮性问题成为新的关注点。

## 版本发布

### v0.24.6
- **核心变更**：新增 Java SDK Hosted Harness 私有客户端（PR #12654，支持托管运行时与私有客户端接入）
- **修复**：serve 模式下保留 session 创建失败的诊断信息（PR #12331）
- **无 Breaking Changes**

### SDK TypeScript v0.1.16
- 捆绑 CLI 版本：0.24.6

### Qwen Code Desktop v0.24.6
- 修复 serve 会话创建失败诊断丢失问题

### v0.24.5-nightly.20260925.c3a4058a0c
- 同步 Hosted Harness 客户端（#12654）+ Java 测试加固

## 社区热点 Issues（10条）

1. **[#12380] Managed Agent 双路径架构与分阶段交付提案**（24条评论）
   社区最热议题：定义托管 Agent 的分阶段架构——保留现有 TypeScript agent 循环、模型推理与工具环境供给解耦、Session 持久化所有权与 Workspace 绑定。后续 #12723、#12724 已开始拆分落地。
   https://github.com/QwenLM/qwen-code/issues/12380

2. **[#12416] Remote-SSH 下每次 POST /session 均报 `write EPIPE`**（12条评论，P1）
   Companion 0.24.2 在 Remote-SSH 场景下所有会话创建失败，独立的 CLI 却能正常工作。影响远程开发核心链路，社区关注度高。
   https://github.com/QwenLM/qwen-code/issues/12416

3. **[#472] `is_background` 属性缺失且非 boolean**（14条评论）
   持续一年的老 issue 仍在活跃。自 #445 合并后，缺少该属性导致报错，且文档已更新但问题未解决，用户反馈强烈（👍5）。
   https://github.com/QwenLM/qwen-code/issues/472

4. **[#11872] Web Terminal 报 `PTY not available`**（14条评论，已关闭）
   `@lydell/node-pty` 声明但未打包，macOS 代码签名阻断本地预编译二进制加载。已关闭说明修复已合入，但根因分析详实值得关注。
   https://github.com/QwenLM/qwen-code/issues/11872

5. **[#12679] 全新全局安装的 ripgrep 二进制缺少执行位**（4条评论，P1）
   发布包中 vendored ripgrep 以 0644 权限打包，无任何代码路径能恢复执行位。与 #12668（self-update 丢执行位）为同一根因的姊妹问题，Windows/macOS 用户受影响。
   https://github.com/QwenLM/qwen-code/issues/12679

6. **[#8586] 追踪 activeWork 与后台 Agent 恢复**（10条评论）
   为 deep daemon health 增加显式 `activeWork` 机制，构建后台 Agent 的恢复路径（覆盖 5 层行为）。触及多智能体可靠性的核心痛点。
   https://github.com/QwenLM/qwen-code/issues/8586

7. **[#12169] Batch API 上传绕过 dispatcher 导致代理/TLS 拦截环境失效**（5条评论）
   Batch API 上传直接调用全局 `fetch`，未携带代理 dispatcher。代理环境下其他请求全部成功、唯独上传失败，影响企业用户。
   https://github.com/QwenLM/qwen-code/issues/12169

8. **[#12727] Windows 上 `/update` 行为异常**（4条评论，P1）
   更新后重新运行仍提示有新版本，疑似自动升级后版本未正确生效。Windows 更新链路今日已有多条 issue 集中反馈。
   https://github.com/QwenLM/qwen-code/issues/12727

9. **[#12683] PreToolUse hook 决策竞态——迟完成的 hook 胜出，deny 被覆盖**（4条评论，P1，已关闭）
   多个 hook 匹配同一工具调用时，权限决策取“最后完成”而非“聚合结果”，deny 可被另一个 hook 的 allow 静默覆盖。安全敏感 bug，已关闭说明修复完成。
   https://github.com/QwenLM/qwen-code/issues/12683

10. **[#12612] PR #12559 遗留评审意见：OpenTUI 弹窗几何与补全截断**（4条评论）
    自动跟进机制创建的 issue，记录待办：修复 ink 弹窗几何不匹配、补全下拉溢出问题。涉及 CLI 交互体验细节。
    https://github.com/QwenLM/qwen-code/issues/12612

## 重要 PR 进展（10条）

1. **[#12713] feat(serve): Enable private Hosted Harness no-tool text turns**
   启用私有 Hosted Harness 的纯文本无工具对话回合，Java 客户端可创建/加载 Managed Session，通过 SSE 读取提交文本与终端事件。
   https://github.com/QwenLM/qwen-code/pull/12713

2. **[#12718] fix(core): tolerate the win32 directory-sync refusal in managed session resources**
   修复 Windows 145 个 CI 失败与 macOS 2 个失败的两个根因，并解决 macOS 大小写不敏感/非 UTF-8 文件系统上的测试夹具问题。
   https://github.com/QwenLM/qwen-code/pull/12718

3. **[#12665] fix(cli): report dropped @-references instead of dropping them silently**
   `@`-文件引用被拒绝时给出明确报错（越界、已变更、不可读、被过滤等），不再静默丢弃。填补文件引用失败无反馈的体验空白。
   https://github.com/QwenLM/qwen-code/pull/12665

4. **[#12709] feat(managed-agent): admit workspace-bound sessions without execution**
   Managed Agent W0b 阶段：支持创建绑定 Workspace 的空 Session（七字段绑定 + 冻结配置引用），不执行任何工具。
   https://github.com/QwenLM/qwen-code/pull/12709

5. **[#12698] feat(acp-bridge): route sessions across legacy and managed engines**
   为 ACP Bridge 增加 Legacy/Managed 双通道，服务端持有引擎选择权，创建和冷恢复时校验实际引擎回执。
   https://github.com/QwenLM/qwen-code/pull/12698

6. **[#12641] fix(web-shell): complete skill toggle feedback and controls**
   完善 Skill 设置开关的反馈与控制逻辑：刷新移除已选 Skill 时保留可关闭的成功提示、失败时展示错误并恢复控件。修复 #10152 的五个遗留问题。
   https://github.com/QwenLM/qwen-code/pull/12641

7. **[#12582] feat(agents): run agents on other computers, bind Codex or Claude Code, share over A2A**
   在 #11206 基础上叠加远程 Agent 能力：在其他计算机上运行 Agent、绑定 Codex/Claude Code、通过 A2A 协议共享。需要运行时向外部调用者开放。
   https://github.com/QwenLM/qwen-code/pull/12582

8. **[#11799] feat(computer-use): let a remote session use your desktop through a node_repl relay**
   让 headless Linux 服务器上的 Qwen Code 会话通过用户 Mac 上的 relay 使用 Computer Use 能力。Mac 借出 `node_repl`、CUA SDK 与嵌入式驱动给远端会话。
   https://github.com/QwenLM/qwen-code/pull/11799

9. **[#12705] fix(core): treat EHOSTUNREACH/ENETUNREACH as connection-level in web_fetch https-upgrade fallback**
   将 `EHOSTUNREACH`/`ENETUNREACH` 加入连接级错误码白名单，当 https 升级连接在网络层失败时回退到原始 http URL。与 #12699/#12720 配套修复。
   https://github.com/QwenLM/qwen-code/pull/12705

10. **[#12725] chore(release): sdk-typescript v0.1.16**
    SDK TypeScript v0.1.16 自动发布 PR，捆绑 CLI 0.24.6。
    https://github.com/QwenLM/qwen-code/pull/12725

## 功能需求趋势

- **Managed Agent / 多智能体架构**为当前最核心演进方向。#12380 提案定义双路径架构，配套 #12723（O1 工具结果引用契约）、#12724（W0c 工作目录绑定）、#12698（ACP 双引擎路由）、#12709（W0b 准入）等在快速拆分落地。
- **Windows 平台体验修复**成为集中战场：/update 行为异常（#12727）、更新失败（#12687）、ripgrep 执行位丢失（#12668/#12679）等多条 Windows-specific 问题同日爆发，且优先级多为 P1。
- **网络工具健壮性**方向明确：web_fetch 的 https 升级回退逻辑（#12699/#12720/#12705）与 Batch API 代理适配（#12169）说明社区对企业代理环境与多地址主机的支持要求正在提升。
- **远程开发/多机协作**持续演进：Remote-SSH 崩溃（#12416）、远程 Computer Use（#11799）、多机器 Agent 运行（#12582）均在推进，A2A 协议集成是新增的亮点方向。

## 开发者关注点

- **更新流程不可靠**：Windows 平台 /update 命令存在多个问题——下载后版本不生效、命令路径识别错误、自更新丢失执行位。属于影响面最大的高频痛点。
- **权限与安全机制正确性**：PreToolUse hook 竞态可致 deny 被覆盖（#12683），`is_background` 类型校验长期未修复（#472），权限系统本身需要回归加固。
- **WebShell 会话管理掣肘**：当前选中会话无法删除（#12619）、Live Voice 会话中新建任务不可用（#12620），常规操作受阻，虽已关闭但需关注回归风险。
- **远程场景稳定性**：Remote-SSH 下完整的会话创建链路失败（#12416），且独立 CLI 与 Companion 行为不一致，用户难以自行规避。
- **文档与验证缺口**：GitHub Action/extensions/privacy 页面存在 7 个死链（#12716），prompt 验证 runbook 需在二轮压缩后校准（#12704）。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*