# AI CLI 工具社区动态日报 2026-09-11

> 生成时间: 2026-09-11 01:56 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-11）

## 1. 生态全景

当前 AI CLI 工具已从"能跑通 Demo"进入"生产环境可用性"的深水区：社区反馈重心正从功能新颖度转向稳定性（Windows 兼容、内存泄漏、数据库膨胀、认证可靠性）与安全加固（沙箱逃逸、路径穿越、凭据持久化）。各工具版本迭代节奏显著分化——Claude Code、Copilot CLI 以周级发布正式版，OpenAI Codex、Qwen Code 依赖 SDK/预览版高频推进，而 Kimi Code 当日零发布零 PR，活跃度差距明显。与此同时，跨工具的共性需求浮出水面：插件/Hooks 体系的深度可扩展性、更强的 agent 自主性与行为透明度、以及"AI 不是谄媚助手而是平等工程伙伴"的交互风格期待。整体来看，赛道正从"拼模型"向"拼工程化、拼生态、拼信任"转型。

## 2. 各工具活跃度对比

| 工具 | 版本发布 | 热点 Issues | PR 动态 | 社区热度信号 |
|------|---------|------------|---------|-------------|
| **Claude Code** | v2.1.268（正式版） | Top 10 中 5 个详情可见；最高 #42776（173 评论 / 82 👍） | 未披露（官方称 Hooks 数周内发货） | 高；Windows 问题集中爆发，功能呼声强 |
| **OpenAI Codex** | Python SDK 0.154.0 + Rust 多个 alpha | Top 10 中 9 个详情可见；最高 #41290（55 评论 / 43 👍） | 多个安全/沙箱修复已合入 | 高；Windows/WSL 问题高频，配额争议升温 |
| **Gemini CLI** | v0.61.0-nightly（无显著变更） | 10 个 Issue（#4556 以 39 👍居首） | 10 个 PR，安全修复密集（沙箱 git 参数、路径穿越、凭据持久化） | 中高；安全投入最大，功能需求集中 |
| **Copilot CLI** | v1.0.84-4（正式版） | 6+ 个详情可见；#13 vi/vim 模式 76 👍 霸榜 | 未披露 | 中高；OOM 稳定性问题集中，插件管理重构 |
| **OpenCode** | 无 | 10 个 Issue（#13003 token 用量 53 👍、#23153 加密支付 50 👍） | 10 个 PR（TUI 树形引擎、后台子代理、SSE 超时修复） | 中；功能需求活跃，数据库膨胀隐患突出 |
| **Qwen Code** | CLI v0.23.3 + Desktop v0.3.0 双发布 | 2 个详情可见（#8102 确定性执行边界 18 评论） | 多个修复合入（CI/CD、PTY 资源管理） | 中低；版本迭代快但社区讨论量相对温和 |
| **Kimi Code** | 无（最新仍为 v0.42.0） | 1 个 Issue（#2638 设备码登录 HTTP 500） | 0 PR | 低；当日活跃度接近冰点，登录故障阻断新用户 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|------|---------|---------|
| **认证与配额可靠性** | Kimi（登录 500）、Codex（配额异常消耗）、Gemini（OAuth 账号映射错乱）、Claude（gateway 计费对齐） | 登录流程稳定、用量记账准确、账号类型区分清晰，是付费工具信任度的基础 |
| **Windows/WSL 兼容性** | Claude（Plan9 挂载失败、Desktop 文件锁）、Codex（WSL 路径反序列化、MCP 进程泄漏）、Copilot（VS Code 文件锁）、Qwen（MCP 连接不稳定） | Windows 环境从"可用"到"好用"仍有明显差距，跨平台路径处理、进程生命周期是共性痛点 |
| **沙箱与安全加固** | Gemini（git 参数校验、路径穿越、字面量替换）、OpenCode（绝对权限规则、Termux 支持）、Qwen（确定性工具执行边界提案） | 安全边界从"防逃逸"走向"防误操作"：拦截破坏性命令、防止路径穿越、确保 LLM 在信任边界之外 |
| **上下文压缩与会话生命周期** | OpenCode（压缩后失忆且不确认）、Copilot（长会话 OOM）、Gemini（MAX_TURNS 误报成功）、Qwen（扩展更新丢会话历史）、Claude（Desktop 文件锁） | 长会话场景下的内存管理、压缩后任务目标保留、稳定恢复机制，是生产级 CLI 的硬门槛 |
| **插件/Hooks/子代理体系** | Claude（Function Hooks 92 👍）、Copilot（plugin 命令重构）、Gemini（skills/sub-agents 使用不足）、OpenCode（子代理后台化） | 社区不满足于内置能力，期望通过 Hooks、插件市场、可编程子代理构建个性化工作流 |
| **交互体验与模型风格** | Copilot（vi/vim 模式 76 👍）、OpenCode（垂直标签页、token 用量显示）、Gemini（"少一点谄媚" 39 👍）、Codex（Esc-Esc 历史回溯） | 重度用户在意终端编辑体验、信息密度，以及 AI 反馈的直接性和判断力 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 团队协作与企业治理（gateway 计费、access control） | 企业级团队、需集中管控的 org | 托管网关 + 客户端分层，强调治理能力；Hooks 将成生态核心 |
| **OpenAI Codex** | 最新模型能力快速落地（SDK 高频迭代、reasoning 强度档位） | 追求前沿模型能力的开发者 | Python/Rust 双轨 SDK + 高频预发布；与 ChatGPT 深度绑定 |
| **Gemini CLI** | 安全与系统健壮性（沙箱加固、checkpoint 稳定性） | Google 生态开发者、对安全敏感的用户 | 密集安全 PR + 保守迭代；强调可审计的 agent 行为 |
| **Copilot CLI** | GitHub 生态融合与插件可编程性 | VS Code / GitHub 重度用户 | 依附 VS Code 扩展体系；SEA 打包 + 插件市场模式 |
| **OpenCode** | 终端体验与开源可扩展性（TUI 树形分组、后台子代理） | OSS 爱好者、长会话重度用户 | 社区驱动 PR + 快速合入；TUI 交互创新前沿 |
| **Qwen Code** | 多模型支持与多渠道接入（Kimi/Qwen/DeepSeek 预设、钉钉通道） | 国内开发者、多模型切换需求者 | 开源模型路线 + 多通道适配；SDK/桌面双线迭代 |
| **Kimi Code** | 尚在早期（主要精力在登录链路修复） | MoonshotAI 生态开发者 | 待观察；当前活跃度不足难以判断长期方向 |

## 5. 社区热度与成熟度

**第一梯队（高热度，生产环境刚需驱动）**：**Claude Code** 与 **OpenAI Codex**。Claude 的 Windows Plan9 故障（83 评论）与 Desktop 文件锁（173 评论）说明其企业用户基数大、受影响面广；Codex 的 WSL 问题（55 评论）与配额争议（37 评论）紧随其后。两者社区讨论质量高，反馈细致到根因分析（如 libuv 句柄泄漏、AbsPath 反序列化），体现用户群具备较强技术深度。

**第二梯队（中度活跃，安全/体验驱动）**：**Gemini CLI** 与 **Copilot CLI**。Gemini 的 PR 密集度全场最高（10 个安全/健壮性修复），但功能需求侧声量不足（最高仅 39 👍）；Copilot 的 vi/vim 模式以 76 👍 证明忠实用户群存在，但 OOM 崩溃（31,965 个泄漏句柄）正消耗用户信任。

**第三梯队（快速迭代但不温不火）**：**OpenCode** 与 **Qwen Code**。OpenCode 的 feature request 点赞数亮眼（token 用量 53 👍、加密支付 50 👍），但数据库膨胀至 13GB 的稳定性隐患可能成为增长瓶颈；Qwen Code 保持频繁发布但社区讨论量偏温和。

**冰点**：**Kimi Code** 当日仅 1 Issue、0 PR、0 Release，且是阻断性登录故障——需警惕用户流失风险。

## 6. 值得关注的趋势信号

1. **认证与配额治理成为付费工具的生死线**。Kimi 的登录 500、Codex 的配额异常、Gemini 的 Pro 限额错乱、Claude 的 gateway 计费对齐——四家同时处理账号/计费问题，说明商业模式从"免费吸引"转向"付费留存"阶段，记账链路准确性将直接影响续费率。

2. **Windows 体验是尚未攻克的堡垒，也是差异化机会**。Claude 的 Plan9 挂载失败、Codex 的 WSL 路径崩溃、Copilot 的文件锁、Gemini 的沙箱参数校验——几乎所有工具都在 Windows 上"翻车"。率先系统性解决 Windows/WSL 兼容性的工具，将收割一大波企业开发者红利。

3. **沙箱安全从"防外部攻击"转向"防 AI 误操作"**。Gemini 的 git 参数校验、路径穿越封堵、LLM 提示词字面量替换，本质上都在防御 LLM 生成的危险操作。叠加 Qwen 社区提出的"确定性工具执行边界"方案，行业正酝酿从"提示词约束"到"运行时强制约束"的范式转变。

4. **长会话生命周期管理是下一个技术高地**。OpenCode 的 13GB 数据库膨胀、Copilot 的 OOM 崩溃、Gemini 的 MAX_TURNS 误报、Qwen 的会话历史丢失——四家独立面对同类问题，说明 token 上下文无限膨胀与流式状态持久化已成为共识性瓶颈。能优雅解决压缩/持久化/恢复三角难题的工具将获得长期会话场景的青睐。

5. **社区审美正在成熟：用户要"平等的工程师"，不是"积极的附和者"**。Gemini 的 #4556（39 👍）与 Claude 的 Hooks 需求（92 👍）共同指向：开发者希望 AI CLI 具备判断力（敢反驳）、可扩展性（能定制）、透明度（不掩盖失败）。这预示产品宣传与交互设计的重心应从"魔法感"转向"可信赖的同事感"。

6. **可组合性（Composability）成为生态竞争的主战场**。Claude 的 Function Hooks（官方承诺数周内发货）、Copilot 的插件命令重构、Gemini 对 skills/sub-agents 自主使用的讨论、OpenCode 的后台子代理——各工具都在为"用户自定义工作流"铺路。这一轮竞争的胜出者，将有机会成为 AI 开发工具的操作系统层。

---

**对决策者的参考建议**：选择工具时，若重视企业治理与团队协作，Claude Code 的 gateway 路线目前最成熟；若追求最新模型能力，Codex 的 SDK 迭代速度领先；若安全合规要求极高，Gemini 的安全投入值得关注。但所有工具在 Windows 兼容性与长会话稳定性上均未完全过关，建议在关键路径上保留人工审查环节，并密切关注各工具的修复节奏。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截至 2026-09-11）

> 说明：原始数据未提供具体评论数字，以下排序沿用题目中的“评论/关注度”顺序。所有列出 PR 当前均为 Open。

## 1. 热门 Skills 排行

### #1298 fix(skill-creator): run_eval.py 触发率始终为 0%
- **功能**：修复 `run_eval.py` 在所有 skill 描述下都报告 `recall=0%` 的严重缺陷，该问题直接影响 `run_loop.py` 与 `improve_description.py` 的优化信号。
- **社区热点**：对应 issue #556，已有 10+ 独立复现；讨论认为当前“描述优化循环是在对噪声做优化”。同时涉及 Windows 流读取、触发检测、并行 worker 等多个根因。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/1298

### #514 Add document-typography skill
- **功能**：新增文档排版质量检查技能，覆盖 AI 生成文档常见的孤行、寡行段落、标题悬空、编号错位等问题。
- **社区热点**：关注 AI 生成文档的“最后 5% 质量”，属于实用价值高但长期被忽略的领域。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/514

### #1734 Detect orphaned docx comments
- **功能**：检测 Word 文档中孤立/游离的批注（orphaned comments）。
- **社区热点**：延续对 DOCX 文档质量的细化治理，但该 PR 描述信息较少，属于功能补充型提案。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/1734

### #1615 Add scnet-hpc skill
- **功能**：新增 SCNet HPC 集群操作技能，基于 profile SSH 与 Slurm 工作流，覆盖集群发现、作业生成、分区/内存/模块/加速器配置等。
- **社区热点**：说明社区正将 Skills 扩展到专业科研计算和基础设施运维场景。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/1615

### #538 fix(pdf): correct case-sensitive file references in SKILL.md
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处大小写不一致的引用，避免在大小写敏感文件系统上无法找到参考文档。
- **社区热点**：小但必要的跨平台修复，反映社区开始关注 Skill 文档在 Linux/macOS 等环境下的可移植性。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/538

### #486 Add ODT skill
- **功能**：新增 OpenDocument 格式技能，支持 `.odt`/`.ods` 的创建、模板填充、内容解析与 ODT 转 HTML。
- **社区热点**：补足文档类技能矩阵，强调对开源/ISO 标准格式的支持需求。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/486

### #210 Improve frontend-design skill clarity and actionability
- **功能**：重构 frontend-design 技能，使指令更清晰、可执行、内部一致，确保 Claude 能在单次对话中真正遵循。
- **社区热点**：讨论重心是“Skill 文本本身就是产品”，社区关注描述质量而非单纯堆叠功能。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/210

### #83 Add skill-quality-analyzer and skill-security-analyzer to marketplace
- **功能**：向 marketplace 新增两个元技能：质量分析器（结构、文档、示例、资源等五维评估）与安全分析器。
- **社区热点**：反映社区对 Skill 标准化、质量度量和安全审计的强烈需求。
- **状态**：Open  
- **链接**：https://github.com/anthropics/skills/pull/83

---

## 2. 社区需求趋势

从 Issues 看，社区最集中的需求已从“新增更多操作型 Skill”转向 **“让 Skill 生态可信任、可共享、可度量和可低成本运行”**：

- **安全与信任边界**：#492 指出社区技能被放在 `anthropic/` 命名空间下分发，形成信任边界滥用风险；#1175 讨论 SharePoint 文档处理中的权限与上下文安全。
- **企业级共享与协作**：#228 要求支持组织级 Skill 分享，避免下载 / Slack 传输 / 手动上传的繁琐流程。
- **Skill 工具链可靠性**：#556 聚焦 `run_eval.py` 触发率恒为 0%；#202 批评 skill-creator 文档更“像给人看的开发文档”，而非可执行的技能指令；#1362 报告 web-artifacts-builder 在 pnpm ≥10.1 下构建失败。
- **上下文窗口效率**：#1487 指出 `claude-api` skill 一次注入约 156k tokens，直接耗尽上下文；#189 抱怨 document-skills 与 example-skills 安装重复技能，浪费上下文。
- **新场景探索**：#412 提出 agent-governance 安全治理技能；#16 建议将 Skills 暴露为 MCP 协议；#1385 提出“推理质量门禁流水线”。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、需求明确，且大多有 issue 背书，属于近期可能落地的候选：

- **#1298 skill-creator eval 修复**：影响核心优化链路，多个复现报告，是当前仓库最需要解决的 PR 之一。  
  https://github.com/anthropics/skills/pull/1298

- **#1742 mcp-builder 支持 mcp>=2 流式 HTTP import**：修复上游依赖变更导致的兼容性问题，有明确 issue #1668，技术风险低。  
  https://github.com/anthropics/skills/pull/1742

- **#1607 claude-api 标记四个退役模型 ID**：纯文档更新，修复错误模型状态，低风险，预计易合并。  
  https://github.com/anthropics/skills/pull/1607

- **#1724 mcp-builder 默认模型更新为 claude-sonnet-5**：一行默认值调整，与当前模型对齐，合并阻力小。  
  https://github.com/anthropics/skills/pull/1724

- **#541 docx 跟踪变更 ID 冲突修复**：修复 OOXML 中 `w:id` 共享空间导致的文档损坏，影响面明确，价值高。  
  https://github.com/anthropics/skills/pull/541

- **#538 PDF 大小写引用修复**：简单可靠，提升跨平台稳定性，适合快速合并。  
  https://github.com/anthropics/skills/pull/538

- **#486 ODT 技能**：新增独立格式支持，不与现有 skill 冲突，市场需求清晰。  
  https://github.com/anthropics/skills/pull/486

- **#514 document-typography 技能**：填补 AI 排版质量控制空白，若作者持续维护，落地概率较高。  
  https://github.com/anthropics/skills/pull/514

---

## 4. Skills 生态洞察

**当前社区最集中的诉求是：让 Skills 生态从“能用”走向“可信、可维护、可低成本落地”——修复评估与打包工具链、明确安全边界、控制上下文开销，并继续补齐文档、企业集成与专业计算场景。**

---

# Claude Code 社区动态日报 — 2026-09-11

## 今日速览

- **v2.1.268 发布**：为 Claude apps gateway 增加计费对齐能力，并新增空 CIDR 配置的启动警告。
- **Windows 平台问题集中爆发**：KB5124008 更新导致 Cowork Plan9 挂载大面积失败（#92984，83 评论），Desktop 文件锁问题持续发酵 5 个月未解决（#42776，173 评论）。
- **Function Hooks 社区讨论热烈**（#91870，158 评论 / 92 👍），官方回应"以周为单位推进"。

---

## 版本发布

### v2.1.268
- **Gateway 计费对齐**：在 `gateway.yaml` 中设置 `pricing:` 后，已登录的 Claude Code 客户端通过托管设置获得相同费率，`/cost` 与遥测数据将与实际计费一致。
- **启动警告**：当 `access_control.allow_cidrs` 为空时，gateway 启动会给出提醒。

---

## 社区热点 Issues（Top 10）

### 1. #42776 — Desktop 因孤立进程文件锁无法重启（Windows）
[github.com/anthropics/claude-code/issues/42776](https://github.com/anthropics/claude-code/issues/42776)

| 状态 | 评论 | 👍 |
|------|------|-----|
| OPEN | 173 | 82 |

**为什么重要**：4 月创建至今仍 unresolved，Windows 用户更新后 Desktop 无法重新启动，属于基础可用性问题。82 个 👍 表明受影响范围不小。

### 2. #91870 — Function Hooks：让插件强大 10 倍
[github.com/anthropics/claude-code/issues/91870](https://github.com/anthropics/claude-code/issues/91870)

| 状态 | 评论 | 👍 |
|------|------|-----|
| OPEN | 158 | 92 |

**为什么重要**：社区呼声最高的功能需求之一。官方在 9 月 9 日更新中表示设计已吸收社区反馈，预计在 **数周内** 发货。92 个 👍 验证了插件/Hooks 生态是当前社区最大期待。

### 3. #92984 — Windows 更新 KB5124008 导致所有 Plan9 挂载失败
[github.com/anthropics/claude-code/issues/92984](https://github.com/anthropics/claude-code/issues/92984)

| 状态 | 评论 | 👍 |
|------|------|-----|
| OPEN | 83 | 41 |

**为什么重要**：9 月 Windows 更新破坏了 Cowork 的 Plan9 文件共享机制，所有远端会话无法挂载本地目录。卸载 KB 可暂时恢复，但该问题已导致 Windows 用户大面积受挫，是当前最热门的 Windows 回归 bug。

### 4. #30112 — Cowork 网络出口 allowlist 不生效
[github.com/anthropics/claude-code/issues/30112](https://github.com/anthropics/claude-code/issues/30112)

| 状态 | 评论 | 👍 |
|------|------|-----|
| OPEN | 57 | 54 |

**为什么重要**：自定义域名被错误拦截（403 blocked-by-allowlist），3 月至今未修复。54 个 👍 说明不少企业用户依赖自定义域名访问内部服务。

### 5. #76248 — Cloud/Cowork 会话 git 代理阻止所有推送
[github.com/anthropics/claude-code/issues/76248](https://github.com/anthropics/claude-code/issues/76248)

| 状态 | 评论 | 👍 |

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-11）

## 今日速览

- **Python SDK 0.154.0 正式发布**，新增 `max` / `ultra` 推理强度档位，并补齐同步接口的 `ExternalMessage` 支持。
- **Windows/WSL 项目创建失败**连续多日占据 Issue 热榜（55 条评论），配额消耗异常与“模型容量已满”报错仍是社区高频痛点。
- **安全与沙箱修复密集合入**：登录重定向白名单、Windows 离线沙箱入站流量拦截、AGENTS.md 动态刷新等 PR 已关闭。

---

## 版本发布

### Python SDK 0.154.0（正式版）
- 安装：`pip install --upgrade openai-codex==0.154.0`（需 Python 3.10+）
- 新增 `max` 和 `ultra` reasoning-effort 取值（[#39662](https://github.com/openai/codex/pull/39662)）
- 为同步接口新增 `ExternalMessage` 支持
- 附带匹配的 `openai-codex-cli-bin==0.154.0` 运行时

### Rust 预发布版本
- `rust-v0.154.0-alpha.6.2`（0.154.0-alpha.6.2）
- `rust-v0.155.0-alpha.1` / `alpha.2` / `alpha.2.3`：0.155.0 系列迭代中

### Windows Voice 构建输入（CI-only）
- `voice-cygwin-108b38cf67cbb731`：包含 103 个 Cygwin 二进制包及签名索引、83 个对应源码包，仅用于离线构建安装器，**不包含在 Codex 用户包中**。

---

## 社区热点 Issues（Top 10）

### 1. [Windows + WSL] 切换 Agent Environment 后项目创建/删除失败
[#41290](https://github.com/openai/codex/issues/41290) | 55 评论 | 43 👍 | OPEN
切换 WSL 环境后项目创建与删除均失败，Windows 用户受影响面极广。已持续两周未关闭，是目前社区关注度最高的问题。

### 2. [Windows + WSL] `AbsolutePathBuf` 反序列化缺少 base path
[#41463](https://github.com/openai/codex/issues/41463) | 47 评论 | 30 👍 | OPEN
WSL2 下创建项目报错，根因指向路径数据结构在跨平台反序列化时丢失基础路径。与 #41290 高度相关，可能是同一底层缺陷的不同表现。

### 3. [Meta] Codex 配额异常消耗与用量记账不一致
[#41220](https://github.com/openai/codex/issues/41220) | 37 评论 | 14 👍 | OPEN
多份报告汇总：订阅配额或购买额度消耗速度远超本地 token 使用证据。社区呼吁官方排查用量记账链路，属高频复现的系统性问题。

### 4. [Windows] 无法在 ChatGPT Project 内创建本地 Work chat
[#34499](https://github.com/openai/codex/issues/34499) | 24 评论 | 16 👍 | OPEN
Windows Desktop App 在 Project 上下文中创建 Work chat 失败，已持续近两个月。虽然评论数不是最高，但生命周期长，用户升级后仍未修复。

### 5. [Windows] 本地 stdio MCP 服务器被反复拉起且不回收
[#38754](https://github.com/openai/codex/issues/38754) | 22 评论 | 3 👍 | OPEN
单个 Codex 任务中每个新轮次都会重新生成 MCP 进程，导致资源泄漏与性能退化。Windows 平台 MCP 进程生命周期管理明显异常。

### 6. CLI 提示词被误判违规（Invalid prompt）
[#43058](https://github.com/openai/codex/issues/43058) | 17 评论 | OPEN
CLI v0.153.4 + gpt-6-astra 下，普通提示词被策略过滤拦截，用户无法正常工作。社区反馈该问题间歇性出现，疑似与内容审核服务的误报有关。

### 7. CLI 0.147.0 Esc-Esc 回溯找不到已选 prompt
[#37421](https://github.com/openai/codex/issues/37421) | 10 评论 | **44 👍** | CLOSED
已关闭但获 44 个 👍，说明 TUI 历史编辑/回溯是 CLI 用户高度依赖的核心交互。关闭状态下的修复效果值得持续关注。

### 8. Repeated "Selected model is at capacity" 致 CLI 不可用
[#44382](https://github.com/openai/codex/issues/44382) | 12 评论 | 5 👍 | OPEN
ChatGPT Pro 20x 订阅 + gpt-6-astra ultra fast，持续报“模型容量已满”。配合 #44113（部分账户全模型被限）形成系列问题，指向容量调度而非账户个例。

### 9. CLI 严重可靠性问题：63.8 MB 图像历史请求、WebSocket 回退与长时间停滞
[#

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-11

## 今日速览

今日发布 v0.61.0-nightly 夜间版本，无显著功能变更。社区最热议的 Issue 仍是 #4556「让 Gemini 少一点谄媚」，获得 39 个 👍，凸显开发者对模型交互风格的高度关注。PR 方面安全修复密集：Windows 沙箱 git 参数校验、checkpoint 路径穿越修复、OAuth 凭据持久化等多个补丁正在推进中。

## 版本发布

**v0.61.0-nightly.20260911.ged2ac40df** — 常规夜间构建，无独立变更日志；完整改动见 [Compare v0.61.0-nightly.20260910...v0.61.0-nightly.20260911](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260910.ged2ac40df...v0.61.0-nightly.20260911.ged2ac40df)。

## 社区热点 Issues（10 个）

### 1. Make Gemini less of a sycophant — #4556
**链接**: https://github.com/google-gemini/gemini-cli/issues/4556

长期热门问题：Gemini CLI 在架构设计等复杂任务中过度使用奉承式镜像语言，用户期待更像「平等的可信伙伴」。已有 **27 条评论、39 个 👍**，是社区呼声最高的体验改进类 Issue。

### 2. Subagent recovery after MAX_TURNS is reported as GOAL success — #22323
**链接**: https://github.com/google-gemini/gemini-cli/issues/22323

P1 级 Bug：`codebase_investigator` 子代理在达到最大轮数后，仍以 `status: "success"` 和 `Termination Reason: "GOAL"` 上报，掩盖了实际中断。**13 条评论**，涉及 agent 执行结果可信度问题。

### 3. Harden ReadManyFilesTool — #21841
**链接**: https://github.com/google-gemini/gemini-cli/issues/21841

工具健壮性增强：LLM 驱动的 `ReadManyFilesTool` 可能收到过于宽泛的 glob 模式（如 `**/*`），导致大规模文件摄入。**11 条评论**，要求添加并发控制和防御性保护。

### 4. Google OAuth login may not be reliably mapped to correct entitlement path — #27149
**链接**: https://github.com/google-gemini/gemini-cli/issues/27149

安全/账号相关：个人 Google 账号登录后，客户端缺乏区分不同账号类型的清晰机制，可能导致 entitlement 映射错误。已关闭但仍在讨论中。

### 5. Assess the impact of AST-aware file reads, search, and mapping — #22745
**链接**: https://github.com/google-gemini/gemini-cli/issues/22745

EPIC 级议题：评估 AST 感知的文件读取/搜索/代码库映射的价值，目标是减少工具调用次数与 token 噪声。**7 条评论**，代表社区对更深层代码理解能力的期待。

### 6. bug: JSON.parse fails to parse settings.json with comments — #28206
**链接**: https://github.com/google-gemini/gemini-cli/issues/28206

`settings.json` 中的 JSON 注释会直接导致 `JSON.parse` 崩溃，因为 CLI 绕过了支持注释的解析路径（settings 文件支持注释是文档明确的特性）。**6 条评论**。

### 7. Gemini does not use skills and sub-agents enough — #21968
**链接**: https://github.com/google-gemini/gemini-cli/issues/21968

用户反馈：即使配置了自定义 skills（如 gradle、git），Gemini 在相关场景下也不会主动使用，只有显式指示才会调用。涉及 agent 自主性优化。

### 8. Pro limits not honored — #27043
**链接**: https://github.com/google-gemini/gemini-cli/issues/27043

订阅用户痛点：正确识别了「Google One AI Pro」身份，但每日限制仍被强制为 200 次而非应有的 1,500 次。已关闭，但反映计费/限流链路仍可能有边缘案例。

### 9. Shell command execution gets stuck with "Waiting input" — #25166
**链接**: https://github.com/google-gemini/gemini-cli/issues/25166

P1 级稳定性问题：简单 shell 命令执行完成后，CLI 仍显示命令活跃并挂起「Awaiting user input」。**4 条评论、3 个 👍**。

### 10. Add deterministic redaction and reduce Auto Memory logging — #26525
**链接**: https://github.com/google-gemini/gemini-cli/issues/26525

安全相关：Auto Memory 在将转录内容发送到后台提取模型之前，模型提示词才要求脱敏——此时敏感内容已进入上下文。要求先脱敏后发送，并减少日志记录。

## 重要 PR 进展（10 个）

### 1. fix(core): validate git args in Windows sandbox — #29184
**链接**: https://github.com/google-gemini/gemini-cli/pull/29184

安全补丁：Windows 下 `git diff --output=<path>` 可绕过只读检查静默截断文件。PR 为 git 参数增加校验，在非 YOLO 模式下阻止此类操作。

### 2. fix(checkpoint): contain legacy raw tag path inside checkpoints directory — #29192
**链接**: https://github.com/google-gemini/gemini-cli/pull/29192

安全补丁：`/chat delete <tag>` 的兼容路径存在路径穿越（`../` 可删除 checkpoints 目录外文件），统一将路径限制在目录内。

### 3. fix(core): correct exitCode null check in shell sandbox denial heuristic — #29186
**链接**: https://github.com/google-gemini/gemini-cli/pull/29186

修复 #29043：`ExecutionResult.exitCode` 类型为 `number | null`，原 `!== undefined` 判断在 `null` 时失效，导致沙箱拒绝启发式错误触发。

### 4. fix(core): match include patterns against file name/extension exactly in read-many-files — #29188
**链接**: https://github.com/google-gemini/gemini-cli/pull/29188

修复 `read-many-files` 中二进制资源「显式请求」判断误报：原用 `String.prototype.includes()` 做子串匹配，目录片段可能与文件名过度匹配。

### 5. fix(core): route read_file content through FileSystemService — #29110
**链接**: https://github.com/google-gemini/gemini-cli/pull/29110

架构修复：`read_file` 直接读本地磁盘，绕过了注入的 `FileSystemService`（`write_file` 与 `replace` 已合规）。影响 ACP 客户端的 `fs: { readTextFile }` 能力。

### 6. fix(core): use safeLiteralReplace for LLM prompt template placeholders — #29187
**链接**: https://github.com/google-gemini/gemini-cli/pull/29187

安全修复：三处 LLM 提示词模板使用 `String.prototype.replace` 注入用户控制值，`$&` 等序列会被特殊解释。改用安全字面量替换（修复 #29044）。

### 7. fix(auth): persist oauth credentials after login — #29282
**链接**: https://github.com/google-gemini/gemini-cli/pull/29282

体验修复：登录成功后立即持久化 OAuth 凭据，避免后续重新触发 Google 登录流程。

### 8. fix(core): avoid tildeifying sibling home paths — #29180
**链接**: https://github.com/google-gemini/gemini-cli/pull/29180

路径处理修复：`tildeifyPath` 错误地将同名前缀的兄弟目录（如 `/home2`）当作 home 路径，改用平台相关的 `path.relative` 做目录段级判断。

### 9. fix(checkpoint): degrade non-array history instead of crashing resume — #29195
**链接**: https://github.com/google-gemini/gemini-cli/pull/29195

稳定性修复：checkpoint 文件是合法 JSON 但 `history` 非数组时，`/resume` 会崩溃。现在降级为空 checkpoint 而非抛 `TypeError`。

### 10. fix(vscode-ide-companion): track all activate() Disposables in subscriptions — #29190
**链接**: https://github.com/google-gemini/gemini-cli/pull/29190

修复逗号运算符 Bug：两个注册被包裹在括号中时只有最后一个 Disposable 被推入 `context.subscriptions`，导致 `gemini.diff.accept` 和 `onDidChangeWorkspaceFolders` 无法在停用时正确释放。

## 功能需求趋势

- **Agent 能力与行为优化**：社区持续关注 agent 的自主性（主动使用 skills/sub-agents）、安全性（避免破坏性命令）和诚实性（不掩盖中断、不过度奉承）。AST-aware 代码库映射代表了「更深度代码理解」的方向。
- **沙箱/安全加固**：大量 PR 集中在 Windows 沙箱 git 参数校验、路径穿越封堵、NTFS 8.3 短名防护等，安全边界仍是核心投入方向。
- **记忆系统（Auto Memory）完善**：多个 Issue 指向记忆系统的重试策略、无效补丁隔离、确定性脱敏等，表明后台 agent 的可靠性有待加强。
- **终端体验与稳定性**：shell 命令挂起、终端 resize 闪烁、`settings.json` 注释解析失败等问题反映了开发者对日常使用流畅度的敏感。
- **浏览器子代理韧性**：Wayland 兼容、浏览器锁恢复、settings.json 覆盖被忽略等问题频出，浏览器自动化仍是易碎环节。

## 开发者关注点

- **交互风格**：最热的 #4556（39 👍）说明用户不希望 CLI 一味附和，反馈需要更直接、更有判断力。
- **子代理透明度**：MAX_TURNS 被误报为 GOAL success、子代理轨迹无法通过 `/chat share` 分享——开发者需要可审计、可复现的 agent 行为。
- **工具数量限制**：超过 400 个工具时出现 400 错误，社区期望 agent 能更智能地按需裁剪工具范围。
- **环境兼容性**：Wayland 浏览器失败、Windows 路径处理、NTFS 短文件名等跨平台问题消耗开发者大量精力。
- **账号与配额**：OAuth 账号类型映射、Pro 限额未按预期生效等问题影响付费用户的信任度。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-11）

## 1. 今日速览

Copilot CLI 发布 v1.0.84-4，重构插件管理命令并新增 JSON 输出，提升插件体系的可编程性。社区反馈方面，Node.js 内存泄漏（OOM）问题在多个 issue 中集中爆发，长期会话场景下的稳定性成为当前最大痛点；与此同时，vi/vim 输入模式以 76 个 👍 持续霸榜功能需求。

## 2. 版本发布

### v1.0.84-4
- 新增 `copilot instruction list` 与 `copilot lsp list` 命令，取代 `copilot plugins list --kind instruction` 与 `--kind lsp`
- `copilot plugin list`、`copilot plugin marketplace list`、`copilot plugin marketplace browse` 新增 `--json` 输出
- 为 `copilot plugin` 新增 `enable` 与 `disable` 子命令

## 3. 社区热点 Issues

### 1. [#13 CLI 输入应支持 vi/vim 模式](https://github.com/github/copilot-cli/issues/13) ⭐ 76 👍
社区对模态编辑器输入模式的需求依然强烈。该 issue 虽已关闭，但 76 个 👍 表明大量 Vim 用户在等待官方实现。评论 12 条，是近期讨论热度最高的功能请求。

### 2. [#4095 Windows 插件更新被 VS Code 文件锁阻塞](https://github.com/github/copilot-cli/issues/4095) ⭐ 21 👍
Copilot 扩展在 VS Code 运行时持有 `installed-plugins` 的 watcher 句柄，导致 `copilot plugin update` 报 `Access is denied (os error 5)`。这是当前 Windows 平台上反馈量最大的问题，直接影响插件更新流程。

### 3. [#1285 组织级 Agent 无法在 CLI 中显示](https://github.com/github/copilot-cli/issues/1285) ⭐ 11 👍
企业用户在 `{org}/.github-private` 中创建的 Agent 无法在 CLI 或 VS Code 中出现。该问题已活跃超 7 个月，涉及企业级配置的可见性，可能阻碍组织规模化采用 Copilot Agents。

### 4. [#4742 桌面应用 1.1.15 无法创建第二个 Local 会话](https://github.com/github/copilot-cli/issues/4742)
当同一个项目已有 Local（branch 型）会话在运行时，创建新会话会报 `This project already has an active Local workspace`。11 条评论表明多会话并行工作流的用户受此影响明显，属于回归性 bug。

### 5. [#4686 Node.js OOM 崩溃：31,965 个泄漏的 libuv 句柄](https://github.com/github/copilot-cli/issues/4686)
长期会话（约 37 分钟）后进程崩溃，报告中提到单次会话泄漏了 31,965 个 async libuv 句柄。由于 SEA（Single Executable Application）构建无法注入 `NODE_OPTIONS`，用户难以自行调优规避。

### 6. [#4725 频繁出现 JavaScript 堆内存不足](https://github.com/github/copilot-cli/issues/4725)
有用户反馈每几分钟就崩溃一次，日志显示在 4 GB 堆上限附近反复

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-09-11）

## 今日速览

- 过去24小时（截至 2026-09-11）仓库动态平静：**无新版本发布，无 PR 更新**。
- 唯一活跃 Issue `#2638` 是设备码登录流程的 HTTP 500 故障，已在 CLI v0.42.0 和 VS Code 扩展中双端复现。
- 登录链路稳定性成为当前社区最关注的问题，需 MoonshotAI 尽快定位服务端或协议处理回归。

## 版本发布

无。过去24小时无新版本发布。最新版本仍为 **CLI v0.42.0**。

## 社区热点 Issues

> 说明：过去24小时内仅 1 个 Issue 有更新，故本部分仅列出该项，并附深度解读。

### #2638：`/login` 浏览器批准后设备认证返回 HTTP 500（CLI v0.42.0 / macOS）

- **作者**：[@milesbuckton](https://github.com/milesbuckton)  
- **状态**：OPEN | **评论**：1 | **👍**：0  
- **链接**：[Issue #2638](https://github.com/MoonshotAI/kimi-cli/issues/2638)

**详情**：用户运行 `/login` 后浏览器弹出设备码（如 `WGBT-C3BW`），完成浏览器端批准后，CLI 端立即抛出 HTTP 500 错误。该问题在免费计划（Adagio tier）macOS 环境稳定复现，且 **VS Code 扩展同样出现**，说明问题很可能出在公用的后端认证服务，而非单一客户端。

**为什么重要**：

1. 登录是使用 CLI 一切功能的前置门槛，直接影响所有免费版 macOS 用户的使用。
2. VS Code 扩展同步故障，扩大了对开发者日常工作流的影响面。
3. 设备码流程是无头/远程环境中的关键认证方式，此 bug 若长期存在，会阻碍自动化运维场景。

**社区反应**：评论数还很少，但复现步骤清晰、版本明确，便于开发团队快速回归。建议持续关注后续修复与状态变更。

## 重要 PR 进展

过去24小时 **无 PR 更新**，本部分暂时缺失。建议关注仓库主分支动态以获取后续修复 PR。

## 功能需求趋势

由于当日仅1条 Issue 更新，样本量不足以提炼广泛的功能倾向。从现有信息看，社区关注点集中在：

- **认证流程健壮性**：设备码审批通过后服务端立即报错，属于典型的认证链路回归。
- **客户端环境一致性**：CLI 与 VS Code 扩展行为需要保持同步，任何一端故障都会被快速反馈。

## 开发者关注点

- **核心痛点**：浏览器已批准但 CLI 仍收到 500，用户无法准确判断是账号问题、网络问题还是服务端故障，排障成本高。
- **普遍期望**：希望官方尽快确认是否为临时故障或协议层回归，并补充：
  - 更明确的 HTTP 错误码与错误信息；
  - 设备码流程的超时重试机制；
  - 详细的客户端日志输出，便于定位是哪个环节失败。

---

**数据说明**：本日报基于 [github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli) 在 2026-09-11 可获取的公开数据整理。因当日活动量较低（1 Issue / 0 PR / 0 Release），部分章节内容较少，重点聚焦于活跃 Issue 的深度分析。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-11

## 今日速览

- **数据库膨胀问题持续发酵**：`event` 表无保留策略导致 opencode.db 膨胀至 13GB 以上的问题（#33356）获得 30+ 评论，并催生了社区工具（#41175），成为当前最严重的稳定性隐患。
- **TUI/UX 改进需求强劲**：垂直标签页（#36942）、TUI 中显示 token 用量（#13003）等 UI 相关 feature request 获得高赞，TUI 树形分组引擎的 PR（#48394、#48399）刚完成合并与集成。
- **订阅支付问题成高频投诉**：多条 issue 反映无法完成订阅支付（#43400、#48374、#23153），另有退款请求（#48407），社区对支付方式的呼吁明显升温。

## 社区热点 Issues

1. **#15585 免费模型提示 "free usage exceed"** — 评论 55，👍 17
   所有免费模型均报错，用户怀疑 OpenCode 是否对免费模型设了隐藏限制。CLOSED 状态但讨论度极高，是免费体验的核心争议。
   https://github.com/anomalyco/opencode/issues/15585

2. **#33356 `event` 表无限增长，opencode.db 达 13GB+** — 评论 30，👍 9
   事件溯源表从不清理/压缩，长时运行实例磁盘被写满到 97-99%。这直接导致 #48384 的 ENOSPC TUI 崩溃，属于双倍暴击。
   https://github.com/anomalyco/opencode/issues/33356

3. **#23153 支持加密货币支付 OpenCode Go** — 评论 21，👍 50
   社区对加密支付的强烈需求，点赞数在近期 feature 中一骑绝尘，与 #48374（无法用银行卡支付）形成呼应。
   https://github.com/anomalyco/opencode/issues/23153

4. **#1880 GLM 4.5 报错 `Expected 'id' to be a string`** — 评论 19，👍 17
   已经持续一年多的老 issue 至今仍被更新，说明 GLM 4.5 的兼容性问题仍困扰部分用户，未完全修复。
   https://github.com/anomalyco/opencode/issues/1880

5. **#36942 [FEATURE] 垂直标签页** — 评论 15，👍 31
   新 UI 强制横向标签，会话一多就难以辨认。高赞说明重度用户对可视密度的需求很强烈。
   https://github.com/anomalyco/opencode/issues/36942

6. **#13003 [FEATURE] TUI 中显示 token 用量** — 评论 13，👍 53
   token 消耗已内部跟踪但未展示，用户希望能看到输入/输出 token 和剩余预算。点赞数全场最高。
   https://github.com/anomalyco/opencode/issues/13003

7. **#4232 OpenCode 显示未配置且 LM Studio 中不存在的模型** — 评论 12，👍 10
   按官方文档接入 LM Studio 后出现幽灵模型，暴露了 provider 配置发现的 bug。
   https://github.com/anomalyco/opencode/issues/4232

8. **#41358 自动压缩后 agent 未经确认继续执行且丢失任务目标** — 评论 8
   Windows 桌面端自动上下文压缩后，agent 不中断继续运行，并忘记原始任务目标。这是核心体验的严重缺陷。
   https://github.com/anomalyco/opencode/issues/41358

9. **#36826 DeepSeek V4 Flash 发送 prompt 报 "Unexpected server error"** — 评论 8
   使用 DeepSeek V4 Flash 模型时无法发送消息，1.17.20 版本，影响特定模型用户。
   https://github.com/anomalyco/opencode/issues/36826

10. **#41175 `event` 表为每次流式更新存储完整消息快照** — 评论 5，👍 4
    与 #33356 同源，但更精确定位到"每次流式更新存全量快照而非 delta"，一周内即可达数 GB，并已有社区工具可修复。
    https://github.com/anomalyco/opencode/issues/41175

## 重要 PR 进展

1. **#48399 [contributor] refactor(tui): project production subgroups through tree engine**
   将现有 reasoning/exploration 分组通过通用树引擎接入生产环境的历史加载与实时会话，TUI 类型检查与 29 个分组测试通过。
   https://github.com/anomalyco/opencode/pull/48399

2. **#42415 [contributor] feat(core): run subagent commands in background**
   支持按命令配置的 agent 模式在子会话中后台运行，而非强制切换父会话模式。改善多 agent 并行效率。
   https://github.com/anomalyco/opencode/pull/42415

3. **#48394 [contributor] feat(tui): add recursive grouping tree**
   纯分组引擎，支持 `activity -> exploration/reasoning/insight` 等可配置嵌套路径。为 TUI 历史会话结构化展示打基础。
   https://github.com/anomalyco/opencode/pull/48394

4. **#45475 fix(core): preserve conversation agent during compaction**
   压缩时使用最后一条助手消息的 agent（跨 checkpoint），保留正常系统提示与工具定义，避免压缩后丢失对话代理配置。
   https://github.com/anomalyco/opencode/pull/45475

5. **#48158 [needs:issue] fix(ai): honor chunkTimeout on HTTP SSE streams**
   修复 `chunkTimeout` 在原生路径被忽略的问题（HttpOptions 无字段、传输层未读取），针对 #46692。
   https://github.com/anomalyco/opencode/pull/48158

6. **#48194 fix(opencode): match absolute permission rules against worktree-relative patterns**
   工具在检查权限时传 worktree 相对路径，导致绝对路径配置规则不匹配。修复后绝对规则可正确生效。
   https://github.com/anomalyco/opencode/pull/48194

7. **#48405 fix: add Android/Termux support to postinstall.mjs**
   由于 `os.platform()` 返回 `"android"`，v2 CLI 在 Termux/Android 上安装失败。该 PR 补充了 Android 平台映射。
   https://github.com/anomalyco/opencode/pull/48405

8. **#48353 [needs:issue, contributor] fix(tui): avoid default theme flash during startup**
   首帧渲染不再等待终端主题模式检测，保持终端原有背景直到配置主题解析完成，修复启动时空白/闪烁。
   https://github.com/anomalyco/opencode/pull/48353

9. **#43681 [needs:issue] fix(core): resolve Bedrock AWS profile credentials for V2**
   来自 Amazon One Medical 的外部贡献，修复 V2 分支的 Bedrock AWS profile 凭证解析问题，已在生产环境自用 1.5 周。
   https://github.com/anomalyco/opencode/pull/43681

10. **#48117 fix(provider): resolve OpenRouter route-modifier suffixes in model IDs**
    支持 OpenRouter 的 `:floor`、`:nitro`、`:exacto`、`:online` 等路由修饰符后缀，修复模型 ID 解析问题。
    https://github.com/anomalyco/opencode/pull/48117

## 功能需求趋势

| 方向 | 相关 Issues | 热度 |
|------|-------------|------|
| **数据库存储优化** | #33356、#41175 — event 表无清理/压缩机制，全量快照存储 | 高，影响磁盘与稳定性 |
| **TUI/UX 增强** | #36942（垂直标签）、#13003（token 用量显示）、#38828（Markdown 渲染） | 高，点赞数领先 |
| **支付与账户管理** | #23153（加密支付）、#43400（订阅支付失败）、#48360（GDPR 删号）、#48374（支付难） | 中高，多条并存 |
| **模型兼容性** | #1880（GLM 4.5）、#4232（LM Studio 幽灵模型）、#36826（DeepSeek V4 Flash） | 中，涉及核心可用性 |
| **远程/移动控制** | #39628（手机端审批权限请求） | 低，但具前瞻性 |

## 开发者关注点

1. **event 表无上限增长** — 最突出的稳定性痛点。流式更新时全量快照导致 opencode.db 达 13GB+，引发 ENOSPC 崩溃，尚无官方修复方案。
2. **上下文自动压缩行为异常** — 压缩后 agent 不确认即继续运行，且会丢失原始任务目标。对长会话用户是致命的体验问题。
3. **订阅支付障碍** — 多条反馈无法用银行卡或加密方式完成订阅，免费模型又有使用限制，用户陷入"既不能免费用、也付不了钱"的困境。
4. **裸模型输出问题频发** — GLM 4.5 报错持续一年多未根除，LM Studio 出现幽灵模型，DeepSeek V4 Flash 报服务端错误——模型层兼容性仍需系统排查。
5. **JSON 输出被内部事件污染** — `opencode run --format json` 下自动压缩的中间输出混入 `text` 事件，自动化消费方无法区分业务输出与系统内部消息。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-11

## 今日速览

Qwen Code 昨日发布 CLI v0.23.3（扩展 Kimi/Qwen/DeepSeek 推理预设）及桌面版 v0.3.0（含预览版），同时在 CI/CD 与 PTY 资源管理上有一批修复持续合入。社区方面，VS Code 扩展升级导致会话历史丢失/隐藏的问题（#11489、#11574）与 Windows 下 MCP 连接不稳定（#9693 等）成为讨论焦点；性能优化类 issue 明显增多，Web Shell 轮询冗余、daemon 内存分配等工作受到关注。

## 版本发布

### CLI v0.23.3
- 新增：[feat(core)] 扩展 Kimi、Qwen、DeepSeek 推理预设（[#11349](https://github.com/QwenLM/qwen-code/pull/11349)）
- 无已知破坏性变更

### v0.23.3-nightly.20260910.c46cb85cf2
- [refactor(dingtalk)] 移除废弃的后台响应聚合逻辑（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）
- [feat(channels)] 移除通道相关模块（变更详情见 PR）

### SDK TypeScript v0.1.12
- 捆绑 CLI 版本：0.23.3

### Qwen Code Desktop v0.3.0
- [ci(desktop)] 定时执行桌面打包验证（[#11519](https://github.com/QwenLM/qwen-code/pull/11519)）
- [fix(bridge)] 保持待处理权限队列一致性等修复

### Qwen Code Desktop v0.3.0-preview.0
- 预览构建，`desktop-latest` 更新通道仍指向 0.2.2，需手动安装体验

---

## 社区热点 Issues（10 个）

**1. 受限的 agent 运行时：确定性工具执行边界提案** · [#8102](https://github.com/QwenLM/qwen-code/issues/8102)  
类型：feature-request / 安全 · 评论 18 · 更新 2026-09-10  
社区呼声最高（评论数第一）的架构级提案：将 LLM 置于信任边界之外，让运行时能够确定性约束、授权、观察和评估模型行为。尚在 need-discussion 阶段，值得关注后续设计文档。

**2. [P1] 扩展更新丢弃全部会话历史（v0.21.x → v0.23.x）** · [#11489](https://

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*