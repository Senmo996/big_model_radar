# AI CLI 工具社区动态日报 2026-09-22

> 生成时间: 2026-09-22 02:18 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-22）

## 1. 生态全景

当前 AI CLI 工具生态呈现**头部厂商加速迭代、社区诉求高度趋同**的态势。OpenAI Codex 以单日 7 个 Rust alpha 版本领跑迭代速度，GitHub Copilot CLI 连发 3 版，Gemini CLI、Qwen Code、OpenCode 保持稳定更新；而 Kimi CLI 正式宣布停止维护并迁移至原生二进制架构，显示工具生命周期更迭明显加快。跨工具社区反馈的核心痛点高度一致：**沙箱/容器稳定性、配额与成本透明度、MCP 集成可靠性、长会话资源管理**四大问题几乎出现在每个工具的热点列表中。整体来看，工具的功能竞争已从"模型能力"转向"工程化成熟度"。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 活跃 PR | Release 情况 | 迭代信号 |
|------|-------------|---------|--------------|----------|
| Claude Code | 10 | 2（1 关闭） | 无新版本 | 低频率，Issue 积压严重 |
| OpenAI Codex | 10 | 10 | 7 个 Rust alpha | 极高频率，功能快速合入 |
| Gemini CLI | 10 | 10

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-22）

## 1. 热门 Skills 排行

以下 8 个 PR 为当前社区讨论热度最高的 Skills 相关变更，**均处于 Open 状态**：

1. **fix(skill-creator): 隔离触发评测并处理 Windows 与运行时失败**  
   #1298 针对 `skill-creator` 的触发评测误报问题，修复了多 worker 探针竞争、`select()` 在 Windows 管道上的失败、以及运行时错误被误判为“非触发”的缺陷，提升跨平台评测可靠性。  
   [查看 PR](https://github.com/anthropics/skills/pull/1298)

2. **feat: 新增 proofcore-contract-auditor（智能合约审计）**  
   #1771 为 Web3 开发者提供 Solidity / Rust 合约静态分析，并将审计证明锚定至 TON 区块链，依托零存储 Merkle 协议。讨论热点集中在智能合约安全审计与区块链验证的集成方式。  
   [查看 PR](https://github.com/anthropics/skills/pull/1771)

3. **fix(mcp-builder): 支持 mcp>=2 的 streamable_http_client 导入及自定义 headers**  
   #1742 解决 MCP SDK 升级后 `streamablehttp_client` 改名、以及自定义 header 配置方式变更导致的兼容问题，属于工具链依赖适配的关键修复。  
   [查看 PR](https://github.com/anthropics/skills/pull/1742)

4. **feat: 新增 md2video-audio（Markdown 转视频）**  
   #1703 提供零成本技能：将 Markdown 文档经 Marp 转成幻灯片，并合成真人级语音，生成 MP4 视频。社区关注 AI 内容从文档到视频的一体化生产链路。  
   [查看 PR](https://github.com/anthropics/skills/pull/1703)

5. **feat: 检测 DOCX 中的孤立评论**  
   #1734 聚焦文档协作场景中 `orphaned docx comments` 的检测，提升 Word 文档自动化处理的数据完整性。  
   [查看 PR](https://github.com/anthropics/skills/pull/1734)

6. **feat: 新增 Pyxel 复古游戏开发技能**  
   #525 引入 Pyxel 专用技能，支持确定性无头运行、逐帧检查与任务状态验证，引导 Agent 完成完整 Python 游戏开发循环。社区兴趣集中在游戏开发与自动化调试的结合。  
   [查看 PR](https://github.com/anthropics/skills/pull/525)

7. **feat: 新增 document-typography（文档排版质量）**  
   #514 针对 AI 生成文档中的常见排版问题：孤立词换行、寡行段落（widow）、编号错位，提供类型质量控制，以减小用户对排版细节的修改成本。  
   [查看 PR](https://github.com/anthropics/skills/pull/514)

8. **feat: 新增 scnet-hpc（HPC 集群操作）**  
   #1615 通过 profile 化 SSH 与 Slurm 工作流，覆盖分区、内存、模块、加速器等 HPC 集群管理场景，是面向科学计算基础设施的专项技能。  
   [查看 PR](https://github.com/anthropics/skills/pull/1615)

---

## 2. 社区需求趋势

从 Issues 看，社区最集中的需求可分为四个方向：

- **安全与信任边界**  
  #492 指出社区技能被放在 `anthropic/` 命名空间下发布，造成“官方技能”的误导并扩大权限授予风险；#1175 则关注在 SKILL.md 中直接编写 SharePoint 访问控制逻辑的安全隐患。社区对技能供应链安全和权限模型设计高度警惕。  
  [Issue #492](https://github.com/anthropics/skills/issues/492) · [Issue #1175](https://github.com/anthropics/skills/issues/1175)

- **技能的分发与管理**  
  #228 要求组织级技能共享能力，避免手动下载 `.skill` 文件再通过即时通讯传递；#189 反映 `document-skills` 与 `example-skills` 插件包含重复内容导致上下文浪费；#62 则是技能文件丢失问题的反馈。组织级共享与去重是显著诉求。  
  [Issue #228](https://github.com/anthropics/skills/issues/228) · [Issue #189](https://github.com/anthropics/skills/issues/189) · [Issue #62](https://github.com/anthropics/skills/issues/62)

- **工具链可靠性与上下文效率**  
  #556 报告 `run_eval.py` 触发率为 0%，所有查询均无法触发技能；#1390 显示 `mcp-builder` 评估脚本对真实 MCP server 始终 0/N；#1487 指出 `claude-api` 技能单次注入约 156k tokens，直接挤爆上下文窗口；#1362 则是 `web-artifacts-builder` 在 pnpm ≥10.1 下构建失败。官方脚本的稳定性、跨平台兼容性和资源占用成为社区首要痛点。  
  [Issue #556](https://github.com/anthropics/skills/issues/556) · [Issue #1390](https://github.com/anthropics/skills/issues/1390) · [Issue #1487](https://github.com/anthropics/skills/issues/1487) · [Issue #1362](https://github.com/anthropics/skills/issues/1362)

- **新技能方向探索**  
  社区持续提出面向 Agent 自身能力的新技能：`compact-memory`（符号化压缩长时记忆，节省上下文）（#1329）、`agent-governance`（Agent 治理/安全模式）（#412）、以及“推理质量门控流水线”（预校准→对抗审查→交付验证）（#1385）。垂直领域与元技能

---

# Claude Code 社区动态日报 2026-09-22

## 今日速览

过去 24 小时无新版本发布，但社区围绕**AGENTS.md 长期未获官方回应**的情绪集中爆发（#31005，379 👍）；与此同时，**Windows Cowork 与沙箱稳定性问题**成为今日绝对主角，多条高热度 Bug 指向同一个结论：Windows 平台的 Cowork/沙箱体验仍不成熟。

## 社区热点 Issues（10 条）

### 1. #31005 [已关闭] 对 AGENTS.md 与 .agents/skills/ 的支持：社区自 2025 年 8 月请求至今，官方零回应
- 作者：@kvnwolf | 更新：2026-09-22 | 评论 29 | 👍 379
- 这是当前社区积怨最深的 Feature Request。用户多次提交该请求，但官方从未给出任何响应，最终被以「重复」关闭。该 Issue 已成为社区对 Claude Code 路线图透明度的不满情绪的集火点。
- 链接：https://github.com/anthropics/claude-code/issues/31005

### 2. #45297 [开放] [Bug] Windows 下 Cowork 文件夹不支持 UNC 路径
- 作者：@mrsilva | 更新：2026-09-22 | 评论 29 | 👍 30
- 企业用户通过 `\\server\share` 映射网络驱动器是 Windows 开发的常见场景，Cowork 目前完全不支持。29 条评论说明受影响的用户群不小，且长期未获修复。
- 链接：https://github.com/anthropics/claude-code/issues/45297

### 3. #87500 [已关闭] [Bug] 持续 5 小时的 API 连接中断（ECONNRESET）
- 作者：@iampandiyan | 更新：2026-09-22 | 评论 14
- 用户报告连续 5 小时所有请求报 `Connection dropped (ECONNRESET)`，附带了详细的调试信息。这类阻塞性问题会直接影响所有使用 Cloud API 的开发者。
- 链接：https://github.com/anthropics/claude-code/issues/87500

### 4. #73468 [已关闭] [Bug] macOS 沙箱不可用：内联 Seatbelt 配置在大量 git worktree 下超出 ARG_MAX
- 作者：@ehsan | 更新：2026-09-22 | 评论 11 | 👍 6
- 在拥有多个 git worktree 的仓库中，所有沙箱化 Bash 命令（甚至 `printf ok`）都会因 `E2BIG: argument list too long` 失败。单条命令的沙箱参数直接突破了 macOS 的进程参数上限，属于设计缺陷而非边缘 case。
- 链接：https://github.com/anthropics/claude-code/issues/73468

### 5. #66269 [已关闭] [Bug] 复制终端输出时 CJK 文本产生乱码（no-flicker/fullscreen 渲染器是元凶）
- 作者：@reggiechan74 | 更新：2026-09-22 | 评论 9
- 默认的 `fullscreen` TUI 渲染模式下，从终端复制中文内容到剪贴板会得到 mojibake，而切换 `"tui": "default"` 后恢复正常。中文开发者经常需要复制代码和文档，该 Bug 直接影响日常可用性。
- 链接：https://github.com/anthropics/claude-code/issues/66269

### 6. #79305 [开放] [Feature] 桌面应用支持自定义主题/强调色（对齐 CLI 主题系统）
- 作者：@stanleyconstant | 更新：2026-09-21 | 评论 9 | 👍 19
- 用户希望桌面应用支持与 CLI 一致的自定义主题，理由是多个深色模式应用混排时无法快速凭窗口颜色区分 Claude Desktop。这属于「桌面应用向 CLI 功能看齐」的典型诉求。
- 链接：https://github.com/anthropics/claude-code/issues/79305

### 7. #93071 [开放] [Bug] Cowork 在 Windows 10 22H2 x64 下 `sandbox-helper: no Plan9 drive shares mounted`
- 作者：@hector751 | 更新：2026-09-22 | 评论 7
- 设备上的 `device_bash` 自 2026-09-08 起完全失效，重启应用、更新应用都无法恢复。Plan9 驱动器共享是 WSL2 与 Windows 之间文件互通的底层机制，该报错说明沙箱与宿主机的 I/O 桥接彻底断裂。
- 链接：https://github.com/anthropics/claude-code/issues/93071

### 8. #79174 [已关闭] [Bug] MCP elicitation 能力声明但请求被自动拒绝（VSCode 交互式会话）
- 作者：@hjmurmur | 更新：2026-09-22 | 评论 7 | 👍 3
- 在 VSCode 扩展会话中，Claude Code 在 `initialize` 阶段声明支持 MCP `elicitation`，但每次 `elicitation/create` 请求都被静默拒绝，且不显示任何 UI。权限提示和 `AskUserQuestion` 却可以正常渲染——说明能力声明与实际权限路由不一致。
- 链接：https://github.com/anthropics/claude-code/issues/79174

### 9. #94198 [开放] [Bug] CoworkVMService 非分页池内存泄漏（ntfs.sys）
- 作者：@RocastroM | 更新：2026-09-22 | 评论 6
- 用户报告 `CoworkVMService` 导致 Windows 非分页池内存持续增长（NTFS 驱动层泄漏），**重启可清除，关机不行**。这是一个可以拖垮整个操作系统的内核级问题，所有使用 Cowork 的 Windows 用户都可能受影响。
- 链接：https://github.com/anthropics/claude-code/issues/94198

### 10. #73770 [开放] [Feature] 状态栏暴露 Opus/Sonnet/Fable 各模型的周速率限制
- 作者：@gnutix | 更新：2026-09-21 | 评论 6 | 👍 18
- 用户希望自定义状态栏的 stdin JSON 中包含 `/status` 里的完整速率限制数据，目前只能拿到两项。配合成本控制的大趋势，这是「把云资源配额可视化到编辑器里」的直接诉求。
- 链接：https://github.com/anthropics/claude-code/issues/73770

**其他值得关注：** #95313（生成昂贵 agent 前要求用户确认，成本控制诉求）、#93071 与 #94432 能互相印证 Windows 更新链路的问题，#94432 更有趣——作者当天自我纠正了标题，承认 `CoworkVMService` 并非元凶，真正问题是 #89912 中的 MSIX 容器创建失败 `0x80070020`。

## 重要 PR 进展

今日更新 PR 共 2 条，均非功能性大改：

1. **#95932 [已关闭]** claude.ai 增加 GitHub 连接问题的 Issue 模板 — 作者：@dicks

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-22

## 今日速览

今日 Codex 仓库发布 7 个 Rust alpha 版本，迭代节奏明显加快；社区讨论热度集中在配额/限流异常（#41220 达 51 评论）与 Windows 桌面版稳定性问题。功能需求方面，关闭 TUI“星空”特效（#44561）与仓库级插件配置（#18115）获得了高赞支持，显示用户对界面克制与配置可移植性的强烈诉求。

---

## 版本发布

过去 24 小时共发布 7 个版本，均为 Rust alpha 通道，未附带详细变更说明：

- [rust-v0.157.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.3)（0.157.0-alpha.3）
- [rust-v0.157.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.2)（0.157.0-alpha.2）
- [rust-v0.157.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.1)（0.157.0-alpha.1）
- [rust-v0.156.0-alpha.17](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.17)（0.156.0-alpha.17）
- [rust-v0.156.0-alpha.16](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.16)（0.156.0-alpha.16）
- [rust-v0.156.0-alpha.14](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.14)（0.156.0-alpha.14）
- [rust-v0.155.0-alpha.16.1](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.16.1)（0.155.0-alpha.16.1）

**观察**：v0.157.0 系列从 alpha.1 快速推进到 alpha.3，叠加昨日 v0.156.0 系列的三个补丁版本，说明主分支正在高频合入功能与修复，建议关注 0.157 正式版的发布说明。

---

## 社区热点 Issues（10 个）

### 1. [Meta] Codex 用量异常/配额消耗不一致 — 跨报告追踪器
**#41220** · 评论 51 · 👍 17 · [链接](https://github.com/openai/codex/issues/41220)

大量用户报告订阅配额或预付费点数消耗速度远超基线，有时在设置未变的情况下出现突变。该 Issue 已被社区自发作为聚合追踪帖，是当前最受关注的限流/计费问题。

### 2. 关闭 TUI 的 whimsy 特效（Astra 星空）应设为默认
**#44561** · 评论 26 · 👍 69 · [链接](https://github.com/openai/codex/issues/44561)

用户要求 `[tui] whimsy = false` 成为默认配置，认为 Astra 的星空动画“看起来像屏幕故障”。69 个 👍 是今日数据中最高的社区认可度，反映用户对 TUI 克制设计的偏好。

### 3. Codex 会话日志膨胀至 700MB–2GB
**#24948** · 评论 32 · 👍 4 · [链接](https://github.com/openai/codex/issues/24948)

CLI 0.118.0 中，重复的压缩历史和原始工具输出导致 session 日志异常增大，严重影响磁盘占用与恢复性能。该问题已持续近 4 个月仍处于打开状态，社区持续关注。

### 4. GPT-6 Astra 两轮对话耗尽 Plus 5 小时配额
**#42987** · 评论 26 · 👍 15 · [链接](https://github.com/openai/codex/issues/42987)

Windows 用户反馈 GPT-6 Astra（Medium 推理强度）在极短的两次会话中消耗了全部 5 小时 Codex 配额。与 #41220 同属“配额快速耗尽”症状群。

### 5. Windows 桌面版：首轮回复后无法发送后续消息
**#45626** · 评论 20 · 👍 3 · [链接](https://github.com/openai/codex/issues/45626)

Codex Desktop 26.908.70816 在完成第一轮对话后，Send 按钮持续置灰，所有会话（新/旧）均受影响，而 CLI 正常。属于影响日常使用的严重功能缺陷。

### 6. 仓库级 marketplace 与插件配置支持
**#18115** · 评论 16 · 👍 67 · [链接](https://github.com/openai/codex/issues/18115)

用户希望插件相关配置能从 user-scoped 扩展为 project-scoped，使仓库可通过 `.codex/config.toml` 声明本地 marketplace 与插件。67 个 👍 显示了团队协作场景中的强烈需求。

### 7. Windows 沙箱初始化失败：`requires effective :root read access`
**#46114** · 评论 10 · 👍 3 · [链接](https://github.com/openai/codex/issues/46114)

ChatGPT Desktop 更新后，所有线程（新/旧）均因沙箱 helper 无法获得根目录读取权限而启动失败，提权、重装、重置均无效。Windows 沙箱稳定性已成为高频痛点。

### 8. GPT-5.6 Sol 上下文窗口因 originator 头而不同
**#40258** · 评论 8 · 👍 0 · [链接](https://github.com/openai/codex/issues/40258)（已关闭）

同一 Pro 账户下，`/backend-api/codex/models` 接口仅因 `originator` 请求头不同，返回 272K 与 872K 两种上下文窗口配置。该问题虽已关闭，但引发了关于模型能力不一致的讨论。

### 9. 上下文压缩会永久破坏会话记录
**#44363** · 评论 7 · 👍 0 · [链接](https://github.com/openai/codex/issues/44363)

Codex App 26.903.61454 中，上下文压缩会原地重写存储的 rollout，导致原始对话记录永久丢失。这是数据安全层面的严重隐患。

### 10. `codex resume` 对超大会话 JSONL 触发 OOM
**#28866** · 评论 5 · 👍 1 · [链接](https://github.com/openai/codex/issues/28866)

在大型本地 session JSONL 上执行 `codex resume` 需要极高瞬时内存/swap，可能触发 OOM/SIGKILL。与 #30932（19.1 GiB JSONL 导致 macOS 内存耗尽）为同一类性能问题。

---

## 重要 PR 进展（10 个）

### 1. 恢复线程后忽略过期的线程关闭通知
**#47155** · [链接](https://github.com/openai/codex/pull/47155)

旧运行时排队的 close 通知可能在同线程恢复后到达，导致 TUI 被错误退出或切换显示。该 PR 为恢复流程增加通知时效校验。

### 2. 将 exec-server CLI 启动逻辑提取为独立模块
**#47143** · [链接](https://github.com/openai/codex/pull/47143)

将 `codex exec-server` 的参数定义、传输校验、配置加载、认证与关闭编排从 `main.rs` 迁移至 `exec_server_command.rs`，改善代码组织与可测试性。

### 3. 独立 Web 搜索遵循系统代理设置
**#47142** · [链接](https://github.com/openai/codex/pull/47142)

此前 standalone web search 使用默认 HTTP 客户端，绕过 `respect_system_proxy` 配置。现改为复用 `HttpClientFactory`，使搜索流量也遵循系统代理。

### 4. 防止横向选择触发 TUI transcript 自动滚动
**#47137** · [链接](https://github.com/openai/codex/pull/47137)

修复在 transcript 顶部/底部横向拖动文本时误触发 autoscroll 的问题，要求从初始按下行起有垂直位移才允许自动滚动。

### 5. 网络代理支持调用方提供的 MITM CA
**#47132** · [链接](https://github.com/openai/codex/pull/47132)

新增 `network.mitm_ca` 配置（`certificate_file` / `private_key_file`），支持企业环境中使用自定义 MITM 证书；启用 MITM 且未配置外部 CA 时保留自动生成 CA。

### 6. 从 `gpt-5.6-sol` 中移除 `ultrafast` 服务档位
**#47130** · [链接](https://github.com/openai/codex/pull/47130)

模型目录更新：gpt-5.6-sol 仅保留 `priority`（Fast）档位，移除 `ultrafast`，并同步更新多智能体工具定义的场景快照。

### 7. 扩展工具环境保留外部工作目录
**#47129** · [链接](https://github.com/openai/codex/pull/47129)

将 `ToolEnvironment.cwd` 存储为 `PathUri`，使无法转换为宿主本机路径的 foreign 工作目录也能正确传递给扩展调用。

### 8. OpenAI 文件上传超时从 60 秒提升至 5 分钟
**#47122** · [链接](https://github.com/openai/codex/pull/47122)

针对大文件或慢网络场景，将 blob 上传超时从 60s 上调至 5min，减少上传失败概率。

### 9. 文件系统 helper 保留 Windows 必需运行时变量
**#47108** · [链接](https://github.com/openai/codex/pull/47108)

修复 Windows 上 MXC 无法解析平台目录与创建沙箱 helper 进程的问题：在环境变量过滤器中放行 `SystemDrive` 与 `LOCALAPPDATA`。

### 10. 受限 TUI 任务响应中保留助手最终回答
**#47100** · [链接](https://github.com/openai/codex/pull/47100)

将 TUI 任务的 999 字节响应预算提升，并优化截断逻辑，避免助手回答与线程列表被过度裁剪而丢失关键信息。

---

## 功能需求趋势

从今日 Issues

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-22

## 今日速览

昨夜发布 v0.62.0-nightly.20260922 夜间版，修复了 ACP 模式工具调用事件顺序与环境代理解析两个问题。社区讨论焦点集中在 subagent 误报成功、`--delete-session` 可能误删当前会话，以及后台 shell 临时目录泄漏等可靠性问题上。此外，多轮安全加固 PR（策略目录权限、sandbox 递归限制）已进入待审阶段。

## 版本发布

**v0.62.0-nightly.20260922.gd5b3e3acc** — 包含两项修复：
- `fix(core)`: 规范化 `proxy-agent` 的 esbuild CJS/ESM interop，修复环境代理解析问题（[#29401](https://github.com/google-gemini/gemini-cli/pull/29401)）
- `fix(cli)`: ACP 模式下在 `request_permission` 前先发出 `tool_call` 更新（[#29439](https://github.com/google-gemini/gemini-cli/pull/29439)）

## 社区热点 Issues（10 个）

1. **[#22323] Subagent 达到 MAX_TURNS 却被报告为 GOAL 成功**（评论 13 · 👍 2）  
   `codebase_investigator` 明明因达到最大轮数而中断，却向用户报告 `status: "success"` / `Termination Reason: "GOAL"`。这会造成对分析结果的严重误判，社区呼声较高。  
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#29133] `--list-sessions` 不标记当前会话，`--delete-session` 可能误删**（评论 10）  
   交互式 Session Browser 能正确标记活动会话，但 CLI 路径没有这个保护，用户可能在不知情的情况下删掉正在使用的会话。  
   https://github.com/google-gemini/gemini-cli/issues/29133

3. **[#21409] Generalist agent 无限挂起**（评论 8 · 👍 8）  
   只要委托给 generalist agent 就永久挂起，连建文件夹这类简单操作也如此。用户被迫明确禁止使用 subagent 才能绕开，影响面较广。  
   https://github.com/google-gemini/gemini-cli/issues/21409

4. **[#28362] Token drain loop（token 耗尽循环）**（评论 5）  
   由于缺少模板文件导致工具反复报错重试，耗尽 token 且无法自动停止。涉及成本与体验双重问题。  
   https://github.com/google-gemini/gemini-cli/issues/28362

5. **[#28392] 后台 shell 执行的临时目录泄漏**（评论 4）  
   `gemini-shell-*` 临时目录在后台命令结束后未清理，长期运行会累积大量垃圾文件，影响磁盘与稳定性。已有对应修复 PR（[#29437](https://github.com/google-gemini/gemini-cli/pull/29437)）。  
   https://github.com/google-gemini/gemini-cli/issues/28392

6. **[#26525] Auto Memory 缺少确定性脱敏，且日志过多**（评论 5）  
   本地 transcript 内容在被发送给提取模型之前没有先做确定性脱敏，只在 prompt 中"要求"模型自行 redact，存在敏感信息泄露风险。  
   https://github.com/google-gemini/gemini-cli/issues/26525

7. **[#29033] 扩展更新失败后的回滚实际是空操作**（评论 6）  
   声称回滚时复制的临时目录是空的，失败后的"回滚"什么都不会恢复。扩展管理的可靠性问题。  
   https://github.com/google-gemini/gemini-cli/issues/29033

8. **[#21968] Gemini 不会主动使用 skills 和 sub-agents**（评论 6）  
   即使用户定义了明确的 gradle/git skills，模型在有明确指令时才使用，自主性严重不足。这直接拖累 agent 的实际生产力。  
   https://github.com/google-gemini/gemini-cli/issues/21968

9. **[#22745] EPIC: 评估 AST 感知的文件读取/搜索/代码地图的价值**（评论 7 · 👍 1）  
   探索用 AST 精确定位方法边界，减少多轮读取和 token 噪声，同时改善代码库导航。属于中长期架构演进方向。  
   https://github.com/google-gemini/gemini-cli/issues/22745

10. **[#21983] Browser subagent 在 Wayland 下失败**（评论 4 · 👍 1）  
   浏览器子代理在 Wayland 环境中无法正常工作，影响 Linux 桌面用户，需要适配或增加环境检测。  
    https://github.com/google-gemini/gemini-cli/issues/21983

## 重要 PR 进展（10 个）

1. **[#29441] 版本号提升至 v0.62.0-nightly.20260922.gd5b3e3acc**  
   自动化版本 bump，对应今日夜间版。  
   https://github.com/google-gemini/gemini-cli/pull/29441

2. **[#29242] 修复 401 子串误判为认证错误**（CLOSED）  
   `isAuthenticationError` 用 `includes('401')` 判断，端口号、ID 等含 "401" 的错误会被误判，可能触发虚假的重新认证/登出流程。  
   https://github.com/google-gemini/gemini-cli/pull/29242

3. **[#29244] 工具文件写入原子化 + 同路径写入串行化**  
   并行工具调用可能对同一文件并发写入导致静默丢失编辑，且两个调用都报成功。此 PR 将写入改为原子操作并串行化。  
   https://github.com/google-gemini/gemini-cli/pull/29244

4. **[#29332] 限制单次调用对 sandbox 扩展的递归次数**  
   工具每次都回答 `sandbox_expansion_required` 时，`_execute` 会无限递归直至堆内存耗尽崩溃。此 PR 增加轮次上限。  
   https://github.com/google-gemini/gemini-cli/pull/29332

5. **[#29328] a2a-server 遵循 LOG_LEVEL 且不在日志中泄露凭据**  
   修复 LOG_LEVEL 配置被硬编码忽略的问题，同时防止敏感凭据进入日志输出。  
   https://github.com/google-gemini/gemini-cli/pull/29328

6. **[#29336] 为非系统策略目录启用写权限安全校验**  
   将 `isDirectorySecure` 校验从仅限系统目录扩展到用户目录与工作区目录，杜绝低权限目录被恶意写入策略文件。  
   https://github.com/google-gemini/gemini-cli/pull/29336

7. **[#29327] SDK AgentShellOptions 支持 env 与 timeoutSeconds**  
   此前 `exec('sleep 30', { timeoutSeconds: 1 })` 会完整等待 30 秒，`env` 也不生效。此 PR 修复这两个被忽略的配置项。  
   https://github.com/google-gemini/gemini-cli/pull/29327

8. **[#29323] 嵌套 .gitignore 尾斜杠模式锚定修复**  
   `pkg/.gitignore` 中 `build/` 应匹配任意深度的 build 目录，而不是仅锚定在 `.gitignore` 所在目录。  
   https://github.com/google-gemini/gemini-cli/pull/29323

9. **[#29437] 后台 shell 退出时清理临时目录**  
   将 `gemini-shell-*` 临时目录的所有权转移给 `ShellExecutionService`，在后台进程结束后自动删除，解决资源泄漏问题。  
   https://github.com/google-gemini/gemini-cli/pull/29437

10. **[#29440] web-fetch 引用使用 UTF-8 字节偏移**  
    修复非 ASCII 响应（多字节文本、emoji）中引用定位错误，对齐了 web-search 的既有逻辑。  
    https://github.com/google-gemini/gemini-cli/pull/29440

## 功能需求趋势

- **AST 感知的代码工具**：两份 Issue（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) / [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)）聚焦 AST 感知的文件读取、搜索与代码地图，目标是降低 token 消耗、减少多轮误读，这可能是新一轮核心能力升级方向。
- **Auto Memory 系统成熟化**：脱敏、低信号会话跳过、无效 patch 隔离等一组 issue（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) / [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) / [#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）说明记忆功能正从"可用"走向"可控、安全、高效"。
- **企业级安全策略**：策略目录权限校验（[#29336](https://github.com/google-gemini/gemini-cli/pull/29336)）、日志凭据防护（[#29328](https://github.com/google-gemini/gemini-cli/pull/29328)）说明企业部署场景的合规需求正在收紧。
- **ACP 模式（Agent-Client Protocol）**：除本次发布中的修复外，相关 issue 持续活跃，协议兼容性与事件顺序正确性仍是集成方关注重点。
- **Subagent 可观测性**：[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)（bugreport 缺少 subagent 上下文）与 [#22598](https://github.com/google-gemini/gemini-cli/issues/22598)（/chat share 应包含 subagent 轨迹）呼声渐高，反映用户需要更透明的子代理行为追踪。

## 开发者关注点

- **Subagent 可靠性是最大痛点**：误报成功（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）、无限挂起（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）、不主动使用 skills（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）——三者共同指向"子代理行为不可预测、不可信"这一核心问题。
- **资源管理不容乐观**：临时目录泄漏（[#28392](https://github.com/google-gemini/gemini-cli/issues/28392)）、token drain（[#28362](https://github.com/google-gemini/gemini-cli/issues/28362)）、sandbox 无限递归（[#29332](https://github.com/google-gemini/gemini-cli/pull/29332)）——运行稳定性与成本控制需要系统性加强。
- **会话安全存在隐患**：`--delete-session` 可能删除当前活动会话（[#29133](https://github.com/google-gemini/gemini-cli/issues/29133)），这种"低级但高危"的问题对自动化脚本用户尤其危险。
- **并发与一致性**：同路径并发写入丢失编辑（[#29244](https://github.com/google-gemini/gemini-cli/pull/29244)）暴露了并行工具调用的竞态条件，提示工具层需要更强的隔离保证。
- **扩展生态仍需打磨**：更新回滚无效（[#29033](https://github.com/google-gemini/gemini-cli/issues/29033)）、checkout 引用歧义（[#28422](https://github.com/google-gemini/gemini-cli/pull/28422)）——插件管理的基本可靠性还没完全建立，第三方生态发展可能因此受阻。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 2026-09-22

## 今日速览

昨日连续发布 v1.0.88-1、v1.0.88-0 与 v1.0.87 三个版本，修复了 `/allow-all` 权限保留与沙箱网络问题，并新增 OSC 777 终端通知。社区讨论聚焦 MCP 生态故障（BigInt 序列化崩溃、OAuth 失败、策略阻止）与长会话 OOM 稳定性问题，同时 Auto 模式模型池配置功能以 16 👍 成为最热门需求。

## 版本发布

### v1.0.88-1
- 修复 managed-settings 刷新失败时 `/allow-all` 授权不丢失，精确记录缺失路径的会话级授权（不再隐式授予父目录）；精确授权可在 `/list-dirs` 查看，并由 `/reset-allowed-tools` 清除
- 修复代理隧道故障导致的沙箱网络拒绝问题

### v1.0.88-0
- **新增**：为 Ghostty 和 WezTerm 直连会话提供可选 OSC 777 终端通知
- **改进**：支持命名空间自定义技能及技能目录忽略；MCP/插件视图展示服务器显示名称与插件描述；恢复（resume）功能优化

### v1.0.87
- 为 Auto 路由层新增用户级与托管启动默认值，包括严格策略与用户可覆盖的组织级配置
- 同一模式下连续 steering prompts 合并为一条待处理消息，在空输入框按 ↑ 可拉回编辑（含粘贴文本）

## 社区热点 Issues（10 个）

1. **[#4699] OOM 崩溃：长 --resume 会话导致 V8 堆内存溢出**
   `area:sessions` | 评论 6 | 👍 6
   1.0.82 在长会话恢复后反复崩溃，每次到达 4 GiB 堆上限；Node 诊断报告直接写入当前工作目录。长会话可靠性问题凸显。
   https://github.com/github/copilot-cli/issues/4699

2. **[#4218] Auto 模式模型池不可配置**
   `area:models` | 评论 2 | 👍 16（最高）
   Auto 模式可从用户全部可用模型中任意选择，导致成本和行为难以预测。社区希望限定 Auto 可用的模型集合。
   https://github.com/github/copilot-cli/issues/4218

3. **[#3399] BYOK 自定义 HTTP headers 支持**
   `area:models, area:configuration` | 评论 6 | 👍 14
   某些 LLM 服务器需要 X-Tenant-ID 等请求头，目前 BYOK 无法自定义。该需求在配置灵活性上呼声很高。
   https://github.com/github/copilot-cli/issues/3399

4. **[#1313] 会话分支功能**
   `area:sessions` | 评论 8 | 👍 13
   用户希望从当前会话分支出新会话，继承完整对话历史并保留原会话状态。适合多方案探索场景。
   https://github.com/github/copilot-cli/issues/1313

5. **[#3749] 终端流式渲染器输出损坏**
   `area:terminal-rendering` | 评论 6 | 👍 8
   推理阶段和最终输出出现字符重复、截断和行重复，影响所有流式输出场景。渲染质量是高频痛点。
   https://github.com/github/copilot-cli/issues/3749

6. **[#4211] MCP 结构化响应无法处理 BigInt**
   `area:mcp` | 评论 6 | 👍 3
   MCP 服务器返回大数字时 CLI 崩溃，错误为 `Do not know how to serialize a BigInt`，所有进行中任务中止。
   https://github.com/github/copilot-cli/issues/4211

7. **[#2486] MCP 服务器被策略阻止（个人账户）**
   `area:mcp` | 评论 8 | 👍 0
   个人 Pro+ 账户在使用 MCP 数周后突然被策略阻止，`--yolo` 和 `/mcp enable` 均无效，用户呼吁官方回复。
   https://github.com/github/copilot-cli/issues/2486

8. **[#3385] WSL2 上无法运行 Copilot CLI 1.0.49**
   `area:platform-windows, area:installation` | 评论 14 | 👍 9
   WSL2 环境升级后 CLI 卡死，附屏幕录像。Windows 平台兼容性问题关注度高。
   https://github.com/github/copilot-cli/issues/3385

9. **[#1663] Plan 模式错误执行代码变更**
   `area:agents` | 评论 4 | 👍 6
   用户消息带 `[[PLAN]]` 前缀时，agent 应只输出计划，却完整实现了功能（编辑文件、执行命令）。严重违背模式约定。
   https://github.com/github/copilot-cli/issues/1663

10. **[#4926] Atlassian MCP OAuth 失败：redirect_uri 端口不匹配**
   评论 1 | 新出现
   macOS 26.6.1 + CL 1.0.87，配置 Atlassian MCP 服务器时 OAuth 回调端口与 `client-metadata.json` 声明不一致。MCP 认证兼容性问题值得追踪。
   https://github.com/github/copilot-cli/issues/4926

## 重要 PR 进展（2 个）

当前活跃 PR 较少，仅 2 条且均为文档类：

1. **[#4739] docs: 提案——终端拥有的 macOS 通知**
   创建 2026-09-06 | 更新 09-21
   描述 macOS 通知点击问题，并附 MIT 许可的终端通知示例和可移植回归测试。属于参考提案，不修改 CLI 实现。
   https://github.com/github/copilot-cli/pull/4739

2. **[#4770] docs: 记录 WebSocket 响应的退出机制**
   创建 2026-09-08 | 更新 09-21
   当 WebSocket 传输不可用时（网络屏蔽或 `400 input item ID does not belong to this connection`），记录可用的 opt-out 方案。
   https://github.com/github/copilot-cli/pull/4770

## 功能需求趋势

- **MCP 生态成熟度**：多个 MCP 相关问题（BigInt 崩溃、OAuth 失败、策略误杀、legacy initialize 协议、每小时重枚举）表明社区对 MCP 的稳定性和兼容性有强烈诉求。
- **模型配置灵活性**：BYOK 自定义 headers（#3399）、Auto 模式模型池限制（#4218）反映用户希望更精细地控制模型使用，兼顾成本与策略。
- **会话管理增强**：会话分支（#1313）、长会话 OOM 修复（#4699）、队列提示卡住（#4705）显示会话体验和稳定性是核心关注方向。
- **终端渲染质量**：字符损坏（#3749）和 RTL 文本显示（#3704）说明终端输出正确性直接影响日常使用。

## 开发者关注点

- **MCP 集成故障集中爆发**：策略阻断、BigInt 序列化、OAuth 端口、"legacy initialize" 协议冲突等，覆盖连接、认证、数据解析全链路。
- **长会话稳定性不足**：OOM 崩溃、队列提示无法弹出、崩溃转储污染 cwd，影响长时间工作流。
- **策略管理不透明**：`enabledPlugins` 安装后持久化为 `"enabled": false`、`--yolo` 被预认证失败关闭策略吞掉，均体现策略下发与本地状态不同步。
- **平台兼容短板**：WSL2 安装失败、@文件提及在 150k 文件仓库中延迟 >5s，说明非主流环境和大仓库场景仍需优化。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-09-22** | 数据来源：github.com/MoonshotAI/kimi-cli


## 1. 今日速览

Kimi CLI 官方正式宣布停止维护，仓库将进入归档状态，社区重心全面转向代号为 **Kimi Code CLI** 的新一代终端 AI Agent。在今日发布的 **1.51.0** 最终版本中，官方完成了全部的迁移指引与仓库归档准备工作，同时为 `packages/kimi-code` 存根包同步了版本号。此外，一个长期开放的 MCP OAuth scope 功能 PR 在时隔数月后重新获得更新，显示仍有社区开发者在新代码库基础上推进功能演进。


## 2. 版本发布

### v1.51.0（最终版本）

**发布时间**：2026-09-21

**更新内容**：
- 归档 `kimi-cli` 仓库并引导用户迁移至 [Kimi Code CLI](https://github.com/MoonshotAI/kimi-code)
- 将 1.51.0 作为仓库归档前的最终版本，同步更新 CHANGELOG、文档变更日志及中英文 breaking changes
- 将 `packages/kimi-code` 存根版本同步至 1.51.0（该包已不再依赖 `kimi-cli`）

**意义**：这是旧仓库的最后一个 release，标志着项目生命周期的正式终章。

🔗 [查看 Release 详情](https://github.com/MoonshotAI/kimi-cli/releases)


## 3. 社区热点 Issues

> 注：数据源在过去 24 小时内仅包含 2 条 Issue 更新，以下全量列出。

### #2661 📢 Kimi CLI 停止维护，请迁移至 Kimi Code CLI

- **状态**：OPEN
- **作者**：@RealKai42
- **创建/更新**：2026-09-21
- **评论/👍**：0 / 0

**内容摘要**：官方正式发布迁移公告。Kimi CLI（本仓库）不再维护并将被归档，由同团队打造的下一代终端 AI Agent——[Kimi Code CLI](https://github.com/MoonshotAI/kimi-code) 全面替代。新版已重写为原生二进制，不再依赖 Python 运行时。

**重要性**：⭐⭐⭐⭐⭐ 这是所有 Kimi CLI 用户必须关注的头号公告，直接决定了项目的未来走向，影响所有现有用户与下游依赖方。

🔗 https://github.com/MoonshotAI/kimi-cli/issues/2661

### #1534 CLI 在终端界面乱序且自动重复

- **状态**：CLOSED
- **作者**：@YeemingJeen
- **创建**：2026-03-20 | **更新**：2026-09-21
- **评论/👍**：0 / 0

**内容摘要**：用户在启动 kimi-cli 后手动调整终端窗口时，导致终端界面出现混乱，且命令被自动重复执行。该 Issue 于今日被关闭（或与仓库归档计划有关）。

**重要性**：⭐⭐ 终端渲染与交互稳定性问题，虽然该 Issue 已关闭，但此类终端体验问题在开发者社区中具有较高关注度。

🔗 https://github.com/MoonshotAI/kimi-cli/issues/1534


## 4. 重要 PR 进展

> 注：数据源在过去 24 小时内仅包含 3 条 PR 更新，以下全量列出。

### #2660 chore(release): bump kimi-cli to 1.51.0（已合并）

- **作者**：@RealKai42 | **创建/更新**：2026-09-21
- **状态**：CLOSED

**内容**：版本发布 PR：
- 将 kimi-cli 版本提升至 1.51.0，即仓库归档前的最终版本
- 将当前 release notes 迁移至 1.51.0 目录（包括 CHANGELOG、docs changelog 及中英文 breaking changes）
- 同步 `packages/kimi-code` 存根版本至 1.51.0（不再依赖 `kimi-cli`）

🔗 https://github.com/MoonshotAI/kimi-cli/pull/2660

### #2659 chore: archive kimi-cli and point users to Kimi Code CLI（已合并）

- **作者**：@RealKai42 | **创建/更新**：2026-09-21
- **状态**：CLOSED

**内容**：仓库归档准备 PR：
- Kimi CLI（Python 版）将停止开发，全面转向 Kimi Code CLI
- 由于仓库归档后 README、文档站点、SECURITY/贡献指南以及 PyPI 元数据将无法再更新，因此本 PR 需在归档前完成所有必要的文档与元数据迁移

🔗 https://github.com/MoonshotAI/kimi-cli/pull/2659

### #1625 feat(mcp): add --scope option for OAuth and fix upstream auth flow issues（OPEN）

- **作者**：@4riel | **创建**：2026-03-28 | **更新**：2026-09-21
- **状态**：OPEN

**内容**：功能特性 PR：
- 为 MCP server 配置和授权增加可重复的 OAuth scope 支持
- 基于当前上游 `main` 分支（Kimi CLI 1.50.0）及 FastMCP 3.2.4 / MCP SDK 1.27.1 的锁文件版本持续跟进
- 同时修复上游认证流程中存在的问题

**分析**：该 PR 自 3 月提交后长期未合入，今日在归档前获得同步更新。这是数据集中唯一处于开放状态且有实际功能贡献的 PR，说明社区开发者在旧仓库冻结前仍在尝试回馈代码，但其最终命运取决于 Kimi Code CLI 是否采纳类似的 MCP 能力。

🔗 https://github.com/MoonshotAI/kimi-cli/pull/1625


## 5. 功能需求趋势

> 基于过去 24 小时内的 Issue/PR 数据提炼，因样本量较小，以下趋势代表**当下最突出的信号**。

| 趋势方向 | 相关条目 | 说明 |
|---------|---------|------|
| **产品迁移通道建设** | #2661, #2659, #2660 | 官方正全力打通从旧版 Kimi CLI 到 Kimi Code CLI 的迁移路径（仓库归档、README 引导、PyPI 元数据同步），这是当前最核心的“功能需求” |
| **MCP（Model Context Protocol）生态扩展** | #1625 | 社区对 MCP server 的 OAuth scope 配置有明确需求，期望获得更灵活的授权能力；同时表明社区对 MCP 协议支持的重视程度较高 |
| **终端交互稳定性** | #1534 | 终端界面渲染错乱、命令重复执行等问题反映了用户对 CLI 基础体验的敏感度，这类问题虽然已关闭，但仍是终端 AI 工具不可忽视的体验基线 |

> 说明：由于当前仓库已进入归档冻结状态，新功能需求窗口已经关闭。上述趋势更多反映了**迁移后的 Kimi Code CLI 应重点继承和优化的方向**。


## 6. 开发者关注点

- **迁移成本与路径清晰度是最紧迫诉求**：官方在 1.51.0 和 Issue #2661 中已明确迁移路径（指向 Kimi Code CLI），并完成了 README、文档、PyPI 元数据等同步。但开发者仍需关注：新 CLI 是否完全兼容旧配置？Python 生态的插件/脚本如何迁移？这些问题的答案将直接影响迁移决策。

- **MCP 授权灵活性是活跃社区贡献方向**：PR #1625 对 OAuth scope 的支持代表了部分开发者对更细粒度 MCP 授权控制的需求。Kimi Code CLI 若能在设计之初就内置更完善的 MCP 支持，将有望承接这部分社区贡献者的期望。

- **终端 UI 稳定性是老用户的痛点记忆**：Issue #1534 所反映的终端界面乱序和自动重复问题，提醒新 CLI 的交互层设计需要足够健壮，尤其是在用户调整终端大小、多窗口切换等场景下。

- **观望与迁移并行**：当前旧仓库已冻结，社区活跃度将自然流向 Kimi Code CLI 仓库。建议关注者尽早切换订阅源（[MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code)），以免错过后续重要动态。


*本日报由数据自动采集生成，仅反映数据源（MoonshotAI/kimi-cli）在过去 24 小时的 GitHub 公开活动记录。如需获取 Kimi Code CLI 最新进展，请直接关注新仓库。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-22

> 数据来源：github.com/anomalyco/opencode

## 今日速览

v1.18.32 发布，修复 Bedrock 图片附件误提升与 Together AI 流式用量报告问题。Issue 侧社区讨论热度集中在桌面端稳定性（OOM、ResizeObserver 崩溃循环）与 Windows 平台顽固 bug（端口不释放、Plan/Build 无法切换）；PR 侧则有多个核心修复落地，包括 shell 工具挂起、后台命令执行、V1 会话行清理等。此外，自信度门控模型路由与 `chat.model` 钩子两个功能型 PR 值得关注。

## 版本发布

**v1.18.32** — 核心 Bugfix 两个：
- 修复 Bedrock 图片附件仅在 Claude、Nova、Llama 4 模型中提升的问题
- 修复 Together AI 流式用量报告

另获 1 位社区贡献者 @dc85 的文档更新（Zen 模型列表新增 DeepSeek V4.1 Flash、Grok 4.7）。

## 社区热点 Issues

**1. #13393 — hashline 编辑模式（👍37，评论 5）**
社区呼声最高的功能请求，参考 oh-my-pi 引入的 Hashline 编辑模式，期望能大幅提升编辑效率。38 个 👍 表明大量用户对当前编辑模式不满意。
🔗 https://github.com/anomalyco/opencode/issues/13393

**2. #29216 — 非视觉模型被阻止传递图片给视觉 MCP 工具（👍6，评论 7）**
目前非视觉模型无法将图片透传给支持视觉的 MCP 工具，后端直接拦截。这限制了混合模型工作流，社区认为应在后端允许代理行为。
🔗 https://github.com/anomalyco/opencode/issues/29216

**3. #26266 — 子代理显示推理级别（👍8，评论 6）**
调用子代理时，UI 不展示其推理/变体级别，用户难以判断子代理实际使用的配置。8 个 👍 显示开发者对子代理透明度的需求。
🔗 https://github.com/anomalyco/opencode/issues/26266

**4. #37326 — 数学公式不渲染（评论 8，👍4）**
Desktop v1.18.2 中模型输出的数学公式无法正常渲染，影响技术问答场景。评论数与 👍 均较高，属于基础功能缺陷。
🔗 https://github.com/anomalyco/opencode/issues/37326

**5. #32932 — opencode serve 退出后端口不释放（评论 7，👍2）**
Windows 上 `opencode serve` 退出后，僵尸自环回连接导致 LISTENING 端口被锁死。对 Windows 开发者是硬阻塞。
🔗 https://github.com/anomalyco/opencode/issues/32932

**6. #35896 — 中文（zh-CN）本地化仅完成 ~13%（评论 7）**
UI 翻译键约 1117 个，仅 146 个有中文翻译，社区抱怨本地化程度太低，影响国内用户采用。
🔗 https://github.com/anomalyco/opencode/issues/35896

**7. #35643 — 内容过滤器拦截输出但仍全额计费（评论 4）**
输出被内容过滤器拦截，用户拿不到结果却被扣除全部 token 费用。计费公平性引发社区讨论。
🔗 https://github.com/anomalyco/opencode/issues/35643

**8. #33712 — Desktop 渲染器 ResizeObserver 反馈循环崩溃（评论 4，👍1）**
快速聊天列表更新时，Electron 渲染器陷入 `ResizeObserver loop` 刷屏并最终崩溃。另有 #37997 确认旧布局也受影响，非 v2 布局专属。
🔗 https://github.com/anomalyco/opencode/issues/33712

**9. #38362 — OOM 启动崩溃：Event 快照 + 会话回滚数据达 1.4GB（评论 3，👍2）**
macOS 桌面端 v1.18.4 启动即崩溃，sidecar V8 进程 OOM。数据膨胀问题与会话模型设计相关，值得关注。
🔗 https://github.com/anomalyco/opencode/issues/38362

**10. #38564 — 子代理终止不杀子进程（评论 3）**
取消子代理后，其派生的 PowerShell 子进程持续在后台运行（如磁盘扫描脚本），只能手动杀掉。属于资源安全/磁盘滥用风险。
🔗 https://github.com/anomalyco/opencode/issues/38564

## 重要 PR 进展

**1. #50472 — feat(sdk): 识别嵌入式会话请求（OPEN）**
将嵌入式 SDK 会话请求标记为 `sdk/latest/<版本>`，保持 `generate.text` 行为不变，附带测试覆盖。
🔗 https://github.com/anomalyco/opencode/pull/50472

**2. #50471 — fix(opencode): 防止 shell 工具在快速进程退出时挂起（OPEN）**
使用 `Latch` 协调输出 drain 协程与退出竞态，`abort`/`timeout` 获胜时主动终止 drain。长期存在的挂起隐患。
🔗 https://github.com/anomalyco/opencode/pull/50471

**3. #50276 — fix(core): 后台长时运行 shell 命令（OPEN）**
解决前台启动 Uvicorn 等长驻进程导致 agent 无限等待的问题，联动 #34366、#47350。
🔗 https://github.com/anomalyco/opencode/pull/50276

**4. #50270 — fix(core): 删除会话时清理遗留 V1 会话行（OPEN）**
V1→V2 迁移路径上旧版会话在删除时未被清理，该 PR 修复数据残留问题。
🔗 https://github.com/anomalyco/opencode/pull/50270

**5. #50466 — fix(plugin): 本地插件可从项目目录解析 @opencode/* 作用域包（OPEN）**
修复 `~/.opencode/plugins/probe.js` 导入 `@opencode/plugin` 时解析路径错误的问题。
🔗 https://github.com/anomalyco/opencode/pull/50466

**6. #50479 — fix(codemode): 任意值强制转换为属性键（OPEN）**
修复 `counts[row.category]` 在 `category` 为 `null` 时抛 `TypeError` 的问题。
🔗 https://github.com/anomalyco/opencode/pull/50479

**7. #50462 — fix(client): 保留服务启动失败信息（CLOSED）**
端口绑定失败时保留首次报错，避免多个进程重叠绑定

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-22

## 今日速览

今日发布 v0.24.3 及配套的 Desktop、TypeScript SDK 版本，重点改进 Web Shell 的 shell 结果结构化展示与移动端导航。社区侧，P1 级 Remote-SSH 会话创建失败（#12416）与 Session recap 语言跟随修复（#12430）成为焦点；同时多条 issue 围绕 standalone 会话路由一致性、MCP 集成与沙箱安全策略展开讨论。

## 版本发布

### v0.24.3（CLI / Desktop / SDK）
- **Web Shell**：新增结构化 shell 执行结果、可选轨迹指标、宿主机设置允许列表，并修复移动端导航问题。
- **Desktop v0.24.3**：将 ACP 权限队列作用域限定到会话内（#11802），新增共享输出模式。
- **SDK TypeScript v0.1.14**：捆绑 CLI 0.24.3，与主版本对齐。

发布链接：
- [v0.24.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.24.3)
- [desktop-v0.24.3](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.3)
- [sdk-typescript-v0.1.14](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.14)
- [v0.24.3-nightly.20260921](https://github.com/QwenLM/qwen-code/releases/tag/v0.24.3-nightly.20260921.2800e9bb4f)

## 社区热点 Issues

### 1. Web Terminal PTY 在 macOS 上不可用（P1）
[#11872](https://github.com/QwenLM/qwen-code/issues/11872) — @lydell/node-pty 未正确打包，且 macOS 代码签名阻止本地预编译二进制加载，导致 Web Terminal 报 `[Error: PTY not available]`。已有 **13 条评论**，是当前讨论热度最高的问题，社区期待更可靠的跨平台 PTY 交付方案。

### 2. Remote-SSH 下所有 POST /session 均失败（P1）
[#12416](https://github.com/QwenLM/qwen-code/issues/12416) — Companion 0.24.2 通过 Remote-SSH 连接时，创建会话即报 `write EPIPE` / `BridgeChannelClosedError`，而独立 CLI 正常工作。影响远程开发核心路径，已获 7 条评论，需要优先排查。

### 3. v0.24.2 发布无 Windows 产物（P1，已关闭）
[#12414](https://github.com/QwenLM/qwen-code/issues/12414) — CI 将 bash 安装步骤跑在 pwsh 下，导致 Windows x64 构建失败，v0.24.2 未发布 Windows 版。6 条评论，该问题虽已关闭，但反映出发布流水线在 Windows 环境的验证缺口。

### 4. Workflow retry-from-history 硬化子任务（P2）
[#12287](https://github.com/QwenLM/qwen-code/issues/12287) — 将 #12190 中积累的约 1900 行改动拆分为独立可审查项，涉及 runner 恢复语义、checkpoint schema 等核心逻辑，获得 **10 条评论**，架构关注度高。

### 5. Session recap 无法跟随对话语言（P2）
[#11847](https://github.com/QwenLM/qwen-code/issues/11847) — 会话回顾摘要始终以英文生成，系统提示词硬编码为英语，非英语用户无法获得母语摘要。8 条评论，今天已有对应 PR #12430 提出修复。

### 6. 跨会话消息门控后的宿主管理问题（P2）
[#12303](https://github.com/QwenLM/qwen-code/issues/12303) — 入站门控按目标会话设置判断跨会话消息（#12292）后，遗留了多会话宿主的稳定化、命名与上限问题，8 条评论持续讨论。

### 7. HTTP 网关超时导致 session-create 结果丢失（P2）
[#12381](https://github.com/QwenLM/qwen-code/issues/12381) — `POST /session` 在网关超时后实际创建成功，但客户端拿不到 session ID，无法安全提交首个 prompt。6 条评论，属于分布式场景下典型的幂等恢复问题。

### 8. Managed Agent 双路径架构提案（P2）
[#12380](https://github.com/QwenLM/qwen-code/issues/12380) — 提出分阶段交付的托管 Agent 架构：TS agent 循环、独立于工具环境的模型推理、会话/工作空间绑定和可恢复工具执行，涉及 serve、daemon、Web Shell 与 SDK 多个面，5 条评论，是方向性议题。

### 9. 工具执行沙箱设置硬化（P2）
[#12417](https://github.com/QwenLM/qwen-code/issues/12417) — PR #12267 将 Linux bubblewrap 从整个 CLI 收敛到单工具执行，经五轮评审仍有遗留问题，需要补充安全测试和边界验证，5 条评论。

### 10. Windows daemon 拒绝显式 PowerShell 调用（P3）
[#12375](https://github.com/QwenLM/qwen-code/issues/12375) — 模型发出 `pwsh -NoProfile -Command "Get-Date -Format o"` 这类良性命令也会被执行前拒绝，影响 Windows 上 ACP 宿主的日常使用，4 条评论，属于平台策略与工具链兼容的典型冲突。

## 重要 PR 进展

### 1. Session recap 跟随对话语言（修复 #11847）
[#12430](https://github.com/QwenLM/qwen-code/pull/12430) — 将 `RECAP_SYSTEM_PROMPT` 由硬编码英文改为按会话语言生成，并在 `general.outputLanguage` 未设置时也尊重对话语言。直接回应社区长期诉求。

### 2. ACP 跨会话消息投递
[#12403](https://github.com/QwenLM/qwen-code/pull/12403) — 此前所有跨会话消息一律被 `refused`，现在门控接受的跨会话消息会作为后台 turn 投递给对应会话，仅拒绝门控拦截的消息。补齐 ACP 会话间协作能力。

### 3. 无远程 daemon 的 SSH 工作区支持
[#12255](https://github.com/QwenLM/qwen-code/pull/12255) — 用户可在 Web Shell 中添加 `ssh://` 工作区并通过本地 daemon 操作远程文件/搜索/Shell/Git，模型凭据与会话历史留在本地。将显著简化远程开发链路。

### 4. 远程工作区目录浏览免刷新
[#12412](https://github.com/QwenLM/qwen-code/pull/12412) — 切换目录源时不再整页跳转，改为 daemon 代理路由 `GET /remote-workspace-path-suggestions` 内联获取建议，改善 Web Shell 工作区配置体验。

### 5. 部署托管的扩展目录加载
[#12183](https://github.com/QwenLM/qwen-code/pull/12183) — 新增 `--managed-extensions <root>`，从部署方控制的目录发现并读取扩展贡献，支持全新用户主目录场景，面向企业化分发。

### 6. 共享屏幕编码：保质量而非保像素
[#12397](https://github.com/QwenLM/qwen-code/pull/12397) — 针对 #12378 的编码策略回退：在 190 KiB 预算内，从 871×490@49% 提升到 1407×792，优先分配 JPEG 质量而非丢弃分辨率，明显改善字迹密集画面。

### 7. MCP App 集成三项修复
[#12258](https://github.com/QwenLM/qwen-code/pull/12258) — 修复 MCP App 集成的三个独立问题：按服务器限制资源加载、App 发起的工具调用、opaque iframe 源隔离。官方 Tableau App 现已可正常渲染。

### 8. 桌面端窗口缩放恢复
[#12410](https://github.com/QwenLM/qwen-code/pull/12410) — 为 Tauri 桌面应用恢复 `Cmd/Ctrl +/-/0` 和 `Ctrl+滚轮` 缩放，范围 50%–300%，并在下次启动时保持。解决 #12406 之外的可访问性基础能力。

### 9. Git 对话框管理工作树
[#12154](https://github.com/QwenLM/qwen-code/pull/12154) — Web Shell 的 Git

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*