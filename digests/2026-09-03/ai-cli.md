# AI CLI 工具社区动态日报 2026-09-03

> 生成时间: 2026-09-03 01:57 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-03）

## 1. 生态全景

AI CLI 工具正在从“单点功能竞争”转向“生态成熟度竞争”：企业级治理（Claude Code 的 managed MCP 与无人值守）、跨平台后台化（Codex 的 Windows daemon、Copilot 自定义 Agent）、本地/多模型接入（OpenCode 模型自动发现、Gemini 新模型）同步推进。与此同时，Windows 桌面端稳定性、权限配置静默失效、MCP 连接可靠性和用量可观测性成为跨工具共性痛点。头部工具保持高频迭代，Kimi 等相对稳健；社区对安全边界和自动化可信度的要求显著上升。

---

## 2. 各工具活跃度对比

> 下表数据基于各工具日报“精选/展示”的条目数，非仓库当日全量数据；Qwen Code 摘要不完整，仅列可见信息。

| 工具 | 精选 Issues | PR 动态 | Release |
|---|---|---|---|
| Claude Code | 10 个（#36151 获 675 👍） | 4 个 PR，含 1 个安全相关 OPEN | v2.1.259 |
| OpenAI Codex | 10 个 | 10 个 PR（Windows daemon、MCP、上下文管理） | rust-v0.153.0 |
| Gemini CLI | 10 个 | 10 个 PR（2 个 CRITICAL CVE 修复、配置权限、沙箱） | 无 |
| GitHub Copilot CLI | 10 个 | 0 个 PR（24h 无新增/更新） | v1.0.83-3 / v1.0.83-2 |
| Kimi Code CLI | 3 个更新（已关闭） | 0 个 PR | 无 |
| OpenCode | 10 个 | 10 个 PR（RPC、snapshot、插件 API） | v1.18.27 |
| Qwen Code | 2 个可见（日报被截断） | 未在摘要中呈现 | live-host-v0.2.0 |

---

##

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills 摘要生成失败。

---

# Claude Code 社区动态日报 — 2026-09-03

## 1. 今日速览

v2.1.259 发布，新增组织级 MCP 服务器管理与无人值守模式；社区对**多账号切换**的呼声持续攀升（675 👍 高居榜首）；Windows 桌面端稳定性问题集中爆发，GPU 崩溃、更新失败、窗口置顶等多个 Issue 引发大量讨论。

## 2. 版本发布

### v2.1.259
📦 [Release v2.1.259](https://github.com/anthropics/claude-code/releases)

本次更新带来两项面向企业与自动化场景的能力：

- **新增 `managedMcpServers` 管理设置**：组织可为所有用户统一提供 HTTP/SSE 类型的 MCP 服务器（条目格式与 `.mcp.json` 一致），包含命令运行条目的配置会被自动跳过。
- **新增 `--permission-prompts none` 选项**：面向无人值守/无头（headless）主机环境，彻底禁用权限提示交互。

## 3. 社区热点 Issues

### 🔥 高热度功能需求

**#36151 多账号切换**（675 👍 / 169 评论）
[链接](https://github.com/anthropics/claude-code/issues/36151)
Claude Mobile 应用不支持在同一设备上切换不同账号（尤其是不共享邮箱的场景）。该需求自 3 月提出以来热度持续攀升，目前是社区呼声最高的功能请求，说明多身份/多团队用户群庞大。

**#49790 SSH 远程会话应支持断线重连/恢复**（41 👍 / 17 评论）
[链接](https://github.com/anthropics/claude-code/issues/49790)
当 SSH 远程客户端断开（网络中断、合盖、主动退出）时，远程服务器上的 Claude Code 进程随之终止，无法重连恢复现场。用户实测了长时后台任务因此中断，是远程开发场景的重要缺口。

### 🐛 严重 Bug 与稳定性问题

**#80444 Windows 桌面版 GPU 进程致命崩溃**（16 👍 / 104 评论）
[链接](https://github.com/anthropics/claude-code/issues/80444)
版本 1.24012.1.0 在应用内浏览器标签页触发 GPU 进程崩溃（0x060C201E），崩溃后 MSIX 包进入不可启动状态（appxState=2），必须执行 Repair 才能恢复。已在两块不同的 NVIDIA 驱动版本上复现，影响面较广。

**#85891 / #66516 / #87895 窗口置顶问题（Windows/macOS）**（Windows 版 145 👍 / 64 评论；重复报告 61 👍）
[链接 #85891](https://github.com/anthropics/claude-code/issues/85891) ｜ [链接 #66516（macOS，已关闭）](https://github.com/anthropics/claude-code/issues/66516) ｜ [链接 #87895（Windows 重复报告）](https://github.com/anthropics/claude-code/issues/87895)
Claude Desktop 主窗口在所有平台均表现为始终置顶（topmost），且没有任何设置可关闭。三个平台均有独立 Issue，社区普遍认为这是严重影响多任务工作流的缺陷。

**#53247 Windows 启动失败：孤儿 Silo / Job Object 导致只能重启恢复**（22 👍 / 50 评论）
[链接](https://github.com/anthropics/claude-code/issues/53247)
应用崩溃后遗留的孤儿进程持有 Desktop AppX 容器，导致后续所有启动尝试均失败（HRESULT 0x80070020），重启或注销才能恢复。与 #89680（stealth 更新后同样报错）疑似同源。

**#89680 Windows 静默更新后新版本无法启动**（8 评论）
[链接](https://github.com/anthropics/claude-code/issues/89680)
静默自更新会留下持有旧版本 AppX 容器的孤儿进程，新版本每次启动都报 0x80070020，必须重启机器。

### ⚠️ 服务端变更与服务问题

**#76248 Cloud/Cowork 会话 git 代理阻断所有推送**（12 👍 / 32 评论）
[链接](https://github.com/anthropics/claude-code/issues/76248)
约 7 月 10 日起，远程 cloud 会话无法向"授权仓库集合"之外的 GitHub 仓库推送，即使用户自行提供细粒度 PAT 也被拦截。服务端中途变更行为（疑似 CCR_TEST_GITPROXY 灰度），影响使用 Cowork 的自动化工作流。

**#81703 7 月账单事件：$604.71 自动充值争议**（12 评论）
[链接](https://github.com/anthropics/claude-code/issues/81703)
用户在 9 月 3 日发布了更正声明：经与官方账单核对，8 月的两笔费用（$49.88/$49.20）确认是真实的 API 额度授予而非误扣款，但此前争议的 $99.08 等问题仍在推进中。该事件反映了用户对自动扣费透明度的担忧。

### 🔐 权限与安全

**#89911 继承权限模式被静默降级**（5 评论）
[链接](https://github.com/anthropics/claude-code/issues/89911)
从 agents 视图派生（spawn）的会话会被服务端强制将权限继承模式降级（`tengu_agentview_inherit_mode_demote` 默认开启），且降级后的 `plan`→`auto` 反而更宽松，存在安全隐患。初始诊断已被评论推翻，最终确认为服务端刻意行为。

**#91296 macOS 上 `bypassPermissions` 被静默忽略**（3 👍 / 4 评论）
[链接](https://github.com/anthropics/claude-code/issues/91296)
项目级 `.claude/settings.local.json` 中配置 `permissions.defaultMode: "bypassPermissions"` 不生效，且未出现在 Shift+Tab 权限模式循环中。权限配置的可靠性和可见性受到质疑。

## 4. 重要 PR 进展

过去 24 小时 PR 较少（共 4 条），但有一条安全相关的修复值得关注：

**#87079 修复安全规则 `**` glob 模式不匹配零深度路径**（OPEN）
[链接](https://github.com/anthropics/claude-code/pull/87079)
`glob_match` 委托给 `fnmatch` 后，裸 `*` 已能跨 `/`，导致 `**/*.ts` 需要显式 `/` 才能匹配，`security-patterns.json` 中的规则静默漏掉顶级文件。文档承诺"`**` 匹配任意深度"但实际行为不符，且影响安全规则——属于**静默失效**的安全缺陷，建议尽快合入。

**#61691 新增 GitHub 连接器诊断脚本**（OPEN）
[链接](https://github.com/anthropics/claude-code/pull/61691)
针对 Cowork 中 GitHub MCP 连接器显示"Connected"但暴露零工具的已知问题，新增 PowerShell 诊断/修复脚本。关联 #61682，且引用了 4 个历史相关 Issue（#28695、#41658、#5758…），说明该问题长期存在。

**#41938 为 DevContainer 添加 Linux/macOS 启动脚本**（CLOSED）
[链接](https://github.com/anthropics/claude-code/pull/41938)
补齐了仓库中仅有 Windows PowerShell 脚本的缺口，为 Linux/macOS 用户提供等价的 DevContainer 启动脚本。虽已关闭，但方案可参考。

**#86537 修复 CHANGELOG.md 重复单词**（OPEN）
[链接](https://github.com/anthropics/claude-code/pull/86537)
文档修正：修复 `CLAUDE_BASH_NO_LOGIN` 条目中"to to"的拼写错误，无功能影响。

## 5. 功能需求趋势

从当前 Issue 生态可提炼出以下社区最关注的功能方向：

| 方向 | 代表 Issue | 热度信号 |
|------|-----------|---------|
| **多账号/多身份切换** | #36151（Mobile）、隐含桌面端同类需求 | 675 👍，需求缺口最大 |
| **窗口行为控制** | #85891 / #66516 / #87895（置顶）、#63020（背景色自定义） | 跨平台共鸣，3 个 Issue 累计 200+ 👍 |
| **远程会话持久化** | #49790（SSH 断线重连） | 41 👍，远程开发刚需 |
| **可观测性增强** | #73770（状态栏显示每周速率限制） | 7 👍，追求更透明的用量展示 |
| **企业管理能力** | 本次 v2.1.259 的 `managedMcpServers`、`--permission-prompts none` | 官方方向与社区需求（组织级配置）吻合 |
| **会话关联与跨链接** | #76440（Claude Code 会话 ↔ claude.ai 会话交叉引用） | 工作流衔接需求 |
| **权限模式可靠性** | #89911（静默降级）、#91296（bypassPermissions 失效）、#91650（Read 规则误触发） | 权限系统的高频 Bug 集中区 |

## 6. 开发者关注点

**🔴 Windows 桌面端稳定性是当前最大痛点**
GPU 进程崩溃（#80444）、更新后无法启动（#89680）、更新时崩溃（#91663）、启动时孤儿进程阻塞（#53247）、更新因 CoworkVMService 运行失败（#49655）——一周内至少 5 个独立 Issue 指向 Windows 桌面的安装/更新/崩溃恢复链路存在系统性问题，MSIX 包设计可能是根因之一。

**🔴 权限配置的"静默失效"问题严重**
`bypassPermissions` 被忽略、继承模式被服务端静默降级、`**` glob 安全规则不匹配——开发者对权限系统"配置了但没生效"以及"行为变更无感知"的反馈较多，且涉及安全边界，优先级应上调。

**🟡 后台行为的"不可控性"引发不安**
#84698 揭示了桌面端在 diff/commit 刷新时会发起用户未请求的 `git fetch`，且无设置可关闭；#76248 则反映服务端可灰度更改 git 代理策略。开发者对"工具在不知情时执行网络操作"的容忍度较低。

**🟡 安全过滤器误报多次打断合法工作**
多个已关闭的 `[Bug][cyber]` Issue（#75116、#75713-75715、#75306-75311 等）显示，

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-03）

## 1. 今日速览

Codex 发布 `rust-v0.153.0`，为 Vim 模式补充撤销/重做能力，并扩展插件 CLI 管理功能。社区方面，Windows 桌面版的稳定性问题与配额异常消耗仍是讨论焦点，多个相关 Issue 获得大量评论；同时一批针对 Windows daemon、TUI 输入与上下文管理的 PR 已合入，跨平台能力持续增强。

## 2. 版本发布

### rust-v0.153.0
- Vim 模式新增 `u` 撤销、`Ctrl+R` 重做，可完整恢复草稿（包括粘贴内容和附件）。
- 插件 CLI 支持列出、安装及管理插件。
- 另有 `0.153.0-alpha.6`、`0.153.0-alpha.5.1`、`0.153.0-alpha.5` 等预发布版本更新。

## 3. 社区热点 Issues（10 个）

1. **[#23200] 支持无头远程 Linux 主机，无需桌面应用保持在线**  
   https://github.com/openai/codex/issues/23200  
   评论 22、👍 56。这是远程控制场景的核心需求：开发者希望移动端可直接驱动常驻 Linux 服务器，而非依赖个人电脑在线。社区呼声极高。

2. **[#41220] Codex 用量/配额异常消耗与记账不一致（元追踪）**  
   https://github.com/openai/codex/issues/41220  
   评论 16、👍 8。多个独立报告汇总，用户普遍反映配额消耗速度远超本地 token 证据，涉及订阅额度和付费 credits，直接影响用户信任。

3. **[#25826] Windows 最大化窗口溢出到相邻显示器**  
   https://github.com/openai/codex/issues/25826  
   评论 12、👍 15。多显示器环境下窗口管理错误，影响日常使用，已有较多用户遇到。

4. **[#21804] 增加 TUI 选项在提交后保留 Vim 模式**  
   https://github.com/openai/codex/issues/21804  
   评论 5、👍 17。Vim 用户希望提交 prompt 后保持 Insert 模式，减少重复按键，属于高频体验优化。

5. **[#39954] Windows + Android 远程控制进入重连循环**  
   https://github.com/openai/codex/issues/39954  
   评论 20。远程控制在 Windows/Android 组合上出现 `409 Conflict` 及重连死循环，功能不可用，影响移动办公场景。

6. **[#41513] Windows 桌面宠物（内置/自定义）变为点击穿透且无法拖动**  
   https://github.com/openai/codex/issues/41513  
   评论 19、👍 6。新推出的 Pets 功能在 Windows 上出现交互失效，涉及内置和自定义宠物，讨论度高。

7. **[#40782] macOS 更新后全局 UI 文本变细变模糊**  
   https://github.com/openai/codex/issues/40782  
   评论 13、👍 4。版本 `26.820.60940` 后中文字体渲染明显劣化，影响日常阅读，用户已附环境细节。

8. **[#40878] Windows 26.820.7780.0 出现空白客户区**  
   https://github.com/openai/codex/issues/40878  
   评论 11。桌面应用窗口内容空白，通过 `--disable-direct-composition` 可恢复，但解决方式不直观。

9. **[#13270] 工具调用参数超出最大长度（string too long）**  
   https://github.com/openai/codex/issues/13270  
   评论 16。`input[15].arguments` 超过 1048576 字符上限，导致请求失败。长期存在的 API 层面限制，影响大型上下文任务。

10. **[#30385] Windows 桌面近期本地项目线程缺失**  
    https://github.com/openai/codex/issues/30385  
    评论 12。侧边栏/搜索不展示部分线程，但磁盘 `session_index.jsonl` 中存在且可通过 ID 加载，属 UI 与索引同步 bug，存在数据不可见风险。

## 4. 重要 PR 进展（10 个）

1. **[#42405] 支持 Windows 上的 app-server 后台守护进程**  
   https://github.com/openai/codex/pull/42405  
   将 daemon 生命周期管理与 `codex agents` 启动扩展到 Windows，使跨会话共享后台服务器成为可能。

2. **[#42392] 支持 Windows 上的托管守护进程更新**  
   https://github.com/openai/codex/pull/42392  
   在 Windows 上通过非交互 PowerShell 安装器执行更新，并处理 app-server 重启与所有权交接，完善更新链路。

3. **[#42385] 增加实验性上下文管理激活**  
   https://github.com/openai/codex/pull/42385  
   为 ChatGPT Plus/Pro/Pro Lite 引入 token 预算上下文、历史备注等实验功能配置，是上下文管理方向的重要基础。

4. **[#42406] MCP 启动时尊重显式插件提及**  
   https://github.com/openai/codex/pull/42406  
   修复用户明确提及某插件或 MCP server 时，因启动宽限期过期而被跳过的问题，确保请求的工具可用。

5. **[#42410] 允许审查并继续因 misalignment 暂停的对话**  
   https://github.com/openai/codex/pull/42410  
   当策略违规暂停聊天并附带 findings 时，用户可显式审查并决定是否继续，增强安全机制的可控性。

6. **[#42408] 加固嵌入式 composer 输入处理**  
   https://github.com/openai/codex/pull/42408  
   避免 `!`、`/`、`?` 前缀触发命令模式；修复 Vim 模式切换、取消草稿或粘贴连击时的字符丢失问题。

7. **[#42399] 保留解决 misalignment 错误后的恢复输入**  
   https://github.com/openai/codex/pull/42399  
   修复后续 turn 继续后，旧的 misalignment 违规被误判为仍活跃而清空草稿和排队输入的问题。

8. **[#42404] 独立于管道块读取语音助手帧**  
   https://github.com/openai/codex/pull/42404  
   引入有状态 `MessageReader`，解决管道 chunk 拆分/合并语音协议帧导致解析失败的问题，提升语音功能稳定性。

9. **[#42395] 向命令与 turn 元数据暴露 Codex 版本**  
   https://github.com/openai/codex/pull/42395  
   在用户 shell 和统一执行环境中设置 `CODEX_VERSION`，并为 MCP turn 元数据新增 `codex_version` 字段，便于版本审计。

10. **[#42391] 在 executor 路径上下文中授权 `apply_patch`**  
    https://github.com/openai/codex/pull/42391  
    改为基于 `PathUri` 评估补丁

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-03

## 1. 今日速览

过去 24 小时无新版本发布，社区焦点集中在**安全加固**与 **Agent 行为正确性**上：多项安全 PR（CVE 升级、变量注入绕过修复、沙箱权限收紧）密集推进，同时 `MAX_TURNS` 子代理误报成功、Shell 挂起等稳定性问题持续引发讨论。值得关注的是新 PR 已开始支持 **gemini-3.8-flash** 默认模型，而多起高内存占用报告仍在跟进中。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues（10 个精选）

### 🔥 高热度 / P1 级

1. **[#22323] Subagent 在 MAX_TURNS 后误报为 GOAL 成功，中断被隐藏**（P1，13 评论）
   - 现象：`codebase_investigator` 子代理在未做任何分析即触达最大轮数时，仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖真实中断。
   - 关注点：直接影响用户对 Agent 执行结果的信任，属于 Agent 核心正确性问题。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#27325] Antigravity CLI 是否支持自定义 slash commands？**（9 评论，4 👍）
   - 社区在 Antigravity CLI 迁移窗口期的核心疑问：`commands` 文件夹能否直接复用，还是必须转换为 `skills`？
   - 链接：https://github.com/google-gemini/gemini-cli/issues/27325

3. **[#25166] Shell 命令执行完成后卡在 "Waiting input"**（P1，4 评论，3 👍）
   - 极为简单的 CLI 命令执行完毕后，Gemini 仍显示命令活跃并等待用户输入，复现率高。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/25166

4. **[#29045] read-many-files 将子串重叠误判为"显式请求"的二进制资产**（P1，4 评论）
   - 使用子串包含而非真正的模式匹配判断二进制文件是否被显式请求，导致未要求的图片被内联进上下文。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/29045

5. **[#21983] Browser subagent 在 Wayland 环境下失败**（P1，4 评论）
   - Browser Agent 在 Wayland 会话中运行失败，影响 Linux 桌面用户。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21983

### 📌 社区热议

6. **[#21968] Gemini 不会主动使用 skills 和 sub-agents**（6 评论）
   - 用户反馈：即使配置了 gradle、git 等自定义 skill，Gemini 也几乎不会主动调用，除非显式指示。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/21968

7. **[#27938] 检测到高内存占用（GC 崩溃）**（5 评论）
   - 堆内存达到 24 GB 量级触发 Mark-Compact 崩溃，属集群式上报（另有 #27976 报告 7.03 GB）。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/27938

8. **[#29042] 非数字后台 PID 行变成 NaN 进入 shell 工具输出**（5 评论）
   - 解析后台命令 PID 文件时，`Number(line)` 前缺少 `continue`，导致 `NaN` 被推入 `backgroundPIDs` 数组并渲染到工具输出。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/29042

9. **[#26525] Auto Memory 需要确定性脱敏并减少日志记录**（5 评论）
   - 安全关切：本地 transcript 在发送给后台提取模型前未做确定性脱敏，且服务可能记录已有 skill 的敏感内容。
   - 链接：https://github.com/google-gemini/gemini-cli/issues/26525

10. **[#22745] 评估 AST 感知的文件读取/搜索/代码库映射的价值**（7 评论）
    - Epic 级议题：AST 感知工具可精确读取方法边界，减少 token 噪声与轮次消耗，探索 `tilth`/`glyph` 作为起点。
    - 链接：https://github.com/google-gemini/gemini-cli/issues/22745

## 4. 重要 PR 进展（10 个精选）

### 🛡️ 安全修复（本轮最集中方向）

1. **[#28902] 修复 $VAR 与 ${VAR} 变量展开绕过漏洞**（P1，安全）
   - 修复 `detectBashSubstitution()` 与 `detectPowerShellSubstitution()` 的不完整检查，补上 GHSA-wpqr-6v78-jr5g 的绕过路径，并加固 issue 去重工作流。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/28902

2. **[#29094] 升级 simple-git 至 3.32.3（CVE-2026-28292，CRITICAL）**
   - Trivy 扫描出的关键漏洞修复，影响 `package-lock.json` 依赖链。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29094

3. **[#29095] 升级 shell-quote 至 1.8.4（CVE-2026-9277，CRITICAL）**
   - 另一个关键 CVE 修复，需社区尽快合入。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29095

4. **[#29115] 对系统级配置文件强制执行严格的权限与所有权检查**
   - Windows（ACL 验证/PowerShell）与 POSIX 双平台执行文件属主和 ACL 校验后再加载配置，防止恶意配置注入。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29115

### 🆕 新功能与模型

5. **[#29172] 新增 gemini-3.8-flash 作为默认 flash 模型**
   - 注册 `gemini-3.5-flash-lite`、`3.6`、`3.7`、`3.8` 系列，并将 `gemini-3.8-flash` 提升为默认 flash 模型。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29172

### 🐛 核心稳定性修复

6. **[#28914] 将 on-retry nudge 注入会话内容以保留前缀缓存**
   - 将重试提示从 `systemInstruction` 移到 `contents` 末尾，修复 #28909，避免破坏静态 prompt 前缀缓存。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/28914

7. **[#29093] 为 getIgnoredPaths 增加 ignoreCache 缓存与子树剪枝**
   - 修复 #29077：按文件路径/目录标志/相关选项做内存缓存，目录被忽略时跳过其全部内容，显著减少重复模式匹配开销。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29093

8. **[#29098] 保持 useInputHistoryStore 状态更新器纯净**
   - 修复 `addInput()` 在 `setCurrentSessionMessages()` updater 内调用副作用函数的问题（React 在 StrictMode 下会双重调用导致状态异常）。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/29098

9. **[#28917] WhisperModelManager 原子化下载与失败清理**
   - 修复 #28644：临时文件写入、背压处理、流错误处理、长度校验、失败清理、原子重命名，避免模型文件损坏。
   - 链接：https://github.com/google-gemini/gemini-cli/pull/28917

10. **[#28916] WhisperTranscriptionProvider 增加 stdout 分块缓冲**
    - 修复 #28648：按行缓冲 stdout 数据，防止时间戳转录行被任意 `data` 事件切分后丢失。
    - 链接：https://github.com/google-gemini/gemini-cli/pull/28916

### ⚠️ 另需关注

- **[#29138] 删除 README 大量内容的 PR 已被关闭**：该 PR 移除了 badges、安装说明、功能与使用示例等关键内容，社区保持警惕并已驳回。链接：https://github.com/google-gemini/gemini-cli/pull/29138
- **[#29171] macOS Seatbelt 沙箱临时目录隔离**：修复沙箱进程共享宿主 `os.tmpdir()` 的安全隐患。链接：https://github.com/google-gemini/gemini-cli/pull/29171

## 5. 功能需求趋势

从近期 Issues 与 PR 中可提炼出以下社区最关注的方向：

| 方向 | 热度信号 | 代表条目 |
|------|---------|---------|
| **安全加固** | 🔥 极高 | 变量注入绕过修复、2 个 CRITICAL CVE、配置权限校验、NTFS 短文件名绕过、Seatbelt 沙箱隔离 |
| **新模型支持** | 高 | gemini-3.8-flash 默认化 PR 已提交，社区对新模型跟进速度快 |
| **Agent 自主性** | 高 | 多个 issue 指出模型不主动使用 skills/sub-agents、子代理轨迹不可见（#22598） |
| **记忆系统（Auto Memory）质量** | 中高 | 脱敏策略、低信号会话无限重试、无效 patch 静默跳过等系列问题（#26516 追踪） |
| **AST 感知代码工具** | 中 | 探索 AST 感知

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-03

## 今日速览

今日发布了 v1.0.83-3 和 v1.0.83-2 两个维护版本，后者新增了自定义 Agent 多模型回退列表与 `claude-fable-5.1` 支持。社区方面，**内存溢出（OOM）崩溃** 成为最集中的痛点（至少 4 个新 Issue），同时 BYOK 多模型切换需求以 29 个 👍 持续发酵，MCP 连接与自定义 Agent 状态恢复问题也受到广泛关注。

---

## 版本发布

### v1.0.83-3
> 链接：https://github.com/github/copilot-cli/releases/tag/v1.0.83-3

- 修复和变更（Fixes and changes）

### v1.0.83-2
> 链接：https://github.com/github/copilot-cli/releases/tag/v1.0.83-2

**新增**
- 自定义 Agent 可在 `model` 字段中列出多个模型，按顺序尝试直到可用；`model-policy: required` 可保证模型固定在该列表内
- 新增对 `claude-fable-5.1` 的支持

**改进**
- Linux 沙箱现在会将网络出口流量限制为已配置的代理（proxy）

---

## 社区热点 Issues

### 1. 允许 `/model` 在同一会话中切换多模型（含 BYOK/本地模型）
- **编号**: [#3709](https://github.com/github/copilot-cli/issues/3709) | 👍 29 | 评论 7
- **为什么重要**: BYOK 模式下会话被 `COPILOT_MODEL` 固定为单一模型，`/model` 选择器只列 GitHub 托管模型，无法切换到本地 BYOK 服务。这是社区呼声最高的功能需求，直接关系到工作流的灵活性。

### 2. 恢复长会话时 JavaScript 堆内存溢出崩溃
- **编号**: [#4664](https://github.com/github/copilot-cli/issues/4664) | 评论 5
- **为什么重要**: 恢复大型历史会话时进程直接触发 V8 堆 OOM 崩溃，且发生在加载阶段、无法继续。同类报告（#4686、#4699）表明该问题在 1.0.82 中高频出现。

### 3. 自定义 Agent 的 `mcp-servers` 在子代理/`--prompt` 模式下不生效
- **编号**: [#2630](https://github.com/github/copilot-cli/issues/2630) | CLOSED | 评论 9
- **为什么重要**: 已在 v1.0.83 系列修复。此前 `~/.copilot/agents/` 下定义了 `mcp-servers` 的 agent 在作为子代理或 `--prompt` 主代理运行时，不会获得 MCP 工具连接，仅能拿到基础工具，严重影响自定义 Agent 的可用性。

### 4. MCP 初始化发送旧版 `initialize` 导致 -32022 错误
- **编号**: [#4525](https://github.com/github/copilot-cli/issues/4525) | 👍 2 | 评论 5
- **为什么重要**: 1.0.81-1 与 Python MCP SDK 2.0.0 双时代运行器配合时，CLI 在成功的现代 `server/discover` 探测后仍发送旧版 `initialize`，导致 MCP 握手失败。反映 MCP 协议版本兼容性仍然脆弱。

### 5. `disable-model-invocation: true` 使技能完全不可达
- **编号**: [#4438](https://github.com/github/copilot-cli/issues/4438) | 👍 6 | 评论 4
- **为什么重要**: 项目技能标记为仅手动调用后，`copilot skill list` 能看到，但模型调用时返回 "Skill not found"。显式用户请求也无法触发，与设计文档相悖。

### 6. 子代理调用的 OTel 跨度缺少计费属性
- **编号**: [#4224](https://github.com/github/copilot-cli/issues/4224) | 👍 1 | 评论 4
- **为什么重要**: 外部成本核算依赖 OTel 数据，但 `task` 工具/自定义 agent 产生的跨度未携带 `github.copilot.nano_aiu` 和 `github.copilot.cost`，导致实际 AI 信用消耗被系统性低估。

### 7. `/compact` 压缩连续失败：模型返回空响应
- **编号**: [#2861](https://github.com/github/copilot-cli/issues/2861) | 👍 4 | 评论 3
- **为什么重要**: 在短会话、Opus 4.6 上手动压缩三次全部返回 "received empty response"。现已持续数月未修复，且 #4698 仍在报告同类问题，显示 `/compact` 可靠性是核心痛点。

### 8. 恢复会话时自定义 Agent 不还原（#917 回归）
- **编号**: [#4674](https://github.com/github/copilot-cli/issues/4674) | 评论 3
- **为什么重要**: 恢复会话后，Agent 的 `mcp-servers` 和 `tools` 白名单丢失，会话静默降级为无 Agent 状态。直接回归了已关闭的 #917，影响自定义 Agent 工作流的连续性。

### 9. MCP OAuth token 跨会话缓存不稳定，频繁重新认证
- **编号**: [#4695](https://github.com/github/copilot-cli/issues/4695) | 评论 3
- **为什么重要**: HTTP 类型 MCP 服务器（PKCE 公共客户端）的 token 缓存键哈希不稳定，导致有效 token 未被复用而强制重新走 OAuth。影响企业环境中的连接体验。

### 10. 新增 `/effort` 命令快速切换推理强度
- **编号**: [#3074](https://github.com/github/copilot-cli/issues/3074) | 👍 9 | 评论 3
- **为什么重要**: 通过 `/model` 切换推理强度步骤繁琐，社区希望提供独立命令按任务复杂度快速调整。虽被关闭，但反映出工作流效率需求。

---

## 重要 PR 进展

过去 24 小时内无新增或更新的 Pull Request。v1.0.83-3 / v1.0.83-2 为当前主线版本，近期的 PR 将集中在 MCP 连接修复（#2630）与 Agent 会话恢复（#4674）方向。

---

## 功能需求趋势

从近期 Issues 可提炼出以下社区最关注的功能方向：

1. **多模型/BYOK 灵活性**（#3709、#4703、#4692）
   - 同一会话内切换多个模型（包括本地 BYOK 端点）
   - 自定义 Agent 级别的 Provider 选择，而非进程级全局配置
   - 企业默认模型在 CLI 中的兼容性欠佳

2. **会话生命周期稳定性**（#4664、#4686、#4699、#4698）
   - 长会话/`--resume` 的内存管理是最大痛点，多起 OOM 崩溃
   - `/compact` 压缩可靠性不足，空响应问题多次出现

3. **MCP 生态完善**（#4525、#4598、#4695、#4697）
   - 与 MCP SDK 2.0 的协议兼容性
   - 多服务器并发连接可靠性、动态重连、OAuth token 复用
   - `/clear` 后需正确终止旧服务器子进程

4. **自定义 Agent 的配置持久化**（#4674、#2630）
   - 恢复会话时还原 Agent 的 MCP 与工具白名单
   - 子代理/`--prompt` 模式下 Agent 功能完整生效

5. **跨平台一致性**（#2271、#4683、#4701、#4702）
   - Windows 下 `\` vs `/` 路径处理、PowerShell ConstrainedLanguage 兼容
   - WSL/终端环境中的剪贴板与 shell 类型配置

---

## 开发者关注点

1. **OOM 与新 Issue 频发**：至少 4 个独立 Issue（#4664、#4686、#4694、#4699）报告 1.0.82 在大约 37 分钟至数小时内达到 4 GiB 堆上限，涉及长会话恢复、WSL 环境、异步句柄泄漏。部分用户在 CWD 目录下产出崩溃转储，影响工作目录整洁性，急需官方定位与修复。

2. **压缩（/compact）不可靠**：多版本、多模型下持续收到 "empty response"，重试 3 次仍失败，且压缩失败后会话状态不明朗，阻断长会话的工作流。

3. **MCP 连接脆弱**：启动时只连接部分服务器、连接中丢失句柄、OAuth 缓存失效、不支持 MCP SDK 2.0 双时代特性——MCP 生态体验明显跟不上功能宣传，企业用户受影响较大。

4. **自定义 Agent 状态丢失**：会话恢复后 Agent 配置不还原、技能被禁用后不可达、子代理不继承 MCP 工具——自定义 Agent 的核心能力在真实工作流中表现不稳定。

5. **企业/代理环境适配不足**：默认企业模型不可用导致回退、TLS 检查代理下 OAuth 登录失败（#4671）、PowerShell ConstrainedLanguage 模式产生噪音错误（#4683）——受管设备上的部署障碍明显。

6. **BYOK 的体验割裂**：`/model` 选择器不显示 BYOK 本地模型、Provider 配置无法按 Agent 隔离，BYOK 用户被迫依赖环境变量，交互体验不足。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-09-03**

> 数据来源：github.com/MoonshotAI/kimi-cli | 分析视角：AI 开发工具技术分析

---

## 1. 今日速览

过去 24 小时内，Kimi Code CLI 仓库无新版本发布，也无新增 Pull Request，整体生态相对稳定。值得关注的是，3 个创建于 3 月的老 Issue（#1298、#1297、#1294）在 9 月 2 日集中更新，其中涉及 YOLO 模式可观测性改进、Windows 平台子代理取消崩溃、以及配置目录规范等议题，反映出开发者对工具透明度和跨平台稳定性的持续关注。

---

## 2. 版本发布

**无新版本发布**。当前最新版本仍为 **1.16.0**，建议开发者关注仓库 Releases 页面获取后续更新通知。

---

## 3. 社区热点 Issues

过去 24 小时内共有 3 个 Issue 更新（均已关闭），重点如下：

### #1298 [增强] YOLO 模式下增加 shell 执行和文件写入内容查看功能

- **作者**：@Wolido | **评论**：0 | **👍**：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1298
- **核心诉求**：在 YOLO（全自动）模式下，用户希望能看到 Kimi 实际执行的具体 shell 命令以及文件写入/修改的完整内容，而非仅显示省略号（`...`），以便在出现严重错误时能及时终止操作。
- **背景**：kimi-cli 1.16.0，macOS + iTerm2。
- **为什么重要**：YOLO 模式是 CLI 工具中备受关注的高风险自动化模式，此 issue 直击用户对 AI 操作透明度的核心担忧。虽然该 issue 已关闭，但其诉求明确指向「可观测性」这一关键体验方向，未来版本可能会以「详细模式（verbose）」或「操作审计日志」等形式回归。

### #1297 [Bug] Windows 平台按 Escape 取消子代理时报错

- **作者**：@chriswingler | **评论**：0 | **👍**：1
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1297
- **核心问题**：在 Windows 11（10.0.26200.0 x64）上使用 kimi-for-coding 模型时，按 Escape 键取消子代理（subagent）任务会触发未处理的异常（Unhandled exception），疑似存在交互中断的稳定性缺陷。
- **为什么重要**：这是当前唯一获得 👍 的 issue，说明至少部分用户经历过相同或类似问题。跨平台稳定性（尤其是 Windows 上的 Ctrl+C / Escape 信号处理）是 CLI 工具走向成熟的关键门槛，该 bug 值得开发团队在下一个补丁版本中优先修复。

### #1294 [增强] 配置目录遵循 XDG Base Directory 规范

- **作者**：@sisrfeng | **评论**：0 | **👍**：1
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1294
- **核心诉求**：建议将配置目录从 `~/.kimi` 迁移至 `~/.config/kimi`，遵循 Linux 生态的 XDG Base Directory 标准，避免主目录被点文件污染。
- **为什么重要**：这反映了开发者对 CLI 工具「生态融入度」的重视。XDG 规范虽源于 Linux，但已被 macOS 和 Windows 上大量现代化 CLI 工具（如 `gh`、`uv`）所采纳，是社区公认的「好公民」行为。支持这一诉求的开发者通常也是长期使用 Unix 系工具的重度用户，他们对配置管理有较高要求。

> **说明**：今日数据中无新增 Issue，以上 3 条均为历史 issue 的近期更新。

---

## 4. 重要 PR 进展

**无新 Pull Request（过去 24 小时内更新数量为 0）**。当前没有待合并或新提交的代码变更可供分析。建议开发者关注 GitHub 上的 PR 列表以跟踪代码层面的最新变化。

---

## 5. 功能需求趋势

基于今日更新的 3 个 Issue，可提炼出以下社区关注方向：

| 趋势方向 | 代表 Issue | 说明 |
|---------|-----------|------|
| **操作透明度与可观测性** | #1298 | YOLO 模式下展示详细命令与文件变更，是用户对 AI 自动化信任度提升的核心诉求。未来可能推动「审计模式」或「细粒度权限控制」功能。 |
| **跨平台稳定性** | #1297 | Windows 平台异常处理与信号中断机制需要加强，尤其是对子代理进程的取消和清理逻辑。 |
| **配置标准化与系统集成** | #1294 | 遵循 XDG Base Directory 等系统规范，减少对用户主目录的污染，是 CLI 工具专业化的重要指标。 |

此外，从 Issue 标签看，**enhancement**（增强）类需求占比明显高于 bug 类，说明社区当前更关注「如何把工具用得更舒服」，而非「哪些功能坏了」。

---

## 6. 开发者关注点

- **YOLO 模式下的安全感**：开发者希望在高自动化模式下保留「知情权」和「终止权」，建议官方在 YOLO 模式中增加 `--verbose` 参数或实时操作流展示功能，让 AI 执行可追踪、可干预。
- **Windows 稳定性缺失**：Windows 用户遇到的异常取消问题并非个例（👍 说明有共性），反映了 CLI 在非 Unix 平台上的信号处理、进程管理等底层兼容性仍需打磨。
- **配置整洁性的洁癖**：开发者对 `~/.kimi` 点目录的抱怨，本质上是希望 Kimi CLI 能与现有开发环境（如 zsh、dotfiles 管理工具）无缝集成，遵循社区既有的 XDG 约定是最低成本方案。

---

*本日报基于公开 GitHub 数据自动生成，仅供技术参考。如需获取完整 Issue/PR 上下文，请访问对应链接。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-03

## 今日速览

今日最核心的动态集中在两个方面：一是 **v1.18.27 发布**，针对慢速模型启动和流式响应增加了五分钟默认超时，并修复了 Anthropic thinking 配置的兼容性问题；二是 **模型自动发现** 成为社区呼声最高的功能需求（#6231 已积累 48 条评论、225 个赞），同时 v1.18.26 引入的 `thinking.block_binding` 回归问题正在影响大量 Anthropic/Bedrock/Vertex 用户，多个 Issue 被集中创建并关闭。

---

## 版本发布

### v1.18.27
- **核心修复**
  - Provider header 超时默认调整为五分钟，减少慢模型启动时的失败概率
  - 流式 chunk 超时默认调整为五分钟，支持配置 `false` 彻底禁用超时
  - Anthropic `thinking.blockBinding` 可通过配置 opt out，避免与 provider 端冲突

---

## 社区热点 Issues（10 个）

### 1. OpenAI-compatible 本地 provider 模型自动发现
**#6231** | 作者: @ochsec | 48 评论 | 👍 225 | [链接](https://github.com/anomalyco/opencode/issues/6231)
- **内容**：当前 LM Studio、Ollama、llama.cpp 等本地 provider 需要在 `opencode.json` 中手动列出全部模型，模型频繁增删时维护成本高
- **社区反应**：225 个赞为当前最高，说明本地模型用户群体对此需求极为迫切。同日有 #46941 提交后被作为重复关闭，进一步印证诉求集中度

### 2. writeOsc52 在 GNU screen 下失效
**#28590** | 作者: @lingfish | 11 评论 | [链接](https://github.com/anomalyco/opencode/issues/28590)
- **内容**：`writeOsc52` 将 GNU screen 与 tmux 等同对待，统一使用 tmux 专用 DCS 序列前缀，导致 screen 下剪贴板功能不工作
- **社区反应**：该问题此前在 #26491/#26492 被关闭，此次重新提出并获得 11 条评论，属于典型的"老问题被误关、用户再次上报"

### 3. 非交互模式下工具调用被拒后静默退出
**#36413** | 作者: @oldantique | 7 评论 | [链接](https://github.com/anomalyco/opencode/issues/36413)
- **内容**：`opencode run` 中工具调用被权限系统自动拒绝且模型无最终输出时，进程以 `0` 退出码结束且 stdout 为空——自动化流水线无法识别失败
- **社区反应**：CI/CD 场景的核心痛点，涉及机器可检测信号缺失，对自动化工具链影响严重

### 4. v1.18.26 引入 thinking.block_binding 回归（Anthropic 系）
**#46729** | 作者: @januaryjon | 6 评论 | 👍 13 | [链接](https://github.com/anomalyco/opencode/issues/46729)
- **内容**：升级到 1.18.26 后，`amazon-bedrock/global.anthropic.claude-opus-5` 请求全部失败，报错 `thinking.adaptive.block_binding.prefix_mismatch_behavior: Extra inputs are not permitted`
- **社区反应**：13 个赞说明影响面广；配套的 #46777（google-vertex-anthropic）、#46909（OpenCode Zen gateway）均指向同一回归，v1.18.27 已部分缓解

### 5. 插件客户端缺失 Authorization header
**#9706** | 作者: @uf-hy | 7 评论 | [链接](https://github.com/anomalyco/opencode/issues/9706)
- **内容**：设置 `OPENCODE_SERVER_PASSWORD` 后，注入到插件的客户端未携带 Authorization header，所有插件 API 调用返回 401
- **社区反应**：影响所有启用了服务端密码的插件开发者和用户，是一个长期存在但关注度不足的权限链路缺陷

### 6. 可选工具元数据破坏 pending 权限列表
**#37650** | 作者: @kitlangton | 5 评论 | [链接](https://github.com/anomalyco/opencode/issues/37650)
- **内容**：`glob` 和 `grep` 工具的可选参数为空时，`session.permission.list` 会因 schema 编码失败而崩溃（`undefined` 出现在 JSON 元数据中）
- **社区反应**：2.0 版本（`opencode2 v0.0.0-next`）暴露的 schema 严谨性问题，权限流+可选参数是高频组合

### 7. Ctrl+B 快捷键冲突
**#36520** | 作者: @klonuo | 5 评论 | [链接](https://github.com/anomalyco/opencode/issues/36520)
- **内容**：主要开发者介绍了将 Ctrl+B 用于后台任务的新特性，但用户反馈该快捷键在终端中常年绑定其他功能（如 tmux prefix、shell 导航）
- **社区反应**：用户明确表示"请不要这样做"，属于设计决策与用户习惯冲突的典型案例

### 8. Desktop App 缺少会话导入/导出功能
**#32696** | 作者: @inddiaz | 4 评论 | 👍 3 | [链接](https://github.com/anomalyco/opencode/issues/32696)
- **内容**：CLI 支持 `opencode export/import`，但桌面应用没有对应的 UI 入口
- **社区反应**：Desktop App 功能完整度追赶 CLI 的诉求持续存在，跨设备会话迁移是刚需

### 9. `opencode export` 管道输出 JSON 被截断
**#29330** | 作者: @xqm32 | 4 评论 | [链接](https://github.com/anomalyco/opencode/issues/29330)
- **内容**：`opencode export <id> | jq` 在大会话场景下输出截断/损坏，写文件正常，管道场景必现
- **社区反应**：影响脚本自动化处理导出数据的用户，大数据量下的流式完整性存在问题

### 10. 按名称配置 formatter 会静默禁用
**#46868** | 作者: @devYRPauli | 3 评论 | [链接](https://github.com/anomalyco/opencode/issues/46868)
- **内容**：在 `formatter` 配置中写 `clang-format`、`air` 或 `uv` 会导致格式化器静默失效，只有 `disabled: true` 生效，其他覆盖项会"杀死"该 formatter
- **社区反应**：属于配置系统类型查找缺陷（`Formatter[name as keyof typeof Formatter]` 查不到内置项），刚提交的 Issue 尚无维护者回应

---

## 重要 PR 进展（10 个）

### 1. 监听新建配置文件与目录
**#46925** | 作者: @opencode-agent[bot] | [链接](https://github.com/anomalyco/opencode/pull/46925)
- **内容**：创建项目首个 `opencode.json(c)` 或 `.opencode/` 目录后无需 `/restart` 即可生效，修复发现与 watch 挂载之间的竞态

### 2. HTTP SSE 流式响应支持 chunkTimeout
**#46802** | 作者: @holny | [链接](https://github.com/anomalyco/opencode/pull/46802)
- **内容**：`chunkTimeout` 此前在配置中接受但从未在原生 HTTP 传输层生效（`HttpOptions` 无该字段），本次补全 SSE 流式场景的超时支持，与 v1.18.27 的超时修复形成配套

### 3. RPC 内部错误统一为类型化失败
**#46902** | 作者: @kitlangton | [链接](https://github.com/anomalyco/opencode/pull/46902)
- **内容**：`Rpc.client(definition)` 类型声明支持 `rpc.internal`，但实际代码从未产出该错误。handler 崩溃/抛异常/未声明错误时表现为未类型化异常，无法被 Effect 错误恢复捕获。此 PR 统一所有路径返回 `rpc.internal`

### 4. 规范化 RPC handler 失败语义
**#46946** | 作者: @kitlangton | [链接](https://github.com/anomalyco/opencode/pull/46946)
- **内容**：进程内调用与 HTTP 调用对 handler 异常的错误处理不一致（前者绕过恢复，后者返回 `rpc.internal`），PR 将两者对齐为可恢复类型化错误

### 5. snapshot 恢复时保护项目外文件
**#46947** | 作者: @kitlangton | [链接](https://github.com/anomalyco/opencode/pull/46947)
- **内容**：修复"symlink→directory"变更撤销时可能误删项目外文件的严重问题。恢复顺序现在先处理子路径，避免先恢复父 symlink 导致路径跳转

### 6. catalog 更新保留 provider 身份
**#46948** | 作者: @kitlangton | [链接](https://github.com/anomalyco/opencode/pull/46948)
- **内容**：provider 更新若改了 `provider.id`，catalog 仍按旧 ID 索引导致无法检索。与 agent/model/skill 行为对齐，更新时保留 keyed identity

### 7. 插件 API 新增 SkillEditor.get(id)
**#46952** | 作者: @kitlangton | [链接](https://github.com/anomalyco/opencode/pull/46952)
- **内容**：为 Core editor 和两个插件 API 增加同步的按键查找方法，避免遍历 `editor.list()` 才能读取单个 skill。Agent/tool/MCP editor 已有同类能力

### 8. 新增 ReferenceEditor.get(name)
**#46956** | 作者: @kitlangton | [链接](https://github.com/anomalyco/opencode/pull/46956)
- **内容**：与 #46952 配套，为 reference 编辑提供直接按键查找入口，补齐插件 API 的一致性和易用性

### 9. 保留实时 moves 不被旧元数据覆盖
**#46954** | 作者: @kitlangton | [链接](https://github.com/anomalyco/opencode/pull/46954)
- **内容**：会话 GET 响应中可能携带旧 `/repo` 路径，若晚于 `session.moved` 更新到达，会用过期数据覆盖新位置。PR 在 client 端做保护，优先保留实时 moves

### 10. Responses 解析器 id 解析重构
**#46885** | 作者: @rekram1-node | [链接](https://github.com/anomalyco/opencode/pull/46885)
- **内容**：`function_call` 类型的 responses item 存在两条 id 解析路径（`item.id ?? call_id` 合并、dedup 扫描、条件元数据等），PR 将 id 统一在 stream 边界解析一次，简化解析逻辑，附带清理注释的 follow-up #46951

---

## 功能需求趋势

### 1. 模型自动发现（最高热度）
- #6231（225 赞）与 #46941 均要求从 OpenAI-compatible 端点（`GET /models`）自动发现模型列表，尤其针对 LM Studio/Ollama 等本地 provider
- **趋势解读**：本地模型 + 频繁换模型的工作流已成为主流场景，手写配置已成为明显的效率瓶颈

### 2. Desktop App 功能补齐
- #32696 会话导入/导出、#46958 缩放快捷键（Ctrl+ + 无效）等桌面端问题持续出现
- **趋势解读**：Desktop App 的快捷键一致性和数据管理功能与 CLI 之间仍有差距，用户期望两个入口的能力对齐

### 3. Anthropic 系模型适配修复
- #46729、#46777、#46909 三个 Issue 均指向 v1.18.26 的 `thinking.block_binding` 回归，覆盖 Bedrock、Vertex、OpenCode Zen 三条 provider 路径
- **趋势解读**：Anthropic 新模型（Claude Opus 5 / Sonnet 5）的 thinking 配置项在多层代理（网关/云平台）下兼容性问题集中爆发，ributed 到真实用户的时间非常短

### 4. 本地小模型 / 路由代理的上下文处理
- #45368（`limit.output` 缺失导致 compaction 误触发）、#45327（`tool_call: false` 不生效）、#41372（按模型能力类调整提示词）持续把 local/小模型用户的痛点推到前台

---

##

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-03

> 数据来源：github.com/QwenLM/qwen-code

## 1. 今日速览

- **新版本发布**：`live-host-v0.2.0` 发布，包含 CI 并发调优与 OpenTUI 迁移第 4 批改动。
- **TUI 架构升级成为社区焦点**：ink → OpenTUI 迁移跟踪 issue（#8662）单条收获 23 条评论，为当前讨论热度最高的话题，终端 UI 重构成开发主线。
- **安全与内容可靠性问题密集暴露**：新增 `qwen serve` shell guard 安全缺陷（#10860）、依赖 CVE 审计全仓库失败（#10850），以及多个 XML/thinking 标签泄漏类 bug，开发者在持续关注输出卫生与沙箱边界。

## 2. 版本发布

### live-host-v0.2.0（Qwen Live Host v0.2.0）
- **fix(ci)**: make shared ECS Vitest concurrency tunable（CI 并发参数可调）
- **feat(cli)**: OpenTUI migration batch 4 — d（OpenTUI 迁移第 4 批，CLI 渲染层持续推进）

## 3. 社区热点 Issues（10 条）

1. **[#8662] Migrate TUI rendering layer from ink to OpenTUI（tracking）** — 作者 @chiga0，23 条评论，当前最热。issue 指出基于 ink 7 + React 19 + 约 1037 行补丁的渲染层存在闪烁等结构性缺陷，社区围绕 OpenTUI 迁移路径展开持续讨论。优先级 P3，但关注度最高。  
   https://github.com/QwenLM/qwen-code/issues/8662

2. **[#10860] `qwen serve` 内置 shell guard 忽略会话审批模式、拒绝会话目录外的只读 Git/非 Git 命令，且无法配置/审计/对操作员可见** — 作者 @VorlMald

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*