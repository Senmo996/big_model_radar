# AI CLI 工具社区动态日报 2026-09-08

> 生成时间: 2026-09-08 01:55 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-08）

## 1. 生态全景

当前 AI CLI 工具已从"单点代码生成助手"演变为**覆盖编码、调试、远程协作、模型管理、MCP 生态的综合性开发基础设施**。社区热度表明，**稳定性与可控性已取代功能堆叠成为第一诉求**——会话卡死、静默数据丢失、MCP 连接超时等可靠性问题在各工具中集中爆发。同时，**插件化、Web/IDE 集成、跨设备协作、本地化安全**成为新的差异化竞争焦点。各工具在模型接入上高度同质化（GPT、Claude、Qwen、GLM 等），真正的护城河正转向**工具链深度、生态互操作性和数据治理能力**。

## 2. 各工具活跃度对比

今日活跃度数据统计（基于日报精选条目，非全量）：

| 工具 | 版本发布 | 热点 Issues | 重要 PR | 社区热度信号 | 核心争议点 |
|------|---------|------------|---------|-------------|-----------|
| **Claude Code** | 无 | 10 条（精选） | 未披露 | 单 Issue 136 评论 / 82 👍 | 插件机制深度、会话数据静默删除、桌面端回归 |
| **OpenAI Codex** | 1 个 alpha | 10 条（精选） | 3 条 | 单 Issue 59 评论 / 37 👍 | 远程控制恢复、Windows 截图失败、模型容量异常 |
| **Gemini CLI** | 1 个 nightly | 2 条披露（目标 10） | 未披露（安全 PR 密集） | Agent 可靠性争议 | MAX_TURNS 误报成功、Shell 悬挂 |
| **GitHub Copilot CLI** | 无（讨论 1.0.83/1.1.15） | 10 条（精选） | 4 条 | 单日新增 10+ Issue | MCP 超时数量级回退、会话生命周期、—yolo 误封禁 |
| **Kimi Code CLI** | 无 | 4 条（更新） | 2 条 | 相对平稳 | Plan Mode 缺失、IME 输入重复、Agent 工具循环 |
| **OpenCode** | 无 | 10 条（精选） | 10 条 | 单 Issue 148 👍（VS Code 扩展） | 会话卡死、流中断、IDE 集成缺失 |
| **Qwen Code** | 3 个（preview+nightly+driver） | 10 条（精选） | 10 条 | 3 个 Release 同日发布 | llama-server 兼容性回归、conhost 泄漏 |

**说明**：Gemini CLI、Claude Code 的 PR 数据未在摘要中披露；Kimi 数据为完整更新量（社区体量较小）。Issues 均为精选 Top 10，实际量级高于此。

## 3. 共同关注的功能方向

### 3.1 MCP 生态稳定性与互操作（全工具共鸣）
- **GitHub Copilot CLI**：OAuth 静默失败、取消请求未转发、连接超时 16s→1s 骤降、Azure 调用 0.2s→180s 恶化——系统性回归。
- **Claude Code**：Cowork 插件安装 404，阻碍新手接入。
- **OpenCode**：支持按 MCP 服务器配置信任（指纹 + caFile）。
- **Qwen Code**：取消 stdio 工具调用杀死整个 MCP 服务器且无法恢复。
- **Kimi Code**：用户希望无缝迁移其他 CLI 的 MCP 配置。

**诉求核心**：MCP 已成为事实标准，但其连接可靠性、认证体验、错误可观测性、进程隔离均远未达到生产级要求。

### 3.2 会话可靠性与数据安全
- **Claude Code**：两起 issue 指向 30 天静默删除会话记录，无 opt-in、无警告、无恢复。
- **GitHub Copilot CLI**：记忆跨仓库泄漏（#3945）、会话永久卡死、恢复时连接 ID 失效。
- **OpenCode**：会话跨重启永久卡死、SSE 流中断导致子代理悬挂。
- **Qwen Code**：serve 模式后台 shell 输出被静默丢弃，最终卡死。
- **Gemini CLI**：子代理 MAX_TURNS 被误报为 GOAL 成功，掩盖真实中断。

**诉求核心**：开发者对"无声失败"零容忍，要求数据保留显式化、会话可恢复、执行真相可验证。

### 3.3 Windows 平台体验短板
- **Claude Code**：窗口强制置顶、MSIX 包因 Code Integrity 自毁。
- **OpenAI Codex**：Computer Use 截图失败（Win10 22H2）、无头启动 node_repl.exe 重定位失败。
- **GitHub Copilot CLI**：无法创建新会话、语音服务器死锁。
- **Qwen Code**：conhost.exe 泄漏（12 小时 347 个进程 / 2.8GB 内存）。
- **Kimi Code**：IME 输入字符重复。
- **OpenCode**：忽略 `NODE_EXTRA_CA_CERTS`，企业代理环境连不上内部端点。

**诉求核心**：Windows 不再是"二等公民"，但各工具在 Windows 上的稳定性、进程管理、输入体验普遍欠账。

### 3.4 Agent 执行控制权与可观测性
- **Kimi Code**：plan mode 需求（👍7），用户抱怨 Agent"抢跑"；Agent 陷入 Read 工具循环无法发出 Edit。
- **Gemini CLI**：MAX_TURNS 中断被掩盖，执行终止原因失真。
- **OpenCode**：Auto 模式制造重复虚假权限通知；`commentary` 通道未实现导致回合中断。
- **Copilot**：会话进入"非 idle/running"第三状态，排队消息无响应。

**诉求核心**：开发者希望获得多级控制（计划/执行分离）、清晰的终止原因、以及无噪音的执行过程反馈。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 深度插件化 + 桌面/CLI 一体化 | 资深开发者、插件生态爱好者 | 基于 Function Hooks 的 Express/Koa 风格中间件模型，追求行为级可组合性 |
| **OpenAI Codex** | 模型先进性 + 跨设备远程 + 语音 | Pro/企业用户，多设备工作者 | 深度绑定 OpenAI 模型矩阵，通过 WebRTC、Secure Enclave 等原生能力扩展交互边界 |
| **Gemini CLI** | Agent 可靠性与安全加固 | 对执行信任度敏感的开发者 | nightly 快速迭代，优先修复 Agent 状态失真与沙箱安全 |
| **GitHub Copilot CLI** | GitHub 生态集成 + MCP 连接器 | GitHub 重度用户、企业托管环境 | 依托 GitHub 基础设施，强调策略管理（—yolo、托管策略）与多会话管理 |
| **Kimi Code CLI** | 轻量 + 规划模式 + 生态互操作 | 追求低门槛迁移的开发者 | 通过兼容主流 MCP 配置降低切换成本，探索手机配对（spectator+veto） |
| **OpenCode** | 多供应商聚合 + IDE 集成 | 多模型用户、企业网络环境 | 以 provider 抽象层支持 Z.AI、Moonshot、Snowflake 等，补全 VS Code 扩展与网络适配 |
| **Qwen Code** | Web Shell 可视化 + 本地推理 + TUI 现代化 | 国内开发者、本地部署用户 | 以 Web 预览、工作流可视化增强 daemon 能力，推进 OpenTUI 渲染迁移，兼容 llama-server |

**差异本质**：Claude 走"可编程 Agent"路线，OpenAI 走"多设备语音 + 模型前沿"路线，Copilot 走"GitHub 生态深水区"，而 OpenCode/Qwen/Kimi 则在"多模型兼容 + 本土化体验"上竞争。

## 5. 社区热度与成熟度

- **成熟期（社区反馈深、但回归阵痛）**：**Claude Code** 与 **GitHub Copilot CLI**。两者社区讨论已触及架构演进（Claude 的 Function Hooks 提案 136 条评论）、数据治理（静默删除、记忆泄漏）和发布质量（Copilot 的 16s→1s 超时回退）等深水区问题，用户基数大、吐槽也最具体。成熟度虽高，但**版本回归正明显侵蚀信任**。

- **快速迭代期（发布频繁、功能扩展快）**：**Qwen Code**（单日 3 个 Release）、**OpenAI Codex**（alpha 版本 + 新模型支持）、**Gemini CLI**（nightly 日更）。三者都在积极铺展新能力（Web Shell、语音、安全加固），但稳定性问题同样密集，处于"边建边补"

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

数据截止：2026-09-08 | 数据来源：github.com/anthropics/skills

---

## 一、热门 Skills 排行（TOP 8）

### 1. skill-creator 评测链路修复（PR #1298）
- **功能**：修复 `run_eval.py` 在所有场景下恒定报告 `recall=0%` 的严重缺陷，涉及评测产物安装方式、Windows 流读取、触发检测及并行 worker 等多个根因。
- **社区关注点**：该 PR 直指 skill-creator 优化循环"在噪声上做优化"的致命问题，关联 issue #556（12+ 独立复现）。skill-creator 是官方元技能，其评测可靠性直接影响所有下游 Skill 的质量迭代，因此该修复的优先级极高。
- **状态**：Open，自 2026-06-10 提交后持续更新。
- 链接：https://github.com/anthropics/skills/pull/1298

### 2. document-typography 排版质量技能（PR #514）
- **功能**：新增文档排版质量检查技能，针对 AI 生成文档的常见排版问题，包括孤字换行（1-6 个单词溢出到下一行）、孤立段落标题（出现在页底）以及编号错位。
- **社区关注点**：讨论焦点在于这是否应作为通用技能内置到所有文档生成流程中，而非由用户单独启用。评论者普遍认同该问题是"每个 Claude 生成的文档都会遇到"的高频痛点。
- **状态**：Open。
- 链接：https://github.com/anthropics/skills/pull/514

### 3. scnet-hpc 高性能计算集群运维技能（PR #1615）
- **功能**：新增 SCNet HPC 集群运维技能，支持基于 profile 的 SSH 连接与 Slurm 工作流，覆盖分区管理、内存与模块配置、加速器选型、作业生成、集群发现等场景。
- **社区关注点**：这是社区对垂直领域（科研计算）技能的典型需求代表。讨论集中在 HPC 场景下 Skill 的安全边界——直接操作 Slurm 作业是否应限制权限，以及多集群 profile 的可扩展性。
- **状态**：Open。
- 链接：https://github.com/anthropics/skills/pull/1615

### 4. pdf 技能大小写引用修复（PR #538）
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不一致的引用（`REFERENCE.md` → `reference.md`、`FORMS.md` → `forms.md`），这些错误在大小写敏感的文件系统上会导致技能加载失败。
- **社区关注点**：表面是琐碎修复，实则是跨平台兼容性问题的集中体现（macOS/Linux 默认大小写敏感）。社区讨论指出官方仓库中可能存在更多类似问题，呼吁建立 CI 检查机制。
- **状态**：Open（3 月提交，4 月仍有更新）。
- 链接：https://github.com/anthropics/skills/pull/538

### 5. ODT 文档处理技能（PR #486）
- **功能**：新增 OpenDocument 格式（ODT/ODS/ODF）的创建、填充、读取与转换为 HTML 的技能，并支持 LibreOffice 文档操作。
- **社区关注点**：讨论围绕 OpenDocument 生态的覆盖面——是否需要同时支持 ODS 电子表格和 ODP 演示文稿，以及 LibreOffice 模板填充的鲁棒性。该技能填补了官方技能库在开源文档格式方面的空白。
- **状态**：Open。
- 链接：https://github.com/anthropics/skills/pull/486

### 6. frontend-design 技能可用性改进（PR #210）
- **功能**：全面修订 frontend-design 技能，目标是让每条指令都能在单次对话中可执行，并确保指导足够具体以真正影响 Claude 的行为而非泛泛而谈。
- **社区关注点**：这是元层面的讨论——Skill 的"可操作性"（actionability）设计原则。社区在评审中提炼出 Skill 编写的通用标准：每一条指令都应能被模型在单轮内执行，避免描述性语言。
- **状态**：Open（1 月提交，3 月更新）。
- 链接：https://github.com/anthropics/skills/pull/210

### 7. Hivemind 零成本多智能体编排（PR #1628）
- **功能**：新增 Hivemind 技能，让 Claude Code 将机械化工作委托给运行在免费模型上的无头 opencode worker，同时保持 Claude Code 作为唯一的规划者、审查者和合并者。
- **社区关注点**：围绕"昂贵的模型上下文是稀缺资源而非智能"这一核心观点展开。讨论涉及任务分拆策略、worker 结果校验机制，以及免费模型输出质量对最终结果的影响边界。
- **状态**：Open。
- 链接：https://github.com/anthropics/skills/pull/1628

### 8. skill-quality-analyzer 与 skill-security-analyzer（PR #83）
- **功能**：向市场新增两个元技能——skill-quality-analyzer（从结构文档、示例质量、可测试性等五个维度评估 Skill 质量）和 skill-security-analyzer（安全分析）。
- **社区关注点**：与 #492 安全信任边界问题形成呼应。社区认为安全分析器应成为社区技能合入官方仓库前的强制检查环节，而非可选工具。
- **状态**：Open（2025-11 提交，2026-01 更新，历时较长）。
- 链接：https://github.com/anthropics/skills/pull/83

---

## 二、社区需求趋势（来自 Issues）

### 1. 安全与信任边界（Issue #492，43 条评论）
社区技能在 `anthropic/` 命名空间下分发，被用户误认为官方技能，从而可能被授予过高权限。这是当前社区最强烈的安全关切，直接推动了 skill-security-analyzer 等安全工具的出现。
链接：https://github.com/anthropics/skills/issues/492

### 2. 组织级技能共享（Issue #228，16 条评论，👍 8）
用户期望在组织内直接共享技能，而非手动下载 .skill 文件再通过 Slack/Teams 分发。对共享技能库或直接分享链接的需求明确。
链接：https://github.com/anthropics/skills/issues/228

### 3. skill-creator 可靠性（Issue #556，12 条评论，👍 7）
`run_eval.py` 的 0% 触发率问题有 10+ 独立复现，是当前阻碍技能生态发展的最大工程障碍。社区对官方修复的呼声极高。
链接：https://github.com/anthropics/skills/issues/556

### 4. 重复技能去重（Issue #189，6 条评论，👍 9）
`document-skills` 与 `example-skills` 插件包含相同技能，安装后造成上下文窗口重复占用。呼声最高的生态治理类 issue。
链接：https://github.com/anthropics/skills/issues/189

### 5. 技能作为 MCP 暴露（Issue #16，4 条评论）
社区提出将 Skill 封装为 MCP 协议，统一 AI 软件的 API 信号。这一方向若落地，将重塑技能的分发与调用方式。
链接：https://github.com/anthropics/skills/issues/16

### 6. 轻量级技能设计（Issue #202，8 条评论）
社区批评 skill-creator 本身冗长、教学式的风格，要求技能应面向执行而非面向阅读。这代表了社区对"精确、可执行、低 token 开销"技能设计范式的追求。
链接：https://github.com/anthropics/skills/issues/202

### 7. 上下文窗口效率（Issue #1487，4 条评论）
`claude-api` 技能单次调用注入约 156k tokens，直接耗尽上下文窗口。说明社区开始关注技能自身的资源开销，要求技能按需加载而非全量注入。
链接：https://github.com/anthropics/skills/issues/1487

### 8. 治理与安全模式（Issue #412，6 条评论）
社区提议新增 agent-governance 技能，涵盖策略执行、威胁检测、信任评分和审计追踪——与 #492 的安全关切一脉相承。
链接：https://github.com/anthropics/skills/issues/412

---

## 三、高潜力待合并 Skills（近期可能落地）

| Skill | PR | 核心价值 | 落地概率判断 |
|---|---|---|---|
| **skill-creator 评测修复** | [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 0% recall 致命缺陷，恢复 skill-creator 优化循环有效性，同时覆盖 Windows 兼容 | **高**——官方核心工具的阻塞级 bug，且有 #556 及 10+ 复现支撑 |
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | 解决 AI 文档生成的普遍排版痛点 | **高**——痛点覆盖所有文档生成场景，评审活跃 |
| **ODT 技能** | [#486](https://github.com/anthropics/skills/pull/486) | 填补开源文档格式空白，兼容 LibreOffice 生态 | 中高——功能完整但覆盖面需讨论 |
| **scnet-hpc** | [#1615](https://github.com/anthropics/skills/pull/1615) | 专业 HPC 集群运维场景 | 中——垂直场景，受众有限但价值明确 |
| **Hivemind** | [#1628](https://github.com/anthropics/skills/pull/1628) | 零成本多智能体编排 | 中——方向新颖但依赖外部 opencode 项目 |
| **testing-patterns** | [#723](https://github.com/anthropics/skills/pull/723) | 覆盖完整测试栈的通用技能 | 中——范围过大，可能被拆分评审 |
| **自审计技能 self-audit** | [#1367](https://github.com/anthropics/skills/pull/1367) | 机械验证 + 四维推理审计 | 中——与现有 skill-creator 能力有重叠 |
| **mcp-builder 模型更新** | [#1724](https://github.com/anthropics/skills/pull/1724) | 将默认评估模型升级至 claude-sonnet-5 | **高**——一行级改动，兼容性风险极低 |

---

## 四、Skills 生态洞察

**当前社区最集中的诉求是开发工具链（skill-creator）的可靠性、技能分发的安全信任边界、以及技能设计的精准可执行性**——即：让 Skill 本身像产品一样经得起评测、有安全边界、且不浪费每一个 token。

---

# Claude Code 社区动态日报 · 2026-09-08

## 今日速览

- **Function Hooks 提案引爆社区**：以 136 条评论、82 个 👍 成为近期最具分量的 enhancement，被看作插件系统从“表面配置”走向“深度行为修改”的关键一跃。
- **会话数据静默丢失问题持续发酵**：#59248、#62476 两起 issue 均指向“无警告、无 opt-in、无恢复”的会话记录清理，数据保留策略成为当前用户最担忧的痛点。
- **桌面端回归集中爆发**：Windows 置顶窗口、macOS SendMessage 被拒、Cowork 插件 404 等多条高热度 issue 表明，桌面端体验和 Agent 互操作性仍需重点打磨。

## 社区热点 Issues（精选 10 条）

**1. Function Hooks —— 让插件强大 10 倍** [#91870](https://github.com/anthropics/claude-code/issues/91870)  
作者提出通过参数化 `$` 对象进行副作用追踪，并采用 Express/Koa 风格的注册顺序 `next` 续延模型，使插件可以安全地深度修改 Claude Code 的行为。136 条评论的高热度反映出社区对现有插件 API 上限的不满，以及对“可组合、可安全叠加”的插件机制的强烈期待。

**2. 静默保留清理删除会话记录** [#59248](https://github.com/anthropics/claude-code/issues/59248)  
用户在 Cursor 扩展中发现自己**所有**历史会话记录被无声清空，无警告、无恢复途径。42 条评论、32 个 👍，数据丢失是最能引发共鸣的严重问题，社区普遍要求将清理行为改为显式 opt-in。

**3. MEMORY.md 压缩提醒阈值不可配置** [#91188](https://github.com/anthropics/claude-code/issues/91188)  
Auto-memory 在文件接近 200 行 / 25KB 时硬编码触发压缩提醒，用户希望该阈值可配置或可单独静默。35 条评论，是“内存管理可配置化”方向上呼声最高的需求。

**4. 30 天默认静默删除会话记录** [#62476](https://github.com/anthropics/claude-code/issues/62476)  
与 #59248 同源：默认 30 天删除会话记录且无提示。25 条评论、24 个 👍，两条 issue 合计获得近 70 个 👍，足见用户对“无声数据丢失”的敏感度。

**5. Cowork macOS 插件安装 404** [#26951](https://github.com/anthropics/claude-code/issues/26951)  
插件安装指向 `plugins.claude.ai` 时出现 HTTP 404 / DNS 不解析，导致 macOS Cowork 用户无法安装插件。22 条评论、16 个 👍，直接影响插件生态的新用户上手体验。

**6. 桌面版自动拒绝 CLI 原生 SendMessage** [#92016](https://github.com/anthropics/claude-code/issues/92016)  
macOS 桌面版 1.46388.1 在 Code 标签中自动拒绝 CLI 的 SendMessage 工具，导致子代理恢复（subagent resumption）被破坏。19 条评论，属于 Agent 互操作性的回归问题，社区担心这会切断 CLI 与桌面端的协作链路。

**7. Windows 窗口强制置顶且无法关闭** [#89467](https://github.com/anthropics/claude-code/issues/89467)  
桌面应用窗口始终悬浮在所有窗口之上，无设置、无快捷键可关闭。19 条评论、28 个 👍，是 Windows 桌面端体验最集中的吐槽点，对多窗口开发者极不友好。

**8. Windows MSIX 包因 Code Integrity 拦截而“自毁”** [#88323](https://github.com/anthropics/claude-code/issues/88323)  
`vk_swiftshader.dll` 被 Code Integrity 拦截后，整个 MSIX 包被标记为 “Modified”，应用无法启动。14 条评论（已关闭），暴露了 MSIX 签名/分发链路的脆弱性。

**9. Windows 每次子进程操作闪现终端窗口** [#66540](https://github.com/anthropics/claude-code/issues/66540)  
MCP 启动

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 2026-09-08

## 今日速览

远程控制（Remote Control）与跨设备会话可靠性成为今日社区最大焦点，其中 macOS 端回归问题（#37403）以 59 条评论持续发酵。与此同时，GPT-5.5/5.6/6 系列模型容量故障引发大范围吐槽，多个 Issue 均指向"所选模型已满"错误。开发侧，TUI 迎来 WebRTC 语音对话能力，macOS 本地 Secure Enclave 用户验证也已落地。

## 版本发布

**rust-v0.154.0-alpha.6**（0.154.0-alpha.6）

发布说明仅包含版本号，无详细变更日志。属于常规 alpha 迭代版本。

https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6

## 社区热点 Issues

### 1. macOS 桌面端无法恢复远程控制 / CLI 线程 — 本周最热
[#37403](https://github.com/openai/codex/issues/37403) · 59 评论 · 37 👍

macOS 更新后，用户无法通过 ChatGPT 移动端远程控制恢复 Codex CLI 线程，报错 `already has an active writer`。该问题自 8 月 7 日反馈以来持续近一个月仍未解决，影响夜间远程开发和日间无缝切换的核心工作流，是目前社区关注度最高的 Issue。

### 2. Windows Computer Use 截图在 Win10 22H2 上失败
[#25178](https://github.com/openai/codex/issues/25178) · 48 评论 · 22 👍

`get_window_state` 请求截图时调用 `SetIsBorderRequired` 失败，报错 `0x80004002`。尽管窗口激活、辅助功能文本读取、键盘输入均正常，但截图这一关键能力在 Windows 10 上不可用，严重阻塞 Computer Use 的视觉闭环。

### 3. Windows 浮动宠物（Pets）点击穿透且无法拖拽
[#41513](https://github.com/openai/codex/issues/41513) · 29 评论 · 13 👍

内置宠物 Codey 和自定义宠物在 Windows 上均出现点击穿透现象，且无法拖拽。此问题在 26.825.4187.0 和 26.825.5331.0 两个版本上均可复现。

### 4. 多款新模型集体容量不足
[#43398](https://github.com/openai/codex/issues/43398) · 15 评论 · 5 👍

Pro 20x 用户反馈 GPT-5.5、GPT-5.6-Sol、GPT-6-Astra 等全线模型提示容量已满，仅 5.4-mini 可用。同日另有 #43337、#43368 等相似 Issue，指向账户级容量分配异常问题。

### 5. macOS 上 Chrome 标签页可被声明，但实际操作全被策略拦截
[#39280](https://github.com/openai/codex/issues/39280) · 20 评论 · 5 👍

Chrome 扩展能正确枚举多 profile、列出打开的标签页并声明标签，但任何真实页面交互都在到达 Chrome 前被判定失败：`Browser Use could not complete this action`。同类型问题在 Windows 端也有报告（#41334、#42466），管理员策略误伤是共同疑因。

### 6. Windows 无头启动故障：node_repl.exe 重定位失败
[#41540](https://github.com/openai/codex/issues/41540) · 18 评论 · 1 👍

MSIX 包版本 26.825.5331.0 启动时因 `node_repl.exe` relocation 失败（`0x80071770`）导致无头启动，已在两个版本上复现。

### 7. macOS 删除的 ChatGPT 对话残留侧边栏无法移除
[#39897](https://github.com/openai/codex/issues/39897) · 18 评论 · 4 👍

ChatGPT Desktop 26.818.31338 中，已删除的对话仍保留在侧边栏且无法手动移除。会话实际已被删除，但 UI 层状态未同步。

### 8. GPT-5.6 Sol 安全审查误报：`protectionType=cyber`
[#43321](https://github.com/openai/codex/issues/43321) · 16 评论 · 0 👍

macOS 上 GPT-5.6 Sol 普通对话被安全系统标记为 `protectionType=cyber`，同时 renderer 的 `fetch` 仍保持 native 调用。用户认为这是安全审查的可观测性缺陷，而非绕过安全机制的请求。

### 9. Windows 远程控制注册永远无法完成
[#32164](https://github.com/openai/codex/issues/32164) · 15 评论 · 4 👍

Windows 11 上 Remote Control enrollment 流程卡死，桌面端无法完成注册，导致 Android/iOS 无法连接。该问题已持续两个月仍未解决。

### 10. 配额充足但账户级容量报错
[#43337](https://github.com/openai/codex/issues/43337) · 13 评论 · 0 👍

ChatGPT Pro 20x 用户确认周配额完全充足，但 `gpt-6-astra` 和 `gpt-5.6-luna` 在 low reasoning 下仍报容量错误。与 #43398 互相印证，指向系统级容量分配匪夷所思的 bug。

## 重要 PR 进展

### 1. macOS 用户验证支持 Secure Enclave 签名
[#43624](https://github.com/openai/codex/pull/43624) · CLOSED

实现基于生物识别保护凭证的原生 macOS 用户验证，补齐此前的 unsupported provider 问题。涉及 credential 状态管理、创建、复用、删除和 challenge 签名。对依赖本地用户验证的安全敏感型工作流意义重大。

### 2. TUI 支持实时 WebRTC 语音对话
[#43581](https://github.com/openai/codex/pull/43581) · CLOSED

新增 feature-gated `/voice`、`/voice mute`、`/voice stop` 命令，支持本地 WebRTC 音频和 app-server 信令，并实时显示转录文本、对话状态、麦克风和扬声器电平。语音交互能力从桌面端下沉至 TUI，值得关注。

### 3. 连接的服务版本过旧

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-08

## 今日速览
- **夜间版更新**：v0.60.0-nightly.20260908.g85aca163f 于今日发布。
- **Agent 可靠性成焦点**：社区围绕「子代理 MAX_TURNS 被误报为 GOAL 成功」「Shell 命令执行后悬挂在 Waiting input」等核心问题展开激烈讨论（#22323、#25166）。
- **安全修复密集推进**：多个高优安全 PR 引发关注，包括 GIT_* 环境变量剥离（#29008）与沙箱文件系统加固（#29214）。

## 版本发布
### v0.60.0-nightly.20260908.g85aca163f
- 发布全新 nightly 版本。
- [Release 详情](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260908.g85aca163f) | [完整 Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260907.g85aca163f...v0.60.0-nightly.20260908.g85aca163f)

---

## 社区热点 Issues（Top 10）
### 1. 子代理 MAX_TURNS 被误报为 GOAL 成功，中断被掩盖
> **Issue #22323** | P1 · area/agent · bug

`codebase_investigator` 子代理在因 MAX_TURNS 中断的情况下仍返回 `Termination Reason: "GOAL"` 与 `status: success`，掩盖了真实的执行中断。这直接影响开发者对 Agent 执行过程的信任度。
- 评论数：13 条（24 小时内最多讨论）
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. AST-aware 文件读取 / 搜索 / 代码库映射影响评估
> **Issue #22745** | P2 · area/agent · feature epic

跟踪 AST 感知工具链的潜在价值：更精确地读取方法边界、减少无效读取带来的 token 浪费，并改进代码库导航。这被视为提升 Agent 编码效率的重要方向。
- 评论数：7 条
- [查看 Issue](https://github.com/google-gemini

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-08

## 今日速览

昨日社区提交进入 triage 队列的 Issue 激增（单日新增 10+ 条），主要集中在 **1.0.83/1.1.15 版本引入的会话管理、MCP 连接稳定性回归**以及 **Windows 平台体验问题**。两个独立 PR 同时提交了针对 FreeBSD 安装脚本误报的修复。值得注意：`--yolo` 权限模式被无策略账户错误封禁、Azure MCP `learn=true` 调用超时（1.0.80 → 1.0.83 由 0.2s 恶化至 180s）、以及会话恢复时 MCP 连接超时从 ~16s 骤降至 ~1s，表明近期版本存在系统性回归。

---

## 版本发布

过去 24 小时无新 Release。社区讨论集中在已发布的 **CLI 1.0.83 / Desktop App 1.1.15** 的回归问题上。


## 社区热点 Issues（10 个精选）

### 1. `--yolo` 被无策略账户错误封禁，且整个会话无法解除
- **#4757** | 作者 @jordanms | 评论 3
- 在没有任何托管策略的账户上，CLI 仍应用 fail-closed 策略禁用 bypass-permissions 模式，且会话生命周期内不再解除。影响所有依赖 `--allow-all` 的自动化/交互工作流。
- https://github.com/github/copilot-cli/issues/4757

### 2. Windows 上创建新 Local 会话要求先归档所有空闲会话
- **#4756** | 作者 @TomHarveyBCM | 👍 9 | 评论 2
- Desktop App 1.1.15（CLI 1.0.83-5）在 Windows 上报告 `Failed to create session: invalid argument`，仅归档已有会话后才能新建。高赞反映社区受影响面较大。
- https://github.com/github/copilot-cli/issues/4756

### 3. v1.0.83 会话恢复将 MCP 连接超时从 ~16s 砍到 ~1s
- **#4753** | 作者 @indeherb | 评论 2
- 恢复会话时，仍在初始化中的 stdio MCP 服务器连接被前台握手阶段约 1 秒超时打断，导致整个会话中这些服务器静默不可用。1.0.82 中该超时为 16s。
- https://github.com/github/copilot-cli/issues/4753

### 4. `disable-model-invocation: true` 技能完全不可达
- **#4438** | 作者 @grammy-jiang | 👍 6 | 评论 4
- 项目技能的 SKILL.md 设置模型禁用调用后，CLI 的 `skill()` 工具返回 `Skill not found`。显式用户请求也无法触发手动调用，与设计意图不符。
- https://github.com/github/copilot-cli/issues/4438

### 5. 记忆（Memory）在仓库之间泄漏
- **#3945** | 作者 @laeubi | 评论 3
- 新建 git 仓库中，Copilot 会提及来自其他仓库存储的"事实"。上下文记忆隔离失效，存在跨项目信息泄露风险。
- https://github.com/github/copilot-cli/issues/3945

### 6. MCP OAuth（桌面 App）：非第一方 HTTP 服务器静默失败
- **#4017** | 作者 @admatt01 | 👍 3 | 评论 3
- 配置 `"type": "http"` 的非第一方远程 MCP 服务器（如 Atlassian、incident.io）在桌面 App 中 OAuth 流程完全静默：无弹窗、无报错、无法连接。切换开关无效。
- https://github.com/github/copilot-cli/issues/4017

### 7. 恢复的会话出现陈旧 connection item ID
- **#4505** | 作者 @Adamkadaban | 👍 3 | 评论 1
- 中断响应后恢复会话，所有 prompt 报 `CAPIError: 400 input item ID does not belong to this connection`，重试与 `/fork` 均无法恢复。
- https://github.com/github/copilot-cli/issues/4505

### 8. 会话在"排队消息落在轮次结束"时永久卡死
- **#4755** | 作者 @NSTA1 | 评论 1
- 会话进入非 idle/running 的第三个状态：不接受输入、UI 显示 stopped、排队消息无响应，唯一恢复方式是杀进程。
- https://github.com/github/copilot-cli/issues/4755

### 9. Copilot CLI 不发送 MCP 取消请求
- **#4759** | 作者 @rroesch1 | 评论 1
- 工具调用等待 URL 模式 elicitation 时，用户取消浏览器认证不会向 MCP 服务器发送 cancellation 请求（按 2026-07-28 规范），导致远端任务继续运行。
- https://github.com/github/copilot-cli/issues/4759

### 10. Azure MCP `learn=true` 调用从 0.2s 恶化到 180s 超时
- **#4749** | 作者 @tlunawat1 | 评论 0
- CLI 1.0.83-5 中 Azure MCP 层级发现调用全部 180s 超时（1.0.80 下约 0.2s 完成）。非 `learn=true` 调用不受影响，问题被精确定位。
- https://github.com/github/copilot-cli/issues/4749

**其他值得关注的更新：#1999**（德国键盘无法输入 `@`，7 个月未修复）、**#4760**（后台子代理事件延迟 14 分钟）、**#4742**（1.1.15 无法创建第二个 Local 会话）、**#4754**（被逐出会话删除无效，重启后重现）。


## 重要 PR 进展（共 4 条，全部列出）

### 1. install: 报告不支持的 OS
- **#4762** | @devm33 | 2026-09-08
- 修复 FreeBSD 上 `install.sh` 误报 "Windows detected but winget not found" 的问题——目前除 macOS/Linux 外所有系统都被归入 Windows 分支，程序应明确报告平台不受支持。
- https://github.com/github/copilot-cli/pull/4762

### 2. install: 报告不支持的 OS（同一问题，独立提交）
- **#4761** | @1fanwang | 2026-09-08
- 与 #4762 功能重叠。两个 PR 同日出现，维护者可能需要合并协调。
- https://github.com/github/copilot-cli/pull/4761

### 3. Add joke cli
- **#4748** | @tnk7899xd-create | 2026-09-07
- 无描述的趣味性 PR（标题为"添加玩笑 CLI"），预计为无效/低质量提交。
- https://github.com/github/copilot-cli/pull/4748

### 4. 添加实验性 next-action 扩展原型
- **#4746** | @anujb-msft | 2026-09-07
- 新增 `examples/next-best-action/` 下的 opt-in 实验性 SDK 扩展，展示模型推断的下一步动作。复用现有前台会话，不修改已安装 CLI。
- https://github.com/github/copilot-cli/pull/4746


## 功能需求趋势

从全部 Issues 中提炼当前社区最关注的五个方向：

1. **MCP 生态稳定性（最高频）** — OAuth 认证（#4017、#4681）、取消请求语义（#4759）、初始化握手/超时（#4753）、Azure 发现调用超时（#4749）。MCP 服务器接入体验已成为 CLI 核心短板。

2. **会话生命周期管理** — 多会话冲突（#4742）、恢复时连接失效（#4505）、删除会话无效（#4754）、会话永久卡死（#4755）。1.1.15/1.0.83 的会话管理明显存在系统性回归。

3. **Windows/Destop App 体验** — 会话创建受阻（#4756）、语音服务器死锁（#4740）。Windows 平台问题集中爆发。

4. **输入与交互** — 非美式键盘支持缺失（#1999）、`ask_user` 表单误触导致输入丢失（#4738）。基础 UX 欠账待补。

5. **权限与策略** — `--yolo` 被无策略账户错误禁用（#4757）。托管策略的缺省行为需要修复为其应默认为"允许"。

**特性请求方向**：#4693（按 repo 过滤会话列表）、#4438（技能显式调用应绕过模型禁用标记）、#4760（后台子代理事件流完整性）。


## 开发者关注点

- **回归频发损伤信任**：同一批功能（MCP 连接、会话恢复）在 1.0.82→1.0.83 之间出现数量级级别的超时回退（16s→1s、0.2s→180s），社区明显担忧发布质量。
- **数据安全**：记忆跨仓库泄漏（#3945）+ 表单输入不可恢复（#4738），这两类问题直接触碰开发者对 AI 助手的数据信任底线。
- **静默失败是最大敌人**：MCP OAuth 无报错、无弹窗、删除会话无提示、`disable-model-invocation` 静默不可达——多个 Issue 的共同痛点是系统不暴露错误原因，难以排查。
- **进程级卡死频繁出现**：#4755（wedged 状态）、#4740（语音服务器死锁）、#4670（工具调用 hang），涉及会话、语音、扩展三块子系统，稳定性优先于新功能是当前社区的主流诉求。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-09-08）

## 1. 今日速览

过去 24 小时无新版本发布；社区共有 4 个 Issue 状态更新、2 个 PR 进展。最受关注的是用户对 **plan mode** 的持续需求（#1354，👍7）以及 **Windows IME 输入重复** Bug（#2584）。新的 PR 中出现了手机远程配对（#2616）和路径缓存优化（#2636），分别代表协作扩展与底层性能优化方向。

## 2. 版本发布

无。

## 3. 社区热点 Issues

> 本次统计窗口内共有 4 个更新状态的 Issue，全部列出。

### #2584 [OPEN] Windows 下输入 Thai 等 IME 字符时出现重复
- 作者：@mgprona｜创建：2026-08-04｜更新：2026-09-07
- 评论：1｜👍：1
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2584>
- **重要性**：影响非英文用户的终端输入体验，尤其在使用 IME 输入法时字符被复制粘贴式重复。属于跨平台兼容性缺陷，应优先关注。

### #1354 [CLOSED] 强烈希望提供 plan mode / 规划模式
- 作者：@panzhiyi87-droid｜创建：2026-03-06｜更新：2026-09-07
- 评论：1｜👍：7
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/1354>
- **重要性**：虽然是已关闭状态，但 7 个 👍 说明这是社区期待已久的能力。用户反馈即便通过 skill 尝试，Kimi Code 仍会过早自主执行，规划与执行的控制权需求明确。

### #2637 [OPEN] Agent 陷入重复 Read-tool 循环，无法发出 Edit 调用
- 作者：@devalirzayev｜创建：2026-09-07｜更新：2026-09-07
- 评论：0｜👍：0
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2637>
- **重要性**：核心 agent 稳定性问题。工具调用循环会导致任务无法推进，影响自动化编码效率，需尽快排查。

### #1356 [CLOSED] 从其他主流 Agent CLI 无缝迁移 MCP Skill 配置
- 作者：@deshes｜创建：2026-03-06｜更新：2026-09-07
- 评论：0｜👍：0
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/1356>
- **重要性**：用户同时使用 Claude CLI、Cursor、Windsurf 等工具，希望 MCP 配置可复用，降低切换成本。反映生态互操作需求，值得产品团队考虑。

## 4. 重要 PR 进展

> 本次统计窗口内共有 2 个 PR 更新，全部列出。

### #2616 [OPEN] 添加 Build Remote Agent 手机配对功能（gbr/1）
- 作者：@LinespottingPrivate｜创建：2026-08-23｜更新：2026-09-07
- 评论：无｜👍：0
- 链接：<https://github.com/MoonshotAI/kimi-cli/pull/2616>
- **功能**：通过 iOS/Android App 远程查看和注入本地会话，以 spectator + veto 模式工作。属于扩展 agent 协作场景的功能 PR，但“手机可注入”会引入安全边界讨论，需 Community 和 Maintainer 评估。

### #2636 [OPEN] 优化 get_share_dir：增加缓存与路径处理
- 作者：@gugu8intel-i9｜创建：2026-09-07｜更新：2026-09-07
- 评论：无｜👍：0
- 链接：<https://github.com/MoonshotAI/kimi-cli/pull/2636>
- **功能**：针对路径解析做缓存优化，改善重复获取 share_dir 的性能。属于基础代码质量改进，门槛低，适合快速合入。

## 5. 功能需求趋势

从当前 Issue 和 PR 中可以提炼出以下社区关注方向：

- **规划模式（Plan Mode）**：用户希望在执行前获得完整的计划确认，而不是让 Agent 自主发起动作。#1354
- **MCP 配置生态互操作**：将其他 CLI 的 MCP 配置无缝迁移到 Kimi Code，降低工具链迁移成本。#1356
- **远程 / 移动设备协作**：通过手机 App 配对会话，实现查看和否决操作，扩展 agent 使用边界。#2616
- **Agent 执行稳定性**：防止陷入重复 Read 工具循环，保证任务能正常推进。#2637
- **跨平台输入法兼容性**：解决 Windows 下非英文 IME 输入的字符重复问题。#2584
- **性能优化**：对基础路径解析增加缓存，减少重复计算开销。#2636

## 6. 开发者关注点

- **Agent 自主性与用户控制权的平衡**：多个反馈表明，开发者希望模型在规划阶段不要“抢跑”，issue #1354 获得最高 👍 数。
- **工具调用循环与卡死**：#2637 反映出多步骤任务中模型可能反复执行同一工具，需要加固循环检测和退出机制。
- **Windows 与 IME 输入体验**：非拉丁语系用户受输入法重复问题困扰，属于高影响低成本的修复点。
- **配置与生态迁移成本**：用户希望 Kimi Code 能兼容主流 Agent CLI 的 MCP 配置，降低多工具并用的维护负担。
- **集成方向**：除了传统桌面终端，手机配对等新型交互方式开始获得关注，但需谨慎处理跨设备权限模型。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode 社区动态日报（2026-09-08）

### 一、今日速览

今日社区无新版本发布，但讨论热度集中在 **官方 VS Code 扩展**这一高赞需求（148 👍）与 **多起会话卡死/流中断** 稳定性事故上。PR 侧有多项针对流超时、重连退避和快照安全的关键修复正在推进，并新增了 Z.AI、Moonshot 等模型提供商支持。

### 二、社区热点 Issues（精选 10 条）

1. **[#11176] 官方 OpenCode VS Code 扩展**
   - 作者：@c2b247 | 评论：29 | 👍：148
   - 社区最高赞需求，用户希望 OpenCode 以原生 VS Code 扩展形态运行，而非依赖外部终端。反映了 IDE 集成方向的强烈呼声。
   - 链接：https://github.com/anomalyco/opencode/issues/11176

2. **[#43277] 会话永久卡死，重启后仍无法恢复**
   - 作者：@dcon4 | 评论：8 | 👍：1
   - 多个会话在正常使用中永久卡死，拒绝新消息，且状态跨重启持久存在，无法通过重启服务清除。属严重稳定性事故。
   - 链接：https://github.com/anomalyco/opencode/issues/43277

3. **[#43199] Mistral 托管模型 GLM-5.2 工具调用报错**
   - 作者：@KPhi | 评论：9 | 👍：8
   - Mistral 开始托管第三方开源模型（GLM-5.2），手动添加到 `mistral` provider 后文本正常，一旦触发工具调用即报错。代表多提供商模型兼容性问题。
   - 链接：https://github.com/anomalyco/opencode/issues/43199

4. **[#17798] Windows 下忽略 `NODE_EXTRA_CA_CERTS` 环境变量**
   - 作者：@watashi93 | 评论：7 | 👍：4
   - 企业代理环境（TLS 拦截 + 内部 PKI）中，OpenCode 无法识别系统 CA 配置，导致内部 LLM 端点连接失败。涉及企业部署关键路径。
   - 链接：https://github.com/anomalyco/opencode/issues/17798

5. **[#47545] Auto 模式在终端中制造重复的虚假权限通知**
   - 作者：@sambokai | 评论：5 | 👍：1
   - 自动审批在客户端侧完成，但服务端仍先发出 `permission` 事件，导致终端刷屏无用通知。自动执行场景下交互体验存疑。
   - 链接：https://github.com/anomalyco/opencode/issues/47545

6. **[#36241] macOS 下 gpt-5.6-sol-fast/high 反复报 `reasoning part rs_*:0 not found`**
   - 作者：@li-keli | 评论：6 | 👍：2
   - 通过 Codex OAuth 使用 OpenAI 推理模型时，流式传输中途反复中断。影响长推理任务稳定性。
   - 链接：https://github.com/anomalyco/opencode/issues/36241

7. **[#37580] SSE 流静默中断导致会话/子代理永久挂起，`chunkTimeout` 在 openai 路径无默认值**
   - 作者：@Jaaaky | 评论：4 | 👍：3
   - ChatGPT 订阅下子代理运行中途冻结，父会话永远显示忙碌，排队提示永不送达。与 #36241 同属流中断类问题，且已有关联 PR。
   - 链接：https://github.com/anomalyco/opencode/issues/37580

8. **[#47168] `commentary` 通道未实现：进度更新在 chat-completions 模型上提前结束回合**
   - 作者：@spencer2211 | 评论：5 | 👍：0
   - 系统提示词要求模型在 `commentary` 通道发送进度，但该通道实际未实现，导致每次更新都会中断生成回合。属协议与实现不一致。
   - 链接：https://github.com/anomalyco/opencode/issues/47168

9. **[#45011] CLI/TUI 创建的会话不显示在 Web Home 中**
   - 作者：@tak2-08 | 评论：6 | 👍：1
   - Web UI 项目注册表为客户端独立存储，导致 shell 侧（TUI/`opencode run`/agents）创建的会话在 Web 首页不可见，跨端会话管理断层。
   - 链接：https://github.com/anomalyco/opencode/issues/45011

10. **[#42938] Go 计划达 100% 后阻塞 12 小时，$39.89 Zen 余额未被使用**
    - 作者：@CinematicEnciclopedia | 评论：6 | 👍：0
    - 用户已开启 "Use balance"，文档称应回退到 Zen 余额，但实际模型仍被锁 12 小时。计费/配额回退逻辑存在缺陷。
    - 链接：https://github.com/anomalyco/opencode/issues/42938

### 三、重要 PR 进展（精选 10 条）

1. **[#46802] fix(ai): 在 HTTP SSE 流上生效 `chunkTimeout`**
   - 作者：@holny | 更新：2026-09-08
   - 修复 `chunkTimeout` 被配置但从未在原生路径被读取的问题，直接回应 #46692 及社区长期反馈的流中断挂起问题。
   - 链接：https://github.com/anomalyco/opencode/pull/46802

2. **[#47204] fix(client): 流从未连接时退避重连**
   - 作者：@holny | 更新：2026-09-08
   - 修复事件流客户端固定 1 秒重试导致未认证会话反复冲击服务端的问题，改为按退避策略重连，提升服务端稳定性。
   - 链接：https://github.com/anomalyco/opencode/pull/47204

3. **[#47861] fix(snapshot): 作用域还原补丁并保护删除**
   - 作者：@CannonRS | 更新：2026-09-07
   - 修复快照存储为 worktree 全局但补丁文件列表未限定范围的问题，关闭 #40736/#33940/#46783 三个相关 Bug。
   - 链接：https://github.com/anomalyco/opencode/pull/47861

4. **[#47866] feat(ai): 增加 Z.AI 语言模型**
   - 作者：@rekram1-node | 更新：2026-09-08
   - 为 ZAI facade 新增标准 Chat 模型，并单独提供 `zai-coding-plan` 专用 provider，对应 Chat/Messages/Responses 端点。
   - 链接：https://github.com/anomalyco/opencode/pull/47866

5. **[#47851] feat(ai): 增加 Moonshot provider**
   - 作者：@rekram1-node | 更新：2026-09-08
   - 新增 Moonshot 顶层 facade，默认 Chat Completions，支持 `.chat`/`.messages`/`.responses` 显式选择器与包入口。
   - 链接：https://github.com/anomalyco/opencode/pull/47851

6. **[#47156] feat(core): 支持 Snowflake Cortex 原生认证**
   - 作者：@rekram1-node | 更新：2026-09-08
   - 改用原生 OpenAI 兼容 provider 与 `compatibility.maxTokensField`，移除旧插件中不兼容的认证实现，面向企业级用户。
   - 链接：https://github.com/anomalyco/opencode/pull/47156

7. **[#47355] fix(opencode): 为 chat 模型省略 channel 提示**
   - 作者：@Rocklis | 更新：2026-09-08
   - 关闭 #47168：修正系统提示词中引入的 `commentary` 通道，避免 chat-completions 模型因未实现通道导致回合中断。
   - 链接：https://github.com/anomalyco/opencode/pull/47355

8. **[#46920] feat(opencode): 允许按 MCP 服务器配置信任**
   - 作者：@karup | 更新：2026-09-08
   - 关闭 #40111：支持指纹固定与 `caFile` 方式信任特定自签名证书，解决私有 MCP 服务器的 TLS 验证问题，无需全局关闭安全校验。
   - 链接：https://github.com/anomalyco/opencode/pull/46920

9. **[#47867] fix(core): 日志时间戳改用本地时间**
   - 作者：@DreamLoader996 | 更新：2026-09-08
   - 使用 Effect 的 DateTime 格式化器将文件与 stderr 日志时间戳改为系统本地时间，关闭 #21330。
   - 链接：https://github.com/anomalyco/opencode/pull/47867

10. **[#47678] feat(server): `/provider` 仅返回已连接的 providers**
    - 作者：@CannonRS | 更新：2026-09-08
    - 将 `/provider` 接口从返回完整 models.dev 目录（约 4,168 条）改为仅返回已连接提供商，大幅缩减响应体，关闭 #47677。
    - 链接：https://github.com/anomalyco/opencode/pull/47678

### 四、功能需求趋势

- **IDE 集成成为绝对核心诉求**：#11176（VS Code 官方扩展，148 👍）与 #27303（VSCode Copilot BYOK 扩展提供商）两条高赞请求均指向开发者希望把 OpenCode 能力嵌入主流 IDE 工作流，而非仅停留在 CLI/TUI。
- **新模型/提供商支持持续扩充**：#47866（Z.AI）、#47851（Moonshot）、#47156（Snowflake Cortex）被密集提交，社区对多模型生态接入保持高活跃度，尤其关注国内模型厂商与企业级数据平台。
- **无关模型的服务稳定性**：多起会话卡死、SSE 流中断、chunkTimeout 失效等问题表明，用户对长任务运行的可靠性要求已高于功能堆叠。
- **跨端会话一致性**：CLI/TUI 与 Web UI 的会话列表双向同步（#45011、#46444）被反复提及，期望统一的项目注册与会话管理模型。

### 五、开发者关注点

- **企业网络环境适配**：`NODE_EXTRA_CA_CERTS` 被忽略（#17798）、自签名证书/MCP 服务器信任（#46920）等话题集中出现，反映企业代理与私有部署场景是核心用户群之一。
- **订阅/配额透明度**：Go 计划用量耗尽后的余额回退未生效（#42938）、认证 401 报错（#47820）表明定价与支付链路的状态反馈需增强可观测性。
- **权限系统的交互细化**：Auto 模式下的刷屏通知（#47545）、"Allow always"

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-08

## 1. 今日速览

Qwen Code 今日发布 `v0.23.1-preview.2`，重点增强 Web Shell 动态工作流运行的可视化与管理能力。社区讨论热度集中在 TUI 渲染层向 OpenTUI 迁移的长期规划（32 条评论）、Windows 平台 conhost.exe 进程泄漏的 P1 级 Bug，以及本地 llama-server 上 `400 Failed to initialize samplers` 的兼容性回归问题。PR 侧，GPT-5/GPT-6 推理配置支持、Web 预览面板、OpenTUI 行为对齐等多项功能正在推进中。

## 2. 版本发布

### v0.23.1-preview.2
- **链接**: https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.2
- **核心更新**:
  - `feat(web-shell)`: 支持可视化并管理动态 workflow 运行（PR #10594）
  - `perf(web-shell)`: 优化会话 workflow 项目的派生逻辑

### v0.23.0-nightly.20260907.f1ed3bc31a
- **链接**: https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260907.f1ed3bc31a
- **核心更新**: 与 preview.2 同源，包含相同的 web-shell workflow 可视化与管理功能。

### cua-driver-rs-v0.20.4
- **链接**: https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.4
- **核心更新**: Qwen CUA Driver 预编译二进制发布。macOS 提供签名+公证的 universal 二进制；Linux 提供 x86_64 + arm64（glibc 2.31 起）；Windows 提供 UIAccess worker + 原生 SDK payload。

## 3. 社区热点 Issues

### 1. 迁移 TUI 渲染层：从 ink 到 OpenTUI（#8662）
- **链接**: https://github.com/QwenLM/qwen-code/issues/8662
- **优先级**: P3 | **评论**: 32 | **状态**: 开放
- **说明**: 当前 TUI 基于 ink 7 + React 19，带有约 1037 行的自定义补丁和 Virtual Viewport 模式，结构性闪屏等问题难以在 ink 内解决。该 issue 是迁移到 OpenTUI 的跟踪项，社区讨论热度最高，属于长期架构演进方向。

### 2. 百炼收费陷阱（#44）
- **链接**: https://github.com/QwenLM/qwen-code/issues/44
- **评论**: 20 | **状态**: 已关闭
- **说明**: 用户反馈仅问几个问题即被收取 11 元费用，认为计费不透明。虽然已关闭，但 20 条评论说明该问题引发了广泛共鸣。

### 3. serve 模式下后台 shell 输出与唤醒通知被静默丢弃（#11119）
- **链接**: https://github.com/QwenLM/qwen-code/issues/11119
- **优先级**: P1 | **评论**: 8 | **状态**: 开放
- **说明**: 在 `qwen serve` 的 Web Shell 会话中，后台 shell（如 CI 轮询循环）持续产生输出，但当前轮次结束后输出被静默丢弃，最终导致会话卡死。属于 P1 级阻塞性缺陷，直接影响后台自动化场景。

### 4. Windows 下 qwen-cli 泄漏 conhost.exe 进程（#11303）
- **链接**: https://github.com/QwenLM/qwen-code/issues/11303
- **优先级**: P1 | **评论**: 6 | **状态**: 开放，ready-for-human
- **说明**: VS Code Companion 中嵌入的 qwen-cli 在 Windows 上泄漏 headless conhost.exe（ConPTY）进程，12 小时运行后累计 347 个进程、占用约 2.8 GB 内存。Windows 平台的高优先级性能问题。

### 5. 0.22.3 版本出现 `400 Failed to initialize samplers`（#10530）
- **链接**: https://github.com/QwenLM/qwen-code/issues/10530
- **优先级**: P2 | **评论**: 6 | **状态**: 开放，ready-for-human
- **说明**: 使用 llama-server 运行 Qwen 3.8 27b 或 Qwen 3.6 35b 时报 `400 Failed to initialize samplers: failed to parse grammar`，Gemma 模型正常，其他 CLI（Pi、OpenCode）无此问题。0.22.3 版本引入的回归，本地推理用户受影响严重。

### 6. Agent 将成功执行的 shell 输出误判为空（#3361）
- **链接**: https://github.com/QwenLM/qwen-code/issues/3361
- **评论**: 6 | **状态**: 开放
- **说明**: 使用 OpenAI-compatible API 时，shell 命令实际执行成功且 UI 有输出，但 Agent 错误地认为输出为空。影响 agent 对命令结果的判断，属于较为隐蔽的交互逻辑缺陷。

### 7. 新版本导致本地 llama-server 推理崩溃（#10435）
- **链接**: https://github.com/QwenLM/qwen-code/issues/10435
- **优先级**: P2 | **评论**: 5 | **状态**: 开放，ready-for-human
- **说明**: 与 #10530 为同一问题，用户请求代码审查时触发 llama-server 报错。多个 issue 指向同一根因，社区关注度高。

### 8. 仓库卫生：2026-W33 报告只读发现（#8835）
- **链接**: https://github.com/QwenLM/qwen-code/issues/8835
- **优先级**: P2 | **评论**: 5 | **状态**: 开放
- **说明**: 机器人报告 8 项安全问题，核心是 ACP session cwd / allowed-roots 包含校验、worktree sidecar 等安全敏感路径存在 `startsWith('..')` 类型缺陷。属于安全类问题，建议关注修复进展。

### 9. Web Shell 会话工作流投影每渲染三次派生（#10865）
- **链接**: https://github.com/QwenLM/qwen-code/issues/10865
- **优先级**: P2 | **评论**: 5 | **状态**: 开放，ready-for-agent
- **说明**: `SessionWorkflowCockpit.tsx` 每次渲染重复计算同一投影 3 次，且每次重建索引，影响渲染性能。与同日发布的 perf 修复直接相关。

### 10. 取消长时间运行的 stdio 工具调用会杀死 MCP 服务器且无法恢复（#11272）
- **链接**: https://github.com/QwenLM/qwen-code/issues/11272
- **优先级**: P2 | **评论**: 3 | **状态**: 开放，ready-for-agent
- **说明**: 在 Channel 部署（钉钉交互卡片）中，用户取消一个长时间运行的 MCP 工具调用会导致整个 stdio 服务器进程被杀，且 Channel 模式下无法自动恢复。MCP 生态的关键可靠性问题。

## 4. 重要 PR 进展

### 1. macOS E2E 分片增加重试机制（#11134）
- **链接**: https://github.com/QwenLM/qwen-code/pull/11134
- **作者**: qwen-code-dev-bot
- **说明**: 为 macOS E2E 测试分片增加预算受限的单次重试，修复 Linux `sandbox:none` 已带有的同类问题。

### 2. 将 review 覆盖率改为密封的分类账本（#9768）
- **链接**: https://github.com/QwenLM/qwen-code/pull/9768
- **作者**: wenshao
- **说明**: `/review` 的 chunk 覆盖率变为自带身份的分类账本，能说明每个 gap 存在的原因，并区分"读过多少 diff"与"实际发布多少内容"。

### 3. 修复 Windows 上 SessionRouter worktree 测试失败（#11318）
- **链接**: https://github.com/QwenLM/qwen-code/pull/11318
- **作者**: qwen-code-dev-bot
- **说明**: 修复六个在 Windows nightly CI 上持续失败的 worktree 测试——规范路径表示问题，属于持续集成稳定性修复。

### 4. VP 模式下短内容底部对齐（#9305）
- **链接**: https://github.com/QwenLM/qwen-code/pull/9305
- **作者**: qwen-code-dev-bot
- **说明**: 修复 VP 模式下内容短于视口时顶部对齐导致的底部空白问题，使短会话内容贴底显示，改善日常使用体验。

### 5. 自动重试瞬时网络错误（EOF）（#10347）
- **链接**: https://github.com/QwenLM/qwen-code/pull/10347
- **作者**: qwen-code-dev-bot
- **说明**: 将实际为底层网络故障的 4xx（如 `400 network error ... EOF`）归类为可重试传输错误，使现有有界自动重试机制生效——此前这类错误会被立即判死。

### 6. 修复输出语言文件不可写时 CLI 启动崩溃（#10455）
- **链接**: https://github.com/QwenLM/qwen-code/pull/10455
- **作者**: qwen-code-dev-bot
- **说明**: 当全局配置目录不可写（如只读 home、共享 runner 上 root 属主残留）时，启动时写入输出语言规则文件的逻辑不再直接抛异常。

### 7. 支持 GPT-5 和 GPT-6 推理强度配置（#11295）
- **链接**: https://github.com/QwenLM/qwen-code/pull/11295
- **作者**: wenshao
- **说明**: 为 GPT-5 系列及 GPT-6 Astra 增加模型专属的 reasoning effort 配置，共享模型归一化逻辑处理 provider 前缀、路由标签、补丁版本及日期快照。

### 8. Web Shell 增加 Web 预览面板（#11276）
- **链接**: https://github.com/QwenLM/qwen-code/pull/11276
- **作者**: wenshao
- **说明**: 新增 Web 预览面板，支持桌面/移动宽度、刷新及外部打开，独立 Web Shell 默认启用，嵌入式宿主可选择性接入。URL 和宽度按会话/工作区记忆。

### 9. 持久化共享线程的 Agent 协作（#11206）
- **链接**: https://github.com/QwenLM/qwen-code/pull/11206
- **作者**: yiliang114
- **说明**: 引入持久化工作区 Agent 身份，支持在共享线程上协作：创建/分配任务、多 Agent 寻址、运行中插话、结果归因、取消、解决阻塞、标记已评审。Mesh 方向的重要能力。

### 10. OpenTUI 行为对齐收尾（#11152）
- **链接**: https://github.com/QwenLM/qwen-code/pull/11152
- **作者**: chiga0
- **说明**: 关闭 OpenTUI 渲染器与 ink 渲染器之间最后已知的行为差距：认证对话框自动打开、延迟更新、对话框/合成器/shell 模式等，并附带验收测试。

## 5. 功能需求趋势

- **后台自动化与 daemon 能力加强**: `activeWork` 跟踪与后台 Agent 恢复（#8586）、会话回收与保持（#11118）表明社区对长时间运行、可恢复的后台任务需求旺盛。
- **Web Shell 成为主阵地**: 会话级 turn 导航（#10750）、工作流依赖可视化和导航（#10938）、Web 预览面板（#11276）、Git remote 管理（#11163）、上下文用量面板（#11177）——Web Shell 正在快速获取桌面 IDE 级能力。
- **语义记忆 / 自托管 memory MCP**: 社区希望内置嵌入向量的语义记忆，而非仅限关键词/标题级检索（#10684）。
- **自定义请求头模板变量**: 在 `customHeaders` 中支持 `${session_id}`，用于按会话传递请求头（#10995）。
- **OpenTUI 渲染层迁移**: 从 ink 迁移到 OpenTUI 被标记为 roadmap/terminal-ux，这对终端渲染稳定性（闪烁、对齐）有长期价值。
- **GPT-5 / GPT-6 新模型接入**: 推理强度配置 PR（#11295）表明对新模型的支持仍是持续投入方向。

## 6. 开发者关注点

- **llama-server 兼容性回归是最大痛点**: 0.22.3 引入的 `400 Failed to initialize samplers` 影响本地推理，两个独立 issue（#10530、#10435）都指向同一根因，等待修复。
- **Windows 平台可靠性问题突出**: conhost.exe 进程泄漏（#11303）和 SessionRouter worktree 测试失败（#11318）都出现在 Windows 上，Windows 用户对内存占用和进程管理敏感。
- **取消/中断操作不可恢复**: MCP 工具调用取消后服务器进程被杀且无法自动恢复（#11272），后台 shell 输出被静默丢弃导致会话卡死（#11119）——这类"不可恢复"状态让开发者对后台/长任务场景缺乏信心。
- **计费透明度和成本感知**: 百炼收费陷阱 issue（#44）虽然关闭，仍有 20 条评论和 1 个 👍，说明用户对 API 费用突增非常敏感。
- **Agent 对环境的感知失真**: 命令成功但输出被误判为空（#3361），暴露了 Agent 在解释 shell 环境时的信息损耗问题。
- **构建/安装体验**: `npm install` 触发完整 build + bundle（#11301）导致本地安装变慢；输出语言文件不可写时 CLI 直接崩溃（#10455）——这些基本

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*