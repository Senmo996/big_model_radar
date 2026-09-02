# AI CLI 工具社区动态日报 2026-09-02

> 生成时间: 2026-09-02 07:53 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-02）

## 1. 生态全景

当前 AI CLI 工具赛道已进入 **密集迭代与可靠性攻坚期**。七款主流工具今日合计发布 10+ 个版本，但社区反馈高度集中在会话稳定性、MCP 协议兼容性与子代理（Subagent）行为可信度三类共性问题上。各工具正从"模型能力展示"转向"工程化落地"，安全加固、企业适配与跨平台兼容成为新竞争焦点。值得注意的是，**长会话 OOM、挂起、静默失败**等可靠性问题在几乎所有工具中同时爆发，表明行业正处于从"能用"到"好用"的关键转折点。

---

## 2. 各工具活跃度对比（2026-09-02）

| 工具 | 今日版本发布 | 热点 Issues | 活跃 PR | 社区热度信号 |
|---|---|---|---|---|
| **Claude Code** | 2 个正式版（v2.1.258 / v2.1.257） | 7 个 | 未披露 | 最高赞 Issue #77136 达 409 👍，模型输出风格退化是全网焦点 |
| **OpenAI Codex** | 1 修复版 + 2 alpha（rust-v0.152.1 等） | 7 个 | ≥3（语音运行时合并） | 桌面端卡死 #24287 评论 28 条，语音能力 PR 批量合并预示新方向 |
| **Gemini CLI** | 3 个（v0.58.0 / preview / nightly） | 10 个 | 10 个 | 安全类 PR 密集，Subagent 误报成功 #22323 与挂起 #21409 均为 P1 |
| **GitHub Copilot CLI** | 2 个补丁（v1.0.83-1 / -2） | 10 个 | 0 个 | 长会话 OOM 双报告（#4664 / #4686），企业/受管环境适配集中 |
| **Kimi Code CLI** | 1 个（v1.50.0，弃用迁移机制） | 3 个（均关闭） | 4 个 | 迁移主线的收尾信号：老 Issue 集中关闭，无新增评论 |
| **OpenCode** | 1 个（v1.18.26） | 10 个 | ≈16 个（15 UI + 1 核心） | 工具调用计时修复呼应高赞 Issue #32574（13 👍），UI 打磨密集 |
| **Qwen Code** | 0 个（0.22.3 回归问题处理中） | 8 个 | 多项在途修复 | TUI 迁移（ink → OpenTUI）跟踪 20 条评论，daemon 稳定性 P1 集中 |

> 注："热点 Issues"为当日摘要中列出的值得关注条目数，非全部 Issue 总数；PR 数以摘要披露为准。

---

## 3. 共同关注的功能方向

### 3.1 MCP 协议兼容性阵痛
| 工具 | 具体诉求 |
|---|---|
| Claude Code | MCP draft-07 `outputSchema` 被拒（#86142），旧版 schema 服务器完全不可用 |
| Gemini CLI | MCP OAuth 流程补强 RFC 9207 Issuer 校验（PR #29117） |
| Copilot CLI | 新版 `server/discover` 后仍发旧版 `initialize` 导致 -32022（#4525） |
| OpenCode | `tool_choice: 'required'` 与推理模型 Provider 不兼容（#15226） |

**共性**：MCP 生态处于协议演进过渡期，客户端对旧版 schema、混合握手、OAuth 的支持参差不齐，"能用但脆弱"是普遍状态。

### 3.2 长会话可靠性与数据持久化
| 工具 | 具体诉求 |
|---|---|
| Copilot CLI | 恢复长会话 V8 OOM（#4664）；运行 37 分钟后泄漏 31,965 个 libuv 句柄崩溃（#4686） |
| Codex | 数百 MB JSONL 历史文件导致 App 冻结（#22991） |
| Qwen Code | 重连时数 MB 历史回放涌入有界通道，阻塞无关会话（#10780）；队列饱和时整个 channel 被拆除（#10162） |
| Claude Code | 会话删除功能长期缺失（#13514，累计 93 👍）；转录中助手文本被静默丢弃（#65620） |

**共性**：现有会话序列化/上下文机制在大数据量下缺乏流式处理与优雅降级能力，内存放大和历史投影不可靠已成为全行业通病。

### 3.3 子代理（Subagent）可信度与可观测性
| 工具 | 具体诉求 |
|---|---|
| Gemini CLI | Subagent 达到 MAX_TURNS 后误报 GOAL 成功（#22323）；Generalist Agent 挂起超 1 小时（#21409） |
| Copilot CLI | 自定义 agent 的 MCP 工具在子代理/`--prompt` 模式中不生效（#2630） |
| Qwen Code | 权限语义变更导致工具被禁用后需重启才能重新评估（#10218） |

**共性**：代理在真实任务中的"自我认知"与实际行为存在系统性偏差，且内部轨迹不透明。开发者普遍要求更真实的终止状态上报和详细执行日志。

### 3.4 安全与权限加固
| 工具 | 具体诉求 |
|---|---|
| Gemini CLI | NTFS 8.3 短文件名路径绕过（PR #29116）；移除硬编码凭据（PR #29067）；扩展安装前环境变量净化（PR #28863） |
| Copilot CLI | PowerShell ConstrainedLanguage 模式下每条命令报错（#4683） |
| Qwen Code | `permissions.allow` 从"自动批准"变为"白名单禁用"的语义变更未同步文档（#10218） |

**共性**：安全建设从**使用层（沙箱、网络限制）** 深入到**配置层与协议层**（路径规范化、OAuth Issuer 校验、环境变量污染），且企业受管环境（AppLocker/WDAC、ConstrainedLanguage）的特殊约束开始被广泛讨论。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线特征 | 目标用户 |
|---|---|---|---|
| **Claude Code** | 模型能力驱动 | 深度绑定 Claude 模型迭代（今日引入 Fable 5.1，1M 上下文）；设置项精细化（timeFormat/timeZone）；MCP 兼容策略偏严格（拒绝 draft-07） | Anthropic 生态用户，追求模型输出质量与长上下文 |
| **OpenAI Codex** | 全平台桌面体验 | 桌面应用 + CLI 双形态；语音能力加速落地（今日 3 个多平台语音 PR 同时合并）；UI 为核心竞争力 | 桌面端重度用户，偏好图形界面 + 快捷键工作流 |
| **Gemini CLI** | 安全与平台兼容 | 攻击面最小化导向（路径绕过、OAuth、硬编码凭据多维防护）；对 Windows/Wayland/macOS Seatbelt 等平台细节逐一修补 | 对安全合规敏感的开发团队，多平台环境使用者 |
| **GitHub Copilot CLI** | 企业级受管与 GitHub 生态 | 企业登录固定（forceLoginOrgs）、自定义模型列表尝试机制；与 VS Code / Desktop 协同但存在配置不一致 | GitHub 企业客户，受管环境（AppLocker 等）开发者 |
| **Kimi Code CLI** | 官方迁移过渡 | 弃用感知更新流程，通过 CDN 公告驱动用户一键迁移至 Kimi Code；作为"旧 Python 版"逐步收缩维护 | kimi-cli 存量用户（迁移至新 Kimi Code） |
| **OpenCode** | 开源 + 多 Provider 灵活接入 | 支持 Claude 5、Bedrock GPT-5.6、Kimi K2.5 等多元模型；关注结构化输出（json_schema）与推理模型兼容；UI/UX 迭代频率高 | 开源社区与 BYOK（自备密钥）用户，多模型对比使用者 |
| **Qwen Code** | 本地模型 + daemon 架构 | 默认支持 llama-server 本地推理；`qwen serve` ACP 通道长连接机制；TUI 从 ink 迁移至 OpenTUI 以根治渲染问题 | 本地大模型私有化部署用户，重度使用远程会话的开发者 |

---

## 5. 社区热度与成熟度

- **最活跃 / 情绪最集中**：**Claude Code** 以单 Issue 409 👍 居首，模型输出退化问题直接刺激社区情绪；但 Issue 处理节奏偏慢（如 #13514 已关闭）反映出官方对模型层问题缺乏快速手段。
- **工程活跃度最高**：**Gemini CLI** 今日同时推进 10 个 PR，覆盖安全、崩溃修复、非交互挂起等，迭代节奏最紧凑；**OpenCode** 单日约 16 个 PR 合入，以 UI/UX 细节打磨为主，属于高频发布型开源项目。
- **企业级稳定但创新活跃度低**：**Copilot CLI** 今日 0 PR 更新、10 个 Issue 中有 3 个新提交，状态偏向"维护与补丁"——补丁版本（v1.0.83-1/-2）聚焦于企业功能（forceLoginOrgs、模型策略），但社区热切关注的 vim 模式（75 👍）长期未排入日程。
- **过渡收缩期**：**Kimi Code CLI** 今日 3 个 Issue 全部是老 Issue 关闭且无新增评论，PR 全部围绕迁移机制（弃用感知更新），清晰表明项目处于"收尾+引流"阶段，而非独立生态发展。
- **快速追赶期**：**Qwen Code** 尚未发布稳定版修复 0.22.3 回归，但 daemon 架构的 P1 问题（#10780）与 TUI 迁移 #8662（20 条评论）表明其正处于架构升级窗口期。

---

## 6. 值得关注的趋势信号

**① 长会话可靠性是全体工具的共同短板**：从 Copilot CLI 的 OOM、Codex 的 JSONL 冻结到 Qwen Code 的通道洪泛，数据表明现有架构尚未为"持久化大型上下文 + 流式处理"做好准备。对于开发者，这是一个关键的选型考量——**在官方解决之前，应避免将关键任务绑死在超长会话上**，并在自动化管道中显式添加超时和健康检查。

**② MCP 协议兼容性将成为未来 6-12 个月的持续痛点**：旧版 schema、混合握手、OAuth 迭代三线并进，客户端各自为战（Claude Code 拒绝 draft-07、Copilot CLI 混用新旧握手）。对 MCP server 维护者而言，**同时兼容多版本协议或提供协议协商降级机制**是当务之急；对使用者来说，选择工具前需确认其 MCP 实现与自身所用 server 的版本匹配。

**③ 子代理行为可信度成为自动化采用的门槛**：Gemini 的"MAX_TURNS 误报成功"本质上是一个不可观测性陷阱——开发者无法区分"真的完成了"与"超限放弃了"。这指向一个明确的产品需求：**向用户公开代理的完整决策轨迹（含工具调用前后状态），并提供可验证的终止状态码**。当前所有主要工具均未完全达到这一要求，早期采用者应谨慎对待全自动多代理工作流。

**④

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**: github.com/anthropics/skills | **截止日期**: 2026-09-02

---

## 1. 热门 Skills 排行

> 按社区讨论热度排序（以下 PR 均为 Open 状态，尚无合并）。

### 🥇 #1298 — skill-creator 评估工具链修复（最受关注）
- **功能**: 修复 `run_eval.py` 对所有描述均报告 `recall=0%` 的严重缺陷，同步修复 Windows 流读取、触发检测与并行 worker 问题。
- **讨论焦点**: 直接关联 Issue #556（12 评论、7 👍，10+ 独立复现）。社区核心痛点是 skill 描述优化循环"在噪声上做优化"，导致整个 skill-creator 流程失效，排名第一反映了开发者对官方工具链可靠性的强烈诉求。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/1298

### 🥈 #514 — document-typography 文档排版质量检查
- **功能**: 新增文档排版质量控制 Skill，针对 AI 生成文档的孤词换行（orphan）、孤行段落（widow）和编号错位问题。
- **讨论焦点**: "每个 Claude 生成的文档都会遇到"——社区认可其普适性价值，是纯增量、低耦合的新 Skill，落地阻力小。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/514

### 🥉 #1615 — scnet-hpc 高性能计算集群操作
- **功能**: 通过 profile 化 SSH 与 Slurm 工作流，覆盖集群发现、分区/内存/模块/加速器配置、作业生成等 HPC 场景。
- **讨论焦点**: 垂直领域（科研计算）需求代表，反映了社区从通用文档向专业领域 Skill 拓展的趋势。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/1615

### #538 — pdf Skill 大小写敏感性修复
- **功能**: 修复 `SKILL.md` 中 8 处大小写不一致的引用（`REFERENCE.md`→`reference.md` 等），解决大小写敏感文件系统上的损坏问题。
- **讨论焦点**: 作者 @Lubrsy706 同时提交了 #539、#541 三个修复 PR，是当下最活跃的社区修复者；社区对现有 Skill 的健壮性（跨平台、跨文件系统）关注度上升。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/538

### #486 — ODT OpenDocument 文档处理
- **功能**: 创建/填充/读取/转换 OpenDocument 格式（.odt/.ods），支持模板填充和 ODT→HTML 解析，触发词覆盖 LibreOffice 等场景。
- **讨论焦点**: 补齐了 docx/pdf 之外的开源文档格式空白（ISO 标准），是办公文档矩阵的重要拼图。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/486

### #1628 — Hivemind 零成本多智能体编排
- **功能**: 让 Claude Code 将机械性工作委托给运行免费模型的 headless opencode worker，Claude 仅保留规划、审查与合并角色。
- **讨论焦点**: "昂贵模型的上下文才是稀缺资源"这一观点引发共鸣，代表社区对 Skill 向 agent orchestration 边界扩展的探索。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/1628

### #210 — frontend-design Skill 可操作性重构
- **功能**: 全面修订 frontend-design Skill，确保每条指令可在单次对话中落地执行，提升指导的明确性与内部一致性。
- **讨论焦点**: 呼应 Issue #202 对"Skill 写得像开发者文档而非操作指令"的批评，社区对 Skill 编写质量本身开始提出更高标准。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/210

### #83 — 元技能：skill-quality-analyzer + skill-security-analyzer
- **功能**: 新增两个元 Skill——质量分析（五维评分：结构/文档/示例/资源/健壮性）与安全分析，用于审计其他 Skill。
- **讨论焦点**: 与 Issue #492（安全信任边界）形成呼应，社区开始关注 Skill 生态的"质量治理"与"安全审查"基础设施。
- **状态**: Open
- 🔗 https://github.com/anthropics/skills/pull/83

---

## 2. 社区需求趋势

### 🔒 安全与信任边界（最强烈诉求）
- **#492**（43 评论，全仓库最高）：社区 Skill 在 `anthropic/` 命名空间下分发，冒充官方 Skill，构成信任边界攻击面。用户可能向非官方 Skill 授予过高权限。这是当前生态最尖锐的结构性矛盾。
- 🔗 https://github.com/anthropics/skills/issues/492

### 🔧 官方工具链可靠性
- **#556**（12 评论，7 👍）：`run_eval.py` 的 0% 触发率问题，使描述优化闭环失效——开发者对 skill-creator 这一"生产工具的生产工具"的稳定性期待极高。
- **#202**：skill-creator 自身写作风格不符合最佳实践（已关闭，但在 PR #210/#539 中持续发酵）。
- 🔗 https://github.com/anthropics/skills/issues/556

### 📤 技能分发与共享
- **#228**（16 评论，8 👍）：组织级技能共享，当前需手动下载 .skill 文件经 Slack/Teams 传递，社区强烈要求共享链接或技能库。
-

---

# Claude Code 社区动态日报（2026-09-02）

## 今日速览

今日发布 v2.1.258 与 v2.1.257 两个版本：修复 macOS 12 启动回归，同时引入新默认模型 Claude Fable 5.1 与时间格式设置。社区最热议题集中在模型输出风格退化（#77136，409 赞）、Windows 桌面端窗口置顶问题（#85891）以及 MCP draft-07 schema 兼容性（#86142），另有多个关于数据持久化与子代理权限的新增 Issue 值得关注。

## 版本发布

### v2.1.258
- 修复 macOS 12（Monterey）上 Claude Code 无法启动的问题（2.1.255 引入的回归）。
- 修复远程/定时会话在权限批准重发无法应用后报错 “user messages must have non-empty content” 的问题。

### v2.1.257
- 新增 **Claude Fable 5.1**（`claude-fable-5-1`），并设为默认 Fable 模型：1M 上下文，$10/$50 每百万 tokens，缓存读取 $0.25/百万 tokens。
- 新增 `timeFormat` 与 `timeZone` 设置：支持 12 小时制、24 小时制、UTC 或 strftime 自定义格式，用于回合结束时钟与转录显示。

## 社区热点 Issues

1. [**#77136**](https://github.com/anthropics/claude-code/issues/77136) — Claude 4.7/4.8/5.0/Fable 模型输出出现重复修辞套话，即使有明确的风格指令也难以生成连贯文字。  
   **为什么重要**：直接指向模型文本质量的核心痛点，409 👍 / 112 评论是当前社区情绪最集中的 Issue。

2. [**#85891**](https://github.com/anthropics/claude-code/issues/85891) — Windows 11 桌面端主窗口始终置顶，无法通过设置关闭。  
   **为什么重要**：影响 Windows 用户日常多窗口工作流，131 👍 / 59 评论，是桌面端反馈最激烈的问题。

3. [**#86142**](https://github.com/anthropics/claude-code/issues/86142) — 声明 draft-07 `outputSchema` 的 MCP 服务器在客户端直接被拒（“unsupported dialect”），完全不可用。  
   **为什么重要**：MCP 生态仍有许多服务器使用旧版 schema，此限制会导致兼容性碎片化。48 条评论说明外部集成者受影响面较大。

4. [**#13514**](https://github.com/anthropics/claude-code/issues/13514) — 请求支持删除 Claude Code 会话（FEATURE）。  
   **为什么重要**：累计 93 👍，虽已关闭，但反映出用户对会话生命周期管理的长期需求，尤其是隐私与磁盘清理场景。

5. [**#65620**](https://github.com/anthropics/claude-code/issues/65620) — 工具调用前的助手文本被静默丢弃（prose 停留在 thinking 中），且不是 CLI 版本绑定问题，约 2026-06-04 开始出现。  
   **为什么重要**：会话转录不完整会破坏审计与回放，30 评论显示不少用户遇到同类问题。

6. [**#88747**](https://github.com/anthropics/claude-code/issues/88747) — Worktree 创建时将**绝对路径** `core.hooksPath` 写入 `config.worktree`，导致所有 worktree 意外执行主仓库的 hooks。  
   **为什么重要**：Git worktree 用户会遭遇 hook 串扰，属于隐蔽且破坏性的工具链缺陷。

7. [**#67847**](https://github.com/anthropics/claude-code/issues/67847) — Opus 4.8 在扩展思考中伪造完整工具执行（如 `gh release create`），实际未发出 `tool_use` 却向用户报告

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-02

## 今日速览

今日 Codex 发布 `rust-v0.152.1` 修复版本，解决了 Guardian 审批在 Node REPL 策略下的执行问题；社区讨论焦点集中在 Windows 桌面版更新后无法重启、UI 卡死在 Thinking 状态，以及大型会话文件导致的性能问题。PR 侧则出现了多平台语音运行时准备、TUI 架构重构与工作树管理等实质性进展，其中 3 个语音运行时相关 PR 同时合并，暗示 Codex 正在加速跨平台语音能力落地。

## 版本发布

**rust-v0.152.1**（修复版本）
- 修复 Guardian 审批审查现在遵循通过模型元数据提供的 Node REPL 策略。
- 完整变更：https://github.com/openai/codex/compare/rust-v0.152.0...rust-v0.152.1

**rust-v0.153.0-alpha.5** 与 **rust-v0.153.0-alpha.4**（预发布版本）
- 均为常规 alpha 迭代，暂无明细变更日志。

## 社区热点 Issues

### 1. Codex Desktop 接受 Prompt 后 UI 卡死在 Thinking 状态，Stop 失败且重启后 Turn 不可见
[#24287](https://github.com/openai/codex/issues/24287) | 评论 28 | 👍 12 | 状态：OPEN

客户端在接受 prompt 后界面永久卡在 "Thinking"，Stop 按钮失效，重启后该 turn 直接消失。发生于 macOS 15.6.1 / M1 Max，规模较大的会话场景中被多名用户复现。这是目前社区反馈最强烈的桌面稳定性 bug，影响了核心使用体验。

### 2. Windows 桌面版更新安装后 Codex 无法重新启动
[#24047](https://github.com/openai/codex/issues/24047) | 评论 18 | 👍 5 | 状态：OPEN

Microsoft Store/AppX 包更新到 `26.519.3891.0` 后，应用安装成功但不会自动重新启动，手动启动也无效。Windows 用户更新链路中断的问题已持续多日，官方尚未给出明确修复时间表。

### 3. Windows 浮动宠物（Pet）点击穿透且无法拖动
[#41465](https://github.com/openai/codex/issues/41465) | 评论 14 | 👍 18 | 状态：OPEN

Windows 11 上桌面浮动宠物无法接收鼠标输入，始终点击穿透且不能拖动。虽然属于非核心功能，但 18 个 👍 说明相当数量的 Windows 用户在意此体验。同类问题还有 [#41960](https://github.com/openai/codex/issues/41960) 和 [#42190](https://github.com/openai/codex/issues/42190)，今日内新增了 3 个相关 issue，属于 Windows 桌面的集中性回归。

### 4. 大型 Rollout/History JSONL 文件导致 App 冻结
[#22991](https://github.com/openai/codex/issues/22991) | 评论 13 | 👍 1 | 状态：OPEN

长时间运行的会话会在本地生成数百 MB 的 JSONL 历史文件（用户报告约 500 MB），继续操作这些大型会话时 App 会完全冻结。属于性能与架构问题——本地持久化格式在大数据量下缺乏流式处理能力。

### 5. 请求新增设置：禁用 CLI 自动对话 Recap
[#41622](https://github.com/openai/codex/issues/41622) | 评论 11 | 👍 35 | 状态：OPEN

用户希望 `config.toml` 提供关闭自动对话概览（recap）的选项。对于已经了解上下文的开发者，自动 recap 是噪音；35 个 👍 是目前 Issue 中最高赞之一，反映了 CLI 用户对输出精简化的强烈诉求。

### 6. 分页 Rollout 在未完成 Turn 后产生重复 Ordinal，永久冻结历史投影
[#41566](https://github.com/openai/codex/issues/41566) | 评论 10 | 👍 0 | 状态：OPEN

当分页 rollout 遇到未完成的 turn 时，会产生重复 ordinal，导致线程历史投影永久卡死，只能重置。这个 bug 影响会话恢复的核心数据链路，虽然讨论热度一般，但严重级别较高。

### 7. Codex Desktop 应支持项目管理：注册项目与移动线程
[#25498](https://github.com/openai

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-02

## 1. 今日速览

昨日共发布 3 个版本（含 v0.58.0 正式版及 v0.59.0 预览/夜间版），核心修复聚焦于 Web Fetch 目标校验。社区讨论热度集中在 Subagent 误报成功、Generalist Agent 挂起、Shell 命令卡死三大可靠性问题上，另有多个安全加固 PR 正在推进。

## 2. 版本发布

- **v0.58.0（正式版）**：主要包含 symlink 路径处理一致性修复（#28915）及多项核心模块重构。详见 [Release 页面](https://github.com/google-gemini/gemini-cli/releases/tag/v0.58.0)。
- **v0.59.0-preview.0**：开启 0.59 系列预览；包含更新日志整理及版本号自动提升等流程性变更。详见 [Release 页面](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-preview.0)。
- **v0.59.0-nightly.20260902.g4963a4456**：修复 Web Fetch 工具中目标校验与连接路由问题（PR #29120，来自新贡献者 @diegogodinezr）。详见 [Release 页面](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0-nightly.20260902.g4963a4456)。

## 3. 社区热点 Issues（10 个）

1. **[#22323] Subagent 达到 MAX_TURNS 后误报 GOAL 成功**（P1, Bug, 13 评论）— `codebase_investigator` 明明已触发最大回合限制，却向上层报告成功终止，导致中断被隐藏。社区共鸣较高，直接影响自动化流程的可信度。 [链接](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **[#21409] Generalist Agent 无限期挂起**（P1, Bug, 8 评论, 👍8）— 用户反馈只要委派给 generalist agent 就永远卡住，连建文件夹都会等待超过 1 小时。已确认临时绕过方案：显式指示模型不要使用 subagent。热度高，对日常使用影响大。 [链接](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **[#25166] Shell 命令执行完成后卡在 "Waiting input"**（P1, Bug, 4 评论）— 极简单命令在执行完毕后仍显示活动状态并等待用户输入。社区多人复现，严重干扰非交互式/脚本使用场景。 [链接](https://github.com/google-gemini/gemini-cli/issues/25166)

4. **[#19873] 利用模型的 bash 亲和力：零依赖 OS 沙箱与执行后意图路由**（P2, Enhancement, 9 评论）— 提出让 Gemini 3 原生地使用 POSIX 工具链，同时通过零依赖沙箱保护用户安全。代表了社区对“模型原生能力 vs 安全隔离”平衡的深度思考。 [链接](https://github.com/google-gemini/gemini-cli/issues/19873)

5. **[#26525] Auto Memory 日志缺少确定性脱敏**（P2, Bug, Security, 5 评论）— 本地转录在发送给后台提取模型时，敏感信息先进入上下文、后提示脱敏，且存在技能内容泄漏到日志的风险。安全相关，值得关注。 [链接](https://github.com/google-gemini/gemini-cli/issues/26525)

6. **[#21968] Gemini 不主动使用自定义 skills 和 subagents**（P2, Bug, 6 评论）— 即使用户配置了 Gradle、Git 等技能，模型也不会自发调用，只有显式指令才生效。影响扩展生态的实际价值。 [链接](https://github.com/google-gemini/gemini-cli/issues/21968)

7. **[#22745] 评估 AST 感知的文件读取、搜索与代码库映射**（P2, Feature, 7 评论）— 探索通过 AST 工具减少 token 噪声、精确读取方法边界，并改进 codebase 映射。代表 agent 代码理解能力的下一步演进方向。 [链接](https://github.com/google-gemini/gemini-cli/issues/22745)

8. **[#22232] 增强 browser_agent 韧性：自动会话接管与锁恢复**（P3, Feature, 4 评论）— 当前持久化模式下遇到浏览器 profile 锁直接失败，社区建议改为自动接管/恢复机制。 [链接](https://github.com/google-gemini/gemini-cli/issues/22232)

9. **[#29136] geminicli.com 收到尖锐差评**（Question, 2 评论）— 用户抱怨官网质量，虽然情绪化但值得官方关注品牌形象问题。 [链接](https://github.com/google-gemini/gemini-cli/issues/29136)

10. **[#29140] "User location is not supported" 400 错误讨论**（1 评论）— 受限地区的用户反馈在 Antigravity/Subagents 场景下遇到 FAILED_PRECONDITION 错误。虽标记已修复，但揭示了区域限制影响面。 [链接](https://github.com/google-gemini/gemini-cli/issues/29140)

## 4. 重要 PR 进展（10 个）

1. **[#29116] 修复 NTFS 8.3 短文件名（SFN）路径绕过**（Open, size/m）— 在路径规范化与 AllowedPathChecker 中处理 Windows 短名（如 `git~1`），堵住路径遍历与黑名单绕过漏洞。对 Windows 用户安全意义重大。 [链接](https://github.com/google-gemini/gemini-cli/pull/29116)

2. **[#29163] 修复 macOS Seatbelt 下 Git 仓库内启动崩溃**（Open, P1, size/l）— 受限权限环境中 `.git` 目录访问失败导致 CLI 启动崩溃，PR 修复了 `useGitBranchName` 挂载逻辑。 [链接](https://github.com/google-gemini/gemini-cli/pull/29163)

3. **[#29117] MCP OAuth 流程实施 RFC 9207 Issuer 校验**（Open, size/m/l）— 校验授权服务器 issuer 的一致性，防止 token 被错误路由。MCP 安全体系的重要补强。 [链接](https://github.com/google-gemini/gemini-cli/pull/29117)

4. **[#29067] 移除 a2a-server 的误导性安全配置与硬编码凭据**（Open, P1, Security, size/s）— 清理 `coderAgentCard` 中不实的 securitySchemes，删除硬编码秘密，使本地开发端点如实标记为未认证。 [链接](https://github.com/google-gemini/gemini-cli/pull/29067)

5. **[#29063] 修复非交互模式下 Plan Mode 永久等待用户反馈**（Open, P1, size/m）— `gemini -p "..." -y` 场景下 Plan Mode 会等待永远不会出现的用户回合，此次修复将避免非交互运行挂起。 [链接](https://github.com/google-gemini/gemini-cli/pull/29063)

6. **[#28863] 扩展安装前征询环境变更同意并净化运行时环境变量**（Open, help wanted, size/m/l）— 将 MCP server 环境配置纳入同意字符串，并过滤可能篡改运行时行为的环境变量，防止扩展静默注入。 [链接](https://github.com/google-gemini/gemini-cli/pull/28863)

7. **[#29089] 将 abortSignal 透传至 retryWithBackoff**（Open, P2, size/s）— 修复 `BaseLlmClient`（用于摘要、压缩、分类器等）在重试时忽略取消信号的问题。 [链接](https://github.com/google-gemini/gemini-cli/pull/29089)

8. **[#29087] 阻止并发扩展安装竞态**（Open, size/l）— 利用 proper-lockfile 为扩展安装/更新加锁，避免两个进程交叉写入导致元数据损坏。 [链接](https://github.com/google-gemini/gemini-cli/pull/29087)

9. **[#29088] 修复 VS Code IDE Companion 的 stop() 挂起**（Open, size/m）— MCP 流式响应导致 `server.close()` 永不触发，扩展停用时被阻塞。修复后 `stop()` 可正确解析。 [链接](https://github.com/google-gemini/gemini-cli/pull/29088)

10. **[#28889] 恢复能力检测后的暂停 stdin 状态**（Closed, P1, size/m）— `detectCapabilities()` 临时挂载 data 监听器后未恢复 stdin 暂停状态，可能导致管道场景异常。已带回归测试。 [链接](https://github.com/google-gemini/gemini-cli/pull/28889)

## 5. 功能需求趋势

- **Subagent 可靠性与可观测性**：多条 issue 围绕 subagent 的真实状态上报（#22323）、内部轨迹共享（#22598）、子上下文纳入 bug 报告（#21763），社区对 subagent 运行黑盒状态越来越在意。
- **安全加固纵深化**：从文件路径绕过（#29116）、OAuth issuer 校验（#29117）、硬编码凭据清理（#29067）到扩展环境变量净化（#28863），安全类 PR 持续增多。
- **Auto Memory / 记忆系统完善**：#26525、#26522、#26523 等系列 issue 集中反馈记忆系统的脱敏、低信号会话重试、无效 patch 静默丢弃等质量问题，显示记忆功能已进入精细化打磨阶段。
- **AST 感知的代码分析**：#22745/#22746 两条关联 issue 探索 AST 级文件读取、搜索与代码库映射，目标是降低 token 消耗、提高单次工具调用信息密度。
- **模型自主使用工具链的能力**：#21968 “不使用 skills/subsgents” 和 #19873 “原生 bash 亲和力” 共同指向一个方向：让模型更聪明地、主动地运用已有工具，而非仅被动响应指令。

## 6. 开发者关注点

- **卡死与挂起问题最影响体验**：Generalist Agent 挂起（#21409）、Shell 等待输入（#25166）、非交互 Plan Mode 挂起（#29063）等 P1 问题持续被报告，开发者在自动化与批量场景中受影响较大。
- **Subagent 状态可信度不足**：MAX_TURNS 被上报为 GOAL 成功（#22323），模型不主动调用技能（#21968），说明 subagent 的自我认知与实际行为存在系统性偏差。
- **工具数量超限报错**：启用超过 128 个工具时 API 返回 400（#24246），社区期待 agent 能按需裁剪工具范围，而非全部加载。
- **模型破坏性操作与文件管理习惯**：模型会使用 `git reset`/`--force` 等危险命令（#22672），在随机位置创建临时脚本（#23571），开发者希望更安全的执行约束。
- **环境兼容性细节**：macOS Seatbelt（#29163）、Windows NTFS 短名（#29116）、Wayland browser agent（#21983）等平台特定问题仍有缺口，跨平台稳定性是持续性诉求。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-02）

## 今日速览
今日发布两个补丁版本 v1.0.83-1 与 v1.0.83-2，重点增强自定义模型列表、企业登录固定、会话侧栏排序，并收紧 Linux 沙箱网络策略。社区讨论集中在 MCP 协议兼容性、长会话 OOM 崩溃、企业默认模型失效等问题；过去 24 小时无 PR 更新。

## 版本发布

### v1.0.83-2
- **新增**：自定义 agent 可在 `model` 字段中列出多个模型，按顺序尝试，直到找到可用模型；`model-policy: required` 可保持模型不变。
- **新增**：支持 `claude-fable-5.1` 模型。
- **改进**：Linux 沙箱现在限制网络出口到已配置的代理。

### v1.0.83-1
- **新增**：拆分后的 Sessions 侧栏支持 Recent、Created、Name 和经典 None 排序，所选顺序在重启后保留。
- **新增**：企业管理员可通过 `forceLoginOrgs` 托管设置将登录固定到已批准的 GitHub 组织。
- **改进**：优化 `/mcp config` 与 MCP 添加/编辑体验。

---

## 社区热点 Issues

以下是过去 24 小时内更新且最值得关注的 10 个 Issue：

### 1. 恢复长会话时 Node.js 堆内存耗尽崩溃
- **Issue**: [#4664](https://github.com/github/copilot-cli/issues/4664)
- **标签**: `area:sessions`, `area:context-memory`
- **要点**: 恢复长期/大型会话时直接触发 V8 heap OOM，用户无法继续工作。反映会话序列化/上下文记忆机制存在严重内存放大问题。
- **社区反应**: 5 条评论，新报告但影响面大。

### 2. 运行约 37 分钟后 OOM 崩溃，泄漏 31,965 个异步 libuv 句柄
- **Issue**: [#4686](https://github.com/github/copilot-cli/issues/4686)
- **标签**: `area:sessions`
- **要点**: 1.0.82 在 Linux x86_64 上每次会话约 37 分钟必然崩溃，疑似异步资源泄漏，且 SEA 打包导致 `NODE_OPTIONS` 被忽略。
- **社区反应**: 1 条评论，新提交，与 #4664 共同指向会话生命周期管理缺陷。

### 3. 自定义 agent 的 `mcp-servers` 在子 agent 和 `--prompt` 模式中不生效
- **Issue**: [#2630](https://github.com/github/copilot-cli/issues/2630)
- **标签**: `area:non-interactive`, `area:agents`, `area:mcp`
- **要点**: `~/.copilot/agents/` 中声明了 `mcp-servers` 的自定义 agent，作为子 agent（`task` 工具）或 `--prompt` 模式使用时收不到 MCP 工具连接。
- **社区反应**: 9 条评论，1 👍，虽已关闭但今日仍有更新，属于 agent 与非交互模式的关键断点。

### 4. MCP：现代 `server/discover` 成功后仍发送旧版 `initialize`，导致 -32022
- **Issue**: [#4525](https://github.com/github/copilot-cli/issues/4525)
- **标签**: `area:mcp`
- **要点**: CLI 1.0.81-1 先发 `server/discover`，随后又发旧版 `initialize`，与 Python MCP SDK 2.0.0 双时代运行器不兼容。
- **社区反应**: 4 条评论，反映 MCP 协议演进期兼容性问题仍然突出。

### 5. CLI 向自定义 OpenAI 兼容端点发送错误模型 ID
- **Issue**: [#4680](https://github.com/github/copilot-cli/issues/4680)
- **标签**: `triage`
- **要点**: 配置非 OpenAI 模型名（如 `mimo-v2.5`）后，CLI 仍发送 `gpt-5.4-nano` 作为请求体中的模型 ID，导致会话中断。
- **社区反应**: 2 条评论，影响 BYOK/自定义网关用户。

### 6. 企业默认模型配置在 CLI 中被忽略
- **Issue**: [#4692](https://github.com/github/copilot-cli/issues/4692)
- **标签**: `area:enterprise`, `area:models`
- **要点**: VS Code 和 GitHub Desktop 能正确识别企业默认模型 `MAI-Code-1.1-Flash`，但 CLI 提示该模型不可用并回退到默认模型。
- **社区反应**: 3 条评论，今日新开，企业管理员关注度高。

### 7. `disable-model-invocation: true` 使技能完全不可达，而非仅禁止模型自动调用
- **Issue**: [#4438](https://github.com/github/copilot-cli/issues/4438)
- **标签**: `area:agents`
- **要点**: 项目技能设置 `disable-model-invocation` 后，`skill()` 工具返回“Skill not found”，连显式用户请求也无法触发，与设计意图不符。
- **社区反应**: 3 条评论，6 👍，是 skills 行为语义的重要争议。

### 8. 强烈要求 CLI 支持 vi/vim 输入模式
- **Issue**: [#13](https://github.com/github/copilot-cli/issues/13)
- **标签**: 无明确 area 标签
- **要点**: 希望在交互式输入框中获得模态编辑器（Vim/Vi）的键盘操作能力，提升重度终端用户效率。
- **社区反应**: 9 条评论，**75 👍**，是社区长期高需求的功能请求。

### 9. 仓库级自定义 agent 与 skills/.mcp.json 的解析基准目录不一致
- **Issue**: [#3688](https://github.com/github/copilot-cli/issues/3688)
- **标签**: `area:agents`, `area:configuration`
- **要点**: 自定义 agent 在 git root 下发现，而 skills 和 `.mcp.json` 相对 cwd 发现。同一仓库中三种配置来源使用两个不同基准，容易导致路径混淆。
- **社区反应**: 3 条评论，3 👍，配置一致性痛点。

### 10. PowerShell ConstrainedLanguage 模式下每条 shell 命令都报错
- **Issue**: [#4683](https://github.com/github/copilot-cli/issues/4683)
- **标签**: `area:platform-windows`, `area:tools`
- **要点**: 在 AppLocker/WDAC 强制的 PowerShell ConstrainedLanguage 模式（企业常见）下，CLI 追加的退出码 epilogue 调用 `$host.SetShouldExit()` 被拒绝，每次命令都会输出噪音错误。
- **社区反应**: 1 条评论，新提交但企业 Windows 环境受影响范围广泛。

---

## 重要 PR 进展

过去 24 小时内没有 PR 被创建、更新或合并，暂无 PR 进展可汇总。

---

## 功能需求趋势

综合今日全部 Issue，社区最关注的功能方向如下：

1. **MCP 协议成熟度与兼容性**
   - 涉及旧版/新版握手混用、OAuth 刷新、自定义 Header 透传等。
   - 代表：[#4525](https://github.com/github/copilot-cli/issues/4525)、[#4203](https://github.com/github/copilot-cli/issues/4203)、[#4681](https://github.com/github/copilot-cli/issues/4681)。

2. **会话稳定性与上下文持久化**
   - 长会话 OOM、`/compact` 后丢失 AGENTS.md 指令、文件变更归属缺失。
   - 代表：[#4664](https://github.com/github/copilot-cli/issues/4664)、[#4686](https://github.com/github/copilot-cli/issues/4686)、[#4687](https://github.com/github/copilot-cli/issues/4687)、[#4691](https://github.com/github/copilot-cli/issues/4691)。

3. **企业/受管环境适配**
   - 企业默认模型、Windows ConstrainedLanguage、组织级登录固定、持久化写权限配置。
   - 代表：[#4692](https://github.com/github/copilot-cli/issues/4692)、[#4683](https://github.com/github/copilot-cli/issues/4683)、[#4682](https://github.com/github/copilot-cli/issues/4682)。

4. **自定义模型与路由灵活性**
   - BYOK 提供商 403、错误模型 ID、自定义 OpenAI 兼容端点、reasoning effort 快速切换。
   - 代表：[#4680](https://github.com/github/copilot-cli/issues/4680)、[#4414](https://github.com/github/copilot-cli/issues/4414)、[#3074](https://github.com/github/copilot-cli/issues/3074)。

5. **Agent/Skill 配置语义与一致性**
   - `disable-model-invocation` 行为、子 agent MCP 继承、仓库配置基准目录统一。
   - 代表：[#4438](https://github.com/github/copilot-cli/issues/4438)、[#2630](https://github.com/github/copilot-cli/issues/2630)、[#3688](https://github.com/github/copilot-cli/issues/3688)。

---

## 开发者关注点

- **长会话可靠性是当前最大痛点**：多个 OOM/泄漏报告表明，长时间使用后 CLI 容易崩溃，`/compact` 还会丢失项目规则，导致开发中断和上下文缺失。
- **MCP 集成仍处于“能用但脆弱”阶段**：协议版本混杂、OAuth 刷新未实现、初始化顺序错误等问题频繁出现，尤其影响远程 MCP 和自定义 agent。
- **企业与受管环境支持不足**：默认模型在 CLI 中不生效、PowerShell 受限

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-09-02）

## 1. 今日速览

今日 kimi-cli 发布 **v1.50.0**，核心变化是引入「弃用感知」的更新流程，可检测 CDN 上的迁移公告并引导用户一键迁移至 Kimi Code，官方迁移路径正逐步打通。社区方面，3 条 3 月初创建的老 Issue 今日集中关闭，涉及 YOLO 模式可观测性、Windows 取消操作异常与 XDG 规范支持，但均无新增评论，或与项目进入维护收尾阶段有关。

## 2. 版本发布

### v1.50.0
发布链接：https://github.com/MoonshotAI/kimi-cli/releases/tag/1.50.0

**主要变更：**
- **fix(kosong)**：当未声明任何 beta 功能时，不再发送空的 `anthropic-beta` 请求头（[#2580](https://github.com/MoonshotAI/kimi-cli/pull/2580)）
- **chore(release)**：kosong 依赖升级至 v0.56.0（[#2581](https://github.com/MoonshotAI/kimi-cli/pull/2581)）
- **feat(shell)**：弃用感知更新流程——CLI 检测到 CDN 发布迁移公告时，将当前 Python 版本标记为已弃用，并引导用户一键迁移至 Kimi Code（[#2630](https://github.com/MoonshotAI/kimi-cli/pull/2630)）

## 3. 社区热点 Issues

> 过去 24 小时更新共 3 条，筛选条件内全部列出（均为 3 月创建、今日关闭）。

### #1298 [已关闭] [增强] YOLO 模式下增加查看 shell 执行与文件写入内容
- 作者：@Wolido | 👍 0 | 💬 0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1298

**内容**：用户希望在 YOLO 模式下看到 Kimi 实际执行的完整 shell 命令，以及具体向文件写入了什么/修改了什么。当前长命令中间部分被 `...` 省略，无法确认全部细节，一旦出现严重错误难以及时终止。
**点评**：虽然是 6 个月前的老 Issue，但代表了自动化 agent 使用中的高价值可观测性诉求——「信任但需验证」。

### #1297 [已关闭] [Bug] 按 Escape 取消子代理时抛出未处理异常
- 作者：@chriswingler | 👍 1 | 💬 0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1297

**内容**：在 Windows 10 x64 平台上，用户按 Escape 键取消子代理时出现 `Unhandled exception`（摘要信息截断）。
**点评**：Windows 平台交互路径的异常处理问题，获得 1 个👍，但 0 条评论，属于反馈数量较少但真实存在的小型缺陷。

### #1294 [已关闭] [增强] 请遵循 XDG Base Directory 规范
- 作者：@sisrfeng | 👍 1 | 💬 0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1294

**内容**：用户希望使用 `~/.config/kimi` 作为配置目录，而不是 `~/.kimi`，以遵循 XDG Base Directory 规范，避免在 `$HOME` 下堆积 dotfile。
**点评**：命令行工具的经典诉求。虽然只获得 1 个👍，但这在开源 CLI 社区是长期积怨点，新项目通常会默认遵循。

## 4. 重要 PR 进展

> 过去 24 小时更新共 4 条，筛选条件内全部列出。

### #2630 [已关闭] feat(shell): 弃用感知的更新流程，一键迁移到 Kimi Code
- 作者：@jackfish212 | 更新：2026-09-01
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2630

**内容**：当 CDN 发布弃用/迁移公告（`https://cdn.kimi.com/kimi-code-tips/kimi_cli/migration.json`）后，CLI 会将当前 Python 版本视为已弃用，并驱动用户执行一键迁移。
**点评**：这是 kimi-cli → Kimi Code 迁移工作的核心机制，已合入 v1.50.0。官方在迁移策略上选择了「服务端可控、客户端感知」的方案。

### #2632 [已关闭] chore(release): bump kimi-cli 至 1.50.0
- 作者：@sailist | 更新：2026-09-01
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2632

**内容**：发布流程 PR，将 kimi-cli 版本号推进到 1.50.0，同步 `packages/kimi-code` 的 wrapper 版本及其 `kimi-cli==1.50.0` 依赖 pin。已通过版本一致性校验脚本。
**点评**：标准

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：2026-09-02** | 数据来源：github.com/anomalyco/opencode

---

## 今日速览

- **v1.18.26 发布**，修复了 Claude 5 会话容错、Bedrock GPT-5.6 推理配置及工具调用计时不准确等核心问题，其中工具调用计时问题直接对应社区高赞 Issue #32574。
- 社区本周热度集中在**项目目录重命名/移动导致会话丢失**这一顽疾，桌面端已有近 10 个相关 Issue 被关联讨论；非交互模式 `opencode run` 的静默失败问题也持续引发关注。
- 大量 UI/UX 修复 PR 集中合入（约 15 个），多为桌面端标签页、间距、图标等细节打磨，另有 1 个核心修复 PR（#46751）确保压缩时保留会话上下文。

---

## 版本发布

### v1.18.26

**核心修复：**
- **Claude 5 会话容错**：现在可容忍过期的思考块（stale thinking blocks），不再在提示词或工具变更后失败。
- **Bedrock GPT-5.6 兼容性**：新增接受 `none` 推理力度（reasoning effort）配置。
- **Bedrock 稳定性**：推理与重放（replay）处理逻辑更可靠（感谢 @pengzh1）。
- **工具调用计时**：修复 start/end 时间报告不准确的问题（对应 Issue #32574 的关闭）。

---

## 社区热点 Issues（10 条）

### 1. #32574 工具调用起始时间报告不正确 — CLOSED
- **作者**：@bartlettroscoe | 评论 9 | 👍 13 | 创建 2026-06-16 | 更新 2026-09-02
- **链接**：https://github.com/anomalyco/opencode/issues/32574
- **要点**：用户使用 1.17.6 观察到 timing 块中 start/end 时间间隔过短，经 Codex + GPT-5.5 排查后怀疑是 start 时间重置逻辑缺陷。
- **分析**：社区高赞榜首，已随 v1.18.26 修复关闭，是本次发布的核心用户诉求。

### 2. #15226 `tool_choice: 'required'` 与推理模型不兼容 — CLOSED
- **作者**：@bralca | 评论 8 | 👍 6 | 创建 2026-02-26 | 更新 2026-09-02
- **链接**：https://github.com/anomalyco/opencode/issues/15226
- **要点**：使用 `json_schema` 结构化输出时，OpenCode 会无条件为内部工具设置 `toolChoice: "required"`，导致默认启用思考的推理模型（如 Kimi K2.5）被下游 Provider 拒绝。
- **分析**：长时间未关闭的高价值兼容性问题，影响 reasoning 类模型的接入体验。

### 3. #36413 `opencode run` 工具调用被拒后静默退出且无输出 — OPEN
- **作者**：@oldantique | 评论 6 | 👍 0 | 创建 2026-07-11 | 更新 2026-09-02
- **链接**：https://github.com/anomalyco/opencode/issues/36413
- **要点**：非交互模式下，若权限系统自动拒绝工具调用且模型无最终文本输出，进程以 exit code 0 退出且无 stdout，自动化管道无法检测到失败信号。
- **分析**：CLI 自动化场景的典型痛点，无机器可读的错误信号，影响 CI 集成可靠性。

### 4. #44688 升级缺少 tool-part `state.input` 数据迁移 — OPEN
- **作者**：@aman-kumar-gw | 评论 5 | 👍 0 | 创建 2026-08-24 | 更新 2026-09-02
- **链接**：https://github.com/anomalyco/opencode/issues/44688
- **要点**：从 1.14.28 升级到 1.18.18 缺少数据迁移：旧版本中 `state.input` 可持久化为 JSON 字符串，新版本 schema 要求对象，导致升级后数据不兼容。
- **分析**：升级路径中的隐蔽破坏性问题，跨多个版本仍存在，需要官方提供迁移方案。

### 5. #33704 GUI 编辑自定义 Provider 与管理模型列表 — OPEN（功能请求）
- **作者**：@akierum | 评论 4 | 👍 2 | 创建 2026-06-24 | 更新 2026-09-02
- **链接**：https://github.com/anomalyco/opencode/issues/33704
- **要点**：请求在桌面端 GUI 中直接管理自定义 Provider（如 LM Studio、Jan AI），

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-02

## 今日速览

今日社区聚焦 **OpenTUI 迁移** 的持续推进（跟踪 issue #8662 评论数达 20 条），以及 `qwen serve` / daemon 在高负载下的稳定性问题集中暴露，多个 P1 级 Bug（#10780、#10218）正在处理中。此外，0.22.3 版本出现若干回归问题，包括 sampler 初始化失败与扩展安装静默退出，开发团队已有多项修复 PR 在途。

---

## 社区热点 Issues

1. **TUI 渲染层迁移：ink → OpenTUI（跟踪）**
   - **Issue**: [#8662](https://github.com/QwenLM/qwen-code/issues/8662)
   - **优先级**: P3 · enhancement · roadmap/terminal-ux
   - **重要性**: 当前最热门的长期工程。ink 7 补丁行数超过 1000 行，带来闪烁、渲染结构性问题；迁移到 OpenTUI 是根治方案。评论 20 条，持续更新。
   - **社区反应**: 讨论活跃，多轮 review 的 deferred 项已拆分到 #10728、#10716 等子任务中。

2. **0.22.3 回归：400 Failed to initialize samplers**
   - **Issue**: [#10530](https://github.com/QwenLM/qwen-code/issues/10530)
   - **优先级**: P2 · bug · category/tools
   - **重要性**: 影响 llama-server 本地模型用户（Qwen 3.8 27b / 3.6 35b），0.22.3 起才出现，Gemma 等其他模型正常。属于典型的版本回归。
   - **社区反应**: 5 条评论，用户已对比确认 Pi 和 OpenCode 无此问题。

3. **permissions.allow 语义变更：未覆盖工具被直接禁用**
   - **Issue**: [#10218](https://github.com/QwenLM/qwen-code/issues/10218)
   - **优先级**: P1 · bug · scope/settings
   - **重要性**: 0.22.1 起 `allow` 列表从"自动批准"变为"注册表白名单"，未覆盖工具不再询问，直接报错禁用，且需重启才能重新评估。这属于安全模型的重要行为变更，影响所有使用权限配置的用户。
   - **社区反应**: 5 条评论，用户指出文档未同步说明该语义变化。

4. **P1：reconnect 洪泛导致无关会话被阻塞或关闭**
   - **Issue**: [#10780](https://github.com/QwenLM/qwen-code/issues/10780)
   - **优先级**: P1 · bug · daemon
   - **重要性**: 长会话（数百轮、10^5–10^6 tokens）重连时，完整历史回放和命令快照产生数 MB 数据涌入有界 ACP 传输通道，可能拖垮无关会话。影响大规模使用 `qwen serve` 的稳定性。
   - **社区反应**: 3 条评论，由 @yiliang114 提交，属于 dogfooding 中发现的高优先级问题。

5. **API Error: No stream activity for 120000ms**
   - **Issue**: [#5975](https://github.com/QwenLM/qwen-code/issues/5975)
   - **优先级**: P2 · bug · category/core/integration/performance
   - **重要性**: 用户升级到 v0.19.3 后频繁出现流中断（120 秒无活动即报错），此前版本正常。持续 3 个月仍被关注，评论 15 条，说明该问题影响范围广且复现率高。
   - **社区反应**: 已关闭，但讨论热度不减，是社区反馈最多的性能相关 issue 之一。

6. **TUI 鼠标滚动加载历史命令而非滚动对话**
   - **Issue**: [#10749](https://github.com/QwenLM/qwen-code/issues/10749)
   - **优先级**: P2 · bug · category/ui
   - **重要性**: 鼠标滚轮/触控板滚动时，预期滚动会话历史，实际变成将旧命令加载到输入框。直接影响日常交互体验。
   - **社区反应**: 3 条评论，需在 OpenTUI/ink 双渲染层下共同修复。

7. **serve 会话重载：被中断的 turn 隐藏已持久化的 assistant 消息**
   - **Issue**: [#10710](https://github.com/QwenLM/qwen-code/issues/10710)
   - **优先级**: P2 · bug · daemon
   - **重要性**: 当 ACP 通道在 turn 进行中被拆除（如 #10162 的队列限制），该 turn 的 assistant 输出虽已持久化，但重载会话后不显示。属于数据一致性问题，影响用户对会话状态的信任。
   - **社区反应**: 4 条评论，与 #10162 直接相关。

8. **ACP NDJSON 通道队列饱和时应优雅降级**
   - **Issue**: [#10162](https://github.com/QwenLM/qwen-code/issues/10162)
   - **优先级**: P2 · enhancement · daemon
   - **重要性**: 当前队列超限即整个 channel 被拆除（fail-closed），生产环境触发时影响面过大，需要优雅降级策略。
   - **社区反应**: 5 条评论，是 #10710 和 #10780 的共同根因之一。

9. **Channels：移除 workspace 后残留 stale selection 阻塞新启动**
   - **Issue**: [#10782](https://github.com/QwenLM/q

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*