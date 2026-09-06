# AI CLI 工具社区动态日报 2026-09-06

> 生成时间: 2026-09-06 01:47 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-06）

## 1. 生态全景

当前 AI CLI 工具竞争已从"单点代码生成"转向"完整开发闭环"——会话状态管理、后台自动化、插件扩展、跨平台稳定性成为各工具抢占的高地。明显的信号是：**社区对"可控性"的关注度超过了对"模型能力"本身**，包括模型选择可预测性、会话回溯能力、工具调用透明度、沙箱边界确定性。同时，MCP 生态的互操作性问题（schema 兼容、工具列表刷新、序列化）在多个工具中集中爆发，说明行业仍处于基础设施初建阶段。各工具普遍面临 Windows 兼容性短板，为差异化竞争留出空间。

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 动态 | 今日 PR 动态 | Release |
|---|---|---|---|
| Claude Code | 热点议题 8+，最高 👍 369；Function Hooks 提案 3 天 112 评论 | 未披露活跃 PR | 无新版本 |
| OpenAI Codex | 热点议题 10 个；/rewind 功能请求获 212 👍 | 10 个 PR 推进（语音基础设施/Bazel/worktree） | 无新版本 |
| Gemini CLI | 热点议题 10 个；优先级 P1/P2 问题密集 | 4 条活跃 PR（模型改写修复竞速） | v0.60.0-nightly.20260906 |
| Copilot CLI | 19 条 Issue 更新；最高 👍 28 | 无 PR 合入 | 无新版本 |
| Kimi Code | 仅 2 个活跃 Issue | 无 PR | 无新版本 |
| OpenCode | 热点议题 10 个；Memory Megathread 140 评论 | 10 个 PR（skill 权限/时间线/TUI 性能） | 无新版本 |
| Qwen Code | 热点议题 10 个；P1 级问题 3 个 | 未单独统计，但随 Release 同步合入 | v0.23.1-preview.0 + v0.23.0-nightly |

> 注：Claude Code 与 Copilot CLI 未单独披露 PR 数，表中以已知信息为准。

**解读**：OpenCode、OpenAI Codex、Qwen Code 处于攻城略地式的快速迭代期（PR 密集）；Claude Code 靠社区声量维持高位（369 👍 的 feature request）；Gemini CLI 在修关键 bug 上动作快（双 PR 竞速同一问题）；Kimi Code 明显处于静默期。

## 3. 共同关注的功能方向

### 3.1 会话生命周期管理（呼声最高）
- **OpenAI Codex**（#11626，212 👍）：原生 `/rewind` 同时还原对话与代码状态
- **Copilot CLI**（#1857，28 👍）：取消/管理已排队消息；空闲自动 compaction（#4724）
- **Qwen Code**（#11119/#11118）：后端会话回收时任务丢失、僵尸会话无法回收
- **OpenCode**（#47552）：时间线共享会话历史

### 3.2 后台自动化任务的可见性
- **Qwen Code**（#5823）：cron 任务静默触发，模型无法查看/停止自己的定时任务
- **OpenCode**（#47479）：Agent 需要用户响应时 Web UI 应推送浏览器通知
- **Copilot CLI**（#4732）：执行中任务的进度与中断对用户不可预期

### 3.3 MCP / 工具生态可靠性
- **Copilot CLI**（#4731）：被取消的工具调用阻塞 `tools/list`，导致 MCP 工具永久丢失
- **OpenCode**（#46628/#47542）：root 级 anyOf/oneOf 导致 Anthropic API 400
- **Gemini CLI**（#28074）：MCP 客户端不声明 elicitation 能力

### 3.4 模型行为透明性与可控性
- **Gemini CLI**（#29213）：显式指定 `gemini-2.5-flash` 被静默改写为 3.5-flash
- **Copilot CLI**（#4735）：工具调用前的用户可见文本被错误折叠为 "Thought"
- **Claude Code**（#91188）：auto-memory 压缩阈值不可配置

### 3.5 资源占用与稳定性
- **Copilot CLI**（#4725）：Linux 下内存达 3.9GB 导致 OOM 崩溃
- **OpenCode**（#20695/#47553）：Memory Megathread 140 条评论；sidecar 进程 OOM
- **Gemini CLI**（#26588）：约 1000 文件列表时 OOM 崩溃
- **Claude Code**（#53247）：Windows Desktop 启动失败 4 个月未修复

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 插件深度扩展（Function Hooks 提案）、多账户管理 | 追求可编程性的开发者、深度依赖插件生态的用户 | 在现有 hooks/plugins 基础上构建 Express/Koa 式中间件模型 |
| **OpenAI Codex** | 会话回溯（/rewind）、语音基础设施、多端协作 | ChatGPT Pro 用户、移动办公场景 | 密集投入 WebRTC 语音 + Bazel 构建 + worktree 托管，打造跨端一致体验 |
| **Gemini CLI** | 子代理自主性、模型路由正确性、AST 感知代码库映射 | Vertex AI 企业用户、多后端（Gemini/Vertex）使用者 | 依赖 Gemini 模型本身推理能力，通过小步快修（夜版 + 双 PR 竞速）维持质量 |
| **Copilot CLI** | GitHub 生态深度集成、企业级安装/更新管理 | 深度绑定 GitHub 工作流的开发者、企业用户 | 依托 Desktop App 形态，将 CLI 作为会话入口，强调与 GitHub 工具链一致性 |
| **Kimi Code** | 第三方 Coding Agent 集成（作为后端替代）、VS Code 扩展 | 使用 Kimi K2 模型 + 已有 agent 工作流的用户 | 非独立生态路线，走"模型后端"路线，文档和 IDE 插件体验是当前短板 |
| **OpenCode** | 开源社区的激进迭代、2.0 架构升级（时间线会话/渲染器帧） | 偏好开源、愿意尝试新架构的开发者 | 快速合入社区 PR（kitlangton/SeashoreShi 等），从 CLI 向桌面/Web 全平台扩张 |
| **Qwen Code** | Web Shell 平台化、会话导出/分享、后台自动化（cron/goal/monitor） | 需要 Web 远程开发、自动化工作流的开发者 | 将 Web Shell 作为核心交互载体，重推动态工作流可视化与平台整合 |

## 5. 社区热度与成熟度

- **声量最大**：**Claude Code**。单 issue 获 369 👍，功能提案 3 天 112 评论，反映了庞大的用户基数和高度参与度。但其 Windows 稳定性和 auth 领域 backlog 也说明团队交付能力滞后于社区期待。
- **最活跃的新锐**：**OpenCode**。尽管 Memory/CPU 问题被长期置顶（140 评论），但 10 个高质量 PR 密集合入，社区贡献者活跃（多个 PR 来自外部开发者），属于"有问题但高速迭代"的早期成长阶段。
- **战略投入型**：**OpenAI Codex**。PR 集中在语音基础设施和 worktree 等中度复杂系统能力，方向明确但尚未形成社区生态壁垒。212 👍 的 /rewind 是明显的需求信号。
- **修复驱动型**：**Gemini CLI**。社区体量中等（issue 评论普遍 3-15 条），团队响应速度快（模型改写问题当日双 PR 应对），但维护者仅标记（maintainer only）的问题较多，开放协作度有限。
- **生态静默期**：**Kimi Code**。仅 2 个活跃 Issue、无 PR，与其他工具差距明显，可能处于团队内部冲刺阶段，社区投入度待观察。
- **平稳成熟型**：**Copilot CLI**。Issue 更新量大（19 条）但高赞功能（28 👍）上限较低，PR 无合入，结合版本无发布，判断处于稳定维护期；自动更新破坏会话（#4728）等 bug 暴露了企业级更新机制的痛点。
- **平台转型期**：**Qwen Code**。保持每日版本节奏，但 P1 问题数最多（3 个），且集中在会话回收、导出文件体积等平台化过程中的系统工程问题，属"投入大、阵痛也大"的阶段。

## 6. 值得关注的趋势信号

1. **"可编程 Agent"成为新竞争维度**：Claude Code 的 Function Hooks（3 天 112 评论）和 OpenCode 的 skill 资源权限修复，都指向一个方向——用户不满足于"用模型"，而是想**改造 Agent 本身**。插件体系很可能成为下一代 AI CLI 的核心壁垒。

2. **会话时间旅行是最大公约数需求**：Codex 的 /rewind、Copilot 的队列管理、Qwen 的会话回收、OpenCode 的时间线共享——四家同时押注"历史可回溯、状态可恢复"。对开发者而言，**优先选择会话模型设计更优雅的工具**，能显著降低长任务焦虑。

3. **后台自动化正在制造"影子系统"**：Qwen 的 cron 静默触发、Copilot 的排队消息不可取消、OpenCode 的 Agent 等待用户响应无提醒，都说明**自动化任务治理**（查看/取消/审计/通知）尚未成熟。如果您的团队依赖定时任务或长时运行 Agent，请务必验证该工具的可见性和可控性。

4. **MCP 互操作性仍是最脆弱环节**：从 Copilot 的 `tools/list` 永久丢失到 OpenCode 的 schema 400，再到 Gemini 的 elicitation 缺失，MCP 工具接入的边界情况仍大量出现。**评估任何工具时，建议用您实际使用的 MCP 服务器跑一轮真实验证**，而非只看文档。行业距离"插件即插即用"仍有距离。

5. **Windows 稳定性是普遍短板，也是机会窗口**：Claude（启动失败 4 个月未修）、Codex（宠物热区失步）、Copilot（沙箱不可用）、Gemini（OOM 崩溃）、OpenCode（sidecar OOM）——Windows 上的问题频发已成为共性。**Windows 重度用户应降低对当前版本稳定性的预期**，保留降级路径。

6. **资源消耗失控成为信任杀手**：OpenCode 空闲 CPU 50%、Copilot 内存 3.9GB OOM、Gemini 千文件列表 OOM、Qwen 导出文件 19.5MB——多工具在资源管理上失守。**在 CI/长驻场景中，建议为 CLI 工具设置内存上限和超时保护**，防止单个会话拖垮整个开发环境。

7. **模型路由透明度正在从"nice-to-have"变为"must-have"**：Gemini 将 2.5-flash 静默改写为 3.5-flash，Copilot 在更新后突发切换模型导致任务中断——开发者对"底层调用哪个模型、能否固定版本"的掌控欲显著增强。**若您的业务依赖特定模型行为，请关注工具的 model pinning 能力**，并留意版本升级公告中的路由策略变更。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-06）

## 1. 热门 Skills 排行

以下 PR 按仓库讨论热度排序，当前均处于 **open** 状态。

| Skill / PR | 功能 | 社区关注点 | 状态 |
|---|---|---|---|
| [skill-creator 修复：run_eval.py 0% recall](https://github.com/anthropics/skills/pull/1298) | 修复技能评估脚本，将 eval artifact 安装为真实 skill，并修复 Windows 流读取、触发检测和并行 worker 问题 | 直接关联 issue #556（10+ 次复现），skill 描述优化循环一直在针对「噪声」优化，是当前 skill-creator 工具链最严重的可靠性问题 | open |
| [document-typography 技能](https://github.com/anthropics/skills/pull/514) | 对 AI 生成文档做排版质量检查：孤行、寡行、标题滞留页底、编号错位等 | AI 生成文档普遍存在排版问题，用户很少主动要求但影响交付质量，社区认可度高 | open |
| [scnet-hpc 技能](https://github.com/anthropics/skills/pull/1615) | 通过 profile 化 SSH + Slurm 工作流操作 SCNet HPC 集群 | 覆盖连接、分区、内存、模块、加速器指导，面向科研/HPC 场景的垂直 skill | open |
| [pdf 技能修复：大小写敏感文件引用](https://github.com/anthropics/skills/pull/538) | 修复 `skills/pdf/SKILL.md` 中 8 处大小写不一致（`REFERENCE.md` → `reference.md`） | 在大小写敏感文件系统上直接导致 skill 资源加载失败，属于基础可靠性修复 | open |
| [ODT 技能](https://github.com/anthropics/skills/pull/486) | 创建/填充 OpenDocument 文本文件（.odt/.ods），并可解析 ODT 为 HTML | 补充了 LibreOffice/ISO 标准文档格式支持，企业文档场景需求明确 | open |
| [frontend-design 技能改进](https://github.com/anthropics/skills/pull/210) | 重写 frontend-design skill，提升清晰度、可操作性和内部一致性 | 讨论重点：让 skill 指令在单次对话中真正可执行，避免空泛设计原则 | open |
| [skill-quality-analyzer 与 skill-security-analyzer](https://github.com/anthropics/skills/pull/83) | 新增两个 meta skill：技能质量分析、技能安全分析 | 社区对 skill 质量评估和安全审计有强烈需求，与 issue #492 安全信任问题呼应 | open |
| [docx 技能修复：tracked change w:id 冲突](https://github.com/anthropics/skills/pull/541) | 修复 DOCX 技能对已有 bookmark 文档添加修订时导致的文档损坏 | OOXML 中 `w:id` 共享 ID 空间，硬编码低 ID 会与现有 bookmark/comment 冲突，影响企业文档协作 | open |

## 2. 社区需求趋势

从 Issues 看，社区最期待的方向集中在以下几类：

- **安全与信任边界**  
  [#492 社区技能在 anthropic 命名空间下分发](https://github.com/anthropics/skills/issues/492) 是最热门 issue，社区担心非官方 skill 伪装成官方技能，引发权限滥用。安全审计类 skill 成为刚需。

- **企业级共享与治理**  
  [#228 组织级技能共享](https://github.com/anthropics/skills/issues/228) 期望能直接分享 skill 到 org，而不是手动下载/上传文件。同时 [#412 agent-governance 技能提案](https://github.com/anthropics/skills/issues/412) 希望引入策略执行、威胁检测、审计追踪等治理能力。

- **工具链可靠性**  
  多个 issue 集中在 skill 开发/评估工具不可用：  
  - [#556 run_eval.py 0% 触发率](https://github.com/anthropics/skills/issues/556)  
  - [#1390 mcp-builder 评估脚本 0/N](https://github.com/anthropics/skills/issues/1390)  
  - [#1362 web-artifacts-builder 构建失败](https://github.com/anthropics/skills/issues/1362)  

- **上下文窗口效率**  
  [#1487 claude-api 技能注入约 156k tokens](https://github.com/anthropics/skills/issues/1487)、[#189 重复技能占用上下文](https://github.com/anthropics/skills/issues/189)、[#1329 compact-memory 技能提案](https://github.com/anthropics/skills/issues/1329) 都指向同一诉求：减少 token 浪费，提升长任务记忆效率。

- **与 MCP / Bedrock 等生态集成**  
  [#16 将 Skills 暴露为 MCP](https://github.com/anthropics/skills/issues/16) 和 [#29 在 Bedrock 中使用 Skills](https://github.com/anthropics/skills/issues/29) 反映社区希望 Skill 能成为跨平台、标准化工具协议的一部分。

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、功能完整，若合并将显著扩展官方 Skill 生态：

| PR | 说明 | 链接 |
|---|---|---|
| document-typography | AI 文档排版质量控制，覆盖面广、痛点明确 | [PR #514](https://github.com/anthropics/skills/pull/514) |
| scnet-hpc | HPC 集群操作技能，面向科研计算垂直场景 | [PR #1615](https://github.com/anthropics/skills/pull/1615) |
| ODT skill | OpenDocument 文档创建/解析，补齐办公格式支持 | [PR #486](https://github.com/anthropics/skills/pull/486) |
| testing-patterns | 完整测试方法论：Trophy 模型、单测、React Testing Library、E2E | [PR #723](https://github.com/anthropics/skills/pull/723) |
| ServiceNow platform skill | 覆盖 ITSM、ITOM、SecOps、ITAM/SAM、FSM、SPM 等企业平台 | [PR #568](https://github.com/anthropics/skills/pull/568) |
| pyxel 游戏开发 skill | 面向 Pyxel 复古游戏引擎的 MCP 工作流 | [PR #525](https://github.com/anthropics/skills/pull/525) |
| Hivemind 多智能体编排 | 零成本将机械工作委托给开源/免费模型 worker | [PR #1628](https://github.com/anthropics/skills/pull/1628) |
| Buffer GraphQL API skill | 社交排程技能，面向社媒运营自动化 | [PR #1627](https://github.com/anthropics/skills/pull/1627) |
| self-audit 质量门禁 | 机械文件验证 + 四维推理审计，交付前自动检查 | [PR #1367](https://github.com/anthropics/skills/pull/1367) |

## 4. Skills 生态洞察

**当前社区最集中的诉求是：让 Skills 生态更安全、更可靠、更节省上下文——安全命名空间与权限边界、可用的评估调试工具链、企业级共享治理，以及更克制的 token 注入。**

---

# Claude Code 社区动态日报（2026-09-06）

## 今日速览

过去 24 小时无新版本发布，社区焦点集中在两件事：一是 **Function Hooks 提案**（#91870）发布仅 3 天即获 112 条评论，折射出开发者对插件深度扩展能力的强烈渴望；二是 **多 Connector 账户支持**（#27302）以 369 个 👍 稳居最受期待功能榜首。与此同时，Windows 平台问题持续高发，Desktop 启动失败、MSIX 安装异常、沙箱权限缺陷等多条 issue 仍在发酵，Fable 5.1 模型的 token 消耗与模型路由问题也引发关注。

## 社区热点 Issues

### 1. 多 Connector 账户支持（话题之王）
**[FEATURE] Support multiple Connector accounts in Claude and Claude Code on the web** — #27302
- 242 条评论 / 369 👍 / 开放中 / area:auth
- 自 2 月提出以来持续是社区最高呼声的功能，同一 Connector 对接多个账户的需求长期未得到满足，已在 auth 领域形成显著 backlog。
- 👉 https://github.com/anthropics/claude-code/issues/27302

### 2. Function Hooks —— 让插件强大 10 倍
**[enhancement] Function Hooks - make plugins 10x more powerful** — #91870
- 112 条评论 / 72 👍 / 开放中 / area:hooks, area:plugins
- 9 月 3 日提出的新提案，3 天内评论破百。主张通过带副作用追踪的 `$` 参数对象 + Express/Koa 式 `next` 续延模型，让插件深度改造 Claude Code 的同时保持安全性，是近期最具想象力的扩展性设计。
- 👉 https://github.com/anthropics/claude-code/issues/91870

### 3. Windows 上 Claude Desktop 彻底无法启动
**[BUG] Claude Desktop fails to launch on Windows — orphaned Silo / Job Object** — #53247
- 66 条评论 / 29 👍 / 开放中 / platform:windows, area:desktop
- 应用崩溃后遗留 Silo/Job Object，导致后续启动全部失败（HRESULT 0x80070020），只能注销或重启系统恢复。4 月报告至今未修复，是 Windows 用户最痛的点之一。
- 👉 https://github.com/anthropics/claude-code/issues/53247

### 4. 窗口强制置顶的"高赞但被关闭"
**[BUG] Claude Desktop window stays always on top on Windows** — #87895
- 17 条评论 / 72 👍 / 已关闭（invalid）
- 大量用户遇到窗口无法取消置顶的问题，虽获 72 个 👍，但被官方标记为 invalid 关闭。社区反应与官方判定存在明显分歧，值得留意后续是否重启讨论。
- 👉 https://github.com/anthropics/claude-code/issues/87895

### 5. MEMORY.md 压缩阈值不可配置
**[Feature request] make auto-memory MEMORY.md compaction reminder threshold configurable** — #91188
- 24 条评论 / 开放中 / area:memory
- 当前 auto-memory 硬编码 200 行 / 25KB 的压缩提醒阈值，用户希望可配置或单独静默，涉及记忆管理核心体验。
- 👉 https://github.com/anthropics/claude-code/issues/91188

### 6. Cowork 沙箱阻断 git 写操作
**[BUG] Cowork on Windows: bash sandbox can create files but unlink is denied** — #55206
- 15 条评论 / 11 👍 / 开放中 / platform:windows, area:sandbox
- 挂载宿主目录中可创建文件但无法 unlink，导致所有 git 写操作失败，且影响 macOS 与 Windows 双平台。附带完整复现步骤，严重阻碍 Cowork 日常使用。
- 👉 https://github.com/anthropics/claude-code/issues/55206

### 7. OAuth 凭据被并发会话清空
**[BUG] claudeAiOauth wiped from Keychain when concurrent Desktop sessions race the single-use refresh token** — #88583
- 6 条评论 / 开放中 / platform:macos, area:auth
- 并发 Desktop 会话竞争 single-use refresh token，刷新失败会把胜者的轮换凭据一并清空。报告者还指出 #84331 / #83345 / #83834 均为同一 corruption 签名，但此前只修了 MCP 凭据（v2.1.136），认证凭据的同类竞态至今未修复。
- 👉 https://github.com/anthropics/claude-code/issues/88583

### 8. HTTP 传输 MCP 工具"幽灵不可达"
**[BUG] HTTP-transport MCP server tools unreachable despite /mcp showing connected**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-06）

## 今日速览
过去 24 小时没有新版本发布。社区讨论焦点集中在 Windows 桌面端（宠物交互、历史记录）和配额/容量错误；PR 方面则密集推进语音基础设施与 Bazel 构建链路。最受关注的是 #11626 提出的原生 `/rewind` 检查点恢复功能，已获 212 👍、41 条评论，反映出开发者对会话回溯与代码回滚一体化的强烈需求。

---

## 社区热点 Issues

### 1. [CLI] 添加 `/rewind` 检查点恢复，同时还原对话上下文与代码编辑
**#11626** | 评论 41 | 👍 212  
用户希望原生 `/rewind` 流程能同时恢复会话状态和工作区中被 Codex 修改的文件，目前 Esc 只能回退对话。这是当前社区呼声最高的功能请求。  
🔗 https://github.com/openai/codex/issues/11626

### 2. [Desktop][Windows] 分页线程历史因重复序号停滞，但任务实际已完成
**#41079** | 评论 28 | 👍 2  
Windows 桌面端部分分页线程只显示旧快照，而底层 JSONL 包含全部最新消息和完成状态。属历史投影问题，并非删除数据。  
🔗 https://github.com/openai/codex/issues/41079

### 3. [Windows] 宠物悬停命中区域随时间与可见宠物失步
**#34227** | 评论 27 | 👍 3  
Windows 桌面宠物 overlay 的点击热区逐渐偏离实际显示位置，影响交互。该问题与另一条“宠物无法拖拽”的问题同为桌面宠物回归。  
🔗 https://github.com/openai/codex/issues/34227

### 4. [App] 内置图像生成在 7 月 9 日更新后反复网络错误
**#32297** | 评论 26 | 👍 9  
多用户反馈图像生成功能更新后持续报网络错误，影响正常使用，疑似与客户端网络处理或后端路由变化有关。  
🔗 https://github.com/openai/codex/issues/32297

### 5. [Windows][WSL] Browser Use / Node REPL 因 `sandboxCwd` 映射错误失败
**#29639** | 评论 20 | 👍 7  
桌面应用在 WSL 工作区下自动生成的 `node_repl` MCP 服务器使用 Windows 版二进制，但工具调用携带 Linux/WSL 路径，导致 REPL 无法运行。  
🔗 https://github.com/openai/codex/issues/29639

### 6. [App] ChatGPT Pro 频繁遭遇“Selected model is at capacity”
**#41790** | 评论 15 | 👍 9  
Pro 用户在执行普通任务时频繁遇到所选模型容量已满的错误，即使已订阅 Pro 仍被强制中断，严重影响使用体验。  
🔗 https://github.com/openai/codex/issues/41790

### 7. [Windows] 宠物无法拖拽，包括默认宠物
**#34309** | 评论 13 | 👍 10  
Codex 26.715.4045 上所有宠物都无法拖拽，此前的 26.715.2305 正常。重启、重置、切换均无效，为 Windows 专属回归。  
🔗 https://github.com/openai/codex/issues/34309

### 8. [Android Remote] 大型空闲任务无法发起新回合，`turn/start` 30 秒超时
**#38023** | 评论 12 | 👍 2  
Android 远程访问大型长任务时，任务视图无法加载，发送消息会超时失败。同一任务在桌面端可正常操作，说明移动端通讯存在缺陷。  
🔗 https://github.com/openai/codex/issues/38023

### 9. [iOS] 移动端间歇性无法打开正在运行的 Codex 任务
**#28340** | 评论 6 | 👍 12  
iOS 上打开远程运行中的任务会偶发失败，已上传反馈包。该问题影响移动端核心使用场景，获得较多社区👍。  
🔗 https://github.com/openai/codex/issues/28340

### 10. [Sandbox] “Full Access” 模式仍弹出权限提示，或需 YOLO 模式
**#16759** | 评论 11 | 👍 1  
VS Code 扩展在 Full Access 下依然出现权限确认框，用户认为该设置形同虚设，建议提供无确认的 YOLO 模式。该议题虽已被关闭，但讨论仍活跃。  
🔗 https://github.com/openai/codex/issues/16759

---

## 重要 PR 进展

### 1. 为 TUI 会话命令增加托管 worktree 创建
**#43120**  
新增 `/worktree` 命令，可开启新会话或从当前会话 fork 到新的受管 checkout；`/new` 与 `/fork` 也支持选择当前目录或新建 worktree。  
🔗 https://github.com/openai/codex/pull/43120

### 2. 通过 Bazel targets 暴露 Windows 原生构建工具
**#43126**  
修复 MSVC 运行时和 Windows SDK 在 setup 时丢弃工具二进制的问题，使 Bazel 使用方可以取用原生 MSVC 工具链。  
🔗 https://github.com/openai/codex/pull/43126

### 3. 通过 app server 保存 subagent 与 memory 选项
**#43113**  
TUI 中的子代理和记忆启用提示改为通过服务端配置写入新线程，并给出成功/覆盖/失败反馈。  
🔗 https://github.com/openai/codex/pull/43113

### 4. 在会话历史中记录 reasoning effort 变化（默认关闭）
**#43110**  
新增 `reasoning_effort_override` 特性，在启用 `use_responses_lite` 的模型上，把接受的输入后的 reasoning effort 调整以 `configuration_update` 写入历史。  
🔗 https://github.com/openai/codex/pull/43110

### 5. 将 Guardian 线程上下文迁移至 `guardianv2` 配置
**#43104**  
用 `features.guardianv2.thread_context` 替代 `features.guardian_thread_context`，统一同步/异步 Guardian 的线程上下文管理，默认关闭。  
🔗 https://github.com/openai/codex/pull/43104

### 6. 语音主机增加有界 Opus RTP 入站处理
**#43100**  
在进入上游 track 队列前拦截入站 Opus RTP，保留到达时间戳且不二次缓存；限制积压为 64 包 / 2 MiB，单包 64 KiB。  
🔗 https://github.com/openai/codex/pull/43100

### 7. 新增 helper 支持的实时 WebRTC 会话 API
**#43097**  
引入 `RealtimeWebrtcSession` 及句柄，支持启动、answer 协商、音频控制、电平表与错误报告；在 answer 后打开设备并应用最新控制。  
🔗 https://github.com/openai/codex/pull/43097

### 8. 语音主机将处理后麦克风音频通过 RTP 发送
**#43090**  
此前 `voice-host` 仅本地采集不发送给对端；本 PR 将采集与渲染重采样连接到出站媒体轨，并保留静音边界、限制陈旧音频。  
🔗 https://github.com/openai/codex/pull/43090

### 9. 语音 helper 支持可选本地音频设备
**#43079**  
在 helper 协议中新增 `openDevices` 与 `setAudioControls`，在运行时初始化和传输协商后打开默认麦克风/扬声器，初始为静音抑制状态，支持 macOS/Linux/Windows。  
🔗 https://github.com/openai/codex/pull/43079

### 10. apps 弹窗加载失败时显示可重试错误
**#43074**  
修复 `/apps` 请求首次失败且无缓存/部分应用列表时一直显示“Loading apps...”的问题，改为显示失败信息并提供 Retry 按钮。  
🔗 https://github.com/openai/codex/pull/43074

---

## 功能需求趋势

从近 24 小时的 Issues 中可提炼出以下社区最关注的功能方向：

- **会话生命周期与回溯**：`/rewind`、历史分页同步、多端消息合并是当前最热门需求，用户希望 Codex 能可靠地回到任意检查点，并保持对话与代码状态一致。
- **Windows 桌面体验**：宠物交互、插件选择器、首次启动时间等 Windows 专属问题高频出现，说明桌面版在 Windows 上的稳定性仍是短板。
- **配额与速率限制灵活性**：多个 Issue 要求取消或放宽 5 小时滚动上限，支持“周配额池”模式；同时希望模型容量错误不打断任务。
- **远程/移动端协作**：Android/iOS 打开远程任务失败、线程列表缺少 agent 创建的子线程，移动端与桌面端的同步一致性需求上升。
- **权限与沙箱模式**：Full Access 仍弹确认框的问题被反复提及，社区希望增加真正的“无确认”模式或 yolo 模式

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-06

## 今日速览

今日发布 `v0.60.0-nightly.20260906.g85aca163f` 夜版，同步有两条 PR（#29217、#29222）竞相修复 "显式指定 gemini-2.5-flash 被静默改写为 gemini-3.5-flash" 的高优先级问题。社区对子代理结果可信度（MAX_TURNS 误报成功）、Auto Memory 质量与安全、模型选择可预测性的讨论最为集中。

## 版本发布

**v0.60.0-nightly.20260906.g85aca163f**
- 常规夜版迭代，无显著破坏性变更。
- 完整变更日志：[compare/v0.60.0-nightly.20260905...20260906](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260905.g85aca163f...v0.60.0-nightly.20260906.g85aca163f)

## 社区热点 Issues

### 1. #29213 — `--model gemini-2.5-flash` 被解析为 gemini-3.5-flash（Vertex 后端）
- **标签**: P2, kind/bug, area/core | 评论 5 | [链接](https://github.com/google-gemini/gemini-cli/issues/29213)
- **看点**: 用户显式固定的模型被 CLI 静默改写，使请求在无 3.5 Flash 权限的环境中直接失败。该 issue 与今日两条 PR 直接关联，是当前社区最受关注的问题。

### 2. #22323 — 子代理撞到 MAX_TURNS 却报 GOAL 成功
- **标签**: P1, kind/bug, area/agent, maintainer only | 评论 13 | 👍 2 | [链接](https://github.com/google-gemini/gemini-cli/issues/22323)
- **看点**: 评论数最高的历史 issue。`codebase_investigator` 子代理因最大轮数中断，却向上报告 `Termination Reason: "GOAL"`，导致父任务误判完成。反映子代理错误传播机制存在根本性缺陷。

### 3. #21968 — 模型几乎不主动使用 skills 与 sub-agents
- **标签**: P2, kind/bug, area/agent, maintainer only | 评论 6 | [链接](https://github.com/google-gemini/gemini-cli/issues/21968)
- **看点**: 社区 anecdotal 反馈：模型在未明确指示时基本不调用自定义技能和子代理，即使场景高度相关（如开发者提供了 gradle/git 技能描述）。是 "Agent 自主性" 方向的代表性议题。

### 4. #26588 — Gemini CLI OOM 崩溃
- **标签**: P1, kind/bug, area/core, 已关闭 | 评论 8 | [链接](https://github.com/google-gemini/gemini-cli/issues/26588)
- **看点**: 请求列出约 1000 个文件时内存耗尽崩溃（CLI v0.41.1 / Windows）。已关闭，但仍是性能反馈中的重要样本，说明大批量文件处理场景的资源管理有待加强。

### 5. #25783 — Edit 工具 CLI 输出与实际文件变更不一致
- **标签**: P1, kind/bug, area/agent | 评论 4 | 👍 1 | [链接](https://github.com/google-gemini/gemini-cli/issues/25783)
- **看点**: Agent 在终端展示的编辑内容与 GitHub 上的实际改动不符，直接影响用户对工具可信度的判断，属高频信任类问题。

### 6. #25166 — 简单 shell 命令完成后卡在 "Waiting input"
- **标签**: P1, kind/bug, area/core, maintainer only | 评论 4 | 👍 3 | [链接](https://github.com/google-gemini/gemini-cli/issues/25166)
- **看点**: 复现率高：普通命令执行完毕但终端仍显示活动并等待输入，影响自动化流程连续性。

### 7. #22745 — 评估 AST 感知文件读取/搜索/代码库映射的价值
- **标签**: P2, kind/feature, area/agent, maintainer only | 评论 7 | 👍 1 | [链接](https://github.com/google-gemini/gemini-cli/issues/22745)
- **看点**: EPIC 型 issue：探索通过 AST 感知工具减少误对齐读取、降低 token 噪声、提升代码库扫描效率。社区讨论积极，可能催生新工具设计。

### 8. #22672 — 代理应停止/劝阻破坏性行为
- **标签**: P2, kind/customer-issue, area/agent, maintainer only | 评论 3 | 👍 1 | [链接](https://github.com/google-gemini/gemini-cli/issues/22672)
- **看点**: 复杂 git 操作、数据库维护等场景下，模型倾向使用 `git reset`、`--force` 等危险命令。社区呼吁引入安全护栏机制。

### 9. #26525 — Auto Memory 日志缺少确定性脱敏
- **标签**: P2, kind/bug, area/security, maintainer only | 评论 5 | [链接](https://github.com/google-gemini/gemini-cli/issues/26525)
- **看点**: 本地 transcript 以明文形式送入后台抽取模型，脱敏指令发生在内容进入上下文之后，且部分技能数据可能被记录，属于典型隐私风险点。

### 10. #28074 — MCP 客户端不声明 elicitation 能力
- **标签**: P2, kind/enhancement, area/extensions, 已关闭 | 评论 5 | [链接](https://github.com/google-gemini/gemini-cli/issues/28074)
- **看点**: 当前 `mcp-client.ts` 仅声明 `roots`，不支持 MCP 规范的 form/url 两种 elicitation 方式。已关闭但相关增强需求预计会以其他形式回归。

## 重要 PR 进展

### 1. #29217 / #29222 — 修复显式固定 flash 模型被重写
- **标签**: P1+P2, area/core, area/agent, size/m, size/s | [链接](https://github.com/google-gemini/gemini-cli/pull/29217) · [链接](https://github.com/google-gemini/gemini-cli/pull/29222)
- **看点**: 面向 #29213 的两条竞品修复。`isFlashModel()` 用 `endsWith('flash')` 匹配过宽，把 `gemini-2.5-flash` 也纳入自动升级路径。两条 PR 均通过收紧匹配逻辑避免显式指定的模型被改写。

### 2. #29126 — a2a-server 修复 express.json 挂载顺序
- **标签**: area/unknown, size/s | [链接](https://github.com/google-gemini/gemini-cli/pull/29126)
- **看点**: 修复 #29073。`express.json()` 在 SDK 路由之后挂载导致 JSON-RPC 请求体为 `undefined`。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-06）

## 今日速览
过去 24 小时仓库无新版本与 PR 合入，但 Issue 更新活跃，共 19 条。其中新提交的高影响 bug 集中在自动更新破坏桌面 App（#4728）、升级后 Worktree 缺失（#4734）、Linux 内存溢出崩溃（#4725）三大方向；同时 MCP/工具调用相关的可靠性问题（#4731/#4729/#4721）密集出现。社区对 #1857（取消排队消息）的呼声最高，获 28 个 👍。

## 版本发布
过去 24 小时无新版本 Release。

## 社区热点 Issues
精选 10 个最值得关注的 Issue，覆盖高赞功能请求、回归 bug 及 MCP/工具生态问题。

1. **[#1857] 允许用户取消或移除已排队的消息**  
   作者: @dorlugasigal · 评论 11 · 👍 28  
   https://github.com/github/copilot-cli/issues/1857  
   目前当 Agent 忙碌或执行 `/compact` 时，通过 `Ctrl+Q`/`Ctrl+Enter` 加入队列的消息无法取消，只能等待依次执行。社区反馈强烈，希望加入队列管理能力（如取消、调整顺序），是当前最受关注的功能需求。

2. **[#4728] 自动更新重写 `copilot.exe`，导致桌面 App 会话全部失效**  
   作者: @doomslayer2k · 评论 0  
   https://github.com/github/copilot-cli/issues/4728  
   终端中运行 `copilot` 触发自动更新后，会重写正在运行的二进制文件，导致 GitHub Copilot 桌面 App 无法恢复任何现有会话，报 **"Session unavailable"**。属高影响安装/更新回归，需尽快处理。

3. **[#4725] Linux 平台频繁 JavaScript 堆内存不足**  
   作者: @jbulow · 评论 1  
   https://github.com/github/copilot-cli/issues/4725  
   在 Linux 上每隔几分钟即因 Mark-Compact 内存回收失败崩溃，内存占用已达约 3.9GB。对长时间运行的 CLI 会话稳定性影响严重。

4. **[#4734] 升级到 Desktop 2.98.0 / runtime 1.1.15 后，所有项目会话报 "Worktree missing"**  
   作者: @petrsnd · 评论 0  
   https://github.com/github/copilot-cli/issues/4734  
   升级后用户在新旧会话中均遇到 Worktree 丢失，需手动重建。疑似升级过程中的迁移 bug，影响所有 worktree-backed 项目。

5. **[#4735] 工具调用前的用户可见文本被错误折叠为 "Thought for Ns"**  
   作者: @Defiect · 评论 0  
   https://github.com/github/copilot-cli/issues/4735  
   当模型在同一轮中输出“推理块 + 多段用户可见文本 + 工具调用”时，文本块不会展示，而是被并入“Thought for Ns”折叠区。直接影响 AI 输出的可读性和透明度。

6. **[#4731] 被取消的工具调用阻塞 `tools/list` 刷新，导致 MCP 工具永久丢失**  
   作者: @tecrogue · 评论 0  
   https://github.com/github/copilot-cli/issues/4731  
   当对 stdio MCP 服务器的工具调用超时后，运行时立刻向同一服务器发送 `tools/list` 请求，而服务器仍被取消的任务占用，导致刷新超时，该服务器的工具在当前进程生命周期内全部消失。严重破坏 MCP 插件稳定性。

7. **[#4729] 内置 research Agent 要求子 Agent 调用不存在的 `github/get_me` 工具**  
   作者: @ayackel · 评论 0  
   https://github.com/github/copilot-cli/issues/4729  
   内置 research 子 Agent 的 prompt 与当前会话实际暴露的 GitHub MCP 工具不匹配，子 Agent 会先尝试反复协调工具不一致，浪费大量 token 并泄漏中间过程。

8. **[#4721] Canvas `open_canvas` 参数损坏——JSON-RPC 序列化 bug**  
   作者: @arisng · 评论 0  
   https://github.com/github/copilot-cli/issues/4721  
   CLI 在向 Canvas 扩展派发工具调用时，会拼接 `}{}` 后缀导致 JSON 解析失败，`open_canvas` 参数被截断并报 "Unexpected end of JSON input"。影响所有使用 Canvas 扩展的用户。

9. **[#4724] 空闲时间自动执行 Compaction，与模型 prompt 缓存 TTL 对齐**  
   作者: @travisbader · 评论 0  
   https://github.com/github/copilot-cli/issues/4724  
   功能提案：当前 Compaction 仅在 token 超阈值时触发，空闲数分钟后首轮请求需全量重读上下文，成本和延迟高。建议在空闲约 5 分钟（对齐 prompt cache TTL）时自动压缩。是提升长会话体验的重要方向。

10. **[#4652] Windows 25H2 上沙箱不可用：Sandboxing is enabled but is not supported on this host**  
    作者: @JohannesZahn · 评论 2  
    https://github.com/github/copilot-cli/issues/4652  
    最新 Windows 25H2 构建无法使用 `--experimental --sandbox`，会提示当前主机不支持沙箱化命令。影响 Windows 最新版本上的安全功能体验。

## 重要 PR 进展
过去 24 小时内无 PR 更新或合入。

## 功能需求趋势
从近期 Issue 中可提炼出以下社区关注方向：

- **会话控制与消息管理**：用户希望获得更细粒度的会话控制能力，包括取消/移除已排队消息（#1857），以及非交互模式下 `--interactive` 提示词可靠传递（#4723）。
- **上下文与内存优化**：除了 OOM 崩溃（#4725），社区建议引入基于空闲时间的自动 Compaction，减少 prompt 缓存失效后的全量重读开销（#4724），这已成为长会话场景的核心痛点。
- **MCP 与工具生态可靠性**：多起 Issue 指向 MCP 工具调用在超时、取消、序列化场景下的脆弱性，包括工具列表永久丢失（#4731）、参数被破坏（#4721）、Agent 提示词与工具不匹配（#4729）。开发者对 MCP 扩展的稳定性要求显著提高。
- **模型行为可预期性**：模型输出被错误折叠（#4735）、突发切换导致任务中断（#4732）等问题，反映了社区希望模型切换策略和输出展示逻辑更透明、可控。
- **更新与安装机制安全性**：自动更新重写运行中二进制（#4728）和升级引发回归（#4734）表明，用户对更新过程的安全性与回滚能力有更高期待。

## 开发者关注点
- **更新机制风险**：自动更新不应破坏正在运行的进程或桌面 App 的会话恢复能力（#4728），升级流程需要更充分的迁移验证（#4734）。
- **资源占用过高**：Linux 下接近 4GB 的内存占用导致频繁崩溃（#4725），是影响日常开发效率的明显短板。
- **MCP 工具调用的健壮性**：超时、取消后工具列表无法恢复（#4731）和 JSON-RPC 序列化错误（#4721）正在削弱 MCP 生态的可用性。
- **AI 行为透明度**：模型输出被折叠为“Thought”不展示（#4735），以及 Agent 调用不存在工具（#4729），让用户难以信任和调试 AI 行为。
- **企业配置与文档**：企业模型策略禁用但缺乏有效说明（#4272）使管理员难以排查，说明相关配置流程仍需改善。
- **平台兼容性**：Windows 最新版沙箱不可用（#465

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**日期：2026-09-06** | 数据来源：github.com/MoonshotAI/kimi-cli

---

## 1. 今日速览

今日社区共有 2 个活跃 Issue，其中一个关于第三方 Coding Agent 集成文档改进的 Issue（#1210）已在 9 月 5 日关闭，但讨论仍在继续；另一个新提交的 Issue（#2635）报告了 VS Code 扩展在渲染/复制层丢失字符的问题，目前尚未有官方回复。无新版本发布，也无 PR 更新。

---

## 2. 版本发布

无新版本发布。

---

## 3. 社区热点 Issues

> 注：当前仅 2 个 Issue 在过去 24 小时内更新，以下全部列出。

### #1210 [已关闭] 第三方 Coding Agent 使用文档需完善
- **作者**: @bosens-China | 创建于 2026-02-23 | 更新于 2026-09-05 | 评论：1 | 👍：0
- **链接**: https://github.com/MoonshotAI/kimi-cli/issues/1210
- **内容摘要**: 
  用户指出文档中关于在 Claude Code 中使用 Tab 键切换 Kimi K2 Thinking 模型的说明过于简略，且每次需要手动 `export` 环境变量的方式不够便捷。建议参考智谱的文档（docs.bigmodel.cn）提供更完善的配置说明和免导出的解决方案。
- **社区反应**: 该 Issue 作者上传了来自智谱的文档链接作为参考，表明用户对跨平台集成的文档质量有较高期待。虽已关闭，但此类反馈会持续影响官方文档迭代。

### #2635 [开放] VS Code 扩展：流式聊天文本在渲染/复制层丢失字符
- **作者**: @TserenTserenov | 创建于 2026-09-05 | 更新于 2026-09-05 | 评论：0 | 👍：0
- **链接**: https://github.com/MoonshotAI/kimi-cli/issues/2635
- **内容摘要**: 
  用户在 Kimi Code VS Code 扩展的聊天面板中发现，助手渲染的文本消息偶尔会缺少单个字符。经与底层会话日志（wire log）比对，确认模型输出完整，问题出在渲染或从面板复制文本的环节。该问题影响文本的显示准确性，对复制代码或命令的用户会造成困扰。
- **社区反应**: 新提交的 Issue，暂无评论。但问题描述精准，已定位到渲染层，属于高价值 bug 反馈。

---

## 4. 重要 PR 进展

过去 24 小时内无 PR 更新或合并。社区可密切关注官方对上述两个 Issue 的后续修复 PR。

---

## 5. 功能需求趋势

基于现有 Issue 数据分析，社区当前关注的功能方向集中在：

- **第三方 Coding Agent 集成体验**：用户希望获得更详细的文档说明，并期待更便捷的环境变量管理方式。这表明「Kimi 作为 Claude Code 等工具的替代后端」是一个高频应用场景，且配置简化是刚需。
- **VS Code 扩展可靠性**：渲染层字符丢失问题反映了用户对 IDE 插件中流式输出稳定性的高要求。在 AI 编程场景中，任何一个字符的遗漏都可能导致代码复制错误，直接影响开发效率。

---

## 6. 开发者关注点

| 痛点/需求 | 来源 Issue | 说明 |
|---|---|---|
| 第三方 Agent 文档过于简略 | #1210 | 用户希望有 step-by-step 的配置教程，而非简短的 TIP 提示。 |
| 环境变量配置不便 | #1210 | 每次使用都需要 export，用户希望提供持久化配置或替代方案。 |
| VS Code 面板文本渲染丢失字符 | #2635 | 模型输出完整，但 UI 层丢失字符，影响复制和阅读。 |

---

**总结**：今日社区动静较小，但 #2635 可能是近期值得关注的 bug 修复方向；而 #1210 虽已关闭，其涉及的「第三方 Agent 集成文档完善」预计会成为后续文档 PR 的热点。建议开发者在等待官方回复的同时，通过 `kimi-cli --version` 确认本地环境版本，并关注仓库的 Release 页面以便及时获取修复版本。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-06

## 今日速览

昨日无新版本发布，社区主要围绕内存/性能问题（#20695 Memory Megathread 已达 140 条评论）、OpenCode Go 配额计算逻辑缺陷（#47547、#47491）以及 MCP 工具 schema 兼容性（#46628、#47542）展开激烈讨论。PR 侧，核心贡献者 kitlangton 和高频贡献者 SeashoreShi 分别提交了 skill 资源读取权限修复与全局会话显示修复等多项重要改动。

## 社区热点 Issues

### 1. Memory Megathread（内存问题集中帖）
**#20695** | 评论 140 | 👍 108 | [链接](https://github.com/anomalyco/opencode/issues/20695)

社区内存问题的主战场。作者明确**禁止用户直接跑 LLM 猜测解决方案**，当前最需要的是收集 heap snapshots（提供手动快照流程）。该帖持续更新中，是理解 OpenCode 内存泄漏全貌的最重要入口。

### 2. opencode 空闲时 CPU 占用 50%
**#19466** | 评论 17 | 👍 16 | [链接](https://github.com/anomalyco/opencode/issues/19466)

在等待 API 限流重试（`retrying in 18m 12s attempt #12`）期间，i9-14900 单核占用约 50%。用户质疑"什么都不做却在烧 CPU"，核心开发者尚未回应，但该问题与 #20695 内存问题可能存在关联。

### 3. OpenCode Go 配额计算错误：百分比求和而非美元求和
**#47547** | 评论 2 | 创建于 09-06 | [链接](https://github.com/anomalyco/opencode/issues/47547)

订阅被误封的严重计费 bug——系统显示 "Monthly Usage 100%"，但实际各模型用量加总仅 $23.06 / $60。同日还有 #47491、#47492（情绪化标题）反馈同一问题，已被关闭，疑似重复。**影响付费用户的核心 bug，需优先修复。**

### 4. Desktop sidecar 进程 OOM 崩溃
**#47553** | 评论 1 | 创建于 09-06 | [链接](https://github.com/anomalyco/opencode/issues/47553)

Windows 10 桌面版（opencode-ai@1.18.29）sidecar 进程无界增长直至 V8 堆上限（~3GB+）被系统杀死。与 #20695 内存泄漏问题相互印证，属于桌面端稳定性关键缺陷。

### 5. MCP 工具 schema 未对 Anthropic 做清理：root 级 anyOf/oneOf/allOf 导致 400
**#46628** | 评论 3 | [链接](https://github.com/anomalyco/opencode/issues/46628)

任何暴露 root 级组合 schema 的 MCP 工具都会使 Anthropic 请求在调用前直接 400。PR #47542 已提交修复（见下文），是 AI 工具生态互操作性的重要修复。

### 6. Web Home 隐藏非 git 仓库目录下创建的会话
**#46444** | 评论 4 | [链接](https://github.com/anomalyco/opencode/issues/46444)

从非 git 目录（如 `C:\Users\Raphael`）启动 `opencode web` 时，Home 页为空，但 CLI 能列出几十个会话。SeashoreShi 的 PR #46520 已提交修复，社区等待合并中。

### 7. `commentary` 通道未实现导致 chat-completions 模型回合中断
**#47168** | 评论 4 | [链接](https://github.com/anomalyco/opencode/issues/47168)

GPT 系统提示词要求模型在 `commentary` 通道发送进度更新，但该通道在代码中不存在——在 chat-completions 服务商上，每次更新都会意外终结回合。架构文档与实现不一致的典型问题。

### 8. 功能需求：跨会话搜索历史消息
**#41354** | 评论 9 | 👍 1 | [链接](https://github.com/anomalyco/opencode/issues/41354)

数百个 session 分布在多项目中，用户无法定位"之前告诉过 opencode 的重要约束/命令"。TUI/Desktop 仅按项目展示会话列表，无全局搜索入口。属于高频工作流需求。

### 9. 功能需求：桌面端聊天中文件路径可点击
**#37891** | 评论 7 | [链接](https://github.com/anomalyco/opencode/issues/37891)

桌面端渲染的文件/文件夹路径看起来像链接但无法点击，`file://` 链接也不响应。用户期望在编辑器/系统默认应用中打开对应路径。查询类体验改进，关注度稳定增长。

### 10. 功能需求：Web UI 通知
**#47479** | 评论 2 | 创建于 09-05 | [链接](https://github.com/anomalyco/opencode/issues/47479)

当 agent 需要用户响应时，Web UI 应使用浏览器 Notifications API 提醒。涉及多任务场景下的使用体验。

---

## 重要 PR 进展

### 1. 允许读取已获许可的 skill 资源
**#47554** | `fix(core)` | 作者: kitlangton | [链接](https://github.com/anomalyco/opencode/pull/47554)

加载已安装 skill 成功后，读取其支持文件却触发无关的 external-directory 审批（涉及 symlinked `~/.opencode/skill`）。修复 skill 加载与资源读取的权限一致性，直接影响技能生态可用性。

### 2. 通过时间线共享会话历史
**#47552** | `feat(core)` | 作者: thdxr | [链接](https://github.com/anomalyco/opencode/pull/47552)

引入 timeline-backed 会话历史：fork 引用冻结前缀，committed undo 选择新时间线，读取使用不可变快照。这可能是 2.0 会话模型的核心架构改进。

### 3. 支持 Astra 异步工具与实时引导
**#47536** | `feat(core)` | 作者: fireostendere | [链接](https://github.com/anomalyco/opencode/pull/47536)

为 v2 会话 runner 增加 Astra Responses 异步函数调用和实时纯文本引导（inbox 更新持久化）。扩展新模型服务商能力，Closes #47550。

### 4. TUI 动画改用渲染器帧并暴露 fps 配置
**#47549** | `fix(tui)` | 作者: opencode-agent[bot] | [链接](https://github.com/anomalyco/opencode/pull/47549)

用 renderer frame callback 替代 `createAnimatable` 的独立 16ms interval，动画停顿时释放实时渲染，并在 `cli.json` 暴露 `targetFps`/`maxFps`。性能与可控性双改进。

### 5. 在 provider 插件中发现 Bedrock 凭证
**#47548** | `feat(core)` | 作者: rekram1-node | [链接](https://github.com/anomalyco/opencode/pull/47548)

继 #47436 为原生 Bedrock 路由接入 AWS 默认凭证链后，本 PR 将凭证发现机制接入 provider 插件，使 `AmazonBedrockPlugin` 的 AI SDK hooks 真正可用（此前因 `AISDKNative.map` 覆盖而被绕过）。

### 6. 让 /stats 使用统计快速响应
**#47527** | `fix(core)` | 作者: kitlangton | [链接](https://github.com/anomalyco/opencode/pull/47527)

`/stats` 在大历史数据上耗时 20.78 秒，原因是读取完整消息 JSON 提取使用字段、同步 SQL/聚合循环阻塞服务。修复后显著提升大历史场景下的响应速度。

### 7. 退出前等待 stdout 写入，避免管道 JSON 截断
**#46912** | `fix(opencode)` | 作者: andrescera | [链接](https://github.com/anomalyco/opencode/pull/46912)

`export`、非分页 `session list --format json`、`db --format json` 在 `process.exit()` 前未等待 stdout flush，导致管道输出被截断。Closes #29330，对脚本/CI 用户友好。

### 8. 在 Web Home 显示全局项目会话
**#46520** | `fix(app)` | 作者: SeashoreShi | [链接](https://github.com/anomalyco/opencode/pull/46520)

修复 #46444——Web Home 静默隐藏非 git 目录下创建的会话（如 `C:\Users\Raphael`）。`buildHomeSessionRecords` 的过滤逻辑调整后，CLI 与 Web 的会话列表将保持一致。

### 9. 清理 MCP 工具 schema 以兼容 Anthropic root 组合器
**#47542** | `fix(opencode)` | 作者: jelloeater-agent | [链接](https://github.com/anomalyco/opencode/pull/47542)

Anthropic 拒绝在 `input_schema` root 层使用 `anyOf`/`oneOf`/`allOf`（仅允许嵌套在 properties 内）。MCP 服务器常见的"exactly one of"模式由此触发 400，此 PR 将 schema 改写为兼容形式。Closes #47543。

### 10. 按需加载 worktree 清单并限制并发服务请求
**#47441** | `fix(app)` | 作者: Hona | [链接](https://github.com/anomalyco/opencode/pull/47441)

桌面端周期性无响应（红色 server 点）的根因：每秒创建数百个本地 API 任务，健康检查和问题回复 POST 被 SOCKET_POOL_STALLED 阻塞。修复为按需加载 + 并发限制。

---

## 功能需求趋势

从近期 Issues 看，社区最关注的功能方向集中在：

1. **会话与历史管理**（#41354 历史搜索、#47552 时间线共享）——用户会话量增长后，可检索性成为刚需
2. **桌面端体验增强**（#37891 可点击路径、#37893 Windows 便携版、#47479 系统通知）——桌面端用户群体持续扩大，对原生交互细节要求变高
3. **图片与多模态支持**（#47544 查看图片、#44310 TUI 粘贴/拖拽图片）——v2 TUI 缺少桌面/web 端已有的附件能力
4. **新模型与服务商支持**（#47536 Astra、#47548 Bedrock 凭证链）——社区对 Bedrock、Astra 等企业级后端的接入需求明显
5. **隔离与订阅计费透明化**（#47547、#44851、#47520）——Go 订阅的配额计算、续费激活、用量归因问题集中爆发

## 开发者关注点

- **计费与配额逻辑是当前最大痛点**：多个 issue（#47547、#47491、#44851）直指 Go 订阅的配额计算错误（百分比求和代替美元求和）、续费支付成功但订阅未激活、用量异常增长等问题，**已影响付费用户正常使用，需最高优先级处理**
- **内存与 CPU 角落问题持续发酵**：Memory Megathread 长期置顶（140 评论），叠加 sidecar OOM（#47553）与空闲 CPU 占用（#19466），性能稳定性成为核心关切
- **MCP 工具生态互操作性**：schema 兼容性（#46628）、`tool.definition` 中 MCP 工具缺失、root 组合器 400 等问题，说明 MCP 接入的成熟度尚未达到生产标准
- **多平台一致性**：Windows/macOS 远程协作（#42627）、非 git 目录会话显示（#46444）、同名 worktree 区分（#47504）——跨平台行为差异正在消耗开发者信任
- **2.0 架构过渡阵痛**：事件订阅范围（#36443）、TUI 图片粘贴（#44310）、焦点管理（#47514）等 2.0 相关 issue 数量上升，社区正在积极测试并反馈新架构的细节缺失

---

*数据来源：github.com/anomalyco/opencode | 统计周期：2026-09-05 ~ 2026-09-06*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Qwen Code 社区动态日报（2026-09-06）

### 1. 今日速览

昨日社区重点推进 **Web Shell 平台整合**：`v0.23.1-preview.0` 与 `v0.23.0-nightly` 两个版本均聚焦于动态工作流可视化与会话工作流派生性能优化。与此同时，**后台自动化任务的可见性**（如 cron 静默触发）与 **会话生命周期管理**（回收、搜索、轮换）成为社区最集中的讨论焦点，多个 P1 级问题被报告，建议优先关注。

---

### 2. 版本发布

**v0.23.1-preview.0**（[Release 页面](https://github.com/QwenLM/qwen-code/releases)）
- `feat(web-shell)`：可视化并管理动态工作流运行 — [PR #10594](https://github.com/QwenLM/qwen-code/pull/10594)
- `perf(web-shell)`：自动派生会话工作流项目，简化配置

**v0.23.0-nightly.20260905.e3d26283e6**
- 内容与上述 preview 版本一致，同步两项变更

两个版本均指向 Web Shell 已成为核心交互载体，正在快速迭代。

---

### 3. 社区热点 Issues（10 个）

**P1 级问题**

- **[#11119](https://github.com/QwenLM/qwen-code/issues/11119) — `serve`: 后台 shell 输出与唤醒通知在会话运行时回收时静默丢失，导致会话卡死**  
  P1 / 核心 / 会话管理。daemon 模式下后台任务的输出无法送达，会话进入不可用状态。社区评论 3 条，与近期后台自动化功能（cron、monitor）集中爆发问题相关。

- **[#11031](https://github.com/QwenLM/qwen-code/issues/11031) — `fix(export)`: 停止在每个 HTML 导出文件中嵌入 Web Shell 运行时**  
  P1 / UI / 性能。当前导出一个空会话的 HTML 约 19.5 MB，根源是把完整 React 和 Web Shell 运行时打进了每个导出文件。社区已有修复方向（独立入口 + 按版本加载），但尚未合并。

- **[#10879](https://github.com/QwenLM/qwen-code/issues/10879) — `hk4` 仍带共享 `ecs-qwen` 标签，发布任务与 PR CI 竞争资源**  
  P1 / CI/CD。发布验证固定到 `hk4` 主机，但该主机同时承载 PR CI 任务，导致发布流程与日常 CI 互相争抢 CPU，已出现多次超时。评论 4 条，社区讨论集中于主机标签隔离方案。

**P2 级重点问题**

- **[#11096](https://github.com/QwenLM/qwen-code/issues/11096) — `fix(export)`: main 分支构建的导出文件指向 404 的 unpkg URL**  
  P2 / 打包 / 构建系统。npm 上的 `0.23.0` 发布早于 #9812 合并，导致导出的 HTML 无法加载渲染脚本。这是一个发布版本与代码不一致的典型问题，影响所有使用导出功能的用户。

- **[#11091](https://github.com/QwenLM/qwen-code/issues/11091) — `fix(export)`: mermaid（约 6 MB）仍被拍平进导出转录渲染器**  
  P2 / 性能 / 构建系统。转录渲染器虽已改为按版本从 unpkg 加载，但 mermaid 库仍直接嵌入，导致文件体积显著膨胀。评论 6 条，是导出瘦身系列问题的延续。

- **[#8227](https://github.com/QwenLM/qwen-code/issues/8227) — Windows 上 `@`-file 读取失去 `O_NOFOLLOW` 保护，设备/索引检查形同虚设**  
  P2 / 安全 / Windows。合入 #7206 的符号链接 / TOCTOU 防护在 Windows 上未被正确启用，且缺乏测试覆盖。评论 6 条，安全敏感用户关注度高。

- **[#5823](https://github.com/QwenLM/qwen-code/issues/5823) — `/loop` cron 任务静默触发，模型无法列出或停止自己的定时任务**  
  P2 / CLI / 会话管理。用户毫不知情的情况下 cron 任务自动执行，且没有命令可以查看或取消。评论 6 条，属于后台自动化功能的**可见性缺口**，与 #11119 共同反映该方向体验不完整。

- **[#11118](https://github.com/QwenLM/qwen-code/issues/11118) — `fix(serve)`: 正在执行 cron、goal、monitor 或历史修改的会话永远无法被回收**  
  P2 / 核心 / 后台自动化。子进程对 "busy" 的定义与 `serve` 的空闲回收判定不一致，导致部分会话成为不可回收的僵尸。评论 2 条，属于会话生命周期管理的关键缺陷。

- **[#10865](https://github.com/QwenLM/qwen-code/issues/10865) — `perf(web-shell)`: 会话工作流投影每次渲染派生三次**  
  P2 / 性能。`SessionWorkflowCockpit` 每次渲染重复构建索引三次，影响大规模工作流场景的响应速度。已标记 `ready-for-agent`，修复成本可控。

- **[#11111](https://github.com/QwenLM/qwen-code/issues/11111) — `feat(search)`: 会话搜索应匹配对话内容而不只是标题**

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*