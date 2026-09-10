# AI CLI 工具社区动态日报 2026-09-10

> 生成时间: 2026-09-10 01:57 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-10）

## 1. 生态全景

当前 AI CLI 工具正处于高频迭代期：头部项目维持着日级或周级发布节奏，同时社区反馈开始集中暴露**跨平台稳定性、会话持久化、插件扩展能力和安全治理**等深层次问题。各工具正从“单机对话助手”向“可编程 Agent 平台”演化，互相借鉴痕迹明显（如 worktree、function hooks、子代理委托），但尚未出现统一标准。整体上，工具的功能边界快速扩张，而工程成熟度（尤其是 Windows 支持和数据可靠性）仍是主要短板。

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 数 | 今日 PR 数 | Release 情况 |
|------|--------------|------------|--------------|
| Claude Code | 10（均为热点） | 2 | v2.1.267 |
| OpenAI Codex | 10 | 1（标题标注 10 条，实际展示 1 条） | rust-v0.154.0 + 3 个 alpha |
| Gemini CLI | 10 | 3（标题标注 Top 10，实际展示 3 条） | v0.61.0-nightly.20260910 |
| GitHub Copilot CLI | 10 | 1 | 无 |
| Kimi Code CLI | 4 | 1 | 无 |
| OpenCode | 10 | 8 | v1.18.30 |
| Qwen Code | 10 | 10 | v0.23.2 正式版 + 若干组件版 |

> 注：Codex 与 Gemini 的 PR 数量以实际展示条目为准，原始标题标注数量可能更高。

## 3. 共同关注的功能方向

### 3.1 Windows 平台稳定性
- **Claude Code**：Windows 更新破坏 Plan9 挂载，Cowork/沙箱故障（#92958、#92984、#92977）
- **OpenAI Codex**：Windows 应用无法启动（#42501）、内存泄漏（#29079）
- **Qwen Code**：conhost.exe 进程泄漏（#11303）、node-pty ConPTY 泄漏（#11352）
- **OpenCode**：Windows ARM64 TUI 崩溃（#19130）
- **GitHub Copilot CLI**：WSL2 CPU 飙高与 TUI 冻结（#3700）

### 3.2 会话持久化与恢复
- **Claude Code**：桌面应用取消归档会话（#30869）
- **OpenAI Codex**：压缩后对话历史丢失（#42311、#44363）
- **GitHub Copilot CLI**：默认恢复上次会话（#1467）
- **Qwen Code**：扩展升级后会话历史全部丢失（#11489）
- **OpenCode**：无会话时 auto-accept 不可用（#48237）

### 3.3 IDE 集成精细化
- **Claude Code**：VSCode 聊天面板字体设置（#34196）
- **Kimi Code**：VSCode 扩展优先显示已打开文件（#1270）
- **Qwen Code**：VSCode 扩展会话迁移（#11489）、ACP 断连策略（#11510）
- **GitHub Copilot CLI**：浅色主题适配（#135、#3773）

### 3.4 Agent 能力与插件扩展
- **Claude Code**：Function Hooks 插件能力（#91870）
- **Gemini CLI**：自定义技能/子代理主动使用不足（#21968）
- **OpenCode**：Agent Teams 并行协作（#12711）、会话压缩钩子（#48212）
- **Qwen Code**：通过 ACP 委托子代理给外部代理（#11003）

### 3.5 安全与认证健壮性
- **Claude Code**：OAuth 凭据竞态（#88583）
- **OpenAI Codex**：安全误报封禁 CI 线程（#44355）
- **Gemini CLI**：两个 CRITICAL CVE 修复（#29094、#29095）、隐私设置（#21185）
- **Kimi Code**：设备登录 HTTP 500（#2638）
- **GitHub Copilot CLI**：`--yolo` 被策略误杀（#4757）

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|----------|----------|----------|
| **Claude Code** | 企业级配置（maxEffortLevel）、深度插件生态（Function Hooks）、跨设备协同 | 需要高可控性和复杂自动化团队的开发者 | 以 hooks/plugins 为核心扩展点，强调“可编程 Agent”能力 |
| **OpenAI Codex** | 最新模型（GPT-6-Astra）、隔离工作区（worktree）、桌面/IDE 深度集成 | 追求前沿模型能力的开发者，偏 AI 原生 IDE 用户 | 依托 OpenAI 模型优势，构建本地/云端隔离执行环境 |
| **Gemini CLI** | 与 Google 生态联动、隐私控制、供应链安全 | Google Cloud 开发者、对数据控制敏感的企业用户 | 安全优先，修复供应链漏洞果断，但 Agent 主动性待提升 |
| **GitHub Copilot CLI** | GitHub 工作流无缝衔接、轻量级助手 | 重度使用 GitHub 的开发者 | 依赖 GitHub 生态，迭代较慢，功能演进保守 |
| **Kimi Code** | 轻量 CLI 与多模态交互（引用回复） | 中小型项目，中文/多语言用户 | 功能简约，但国际化（RTL）和认证稳定性是短板 |
| **OpenCode** | 多 provider 支持、插件系统、Agent 团队协作 | 开源社区、需要自托管/多模型自由的用户 | 开放架构，强调配置热重载、协议可扩展性和第三方插件 |
| **Qwen Code** | 远程开发（daemon/Web Shell）、后台无人值守、外部代理委托 | 阿里云/跨设备开发场景，重视远程执行的用户 | 全栈自研（CUA driver、PTY 修复），后台自动化能力强 |

## 5. 社区热度与成熟度

- **第一梯队（高活跃、强官方响应）**：**Claude Code** 和 **Qwen Code**。前者功能请求获官方“数周内交付”承诺（#91870），后者从问题发现到修复 PR 仅 2 天（#11303→#11497），社区反馈驱动开发明显。
- **第二梯队（活跃但侧重迭代）**：**OpenAI Codex** 与 **OpenCode**。Codex 新版发布后问题集中爆发，但官方以高频 alpha 版本快速修复；OpenCode 热重载需求获 97 👍 为今日最高赞，社区参与深度强。
- **第三梯队（稳定但节奏放缓）**：**GitHub Copilot CLI** 与 **Gemini CLI**。Copilot 24 小时仅 1 个文档 PR，长期 issue（浅色主题）悬而未决；Gemini 虽在安全修复上积极，但功能型需求（如全局隐私设置）讨论半年仍无结论。
- **第四梯队（社区规模较小）**：**Kimi Code** 今日仅 4 个 issue，社区反馈面窄，处于早期用户积累阶段。

## 6. 值得关注的趋势信号

1. **Windows 正成为 AI CLI 工具链的“验金石”**  
   七个工具中有五个今日存在 Windows 特定问题（挂载失败、进程泄漏、启动崩溃），且均获得较高关注。对开发者而言，选择工具时需优先评估其 Windows 支持成熟度；对工具厂商，Windows 适配已是竞争分水岭。

2. **Agent 从“单次对话”走向“长期自治”**  
   Qwen 的后台超时看门狗（#11270）、Codex 的 worktree 隔离、OpenCode 的 Agent Teams 提案、Claude Code 的 Function Hooks，均指向同一目标：让 Agent 能安全、可恢复地执行长时任务，并有清晰的权限边界。

3. **会话持久化是信任基石，但普遍脆弱**  
   多个工具出现“升级丢历史”“压缩丢数据”“删除后复活”等问题，说明会话存储与迁移仍缺少工程化标准。工具中的“记忆”能力越强，用户对数据丢失的容忍度越低。

4. **安全与认证正在从“功能”升级为“底线”**  
   Gemini 紧急修复 CRITICAL CVE、Codex 误杀 CI 线程、Copilot 权限策略误判、Kimi 登录失败——安全事件不再是边缘问题，而是直接影响生产使用的核心风险。企业采用 AI CLI 时，需要将供应链安全和策略可解释性纳入选型标准。

5. **“不打断心流”成为 IDE 集成新标尺**  
   字体设置、快捷键、文件感知、主题适配等细节高频出现，说明开发者希望 AI 工具无缝嵌入现有编辑器，而非额外切换上下文。这将是下一阶段体验竞争的焦点。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-10）

> 数据源：github.com/anthropics/skills —— 官方 Skills 集合仓库。PR 代表实际提交的 Skill 或修复，Issue 代表社区需求与反馈。以下按讨论热度排序分析。

---

## 1. 热门 Skills 排行（TOP 8）

| 排名 | PR | Skill 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [#1298 skill-creator 修复](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 对所有描述恒定误报 `recall=0%` 的致命缺陷，涉及评测产物安装、Windows 流读取、触发检测与并行 worker | 该 bug 直接影响 skill 描述优化闭环，被 #556 等 10+ 独立复现，是当前仓库最受关注的工程问题 | open |
| 2 | [#514 document-typography](https://github.com/anthropics/skills/pull/514) | 新增文档排版质检技能：孤行（1~6 词溢出）、寡行（标题滞留页底）、编号错位 | AI 生成文档普遍存在的排版问题，用户很少主动要求但影响专业度，通用性极强 | open |
| 3 | [#1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615) | 通过 profile 化 SSH 与 Slurm 工作流操作 SCNet HPC 集群 | HPC 算力调度场景；覆盖分区、内存、模块、加速器配置等完整指令 | open |
| 4 | [#538 pdf 大小写修复](https://github.com/anthropics/skills/pull/538) | 修正 `skills/pdf/SKILL.md` 中 8 处大小写不匹配的文件引用（`REFERENCE.md`→`reference.md` 等） | 在大小写敏感文件系统上破坏资源加载，属明确低风险高价值修复 | open |
| 5 | [#486 ODT 技能](https://github.com/anthropics/skills/pull/486) | 新增 OpenDocument 技能：`.odt/.ods` 创建、模板填充、解析 ODT 为 HTML | 补全 ISO 标准开源文档格式支持，触发词覆盖 ODT/ODS/ODF/LibreOffice 等 | open |
| 6 | [#210 frontend-design 改进](https://github.com/anthropics/skills/pull/210) | 重构 frontend-design 技能，提升清晰度、可执行性与内部一致性 | 核心争点是"指令是否在单次对话中真正可被 Claude 执行"，而非停留在概念描述 | open |
| 7 | [#83 技能质量/安全分析器](https://github.com/anthropics/skills/pull/83) | 新增两个 meta-skills：skill-quality-analyzer（结构/文档/示例 5 维质量评估）与 skill-security-analyzer | 反映社区对 Skill 工程质量与安全审查的元层需求 | open |
| 8 | [#1734 docx 孤立评论检测](https://github.com/anthropics/skills/pull/1734) | 检测 docx 文档中的孤立评论（缺少关联目标的 orphaned comments） | 文档完整性维护，与 #541（tracked change w:id 冲突）同属 docx 稳健性修复潮 | open |

此外值得关注：#1628 Hivemind（零成本多智能体编排，让 Claude 作为唯一规划者/审查者，委托 opencode 跑免费模型）、#1627 Buffer API 技能、#1367 self-audit（机械文件校验 + 四维推理质量门禁）、#723 testing-patterns（完整测试栈技能）。

---

## 2. 社区需求趋势（来自 Issues）

按讨论热度提炼出五大方向：

- **安全与信任边界（最热）**：[#492 社区技能冒用 anthropic/ 命名空间](https://github.com/anthropics/skills/issues/492)（43 评论）——社区技能可被分发在官方命名空间下，构成信任边界滥用，用户可能授予社区技能过高权限。这是当前生态最大的结构性风险议题。
- **企业级分享与协作**：[#228 组织级技能共享](https://github.com/anthropics/skills/issues/228)（👍8）——要求在企业内直接共享技能库/分享链接，替代"下载 .skill 文件 → Slack 传输 → 手动上传"的低效链路。
- **技能创建工具链可靠性**：[#556 `run_eval.py` 触发率恒为 0%](https://github.com/anthropics/skills/issues/556)（👍7）、[#202 skill-creator 应更新为最佳实践](https://github.com/anthropics/skills/issues/202)、[#62 技能全部消失](https://github.com/anthropics/skills/issues/62) —— 社区最痛的点是"造技能的工具本身不可靠"，评测信号失真导致优化循环在噪声上运行。
- **上下文窗口效率**：[#1487 `claude-api` 技能单次注入 ~156k tokens](https://github.com/anthropics/skills/issues/1487) —— 大型技能要警惕"技能本身撑爆上下文"的反模式。
- **元技能与治理**：[#1329 compact-memory 紧凑符号化记忆](https://github.com/anthropics/skills/issues/1329)、[#1385 推理质量门禁流水线](https://github.com/anthropics/skills/issues/1385)、[#412 agent-governance 安全模式](https://github.com/anthropics/skills/issues/412) —— 社区开始为"技能质量本身"和"Agent 行为治理"设计技能，生态进入自我改进阶段。

---

## 3. 高潜力待合并 PR（近期可能落地）

- **[#1298 + 关联修复簇](https://github.com/anthropics/skills/pull/1298)**（#1099、#1050、#539）——skill-creator 评测链路修复。被 #556 大规模复现且直接影响描述优化核心循环，属于"不修则生态工具不可用"的合并优先级最高项。
- **[#538 pdf 大小写修复](https://github.com/anthropics/skills/pull/538)**——单点 bug、改动极小、修复明确，最易快速合并。
- **[#486 ODT 技能](https://github.com/anthropics/skills/pull/486)**——完整新技能，补缺 OpenDocument 格式空白，功能边界清晰。
- **[#514 document-typography](https://github.com/anthropics/skills/pull/514)**——通用性高、不依赖特定平台，适合作为官方文档类技能合入。
- **[#723 testing-patterns](https://github.com/anthropics/skills/pull/723)**——覆盖单测/React 组件测试/测试哲学

---

# Claude Code 社区动态日报（2026-09-10）

## 今日速览

- **v2.1.267 发布**：新增 `maxEffortLevel` 全局/模型级配置，并支持 `--system-prompt-snapshot off` 按请求实时渲染系统提示。
- **Function Hooks 进入倒计时**：#91870 获 154 条评论、90 赞，官方明确“以周为单位”推进交付，社区反馈已实质影响设计。
- **Windows Cowork 故障集中爆发**：多个独立 Issue 报告 Windows 更新 KB5124008/KB5124012 破坏 Plan9 挂载，涉及 ARM64/x64、Desktop 与 CLI，成为今日最大 bug 集群。

## 版本发布

### v2.1.267
- **`maxEffortLevel` 设置**：可在顶层或 `modelSettings` 下按模型配置，统一限制包括 Bedrock、Vertex、Foundry 在内的所有 provider 的 effort 级别；用户仍可手动选择更低等级。
- **`--system-prompt-snapshot off`**：每次请求强制重新渲染系统提示（默认关闭），适用于 prompt 频繁变动的场景。

## 社区热点 Issues

### 1. Function Hooks — 让插件强大 10 倍 [#91870](https://github.com/anthropics/claude-code/issues/91870)
> [OPEN] `area:hooks, area:plugins` · 评论 154 · 👍 90 · 更新 09-09
官方发布社区更新：已承诺“数周内”交付 function hooks，并感谢社区高信号反馈对设计的塑造。这是当前社区关注度最高的功能请求。

### 2. Windows 累积更新破坏 Plan9 share，device_bash 全挂 [#92958](https://github.com/anthropics/claude-code/issues/92958)
> [OPEN] `bug, platform:windows, area:cowork` · 评论 38 · 更新 09-09
KB5124012（ARM64）/ KB5124008（x64）导致 Plan9 share attach 失败，5 台机器 A/B 回滚确认。影响面广，社区反馈活跃。

### 3. Cowork Windows：Plan9 挂载失败，卸载 KB 可恢复 [#92984](https://github.com/anthropics/claude-code/issues/92984)
> [OPEN] `bug, platform:windows, area:cowork` · 评论 30 · 👍 14 · 更新 09-10
与 #92958 同源，用户确认卸载 KB5124008 可修复。已标记为重复（duplicate），但仍被持续追踪。

### 4. 桌面应用支持取消归档会话 [#30869](https://github.com/anthropics/claude-code/issues/30869)
> [CLOSED] `enhancement, area:desktop` · 评论 29 · 👍 61 · 更新 09-09
虽已关闭，但 61 个点赞表明桌面端会话管理仍是强需求。社区对归档/取消归档能力的关注未减。

### 5. 禁用“命令包含引号字符”警告 [#27957](https://github.com/anthropics/claude-code/issues/27957)
> [OPEN] `area:permissions` · 评论 27 · 👍 74 · 更新 09-10
`git commit -m "message"` 等常规命令被频繁拦截，严重干扰工作流。74 个点赞显示这是影响面极广的可用性痛点。

### 6. VSCode 扩展：聊天面板字号设置 [#34196](https://github.com/anthropics/claude-code/issues/34196)
> [OPEN] `enhancement, area:vscode` · 评论 14 · 👍 87 · 更新 09-10
87 个点赞，社区对 IDE 集成的精细控制需求强烈。当前聊天面板字体无法跟随编辑器设置。

### 7. 频道消息不唤醒空闲会话（--channels 插件）[#44380](https://github.com/anthropics/claude-code/issues/44380)
> [OPEN] `bug, platform:macos, area:mcp, area:plugins` · 评论 13 · 更新 09-10
Telegram 等渠道消息到达后仅显示在终端，但不触发 REPL 处理。影响远程/异步协作场景。

### 8. GitHub 连接器从 /mcp 列表消失 [#29415](https://github.com/anthropics/claude-code/issues/29415)
> [OPEN] `bug, platform:macos, area:mcp` · 评论 12 · 更新 09-10
GitHub 在 claude.ai 设置中可见，但 CLI 的 /mcp 中完全不出现；其余 19 个连接器同步正常。

### 9. Cowork 本地沙箱挂载失败（Desktop 1.49585.0.0）[#92977](https://github.com/anthropics/claude-code/issues/92977)
> [OPEN] `bug, platform:windows, area:cowork, area:sandbox` · 评论 9 · 更新 09-10
Windows 端 Desktop 更新后沙箱无法挂载，与 #92984 相关，社区正在合并线索。

### 10. claudeAiOauth 凭据竞态：并发会话清空 Keychain Token [#88583](https://github.com/anthropics/claude-code/issues/88583)
> [OPEN] `bug, platform:macos, area:auth` · 评论 7 · 更新 09-09
并发 Desktop 会话竞争 single-use refresh token，刷新失败会覆盖已轮换的凭据（`expiresAt:0`）。此前 #43392 仅修复 MCP 凭据，此问题直指核心 OAuth 路径，安全敏感性高。

## 重要 PR 进展

> 过去 24 小时 PR 活跃度较低（仅 2 条更新），以下为全部内容。

### 1. validate-agent.sh：修复首个警告即中止、误报有效代理 [#89404](https://github.com/anthropics/claude-code/pull/89404)
> [OPEN] @bcherny · 更新 09-10 · 修复 #83803
三个根因均与 `set -euo pipefail` 交互有关：
- `((warning_count++))` / `((error_count++))` 的算术求值在第一次自增后返回非零退出码，导致脚本在首个警告处中断；
- 修复后不再误报合法代理。

### 2. 内置 hooks 模块插件源码发布：sec-default/diff/telemetry [#93215](https://github.com/anthropics/claude-code/pull/93215)
> [CLOSED] @poteat · 更新 09-09
将嵌入 Claude Code 的三个 hooks 模块插件以源码形式发布：`sec-default`（组织默认外层插件）、`diff`（/diff）、`telemetry`（`$.telemetry`）。早期访问：仅在启用 function hooks 的环境加载，与 #91870 形成配套。

## 功能需求趋势

1. **Function Hooks 插件能力跃升**（#91870）：官方已承诺数周内上线，社区正围绕该能力设计下一代插件生态。
2. **跨设备会话协同**（#30869、#91815）：从手机查看/启动/取消归档桌面会话，Remote Control 的下一步方向。
3. **IDE 集成精细化**（#34196、#27957）：VSCode 面板自定义、权限提示降噪，开发者对“不打断心流”的工具体验要求持续提升。
4. **MCP 生态与认证健壮性**（#29415、#88583、#91641）：连接器同步、单次刷新令牌竞态等问题频发，认证机制的工程化是当前薄弱环节。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-10

## 今日速览
今日最重磅的更新是 **rust-v0.154.0 版本发布**，正式引入 GPT-6-Astra 模型支持，并推出实验性 worktree 功能（`--worktree`），允许为新建或 forked 会话创建隔离工作区。社区层面，**Windows 桌面应用稳定性问题**（无法启动、推理强度重置、内存泄漏）和**对话历史丢失/损坏**成为最集中的反馈焦点；同时，TUI 多行状态行需求以 83 个 👍 持续占据功能诉求榜首。

## 版本发布
### rust-v0.154.0
- **GPT-6-Astra** 现已出现在模型选择器和 Amazon Bedrock 目录中（#42879, #42619）
- 新增**实验性 worktree 支持**：通过 `--worktree` 或 `/worktree` 可为新会话或 forked 会话创建隔离检出，并支持浏览和恢复（#42652, #43069, #43120）

另发布了三个 alpha 维护版本：`0.154.0-alpha.6.1`、`0.154.0-alpha.10.2`、`0.154.0-alpha.11`。

## 社区热点 Issues（10 条）
### 🔥 #21653 — TUI 状态栏多行支持（👍 83）
> **作者** @EveGoodEvening | 更新 2026-09-10 | 评论 20  
> **链接** https://github.com/openai/codex/issues/21653

状态栏配置过多时内容被截断，社区要求支持换行显示。这是当前**最高赞的未解决问题**，反映了 TUI 用户对状态信息完整性的强烈诉求。

### 🐞 #41465 — Windows 浮动宠物无法拖拽（👍 41）
> **作者** @kaenapple | 更新 2026-09-10 | 评论 25  
> **链接** https://github.com/openai/codex/issues/41465

Windows 桌面端的浮动宠物窗口始终处于点击穿透状态，无法接收鼠标输入。一个趣味性功能 bug，但**评论数位列今日第一**，说明桌面端 UI 交互 bug 已成为社区高感知度话题。

### 🚨 #42501 — Windows 应用 cua_node staging 失败导致无法启动 UI
> **作者** @leonfetter | 更新 2026-09-10 | 评论 14  
> **链接** https://github.com/openai/codex/issues/42501

升级至 `26.901.1978.0` 后，`cua_node` 运行时无法复制 `node_repl.exe`，导致进程启动但窗口始终不显示（`MainWindowHandle=0`）。**应用级启动阻断**，影响范围大。

### 💾 #41399 — macOS 删除的对话在重置后重新出现
> **作者** @marcusviniciusf | 更新 2026-09-10 | 评论 13  
> **链接** https://github.com/openai/codex/issues/41399

即使本地 profile 完全重置，已删除的 ChatGPT 对话仍残留在侧边栏中，引发会话数据一致性和隐私担忧。

### ⚙️ #42435 — Windows 推理强度自动重置
> **作者** @kujopht | 更新 2026-09-10 | 评论 11  
> **链接** https://github.com/openai/codex/issues/42435

`26.901.1978.0` 中，用户设置的 "Extra High" 推理强度会被静默重置为 "Instant"，影响业务场景下的模型输出质量。

### 🧨 #42311 — 压缩后对话历史消失
> **作者** @kevingb24 | 更新 2026-09-10 | 评论 10  
> **链接** https://github.com/openai/codex/issues/42311

长会话在上下文压缩（compaction）后，桌面 UI 中大部分对话历史丢失。与今日新增的 #44363（压缩会重写存储 rollout 并永久摧毁 transcript）相互印证，**数据丢失风险成为当日最严重痛点**。

### 🔌 #15643 — 远程 MCP scopes_supported 提取位置有误（👍 17）
> **作者** @NextFire | 更新 2026-09-10 | 评论 10  
> **链接** https://github.com/openai/codex/issues/15643

远程 MCP 应从 protected resource 元数据文档中提取 `scopes_supported`，而非当前逻辑。Enterprise 订阅用户关注的安全与协议正确性问题。

### 🐌 #29079 — Windows 内存泄漏：Node/MCP 进程残留
> **作者** @ElierHG | 更新 2026-09-10 | 评论 9  
> **链接** https://github.com/openai/codex/issues/29079

大量 Node/MCP/helper 进程在任务结束后仍然存活，内存占用持续增长直至系统卡死。与 heavy subagent、MCP/Node REPL 使用相关，**开发者反馈强烈的性能问题**。

### 📊 #44210 — Pro 订阅周用量显示异常（60%→97%）
> **作者** @Hannark | 更新 2026-09-10 | 评论 9  
> **链接** https://github.com/openai/codex/issues/44210

Windows 上 ChatGPT Pro 账户的每周用量显示在未进行大量操作时从 60% 跳到 97%，且重置时间戳发生变化。触达限额场景下的**计量准确性**问题。

### 🛡️ #44355 — 误报安全拦截导致 10M-token CI 线程被永久封禁
> **作者** @srinji-kaggss | 更新 2026-09-10 | 评论 3  
> **链接** https://github.com/openai/codex/issues/44355

一个合法的长跑 CI 线程被 `misalignment_policy_violation` 误判后直接终止，且 TUI 显示无法关闭的警示视图，线程永久不可用。**Safety-check 假阳性对生产环境杀伤力极大**。

---

## 重要 PR 进展（10 条）
### 🔀 #44349 — 会话钩子区分 forked 会话
> **链接** https://github.com/openai/codex/pull/44349

修复 forked 线程仍被报告为 `startup` 的问题，为 `SessionStart` 钩子新增 `fork` 状态；同时修正带历史恢复时错误上报为 `startup` 而非 `resume` 的缺陷。直接呼应 #39951 的重复

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-10

## 今日速览

- 发布夜间版 **v0.61.0-nightly.20260910**，主要包含自动化版本升级与上一夜间版的差异变更。  
- 社区最热的讨论集中在 **Agent 子任务误报成功**（#22323）、**模型不主动使用自定义技能/子代理**（#21968）以及 **两项 CRITICAL 级 CVE 修复 PR**（simple-git 与 shell-quote）。  
- 多项安全与稳定性 PR 已关闭（如 CVE 升级、代码缓存修复），同时新增了 **Gemini 3.8 Flash 模型支持** 与 **沙箱边界加固** 的开放 PR。

---

## 版本发布

### v0.61.0-nightly.20260910.ged2ac40df
- 类型：Nightly 自动发布  
- 变更内容：自动化版本号更新  
- 完整变更对比：[v0.61.0-nightly.20260909...v0.61.0-nightly.20260910](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260909.ged2ac40df...v0.61.0-nightly.20260910.ged2ac40df)

---

## 社区热点 Issues（Top 10）

### 1. Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption
- **编号**: [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Priority P1 | 13 评论
- **重要性**: 子代理在达到最大轮次后仍返回 `status: "success"` / `Termination Reason: "GOAL"`，实际分析工作并未完成。这会导致用户误判任务结果，属于 Agent 行为正确性的核心问题。
- **社区反应**: 评论数最高，用户详细上报了复现路径（t3code/superse 仓库分析），维护者已标记为 `need-retesting`。

### 2. Gemini does not use skills and sub-agents enough
- **编号**: [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Priority P2 | 6 评论
- **重要性**: 用户反馈 Gemini 极少自主调用已定义的自定义 skills 和 sub-agents，只有显式指令才会使用。这直接影响 Agent 的自动化能力和用户自定义工作流的价值。
- **社区反应**: 用户提供了具体场景（gradle/git skills），维护者已纳入 `workstream-rollup` 跟踪。

### 3. Assess the impact of AST-aware file reads, search, and mapping
- **编号**: [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Priority P2 | 7 评论
- **重要性**: 这是一个 EPIC 级评估任务，探索 AST 感知工具能否精确读取方法边界、减少 token 消耗和回合数。对大型代码库的 Agent 效率提升有潜在重大意义。
- **社区反应**: 已拆分子任务（如 #22746），说明团队在认真推进该方向的调研。

### 4. Add deterministic redaction and reduce Auto Memory logging
- **编号**: [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | Priority P2 | 5 评论
- **重要性**: 自动记忆（Auto Memory）功能在明文读取 transcripts 后再交给模型 redact，敏感信息已暴露在模型上下文中。这是隐私/安全相关的关键设计缺陷。
- **社区反应**: 用户建议在发送前做确定性 redaction，并要求减少后台日志。

### 5. Patch shell command dependencies for public security advisories
- **编号**: [#28139](https://github.com/google-gemini/gemini-cli/issues/28139) | Priority P2（已关闭） | 4 评论
- **重要性**: `shell-quote@1.8.3`（GHSA-w7jw-789q-3m8p, CVE-2026-9277）和 `simple-git@3.28.0`（GHSA-jcxm-m3jx-f287, CVE-2026-28292）均存在公开漏洞。该 Issue 关闭是因为对应 PR（#29094, #29095）已合入。
- **社区反应**: 体现社区对供应链安全的敏感度，修复 PR 已被标记为 CRITICAL。

### 6. Shell command execution gets stuck with "Waiting input" after command completes
- **编号**: [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Priority P1 | 4 评论 | 👍 3
- **重要性**: Shell 命令已执行完毕但 UI 仍卡在 "Awaiting user input"。这个问题会严重阻塞自动化工作流，是 Agent 执行循环中的一个关键卡点。
- **社区反应**: 多个用户遇到，👍 数较高，维护者已跟踪该问题。

### 7. ui.errorVerbosity = "full" does not display retry progress indicators
- **编号**: [#28340](https://github.com/google-gemini/gemini-cli/issues/28340) | Priority P1 | 5 评论
- **重要性**: 在连接失败重试时，即使设置 `errorVerbosity: "full"`，UI 也不显示 "Trying to reach..." 的进度提示，导致用户无法判断 CLI 是否仍在工作。
- **社区反应**: 用户提供了详细的复现描述和日志诊断，维护者标记为 `effort/small`，修复难度预期不高。

### 8. Implement global Gemini Code Assist for individuals Privacy setting
- **编号**: [#21185](https://github.com/google-gemini/gemini-cli/issues/21185) | Priority P2 | 9 评论
- **重要性**: 用户希望有全局（per Google account）的隐私开关，控制是否允许 Google 使用数据改进产品。目前每次都要在容器镜像中手动选择，体验不佳。
- **社区反应**: 讨论持续近半年，维护者仍在评估中。

### 9. gemini-cli installations done through brew having Keychain perpetually unavailable
- **编号**: [#25864](https://github.com/google-gemini/gemini-cli/issues/25864) | Priority P2 | 4 评论
- **重要性**: 通过 Homebrew 安装的 gemini-cli 无法访问 Keychain 存储敏感变量，回退到文件存储；而 npm 安装则无此问题。平台差异影响用户信任度。
- **社区反应**: 已标记 `Stale`，但仍在开放中，有 Homebrew 用户持续关注。

### 10. Log in problems / invalid_grant
- **编号**: [#25119](https://github.com/google-gemini/gemini-cli/issues/25119) / [#29069](https://github.com/google-gemini/gemini-cli/issues/29069) | 均 Priority P1 | 共 10 评论
- **重要性**: 登录 Google 账号后立即显示无法登录 / `invalid_grant` 错误（code 41），影响用户正常使用。属于 P1 级阻断性问题，虽已关闭但仍值得关注历史解法。
- **社区反应**: 用户上报时附带了 `gemini /about` 信息，维护者通常会要求导出的 JSON 日志。

---

## 重要 PR 进展（Top 10）

### 1. fix: upgrade simple-git to 3.32.3 (CVE-2026-28292)
- **编号**: [#29094](https://github.com/google-gemini/gemini-cli/pull/29094) | 已关闭 | CRITICAL
- **内容**: 将 `simple-git` 从 3.28.0 升级到 3.32.3，修复 trivy 扫描出的 CRITICAL 级别漏洞 CVE-2026-28292。
- **意义**: 消除供应链风险，与 Issue #28139 联动关闭。

### 2. fix: upgrade shell-quote to 1.8.4 (CVE-2026-9277)
- **编号**: [#29095](https://github.com/google-gemini/gemini-cli/pull/29095) | 已关闭 | CRITICAL
- **内容**: 将 `shell-quote` 从 1.8.3 升级到 1.8.4，修复 CVE-2026-9277。
- **意义**: 与 simple-git 修复共同响应社区对安全公告的关切。

### 3. fix(cli): keep useInputHistoryStore state updaters pure
- **编号**: [#29098](https://github.com/google-gemini/gemini-cli/pull/29098) | 已关闭 | Priority P1/P2
- **内容**: 修复 `useInputHistoryStore.addInput()` 在 React 状态 updater 内部

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-09-10**

---

## 1. 今日速览

- 过去 24 小时无新版本发布，项目仍处于高频迭代阶段。
- 社区关注焦点集中在三个方向：**主题渲染适配**（#135、#3773）、**Windows 平台会话管理缺陷**（#4756），以及 **native 工具稳定性**（#4535、#3976）。
- 高赞新 Issue #4756（Windows 需归档旧会话才能新建）以 19 👍 成为今日最受社区共鸣的问题。

---

## 2. 版本发布

过去 24 小时内无新版本 Release。

---

## 3. 社区热点 Issues

以下按讨论热度与社区影响力选取 10 个值得关注的 Issue：

**#4756 — Windows 上每新建会话都要求先归档所有空闲项目会话**
- 作者：@TomHarveyBCM | 评论 7 条 | 👍 19
- 作为今日最新且高赞的问题，Windows 用户在切换到已有项目时会话创建直接失败（`invalid argument`），严重阻塞日常开发流程。
- https://github.com/github/copilot-cli/issues/4756

**#135 — Light theme doesn't work**
- 作者：@saintwinkle | 评论 12 条 | 👍 12
- 长期未决的老问题：浅色终端下主题无法正常显示，至今已持续近一年，社区反复催办，已成为主题适配的典型代表。
- https://github.com/github/copilot-cli/issues/135

**#4535 — `store_memory` 在 v1.0.81 预发布版中失败：`Instance id is required`**
- 作者：@DavidTeju | 评论 8 条 | 👍 1
- 上下文记忆核心功能在 1.0.81 prerelease 中全面失败，native memory writer 缺少必需实例 ID，影响 agent 长期记忆能力。
- https://github.com/github/copilot-cli/issues/4535

**#2147 — CAIP 400: input item ID does not belong to this connection**
- 作者：@crgarcia12 | 评论 6 条 | 👍 1
- 已关闭但影响面广的 WebSocket 连接错误，发生在 `gpt-5.4 (xhigh)` 模型下，预计与连接复用/会话状态管理有关。
- https://github.com/github/copilot-cli/issues/2147

**#3773 — Broken light theme**
- 作者：@karnull | 评论 4 条 | 👍 4
- 与 #135 同源的另一主题问题：用户输入区黑底白字对比度极低，选区高亮也不可见，严重影响浅色主题下的可用性。
- https://github.com/github/copilot-cli/issues/3773

**#3976 — native `tgrep` indexer 在大型 monorepo 上 OOM-kill 整个主机**
- 作者：@reillysiemens | 评论 3 条 | 👍 0
- tgrep 三字母索引器无内存上限，在大型仓库中直接耗尽主机内存。对 monorepo 用户而言是致命缺陷，需增加资源上限或回退 ripgrep。
- https://github.com/github/copilot-cli/issues/3976

**#3700 — 1.0.60 WSL2 回归：CLI 空闲时主线程 CPU 占用 215%，TUI 冻结**
- 作者：@neerajdixit-msft2 | 评论 3 条 | 👍 2
- 高严重度回归：每次全新会话复现，空闲状态下 CPU 飙高且输出不再刷新，直至重启。属于 #2208 的回归，WSL2 用户受影响极大。
- https://github.com/github/copilot-cli/issues/3700

**#4757 — `--yolo`/`--allow-all` 被 fail-closed 策略误杀，且策略为 absent 时依然生效**
- 作者：@jordanms | 评论 3 条 | 👍 0
- 在无任何托管策略的账户上，CLI 仍默认 fail-closed 并禁用 bypass 权限模式，且整个会话不可解除。权限逻辑存在明显 bug。
- https://github.com/github/copilot-cli/issues/4757

**#2199 — 建议支持 Ctrl+Backspace 删除整词**
- 作者：@billkris-ms | 评论 3 条 | 👍 7
- 高赞功能请求：主流编辑器均支持 Ctrl+Backspace，CLI 输入框应补齐该快捷键，提升文本编辑效率。
- https://github.com/github/copilot-cli/issues/2199

**#1467 — 应默认恢复上次会话，或询问是否恢复**
- 作者：@akrantz | 评论 3 条 | 👍 1
- 重启后丢失会话上下文，且多个相近时间的会话难以区分。社区期望 CLI 提供会话恢复或明确提示，改进连续工作流。
- https://github.com/github/copilot-cli/issues/1467

---

## 4. 重要 PR 进展

过去 24 小时仅 1 个 PR 更新，为文档修订，无代码功能变更：

**#4786 — Revise notice regarding third-party services**
- 作者：@nkasuku | 创建：2026-09-09
- 更新第三方服务使用说明，澄清访问要求与条款。对不关心文档的开发者影响较小。
- https://github.com/github/copilot-cli/pull/4786

> 整体而言，近期 PR 合并节奏似乎放缓，社区大量 Issue 集中爆发可能与新版本迭代引入的回归有关。

---

## 5. 功能需求趋势

从近期 Issue 中可提炼出以下社区最关注的功能方向：

- **主题自定义与可访问性**
  - 浅色主题失效（#135、#3773）持续被吐槽。
  - 用户希望“固定 GitHub 主题为深色/浅色”，不受系统外观联动影响（#4620）。
  -

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-09-10）

## 今日速览
过去 24 小时无新版本发布，社区共更新 4 个 Issue 和 1 个 PR。重点关注两个新问题：macOS 上 `/login` 设备认证在浏览器批准后返回 HTTP 500，以及 Windows Terminal 中阿拉伯语文本顺序反转；另有一个修复抓取内容重复的 PR 被关闭。

## 版本发布
无新版本发布。

## 社区热点 Issues
过去 24 小时共更新 4 条 Issue，以下为全部条目：

### 🔴 登录认证故障（严重）
- **[#2638] /login device auth fails with HTTP 500 after successful browser approval**  
  更新于 2026-09-09 | 作者: @milesbuckton | [链接](https://github.com/MoonshotAI/kimi-cli/issues/2638)  
  CLI v0.42.0，浏览器同意设备码后 CLI 返回 HTTP 500，且 VS Code 扩展同样可复现。认证链路直接阻塞正常使用，属高优先级问题。

### 🟡 国际化文本渲染异常
- **[#2639] Arabic (RTL) text is character-reversed**  
  更新于 2026-09-09 | 作者: @lyesmke-png | [链接](https://github.com/MoonshotAI/kimi-cli/issues/2639)  
  交互提示和聊天响应中，阿拉伯语文本与拉丁字符混排时逐字符反转，影响 RTL 语言用户，说明终端/渲染层对双向文本支持不足。

### 🟢 IDE 扩展体验优化
- **[#1270] VSCode 扩展：输入 @ 后应优先显示已打开文件**  
  更新于 2026-09-09 | 作者: @ljyfree | [链接](https://github.com/MoonshotAI/kimi-cli/issues/1270)  
  用户期待在对话框中输入 @ 时，优先展示当前 VSCode 已打开的文件，因为大多数场景是分析当前文件。该需求反映 IDE 集成对上下文感知能力的期待。

### 🟢 Web 端引用回复功能
- **[#2601] Quote & Reply：选择 AI 回答片段进行评论**  
  更新于 2026-09-09 | 作者: @topit | [链接](https://github.com/MoonshotAI/kimi-cli/issues/2601)  
  希望支持对 AI 回复中的任意文本片段进行引用并继续追问，提升复杂任务中的交互精度。该需求对未来多轮对话和代码审查场景有参考价值。

## 重要 PR 进展
过去 24 小时更新 1 条 PR，全量收录：

- **[#1863] fix(fetch): suppress duplicated extracted comment text**  
  更新于 2026-09-09 | 作者: @SherlockShemol | [链接](https://github.com/MoonshotAI/kimi-cli/pull/1863)  
  修复 `FetchURL` 中 HTML 提取导致的重复内容问题。切换为将 Trafilatura 主体文本与评论分开检查，当评论规范化后与正文一致时自动抑制，并补充了 GitHub Issue 抓取重复内容的回归测试。该修复可提升抓取网页时的内容清爽度。

## 功能需求趋势
从当前 Issue 数据可提炼出几个社区关注方向：

- **IDE 集成**：vscode 扩展的上下文感知（如优先显示打开文件）仍是核心诉求，说明开发者希望 CLI 与编辑器协作更自然。
- **认证与稳定性**：设备登录流程可靠性成为痛点，任何 HTTP 层错误都会直接打断工作流。
- **国际化支持**：RTL 语言文本渲染需要重视，更多非拉丁语系用户正在进入社区。
- **交互精度**：引用回复 / 选择特定文本继续对话，是长对话场景下的高价值需求。

## 开发者关注点
- 认证流程一旦出错，没有任何降级或重试路径，用户被迫反复尝试，对体验伤害最大。
- VS Code 扩展的智能联想还停留在 "能列出文件" 层面，距离 "理解当前上下文" 还有差距。
- 阿拉伯语等 RTL 文本的显示问题意味着终端渲染层需要补充双向文本算法（BiDi）支持。
- 内容抓取去重等细节优化正在持续进行，社区对输出质量的要求也在细化。

---
*数据来源：github.com/MoonshotAI/kimi-cli，统计时间截至 2026-09-10。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-10

## 今日速览

今日发布了 v1.18.30 补丁版本，主要为 GPT-6 模型新增 Astra system prompt，并修复了 Bedrock DeepSeek 模型 ID 解析及 Azure/OpenAI provider SDK 兼容性问题。社区讨论热度集中在 Windows ARM64 原生 TUI 崩溃、配置热重载诉求以及 Agent 并行协作设计；PR 侧则有 models.dev 容错、会话压缩钩子等多个值得关注的修复与新功能。

---

## 版本发布

### v1.18.30
- **Core 改进**：为 GPT-6 模型添加 Astra system prompt。
- **Bug 修复**：
  - 保留 Bedrock DeepSeek 模型 ID（包括基于 ARN 的 ID），确保正确解析（@YeEmrick）。
  - 更新 Azure provider SDK，合入兼容性修复。
  - 更新 OpenAI provider SDK，合入兼容性修复。

---

## 社区热点 Issues

### 1. Windows ARM64 原生 TUI 无法初始化（#19130）
**作者**: @Carliquiss | 评论: 23 | 👍: 13 | 状态: OPEN  
Windows 11 ARM64 上原生 ARM64 二进制可执行非交互命令，但 TUI 启动时因 `bun:ffi dlopen TinyCC` 错误崩溃。平台兼容性阻塞问题，社区讨论活跃。  
🔗 https://github.com/anomalyco/opencode/issues/19130

### 2. [Feature] 热重载 agents、skills 和 commands（#8751）
**作者**: @IgorWarzocha | 评论: 23 | 👍: 97 | 状态: OPEN  
要求 OpenCode 运行期间支持配置失效与重载，便于用户动态创建/编辑 agent 和 skill 而无需重启。97 个 👍 表明该需求是社区最强烈呼声之一。  
🔗 https://github.com/anomalyco/opencode/issues/8751

### 3. 通用 UI Intent 通道：跨客户端插件驱动 UX（#6330）
**作者**: @malhashemi | 评论: 21 | 👍: 9 | 状态: OPEN  
建议在 server-client 协议中增加通用 "UI intent" 事件类型，让服务端和插件能跨客户端推动 UI 行为，扩展插件生态的 UI 能力边界。  
🔗 https://github.com/anomalyco/opencode/issues/6330

### 4. `@` 文件提及不包含启动后新建的文件（#32747）
**作者**: @ovftank | 评论: 16 | 👍: 14 | 状态: OPEN  
新文件在 OpenCode 重启前不会出现在 `@` 文件选择器中，疑似 TUI 搜索状态陈旧。影响日常文件引用效率，社区反馈明确。  
🔗 https://github.com/anomalyco/opencode/issues/32747

### 5. Agent Teams：扁平团队 + 命名消息 + 多模型 + TUI 集成（#12711）
**作者**: @ugoenyioha | 评论: 15 | 👍: 23 | 状态: OPEN  
现有 `task` 工具只能串行生成子代理，无法并行协作或相互通信。该设计提案瞄准多文件重构、研究+实现等复杂场景，是 Agent 编排方向的重要讨论。  
🔗 https://github.com/anomalyco/opencode/issues/12711

### 6. Cloudflare 环境变量触发 `Provider.list` 崩溃（#42739）
**作者**: @mindofcharles | 评论: 5 | 👍: 0 | 状态: OPEN  
当环境中存在 Cloudflare 变量但缺少 `CLOUDFLARE_API_TOKEN` 时，TUI 启动即崩溃，报 “Unexpected server error”。属于环境敏感型启动崩溃。  
🔗 https://github.com/anomalyco/opencode/issues/42739

### 7. Plan 模式可通过 bash 写入/编辑文件（#39491）
**作者**: @HenFo | 评论: 5 | 👍: 0 | 状态: OPEN  
模型在 Plan 模式下虽然无法使用 write-tool，但可以退化为 bash `cat > file` 写文件，绕过了 Plan 模式的限制。涉及权限边界与模式强制，值得关注。  
🔗 https://github.com/anomalyco/opencode/issues/39491

### 8. 无会话时 auto-accept 开关不可用（#48237）
**作者**: @johnhenry030888 | 评论: 4 | 👍: 0 | 状态: OPEN  
Settings → General 中的 auto-accept 权限开关在没有打开会话时置灰，原因是权限控制器仅从会话谱系解析目录。作者已附上根因分析和修复设计。  
🔗 https://github.com/anomalyco/opencode/issues/48237

### 9. macOS 无法连接局域网 Ollama，curl 正常（#38854）
**作者**: @X-citizen-snips-X | 评论: 3 | 👍: 1 | 状态: OPEN  
OpenCode 1.18.0/1.18.5 在 macOS 上无法直连同一局域网内的 Ollama 服务，但 curl 访问完全正常，指向客户端网络栈或配置处理差异。  
🔗 https://github.com/anomalyco/opencode/issues/38854

### 10. OpenCode Zen 无法修改/删除邮箱（#18654）
**作者**: @bybpow | 评论: 7 | 👍: 16 | 状态: OPEN  
用户更换 GitHub 邮箱后在 OpenCode Zen 中出现重复用户，且无任何入口可修改或删除邮箱，影响账号管理的核心功能。  
🔗 https://github.com/anomalyco/opencode/issues/18654

---

## 重要 PR 进展

### 1. models.dev 不可达时回退到空目录（#48002）
**作者**: @Luan-Fuzi | 状态: OPEN  
首次运行且无缓存目录时，`ModelsDev.populate()` 以 `Effect.orDie` 结束；网络超时即崩溃。此 PR 让模型目录拉取失败时回退空目录，解决冷启动崩溃。  
🔗 https://github.com/anomalyco/opencode/pull/48002

### 2. 插件新增会话压缩与生成钩子（#48212）
**作者**: @rekram1-node | 状态: OPEN  
为 `session.compaction` 和 transient generation 增加独立插件钩子，插件可区分四类请求流，不再需要解析消息内容判断上下文类型。  
🔗 https://github.com/anomalyco/opencode/pull/48212

### 3. 消息日志器：可配置 LLM 请求/响应日志（#43165）
**作者**: @bornmw | 状态: OPEN  
新增 `experimental.log_messages` 配置（`info`/`debug`/`trace`），支持 LLM 请求与响应日志记录，闭环 #29186。对调试和可观测性有直接价值。  
🔗 https://github.com/anomalyco/opencode/pull/43165

### 4. 修复 Mantle GPT-OSS 多轮对话回放（#48251）
**作者**: @rekram1-node | 状态: OPEN  
修复 Bedrock Mantle 上 `openai.gpt-oss-120b` / `openai.gpt-oss-20b` 的多请求对话问题，其 Responses backend 需要特殊处理。  
🔗 https://github.com/anomalyco/opencode/pull/48251

### 5. 修复 HTTP SSE 流未生效的 chunkTimeout（#48158）
**作者**: @holny | 状态: OPEN  
`chunkTimeout` 此前在 provider 设置中被接受但原生路径从未读取，`HttpOptions` 也无此字段。此 PR 补齐实现，修复 #46692。  
🔗 https://github.com/anomalyco/opencode/pull/48158

### 6. 保持 workspace 标签页视图存活（#48255）
**作者**: @Hona | 状态: CLOSED  
修复 #48223 引入的回归：切换 workspace 后重新访问已加载标签页可能白屏直到重启。通过复用渲染视图 + 非活跃视图守卫解决。  
🔗 https://github.com/anomalyco/opencode/pull/48255

### 7. 限制 summary diff 体积并裁剪陈旧事件（#48245）
**作者**: @johnhenry030888 | 状态: CLOSED  
`SessionSummary.summarize` 每次运行都会把完整 worktree diff 写入消息并发布事件，长会话可达 1063 个事件 / 5.8GB。此 PR 对 diff 进行上限控制并裁剪被取代的 MessageUpdated 事件。  
🔗 https://github.com/anomalyco/opencode/pull/48245

### 8. API

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-10

## 今日速览

昨日发布正式版 v0.23.2，重点改进 Web Shell 分屏会话导航；与此同时，Windows 平台 `conhost.exe` 进程泄漏问题（#11303）持续发酵，社区讨论热度最高，官方已拆分独立 Issue 跟踪并提交修复 PR。此外，多个 P1 级问题（如扩展升级丢失会话历史、TUI 静默崩溃）受到广泛关注，开发者对 Windows 稳定性和 daemon 后台可靠性的呼声明显上升。

## 版本发布

### v0.23.2（正式版）
- **主要更新**：改进 Web Shell 分屏视图的会话导航体验（[#11250](https://github.com/QwenLM/qwen-code/pull/11250)）
- 无已知 Breaking Changes。

### v0.23.2-nightly.20260909.2e212144d3
- 包含对 checkpoint 超支预算重试机制的修复（[#11365](https://github.com/QwenLM/qwen-code/pull/11365)）

### sdk-typescript-v0.1.11
- 捆绑 CLI 版本：0.23.2。发布说明同时包含对 CLI 0.23.1 的引用，部分内容存在重复，疑似兼容多版本描述。

### cua-driver-rs-v0.20.5
- CUA Driver 预编译二进制更新：macOS 提供已签名公证的通用二进制 + `.app`；Linux 提供 x86_64/arm64（glibc 2.31 起步）；Windows 提供 UIAccess worker + 原生 SDK 负载。

## 社区热点 Issues（10 个）

1. **[P1] Windows 下 qwen-cli 泄漏 headless conhost.exe 进程 — 12 小时积累 347 个子进程 / 2.8 GB 内存**
   作者观察到一个 qwen-cli 进程在约 12 小时内积累了大量 ConPTY 进程且从未释放，Windows 用户受影响严重。该 Issue 引出后续 #11352 拆分跟踪，社区讨论热度最高。（[#11303](https://github.com/QwenLM/qwen-code/issues/11303)，12 评论）

2. **[P1] serve 模式后台 shell 输出与唤醒通知被静默丢弃，导致会话卡死**
   在 daemon 托管的 Web Shell 会话中，`run_shell_command` 启动的后台轮询任务持续产出，但所属轮次结束后输出全部丢失，最终整个会话被卡住。涉及会话生命周期管理和 daemon 可靠性，10 条评论。（[#11119](https://github.com/QwenLM/qwen-code/issues/11119)，10 评论）

3. **[P1] VS Code 扩展从 v0.21.x 升级到 v0.23.x 后所有会话历史丢失**
   会话仍存在于 `state.vscdb` 中，但新版本不再读取旧数据。升级路径数据兼容性严重问题，影响面大。（[#11489](https://github.com/QwenLM/qwen-code/issues/11489)，4 评论）

4. **[P1] 多个后台代理完成时 TUI 静默退出（React #185 未捕获异常）**
   Ink 布局监听器的 `setState` 循环导致交互式终端界面直接崩溃退出，恢复后提示"上一个会话似乎未正常结束"。（[#11500](https://github.com/QwenLM/qwen-code/issues/11500)，3 评论）

5. **[P1] node-pty 在自然 shell 退出时泄漏 ConPTY host — 关键依赖缺陷**
   从 #11303 分裂出的独立跟踪 Issue：`@lydell/node-pty` 中 baton 在 `onExit` 前被擦除，导致 JS 侧无法调用 `ClosePseudoConsole`，被标记为 blocked（依赖上游修复）。（[#11352](https://github.com/QwenLM/qwen-code/issues/11352)，4 评论）

6. **[P2] daemon 守卫因 .git 元数据目录为 junction/symlink 而拒绝工作区自身的仓库命令**
   即使只读命令（`git status`/`git log`/`git diff`）也会被全部拒绝，影响 Windows + NTFS 链接场景下的正常开发。（[#11503](https://github.com/QwenLM/qwen-code/issues/11503)，3 评论）

7. **[P2] ACP 断连：关闭宽限期小于 CLI 支持的关闭时间，且 POSIX 下无可捕获的层级**
   从 #11102 评审中分裂出的独立 Issue，要求产品决策层明确连接断开时的处理策略，涉及 VS Code 集成稳定性。（[#11510](https://github.com/QwenLM/qwen-code/issues/11510)，2 评论）

8. **[P1] ECS runner 集群更新失败，多个池停留在旧版本 qwen**
   自动化 bot 上报 CI 基础设施问题：目标版本 0.23.1，多个 ECS 池未完成更新，影响 CI 一致性。（[#11403](https://github.com/QwenLM/qwen-code/issues/11403)，4 评论）

9. **[P2] vscode-ide-companion 在导航时强制关闭被取代的会话，丢弃进行中的工作**
   评审中提出的产品决策问题：`closeSupersededSession` 在会话切换时直接关闭旧会话，可能导致未完成的后台工作丢失。（[#11511](https://github.com/QwenLM/qwen-code/issues/11511)，2 评论）

10. **[P2] 被拒绝的工具模式过于绝对，导致模型完全不再使用该工具**
   当工具因特定 pattern 被拒绝时（如 `Bash(npm view *)`），错误提示过于严格，模型误以为整个工具被全面禁用，影响工具调用策略。（[#11405](https://github.com/QwenLM/qwen-code/issues/11405)，3 评论，已关闭）

## 重要 PR 进展（10 个）

1. **[Windows] 通过捆绑 ConPTY 修复 conhost.exe 孤儿进程**
   `#11497` 让 node-pty 加载 `@lydell/node-pty` 自带的 `conpty.dll`，而非 Windows 内置 ConPTY 后端。实测 30 条命令产生 0 个孤儿进程，直接针对 #11303 的核心修复。（[#11497](https://github.com/QwenLM/qwen-code/pull/11497)）

2. **[后台自动化] Web Shell 提案在所属轮次结束后自动启动**
   `#11360` 在现有 Allow/Reject 面板基础上，允许用户批准后在其轮次正常结束时自动启动 Goal 首个工作轮次，是 #11284 之后的第二层实现。（[#11360](https://github.com/QwenLM/qwen-code/pull/11360)）

3. **[集成] 通过 ACP 将子代理轮次委托给外部代理（优先支持 Claude Code）**
   `#11003` 为子代理定义增加 `executor` 块，将回合驱动到外部进程，所有操作重新发布为子代理事件，是扩展生态互操作性的重要一步。（[#11003](https://github.com/QwenLM/qwen-code/pull/11003)）

4. **[稳定性] 对无 HTTP 状态码的上游错误进行重试而非结束回合**
   `#11291` 修复通过 SSE 流返回 200 后由网关推送错误对象的场景，此前此类错误会导致回合直接终止。（[#11291](https://github.com/QwenLM/qwen-code/pull/11291)）

5. **[后台自动化] 为后台代理增加停滞超时看门狗**
   `#11270` 为普通后台 Agent 增加 15 分钟模型/控制停滞超时 + 10 分钟单个工具执行超时，防止后台任务无限挂起。（[#11270](https://github.com/QwenLM/qwen-code/pull/11270)）

6. **[Web Shell] 用户消息中的 URL 渲染为可点击链接**
   `#11464` 补齐了用户消息与助手消息（markdown 渲染）之间的链接交互一致性，提升 Web Shell 日常可用性。（[#11464](https://github.com/QwenLM/qwen-code/pull/11464)）

7. **[评审效率] 聚焦自动静态导航评审**
   `#11456` 将小型静态文档导航变更的自动评审收敛为单一聚焦评审者，并要求变更与发现缺陷之间有明确的因果链，减少误报。（[#11456](https://github.com/QwenLM/qwen-code/pull/11456)）

8. **[Web Shell] 会话工作流依赖关系可导航化 + 界面精简**
   `#10938` 完善会话工作流计划 DAG 的导航、形态与文档缺口，让计划图以"步骤"而非"状态"为先导。（[#10938](https://github.com/QwenLM/qwen-code/pull/10938)）

9. **[Web Shell] 显示 Shell 与监控任务输出**
   `#10906` 将 Shell 和 Monitor 的 stdout/stderr 持久化，并通过 daemon 暴露会话所有者作用域的尾部输出端点，任务详情面板可直接查看实时输出。（[#10906](https://github.com/QwenLM/qwen-code/pull/10906)）

10. **[文档] 新增 REST API 集成入口文档，附契约测试防过期**
    `#11477` 新增 `docs/developers/rest-api-integration.md`，回答"如何通过 HTTP 将 Qwen Code 集成到产品中"，并通过契约测试保证文档不随时间失真。（[#11477](https://github.com/QwenLM/qwen-code/pull/11477)）

## 功能需求趋势

从近 24 小时的 Issues 和 PR 中可以提炼出以下几个社区最关注的方向：

- **Windows 稳定性与进程治理**：`conhost.exe` 泄漏、PTY 生命周期、junction/symlink 支持等问题占据多个 P1/P2 Issue，Windows 平台是当前稳定性短板。
- **后台自动化与 daemon 可靠性**：后台 shell 输出保持、后台代理超时看门狗、Web Shell 提案自动启动、会话回收不丢工作，说明用户对"无人值守"运行场景的需求日益增长。
- **远程开发与多机协作**：`#11475` 提出"远程文件夹"功能——客户端本地运行、daemon 远程执行，基于现有 Web Shell 和会话 API 扩展，是明确的路线图信号。
- **Web Shell 交互完善**：URL 可点击、任务输出可读、依赖关系可导航、窄宽度布局修复等，Web 端正在快速补齐桌面级体验。
- **会话持久化与记忆**：`#11433` 发起 SQLite 存储 Session/Prompt 索引的设计讨论，`#11502` 询问跨会话持久记忆能力（MemCode 提议作为可选记忆层），长期记忆与检索是社区关注的新方向。
- **外部代理/模型生态集成**：通过 ACP 委托子代理给 Claude Code、支持 OpenAI Responses API 等 PR/Issue 持续活跃，生态互操作需求明确。

## 开发者关注点

- **Windows 资源泄漏是最大的痛点**：`#11303`（conhost.exe 进程/内存泄漏）从发现到产生专门 PR（#11497）仅 2 天，但 #11352 中暴露的 node-pty 上游缺陷仍需依赖方解决，修复路径仍不明朗。
- **升级可能导致数据丢失**：`#11489` 扩展升级后会话历史不可见是最严重的数据类问题，开发者对升级路径的数据迁移测试期待更高。
- **后台任务可靠性需加强**：多个 Issue 反映后台 shell 输出丢失、TUI 崩溃、会话切换丢弃进行中工作，说明"长时间无人值守"场景已成为核心使用方式，可靠性直接影响信任度。
- **网络错误处理需更智能**：开发者希望将 EOF、无状态码错误等识别为可重试的传输层错误（而非直接终止回合），这对不稳定网络环境下的使用体验至关重要。
- **工具权限策略粒度**：deny pattern 语义过强导致模型放弃整个工具，开发者需要更细粒度的权限反馈，让模型理解"是某个 pattern 被拒绝，而非工具本身"。

---

*数据来源：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | 统计周期：2026-09-09 至 2026-09-10*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*