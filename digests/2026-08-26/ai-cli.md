# AI CLI 工具社区动态日报 2026-08-26

> 生成时间: 2026-08-26 00:37 UTC | 覆盖工具: 7 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据来源**: github.com/anthropics/skills | **截止日期**: 2026-08-26

---

## 1. 热门 Skills 排行

以下按 PR 评论热度排序（数据为评论数 Top 50 中的前列，均处于 **OPEN** 状态）：

**① skill-creator 评估链路修复** — [#1298](https://github.com/anthropics/skills/p

---

# Claude Code 社区动态日报 — 2026-08-26

## 今日速览

昨日发布 v2.1.245 与 v2.1.246 两个版本，分别修复 Linux glibc 2.44 崩溃问题、新增 Bash 规则通配符警告与 Auto mode 权限标签页。社区方面，围绕 **CVP 批准组织仍被 cyber safeguard 拦截**（#84352，155 条评论）的争议持续发酵，成为当前社区关注度最高的问题；同时 Windows 桌面版 GPU 崩溃（#80444）与 WSL 滚轮回归（#65833）等稳定性问题仍悬而未决。

## 版本发布

**v2.1.246** — 新增 Bash 允许规则中通配符位于子命令之前（如 `Bash(git * main)`）的启动警告，因该模式可能意外匹配插入到子命令前的选项；`/permissions` 新增 Auto mode 分类器规则查看与编辑标签页。

**v2.1.245** — 修复在搭载 glibc 2.44 的 Linux 发行版（Arch Linux、CachyOS、Fedora Rawhide）上启动崩溃的问题。

## 社区热点 Issues

1. **[#84352] CVP 批准组织仍收到 cyber safeguard 拦截** · 155 评论 · 👍 24
   https://github.com/anthropics/claude-code/issues/84352
   已获 Cyber Verification Program 批准的 Claude.ai 组织在 Claude Code 中仍被安全拦截，且验证门户显示申请"重新审查"。企业用户合规流程受阻，是当前社区讨论最激烈的问题，已持续三周未解决。

2. **[#50246] 消息队列模式功能请求** · 68 评论 · 👍 199
   https://github.com/anthropics/claude-code/issues/50246
   提议新增消息队列模式，让用户在 Claude 执行任务期间可排队后续指令，避免打断当前工作流。社区高赞需求，虽状态为 CLOSED（可能是已合并或在其他版本中实现），但关注度极高。

3. **[#80444] Windows 桌面版致命 GPU 进程崩溃** · 56 评论 · 👍 9
   https://github.com/anthropics/claude-code/issues/80444
   Windows 桌面版 1.24012.1 内嵌浏览器标签页触发 GPU 进程崩溃（0x060C201E），崩溃后 MSIX 包进入不可启动状态（appxState=2），必须执行 Repair 才能恢复。已复现于两个 GPU 驱动版本。

4. **[#65833] WSL 中滚轮不再滚动对话** · 41 评论 · 👍 99
   https://github.com/anthropics/claude-code/issues/65833
   v2.1.150 起 WSL 下鼠标滚轮从滚动对话变为发送方向键，在输入框循环切换历史命令。TUI 回归问题，直接影响 WSL 用户的日常使用体验。

5. **[#86142] MCP 服务器声明 draft-07 outputSchema 被客户端直接拒绝** · 29 评论 · 👍 12
   https://github.com/anthropics/claude-code/issues/86142
   MCP 服务器若声明 draft-07 版本的 JSON Schema，客户端在分发前就以"不支持的方言"整站拒绝，导致这些服务器完全不可用。已标记 has repro 并在 macOS 上确认，已于今日关闭，修复有望。

6. **[#61012] Pro 计划频繁触发用量限制** · 18 评论 · 👍 8
   https://github.com/anthropics/claude-code/issues/61012
   Windows 平台 Pro 用户在没有活跃使用时反复收到用量限制提示。影响付费用户的可用性信任度，尚在开放状态。

7. **[#82049] Claude.ai 登录验证邮件延迟 2–5 分钟** · 14 评论 · 👍 25
   https://github.com/anthropics/claude-code/issues/82049
   自 2026 年 7 月中旬起 magic link 邮件延迟持续恶化，从秒级延迟变为 2–5 分钟，影响会话过期后的登录流程，进而拖慢进入 Claude Code 的速度。

8. **[#87804] .claude/rules/ 缺少主题触发条件** · 13 评论
   https://github.com/anthropics/claude-code/issues/87804
   现有 `paths:` 配置只能按文件路径匹配，无法按提示词主题条件加载规则文件。开发者希望获得基于主题的规则触发能力，是规则引擎演进的重要方向。

9. **[#85901] MSIX 包缺少 Code Integrity 目录导致桌面版崩溃** · 11 评论 · 👍 1
   https://github.com/anthropics/claude-code/issues/85901
   发布的 MSIX 缺少 AppxMetadata\CodeIntegrity.cat，vk_swiftshader.dll 被代码完整性策略拦截，导致 AppX 容器销毁（0x3CFC）。属于打包流程缺陷，并暴露了数据丢失风险。

10. **[#89040] /compact 在超大对话上静默失败** · 2 评论
    https://github.com/anthropics/claude-code/issues/89040
    手动 /compact 在超大对话中生成摘要后不写入 compact_boundary 记录，上下文不收缩且无任何错误提示。上下文管理机制的关键 bug，可能导致长会话失去压缩能力。

## 重要 PR 进展

由于过去 24 小时 PR 更新仅 1 条，以下列出该 PR：

- **[#89404] validate-agent.sh: 修复 set -e 导致的首警告即中止及误报** · 更新于 2026-08-25
  https://github.com/anthropics/claude-code/pull/89404
  修复 plugin-dev 技能中 validate-agent.sh 的三个 `set -euo pipefail` 交互问题：算术表达式导致首次警告即中止脚本、误将合法 agent 报为错误。解决公开 issue #83803，保证 CI 与本地校验不再误报。

## 功能需求趋势

从近期活跃 Issues 中可提炼出以下社区关注方向：

- **MCP 生态兼容性**：除 draft-07 schema 被拒问题外，MCP 授权与连接器（如 Slack）在 routines 中不可见的问题也在涌现，反映社区对 MCP 生态深度集成的需求日益强烈。
- **规则与安全策略精细化管理**：从"路径触发"扩展到"主题触发"（#87804）的呼声，以及 Auto mode 分类器规则的加入，说明用户需要更细粒度的规则控制能力。
- **会话控制能力**：消息队列模式（#50246）以 199 👍 成为社区最渴望的交互改进之一，核心诉求是不打断当前任务的情况下管理后续指令。
- **技能（Skill）作用域边界**：继 #82801 确认技能前置 hooks 持久存在后，社区跟进提出"将 hook 严格限制在技能执行期间"的新需求（#89669），反映技能隔离性诉求。

## 开发者关注点

- **Windows/MSIX 包稳定性问题突出**：GPU 崩溃导致包不可启动（#80444）、CodeIntegrity.cat 缺失触及数据安全（#85901）、更新时文件被 cowork-svc.exe 锁定（#73694）、后台 agent 被静默杀死（#82277）——Windows 桌面版的包管理与进程隔离是当前最大的稳定性短板。
- **WSL/TUI 回归事件频发**：滚轮行为回归（#65833）已持续数月未修复，SGR 鼠标模式残留（#79015）、OSC 8 超链接回归（#79839）等问题说明 TUI 层需要更系统的回归测试保障。
- **模型对规则的遵循存在漂移**：开发者报告"阻止性规则失效、扩展性规则继续生效"（#89244）以及"禁止性指令被渐进式漂移绕过"（#89464），提示模型行为在对立指令场景下的稳定性仍需加强。
- **后台与自动化的可靠性**：Autocompact 在自主会话中不主动触发（#77509）、/compact 静默失败（#89040）、worktree GC 误删脏工作树（#74719）——无人值守场景下的数据安全与任务可靠性是开发者的核心焦虑。
- **登录与用量基础设施**：验证邮件延迟（#82049）和 Pro 用量限制误触发（#61012）直接影响生产可用性，是标题级体验问题。

---

*数据来源：github.com/anthropics/claude-code · 统计时段：2026-08-25 至 2026-08-26*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-26

## 今日速览

昨日 Codex 仓库保持高频迭代：合并了一批以 MCP 安全加固（企业 IdP 身份解析、OAuth 交换、权限归属）、可观测性（技能/图像生成/SQLite 遥测）与测试基建（Bazel 兼容性测试）为主的后端 PR；同时社区侧 Windows 桌面端 Bug 报告集中爆发，涵盖启动崩溃、MCP 配置解析失败、会话状态卡死等问题，Linux 桌面端与 Windows 独立安装器仍是呼声最高的功能需求。

---

## 版本发布

过去 24 小时发布了 3 个 Rust 预发布版本，均为空 Release Notes：

- [rust-v0.150.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.9)
- [rust-v0.150.0-alpha.10](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.10)
- [rust-v0.150.0-alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.11)

三个 alpha 版本紧密发布，推测正在为 0.150.0 正式版做快速迭代，具体变更内容未随 Release 说明披露。

---

## 社区热点 Issues（10 个精选）

### 🥇 社区呼声最高

**[#11023 Codex Linux 桌面版（已关闭）](https://github.com/openai/codex/issues/11023)**
- 209 评论 / 953 👍
- 最早于 2 月提出，历经半年讨论后关闭，目前尚未看到正式的 Linux 支持公告。用户明确表示因 macOS 端存在性能问题（#10432），希望能迁移到 Linux 桌面使用。这是社区关注度最高的单一 Issue。

**[#13993 支持 Windows 独立安装器 codex-setup.exe](https://github.com/openai/codex/issues/13993)**
- 81 评论 / 186 👍
- 大量企业用户因微软商店限制、离线环境或安全策略无法安装 Store 版本，强烈呼吁提供传统 exe 安装器。属于高频企业采纳障碍。

### 🐛 Windows 端问题集中爆发

**[#40715 Windows 版 MCP 配置 "invalid transport" 错误](https://github.com/openai/codex/issues/40715)**
- 17 评论 / 7 👍
- 稳定版 26.820.60940 在读取 `mcp_servers.codex_app` 时抛出 "invalid transport"，而同版本 Beta 26.727.40816 正常——稳定版反而回退，用户信任受影响。

**[#28392 Windows Store 版启动失败："Unable to locate the Codex CLI binary"](https://github.com/openai/codex/issues/28392)**
- 4 评论 / 0 👍
- 安装 Store 版本后应用无法定位 CLI 二进制，应用直接不可用。6 月报告至今仍未解决。

**[#34026 Windows 桌面版：已完成线程仍显示 "thinking"](https://github.com/openai/codex/issues/34026)**
- 14 评论 / 0 👍
- 已完成的对话线程在 UI 中永远显示思考中，新消息被本地排队无法开启新回合。连续两个版本复现。

**[#39443 Windows 版在 chrome.dll 中立即崩溃（C0000005）](https://github.com/openai/codex/issues/39443)**
- 5 评论 / 0 👍
- 应用启动即崩，报错指向 chrome.dll 访问冲突。影响 ChatGPT Plus 用户。

**[#40700 Windows 版无法启动：WindowsApps 目录中 codex.exe 重定位失败](https://github.com/openai/codex/issues/40700)**
- 6 评论 / 0 👍
- 26.820 版本从 WindowsApps 移动 bundled codex.exe 时失败，应用完全无法启动。

### 🧠 功能与体验讨论

**[#25179 桌面版积累陈旧 subagents 无法可靠关闭（21 评论）](https://github.com/openai/codex/issues/25179)**
- 长时间会话中，subagents 在缓存与 UI 中持续累积，无法关闭，影响长任务体验。

**[#31868 支持 GPT-5.6 可选 1M 上下文（8 评论 / 22 👍）](https://github.com/openai/codex/issues/31868)**
- 作为 #19464 的后续，请求在 Codex 全客户端（App/CLI/IDE）支持可选 1M 上下文窗口，社区关注度较高。

**[#39819 恢复 Tool Call 可见性选项（已关闭，3 评论 / 10 👍）](https://github.com/openai/codex/issues/39819)**
- 用户希望 `config.toml` 提供工具调用显示开关，因为新版折叠视图丢失了详细工具调用信息。Issue 虽关闭，但代表了一部分 CLI 用户对 TUI 信息密度的诉求。

---

## 重要 PR 进展（10 个精选）

### 🔐 MCP 与企业安全

**[#40739 为企业 IdP 添加 MCP OAuth 身份解析](https://github.com/openai/codex/pull/40739)**
- 将存储的企业 IdP 会话与发现的授权元数据做匹配，验证 issuer、公钥客户端认证及 ID-JAG 令牌交换，为 MCP OAuth 增加企业身份绑定能力。

**[#40722 企业 ID-JAG 交换机制](https://github.com/openai/codex/pull/40722)**
- 实现非交互式两步交换：从企业 IdP 获取 ID-JAG，再兑换为资源绑定的 MCP bearer token，包含完整的 URL/claims/资源校验。

**[#40728 MCP 服务器权限归属修正](https://github.com/openai/codex/pull/40728)**
- 修复 MCP 服务器继承线程级沙箱权限的问题，改为保留 attachment 属主的权限 profile，避免越权。

**[#40713 从 Git 远程元数据中清理凭据](https://github.com/openai/codex/pull/40713)**
- Git 远程 URL 可能内嵌用户名/密码/token，此 PR 在元数据与线程持久化前做脱敏，防止凭据泄漏到会话记录中。

### 📊 可观测性与遥测

**[#40735 技能遥测改用 model info 访问器](https://github.com/openai/codex/pull/40735)**
- 显式/隐式技能调用的遥测统一通过 `TurnContext::model_info()` 读取模型 slug，确保数据一致性。

**[#40724 插件归属技能遥测](https://github.com/openai/codex/pull/40724)**
- 为 `codex.skill.injected` 指标增加 `plugin_id`、`model_slug`、`reasoning_effort` 维度，便于追踪插件资源调用来源。

**[#40726 SQLite 日志持久化遥测](https://github.com/openai/codex/pull/40726)**
- 为 SQLite 日志落盘增加批量大小、写入延迟、失败次数与丢弃条目的监控，且导出诊断不会回流到日志 sink。

**[#40714 追踪图像生成请求 ID](https://github.com/openai/codex/pull/40714)**
- 读取 `x-codex-imagegen-request-id` 并透传到分析事件，但保持在进程内、不参与扩展序列化，兼顾可观测与隐私。

### 🧪 测试与工程基建

**[#40736 Bazel 下运行 exec-server 兼容性测试](https://github.com/openai/codex/pull/40736)**
- 新增 Bazel 测试规则，覆盖 app-server/exec-server 双向兼容性，针对当前构建、0.149.1 及最小支持版本。

**[#40718 为固定 Codex 版本添加 Bazel 仓库](https://github.com/openai/codex/pull/40718)**
- 新 Bazel module extension 从官方 release 源或 GitHub Releases 下载校验和固定的 Linux x86-64 包，便于可复现构建。

**[#40710 显式远程执行器连接刷新](https://github.com/openai/codex/pull/40710)**
- 为计划中的执行器替换提供 `Environment::refresh_connection`，新会话无需等待旧会话的瞬断恢复流程，提升远程任务切换效率。

---

## 功能需求趋势

从过去 24 小时活跃的 Issues 中，社区最关注以下方向：

1. **多平台支持缺口**：Linux 桌面版（953 👍）与 Windows 传统安装器（186 👍）是用户量最大的两个未满足需求，直接阻碍非 Mac/受限环境用户采用。
2. **会话状态一致性**：大量 Bug 集中在会话/线程状态错乱（线程删除、卡在 thinking、历史 subagents 复活、服务器删除后本地重现），说明桌面端会话同步与持久化模型亟需重构。
3. **Windows 稳定性**：启动崩溃、CLI 二进制定位失败、sandbox 恢复失败、MCP 配置解析失败——Windows 已成为质量洼地，多个 issue 连续 2-4 个版本未修复。
4. **MCP 配置与权限细化**：继企业级 MCP OAuth 功能合入后，用户对 MCP server 的权限模型、传输配置的兼容性要求在上升。
5. **大上下文与模型灵活性**：GPT-5.6 可选 1M 上下文（22 👍）与自定义模型 subagent 支持（14 评论）均表明高级用户希望突破默认模型/上下文限制。
6. **Hook 体系信任与可见性**：多个 Issue（#23411、#32491、#21615）围绕 PreToolUse 钩子失效、信任请求机制、exec 模式下的行为不一致展开，自动化用户对 hook 的可靠性敏感。

---

## 开发者关注点（痛点 / 高频需求总结）

| 痛点类别 | 具体表现 | 涉及 Issue |
|---------|---------|-----------|
| **Windows 启动/运行崩溃** | chrome.dll 访问冲突、WindowsApps 重定位失败、CLI 二进制缺失 | #39443, #40700, #28392 |
| **MCP 配置与进程管理** | 稳定版配置解析回退、node_repl 进程每线程泄漏不回收 | #40715, #35485 |
| **会话/线程状态错乱** | 线程卡 thinking、subagents 残留、服务端删除后本地复活、线程列表丢失 | #34026, #25179, #37041, #40219, #40674, #30385 |
| **CLI/Hook 行为不一致** | Code Mode exec 不触发 PreToolUse、exec 跳过受信任钩子、活跃 writer 冲突 | #23411, #32491, #39823 |
| **远程控制与工具供应** | Windows 缺少 "控制其他设备" 入口、Remote SSH 不含 browser/node_repl 工具 | #28919, #34263 |
| **更新与发布节奏** | 桌面端更新过于频繁，影响稳定使用 | #30122 |
| **定时任务可靠性** | 定时任务成功后自动禁用，需用户重新授权 | #38350 |

---

*本日报基于 2026-08-26 GitHub 数据自动生成，数据覆盖过去 24 小时更新/创建的 Releases、Issues 与 Pull Requests。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-26

## 今日速览

今日发布三个版本（v0.58.0-preview.0、v0.57.0、v0.56.0-nightly），其中 v0.57.0 修复了 Cloud Workstations OAuth 重定向和 IDE 连接目录问题。社区讨论焦点集中在 Subagent 可靠性（误报成功、挂起）、安全加固（SSRF、硬编码凭据、环境变量注入）以及 Auto Memory 行为改进上。此外，一个 Windows 贡献者友好的 PR 解决了长路径克隆问题，值得关注。

## 版本发布

### v0.58.0-preview.0
- **修复**: 忽略路径处理中保持一致性的 symlink 解析
- **重构**: core 模块相关改进
- 链接: https://github.com/google-gemini/gemini-cli/releases/tag/v0.58.0-preview.0

### v0.57.0
- **修复(core)**: 动态解析 Cloud Workstations 代理重定向 URI，用于 OAuth 流程
- **修复(core)**: 解决 IDE 连接中的目录不匹配被吞掉的问题
- 链接: https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0

### v0.56.0-nightly.20260825.g812f7a2bc
- **修复(a2a-server)**: 清除新消息轮次中的过期取消错误
- **修复(core)**: 在写入策略配置中声明顶层安全检查器
- 链接: https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260825.g812f7a2bc

## 社区热点 Issues

### 1. Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功（#22323）
**优先级 P1** | 13 条评论 | 2 👍
`codebase_investigator` 子代理在达到最大轮次限制后，仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了实际的中断。这是一个误导性极强的 bug，会让用户误以为任务成功完成。
https://github.com/google-gemini/gemini-cli/issues/22323

### 2. Generalist agent 永久挂起（#21409）
**优先级 P1** | 8 条评论 | 8 👍
简单操作（如创建文件夹）都会导致 generalist agent 无限挂起，用户等待长达一小时无果。手动禁止模型使用子代理可绕过此问题。这是社区呼声最高的稳定性问题之一。
https://github.com/google-gemini/gemini-cli/issues/21409

### 3. Shell 命令执行后卡在 "Waiting input"（#25166）
**优先级 P1** | 4 条评论 | 3 👍
简单 CLI 命令执行完毕后，Gemini CLI 仍显示命令活动并等待用户输入。该 bug 频繁复现，严重影响了日常自动化流程。
https://github.com/google-gemini/gemini-cli/issues/25166

### 4. 零依赖 OS 沙箱与执行后意图路由（#19873）
**优先级 P2** | 8 条评论 | 1 👍
利用 Gemini 3 模型原生的 bash 使用能力，通过零依赖 OS 沙箱和事后意图路由，在不牺牲安全性的前提下充分发挥模型的 POSIX 工具链偏好。
https://github.com/google-gemini/gemini-cli/issues/19873

### 5. AST-aware 文件读取/搜索/映射影响评估（#22745）
**优先级 P2** | 7 条评论 | 1 👍
EPIC 追踪：探索 AST 感知工具是否能更精准地读取方法边界、减少 token 噪声、提升代码库导航效率。
https://github.com/google-gemini/gemini-cli/issues/22745

### 6. Gemini 不会主动使用 skills 和 sub-agents（#21968）
**优先级 P2** | 6 条评论
即使用户定义了 gradle、git 等 skills，Gemini 在相关场景下也基本不会主动调用，需要显式指示。社区期待更智能的工具调用策略。
https://github.com/google-gemini/gemini-cli/issues/21968

### 7. Auto Memory 对低信号 session 无限重试（#26522）
**优先级 P2** | 5 条评论
Auto Memory 仅在提取代理成功读取 transcript 时才将会话标记为已处理。低信号会话会反复出现在索引中，造成无限重试和资源浪费。
https://github.com/google-gemini/gemini-cli/issues/26522

### 8. Auto Memory 需增加确定性脱敏并减少日志（#26525）
**优先级 P2** | 4 条评论
Auto Memory 在将内容送入模型上下文后才指令模型脱敏，敏感信息可能已经暴露。且现有技能日志可能泄露信息。社区关注隐私安全。
https://github.com/google-gemini/gemini-cli/issues/26525

### 9. browser_agent 在 Wayland 下失败（#21983）
**优先级 P1** | 4 条评论 | 1 👍
Browser 子代理在 Wayland 环境下以 GOAL 终止，但实际并没有完成任务。Wayland 用户群体对此有强烈诉求。
https://github.com/google-gemini/gemini-cli/issues/21983

### 10. 工具数量超过 128 时出现 400 错误（#24246）
**优先级 P2** | 3 条评论
当可用工具超过 400 个时 Gemini CLI 遇到 400 错误。用户期望能更智能地根据启用工具范围做裁剪，而不是粗暴地全量加载。
https://github.com/google-gemini/gemini-cli/issues/24246

## 重要 PR 进展

### 1. 修复 MCP OAuth 元数据发现与认证中的 SSRF 风险（#29081）
强制在 MCP OAuth 发现、动态客户端注册和令牌交换中执行 RFC 9728/RFC 8414 安全约束：远程端点强制 HTTPS，仅允许 loopback 使用 HTTP，并验证资源来源匹配。这是一项重要的安全加固。
https://github.com/google-gemini/gemini-cli/pull/29081

### 2. 扩展安装需用户同意并清洗环境变量（#28863）
扩展更新不再绕过用户同意检查，同时清洗传入 MCP server 进程的运行时环境变量，防止恶意注入。
https://github.com/google-gemini/gemini-cli/pull/28863

### 3. 修复 vscode-ide-companion 的 stop() 挂起（#29088）
`IdeServer.stop()` 在有 MCP 流打开时永远无法 resolve，导致扩展停用被阻塞。此 PR 修复了该问题。
https://github.com/google-gemini/gemini-cli/pull/29088

### 4. 防止并发扩展安装竞态（#29087）
使用 `proper-lockfile` 防止两个 Gemini CLI 进程同时安装/更新同一扩展导致文件交错写入。
https://github.com/google-gemini/gemini-cli/pull/29087

### 5. 移除 a2a-server 误导性安全方案与硬编码凭据（#29067）
移除 `coderAgentCard` 中误导性的 securitySchemes，并剔除 `customUserBuilder` 中不安全、硬编码的凭据。
https://github.com/google-gemini/gemini-cli/pull/29067

### 6. 检测混合行结束符而非单个 CRLF 命中（#28983）
`detectLineEnding()` 现在只有当文件中混合存在 LF 和 CRLF 时才标记为混合，而不是因为单个 `\r\n` 就判定整个文件为 CRLF。
https://github.com/google-gemini/gemini-cli/pull/28983

### 7. 转发 abortSignal 到 retryWithBackoff（#29089）
`BaseLlmClient` 现在会将中止信号传递到重试逻辑中，避免用户取消操作后重试仍在后台继续。
https://github.com/google-gemini/gemini-cli/pull/29089

### 8. 移除不安全的 diff.external 覆盖（#28930）
修复 PR #28792 引入的 `['diff.external', '']` 覆盖问题——Git 不把空值视为“未设置”，会导致外部 diff 工具配置被破坏。
https://github.com/google-gemini/gemini-cli/pull/28930

### 9. 批量更新 npm 依赖（#28984）
dependabot 发起 76 个 npm 包更新，包含 `simple-git`、`@modelcontextprotocol/sdk` 等关键依赖。
https://github.com/google-gemini/gemini-cli/pull/28984

### 10. 为 Windows 添加 longpaths 设置指引（#28926）
在 CONTRIBUTING.md 中增加 Windows `core.longpaths=true` 配置与恢复步骤，解决克隆仓库时因 260 字符路径限制导致的大量脏文件问题。
https://github.com/google-gemini/gemini-cli/pull/28926

## 功能需求趋势

1. **Subagent 行为透明化**: 多个 issue 要求子代理轨迹可通过 `/chat share` 分享（#22598）、bug 报告中包含子代理上下文（#21763）——社区需要更强的可观测性。
2. **安全加固持续加强**: A2A server 认证、MCP OAuth SSRF、扩展环境变量清洗、敏感信息脱敏（#26525）成为近期 PR 的主旋律。
3. **AST-aware 代码理解**: #22745 和 #22746 双 issue 探索 AST 感知工具用于代码库映射和方法级读取，目标减少 token 消耗、提升导航精度。
4. **Auto Memory 质量改进**: 低信号 session 处理策略（#26522）、无效 patch 隔离（#26523）、记忆系统整体质量追踪（#26516）表明社区正在系统性地打磨记忆功能。
5. **模型工具调用的主动性**: #21968 社区希望模型更主动地使用已定义的 skills 和 sub-agents，而非仅在被显式要求时才调用。
6. **行为评估保障**: #23313 要求 steering eval 测试必须稳定通过，避免被临时注释掉——社区对回归防护有明确需求。

## 开发者关注点

- **稳定性痛点**: 多处 P1 级 bug 直指核心稳定性——子代理误报成功（#22323）、generalist agent 挂起（#21409）、shell 命令卡死（#25166）、get-shit-done 输出钩子崩溃（#22186）——这些是阻碍开发者日常使用的最突出问题。
- **安全敏感度提升**: 开发者正在主动提交安全修复（SSRF、硬编码凭据、环境变量注入），说明社区对 Gemini CLI 作为本地代理的安全边界有较高期待。
- **Windows 体验改善**: 长路径克隆问题和环境相关测试失败（#28832、#28926）表明 Windows 平台的开发体验开始受到更多关注。
- **技能/子代理使用率低**: 开发者自定义了 skills 和 sub-agents，但模型很少主动调用（#21968），这削弱了扩展生态的吸引力。
- **配置失效困扰**: Browser Agent 忽略 `settings.json` 覆盖（#22267）、symlink 文件不被识别为 agent（#20079）、工具数量超限报错（#24246）等配置类问题，反映出灵活性与可靠性之间的平衡仍需优化。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>



</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-08-26** | 数据来源：[github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)


## 1. 今日速览

过去 24 小时社区整体平静，无新版本发布、无 PR 合并。但存在两个值得关注的遗留问题：#2617 报告了 0.38.0 版本在 macOS 上 Edit/Write 工具假成功的严重问题，影响用户实际产出且 100% 可复现；#2523 上下文压缩 bug 已持续超过一个月，昨天仍有评论更新，说明该问题仍在影响用户体验。


## 2. 版本发布

过去 24 小时内无新版本发布。


## 3. 社区热点 Issues

过去 24 小时内有 **2 条** 更新的 Issue，均值得关注：

### 🔴 #2617 — Edit/Write 工具报告成功但实际未写入磁盘（0.38.0, macOS）

- **作者**：[@tizerluo](https://github.com/tizerluo) | **创建**：08-25 | **更新**：08-25 | **评论**：2 | **👍**：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2617
- **重要度**：⭐️⭐️⭐️⭐️⭐️
- **说明**：这是当前最严重的问题。在 0.38.0 版本中，`Edit` 和 `Write` 工具会静默失败——返回 "The file has been updated / File created successfully" 的成功消息，但磁盘上没有任何变化。作者报告该问题自 08-25 17:00 UTC 起 100% 可复现。此问题直接影响开发者日常工作流，属于高优先级 P0 级 bug。社区关注点在于：工具链是否仍在正常工作、是否会影响 Test/Execute 等其他工具。

### 🟡 #2523 — 上下文压缩 bug：已完成并删除的任务被重新打开

- **作者**：[@Frogzter](https://github.com/Frogzter) | **创建**：07-20 | **更新**：08-25 | **评论**：1 | **👍**：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2523
- **重要度**：⭐️⭐️⭐️
- **说明**：该 Issue 报告 v0.6.3 版本中的上下文压缩缺陷——Kimi Code 在压缩上下文后会错误地重新打开一个已经完成并删除的 task。作者提供了详细的 PDF 日志文件（Kimi Code 07192026.pdf）。虽创建于一个月前，但在 08-25 仍有新的评论，表明该问题并未消失。不过，由于该问题基于 v0.6.3（一个非常老的版本），参考价值相对有限，用户后续如能在最新版本上复现，将更有助于定位。


## 4. 重要 PR 进展

过去 24 小时内无 PR 更新或合并。


## 5. 功能需求趋势

由于今日数据量有限（仅 2 条 Issue），趋势总结基于以下观察：

| 方向 | 相关 Issue | 社区期待 |
|------|-----------|---------|
| **工具调用可靠性** | [#2617](https://github.com/MoonshotAI/kimi-cli/issues/2617) | 任何对文件系统的写入操作应保证原子性——要么真正落盘，要么明确报错。假成功比失败更可怕。 |
| **上下文管理** | [#2523](https://github.com/MoonshotAI/kimi-cli/issues/2523) | 上下文压缩不应引入会话状态错乱（如重新打开已删除任务）。用户对长期会话的依赖度在提升。 |

> 注：因今日数据有限，本部分是待观察方向，非完整统计。建议结合本周前几日的全量数据做趋势分析。


## 6. 开发者关注点

从今日 Issue 中提炼出的开发者反馈：

1. **工具结果可信度是底线**（[#2617](https://github.com/MoonshotAI/kimi-cli/issues/2617)）
   - **痛点**：工具返回值与实际行为不一致，让用户无法信任自动化流程。
   - **建议**：Kimi Code 团队应紧急确认是否为 0.38.0 引入的回归，并考虑增加写入成功后的磁盘文件校验。

2. **上下文压缩稳定性有待验证**（[#2523](https://github.com/MoonshotAI/kimi-cli/issues/2523)）
   - **痛点**：该 bug 在旧版本上持续多月未关闭，容易让用户对上下文压缩功能产生不信任感。
   - **建议**：维护者可在最新版本上验证该问题是否已修复；若涉及长期会话场景，强烈建议补充针对 task 生命周期（创建→完成→删除）的回归测试。

---

*日报基于公开 GitHub 数据自动生成，仅作信息参考，不代表官方立场。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-26

## 今日速览

OpenCode 发布 **v1.18.23**，修复 Cloudflare AI Gateway 路由及 Anthropic 模型 ID 转换问题。社区热度最高的议题是 **Ox Alpha 免费模型在工具调用场景下集体报 "Endpoint is unavailable"**（两个独立 issue 相互印证），以及 **v2 自动更新器导致 266 GB 磁盘被占满**的严重事故，后者已有修复 PR 提交。此外，多个 TUI 体验打磨 PR（Mermaid 保留、滚动底边检测、模型误报）正在快速合入，社区贡献活跃度明显上升。

## 版本发布

**v1.18.23** — 核心修复：
- 修复 Cloudflare AI Gateway 对第三方提供方的路由，使非 Workers 模型可正常通过 Gateway REST API 工作（@superhighfives）
- 修复 Anthropic 模型在 Cloudflare AI Gateway 下的路由：将 `claude-haiku-4.5` 之类的

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-26

## 1. 今日速览

Qwen Code 社区今日发布 `v0.22.0-nightly.20260825` 夜间版，修复了 Web Shell 从概览面板打开会话时的工作目录传递问题。Issue 侧社区焦点集中在多代理协调缺陷（#8097）、上下文生命周期管理（#6762）以及 `/effort max` 导致 OpenAI 兼容提供商会话全部 400 报错的 P1 级 bug（#9459）；PR 侧 `/review` 管线持续迭代，增量审查、覆盖率账本、suspect 收敛等多项改进并行推进中。

## 2. 版本发布

### v0.22.0-nightly.20260825.22bb5e8b9f

- **修复 Web Shell 工作目录传递**：从概览面板打开会话时，现会正确传递 session workspace 的 cwd（#9730）
- **Web Shell 后续修复**：另有若干 web-shell 相关的修复随版本进入

---

## 3. 社区热点 Issues（10 个）

### #9459 [P1] `/effort max` 在 OpenAI 兼容提供商上导致整个会话 400 报错
作者在 UI 中选择 `/effort max`，但 `clampReasoningEffort()` 函数并未对 `'max'` 值进行钳制。一旦设置，**每个后续请求都会以 400 失败**，直到手动改回。该问题影响所有 OpenAI 兼容提供商，属于 P1 级核心 bug。社区跟帖 10 条，讨论了钳制逻辑的缺失及复现步骤。
🔗 https://github.com/QwenLM/qwen-code/issues/9459

### #8097 [P2] 后台代理协调缺陷：重复工作、过早完成与 send_message 不响应
并行运行多个后台 Explore 子代理并通过 `send_message` 进行中途通信时，出现三类协调失败：父代理重复子代理工作、子代理过早完成任务、send_message 通信不生效。评论 8 条，社区确认此问题与 multi-agent roadmap 直接相关，影响复杂任务拆分的可靠性。
🔗 https://github.com/QwenLM/qwen-code/issues/8097

### #6762 [P2] 功能请求：Skill 上下文生命周期管理
SKILL.md 内容作为工具结果加载到对话历史后**永远驻留**，无卸载、压缩或过期机制。随着技能数量增加，上下文膨胀问题日益严重。6 条评论中社区讨论了在其他 Agent 框架中的类似做法（如 session 级技能缓存）。此 issue 与 roadmap/context-performance 标签关联。
🔗 https://github.com/QwenLM/qwen-code/issues/6762

### #9198 [P2] 长跑一周后 OOM——终端界面错乱无法操作
用户反馈：运行一周多后出现 OOM，服务器内存 1TB 仍溢出。且 OOM 后 tmux 界面按键错乱、无法翻页/复制。该 issue 引发 6 条评论，社区对比指出 "Kimi Code 正常，Qwen 不行"，暗示终端渲染或流处理存在潜在泄漏。
🔗 https://github.com/QwenLM/qwen-code/issues/9198

### #9784 [P0] `/review` 应支持在 fork 子代理上下文中运行整个管线
`/review high` 会向主会话注入约 95k token 的 SKILL.md，并累积 14+ 子代理结果、验证器分片和反向审计轮次。这对主会话 token 消耗巨大，且影响正确性。P0 级增强请求，3 条评论均认可该方向。
🔗 https://github.com/QwenLM/qwen-code/issues/9784

### #5823 [P2] `/loop cron` 任务静默运行——模型不能列出或停止自己的定时任务
用户发现旧 cron 任务在几天后仍在每个新会话中自动触发，且模型自己无法查看或停止这些任务。5 条评论共鸣强烈，涉及后台自动化的可见性和可控性设计缺陷。
🔗 https://github.com/QwenLM/qwen-code/issues/5823

### #8227 [P2] Windows 上 `@`-文件读取丢失 O_NOFOLLOW 保护
Windows 平台下 `@` 引用文件读取的符号链接防护与 Linux 不一致——`O_NOFOLLOW` 在 Windows 不存在，`dev/ino` 身份校验也几乎是空操作。5 条评论涉及 Windows 安全关键路径。
🔗 https://github.com/QwenLM/qwen-code/issues/8227

### #9230 [P2] 后续建议侧查询破坏服务端前缀缓存
在启用 prefix caching 的服务器（如 llama.cpp）上，qwen-code 主会话的前缀缓存命中率约为 0%，每次主轮询都会被 LRU 调度重新预填充整个上下文。4 条评论确认了问题的普遍性和对成本/延迟的影响。
🔗 https://github.com/QwenLM/qwen-code/issues/9230

### #9733 [P2] 循环检测误报导致无人值守轮次不可恢复地终止
在长时间的脚本化多阶段自动化运行中，循环检测在合法且推进状态的工具调用序列（写脚本→运行→编辑→重跑）上反复误触发并终止轮次。更糟的是，终止后的轮次**必须需要人工消息才能恢复**。
🔗 https://github.com/QwenLM/qwen-code/issues/9733

### #10051 [P3] 原生 Debug Adapter Protocol（DAP）集成
社区请求 Qwen Code 增加一级 DAP 支持，使 agent 可以直接与调试器交互，而不仅仅依赖终端输出和源码分析。4 条评论讨论了与已有静态能力的互补性，属于新的能力方向。
🔗 https://github.com/QwenLM/qwen-code/issues/10051

---

## 4. 重要 PR 进展（10 个）

### #9659 `feat(review): content-anchored incremental rounds for the local review-fix loop`
将 `/review` 的增量审查改为内容锚定轮次，避免每次全量 diff 重读。该 PR 已在 #9190 获得 20 个 review、166 条内联评论后重新落地。这是 Part 1 of 2。
🔗 https://github.com/QwenLM/qwen-code/pull/9659

### #8583 `feat(web-shell): add an experimental session workflow cockpit`
在 Web Shell 中实现完整的 Session Workflow 实验路径：计划捕获、修订级审批、转录投影、Agent 执行与 WebShell 集成，复用现有依赖图并关联 Agent 激活。
🔗 https://github.com/QwenLM/qwen-code/pull/8583

### #9988 `feat(web-shell): add session token usage panel`
为 Web Shell 增加可选择开启的 Token 用量面板：展示总用量、按模型拆分、独立子代理调用次数、本地化工具统计，支持手动刷新、后台轮询和折叠展开。
🔗 https://github.com/QwenLM/qwen-code/pull/9988

### #9984 `feat(web-shell): add opt-in interactive browser terminal`
在 Web Shell 右侧面板增加手动管理的交互式终端。前端会根据后台 `web_terminal` 能力来决定是否显示，兼容独立发布的前后端版本。
🔗 https://github.com/QwenLM/qwen-code/pull/9984

### #9768 `feat(review): make coverage a sealed, classified ledger`
将 `/review` 的 chunk 覆盖率改为携带自身标识的账本，每个 gap 需说明原因，并分别报告已读取量和已发布量。不移动 `event`、不加门槛。
🔗 https://github.com/QwenLM/qwen-code/pull/9768

### #9974 `fix(core): three run-lifecycle defects that silently cost a run`
修复工作流运行生命周期的三个独立缺陷：取消工作流现在能真正结束；每个缺陷独立可回退。它们共享一个文件冲突面所以一起提交。
🔗 https://github.com/QwenLM/qwen-code/pull/9974

### #10050 `fix(ci): yield the event loop between script tests to avoid vitest RPC timeouts`
在脚本测试的 setup 中增加一个全局钩子，让事件循环在每次测试前真正 yield 给定时器。自动修复工作流套件（219 个测试，约 66 秒）此前会持续阻塞 vitest worker 事件循环导致 RPC 超时。
🔗 https://github.com/QwenLM/qwen-code/pull/10050

### #10049 `feat(skills): namespace extension skill registry keys by extension name`
扩展提供的技能已注册为 `<extension>:<name>` 限定键，Skill 工具查找、`<available_skills>` 上下文块、斜杠命令注册和 `skills.disabled` 匹配都通过该统一注册表解析。
🔗 https://github.com/QwenLM/qwen-code/pull/10049

### #10032 `fix(core): scan archived sessions in findSessionTitlesByPrefix`
`findSessionTitlesByPrefix`（在选择分支会话标题时使用）原本只扫描激活的 `chats/` 目录，归档会话的标题不会被计为已占用。此修复拆分了私有辅助函数并覆盖归档扫描。
🔗 https://github.com/QwenLM/qwen-code/pull/10032

### #9983 `fix(review): keep host-trusted state out of the container's writable surface`
将管线的工作区租约文件移出 review 沙箱的读写挂载目录，并教会宿主侧探测恢复机制拒绝解析到该目录的工作区管理条目。这是 #9723 审查中发现的两个安全问题的修复。
🔗 https://github.com/QwenLM/qwen-code/pull/9983

---

## 5. 功能需求趋势

- **/review 管线深化**：增量锚定轮次（#9659）、覆盖率账本（#9768）、fork 子代理运行（#9784）、deferred suggestions 可恢复（#9761）、Critical 持续增长预警（#10010）——Qwen Code 正在将 `/review` 打造成深度工程化工具
- **上下文与 token 管理**：Skill 生命周期管理（#6762）、压缩正确性（#9309）、前缀缓存优化（#9230）、LLM span 暴露 context usage 指标（#10015/#10016）——token 效率已成为社区最核心的关注方向之一
- **Web Shell 交互升级**：Session 工作流驾驶舱（#8583）、Token 用量面板（#9988）、交互式终端（#9984）—— Web Shell 正从简单的查看器转向完整的远程开发环境
- **多代理协调能力**：后台代理去重与通信（#8097）、工作流生命周期语义修复（#9974）—— 随 roadmap/multi-agent 持续推进，代理间的协作可靠性成为热门话题
- **可观测性/调试**：DAP 集成（#10051）、token 语义化遥测（#10015）—— 开发者希望 agent 具备更强的调试和可观测能力

---

## 6. 开发者关注点

- **会话不可恢复问题**：循环检测误报（#9733）、OOM 后终端崩溃（#9198）都会导致无人值守会话不可恢复。对于长期运行的自动化任务，用户期待更强的容错与自恢复机制
- **上下文膨胀缺乏手段**：SKILL.md 永驻上下文（#6762）、压缩行为不可控（#9309）、前缀缓存失效（#9230）共同造成了 token 消耗痛点。社区期待更细粒度的上下文管理 API 和策略配置
- **后台任务可见性差**：cron 任务无法列出/停止（#5823）、子代理重复工作（#8097）说明后台自动化的可视化与管控仍是短板
- **OpenAI 兼容提供商兼容性**：`/effort max` 导致全部请求 400（#9459）、Auto Mode 分类器不可用（#9757）、DeepSeek 视觉模型丢 image_url（#10027）——第三方 API 兼容测试范围不够广，社区期待更系统的兼容性验证
- **Windows 平台支持不足**：文件系统保护（#8227）、Windows 测试管道长期"红"（#9481）、MCP SSE 挂起（#10056）——Windows 用户的反馈密度高，平台质量问题亟待系统性解决
- **CI/CD 基础设施稳定性**：自托管 runner 磁盘耗尽（#10035）、vitest RPC 超时（#10050）暴露了持续集成链路的脆弱性，社区对 CI 稳定性的关注度在上升

---

> 日报由 AI 自动编译，数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)，统计周期：2026-08-25 至 2026-08-26。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*