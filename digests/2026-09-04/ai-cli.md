# AI CLI 工具社区动态日报 2026-09-04

> 生成时间: 2026-09-04 01:52 UTC | 覆盖工具: 7 个

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

**报告日期：2026-09-04 | 数据来源：各工具 GitHub 公开仓库**

---

## 1. 生态全景

AI CLI 工具赛道已进入 **"平台化竞争 + 稳定性补课"** 的成熟阶段：头部工具（Claude Code、Codex、Gemini CLI）日均更新 Issue 均超 50 条，社区反馈从"能不能用"转向"好不好用、安不安全、可不可控"。Windows 平台体验、MCP 生态深化、会话状态可管理性成为跨工具共性的核心痛点。与此同时，安全类修复在各工具 PR 中的占比显著上升，Git 环境变量清洗、路径穿越防护、配置鉴权等攻击面被系统性补强，表明工具已从"功能扩张期"进入"信任建设期"。

---

## 2. 各工具活跃度对比

| 工具 | 24h 更新 Issues | 24h PR 数 | 版本发布 | 发布类型 | 迭代节奏 |
|------|:---:|:---:|------|------|------|
| **Claude Code** | 50 条（精选 10） | 5 | v2.1.260 | 正式版 | 高频稳定迭代 |
| **OpenAI Codex** | 10 条（精选） | 10 | 0.153.2 / 0.153.1 / 0.154.0-alpha.1/2/3 | 2 补丁 + 3 alpha | 激进，多线并行 |
| **Gemini CLI** | 10 条（精选） | 10 | v0.60.0-nightly.20260904 | Nightly | 日更，安全主题密集 |
| **GitHub Copilot CLI** | 10 条（精选） | 0 | v1.0.83-4 | 正式版 | 稳定，节奏放缓 |
| **Kimi Code CLI** | 7 条（1 新开 + 6 关闭） | 1 | 无 | — | 低活跃，收束期 |
| **OpenCode** | 10 条（精选） | 10 | 未提及 | — | 中速，治理型 PR 为主 |
| **Qwen Code** | 1 条（跟踪 issue 28 评论） | 未提及 | v0.23.0 | 正式版 | 稳健，架构升级酝酿中 |

> 注：Claude Code 与 Codex 的 Issues 数据统计口径不同（前者为全局更新数），横向比较时以精选 Top 10 为基准更合理。PR 侧 Codex、Gemini、OpenCode 三者在 24h 内均有 10 个 PR 推进，属于最活跃梯队。

---

## 3. 共同关注的功能方向

### 3.1 Windows 平台体验（波及面最广）
| 工具 | 代表 Issue | 具体诉求 |
|------|-----------|---------|
| Claude Code | #85891（167👍）、#49917、#88561、#88430 | 窗口置顶、安装失败、Bash 反斜杠折叠、VS Code 焦点丢失 |
| OpenAI Codex | #41049、#25178、#41463、#39954 | 握手退出、CUA 截图失败、WSL 路径反序列化、远程连接循环 |
| Copilot CLI | #4683、#4701、#4702 | PowerShell 约束模式报错、长路径截断、路径分隔符去重失败 |
| OpenCode | #2999（27👍） | Windows 终端 Ctrl-C 直接崩溃 |

**结论**：Windows 是当前所有工具共同的"质量洼地"，且反馈量级与修复速度严重不匹配，已成社区信任赤字的首要来源。

### 3.2 MCP/OAuth 生态深化
- **Copilot CLI**：MCP 初始化双协议冲突（#4525）、OAuth 令牌跨会话复用失败（#4695）
- **Gemini CLI**：MCP OAuth 流程强制 RFC 9207 签发者识别（#29117，已合入）
- **Kimi Code CLI**：ACP 认证门禁阻断自定义提供商接入（#2633）

**结论**：MCP 已从"能否连接"进入"认证安全 + 协议兼容 + 凭据复用"的精细化阶段。

### 3.3 会话/检查点可管理性
- **Codex**：`/rewind` 全量恢复（211👍）、日志膨胀至 42GB（#24948）
- **Copilot CLI**：Compaction 空响应（#2861）、恢复大会话无加载提示（#4714）
- **OpenCode**：压缩失败自动重试（#47159）、遗弃压缩任务清理（#47178）
- **Gemini CLI**：checkpoint 路径穿越修复（#29192）、畸形 JSON 降级（#29195）

**结论**：用户对会话数据的"增删查管"需求已追上代码能力本身，存储格式（delta/DAG vs 全量 JSONL）将成为下一阶段技术分水岭。

### 3.4 Agent 行为可靠性与可观测性
- **Gemini CLI**：Subagent MAX_TURNS 中断被误报为成功（#22323）、工具输出 24MB 击穿上下文（#27738）
- **Claude Code**：权限系统 30+ 开放 issue（#30519）、Bash 工具静默数据损坏（#88561）
- **OpenCode**：工具调用后永久卡 busy（#40468）
- **Copilot CLI**：OOM 崩溃（#4699）、文件搜索线程 CPU 失控（#4710）

**结论**：工具执行层的"静默撒谎"（误报、吞数据、卡死）是开发者容忍度最低的问题类别，正倒逼各工具建立输出截断、状态机收敛、审计追踪等可靠性机制。

### 3.5 模型服务灵活控制
- **Copilot CLI**：Auto 模式模型池限制（#4218，13👍）、自定义端点收到错误模型 ID（#4680）
- **Codex**：GPT-6-Astra 通过 API 配置接入（#42605）、模型默认值被覆盖无提示（#42639）
- **Kimi Code CLI**：自定义提供商（OpenRouter）401/被 ACP 门禁阻断（#290、#2633）

**结论**：BYOK（自带密钥）与模型路由细粒度控制成为跨工具诉求，用户要求"自己的模型自己说了算"。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 差异化优势 | 当前重心 | 目标用户 |
|------|---------|-----------|---------|---------|
| **Claude Code** | 深度代码代理 + 插件生态 | 插件/Hooks 体系最先进（Function Hooks 提案 24h 55 评论）；diff 面板、成本洞察等工程化细节完善 | 信任修复（权限系统、Windows）、插件能力扩展、GitLab 集成 | 专业开发者、企业团队 |
| **OpenAI Codex** | 模型前沿 + 全模态控制 | GPT-6-Astra 率先接入；Remote Control（Android 远程桌面）多端协同；TUI 渲染持续打磨 | 存储架构改革（rollout JSONL 膨胀）、Windows 故障修复、用量透明化 | 追求最新模型能力的开发者、Pro 订阅用户 |
| **Gemini CLI** | 安全默认 + 企业级硬化 | 安全修复密度最高（Git 环境变量、路径边界、ACL 校验）；Nightly 日更反馈闭环 | 安全加固、Subagent 语义修正、浏览器子代理（Wayland）适配 | 企业环境、对供应链安全敏感的团队 |
| **Copilot CLI** | GitHub 生态 + 企业治理 | 与 GitHub 深度耦合（远程会话、企业策略）；版本稳定（v1.0.x）；MCP 支持推进务实 | MCP 认证稳定性、资源占用治理、企业策略兼容 | GitHub 重度用户、企业开发组织 |
| **Kimi Code CLI** | 轻量接入 + 第三方模型 | 支持 OpenRouter 等自定义模型；WebUI 场景；社区规模较小但方向明确 | 尚在收束与验证阶段，ACP 自定义提供商门禁是当前最大争议点 | 国内开发者、开源模型用户 |
| **OpenCode** | 开源可自托管 + 桌面端 | Desktop 深链接、订阅计费模式（虽有问题但说明商业模式探索）；后台任务面板/Tasks UI 领先 | 计费系统可靠性、TUI 稳定性、老 CPU 兼容性 | 开源偏好者、自托管团队 |
| **Qwen Code** | 国产开源 + 轻量高效 | v0.23.0 分支选择器体验优化；OpenTUI 迁移旨在根治渲染闪烁 | TUI 架构现代化、安全漏洞（DingTalk 密钥泄露等）修复 | 阿里云生态开发者、国内企业 |

**技术路线差异**：
- **渲染层**：Qwen 从 ink → OpenTUI 迁移，Claude/Codex 全屏模式 + 传统 TUI 并存，OpenCode 侧重桌面 WebView。
- **扩展模型**：Claude Code 走"插件 + Hooks"深度自定义路线；Copilot 走"官方 MCP + Agent Plugins"受控生态路线；Gemini 侧重安全加固而非扩展暴露出行业分化。
- **发布策略**：Gemini 日更 Nightly、Codex alpha 多线并行属"快速试错"型；Copilot/Kimi 低频稳定型；Claude/Qwen 中等节奏兼顾稳定与新功能。

---

## 5. 社区热度与成熟度

### 5.1 社区活跃度排名
1. **Claude Code**：50 条 Issue 日更新 + 高赞问题集中（#85891 达 167👍），社区基数最大
2. **OpenAI Codex**：10 PR/日 + 211👍 的 `/rewind` 榜首需求，需求密度高
3. **Gemini CLI**：PR/Issue 双 10 均衡，安全 PR 密集但 Issue 热度相对分散
4. **OpenCode**：社区规模中等，但对桌面/计费方向反馈强烈
5. **Copilot CLI**：Issue 活跃但 PR 挂零，官方响应节奏放缓
6. **Qwen Code**：公开社区讨论集中在架构级跟踪 issue，常态热度一般
7. **Kimi Code CLI**：以关闭旧 issue 为主，新问题仅 1 个，社区处于低活跃期

### 5.2 成熟度评估
- **成熟稳定型**：Claude Code（企业级功能完整）、Copilot CLI（v1.0.x 已有治理体系）
- **快速迭代/调整期**：Codex（存储架构待重构 + 新模型接入）、Gemini（安全主题持续高强度）
- **上升期**：OpenCode（商业化探索 + 桌面端布局）、Qwen Code（架构升级拐点）
- **收缩/观望期**：Kimi Code（多 issue 关闭，路线待明确）

---

## 6. 值得关注的趋势信号

### 6.1 "安全默认"正从口号变为工程实践
Gemini 单日 10 个 PR 中过半为安全修复（Git 环境变量三元组一致性、系统配置 ACL 校验、扩展环境变量清洗、checkpoint 路径穿越）；Claude Code PR #87079 修复安全规则 glob 静默失效。**信号**：AI CLI 已进入攻击者视野，供应链与宿主环境安全成为选型硬指标。

### 6.2 会话存储架构面临"数据爆炸"临界点
Codex 用户 `~/.codex` 膨胀至 42GB（月度增长 28.6GB），极端案例 110GiB；Copilot 长会话 OOM；Gem

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**：github.com/anthropics/skills | **数据截止**：2026-09-04
**说明**：所有高热度 PR 当前均为 **Open** 状态，尚未合并。

---

## 1. 热门 Skills 排行

### 🥇 #1298 — skill-creator 评估工具链修复（讨论热度第 1）
- **功能**：修复 `run_eval.py` 对所有 skill 描述一律报告 `recall=0%` 的核心缺陷，并同时解决 Windows 流读取、触发器检测失效及并行 worker 异常。
- **社区热点**：直接回应了 #556 等 10+ 独立复现报告。社区核心担忧在于——description 优化循环一直在"针对噪声优化"，整个 skill-creator 的评估信号已不可信。这是影响生态根基的关键修复。
- **状态**：Open（2026-06-10 创建）
- 🔗 https://github.com/anthropics/skills/pull/1298

### 🥈 #514 — document-typography 文档排版技能
- **功能**：为 AI 生成文档提供排版质量控制，覆盖孤词换行、寡行段落（标题滞留页尾）、编号错位等高频问题。
- **社区热点**："用户很少主动要求排版，但每个 Claude 生成的文档都会受影响"——直击 AI 文档普遍痛点，被社区视为低成本高收益的实用型技能。
- **状态**：Open（2026-03-04 创建）
- 🔗 https://github.com/anthropics/skills/pull/514

### 🥉 #1615 — scnet-hpc 超算集群操作技能
- **功能**：通过 profile 化 SSH + Slurm 工作流操作 SCNet HPC 集群，涵盖连接配置、作业生成、分区/内存/模块/加速器指引及集群发现。
- **社区热点**：代表社区从通用开发向**专业垂直计算领域**延伸的趋势（2026-08 新增，短期内即获高关注）。
- **状态**：Open（2026-08-20 创建）
- 🔗 https://github.com/anthropics/skills/pull/1615

### #1628 — Hivemind 零成本多智能体编排
- **功能**：让 Claude Code 将机械性工作委托给运行免费模型的 headless opencode workers，Claude 仅保留规划、审查与合并职责。
- **社区热点**：核心观点是"昂贵模型的上下文才是稀缺资源，而非其智能"。代表社区对**多智能体编排经济性**的前沿探索。
- **状态**：Open（2026-08-21 创建）
- 🔗 https://github.com/anthropics/skills/pull/1628

### #723 — testing-patterns 测试模式技能
- **功能**：覆盖完整测试栈——Testing Trophy 理念、单元测试 AAA 模式、测试命名、纯函数与边界用例、React 组件测试（Testing Library）。
- **社区热点**：测试生成是 Claude Code 高频场景，社区对系统性、可操作的测试方法论需求强烈。
- **状态**：Open（2026-03-22 创建）
- 🔗 https://github.com/anthropics/skills/pull/723

### #568 — ServiceNow 企业平台技能
- **功能**：覆盖 ITSM、ITOM、ITAM/SAM Pro、FSM、HRSD/CSM、SPM/PPM、漏洞响应、安全事件响应及 IntegrationHub 的 ServiceNow 平台级助理。
- **社区热点**：企业级平台自动化是社区重点方向；该 PR 从 3 月持续活跃至 8 月，讨论跨度最长，侧面反映其范围之广与关注度之持久。
- **状态**：Open（2026-03-08 创建）
- 🔗 https://github.com/anthropics/skills/pull/568

---

## 2. 社区需求趋势

### 🔴 安全与信任边界（最集中关切）
- **#492（43 条评论，榜首）**：社区技能在 `anthropic/` 命名空间下分发，构成信任边界滥用——用户可能向非官方技能授予高级权限。这是当前生态头顶的最大隐患。
- 🔗 https://github.com/anthropics/skills/issues/492

### 🟠 技能分发与共享体验
- **#228**：组织级技能库/直接分享链接需求，当前 `.skill` 文件手动传输 + 手动导入流程被指过于繁琐（16 条评论，8 👍）。
- 🔗 https://github.com/anthropics/skills/issues/228

### 🟡 skill-creator 工具链可靠性
- **#556**：`run_eval.py` 对任何 query 都报 0% 触发率（12 条评论，7 👍），且 #1099、#1050 等 Windows 兼容性 PR 同源，说明**评估工具链的跨平台可靠性**已成为高频痛点。
- 🔗 https://github.com/anthropics/skills/issues/556

### 🟢 新技能方向提案
- **Agent 治理**（#412，已关闭

---

# Claude Code 社区动态日报（2026-09-04）

## 今日速览

昨日发布 v2.1.260，新增全屏模式下的 diff 面板（`/diff`）及 prompt-cache 未命中原因提示。社区层面，Windows 客户端“窗口置顶”问题（#85891）以 167👍 高居榜首，开发者对桌面端体验的长期不满集中爆发；同时一项名为 **Function Hooks** 的插件能力增强提案（#91870）在 24 小时内收获 55 条讨论，或将成为下一阶段插件系统的进化方向。

## 版本发布

**v2.1.260** 更新要点：

- 新增 diff 面板：全屏模式下在对话旁侧打开，实时显示 Claude 编辑过程中的未提交更改；可通过 `/diff` 命令切换。
- `/cost` 命令增强：补充 prompt-cache 未命中的可能原因（如工具定义或系统提示词变更、空闲超过 TTL 等），帮助用户定位成本异常。

## 社区热点 Issues

过去 24 小时共更新 50 条 Issue，以下为最值得关注的 10 条：

**1. [BUG] Claude Desktop (Windows 11) 窗口始终置顶，无设置可关闭** ⭐ 167👍
[#85891](https://github.com/anthropics/claude-code/issues/85891)
75 条评论，持续近一个月仍无官方修复。Windows 桌面端窗口置顶行为（对应 macOS 的 #66516）严重干扰多任务工作流，社区呼声极高，是目前最热的单一问题。

**2. [Feature] Function Hooks：让插件强大 10 倍** ⭐ 30👍
[#91870](https://github.com/anthropics/claude-code/issues/91870)
昨日新提交的提案，通过参数化 `$` 对象 + 副作用跟踪 + Express/Koa 风格注册链，实现对 Claude Code 深度且安全的自定义。55 条评论显示核心用户对插件扩展能力有强烈诉求，官方已关注。

**3. [Feature] 添加 GitLab 集成（仓库连接、MR、移动访问）** ⭐ 131👍
[#12346](https://github.com/anthropics/claude-code/issues/12346)
51 条评论，GitLab 集成诉求已持续近一年，点赞数位列第二。大量企业用户受限于 GitHub 唯一绑定的现状，期待官方支持。

**4. [BUG] Windows 安装器失败：AddPackage HRESULT 0x80073CF6** 
[#49917](https://github.com/anthropics/claude-code/issues/49917)
37 条评论，前一次“成功”安装留下不一致状态后，后续更新被阻塞。涉及 4 月至今仍开放的安装器缺陷，影响 Windows 用户升级路径。

**5. [BUG] 权限匹配系统根本性损坏——30+ 开放 Issue，无官方参与** ⭐ 78👍
[#30519](https://github.com/anthropics/claude-code/issues/30519)
28 条评论。权限系统自 2025 年中起存在 30+ 相关问题，官方仅有一条无效建议，社区已开始自行编写 PreToolUse 绕过。信任赤字严重。

**6. [BUG] Bash cd 复合读保护误报（Windows Git Bash，2.1.257-2.1.259 回归）** ⭐ 52👍
[#91650](https://github.com/anthropics/claude-code/issues/91650)
在存在 Read 拒绝规则时，对绝对路径的 `cd` 也会触发保护提示。仅 3 天收获 52 赞，近期版本引入的回归，影响自动化流程。

**7. [BUG] 移动端输入草稿在 app 后台化时被静默丢弃**
[#71603](https://github.com/anthropics/claude-code/issues/71603)
Pixel 8 Pro 上，agent 忙碌期间输入的文本成为未确认草稿，切后台后丢失。涉及移动端输入安全，有 11 条评论。

**8. [BUG] Bash 工具将 `\\` 静默折叠为 `\`，破坏正则与路径**
[#88561](https://github.com/anthropics/claude-code/issues/88561)
单引号、双引号、heredoc 内均发生，违反 POSIX 引用语义。对 Windows 用户的正则表达式和路径处理造成静默数据损坏。

**9. [BUG] VS Code 扩展 2.1.235+：面板抢焦点却不聚焦输入框**
[#88430](https://github.com/anthropics/claude-code/issues/88430)
新加载的 Claude 面板获取键盘焦点但输入框未聚焦，导致快捷键被吞，需鼠标点击恢复。VS Code 用户每日触及的高频回归。

**10. [BUG] Fable 5.1：最终答案以 thinking 块输出，AskUserQuestion 前不可见**
[#91939](https://github.com/anthropics/claude-code/issues/91939)
Windows 上使用 `claude-fable-5-1` 时，AskUserQuestion 前的说明文字被错误放入 thinking 块，用户看不到解释。新模型在特定交互形态下的输出缺陷。

## 重要 PR 进展

过去 24 小时共 5 个 PR 更新，全部列出如下：

**1. fix(security-guidance): 使 ** glob 匹配零深度路径**
[#87079](https://github.com/anthropics/claude-code/pull/87079)
修复安全规则中 `**` 因 fnmatch 委托导致无法匹配顶层文件的问题。由于涉及安全规则，静默不匹配的后果严重。

**2. Update /frontend-design SKILL.md**（已关闭）
[#91894](https://github.com/anthropics/claude-code/pull/91894)
前端设计技能文档更新，已关闭。

**3. docs: 对齐 code-review README 与当前验证命令**
[#79150](https://github.com/anthropics/claude-code/pull/79150)
文档修复，移除 README 中已不存在的 git blame 历史 agent、0-100 评分体系和 80 分阈值的陈旧描述。

**4. validate-agent.sh：修复 set -e 导致的首个警告即中止**
[#89404](https://github.com/anthropics/claude-code/pull/89404)
修复 `((warning_count++))` 在 set -e 下返回非零导致校验提前退出的问题，并停止对合法 agent 的误报。关联公开 issue #83803。注意此 PR 与 #66416 解决同一类问题。

**5. fix(plugin-dev): 验证器脚本因 set -e 在首个发现即中止**
[#66416](https://github.com/anthropics/claude-code/pull/66416)
与 #89404 高度重叠，修复三个验证脚本（validate-agent.sh、hook-linter.sh、validate-hook-schema.sh）的共同问题，已开放 3 个月。

## 功能需求趋势

综合全部 Issue，社区当前最关注的功能方向：

- **GitLab 集成**（#12346）：131👍，企业用户的核心诉求，与 GitHub 单一绑定形成对照。
- **插件/Hooks 能力增强**（#91870）：Function Hooks 提案一天 55 评论，Express 风格组合模型获社区认可。
- **持久化上下文/记忆**（#91913）：跨 CLI 重启保留会话上下文，多会话开发工作流刚需。
- **Windows 桌面体验修复**（#85891、#88093）：窗口置顶问题双 Issue 合计 200+👍，桌面端体验成为 Windows 用户首要痛点。
- **权限系统重构**（#30519)：78👍，30+ 相关 issue 未解，社区共识趋向于“推倒重来”。

## 开发者关注点

- **Windows 平台问题集中爆发**：窗口置顶、安装失败（0x80073CF6）、Bash 转义损坏、VS Code 焦点丢失——Windows 用户体验明显落后于 macOS/Linux，且修复速度跟不上反馈速度。
- **Bash 工具可靠性**：`\\` 折叠（#88561）、整文件转储（#91947）均属工具层静默错误，开发者对“工具撒谎”的容忍度极低。
- **权限系统信任危机**：30+ 开放 issue + 无官方回应，已促使社区自建 workaround，这是平台型工具最危险的信号。
- **移动端输入安全**：iOS/Android 均存在未发送草稿丢失问题（#71603、#63975），移动端作为“随时记录”场景的价值被削弱。
- **安全过滤器误报**：一组 `cyber` 类误报 issue（#79070、#79065 等）虽已关闭，但 7 月密集出现，显示安全过滤对合法开发场景仍有过分干预。
- **模型降级/错配**：子代理模型覆盖被静默替换为其它模型（#82252），Fable 5.1 输出格式缺陷（#91939），新模型接入质量有待加强。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-04

## 今日速览

昨日 Codex 发布了 0.153.2 补丁（修正 GPT-6-Astra Fast 档位描述）以及 0.154.0 系列 alpha 版本，同时通过 backport 在 0.153.x 中引入对 GPT-6-Astra 的 API 配置支持。社区侧，Windows 平台故障（握手退出、CUA 截图失败、WSL 项目创建异常）与会话存储无限膨胀问题仍是讨论焦点，其中 `/rewind` 全量恢复功能以 211 👍 高居需求榜首。

## 版本发布

| 版本 | 类型 | 主要内容 |
|------|------|----------|
| [rust-v0.153.2](https://github.com/openai/codex/compare/rust-v0.153.1...rust-v0.153.2) | 补丁 | 修正 GPT-6-Astra Fast 档位描述文本：“1.5x speed” → “2x speed, increased usage”。仅影响显示文本，不影响请求行为。（[#42632](https://github.com/openai/codex/pull/42632)） |
| [rust-v0.153.1](https://github.com/openai/codex/compare/rust-v0.153.0...rust-v0.153.1) | 补丁 | 新增通过 API 配置 GPT-6-Astra 的支持，不改变默认模型，也不在模型选择器中显示。（[#42605](https://github.com/openai/codex/pull/42605)） |
| [rust-v0.154.0-alpha.1/.2/.3](https://github.com/openai/codex/releases) | 预发布 | 0.154.0 系列三个 alpha 连续发布，暂无详细变更说明。 |

## 社区热点 Issues

### 1. [#41049：code-mode host 握手阶段异常退出，5.6 模型无法正常工作](https://github.com/openai/codex/issues/41049)
- 评论 45 | 👍 1 | Windows 10
- **重要性**：高热度 bug，Windows 用户在本地命令执行通道初始化时遭遇 `code-mode host exited during handshake`，导致目录读取失败。多个用户确认影响 GPT-5.6 模型使用。

### 2. [#11626：CLI 增加 `/rewind` 检查点恢复（对话 + 代码改动双重回滚）](https://github.com/openai/codex/issues/11626)
- 评论 40 | 👍 211 | 功能需求
- **重要性**：社区呼声最高的功能请求。用户希望从同一检查点同时恢复对话上下文和已应用的代码修改，当前 Esc 只能回滚对话。

### 3. [#25178：Windows 10 22H2 上 Computer Use 截图失败](https://github.com/openai/codex/issues/25178)
- 评论 38 | 👍 17 | Windows
- **重要性**：Windows CUA 功能的核心障碍。`SetIsBorderRequired` 调用返回 `0x80004002`，导致 `get_window_state` 截图失败，但窗口枚举、激活、键盘输入均正常。

### 4. [#35746：分页历史丢失有效 rollout 记录并复用序号](https://github.com/openai/codex/issues/35746)
- 评论 35 | 👍 3 | CLI / 会话
- **重要性**：分页 rollout 历史解码出现 `RolloutLine` 不一致，有效记录丢失且序号复用，影响会话恢复可靠性。涉及 0.146.0-alpha 系列。

### 5. [#24948：Codex 会话日志膨胀至 700MB-2GB](https://github.com/openai/codex/issues/24948)
- 评论 31 | 👍 4 | TUI / 存储
- **重要性**：反复 compactions 和原始工具输出导致会话记录持续膨胀。用户反馈在 Darwin arm64 上使用 GPT-5.5 时日志无节制增长。

### 6. [#41463：Windows + WSL 无法创建项目——AbsolutePathBuf 缺少基础路径反序列化失败](https://github.com/openai/codex/issues/41463)
- 评论 23 | 👍 12 | Windows + WSL
- **重要性**：Codex Desktop 在 WSL2 环境下创建项目被阻断，路径反序列化缺陷影响跨文件系统工作流，是 Windows + WSL 用户的高频痛点。

### 7. [#39954：Windows + Android 远程控制陷入重连循环](https://github.com/openai/codex/issues/39954)
- 评论 23 | 👍 0 | 远程控制
- **重要性**：虽然 409 陈旧服务器问题已解决，但 WebSocket 连接成功后仍反复重连，Android 端无法正常使用远程控制桌面。

### 8. [#41220：[Meta] Codex 用量异常消耗/配额快速耗尽追踪](https://github.com/openai/codex/issues/41220)
- 评论 18 | 👍 9 | 配额
- **重要性**：汇总了多个“配额/积分消耗明显快于基线”的报告，追踪用量计算不一致问题。对 Pro 用户影响直接，社区关注度高。

### 9. [#39897：macOS 上已删除的 ChatGPT 对话残留在侧栏无法移除](https://github.com/openai/codex/issues/39897)
- 评论 15 | 👍 4 | macOS App
- **重要性**：删除会话后 UI 状态不同步，侧栏残留条目无法清除，影响桌面端基础体验。

### 10. [#40782：macOS 更新后全局 UI 文本变细且模糊](https://github.com/openai/codex/issues/40782)
- 评论 14 | 👍 4 | macOS App
- **重要性**：26.820.60940 更新后界面渲染回归，简体中文环境下 light theme 文本模糊，影响大量中文用户阅读体验。

## 重要 PR 进展

### 1. [#42650：将助手文件引用渲染为本地链接](https://github.com/openai/codex/pull/42650)
- 将 Markdown 中的 `codex-file-citation` 指令转为可点击的本地文件链接，正确处理 Windows 分隔符、Unicode 和带 Markdown 特殊字符的路径。

### 2. [#42641：全屏覆盖层退出后恢复内联 TUI](https://github.com/openai/codex/pull/42641)
- 修复 inline 模式退出 alternate-screen 后残留陈旧覆盖层单元、历史记录滚出视口的问题。

### 3. [#42640：强化 TUI 对助手标记的解析能力](https://github.com/openai/codex/pull/42640)
- 引入统一解析器，支持带引号/无引号属性、嵌套花括号、转义引号及畸形输入，应用于 Git action 回执和代码注释解析。

### 4. [#42639：模型默认值被更高优先级配置覆盖时给出警告](https://github.com/openai/codex/pull/42639)
- 当模型/推理强度/服务档位的默认值写入成功但被更高优先级配置层覆盖时，TUI 的“保存成功”提示不再误导用户。

### 5. [#42638 / #42632：更新 GPT-6-Astra Fast 档位速度描述](https://github.com/openai/codex/pull/42638)
- 将 Fast 档位从 “1.5x speed” 修正为 “2x speed, increased usage”，同步合入 0.153.2 补丁分支。

### 6. [#42634：为 ThreadManager 添加可注入附件存储](https://github.com/openai/codex/pull/42634)
- 新增 `codex-attachment-store` crate，提供存储无关的附件元数据/引用/错误类型和异步持久化接口，内联实现保留附件字节为 media-typed 数据。

### 7. [#42631：在 voice host 中初始化打包的 GStreamer 运行时](https://github.com/openai/codex/pull/42631)
- 增加 `initializeRuntime` 协议交换，使语音助手在握手/关机之外能安全加载验证打包的原生运行时。

### 8. [#42624：集中管理提示词图片细节模式](https://github.com/openai/codex/pull/42624)
- 新增 `HIGH_DETAIL` 与 `ORIGINAL_DETAIL` 共享常量及标准缩放限制，核心图片预处理不再各自定义局部阈值。

### 9. [#42623：Noise 握手由 exec server 初始化超时约束](https://github.com/openai/codex/pull/42623)
- 在发送 JSON-RPC `initialize` 前等待认证的 Noise 握手完成，握手与 RPC 共享同一初始化超时配置。

### 10. [#42619：将 GPT-6-Astra 加入 Amazon Bedrock 目录](https://github.com/openai/codex/pull/42619)
- 添加 `openai.gpt-6-astra` 到 Bedrock 模型目录，涵盖 global 与美国跨区域变体，保留内置模型元数据并叠加 Bedrock 能力与标识。

## 功能需求趋势

1. **会话/存储可管理性**（最高频）：`/rewind` 全量恢复（#11626）、会话 fork 去重/DAG 存储（#22593）、日志体积控制（#24948）——社区对会话数据的“增删查管”需求强烈。
2. **Windows 平台体验修复**：覆盖 WSL 项目创建（#41463）、CUA 截图（#25178）、远程控制（#39954）、更新后启动卡顿（#41539）等多个 Windows 专属故障。
3. **新模型 GPT-6-Astra 支持**：通过 hidden API 配置和 Bedrock 目录接入，社区对 6 系列模型的可用性高度关注。
4. **MCP 生态完善**：OAuth issuer 覆盖（#38944）、工具发现错误上报（#42598）、远程环境可信请求头（#42606）——MCP 服务治理能力在稳步增强。
5. **远程控制/多端协同**：Android 远程控制的稳定性与安全校验（#38128）是移动端用户的核心诉求。

## 开发者关注点

- **存储膨胀问题反复出现且未根治**：多条 issue 指向同一根因——compaction 将完整 `replacement_history` 重复嵌入 rollout JSONL，fork 后呈乘法式增长。有用户 `~/.codex` 已达 42GB，单月增长 28.6GB，甚至出现 110GiB 的极端案例（#34268、#34337、#41806）。开发者期望官方尽快采用 delta/DAG 存储方案。
- **Windows 平台成为 bug 重灾区**：从握手失败（#41049）到 MSIX 更新后 8-12 分钟的无头启动（#41822、#41539），Windows 用户在多条 issue 中详细附带了日志与复现步骤，但修复进度缓慢。
- **配额/用量计费透明度不足**：#41220 作为 meta 追踪帖汇集了多起“用量异常消耗”报告，用户普遍反映本地 token 计数与服务器计费不一致，缺乏明确的用量明细。
- **模型配置覆盖缺乏提示**：#42639 对应的 PR 侧面印证了用户痛点——默认模型设置被静默覆盖时没有任何感知，直到 PR 合入后才会有警告。

---

*数据来源：[github.com/openai/codex](https://github.com/openai/codex) | 统计区间：2026-09-03 ~ 2026-09-04*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-04）

## 1. 今日速览
- 发布 v0.60.0-nightly.20260904 版本，核心变更为在 MCP OAuth 流程中强制启用 RFC 9207 签发者识别，提升认证安全性。
- 社区围绕 Subagent 恢复语义、终端拖放支持、Shell 命令卡死等老问题持续讨论，部分 Issue 在近 6 个月后仍有活跃跟踪。
- 安全类修复在 PR 中占比显著提升，涉及 Git 环境变量清洗、扩展加载器路径边界、NTFS 短名绕过等多个攻击面。

## 2. 版本发布
**v0.60.0-nightly.20260904.g87a9c71d5**（2026-09-04）
- `fix(core)`: 在 MCP OAuth 流程中强制实施 RFC 9207 issuer identification（@jvargassanchez-dot，#29117）
- `chore(release)`: 版本号例行更新

🔗 https://github.com/google-gemini/gemini-cli/releases

## 3. 社区热点 Issues（Top 10）

**#22323 [P1/需重新测试] Subagent MAX_TURNS 中断被误报为 GOAL 成功**
`codebase_investigator` 子代理在达到最大轮次限制后仍返回 `status: "success"`、`Termination Reason: "GOAL"`，掩盖了实际中断。社区 13 条评论持续追踪 6 个月，属于影响 Agent 结果可信度的核心缺陷。
🔗 https://github.com/google-gemini/gemini-cli/issues/22323

**#27855 [P3/已关闭] 原生终端拖放与图片拖入支持（多模态对齐）**
用户提议对标 Claude Code，为 Gemini CLI 增加终端拖放文件/图片能力，涵盖 `.png`、`.jpg` 等格式。该请求关闭时已有 9 条评论，说明多模态输入路径的社区呼声较高。
🔗 https://github.com/google-gemini/gemini-cli/issues/27855

**#25166 [P1] Shell 命令执行完毕后卡在 “Awaiting user input”**
简单 CLI 命令执行完成后频繁挂起，界面仍显示命令活跃。4 条评论、3 个 👍，是开发者在交互流程中高频遭遇的卡死问题。
🔗 https://github.com/google-gemini/gemini-cli/issues/25166

**#26525 [P2] Auto Memory 日志缺乏确定性脱敏**
本地 transcript 在脱敏前就被送入模型上下文，且 skill 内容存在外泄风险。5 条评论，属于安全与隐私方向的持续关注点。
🔗 https://github.com/google-gemini/gemini-cli/issues/26525

**#22745 [P2] AST 感知的文件读取、搜索与代码库映射评估**
EPIC 级追踪 Issue，探讨用 AST 工具提高方法级读取精度、减少 token 浪费。7 条评论持续关注，代表社区对代码理解效率提升的长期诉求。
🔗 https://github.com/google-gemini/gemini-cli/issues/22745

**#21968 [P2/需重新测试] Gemini 不主动使用 skills 和 sub-agents**
社区反馈 Gemini CLI 几乎不会自发调用自定义 skills/sub-agents，必须显式指示才会使用。6 条评论，是 Agent 自动化能力的关键短板。
🔗 https://github.com/google-gemini/gemini-cli/issues/21968

**#27738 [P1] 超大工具输出未封顶导致 1M 输入上限击穿并永久卡死会话**
Headless 会话中 `run_shell_command` 输出 24MB 单行 JSON，下一轮直接 HTTP 500。暴露了工具输出缺乏截断/封顶机制的问题，2 条评论但严重性较高。
🔗 https://github.com/google-gemini/gemini-cli/issues/27738

**#22232 [P3] browser_agent 韧性增强：自动会话接管与锁恢复**
`BrowserManager` 对 browser profile 锁定采用 fail-fast 策略，`persistent` 模式下遇到孤立进程即失败。4 条评论，与 Wayland 失败问题形成浏览器子代理的稳定性双壁。
🔗 https://github.com/google-gemini/gemini-cli/issues/22232

**#28962 [P2] 扩展文档推荐的 `excludeTools` 写法永不生效**
`best-practices.md` 中推荐 `["run_shell_command(rm -rf *)"]` 形式，但实际格式化逻辑无法匹配该模式。3 条评论，直接影响开发者对安全功能的信任。
🔗 https://github.com/google-gemini/gemini-cli/issues/28962

**#21983 [P1/需重新测试] Wayland 下 browser subagent 失败**
浏览器子代理在 Wayland 环境下频繁失败（Termination Reason: GOAL），4 条评论、1 个 👍。与 #22232 共同构成浏览器子代理环境的适配缺口。
🔗 https://github.com/google-gemini/gemini-cli/issues/21983

## 4. 重要 PR 进展（Top 10）

**#29196 `chore/release` 版本号例行递增**
Nightly 发布流程自动化，确认 v0.60.0-nightly.20260904 版本对应的代码状态。
🔗 https://github.com/google-gemini/gemini-cli/pull/29196

**#28939 `fix(core)` 避免持久化中断响应的占位文本（已合并）**
修复中断的工具响应被当作模型响应持久化，随后的工具调用会重复该占位文本的问题（对应 #28927）。
🔗 https://github.com/google-gemini/gemini-cli/pull/28939

**#28930 `fix(core)` 移除不安全的 `diff.external` 覆盖（已合并）**
#28792 引入的 `['diff.external', '']` 在 Git 中不生效且可能导致外部 diff 工具注入。该 PR 彻底移除该覆盖，对应 #28928。
🔗 https://github.com/google-gemini/gemini-cli/pull/28930

**#28938 `fix(core)` 保持 GIT_CONFIG_* 环境变量三元组内部一致（已合并）**
解决脱敏删除编号 key/value 对一半后，Git 无法解析环境变量的问题，并阻止 `ShellExecutionService` 在清洗后恢复敏感 Git 配置。
🔗 https://github.com/google-gemini/gemini-cli/pull/28938

**#29106 `fix(core)` 在 EOF 时刷新最后一条 SSE 事件，无需尾随空行**
SSE 解析器在流结束无空行时静默丢弃最终缓冲事件，导致 `finishReason`/usage 元数据丢失。该 PR 修补了非规范代理场景下的数据缺口。
🔗 https://github.com/google-gemini/gemini-cli/pull/29106

**#29110 `fix(core)` 将 `read_file` 内容路由经 FileSystemService**
修复 `read_file` 绕过注入的 `FileSystemService` 直接读取本地磁盘的问题，使得 ACP 客户端声明的 `fs.readTextFile` 能力约束生效。
🔗 https://github.com/google-gemini/gemini-cli/pull/29110

**#29115 `fix(config)` 系统级配置路径施加严格属主与 ACL 校验**
在 Windows（PowerShell ACL 检查）和 POSIX 上验证文件属主与 ACL，防止系统级配置被篡改后加载恶意设置。
🔗 https://github.com/google-gemini/gemini-cli/pull/29115

**#29195 `fix(checkpoint)` 非数组 history 降级为空检查点，避免 resume 崩溃**
`loadCheckpoint` 对 `{"history": null}` 等畸形 JSON 直接抛 TypeError 崩溃 `/resume`。现改为与不可解析文件相同的降级路径。
🔗 https://github.com/google-gemini/gemini-cli/pull/29195

**#29192 `fix(checkpoint)` 遗留 raw tag 路径限制在 checkpoints 目录内**
`/chat delete <tag>` 对 `../` 路径穿越的 tag 未做校验，可删除目录外文件。该 PR 在 `deleteCheckpoint` 和 `_getCheckpointPath` 中夹紧路径边界，属于安全修复。
🔗 https://github.com/google-gemini/gemini-cli/pull/29192

**#28863 `fix(extensions)` 扩展环境变更需用户同意并清洗运行环境变量**
扩展更新可绕过同意检查，向 MCP server 进程注入未授权环境变量。该 PR 将环境配置纳入同意字符串，并清洗自定义环境变量。
🔗 https://github.com/google-gemini/gemini-cli/pull/28863

## 5. 功能需求趋势

从全部 50 条 Issue 及 PR 的主题聚类来看，社区当前最关注以下方向：

- **Agent 可靠性与可观测性**：Subagent 恢复语义错误、trajectory 不可见、技能/子代理利用率不足（#22323、#21968、#22598），说明用户对 Agent 自治行为的透明度和准确性有较高要求。
- **安全加固**：围绕 Git 环境变量清洗、扩展加载器路径边界、NTFS 8.3 短名绕过、CrUX API key 硬编码（#28930、#28938、#29115、#29116、#29158）形成了密集 PR 序列，安全已成为当前迭代的核心主题。
- **多模态与交互增强**：终端拖放支持（#27855）代表社区对多模态输入（图片、文件）和无障碍交互的工作流期待。
- **AI 记忆系统优化**：Auto Memory 的脱敏、无效补丁隔离、低信号会话重试等系列 Issue（#26525、#26523、#26522）反映用户对记忆系统安全性和效率的持续关注。
- **平台适配**：Wayland 浏览器子代理失败（#21983）、Windows longpaths（#28926）、NTFS 路径安全（#29116）表明跨平台兼容性仍是重点投入方向。

## 6. 开发者关注点

- **高优 Bug 根治需求**：Subagent 相关 P1 问题长期滞留（#22323、#25166、#21983），部分已超过 6 个月仍未关闭，开发者期待维护者给出明确的修复排期或 workaround。
- **工具输出治理**：24MB 输出直接击穿上下文（#27738）表明 `run_shell_command` 的输出截断/上限机制缺失，开发者需要启用或配置自动截断策略。
- **安全默认值**：`excludeTools` 文档模式与实现不符（#28962）、系统配置权限校验（#29115）、扩展环境变量泄漏（#28863）等安全软肋受到高频 PR 关注，社区正推动“安全默认开启”的实践。
- **配置与文档一致性**：多份文档（hooks 引用、extensions best-practices）与真实实现存在偏差（#28048、#28962），开发者呼吁文档随代码同步更新。
- **稳定性优先于新功能**：从 Issue 评论热度和 PR 方向看，社区当前更迫切希望修复卡死、崩溃、路径穿越等稳定性与安全问题，而非追求炫酷新功能。

---
*本日报基于 github.com/google-gemini/gemini-cli 公开数据自动聚合生成，对已关闭或 stale 标签的条目仅作客观展示。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-04）

## 今日速览

v1.0.83-4 正式发布，新增 MCP OAuth 登录的 Client ID Metadata Document（CIMD）支持，并优化了大会话恢复的输入响应速度。社区端，MCP 初始化协议兼容性（#4525）与 OAuth 令牌复用（#4695）成为讨论焦点，同时 Auto 模式模型池配置（#4218，👍13）连续多日保持高关注度。此外，多个严重稳定性问题（OOM 崩溃 #4699、文件搜索线程 CPU 跑飞 #4710）被集中报告。

## 版本发布

**v1.0.83-4**（过去 24 小时内发布）

- **新增**：为 MCP OAuth 登录添加 Client ID Metadata Document (CIMD) 支持。
- **改进**：
  - CLI 默认不再弹出中断会话恢复提示，启动流程更简洁。
  - 恢复大型会话时，输入提示框的响应速度明显提升。
- **修复**：沙箱文件工具现在能读取与开发者工具一致的配置（描述被截断，完整内容待官方 Release Notes）。

## 社区热点 Issues

以下精选过去 24 小时内更新最活跃、影响范围最大的 10 个 Issue：

**1. MCP 初始化协议兼容性故障（#4525）**
1.0.81-1 在完成现代 `server/discover` 探测后，仍会发送旧版 `initialize` 请求，导致 Python MCP SDK 2.0.0 双协议服务器返回 `-32022` 错误。该问题已持续两周，6 条评论，反映了 MCP 协议过渡期的兼容阵痛。
🔗 https://github.com/github/copilot-cli/issues/4525

**2. MCP OAuth 令牌跨会话复用失败（#4695）**
HTTP 型 MCP 服务器（PKCE, public client）的令牌缓存键经常变化，导致本应有效的令牌无法命中，被迫重复认证。直接拖累 MCP 服务器使用体验，5 条评论且仍在发酵。
🔗 https://github.com/github/copilot-cli/issues/4695

**3. Auto 模式模型池不可配置（#4218）**
社区高赞功能请求（👍13）：希望限制 Auto 模式可选的模型范围，以便控制成本和行为可预测性。目前仍处于 Open 状态，仅 1 条官方评论。
🔗 https://github.com/github/copilot-cli/issues/4218

**4. 缺少系统级提示词参数（#232）**
老牌功能请求（👍10）：希望增加 `--system-prompt` 参数，允许在仓库级指令文件之外注入全局系统指令。已开放近一年，评论 4 条，需求依然强烈。
🔗 https://github.com/github/copilot-cli/issues/232

**5. 远程会话被企业策略禁用（#3442）**
v1.0.51 后企业用户执行 `/remote on` 即报错。该问题已被关闭，但 6 条评论与 10 个 👍 表明企业远程会话仍是部署痛点，关闭原因可能是已修复或转入内部跟踪。
🔗 https://github.com/github/copilot-cli/issues/3442

**6. Compaction 反复返回空响应（#2861）**
在短会话（<30 轮）上对 Claude Opus 4.6 执行 `/compact`，连续 3 次因模型返回空响应而失败。评论 5 条，影响核心上下文管理功能。
🔗 https://github.com/github/copilot-cli/issues/2861

**7. 文件搜索线程失控：CPU 与磁盘双耗尽（#4710）**
`copilot --yolo` 会话空闲时，内部 `copilot-file-search` 线程持续占用 CPU 核心，并在 `~/.copilot/lo...` 下写入无上限日志。属于资源耗尽级严重 bug，昨日新上报。
🔗 https://github.com/github/copilot-cli/issues/4710

**8. 长会话 OOM 崩溃（#4699）**
1.0.82 在长 `--resume` 会话中反复触及 4 GiB V8 堆上限崩溃（14 小时内 3 次），且诊断报告直接写到用户当前工作目录，污染项目文件。👍2，属于高影响稳定性问题。
🔗 https://github.com/github/copilot-cli/issues/4699

**9. 自定义 OpenAI 兼容端点收到错误模型 ID（#4680）**
配置非 OpenAI 模型名（如 `mimo-v2.5`）时，CLI 仍发送 `gpt-5.4-nano` 作为请求体模型名，导致会话中断。影响 BYOK 用户。
🔗 https://github.com/github/copilot-cli/issues/4680

**10. 子代理无法访问已安装技能（#4708）**
主代理可发现并使用 `.copilot/installed-plugins` 下的技能，但其派生的子代理无法访问同名技能。影响 Agent Plugins 1.0 的多代理协作场景。
🔗 https://github.com/github/copilot-cli/issues/4708

## 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Requests。

## 功能需求趋势

从近期 Issue 中可提炼出以下社区最关注的功能方向：

- **MCP 生态深化**：从 OAuth 令牌复用（#4695）、协议版本兼容（#4525）到 Agent Plugins 发现机制（#4655），MCP 相关话题占比最高，说明社区正从“能用”走向“好用”。
- **模型服务灵活控制**：Auto 模式模型池限制（#4218）、per-agent 独立 provider（#4703）、系统提示词参数（#232）均指向同一诉求——用户希望对模型选择与行为配置拥有更细粒度的控制权。
- **企业治理能力**：远程会话策略（#3442）、内置插件市场可屏蔽（#4715）、技能目录在 ACP 模式下的支持（#4700）都反映了企业落地时的管控需求。
- **会话体验优化**：`/resume` 按当前目录过滤（#4704）、恢复大会话的加载状态提示（#4714）等请求表明，多会话重度用户的效率诉求正在上升。

## 开发者关注点

- **稳定与资源占用是首要痛点**：OOM 崩溃（#4699）、文件搜索线程 CPU/磁盘失控（#4710）、工具调用悬挂（#4670）等资源类 bug 集中出现，开发者对长时间运行场景的可靠性信心不足。
- **Windows 平台兼容性欠账明显**：PowerShell ConstrainedLanguage 模式下的 `$host.SetShouldExit()` 报错（#4683）、路径分隔符导致指令文件去重失败（#4702）、权限审批预览截断长路径（#4701）——Windows 企业用户环境问题尤为突出。
- **MCP 认证与初始化稳定性**：OAuth 令牌重复认证（#4695）和 `initialize` 协议混乱（#4525）在两个独立线程下被反复讨论，直接阻碍 MCP server 在生产环境落地。
- **会话状态管理受质疑**：allow-all 权限在 8 小时无操作后被静默丢弃（#4696）、排队的提示词在会话空闲后不被处理（#4705）、恢复会话极慢且无加载提示（#4714）——这些交互缺陷正在消耗用户的耐心。

---
*本日报数据来自 [github/copilot-cli](https://github.com/github/copilot-cli)，统计窗口为 2026-09-03 至 2026-09-04。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI 社区动态日报（2026-09-04）

### 今日速览
昨日仓库无新版本发布，但有一个 PR 与多个历史 Issue 更新。最值得关注的是新开放的 issue #2633：1.17+ 版本中 ACP 认证门禁会阻断不需要 Kimi 账户的自定义提供商。此外，多个 2026 年 3 月创建的功能请求在昨日被集中关闭，其中部分已确认实现。

### 社区热点 Issues
本期共 7 个 Issue 在近 24 小时内更新，全部列出如下。

#### 开放中
- **#2633 [OPEN] ACP auth gate (1.17+) blocks custom providers that don't need a Kimi account**
  - 现象：自 1.17.0 起，ACP 服务器在 `session/new`、`session/load`、`session/resume` 和 `session/prompt` 接口无条件要求 Kimi 账户 OAuth token（`_check_auth`），导致纯自定义提供商无法接入。
  - 影响：直接伤害第三方模型 / 服务商的集成体验，是当前唯一开放的新 issue，值得持续关注。
  - 链接：https://github.com/MoonshotAI/kimi-cli/issues/2633

#### 昨日关闭
- **#290 [CLOSED] [bug] Use openrouter with custom model returns 401**
  - 在 OpenRouter 中使用自定义模型（如 `openai/gpt-5.1-codex`）时返回 401。该 issue 经约一年后关闭，若你仍受影响，建议在最新版本中重新验证。
  - 链接：https://github.com/MoonshotAI/kimi-cli/issues/290
- **#1293 [CLOSED] [bug] 在远程 SSH 服务器上使用 Kimi CLI 时，无法交流**
  - 在无图形界面、无法修改系统 DNS 的 SSH 环境中，Kimi CLI 无法正常通信。该问题已关闭，但远程受限环境的兼容性仍是企业级用户痛点。
  - 链接：https://github.com/MoonshotAI/kimi-cli/issues/1293
- **#1311 [CLOSED] [enhancement] 希望增加一个 undo 功能**
  - 社区希望引入类似 opencode 的 undo 能力，获得 1 👍 支持。该请求已关闭，但暂未看到具体实现说明。
  - 链接：https://github.com/MoonshotAI/kimi-cli/issues/1311
- **#1310 [CLOSED] [enhancement] Inline Mermaid diagrams in webui**
  - 希望 WebUI 能直接内联渲染 Mermaid 图表（目前解析逻辑已存在）。请求已关闭，未来 WebUI 展示层可能继续增强。
  - 链接：https://github.com/MoonshotAI/kimi-cli/issues/1310
- **#1309 [CLOSED] [enhancement] Optional Openclaw-like features**
  - 涉及心跳系统、cron 任务、记忆等类 agent 自动化能力，并提出与 HKUDS/nanobot 的轻量集成构想。已关闭，但反映社区对 Agent 化运维的潜在诉求。
  - 链接：https://github.com/MoonshotAI/kimi-cli/issues/1309
- **#1307 [CLOSED] [enhancement] --agent-file for 'kimi web' as in the 'kimi'**
  - `kimi web` 不支持 `--agent-file` 参数，而 `k

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-04

## 今日速览

今日社区活跃点集中在**桌面端体验**、**计费系统可靠性**与**TUI 稳定性**三大方向。Windows 平台 Ctrl-C 崩溃问题（#2999）持续高热，后台任务管理（shell 工具 `run_in_background`、Tasks 面板）与模型选择器排序一致性成为 PR 侧最受关注的进展。另有多个与计费仪表盘不一致、付款被拒相关的问题浮出水面，提示订阅系统需加强兜底。

> 数据来源：github.com/anomalyco/opencode | 统计口径：过去 24 小时更新

---

## 社区热点 Issues（10 个）

### 1. 提供禁用 Ctrl-C 的方法 — Windows 用户长期痛点
**#2999** | 开放中 | 💬 38 | 👍 27
在 Windows 的 WezTerm / 微软终端下，按下 Ctrl+C 会直接导致 opencode 崩溃退出。该问题自 2025-10 创建至今仍为开放状态，是 Windows 平台被提及最多的稳定性问题之一。
🔗 https://github.com/anomalyco/opencode/issues/2999

### 2. [Web] 如何在 opencode-desktop 中取消归档
**#12393** | 已关闭 | 💬 20 | 👍 34
用户误点"Archive"后无法找回会话，桌面端缺乏显而易见的恢复入口。该问题虽已关闭，但 34 个 👍 表明会话归档/恢复流程的 UX 设计有较大改进空间。
🔗 https://github.com/anomalyco/opencode/issues/12393

### 3. [功能] Web UI 项目自动从服务端同步
**#13626** | 开放中 | 💬 16 | 👍 16
在全新设备/浏览器上打开 OpenCode Web 时，项目列表不会自动从服务端同步。用户期望开箱即用的跨设备一致性。
🔗 https://github.com/anomalyco/opencode/issues/13626

### 4. 不同 opencode go 用量仪表盘数据不一致
**#38255** | 开放中 | 💬 11
用户反映在月度限额仪表盘中显示已用 100%，但细粒度用量仪表盘显示同期仅消费约 $10。仪表盘数据口径不统一，直接影响用户对额度的判断和计费信任。
🔗 https://github.com/anomalyco/opencode/issues/38255

### 5. 正常使用 3 个月后，支付突然被拒
**#45278** | 开放中 | 💬 9 | 👍 2
已有 3 个月成功扣款记录的银行卡突然被拒，银行侧确认卡片无异常。提示订阅续费链路可能存在隐蔽 bug。
🔗 https://github.com/anomalyco/opencode/issues/45278

### 6. SSE 错误与 #44944 — 模型循环导致会话损坏
**#47047** | 开放中 | 💬 9
Big Pickle 模型在生成代码时进入循环，AI 暂停思考时跳出循环并破坏编辑结果。影响版本 1.18.27/1.18.26，属于较新的回归问题。
🔗 https://github.com/anomalyco/opencode/issues/47047

### 7. 工具调用后永久卡在 busy 状态
**#40468** | 开放中 | 💬 6 | 👍 2
多次成功工具调用后，TUI 突然卡在"ping pong"加载动画，连按两次 ESC 也无法中断。日志停在 `step=N`，疑似步骤状态机未正确收敛。
🔗 https://github.com/anomalyco/opencode/issues/40468

### 8. Worker 子进程 SIGILL 崩溃并引发系统冻结（老 CPU）
**#36280** | 开放中 | 💬 5
Intel i5-7200U（Kaby Lake）上 Worker 子进程触发`非法指令`崩溃，随后递归崩溃处理器（systemd-coredump → drkonqi → apport）尝试分配约 28 GB 内存，导致系统冻结。对老旧 CPU 的兼容性需要明确的最低指令集声明。
🔗 https://github.com/anomalyco/opencode/issues/36280

### 9. [功能] "Build" 订阅范围命名误导 — 建议更名
**#46549** | 开放中 | 💬 5
"Build" 听起来像 `npm run build` 或系统提示词，而非订阅等级。建议更名为 "All Access" 并增加面向训练者的模型选择器。
🔗 https://github.com/anomalyco/opencode/issues/46549

### 10. [bug] 桌面端深链接创建会话无效
**#44160** | 开放中 | 💬 4
OpenCode Desktop 用于创建新会话的深链接不生效，影响外部工具/浏览器到桌面端的跳转闭环。
🔗 https://github.com/anomalyco/opencode/issues/44160

---

## 重要 PR 进展（10 个）

### 1. feat(opencode): shell 工具新增 run_in_background 后台执行
**#47187** | 开放中 | 需合规审查
解决 shell 工具同步阻塞问题：长任务（dev server、测试、构建）现在可后台执行，模型获得完成信号，不再卡死整个 turn。
🔗 https://github.com/anomalyco/opencode/pull/47187

### 2. feat(app): 后台子代理与 shell 工具的任务面板
**#47186** | 已关闭 | 需合规审查
在会话侧边栏新增 Tasks Tab，实时展示子代理与 shell 任务状态（含 nested 计数、耗时、权限等待态）。
🔗 https://github.com/anomalyco/opencode/pull/47186

### 3. feat: 持久心跳监控与时间线 UI
**#47166** | 已关闭
为长时外部命令增加可调度/可检查/可取消的心跳监控，配套时间线 UI，提升长任务可见性。
🔗 https://github.com/anomalyco/opencode/pull/47166

### 4. fix(core): 重试瞬态压缩失败
**#47159** | 已关闭
压缩（compaction）失败时按既有会话重试策略自动重试，拒绝截断摘要，用户取消时不重试不覆盖。
🔗 https://github.com/anomalyco/opencode/pull/47159

### 5. fix(core): 恢复会话前先清理遗弃的压缩任务
**#47178** | 已关闭
服务端异常退出后，遗弃的压缩任务会残留为 `running` 状态，导致再次 `/compact` 出现双行旋转。此 PR 在恢复会话前先完成清理。
🔗 https://github.com/anomalyco/opencode/pull/47178

### 6. fix(opencode): 嵌套 TypeScript 子项目 LSP 解析
**#47181** | 开放中
修复 `lsp` 工具对嵌套 `tsconfig.json` 子项目返回空结果的问题，一并解决 #40413、#35396、#18694 三个关联 issue。
🔗 https://github.com/anomalyco/opencode/pull/47181

### 7. refactor(ai): 丢弃无 open block 的 converse 工具增量
**#47182** | 已关闭
统一 Bedrock Converse 解析器对 `toolUse` 增量的处理逻辑，消除因历史状态不同而行为不一致的隐蔽 bug。
🔗 https://github.com/anomalyco/opencode/pull/47182

### 8. fix(tui): 指针静止时保持键盘选中项
**#47138** | 开放中
面板在指针下展开时不再因 `onMouseOver` 刷新而改变键盘选区，避免 Enter/中断/权限操作作用到错误选项。
🔗 https://github.com/anomalyco/opencode/pull/47138

### 9. fix(tui): 模型搜索保持发布顺序排序
**#47183** | 开放中 | 2.0 贡献
全屏 TUI 模型选择器在模糊匹配后复用 `sortModelOptions`，确保 Haiku 4.5 不会因名称更短而排在 Haiku 3 之下。
🔗 https://github.com/anomalyco/opencode/pull/47183

### 10. feat(desktop): 设置弹窗内集成插件管理器
**#47180** | 开放中 | 需合规审查
支持从官方文档、awesome-opencode（10k

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 2026-09-04

## 今日速览

- **v0.23.0 正式发布**，分支选择器新增 git 状态提示（如 `↓3 · origin/main`、`Up to date`），无破坏性变更。
- **安全类问题集中爆发**：DingTalk 通道明文打印 clientSecret/stream ticket（P1）、命令执行配置键被指为开放攻击面（P1）、死循环致 5–14M token 无谓消耗（P1）成为社区关注焦点。
- **TUI 架构升级讨论升温**：OpenTUI 渲染层迁移跟踪 issue 已达 28 条评论，同时 CI 测试效率与 Linux 沙箱增强需求呼声渐高。

## 版本发布

### v0.23.0
- **核心变更**：分支选择器在 Update Project、Commit、Push 等操作旁显示 git 状态提示（如 `↓3 · origin/main` 或 `Up to date`）。
- **兼容性**：无已知破坏性变更。

## 社区热点 Issues

### 1. TUI 渲染层迁移：ink → OpenTUI（跟踪 issue）
[#8662](https://github.com/QwenLM/qwen-code/issues/8662) · 28 条评论 · P3
> 当前 TUI 基于 ink 7 + React 19，含约 1037 行自定义 patch，闪烁等问题难以在 ink 体系内根治。社区讨论热度最高，已

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*