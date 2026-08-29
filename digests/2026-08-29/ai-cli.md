# AI CLI 工具社区动态日报 2026-08-29

> 生成时间: 2026-08-29 04:41 UTC | 覆盖工具: 7 个

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

以下是基于 2026 年 8 月 29 日各主流 AI CLI 工具社区动态的横向对比分析报告：

### 1. 生态全景
当前 AI CLI 工具生态正处于从“辅助编码”向“自主工程代理”演进的关键期。各主流工具均在底层架构（如 Rust 核心重构、多智能体协同）和企业级安全合规（如工作区信任、数据驻留）上发力。同时，随着模型自主执行能力的增强，Token 效率优化、上下文窗口管理以及跨平台（特别是 Windows）系统级稳定性，已成为全行业共同攻坚的技术焦点。

### 2. 各工具活跃度对比

| 工具名称 | 版本发布情况 | 热点 Issues 数 | 重要 PR 数 | 核心迭代方向 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | v2.1.251 | 7 | 未详述 | 模型切换钩子、子代理流式传输、企业安全策略 |
| **OpenAI Codex** | 6 个 Alpha (Rust核心) | 10 | 10 | Rust 底层高频重构、Token/权限细粒度控制、多智能体 |
| **Gemini CLI** | v0.59.0-nightly | 10 | 7 | 故障关闭安全机制、MCP 过滤、底层安全防护 (OAuth/路径穿越) |
| **GitHub Copilot CLI**| v1.0.82-1 | 10 | 1 (已关闭) | 企业认证修复、MCP 兼容性、多模型适配 |
| **Kimi Code CLI** | 无 | 3 | 1 | MCP 安全漏洞修复、缓存计费机制、依赖升级 |
| **OpenCode** | v1.18.25 | 10 | 10+ | Azure 认证解耦、TUI 内存泄漏修复、底层隔离与重构 |
| **Qwen Code** | v0.22.3 | 10 | 2 | Channels 多任务会话、CUA Driver 预编译、Web Shell 稳定性 |

### 3. 共同关注的功能方向

*   **MCP 生态的安全与兼容性**：几乎所有工具都在处理 MCP 相关问题。**Claude Code** 遭遇 MCP 连接器不暴露工具的集成 Bug；**Codex** 引入按工具设置 MCP 输出限制以控制 Token；**Gemini CLI** 强制过滤不受信任的 MCP Servers 并修复 OAuth 混淆；**Copilot CLI** 出现版本升级破坏 MCP 兼容性的回归问题；**Kimi Code** 紧急修复了 MCP 工具绕过内置安全防护读取敏感文件的严重漏洞。
*   **Token 效率与计费透明度**：随着 Agent 自主性增强，Token 消耗失控成为痛点。**Codex** 发现 GPT-5.6 串行化调用导致用量飙升 27-45%；**Kimi Code** 反馈缓存读取计费异常放大超 10 倍；**OpenCode** 出现单次无输出 Prompt 消耗 21 美元的极端案例；**Copilot CLI** 的 Tool search 降本机制在非 GPT 模型上失效。
*   **Windows 平台系统级稳定性**：跨平台桌面端/CLI 在 Windows 上集体水土不服。**Claude Code** 遭遇 AppX 容器进程孤立；**Codex** 面对 DWM 句柄泄漏、Direct Composition 白屏及 WSL 终端静默失败；**Copilot CLI** 出现 FileWatch 循环导致 TUI 冻结并产生 13GB 日志。
*   **本地化与隐私安全记忆**：开发者对上下文不上云的需求增加。**Copilot CLI** 社区呼吁提供仅限本地的代理记忆功能；**Gemini CLI** 则在讨论 Auto Memory 系统的确定性脱敏，防止密钥泄露。

### 4. 差异化定位分析

*   **Claude Code**：侧重于**企业级安全与工作流编排**。通过引入 Cyber Safeguard 和模型切换钩子，满足对安全合规和操作粒度要求极高的企业组织。
*   **OpenAI Codex**：侧重于**底层高性能与多智能体架构**。通过 Rust 核心的密集重构和嵌套智能体上下文管理，构建高并发、高容错的复杂任务执行底座。
*   **Gemini CLI**：侧重于**零信任架构与系统级安全**。今日更新全量围绕“故障关闭”、路径穿越防御、DNS 验证等底层安全加固，定位偏向对安全极度敏感的场景。
*   **GitHub Copilot CLI**：侧重于**企业生态集成与多模型公平适配**。核心解决 GHEC 数据驻留的认证隔离问题，并致力于让 Grok/Gemini 等非 OpenAI 模型获得与 GPT 同等的工具优化机制。
*   **Kimi Code CLI**：侧重于**第三方模型接入规范与成本控制**。聚焦解决自托管 v1 端点兼容性及 Prompt Caching 计费透明度，服务于对计费敏感的国内开发者。
*   **OpenCode**：侧重于**本地大模型集成与运行时轻量化**。重点优化对 vLLM/Qwen 等本地模型的支持，并解决 Bun 运行时并发崩溃等环境依赖问题。
*   **Qwen Code**：侧重于**多工作区并行与 CUA 驱动**。通过 Channels 会话管理和跨平台预编译 CUA Driver，强化桌面级自动化操作和多任务并行能力。

### 5. 社区热度与成熟度

*   **快速迭代与底层重构期**：**OpenAI Codex**（单日 6 个 Alpha + 10 个核心 PR）和 **OpenCode**（10 个 Issues + 10 个底层重构 PR）处于架构剧烈演进阶段，社区反馈的底层性能和内存问题较多。
*   **高活跃度与企业化攻坚期**：**Claude Code**、**Gemini CLI** 和 **Copilot CLI** 社区讨论极为热烈（均 10 个高频 Issue），且痛点高度集中在企业认证、安全策略误报等深水区，表明其已渗透至企业核心流程，正接受复杂环境下的严苛考验。
*   **垂直场景修复期**：**Kimi Code** 和 **Qwen Code** 活跃度相对聚焦，主要解决特定模型计费、本地模型兼容及 UI 交互等垂直场景的阻断性 Bug。

### 6. 值得关注的趋势信号

1.  **“上下文工程”正在取代“提示词工程”**：从 Codex 的 MCP 输出限制、Copilot 的 Tool search 延迟，到 OpenCode 的上下文压缩死循环，表明行业焦点已从如何提问，转向如何通过硬性裁剪、异步加载和沙箱隔离来管理庞大的 Agent 上下文窗口。
2.  **MCP 协议步入“深水区”安全测试**：MCP 已成为标准接入方式，但随之而来的 OAuth 混淆、路径穿越、越权读取等问题频发。未来 CLI 工具的竞争力将很大程度取决于 MCP 生命周期管理的安全深度。
3.  **多模型 CLI 路由面临“水土不服”**：Copilot CLI 支持 Grok/Gemini 后出现的优化机制失效，以及 OpenCode/Qwen Code 对接本地 vLLM 时的崩溃，揭示了不同模型对工具调用的响应逻辑存在巨大差异。开发者在构建多模型 CLI 架构时，需预留模型特定的降级与适配策略。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于 anthropics/skills 仓库数据（截至 2026-08-29）生成的 Claude Code Skills 社区热点报告。

### 1. 热门 Skills 排行
由于 PR 评论数据暂缺，本排行综合评估 PR 的技术深度、解决核心痛点的程度以及关联 Issue 的热度：

1. **skill-creator 评估系统修复** (PR #1298)
   - **功能**: 修复 `run_eval.py` 始终报告 0% 召回率的核心 Bug，解决 Windows 流读取、触发检测及并行工作者问题。
   - **讨论热点**: 直接关联高热 Issue #556（12条评论），该 Bug 导致 Skill 描述优化循环“针对噪声进行优化”，是阻碍 Skill 开发者迭代的核心痛点。
   - **状态**: Open
   - **链接**: https://github.com/anthropics/skills/pull/1298

2. **skill-quality-analyzer & skill-security-analyzer** (PR #83)
   - **功能**: 引入两个元技能，分别从五个维度评估 Skill 质量，并进行安全分析。
   - **讨论热点**: 呼应了社区对 Skill 信任边界的强烈安全诉求（见 Issue #492，43条评论），旨在建立官方的 Skill 质量与安全基准。
   - **状态**: Open
   - **链接**: https://github.com/anthropics/skills/pull/83

3. **Hivemind: 零成本多智能体编排** (PR #1628)
   - **功能**: 允许 Claude Code 将机械性工作委托给运行免费模型的 headless opencode workers，自身仅作为规划者、审查者和合并者。
   - **讨论热点**: 切中 LLM 上下文成本高昂的痛点，探索了在 Skill 层面进行多智能体成本优化的前沿玩法。
   - **状态**: Open
   - **链接**: https://github.com/anthropics/skills/pull/1628

4. **self-audit: 推理质量门禁** (PR #1367)
   - **功能**: 在 AI 输出交付前进行审计——先进行机械性文件验证，再进行四维推理审计。
   - **讨论热点**: 关联 Issue #1385，社区探讨通过“预校准→对抗性审查→交付验证”三步管线提升 AI 输出可靠性，该 PR 是其落地方案。
   - **状态**: Open
   - **链接**: https://github.com/anthropics/skills/pull/1367

5. **document-typography: 文档排版质量控制** (PR #514)
   - **功能**: 防止 AI 生成文档时出现孤行、寡段、编号错位等常见排版问题。
   - **讨论热点**: 解决了“用户很少主动要求好排版，但每次都受其扰”的隐性痛点，提升了基础文档技能的专业度。
   - **状态**: Open
   - **链接**: https://github.com/anthropics/skills/pull/514

6. **testing-patterns: 全栈测试模式** (PR #723)
   - **功能**: 涵盖测试理念、单元测试、React 组件测试等全栈测试指导。
   - **讨论热点**: 补齐了 Claude Code 在自动化测试生成与测试架构指导方面的空白，高度契合开发者日常工作流。
   - **状态**: Open
   - **链接**: https://github.com/anthropics/skills/pull/723

---

### 2. 社区需求趋势
从高热 Issues 中提炼出社区最期待的发展方向：

- **安全与信任机制**: 社区强烈反对社区开发者在 `anthropic/` 命名空间下分发技能（Issue #492，43条评论），呼吁建立官方审核机制与命名空间隔离。同时呼吁 Agent 治理与安全模式技能（Issue #412）。
- **企业级协作与共享**: 用户迫切需要组织内部共享 Skills 的能力，而非通过文件手动上传（Issue #228，16条评论）。同时针对 SharePoint 等企业文档库的安全与权限控制诉求凸显（Issue #1175）。
- **上下文窗口与内存优化**: `claude-api` 技能单次注入 15.6 万 Token 导致上下文溢出（Issue #1487），社区提出 compact-memory 技能需求，希望通过符号表示法压缩 Agent 状态记忆（Issue #1329）。
- **底层工具链稳定性**: `skill-creator` 的评估脚本在 Windows 平台兼容性极差、触发率为 0%（Issue #556），MCP 构建器评估脚本也因序列化问题得分为 0（Issue #1390）。社区急需修复基础开发工具链。

---

### 3. 高潜力待合并 Skills
以下 Open 状态的 PR 解决了关键性 Bug 或填补了重要空白，近期落地可能性较高：

1. **PR #1607: 更新 claude-api 技能，标记已退役模型 ID**
   - **落地理由**: 纯数据维护，修复官方模型列表状态，直接解决 Issue #1603，合并阻力极小。
   - **链接**: https://github.com/anthropics/skills/pull/1607
2. **PR #541: 修复 docx 技能中 tracked change w:id 冲突**
   - **落地理由**: 解决了 OOXML 中 ID 空间共享导致的文档损坏问题，属于高优先级的破坏性 Bug 修复。
   - **链接**: https://github.com/anthropics/skills/pull/541
3. **PR #538: 修复 pdf 技能中大小写敏感的文件引用**
   - **落地理由**: 1 行代码级修复，解决了大小写敏感系统（如 Linux）上 Skill 引用失效的问题。
   - **链接**: https://github.com/anthropics/skills/pull/538
4. **PR #1602: 修复评估序列化、基准指标与脚本稳定性问题**
   - **落地理由**: 集中修复了 `mcp-builder` 等多个脚本的平台兼容性和指标计算 Bug，与 Issue #1390 高度相关，能显著提升开发体验。
   - **链接**: https://github.com/anthropics/skills/pull/1602

---

### 4. Skills 生态洞察
**当前社区在 Skills 层面最集中的诉求是：建立安全可信的技能分发机制，并彻底修复底层评估工具链的跨平台稳定性。**

---

# Claude Code 社区动态日报 (2026-08-29)

## 1. 今日速览
今日 Claude Code 发布了 v2.1.251 版本，引入了模型切换钩子事件及子代理工具调用的实时流式传输能力。社区方面，Windows 桌面端隐蔽更新导致的进程孤立与会话崩溃问题持续发酵，同时 Cyber Safeguard（网络防护）误报阻断正常开发工作流成为今日最高频的痛点，引发了大量企业级用户的反馈。

## 2. 版本发布
**v2.1.251**
- **新增模型切换钩子**：引入 `PreModelSwitch` 和 `PostModelSwitch` 钩子事件，允许开发者阻止、确认或注释模型的切换行为。
- **会话恢复增强**：`SessionStart` 恢复钩子现可接收会话陈旧度及预估的重新缓存成本。
- **子代理实时流**：新增前台子代理的工具调用及结果到 Remote Con 的实时流式传输。

## 3. 社区热点 Issues
以下是今日最受关注的 10 个 Issue，主要集中在桌面端稳定性及安全拦截误报：

1. **[#84352](https://github.com/anthropics/claude-code/issues/84352) [BUG] CVP 批准的组织仍被 Cyber Safeguard 拦截** (👍25, 💬164)
   - **关注原因**：已通过 Cyber Verification Program 批准的企业组织再次遭遇安全拦截，且审批状态显示“审查中”。该问题严重影响企业用户的正常使用，评论数极高。
2. **[#53247](https://github.com/anthropics/claude-code/issues/53247) [BUG] Windows 桌面端启动失败** (👍19, 💬30)
   - **关注原因**：应用崩溃后遗留孤立的 Silo / Job Object，导致后续启动失败 (HRESULT 0x80070020)，只能注销或重启系统恢复。
3. **[#61682](https://github.com/anthropics/claude-code/issues/61682) [BUG] GitHub 连接器在 Cowork 中未暴露工具** (👍24, 💬27)
   - **关注原因**：Windows 11 平台 MCP 集成问题，GitHub 连接器显示“已连接”但无法提供实际工具供 Cowork 使用。
4. **[#88093](https://github.com/anthropics/claude-code/issues/88093) [BUG] Windows 窗口始终置顶** (👍19, 💬8)
   - **关注原因**：Claude Desktop 在 Windows 上出现窗口强制置顶行为，遮挡其他应用，严重影响多任务开发体验。
5. **[#88405](https://github.com/anthropics/claude-code/issues/88405) [BUG] `.claude/rules/` 符号链接未自动加载** (👍4, 💬7)
   - **关注原因**：实际行为与官方文档矛盾，符号链接的规则文件未被加载，阻断了多项目共享配置的最佳实践。
6. **[#88094](https://github.com/anthropics/claude-code/issues/88094) [BUG] 远程控制被默认开启** (👍8, 💬6)
   - **关注原因**：涉及隐私与安全默认配置，用户反馈远程控制功能在不知情的情况下被默认启用。
7. **[#89680](https://github.com/anthropics/claude-code/issues/89680) [BUG] 隐蔽更新导致旧版 AppX 容器进程孤立** (💬5)
   - **关注原因**：Windows 桌面端静默自动更新后，旧版本子进程未被杀死，导致新版本无法启动直至重启。
8. **

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 (2026-08-29)

> 数据来源：github.com/openai/codex

## 1. 今日速览
今日 Codex CLI 的 Rust 核心组件迎来密集发布，一口气推出了 6 个 alpha 版本（v0.151.0-alpha.7.1 至 12），处于快速迭代周期。社区讨论焦点高度集中在 Windows 平台的稳定性（GUI 渲染、DWM 句柄泄漏）以及 GPT-5.6 模型在 Code Mode 下的 Token 消耗与执行效率优化上。

## 2. 版本发布
过去 24 小时内，Codex CLI 的 Rust 核心连续发布 6 个 Alpha 版本，显示底层正在高频重构与优化：
- [rust-v0.151.0-alpha.12](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.12)
- [rust-v0.151.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.11)
- [rust-v0.151.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.10)
- [rust-v0.151.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.9)
- [rust-v0.151.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.8)
- [rust-v0.151.0-alpha.7.1](https://github.com/openai/codex/releases/tag/rust-v0.151.0-alpha.7.1)

## 3. 社区热点 Issues
以下 10 个 Issue 反映了当前社区最核心的痛点与需求：

1. [#39903 建议增加选项禁用“Ran N commands”折叠](https://github.com/openai/codex/issues/39903) (👍65, 💬44)
   - **关注点**：TUI/CLI 界面体验。用户希望始终展开显示执行过的命令，而不是被折叠隐藏，以便更好地追踪 Agent 的操作历史。
2. [#41049 Windows 下 code-mode 握手阶段宿主进程退出](https://github.com/openai/codex/issues/41049) (💬36)
   - **关注点**：Windows 核心阻断性 Bug。本地命令执行通道在初始化时崩溃，导致 GPT-5.6 模型无法正常读取目录和执行工具调用。
3. [#35050 GPT-5.6 频繁串行化独立调用，显式批处理可降低 27-45% 用量](https://github.com/openai/codex/issues/35050) (👍40, 💬29)
   - **关注点**：模型行为与成本优化。用户发现模型倾向于串行执行可并行的 Code Mode 任务，导致加权使用量飙升，呼吁改进默认调度逻辑。
4. [#25271 Computer Use 在 Windows 上无法识别 Chrome URL](https://github.com/openai/codex/issues/25271) (💬26)
   - **关注点**：浏览器自动化。即使在 `chrome://newtab/` 下也无法确定 URL，导致桌面端 Computer Use 功能在 Windows 上受限。
5. [#37104 WSL 集成终端在 PTY 启动前静默失败](https://github.com/openai/codex/issues/37104) (💬23, 已关闭)
   - **关注点**：Windows/WSL 兼容性。Codex Desktop 底部和侧边面板无法打开，严重影响 WSL 开发者的使用体验。
6. [#34227 Windows 桌面宠物组件点击区域随时间偏移](https://github.com/openai/codex/issues/34227) (💬20)
   - **关注点**：UI 渲染 Bug。宠物覆盖层的实际命中区域与可视图像脱节，属于典型的前端状态同步问题。
7. [#33192 Windows 10 下工具调用导致 DWM Composition 句柄累积](https://github.com/openai/codex/issues/33192) (👍10, 💬15)
   - **关注点**：系统级资源泄漏。在包含终端工具调用的任务后，DWM 句柄持续增长不释放，可能导致系统卡顿。
8. [#40611 开启高级账户安全后陷入登录-登出循环](https://github.com/openai/codex/issues/40611) (💬12)
   - **关注点**：身份验证阻断。开启安全策略以保留特定功能访问权限后，App 完全不可用，属于严重的 Auth 链路 Bug。
9. [#41450 Code Mode 可复现的 Token 放大问题及缓解方案](https://github.com/openai/codex/issues/41450) (💬3)
   - **关注点**：Token 效率。用户发现通过在 `AGENTS.md` 中添加一条规则，成功将累计输入 Token 削减了 81.6%，揭示了当前提示词工程存在的巨大优化空间。
10. [#40878 Windows 客户端区域空白，需禁用 Direct Composition](https://github.com/openai/codex/issues/40878) (💬9)
    - **关注点**：Windows 渲染引擎兼容性。26.820 版本后大面积出现白屏，需通过启动参数 `--disable-direct-composition` 绕过。

## 4. 重要 PR 进展
今日有大量自动化机器人提交的 PR（均已合入），主要聚焦于架构优化与权限控制：

1. [#41467 从 app server 异步刷新 TUI 模型选择器](https://github.com/openai/codex/pull/41467)
   - 修复了模型选择器打开时显示过期缓存目录的问题，现在会异步拉取最新可用模型。
2. [#41464 更新会话元数据时保留权限快照](https://github.com/openai/codex/pull/41464)
   - 延迟遗留沙盒策略投影，防止客户端名称/版本更新意外改变现有的文件系统权限快照。
3. [#41454 重复执行宿主失败后阻塞目标](https://github.com/openai/codex/pull/41454)
   - 引入容错机制：当某个目标的 `exec` 连续失败 3 次后标记为阻塞，任何工具成功即重置失败计数。
4. [#41452 上报 code mode 宿主请求耗时](https://github.com/openai/codex/pull/41452)
   - 优化性能监控：精确测量 code mode 的 execute/wait/terminate 耗时，排除客户端延迟和空闲时间。
5. [#41447 支持 openai/elicitation 表单请求](https://github.com/openai/codex/pull/41447)
   - 增强交互能力：支持客户端声明对象值 `form` 能力，处理 `openai/elicitation/create` 请求。
6. [#41436 响应 TTY 子进程的终端查询](https://github.com/openai/codex/pull/41436)
   - 修复 PTY 阻塞问题：拦截子进程的设备状态、窗口大小等查询，并写入有限响应。
7. [#41421 支持按工具设置 MCP 输出限制](https://github.com/openai/codex/pull/41421)
   - 细粒度 Token 控制：允许为每个 MCP 服务器工具配置 `output_token_limit`，并在策略重叠时采用最严格限制。
8. [#41416 添加 app-server 通知媒体过滤](https://github.com/openai/codex/pull/41416)
   - 默认关闭功能：开启后可从通知中移除内联图像和音频内容，大幅降低带宽和上下文消耗。
9. [#41413 优化历史记录项查找](https://github.com/openai/codex/pull/41413)
   - 性能优化：对大型线程历史记录进行延迟索引，优化回滚和更新时的位置复用。
10. [#41424 跨嵌套智能体分叉保留上下文基线](https://github.com/openai/codex/pull/41424)
    - 增强多智能体架构稳定性：在分叉移除用户消息时，将存活的全局状态快照视为上下文基线，防止状态丢失。

## 5. 功能需求趋势
从近期 Issue 和 PR 中，可以提炼出以下三大趋势：
- **Windows 平台稳定性攻坚**：超过 60% 的高频 Bug 集中在 Windows 客户端，涵盖 DWM 渲染、WSL 终端初始化、沙盒权限（EPERM）及 UI 组件状态同步。OpenAI 正在通过 PR 重命名 Seatbelt 策略和调整 Direct Composition 来应对。
- **Token 效率与上下文裁剪**：随着 GPT-5.6 的 Code Mode 使用加深，Token 放大问题凸显。社区不仅呼吁模型层改进串行化调用，官方也在 PR 层面密集引入 MCP 输出限制、通知媒体过滤等硬性裁剪策略。
- **多智能体与 MCP 生态深化**：底层架构正在向更复杂的多智能体协同演进。PR 中出现了 Guardian transcript、嵌套分叉上下文保留、以及更精细的 MCP 工具生命周期管理（如 SubagentStop 钩子）。

## 6. 开发者关注点
- **执行链路握手失败**：Windows 用户频繁遭遇 `code-mode host exited during handshake`，导致本地工具调用完全瘫痪，这是当前最紧迫的阻断性痛点。
- **Token 成本不可控**：开发者发现模型默认行为（如不必要的

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 (2026-08-29)

## 1. 今日速览
今日 Gemini CLI 发布了 v0.59.0-nightly 夜间版本，核心聚焦于安全加固，强制实施了“故障关闭”的工作区信任机制并在受限模式下过滤了 MCP Servers。社区活跃度较高，讨论焦点集中在子代理的稳定性（如挂起、误报成功）以及 Auto Memory 系统的隐私与健壮性上。此外，多个涉及底层安全防范（如 OAuth 防护、NTFS 路径穿越）的重要 PR 正在积极推进中。

## 2. 版本发布
- **v0.59.0-nightly.20260829.g0bd1d4397**
  - **核心更新**: 强制执行“故障关闭”的工作区信任解析，并在不受信任或受限环境中过滤掉仓库定义的 `mcpServers`。此更新防止了服务器启动期间意外的进程执行，确保环境信任信号得到严格处理。
  - **相关 PR**: [#29099](https://github.com/google-gemini/gemini-cli/pull/29099)

## 3. 社区热点 Issues
以下是过去 24 小时内讨论最热烈的 10 个 Issue：

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) - 子代理达到 MAX_TURNS 后误报成功**
   - **关注点**: `codebase_investigator` 子代理在达到最大轮次限制未执行分析时，仍错误报告 `status: "success"`，掩盖了中断事实。这是 P1 级别的核心 Agent 稳定性问题。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) - 通用代理 挂起**
   - **关注点**: 当 CLI 延迟调用通用代理时，即使执行简单的文件夹创建也会无限期挂起。社区反馈禁用子代理可解决此问题，影响基础工作流。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) - 利用零依赖 OS 沙箱及执行后意图路由**
   - **关注点**: 社区提议利用 Gemini 3 原生 Bash 能力的同时，通过零依赖沙箱保障安全，兼顾模型原生能力与系统安全性。
4. **[#28004](https://github.com/google-gemini/gemini-cli/issues/28004) - Shell 工具调用发送重复结果**
   - **关注点**: 在特定兼容提供商下，CLI 会为已完成的 Shell 工具调用重复提交工具结果，可能导致上下文污染或死循环。
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) - 评估 AST 感知文件读取与映射的影响**
   - **关注点**: 探索 AST 感知工具以更精确地读取方法边界，减少 Token 噪声和误对齐读取，提升代码库导航效率。
6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) - Gemini 未充分利用 Skills 和子代理**
   - **关注点**: 开发者反馈模型几乎不会主动使用自定义 Skills 和子代理，除非显式指令，这限制了自动化编排能力。
7. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) - Auto Memory 无限重试低信号会话**
   - **关注点**: Auto Memory 机制在判断会话为低信号而不读取时，将其标记为未处理，导致后续被无限重复暴露，浪费后台资源。
8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) - Shell 命令执行后卡在 "Waiting input"**
   - **关注点**: P1 级 Bug，执行简单 CLI 命令完成后，界面仍显示命令活跃并等待输入，导致交互卡死。
9. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) - Auto Memory 需增加确定性脱敏**
   - **关注点**: 安全性增强需求。当前 Auto Memory 在将本地记录发送给模型前缺乏确定性脱敏，存在密钥泄露风险。
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) - 工具数量 > 128 时触发 400 错误**
    - **关注点**: 当可用工具超过 128 个时触发 API 限制，要求 Agent 更智能地管理工具作用域。

## 4. 重要 PR 进展
以下是值得关注的 10 个重要 Pull Request：

1. **[#29115](https://github.com/google-gemini/gemini-cli/pull/29115) - 防止不安全的系统级配置加载**
   - 修复 Windows 和 POSIX 系统上的不安全配置加载问题，防止本地提权和跨用户任意命令执行。
2. **[#29117](https://github.com/google-gemini/gemini-cli/pull/29117) - 防止 MCP 认证中的 OAuth IdP 混淆**
   - 实施 RFC 9207 授权服务器发行者识别验证，防御身份提供商混淆攻击并防止未授权 Token 泄露。
3. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116) - 缓解 NTFS 8.3 短名称 (SFN) 路径穿越**
   - 在路径规范化和安全引擎中处理 Windows 短名称（如 `git~1`），防止路径穿越和黑名单绕过。
4. **[#29120](https://github.com/google-gemini/gemini-cli/pull/29120) - 改进 Web Fetch 工具的目标验证与连接路由**
   - 引入异步 DNS 查询验证出站请求，并通过 Undici 传输连接器直接绑定解析地址，增强网络层安全。
5. **[#28971](https://github.com/google-gemini/gemini-cli/pull/28971) - 保持截断的 MCP 工具名称唯一性**
   - 修复超长 MCP 工具名称被截断后导致的命名冲突问题，确保 `ToolRegistry` 注册的唯一性。
6. **[#29106](https://github.com/google-gemini/gemini-cli/pull/29106) - 在 EOF 时刷新最终 SSE 事件**
   - 修复 SSE 解析器在流结束时无尾随空行时丢失最终缓冲事件的问题，避免 `finishReason` 元数据丢失。
7. **[#29114](https://github.com/google-gemini/gemini-cli/pull/29114) - 防止 Spawn 失败时重复执行 handleExit**
   - 在 `shellExecutionService` 中加入重入保护，解决子进程生成失败时 `error` 和 `close` 事件双重触发导致的重复退出处理。
8.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 (2026-08-29)

## 1. 今日速览
今日 GitHub Copilot CLI 发布了 v1.0.82-1 版本，重点优化了认证失败的错误提示细节。社区动态方面，企业版（GHEC）数据驻留引发的认证 401 错误集中爆发，同时 v1.0.81 版本引入的 MCP 兼容性破坏及 TUI 渲染/冻结问题成为开发者反馈的焦点。

## 2. 版本发布
- **v1.0.82-1**
  - **修复**: 优化了认证失败的错误提示，现在会显示具体的失败原因（如 401 Bad credentials），而不是仅仅弹出 `/login` 提示。

## 3. 社区热点 Issues
以下是今日最值得关注的 10 个 Issue：

1. **[#4612](https://github.com/github/copilot-cli/issues/4612) FileWatch 循环导致 TUI 冻结并产生 13GB 日志**
   - **关注原因**: 严重的性能与稳定性 Bug。长时间运行的会话会进入死循环，导致终端无响应并疯狂写入调试日志，直接影响开发者机器资源。
2. **[#4527](https://github.com/github/copilot-cli/issues/4527) GHEC 数据驻留环境下 `copilot -p` 报 401 错误**
   - **关注原因**: 企业用户核心痛点。非交互模式错误地请求了 `api.githubcopilot.com` 而非租户端点，导致企业级自动化流水线中断。
3. **[#4533](https://github.com/github/copilot-cli/issues/4533) 并行子代理导致终端 UI 停止响应**
   - **关注原因**: 影响多代理工作流。当任务触发并行子代理时，UI 层停止消费事件，但 Rust 运行时仍在后台执行，造成严重的体验割裂。
4. **[#4647](https://github.com/github/copilot-cli/issues/4647) v1.0.81 破坏了与 chroma-mcp 的兼容性**
   - **关注原因**: 版本回归问题。升级到 1.0.81 后导致流行的 chroma-mcp 无法正常工作，阻碍了依赖该向量数据库的开发者。
5. **[#4654](https://github.com/github/copilot-cli/issues/4654) 企业版列出模型时使用了错误的 URL**
   - **关注原因**: 与 #4527 类似的企业认证痛点。CLI 在企业账户下尝试通过非企业 URL 获取模型列表，导致 401 未授权。
6. **[#4650](https://github.com/github/copilot-cli/issues/4650) 使用 `-p` 或 `--agent` 时企业认证失败**
   - **关注原因**: 阻断性 Bug。在交互模式正常的情况下，非交互提示或指定 Agent 时触发组织策略拦截，导致企业用户无法使用自动化能力。
7. **[#2930](https://github.com/github/copilot-cli/issues/2930) 功能请求：本地自动记忆（无远程存储）**
   - **关注原因**: 强安全合规需求。对远程数据存储有顾虑的组织希望提供仅限本地的代理记忆功能，以积累上下文而不泄露数据。
8. **[#4658](https://github.com/github/copilot-cli/issues/4658) 每次启动都重新安装 Shell 补全**
   - **关注原因**: 影响启动性能与无头模式。包括 `--server` 在内的所有模式每次启动都重装补全，在二进制文件不在 PATH 的编辑器扩展场景下毫无意义。
9. **[#4645](https://github.com/github/copilot-cli/issues/4645) `session.resume` 静默忽略 `model` 参数**
   - **关注原因**: 逻辑缺陷。恢复会话时传入的新模型参数被丢弃，且无任何报错，导致后续推理使用了过时的旧模型。
10. **[#4649](https://github.com/github/copilot-cli/issues/4649) Grok 与 Gemini 模型的 Tool search 延迟机制失效**
    - **关注原因**: 多模型适配问题。Tool search 降本机制在 GPT 上生效，但在 Grok 上未延迟任何工具（Token 消耗 57.7k vs 21.0k），Gemini 则完全无法启用。

## 4. 重要 PR 进展
*注：过去 24 小时内仅更新了 1 个 PR。*

1. **[#4497](https://github.com/github/copilot-cli/pull/4497) [CLOSED] Handle fork PR associations in invalid-label writer**
   - **内容**: 更新了受信任的 invalid-label writer，以处理 GitHub 未填充运行关联的 Fork PR 工作流。当关联缺失时，writer 会通过工作流元数据搜索并要求恰好有一个开放的 PR。

## 5. 功能需求趋势
从近期 Issues 中可以提炼出以下社区高度关注的功能方向：
- **企业级数据驻留与隔离**: 大量企业用户反馈 GHEC 环境下的端点路由错误，表明社区对 Copilot CLI 在复杂企业网络架构下的合规性支持需求极高。
- **MCP 生态兼容性与稳定性**: v1.0.81 引入的破坏性更新以及 OAuth 发现问题表明，社区正在大量接入各类 MCP Server（如 Atlassian, Chroma），对协议兼容性的容错要求在快速上升。
- **本地化与隐私安全记忆**: 开发者呼吁不依赖云端同步的本地上下文记忆能力，以满足代码不外传的严苛安全策略。
- **多模型公平适配**: 随着支持 Grok、Gemini 等非 OpenAI 模型，社区要求各项优化机制（如 Tool search 延迟加载）在不同模型上表现一致。

## 6. 开发者关注点
- **认证链路脆弱性**: 认证问题成为今日最高频的痛点。无论是 401 凭证错误提示不明确，还是企业版非交互模式 (`-p`) / 代理模式 (`--agent`) 频繁被组织策略拦截，都反映出当前认证模块在复杂环境下的健壮性不足。
- **TUI 渲染与生命周期管理**: 终端 UI 层的稳定性面临挑战。从输入框背景突变为黑色导致低对比度不可见，到并行子代理执行时 UI 线程停止消费事件，再到 `--resume` 时的挂起与参数丢失，前端交互层的 Bug 显著影响了开发体验。
- **底层资源占用失控**: 13GB 调试日志膨胀和每次启动重复安装 Shell 补全，暴露出 CLI 在长时间运行和无头模式下的资源管理存在盲区，亟需优化生命周期清理逻辑。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 (2026-08-29)

## 1. 今日速览
今日 Kimi Code CLI 社区无新版本发布，但围绕安全与计费问题引发了重要讨论。一个关于 MCP 工具绕过内置安全文件防护的严重漏洞已被确认并迅速关闭；同时有开发者反馈配额消耗异常（缓存读取计费放大超 10 倍）。此外，团队推进了一项针对 `asyncssh` 的安全依赖升级。

## 2. 版本发布
过去 24 小时内无新版本发布。

## 3. 社区热点 Issues
今日数据源共包含 3 条活跃 Issue，均具有较高的技术关注价值：

*   **#2625 [CLOSED] Security: MCP tool calls bypass the built-in secret-file guards (arbitrary file read demonstrated)**
    *   **链接**: [https://github.com/MoonshotAI/kimi-cli/issues/2625](https://github.com/MoonshotAI/kimi-cli/issues/2625)
    *   **关注理由**: 严重安全漏洞。内置文件工具会拦截读取 `.env` 或 SSH 私钥等敏感文件，但 MCP 工具调用绕过了此内容级防护。在自动批准模式下，恶意 MCP 服务器甚至可跳过审批提示进行任意文件读取。该 Issue 已被关闭，推测官方已紧急修复。
*   **#2626 [OPEN] Abnormal quota consumption: cache_read billed every turn with cache_creation always 0 (>10x amplification)**
    *   **链接**: [https://github.com/MoonshotAI/kimi-cli/issues/2626](https://github.com/MoonshotAI/kimi-cli/issues/2626)
    *   **关注理由**: 核心计费与性能问题。付费用户反馈在轻度使用下，5小时配额窗口在几分钟内损耗 40%。日志显示 `cache_read` 每轮都被计费，但 `cache_creation` 始终为 0，疑似缓存机制失效导致超 10 倍的计费放大。
*   **#2624 [OPEN] docs: openai_legacy hosted /v1 example (not openai_responses, not /login)**
    *   **链接**: [https://github.com/MoonshotAI/kimi-cli/issues/2624](https://github.com/MoonshotAI/kimi-cli/issues/2624)
    *   **关注理由**: 文档易用性问题。指出当前 `providers` 文档中关于 `openai_legacy` 的配置细节容易踩坑（如 `type` 字段误填为 `openai_responses`），呼吁补充更精确的自托管 /v1 接口示例。

## 4. 重要 PR 进展
今日数据源共包含 1 条活跃 PR：

*   **#2622 [OPEN] deps: bump asyncssh to 2.23.1 in pykaos (GHSA-2wxc-x7rj-hg8f)**
    *   **链接**: [https://github.com/MoonshotAI/kimi-cli/pull/2622](https://github.com/MoonshotAI/kimi-cli/pull/2622)
    *   **进展说明**: 安全依赖升级。将 `pykaos` 工作区包中的 `asyncssh` 从 2.21.1 升级至 2.23.1，以修复 GHSA-2wxc-x7rj-hg8f 和 GHSA-qr67-gv47-xwwh 两个安全漏洞，目前 PR 处于待合并状态。

## 5. 功能需求趋势
从今日的 Issues 中，可以提炼出社区当前高度关注的三个技术方向：
*   **MCP 安全与权限隔离**：随着 MCP 生态的接入，社区对工具调用链路的安全性提出极高要求。内置防护规则需要与 MCP 扩展工具做到同等级别的覆盖，避免产生安全盲区。
*   **Token 缓存与计费透明度**：开发者对 Prompt Caching 的实际生效状态与计费逻辑高度敏感。缓存未命中或计费逻辑错误会直接导致成本失控，亟需更透明的配额监控机制。
*   **第三方模型/服务接入规范**：用户存在对接非原生 OpenAI 兼容接口（如自托管 v1 端点）的强需求，需要更完善的配置文档和防错机制。

## 6. 开发者关注点
*   **MCP 自动批准模式的安全性**：开发者担忧在开启 auto-approve 后，第三方 MCP 工具会获得不受限制的底层文件访问权限，这是当前最大的安全隐患痛点。
*   **配额异常消耗的不可控性**：缓存机制失效导致的成本放大严重影响了开发体验，开发者迫切需要官方澄清缓存计费逻辑，并提供排查相关问题的日志工具。
*   **配置项的容错与文档精确度**：在对接第三方 Chat Completions 接口时，由于协议类型（`openai_legacy` vs `openai_responses`）区分不直观，开发者容易遇到配置错误，期望官方提供开箱即用的示例模板。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 (2026-08-29)

> 数据来源：github.com/anomalyco/opencode | 分析师：AI 开发工具技术分析师

## 1. 今日速览
今日 OpenCode 发布了 v1.18.25 版本，核心修复了 Azure CLI 的身份验证依赖问题。社区活跃度极高，热点集中在模型响应延迟、计费异常及 TUI 内存泄漏等核心稳定性与性能问题上。此外，核心开发团队今日提交了大量底层架构重构与修复 PR，重点优化了 AI 工具调用隔离、任务历史内存限制及 Linux 剪贴板交互体验。

## 2. 版本发布
- **v1.18.25**
  - **核心修复**：修复了 Azure 身份验证问题，现在 Azure CLI 登录无需强制依赖 Bun 运行时即可正常工作，降低了环境配置门槛。

## 3. 社区热点 Issues (Top 10)
今日社区讨论最为热烈的 Issues 集中在性能损耗、计费异常和本地模型集成上：

1. **[#29079](https://github.com/anomalyco/opencode/issues/29079) [CLOSED] GPT Models takes too long to respond** (👍52, 评论 119)
   - **关注点**：社区反馈极高。使用 GPT 模型时响应时间不稳定，简单指令也可能耗时数分钟。这反映了当前 OpenCode 在处理高频请求时的调度或网络层存在瓶颈。
2. **[#42700](https://github.com/anomalyco/opencode/issues/42700) [OPEN] tui: leaks ~21MB .so per launch into /tmp** (评论 7)
   - **关注点**：严重的内存泄漏问题。TUI 每次启动泄漏约 21MB `.so` 文件，最终导致 tmpfs 填满并引发启动崩溃，影响重度用户的连续开发工作流。
3. **[#29397](https://github.com/anomalyco/opencode/issues/29397) [CLOSED] Opencode Zen - Unexplained slowness on all models** (👍7, 评论 6)
   - **关注点**：全模型响应迟缓且无法通过 `Esc` 键稳定中断，暴露了客户端在处理长连接或阻塞请求时的中断机制缺陷。
4. **[#23461](https://github.com/anomalyco/opencode/issues/23461) [OPEN] opencode upgrade fails with 403** (👍2, 评论 5)
   - **关注点**：企业网络环境下的痛点。升级命令未透传 `GITHUB_TOKEN`，导致在代理/VPN 环境下触发 GitHub API 限流 (403)。
5. **[#38570](https://github.com/anomalyco/opencode/issues/38570) [OPEN] Limit calculation bug: 47% consumed but only $1.50 used** (评论 5)
   - **关注点**：计费与额度计算逻辑存在严重 Bug，百分比消耗与实际美元消耗脱节，引发用户对计费透明度的担忧。
6. **[#34402](https://github.com/anomalyco/opencode/issues/34402) [CLOSED] 1 Prompt took 21 USD in 2 minutes with no output** (评论 3)
   - **关注点**：极端计费案例。单次无输出 Prompt 消耗 21 美元，可能与模型陷入死循环或上下文异常膨胀有关。
7. **[#22792](https://github.com/anomalyco/opencode/issues/22792) [CLOSED] OpenCode repeatedly loops compaction-style summaries with local vLLM** (👍3, 评论 6)
   - **关注点**：本地大模型集成痛点。使用 vLLM 部署 Qwen3-Coder 时，OpenCode 触发病态的上下文压缩死循环，导致无法正常对话。
8. **[#38366](https://github.com/anomalyco/opencode/issues/38366) [OPEN] Bun crashes when several opencode instances launch concurrently** (评论 2)
   - **关注点**：macOS arm64 平台下，并发启动 6-8 个 TUI 实例会导致底层 Bun 运行时发生段错误 (Segfault) 崩溃。
9. **[#46059](https://github.com/anomalyco/opencode/issues/46059) [CLOSED] AI model gets stuck in a text-only reasoning loop** (评论 2)
   - **关注点**：Agent 核心行为异常。模型输出纯文本意图（如 "Let me grep..."）而不实际执行工具调用，导致推理死循环。
10. **[#34445](https://github.com/anomalyco/opencode/issues/34445) [CLOSED] Data loss: update recreated ~/.local/share/opencode** (评论 2)
    - **关注点**：版本升级导致的数据丢失事故。迁移至 SQLite 数据库时未能正确迁移旧会话历史，严重影响用户信任度。

## 4. 重要 PR 进展 (Top 10)
今日 PR 活动主要由核心开发者 @kitlangton 和 @Hona 主导，聚焦于底层重构与内存管理：

1. **[#460

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 (2026-08-29)

> 数据来源：github.com/QwenLM/qwen-code

## 1. 今日速览
今日 Qwen Code 发布了 **v0.22.3 正式版**及对应的 nightly 版本，正式版引入了 Channels 多持久任务会话管理和跨平台 CUA Driver 预编译二进制文件。社区活跃度集中在 Web Shell UI 稳定性修复、本地大模型兼容性以及 CI/CD 流程优化上，开发者对 submodule 环境下的 Git 操作限制反响强烈。

## 2. 版本发布
**v0.22.3 正式版** 发布，核心更新包括：
- **Channels 会话管理**：新增 owner-scoped named sessions，每个聊天最多可管理 8 个持久任务 ([#10198](https://github.com/QwenLM/qwen-code/pull/10198))。
- **扩展安装增强**：Daemon Extension 安装支持绝对本地路径，同时拒绝相对路径以保障安全。
- **CUA Driver 预编译**：发布 `cua-driver-rs-v0.20.2`，提供 macOS（签名+公证的通用二进制）、Linux（x86_64+arm64）和 Windows（x86_64+arm64）多平台支持。

**v0.22.3-nightly** 同步发布，主要更新：
- Web Shell 在分支选择器旁显示 Git 状态提示 ([PR #10397](https://github.com/QwenLM/qwen-code/pull/10397))。

## 3. 社区热点 Issues
以下是今日最受关注的 10 个 Issues：

1. **[#8432](https://github.com/QwenLM/qwen-code/issues/8432) [OPEN] Bailian Personal Token Plan 模型不同步导致生图/视频失败**
   - **关注点**：内置模型列表与百炼控制台实际可用模型脱节，导致核心生成功能失效，影响国内开发者正常使用。
2. **[#10435](https://github.com/QwenLM/qwen-code/issues/10435) [OPEN] 新版本导致本地 llama-server 推理崩溃**
   - **关注点**：v0.22.3 在请求本地 llama-server 时触发 `400 Failed to initialize samplers: failed to parse grammar` 错误，阻断本地模型代码审查流程。
3. **[#10075](https://github.com/QwenLM/qwen-code/issues/10075) [CLOSED] 配置 `permissions.allow` 后 edit/write_file 工具静默消失**
   - **关注点**：v0.22.1 引入的严重回归 Bug，配置工具白名单后，未在白名单中的工具会完全从会话中消失且无法被检索，目前已修复。
4. **[#10406](https://github.com/QwenLM/qwen-code/issues/10406) [OPEN] Web Shell 无限重渲染循环**
   - **关注点**：Daemon 不可达时，内联 `onError` 回调导致状态无限更新与重渲染，致使前端界面卡死。
5. **[#10380](https://github.com/QwenLM/qwen-code/issues/10380) [OPEN] OpenAI 兼容网关返回 HTTP 413 时 Auto-compaction 无法恢复**
   - **关注点**：长会话场景下，若反向代理请求体限制小于模型上下文窗口，会话将永久不可用，影响长任务执行。
6. **[#10448](https://github.com/QwenLM/qwen-code/issues/10448) [OPEN] 无 `.git` 文件夹则禁止 Git 操作的限制不合理**
   - **关注点**：新版本强校验 `.git` 目录导致 submodule 子目录中无法执行 Git 命令，引发大型项目开发者强烈不满。
7. **[#10373](https://github.com/QwenLM/qwen-code/issues/10373) [OPEN] VSCode webview 硬编码 `lang="en"` 致中文环境失效**
   - **关注点**：IDE 伴生插件底层硬编码语言标识，导致 `readLanguage()` 无法正确解析 zh-CN，影响本地化体验。
8. **[#10210](https://github.com/QwenLM/qwen-code/issues/10210) [OPEN] Agent Team `team_delete` 清理失败仍报成功**
   - **关注点**：多智能体系统文件系统清理操作缺乏严格的错误捕获，可能导致脏数据残留与状态不一致。
9. **[#10441](https://github.com/QwenLM/qwen-code/issues/10441) [OPEN] Review 功能存在本地 Filter 隐藏风险**
   - **关注点**：`localFilterCommands` 未展开 `include.path` 指令，存在通过 include 指令隐藏恶意 repo-local filter 的安全隐患。
10. **[#10399](https://github.com/QwenLM/qwen-code/issues/10399) [OPEN] Web Shell 工作区信息展示不足**
    - **关注点**：侧边栏仅展示工作区名称，缺乏工作区数量、状态等概览信息，影响多工作区

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*