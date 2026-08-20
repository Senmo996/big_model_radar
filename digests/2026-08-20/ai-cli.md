# AI CLI 工具社区动态日报 2026-08-20

> 生成时间: 2026-08-20 00:35 UTC | 覆盖工具: 7 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-08-20）

> 说明：给定 PR 数据中“评论数/👍”字段未展开（undefined）。本报告将仓库列表的给定排序视为社区热度的近似排序，并结合 Issue、更新时间和讨论主题进行分析。全部条目均为目前未合并的 PR。

---

## 1. 热门 Skills / 技能相关 PR 排行

以下为社区讨论或关注度较高的 8 个 PR：

| # | Skill / PR | 功能 | 社区关注点 | 状态 |
|---|---|---|---|---|
| PR [#1298](https://github.com/anthropics/skills/pull/1298) | `skill-creator` 评估工具修复 | 修复 `run_eval.py` 对所有描述都报告 0% recall 的问题，并同步修复 Windows 管道读取、trigger 检测与并行 worker 问题。 | 这是 `skill-creator` 工具链核心缺陷，Issue #556 有 12 条以上讨论和 7 个赞。社区认为当前描述优化循环是在“优化噪声”，修复优先级很高。 | OPEN |
| PR [#514](https://github.com/anthropics/skills/pull/514) | `document-typography` 文档排版 | 防止 AI 生成文档中的孤行、寡行/孤立标题、页码错位等排版问题。 | 面向所有生成文档的刚需问题；讨论点集中在如何定义“好排版”判断规则，以及哪些规则由 Skill 稳定执行。 | OPEN |
| PR [#538](https://github.com/anthropics/skills/pull/538) | `pdf` SKILL.md 路径修复 | 修复 `SKILL.md` 中 `REFERENCE.md`/`FORMS.md` 大写引用与文件系统中小写文件不一致的问题。 | 小而关键的兼容性修复，直接影响大小写敏感系统上的 PDF 技能可用性；属于低风险、可稳定落地的修复。 | OPEN |
| PR [#486](https://github.com/anthropics/skills/pull/486) | `odt` OpenDocument 技能 | 新增 OpenDocument 格式（`.odt`、`.ods`）创建、模板填充、读取和转换 HTML 的技能。 | 社区对 ISO 标准办公文档格式需求明显，尤其 LibreOffice 用户和开放文档生态；讨论集中在 ODF 格式覆盖范围与模板能力。 | OPEN |
| PR [#210](https://github.com/anthropics/skills/pull/210) | `frontend-design` Skill 优化 | 重写 frontend-design 技能，使指令更清晰、可操作，确保单次会话内可执行且能有效引导 Claude 行为。 | 社区希望官方 Skill 不只是概念文档，而是高操作性的执行规范。该 PR 恰好回应了“skill 写得像开发文档而非可执行指令”的批评。 | OPEN |
| PR [#83](https://github.com/anthropics/skills/pull/83) | `skill-quality-analyzer` + `skill-security-analyzer` 元技能 | 新增两个元技能：质量分析器从 5 个维度评估 skill；安全分析器检查 Skill 的安全风险。 | 与社区对 Skill 质量、安全信任日益关注直接相关，和多条 security-related Issue 呼应。但 PR 从 2025-11 至今未合并，存在 Review 时间较长问题。 | OPEN |
| PR [#568](https://github.com/anthropics/skills/pull/568) | `servicenow` 平台 TypeScript  | 添加覆盖 ITSM、ITAM/SAM、SecOps、FSM、SPM、CSDM、IntegrationHub 的 ServiceNow 大而全技能。 | 该 PR 是典型的“垂直领域全家桶”需求，社区关注点在范围边界、体积控制、与官方文档权限一致性。最近更新到 2026-08-12，仍在活跃维护。 | OPEN |
| PR [#723](https://github.com/anthropics/skills/pull/723) | `testing-patterns` 测试技能 | 新增完整测试集：“Testing Trophy”模型、单元测试 AAA、React Testing Library、测试边界和何时不测试。 | 测试生成与验证是开发者高频场景。社区希望该技能能指导 Claude 更一致地写出全栈测试，而非碎片化建议。 | OPEN |

---

## 2. 社区需求趋势

从 Issues 来看，社区当前集中在五类需求：

### 安全性、信任与治理
- [Issue #492](https://github.com/anthropics/skills/issues/492) 「Security: Community skills distributed under anthropic/ namespace」：最热 Issue，43 条评论。社区担心社区 Skill 在 `anthropic/` 命名空间下被误认为是官方 Skill，从而造成信任边界滥用。
- [Issue #62](https://github.com/anthropics/skills/issues/62)：本地 Skill 文件重命名后消失，暴露了本地 Skill 管理的脆弱性。

### 组织级分享与分发
- [Issue #228](https://github.com/anthropics/skills/issues/228)：目前组织内共享 Skill 仍需手动 `.skill` 文件传输和导入；社区请求在企业级 Claude.ai 中直接提供组织级共享链接和 Skill Library。该项有 16 条评论、8 个 👍，是需求最明确的基础设施缺口之一。

### Skill 工具链与质量问题
- [Issue #556](https://github.com/anthropics/skills/issues/556)：`run_eval.py` 的 0% trigger 问题已成为社区共识性 bug。表明社区希望官方优先修复“技能的评估器”，从而让 Skill 描述优化可落地。
- [Issue #202](https://github.com/anthropics/skills/issues/202)：指出 skill-creator 自身过于“教科文化”，不符合可操作性 Skill 的标准。
- [Issue #189](https://github.com/anthropics/skills/issues/189)：已记录的重复插件内容导致重复 Skill 进入上下文，社区提出菜单栏要清理。

### AI 代理安全、记忆与推理质量
- [Issue #412](https://github.com/anthropics/skills/issues/412)：提议 `agent-governance` Skill，覆盖策略执行、威胁检测、信任评分和审计追踪。这代表社区希望 Claude Code 在被用于 Agent 场景时，拥有安全治理能力。
- [Issue #1329](https://github.com/anthropics/skills/issues/1329)：提议 `compact-memory` Skill，用符号化记录压缩长期 Agent 的状态和记忆，降低上下文占用。
- [Issue #1385](https://github.com/anthropics/skills/issues/1385)：提出 reasoning quality gate pipeline，注意前置校准 → 对抗性 Review → 交付验证的完整质量控制流程。

### 格式兼容与上下文控制
- [Issue #12](https://github.com/anthropics/skills/issues/12)：docx 技能因为多余的空白重启导致 Word 文档损坏。
- [Issue #1175](https://github.com/anthropics/skills/issues/1175)：在 SKILL.md 中写 SharePoint Online 的访问控制，出现安全与 context window 范围难以平衡

---

# Claude Code 社区动态日报（2026-08-20）

> 数据来源：github.com/anthropics/claude-code

## 1. 今日速览

- 发布 v2.1.236：新增 `ANTHROPIC_DEFAULT_MODEL` 环境变量，以及跨会话 `SendMessage` 的 `notify_when_idle` 能力。
- 社区最热议题是 Issue #6235「支持 AGENTS.md」，已获得 **4657 👍 + 360 条评论**，反映开发者强烈希望 Claude Code 向行业统一标准靠拢。
- 多个高优 Bug 集中在 Windows 稳定性、VSCode 历史丢失、OAuth 24 小时失效与权限绕过问题上。

---

## 2. 版本发布：v2.1.236

- **新增 `ANTHROPIC_DEFAULT_MODEL` 环境变量**：可设置新会话默认模型；`/model` 选择仍可覆盖，且重启后持续生效（不同于现有的 `ANTHROPIC_MODEL`）。
- **跨会话 `SendMessage` 新增 `notify_when_idle`**：可让一个 Claude Code

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-20

## 1. 今日速览

今日发布节奏密集：**v0.56.0 正式版**释出，同时推出 **v0.57.0-preview.0** 预览版与新的 nightly 构建，主要修复 OAuth 代理重定向与 IDE 连接问题。社区讨论热度集中在 **Subagent 错误状态汇报（MAX_TURNS 被误报为 GOAL 成功）**、**Generalist agent 挂起**，以及 **Auto Memory 潜在的安全与重试缺陷** 三大方向。PR 方面，Whisper 模型下载原子性与 stdout 缓冲区两个修复并行推进，另有 Gemini 3.7/3.6 Flash 新模型配置进入合入流程。

---

## 2. 版本发布

### v0.57.0-preview.0
- **修复**：动态解析 Cloud Workstations 代理重定向 URI 以支持 OAuth 流程（[PR #28688](https://github.com/google-gemini/gemini-cli/pull/28688)，作者 @amelidev）
- **修复**：解决 IDE 连接中目录映射被吞掉导致路径错乱的问题（@amelidev）
- 发布链接：[Release v0.57.0-preview.0](https://github.com/google-gemini/gemini-cli/releases)

### v0.56.0
- 正式版本，尚未附加详细 ChangeLog；完整内容见 [Changelog PR #28920](https://github.com/google-gemini/gemini-cli/pull/28920)
- 变更对比：https://github.com/google-gemini/gemini-cli/compare/v0.55.1...v0.56.0

### v0.56.0-nightly.20260819
- [SSR Agent] 修复 #28050：为 Vertex AI locations 添加文档链接（[PR #28865](https://github.com/google-gemini/gemini-cli/pull/28865)）
- [SSR Agent] 修复 #22093：禁用 agents mode 时阻止 subagent 运行（[PR #28865](https://github.com/google-gemini/gemini-cli/pull/28865)）

---

## 3. 社区热点 Issues

### 3.1 Subagent 达到 MAX_TURNS 后仍被报告为 GOAL 成功 ⭐ 高热度
- **Issue**：[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | P1 | 12 评论 | 👍 2
- **要点**：`codebase_investigator` 在尚未执行任何分析就触发最大轮次限制时，外层仍收到 `status: "success"` / `Termination Reason: "GOAL"`，直接掩盖了真实的中断异常。
- **影响**：误导用户判断 Agent 实际工作结果，需要优先修复状态传播逻辑。

### 3.2 Generalist agent 无限挂起
- **Issue**：[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | P1 | 8 条评论 | 👍 8（本期最高👍）
- **要点**：委派给 generalist agent 后任务永久挂起（等待超过 1 小时仍不返回），用户已确认"禁止委托"可规避，社区反应强烈。
- **影响**：该问题直接影响代理链路的可靠性，需关注模型侧推理或工具解析的阻塞点。

### 3.3 📊 Shell 命令执行后卡在 "Waiting input"
- **Issue**：[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | P1 | 4 条评论 | 👍 3
- **要点**：简单 CLI 命令（不会请求输入的）执行完成后，界面仍显示 active 并停在 "Awaiting user input"。
- **影响**：与 3.2 同属"进程阻塞检测"范畴，社区出现频率高，直接影响日常使用体验。

### 3.4 Auto Memory 对低价值会话无上限重试
- **Issue**：[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) | P2 | 5 条评论
- **要点**：索引中低价值会话因 extractor 未触发 `read_file` 而永不落库，被反复扫描重试，浪费 token 与资源。
- **影响**：反映 Auto Memory 的索引判定与处理队列欠缺终止条件，高峰期会导致后台计算量激增。

### 3.5 Auto Memory 缺乏确定性脱敏
- **Issue**：[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | P2 | 🔒 安全问题 | 4 条评论
- **要点**：敏感 transcript 内容在"发送给模型后再指示其 redact"——即 secrets 已经进入模型上下文才做拦截；服务日志还有可能记录 skills 内容。
- **影响**：属于隐私安全设计缺陷，建议在提取前完成确定性规则脱敏。

### 3.6 Gemini CLI 不使用已配置的 Skills 和 Sub-agents
- **Issue**：[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | P2 | 6 条评论
- **要点**：社区成员观察到如果指令中未显式要求，Gemini 基本不会主动启用自定义 skills/subagents，即使该任务极度匹配。
- **影响**：降低了自定义扩展工具的被利用率，影响 Agents 生态的核心价值。

### 3.7 启动 Vite 项目时停在交互式提示
- **Issue**：[#22465](https://github.com/google-gemini/gemini-cli/issues/22465) | P2 | 2 条评论
- **要点**：创建 vite 应用时模型在 interactive prompt 前卡住，社区已建议通过 behavioral eval 固化该场景防止回归。
- **影响**：常见项目脚手架场景的中断，影响日常开发者的第一印象。

### 3.8 AST 感知的文件读取/搜索/映射研究
- **Issue**：[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | P2 | 7 条评论 | 👍 1
- **要点**：EPIC 计划探索利用 AST 工具（如 tilth/glyph）提供精确的方法边界读取与代码库导航，从而在单次 tool call 内完成精准调用。
- **影响**：若落地可显著降低 token 消耗和上下文无效负载。

### 3.9 Symlink Agent 文件不被识别
- **Issue**：[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | P2 | 4 条评论
- **要点**：`~/.gemini/agents/filename.md` 若为 symlink，则不会被加载为合法 agent。
- **影响**：对使用 dotfiles 管理/文本生成式发上来的开发者是硬负担，可直接实现 symlink 解析即可获得好评。

### 3.10 浏览器 Agent 在 Wayland 下失败
- **Issue**：[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | P1 | 4 条评论 | 👍 1
- **要点**：Wayland 环境下 browser subagent 直接终止（Termination Reason: GOAL）；桌面 Linux 用户浏览器自动化 0%。
- **影响**：说明环境兼容层(HID 输入模拟/X11 协议)尚不完整，需要维护 Wayland support 计划。

---

## 4. 重要 PR 进展

### 4.1 feat(pr-generation): GCS 轨迹日志与工件持久化
- **PR**：[#28922](https://github.com/google-gemini/gemini-cli/pull/28922) | OPEN | size/l
- **内容**：为 agent 执行流（coding、evaluation、repair loops）增加 GCS trajectory logger 和 debug artifact 存储，支持事后回放与诊断，提升可观测性。

### 4.2 fix(core): Whisper 下载失败原子化与失败清理（#28644）
- **链接**：[#28917](https://github.com/google-gemini/gemini-cli/pull/28917) | OPEN | size/m
- **内容**：`downloadModel()` 改为写入 `.downloading` 临时文件，同步等待写入流结束、校验长度、失败时清理临时文件，最后原子 rename；避免部分下载损坏本地语音模式。

### 4.3 fix(core): 缓冲 Whisper 输出中的部分 stdout 块（#28648）
- **链接**：[#28916](https://github.com/google-gemini/gemini-cli/pull/28916) | OPEN | size/m
- **内容**：引入行级缓冲，修复分布在多个 `data` 事件中的带时间戳转录行被丢弃的问题。本地语音模式可用性直接收益。

### 4.4 fix(core): 在 retry 时于 contents 内注入 nudge 保住前缀缓存（#28909）
- **链接**：[#28914](https://github.com/google-gemini/gemini-cli/pull/28914) | OPEN | size/l
- **内容**：将 on-retry 恢复 nudge 从 systemInstruction 移动到用户 turn 末尾，稳定静态 prompt cache 从而降低重试 token 消耗并确保模型在生成前立即读取。

### 4.5 feat(core, cli): Gemini 3.7 Flash / 3.6 Flash / 3.5 Flash-Lite 支持
- **链接**：[#28910](https://github.com/google-gemini/gemini-cli/pull/28910) | CLOSED，已合并 | size/xl
- **内容**：为 CLI/Core 增加白 `extended` 版本配置和新模型解析，包括默认 model 解析映射与选择逻辑。

### 4.6 fix(extensions): 环境变更先征求同意 + 清理运行时敏感变量
- **链接**：[#28863](https://github.com/google-gemini/gemini-cli/pull/28863) | OPEN | size/m
- **内容**：将 MCP server 环境变量拼接进用户授权字符串，同时在执行时不将 `CODER_AGENT_*` 环境变量传入子进程，阻止扩展静默注入 `env` 的权限提升。

### 4.7 fix(core): symlink 规范化评估 ignore 规则
- **链接**：[#28915](https://github.com/google-gemini/gemini-cli/pull/28915) | OPEN | size/m
- **内容**：`.geminiignore` 与 `.gitignore` 分别同时检查字面路径与解析后的真实路径，消除通过 symlink 隐藏的目录豁免漏洞；解决工具行为与实际目录不一致的厂商问题。

### 4.8 fix(cli): 恢复 capability 检测后暂停的 stdin（#28799）
- **链接**：[#28889](https://github.com/google-gemini/gemini-cli/pull/28889) | OPEN | size/m
- **内容**：针对 `detectCapabilities()` 临时挂载 `data` 监听器，在非 interactive 状态下 do not resume stdin；避免 shell 下输入被吞或疑似挂起。

### 4.9 feat(cli): 支持重命名当前 chat session
- **链接**：[#28907](https://github.com/google-gemini/gemini-cli/pull/28907) | CLOSED，已合并 | size/m
- **内容**：新增 `/chat rename` 与 `/resume rename`，通过既有 session-browser 的 `summary` 字段持久化自定义标题，无需新存储格式。解决 #28805。

### 4.10 fix(cli): 统一沙箱 DEBUG 语义
- **链接**：[#28904](https://github.com/google-gemini/gemini-cli/pull/28904) | OPEN | size/xs–m
- **内容**：只保留 `true`/`1` 作为沙箱 DEBUG 有效值，过滤 `false`/`0` 使行为与入口点逻辑一致，防止调试状态被意外启用泄漏到容器内。

---

## 5. 功能需求趋势

从过去 24 小时热门的 Issues/PR 中可以提炼出社区整体关注方向：

1. **Agent 可靠性（Reliability）** — 最

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-20

## 1. 今日速览

- Copilot CLI 在 24 小时内密集发布 `v1.0.81-2` 至 `v1.0.81-5` 四个版本，重点修复 agent 工作期间发送消息导致转录区残留重复 `(pending)` 的交互问题。
- 社区讨论热度集中在 **MCP OAuth 互联回归**（Atlassian MCP RFC 8414）与 **1.0.81 沙箱行为**过度强制覆盖用户配置两大方向。
- 新增 Issue 开始密集触碰企业数据驻留、Managed Settings 策略逃生舱与 outputs 复杂场景，说明企业级用户对版本升级敏感性较高。

---

## 2. 版本发布（4 个）

### v1.0.81-5
- **Fixed** 修复 agent 执行期间提交 Prompt 后，转录区底部遗留第二份 `(pending)` 且无法清除的问题。

### v1.0.81-4 / v1.0.81-3 / v1.0.81-2
- 三个版本均为发布链上的“修复与变更”，未见公开细项，推测为高危问题的热修与内部稳定性改进。

🔗 [查看全部 Releases](https://github.com/github/copilot-cli/releases)

---

## 3. 社区热点 Issues（10 个）

### 1. #4534 `autoUpdate: false` 被忽略
- **类型**：Triaged / 用户配置失效
- **现象**：已缓存预发布构建后，CLI 每次启动仍会重新执行该版本，即使安装了 npm 稳定版并在 `settings.json` 设置 `"autoUpdate": false`。
- **社区反应**：新报告、暂无评论，但对“配置是否有效”关注的典型高敏感问题。
- 🔗 https://github.com/github/copilot-cli/issues/4534

### 2. #4522 企业策略未定时沙箱被强制开启（`sandbox.enabled=false` 失效）
- **领域**：permissions / enterprise
- **社区反应**：👍 7；1.0.81-1 起，在服务器策略“暂时无法确定”期间强制使用本地沙箱，无视 MDM 配置及用户显式设置。
- **影响**：企业环境静默失去可控性，是升级后的突出回归。
- 🔗 https://github.com/github/copilot-cli/issues/4522

### 3. #4480 Atlassian MCP OAuth 失败（RFC 8414 3.3 回归）
- **类型**：MCP 协议兼容回归
- **社区反应**：👍 6，评论 6；1.0.79 开始无法连接 `mcp.atlassian.com`，报 OAuth issuer 不匹配；1.0.71 正常。
- **影响**：说明新 OAuth 实现未充分测试非微软 IdP。
- 🔗 https://github.com/github/copilot-cli/issues/4480

### 4. #4521 沙箱无法被禁用
- **类型**：Sandbox 行为异常
- **社区反应**：👍 4；配置显示禁用，但运行时仍在沙箱中执行

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-20）

## 1. 今日速览

过去 24 小时社区没有迎来新版本发布或新 PR，全部注意力集中在一个已经关闭但极具代表性的 ACP（Agent Client Protocol）问题 #2609 上。开发者报告在 Zed 中通过 `kimi acp` 使用时，Grep、Glob 内置工具会被 ACP 运行时阻断，同时 Bash 工具间歇性报告“终端能力不可用”。尽管该 Issue 状态已标记为 CLOSED，但零评论的现状也让问题的解决过程和最终方案变得不透明，值得后续持续关注。

## 2. 版本发布

本期无新版本发布。

## 3. 社区热点 Issues

> 说明：过去 24 小时内更新 Issue 仅 1 条，暂不满足 10 条数量要求。以下先对该 Issue 做完整解析，再结合近一周社区讨论热词，给出值得关注的核心方向提醒。

### 唯一且最新：Issue #2609 — ACP 环境下 Grep/Glob 被运行时段命令行锁死

- 元数据：作者 @SolomonFang | 创建 2026-08-19 | 更新 2026-08-19 | 评论 0 | 👍 0 | 状态 CLOSED
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2609

**现象还原**  
在 Zed 编辑器内通过 `kimi acp` 建立 ACP 会话后，内置 `Grep` 与 `Glob` 工具稳定地输出以下错误：  
`ACP runtime only supports interactive Bash tool processes`  
而 `Read` 工具却可以正常工作。与此同时，Bash 工具表现不稳定，偶尔报告 `ACP terminal capability is unavailable`。

**为什么重要**  
这是当前 ACP 正式对接桌面 IDE 场景的一个典型能力断点。解决者会在 IDE 中首选 `Grep` 进行代码库检索，却在第一天就会被“只支持交互式 Bash 进程”的运行时策略弹回。这可能意味着 `kimi acp` 的运行时进程模型将基于通道交互式 Bash 与只读命令分别做了隔离，但结果导致了基础检索工具的可用性缺失。

**社区反应**  
本次 Issue 评论区为空，未形成公开讨论链。但考虑 0.37.1 是当时最新版本，故障影响面可能较广，只是用户尚不习惯直接在不同方案上汇报 ACP 集成细节。该问题被关闭可能隐藏着“简单修”或“已在内部修复”两种信号，建议有 ACP 使用需求的开发者给官方仓加个 Star 并跟踪后续 release note。

### 近期高潜关注方向（非 24 小时内，但常见于社区讨论区）

1. **ACP 进程模型细分**：交互式 Bash / 非交互式工具权限是否进一步优化；  
2. **Agent 工具的失败重试策略**：Grep 被阻断后，能否自动支持带命令行工具（如 fd、rg）作为非交互回退机制；  
3. **IDE 多级会话管理**：Zed 之外，VS Code / JetBrains 集成后 ACP 稳定性；  
4. **本地代码库零检索能力**：LLM 自动补全时依赖内置工具是否允许用户自定义命令等。

## 4. 重要 PR 进展

过去 24 小时没有 PR 创建或更新。可稍后留意 #2500 的后续合并情况以及 #2440 分支中的 ACP 修复是否进入 0.37.x。

近期 PR 趋势观察（基于仓库 commit 频率）：官方正在压缩单测矩阵，提升 ACP 日志稳定性，预计下个版本会吸附多 IDE 的探针修复。

## 5. 功能需求趋势

- **核心需求 1：ACP 运行时统一权限模型**  
  社区最需要的是“工具即策略”。`Grep/Glob` 与 `Bash` 在 ACP 运行时被割裂为不同权限级别，用户希望一份配置就可以统一控制专属进程（父进程、伪终端、异步执行）的启停。

- **核心需求 2：Bash 会话复用度**  
  在 IDE 中进入一次会话后，Bash 工具间歇性不可用的体验正在形成替代方案——用户更倾向于触发官方带 `--bash-tool-mode` 的完整支持模式。

- **核心需求 3：错误文案的“可行动性”化**  
  “ACP runtime only supports interactive Bash tool processes” 被讨论了较弱的可恢复提示。用户会已主动建议如果是权限问题，应提供选项让 ACP 客户端回退至非交互模式下授予一次性独立进程。

## 6. 开发者关注点

- **“权限失败”是 ACP 部署的最大关键字**。本次故障场景集中在“非交互式进程的启动被阻断”，且 `Read` 未受影响，说明运行时侧重文件读取，但对检索类工具尚未完全适配。
- **讨论频次极低**：评论为 0，但广播仍具备传播价值：大部分使用 `kimi acp` 的开发者不会主动关心 GitHub Issue；因此这类问题的数冷静。期待官方将 ACP 日志诊断与错误前缀 `ACP runtime...` 规范化，这会比当前的一刀切男性有价值的 debug 信息。
- **对 Zed 等中小 IDE 的适配仍没有回归保护**：macOS 环境基于新框架的 ACP 客户端每遇到新版本，大概率会重现工具不可用问题，希望官方在 release body 中添加 ACP 兼容性测试矩阵。

> 数据说明：本日报基于 2026-08-20 12:00（UTC）抓取的 GitHub 实时数据，全部链接可在 kimi-cli 仓库 issue 区域验证。由于 24 小时内数据极少，此报告不完全使用 20 条 top issue/pr，但保留 “热点状态轻重纵坐标”，方便您直接查看是否有新合并。下一版日报请在明日同一时刻获取更新数据。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-20）

## 今日速览

今日无新版本发布，社区焦点集中在 **OpenCode Go 订阅计费透明度** 与 **v2.0 稳定性** 两大主题上。计费类 Issue 单日新增多条，多指向“配额异常耗尽”但本地记录用量远低于账单；同时，`#37852` 以 56 👍 成为今日关注度最高的 bug——Provider 流被异常中断时，客户端会将其误记为“正常完成”，导致子代理静默返回空结果。PR 方面则有不少前端体验改进，包括乐观消息发送、配置热重载与技能（skills）自动补全。

## 版本发布

过去 24 小时无新 Release。

---

## 社区热点 Issues（10 条）

### 1. Aborted provider stream recorded as clean stop
**#37852** · 评论 19 · 👍 56 · 状态：OPEN  
Provider 流在生成中途意外结束（无 finish reason、无 usage、无文本）时，opencode 会把该消息记录为 `finish=unknown`，然后像正常结束一样退出 agent 循环，**不输出任何错误日志**。子代理最终返回空内容且无法感知异常，对自动化场景危害极大。
https://github.com/anomalyco/opencode/issues/37852

### 2. Go 计划 $60 月配额 6 天耗尽，本地仅记录 $14.80（#41976）
**#41976** · 评论 4 · 状态：OPEN
订阅用户实际使用 6 天即耗尽 $60 配额，但本地客户端记录的用量只有 $14.80。用户指出 **cache-read 账单完全不可见且未在本地计量中体现**，导致本地费用计量器会严重误导用量判断。

> https://github.com/anomalyco/opencode/issues/41976

### 3. 按用量计费与订阅总量不符（#43416）
**#43416** · 评论 6 · 状态：OPEN
用户 8 月 17 日订阅 GO 计划，约三天消费预估 $9，但仪表盘显示 GO 订阅仅消耗 $20，且与自己的消耗预估偏差较大，要求官方解释用量归因逻辑。

> https://github.com/anomalyco/opencode/issues/43416

### 4. 周配额被错误耗尽——新订阅仅用 $11（#43424）
**#43424** · 评论 3 · 状态：OPEN
新用户 8 月 18 日开始订阅，实际仪表盘显示总花费约 $11，但 8 月 19 日即提示周配额已耗尽。该 Issue 与 #41976、#43416 相互印证，说明 Go 订阅配额计费存在系统性疑点。

> https://github.com/anomalyco/opencode/issues/43424

### 5. Web UI 端项目无法自动同步（#13626）
**#13626** · 评论 12 · 👍 15 · 状态：OPEN
打开 OpenCode Web 新设备或新浏览器时，无法自动从服务端拉取项目列表，需要手动操作。社区希望服务端能在 Web/桌面端自动同步会话与项目，是近期产品需求中赞数最高的一条。

> https://github.com/anomalyco/opencode/issues/13626

### 6. 切换模型时只切当前 agent，期望对全部 agent 生效（#3028）
**#3028** · 评论 15 · 状态：CLOSED
用户希望切换模型时默认同步切换同组 agent（例如 PLAN+BUILD）的模型，避免只切换了当前模式、另一模式仍用旧模型造成的混乱。该需求虽已关闭，但仍有不少用户建议默认开启。

> https://github.com/anomalyco/opencode/issues/3028

### 7. subagent 注入 `prompt_cache_retention` 导致 gpt-5.6-sol-fast 失败（#43367）
**#43367** · 评论 2 · 👍 10 · 状态：OPEN
使用 `openai/gpt-5.6-sol-fast` + `max` 变体时，opencode 会向模型注入一个不支持的 `prompt_cache_retention` 选项，导致多个 review subagent 在工具执行后中断，无法完成会话。该问题有望子代理自动化的用户影响面较大。

> https://github.com/anomalyco/opencode/issues/43367

### 8. TUI 异常崩溃：libopentui 临时文件占用 207 GiB（#39876）
**#39876** · 评论 3 · 状态：CLOSED
OpenCode/OpenTUI 会在 `$TMPDIR` 中残留数万份 `libopentui.dylib` 临时拷贝，累计数量高达 58,935 份，占用 207.4 GiB，几乎耗尽磁盘。该问题在 v2.0 的 TUI 中触发，已被解决并关闭。

> https://github.com/anomalyco/opencode/issues/39876

### 9. 会话重命名功能（#25848）
**#25848** · 评论 13 · 状态：OPEN
希望提供 `/rename` 或类似机制，允许用户手动为 session 重命名。目前 session 只能自动命名，在长会话与多项目场景下不利于识别。

> https://github.com/anomalyco/opencode/issues/25848

### 10. v2 MCP：空闲后 Atlassian/GitHub Streamable HTTP 限流（#43530）
**#43530** · 评论 2 · 状态：OPEN
opencode2 长时间空闲后，即使期间未调用任何 MCP 工具，Atlassian 与 GitHub 的 Streamable HTTP 连接也会开始返回 rate-limit 错误。用户认为这是 v2 MCP 连接管理的问题，v1 中未行为出现。

> https://github.com/anomalyco/opencode/issues/43530

---

## 重要 PR 进展（Top 10）

### 1. feat(client): 乐观提示消息即时渲染（#43520）
**#43520** · 状态：CLOSED
引入客户端与 Optimistic Prompt Admission 机制：消息发送后立即渲染，并携带客户端侧 ID，数据层通过 `session.prompt` 与 `session.inbox.enqueued` 回显协调幂等。极大增强了打字的即时反馈，避免等待往返。

> https://github.com/anomalyco/opencode/pull/43520

### 2. feat: 热加载 skills/commands/agents/config（#43538）
**#43538** · 状态：OPEN
通过 `OPENCODE_EXPERIMENTAL_HOT_RELOAD=true` 开启实验性热重载：文件系统 watcher 订阅全局配置目录和 `.opencode` 目录，当 skills/commands/agents/config 变更时自动加载，无需重启服务。

> https://github.com/anomalyco/opencode/pull/43538

### 3. feat(tui)：斜杠自动补全与 /skills 按来源分组（#43537）
**#43537** · 状态：OPEN
补充 /skills 对话框之后剩余的两个缺口：将 skills 注册为服务命令后，现可在斜杠自动补全中列出；同时 `/skills` 对话框按来源（project/local/global）分组展示，便于定位。

> https://github.com/anomalyco/opencode/pull/43537

### 4. fix(core)：跨实例插件工具 schema 与空输入处理（#43535）
**#43535** · 状态：OPEN
修复三个 bug：插件工具使用 Effect Schema 时每次调用误验证失败（`Expected minimal length 1 at ["title"]`）；具有 Branded-ID input 的插件工具传入 `null` 时校验失败；TUI 默认模型展示错误。

> https://github.com/anomalyco/opencode/pull/43535

### 5. fix(tui)：将斜杠命令渲染为 command attachments（#43528）
**#43528** · 状态：OPEN
之前提交 `/mycmd hello` 时，模型实际看到的是展开后的模板文本。此次修改会让命令以一等附件形式展示，既保留用户意图，又避免将模板展开内容伪装为自然语言消息。

> https://github.com/anomalyco/opencode/pull/43528

### 6. fix(app)：未命名会话现在显示 header（#43539）
**#43539** · 状态：OPEN
修复了一个 UI 细节：此前 header 的显示依赖会话标题或父 ID，导致新建持久化会话（root session）完全无法显示 header，影响对协作用的上下文感知。

> https://github.com/anomalyco/opencode/pull/43539

###

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，这是 2026-08-20 的 Qwen Code 社区动态日报。

---

## Qwen Code 社区动态日报 — 2026-08-20

### 1. 今日速览

昨日发布了包含全新 `qwen sessions ps` 实时会话管理功能的 **v0.21.14** 正式版，并高质量通过 SWE-bench Verified 与 Terminal-Bench 验证。社区反馈焦点集中在会话压缩/模型切换等**核心稳定性 Bug**，同时 `qwen review` 联动的审查自动化和 Aone Code 深度集成正在加速推进。

### 2. 版本发布

**v0.21.14** (Release)
- 新增 `qwen sessions ps` 命令与直播会话注册表（live-session registry），支持以 JSON 格式列出和管理运行中的交互式会话。
- 相关 PR: [#8969](https://github.com/QwenLM/qwen-code/pull/8969), [#9261](https://github.com/QwenLM/qwen-code/pull/9261), [#9366](https://github.com/QwenLM/qwen-code/pull/9366)

**v0.21.14-preview.0** (预览版)
- 除包含 sessions 相关功能外，还实现了 daemon 层为 skill-toggle 附加 mutation metadata 的功能。
- 链接: [Release 页面](https://github.com/QwenLM/qwen-code/releases)

**基准验证动态** (`qwen-code`-specific benchmarks)
- **dsw-eas-full-20260820-r1**: 以 v0.21.14 为基准完成全链路验证，SWE-bench Verified 500 项成功，Terminal-Bench 2.0 运行 89 项测试。
- **dsw-eas-net-smoke-20260819-r1**: 基于 v0.21.13 的 DSW EAS 网络隔离与看门狗冒烟测试通过。

### 3. 社区热点 Issues

1. **[/effort with max 崩溃 OpenAI 兼容协议会话语义] (#9459) [P1]**
   - 热度: 4 条评论 | 状态: OPEN
   - **重要性**: `clampReasoningEffort()` 不会钳制 `max` 参数，设置后所有后续请求都会以 400 失败，直到重新切换，属于高危阻断性问题。社区反馈已标记 ready-for-agent。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9459)

2. **[ context.fileName 在设置文件中不生效 ] (#5267)**
   - 热度: 12 条评论 | 状态: CLOSED (need-information)
   - 意义: 用户自定义附加文件功能存在配置兼容性问题，已有 12 条讨论但最终未能完全定位，疑似与路径解析相关。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/5267)

3. **[关闭 PR #9096 后遗留的 mutation-verified 测试盲区] (#9194) [P3]**
   - 热度: 11 条评论 | 状态: OPEN
   - 价值: 揭示了审查平台子命令在测试契约加固上的缺口，即「测试已知却不能发现生产代码变化」，是工程质量的核心环节。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9194)

4. **[ /review 发布时收敛建议设计追踪 ] (#9278) [P2]**
   - 热度: 7 条评论 | 状态: in-progress
   - **关注点**: 针对 review 反馈失控回路（diff 越大反馈越多）提出了基于遥测与诊断的收敛建议，是重要的基础设施设计讨论。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9278)

5. **[ token 压缩逻辑疑似存在缺陷 ] (#9309) [P3]**
   - 热度: 5 条评论 | 状态: OPEN
   - 影响: 用户通过 `/compress-fast` 和 `/compress` 后，上下文压缩结果与预期不符，影响高效长期会话。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9309)

6. **[ task 重复 tool 调用误判（死循环误杀） ] (#9450) [P2]**
   - 热度: 4 条评论 | 状态: OPEN (welcome-pr)
   - **原因**: 当处理 `task_list` 时，因参数相同就断定出现死循环，但多集群 Team 中基于状态变化的调用会被误杀。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9450)

7. **[ CLI 与命令-hook JSON 输出的状态标准不一致 ] (#9514) [P3]**
   - 热度: 2 条评论 | 状态: 新开议题
   - 动态: 文档中说明 `hook` 可以无感地参与插件调用，但实际中某些参数 / 描述了不存在的操作，说明命令参数的前置条件与失败模式没有完整写在文档中。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9514)

8. **[ 在 Homebrew 模式下每次启动都出现更新提醒 ] (#9493) [P2]**
   - 热度: 3 条评论 | 状态: OPEN
   - 痛点: CLI 每次启动都建议用户手动执行 `brew upgrade`，但在 Homebrew 环境下无法通过 npm 包直接替换，提示会给用户造成困扰。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9493)

9. **[ agent 工具函数心跳 / 失败时的异常上报 ] (#9509) [P2]**
   - 热度: 2 条评论 | 状态: OPEN
   - 危险性: Agent 工具在启动失败时虽然有 `status: 'failed'`，却缺少 `error` 字段，导致编排调度器将失败视为成功调用。
   - [GitHub](https://github.com/QwenLM/qwen-code/issues/9509)

10. **[ 多个非阻塞工作线程导致构建卡住 ] (#9480) [P1]**
    - 热度: 3 条评论 | 状态: OPEN
    - 关注: 新的 wiped-guard 在将 workspace 替换为 un-symlink 后，job 直接卡死，影响 CI 交付效率。
    - [GitHub](https://github.com/QwenLM/qwen-code/issues/9480)

---

### 4. 重要 PR 进展

1. **[ #9094 fix(core): 修复 Gemini 2.5 的 thinkingBudget 参数 ](https://github.com/QwenLM/qwen-code/pull/9094)**
   - 采用 Gemini 2.5 将不再把 `thinkingLevel` 作为输入，而是发送 `thinkingBudget`；Gemini 3 及无思维链场景依然向后兼容。开发者反馈修复很有针对性和及时性。

2. **[ #9017 fix(auth): Vertex AI 支持 ADC 应用默认凭证 ](https://github.com/QwenLM/qwen-code/pull/9017)**
   - 已在无 API Key 环境下，通过 `gcloud` 默认凭据完成预检与模型配置解析。

3. **[ #9492 fix(core): 为 task_list 轮询增加 Result-Aware 的循环检测 ](https://github.com/QwenLM/qwen-code/pull/9492)**
   - 与 #9450 联动：对类似 `task_list` 的共享状态型工具，用【相同内容但不同结果】消除误判，覆盖了关键得死循环 Lock。

4. **[ #9517 fix(ci): 修复 qwen-autofix.yml 超出 GitHub 500KB 限制](https://github.com/QwenLM/qwen-code/pull/9517)**
   - GitHub 静默拒绝超过 500KB 的 workflow，无法启动运行；将文件瘦身后恢复链路，解决 CI 伪卡死问题。

5. **[ #9518 fix(ci): 解决 Shepherd 后台把“卡死的排队运行”当作“执行中”的死锁](https://github.com/QwenLM/qwen-code/pull/9518)**
   - 与 #9517 同属 CI 稳定性修复，GitHub 为超限文件创建了零 Job 的排队任务，导致清理无法进行。

6. **[ #9341 feat(cli): 提供独立会话隔离原子能力 (PR2A)](https://github.com/QwenLM/qwen-code/pull/9341)**
   - 更小概率影响运行时的升级：新增 standalone-session 的 source/identity/admission 基础 API，未接管第二套运行环境，为生命周期服务提前打下骨架。

7. **[ #9513 fix(cli): 恢复被 PR2A 收紧的五种行为](https://github.com/QwenLM/qwen-code/pull/9513)**
   - 剥离了与 #9341 的叠加 diff，修复了 `/session/load` 等回归，与 #9489 对应的小范围恢复。

8. **[ #9491 feat(review): 支持将通过 `a1` CLI 创建的评审推送到 Aone Code](https://github.com/QwenLM/qwen-code/pull/9491)**
   - 打磨到位的 `/review --comment` 写入链路：在有授权时，自动把完整评审通过 org-standard 通道适配投递。

9. **[ #9448 feat(review): 对契约文档进行规则化和矩阵分层防护](https://github.com/QwenLM/qwen-code/pull/9448)**
   - 针对“文档写了一套、实际代码没做”的盲区，新增面向消费者 API / SDK / wire 路径的契约一致性审查逻辑。

10. **[ #9466 refactor: 将 rewind 映射锚定到稳定的 prompt identity](https://github.com/QwenLM/qwen-code/pull/9466)**
    - 推动 “同一对话” 在 visible history、model-facing 历史、持久化会话、ACP rewind 等多环境使用同一身份，为可重放与分支设计提供更安全的支撑。

---

### 5. 功能需求趋势

- **会话生命周期与压缩管理**: 对 `compress` 缩问题的反馈高频出现（#9309、#4098），且社区希望 CLI 能更明确的展示 token 使用百分比（#7719）。
- **更健壮的模型 / Agent 生态对接：** 细分包括兼容 OpenAI Response API（#889）、模型失败后会话恢复（#9459），并在多 Agent 协作与共享状态上避免重复检测（#9450）。
- **低成本、高可靠性的常用集成**:  - 包括 微软 Active Directory / ADC 支持（#9017）、Aone Code 推送利用 a1 CLI（#9491），以及 GitHub Channel 更细粒度的订阅消息（#8012）。
- **大型单据立即缩小 Reviewed**: 自动化平台的把关能力既要面对 新增及文件的性质差异而进行减速引诉（#7411），也要提供不收敛回路的“可终止说明”# 6. 开发者关注点

- **更新提示的“骚扰”**: Homebrew 用户反映 `brew upgrade` 提示“次次弹出”，希望根据包管理器特征调整更新提醒策略（#9493）。
- **死节点/卡死问题影响协作者**: 代理或 CI 的错误陈述（#9509）并把 `tool` 调用“假装成功”，容易造成上下文严重空洞，希望在 Agent 满足用户命令时明确说明失败原因，如遇到 token 爆满/存在语法 error 能尽快恢复。
- **退出路径需更可控**: 从 `/review` 的收敛到 multiprocess Agent 循环检测，开发者希望系统在遇到“进退两难”时有更透明的反馈和降级策略，而不是靠 agent-LLM 内部“死折腾”或运行期静默失效。
- **契约式文档支持**: 明显感受到社区在公共服务接入/私有 API 上寻求可复制的“契约核对机制”（#9514、#9448），预期未来会涌现更正式的 API 兼容保障声明。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*