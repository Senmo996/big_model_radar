# AI CLI 工具社区动态日报 2026-09-24

> 生成时间: 2026-09-24 02:05 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告

**数据窗口：2026-09-23 至 2026-09-24 | 覆盖工具：Claude Code / OpenAI Codex / Gemini CLI / GitHub Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code**

---

## 1. 生态全景

各主流 AI CLI 工具均已进入"稳定功能 + 生态治理"阶段，GPT-6 系列模型入口在多款工具中同步落地（OpenAI Codex、Copilot CLI），显示出模型能力已成为分发核心。社区议题重心正从"能用"转向"好用且可信"：安全边界（@path 意外文件上传、密钥明文泄露、未脱敏遥测）、成本可预期性（prompt cache 命中率、compaction 重复计费）、长时任务稳定性（认证失效、断线重连、上下文压缩循环）是贯穿各工具的高频关键词。Windows 平台稳定性成为集体短板——仅 OpenAI Codex 今日 10 个热点 Issue 中就有 5 个与 Windows 直接相关。与此同时，插件系统扩展（Claude Code、OpenCode）、自定义模型端点（Copilot CLI）、OAuth 标准化（OpenCode、Gemini CLI）等生态类需求正在累积，下一阶段竞争将从单点体验转向生态互操作能力。

---

## 2. 各工具活跃度对比

| 工具 | 社区热点 Issues | PR 进展 | Release | 活跃度特征 |
|---|---|---|---|---|
| **Claude Code** | 10（最高单条 54 评论） | 5（全部社区贡献） | v2.1.281 | 讨论深、社区外部贡献活跃 |
| **OpenAI Codex** | 10（最高 38 评论） | 10（官方为主） | rust-v0.156.1 正式版 + 多线预发布（0.155/0.157/0.158） | 官方迭代极快，alpha 密集 |
| **Gemini CLI** | 12（含 1 CRITICAL 安全） | 4 | 4 个（v0.61.0 正式版 + nightly/preview） | 多版本线并行，安全事件拉高关注 |
| **GitHub Copilot CLI** | 10（最高 19👍） | 1 | v1.0.89-1 补丁版 | PR 吞吐低，社区需求积压 |
| **Kimi Code CLI** | 2（仅存量更新） | 0 | 无 | 活跃度显著偏低 |
| **OpenCode** | 10（最高 54 评论、122👍功能请求） | 10 | 未提及正式发布 | 社区热度高，工程治理同步推进 |
| **Qwen Code** | 10（含 2 个 P1 安全项） | 2+（主要） | 2（nightly + cua-driver-rs v0.20.11） | 版本节奏快，安全加固密集 |

> 注：Issue/PR 数为数据窗口内"热点/重要"条目数，非仓库全量计数。

---

## 3. 共同关注的功能方向

**① 新模型快速接入**
OpenAI Codex 与 Copilot CLI 同日新增 GPT-6 Sol/Luna；Gemini CLI 将 Gemini 3.8 Flash / 3.5 Flash Lite 提升为正式模型；OpenCode 社区亦提出 bump provider 以接入新模型的 PR。模型更新已是 CLI 工具吸引用户的最短路径。

**② 成本与缓存可预期性**
Claude Code 用户深挖 fork 恢复 cache 失效（#88444）与 `totalTokensReminder` 破坏增量缓存（#90018）；OpenCode 用户报告上游丢弃 prompt cache 导致约 50% 重复计费（#50258）；Copilot CLI 的 compact 失败后无限计费重试（#4663）被指为"成本 + 资源管理严重缺陷"。

**③ 安全边界与敏感信息防护**
Gemini CLI 爆出 CRITICAL 级 `@path` 展开意外上传文件（#26730）；Claude Code 修复 security-guidance 将 secrets 带入评审上下文（PR #96434）；OpenCode 的 `debug config` 明文输出 API key（#50915）；Qwen Code 的遥测通道上传未脱敏工具错误（#11198）。安全正从"功能"升维为"信任底线"。

**④ Windows / 跨平台稳定性**
OpenAI Codex 的 Windows 项目同步失败、插件加载失败、app-server 崩溃；Claude Code 的 Windows 路径归一化（#88418）与桌面自动更新杀会话（#90867）；Qwen Code 的 NTFS 64 位文件 ID 校验失效（#11848）。Windows 是全员薄弱环节，且已有用户数据丢失事件。

**⑤ 认证 / 授权链路一致性**
Gemini CLI 新装不触发 OAuth（#28439）、授权码交换失败（#26171）；Copilot CLI 长驻进程 token 停刷（#4929）；Codex 的 API-key 认证被 Chrome 集成拒绝（#45317）；Kimi Code 的认证问题历时 6 个月才关闭（#1547）。混合认证模式（云账号 + API key + 企业 SSO）的兼容性普遍承压。

**⑥ 上下文透明性与记忆可观测**
Claude Code 要求暴露 auto-memory 实际加载状态（#82056）；Gemini CLI 的子代理 MAX_TURNS 被误报为 GOAL 成功（#22323）；Qwen Code 用户抱怨 agent 反复调查历史已有信息、浪费 token（#12579）。"模型到底记得什么、为什么这么做"成为高级用户核心关切。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线 / 生态特征 |
|---|---|---|---|
| **Claude Code** | 企业级开发代理 + 网关层能力 | 企业团队、重度 IDE 用户 | 强在网关策略（Desktop/Bedrock IAM）、插件体系扩展；社区外部 PR 贡献活跃，生态开放度高 |
| **OpenAI Codex** | OpenAI 云能力的第一方 CLI | ChatGPT 订阅用户、TUI 偏好者 | Rust 技术栈，紧贴 GPT-6 代际更新；官方主导迭代（每日多版本），社区参与次于 Claude Code |
| **Gemini CLI** | Google Gemini 模型的开发入口 | Google Cloud / Gemini 生态开发者 | 推进 A2A server、AST 感知工具（EPIC #22745）；但 OAuth 新用户门槛与安全事件暴露成熟度不足 |
| **GitHub Copilot CLI** | GitHub 生态的 IDE/CLI 桥接器 | GitHub 企业用户、依赖 managed-settings 策略的团队 | 企业策略（allow-all、sandbox）与 IDE MCP 集成是差异点；但 PR 吞吐极低，社区高赞需求长期未解决 |
| **Kimi Code CLI** | 轻量 CLI 辅助（当前阶段） | MoonshotAI 平台用户 | 活跃度低、生态单薄；yolo 权限模式安全事件（#2596）说明权限模型仍在早期 |
| **OpenCode** | 开源中立的多 Provider 聚合层 | 成本敏感开发者、自建模型路由用户 | 强调 free tier + Console/网关组合，MCP OAuth 是标志性诉求（122👍）；计费透明度问题紧迫 |
| **Qwen Code** | 阿里系模型 + Agent 远程协作 | 本地/私有模型用户、多机协作团队 | nightly 节奏快；绑定 CUA 驱动、A2A 远程 Agent、deferred-tool 等前瞻特性；安全加固与协作能力并进 |

---

## 5. 社区热度与成熟度

**第一梯队（高活跃、生态成熟）**：**Claude Code** 社区讨论深度最高（单 issue 54 评论）且外部 PR 质量高（telemetry、security-guidance、git diff 修复均来自社区）；**OpenAI Codex** 官方迭代速度全场第一（同日多条 alpha + 正式版），但社区参与呈"反馈型"而非"贡献型"。

**第二梯队（快速迭代、稳定性追赶中）**：**Qwen Code** 版本节奏快、安全修复密集，处于功能扩张与安全加固并行期；**OpenCode** 社区热度与 Claude Code 相当（54 评论、122👍），

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**: github.com/anthropics/skills | **数据截止**: 2026-09-24

---

## 一、热门 Skills 排行

> 注：PR 评论区数据在原始抓取中缺失，以下按仓库按评论数排序的结果（前 20 条）选取功能型 Skill PR 进行排行。

### 1. fix(skill-creator): 触发评估隔离与 Windows 兼容修复（#1298）
**状态**: OPEN（2026-06 创建，9 月仍活跃）
PR 针对 skill-creator 触发评估的三大缺陷：worker 命令探针竞争、Windows 下 `select()` 管道失败、无关工具中断扫描，以及运行时错误被误判为非触发导致负样本误通过。这是当前社区维护最密集的官方技能之一，与其相关修复 PR 还有 #1769（0% recall 误报）、#539（YAML 特殊字符校验）。
🔗 https://github.com/anthropics/skills/pull/1298

### 2. proofcore-contract-auditor：智能合约公证审计（#1771）
**状态**: OPEN（2026-09-15 创建，近期活跃）
面向 Web3 开发者的新 Skill，对 Solidity/Rust 智能合约做自动化静态分析，并通过 ProofCore 的零存储 Merkle 协议将审计证明锚定到 TON 公链。属于区块链安全领域的新兴方向，社区讨论集中于审计证明的链上可信度与 Skill 机制的结合方式。
🔗 https://github.com/anthropics/skills/pull/1771

### 3. md2video-audio：Markdown 一键生成配音视频（#1703）
**状态**: OPEN（2026-09-01 创建，持续更新）
零成本将 Markdown 文档经 Marp 转幻灯片并合成拟人配音 MP4。直击内容创作者将文档转视频的刚需，是文档处理类 skill 向多媒体延伸的代表作。
🔗 https://github.com/anthropics/skills/pull/1703

### 4. pyxel：复古游戏开发（#525）
**状态**: OPEN（2026-03 创建，9-22 仍在更新）
为 Python 复古游戏引擎 Pyxel 提供创建、调试、验证的完整 Skill，支持 headless 输入驱动运行与逐帧检查。生命周期长达 6 个月仍保持活跃，社区关注度稳定。
🔗 https://github.com/anthropics/skills/pull/525

### 5. document-typography：文档排版质量控制（#514）
**状态**: OPEN（2026-03 创建）
针对 AI 生成文档的孤儿词换行（1-6 词溢出）、段落孤立在页尾、编号错位等排版通病。切中"Claude 生成的每份文档都受影响"这一高频痛点，被多次讨论为最实用的"小而美"Skill。
🔗 https://github.com/anthropics/skills/pull/514

### 6. AWT (AI Watch Tester)：AI 驱动 E2E 测试（#822）
**状态**: OPEN（2026-03 创建，9-19 仍活跃）
开源工具 AWT 赋予 Claude 视觉与浏览器控制能力，实现零代码 E2E 测试生成与自动执行，是测试自动化方向最受关注的外部贡献。
🔗 https://github.com/anthropics/skills/pull/822

### 7. testing-patterns：全栈测试模式库（#723）
**状态**: OPEN（2026-03 创建，9-21 持续更新）
覆盖 Testing Trophy 模型、单元测试 AAA 模式、React Testing Library 等完整测试栈，与 #822 共同印证社区对"测试能力"的强烈需求。
🔗 https://github.com/anthropics/skills/pull/723

### 8. blast-radius：破坏性操作前检查清单（#1776）
**状态**: OPEN（2026-09-17 创建）
在批量/破坏性写入（归档用户、撤销权限、删行、群发邮件）之前执行检查清单，填补"查询针对行正确、而批量操作针对真实世界正确"之间的鸿沟。属于 AI Agent 安全执行方向的代表性提案。
🔗 https://github.com/anthropics/skills/pull/1776

---

## 二、社区需求趋势（来自 Issues）

| 方向 | 代表性 Issue | 评论数 | 核心诉求 |
|------|-------------|--------|----------|
| **安全与信任边界** | #492 Community skills 在 anthropic/ 命名空间下分发造成信任滥用 | 43 | 社区 Skill 冒充官方 Skill，用户可能授予越权权限；需隔离社区与官方命名空间 |
| **组织级协作** | #228 在 Claude.ai 中启用组织级 Skill 共享 | 16 | 目前只能下载 .skill 文件手动传播，需共享库/分享链接 |
| **评估工具链可靠性** | #556 run_eval.py 触发率始终为 0% | 12 | Skill 评估脚本的"假阴性"问题使所有触发测试形同虚设 |
| **上下文效率优化** | #1487 claude-api skill 单次注入约 156k tokens | 4 | Skill 需更克制的资源加载策略，避免一次调用打爆上下文窗口 |
| **Agent 记忆与治理** | #1329 compact-memory 符号化紧凑记忆；#412 agent-governance 安全模式；#1385 推理质量门控流水线 | 10/6/4 | 社区主动提出面向 Agent 自身状态管理、策略执行与输出质量把关的元技能 |
| **平台集成** | #29 Bedrock 使用；#16 Skills 以 MCP 协议暴露 | 4/4 | 跨平台运行与标准化接口是长期呼声 |

**小结**：社区最迫切的声音是**安全与信任治理**（43 评论高居榜首），其次是**企业级协作共享**与**评估工具链可靠性**；同时出现多起自发提交的"Agent 元能力"提案（记忆、治理、质量门控），说明 Skill 生态正从文档处理向 Agent 自治能力演进。

---

## 三、高潜力待合并 Skills（评论活跃但未合并）

以下 PR 均处于 OPEN 状态，且近期有更新，落地可能性较高：

| Skill | PR | 特点 | 近期活跃度 |
|-------|-----|------|-----------|
| **fix(mcp-builder)** | #1742 | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 header 配置 | 9-19 更新，修复官方 Skill 的版本兼容断裂 |
| **proofcore-contract-auditor** | #1771 | 全新 Web3 赛道，链上审计证明 | 9-15 创建，9-16 更新 |
| **md2video-audio** | #1703 | 文档→视频，创作者刚需 | 9-15 更新 |
| **pyxel** | #525 | 游戏开发垂直场景 | 9-22 更新（最活跃） |
| **testing-patterns** | #723 | 测试方法论系统化 | 9-21 更新 |
| **AWT (E2E 测试)** | #822 | AI 视觉+浏览器控件的零代码测试 | 9-19 更新 |
| **blast-radius** | #1776 | 破坏性操作安全检查 | 9-18 更新 |
| **docx 系列修复** | #1792 / #1790 / #1734 | LibreOffice 超时误报、rels 缺失、孤儿 comment 检测 | 9-23 更新，官方文档技能维护进入深水区 |

值得注意：#1298（skill-creator 修复）虽为 fix 型 PR，但连同 #1769、#539 形成了对 skill-creator 的密集修复浪潮，该官方技能可能即将迎来一次较大的可靠性升级，间接利好所有下游 Skill 的触发准确率。

---

## 四、Skills 生态洞察

**社区当前最集中的诉求是"可靠性与信任"**——一方面大量 PR/Issue 在修补 skill-creator 触发评估、mcp-builder、docx 等核心技能的运行时缺陷（Windows 兼容、0% 触发率、上下文爆炸），另一方面 #492 暴露的命名空间信任滥用问题说明生态正从"能用就行"转向"可信、可评估、可治理"的工程化阶段，而 compact-memory、agent-governance、blast-radius 等提案则预示着 Skill 形态正从"文档/代码处理工具"向"Agent 自身能力的安全护栏"延伸。

---

# Claude Code 社区动态日报 — 2026-09-24

## 1. 今日速览

今日发布 v2.1.281，主要为 Claude 应用网关（Claude apps gateway）增加新版桌面密钥支持和 Bedrock IAM 角色扮演能力。社区方面，自动记忆（auto-memory）加载状态不透明（#82056）与桌面端自动更新破坏会话（#90867 系列）成为讨论最集中的两个话题。此外，多条外部 PR 聚焦于 telemetry 版本元数据、security-guidance 敏感信息泄露和 git diff 颜色导致解析失败等实际问题。

---

## 2. 版本发布

### v2.1.281
- **Claude apps gateway 策略增强**：`desktop` 策略块现在支持新版 Claude Desktop 密钥，包括 `blockReadsOutsideWorkingDirectories` 和 `disableBypassPermissionsMode` 两个键。
- **Bedrock IAM 角色支持**：Claude apps gateway 的 Bedrock upstream 新增 `assume_role` 配置，网关将以指定的 IAM 角色身份调用 Bedrock。

🔗 [查看 Release](https://github.com/anthropics/claude-code/releases)

---

## 3. 社区热点 Issues（10 条）

### #82056 — auto-memory 加载状态完全不可见（54 评论）
会话无法判断自动记忆索引是完整加载、截断加载还是完全未加载。作者希望 Claude Code 在会话内暴露实际加载情况，提升记忆系统的可观测性和可调试性。
🔗 https://github.com/anthropics/claude-code/issues/82056

### #22931 — 归档的 Claude Cowork 聊天记录凭空消失（42 评论，38👍）
macOS 用户归档 Claude Cowork 聊天后，所有归档内容无法找到。截至目前仍无明确解决方案，影响面较大。
🔗 https://github.com/anthropics/claude-code/issues/22931

### #14200 — 为插件（Plugins）增加 rules 支持（36 评论，108👍）
社区高票需求：希望插件系统能携带并与项目规则（rules）联动，目前仅支持 prompts/skills 等资源。该 issue 是当前插件体系最重要的功能请求之一。
🔗 https://github.com/anthropics/claude-code/issues/14200

### #22073 — 终端复制粘贴换行异常（19 评论，79👍）
从终端复制内容粘贴到 Claude Code 时，换行被替换而非自然折行，影响日常使用体验。该问题被标记为 duplicate，但关注度持续走高。
🔗 https://github.com/anthropics/claude-code/issues/22073

### #93782 — 2.1.269 回归：WSL2 + VS Code 集成终端中听写输入失效（15 评论）
从 2.1.269 起，通过 Wispr Flow 等听写工具粘贴文本不再写入提示符；2.1.268 正常。属于明确的回归问题，影响 WSL2 + VS Code 用户。
🔗 https://github.com/anthropics/claude-code/issues/93782

### #88444 — fork 恢复后 prompt cache 确定性失效（8 评论）
Fork 一个会话后，其 prompt cache 几乎必然 miss（5 分钟 TTL vs 父会话 1 小时 TTL），且工具循环后全量重写上下文。对高频 fork 工作流的成本有显著影响。
🔗 https://github.com/anthropics/claude-code/issues/88444

### #88418 — Windows 上同一个项目在 `.claude.json` 中出现三种路径拼写（6 评论）
未归一化的路径键导致同一个项目被拆成多个记录，trust 状态、MCP servers、worktree 状态彼此分裂。这是 Windows 用户会遇到的一类结构性数据问题。
🔗 https://github.com/anthropics/claude-code/issues/88418

### #90867 — 桌面端更新重启杀死运行中的会话（2 评论，系列根因）
桌面应用自动更新重启后，窗口会恢复但会话进程全部丢失。该 issue 是 #90172 拆出的 defect 1，也是整个 Windows 桌面端缺陷系列的核心。
🔗 https://github.com/anthropics/claude-code/issues/90867

### #90018 — totalTokensReminder 导致工具循环中 prompt-cache 地板效应（4 评论）
开启默认的 `totalTokensReminder` 后，工具循环每次都触发缓存未命中；关闭后增量缓存恢复正常。该问题与成本直接相关，但当前讨论度仍偏低。
🔗 https://github.com/anthropics/claude-code/issues/90018

### #92031 — 账户级插件无法同步到 Claude Code Web（4 评论，4👍）
账户级插件在 Web 端始终同步为 0，而 skills 可正常同步。插件跨端一致性是 Web 端用户关心的核心问题。
🔗 https://github.com/anthropics/claude-code/issues/92031

---

## 4. 重要 PR 进展（过去 24 小时共 5 条，全部来自社区贡献）

### #96487 — telemetry 行携带引擎版本信息
在 `$.session.version()` 可用后，telemetry mod 现在会一次性读取 `{ version, base?, builtAt? }` 并随行上报。解决外部构建因缺少版本信息而无法追踪的问题。
🔗 https://github.com/anthropics/claude-code/pull/96487

### #96434 — security-guidance：阻止拒绝/机密文件进入评审上下文
修复 #96276：security-guidance 评审者通过 `git diff`/`git show` 组装提示，可能把会话权限规则禁止读取的 `secrets.yaml`、`config/prod.json` 等文件带入模型上下文。该 PR 确保这些文件不会进入评审上下文。
🔗 https://github.com/anthropics/claude-code/pull/96434

### #96363 — diff：传递 `--no-color`，避免强制 git 颜色清空 diff 正文
当用户配置 `color.ui=always` 或 `color.diff=always` 时，diff 正文会被 ANSI 转义序列完全破坏，只剩头部和统计信息。该 PR 为所有 git diff 调用添加 `--no-color`。
🔗 https://github.com/anthropics/claude-code/pull/96363

### #96364 — agents-md：自动分页的嵌套 AGENTS.md 读取不再视为已交付
修复一个边界问题：读取超过 token 上限的嵌套 AGENTS.md 时，工具自动分页返回第一页，但后续 Read 不会再附加该文件，导致内容被静默截断。该 PR 修正了这一逻辑。
🔗 https://github.com/anthropics/claude-code/pull/96364

### #79150 — docs：对齐 code-review README 与实际验证命令
README 中描述的 git blame/history 代理和 0-100 分评分系统已经不存在，该 PR 让文档与当前命令实现保持一致。
🔗 https://github.com/anthropics/claude-code/pull/79150

---

## 5. 功能需求趋势

从近期 Issues 中可以提炼出以下社区重点关注的功能方向：

- **插件系统能力扩展**：除了在 #14200 中要求插件支持 rules 外，#92031 反映出插件跨端（CLI / Desktop / Web）同步的一致性也是用户核心诉求。
- **跨账户与多账户体系**：#92135 提出同一用户拥有的不同账户之间进行会话消息互通；#92137 则呼吁提供 20x 以上的 Max 档位（50x/100x），以降低多账户变通方案的使用。这表明用量上限已成为一部分重度用户的瓶颈。
- **桌面端功能对齐 CLI**：#91573 希望将 CLI 的 `/recap` 和离开摘要带到桌面应用；#91377 指出 Artifacts 查看器的缩放操作错误地作用于主窗口而非法则文档。CLI 与 Desktop 之间的功能差距正在被放大。
- **记忆与上下文的透明性**：#82056 要求暴露 auto-memory 索引的实际加载状态，呼应了社区对“模型到底记住了什么”的普遍关切。
- **成本与缓存可预期性**：#88444 与 #90018 分别从 fork 恢复和 token 提醒两个角度揭示了 prompt cache 在不同场景下的失效规律，说明高级用户在认真管理缓存成本。

---

## 6. 开发者关注点

- **Windows 桌面端自动更新机制问题突出**：以 #90867 为核心的缺陷系列（#90868、#90869、#90871、#90872、#90873、#90874、#90877 等）覆盖了更新重启杀会话、`CLAUDE_CONFIG_DIR` 丢失、多 profile 同时重启、不可选择手动更新策略等多方面问题。建议 Windows 桌面用户暂时关注自动更新设置，开发者则希望 Anthropic 优先修复该系列根因。
- **Prompt cache 与成本控制是高频痛点**：fork/resume 缓存易失（#88444）、`totalTokensReminder` 干扰增量缓存（#90018）、Bedrock gateway 流式回退导致吞吐减半（#87930）——这类问题直接影响账单金额，也因此获得较高关注度。
- **Windows 路径与配置规范化缺失**：#88418 中同一项目三种路径拼写导致信任状态、MCP server 和 worktree 状态分裂，反映出 Windows 下的路径归一化需要系统性的修复。
- **TUI 日常体验问题持续累积**：复制粘贴换行异常（#22073）、AskUserQuestion 打开时发送消息被误报为“用户拒绝”（#88850）、周用量限制 banner 在 54% 时提前触发（#94694）——这些都不阻塞核心功能，但都是每天都会遇到的小摩擦。
- **MCP 可靠性仍需加强**：#88970 指出跨会话 `send_message` 没有可用的返回路径（`local_<uuid>` 与 `scott-<hex>` 命名空间不互通）；#94351 显示官方 Filesystem 扩展因 outputSchema 的 draft-07 不受支持而完全不可用。MCP 的互操作性和健壮性仍是落地瓶颈。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-24

## 今日速览

今日 Codex 发布 **rust-v0.156.1 正式版**，新增 GPT-6 Sol / GPT-6 Luna 模型选择支持，并优化了限流切换提示。社区方面，Windows 平台稳定性问题（项目同步失败、插件加载失败）与 CLI 配置定制需求（关闭 Astra 星尘动效、时间戳格式）为讨论焦点。

---

## 版本发布

### rust-v0.156.1（正式版）
- **新功能**：模型选择器新增 **GPT-6 Sol** 与 **GPT-6 Luna**；限流切换提示现推荐 GPT-6 Luna。（[#47405](https://github.com/openai/codex/pull/47405)）
- 变更日志：[rust-v0.156.0...rust-v0.156.1](https://github.com/openai/codex/compare/rust-v0.156.0...rust-v0.156.1)

另有多项预发布版推进：`rust-v0.158.0-alpha.2~6`、`rust-v0.157.0-alpha.11`、`rust-v0.155.0-alpha.16.3/16.4`（均为内部迭代，无公开变更说明）。

---

## 社区热点 Issues（10 个）

### 1. 关闭 Astra 星尘动效（whimsy effect）默认值争议
- **Issue**: [#44561](https://github.com/openai/codex/issues/44561) | 👍 76 | 💬 32
- **要点**：大量用户要求 `[tui] whimsy = false` 成为默认配置，认为 Astra 主题下的星辰动效"看起来像屏幕故障"。社区反响强烈，是当前最高赞 Issue。

### 2. Windows 项目上下文同步反复失败
- **Issue**: [#42215](https://github.com/openai/codex/issues/42215) | 💬 38
- **要点**：Windows 11 桌面应用中，本地 Work 聊天无法在既有 ChatGPT 项目中启动，文件系统阶段同步失败，影响 23 个源文件的小型项目。

### 3. Chrome 浏览器集成拒绝 API-key 认证
- **Issue**: [#45317](https://github.com/openai/codex/issues/45317) | 💬 17
- **要点**：Chrome BrowserSkill 0.2.1 在更新后无法识别 Codex API-key 认证，枚举/读取标签页时报 `unsupported Codex auth method: apikey`。

### 4. 所选模型容量已满
- **Issue**: [#46172](https://github.com/openai/codex/issues/46172) | 👍 3 | 💬 17
- **要点**：Windows 桌面版频繁提示 "Selected model is at capacity"，ChatGPT Plus 用户受影响明显，与今日新增 GPT-6 模型选择形成呼应。

### 5. Codex Audio 扩展阻止 VS Code Server / serve-web 激活
- **Issue**: [#47357](https://github.com/openai/codex/issues/47357) | 👍 9 | 💬 5
- **要点**：VS Code Server 远程开发场景中，Codex 因 Audio 扩展仅支持桌面端而无法激活。社区关注度高，影响远程开发工作流。

### 6. GPT-5.6 Sol 与 GPT-6 Astra 拒绝无害提示
- **Issue**: [#47041](https://github.com/openai/codex/issues/47041) | 👍 1 | 💬 5
- **要点**：最新桌面版的 GPT-5.6 Sol 和 GPT-6 Astra 对普通无害提示返回 `invalid_prompt` 错误，疑似模型行为回归。

### 7. macOS 浏览器控制沙箱启动失败
- **Issue**: [#45950](https://github.com/openai/codex/issues/45950) | 👍 3 | 💬 5
- **要点**：macOS 上通过 Chrome 扩展启动浏览器控制时，`node_repl` 因 `sandbox-exec: unbound variable: TIOCSTI` 退出（code 65），DevTools 连接前即崩溃。

### 8. Windows 插件加载失败（Browser / Computer Use / Image Gen）
- **Issue**: [#46744](https://github.com/openai/codex/issues/46744) | 💬 6
- **要点**：Windows Codex App 26.915.4065.0 无法加载 openai 内置插件，导致浏览器控制、计算机使用和图像生成全部不可用。免费与 Plus 账户均复现。

### 9. 上下文压缩后回复陷入重复循环
- **Issue**: [#47707](https://github.com/openai/codex/issues/47707) | 💬 2（今日新建）
- **要点**：长时 Goals 在自动上下文压缩后进入失控循环，反复输出相同或语义等价的回复，严重影响长时间运行任务。

### 10. Windows app-server 被 `STATUS_CONTROL_C_EXIT` 终止
- **Issue**: [#40231](https://github.com/openai/codex/issues/40231) | 💬 13
- **要点**：Windows 10 上执行本地命令时，app-server 引擎以退出码 0xC000013A 崩溃；仅在 agent 执行 shell 命令时出现，纯聊天会话正常。26.818.5229 版本回归。

---

## 重要 PR 进展（10 个）

### 1. 按大小限制选择性保留工具结果元数据
- **PR**: [#47714](https://github.com/openai/codex/pull/47714)
- **内容**：优化元数据预算管理，不再无差别丢弃全部工具结果元数据；超大结果仍保留资源访问证据。

### 2. 减少共享配置 crate 的依赖耦合
- **PR**: [#47713](https://github.com/openai/codex/pull/47713)
- **内容**：`Provider` 与 `RetryConfig` 移入 `codex-client`，`codex-model-provider-info` 改为依赖 `codex-client`；特征状态指标移入 `codex-core`。

### 3. 原子更新统一 exec 输出缓冲区
- **PR**: [#47712](https://github.com/openai/codex/pull/47712)
- **内容**：将完成记录与待轮询缓冲区置于同一互斥锁下，防止取消操作在两个缓冲区更新间隙中断导致数据不一致。

### 4. 复用缓存 WebSocket 会话进行恢复预热
- **PR**: [#47709](https://github.com/openai/codex/pull/47709)
- **内容**：已完成启动预热的会话返回客户端缓存，恢复预热走正常会话建立路径，同时保留 in-flight 共享预热。

### 5. 保留 ChatGPT 后端请求的账户网络策略
- **PR**: [#47703](https://github.com/openai/codex/pull/47703)
- **内容**：修复 ChatGPT 后端请求可能绕过已配置网络策略的问题，使用捕获凭据的请求必须继承对应账户策略。

### 6. 空闲线程 WebSocket 预热与修复
- **PR**: [#47701](https://github.com/openai/codex/pull/47701)
- **内容**：新增 `CodexThread::prewarm()` 接口，空闲线程可在下一轮开始前重新建立断开的 WebSocket，避免健康连接上重复预热。

### 7. Windows 沙箱凭据被拒时自动修复
- **PR**: [#47695](https://github.com/openai/codex/pull/47695)
- **内容**：Windows 沙箱预配置时检测系统是否拒绝了存储的账户密码，及时修复而非等运行时登录失败。

### 8. 新增模型请求与响应流扩展钩子
- **PR**: [#47679](https://github.com/openai/codex/pull/47679)
- **内容**：扩展 API 新增 `ModelRequestContributor` 与 `ModelResponseInterceptor`，支持安全添加过滤后的 `client_metadata`、按请求创建拦截器。

### 9. 支持 Mermaid 流程图带引号标签与 & 符号
- **PR**: [#47678](https://github.com/openai/codex/pull/47678)
- **内容**：修复 `A["Review & confirm"]` 类标签无法渲染的问题，接受双引号节点/边标签并允许字面量 `&`。

### 10. Executor 能力发现 V2 基础设施
- **PR**: [#47683](https://github.com/openai/codex/pull/47683)
- **内容**：定义 `capabilities/discoverV2` 请求与清单类型，在 executor 元数据中宣告 `capabilityDiscoveryV2`；启动时预加载插件和全局技能位置。

---

## 功能需求趋势

1. **新模型支持**：GPT-6 Sol / Luna 引入成为今日核心进展，同时用户反馈新模型存在 `invalid_prompt` 误拒问题，模型兼容性测试需求上升。
2. **UI/UX 可配置化**：关闭 Astra 星尘动效（76 👍）、完成时间戳格式可配置等诉求表明社区对 TUI 个性化控制有明确需求。
3. **远程 / 无头环境支持**：VS Code Server 中 Audio 扩展依赖导致无法激活的 Issue（9 👍）反映远程开发场景的重要性提升。
4. **CLI 配置架构治理**：多个 Issue 建议区分用户配置与运行时生成状态，避免 `config.toml` 无限膨胀。
5. **连接稳定性与自动恢复**：WebSocket 预热/修复、断线重连等 PR 表明官方正系统性改善长时任务的网络韧性。

---

## 开发者关注点

1. **Windows 平台稳定性亟待提升**：本期 10 个热点 Issue 中 5 个与 Windows 相关（项目同步失败、插件加载失败、app-server 崩溃、模型容量报错、GUI 超时），Windows 用户受影响面最大。
2. **认证与授权路径混乱**：API-key 被浏览器集成拒绝、MCP 连接器 OAuth 失败后无法重新认证、账户网络策略绕过等，认证链路的健壮性和一致性成为高频痛点。
3. **长时任务可靠性**：上下文压缩后回复循环、断连、输出缓冲不一致等 Issue/PR 显示，长时运行任务的状态管理仍是开发重点。
4. **配置管理复杂度**：`config.toml` 混合用户配置与运行时状态、whimsy 动效默认开启、时间戳不可关闭——开发者希望获得更清晰、可控的配置边界。
5. **沙箱兼容性**：Linux bubblewrap 参数上限、macOS `TIOCSTI` 沙箱失败、Windows 沙箱凭据被拒，跨平台沙箱一致性问题贯穿多个 Issue。

---

*数据来源：GitHub `openai/codex` 仓库（统计时间窗口：2026-09-23 至 2026-09-24）*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-24

## 今日速览
- v0.62.0 系列开启发布，涵盖 nightly 与 preview 版本，带来连接恢复重试进度显示、A2A server 修复等改进；
- 一个标记为 CRITICAL 的 `@path` 展开导致意外文件上传的安全漏洞引发社区强烈关注（#26730），同时 OAuth/认证类问题持续高频出现；
- 社区对新模型接入（Gemini 3.8 Flash / 3.5 Flash Lite）的 PR 已进入主线流程，预计将为 CLI 带来最新模型支持。

---

## 版本发布

过去 24 小时共发布 4 个版本，核心变更如下：

### v0.62.0-nightly.20260924.g8e70c862f
- 运行前检查 VS Code 集成测试环境是否就绪（#29462, @DavidAPierce）
- 修复连接恢复过程中终端加载指示器无法显示重试进度的问题（#28340, @amelidev），此前界面会一直卡在 `"Thinking..."`

### v0.62.0-preview.0
- 修复 A2A server 在 tasks metadata 端点遇到不支持的 store 类型时缺少提前返回的问题（#29334, @jesussamuel-byte）
- 包含 v0.61.0-preview.0 及 v0.61.0 的 changelog

### v0.61.0（正式版）
- 自 v0.60.0-preview.0 以来的累计变更正式发布

### v0.61.0-preview.1
- 补丁版本，从 preview.0 分支 cherry-pick 修复后发布

---

## 社区热点 Issues

### 1. Subagent 达到 MAX_TURNS 被误报为 GOAL 成功 — #22323
- 优先级 P1 | 打开 | 评论 13 | 👍 2
- 摘要：`codebase_investigator` 子代理在达到最大轮数、未做任何分析时，仍返回 `status: "success"` / `Termination Reason: "GOAL"`，隐藏了真实的中断原因。直接影响 agent 任务结果的可靠性。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22323

### 2. [CRITICAL SECURITY] `@path` 展开导致意外文件上传 — #26730
- 优先级 P1 | 打开 | 评论 5
- 摘要：粘贴终端文本（如 `user@hostname:/path$`）时，`@path` 展开会被自动触发，可能将用户本地文件意外上传至模型上下文，构成严重安全风险。
- 链接：https://github.com/google-gemini/gemini-cli/issues/26730

### 3. AST-aware 文件读取/搜索/代码库映射影响评估（EPIC）— #22745
- 优先级 P2 | 打开 | 评论 7 | 👍 1
- 摘要：系列调研任务，评估 AST 感知工具是否能更精确地读取方法边界、降低 token 噪声、减少工具调用轮数，并为后续 `codebase_investigator` 优化铺路。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22745

### 4. Gemini 不使用自定义 skills 和 sub-agents — #21968
- 优先级 P2 | 打开 | 评论 6
- 摘要：用户反馈模型几乎不会主动使用已配置的 skills 和子代理，即使任务高度相关，必须显式指令才会调用，极大削弱扩展能力价值。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21968

### 5. CLI 不提示 OAuth 登录，要求手动配置 Auth 方法 — #28439
- 优先级 P2 | 打开 | 评论 6
- 摘要：全新安装后直接运行 `gemini` 不触发 OAuth 授权流程，而是要求手动设置 `GEMINI_API_KEY` 等环境变量，新用户上手门槛高。
- 链接：https://github.com/google-gemini/gemini-cli/issues/28439

### 6. OAuth 授权码交换失败致登录不可用 — #26171
- 优先级 P1 | 已关闭 | 评论 6
- 摘要：个人和组织账号登录均失败，错误为 `Failed to exchange authorization code for tokens`，调用 `oauth2.googleapis.com/token` 时请求失败。
- 链接：https://github.com/google-gemini/gemini-cli/issues/26171

### 7. Auto Memory 缺少确定性脱敏，敏感数据可能进模型上下文 — #26525
- 优先级 P2 | 打开 | 评论 5
- 摘要：Auto Memory 读取本地 transcript 并发送给后台提取模型，脱敏指令在内容进入模型上下文之后才执行；同时服务可能记录已有技能内容，存在隐私泄漏风险。
- 链接：https://github.com/google-gemini/gemini-cli/issues/26525

### 8. Browser Agent 忽略 settings.json 覆盖配置 — #22267
- 优先级 P2 | 打开 | 评论 4
- 摘要：`AgentRegistry` 虽能在初始化时正确读取合并 settings.json，但 Browser Agent 运行时完全忽略覆盖项（如 `maxTurns`），导致项目级配置无效。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22267

### 9. Browser 子代理在 Wayland 环境下失败 — #21983
- 优先级 P1 | 打开 | 评论 4 | 👍 1
- 摘要：浏览器子代理在 Wayland 会话中直接报 `Termination Reason: GOAL` 结束，无法正常工作，影响 Linux 用户核心体验。
- 链接：https://github.com/google-gemini/gemini-cli/issues/21983

### 10. 超过 128 个工具时 Gemini CLI 遭遇 400 错误 — #24246
- 优先级 P2 | 打开 | 评论 3
- 摘要：启用工具超过一定数量后 API 返回 400，用户期望 agent 能智能裁剪工具范围而不是直接报错，影响大规模 MCP 集成场景。
- 链接：https://github.com/google-gemini/gemini-cli/issues/24246

### 11. Agent 应主动停止/劝止破坏性行为 — #22672
- 优先级 P2 | 打开 | 评论 3 | 👍 1
- 摘要：复杂 git 操作中模型可能使用 `git reset` / `--force` 等危险命令，且对 DB 等外部资源操作缺少风险意识，社区希望能有安全阀机制。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22672

### 12. get-shit-done 输出 hook 导致崩溃 — #22186
- 优先级 P1 | 打开 | 评论 3
- 摘要：输出 hook 在完成用户总结时反复触发崩溃，影响自动化工作流稳定性，需要定位 Ink 渲染层问题。
- 链接：https://github.com/google-gemini/gemini-cli/issues/22186

---

## 重要 PR 进展

### 1. 支持 Gemini 3.8 Flash 与 3.5 Flash Lite — #29443
- 状态：已合并（含 cherry-pick 至 release 分支）| 优先级 P1 | size/xl
- 摘要：将 `gemini-3.8-flash` 与 `gemini-3.5-flash-lite` 提升为 Flash / Flash Lite 档位的正式可用 GA 模型。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29443

### 2. 修复连接恢复时终端 UI 不显示重试进度 — #29468
- 状态：已合并 | 优先级 P1 | size/l
- 摘要：连接失败、429、503 等场景下，终端此前一直卡在 `"Thinking..."`；现在可正确展示重试进度与恢复状态。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29468

### 3. 限制工具输出大小，优化长时 agent 循环内存生命周期 — #29451
- 状态：打开 | 优先级 P1 | size/l
- 摘要：针对构建、测试等高工具调用量的长任务，限制单次工具输出体积，防止进程内存无界增长，提升稳定性。
- 链接：https://github.com/google-gemini/gemini-cli/pull/29451

### 4. 防止中断轮次污染会话上下文 — #29265
- 状态：已关闭 | 优先级 P2 | size/m
- 摘要：修复 SIGINT、超时或工具执行中止后，合成 `✦ [The previous response was interrupted...]` 消息被写入会话历史、导致后续上下文混乱和无限循环的问题。
- 链接：https://github.com/google-gemini/gemini-cli/pull/292

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-24

## 1. 今日速览

昨日发布补丁版本 **v1.0.89-1**，新增 GPT-6 Sol / Luna 模型入口并修复 View 工具行范围、本地会话输入恢复等问题；社区层面，"HTTP/2 GOAWAY 竞态导致请求浪费"（+19）与 "DeepSeek API 无法使用"（+9）持续发酵，是当前最受关注的稳定性与自定义模型诉求。此外，围绕长会话认证失效、compaction 无限重试等新上报 bug 已进入 triage，值得关注。

## 2. 版本发布

### v1.0.89-1（补丁版）

**新增**
- 模型选择器新增 **GPT-6 Sol** 与 **GPT-6 Luna** 入口（可用时显示）。

**修复**
- View 工具在 providers 发送扁平化 `view_range` 参数时，正确遵循行范围。
- 本地会话中，在空聊天输入框按 ↑ 可恢复待发送消息，且不会打断当前队列中的提示。

🔗 https://github.com/github/copilot-cli/releases

## 3. 社区热点 Issues（精选 10 条）

### #2421 HTTP/2 GOAWAY 竞态导致连锁重试失败与 premium 请求浪费（closed）
- 👍 19 | 💬 8 | 状态：已关闭
- **为什么重要**：CLI 内部 undici HTTP/2 连接池在处理服务端 GOAWAY 帧时存在竞态，一处失败诱发大量重试和静默的 premium 请求消耗。该 issue 合并了 #1743、#1754、#2050、#2101、#2189 等多条相关问题，是当前社区反馈最强烈的稳定性问题之一。
- 🔗 https://github.com/github/copilot-cli/issues/2421

### #4535 `store_memory` 在 v1.0.81 预发布版中报 "Instance id is required"（closed）
- 💬 10 | 👍 1 | 状态：已关闭
- **为什么重要**：原生 memory writer 被调用时缺少必要实例 ID，导致 `store_memory` 在预发布版中持续失败，直接影响长期会话的上下文记忆功能，评论数高说明受影响用户面较大。
- 🔗 https://github.com/github/copilot-cli/issues/4535

### #2995 无法使用 DeepSeek API（closed）
- 👍 9 | 💬 9 | 状态：已关闭
- **为什么重要**：用户通过 `COPILOT_PROVIDER_BASE_URL` 等环境变量接入 DeepSeek 失败，是"自定义模型端点"需求最典型的社区案例。高赞 + 大量讨论反映出用户对第三方模型接入的高度期待。
- 🔗 https://github.com/github/copilot-cli/issues/2995

### #2827 改进所有类型限流（rate limit）的 UI 显示（closed）
- 👍 9 | 💬 3 | 状态：已关闭
- **为什么重要**：当前限流只会在触发时或周限额 75%/90% 时给出一次性警告，用户希望随时了解当前额度使用状况。高赞需求，涉及开发者最关心的成本控制体验。
- 🔗 https://github.com/github/copilot-cli/issues/2827

### #4929 进程内认证令牌停止刷新，所有提示失败直到重启（open / triage）
- 💬 3 | 状态：待处理
- **为什么重要**：新上报。长驻 CLI 进程会永久失去认证，`/login` 也无法恢复，只能重启。对长时间运行的自动化场景影响严重，属于需要优先定位的认证模块缺陷。
- 🔗 https://github.com/github/copilot-cli/issues/4929

### #4847 自动 managed-settings 刷新破坏 IDE MCP 重载并禁用 /allow-all（open / triage）
- 💬 4 | 👍 3 | 状态：待处理
- **为什么重要**：长会话中自动刷新 managed settings 时，会连带失败、导致 IDE 中动态贡献的 MCP 服务器重载失败，同时禁用 Computer Use 策略相关权限。涉及 IDE 集成稳定性与企业策略的交叉领域。
- 🔗 https://github.com/github/copilot-cli/issues/4847

### #4663 compaction 失败后每次对话都原样重试：无限计费重试 + 上下文单调增长（open）
- 💬 3 | 状态：待处理
- **为什么重要**：模型压缩调用失败后，CLI 不降级、不回退、不提示用户，而是每轮对话都重新发起一次完整的计费请求——既浪费费用又让上下文无限膨胀。属于成本 + 资源管理的严重缺陷。
- 🔗 https://github.com/github/copilot-cli/issues/4663

### #4844 --yolo 启动参数被预认证阶段的门禁策略吞掉，策略解析后不会重新应用（open / triage）
- 💬 4 | 状态：待处理
- **为什么重要**：自动启动时，CLI 在预认证窗口内采用 fail-closed 安全策略，把 `--yolo` / `--allow-all` 吞掉；等服务器策略到达后却不再重新应用。直接影响高级用户的权限绕过自动化工作流。
- 🔗 https://github.com/github/copilot-cli/issues/4844

### #2682 长运行 shell 命令应在后台任务 UI 中展示实时输出（open）
- 👍 5 | 💬 2 | 状态：开放
- **为什么重要**：当 agent 运行 `dotnet test` 等 5 分钟以上的命令时，界面完全无输出、会话看起来像卡死。这是一个高频可观测性需求（compare #1783 的子 agent 面板），能显著改善用户体验。
- 🔗 https://github.com/github/copilot-cli/issues/2682

### #4594 自定义 agent 的 `web` / `search` 工具别名绑定零工具（open）
- 💬 2 | 👍 1 | 状态：开放
- **为什么重要**：自定义 agent 按文档使用 `web` / `search` 别名声明工具时，静默绑定 0 个工具、无任何报错。该 bug 会让基于自定义 agent 的工作流在无感知情况下丢失联网与搜索能力，迷惑性极强。
- 🔗 https://github.com/github/copilot-cli/issues/4594

## 4. 重要 PR 进展

> 说明：过去 24 小时内仅合并/更新 1 条 PR，以下如实呈现。

### #4948 Update github-script action pin（open）
- 作者：@klockhoffbjorn-collab | 创建：2026-09-23
- **内容**：将 `actions/github-script` 依赖更新至 v9.0.0 release commit；仓库无运行时依赖清单，核对后其余 GitHub Actions 固定版本均已最新，`git diff --check` 通过。
- **意义**：属于供应链安全与 CI 依赖维护的常规更新，无功能变更。
- 🔗 https://github.com/github/copilot-cli/pull/4948

## 5. 功能需求趋势

从全部 Issues（含历史开放项）中提炼社区当前最关心的方向：

- **自定义模型端点 / 多 Provider 支持**（#2995、#4003）：用户强烈期望像 VS Code 一样配置本地 / 私有模型端点（DeepSeek、企业内网模型等），是呼声最高的功能方向之一。
- **限流与用量可观测性**（#2827）：除触发时报警外，用户希望随时查看当前速率、配额及剩余额度的 UI 或命令。
- **权限自动化与可控性**（#3877、#4844）：自动 `/allow-all` 配置、以及 `--yolo` 等标志在策略窗口下的确定性行为，是高频讨论点。
- **后台任务 / 子 agent 可观测性**（#2682、#1783）：长运行命令需要实时输出展示，子 agent 需要独立面板显示模型、推理等级与任务描述，提升 agent 运行的透明度。
- **插件生态自更新**（#3331）：通过市场配置自动更新插件，减少团队手动升级负担。
- **安全审核内置命令**（#1133）：对标 Claude Code 的 `/security-review`，希望将漏洞检测纳入 CLI 原生命令。

## 6. 开发者关注点

从近期反馈中提炼出以下痛点与高频诉求：

- **稳定性是核心矛盾**：多条高热度 issue 指向网络栈（#2421 GOAWAY 竞态）、内存写入（#4535）、认证续期（#4929）等基础模块在长会话/高并发场景下不可靠。
- **静默失败最令人反感**：compaction 无限重试（#4663）、自定义 agent 工具别名绑定为零（#4594）、managed-settings 刷新连带禁用权限（#4847）——这些"无报错但行为错误"的问题让用户难以自我诊断。
- **成本控制意识增强**：用户对因竞态或重试导致的 premium 请求浪费、compaction 重复计费非常敏感，希望 CLI 有更明确的失败降级与重试策略。
- **配置系统仍不够直观**：`--config-dir` 不符合预期（#2197）、sandbox 关闭后仍启用（#4521）、log-level 非法值导致崩溃（#4297），反映配置层一致性与校验需要加强。
- **终端体验细节持续受关注**：Warp 主题下颜色不适应系统明暗（#4843）、未聚焦 pane 丢 key 事件（#4213）、zsh 补全失效（#1063）等，说明开发者对终端环境下的一致体验有较高预期。
- **新功能安装链路脆弱**：语音模式（/voice）安装因内部 NuGet 源 401 失败（#4814、#4667），阻塞新功能落地，相关 issue 已进入 triage。

---

*本日报基于 GitHub 公开数据整理，数据截至 2026-09-23，日报日期标注为 2026-09-24。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-09-24

> 数据来源：[github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 1. 今日速览

📌 过去 24 小时内无新版本发布、无新 PR 提交，社区活跃度集中在两个历史 Issues 的更新上。其中 **#2596 关于 Agent 在 yolo 权限模式下误删工作区外用户数据** 的严重安全事件仍在发酵（1 条新评论），值得所有使用者警惕；另一个 **#1547 认证失败 bug 已标记关闭**，算是对近期认证问题的阶段性收尾。

---

## 3. 社区热点 Issues

仅在昨日（2026-09-23）有更新的 Issues 共 **2 条**，均对社区有较高参考价值，列示如下：

### 🔴 #2596 [OPEN] Agent 在工作区外执行 `rm -rf`，删除用户会话数据
- **作者**：@iMaxTomas
- **创建**：2026-08-07 ｜ **更新**：2026-09-23 ｜ **评论**：1 ｜ 👍：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2596

**事件概述**：用户在会话中要求 Agent（Kimi Code CLI，**yolo 权限模式**）清理它自己创建的软链接 `~/.pi/agent/sessions`。但清点发现，该软链接的创建在一开始就已失败（`ln -sfn` 指向了一个已存在的真实目录），Agent 并未察觉。后续清理动作直接对**真实目录**执行了 `rm -rf`，导致用户会话数据被永久删除。

**为何重要**：
- 这是典型的 **Agent 安全边界失效**案例，yolo 模式放行了工作区外的高危删除操作。
- 暴露出 Agent 对“自身操作是否成功”的错误前提没有重新校验，导致后续破坏性命令基于错误假设执行。
- 对日常依赖自动化清理功能的开发者，此事件具有很强的**警示意义**。

**社区反应**：目前讨论热度中等，已有用户在评论区讨论 yolo 模式下的权限保护机制能否覆盖此类“软链接/真实目录”的边界场景。

---

### 🟢 #1547 [CLOSED] [bug] 生成中途反复报错 “Authorization failed, please check your login status”
- **作者**：@Philipp-Pfeiffer
- **创建**：2026-03-22 ｜ **更新**：2026-09-23 ｜ **评论**：0 ｜ 👍：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1547

**事件概述**：使用 `kimi, version 1.24.0`（Linux 6.12.73-1 LTS x86_64）通过 Kimi Code 平台 + `kimi-for-coding` 模型进行生成长文本时，会遇到反复出现的 **“Authorization failed, please check your login status”** 错误，导致生成中断。该 Issue 已被标记为 **已关闭**。

**为何重要**：
- 认证问题是 CLI 工具的高频痛点，特别是在长期运行或长上下文生成时。
- Issue 持续了约 6 个月才关闭，说明该问题或在社区中影响面较广，最终被官方处理或归因到特定版本/平台问题。

**社区反应**：无评论，但关闭状态意味着官方已在某个版本中修复或标记为已知行为。

---

## 4. 重要 PR 进展

过去 24 小时内 **无 PR 更新**。暂无值得重点跟踪的合并或提交。

---

## 5. 功能需求趋势

基于当前所有活跃 Issues（以 #2596 为代表），社区对 Kimi Code CLI 的诉求呈现以下趋势：

| 方向 | 具体表现 | 潜在改进建议 |
|---|---|---|
| **安全与权限控制** | yolo 模式下缺少对**工作区外 / 真实目录 / 软链接边界**的防护，导致高危命令误执行 | 增加路径作用域白名单、对 `rm -rf` 等危险命令进行二次确认，或在删除前自动校验路径类型 |
| **Agent 状态自省** | Agent 未察觉此前 symlink 创建失败，继续执行基于错误前提的清理逻辑 | 引入“关键操作结果断言”，在依赖前序操作结果前自动回读校验 |
| **认证与授权稳定性** | #1547 所反映的长时间认证失败问题（现已关闭） | 继续完善 token 过期自动刷新、会话保持等能力，减少长任务中途中断 |
| **会话数据安全** | 用户 session 数据被误删，缺乏回收站/备份机制 | 为工作区外的删除操作增加“延迟删除”或“备份快照”，支持恢复 |

> 说明：由于过去 24 小时数据量有限，本趋势仅能基于现有 Issues 做出初步判断；如需要更全面的趋势分析，建议拉长观察窗口（如近 7–30 天）重新统计。

---

## 6. 开发者关注点

- **高危权限模式的信任边界**：yolo 模式虽然提升了自动化效率，但一旦 Agent 对前置步骤判断错误，可能产生比手工操作更严重的后果。开发者对该模式的安全护栏有较高期待。
- **环境差异导致的链路失效**：软链接创建失败往往发生在目标已存在、目录迁移、跨文件系统等场景，开发者希望 CLI 能主动识别并提示此类环境陷阱，而不是静默失败。
- **认证错误的排障路径**：尽管 #1547 已关闭，但认证问题的根因分析、自助排查方式仍是社区高频需求。
- **数据可恢复性**：CLI 工具在处理用户文件时应具备最低限度的安全网（如撤销、回收站），而不是直接物理删除。

---

*本日报基于截至 2026-09-24 的公开 GitHub 数据自动生成，覆盖范围有限。如需完整动态，请访问 [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-24

## 今日速览
今日社区最热门的议题是 OpenCode 免费层（free tier）模型在第三方路由和 CLI 环境下频繁报错（“free tier can only be used from within OpenCode”），已有多条高讨论量 Issue。与此同时，Zen Go 服务的计费与性能问题（prompt cache 命中率、解码速度）及一次 Console 迁移导致的付费账户数据丢失，也引发了用户对平台稳定性的集中关注。

## 社区热点 Issues（共 10 条）

1. **[#49433] OpenCode 免费层报错** — 评论 54，👍 15，这是当前社区最热的 Issue。用户在任何模型上都遇到 `Error from provider (Console): OpenCode's free tier can only be used from within OpenCode`，已有多个重复报告（如 #49678），表明该问题影响面较广，尚未定位到具体原因。
   https://github.com/anomalyco/opencode/issues/49433

2. **[#988] 为 MCP 远程服务器添加 OAuth 支持** — 该功能请求已持续一年，仍是社区强需求（👍 122）。用户希望直接用 URL 触发 OAuth 流程完成 MCP 服务器授权，免去手动复制密钥的繁琐步骤。
   https://github.com/anomalyco/opencode/issues/988

3. **[#45278] 订阅续费被无端拒绝** — 评论 22。用户声称同一张银行卡持续成功支付三个月后突然被拒，银行确认卡片无问题。该问题直指订阅/计费系统内部逻辑，令用户对 OpenCode 的信任受损。
   https://github.com/anomalyco/opencode/issues/45278

4. **[#49365] 升级后出现 TypeError** — 评论 10。升级后运行 `opencode --print-logs --log-level DEBUG run "hi"` 即触发 `TypeError: undefined is not an object (evaluating 'a.name')`，用户贴出了完整日志，是目前该问题下最清晰的一条报告。
   https://github.com/anomalyco/opencode/issues/49365

5. **[#50201] Console 迁移后付费账户丢失** — 评论 7，👍 4。用户反映付费的 Go workspace 在 Console 迁移后不可见，订阅、用量和发票记录全部消失，被引导到一个空组织。付费用户数据完整性问题严重。
   https://github.com/anomalyco/opencode/issues/50201

6. **[#50258] Go 上游频繁丢弃 prompt cache 导致约 50% 用量被重复计费** — 评论 6。用户报告 `frank/DeepSeek-V4.1-Flash` 在 17 小时内约一半的计费消耗来自不必要的全上下文重读，直接质疑后台缓存机制与计费公平性。
   https://github.com/anomalyco/opencode/issues/50258

7. **[#50915] debug config 明文输出 API 密钥** — 评论 5，属于安全问题。`opencode debug config` 会将 provider 的 API key 以明文形式完整渲染，在共享终端或录屏场景下存在凭据泄露风险。
   https://github.com/anomalyco/opencode/issues/50915

8. **[#50934] vcs diff 误报“无更改”** — 评论 2。Git 无法读取仓库时，`vcs.diff()` 返回“no changes”而非报告“diff 不可用”，掩盖了底层错误，影响用户对仓库状态判断的准确性。
   https://github.com/anomalyco/opencode/issues/50934

9. **[#50282] 所有 opencode/* 免费模型不可用** — 评论 2。`opencode/big-pickle`、`mimo-v2.5-free`、`deepseek-v4-flash-free` 全线返回 `Model is unavailable`，被用户判定为 gateway 级故障。
   https://github.com/anomalyco/opencode/issues/50282

10. **[#50634] 工具调用陷入死循环** — 评论 4。模型反复输出 “Let me do it. Emitting. Let me test. Emitting.” 的循环内容，疑似工具调用状态机出现异常，无法自行终止。
    https://github.com/anomalyco/opencode/issues/50634

## 重要 PR 进展（共 10 条）

1. **[#51009] Gemini 工具 schema 改用 parametersJsonSchema（已合并）** — 修复了 Google AI Studio、Vertex Gemini 及 Zen gateway 上工具 schema 因使用旧版 `parameters` 字段导致信息丢失的问题。
   https://github.com/anomalyco/opencode/pull/51009

2. **[#51015] 修复 V1 macOS CLI 发布前签名** — CI 调整，解决 Bun 交叉编译后 `codesign --verify` 失败的问题，确保 V1 macOS 可执行文件签名有效。
   https://github.com/anomalyco/opencode/pull/51015

3. **[#46912] 修复管道输出 JSON 被截断** — `export`、`session list --format json`、`db --format json` 在 `process.exit()` 前未等待 stdout 写入完成，导致管道场景下输出不完整。
   https://github.com/anomalyco/opencode/pull/46912

4. **[#49229] Provider 默认超时改为 5 分钟** — 将响应头和流式 chunk 间隔超时统一设为 5 分钟，chunk 计时在有数据到达时自动重置，以限制空闲而非总耗时。
   https://github.com/anomalyco/opencode/pull/49229

5. **[#32370] 增加 Linux PRIMARY 剪贴板支持** — 新增 `linux_clipboard_selection` 配置项，支持中键粘贴（primary buffer），并修复了 wl-copy MIME 问题。
   https://github.com/anomalyco/opencode/pull/32370

6. **[#50107] 修复无 family 的模型不显示** — Web/Desktop 模型选择器按 family 分组时，Remeda 会丢弃 family 为 `undefined` 的条目，导致部分模型不出现在列表中。
   https://github.com/anomalyco/opencode/pull/50107

7. **[#50051] 规范 GitHub Action 生成的 commit 标题** — 模型生成的摘要作为 commit subject 时可能不符合 conventional commit 规范，此 PR 做规范化处理。
   https://github.com/anomalyco/opencode/pull/50051

8. **[#50805] 从标签页和会话菜单复制 Session ID** — 此前复制 Session ID 只能通过 palette 命令，此 PR 在 TUI 和 App 菜单中直接增加复制入口。
   https://github.com/anomalyco/opencode/pull/50805

9. **[#51012] 修复 SDK 中嵌入式请求信号释放** — 诊断证明此变更无法解决 Agent memory 问题，PR 处于 `do not merge` 状态，避免引入无效改动。
   https://github.com/anomalyco/opencode/pull/51012

10. **[#51001] 点击 MCP 行直接启动登录** — 修复点击“Sign in required”的 MCP 行却断开连接的问题，改为启动登录流程且保持连接状态。
    https://github.com/anomalyco/opencode/pull/51001

## 功能需求趋势
- **免费层与认证相关修复** — 多条 Issue 指向免费层模型不可用、认证失败问题，是当前社区最迫切的需求。
- **计费透明度与公平性** — 用户开始关注缓存未命中导致的额外计费（#50258）、订阅支付异常（#45278）、订阅状态可见性（#50201、#51008），说明付费用户体验已成为重要议题。
- **剪贴板与终端体验优化** — Linux PRIMARY selection（#43176）持续被关注，TUI 在流式渲染、模型选择器交互方面的细节改进需求密集。
- **安全与隐私** — 自动审核中发现 debug 配置明文输出凭据（#50915），安全检测类功能需求开始出现。
- **新模型支持** — 社区期望跟随上游模型迭代，如 bump gitlab-ai-provider 至 6.18.0（#50889）以接入 GPT-6 Sol 和 Luna。
- **V2 SDK/CLI 稳定性补全** — 包括多会话并发写入（Windows EPERM）、Basic Auth 认证失败、插件工具调用等问题，V2 仍在补全基础能力。

## 开发者关注点
- 免费层报错被反复报告且暂无官方回应，开发者反馈“不知道发生了什么”，说明问题紧迫性高、沟通不足。
- 多个用户反映在账号迁移或订阅流程中遇到数据丢失或状态不一致，付费信任成本上升。
- 缓存机制不合理（prompt cache 频繁失效）直接导致账单增加，用户开始要求在 UI 中展示缓存命中率或提供关闭缓存选项。
- 调试命令输出包含敏感信息（API key），在多人协作场景下存在实际泄露风险。
- Linux 用户对剪贴板支持缺失有持续诉求，mid-paste（PRIMARY）是高频操作。
- 开发者希望错误信息更明确，如 vcs.diff 的错误语义、模型不存在时应报错而非静默失败。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-24）

## 今日速览

昨日发布两个新版本：`v0.24.4-nightly.20260923` 修复了 deferred-tool bridge 相关缺陷，`cua-driver-rs v0.20.11` 提供三平台预编译二进制。社区讨论热度集中在安全加固（64 位文件 ID 导致的校验失效）与上下文/token 优化（agent 重复调查历史信息）两大方向；今日新开的 PR 则显示 Agent 远程运行与 A2A 共享等协作能力正在加速推进。

---

## 版本发布

### v0.24.4-nightly.20260923.d0cd622a68
- **fix(core,docs)**：修正 deferred-tool bridge 中因变更而过时或未覆盖测试的内容（PR #12355）
- **docs(plans)**：更新相关规划文档

### cua-driver-rs v0.20.11（Qwen CUA Driver 预编译二进制）
- **macOS**：codesigned + notarized 通用二进制，包含 `QwenCuaDriver.app`
- **Linux**：未签名（x86_64 + arm64，最低 glibc 2.31）
- **Windows**：未签名 UIAccess worker + 原生 SDK payload（x86_64 + arm64）

---

## 社区热点 Issues

### 1. web-shell 发布包存在 `@/` 类型导入与依赖内联问题（P1）
**#12185** | 7 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12185)
`@qwen-code/web-shell` 已进入发布流水线（#12178），但其包产物包含无法解析的 `@/` 类型导入，并将 6 个声明的运行时依赖内联进产物，npm 消费者会直接遇到构建失败。P1 优先级，需尽快修复打包链路。

### 2. CLI 回调身份变化导致活动工具调度器被替换
**#12061**（已关闭）| 8 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12061)
`useReactToolScheduler` 在调用方回调身份变化时会重建 `CoreToolScheduler`，而 `useLlmStream` 传入的是内联异步回调，工具状态更新触发重渲染后可能替换仍拥有活动批次（active batch）的调度器。评论区活跃度最高，是典型的状态管理边界问题。

### 3. 会话提交注册未覆盖所有落地 commit 的路径（安全）
**#12514** | 5 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12514)
上一轮修复（#12460/#12463）遗留两处 review 发现：某些 git 操作拼写或路径未被会话提交注册覆盖，导致 agent 本会话内创建的提交被误判为"非本会话创建"而触发 amend 阻断。属于安全边界完善。

### 4. Windows 上 64 位 NTFS 文件 ID 令安全检查失效
**#11848** | 5 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/11848)
`isSameFile` 与删除日志交换检查在 stat 时未传 `{ bigint: true }`，当卷的文件 ID 超过 2^53 时校验降级为弱检查（fail open）。Windows 高容量卷会直接触发。由此派生出 #12574、#12577、#12578、#12581 等多个后续 issue/PR。

### 5. MCP 客户端将 tools-only 服务器误判为断开连接
**#12496** | 4 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12496)
MCP 服务器若只实现 `tools/list` 而不实现 `prompts/list`/`resources/list`，返回 -32601 会被客户端当作传输错误处理，进而将服务器标记为 disconnected。影响所有只提供工具的 MCP 服务器，0.23.0 与预览版均受影响。

### 6. eager 工具表面是手维护静态列表，缺乏自动选择机制
**#12326** | 5 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12326)
这是长上下文优化的一部分：`tools.eager` 是当前唯一能实质缩减 resident 工具集的手动开关，社区希望由系统自动决定常驻工具集，同时不破坏 prompt 前缀缓存。测量工具已在 #12119 落地，本 issue 讨论"由谁选择"的问题。

### 7. Agent 重复调查对话历史中已有的信息（token 浪费）
**#12579** | 3 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12579)
当用户询问会话中已做过/读过/讨论过的事情时，agent 经常从头调查而非基于历史作答，重复读文件、重复跑搜索。本地 LLM 用户受此影响尤甚，社区呼吁利用会话历史减少重复推理与 token 消耗。

### 8. 遥测通道上传未脱敏的原始工具错误文本（P1 安全）
**#11198**（已关闭）| 4 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/11198)
默认开启的 usage-statistics 通道将 shell 错误等原始工具错误文本直接上传 RUM 端点，无任何脱敏，其中可能包含敏感命令参数。该问题属存量缺陷，当前 main 分支仍存在。

### 9. save-artifact 覆盖保护缺少硬链接见证
**#12578** | 4 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12578)
#11848 的后续：`save-artifact` 的 `isSameFile` 覆盖保护未覆盖硬链接场景，`--out` 别名指向同一 inode 时守卫无法识别。已由 PR #12581 添加 3 行硬链接见证测试。

### 10. 托管记忆变更时通知第三方（Hooks 新需求）
**#12558** | 4 评论 | [链接](https://github.com/QwenLM/qwen-code/issues/12558)
社区希望新增 `MemoryChanged` hook 事件，在 Qwen Code 创建、更新、删除托管记忆（managed memories）以及启用/停用记忆时通知第三方。要求 hook 失败不能回滚已应用的变更，属于可观测性与生态集成方向。

---

## 重要 PR 进展

### 1. 修复 deferred-tool bridge 两半部分对工具名的解析不一致
**#12539** | 最新更新 09-24 | [链接](https://github.com/QwenLM/qwen-code/pull/12539)
解决 #11321 中延期处理的两条 review 发现：`tool_search` 与 `tool_call` 现在以**同一套规则**解析工具名，修正 schema 指纹缺失、隐藏工具可被名称直接调用等遗留问题。与今日 nightly 的修复同源。

### 2. 在远程计算机上运行 Agent，并通过 A2A 共享（新特性）
**#12582** | 今日创建 | [链接](https://github.com/QwenLM/qwen-code/pull/12582)
在 #11206

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*