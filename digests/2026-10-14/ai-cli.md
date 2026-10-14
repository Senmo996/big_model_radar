# AI CLI 工具社区动态日报 2026-10-14

> 生成时间: 2026-10-14 02:34 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-14）

## 1. 生态全景

当前 AI CLI 工具赛道呈现出 **"量变积累、质变前夜"** 的状态。各工具均已完成从"单次对话式辅助"到"多智能体协作与自动化执行"的架构转型，但社区反馈集中在**稳定性、可诊断性与权限机制精细度**等工程化短板——多 Agent 协作、无人值守、长会话保持等重负载场景开始暴露问题。同时，**Windows 平台支持质量**成为多款工具的共同软肋，跨平台一致性的重要性已上升至与模型能力同级的地位。各工具在生态位上的分化已基本清晰：Claude Code 偏重团队协作与多智能体编排，Codex 主攻桌面端与自动化，而 Gemini CLI、Qwen Code 则分别在终端体验和托管 Agent 架构上发力。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | PR 进展 | Release | 活跃度信号 |
|---|---|---|---|---|
| **Claude Code** | 10 个热点，最高 49 评论（跨机器 Agent 协作） | 2 条（均为 CLOSED 维护性） | 无新版本 | 讨论热度高，但 PR/Release 沉寂，处于提问密集期 |
| **OpenAI Codex** | 10 个热点，最高 79 评论（Windows launcher 失败） | 10 个（后台压缩、daemon 管理、Guardian 审查） | 3 个 alpha（rust-v0.163.0-alpha.8/9/10） | PR 密集合入，基础设施快速迭代，处于活跃开发期 |
| **Gemini CLI** | 10 个热点，最高 P1 子代理状态误报 | 10 个（YOLO 安全降级、终端同步渲染等） | 3 个（v0.64.0 stable + preview + nightly） | 稳定发版节奏，安全与终端体验双线推进 |
| **GitHub Copilot CLI** | 10 个热点，最高 👍 13（跨应用会话同步） | 0 条 | 1 个（v1.0.98-1） | Issue 讨论活跃，但 PR 完全空白，依赖官方迭代 |
| **Kimi Code CLI** | 无 | 无 | 无 | 过去 24 小时完全无活动，项目可能处于休眠或低频维护期 |
| **OpenCode** | 10 个热点，最高 16 评论（Provider 模型注入回归） | 10 个（含 2 个 CLOSED） | 无新版本 | 社区活跃但受 V2 迁移遗留问题拖累，修复与回归并存 |
| **Qwen Code** | 10 个热点，4 个 P1/P2 级新 issue | 10 个（managed-agent 修复占主导） | 2 个（preview + nightly） | Managed Agent 架构快速修复迭代，社区贡献活跃 |

> 注：各工具热点 Issue 均取日报中列出的 Top 10；PR 数为日报中列出的重要 PR 数量。

## 3. 共同关注的功能方向

### ① 多智能体协作与子代理可靠性
- **Claude Code**：跨机器 Agent 通信协议（#28300，49 评论）、共享团队记忆（#38536）
- **Codex**：Dots 无法连接本地项目任务（#49729，55 评论）
- **Gemini CLI**：Subagent MAX_TURNS 状态误报（#22323）、generalist agent 挂起（#21409）
- **Qwen Code**：Managed Agent 崩溃恢复、wake input 不执行（#14116）

各工具社区均认为**子代理的状态可信度和故障恢复能力**是当前最不可接受的质量短板。

### ② 长会话上下文管理
- **Claude Code**：空闲自动压缩静默丢弃上下文（#98747，👍 31，今日最高赞）
- **Codex**：PR #53800 将后台压缩接入 turn 生命周期
- **OpenCode**：媒体负载不计入上下文、模糊 400 错误终止会话（#54690/#46564）
- **Qwen Code**：vLLM/SGLang 上下文溢出错误识别失败（#14096/#14097）

**上下文压缩的触发条件、用户知情权和恢复路径**已成为社区最敏感的话题之一。

### ③ 权限与安全机制精细化
- **Claude Code**：子代理危险 `rm` 提示无自动拒绝超时（#99899）、授权范围内误删容器日志（#101241）
- **Gemini CLI**：YOLO/AUTO_EDIT 模式 shell 重定向绕过安全降级（PR #29648，P1）
- **Codex**：Full Access 间歇性降级为 managed approval（#40125）
- **OpenCode**：`permission.ask` 插件钩子声明但从未触发（#47674）

无人值守与半自动场景对**权限系统的一致性、细粒度和可预期性**提出了远比手动模式更高的要求。

### ④ Windows 平台支持短板
- **Claude Code**：Desktop 安装签名验证失败（#26457，👍 20）、MCP OAuth 发现失败（#96792）、扩展宿主 OOM（#101901）
- **Codex**：MXC launcher HRESULT 0x80070003（#52407，79 评论）、Computer Use 死锁（#35446）
- **Copilot CLI**：终端安全拒绝导致会话恢复死循环（#5123）
- **Qwen Code**：桌面端文件拖拽修复（#14049）

Windows 成为各工具社区抱怨最集中的平台，**跨平台一致性直接影响企业级用户的工具选型**。

### ⑤ MCP 生态稳定性
- **Claude Code**、**Copilot CLI**、**Qwen Code**（ACP 模式 MCP 工具未宣告 #14114）、**OpenCode**（MCP 文档示例缺失）——四款工具均有 MCP 相关报障，说明 MCP 作为工具生态标准已广泛应用，但**协议实现的健壮性和配置体验**仍是普遍痛点。

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | 多智能体协作 + 团队知识管理 | 大型软件团队、需要多 Agent 编排的复杂项目 | 以 Agent-to-Agent 协议和共享记忆为差异化抓手，社区呼声指向 **"分布式 Agent 编排平台"** 演进 |
| **OpenAI Codex** | 桌面端自动化 + 幕后 Agent 编排 | Windows/macOS 桌面重度用户、自动化流水线依赖者 | 以 Rust 核心 + daemon 架构 + Dots 智能体为载体，PR 侧重**后台压缩、Guardian 审查、守护进程管理**等基础设施，技术路线偏 **"系统级工程优化"** |
| **Gemini CLI** | 终端原生体验 + 安全沙箱 | CLI 重度用户（tmux/Vim 用户）、Google 生态开发者 | **AST 感知代码库工具链**（EPIC #22745）和零依赖 OS 沙箱（#19873）是独有的探索方向，偏 **"智能化终端开发环境"** |
| **GitHub Copilot CLI** | 企业级多模型接入 + GitHub 生态整合 | GitHub 企业用户、需要 BYOK 的合规团队 | **BYOK/自定义 Provider** 是最集中需求域，服务端 agent 与本地 CLI 混合架构，偏 **"模型中立的企业助手"** |
| **OpenCode** | 开源可扩展平台 | 插件开发者、追求高度自定义的独立开发者 | **插件系统 + 多 Provider 生态**为核心，V2 迁移后处于平台化演进阵痛期，偏 **"开发者优先的开源框架"** |
| **Qwen Code** | 托管多 Agent 架构 + 开源模型优化 | 使用自建 vLLM/SGLang 后端的团队、阿里云生态用户 | **Hosted Harness + Managed Agent + RocketMQ 集成**架构独树一帜，偏 **"云原生多代理服务化"** |
| **Kimi Code CLI** | （不明确） | — | 24 小时零活动，暂无法判断当前定位 |

**关键差异点**：
- **模型战略**：Copilot CLI 主推 BYOK 模型中立，Qwen Code 聚焦开源模型后端适配，Claude Code 和 Gemini 各守自家模型，Codex 依托 OpenAI 生态
- **架构取向**：Codex 与 Qwen 走向**后台服务化（daemon/harness）**，Gemini 与 OpenCode 深耕**终端/插件体验**，Claude Code 押注**多智能体协议层**
- **社区治理**：Copilot CLI 是典型的官方主导型（PR 为零），OpenCode 和 Qwen Code 的社区贡献活跃度最高

## 5. 社区热度与成熟度

- **讨论热度最高**：**Claude Code**（最高 issue 49 评论）与 **Codex**（最高 issue 79 评论），两者社区基数大、使用场景深入。但 Claude Code 的 PR 活跃度极低（仅 2 条关闭项），说明其处于**社区期望远高于官方迭代速度**的状态，存在口碑风险。

- **迭代速度最快**：**Codex** 与 **Qwen Code**。Codex 单日 3 个 alpha + 10 个 PR，Qwen 单日 2 个 release + 10 个 PR，均处于**高频修复、快速试错**的工程冲刺阶段。Qwen 的 PR 集中在 managed-agent 稳定性，Codex 偏向基础设施管线，两者的快速迭代也反映了其架构尚未完全稳定。

- **社区最活跃（生态共建型）**：**OpenCode**。16 评论的回归 issue、10 个 PR（含插件权限、i18n、GUI 插件等新功能），社区贡献者参与度高，**开源生态健康度较好**，但 V2 迁移遗留问题（会话消失、DB 膨胀）正在消耗用户信任。

- **相对沉寂**：**Copilot CLI**（PR 为零）、**Kimi Code CLI**（零活动）。Kimi 在主流工具中已边缘化，Copilot CLI 则更多依赖官方闭源迭代，社区影响力在下降。

- **成熟度判断**：
  - **较成熟**：Claude Code（功能丰富但近期稳定性引担忧）、Gemini CLI（发版节奏稳定，问题可预期）
  - **快速成长期**：Codex、Qwen Code（能快速响应，但系统稳定性仍薄弱）
  - **平台转型期**：OpenCode（V1→V2 迁移的磨合阵痛）
  - **停滞/休眠**：Kimi Code CLI

## 6. 值得关注的趋势信号

### ① 跨机器多智能体协作将成为下一代 CLI 的分水岭
Claude Code 的 #28300（49 评论）和 #38536（团队共享记忆）获得大量共鸣，Codex 的 Dots 也在探索类似方向。**单机单 Agent 的能力比拼已接近天花板，下一阶段竞争焦点将转向"Agent 之间的通信协议、任务编排和团队知识共享"**。开发者应关注各工具的 A2A（Agent-to-Agent）相关能力演进，它将重新定义 CI/CD、DevOps 自动化的工作流范式。

### ② 长会话上下文管理的"信任危机"正在形成
Claude Code 的空闲自动压缩 issue 获得今日最高赞（31），OpenCode 和 Qwen 的多个 issue 指向压缩机制在边界条件下的失效。**用户对工具"静默丢失上下文"的容忍度极低**。这提示工具厂商：压缩/截断行为必须在用户知情、可控的前提下进行，否则会摧毁开发者对工具最基本的信任。对深度用户的实际建议是：**避免单会话超长运行，建立定期 checkpoint 的习惯，并谨慎升级到引入自动压缩机制的版本**。

### ③ 无人值守与半自动模式暴露安全机制的设计短板
多个工具出现"授权范围内执行危险命令导致数据丢失"（Claude Code #101241）、"子代理提示无超时导致无限卡顿"（#99899）、"YOLO 模式绕过安全降级"（Gemini PR #29648）——**权限系统的非确定性是自动化工作流的最大杀手**。行业正在从"是否允许"向"允许什么条件下做什么、如何紧急熔断、如何完整审计"演进。对于依赖自动化的团队，建议对"危险命令白名单 + 超时熔断 + 审计日志"三件套有更明确的要求。

### ④ Windows 支持质量成为企业选型的否决项
Codex 的 Windows 问题占据今日 60% 的热门 issue，Claude Code、Copilot CLI 也各有 Windows 专项 bug。**"能在 macOS/Linux 上跑通"已不再是卖点，"在 Windows 上不翻车"正成为企业客户端部署的及格线**。对 Windows 重度用户，短期内建议优先关注 Codex（问题集中、反馈最活跃）和 Claude Code 的修复进展，或考虑在 WSL 中运行 CLI 规避部分问题。

### ⑤ BYOK/多模型需求从"可选"走向"刚需"
Copilot CLI 今日最集中的需求域是 BYOK（自定义模型、短名称匹配、动态模型列表），OpenCode 的 Provider 模型注入回归获得 16 评论，Qwen 社区大量 vLLM/SGLang 适配问题——**开发者正越来越多地在自建或第三方模型后端的私有环境中使用 AI CLI**。自带密钥 + 私有模型 + 企业合规的组合场景，将是工具厂商获取企业客户的重要竞争点。

### ⑥ 可诊断性正在成为 AI CLI 的隐形竞争力
多个 issue 不约而同地批评错误信息的模糊性（Qwen 的 bodyless 400、Codex 的 opaque denial、Claude Code 的日志标注为 manual）。**当 Agent 行为不可预测时，用户最需要的是"为什么"的答案**。错误信息中是否包含 request ID、可操作的修复建议、透明的决策日志，将直接影响用户在故障时的去留选择。

---

*本报告基于 2026-10-14 各工具 GitHub 社区动态日报数据整理，所涉 Issue/PR 编号均可溯至原始仓库。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**: [anthropics/skills](https://github.com/anthropics/skills) | **截止日期**: 2026-10-14 | **样本**: Top 20 PRs / Top 15 Issues

---

## 1. 热门 Skills 排行

### Top 8 高关注 Skills（PR）

| 排名 | Skill / PR | 核心功能 | 社区关注焦点 | 状态 |
|---|---|---|---|---|
| 1 | **mcp-builder** — [#1742](https://github.com/anthropics/skills/pull/1742) | MCP 服务构建与连接管理 | MCP SDK ≥2.0 破坏性变更：`streamablehttp_client` 重命名为 `streamable_http_client`，自定义 header 改为 `create_mcp_http_client` 配置；大量存量技能需适配 | Open（9月活跃） |
| 2 | **skill-creator** — [#1298](https://github.com/anthropics/skills/pull/1298) | Skill 创建核心工具，含触发评估与基准测试 | 触发评估误报：多 worker 命令探测竞争、Windows 下 `select()` 失败、运行时错误被误判为"未触发"导致负例通过 | Open（持续更新） |
| 3 | **proofcore-contract-auditor** — [#1771](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 智能合约静态审计，并锚定审计证明到 TON 区块链 | Web3 场景自动化审计，基于零存储 Merkle 协议做密码学存证，是"区块链+AI"交叉方向的新尝试 | Open（9月提交） |
| 4 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 文档直接编译为带拟人配音的 MP4 教学视频 | 零成本"文档→视频"流水线：Marp 生成幻灯片 + 语音合成；适合教程/演示内容量产 | Open |
| 5 | **notion-spec-to-implementation + quantitative-resume-auditor** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品/技术规格书转化为 Notion 可执行任务；量化简历审计 | 需求→实施计划全链路拆解（含验收标准与进度追踪），覆盖产品管理和招聘两个场景 | Open（9月底更新） |
| 6 | **AWT（AI Watch Tester）** — [#822](https://github.com/anthropics/skills/pull/822) | 基于视觉 + 浏览器控制的 AI 驱动 E2E 测试 | 零代码测试生成、自动回归；已开源独立项目，社区对"AI 自主测试"期望高 | Open |
| 7 | **document-typography** — [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质量控制 | 解决 AI 文档通病：孤词换行（1-6 词溢出到下一行）、孤行标题滞留页底、编号错位 | Open（3月后停更） |
| 8 | **ODT skill** — [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument（.odt/.ods）创建、模板填充、ODT→HTML 转换 | 开源/ISO 标准格式支持，适配 LibreOffice 生态，补足官方文档技能拼图 | Open |

**观察**：评论热度最高的两条是**核心基础设施修复**（mcp-builder 兼容性、skill-creator 评估可靠性），而非新功能——说明社区当前更关心"既有技能是否稳定可靠"，其次才是新技能扩展。

---

## 2. 社区需求趋势（从 Issues 提炼）

### ① 安全与信任边界（呼声最高，46 评论）
- [#492](https://github.com/anthropics/skills/issues/492)：社区技能以 `anthropic/` 命名空间分发，**假冒官方身份**，用户可能对非官方技能授予过高权限，构成信任边界漏洞。紧随其后的是 eval-viewer XSS（[#1394](https://github.com/anthropics/skills/issues/1394)）、`shell=True` 命令注入（[#1980](https://github.com/anthropics/skills/pull/1980)）。

### ② 组织级技能共享（16 评论）
- [#228](https://github.com/anthropics/skills/issues/228)：企业用户希望**组织内直接共享技能库**，而不是发送 .skill 文件 + 手动导航到 Settings 上传。企业协作是明确的付费级需求。

### ③ 技能评估可信度（12 评论）
- [#556](https://github.com/anthropics/skills/issues/556)：`run_eval.py` 在所有查询下触发率为 0；[#1352](https://github.com/anthropics/skills/issues/1352) 并行 worker 导致 UUID 串线产生假阴性；[#1383](https://github.com/anthropics/skills/issues/1383) 基准测试静默失败。**"无法证明技能有效"成为采纳瓶颈**。

### ④ 稳定与生命周期管理
- [#62](https://github.com/anthropics/skills/issues/62)：用户 12 个技能无故消失并报错；[#189](https://github.com/anthropics/skills/issues/189)：`document-skills` 与 `example-skills` 插件安装出

---

# Claude Code 社区动态日报 — 2026-10-14

## 今日速览

今日无新版本发布。社区讨论热度集中在三项能力缺口上：**跨机器多智能体协作**（#28300，49 条评论）、**Claude Desktop Windows 安装失败**（#26457，31 条评论）与**共享团队记忆**（#38536，29 条评论）。此外，一个关于 2.1.286 版本空闲自动压缩导致工作上下文丢失的 bug 获得了 31 个赞，成为开发者反馈最强烈的稳定性问题。

---

## 版本发布

过去 24 小时无新版本发布。

---

## 社区热点 Issues（10 个）

### 1. 跨机器多智能体协作（Agent-to-Agent 协议）
- **Issue:** [#28300](https://github.com/anthropics/claude-code/issues/28300) | 评论: 49 | 状态: OPEN
- **要点:** 请求为 Claude Code 增加跨机器的多智能体协作能力，使不同机器上的 Agent 实例可以通过标准协议互相通信和协作完成任务。
- **值得关注:** 社区讨论热度最高，反映大型项目团队对分布式 Agent 编排的强烈需求。

### 2. Claude Desktop Windows 11 安装失败（签名验证错误）
- **Issue:** [#26457](https://github.com/anthropics/claude-code/issues/26457) | 评论: 31 | 👍: 20 | 状态: OPEN
- **要点:** 在 Windows 11 上重新安装 Claude Desktop 时出现签名验证失败，无法加载，与 #25385 相关。
- **值得关注:** 20 个 👍 说明大量 Windows 用户受此影响，属于高优先级桌面端 bug。

### 3. 请求共享团队记忆功能
- **Issue:** [#38536](https://github.com/anthropics/claude-code/issues/38536) | 评论: 29 | 👍: 10 | 状态: OPEN
- **要点:** 提议为 Claude Code 增加团队级共享记忆系统，当前记忆仅限个人，无法在工程师之间传递上下文。
- **值得关注:** 团队协作场景的刚需，与 #28300 的协作需求形成呼应。

### 4. [BUG] 2.1.286 空闲自动压缩静默丢弃工作上下文
- **Issue:** [#98747](https://github.com/anthropics/claude-code/issues/98747) | 评论: 23 | 👍: 31 | 状态: CLOSED
- **要点:** 自 2.1.286 起，Claude Code 会在 prompt 缓存过期前自动压缩空闲会话，无退出选项、无警告，导致长时间运行会话的工作上下文丢失，且日志记录为 "manual"。
- **值得关注:** 31 个 👍 是今日最高，已关闭但开发者情绪强烈，可能已被官方修复或内部处理。

### 5. VS Code 扩展宿主启动 2+ 并行子 Agent 后 OOM 崩溃
- **Issue:** [#101901](https://github.com/anthropics/claude-code/issues/101901) | 评论: 3 | 状态: OPEN
- **要点:** 在 Windows 上，从 Claude Code 扩展启动 2 个并行后台 Agent 子代理后，扩展宿主在数秒至 1 分钟内 OOM 崩溃，三次独立缓解尝试均失败。
- **值得关注:** 严重稳定性问题，影响 VS Code 用户的多 Agent 工作流。

### 6. [MODEL] Agent 在 "restart without asking" 授权下执行 `docker rm` 销毁唯一日志
- **Issue:** [#101241](https://github.com/anthropics/claude-code/issues/101241) | 评论: 2 | 状态: OPEN
- **要点:** 模型在一个 "无需确认重启" 的授权范围内，对一个崩溃容器执行了 `docker rm`，导致该容器唯一日志被永久删除。
- **值得关注:** 数据丢失风险，触及权限粒度设计和危险操作护栏的核心问题。

### 7. 子代理的危险 `rm` 提示无自动拒绝超时，无人值守运行无限卡住
- **Issue:** [#99899](https://github.com/anthropics/claude-code/issues/99899) | 评论: 2 | 状态: OPEN
- **要点:** 主 Agent 的危险移除安全提示有 120 秒倒计时并自动拒绝，但由子代理触发的同类提示没有超时机制，导致 bypass 模式下的无人值守运行一直卡住。
- **值得关注:** 自动化流程的阻塞点，属于权限与安全机制的一致性问题。

### 8. MCP OAuth 发现（.well-known）在 Windows 上返回 InvalidHTTPResponse
- **Issue:** [#96792](https://github.com/anthropics/claude-code/issues/96792) | 评论: 4 | 状态: OPEN
- **要点:** 多个 MCP 服务器的 OAuth 发现机制在 Windows 上均失败，报 InvalidHTTPResponse 错误。
- **值得关注:** 跨平台一致性问题，影响 Windows 上 MCP 生态的接入体验。

### 9. [BUG] 请求被 "[cyber]" 安全分类器错误拦截
- **Issue:** [#101925](https://github.com/anthropics/claude-code/issues/101925) | 评论: 1 | 状态: OPEN
- **要点:** macOS 上 2.1.296 版本请求被 `[cyber]` 安全分类器错误拦截，提供了 Request ID 和 Message ID 便于官方排查。
- **值得关注:** 安全误报问题今日仍在持续出现，属于新提交的个例反馈。

### 10. 桌面应用（Code 标签页）切换组织后会话元数据消失
- **Issue:** [#101921](https://github.com/anthropics/claude-code/issues/101921) | 评论: 1 | 状态: OPEN
- **要点:** 在 Claude 桌面应用的 Code 标签页中切换组织后，会话元数据（标题、分组、侧边栏状态）不再显示，本地数据似乎仍存在但 UI 不展示。
- **值得关注:** 新提交的桌面端 UI bug，影响多组织用户的会话管理。

### 备选关注

- **[#101910](https://github.com/anthropics/claude-code/issues/101910)（评论: 4）:** 建议将 TUI 中难用的 Plugins、Marketplace 和 MCP 编辑器在有 Web GUI 可用时切换为 Web 界面。
- **[#101931](https://github.com/anthropics/claude-code/issues/101931)（新提交）:** 请求桌面应用在打开会话时显示 Remote Control 状态。

---

## 重要 PR 进展

过去 24 小时内仅有 2 条更新，均为已关闭状态：

### 1. [CLOSED] fix: respect DAYS_BACK env var in backfill-duplicate-comments script
- **PR:** [#44393](https://github.com/anthropics/claude-code/pull/44393) | 作者: @Dogecito42 | 更新: 2026-10-13
- **内容:** 修复了工作流脚本中 `DAYS_BACK` 环境变量被忽略的问题——此前脚本始终回退到 MIN/MAX_ISSUE_NUMBER。现在会正确读取 `DAYS_BACK` 计算截止日期，并在分页落入截止日期之前时提前终止。
- **意义:** 维护性改进，提升 issue 去重回填脚本的可用性。

### 2. [CLOSED] Create SECURITY.md
- **PR:** [#1](https://github.com/anthropics/claude-code/pull/1) | 作者: @bcherny | 创建: 2025-02-24 | 更新: 2026-10-13
- **内容:** 为仓库添加 SECURITY.md 安全策略文档。
- **意义:** 仓库基础治理补充。

> 说明：过去 24 小时 PR 活跃度极低，无新提交或进行中的功能 PR。

---

## 功能需求趋势

从今日全部 Issues 中可提炼出以下几个社区最关注的功能方向：

### 1. 多智能体协作与团队化
- **跨机器 Agent 通信协议**（#28300，49 评论）
- **共享团队记忆**（#38536，29 评论）
- 表明社区正从"单 Agent 辅助编码"走向"多 Agent 协作 + 团队知识复用"。

### 2. 非 IDE 环境下的可用性改进
- **TUI 编辑器迁移到 Web GUI**（#101910）
- **终端 tab 标题反映 Agent 状态**（#71369）
- **内置"需要输入"与"完成"区分通知音**（#73384）
- 终端重度用户（tmux/CLI）在持续要求更好的状态感知和交互体验。

### 3. 桌面应用体验增强
- **显示 Remote Control 状态**（#101931）
- **修复切换组织后会话元数据消失**（#101921）
- 桌面端 Code 标签页正在成为新的主力入口，相关体验问题开始密集浮现。

### 4. 权限与安全机制精细化
- 子代理危险操作提示缺乏超时（#99899）
- 危险命令授权粒度问题导致数据丢失（#101241）
- 社区期望权限系统更细粒度、更一致，以支撑无人值守和半自动场景。

---

## 开发者关注点

### 1. 空闲自动压缩（Idle Compaction）引发信任危机
#98747 获得今日最高 👍（31），用户对 2.1.286 引入的静默上下文压缩非常不满——无退出选项、无警告、日志标注为 "manual" 加剧了不透明感。长时运行会话的上下文丢失对实际工作流的破坏性很大。

### 2. Windows 平台问题集中爆发
- Claude Desktop 安装签名验证失败（#26457，👍 20）
- MCP OAuth 发现失败（#96792）
- VS Code 扩展宿主 OOM（#101901）
- 多个严重问题集中在 Windows 平台，相关用户对 Windows 支持质量表达担忧。

### 3. 安全过滤器误报（[cyber]）持续出现
今日仍有大量"cyber 误报"类 issue 更新（#101925、#75104、#75210 等）。开发者反馈在合法的安全研究、逆向工程、设备调试场景中被 `[cyber]` 分类器中断会话，且多数标记为 closed/duplicate，社区希望官方能提供误报申诉和复盘机制。

### 4. 无人值守运行的可靠性短板
- 子代理危险 `rm` 提示无超时卡死（#99899）
- Agent 在授权范围内误删容器日志（#101241）
- 暴露了 bypass/自动授权模式下的两类问题：提示机制不一致、危险操作识别不足。对于依赖 Claude Code 跑长时间自动化任务的开发者，这是当前最痛点之一。

### 5. 多 Agent 并发在特定环境下的稳定性
VS Code 扩展宿主在 2 个并行子 Agent 下即 OOM（#101901），说明多 Agent 并发在实际桌面/IDE 环境中仍不够稳健，是推进大规模 Agent 编排的阻力。

---

*日报生成时间: 2026-10-14 | 数据来源: github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-10-14）

## 今日速览

今日社区焦点集中于 **Windows 平台稳定性问题**，多个高频 Issue 涉及 MXC launcher 初始化失败（HRESULT 0x80070003）、沙箱权限降级与会话挂起，说明 Windows 桌面端仍是当前质量短板。与此同时，PR 侧密集合入后台压缩、守护进程管理、Guardian 审查刷新等内部管线改进，项目正在快速迭代基础设施。

---

## 版本发布

过去 24 小时内发布了 3 个 Rust 核心的 alpha 版本，均为小版本迭代，暂无详细更新说明：

- **rust-v0.163.0-alpha.8** / **.9** / **.10**（2026-10-14）
  - 链接：https://github.com/openai/codex/releases

---

## 社区热点 Issues（10 个）

### 1. Windows Dots: CUA MXC launcher 失败，HRESULT 0x80070003
**#52407** | 评论 79 | 👍 10 | [链接](https://github.com/openai/codex/issues/52407)

Windows 上 Dots 的 CUA MXC launcher 在 direct shell 恢复后报 HRESULT 0x80070003（路径不存在）。这是今日评论最多的问题，说明受影响的 Windows Dots 用户不少，且可能与近期 Windows 桌面端浏览器工具/计算机操作组件初始化问题同源。

### 2. Dot 无法创建/跟进已保存项目中的本地 Codex 任务
**#49729** | 评论 55 | 👍 11 | [链接](https://github.com/openai/codex/issues/49729)

Dot 能启动本地任务，但无法选择已保存的 Codex App 项目，也无法通过返回的 thread ID 读取或回复。该问题直接切断了 Dots 与桌面端「项目」工作流的连接，智能体编排的核心场景受阻。

### 3. Windows 10 Computer Use 在 FrameArrived 中死锁
**#35446** | 评论 28 | 👍 0 | [链接](https://github.com/openai/codex/issues/35446)

Windows 10 上 Computer Use 的 SoftwareBitmap 转换在 FrameArrived 回调内死锁，已持续 3 个月仍未解决，反映 Windows 10 平台的兼容性测试可能不足。

### 4. create_thread 将 Full Access 子任务降级为 managed approval
**#40125** | 评论 24 | 👍 5 | [链接](https://github.com/openai/codex/issues/40125)

Windows 桌面端间歇性将 Full Access 工作树子任务降级为受管审批模式。权限模式丢失不仅影响自动化效率，且「间歇性」特征让用户难以稳定复现。

### 5. [Windows] 浏览器工具初始化失败：MXC launcher HRESULT 0x80070003
**#53188** | 评论 21 | 👍 0 | [链接](https://github.com/openai/codex/issues/53188)

与 #52407 高度相关，浏览器工具初始化时 MXC launcher 报同一错误码。Windows 11 用户受影响，且界面语言为西班牙语，提示非英语环境的可复现性也需要覆盖。

### 6. Windows Desktop 注入未知的 code_mode_tool_description_first 配置
**#52747** | 评论 19 | 👍 1 | [链接](https://github.com/openai/codex/issues/52747)

Windows 桌面端出现未知注入配置和拒绝清理的日志，用户对 opaque 的强制清理拒绝感到困惑，也反映出配置诊断信息不够透明。

### 7. Codex IDE 扩展在 VS Code Remote-SSH 下卡在加载中
**#26951** | 评论 18 | 👍 3 | [链接](https://github.com/openai/codex/issues/26951)

CLI 在远程服务器上工作正常，但扩展在 Remote-SSH 中一直加载失败。远程开发是 Codex 的核心场景之一，此问题已持续 4 个月+，直接影响大量 VS Code 远程用户。

### 8. macOS 恢复 Option+Space 全局快捷唤起
**#31925** | 评论 16 | 👍 39 | [链接](https://github.com/openai/codex/issues/31925)

ChatGPT/Codex 应用合并后，macOS 上 Option+Space 快捷唤起被移除。这是今日高赞需求，说明桌面端快捷操作对重度用户效率影响很大。

### 9. 权限/审批模式选择无法持久化
**#29915** | 评论 12 | 👍 4 | [链接](https://github.com/openai/codex/issues/29915)

新的或已加载的线程均无法可靠保存权限模式设置。桌面端在新建/恢复会话时倾向于丢失用户设定，直接影响自动化流程的连续性。

### 10. macOS MCP override 使本地 daemon 无法访问
**#41014** | 评论 7 | 👍 5 | [链接](https://github.com/openai/codex/issues/41014)

`codex_app` MCP override 在 macOS 回归：设置 `CODEX_APP_SERVER_USE_LOCAL_DAEMON=1` 后，Desktop 仍启动私有 stdio app-server 而忽略健康 daemon。该问题暴露了配置优先级设计上的缺陷。

---

## 重要 PR 进展（10 个）

### 1. 跟踪 prompt 组装和压缩过程中的内容来源
**#53831** | [链接](https://github.com/openai/codex/pull/53831)

消息角色与分类无法标识内容由谁提供，该 PR 为 prompt 组装和压缩链路引入来源追踪，确保截断后的来源可追溯。

### 2. 安全清理未使用的 app-server daemon 发行版
**#53827** | [链接](https://github.com/openai/codex/pull/53827)

记录当前及前一个 daemon 选择历史，并在包安装后安全清理未使用的旧发行版，避免文件被正在运行的 worker 占用。

### 3. 交互式 CLI resume 时拒绝 Guardian 审查线程
**#53816** | [链接](https://github.com/openai/codex/pull/53816)

TUI resume 前检查 thread 元数据，明确拒绝 Guardian 审查线程并提供 `codex resume <parent_thread_id>` 提示。

### 4. 支持从 Windows WinGet 包安装 daemon
**#53811** | [链接](https://github.com/openai/codex/pull/53811)

WinGet 归档把 CLI/主程序放在包根目录而 daemon 期待 `bin/` 子目录，该 PR 适配 WinGet 布局以支持 daemon 安装。

### 5. workspace 路由配置错误增加安全诊断
**#53805** | [链接](https://github.com/openai/codex/pull/53805)

路由加载失败的通用提示无法定位根因，且原始配置可能包含密钥。此 PR 在隐藏敏感内容的同时提供安全错误原因（safe reason）。

### 6. 归档/删除期间保持 Agent 命令中心可见
**#53804** | [链接](https://github.com/openai/codex/pull/53804)

将归档/删除进度改为居中对话框，不再替换任务列表，保留任务上下文。

### 7. 将后台压缩接入 turn 生命周期
**#53800** | [链接](https://github.com/openai/codex/pull/53800)

开启 `AsyncCompaction` 时，在 turn 前/中/后检查点启动后台压缩，并在后续检查点采纳准备好的结果，减少压缩对交互的阻塞。

### 8. Guardian 审查上下文变化时刷新审查
**#53797** | [链接](https://github.com/openai/codex/pull/53797)

此前审查期间的 assistant 消息会中止审查，现在改为重新触发评估，确保审查结论基于最新证据。

### 9. 修复 macOS 用户验证提示的取消逻辑
**#53790** | [链接](https://github.com/openai/codex/pull/53790)

Keychain 签名重建了自己的认证上下文，导致调用方的 context 失效无法取消生物识别弹窗，现改为根据存储密钥的访问控制策略评估。

### 10. 在 realtime 请求中转发客户端 voice session ID
**#53784** | [链接](https://github.com/openai/codex/pull/53784)

为 WebSocket/WebRTC/既有通话传输新增可选 `voiceSessionId`，并作为 `voice-session-id` header 转发，便于服务端关联语音会话。

---

## 功能需求趋势

从今日 Issue 分布看，社区最关注的方向可分为四个层次：

1. **Windows 稳定性（最突出）**：MXC launcher 初始化失败、Computer Use 死锁、浏览器工具不可用、会话挂起——Windows 桌面端是当前 bug 重灾区，约占本次 30 条热门的 60%。
2. **沙箱与权限可靠性**：Full Access 间歇性降级、权限模式不持久、SSH 配置文件所有权误判——用户对「沙箱能稳定复现安全策略」有极高期望，间歇性问题比直接报错更令人困扰。
3. **远程与多端一致性**：VS Code Remote-SSH 扩展卡加载、远程 WSL WebView 401、Remote SSH 历史会话缺失——远程开发场景是核心工作流，任何断连/重连后的状态丢失都会导致任务中断。
4. **智能体/自动化编排**：Dots 任务与本地项目脱节、Guardian 审查策略、后台压缩上下文保持——围绕多智能体协作和长会议程保持的诉求正在上升。

---

## 开发者关注点

- **Windows 平台问题多且严重**：可能是当前 Codex 桌面端最影响口碑的痛点。HRESULT、死锁、卡死等高频关键词降低了 Windows 用户对桌面版的信任度。
- **权限模式的非确定性**：Full Access 降级为 managed approval、权限选择不持久——用户反馈集中在「为什么我的自动化流程没有按照设定的权限执行」，这种非确定性中断对自动化工作流是致命的。
- **状态/会话恢复不可靠**：会话丢失、线程消失、queue 积压但不可清除、daemon 重启后本地执行和 native messaging 丢失——开发者关心「我在远端的工作进展是否能无缝接续」。
- **错误信息不透明**：多个 Issue（如 #52747、#53805）批评日志难以理解、诊断不透明，开发者希望在快速定位错误时获得更多可用信息，而不仅是见「opaque denial」。
- **对 Linux/远程开发体验的持续关注**：Remote-SSH、WSL2、Ubuntu 26.04 等场景被持续上报，说明 Codex 在开发者真实工作流中的深度嵌入已成为常态。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-10-14）

## 今日速览

今日发布三个版本：稳定版 v0.64.0、预览版 v0.65.0-preview.0 及夜间版 v0.65.0-nightly，主要集中在 A2A 设置迁移、会话恢复去重、只读工作区 enforce 等稳定性修复。社区讨论热点集中在子代理可靠性（MAX_TURNS 误报、generalist agent 挂起）和 AST 感知工具链的探索上，多个 PR 正在推进终端渲染、sandbox 镜像解析与安全模式降级等修复。

## 版本发布

### v0.64.0（稳定版）
- refactor(a2a-server): 实现 V1 到 V2 的设置迁移逻辑（[#29450](https://github.com/google-gemini/gemini-cli/pull/29450)）
- fix(acp): 桥接 PromptResponse.usage 并发出 usage_update 通知（[#29389](https://github.com/google-gemini/gemini-cli/pull/29389)）

### v0.65.0-preview.0
- fix(cli): 在不可信文件夹中强制执行只读工作区设置（[#29583](https://github.com/google-gemini/gemini-cli/pull/29583)）
- fix(core): 恢复会话时避免重复的 tool response turns（[#29699 关联](https://github.com/google-gemini/gemini-cli/pull/29699)）

### v0.65.0-nightly.20261014.g42c518220
- fix(cli): 修正反向搜索高亮索引，正确处理扩展 Unicode 字符（[#29699](https://github.com/google-gemini/gemini-cli/pull/29699)）
- fix(core): 将纯空白字符的 UTF-16 和 UTF-32 文件视为空文件处理

## 社区热点 Issues（10 个）

1. **[Subagent 在 MAX_TURNS 后状态误报为 GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)** · `P1` · 评论 13 · 👍 2
   `codebase_investigator` 子代理实际因达到最大轮次而中断，却上报 `status: "success"` / `Termination Reason: "GOAL"`，掩盖了真实的中断原因，严重误导用户对代理执行结果的判断。

2. **[利用模型 bash 亲和力：零依赖 OS 沙箱与执行后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)** · `P2` · 评论 9
   Gemini 3 模型天然擅长链式调用 POSIX 工具探索代码库。该 issue 提议在零依赖沙箱中安全释放这一能力，并在执行后进行意图路由，平衡安全与模型原生工作流。

3. **[Generalist agent 挂起](https://github.com/google-gemini/gemini-cli/issues/21409)** · `P1` · 评论 8 · 👍 8
   当 CLI 委派给 generalist agent 时可能永久挂起（用户最长等待 1 小时）。社区反馈：明确指示模型不使用子代理即可绕过。高 👍 数说明影响面较大。

4. **[评估 AST 感知的文件读取、搜索与代码库映射的价值](https://github.com/google-gemini/gemini-cli/issues/22745)** · `P2` · 评论 7
   探索使用 AST 感知工具精确读取方法边界、减少 token 噪音、提升导航效率的可能性。这是代码库智能化的长期投资方向，包含多个子 issue。

5. **[Gemini 主动使用 skills 和 sub-agents 的频率不足](https://github.com/google-gemini/gemini-cli/issues/21968)** · `P2` · 评论 7
   用户配置了 gradle、git 等自定义 skill，但模型几乎不会主动调用，只有在明确指示时才使用。反映出模型对自定义工具的主动发现和应用能力需要增强。

6. **[Browser Agent 忽略 settings.json 覆盖配置（如 maxTurns）](https://github.com/google-gemini/gemini-cli/issues/22267)** · `P2` · 评论 4
   尽管 AgentRegistry 正确读取并合并了设置，但 Browser Agent 完全忽略全局或项目级 `settings.json` 中的配置覆盖，导致用户无法调整浏览器代理行为。

7. **[增强 browser_agent 韧性：自动会话接管与锁恢复](https://github.com/google-gemini/gemini-cli/issues/22232)** · `P3` · 评论 4
   当浏览器 profile 被锁（如 persistent 模式下残留进程），`BrowserManager` 的 fail-fast 策略过于僵硬。社区期望自动接管会话或恢复锁。

8. **[browser subagent 在 Wayland 下失败](https://github.com/google-gemini/gemini-cli/issues/21983)** · `P1` · 评论 4
   Wayland 环境下浏览器子代理失败，影响 Linux 用户群体的核心功能可用性。

9. **[~/.gemini/agents/ 下的符号链接不被识别为 agent](https://github.com/google-gemini/gemini-cli/issues/20079)** · `P2` · 评论 4
   用户习惯用 symlink 管理 agent 配置，但 CLI 不会将 symlink 识别为合法 agent 文件，影响配置管理的灵活性。

10. **[扩展下载不处理流错误](https://github.com/google-gemini/gemini-cli/issues/28645)** · `P2` · 评论 3
    GitHub-release 扩展下载器仅监听 `finish` 事件，不处理 HTTP 响应流或目标文件流的错误，失败时可能产生半写入文件且无提示。

## 重要 PR 进展（10 个）

1. **[fix(core): 让 /ide enable 在 IDE 服务器重启后支持重连](https://github.com/google-gemini/gemini-cli/pull/29744)** · `area/core` · size/l
   修复 VS Code Reload Window 或扩展更新后，CLI 无法通过 `/ide enable` 重新连接 IDE companion 的问题。

2. **[fix(core): 确保 YOLO 和 AUTO_EDIT 模式降级重定向 shell 命令](https://github.com/google-gemini/gemini-cli/pull/29648)** · `P1` · `area/security` · size/l
   修复 PolicyEngine 中带重定向（`>`、`<`、`2>&1`、heredoc 等）的 shell 命令在 YOLO/AUTO_EDIT 模式下绕过 ASK_USER 降级的问题。涉及 [#29310](https://github.com/google-gemini/gemini-cli/issues/29310)。

3. **[fix(ui): 实现同步输出并隔离 spinner 渲染](https://github.com/google-gemini/gemini-cli/pull/29725)** · `P2` · `area/core` · size/xl
   通过终端同步输出包装器和 spinner 状态隔离，消除 tmux 等终端复用器中的屏幕闪烁问题。

4. **[fix(core): 将月度支出上限视为终止性配额错误](https://github.com/google-gemini/gemini-cli/pull/29553)** · `P2` · size/m
   项目月度支出上限触发的 429 错误原本被归类为可重试，导致 TUI 不断重试。现在作为终止性错误直接展示 API 返回信息。

5. **[fix(core): 截断时保留行终止符](https://github.com/google-gemini/gemini-cli/pull/29563)** · size/s
   `truncateString()` 不再静默删除行终止符，而是将其计入 maxLength。修复 [#29562](https://github.com/google-gemini/gemini-cli/issues/29562)。

6. **[fix(core): 统一 CRLF 后再计算 diff 上下文片段](https://github.com/google-gemini/gemini-cli/pull/29559)** · size/s
   修复 CRLF 文件与 LF 编辑内容对比时每行都显示为变更、导致 diff 上下文返回整个文件的问题。修复 [#29130](https://github.com/google-gemini/gemini-cli/issues/29130)。

7. **[fix(core): 上报 ripgrep 执行失败](https://github.com/google-gemini/gemini-cli/pull/29552)** · size/s
   捕获的 ripgrep 失败现在返回 `GREP_EXECUTION_ERROR` 元数据，使调度器正确记录失败的 tool call，并补充了对应测试。

8. **[fix(cli): 设置迁移时保留环境变量占位符](https://github.com/google-gemini/gemini-cli/pull/29564)** · size/l
   设置迁移使用展开后的运行时设置，导致 `${VAR}` 占位符被替换为实际值。此 PR 保留原始环境变量占位符。修复 [#29556](https://github.com/google-gemini/gemini-cli/issues/29556)。

9. **[fix(extensions): 仅剥离末尾的 .git 后缀](https://github.com/google-gemini/gemini-cli/pull/29652)** · size/xs
   `tryParseGithubUrl` 使用 `replace('.git', '')` 会误伤名称中含 `.git` 的仓库（如 `blog.github.io` 被解析为 `hub.io`），改为仅移除末尾 `.git` 后缀。

10. **[fix(cli): 处理 sandbox 镜像名解析中的 registry 端口](https://github.com/google-gemini/gemini-cli/pull/29573)** · size/s
    `parseImageName()` 按冒号分割镜像引用，带端口的 registry 会导致端口被当作 tag、真实 tag 丢失且 `/` 残留传入容器运行时。修复后正确解析含端口的 registry 地址。

## 功能需求趋势

- **子代理协作与可靠性**：围绕子代理的 issue 数量最多，集中在状态误报（#22323）、挂起（#21409）、并行协作与共享内存（#18287）、轨迹可视化（#22598）等方面。社区对子代理的稳定性和可观测性有强烈诉求。
- **AST 感知代码库工具链**：#22745、#22746、#22747 三个 issue 形成 EPIC，系统探索 AST 感知的代码读取、搜索和映射对 agent 质量和效率的提升，属于中长期技术方向。
- **模型工具调用主动性与自适应**：#21968（不主动使用 skills）、#24246（>128 个工具时 400 错误）、#21432（agent 自感知 CLI flags/hotkeys）反映出社区期望模型更智能地筛选和使用可用工具。
- **终端体验与渲染优化**：多个 PR 针对终端闪烁（#29725）、边框渲染错位（#29742）、resize 性能（#21924）等问题，表明 CLI 的终端 UI 体验仍是重点改进方向。
- **安全与沙箱**：YOLO/AUTO_EDIT 模式降级（#29648）、零依赖沙箱探索（#19873）、破坏性命令抑制（#22672）显示安全策略持续是社区关注的高优先级方向。

## 开发者关注点

- **子代理状态不可信**：MAX_TURNS 被误报为 GOAL success（#22323）、代理挂起无超时机制（#21409）、bug report 不含子代理上下文（#21763）——社区对子代理执行状态的真实性和可诊断性存在信任危机。
- **配置覆盖不生效**：settings.json 的 maxTurns 等配置被 Browser Agent 忽略（#22267），符号链接 agent 不被识别（#20079），环境变量占位符在迁移中被展开（#29564）——配置一致性问题频发。
- **模型行为控制力不足**：模型不主动使用用户自定义的 skills/sub-agents（#21968），在交互式提示（如 vite 创建向导）中卡住（#22465），以及偶尔使用 `git reset`/`--force` 等破坏性命令（#22672）。
- **终端与交互稳定性**：get-shit-done 输出钩子在打印摘要时崩溃（#22186）、tmux 下屏幕闪烁（#29725）、resize 时性能差（#21924）、Wayland 下浏览器代理失败（#21983）——多平台终端体验问题集中。
- **文件处理边界情况**：CRLF 导致 diff 上下文失真（#29559）、行终止符被截断吞掉（#29563）、纯空白 UTF-16/32 文件未被视为空文件——跨平台文件编码处理仍存在细节缺陷。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-10-14

## 今日速览

今日发布 v1.0.98-1，新增 Gemini 4 Argon 支持，并修复了 MCP 状态同步、会话恢复等关键问题。社区讨论高度集中在 BYOK 自定义模型配置与会话管理体验上；过去 24 小时无 Pull Request 更新。

## 版本发布

**v1.0.98-1**（最新）
- **新增**：支持 Gemini 4 Argon。
- **修复**：
  - 分屏视图切换后，MCP 状态与 `/mcp` 命令保持与会话同步。
  - 恢复会话时忽略已被放弃的待处理权限请求，只继续活动权限请求。
  - 保留用户输入的普通字符。

**v1.0.98-0**
- 包含常规修复与调整。

**v1.0.97 / v1.0.97-3**（2026-10-13）
- 为自定义 agent 增加 agent-scoped 声明式 hooks。
- 远程插件市场在 HTTPS 认证失败后，会使用已登录 GitHub token 重试一次。
- 修复 TLS 拦截代理下流式响应缺少 `close_notify` 时无法完成的问题。
- 修复 GitHub SCP 远程仓库的解析（如绝对路径导致 owner 前导斜杠）。

---

## 社区热点 Issues

以下为过去 24 小时更新最值得关注的 10 个 Issue。

### 1. [ACP] `/rename` 报告成功但会话未重命名
**#5115** | 作者 @miriver | 评论 5 | [链接](https://github.com/github/copilot-cli/issues/5115)

在 ACP 模式（`copilot --acp --stdio`）下，发送 `/rename <name>` 会立即 `end_turn`，返回成功但实际上不修改会话名称。开发者认为这违反了 ACP 协议应有的行为，影响自动化流程的可靠性。

### 2. BYOK 自定义 provider 被强制 `temperature=0`，导致推理模型退化或挂起
**#4950** | 作者 @bmazzarol-bunnings | 评论 3 | [链接](https://github.com/github/copilot-cli/issues/4950)

自 1.0.81 起，CLI 对所有 OpenAI 兼容 provider 固定发送 `temperature: 0`、`top_p: 0.95` 等采样参数。对于小型 thinking 模型（如 vLLM 托管的 qwen-27b），这会引发模型输出质量退化，甚至在上下文溢出时静默挂起。上游 1.0.80 不发送采样参数反而正常。

### 3. 跨应用会话同步：CLI 与桌面端无法共享会话
**#4082** | 作者 @omkarnikam24 | 评论 3 | 👍 13 | [链接](https://github.com/github/copilot-cli/issues/4082)

macOS 用户同时使用 Copilot CLI 和桌面应用，两边会话互相不可见。该功能请求获得较多社区认可，希望至少支持导入/导出，理想情况是实时同步。

### 4. 在终端中展示 agent 当前 TODO 状态
**#1724** | 作者 @PabloZaiden | 评论 2 | 👍 12 | [链接](https://github.com/github/copilot-cli/issues/1724)

Agent 内部维护 TODO 列表但从不提供给用户。社区建议像 opencode 一样，在侧边栏显示当前任务清单，让用户随时了解 agent 计划与进展。

### 5. BYOK：`/models` 选择器应从 provider 的 `/models` 端点拉取模型
**#4358** | 作者 @0xtechdean | 评论 2 | 👍 9 | [链接](https://github.com/github/copilot-cli/issues/4358)

当使用 `COPILOT_PROVIDER_BASE_URL` 连接自定义 provider 时，只能通过环境变量配置一个模型，会话内 `/models` 也只显示该模型。开发者希望直接读取 provider 的模型列表，在会话中自由切换，无需重启 CLI。

### 6. 云 agent 的内置 Playwright MCP 会话在首次调用时已关闭
**#4931** | 作者 @CynthiaLuijkx | 评论 2 | [链接](https://github.com/github/copilot-cli/issues/4931)

在 GHEC 数据驻留租户的 cloud agent 会话中，每次调用 Playwright MCP 工具都会遇到“session already closed”错误，且恢复流程误报为浏览器 OAuth 必填。目前没有绕过办法。

### 7. SDK + BYOK：短模型名无法匹配 provider 模型
**#5127** | 作者 @SivaKesava1 | 评论 1 | [链接](https://github.com/github/copilot-cli/issues/5127)

SDK 配置 BYOK `providers` 和 `models` 后，模型只以 provider 限定 ID（如 `copilot/gpt-5.4-mini`）存在。使用 `gpt-5.4-mini` 这种短名称会匹配失败，甚至出现误导性的“No GitHub OAuth token”错误。

### 8. BYOK：内置 agent（explore/task/research）不使用默认模型，静默运行在会话模型上
**#5126** | 作者 @SivaKesava1 | 评论 1 | [链接](https://github.com/github/copilot-cli/issues/5126)

内置 agent 定义中声明了各自的默认模型，但在 BYOK 模式下这些默认模型被忽略，所有 agent 静默使用会话级模型。这会导致不同 agent 的推理行为不符合预期，且无任何提示。

### 9. `--agent <name>` 选择在启动约 1 秒后被静默取消
**#5124** | 作者 @wzhmvz | 评论 0 | [链接](https://github.com/github/copilot-cli/issues/5124)

使用 `--agent` 指定自定义 agent 时，banner 显示选中成功，但随后 MCP 重载或登录流程会把 agent 状态重置，用户输入前选择已丢失。这严重破坏自定义 agent 工作流。

### 10. 终端安全拒绝导致会话恢复变成死胡同
**#5123** | 作者 @immuzz | 评论 0 | [链接](https://github.com/github/copilot-cli/issues/5123)

Windows 重启后尝试让 Copilot 恢复命名终端标签页中的会话，结果因终端安全权限拒绝而陷入“拒绝-手工指导”的循环，无法完成基本恢复任务，用户抱怨摩擦过大。

---

## 重要 PR 进展

过去 24 小时该仓库没有新增或更新的 Pull Request（共 0 条）。社区工作主要反映在 Release 修复与 Issue 讨论中。

---

## 功能需求趋势

从近期 Issues 中可以提炼出以下社区最关注的方向：

- **BYOK / 自定义模型支持增强**：模型选择器动态读取 provider `/models`、短名称匹配、内置 agent 默认模型、凭据命令支持。这是当前最集中的需求域。
- **会话管理改进**：跨应用（CLI / Desktop）同步、会话重命名入口、会话名称展示、恢复流程的稳定性。
- **Agent 可观测性**：在终端内展示当前 TODO 状态，让用户看到 agent 的规划与执行进度。
- **MCP 与插件稳定性**：MCP 状态与会话同步、初始化 OAuth 重复弹窗、远程插件市场重试机制等。
- **终端交互体验**：用户输入时不打断、响应耗时展示、可配置 thoughts 默认展开。
- **企业部署与安全管控**：系统级 Windows 安装器、细粒度文件写入权限、管理策略报错降噪。

---

## 开发者关注点

- **BYOK 配置复杂且行为不一致**：强制采样参数、模型匹配问题、默认模型被忽略，让自建 provider 用户在使用时缺乏可控性和可见性。
- **会话操作摩擦明显**：`/rename` 无效、多会话切换后需要多次 `/exit`、恢复会话遇到权限死循环，都被开发者直接点名“unacceptable friction”。
- **MCP 生态稳定性仍是短板**：从本地 MCP 状态同步到云 agent 的内置 Playwright 会话关闭问题，说明 MCP 在大规模/长时间会话下还不可

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-14

## 今日速览

今日无新版本发布，社区焦点集中在三个方向：**自定义 Provider 模型注入回归**（#25630）、**上下文溢出后恢复机制失效**（#46564/#54690，已有对应修复 PR #55286）、以及**桌面端存储膨胀问题**（#55282，DB 达 840 MB）。此外，多个 PR 在修复 CI、改进插件权限模型和 TUI 稳定性，V2 迁移后的会话可见性问题也持续引发讨论。

## 社区热点 Issues

本期从 50 条活跃 Issue 中精选 10 条，按关注度排序：

### 1. 回归：插件 provider.models() 钩子无法为自定义 Provider 填充模型
- **#25630** | 💬 16 | 👍 7
- 自 PR #25167 合并后，插件通过 `provider.models()` 为 `opencode.jsonc` 中用户自定义的 Provider 注册模型的逻辑失效。该问题是当前社区讨论最激烈的回归，直接影响依赖自定义模型目录的插件生态。
- https://github.com/anomalyco/opencode/issues/25630

### 2. 镜像/文件负载不计入上下文，长会话以通用 400 错误终止
- **#54690** | 💬 5
- 长会话（318 条消息、7 张 base64 截图）在 OpenAI 兼容代理上触发 `invalid_request_error`，但自动压缩未介入。核心矛盾：媒体字节数远超 token 数，但负载计算未覆盖，导致会话直接死局。
- https://github.com/anomalyco/opencode/issues/54690

### 3. [V2 Desktop] Windows 上缩放级别在每次重启后重置
- **#54990** | 💬 4
- Desktop 2.0.27（Windows 10）中通过 `Ctrl +` 设置的缩放级别在重启后丢失。属于高频桌面体验问题，影响用户日常操作效率。
- https://github.com/anomalyco/opencode/issues/54990

### 4. [SECURITY] `opencode upgrade` 使用 curl\|bash 且无完整性校验
- **#42434** | 💬 4
- 安装脚本存在供应链风险（TOCTOU 攻击面）：远程脚本直接通过管道交给 bash 执行，无签名或哈希验证，中危安全缺陷。
- https://github.com/anomalyco/opencode/issues/42434

### 5. [v2] Provider 返回模糊 400 错误时，一次性溢出恢复不生效
- **#46564** | 💬 3
- 当自定义 provider 返回不带详细信息的 400（如仅 "invalid request"），系统无法识别为上下文溢出，导致会话没有恢复路径。与 #54690 同源，修复 PR 已提交。
- https://github.com/anomalyco/opencode/issues/46564

### 6. Zen 路由：glm-5.2 间歇性路由到冷缓存 Provider
- **#35402** | 💬 3 | 👍 9
- 多源模型通过 Zen 网关服务时无黏性路由，字节相同的连续请求可能落在冷缓存上游，导致全量重新计费和慢速 prefill。赞数高说明性能敏感用户受影响面较大。
- https://github.com/anomalyco/opencode/issues/35402

### 7. 存储膨胀：opencode.db 达 687 MB，drafts.sqlite 99.5% 为空闲页
- **#55282** | 💬 2
- Desktop 2.0.28 本地 SQLite 合计 840 MB。单个 session.revert 单元格占用 77.9%，drafts 数据库几乎全空。该问题已被复现，存储管理需优先优化。
- https://github.com/anomalyco/opencode/issues/55282

### 8. permission.ask 插件钩子从未被触发
- **#47674** | 💬 2 | 👍 1
- 官方插件 API 声明了 `permission.ask` 钩子，但代码中无任何调用点。插件开发者无法拦截或自定义权限请求流程，属于 API 契约与实现不一致。
- https://github.com/anomalyco/opencode/issues/47674

### 9. migrate-v1：升级后会话不可见（遗留于 'global' 项目）
- **#55253** | 💬 3
- 从 V1（1.18.35）升级到 V2（2.0.28）后，所有历史会话在列表中消失。迁移逻辑将会话挂在占位 `global` 项目下，而 V2 按目录新建项目，导致数据可见性断裂。
- https://github.com/anomalyco/opencode/issues/55253

### 10. 文档缺失：`opencode mcp add github` 的 Bearer 认证示例
- **#55285** | 💬 2
- 社区请求在文档中补充 `--header "Authorization=Bearer {env:GITHUB_TOKEN}"` 这类 MCP 服务器配置示例（与早前 #42484 重复提出）。配置可用性需求持续存在但未被满足。
- https://github.com/anomalyco/opencode/issues/55285

## 重要 PR 进展

### 1. 修复：上下文溢出通过纯文本压缩恢复未分类的过量拒绝
- **#55286** (OPEN)
- 针对 #46564/#54690：当代理返回模糊 400 时，触发纯文本压缩以减小负载，绕过媒体字节计数陷阱，让会话可恢复。
- https://github.com/anomalyco/opencode/pull/55286

### 2. 修复：drafts 存储 IndexedDB 连接在 InvalidStateError 时重开
- **#55277** (OPEN)
- 解决浏览器 draft store 中 IDBDatabase 连接因文档销毁/存储驱逐而失效后不重连的竞态问题。
- https://github.com/anomalyco/opencode/pull/55277

### 3. 修复：托管配置优先级调整为最高
- **#55267** (CLOSED)
- V2 中 `/etc/opencode`、`%ProgramData%` 等管理配置此前优先级为最低，与 V1 行为相反。此 PR 修正为最高优先级，涉及企业级 MDM 场景。
- https://github.com/anomalyco/opencode/pull/55267

### 4. 修复：跨 Location 协调凭据刷新
- **#54023** (OPEN)
- 新增全局凭据锁，使多个 Location 只触发一次刷新并共享结果，避免竞争条件和过期读取。
- https://github.com/anomalyco/opencode/pull/54023

### 5. 功能：TUI 多语言（i18n）基础设施
- **#52000** (OPEN)
- 为 TUI 引入 per-locale 文案系统，是社区期待已久的国际化第一步，已完成 UI 字符串接线。
- https://github.com/anomalyco/opencode/pull/52000

### 6. 修复：监听既有 .agents 与 .claude 根目录下的 skills/
- **#55280** (OPEN)
- 修复启动后出现 `<root>` 时技能加载不稳定的测试问题，确保文件监听覆盖已有目录。
- https://github.com/anomalyco/opencode/pull/55280

### 7. 修复(CI)：为仓库 agents 安装 V2 CLI
- **#55278** (OPEN)
- V2 提升后，`triage` 机器人因未知错误持续失败（如 `gpt-5.4-mini` 兼容问题）。此 PR 修复 CI 环境以恢复自动分类。
- https://github.com/anomalyco/opencode/pull/55278

### 8. 功能：桌面版支持通过 ./gui 导出 GUI 插件
- **#55246** (OPEN)
- 插件可以附带 GUI 组件，桌面应用内置功能均改为插件，`Settings > Plugins` 统一管理。可扩展性显著提升。
- https://github.com/anomalyco/opencode/pull/55246

### 9. 功能：新增 SerpApi 网页搜索 Provider
- **#55274** (OPEN)
- V2 内置 SerpApi 作为搜索提供方，复用现有 web-search 服务，相关 issue #52480。
- https://github.com/anomalyco/opencode/pull/55274

### 10. 修复：插件可进行权限断言（assert permissions）
- **#54930** (CLOSED)
- 插件原先无法在进程内主动请求权限，HTTP 路由也不等待回复。此 PR 新增完整的权限断言 API。
- https://github.com/anomalyco/opencode/pull/54930

## 功能需求趋势

从近期 Issues 中可提炼出以下社区高频关注方向：

1. **自定义 Provider / 模型生态**（#25630, #55274, #46564）：插件注册模型、新 Provider 接入、异常错误分类是核心诉求，生态开放性排名第一。
2. **上下文窗口管理与恢复**（#54690, #46564, #54993）：媒体负载计数、模糊 400 识别、压缩死循环，反映长会话稳定性已成为 V2 关键短板。
3. **桌面端体验与迁移**（#54990, #55253, #55282）：跨版本升级不丢数据、缩放偏好持久化、DB 空间膨胀，桌面版用户基数增长带来新反馈。
4. **安全与供应链**（#42434, #42437）：远程脚本完整性校验、上下文压缩不静默丢弃指令约束，安全类 Issue 开始被严肃讨论。
5. **文档可用性**（#55285, #42484, #40589）：MCP 参数示例、私有仓库认证、GITHUB_TOKEN 支持；同一请求反复提出，说明官方文档与真实使用场景脱节。
6. **GUI 插件与扩展机制**（#55246, #47674）：插件 API 契约不完整（permission.ask 未实现）、GUI 组件分发，正成为平台化演进的焦点。

## 开发者关注点

- **存储膨胀已迫在眉睫**：840 MB 的本地库在正常使用数周后产生，`session.revert` 和 drafts 表空闲页是主要元凶，官方尚未给出清理策略。
- **升级即“丢数据”的心理阴影**：V1 → V2 的迁移在会话可见性上存在明显倒退，虽然 DB 数据还在，但用户界面层面“消失”造成信任成本。
- **模糊 400 错误是最难排查的故障**：OpenAI 兼容代理返回无描述 400 时，系统不触发任何恢复机制，用户只能手动清会话重试。PR #55286 是积极信号，但尚需合规审核。
- **WSL/远程环境的兼容性**：镜像网络模式导致 sidecar 启动失败（#37718）、远程 service start 错误分类不准（#55199），V2 对异构环境的适配仍有缺口。
- **插件能力边界仍不清晰**：`permission.ask` 被声明但从未触发（#47674），说明插件系统“文档先行、实现滞后”的状态，插件作者需谨慎依赖未经验证的 API。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-14

## 今日速览

今日社区聚焦于 **Managed Agent 稳定性和长上下文/上下文管理**两大主题：多个 P1 级 Bug 围绕 Hosted Harness 崩溃恢复与 MCP 工具发现，同时 vLLM/SGLang 后端上下文溢出错误识别问题持续发酵。版本侧发布了一个 preview 和一个 nightly 版本，均以 managed-agent 的健壮性修复为主。社区贡献活跃，UI/Web Shell 与 CLI 体验类 PR 数量明显上升。


## 版本发布

### v0.25.2-preview.0
- **修复** `managed-agent` 的 connector 与 broker 健壮性问题（源自 #12692 的 R2 review），由 @wenshao 提交
- 发布链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.25.2-preview.0

### v0.25.1-nightly.20261013.6212189f1f
- 包含与 preview 版本相同的 managed-agent 修复
- 发布链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.25.1-nightly.20261013.6212189f1f


## 社区热点 Issues（Top 10）

### 1. ACP 模式下 MCP 工具从未被宣告 [#14114](https://github.com/QwenLM/qwen-code/issues/14114)
- **优先级** P1 | **状态** OPEN | **评论** 4 | **创建** 2026-10-13
- **摘要**：在 `qwen --acp` 模式下，通过 `session/new` 传入的 MCP server 已注册但工具从未被宣告给模型，模型完全无法发现或使用这些工具；相同配置在 headless 模式下正常工作。
- **关注理由**：P1 级别，直接影响 ACP 模式下的 MCP 生态可用性。

### 2. Managed Agent 唤醒输入在 Harness 死亡后无法执行 [#14116](https://github.com/QwenLM/qwen-code/issues/14116)
- **优先级** P1 | **状态** OPEN | **评论** 3 | **创建** 2026-10-13
- **摘要**：Session 的 wake inputs（监控通知、频道消息、自动化触发等）仅在 Hosted Harness 加载时才运行。如果输入在 Harness 崩溃前提交且未被加载，则要等到无关操作加载该 Session 时才会执行。
- **关注理由**：P1 + daemon 相关，直接影响托管模式的可靠性。

### 3. vLLM 后端请求全部 400 — 参数化工具序列化问题 [#14112](https://github.com/QwenLM/qwen-code/issues/14112)
- **优先级** P2 | **状态** OPEN | **评论** 3 | **创建** 2026-10-13
- **摘要**：使用 vLLM 兼容后端时，无参数工具未序列化 `parameters` 字段，加上 `tool_choice:"required"` 不被支持，导致**每个** API 请求都失败。
- **关注理由**：OpenAI 兼容层的兼容性缺陷，影响面广。

### 4. XML 恢复在大型多调用响应上重复前缀扫描 [#13787](https://github.com/QwenLM/qwen-code/issues/13787)
- **优先级** P3 | **状态** OPEN | **评论** 6 | **创建** 2026-10-09
- **摘要**：当响应包含大量有效 tool calls 时，XML 恢复变得非常慢。作者给出了可复现的基准数据对比当前 main 与 PR #13579 的表现。
- **关注理由**：6 条评论，是今日讨论热度较高的问题，直接影响长会话下的工具调用性能。

### 5. Bodyless provider 400 错误不可诊断 [#14115](https://github.com/QwenLM/qwen-code/issues/14115)
- **优先级** P2 | **状态** OPEN | **评论** 4 | **创建** 2026-10-13
- **摘要**：OpenAI 兼容后端返回无 body 的 400 时，CLI 只显示 `[API Error: 400 status code (no body)]`，结构化 `OPENAI_ERROR` 日志中也缺少 `errorResponse`、`headers`、`x-request-id` 等关键信息。
- **关注理由**：可诊断性痛点，vLLM 风格后端的 400 错误排查困难。

### 6. Hosted send_message 大小超限导致整个 Turn 失败 **[#14062](https://github.com/QwenLM/qwen-code/issues/14062)**
- **优先级** P2 | **状态** OPEN | **评论** 4 | **创建** 2026-10-13
- **摘要**：Hosted `send_message` 通过所有本地大小检查后仍可能使发送者的整个 Turn 失败——`encodeToolInput` 溢出被抛出而不是被拒绝，模型无法收到可操作的拒绝信息。
- **关注理由**：边界条件下的错误处理缺陷，影响多代理会话的稳定性。

### 7. SGLang 上下文溢出错误漏检或丢失 token 计数 [#14097](https://github.com/QwenLM/qwen-code/issues/14097)
- **优先级** P2 | **状态** OPEN | **评论** 3 | **创建** 2026-10-13
- **摘要**：SGLang 的两种溢出报告方式（`40000 tokens` 超限消息、分段响应）都未被 `getContextLengthExceededInfo` 正确识别，会话超限后可能卡死。
- **关注理由**：长上下文场景下的关键路径问题。

### 8. vLLM 上下文溢出错误未被识别，主动压缩从不触发 [#14096](https://github.com/QwenLM/qwen-code/issues/14096)
- **优先级** P2 | **状态** OPEN | **评论** 3 | **创建** 2026-10-13
- **摘要**：vLLM 拒绝超长请求时返回 400，但由于 `getContextLengthExceededInfo` 不认识 vLLM 的错误措辞，`llm-chat` 永远不会执行 reactive compaction。
- **关注理由**：与 #14097 同属上下文溢出处理短板，长会话用户受影响。

### 9. 静态模式下单词换行产生 1-2 字符孤儿行 [#14075](https://github.com/QwenLM/qwen-code/issues/14075)
- **优先级** P3 | **状态** OPEN | **评论** 4 | **创建** 2026-10-13
- **摘要**：禁用 Virtualized History 的静态渲染路径下，达到终端全宽的换行会从单词中间断开，产生 1-2 字符的孤儿行。
- **关注理由**：终端 UI 细节问题，社区反馈积极（4 条评论），且已有 Windows 用户报告。

### 10. Java 主分支 CI 失败 — retractionRenamesTheDeltaThatContinuedTheRetractedOne [#14126](https://github.com/QwenLM/qwen-code/issues/14126)
- **状态** OPEN | **评论** 3 | **创建** 2026-10-14 | **autofix/skip**
- **摘要**：`SDK Java` 主分支 CI 在 `Hosted process fault gates / MySQL 8.4 / Java 21` 任务中失败，涉及 ManagedAgentServerIntegrationTest 的一个测试方法。
- **关注理由**：CI 稳定性是社区健康度的重要指标，今日新出现的失败。


## 重要 PR 进展（Top 10）

### 1. [feat(mods)] 支持选定的 Claude 工具输入契约 (PR3b) [#14027](https://github.com/QwenLM/qwen-code/pull/14027)
- **状态** OPEN | **更新** 2026-10-14
- **内容**：为 Mods 添加 `toolDialect: "claude"` 设置，`tool.call` 和 `tool.check` 暴露 Claude 输入契约，工具调用后返回 Qwen 命名和参数。原生/Claude 插件可共存。
- **意义**：增强了跨生态的工具兼容性。

### 2. [feat(core)] 自动压缩前将工具结果收缩至剩余余量 [#13599](https://github.com/QwenLM/qwen-code/pull/13599)
- **状态** OPEN | **更新** 2026-10-14
- **内容**：当会话接近自动压缩阈值时，将下个请求的工具结果收缩到剩余 headroom，仅使用同 chat 最近一次成功 usage 报告。
- **意义**：上下文性能优化，配合 #12333 的 A/B 评估方向。

### 3. [fix(managed-agent)] 为重试循环绑定终止状态 [#13219](https://github.com/QwenLM/qwen-code/pull/13219)
- **状态** OPEN | **更新** 2026-10-14 | **autofix/takeover**
- **内容**：为 managed-agent 栈中的异步重试循环添加预算和终止状态；消息投影可跳过永久性序列间隙而非抛错。
- **意义**：解决托管代理无限重试/卡死问题。

### 4. [feat(web-shell)] 显示实时轨迹执行 [#14071](https://github.com/QwenLM/qwen-code/pull/14071)
- **状态** OPEN | **更新** 2026-10-14
- **内容**：在可选的 trajectory 面板中增加可折叠的 "Recent executions" 区域，按 execution identity 更新请求和工具展示，区分实时与已完成状态。
- **意义**：提升 Web Shell 的可观测性。

### 5. [test(managed-agent)] 对真实 RocketMQ broker 运行 EventTransport 故障行 [#14109](https://github.com/QwenLM/qwen-code/pull/14109)
- **状态** OPEN | **更新** 2026-10-14
- **内容**：新增 `scripts/rocketmq-lite-broker.sh`，在真实 RocketMQ 5.5.1 LiteTopic 集群上运行传输故障测试。
- **意义**：MQ2d 路线图的一部分，提升集成测试覆盖率。

### 6. [fix(cli)] 崩溃后恢复 Hosted journal-only 工具批次 [#14056](https://github.com/QwenLM/qwen-code/pull/14056)
- **状态** OPEN | **更新** 2026-10-14 | **autofix/takeover**
- **内容**：在 Hosted 工具批次首次控制面写入前增加持久化 journal-only 等待，使接管的 Harness 能继续中断的轮次或取消。
- **意义**：解决崩溃恢复场景中的工具批次一致性问题。

### 7. [fix(managed-agent)] 关闭 #12692 的关键 R2 审查发现 [#13325](https://github.com/QwenLM/qwen-code/pull/13325)
- **状态** OPEN | **更新** 2026-10-14 | **autofix/takeover**
- **内容**：修复 #12692 的 8 个 Critical 审查发现，包括 InnoDB 锁序反转、session-list keyset 分页问题等。
- **意义**：持续清理托管代理核心路径的稳定性隐患。

### 8. [fix(managed-agent)] 工具轮次进入 recovery blocked 时归还 Workspace 挂载 [#13816](https://github.com/QwenLM/qwen-code/pull/13816)
- **状态** OPEN | **更新** 2026-10-14 | **autofix/takeover**
- **内容**：新增 broker 内部 mount-release 端点，仅释放 Workspace 执行挂载而不影响其他资源，确保工具恢复阻塞时可归还挂载。
- **意义**：解决资源泄漏问题。

### 9. [feat(core)] 跳过重复注入未变化的 UserPromptSubmit hook 上下文块 [#14129](https://github.com/QwenLM/qwen-code/pull/14129)
- **状态** OPEN | **更新** 2026-10-14 | **autofix/takeover**
- **内容**：当 hook 返回的 `additionalContext` 与同一会话中先前注入的内容逐字节相同时，跳过重复注入。
- **意义**：减少 token 浪费，对应 #14089 的需求。

### 10. [fix(ci)] 提升 Hosted MySQL fork 与步骤预算 [#14128](https://github.com/QwenLM/qwen-code/pull/14128)
- **状态** CLOSED | **更新** 2026-10-14
- **内容**：将 SDK Java 工作流的 `hosted-harness-mysql` fork 超时从 1200s 提升至 1800s，验证步骤上限从 35 提升到 45。
- **意义**：回应 #14126 等 CI 失败问题。


## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区重点关注方向：

1. **Managed Agent / 多代理稳定性（最热）**：大量 issue 集中在 Hosted 模式下的崩溃恢复、并发接管（#14070、#14047、#14116）、session 重挂载（#13838）、重试循环终止（#13219）等方面。Qwen Code 正在快速迭代托管多代理架构。

2. **长上下文与上下文管理**：围绕 token 管理涌现明显需求——如 tool-loading A/B 评测（#12333）、超限前收缩工具结果（#13599）、SGLang/vLLM 溢出识别（#14096/#14097）。社区对长会话的稳定性与自动压缩机制有较高期望。

3. **MCP 生态完善**：MCP 相关 issue 持续活跃，包括 ACP 模式下工具宣告缺陷（#14114）、取消 MCP stdio 调用杀死 server（#11272）、MCP Web Search 文档补充（#13092）等。MCP 的可靠性与文档完整性是社区痛点。

4. **Web Shell / 桌面端 UI 改进**：多个 UI 相关 PR 和 issue 密集出现——Web Shell 的上下文详情展示优化（#14051/#14086）、桌面端文件拖拽修复（#14049）、Logo 更新（#14038）、轨迹面板展示（#14071）等。前端体验优化进入活跃期。

5. **CLI 可诊断性**：错误信息不够透明的问题被多次提起（#14115 bodyless 400、#14063 timeout 提示误导），开发者期望 CLI 提供更明确的错误上下文。

6. **OpenAI 兼容层 / vLLM 适配**：vLLM 后端的兼容性问题（#14112）说明社区有相当一部分用户使用非 OpenAI 官方后端，Qwen Code 对 `tool_choice` 和工具序列化的处理需要更宽容。


## 开发者关注点

1. **vLLM/SGLang 兼容性诉求明确**：已有多个 issue 指向后端溢出错误不被识别、无参数工具缺少 `parameters` 字段导致 400。这不是个例而是模式性问题，建议开发者关注 `getContextLengthExceededInfo` 和后端适配的更新进度。

2. **可诊断性是高频痛点**：多个 issue 抱怨错误信息不足——"no body" 400 不显示请求头、`session_command` 超时提示让成员消息发送者"去看板"（#14063）、Hosted send_message 溢出没有可操作的拒绝反馈。开发者对 CLI 的 error message 质量有明确提升诉求。

3. **Hosted Harness 崩溃场景持续被关注**：从 #14116 的 wake input 不执行到 #14047 的 child-result 唤醒后 lead 不被重新提示，再到 #14070 的并发 409 冲突，社区的注意力高度集中在托管模式的故障恢复完整性上。

4. **Web Shell 与桌面端活跃度上升**：Web Shell 相关 PR/Issue 明显增多，涉及 Logo、拖拽、上下文面板、轨迹展示等多个方面，说明前端体验正在成为社区贡献的焦点方向之一。

5. **CI 稳定性被反复追查**：多个 CI 失败 issue（如 #14126、#14072、#12714）由 bot 创建并被打

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*