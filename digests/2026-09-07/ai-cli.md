# AI CLI 工具社区动态日报 2026-09-07

> 生成时间: 2026-09-07 01:44 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-07）

---

## 1. 生态全景

AI CLI 工具正从"个人效率工具"向"团队级基础设施"演进。成本与配额管理问题在多工具社区集中爆发，表明 agent 复杂度提升已将资源消耗从边缘话题升格为核心痛点。与此同时，跨设备远程控制、任务调度自动化、上下文持久化等需求，揭示用户对 CLI 的期望已从"对话式编程辅助"转向"无人值守工作流平台"。Windows 平台稳定性与安全钩子失效问题的密集反馈，则折射出各工具"功能扩展速度"与"基础体验打磨"之间的明显张力。整体而言，各工具处于同质化竞争加剧、差异化定位初显的阶段。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 重要 PRs | Release 情况 |
|------|:---:|:---:|------|
| **Claude Code** | 10 | 4 | v2.1.263（补丁） |
| **OpenAI Codex** | 10 | 10（全部合入） | 无 |
| **Gemini CLI** | 10 | 4 | v0.60.0-nightly.20260907 |
| **GitHub Copilot CLI** | 10 | 未列出 | 无 |
| **Kimi Code CLI** | 5 | 1 | 无

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**：github.com/anthropics/skills ｜ **截止日期**：2026-09-07

---

## 1. 热门 Skills 排行

> 说明：热点 PR 按评论活跃度排序。截至数据截止日，Top 20 PR 均处于 **Open（未合并）

---

# Claude Code 社区动态日报（2026-09-07）

## 今日速览

今日发布补丁版本 **v2.1.263**（错误修复与可靠性改进）。社区最热门的讨论集中在两大主题：一是**成本与配额失控**——多条 Issue 报告多代理操作、代码审查工作流导致 token 消耗激增、订阅配额被快速烧尽；二是 **CVP 网络安全验证批准组织仍遭遇拦截**的持续争议（#84352，197 条评论）。此外，长期存在的挂起/冻结问题（#26224）热度依然高居不下（151 👍）。

## 版本发布

**v2.1.263**：仅包含常规错误修复与可靠性改进，无新功能说明。

## 社区热点 Issues（Top 10）

1. [CVP 批准的 Claude.ai 组织仍收到 cyber safeguard 拦截](https://github.com/anthropics/claude-code/issues/84352)（+27，评论 197）
   已获网络安全验证计划批准的组织在 Claude Code 中仍被拦截，验证门户显示“审核中”，与批准邮件矛盾。这已演变为社区高度关注的信任与合规流程争议。

2. [Claude Code 挂起/冻结 5-20 分钟](https://github.com/anthropics/claude-code/issues/26224)（+151，评论 130）
   长期未解决的高赞问题：大量提示词积压导致会话卡死，持续影响开发者日常使用，社区怨气较大。

3. [Linux 端无法用 Ctrl+Shift+C 或右键复制输出](https://github.com/anthropics/claude-code/issues/62699)（+68，评论 42）
   Linux TUI 的基础交互缺陷，复制能力长期缺失，对终端重度用户影响显著。

4. [MEMORY.md 自动压缩提醒阈值不可配置](https://github.com/anthropics/claude-code/issues/91188)（评论 28）
   当前硬编码 200 行/25KB 加载上限，社区请求将该阈值设为可配置或可单独关闭。

5. [Windows 桌面应用窗口始终置顶且无法关闭](https://github.com/anthropics/claude-code/issues/89467)（+14，评论 16）
   无任何设置、快捷键或菜单项可禁用置顶，干扰多任务操作。

6. [任务列表工具（TaskCreate 等）不再暴露给模型](https://github.com/anthropics/claude-code/issues/80015)（+13，评论 14）
   更新后工具集中彻底移除任务管理工具，模型无法创建/读取/修改任务，疑似功能回归。

7. [上下文压缩后丢失关键行为规则](https://github.com/anthropics/claude-code/issues/67500)（评论 12）
   mid-session 压缩后，模型丢失会话状态块、内存写入和 no-stop 策略，长会话可靠性受质疑。

8. [code-review 工作流消耗 110 万+ tokens 仅审查 5 个文件](https://github.com/anthropics/claude-code/issues/77943)（评论 5）
   成本极端不成比例且经常返回空结果，兼具成本与功能缺陷双重问题的典型代表。

9. [Android 远程控制推送永远收不到](https://github.com/anthropics/claude-code/issues/87003)（+4，评论 3）
   已在不同手机、不同 OS、多个 CLI 版本上稳定复现，此前 issue 被关闭后社区再次提交。

10. [并行子代理静默继承会话模型层级，烧光一周 Fable+Opus 配额](https://github.com/anthropics/claude-code/issues/87815)（评论 3）
    子代理未按成本效率模型切换，一晚耗尽一周预算。高成本事故再次引发对“多代理成本失控”的担忧。

## 重要 PR 进展

1. [修复 security-guidance 中 ** glob 不匹配零深度路径](https://github.com/anthropics/claude-code/pull/87079)（Open）
   `**/*.ts` 因 fnmatch 委托机制要求字面 `/`，导致顶层文件被静默排除在安全检查之外，属于安全规则失效问题。

2. [修复 PR 审查工具包中所有 agent 的无效 YAML frontmatter](https://github.com/anthropics/claude-code/pull/87077)（Open）
   agent 描述中未加引号的对话行含冒号，被解析为嵌套映射，导致 agent 元数据全部加载为空。

3. [edit-issue-labels.sh 无参数时增加错误提示](https://github.com/anthropics/claude-code/pull/68787)
   此前静默退出码 1，改进 CI 与手动运行时的可诊断性。

4. [修复 test-hook.sh 的 shell 注入漏洞](https://github.com/anthropics/claude-code/pull/68786)
   通过 stdin 重定向规避 `$TEST_INPUT` 嵌入 `bash -c` 字符串导致的注入风险，提高插件开发

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-07

## 1. 今日速览

今日 Codex 仓库无新版本发布，社区焦点集中在 Windows 平台的系列稳定性问题（Chrome 集成失效、进程/窗口异常），以及“Selected model is at capacity”容量错误的高频反馈。PR 侧则以 copyberry[bot] 的批量合作为主，涉及 TUI 工作树浏览器、MCP 用户验证、语音播放管道和 Bazel 构建优化等多项基础设施改进。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 社区热点 Issues

挑选了评论数最多、社区关注度最高的 10 个 Issue：

### #28919 — Windows Codex app 缺少“control other devices”标签
**63 条评论 · 59 👍 · 已开启**
Windows 用户在 Settings > Connections 中找不到“control other devices”标签页，无法远程控制其他设备。该 Issue 自 6 月创建以来持续活跃，是当前社区反馈最集中的 Windows 功能缺失问题。
🔗 https://github.com/openai/codex/issues/28919

### #10571 — “Bad request”错误
**28 条评论 · 9 👍 · 已开启**
CLI 0.94.0 用户在 Pro 订阅下使用 gpt-5.2 xhigh 模型时反复遇到“Bad request”错误，影响正常任务执行。未提供明确的触发条件，社区在跟帖中补充了多种复现环境。
🔗 https://github.com/openai/codex/issues/10571

### #41790 — “Selected model is at capacity”错误中断任务
**16 条评论 · 9 👍 · 已开启**
ChatGPT Pro 用户反馈 Codex app 在正常 agent 任务中频繁出现“Selected model is at capacity. Please try a different model.”错误，导致任务中断。该 Issue 与 #43322 同为容量类问题，反映模型容量不足已成为高频痛点。
🔗 https://github.com/openai/codex/issues/41790

### #29811 — Goal 压缩在 goal 继续前复活已完成的手动转向
**14 条评论 · 8 👍 · 已开启**
在长时运行的 active `/goal` 中，目标压缩（compaction）会意外恢复之前已完成的手动转向指令，导致 agent 行为与用户预期不符。涉及会话上下文管理与目标延续的复杂交互。
🔗 https://github.com/openai/codex/issues/29811

### #40596 — Windows unified exec 失败：`helper_unknown_error: setup refresh had errors`
**13 条评论 · 已开启**
Windows 版 Codex App（26.819.11345）无法启动 unified exec 终端，报 `helper_unknown_error`。Windows 平台执行环境的稳定性问题持续受到关注。
🔗 https://github.com/openai/codex/issues/40596

### #40228 — Windows: Chrome native host 过期导致插件卸载和反馈上传失败
**10 条评论 · 已开启**
Chrome 控制处于只读状态，点击、输入和导航均失败，提示“Codex Chrome native host is out of date”。插件卸载操作也无法完成。Windows 上的 Chrome 集成问题仍在持续发酵。
🔗 https://github.com/openai/codex/issues/40228

### #41874 — Windows Codex Desktop 选择性丢失本地会话
**8 条评论 · 已开启**
Windows 桌面版会丢失部分历史本地会话，而较旧的 legacy 线程仍然存在；同时项目分配迁移不完整。用户对 Windows 版数据持久性的信任度受到挑战。
🔗 https://github.com/openai/codex/issues/41874

### #29087 — 流式响应中断：`Transport error: network error: error decoding response body`
**7 条评论 · 已开启**
CLI 执行过程中模型流式响应意外断开，输出不完整。网络传输稳定性问题影响长任务可靠性，社区关注重试与恢复机制。
🔗 https://github.com/openai/codex/issues/29087

### #8317 — 为命令/任务添加时间调度能力（延迟、间隔、条件轮询）
**7 条评论 · 38 👍 · 已开启**
社区高赞功能请求：希望 Codex CLI 支持“每 10 分钟检查日志”“夜间运行测试”等定时/周期任务，目前缺少 first-class 调度原语。38 个 👍 表明这是开发者普遍期望的能力。
🔗 https://github.com/openai/codex/issues/8317

### #42182 — 主动感知配额的任务规划，避免任务中途中断
**6 条评论 · 已开启**
用户希望 Codex 在规划长任务时感知 5 小时/每周配额剩余量，并据此调整执行策略，避免任务执行到一半因配额耗尽而中断。当前容量/配额问题叠加使该需求更加迫切。
🔗 https://github.com/openai/codex/issues/42182

## 4. 重要 PR 进展

挑选了 10 个功能或修复影响较大的 PR：

### #43315 — 在操作会话前对标签进行唯一性解析
已关闭（合入）。修复了重复标签导致选中错误会话的问题；会话命令也支持在无显式名称时接受预览文本。
🔗 https://github.com/openai/codex/pull/43315

### #43308 — 用 socket 请求替代 Windows app-server 关闭文件
已关闭（合入）。通过本地控制 socket 的 `/daemon/shutdown` 路由管理 Windows app-server 关闭，要求服务器 PID 确认后才触发 drain 逻辑，提升关闭可靠性。
🔗 https://github.com/openai/codex/pull/43308

### #43286 — 为 TUI 添加托管工作树浏览器
已关闭（合入）。`/worktree` 新增“Browse worktrees”选项，支持搜索、查看 owner 元数据、恢复 owner 线程和复制工作树路径。
🔗 https://github.com/openai/codex/pull/43286

### #43289 — 添加受能力门控的 MCP 用户验证处理
已关闭（合入）。处理 `openai/userVerification` 请求，通过 `openai/elicitation/create` 传递，校验请求字段、大小限制和 base64url 编码。
🔗 https://github.com/openai/codex/pull/43289

### #43298 — 将托管工作树转换延迟到新的 TUI 循环迭代
已关闭（合入）。将工作树的 setup、checkout 等阶段拆分到独立的事件循环栈，避免在 `ChatWidget` 同步构造中执行重量级操作。
🔗 https://github.com/openai/codex/pull/43298

### #43265 — 添加实验性用户验证 API 契约
已关闭（合入）。新增 `userVerification/status`、`enroll`、`delete`、`verify` 四个接口，受 `experimentalApi` 能力门控，定义了请求、响应、证明及错误契约。
🔗 https://github.com/openai/codex/pull/43265

### #43248 — 将 voice-host RTP 音频连接到扬声器播放
已关闭（合入）。之前 voice host 只接收 RTP 包但不播放，现在通过 GStreamer 管道进行解码和扬声器输出，同时保留 speaker suppression 边界。
🔗 https://github.com/openai/codex/pull/43248

### #43282 — Bazel 二进制 stamping 改为 opt-in
已关闭（合入）。新增 `stamped_binaries` 列表，只有列出的二进制启用 stamping，减少因 Git revision/时间戳导致的缓存失效。
🔗 https://github.com/openai/codex/pull/43282

### #43304 — 隔离 Bazel 构建提交元数据与 Rust 编译输入
已关闭（合入）。修复 stamped Rust 二进制因包含 build user/host/timestamp 导致跨开发者和 CI 的远程缓存无法复用的问题。
🔗 https://github.com/openai/codex/pull/43304

### #43253 — 恢复遇到 active writer 时展示只读会话
已关闭（合入）。当会话在其他应用中打开时，resume 失败不再直接报错，而是允许用户以只读方式检查记录，并可在关闭后重试。
🔗 https://github.com/openai/codex/pull/43253

## 5. 功能需求趋势

从近期 Issues 中可提炼出以下社区重点诉求：

- **任务调度与自动化**：`#8317`（时间调度）和 `#42182`（配额感知规划）表明用户希望 Codex 能胜任更多无人值守的自动化场景，且具备前置约束感知能力。
- **配额/容量管理**：`#41790`、`#43322` 等容量错误频发，用户不仅需要更高的可用性，还希望在配额耗尽前获得预警与任务规划建议。
- **Windows 平台稳定性**：issue 列表中 Windows 相关占比极高，涉及 Chrome 集成、exec 环境、会话持久化、进程管理等；用户期待官方优先补齐 Windows 端的体验短板。
- **上下文与会话管理**：`#29811`（goal 压缩）、`#43295`（AGENTS.md 重载溢出）体现了长会话下上下文一致性和内存管理的深层需求。
- **跨平台功能对齐**：`#42846` 请求 Linux 桌面版支持 Computer Use，`#28919` 请求 Windows 端远程控制能力——用户期望三端功能对齐。

## 6. 开发者关注点

- **Windows 端高频故障**：Chrome native host 版本不匹配（#40228）、注册表残留（#40357）、native-hosts 文件缺失（#42520）、更新后无窗口（#42714）等问题密集出现，说明 Windows 版本的安装、更新与清理链路需要系统性加固。
- **模型容量错误影响任务连续性**：多个 Pro 用户遇到“model at capacity”中断，包括 20x 用户；除服务端扩容外，客户端也应支持自动切换/排队重试。
- **会话数据的持久性与可恢复性**：#41874 中 Windows 用户丢失本地会话、#43253 的 PR 允许只读恢复，反映出用户对会话数据安全和可恢复性的高度关注。
- **上下文窗口管理仍是长任务核心痛点**：无论是 goal 压缩复活旧指令（#29811）还是 AGENTS.md 重载导致超限（#43295），都指向同一个问题——如何在长会话中保持上下文的高效组织与裁剪。
- **构建与发布工程优化持续进行**：Bazel stamping 调整（#43282、#43304）、npm 发布流程拆分（#43281）表明官方在推进更高效的构建与发布流水线，这对社区贡献者和下游打包者是好消息。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-07

## 今日速览

昨日发布新的 nightly 版本（v0.60.0-nightly.20260907），主要为自动化版本更新。社区讨论焦点集中在**子代理/Agent 可靠性**（如 MAX_TURNS 误报成功、通用代理挂起）与**安全加固**（Windows 沙箱 git 参数校验、认证崩溃修复）两大方向，另有多个文档与依赖维护 PR 持续跟进。

---

## 版本发布

**v0.60.0-nightly.20260907.g85aca163f** — 常规 nightly 自动构建版本，无面向用户的功能变更，主要同步 main 分支代码。
[查看全部变更](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f)

---

## 社区热点 Issues

1. **Subagent 在 MAX_TURNS 后被误报为 GOAL 成功**
   - 作者：@matei-anghel ｜ 更新：2026-09-07 ｜ 评论：13 👍 2
   - `codebase_investigator` 子代理实际已触达最大轮次限制，却被标记为 `termination_reason: "GOAL"` 成功返回，掩盖了中断。属 P1 可靠性缺陷，涉及状态上报的真实性。
   - [查看 Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **通用代理（Generalist agent）永久挂起**
   - 作者：@turmanticant ｜ 更新：2026-09-07 ｜ 评论：8 👍 8
   - 一旦 CLI 将任务委派给通用代理，便可能无限期挂起（用户等过 1 小时）。强制模型不委派子代理即可绕过，说明问题定位在代理解析/调度层。目前社区反馈👍数高，影响面大。
   - [查看 Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **Shell 命令执行完毕后卡在 "Waiting input"**
   - 作者：@rnett ｜ 更新：2026-09-07 ｜ 评论：4 👍 3
   - 极其简单的 CLI 命令（不会请求输入的）执行完成后，会话仍显示命令运行中并卡住。属 P1 核心路径问题，会阻塞自动化工作流。
   - [查看 Issue #25166](https://github.com/google-gemini/gemini-cli/issues/25166)

4. **Gemini CLI 不会主动使用自定义 skills 和 sub-agents**
   - 作者：@rnett ｜ 更新：2026-09-07 ｜ 评论：6
   - 用户配置了 gradle、git 等 skills，但模型在相关场景下基本不会自主调用，只有显式指示才使用。反映出 Agent 对自定义工具的"主动性"不足，是社区长期关注的能力缺口。
   - [查看 Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

5. **利用模型 bash 亲和力：零依赖 OS 沙箱与执行后意图路由**
   - 作者：@abhipatel12 ｜ 更新：2026-09-07 ｜ 评论：9
   - Gemini 3 模型天然擅长 POSIX 工具链，希望在不牺牲安全性的前提下引入更自然的沙箱机制与执行后意图路由，让模型能更自由地使用 shell 能力——属于架构级增强提议。
   - [查看 Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)

6. **AST 感知的文件读取/搜索/代码库映射影响评估（EPIC）**
   - 作者：@gundermanc ｜ 更新：2026-09-07 ｜ 评论：7
   - 探索是否值得引入 AST 感知能力：更精确地读取方法边界、减少 token 噪声、提升导航效率。这是一条影响核心上下文管理的长期技术路线。
   - [查看 Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

7. **浏览器子代理在 Wayland 下失败**
   - 作者：@sigmaSd ｜ 更新：2026-09-07 ｜ 评论：4 👍 1
   - 浏览器代理在 Wayland 环境下直接失败，P1 问题，影响 Linux 用户使用浏览器自动化能力。
   - [查看 Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)

8. **浏览器代理忽略 settings.json 覆盖配置（如 maxTurns）**
   - 作者：@hsm207 ｜ 更新：2026-09-07 ｜ 评论：3
   - `AgentRegistry` 虽然正确读取并合入了配置，但浏览器代理实际运行时不遵守 `settings.json` 中的覆盖项，配置形同虚设。
   - [查看 Issue #22267](https://github.com/google-gemini/gemini-cli/issues/22267)

9. **加强 Auto Memory 的确定性脱敏并减少日志记录**
   - 作者：@SandyTao520 ｜ 更新：2026-09-07 ｜ 评论：5
   - 现存问题：转录内容在真正脱敏前就已发送至模型上下文，且服务可能记录已有 skill 内容。涉及隐私/安全边界，社区关注度较高。
   - [查看 Issue #26525](https://github.com/google-gemini/gemini-cli/issues/26525)

10. **/compress 命令在会话续传后不生效**
    - 作者：@Abhijit-2592 ｜ 更新：2026-09-07 ｜ 评论：2 👍 2
    - `/compress` 仅替换了内存中的对话历史，未回写到磁盘上的 session 文件，导致 `/resume` 后续传时压缩失效。影响长时间会话的 token 经济性。
    - [查看 Issue #21335](https://github.com/google-gemini/gemini-cli/issues/21335)

---

## 重要 PR 进展

1. **fix(core): 在 Windows 沙箱中校验 git 参数，阻止静默 `git diff --output`**
   - 作者：@PakCyberbot ｜ 优先级：P1/security ｜ 状态：Open
   - Windows 下所有 `git status | log | diff | show | branch` 都被视为只读而免确认执行，`--output` 参数可被利用截断/覆写文件。此 PR 修复这一安全漏洞。
   - [查看 PR #29184](https://github.com/google-gemini/gemini-cli/pull/29184)

2. **fix(cli): 防止在 git 仓库中认证时崩溃**
   - 作者：@ehsan-fj ｜ 优先级：P1/security ｜ 状态：Open
   - 修复 macOS Seatbelt 等受限权限环境下，CLI 启动挂载 `useGitBranchName` 读取 `.git` 失败导致崩溃的问题。
   - [查看 PR #29163](https://github.com/google-gemini/gemini-cli/pull/29163)

3. **fix(core): 在 MCP OAuth 流程中强制执行 RFC 9207 颁发者标识**
   - 作者：@jvargassanchez-dot ｜ 状态：Closed
   - 为 OAuth 授权响应增加 `iss` 字段校验，防止令牌被路由到非预期端点，强化 MCP 认证安全性。
   - [查看 PR #29117](https://github.com/google-gemini/gemini-cli/pull/29117)

4. **fix(cli): 设置编辑器拒绝非有限数字**
   - 作者：@bunnysayzz ｜ 优先级

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报
**2026-09-07**

---

### 1. 今日速览

今日社区动态集中于三条主线：一是**企业级配置与 ACP 模式回归问题**持续发酵，GHEC 数据驻留环境的 `copilot -p` 401 错误（#4527）与 ACP 模式权限自动放行（#4537）均与近期版本升级相关；二是**资源消耗与成本问题**引发关注，WSL2 下 31GB RSS 内存占用（#4694）和 BYOK 模式提示缓存被静默禁用（#4720）分别击中性能与成本痛点；三是**新回归问题集中出现**，Desktop app 1.1.15 的 Local 会话冲突（#4742）和 ask_user 表单数据丢失（#4738）均为昨日新提交的 triage issue。值得注意的是，#1665（项目级插件作用域）在获得 18 个 👍 后关闭，可能预示该特性已进入实现阶段。

---

### 3. 社区热点 Issues

#### 🔥 #1665 项目/仓库级插件作用域 — 高关注度特性请求已关闭
- **作者**: @willmarkley | 创建: 2026-02-24 | 更新: 2026-09-07
- **评论**: 14 | 👍 18 | 状态: **CLOSED**
- 该 issue 请求将 Copilot CLI 插件从"每用户全局加载"扩展为"按项目/仓库作用域加载"，以便不同仓库使用各自的插件集。18 个 👍 在近期 issue 中属于较高的社区关注度，经历约 6 个月后关闭，很可能是官方已确认进入实现路线图。
- 链接: https://github.com/github/copilot-cli/issues/1665

#### 🚨 #4537 ACP 模式再次自动批准工具调用 — 安全回归
- **作者**: @richardjv-msft | 创建: 2026-08-20 | 更新: 2026-09-06
- **评论**: 2 | 👍 2 | 状态: **OPEN**
- 自 1.0.81-1 起，`--acp` 模式不再发送 `session/request_permission`，shell 命令、文件编辑和删除在无人值守下自动执行，且会话日志中无权限豁免记录。该 issue 被标记为 #845 的回归，涉及代码执行安全，值得高度重视。
- 链接: https://github.com/github/copilot-cli/issues/4537

#### 🔄 #4695 MCP OAuth 令牌跨会话无法可靠复用 — 频繁重复认证
- **作者**: @DaveHolden2025 | 创建: 2026-09-02 | 更新: 2026-09-06
- **评论**: 5 | 👍 0 | 状态: **OPEN**
- 对于使用 OAuth（PKCE、public client）的 HTTP 型 MCP 服务器，CLI 在会话间生成新的 cache-key 哈希，未能复用仍有效的缓存令牌，导致重复的重新认证流程。该问题直接影响 MCP 生态的日常使用体验。
- 链接: https://github.com/github/copilot-cli/issues/4695

#### 🏢 #4692 企业默认模型在 CLI 中不可用 — VS Code/Desktop 正常
- **作者**: @muhssamy | 创建: 2026-09-02 | 更新: 2026-09-06
- **评论**: 4 | 👍 0 | 状态: **OPEN**
- 组织将默认企业模型设置为 `MAI-Code-1.1-Flash`，VS Code 和 GitHub Desktop 均能正常识别，CLI 却提示 "The organization-managed default model is not available for this account" 并回退到默认模型。企业用户配置不一致问题亟待修复。
- 链接: https://github.com/github/copilot-cli/issues/4692

#### 🔐 #4527 GHEC 数据驻留环境 `copilot -p` 401 认证失败
- **作者**: @AvitalLivshits | 创建: 2026-08-19 | 更新: 2026-09-06
- **评论**: 3 | 👍 4 | 状态: **CLOSED**
- 在带有数据驻留功能的 GHEC 租户（`<tenant>.ghe.com`）上，非交互模式 `copilot -p` 启动时因模型目录获取请求打到 `api.githubcopilot.com` 而非租户端点，导致 `Authentication failed`；交互模式则完全正常。该 issue 已关闭，可能已包含在近期修复中。
- 链接: https://github.com/github/copilot-cli/issues/4527

#### 🖥️ #4742 Desktop app 1.1.15 无法创建第二个 Local 会话
- **作者**: @DannyBe99 | 创建: 2026-09-06 | 更新: 2026-09-07
- **评论**: 1 | 👍 0 | 状态: **OPEN** (triage)
- 桌面应用自动更新到 1.1.15 后，同一项目下若已有一个 Local（branch 类型）会话在运行，再创建新 Local 会话会失败并提示 "This project already has an active Local workspace"。属于最新版本引入的回归问题。
- 链接: https://github.com/github/copilot-cli/issues/4742

#### 🐌 #4694 WSL2 下 Copilot CLI 消耗约 31GB RSS 和 57% CPU
- **作者**: @stark-antonio-almeida | 创建: 2026-09-02 | 更新: 2026-09-06
- **评论**: 0 | 👍 0 | 状态: **OPEN**
- 在 WSL2 中使用 Claude Opus 5 High Effort 运行长会话，当上下文使用约 47% 时（配合 thinking-beast-mode 代理），进程消耗约 31GB 内存和 57% CPU。极端资源占用可能导致 WSL2 整体卡顿，甚至触及 Linux 内核 OOM 阈值。
- 链接: https://github.com/github/copilot-cli/issues/4694

#### 💸 #4720 BYOK 模式静默禁用提示缓存 — 成本约 5 倍
- **作者**: @Jianshui | 创建: 2026-09-04 | 更新: 2026-09-06
- **评论**: 0 | 👍 0 | 状态: **OPEN**
- Copilot CLI 1.0.82 在 BYOK 模式下发送的聊天请求**完全不含 prompt-cache 声明**，整个会话的提示缓存被禁用。提供方 usage 显示 `cached_tokens=0` 且 `cache_creation=0`，每轮都按全量上下文计费，成本约为此前的 5 倍。
- 链接: https://github.com/github/copilot-cli/issues/4720

#### ⌨️ #2644 请求支持 Shift+Arrow 和 Ctrl+A 文本选择
- **作者**: @mu88 | 创建: 2026-04-11 | 更新: 2026-09-06
- **评论**: 3 | 👍 2 | 状态: **OPEN**
- 当前 CLI 的输入行不支持标准的 GUI 风格文本选择快捷键：Shift+Arrow（包括 Shift+Home/End）无法选中文本，Ctrl+A 不执行全选。该请求已持续数月，反映开发者对终端输入体验的预期。
- 链接: https://github.com/github/copilot-cli/issues/2644

#### 🚨 #4738 ask_user 表单提前按 Enter 导致输入数据永久丢失
- **作者**: @cthorman | 创建: 2026-09-06 | 更新: 2026-09-06
- **评论**: 0 | 👍 0 | 状态: **OPEN** (triage)
- 用户在使用 ask_user 表单时，过早按 Enter 会提交/取消当前表单，并**永久丢弃**正在输入的内容（无恢复途径）。该作者标注严重级别为 High（数据丢失），并建议增加草稿自动保存/恢复机制。
- 链接: https://github.com/github/copilot-cli/issues/4738

---

### 4.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-09-07）

## 今日速览

过去 24 小时无新版本 Release；社区最热门的动态是 Issue #1282 提出的 Remote Control（远程控制）需求，目前已获得 32 个 👍 和 13 条评论，是当前最受关注的功能请求。与此同时，PR #2513 正在修复工具调用参数双重编码导致的校验失败问题。

## 版本发布

过去 24 小时无新版本发布。

## 社区热点 Issues

> 说明：过去 24 小时有更新的 Issue 共 5 条，未满 10 条，以下全量呈现。

### 1. #1282 [enhancement] Remote Control - Continue local sessions from any device  
- 作者：@CatKang ｜ 创建：2026-02-27 ｜ 更新：2026-09-06  
- 评论：13 ｜ 👍：32 ｜ 状态：Open  
- 价值点：允许用户从手机、平板或浏览器继续本地 Kimi Code CLI 会话，解决远程办公场景下的工作流连续性问题。社区共鸣强，是最热门的需求。  
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1282

### 2. #2252 [enhancement] 希望增加 /goal 命令并允许 coding plan 导入到 Codex 中使用  
- 作者：@DuskLin ｜ 创建：2026-05-13 ｜ 更新：2026-09-06  
- 评论：9 ｜ 👍：2 ｜ 状态：Closed  
- 价值点：用户希望对齐 Codex 的 `/goal` 命令（Claude Code 已跟进），并支持将 Kimi coding plan 导入 Codex，反映跨工具互操作需求。  
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2252

### 3. #1284 [bug] Does not launch in Zed IDE ACP panel in Windows  
- 作者：@prashanth057 ｜ 创建：2026-02-27 ｜ 更新：2026-09-06  
- 评论：1 ｜ 状态：Closed  
- 价值点：Windows 平台下 Zed IDE ACP 面板无法启动 CLI，属于 IDE 集成类问题。  
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1284

### 4. #1350 [bug] 频繁出现 Authorization failed, please check your login status  
- 作者：@dapeng1162 ｜ 创建：2026-03-05 ｜ 更新：2026-09-06  
- 评论：0 ｜ 状态：Closed  
- 价值点：登录认证频繁失败，直接影响 CLI 基础可用性，需重点排查认证链路。  
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1350

### 5. #1349 [bug] shell prompt no longer shows cwd/git branch; request configurable display  
- 作者：@Sirfetch-d ｜ 创建：2026-03-05 ｜ 更新：2026-09-06  
- 评论：0 ｜ 状态：Closed  
- 价值点：shell prompt 回归，不再显示当前目录和 git 分支信息，降低交互时对仓库上下文的感知，用户希望支持可配置显示。  
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1349

## 重要 PR 进展

> 说明：过去 24 小时有更新的 PR 共 1 条，全量呈现。

### #2513 fix(kosong): recursively decode double-encoded tool-call arguments  
- 作者：@nitishagar ｜ 创建：2026-07-19 ｜ 更新：2026-09-06 ｜ 状态：Open  
- 修复内容：Moonshot API 返回的 `function.arguments` 可能将嵌套数组/对象编码为 JSON 字符串（双重编码），单次 `json.loads` 后仍为字符串，导致 Pydantic 校验失败。新增共享函数 `decode_tool_arguments`，递归解码这类参数。  
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2513

## 功能需求趋势

从近期 Issue 更新中可以看到社区关注的主要方向：

- **远程控制与跨设备会话连续性**：#1282 是最热需求，用户希望打破设备限制，随时随地接管本地会话。
- **命令体系与生态互操作**：#2252 显示用户希望 Kimi CLI 能提供与 Codex/Claude Code 一致的命令体验，并支持 coding plan 导入其他平台。
- **IDE/编辑器集成**：Windows 上 Zed ACP panel 的启动问题，说明 IDE 集成仍是高频使用场景。
- **稳定性与认证可靠性**：#1350 的 Authorization failed 问题会影响所有依赖登录的使用流程。
- **终端交互可配置化**：#1349 要求 prompt 恢复并支持配置 cwd/git 分支，体现开发者对终端信息密度有明确偏好。

## 开发者关注点

- **工作流连续性**：在多设备办公普遍的趋势下，用户希望不丢失上下文即可切换设备继续工作。
- **与主流 AI 编程工具互通**：用户不满足于单工具孤岛，期待与 Codex 等平台无缝协同。
- **认证稳定性**：频繁登录失效会打断开发节奏，token 管理和刷新机制需要加强。
- **终端信息可读性**：prompt 中的 cwd/git 分支对确认当前代码上下文很重要，此类回归应尽快修复。

> 注：本次动态数据窗口较小，热点 Issue/PR 已全量列出；如需更完整的榜单，建议扩大统计周期。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-09-07

## 今日速览

- 权限系统成为社区焦点：#7006 曝光 `permission.ask` 插件 hook 定义了却不触发（16 评论 / 25 👍），#24335 揭露通配符规则意外覆盖更低优先级配置，插件开发者与权限定制用户受影响明显。
- 计费与配额问题集中爆发：Go 订阅用户遭遇 20 分钟配额耗尽（#42935）、连续 3 天 HTTP 429 限流（#47613）、以及额度未满却被阻断（#47703），付费服务的稳定性与用量可观测性遭到集中质疑。
- 桌面端性能修复进入密集期：electron-store 迁移 SQLite（#47695）、大粘贴崩溃修复（#47427）、以及存储写入三层重构（#47704-#47706）相继推进，Windows 下的卡死与崩溃问题有望获得系统性改善

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-07）

## 1. 今日速览

昨日发布 `v0.23.1-preview.1` 及两个 nightly 版本，核心新增 Web Shell 动态工作流运行的可视化管理能力。社区讨论热度集中在 TUI 渲染层 OpenTUI 迁移（#8662，30 条评论）、Web Shell 导出体积过大（19.5 MB）以及两个 P1 安全问题（PreToolUse 钩子失效、遥测数据未脱敏）。此外，v0.23.1-preview.1 的发布流程因 `integration_docker` 任务失败而中断，CI 可靠性问题再次引发讨论。

## 2. 版本发布

**v0.23.1-preview.1**（Release v0.23.1-preview.1）

> ⚠️ 该版本的发布工作流在 `integration_docker` 任务上失败，详见 [#11185](https://github.com/QwenLM/qwen-code/issues/11185)。

变更内容：
- **feat(web-shell)**：可视化并管理动态 workflow 运行（[#10594](https://github.com/QwenLM/qwen-code/pull/10594)），由 @qqqys 贡献
- **perf(web-shell)**：派生 session workflow 项目，优化相关性能

**v0.23.0-nightly.20260906.92a8a8d179** 与 **v0.23.0-nightly.20260905.0c945a6136** 包含相同的两项改动。

## 3. 社区热点 Issues

### 3.1 渲染层现代化：TUI 从 ink 迁移到 OpenTUI（30 条评论）
[#8662](https://github.com/QwenLM/qwen-code/issues/8662) — 当前 TUI 基于 ink 7 + React 19，附带约 1037 行补丁和自定义虚拟视口模式，存在闪烁等结构性难题。该 issue 作为迁移跟踪项，收到 30 条评论，是当前社区最关注的架构改造方向。关联 PR 已有显著进展（见下方 #11152）。

### 3.2 【P1 安全】遥测上传未脱敏的原始工具错误文本
[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — 默认开启的 usage-statistics 通道将包含 shell 命令行的原始工具错误文本直接上传至 RUM 端点，且未做任何脱敏。该问题存在于 main 分支，影响面比之前 #10916 标记的单个字段更广。@yiliang114 报告。

### 3.3 【P1 安全】PreToolUse 钩子在 `--continue` 后停止执行
[#11180](https://github.com/QwenLM/qwen-code/issues/11180) — 技能（skill）的 `PreToolUse` 安全钩子在正常会话中生效，但 `--continue` 恢复会话后该钩子不再拦截，而技能指令仍保留在上下文中。@TianYuan1024 同时报告了另一个相关缺陷：通过 `/<skill-name>` 启动技能时钩子也不执行（[#11067](https://github.com/QwenLM/qwen-code/issues/11067)，已关闭）。

### 3.4 【P1 性能】Web Shell 移动端会话切换卡顿
[#6181](https://github.com/QwenLM/qwen-code/issues/6181) — 四层成本叠加导致卡顿：移动端抽屉轮询未受门控、全量 transcript 同步渲染、未压缩的全历史加载、以及每帧 O(transcript) 的计算开销。状态为 `ready-for-agent`，有明确的改进方向。

### 3.5 Web Shell 运行时体积问题（已修复）
[#11031](https://github.com/QwenLM/qwen-code/issues/11031)（已关闭）— `/export html` 将完整的 Web Shell 运行时嵌入每个导出文件，仅空会话就产生 19.5 MB 的 HTML。@yiliang114 提交了修复：导出时不再内嵌完整运行时，而是使用只读 transcript 入口 + 按需加载。该问题带动了后续 #11100 的追踪。

### 3.6 【P2】核心调度器：预中止的请求卡在不相关批次后
[#11146](https://github.com/QwenLM/qwen-code/issues/11146) — `CoreToolScheduler.schedule()` 在批次运行/收尾期间，对已取消的信号仅注册 abort 监听却未及时清理，取消请求可能无谓地等待。@CorgiBoyG 报告，并同步提交了修复 PR（#11162 为同类问题的另一变体）。

### 3.7 CI 发布流程超时与重复工作
[#11109](https://github.com/QwenLM/qwen-code/issues/11109) — `release.yml` 大量重复执行同一 run 已完成的工作，且一个 20 分钟的步骤实际上"什么都没验证"。昨日两次 release run 超时（[33957952281](https://github.com/QwenLM/qwen-code/actions/runs/33957952281)、[33963757913](https://github.com/QwenLM/qwen-code/actions/runs/33963757913)）。@yiliang114 提出重构建议。

### 3.8 v0.23.1-preview.1 发布失败
[#11185](https://github.com/QwenLM/qwen-code/issues/11185)（已关闭）— 发布工作流的 `integration_docker` 任务失败，由 GitHub Actions 自动报告。结合 #11109，CI 稳定性已成为社区明显痛点。

### 3.9 【P2】右键菜单未消费按键事件，影响编辑器和工具确认对话框
[#11228](https://github.com/QwenLM/qwen-code/issues/11228)（今日新增）— `KeypressContext` 的广播机制丢弃处理器返回值，导致右键菜单打开时，composer 和工具审批对话框仍响应同一按键。@yiliang114 在今日创建并标记为 `ready-for-human`。

### 3.10 【P2】`/effort` 未传播到 OpenAI 兼容后端
[#11227](https://github.com/QwenLM/qwen-code/issues/11227) — 用户通过 OpenAI 兼容 API 连接本地 NInfer 后端时，`/effort` 命令仅更新了 Qwen Code 内部状态，并未写入 HTTP 请求。这类"配置未传递"问题在自定义后端场景中较具代表性。

## 4. 重要 PR 进展

### 4.1 OpenTUI 渲染器收尾工作
[#11152](https://github.com/QwenLM/qwen-code/pull/11152)（新）— @chiga0 提出关闭 OpenTUI 与 ink 渲染器之间最后的已知行为差距（对话框、composer、shell 模式），一个 commit 对应一个差距，并附带验收测试框架。这是 #8662 迁移工作的关键一步。

### 4.2 serve 扩展作用域限定到工作区运行时
[#11086](https://github.com/QwenLM/qwen-code/pull/11086)（autofix/takeover）— 全局扩展目录按各工作区选定的运行时生效，同步更新扩展管理、composer 添加菜单和 `

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*