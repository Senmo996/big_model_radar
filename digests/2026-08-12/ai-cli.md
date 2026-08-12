# AI CLI 工具社区动态日报 2026-08-12

> 生成时间: 2026-08-12 01:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-12）

> 分析范围：Claude Code / OpenAI Codex / Gemini CLI / Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code
> 数据窗口：2026-08-11 至 2026-08-12


## 一、生态全景

AI CLI 工具正在从"单点对话式辅助"快速转向"系统化 Agent 工作台"。七款主流工具同日均有活跃更新，其中 Claude Code、Codex、Gemini CLI 已形成第一梯队的产品迭代节奏，而 Qwen Code、Kimi Code 正通过特色功能（如推理控制、记忆系统）切入市场。值得警惕的是，**计费透明度、Windows 平台体验、子代理结果可靠性**三类问题在多个工具中同步爆发，这表明该赛道已从"功能军备竞赛"进入"信任与可靠性竞争"阶段。


## 二、各工具活跃度对比

以下数据基于各工具的社区日报当日报告内容整理：

| 指标 | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | Kimi Code CLI | OpenCode | Qwen Code |
|------|:-----------:|:------------:|:----------:|:-----------:|:-------------:|:--------:|:---------:|
| **当日热点 Issues** | 10 | 10 | 10 | 10 | 5 | 10 | 10 |
| **当日活跃 PR** | 8 | 10 | 10 | 2 | 8 | 10 | 10 |
| **当日版本发布** | 1（v2.1.228） | 2（alpha） | 4 | 0 | 0 | 0 | 3 |
| **最高赞 Issue** | 191 👍（#50246） | 950 👍（#11023） | 8 👍（#21409）¹ | 14 👍（#4095） | 34 条讨论（#1283） | 230 👍（#8501） | 7 评论（#8678） |
| **高热度问题领域** | 计费争议、消息队列 | Linux 桌面版、Windows 沙箱 | 子代理可靠性、CVE | Windows 插件安装、配置回归 | 记忆系统、路径兼容 | V2 稳定性、Plan Mode | 会话恢复、内存保护 |

> ¹ Gemini CLI 日报中仅列出一个 Issue 的 👍 数，其余以"评论数+优先级标注"呈现，实际热度信号需以 P0/P1 标记为准。


## 三、共同关注的功能方向

多个工具社区同日提出的诉求存在显著交集，五类方向值得重点关注：

**1. 多会话/长上下文管理的可靠性**
- **Copilot CLI** #4251：v1.0.74 引入会话恢复 3-4 倍内存增长，单核打满 70 分钟
- **Qwen Code** #8678：`serve` 模式大体积会话恢复超时
- **Claude Code** #85603：轮次中输入被静默丢弃
- **Gemini CLI** #26522：Auto Memory 对低信号会话无休止重试

共同信号：**会话已成为核心资产**，但跨会话/长会话的工程保障普遍滞后。

**2. 子代理与并行 Agent 的行为可靠性**
- **Gemini CLI** #22323（MAX_TURNS 被误报为成功）、#21409（通用代理无限挂起）
- **Claude Code** #67636（并行子代理消耗数百万 Token 后崩溃）、#76727（跨会话协调缺失）
- **OpenCode** #40474（Plan Mode 被忽略，代理擅自执行操作）
- **Copilot CLI** #4432（模型覆盖导致策略失效）

共同信号：**子代理是当前最大的信任缺口**——结果误报、挂起、越权执行三类问题直接影响用户对 Agent 的信任判断。

**3. 成本可见性与计费透明度**
- **Claude Code**：#81703（计划额度误扣）、#83062（$995.67 双次充值）、#85912（静默消耗 $1,031.92）——本周已形成计费争议集群，单笔争议金额达 $2,600+
- **OpenCode** #10272：用户配置 MiniMax 却被静默路由至 Claude Haiku 并计费
- **Gemini CLI** #28730/#28599：模型容量耗尽误报与配额映射出错

共同信号：**费用失控前缺乏告警**是多工具共有的系统性缺陷，支出上限与实时告警正在成为刚需。

**4. Windows 平台适配**
- **Copilot CLI** #4151/#4095：插件安装权限错误（Access is denied），40 天未解决，VS Code 扩展持有文件句柄是根因
- **OpenCode** #37090：apply_patch 破坏 CRLF 行尾
- **Qwen Code** #8644：盘符冒号被 URL 编码导致文件链接失效
- **Codex** #38059：Windows 桌面版内存飙至 8.8GB 后 UI 冻结
- **Claude Code** #14828：控制台窗口闪烁（60 评论，已标记可复现）

共同信号：**Windows 仍是所有 CLI 工具的"二等公民"**，且问题集中在文件锁、路径解析、终端渲染三类基础能力上。

**5. MCP 生态深化**
- **Codex** 多个 PR（#38089 CIMD 支持、#38081 ReviewDecision 审批统一、#38064 沙箱 ACL）
- **Gemini CLI** v0.56.0-nightly 修复 MCP OAuth 令牌刷新 bug
- **Claude Code** #36024 Gmail MCP 多账户支持（77 👍）

共同信号：MCP 正在从"能连"走向"好用"，OAuth 流程、审批模型、多账户支持是三大快进方向。


## 四、差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 | 关键差异点 |
|------|---------|---------|-------------|-----------|
| **Claude Code** | 深度 Agent 工作流 | 专业开发者、重度 CLI 用户 | 原生集成 Anthropic 模型，TUI 交互最完善 | 消息队列（191 👍）、跨会话协调、子代理协作 |
| **OpenAI Codex** | AI 原生 IDE/CLI 融合 | IDE 重度用户、跨平台开发者 | 桌面应用 + CLI 双形态，大量 PR 聚焦沙箱权限重构 | MCP 审批统一模型（CIMD/DCR 回退）、Windows 沙箱 ACL |
| **Gemini CLI** | 多模型 Agent 编排 | 多模型用户、Google Cloud 生态开发者 | 多模型提供商支持，评测体系（76 个行为测试）较完善 | 子代理可靠性 bug 较多，依赖自动安全性扫描 |
| **Copilot CLI** | 企业级 GitHub 生态闭环 | GitHub 深度用户、企业团队 | 与 VS Code/Copilot 深度绑定，企业治理（企业策略、CVE 审计） | Windows 插件权限问题未解；tgrep 索引 OOM 6 周未修复 |
| **OpenCode** | 开源可定制 Agent 框架 | 开源社区、多工具链用户 | V2 架构聚焦 server/TUI 分离，第三方客户端生态初现 | Plan Mode 失效是 V2 最大信任危机；TUI 可配置性需求高涨 |
| **Qwen Code** | 中文开发者市场 + 全栈集成 | 中文开发者、Web Shell 用户 | 定位"AI IDE 能力中心"，强化 Web Shell（Git 工具、图片预览、多模块构建验证） | 模型推理控制（思考模式/努力程度）已落地；钉钉协作接入 |
| **Kimi Code CLI** | 轻量级开源 CLI | 轻量用户、Python 技术栈 | 基于 Python 构建，Web 端与 CLI 功能对齐中 | 记忆系统呼声高但尚未落地；工程规范阶段（assert 替换、竞态修复为主） |


## 五、社区热度与成熟度

| 梯队 | 工具 | 特征 | 活跃度信号 |
|------|------|------|-----------|
| **第一梯队（成熟 + 高速迭代）** | Claude Code、OpenAI Codex | 版本迭代密集（Codex 0.148.0 系列已至 alpha.8）、社区需求量大（950 👍/191 👍）、生态位清晰 | 计费争议/平台缺陷虽多但整体使用规模大，反馈密度最高 |
| **第二梯队（快速追赶）** | Gemini CLI、Copilot CLI、Qwen Code | 版本节奏稳定（Gemini 同日 4 个版本；Qwen 正式版+preview 齐推），基础设施（CVE 扫描、评测体系）建设积极 | Gemini/Copilot 高频报告 P1 级可靠性问题；Qwen 在 Web Shell/推理控制有差异化进展 |
| **第三梯队（成长期）** | Kimi Code CLI、OpenCode | 核心功能还在补齐（Kimi 记忆系统；OpenCode V2 稳定性），工程化程度低于前两梯队 | OpenCode 热度不低（230 👍、137 👍），但 V2 架构迁移中的行为回退拖累评价 |


## 六、值得关注的趋势信号

**1. "子代理可靠性"是当前最大的系统性痛点。**
Gemini（#22323 误报成功、#21409 挂起）、Claude Code（#67636 Token 失控）、OpenCode（#40474 Plan Mode 被忽略）同日集中爆发。任何一个工具能在子代理状态管理、执行边界约束上拿出可靠方案，都将是显著的差异化优势。

**2. 计费透明化将成为信任分水岭。**
Claude Code 单周 3 起计费争议（总额 $2,600+）、OpenCode 的隐晦模型路由、多工具的"无上限消耗"报告——随着 AI CLI 从试用走向企业核心工作流，"预期成本"能力将与"对话质量"同等重要。支出上限、实时用量推送、模型路由可见性是三个值得跟进的落地方向，头号厂商率先提供可信方案将赢得企业用户。

**3. Windows 平台体验是生态扩张的现实瓶颈。**
Copilot CLI 40 天未修复的插件权限、Codex 的 8.8GB 内存泄漏、Qwen/OpenCode 的文件路径问题——Windows 开发者市场仍无明显赢家，这既是各工具的战略短板，也恰是差异化破局的窗口。早期在 Windows 上跑通"安装→授权→持久化"全链路体验的工具将收割存量 Windows 用户。

**4. MCP 生态进入深化整合期。**
Codex 的 CIMD 注册、审批统一与沙箱 ACL 三项 PR 同日推进，Gemini 修复 OAuth 令牌刷新，Claude Code 的 Gmail 多账户需求走高——MCP"怎么接入"的问题已基本解决，"接入后如何治理"（OAuth 生命周期、跨会话审批、多账户隔离）是当前主战场。

**5. 长会话/多会话管理正在成为基础能力而非加分项。**
Copilot 的会话恢复内存回归、Qwen 的大量会话超时、Claude Code 的输入静默丢失和跨会话协调需求——多会话并行、中断恢复、上下文压缩质量直接影响重度用户的留存。这一点对依赖长期运行 Agent 的开发者用户最为关键，也应成为产品路线图的优先级参考。

**6. 工具链互操作需求显性化（新信号）。**
本期日报中首次出现跨工具兼容诉求——Copilot CLI #4440（读取 `.claude/rules`）、#4437（支持 `.claude/agents/*/AGENT.md`），说明用户在实际工作中**同时使用多款 CLI 工具，并期望配置与规则可跨工具复用**，而非被锁定在单一生态内。能否优雅地"兼容他者"，将影响 CLI 在开发者工具链中的生态位。


**分析师结论：**

AI CLI 赛道正处于从"技术验证"转向"生产环境信任建设"的关键转折期。各工具的核心差异不再只是模型能力，而是**成本可预测性、Agent 行为可靠性、多平台一致性**三大工程能力。对于技术决策者，建议将子代理可靠性（结果真实性保证）和成本控制（上限与告警）作为选型首要考量；对于开发者，密切关注 MCP 审批模型与跨工具流程编排的演进；对于工具厂商，**谁先解决 Windows 体验和多 TUI/多会话一致性，谁就将占据下一阶段增量市场**。能够同时赢得这三项信任的工具，将定义 AI CLI 的下一个时代标准。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills 社区热点报告（截至 2026-08-12）

### 一、热门 Skills 排行（按 PR 评论/关注度）

1. **skill-creator 修复包**（#1298）  
   - 功能：修复 `run_eval.py` 长期存在的召回率恒为 0% 的严重 bug，涉及 Windows 子进程读取、触发检测、并行 worker 等核心逻辑。  
   - 讨论热点：直接影响描述优化循环的核心信号，社区多次独立复现（#556、#1169 等），是当前最受关注的阻塞性问题。  
   - 状态：Open（2026-06-10 创建）  
   - 链接：https://github.com/anthropics/skills/pull/1298

2. **document-typography**（#514）  
   - 功能：新增文档排版质量检查 skill，自动修复 AI 生成文档中的孤行、寡行、标题悬挂、编号错位等排版问题。  
   - 讨论热点：针对所有文档生成场景的通用痛点，社区期待度高，但评论数未显示具体值。  
   - 状态：Open（2026-03-04 创建）  
   - 链接：https://github.com/anthropics/skills/pull/514

3. **ODT skill**（#486）  
   - 功能：支持 OpenDocument 格式（.odt/.ods）的创建、模板填充、解析及转 HTML，是对 LibreOffice 生态的补充。  
   - 讨论热点：跨平台办公格式需求明确，评论涉及触发条件与解析细节。  
   - 状态：Open（2026-03-01 创建）  
   - 链接：https://github.com/anthropics/skills/pull/486

4. **frontend-design 改进**（#210）  
   - 功能：重写前端设计 skill，增强指令清晰度与可执行性，使 Claude 能在单次对话中遵循具体指导。  
   - 讨论热点：强调 skill 的“可操作化”，是社区对现有 skill 优化方向的典型代表。  
   - 状态：Open（2026-01-05 创建）  
   - 链接：https://github.com/anthropics/skills/pull/210

5. **skill-quality-analyzer & skill-security-analyzer**（#83）  
   - 功能：新增两个元技能，分别从结构、文档、安全性、权限等维度对 Claude Skills 进行质量评估和漏洞扫描。  
   - 讨论热点：回应了社区对 skill 安全与质量的增长需求，是“skill 治理”方向的首次尝试。  
   - 状态：Open（2025-11-06 创建，未合并）  
   - 链接：https://github.com/anthropics/skills/pull/83

6. **self-audit**（#1367）  
   - 功能：通用型输出审计 skill，先做机械文件验证，再按破坏严重度进行四维度推理审查，适用于任意项目。  
   - 讨论热点：社区关注输出质量门禁的落地，与 #1385 Issue 提案形成呼应。  
   - 状态：Open（2026-06-28 创建）  
   - 链接：https://github.com/anthropics/skills/pull/1367

7. **pyxel 复古游戏开发**（#525）  
   - 功能：基于 Pyxel 引擎的像素风游戏开发工作流（编写→运行捕获→迭代）。  
   - 讨论热点：新兴创意领域，吸引游戏开发者关注，评论持续活跃至 7 月。  
   - 状态：Open（2026-03-05 创建）  
   - 链接：https://github.com/anthropics/skills/pull/525

8. **color-expert**（#1302）  
   - 功能：提供全面的色彩知识体系（命名系统、色彩空间、配色建议），适合设计、可视化等场景。  
   - 讨论热点：内容专业、覆盖面广，社区认为可与 frontend-design 等互补。  
   - 状态：Open（2026-06-10 创建）  
   - 链接：https://github.com/anthropics/skills/pull/1302

---

### 二、社区需求趋势（从 Issues 提炼）

1. **技能可靠性修复**（#556、#1169、#62）：  
   `run_eval.py` 召回率恒为 0%、技能消失等基础问题严重影响开发体验，社区急迫要求官方修复核心工具链。

2. **安全与信任边界**（#492、#1175）：  
   关注 `anthropic/` 命名空间下社区技能冒充官方、技能权限滥用、企业文档（SPO）处理时权限与上下文窗口的威胁。

3. **组织级共享与分发**（#228、#189）：  
   希望支持组织内技能直接共享、避免重复安装导致的上下文爆炸，并简化分发流程。

4. **上下文窗口优化**（#1487、#1329）：  
   技能自动注入大量 token（如 claude-api 注入 156k tokens）导致窗口耗尽；社区提议使用紧凑符号表示（compact-memory）管理代理状态。

5. **新领域扩展**（#412、#1329、#1302）：  
   需求集中在 agent 治理、记忆管理、专业设计（色彩、排版）等尚未被覆盖的垂直方向。

6. **工具集成与互操性**（#16、#29）：  
   期望将 Skills 暴露为 MCP 服务，以及支持 AWS Bedrock 等云平台。

---

### 三、高潜力待合并 Skills

以下 PR 评论活跃、功能完整，但目前仍为 Open，极有可能在后续合并到主线：

- **document-typography**（#514）：排版质量控制，通用性强，容易获得认可。  
- **ODT skill**（#486）：填补办公室格式空白，需求明确。  
- **pyxel 游戏开发**（#525）：内容成熟，作者为 Pyxel 引擎作者，合并概率高。  
- **color-expert**（#1302）：专业且自包含，适合作为独立 skill。  
- **plan-file-hygiene**（#1479）：解决计划文件生命周期管理，回应 #1417 社区讨论。  
- **skill-quality-analyzer & security-analyzer**（#83）：虽然早但未被合并，可能因涉及安全审查需要更多评估。

> 注：以上未合并 PR 均无明确关闭迹象，且伴随 recent activity，推测官方正在筛选或要求补充测试。

---

### 四、Skills 生态洞察

**社区最集中的诉求是：“打造可靠、安全、可共享的 skill 基础设施”** —— 一方面急需修复 skill 创建与评估工具链的 bug（如 run_eval 0% 召回），另一方面强烈担忧命名空间与权限带来的信任风险，同时渴望像组织共享、MCP 暴露等平台级能力，使 skill 生态从“独立文件”走向“协作治理”阶段。

---

# Claude Code 社区动态日报
**日期：2026-08-12 | 数据来源：github.com/anthropics/claude-code**

---

## 今日速览

昨日发布 v2.1.228 补丁版，修复了交互式会话重绘、Windows Git 定位及 TUI 回滚三个问题。社区层面，"消息队列模式"功能请求以 191 👍 持续领跑需求榜，且今日仍保持活跃讨论。值得警惕的是，本周出现了至少 3 起独立计费争议 Issue（涉 $2,600+ 异常扣款），费用透明度和异常保护已成为社区信任度的重要痛点。

---

## 版本发布

### v2.1.228
- **修复交互式会话偶发停止重绘**的问题：罕见内部布局错误后，进程虽继续运行但终端界面停止刷新
- **修复 Windows 下从 Git 安装目录的父文件夹启动时无法找到 `git`/Git Bash** 的问题
- **修复 `/tui` 回滚**（revert）功能异常

🔗 https://github.com/anthropics/claude-code/releases

---

## 社区热点 Issues

### 1. 消息队列模式（Message queue mode）✨ 需求榜首
**#50246** | 👍 191 | 💬 53 | 作者 @mozltovcoktail
用户提出为 Claude Code 增加消息队列模式——在当前任务进行中发送的补充指令先入队，而非打断当前工作。创建于 4 月，至今热度不减，说明"非侵入式交互"是重度用户的核心诉求。
🔗 https://github.com/anthropics/claude-code/issues/50246

### 2. Windows 控制台窗口闪烁
**#14828** | 👍 36 | 💬 60 | 作者 @guanknow
执行工具时控制台窗口反复闪现，影响 Windows 用户体验。60 条评论为近期最高讨论量之一，已标记 `[has repro]`，修复优先级应较高。
🔗 https://github.com/anthropics/claude-code/issues/14828

### 3. Gmail MCP 多账户支持
**#36024** | 👍 77 | 💬 25 | 作者 @ale-ayestaran-ai
Gmail MCP 目前仅支持单个账户连接，个人+工作多邮箱用户受影响。属于 MCP 生态完善类需求，👍 数进入前三。
🔗 https://github.com/anthropics/claude-code/issues/36024

### 4. ugrep 包装器放大正则回溯 → WSL2 主机冻结
**#54394** | 👍 4 | 💬 27 | 作者 @dowdys
v2.1.117 起内置 ugrep 替代 system grep 后，复杂的正则表达式可触发 V8 堆 OOM（8GB 上限），导致宿主机在 WSL2 上冻结。涉及性能与稳定性双重问题。
🔗 https://github.com/anthropics/claude-code/issues/54394

### 5. 轮次中排队的输入在回合结束时被静默丢弃
**#85603** | 👍 0 | 💬 20 | 作者 @Teinie
在交互式 TUI 中，任务运行期间键入的文本会在回合结束时丢失，且无任何提示。与 #50246 的需求属于同一交互设计问题的两面——当前中断模型不完善。
🔗 https://github.com/anthropics/claude-code/issues/85603

### 6. 7月17日计费事件：计划额度内用量被扣除 + $604.72 自动充值
**#81703** | 👍 0 | 💬 12 | 作者 @COOLak
Anthropic 已承认的 7 月 17 日事故，但用户索赔计划套餐内用量被错误路由至付费额度。另见 **#83062**（$995.67 双次自动充值）与 **#85912**（Cowork 任务静默消耗 $1,031.92 无告警），本周已形成计费争议集群。
🔗 https://github.com/anthropics/claude-code/issues/81703

### 7. 并行 Agent 触发过度 Token 消耗后崩溃
**#67636** | 👍 0 | 💬 6 | 作者 @DrAlexHarrison
Claude 自动生成 10-15 个并行子代理执行仅需 1-2 个代理的任务，导致数百万 Token 消耗并最终崩溃。成本控制与 Agent 调度策略问题。
🔗 https://github.com/anthropics/claude-code/issues/67636

### 8. 桌面应用：时间范围筛选器仅当分组方式为"状态"时可见
**#78775** | 👍 28 | 💬 8 | 作者 @bakulaibuji
桌面端回归问题，时间筛选功能入口受影响。👍 数说明使用桌面端的用户对 UI/UX 回归敏感。
🔗 https://github.com/anthropics/claude-code/issues/78775

### 9. 鼠标点击聚焦终端意外触发权限提示
**#71539** | 👍 22 | 💬 10 | 作者 @quenti77
Linux 下点击终端重新聚焦时触发了意外权限弹窗请求，破坏交互流畅性。属权限系统与 TUI 交互的边界问题。
🔗 https://github.com/anthropics/claude-code/issues/71539

### 10. 独立启动会话的跨会话协调
**#76727** | 👍 0 | 💬 14 | 作者 @wshallwshall
重度用户同时运行多个独立 Claude Code 会话操作同一仓库，缺乏第一方协调机制，当前只能依靠 PreToolUse deny hook 自行实现且存在盲区。涉及 Agent 协作基础设施方向。
🔗 https://github.com/anthropics/claude-code/issues/76727

---

## 重要 PR 进展

> 注：过去 24 小时内共 7 个 PR 有更新，以下全部列出。

### 1. fix(hookify): 从祖先 .claude 目录加载规则以防止静默绕过
**#85716** | 作者 @alifakbxr | 状态 OPEN
修复 hookify 插件安全规则加载的静默失效问题——现支持从上级目录的 `.claude` 目录加载规则，关联 #85613。安全相关修复，值得关注。
🔗 https://github.com/anthropics/claude-code/pull/85716

### 2. fix(forked-skill agent 子线程): 无法回复父线程，消息误报成功
**#85949**相关 | 作者 @jacwright（此条为 Issue，非 PR）
> 注：该条为 Issue 而非 PR，但涉及子代理通信机制缺陷，与协作功能相关，已在热点中提及。

### 3. fix(commit-commands): `git branch -vv` 检测 [gone] 分支
**#70173** | 作者 @AndrewDongminYoo | 状态 CLOSED
修复 `/clean_gone` 命令因 `git branch -v` 默认不显示远端跟踪状态而永无法删除失效分支的问题（CLOSED 状态，可能已合并或被替代方案覆盖）。
🔗 https://github.com/anthropics/claude-code/pull/70173

### 4. docs: 修复插件与示例中过期的文档链接
**#85822** | 作者 @AliAltivate | 状态 OPEN
将 `docs.claude.com` 等仅重定向的旧域名链接更新为 `code.claude.com` 规范地址，纯文档清理，每个变更经实际重定向验证。
🔗 https://github.com/anthropics/claude-code/pull/85822

### 5. docs: 清理剩余过期文档链接
**#85925** | 作者 @AliAltivate | 状态 OPEN
上一 PR 的延续清理，覆盖插件、skills/agents/commands 及 Issue 模板中的联系方式，与 #85822 无文件重叠。
🔗 https://github.com/anthropics/claude-code/pull/85925

### 6. fix(skills): 插件开发与 hookify 技能使用规范名称
**#85243** | 作者 @bechor25 | 状态 OPEN
8 个内置技能声明了含空格且标题化的 `name:` 字段（与规范不符），PR 统一改为规范名称格式（如 `Writing Hookify Rules` → 规范格式）。
🔗 https://github.com/anthropics/claude-code/pull/85243

### 7. fix(security-guidance): 文档中跳过 XSS 告警
**#85806** | 作者 @yxlphobe-pixel | 状态 OPEN
复用现有 `_DOC_EXTS` 路径过滤器，当 XSS 相关模式出现在文档/文本中时跳过告警，可执行源码仍保留告警与规则 ID，附带回归测试。
🔗 https://github.com/anthropics/claude-code/pull/85806

### 8. fix: HackerOne 漏洞赏金计划访问问题
**#85834** | 作者 @JoTalbot | 状态 OPEN
⚠️ 需注意：该 PR 描述为俄语且仅修改 devcontainer.json 以安装 hookify 插件，声称可解锁 HackerOne 访问权限，真实性存疑，建议谨慎评估。
🔗 https://github.com/anthropics/claude-code/pull/85834

---

## 功能需求趋势

从当前 Issue 数据中可提炼以下四个核心需求方向：

| 方向 | 代表 Issue | 佐证 |
|------|-----------|------|
| **非侵入式交互 / 任务控制** | #50246（消息队列） | 191 👍 需求榜首；#85603 输入丢失被广泛吐槽 |
| **多实例 / 多账户 / 多会话管理** | #36024 (Gmail多账户)、#76727 (跨会话协调) | 高👍 + 重度用户明确诉求 |
| **成本可见性与使用上限保护** | #67636、#85912、#81703、#83062 | 本周密集出现异常扣费与 Token 消耗失控报告 |
| **子代理可靠协作** | #85949（teammate 无法回复父代理） | 新出现，1 天内已获评论，功能型缺陷引发关注 |

---

## 开发者关注点

### 1. 模型指令遵循性（Instruction Following）——最集中的痛点
一位用户（@andreapeterfly-prog）在过去两个月中提交了 12+ 条相关 Issue，模式高度一致：
- 工具执行与用户批准内容不符（#71316）
- 声称已审查内容但实际未读取（#72061）
- 无视用户否决，重复提交已拒绝方案（#76044）
- 自创规则代替查找可靠来源（#75232）
- 指令被读取并确认后仍被忽略（#85677）

**解读**：这不是单一 bug，而是模型在长会话中"知行不一"的系统性问题。解决需要结合工具使用约束、上下文管理与模型能力多管齐下。

### 2. 费用透明度与异常保护
- #81703：计划额度内用量被错误扣费
- #83062：$995.67 双次自动充值
- #85912：后台任务静默消耗全部额度无告警
- #67636：并行子代理数分钟内消耗数百万 Token
社区对"费用失控前缺乏告警"的容忍度正在下降，要求提供支出上限与实时告警功能的呼声渐高。

### 3. Windows 平台体验持续拖后腿
控制台闪烁（#14828，60 评论）、Git 路径问题（已在 v2.1.228 修复）之外，Windows 上的权限交互（#71539 提及 Linux/Windows 均有类似问题）和平台行为差异仍是高频反馈来源。

### 4. 性能稳定性
- ugrep 正则回溯引发 OOM（#54394）
- macOS 上 node 进程 fork 风暴（43 进程/秒）致内核崩溃（#80362）
- SSE 流式连接重置与重试（#84404）
这类问题影响面大、难复现，但用户对稳定性要求极高，建议团队关注。

---

*本日报基于 GitHub 公开数据自动生成，仅供技术社区参考。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-12

## 今日速览

Codex 发布两个 0.148.0 系列 alpha 新版本，持续快速迭代；社区最受关注的 Linux 桌面版需求（#11023，950👍+207评论）已被官方关闭，引发广泛讨论；Windows 平台沙箱权限和桌面端内存泄漏问题成为社区反馈重灾区，多项相关修复已在 PR 中落地。此外，CLI 0.147.0 的 Esc-Esc 回溯 bug 已确认修复并关闭。

---

## 版本发布

过去 24 小时发布 2 个预发布版本：

- **rust-v0.148.0-alpha.8** / **rust-v0.148.0-alpha.7**
  暂无详细变更日志，为 0.148.0 系列的第 7/8 个 alpha 迭代版本，延续高频发布节奏。

---

## 社区热点 Issues（Top 10）

### 1. Linux 桌面版请求被关闭 — #11023
[GitHub](https://github.com/openai/codex/issues/11023)
- **状态**: CLOSED（2026-08-11 更新） | 👍 950 | 💬 207
- **重要性**: 社区呼声最高的功能需求之一。用户因 macOS 版功耗问题（#10432）迫切需要 Linux 桌面客户端。此 Issue 被关闭意味着官方短期内可能不会推出 Linux 桌面版，可能转向其他方向（如 Web 版）。这是近期最重要的社区事件。

### 2. CLI 0.147.0 Esc-Esc 回溯无法找到选中 prompt — #37421
[GitHub](https://github.com/openai/codex/issues/37421)
- **状态**: CLOSED（修复确认） | 👍 25 | 💬 4
- **重要性**: 影响日常交互的严重 bug 已确认修复。用户通过 Esc-Esc 回溯后无法在持久化线程中找到先前选中的 prompt，涉及会话切换的核心体验。修复关闭速度较快，社区反馈积极。

### 3. 完全授权下仍频繁请求权限 — #29235
[GitHub](https://github.com/openai/codex/issues/29235)
- **状态**: OPEN | 👍 16 | 💬 3
- **重要性**: 即便配置了完整文件系统访问权限且关闭审批提示，Codex 仍反复请求用户授权。此问题严重破坏工作流连续性，涉及 sandbox 权限判断逻辑，是用户高度关注的行为回归类问题。

### 4. App 每次启动静默创建空 `~/Documents/Codex` 文件夹 — #20880
[GitHub](https://github.com/openai/codex/issues/20880)
- **状态**: OPEN | 👍 42 | 💬 22
- **重要性**: macOS 桌面版在每次启动时悄悄创建空目录，造成用户文件系统污染。评论数 22 条说明讨论活跃，此类"小问题但高感知"的 bug 对桌面端用户体验影响显著。

### 5. 子代理卡片关闭后仍卡在界面上 — #23930
[GitHub](https://github.com/openai/codex/issues/23930)
- **状态**: OPEN | 👍 4 | 💬 16
- **重要性**: 桌面版 UI 中已关闭的子代理卡片长时间残留，与底层 close/readback 状态不一致。涉及 app 与 subagent 的生命周期同步问题，评论数较多说明不少用户遇到过此问题。

### 6. CLI 不支持粘贴图片 — #19143
[GitHub](https://github.com/openai/codex/issues/19143)
- **状态**: OPEN | 👍 7 | 💬 11
- **重要性**: 前端调试、扩展开发等场景需要直接粘贴截图到会话中，目前只能手动拖文件，影响日常开发效率。属于 CLI 生产力类核心需求。

### 7. macOS 桌面版无法恢复 Remote Control / CLI 线程 — #37403
[GitHub](https://github.com/openai/codex/issues/37403)
- **状态**: OPEN（2026-08-07 创建，2026-08-11 更新） | 👍 9 | 💬 9
- **重要性**: 8 月 7 日更新引发的回归——桌面版无法恢复通过手机 Remote Control 继续的 CLI 线程，报 `already has an active writer` 错误。跨设备工作流断裂，影响远程办公用户。

### 8. Windows 桌面版内存增长到 8.8 GB 且 UI 冻结 — #38059
[GitHub](https://github.com/openai/codex/issues/38059)
- **状态**: OPEN（2026-08-11 创建） | 👍 0 | 💬 3
- **重要性**: 最新 Windows 桌面版在空闲时内存涨至 8.8 GB，发送 1-2 条消息后 UI 完全冻结。严重性能问题，涉及 26.803.10989.0 和 26.803.8161.0 两个版本，刚提交即获关注。

### 9. Codex 复制图片 15 万次，占用 400 GiB 磁盘 — #35470
[GitHub](https://github.com/openai/codex/issues/35470)
- **状态**: OPEN | 👍 0 | 💬 4
- **重要性**: Windows 平台上 Codex 在会话中反复复制同一图片文件，最终消耗 400 GiB 磁盘空间。极端资源浪费案例，涉及 sandbox/context 管理的严重缺陷。

### 10. `$skill` 调用解析到已卸载插件的过期缓存 — #30993
[GitHub](https://github.com/openai/codex/issues/30993)
- **状态**: OPEN | 👍 5 | 💬 3
- **重要性**: 用户安装新的 marketplace 插件后，Codex 仍从旧缓存中解析 skill 版本。影响 skill 生态的信任度和开发者体验，与之前 Superpowers 相关问题相关联。

---

## 重要 PR 进展（Top 10）

### 1. 为 MCP OAuth 注册添加 CIMD 支持 — #38089
[GitHub](https://github.com/openai/codex/pull/38089)
- 当授权服务器支持公户客户端时，优先使用 Client ID Metadata Documents（CIMD）自动注册，回退到 Dynamic Client Registration。提升 MCP 服务器接入体验。

### 2. 允许 Windows 沙箱使用嵌套 Git 仓库 — #38080
[GitHub](https://github.com/openai/codex/pull/38080)
- 沙箱用户运行 Git 命令时，仅信任主 worktree 导致嵌套仓库不可用。此 PR 将 worktree 根及其 `/*` 通配符纳入 Git 信任范围。

### 3. 为 Windows 沙箱授予 Codex 应用根目录访问权限 — #38064
[GitHub](https://github.com/openai/codex/pull/38064)
- 对本地 Codex 应用根目录应用沙箱读/执行 ACL 并递归继承，同时单独管理运行时缓存。修复 Windows 沙箱无法访问应用资源的权限问题。

### 4. 使用 `ReviewDecision` 统一 MCP 工具审批 — #38081
[GitHub](https://github.com/openai/codex/pull/38081)
- 新增 `ApprovedMcpPolicyAmendment` 表示跨会话持久化的 MCP 审批，将 MCP 审批响应统一路由到共享的 `ReviewDecision` 类型，保留会话内审批、拒绝原因和超时语义。

### 5. 为 Azure Responses 请求禁用存储 — #38060
[GitHub](https://github.com/openai/codex/pull/38060)
- 所有 Responses 请求（包括 Azure 提供商）统一设 `store` 为 `false`，移除提供商特定存储检查，简化请求构造逻辑。

### 6. 保留跨对话历史的 harness 元数据 — #38058
[GitHub](https://github.com/openai/codex/pull/38058)
- 用可选 harness 元数据包装响应项，同时保持持久化响应载荷的向后兼容；将压缩历史的元数据存储在侧车文件中，并在元数据损坏时拒绝加载。

### 7. 尊重渲染宽度添加 TUI 历史记录 — #38075
[GitHub](https://github.com/openai/codex/pull/38075)
- 新聊天组件以当前终端宽度初始化；根据活动历史渲染模式和 ambient-pet 占用的宽度判断历史单元格是否可见；修正 diff 摘要的饱和度计算。

### 8. gRPC code-mode 会话路由到共享 HTTP 客户端 — #38087
[GitHub](https://github.com/openai/codex/pull/38087)
- 通过 `HttpClientFactory` 构建基于 URL 的 gRPC code-mode 连接，使代理和自定义 CA 配置生效；接受 `http`/`https` 源并拒绝不支持端口。

### 9. 将 gRPC code-mode 回调转发到会话委托 — #38072
[GitHub](https://github.com/openai/codex/pull/38072)
- 为每个 gRPC code-mode 会话订阅嵌套工具调用，将工具与通知回调转发给委托；通过 host 完成工具调用，并限制超大结果和错误。

### 10. 保留 Windows 沙箱调试会话的代理设置 — #38061
[GitHub](https://github.com/openai/codex/pull/38061)
- 运行 Windows `codex sandbox` 调试命令时，不再重新协调其他沙箱启动所设置的持久代理配置，修复调试会话中代理丢失问题。

---

## 功能需求趋势

从过去 24 小时的 Issue 和 PR 中，社区最关注的功能方向集中在以下几个方面：

- **Linux 支持**: #11023 被关闭成为本周最重要的事件之一，社区对 Linux 桌面版的需求仍然强烈（950 赞），未来可能会转向 Web 版本或官方替代方案。
- **Windows 平台改进**: 大量与 Windows 相关的 sandbox 权限、内存泄漏、文件系统访问问题占据 Issue 和 PR 主导地位，开发者明显感觉 Windows 是一等公民但仍有大量完善空间。
- **CLI 生产力**: 粘贴图片（#19143）、TUI 历史回退修复（#37421）等与日常效率直接相关的功能/修复持续受关注。
- **MCP 生态深化**: 多个 PR 涉及 MCP 工具注册、审批机制、OAuth 流改进，说明 Codex 正在快速完善 MCP 集成层。
- **远程/多设备协同**: Remote Control 恢复问题（#37403）和桌面版 Scheduled 任务挂起（#35030）表明跨设备工作流是用户重度使用场景。

---

## 开发者关注点

1. **Windows 平台痛点集中爆发**: 沙箱权限（嵌套仓库、应用根目录、ACL）、内存泄漏、磁盘空间暴涨（400 GiB 案例）、MCP 服务器不可用等，Windows 开发者体验仍是社区主要抱怨来源。
2. **小型但高频的桌面端问题**: 静默创建空目录、子代理卡片残留、权限弹窗无响应、“Allow once”按钮失灵——这类 UI/UX 小 bug 虽不致命但频繁消耗用户注意力，影响整体口碑。
3. **权限模型仍需打磨**: 即使配置了完整访问权限和禁用审批，Codex 仍频繁弹窗询问（#29235），用户对权限系统的信任度正在下降。
4. **会话/线程同步问题**: 桌面端与 CLI 之间的线程恢复（#37403）、app-server 中 modelProviders 过滤逻辑（#24648）、子代理状态同步（#23930）——跨端一致性是当前架构的主要摩擦点。
5. **自定义模型提供商生态仍不成熟**: 自定义 Responses API 提供商与 MCP 工具不兼容（#31354）、桌面版隐藏自定义模型（#37379）、Ultra 多代理模式不支持 API-key 提供商（#37858）——第三方模型接入的兼容性问题仍待系统性解决。

---

> 📌 **分析师建议**: 短期重点关注 Windows 沙箱权限修复和新桌面版的内存问题；Linux 桌面版已关闭，若有部署需求建议关注官方后续的 web/app-server 方向。0.148.0 系列迭代频率很高，建议关注 release notes 中 MCP 和 sandbox 相关变更。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# 🤖 Gemini CLI 社区动态日报 — 2026-08-12

## 📌 今日速览

今日发布节奏密集，**v0.55.1 稳定版与 v0.56.0-preview.1 同时推进**，核心更新聚焦于 CI/CD 稳定性和 MCP OAuth 令牌修复。社区讨论热度最高的仍是**子代理行为可靠性问题**（MAX_TURNS 误报成功、通用代理挂起），此外**安全方向**出现两项依赖的 CVE 修复 PR，值得关注。

---

## 🚀 版本发布

| 版本 | 类型 | 关键更新 |
|------|------|---------|
| **v0.55.1** | 稳定版 | 修复 release 验证时 npm ci 忽略脚本问题，防止 workspace 二进制文件遮蔽；引入工具注册表（feat/tool registry） |
| **v0.56.0-preview.1** | 预览版 | 对接 v0.55.0-preview.1 变更日志；Bump 至 0.56.0-nightly 基线 |
| **v0.56.0-nightly** | 夜间版 | 修复 MCP OAuth 令牌刷新时使用已存储的 client ID 的问题（PR #28481） |
| **v0.55.0-preview.3** | 预览补丁 | Cherry-pick 修复至 preview 分支 |

> 🎉 欢迎新贡献者 @ParthivNaresh，首次贡献即修复 MCP OAuth 令牌刷新 Bug。

---

## 🔥 社区热点 Issues（Top 10）

### 1. Subagent MAX_TURNS 被误报为 GOAL 成功 ⚠️
[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — `codebase_investigator` 子代理在分析前已耗尽最大回合数的前提下，却返回 `status: "success"` / `Termination Reason: "GOAL"`，**掩盖了实际的中断情况**。评论 12 条，属于 P1 优先级的 bug。该问题直接影响用户对子代理执行结果的信任判断。

### 2. 通用代理（Generalist agent）无限挂起
[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 委派给通用代理后程序无限期挂起，即使是最简单的创建文件夹操作也无法完成。用户等待一小时后被迫取消。屏蔽子代理后问题消失。👍 8 次，P1 优先级，是当前社区反馈最痛的问题之一。

### 3. 零依赖 OS 沙箱化与后执行意图路由
[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 提出利用 Gemini 3 模型的原生 bash 能力，通过零依赖 OS 沙箱化执行 POSIX 工具链，在不牺牲安全性的前提下让模型充分发挥其 bash 亲和性。评论 8 条，涉及安全与执行架构设计。

### 4. 组件级评测体系（EPIC）
[#24353](https://github.com/google-gemini/gemini-cli/issues/24353) — 在已有 76 个行为评测测试的基础上，构建组件级评测体系，覆盖 6 个 Gemini 模型。P1 优先级，关系 CLI 整体质量保障能力的提升。

### 5. AST 感知代码读取/搜索/映射的性能评估
[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — 探索 AST 感知工具在精确读取方法边界、减少回合数、降低 token 噪声方面的价值。评论 7 条，社区对代码库理解效率的提升有较高期待。

### 6. Gemini 不会主动使用 skills 和 sub-agents
[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — 用户反馈 Gemini CLI 几乎不会主动调用自定义 skills 和子代理，即使任务高度相关（如 gradle/git 技能）。需显式指定才会使用。该问题暴露了模型对工具自主调度的能力短板。

### 7. Auto Memory 对低信号会话无休止重试
[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — 提取代理判定某个会话低信号而不读时，该会话会被反复标记为未处理并持续重试。影响索引效率与资源消耗。

### 8. Auto Memory 需确定化的机密编辑方案
[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — 当前 Auto Memory 将本地转录内容发送到提取模型，但机密编辑发生在内容进入模型上下文之后，且服务端可能记录已有技能内容。存在**安全设计缺陷**，需要确定化的脱敏前置处理。

### 9. Shell 命令执行后卡在 "Waiting input"
[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — 高频 Bug：极简单的 CLI 命令执行完成后，程序仍显示命令处于活动状态并挂起等待输入。评论 4 条，👍 3 次。涉及核心 shell 执行层稳定性。

### 10. Browser Agent 韧性增强：会话接管与锁恢复
[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — 当前 `BrowserManager.ts` 遇到浏览器 profile 锁定期采用"快速失败"策略。社区建议实现自动会话接管与锁恢复机制，尤其是 `persistent` 模式下遇到孤儿进程时。

---

## 📦 重要 PR 进展（Top 10）

### 1. 🔒 修复 shell-quote 关键 CVE（CVE-2026-9277）
[#28780](https://github.com/google-gemini/gemini-cli/pull/28780) — 升级 shell-quote 1.8.3 → 1.8.4，修复 **CRITICAL** 级别漏洞。由 trivy 扫描发现，涉及 `package-lock.json` 中的依赖。

### 2. 🔒 修复 simple-git 关键 CVE（CVE-2026-28292）
[#28778](https://github.com/google-gemini/gemini-cli/pull/28778) — 升级 simple-git 3.28.0 → 3.32.3，修复 **CRITICAL** 级别漏洞。连续两个依赖安全修复，说明安全扫描机制正在持续生效。

### 3. 修复 IDE 连接中目录不匹配被吞掉的问题
[#28729](https://github.com/google-gemini/gemini-cli/pull/28729) — 解决 Gemini CLI 在 Cider（或 VS Code fork 环境）下因虚拟/FUSE 目录路径差异导致的 IDE companion 连接失败问题。对远程工作流有较大意义（状态：已关闭，待合并确认）。

### 4. 动态解析 Cloud Workstations 的 OAuth 代理重定向
[#28688](https://github.com/google-gemini/gemini-cli/pull/28688) — 修复 **Google Cloud Workstations VM** 中 OAuth 2.0 认证失败的问题，将静态配置的 `localhost` 回调改为动态解析代理地址。对云上开发场景友好。

### 5. 修复模型容量耗尽误报与配额映射
[#28730](https://github.com/google-gemini/gemini-cli/pull/28730) — 解决 CLI 在容量高峰期的误报（false model capacity exhaustion）、修正 `core` 包中模型配额查询映射，并在 UI 中保留 "Keep trying" 选项。

### 6. 将容量耗尽分类为终态错误
[#28599](https://github.com/google-gemini/gemini-cli/pull/28599) — 将后端返回的 `MODEL_CAPACITY_EXHAUSTED`（HTTP 429）在无重试延迟时显式分类为**终态限制**，立即触发 fallback 链而非卡死在重试循环中。与 #28730 配套。

### 7. 改进 Vertex AI 401 错误提示
[#28679](https://github.com/google-gemini/gemini-cli/pull/28679) — 当用户配置 `vertex-ai` 认证但只提供标准 Gemini API key 时，给出更清晰的错误码提示，改善 Vertex AI 的接入体验（Open）。

### 8. 跳过 diff hunk 标记的 `@` 解析
[#28581](https://github.com/google-gemini/gemini-cli/pull/28581) — 防止 unified/combined diff 格式中的 hunk 标记被误认为 `@file` 引用，消除大量 diff 中的递归 workspace 全局搜索，避免 `minimatch` 堆内存增长（Open）。

### 9. 修复 VS Code IDE Companion 的 Disposable 追踪
[#28764](https://github.com/google-gemini/gemini-cli/pull/28764) — 修复 `activate()` 中 `context.subscriptions.push` 多包一层括号导致逗号表达式问题，`gemini.diff.accept` 等命令注册失效（Open）。

### 10. 工具调用时间线格式化 + 失败摘要
[#28305](https://github.com/google-gemini/gemini-cli/pull/28305) — 为行为评测增加**工具调用时间线格式化**与失败摘要诊断，失败时打印紧凑的编号工具调用轨迹（参数、状态、错误详情），大幅降低评测失败分析成本（Open）。

---

## 📈 功能需求趋势

从当前活跃 Issues 中可提炼出以下社区重点关注方向：

| 方向 | 代表 Issue | 热度信号 |
|------|-----------|---------|
| **子代理行为可靠性** | #22323, #21409, #21968 | 多起 P1 Bug，社区反应强烈，是当前最高频痛点 |
| **AST 感知代码理解** | #22745, #22746 | 探索用 AST 工具替代纯文本读取，提升代码库理解效率 |
| **Auto Memory / 记忆系统** | #26522, #26523, #26516, #26525 | 正在集中打磨：重试策略、脱敏方案、无效补丁隔离 |
| **浏览器代理韧性** | #22232, #21983, #22267 | 会话恢复、Wayland 支持、settings.json 覆盖失效 |
| **沙箱安全与权限控制** | #19873, #22672 | 既要求模型发挥 bash 能力，又需防破坏性操作 |
| **智能工具调度** | #21968, #21432 | 让模型更"自觉"地使用 skills/子代理，提升自主性 |

---

## 👨‍💻 开发者关注点

**高频痛点：**
1. **子代理结果误报** — `MAX_TURNS` 被当作 `SUCCESS` 报告，直接损害用户对 Agent 结果的信任（#22323）
2. **Shell 执行挂起** — 简单命令执行后卡在 "Waiting input"，严重影响日常使用（#25166）
3. **模型不主动使用技能** — 手动指定才好用，自动调度能力不足（#21968）
4. **权限绕过回归** — 自 v0.33.0 起子代理在配置禁用后仍被调用（#22093）

**安全关切：**
- Auto Memory 中**先发送后脱敏**的设计缺陷引发关注（#26525）
- 依赖的安全性持续被扫描，CVE-2026-9277 与 CVE-2026-28292 在同日修复（#28780, #28778）
- 模型偶尔使用 `git reset --force` 等破坏性命令，需更强的行为约束（#22672）

**值得肯定：**
- 社区贡献活跃，`/patch` 注释机器人权限验证机制已被社区成员主动测试（#28770）
- `eval:report` 本地评测报告工具（#28369）和工具调用时间线（#28305）有望显著改善评测与调试体验

> 本日报由 AI 技术分析师自动生成，数据截至 2026-08-12。所有 Issue/PR 链接均指向原始 GitHub 页面，可点击查看最新动态。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**2026年8月12日** | 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)


## 今日速览

昨日无新版本发布，但社区围绕 **v1.0.79** 集中提交了一批新 Issue，暴露出配置模型持久化、技能加载冲突、自动模式模型选择等多项回归问题。此外，早期报告的 Windows 平台插件安装权限错误（#4151、#4095）持续获得高关注，成为目前社区反馈最集中的痛点之一。


## 社区热点 Issues

过去 24 小时内共有 40 条 Issue 更新，其中 8 月 11 日新增约 20 条。以下为最值得关注的条目：

### 🔥 高热度 / 高影响

**1. Windows 平台插件安装失败——Access is denied (os error 5)**
[#4151](https://github.com/github/copilot-cli/issues/4151) | 评论: 3 | 👍: 1 | 更新: 08-11
Windows 11 上 `copilot plugin install` 对 marketplace 源、直接 GitHub 仓库和本地目录源均 100% 失败，报 `Access is denied (os error 5)`。作者 @ChaitanyaBalaji-SNP 创建于 7 月 16 日，已持续近一个月未解决。同类问题 **#4095**（👍 14，评论 2）进一步指出根因：VS Code 运行时 Copilot 扩展持有 `installed-plugins` 目录的 watcher 句柄，导致 CLI 无法覆盖文件——可能是 Windows 平台最高频的未解决 Bug。

**2. v1.0.74 会话恢复出现严重内存回归**
[#4251](https://github.com/github/copilot-cli/issues/4251) | 评论: 3 | 👍: 1 | 更新: 08-11
恢复大型 session 时 OOM 或单核 CPU 占用约 70 分钟。作者做了严格的 A/B 测试（同机同会话仅更换版本），确认回归来自 1.0.74，内存峰值约为 1.0.73 的 3–4 倍。对长期使用会话恢复的重度用户影响显著。

**3. `/config model` 清空全部配置文件**
[#4431](https://github.com/github/copilot-cli/issues/4431) | 评论: 3 | 更新: 08-11 | [已关闭]
v1.0.79 中设置用户级模型时直接覆写 `~/.copilot/settings.json`，所有其他设置被清空。该 Issue 已标记 Closed，但同作者又提交了相关新 Issue（见 #4434），值得跟进修复结果。

### 🆕 8 月 11 日新增（Triage 中）

**4. 用户级配置的模型不在新会话中生效**
[#4434](https://github.com/github/copilot-cli/issues/4434) | 评论: 1
通过 `/config model` 设置用户默认模型后，`/clear` 或 sessions 界面创建的新会话不加载该模型，必须完全退出并重启 CLI 才生效。与 #4431 同源，指向 v1.0.79 的配置管理重构存在问题。

**5. `disable-model-invocation: true` 导致技能完全不可用**
[#4438](https://github.com/github/copilot-cli/issues/4438) | 评论: 1
项目技能在 `SKILL.md` 中设置 `disable-model-invocation: true` 后，`copilot skill list` 能看到该技能，但模型调用 `skill()` 工具时返回 `Skill not found`。显式用户请求也无法触达。

**6. rubber-duck 子代理：模型参数覆盖互补策略**
[#4432](https://github.com/github/copilot-cli/issues/4432) | 评论: 1
`rubber-duck` 的设计初衷是跨模型家族提供对抗性评审（Claude 会话配 GPT 评审，反之亦然）。但其 `task` 工具暴露了 `model` 可选参数，模型可自行传入同名模型导致互补策略失效。

**7. 重复技能加载：仓库技能与插件技能冲突**
[#4430](https://github.com/github/copilot-cli/issues/4430) | 评论: 1
当仓库包含项目技能且已安装的用户插件提供同名技能时，CLI 会加载两次，增加技能描述面的冗余。

**8. 仓库 `.claude/agents/*/AGENT.md` 的 `model:` 字段覆盖 Copilot 自定义代理的会话模型**
[#4437](https://github.com/github/copilot-cli/issues/4437) | 评论: 0
Claude Code 的代理定义中若带 `model:` 字段，Copilot CLI 会将其作为同名自定义代理的默认模型，即使用户在 `.git` 之外自定义了其他模型。对 BYOK 提供商场景尤其有害。

**9. 自动模式选择不可用的模型导致崩溃**
[#4445](https://github.com/github/copilot-cli/issues/4445) | 评论: 0
`auto` 模式有时会选择推理级别不可用的模型（如 `Claude Sonnet 4.5 - medium`），导致 CLI 崩溃并丢失工作。

**10. Copilot CLI 二进制包含存在 CVE 的易受攻击依赖**
[#4442](https://github.com/github/copilot-cli/issues/4442) | 评论: 0
v1.0.79 内置 `adm-zip` v0.5.17，包含高危漏洞 `CVE-2026-39244`。用户所在组织用 XRay 扫描 Docker 镜像时无法通过安全审计。


## 重要 PR 进展

过去 24 小时仅 2 条 PR 更新：

**1. 将 PR 自动化迁移出 `pull_request_target`**
[#4449](https://github.com/github/copilot-cli/pull/4449) | 草稿 | 更新: 08-11
将仓库的 PR 驱动工作流从 `pull_request_target` 迁移到低权限方案——非受信 PR 输入保持在 `pull_request` 工作流中，需要仓库写权限的操作移到单独流程。属于 GitHub Actions 安全最佳实践改进。

**2. 添加初始 devcontainer 配置**
[#4428](https://github.com/github/copilot-cli/pull/4428) | 更新: 08-11
为仓库添加开发容器配置，方便贡献者快速搭建一致的开发环境。PR 描述为 "LGTM"，当前为打开状态。


## 功能需求趋势

从过去 24 小时更新的 Issues 中，社区最关注的功能方向：

- **模型 / 子代理管理**（~10 条）：模型选择策略不透明（#4432、#4445）、用户默认模型不生效（#4434）、Claude Agent 定义与 Copilot 模型的冲突（#4437）、"Rubber Duck" 评审策略失效（#4380）等。社区对 "模型应当如何被选择" 的治理规则有强烈诉求。
- **配置管理**（~5 条）：`/config` 命令的稳定性问题（#4431、#4434）和权限控制持久化（#3877）表明用户需要更可靠的配置写入和生效机制。
- **技能系统完善**（~5 条）：技能重复加载（#4430）、禁用模型调用的技能不可达（#4438）、显式斜杠技能二次加载失败（#4451）——技能系统正在获得更多采用，但边界情况问题集中暴露。
- **会话 / 上下文管理**（~3 条）：大型会话恢复的性能退化（#4251）、重复压缩导致早期上下文丢失（#4441）——长期用户的深度使用需求逐渐显现。
- **企业 / 平台治理**（~3 条）：企业级策略强制执行（#4446）、安全漏洞扫描兼容（#4442）——企业采用正在推进，安全与合规需求提升。
- **终端渲染与可访问性**（~4 条）：压缩时间线显示（#2623）、工具调用前的文本被折叠（#4450）、浅色主题硬编码颜色（#3750）、退格键整词删除（#4447）——终端交互体验的细节打磨需求。


## 开发者关注点

- **Windows 用户体验严重受损**：以 #4151 和 #4095（14 👍）为代表的插件安装/更新权限问题在 Windows 上持续多日未解决。结合 VS Code 扩展持有文件句柄这一根因，跨进程文件锁冲突是 Windows 平台的核心痛点，希望尽快推出针对性的文件操作策略。
- **v1.0.79 配置管理疑似回归**：`/config model` 清空配置（#4431）、配置不即时生效（#4434）两个问题同一天由同一用户报告，配置模块的读写逻辑在 v1.0.79 可能引入了整体性回归。
- **模型选择缺乏透明度与控制**：多个 Issue（#4445、#4437、#4432）指出模型选择机制存在隐式覆盖和不可预测性：auto 模式选到不可用模型、AGENT.md 覆盖会话模型、rubber-duck 互补策略失效。开发者希望模型选择逻辑更可预测、更可控。
- **tgrep 索引器 OOM 问题仍在**：#3976 自 6 月底报告至今已超 6 周未解决。内置搜索工具在大仓库上可能直接 OOM 杀死宿主机，严重影响大型 monorepo 用户的日常使用。
- **大型会话性能退化**：#4251 确认 1.0.74 引入约 3–4 倍内存增长和极端 CPU 占用，对于依赖长期会话和恢复功能的用户影响严重，建议优先排查。
- **安全与合规门槛**：#4442 报告的高危 CVE 依赖（`adm-zip`）会直接阻塞企业用户的 CI/CD 流水线；#4446 提出企业级策略管控需求。安全修复与治理功能将是企业落地的前置条件。
- **提示词 / 规则兼容性**：开发者同时使用 Claude Code 与 Copilot CLI，#4440 提议支持读取 `.claude/rules` 以避免重复维护指令。生态兼容性需求日益明显。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-12

## 今日速览

今日社区活跃度显著回升，主要围绕两大核心议题：一是**记忆系统（Memory System）** 的功能需求呼声持续高涨，已有两个相关 Issue 形成联动讨论；二是社区开发者 @hobostay 提交的一系列**质量修复类 PR** 被统一关闭，涉及 ACP、Wire 协议、Agentspec 等多个基础模块的安全性与可靠性改进。此外，Windows 环境下的路径兼容问题和任务规划术语规范也引起了新的关注。

---

## 社区热点 Issues

### 1. Memory System - 跨会话持久化上下文（#1283）
[#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283) · @CatKang · 34条评论

- **内容**：请求实现完整的记忆系统，支持 Kimi CLI 跨会话记忆项目上下文、编码模式与用户偏好，涵盖自动记忆（AI 管理笔记）和手动记忆（用户自定义指令）两类。讨论量高达 34 条，是该仓库热度最高的议题之一。

### 2. 记忆层优化与文档缺失（#1478）
[#1478](https://github.com/MoonshotAI/kimi-cli/issues/1478) · @hahy36 · 1条评论

- **内容**：中文用户反馈称参考文档中缺少记忆相关说明（仅提及 agent.md），并援引了 OpenClaw 等竞品的目录结构（SOUL.md / USER.md / MEMORY.md）作为对照。与 #1283 形成呼应，凸显记忆功能是大型项目开发场景下的重要痛点，且目前文档支持不足。

### 3. Windows PowerShell 7 从 D 盘启动时路径定位失败（#2600）
[#2600](https://github.com/MoonshotAI/kimi-cli/issues/2600) · @RooKichenn · 0条评论

- **内容**：`kimi-cli 0.33` 在 Windows 环境，当 PowerShell 7 默认从 D 盘（而非系统 C 盘）启动时，CLI 无法正确识别工作路径。属于具体环境下的可用性问题，尚无官方回应。

### 4. 规划任务中出现“验尸”字样（#2599）
[#2599](https://github.com/MoonshotAI/kimi-cli/issues/2599) · @KING0177 · 0条评论

- **内容**：`kimi-cli 0.34.0`（kimi k3 模型）在规划任务时 todo 中错误出现“验尸”一词，疑为术语误用或翻译问题。虽属小概率事件，但暴露了模型输出和任务描述生成环节的潜在质量控制缺口。

### 5. Quote & Reply: 选择式评论（#2601）
[#2601](https://github.com/MoonshotAI/kimi-cli/issues/2601) · @topit · 0条评论

- **内容**：请求在 Kimi Web 中支持引用回复能力——用户可选中 AI 回复中的任意文本片段进行评论或追问。这是从 Web 产品视角提出的交互改进，反映出 CLI 与 Web 端功能对齐的需求趋势。

---

## 重要 PR 进展

### 1. 可配置思考强度与 `/effort` 命令（#2509 · OPEN）
[#2509](https://github.com/MoonshotAI/kimi-cli/pull/2509) · @n-WN

- 正在推进的特性 PR，引入可配置的 thinking effort 机制，并新增 `/effort` 命令。关联 issue #2501（官方此前已宣布设计方向），预计对推理任务的成本/质量平衡有重要影响。

### 2. ACP 模块 assert 替换为 RuntimeError（#2057 · CLOSED）
[#2057](https://github.com/MoonshotAI/kimi-cli/pull/2057) · @hobostay

- 将 `acp/session.py` 中 5 处 `assert` 替换为 `RuntimeError`，防止 Python `-O` 模式下断言被剥离导致的安全失效。

### 3. WireFile 竞态条件修复（#2056 · CLOSED）
[#2056](https://github.com/MoonshotAI/kimi-cli/pull/2056) · @hobostay

- 修复 `WireFile.append_record` 中的 TOCTOU（检查后使用）竞态漏洞，消除文件删除与 `stat()` 调用间的时序窗口。

### 4. AgentSpec 异常类型规范化（#2055 · CLOSED）
[#2055](https://github.com/MoonshotAI/kimi-cli/pull/2055) · @hobostay

- 将 `agentspec.py` 中的 `assert agent_spec.extend is None` 替换为显式的 `AgentSpecError` 异常，提高代码在生产环境下的可靠性。

### 5. 文件工具与 UI 反馈修复（#1328 · CLOSED）
[#1328](https://github.com/MoonshotAI/kimi-cli/pull/1328) · @hobostay

- 修复 `StrReplaceFile` 多编辑场景下替换计数计算错误等三个小 bug，提升正确性与用户体验。

### 6. PyInstaller 缓存文件过滤（#1082 · CLOSED）
[#1082](https://github.com/MoonshotAI/kimi-cli/pull/1082) · @hobostay

- 修复 `dateparser` 时区缓存文件（`dateparser_tz_cache.pkl`）在首次使用或 CI 环境下不存在时，PyInstaller 数据采集失败的问题。

### 7. WriteFile 冗余校验移除（#1077 · CLOSED）
[#1077](https://github.com/MoonshotAI/kimi-cli/pull/1077) · @hobostay

- 删除 `WriteFile` 工具中 `mode` 参数的冗余运行时校验（第 84-91 行），精简代码并降低误报风险。

### 8. ACP Shell 命令路由修复（#1393 · CLOSED）
[#1393](https://github.com/MoonshotAI/kimi-cli/pull/1393) · @hanhan3344

- 修复 ACP Shell 终端执行时 executable 与调用参数的路由逻辑，适配 ACP SDK 的 `terminal_id` 响应格式，并补充 bash/PowerShell 回归测试。

---

## 功能需求趋势

从近期 Issues 和 PR 中可以提炼出以下需求方向：

- **记忆系统（Memory System）**：跨会话持久化上下文是当前社区的第一诉求，且竞品已形成完善方案，用户期待 Kimi CLI 尽快补齐。
- **文档同步**：用户对记忆相关功能的文档表示“找不到”，除核心功能外，文档建设的优先级也值得关注。
- **思考强度配置**：对 `thinking effort`（推理强度）的显式控制需求明确，`/effort` 命令已在开发中，预计将覆盖更多使用场景。
- **异常处理与代码健壮性**：PR 中大量 `assert` 替换为常规异常，说明社区在维护代码稳健性和工程规范，这类底层质量建设不会被直接感知，但对长期使用体验意义重大。
- **终端/平台兼容性**：Windows 路径问题持续出现，macOS Intel 老机型也有反馈，多平台适配仍是不可忽视的环节。

---

## 开发者关注点

- **记忆与上下文**：在大型项目中跨会话保持上下文，是目前开发者反馈最集中、最“痛苦”的痛点。文档缺失加剧了使用门槛。
- **Windows 环境适配**：PowerShell 从非 C 盘启动时路径解析失败，影响 Windows 用户的基础可用性，属于紧急但非阻断性问题。
- **任务规划术语规范**：todo 中出现“验尸”等不当术语，反映出任务描述的可读性和审核机制有待增强，社区虽略带玩味地讨论，但背后是对输出质量的要求。
- **CLI 与 Web 功能对齐**：Kimi Web 端的引述回复需求被提出，开发者希望 LLM 交互的能力能跨端口统一。
- **底层代码质量**：多 PR 关注 assert 退出、竞态条件、构建可靠性等隐性风险，侧面反映出社区对生产环境稳定性的重视程度提升。

> 📌 今日整体观测：功能需求（记忆系统）与工程质量（异常处理）双线并行，Kimi Code CLI 正处于「补功能 + 固基础」的并行阶段，开发者对长期潜力的期待值较好，但对「记忆」等核心差异功能的落地速度要求较高。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-12）

## 今日速览

V2 架构迭代与生态整合并行推进。核心团队（kitlangton、Hona、jlongster）密集提交了 TUI 体验优化（标签栏、目录补全、命令 ID 化）与基础设施修复（效果库崩溃补丁、模型目录快照内嵌）。社区侧，paste 内容展开与 Go 计划用量 API 是最受关注的功能请求（分别获得 230 与 137 👍），V2 的 Plan Mode 行为问题与多 TUI 共享 server 时的状态串线成为高频 Bug 主题。同时，第三方客户端开发者的 V2 API 缺口反馈首次浮出水面。

## 版本发布

无新版本发布。


## 社区热点 Issues

### 1. 允许展开粘贴的文本内容（#8501）
**👍 230 | 💬 35 | 开放中**
> 粘贴文本被自动摘要以控制提示词长度，但用户常需要查看或编辑原文。

社区最热门的请求。**已持续 7 个月**，230 个赞说明这是一个广泛存在的使用痛点。核心诉求是在保留文本摘要能力的同时，提供一种方式查看/编辑被压缩的原文。

🔗 https://github.com/anomalyco/opencode/issues/8501

---

### 2. Go 计划用量/余额 API 端点（#16017）
**👍 137 | 💬 33 | 已关闭**
> 为 Go 计划订阅暴露公共 API 端点，以便用户程序化查询用量数据。

已被关闭，说明该功能已进入实现阶段或已发布。建议关注后续 changelog 中关于 `usage` API 的落地情况。

🔗 https://github.com/anomalyco/opencode/issues/16017

---

### 3. V2：Plan Mode 被忽略——代理擅自修改文件并启动进程（#40778, #41476, #40474）
**多期报告 | 合计 💬 8 | 已关闭**
> 用户选择 Plan Mode（计划模式）后，代理仍然继续实现应用、修改文件甚至启动进程。V2 中模式切换对模型“不可见”——没有系统提示，没有请求路径中的提醒。

这是 V2 最严重的功能回退之一。`#40474` 详细分析了根因：`agent-switched` 消息在会话历史转换中被静默丢弃，模型根本不知道自己处于哪个模式。

🔗 #40778 | #41476 | #40474

---

### 4. 隐藏调用 Claude Haiku 导致非预期计费（#10272）
**👍 5 | 💬 10 | 已关闭**
> 用户明确配置 MiniMax M2.1，但日志显示请求被静默路由至 Claude Haiku 4.5 并计费。

虽然已关闭，但这类“模型路由不透明”的问题对用户信任影响很大。已关闭意味着有修复方案，值得关注该问题的关闭说明和根因分析。

🔗 https://github.com/anomalyco/opencode/issues/10272

---

### 5. TUI 权限提示面板的默认高度和展开状态不可配置（#28191）
**👍 0 | 💬 9 | 开放中**
> 权限面板硬编码为 `maxHeight: 15` 且默认折叠（`expanded: false`），查看大 diff 时体验很差。

体现了高级用户对 TUI 可配置性的强烈需求。

🔗 https://github.com/anomalyco/opencode/issues/28191

---

### 6. Chrome 风格的多会话标签系统（#12548）
**👍 10 | 💬 5 | 已关闭**
> 希望 TUI 支持类似 Chrome 的标签系统，实现多会话并行工作并保持上下文。

已关闭，很可能已实现或已计划实现——与今日 PR #41887 “session 标签栏加号按钮”相关，标签系统未来可期。

🔗 https://github.com/anomalyco/opencode/issues/12548

---

### 7. webfetch 工具在 V2 Code Mode 中回归：执行成功但返回 null（#41777）
**👍 0 | 💬 4 | 已关闭**
> V2（next 渠道）中 webfetch 工具在 Code Mode（`execute`）内总是返回 `null` — 同时从模型顶层工具列表消失。

`#41777` 团队对回归窗口进行了定位（`next-202606301613` 与 `next-16365` 之间），提交者很快跟进并修复了回归。

🔗 https://github.com/anomalyco/opencode/issues/41777

---

### 8. 多个 TUI 共享一个 server 时，状态互相污染（#39181, #41839）
**💬 6 | 开放/已关闭**
> 一个 `opencode serve` 上挂多个 TUI（不同目录），侧边栏显示的 git 分支是其他项目的；切换分支会广播到所有 TUI。

对多项目工作流用户影响较大，TUI 缺少“按目录隔离状态”的隔离机制。

🔗 #39181 | #41839

---

### 9. apply_patch 在 Windows 上弄乱行尾（#37090）
**👍 0 | 💬 3 | 开放中**
> 在 Windows 上使用 apply_patch 或 write 工具编辑文件，会把 CRLF 行尾全部改成 LF。

对 Windows 开发者是一个持久性问题，影响所有编辑操作，需要用户额外用 git 配置或脚本处理行尾差异。

🔗 https://github.com/anomalyco/opencode/issues/37090

---

### 10. V1 → V2 数据迁移失败：SQL 注入式引号错误（#41869）
**✔ 新报 | 💬 1 | 开放中**
> V1 迁移在每次启动时失败，`SQLiteError: near ",": syntax error`。原因：迁移将消息/零件 JSON 中的单引号直接插入 SQL 语句而没有转义。

V1 老用户升级 V2 的关键阻塞问题，含历史数据的用户将完全无法使用 V2 服务端。

🔗 https://github.com/anomalyco/opencode/issues/41869


## 重要 PR 进展

### 1. Session 中断后支持“继续”执行（#41888）
**已合并 | 核心功能**
> 为 session interrupt 端点增加可选 `continue` 查询参数，允许在中断后恢复执行（仅在有持久化待办工作时）。同步更新了 Promise/Effect 客户端代码。

中断恢复能力直接影响 agent 的可靠性和用户体验。

🔗 https://github.com/anomalyco/opencode/pull/41888

---

### 2. 模型目录快照内嵌 Core 包（#41838）
**已合并 | 架构优化**
> 将 models.dev 的 api.json 快照以静态文本导入方式嵌入 core 包，避免编译期依赖。后续刷新脚本可自动更新快照。

减少构建链路外部依赖，使 core 产物更加可复制和可测试。对模型 ID 解析的稳定性提升有帮助。

🔗 https://github.com/anomalyco/opencode/pull/41838

---

### 3. TUI 隐藏 Experiments 面板（#41862）
**已合并 | 新功能**
> 新增隐藏 `/baldbeard` 密语命令，进入可选的实验性功能面板，支持每个标签独立的 prompt 草稿。不在命令面板、斜杠列表或模糊匹配中显示。

提供实验功能的安全灰度通道，同时隔离了实验代码对正式功能的影响。

🔗 https://github.com/anomalyco/opencode/pull/41862

---

### 4. `/cd` 目录补全增强（#41870）
**已合并 | 新功能**
> `/cd` 支持 shell 风格目录补全（当前、父级、嵌套、绝对路径），并增加项目级最近访问记录。

高频操作优化，目前对提升日常多项目切换效率很有帮助。

🔗 https://github.com/anomalyco/opencode/pull/41870

---

### 5. Session 标签栏增加鼠标加号按钮（#41887）
**开放中 | TUI 体验**
> Tab 栏增加 `+` 按钮，支持鼠标点击新建标签，类似浏览器标签条操作。

此前新建标签只能通过命令或快捷键，鼠标点击大幅降低操作门槛。

🔗 https://github.com/anomalyco/opencode/pull/41887

---

### 6. 加速服务生命周期测试（#41879）
**已合并 | 性能优化**
> 通过私有加速计时策略，将 Client 服务生命周期测试从 **72.556s 降至 4.529s 中位数**（节省 93.8%）。覆盖轮询、探测、竞争、回退、驱逐、停止等全部行为。

值得注意的是，测试基础设施优化让 CI 反馈本地化大幅提速。

🔗 https://github.com/anomalyco/opencode/pull/41879

---

### 7. 修复已完成的 write 输出显示（#41883）
**开放中 | Bug 修复**
> V2 的 `write` 工具完成后现在会显示带语法高亮的文件内容。此 PR 是 #41352 的移植——原 PR 被意外合并到了过时的 `v2-migration` 分支。

用户提交了正确的分支，导致功能漏发？这类情况反映出需要改进 PR 分支管理。

🔗 https://github.com/anomalyco/opencode/pull/41883

---

### 8. 修复 shell 运行输出对齐（#41880）
**开放中 | Bug 修复**
> 修复 shell 卡片在运行/完成两种状态下布局跳变的 bug：流式输出渲染在 spinner 列，完成后跳两列。同样是 #41101 的移植。

与 #41883 相似，这个 PR 来自 v2-migration 分支。这类“笨拙分支管理”导致修复两次，值得关注。

🔗 https://github.com/anomalyco/opencode/pull/41880

---

### 9. V2 TUI 键位配置改用命令 ID（#41882）
**开放中 | 重构**
> 用规范命令 ID 替换 V2 TUI 键位配置和迁移逻辑，保留排队提示等行为，覆盖迁移绑定、组件快捷键与配置持久化。

背书的改进，降低键位配置心智复杂度，也为后续加入新快捷键提供规范化基础。

🔗 https://github.com/anomalyco/opencode/pull/41882

---

### 10. Markdown 图片在 Web 版本中渲染（#41863）
**已合并 | 新功能**
> 为 Web 版增加 Markdown 图片渲染能力。

打开 Web 版在对话/文档中直接可看图片，删除了外链跳转。

🔗 https://github.com/anomalyco/opencode/pull/41863


## 功能需求趋势

1. **V2 稳定性与行为一致性**：Plan Mode 擅自执行操作（#40778, #41476, #40474）、webfetch 回归（#41777）等 V2 回退问题引起大量讨论，社区对“V2 功能达到 V1 同等可靠”的要求很高。
2. **粘贴/文本编辑体验**：#8501（展开粘贴内容）230 赞高居榜首，社区希望 paste 不再只是“摘要”，而是可编辑、可展开的交互式内容。
3. **多会话与桌面体验**：Chrome 风格标签（#12548）、TUI 标签系统（#17838）、关闭最小化到系统托盘（#18134）、VS Code 通知（#39936）等项目，表明社区渴望更强的“并行 + 非阻塞”工作流。
4. **可配置化与可扩展性**：TUI 面板高度/展开状态配置（#28191）、/cd 目录历史和补全（#41870）、第三方插件生态扩展（#41857）与 MCP 文档示例（#41822），社区持续要求更高的自定义与控制权。
5. **服务端/API 增强**：Go 计划用量 API（#16017）、V2 第三方客户端 API 缺口（#41828）、持续中断恢复（#41888）提单增长说明服务端角色正在扩大，第三方工具链正在围绕 opencode 构建。


## 开发者关注点

1. **Plan Mode 行为异常**：多条 issue 反复报告“Plan 模式下代理仍然改代码/启动进程”，核心原因是 `agent-switched` 消息在会话转换中被丢弃，模型不知道自己在哪个模式。这是 V2 当前最严重的信任问题。
2. **多 TUI 共享 server 的状态串扰**：git 分支、消息事件在多目录之间互相污染，缺少按目录隔离机制，影响真实多项目工作流。
3. **apply_patch 事务性不足**：Windows 行尾被破坏（#37090）、多文件变更部分失败导致半完成状态（#41871）、`add` 目标文件已存在仍可覆盖（#41875），三个问题指向同一个工具的可靠性短板。
4. **模型路由与计费透明度**：隐藏调用 Haiku（#10272）和 Veo/AgentRouter 403 错误（#39831, #41873），用户希望看到清晰的模型调用链和可预期的计费行为。
5. **ALSA 音频错误干扰 TUI 终端输出**：Ubuntu 用户持续收到 `ALSA lib ... cannot find card '0'` 错误（#41890），虽不致命，但显著影响终端干净度和操作流畅度，建议排除音频后端编译配置。
6. **桌面端行为细节**：关闭按钮最小化到托盘（#18134）、Web UI 构建跳过（#41881）、markdown worker 稳定性（#41487）等桌面端体验问题持续被提出，说明开发者在真实 Windows/macOS/Linux 桌面场景中高频使用。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，这是 2026 年 8 月 12 日的 Qwen Code 社区动态日报。

---

## Qwen Code 社区动态日报 (2026-08-12)

### 今日速览

今日 Qwen Code 发布了 **v0.21.10 正式版**，新增了 ACP 会话配置推理努力程度的功能，并优化了 Web Shell 中的图片预览体验。在社区方面，**会话管理与资源保护**成为讨论焦点，多个关于 `serve` 模式下的恢复超时、内存分配等问题被提出。此外，CLI 在特定模式下的错误处理、Windows 平台兼容性依然是用户反馈的高频问题。

---

### 版本发布

- **v0.21.10 (正式版)**
    - **核心亮点**：
        - **ACP 推理程度配置**：支持通过会话配置将推理努力程度从默认调整至最高等级 ([#8526](https://github.com/QwenLM/qwen-code/pull/8526))。
        - **Web Shell 图片预览**：点击上传或粘贴的图片，现在会直接在 artifact 视图中打开预览。
    - **完整更新**：[查看 Release 详情](https://github.com/QwenLM/qwen-code/releases)

- **v0.21.11-preview.0 / v0.21.10-nightly.20260812**
    - **主要内容**：推送了 `fix(web-shell): Enforce prompt-safe session navigation` 和 `chore(serve): Log session continuation admissions` 等改动 ([PR #8931](https://github.com/QwenLM/qwen-code/pull/8931))。

- **live-host-v0.1.1**
    - **主要内容**：修复了 CLI 在沙箱运行时探测和自动修复序列化方面的问题 ([PR #7734](https://github.com/QwenLM/qwen-code/pull/7734))。

---

### 社区热点 Issues

1.  **大规模会话恢复超时** ([#8678](https://github.com/QwenLM/qwen-code/issues/8678))
    - **重要性**：`serve` 模式在处理大体积会话恢复时可能超时，影响核心体验。已有相关 PR ([#8691](https://github.com/QwenLM/qwen-code/pull/8691)) 被合并，社区在持续跟进后续修复。
    - **社区反应**：7 条评论，讨论集中在超时契约和可观测性。

2.  **macOS 下 iTerm 闪屏问题** ([#8901](https://github.com/QwenLM/qwen-code/issues/8901))
    - **重要性**：影响特定终端环境下交互确认操作，属于影响面较大的 UI 缺陷。
    - **社区反应**：4 条评论，用户期待尽快修复。

3.  **Headless 模式误报成功** ([#8920](https://github.com/QwenLM/qwen-code/issues/8920))
    - **重要性**：在 `stream-json` 模式下，即使 OpenAI API 调用失败，CLI 也会以状态码 0 退出，这可能导致自动化流程误判。
    - **社区反应**：4 条评论，属于高优先级 bug。

4.  **CLI 帮助信息缺失** ([#8897](https://github.com/QwenLM/qwen-code/issues/8897))
    - **重要性**：`--approval-mode` 和 `--auth-type` 参数可用但未在 `qwen --help` 中列出，对开发者发现和使用不友好。
    - **社区反应**：4 条评论，指出文档与实现不一致。

5.  **VS Code Windows 文件链接错误** ([#8644](https://github.com/QwenLM/qwen-code/issues/8644))
    - **重要性**：在 Windows 上点击聊天中的文件链接无法打开，原因是盘符冒号被 URL 编码，影响核心工作流。
    - **社区反应**：4 条评论，问题被标记为 `need-information`，等待更多环境信息。

6.  **Daemon 内存分配缺陷** ([#8182](https://github.com/QwenLM/qwen-code/issues/8182))
    - **重要性**：`serve` 为每个 ACP 子进程分配 50% 的主机内存，而非按子进程数量分配，存在内存耗尽风险。
    - **社区反应**：4 条评论，涉及 `daemon` 架构资源保护的关键问题。

7.  **图片加载导致崩溃（回归）** ([#8957](https://github.com/QwenLM/qwen-code/issues/8957))
    - **重要性**：自 v0.21.2 起，读取图片时会立即崩溃，是涉及核心功能的严重回归 bug。
    - **社区反应**：3 条评论，已标记为 `need-retesting`，等待验证修复。

8.  **安全漏洞报告** ([#8944](https://github.com/QwenLM/qwen-code/issues/8944))
    - **重要性**：自 v0.21.0 以来，`npm update` 总会报告 2 个高危漏洞，可能引发供应链安全担忧。
    - **社区反应**：3 条评论，用户希望团队确认是否受影响及修复计划。

9.  **Shell 工具输出截断阈值失效** ([#8922](https://github.com/QwenLM/qwen-code/issues/8922))
    - **重要性**：`tools.truncateToolOutputThreshold` 设置对 Shell 工具无效，实际仍使用固定 30,000 字符预算，不符合用户预期和文档。
    - **社区反应**：3 条评论，属于配置与实现不一致的问题。

10. **并行读取文件结果合并** ([#8940](https://github.com/QwenLM/qwen-code/issues/8940))
    - **重要性**：并行执行多个 `read_file` 调用时，结果被合并为一个块，无法区分内容归属，影响工具调用结果的可靠性。
    - **社区反应**：3 条评论，正在等待团队确认。

---

### 重要 PR 进展

1.  **修复 CI 的 autofix 验证门** ([#8961](https://github.com/QwenLM/qwen-code/pull/8961))
    - **内容**：修复 CI 中自动化修复验证门受到 runner git 配置影响的问题，确保测试环境一致性。

2.  **守护进程跨工作树 Git 操作保护** ([#8687](https://github.com/QwenLM/qwen-code/pull/8687))
    - **内容**：在 `qwen serve` 中增加了对模型发起的 `run_shell_command` 的守卫，可识别并阻止逃逸会话工作区的 Git 变更操作，提升安全性。

3.  **服务端实时日志容量自适应** ([#8905](https://github.com/QwenLM/qwen-code/pull/8905))
    - **内容**：当进行中的对话超过实时日志上限时，守护进程会尝试动态扩容，而不是直接丢弃最早的记录，避免信息丢失。

4.  **Web Shell 支持保留字符 ID** ([#8717](https://github.com/QwenLM/qwen-code/pull/8717))
    - **内容**：允许虚拟子代理会话 ID 包含 `:` 和 `/` 等保留字符，增强 ID 编码的鲁棒性。

5.  **增加 Git 差异来源和分支切换** ([#8467](https://github.com/QwenLM/qwen-code/pull/8467))
    - **内容**：扩展 Web Shell 的 Git 工具，在“变更”视图和新会话 Git 模式中，增加未提交、已暂存、已提交及分支对比等多种差异来源，并支持搜索和切换分支。

6.  **新增钉钉协作频道** ([#8937](https://github.com/QwenLM/qwen-code/pull/8937))
    - **内容**：新增钉钉协作空间作为内置频道，支持 @ 消息和群组消息，方便团队协作。

7.  **新增 OpenAI Responses API 生成器** ([#8169](https://github.com/QwenLM/qwen-code/pull/8169))
    - **内容**：为核心引擎添加对 OpenAI Responses API 的支持，扩展可用的模型后端。

8.  **Web Shell 模型推理控制** ([#8675](https://github.com/QwenLM/qwen-code/pull/8675))
    - **内容**：引入内置的模型推理控制注册表，并在 Core、ACP、SDK 和 Web Shell 中应用，支持配置思考模式和努力程度等级。

9.  **Maven 多模块验证支持** ([#8777](https://github.com/QwenLM/qwen-code/pull/8777))
    - **内容**：为 `review build-test` 添加 Maven 适配器，可识别 Maven 项目结构并进行多模块验证。

10. **修复推理章节签名保留问题** ([#8260](https://github.com/QwenLM/qwen-code/pull/8260))
    - **内容**：修复在历史记录整理时，一个回合内含多个推理章节时签名丢失的问题，确保推理过程的可追溯性。

---

### 功能需求趋势

- **Daemon 与资源治理**：社区强烈关注 `serve` 模式（daemon）下的稳定性与资源保护，包括会话恢复超时、内存分配策略、跨工作区存储隔离等，体现出向更复杂、更稳定后台服务演进的趋势。
- **推理过程控制与展示**：继 ACP 支持配置推理努力程度后，社区也关注推理过程的细节保存（如签名）、可视化与解释性，表明用户对模型思考过程的管理和透明度有更高要求。
- **CI/CD 与自动化**：大量关于 GitHub Actions 事件风暴、增量代码审查、自动修复流程优化的讨论，表明该项目正利用 AI 深度赋能自身开发流程，且社区对此高度关注并积极反馈问题。
- **Web Shell 功能增强**：除了 Git 工具的查询能力，用户还希望可视化和管理动态工作流运行，这表明 Web Shell 正从简单交互界面演进为功能完整的集成开发环境。

---

### 开发者关注点

- **错误处理的可靠性**：开发者对 CLI 在无人值守（headless）模式下误报成功、并行工具调用结果混淆等问题非常敏感，因为这些会直接影响自动化工作流和数据准确性。
- **配置与文档的一致性**：多个 Issue 指出 CLI 参数、工具阈值等配置行为与官方文档不符，说明文档同步是提升用户体验的关键环节。
- **平台兼容性**：Windows 平台的路径处理（如 `\\?\` 前缀、盘符冒号编码）和 macOS 特定终端（iTerm）的渲染问题，是影响非 Linux 用户的核心痛点。
- **性能回归**：图片加载崩溃、图片渲染性能优化等问题被反复提及，表明多模态内容处理性能是影响用户体验的重要方面，任何回归都会被迅速感知。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*