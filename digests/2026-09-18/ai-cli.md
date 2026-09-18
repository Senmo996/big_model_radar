# AI CLI 工具社区动态日报 2026-09-18

> 生成时间: 2026-09-18 02:02 UTC | 覆盖工具: 7 个

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

# AI CLI 工具社区横向对比分析报告（2026-09-18）

## 1. 生态全景

AI CLI 工具已从“单轮代码问答”演变为具备会话管理、插件/Agent 扩展、远程控制、IDE 集成和自主工具调用能力的开发者平台。Claude Code、OpenAI Codex、GitHub Copilot CLI、Qwen Code、OpenCode 等均在高频迭代，但社区反馈集中指向稳定性、成本透明度和跨平台体验三大短板。同时，各工具开始出现明显的生态分化：Claude Code 押注可扩展性，Qwen Code 聚焦企业级工作流，OpenCode 走开放多模型路线，Codex/Copilot 则绑定各自厂商生态。

## 2. 各工具活跃度对比

> 数据来源为各工具 2026-09-18 社区日报中列出的活跃/热点条目数，非全量事件统计；Gemini CLI 日报数据不完整。

| 工具 | 日报列出活跃 Issues | 日报列出 PR 进展 | Release 情况 |
|---|---|---|---|
| Claude Code | 10 | 3 | v2.1.275 |
| OpenAI Codex | 10 | 1 | rust-v0.155.0 正式版 + 多个 alpha |
| Gemini CLI | 未提供 | 未提供 | v0.62.0-nightly.20260918 |
| GitHub Copilot CLI | 3 | 0 | v1.0.86 |
| Kimi Code CLI | 3 | 1 | 无新版本 |
| OpenCode | 10 | 10 | 无新版本 |
| Qwen Code | 10 | 约 10（含截断条目） | v0.24.0-nightly、desktop-v0.24.0 |

整体来看：**Claude Code、OpenCode、Qwen Code 社区信息密度最高；Codex 和 Copilot 保持稳定发布；Kimi 与 Gemini 样本量较小，暂无法做高强度横向对比。**

## 3. 共同关注的功能方向

- **可扩展性与插件/Agent 体系**  
  - Claude Code：#91870 呼吁 Mods 扩展能力，官方回应“函数钩子数周内上线”。  
  - GitHub Copilot CLI：v1.0.86 允许自定义 agent 加载 AGENTS.md 等仓库指令文件。  
  - OpenCode：通过深链接、Activity Bar、`/btw` 等扩展第三方集成入口。  
  - Qwen Code：通过 `/review`、worktree、agent isolation 强化自定义工作流。

- **VS Code / IDE 集成成熟度**  
  - 多个工具被同一类问题困扰：Claude Code 的拖放失效、焦点抢占、权限设置不生效；Codex 扩展无法显示 review diff；Copilot 插件更新被 VS Code 文件锁阻断；Qwen Code 内嵌 CLI 在 Windows 上泄漏 conhost 进程。  
  - 共性诉求：IDE 集成不能只是“能跑”，必须对齐 CLI 的交互细节、权限控制和稳定性。

- **会话生命周期与远程控制**  
  - Claude Code：#11455 会话交接、#95231 remote-control 会话被本地过滤。  
  - OpenAI Codex：#37967 手机端无法附加到进行中的 CLI 会话。  
  - Copilot CLI：#4753 会话恢复会取消正在初始化的 MCP 服务器连接。  
  - OpenCode：#49610/#49587 自动压缩和会话恢复频繁失败。  
  - Qwen Code：#12091 删除活跃会话 transcript 导致会话永久损坏。

- **成本与资源失控防护**  
  - Claude Code：#38335 Max 计划额度异常消耗，857 条评论成为全社区最热 issue。  
  - OpenAI Codex：#43375 多个模型频繁返回“capacity”错误。  
  - OpenCode：#45417 会话成本不包含子代理费用。  
  - Qwen Code：#10887 重复工具错误导致单会话燃烧 5–14M tokens。

- **Windows/Linux 平台稳定性**  
  - Claude Code：Windows 窗口置顶、崩溃后无法启动、Linux 最小化问题。  
  - OpenAI Codex：Windows Computer Use 截图失败、浏览器控制与 API key 不兼容。  
  - Copilot CLI：Windows 插件更新 “Access is denied”。  
  - Qwen Code：Windows conhost.exe 进程泄漏 347 个进程/2.8GB 内存。  
  - Kimi Code：桌面端“梦境记忆”开关不写入配置。

- **认证与网络兼容性**  
  - Claude Code：Bedrock + SSO 支持、TLS 握手失败。  
  - OpenAI Codex：API key 认证在浏览器控制中不可用。  
  - Kimi Code：子代理启动时 OAuth token 获取超时。  
  - OpenCode：免费层误杀第三方客户端，返回 403。  
  - Qwen Code：无参数工具序列化为 `null`，被 OpenAI 兼容网关拒绝。

## 4. 差异化定位分析

- **Claude Code**  
  社区体量最大、功能覆盖最广，正在从“AI CLI”走向“可扩展 AI 工程师平台”。核心优势是官方对社区反馈响应快（函数钩子即将上线），主要短板是 Max 计费透明度和桌面端稳定性。

- **OpenAI Codex**  
  产品节奏激进，率先加入实验性 `/voice`、TUI 实时推理摘要。技术路线最贴近 ChatGPT 生态会话体验，但 Windows 自动化、remote control 和第三方认证路径仍不成熟。

- **Gemini CLI**  
  日报数据不足，仅见夜间版持续发布。从现有信息看，其属于 Google 生态的快速迭代型工具，当前社区能见度明显低于其他玩家。

- **

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：github.com/anthropics/skills（截至 2026-09-18）  
> 说明：PR 评论数在数据中标记为 undefined，以下排名遵循仓库按评论数排序的原始顺序。

---

## 1. 热门 Skills 排行

| 排名 | PR | 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) **skill-creator 修复** | 隔离触发器评估，修复 Windows 下 `select()` 管道失败、运行时错误被误判为非触发、无关工具中断扫描等问题 | 评估误报/漏报是 skill 开发的核心痛点，直接影响描述优化质量 | OPEN |
| 2 | [#1771](https://github.com/anthropics/skills/pull/1771) **proofcore-contract-auditor** | 对 Solidity/Rust 智能合约做静态分析，并通过 ProofCore 零存储 Merkle 协议将审计证明锚定到 TON 区块链 | Web3 审计上链、加密公证的可行性，属全新领域 Skill | OPEN |
| 3 | [#1703](https://github.com/anthropics/skills/pull/1703) **md2video-audio** | 零成本将 Markdown 经 Marp 转为幻灯片，再编译为带拟真语音旁白的 MP4 视频 | 文档一键成片、多模态输出是社区关注的新方向 | OPEN |
| 4 | [#1742](https://github.com/anthropics/skills/pull/1742) **mcp-builder 修复** | 适配 `mcp>=2.0` 中 `streamablehttp_client` 重命名及自定义 headers 新配置方式 | 依赖上游 API 变更导致的兼容性问题（#1668） | OPEN |
| 5 | [#1734](https://github.com/anthropics/skills/pull/1734) **docx 孤儿评论检测** | 检测 DOCX 中孤立（无归属）的评论 | Office 文档边界情况处理，拼齐 word 文档技能完整性 | OPEN |
| 6 | [#525](https://github.com/anthropics/skills/pull/525) **pyxel** | Python 复古游戏开发，支持确定性 headless 运行、逐帧检查与任务级状态验证 | 游戏开发进入官方生态；3 月起长期开放，活跃度高 | OPEN |
| 7 | [#514](https://github.com/anthropics/skills/pull/514) **document-typography** | AI 生成文档的排版质检：孤字折行（1–6 词溢出）、寡行段落（标题滞留页底）、编号错位 | 直击 AI 生成文档的普遍质量问题，定位精准 | OPEN |
| 8 | [#1615](https://github.com/anthropics/skills/pull/1615) **scnet-hpc** | 通过 profile 化 SSH 与 Slurm 工作流操作 SCNet HPC 集群（分区、内存、模块、加速器） | 科学计算/HPC 场景的运维自动化，属于高门槛专业领域 | OPEN |

---

## 2. 社区需求趋势

| 方向 | 代表性 Issue | 热度 | 说明 |
|---|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492) | 43 评论 👍2 | 社区技能在 anthropic 命名空间下分发，冒充官方，造成信任边界滥用与提权风险——当前讨论最激烈的话题 |
| **企业级共享协作** | [#228](https://github.com/anthropics/skills/issues/228) | 16 评论 👍8 | 要求组织内直接共享技能库/分享链接，而非手动下载传输 .skill 文件；最高赞需求之一 |
| **评估/触发机制可靠性** | [#556](https://github.com/anthropics/skills/issues/556) | 12 评论 👍7 | `run_eval.py` 在所有查询下 0% 触发率，社区对评估工具的可信度高度敏感 |
| **上下文窗口效率** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 评论 | claude-api 技能单次注入约 156k tokens，直接耗尽上下文窗口 |
| **记忆与状态管理** | [#1329](https://github.com/anthropics/skills/issues/1329) | 9 评论 | 提出 compact-memory 符号化记忆，降低长时运行 agent 的上下文占用 |
| **Agent 治理与安全** | [#412](https://github.com/anthropics/skills/issues/412) | 6 评论 | agent-governance 提案：策略执行、威胁检测、信任评分、审计追踪 |
| **稳定性与重复安装** | [#189](https://github.com/anthropics/skills/issues/189) | 6 评论 👍9 | document-skills 与 example-skills 内容重复，导致上下文重复注入 |
| **平台兼容** | [#29](https://github.com/anthropics/skills/issues/29) | 4 评论 | AWS Bedrock 使用支持 |
| **MCP 融合** | [#16](https://github.com/anthropics/skills/issues/16) | 4 评论 | 将 Skills 暴露为 MCP，统一软件交互协议 |

---

## 3. 高潜力待合并 Skills

以下 PR 均为 OPEN 状态但讨论活跃、方向明确，近期落地概率较高：

| PR | Skill | 方向 | 创建时间 |
|---|---|---|---|
| [#1771](https://github.com/anthropics/skills/pull/1771) | proofcore-contract-auditor | Web3 智能合约审计 + 链上公证 | 2026-09-15 |
| [#1703](https://github.com/anthropics/skills/pull/1703) | md2video-audio | Markdown → 配音视频 | 2026-09-01 |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel | 复古游戏开发 | 2026-03-05 |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | 文档排版质检 | 2026-03-04 |
| [#1615](https://github.com/anthropics/skills/pull/1615) | scnet-hpc | HPC 集群运维 | 2026-08-20 |
| [#1628](https://github.com/anthropics/skills/pull/1628) | Hivemind | 多智能体编排（零成本 delegate 到免费模型） | 2026-08-21 |
| [#1627](https://github.com/anthropics/skills/pull/1627) | buffer-api | 社交媒体跨平台调度 | 2026-08-21 |
| [#486](https://github.com/anthropics/skills/pull/486) | odt | OpenDocument 创建/填充/转换 | 2026-03-01 |

---

## 4. Skills 生态洞察

**当前社区最集中的诉求是"基础设施可靠性"：让技能评估/触发机制可信、安全边界清晰、上下文开销可控，同时期待 Skills 向 Web3、HPC、视频生成、游戏开发等垂直领域快速扩张。**

---

# Claude Code 社区动态日报 — 2026-09-18

> 数据来源: github.com/anthropics/claude-code

## 今日速览

Claude Code 发布 v2.1.275，新增网关签名账户确认与"立即发送"快捷键；社区关于 **Max 计划额度消耗异常** 的 Issue（#38335）持续发酵已获 857 条评论，成为当前最受关注的问题；同时 **Mods/插件扩展能力** 的讨论热度居高不下（#91870，195 条评论），Anthropic 承诺在数周内上线函数钩子。

---

## 版本发布

**v2.1.275** 已发布，主要更新：

- **Claude Apps 网关签名确认**：当网关指定登录账户时，需用户确认后才保存凭证，`/status` 命令会显示该账户信息。
- **新增"立即发送"快捷键**：`ctrl+enter` 或 `ctrl+x ctrl+s` 可中断当前回合并立即发送所有排队消息。

---

## 社区热点 Issues（Top 10）

### 1. [BUG] Claude Max 计划会话限制异常快速耗尽（CLI 使用）
- **#38335** | 评论: 857 | 👍: 476
- 创建于 2026-03-24，至今仍为 Open 状态，持续有用户反馈 Max 计划的会话限制在常规 CLI 使用中消耗速度异常，疑似与计费/配额计算逻辑有关。此问题已演变为社区最激烈的讨论话题之一。
- [链接](https://github.com/anthropics/claude-code/issues/38335)

### 2. [Enhancement] Mods —— 让 Claude 可扩展性提升 10 倍
- **#91870** | 评论: 195 | 👍: 120
- 作者 @poteat 发起，社区反馈热烈。Anthropic 在 Issue 中回复：**函数钩子（function hooks）将在数周内（而非数天）上线**，并感谢社区的高信号反馈对设计的影响。
- [链接](https://github.com/anthropics/claude-code/issues/91870)

### 3. [BUG] Claude Desktop（Windows 11）窗口始终置顶，无设置项可关闭
- **#85891** | 评论: 107 | 👍: 262
- 桌面端高频痛点：窗口总是浮于其他应用之上，影响多任务工作流。已有 262 个 👍，用户期待尽快提供配置选项。
- [链接](https://github.com/anthropics/claude-code/issues/85891)

### 4. [BUG] Windows 上应用崩溃后遗留下 Silo/Job Object，导致无法再次启动
- **#53247** | 评论: 93 | 👍: 33
- 崩溃后必须注销或重启系统才能恢复，错误码 HRESULT 0x80070020。严重影响 Windows 用户正常使用，属于长期未解决的棘手问题。
- [链接](https://github.com/anthropics/claude-code/issues/53247)

### 5. [Enhancement] 会话交接 / 连续性支持
- **#11455** | 评论: 36 | 👍: 25
- 用户希望在不同设备/终端之间无缝交接会话，类似 IDE 的"断点续传"体验。该需求持续获得关注，说明跨设备工作的用户群体越来越大。
- [链接](https://github.com/anthropics/claude-code/issues/11455)

### 6. [BUG] VS Code 扩展聊天面板中拖放功能完全失效
- **#25128** | 评论: 33 | 👍: 48
- 终端 CLI 模式拖放正常，但 VS Code 扩展面板不可用。从 v2.1.6 引入至今未修复，且合并了多个相关反馈。
- [链接](https://github.com/anthropics/claude-code/issues/25128)

### 7. [BUG] VS Code 扩展忽略 `.claude/settings.local.json` 中 Bash/Write/Edit 权限设置
- **#15921** | 评论: 31 | 👍: 32
- 即使开启 `bypassPermissions` 模式，权限设置依然不生效。对于依赖细粒度权限控制的团队，这是安全性与可控性的重大缺口。
- [链接](https://github.com/anthropics/claude-code/issues/15921)

### 8. [Enhancement] VS Code 扩展：增加防止面板抢占焦点的选项
- **#32726** | 评论: 19 | 👍: 57
- 每当 Claude 输出内容时，面板自动展开并抢占焦点，打断用户在其他编辑器页签的输入。用户希望增加开关控制。
- [链接](https://github.com/anthropics/claude-code/issues/32726)

### 9. [Feature] 支持 AWS Bedrock + AWS SSO 的 `claude remote-control`
- **#28795** | 评论: 13 | 👍: 95
- 企业级用户呼声高，希望 remote-control 能支持 Bedrock 上的 SSO 认证。95 个 👍 表明企业场景下该能力的迫切性。
- [链接](https://github.com/anthropics/claude-code/issues/28795)

### 10. [BUG] 会话启动时技能列表静默截断大部分描述
- **#81081** | 评论: 11 | 👍: 0
- 会话开始时展示的技能列表受"大小预算"限制，大量技能描述被静默截断，用户难以快速了解可用技能，影响发现效率。
- [链接](https://github.com/anthropics/claude-code/issues/81081)

---

## 重要 PR 进展（共 3 条）

### 1. mods/diff: 将 openPane 返回类型声明为 unknown
- **#95198** | 作者: @poteat
- `$.ui.open` 即将返回一个结果对象，因此将 diff mod 的 `openPane` 类型从 `Promise<void>` 改为 `Promise<unknown>`，以兼容新旧引擎类型，无调用方读取返回值，行为不变。
- [链接](https://github.com/anthropics/claude-code/pull/95198)

### 2. diff: 仅在实际有文件可列出时才自动打开面板
- **#94847** | 作者: @bcherny
- 此前第一次编辑发生时面板会自动打开，即使目标路径在仓库外、被忽略或属于其他 worktree，会导致空面板弹出。此修复改为**仅在存在可展示文件时打开面板**，提升体验。
- [链接](https://github.com/anthropics/claude-code/pull/94847)

### 3. 修复 pr-review-toolkit 中所有 agent 的无效 YAML frontmatter
- **#87077** | 作者: @anishsamant
- 所有 agent 的 description 中使用了含冒号的未加引号的标量（如 `Daisy: "..."`），导致 YAML 解析错误，frontmatter 内容被清空，agent 加载后元数据丢失。统一修复为合法格式。
- [链接](https://github.com/anthropics/claude-code/pull/87077)

---

## 功能需求趋势

从本周所有更新 Issue 中，可以提炼出社区最关注的五大方向：

1. **Mods / 插件系统（可扩展性）**
   - 代表: #91870（Mods 可扩展性）
   - 呼声极高，官方已确认函数钩子即将上线，未来第三方扩展能力将成为核心方向。

2. **VS Code 集成成熟度**
   - 代表: #25128（拖放失效）、#32726（焦点抢占）、#15921（权限设置被忽略）、#79436（内联图片渲染）
   - 用户对 VS Code 扩展的要求正在从"能用"走向"好用"，尤其关注交互细节与权限可控性。

3. **桌面端稳定性与体验**
   - 代表: #85891（窗口置顶）、#53247（启动失败）、#83453（GPU 进程日志刷屏）、#90742（Linux 无法最小化）、#93627（自动更新后不重启）、#95050（退出后无法启动）
   - Windows 和 Linux 桌面端 Bug 数量显著，稳定性问题已成为影响用户信任的关键因素。

4. **会话生命周期与连续性**
   - 代表: #11455（会话交接）、#85169（上下文保留 / MCP 工具结果驱逐）、#95231（remote-control 会话被本地 /resume 过滤）
   - 用户期望会话能跨设备、跨时间平滑流转，并希望对上下文占用有更细粒度的控制。

5. **认证与网络可访问性**
   - 代表: #28795（Bedrock + SSO）、#95262（remote-control 401 无法恢复）、#94225（TLS 1.3 X25519MLKEM768 握手被重置）
   - 企业级认证路径（特别是 Bedrock/SSO）和网络兼容性问题在专业用户中反馈集中。

---

## 开发者关注点（痛点 / 高频需求）

1. **计费与限额透明度**：Max 计划额度消耗过快且缺少详细的用量明细（#38335），用户对官方计费逻辑存在较大不信任感。

2. **Windows/Linux 桌面端可靠性**：从启动失败、窗口管理异常到无日志的 GPU 崩溃循环（#53247、#83453、#90742、#95050），Linux 和 Windows 平台的稳定修复进度明显滞后于 macOS。

3. **remote-control 功能尚不成熟**：离线状态误报（#95254）、token 过期后无法恢复（#95262）、本地会话被隐藏（#95231），说明远程控制仍处于早期阶段，亟待完善。

4. **VS Code 扩展的基础权限与交互问题**：拖放、焦点管理、权限设置被忽略（#25128、#32726、#15921），直接降低日常工作效率，用户希望这些体验能尽快对齐 CLI 版本。

5. **网络连接稳定性**：ECONNRESET / TLS 握手失败等问题仍存在（#87500、#94225），对使用特定 ISP 或网络环境的开发者影响较大，期待更稳健的重试与降级机制。

---

*本日报由 AI 自动生成，数据截至 2026-09-18。*
*内容仅供技术参考，不构成官方立场。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-18）

## 今日速览

昨日 Codex 发布 `rust-v0.155.0` 正式版，带来实验性 `/voice` 语音对话和 TUI 实时推理摘要等新能力；社区讨论焦点集中在 Windows 平台 Computer Use 与浏览器集成的故障，以及多模型“容量已满”错误对付费用户的影响。PR 侧则以环境配置一致性、平台身份共享和沙箱清理等内部加固为主。

## 版本发布

- **rust-v0.155.0**  
  - 新增实验性 `/voice` 语音对话：支持实时转录和麦克风控制，需通过 `/experimental` 启用。  
  - TUI 在状态行显示实时推理摘要，并在成功回合后显示完成时间戳。  
  - 链接：https://github.com/openai/codex/releases

- 此外发布 `rust-v0.156.0-alpha.1` 以及多个 `0.155.0` alpha 快照（alpha.16 ~ alpha.18），主要供测试与迭代，无明显公开变更说明。  
  链接：https://github.com/openai/codex/releases

## 社区热点 Issues

1. **[#25178] Windows Computer Use 截图在 Windows 10 22H2 上失败**（66 评论 / 27 👍）  
   `get_window_state` 请求截图时抛出 `SetIsBorderRequired failed`，导致 Computer Use 在 Windows 上无法完成视觉操作。评论数最多，是当前 Windows 用户最痛的问题。  
   https://github.com/openai/codex/issues/25178

2. **[#43410] Windows 浏览器控制与 API-key 认证不兼容**（36 评论 / 17 👍）  
   Edge 插件与原生宿主机连接正常，但首次浏览器操作即报 `unsupported Codex auth method: apikey`。大量用户依赖 API key 而非 ChatGPT 登录，影响面广。  
   https://github.com/openai/codex/issues/43410

3. **[#43375] 多个 GPT-5/GPT-6 模型返回“Selected model is at capacity”**（28 评论 / 15 👍）  
   用户在多模型间切换仍频繁遇到容量错误，怀疑与限流策略或服务端容量有关，社区呼吁官方给出明确解释。  
   https://github.com/openai/codex/issues/43375

4. **[#37967] Remote Control 无法附加到进行中的 CLI 会话**（17 评论 / 26 👍）  
   手机端只能查看已完成线程，无法监督/审批正在运行的 CLI 任务，背离“工作站为主、手机为辅”的核心工作流，获高赞。  
   https://github.com/openai/codex/issues/37967

5. **[#35156] Codex 扩展无法显示代码审查 diff**（11 评论 / 40 👍）  
   点击 Review 后看不到 diff，严重影响 IDE 内代码审查体验。点赞数最高，说明社区对扩展核心功能稳定性期望很高。  
   https://github.com/openai/codex/issues/35156

6. **[#34873] `model_reasoning_summary="detailed"` 只输出标题无正文**（10 评论 / 12 👍）  
   详细推理摘要模式下，持久化的 reasoning item 只有粗体状态标题，缺少实际推理解释，影响调试和对话理解。  
   https://github.com/openai/codex/issues/34873

7. **[#34289] Hooks: PostToolUse 负载无失败信号，PostToolUseFailure 从不触发**（9 评论 / 2 👍）  
   工具调用失败时，hooks 负载不包含错误码或 `is_error` 字段，声明的失败事件也不触发，导致自动化流程无法感知失败。  
   https://github.com/openai/codex/issues/34289

8. **[#45886] Windows 桌面端首个回合后无法发送第二条消息**（8 评论）  
   第一轮对话正常，之后发送按钮变灰，但同版本 CLI 工作正常。这是最近版本引入的桌面端回归问题。  
   https://github.com/openai/codex/issues/45886

9. **[#28858] Codex 不支持 MCP `tools/list` 分页（nextCursor）**（7 评论 / 6 👍）  
   MCP 服务器返回分页工具列表时，Codex 不跟随 `nextCursor`，导致工具数量多的服务无法完整加载。  
   https://github.com/openai/codex/issues/28858

10. **[#16681] 允许编辑/删除待应用的 steer 消息**（5 评论 / 13 👍）  
   用户希望在 steer 消息应用到活动线程前可以编辑或删除，目前只能直接发送，误操作不可逆。这是一个高赞功能增强请求。  
    https://github.com/openai/codex/issues/16681

## 重要 PR 进展

1. **[#46335] 保持 MCP 策略评估与当前回合环境一致**  
   修复

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-18

## 今日速览

1. 今日发布夜间版 `v0.62.0-nightly.20260918.g9450ade79`，修复 O

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报

**2026-09-18**


### 1. 今日速览

今日发布了 v1.0.86，新增自定义 agent 可通过 frontmatter 选择加载仓库指令文件（AGENTS.md 等）。社区讨论的焦点集中在 MCP（Model Context Protocol）集成可靠性上：Figma 官方 MCP 服务器在 CLI 中无法注册工具（#4870），以及 Windows 平台插件因 VS Code 文件锁而更新失败（#4095）获得了本周最高的社区关注度。


### 2. 版本发布

**v1.0.86**（2026-09-17）

- 自定义 agent 现在可在 frontmatter 中设置 `include-custom-instructions: true`，选择加载仓库指令文件（`AGENTS.md`、`copilot-instructions.md`、`CLAUDE.md`）。
- 复行为：在没有插件目录、发现或工作目录覆盖的情况下恢复活动会话时，保留 market 设置。


### 3. 社区热点 Issues

#### #4870  MCP: Figma 远程服务器 (mcp.figma.com) 加载失败 — `-32601` 被当作致命错误（VS Code 可正常使用）
- 标签: `triage` | 评论: 5 | 👍: 9
- [查看 Issue](https://github.com/github/copilot-cli/issues/4870)

Figma 托管的 MCP 服务器能够完成认证和初始化，但 CLI 在 `server/discover` 探针阶段收到 `-32601` 错误后将其标记为致命失败，导致工具始终未注册。同一服务器在 VS Code 中工作正常，说明 CLI 的发现探针容错逻辑需要改进。

#### #4095  Windows: 插件更新失败，提示 "Access is denied (os error 5)"
- 标签: `platform-windows`, `plugins` | 评论: 3 | 👍: 22
- [查看 Issue](https://github.com/github/copilot-cli/issues/4095)

`copilot plugin update` 在 Windows 上失败，根因是 VS Code 的 Copilot 扩展持有已安装插件目录的 watcher 句柄，CLI 无法覆盖文件。这是当前所有 Issue 中 👍 数最高的（22），影响面较广。

#### #4753  会话恢复会取消正在进行的 stdio MCP 服务器连接（v1.0.83 回归，超时从 ~16s 降至 ~1s）
- 标签: `sessions`, `mcp` | 状态: 已关闭 | 评论: 4
- [查看 Issue](https://github.com/github/copilot-cli/issues/4753)

恢复会话时，CLI 执行前台会话交接，仍在初始化中的 MCP 服务器连接会被约 1 秒的超时机制取消，导致这些服务器在整个会话中静默不可用。v1

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

好的，这是根据您提供的 GitHub 数据生成的 Kimi Code CLI 社区动态日报。

---

# Kimi Code CLI 社区动态日报
**日期：2026-09-18**
**数据来源：** [github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

## 1. 今日速览
今日社区动态聚焦于稳定性修复与体验优化。新提交的 PR #2651 旨在终结重复工具调用循环，提升外部代理工作流的可靠性。与此同时，社区报告了桌面端“梦境记忆”开关无法写入配置、子代理启动时OAuth认证偶发超时等问题，反映出用户对核心功能一致性与认证流畅性的高度关注。

## 2. 版本发布
过去24小时内无新版本发布。

## 3. 社区热点 Issues
*(注：因过去24小时内更新的 Issue 数量有限，以下为全部活跃及关联条目精选。)*

**#2649 [Bug] “梦境记忆”开关拨动后不写入配置**
- **链接：** https://github.com/MoonshotAI/kimi-cli/issues/2649
- **作者：** @GH-Mason | **更新：** 2026-09-17 | **评论：** 2
- **分析：** 这是目前最受关注的桌面端问题。用户在设置中开启“梦境记忆”开关后，本地配置文件 `daimon/config.json` 并未被更新。该Issue直指核心功能逻辑：配置写入失败可能是服务端功能门控未放行所致，而非简单的本地UI故障。评论数表明已引起其他用户共鸣，并可能关联到账号权限或服务端配置同步问题。对于依赖记忆功能的重度用户来说，这属于阻断性问题。

**#2650 [Bug] 子代理启动间歇性失败：OAuth token 获取超时**
- **链接：** https://github.com/MoonshotAI/kimi-cli/issues/2650
- **作者：** @genhoi | **更新：** 2026-09-17 | **评论：** 0
- **分析：** 该问题描述了一个典型的网络/服务不可靠场景：用户主会话正常，但启动子代理时，向 `auth.kimi.ai` 请求 OAuth token 偶发超时。虽然重试可以成功，但这种“间歇性故障”会严重破坏自动化工作流和 Agent 模式的稳定性。这是关于子代理可靠性的重要反馈，暗示认证服务可能存在单点故障或负载问题。

**#1276 [Bug] `@` 自动补全中缺少文件**
- **链接：** https://github.com/MoonshotAI/kimi-cli/issues/1276
- **作者：** @hongquan | **创建：** 2026-02-27 | **更新：** 2026-09-17 | **评论：** 2
- **分析：** 该 Issue 虽创建时间较早，但在昨日被重新更新，说明问题在当前版本中可能仍未解决或复发。问题描述在使用 `@` 引用文件时，自动补全列表未展示所有相关文件。这直接影响了用户在使用上下文功能时的效率和准确性。Linux 平台 + kimi-k2.5 的组合反馈，也提供了具体的环境参考。评论区的活跃表明该问题具备一定的普遍性。

## 4. 重要 PR 进展
*(注：因过去24小时内更新的 PR 数量有限，以下为全部活跃条目。)*

**#2651 fix: 停止重复的工具调用循环**
- **链接：** https://github.com/MoonshotAI/kimi-cli/pull/2651
- **作者：** @Oxygen56 | **创建：** 2026-09-17 | **更新：** 2026-09-17
- **分析：** 这是一个针对**Issue #2637**的修复PR。该PR将“重复相同工具调用的防护”从“设置停止标记但继续执行”改为“达到限制后强制停止”。这解决了运行时在触发停止标志后仍会执行最后一次重复调用的问题，有助于防止令牌浪费和无限循环，对依赖工具调用的 Agent 场景至关重要。该修复是昨日社区最核心的代码贡献。

## 5. 功能需求趋势
基于当前 Issue 数据，社区关注的功能方向包括：
- **记忆功能可靠性：** 用户不仅关注记忆功能是否存在，更关注其配置的持久化与服务端同步的一致性（如 Issue #2649）。
- **子代理/Agent 工作流健壮性：** 子代理的启动依赖外部认证服务，该依赖链条的稳定性成为高频关注点（如 Issue #2650）。
- **上下文引用精准度：** 通过 `@` 精确引用文件和内容，是提升交互效率的基础诉求，该需求的补全逻辑需持续打磨（如 Issue #1276）。

## 6. 开发者关注点
- **核心配置一致性：** 用户期望本地设置和开关状态能实时、可靠地生效，服务端不应成为配置写入的隐性瓶颈。
- **外部依赖容错性：** 开发者对 `auth.kimi.ai` 认证服务的单点故障容忍度低，希望工具内置更健壮的重试或降级机制。
- **执行流程可控性：** PR #2651 反映了开发者对运行时执行细节的关切，他们希望 `Kimi Code CLI` 在执行工具调用时具备更严格的边界控制，避免资源浪费。

---
*注：本日报基于过去24小时内更新的 GitHub 数据生成，数据样本量较小，部分趋势分析仅代表当前时间点的社区反馈倾向。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-18

## 今日速览

今日社区热点高度集中于 **OpenCode Zen 免费层（free tier）被第三方客户端或自动压缩流程调用时返回 403 错误**，大量 Issue 集中爆发，单条最高 34 条评论。与此同时，多个针对 TUI/会话管理的修复 PR 正在推进，包括大附件流式上传、`/btw` 侧问命令、VS Code Activity Bar 集成等。

---

## 版本发布

过去 24 小时无新版本发布。

---

## 社区热点 Issues

### 1. Free tier 被 MonoCode 前端拒绝（#49580）
**评论 34 | 👍 2 | 状态：OPEN**  
通过 `hardbeat920/monocode` 桌面前端搭配 OpenCode 后端调用免费模型 `Muse Spark 1.3 Free` 时，约 55 秒后报错 `can only be used from within OpenCode`。该问题本质上指向**开放生态与免费层校验策略的冲突**，是今日评论量最高的 Issue。  
🔗 https://github.com/anomalyco/opencode/issues/49580

### 2. 所有模型触发免费层限制（#49433）
**评论 29 | 👍 4 | 状态：OPEN**  
用户使用 pacman 安装的 OpenCode 1.3.17，任何模型均报 `OpenCode's free tier can only be used from within OpenCode`。影响面广，多个 Issue 相互引用，疑似服务端校验逻辑回归或会话识别失效。  
🔗 https://github.com/anomalyco/opencode/issues/49433

### 3. DeepSeek V4 Flash 突然要求“中国托管”启用（#39845）
**评论 24 | 👍 30 | 状态：OPEN**  
会话中途被强制要求显式启用中国托管模型，`👍 30` 反映大量用户受影响的愤怒情绪。涉及模型区域政策和订阅配置，社区讨论激烈。  
🔗 https://github.com/anomalyco/opencode/issues/39845

### 4. Console Go 全模型“上游请求失败”（#37231）
**评论 22 | 👍 1 | 状态：CLOSED**  
CLI、桌面端、VSCode 插件所有 Go 模型均返回 `Upstream request failed`，持续数日。虽已关闭，但引发对**服务端稳定性与限流策略**的讨论。  
🔗 https://github.com/anomalyco/opencode/issues/37231

### 5. 自动压缩触发免费层错误（#49610）
**评论 13 | 👍 0 | 状态：CLOSED**  
用户在 `/compaction` 或上下文自动压缩时立即报错，而新会话对话正常。指向**后台 agent（title/compaction）在免费层被错误拦截**。  
🔗 https://github.com/anomalyco/opencode/issues/49610

### 6. 自动批准 + 自动压缩时失败（#49587）
**评论 11 | 👍 0 | 状态：CLOSED**  
开启 auto-approve 后，上下文窗口触发自动压缩时，免费模型（Big Pickle、MiMo V2.5）报同样的 provider 错误。社区确认此问题与“agent=compaction”的后台调用链相关。  
🔗 https://github.com/anomalyco/opencode/issues/49587

### 7. Muse Spark 1.3 报 encrypted_content 错误（#48973）
**评论 6 | 👍 8 | 状态：OPEN**  
使用 Opencode Zen 调用 Muse Spark 1.3 时出现 `reasoning encrypted_content was not issued to this caller`，会话恢复场景下复现率高，另有 #48915、#49247 等多条关联 Issue。  
🔗 https://github.com/anomalyco/opencode/issues/48973

### 8. macOS 二进制 codesign 验证失败（#46313）
**评论 5 | 👍 0 | 状态：OPEN**  
v1.18.25 的 macOS 发布包 `codesign --verify` 失败，影响安装与安全合规。涉及发布流水线签名流程问题。  
🔗 https://github.com/anomalyco/opencode/issues/46313

### 9. 会话成本不含子代理成本（#45417）
**评论 4 | 👍 11 | 状态：OPEN**  
TUI 侧栏、`opencode stats`、`/export` 显示的会话成本均不包含子代理（subagent）产生的费用，导致多代理工作流账单严重失真，社区呼声高。  
🔗 https://github.com/anomalyco/opencode/issues/45417

### 10. `opencode upgrade` 因 GitHub 限流返回 403（#23461）
**评论 6 | 👍 2 | 状态：OPEN**  
升级命令未携带 `GITHUB_TOKEN`，匿名调用 GitHub API 触发 60 次/小时/IP 限流，代理/VPN 环境下极易失败。  
🔗 https://github.com/anomalyco/opencode/issues/23461

---

## 重要 PR 进展

### 1. 支持 `opencode://new` 深链接（#49657）
新增带 `cwd` 和 `q` 参数的快捷深链接，便于第三方应用将提示词直接注入新会话，完善应用间集成能力。  
🔗 https://github.com/anomalyco/opencode/pull/49657

### 2. 强化会话 diff、快照与写入路径（#48638）
修复 `SessionSummary.summarize` 将完整 git patch 附加到用户消息导致的工作线程阻塞，减少并行 agent 下的卡顿，属于核心稳定性改进。  
🔗 https://github.com/anomalyco/opencode/pull/48638

### 3. TUI 主题 token 重构：surface → raised（#49655）
将 `background.surface.offset/overlay` 重命名为 `background.raised.base/high`，并新增 `raised.max`，属于主题系统的向下兼容性调整。  
🔗 https://github.com/anomalyco/opencode/pull/49655

### 4. 大附件流式上传 + 进度反馈（#49647）
修复拖拽 135MB 大文件导致的 Electron 窗口“无响应”问题，纯客户端改进，提升远程服务器场景的上传体验。  
🔗 https://github.com/anomalyco/opencode/pull/49647

### 5. 统一限流窗口利用率保持（#49651）
当 Anthropic 订阅账户返回 `anthropic-ratelimit-*` 头时，快速连续请求错误覆盖已计算的限流窗口，该 PR 修复窗口利用率不丢失的问题。  
🔗 https://github.com/anomalyco/opencode/pull/49651

### 6. Code Mode 子调用预览（#49650）
在 TUI 中展示 Code Mode `metadata.toolCalls` 作为紧凑子行，并支持展开查看完整输入，配合流式状态保留，增强复杂调用的可视化。  
🔗 https://github.com/anomalyco/opencode/pull/49650

### 7. VS Code Activity Bar 集成（#49643）
新增 OpenCode 入口到 VS Code 活动栏，侧边栏提供打开现有终端、新建会话等快捷操作，回应 IDE 集成诉求。  
🔗 https://github.com/anomalyco/opencode/pull/49643

### 8. 新增 `/btw` 侧问命令（#49646）
内建 `/btw <question>` 命令，可在不打断主会话流的条件下基于当前上下文快速提问，提升交互效率。  
🔗 https://github.com/anomalyco/opencode/pull/49646

### 9. 自动修复畸形工具参数（#45002）
新增内部插件，在 Zod/JSON Schema 校验前修复常见的畸形工具参数（如字符串化 JSON、多余括号）。目前**暂缓合并**，等待审计结果。  
🔗 https://github.com/anomalyco/opencode/pull/45002

### 10. 修复中断后无法撤销已接受消息（#49636）
针对 #39736，修复当助手响应被中断、用户消息尚未物化时执行 undo 报 `Message not found` 的 TUI 问题。  
🔗 https://github.com/anomalyco/opencode/pull/49636

---

## 功能需求趋势

从今日 Issues 和 PR 中可以提炼出以下社区关注方向：

| 方向 | 具体表现 |
|---|---|
| **开放生态与客户端互操作性** | MonoCode、桌面端、VS Code 等第三方前端调用被 free tier 策略拒绝（#49580、#49433） |
| **会话生命周期可靠性** | 自动压缩、会话恢复、undo 在中断/后台场景下频繁失败（#49610、#49587、#49636） |
| **模型区域策略透明度** | DeepSeek V4 Flash 突然要求中国托管启用，用户对策略变更无感（#39845） |
| **成本可观测性** | 会话成本不包含子代理费用，亟需账单透明度（#45417、#48822 PR） |
| **IDE 深度集成** | VS Code Activity Bar、深链接唤起、输入自动注入（#49643、#49657） |
| **大文件与远程场景** | 大附件上传卡死、SSH 认证交互改进（#49647、#49642） |
| **主题与 UI 打磨** | 主题 token 重构、Markdown 流式渲染偏移、后台提示误导（#49655、#48714、#49637） |

---

## 开发者关注点

- **免费层误杀第三方客户端**：大量第三方前端（MonoCode、桌面封装、VSCode 等）调用 Zen 免费模型时被 403 拒绝，社区认为校验机制过于“一刀切”，且错误提示无明确解决路径。多个 Issue 均提到“官方客户端正常，第三方失败”，指向服务端对 User-Agent 或会话来源的强制校验。
- **自动压缩/后台任务的隐形触发**：compaction、标题生成等自动后台任务也被 free tier 策略误伤，用户不明确是自身操作还是后台行为引发，排查困难。
- **新模型（Muse Spark 1.3）稳定性差**：`encrypted_content not issued to this caller` 在会话恢复时高频复现，新会话正常，疑似多轮上下文请求中的加密缓存隔离问题。
- **系统集成问题依旧**：macOS 签名失效、`opencode upgrade` 不读 `GITHUB_TOKEN` 导致限流，直接影响日常部署体验。
- **成本与用量透明度不足**：子代理费用未计入会话成本，统计结果与实际账单偏差大，影响企业级使用信心。

---

*日报基于 GitHub `anomalyco/opencode` 公共数据整理，仅供技术交流，不代表官方立场。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-18

## 1. 今日速览

昨日发布 `v0.24.0-nightly` 与 `desktop-v0.24.0` 两个版本，主要修复 ACP 权限队列与 CI 稳定性问题。社区讨论热度集中在 Windows 平台 conhost.exe 进程泄漏（P1，16 条评论）、/review 发布时收敛机制设计（10 条评论）以及多个 P1 级稳定性缺陷。功能需求方面，上下文/Token 管理、IDE 集成与远程工作区支持成为最受关注的方向。

## 2. 版本发布

### v0.24.0-nightly.20260917.f822124af5
- 记录合并的 ACP 边界接受（docs/serve）
- 修复 CI 等待发布导出相关时序问题
- [查看发布](https://github.com/QwenLM/qwen-code/releases)

### desktop-v0.24.0
- `fix(cli)`：将 ACP 权限队列作用域限定到当前会话，避免跨会话串扰（由 @chiga0 提交）
- `feat(channels)`：新增“共享输出模式”（shared output modes）
- [查看发布](https://github.com/QwenLM/qwen-code/releases)

## 3. 社区热点 Issues（Top 10）

### P1 级问题

**[Windows] qwen-cli 泄漏 headless conhost.exe ConPTY 进程 — 347 个进程 / ~2.8 GB 内存**（#11303）
16 条评论，持续发酵中。Windows 上 VS Code Companion 内嵌的 qwen-cli 在约 12 小时运行后累积了 347 个子进程，内存占用高达 2.8 GB。作者 @Andrea-Bruno 提供了完整复现路径，是当前社区反馈最激烈的问题。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/11303)

**Design: /review 发布时收敛建议（publish-time convergence advisory）**（#9278）
10 条评论。该设计文档详细记录了 `/review` 命令引入“失控回路”（push→评审→agent 修复→diff 变大→更多 finding）的问题，并提出基于遥测诊断的收敛方案。由 @wenshao 主笔，是当前最有深度的架构讨论。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9278)

**Qwen Code 0.23.3 在 Linux 下因 React error #185 崩溃**（#11732）
已关闭（8 条评论）。两次独立会话均出现同一崩溃模式：通过原生 monitor 工具启动的长时间任务仍在运行，TUI 界面却因 React 错误崩溃。此问题已在 0.24.0 中修复。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/11732)

**callback 身份变化可能替换活跃的 tool scheduler**（#12061）
8 条评论。`useReactToolScheduler` 在回调 identity 变化时会重建 `CoreToolScheduler`，而生产环境的 `useLlmStream` 传入了内联 async 回调，一个工具状态更新即可触发重渲染、替换仍持有活跃批处理的调度器，可能导致工具调用中断。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/12061)

**worktree 的 settings.json 写入项目根目录而非 worktree 自身**（#8138）
7 条评论。在 `enter_worktree` 或 `agent isolation:'worktree'` 场景下修改设置（如切换项目模型）会写到全局/项目根的 `settings.json`，而非 worktree 自己的 `.qwen/settings.json`。该 issue 标记了 `welcome-pr`，社区贡献者可以认领。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/8138)

**删除活跃会话的 transcript 导致会话永久损坏**（#12091）
P1 级，4 条评论。`sessions/delete` 在运行时仍挂载会话的情况下删除 `chats/<sessionId>.jsonl`，但 writer 不会停止——它会重建文件继续追加，且重建后文件的首条记录带有一个已不存在的 `parentUuid`，导致会话永久处于 degraded 状态。这是会话管理路径上一个典型的竞态条件。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/12091)

**重复工具错误无提前终止机制：会话在死循环中燃烧 5–14M tokens**（#10887）
P1 级，4 条评论。0.20.1–0.21.0 版本中，agent 会反复收到相同错误（如 `git remote -v` exit 128、权限拒绝）却没有任何机制终止循环，单个会话浪费高达千万级 tokens。与 #9278 的收敛问题直接相关。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/10887)

### 其他重要问题

**Slim the Goal runtime：根据当前轮证据判定完成，移除证据目录和检查点**（#12053）
7 条评论。9 月 16 日的两次真实 `/goal-draft` 会话显示，agent 在单个 Goal turn（约 100 次工具调用）内就完成了完整目标，但后续仍然执行了大量不必要的证据收集与检查点操作。社区提议精简运行时，是提升长任务效率的有力提案。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/12053)

**无参数工具序列化 'parameters' 字段为 null，导致严格 OpenAI 兼容网关拒绝请求**（#11956）
6 条评论。Qwen 0.23.4 将无参数工具的 `parameters` 字段序列化为 `null`，而严格遵循 OpenAI 规范的网关要求输出 `{}` 或省略该字段。此问题会直接阻断使用第三方网关的用户。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/11956)

**kimi-k3 经 OpenAI 兼容代理调用时工具调用格式错误反复失败**（#10689）
P1 级，6 条评论。`qwen serve` 使用 moonshot/kimi-k3 作为会话模型时，长时间会话（约 1.6 MB 记录）中反复出现 “Model response contained a malformed tool call” 错误，5 次重试全部耗尽。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/10689)

## 4. 重要 PR 进展（Top 10）

**[PR #11769] fix(core): 删除会话时同步清除其日志历史**（@L4XB）
删除会话后，该会话的 prompts 仍残留在项目共享的 `~/.qwen/tmp/<project-hash>/logs.json` 中。本 PR 为 `Logger` 增加 `removeSessionsMessages(sessionIds)` 方法，彻底清除关联数据，避免"已删除会话"的隐私残留。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/11769)

**[PR #11242] feat(browser-use): 新增 Chrome Native Messaging relay**（@tanzhenxin）
通过本地 Native Messaging host 将 Browser SDK 连接到用户现有 Chrome 浏览器，并由 Qwen 扩展管理调试器附着、转发 CDP 命令与事件。这是 Browser-use 能力的重要基础设施。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/11242)

**[PR #12096] fix(core): 权限规则中正确处理简单 Bash 注释**（@yiliang114）
修复 #11815 引入的误判：在已知经过 Bash 执行的单行命令中，尾随注释里的操作符不应被当作"幻影命令段"。非 Bash shell 与不支持语法继续走原逻辑。与安全权限判断直接相关。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/12096)

**[PR #12109] fix: 修复导致 main 变红的两个确定性测试失败**（@qwen-code-dev-bot）
该 PR 修复了 `66b041043a` 之后 `Test (ubuntu-latest, Node 22.x)` 通道上两个独立的、确定性失败：一是补上 `tools.workflowNameOnly` 的 web-shell 设置别名；二是另一处测试基础设施问题。对恢复 CI 绿线有直接贡献。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/12109)

**[PR #11926] fix(review): 在 dimension-agent briefs 中写入 PR worktree 的绝对路径**（@kabishou11）
worktree 模式下，dimension agents 的 `working_dir` 指向 PR worktree，但 brief 中的绝对路径（diff 文件）位于主 checkout 下，导致 agent 推断了错误的仓库根。此 PR 修正该路径错位问题。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/11926)

**[PR #11960] fix(mcp): 显示 MCP App 资源加载失败的明确警告**（@doudouOUC）
当 MCP 工具调用成功但其 App 资源未能加载、仅回退到文本模式时，现在会显示明确的说明：包含服务器与资源名称、超限的实际字节数与允许大小、以及有效的资源读取限制。避免静默降级带来的调试困难。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/11960)

**[PR #10563] fix(cli): 增加物理光标兼容模式**（@brocktice）
新增 `QWEN_CODE_DISABLE_PHYSICAL_CURSOR=1` 兼容模式：保持软件光标可见、阻止 Ink 重定位物理终端光标、显式覆写初始占位宽度，解决部分终端残留陈旧字符的问题。对终端兼容性有明显改善。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/10563)

**[PR #11865] fix(core): isAsyncOperator 仅将空格/Tab/换行视为单词分隔符**（@yiliang114）
修复 `rule-parser.ts` 中 `isAsyncOperator` 使用 JS `/\s/` 判断的缺陷——Unicode 空白符不应被视为 bash 的单词分隔符。这是权限解析安全性的细化修复。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/11865)

**[PR #11988] fix(core): 压缩时剥离以原生 think 标签闭合的

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*