# AI CLI 工具社区动态日报 2026-08-16

> 生成时间: 2026-08-16 00:38 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告（2026-08-16）


## 一、生态全景

当前 AI CLI 工具生态呈现“平台级竞争 + 专业化纵深”的双轨格局：头部厂商（Anthropic、OpenAI、Google）围绕模型能力构建全链路开发工具，通过子代理、MCP 集成和桌面端体验争夺核心开发者；垂直玩家（Kimi、OpenCode、Qwen）则通过差异化场景（记忆系统、TUI 交互、review 可靠性）切入细分需求。整体生态正从"单次对话工具"向"长时运行、多代理协作、跨环境同步"的操作系统层演进，但平台化同时，`Windows` 桌面端稳定性、`会话状态管理`、`多账户治理`仍是普遍性痛点。

> 今日共收集 **7 个核心工具** 的社区动态数据，累计捕获高热度 Issue **70+** 条、PR **41** 条，数据覆盖率盘面充足。


## 二、各工具活跃度对比

> 数据说明：Release 计数基于过去 24h 版本发布记录；Issues 取社区热度较高、具代表性条目数；PR 为仓库内已更新/提出的实质条目数，已剔除纯自动化 bot 条目。

| 工具 | Issues 数（代表性） | PR 数 | Release | 社区热度信号 | 成熟度判断 |
|---|---|---|---|---|---|
| **Claude Code** | 10 | 1 | 0 | 高 | 成熟期 · 稳定迭代 |
| **OpenAI Codex** | 10 | 10 | 2（rust-v0.148.0-alpha.19/20） | 高（Windows 性能主导） | 快速迭代期 |
| **Gemini CLI** | 10 | 8 | 1（v0.56.0-nightly） | 中高 | 功能扩张期 |
| **GitHub Copilot CLI** | 10 | 2 | 0 | 中 | 稳态维护期 |
| **Kimi Code CLI** | 4 | 2 | 0 | 中低（强需求核心白板） | 功能稳步积累 · 记忆系统成焦点 |
| **OpenCode** | 10 | 10 | 0 | 中高（V2 框架演进 / 付费体验问题） | 高速生态建设期 |
| **Qwen Code** | 10 | 10 | 1（nightly） | 中 | 修复密集期 |

> 说明：Claude Code / Copilot CLI 过去 24h PR 数量有限，多数工作基于仓库审计 / 自动化流程，而非面向用户的新特性；Kimi Code 输出条目数较小，但 **#1283 Memory System** 单一议题活跃度异常集中，是现阶段最具爆发力的议题之一。


## 三、共同关注的功能方向

### 1. 跨会话 / 跨设备上下文同步（热度：★★★★★）
- **Claude Code**：`#27302` Connector 多账户支持（346 👍 居榜首）、`#87028` claude.ai 与 CLI 上下文孤岛。
- **Kimi Code**：`#1283 Memory System`（40 评论，沉淀半年仍无排期）、`#1478` 借鉴 `.claw` 结构的记忆层优化。
- **OpenCode**：`#42811` 已读状态跨客户端同步的 PR 实现。
- **核心诉求**：账户级配置/记忆跟随，多设备工作流无缝切换。

### 2. Windows 桌面端稳定性白刃战（热度：★★★★★）
- **Claude Code**：`#80444` GPU 崩溃致 MSIX 不可用、`#85199` 需手动 Repair 的自愈缺失。
- **Codex**：#20214（104 评论）、#38546、#38750、#38819 系统级鼠标滞后与整机冻结。
- **Copilot CLI**：`#4499` V8 堆外 OOM 崩溃。
- **核心痛点**：进程级高性能（GPU/CPU 占用）与系统资源冲突、崩溃后安装环境损坏，平台垄断工件频发。

### 3. 长时任务的中断恢复 / 排队继续（热度：★★★★☆）
- **Claude Code**：`#13354` 会话上限续跑、`#50246` 消息队列模式、`#87009` 子代理完成通知延迟。
- **Gemini CLI**：`#21409` 代理永久挂起、`#25166` 待输入永久悬挂、`#22323` MAX_TURNS 后误报成功。
- **Qwen Code**：`#9092` `/review --resume` 中断恢复 PR。
- **社区期待**：非阻塞操作自然的“不打断、不终止”交互范式。

### 4. 权限模型透明化 / 安全加固（热度：★★★★☆）
- **Claude Code**：`#74567` `dontAsk` 模式无视 allowedTools、`#75081` hook 静默吞避、`#76152` skill overrides 被忽略。
- **Gemini CLI**：`#28725` 阻止 SSRF、`#28726` Docker 沙箱 Node 20 EOL 升级（CVSS 8.6）。
- **Codex**：`#38800` 权限审计转日志降低污染、`#38701` Guardian 共享审批流。
- **耦合治理趋势**：从静态检查转向运行时动态授权 + 全流程透明审计。

### 5. 会话存储膨胀 / 磁盘空间可观测性（热度：★★★☆☆）
- **Codex**：#25921 Crashpad dumps 无限增长、#30779 JSONL 膨胀、#38518 IO 风暴。
- **OpenCode**：#37671 headless 泄漏临时文件。
- **反应方向**：补充 `doctor` 命令的存储诊断，治理默认配置下的逻辑退化。


## 四、差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业级 agent 编排枢纽 | 深度授权、治理管控团队 | Connector多账号、子代理编排、TUI 长驻会话（消息队列）；依赖 Anthropic 生态 |
| **OpenAI Codex** | 桌面优先的全能开发助手 | 端侧活跃的跨平台开发者 | Codex App + Rust CLI、Guardian 权限管控，细分重点在桌面端性能与跨进程集成 |
| **Gemini CLI** | 安全敏感的原生 agent 框架 | GCP/Vertex 用户 | 强沙箱隔离、Google 模型服务、Chromium 级审计；重视子代理 task state 一致性（#Ready 系列卡实变动方案） |
| **Copilot CLI** | GitHub Copilot 语义无缝集成 | 重度 GitHub 用户 / 开源团队 | **MCP / ACP 插件网络**、多模型 BYOK，更深权限适配，但差异化路径偏单节点 “编排协议”
| **Qwen Code** | 多语言/开源全栈机器人 | 开源社区 / 中文用户 | `/review` 逆向审计、独立则子代理 league、benchmark 驱动软通道, CI/CD 鲁棒性强 |
| **OpenCode** | 订阅式云端 CLI | 中间态实验者 → 生产环境 | V2 event 系统 + **容器化 workspace**（Docker/Incus），聚焦服务器级逻辑 + 会话级预算控制 |
| **Kimi Code** | 轻量化记忆优先 | 国产大模型 / 大上下文窗口调用方 | 开放生态兼容（OpenAI-compatible），使用 1M 上下文模型，但记忆/持久层缺失、计费透明管控 |
覆盖面看，**Claude 仍在组织级统筹，OpenAI 根植原生平台适配，Gemini 聚焦安全 + Google 体系，Others 避开平台挤压、极端场景（记忆 / 审查 / 海外 IP 连通）** ——是当前差异化的核心脉络。


## 五、社区热度与成熟度

### 成熟稳定期（沉淀深厚 / 迭代慢）
- **Claude Code**：issues 评论量大但闭环数低，社区已进入“核心功能确洞但优化优先”的成熟期；跨会话、账号体系是主要老问题且能激发极高共振。
- **Copilot CLI**：社区活动主要围绕 MCP 回归，持续围绕 GitHub 生态做阵地防守。

### 快速迭代期（增长快 / 反馈响应密集）
- **OpenAI Codex**：Release 前沿（2 个预发布/每日滚动）、Windows
  桌面对照修复积压、涉新 regress。
- **Gemini CLI**：Safety / burst burst PR 密集，三链路协议与 BIX 基线评估加持。
- **Qwen Code**：日更级 nightly + autfix chain，三级 review 流程重构频率高（约 9 个PR/#issue联动）。
- **OpenCode**：V2 全新事件 + Docker 工作区 + 服务端组队，parallel refactor + 商务必现。

### 关键数据点：**Kimi Code 是最薄弱的持久化环节**——唯一有 #1283"半年无排期"，证明去投入仍保守（或需求延迟），虽吸引新用户成本高。


## 六、值得关注的趋势信号

**1. "从写代码到管理异步协同" 的思维转变**
- 上下文持久化 → 消息队列 + 收费续跑 + 子代理延迟通知，暗示未来 AI CLI 正在从"一次对话模型"转为"活跃的异步工作区"。用户的环境感知能力直接决定了设计的复杂度上限，经验池趋向于"**基于服务的开发自治**"。

**2. 桌面端体验成为基本盘守卫**
- Codex/ClaudeCode 桌面版近乎全线摇摇欲坠，用户直观系统冻结比模型幻觉更易催生离场。GPU 崩溃 → 输入滞后 → 大量 dump → OOM，一道全链路的保证架构将在半年内拉开前端 API  + API 验证优化的竞争口径。

**3. 长时任务失败需"失败大声" - 透明性成为King**
- 静默失败（hook 无感吞掉、`MAX_TURNS` 误报成功、review 不发送清理）占据无数头条。社区对**“过程白盒化 + 可审计失败”**的刚性需求，催生 printer-per-message 类功能（TUI 状态、`doctor` 存储、日志）——工具的可预测性直接护航工作者的信任边界。

**4. 订阅制配额自助一体化（现实中高敏感）**
- OpenCode + Qwen Code 同接入（“免费 / 付费”边界模糊、计数管控缺失）——**自主配额（Single-budget,session-level）** 成为合法商业化的必须举措。**计费透明 + 会话粒度限额**将沉淀为一等公民 features。

**5. 安全风险向 Agent 自身靠拢（SSRF / hook 全赦 / skill 泄漏）**
- 引擎安全回到 Agent 工具链路内部（web-fetch SSRF、MCP osam、shell 沙箱 node）——“`AI 安全` 定义正在从“防用户误操作”下落到“防 AI误感知后外溢”的边界，实实在在的 **ZTA（零信任）向 agent 引擎迁移**。

**6. Windows 与 Linux 桌面国企体验**
- TUI 之外 MS-图标 UX 的优先度史无前例提高："我们把功能做完，但在系统关键交互下动不了"。桌面端质量是过度改进后的（终端在）主次——只有它在待办优化列的开头，不会在那里滑向长尾。


## 综上供给技术团队的参考价值

| 角色 | 判断参考 |
|---|---|
| **CISO / 安全决策者** | 先求 Gemini CLI/Qwen Code 的沙箱与审计项，观察 MCP 权限面网关的落地数据 |
| **开发者体验（DevXP）经理** | Windows 阵痛的集中管道期可提前修复，保障 CPU spike 零容忍；推动会话已读、防崩溃策略 |
| **个人开发者多工具同用** | 当前同步身份，先从 Codex（Windows）+ Gemini（Agent）做预，数据后续同步馆任务；Kimi/OpenCode 等在对应记忆层发展后才适合家大庭广泛键入口 |
| **开源项目（非创收）** | Bedrock（Review 理论）+ OpenCode 容器化理念，针对细节的流程稳健性，模式是主流未来可借鉴 |

> 报告基于 2026-08-16 全量动态，均由客观 Issue/PR 展开推定，所有趋势皆有真实诉求点相佐。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-16）

## 1. 热门 Skills 排行

| 排名 | Skill (PR) | 功能 | 社区关注点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 工具链修复**（#1298 / #1050 / #1099） | 修复 `run_eval.py` 在 Windows 下 0% recall 及子进程崩溃问题 | 官方提供的 skill 评估/优化循环在 Windows 上完全不可用，导致所有描述优化基于噪声运行；已由 10+ 用户独立复现 | open |
| 2 | **document-typography 排版质检**（#514）、 | 自动修复 AI 生成文档中孤立词块、孤行标题（widow/orphan）等排版问题 | 生成文档无需人工打磨——所有 Claude 生成的文档都受影响，之前无对应工具 | open |
| 3 | **self-audit 自审计**（#1367） | mechanical 文件校验 + 四维推理质量门（按损坏严重度排序） | 与 #1385 提出的三阶段质量门管线一脉相承，针对交付前质量保障 | open |
| 4 | **testing-patterns 测试模式库**（#723） | 涵盖 Testing Trophy 模型、单元/React 组件测试、设计模式 | 社区对工程化测试的知识库需求亟待满足；覆盖 stacktest 全栈 | open |
| 5 | **ServiceNow 平台 skill**（#568） | 覆盖 ITSM、ITOM、SecOps、ITAM/SAM、HRSD/CSM 等全景 | 企业级平台支持缺口大，评论持续至 2026-08 仍在活跃 | open |
| 6 | **skill-quality-analyzer / skill-security-analyzer**（#83） | 为 skill 本身做质量审查（五维评分）与安全分析 | 与安全议题 #492 直接相关 | open |

> 以上排序综合了 PR 评论数、涉及 issue 讨论量及社区情绪的强烈程度——前三项均与官方核心工具链的可靠性直接相关。

## 2. 社区需求趋势

| 热点方向 | 代表性 Issues | 状态说明 |
|---|---|---|
| **Skill 发行安全与信任边界** | #492（43 评论） | 社区普遍担心非官方 skill 滥用 `anthropic/` 命名空间带来的权限绕过风险 |
| **组织级 Skill 共享与管理** | #206（16 评论，8 👎） | 期望原生的组织共享/分发机制，当前手动流程无法满足 |
| **skill-creator 工具链可靠性** | #556（12 评论，7 👍）、#1169 | 官方优化循环（run_eval/improve_description）的 0% recall 是社区最高票 bug |
| **记忆、状态与治理的底层能力** | #1329 compact-memory、#412 agent-governance | 从"生产文档"走向基本能力：任务状态持久化、Agent 行为治理 |
| **上下文窗口优化** | #1487（claude-api 单次注入 156k tokens） | 大型内置 skill 在一次性调用中耗尽上下文，直接影响使用体验 |
| **企业集成与合规** | #29（Bedrock）、#1175（SharePoint Online） | 跨平台（Bedrock）与治理场景（SPO 权限）仍缺少官方支持 |

---

## 3. 高潜力待合并的 Skills

以下为评论活跃、讨论充分、但尚未合并（open）的 Skill PR，极可能于近期合入：

1. **run_eval.py 的 0% recall 修复**（#1298）— 直接 root cause 问题，包含 Windows 流读取、触发检测、并行 worker 三重修复；已获 10+ 独立复现，优先级最高。
2. **skill-creator 的 YAML 未加引号描述校验**（#539）— 预解析 frontmatter 的 `:` 错误会导致 description 静默截断；修复面仅 purity `quick_validate.py`，风险低。
3. **docx 修订 w:id 碰撞修复**（#541）— 避免已有书签文本 + 跟踪修订时文档腐蚀（OOXML 内部 id 冲突），细化到 OOXML 规范层面。
4. **两个中文还是发布回归**（#1538）— 特地将多个技能拉回到 Agent Skills 规范（name 字段与目录名不一致），为未来硬校验铺路。
5. **plan-file-hygiene**（#1479）— 覆盖 Agent 工作流中 planning 产物无生命周期的痛点，虽已定义与 #1417 联动，讨论正在收敛。

---

## 4. 生态洞察

> **“验证严格化、底层可靠化”**：社区当前最集中的诉求在于 **skill 的自动化验证工具链（eval/audit/validate）必须具备跨平台可靠性且对安全与上下文敏感**，其次是——围绕 Agent 状态、治理、安全边界等系统级能力的缺位，现有“单点技能”远不够用。

---

*数据来源：github.com/anthropics/skills（截止 2026-08-16）*

---

# Claude Code 社区动态日报（2026-08-16）

> 数据来源：GitHub anthropics/claude-code

---

## 今日速览

过去24小时内，Claude Code 仓库无新版本发布；社区集中在三条主线的讨论上：**跨会话上下文与账户同步**（多个新 Issue，均获得关注）、**Windows 桌面端稳定性**（GPU 崩溃仍有报告）以及**长时任务中断与消息队列**（热门需求持续发酵）。此外，多条早期被标记为 bug 的 Issue 于今日关闭，但整体看社区对于跨设备同步、配置漂移和会话控制的呼声明显在上升。

---

## 社区热点 Issues（Top 10）

**1. 支持多个 Connector 账户（同类型连接器多账户并存）**  
`#27302` | 228 评论 / 346 👍 | 更新于 2026-08-16
- **为何重要**：连续多月占据热评榜首。核心诉求是单个 Connector 同一账号/不同账号并存，对组织化使用（多用户隔离）影响很大，已进展为 link“claude.ai/code”在 Web 端的需求。
- 展示了对治理和账户隔离的强烈需求。
🔗 https://github.com/anthropics/claude-code/issues/27302

>2. 达到会话上限后允许继续会话**（Session limit reached 续跑）**  
`#13354` | 78 评论 / 197 👍 | 更新于 2026-08-15
- 原生长期运行工作流的痛点：到上限即断，无法自动续写。用户明确期待类似 `--continue` 顺滑的体验。
🔗 https://github.com/anthropics/claude-code/issues/13354

>3. **[feature] 消息队列模式——不打断当前任务，排队等待指令**  
`#50246` | 56 评论 / 197 👍 | 更新于 2026-08-16
- 设计亮点：在任务执行中想追加指令，但不愿打断当前步骤。社区高度支持，可能是未来 TUI 重大交互变化。
🔗 https://github.com/anthropics/claude-code/issues/50246

>4. **Windows 桌面端 GPU 崩溃导致 MSIX 无法启动（1.24012.1）**  
`#80444` | 34 评论 | 更新于 2026-08-15
- 严重程度高：崩溃常见于 Browser tab 预览，残留损坏的安装，让整个 app 不可用，只能 Repair。
- 桌面版在 Windows 上的可靠性再度引发质疑。
🔗 https://github.com/anthropics/claude-code/issues/80444

>5. **Claude Desktop Windows 反复崩溃，需 “Advanced Options → Repair”**  
`#85199` | 23 评论 | 更新于 2026-08-15
- 与 #80444 并列。修复不可自愈，对开发者高频使用是阻断级体验。
🔗 https://github.com/anthropics/claude-code/issues/85199

>6. **macOS: filesystem MCP server 在两种包下都不可用**  
`#80094` | 6 评论 | 更新于 2026-08-15
- 新 schema 未派发、旧 schema 又丢弃。影响本地 MCP 工具链联动。
🔗 https://github.com/anthropics/claude-code/issues/80094

>7. **Browser 面板拦截 127.0.0.1 回源子资源（ERR_BLOCKED_BY_CLIENT）**  
`#86362` | 5 评论 | 更新于 2026-08-15
- 使用 `/etc/hosts` 映射本地域名时页面空白，对 Web 开发场景是常见路障。
🔗 https://github.com/anthropics/claude-code/issues/86362

>8. **TUI 需要可见滚动条**  
`#62929` | 4 评论 / 7 👍 | 更新于 2026-08-15
- 增强型 TUI 交互细节。用户要求能精细定位与滚动位置感。
🔗 https://github.com/anthropics/claude-code/issues/62929

>9. **在-process teammate / 子代理完成通知被延迟数十分钟**  
`#87009` | 1 评论 | 创建 2026-08-15
- 影响 Agent 编排效率：需要手动提醒才能拿到结果，对自动化、批量任务影响明显。
🔗 https://github.com/anthropics/claude-code/issues/87009

>10. **`--permission-mode dontAsk` 无条件拒绝 Write/Edit，无视 allowedTools**  
`#74567` | 3 评论 | 更新于 2026-08-15
- 无头代理场景的严重缺陷，与文档话术不符，破坏权限体系。
🔗 https://github.com/anthropics/claude-code/issues/74567

---

## 重要 PR 进展（过去24小时）

> 数据源中仅 3 条 PR，数量有限。按实质内容挑选主要关注：

> 1. **修正安全研究期间的 CVP 状态误报**  
> `#86870` | OPEN | 作者 @JoTalbot | 更新 2026-08-15  
> - 增强 `security-guidance/hooks/review_api.py` 的依据，避免在授权安全扫描/课堂环境误触发 CVP 状态改动。  
> - 值得重点关注的方向：减少安全策略对合法教学或研究环境的冲突。
🔗 https://github.com/anthropics/claude-code/pull/86870

---

## 功能需求趋势

综合近 24 小时内活跃和新建 Issue，社区关注意向集中在以下五个方向：

1. **多账号 / 多账户支持**：除了 #27302（大量 👍），还出现 #86986（新版 token 被 400 拒绝）与 #87027（多机器配置同步），都指向账号生命周期管理不足。
2. **跨设备、跨 UI 状态同步与记忆长度打通**：如 #87028（claude.ai 与 Claude Code 的 context 孤岛）、#87027（本地配置/auto memory 不跟随账号）——说明多段工作流下同步是痛点。
3. **TUI 交互理念升级**：#50246（消息队列）、#62929（可见滚动条）加 #13354（会话续跑），共同点是「不打断、不终止」的长任务友好设计。
4. **Windows 生态稳定性优先**：#80444、#85199、#86999（PATH 和 doctor 逻辑）、#87013 等叠加在一起，Windows 桌面端问题数量领先，且多为阻断级。
5. **权限与策略透明化**：#74567、#75081（一个非法 hook matcher 静默禁用全部 hook）、#76152（skill overrides 被忽略）均指向静默失败和权限规则不透明。

---

## 开发者关注点与高频反馈

- **Windows 体验成为最大短板**  
  桌面应用 GPU 崩溃路径、MSIX 环境无法 bell 编译（影响因素）使 Windows 用户在拉取最新体验时反复碰到墙，部分用户甚至降低了桌面版频率，追溯 CLI 版本。

- **“静默失败”和“无声驱动”的系统性存在**  
  不止于 #75081（hook 全被误吞）、#76152（skill overrides 忽略）等，反射到对终端输出的依赖：异常信息总是关键。开发者要求「失败应该大声」。

- **权限模型与文档表述不一致**  
  `dontAsk` 模式下仍存在 Write/Edit 截断 `allowedTools` 行为，加上无 scoped-write 的可靠方案，使无人值守场景不敢放开自动化。

- **上下文点位标签：子代理完成时间过长**  
  #87009 等子代理通知延迟达到几十秒，同类问题在 long-running session 中非常影响异步流程，表明 agent 运行机制仍不具备稳定回调。

- **对“配置与环境同步”的期待增强**  
  从 Account 到安装过程的环境问题（PATH、memory 驻地都在）是升级后最常见摩擦。

---

> 日报仅摘录代表性内容，完整列表可见 [an issue 跟踪页](https://github.com/anthropics/anthropics/issues) （按评论/活跃排序列）。  
> *数据采集时间：2026-08-16 23:50 UTC*

---
**编写：Claude Code 社区技术观察组**  
**下一篇发布：2026-08-17**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-16

## 今日速览

Windows 桌面端性能问题成为社区焦点，多项新的系统级鼠标滞后和空闲 CPU 占用报告在短期内涌获大量关注，几乎主导了热门议题。与此同时，发布节奏保持稳健，在大规模修复会话存储膨胀、TUI 用户体验及基于 Guardian 的权限安保结构方面，推出了包括存储诊断与多项基础设施改进在内的新 PR。

## 二、版本发布

过去 24 小时内共发布两个 Rust 版本，均为常规迭代，暂未发现重大功能说明：

| 版本 | 说明 |
|------|------|
| rust-v0.148.0-alpha.20 | 常规发布 |
| rust-v0.148.0-alpha.19 | 常规发布 |

链接地址： [Releases](https://github.com/openai/codex/releases)

## 三、社区热点 Issues（上期挑选 10 条）

1. **Codex App 在 Windows 11 Pro 上频繁卡顿，尽管系统资源充足**（#20214）
   这是目前社区最关注的议题，共吸引了 104 条评论和 85 个 👍。用户反馈在运行 Codex App 时遭遇系统级冻结及卡顿，要求提高 Windows 桌面端的性能表现。
   链接：https://github.com/openai/codex/issues/20214

2. **Windows 桌面应用在非管理员权限运行时，引发系统级鼠标滞后**（#38546）
   刚出现的新议题，因问题影响严重而迅速获得 25 条评论，焦点指向 Codex / ChatGPT 桌面端在 Windows 上对系统输入设备的异常影响。
   链接：https://github.com/openai/codex/issues/38546

3. **Windows 系统范围内鼠标卡顿，仅退出应用即刻恢复**（#38750）
   这一议题出自 2026-08-15，9 条评论集中强调同样是出现于空闲状态的“无任务执行过程”中的全系统鼠标卡顿，直接干扰正常桌面操作。
   链接：https://github.com/openai/codex/issues/38750

4. **Windows 特定版本（26.810.6296.0）空闲时出现任意循环导致鼠标滞后**（#38819）
   出现于今日且迅速获 7 次你好，突出了在近两版更新中新增的闲置时系统卡顿升级现象，期待尽快提供热修复。
   链接：https://github.com/openai/codex/issues/38719

5. **Windows 桌面拖动/开启会话将触发持续 350-800 MiB/s 的 IO 操作**（#38518）
   问题源于新版本对话框切换，导致发生循环读操作，基本上以磁盘持续高速负载影响系统，最终导致整体响应下降，获得开发者标记，引发关断询问。
   链接：https://github.com/openai/codex/issues/38518

6. **macOS 上电脑使用服务过度启动，爆发式调用导致内核 panic**（#38760）
   在 macOS 26.5 上反复产生 SkyComputerUseService 进程，每次高达每秒5-8个进程持续累积，最后激化到系统防护域级进程崩溃，该问题虽提交时间短，但非常严重（4 条讨论），也是当日上升最快的事件。
   链接：https://github.com/openai/codex/issues/38760

7. **Crashpad pending dumps 无限增长，每日至少 5GB+**（#25921）
   应用于桌面端上路径溢出问题，生成海量(.dmp+sidecar)文件堆积；社区指向这是挂起或崩溃文件累积引发的磁盘编码膨胀。
   链接：https://github.com/openai/codex/issues/25921

8. **图像文件循环复制 150,000 次，导致 400 GB 磁盘被消费掉**（#35470）
   Codex CLI 循环执行同一图片文件操作，在 Windows 上造成磁盘空间严重损耗，频繁过程中失去控制，直接影响开发周转，综合反馈较高。
   链接：https://github.com/openai/codex/issues/35470

9. **分忠于 Agent Session 持续性产生的 JSONL 存储膨胀**（#30779）
   Session 残留文件不释放，多迭代分发不断保留历史，导致 `.codex` 目录膨胀至全盘规模，直接影响计算后的磁盘管理。
   链接：https://github.com/openai/codex/issues/30779

10. **内嵌 base64 图片导致超长对话 / 线程无法继续**（#18629）
    超长序列导致 Bad Request 错误，且伴随 token 用量虚增，影响 Agent 对话连续性。开发者提出了将 inline image 分裂 Bin文件代替保存的方案建议。
    链接：https://github.com/openai/codex/issues/18629

## 四、重要 PR 进展

过去 24 小时 PR 更新多聚焦于系统改善：权限引擎统一、网络诊断、插件工具化等。挑选如下：

1. **存储诊断并入 codex doctor**（#38795）
   在诊断中报告 CODEX_HOME 与 worktree 剩余均高于 GiB 阈值。这项举措直击根本磁盘爆满问题，有望在被合并后显著降低磁盘膨胀问题。
   链接：https://github.com/openai/codex/pull/38795

2. **插件刷新同步 Hook 运行生命周期**（#38703）
   插件更新或 marketplace 变更后，同步重建 Hook 与 MCP 运行时，确保动态加载后的扩展行为一致。安全性稳定性都有提升。
   链接：https://github.com/openai/codex/pull/38703

3. **Pager 化历史引入持久 exec 线程**（#38774）
   针对exec 进程，通过分页读取历史健壮性，支持新旧 full-store 处理方式，可防止会话长期形成超大文件。
   链接：https://github.com/openai/codex/pull/38774

4. **Guardian 权限请求走共享审批流**（#38701）
   职权路径改造使权限询问跨多端统一逻辑，防止重复权限语义同时保留回收确认，可提升流程一致性。
   链接：https://github.com/openai/codex/pull/38701

5. **TUI 启动时显示 resume/fork 状态**（#38788）
   提升交互透明度：会话恢复或分支加载的过程中清晰状态提示，避免歧义。
   链接：https://github.com/openai/codex/pull/38788

6. **TUI App 活动状态按上下文作用域**（#38743）
   按用户、工作区、线程隔开 app 相关状态，确保 app 选择器不越界呈现，避免悬浮分类场景中出现 app 错配。
   链接：https://github.com/openai/codex/pull/38743

7. **TypeScript SDK 增强 raw config 覆盖**（#38817）
   支持 TOML 明面 scriptm_shell |- 带签名路径键场景下的能力映射。
   链接：https://github.com/openai/codex/pull/38817

8. **Code Mode gRPC 增加健康检查**（#38806）
   网关开放 /healthz（HTTP/1.1、/2） 而其他请求继续强制 gRPC，便于KeepAlive 和监控系统集成。
   链接：https://github.com/openai/codex/pull/38806

9. **权限审计转向只写日志**（#38800）
   网络策略决策记录对象日志接入，不再写入持久化状态，减少状态污染并同步增加log-only特征。
   链接：https://github.com/openai/codex/pull/38800

10. **MCP 工具挂介入 hooks 引擎**（#38705）
   支持同步 mcp_tool 插件，并可在搜索时扩展嵌套占位符以执行工具输入输出，也简化未来自动化工具的挂接。
   链接：https://github.com/openai/codex/pull/38705

## 五、功能需求趋势

- **Windows 性能修复优先**Windows 上系统级卡顿（鼠标不流畅、整机冻结、接入多个会话时出现的读取风暴）在社区中呼声最高，在近期 30 个问题中超过三分之一。社区重点方向：守护主进程空闲 CPU、修复程序不为运行 elevated MCP/系统资源非法引起的滞后、移除不可持续的磁盘 I|O。
- **会话存储清理与管内存管控**多项 issue 直指无限制增长的 JSONL/dmp/图像副本，给开发者带来数百 GB 至 TB 级的磁盘负担，快速推进存储诊断（doctor）与自动修复语义已经成为最刚需的工具链能力。
- **macOS 桌面稳定**:ChatGPT App 在 macOS 上违反设定，将不可用的 Computer Use 服务不受控制启动，甚至触发系统崩溃的概率更高，方向评论确认回滚版本的表现，需正式修复发版。
- **会话跨环境能力**生态上对会话边界、项目级代码库范围的明确划分（如 Scope Codex Chats 到 VS Code 项目）仍保持热度，算是对局部 Chat 能进一步提升的标准诉求。
- **MCP / 权限体系统一**与权限流拦截、MCP over HTTP 的处理已连续有 PR 修复，迹象表明将趋向一种 Cross-actor 治理标准。

## 六、开发者关注点

1. **系统冻结和输入卡顿已到达不可接受**，无论是 Windows 还是 macOS 顶层应用均被高频报告，这也催生了多条 Windows 源码路径指向的通知，更建议开发团队应先将这些系统级体验同步列入 P0 但尤为不足的是进程基线逻辑与等于冻结无关紧急；
2. **磁盘膨胀治理**仍在铺平：「会话难以提交」「重启后切胜恢复读取表达层面出错」依旧目见。整理后收敛到：太多了 by default 的 session 与 backup 持续拷贝或逐次复制粘连成 Massive dumpa隐喻版本。
3. **修复速度慢**：不少报告因为沉寂而后一动不动，明确用复数 macOS 涉及一个更新，多数是把 crashpad fixes 塞给 rolling release 论文又一次验证了 Retro Roadmap效率，说明典型桌面问题需确立更短的回环对照。
4. **“托管数据”隔离感**：用户面对不可解释的 auto-start processes（如 /SkyComputerUseService 反而），有权停止 CPU menu 人脸所主包，事实反馈 CEO 于是难被使用的卸载/禁用选项尚未适配：除非能更多提供可用反馈。

—— 日报完 ——

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-16

## 今日速览
今日社区聚焦于**子代理可靠性**与**安全加固**两个方向：针对子代理达到 MAX_TURNS 后误报成功（#22323）的修复 PR 已提交；同时多个高优先级 PR 针对预览模型权限校验、认证报错误报、SSRF 漏洞及 Node 20 EOL 升级进行了处理。社区对终端卡死及代理权限控制问题反响热烈。

## 版本发布

**v0.56.0-nightly.20260815.g2a87e7be1**（过去24小时）
本次夜间版更新主要为 SSR Agent 测试的基础设施改进，将 `process.env` 迁移为 `vi.stubEnv`，为后续相关问题的修复铺路。完整变更可参考 full changelog。

## 热点 Issues

1. **[Bug] 子代理达到 MAX_TURNS 后恢复被误报为 GOAL 成功**
   `codebase_investigator` 子代理在达到阈值后上报“成功”，可能让主会话误判结果、掩盖真实的中断。8 条评论，非维护人 1。 (issue #22323) [链接](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **[Bug] 通用代理调用后挂起**
   Gemini CLI 在委托给通用代理，如创建文件夹等简单操作时会永久挂起；用户已等待 1 小时后只能取消。8 😖 8。 (issue #21409) [链接](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **[Bug] 命令行执行完仍显示“等待输入”**
   命令已完成但 UI 永久悬挂，影响 CI/命令行用户。8 条评论，非维护人 3。 (issue #25166) [链接](https://github.com/google-gemini/gemini-cli/issues/25166)

4. **[Bug] 通用代理与子代理未充分激活**
   用户反馈请求模型很少自主执行子代理，导致效率低；需要显式指令才能呈现。8 条评论。 (issue #21968) [链接](https://github.com/google-gemini/gemini-cli/issues/21968)

5. **[Bug] Browser 子代理在 Wayland 下失败**
   Browser 子代理在 Linux/Wayland 桌面环境中无法正常结束，直接影响 Linux 用户。8 条评论。 (issue #21983) [链接](https://github.com/google-gemini/gemini-cli/issues/21983)

6. **[Bug] 子代理未在预设禁止时执行** (since v0.33.0)
   用户已配置禁用子代理，但项目仍会调用通用代理，产生故障与安全操作。8 条评论。 (issue #22093) [链接](https://github.com/google-gemini/gemini-cli/issues/22093)

7. **[Enhancement] 子代理失败报告不含子代理上下文**
   `/bug` 信息仅包含主会话 Agent+Context，没有子代理中断的上下文描述，给调试带来很大难度。8 条评论。 (issue #21763) [链接](https://github.com/google-gemini/gemini-cli/issues/21763)

8. **[Bug][安全] 自动记忆会重试低质量会话**
   自动记忆功能在遇到低质量会话时会产生无限重试，且内存补丁区无法对无效会话做隔离。8 条评论。 (issue #26522) [链接](https://github.com/google-gemini/gemini-cli/issues/26522)

9. **[Bug] 模型过多时触发 400 错误** (<=128个)
   CLI 在有超过 128 个工具时请求会直接 400，无法自动裁剪、限制启用工具。8 条评论。 (issue #24246) [链接](https://github.com/google-gemini/gemini-cli/issues/24246)

10. **[Bug] auto memory 会持续重试低价值会话**
   自动记忆提取器会无限重试处理低信号会话，给 `Auto Memory` 组件带来额外压力。8 条评论。 (issue #26525) [链接](https://github.com/google-gemini/gemini-cli/issues/26525)

## 重要 PR 进展

- **预览模型 uri 提示** — 针对用户请求预览模型 `<gemini-3.1-pro-preview>` 但账号不可用时给出显式提示，修复 #28825。 (PR #28828) [链接](https://github.com/google-gemini/gemini-cli/pull/28828)
- **避免 401 出现子串误判** — 修复 `isAuthenticationError` 在信息中包含 401 时误判的问题，修复 #28203。 (PR #28827) [链接](https://github.com/google-gemini/gemini-cli/pull/28827)
- **修复：Docker 沙箱升级到 node:22-slim** — Node 20 EOL 且已失去安全修复，此 PR 可防止恶意攻击逃逸，CVSS 8.6 提升。 8 条评论 (PR #28726) [链接](https://github.com/google-gemini/gemini-cli/pull/28726)
- **安全：阻止 web-fetch 突破 DNS 漏洞** — 针对 SSRF 漏洞进行修复，避免了访问本地 IP 如 `169.254.169.254`。修复 #28555。 (PR #28725) [链接](https://github.com/google-gemini/gemini-cli/pull/28725)
- **本地读取时保留其它终止原因** — 固定 `complete_task` 使用 MAX_TURNS 后的 recovery，修复 #22323。 (PR #28815) [链接](https://github.com/google-gemini/gemini-cli/pull/28815)
- **Vertex AI 401 提高错误提示** — 如果用户是标准 API key 且想在 Vertex 中使用，将提供明显的配置错误提示。 (PR #28679) [链接](https://github.com/google-gemini/gemini-cli/pull/28679)
- **新增行为评估（BIX）** — 多工具链、context 安全、安全边界执行、文件 404 恢复。 (PR #28824) [链接](https://github.com/google-gemini/gemini-cli/pull/28824)
- **新增搜索任务等 BI** — 验证任务规划、完成状态、追踪方法。 (PR #28822) [链接](https://github.com/google-gemini/gemini-cli/pull/28822)
- **新增 tracker navigate 等 BI** — 验证任务图形功能与错误恢复。 (PR #28823) [链接](https://github.com/google-gemini/gemini-cli/pull/28823)
- **修复：preview 接口 404 时使用稳定模型** — 当 Gemini API key 无法访问 preview 模型时，先尝试恢复稳定模型，对开发者更友好。 (PR #28608) [已关闭] [链接](https://github.com/google-gemini/gemini-cli/pull/28608)

## 功能需求趋势

- **提升子代理能力与可靠性** 开发优化点，多组支持。
- **安全加固方向**优先，优先关注**SSRF、Node 升级**、密钥获取等。
- **AST 感知的代码库映射 / 文件查找**：已列入“探索方向”。
- **更好的本地任务管理**文件工作流，获得官方支持。
- **模型可解释性，内置可观测性**：如 `/chat share` 展示子代理轨迹，以稳定复现问题。

## 开发者关注点

- **子代理 bug 修复进度**：多数的执行流程与终止原因上报问题都集中在子代理路径上(慢、挂起、误报，仍是社区最集中的痛点)。
- **上下文与沙箱机制优化**：对无效补丁、临时标识的 session 需提高校准准确度，以减少 AI 操作对 repo 的间接影响。
- **AI 环境适配**：含 Wayland 下不支持、多工具管理（400 报错）也是常见的兼容性问题，反馈者需求主张明确。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

### GitHub Copilot CLI 社区动态日报

**日期：2026 年 8 月 16 日**

---

#### 1. 今日速览

昨日社区活跃度集中在 **MCP（Model Context Protocol）生态**与**多模型、Byok 支持**等方向。多个 Issue 指向 Atlassian MCP OAuth 在 1.0.79/1.0.80 版本中的回归，此问题较为集中；同时，关于会话管理（如 `/restart` 与 `-w` 冲突）和模型缓存刷新机制的反馈也有较高关注度。PR 方面主要推动仓库自动化管线优化。

---

#### 2. 版本发布

过去 24 小时内无新 Release。

---

#### 3. 社区热点 Issues 精选

以下选择了 10 个值得关注的 Issue，反映当前开发者的核心痛点与求助方向，重点涵盖 MCP、配置与平台兼容性：

1.  **Atlassian MCP OAuth 回归问题**
    *   **Issue #4480 (已关闭)**：从 1.0.71 升级至 1.0.79 后，连接远程 MCP 服务器（mcp.atlassian.com）时，OAuth 发现机制因 RFC 8414 §3.3 不匹配而失效。
    *   [评论: 4 | 👍: 6](https://github.com/github/copilot-cli/issues/4480)
    *   **Issue #4490 (开放中)**：此问题在 1.0.80 中持续存在（`MCPOAuthError`），这意味着自动调式并未完全修复该回归。开发者已确认 1.0.78 版本可用。
    *   [评论: 0](https://github.com/github/copilot-cli/issues/4490)
    *   *社群热度*：描述一致，影响较多使用 Atlassian 的团队。

2.  **NixOS 上 Bash 工具损坏（>=1.0.49）**
    -   **#3392**: 自 1.0.49 版本起，在 NixOS 上运行命令报错 `<exited with error: Failed to start bash process>`。该问题持续 3 个月未修复，且有 9 个 👍。
    -   [评论: 4](https://github.com/github/copilot-cli/issues/3392)

3.  **新增特性请求：下键 Archive 会话的撤销功能**
    -   **#4502**：将会话标记为“Done”后会直接归档，若误操作会移出列表且无直接在 UI 中撤销的入口。请求添加反归档方法。
    -   [评论: 0](https://github.com/github/copilot-cli/issues/4502)

4.  **会话内 `/spawn` 的参数冲突 Bug**
    -   **#4493**：使用 `copilot -w` 创建的会话内运行 `/restart`，会同时尝试使用 worktree 选项与现有会话 ID，导致冲突失败。
    -   [评论: 0](https://github.com/github/copilot-cli/issues/4493)

5.  **模型支持请求：GPT-5.6 reasoning.mode**
    -   **#4495**：请求为 GPT-5.6 添加 `reasoning.mode`（`standard`/`pro`）参数选择。开发者关注新模型能力映射。
    -   [评论: 0](https://github.com/github/copilot-cli/issues/4495)

6.  **Codespaces 安装与更新路径问题**
    -   **#4501**：新初始化的 Codespace 自带 1.0.3 版 Copilot CLI，且 `copilot update` 由于权限限制无法替换 `/usr/local/bin` 下的二进制文件，无法完成升级。
    -   [评论: 0](https://github.com/github/copilot-cli/issues/4501)

7.  **Windows 上的 OOM 崩溃（宿主内存提交失败）**
    -   **#4499**：`copilot.exe` 在 V8 堆内存还不到 600M/4.3G 时，触发 `FATAL ERROR: Committing semi space failed` 崩溃。停止逻辑与宿主物理内存有关，这对长任务运行（autopilot）是较大的阻碍。
    -   [评论: 0](https://github.com/github/copilot-cli/issues/4499)

8.  **BYOK 条件：autopilot 调用导致 Prompt 缓存失效**
    -   **#4500**：在 `--autopilot` 的“完成提示”轮次，CLI 会重新解析整个 `input` 数组而非发送原始的字节内容，破坏了 BYOK 条件下的 Prompt 缓存机制，影响成本与速度。
    -   [评论: 0](https://github.com/github/copilot-cli/issues/4500)

9.  **新启用模型不生效**
    -   **#4494**：在 GitHub 设置中启用新模型（如 Sonnet 5）后，CLI 与 VS Code 中不刷新本地模型目录，重新登录或手动清理本地缓存才能生效。
    -   [评论: 0](https://github.com/github/copilot-cli/issues/4494)

10. **ACP 会话配置缺失**
    -   **#4275**：[ACP] `contextTier` 无法在会话中动态调整，只能通过启动参数设置，与交互式 CLI 的 `/model` 选择器行为不一致。
    -   [评论: 2](https://github.com/github/copilot-cli/issues/4275)

---

#### 4. 重要 PR 进展

本期活跃 PR 较少，聚焦于仓库内部维护。挑选了以下重点：

1.  **#4497** - 处理 Fork 分支无效标签的关联
    *   **状态**: 开放
    *   在 `pull_request` 行为 fork 仓库运行且在 CI 中无法获取到 PR 关联信息时，更新逻辑以信任工作流元数据并寻找唯一的 PR。
    *   [查看 PR](https://github.com/github/copilot-cli/pull/4497)

2.  **#4449** - 将标签操作迁移出 `pull_request_target`
    -   **状态**: 已完成
    -   将无效标签自动化从 `pull_request_target` （安全问题） 迁移到 `pull_request` 信号，避免对 Fork PR 执行特权操作。重构安全模型。
    -   [查看 PR](https://github.com/github/copilot-cli/pull/4449)

*注：社区中较零散的其他 issue 未包含在 PR 列表中，以“/”项目有更新变动为准。*

---

#### 5. 功能需求趋势

从近期高频与热门 issue 来看，社区在以下方向上表现急切：

-   **MCP 生态稳定性**：同为 OAuth 重）， OAuth 失败的回归已连续影响两个版本，希望通过提升配置/版本回退的错误的呼声很高。
-   **会话生命周期管理**：希望增加做归档恢复（`#4502`）、并修复 `/restart` 与工作树模式的冲突（`#4493`）。这表明对交互 / 自动化会话的可用性要求增强。
-   **模型特性接入**：模型发布后希望 CLI 能快速对齐新参数（如 `reasoning.mode`），并统一不同模式下的 `contextTier` 操作方式。本地模型缓存不刷新也成了阻碍采用的关键因素。
-   **运行环境适配**：在 NixOS、Windows 及 Codespaces 障碍环境中使用体验有待提升，不仅仅是功能 correctness。

---

#### 6. 开发者关注点

-   **回归响应速度**：多个评论参与者指出，Atlassian 的 OAuth 在 DualShip 1.0.79/80 中持续出现，缺乏QA迹象，因阻断所有 MCP 远程服务，团队需发布补丁的紧急度。
-   **编排一致性与可配置性**：开发者希望 ACP 协议能做到与交互式 CLI 相同的参数与会话控制权无误，同时兼顾 BYOK 缓存。
-   **环境的隐式变更**：部分发布更新（如 1.0.3 → 1.0.80）未能通过系统权限或 Codespaces 的环境差异而来，表示依赖不如升级，无法自动拉伸造成或渣档的静默搭配。
-   **透明性与错误提示**：对设置明文中的模型不可见性 (如未醒来) 时，无法理解是否希望能提供清晰的调试信息。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-16

## 今日速览

今日社区核心围绕**记忆系统缺失**和**订阅配额机制不透明**展开激烈讨论，其中热议已久的 `#1283 Memory System` 在沉淀半年后仍无官方排期，说明记忆功能已成为大型项目用户的核心痛点。同时，PR 侧出现两个值得关注的修复：`StrReplaceFile` 计数逻辑修复（精度提升）以及 API 圆环引用错误提示增强（健壮性改善）。

---

## 社区热点 Issues

### 今日动态

#### 🔥 #1283 Memory System — Persistent context across sessions（持续热门）
- **报告者** `@CatKang` | **评论** 40 | **状态** Open
- **简介** 请求实现系统性的记忆层，关联先前 3 月请求，社区对大项目跨进程上下文流失的呼声持续高涨。
- **意义**：与 #1478 同是内存优化的重要议题，但发布多日仍无排期迹象，可能影响用户对复杂项目的体验与粘性。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1283

#### 🧠 #1478 记忆层优化诉求（大项目之痛）
- **报告** `@hahy36` | **评论** 3 | **更新** 8-15
- **摘要**：用户在大型项目中深感无 Memory 层的痛苦，并引用了第三方 `.claw` 项目结构（如 `SOUL.md` / `USER.md`）作为参考借鉴。
- **意义**：对比性的外部实践方案，给项目提供了明确的改进信号——社区期望正式的“长期记忆”机制（非 `agent.md`）。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1478

#### 📋 #2604 订阅配额异常减少的调查请求
- **报告** `@tobiu`（带详细前/后实验数据） | **评论** 2 | **创建于** 8月15
- **焦点**：基于用户级监测，在成员方案中每日可消费 Token 量骤降 3-5 倍。
- **重要性**：直接关乎付费用户权益与信任，且显然需要官方给明释因（变更 or Bug）。若本月重打包则影响面将很大。
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2604

#### 🛠 #2603 配额感知的上下文压缩请求
- **提案者** `@salim4n` | **无评论** | **8月15日新增**
- **核心**：在当前 1M 上下文的 K3 模型下，通过退化到完全不压缩上下文（`reserved_context_size=50000`）令压缩功能实现形同虚设。
- **意义**：意在通过预算触发替换用户 Token 消耗，具有低成本、高效能的良机。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2603

#### 🔗 #1155 OPENAI_LEGACY 推理内容丢失（已关）
- **观察**：因 `reasoning_key` 从未传递，在使用 `sglang/vllm` 作为 backends 时所有推理步骤被丢弃。
- **现状**：曾关闭，但为处理 Bug 源头，值得在更新后重新关注。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1155

---

## 重要 PR 进展

### 已合入 | 待评测

#### ✅ #2524 fix(tools): count StrReplaceFile replacements against the running content
- **作者**: @Sreekantri | **涉及**: 自 7月20日 更新
- **内容**：修复连续编辑时替换计数器错误的问题（链式编辑按原内容检查会导致后续操作失败）。
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2506

#### 🧵 #2506 fix(kosong): clear error on circular $ref in deref_json_schema
- **作者**: 同上 | **更新于** 8月15 | **状态**：Closed
- **价值**：循环引用递归预判以前会无限循环报错；现在报错更友好，便于调试外部集成。
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2506

---

## 功能需求趋势

- **记忆与持久层**： 与 #1478 高热度连续两季焦点，用户要求不仅保存对话，更想定义**项目级长期偏好**和**模式**（考虑 `agent.md` 延伸或 `.kimi/memory` 文件系统）。
- **配额可视化与弹性**： 除涨价外，开发者更期待能手动压上下文预算，收 1M context="小窗口"自动压缩，编码者需要**主动控制消费**（对应 #1195 和 #9）。
- **多 Provider 参数完备性**： 对 OpenAI-compatible 服务需输出原始 `reasoning_content`，否则纯文本模型拿不到思维链特性。

---

## 开发者关注点

1. **合规细则**：`配额每日减少投诉` 官方未立即修复，一定程度上动摇长期付费，使用日志提示需更高的透明度与公告时效。
2. **实用路线权威性**： `agent.md` 已被全面认识，但想要长期记忆层则必须像“turbo”或“new-codex”一样被内建为头等 API 成员，而非通过隐藏 `.claw/workspace` 实现。
3. **大型项目体验**： 某“1M ctx”，实际会话 1W 后就触发不续，说明目标应是**记忆 + 手动压额定审**，而非仅防止持续输入超长维度。

> 💡 数据说明：今日 Issues / PR 数量较少，以上聚焦了当下最具讨论价值的 4 条，未 0 填充另 6 个新兴但噪音内容，评论集中于内核与商业模式交互平衡。

— 日报生成于 2026-08-16。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-16）

## 今日速览

今日社区讨论热度集中在 **OpenCode Go/Zen 付费服务可用性** 上：多个 Issue 报告订阅扣款成功但工作区仍提示余额不足、grok-4.5 端点上连续出错等问题，反映出服务端的稳定性问题正在影响用户体验。与此同时，社区对 2.0 版本的新能力持续热情高涨，多个核心 PR 正在推进事件系统重构、会话预算控制以及容器化工作区支持，整体生态正在快速演进。

---

## 社区热点 Issues

### 1. 订阅付款成功但工作区显示余额不足 — #37790
**作者** @ahdkabeerhadi | 评论 14 | 👍 0
用户在 Stripe 支付成功, 但工作区仍然显示 "Insufficient balance"，无法使用 OpenCode Go。该问题已持续接近一个月仍未解决，涉及付费核心链路，影响用户的信任度。
🔗 https://github.com/anomalyco/opencode/issues/37790

### 2. Plan Mode + Question 工具是否可以自动切换 Build — #7801
**作者** @gasatrya | 评论 10 | 👍 31
建议 Plan 模式下使用 Question 工具后自动切换到 Build 模式，减少手动切换操作，是今日高赞需求，反映开发者对 TUI 操作流畅性的关注。
🔗 https://github.com/anomalyco/opencode/issues/7801

### 3. 官方称 100% 免费但社区急需订阅 — #42143
**作者** @mahmoud-Web-Developer | 评论 10 | 👍 1
用户质疑官方首页 "100% free" 的宣传与实际订阅之间不符，涉及产品定位和社区期待的信息不对称。
🔗 https://github.com/anomalyco/opencode/issues/42143

### 4. grok-4.5 在 opencode go 端点上连续 8 月 2 日以来持续返回 500 — #40206
**作者** @lirc571 | 评论 9 | 👍 1
调用 grok-4.5 的 Chat Completions API 稳定返回 500，Windows 11 环境。一周来无回应，是模型供给层面的关键痛点，影响特定模型使用。
🔗 https://github.com/anomalyco/opencode/issues/40206

### 5. 会话无限压缩循环 — #27924
**作者** @ranxianglei | 评论 8 | 👍 0
`prompt.ts` 中压缩失败时不会中断循环，导致无限压缩循环（overflow → compact → still overflow →...）。已分析到具体模块调用路径，社区反应较好。
🔗 https://github.com/anomalyco/opencode/issues/27924

### 6. 长 URL 换行后不可点击 — #35649
**作者** @sporteka2 | 评论 5 | 👍 2
Kitty 终端下，换行的长链接无法通过 OSC 8 超链接点击，影响终端内操作链接的体验，同类 Issue 在 v1 也反复被反馈。
🔗 https://github.com/anomalyco/opencode/issues/35649

### 7. V2 CLI headless 命令加载 TUI 并泄漏临时文件 — #37671
**作者** @chrisae9 | 评论 4 | 👍 2
`opencode --version`、`--help` 等 headless 场景也会加载 OpenTUI native 动态库，每次写入 13.1MiB 临时文件，反复调用会累积。适合大批量调用场景关心的效率。
🔗 https://github.com/anomalyco/opencode/issues/37671

### 8. 项目目录移动后旧路径不更新 — #34737
**作者** @afsharmn | 评论 4 | 👍 0
项目移动后，OpenCode 仍指向旧路径，无法在 TUI 直接打开新位置，影响日常组织项目开发的流畅性。
🔗 https://github.com/anomalyco/opencode/issues/34737

### 9. Deepseek API 存在降低计费问题 — #32911
**作者** @tehNate | 评论 3 | 👍 1
重大：1.17 版本后，Deepseek API 被过度计费（token 消耗虚高），已通过 Reddit 核实，直接影响用户成本，需要异常优先级关注。
🔗 https://github.com/anomalyco/opencode/issues/32911

### 10. OpenCode 服务端错误（workspace 页面 500 / ResourceExhausted）— #42799
**作者** @catink123 | 评论 2 | 👍 0
OpenCode 官方 workspace 页面 DB 报错（transaction pool connection limit），说明服务端资源耗尽，影响所有用户的同时，也会牵连客户端请求。
🔗 https://github.com/anomalyco/opencode/issues/42799

---

## 重要 PR 进展

### 1. 新增「已读」会话状态，跨客户端同步 — #42811
**作者** @kitlangton | 更新 08-16 | 状态 Open
会话已读状态从各客户端本地改为服务端统一管理，解决多个 Client 打开后 unread 状态不同步问题。是 V2 会话架构的推进。
🔗 https://github.com/anomalyco/opencode/pull/42811

### 2. Docker blueprint 工作区 — 引入容器化 workspace #42831（等待合规检查）
**作者** @johnpyp | 更新 08-15 | Open
在 opencode core 增加 Docker 工作区 provider，支持不可变蓝图，子代理隔离在独立容器中，是渐进式容器化方向，具有前瞻基础。
🔗 https://github.com/anomalyco/opencode/pull/42831

### 3. Incus 工作区 Fork 支持 — #42829（等待合规检查）
**作者** @johnpyp | 更新 08-15 | 已关闭
与 Docker 类似，支持 Incus 提供的容器/VM 蓝图 fork，兼顾虚拟化层，扩展支持多个隔离能力。
🔗 https://github.com/anomalyco/opencode/pull/42829

### 4. 插件事件订阅支持单类型选择 — #42830
**作者** @thdxr | 更新 08-15 | Open
增加 `ctx.event.subscribe(type)`，替代以前的全量通配，提高插件事件订阅效率，兼容多事件类型处理。
🔗 https://github.com/anomalyco/opencode/pull/42830

### 5. Promise 事件迭代器作用域修正 — #42832
**作者** @thdxr | 更新 08-15 | Open
修复 `Stream.toAsyncIterable` 未归属子作用域导致的事件逃逸，避免迭代器终结后事件丢失/错乱，对异步当前正确性重要。
🔗 https://github.com/anomalyco/opencode/pull/42832

### 6. 批量流式 session delta，降低事件风暴 — #42826
**作者** @thdxr | 更新 08-15 | 已合并
将分散的文本、推理片段合并批量发布，实测能大幅低服务器事件频率，降低系统负载，对大型会话稳定性有益。
🔗 https://github.com/anomalyco/opencode/pull/42826

### 7. 每个会话独立预算上限 — 对应 UI — #42823 / #42824
**作者** @HHrddtu | 更新 08-16 | 已合并
新增 session 级 budget 字段及 DB migration，界面可配 voice input 和 budget 面板，能满足用户控费需求（结合 issue 可更精细）。
🔗 https://github.com/anomalyco/opencode/pull/42823

### 8. 数字型事件时间戳，避免跨边界时区解析 — #42828
**作者** @thdxr | 更新 08-15 | 已关闭
`created` 从 DateTime.Utc 统一改为 epoch milliseconds 数值，降低序列化/持久化转换风险，提升时间准确性。
🔗 https://github.com/anomalyco/opencode/pull/42828

### 9. 修复移动设备 variant 下拉与发送按钮重叠 — #42833
**作者** @Xieweikang123 | 更新 08-16 | Open
在 320-390px 宽度下，reasoning-effort 下拉遮挡发送按钮，修复影响移动端使用的关键 UI bug。
🔗 https://github.com/anomalyco/opencode/pull/42833

### 10. 释放虚拟化时间轴 DOM 节点 — #42825
**作者** @Hona | 更新 08-15 | 已关闭
长期 session 下 TanStack Virtual 会保留约 37,500 个脱离的 DOM 节点，导致渲染器内存泄漏，通过主动释放节点来优化长 chat 的内存占用。
🔗 https://github.com/anomalyco/opencode/pull/42825

---

## 功能需求趋势

从今日 Issues 中可提炼出几个社区关注度最高的功能方向：

1. **订阅 / 配额管理** — 多起付费后余额未同步（#37790）、免费/收费定位模糊引发的需求（#42143），以及对 Go Pro 分层定价、月度折扣 / 分享功能的诉求（#24879），说明 **计费透明度和配额控制** 是高悬痛点。
2. **模型可用性 / 稳定性** — grok-4.5 连续多天 500/503（#40206、#40886），Deepseek token 计费异常（#32911），均直接阻碍实际使用。
3. **TUI 交互细节 / 移动端适配** — 鼠标禁用后滚轮行为（#35295）、多行 URL 无法点击（#35649、#42805）、移动端控件遮挡（#42833），体现终端与移动场景的完善需要。
4. **会话生命周期管理** — 无限压缩循环（#27924）、会话预算控制（#42823）、已读状态（#42811）等，说明让用户更精细控制会话资源的 **成熟度需求** 在增长。
5. **V2 多客户端一致性** — 已读状态、项目路径、目录选择器等跨 Client（TUI/Desktop/Web）的一致性问题频繁出现，**一致性 / 同步** 是 V2 迭代期的重点。

---

## 开发者关注点

- **付费 / 配额痛点最尖锐** — 「已付费」但服务不可用（#37790）在当前社区反馈中警告断了全体用户，迅速滑向信任问题；另一方面「官方说免费」与「要求订阅」的信息矛盾（#42143）也直接增加决策成本。
- **持续存在的服务端稳定性** — OpenAI 端点 500/503 与 workspace 后台 ResourceExhausted 并行出现（#42799），使得社区对基础服务的稳定性逐渐失去耐心，当前 1.18 时期的体验可能成为 V2 重要的是参照。
- **上下文 / 内存优化** — 压缩无限循环（#27924）触发的会话卡死、虚拟列表 DOM 泄漏（#42825）等问题影响长会话体验，开发者要求更稳健的上下文处理方案。
- **更精细的配给与控制** — per-session budget、voice input、favorites 跨进程同步（#37172）等需求集中体现了开发者对**生产力型功能 + 可控成本**的明确期待。
- **5. 多语言环境的真实使用问题** — 中文、阿拉伯语等非英语用户的反馈开始出现（#42785、#42794、#42814），OpenCode 的国际化体验和基础错误提示仍需改进。

> 所有数据均来自今日 GitHub 数据，如需了解某个问题的细节，可点击链接直达相应 Issue / PR。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-08-16** · 数据来源：[github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)


## 一、今日速览

今日社区动态聚焦于 **`/review` 命令的可靠性加固**——PR #9091/#9092 系列实现了中断恢复、工作树租约锁定、重叠检测 ID 感知等多项丛林修复，但伴随而来的新 Issue 也表明逆向审计的并发与超限问题仍有残余；同时 **SWE-bench Verified 与 Terminal-Bench 2.0 的端到端 smoke 验证全部通过**，为持续交付提供了质量保障。CI 左侧出现多起 E2E 失败（#9237/#9239/#9241），但均已被 autofix 接管并自动提交修复。


## 二、版本发布

### v0.21.11-nightly.20260815.c396fe3d12
- 例行 nightly release（基于 `release/v0.21.11-nightly` 分支自动化生成）

**主要变更：**
- **autofix 权能治理**：为自动修复新增默认拒绝的 footprint gate，并引入“位置感知审查”（positional window censuses），压缩自动修复的隐式影响面（PR #9156）。

**Benchmark smoke 系列验证结果：**
- 本轮共执行了 5 次端到端验证（r1–r5），覆盖 **SWE-bench Verified**（`swe-bench-verified@2`）与 **Terminal-Bench 2.0**，全部 **⛶⛶ 通过**；另含 1 次完整 500-case SWE + 89-case TB 联合发布链路，均成功后自动发布。
- 参照 `Benchmark-Qwen-Ref: v0.21.12`，即发布已完成。


## 三、社区热点 Issues（Top 10）

### 1. `/review` 并发工作区竞争——同一 PR 的 worktree 被并发会话删丢 ⚠️
- **#9227 | OPEN | P2**
- [链接](https://github.com/QwenLM/qwen-code/issues/9227)
- 摘要：并发对同一 PR 运行两份 `/review` 时，`fetch-pr` 创建的固定路径 worktree（`.qwen/tmp/review-pr-<n>`）会被另一会话的完成清理逻辑径自删除，导致正在进行的审查在 5 分钟内丢失现场。
- 社区反映：已由作者自提 PR #9211（带 3b 租约锁）尝试闭环，但仍暴露 base 设计面向并发场景的脆弱性。

### 2. `/review` 验证探针污染共享 worktree ⚠️
- **#9207 | OPEN | P2**
- [链接](https://github.com/QwenLM/qwen-code/issues/9207)
- 摘要：第 4 步抽取验证探针直接在共享 worktree 内变更 `compose-review.ts` 并遗留 `__probe__.test.ts`，与并发跑第 5 轮 reverse-auditor 的进程互踩。
- 社区态度：一个流程内多类型 agent 并发必须隔离工作区。

### 3. `/review` chapter 重试静默不触发且 cleanup 销毁证据
- **#9206 | OPEN | P2**
- [链接](https://github.com/QwenLM/qwen-code/issues/9206)
- 摘要：3B reverse-audit 循环中，4 个 chunk 两轮实质dry receipt后应允许第 3 轮退役，但循环实际未执行撤退；且随后 cleanup 将现场证据全部清理，无法追溯。

### 4. qwen serve 新文件权限硬编码 0600，无法配置
- **#9250 | OPEN | P3**
- [链接](https://github.com/QwenLM/qwen-code/issues/9250)
- 摘要：`write_file` / `edit` / `notebook_edit` 创建新文件时对所有新文件强制 0600 模式（不遵循 umask），且无任何设置键或 env 可覆盖，破坏系统默认安全策略。
- 社区关注：希望新增 `settings` 支持 `new_file_mode` 或至少遵循 daemon umask。

### 5. 前缀缓存失效：`enableCacheSharing` 默认关闭
- **#9230 | OPEN | P2**
- [链接](https://github.com/QwenLM/qwen-code/issues/9230)
- 摘要：在支持前缀缓存的服务器（如 llama.cpp）上，主 session 前缀相似度低于 0.10，按 LRU 调度导致每次主 turn 都重新逐字 prefill，缓存命中率 ~0%；“建议”侧查询又主动避免复用同一 server cache。
- 社区态度：要求该项目默认开启 cache 共享；列为 P2 等待讨论。

### 6. `ask_user_question` 静默返回拒绝，不展示问题原因
- **#9011 | OPEN | P2**
- [链接](https://github.com/QwenLM/qwen-code/issues/9011)
- 摘要：当调用 `ask_user_question` 取消时，返回消息 `'User declined to answer the questions.'` 却从不提示用户被询问的具体问题，也不区分取消类型。

### 7. web-shell artifact 板面刷新报错（长驻 issue）
- 问题：#7427 | OPEN | P2/P2
- [链接](https://github.com/QwenLM/qwen-code/issues/7427)
- 摘要：自动刷新生效时反复出现 `Load artifacts failed: Failed to fetch` toast；PR #7320 新增回归赛道，但 #9227 已固定该行为，反而侧证旧 toast 已消失于当前 main。
- 强调之处：社区已持有 1 周 + 5 comments，期待何谓最终 UX。

### 8. Main CI 连续多起 E2E 失败（过时回归）
- **聚合体**：#9237 / #9239 / #9241 | OPEN | P1 | 全部 `autofix/approved`
- 链接：
  - [#9237](https://github.com/QwenLM/qwen-code/issues/9237)
  - [#9239](https://github.com/QwenLM/qwen-code/issues/9239)
  - [#9241](https://github.com/QwenLM/qwen-code/issues/9241)
- 摘要：三起 main 分支 E2E 飞测均失败在 “before any test result” 阶段（疑似 runner checkout 或基础设施原因），且均由 autofix 自动踢出修复 PR。
- 趋势：CI 错误仍频发，但正向“自动修复 before 人工”演进。

### 9. 0.19.3 UI 中文输入法完全失效（用户持续报告）
- **#5966 | OPEN | P2 | 来源：中文本地用户**
- [链接](https://github.com/QwenLM/qwen-code/issues/5966)
- 摘要：执行于 2026-06-28 提出，截至更新到 08-15，输入法 IME 失效后无报错且不可定位；issue 逗留近 2 月未有官方结论，仅保留 `need/retesting` 标记。
- 社区回声：用户重复“nodejs 实在烦死”，且影响版本不止 0.19.3。

### 10. 同一任务多次调用本地模块过程差异大（质量验收）
- **#9200 | OPEN | P2**
- [链接](https://github.com/QwenLM/qwen-code/issues/9200)
- 摘要：同样任务 + 相同本地模块，多次调用产生处理差异（日志不一致），作者质疑 Qwen-Engine 的生成过程一致性（“连已停服的 iflow cli 也不如”）。
- 备注：更偏评价向 Issue，需官方从调用链补全日志定位。


## 四、重要 PR 进展（10 个）

### 1. [#9213 | fix(review): 修复 reverse 审查退役静默失败，并保留未收敛证据](https://github.com/QwenLM/qwen-code/pull/9213)
- **PoV**：修复多个 dry-receipt 解析器对句末标点敏感的问题，并同步保留所有非收敛证据，直接一对一解决 #9206 的问题。
- 关联：持有 `autofix/takeover` 标识，正在审核。

### 2. [#9203 | feat(review)：仅在有 clock 时启用 huge round 缩减](https://github.com/QwenLM/qwen-code/pull/9203)
- 在 #9183/#9201 之上栈推进：huge diff 第三轮停止之前允许节流，但必须存在 run clock 避免无限循环。

### 3. [#9211 | fix(review)：锁定 PR review 的 worktree 租约，防并发删除](https://github.com/QwenLM/qwen-code/pull/9211)
- 修复 #9205：`fetch-pr` 记录 session 租约同时加锁，所有 destructive 操作（cleanup、reset）前强制校验锁，核验通过才可操作。

### 4. [#9212 | fix(review)：允许带领下 ID 的进给重复过顶-豁免 presubmit overlap drop](https://github.com/QwenLM/qwen-code/pull/9212)
- 解决 #9208（ledger re-posts 被静默丢失）：已携带上游 ID 的同位 comment 不再因其 `(path,line)` 碰撞而被丢弃，保留合并回执。

### 5. [#9130 | feat(triage)：沙箱验证增加确定性 flakiness 门禁](https://github.com/QwenLM/qwen-code/pull/9130)
- 在验证 CI 上新增确定性 flake-gate：clean install 后对 PR 差异的单测 5 次（可调 2-10）重跑，超过 1 次不稳定即标注不通过；属 7 轮 review 已解决全部 Critical。

### 6. [#9092 | feat(review)：从磁盘被中断的 PR 审查中恢复（fetch-pr --resume）](https://github.com/QwenLM/qwen-code/pull/9092)
- 在 session-ledger 基础上实现 `--resume`：自动验证前次 report 有效性 + worktree SHA 匹配边界，通过即续跑，可直接贴合修改偏移。

### 7. [#9227 | test(web-shell)：pin #7427（artifact 刷新静默失败）回归](https://github.com/QwenLM/qwen-code/pull/9227)
- 添加#7427 缺失回归 pin——现 main 中 toast 已归档，但需测试锁定（用例“background refresh fail 无 toast”）。

### 8. [#9247 | fix(review)：按 GitHub 限制裁剪 review body（65k 字符）](https://github.com/QwenLM/qwen-code/pull/9247)
- `compose-review` 预先测量输出长度，超限时按顺序修剪（先 deferral → 再 not-reviewed），保证发布到 PR 的 review 永不超长。

### 9. [#9235 | fix(serve)：从 Web Shell 事件面安全移除 skill 全文](https://github.com/QwenLM/qwen-code/pull/9235)
- 服务器 session snapshot 包含全部技能 SKILL.md（native client 编辑所需）；Web Shell 应只收到 **引用/hash**，避免完整脚本参与 OTA 暴露。

### 10. [#9220 | fix(ci)：复用runner 失败 checkout 自愈](https://github.com/QwenLM/qwen-code/pull/9220)
- 修复自托管公共池中 checkout 失败即终止的问题：首次失败清理后重试；完成后即使仍失败也会打上损坏工作区标识，防止后续job在脏路径上二次执行。


## 五、从 Issues 提炼：功能需求趋势

| 趋势方向 | 高频信号 | 用户期望 | 建议状态 |
|---|---|---|---|
| **逆向式审查/可靠性** | `/review` 循环中并发、退役、即输出 | 降低“3小时分析后最后一步失败”的概率 | **应变核心，且已被本轮 PR 统一响应** |
| **CI 自动化健壮性** | self-host 复用池 历史坏 Checkout、E2E 失败可见 | 失败时可自动重构/自愈 | 已由 #9228 等推进固定模式 |
| **交互会话体验** | IME 失效（中文）、`ask_user_question` 无信息 | 稳定 IME；精准失败展示 | #5966、#9011 打开时间久 |
| **隐私与权限模型** | 新文件 0600 等非配置 | 服务端默认隐私 → 允许 umask | #9250 待接 |
| **缓存与性能** | 前缀缓存/server cache share 失效 | 让 relay 模式支持共享 | #9230 待 triage |
| **产物/导入导出** | WebShellTranscript 复用（#9186） | HTML 导出天然适配原生 UI | roadmap 标定 `export-data` |


## 六、开发者关注点（高频痛点）

1. **`/review` 的崩溃与恢复是绝对头部**：大量 review-相关 PR/Issue 是对同一套引擎的持续加固（共享 worktree、并行轮次、overlap 判断），其中 **高 effort 模式下 3 小时耗尽后失败** 的用户挫败感最强。
2. **CI self-host 的血泪教训**：非隔离 runner 上，`Wipe stale workspace` 删掉了整个 `.git/` 历史（~900 MB）。行为需改为仅清理 A/B 目录、其余惰性同步。
3. **缓存 & 长驻服务**：LSM 应默认开启 `enableCacheSharing` 且支持前缀复用策略，否则高频 session 大量白费推理资源。
4. **服务权限被指太“软”了**：文件权限（0600）、单独公开 skill 体，无配置中心/白名单。社区希望将这些明确纳入 AC 面部安全面。
5. **系统性黑盒**：一次运行结果差异不可解释性曾被“类 iflow”的问题带走——说明流程如何透明、日志如何分层打开，对用户信任至关重要。

---

*本报告由 AI 技术分析自动摘要生成，所有条目均保证可回溯至 GitHub 原始 Issue/PR 链接。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*