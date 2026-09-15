# AI CLI 工具社区动态日报 2026-09-15

> 生成时间: 2026-09-15 02:19 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-15）

## 1. 生态全景

当前 AI CLI 工具赛道已进入"高频迭代 + 平台硬化"阶段：七大主流工具单日合计发布 14 个版本（含 4 个 alpha 与 1 个 nightly），头部工具以"日更"为常态，而 Claude Code 则以克制的补丁节奏维持稳定。社区反馈重心正从"生成能力"转向"工程可靠性"——Windows 平台兼容性、沙箱隔离、子代理调度与 Token 成本透明成为跨工具共振的四大议题，且社区意见已开始实质影响官方路线图（如 Claude Code 确认数周内落地 function hooks，OpenCode 官方 Docker 沙箱模板获 42👍 后关闭并进入规划）。整体判断：竞争焦点从"模型效果"转移至"企业级可信度"，包括安全边界、可观测性与成本治理。

## 2. 各工具活跃度对比

> 注：Issues/PR 数为摘要中列出的 Top 精选数量，非当日全量数据；"未披露"表示该工具摘要未提供对应板块。

| 工具 | Release 数 | 版本类型 | 热点 Issues | PR 进展 | 发布节奏 |
|---|---|---|---|---|---|
| Claude Code | 2 | 稳定补丁（v2.1.272/271） | 10 | 未披露 | 稳定维护 |
| OpenAI Codex | 4 | Rust alpha（0.155.0-alpha.2.4→alpha.6） | 10 | 10 个已合并 | 高陡迭代 |
| Gemini CLI | 1 | nightly（v0.61.0-nightly.20260915） | 10 | 10 个 | 每日构建 |
| GitHub Copilot CLI | 3 | 迭代版（v1.0.84-6→-8） | 9 | 未披露 | 快速迭代 |
| Kimi Code CLI | 0 | — | 3 | 0 | 低活跃 |
| OpenCode | 1 | 补丁（v1.18.31） | 10 | 6 个 | 补丁+重构 |
| Qwen Code | 3 | 稳定版 v0.23.4 + 2 个 CUA 驱动 | 10 | 10 个 | 稳定+激进并存 |

**活跃度梯队**：Codex 与 Qwen Code 单日 PR 合并量最大（各 10 个）；Gemini CLI 与 Qwen Code 保持每日 nightly/功能 PR 双轨；Claude Code 与 Copilot CLI 进入"小步快跑"的稳定补丁期；Kimi Code 处于谷底（无 Release、无 PR、仅 3 个 Issue 动态）。

## 3. 共同关注的功能方向

**① Windows 平台稳定性（全工具共振）**
Claude Code（Plan9 挂载在 KB5124008 后全部失败，113 评论居 bug 榜首）、Codex（WSL 项目创建失败 67 评论、截图报错、浏览器认证冲突）、Copilot CLI（每条命令弹 PowerShell 窗口）、Qwen Code（NTFS 文件 ID 比较失败、扩展 EPERM）均被 Windows 问题刷屏。系统更新与 CLI 工具的耦合断裂成为行业级痛点。

**② 沙箱与安全隔离（5/7 工具在推进）**
OpenCode（官方 Docker 沙箱模板 42👍 为需求榜第一）、Qwen Code（容器执行后端 + bwrap 内核沙箱双线并进）、Codex（Windows 沙箱注册执行系列 PR）、Gemini CLI（策略目录权限全量校验 + 日志凭证过滤）、Copilot CLI（沙箱网络 allow/deny 规则）——"默认隔离"正在成为新一代 CLI 的标配能力。

**③ 子代理/多 Agent 可靠性**
Gemini CLI（子代理误报成功、通用代理无限挂起）、Qwen Code（后台 agent 完成触发 TUI 静默崩溃）、Codex（Guardian 审查者生命周期修复）、Claude Code（mods 扩展与 function hooks，174 评论为今日最热议题）——多 Agent 编排的正确性与可观测性是所有工具的薄弱环节。

**④ Token 成本与计费透明**
Gemini CLI（$4,000 意外账单）、Codex（ASTRA Token 燃烧骤增、图像 Token 计量与实际负载 18 倍偏差）、OpenCode（GPT-5.6 prompt caching 适配 7👍）——计费模型不透明已从抱怨升级为信任危机。

**⑤ 扩展生态与模型兼容**
Copilot CLI（MCP 协议初始化冲突、marketplace 未注册）、Claude Code（function hooks 数周内落地）、Qwen Code（metadata 字段导致非 Qwen 模型 400）、OpenCode（插件 effect 版本冲突解码修复）——扩展协议与三方模型接入的兼容层正在经历规范化阵痛。

## 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex | Gemini CLI | Copilot CLI | Qwen Code | OpenCode |
|---|---|---|---|---|---|---|
| **核心优势** | 稳定性+社区路线图共治 | 基础设施重构力度最大 | 记忆系统与子代理架构 | GitHub 原生工作流+企业策略 | 功能推进最快、平台覆盖广 | 开源+provider 无关 |
| **技术路线** | 保守补丁，hooks 蓄力 | Rust 重写 + daemon/沙箱解耦 | nightly 快速验证 + A2A 协议 | 策略驱动（MDM）+ MCP 兼容 | 容器/bwrap 沙箱 + CUA 驱动 | TUI/Desktop + 多 provider |
| **目标用户** | 追求稳定的企业团队 | 深度依赖 OpenAI 模型的开发者 | Google 生态与多模态场景 | GitHub 重度用户/受管企业 | 中文社区+远程开发场景

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-15）

## 1. 热门 Skills 排行

以下按 GitHub 评论热度排序，展示社区讨论最集中的 8 个 PR（全部为 OPEN 状态）。

| 排名 | Skill / PR | 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发机制与跨平台修复**<br>[#1298](https://github.com/anthropics/skills/pull/1298) | 针对技能创建器的核心修复：隔离触发评估、解决 Windows 兼容性及运行时失败误判问题。 | 触发评估误报、Windows 管道 select() 失败、运行时失败导致负样本被错误通过——这些直接影响技能质量评估的可靠性。 | OPEN · 6月创建，9月仍在更新 |
| 2 | **mcp-builder 适配新版 MCP SDK**<br>[#1742](https://github.com/anthropics/skills/pull/1742) | 支持 mcp>=2.0 的 `streamable_http_client` 导入变更及自定义 HTTP 头配置方式。 | 新版 SDK 破坏性变更导致 MCP 连接失败，社区需要快速的兼容性更新。 | OPEN · 9月创建，活跃 |
| 3 | **docx 技能：检测孤儿评论**<br>[#1734](https://github.com/anthropics/skills/pull/1734) | 检测 DOCX 文档中与正文脱离的孤儿评论。 | 文档协作场景中批注丢失/错位问题，影响 Word 文档处理的完整性。 | OPEN · 9月创建 |
| 4 | **document-typography 印刷级排版技能**<br>[#514](https://github.com/anthropics/skills/pull/514) | 解决 AI 生成文档的排版问题：孤行短语（1–6 词溢出换行）、孤寡段落（标题滞留页底）、编号错位。 | 这些是 Claude 生成文档时普遍存在的观感问题，社区对“印刷级质量”需求强烈。 | OPEN · 3月创建 |
| 5 | **scnet-hpc 高性能计算集群技能**<br>[#1615](https://github.com/anthropics/skills/pull/1615) | 通过 profile 化 SSH + Slurm 工作流操作 SCNet HPC 集群，涵盖分区、内存、模块、加速器配置。 | HPC 用户对集群操作标准化的需求，尤其关注 profile 管理与作业生成。 | OPEN · 8月创建 |
| 6 | **pdf 大小写敏感引用修复**<br>[#538](https://github.com/anthropics/skills/pull/538) | 修复 `skills/pdf/SKILL.md` 中 8 处大小写不一致的文件引用，避免大小写敏感文件系统上的故障。 | 跨平台兼容性问题（macOS 默认大小写不敏感，Linux 上会崩）引发讨论。 | OPEN · 3月创建 |
| 7 | **ODT 技能：OpenDocument 全流程**<br>[#486](https://github.com/anthropics/skills/pull/486) | 创建、填充、读取 OpenDocument 格式 (.odt/.ods/.odf)，支持模板填充及 ODT→HTML 解析。 | 开源办公格式支持呼声高，尤其面向 LibreOffice 用户，触发词覆盖全面。 | OPEN · 3月创建 |
| 8 | **frontend-design 技能易操作性改进**<br>[#210](https://github.com/anthropics/skills/pull/210) | 重构前端设计技能，使每条指令都可在单次对话中真正被执行，提升内部一致性。 | 社区对“文档式技能” vs “可执行技能”的长期争论，本 PR 是典型回应。 | OPEN · 1月创建 |

> 注：以上 PR 按评论数从高到低排列（与前 20 名中的顺序一致），全部处于 open 状态，且多数为新增技能或对核心技能的修复。

---

## 2. 社区需求趋势

从 Issues 讨论热度（按评论数）看，社区当前最集中的需求方向如下：

### 🔐 安全与信任边界（最高热度：43 评论）
**[#492](https://github.com/anthropics/skills/issues/492) — 社区技能被部署在 anthropic/ 命名空间下，存在信任边界滥用风险。** 用户可能将非官方技能误认为 Anthropic 官方出品并授予高权限。这是社区最关注的安全问题。

### 🏢 组织级协作与共享（16 评论）
**[#228](https://github.com/anthropics/skills/issues/228) — 要求在 Claude.ai 中支持组织级技能共享。** 目前只能通过下载 .skill 文件经 Slack/Teams 手动分发，缺乏共享链接或共享技能库，团队协作效率低。

### ⚙️ 技能评估与质量保障（12+ 评论）
- **[#556](https://github.com/anthropics/skills/issues/556)**：`run_eval.py` 使用 `claude -p` 时技能触发率为 0%，评估流程失效。
- **[#1390](https://github.com/anthropics/skills/issues/1390)**：`mcp-builder/evaluation.py` 因序列化 bug 导致所有真实 MCP 服务器评估得分 0/N。
- **[#202](https://github.com/anthropics/skills/issues/202)**（已关闭）：skill-creator 应改为真正指导 Claude 执行的操作规范，而非面向人类的开发文档。

### 🧠 高级 Agent 能力（9+ 评论）
- **[#1329](https://github.com/anthropics/skills/issues/1329)**：提出 `compact-memory` 技能，用符号化标记压缩长跑 Agent 的上下文记忆，减少 token 浪费。
- **[#412](https://github.com/anthropics/skills/issues/412)**（已关闭）：提出 agent-governance 技能，涵盖 AI Agent 系统的策略执行、威胁检测、信任评分与审计追踪。
- **[#1385](https://github.com/anthropics/skills/issues/1385)**：提议三段式推理质量门控管线：任务前校准 → 对抗性审查 → 交付验证。

### 🧩 平台与生态集成
- **[#189](https://github.com/anthropics/skills/issues/189)**：`document-skills` 与 `example-skills` 插件内容重复，导致技能重复注入上下文。
- **[#1487](https://github.com/anthropics/skills/issues/1487)**：`claude-api` 技能一次性注入约 156k tokens，拖垮上下文窗口。
- **[#29](https://github.com/anthropics/skills/issues/29)**：对 AWS Bedrock 使用的支持需求。
- **[#16](https://github.com/anthropics/skills/issues/16)**：将 Skills 以 MCP 协议暴露的设想，统一 AI 软件接口。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、逻辑完整、修复关键，且近期仍有更新，是近期最可能落地的候选：

| Skill / PR | 推荐理由 |
|---|---|
| **[#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 触发评估修复** | 评论热度第一，且 9 月 15 日仍在更新（最新），直接修复影响技能评估可信度的核心问题，是仓库活跃度的风向标。 |
| **[#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 适配新版 MCP SDK** | 9 月 13 日刚更新，修复 `mcp>=2.0` 的破坏性变更，属于“不修就坏”的紧急兼容补丁。 |
| **[#1703](https://github.com/anthropics/skills/pull/1703) md2video-audio 技能** | 9 月 14 日更新，提供从 Markdown 到带 AI 配音 MP4 视频的零成本管线，创意工具类新技能，社区关注度高。 |
| **[#1765](https://github.com/anthropics/skills/pull/1765) office 红线批注 UTF-8 解码修复** | 9 月 14 日创建，修复 Windows 非 UTF-8 环境下 DOCX/PPTX/XLSX 红线 diff 乱码，解决真实跨平台痛点。 |
| **[#525](https://github.com/anthropics/skills/pull/525) pyxel 复古游戏开发技能** | 3 月创建，9 月 13 日仍在更新。接入 Pyxel 游戏引擎的 MCP 服务，完整覆盖“编写→运行→截图→迭代”闭环，质量高。 |
| **[#1724](https://github.com/anthropics/skills/pull/1724) mcp-builder 默认模型升级** | 将评估默认模型从 `claude-3-7-sonnet` 升级为 `claude-sonnet-5`，顺应模型迭代的时效性更新。 |
| **[#1627](https://github.com/anthropics/skills/pull/1627) Buffer GraphQL 调度技能** | 8 月创建，9 月 5 日更新。通用性强的第三方 API Agent 技能，覆盖多 Agent 框架（Claude、Cursor、n8n），潜在用户广。 |

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求是：构建可信、可验证、跨平台的技能工程化体系——即安全的分发机制、可靠的评估工具、适配 Windows/pnpm 等异构环境，以及应对上下文窗口压力的记忆与性能优化。**

社区不再满足于“能用的技能”，而是开始要求“能信任、能衡量、能协同”的技能基础设施。

---

# Claude Code 社区动态日报 — 2026-09-15

## 今日速览

今日发布两个补丁版本：v2.1.272（例行修复）与 v2.1.271（Remote 会话新增快速模式、/config 面板支持鼠标）。社区方面，#91870（mods 扩展性）官方回应用户将在数周内落地 function hooks，成为最热议题；Windows 平台问题集中爆发，其中 Plan9 挂载失败（#92984）以 113 条评论位居 bug 榜首。

## 版本发布

### v2.1.272
- Bug fixes and reliability improvements（例行修复与稳定性改进）

### v2.1.271
- Claude Code Remote 会话（cloud 与 self-hosted runners）新增 **fast mode**：可在主机侧设置快速模式，或在会话中通过 `/fast` 启用（组织允许时生效）
- 全屏模式下 `/config` 面板支持鼠标操作：滚轮可滚动设置项

---

## 社区热点 Issues

> 以下挑选评论数/反应最激烈的 10 个 Issue，兼顾平台覆盖面与严重性。

**1. [#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods 扩展性：让 Claude 10x 可扩展**（174 评论 / 105 👍）
社区与官方持续深度讨论的重磅议题。官方在 9/9 更新中确认**正在按周级周期推进 function hooks**，并公开感谢社区的高信号反馈已实质影响设计方向。这是当前 Claude Code 生态扩展能力最关键的演进方向。

**2. [#92984](https://github.com/anthropics/claude-code/issues/92984) — Windows: Plan9 挂载在 KB5124008 更新后全部失败**（113 评论 / 58 👍）
Windows 更新 KB5124008（26200.9445）后，Cowork 所有 Plan9 共享挂载报 `invalid argument`，卸载该补丁可恢复。影响面大且与系统更新耦合，Windows 用户关注度极高，正在等待官方

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## OpenAI Codex 社区动态日报 — 2026-09-15

### 1. 今日速览

今日 Codex 仓库共发布 4 个 Rust alpha 版本（0.155.0-alpha.2.4 至 alpha.6），并合入多个 Windows 沙箱与守护进程管理相关的 PR。社区讨论仍集中在 Windows 平台稳定性问题，特别是 WSL 集成、浏览器控制认证和队列消息可靠性；同时 ASTRA 模型 Token 消耗异常成为新的争议焦点。

### 2. 版本发布

过去 24 小时共发布 4 个 Rust 版本，均为 0.155.0-alpha 系列预发布版本，暂无详细变更日志：

- [rust-v0.155.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.6) — 最新 alpha 版本
- [rust-v0.155.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.5)
- [rust-v0.155.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.4)
- [rust-v0.155.0-alpha.2.4](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.2.4)

### 3. 社区热点 Issues（Top 10）

1. **[#41290] Windows/WSL 项目创建与删除失败** — 67 条评论 · 51 👍
   WSL 环境下切换 Agent Environment 后，项目创建和删除功能不可用。这是当前评论区最热的 Windows 问题，影响面较大。
   https://github.com/openai/codex/issues/41290

2. **[#25178] Windows 10 22H2 上 Computer Use 截图失败** — 59 条评论
   `SetIsBorderRequired` 调用报 `0x80004002` 错误，导致 `get_window_state` 截图功能不可用，但其他 CUA 操作正常。
   https://github.com/openai/codex/issues/25178

3. **[#44781] 编辑并重发排队消息触发 "App-server queued follow-up no longer exists"** — 31 条评论 · 37 👍
   Codex Desktop 在编辑并重发已排队消息时报错，属于近期高频复现的 app-server 状态同步问题。
   https://github.com/openai/codex/issues/44781

4. **[#43410] Windows 浏览器控制与 API-key 认证不兼容** — 29 条评论 · 17 👍
   Edge 插件连接成功，但首次浏览器操作即报 `unsupported Codex auth method: apikey`，导致 API-key 用户无法使用浏览器控制。
   https://github.com/openai/codex/issues/43410

5. **[#44102] Windows Desktop 完成首轮对话后无法发送后续消息** — 21 条评论
   更新到 26.903.61454 后，第一轮对话完成后 follow-up 消息发送失败，影响 Plus 订阅用户。
   https://github.com/openai/codex/issues/44102

6. **[#36176] 全进程 PowerShell/WMI 轮询导致系统输入延迟** — 13 条评论
   该问题在 26.721.4979.0 中仍存在，社区已做本地 patch 验证，怀疑是高频进程轮询导致。
   https://github.com/openai/codex/issues/36176

7. **[#42739] Windows 桌面更新后本地项目从侧边栏消失** — 11 条评论
   更新后 Projects 区域显示 "No projects"，但聊天记录和磁盘文件仍在，疑似索引/元数据迁移问题。
   https://github.com/openai/codex/issues/42739

8. **[#41338] 内联图像输出 Token 计量与实际负载不一致** — 10 条评论
   图像输出约 230 tokens 但线上传输 4.2 MB，导致基于 Token 的上下文管理无法识别阻塞线程的真实载荷。
   https://github.com/openai/codex/issues/41338

9. **[#43230] ASTRA Token 消耗今晨骤增** — 8 条评论 · 7 👍
   Pro 20x 用户反馈 Reset 后 Token 燃烧速度异常增加，引发社区对 ASTRA 计费模型的广泛讨论。
   https://github.com/openai/codex/issues/43230

10. **[#41480] macOS "Open in" 子菜单卡在 "Loading available apps…"** — 8 条评论 · 7 👍
    macOS 桌面版子菜单无限加载，已标记为 closed，但用户关注度较高。
    https://github.com/openai/codex/issues/41480

### 4. 重要 PR 进展（Top 10）

1. **[#45559] 服务重启后恢复 Windows 沙箱注册刷新** — 已合并
   修复服务重启导致沙箱注册刷新中断的竞态问题。
   https://github.com/openai/codex/pull/45559

2. **[#45558] 从完整本地 CLI 包播种缺失的守护进程安装** — 已合并
   允许使用已有 CLI 包补齐 daemon 安装，无需单独安装器。
   https://github.com/openai/codex/pull/45558

3. **[#45556] 新增附件上传/解析 API，向会话注入存储** — 已合并
   用 `upload`/`resolve` 取代旧 `persist`，支持内联字节与文件 ID 两种返回形式。
   https://github.com/openai/codex/pull/45556

4. **[#45550] Windows 沙箱支持可选注册包执行** — 已合并
   新增 `CODEX_WINDOWS_REGISTERED_CORE=1` 启动配置，通过服务记录的别名执行注册 runner。
   https://github.com/openai/codex/pull/45550

5. **[#45549] 保留中断回合的流式答案与计划** — 已合并
   修复失败/中断回合可能丢失缓冲 answer/plan 源的问题。
   https://github.com/openai/codex/pull/45549

6. **[#45546] 将守护进程包移出独立 CLI 安装** — 已合并
   daemon 使用独立包更新，避免与 CLI 版本选择耦合。
   https://github.com/openai/codex/pull/45546

7. **[#45543] 统一图像内容为共享 `ImageReference` 类型** — 已合并
   重构 `ContentItem` 中图像表示，保持现有 `image_url` 线上格式，简化生产者/消费者。
   https://github.com/openai/codex/pull/45543

8. **[#45542] Windows 沙箱账户服务化包注册** — 已合并
   新增 `registered_core` 配置模式，记录 runner 别名并认证包族调用者。
   https://github.com/openai/codex/pull/45542

9. **[#45537] Guardian 审查者生命周期移入扩展** — 已合并
   确保父进程关闭或历史重置时 Guardian 能同步清理，修复失败重试期间的历史关闭竞态。
   https://github.com/openai/codex/pull/45537

10. **[#45535] 按调用来源分类工具分析事件** — 已合并
    通过 call ID 区分 `model_tool_call` 与 `inner_tool_call`，事件证据缺失时序列化为 null。
    https://github.com/openai/codex/pull/45535

### 5. 功能需求趋势

- **Windows 平台稳定性成为首要诉求**：WSL 集成、浏览器控制、桌面项目索引、截图/Computer Use 等 Windows 专属问题占社区 Issue 的半数以上，且热度持续攀升。
- **沙箱与安全增强**：大量 PR 聚焦 Windows 沙箱注册执行、Unix socket 权限、Guardian 审查生命周期，可见官方正在强化多租户安全边界。
- **模型支持与 Token 透明化**：GPT-6 Astra / GPT-5.6-Astra 已进入社区讨论，但 Token 消耗不透明（#43230）与模型选择器缺失（#38199）引发用户对配额透明度的诉求。
- **守护进程/App-Server 解耦**：多个 PR 将 daemon 与 CLI 分离、修复本地 daemon 被忽略的回归（#41014、#41112），显示基础设施层正在重构。
- **图像与多媒体处理**：ImageReference 统一类型、禁止记录图像 base64 日志等 PR，指向图像工具链正处于重构期。

### 6. 开发者关注点

- **高频痛点：队列消息与后续消息丢失**（#44781、#44102、#45209）——编辑已排队消息或首轮回复后发送 follow-up 失败，严重影响交互体验。
- **Token 消耗不可控**：多个用户反馈 "Token 燃烧骤增"、"24 小时耗尽配额"，API-key 用户尤其敏感（#43410、#43230、#45192）。
- **SSD 写入与日志膨胀**：#29674 指出 TRACE 日志导致 SQLite/WAL 快速膨胀；#36176 反映系统级输入延迟。两者共同指向桌面端的资源管理问题。
- **扩展生态痛点**：Chrome 扩展在 Web Store 中不可用（#29102）、重装后 native host 残留（#40357）、GitHub 插件 "Always allow" 不生效（#37184）——开发者对集成体验的不满集中在插件生命周期管理上。
- **更新回归频发**：Windows 桌面更新后项目消失（#42739）、本地 App Server daemon 被忽略（#41014）等回归类问题占比偏高，社区期待更完善的版本兼容性测试。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-15

## 今日速览

今日发布 v0.61.0-nightly.20260915 nightly 版本，核心变更集中在子代理（Subagent）可靠性与记忆系统（Auto Memory）的持续修复。值得关注的是，社区对子代理误报成功、通用代理挂起、以及 Auto Memory 在重定向与重试机制上的缺陷反馈热度较高，另有多个关于策略目录安全与 A2A Server 日志处理的 PR 进入审查。

## 版本发布

### v0.61.0-nightly.20260915.g9c1b0a610
- 发布内容：夜间自动构建版本，包含今日合并的若干修复（详见下述 PR 进展）。
- 完整变更日志：[Compare v0.61.0-nightly.20260914...v0.61.0-nightly.20260915](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260914.g9c1b0a610...v0.61.0-nightly.20260915.g9c1b0a610)

## 社区热点 Issues

### 1. Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功（#22323）
- 现象：`codebase_investigator` 子代理在未做任何分析就达到最大轮次限制时，仍返回 `status: "success"` 与 `Termination Reason: "GOAL"`，掩盖了中断。
- 重要性：直接误导主代理判断，可能导致后续操作基于错误的前提继续执行。
- 社区反应：13 条评论，是目前评论数最高的问题，已标记 `need-retesting`。
- 链接：[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. Generalist agent 无限挂起（#21409）
- 现象：`gemini-cli` 一旦将任务移交给 generalist agent，就会无限期挂起（用户等待最长 1 小时后取消）。简单操作如创建文件夹也会触发。
- 社区反应：8 个 👍，8 条评论。用户反馈强烈，`--yolo` 等配置无法绕过；普通开发者也可能遇到，值得关注。
- 链接：[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)

### 3. Shell 命令执行卡在 "Waiting input"（#25166）
- 现象：简单 CLI 命令执行完成后，UI 仍显示命令活动且提示等待输入，进程实际已结束。
- 重要性：严重影响自动化流程和用户体验，属于高频交互核心路径。
- 社区反应：3 个 👍，4 条评论，状态 `need-retesting`。
- 链接：[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)

### 4. Auto Memory 记录处理存在安全与重复问题（#26525）
- 内容：Auto Memory 将本地 transcript 内容发送至模型时，提示模型进行重定向发生在内容进入模型上下文之后，且服务可能记录现有技能内容。
- 重要性：涉及敏感信息处理链路，重定向时机不当可能造成泄漏。
- 链接：[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)、[#26522（低信号会话无限重试）](https://github.com/google-gemini/gemini-cli/issues/26522)

### 5. GlobTool 符号链接路径不一致导致编辑失败（#28415）
- 现象：`GlobTool` 搜索时使用解析后的真实路径，但返回原始符号链接路径，导致后续 `read_file`/`edit` 在 macOS 符号链接工作区失败。
- 重要性：影响多根工作区和符号链接使用者的日常开发，已标记 `effort/small`，有望快速修复。
- 链接：[#28415](https://github.com/google-gemini/gemini-cli/issues/28415)

### 6. Gemini 不会主动使用自定义 skills 和 sub-agents（#21968）
- 现象：即使存在相关技能（如 gradle、git）和子代理，Gemini 也几乎不会自主调用，仅在用户显式指示时才使用。
- 重要性：直接影响 CLI 可扩展性和效率，反映当前模型对自身工具生态的自我认知不足。
- 链接：[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)

### 7. Browser subagent 在 Wayland 下失败（#21983）
- 现象：浏览器子代理在 Wayland 环境下报错退出，终止原因为 `GOAL`，但实际未完成任务。
- 重要性：影响 Linux 用户使用浏览器自动化能力。
- 链接：[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)

### 8. Gemini CLI 误导计费模式，用户两天产生 $4,000 账单（#27668）
- 现象：用户在配置第三方应用时，Gemini CLI 明确告知使用“Google 内部配额”且“与个人 API Key 无关”，导致用户误以为无外部费用。
- 重要性：涉及计费透明度和用户财产安全，属于高优先级信任问题，已标记 `Stale` 但影响深远。
- 链接：[#27668](https://github.com/google-gemini/gemini-cli/issues/27668)

### 9. Agent 应阻止/劝阻破坏性行为（#22672）
- 现象：在复杂 git 操作或资源维护场景，模型可能使用 `git reset`、`--force` 等危险命令，而社区认为应引导更安全的替代方案。
- 重要性：涉及 AI 代理的安全边界设计，当前标记为客户问题。
- 链接：[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)

### 10. `/compress` 在会话恢复后失效（#21335）
- 现象：`/compress` 仅在内存中替换聊天历史，不写回磁盘，导致会话恢复后旧历史重新出现，token 压缩效果无法持久化。
- 社区反应：2 个 👍，已标记 `effort/small`。
- 链接：[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)

## 重要 PR 进展

### 1. fix(core): 停止将 401 作为子串匹配认证错误（#29242）
- 内容：`isAuthenticationError` 原先使用 `message.includes('401')`，导致端口号、ID 等包含 "401" 的错误被误判为认证失败，触发不必要的重新认证流程。
- 链接：[#29242](https://github.com/google-gemini/gemini-cli/pull/29242)

### 2. fix(core): 确保 AgentLoopContext 属性在对象展开后保留（#29335，p1）
- 内容：`Config` 类以原型 getter 实现 `AgentLoopContext` 接口，但对象展开会丢失这些属性，修复后保证上下文完整性。
- 重要性：影响子代理上下文传递，属于核心链路修复。
- 链接：[#29335](https://github.com/google-gemini/gemini-cli/pull/29335)

### 3. fix(a2a-server): 元数据端点对不支持存储类型提前返回（#29334）
- 内容：A2A server 任务元数据端点在非内存存储配置下返回 HTTP 501 后未及时 return，补充提前返回逻辑，避免冗余处理。
- 链接：[#29334](https://github.com/google-gemini/gemini-cli/pull/29334)

### 4. fix(a2a-server): 遵循 LOG_LEVEL 且不在日志中记录凭证（#29328，p1/安全）
- 内容：修复服务器启动时 `LOG_LEVEL` 被 allow-list 后却硬编码 `level: 'info'` 的问题；同时确保证书信息不进入日志。
- 链接：[#29328](https://github.com/google-gemini/gemini-cli/pull/29328)

### 5. fix(core): 校验按约定发现的策略目录权限（#29333）
- 内容：`filterSecurePolicyDirectories` 只对系统策略目录执行 `isDirectorySecure`，用户目录和工作区目录仅因“存在”而被信任，现修复为全部校验。
- 链接：[#29333](https://github.com/google-gemini/gemini-cli/pull/29333)

### 6. fix(core): 加固非系统策略目录写权限（#29336，p2/large）
- 内容：将 `isDirectorySecure` 校验扩大到所有策略目录层级，支持 POSIX 与 Windows 下的当前用户所有权检查，并针对默认、用户、工作区目录启用。
- 链接：[#29336](https://github.com/google-gemini/gemini-cli/pull/29336)

### 7. fix(sdk): 使 AgentShellOptions 的 env 与 timeoutSeconds 生效（#29327）
- 内容：`SdkAgentShell.exec` 此前忽略 `env` 和 `timeoutSeconds`，导致 `exec('sleep 30', { timeoutSeconds: 1 })` 仍等待 30 秒，现修复。
- 链接：[#29327](https://github.com/google-gemini/gemini-cli/pull/29327)

### 8. fix(core): 限制单次调用对 sandbox 的展开频率（#29332）
- 内容：工具每次回复 `sandbox_expansion_required` 时递归调用自身，且没有递归深度计数。使用 stub 工具持续拒绝时，进程因堆内存耗尽而崩溃。
- 链接：[#29332](https://github.com/google-gemini/gemini-cli/pull/29332)

### 9. fix(cli): 截断 stdin 后暂停读取，并在放弃时提示（#29329）
- 内容：`process.stdin.destroy()` 不可逆，截断后同进程内后续读取器将拿不到输入。改为暂停读取并在放弃时明确提示，解决该副作用。
- 链接：[#29329](https://github.com/google-gemini/gemini-cli/pull/29329)

### 10. fix(cli): 保留 logger 响应前的输入且只读一次（#29330）
- 内容：修复 `setPastSessionMessages` 在 `setCurrentSessionMessages` updater 内的纯度违规（React 严格模式不允许），并弥补由此暴露的重复读取问题。
- 链接：[#29330](https://github.com/google-gemini/gemini-cli/pull/29330)

## 功能需求趋势

- **子代理生态的自我认知与主动使用**：多个 Issue（#21968、#21432）指出 Gemini CLI 对自身 skills、sub-agents、CLI 标志与快捷键缺乏足够的主动利用意识，社区希望模型能“知道自己的能力边界”。
- **记忆系统的安全性与低信号抑制**：Auto Memory 相关 Issue 集中（#26516、#26522、#26523、#26525），方向包括确定性重定向、低信号会话不无限重试、非法补丁隔离等，安全与质量并重。
- **AST 感知的代码工具链**：#22745 和 #22746 提出以 AST 感知方式优化文件读取、搜索与代码库映射，减少 token 消耗并提高方法级定位精度。
- **企业级安全与策略硬化**：多个新 PR（#29333、#29336、#29328）聚焦策略目录权限校验、日志凭证过滤，显示企业级部署安全正在被加强。
- **浏览器代理韧性**：#22232（自动会话接管与锁恢复）、#22267（浏览器代理忽略 settings.json 覆盖）等表明社区对浏览器代理的稳定性与配置一致性有更高预期。

## 开发者关注点

- **子代理稳定性与可观测性**：最大痛点集中在子代理误报成功（#22323）、通用代理挂起（#21409）、/bug 上报不包含子代理上下文（#21763）、以及子代理轨迹无法通过 `/chat share` 分享（#22598）。
- **Shell 交互卡顿**：#25166（命令执行后假死）与 #22465（交互式 prompt 卡住）说明 shell 工具的输入输出与生命周期管理仍存在可靠性的问题。
- **记忆系统对用户数据的处理**：Auto Memory 的重定向时机、无效补丁静默跳过与低信号重试引发对数据安全和资源消耗的双重担忧（#26523 等）。
- **计费透明性**：#27668 引发的 4000 美元意外账单，表明开发者期待 CLI

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-15）

## 今日速览

昨日连发 3 个迭代版本（v1.0.84-6 → v1.0.84-8），聚焦会话视图、沙箱网络配置与 Claude 思考模式修复。Issue 侧 MCP 协议兼容性与策略管理成为焦点，另有多个新报告 Bug 进入 triage，Windows/终端体验类问题持续发酵。

---

## 版本发布

过去 24 小时共发布 3 个版本，均为 1.0.84.x 迭代：

### v1.0.84-8
- **新增**：`transcriptView` 支持 `concise` 模式，将工具调用活动分组为可展开的工作摘要
- **改进**：可在 `/factories` 对话框中暂停/恢复 Agent Factory 任务
- **修复**：登录、切换账户或退出后模型列表未刷新的问题

### v1.0.84-7
- **修复**：针对 Claude 模型「adaptive-only」分类的 thinking 形状错误，现改为保持 adaptive（关闭 thinking 仅降低推理强度而非失败）；禁用 thinking 时推理上限固定为 high
- **修复**：`/clear` 关闭会话时会正确运行 `sessionEnd` 钩子

### v1.0.84-6
- **新增**：`/config` 命令，在 CLI 中打开侧边栏配置界面
- **新增**：`/sandbox` 支持网络主机 allow/deny 规则，且不替换已配置的上游代理
- **改进**：托管 Edit/Write 规则现在可以识别原生 shell 重定向及支持的原地 sed 操作

🔗 [Releases 页面](https://github.com/github/copilot-cli/releases)

---

## 社区热点 Issues

以下精选过去 24 小时内更新、讨论度高或影响面广的 10 个 Issue：

### 1. MCP 初始化协议冲突（已关闭）｜#4525
1.0.81-1 在 modern `server/discover` 成功后又发送 legacy `initialize`，导致 Python MCP SDK 2.0.0 双时代运行器报 `-32022`。7 条评论、3 👍，已关闭说明有解决办法。
🔗 https://github.com/github/copilot-cli/issues/4525

### 2. Linux 频繁 JavaScript 堆内存溢出｜#4725
每几分钟崩溃一次，Mark-Compact 显示内存飙至约 4GB 上限。5 条评论，影响长时间运行的 Linux 用户，稳定性问题需重点关注。
🔗 https://github.com/github/copilot-cli/issues/4725

### 3. 恢复会话保留陈旧连接项 ID｜#4505
恢复会话后每条 prompt 报 `400 input item ID does not belong to this connection`，`/fork` 也无法恢复。3 👍，涉及会话核心链路。
🔗 https://github.com/github/copilot-cli/issues/4505

### 4. Windows：每条 shell 命令弹出 PowerShell 窗口｜#4549
Agent 每次执行命令都会闪现并短暂聚焦一个 `conhost` 窗口，多命令任务下体验极差。Windows 用户反馈高频痛点。
🔗 https://github.com/github/copilot-cli/issues/4549

### 5. 服务器托管 marketplace 获取后从未注册｜#4556
`extraKnownMarketplaces` 成功获取并解析，但不会进入插件/marketplace 路径，`copilot plugin marketplace list` 仍只显示默认两项。2 👍，插件体系一致性问题。
🔗 https://github.com/github/copilot-cli/issues/4556

### 6. 组织级自定义 Agent 在非 Git 仓库目录不可见｜#3572
必须身处包含该组织 GitHub 远程的仓库目录，CLI 才能通过 `/agent` 看到 org 级自定义 agents。3 👍，影响企业用户工作流。
🔗 https://github.com/github/copilot-cli/issues/3572

### 7. Warp 终端颜色主题不匹配｜#4843
CLI 根据系统深/浅色而非终端主题决定文本颜色，Warp 深色主题下颜色不可读。终端兼容性新报告。
🔗 https://github.com/github/copilot-cli/issues/4843

### 8. 策略驱动的 enabledPlugins 安装了但未激活｜#4837
策略/配置驱动的 `enabledPlugins` 条目安装插件后，在 `~/.copilot/config.json` 中记录为 `"enabled": false`，技能永不激活且不自动纠正。影响 MDM/仓库级策略部署。
🔗 https://github.com/github/copilot-cli/issues/4837

### 9. 并发 MCP OAuth 刷新导致误报硬错误｜#4842
两个远程 MCP 服务器同时 401 时，并发刷新中一个被取消（`quit_reason: Cancelled`），前台误报硬失败（可自愈但体验差）。
🔗 https://github.com/github/copilot-cli/issues/4842

###

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 · 2026-09-15

## 1. 今日速览

过去 24 小时，Kimi Code CLI 仓库无新版本发布，无 PR 更新。3 个 Issue 有动态，其中 #1383 是历史遗留的多 Agent 并发限流讨论（今日已关闭但仍有新评论），#2643 与 #2642 是昨日新提交的 IME 输入法 Bug 和可视化批注功能需求。整体社区焦点集中在**多 Agent 并发配额、CJK 输入法兼容性、长回复审阅工作流**三个方向。

## 2. 版本发布

今日

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-15

## 今日速览

今日发布补丁版本 v1.18.31，修复了 ACP 会话恢复时 `model`、`effort` 等参数边界丢失的问题，以及 TUI 启动时远程配置认证错误的显示问题。社区方面，macOS 用户集中反馈了一个阻断性 Bug（#48811，👍29），所有 prompt 均因 `undefined is not an object (evaluating 'a.name')` 失败；高赞的 Docker 官方沙箱模板需求（#9132，👍42）已关闭，预计后续会有官方方案落地。

## 版本发布

**v1.18.31**（过去 24 小时）

- **Core 修复**：恢复会话加载、恢复或 fork 时的 ACP 会话模型、effort、mode 及 reasoning 分块边界（@JacobNWolf）。
- **TUI 修复**：启动时显示远程配置认证错误并以失败状态退出。
- **Extensions**：有改进更新，但发布说明未披露具体细节。

---

## 社区热点 Issues（Top 10）

### 1. macOS：每个 prompt 都报 `undefined is not an object`（#48811）
- **状态**：OPEN | 更新于 2026-09-15 | 评论 7 | 👍 29
- **简介**：OpenCode 在 macOS 上可正常启动并创建会话，但每个 prompt/tool 调用都会失败，报错 `TypeError: undefined is not an object (evaluating 'a.name')`，定位在 `SystemPrompt.environment`。当前影响面较大且没有绕过方案。
- **链接**：https://github.com/anomalyco/opencode/issues/48811

### 2. [FEATURE] 官方 Docker Sandbox 模板（#9132）
- **状态**：CLOSED | 更新于 2026-09-15 | 评论 15 | 👍 42
- **简介**：请求为 `docker sandbox run opencode` 提供官方模板（对标 Claude 的官方沙箱）。42 个 👍 是近期需求类 issue 中最高的，说明社区对安全沙箱运行环境有强烈诉求。该 issue 已关闭，值得关注是否已合并到路线图。
- **链接**：https://github.com/anomalyco/opencode/issues/9132

### 3. OpenCode 1.4.3 搭配本地 Ollama 时挂起（#22132）
- **状态**：CLOSED | 更新于 2026-09-15 | 评论 17 | 👍 5
- **简介**：通过 `@ai-sdk/openai-compatible` 配置本地 Ollama 时，即使极简 prompt（`ci`）也会卡住，但直接调用 `/v1/chat/completions` 却正常。评论数达 17 条，是近期讨论最热烈的问题之一，说明本地模型用户基数不小。
- **链接**：https://github.com/anomalyco/opencode/issues/22132

### 4. Desktop 对慢速本地 provider 固定 5 分钟 Headers Timeout（#26602）
- **状态**：OPEN | 更新于 2026-09-15 | 评论 14 | 👍 2
- **简介**：OpenCode Desktop 在本地 OpenAI-compatible provider 请求超过 5 分钟时强行中断，报 `Headers Timeout Error`，即使配置了 `"timeout": false` 也无效。长上下文/慢速本地模型的用户体验受影响严重。
- **链接**：https://github.com/anomalyco/opencode/issues/26602

### 5. [FEATURE] 侧边栏实时会话状态面板 + 后台完成通知（#28175）
- **状态**：CLOSED | 更新于 2026-09-15 | 评论 10 | 👍 3
- **简介**：多会话并行运行缺少可视化监控，`/sessions` 模态列表既不实时也打断当前工作流。该需求已关闭，意味着官方可能已有相关规划或实现。
- **链接**：https://github.com/anomalyco/opencode/issues/28175

### 6. [needs:compliance] 多轮对话后输出中断（#49092）
- **状态**：OPEN | 创建/更新 2026-09-15 | 评论 3
- **简介**：与 agent 多轮对话后，模型输出自然语言再调用工具时异常终止、无后续输出，表现为静默中断。当前标记为 `needs:compliance`，等待合规团队确认。
- **链接**：https://github.com/anomalyco/opencode/issues/49092

### 7. [FEATURE] 支持 GPT-5.6 prompt caching 默认值（#36318）
- **状态**：CLOSED | 更新于 2026-09-15 | 评论 3 | 👍 7
- **简介**：建议 OpenCode 自动适配 GPT-5.6 及以后模型的新 prompt 缓存行为，以减少 token 消耗和延迟。7 个 👍 说明开发者对成本和性能敏感度高。
- **链接**：https://github.com/anomalyco/opencode/issues/36318

### 8. [FEATURE] 按 Provider 限流（#32423）
- **状态**：CLOSED | 更新于 2026-09-15 | 评论 3 | 👍 4
- **简介**：请求为每个 provider 单独配置速率限制，避免某个 provider 被限流时拖垮整个工作流。多 provider 混用的用户会有强感知。
- **链接**：https://github.com/anomalyco/opencode/issues/32423

### 9. `.opencode/node_modules/` 导致启动卡死（#30337）
- **状态**：CLOSED | 更新于 2026-09-15 | 评论 4
- **简介**：扫描器没有跳过 `.opencode/node_modules/`，尽管它在 `.gitignore` 中，导致启动长时间挂起/冻结。开源项目对 node_modules 的扫描问题是常见痛点。
- **链接**：https://github.com/anomalyco/opencode/issues/30337

### 10. Vertex provider 不同错误被统一报告为 "content filter"（#35736）
- **状态**：CLOSED | 更新于 2026-09-15 | 评论 2
- **简介**：Vertex AI 的 404、socket 关闭、`stop_reason: refusal` 三种失败模式在 OpenCode UI 中全部显示为 "被内容过滤器阻止"，导致开发者无法定位真实原因，必须手动抓原始 API 请求。
- **链接**：https://github.com/anomalyco/opencode/issues/35736

---

## 重要 PR 进展（Top 10）

### 1. fix(desktop): 将 mac beta 用户迁移至稳定版安装器（#48724）
- **简介**：将 macOS Beta 用户引导至签名 Stable DMG，替代 Squirrel.Mac 跨 bundle-id 升级；每次下载 Stable DMG 前需显式确认。
- **链接**：https://github.com/anomalyco/opencode/pull/48724

### 2. feat(core): worktree API 改为基于项目（#48867）
- **简介**：worktree 的 List/Create/Open/Delete 全部要求 `projectID`，不再通过调用者指定位置。List 只需读取已保存的项目清单，无需加载配置、激活插件或执行发现逻辑，性能提升明显。
- **链接**：https://github.com/anomalyco/opencode/pull/48867

### 3. fix(core): 用 schema 自身实例解码插件工具输入（#43460）
- **简介**：当配置插件打包了与服务端不同版本的 `effect` 时，所有工具输入解码都会报 `Invariant` 错误。此修复改用 schema 自己的实例来解码，解决版本冲突。
- **链接**：https://github.com/anomalyco/opencode/pull/43460

### 4. fix(tui): 退出时干净地重置终端模式与位置（#49089）
- **简介**：修复 TUI 退出后终端残留错误模式、epilogue 覆盖 shell 内容的问题。关闭 #48776，关联 #38860。
- **链接**：https://github.com/anomalyco/opencode/pull/49089

### 5. feat(app): 清理 URL 凭据 + 浏览器附件上下文防护（#49087）
- **简介**：通过 `history.replaceState()` 清理文档 URL 中的敏感凭据，防止浏览器附件上下文泄露认证信息，安全类修复。
- **链接**：https://github.com/anomalyco/opencode/pull/49087

### 6. refactor(vscode): 扩展对齐 v2 CLI 约定 + shims 符号链接解析（#49084）
- **简介**：v2 中 `--port` 已移除，扩展随之更新；同时修复 shims 的符号链接解析，避免查找真实

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-15

## 1. 今日速览

今日发布了 **v0.23.4** 稳定版，主要是移除消息前缀过滤的破坏性变更；社区侧热点集中在 **TUI 静默崩溃（React #185）** 和 **非 Qwen 模型兼容性** 两大问题上，均有多条 P1 级 issue 跟进。PR 方面，**Web 终端 PTY 打包修复** 和 **子代理容器执行** 是最值得关注的功能进展。

---

## 2. 版本发布

### v0.23.4
- **破坏性变更**：移除了可配置的消息前缀过滤，符合条件的消息现在遵循正常的发送者、群组、提及和配对策略，不再依赖前缀。([#11571](https://github.com/QwenLM/qwen-code/issues/11571))

### cua-driver-rs v0.20.8 / v0.20.7
- Qwen CUA Driver 预编译二进制更新。
- **macOS**：已签名 + 公证的通用二进制 + `QwenCuaDriver.app`
- **Linux**：未签名（x86_64 + arm64，glibc 2.31 起）
- **Windows**：未签名 UIAccess worker + 原生 SDK payload（x86_64 + arm64）

---

## 3. 社区热点 Issues（10 条）

### #11500 — TUI 静默退出：React #185 导致进程直接掉回 shell
- **优先级**：P1 | **评论**：13 | **👍**：1
- 多个后台 agent 同时完成时，Ink `useBoxMetrics` 布局监听器触发 `setState` 循环，TUI 无错误输出直接崩溃。这是当前**评论数最高**的 issue，且 #11849/#11873 等后续 issue 均指向同一根因。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11500)

### #11590 — 非 Qwen 模型因自动 metadata 字段导致 400 错误（已关闭）
- **优先级**：P1 | **评论**：8
- Qwen Code 向 DashScope 聚合网关发送请求时，顶层自动注入 `metadata` 对象；非 Qwen 模型（如 `ZHIPU/GLM-5.3-Flash`）的厂商后端期望 `metadata` 为 string，反序列化失败导致模型完全不可用。删除该字段后请求正常。**兼容性陷阱，影响面大**。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11590)

### #11834 — 对话时 API 400 错误："function parameters is empty"
- **优先级**：P1 | **评论**：6
- 用户反馈发送"你好"即报 `400 invalid params, function parameters is empty (2013)`，且 `/update` 显示已是最新版。疑似与函数调用参数生成有关。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11834)

### #11556 — vscode-ide-companion 0.23.1 在 Remote-SSH 下无法使用
- **优先级**：P1 | **评论**：6
- Webview 卡在加载界面。客户端 x64 与服务器 arm64 架构组合下触发，影响远程开发用户。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11556)

### #11849 — 0.23.3 间歇性静默崩溃，疑似后台 shell/子代理完成时触发
- **优先级**：P1 | **评论**：5
- 长时间工作后更容易出现，无错误信息直接回到 bash，与 #11500 高度相关。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11849)

### #11887 — `--acp` 忽略审批模式，工具自动执行
- **优先级**：P2 | **评论**：4
- 即使设置 restrictive 模式，`session/request_permission` 从未发送到客户端，文件写入和 shell 命令直接执行。涉及 ACP 协议合规性，**安全风险值得关注**。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11887)

### #11872 — Web Terminal 报 "[Error: PTY not available]"
- **优先级**：P1 | **评论**：3
- `@lydell/node-pty` 声明为 optionalDependencies 但未打包，macOS 签名又阻止本地预编译加载。Web Terminal 在 `qwen serve` 中不可用。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11872)

### #11884 — `/extensions` 更新无进度、完成后不清除更新标记
- **优先级**：P2 | **评论**：3
- 更新运行期间界面无任何反馈（无 spinner、无状态文字），成功后又一直显示"可更新"。**扩展管理体验的典型交互缺陷**。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11884)

### #11851 — 安全：`isAsyncOperator` 将 `\r/\v/\f/\u00a0` 当作 bash 单词分隔符
- **优先级**：P1 | **评论**：3
- 权限规则解析器使用 JS `\s` 做向后扫描，导致 Bash allow 规则可能覆盖第二个命令。**权限绕过风险**。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11851)

### #11895 — `/review` 维度 agent 读取主 checkout 而非 PR worktree
- **优先级**：P1 | **评论**：2
- 同仓库 PR 审查时，agent brief 只提供 diff 的绝对路径，导致维度 agent 只能读取主 checkout，无法获得 worktree 上下文。审查准确性受影响。
- [查看详情](https://github.com/QwenLM/qwen-code/issues/11895)

---

## 4. 重要 PR 进展（10 条）

### #11881 — 修复 standalone 包缺少 node-pty 预编译（已合并）
- 解决 Web 终端 PTY 不可用问题：esbuild 将 node-pty 保持 external，但 standalone 归档未打包任何 prebuild，导致运行时找不到模块。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11881)

### #11711 — 子代理容器执行支持
- 新增 `QWEN_AGENT_EXECUTION_BACKEND=docker|podman` 环境变量，普通子代理可在容器中执行。支持 `executionBackend: container` 的强制声明。**安全隔离的重要方向**。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11711)

### #11830 — WebShell 侧边栏展示 Qwen Live 任务
- 在默认目录中正确展示 Qwen Live 任务，支持 Tasks、Session Overview、Split View 选择器和工作区计数，同时保留来源归属，并隐藏不可用的删除/归档操作。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11830)

### #11835 — 修复 useBoxMetrics 循环保护依赖机器速度的问题
- 将循环保护从"墙钟时间"改为"提交计数"触发，使 measure→commit→measure 振荡在任何机器上都能被终止，而不是只在快速机器上生效。**直指 #11500 根因**。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11835)

### #11614 — Linux bwrap 内核沙箱后端
- 新增 Bubblewrap 沙箱后端，无需容器运行时、root 权限或守护进程即可约束 agent。默认不启用，不影响现有平台。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11614)

### #11893 — 修复 review cleanup 测试在 Windows 上的失败
- Mock `realpathSync`，使 R30-6 调用计数断言只测量生产代码，消除 Windows 文件系统路径解析差异。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11893)

### #11163 — WebShell 工作区分支选择器管理 Git remotes
- 从侧边栏 git pill 或 composer 分支入口打开 **Manage Remotes** 面板：查看 fetch/push URL、添加远端、双确认删除。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11163)

### #11807 — 修复 settings.json BOM 导致设置被误重置
- 带 UTF-8 BOM 的 `~/.qwen/settings.json` 会被 `JSON.parse` 失败，进入损坏恢复流程，导致用户设置被清空。此 PR 在解析前剥离 BOM。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11807)

### #11134 — macOS E2E shard 偶发全绿死亡增加预算门控重试
- 为 macOS E2E 增加与 Linux 相同的单次预算门控重试，应对瞬态 shard 死亡。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/11134)

### #9305 — VP 模式内容底部对齐
- 当对话内容少于视口高度时，内容底部对齐，空白区域移到底部，消除最后消息与输入框之间的缝隙。
- [查看详情](https://github.com/QwenLM/qwen-code/pull/9305)

---

## 5. 功能需求趋势

从本周 issue 和 PR 中可提炼出以下社区重点关注方向：

- **容器 / 沙箱执行**：`#11711` 容器执行、`#11614` bwrap 内核沙箱，以及 `#11887` 对 ACP 审批模式的关注，表明用户对 **agent 隔离和权限控制** 的需求在上升。
- **Web Shell 与远程开发体验**：`#11556` Remote-SSH、`#11872` Web Terminal、`#11163` Git remotes 管理，远程场景的完整性和稳定性是高频词。
- **扩展机制成熟度**：`#11884` 更新无进度、`#11885` 卸载失败、`#11883` Windows EPERM，扩展安装/更新/卸载的生命周期管理被集中吐槽。
- **审查 / CI 自动化**：`#11895` review worktree 上下文、`#11857` 跳过未变更 diff 的复审、`#11893` Windows 测试修复，开发流程自动化持续被打磨。
- **模型兼容性**：`#11590` metadata 导致非 Qwen 模型 400、`#11894` DeepSeek flash 模型 token 限制错误，第三方模型接入的兼容层仍是痛点。

---

## 6. 开发者关注点

- **TUI 静默崩溃是当前最大痛点**：`#11500/#11849/#11873` 三个 issue 共同指向同一 React #185 根因，报错无提示、直接掉回 shell，严重影响长任务使用。
- **Windows 平台问题集中爆发**：`#11817` 测试失败、`#11883` 扩展 EPERM、`#11848/#11877` NTFS 文件 ID 比较失败，Windows 下文件操作和权限处理的可靠性明显不足。
- **安全解析逻辑需要更多审查**：`#11851` 字符类判断问题、`#11815` 注释内分割错误、`#11882` 两个 splitter 逻辑不一致，命令解析的边界情况处理受关注。
- **配置与管理反馈缺失**：`#11884` 扩展更新无进度、`#11834` 400 错误无定位信息，开发者对"操作反馈透明""错误信息可诊断"有较高期待。
- **跨会话与后台任务治理**：`#11840` 默认开启跨会话消息、`#11270` 后台 agent 超时、`#11878` 独立会话展示，后台任务的生命周期和可观测性正成为新的聚焦点。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*