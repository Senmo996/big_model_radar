# AI CLI 工具社区动态日报 2026-09-30

> 生成时间: 2026-09-30 02:52 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-30）

## 1. 生态全景

当前 AI CLI 工具正从“单机代码辅助”加速演变为“可编程 agent 运行时”，核心竞争点集中在插件扩展性（Claude Code Mods）、托管代理架构（Qwen Managed Agent）、MCP 生态兼容（Copilot / Gemini / OpenCode）以及跨平台稳定性（尤以 Windows 为短板）。社区对安全默认策略、上下文 token 成本治理、会话生命周期管理的需求显著上升，表明工具已进入深度生产使用阶段。头部工具均保持高频率发布（Codex 日更 8 个版本），但稳定性问题（尤其 Windows 桌面端）仍是共同瓶颈。

## 2. 各工具活跃度对比

> 数据基于日报中明确列出的“社区热点 Issues”和“重要 PR 进展”条目数，并非全量数据。

| 工具 | 重点 Issues 数 | 重点 PR 数 | Release 情况 |
|---|---|---|---|
| Claude Code | 10 | 8 | v2.1.285（feature 为主） |
| OpenAI Codex | 10 | 10 | 8 个版本（稳定版 0.159.2 / 0.159.1 / 0.159.0 + 5 个 alpha） |
| Gemini CLI | 10 | 4 | nightly v0.64.0 + preview v0.63.0 + v0.62.0 |
| Copilot CLI | 10 | 1 | v1.0.90-2 ~ v1.0.90-5（4 个补丁） |
| Kimi Code CLI | 0 | 0 | 无活动 |
| OpenCode | 10 | 10 | 无版本发布，PR/Issue 活跃 |
| Qwen Code | 10 | 10 | v0.24.7 正式版 + nightly + SDK + Desktop（4 个） |

**解读**：OpenAI Codex、Claude Code、Qwen Code 处于高频迭代期；OpenCode 虽无发版但 PR 密集；Kimi Code 当日完全静默，社区活跃度明显落后。

## 3. 共同关注的功能方向

- **MCP 兼容性与生命周期管理**：Claude Code（MCP 连接重试/结果丢弃）、Copilot CLI（远程 MCP 失败、工具名含点号 400、双字段污染）、Gemini CLI（MCP 配置损坏/启用禁用失效）、Qwen Code（私有 Hosted MCP 运行时）都在强化 MCP 接入的健壮性和安全边界。
- **Windows 平台稳定性**：Claude Code（Git Bash 反斜杠丢失、MSIX 退出后无法启动）、OpenAI Codex（桌面 spinner 卡死、控制台闪屏、WSL2 挂载拒绝）、OpenCode（Expand-Archive 加载失败、默认端口冲突）——Windows 用户体感最差，已成为共性问题。
- **安全默认与权限控制**：Claude Code（sec-default 系列 PR：deny 优先、托管 mods 白名单、敏感文件隔离）、Copilot CLI（只读目录批准）、OpenCode（deny 权限导致免费模型故障、空资源列表误放行）、Qwen Code（权限规则遵循修复）共同指向“权限必须可预期、不可绕过”。
- **上下文成本与 token 治理**：Claude Code（headless 模式多耗 1.8 倍额度、allowlist 工具选择）、OpenCode（上下文窗口硬编码、shell 输出无限制）、Qwen Code（非对话上下文 token 治理专项）、Copilot CLI（压缩空响应）——大上下文模型带来的成本问题正迫使工具做精细化控制。
- **会话持久化与恢复**：Claude Code（远程会话重认领）、Copilot CLI（锁文件残留、会话恢复）、OpenAI Codex（跨设备迁移/导出）、Qwen Code（SDK 中止后进程残留、per-Session 索引泄漏）——长会话可靠性成为团队协作场景的硬需求。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 深度插件生态、函数 hooks、安全默认 | 追求高度可定制和自动化工作流的高级开发者/企业 | 以 Mods/plugin 体系为核心，强调企业级安全策略（sec-default），对 IDE/桌面集成体验关注度高 |
| **OpenAI Codex** | 高频迭代、模型快速跟进（GPT-6.1 Sol）、Windows 桌面端 | 依赖模型能力领先性、跨端一致的开发者 | 版本节奏极快，Alpha/稳定版并行；集中攻克 Windows 沙箱和桌面应用稳定性，重视 TUI 细节 |
| **Gemini CLI** | 子代理可靠性、浏览器代理、MCP 安全 | 依赖 agent 委派和浏览器自动化的开发者 | 注重模型“bash 亲和力”与零依赖沙箱设计；通过 PR 修补 SDK 透传和 MCP 配置缺陷 |
| **Copilot CLI** | 企业级 Agent 发现、MCP 规范合规、发布工程 | 深度使用 GitHub 生态、有组织级需求的企业用户 | 依托 GitHub 集成，强调 OAuth/企业权限模型；MCP 错误处理与规范对齐是当前重点 |
| **OpenCode** | TUI 体验、权限细分、多协议兼容 | 终端重度用户、多 provider 用户 | 以开源社区驱动，注重 UI/UX 打磨（合并读取、顶栏状态）和协议层统一（工具名、缓存策略） |
| **Qwen Code** | Managed Agent 托管运行时、SDK（TS/Java） | 需要大规模自动化、后端集成和远程执行场景的开发者 | 以 Broker/Worker 架构支撑持久化执行和远程结果投递；强化与 SDK 的进程生命周期管理 |
| **Kimi Code** | 当日无活动 | — | 待观察 |

## 5. 社区热度与成熟度

- **最活跃**：Claude Code——单一 issue（Mods 提案）获 128 👍 / 225 评论，功能 hooks 即将交付，社区期待度最高；同时 PR 密集布局安全默认，生态正走向成熟。
- **高迭代**：OpenAI Codex——单日 8 个版本，但 Windows 启动问题连续多日霸榜，说明用户基数大、新功能与稳定性矛盾突出；TUI 随机问候语被 24 小时内移除，体现对核心用户反馈的快速响应。
- **高质量讨论**：Qwen Code——Managed Agent 架构 issue 获 37 条评论，多个 P1 问题当日闭环，工程化程度高，但公众可见热度（👍 数）较低，更像“专业基础设施”路线。
- **快速修复**：Copilot CLI——发布 4 个补丁版本修复启动误报和 MCP 进度更新问题，但 PR 仅 1 条，社区侧 400 错误和会话恢复问题积压较久，成熟度中等。
- **温和活跃**：Gemini CLI、OpenCode——有稳定的 issue/PR 流，但缺少爆发性话题；OpenCode 的权限 deny 故障出现双报告，值得关注根因是否迅速修复。
- **最不活跃**：Kimi Code CLI——24 小时无任何动态，需警惕社区热度衰退。

## 6. 值得关注的趋势信号

1. **插件化与“Mods”成为下一站**：Claude Code 的 function hooks 承诺即将落地，Qwen Managed Agent 也在构建托管扩展运行时，OpenCode 统一工具名跨协议。可扩展性正从“配置文件”升级为“一等的运行时抽象”。
2. **安全从建议变为默认**：Claude Code 的 sec-default 系列 PR、OpenCode 的权限空列表漏洞修复、Copilot 的只读目录批准，说明 agent 工具正在建立“默认最小权限 + 组织级强制策略”的行业基线。
3. **Windows 稳定性是工具规模化采用的关键卡点**：多个工具在 Windows 上出现启动、路径、终端兼容性问题，且修复速度参差。对使用 Windows 作为主力开发环境的用户，选择工具时应优先看重平台成熟度（如 Codex 已在持续补课，但尚未根治）。
4. **上下文/token 成本治理从优化项变为刚需**：非对话 token 重复计费（Qwen）、上下文窗口硬编码（OpenCode）、shell 输出无界（OpenCode）、headless 模式超额消耗（Claude）——用户开始用数据衡量工具的经济性，厂商将被迫提供显式缓存断点、输出截断、allowlist 等控制手段。
5. **会话生命周期成为新的稳定性战场**：锁文件残留、压缩失败、远程会话无法重认领、进程残留等高频故障，直接威胁“长时 agent 工作流”的信任度。能提供优雅恢复机制的工具将获得差异化优势。
6. **MCP 协议统一的“最后一公里”仍在攻坚**：远程 MCP 错误处理、工具名规范、结构化内容优先级、配置损坏的 fail-open 问题，说明 MCP 虽成为事实标准，但各工具的实现兼容性仍需借助社区反馈逐项对齐。

**对开发者的参考价值**：评估工具时，不应只看模型能力或功能清单，应重点考察其在目标平台（尤其 Windows）的稳定性、MCP 服务器兼容性、安全默认策略以及长期会话的恢复能力。若深度依赖自动化，需优先选择插件生态/托管运行时成熟（Claude Code、Qwen Code）的工具；若主要在终端高频使用，需关注 TUI 交互细节（Codex、OpenCode）；若为企业组织，则需验证企业级 Agent 发现、权限管理和合规特性（Copilot CLI、Claude Code 的 sec-default）。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**: github.com/anthropics/skills | **截止日期**: 2026-09-30  
**样本**: 热门 PR 50 条（Top 20）、社区 Issues 50 条（Top 15）

---

## 1. 热门 Skills 排行

>

---

# Claude Code 社区动态日报 — 2026-09-30

## 今日速览

- **v2.1.285 发布**：新增 `CLAUDE_CODE_DISABLE_WEB_FETCH` 环境变量，支持 `claude --desktop` 快捷打开桌面应用，并新增 `claude plugin configure` 插件配置命令。
- **Mods 扩展性提案**（#91870）持续发酵，获得 128 👍 和 225 条评论，官方承诺 function hooks 进入以周计算的时间窗口。
- **自动模式分类器故障**与**Windows 平台稳定性**成为今日开发者反馈最集中的两大主题。

## 版本发布

### v2.1.285

- **`CLAUDE_CODE_DISABLE_WEB_FETCH`**：新增环境变量，可完全关闭 WebFetch 工具。
- **`claude --desktop`**：在指定目录快速打开 Claude 桌面应用；结合 `--continue` / `--resume <id>` 可直接恢复会话。
- **`claude plugin configure <plugin>`**：新增插件配置入口命令。

## 社区热点 Issues

### 1. Mods — 让 Claude Code 扩展性提高 10 倍（128 👍，225 评论）
**#91870** · [链接](https://github.com/anthropics/claude-code/issues/91870)
社区最具热度的提案，已升级为官方 Community Update：团队承诺在数周内交付 function hooks。该设计将深度影响 Claude Code 的插件生态与自动化能力，建议所有插件开发者保持关注。

### 2. VSCode/Cursor 环境警告持续弹窗（73 👍，50 评论）
**#3301** · [链接](https://github.com/anthropics/claude-code/issues/3301)
每次打开 IDE 集成终端都会出现 "extensions want to relaunch the terminal" 警告，需手动处理。该问题存在已久仍未被解决，属于 IDE 体验的高频痛点。

### 3. 自动模式分类器间歇性无响应，阻塞 Bash 与 ScheduleWakeup（33 👍，25 评论）
**#97854** · [链接](https://github.com/anthropics/claude-code/issues/97854)
Auto 模式下服务端安全分类器对包括 `echo ok` 在内全部调用返回无判定结果，导致工具 100% 阻塞数分钟。对依赖自动化的用户影响严重。

### 4. 远程会话 TTS 朗读与语音模式请求（34 👍，24 评论）
**#42700** · [链接](https://github.com/anthropics/claude-code/issues/42700)
期望在 Remote Control 会话中增加响应 TTS 朗读及语音交互能力，适合远程操作与无障碍使用场景。

### 5. 韩语响应要求在工具调用间隔中被反复忽略（22 评论）
**#98145** · [链接](https://github.com/anthropics/claude-code/issues/98145)
用户明确设置 `language: korean` 并写入记忆，模型仍在中途指引中切回英语。多语言一致性问题值得官方关注。

### 6. Skill 的 paths frontmatter 导致技能完全不可发现（12 评论）
**#49835** · [链接](https://github.com/anthropics/claude-code/issues/49835)
macOS 上带 `paths` frontmatter 的 Skill 不被识别，已标记为 reproduced 并关闭，修复状态待确认。

### 7. 子代理压缩后段记录丢失（9 评论）
**#97665** · [链接](https://github.com/anthropics/claude-code/issues/97665)
Subagent 自动压缩时，保留段的最后一条消息仅出现在边界记录中、从未写入子代理转录文件。与 #97316 同源但场景不同，影响长会话审计。

### 8. Windows/Git Bash：命令中反斜杠被静默减半（4 👍，6 评论）
**#85856** · [链接](https://github.com/anthropics/claude-code/issues/85856)
MSVCRT 与 MSYS2 编码差异导致 Bash 工具把 `n` 个反斜杠变成 `ceil(n/2)` 个，引号无法规避。Windows 用户的路径与转义操作会静默出错，极难排查。

### 9. Claude Desktop (Windows/MSIX) 退出后无法启动，exitCode 21（6 评论）
**#95050** · [链接](https://github.com/anthropics/claude-code/issues/95050)
每次退出后重新启动均失败，需重启 CoworkVMService 才能恢复。属于桌面端严重回归问题。

### 10. settings.json 符号链接导致原子写入 EROFS/EACCES（5 评论）
**#78162** · [链接](https://github.com/anthropics/claude-code/issues/78162)
当 `~/.claude/settings.json` 为“指向符号链接的符号链接”时，原子保存失败。对使用 dotfiles 管理配置的开发者是个坑。

## 重要 PR 进展

### 1. agents-md：将 AGENTS.md 加载行写入调试日志（已合并）
**#98275** · [链接](https://github.com/anthropics/claude-code/pull/98275)
仅有 AGENTS.md 而无 CLAUDE.md 的项目，启动时新增的加载行会发送至 debug 日志，与 2.1.286 行为对齐。

### 2. sec-default：系统提示词段落不再受个人插件影响（已合并）
**#97241** · [链接](https://github.com/anthropics/claude-code/pull/97241)
组织启用安全默认后，`prompt.compose` 的段落顺序将不再被用户级插件改写，插件无法再操纵系统提示词结构。

### 3. sec-default：会话保留行继续跨越用户层级（开放中）
**#97334** · [链接](https://github.com/anthropics/claude-code/pull/97334)
会话保留机制需等引擎主分支具备 `session.append` 事件后方可合入，测试已提前就位。

### 4. mods：声明携带 process.run 截断标志与 mtimeMs（开放中）
**#97293** · [链接](https://github.com/anthropics/claude-code/pull/97293)
为 `$.process.run` 结果增加 `isStdoutTruncated/isStderrTruncated`，为 `$.fs.list` 条目增加 `mtimeMs` 类型声明，待发布 CLI 支持后生效。

### 5. sec-default：settings 拒绝规则优先于插件 allow/ask（已合并）
**#98080** · [链接](https://github.com/anthropics/claude-code/pull/98080)
在安全默认模式下，用户插件无法再覆盖 settings 中的 deny 规则；组织可在托管设置中退出该行为。

### 6. sec-default：新增 allowManagedModsOnly 托管选项（已合并）
**#98083** · [链接](https://github.com/anthropics/claude-code/pull/98083)
组织可只允许自身分发的 mods 加载，彻底拒绝用户自装插件的 hooks 模块。

### 7. security-guidance：拒绝与被禁文件不再进入评审上下文（开放中）
**#96434** · [链接](https://github.com/anthropics/claude-code/pull/96434)
修复 #96276：安全评审的 Stop-hook 与提交/推送提示词此前用 `git diff` 组装，可能把被权限规则屏蔽的 `secrets.yaml` 等文件带入模型上下文。

### 8. CI：为调用 Claude 的 GitHub Actions 增加安全加固（开放中）
**#97952** · [链接](https://github.com/anthropics/claude-code/pull/97952)
为 `claude-issue-triage.yml`、`claude-dedupe-issues.yml` 等工作流增加出口防火墙、最小权限令牌等加固措施。

## 功能需求趋势

- **插件与 Mods 生态**：#91870 的高热度表明社区对正式 function hooks 的强烈渴望，这是当前第一优先级需求。
- **语音交互**：#42700 的 TTS/语音模式请求反映远程控制场景对多模态交互的需求。
- **安全默认（sec-default）**：多个 PR 集中落地组织级安全策略，包括 deny 规则优先级、托管 mods 白名单、敏感文件隔离。
- **桌面应用体验**：涉及终端面板自动感知、Git 分支栏恢复（#93699）、Windows 启动稳定性等多点优化诉求。
- **多语言与本地化**：#98145 表明模型在工具调用间隔中保持用户指定语言的执行能力仍需强化。

## 开发者关注点

- **自动模式权限分类器稳定性**：#97854、#98169 均指向服务端分类器误判或静默失败，直接影响自动化流程的可靠性。
- **Windows 平台问题集中爆发**：Git Bash 反斜杠丢失（#85856）、MSIX 自动更新后无法启动（#92167、#95050）等，Windows 用户体感较差。
- **MCP 连接生命周期**：#90494（启动后连接不重试）、#97062（symlink 导致大结果丢弃）反映 MCP 在真实复杂环境中的容错不足。
- **成本与 token 效率**：#97074 指出 headless `claude -p` 比交互模式多消耗约 1.8 倍 5 小时窗口额度，#92554 则提议基于 allowlist 的工具选择来削减上下文开销。
- **会话恢复与远程控制**：#91087 中远程控制服务崩溃后会话无法重新认领，消息无限排队，对团队协作场景影响较大。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 2026-09-30

## 今日速览

今日 Codex 共发布 8 个版本，其中稳定版 0.159.2 修复了 Windows 控制台窗口闪屏问题，0.159.1 将 GPT-6.1 Sol 设为默认模型。社区方面，Windows 桌面应用启动卡死/无限加载问题持续成为焦点（多日连续攀升，今日新增 #49430/#49431），同时 TUI 随机问候语功能因干扰高频用户而遭抗议，官方已通过 PR #49395 将其移除。此外，WSL2 沙箱 host mount 问题和全权访问（--yolo）在 app-server 重启后丢失等问题也引发了开发者的大量共鸣。


## 版本发布

今日共发布 8 个版本，重点如下：

**稳定版**

- **rust-v0.159.2** — 修复 Windows 上 Codex 启动后台进程及沙箱命令时控制台窗口闪屏问题（#49385）。[查看发布](https://github.com/openai/codex/releases/tag/rust-v0.159.2)
- **rust-v0.159.1** — 将 GPT-6.1 Sol 设为内置目录和 Amazon Bedrock Mantle/Runtime 目录的默认模型（#49323, #49342）。[查看发布](https://github.com/openai/codex/releases/tag/rust-v0.159.1)
- **rust-v0.159.0** — 新增 opt-in `instant_interrupt`，允许新输入在模型响应或长时间 code-mode 调用期间实时转向；新会话启用紧凑欢迎屏幕和一致性头部，并在对话中不定期展示使用提示。[查看发布](https://github.com/openai/codex/releases/tag/rust-v0.159.0)

**预发布/Alpha**

- rust-v0.161.0-alpha.3 / alpha.2 / alpha.1
- rust-v0.160.0-alpha.6.1 / alpha.6

均为 0.161.0 / 0.160.0 系列 alpha 迭代，包含持续的功能改进。备份和细节见 [Releases 列表](https://github.com/openai/codex/releases)。


## 社区热点 Issues（10 个）

### 1. [Windows] Codex Desktop 启动卡在 spinner，需手动终止 app-server 才恢复
**#48333** | 评论 23 | 👍 8 | [链接](https://github.com/openai/codex/issues/48333)

Windows 版 Codex Desktop 26.924.1866.0 启动后无限 spinner，直到手动终止 app-server 进程才能进入应用。这是近期 Windows 启动问题的最大集中讨论帖，已在多个版本上复现。

### 2. [Windows] Chrome 控制失败：无 TUN 时 cua_repl launch.mjs 代理可绕过
**#44364** | 评论 16 | 👍 5 | [链接](https://github.com/openai/codex/issues/44364)

Windows 上 Chrome 浏览器控制功能在缺少 TUN 虚拟网卡时失败，社区发现可通过 `cua_repl launch.mjs` 代理绕过。网络层问题与本地代理方案并存，引发对 Windows 网络兼容性的广泛讨论。

### 3. [WSL2] `codex sandbox` 失败：/mnt/wslg/distro 被报告为不支持的主机挂载
**#47429** | 评论 10 | 👍 21 | [链接](https://github.com/openai/codex/issues/47429)

WSL2 用户运行 `codex sandbox` 时因 `/mnt/wslg/distro` 被识别为不支持的主机挂载而失败。获得高达 21 个 👍，是今日点赞数最高的 Open Issue，反映 WSL2 用户对沙箱体验的强烈诉求。

### 4. [Windows] 桌面应用灰色加载屏，后端与 Pet 进程均存活
**#48216** | 评论 16 | 👍 0 | [链接](https://github.com/openai/codex/issues/48216)

Windows Store/MSIX 包更新至 26.924.1866.0 后，应用卡在灰色加载屏，而后端和 Pet 进程仍在运行。与 #48333 高度相关，属同一批 Windows 启动问题集群。

### 5. [macOS] Control+B 在 Quick Chat 输入时误触侧边栏
**#33977** | 评论 11 | 👍 11 | [链接](https://github.com/openai/codex/issues/33977)

macOS 桌面应用中，Quick Chat 输入框获得焦点时按下 Control+B 会误切换侧边栏。尽管报告时间较早，今日仍有新讨论，属于长期未解决的快捷键冲突问题。

### 6. [Closed] Codex CLI 0.157.0 在沙箱刷新时弹出空白 Windows Terminal 窗口
**#48120** | 评论 15 | 👍 7 | [链接](https://github.com/openai/codex/issues/48120)

CLI 0.157.0 在 Windows 上执行沙箱设置刷新时会弹出多个空白终端窗口，已关闭，修复随 0.159.2 发布。

### 7. [功能请求] 增加禁用随机会话问候语的配置项
**#48913** | 评论 7 | 👍 18 | [链接](https://github.com/openai/codex/issues/48913)

TUI 每次新会话显示随机问候语，高频开发者表示干扰大、显得低质，要求提供配置开关。获得 18 个 👍，官方已快速响应（见 PR #49395），展示社区反馈闭环效率。

### 8. [Windows] Codex 卡在"Reconnecting... waiting for network" — Schannel 证书验证失败
**#41275** | 评论 8 | 👍 6 | [链接](https://github.com/openai/codex/issues/41275)

企业/公共部门网络环境中，Schannel 证书验证失败导致 Codex 陷入无限重连循环。企业级网络环境下 TLS 兼容性问题，影响面虽小但痛点深。

### 9. [Windows] 新版 26.928.1915.0 启动卡死 — app_start 超时 + EPERM rename_staging
**#49430** | 评论 2 | 👍 0 | [链接](https://github.com/openai/codex/issues/49430)

今日新提交的 Issue，针对最新 26.928.1915.0 版本，启动卡死伴随 `app_start` 超时和 `EPERM rename_staging` 错误。表明 Windows 启动问题在最新版本上仍未完全修复。

### 10. [Windows] PyCharm 终端运行 Codex CLI 弹出多个外部命令提示符窗口
**#49431** | 评论 2 | 👍 0 | [链接](https://github.com/openai/codex/issues/49431)

codex-cli 0.160.0-alpha.3 在 PyCharm 终端运行时，弹出多个外部 cmd 窗口。与 #48120 同属一类控制台闪屏问题，alpha 版本中仍存在。


## 重要 PR 进展（10 个）

### 1. 移除 TUI 会话头部的随机问候语
**#49395** | [链接](https://github.com/openai/codex/pull/49395)

移除启动问候语和共享问候状态，原始会话头部现在一致包含 `model:` 和 `directory:` 字段。直接回应用户 #48913 的反馈，默认行为回退到更简洁的界面。

### 2. 跨 Responses 重试和回退遵循服务器重试建议
**#49441** | [链接](https://github.com/openai/codex/pull/49441)

修复服务器过载和请求耗尽时未遵循重试建议的问题，并确保 WebSocket→HTTP 回退不在建议截止前提前发起请求。

### 3. TUI 语音设置支持本地音频设备选择
**#49437** | [链接](https://github.com/openai/codex/pull/49437)

语音对话此前固定使用系统默认麦克风和扬声器，现在 TUI 可独立选择输入/输出设备，包括通过远程 app-server 连接时的场景。

### 4. 认证变更后保留 bootstrap 服务发现配置
**#49432** | [链接](https://github.com/openai/codex/pull/49432)

嵌入的 app-server 配置发现需在登录和工作区切换后保持可用，同时先前账号获得的内容访问权限必须撤销，将 AuthRouteConfig 拆分独立应用。

### 5. 推断 Windows UNC 路径时支持正斜杠和混合斜杠
**#49424** | [链接](https://github.com/openai/codex/pull/49424)

`LegacyAppPathString` 将 `//server/share/project` 误判为 POSIX 路径，丢失 UNC 语义。现在 API 路径以双分隔符开头时一律按 Windows 语法推断。

### 6. 恢复 exec-server 会话在环境信息超时后的稳定性
**#49407** | [链接](https://github.com/openai/codex/pull/49407)

传输卡死会占满出站队列，导致 `environment/info` 请求在发送阶段就阻塞。RPC 被包裹在 30 秒超时中，覆盖发送与响应等待两个阶段。

### 7. 支持 OpenAI API Key 的显式 cyber access programs
**#49406** | [链接](https://github.com/openai/codex/pull/49406)

当 `api_key_cyber_access_programs` 和 `api_key_model_discovery` 同时启用时，转发显式 `cyberAccessProgram` 选择。该功能默认关闭，可通过配置启用。

### 8. 登录 shell 中的捆绑工具增加实验性开关
**#49403** | [链接](https://github.com/openai/codex/pull/49403)

注册 `login_shell_package_path` 为默认关闭的实验性功能，并在 `/experimental` 中以上下文说明的形式暴露，方便高级用户提前测试。

### 9. 多行 ANSI 警告不再输出载荷内容
**#49416** | [链接](https://github.com/openai/codex/pull/49416)

`ansi_escape_line` 收到多行输入时会逐行记录渲染后的内容，导致大型载荷撑爆警告日志。现在仅输出结构化的 `input_bytes` 和 `line_count` 字段。

### 10. 按时间和数据库大小定期清理诊断日志
**#49425** | [链接](https://github.com/openai/codex/pull/49425)

原有仅启动时清理的方式无法覆盖长时间运行会话，且仅按时间保留无法控制数据库体积。现在初始化后立即执行一次，此后每 30 分钟自动清理。


## 功能需求趋势

从今日 Issues/PRs 中可提炼出以下社区关注方向：

1. **Windows 平台稳定性**（最突出） — 启动 spinner 卡死（#48333 / #48216 / #48701 / #49182 / #49430）、控制台窗口闪屏（#48120 / #49431）、Chrome 控制与网络重连（#44364 / #41275）、沙箱 DACL 权限与 ACL（#46380 / #49299），占据今日 Issue 的一半以上。高频词：`app-server`、`sandbox-bin`、`spinner`、`Windows Terminal`。

2. **会话管理和跨设备迁移** — 项目会话混入全局 Recents（#48320 / #48742）、无官方项目/会话导出导入标准（#47196）。高频用户希望 Codex 会话可移植、可归档，并明确区分项目会话和普通聊天。

3. **可配置的 UI 行为** — 禁用随机问候语（#48913）、TUI 音频设备选择（#49437）、TUI 全量重绘支持（#33694）。开发者在追求更克制、更可预期的交互界面。

4. **沙箱与权限模型细化** — 权限提升在活动任务中不生效（#33114）、`--yolo` 沙箱在 app-server 重启后丢失（#49088）、WSL2 挂载兼容性（#47429）、Linux VSCodium 扩展无法及时看到新模型（#47626）。沙箱体验正在成为 Codex 作为 agentic 工具的核心竞争点。

5. **新模型支持与 rollout 公平性** — GPT-6.1 Sol 默认模型切换（0.159.1）、GPT-6 Luna 在 ChatGPT 账户下返回 not supported（#47784）、VSCodium 上模型迟迟不出现（#47626）。社区对模型可用性高度敏感，且 rollout 策略容易引发困惑。


## 开发者关注点

- **Windows 桌面应用启动故障是当前最大痛点**：自 9 月 25 日 26.924 版本以来，多个子版本（1866.0、22138、2738.0 乃至最新 26.928.1915.0）均报告启动 spinner/灰色屏卡死，涉及 MSIX 包、app-server 初始化超时、EPERM rename_staging 等，web 与 CLI 正常但桌面端不可用。受影响用户分布较广（Plus/Pro），即使是老版本用户在升级后也会触发。

- **Windows 沙箱与权限相关的隐藏成本**：`danger-full-access` 模式下 `.sandbox-bin` ACL 无法自愈（#49299）、WSL2 下 `/mnt/wslg/distro` 挂载被沙箱拒绝（#47429）、沙箱设置刷新弹出空白终端（#48120）——沙箱在 Windows 上还不够"静默"和"可靠"。

- **高频 CLI 用户对 UI 噪音容忍度低**：随机问候语和启动动画在低频率使用中无感，但对每天开数百个会话的开发者来说，是切切实实的干扰（#48913，👍 18）。官方在 24 小时内移除该功能，说明团队在倾听核心用户的声音。

- **网络环境与认证边界仍需打磨**：企业网络的 Schannel 证书验证失败导致无限重连（#41275）、ChatGPT 账户在 rollout 期间对 GPT-6 Luna 返回 400（#47784）——Auth 和连接层在面对异构网络时应提供更明确的诊断信息。

- **CLI 基础体验持续完善**：安装脚本在 Windows 10 PS 5.1 崩溃（#19559）、Kitty 终端 palette 切换后 TUI 不重绘（#33694）——老平台和特殊终端的边缘场景虽然不紧急，但代表了 Codex CLI 走向大规模采用需要扫清的积压问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-30

## 今日速览

- **发布新版 nightly**：v0.64.0-nightly 修复了非交互模式下自主计划执行不可用的问题，同时改进了工具输出截断的行为。
- **Subagent 可靠性成焦点**：社区多个高赞 Issue 指出子代理存在“MAX_TURNS 误报为成功”、挂起、忽略配置等问题，直接影响用户信任度。
- **MCP 配置安全受关注**：两个 P1 PR 围绕 MCP 配置损坏处理与 enable/disable 命令失效展开，安全相关修复优先级较高。

## 版本发布

### v0.64.0-nightly.20260930.g38700b4b3
- `fix(core)`: 在非交互模式下启用自主计划执行（PR #29539）
- `fix(core)`: 当 `maxChars <= 0` 时禁用 `formatTruncatedToolOutput` 的截断逻辑（PR by @diegogodinezr）
- 另包含机器人自动生成的 changelog 更新

### v0.63.0-preview.0
- `fix(cli)`: 连接恢复期间显示重试进度指示器，改善网络抖动时的可观察性（PR #29468）
- 包含 v0.61.0-preview.1 的 changelog

### v0.62.0
- `fix(a2a-server)`: tasks metadata 端点对不支持的 store 增加提前返回逻辑（PR #29334）
- 包含 v0.61.0-preview.0 的 changelog

## 社区热点 Issues（Top 10）

### [P1] 🔥 Subagent 在 MAX_TURNS 后误报为 GOAL 成功
**#22323** — 评论 13 | 👍 2
`codebase_investigator` 子代理在达到最大轮次后，自身结果明明显示“未做任何分析”，却向上报告 `status: "success"` 和 `Termination Reason: "GOAL"`。这种“成功撒谎”会让用户基于不完整结果继续工作，是严重的信任问题。长期开放且被维护者锁定，说明仍在复测中。
🔗 https://github.com/google-gemini/gemini-cli/issues/22323

### [P1] 🔥 Generalist agent 无限挂起
**#21409** — 评论 8 | 👍 8
用户在创建文件夹等简单操作时，defer 到 generalist agent 后永久挂起——等待长达一小时后只能手动取消。手动指示模型不使用子代理可绕过该问题。8 个 👍 显示大量用户同受此困扰。
🔗 https://github.com/google-gemini/gemini-cli/issues/21409

### [P2] 零依赖 OS 沙箱：利用模型的 bash 亲和力
**#19873** — 评论 9
Gemini 3 模型天然擅长链式调用 POSIX 工具。本提案希望在保障安全的前提下，让模型以“原生 bash 用户”的方式操作，引入零依赖沙箱与执行后意图路由。社区讨论热烈，涉及架构层面的取舍。
🔗 https://github.com/google-gemini/gemini-cli/issues/19873

### [P2] AST 感知的文件读取、搜索与代码库映射
**#22745** — 评论 7
追踪 AST-aware 工具是否值得引入：可精确读取方法边界、减少 token 噪音、降低因错位读取产生的额外轮次。是提升 agent 效率的重要潜在方向。
🔗 https://github.com/google-gemini/gemini-cli/issues/22745

### [P2] Gemini 不够主动使用自定义 skills 和 sub-agents
**#21968** — 评论 6
即使用户配置了 gradle/git 等 skill，模型在相关场景下仍不会自动调用，只有显式指示后才使用。扩展能力的“最后一公里”问题。
🔗 https://github.com/google-gemini/gemini-cli/issues/21968

### [P2] Browser Agent 忽略 settings.json 中的 maxTurns 等配置
**#22267** — 评论 4
`AgentRegistry` 虽在初始化时正确读取了 settings.json，但 `BrowserAgent` 实际运行时完全忽略这些覆盖值，导致用户无法约束浏览器代理的轮次上限。
🔗 https://github.com/google-gemini/gemini-cli/issues/22267

### [P3] Browser Agent 的自动会话接管与锁恢复
**#22232** — 评论 4
当前 browser agent 遇到配置文件锁时采用“fail-fast”策略，但持久化模式下孤儿进程频繁触发该问题。社区希望实现自动 lock recovery。
🔗 https://github.com/google-gemini/gemini-cli/issues/22232

### [P1] Browser subagent 在 Wayland 下失败
**#21983** — 评论 4
Wayland 环境下浏览器子代理运行失败，直接影响了 Linux 用户的浏览器自动化体验。属于 P1 兼容性 bug，等待复查。
🔗 https://github.com/google-gemini/gemini-cli/issues/21983

### [P2] ~/.gemini/agents 下的 symlink 代理文件不被识别
**#20079** — 评论 4
当 `~/.gemini/agents/filename.md` 是指向其他位置的符号链接时，该文件不会被视为 agent。限制了希望用 dotfiles 管理 agent 配置的用户。
🔗 https://github.com/google-gemini/gemini-cli/issues/20079

### [P3] 用原生文件工具彻底替换 WriteToDo
**#21000** — 评论 4
当前 WriteToDo 依赖 LLM 上下文维护任务列表，存在 context rot、token 成本高、会话间丢失的问题。社区建议改用文件系统 CRUD 做持久化任务跟踪。
🔗 https://github.com/google-gemini/gemini-cli/issues/21000

## 重要 PR 进展（Top 10）

### [P1] 🔧 区分“损坏的 MCP 配置”与“缺失的 MCP 配置”
**#29445** — @lets-order-some-fries
损坏的 `mcp-server-enablement.json` 当前会 fail open：用户已禁用的 MCP 服务器全部被当作启用并暴露工具给模型。下一次 `disable()` 还会覆盖损坏文件。此 PR 让系统能识别损坏状态并安全处理。
🔗 https://github.com/google-gemini/gemini-cli/pull/29445

### [P1] 📎 ChatRecordingService 增量补丁 + 有界历史窗口
**#29568** — @jvargassanchez-dot
将全量 `{ $set: { messages } }` 重写改为 append-only delta 补丁，并限制内存中的消息保留量。对长会话场景的内存和写入开销是显著优化。
🔗 https://github.com/google-gemini/gemini-cli/pull/29568

### [P1] 🐛 修复 @ 符号导致的 CPU 挂起与引号吞噬
**#29557** — @elberthc-byte
非交互模式（`-p` + 管道 stdin）下，代码中的 scoped package（如 `@scope/pkg`）后跟引号字符串会触发 100% CPU 锁死。PR 在修复此问题的同时纳入了对 brace-expansion ReDoS 的防护。
🔗 https://github.com/google-gemini/gemini-cli/pull/29557

### [P2] 🔧 SDK AgentShell 透传 env、timeoutSeconds 与 AbortSignal
**#29447** — @HirthikBalaji
`SdkAgentShell.exec` 之前静默丢弃 `AgentShellOptions` 中的环境变量与超时设置，外部调用者也完全无法用 `AbortSignal` 终止执行。此 PR 补齐了这三项能力。
🔗 https://github.com/google-gemini/gemini-cli/pull/294

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-30

## 今日速览

昨日 Copilot CLI 密集发布了 v1.0.90-2 至 v1.0.90-5 四个补丁版本，主要修复了启动时模型供应器误报、"Failed to read model provider attribution" 提示、以及 MCP 工具调用在服务器持续发送进度更新后无法完成的问题。社区侧，围绕 MCP 服务器兼容性（400 错误、Figma 服务器加载失败）和会话恢复可靠性的讨论最为热烈。此外，社区对发布流程自动化（npm 发布触发）的 PR 也已上线。

## 版本发布

**v1.0.90-5（最新）**
- 修复：配置的模型供应器已提供模型时，不再在启动或模型选择器中显示 "No supported model available" 误报
- 修复：MCP 工具调用在服务器持续发送进度更新后仍能正常完成

**v1.0.90-4**
- 修复：全新启动登录过程中不再打印 "Failed to read model provider attribution" 错误

**v1.0.90-3**
- 新增：`--mcp-github-auth` 参数，将 GitHub 账号授权范围限定到已批准的 MCP 服务器来源
- 新增：路径访问提示支持会话级只读目录批准

**v1.0.90-2**
- 修复与其他变更

## 社区热点 Issues（精选 10 条）

### 1. CLI 频繁遭遇 400 错误 — 代码审查场景几乎不可用
**[#1274](https://github.com/github/copilot-cli/issues/1274)** — `[area:tools]` — 评论 31 | 👍 13

用户反馈最近 20 次左右的 diff 代码审查请求中约 95% 返回 400 错误，无法确定是服务端校验还是 CLI 构造了非法请求。该问题持续近 8 个月仍在活跃讨论，是当前社区反馈最集中的稳定性痛点之一。

### 2. 组织级 Agent 无法在 CLI 中显示
**[#1285](https://github.com/github/copilot-cli/issues/1285)** — `[area:agents, area:enterprise]` — 评论 11 | 👍 14

企业用户在 `{org}/.github-private` 仓库中创建组织级 Agent 后，CLI 和 VS Code 中均无法发现。该问题涉及企业级功能落地，受关注度高。

### 3. Figma 远程 MCP 服务器加载失败
**[#4870](https://github.com/github/copilot-cli/issues/4870)** — 评论 8 | 👍 12

Figma 托管 MCP 服务器在 `server/discover` 阶段返回 `-32601`，CLI 将其视为致命错误而中止工具注册，但 VS Code 中可以正常工作。反映了 CLI 与远程 MCP 服务器在错误处理上的兼容性差异。

### 4. 压缩（Compaction）连续失败 — Opus 4.6 空响应
**[#2861](https://github.com/github/copilot-cli/issues/2861)** — `[area:context-memory, area:models]` — 评论 7 | 👍 5

短会话中手动执行 `/compact` 连续三次收到"模型空响应"错误。上下文压缩是长会话的核心功能，该问题直接影响深度推理场景的可用性。

### 5. 多个 Hooks 输出 `additionalContext` 时仅最后一个生效
**[#3589](https://github.com/github/copilot-cli/issues/3589)** — `[area:context-memory, area:plugins]` — 评论 4 | 👍 2

当多个 `sessionStart`/`subagentStart` hooks 同时向 stdout 输出 `additionalContext` 时，只有最后一个被注入上下文。影响插件生态的复合上下文注入能力。

### 6. `/ask` 在 auto 模型模式下报"模型不支持"
**[#4919](https://github.com/github/copilot-cli/issues/4919)** — 评论 4 | 👍 0

auto 模式下使用 `/ask` 转向时反复出现模型不支持错误。这是 v1.0.86 中引入的回归问题，正在追踪中。

### 7. MCP 工具名含点号导致 400 错误
**[#2581](https://github.com/github/copilot-cli/issues/2581)** — `[area:mcp]` — 评论 3 | 👍 3

MCP 规范允许工具名包含点号，但 Copilot CLI 将带点号的工具名发送给 API 时被 400 拒绝（`String should match pattern '^[a-zA-Z0-9_-]{1,128}$'`）。属于 MCP 规范合规性问题。

### 8. MCP 同时暴露 `content` 与 `structuredContent`
**[#4515](https://github.com/github/copilot-cli/issues/4515)** — `[area:mcp, area:tools]` — 评论 2 | 👍 0

当 MCP 工具结果同时包含 `content` 和 `structuredContent` 时，CLI 将两字段同时加入上下文。按规范应优先使用 structuredContent，避免冗余和潜在的上下文污染。

### 9. 崩溃后残留锁文件导致会话无法恢复
**[#4805](https://github.com/github/copilot-cli/issues/4805)** — `[triage]` — 评论 2 | 👍 0

已保存的会话因崩溃残留的 `inuse.<pid>.lock` 文件而无法重新打开。会话数据本身完好（`events.jsonl` 可正常回放），但运行时锁未正确回收。对长会话工作流影响严重。

### 10. 请求与回复回合高亮与折叠需求
**[#4995](https://github.com/github/copilot-cli/issues/4995)** — `[triage]` — 评论 1 | 👍 0

用户建议改进会话回滚体验：高亮请求/最终回复回合，并支持折叠中间过程，减少超长对话中的定位成本。

## 重要 PR 进展

> 注：过去 24 小时内仅 1 条 PR 有更新。

### [#5000](https://github.com/github/copilot-cli/pull/5000) — 从已发布的 Copilot CLI Release 自动发布 npm 包

**作者**: @devm33 | 创建: 2026-09-29 | 状态: Open

**核心变更**：
- npm 发布流程改为由 GitHub Release 事件触发，替代现有独立发布路径
- 新增显式标签（explicit-tag）用于手动恢复发布
- npm 认证采用 trusted publishing（OIDC），不再使用 npm token
- 内部 feed 与公共发布流程保持分离

**意义**：这是发布工程自动化的重要改进，统一了发布入口，减少了手动操作和 token 泄露风险。

## 功能需求趋势

从近 24 小时更新的 Issues 中，社区关注度最高的功能方向如下：

### 1. MCP 生态兼容性（最高热度）
大量 issue 集中在 MCP 工具的接入体验：远程 MCP 服务器错误处理（#4870）、工具名合规性（#2581）、OAuth 授权流程（#3393）、密钥占位符传递（#4985）、结构化内容规范（#4515）。MCP 已成为 CLI 扩展能力的核心路径，社区对其稳定性和规范一致性有较高期待。

### 2. 会话生命周期管理
包括会话锁文件恢复（#4805）、会话恢复时滚动位置异常（#4894）、会话自动重命名失效（#3365）、按名称而非 ID 检索会话（#2483）。反映出用户对"长会话可靠性"和"会话管理体验"的切实需求。

### 3. 模型与性能行为
模型模式下 `/ask` 不兼容（#4919）、压缩时空响应（#2861）、并行工具调用偶发卡死（#4982），表明多模型支持和推理稳定性仍是核心关注点。

### 4. Agent 与组织级配置发现
组织级 Agent 在 CLI 中不可见（#1285）、monorepo 子目录自定义 Agent 发现（#2245）、"Continue in Copilot CLI" 未正确恢复云端会话（#2497）。企业用户对 Agent 的跨工具/跨目录一致发现机制有明确需求。

### 5. 输入与交互体验
键盘输入不响应与后台认证冲突（#3533）、`CTRL+Z` 导致 CLI 退出（#3693）、会话回滚交互改进（#4995）等，说明终端交互细节（剪贴板、快捷键、滚动）对日常使用体验影响显著。

## 开发者关注点

### 高频痛点
- **400 错误频发**：代码审查等场景下请求被 API 拒绝，严重影响日常使用（#1274）
- **MCP 服务器兼容性参差**：同一服务器在 VS Code 可用、在 CLI 不可用，增加排查成本（#4870）
- **会话不可恢复**：锁文件残留和恢复异常导致长会话丢失，对深度工作流伤害大（#4805、#4894）
- **上下文压缩不可靠**：`/compact` 连续失败迫使长会话手动重建（#2861）
- **键盘输入与快捷键冲突**：尤其在 macOS 上，后台认证弹窗与输入竞争，`CTRL+Z` 误触退出（#3533、#3693）

### 社区期望
- MCP 行为与官方规范严格对齐
- 会话管理更健壮：自动清理残留锁、支持会话名检索
- Agent 发现机制在 monorepo 和企业组织下保持一致
- 发布节奏稳定，同时对回退场景（如自动模型模式）有更完善的保护

---

*数据窗口：2026-09-29 至 2026-09-30 · 来源：[github/copilot-cli](https://github.com/github/copilot-cli)*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-30

## 今日速览

今日无新版本发布，社区活跃度集中在 Issue 讨论与 PR 提交上。最值得关注的是：TUI 偶发 OOM 内存耗尽问题（#51761）仍未定位根因；权限配置（deny shell/read）与免费模型冲突的故障出现两个独立报告（#50627、#51241），影响面较大。PR 侧则有多项实质性进展，包括工具调用 UI 合并展示、跨协议工具名统一重构，以及 OpenRouter 与 Alibaba Chat 的缓存策略修复。

---

## 社区热点 Issues

### 1. TUI 偶发 24-28GB 内存耗尽，OOM 被杀
**#51761** [OPEN] | 评论: 7 | 👍: 1
作者报告 v2 TUI 在没有明确触发条件的情况下，内存以 500MB/s-1GB/s 的速率线性增长（无 GC 锯齿），一分钟内即可耗尽全部内存被 OOM killer 终止。问题间歇性出现，严重影响日常使用。
https://github.com/anomalyco/opencode/issues/51761

### 2. Plan/Build 模式在最新版本中丢失
**#37970** [CLOSED] | 评论: 15 | 👍: 4
用户反馈 1.18.0 桌面版移除了 Plan/Build 选项，导致规划与执行模式行为不一致——有时遵守规划指令，有时直接执行。评论数高居今日榜首，说明该功能对工作流影响较大。
https://github.com/anomalyco/opencode/issues/37970

### 3. 自定义 OpenAI 兼容 Provider 流式工具调用报错
**#26412** [CLOSED] | 评论: 11 | 👍: 5
使用 vLLM 后端 + 自定义 OpenAI 兼容 provider 时，所有工具调用（Read、Edit、Bash 等）立即失败，报 `Expected 'function.name' to be a string`。该问题在 1.14.41 中仍存在，对自托管模型用户影响显著。
https://github.com/anomalyco/opencode/issues/26412

### 4. Windows 下 Expand-Archive 模块自动加载失败
**#24291** [CLOSED] | 评论: 9 | 👍: 6
Bun 编译的 opencode.exe 在 Windows 上调用 `Expand-Archive` 时提示 "module could not be loaded"，影响 `skill`、`glob` 等内部工具。Windows 用户的阻塞性问题，获得较高 👍 数。
https://github.com/anomalyco/opencode/issues/24291

### 5. 权限 deny shell 导致免费模型全部不可用
**#50627** [OPEN] | 评论: 4
自定义 agent 配置 `permissions: [{action: shell, resource: "*", effect: deny}]` 后，所有免费模型请求失败，报错 "OpenCode's free tier can only be used from within OpenCode"，尽管请求确实来自 TUI 内部。
https://github.com/anomalyco/opencode/issues/50627

### 6. 同类问题：deny shell/read 权限同样触发故障
**#51241** [OPEN] | 评论: 3
与 #50627 高度相关。v2.0.16 中，只要 `shell` 或 `read` 权限设置为 deny，免费模型（如 `opencode/big-pickle`）请求就会失败。两个独立报告指向同一根因。
https://github.com/anomalyco/opencode/issues/51241

### 7. 桌面版模型选择器对所有 V2 模型显示 "No reasoning"
**#50257** [OPEN] | 评论: 2 | 👍: 2
模型选择器 tooltip 基于 `model.capabilities.reasoning` 判断，但 V2 模型该字段从未被设置，导致 DeepSeek V4.1 Flash、Kimi K3、GLM 5.3 等支持推理的模型全部错误显示 "No reasoning"。UI 信息准确性缺陷。
https://github.com/anomalyco/opencode/issues/50257

### 8. 上下文窗口硬编码 200k，与实际模型元数据不匹配
**#35863** [CLOSED] | 评论: 3 | 👍: 3
上下文窗口处理依赖静态硬编码值（models.dev 快照），而非动态解析实际 provider 元数据，导致自动压缩、上下文跟踪和溢出检查过早触发。对长上下文模型尤其不公平。
https://github.com/anomalyco/opencode/issues/35863

### 9. 新增顶栏状态面板：会话标题、上下文、成本、MCP/LSP 状态、git 分支
**#25262** [CLOSED] | 评论: 5 | 👍: 3
社区长期呼吁的 UI 增强——将侧边栏中的会话状态信息整合为可切换的顶栏，避免遮挡内容区。引用 #24579、#5419、#15344 等历史相关需求，代表一个持续的 UX 方向。
https://github.com/anomalyco/opencode/issues/25262

### 10. 需在 TUI 中直接查看会话系统消息
**#24990** [CLOSED] | 评论: 3 | 👍: 3
当前无法直接检查系统提示词、环境信息或注入的系统消息，调试 agent 行为时只能靠猜测。该需求与 #33333（/injected-messages 命令）互相呼应，体现开发者对可观测性的迫切需求。
https://github.com/anomalyco/opencode/issues/24990

---

## 重要 PR 进展

### 1. Session UI：相邻读取合并为一行展示
**#52207** [OPEN] | 创建: 2026-09-30
相邻的读取操作现在渲染为逗号分隔的一行（如 `Read index.tsx, main.ts, rpc.ts`），保持时间顺序的同时大幅减少消息列表噪音。Thoughts、shell 等仍会拆分分组。
https://github.com/anomalyco/opencode/pull/52207

### 2. 跨协议统一保留声明的工具名
**#52200** [OPEN] | 创建: 2026-09-30
`@opencode/ai` 的调用方现在在请求、历史、工具事件和 `ToolRuntime.dispatch` 中使用一致的工具名（`{ namespace, name }`），协议层只负责各自的线上格式转换。降低多协议适配的认知负担。
https://github.com/anomalyco/opencode/pull/52200

### 3. 修复 Copilot 多 reasoning_opaque 值导致的 InvalidResponseDataError
**#52190** [CLOSED] | 创建: 2026-09-30
Copilot 模型（Claude Opus 5/5.5、Fable 5.1）在每次工具调用前都会发出一个新的签名 `reasoning_opaque`，单个流式响应中合法携带多个该值，而此前代码只接受一个。修复 #51466 及相关 issue。
https://github.com/anomalyco/opencode/pull/52190

### 4. 限制会话 shell 输出大小，防止上下文爆炸
**#52198** [OPEN] | 创建: 2026-09-30
会话 shell 消息在插入 provider 请求前无大小限制，单次大输出即可撑爆上下文。此 PR 为 shell 输出增加上限，Closes #45099。
https://github.com/anomalyco/opencode/pull/52198

### 5. 阿里云 Chat 路由补发缓存标记
**#52199** [OPEN] | 创建: 2026-09-30
复用共享的 Chat cache-hint lowering 逻辑，修复原生 Alibaba Chat 路由缺失显式缓存标记的问题，帮助用户降低 token 成本。
https://github.com/anomalyco/opencode/pull/52199

### 6. OpenRouter Anthropic/Qwen 请求正确插入缓存断点
**#52110** [CLOSED] | 创建: 2026-09-29
`applyCachePolicy` 在默认缓存策略下跳过了 OpenRouter，导致 Anthropic 和 Qwen 请求只能获得 "cache_control: ephemeral" 注释而非实际可用的缓存断点。已合入 v2。
https://github.com/anomalyco/opencode/pull/52110

### 7. 权限修复：空资源列表不再解析为 allow
**#51664** [OPEN] | 创建: 2026-09-27
`evaluateInput` 在 `resources` 列表为空时，`effects.includes(...)` 会回退到 allow——即一个空资源限制的权限检查实际上放行一切。安全相关的边界修复，Closes #51648。
https://github.com/anomalyco/opencode/pull/51664

### 8. Windows 默认服务端口避开 WSL 与保留端口
**#49909** [OPEN] | 创建: 2026-09-19
当默认端口被 WSL 服务或系统保留端口占用时，Windows 上托管服务无法启动。PR 将默认端口迁移至 WSL 不占用的范围，Closes #48640。
https://github.com/anomalyco/opencode/pull/49909

### 9. 修复命令文件 model 非 `provider/model` 格式时被丢弃
**#52195** [OPEN] | 创建: 2026-09-30
命令 `.md` 文件的 frontmatter 中 model 字段写 `opus`（而非 `provider/model`）时，该命令会被静默丢弃。此 PR 保留此类命令并正常解析，Closes #52065。
https://github.com/anomalyco/opencode/pull/52195

### 10. 模型门控自动批准模式
**#39015** [OPEN] | 创建: 2026-07-26
新增 opt-in TUI 模式：由一个小模型在每次关键操作（执行命令、编辑文件）前审查并批准，安全且已明确授权的操作自动放行。Closes #37564。该 PR 已持续开放两个月，值得关注后续进展。
https://github.com/anomalyco/opencode/pull/39015

---

## 功能需求趋势

从今日 Issue 数据中可以提炼出四个主要方向：

- **会话与上下文可观测性**：多个 issue（#24990、#33333、#35128）要求查看系统提示词、完整消息数组、按时间戳导出用户 prompt。开发者不再满足于黑盒，需要精确了解发给模型的内容来调试行为。
- **权限与审核机制精细化**：一方面社区在尝试通过 deny 规则收紧权限（#50627、#51241），另一方面也在探索自动审批模式（#39015）。但权限配置与免费模型服务之间的冲突说明当前实现存在

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-30）

## 1. 今日速览

昨日 Qwen Code 发布 v0.24.7 正式版及配套 SDK/Desktop 版本，核心修复集中在 Code Mode 文本对齐、权限系统与会话诊断保留。社区讨论热点持续聚焦 **Managed Agent 托管运行时架构**（#12380）与**非对话上下文 token 治理**（#12028）两大主线，同时多个 Runtime Broker 回归问题在近期 commit 后集中暴露，形成了一波修复与反馈潮。

## 2. 版本发布

### v0.24.7（正式版）
- **Features**：`managed-agent` 支持接受绑定工作区但无执行权限的会话（[#12709](https://github.com/QwenLM/qwen-code/pull/12709)）
- **No known breaking changes**

### v0.24.7-nightly.20260929
- **fix(core)**：Code Mode 文本与惰性工具发现对齐（[@tanzhenxin](https://github.com/tanzhenxin)，[#12990](https://github.com/QwenLM/qwen-code/pull/12990)）
- **fix(permissions)**：正确遵循已批准的权限规则（内容截断，详见 release 页）

### sdk-typescript-v0.1.17
- 捆绑 CLI 版本 0.24.7，与 CLI 同源构建

### desktop-v0.24.7
- **fix(serve)**：保留会话创建失败的诊断信息（[#12331](https://github.com/QwenLM/qwen-code/pull/12331)）
- **feat(sdk-java)**：新增托管运行时支持

## 3. 社区热点 Issues（10 个）

### #12380 [OPEN] Managed Agent 双路径架构提案
- **链接**：https://github.com/QwenLM/qwen-code/issues/12380
- **重要性**：当前社区最核心的设计讨论，定义会话持久化所有权、工作区绑定、可恢复工具执行和稳定 WebSocket 通道的分阶段交付路线。
- **社区反应**：37 条评论，讨论密度全场最高，多个后续 issue/PR 均由此衍生。

### #12028 [OPEN] 非对话上下文 token 治理
- **链接**：https://github.com/QwenLM/qwen-code/issues/12028
- **重要性**：系统提示词、工具 schema、QWEN.md、技能列表等非对话内容在每次请求中重复计费，在大上下文模型下开销惊人。这是性能与成本优化的核心追踪项。
- **社区反应**：15 条评论，产生多个子任务（#12326、#12333 等），且仍在持续扩展。

### #13030 [OPEN] Hosted Workspace 增加只读搜索工具
- **链接**：https://github.com/QwenLM/qwen-code/issues/13030
- **重要性**：为托管工作区扩展 `list_directory`、`glob`、`grep_search` 三个只读工具，经 Runtime worker 的 Broker 路径执行，是托管代理能力补全的关键一步。
- **社区反应**：7 条评论，创建当天即有跟进。

### #13016 [OPEN] SDK 中止后 CLI worker 进程残留（P1）
- **链接**：https://github.com/QwenLM/qwen-code/issues/13016
- **重要性**：SDK 通过 stream-json/ACP 启动 CLI 时，进程会自重启为子进程，SIGTERM/SIGKILL 均无法传递到子进程，导致僵尸进程残留。影响所有 SDK 用户，P1 优先级。
- **社区反应**：5 条评论，涉及 supervisor 机制的根本缺陷。

### #12889 [OPEN] 延迟 tool_call schema 允许空参数
- **链接**：https://github.com/QwenLM/qwen-code/issues/12889
- **重要性**：v0.24.6 中延迟工具桥接在工具含必填字段时仍接受空参数，实际场景中 `tool_search` 返回的候选工具无法被正确调用。
- **社区反应**：5 条评论，标记 `ready-for-human`。

### #13059 [CLOSED] Broker 对拒绝的 provider 启动应答 200 prepared 导致客户端永久等待
- **链接**：https://github.com/QwenLM/qwen-code/issues/13059
- **重要性**：由 commit `9cb9dc86e8`（#12868）引入的回归，worker 拒绝分派时 Broker 仍返回 `200 prepared`，调用永远不会启动。该 issue 已在 #13064 中修复。
- **社区反应**：4 条评论，快速闭环，并在 #13060 中发现同类问题。

### #13073 [OPEN] 重试计数器以校验消息文本为键，多调用轮次丢失通过项
- **链接**：https://github.com/QwenLM/qwen-code/issues/13073
- **重要性**：#12970 的跟进项，重试键控机制不健壮，同一条校验消息会被误判为同一错误。今日已有修复 PR #13079。
- **社区反应**：4 条评论，明确拆分两项待办。

### #13068 [OPEN] Ctrl+方向键/Delete 等发送原始 C0 字节而非转义序列
- **链接**：https://github.com/QwenLM/qwen-code/issues/13068
- **重要性**：Shell 模式下 Ctrl+箭头/Delete/Home/End 等组合键将原始控制字节发送到 pty，导致 EOF、光标卡死等异常。影响日常 Shell 交互体验。
- **社区反应**：4 条评论，新提交者 feiiiiii5 的首次反馈。

### #13042 [OPEN] per-Session 索引无界增长
- **链接**：https://github.com/QwenLM/qwen-code/issues/13042
- **重要性**：Managed Runtime provider 路径中 TS/Java 两侧的 `closedSessions` 等索引随会话释放持续增长，进程生命周期内不回收。长期运行的服务端存在内存泄漏风险。
- **社区反应**：4 条评论，由 wenshao 跟进。

### #13031 [CLOSED] SDK Java 集成测试与后台恢复扫描器竞态
- **链接**：https://github.com/QwenLM/qwen-code/issues/13031
- **重要性**：零 Java 变更的 PR 上出现 flaky test，`turn-claim` 测试与后台恢复扫描器存在时序竞争。此类问题影响 CI 可信度。
- **社区反应**：3 条评论，标记 CLOSED。

## 4. 重要 PR 进展（10 个）

### #13079 [OPEN] fix(core): 重试循环计数器改为按工具+错误类别键控
- **链接**：https://github.com/QwenLM/qwen-code/pull/13079
- **内容**：修复 #13073 第一项，`recordBatchRetryableToolError` 不再依赖 `工具名:消息文本` 作为键，避免同类别错误因措辞差异绕过重试上限。

### #13077 [OPEN] fix(cli): 子进程 spawn 失败时输出错误而非静默退出
- **链接**：https://github.com/QwenLM/qwen-code/pull/13077
- **内容**：修复 #13076，CLI launcher 在子进程启动失败时现在打印失败命令和错误码，替代原来的静默 exit 1。

### #13013 [OPEN] test(integration): E2E 测试默认禁用托管自动记忆
- **链接**：https://github.com/QwenLM/qwen-code/pull/13013
- **内容**：`TestRig` 和 `SDKTestHelper` 两个共享 E2E harness 默认写入 `enableManagedAutoMemory: false`，消除测试间记忆状态污染。

### #12894 [OPEN] feat(managed-agent): 持久化远程 Shell 结果投递
- **链接**：https://github.com/QwenLM/qwen-code/pull/12894
- **内容**：实现 O2 远程结果路径：有界 stdout/stderr 发布、不可变对象存储、固定版本范围读取、Session 收据准入、Broker 与 worker 的 Tool v3 路由及 Hosted 恢复。托管代理核心能力之一。

### #12977 [OPEN] feat(sdk-java): 审计式 Hosted Workspace 操作员恢复
- **链接**：https://github.com/QwenLM/qwen-code/pull/12977
- **内容**：新增离线 `workspace-recovery inspect|prepare|complete` 流程，处理部分 Shell 捕获钉住工作区租约的场景，先记录持有者再隔离绑定。

### #13069 [OPEN] fix(runtime-broker): 原 Runtime 无法应答时保持 UNKNOWN 应答
- **链接**：https://github.com/QwenLM/qwen-code/pull/13069
- **内容**：修复 #13060，worker 丢失后 Broker 的 HTTP 观测路由（read/start/cancel）保持 `409 runtime_broker_execution_unknown`，不再泄漏内部错误。

### #12946 [OPEN] feat(managed-agent): 私有 Hosted MCP 运行时（H1）
- **链接**：https://github.com/QwenLM/qwen-code/pull/12946
- **内容**：新增 `hosted-workspace-mcp/1` 私有 profile，Runtime 负责 stdio/Streamable HTTP/SSE 连接与凭据管理，模型侧获得固定工具 schema，走普通持久化工具生命周期。

### #13012 [OPEN] fix(workflow): 提前拒绝动态 import() 和超大批次脚本
- **链接**：https://github.com/QwenLM/qwen-code/pull/13012
- **内容**：工作流脚本编译后解析语法树，在任何分支（含死代码）检测真实 `import()` 表达式则拒绝执行，同时限制批次大小。

### #12901 [OPEN] fix(core): 预校验桥接 tool_call 参数与目标 schema
- **链接**：https://github.com/QwenLM/qwen-code/pull/12901
- **内容**：在解包前对桥接工具参数做必填字段/类型检查，报告错误时附带目标工具名，替代原先未标记的错误。顶层多余键校验见 #12999 的讨论。

### #12561 [OPEN] feat(hooks): 托管记忆变更时通知集成方
- **链接**：https://github.com/QwenLM/qwen-code/pull/12561
- **内容**：托管记忆文档创建/更新/删除及自动记忆开关切换时发出 `MemoryChanged` hook（不携带文件体，hook 失败不回滚磁盘变更）。

## 5. 功能需求趋势

从过去 24 小时 Issue 和 PR 中提取的高频方向：

### 托管运行时与 Managed Agent 架构（第一热点）
- `managed-agent` 相关 issue/PR 占比超过 1/3。社区正围绕双路径架构（#12380）、Stage D 持久化生命周期（#12867）、Hosted Workspace 工具扩展（#13030）、私有 MCP 运行时（#12946）、远程 Shell 结果投递（#12894）密集推进。
- 核心诉求：**会话持久所有权、工作区绑定、可恢复执行、稳定的远程通信信道**。

### 非对话上下文 token 治理（强关注）
- #12028 作为总追踪项，子任务覆盖工具预加载的显式选择（#12326）、CI 基准中的 token 节省/任务成功率对比（#12333）。
- 用户明确希望 **削减系统提示词+工具 schema+QWEN.md 的固定开销**，且需要可量化的收益验证。

### 自动记忆与上下文召回增强
- 无操作提取后的冷却策略（#13004）、自主工具运行期间的事件驱动记忆召回（#13063）、记忆变更通知 hook（#12561）。
- 方向是让记忆系统 **更智能地决定何时提取、何时召回**，而非每轮固定执行。

### 工具调用可靠性
- 延迟工具桥接的空参数绕过（#12889）、声明 schema 与工具自身实现不匹配（#12999）、重试计数器按消息文本键控（#13073）。
- 社区要求**单一的权威参数校验层**，并健壮的处理失败分类。

## 6. 开发者关注点

### Runtime Broker 回归集中爆发
- commit `9cb9dc86e8`（#12868 合并）引入了至少 3 个

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*