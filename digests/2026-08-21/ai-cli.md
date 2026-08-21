# AI CLI 工具社区动态日报 2026-08-21

> 生成时间: 2026-08-21 00:38 UTC | 覆盖工具: 7 个

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

**AI CLI 工具横线对比分析报告（2026-08-21）**

> 本报告基于 `2026-08-21` 前后各主流 AI CLI 工具仓库的自社区动态整理，Claude Code、GitHub Copilot CLI、Qwen Code 当日未提供有效动态，故重点分析 OpenAI Codex、Gemini CLI、Kimi Code CLI、OpenCode。

---

## 1. 生态全景

AI CLI 正从“单点代码助手”向“全流程 Agent 工作台”演进，各工具在 2 个月内密集发布新版本，社区反馈速度和版本加速周期显著变快。但与此同时，**认证稳定性**、**资源泄露**、**跨平台兼容性**和**子代理可靠性**成为普遍痛点，说明产品仍处于“功能增长快于稳定性沉淀”的阶段。插件化、MCP 接入与记忆体系开始成为共同发力点，但尚缺少统一标准。整体来看，AI CLI 工具的竞争已从扩功能转向拼工程成熟度、生态互通和分布式 Agent 管理能力。

---

## 2. 各工具活跃度对比

*注：下表“Issue/PR”为当日官方摘要中精选、列出的条目数，不代表仓库全量数量。*

| 工具 | 精选 Issue ⏱ | 精选 PR ⏱ | Release / 版本动态 |
|---|---|---|---|
| Claude Code | 未提供 | 未提供 | 未提供 |
| OpenAI Codex | 10 | 10 | 发布 rust-v0.149.0，同步多个 0.9.150 alpha，迭代密 |
| Gemini CLI | 2（P1 优先） | 未详细列出 | 发布 v0.56.0-nightly, 更新 v0.57.0-preview Changelog |
| GitHub Copilot CLI | 未提供 | 未提供 | 未提供 |
| Kimi Code CLI | 1 | 1 | 无新 Release |
| OpenCode | 10 | 10 | 发布 v1.18.19 |
| Qwen Code | 未提供 | 未提供 | 未提供 |

> 注：Codex 在当日仅入选的 Issue 和 PR 就已经达到 10+10，且多个 Issue 有 14~28 条评论，社区讨论密度最高；OpenCode 与他齐平，是当日较为活跃的两极。

---

## 3. 共同关注的功能方向

### 1) Agent / 子代理的可靠性与状态一致性

- **OpenAI Codex**：子代理已完成但仍显示 `Active/Working`， Windows 端完成态对话仍“思考中”造成新消息写入等。
- **Gemini CLI**：子代理到了 `MAX_TURNS` 后仍被报告为 `GOAL` 成功，另一条“通用代理卡死”持续热议。
- **OpenCode**：2.0 子代理 `sessionID` 被 schema 强制，导致首次子会话无法创建；权限确认时 Enter 无反应。

> **共**：Agent 状态管理普遍粗糙，独立者已高频，成为企业试用的门槛。

### 高 CPU / 内存泄露 / 会话资源回收

- **Codex**：本地压缩 v2 因 `input_image` 未回收导致无限循环；计算机控制线程消耗至 V8 崩溃。
- **OpenCode**：核心 `structuredClone` 造成内存膨胀，`opencode web` 内存 20 分钟从 127MB 攀升到 4.9GB；CPU 剧烈上升 让用户从 10 个会话退缩到 3 个。

常见代码路径的低效复制、大文本/图片 Part 全量克隆，也是同一赛道内的公共痒点。

### 认证、回话状态与跨平台信任

- **Codex**：macOS/Windows 打开既有会话即失效登录，个人/公司工作区同时受影响；Windows Archive 失败。
- **OpenCode**：Console 模型鉴权错误，PTY WebSocket 认证不足；Terminal 按钮消失、界面状态漂移。
- **Kimi Code**：插件一旦运行，即以当前用户权限触达文件系统和网络，对注入凭据的“安全”集成有高频关注。

### 跨文件/长期记忆与插件安全边界

- **Kimi Code**：唯一明确提出“工作区长期记忆插件”，希望 MCP

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)



---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-21

## 今日速览

昨日发布 rust-v0.149.0 正式版，带来交互式 `codex agents` 仪表板及 TUI 工作目录管理命令，是近期功能迭代较为密集的一个版本。社区侧焦点集中在 **macOS/Windows 会话认证失效**（#39162、#39189）、**Windows 会话无法归档**（# 50、#39161、#39627）等 App 稳定性问题上，多 issue 已引发高达 28 条评论。另外，`Too many requests` 会话访问拦截在桌面端与 Web 端均有复发报告，值得持续关注。

---

## 版本发布

### rust-v0.149.0（正式版）

- 新增交互式 `codex agents` 仪表板，支持搜索、启动、打开、重命名、停止任务，并提供可配置快捷键。
- TUI 会话新增 `/cd`、`/pwd`、`/cwd` 命令，用于管理工作目录。
- 同步发布 rust-v0.150.0-alpha.1、0.149.0 系列多个 Alpha 版本。

🔗 [查看版本详情](https://github.com/openai/codex/releases)

---

## 社区热点 Issues（10）

### 1. [macOS] 打开既有会话导致 ChatGPT 认证失效并跳转登录
**#39162** | 上传 21 👍 | 28 评论
26.814.41407 版本回归，打开既有会话即触发 auth 失效。同为认证问题的还有 Windows 端 #39164。  
🔗 https://github.com/openai/codex/issues/39162

### 2. [Windows] 打开既有对话同时移除个人 Pro 账号（涉及工作区仅配置 401）
**#39164** | 上传 3 👍 | 16 评论
影响 desktop 25H2 + 内部代码核心 0.148.0，认证逻辑对工作区 401 的处理存在 bug。与 #39162 症状并行，双平台齐发。  
🔗 https://github.com/openai/codex/issues/39164

### 3. [macOS] 本地上下文压缩 v2 未回收 input_image 资源负载导致无限循环压缩
**#33493** | 上传 4 👍 | 19 评论
图像密集的长时会话会不断触发自动压缩，影响体验但已有一定解决进展。  
🔗 https://github.com/openai/codex/issues/33493

### 4. [CLI] 配置历史被截断时丢失合法的 Flattened 记录记录并存复用序号
**#35746** | 上传 0 👍 | 14 评论
分页历史中 `RolloutLine` 解码不一致，影响 CLI 日志追溯与会话复原可靠性，社区呼吁优先修复。  
🔗 https://github.com/openai/codex/issues/35746

### 5. [Windows][i18n] 极高“High”与中超推理强度如何翻译均显示为“极高”
**#31963** | 上传 5 👍 | 15 评论
zh-CN 翻译缺少区分度，影响用户对推理强度层的理解。属于 i18n 典型回归。  
🔗 https://github.com/openai/codex/issues/31963

### 6. [Windows] `\\?\` 路径前缀导致无法归档对话
**#39150** | 上传 2 👍 | 8 评论
Windows 扩展路径前缀导致归档操作失败，档案为 `thread/archive` 错误 -32603。  
🔗 https://github.com/openai/codex/issues/39150

### 7. [Windows] 完成态对话仍显示“思考中”，新消息进入本地排队
**#34026** | 更新 08-20 | 11 评论
版本 26.715.x 与 26.723.x 均指向命中，影响桌面端发起新轮次。  
🔗 https://github.com/openai/codex/issues/34026

### 8. [Windows] 完成子代理仍显示为 Active/Working
**#38364** | 更新 08-20 | 11 评论
UI 状态不同步，导致用户误以为任务仍在执行。  
🔗 https://github.com/openai/codex/issues/38364

### 9. [Windows] Could not archive conversation
**#39161** | 上传 14 👍 | 9 评论
与 #39150 同类问题不同触发路径：“Could not archive conversation”且可稳定复现。社区高频重复归档问题。  
🔗 https://github.com/openai/codex/issues/39161

### 10. [macOS] Codex 出现大量自动驾驶级计算线程，直至 V8 崩溃
**#38939** | 更新 08-21 | 4 评论
macOS 端运行 computer-use 时会触发 dispatch thread 耗尽并导致 OOM 崩溃，影响“不可用”级别，用户反馈强烈。  
🔗 https://github.com/openai/codex/issues/38939

---

## 重要 PR 进展

### 1. #39822 保留未封顶的 Guardian 分类器指令
移除了 Guardian v2 对分类器指令的隐式 token 限制，避免策略截断。  
🔗 https://github.com/openai/codex/pull/39822

### 2. #39809 Windows 核心环境中保留 `WINDIR`
将 `WINDIR` 加入 Windows 核心环境变量允许列表，并强化大小写变体用例。  
🔗 https://github.com/openai/codex/pull/39809

### 3. #39804 为 Amazon Bedrock 模型启用 Multi-Agent V1
Bedrock 不支持 V2 所需响应项，通过 model catalog 归一化统一降级为 V1。  
🔗 https://github.com/openai/codex/pull/39804

### 4. #39802 优化不区分大小写的 thread 历史匹配
- 匹配小写偏移映射回原始文本，避免全文扫描，提升查找效率。  
🔗 https://github.com/openai/codex/pull/39802

### 5. #39812 避免为检测存在性而构造 writable-root 详情
优化 sandbox 策略检查，无需构建只读 carveouts 即可判断可写。  
🔗 https://github.com/openai/codex/pull/39812

### 6. #39807 PDF 检测上传携带创建上下文
- 支持 `pdf_c2pa_reservation` 附加上传原始创建请求。  
🔗 https://github.com/openai/codex/pull/39807

### 7. #39795 为 TUI 状态栏增加 hostname 配置
- 新增 `hostname` 状态栏 item，并在 setup 界面中预览。  
🔗 https://github.com/openai/codex/pull/39795

### 8. #39813 延迟 legacy filesystem 策略
- 仅当 cwd 变化且存在可 rebind 策略时才计算 legacy 策略，削减无效计算。  
🔗 https://github.com/openai/codex/pull/39813

### 9. #39791 独立工具输出纳入 external context
- 无 `call_id` 的 `function_call_output` 视为外部上下文，并触发 memory 污染逻辑。  
🔗 https://github.com/openai/codex/pull/39791

### 10. #39785 自定义模型提供商的 turn cost 遥测支持
- 非 OpenAI 提供商通过自身 API 查询用量，排除 Bedrock，保留已有 OpenAI key 路径。  
🔗 https://github.com/openai/codex/pull/39785

---

## 功能需求趋势

### 1. 跨平台认证稳定性
- 桌面端（macOS + Windows）会话打开即失效，为最普遍痛点，横跨 `auth`、`session` 标签。

### 2. 历史记录与归档可靠性
- 归档失败（Windows）、合法历史损坏或重建（CLI）形成双线，社区强调数据可迁移、可恢复性。

### 3. 远程 / 移动端连接与状态同步
- Android Remote 已出现“无法启动回合”的远程卡死问题；Windows Remote 在更新后频繁失去连接，需要重新注册。

### 4. 质量工具链：
- 快速出现的 `agent` 面板、`codex` 命令（CLI）、可配置 TUI 状态栏；但仍有大量“状态不变”、“异步状态漂移”等细节问题。

### 5. 成本与使用量约束
- 新增子代理模型“固定上下文开销”令用户担心总用量反而更高（#100cm子代理），社区开始关注 **成本可观测/控制**。

---

## 开发者关注点

- **认证 / 登录状态脆弱**：个人账号、工作区账号在打开会话时都可能丢失登录态，涉及代理、401 响应、workspace 分级等，影响信任度。
- **Windows 端历史 bug 高度集中**：以 `\\?\` 路径、桌面更新后远程失效、线程状态停滞为三大焦点，映射至 Windows 独特路径处理及沙箱兼容性。
- **高负载崩溃 / 资源泄漏**：本地压缩 v2 镜像调用大量 OOM、桌面端 computer-use 所触发的线程爆炸，属用户“致命级”痛点，但反馈占比仍少。
- **语言本地化准确性**：zh-CN 推理难度翻译模式成为每周高频 issue 之一，翻译质量问题不容忽视。
- **更新引入回归**：多起问题都标注“上一次良好版本”并使用回滚作为验证手段，用户希望新一代发布前更充分验证回归。

---

> 以上要点基于 GitHub 2026-08-20 至 2026-08-21 间更新数据提炼，适用于技术开发者快速获取外部关键动态。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-08-21

## 1. 今日速览

- 昨日发布 `v0.56.0-nightly.20260820`，修复了带工具/媒体消息中空文本 turns 被丢弃的问题，并抢先更新了 `v0.57.0-preview.0` 的 Changelog。
- 社区讨论热度集中在 Agent 可靠性：子代理达到 `MAX_TURNS` 后仍被报告为 `GOAL` 成功（#22323）以及通用代理卡死（#21409）两条 P1 Issue 持续保持最高关注。
- 安全与平台加固成为 PR 主旋律：`GIT_CONFIG_*`

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>



</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-21）

> 数据窗口：2026-08-20 至 2026-08-21 | 仓库：github.com/MoonshotAI/kimi-cli

## 1. 今日速览

今日无新版本发布，社区动态集中在 2 个信号上：**工作区级长期记忆插件提案**（#2613）与**插件安全及持久化文档 PR**（#2614）。虽然条目量不大，但都指向“插件化 + 长期记忆 + 安全边界”这组核心主题，值得插件开发与 CLI 重度用户关注。

## 2. 版本发布

今日无新 Release。

## 3. 社区热点 Issues

> 本次统计窗口内仅捕获到 1 条 Issue，未能达到“10 个精选”的规模；以下为当前最值得关注的条目。

### #2613 [enhancement] Kimi Memory Plus — 工作区范围的长期记忆插件
- **作者**：@QIANLING-0831
- **创建/更新**：2026-08-20
- **评论 / 👍**：0 / 0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2613

该提案希望为 Kimi Code CLI 增加**工作区级长期记忆插件**，本质上是将记忆范围从单次会话扩展到工作区维度。提案中提到的兼容性更新强调：当前 CLI 可把显式记忆工具注册为 stdio MCP server，但还无法识别该仓库实验性 `kim...` 相关记忆策略（原文截断）。

**为什么值得关注：**
- “长期记忆”是 CLI 编码助手的关键短板，直接关系到跨会话的项目上下文、重构后一致性等痛点。
- 走 MCP + 插件化的方案低成本融入现有架构，很可能会成为同期生态讨论的典型议题。
- 目前评论还为 0，属于早期征集阶段，现在是参与设计、给出协议建议的窗口期。

## 4. 重要 PR 进展

同样，截至统计窗口，取到 1 条 PR。

### #2614 [OPEN] docs(plugins): document security and persistent data
- **作者**：@QIANLING-0831
- **更新**：2026-08-20
- **链接**：[https://github.com/MoonshotAI/kimi-cli/pull/2614](https://github.com/MoonshotAI/kimi-cli/pull/2614)
- **摘要**：
  - 补充说明：插件工具作为**本地子进程**运行，拥有当前用户级别的文件与网络访问权限；
  - 记录了 `inject` 凭据处理方式，并警告不要将注入值写入日志或提交到仓库；
  - 澄清重装插件会**替换已安装目录**。

**为什么值得关注：**
- 直接回应了插件安全边界：CLI 插件与 IDE 插件不同，天然可触达用户文件系统和网络，文档标准化安全非常必要。
- 对“inject 凭据不能进日志/能提交”这一要求，几乎是所有实操过密钥注入场景都会踩到的，当安全基线修补。

## 5. 功能需求趋势

基于当前动态（这段段时间的 issue/PR），community 关注度偏好也偏向几个方向：

- **长期记忆**：语义可以从 `workspace-scoped long-term memory` 看出，开发希望 CLI 能“记住项目决策/编码偏好/架构约束”，而非每次对话机械复述。
- **MCP 生态接入**：提案明确倾向于通过 `stdio MCP server` 接入记忆工具，说明社区很重视 Kimi CLI 与 MCP 生态的互操作能力。
- **插件安全与数据生命周期**：PR 中反复围绕权限边界、敏感信息、持久化目录，可见 Community 不把插件只当“功能增强”，而是开始以生产环境标准要求插件机制。
- **文档规范化**：持续出现“docs(plugins)”这类对文档质量、一致性、安全说明的要求——这通常意味着插件 API 正在进入稳定化前的补课阶段。

## 6. 开发者关注点

- **上下文连续性**：开发者反复诉求“不要让我重复描述项目背景”，期望能有多少个工作区记忆来减少重复劳动与 token 消耗。
- **导入插件安全性**：插件子进程获得的是本地用户完整文件/网络权限，开发者关注运行时隔离、权限提示与敏感数据脱敏。
- **凭据管理**：`inject` 的值容易被日志/提交面操作，需要更好的默认保护与来自官方的最佳实践文档。
- **插件重装/升级体验**：重装会替换整个安装目录，相关内容可能丢失，社区需要更清晰的持久化数据（path）管理方案。

> 注：当日数据窗格较窄，Issue/PR 精选数量不足 10 条，后续日报将积累至更多条目时恢复完整精选清单。所有内容均可在 GitHub Ribrary 中自查核实。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-08-21**

## 今日速览

- OpenCode v1.18.19 发布，主要补强了 Cloudflare AI Gateway、OpenAI/Anthropic 原生透传，并移除了 Qwen 内置采样默认值。
- 性能问题成为今日社区最热焦点：`#30086` 高 CPU 占用获得 47 条评论，`#35107` 内存泄漏对应的修复 PR `#43733` 已提交。
- OpenCode 2.0 的子代理（subagent）流程、TUI 崩溃问题集中爆发，`#43619` 被标记为阻断核心工作流。

## 版本发布

### v1.18.19
- **改进**：
  - 为 Cloudflare AI Gateway 模型增加原生 OpenAI / Anthropic passthrough 支持。
  - Codex 速率限制更贴近 ChatGPT 订阅体系。
- **Bugfixes**：
  - 移除了内置 Qwen 采样默认值，避免向模型发送不支持的参数。
  - 另有若干底层修复，发布说明暂未展示完全。

查看完整内容：[v1.18.19 Release](https://github.com/anomalyco/opencode/releases/tag/v1.18.19)

---

## 社区热点 Issues

1. **#30086：新版本 CPU 占用出现剧烈上升**
   @DenisSilent 反馈升级后从同时 10 个会话变为 3 个就卡顿，严重时鼠标光标拖慢。47 条评论、24 个 👍，说明影响范围较大。
   [GitHub](https://github.com/anomalyco/opencode/issues/30086)

2. **#43619：2.0 subagent 强制要求 sessionID，导致首次子会话无法创建**
   文档说新建会话应省略 `sessionID`，但工具 schema 却强制必填，直接阻断编码代理工作流。该 issue 已标记为 2.0 关键问题。
   [GitHub](https://github.com/anomalyco/opencode/issues/43619)

3. **#4754：Linux 下复制粘贴行为不符合习惯（CLOSED）**
   关于 Linux 中键粘贴与系统剪贴板缓冲区冲突的经典问题，仍保持 17 条评论、18 个 👍，说明 Linux 用户期望更完善的终端交互。
   [GitHub](https://github.com/anomalyco/opencode/issues/4754)

4. **#30158：Web UI 的 Terminal 按钮在 v1.15.12 起神秘消失**
   12 条评论、14 个 👍，降级到 v1.15.11 后按钮恢复，疑似 UI 回归问题。
   [GitHub](https://github.com/anomalyco/opencode/issues/30158)

5. **#20458：TUI 退出后鼠标转义序列被打印成乱码**
   退出后终端残留类似 `35;89;19M` 的鼠标协议输出，影响使用者终端后续操作，属于比较常见的退出清理问题。
   [GitHub](https://github.com/anomalyco/opencode/issues/20458)

6. **#27875：子代理权限申请时 Enter 键无法确认**
   当子代理循环请求权限时，Enter 没有反应，导致用户卡在权限确认阶段；也与 2.0 子代理权限模型改动相关。
   [GitHub](https://github.com/anomalyco/opencode/issues/27875)

7. **#35107：会话内存持续增长直到 bun 进程被杀**
   用户定位到 `updatePart` 对每个 Part 做 `structuredClone`，文本 Part 最大可达 488KB，200 个会话 93K 次事件造成严重堆压力。已被选为官方内存修复靶点。
   [GitHub](https://github.com/anomalyco/opencode/issues/35107)

8. **#42657：多子代理会话下 TUI 卡顿，渲染线程 97% CPU**
   2-4 个子代理并发时输入延迟 1-3 秒，Warp、Windows Terminal、WezTerm 均复现；开发和反馈集中在 TUI 渲染路径。
   [GitHub](https://github.com/anomalyco/opencode/issues/42657)

9. **#43054：只有 `hy3-free` / `deepseek flash free` 能正常使用**
   使用其他模型均报 `Forbidden: {"model":"big-pickle"}`，疑似控制台侧模型白名单错误，影响用户自定义模型选择。
   [GitHub](https://github.com/anomalyco/opencode/issues/43054)

10. **#20437（原 34374）：opencode web 服务器存在严重内存泄漏**
    `opencode web` 在约 20 分钟内从 127MB 涨到 4.9GB，最终系统无响应；社区已在等 V2 或新架构中的 AI SDK 清理机制。
   [GitHub](https://github.com/anomalyco/opencode/issues/34574)

---

## 重要 PR 进展

1. **#43733：`fix(core): avoid deep cloning session parts`**
   直接修复 #35107 内存泄漏根因：不再每次全量深拷贝 text、reasoning、tool output，将大幅降低 Part 更新时的 heap 压力。
   [GitHub](https://github.com/anomalyco/opencode/pull/43733)

2. **#43738：提升 Desktop 冷启动 Home 导航速度**
   修复桌面应用首次进入 Home 页比热切换慢 7-8 倍的问题，主要靠 Home 查询缓存预热。
   [GitHub](https://github.com/anomalyco/opencode/pull/43738)

3. **#43735：PTY Websocket 连接增加鉴权**
   终端 WebSocket 改为一次性 ticket 认证，禁止未认证 raw-fetch 访问，提升桌面终端安全性。
   [GitHub](https://github.com/anomalyco/opencode/pull/43735)

4. **#43715：保留 Cerebras 的 completion limit 语义**
   避免同时发送 `max_tokens` 与 `max_completion_tokens`，修复 Cerebras 拒绝请求的问题。
   [GitHub](https://github.com/anomalyco/opencode/pull/43715)

5. **#43677：OpenCode Console 的 Anthropic 请求补全 API Key 头**
   将 Console Bearer 凭据翻译为 `x-api-key`，修复 Anthropic Messages 协议下 Console 模型鉴权失败的问题。
   [GitHub](https://github.com/anomalyco/opencode/pull/43677)

6. **#43675：非交互运行模式中正确响应 subagent 权限**
   只对当前 run 会话树自动批准/拒绝权限申请，避免系统在无人值守模式下卡死或误放行。
   [GitHub](https://github.com/anomalyco/opencode/pull/43675)

7. **#43681：为 V2 修复 Bedrock AWS profile 凭据加载**
   来自 Amazon 团队的开发者贡献，解决了 V2 分支使用 Bedrock 时 AWS Profile 凭据无法解析的问题。
   [GitHub](https://github.com/anomalyco/opencode/pull/43681)

8. **#43650：修复 shell 淘汰循环**
   清理退出顺序队列中的“幽灵 shell ID”，避免淘汰逻辑无限循环，属于 shell/session 管理的稳定性修复。
   [GitHub](https://github.com/anomalyco/opencode/pull/43650)

9. **#43718：向插件开放 `session.switchAgent` / `session.switchModel`**
   让 Effect/Promise 插件能够动态切换模型和 Agent，为上层工作流集成提供官方 API。
   [GitHub](https://github.com/anomalyco/opencode/pull/43718)

10. **#40125：per-MCP-server 信任配置**
    允许按 MCP server 单独配置 CA 文件或指纹固定，弥合关闭全局验证与安全性之间的鸿沟。
   [GitHub](https://github.com/anomalyco/opencode/pull/40125)

---

## 功能需求趋势

- **性能与资源占用是当前第一

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>



</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*