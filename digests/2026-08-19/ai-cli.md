# AI CLI 工具社区动态日报 2026-08-19

> 生成时间: 2026-08-19 00:36 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-19）

> 数据范围：本报告基于 2026-08-19 各工具 GitHub 社区动态摘要。**Claude Code、Gemini CLI、OpenCode 三个工具今日无动态数据提供**，相关对比仅在可获得数据范围内展开，并以「无数据」标注，不做过推断。

---

## 1. 生态全景

AI CLI 工具正从「单次代码生成」快速进化为**多会话、多 Agent、带完整生命周期管理**的研发基础设施。各主流工具近乎同步地把资源投入到三个方向：会话管理（fork、恢复、导出）、MCP 生态的稳定性、Agent 角色与权限的边界控制。与此同时，Windows/WSL 平台兼容性问题在多家工具中集中爆发，反映出 AI CLI 工具的用户群正从 Linux/macOS 极客圈扩展至企业级 Windows 开发者。整体来看，各工具处于高频迭代期，但功能趋同现象明显，差异化之争逐渐从「模型能力」转向「工作流治理与生态集成」。

---

## 2. 各工具活跃度对比

| 工具 | Release | 热门 Issues（前 10） | 重要 PR 数 | 当日活跃度定性 |
|------|---------|----------------------|-----------|-----------------|
| **OpenAI Codex** | ✅ v0.148.0 正式版 + alpha.23 预发布 | 10 个高活跃 Issue（评论 5~63，👍 8~107） | 10 个 PR 合入/更新 | ⭐⭐⭐⭐⭐ 最高 |
| **GitHub Copilot CLI** | ✅ v1.0.81-1 正式版 | 约 10 个 Issue（评论 0–10，👍 3–20） | 几乎无实质代码合入（仅 1 个无关 PR） | ⭐⭐⭐ 中 |
| **Qwen Code** | ✅ v0.21.11-nightly（含 `sessions ps`） | 10 个多粒度 Issue（含 P1 级但要） | 10 个 PR（含 Agent Board、工具调用重试安全等） | ⭐⭐⭐⭐ 高 |
| **Kimi Code CLI** | ❌ 无新版本 | 2 个新增 Issue（#2607 bug / #2608 UGC） | 2 个（#848 关闭 8 个月长命 PR、#2606 新 PR） | ⭐ 较低 |
| **Claude Code** | 无数据 | 无数据 | 无数据 | — |
| **Gemini CLI** | 无数据 | 无数据 | 无数据 | — |
| **OpenCode** | 无数据 | 无数据 | 无数据 | — |

**补充说明**：OpenAI Codex 是今日唯一同时具备正式 Release（v0.148.0）+ 高社区议题量（Issue 评论最高 63 条、功能需求👍过百）+ 密集 PR 合入的三指标领先项目，处于明显的功能窗口期。Qwen Code 虽为 nightly 版本，但 Issue 覆盖级别最高（含 P1 数据丢失/崩溃类 Bug），且 PR 方向与社区反馈强相关。Copilot CLI 的 1.0.81-1 引发沙箱回归 Issue 集中上报，但同日无实质抗拒 PR，反馈大概率仍具有「等官方回应」状态。

---

## 3. 共同关注的功能方向

以下诉求在 ≥ 两个以上工具社区中同时出现：

### 3.1 MCP（Model Context Protocol）基建的稳定性
| 工具 | 具体诉求 |
|------|---------|
| OpenAI Codex | MCP 进程泄漏（9+ GB RSS）、MCP OAuth token 刷新失败、MCP tool hooks 启用 |
| GitHub Copilot CLI | MCP 子进程泄漏（ant 与 CPU 攀升）、Atlassian MCP OAuth 认证失败、MCP 工具 OAuth 不通过 CLI 传递 |
| Qwen Code | 工具调用重复 ID 误判/replay、重复调用循环终止、provider tool-call id 防误重放 |

**共性**：AI CLI 的核心「MCP agentic 基础设施」在认证、进程生命周期、工具调用去重三个方面尚未成熟，是三大玩家近期共同的技术债焦点。

### 3.2 会话/上下文作为一等公民
- **会话管理**：Codex 提供 fork、归档/恢复、`/export` Markdown；Qwen Code 推出 live-session registry 与 `qwen sessions ps`、Agent Board；Copilot CLI 专注 Schedule Manager 自动重启会话。
- **上下文安全**：Qwen `/rewind` 在 `/compress-fast` 后丢失历史、Codex Guardian 缓存改造、共同指向「父体压缩、重放、会话恢复」的综合流畅性问题。

### 3.3 Agent 权限与行为边界控制
| 工具 | 关注点 |
|------|-------|
| OpenAI Codex | PR 「限制 agent roles 只允许有界覆盖配置」、防止 auth token 泄漏到子进程 |
| GitHub Copilot CLI | 自定义 Agent 前端支持推理强度（Reasoning Effort）；按 plan/autopilot 模式配置默认 Agent |
| Qwen Code | 命名 teammates 无视 `run_in_background: false`、teammates 无法给 leader 发消息 |

共性诉求：**当 Agent 从单数变成复数，最小权限原则与行为默认值是用户的头号刚需**。

### 3.4 模型选择的灵活性与细粒度配置
- OpenAI Codex：models.json 自动更新、`--package-version` 覆盖
- Copilot CLI：组织层模型缺失（Claude 5/Kimi K3），社区要求 per-Agent / per-mode 模型指定
- Qwen Code：提供 max_context_window 自定义、运行时主动探测模型

### 3.5 Windows/WSL 平台兼容性
- OpenAI Codex：Windows 浏览器「Trusted RPC」错误（63 评论）、WSL 仓库误判
- Qwen Code：Windows Desktop 会话重启后静默删除（P1）、Windows 文件路径问题
- Copilot CLI：Java/JVM 在沙箱 RW 路径失效；WSL 相关（兼）

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术侧 | 当前迭代重心 |
|------|---------|---------|----------------|----------------|
| **OpenAI Codex** | 「会话优先」的专业 CLI 工作台 | 深度 TUI/CLI 用户、企业级开发者 | Rust；TUI 强化（导出、fork、草稿）；安全合规加固（header 校验、Guardian、OAuth） | 会话工作流、供应链安全、MCP 基础设施 |
| **GitHub Copilot CLI** | 强调安全合规的 GitHub 生态开发者助手 | Copilot 企业订阅者、组织级开发者 | 沙箱/Sandbox 作为核心执行模型；Schedule Manager 自动化调度 | 公共合规（沙箱）、企业模型目录同步、MCP 认证 |
| **Qwen Code** | 工程化「多 Agent 团队」的先行者 | 偏好自动化流水线、多 Agent 编排的开发者 | Go/TypeScript（？）；Agent Board 共享工作、跨会话消息、自研 review/autofix CI 循环 | 多 Agent 消息与任务分派；会话 registry；服务端状态管理 |
| **Kimi Code CLI** | 垂直场景验证型工具 | 中文开发者、量化/金融工程场景 | OpenAI-compatible 兼容；较为克制，更新节奏慢 | 第三方 Provider/Web UI 适配、SSH log 清理 |

### 一句话概括差异
- **Codex** = 「把 Terminal 变成 IDE」：强会话管理、工作流自定义。
- **Copilot CLI** = 「把 Agent 关进沙箱」：强合规、企agent、自动调度。
- **Qwen Code** = 「让一群 Agent 一起干活」：强协作、自动化、内部 CI 自举。
- **Kimi Code** = 「听话的垂直工具」：轻量稳定，示例导向型生态。

---

## 5. 社区热度与成熟度

| 工具 | 热度信号 | 成熟度判断 |
|------|---------|------------|
| **OpenAI Codex** | 🟢 10 个 Issue 中 6 个评论 ≥20；1 个功能需求获 👍107（多账号）；PR 密度高 | **功能爆发期**：用户生态成熟，需求开始细分（企业级、多账号、安全）；核心会话功能基本完成，✅ 面临平台化挑战 |
| **Qwen Code** | 🟢 10 个 Issue 中 P1/P2 较多、1 个 RFC 已关闭转向落地；PR 功能层级多样 | **快速迭代期**：反馈节奏快、工程投入高，但 UI/声明语义等细节仍有明显「文档 - 实数字」缺口；需回 Brooklyn 候补； |
| **GitHub Copilot CLI** | 🟡 Issue 评论量整体不高，但出发两次高频值②（沙箱 、MCP auth） | **企业稳定期**：因企业级 ssh 模式限制，外部社区热度相对低，但在政策驱动的功能（沙箱）推进上层大步走；稳定性回归风险（自由度 - 控制的矛盾） |
| **Kimi Code CLI** | 🔴 24h 仅 2 新 Issue、1 PR 关闭（8 个月长尾） | **低度活跃/维护模式**：社区方向偏海外，其次 Bug 报告很少；垂直方向（量化）有任何者的态度 |
| **Claude Code / Gemini / OpenCode** | 🤷 无数据 | 无法判断 |

---

## 6. 值得关注的趋势信号

### 6.1 Session 正在成为 Agent 的基本「账户单位」
`session` 正在从「命令行末尾」演变为可通过 fork、`/export`、A表规则、跨 Agent 共享的「资产管理对象」（Codex: `codex exec fork`；Qwen: `sessions ps` + Agent Board）。这意味着：
- 未来 AI CLI 會話将具备

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据来源：anthropics/skills 公共仓库 | 数据截止：2026-08-19*

---

## 1. 热门 Skills 排行

以下按 PR 评论/关注活跃度排序，当前均处于 **open** 状态：

**#1 skill-creator 修复：run_eval.py 误报 0% recall**（#1298）  
Skill-creator 是生成/迭代技能的元技能，其 `run_eval.py` 在所有描述下都报 `recall=0%`，导致描述优化循环“对着噪声优化”。该 PR 修复了评估产物安装、Windows 流读取、触发检测与并行 worker 问题，关联 10+ 复现的 issue #556。讨论热度为仓库最高。  
[https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

**#2 document-typography：生成文档的排版质检**（#514）  
> 针对 AI 生成文档中常见的孤词换行、悬行段落、编号错位等问题，提供排版质量控制。讨论点集中在“用户很少主动要求但极大影响文档观感”的痛点。  
[https://github.com/anthropics/skills/pull/514](https://github.com/anthropics/skills/pull/514)

**#3 ODT 技能：OpenDocument 文档全流程**（#486）  
> 支持 .odt/.ods 的创建、模板填充、读取及 ODT→HTML 转换，补齐开源文档格式的生态覆盖，社区讨论活跃且呼声较高。  
[https://github.com/anthropics/skills/pull/486](https://github.com/anthropics/skills/pull/486)

**#4 frontend-design 技能重构**（#210）  
> 目标是把该技能从“说明书”变成“可执行的指令”，确保 Claude 能在单次对话中实际跟随，讨论焦点是技能的可操作性边界。  
[https://github.com

---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**日期：2026-08-19**

---

## 今日速览

- **Codex 0.148.0 正式发布**：新增 TUI 会话导出为 Markdown、`codex exec fork` 分支会话、TUI 启动期间草稿输入等多项功能。
- **Windows 浏览器控制故障密集上报**：多条 Issue 指向“Trusted RPC dependency is not within a trusted code path”，影响内置浏览器与 Chrome 扩展，社区关注度极高。
- **MCP 与子会话问题持续发酵**：MCP 进程泄漏、OAuth token 刷新失效、子会话 UI 残留等老问题仍未解决，开发者反馈强烈。

---

## 2. 版本发布

### rust-v0.148.0（当前正式版）
- **TUI 会话导出 Markdown**：`/export` 可将完整 TUI 会话导出为 Markdown，支持复制到剪贴板或保存为新文件。
- **会话 Fork 与归档恢复**：`codex exec fork` 支持 fork 会话；TUI 恢复选择器支持归档/恢复会话。
- **TUI 启动时起草提示**：在 TUI 初始化期间即可开始输入草稿。

### rust-v0.148.0-alpha.22 / alpha.23
- 预发布版本，主要为 0.148.0 稳定性验证（无具体功能说明）。

---

## 3. 社区热点 Issue

以下按评论数量与关注度挑选的 10 个 Issue：

### 1. Codex 内置浏览器控件初始化失败 / #39136
- **状态**：开盘 | **评论**：63 | **👍**：20
- **现象**：Windows 上 Codex 浏览器控件报 `Trusted RPC dependency is not within a trusted code path`，无法打开浏览器 UI。
- **影响**：Windows 用户高调反馈，社区讨论热烈，疑似与 Chromium 安全策略有关。
- [查看 Issue](https://github.com/openai/codex/issues/39168)

### 2. VS Code 扩展版本过期导致空白 Webview / #32041
- **状态**：开盘 | **评论**：56 | **👍**：3
- **现象**：VS Code 扩展 26.5707.* 在 Linux 上打开不了 Webview，回退 26.5623 又缺失 5.6-Sol 模型。
- **影响**：Linux 用户无法正常使用扩展，且模型选择受限。
- [查看 Issue](https://github.com/openai/codex/issues/32041)

### 3. Copy/Export 会话为 Markdown / #2880
- **状态**：🟢 已关闭 | **评论**：31 | **👍**：78
- **现象**：旧版功能请求，今日已通过 `/export` 正式落地，该 Issue 关闭。
- **影响**：高赞需求，用户最大社区呼声之一已得到解决。
- [查看 Issue](https://github.com/openai/codex/issues/2880)

### 4. MCP 服务器进程泄漏（9+ GB RSS）/ #30408
- **状态**：开盘 | **评论**：29 | **👍**：8
- **现象**：每创建一个线程/对话就生成一套 MCP 进程，归档/关闭后从不清理，最终内存暴涨。
- **影响**：在高并发或者长时间使用下可能崩溃或严重卡顿。
- [查看 Issue](https://github.com/openai/codex/issues/30408)

### 5. 多个命名账号支持 / #20500
- **状态**：开盘 | **评论**：28 | **👍**：107
- **现象**：希望为同一 app/connector 支持多个独立授权的账号，分别选择账号，具备硬隐私隔离。
- **影响**：这是社区呼声最高的功能需求之一。
- [查看 Issue](https://github.com/openai/codex/issues/20500)

### 6. Windows 上录入 Prompts 随机消失 / #25928
- **状态**：开盘 | **评论**：27 | **👍**：18
- **现象**：在 VS Code/Cursor 扩展中，已经提交的 Prompts 在进入队列前随机丢失。
- **影响**：影响工作流可靠性，用户被迫重新尝试完全相同的 Prompt。
- [查看 Issue](https://github.com/openai/codex/issues/25928)

### 7. WSL 集成仓库被误判为 non-Git / #35119
- **状态**：开盘 | **评论**：23 | **👍**：17
- **现象**：26.721.3404 会将在 WSL ext4 上的仓库判定为“非 Git 仓库”并显示“Git 不可用”。
- **影响**：Windows+WSL 用户无法使用 Git 功能。
- [查看 Issue](https://github.com/openai/codex/issues/35119)

### 8. 浏览器控制失败：Trusted RPC 配置问题 / #39143
- **状态**：🟢 不再 | **评论**：21 | **👍**：12
- **现象**：本机 Chrome 或组内浏览器控件操作出现同样的 `Trusted RPC dependency must resolve within a configurable trusted code path` 错误。
- **影响**：影响同样源于 Windows Browser 插件安全路径配置。
- [查看 Issue](https://github.com/openai/codex/issues/39143)

### 9. 子会话卡片残留闪烁 / #23930
- **状态**：开盘 | **评论**：26 | **👍**：5
- **现象**：已完成/已关闭的子会话仍显示在 UI 中，即使关闭、读取回读报告也没有活动会话。
- **影响**：影响 UI 整洁与状态判断。
- [查看 Issue](https://github.com/openai/codex/issues/23930)

### 10. MCP OAuth 令牌刷新失败后永久重试 / #39054
- **状态**：开盘 | **评论**：5 | **👍**：0
- **现象**：刷新令牌一旦被拒绝，Codex 会永远用该令牌重试，不会触发重新认证。
- **影响**：导致用户只能重启或重新配置 MCP，影响稳定性。
- [查看 Issue](https://github.com/openai/codex/issues/39054)

---

## 4. 重要 PR 进展

以下 PR 均在 2026-08-18 至 19 日合并或更新：

### 1. `Update models.json` / #31817
- 自动更新模型配置，同步最新模型元数据。
- [查看 PR](https://github.com/openai/codex/pull/31817)

### 2. 强制工作区限制用于 header 认证 / #39379
- 校验 `chatgpt-account-id` 的账号是否在限制范围内，防止未授权 header 调用。
- [查看 PR](https://github.com/openai/codex/pull/39379)

### 3. 扩展 OAuth metadata 重定向测试 / #39312
- 新增同源/跨源重定向测试；跨域重定向直接拒绝，避免 SSRF。
- [查看 PR](https://github.com/openai/codex/pull/39312)

### 4. 添加异步用户消息工具 / #39319
- 新增 `send_user_message_async` 工具，用于 root agent 在不终结当前 turn 的情况下异步发送用户消息。
- [查看 PR](https://github.com/openai/codex/pull/39319)

### 5. 支持 Edu Plus / Pro 订阅 / #39316
- 识别一般 `edu_plus` 和 `edu_pro` 权益，并参与云配置资格。
- [查看 PR](https://github.com/openai/codex/pull/39316)

### 6. 缓存逃脱式 evict guardian transcript / #39315
- 将 Guardian 转录条目按可缓存 chunk 进行淘汰，提升缓存稳定性。
- [查看 PR](https://github.com/openai/codex/pull/39315)

### 7. 使用捕获的环境变量执行运行 hooks / #39314
- Hook 执行时复制创建时的环境快照，避免 live env 干扰。
- [查看 PR](https://github.com/openai/codex/pull/39314)

### 8. 限制 Agent roles 只允许有界覆盖配置 / #39299
- 防止孩子代理从父会话继承过多配置权限，仅允许模型行为、开发者消息等白名单覆盖。
- [查看 PR](https://github.com/openai/codex/pull/39299)

### 9. 允许覆盖 Codex 包版本 / #39298
- 新增 `--package-version` 参数，可覆盖 `codex-package.json` 中的版本号。
- [查看 PR](https://github.com/openai/codex/pull/39298)

### 10. 启用 MCP 工具 hooks / #39296
- `mcp_tool` 钩子将通过 MCP 运行时执行，且只允许已连接、已编入目录、且策略允许的工具。
- [查看 PR](https://github.com/openai/codex/pull/39296)

---

## 5. 功能需求趋势

从今日 issue 与 PR 中可以看到几个主要社区关注方向：

- **多账号与认证管理**：MCP OAuth 刷新、多账号支持、账号隔离诉求（#kexing20528、#39054 等）。
- **Windows 生态修复**：浏览器插件、WSL Git 识别、Windows App 安装路径 / 未清理问题。
- **会话管理与恢复**：fork 会话、归档/恢复、上下文压缩（compact）失败等问题。
- **模型行为与配置覆盖**：自定义模型支持 MCP tools、自定义 `max_context_window`、包版本覆盖。
- **安全性改进**：Guardian V2 失败关闭、限制 agent 角色权限、防止 auth token 泄漏到子进程等，CLI 安全性明显偏重。

同时，社区高赞功能中尚未满足的诉求：
- **多账号**（👍 107）仍有大中华圈需求，为第一大功能需求。
- **导出 Markdown** 已实现，用户反馈非常好。
- **模型参数覆盖**（上下文长度、版本号覆盖）相关 PR 已合入，未来版本中可见。

---

## 6. 开发者关注点

今日反馈中，开发者高频痛点与提到次数：

| 痛点 | 出现频度 | 说明 |
|-------|--------|--------|
| **浏览器插件“Trusted RPC”错误** | 高频（>3 个 Issue） | Windows 专属，严重影响浏览器代理使用。 |
| **MCP 进程泄漏 / 反复 spawn** | 高频 | 内存暴涨，线程越多越卡。 |
| **VS Code / Windows 扩展不稳定** |中频 | 多版本扩展有 UI 空白、提示词丢失等问题。 |
| **WSL Git / Windows 文件系统兼容** | 中频 | WSL 仓库被误判为非 Git、Git 不可用。 |
| **恢复 / 归档失败** |中频 | 线程恢复慢（数组线性）以至于超时，存档失败。 |
| **子代理退出/清除异常** | 中频 | UI 未清洗，状态误判。 |
| **模型上下文长度限制 / 配置回传** | 低频但重要 | 例如某些模型 max_context_window 偏小。 |

总体而言，Windows 平台与 MCP（Model Context Protocol）稳定性是目前社区最关注的两大痛点。同时，官方正在借助 PR 形式修复 MCP 、浏览器安全与子代理等方向，并快速响应需求（如 `/export` 已落地）。开发者建议可优先关注这些 Issue，并计划更新体验 0.148.0 以获取 TUI/导出/账户配置等改进。

---

*日报生成时间：2026-08-19*  
*数据来源：github.com/openai/codex*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报

**日期：2026-08-19**

---

### 1. 今日速览

- **v1.0.81-1 正式发布**：新增 Gemini 3.7 Flash 模型支持、`/sandbox` 编辑器快捷键及每 Agent 用量输出，同时优化了 Schedule Manager 的操作方式。
- **沙箱问题集中爆发**：过去 24 小时内出现至少 4 个关于沙箱的严重新 Issue（#4521、#4522、#4524、#4516），用户普遍反映沙箱无法禁用、覆盖本地配置且过于局限（甚至阻止了 git 操作）。
- **模型目录缺失与 MCP 连接问题持续发酵**：组织级模型不可用（#4390）与 Atlassian MCP OAuth 失败（#4490）仍是社区关注焦点。

---

### 2. 版本发布：v1.0.81-1

> 链接：https://github.com/github/copilot-cli/releases

**新增（Added）**
- 支持 Gemini 3.7 Flash 模型
- `/sandbox` 中新增 `Ctrl+E` 快捷键，在编辑器中打开 `settings.json`
- 在 `--usage-output-file` JSON 输出中增加每个 Agent 的独立用量（usage）指标

**改进（Improved）**
- 在 Schedule Manager 中使用 `x` 键即可移除已调度的 `/every` 和 `/after` 提示，无需进入编辑模式

**修复（Fixed）**
- 修复关闭 `allow-all` 时的若干边缘行为问题

> 💡 社区评价：此次更新中 Gemini 3.7 Flash 支持及 per-agent 用量指标是用户期待已久的特性，但沙箱相关的修复并未完全解决当前这批回归问题。

---

### 3. 社区热点 Issues（10 个）

#### 🔥 新模型与模型配置

**#4390 [OPEN] 已启用的组织模型缺失于模型目录（Claude Sonnet 5/Opus 5、Kimi K3）**
👤 @Rogn | 💬 10 条评论 | 👍 7
https://github.com/github/copilot-cli/issues/4390

> 组织在 Copilot Business 中已明确启用的 Anthropic 模型及 Kimi K3 仍未出现在 CLI 模型目录中，选择 `claude-sonnet-5` 时提示模型被禁用。严重影响企业用户使用最新模型的体验。

**#4511 [OPEN] Session AIC 展示不可靠（Kimi K3 场景）**
👤 @kdrapelinexto | 💬 1 条评论
https://github.com/github/copilot-cli/issues/4511

> 长时间运行包含 plan/implement/review 的 Kimi K3 会话，终端显示的 AIC 用量明显低估实际消耗，导致用户无法准确监控成本。

#### 🔴 沙箱回归（今日最热）

**#4522 [OPEN] 1.0.81 在管理策略未决时强制开启沙箱，忽略 sandbox.enabled=false**
👤 @dfederm | 💬 2 条评论 | 👍 5
https://github.com/github/copilot-cli/issues/4522

> 即使设置了 `"sandbox": {"enabled": false}` 且系统 MDM 无沙箱配置，CLI 1.0.81 在服务器策略暂未确定时仍强制执行沙箱，覆盖所有本地设置。

**#4521 [OPEN] 沙箱无法关闭**
👤 @hahahahahaiyiwen | 💬 2 条评论 | 👍 3
https://github.com/github/copilot-cli/issues/4521

> 配置文件显示 sandbox disabled，但状态栏仍显示沙箱启用，所有命令均在沙箱中执行。配置与实际行为不一致。

**#4524 [OPEN] 沙箱禁止 Copilot 使用 git**
👤 @logar16 | 💬 2 条评论
https://github.com/github/copilot-cli/issues/4524

> 最新强制沙箱版本即使启用了整个工作目录和 ~/.copilot，git 操作仍被拒绝，导致正常开发流程受阻，被认为"过度严格"。

**#4516 [OPEN] Java/JVM 进程忽略沙箱 RW 路径授权**
👤 @pavsindelar | 💬 0 条评论
https://github.com/github/copilot-cli/issues/4516

> `/sandbox` 配置的 RW 路径（如 ~/.m2/repository）对 Maven、javac 等 JVM 进程不生效，仅普通 shell 命令可用，影响 Java 生态用户。

#### MCP 与认证

**#4490 [OPEN] Atlassian MCP OAuth 1.0.80 认证回归（RFC 8414 §3.3）**
👤 @ChandrasekarCK | 💬 3 条评论
https://github.com/github/copilot-cli/issues/4490

> 1.0.78 正常；1.0.80 起报错"authorization server advertised an issuer that does not match its metadata"。核心 MCP 认证兼容性问题。

**#4096 [CLOSED] 第三方 MCP 服务器显示"已连接"，但工具缺失于 CLI 会话**
👤 @bugale | 💬 6 条评论 | 👍 2
https://github.com/github/copilot-cli/issues/4096

> 在 Copilot 应用界面完成 Atlassian Remote MCP 的 OAuth 授权并显示绿色 Connected，但 CLI 会话始终无法使用该 MCP 的工具，OAuth 令牌未正确桥接至 CLI。

**#4392 [OPEN] 启动后 MCP 客户端重建导致孤儿进程持续累积**
👤 @michael3lyb | 💬 2 条评论
https://github.com/github/copilot-cli/issues/4392

> 启动时一次性产出所有 MCP server，GitHub 鉴权完成后销毁并重建整个 MCP 客户端，导致第一代 stdio 子进程未被终止或回收，每次重启累积更多孤儿进程。

#### MCP 与进程泄漏

**#3698 [OPEN] MCP 的连接泄漏：卡住的 stdio 服务器不退，CPU 飙升**
👤 @Mcrewe | 💬 0 条评论 | 👍 3
https://github.com/github/copilot-cli/issues/3698

> 配置了响应慢的 stdio MCP server 时，CLI 不断生成新进程但从不回收旧进程，子进程无限累积，拖慢整台机器。与 #4392 高度相关。

#### Agent/配置

**#2904 [OPEN] 自定义 Agent YAML 前言中：支持旅行参数（Reasoning Effort）**
👤 @brian-kelley-intel | 💬 7 条评论 | 👍 20
https://github.com/github/copilot-cli/issues/2904

> `.agent.md` 自定义 Agent 无法单独设置推理强度（如 auto/low/high），被局限 `--effort` 全局统一模式，要求扩展 frontmatter。

**#2958 [OPEN] 支持按模式配置默认 Agent（plan mode vs. autopilot）**
👤 @nickduch | 💬 4 条评论 | 👍 16
https://github.com/github/copilot-cli/issues/2958

> 用户希望允许 plan 和 autopilot 模式下分别指定默认模型，以满足规划对精度不同、执行对速度/成本需求不同场景。与 #2904 同系列呼声。

---

### 4. 重要 PR 进展

过去 24 小时仅 1 个 PR 更新，无实质性代码合并进展。

**#3163 [OPEN] ViewSonic monitor（疑似无关/误发）**
👤 @tijuks | 评论：无
https://github.com/github/copilot-cli/pull/3163

> PR 描述为 `###monitor for #2591 ,#3561,#3559` + `-initiate [GitHub action] //runners`，内容与 Copilot CLI 功能无关，可能是机器机器人误发，建议社区巡查标注。

---

### 5. 功能需求趋势

| 方向 | 代表 Issue | 热度 |
|------|-----------|------|
| **沙箱的确认性与可恢复性**（Sandbox 可关闭、可恢复 git 操作、按配置运行） | #4522、#4521、#4524、#4516 | ⭐⭐⭐⭐⭐ 今日最热 |
| **模型使用灵活性与成本控制**（每个 Agent/模式独立指定主流与推理等级） | #2958、#2904 | ⭐⭐⭐ 持续上升 |
| **MCP 稳定连接与生命周期管理**（修复认证回归、消除子进程泄漏） | #4490、#4392、#3698 | ⭐⭐⭐ 长期存在 |
| **更精细的用量与计费可见性**（按 Agent 指标已上线，用户仍要求修复 AIC 计数） | #4511 | ⭐⭐ |
| **会话可用性增强**（历史滚动浏览、系统重命名问题、超长会话） | #4313、#2622 | ⭐⭐ |

---

### 6. 开发者关注点

- **沙箱配额回归是全社区痛点**：多个用户明确表示"配置可关闭但沙箱强制开启""git 无法执行""Java 工具失效"，官方需尽快回应 1.0.81-1 的沙箱行为是否为了安全合规而有意收紧，并提供应急预案（如 `SANDBOX_DISABLE=1` 或回退方式）。
- **模型目录与组织配置脱节**：企业管理员在服务端启用的 Claude 5/Kimi K3 未同步到 CLI，且 CLI 将本应是企业的配置错误显示为"模型禁用"，影响排错。
- **MCP 进程管理和 OAuth 的可靠性**：子进程泄漏造成的 CPU 飙升、以及 Atlassian Remote MCP 等真实第三方次连接失败问题，已多次重复出现在近期版本中，说明 MCP 子系统回归较严重，测试覆盖度亟待提高。
- **BYOK 短令牌体验欠佳**：当前 CLI 只在启动时一次性读取 Provider 凭证，无法在运行中刷新，对于使用短时 OAuth token（如 Entra ID）的实现不友好（#3682）。
- **内置 Agent 不遵循自定义指令**：即使 root README 或 AGENTS.md 写入了"使用 uv@python"，内置 `explore`、`task`、`code-review` 仍调用系统 python，导致行为与约定不符，降低可预测性（#1990）。

---

> 📌 **日常建议**：若你正在使用沙箱功能，建议先确认 CLI 版本号及是否受服务器策略影响；遇到 `.agent.md`/模型配置情况时，可直接引用 #2904 和 #2958 的讨论，看起来官方近期会考虑按 Agent 细粒度配置模型。另注意：最新版沙箱的 issue 与进度可关注 #4522 或 #4524 的后续重启状态。
>
> 数据截至 2026-08-19 00:00 UTC，来源：[github.com/github/copilot-cli](https://github.com/github/copilot-cli)。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-19

## 今日速览

- 过去 24 小时无新版本发布，社区讨论集中在两个方向：Web UI 在第三方 OpenAI-compatible 提供商场景下的渲染异常（#2607），以及 K3 模型 + Kimi Code CLI 在量化交易场景的实战评测（#2608）。
- 两条 PR 有重要更新：历时近 8 个月的 SSH 日志修复 PR #848 已于 8 月 18 日关闭；同日新开放的架构探索 PR #2606（knowledge plane）值得关注。
- 整体而言，今日社区更关注“真实场景使用质量”：第三方模型接入后的 UI 稳定性、以及量化研究等垂直场景的能力验证。

## 版本发布

过去 24 小时无新版本发布。

## 社区热点 Issues

> 注：今日更新/创建的 Issue 共 2 条，以下全部列出。

### 1. [Bug] Web UI 非 Kimi 提供商消息在重挂载后渲染异常 — #2607

- 作者：@chenxupeng1990-eng
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2607
- 创建/更新：2026-08-18 ｜ 评论：1

**摘要**

当会话使用自定义 OpenAI-compatible 提供商时，Web UI 中 assistant 消息在流式传输阶段渲染正常，但一旦发生页面重挂载（浏览器标签页切换后返回、页面刷新、或重新打开会话），消息会以“一次流式增量一行”的窄条形式重新渲染，而不是正常的整体消息布局。

**值得关注的原因**

这是 Web UI 适配非 Kimi 提供商时的一个典型前端状态恢复问题，影响面包括：

- 使用自定义 OpenAI API 兼容端点的开发者；
- Web UI 中消息缓存或 Fragment 状态在 remount 后无法正确合并组装。

**需注意：评论较少（1 条），但目前此 Bug 仍处于复现确认阶段。若你使用非 Kimi 提供商并遇到类似问题，可以前往该回帖补充案例。**

---

### 2. [社区分享] K3 + Kimi Code CLI 量化策略生成基准测试开源报告 — #2608

- 作者[@frank-quant](https://github.com/frank-quant)
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2608
- 创建/更新：2026-08-18 ｜ 评论：0

**背景**

作者是中文 AI 量化交易频道博主（Bilibili/YouTube），近期发布了两期视频，以 Kimi Code CLI 为主要开发工具：

- 第 1 期（7 月 26 日）：在 Freqtrade 上，用 K3 模型 + Kimi Code CLI 从零编写 ETH 永续合约策略，并施加严格约束条件。
- 第 2 期：对样本外数据运行量化策略，进行全流程验证。
- 作者已将完整基准测试报告开源，供社区查阅。

**值得关注**

该 Issue 并非 Bug 或功能请求，而是 UGC 生态中的**独立实测反馈**。它的意义在于：

- 体现 Kimi Code CLI 在真实金融工程场景中的任务执行能力；
- 提供了 K3 模型的公开样本外推理记录，属于可复现的评测；
- 对量化交易/数据分析类开发者具有较高参考价值。

---

## 重要 PR 进展

今日更新的 PR 共 2 条，其中 1 条已关闭，1 条为新增。

### 1. [已关闭] fix(kaos): 启用 SSH 日志 — #848

- 作者：@powerfooI
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/848
- 创建：2026-02-02 ｜ 更新：2026-08-18 ｜ 状态：CLOSED
- 评论数：未显示

**功能概要**：当启用 kaos（Kimi Agent Optimization System？/ 或 SSH 运维模块相关组件）时，为 SSH 连接失败补充输出日志逻辑，方便开发者定位连接异常。

**关注点**：该 PR 从 2 月创建至今已有近 8 个月，直到 8 月 18 日才关闭。关闭意味着已被仓库维护者处理或放弃；对于关注 SSH 远程部署/控制台调试的开发者，建议持续关注后续合并路径。

---

### 2. [新开放] Dev/knowledge plane — #2606

- **作者**：@SoMiReMiReDo
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2606
- 创建/更新：2026-08-18 ｜ 状态：OPEN
- 评论数：未显示

**摘要**：此 PR

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>



</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

### 1. 今日速览

今日社区焦点集中在**多会话协作与 Agent 团队**方向：`qqqys` 的 live-session registry 已合入 nightly，让 `qwen sessions ps` 成为现实；同时社区对 `run_in_background: false` 不生效、teammates 无法给 leader 发普通消息等问题的报告，表明多智能体路径正处于高频迭代期。此外，Qwen Autofix 的 review 流程在经历多轮“设计 - 反噬 - 再收敛”后，终于迎来了一批实质性的收敛/加固 PR。

### 2. 版本发布

过去24小时共发布 2 个版本，其中 `v0.21.11-nightly.20260818.259951c53e` 为重要功能更新：

**v0.21.11-nightly.20260818.259951c53e**
- **新功能**：添加 live-session registry 和 `qwen sessions ps` 命令，允许用户查看当前活跃会话列表，来自 PR #8969，为跨会话管理和日后 Agent 协作打好基础。
- **功能增强**：daemon 支持附加技能切换（skill-togg），但目前 Release Notes 只显示了部分内容，详情需看后续说明。
- **任务类型**: 除代码库自身的 nightly 外，`dsw-eas-tb-smoke-20260818-r2` 为发布端到端凭据刷新与沙箱恢复测试，均以 `SUCCEEDED` 通过。
- **异常标记**: `dsw-eas-full-20260818-r1/r2` 两个全量验证中 SWE-bench 500 用例被标记为 `QUARANTINED`（隔离），且期间出现 “swe-bench/swe-bench-v...” 这类截断的写入状态，说明大规模验证流水线仍有稳定性问题。

### 3. 社区热点 Issues

本期共筛选出 10 个最值得关注的 Issue，覆盖从 P1 崩溃类 bug 到长期功能 RFC，重点问题如下：

1. **[#9434 [P2/bug]**: `ask` returns from an Edit/WriteFile PreToolUse hook do not display diffs](https://github.com/QwenLM/qwen-code/issues/9434)
   社区用户 `PDXKimani` 在 `.heic` 文件路径过滤场景下，触及 Edit/WriteFile 钩子处理中 `ask` 返回后白屏不展示 diff 的严重影响。说明工具调用确认流在复杂用户体验前端仍存在缺口。

2. **[#9296 [P1/bug] Qwen Autofix: review-event storms and duplicate address dispatch waste runner capacity](https://github.com/QwenLM/qwen-code/issues/9296)**
   `wenshao` 根据 2026-08-16 的 500 次运行数据（59% 被取消）指出两个核心问题：合并/关闭的 PR 仍触发 autofix；重复地址 dispatch 导致跑力浪费，属于工程效率与自动化的典型“内耗”。

3. **[#9430 [P3/bug] Named teammates silently ignore `run_in_background: false`](https://github.com/QwenLM/qwen-code/issues/9430)**
   多 Agent 协作中，命名队友被显式置为 `run_in_background: false`（同步执行），但实际仍被并发启动。这是一个严重违反用户预期的行为，且无任何警告，社区反应积极。

4. **[#9431 [P3/doc] `list_agents` empty result is ambiguous while Agent Team teammates are active](https://github.com/QwenLM/qwen-code/issues/9431)**
   在 Agent Team 激活时，`list_agents` 返回“no background agents”，但实际上存在命名队友。工具返回信息与用户预期时刻的语义不一致，带来调试和运维的歧义。

5. **[#9276 [P2/bug] Team members cannot send ordinary messages to their leader](https://github.com/QwenLM/qwen-code/issues/9276)**
   团队内普通完成/状态消息无法发送给 leader，反而被库解释为关停请求并报错 “Only the team leader can request shutdowns”。这挫伤多智能体协作的基本沟通能力。

6. **[#9291 [P2/bug] Unsupported image MIME can abort a Responses-compatible session](https://github.com/QwenLM/qwen-code/issues/9291)**
   用户尝试 `image/heic` 附加类型时，引致 Responses 兼容端点直接中断，问题涉及消息，属于端到端兼容性问题（列强优先级）。

7. **[#8718 [RFC] Native coordination for independent Qwen sessions](https://github.com/QwenLM/qwen-code/issues/8718)**
   该 RFC 在第 10 条评论后已关闭， 结果是转向当天合并的 `sessions ps` 与即将落地的跨会话 Messaging 方向，影响力极其大。

8. **[#7040 [RFC] Reliable auto-memory recall — timing, quality, and telemetry](https://github.com/QwenLM/qwen-code/issues/7040)**
   自动记忆召回基础工程技术已进入收尾，PR 1 已合并，PR 2 正在 review。说明团队在上下文性能优化上持续投入。

9. **[#8400 [P1/bug] Desktop 0.0.5/Windows sessions silently auto-deleted after app restart when ACP session/load fails](https://github.com/QwenLM/qwen-code/issues/8400)**
   Windows 用户因工作区 cwd 不匹配导致所有会话在重启后静默消失，这是一个致命的桌面端数据安全 bug，高度受社区用户关注。

10. **[#9194 [P3/chore] chore(review): close the mutation-verified test-pin gaps from PR #9096 review rounds 5-6](https://github.com/QwenLM/qwen-code/issues/9194)**
   属于自动化 review 的元层级问题，却反映了真实测试质量问题：测试没有提供面向契约的“自变异验证”，治理管理成本高昂。

### 4. 重要 PR 进展

此期共上线 10 个核心 PR，功能上覆盖命令行、多智能体、服务端三个领域：

1. **[#9402 [feat] Agent Board — 共享不同启动 Agent 的工作](https://github.com/QwenLM/qwen-code/pull/9402)**
   这是多 Agent 协作方向一个重要的新功能。它允许不同时间启动的 Agent 之间共享任务与上下文，解决了 `run_in_background` 等旧问题所留在协作上的思维断点。

2. **[#9396 [feat] live-state session activity watermark](https://github.com/QwenLM/qwen-code/pull/9396)**
   为 `qwen serve` 提供会话活动水印，支持更精细的服务端状态管理，提升 `sessions ps` 命令的实时性。

3. **[#9442 [fix] isolate image payload eviction state](https://github.com/QwenLM/qwen-code/pull/9423)**
   修复图像载荷自动回收策略在持久化历史与 fork 快照间不一致的问题，保障了在新的携图交互与多智能体场景下的数据一致性。

4. **[#9436 [fix] Treat duplicate provider tool-call ids as replays only when arguments match](https://github.com/QwenLM/qwen-code/pull/9436)**
   提高工具调用的可重试安全性。现在只有 ID 和参数都吻合时才对重复操作进行重放，防止因 ID 冲突而产生误判/死循环。

5. **[#9435 [fix] Surface the daemon duplicate tool-call breaker as visible loop-detected stop](https://github.com/QwenLM/qwen-code/pull/9435)**
   将内部收敛性的 `重复工具调用中断` 升级为常规性的“检测到循环并终止”操作，最终提高多 Agent 运行的稳定性与可观测性。

6. **[#8966 [fix] accept output.format “stream-json” in the settings schema](https://github.com/QwenLM/qwen-code/pull/8966)**
   顺手修复了一个 CLI 与设置 Schema 不一致的漏洞，属开发者体验改善，得到社区点赞。

7. **[#9221 [fix(review)] run verifier probes in private scratch worktree (#9207)](https://github.com/QwenLM/qwen-code/pull/9221)**
   针对审阅流水线的一个关键安全修复，进行探针时使用私有工作区而不再污染共享目录。是 Qwen Autopix 整个线上可靠性进一步提升的基石。

8. **[#9327 [refactor(ci)] simplify the review checkout self-heal back to wipe-and-retry](https://github.com/QwenLM/qwen-code/pull/9327)**
   针对打磨 8 轮、传了多层的审查自愈逻辑进行精简，将其从约 60 行减少至核心逻辑，降低维护与调试成本。

9. **[#9386 [fix(ci)] Post autofix failure-handoff comments bilingually](https://github.com/QwenLM/qwen-code/pull/9386)**
   让失败交接信息变为双语发布（英文 + 中文折叠块），提示全局性的交付体验提升。

10. **[#9331 [fix(cli)] 防止 /rewind 在 /compress-fast 后丢失会话历史](https://github.com/QwenLM/qwen-code/pull/9331)**
   处理了 CLI 中的一个隐晦但危险的问题：在单纯的内存压缩（`/compress-fast`）后，`/rewind` 可能错误地删除历史记录。此 PR 补上了这一数据完整性的缺口。

### 5. 功能需求趋势

- **多 Agent 协作与消息机制**：围绕“Agent 之间如何互相发现、传消息-分派任务、同步与异步边界”的议题在本周集中爆发。继 `team` 概念落地后，`#9276`（团队成员给 leader 发消息）、`#8724`（跨 Session 消息）和 `#9430`（运行后台同步）共同指出了当前实现的致命弱点；而 `live-session registry` 正是为这些场景提供基础的设施。
- **会话作为一等公民**：连 Session 管理已经被明显聚焦。`qwen sessions ps` 的出现以及多触发器（`#9396` `#9423`）对会话稳定性的尝试，解释了长期用户希望将重联/告警/回放策略化、事务化，甚至跨应用，萌芽出数据安全问题。
- **跨平台/跨端一致性（Web-shell、桌面、CLI）**：Web-shell 成为跨平台 UI 的中间抽象层，如 `WebShell`、`VSCode`、`Desktop` 都采用同一套 UI Schema（Goal v3、 artifact），用户对一致性的要求持续升温。
- **模型连接与提示型**：当前列表“从静态释放时间列表”转向“运行时**主动探测**模型列表”（`#9389`），体现平台支持更智能、自适应的模型配置。
- **知识、记忆与工具防错**：自动记忆召回（`#7040`）、Compress 与 Rewind（`#9331`）成为维护上下文流程的重要议题，且用户认可设置而非提示的零散方案。

### 6. 开发者关注点

**频繁反馈的痛点：**

- **“行为与默写不一”**：多个 Issue 集中于“声明的 flag 处理”和“实际语义不符”问题（如 `run_in_background: false` 无效、`list_agents` 不返回），说明 Agent 工具文档与实现差距较大，开发者更期待“错误就报错”。
- **Windows / 序列化问题的系统性问题**：直接指向“Windows 全量/文件名”问题的高频出现（如重命名错误、恢复会话重启），以及 Desktop 端对话数据丢失的严重级 bug，应成为 P0 修复对象。
- **内容修改可见性留存**：从 `/export` 的 thinking 展示缺陷到 `ask` 返回时不显示 diff，开发者在 Navigate（人工/自动）层面观感较差，期望工具自带的可交互性/可理解决策闭环。
- **自动化流水线的效率与稳定性**：Qwen 自研的 CI review 机制经历高损耗（59% cancelled、多轮 review 循环）；优化空间仍然巨大。可以看到 QwenLM 团队已自研 `autofix`、`review` 等系统性方案，但还处于“出鞘之剑”阶段，用户在各类自动评审的繁杂与僵化中仍有较大反馈。
- **误触发与数据的退出**：API 触发兼容性问题（HTTP400 / 400 与大模型回调）依然存在，尤其是关于 token 上下文与压缩之间的“软墙”，非常影响经常处理大型代码库用户。

---

*以上为 2026-08-19 的 Qwen Code 社区动态日报。* 本期数据源聚焦于 `github.com/QwenLM/qwen-code`，涵盖了多智能体协作、稳定、审查自动化三大核心主线的进展与矛盾。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*