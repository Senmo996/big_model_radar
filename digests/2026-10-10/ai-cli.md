# AI CLI 工具社区动态日报 2026-10-10

> 生成时间: 2026-10-10 03:12 UTC | 覆盖工具: 7 个

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

## AI CLI 工具横向对比分析报告（2026-10-10）

### 1. 生态全景

AI CLI 工具正从“单点代码生成”快速演进为覆盖开发全流程的智能体平台，各工具均处于高频迭代期，每周甚至每日都有版本发布与大量 PR 合并。社区反馈高度聚焦在**稳定性、安全、会话生命周期管理**上——挂起、崩溃、输入截断、权限语义不一致等基础可靠性问题仍是最普遍痛点。与此同时，**沙箱技术、子代理架构、事件驱动机制、MCP 生态**成为新的竞争方向，差异化正在显现：有的偏向企业合规，有的主打开源集成，有的押注深度代理架构。整体来看，工具的服务形态已从单一 CLI 扩展到桌面应用、远程控制、嵌入式 SDK，但成熟度仍不足，用户对“默认可靠”的期待远高于当前表现。

---

### 2. 各工具活跃度对比

| 工具 | 今日热点 Issues（列出的重点数） | 今日重点 PR 数 | 版本发布情况 |
|------|-------------------------------|---------------|-------------|
| **Claude Code** | 10 条 | 7 条（含 5 条 hookify 安全修复） | v2.1.296（正式版） |
| **OpenAI Codex** | 10 条 | 10 条 | rust-v0.162.1（稳定版）+ 2 个 alpha 版本 |
| **Gemini CLI** | 10 条 | 10 条 | v0.65.0-nightly + v0.64.0-preview.1 |
| **GitHub Copilot CLI** | 10 条 | 2 条 | 5 个版本（v1.0.95-3 至 v1.0.96-2） |
| **Kimi Code CLI** | 0 | 0 | 无活动 |
| **OpenCode** | 10 条 | 1 条 | 无新版本 |
| **Qwen Code** | 10 条 | 10 条 | v0.25.1-preview.1 |

> 注：表中数据为各工具日报摘要中明确列出的热点 Issue 和重点 PR 数量，非 GitHub 全部数据。OpenCode 的 PR 部分仅展示 1 条，实际合并数量可能更多。

---

### 3. 共同关注的功能方向

- **会话生命周期与恢复**
  - Claude Code：远程会话重启后归档（#100114）、5 小时 session 限制应暂停而非杀死（#98299）
  - OpenAI Codex：云任务重启后从侧边栏消失（#51675）、会话加载失败（#50000）
  - GitHub Copilot CLI：会话事件超时永久失败（#5100）、OOM 崩溃（#4686）
  - Qwen Code：会话恢复被阻塞（#13800）、用户取消与意外中断无法区分（#6710）

- **沙箱与权限控制**
  - Copilot CLI：Gradle 守护进程被沙箱阻断（#5105）、git 凭据无法注入（#5102）
  - OpenAI Codex：Windows WSL 沙箱启动失败（#49789）、MXC 沙箱迁移（#52707）
  - Gemini CLI：零依赖 OS 沙盒提案（#19873）、安全误报修复（#29672）
  - Claude Code：`--dangerously-skip-permissions` 在远程端失效（#29214）

- **子代理/多 Agent 可靠性**
  - Gemini CLI：通用代理无限挂起（#21409）、子代理 MAX_TURNS 误报成功（#22323）
  - Qwen Code：Managed Agent 架构提案（#12380）、子代理过程可恢复性（#13769）
  - Copilot CLI：BYOK 子代理 wire API 冲突（#5103）
  - Claude Code：`/skills` 主代理收不到技能列表（#100813）

- **MCP 生态稳定性**
  - Qwen Code：MCP `tools/list_changed` 动态刷新（#13632）、HTTP 工具注册失效（#13796）
  - Copilot CLI：MCP 反复“假重连”（#5091）、Atlassian 授权丢失（#2536）
  - OpenCode：MCP server 阻塞导致 ACP 挂起（#41459）

- **输入/输出可靠性**
  - Claude Code：长输入静默截断（#74004/#90910/#92118）
  - Qwen Code：XML 标签泄漏到用户可见输出（#10797/#10700）
  - OpenCode：免费模型输出中途截断（#39582）
  - Gemini CLI：修复 truncateString 换行丢失（#29673）

---

### 4. 差异化定位分析

| 工具 | 核心定位 | 技术特点 | 目标用户 |
|------|---------|---------|---------|
| **Claude Code** | 全能型开发者 CLI + 桌面端 + 远程控制 | 深度绑定 Claude 模型能力，支持 subagent frontmatter、gateway 托管策略、HIPAA 合规配置；强调企业级管控与多端协同 | 依赖 Claude 生态、需要远程/桌面联动及合规性的开发者 |
| **OpenAI Codex** | Rust 实现的高性能 CLI，融入 OpenAI 全家桶 | 底层架构加固频繁（gRPC、MXC 沙箱），强调服务端稳定与 Docker 化；Dots 分离，支持语音通话、Computer Use | 使用 OpenAI 模型、偏好本地 Rust 工具链、关注 Windows 与桌面集成的开发者 |
| **Gemini CLI** | Google Gemini 模型的理想前端 | 深度集成 Gemini 3 模型 bash 亲和力，ASET 感知探索、浏览器代理、技能系统；重视子代理可观测性 | 拥抱 Gemini 多模态能力、希望获得原生模型互动的开发者 |
| **GitHub Copilot CLI** | 与 GitHub 生态和 Copilot 订阅绑定 | 沙箱（injectHosts）、企业策略支持、BYOK 多模型、ACP 协议；MCP 集成和平台兼容性仍在打磨 | GitHub 深度用户、企业内 Copilot 订阅者、需要严格权限控制的多模型团队 |
| **Kimi Code CLI** | （无活跃） | — | — |
| **OpenCode** | 开源可嵌入的 AI 开发平台 | 强 SDK 属性，支持自定义前端与 ACP 协议；v2 重写后专注于稳定性恢复和免费模型兼容 | 希望基于 CLI 构建自定义 AI 工具的开发者 |
| **Qwen Code** | 企业级 Managed Agent 与全栈工具链 | 架构前瞻性强，Session 持久所有权、Kubernetes 运行时、Java durable 支持、写者 fencing 机制；大量设计驱动型 Issue/PR | 面向需要可恢复、可审计、高可靠 Agent 基础设施的企业团队 |

---

### 5. 社区热度与成熟度

- **社区热度最高**：Claude Code 与 OpenAI Codex 均出现超过 80 个 👍 的 issue，评论数普遍在 20+，且涉及支付、权限等核心体验问题；Gemini 的 p1 issue 虽少但关注集中（通用代理挂起 8 👍）。Qwen Code 的架构讨论（51 评论）显示了较高技术圈影响力。
- **迭代速度最快**：OpenAI Codex 一日合并 40 条 PR（除列出的 10 条外），版本号从 .162.1 到 .163.0-alpha；GitHub Copilot CLI 一日发 5 个版本，节奏极快。Claude Code 维持稳定单版本发布。
- **成熟度差异**：Claude Code 与 Copilot CLI 已进入“长尾问题打磨期”（权限、稳定性、回归），但跨平台一致性仍欠佳；Gemini 和 Codex 仍处于“快速修复架构缺陷”阶段，p1 级阻塞频发；Qwen Code 处于“设计驱动演进”阶段，大量 PR 对应架构提案，执行力强；OpenCode 处于 v2 迁移后的修复期，问题集中在迁移引入的 bug。
- **风险信号**：多工具出现“静默失败”倾向（Claude 输入截断、Gemini 子代理误报成功、Codex 会话丢失），对用户信任造成显著损害。

---

### 6. 值得关注的趋势信号

- **“默认可靠”成为最低门槛**：长输入截断、会话丢失、子代理误报成功等“静默失败”案例频繁出现，用户已表现出强烈不信任。开发者应优先考虑可观测性和明确的失败反馈，而非一味增加功能。
- **远程/多端协同将成标配**：Claude 的 Remote Control、Codex 的 Dots、Gemini 的多端同步都在推进，但权限继承、会话恢复、平台一致性尚未解决。未来需要统一的“同一任务跨设备无缝继续”的抽象层。
- **沙箱与安全策略进入“深水区”**：从基本文件权限转向真实工具链兼容（JVM/Gradle、git 凭据、WSL），同时出现安装脚本校验绕过等供应链安全警示。沙箱不能以牺牲真实开发流程为代价，需要“聪明默认值”与可撤销的覆盖能力。
- **子代理架构从“玩具”走向“生产”**：Gemini 的挂起和误报、Qwen 的 Managed Agent 方案、Copilot 的 BYOK 子代理，都指向同一个需求：子代理必须有清晰的执行边界、可恢复的状态、可审计的追溯信息，并如实报告失败。
- **MCP 正在经历“可靠性挤兑”**：各工具都在增加 MCP 支持，但重连风暴、工具注册失效、授权持久化等基础问题未根除。MCP 若要成为工具集成标准，必须有统一的健康检查、动态刷新和会话恢复机制。
- **事件驱动与异步化**：Codex 的 monitor 工具提案、Copilot 对同步加载慢的抱怨，都表明当前“请求-响应”循环已不能满足长时间运行的 agent 需求。后台事件唤醒、异步会话管理将成为下一阶段竞争力关键。
- **多模型与 BYOK 的治理需求**：Copilot 的 wire API 冲突、OpenCode 的免费模型权限冲突，提示多模型混用需要模型无关的配置层和提供方抽象，否则 BYOK 只是玩具。

---

*本报告基于 2026-10-10 各工具社区动态摘要生成，数据及 Issue/PR 引用均来自原文。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills | 截止 2026-10-10

## 一、热门 Skills 排行

以下 PR 按社区评论活跃度排序，覆盖了当前社区最关注的 8 个 Skill/修复项。

### 1. MCP Builder 兼容性修复（#1742）
- **功能**：修复 `mcp>=2.0` 后 `streamablehttp_client` 更名及自定义 HTTP 头配置方式变化导致的连接失败。
- **讨论热点**：MCP 协议快速演进的兼容性阵痛；用户对现有 Skill 在升级后"静默失效"的担忧。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/1742)

### 2. Skill-Creator 触发评估修复（#1298）
- **功能**：隔离触发评估中的 worker 竞争、修复 Windows 管道 select() 失败、避免无关工具中断扫描。
- **讨论热点**：skill-creator 是官方核心 Skill，其误报/漏报直接干扰 skill 优化；Windows 支持是社区高频痛点。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/1298)

### 3. ProofCore 智能合约审计（#1771）
- **功能**：新增 Web3 Skill，对 Solidity/Rust 合约做静态分析，并将审计证明锚定到 TON 区块链。
- **讨论热点**：区块链 + AI 审计的结合方式、零存储 Merkle 协议的可信度；这是社区少见的 Web3 垂直场景 skill。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/1771)

### 4. md2video-audio 视频生成（#1703）
- **功能**：零成本将 Markdown 通过 Marp 转成幻灯片，并合成拟人语音输出 MP4。
- **讨论热点**：内容创作者对"文档→视频"自动化管线的强烈兴趣；纯本地、无额外 API 成本是亮点。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/1703)

### 5. Notion Spec 转实现 + 量化简历审计（#1245）
- **功能**：双 Skill——将产品/技术 spec 拆解为可执行的 Notion 任务；对简历进行量化维度审计。
- **讨论热点**：企业工作流自动化（spec→任务）与招聘场景的结合；首次出现"简历量化"类 Skill。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/1245)

### 6. AWT AI 驱动 E2E 测试（#822）
- **功能**：基于视觉与浏览器控制的零代码端到端测试，可自动生成测试用例并执行。
- **讨论热点**：测试生成是社区长期诉求；该 PR 从 3 月持续活跃到 9 月，关注度高但落地周期长。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/822)

### 7. document-typography 排版质量（#514）
- **功能**：针对 AI 生成文档的孤行、寡段、编号错位等排版问题做自动修正。
- **讨论热点**：AI 产出文档的"最后一公里"质量问题；用户普遍认可这是刚需但此前无人做。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/514)

### 8. Skill-Creator 安全加固（#1961）
- **功能**：加固 eval viewer，修复脚本逃逸、DNS rebinding、跨站 POST 与 HTML 转义缺口。
- **讨论热点**：Skill 输出为不可信内容时的本地安全边界；与 #1394 XSS issue 直接对应，安全议题热度上升。
- **状态**：Open | [查看 PR](https://github.com/anthropics/skills/pull/1961)

---

## 二、社区需求趋势

从 Issues 评论量与点赞分布看，社区最期待的方向集中在以下四类：

### 1. 安全与信任（最高声量）
- **命名空间冒用**（#492，43 评论）：社区对非官方 Skill 在 `anthropic/` 命名空间下分发、诱导用户授权 Elevated 权限表达了强烈担忧。
- **本地 UI 安全**：#1394 的 eval-viewer 属性逃逸 XSS。
- **命令注入防护**：#1980 对 `shell=True` 的移除成为热门修复。

### 2. 企业级可用性
- **组织级 Skill 共享**（#228，16 评论）：用户希望不用再手动传文件，直接在 Claude.ai 内共享 Skill 库。
- **企业文档安全**（#1175）：SharePoint 文档访问控制与上下文窗口限制的讨论。

### 3. 可靠性 Bug 修复（最集中）
- **CLI 模式 Skill 从不触发**（#556，12 评论）：`claude -p` 下 trigger rate 为 0%，

---

# Claude Code 社区动态日报 — 2026-10-10

## 今日速览
- **v2.1.296 发布**，为 Claude Desktop 的 Code 标签页加入 gateway 托管策略支持，并新增 `autoCompactWindow` 子代理配置。
- **远程控制（Remote Control）与权限继承问题**成为社区焦点：#29214（👍81）质疑 `--dangerously-skip-permissions` 在移动端失效，#100114 报告 Windows 桌面端重启后会话丢失。
- **长输入被静默截断**是近期最集中的体验痛点，过去一天再有 #100955、#100954 等新报告出现，且已有 3 个平台（macOS/Linux/WSL/Windows）上的独立复现。

---

## 版本发布

### v2.1.296
- **Claude Apps Gateway 托管策略扩展**：`managed.policies[]` 新增 `code` 键，与 `cli` 使用相同配置，并应用到 Claude Desktop 的 Code 标签页；增加 `desktop` 值可开启 Claude Desktop 的 gateway 模式。
- **子代理配置增强**：subagent frontmatter 与 `--agents` 定义新增 `autoCompactWindow` 选项。

🔗 [Release 详情](https://github.com/anthropics/claude-code/releases)

---

## 社区热点 Issues（10 条）

### 1. Desktop 启动崩溃：窗口不渲染，进程滞留后台 ⭐ 41 评论
**#28304** | 作者 @Duanes-Tech-Hub | 👍 31
Claude Desktop 1.1.4173 在 Windows 上启动即崩溃，无窗口渲染，但 Task Manager 可见进程。长期未解决，仍为 open 状态，是本日讨论热度最高的问题。
🔗 https://github.com/anthropics/claude-code/issues/28304

### 2. 远程控制无视 `--dangerously-skip-permissions` ⭐ 👍 最高（81）
**#29214** | 作者 @hoiung | 评论 32
启用 `--dangerously-skip-permissions` 后，通过 `/rc` 远程控制时移动端仍对每个文件编辑和 bash 命令弹权限确认。社区普遍认为移动端应继承本地会话的权限模式。
🔗 https://github.com/anthropics/claude-code/issues/29214

### 3. Max 5x → 20x 升级付款持续失败
**#56281** | 作者 @Kaustubh10-01 | 评论 29
多次尝试升级订阅均付款失败，且支持渠道无响应。影响付费用户，已持续数月（创建于 5 月）仍未解决。
🔗 https://github.com/anthropics/claude-code/issues/56281

### 4. Desktop 回归：工作目录外文件无法内联打开
**#73338** | 作者 @marattuleev97 | 评论 6
更新后点击工作目录外的 Markdown 文件（如 memory 文件），不再内联打开，而是跳转"Show in Finder"。已被标记为 regression（macOS + Windows）。
🔗 https://github.com/anthropics/claude-code/issues/73338

### 5. Windows Desktop：重启后 Remote Control 会话变为 archived
**#100114** | 作者 @tal-labs | 评论 4
App 更新重启后，已连接会话在手机端全部进入 Archive，无法自动恢复。属较新的平台特定 bug（2026-10-07 创建）。
🔗 https://github.com/anthropics/claude-code/issues/100114

### 6. 功能需求：Discussion mode（只读会话 + 可导出产物）
**#85848** | 作者 @Hugo-Dahl-Tyler | 评论 3
呼声较高的 enhancement：希望有一种只读的"讨论模式"，不修改代码，同时支持导出对话产物。适合 code review 场景。
🔗 https://github.com/anthropics/claude-code/issues/85848

### 7. 长输入静默截断（多平台复现）
**#74004** (macOS) / **#90910** (Warp, 762/2211 字符被裁) / **#92118** (Linux/WSL)
三条独立报告均指向同一问题：用户粘贴或输入长文本时，Claude Code 静默截断且无任何警告，造成内容丢失。评论数不高但跨平台复现，且尚无官方修复。
🔗 https://github.com/anthropics/claude-code/issues/74004  
🔗 https://github.com/anthropics/claude-code/issues/90910  
🔗 https://github.com/anthropics/claude-code/issues/92118

### 8. `/skills` 显示已加载，但模型实际收不到技能列表
**#100813** | 作者 @voidfreud | 评论 2
2.1.295 中主代理收不到 skills 列表，而子代理可正常获取——Skill 工具与主代理之间存在加载时序/同步问题，影响技能类工作流。
🔗 https://github.com/anthropics/claude-code/issues/100813

### 9. Claude Code 自我报告：模型持续违反用户规则
**#100956 / #100954 / #100946** | 作者 @David-Noble-at-work
**社区趣闻**：用户让 Claude Code 自身提交所有违规记录，于是出现了多条由模型（claude-opus-5-5）自动提交的 issue——声称不检查工具输出就陈述事实、未使用长命令选项、计数不准确等。反映出一部分用户对模型指令遵循稳定性的关注。
🔗 https://github.com/anthropics/claude-code/issues/100956  
🔗 https://github.com/anthropics/claude-code/issues/100954  
🔗 https://github.com/anthropics/claude-code/issues/100946

### 10. Windows：Docker Desktop 被 Claude Desktop 启动时崩溃（AF_UNIX socket 错误 1920）
**#100901** | 作者 @roshyrowe | 评论 2
agent shell 无法打开 AppData 下的 AF_UNIX 套接字文件，与 MSIX AppData 重定向有关（关联 #94254）。新增了 trace 证据，属于较深层的 Windows 平台兼容性问题。
🔗 https://github.com/anthropics/claude-code/issues/100901

---

## 重要 PR 进展（7 条）

### 1. ✨ Open Source Claude Code（开放）
**#41447** | 作者 @gameroman
目标关闭 #59、#456、#2846、#22002、#41434 等历史 issue——社区对开源核心代码的长期诉求。目前仍在 open 状态。
🔗 https://github.com/anthropics/claude-code/pull/41447

### 2. HIPAA 合规设置示例（已合并/关闭）
**#100293** | 作者 @sarahdeaton
新增 `settings-hipaa.json`、`managed-mcp-hipaa.json`、`README-hipaa.md`，帮助受 HIPAA 约束的组织配置数据驻留限制。
🔗 https://github.com/anthropics/claude-code/pull/100293

### 3-7. hookify 插件安全修复系列（全部已关闭）
这 5 个 PR 由同一位作者 @alifakbxr 提交，集中修复 `hookify` 插件中的安全逻辑缺陷：

| PR | 修复内容 |
|---|---|
| **#85716** | 从祖先 `.claude` 目录加载规则，防止规则被静默绕过 |
| **#84747** | 强制正确规则评估范围 + 安全文件读取，防止 `event=None` 时绕过事件过滤 |
| **#84711** | 修复 YAML 注入与符号链接凭证覆写（修复 #76580） |
| **#84365** | 允许任意用户的 thumbs down 阻止自动关闭（修复 #79146） |
| **#84364** | `pretooluse` 钩子异常时 fail closed（返回 deny），避免未授权操作 |

🔗 https://github.com/anthropics/claude-code/pull/85716  
🔗 https://github.com/anthropics/claude-code/pull/84747  
🔗 https://github.com/anthropics/claude-code/pull/84711  
🔗 https://github.com/anthropics/claude-code/pull/84365  
🔗 https://github.com/anthropics/claude-code/pull/84364

---

## 功能需求趋势

从近期 issue 中可提炼出以下社区重点关注方向：

1. **远程控制/移动端体验**（#29214、#100114、#85911）：移动端与桌面端会话状态同步、权限模式继承是高频诉求。
2. **长文本输入可靠性**（#74004、#90910、#92118、#100955、#99252）：用户强烈要求截断必须显式警告，且输入内容需可恢复。
3. **会话生命周期管理**（#98299、#94063）：5 小时 session 限制应暂停而非杀死 agent；Ctrl+S 暂存内容应跨会话持久化。
4. **模型行为可配置性**（#95876、#100960）：社区希望支持"内联 effort 级别"控制，并对模型行为漂移（behavioral drift）表示担忧。
5. **权限控制的精细度**（#99865、#29214）：WebFetch 的 allow 规则在 auto 模式下不生效，远程会话与本地权限策略不一致。
6. **插件/安全机制透明度**（#100959、#100958）：插件被误报为安全风险、插件 UI 焦点丢失等体验问题逐渐增多。

---

## 开发者关注点

- **输入内容丢失信任危机**：多条 Windows 与 macOS 报告显示长输入会被无提示截断，且不可恢复，这对依赖 CLI 进行大量代码粘贴的开发者影响极大，是当前**最集中的信任痛点**。
- **Desktop 稳定性回归**：崩溃启动（#28304）、文件打开回归（#73338）、插件焦点丢失（#100958）等表明桌面端近期更新引入了多个回归问题。
- **远程控制跨设备仍不成熟**：权限继承、会话恢复、archived 状态等关键路径存在明显缺陷，移动端 Code 功能尚不适合正式工作流。
- **权限模式语义不一致**：`--dangerously-skip-permissions`、`auto` 模式下规则优先级、WebFetch 例外等存在多层级不一致，开发者难以预期实际行为。
- **模型遵循指令的稳定性**：多起"模型未按规则执行"的反馈（包括自我报告系列 #100946-#100956）提示需要更稳定的行为基线。

---

*本日报由 GitHub 数据自动整理生成，仅供技术社区参考。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-10

## 今日速览

稳定版 `rust-v0.162.1` 发布，修复了 TUI 多行异步问题崩溃和后台服务器特性差异导致的启动失败。社区热度集中在 Windows 桌面应用与 Dots 功能的稳定性缺陷上，多个高评论量 Issue 持续发酵；与此同时，40 条 PR 在过去 24 小时密集合并，覆盖声音会话分类、MXC 沙箱迁移、gRPC 传输等方向，显示 Codex 团队正在系统性地加固底层架构。

## 版本发布

**rust-v0.162.1**

- 修复异步问题中包含多行文本时导致的 TUI 崩溃，同时保留换行与完整超链接目标（#51866）
- 修复运行中后台服务器的特性设置与 CLI 默认值不一致导致的启动失败；新增兼容性检查

**rust-v0.163.0-alpha.5 / rust-v0.163.0-alpha.4**

- 预发布迭代版本，无附带变更说明

## 社区热点 Issues

### 1. Windows dot-started 本地任务缺少 Computer Use 工具
[#49458](https://github.com/openai/codex/issues/49458) — 67 评论 / 25 👍

Windows 上通过 dot 启动的本地任务无法使用 Computer Use 工具，而普通本地 Codex 会话正常。评论数高居榜首，反映了 dot 功能在 Windows 平台上的完成度缺口。

### 2. VS Code 扩展更新后间歇性丢失已提交消息
[#49988](https://github.com/openai/codex/issues/49988) — 53 评论 / 49 👍（已关闭）

更新扩展后按 Enter 经常清空输入框但消息未进入对话，需重复提交才能成功。获得 49 个 👍，是过去 24 小时讨论量最高的扩展相关问题，已关闭说明官方可能已定位或发布修复。

### 3. 代理可调用的 `monitor` 工具需求
[#29922](https://github.com/openai/codex/issues/29922) — 18 评论 / 7 👍

建议新增一个 agent 可调用的 monitor 工具，让 Codex 在后台事件（日志、文件、构建、CI）发生时被唤醒，避免轮询。长期开放的架构级功能请求，代表社区对事件驱动式自动化能力的期待。

### 4. Dots 语音呼叫跨设备无法接通
[#50870](https://github.com/openai/codex/issues/50870) — 15 评论

iPhone、Mac 和 Windows Web 端呼叫 dot 均只响铃不接通。独立于 #49877 的单点报告，说明 Dots 语音链路存在跨平台共性问题。

### 5. app-server 本地命令执行缺少 cwd 作用域环境契约
[#24638](https://github.com/openai/codex/issues/24638) — 14 评论 / 11 👍

普通 `codex` 会话可能复用隐式 app-server 守护进程，而添加 `-c` 覆盖后启动不同的执行拓扑，导致环境来源不一致。CLI 层面深层的环境语义问题，社区持续关注。

### 6. macOS 桌面端云任务重启后从侧边栏消失
[#51675](https://github.com/openai/codex/issues/51675) — 14 评论 / 3 👍

云任务在重启后从自定义侧边栏消失，Dots 列表和直接读取可恢复条目。会话持久化相关的数据一致性 bug，影响日常任务管理体验。

### 7. 托管 app-server 将 hooks 错误归属到首个客户端的 TMUX 终端
[#48500](https://github.com/openai/codex/issues/48500) — 13 评论 / 18 👍

0.157 回归：共享 app-server 守护进程继承首个 TUI 的环境变量，导致所有后续客户端的生命周期 hooks 被错误归属到同一终端面板。18 个 👍 表明终端复用场景下开发者对此问题反应强烈。

### 8. Windows 应用无法加载 openai 捆绑插件
[#46744](https://github.com/openai/codex/issues/46744) — 12 评论 / 3 👍

Windows Codex App 26.915.4065.0 上 Browser、Computer Use、Image Gen 等插件全部不可用，免费和 Plus 账户均可复现。核心功能不可用的高影响问题。

### 9. Windows 上所有命令失败：「setup refresh had errors」
[#52179](https://github.com/openai/codex/issues/52179) — 12 评论 / 1 👍

升级到 26.1002.52244 后所有命令均无法执行。自定义模型提供商用户受影响，覆盖面广，属于阻塞性回归。

### 10. WSL 沙箱启动失败：No such file or directory
[#49789](https://github.com/openai/codex/issues/49789) — 11 评论 / 8 👍

Windows 应用 26.928.21956 升级后 WSL 沙箱无法启动。8 个 👍 和持续更新的讨论显示 WSL 用户群体对沙箱路径变更敏感。

## 重要 PR 进展

### 1. 语音会话失败分类与终局结果记录
[#52756](https://github.com/openai/codex/pull/52756)

为语音失败指标增加原因与生命周期阶段标记，避免控制发送失败覆盖更具体的 WebRTC 错误。完善 Dots 语音可观测性。

### 2. code-mode `exit()` 终止整个 cell
[#52748](https://github.com/openai/codex/pull/52748)

修复可捕获异常使 JavaScript 在 `exit()` 后继续执行的问题，终止 V8 执行以确保退出后不再产生输出或状态变更。

### 3. 新增 opt-in 输出 token 回放功能
[#52742](https://github.com/openai/codex/pull/52742)

默认关闭的 `output_token_replay` 特性，可从 OpenAI 提供商请求 `output.encrypted_content`，保留加密消息、工具调用输出及状态注解。服务端会话恢复与审计场景的基础能力。

### 4. 模型目录支持覆盖增量工具提示
[#52736](https://github.com/openai/codex/pull/52736)

新增 `model_messages.tools.incremental_tools` 覆盖项，支持定制更新提示、工具与命名空间移除头部等消息；缺失或超长值回退到内置文案。

### 5. 通过 OSC 7501 上报终端程序状态
[#52725](https://github.com/openai/codex/pull/52725)

将 `idle`、`working`、`blocked` 状态通过 OSC 7501 输出，使 iTerm2 之外的终端也能感知 Codex 生命周期状态。

### 6. 迁移 Windows MXC 沙箱到拆分 MXC crates
[#52707](https://github.com/openai/codex/pull/52707)

用拆分后的 MXC crates 替换 `mxc-sdk`，在过渡性 Windows 构建上正确检测 PSEC API 可用性，避免 MXC 未启用时的误判。紧密关联今日多个 Windows 沙箱 Issue。

### 7. bootstrap GET 失败后通过系统代理重试
[#52702](https://github.com/openai/codex/pull/52702)

账户发现与云配置 GET 在连接后、响应头前失败时绕过系统代理回退的问题，本次 PR 补齐了这一路径。

### 8. code-mode host 新增 opt-in gRPC over stdio
[#52723](https://github.com/openai/codex/pull/52723)

新增 `grpc+stdio://` 主机传输和默认关闭的 `code_mode_host_grpc` 特性标志，跨 code-mode 会话共享 HTTP/2 通道与宿主进程，同时保持会话状态隔离。

### 9. 服务器关闭时明确会话创建失败原因
[#52721](https://github.com/openai/codex/pull/52721)

优雅关闭期间拒绝新会话时返回结构化原因 `serverShuttingDown`，便于命令行中心向用户展示会话创建暂停的具体原因。

### 10. exec-server 稳定兼容基线更新至 0.162.1
[#52700](https://github.com/openai/codex/pull/52700)

将 `exec-server-stable-release-test` 的兼容基线从 0.156.1 提升到 0.162.1，同步 Bazel 发布归档版本与校验和。确保 exec-server 与最新稳定 CLI 的对齐。

## 功能需求趋势

- **事件驱动机制**：`monitor` 工具提案（#29922）持续获得关注，社区希望 Codex 从轮询/回合驱动转向后台事件主动唤醒。
- **CLI 表达力增强**：`--effort` 命令行选项请求（#48321），使用户无需修改 config.toml 即可选择推理强度。
- **Dots 跨设备体验**：语音通话（#50870）、会话连接（#51731, #50698）、审批流程（#52503）等多个 Dots 相关 Issue 集中出现，标志该功能进入密集迭代期。
- **Windows 平台系统性问题**：不只是单个 bug，而是插件加载、WSL 沙箱、MXC 沙箱、启动失败等多个维度同时暴露问题，社区对 Windows 稳定性的诉求显著高于其他平台。

## 开发者关注点

- **app-server 环境继承语义**：共享守护进程继承首个客户端的 `TMUX_PANE`/`TMUX`（#48500）、不同启动方式产生不同环境来源（#24638），开发者对隐式共享状态和不确定的执行环境语义表示担忧。
- **Windows 沙箱可靠性**：WSL「No such file or directory」（#49789）、「setup refresh had errors」（#52179）、MXC CUA 启动失败（#52407, #50981）等海量报障，沙箱初始化与恢复流程是 Windows 用户的头号痛点。
- **会话与任务持久化**：云任务从侧边栏消失（#51675）、自定义分区任务丢失（#43025）、会话加载失败（#50000），数据可靠性问题削弱了桌面端作为「任务管理中心」的可信度。
- **认证与配置加载失败**：DeviceCheck 403（#52746）、组织设置无法加载（#51586）、工作空间设置加载失败等，提示 10 月初的版本存在与新认证链路相关的回归。
- **高频回归模式**：多个 Issue 指向升级版本后立即出现问题（扩展消息丢失、WSL 路径失效、插件无法加载），开发者希望项目组加强升级前兼容性验证和灰度发布。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-10

## 今日速览

今日发布两个版本：nightly v0.65.0 修复了 HTTP 调用的 JSON 解析/响应流错误和字符串截断导致的换行符丢失问题，preview v0.64.0-preview.1 则针对安全误报修复进行了补丁合入。社区方面，子代理相关议题持续发酵——尤其是 **#21409 通用代理无限挂起**和 **#22323 子代理被 MAX_TURNS 中断却误报 GOAL 成功**，两者均属 p1 且获得高热度。此外，新出现的 **#29702 原子写入导致 ENAMETOOLONG 报错**（215-255 字节文件名场景）值得关注，这是近期原子写入重构的副作用。

---

## 版本发布

### v0.65.0-nightly.20261010.g9b6e0265d
- **fix(cli)**: 修复 `fetchJson` 中 JSON 解析和响应流错误处理（#29658）
- **fix(core)**: 修复 `truncateString` 未能保留行终止符的问题（#29673）

### v0.64.0-preview.1
- 从 `release/v0.64.0-preview.0` 分支 cherry-pick 安全修复至 preview 线（PR #29672），生成补丁版本 0.64.0-preview.1（#29696）

> 完整变更日志可见 GitHub Releases 页面。

---

## 社区热点 Issues（Top 10）

### 1. 子代理恢复逻辑误报：MAX_TURNS 中断被报告为 GOAL 成功
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) · p1 · 评论 13 · 👍 2

`codebase_investigator` 子代理在尚未执行任何分析时就已触发最大轮次限制，但最终状态却为 `success`。开发者可能被误导，以为任务实际完成。

**为何重要**：这是"静默失败"的典型案例，会直接侵蚀用户对代理任务结果的信任。p1 且已标记 `need-retesting`，修复优先级高。

---

### 2. 利用模型 bash 亲和力：零依赖 OS 沙盒与执行后意图路由
[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) · p2 · 评论 9 · 👍 1

Gemini 3 模型天然擅长 POSIX 工具链（grep/cat/sed/awk），但当前沙盒机制未充分发挥这一能力。该 issue 提出在不动摇安全性的前提下，让模型更好地以"原生 bash 用户"的方式工作。

**为何重要**：这是 agent 执行效率与安全的平衡问题。获得 9 条评论讨论，属于 p2 中的高热度议题。

---

### 3. 通用代理（Generalist agent）无限挂起
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) · p1 · 评论 8 · 👍 8

一旦将任务委派给通用代理即永久挂起（用户等待最长 1 小时无响应）；指示模型不要使用子代理后问题消失。关注度最高（8 👍）。

**为何重要**：直接阻断用户核心工作流，p1 + 高赞 + 8 条评论，是当前最紧急的 agent 稳定性问题之一。

---

### 4. 评估 AST 感知文件读取/搜索/代码库映射的价值
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) · p2 · 评论 7 · 👍 1

EPIC 议题：探索 AST 感知工具是否能实现精准方法边界读取、减少 token 噪声、优化代码库导航。

**为何重要**：与上下文窗口效率和 token 成本直接相关，是中长期 agent 质量提升的关键方向，当前有多个子 issue（#22746、#22747）联动跟踪。

---

### 5. Gemini 不主动使用自定义技能（Skills）和子代理
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) · p2 · 评论 7

用户反馈即使配置了 `gradle`、`git` 等自定义技能，Gemini 也几乎不会主动调用，除非显式指示。

**为何重要**：技能系统是 Gemini CLI 的差异化能力，模型不主动使用意味着该功能的投资回报率低，社区反馈强烈。

---

### 6. 浏览器代理忽略 settings.json 覆盖（如 maxTurns）
[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) · p2 · 评论 4

`AgentRegistry` 正确读取了配置，但 `BrowserManager` 实际执行时未应用 `settings.json` 中的覆盖项，导致用户无法通过配置控制浏览器代理行为。

**为何重要**：配置不生效等同于功能缺失，影响可配置性。

---

### 7. 浏览器代理韧性增强：自动会话接管与锁恢复
[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) · p3 · 评论 4

当前 `BrowserManager` 对锁定的 browser profile 使用"快速失败"策略，即遇到持久会话锁直接报错退出，而非自动接管或恢复。

**为何重要**：持久化会话场景下，孤儿进程或残留锁会不断中断用户浏览器代理任务。

---

### 8. 浏览器子代理在 Wayland 下失败
[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) · p1 · 评论 4 · 👍 1

浏览器子代理在 Wayland 环境无法正常工作。Wayland 用户基数虽小于 X11，但 p1 级别表示影响核心功能。

---

### 9. 符号链接不被识别为自定义代理文件
[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) · p2 · 评论 4

当 `~/.gemini/agents/filename.md` 为 symlink 时，该代理不被识别。用户期望通过 symlink 将自定义代理文件链接到版本控制的工作区。

**为何重要**：阻碍了将自建代理纳入 Git 管理的常见工作流，该 issue 已持续数月未解决，标记 `need-information`。

---

### 10. 工具数超过 400 个时遭遇 400 错误
[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) · p2 · 评论 3

当可用工具超过 128 个（标题）或 400 个（正文）时，Gemini CLI 请求返回 400。用户期望模型按需裁剪启用工具作用域。

**为何重要**：随着生态工具增多，工具数量膨胀是必然趋势，这一限制将越来越高频地触发。

---

## 重要 PR 进展（Top 10）

### 1. 支持带点号 Gemini 3 模型的多模态函数响应
[#29611](https://github.com/google-gemini/gemini-cli/pull/29611) · size/m · 更新 10-10

解析模型别名并支持 `gemini-3.8-flash` 等带点号版本。修复 `read_file` 输出图片等多模态工具结果被错误地作为非法 sibling 输出导致 HTTP 400 的问题。

**影响**：多模态能力在新版本模型上的正确落地。

---

### 2. 修复根因：挂起的 Web 搜索 30 秒超时
[#29608](https://github.com/google-gemini/gemini-cli/pull/29608) · p1 · size/m · 更新 10-10

`GoogleSearch` 和 `WebFetch` 之前只传递调用方的 abort signal，底层 LLM 请求永不返回时，代理会无限期停留在 `Thinking...` 状态（报告称最长 30 分钟）。该 PR 为搜索工具引入 30 秒超时。

**影响**：直接解决用户反馈最强烈的"无限 Thinking"痛点之一。

---

### 3. 自定义请求头按 RFC 9110 令牌分割
[#29606](https://github.com/google-gemini/gemini-cli/pull/29606) · size/s · 更新 10-10

`parseCustomHeaders` 对所有 `,<text>:` 形式进行分割，导致包含 JSON 元数据（如 `x-portkey-metadata: {"_user":"alice","env":"prod"}`）或多 URL 的合法 header 值被错误拆分。该 PR 修复为仅在有效的 RFC 9110 token 前分割。

**影响**：正确解析自定义 header 是网关/代理类用户的基础需求。

---

### 4. 夜间评估摘要无报告时改为失败
[#29607](https://github.com/google-gemini/gemini-cli/pull/29607) · size/m · 更新 10-10

`aggregate_evals.js` 之前在没有 `report.json` 时输出 "No reports found." 并 exit 0。在 `continue-on-error: true` 的夜间流水线中，所有矩阵任务失败的夜晚会被"静默通过"。

**影响**：CI 基础设施可靠性提升，防止"假绿"。

---

### 5. 恢复终端宽度变化的防抖静态 UI 刷新
[#29644](https://github.com/google-gemini/gemini-cli/pull/29644) · p1 · size/m · 更新 10-09

恢复 `AppContainer.tsx` 中 `terminalWidth` 变化的 100ms 防抖 `refreshStatic()` 效果，修复默认内联渲染模式下横向缩放终端导致 UI 异常的问题。

**影响**：提升终端用户体验，特别是对全屏/响应式布局使用者。

---

### 6. 跳过 `@<directory>` 引用的急切递归文件读取
[#29617](https://github.com/google-gemini/gemini-cli/pull/29617) · p1 · 已关闭 · 更新 10-09

修复 CLI 模式和 ACP 模式下将 `@<directory>` 解析后递归急切读取转为惰性解析，避免大目录挂起。

**影响**：大仓库或包含巨型目录时，此修复能显著降低启动延迟。

---

### 7. 同步 workspace 包版本与 lockfile 并 CI 强制执行
[#29700](https://github.com/google-gemini/gemini-cli/pull/29700) · p2 · size/l · 更新 10-09

同步各 workspace `package.json` 依赖版本至 `package-lock.json` 实际值，并扩展 `check-lockfile.js` 防止未来漂移。

**影响**：Nix 等封闭环境构建工具依赖版本一致性，构建链路的确定性提升。

---

### 8. 修复 Ctrl+R 反向搜索中 Unicode 扩展字符高亮偏移
[#29699](https://github.com/google-gemini/gemini-cli/pull/29699) · size/m · 更新 10-09

修复 `useReverseSearchCompletion` 的 UTF-16 索引偏移——`İ`（U+0130）小写展开为 `i\u0307` 后高亮错位。

**影响**：对非英文用户的历史搜索体验是实质改进。

---

### 9. 消除不可信命令标志和复合循环的误报
[#29672](https://github.com/google-gemini/gemini-cli/pull/29672) · area/security · size/l · 已关闭 · 更新 10-09

修复安全警告误报：1) `untrustedContextTracker` 的变量展开和 token 索引过度宽泛；2) `ls -ld`、`grep -rn`、`git status` 等无害 POSIX 导航/检查标志被误标记。

**影响**：该 PR 同时被 cherry-pick 至 preview 线（v0.64.0-preview.1），安全误报会打断用户操作流程，修复提升信任感。

---

### 10. 修复 IDE 集成下 Enter 键"无响应"挂起
[#29476](https://github.com/google-gemini/gemini-cli/pull/29476) · p1 · size/m · 已关闭 · 更新 10-09

修复启用 IDE companion 集成时，终端内按 Enter 确认工具调用（如文件编辑审批）但看似无响应的问题。将用户确认事件发布从 IDE 事件循环解耦。

**影响**：IDE + 终端混合工作流的实质性稳定性修复。

---

## 功能需求趋势

从近 24 小时活跃的 50 个 issue 中可提炼出以下五大方向：

| 方向 | 代表 Issue | 热度信号 |
|------|-----------|---------|
| **子代理可靠性与可观测性** | #22323（误报 GOAL）、#21409（通用代理挂起）、#22598（子代理轨迹可分享）、#21763（bugreport 缺子代理上下文） | 数量最多、p1 占比最高，是当前社区最集中痛点 |
| **AST 感知代码工具链** | #22745（EPIC）、#22746（代码库映射）、#22747（搜索/读取） | 3 个 issue 联动研究，方向明确指向 token 效率与精准度 |
| **沙盒/容器方案演进** | #19873（零依赖沙盒）、#29505（rootless Podman keep-id） | 安全沙盒与模型 bash 原始的融合，兼顾性能与安全 |
| **浏览器代理韧性** | #22267（配置被忽略）、#22232（会话锁恢复）、#21983（Wayland） | p1/p2 混合，Wayland 问题已列 p1 |
| **工具/技能使用自动化** | #21968（不主动用技能/子代理）、#24246（>128 工具 400 错误）、#23571（乱建临时脚本） | 模型工具编排能力 vs 环境保护 |

此外，#29702（原子写入引发 ENAMETOOLONG）为今日新开 issue，揭示近期重构引入的边界问题——文件系统操作层面（临时文件命名策略）值得关注。

---

## 开发者关注点

1. **挂起问题频发**：普通代理挂起（#21409）、Web 搜索无限 Thinking（对应 PR #29608）、IDE 集成下 Enter 键无响应（对应 PR #29476）——"挂起"已成为开发者最强的负面反馈关键词。

2. **子代理结果可信度**：被 MAX_TURNS 中断却判为 GOAL 成功（#22323）、bugreport 不包含子代理上下文（#21763）——用户不仅要求子代理不挂，更要求在失败时

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报 — 2026-10-10

### 今日速览

今天共发布 5 个版本迭代（v1.0.95-3 至 v1.0.96-2），核心修复集中在 `/add-dir` 沙箱授权、权限决策时间线展示与模型 ID 大小写规范化。社区侧，沙箱权限（Gradle/JVM、git 凭据）和会话稳定性（OOM、事件超时、MCP 重连）是开发者反馈最集中的两个方向。值得注意的还有一枚安装脚本漏洞修复 PR（#5093）——此前校验和验证可能被 `--ignore-missing` 绕过而“假成功”。

### 版本发布

**v1.0.96-2**（最新）
- 修复：`/model` 与 `/config` 中的模型 ID 现在大小写不敏感，并保存为规范 ID。

**v1.0.96-1**
- 新增：交互式沙箱设置会建议可能的环境密钥（environment secrets），并支持在保存前添加脱敏主机（masking hosts）。
- 修复：企业策略解析过程中，`/allow-all` 在启动阶段保持可用。

**v1.0.96-0**
- 改进：git 仓库中的交互式会话更快进入输入提示；时间线现在标明权限决策来源（用户、Assisted Permissions、策略或无人值守回退）。
- 修复：`/add-dir` 正确地将目录加入当前会话的沙箱访问白名单（此前不生效）。

**v1.0.95**
- macOS 上优先使用 Microsoft Entra broker 原生认证，浏览器回退兜底。
- `copilot config` 支持沙箱 `injectHosts` 凭据注入键，并为 Bash、Zsh、Fish 提供补全。
- `--context` 现在适用于新会话和恢复的 ACP 会话。

**v1.0.95-3**
- 包含若干修复与变更，详见 GitHub Release 页。

### 社区热点 Issues（Top 10）

**1. Node.js OOM 崩溃 — 31,965 个泄漏的 libuv 句柄** `[OPEN] #4686`
> 作者 @Marcus-Lindbloom 报告，长会话约 37 分钟后崩溃，SEA 打包的 Node.js 忽略 `NODE_OPTIONS`，问题极具破坏性。评论中有多位用户复现。
- 链接: https://github.com/github/copilot-cli/issues/4686

**2. Claude Opus 4.6 上下文窗口被人为截断至 200K** `[OPEN] #3355`
> 模型原生支持 1M 令牌，CLI 却按 200K 上限截断，导致深技术会话频繁触发自动压缩。获得 4 个 👍，是上下文配置呼声最高的需求。
- 链接: https://github.com/github/copilot-cli/issues/3355

**3. ACP `session/list` 分页性能灾难** `[OPEN] #5108`
> 每翻一页都会重新扫描全部会话，数千个会话时需等待数分钟。对 ACP 客户端开发者影响直接，今日刚提交的新 issue。
- 链接: https://github.com/github/copilot-cli/issues/5108

**4. 会话将提示全部排队，MCP 反复“假重连”** `[OPEN] #5091`
> 会话中途所有 prompt 进入队列不执行，MCP 已在连接状态却仍在后台反复重连。重启和恢复均无法解除，与 #5100 高度相关。
- 链接: https://github.com/github/copilot-cli/issues/5091

**5. 会话事件传递永久失败（120s 超时）** `[OPEN] #5100`
> 一次 `tool.execution_partial_result` 超过 120 秒未被宿主确认后，会话进入“永久失败”状态，只能 resume 恢复。长任务用户可能频繁撞上。
- 链接: https://github.com/github/copilot-cli/issues/5100

**6. 沙箱 git 凭据无法与 Copilot 身份解耦** `[OPEN] #5102`
> 沙箱内 git 被强制使用 Copilot/gh 登录身份，无法注入其他凭据（如 fine-grained PAT），且空的 `credential.helper` 覆盖优先级最高，阻断企业用户的自定义认证。
- 链接: https://github.com/github/copilot-cli/issues/5102

**7. BYOK 子代理强制使用会话的 wire API** `[OPEN] #5103`
> `COPILOT_PROVIDER_WIRE_API` 会在会话级生效，子代理模型若来自另一族（如 GPT-5 仅支持 `responses` API）则直接 400。BYOK 多模型混用时明显受限。
- 链接: https://github.com/github/copilot-cli/issues/5103

**8. macOS 沙箱阻断 Gradle 守护进程连接** `[OPEN] #5105`
> 本地网络已允许，但 Gradle client 无法连接已启动的 daemon（localhost 连接被沙箱拦截），导致即便是离线 `help` 任务也无法执行。
- 链接: https://github.com/github/copilot-cli/issues/5105

**9. Atlassian MCP 每次启动 CLI 都要求重新授权** `[OPEN] #2536`
> 已授权的 MCP 服务在关闭重开后丢失凭据。该 issue 已存活半年，持续收到 +3 👍 且至今未关闭，反映 MCP 授权持久化是长期痛点。
- 链接: https://github.com/github/copilot-cli/issues/2536

**10. NixOS 系统 keychain 访问失败** `[OPEN] #3081`
> 尽管已安装 libsecret、GNOME Keyring，CLI 仍报“System keychain unavailable”，触发 3 个 👍，是 Linux 生态的订阅热点。
- 链接: https://github.com/github/copilot-cli/issues/3081

⚠️ 另有关闭更新：#5076（`/add-dir` 沙箱失效）已在 v1.0.96-0 修复。

### 重要 PR 进展

**1. 修复安装脚本校验和验证漏洞** `[OPEN] #5093` @hobostay
> 核心问题：`sha256sum -c --ignore-missing SHA256SUMS.txt` 在缺少匹配文件的条目时仍会报成功，导致下载的 tarball 实际未被验证。该 PR 要求严格匹配下载文件对应的校验条目。**安全意味强，值得尽快合入。**
- 链接: https://github.com/github/copilot-cli/pull/5093

**2. “Create index.html”** `[OPEN] #5106` @lg3707082-cpu
> 内容仅为上传一个 index.html 附件，疑为误操作或垃圾 PR，需维护者关闭。
- 链接: https://github.com/github/copilot-cli/pull/5106

### 功能需求趋势

从全部 43 个活跃 Issue 中可提炼出如下方向：

1. **沙箱权限粒度与兼容性**（约 1/4 议题）——集中在 RW 路径对 JVM/Gradle 不生效、git 凭据隔离、HOME 覆盖误判等。说明沙箱已进入真实开发场景的“深水区”。
2. **上下文窗口配置开放**——Claude Opus 4.6 的 1M 上下文不能通过配置释放，与用户对新模型能力释放的期待有明显落差。
3. **MCP 稳定性与授权持久化**——Atlassian 授权丢失、MCP 重连风暴、`--add-github-mcp-tool` 的只读端点等问题反复出现，表明 MCP 集成需要从“能用”走向“可靠”。
4. **会话生命周期管理**——OOM 崩溃、事件超时永久失败、分页扫描全量会话，指向长会话、深目录结构下的性能与可靠性短板。
5. **Linux/macOS 平台级集成**——NixOS keychain、macOS Gradle 沙箱、Windows 桌面版 git 生成问题，显示各平台底层集成的差异化需求仍在持续暴露。

### 开发者关注点

- **稳定性优先：** 连续出现的 OOM、事件 120s 超时、会话排队不执行，表明交互式长任务的可靠性尚未达标，部分开发者反馈“不可用直到 resume”。
- **沙箱“过于严格”与“漏洞”并存：** 一方面 JVM/Gradle 等真实工具被本地网络规则误伤，另一方面 git 凭据强制使用默认身份导致无法定制，社区对沙箱的“聪明默认值”有更高期望。
- **期望配置透明化：** 上下文窗口上限、wire API 选择对用户不可见且不可覆盖，开发者希望在 BYOK 和模型混用时拥有明确的控制权，而不是“静默降级”。
- **异步化诉求：** 启动时同步加载 MCP/插件拖慢首个 prompt（#5090），配合会话列表的同步全量扫描（#5108），用户希望 CLI 在“大仓库 + 多插件”场景下保持输入响应性。
- **安全验证意识提升：** 安装脚本校验和可能被绕过的问题获得社区快速响应，发布供应链安全是开发者的基本底线，不容失守。

---
*本日报由 AI 工具分析 GitHub 数据自动生成，仅供参考。数据截至 2026-10-10。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-10

## 今日速览

过去 24 小时无新版本发布，社区焦点集中在 v2 稳定性和回归修复上。多个历史 Issue 于今日集中关闭，同时新提交的 PR 主要围绕 CLI 标志恢复、MCP 鉴权状态、Plan 安全确认等 v2 补强工作。值得注意的还有一批文件选择器 / 项目打开相关的 Issue 被关闭，说明该系列问题可能已有阶段性修复。

## 社区热点 Issues

1. **[BUG] “terminated” error — #30221**（10 评论 | 4 👍）  
   OpenCode Go 订阅下所有会话持续以 `UnknownError: terminated` 终止，与用户操作、模型选择无关，而直连 Deepseek / Z.AI 端点正常。该问题影响付费订阅稳定性，今日已关闭。  
   https://github.com/anomalyco/opencode/issues/30221

2. **SDK 无法处理 `question` 工具交互 — #19702**（7 评论 | 2 👍）  
   通过 SDK（非 CLI）开发自定义前端时，无法响应用户确认类 `question` 工具调用，导致基于 OpenCode 构建上层应用的开发者被卡住。今日关闭。  
   https://github.com/anomalyco/opencode/issues/19702

3. **“打开项目”对话框始终显示 “No folders found” — #39434**（5 评论）  
   `GET /file` 请求缺少必需 `path` 查询参数，导致目录选择器永远为空。直接影响 Web / Desktop 端项目打开流程。今日关闭。  
   https://github.com/anomalyco/opencode/issues/39434

4. **[BUG] 免费模型在 `shell` / `read` 权限被 deny 时失败 — #51241**（5 评论 | 1 👍）  
   v2.0.16 下，只要 deny 了 `shell` 或 `read` 任一权限，免费模型（如 `opencode/big-pickle`）请求即报错。权限系统与免费模型策略存在冲突，仍为 OPEN。  
   https://github.com/anomalyco/opencode/issues/51241

5. **[BUG] V1→V2 迁移后会话从 /sessions 消失 — #53709**（4 评论）  
   升级 v2 后，旧会话在 TUI `/sessions` 中消失。根因是 importer 未对 `session.path` 做路径归一化，存储了被剥离的绝对路径。仍 OPEN。  
   https://github.com/anomalyco/opencode/issues/53709

6. **Web 项目选择器在搜索前始终为空 — #37611**（4 评论 | 2 👍）  
   打开 Add Project 时，空 filter 以 `query=` 发送到 `/find/file` 导致空列表，输入路径后才显示目录。今日关闭。  
   https://github.com/anomalyco/opencode/issues/37611

7. **DeepSeek V4 Flash Free 输出中途截断且无警告 — #39582**（4 评论 | 1 👍）  
   免费模型对话频繁在 1-2 行后无声中断，无错误码、无提示，需反复重试。反映免费模型稳定性问题。今日关闭。  
   https://github.com/anomalyco/opencode/issues/39582

8. **[BUG] opencode web 无法打开项目 — #37005**（3 评论 | 3 👍）  
   从配置加载到项目打开全流程报错，是今日关闭的 Issue 中 👍 数最高的一个，说明受影响的 Web 用户较多。  
   https://github.com/anomalyco/opencode/issues/37005

9. **ACP session/new 和 session/prompt 无限挂起 — #41459**（3 评论）  
   MCP server 注册和工具调用均无超时机制，任何传递的 MCP server 阻塞都会导致 ACP 会话永久挂起。今日关闭。  
   https://github.com/anomalyco/opencode/issues/41459

10. **npm 包前端版本不匹配（1.18.15 包内置 1.18.14）— #41280**（3 评论）  
   `opencode-ai@1.18.15` 二进制服务上报 `1.18.15`，但实际 Web 前端为 `1.18.14`，暴露发布流程问题。今日关闭。  
   https://github.com/anomalyco/opencode/issues/41280

## 重要 PR 进展

1. **fix(cli): 恢复 v2 中丢失的 `models --refresh` flag — #54234**  
   v2 CLI 重写时移除了 `--refresh` / `--verbose` 参数，文档仍在且 v1 保留，无服务端端点支持手动刷新。此 PR 恢复该

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-10

## 今日速览

昨日发布 `v0.25.1-preview.1` 预览版，修复了 Agent 远程主机绑定替换时丢失绑定的问题。社区层面，Managed Agent 架构与 Kubernetes 工具运行时的跨平台交付门禁讨论持续高热，MCP 工具注册/刷新类 Issue 和 Core 内容生成管道的 XML 泄漏问题也是开发者关注的焦点。

---

## 版本发布

### v0.25.1-preview.1
- **修复** `fix(agents)`：替换已选远程 Hosts 时不再丢失绑定关系（PR #13430）
- **测试** `test(core)`：关闭 #12693 的 post-merge 审查遗留项

> v0.25.0-nightly.20261009.085a44f336 与上述预览版包含相同变更。

🔗 [查看 Release](https://github.com/QwenLM/qwen-code/releases)

---

## 社区热点 Issues（Top 10）

### 1. Managed Agent 双路径架构提案（#12380）
**评论 51 | 进行中 | P2**
Define a staged Managed Agent architecture：保留现有 TypeScript agent loop，模型推理与工具环境供给解耦，赋予 Session 持久所有权与可恢复的工具执行。这是当前社区最受关注的设计提案，已拆解出多个 Stage 跟踪子议题。

🔗 https://github.com/QwenLM/qwen-code/issues/12380

### 2. Kubernetes 工具运行时进度与跨平台交付门禁（#13395）
**评论 19 | 进行中 | P2**
跟踪 Draft PR #13526 的交付状态：私有 CSI 读/写/编辑能力已具备，但跨平台交付门禁仍在推进中。

🔗 https://github.com/QwenLM/qwen-code/issues/13395

### 3. Managed Agent Stage D 后续：持久生命周期、Turns 与 Actions（#12867）
**评论 19 | 已关闭 | P2**
覆盖 Stage D 剩余部分：durable lifecycle、Turns、Actions、`java_durable` admission profile 与 AgentDefinition。D1–D3（#12793）已交付 in-repo 契约。

🔗 https://github.com/QwenLM/qwen-code/issues/12867

### 4. ACP：区分用户取消与恢复后的意外中断（#6710）
**评论 15 | 进行中 | P1**
2026-10-07 在最新提交上仍可复现。用户主动取消与基础设施意外中断在会话恢复后无法区分，影响取消语义的正确性。

🔗 https://github.com/QwenLM/qwen-code/issues/6710

### 5. 非思考脚手架标签泄漏到用户可见输出（#10797）
**评论 10 | 审查中 | P2**
`<file_path>` 等 tool-result 块、system-reminder 标签在流式输出中泄漏为可见文本。仍可在最新构建中复现，欢迎 PR。

🔗 https://github.com/QwenLM/qwen-code/issues/10797

### 6. CLI 持续在输出末尾追加“”（#2596）
**评论 9 | 待重新测试 | P2**
用户报告 Qwen CLI 在回答末尾经常追加一个空响应标记。最新验证未发现原始路径的关闭证据，且当前 CLI 在发起请求前拒绝了旧的 `qwen-oauth` 入口（exit 1，零请求）。

🔗 https://github.com/QwenLM/qwen-code/issues/2596

### 7. MCP：支持 notifications/tools/list_changed 动态刷新工具列表（#13632）
**评论 8 | 新需求 | P2**
建议在交互会话中处理 MCP 服务器的 `tools/list_changed` 通知，自动刷新该服务器的工具注册表。

🔗 https://github.com/QwenLM/qwen-code/issues/13632

### 8. PR #9466 延期审查发现：rewind 映射需锚定稳定的 prompt identity（#11408）
**评论 8 | 公开**
#9466 已合并，但 R53-2 机制问题仍存在：简历 prompt 编号未考虑保留的文件快照身份。修复方案已在 #13729 中就绪。

🔗 https://github.com/QwenLM/qwen-code/issues/11408

### 9. Managed Agent Stage G：权威 Session 历史与写者 fencing（#12952）
**评论 7 | 进行中 | P2**
定义 Stage G 的切片与退出检查：外部化权威 Session 历史/检查点，在移除 owner affinity 前证明写者 fencing 与接管能力。

🔗 https://github.com/QwenLM/qwen-code/issues/12952

### 10. 孤儿工具调用闭合标签泄漏为纯文本（#10700）
**评论 6 | 审查中 | P2**
XML 恢复仅匹配成对的 invoke 块，孤立的 `</parameter>` 等闭合标签会以纯文本形式泄漏到回答中。

🔗 https://github.com/QwenLM/qwen-code/issues/10700

---

## 重要 PR 进展（Top 10）

### 1. fix(acp-bridge): 展示声明的 Channel 提交内容（#13748）
Channel 来源的会话使用非空原始文本声明作为展示投影，挂起文本、实时用户回显与持久记录保持原始投影。

🔗 https://github.com/QwenLM/qwen-code/pull/13748

### 2. test(cli): 容器模式测试绑定临时回环端口（#13778）
不再硬编码容器端口 43190，通过 test-local helper 监听 `listen` 调用，保留参数可观测性。

🔗 https://github.com/QwenLM/qwen-code/pull/13778

### 3. test(managed-agent): 固定历史响应字节上限（#13810）
新增两个 HTTP 回归用例：8 MiB 历史响应完整返回，8 MiB + 1 字节拒绝并返回 413。

🔗 https://github.com/QwenLM/qwen-code/pull/13810

### 4. fix(cli): 匹配 ink 的 OpenTUI 弹窗几何与补全截断（#12559）
所有弹窗使用与 ink 相同的固定裁剪区域；补全下拉列表超高时裁剪而非将 composer 推出屏幕。

🔗 https://github.com/QwenLM/qwen-code/pull/12559

### 5. fix(managed-agent): 关闭 #12692 的 8 个 Critical R2 审查发现（#13325）
修复 InnoDB 锁序反转、session-list 键集分页遍历可变 `updated_` 字段等问题，每个修复都有单元测试见证。

🔗 https://github.com/QwenLM/qwen-code/pull/13325

### 6. fix(cli): 关闭 #13083 的 post-merge 接管发现（#13188）
落地 Hosted Turn 接管/G1 failover 的 3 个 Critical 发现及多个 follow-up review 问题。

🔗 https://github.com/QwenLM/qwen-code/pull/13188

### 7. fix(managed-agent): 重启可恢复的前台子进程等待（#13769）
修复 #13708：Hosted Workspace Turn 的前台子 agent 等待在此之前不写任何持久等待证据，进程死亡后无法恢复。

🔗 https://github.com/QwenLM/qwen-code/pull/13769

### 8. feat(managed-agent): 收集已退役的流捕获工具输出（#13554）
实现 #13534 的 P1：将后台 Shell 流捕获（#13265 引入）与前台 Shell 残留输出纳入 O4 Session-rooted 留存生命周期。

🔗 https://github.com/QwenLM/qwen-code/pull/13554

### 9. feat(core): 工具结果大小从生产者到注入的全链路统计（#13652）
工具结果在输出缩减边界间携带 raw/processed/final 大小估计；注入仅在最终预算后记录一次，重试与回放不重复计数。已超出 1500 行 scope fuse，round-3 review 建议转至 #13809 跟踪。

🔗 https://github.com/QwenLM/qwen-code/pull/13652

### 10. fix(desktop): 保持 AppImage 中捆绑运行时完整性（#13695）
post-link RPATH 写入跳过运行时文件并记录日志，其他 `patchelf` 操作继续使用真实二进制，打包前复用运行时完整性门禁。

🔗 https://github.com/QwenLM/qwen-code/pull/13695

---

## 功能需求趋势

从近日 Issue 中可以提炼出以下社区重点关注方向：

| 方向 | 代表 Issue | 热度 |
|------|-----------|------|
| **Managed Agent 架构**（持久会话、多阶段交付、多 agent 归属） | #12380, #12867, #12952, #13785 | 🔥🔥🔥 极高 |
| **MCP 生态完善**（HTTP 服务器工具注册、动态刷新、状态显示） | #13796, #13632 | 🔥🔥🔥 高 |
| **会话恢复与取消语义**（用户取消 vs 意外中断、恢复后 wedge、分支恢复） | #6710, #13800, #13782 | 🔥🔥 中高 |
| **内容生成管道质量**（XML 标签泄漏、脚手架文本外泄、流式解析性能） | #10797, #10700, #13787 | 🔥🔥 中高 |
| **Kubernetes 运行时与跨平台交付** | #13395 | 🔥🔥 中高 |
| **上下文与 token 管理**（动态截断、服务端 ceiling、快照去重） | #2566, #13432, #13721 | 🔥 中 |
| **CI/验证基础设施**（verify-pr 规则、SDK 契约版本门禁、超时上限） | #13732, #13804, #13472 | 🔥 中 |

---

## 开发者关注点

1. **会话恢复的可靠性**是目前最集中的痛点：`recovery_blocked` 的 Session 会卡住同 daemon 上其他 Session 的后续轮次（#13800）；`child_run` 卡在 `dispatch_started` 永远不会 settle（#13801）；Web Shell 从磁盘恢复后 Branch 操作消失（#13782）。

2. **MCP HTTP 服务器的工具注册存在实际可用性问题**：`qwen mcp list` 显示 Connected 但工具在整个会话中未注册（#13796），HTTP 传输的 MCP 服务器是高频故障来源。

3. **内容生成的“脚手架泄漏”** 反复出现：非思考标签、孤儿闭合标签在流式输出中污染用户可见内容（#10797、#10700），且 XML 恢复在大响应上存在性能退化（#13787）。

4. **macOS 生态兼容** 出现新问题：使用内置 Foundation Models 作为 fast model 时报 “unsupported generation guide” 错误（#13807），影响 macOS 用户的开箱体验。

5. **代码重复与维护风险**：社区开始关注内部实现质量问题，如 `file_history_snapshot` payload 读取在五个位置重复、跨两种不兼容的 malformed-payload 策略（#13794/#13799），SDK 契约版本可倒退且 CI 无检查（#13804）。

---

> 数据来源：github.com/QwenLM/qwen-code | 统计周期：2026-10-09 ~ 2026-10-10

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*