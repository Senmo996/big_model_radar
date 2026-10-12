# AI CLI 工具社区动态日报 2026-10-12

> 生成时间: 2026-10-12 03:08 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-12）

## 1. 生态全景

当前 AI CLI 工具已从单一的编码助手演进为**多形态、多平台的 Agent 运行时**，各工具均在强化子代理、MCP/技能集成与远程控制能力。社区反馈高度集中在三大共性痛点：**Windows 平台稳定性**（Claude Code、Codex、Copilot CLI 均有集中反馈）、**成本控制与模型路由**（Claude Code 93.8% Token 流向 Opus 实测数据引发共鸣）、**子代理可靠性与可观测性**（Gemini CLI 多个 P1 级挂起/误报问题）。同时，Agent Skills 标准化（`.agents/skills/` 目录）成为首个跨工具呼声最高的功能需求，标志生态正从私有约定走向开放标准。整体而言，工具能力边界快速扩大的同时，**平台工程化与可靠性**已成为下一阶段竞争焦点。

---

## 2. 各工具活跃度对比

| 工具 | 今日 Issue 动态 | 今日 PR 动态 | 版本发布 | 活跃度评估 |
|---|---|---|---|---|
| **Claude Code** | 10+（精选：标准化目录 58👍、成本路由 24👍、数据丢失） | 1（文档对齐） | 无 | 中高：Issue 讨论深度高，但 PR 节奏平稳，处于功能打磨期 |
| **OpenAI Codex** | 5+（Web 限流 30 评论、Windows 阻断故障） | 约 10 个（TUI/插件/app-server） | 无 | 高：PR 密集合入，官方机器人响应积极，Issue 以平台 bug 为主 |
| **Gemini CLI** | 10（P1 级子代理问题为主） | 3 个关键 PR + 夜间构建 | v0.65.0-nightly | 高：每日夜间发布，Issue/PR 双高，处于快速迭代期 |
| **Copilot CLI** | 10+（MCP 兼容、ACP 缺陷、终端渲染） | 0 | 无 | 中：Issue 侧活跃但 PR 停滞，社区反馈以新问题提交为主 |
| **Kimi Code CLI** | 0 | 0 | 无 | 低：24 小时内无任何活动，暂处沉寂期 |
| **OpenCode** | 10（SSH 剪贴板、订阅计费、GPT-5.x 兼容） | 6（GPT-6.1 500k、zstd 压缩、UI 修复） | 无 | 中高：社区活跃、PR 数量可观，但团队规模有限，多数 PR 为小型修复 |
| **Qwen Code** | 10（双路径架构提案 53 评论、Web Shell 增强） | 10 个（managed-agent 为主） | v0.25.1 + SDK + Desktop | 高：Release + PR + 架构讨论全维度活跃，处于快速成长期 |

---

## 3. 共同关注的功能方向

### ① 成本控制与上下文优化
| 工具 | 具体诉求 | 关键数据 |
|---|---|---|
| Claude Code | 智能模型路由、空闲超时自动 compact | 93.8% Max 订阅 Token 流向 Opus；21👍 支持缓存优化 |
| OpenAI Codex | 避免后续上下文重发 base64 图像载荷 | 15 评论、8👍，上下文膨胀直接浪费 Token |
| Copilot CLI | 始终可见的上下文窗口状态指示器 | 11👍，接近上限时 LLM 表现明显下降 |

### ② Windows 平台稳定性
- **Claude Code**：多行粘贴回归（#101424）、headless 权限异常、ECONNRESET 连接中断——3 个独立问题同日出现
- **OpenAI Codex**：`setup refresh had errors` 全命令失败（已关闭）、workspace settings 无法加载（更新后依旧）
- **Copilot CLI**：Git 二进制权限、winget 安装路径问题持续发酵
- **OpenCode**：Windows + SSH 下剪贴板复制失效（10 评论，已关闭）

### ③ 子代理/Agent 可靠性
- **Gemini CLI**：MAX_TURNS 后误报 GOAL 成功、generalist 无限挂起、浏览器代理 Wayland 失败——3 个 P1 级问题
- **Claude Code**：插件内子代理 `model:` 配置被忽略，插件作者无法固定低成本模型
- **Qwen Code**：Managed Agent 会话恢复（#13801）的修复 PR 链，以及工具轮次 recovery 阻塞问题

### ④ Agent 技能标准化与可发现性
- **Claude Code**：#16345 支持 `.agents/skills/` 标准目录（58👍，今日最热）
- **Gemini CLI**：配置了 gradle/git skill 但 Gemini 几乎不主动调用（P2，7 评论）
- **Copilot CLI**：Atlassian Rovo MCP 连接器认证失败，所有 Jira/Confluence 工具 401

### ⑤ 配置系统可信度
- **Gemini CLI**：BrowserAgent 忽略 settings.json 的 `maxTurns` 覆盖；Claude Code 远程 Mods 开关与文档矛盾；Qwen Code 有 CJK 队友名称被 sanitize 国际化 bug

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 典型场景与用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 面向专业开发者的**高可靠编码 Agent** | 大规模代码库维护、长时间自动任务、成本敏感型团队 | 稳扎稳打，优先解决成本/数据安全问题；推动 Agent Skills 生态标准化 |
| **OpenAI Codex** | 与 ChatGPT Web 深度联动的**全栈 AI 开发平台** | ChatGPT 订阅用户、Web/桌面端重度用户 | 依赖云端服务（限流直接影响使用）；桌面/TUI 体验快速迭代，Windows 支撑不足 |
| **Gemini CLI** | 实验性最强的**多代理协同与安全探索** | 探索型开发者、Linux 桌面用户、企业架构验证 | 高频夜间发布、分代理架构（generalist/browser/codebase_investigator）；重视安全设计（OS 沙箱提案、环境变量最小化） |
| **GitHub Copilot CLI** | 嵌入 GitHub 生态的**企业级自动化工具链** | GitHub 重度用户、ACP 协议自动化集成、Atlassian/Jira 生态用户 | 以 MCP 连接器扩展生态，主推 ACP 非交互模式（但缺陷较多）；企业环境（代理/托管）适配是短板 |
| **OpenCode** | 开源社区的**轻量高兼容 Agent 框架** | 使用 AI SDK/OpenAI 兼容网关的开发者、离线/内网环境用户 | 快速跟随新模型（GPT-5.x/6.1 适配）、自研桌面端/CLI；维护力量有限，PR 以小步修复为主 |
| **Qwen Code** | 面向未来的**全链路 Agent 架构探索者** | 关注 Managed Agent 架构的开发者、Linux 桌面用户（Flathub 诉求） | 架构前瞻（ACP/daemon 线路元数据、托管运行时分阶段交付）；分发渠道扩展积极（Desktop、Flathub） |

---

## 5. 社区热度与成熟度

### 高速迭代期（Release 频繁 + PR 量高 + 社区讨论活跃）
- **Qwen Code**：v0.25.1 + 10 PR + 53 评论级架构提案，产品与社区双轮驱动
- **Gemini CLI**：每日夜间版 + 10+10 Issue/PR，功能迭代速度快，但 P1 级可靠性问题偏多，说明质量管控仍有提升空间

### 稳定成长期（社区讨论深、PR 节奏稳）
- **Claude Code**：Issue 热度高（58👍 功能请求）、PR 仅 1 条且为文档对齐，说明 API 层已相对稳定，社区主要诉求从“能不能用”转向“怎么省成本/提效率”
- **OpenAI Codex**：PR 合入密（约 10 个/日），官方响应积极，但社区反馈集中在 Windows/Web 基础设施层面，成熟度受平台拖累

### 平台依赖期（Issue 活跃但 PR 节奏偏慢）
- **GitHub Copilot CLI**：当日无 PR，10+ 新 Issue 集中于协议/MCP 兼容性问题，社区活跃但官方输出滞后
- **OpenCode**：社区覆盖 Windows/SSH/旧版本迁移等场景，6 个 PR 均为小型修复，成熟度处于“能用但需打磨”

### 沉寂期
- **Kimi Code CLI**：零活动，可能处于内部重构或运营调整阶段

---

## 6. 值得关注的趋势信号

### 信号一：成本控制不再是“优化项”，而是“基础能力”
Claude Code 用户实测 93.8% Token 流向 Opus，Copilot CLI 用户要求上下文窗口占用可见，Codex 用户抱怨 base64 图像重复发送——**“无感知的成本黑洞”** 正在侵蚀用户信任。未来工具的核心竞争力将从“模型能力”转向“Token 使用效率”和“费用可视化”。

### 信号二：Windows 是 AI CLI 工具共同的“阿喀琉斯之踵”
Claude Code、Codex、Copilot CLI、OpenCode 在同一天集中暴露 Windows 问题（多行粘贴、权限异常、沙箱初始化失败、剪贴板失效），且多为主干功能。**Windows 开发者体验的系统性缺失**，正在成为这些工具向企业开发者渗透的关键瓶颈。

### 信号三：Agent Skills 标准化进程加速，但“会做”和“会用”之间有鸿沟
Claude Code 社区声援 `.agents/skills/` 标准目录、Gemini CLI 用户抱怨 skill 不主动调用——**技能的“定义、发现、触发”全链路**需要新的协议支持。agentskills.io 之类的标准能否成为“Agent 世界的 OpenAPI”，值得关注。

### 信号四：子代理的结果可信度成为安全性的新维度
Gemini CLI 的子代理在 MAX_TURNS 后误报 `status: "success"`，与 Claude Code 的 Rewind 误覆盖（20 小时工作丢失）本质相同：**Agent 对自身失败状态的认知错误比功能缺失更危险**。可观测性（子代理内部上下文上报）与失败语义的标准化，是下阶段 Agent 工程化的核心挑战。

### 信号五：多端协同开始从“移动端查看”走向“移动

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-12）

## 1. 热门 Skills 排行

以下为当前社区关注度较高的 Pull Requests，涵盖核心能力修复、新领域扩展及安全加固：

### 1.1 mcp-builder 兼容性修复（#1742）
- **功能**：修复 MCP Builder 在 `mcp>=2.0.0` 下的兼容问题，适配 `streamable_http_client` 重命名及自定义 HTTP Headers 的新配置方式。
- **社区热点**：MCP 生态快速迭代，该修复直接影响大量依赖 MCP Builder 的开发者，解决了升级后的直接报错与连接失败问题。
- **状态**：open（2026-09-08 创建，2026-10-08 更新）
- **链接**：https://github.com/anthropics/skills/pull/1742

### 1.2 skill-creator 触发评估修复（#1298）
- **功能**：修复 skill-creator 触发评估的误报与假阴性问题，包括 Windows 管道兼容、无关工具干扰扫描、运行时失败不当视为非触发等。
- **社区热点**：该 PR 对应多个 issue（#1383、#1352、#556），是当前反馈最集中的 skill 质量问题，直接影响技能自动化评估的准确性。
- **状态**：open（2026-06-10 创建，2026-09-16 更新）
- **链接**：https://github.com/anthropics/skills/pull/1298

### 1.3 ProofCore 智能合约审计 Skill（#1771）
- **功能**：新增 `proofcore-contract-auditor`，为 Web3 开发者提供 Solidity 与 Rust 智能合约静态分析，并将审计证明锚定到 TON 区块链。
- **社区热点**：Web3 安全审计是新兴需求，将 AI 分析与区块链存证结合，属于高差异化新技能。
- **状态**：open（2026-09-15 创建）
- **链接**：https://github.com/anthropics/skills/pull/1771

### 1.4 md2video-audio Skill（#1703）
- **功能**：新增 `md2video-audio`，将 Markdown 文档直接编译为带拟人语音的 MP4 视频，支持 Marp 转幻灯片、语音合成与配音流程。
- **社区热点**：零成本内容生产自动化，面向教育、营销和文档演示场景，契合当前 AIGC 内容生成趋势。
- **状态**：open（2026-09-01 创建，2026-09-15 更新）
- **链接**：https://github.com/anthropics/skills/pull/1703

### 1.5 Notion Spec 到实现 + 量化简历审计（#1245）
- **功能**：一次提交两个 Skill——`notion-spec-to-implementation` 将产品/技术规格自动拆解为 Notion 实施任务；`quantitative-resume-auditor` 审计量化简历。
- **社区热点**：规格到任务的自动化流转是企业工作流的核心痛点，同时量化简历审计填补了专业求职辅助技能空白。
- **状态**：open（2026-06-02 创建，2026-09-30 更新）
- **链接**：https://github.com/anthropics/skills/pull/1245

### 1.6 AWT——AI 驱动的 E2E 测试 Skill（#822）
- **功能**：新增 AWT（AI Watch Tester），通过视觉与浏览器控制自动生成并执行零代码端到端测试。
- **社区热点**：测试自动化和 AI 视觉回归是社区长期关注方向，该 Skill 将 E2E 测试门槛大幅降低。
- **状态**：open（2026-03-31 创建，2026-09-19 更新）
- **链接**：https://github.com/anthropics/skills/pull/822

### 1.7 文档排版质量 Skill（#514）
- **功能**：新增 `document-typography`，检测 AI 生成文档中的孤行、寡段、标题孤立及编号错位等排版问题。
- **社区热点**：针对 AI 生成文档的细节质量提升，用户对"最终还是人肉眼检查排版"的痛点有强烈共鸣。
- **状态**：open（2026-03-04 创建，2026-03-13 更新）
- **链接**：https://github.com/anthropics/skills/pull/514

### 1.8 Skill 质量/安全分析元技能（#83）
- **功能**：在 marketplace 中新增两个 meta skills——`skill-quality-analyzer` 从结构、文档、示例、可测试性等五维评估技能；`skill-security-analyzer` 检查技能的安全风险。
- **社区热点**：随着技能数量激增，社区开始关注技能本身的质量和安全性，这是生态自我治理的信号。
- **状态**：open（2025-11-06 创建，2026-01-07 更新）
- **链接**：https://github.com/anthropics/skills/pull/83

---

## 2. 社区需求趋势

从 Issues 中可提炼以下主要需求方向：

- **技能安全与信任边界**（#492）：社区强烈担忧第三方技能在 `anthropic` 命名空间下分发导致的信任滥用，要求官方明确来源标识和权限管控。
- **Skill-Creator 可靠性与评估准确性**（#556、#1352、#1383）：集中反馈 `run_eval.py` 触发率异常、并行 worker 串 ID、静默失败等问题，说明社区对自动化评估工具的依赖度极高且期待更稳健的实现。
- **上下文窗口效率**（#1487）：如 `claude-api` 技能一次性注入约 156k tokens 导致上下文耗尽，社区需要"按需加载/压缩"的技能设计模式。
- **组织级协作与治理**（#228、#412）：企业用户期望组织内技能共享、统一管理，并对 AI Agent 提出治理/安全模式的需求。
- **专业领域技能扩展**（#1329、#1385）：包括紧凑符号记忆（compact-memory）、推理质量门流水线等，显示用户对 Agent 状态管理和输出质量控制的深层需求。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、最近有更新，且解决的问题明确，具备较高落地可能性：

- **#1742 mcp-builder 兼容性修复**：更新至 10-08，直接修复新版本 MCP 的破坏性变更，是生态刚需。  
  https://github.com/anthropics/skills/pull/1742
- **#1961 skill-creator eval viewer 安全加固**：更新至 10-11，修复脚本逃逸、DNS rebinding、跨站 POST 等漏洞，安全类修复通常会被优先处理。  
  https://github.com/anthropics/skills/pull/1961
- **#1771 ProofCore 智能合约审计**：Web3 垂直领域稀缺技能，新增不到一个月仍保持关注。  
  https://github.com/anthropics/skills/pull/1771
- **#1703 md2video-audio**：AIGC 内容生成方向，生命周期完整，社区对新内容创作 skill 接受度高。  
  https://github.com/anthropics/skills/pull/1703
- **#1245 Notion Spec 到实现**：与主流项目管理工具深度集成，贴近企业工作流，长期活跃。  
  https://github.com/anthropics/skills/pull/1245
- **#822 AWT E2E 测试**：测试自动化需求稳定，虽创建较早但仍在迭代，说明维护者持续投入。  
  https://github.com/anthropics/skills/pull/822

---

## 4. Skills 生态洞察

当前社区最集中的诉求是：**提升 Skills 的可靠性、安全性与上下文效率，同时向 Web3、测试自动化、企业工作流等专业方向快速扩展。**

---

# Claude Code 社区动态日报 — 2026-10-12

> 数据来源：github.com/anthropics/claude-code

## 今日速览

社区对 **Agent Skills 标准目录 `.agents/skills/` 的原生支持**呼声高涨（58👍 / 30评论），已成为当前最受关注的功能请求；与此同时，**Windows 平台多项回归 bug**（多行粘贴、headless 权限）与 **Rewind 功能数据丢失**问题引发开发者对可靠性的讨论；模型路由优化请求持续获得支持（24👍），表明开发者对 Opus 用量成本**优化的需求依然强烈**。

---

## 社区热点 Issues

精选 10 条最值得关注的 Issue：

### 1. 支持标准 `.agents/skills/` 目录（🔥 最热）
**#16345** | [链接](https://github.com/anthropics/claude-code/issues/16345) | 评论 30 | 👍 58

Agent Skills 标准（agentskills.io）已将 `.agents/skills/` 定为技能共享推荐位置，但 Claude Code 目前仅从 `.claude/skills/` 加载。该请求获得大量社区共鸣，是当前呼声最高的功能需求。

### 2. Windows 持续报 API 连接中断（ECONNRESET）
**#87500** | [链接](https://github.com/anthropics/claude-code/issues/87500) | 评论 17 | 已关闭

Windows 用户连续 5 小时遭遇连接中断错误，调试信息已提交，问题最终关闭。反映 Windows 平台网络稳定性仍需加强。

### 3. 空闲超时自动压缩防止缓存过期成本
**#66115** | [链接](https://github.com/anthropics/claude-code/issues/66115) | 评论 16 | 👍 21

长时间运行测试时用户离开会话，5 分钟后缓存过期导致重新处理完整上下文，既慢又贵。请求在超时前自动 compact，21 人点赞，成本敏感型用户普遍关注。

### 4. 智能模型路由 — 93.8% Max 订阅 Token 未优化
**#27665** | [链接](https://github.com/anthropics/claude-code/issues/27665) | 评论 14 | 👍 24

作者通过 `ccusage` 实测发现 Claude Code 无自动模型路由，Max 订阅用户 93.8% Token 流向 Opus 而无优化。该 issue 整合了 30+ 相关重复请求，是成本优化的代表性提案。

### 5. Apple Max 20x 订阅被误识别为 Pro
**#98134** | [链接](https://github.com/anthropics/claude-code/issues/98134) | 评论 9 | 状态 OPEN

macOS 用户通过 Apple 订阅的 Max 20x 计划被系统错误识别为 Pro，影响额度计算。涉及计费正确性，需重视。

### 6. v2.1.288 远程 Mods 被关闭，与文档矛盾
**#99130** | [链接](https://github.com/anthropics/claude-code/issues/99130) | 评论 5 | 👍 5

文档宣称 2.1.287+ 默认开启 Mods，但 2.1.288 通过远程开关实际返回关闭。文档与行为不一致，让开发者困惑。

### 7. Windows 任务计划程序 headless 会话权限异常
**#99795** | [链接](https://github.com/anthropics/claude-code/issues/99795) | 评论 3

通过任务计划程序启动的 `-p` 会话拒绝已允许的工具调用，手动执行同样命令却正常。自动化场景的关键阻塞问题。

### 8. 【严重】Rewind 报错后仍覆盖 20 小时编辑
**#101188** | [链接](https://github.com/anthropics/claude-code/issues/101188) | 评论 2 | 标签: data-loss

Rewind 提示"无法恢复"，但磁盘文件仍被改动，对话未回滚，导致约 20 小时工作丢失。数据安全级 bug，建议尽快排查。

### 9. 记账 bug：免费账户被扣 $600
**#96339** | [链接](https://github.com/anthropics/claude-code/issues/96339) | 评论 4 | 标签: invalid

用户声称免费账户产生 $600 费用且信用额度未生效。虽然标记为 invalid，但计费透明度问题值得关注。

### 10. Plugin 子代理 `model:` 配置被忽略
**#89723** | [链接](https://github.com/anthropics/claude-code/issues/89723) | 评论 1

插件内 `agents/*.md` 的 `model:` frontmatter 不生效，项目级文件正常。插件作者无法固定低成本模型，违背插件开发预期。

---

## 重要 PR 进展

仅 1 条 PR 在过去 24 小时内有更新：

### #79150 docs: 对齐 code-review README 与实际命令
[链接](https://github.com/anthropics/claude-code/pull/79150) | 创建于 2026-07-19 | 最后更新 2026-10-11

**摘要**：code-review README 描述了一个当前命令已不实现的流水线（git blame/history agent、0-100 置信度评分系统、80 分阈值过滤），文档中"过滤掉低于 80 分的问题"的配置说明已不存在。该 PR 将文档与实际基于校验的命令对齐。

---

## 功能需求趋势

从今日所有 Issues 中提炼社区最关注的几个功能方向：

### 1. Agent Skills 标准化
`#16345` 和 `#101422` 均指向技能目录标准化的需求——支持 `.agents/skills/` 标准路径，以及允许配置同步技能的位置。社区希望跟上 agentskills.io 生态，而不是绑定在 `.claude/skills/` 私有路径上。这对**多工具间的技能复用**具有重要意义。

### 2. 成本控制与模型路由优化
`#27665`（智能路由，24👍）和 `#66115`（缓存优化自动 compact，21👍）代表了对成本精细化管理的高涨需求。Max 订阅用户希望更聪明的模型选择策略，而非无差别使用 Opus。

### 3. 桌面端/UI 增强
`#98565`（分组模式下缺少"最近活动"过滤）、`#101421`（Agent 视图创建新会话）、`#82395`（后台任务按最近活动排序）反映桌面端工作流管理体验仍有改进空间，特别是多会话、多文件夹的重度用户。

### 4. 远程控制与跨端同步
`#101418`（远程 AskUserQuestion 元数据丢失）、`#99130`（远程 Mods 开关不一致）说明远程控制（Web/移动端）功能的细节可靠性尚不完善。

---

## 开发者关注点

### 🔴 数据安全与可靠性
- **Rewind 误覆盖**（#101188）：提示失败却修改了文件，20 小时工作丢失，这是最严重的一类问题
- **StopFailure 钩子被提前杀死**（#101420）：外部进程在 headless 模式下启动后 10-50ms 即被终止，自动化的重大阻碍

### 🔴 Windows 平台问题集中
- 多行粘贴回归（#101424，2.1.296 在 Windows 上每换行即提交）
- 任务计划程序权限异常（#99795）
- 连接中断（#87500）
- 这些不是孤例而是**平台级别的质量问题**，Windows 开发者体验急需系统性修复

### 🟡 安全过滤器误报（Cyber 类）
多条来自同一用户的 issue（#101410、#101409、#101406、#101405、#97541），涉及调试无人机遥测、手机 debug 构建、USB 安全密钥排障等**合理开发任务被误判为网络攻击**，且会话被直接终止。这已是影响实际工作的系统性风险。

### 🟡 计费与订阅常见问题
Max 订阅被识别为 Pro（#98134）、$600 错误收费（#96339）、$995 自动充值争议（#83062）——计费系统是用户信任的基石，此类问题持续出现值得关注。

### 🟡 插件生态成熟度不足
- 子代理 `model:` 被忽略（#89723）
- Mods 开关与文档不一致（#99130）
插件是扩展生态的关键，但当前插件开发者的可控性受限。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-12

## 今日速览

今日 Codex 无新版本发布，社区焦点集中在 Windows 平台多个严重 bug 与 TUI/CLI 体验优化上。最热 Issue 为 ChatGPT Web 端“Too many requests”限流问题（30 条评论），同时官方机器人密集合入了 10 个面向 TUI、插件系统与 app-server 的修复/增强 PR。整体来看，Windows 稳定性与终端交互体验是目前社区最关注的方向。

## 社区热点 Issues

1. **[#38503] ChatGPT Web “Too many requests” 限流阻断聊天与 Work 任务**  
   链接：https://github.com/openai/codex/issues/38503  
   开放中，30 条评论、21 👍。该问题影响 Web 端用户正常访问对话，且会波及 Work 任务执行，社区反馈强烈，是当前最热 Issue。

2. **[#50526] Desktop: Guardian 实验配置反复引入废弃的 thread_context**  
   链接：https://github.com/openai/codex/issues/50526  
   开放中，24 条评论、9 👍。即使本地 config.toml 已清除相关配置，桌面应用仍持续提示 `thread_context is deprecated and ignored`，配置清理逻辑明显存在缺陷。

3. **[#52179] Windows 下所有命令失败：“setup refresh had errors”**  
   链接：https://github.com/openai/codex/issues/52179  
   已关闭，18 条评论。Windows 用户在自定义模型供应商环境下，沙箱初始化全面失败，导致任何命令无法执行，属于阻断性故障。

4. **[#51917] Windows 更新后 workspace settings 无法加载，仍阻止新建聊天**  
   链接：https://github.com/openai/codex/issues/51917  
   开放中，17 条评论、7 👍。更新至 26.1007.21434 后问题依旧，桌面应用在 Windows 上的配置加载稳定性受到质疑。

5. **[#28316] Codex 不应在后续上下文中重发大体积 base64 图像工具输出**  
   链接：https://github.com/openai/codex/issues/28316  
   开放中，15 条评论、8 👍。用户提交图像后，完整 base64 载荷被持续保留在会话历史并重复发送，导致上下文膨胀和 token 浪费，开发者期待优化。

6. **[#49767] Windows 官方 Library 转移助手在 os.setxattr 崩溃**  
   链接：https://github.com

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-10-12** | 数据来源：`google-gemini/gemini-cli`

---

## 1. 今日速览

今日发布新夜间版 `v0.65.0-nightly.20261012`，社区焦点集中在**子代理可靠性（挂起、误报成功）** 与**安全加固（路径遍历、环境变量泄漏）** 两大方向。多项安全修复 PR 已关闭进入合入流程，同时多个 P1 级 Agent 稳定性问题仍在等待回归验证。

---

## 2. 版本发布

### v0.65.0-nightly.20261012.g9b6e0265d

- **类型**：夜间预发布版本
- **对比范围**：`v0.65.0-nightly.20261010.g9b6e0265d` → `v0.65.0-nightly.20261012.g9b6e0265d`
- **完整变更日志**：[查看详情](https://github.com/google-gemini/gemini-cli/compare/v0.65.0-nightly.20261010.g9b6e0265d...v0.65.0-nightly.20261012.g9b6e0265d)

> 说明：本版本为自动化夜间构建，具体变更内容请查阅 Changelog 链接。

---

## 3. 社区热点 Issues（Top 10）

### 3.1 子代理在 MAX_TURNS 后误报 GOAL 成功 — [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
- **优先级**：P1 | **评论**：13 | **表态**：👍 2
- **核心问题**：`codebase_investigator` 子代理在触发最大轮次限制后，仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了实际的中断。这会导致上层编排逻辑误判任务真实完成。
- **关注理由**：直接破坏子代理结果的可信度，影响依赖子代理状态做决策的自动化流程，是当前评论数最高的 Issue。

### 3.2 通用代理执行时无限挂起 — [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- **优先级**：P1 | **评论**：8 | **表态**：👍 8（本节最高）
- **核心问题**：`gemini-cli` 一旦委托给 generalist agent 就会永久挂起，简单的建文件夹操作也能卡住长达一小时。用户通过提示词禁止使用子代理可绕过问题。
- **关注理由**：社区共鸣度最高（👍 8），属于阻断性 Bug，直接影响日常使用。

### 3.3 利用模型 bash 亲和力：零依赖 OS 沙箱与执行后意图路由 — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873)
- **优先级**：P2 | **评论**：9 | **表态**：👍 1
- **核心问题**：Gemini 3 模型天然擅长以 bash 用户方式操作 POSIX 工具链，但当前安全模型限制了该能力的发挥。提案建议引入零依赖 OS 沙箱，在保障安全的前提下释放模型的 bash 原生能力，并在命令执行后做意图路由。
- **关注理由**：这是安全与能力释放之间的关键架构讨论，影响 Agent 后续的底层执行范式。

### 3.4 AST 感知的文件读取/搜索/代码库映射影响评估 — [#22745](https://github.com/google-gemini/gemini-cli/issues/22745)
- **优先级**：P2 | **评论**：7 | **表态**：👍 1
- **核心问题**：EPIC 追踪一系列调查，评估 AST 感知工具在方法边界读取、语法级搜索、代码库映射方面的价值，目标是减少 token 噪声、降低往返次数。
- **关注理由**：涉及 agent 上下文效率的根本性优化，与 token 成本、响应速度直接相关。

### 3.5 Gemini 不会主动使用 skills 和子代理 — [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
- **优先级**：P2 | **评论**：7 | **表态**：👍 0
- **核心问题**：即使用户配置了 `gradle`、`git` 等自定义 skill，Gemini 在相关场景下几乎不会主动调用，必须显式指令才执行。
- **关注理由**：skills 是扩展 Gemini CLI 能力的核心机制，“不主动用”严重削弱了该功能价值，也是社区高频吐槽点。

### 3.6 浏览器子代理在 Wayland 环境下失败 — [#21983](https://github.com/google-gemini/gemini-cli/issues/21983)
- **优先级**：P1 | **评论**：4 | **表态**：👍 1
- **核心问题**：`browser_agent` 在 Wayland 显示服务器下无法正常工作，终止原因仅显示 GOAL，实际是环境不兼容。
- **关注理由**：Linux 桌面用户占比可观，P1 级别说明影响较大且需优先修复。

### 3.7 企业用户对 Gemini-CLI 的体验反馈 — [#29232](https://github.com/google-gemini/gemini-cli/issues/29232)
- **优先级**：P3 | **评论**：3 | **表态**：👍 7（高共鸣）
- **核心问题**：付费 Code Assist Enterprise 用户表示失望，认为 Gemini-CLI 未达到企业预期，问题涉及可靠性、体验或功能完整度。
- **关注理由**：虽为 P3，但是企业级用户的真实负面反馈，值得产品团队关注。

### 3.8 get-shit-done 输出钩子在收尾阶段触发崩溃 — [#22186](https://github.com/google-gemini/gemini-cli/issues/22186)
- **优先级**：P1 | **评论**：3 | **表态**：👍 0
- **核心问题**：`get-shit-done` 输出即将打印用户摘要时，`gemini` 反复崩溃。
- **关注理由**：崩溃发生在任务完成边界，用户体验伤害巨大；且已复现多次，属稳定性关键缺陷。

### 3.9 浏览器代理忽略 settings.json 配置覆盖 — [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)
- **优先级**：P2 | **评论**：4 | **表态**：👍 0
- **核心问题**：`BrowserAgent` 完全忽略全局/项目级 `settings.json` 中的覆盖项（如 `maxTurns`）；`AgentRegistry` 虽正确合并了配置，但执行链路未贯彻。
- **关注理由**：配置文件是用户控制 Agent 行为的主要入口，被静默忽略属于“配置无效”类隐蔽问题。

### 3.10 bugreport 不包含子代理内部上下文 — [#21763](https://github.com/google-gemini/gemini-cli/issues/21763)
- **优先级**：P1 | **评论**：2 | **表态**：👍 0
- **核心问题**：`/bug` 报告只包含主会话信息，无法看到子代理内部发生了什么，导致排查 Agent 问题时关键信息缺失。
- **关注理由**：直接拉低 bug 反馈的可用性，增加维护者与用户双方的沟通成本。

---

## 4. 重要 PR 进展（Top 10）

### 4.1 支持 Gemini 3 点分模型的多模态函数响应 — [#29611](https://github.com/google-gemini/gemini-cli/pull/29611)
- **状态**：OPEN (P2, area/core+agent)
- **内容**：在 `supportsMultimodalFunctionResponse()` 中解析模型别名并支持点分版本（如 `gemini-3.8-flash`），避免多模态工具输出（如 `read_file` 读到的图片）被作为非法 sibling part 发送，从而触发 400 错误。

### 4.2 保留子代理多模态工具响应 parts — [#29621](https://github.com/google-gemini/gemini-cli/pull/29621)
- **状态**：OPEN (P2, area/core+agent)
- **内容**：当本地子代理将工具结果回传给模型时，按调用 ID 追踪并完整保留所有响应 parts，修复图片数据作为函数响应兄弟节点被意外丢弃的问题。

### 4.3 外部安全检查器环境最小化与输出限流 — [#29523](https://github.com/google-gemini/gemini-cli/pull/29523)
- **状态**：CLOSED (P2, area/security)
- **内容**：`CheckerRunner` 之前会向第三方检查器传入完整进程环境（含 `GEMINI_API_KEY` 等密钥），且对 stdout 不设上限。本次修复：① 精简环境变量；②

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-12）

## 今日速览
今日无新版本发布，但有 10 + 个新 Issue 集中出现。社区反馈重点指向 MCP 服务器兼容性问题（Atlassian Rovo、Dataverse OAuth）、ACP 非交互模式缺陷与终端渲染体验（右键复制冲突、Home/End 误滚动）。此外，Windows 平台上的 Git 二进制权限及 winget 安装路径问题仍在发酵。

---

## 版本发布
过去 24 小时内无新 Release。

---

## 社区热点 Issues（10 个精选）

### 1. 始终可见的上下文窗口状态
🔗 [Issue #1953](https://github.com/github/copilot-cli/issues/1953) | 👍 11 | 评论 2 | 状态：Open

社区渴望在 CLI 界面中看到当前上下文占用量的实时状态（类似“剩余请求数”）。作者指出，接近上下文窗口末尾会明显降低 LLM 表现，而目前 CLI 无任何提示。这是今日榜单中获赞数最高的未解决问题，反映出用户对“上下文感知”的核心诉求。

### 2. [已关闭] 推理/思考模式显示乱码：文本流被反复重叠打碎
🔗 [Issue #3755](https://github.com/github/copilot-cli/issues/3755) | 👍 2 | 评论 6 | 状态：Closed

启用 `showReasoning: true` 后，流式思考文本渲染严重重叠，例如 “from” 被显示为 “fromply from”，单词边界被重复输出。该问题已关闭，但 6 条评论表明期间曾引发较多讨论。修复方案值得关注，涉及终端渲染的流式增量算法。

### 3. ACP 模式下 `/rename` 报告成功但并未重命名会话
🔗 [Issue #5115](https://github.com/github/copilot-cli/issues/5115) | 评论 1 | 状态：Open

在 `copilot --acp --stdio` 模式下，发送 `/rename` 命令后 Copilot 立即返回“Session renamed”消息，但实际会话名未变化。问题在于该命令仅结束 `end_turn`，没有触发任何模型调用或会话状态更新。影响使用 ACP 协议构建自动化工具链的开发团队。

### 4. Atlassian Rovo MCP 服务器连接器认证失败，Jira/Confluence 工具全部 401
🔗 [Issue #5118](https://github.com/github/copilot-cli/issues/5118) | 评论 0 | 状态：Open（今日新提交）

内置 Atlassian Rovo MCP 连接器在授权探测阶段返回 HTTP 400 Bad Request，导致所有 Jira/Confluence 工具调用返回 `401 Unauthorized`。该问题正在阻塞一个需要编辑 Confluence 页面的实时代理会话，属于依赖 Atlassian 生态的用户面临的严重阻断问题。

### 5. GitHub Mobile 远程 CLI 会话无法附加文件或图片
🔗 [Issue #5117](https://github.com/github/copilot-cli/issues/5117) | 评论 0 | 状态：Open（今日新提交）

桌面/Web 端支持附件功能，但 GitHub Mobile 应用驱动的远程 Copilot CLI 会话中，消息编辑器完全没有附件入口。此问题区分于移动应用的其他独立缺陷，需要修改远程会话协议中关于 composer 能力声明的部分。

### 6. 工具输出后响应续接出现间歇性 400 内部服务器错误
🔗 [Issue #5116](https://github.com/github/copilot-cli/issues/5116) | 评论 0 | 状态：Open

在多步骤会话中，CLI 通过 Responses API 使用 `previous_response_id` 提交延续请求时，间歇性报错 `Execution failed: 400 internal server error`。最新一次发生在工具输出提交之后，导致健康的会话突然终止。开发者在等待跳转连接或临时短路响应。

### 7. 达到会话上限后等待 5 小时，“continue” 不生效
🔗 [Issue #5114](https://github.com/github/copilot-cli/issues/5114) | 评论 0 | 状态：Open

用户遇到 runtime 429 上限后，等待 5 小时再调用 continue，会话仍无法从停止处恢复。CLI 打印 “The earlier runtime 429 cap still blocks the remaining unvalidated ports…”，暗示上限状态未在等待后清除。暴露会话恢复机制的缺陷。

### 8. `ask_user` 输入框中 Home/End 同时滚动对话时间线
🔗 [Issue #5113](https://github.com/github/copilot-cli/issues/5113) | 评论 0 | 状态：Open

在代理提问（`ask_user`）时，按 Home/End 键本应只移动输入光标，却同时触发了对话时间线的滚动跳转。该滚动快捷键在 v1.0.52 引入（#3470），但未能区分输入框焦点状态。

### 9. 图片上限忽略模型能力配置并重写 prompt-cache 前缀
🔗 [Issue #5111](https://github.com/github/copilot-cli/issues/5111) | 评论 0 | 状态：Open

CLI 将图片数量硬编码为 50，忽略了 `modelCapabilities.limits.vision.max_prompt_images` 配置。且每次从缓存中逐出旧图片时，都会向提示中插入“已达到最大图片数”的通知，导致 prompt-cache 前缀被反复重写，极大降低缓存命中率。

### 10. 企业环境 Copilot CLI 完全不可用
🔗 [Issue #5109](https://github.com/github/copilot-cli/issues/5109) | 评论 0 | 状态：Open

用户报告企业托管

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报

**日期：2026-10-12**

---

## 今日速览

今日 OpenCode 仓库无新版本发布，社区讨论主要集中于 Windows/SSH 环境下的剪贴板失效、订阅计费与 API Key 困惑、以及 GPT-5.x / GPT-6.1 等新模型兼容性问题。PR 侧亮点包括 GPT-6.1 Sol 上下文窗口提升至 500k、zstd 压缩请求体修复 503 错误，以及多项桌面端与 CLI 体验修复。

---

## 社区热点 Issues

### 1. Windows 下通过 SSH 使用时剪贴板复制失效
[#6111](https://github.com/anomalyco/opencode/issues/6111) | 评论 10 | 👍 4 | 已关闭

> 在 Windows 上通过 SSH（MobaXterm / Windows Terminal）运行 OpenCode 时，"Copy Message"（ctrl+x 后按 y）提示"已复制到剪贴板"，但粘贴时内容仍是旧数据。该问题直接影响 Windows 用户通过 SSH 使用 OpenCode 的核心工作流。

**社区反应**：评论数最高，多位 Windows 用户确认复现，是当前跨平台使用体验的主要阻塞项。

---

### 2. Go 订阅显示有效但 API 始终报 invalid
[#54657](https://github.com/anomalyco/opencode/issues/54657) | 评论 7 | 新开启

> 用户购买 Go 订阅并连接 API 后，即使使用免费模型也一直提示 "api invalide"（法语），无法正常使用订阅额度。

**社区反应**：新提交的计费/订阅问题，涉及 Go 订阅方案的身份验证链路，评论中已有多个类似情况反馈。

---

### 3. 多仓库会话中 `/undo` 静默失败
[#34398](https://github.com/anomalyco/opencode/issues/34398) | 评论 7 | 👍 2 | 已关闭

> 在包含多个独立 Git 仓库的 workspace 中，`/undo` 操作会静默失败，没有任何报错提示。Issue 提议引入"workspace 文件夹 + 各仓库独立快照追踪"机制。

**社区反应**：与 #30065 互相印证，多仓库工作流用户对该问题的复现和严重性表示认可。

---

### 4. 插件配置 npm 包时启动挂起（冷缓存）
[#31463](https://github.com/anomalyco/opencode/issues/31463) | 评论 6 | 已关闭

> 当插件配置中包含 `oh-my-openagent@latest` 且 npm 缓存为空时，OpenCode 启动会一直挂起。`--pure` 模式和 `file://` 绝对路径可绕过。根本原因已定位到 `Npm.add()` 调用 Arborist 的行为。

**社区反应**：root cause 已确认，属于 npm 依赖解析环节的阻塞问题，影响插件使用体验。

---

### 5. 希望支持保存 prompt 与线程并按主题/书签管理
[#24017](https://github.com/anomalyco/opencode/issues/24017) | 评论 6 | 👍 1 | 已关闭

> 用户提出在当前登录会话内无法保存 prompt 和对话线程，也无法按主题分类或添加书签，导致历史内容难以回溯。

**社区反应**：属于高频生产力需求，评论中多位用户补充了类似场景，期待官方实现会话管理增强。

---

### 6. Windows 离线环境要求内置 ripgrep
[#31734](https://github.com/anomalyco/opencode/issues/31734) | 评论 5 | 👍 5 | 已关闭

> Windows Desktop/EXE 在离线环境下运行时，因缺少 ripgrep 而报 `Transport error get (GE...)` 错误。请求在二进制构建中内置 ripgrep，以支持无网络的内网环境。

**社区反应**：👍 数最高（5），企业内网和离线环境用户需求强烈。

---

### 7. ACP 服务启动报错：no such column: project_id
[#54665](https://github.com/anomalyco/opencode/issues/54665) | 评论 4 | 新开启

> ACP（Agent Client Protocol）服务启动时直接退出，错误为 `Unexpected error no such column: project_id`。疑似数据库 schema 与代码版本不匹配。

**社区反应**：新提交的 bug，影响 ACP 协议使用，官方正在 triage 中。

---

### 8. OpenAI 兼容 GPT-5.x 在 AI SDK 回退路径仍发送 max_tokens
[#40885](https://github.com/anomalyco/opencode/issues/40885) | 评论 4 | 已关闭

> 通过 OpenAI-compatible 网关调用 GPT-5 系列模型时，默认 AI SDK 路径仍会发送 `max_tokens` 参数，而 OpenAI 官方要求使用 `max_completion_tokens`，导致请求被拒绝。

**社区反应**：涉及新一代模型兼容性，使用代理网关接入 GPT-5.x 的用户会受到直接影响。

---

### 9. 读取二进制文件导致终端乱码与上下文污染
[#48310](https://github.com/anomalyco/opencode/issues/48310) | 评论 4 | 已关闭

> 当 instruct agent 读取二进制文件时，无法识别文件类型，直接输出原始二进制数据，导致终端被破坏、上下文窗口被垃圾数据填满。

**社区反应**：属于工具健壮性问题，用户希望增加二进制文件识别与防护机制。

---

### 10. OpenCode 2.x 被 1.x 旧数据类型阻塞初始化
[#51441](https://github.com/anomalyco/opencode/issues/51441) | 评论 3 | 已关闭

> 从 OpenCode 1.x 升级到 2.x 后，在旧项目目录中启动并输入任何提示，都会收到 `Instruction initialization blocked by unavailable sources: core/instructions`，导致 2.x 无法使用。

**社区反应**：1.x→2.x 迁移过程中的阻塞问题，影响升级用户，关注度较高。

---

## 重要 PR 进展

### 1. CLI：安装方式未知时 updater 不再报错
[#54672](https://github.com/anomalyco/opencode/pull/54672) | 新增

> `Updater.check` 在无法检测安装方式（如独立二进制、发行版包）时返回 `unavailable`，而不是弹出 TUI 更新提示并在后续失败。

---

### 2. 桌面端帮助按钮改为帮助菜单
[#54637](https://github.com/anomalyco/opencode/pull/54637) | 新增

> 关闭 #54264。将首页侧边栏底部的帮助入口从单一的 external link 改为完整帮助菜单，方便用户访问文档和反馈渠道。

---

### 3. 修复嵌套 Markdown 块方向显示错误
[#54636](https://github.com/anomalyco/opencode/pull/54636) | 新增

> 关闭 #54471。修复列表项、表格单元格、引用段落中的 RTL 文本（波斯语、阿拉伯语）渲染方向错误的问题。

---

### 4. 发布脚本排除 V1 历史提交
[#54674](https://github.com/anomalyco/opencode/pull/54674) | 新增

> `v2.0.26` 标签基于旧 `v2` 分支，导致 `v2.0.26..HEAD` 范围包含了约 1380 个 V1 提交。此 PR 调整发布脚本，使审查范围仅保留真实的 V2 变更。

---

### 5. 兼容 agent 配置中的 V1 主题色名称
[#54257](https://github.com/anomalyco/opencode/pull/54257) | 更新

> 修复 #54057。V1 支持 `primary`、`secondary`、`accent` 等主题色名称，V2 只接受六位十六进制。此 PR 让 V1 风格颜色配置在 V2 中继续生效，避免功能失效。

---

### 6. GPT-6.1 Sol 的 ChatGPT OAuth 上下文窗口提升至 500k
[#54668](https://github.com/anomalyco/opencode/pull/54668) | 已关闭

> OpenAI 已将 GPT-6.1 Sol 的 Codex 上下文从 272k 提升至 500k，并免除了订阅用户的长上下文费用。此 PR 更新 ChatGPT OAuth 转换逻辑，使订阅用户可以使用完整 500k 上下文。

---

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-12

## 1. 今日速览

今日发布了 **v0.25.1**（CLI/Desktop）及配套 **sdk-typescript-v0.1.19**，主要修复 Android 端会话恢复与 managed-agent 连接器健壮性问题。社区讨论最热的是 **Managed Agent 双路径架构提案（#12380，53 条评论）**，同时 Web Shell 功能增强（工作区固定、快捷键、文件浏览器）与平台分发（Flathub、下载页）成为新的需求焦点。

## 2. 版本发布

**v0.25.1（CLI）**
- 修复 Android Activity 重建后无法恢复「纯文本连接」及已验证会话/工作区路由的问题。
- [查看 Release](https://github.com/QwenLM/qwen-code/releases)

**v0.25.1-nightly.20261011.01d3e6d81a**
- 修复 managed-agent 连接器与 broker 健壮性问题（源自 #12692 R2 审查，PR [#13330](https://github.com/QwenLM/qwen-code/pull/13330)）。

**desktop-v0.25.1（Desktop 应用）**
- 修复 serve 模式下会话创建失败诊断丢失的问题（PR [#12331](https://github.com/QwenLM/qwen-code/pull/12331)）。
- SDK Java 新增托管运行时支持。

**sdk-typescript-v0.1.19**
- 捆绑 CLI 0.25.1，与 CLI 同源构建。

## 3. 社区热点 Issues（10 个）

| # | Issue | 热度 | 重要性 |
|---|-------|------|--------|
| 1 | [proposal(serve): 定义 Managed Agent 双路径架构与分阶段交付](https://github.com/QwenLM/qwen-code/issues/12380) | 53 评论 | 核心架构设计：保持现有 TypeScript agent 循环，模型推理与工具环境隔离，Sessions 持久化归属。影响后续所有 managed-agent 功能演进 |
| 2 | [XML 工具调用恢复丢失包含引用工具标记的外部调用](https://github.com/QwenLM/qwen-code/issues/13492) | 10 评论 | 核心 bug，部分修复已合并（PR #13515），外部调用恢复仍待 PR #13579。影响模型可靠性 |
| 3 | [内存提取：无操作后添加有界冷却](https://github.com/QwenLM/qwen-code/issues/13004) | 10 评论 | 避免每次用户轮次后都触发无意义的 auto-memory 提取，提升性能 |
| 4 | [Web Shell：支持将工作区固定到侧边栏顶部](https://github.com/QwenLM/qwen-code/issues/12444) | 7 评论 | 高频 UI 需求。今日有重复 issue #13888 被关闭，说明社区呼声高 |
| 5 | [macOS Foundation Models 作为 Fast Model 报错 500](https://github.com/QwenLM/qwen-code/issues/13807) | 6 评论 | 集成问题：`fm serve` 在 tool summaries 下正常，但生成时报 unsupported generation guide |
| 6 | [Web Shell：为 Session Overview 和 Split View 添加快捷键](https://github.com/QwenLM/qwen-code/issues/13175) | 5 评论 | 影响 Desktop 与 `qwen serve` web 模式，提升双视图切换效率 |
| 7 | [在 qwen.ai 展示 Desktop 下载入口并自动更新 README 链接](https://github.com/QwenLM/qwen-code/issues/13656) | 5 评论 | 分发体验问题：官网缺少明确的 Desktop 安装入口 |
| 8 | [Linux vendored ripgrep 被改写后每次启动 SIGSEGV](https://github.com/QwenLM/qwen-code/issues/13680) | 4 评论 | 严重平台 bug：静态 PIE 被添加 RUNPATH 并移动 phdrs，导致 Desktop Linux 版启动崩溃 |
| 9 | [建议通过 Flathub 发布 Qwen Code Desktop](https://github.com/QwenLM/qwen-code/issues/13924) | 4 评论 | Linux 分发诉求：进入 Mint 等软件商店，且需可用的更新通道 |
| 10 | [CJK 队友名称在 sanitizeName 中被折叠为空](https://github.com/QwenLM/qwen-code/issues/13920) | 3 评论 | 国际化 bug：Agent Teams 中中文名称（如「研究员」）被清空，回退到模型发明的拼音名 |

## 4. 重要 PR 进展（10 个）

| # | PR | 内容 |
|---|-----|------|
| 1 | [feat: 将 agent 身份与 Agent Team 传递到 ACP/daemon 线路（#13902）](https://github.com/QwenLM/qwen-code/pull/13902) | 子代理帧新增 `_meta.agent` 字段，Agent Team 协作与父→子委派可在 ACP/daemon 线路完整表达 |
| 2 | [feat(managed-agent): 启用 H3 Monitor 与后台 Shell 门（#13889）](https://github.com/QwenLM/qwen-code/pull/13889) | 正式启用 `monitor_run` 与后台 `shell` child_run 能力，生产配置即可提交，附带 Runtime 持有机制 |
| 3 | [feat(web-shell): 工作区文件浏览器与预览（#13878）](https://github.com/QwenLM/qwen-code/pull/13878) | Web Shell 右侧新增 Files 面板：支持 Markdown/HTML/图片渲染、只读源码查看、树形目录 |
| 4 | [fix(managed-agent): 会话打开时处理从未开始的派发（#13917）](https://github.com/QwenLM/qwen-code/pull/13917) | 修复 #13801：重新打开托管会话时，扫描停留在 `dispatch_started` 的 run 记录并重建执行上下文 |
| 5 | [fix(managed-agent): 工具轮次 recovery 阻塞时归还 Workspace 挂载（#13816）](https://github.com/QwenLM/qwen-code/pull/13816) | 新增 broker 内部 `release-mount` 接口，只释放 Workspace 执行

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*