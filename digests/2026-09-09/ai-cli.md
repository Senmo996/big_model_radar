# AI CLI 工具社区动态日报 2026-09-09

> 生成时间: 2026-09-09 02:01 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告

**日期：2026-09-09 | 数据源：各工具 GitHub 公开仓库**

---

## 1. 生态全景

当前 AI CLI 工具已从"单点代码生成"演进为**完整开发工作流平台**，核心竞争围绕会话管理、MCP 生态、沙箱安全与可扩展性展开。头部工具（Claude Code、Codex、Gemini CLI）保持高频发版节奏，但**稳定性回归与数据可用性问题**正成为社区最敏感的神经；Qwen Code 通过 ACP 协议探索跨 Agent 互操作，OpenCode 则以架构重构应对多会话性能瓶颈；整体行业处于"功能快速扩张"与"稳定性承压"并存的阵痛期。

---

## 2. 各工具活跃度对比

| 工具 | Issues 更新量¹ | PR 进展 | 版本发布 | 社区热度信号 |
|------|--------------|---------|---------|-------------|
| **Claude Code** | 50 条 | 1 个（stale 策略调整） | v2.1.265、v2.1.266 | 最高赞 Issue 86 👍，评论峰值 147 |
| **OpenAI Codex** | 未披露总量 | 多条（bot 驱动重构） | 2 个 Rust alpha | 最高赞 Issue 46 👍，评论峰值 89 |
| **Gemini CLI** | 10 条（Top 10） | 11 个（含 5 个已关闭） | 3 个版本（nightly/preview/stable） | 多为 maintainer-only 锁定讨论 |
| **GitHub Copilot CLI** | 44 条 | 4 个（2 个合并） | v1.0.84-2、v1.0.84-3 | 最高赞 Issue 76 👍（Vim 模式，已关闭） |
| **Kimi Code CLI** | 0 条更新 | 1 个（编码安全修复） | 无 | 整体静默，聚焦单点 PR |
| **OpenCode** | 50 条 | 10+ 个（架构重构密集） | 未披露 | 最高赞 Issue 110 👍（Memory Megathread） |
| **Qwen Code** | 10 条（Top 10） | 9 个 | 4 个（含 2 个 SDK 版本） | 多个 P1 级 Windows 稳定性问题 |

> ¹ Claude Code、Copilot CLI、OpenCode 为过去 24h 更新总量；Gemini、Qwen 为 Top 10 筛选量；Codex 数据受限。

**版本节奏**：Claude Code 与 Gemini CLI 保持「日更/nightly」级迭代；Qwen Code 昨日连发 4 个版本（含 SDK）；Copilot CLI 以稳健小版本推进；Kimi 处于静默期。

---

## 3. 共同关注的功能方向

### 3.1 会话生命周期管理（5/7 工具涉及）
| 工具 | 具体诉求 |
|------|---------|
| Claude Code | 压缩/清空后无法回顾历史（#27242，85 👍） |
| Copilot CLI | 长时间会话恢复内存溢出（#4664）、FileWatch 失控（#4612） |
| OpenCode | 归档会话无法恢复（#24153）、会话标题生成失效（#7262） |
| Gemini CLI | Shell 执行卡死 "Waiting input"（#25166） |
| Codex | TUI 多 Agent 统一视图（#22321，46 👍） |

### 3.2 MCP 生态治理（4/7 工具涉及）
- **Copilot CLI**：MCP Profiles（#2235）、认证读取（#3772）、取消请求（#4759）
- **Gemini CLI**：RFC 9207 OAuth 合规（已修复）、128 工具上限（#24246）
- **Claude Code**：MCP 认证链路 403（#92215）、回调端口硬编码（#92968）
- **OpenCode**：MCP 流关闭阻塞扩展卸载

### 3.3 模态编辑与终端交互效率（3/7 工具涉及）
- **Copilot CLI**：Vim 模式今日正式开放（#13，76 👍，最具标志性）
- **Claude Code**：桌面状态栏需求（#41456，62 👍）
- **Codex**：TUI Agent View 管理并行会话

### 3.4 沙箱/网络代理兼容性（3/7 工具涉及）
- **Claude Code**：SOCKS5 认证致 SSH Git 失败（#70684）
- **Gemini CLI**：Seatbelt 环境认证崩溃（#29163）、沙箱文件系统强化（#29214）
- **Qwen Code**：Deny 模式权限误报致模型放弃工具（#11405）

### 3.5 模型与用量透明度（3/7 工具涉及）
- **Codex**：gpt-5.5 本地可见但请求 404（#26892，89 评论）、配额消耗异常（#41220）
- **OpenCode**：Bedrock 缓存 token 重复计算（#47296）
- **Claude Code**：modelPicker 漏行 opusplan（#89690）

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 |
|------|---------|---------|-------------|
| **Claude Code** | 深度可扩展的 Agent 平台 | 追求插件化、深度定制的中高级开发者 | 以 Function Hooks 提案（147 评论）为标志，走「内核 + Hook 生态」路线；Plugin 目录加载已落地 |
| **OpenAI Codex** | 原生模型能力与 API 深度集成 | OpenAI 生态重度用户 | Rust 原生高性能实现；重点在上游模型路由正确性与配额治理 |
| **Gemini CLI** | 稳健的企业级执行环境 | 关注安全合规的团队 | 高比例 maintainer-only issue 锁定，安全修复密集（Seatbelt、沙箱、OAuth）；AST 感知工具为前瞻方向 |
| **Copilot CLI** | 嵌入 GitHub 工作流的 Terminal 助手 | 已深度使用 GitHub Copilot 的开发者 | 产品功能保守但完成度高；Vim 模式是显著差异化体验，MCP 治理紧随社区生态演进 |
| **Kimi Code CLI** | 保守稳健的编辑工具 | 对数据安全敏感的用户 | 当前聚焦文件编码安全单点加固，功能迭代暂缓，属于「精修期」 |
| **OpenCode** | 开源高扩展性的开发者工具 | 喜欢自建/自托管工作流的开发者 | 架构重构激进（CLI 重组、桌面端插件化）；SSH 远程连接、DeepSeek Harness 后端等探索性强 |
| **Qwen Code** | 跨平台多 Agent 编排 | 国内生态 + 多模型混合用户 | 押注 ACP 协议互操作（委托给 Claude Code 等外部 Agent）；daemon 工作区理念独具一格 |

---

## 5. 社区热度与成熟度

### 社区活跃度梯队

| 梯队 | 工具 | 判断依据 |
|------|------|---------|
| **T1 高活跃** | Claude Code、OpenCode | 高赞/高评论议题密集，功能讨论深度大，但稳定性抱怨同步增多 |
| **T2 中高活跃** | Copilot CLI、Gemini CLI | Issue 总量大但结构分化（Copilot 以用户反馈为主，Gemini 以 maintainer 锁定讨论为主） |
| **T3 中活跃** | Qwen Code、Codex | Issue 聚焦度高（Qwen 集中在 Windows 稳定性，Codex 集中在上游模型链路） |
| **T4 低活跃** | Kimi Code | 24h 内零 Issue、零版本，仅 1 个 PR 支撑存在感 |

### 成熟度判断

- **快速迭代期**：**Claude Code**（双版本日更 + 生态方向探索）、**Gemini CLI**（nightly 高频 + 安全加固密集）、**OpenCode**（架构重构与性能优化并行）
- **稳健演进期**：**Copilot CLI**（小步快跑，产品化程度高）、**Qwen Code**（版本节奏快但平台碎片化问题待解）
- **上游依赖期**：**Codex**（模型 404、配额问题暴露对上游强依赖）、**Kimi**（等待修复合入，社区静默）

---

## 6. 值得关注的趋势信号

### 信号一：Agent 互操作协议（ACP）成为新竞争维度
Qwen Code 实现通过 ACP 将子代理 turn 委托给 Claude Code（PR #11003），标志着 **AI CLI 从单体工具走向异构 Agent 协同网络**。对开发者而言，未来可能不再需要"选边站"，而是按任务特性路由到不同 Agent。

### 信号二："AI 工具会损坏我的文件"成为安全底线话题
Kimi 的 StrReplaceFile 非 UTF-8 文件静默损坏（#2595）、Gemini 的 BOM 解码误判（#29155）、Claude Code 的 Artifact 正则崩溃（#92969）——三个独立生态同日暴露**编码/数据处理缺陷**。"宁可拒绝，不要破坏"正在成为社区共识的安全铁律。

### 信号三：Windows 平台体验成为差异化短板
Copilot CLI（会话创建限制 #4756）、Qwen Code（conhost.exe 泄漏 347 个进程）、OpenCode（sidecar V8 OOM）均在 Windows 遭遇高频问题。**Windows 开发者的 AI CLI 体验仍明显落后于 macOS/Linux**，这既是挑战也是工具建立口碑的机会窗口。

### 信号四：会话恢复能力 = 用户信任基石
六个工具中有五个不同程度涉及会话恢复问题（内存溢出、MCP 断连、历史不可回溯、FileWatch 失控）。**长会话的可靠恢复已成为重度用户评估工具的刚性指标**，直接影响工具能否嵌入核心工作流。

### 信号五：安全机制需要"可解释性"
Qwen Code 的 Deny 模式误报（#11405）、Claude Code 的安全过滤器误伤 Cyber/格式化工具（#92967）、Gemini 的 Auto Memory 后置脱敏（#26525）——**为安全而牺牲可用性正在引发反弹**。开发者普遍希望在受信场景下，安全护栏可透明、可解释、可绕过。

### 信号六：模型/配额透明度左右信任感
Codex 的 gpt-5.5 404 与配额异常 Meta 追踪（#41220）、OpenCode 的 Bedrock 缓存重复计费（#47296）——**用量统计不一致与模型路由不透明，直接削弱用户对付费工具的信任**。工具框架层统一处理各供应商 usage 语义将成为刚需。

---

*本报告基于 2026-09-09 各工具 GitHub 公开数据整理。数据源存在覆盖差异，对比部分基于当日可获得的最大信息量，仅供参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

## Claude Code Skills 社区热点报告（数据截止 2026-09-09）

> 说明：PR 数据表中评论数显示为 `undefined`，以下排序采用仓库原始“热门 Pull Requests”列表顺序；所有列出的 PR 当前均为 **Open** 状态。

---

### 1. 热门 Skills 排行（Top PR）

| Skill / PR | 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|
| [fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298) | 修复 skill-creator 评估套件 `run_eval.py` 的 0% 召回率误报，并修复 Windows 流读取、触发检测和并行 worker 问题。 | 关联 Issue #556 有 10+ 独立复现，是当前官方技能工具链最严重的可靠性缺陷；用户关心“评估结果是否可信”。 | Open |
| [Add document-typography skill](https://github.com/anthropics/skills/pull/514) | 为 AI 生成文档增加排版质检：孤词换行、孤立段落标题、编号错位等。 | 直击 Claude 生成文档的普遍痛点，用户希望文档达到出版级排版质量。 | Open |
| [Add scnet-hpc skill](https://github.com/anthropics/skills/pull/1615) | 通过 profile 化 SSH 和 Slurm 工作流操作 SCNet HPC 集群。 | 科研计算/HPC 场景需求，涉及分区、内存、模块、加速器和任务生成。 | Open |
| [fix(pdf): correct case-sensitive file references](https://github.com/anthropics/skills/pull/538) | 修复 SKILL.md 中 8 处 `REFERENCE.md` / `FORMS.md` 大小写引用错误。 | 在大小写敏感文件系统（Linux/macOS 默认）上会导致技能资源加载失败，属于基础可靠性修复。 | Open |
| [Add ODT skill](https://github.com/anthropics/skills/pull/486) | 支持 OpenDocument 文档创建、模板填充、ODT 转 HTML。 | 补全文档格式生态，用户需要 LibreOffice / ISO 标准格式支持。 | Open |
| [Improve frontend-design skill clarity and actionability](https://github.com/anthropics/skills/pull/210) | 重写 frontend-design 技能，使其更清晰、可操作、内部一致。 | 核心讨论是“技能不该像开发者文档，而应让 Claude 在单次会话中真正执行”。 | Open |
| [Add skill-quality-analyzer and skill-security-analyzer](https://github.com/anthropics/skills/pull/83) | 新增两个元技能：质量分析（结构/文档/示例/可复用性）和安全分析。 | 社区对技能质量评估和供应链安全的关注度上升，希望有官方标准。 | Open |
| [Add testing-patterns skill](https://github.com/anthropics/skills/pull/723) | 覆盖测试哲学、单元测试、React Testing Library 等全栈测试模式。 | 测试生成是社区长期需求，用户希望有系统化、可执行的测试指南。 | Open |

---

### 2. 社区需求趋势（来自 Issues）

- **安全与信任边界**：[Issue #492](https://github.com/anthropics/skills/issues/492)（43 评论）指出社区技能滥用 `anthropic/` 命名空间，形成信任边界攻击面。这是当前最受关注的问题。
- **组织级技能共享**：[Issue #228](https://github.com/anthropics/skills/issues/228)（16 评论）要求类似“组织技能库”或“分享链接”的能力，而非手动下载文件再上传。
- **评估与工具链可靠性**：[Issue #556](https://github.com/anthropics/skills/issues/556)、[#202](https://github.com/anthropics/skills/issues/202)、[#1390](https://github.com/anthropics/skills/issues/1390) 集中反映 skill-creator / mcp-builder 的 eval 脚本误报、Windows 兼容性和复杂环境失败问题。
- **上下文窗口控制**：[Issue #1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 技能单次注入约 156k tokens，直接挤爆上下文；社区希望技能更“轻”。
- **技能去重与插件体验**：[Issue #189](https://github.com/anthropics/skills/issues/189)（9 👍）指出 `document-skills` 和 `example-skills` 安装后内容重复，污染上下文。
- **Agent 治理与安全模式**：[Issue #412](https://github.com/anthropics/skills/issues/412) 提议 agent-governance 技能，覆盖策略执行、威胁检测、信任评分、审计追踪。
- **记忆压缩**：[Issue #1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 技能，用符号化表示取代散文式长期记忆，减少长任务上下文消耗。
- **企业接入与 MCP 化**：[Issue #1175](https://github.com/anthropics/skills/issues/1175) 关注 SharePoint Online 权限与上下文安全；[#16](https://github.com/anthropics/skills/issues/16) 则希望将 Skills 暴露为 MCP 协议接口。

---

### 3. 高潜力待合并 Skills

以下 PR 当前为 Open，但修复目标明确、实现完整，或已有大量复现反馈，近期落地概率较高：

- [fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298) — 直击官方工具链最大 bug，修复后价值高。
- [fix(pdf): correct case-sensitive file references](https://github.com/anthropics/skills/pull/538) — 小型确定性修复，合并成本低。
- [fix(docx): prevent tracked change w:id collision](https://github.com/anthropics/skills/pull/541) — 修复文档损坏类严重 bug，边界清晰。
- [fix(skill-creator): warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539) — 防止 YAML 静默解析错误，质量收益明确。
- [skill-creator: fix Windows subprocess + encoding bugs](https://github.com/anthropics/skills/pull/1050) / [skill-creator: fix run_eval.py crash on Windows](https://github.com/anthropics/skills/pull/1099) — 两个 Windows 1 行级修复，直接解决开发者在 Windows 下无法使用 skill-creator 的问题。
- [Add document-typography skill](https://github.com/anthropics/skills/pull/514) — 功能新颖且无依赖，社区价值直接。
- [Add ODT skill](https://github.com/anthropics/skills/pull/486) — 补全文档格式矩阵，属于明确能力扩展。
- [Add testing-patterns skill](https://github.com/anthropics/skills/pull/723) — 内容完整但体积较大，可能需要更长时间 review。

---

### 4. Skills 生态洞察

**社区在 Skills 层面最集中的诉求不是“更多新技能”，而是官方工具链的可靠性、安全分发和上下文可控性——即把 Skills 从“示例集合”变成可信任、可治理、可生产使用的系统级基础设施。**

---

## Claude Code 社区动态日报 — 2026-09-09

> 数据来源：github.com/anthropics/claude-code

---

### 1. 今日速览

- **v2.1.266 发布**，紧急修复 2.1.265 引入的 LLM-gateway/代理回归，`CLAUDE_CODE_USE_GATEWAY` 不再意外强制云网关登录；v2.1.265 则新增网关遥测字段并支持 `--plugin-dir` 加载插件文件夹。
- **社区热度最高的提案：Function Hooks**（#91870），以 147 条评论、86 👍 断层领先，开发者强烈期望通过 Hook 机制深度扩展 Claude Code。
- **多个高影响 Bug 集中爆发**：桌面端会话记录永久丢失（#92825）、沙箱 SOCKS5 代理破坏 SSH Git 操作（#70684）、GrowthBook 远程控制密钥失效（#92966）等，稳定性问题成为今日焦点。

---

### 2. 版本发布

#### v2.1.266（最新）
- **修复 2.1.265 回归**：`CLAUDE_CODE_USE_GATEWAY` 环境变量此前仅在同时设置 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_AUTH_TOKEN` 时生效，但 2.1.265 中该变量单独存在即会强制 Cloud-gateway 登录。此版本已恢复预期行为，影响所有 LLM-gateway 和代理部署用户。

#### v2.1.265
- **遥测增强**：通过 Claude apps 网关上报的遥测数据新增 `user.email` 和 `user.groups` 字段，与终端会话行为对齐（适用于 Claude Desktop 和 Cowork）。
- **`--plugin-dir` 支持插件文件夹**：可直接指向包含多个插件子文件夹的目录，每个含 manifest 的子文件夹均会被加载，并支持子文件夹的动态增删。

---

### 3. 社区热点 Issues（Top 10）

#### 🔥 最受关注

**#91870 — Function Hooks：让插件强大 10 倍**
- 作者：@poteat | 评论 147 | 👍 86 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/91870)
- 核心：提出通过带副作用追踪的 `$` 参数化对象和 Express/Koa 风格的 `next` 连续模型，实现对 Claude Code 的深层安全修改。社区讨论异常热烈，是当前最受期待的插件能力升级方向。
- 重要度：★★★★★

**#27242 — 压缩/清空后无任何 UI 机制可回顾既往上下文**
- 作者：@scapeshift-ojones | 评论 18 | 👍 85 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/27242)
- 核心：`transcript.jsonl` 中数据完整保留，但 TUI 在压缩、Plan 模式清空或分支切换后无法访问历史记录（Ctrl+O 无效等）。影响三个独立场景。高👍数反映大量用户深受其扰。
- 重要度：★★★★★

**#41456 — 请求为 Desktop App 增加状态栏**
- 作者：@Noah0025 | 评论 15 | 👍 62 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/41456)
- 核心：桌面应用缺少状态栏，导致用户无法直观感知模型、成本、工作目录等关键状态。属于高频 UI 功能需求。
- 重要度：★★★★☆

#### 🐛 高影响 Bug

**#70684 — 沙箱模式下 SOCKS5 代理因 BSD nc 无法认证，SSH Git 操作失败**
- 作者：@tylerodonnell | 评论 7 | 👍 24 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/70684)
- 核心：启用 `sandbox.enabled: true` 后，注入的 `GIT_SSH_COMMAND` 走 BSD nc，无法完成需要认证的 SOCKS5 代理协商，导致 macOS 上 SSH Git 操作全部失败。已标记 regression。
- 重要度：★★★★☆

**#92825 — Desktop 端会话记录永久不可用（cliSessionId 被置空，无本地恢复路径）**
- 作者：@mmalc | 评论 4 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/92825)
- 核心：桌面应用会话记录 `cliSessionId` 被置 null，本地无恢复路径。这是对 #79044 的跟进，属于数据丢失级别的严重问题。9月8日新提交，已获快速响应。
- 重要度：★★★★☆

**#92966 — 内置 GrowthBook clientKey 仍返回 400「Invalid API Key」，远程控制 Fail Closed**
- 作者：@achobgood | 评论 1 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/92966)
- 核心：#64151 被 stale-bot 关闭但从未修复，2.1.266 上仍复现。GrowthBook 密钥导致远程控制（Remote Control）功能降级。同日提交即被关注。
- 重要度：★★★★☆

#### 💡 值得关注

**#89690 — modelPicker 将 `opusplan` 标记为已覆盖，但选择器实际无 Opus Plan Mode 行**
- 作者：@urda | 评论 5 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/89690)
- 核心：模型选择器在 append 模式中跳过 `opusplan` 行，但内置阵容中并无对应的 Opus Plan Mode 行，导致该模式在普通会话中不可选。
- 重要度：★★★☆☆

**#91488 — Fable 5.1 无法访问：套餐内配额闲置但弹窗显示「不包含在套餐中」**
- 作者：@kel-mo | 评论 4 | 👍 5 | 状态：CLOSED
- [GitHub](https://github.com/anthropics/claude-code/issues/91488)
- 核心：Team 套餐用户选择 Fable 5.1 时收到误导性确认对话框并要求单独购买，但套餐实际包含 Fable 配额。对话中无任何肯定性操作可选。已关闭但反映计费/权限文案问题。
- 重要度：★★★☆☆

**#86829 — VS Code 扩展：非 ASCII 文件名链接点击后无反应**
- 作者：@delhiberry | 评论 4 | 👍 8 | 状态：OPEN
- [GitHub](https://github.com/anthropics/claude-code/issues/86829)
- 核心：Markdown 链接指向非 ASCII 文件名时，percent-encoded href 从未解码，点击无任何反馈。影响所有包含中文、日文、韩文等文件名的仓库。
- 重要度：★★★☆☆

**#92969 — 2.1.265 回归：Artifact 数据库工具 JSON-Schema 使用 `\p{...}` 转义，严格校验器全部拒绝**
- 作者：@bjornmage | 状态：OPEN（8小时前提交）
- [GitHub](https://github.com/anthropics/claude-code/issues/92969)
- 核心：内置 Artifact 数据库工具 input_schema 使用 Unicode 属性转义（`\p{...}`），不符合严格 JSON-Schema 正则标准的端点将返回 400「not a regex」。标记为 duplicate，但影响所有严格校验的网关用户。
- 重要度：★★★☆☆

---

### 4. 重要 PR 进展

过去 24 小时仅 **1 个 PR** 获得更新（数据源限制）：

**#63686 — Bump stale 与 autoclose 超时：14 天 → 90 天**
- 作者：@caseyWebb | 状态：CLOSED | 更新：2026-09-08
- [GitHub](https://github.com/anthropics/claude-code/pull/63686)
- 内容：将 `scripts/issue-lifecycle.ts` 中的 stale/autoclose 生命周期参数从 14 天放宽至 90 天，影响「标记 stale」与「stale 后自动关闭」两个节点。
- 影响：若合入，将显著减少 Issue 被机器人过早关闭的情况。考虑到 #64151、#92966 等因 stale-bot 关闭而未修复的案例，该 PR 的方向受到社区期待。目前状态为 CLOSED，具体是否合入需进一步确认。

---

### 5. 功能需求趋势

从全部 50 条 Issues 中提取社区最关注的功能方向：

| 方向 | 代表 Issues | 热度信号 |
|------|------------|---------|
| **插件 / Hook 深度可扩展性** | #91870 Function Hooks（147 评论） | 断层第一，开发者渴望突破现有插件限制 |
| **桌面应用体验完善** | #41456（状态栏）、#87723（项目按活跃度排序）、#92885（本地/远程执行模式可见化） | 3 个独立需求同日获更新，桌面端成新焦点 |
| **TUI 可用性与信息可追溯** | #27242（回顾压缩历史）、#91356（抑制更新通知） | 高👍，开发者重视会话控制权 |
| **沙箱 / 网络代理兼容性** | #70684（SOCKS5）、#92248（Policy check） | 沙箱模式仍存代理兼容性短板 |
| **模型 / 路由透明度** | #89690（modelPicker 漏行）、#92960（路由到次优模型） | 用户希望模型选择与路由行为可预期 |

---

### 6. 开发者关注点

**1. 回归频发，稳定性承压**
- 2.1.265 引入网关回归（已在 2.1.266 修复）
- Looming 新增回归：GrowthBook 密钥（#92966）、Artifact 工具 JSON-Schema 正则（#92969）、Desktop 文件树符号链接（#92292）
- 社区多次提及「stale-bot 关闭但从未修复」的 Issue 循环，开发者对修复质量与跟进速度不满。

**2. 数据可用性与会话历史**
- Desktop 端会话记录无法找回（#92825）
- TUI 无法回顾压缩/清空后的历史（#27242）
- 两者均属「数据存在但 UI 不提供路径」的模式，开发者认为这是设计缺陷。

**3. 沙箱与代理（macOS）**
- SOCKS5 认证 + BSD nc 导致 SSH Git 操作失败（#70684），影响远程仓库日常操作，被视为高优先级 regression。

**4. MCP / 认证链路的脆弱性**
- Claude Design MCP 始终 403，OAuth 流程失效（#92215）
- Desktop MCP OAuth 回调硬编码端口 53280（#92968）
- 认证链路错误文案误导（如建议不存在的 `/design-login` 命令），反映 MCP 生态成熟度有待提升。

**5. 权限与安全护栏的误报**
- 沙箱允许规则被推断性绕开（#92947，Windows 上模型从一般性语句推断出对禁止文件夹的操作权限）
- 安全过滤器误报阻断 IPv6 配置工具（#92967）、Cyber 误报阻断合法工作（#85434/#85444）
- 开发者希望安全机制更透明、可解释、可绕过（对受信任务）。

---

*本日报基于 2026-09-09 GitHub 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-09）

## 今日速览

今日 Codex 发布 2 个 Rust alpha 版本；社区最热议题为 [#26892](https://github.com/openai/codex/issues/26892)：gpt-5.5 在本地元数据可见但真实请求 404，已达 89 条评论。PR 侧由 copyberry[bot] 提交了大量 app-server 生命周期治理与状态层重构，同时 TUI Agent View（46 👍）与任务调度（38 👍）功能需求呼声最高。

## 版本发布

- [rust-v0.154.0-alpha.8](https://github.com/openai/codex/releases)：Release 0.154.0-alpha.8
- [rust-v0.154.0-alpha.7](https://github.com/openai/codex/releases)：Release 0.154.0-alpha.7

两个 alpha 版本连续发布，但 Release 页面暂未提供详细变更说明，建议关注后续 release notes。

## 社区热点 Issues

1. **[#26892] gpt-5.5 本地可见但请求 404（CLOSED）**
   [链接](https://github.com/openai/codex/issues/26892)  
   作者在 6 月报告 gpt-5.5 在 Desktop 与 CLI 中均显示可用，但请求 Codex responses 端点时返回 404，gpt-5.4 正常。89 条评论、31 👍，是近期社区影响面最大的模型可用性问题。

2. **[#41220] Codex 配额/用量异常消耗 Meta 追踪（OPEN）**
   [链接](https://github.com/openai/codex/issues/41220)  
   Meta 议题，汇总多条关于订阅配额或购买 credits 消耗速度远高于本地 token 证据的报告，26 条评论、12 👍，显示付费用户对用量计费透明度的普遍焦虑。

3. **[#22321] TUI 增加多 Agent 管理视图（CLOSED）**
   [链接](https://github.com/openai/codex/issues/22321)  
   社区希望 CLI/TUI 提供 Agent View，统一管理多个并行/历史 agent 会话。46 👍 为今日 Issue 最高，虽已关闭但代表 TUI 多代理工作流的核心诉求。

4. **[#42215] Windows ChatGPT Work 项目上下文同步反复失败（OPEN）**
   [链接](https://github.com/openai/codex/issues/42215)  
   Windows 11 桌面端在已有 ChatGPT 项目中无法开启新的本地 Work 聊天，23 个源文件的项目在文件系统阶段同步失败，24 条评论。

5. **[#42501] Windows App 26.901.1978.0 启动失败（OPEN）**
   [链接](https://github.com

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 —— 2026-09-09

## 今日速览

今日发布 **v0.61.0-nightly.20260909** 与 **v0.60.0-preview.0**，重点修复了 NTFS 短文件名路径问题、沙箱容器设置目录隔离，以及 MCP OAuth 流程的 RFC 9207 合规性。社区讨论热度集中在 **Auto Memory 行为缺陷**（多篇由 @SandyTao520 提交）、**Subagent 中断被误报为 GOAL 成功**，以及 **Shell 执行卡在 "Waiting input"** 三个方向；同时若干安全类修复 PR（如 #29067、#29163）正在推进中。


## 版本发布

### v0.61.0-nightly.20260909.ged2ac40df（nightly）
- **fix(core)**: 缓解 NTFS 8.3 短文件名（SFN）路径问题 — @urielefrenvirtusa（#29116）
- **fix(cli)**: 在沙箱容器中隔离 settings 目录 — @jvargassanchez-dot（#29216）
- 另有多个未完全展示的 core 修复

### v0.60.0-preview.0
- **fix(core)**: 改进 web fetch 工具中的目标验证与连接路由 — @diegogodinezr（#29120）
- **fix(core)**: 在 MCP OAuth 流程中强制执行 RFC 9207 发行方标识 — @jvargassanchez-dot

### v0.59.0（正式版）
- 包含 v0.58.0-preview.0 的变更日志及版本号提升（#29082、#29083），具体修复内容需查看完整 changelog

> 注意：以上版本更新内容基于截断数据显示，部分修复条目未完整展示。


## 社区热点 Issues（Top 10）

### 1. Subagent 恢复被误报为 GOAL 成功，隐藏了中断事实
**#22323** · [OPEN] · priority/p1 · area/agent · 评论 13 · 👍 2 · 🔒 maintainer only
`codebase_investigator` 子代理在其结果明确显示已达最大轮次限制、未做任何分析的情况下，仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，误导主代理做出错误决策。社区关注度高。
https://github.com/google-gemini/gemini-cli/issues/22323

### 2. Shell 命令执行完成后卡在 "Waiting input"
**#25166** · [OPEN] · priority/p1 · area/core · 评论 4 · 👍 3 · 🔒 maintainer only
极简单的 shell 命令执行完毕后，CLI 仍显示命令处于活动状态并 "Awaiting user input"，导致任务挂起。多位用户反馈复现。
https://github.com/google-gemini/gemini-cli/issues/25166

### 3. 登录失败：授权码交换请求 oauth2.googleapis.com 失败
**#26171** · [OPEN] · priority/p1 · area/core · 评论 5
组织账号和个人账号均无法登录，提示 `Failed to exchange authorization code for tokens`，影响用户正常使用。
https://github.com/google-gemini/gemini-cli/issues/26171

### 4. 高并发 Shell 执行导致 "Too many open files" 与 forkpty(3) 失败
**#26384** · [CLOSED] · priority/p1 · area/core · 评论 7
大规模工作区中配置多个 profile 目录时触发 Exit Code 126，后续命令全部失败。已关闭，修复情况可追踪关联 PR。
https://github.com/google-gemini/gemini-cli/issues/26384

### 5. 评估 AST-aware 文件读取、搜索与代码库映射的价值
**#22745** · [OPEN] · priority/p2 · area/agent · 评论 7 · 👍 1 · 🔒 maintainer only
EPIC 级追踪：AST 感知工具可更精确读取方法边界、减少 token 噪声、提升导航效率。社区有搜索与映射方向的延伸（#22746）。
https://github.com/google-gemini/gemini-cli/issues/22745

### 6. Gemini 不会主动使用自定义 skills 和 sub-agents
**#21968** · [OPEN] · priority/p2 · area/agent · 评论 6 · 🔒 maintainer only
用户反馈即使已配置 "gradle"、"git" 等 skill，模型在相关场景下也不会自动调用，必须显式指示才使用。
https://github.com/google-gemini/gemini-cli/issues/21968

### 7. Auto Memory 缺少确定性脱敏，且在模型上下文之后才进行 redaction
**#26525** · [OPEN] · priority/p2 · area/security · 评论 5 · 🔒 maintainer only
Auto Memory 将本地 transcript 发送给模型后再提示脱敏，密钥在进入模型上下文之前未做处理；同时服务可能记录现有 skill 内容，存在隐私风险。
https://github.com/google-gemini/gemini-cli/issues/26525

### 8. 超过 128 个工具时遭遇 400 错误
**#24246** · [OPEN] · priority/p2 · area/agent · 评论 3 · 🔒 maintainer only
工具数量超过上限后 API 返回 400。社区期望模型能更智能地按需裁剪工具范围而非直接失败。
https://github.com/google-gemini/gemini-cli/issues/24246

### 9. Antigravity IDE 硬编码 MCP 工具上限（100）与配置碎片化
**#26678** · [OPEN] · priority/p2 · area/extensions · 评论 4
IDE 内置 100 个 MCP 工具上限与 Gemini CLI 配置不互通，导致工具集不一致的 DX 问题。
https://github.com/google-gemini/gemini-cli/issues/26678

### 10. Browser 子代理在 Wayland 下失败
**#21983** · [OPEN] · priority/p1 · area/agent · 评论 4 · 👍 1 · 🔒 maintainer only
浏览器子代理在 Wayland 环境中无法正常工作，影响依赖浏览器自动化的任务流程。
https://github.com/google-gemini/gemini-cli/issues/21983


## 重要 PR 进展（Top 10）

### 1. fix(a2a-server): 移除误导性安全方案与硬编码凭据
**#29067** · [CLOSED] · size/s · @CheesyWannabe
删除 `coderAgentCard` 中不真实的 securitySchemes，并从 `customUserBuilder` 中移除硬编码的不安全凭据，使本地开发端点元数据与实际认证状态一致。
https://github.com/google-gemini/gemini-cli/pull/29067

### 2. fix(core): 在 BaseLlmClient 中将 abortSignal 转发至 retryWithBackoff
**#29089** · [CLOSED] · size/s · @chelsealong
`generateContent/generateJson` 已接收 abortSignal，但未传递给重试逻辑，导致取消操作无法中断正在进行的重试。此修复补齐了信号链路。
https://github.com/google-gemini/gemini-cli/pull/29089

### 3. fix(vscode-ide-companion): 修复 MCP 流打开时 stop() 无法 resolve
**#29088** · [CLOSED] · size/m · @chiruu12
`IdeServer.stop()` 因 MCP 长连接未排空而永远不 resolve，导致扩展 deactivate 被阻塞。Fixes #28785。
https://github.com/google-gemini/gemini-cli/pull/29088

### 4. fix(cli): 防止并发扩展安装竞态
**#29087** · [CLOSED] · size/l · @nnetraga97
两个 Gemini CLI 进程同时安装/更新同一扩展时可能交错写入文件，现使用 `proper-lockfile` 实现互斥。
https://github.com/google-gemini/gemini-cli/pull/29087

### 5. fix(core): Plan Mode 在非交互会话中不再等待用户反馈
**#29063** · [CLOSED] · size/m · @chelsealong
`gemini -p "..." -y` 等非交互场景下，Plan Mode 指示代理等待永远不会到达的用户输入导致挂起。Fixes #28913、#26004。
https://github.com/google-gemini/gemini-cli/pull/29063

### 6. fix(cli): 防止 Git 仓库内 macOS Seatbelt 环境下认证崩溃
**#29163** · [OPEN] · priority/p1 · size/l · @ehsan-fj
启动时挂载 `useGitBranchName` 钩子读取 .git 目录，在受限权限环境（Seatbelt）下导致崩溃，此 PR 增加防护。
https://github.com/google-gemini/gemini-cli/pull/29163

### 7. fix(core): 停止在 Shell 执行中清空用户 Git 配置
**#29156** · [OPEN] · size/m · @HoneyTyagii
`ShellExecutionService` 曾将 `GIT_CONFIG_GLOBAL/SYSTEM` 指向 `/dev/null`，导致 shell 工具中 `user.name` 等配置丢失，现改为保留用户真实 Git 配置。
https://github.com/google-gemini/gemini-cli/pull/29156

### 8. fix(core): 正确解码 BOM 编码内容（isEmpty 检测）
**#29155** · [OPEN] · size/m · @HoneyTyagii
UTF-16/UTF-32 编码的空白 plan 文件因按 UTF-8 解码为 NUL 字符而被误判为非空，现按 BOM 实际编码解码。
https://github.com/google-gemini/gemini-cli/pull/29155

### 9. fix(core): Skill 优先级与激活状态大小写不敏感处理
**#29151** · [OPEN] · priority/p1 · size/m · @Aditya2584
`SkillManager` 中 skill 名称大小写不一致时，workspace 覆盖内置/扩展 skill 的优先级映射失效，现改为大小写不敏感匹配。
https://github.com/google-gemini/gemini-cli/pull/29151

### 10. fix(sandbox): 强化文件系统边界并隔离运行时状态
**#29214** · [OPEN] · size/l · @diegogodinezr
用经消毒的配置文件替代主机目录挂载，统一 realpath 解析，收缩沙箱逃逸面。
https://github.com/google-gemini/gemini-cli/pull/29214

### 11. fix(core): 保留显式版本化 Flash 模型 ID
**#29252** · [CLOSED] · priority/p1 · size/m · @SandyTao520
不再将显式版本化 Flash 模型 ID 静默映射到 Gemini 3.5 Flash 默认版本，保持 `--model` 钉扎准确，让 API 返回诚实错误。
https://github.com/google-gemini/gemini-cli/pull/29252


## 功能需求趋势

- **AST 感知代码分析**（#22745、#22746）：社区期望通过 AST 精确读取方法边界、提升搜索与代码库映射效率，减少 token 浪费和误读。
- **Auto Memory 可靠性**（#26525、#26522、#26523、#26516）：多篇 issue 指向需要确定性脱敏（先脱敏再入上下文）、避免对低信号会话无限重试、隔离无效 patch，以及减少自动记忆的过度日志。
- **MCP 生态与安全**（#27983、#24246、#26678）：包括统一 `wrapUntrusted()` 处理、突破 128/100 工具数量限制，以及 OAuth 流程的 RFC 合规（已在 preview 中修复）。
- **Sandbox 与权限边界**（

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-09

## 今日速览

今日发布 v1.0.84-2 与 v1.0.84-3 两个版本：Vim 模态编辑正式全面开放，MCP 会话启动可靠性提升。社区层面，Windows 端会话创建限制（#4756）、桌面应用 Local 会话冲突（#4742）以及会话恢复时的内存溢出（#4664）成为讨论热度最高的几个问题；同时 MCP 生态的认证、取消机制与 Profile 管理呼声渐涨。

## 版本发布

过去 24 小时内发布了两个小版本：

- **v1.0.84-3** — 修复：
  - `/copy` 现在会包含任务完成消息（task completion messages）
  - OAuth 认证的 MCP 服务器可在会话启动阶段稳定连接

- **v1.0.84-2** — 新功能与改进：
  - **Vim 模式向所有用户开放**：在 composer 中输入 `/vim` 或将 `editorMode` 设为 `vim`，启用模态编辑，输入时可显示当前模式
  - 在受支持的 Windows 沙箱策略下，交互式 shell 命令现在会记录被阻止的访问行为

## 社区热点 Issues（10 个）

过去 24 小时内更新/创建了 44 条 Issue，以下为最值得关注的 10 条：

### 1. #13 — CLI 输入应有 vi/vim 输入模式（✅ 已关闭）
👍 76 | 💬 11 | 作者：@RyanHecht
**链接**：https://github.com/github/copilot-cli/issues/13
作为社区呼声最高的功能请求之一（76 个 👍），该 Issue 在今日随 v1.0.84-2 的 Vim 模式发布而关闭。CLI 交互区此前仅支持默认的行编辑，键盘驱动的模态编辑是 Vi/Vim 用户长期以来的核心痛点。

### 2. #4756 — Windows 上创建新 Local 会话前必须归档所有空闲会话
👍 19 | 💬 6 | 作者：@TomHarveyBCM
**链接**：https://github.com/github/copilot-cli/issues/4756
Windows 桌面应用（CLI 1.0.83-5）中，新建会话会因“该项目的某个旧/空闲会话仍处于活动状态”而被拒绝，必须手动归档才能继续。19 个 👍 表明这是 Windows 用户普遍遭遇的阻碍性缺陷。

### 3. #4742 — 桌面应用 1.1.15：存在活动 Local 会话时无法创建第二个
👍 5 | 💬 10 | 作者：@DannyBe99
**链接**：https://github.com/github/copilot-cli/issues/4742
应用升级至 1.1.15 后，同项目内一旦有 Local（分支型）会话正在运行，创建第二个会话即报错 `invalid argument: This project already has an active Local workspace`。属于回归性缺陷，影响多任务开发者。

### 4. #4664 — 恢复长会话时 JavaScript 堆内存溢出崩溃
👍 2 | 💬 7 | 作者：@shrijitnair
**链接**：https://github.com/github/copilot-cli/issues/4664
恢复长时间运行的会话时，V8 堆内存被撑爆，进程在会话内容加载阶段即崩溃。对于依赖长期会话的开发者影响严重，且目前没有可用的降级途径。

### 5. #4612 — FileWatch 事件循环失控：TUI 冻结、调试日志膨胀至 13GB
👍 1 | 💬 9 | 作者：@tdihp
**链接**：https://github.com/github/copilot-cli/issues/4612
长时间运行/恢复的会话可能进入高频空转循环，不断输出 `No connection accepted a host event {"kind":"FileWatch"}`，最终终端 UI 无响应，调试日志膨胀。该问题对资源消耗的破坏力极强。

### 6. #2861 — `/compact` 压缩失败：模型连续返回空响应
👍 4 | 💬 6 | 作者：@ronkeele
**链接**：https://github.com/github/copilot-cli/issues/2861
未满 30 轮的短会话在 Opus 4.6 上手动 `/compact` 时连续 3 次失败，报 `received empty response from model`。压缩功能对长会话至关重要，多模型下的兼容性仍需加强。

### 7. #2943 — OpenRouter 集成请求
👍 14 | 💬 3 | 作者：@asule90
**链接**：https://github.com/github/copilot-cli/issues/2943
社区希望支持配置 OpenRouter API 并选用其模型。作者提到在 Claude Code 中使用 OpenRouter 时遇到 Token 消耗卡顿问题，认为 Copilot CLI 应原生支持这一能力。14 个 👍 说明三方模型服务接入是明确需求。

### 8. #4753 — v1.0.83：会话恢复中断 MCP 服务器连接（超时从 16s 骤降至 1s）
👍 1 | 💬 3 | 作者：@indeherb
**链接**：https://github.com/github/copilot-cli/issues/4753
恢复会话时的前台交接过程会取消仍在初始化中的 stdio MCP 连接，导致这些 MCP 服务器在整个会话中静默不可用。v1.0.82 中的 16 秒超时在 v1.0.83 中被缩短至约 1 秒，是一个明显的回归。

### 9. #4505 — 恢复的会话保留过期连接项 ID，导致所有提示词报错
👍 3 | 💬 3 | 作者：@Adamkadaban
**链接**：https://github.com/github/copilot-cli/issues/4505
会话恢复后，每次请求均失败并报 `400 input item ID does not belong to this connection`，且重试和 `/fork` 均无法恢复。这是一个阻断性错误，与 WebSocket 传输层可能相关（参见 PR #4770）。

### 10. #1724 — 向用户展示当前 TODO 状态
👍 11 | 💬 1 | 作者：@PabloZaiden
**链接**：https://github.com/github/copilot-cli/issues/1724
Agent 在内部维护 TODO 列表但从不向用户展示，社区希望像 opencode 一样通过侧边栏等方式呈现当前任务进度。11 个 👍 表明对 Agent 执行过程透明化的强烈需求。

## 重要 PR 进展（4 条）

过去 24 小时内共 4 条 PR，全部列出：

### 1. #4770 — 文档化 WebSocket 响应退出选项（🟢 开放）
作者：@1fanwang | 创建：2026-09-08
**链接**：https://github.com/github/copilot-cli/pull/4770
当模型宣传支持 WebSocket 响应端点时，CLI 会默认使用该传输方式；若网络屏蔽 WebSocket 或出现 `400 input item ID does not belong to this connection`（详见 Issue #4505），应提供并文档化关闭该行为的逃生通道。

### 2. #4762 — 安装脚本：报告不支持的 OS（✅ 已合并关闭）
作者：@devm33 | 创建：2026-09-08
**链接**：https://github.com/github/copilot-cli/pull/4762
修复 FreeBSD 下 `install.sh` 误报“检测到 Windows 但未找到 winget”的问题。此前除 macOS/Linux 外一律落入 Windows 分支，现改为明确报告“当前系统不受支持”。

### 3. #4761 — 安装脚本：报告不支持的 OS（✅ 已合并关闭）
作者：@1fanwang | 创建：2026-09-08
**链接**：https://github.com/github/copilot-cli/pull/4761
与 #4762 为同一问题的并行修复，采用不同的匹配策略来识别操作系统并给出明确的“不支持”提示，而非错误地推测为 Windows。

### 4. #4100 — shangti0168（⚠️ 已关闭）
作者：@huangyoufeng76-debug | 创建：2026-07-12 | 更新：2026-09-08
**链接**：https://github.com/github/copilot-cli/pull/4100
该 PR 标题与摘要为无关内容（疑似垃圾/误操作），已被维护者关闭，社区可忽略。

## 功能需求趋势

从全部 44 条 Issue 中提炼，社区最关注的五大方向如下：

1. **MCP 生态完善** — 出现多个相关请求：MCP Profiles（按场景加载不同服务器集合，#2235）、MCP 注册表的认证读取（企业场景下无需匿名暴露，#3772）、发送 MCP 取消请求（#4759）。MCP 正从“可用”迈向“可治理、可组合”。
2. **模态编辑与输入效率** — Vim 模式的开放（#13）验证了硬核终端用户对键盘驱动编辑的偏好；后续仍存在对多模式提示、输入键位自定义等的延伸需求。
3. **会话恢复与长期运行稳定性** — 大量 Issue（#4664、#4612、#4505、#4755）集中在长会话的恢复、资源占用和状态一致性上，这是重度用户的核心工作流依赖。
4. **更多模型/服务接入** — OpenRouter 集成请求（#2943）表明用户希望突破内置模型限制，接入更多第三方模型服务；Gemini 模型兼容性问题（#4623）亦属此类。
5. **终端渲染与可读性** — 可折叠输出区块、类型化彩色标识（#1787）以及 TUI CPU 占用（#4750），说明用户对终端交互体验的要求进一步提高。

## 开发者关注点

- **Windows 平台问题集中爆发**：会话创建限制（#4756、#4742）、GIT_CONFIG_VALUE 导致 VS Code 启动异常（#4531）、通知角标无法清除（#4381）——Windows 用户在多会话、IDE 协作等场景受到的制约明显多于其他平台。
- **会话恢复是高频痛点**：内存溢出（#4664）、MCP 连接被掐断（#4753）、陈旧连接 ID（#4505）、永久性会话卡死（#4755）频繁出现。长会话的“恢复能力”已成为信任 Copilot CLI 的基石。
- **MCP 连接可靠性受到质疑**：从启动阶段（#4753、v1.0.84-3 修复）、恢复阶段（#4753）、

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

## Kimi Code CLI 社区动态日报

**日期：2026-09-09**  
**数据来源：** [github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli/)


### 一、今日速览

过去 24 小时内，Kimi Code CLI 仓库整体非常平静，**无新版本发布、无 Issue 更新**。社区的核心焦点集中在 1 项 Pull Request——**#2595**：它致力于修复 `StrReplaceFile` 工具对非 UTF-8 文件的静默损坏问题。若该修复顺利合入，将显著提升文件编辑操作的安全边界，保护用户二进制或跨编码文件不被 AI 工具意外破坏。总体上，这是一个以“文件编辑安全”为主题的平静更新周期。


### 二、版本发布

**无新版本发布。**


### 三、社区热点 Issues

过去 24 小时内没有活跃 Issue 更新，暂无社区讨论热点。

值得关注的是，上述 PR #2595 引用了关联的悬而未决 Issue：

- **[#2591](https://github.com/MoonshotAI/kimi-cli/issues/2591)**（关联 PR #2595）— 文件编辑工具 `StrReplaceFile` 会损坏非 UTF-8 文件。  
  该 Issue 揭示了当前实现中 `errors="replace"` 解码逻辑的缺陷，虽然今天没有新评论，但围绕它已经产出了一个修复性 PR，说明其在维护者与社区心中具有一定优先级。


### 四、重要 PR 进展

过去 24 小时内共观察到 1 个 PR 更新：

| PR | 状态 | 更新时间 | 作者 |
|---|---|---|---|
| [#2595 fix(StrReplaceFile): refuse to edit files that are not valid UTF-8](https://github.com/MoonshotAI/kimi-cli/pull/2595) | 🟡 OPEN | 2026-09-08 | @shoemoney |

**功能/修复内容：**
- 当前 `StrReplaceFile` 的实现会先以 `errors="replace"` 模式解码整个文件内容为字符串，执行字符串替换后，再将完整字符串写回磁盘。
- 关键缺陷：文件中的**任意非 UTF-8 字节**——哪怕远离编辑范围——都会在解码时被转换为 U+FFFD 替换字符，随后被原样写回，导致文件被永久损坏。
- 本 PR 的解决思路是**拒绝编辑任何非合法 UTF-8 的文件**，从源头避免破坏性写入。

**为什么值得关注：**
1. 对 AI CLI 工具而言，`StrReplaceFile` 是高频文件操作，这个修复直接关乎数据安全；
2. 如果合入，可以有效保护二进制文件、GBK 等历史编码文件、或包含嵌入二进制内容的文本文件；
3. 该行为也代表了社区的安全预期：**宁可中止操作，也不默默损坏文件**。


### 五、功能需求趋势

从当前有效的 PR 信号中，可以提炼出以下社区功能需求方向：

1. **文件编辑安全性**  
   字符串替换类工具应严格校验文件编码，遇到非 UTF-8 文件时终止操作，而不是静默替换并重写。
2. **可预期的工具行为**  
   开发者希望 CLI 工具面对异常编码时给出明确、可操作的错误提示，而不是将 U+FFFD 悄悄写入用户文件。
3. **编码感知的文件处理**  
   未来或需要更完整的编码支持（如保留原始编码、或针对非 UTF-8 文件提供显式的编码转换策略），从而让 AI 编程工具在更复杂的文件生态中安全运作。

> 注：由于过去 24 小时无新增 Issue，无法从问题列表中进一步推断 IDE 集成、性能、新模型支持等其他潜在趋势。待 Issue 活跃度回升后将补充更全面的分析。


### 六、开发者关注点

- **高频痛点：非 UTF-8 文件被静默改写。**  
  当前的 `StrReplaceFile` 对全文件进行“解码 → 替换 → 写回”，导致任何非法 UTF-8 字节被转变为 U+FFFD。对于保存了二进制数据或非 UTF-8 编码的文件而言，这可能是灾难性的数据损坏。

- **安全诉求：宁可拒绝，不要破坏。**  
  从 PR #2595 的修复方向来看，开发者选择“拒绝编辑”而非“尝试保留字节”，反映出社区对工具安全边界的高度重视：**不做错误的事情，比尝试做正确的事情更重要**。

- **合并期待**  
  开发者普遍期望该 PR 可以

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## 今日速览

社区动态集中在**性能与稳定性**上：Memory Megathread 持续作为内存问题的收集帖，CPU 高占用、桌面端 V8 崩溃等反馈密集；V2 兼容性修复（prompt cache、thinking budget）在多条 PR 中推进。同时 PR 侧呈现明显的**架构重构**趋势——CLI 命令重组、桌面端插件化拆分、SSH 远程连接支持。

## 社区热点 Issues

挑选了 10 个讨论最热烈、对开发者影响最直接的问题：

1. **Memory Megathread** — 集中收集分散的内存问题，已获 110 👍、144 条评论。维护者强调不要用 LLM 猜测，希望社区协助采集堆快照。  
   https://github.com/anomalyco/opencode/issues/20695

2. **新版 OpenCode CPU 占用飙升** — 从大约 7 天前开始，原本可并行 10+ session，现在 3 个就卡顿，影响鼠标响应。51 条评论，27 👍，属于近期最突出的性能回归。  
   https://github.com/anomalyco/opencode/issues/30086

3. **请求保留旧版布局** — 新版本需要多次导航才能找到功能，旧版在主界面即可访问几乎所有选项。43 条评论、47 👍，说明 UI 改动对老用户冲击较大。  
   https://github.com/anomalyco/opencode/issues/37012

4. **归档会话无法恢复** — 归档是一次性操作，会话从侧边栏消失后没有入口恢复，希望增加 unarchive/restore。10 条评论，11 👍。  
   https://github.com/anomalyco/opencode/issues/24153

5. **会话标题停止自动生成** — 1 月 5-6 日起新会话全部卡在 "New session - [timestamp]"，不再生成描述性标题。8 条评论，虽已关闭但属于体验回归。  
   https://github.com/anomalyco/opencode/issues/7262

6. **Web UI 会话列表为空** — `opencode --web` 下左侧面板始终为空，但 `/api/session` 返回正常。社区已定位到 SSE 事件驱动的加载逻辑缺陷。  
   https://github.com/anomalyco/opencode/issues/27837

7. **Subagent 无限循环约 50 分钟** — 后台 subagent 连续执行 **364 次相同的 grep 调用**，无循环保护，token 消耗失控。开发者对缺乏熔断机制表示担忧。  
   https://github.com/anomalyco/opencode/issues/45442

8. **Bedrock GPT-5.6 缓存 token 被重复计算** — 供应商 API 将缓存输入重复计入 usage，导致 auto-compaction 每轮都误触发，session 从 ~150k 被压到 ~40k。  
   https://github.com/anomalyco/opencode/issues/47296

9. **TUI 主线程空转 100% CPU** — 无任何输出时仍以 ~15fps 重绘 spinner，`strace` 已确认主线程持续写 tty，属于渲染层缺陷。  
   https://github.com/anomalyco/opencode/issues/42306

10. **桌面端 sidecar 反复 V8 OOM 崩溃** — 本地服务器变红、`Failed to fetch`，发生在 Windows + 代理环境，已影响正常使用。  
    https://github.com/anomalyco/opencode/issues/41964

## 重要 PR 进展

1. **feat(desktop): add SSH server connections** — 桌面版新增 SSH 远程服务器连接，支持保存主机、自动重连和本地 HTTP 隧道，为远程开发打开入口。  
   https://github.com/anomalyco/opencode/pull/47753

2. **fix(core): preserve prompt cache affinity** — 修复 V2 下 OpenRouter/OpenAI 的 prompt cache 未生效问题；session 缓存 key 只传给了 OpenAI provider 命名空间。Closes #42246。  
   https://github.com/anomalyco/opencode/pull/42248

3. **perf(core): stop writing duplicate snapshot events in local mode** — 两项性能优化：懒加载 CLI 命令模块（避免每次启动加载全部命令，节省 ~224MB RSS）、停止本地模式重复写入快照事件。  
   https://github.com/anomalyco/opencode/pull/47661

4. **fix(opencode): apply long context config pricing** — 修复本地成本计算未考虑模型上下文分级定价的问题，影响长上下文模型的费用展示。Closes #42910。  
   https://github.com/anomalyco/opencode/pull/42919

5. **[contributor] fix(app): link background subagents to their sessions** — 后台 subagent 行现在可点击跳转到对应子会话，完成/失败/取消的 subagent 时间线也支持导航。  
   https://github.com/anomalyco/opencode/pull/47455

6. **feat(cli): add auth account switching and targeted logout** — CLI 新增 `auth switch [target] [credential]` 与定向 `auth logout`，改进多账号管理。  
   https://github.com/anomalyco/opencode/pull/48050

7. **refactor(cli): move import and export under session** — 将顶层 `import`/`export` 命令移到 `session import`/`session export`，重组 CLI 结构。  
   https://github.com/anomalyco/opencode/pull/48055

8. **feat: add DeepSeek Harness ACP backend** — 新增可选的 DeepSeek Harness ACP 执行后端，默认仍保留原生执行路径；覆盖进程生命周期、恢复、权限与取消。  
   https://github.com/anomalyco/opencode/pull/48048

9. **feat(plugin): explore desktop extensions and manager** — 提出桌面扩展 SDK 与管理器：host 面板、原生 surface、工作区/草稿能力，并在 Settings 中新增 Extensions 页面。  
   https://github.com/anomalyco/opencode/pull/47935

10. **refactor(app): extract terminal desktop extension** — 将 Ghostty 渲染、PTY 连接、终端标签等抽到 `@opencode/plugin-terminal-desktop`，是桌面端插件化拆分系列的一部分。  
    https://github.com/anomalyco/opencode/pull/48045

## 功能需求趋势

从 50 条 Issue 中可以提炼出社区最关心的方向：

- **性能与资源占用**：CPU 高占用、内存泄漏、V8 OOM、TUI 空转绘制，是当前最集中的痛点。
- **会话管理增强**：归档恢复（unarchive）、消息/part 删除、会话标题自动生成、subagent 子会话导航，都是高频诉求。
- **远程与 Web 访问**：Web UI 会话列表、SSH 连接、vlocal 默认密码不可知，说明远程使用场景在快速增长。
- **V2 功能对齐**：prompt cache affinity、thinking budget、part.delete 等 V1 已有能力在 V2 中缺失或行为不一致，用户希望尽快补齐。
- **权限与路径处理**：绝对路径权限规则静默失效、会话删除错误识别不完整，反映安全相关细节开始被关注。

## 开发者关注点

- **稳定性优先**：多开场景下 CPU/内存占用直接影响日常使用；桌面端 sidecar 崩溃导致服务不可用，反馈优先级很高。
- **V2 迁移成本**：多个 V1 功能在 V2 中缺失或表现不同，用户在迁移时感到“降级”，尤其是 API 兼容性和模型参数透传。
- **模型适配碎片化**：不同供应商（Bedrock、OpenRouter、DeepSeek）的 usage 统计、prompt cache、图片输入支持存在差异，希望框架层统一处理。
- **UI/UX 回归**：旧布局移除、会话标题异常、Web 面板空白等问题虽不致命，但持续消耗社区好感度，需要尽快修复。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-09

## 今日速览

昨日发布节奏密集：v0.23.1 正式版引入破坏性变更（移除 `@qwen-code/webui`），同时 SDK TypeScript 连续发布 v0.1.9/v0.1.10 两个版本，捆绑了社区翘首以盼的 managed-memory 与 prompt-cache 修复。社区最突出的声音集中在 Windows 平台稳定性上——ConPTY 进程泄漏（347 个 conhost.exe / 2.8 GB）和 Windows 11 更新后本地模型 400 错误均被标记为 P1；CI 可靠性问题（release 不检查提交状态、重复跑测试）也是热议焦点。

---

## 版本发布

### v0.23.2-preview.0
- **变更**：仅包含一项 CI 修复——将子进程密集的 E2E 测试与 fork 压力隔离（PR [#11388](https://github.com/QwenLM/qwen-code/pull/11388)）。
- **完整变更**：[Changelog](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2-preview.0)

### v0.23.1
- **Breaking Change**：移除 `@qwen-code/webui`（[#9812](https://github.com/QwenLM/qwen-code/pull/9812)）。
- **新功能**：Web Shell 可视化与管理动态会话（web-shell 相关增强）。
- **完整变更**：[Changelog](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1)

### sdk-typescript v0.1.9 / v0.1.10
- 连续发布两个 SDK 版本，v0.1.10 捆绑 CLI 0.23.1。
- **核心修复**（社区在 [#11022](https://github.com/QwenLM/qwen-code/issues/11022) 中要求的）：
  - 托管内存可用性现在遵循 `memory.enableManagedAutoMemory` 设置（[#6941](https://github.com/QwenLM/qwen-code/issues/6941)）；禁用托管自动内存的主机不再看到 remember/dream 请求被接收。
  - 包含 prompt-cache 相关修复（[#8464](https://github.com/QwenLM/qwen-code/issues/8464)）。

---

## 社区热点 Issues

### 1. [Windows] qwen-cli 泄漏 headless conhost.exe ConPTY 进程 — 347 个进程 / 2.8 GB
- **#11303** | P1 | 评论 10 | [链接](https://github.com/QwenLM/qwen-code/issues/11303)
- VS Code Companion 内嵌的 qwen-cli 在约 12 小时运行后累积 347 个子进程，占约 2.8 GB 内存且不释放。社区关注度最高的性能问题，已拆分为两个独立 issue 跟踪。

### 2. [Windows] node-pty 在自然退出时泄漏 ConPTY host（conhost.exe）
- **#11352** | P1 | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/11352)
- 这是 #11303 的“不可修复的一半”——`@lydell/node-pty` 的 baton 在 `onExit` 前被擦除，导致 `ClosePseudoConsole` 无法从 JS 调用。维护者明确表示在固定依赖版本下无法从本项目侧修复，需要上游解决。

### 3. Windows 11 更新后本地模型（LM Studio）报 API Error 400
- **#11410** | P1 | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/11410)
- 用户反馈 Windows 11 更新后，连接 LM Studio 和本地模型全部失败，v0.23.1 之前一切正常。属于平台兼容性回归，影响本地开发工作流。

### 4. Deny 模式工具权限错误过于严格，导致模型完全放弃使用该工具
- **#11405** | P2 | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/11405)
- 当工具被特定 pattern deny（如 `Bash(npm view *)`）时，错误信息让模型误以为工具被完全禁止。社区希望错误信息能区分“pattern 级拒绝”与“完全禁用”。

### 5. review 内容过滤屏幕丢失六个安全加固
- **#11205** | P2 | 评论 4 | [链接](https://github.com/QwenLM/qwen-code/issues/11205)
- 安全相关：`main` 分支上的重写版本未包含此前 16 轮 review 积累的六个加固（读顺序、EACCES、U+FFFD、spawn 超时、候选上限、保留策略）。@wenshao 持续追踪。

### 6. Release 重复运行 main CI 已跑过的单元测试
- **#10820** | P2 | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/10820)
- Release 工作流在相同 commit 上重新运行 unit suite，导致重复消耗最抢手的 runner，且是 release 失败的最大单一来源。社区建议直接复用已通过的 CI verdict。

### 7. Release 从 main 最新提交构建但不检查该提交的 CI 状态
- **#11420** | P2 | 评论 2 | [链接](https://github.com/QwenLM/qwen-code/issues/11420)
- 2026-09-08 的 nightly 从一个已红 1 小时 41 分的 commit 发布。`resolve-commit` 只取 `git rev-parse HEAD`，完全不复核 CI 结果，引发对发布质量的质疑。

### 8. daemon 工作区扩展：超过 25 个工作区时解耦注册与实时运行时
- **#11386** | P2 | 评论 3 | [链接](https://github.com/QwenLM/qwen-code/issues/11386)
- 实测 1/25/256 容量基线后，建议不再以完整 LRU 为前提，而是先解耦“注册”与“live 运行时”的概念，以降低 idle 主机成本。daemon 方向的重要演进。

### 9. customHeaders 支持 `${session_id}` 模板变量
- **#10995** | P3 | 评论 3 | 👍 1 | [链接](https://github.com/QwenLM/qwen-code/issues/10995)
- 社区希望 `generationConfig.customHeaders` 的值支持 `session_id` 模板，按请求时解析到当前会话 ID，便于按会话做请求头路由。该 issue 已被关闭，但需求方向值得关注。

### 10. daemon 文档同步至站点时丢失导航（_meta.ts 从未同步）
- **#11399** | P3 | 评论 2 | [链接](https://github.com/QwenLM/qwen-code/issues/11399)
- 页面内容已同步并翻译，但 `docs/**/_meta.ts` 未包含在同步流程中，导致 daemon 文档上线后没有导航。文档体系建设中的缺口。

---

## 重要 PR 进展

### 1. feat: delegate a subagent turn to an external agent over ACP（Claude Code first）
- **#11003** | [链接](https://github.com/QwenLM/qwen-code/pull/11003)
- 允许子代理定义将 turn 委托给外部编码代理（通过 ACP），实现“外部进程驱动 + 结果重新发布为子代理事件”。这是 Qwen Code 与 Claude Code 等外部 agent 互操作的重要一步。

### 2. feat(cli): see, answer and stop a background session
- **#10949** | [链接](https://github.com/QwenLM/qwen-code/pull/10949)
- 为后台 Agent View 会话新增三个子命令：`qwen sessions peek`（查看当前状态/问题）、`answer`（回答）、`stop`（停止）。补全后台会话管理能力。

### 3. feat(browser-use): add Playwright-based Browser SDK
- **#11241** | [链接](https://github.com/QwenLM/qwen-code/pull/11241)
- 在持久 Node REPL 中新增类型化的 Browser SDK，通过语义化 Playwright locator、DOM 快照引用和视觉坐标三种方式定位目标，控制现有 Chrome 会话。

### 4. feat(web-shell): improve session overview navigation and details
- **#11238** | [链接](https://github.com/QwenLM/qwen-code/pull/11238)
- 会话概览增强：标题下显示工作区、分支和 PR，区分审批/提问/运行/空闲状态，支持状态筛选和分支/PR 搜索。已进行约五轮 review，确认的回归已在 PR 内修复，余项拆到 [#11390](https://github.com/QwenLM/qwen-code/issues/11390) 跟踪。

### 5. fix(core): retry status-less upstream errors instead of ending the turn
- **#11291** | [链接](https://github.com/QwenLM/qwen-code/pull/11291)
- 当 gateway 在已返回 200 的 SSE 流中推入错误对象时，OpenAI SDK 会丢失 HTTP status。此 PR 让重试路径识别这类“无状态”上游错误并恢复，而非直接结束 turn。提升长尾稳定性。

### 6. fix(acp): preserve caller-owned mode after child reap
- **#11395** | [链接](https://github.com/QwenLM/qwen-code/pull/11395)
- 修复 ACP 子进程被回收后，同一会话冷加载或恢复时，daemon API 调用方显式持有的审批模式被丢失的问题。对多会话 daemon 场景的权限一致性至关重要。

### 7. feat(channels): add final-only and process output modes
- **#11333** | [链接](https://github.com/QwenLM/qwen-code/pull/11333)
- 通道输出模式：默认“仅最终结果”（请求结束时发布最后一条完整助手回复），可选“过程和结果”（每条助手输出分别传递）。优化流式输出语义。

### 8. feat(release): ship the bun/OpenTUI preview archives by default
- **#11422** | [链接](https://github.com/QwenLM/qwen-code/pull/11422)
- 让每个独立 release 默认附带 bun/OpenTUI 预览归档，不再需要显式 repository variable。经典 Node.js 归档不变，bun 作为纯增量提供。

### 9. fix(cli): make the Agent Team teammate tab transcript scrollable in VP mode
- **#9531** | [链接](https://github.com/QwenLM/qwen-code/pull/9531)
- VP（`ui.useTerminalBuffer`，默认开启）模式下，teammate transcript 改用与主会话相同的 `ScrollableList` 虚拟视口，修复不可滚动问题。长时间挂

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*