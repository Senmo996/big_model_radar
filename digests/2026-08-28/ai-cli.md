# AI CLI 工具社区动态日报 2026-08-28

> 生成时间: 2026-08-28 07:44 UTC | 覆盖工具: 7 个

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

以下是基于 2026 年 8 月 28 日各主流 AI CLI 工具社区动态的横向对比分析报告：

### 1. 生态全景
当前 AI CLI 工具生态正从单一代码补全向多代理编排、企业级安全隔离及全平台（桌面/Web/IDE）融合演进。各厂商底层架构进入高频重构期，如 Rust 核心迭代与 TUI 渲染层自研迁移，以支撑更复杂的自动化工作流。同时，跨平台稳定性（尤其是 Windows）与长会话资源管理（如内存泄漏、流式超时）成为各工具亟待跨越的工程瓶颈。MCP（模型上下文协议）生态的深度集成与规范化已成为行业标配，但工具数量爆炸带来的上下文管理挑战初现端倪。

### 2. 各工具活跃度对比

| 工具名称 | 今日版本发布 | Issues 数量 | PR 数量 | 核心动态焦点 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | 2个 (v2.1.248, v2.1.250) | 10 | 未详述 | 引入 `--restricted` 安全模式；模型文本风格退化反馈 |
| **OpenAI Codex** | 3个 (alpha.6-8) | 10 | 10 | Rust 核心高频迭代；TUI 向 app-server v2 架构迁移 |
| **Gemini CLI** | 1个 (v0.59.0-nightly) | 10 | 2+ | 子代理稳定性修复；Auto Memory 隐私安全讨论 |
| **Copilot CLI** | 2个 (v1.0.81, v1.0.82-0) | 10 | 未详述 | 插件仪表盘发布；新版本引发多项兼容性回归与 OOM |
| **Kimi Code CLI** | 0 | 6 | 3 | K3 模型 Plan mode 死循环；API 工具调用容错性 |
| **OpenCode** | 2个 (v1.18.24-25) | 未详述 | 未详述 | 修复 Bedrock 推理缓存失效 |
| **Qwen Code** | 1个 (v0.22.2-nightly) | 10 | 8 | TUI 向 OpenTUI 架构迁移；流式安全防护补齐 |

### 3. 共同关注的功能方向

*   **跨平台稳定性（特别是 Windows 支持）**：`Claude Code`（跨会话通信失败、斜杠命令补全失效）、`OpenAI Codex`（无头模式白屏、沙箱路径异常、更新继承环境变量报错）、`Copilot CLI`（快捷键行为不符）均报告了严重的 Windows 平台退化问题。
*   **底层架构重构与 TUI 性能优化**：`OpenAI Codex` 推进 TUI 向 app-server v2 协议迁移；`Qwen Code` 致力于将 TUI 渲染层从 `ink` 迁移至自研 `OpenTUI` 以解决闪烁和渲染瓶颈；`Copilot CLI` 推出插件仪表盘统一管理界面。
*   **Agent 控制流与长任务稳定性**：`Gemini CLI`（子代理无限挂起、误报成功）、`Kimi Code`（Plan mode 死循环）、`Claude Code`（后台 Bash 任务被静默终止）、`Copilot CLI`（事件存储耗尽引发重试风暴与 OOM）均反映出在复杂自动化任务中，Agent 的生命周期管理与资源回收机制仍不完善。
*   **MCP 生态集成与治理**：`Copilot CLI` 全面升级至 MCP 2026-07-28 规范但引发兼容性回归；`Claude Code` 呼吁企业级 MCP Server 注册中心发现机制；`Qwen Code` 修复 Web Shell 中 MCP Apps 内联 UI 渲染问题。

### 4. 差异化定位分析

*   **Claude Code**：侧重于**企业级安全与自动化隔离**。通过 `--restricted` 模式严格限制文件操作和工具权限，精准切入 CI/CD 等高风险自动化场景。
*   **OpenAI Codex**：侧重于**底层性能与跨端体验**。Rust 核心高频迭代，注重沙箱兼容性、凭证刷新可见性及多轮语音对话的来源追踪，技术底座打磨较深。
*   **Gemini CLI**：侧重于**多代理调度与原生能力**。探索 OS 级零依赖沙箱与 AST 感知文件读取，试图在不妥协安全的前提下最大化模型原生工具链能力。
*   **GitHub Copilot CLI**：侧重于**生态整合与企业级可观测性**。推出插件仪表盘，将 Hooks 与 OpenTelemetry 结合，但当前受困于新版本带来的内存与兼容性回归。
*   **Kimi Code CLI**：侧重于**API 容错与本地化适配**。社区焦点集中在 API 严格校验带来的开发负担、IDE 原生交互优化及 AI 代码归因（`git-ai`）等协作规范。
*   **Qwen Code**：侧重于**多模态与架构解耦**。引入独立语音守护进程和多模态策略工具，同时大力推进核心类型系统与底层模型解耦，提升多供应商兼容性。

### 5. 社区热度与成熟度

*   **高频迭代与架构重塑期**：`OpenAI Codex`（单日 3 个 alpha 版 + 10 个 PR）和 `Qwen Code`（8 个核心 PR）处于底层架构剧烈重构阶段，社区对架构演进讨论深入，技术活跃度最高。
*   **功能扩张与阵痛期**：`Copilot CLI` 和 `Claude Code` 发布了重磅正式版功能（如插件仪表盘、安全模式），但随即引发大量兼容性、内存泄漏及模型风格退化的高热度讨论（单 Issue 评论破百），表明功能扩张带来了成熟度阵痛。
*   **稳定性攻坚期**：`Gemini CLI` 和 `Kimi Code CLI` 焦点集中在修复基础控制流（死循环、挂起）和 API 契约一致性，处于打磨产品可靠性的阶段。

### 6. 值得关注的趋势信号

1.  **安全隔离从“软询问”向“硬限制”演进**：`Claude Code` 的 `--restricted` 模式和 `Gemini CLI` 的 OS 级沙箱提议表明，业界认识到仅靠模型对齐和权限询问不足以保障自动化安全，物理级/系统级的执行隔离成为刚需。
2.  **TUI 渲染性能遭遇瓶颈**：`Qwen Code` 摒弃主流的 `ink/React` 架构转向自研 `OpenTUI`，暗示着在处理高频流式输出和复杂终端交互时，现有前端框架方案已达到性能极限。
3.  **MCP 工具过载引发上下文管理危机**：`Gemini CLI` 报告超过 128 个工具触发 API 400 错误。随着 MCP 生态爆发，如何进行智能工具作用域裁剪（AST 感知、按需加载）将成为下一阶段技术攻关重点。
4.  **AI 代码归因需求萌芽**：`Kimi Code` 社区提出 `git-ai` 标准支持，反映出随着 AI 生成代码比例激增，开发者开始要求在版本控制层面区分人工与 AI 贡献，这将对未来的代码审查和工程度量产生深远影响。

**对开发者的参考价值**：在选择 AI CLI 工具时，需评估其 Windows 端的成熟度及长会话内存管理能力；在构建自定义 Agent 时，必须对模型输出的工具调用参数进行严格的客户端判空处理（防 API 400 错误）；对于企业级 CI/CD 集成，应优先考察具备硬隔离安全模式的工具。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills | 数据截止：2026-08-28

---

## 一、热门 Skills 排行

> 注：当前 PR 评论数据缺失，以下排序综合关联 Issue 热度、更新频率与内容深度评定。

| # | Skill 名称 | 功能概述 | 社区讨论热点 | 状态 |
|---|-----------|---------|------------|------|
| 1 | **skill-creator eval 修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复 `run_eval.py` 始终报告 0% recall 的核心缺陷，涉及 eval artifact 安装、Windows 流读取、触发检测与并行 worker | 直接关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论 / 7 👍），社区 10+ 人独立复现，是 skill-creator 工具链最严重的阻断性 bug | OPEN |
| 2 | **skill-quality-analyzer & skill-security-analyzer** ([#83](https://github.com/anthropics/skills/pull/83)) | 两个元 Skills：质量分析器（5 维度评估）+ 安全分析器，用于审计 Skills 本身的质量与安全 | 与 Issue [#492](https://github.com/anthropics/skills/issues/492)（43 评论，全站最高）高度呼应——社区 skills 冒用 `anthropic/` 命名空间引发信任危机 | OPEN |
| 3 | **self-audit** ([#1367](https://github.com/anthropics/skills/pull/1367)) | 交付前审计 Skill：先机械验证文件存在性，再按损害严重度执行四维推理审计，通用适配任意技术栈 | 关联 Issue [#1385](https://github.com/anthropics/skills/issues/1385)（4 评论 / 1 👍）提出的三门推理质量管道提案，社区对"AI 自我验证"范式兴趣显著 | OPEN |
| 4 | **claude-api 模型退役更新** ([#1607](https://github.com/anthropics/skills/pull/1607)) | 将 4 个已退役模型 ID（opus-4-1、sonnet-4-0 等）从"活跃/弃用"重新标记为"退役" | 关联 Issue [#1487](https://github.com/anthropics/skills/issues/1487)（4 评论）：claude-api skill 单次注入 ~156k tokens 耗尽上下文窗口，模型列表过时是根因之一 | OPEN |
| 5 | **Hivemind 多智能体编排** ([#1628](https://github.com/anthropics/skills/pull/1628)) | 让 Claude Code 将机械工作委托给 headless opencode worker（免费模型），自身仅做规划/审查/合并 | 提出"昂贵模型上下文是稀缺资源"的核心论点，8 月最新提交，代表社区对**成本感知的多智能体**方向的探索 | OPEN |
| 6 | **ServiceNow 平台 Skill** ([#568](https://github.com/anthropics/skills/pull/568)) | 覆盖 ServiceNow 全栈：ITSM/ITOM/ITAM/FSM/HRSD/SPM/SecOps/IntegrationHub | 3 月创建持续更新至 8 月 12 日，是企业级平台集成类 PR 中生命周期最长、覆盖面最广的 | OPEN |
| 7 | **document-typography** ([#514](https://github.com/anthropics/skills/pull/514)) | 防止 AI 生成文档的排版问题：孤行、寡行段落、编号错位 | 填补文档生成质量控制的空白，与 Issue [#12](https://github.com/anthropics/skills/issues/12)（docx 空白格式化导致文档损坏）同类痛点 | OPEN |
| 8 | **ODT Skill** ([#486](https://github.com/anthropics/skills/pull/486)) | OpenDocument 格式创建、模板填充、ODT→HTML 转换 | 补齐开源/ISO 标准文档格式支持，与现有 docx/pdf skills 形成文档格式三件套 | OPEN |

---

## 二、社区需求趋势

从 15 条热门 Issues 中提炼出 **6 大需求方向**：

### 🔴 1. 安全与信任机制（最强烈）
- Issue [#492](https://github.com/anthropics/skills/issues/492)（**43 评论，全站第一**）：社区 skills 使用 `anthropic/` 命名空间冒充官方，用户可能在不知情下授予提权
- Issue [#412](https://github.com/anthropics/skills/issues/412)：提议 agent-governance skill（策略执行、威胁检测、信任评分、审计追踪）
- Issue [#1175](https://github.com/anthropics/skills/issues/1175)：在 SKILL.md 中写权限逻辑处理 SharePoint 文档的安全顾虑
- **趋势判断**：Skills 生态急需命名空间隔离 + 权限签名 + 来源验证机制

### 🟠 2. 组织级 Skill 共享与管理
- Issue [#228](https://github.com/anthropics/skills/issues/228)（16 评论 / 8 👍）：要求组织内直接共享 skill 库，而非手动传文件
- **趋势判断**：从个人使用向团队/企业级部署演进，需要共享库、权限管控、版本管理

### 🟡 3. skill-creator 工具链可靠性
- Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论 / 7 👍）：eval 脚本触发率 0%，优化循环在"优化噪声"
- Issue [#202](https://github.com/anthropics/skills/issues/202)（8 评论，已关闭）：skill-creator 读起来像开发文档而非操作指令
- Issue [#1390](https://github.com/anthropics/skills/issues/1390)（4 评论）：mcp-builder eval 对真实 MCP 服务器评分 0/N
- **趋势判断**：Skills 的元工具链（创建、评估、优化）本身质量是当前最大瓶颈，Windows 兼容性问题尤为突出（#1099、#1050 两条独立 PR 修复）

### 🟢 4. 上下文窗口管理
- Issue [#1487](https://github.com/anthropics/skills/issues/1487)：claude-api skill 单次注入 156k tokens 耗尽上下文
- Issue [#1329](https://github.com/anthropics/skills/issues/1329)（9 评论）：提议 compact-memory skill，用符号表示法压缩 agent 持久记忆
- **趋势判断**：随着 Skills 复杂度增长，token 预算管理成为核心需求——懒加载、压缩、按需注入

### 🔵 5. 企业平台集成
- ServiceNow（PR #568）、SharePoint（Issue #1175）、AWS Bedrock（Issue [#29](https://github.com/anthropics/skills/issues/29)，4 评论）
- **趋势判断**：社区期望 Skills 覆盖主流企业 SaaS/PaaS 平台，尤其关注跨云厂商兼容性

### 🟣 6. MCP 协议融合
- Issue [#16](https://github.com/anthropics/skills/issues/16)（4 评论）：提议将 Skills 暴露为 MCP 工具
- Issue [#1390](https://github.com/anthropics/skills/issues/1390)：mcp-builder skill 的 eval 框架对真实 MCP 服务器失效
- **趋势判断**：Skills 与 MCP 的边界正在模糊，社区探索双向互操作——Skills 调用 MCP、MCP 暴露 Skills

---

## 三、高潜力待合并 Skills

以下 PR 关联高热度 Issue、修复明确、更新活跃，近期合并概率较高：

| PR | 修复内容 | 合并信号 | 链接 |
|----|---------|---------|------|
| **#1298** | skill-creator eval 0% recall 核心修复 | 关联 #556（12 评论），10+ 人独立复现，阻断性 bug，6 月仍在更新 | [链接](https://github.com/anthropics/skills/pull/1298) |
| **#1607** | claude-api 标记 4 个退役模型 ID | 修复明确简单，关联 #1603，8 月 26 日刚更新 | [链接](https://github.com/anthropics/skills/pull/1607) |
| **#1602** | mcp-builder eval 序列化 + benchmark 指标 + 编码修复 | 关联 #1390（4 评论），修复多个可靠性 bug，8 月 24 日更新 | [链接](https://github.com/anthropics/skills/pull/1602) |
| **#538** | pdf skill 文件名大小写敏感修复（8 处） | 一行级修复，影响大小写敏感系统，4 月更新 | [链接](https://github.com/anthropics/skills/pull/538) |
| **#541** | docx skill 修复 w:id 冲突导致文档损坏 | 修复 OOXML 共享 ID 空间冲突，根因明确 | [链接](https://github.com/anthropics/skills/pull/541) |
| **#1367** | self-audit skill（机械验证 + 四维推理审计） | 关联 #1385 提案（4 评论），v1.3.0 已迭代，通用性强 | [链接](https://github.com/anthropics/skills/pull/1367) |

---

## 四、Skills 生态洞察

> **当前社区在 Skills 层面最集中的诉求是：建立信任与可靠性基础设施——从命名空间隔离与权限验证（安全信任），到 skill-creator eval 工具链修复（开发可靠性），再到上下文窗口预算管理（运行可靠性），社区正从"功能扩展期"进入"治理与质量期"。**

---

# Claude Code 社区动态日报 (2026-08-28)

## 1. 今日速览
今日 Claude Code 连续发布 v2.1.248 与 v2.1.250 两个版本，其中 v2.1.248 引入了备受关注的 `--restricted` 安全限制模式，大幅提升了自动化执行环境的安全性。社区方面，模型生成文本的风格退化问题持续发酵引发大量讨论，同时 Windows 平台的稳定性及跨会话通信机制成为开发者反馈的焦点痛点。

## 2. 版本发布
- **v2.1.250**：常规 Bug 修复与可靠性提升。
- **v2.1.248**：新增 `--restricted`（或环境变量 `CLAUDE_CODE_RESTRICTED=1`）启动模式。该模式移除了运行命令或代码的内置工具及 `WebFetch`（除非在 `--tools` 中显式指定），将文件操作严格限制在工作目录内，拒绝 `bypassPermissions`，并忽略用户、项目和本地设置文件。这对于 CI/CD 等自动化场景的安全隔离具有重要意义。

## 3. 社区热点 Issues
以下是今日社区最受关注的 10 个 Issue：

1. **[#77136](https://github.com/anthropics/claude-code/issues/77136) 模型生成文本风格退化** (👍395, 💬110)
   - **关注点**：开发者反馈 Claude 4.7 至 5.0 及 Fable 模型在生成文本时出现重复的修辞习惯，即使给出明确的风格指令也难以产出连贯的散文。该问题影响广泛，社区讨论极其热烈。
2. **[#32362](https://github.com/anthropics/claude-code/issues/32362) 请求支持 Zed IDE 集成** (👍52, 💬19)
   - **关注点**：社区呼吁官方为 Zed 编辑器提供类似 VS Code 和 JetBrains 的集成支持，目前 `/ide` 在 Zed 中无法识别。
3. **[#86014](https://github.com/anthropics/claude-code/issues/86014) 跨会话消息发送成功但未送达** (💬17)
   - **关注点**：Windows 平台上 `send_message` 跨会话通信存在严重 Bug，发送方显示成功，但接收方一直处于加载状态（0/4 delivery），阻碍多 Agent 协作。
4. **[#23704](https://github.com/anthropics/claude-code/issues/23704) Read 工具读取 PDF 存在未声明的依赖** (💬17)
   - **关注点**：Read 工具读取 PDF 依赖 `poppler-utils`，但文档未说明，且在常见的容器环境（如 `node:22-bookworm`）中默认缺失，导致功能静默失效。
5. **[#90002](https://github.com/anthropics/claude-code/issues/90002) UI 元数据污染导致 API 400 错误** (💬11)
   - **关注点**：Code tab 将 UI 渲染元数据（时间戳、标志位）写入了 transcript JSONL，导致不可恢复的 API 400 错误，且在完全清理后仍会复发。
6. **[#64633](https://github.com/anthropics/claude-code/issues/64633) 请求支持 MCP Server 注册中心发现** (💬6)
   - **关注点**：企业级功能需求。开发者希望 Claude Code 能连接企业内部的 MCP Server 目录，实现自动发现和连接，而非通过 Wiki/Slack 手动分享 URL。
7. **[#84625](https://github.com/anthropics/claude-code/issues/84625) 后台 Bash 任务被静默终止** (💬4)
   - **关注点**：使用 `run_in_background: true` 启动的长时间任务在运行中被静默杀死，无 OOM 报错也无用户操作记录，严重影响长耗时任务执行。
8. **[#90265](https://github.com/anthropics/claude-code/issues/90265) Trusted Devices 验证可被绕过** (💬2)
   - **关注点**：安全漏洞。撤销设备未能重新验证活跃会话，且用户拒绝“重新登录验证设备”时没有任何实际阻断效果。
9. **[#90179](https://github.com/anthropics/claude-code/issues/90179) Remote Control 应默认关闭** (💬2)
   - **关注点**：开发者发现 Remote Control 功能默认开启，认为这种远程控制通道作为默认配置存在安全隐患，强烈要求改为 opt-in。
10. **[#89628](https://github.com/anthropics/claude-code/issues/89628) Windows 桌面端斜杠命令自动补全失效** (💬3)
    - **关注点**：Windows 桌面应用 8 月 25 日更新后，斜杠命令自动补全出现严重退化：初始无下拉框，随后仅支持

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-08-28)

## 1. 今日速览
今日 Codex Rust 核心迎来高频迭代，一日内连发 3 个 alpha 版本（v0.151.0-alpha.6 至 8）。社区焦点高度集中在 Windows 桌面端的稳定性问题（无头模式、UI 渲染白屏、沙箱路径异常）以及 macOS 端的认证失效 Bug。此外，底层架构持续演进，TUI 向 app-server v2 的迁移及 Guardian 审查机制的上下文滚动优化成为 PR 方面的核心进展。

## 2. 版本发布
- **rust-v0.151.0-alpha.8 / alpha.7 / alpha.6**: Codex Rust 核心组件在 24 小时内连续发布三个 alpha 迭代，表明底层 CLI 和 App-server 正在进行密集的功能开发与缺陷修复。

## 3. 社区热点 Issues (Top 10)
1. **[#39162](https://github.com/openai/codex/issues/39162) [macOS] 打开现有对话导致 ChatGPT 认证失效并跳转登录** (👍40, 💬66)
   - **关注点**：严重影响 macOS 用户的核心体验，打开旧对话即触发认证失效，社区讨论热烈，是目前热度最高的 Issue。
2. **[#38350](https://github.com/openai/codex/issues/38350) [codex-web] 定时任务在成功运行后自动禁用** (💬52)
   - **关注点**：Web 端自动化工作流受阻，无用户操作下任务被意外暂停，对依赖定时任务的开发者造成困扰。
3. **[#40860](https://github.com/openai/codex/issues/40860) [Desktop] MCP 传输无效导致无法恢复会话** (👍31, 💬23) [已关闭]
   - **关注点**：桌面端配置中未包含 `codex_app` 却报其传输无效，阻碍会话恢复。该高赞 Issue 已被关闭，推测已修复。
4. **[#27117](https://github.com/openai/codex/issues/27117) [Windows] 独立更新继承 PSModulePath 导致 Get-FileHash 失败** (👍18, 💬23)
   - **关注点**：Windows 平台更新机制的底层痛点，PowerShell 7 环境变量继承引发哈希校验失败，影响更新流程。
5. **[#32759](https://github.com/openai/codex/issues/32759) [CLI] GPT-5.6 Sol 执行 shell 命令失败** (👍5, 💬16)
   - **关注点**：核心模型 GPT-5.6 Sol 在 CLI 中进行工具调用时握手失败，直接影响代码执行能力。
6. **[#34227](https://github.com/openai/codex/issues/34227) [Windows] 桌面宠物悬浮窗点击区域随时间偏移** (💬18)
   - **关注点**：UI 层面的渲染与交互不同步问题，虽属边缘功能，但反映出前端状态管理的潜在缺陷。
7. **[#40342](https://github.com/openai/codex/issues/40342) [App] 分页线程历史记录在 token_count 处停滞** (👍5, 💬13)
   - **关注点**：会话历史加载机制存在 Bug，导致历史记录无法完整投影，影响上下文回溯。
8. **[#26011](https://github.com/openai/codex/issues/26011) [Windows] 自动更新后 config.toml MCP 路径失效** (👍7, 💬11)
   - **关注点**：更新后旧路径未清理导致 `node_repl` 等 MCP 服务启动失败，是 Windows 自动更新长期存在的副作用。
9. **[#40968](https://github.com/openai/codex/issues/40968) [Windows] 桌面端发送按钮无限转圈** (👍3, 💬11)
   - **关注点**：基础交互受阻，用户输入提示词后无法提交，直接导致应用不可用。
10. **[#31088](https://github.com/openai/codex/issues/31088) [enhancement] 在 `--json` 事件流中暴露工具与技能目录** (👍13, 💬8)
    - **关注点**：重要的开发者功能诉求，要求在 CLI 和 app-server 事件流中提供当前可用工具和技能的结构化事件，以支持更复杂的编排。

## 4. 重要 PR 进展 (Top 10)
1. **[#10192](https://github.com/openai/codex/pull/10192) feat: 将 TUI 迁移至 app-server v2** [已关闭]
   - **进展**：将终端 UI (TUI) 的通信协议从内部 harness 协议迁移至标准的 app-server v2 协议，是架构统一的重要一步。
2. **[#41227](https://github.com/openai/codex/pull/41227) 为 Windows 沙箱提权命令使用兼容的 PowerShell** [已关闭]
   - **进展**：修复 Windows 沙箱环境下无法访问 Microsoft Store 版 PowerShell 的问题，提升沙箱兼容性。
3. **[#41260](https://github.com/openai/codex/pull/41260) 历史记录后端强制执行工具输出预算** [已关闭]
   - **进展**：移除客户端侧的重复截断逻辑，改由历史记录后端统一控制工具输出预算，避免已加密响应被错误拒绝。
4. **[#41243](https://github.com/openai/codex/pull/41243) 为 sleep 工具添加可配置 gating** [已关闭]
   - **进展**：引入 `sleep_tool` 特性开关，支持 `model_driven` 和 `always_on` 模式，增强对内置工具的控制力。
5. **[#41250](https://github.com/openai/codex/pull/41250) 实时连接元数据包含线程来源** [已关闭]
   - **进展**：在实时语音 WebSocket 连接中添加 `thread_source` 元数据，解决语音通话跨越多轮对话时的来源追踪问题。
6. **[#41239](https://github.com/openai/codex/pull/41239) 展示模型提供商认证恢复进度** [已关闭]
   - **进展**：当凭证过期触发刷新时，向 app-server 流发送认证恢复的起止事件，提升认证失败时的状态可见度。
7. **[#41232](https://github.com/openai/codex/pull/41232) 环境上下文中暴露 PowerShell 版本** [已关闭]
   - **进展**：在环境上下文中注入当前使用的 PowerShell 主次版本号，帮助模型更好地生成兼容的脚本命令。
8. **[#41231](https://github.com/openai/codex/p

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

以下是 2026 年 8 月 28 日的 Gemini CLI 社区动态日报。

### 1. 今日速览
今日 Gemini CLI 发布了 v0.59.0-nightly 夜间版本，核心动态集中在**子代理的稳定性修复**与**底层安全沙箱机制的完善**。社区高度关注 Agent 执行过程中的挂起、中断状态误报以及 Auto Memory 系统的隐私安全问题。此外，多个涉及 Git 环境变量隔离和 MCP 服务器权限控制的重要 PR 正在积极推进中。

### 2. 版本发布
- **v0.59.0-nightly.20260828.g3c311beac**: 自动化夜间版本发布。
  [查看 Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.59.0-nightly.20260827.g3c311beac...v0.59.0-nightly.20260828.g3c311beac)

### 3. 社区热点 Issues
以下 10 个 Issue 反映了当前社区最核心的痛点与需求：

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 时误报成功**
   - **关注原因**: P1 严重 Bug。子代理在达到最大轮次限制被中断时，仍向上级报告 `status: "success"`，导致主代理基于错误信息继续执行，掩盖了真实的失败中断。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 无限挂起**
   - **关注原因**: P1 Bug。当 CLI 调用通用代理时（如简单的创建文件夹操作）会永久挂起，用户被迫手动取消。目前 workaround 是指示模型不要使用子代理。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 利用零依赖 OS 沙箱支持原生 Bash 操作**
   - **关注原因**: 核心架构增强。提议利用 Gemini 3 原生的 POSIX 工具链能力，通过 OS 级沙箱和执行后意图路由，在不妥协安全的前提下最大化模型原生能力。
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) 评估 AST 感知文件读取与代码库映射的影响**
   - **关注原因**: 性能优化方向。探索通过 AST 感知工具精确读取方法边界，减少无效 Token 消耗和因读取错位导致的额外轮次。
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 未充分利用 Skills 和 Sub-agents**
   - **关注原因**: 代理调度问题。模型在执行相关任务时极少主动调用自定义 Skills 和子代理，除非用户显式指令，这削弱了扩展能力。
6. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) Shell 命令执行完成后卡在 "Waiting input"**
   - **关注原因**: P1 核心交互 Bug。执行简单 CLI 命令后，界面持续显示 "Awaiting user input" 且处于挂起状态，严重影响工作流。
7. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory 无限重试低信号会话**
   - **关注原因**: 后台资源浪费。Auto Memory 仅在成功读取转录时标记为已处理，若代理判定为低信号跳过读取，该会话会留在队列中被无限次重新评估。
8. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) 增加确定性脱敏并减少 Auto Memory 日志记录**
   - **关注原因**: 安全隐私问题。Auto Memory 将本地转录发送给后台模型后才进行脱敏，敏感数据已进入模型上下文，存在泄露风险。
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败**
   - **关注原因**: P1 兼容性 Bug。Linux Wayland 环境下浏览器子代理直接报错终止，影响桌面端自动化测试与操作。
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 个工具时遭遇 400 错误**
    - **关注原因**: 扩展性瓶颈。当可用工具（含 MCP）超过一定数量时触发 API 400 错误，要求 CLI 更智能地管理工具作用域。

### 4. 重要 PR 进展
今日更新的 PR 集中在核心稳定性、安全隔离与流式处理修复：

1. **[#29113](https://github.com/google-gemini/gemini-cli/pull/29113) chore/release: bump version to 0.59.0-nightly**
   - 自动化版本提升至最新夜间版。
2. **[#28930](https://github.com/google-gemini/gemini-cli/pull/28930) fix(core): drop unsafe `diff.external` override**
   - 修复

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

### GitHub Copilot CLI 社区动态日报 (2026-08-28)

#### 1. 今日速览
过去 24 小时内，GitHub Copilot CLI 发布了 v1.0.81 正式版及 v1.0.82 预发布版，全面推出了插件仪表盘并升级了 MCP 2026-07-28 支持。然而，新版本引发了多项兼容性回归问题，特别是 `store_memory` 失败和 MCP 服务器连接异常成为社区反馈焦点。此外，长时间运行会话导致的内存泄漏与 UI 冻结问题也引发了开发者的高度关注。

#### 2. 版本发布
- **v1.0.81** (发布于 2026-08-27)
  - 插件仪表盘全面开放：可通过运行 `/plugin`、`/mcp` 或 `/skills` 访问；若需禁用，可设置环境变量 `PLUGINS_DASHBOARD=false`。
  - 向 CLI、SDK、IDE 及内存客户端交付了 MCP 2026-07-28 规范支持。
  - Hooks 现在可以接收当前的 OpenTelemetry 上下文，增强了可观测性。
- **v1.0.82-0** (预发布版)
  - 包含若干修复和更改（详细更新日志待补充）。

#### 3. 社区热点 Issues
以下是过去 24 小时内社区最关注的 10 个 Issue：

- **[#4535](https://github.com/github/copilot-cli/issues/4535) `store_memory` 在 v1.0.81 预发布版中失败** (评论: 7)
  - **关注原因**：核心记忆功能因缺少 `Instance id` 报错，导致 Agent 无法存储上下文记忆，严重阻碍工作流。
- **[#4612](https://github.com/github/copilot-cli/issues/4612) FileWatch 事件循环失控导致 TUI 冻结并产生 13GB 日志** (评论: 6)
  - **关注原因**：长时间运行的会话会陷入死循环，无响应并疯狂写入调试日志，直接影响系统稳定性。
- **[#2873](https://github.com/github/copilot-cli/issues/2873) Copilot Pro 订阅用户失去 Opus 模型访问权限** (评论: 5)
  - **关注原因**：用户反馈突然无法在 CLI 和 VS2026 中使用 Opus 模型，引发对订阅权益变更的担忧。
- **[#3760](https://github.com/github/copilot-cli/issues/3760) Windows 平台 `ctrl+enter` 快捷键行为与提示不符** (评论: 2, 👍: 12)
  - **关注原因**：UI 提示 `ctrl+enter` 入队命令，但实际却触发换行，真正的入队键是 `ctrl+q`，严重干扰 Windows 用户输入习惯。
- **[#4602](https://github.com/github/copilot-cli/issues/4602) `store_memory` 失败及 MCP 服务器被剥离的共性根因** (评论: 1)
  - **关注原因**：深入分析了企业环境下 `managedSettings` 网络抖动导致的连锁反应，解释了多个严重 Bug 的共同根源。
- **[#4639](https://github.com/github/copilot-cli/issues/4639) 事件存储耗尽引发重试风暴与 Node OOM** (评论: 1)
  - **关注原因**：长会话达到远程存储上限后，不断重试刷新导致内存压力激增并触发 Node.js OOM 崩溃。
- **[#4647](https://github.com/github/copilot-cli/issues/4647) v1.0.81 破坏与 chroma-mcp 的兼容性** (评论: 1)
  - **关注原因**：刚发布的 v1.0.81 导致主流向量数据库 MCP 服务器无法启动，属于高危回归问题。
- **[#1385](https://github.com/github/copilot-cli/issues/1385) CLI 忽略显式 MCP 命令并强制重写为 pipx** (评论: 2)
  - **关注原因**：CLI 擅自篡改用户在 `mcp.json` 中配置的 Python 启动命令，破坏了现有的环境隔离策略。
- **[#4486](https://github.com/github/copilot-cli/issues/4486) 编辑权限请求出现“超时”** (评论: 1)
  - **关注原因**：多会话并行或挂起过夜时，未及时处理的编辑权限请求会自动超时，极大降低了长任务自动化执行的可靠性。
- **[#4629](https://github.com/github/copilot-cli/issues/4629)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 (2026-08-28)

## 1. 今日速览
今日 Kimi Code CLI 社区无新版本发布。社区讨论焦点集中在 K3 模型在 Plan mode 下的死循环 Bug，以及 API 工具调用时 `content` 为空导致的 400 错误引发的开发者强烈反馈。此外，开发者提交了多个关于安全依赖升级和文件处理健壮性的 PR，持续提升工具稳定性。

## 2. 版本发布
过去 24 小时无新版本发布。

## 3. 社区热点 Issues
今日共有 6 条 Issue 更新，以下为最值得关注的动态：

*   **#2621 [OPEN] 开发 Kimi API 都是吃 **** 的吗？**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/issues/2621
    *   **关注原因:** 开发者强烈吐槽 API 在处理工具调用时，原样返回模型生成的空 `content` 会触发 400 错误。这暴露了 API 在处理工具调用消息时的严格性与不一致性，迫使开发者（包括官方 CLI 自身）在客户端额外做判空处理，是当前最痛的开发者反馈。
*   **#2623 [OPEN] [bug] Plan mode: agent loops indefinitely on Bash echo / ReadFile instead of writing plan (kimi-code 0.38.0, K3)**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/issues/2623
    *   **关注原因:** 在使用最新的 K3 模型时，Plan mode 探索完成后不执行写计划或退出，而是死循环重复调用 `Bash echo` 和 `ReadFile`。这直接影响核心工作流，属于高优先级的 Agent 控制流缺陷。
*   **#1272 [CLOSED] [enhancement] jetbrains-ai-assistant中，使用acp调用kimi不能识别文件**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/issues/1272
    *   **关注原因:** 开发者反馈在 JetBrains AI Assistant 中通过 ACP 调用 Kimi 时无法识别直接拖拽的文件，必须输入完整路径。该 Issue 已关闭，暗示相关 IDE 集成体验可能已得到优化。
*   **#1279 [CLOSED] [enhancement] Feature Request: Native git-ai integration for AI code attribution**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/issues/1279
    *   **关注原因:** 社区希望原生支持 `git-ai` 标准，以便在 `git blame` 中追踪 AI 生成的代码。该需求反映了开发者对 AI 代码归因和协作透明度的日益重视，现已关闭。
*   **#1211 [CLOSED] [bug] Notion Remote MCP creds are not stored beyond active session**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/issues/1211
    *   **关注原因:** Notion Remote MCP 的凭证无法跨会话保存，影响长期使用体验。该 Bug 已修复关闭。
*   **#2624 [OPEN] docs: openai_legacy hosted /v1 example**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/issues/2624
    *   **关注原因:** 自动化机器人提交的文档改进请求，指出 `openai_legacy` 提供商配置文档中关于 `type` 和端点路径的细节容易出错，需要补充更清晰的示例。

## 4. 重要 PR 进展
今日共有 3 个 PR 更新，均聚焦于系统稳定性与代码健壮性：

*   **#2622 [OPEN] deps: bump asyncssh to 2.23.1 in pykaos (GHSA-2wxc-x7rj-hg8f)**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/pull/2622
    *   **内容:** 安全更新。将 `pykaos` 工作区中的 `asyncssh` 从 2.21.1 升级至 2.23.1，以修复 GHSA-2wxc-x7rj-hg8f 和 GHSA-qr67-gv47-xwwh 两个安全漏洞。
*   **#2595 [OPEN] fix(StrReplaceFile): refuse to edit files that are not valid UTF-8**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/pull/2595
    *   **内容:** 修复数据损坏风险。原逻辑在编辑非 UTF-8 文件时会将无效字节替换为 U+FFFD 并覆盖写回。此 PR 修改为在编辑前拒绝非有效 UTF-8 文件，防止破坏用户文件。
*   **#2176 [OPEN] fix(hooks): extract text from ContentPart for UserPromptSubmit hook**
    *   **链接:** https://github.com/MoonshotAI/kimi-cli/pull/2176
    *   **内容:** 修复 Hook 机制缺陷。当用户输入为 `list[ContentPart]`（多模态默认格式）时，`UserPromptSubmit` hook 会收到空 prompt 导致正则匹配失效。此 PR 提取了文本内容以修复该问题。

## 5. 功能需求趋势
从近期 Issues 中可以提炼出以下社区关注的功能方向：
*   **IDE 集成体验深化：** 开发者期望在 JetBrains 等 IDE 中获得更原生的交互体验（如直接识别拖拽文件），而非退化为纯命令行式的路径输入。
*   **AI 代码溯源与协作：** 随着 AI 生成代码比例增加，社区开始关注代码归因标准（如 `git-ai`），希望在版本控制层面区分人工与 AI 贡献。
*   **自定义模型提供商兼容：** 对于非官方托管模型的接入需求依然存在，特别是针对 `openai_legacy` (Chat Completions) 端点的兼容与文档完善。

## 6. 开发者关注点
*   **API 容错性与一致性：** API 在处理工具调用消息时表现出的“严进宽出”（模型生成合法但回传报错）是当前最大的痛点，开发者需要花费额外精力编写兼容逻辑。
*   **Agent 控制流稳定性：** K3 模型在 Plan mode 下出现的死循环现象，表明模型在复杂任务规划时的指令遵循能力仍需加强，避免陷入无意义的工具重复调用。
*   **文件与编码处理的健壮性：** 非标准编码文件的处理以及多模态输入在 Hook 系统中的传递，是代码层面的高频 Bug 来源，底层工具链需要更强的防御性编程。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 (2026-08-28)

## 1. 今日速览
OpenCode 今日发布 v1.18.24 与 v1.18.25 两个小版本，重点修复了 Bedrock 推理缓存失效问题，

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 (2026-08-28)

> 数据来源：github.com/QwenLM/qwen-code

## 1. 今日速览
今日 Qwen Code 发布了 `v0.22.2-nightly` 版本，主要修复了 Web Shell 会话差异恢复及钉钉富文本消息截断问题。社区动态高度聚焦于底层架构重构与性能优化，特别是 TUI 渲染层向 OpenTUI 的迁移以及流式传输安全机制的补齐。此外，VS Code 插件 WebShell 切换、独立语音守护进程及多模态能力增强成为今日 PR 的核心亮点。

## 2. 版本发布
- **v0.22.2-nightly.20260828.7357136dd1**
  - **fix(web-shell)**: 恢复已保存的会话差异 ([#10093](https://github.com/QwenLM/qwen-code/pull/10093))
  - **fix(channels)**: 修复钉钉富文本多消息截断问题

## 3. 社区热点 Issues
以下是今日最受关注的 10 个 Issue，反映了社区当前的核心痛点与架构演进方向：

1. **[API Error: No stream activity for 120000ms](https://github.com/QwenLM/qwen-code/issues/5975)** (评论: 13)
   - **关注原因**：高频流式传输超时 Bug，用户在升级后频繁遭遇 120 秒无响应。这直接影响了核心编码体验，社区急需针对流式生命周期的稳定性修复。
2. **[Migrate TUI rendering layer from ink to OpenTUI](https://github.com/QwenLM/qwen-code/issues/8662)** (评论: 11)
   - **关注原因**：架构级追踪 Issue。现有基于 `ink 7 + React 19` 的 TUI 存在严重的闪烁和渲染性能瓶颈，社区正大力推进向自研 OpenTUI 的迁移。
3. **[refactor: core + cli 架构 Review — 12 项结构性问题清单](https://github.com/QwenLM/qwen-code/issues/4063)** (评论: 11)
   - **关注原因**：深度技术审查。指出核心类型系统被 `@google/genai` 深度绑定（136 个文件直接引用），亟需解耦以提升多模型兼容性。
4. **[The Anthropic wire is missing stream-safety protections](https://github.com/QwenLM/qwen-code/issues/9005)** (评论: 7)
   - **关注原因**：P1 级别 Bug。Anthropic 生成器缺少 OpenAI 已有的流式安全防护，可能导致 CLI 挂起，暴露了多供应商接入时的安全一致性问题。
5. **[自定义模型供应商无法对话](https://github.com/QwenLM/qwen-code/issues/10227)** (评论: 7)
   - **关注原因**：接入 Moonshot 等第三方模型时因 JSON Schema 校验失败导致请求中断，反映了自定义模型接入的兼容性痛点。
6. **[LM Studio: Qwen Code request fails with "failed to parse grammar"](https://github.com/QwenLM/qwen-code/issues/10065)** (评论: 6)
   - **关注原因**：在无 MCP 和工具的情况下，本地模型 (如 qwen3.6-35b) 依然报语法解析错误，阻碍了本地离线开发场景的使用。
7. **[Unify the stdio and HTTP ACP paths](https://github.com/QwenLM/qwen-code/issues/10061)** (评论: 3)
   - **关注原因**：架构提案。计划将 stdio 和 HTTP 两种 ACP 交付路径统一到传输无关的核心层，并升级 SDK 至 1.x，对 IDE 集成意义深远。
8. **[The slash-command contract is fused with interactive UI state](https://github.com/QwenLM/qwen-code/issues/9150)** (评论: 3)
   - **关注原因**：斜杠命令与终端 UI 状态强耦合，导致每次命令加载均需引入 UI 层，阻碍了非交互式场景（如 Daemon）的命令复用。
9. **[MCP Apps inline UI never renders in v0.22.2 Web Shell](https://github.com/QwenLM/qwen-code/issues/10369)** (评论: 2)
   - **关注原因**：v0.22.2 Web Shell 中 MCP Apps 内联 UI 静默回退且无法渲染，同时遗留的 stdio 服务增加了调试难度，影响 Web 端体验。
10. **[hooks 触发事件增强](https://github.com/QwenLM/qwen-code/issues/10348)** (评论: 4)
    - **关注原因**：开发者希望在 Yolo 模式下智能体发起提问时能触发 hooks 事件，以便通过飞书或桌面推送进行后台任务干预，反映了自动化工作流的需求。

## 4. 重要 PR 进展
今日活跃的 PR 集中在架构重构、多模态及稳定性增强：

1. **[feat(cli): OpenTUI migration live-session and input batch](https://github.com/QwenLM/qwen-code/pull/10368)**
   - **内容**：OpenTUI 迁移第三批，落地实时会话流折叠、消息渲染（流式 Markdown 修复）及输入层，直接回应 Issue #8662 的渲染痛点。
2. **[feat(qwen-live): standalone voice daemon package — M1 + M2](https://github.com/QwenLM/qwen-code/pull/10367)**
   - **内容**：引入全新的独立语音守护进程包 `qwen-live`，实现最小闭环 (M1) 和丰富交互 (M2)，且完全不影响 `packages/cli`。
3. **[perf(cli): reduce TUI render overhead](https://github.com/QwenLM/qwen-code/pull/9970)**
   - **内容**：在虚拟视口模式下启用增量终端输出，隔离历史渲染主体，大幅降低交互式 TUI 的渲染开销。
4. **[refactor(vscode-ide-companion): complete the WebShell UI cutover](https://github.com/QwenLM/qwen-code/pull/9811)**
   - **内容**：VS Code 插件完成从旧版共享 WebUI 到 Web Shell 的全面切换，通过工作区级 `qwen serve` 守护进程挂载，提升 IDE 内一致性。
5. **[feat(memory): add structured on-demand recall](https://github.com/QwenLM/qwen-code/pull/10183)**
   - **内容**：重构记忆系统，从扁平提示词演进为结构化推/拉召回协议，模型可获取两级 ref/title 树并按需检索，降低上下文污染。
6. **[fix(core): guard Anthropic streams with idle and lifetime watchdogs](https://github.com/QwenLM/qwen-code/pull/9945)**
   - **内容**：为 Anthropic 生成器引入 OpenAI 已有的流式看门狗，静默或低内容思考帧超时将触发可重试的 `ETIMEDOUT`，修复 Issue #9005。
7. **[fix(daemon): Cancel timed-out session initialization](https://github.com/QwenLM/qwen-code/pull/10268)**
   - **内容**：使守护进程会话初始化预算具有端到端权威性，通过桥接传递绝对截止时间，并在子进程中传播取消信号。
8. **[fix(omni): harden policy tool contracts](https://github.com/QwenLM/qwen-code/pull/10364)**
   - **内容**：强化多模态策略工具契约，修复视频裁剪时的音频保留、字幕证据归属及视觉 Token 预算对齐

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*