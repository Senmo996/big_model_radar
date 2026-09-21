# AI CLI 工具社区动态日报 2026-09-21

> 生成时间: 2026-09-21 02:13 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-21）

## 1. 生态全景

当前 AI CLI 工具已进入"**能力基建期**"：七个主流工具在 2026-09-21 共发布 4 个版本（Qwen v0.24.2 正式版 + Gemini nightly + Codex 3 个 alpha），但社区讨论重心已从"能用"转向"**可控、可观测、可靠**"。MCP 生态兼容性、Agent 自主性边界、上下文 token 成本透明化是跨工具的共同博弈点。头部效应显著——Claude Code 与 Codex 各自的高赞 issue（436👍 / 496👍）远超其他工具 10 倍以上。整体判断：功能创新速度放缓，稳定性与信任建设成为主战场。

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 动态 | 今日 PR | Release | 关键热度信号 |
|---|---|---|---|---|
| Claude Code | 10 条热点（#77136 达 436👍/124 评论） | 5 | 无 | 模型输出质量成最大社区共鸣 |
| OpenAI Codex | 10 条热点（#8745 达 496👍） | 10 | 3 个 alpha 预发布 | LSP 集成需求居首；Windows 交互阻断 bug 集中爆发 |
| Gemini CLI | 10 条热点（#26116 标记 p1） | 10 | 1 个 nightly | 思考循环与子代理状态误报为头号信任危机 |
| GitHub Copilot CLI | 10 条热点（#4870 为 11👍） | 0 | 无 | MCP 协议容错与 ARM64 平台崩溃；官方密集关闭旧 issue |
| Kimi Code CLI | 17 条更新（15 条历史遗留被关闭） | 3 | 无 | 集中清理存量；900KB 大输入 stack overflow |
| OpenCode | 10 条热点（#14970 为 24👍） | 5（原文列 10，摘要可见 5） | 无 | SQLite NFS 并发损坏 + TUI 密度问题持续发酵 |
| Qwen Code | 10 条热点（#12028 为 tracking issue） | 10 | v0.24.2 | token 治理成体系；Web Shell 与 Chrome 扩展推进 |

**活跃度排序**：Codex ≈ Gemini ≈ Qwen > Claude Code > OpenCode > Kimi > Copilot。Copilot 当日零 PR 零发布，结合大规模关闭旧 issue 的行为，处于"收尾稳定期"。

## 3. 共同关注的功能方向

1. **MCP 生态容错与兼容性**（涉及 6 个工具）
   - Copilot：Figma MCP 将 `-32601` 误判为 fatal（#4870）；Google Workspace OAuth 尾斜杠

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**: github.com/anthropics/skills | **数据截止**: 2026-09-21

---

## 一、热门 Skills 排行

> 按社区关注度（评论/更新活跃度）排序，聚焦新增类 Skill PR。

### 1. `skill-creator` 触发评估隔离与跨平台修复 🔧 [#1298](https://github.com/anthropics/skills/pull/1298)
- **功能**: 修复 `skill-creator` 触发评估的三大缺陷——多 worker 命令探针竞争、Windows 下 `select()` 管道失败、无关工具中断扫描；同时防止运行时错误被误判为"非触发"，导致负样本错误通过。
- **关注点**: 社区对 skill 触发评估真实性的高度关注，直接关系到 skill 描述优化方向是否可信。
- **状态**: OPEN（6/10 创建，9/16 仍活跃更新）

### 2. `proofcore-contract-auditor` Web3 智能合约审计 🛡️ [#1771](https://github.com/anthropics/skills/pull/1771)
- **功能**: 面向 Web3 开发者的 Solidity/Rust 智能合约自动静态分析 skill，通过 ProofCore 零存储 Merkle 协议将审计密码学证明锚定到 TON 区块链。
- **关注点**: 区块链审计上链存证，解决"审计结果可信度"问题，是官方仓库中少见的 Web3 方向。
- **状态**: OPEN（9/15 创建）

### 3. `md2video-audio` 文档一键生成配音视频 🎬 [#1703](https://github.com/anthropics/skills/pull/1703)
- **功能**: 零成本将 Markdown 通过 Marp 转幻灯片，再编译为带拟真语音旁白的 MP4 视频，无需外部 API。
- **关注点**: 内容生产自动化，社区对"文档→多媒体"一体化的兴趣。
- **状态**: OPEN（9/1 创建，9/15 更新）

### 4. `pyxel` 复古游戏开发 🕹️ [#525](https://github.com/anthropics/skills/pull/525)
- **功能**: 引导 agent 在 Python Pyxel 引擎中创建、调试、验证复古游戏，支持确定性 headless 运行、逐帧检查和任务级状态验证。
- **关注点**: 长期活跃的老牌 PR（3/5 创建至 9/16 仍在维护），创意编码与可验证调试的典型结合。
- **状态**: OPEN

### 5. `AWT` AI 驱动 E2E 测试 🤖 [#822](https://github.com/anthropics/skills/pull/822)
- **功能**: 赋予 Claude 视觉与浏览器控制能力，零代码生成 E2E 测试，自动执行 UI 测试流程。
- **关注点**: 测试自动化的社区诉求持续高涨，该 PR 自 3/31 创建后持续更新至 9/19。
- **状态**: OPEN

### 6. `document-typography` 文档排版质检 📐 [#514](https://github.com/anthropics/skills/pull/514)
- **功能**: 修复 AI 生成文档的典型排版问题——孤行文字（1-6 词溢出换行）、孤立标题（页底悬挂）、编号错位。
- **关注点**: 直击"AI 生成物质量细节"的痛点，几乎所有文档场景都受影响。
- **状态**: OPEN

### 7. `blast-radius` 破坏性操作安全检查 📋 [#1776](https://github.com/anthropics/skills/pull/1776)
- **功能**: 批量/破坏性写操作（归档用户、撤销权限、删行、批量邮件）前的核查清单，核心是区分"查询对行正确"与"操作对世界正确"。
- **关注点**: 操作安全与防护，9/17 刚创建即获关注，属于新兴热点。
- **状态**: OPEN（最新）

### 8. `scnet-hpc` HPC 集群运维 ⚡ [#1615](https://github.com/anthropics/skills/pull/1615)
- **功能**: 通过 profile 化 SSH 和 Slurm 工作流操作 SCNet HPC 集群，涵盖分区、内存、模块、加速器配置与作业生成。
- **关注点**: 企业/科研计算领域的垂直 skill 拓展。
- **状态**: OPEN

---

## 二、社区需求趋势（来自 Issues）

### 🔒 安全与信任边界 — 最强烈呼声
- **[#492 Security: 社区 skill 伪装官方命名空间](https://github.com/anthropics/skills/issues/492)**（43 评论）: 社区 skill 在 `anthropic/` 命名空间下分发，构成信任边界滥用——用户可能向非官方 skill 授予高权限。这是当前社区第一大关切。
- **[#1175 SharePoint Online 文档处理的权限安全](https://github.com/anthropics/skills/issues/1175)**（4 评论）: 在 SKILL.md 中直接编写访问控制逻辑的安全顾虑。

### 📦 分发与共享机制
- **[#228 组织级 skill 共享](https://github.com/anthropics/skills/issues/228)**（16 评论）: 要求像 `Settings > Capabilities` 手动上传之外的共享链接/库，企业场景刚需。
- **[#189 document-skills 与 example-skills 内容重复](https://github.com/anthropics/skills/issues/189)**（6 评论）: 插件包安装后产生重复 skill，浪费上下文窗口。

### 🧪 评估与可靠性
- **[#556 run_eval.py 触发率恒为 0%](https://github.com/anthropics/skills/issues/556)**（12 评论）: CLI 无头模式从不触发 skills/commands，评估体系失真。
- **[#1390 mcp-builder 评估对所有真实 MCP 服务器均记 0 分](https://github.com/anthropics/skills/issues/1390)**（4 评论）: 错误被吞掉并伪装成工具报错。

### 🧠 上下文窗口与状态管理
- **[#1487 claude-api skill 一口气注入约 156k tokens](https://github.com/anthropics/skills/issues/1487)**（4 评论）: 单次工具调用即耗尽上下文窗口。
- **[#1329 compact-memory 符号化记忆](https://github.com/anthropics/skills/issues/1329)**（9 评论）: 用符号化记法压缩 agent 的持久记忆，减少散文式笔记开销。

### 🛡️ 治理与流程化
- **[#412 agent-governance 治理模式](https://github.com/anthropics/skills/issues/412)**（6 评论

---

# Claude Code 社区动态日报（2026-09-21）

## 今日速览

过去 24 小时无新版本发布，社区焦点集中在模型输出质量（#77136 以 436 👍 / 124 评论持续发酵）以及 2.1.270 引入的 Auto 模式权限回归（#95200）。另有多项 PR 修复 diff 面板行为与插件 hook 兼容性问题，值得关注。

---

## 社区热点 Issues（Top 10）

### 1. 模型输出质量持续引发社区共鸣
**[#77136] Claude 4.7/4.8/5.0/Fable 默认输出重复修辞套话，难以生成连贯散文**，124 条评论，436 👍
- **为什么重要**：当前社区最热 issue。用户反馈即使给出明确的风格指令，模型仍会重复使用特定修辞，影响代码注释与文档写作质量。
- **社区反应**：大量用户复现并提供 prompt 样本，正寻求模型层面的修复。
- 链接：https://github.com/anthropics/claude-code/issues/77136

### 2. Cowork 合并导致工作流回退
**[#76694] Chat/Cowork 合并后新项目丢失"选择文件夹"选项**，30 条评论
- **为什么重要**：合并后的 UI 将原本的文件夹选择入口替换为 Chat 风格的上传菜单，破坏既有工作流。
- **平台**：Windows / macOS
- 链接：https://github.com/anthropics/claude-code/issues/76694

### 3. 无头环境认证需求悬而未决
**[#22992] 为 Pro/Max 用户提供设备码认证（RFC 8628）支持**，19 条评论，36 👍
- **为什么重要**：2 月提出至今未落地，Linux 无头环境用户仍无法通过设备码完成登录。
- 链接：https://github.com/anthropics/claude-code/issues/22992

### 4. 浏览器扩展安全误报
**[#95326] Chrome 扩展在 reddit.com 上所有工具被安全限制阻止**（9/18 起）
- **为什么重要**：从可用突变为全部拦截，影响依赖红迪调研的开发者。
- 链接：https://github.com/anthropics/claude-code/issues/95326

### 5. 桌面版后台行为不透明
**[#84698] 桌面版在 diff/commit 刷新时主动执行 git fetch，且无开关可禁用**
- **为什么重要**：隐私与网络流量问题，社区要求至少提供配置项。
- 链接：https://github.com/anthropics/claude-code/issues/84698

### 6. MCP 与 Claude Design 集成失效
**[#92215] Claude Design 官方 MCP 持续 403，OAuth 流程中断**
- **为什么重要**：官方集成不可用且错误提示指向不存在的命令，影响设计工作流自动化。
- 链接：https://github.com/anthropics/claude-code/issues/92215

### 7. Write/Edit 工具破坏转义序列
**[#72957] Write/Edit 工具静默将 \uXXXX 解码为 Unicode 字符**
- **为什么重要**：无法通过工具写入字面量转义序列（如 \uE010），对生成代码/配置文件造成数据损坏。
- 链接：https://github.com/anthropics/claude-code/issues/72957

### 8. 会话状态分类功能文档缺失
**[#60955] "Classify session states" 功能无文档说明，涉及隐私与成本**
- **为什么重要**：22 👍 的隐藏功能，用户担心数据被发送至云端分析且无法预估费用。
- 链接：https://github.com/anthropics/claude-code/issues/60955

### 9. VS Code 扩展会话挂起
**[#81425] VS Code/Cursor 扩展在 auto 模式分类器完成后永久挂起**
- **为什么重要**：每次会话 4-6 次挂起，权限决策丢失导致工具调用无响应。
- 链接：https://github.com/anthropics/claude-code/issues/81425

### 10. Auto 模式回归引发单人开发效率危机
**[#95200] 2.1.270 起 Auto 模式对单人 owner 的常规发布操作拦截增加 12 倍**
- **为什么重要**：小型团队/独立开发者的核心痛点——本来信任的自动流程变得不可依赖，手动回退需 55+ 次点击。
- 链接：https://github.com/anthropics/claude-code/issues/95200

---

## 重要 PR 进展（共 5 条）

### 1. [#95423] diff 面板：只读 shell 命令不再触发无谓刷新
- **内容**：`diff` 模块原先在每次 Bash/PowerShell 工具调用后都重新拉取 diff，现在能识别 `isReadOnly`（ls、git status 等）并跳过刷新。
- 链接：https://github.com/anthropics/claude-code/pull/95423

### 2. [#95698] 插件 hook 路径修复：带引号的 bash 执行
- **内容**：修复 `ralph-wiggum` 与 `output-style` 插件的 Stop hook 路径未加引号的问题（Refs #95673 和 #78490）。
- 链接：https://github.com/anthropics/claude-code/pull/95698

### 3. [#95587] diff 面板行为与内置面板统一（已关闭/合并）
- **内容**：resume 会话有历史编辑时自动打开面板；`/clear` 后正确关闭面板；会话起点对齐引擎启动位置。
- 链接：https://github.com/anthropics/claude-code/pull/95587

### 4. [#94847] diff 面板仅在存在可展示文件时打开
- **内容**：避免首次 Edit 发生在仓库外、被忽略文件或不同 worktree 时打开"空面板"的问题。
- 链接：https://github.com/anthropics/claude-code/pull/94847

### 5. [#95618] 遥测模块：仅收集内置插件的完整数据（已关闭/合并）
- **内容**：遥测生成的行通过 `$` 批量发送，明确排除个人安装或管理员指定的插件，尊重隐私。
- 链接：https://github.com/anthropics/claude-code/pull/95618

---

## 功能需求趋势

1. **IDE 扩展体验深化**：VS Code/Cursor 扩展的稳定性与提示词建议（#87999 ghost-text）仍是被反复提及的方向。
2. **身份认证便捷性**：设备码认证（#22992）持续有赞，无头环境用户需求明确。
3. **模型输出可控性**：拼写风格（美式/英式 #90603、#91679）与语气修辞控制正在成为新焦点。
4. **官方连接器功能完整度**：Google Drive connector 仅支持创建不支持内容更新（#95292），说明 MCP 生态进入"补课"期。
5. **文档透明化**：隐藏开关（如 "Classify session states"）与后台行为（git fetch）均应有文档与开关。

---

## 开发者关注点

- **模型行为一致性**：修辞疲劳（#77136）与英式拼写问题（#90603、#91679）说明社区对"默认输出质量"的容忍度在下降。
- **权限回归成本**：#95200 显示 Auto 模式的敏感度过高直接侵蚀单人开发者的生产力；#95326 则是安全限制误报的极端案例。
- **后台操作不可控**：#84698 的主动 git fetch 引发隐私/网络担忧，开发者要求"用不到的自动化必须可关闭"。
- **工具链细节 bug 频繁**：\uXXXX 解码（#72957）、iOS Simulator 在 Xcode 27 下失效（#95466）、`/login` 成功但 token 丢失（#95425）等小问题积压，影响整体信任感。
- **MCP 生态的稳定性**：多个官方 MCP（Claude Design 403、Google Drive 更新缺失）出现中断或短板，第三方集成仍处于磨合期。

---

> **一句话总结**：模型输出质量与 Auto 模式的权限回归是当日双热点；PR 侧的修复集中在 diff 面板与插件兼容性，期待 2.1.278+ 能系统性改善。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-21）

## 今日速览

昨日共发布 3 个 Rust 版本（均为 0.156.0-alpha 系列预发布），无明显功能更新说明。社区方面，LSP 自动检测与安装的 Issue 以 496 👍 持续位居需求榜首；桌面端（尤其是 Windows）的交互阻断类 Bug 集中爆发，多条 Issue 指向“首轮对话后发送按钮失效/消息卡死”问题。PR 侧则以 TUI 可用性优化和子代理 MCP 请求链路修复为主。

## 版本发布

- [rust-v0.156.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.12)
- [rust-v0.156.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.11)
- [rust-v0.156.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.10)

三个版本均未在标题中提供实质变更说明，推测为夜间快速迭代构建。建议关注对应 commit 历史以了解具体改动。

## 社区热点 Issues（10 条）

1. **LSP 自动检测与安装集成**（[#8745](https://github.com/openai/codex/issues/8745)）  
   496 👍 / 66 评论。社区呼声最高的功能需求：希望 Codex CLI 内置 LSP 支持，自动安装语言服务器并利用诊断信息提升代码生成质量。

2. **Windows 桌面端首轮对话后无法发送后续消息**（[#44102](https://github.com/openai/codex/issues/44102)，[#45307](https://github.com/openai/codex/issues/45307)）  
   分别 26 与 14 评论。多个用户报告新对话第一轮成功后，发送按钮变灰或消息卡在 loading 状态。为 Windows 用户的主要阻断性问题，增加与回归嫌疑高。

3. **Crashpad 无限制生成导致磁盘空间膨胀**（[#25921](https://github.com/openai/codex/issues/25921)）  
   9 👍 / 20 评论。macOS 桌面端持续产出 `.dmp` 崩溃转储，单日可达 5GB、54000+ 文件，严重影响磁盘空间与性能。

4. **“模型容量已满”错误频繁出现**（[#45835](https://github.com/openai/codex/issues/45835)）  
   17 评论。健康网络下仍反复提示 “Selected model is at capacity”，疑似客户端与容量信息的同步逻辑存在缺陷。

5. **macOS 上 0.154.0 实验性能力破坏内置 MCP 服务启动**（[#44458](https://github.com/openai/codex/issues/44458)）  
   6 👍 / 13 评论。0.154.0 版本对 MCP 客户端 capabilities 的调整导致 Messages、Computer History 等内置服务 JSON-RPC 初始化失败，影响 Business 与 Pro 用户。

6. **VS Code Remote-SSH 重连后残留旧 app-server 阻塞新会话**（[#41849](https://github.com/openai/codex/issues/41849)）  
   12 👍 / 11 评论。断线重连产生双 VS Code Server 实例，旧 app-server 持锁导致新会话提示 “This is open in another app”。

7. **桌面端恢复线程时崩溃（thread_tools 特性不兼容）**（[#29361](https://github.com/openai/codex/issues/29361)）  
   10 评论。Desktop 应用向内置 CLI 发送不受支持的 `thread_tools` feature override，导致恢复会话时 SIGKILL 崩溃，macOS 上基本不可用。

8. **WSL 环境下浏览器/电脑使用功能全部失败**（[#34458](https://github.com/openai/codex/issues/34458)）  
   9 👍 / 8 评论。Windows Desktop + WSL 的共享桥接层导致 Chrome 控制、Computer Use 等特性无法工作。

9. **SQLite TRACE 日志持续刷盘**（[#35308](https://github.com/openai/codex/issues/35308)）  
   7 评论。0.146.0-alpha.3.1 内置 CLI 在 macOS 桌面上持续输出 SQLite TRACE 级别日志，造成不必要的 IO 与性能开销。

10. **支持仅 MCP 工具执行模式**（[#6049](https://github.com/openai/codex/issues/6049)）  
    46 👍 / 5 评论。安全与权限控制需求：headless 环境下无法禁用内置工具，希望支持强制只使用 MCP 工具集合。

## 重要 PR 进展（10 条）

1. **[Fix realtime V3 transcript reconciliation for handoffs](https://github.com/openai/codex/pull/46922)**  
   修复实时语音转录中交错说话人片段导致交接上下文碎片化的问题，将 V3 转录增量与最终结果按说话人最新条目对账。

2. **[Enforce current provider requirements for the model catalog](https://github.com/openai/codex/pull/46917)**  
   模型目录读取与后台刷新现在会检查最新 provider 要求，避免 app-server 运行时模型供应商条件变化导致缓存模型不合法。

3. **[Keep quota warnings visible in the TUI](https://github.com/openai/codex/pull/46912)**  
   将最受限的配额窗口提示固定显示在 TUI 输入框附近的提示行，避免转写渲染中配额警告被隐藏。

4. **[Preserve transcript position when opening settings pickers](https://github.com/openai/codex/pull/46910)**  
   打开 `/model`、`/theme` 等设置选择器时保持阅读位置不跳转，同时确保设置错误与确认信息仍可见。

5. **[Identify local background servers in `/status`](https://github.com/openai/codex/pull/46905)**  
   `/status` 界面将连接行标题由 `Remote` 改为 `Server`；本地守护进程显示为 “Local background server”，远程连接保留地址与版本信息。

6. **[Add right-click copying for transcript and composer selections](https://github.com/openai/codex/pull/46895)**  
   支持在转录区与输入框中右键复制选中文本，复制成功后才清除选区，失败或取消时保留选区。

7. **[Enable plain clicks on transcript links and style bare URLs](https://github.com/openai/codex/pull/46884)**  
   普通左键单击即可打开转录中的链接（不再要求修饰键），同时对裸 URL 应用与 Markdown 链接一致的视觉样式。

8. **[Add `/tui` to choose the terminal UI mode for the next launch](https://github.com/openai/codex/pull/46883)**  
   新增 `/tui` 命令用于选择 Scrollback / Fullscreen 模式，需确认后写入 `tui.fullscreen_transcript` 配置，重启后生效。

9. **[Allow subagents to request MCP elicitation input](https://github.com/openai/codex/pull/46877)**  
   解除 MCP 请求只能由根代理发起的限制，允许子代理在浏览器登录、表单填写、工具审批等场景向用户发起 MCP 交互输入请求。

10. **[Preserve streamed answers when subagents finish](https://github.com/openai/codex/pull/46867)**  
    修复子代理活动在父回答流式输出期间到达导致父回答流被提前冲刷的问题，改为等权威消息完成后再渲染子代理更新。

## 功能需求趋势

- **IDE 与语言服务集成**：#8745 的 LSP 支持需求热度遥遥领先（496 👍），社区明确希望 Codex CLI 能自动检测/安装语言服务器，结合诊断进行代码生成。
- **MCP 生态完善**：#6049 要求支持仅 MCP 工具模式（46 👍），#46877 则从子代理链路补齐 MCP 用户交互能力，显示 MCP 正在成为扩展 Codex 能力的核心路径。
- **配额与用量透明化**：多用户反馈“模型容量”误导性错误（#45835），以及单次任务耗尽周配额（#46819），PR 中也有 3 条围绕配额显示与用量仪表盘改进，社区对用量可观测性要求明显提升。
- **贡献激励**：#37585 提出给高质量 bug 报告者发放额外 Codex 使用额度（2 👍），反映了用户对社区贡献认可的期望。
- **权限与安全审计**：#42210 要求代理发起凭证重置等敏感操作前必须做动作级授权并保留操作凭据，与 #6049 的 MCP-only 限制同属安全控制需求。

## 开发者关注点

- **Windows 桌面端阻断性 Bug 集中**：发送按钮失效（#44102、#45307）、第二消息卡死（#46590）、应用崩溃（#38433）等多条 Issue 均指向 Windows 平台“首轮之后无法继续”的严重交互问题，是当前最影响日常使用的痛点。
- **资源占用失控**：#25921（Crashpad 5GB+/天）、#46906（CPU 40%+）、#35308（SQLite TRACE 刷屏）都涉及磁盘、CPU、日志层面的资源泄漏，用户对长时间运行稳定性信心不足。
- **MCP 初始化兼容性脆弱**：多个 Issue 表明 Codex 客户端向 MCP server 发送的实验性 capabilities（如 `codex/auth-change`）会导致 JSON-RPC 初始化失败（#44458、#45269、#45889），第三方 MCP 集成受阻。
- **远程与子代理场景体验参差**：VS Code Remote-SSH 残留进程问题（#41849）、子代理授权拒绝（#43675）、委托消息 UI 异常（#41430）说明多线程/多代理的权限传递与会话管理仍是薄弱环节。
- **错误信息可操作性不足**：如远程控制“Waiting for computer”无明确指引（#27167）、配额耗尽提示不精确（#46819），开发者期望错误信息能直接指导下一步操作而非猜测。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-21

## 1. 今日速览

今日发布 v0.62.0 系列最新夜间版；社区讨论焦点集中在 Agent 稳定性问题上——"无限思考循环"（#26116）和"子代理达最大轮数却被误报为成功"（#22323）成为高赞热帖。与此同时，多项围绕 CLI 健壮性（JSON 解析、OAuth 凭据持久化、emoji 截断）的 PR 正在推进。

## 2. 版本发布

**v0.62.0-nightly.20260921.gcfbcaa8df**
- 完整变更日志：[compare/v0.62.0-nightly.20260920...v0.62.0-nightly.20260921](https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260920.gcfbcaa8df...v0.62.0-nightly.20260921.gcfbcaa8df)
- 例行 nightly 版本，对应版本号自动更新 PR：[#29433](https://github.com/google-gemini/gemini-cli/pull/29433)

## 3. 社区热点 Issues

精选 10 个最值得关注的 Issue（按热度/优先级排序）：

1. **[#26116] gemini stuck in thinking loop for hours**（p1，14 评论，5 👍）
  用户反馈 CLI 陷入数小时思考循环，原本 2 分钟的任务耗时 2 小时，且任务完成后仍不退出循环。这是当前社区最集中的稳定性痛点。
  [查看](https://github.com/google-gemini/gemini-cli/issues/26116)

2. **[#22323] Subagent recovery after MAX_TURNS is reported as GOAL success**（p1，13 评论）
  `codebase_investigator` 子代理在达到最大轮数后，系统仍将其终止原因报告为 `GOAL` 成功，掩盖了实际的中断。影响用户对 Agent 执行结果的信任。
  [查看](https://github.com/google-gemini/gemini-cli/issues/22323)

3. **[#28440] OAuth login fails on headless VPS: "Premature close"**（p1, security，5 评论）
  在无头 VPS 环境下，无论是浏览器回退还是 `NO_BROWSER=true` 用户码流程，令牌交换阶段均报 `Premature close` 错误。安全相关的认证阻塞问题。
  [查看](https://github.com/google-gemini/gemini-cli/issues/28440)

4. **[#28392] Temporary Directory Leak During Background Shell Execution**（p1, core，4 评论）
  后台 Shell 执行未清理临时目录，构成资源泄漏。涉及 `shell.ts` 与 `ShellExecutionService.ts`，长期运行场景下值得关注。
  [查看](https://github.com/google-gemini/gemini-cli/issues/28392)

5. **[#22633] Gemini stops while "thinking" and I must say "continue"**（p2，5 评论，4 👍）
  对话在思考过程中随机停止，用户必须手动输入内容才能继续。此问题与 #26116 同属"思考循环/中断"类，社区呼声较高。
  [查看](https://github.com/google-gemini/gemini-cli/issues/22633)

6. **[#21968] Gemini does not use skills and sub-agents enough**（p2，6 评论）
  用户观察 Gemini 仅在被明确指示时才使用自定义 skills 和 sub-agents，不会主动调用。反映"工具编排智能"仍是显著短板。
  [查看](https://github.com/google-gemini/gemini-cli/issues/21968)

7. **[#22745] Assess the impact of AST-aware file reads, search, and mapping**（p2, epic，7 评论）
  评估 AST 感知的文件读取/搜索/代码库映射价值，方向包括减少 token 噪音、精确定位方法边界等。属于长期能力升级。
  [查看](https://github.com/google-gemini/gemini-cli/issues/22745)

8. **[#21983] browser subagent fails in wayland**（p1，4 评论，1 👍）
  Wayland 环境下浏览器子代理失败，影响 Linux 桌面用户。标记为 `agent/browser`，已有维护者关注。
  [查看](https://github.com/google-gemini/gemini-cli/issues/21983)

9. **[#26525] Add deterministic redaction and reduce Auto Memory logging**（p2, security，5 评论）
  Auto Memory 在将本地记录发送给提取模型之前未做确定性脱敏，存在敏感信息暴露风险；同时日志记录过量的技能内容。安全与隐私相关议题。
  [查看](https://github.com/google-gemini/gemini-cli/issues/26525)

10. **[#18189] Telemetry: provide skill name details metric**（p3, enterprise，6 评论）
    请求为 `gemini_cli.tool.call.count` 等指标增加 skill 名称维度，以便企业用户精细化观测技能调用情况。
    [查看](https://github.com/google-gemini/gemini-cli/issues/18189)

## 4. 重要 PR 进展

精选 10 个重要 PR（按更新时间/影响面排序）：

1. **[#29432] fix(core): settle queued tool calls on scheduler disposal**
  修复调度器销毁时排队的工具调用未结算的问题：此前活跃批次阻塞时调用方会一直挂起，结束后排队工作仍可能执行。提升 Agent 生命周期稳定性。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29432)

2. **[#29319] fix(sdk): guard JSON.parse on tool-call args in sendStream**
  修复 `session.ts` 中 `JSON.parse` 工具调用参数抛异常导致整个流中断的问题，改为 try/catch 后记录 `_parseError` 并继续。含回归测试。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29319)

3. **[#29320] fix(a2a-server): register express.json before A2A routes**
  A2A 服务中 `express.json()` 注册时机过晚导致 `req.body` 为空，此 PR 调整中间件顺序并补充回归测试。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29320)

4. **[#29282] fix(auth): persist oauth credentials after login**（security）
  登录成功后立即持久化 OAuth 凭据，避免 CLI 因重启而重复要求 Google 账号授权。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29282)

5. **[#29304] fix(cli): avoid splitting surrogate pairs during truncation**
  修复文本截断时切断 UTF-16 代理对（emoji 等）导致渲染丢失字符的问题。同类修复还有 [#29303](https://github.com/google-gemini/gemini-cli/pull/29303)（针对 ExpandableText 组件）。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29304)

6. **[#29342] fix(cli): avoid nested input history state updates**
  重构 `useInputHistoryStore`，避免嵌套 React 状态更新触发 StrictMode 双调用问题，同时保持历史排序和去重行为。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29342)

7. **[#29229] fix(cli): reject non-finite numbers in settings editor**（已关闭）
  修复设置编辑器接受 `Infinity` 输入导致 JSON 序列化写入 `null` 的 bug，改用 `Number.isFinite` 校验。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29229)

8. **[#29225] Fixed Skill Loader function**（已关闭）
  修复 skill 加载函数的问题，具体修复点未详细描述，但涉及社区反馈的核心加载流程。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29225)

9. **[#29231] docs: fix stale JSDoc parameter names**（已关闭）
  清理两个模块中已不存在参数的 JSDoc 注释（`workspaceContext.ts` 与 `a2a-client-manager.ts`）。
  [查看](https://github.com/google-gemini/gemini-cli/pull/29231)

10. **[#26686] feat(cli): support git submodules in extension installs**（help wanted）
    支持从 Git 仓库安装扩展时自动初始化 submodule，修复扩展安装不完整的问题。
    [查看](https://github.com/google-gemini/gemini-cli/pull/26686)

## 5. 功能需求趋势

从今日活跃议题提炼的社区最关注方向：

- **Agent 自主性与可靠性**：解决思考循环、任务中断、子代理状态误报（#26116、#22633、#22323）成为最高优先级诉求；其次是让 Agent 更主动地使用 skills/sub-agents（#21968）。
- **安全与隐私强化**：Auto Memory 脱敏与日志收敛（#26525）、OAuth 认证可靠性（#28440）、阻止破坏性命令（#22672）均被标记为 security/enterprise 关注项。
- **代码库理解智能化**：AST 感知的文件读写、搜索和映射（#22745、#22746）被视为减少 token 消耗、提升多轮编辑准确性的长期演进方向。
- **可观测性与企业治理**：为 telemetry 增加 skill 名称维度（#18189）、浏览器代理的会话接管与锁恢复机制（#22232）等，反映企业级运维需求。
- **系统/环境兼容性**：Wayland 下浏览器子代理失败（#21983）、headless 环境的认证（#28440）说明跨平台适配仍是缺口。

## 6. 开发者关注点

- **"思考循环"是头号痛点**：多个独立开发者报告类似问题——Agent 长时间陷入思考、任务完成后不退出、或中途停止需要手动干预。这直接影响日常使用效率。
- **子代理状态报告不透明**：MAX_TURNS 等中断被误报为成功（#22323），开发者无法区分真实完成与异常截断，影响自动化流程判断。
- **配置与凭据管理**：settings 的 `tools.core` 空数组会意外生成通配 DENY 规则屏蔽全部 MCP 工具（#28361）；OAuth 在无头 VPS 上不可用（#28440）；浏览器代理忽略 `settings.json` 覆盖（#22267）。
- **资源与上下文治理**：后台 Shell 临时目录泄漏（#28392）、模型随机在临时目录创建脚本（#23571）、超过 128 个工具触发 400 错误（#24246）均属资源管理问题。
- **记忆系统的双刃剑**：Auto Memory 的低信号会话无限重试（

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时无新版本发布，也无新增 PR，但 Issue 侧持续活跃：**MCP 稳定性和平台兼容性问题**是社区最集中的痛点，Figma MCP 工具注册失败（#4870）获得 11 个👍，刚报告的 Linux ARM64 崩溃（#4918）与事件风暴致 33GB 日志（#4807）反映出搜索与文件监控在特定环境下存在严重缺陷。同时官方正在密集关闭会话恢复、上下文记忆相关旧 Issue，表明数据完整性修复已进入收尾阶段。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 社区热点 Issues

**1. #4870 [CLOSED] Figma MCP server 工具注册失败，`-32601` 被当作致命错误**  
评论 8 | 👍 11 | 链接: https://github.com/github/copilot-cli/issues/4870  
摘要: Figma 官方 MCP server（mcp.figma.com）能完成认证与初始化，但 `server/discover` 返回 `-32601`（方法未找到）时 CLI 直接标记为 fatal，导致工具永远无法注册；VS Code 中同样流程可正常工作。  
重要性: 社区认可的 MCP 兼容性经典案例，暴露 CLI 对 MCP 协议变体的容错不足。作者 @Just-Jan 在 9 月 16 日报告，5 天内获 11 个👍，说明影响面较广，现已关闭（可能已定位或提供 workaround）。

**2. #4918 [OPEN] 内置 ARM64 ripgrep 在 64 KiB 页大小 Linux 上因 jemalloc 崩溃**  
评论 0 | 新增于 2026-09-20 | 链接: https://github.com/github/copilot-cli/issues/4918  
摘要: 当 Linux 主机使用 64 KiB 内存页时，内置的 `rg`/`glob` 搜索工具在 jemalloc 初始化阶段以 `Unsupported system page size` 中止，仓库搜索完全不可用。  
重要性: 刚提交的新 Issue，技术原因明确（jemalloc 与页面大小不兼容），影响 ARM64 云服务器/树莓派等常见环境，是搜索工具链的潜在「地雷」。

**3. #4606 [OPEN] Google Workspace MCP OAuth 因 `accounts.google.com` 尾斜杠 issuer 不匹配失败**  
评论 3 | 👍 1 | 链接: https://github.com/github/copilot-cli/issues/4606  
摘要: Google 官方 Workspace MCP 的 protected-resource 元数据将授权服务器声明为 `https://accounts.google.com/`（带尾斜杠），而 CLI 的 OAuth issuer 校验严格匹配无尾斜杠版本，导致浏览器授权流程开始前即失败。  
重要性: OAuth 规范对尾斜杠的处理存在歧义，CLI 应做规范化处理；这阻断了大量 Google Workspace 用户接入 MCP，属于认证层的基础兼容问题。

**4. #4910 [OPEN] 非交互模式 MCP 工具调用在进度通知后挂起直至 idle timeout**  
评论 3 | 新增于 2026-09-19 | 链接: https://github.com/github/copilot-cli/issues/4910  
摘要: 非交互模式下，已发现的 Azure MCP 工具在发出首个进度通知后便不再返回结果，WebSocket 五分钟后以 `idle timeout` 关闭；相同工具与 payload 在交互模式立即成功。  
重要性: 非交互/自动化场景（CI、脚本）是 Copilot CLI 的典型用法，此问题会导致流水线卡死，严重性高；新增两天已有 3 条评论，社区关注度高。

**5. #4731 [OPEN] 被取消的工具调用阻塞 `tools/list` 刷新，导致该 MCP server 工具被永久剥离**  
评论 2 | 链接: https://github.com/github/copilot-cli/issues/4731  
摘要: 当 stdio MCP 工具调用达到客户端超时后，运行时立刻向同一仍被占用的 server 派发 `tools/list` 刷新，刷新同样超时，于是该 server 的全部工具在进程生命周期内被永久移除。  
重要性: 一次超时引发「雪崩式」工具丢失，需要重启 CLI 才能恢复，暴露了 MCP 超时与资源回收的缺陷。

**6. #3762 [CLOSED] 配置项 `contextTier` 完全不生效**  
评论 7 | 链接: https://github.com/github/copilot-cli/issues/3762  
摘要: 即使将 `contextTier` 配置为 long context，主会话与子代理仍使用默认模型；必须手动通过模型选择器切换一次后，长上下文才会对所有会话生效。  
重要性: 配置项「静默失效」对开发者极具迷惑性——节省 token/延长上下文的核心诉求无法通过配置达成；7 条评论表明社区有多次验证与补充。现已关闭，应视为已修复。

**7. #1675 [CLOSED] Checkpoint 恢复执行 `git clean -fd` 永久删除所有未跟踪文件**  
评论 5 | 链接: https://github.com/github/copilot-cli/issues/1675  
摘要: 按 Escape 选择「restore to checkpoint」时，`SnapshotManager.rollbackToSnapshot()` 对仓库根目录执行 `git clean -fd`，所有未跟踪文件（含新建源码、配置文件）被永久删除，且无确认提示。  
重要性: 破坏性数据丢失问题，用户工作成果可能被一键清空；存在数月后于今日关闭，期望已引入安全回收站或二次确认。

**8. #4807 [OPEN] 空闲 CLI 进程陷入 FileWatch 事件风暴，占 2 个 CPU 核、写出 33+ GB 日志**  
评论 2 | 链接: https://github.com/github/copilot-cli/issues/4807  
摘要: 一个由 Agency 启动的空闲 Copilot CLI 进程持续 35 小时以上处理被拒绝的文件监听事件，CPU 占用 221%，调试日志膨胀至 33 GB。  
重要性: 资源泄漏/事件循环 bug 的极端案例，空闲即高负载+磁盘塞满，对长期驻留/devbox 场景是致命隐患。

**9. #4673 [OPEN] v1.0.81 会话恢复会自动继续用户已中止的工作，困住易循环模型**  
评论 1 | 链接: https://github.com/github/copilot-cli/issues/4673  
摘要: 会话恢复功能通过 `working` 标志判断是否续跑，但用户主动 abort 不清除该标志，恢复会话后模型会「继续完成」被中止的任务，循环型模型可能陷入长时间空转。  
重要性: 用户控制权问题——「我说停，它却继续做」，是对 agent 行为可预测性的核心挑战，影响所有服务型/后台部署。

**10. #4839 [OPEN] 功能请求：提供禁用任务栏图标的选项**  
评论 4 | 👍 3 | 链接: https://github.com/github/copilot-cli/issues/4839  
摘要: 用户希望彻底关闭 CLI 的任务栏图标，因为多会话导致图标堆积，且他们有自己的注意力管理工具；目前无配置项可关闭。  
重要性: 虽不是 bug，但 3 个👍与 4 条评论表明这是高频体验需求，涉及桌面端/UI 最小化设计。

---

## 4. 重要 PR 进展

过去 24 小时内无 PR 更新或新增（共 0 条）。

---

## 5. 功能需求趋势

综合全部 Issue，社区最关注的功能方向如下：

**① MCP 生态兼容性与稳定性（占比最高）**  
- 托管服务器适配：Figma MCP（#4870）、Google Workspace OAuth（#4606）暴露了对规范外行为的容错不足。  
- 超时与取消：取消后 `tools/list` 刷新导致工具永久丢失（#4731）、非交互模式挂起（#4910）——期望「取消」能真正中断底层请求，而非阻塞后续刷新。

**② 会话恢复与上下文记忆可靠性**  
- 断点续传的数据完整性：`events.jsonl` 被 U+2028/U+2029 损坏（#2012）、恢复时事件截断（#4098）、abort 后自动续跑（#4673）。  
- 长上下文控制：`contextTier` 不生效（#3762），用户希望配置能直接决定主/子代理上下文窗口，而非依赖手动切模型。

**③ 性能与资源治理**  
- 空闲状态下的异常行为：FileWatch 事件风暴导致 33GB 日志（#4807）、内置 ripgrep 在特定 Linux 页大小下崩溃（#4918），社区对「进程驻留时资源可控」有明确诉求。  
- 计费透明度：子代理 OTel span 缺失计费属性（#4224），外部成本核算失真，影响企业采信。

**④ 键盘交互与任务控制**  
- Escape 应取消当前任务但不丢弃已排队 prompt（#3692）、提供 prompt 暂存（stash）能力（#3034）、`/ask` 在 auto 模式不可用（#4919）——用户希望对正在执行的任务有更精细的打断与恢复手段。

**⑤ 跨平台/跨 Git 服务支持**  
- Windows 下 `.bat/.cmd` 作为 stdio MCP 命令启动回归（#3958）、iTerm2 下 PTY 失败（#2726）、`/remote` 不支持 GitLab/Bitbucket（#2922）、BYOK 目录缺失 gpt-5.5（#3118）。平台适配与新模型支持是持续呼声。

**⑥ 插件与 Hook 健壮性**  
- 多个 `sessionStart` Hook 的 `additionalContext` 只注入最后一个（#3589）、`preToolUse` 拒绝不生效（#3874）、扩展管理工具死锁（#2348）——插件生态的可组合性期待被修复。

---

## 6. 开发者关注点

以下痛点或高频需求是当前反馈最集中的主题：

- **MCP 稳定性是最大「信任危机」**：从连接、认证到取消恢复，每一层都有具体失败案例，部分问题（如 #4731）一次超时即永久失去工具，开发者对 MCP

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-09-21

> 数据窗口：2026-09-20 更新（GitHub MoonshotAI/kimi-cli）

## 1. 今日速览

过去 24 小时无新版本发布，但社区活动密集：**17 条 Issue 有更新**，其中 15 条历史遗留 Issue 被集中关闭；**3 个新 Pull Request 全部为修复性质**（IME 输入、Windows 编码、OpenCode 协议兼容）。开发者最集中的痛点仍是 **Windows 平台的编码与权限问题**，以及 **大输入场景下的客户端稳定性**。

## 2. 版本发布

无新版本发布（最新 Release 仍为 v2.0.2）。

## 3. 社区热点 Issues

从 17 条更新 Issue 中挑选 10 条最值得关注：

1. **[#2655] 大输入导致 stack overflow，客户端崩溃（OPEN）**  
   2.0.2 版本下，约 900KB 的 prompt 输入会在触发任何网络请求前因路径正则表达式递归过深而崩溃，严重影响大上下文/大文件处理场景。评论 0，但这是当前最严重的新增 bug。  
   https://github.com/MoonshotAI/kimi-cli/issues/2655

2. **[#2650] 子代理启动间歇性失败：OAuth token 获取超时（OPEN）**  
   主会话正常，但启动 subagent 时对 `auth.kimi.ai` 的 OAuth 连接偶发超时，重试可成功。说明 auth 端点存在不稳定窗口，且当前实现无容错机制。  
   https://github.com/MoonshotAI/kimi-cli/issues/2650

3. **[#773] Windows 下任何输入均崩溃：ascii codec 编码错误（CLOSED）**  
   1.3 版本的遗留问题，今日被关闭。8 条评论为近 24 小时最多，说明该问题影响面广，社区关注度高。  
   https://github.com/MoonshotAI/kimi-cli/issues/773

4. **[#729] 请求执行命令时增加 skip 选项（CLOSED）**  
   当模型要执行的命令有副作用或耗时过长时，用户希望跳过但不中断整个流程。3 条评论，反映了用户对命令执行控制粒度的需求。  
   https://github.com/MoonshotAI/kimi-cli/issues/729

5. **[#1414] 权限弹窗中增加直接切换 yolo 模式选项（CLOSED）**  
   收到 3 个 👍，为本批 Issue 中最高。用户希望在每次命令确认弹窗时能一键进入自动执行模式，减少重复交互。  
   https://github.com/MoonshotAI/kimi-cli/issues/1414

6. **[#1332] Ubuntu 22.04 升级 v1.17.0 后启动报错（CLOSED）**  
   特定 Linux 内核版本下的运行错误，3 条评论。说明升级路径的兼容性仍需要更多覆盖。  
   https://github.com/MoonshotAI/kimi-cli/issues/1332

7. **[#1482] 能否多任务同时进行？（CLOSED）**  
   用户对“当前会话正在生成时新会话会被截断”的限制表示困惑，同时反馈路径选择不支持模糊匹配。2 条评论。  
   https://github.com/MoonshotAI/kimi-cli/issues/1482

8. **[#1429] Windows 平台并发写入导致 Permission denied（CLOSED）**  
   v1.19.0 在 Windows 11 下并发写入触发 `[Errno 13]`。Windows 文件锁和并发写竞争问题持续出现。  
   https://github.com/MoonshotAI/kimi-cli/issues/1429

9. **[#1321] 内核环境变量未做防御性清洗，导致 CLI 整体失效（CLOSED）**  
   系统内核变量中的特殊字符通过 `~/.kimi/` 配置污染环境，且 CLI 缺少清洗逻辑。用户明确指出了防御性编码缺失。1 👍。  
   https://github.com/MoonshotAI/kimi-cli/issues/1321

10. **[#1475] 当前目录不再显示在 prompt/窗口标题（回归，CLOSED）**  
   用户反馈 v1.15.0 之后该功能被移除，影响日常目录感知。属于典型的回归问题。  
    https://github.com/MoonshotAI/kimi-cli/issues/1475

## 4. 重要 PR 进展

过去 24 小时共有 **3 个 Pull Request**，均为修复性质：

1. **[#2658] fix(web): 修复 IME 组合输入时按 Enter 误提交（OPEN）**  
   修复 `kimi web` 在 macOS/WKWebView 下使用 CJK 输入法时，`isComposing` 状态被 WebKit 提前清除导致误提交的问题。对中文/日文用户非常关键。  
   https://github.com/MoonshotAI/kimi-cli/pull/2658

2. **[

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode 社区动态日报 — 2026-09-21

### 今日速览

今日无新版本发布，社区焦点集中在两处：一是 **SQLite 数据库在 NFS 并发场景下的损坏问题**（#14970）持续发酵，数据可靠性成为最受关注议题；二是 **Together AI token 统计为 0** 的缺陷（#47716）已由 PR #50264 修复，正在合入流程。此外，`/move` 选择器、session 管理等会话工作流类 PR 密集更新，显示社区对多项目切换体验的强烈需求。

---

### 社区热点 Issues（10 个）

#### 1. SQLite 数据库损坏：NFS 并发会话场景
🔗 [issue #14970](https://github.com/anomalyco/opencode/issues/14970) | 评论 13 | 👍 24

**关键词：数据安全 / 并发 / NFS**

**现象**：在 NFS 挂载的主目录下打开多个会话，共享的 `opencode.db` 出现 "database disk image is malformed" 错误，导致 opencode 无法正常使用。

**为什么重要**：数据完整性问题直接威胁核心工作流。24 个 👍 是全 Issue 最高，且评论数达 13 条，说明影响面较大。NFS 文件锁与 SQLite WAL 模式的兼容性可能是根因，需要更严格的并发控制或存储层替换。

---

#### 2. 新布局让 UI 变得不可用
🔗 [issue #48958](https://github.com/anomalyco/opencode/issues/48958) | 评论 8 | 👍 13

**关键词：UI 回归 / 项目切换**

**现象**：新 UI 移除了快速切换项目、在新 worktree 中开启任务并同时继续其他任务的能力。核心功能不可用，而非简单的美观问题。

**为什么重要**：UI 回归是最敏感的社区反馈之一。该 Issue 在 9 月 14 日创建，短短一周获得 13 👍，说明新布局对多任务用户的效率产生了显著负面影响。

---

#### 3. TUI 垂直空间利用率过低
🔗 [issue #9955](https://github.com/anomalyco/opencode/issues/9955) | 评论 10 | 👍 21

**关键词：TUI / 界面密度**

**现象**：TUI 在桌面端存在大量冗余留白和过高的元素高度，顶栏与底栏可合并。与其他 CLI agent 工具相比，信息密度明显偏低。

**为什么重要**：21 👍 表明这是用户长期存在的不满，但该 Issue 从 1 月创建至今仍未彻底解决，属于典型的"长期痛点"。

---

#### 4. 免费模型额度耗尽后重试时间无限递增
🔗 [issue #50093](https://github.com/anomalyco/opencode/issues/50093) | 评论 7 | 👍 5

**关键词：限流 / 重试策略**

**现象**：使用 Zen 免费模型时提示 "Free usage exceeded"，等待 6 小时重试后，其他模型返回更长的等待时间，且在不同免费模型间循环递增。

**为什么重要**：免费模型的饥饿陷阱问题直接影响用户信任。如果重试计时器设计不当，用户可能永远无法使用服务。对于依赖免费额度的用户群体，这是服务可用性级别的缺陷。

---

#### 5. Windows 上本地插件静默加载失败
🔗 [issue #46408](https://github.com/anomalyco/opencode/issues/46408) | 评论 5

**关键词：Windows / 插件系统 / 迁移回归**

**现象**：升级到 beta-18721 后，`cli.json` 中配置的本地插件在 Windows 上全部静默加载失败，无任何 UI 提示，仅 `opencode.log` 中有记录。

**为什么重要**：这是插件系统迁移（`cli.json` 迁移）引入的平台回归。Windows 用户占比不小，静默失败问题因为缺少错误提示而更难排查。

---

#### 6. Together AI token 用量始终为 0
🔗 [issue #47716](https://github.com/anomalyco/opencode/issues/47716) | 评论 2

**关键词：token 统计 / 成本核算**

**现象**：所有 Together AI 模型（GLM-5.2、Kimi-K3 等）在 UI 和数据库中记录的 token 全部为 0，导致成本核算失真。根因是 `@ai-sdk/togetherai` 未发送 `stream_options.include_usage`。

**为什么重要**：token 统计归零意味着用户无法准确追踪 token 消耗和费用。该问题已被 PR #50264 修复（见下方 PR 部分），属于快速闭环的典型案例。

---

#### 7. Bedrock 中 DeepSeek 模型被错误添加跨区域前缀
🔗 [issue #43679](https://github.com/anomalyco/opencode/issues/43679) | 评论 3

**关键词：Bedrock / 模型路由 / 跨区域**

**现象**：`resolveModelID` 函数对任何包含 `"deepseek"` 的模型 ID 无条件添加 `us.` 跨区域前缀，导致调用失败。

**为什么重要**：这一硬编码逻辑对非相关区域的 DeepSeek 模型会产生破坏性影响。集成类 Bug 往往影响面小但破坏力大，值得优先排查。

---

#### 8. 新会话在用户输入前发送约 42,000 tokens
🔗 [issue #38076](https://github.com/anomalyco/opencode/issues/38076) | 评论 3

**关键词：token 开销 / 性能**

**现象**：一个全新会话仅输入 "hi"，但 provider 报告消耗了 30k+ input tokens。

**为什么重要**：无意义的 token 消耗意味着用户的成本被白白浪费。该问题涉及系统提示词、工具定义或上下文注入的优化，对企业级用户尤为重要。

---

#### 9. AI 写出 `</tool_calls>` 后立即中止
🔗 [issue #49050](https://github.com/anomalyco/opencode/issues/49050) | 评论 4

**关键词：流式输出 / 模型兼容**

**现象**：模型在生成 `</tool_calls>` 标签后会话直接中断，无任何错误信息。

**为什么重要**：这可能是流式解析的边界条件错误——当模型恰好生成结束标签时，解析器过度截断。此类 Bug 会让用户误以为模型能力下降，实际是客户端解析问题。

---

#### 10. headless 模式在非 Git 目录中静默退出
🔗 [issue #28605](https://github.com/anomalyco/opencode/issues/28605) | 评论 6

**关键词：CLI / headless / 静默失败**

**现象**：在无 `.git` 目录的目录中运行 `opencode run`，命令不带任何错误输出地退出。相同提示词在 Git 目录中正常工作。

**为什么重要**：静默失败是 CLI 工具最糟糕的错误行为之一——用户无法区分"无结果"和"发生错误"。对 CI/CD 脚本集成场景影响尤为明显。

---

### 重要 PR 进展（10 个）

#### 1. 🔧 修复 Together AI token 用量统计
🔗 [PR #50264](https://github.com/anomalyco/opencode/pull/50264) | 已关闭（待合入）

**内容**：将 `@ai-sdk/togetherai` 从 `2.0.41` 升级至 `2.0.68`，使 provider 正确发送 `stream_options.include_usage`，修复 #47716 中 token 归零的问题。

**点评**：直接回应社区痛点，修复路径清晰——升级依赖而非修改业务逻辑，风险可控。

---

#### 2. ⬆️ Effect 升级至 rc.115
🔗 [PR #50231](https://github.com/anomalyco/opencode/pull/50231) | 开放

**内容**：将 Effect 从 `4.0.0-rc.112` 升级到 `rc.115`，涉及 socket 生命周期、schema 解析、CLI 构造器、文件系统大小及网络地址等破坏性变更的适配。

**点评**：Effect 是 OpenCode 的底层依赖，升级意味着更多新特性可用。但涉及多模块破坏性变更，需要充分回归测试。

---

#### 3. ✨ Agent 引用文件以富展示标签打开
🔗 [PR #49882](https://github.com/anomalyco/opencode/pull/49882) | 开放

**内容**：Agent 生成的截图、录屏、报告等文件，可通过 `file://` 链接以富文本标签页（而非纯文本）展示。修复了 DOMPurify 移除链接和 Electron 阻止文件的问题。

**点评**：功能体验的显著提升。Agent 输出视觉化将让用户查看生成内容时不再受限于原始文本。

---

#### 4. 🐛 无 VCS 项目显示空审查状态
🔗 [PR #50265](https://github.com/anomalyco/opencode/pull/50265) | 开放

**内容**：修复在无版本控制的项目中打开 Review 面板时永远卡在 "Loading changes…" 的问题，改为显示空状态提示。关闭 #49260。

**点评**：典型的边界条件修复。Review 功能在无 Git 项目中的表现此前被完全忽略。

---

#### 5. ⚡ 懒加载命令，`--version` 跳过完整启动
🔗 [PR #50253](https://github.com/anomalyco/opencode/pull/50253) | 开放

**内容**：重构命令加载机制，使 `opencode --version` 不再加载完整的静态命令图（在负载较高机器上可省去数秒）。取代先前被自动关闭

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-21

## 今日速览

昨日发布 v0.24.2 版本，带来 Web Shell 远程工作区恢复和 Live Voice 麦克风捕获两项新能力。社区讨论热度集中在长上下文场景下的 token 治理系列（#12028 及其子议题）、会话删除导致的会话损坏 bug（#12091），以及 Web Shell 相关的发布校验与 SSH 工作区支持。多个 autofix 机器人驱动的 PR 仍在等待人工介入，Chrome 扩展上架工作流也已进入实施阶段。

## 版本发布

**v0.24.2** — 修复与功能更新，无 Breaking Changes。
- `feat(web-shell)`: 恢复远程工作区添加流程（[#12085](https://github.com/QwenLM/qwen-code/pull/12085)）
- `feat(web-shell)`: 捕获 Live Voice 麦克风（AudioWorklet）（[#12338](https://github.com/QwenLM/qwen-code/pull/12338)）

---

## 社区热点 Issues

### 1. 非对话上下文 token 治理（tracking issue）
**#12028** — [链接](https://github.com/QwenLM/qwen-code/issues/12028) — 评论 10 | 作者 @yiliang114
> **为什么重要**：系统提示词、工具 schema、QWEN.md 等非对话上下文在每次请求中都会被计费。在 1M 上下文模型上，这些内容占比可能超过对话本身。这是一个 umbrella issue，凝聚了社区对 token 成本透明化的核心诉求。

### 2. 上下文窗口百分比预算扩展性问题
**#12029** — [链接](https://github.com/QwenLM/qwen-code/issues/12029) — 评论 8 | 作者 @yiliang114
> **为什么重要**：ToolSearch 预加载和上下文预警的预算计算使用"窗口百分比"方式，但窗口越大这些机制越失效。在项目转向大窗口模型的背景下，这是一个方向性设计缺陷。

### 3. 工作流重试历史加固（拆分跟踪）
**#12287** — [链接](https://github.com/QwenLM/qwen-code/issues/12287) — 评论 7 | 作者 @qqqys
> **为什么重要**：#12190 的 PR 在六轮 autofix 中从 1000 行膨胀到 1900 行，触及了 runner resume 语义和 checkpoint schema，需要拆分评审。这反映了 AI 辅助开发中 PR 膨胀问题的实际困境。

### 4. 上下文使用遥测数据丢失
**#12048** — [链接](https://github.com/QwenLM/qwen-code/issues/12048) — 评论 7 | 作者 @yiliang114 — 已关闭
> **为什么重要**：当存在非函数工具时，`/context` 的上下文使用统计完全丢失，且混合了两种 token 估算器。遥测是用户了解成本的基础设施，此问题影响 token 治理系列的可观测性。

### 5. [安全] 工具调用内联密钥明文落盘
**#12002** — [链接](https://github.com/QwenLM/qwen-code/issues/12002) — 评论 5 | 作者 @yiliang114 — P1
> **为什么重要**：模型生成的 shell 命令中携带的敏感 token（如 `export SOME_TOKEN='...'`）会以明文写入 session JSONL 和 ui-telemetry，造成敏感信息离机暴露。这是当前最严重的安全隐患之一。

### 6. `sessions/delete` 导致会话永久损坏
**#12091** — [链接](https://github.com/QwenLM/qwen-code/issues/12091) — 评论 5 | 作者 @yiliang114 — P1
> **为什么重要**：删除仍在运行的会话会从其下方移除 JSONL 文件，但 writer 仍在运行，会重建一个无头文件导致会话永久损坏（degraded_history、auto-continue 被禁用）。属 P1 数据完整性 bug。

### 7. v0.24.0 后 `/cd` 命令失效
**#12224** — [链接](https://github.com/QwenLM/qwen-code/issues/12224) — 评论 6 | 作者 @alchem1ster — P1
> **为什么重要**：即使没有活跃会话，`/cd` 也会报"响应或工具调用正在进行中"。升级回归问题，影响 CLI 核心交互流程，社区关注度高。

### 8. 内置工具描述与 schema 缺乏体积追踪
**#12054** — [链接](https://github.com/QwenLM/qwen-code/issues/12054) — 评论 6 | 作者 @yiliang114
> **为什么重要**：内置工具描述占非对话上下文的 45.9%（21,461 tokens），是最大的单一来源，但完全没有体积追踪。"感知即治理"的第一步是度量。

### 9. Unicode 空白符被当作 bash 分词符
**#12089** — [链接](https://github.com/QwenLM/qwen-code/issues/12089) — 评论 5 | 作者 @yiliang114
> **为什么重要**：`shell-utils.ts` 中残留 `/\s/` 正则，将 Unicode 空白当作 bash 分隔符，可能导致权限规则误判或命令拆分错误。安全相关且属于上次修复的遗漏。

### 10. 扩展上下文文件无条件驻留
**#12030** — [链接](https://github.com/QwenLM/qwen-code/issues/12030) — 评论 6 | 作者 @yiliang114 — 已关闭
> **为什么重要**：所有活跃扩展的上下文文件无条件拼接到系统提示词中，没有路径门控、预算或归属。随着扩展生态扩大，这将成为 token 消耗的隐形黑洞。

---

## 重要 PR 进展

### 1. 优化一次性 headless 执行性能
**#12340** — [链接](https://github.com/QwenLM/qwen-code/pull/12340) — @yiliang114 — OPEN
> 一次性提示词在未设置交互 shell 时默认使用基于管道的 `child_process` 后端，并在 POSIX 上以 `exec` 替换当前进程而非保留 supervisor，降低内存开销。

### 2. 工作区 providers 请求去重
**#12327** — [链接](https://github.com/QwenLM/qwen-code/pull/12327) — @Willam2004 — CLOSED
> 在 `DaemonClient` 中按解析后的 URL 共享 in-flight Promise，根级与 workspace 级 providers 读取均受益，减少重复网络请求。

### 3. Chrome 扩展上架 Chrome Web Store
**#12329** — [链接](https://github.com/QwenLM/qwen-code/pull/12329) — @tanzhenxin — OPEN
> 新增 `package:store` 脚本构建 CWS 接受的 zip（移除 manifest 的 `key`），并配套 GitHub Actions 发布工作流。为扩展正式分发铺路。

### 4. Chrome 扩展数据使用披露文档
**#12330** — [链接](https://github.com/QwenLM/qwen-code/pull/12330) — @tanzhenxin — OPEN
> 向用户隐私声明添加浏览器数据补充说明，对齐扩展的九项权限、token/实例本地存储、模型供应商传输和 Limited Use 承诺，配合上架审核。

### 5. 支持 SSH 远程工作区（免远程 daemon）
**#12255** — [链接](https://github.com/QwenLM/qwen-code/pull/12255) — @wenshao — OPEN
> 用户可在 Web Shell 中添加 `ssh://` 工作区，文件读写、搜索、shell、Git 操作和交互终端均通过 SSH 执行，模型凭据和审批留在本地，显著扩展远程开发场景。

### 6. `/review` 覆盖率报告细化
**#12371** — [链接](https://github.com/QwenLM/qwen-code/pull/12371) — @wenshao — OPEN
> `composeReview` 现在额外返回 `terminalState`（complete/partial/failed/skipped），独立于 PR 结论，明确报告一次评审实际读取了多少 diff。

### 7. 修复覆盖率报告中的幻影 chunk
**#12370** — [链接](https://github.com/QwenLM/qwen-code/pull/12370) — @wenshao — OPEN
> 从启动提示词中读取 chunk id 的方式未与计划校验，导致写入不存在 chunk 的记录。修复后从计划读取分母，防止覆盖率数字失真。

### 8. 压缩时保留思维模型的推理摘要
**#11988** — [链接](https://github.com/QwenLM/qwen-code/pull/11988) — @he-yufeng — OPEN
> 自动压缩不再因模型使用原生 `think` 标签而非提示要求的字面标签而丢弃推理摘要，摘要清洗器现可识别思维模型实际发出的标签。

### 9. 允许工作流 meta 声明前有注释
**#12245** — [链接](https://github.com/QwenLM/qwen-code/pull/12245) — @holny — OPEN
> 修复工作流脚本以 `//` 或 `/* */` 注释开头时 V8 抛出 `SyntaxError: Unexpected token 'export'` 的问题，提升脚本编写自由度。

### 10. 按服务器配置 MCP App 资源限制
**#12258** — [链接](https://github.com/QwenLM/qwen-code/pull/12258) — @samuelhsin — OPEN
> 每个 MCP 服务器可独立配置 App HTML 大小上限（默认 1 MiB，上限 4 MiB）和资源读取超时（默认 10s，上限 120s），警告信息指向具体设置项。

---

## 功能需求趋势

1. **上下文治理与 token 优化**：大量 issue 围绕"非对话上下文"的度量、门控和预算机制，这是当前社区最集中的技术债方向（#12028 系列）。核心诉求是**让 token 消耗可见、可控、可归属**。

2. **Web Shell 能力扩展**：SSH 远程工作区（#12255）、结构化 shell 执行结果展示（#12311）、git 工作树管理（#12154）等 PR 持续落地，Web Shell 正从"查看器"进化为完整的远程开发前端。

3. **上下文窗口适配**：多个 issue 指出百分比预算、工具预加载等机制在 1M 大窗口下失效（#12029、#12054），社区正在探索**与窗口大小解耦**的资源控制模型。

4. **分发与生态建设**：Chrome 扩展上架（#12240/#12329）、部署管控扩展目录（#12183）、Ecosystem 条目扩充（#9294）表明项目正在构建更完善的分发与集成生态。

5. **会话生命周期管理**：跨会话门控、会话命名与上限（#12303）、会话删除数据完整性（#12091）等议题频繁出现，多会话主机场景下的生命周期治理成为新的关注点。

---

## 开发者关注点

- **长上下文成本不可见**：多位开发者指出，工具 schema 和扩展上下文在 1M 窗口下"静默膨胀"，请求成本难以预估，亟需上下文使用量的可观测性工具。
- **进程管理可靠性**：daemon 模式下的端口冲突（#12277）、macOS 上 ACP 预热时的关闭失败（#12350）等进程级问题频繁出现。
- **AI 辅助开发的 PR 质量**：多个 PR 经历多轮 autofix 后大幅膨胀（#12287），说明 AI 生成的代码需要更强的人工评审介入机制。
- **敏感信息泄露风险**：内联密钥明文落盘（#12002）和 Unicode 分隔符误判（#12089）等安全问题受到社区高度关注，安全意识明显提升。
- **CI 稳定性**：持续存在的 E2E 重试、checkout 失败、macOS shard 死亡等问题表明自托管 CI 基础设施稳定性是开发者的持续性痛点。

---
*数据源：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | 统计周期：2026-09-20 ~ 2026-09-21*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*