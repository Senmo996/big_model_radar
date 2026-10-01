# AI CLI 工具社区动态日报 2026-10-01

> 生成时间: 2026-10-01 02:58 UTC | 覆盖工具: 7 个

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

**报告日期：2026-10-01**
**分析范围：Claude Code / OpenAI Codex / Gemini CLI / GitHub Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code**


## 1. 生态全景

AI CLI 工具已从"能执行简单编码任务"演进为**具备复杂代理能力、多模型支持、安全治理机制和企业级协作特性**的开发基础设施。当前各工具均处于高频迭代阶段（单日 Release 1–5 次），社区反馈高度集中于**安全策略精细化、会话生命周期管理、模型自主性与成本控制**三大维度。值得注意的是，各工具的社区热点已从"功能缺失"转向"体验一致性"，表明核心编码能力趋于同质化，**可靠性、可观测性和安全边界成为差异化竞争焦点**。开源工具的社区参与度显著提升，第三方贡献者在 bug 修复和架构演进中扮演日益重要的角色。


## 2. 各工具活跃度对比

统计口径：各工具日报所列 Top Issues 与 Top PR 数量，Release 以 9 月 30 日–10 月 1 日为准。

| 工具 | Issues（Top） | PR（Top） | Release / 版本 | 高热度 Issue（👍 数） |
|---|---|---|---|---|
| Claude Code | 10 | 9 | v2.1.286（正式版） | #95326（22👍）Chrome 扩展被安全策略误拦截 |
| OpenAI Codex | 10 | 10 | rust-v0.159.3（正式版）+ 5 个 alpha | #48043（40👍）Windows 启动失败 |
| Gemini CLI | 10 | 9 | v0.64.0-nightly（夜间版） | #21409（8👍）通用代理挂起 |
| GitHub Copilot CLI | 10 | 0 新增 | v1.0.91-0 / v1.0.90（正式版） | #1973（29👍）工具白名单功能请求 |
| Kimi Code CLI | 无 | 无 | 无活动 | — |
| OpenCode | 10 | 10 | v1.18.34（补丁版） | #39847（23👍）模型托管位置不透明 |
| Qwen Code | 10 | 10 | v0.24.7-nightly（夜间版） | 最高为 #12380（38条评论）Managed Agent 架构提案 |

**补充说明：**
- Copilot CLI 过去 24 小时无 PR 更新，但有两个正式版 Release
- Kimi Code CLI 完全无社区活动，处于维护停滞或内部测试阶段
- OpenAI Codex 的 alpha 预发布节奏明显，迭代速度领先（5 个版本并行）
- Qwen Code 以 nightly 构建推进，正式发布节奏较慢但社区讨论深度较高


## 3. 共同关注的功能方向

### 3.1 安全策略精细化与权限控制（5/7 工具涉及）
| 工具 | 具体诉求 |
|---|---|
| Claude Code | 安全策略误报污染会话（#63751）、CVP 已批准组织仍被拦截（#84689） |
| Gemini CLI | 未信任工作区文件保护（PR #29466/#29583）、粘贴内容意外触发路径展开（#29458） |
| GitHub Copilot CLI | 工具白名单（#1973，29👍）、会话级只读目录审批 |
| Qwen Code | P1 安全漏洞：`cd` 重定向绕过 Write 权限检查（#13106） |
| OpenCode | 无直接安全 issue，但 MCP 连接生命周期管理涉及安全边界 |

**共性结论**：各工具的安全机制均面临"过度拦截合法操作"与"绕过安全边界"的双向压力，精细化、可配置、有逃生通道的权限模型是共同演进方向。

### 3.2 会话持久化与跨会话记忆（4/7 工具涉及）
- **Claude Code**：auto-memory 索引加载状态不可见（#82056，64 条评论）
- **OpenCode**：原生跨会话自动记忆功能请求（#20322）
- **Gemini CLI**：任务追踪从内存转向文件持久化 CRUD（#18836、#21000）
- **Qwen Code**：Session 数据持久化、provenance 字段丢失（#12042）

### 3.3 稳定性与进程生命周期管理（5/7 工具涉及）
- **OpenAI Codex**：Windows 启动失败（#48043）、守护进程崩溃后恢复（PR #49819）、MCP 子进程泄漏
- **Claude Code**：Remote Control 崩溃后会话无法恢复（#91087）
- **OpenCode**：SIGTERM 时 MCP 子进程成为孤儿进程（PR #51946）
- **Gemini CLI**：Ctrl+C 紧急中止可靠性（PR #29586）
- **Qwen Code**：过期工具发布候选的安全恢复（#13019）

### 3.4 成本控制与资源消耗上限（3/7 工具涉及）
- **Claude Code**：Prompt Cache 骤降导致费用飙升（#98557）、云 Credits 无限循环消耗（#97567）
- **Gemini CLI**：工具数量超过 128 时出现 400 错误（#24246）
- **OpenCode**：免费模型被 VPN 绕过限流无限使用（#34344）

### 3.5 多模型与多提供商兼容（3/7 工具涉及）
- **Copilot CLI**：GPT-6.1 Sol 支持、BYOK 多模型切换（#3282，31👍）
- **Qwen Code**：models.dev 目录集成（PR #11959）
- **OpenCode**：Meta Muse 集成请求（#41551）、Qwen 3.6 多模态兼容


## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线 / 核心优势 |
|---|---|---|---|
| **Claude Code** | 面向企业级开发的安全增强型代理 | 大型工程团队、已采购 Anthropic 企业服务的开发者 | 强调 CVP 审核、安全护栏、权限提示堆叠；偏重 GitHub 原生集成与 AI 安全治理 |
| **OpenAI Codex** | 多端一致性的全能助手 | 跨平台开发者、深度使用 ChatGPT 生态的用户 | Rust 核心，重压 Windows 稳定性；桌面/Web/CLI 三端协同，强调守护进程与远程控制可靠性 |
| **Gemini CLI** | 强调自主性的研究型代理 | 喜欢探索前沿模型能力、注重终端体验的开发者 | 深度绑定 Gemini 3 模型原生 bash 能力；推进 AST 感知工具链；子代理架构是核心；社区讨论学术气息浓厚 |
| **GitHub Copilot CLI** | GitHub 生态内的安全编码助手 | GitHub 重度用户、企业 Copilot 客户 | 与 GitHub 认证、MCP 市场深度绑定；注重管道安全评估（execution-evidence review）；权限粒度是目前短板 |
| **OpenCode** | 开源可扩展的多模型网关 | 独立开发者、对模型灵活性有高要求的团队 | 插件化架构（GUI 迁移为内置扩展）；广泛适配各模型提供商；社区驱动的模型兼容性修复 |
| **Qwen Code** | 面向云原生场景的托管代理 | 阿里云生态用户、Qwen 模型用户 | 押注 Managed Agent 架构（Hosted Session/Workspace）；侧重服务端持久化、WebSocket 连接与企业级托管能力 |
| **Kimi Code CLI** | —（无社区活动） | — | 暂无数据，处于观望期 |

**关键差异总结：**
- **架构路线分歧**：Claude Code 侧重"安全审查"（Session 级护栏），OpenCode 走"插件化内核"路线，Qwen Code 押注"服务端托管"架构，Gemini CLI 尝试"原生工具链"（AST 感知）
- **用户群差异**：Claude Code 与 Copilot CLI 面向企业合规场景；OpenCode 与 Gemini CLI 更吸引个人开发者和技术极客；Codex 覆盖大众开发者；Qwen Code 瞄准云原生开发者


## 5. 社区热度与成熟度

### 活跃度分层
| 层级 | 工具 | 判断依据 |
|---|---|---|
| **高活跃 & 高成熟** | Claude Code | Issue 讨论深度高（#82056 达 64 条评论），PR 优化针对核心体验（diff 面板），用户基数大 |
| **高活跃 & 快速迭代** | OpenAI Codex | 单日 5 个 alpha 版本并行，Issue 影响面聚焦 Windows 平台，问题具体且扩散快 |
| **高活跃 & 探索期** | Gemini CLI | 社区讨论以架构级 EPIC 为主（AST、沙箱、多代理协作），功能尚不稳定 |
| **中活跃 & 稳定演进** | GitHub Copilot CLI | 以正式版迭代为主，社区需求明确（权限、MCP 生态），但 PR 吞吐量有限 |
| **高活跃 & 架构转型** | Qwen Code | 围绕 Managed Agent 蓝图深度讨论（38 条评论），正在经历重大架构升级 |
| **中活跃 & 社区驱动** | OpenCode | 10 个 PR 中社区贡献占比高，插件化重构预示着生态将加速发展 |
| **无可见活动** | Kimi Code CLI | 零活动，暂未进入竞争格局 |

### 成熟度信号
- **Claude Code**：从"功能开发"转向"体验打磨与安全治理"——是成熟度最高的信号
- **OpenAI Codex**：大量 Windows 相关问题说明用户群已从早期 Linux 拥趸扩展到大众开发者
- **Gemini CLI**：模型行为质疑（不主动调用 skills、随机创建脚本）表明工具仍处于能力探索期
- **Qwen Code**：部署 P1 安全逃生思路说明托管架构已进入可靠性验证阶段


## 6. 值得关注的趋势信号

### 趋势一：安全策略从"有"到"优"—— 治理能力成为企业采用门槛
Claude Code 的安全误报、Gemini CLI 的未信任目录保护、Qwen Code 的权限绕过漏洞——**安全不再是"有/无"的问题，而是"策略是否足够细粒度、是否可解释、是否有逃生通道"的问题**。开发者需要在"不打断合法操作"与"防住恶意操作"之间取得平衡裨。建议决策者评估工具时关注：权限提示的可配置粒度、误报后的恢复机制、安全策略的审计日志能力。

### 趋势二：会话状态持久化 —— 从"长对话"到"长记忆"
多个工具不约而同地推进会话持久化、跨会话记忆、Session 可恢复性。**编码代理正在从"每次对话独立"演化为"持续在线的工作伙伴"**。Claude Code 的 auto-memory、OpenCode 的跨会话记忆请求、Gemini CLI 的文件持久化任务追踪、Qwen Code 的 Session 生命周期管理——这暗示未来 AI CLI 工具的核心竞争力将包括"对项目的连续理解能力"。开发者的参考价值：评估工具时关注记忆机制的透明度（能否查看何时加载了哪些记忆）和数据存储位置（本地 vs 云端），以免陷入 Token 消耗黑洞或数据合规风险。

### 趋势三：多模型支持成为事实标准
Copilot CLI 加入 BYOK、Qwen Code 接入 models.dev、OpenCode 适配 Meta Muse、Claude Code 被 Bedrock 用户大量使用——**捆绑单一模型的做法正在失去市场**。开发者越来越倾向"用 Copilot 的界面 + 任意模型后端"的灵活组合。

### 趋势四：稳定性是最大的用户痛点，也是差异化机会
Windows 兼容性（Codex）、终端滚动失效（Copilot CLI）、代理挂起（Gemini CLI）、升级后崩溃（OpenCode）——**模型能力已足够引人注目，但执行层的可靠性正在被社区反复拷问**。GitHub Copilot CLI 和 Claude Code 以其工艺精细度（diff 优化、管道证据审查）获得用户好感，而 Codex 在 Windows 体验上消耗着用户耐心。开发者参考：在模型能力之外，关注进程管理、崩溃恢复、错误信息准确度等"使用体验工程"的成熟度。

### 趋势五：代理自主性与信任平衡 —— "假成功"问题凸显
Gemini CLI 的子代理 MAX_TURNS 误报成功（#22323）、Qwen Code 的预测性接受失败无遥测（#13062）—— **比"不能完成任务"更糟糕的是"未完成任务却报告成功"**。这警示工具需要在执行可信度和结果可验证性上加大投入。开发者的启示：不要盲目信任代理的完成报告，选择支持执行日志审计、可复现任务轨迹的工具。

### 趋势六：开源社区驱动架构演进
OpenCode 的插件化重构（GUI 迁移为扩展）、Gemini CLI 的社区 PR 密集合并（单日 10+）、Qwen Code 的社区贡献补全权限检查——**开源 AI CLI 工具的架构方向正越来越多地由社区塑造**，而不仅是商业公司的内部路线图。这对个人开发者是利好：有机会影响工具发展方向，并自由扩展功能。

---

*注：本报告基于 2026-10-01 各工具 GitHub 社区公开数据整理，不包含未公开的内部开发信息。Kimi Code CLI 因无社区活动未纳入对比分析。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

> 说明：数据集中 PR 的评论数字段显示为 `undefined`，无法提供具体评论数；以下热门度依据仓库原始排序（按评论数降序）及可解析内容推断。

---

## 1. 热门 Skills 排行

以下选取排序靠前且具有实质摘要的 7 个 PR，当前状态均为 **open**。

- **#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures** — 修复 Skill Creator 的触发评估误报/漏报问题，包括多 worker 命令探针竞争、Windows 下 `select()` 失败、运行时失败被误判等。社区关注点集中在**技能自动化评估的跨平台可靠性**。
  https://github.com/anthropics/skills/pull/1298

- **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers** — 适配 MCP SDK 2.0+ 的 API 变更，修复 `streamable_http_client` 重命名及自定义 HTTP headers 配置方式。热点是**MCP 版本演进带来的兼容性断裂**。
  https://github.com/anthropics/skills/pull/1742

- **#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization** — 新增 Web

---

# Claude Code 社区动态日报 — 2026-10-01

## 今日速览

Claude Code 发布 v2.1.286，为权限提示增加堆叠计数、为全屏模式列表增加鼠标交互，并修复多项进程稳定性问题。社区方面，安全策略误报与 Prompt Cache 异常成为今日最集中讨论的两大主题；同时多家用户提交了关于 Git 集成、隐私与成本控制的反馈。PR 侧则密集出现一组对 `/diff` 面板的优化，显著改善了大仓库下的 Git 进程效率。

---

## 版本发布

### v2.1.286
- **权限提示计数**：当多个权限请求堆叠时，提示中会显示 "2 of 5" 之类的进度数字。
- **全屏模式鼠标支持**：列表中的 "N more" 行现在支持点击跳转至对应端，并带有 hover / pressed 状态反馈。
- **进程稳定性修复**：修复了若干 Claude Code 进程相关问题。

🔗 https://github.com/anthropics/claude-code/releases

---

## 社区热点 Issues（Top 10）

### 1. 会话无法获知 auto-memory 索引加载状态（64 条评论）
**#82056** | 作者 @shawnacason | 👍 1
> 会话无法判断其 auto-memory 索引是完整加载、部分截断还是完全未加载，导致依赖记忆能力的场景（如长周期任务）难以排查行为不一致。

🔗 https://github.com/anthropics/claude-code/issues/82056

### 2. CVP 已批准组织仍被 cyber safeguards 拦截（19 条评论）
**#84689** | 作者 @0xR3nzz | 👍 5
> 已通过 CVP（Claude Verified Professional）审核的组织仍被安全策略误伤，且申诉表单无字段可填写。安全策略的误报误伤问题持续发酵。

🔗 https://github.com/anthropics/claude-code/issues/84689

### 3. Claude in Chrome：reddit.com 所有工具被安全限制拦截（18 条评论）
**#95326** | 作者 @rackpathlabs-ops | 👍 22
> 自 2026-09-18 起，Chrome 扩展在 reddit.com/redd.it 上全部工具被 "not allowed due to safety restrictions" 拦截，此前一直正常。为当前社区热度最高的 Issue（👍 22）。

🔗 https://github.com/anthropics/claude-code/issues/95326

### 4. AUP/cyber-safeguard 误报污染整个会话（17 条评论）
**#63751** | 作者 @Call-me-Boris-The-Razor | 👍 9
> 合法软件加固请求触发安全误报后，整个会话被 "污染"——后续所有请求均受影响。开发者呼吁区分单次拦截与会话级封禁。

🔗 https://github.com/anthropics/claude-code/issues/63751

### 5. 请求：单会话实时多用户协作（12 条评论）
**#60082** | 作者 @apstorenet | 👍 21
> 希望实现 Google Docs / VS Code Live Share 式的多人协作编辑同一 Claude Code 会话。当前 claude.ai 的 Share 链接仅为只读视图。

🔗 https://github.com/anthropics/claude-code/issues/60082

### 6. UserPromptSubmit 存在提示注入面（6 条评论）
**#94675** | 作者 @flound1129 | 👍 1
> 系统/Agent 注入的消息（跨会话 SendMessage、定时任务、子代理完成通知等）会触发 `UserPromptSubmit`，且 payload 不区分来源，Hook 无法识别真实用户输入。

🔗 https://github.com/anthropics/claude-code/issues/94675

### 7. Agents 视图缺少搜索/筛选（5 条评论）
**#64575** | 作者 @jacobpedd | 👍 8
> 子代理会话列表无法按名称或任务描述搜索过滤，会话较多时定位困难。

🔗 https://github.com/anthropics/claude-code/issues/64575

### 8. 云会话无限循环调度 PR 检查并消耗 Credits（3 条评论）
**#97567** | 作者 @Hunfool | 👍 0
> 云端会话无限制地每小时重新调度 PR 检查，静默消耗云 Credits，缺乏上限控制。

🔗 https://github.com/anthropics/claude-code/issues/97567

### 9. Prompt Cache 骤降至系统基线（1 条评论）
**#98557** | 作者 @Junseok-Kwak | 👍 0
> 连续 43–58 次调用中，Prompt Cache 始终只命中 7,085 token 的系统基线，缓存完全失效，Token 费用飙升。

🔗 https://github.com/anthropics/claude-code/issues/98557

### 10. 崩溃后 Remote Control 会话无法恢复（3 条评论）
**#91087** | 作者 @yan-hic | 👍 0
> `claude remote-control` 服务崩溃后，其托管会话永远不会被重新认领，重启也无法恢复；发送至断连会话的消息无限排队。

🔗 https://github.com/anthropics/claude-code/issues/91087

---

## 重要 PR 进展（Top 9）

### 1. diff 面板：打开时不再打开列表中的每个文件
**#98555** | 作者 @poteat | 状态：Open
> 修复 `/diff` 对话框在打开时列出所有文件并逐个展开 diff 的行为，关窗后不输出任何内容的问题。

🔗 https://github.com/anthropics/claude-code/pull/98555

### 2. diff 面板：仅在有文件可显示时才自动打开
**#94847** | 作者 @bcherny | 状态：Open
> 首次编辑时，若变更发生在仓库外、被忽略文件或不同 worktree，将不再弹出空白 diff 面板。

🔗 https://github.com/anthropics/claude-code/pull/94847

### 3. diff 面板：自动感知外部 merge 完成，并减少轮询
**#98357** | 作者 @poteat | 状态：Closed
> 面板能感知在外部完成的 merge，同时避免在特殊分支名上每两秒触发一次 git 进程。

🔗 https://github.com/anthropics/claude-code/pull/98357

### 4. diff 面板：单次 git 进程读取所有文件 hunks
**#98445** | 作者 @poteat | 状态：Closed
> 将每次工具调用后最多 50 个 git 进程压缩为 1 个，Windows 上效果尤其明显。

🔗 https://github.com/anthropics/claude-code/pull/98445

### 5. diff 面板：rebase 结束后重新读取 diff
**#98374** | 作者 @poteat | 状态：Closed
> 修复 rebase 已完成但 git 遗留 `REBASE_HEAD` 导致面板显示 "Diff unavailable" 的问题。

🔗 https://github.com/anthropics/claude-code/pull/98374

### 6. MOD 声明补齐 process.run 截断标志与 mtimeMs
**#97293** | 作者 @poteat | 状态：Open
> 为 `$.process.run` 结果增加 `isStdoutTruncated`/`isStderrTruncated`，为 `$.fs.list` 条目增加 `mtimeMs` 的类型声明，对齐 npm CLI 实际行为。

🔗 https://github.com/anthropics/claude-code/pull/97293

### 7. GitHub Actions 工作流安全加固
**#97952** | 作者 @qing-ant | 状态：Closed
> 为调用 Claude 的三个 CI 工作流增加 egress-firewall runner，限制网络出口，降低供应链攻击风险。

🔗 https://github.com/anthropics/claude-code/pull/97952

### 8. security-guidance：拒绝与敏感文件不进入 Reviewer 视野
**#96434** | 作者 @claude[bot] | 状态：Open
> 安全评审子代理不再读取被 Read deny/ask 规则覆盖的文件及 `.env`、密钥等敏感文件，同时禁用 shell。

🔗 https://github.com/anthropics/claude-code/pull/96434

### 9. SKILL.md 增加关键设计思考步骤
**#39417** | 作者 @TirupMehta | 状态：Closed
> 为前端开发补充设计准则，指导模型产出更高质量 UI。

🔗 https://github.com/anthropics/claude-code/pull/39417

---

## 功能需求趋势

### 🔍 可观测性与诊断能力
- **Session 级 Transparency**（#82056、#98557）：开发者要求会话能报告 auto-memory 加载状态、Prompt Cache 命中情况，以便定位"为什么行为不一致"和"为什么费用暴涨"。
- **Agent 视图搜索**（#64575、#77784）：多个请求为 FleetView 增加搜索/过滤能力，已成为高频呼声。

### 🔐 安全策略精细化
- **减少误报与污染**（#84689、#63751、#95326）：安全审核对合法场景（Web 自动化、蓝队工具、Chrome 扩展）误拦截频发，且一旦触发影响整个会话。
- **Hook 数据丰富化**（#94675）：`UserPromptSubmit` 需要 `prompt_source`/`is_meta` 等字段，以便区分真实用户输入与注入消息。

### 👥 协作与远程控制
- **实时多用户协作**（#60082）：单一会话的多人协同编辑。
- **Remote Control 可靠性**（#91087、#98504）：崩溃恢复、重启存活、会话认领机制。

### 🧹 隐私与数据控制
- **history.jsonl 明文无限增长**（#98575）：用户要求提供日志上限配置或默认清理策略。
- **Claude-Session Trailer 可配置**（#98581）：不希望自动附加提交/PR 元数据。

### ⚡ 性能与成本
- **Prompt Cache 稳定性**（#98557、#98574）：缓存失效导致成本飙升。
- **云 Credits 消耗上限**（#97567）：循环任务需要预算限制。

---

## 开发者关注点

### 🔥 高频痛点
1. **安全策略误报严重影响生产力** — 涉及 Chrome 扩展（#95326）、蓝队工具（#98579）、自有软件加固（#63751）、CVP 已批准组织（#84689）等多个场景，且一次触发可污染整个会话。
2. **Prompt Cache 稳定性不可控** — 突发降至 7,085 token 系统基线（#98557），直接推高成本，且无诊断手段。
3. **Remote Control 可靠性不足** — 崩溃后会话丢失、重启不恢复、消息无限排队（#91087、#98504）。
4. **成本消耗缺少上限保护** — 云端会话可无限循环消耗 Credits（#97567）；周限额似乎未生效（#98576）。
5. **隐私数据不受控** — `history.jsonl` 明文积累、不随 `cleanupPeriodDays` 清理（#98575）；提交元数据无法关闭（#98581）。

### 📌 值得持续关注
- 多个 bug 标记为 `duplicate`，说明同一问题被不同用户反复上报（安全误报、GitHub 集成、Prompt Cache），影响面较大。
- PR 团队（poteat）连续合并多个 `/diff` 优化，社区对日常开发体验的打磨有较高关注度。
- 关于"GitHub 连接器显示已连接但不可用"的反馈开始出现（#98562、#98571、#98573），GitHub 集成稳定性的讨论可能升温。

---

*本日报由 AI 自动生成，数据截至 2026-10-01。所有条目均附 GitHub 链接，可点击查看详情。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-10-01）

## 1. 今日速览

Windows 端稳定性依旧是社区最集中的痛点：CLI 启动失败、桌面端卡死、Computer Use 截图异常等问题持续发酵，其中 #48043 已积累 52 条评论。功能层面，多个 alpha 版本密集迭代，PR 侧重点在于守护进程容错恢复、AWS GovCloud 区域支持、以及 TUI 权限保持等可靠性改进。

## 2. 版本发布

**rust-v0.159.3（正式版）**：新增面向本机会话的可选账户安全设置提醒，针对使用 ChatGPT 登录的用户。完整变更：https://github.com/openai/codex/compare/rust-v0.159.2...rust-v0.159.3

另有 rust-v0.161.0-alpha.6、rust-v0.161.0-alpha.5、rust-v0.161.0-alpha.4、rust-v0.160.0-alpha.6.2 等预发布版本迭代，暂无公开细节。

## 3. 社区热点 Issues

1. **[BUG] Codex CLI 0.157.0 Windows 启动失败，daemon 权限错误**（#48043）
   - Windows 用户升级后 CLI 完全不可用，0.156.1 正常。52 条评论、40 个 👍，是当前社区影响面最大的问题。
   - https://github.com/openai/codex/issues/48043

2. **[BUG] Android 远程授权在桌面切换 ChatGPT 账号后陷入死循环**（#48555）
   - 扫码授权后回到"允许此手机"界面，产生陈旧跨账号环境，每次尝试产生两个待处理注册。影响远程 dot/设备配对体验。
   - https://github.com/openai/codex/issues/48555

3. **[BUG] Windows 26.924 冷启动卡在 Loading，重启 app-server 才能恢复**（#48466）
   - 多用户反馈的桌面端启动问题，渲染进程未挂载，需手动杀掉子进程恢复。
   - https://github.com/openai/codex/issues/48466

4. **[BUG] Codex Web 首条消息报 "Unable to determine project root for task"**（#49497）
   - 在已发布的云环境中运行任务失败，17 个 👍 表明关注度较高，影响 Web 端基本可用性。
   - https://github.com/openai/codex/issues/49497

5. **[BUG] 托管 app-server 钩子继承首个客户端的 TMUX 环境**（#48500）
   - 0.157 回归：TUI 共享守护进程后，所有后续客户端的事件钩子被错误标记到第一个客户端的终端窗格。导致钩子事件归属错乱。
   - https://github.com/openai/codex/issues/48500

6. **[BUG] WSL 风格会话中 exec_command 报 os error 2**（#49365）
   - 桌面端在 WSL 环境下命令执行失败，包括 `pwd` 都不可用，重启后仍复现。影响 Windows + WSL 工作流。
   - https://github.com/openai/codex/issues/49365

7. **[BUG] GPT-5.6 Sol / GPT-6 Astra 自主完成率与操作可靠性下降**（#42937）
   - 核心质疑是更高智能模型反而需要更多人工监督，引用多份交付结果分析，虽评论数不多但讨论持续近一个月。
   - https://github.com/openai/codex/issues/42937

8. **[BUG] Windows Computer Use 截图捕获 FrameArrived 超时 + E_INVALIDARG**（#49383）
   - Computer Use 在 Windows 上无法可靠截取应用窗口，窗口检测失败，阻断自动化桌面操作核心功能。
   - https://github.com/openai/codex/issues/49383

9. **[BUG] Windows 上数千未跟踪文件触发 git diff --no-index 耗尽系统**（#43019）
   - 约 4,771 个未跟踪文件时，app-server 逐个生成 `git diff --no-index` 进程，导致 Windows 提交内存耗尽崩溃。极端场景下的资源管控缺失。
   - https://github.com/openai/codex/issues/43019

10. **[Feature] 恢复 Codex App 中的分支选择功能**（#49532）
    - 用户强烈要求恢复创建任务时的 Git 分支选择入口，18 个 👍 反映该功能回退的负面影响。
    - https://github.com/openai/codex/issues/49532

## 4. 重要 PR 进展

1. **支持 AWS GovCloud 区域（Amazon Bedrock Mantle）**（#49813）
   - 接受 `us-gov-east-1`、`us-gov-west-1` 并构造对应的 Bedrock Mantle 端点 URL。面向公共部门用户。
   - https://github.com/openai/codex/pull/49813

2. **添加 Bedrock GovCloud 需求咨询检查**（#49817）
   - 新增实验性 RPC `account/bedrock/checkGovCloudRequirements`，检测并提醒 GovCloud 下的托管要求。
   - https://github.com/openai/codex/pull/49817

3. **守护进程启动与更新器在 cwd 删除后恢复**（#49819）
   - 解决托管守护进程/更新器在启动目录被删除后无法重启或自更新的问题，后台恢复工作目录。
   - https://github.com/openai/codex/pull/49819

4. **本地代理树协调关闭**（#49814）
   - 新增 `request_agent_tree_shutdown` 与等待句柄，统一拒绝新启动、取消待启动任务并通知树内所有会话，含外部委托。
   - https://github.com/openai/codex/pull/49814

5. **跨 TUI 会话与重连保留本地启动权限**（#49809）
   - 修复 `--yolo` 等显式启动权限在重连恢复中丢失的问题，确保后续输入遵守原审批与沙箱策略。
   - https://github.com/openai/codex/pull/49809

6. **API-key 模型发现默认开启**（#49807）
   - `api_key_model_discovery` 转为稳定并默认启用，保留用户显式禁用与 Provider 目录要求；运行时禁用时回退到内置模型。
   - https://github.com/openai/codex/pull/49807

7. **可写文件流能力门控**（#49805）
   - `fs_write_block` 要求 `file_write_streaming` 能力，防止旧执行器静默将可写打开降级为只读句柄。
   - https://github.com/openai/codex/pull/49805

8. **兼容未知 Codex 错误变体**（#49806）
   - 反序列化时将未知 `CodexErrorInfo` 字符串/对象保守归为 `Other`，避免新增错误导致旧客户端无法处理 app-server 错误。
   - https://github.com/openai/codex/pull/49806

9. **影技能排序移出 turn 准备路径**（#49812）
   - 技能排序改为后台阻塞 worker 异步执行，全局并发上限 2，减少 turn 输入构建延迟。
   - https://github.com/openai/codex/pull/49812

10. **TUI 保留服务端 web 搜索设置**（#49810）
    - 仅在用户显式设定时将 `web_search` 模式转发给线程启动/恢复/分支，避免客户端隐式设置覆盖服务端或已存线程的配置。
    - https://github.com/openai/codex/pull/49799

## 5. 功能需求趋势

- **Windows 平台稳定性优先**：启动权限错误、冷启动卡死、文件句柄、git diff 资源爆炸、MCP 子进程泄漏 —— 大量 Issue 围绕 Windows 桌面/CLI 的可靠性展开。
- **远程协作与多设备一致性**：dot/远程任务打不开、Android 授权循环、云 WebSocket 代理兼容、桌面与 Web 间任务恢复 —— 跨端衔接是当前明显短板。
- **TUI/终端行为尊重用户习惯**：原生滚动恢复、粘贴缓冲区处理、平台化快捷键修饰键 —— 用户对交互回归非常敏感。
- **配置与权限的持久化**：分支选择回归、TUI 重启后 `--yolo` 权限丢失、web 搜索设置被覆盖 —— 要求保留用户显式设置的呼声上升。
- **模型自主性的信任度挑战**：更高阶模型（Sol/Astra）反而在实操中需要更多监督，社区开始系统性整理失败样例。

## 6. 开发者关注点

- **钩子环境隔离问题**：多个钩子相关问题被反复指出（TMUX_PANE 误继承、PreToolUse workdir 丢失），开发者期望钩子执行环境与客户端上下文严格隔离。
- **崩溃与数据安全**：Windows 下 git diff 进程风暴耗尽提交内存、macOS 下 SIGKILL 残留临时 Git 对象导致磁盘反复耗尽 —— 进程生命周期管理需要更健壮的兜底。
- **远程任务可靠性**：桌面端无法打开 dot 任务、app-server 不可用错误频繁出现 —— 开发者期望桌面与云端任务状态之间有一致且可恢复的通道。
- **性能退化焦虑**：MCP/node_repl 进程泄漏、冷启动等待时间过长、技能排序阻塞 turn 构造 —— 用户对后台资源占用和延迟敏感。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-01

## 1. 今日速览

今日发布 v0.64.0 夜间版，修复了 `@` 符号在代码中引发 CPU 挂起与文件操作并发问题。社区核心讨论仍集中在子代理可靠性（误报成功、挂起）与安全加固上；同时，多项针对未信任工作区防护、粘贴内容 `@` 路径展开等安全 PR 正在推进，值得关注。

## 2. 版本发布

**v0.64.0-nightly.20261001.gc6bccb7ec** 主要包含两项修复：

- **fix(cli)**: 修复代码块内 `@` 导致的 CPU 挂起和引号吞掉问题（#29557）
- **fix(core)**: 文件工具操作改为串行执行并支持原子写入，降低并发冲突风险（#29078）

[https://github.com/google-gemini/gemini-cli/releases](https://github.com/google-gemini/gemini-cli/releases)

## 3. 社区热点 Issues

### 1. #22323 — 子代理 MAX_TURNS 被误报为成功 🔥 13 评论
`codebase_investigator` 子代理在达到最大轮次后被报告为 `status: "success"`、`Termination Reason: "GOAL"`，但实际未进行分析。严重影响结果可信度。
[链接](https://github.com/google-gemini/gemini-cli/issues/22323) | P1 / bug

### 2. #21409 — 通用代理（generalist agent）挂起 🔥 8 评论 / 8 👍
所有交给 generalist agent 的简单任务（如创建文件夹）都会永久挂起，用户等待最多一小时后只能取消。显式指示不使用子代理可绕过。
[链接](https://github.com/google-gemini/gemini-cli/issues/21409) | P1 / bug

### 3. #19873 — 零依赖 OS 沙箱化与执行后意图路由 🔥 9 评论
旨在充分利用 Gemini 3 模型的原生 bash 操作能力（grep/cat/sed），同时通过 OS 级沙箱保障用户安全。属于较大规模 enhancement。
[链接](https://github.com/google-gemini/gemini-cli/issues/19873) | P2 / enhancement

### 4. #21968 — Gemini 不会主动使用 skills 和子代理 🔥 6 评论
用户反馈即使定义了 `gradle`、`git` 等带描述的 skills，模型仍不会在相关场景主动调用，需要显式指示。社区对模型自主性期待较高。
[链接](https://github.com/google-gemini/gemini-cli/issues/21968) | P2 / bug

### 5. #22745 — AST 感知文件读取、搜索与代码映射评估 🔥 7 评论
EPIC 议题，调研通过 AST 感知工具精确读取方法边界、减少 token 噪声的可行性。
[链接](https://github.com/google-gemini/gemini-cli/issues/22745) | P2 / feature

### 6. #22267 — Browser Agent 忽略 settings.json 中 maxTurns 等配置 🔥 4 评论
尽管 `AgentRegistry` 正确读取了配置，但 Browser Agent 运行时完全无视它，导致用户无法限制浏览器代理执行轮次。
[链接](https://github.com/google-gemini/gemini-cli/issues/22267) | P2 / bug

### 7. #21983 — browser 子代理在 Wayland 下失败 🔥 4 评论 / 1 👍
浏览器子代理在 Wayland 环境下报错终止（Termination Reason: GOAL 但实际失败），环境兼容性问题。
[链接](https://github.com/google-gemini/gemini-cli/issues/21983) | P1 / bug

### 8. #24246 — 超过 128 个工具时出现 400 错误 🔥 3 评论
当可用工具数量超过 400 时 Gemini CLI 报 400 错误，期望能根据启用的工具智能限制范围。
[链接](https://github.com/google-gemini/gemini-cli/issues/24246) | P2 / bug

### 9. #23571 — 模型在随机位置频繁创建临时脚本 🔥 3 评论
模型通过排除法限制 shell 执行后，会改为在多处创建编辑脚本，造成清理负担，影响工作区整洁。
[链接](https://github.com/google-gemini/gemini-cli/issues/23571) | P2 / bug

### 10. #22672 — Agent 应停止/阻止破坏性行为 🔥 3 评论 / 1 👍
在复杂 git 操作、数据库维护等场景，模型可能使用 `git reset --force` 等高危命令，需要更安全的替代策略。
[链接](https://github.com/google-gemini/gemini-cli/issues/22672) | P2 / bug

## 4. 重要 PR 进展

### 1. #29457 — 修复 read-many-files 的模糊匹配上下文膨胀（P1）
将 `String.includes()` 模糊匹配替换为 glob 匹配，避免图片/PDF/音频文件被误认为“显式请求”而载入上下文，修复关键上下文膨胀 bug。
[链接](https://github.com/google-gemini/gemini-cli/pull/29457)

### 2. #29466 — 防止未信任工作区静默删除自身 settings.json（P1）
`gemini mcp add` 在未信任目录中运行时，会**只保留新写入的 key，擦除项目原有 `.gemini/settings.json`**。该 PR 为默认的未信任状态提供保护。
[链接](https://github.com/google-gemini/gemini-cli/pull/29466)

### 3. #29460 — 修复 OAuth URL 被终端换行截断（P1）
长 Google OAuth URL 被终端视觉换行截断导致 `Error 400: invalid_request`，改用 OSC 8 超链接确保 URL 完整。
[链接](https://github.com/google-gemini/gemini-cli/pull/29460)

### 4. #29458 — 默认禁止粘贴内容中的 @ 路径展开（P1）
粘贴 `user@host:~/project$ cat @id_rsa` 这类内容时会意外触发 `@path` 文件上传，改为默认转义（`ui.escapePastedAtSymbols` 默认 true）。
[链接](https://github.com/google-gemini/gemini-cli/pull/29458)

### 5. #29459 — 修复 shell 注入命令的取消传播（P1）
自定义命令中的 `!{...}` 注入使用了全新 AbortController，导致无法中断；现在正确传播调用方的取消信号。
[链接](https://github.com/google-gemini/gemini-cli/pull/29459)

### 6. #29583 — 未信任文件夹中强制只读工作区设置（P1）
为 `.gemini/settings.json` 在未经验证的目录中建立确定性只读边界，防止 `gemini mcp add` 等命令造成破坏性覆盖。
[链接](https://github.com/google-gemini/gemini-cli/pull/29583)

### 7. #29586 — 确保 Ctrl+C 紧急中止到达取消处理器（P2）
修复活动操作期间 `Ctrl+C` 可能被吞掉或损坏的问题，保证用户随时能中断运行中的代理或流。
[链接](https://github.com/google-gemini/gemini-cli/pull/29586)

### 8. #29580 — ACP 会话按精确 ID 解析并修复监听器清理（P1）
修复 `session/load` 在无对话轮次的新会话上报 `"Invalid session identifier"` 的问题，同时改进失败时的 listener 清理。
[链接](https://github.com/google-gemini/gemini-cli/pull/29580)

### 9. #29532 — 尊重 RetryInfo 延迟为 0 的重试指令（core）
服务器明确要求立即重试的限流被误判为终止性配额错误，触发回退/扣费流程；现在按 RetryInfo 的延迟值（包括 0）正确处理。
[链接](https://github.com/google-gemini/gemini-cli/pull/29532)

### 10. #29520 — 修复流式输出期间终端滚动位置重置（core）
解决滚动查看历史消息时因流式输出、工具确认等导致的视口跳转问题，按需分配挂起高度预算，提升终端体验。
[链接](https://github.com/google-gemini/gemini-cli/pull/29520)

## 5. 功能需求趋势

- **AST 感知代码操作**：多个关联 issue（#22745、#22746、#22747）探索用 AST 感知 CLI 工具（如 tilth、glyph、AST grep）替代纯文本读取，以降低 token 噪声、提高单次读取代码边界的精确度。
- **多代理协作与并行**：持续关注共享内存、并行子代理协作（#18287），以及允许本地子代理后台化（#22741），探索更高效的任务分发模式。
- **安全的原生工具链执行**：沙箱化 bash 执行（#19873）与阻止破坏性行为（#22672）成为安全方向的两大诉求。
- **持久化任务追踪**：弃用 WriteToDo 的内存式任务列表，转向文件持久化 CRUD 方案（#18836、#21000），解决上下文腐烂与跨会话记忆丢失。
- **子代理可见性与审计**：要求子代理轨迹可分享（#22598）、bugreport 包含子代理上下文（#21763），提升调试与评估能力。

## 6. 开发者关注点

- **代理可靠性是最大痛点**：无论误报成功（#22323）还是无响应挂起（#21409），都直接影响日常使用信心。
- **配置不被尊重**：Browser Agent 忽略 settings.json（#22267）反映出配置优先级与执行层脱节的问题。
- **模型行为不够“聪明”**：不会主动调用 skills（#21968）、乱建临时文件（#23571）、对危险命令缺乏判断（#22672）——社区期望模型有更强的工具选择与风险意识。
- **安全边界必须清晰**：未信任目录文件被改写（#29466）、粘贴内容意外触发路径展开（#29458）等安全问题成为近两日 PR 焦点，获得高优先级关注。
- **环境兼容性仍需打磨**：Wayland 下浏览器代理失败（#21983）、终端 OAuth URL 截断（#29460）等问题仍然困扰特定环境用户。

---
*以上内容基于 GitHub 公开数据整理，数据采集于 2026-10-01。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-10-01

## 今日速览

昨日发布 v1.0.91-0 与 v1.0.90，带来 GPT-6.1 Sol 模型支持、MCP GitHub 认证范围收敛、会话级只读目录审批，以及管道执行证据审查机制。社区方面，多人反馈 400 错误、macOS 重启后 CLI 不可用等稳定性问题，同时 BYOK 多模型支持与工具白名单呼声持续走高。

## 版本发布

### v1.0.91-0
- **改进**：完整的、可静态分析的只读 shell 管道现在可进入“执行证据审查”（execution-evidence review）；不完整或未绑定的管道仍需显式批准。
- **修复**：Windows 上 Node/npm 因 EACCES socket 被拒时，提供沙箱网络绕过选项。

### v1.0.90（2026-09-30）
- **新增**：模型选择中支持 GPT-6.1 Sol。
- **新增**：`--mcp-github-auth` 标志，将 GitHub 账户认证范围限定到已批准的 MCP server 来源。
- **新增**：路径访问提示支持会话级只读目录审批。
- **修复**：恢复被中断的会话后，权限提示仍可正常应答。

### v1.0.90-7 / v1.0.90-6
- 包含多项修复与改进，其中 v1.0.90-6 新增 GPT-6.1 Sol 支持、优化紧凑时间线交互（点击折叠/展开工具调用），并修复恢复会话后权限提示的可用性问题。

- 链接：[Releases](https://github.com/github/copilot-cli/releases)

## 社区热点 Issues

1. **[#1274] CLI 持续收到 400 错误（invalid request body）**
   - 评论 32 | 👍 13 | 创建 2026-02-04 | 更新 2026-09-30
   - 用户报告近 95% 的代码审查请求因 400 错误失败，尚不确定是服务端校验还是 CLI 构造请求的问题，附有调试日志。该问题长期未修复，影响面大，值得重点跟进。
   - https://github.com/github/copilot-cli/issues/1274

2. **[#1973] 功能请求：交互模式的工具白名单**
   - 评论 16 | 👍 29 | 创建 2026-03-11 | 更新 2026-09-30
   - 社区高度认可的需求：希望为 grep/cat/find/git log 等只读操作配置白名单，避免逐次审批或退而使用危险的 `/allow-all`。当前权限粒度太粗。
   - https://github.com/github/copilot-cli/issues/1973

3. **[#2205] 终端滚动失效（Terminator）**
   - 评论 14 | 👍 16 | 创建 2026-03-21 | 更新 2026-09-30
   - 鼠标滚轮不再滚动历史输出，而是浏览已发送输入；`--no-mouse` 只影响了其他行为，未有帮助。终端渲染回归影响日常使用体验。
   - https://github.com/github/copilot-cli/issues/2205

4. **[#3282] 支持多个 BYOK 模型**
   - 评论 12 | 👍 31 | 创建 2026-05-13 | 更新 2026-10-01
   - 目前通过环境变量只能配置单一 BYOK 模型，用户在 TUI 中无法切换，需要重启会话。多模型切换需求明确，社区支持度高。
   - https://github.com/github/copilot-cli/issues/3282

5. **[#4438] `disable-model-invocation: true` 导致技能完全不可达**
   - 评论 10 | 👍 11 | 创建 2026-08-11 | 更新 2026-09-30
   - 项目技能声明 `disable-model-invocation` 后，显式调用也返回 `Skill not found`。用户期望该设置只禁止模型自动调用，而非阻断手动调用。
   - https://github.com/github/copilot-cli/issues/4438

6. **[#5008] 1.0.89 启动错误 “Failed to read model provider attribution: Not authenticated”**
   - 评论 5 | 👍 4 | 创建 2026-09-30 | 更新 2026-10-01
   - 新版本启动时出现与认证相关的竞态条件：错误提示出现约 3 秒后登录才完成，虽不影响后续请求，但对自动化/脚本用户有干扰。
   - https://github.com/github/copilot-cli/issues/5008

7. **[#4556] 服务端管理的 extraKnownMarketplaces 被获取但从未注册**
   - 评论 4 | 👍 2 | 创建 2026-08-21 | 更新 2026-09-30
   - 插件市场列表只显示默认项，服务端下发的额外市场条目被静默丢弃，导致插件路径认证失败。
   - https://github.com/github/copilot-cli/issues/4556

8. **[#4542] 工作区 .mcp.json 被识别但实际会话中未连接**
   - 评论 4 | 👍 1 | 创建 2026-08-20 | 更新 2026-09-30
   - `mcp list` 显示正常，但交互/自动模式会话中 MCP 服务器并未真正连接。MCP 配置检测与实际运行路径不一致。
   - https://github.com/github/copilot-cli/issues/4542

9. **[#3688] 仓库级自定义代理与 skills/.mcp.json 路径解析基准不一致**
   - 评论 4 | 👍 3 | 创建 2026-06-05 | 更新 2026-09-30
   - 自定义代理基于 git 根目录解析，而 skills 和 .mcp.json 基于当前工作目录解析。多源配置基准不统一，在子目录中易出现诡异行为。
   - https://github.com/github/copilot-cli/issues/3688

10. **[#2736] `posix_spawnp failed` 后误判命令不存在**
    - 评论 4 | 👍 6 | 创建 2026-04-15 | 更新 2026-09-30
    - 命令启动失败被错误归纳为“未安装”，但实际在 shell 中可正常运行。低层 spawn 错误的信息传递误导 agent 判断，影响排障。
    - https://github.com/github/copilot-cli/issues/2736

## 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Requests。

## 功能需求趋势

- **模型灵活性与多供应商支持**：GPT-6.1 Sol 已进入模型选择；BYOK 多模型切换是当前最高赞需求之一（#3282）。
- **精细化权限控制**：工具白名单（#1973）、会话级只读目录审批（已在 v1.0.90 中部分落地）表明社区对安全与效率平衡的诉求。
- **MCP 生态稳定性**：多个 Issue 指向 MCP 服务器发现、连接、认证及注册路径的问题（#4542、#4556、#4662、#4851）。
- **终端交互与可访问性**：滚动失效（#2205）、键盘分页导航（#5015）、滚动历史的可读性优化（#4995）等议题高频出现。
- **会话恢复与长会话体验**：恢复后权限提示、滚动位置错乱、usage 数据不准确等，反映会话管理仍是薄弱环节。

## 开发者关注点

- **400 错误高发**：#1274 影响代码审查等核心场景，问题持续数月未解决。
- **macOS 更新后不可用**：#4998、#5026 指向 MCP writer-lock 设备 ID 在系统更新/重启后失效，导致 CLI 完全无法使用。
- **启动时期认证竞态**：#5008 在新版本中影响所有用户，虽可自愈，但体验割裂。
- **权限提示繁琐**：每次工具调用都需要批准，且缺少细粒度白名单，是交互模式的主要痛点。
- **命令行工具可靠性**：spawn 失败、错误信息误导、子进程状态残留等问题，削弱了开发者对 agent 自动执行命令的信任。

---
*本日报由 AI 自动生成，数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-01

## 今日速览

今日发布补丁版本 v1.18.34，修复 macOS 二进制签名与会话身份头传递问题。社区方面，围绕模型错误处理（OpenAI 过载重试、Bedrock thinking block 校验）和升级后崩溃（`TypeError`、SystemPrompt.environment）的讨论热度最高；PR 侧则出现一次较大的架构重构——将桌面/Web GUI 特性迁移为内置扩展。

---

## 版本发布

### v1.18.34
- **核心修复**
  - 模型请求现在会发送 namespaced session 与 parent-session 身份头。
  - 重新签名本地编译的 macOS 二进制，确保在 macOS 27+ 上稳定运行。
  - macOS CLI 发布二进制改用 Developer ID 签名。
- 感谢 3 位社区贡献者（列表未完整展示）。

---

## 社区热点 Issues（10 条）

1. **[#25884] OpenAI server_is_overloaded 流错误未重试** — 15 评论 / 11 👍
   OpenAI 兼容流可能返回瞬态过载错误，但 OpenCode 未将其视为可重试的瞬时故障。影响所有使用 OpenAI 兼容网关的用户，属于可靠性关键问题。
   https://github.com/anomalyco/opencode/issues/25884

2. **[#49365] 升级后出现 `TypeError: undefined is not an object (evaluating 'a.name')`** — 11 评论
   用户提供了完整 debug 日志，定位进行中。影响面较大，多个 issue 都在反馈同一崩溃，但只有此条附带了干净的复现日志。
   https://github.com/anomalyco/opencode/issues/49365

3. **[#46729] Bedrock 上 Claude Opus 5 报 `prefix_mismatch_behavior: Extra inputs are not permitted`** — 8 评论 / 14 👍
   从 v1.18.25 升级到 v1.18.26 后，Amazon Bedrock 的 `claude-opus-5` 请求在输出前即失败，疑似配置字段校验过于严格。
   https://github.com/anomalyco/opencode/issues/46729

4. **[#39847] 模型托管位置信息不透明** — 6 评论 / 23 👍
   用户因"EU 托管模型"宣传而注册，但 DeepSeek V4 停止工作后无法确认实际托管地。信任与合规类问题，社区呼声很高。
   https://github.com/anomalyco/opencode/issues/39847

5. **[#48965] SystemPrompt.environment 在每次 prompt 时崩溃** — 4 评论 / 22 👍
   与 #49365 同源的崩溃点，发生在请求发送前构造系统提示阶段。错误被包装为"Unexpected server error"，掩盖了真实原因，用户难以自行排查。
   https://github.com/anomalyco/opencode/issues/48965

6. **[#20322] 原生跨会话自动记忆（Feature Request）** — 9 评论 / 7 👍
   社区持续要求持久化跨会话学习能力，用户希望无需手动配置即可让模型记住项目级上下文，与多个早期 feature 请求（#16077、#8043、#9211）同源。
   https://github.com/anomalyco/opencode/issues/20322

7. **[#34344] 免费模型无限使用漏洞** — 7 评论
   免费模型限流仅基于 IP，用户通过 VPN 轮换即可绕过限制无限使用，涉及 DeepSeek V4 Flash、Mimo v2.5。属于滥用与成本控制问题。
   https://github.com/anomalyco/opencode/issues/34344

8. **[#41551] 请求支持 Meta Muse Spark / Muse Code 提供商** — 6 评论 / 11 👍
   Meta 发布 Muse Spark 1.2 与编码专用模型后，社区希望 OpenCode 尽快集成该提供商，与现有新模型跟进节奏一致。
   https://github.com/anomalyco/opencode/issues/41551

9. **[#51481] Bedrock 子代理会话中 Opus 5.5 thinking block 被拒** — 5 评论
   长会话运行子代理时，Bedrock 报 `Invalid signature in thinking block`，原生 Anthropic 路由会自动 drop 不匹配块，但 Bedrock 路由不会，导致 400 错误中断。
   https://github.com/anomalyco/opencode/issues/51481

10. **[#29740] Qwen 3.6 无法读取图片** — 5 评论 / 3 👍
    同样使用 Qwen 3.6，Claude Code 可读图而 OpenCode 不行。多模态支持相关 bug，影响 Qwen 系列用户。
    https://github.com/anomalyco/opencode/issues/29740

---

## 重要 PR 进展（10 条）

1. **[#52418] fix(core): 为 MCP 传输与 HTTP 拒绝增加连接上下文日志** — OPEN
   修复 MCP 后台错误不可见的问题：之前未设置 `onerror` 导致 SSE 流错误被丢弃，HTTP 日志仅记录 401/403。现在长连接场景下的 MCP 错误可被追踪。
   https://github.com/anomalyco/opencode/pull/52418

2. **[#52414] fix(core): 关闭时终止 legacy MCP 会话** — OPEN
   修复关闭远程 MCP 连接时未发送 session DELETE 的问题，避免旧式 Streamable HTTP 会话在服务端残留至过期。
   https://github.com/anomalyco/opencode/pull/52414

3. **[#52369] refactor(app): 将 GUI 功能迁移至内置扩展** — OPEN
   架构级重构：桌面与 Web 应用除核心会话循环外的所有功能均改为内置 GUI 扩展，`packages/app` 与 `packages/desktop` 仅保留通用宿主概念（区域、标签、命令等）。扩展化将显著提升功能迭代速度。
   https://github.com/anomalyco/opencode/pull/52369

4. **[#52413] fix(cli): 防止无法解码的服务配置被误读为空** — OPEN
   `ServiceConfig.read` 在文件缺失与解码失败时都返回 `{}`，导致所有变更路径都会用默认值覆盖原有损坏配置。此 PR 区分两种场景，避免数据丢失。
   https://github.com/anomalyco/opencode/pull/52413

5. **[#52385] feat(plugin): 暴露 session 压缩能力** — OPEN
   将已有的 `session.compact` 操作开放给 Effect 与 Provider 插件 API，满足 #49389 中的第一项请求。
   https://github.com/anomalyco/opencode/pull/52385

6. **[#51947] fix(server): VCS handler 中等候选插件激活完成** — OPEN
   冷启动时 `GET /api/vcs` 返回空 `{branch:{}}`，因为 VCS provider 注册发生在异步插件激活过程中。此 PR 确保 handler 等待激活完成后再响应。
   https://github.com/anomalyco/opencode/pull/51947

7. **[#51946] fix(opencode): SIGTERM 时终止 MCP 子进程** — OPEN
   `opencode serve` 缺少信号处理器，导致停止服务时 MCP 子进程（如 `docker run`）被遗留成为孤儿进程。
   https://github.com/anomalyco/opencode/pull/51946

8. **[#52384] fix(github): 使用 share API 返回的 URL 发帖** — CLOSED
   GitHub agent 之前自行拼接会话链接，导致所有分享链接 404。现改为使用 `sessionShare.share()` 返回的真实 URL。
   https://github.com/anomalyco/opencode/pull/52384

9. **[#52391] fix(opencode): 内联 Nemotron 与 Qwen 的工具 schema $ref** — OPEN
   当 MCP 参数使用 `$ref` 描述时，可能被序列化为 JSON 字符串而非对象，破坏工具调用。此修复对 Nemotron 与 Qwen 系列模型将引用内联展开。
   https://github.com/anomalyco/opencode/pull/52391

10. **[#52387] feat(plugin): 暴露 session 删除能力** — CLOSED
    将 `session.remove` 操作开放给插件 API，对应 #49389 的第二项请求。插件生态能力持续增强。
    https://github.com/anomalyco/opencode/pull/52387

---

## 功能需求趋势

从今日 Issue 与 PR 中可以提炼出以下社区重点关注方向：

- **跨会话持久记忆**：多个 feature 请求（#20322、#32658）要求原生支持在会话间保留项目级上下文与学习成果，属于高频需求。
- **新模型与提供商快速适配**：Meta Muse（#41551）、Qwen 3.6 多模态（#29740）、Zen/GO 模型可用性（#39872、#39873）均反映社区对新模型支持的高期待。
- **模型托管与数据透明度**：用户越来越在意模型实际运行地区与隐私合规（#39847）。
- **插件 API 扩展**：PR 侧密集暴露 session 操作（compaction/removal）给插件，表明扩展机制是当前迭代重心。
- **MCP 可靠性**：连接生命周期管理、错误可视化和证书配置是 MCP 相关讨论的高频词（#52418、#52414、#23506）。

---

## 开发者关注点

- **升级后崩溃问题集中**：多起 `TypeError`（#49365、#48965）与模型字段校验失败（#46729）发生在小幅版本升级后，社区对升级兼容性敏感度较高。
- **错误处理不够透明**：底层明确的错误（如 429、thinking block 校验失败）被包装为"Unexpected server error"（#48988、#48792），开发者强烈希望原始错误能透传给用户。
- **模型错误分类需改进**：OpenAI 过载错误应可重试（#25884）、DeepSeek 静默停止（#35689）、Z.ai 拒绝被无效重试（PR #52135），说明 AI 提供商错误的分类与重试策略仍是核心痛点。
- **订阅与支付问题影响使用**：OpenCode GO/Zen 订阅被卡、支付反复失败（#40064、#48792），虽是运营侧问题，但已影响核心使用流程。
- **子代理与长会话兼容性**：Bedrock 上 thinking block 绑定错误在子代理场景下频发（#51481、#46729），使用复杂 agent 工作流的用户受影响最大。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-01）

## 今日速览

Managed Agent 已成为社区绝对核心主线：多个高讨论量 Issue 围绕 #12380 的架构蓝图展开，包括 Stage D/G 后续推进、工具发布恢复、Session 生命周期可靠性等；同时 **一个 P1 安全漏洞（#13106）** 浮出水面，`cd` 命令中的重定向目标可绕过 Write 权限检查，建议重点关注。版本侧仅有一个 nightly 构建，包含两处小修复。

---

## 版本发布

**v0.24.7-nightly.20260930.57e720bc97**（2026-09-30 发布）

- `fix(core)`: 对齐 Code Mode 文本与延迟工具发现逻辑（#12990）
- `fix(permissions)`: 遵守已批准的权限（内容被截断）

> 属于夜间迭代版本，无重大功能变更。

---

## 社区热点 Issues

### 1. Managed Agent 双路径架构提案（#12380）
**评论 38 条，社区核心蓝图**

定义了 Managed Agent 的分阶段交付架构，并明确保留现有 TypeScript Agent 循环，将模型推理与工具环境供给分离；同时为 Session 提供持久化所有权、Workspace 绑定、可恢复的工具执行和稳定的 WebSocket 连接。目前已有多个子 Issue（#12867、#12952 等）按阶段拆解推进。

👉 https://github.com/QwenLM/qwen-code/issues/12380

### 2. P1 安全漏洞：`cd` 命令重定向绕过 Write 权限检查（#13106）
**新增，建议优先排查**

`resolveCdTargetCwd` 调用了 `extractRedirects` 但丢弃了结果，导致 `cd somedir > .qwen/settings.json` 这类复合命令产生零个被提取操作，但 shell 仍会截断重定向目标文件。属于投毒型权限绕过。

👉 https://github.com/QwenLM/qwen-code/issues/13106

### 3. 预测性接受失败但不发射任何遥测（#13062）

当 speculative follow-up 的文件复制失败时，accept 仍报告成功，`SpeculationEvent` 遥测完全缺失，导致失败无从追踪。

👉 https://github.com/QwenLM/qwen-code/issues/13062

### 4. Stage D 后续：持久化生命周期、Turns、Actions 与 AgentDefinition（#12867）

覆盖 #12380 中 Stage D 剩余部分：持久化生命周期、Turns、Actions、`java_durable` 准入配置文件和 AgentDefinition——社区的关注重点从"打通"转向"完善"。

👉 https://github.com/QwenLM/qwen-code/issues/12867

### 5. Stage G：权威 Session 历史、写入者隔离与接管（#12952）

追踪 Stage G 的独立追踪 issue，目标是将 Session 历史/检查点外部化，并在移除 owner affinity 前验证写入者隔离和接管能力。

👉 https://github.com/QwenLM/qwen-code/issues/12952

### 6. 过期工具发布候选的恢复（#13019）

远程发布目录为每个操作设置固定的绝对 deadline。若某个 PUT segment 结果不确定且操作过期时仍处于 `CANDIDATE` 状态，原始 replay 存在安全隐患——社区正在设计安全恢复机制。

👉 https://github.com/QwenLM/qwen-code/issues/13019

### 7. Hosted Workspace 新增只读搜索工具（#13030）

提议在 Hosted Workspace 工具配置中新增 `list_directory`、`glob` 和 `grep_search`，通过既有 Broker 路径由 Runtime worker 执行，复用 `read_file` 模式，提升 hosted 场景下模型的代码探索能力。

👉 https://github.com/QwenLM/qwen-code/issues/13030

### 8. `provenance` 字段在 api-history 投影中丢失（#12042）

通知/定时记录与真实用户提交在持久化时本可通过 `provenance` 区分，但该字段在投影后丢失，导致两类通知形状仍被错误分类。属于长期存在的 Classifier 判定 bug。

👉 https://github.com/QwenLM/qwen-code/issues/12042

### 9. 每日依赖 CVE 审计失败（#13078）

自动化安全扫描 pipeline 失败，原因可能是新增高危漏洞或 npm audit 端点不可用。需要维护者手动介入核查。

👉 https://github.com/QwenLM/qwen-code/issues/13078

### 10. Qwen Code Desktop 信任状态崩溃（#13130）

用户反馈所有 workspace 突然变为未信任/只读，UI 无法直观恢复。该问题影响桌面端可用性，作者已补充详情，目前等待更多信息。

👉 https://github.com/QwenLM/qwen-code/issues/13130

---

## 重要 PR 进展

### 1. 移除内部模型请求中的硬编码 temperature（#12958）
修复 #12928。现代模型（如 OpenAI GPT-6 等）在非 `none` reasoning effort 下已弃用该参数，此前每次内部调用都携带固定值，导致请求被拒绝或弃用警告。

👉 https://github.com/QwenLM/qwen-code/pull/12958

### 2. 基于 models.dev 解析模型上限与模态（#11959）
新增 models.dev 目录支持，包含裁剪快照 + 24 小时缓存 + ETag 后台刷新，用于推断上下文窗口、输出上限和输入模态，提升多模型兼容性的可维护性。

👉 https://github.com/QwenLM/qwen-code/pull/11959

### 3. 允许 Workspace-bound Session 创建者提交、取消与重命名（#13112）
当前 G0 只允许创建时的一次性文件工具 Turn，后续提交一律返回 409。该 PR 让创建者可以持续对话，补上基本交互闭环。

👉 https://github.com/QwenLM/qwen-code/pull/13112

### 4. 将持久化工具结果投影到 WebShell（#13037）
O3 功能落地：将 Hosted Shell receipts 提交为持久化公共工具结果；经过认证的元数据与字节 API 暴露 stdout/stderr，WebShell 内支持分页和流式下载。

👉 https://github.com/QwenLM/qwen-code/pull/13037

### 5. 保护 Session 拥有的工具输出退役（#13084）
O4-1 增加永久 Session 退役、固定预算数据库 reader 租约、独立物理 PUT 尝试以及候选观察机制，确保删除时原子化回收私有恢复/公共发布访问。

👉 https://github.com/QwenLM/qwen-code/pull/13084

### 6. 可靠关闭 Workspace-bound Sessions（#13135）
通过现有公共与 WebShell 生命周期操作，对空闲的 `hosted-workspace-files/1` Session 实现可靠关闭；创建者带当前读权限收到幂等 202 准入，事务原子完成。

👉 https://github.com/QwenLM/qwen-code/pull/13135

### 7. Hosted Turn 接管与 G1 故障转移 E2E（#13083）
Stage G（#12952）Harness 端实现：替换的 Harness 读取停在 `await_runtime`/`results_ready` 检查点的 Session，在原始 `executionCallId` 下重新执行 Runtime 工作。

👉 https://github.com/QwenLM/qwen-code/pull/13083

### 8. 修复错误的 max_tokens 截断诊断（#12982）
当 provider 流返回畸形/融合 tool-call 参数时，解析器误判为 JSON 不完整，OpenAI converter 将 `finish_reason` 无条件改写为 `length`，造成误诊断。该 PR 修复此行为。

👉 https://github.com/QwenLM/qwen-code/pull/12982

### 9. 修复 WebShell inline chip 注释范围错位（#12992）
当纯文本恰与后续引用 chip 的拼写一致时，注解会错误附加到首个文本匹配上。该 PR 确保注解挂在 chip 的真实范围上。

👉 https://github.com/QwenLM/qwen-code/pull/12992

### 10. 延迟工具规则与 schema 门控、技能列表预算、内存节奏优化（#13020）
该 PR 将 `monitor` 和 `lsp` 的选择规则移到 startup reminder 的第一行，让模型在加载前看到 trade-off；同时引入 schema 门控避免未知字段、控制技能列表输出预算、增加可选内存节奏辅助与快捷召回。

👉 https://github.com/QwenLM/qwen-code/pull/13020

---

## 功能需求趋势

从近 24 小时 Issue/PR 可以提炼出以下五个方向：

1. **Managed Agent / Hosted Session 架构深化（绝对主线）**
   Stage D/G 持续追踪、Turn 接管、Session 生命周期管理、workspace 绑定、durable 工具结果——社区正在从"可用"走向"可靠"。

2. **Session 数据持久化与恢复**
   多方在解决 provenance 字段丢失、长 Session Store 冷启动延迟（#13132）、Session 关闭/接管时的原子性，数据可靠性成为共识。

3. **安全与权限边界**
   除了 P1 的 `cd` 重定向绕过外，trusted folders 状态崩溃（#13130）、租户过滤 403 声明（#12976）等也在并行修补，安全边界被社区持续施压。

4. **工具调用可靠性**
   延迟工具选择规则、tool-call 参数错误诊断、过期工具发布候选恢复——都是为了让模型在真实场景下能稳定使用工具。

5. **外部模型服务兼容**
   models.dev catalog、移除硬编码 temperature、第三方 OpenAI 兼容端点配置（#13121 提到 DemonRoute 示例）——开发者希望更自由地接入各种模型后端。

---

## 开发者关注点

- **远程 Session 无法持续操作**：Workspace-bound Session 创建后只能跑一次 Turn 的问题被多人吐槽（#13112 直接针对此痛点修复）。
- **状态损坏与信任机制脆弱**：#13130 中所有 workspace 突然只读，用户没有任何恢复手段，桌面端信任机制需要更好的设计和逃生通道。
- **失败不可见**：预测性接受失败无遥测（#13062）、LSP 查询失败却报告"无诊断"（#12467），都是"假成功"问题，严重影响用户排障。
- **并发后台 Agent 缺少节流能力**：#12959 建议新增 `maxConcurrentBackgroundAgents` 设置，并在瞬时 API 错误时自动重试，直指多 sub-agent

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*