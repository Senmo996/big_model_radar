# AI CLI 工具社区动态日报 2026-08-11

> 生成时间: 2026-08-11 00:53 UTC | 覆盖工具: 7 个

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

**报告日期：2026-08-11 | 覆盖工具：Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、Kimi Code CLI、OpenCode、Qwen Code**


## 1. 生态全景

当前 AI CLI 工具市场已从"对话式代码生成"快速演进为"深度嵌入开发者工作流的自动化代理平台"。主要特征是：**迭代频率极高**（七款工具单日合计发布 6+ 版本）、**平台稳定性成为普遍痛点**（Windows 问题在五款工具中集中爆发）、**多智能体协作架构开始从概念走向落地**（Qwen Fleet、Claude Cowork、Codex code-mode）。同时，社区对**上下文持久化与管理**的诉求跨工具趋同，成为需求密度最高的共性方向。整体看来，各工具正从"能用的原型"向"可信赖的生产力基础设施"艰难跨越，稳定性与可预测性是当前竞争的关键胜负手。


## 2. 各工具活跃度对比

| 工具 | 当日版本 | 热点 Issues | PR 动态 | 社区热议度 | 关键信号 |
|------|---------|------------|---------|-----------|---------|
| **Claude Code** | v2.1.227 补丁 | 10+（重点提及） | 3（1 开放） | 高（单 Issue 评论 32 条，180+ 👍 功能诉求） | 功能最全，但企业级审核状态同步与沙箱资源管理漏洞频现 |
| **OpenAI Codex** | 2 个 alpha（0.148.0 / 0.147.0） | 10 | 10（9 优化 / 1 功能） | 高（Windows freeze 93 评论 81 👍） | Rust 核心快速迭代，Windows 性能是最大拖累 |
| **Gemini CLI** | nightly 常规更新 | 10 | 10（含 2 项安全修复） | 中高（Subagent 假成功热议，SSRF 修复待合并） | 稳定性问题密集，安全修复优先级高 |
| **GitHub Copilot CLI** | v1.0.79 补丁 | 10（4 条全新） | 0 | 高（模型禁用 29 评论 11 👍） | 企业策略兼容性成最大短板，MCP 集成问题集中爆发 |
| **OpenCode** | v1.18.16 补丁 | 10 | 12（覆盖核心重构） | 中高（CPU 占用 46 评论 22 👍） | 社区参与度高，核心服务层重构活跃 |
| **Qwen Code** | v0.21.9 正式版 + nightly | 10 | 10 | 中（Fleet RFC 讨论积极） | 多智能体方向明确，Provider 配置回归问题需关注 |
| **Kimi Code CLI** | 无 | 1 条精选 | 0 | 低（记忆系统 31 评论） | 社区规模较小，处于功能酝酿期 |

> 注：各工具 Issues/PR 数量仅统计日报重点收录条目，实际总量可能更大。活跃度综合评论数、点赞数、Issue/PR 密度评估。


## 3. 共同关注的功能方向

### 3.1 上下文持久化与记忆系统（需求密度最高）
| 工具 | 具体诉求 |
|------|---------|
| **Claude Code** | CLI/桌面端/Claude Desktop 三方会话同步（累计 180+ 👍） |
| **Gemini CLI** | Auto Memory 低信号会话重试、敏感信息脱敏时机 |
| **Kimi Code CLI** | 跨会话记忆系统（31 条评论，双轨自动/手动记忆） |
| **Copilot CLI** | 会话超 5MB 后 `/compact` 失效、踢出提示丢失 |
| **OpenCode** | 草稿按会话隔离、全文件快照导致会话膨胀 |

### 3.2 Windows 平台稳定性（五款工具集中暴露）
- **Claude Code**：全平台安装失败、GPU 崩溃、沙箱 stale-cache
- **Codex**：UI 冻结（93 评论）、扩展加载失败、Computer Use 多重异常
- **Copilot CLI**：插件更新权限错误、渲染死循环回归
- **OpenCode**：输入框焦点丢失、菜单快捷键失效
- **Qwen Code**：横幅渲染闪烁、麦克风权限警告

### 3.3 子代理/多智能体可靠性
- **Claude Code**：Cowork 沙箱资源隔离与生命周期清理缺陷
- **Gemini CLI**：Subagent 达到 MAX_TURNS 后误报成功（p1）
- **Copilot CLI**：并行子代理限流集中触发 429，工具调用结果乱序
- **Qwen Code**：Fleet 多智能体分阶段落地（#8840-#8843）
- **Codex**：code-mode 嵌套会话完成状态误报

### 3.4 MCP 集成兼容性
- **Codex**：OAuth issuer 规范化破坏已认证连接
- **Copilot CLI**：握手超时、临时策略丢弃用户服务器
- **Gemini CLI**：MCP OAuth token 刷新失败导致凭据被删

### 3.5 企业策略与认证状态可观测性
- **Claude Code**：CVP 审核状态不同步（32 条评论）
- **Copilot CLI**：企业模型策略误阻断（持续近半年）
- **Qwen Code**：内置 Provider 更新静默覆盖自定义模型配置


## 4. 差异化定位分析

| 工具 | 核心定位 | 技术路线 | 目标用户 | 战略意图 |
|------|---------|---------|---------|---------|
| **Claude Code** | 全功能 AI 结对编程代理 | Anthropic 模型深度绑定 + 企业级沙箱 | 个人开发者 → 企业团队（Max 计划） | 以功能广度抢占高端市场，企业合规与安全是双刃剑 |
| **OpenAI Codex** | 通用 AI CLI + 桌面应用 | Rust 核心重写 + 多模型支持 | 开发者 + 桌面端重度用户 | 以性能和多模型兼容性切入，Computer Use 打开自动化想象空间 |
| **Gemini CLI** | Google 生态的 AI 编码代理 | TypeScript + Gemini 模型 | 依赖 Google Cloud / 轻量用户 | 组件级行为评估体系（76 测试×6 模型）体现工程化决心 |
| **GitHub Copilot CLI** | GitHub 生态的 Copilot 终端形态 | Copilot 服务 + 企业策略体系 | 企业开发者（组织订阅） | 深度绑定 GitHub 平台，生态协同是壁垒也是约束 |
| **OpenCode** | 开源可自托管的 AI CLI | 多 Provider 支持 + 插件体系 | 开源社区 / 追求自由度的开发者 | 社区驱动创新，V2 重构展现长期主义 |
| **Qwen Code** | 阿里系多智能体 AI CLI | Qwen 模型 + WebShell + Fleet 架构 | 阿里云用户 / 中文开发者 | 多智能体方向最激进，WebShell 打通浏览器控制 |
| **Kimi Code CLI** | 轻量 AI 开发助手 | Moonshot 模型 + 基础 CLI | 新用户 / 轻量场景 | 尚处追赶期，功能全面性差距明显 |


## 5. 社区热度与成熟度

### 分梯队评估

**第一梯队：社区规模大、反馈密集、迭代稳定**
- **Claude Code**：功能最全、问题最复杂（企业级、沙箱、安全），社区讨论深度高，属于"高复杂度下的头部产品"
- **GitHub Copilot CLI**：背靠 GitHub 最大开发者生态，企业用户反馈占比极高，Issue 质量高（策略、MCP、会话生命周期）
- **OpenAI Codex**：Rust 重写带来的高速迭代期，Windows 性能问题堆积但版本节奏稳定

**第二梯队：活跃发展、方向明确**
- **Gemini CLI**：组件级评估体系（#24353）是工程成熟度的积极信号，SSRF 修复反映安全意识；Subagent 信任层面问题仍在消耗用户信心
- **OpenCode**：社区参与度高（contributor PR 占比高），V2 beta 展现长期愿景，性能回归引发警觉
- **Qwen Code**：Fleet 多智能体路线图清晰，但 Provider 配置回归问题伤害信任

**第三梯队：早期阶段**
- **Kimi Code CLI**：社区讨论集中在单个大方向（记忆系统），生态和工具链尚未形成


## 6. 值得关注的趋势信号

### 6.1 Windows 是 AI CLI 的"最后一公里"
七款工具中有五款在 Windows 平台出现高密度故障报告（安装失败、UI 冻结、沙箱异常、渲染死循环）。**背后的信号是**：AI CLI 工具目前主要面向 macOS/Linux 开发者为先的设计惯性已不再适配多元化开发环境。对技术决策者而言，若团队 Windows 开发者占比较高，需谨慎评估工具的 Windows 成熟度，或准备降级方案。

### 6.2 "假成功"正在侵蚀自动化信任
Gemini CLI 子代理达到 MAX_TURNS 仍上报 GOAL 完成（#22323）、Copilot CLI 嵌套会话完成状态误报（#35613）、Claude Code 压缩后 skill 重放导致意外 git push（#85138）——**"AI 说做完了但实际没有"正在成为自动化场景中最危险的信任危机**。自主智能体的可靠性验证（验证机制、可观测性、回滚能力）将是从"demo 可用"到"生产可信"的分水岭。

### 6.3 上下文窗口是算力，更是权利
社区对上下文窗口缩水（Codex 372k→缩小）、压缩后行为失控（Claude Code）、会话超限不可恢复（Copilot CLI）的反弹表明：**开发者已经将上下文持久性视为核心资产而非锦上添花**。拥有上下文管理优势的工具（记忆系统、会话同步、可配置压缩策略）将在长期竞争中胜出。

### 6.4 企业策略配置需要"白盒化"
Claude Code 的 CVP 状态不同步、Copilot CLI 的策略"黑盒"误阻断、Qwen Code 的 Provider 静默覆盖——企业用户正在被复杂的权限和配置体系所累。**信号是**：AI CLI 工具在企业落地过程中，策略可观测性和配置可诊断性将直接影响采购决策。

### 6.5 多智能体协作进入"真刀真枪"阶段
Qwen Code 的 Fleet 路线图（leader 协调多 worker）、Claude Code 的 Cowork、Codex 的 code-mode、Gemini 的 subagent 体系——多智能体不再只是概念验证，而是开始面临真实性挑战：**完成语义定义、参数一致性、资源隔离、故障恢复**。在自动化闭环（无人值守）场景中，这些细节决定了系统是资产还是负债。

### 6.6 安全基线正在上移
SSRF 修复（Gemini）、OAuth 凭据保护、沙箱逃逸、prompt 注入防御（伪造 system-reminder）——社区对安全问题的敏感度显著提升，安全问题正在从"加分项"变为"准入门槛"。对开发者而言，**在使用 AI CLI 前应评估其安全审计记录和漏洞响应速度**。

---

*本报告基于 2026-08-11 各工具 GitHub 社区公开数据生成，仅供参考。作者不持有（或持有）上述任何工具的相关立场。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-11）

## 一、热门 Skills 排行

| 排名 | Skill（PR） | 功能 | 当前状态 | 社区讨论热点 |
|------|------------|------|---------|------------|
| 1 | [fix(skill-creator): run_eval.py 评估修复（#1298）](https://github.com/anthropics/skills/pull/1298) | 修复 skill-creator 评估脚本多处核心缺陷（Windows 管道读取、触发检测、并行 worker） | OPEN | 最活跃的单一 PR，指向 skill-creator 生态的核心可用性问题，获得超 10 次独立复现 |
| 2 | [Add document-typography skill（#514）](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质量控制（孤儿字符、孤立标题、编号错位） | OPEN | 关注度极高，覆盖所有 AI 致文档常见问题，属于高频痛点 |
| 3 | [Add ODT skill — OpenDocument 创建与解析（#486）](https://github.com/anthropics/skills/pull/486) | .odt/.ods 文件创建、模板填充、ODT 转 HTML | OPEN | LibreOffice/ISO 标准文档需求明确，与已上线的 docx/pdf 生态互补 |
| 4 | [Improve frontend-design skill（#210）](https://github.com/anthropics/skills/pull/210) | 重构 frontend-design skill，提升指令可执行性 | OPEN | 社区关注既有官方 skill 的质量迭代，而非仅新增 skill |
| 5 | [Add pyxel skill（#525）](https://github.com/anthropics/skills/pull/525) | 复古像素游戏开发（8-bit/retro）工作流 | OPEN | 基于 [pyxel-mcp](https://github.com/kitao/pyxel-mcp)，社区对游戏开发 skill 兴趣较高，讨论期有增长 |
| 6 | [feat(skills): add self-audit（#1367）](https://github.com/anthropics/skills/pull/1367) | 四维推理质量门控 + 机械文件验证（v1.3.0） | OPEN | 质量审计方向的新尝试，与 #1385 提案形成呼应 |
| 7 | [feat: add testing-patterns skill（#723）](https://github.com/anthropics/skills/pull/723) | 全栈测试模式覆盖（Testing Trophy、AAA、React Testing Library） | OPEN | 补齐测试领域官方 skill 空白，符合社区持续需求 |


## 二、社区需求趋势

1. **组织级 Skill 共享与管理**（[#228](https://github.com/anthropics/skills/issues/228)，16 评论）——企业用户迫切希望 org 内共享 .skill 文件，当前手动分发流程过于繁琐。

2. **安全与信任边界**（[#492](https://github.com/anthropics/skills/issues/492)，43 评论）——社区最高讨论量 Issue，核心关切：社区 Skill 在 `anthropic/` 命名空间下分发存在信任滥用风险，用户可能向冒名官方 skill 授予过高权限。

3. **AI Agent 治理模式**（[#412](https://github.com/anthropics/skills/issues/412)）——Policy 执行、威胁检测、信任评分与审计跟踪的治理 skill。

4. **文档类 Skill 深度修复与扩展**（[#12](https://github.com/anthropics/skills/issues/12)、[#1175](https://github.com/anthropics/skills/issues/1175)）——docx 白空格修复、SharePoint Online 文档权限处理等企业文档场景。

5. **Agent 长效记忆管理**（[#1329](https://github.com/anthropics/skills/issues/1329)）——compact-memory 符号化表示，解决长时运行 agent 笔记耗用上下文的问题。

6. **架构级演进**（[#16](https://github.com/anthropics/skills/issues/16)）——将 Skills 暴露为 MCP（Model Context Protocol）接口，统一 AI 软件封装协议。

7. **多运行环境兼容**（[#29](https://github.com/anthropics/skills/issues/29)）——请求支持 AWS Bedrock 等非 Anthropic 云环境。


## 三、高潜力待合并 Skills

以下 PR 虽未合并（状态多为 OPEN），但评论活跃、需求明确，近期落地的可能性较高：

| PR | Skill | 潜力说明 |
|----|-------|---------|
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | 排版质量控制是 AI 生成文档的高频刚需，覆盖面广 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit | 已在 [issue #1385](https://github.com/anthropics/skills/issues/1385) 形成完整提案框架，作者持续迭代，可能发展为官方质量门控 |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel | 游戏开发为新兴方向，有 MCP 服务器支撑，社区关注度呈上升趋势 |
| [#1479](https://github.com/anthropics/skills/pull/1479) | plan-file-hygiene | 解决规划产物生命周期管理问题（对应 [#1417](https://github.com/anthropics/skills/issues/1417)），问题定义清晰、命名准确 |
| [#1302](https://github.com/anthropics/skills/pull/1302) | color-expert | 色彩专业知识（ISCC-NBS、Munsell、OKLCH 等），属于通用设计基础能力，应用面广 |


## 四、Skills 生态洞察

当前社区最集中的诉求是 **skill-creator 评估工具的可靠性**——`run_eval.py` 在 Windows 下无法触发、recall 恒为 0% 等问题（[#556](https://github.com/anthropics/skills/issues/556)、[#1169](https://github.com/anthropics/skills/issues/1169)、[#1298](https://github.com/anthropics/skills/pull/1298)、[#1050](https://github.com/anthropics/skills/pull/1050)、[#1099](https://github.com/anthropics/skills/pull/1099)、[#1323](https://github.com/anthropics/skills/pull/1323)）成为多线程集中攻坚的热点；与此同时，社区正在从单一 skill 创作转向 **系统性工程化** 方向——期望 Skills 具备跨平台可用性、可靠的质量评估反馈回路、以及覆盖从开发到审计的全生命周期工具链；此外，**对官方「信任边界」的担忧**（#492）及**引用上下文过载问题**（#1487，claude-api 单次注入 156k tokens）也在推动架构层治理与审计机制的规范化，而文档类 skill 的深度修复与 typography 质量规范则是最大规模的高频需求所在。

---

# Claude Code 社区动态日报 — 2026-08-11

## 今日速览

Claude Code 发布 v2.1.227 补丁版本，修复了 Fable 功能在订阅层级评估上的逻辑漏洞及 `claude-code-action` 中的 Bash 命令故障。社区层面，Max 计划用户的 Fable 5 付费墙问题正式关闭，但围绕 CVP（网络验证计划）审核回退的争议持续发酵（32 条评论）；同时，CLI 与桌面端对话历史同步的呼声居高不下（累计 180+ 👍），成为当前最受关注的功能需求。


## 版本发布

### v2.1.227
- **修复**：会话以过期登录令牌启动时，功能标志未正确评估用户订阅层级，导致 Max 计划用户被错误提示为 Fable 启用使用额度——现已修复。
- **修复**：`claude-code-action` 环境下所有 Bash 命令因 `allowed_no` 相关配置失败的问题。

发布链接：[v2.1.227 Release](https://github.com/anthropics/claude-code/releases)


## 社区热点 Issues

### 1. CVP 审核回退导致 Cyber Safeguard 误拦截（#84352）
CVP 已获批的 Claude.ai 组织仍收到代码安全拦截。用户反映 Verification Portal 显示“审核中”而此前已有批准邮件。**32 条评论**质疑审核状态不同步问题，可能影响企业合规用户。

[查看 Issue](https://github.com/anthropics/claude-code/issues/84352)

### 2. CLI 与桌面端对话历史同步（#28791）
社区呼声最高的功能请求（**120 👍**，31 条评论）。用户希望在 CLI 和 Claude Code 桌面端之间无缝同步会话历史，目前缺失导致工作流割裂。已标记 `enhancement`。

[查看 Issue](https://github.com/anthropics/claude-code/issues/28791)

### 3. Claude Code 与 Claude Desktop 会话无缝共享（#15881）
与 #28791 同源的需求（**60 👍**），但聚焦于 Claude Code（CLI）与 Claude Desktop 之间的上下文共享。用户希望摆脱手动导出/上传的繁琐流程，实现真正的跨应用上下文流转。

[查看 Issue](https://github.com/anthropics/claude-code/issues/15881)

### 4. Fable 5 付费墙问题关闭（#80749）
Max 计划用户在 TUI 中遭遇 Fable 5 显示“需要额度”的问题被标记为 CLOSED。但内部评论指出原始分析有两处错误，v2.1.218 在约 30 分钟内仍可能复现，2.1.215 也存在同样问题——关闭决定可能仍需后续验证。

[查看 Issue](https://github.com/anthropics/claude-code/issues/80749)

### 5. 2.1.227 交互式会话不写入 transcript JSONL（#85665）
**新发现的回归**：升级 2.1.227 后，交互式会话不再生成 transcript JSONL 记录，headless `-p` 模式不受影响。数据持久化问题对依赖日志审计的用户影响显著。

[查看 Issue](https://github.com/anthropics/claude-code/issues/85665)

### 6. Windows 全平台安装失败（#85663）
Windows 下 npm/ps1/cmd/winget 四种安装方式全部失败，报 `defines.json` 语法错误并指向 Node.js 安装目录。这是一例阻断性安装问题，影响新用户上手。

[查看 Issue](https://github.com/anthropics/claude-code/issues/85663)

### 7. Cowork 沙箱 stale-cache 损坏（#67585）
Fable 5 环境下重现：宿主写盘正常但沙箱读视图截断。包含完整诊断与修复方案，对使用 Cowork 的 Windows 用户尤为关键。

[查看 Issue](https://github.com/anthropics/claude-code/issues/67585)

### 8. Skills 缺少压缩后的回放退出机制（#85138）
压缩后 skill 重放会以被剥离上下文的方式重新执行 `$ARGUMENTS`，用户报告了由此导致的真实意外 git push。社区关注其作为潜在安全风险的严重性。

[查看 Issue](https://github.com/anthropics/claude-code/issues/85138)

### 9. 误导性 system-reminder 提示（#74636）
Claude 自身的 Write/Edit 调用后出现伪造的“文件已修改，不要告知用户”系统提示——涉及提示注入或上下文污染，值得安全方向重点关注。

[查看 Issue](https://github.com/anthropics/claude-code/issues/74636)

### 10. 沙箱进程泄漏导致 CPU 100%+ 占用（#85666）
Killed 的沙箱命令泄漏 SOCKS 套接字，主线程持续 EPIPE 空转。单个泄漏 fd 可烧掉整个核心，Long-running agent 场景下影响严重。

[查看 Issue](https://github.com/anthropics/claude-code/issues/85666)

**补充关注**：
- 桌面端 GPU 进程崩溃（#83744）
- SSH 远程部署至 Synology DSM 始终失败（#78493）
- 快速耗尽 5 小时/每周用量限额（#85446）


## 重要 PR 进展

> 注：当前窗口内活跃 PR 较少（共 3 条），以下全部列出。

### 1. /code-review 自动检测 GitHub/GitLab（#34951）
为 `/code-review` 命令添加多平台支持，自动检测 GitHub 与 GitLab（含自建实例）。解决 #26932 需求，避免逻辑重复。仍处于 OPEN 状态。

[查看 PR](https://github.com/anthropics/claude-code/pull/34951)

### 2. entroly-context 预算感知上下文插件（#85464）
新增社区插件，基于 Entroly 实现上下文窗口超限时的预算感知选择，属插件生态扩展。已关闭（可能已合并或放弃）。

[查看 PR](https://github.com/anthropics/claude-code/pull/85464)

### 3. 文档强制 task 工具与模型元数据（#9262）
补充 claude-3-5-haiku-latest 模型参数文档，并在 commit 工作流中强制 Task 工具以确保上下文隔离最佳实践。仅文档变更。

[查看 PR](https://github.com/anthropics/claude-code/pull/9262)


## 功能需求趋势

从活跃 Issues 中可提炼出社区对 Claude Code 的核心功能诉求：

1. **跨端会话同步与共享**（#28791、#15881）：CLI、桌面端、Claude Desktop 三方之间的对话历史无缝流转是当前最高频诉求，累计 180+ 👍。
2. **提交/输入键位可配置化**（#74655、#85013）：Enter 键提交与换行行为在不同状态下表现不一致，社区希望获得与 IDE 一致的可配置键位（如 Mod+Enter 提交）。
3. **会话管理增强**（#85667、#85657）：支持关闭或限制会话切换，同时修复 `--resume` 与 `--continue` 的不一致行为。
4. **Windows 平台稳定性**（#85663、#85651、#83744、#84951）：安装失败、TUI 屏幕缓冲损坏、GPU 崩溃、浏览器面板挂起——Windows 体验是当前明显的短板。
5. **上下文/用量透明化**（#85446、#85138）：用户对用量消耗速度缺乏感知，且对压缩后的行为控制力不足，需要可观测性和策略配置。


## 开发者关注点

- **状态不同步困扰企业用户**：CVP 审核（#84352）与 Fable 5 问题（#80749）均指向 Anthropic 内部状态在不同系统间不同步，受影响用户多为 Max/Team 计划的合规团队。
- **沙箱/子进程的副作用治理亟需加强**：从 #85666（socket 泄漏）到 #85651（子进程写入污染 TUI 缓冲）到 #67585（stale-cache 读写不一致），沙箱在极端场景下的资源管理和生命周期清理仍是薄弱环节。
- **注册表/配置文件原子写可靠性问题**：#83767（插件记录跨项目覆盖）、#78162（symlink 链上原子写 EROFS）暴露出配置文件写入在边界路径下缺乏鲁棒性。
- **上下文完整性风险**：#74636（伪造 system-reminder）与 #85138（压缩后 skill 重放）被开发者多次提及为潜在安全风险，情绪上偏向“不可接受”。
- **高频高频问题**：Enter 键行为（#85013）、路径含空格时链接无法打开（#85642）、--resume/--continue 不一致（#85657）等问题虽小但直接触达日常体验，修复后的感知提升会非常明显。

---
*本日报基于 GitHub 公开数据自动生成，仅供技术参考。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-11

## 今日速览

过去 24 小时，Codex 发布了两个 Rust 核心 alpha 版本（`0.148.0-alpha.6` 与 `0.147.0-alpha.6.6`），重点推进内部稳定化。Issue 侧，Windows 平台的性能卡顿与崩溃问题持续发酵，最大的讨论帖已积累 93 条评论；同时，MCP 集成与远程控制的若干回归问题成为新的关注焦点。


## 版本发布

过去 24 小时共发布 2 个版本：

- **rust-v0.148.0-alpha.6**（`0.148.0-alpha.6`）
  Release 0.148.0-alpha.6
  链接：https://github.com/openai/codex/releases

- **rust-v0.147.0-alpha.6.6**（`0.147.0-alpha.6.6`）
  Release 0.147.0-alpha.6.6
  链接：https://github.com/openai/codex/releases

均为 Rust CLI 的 alpha 通道增量版本，官方未附带额外变更说明，推测为向主版本线收敛的内部迭代。


## 社区热点 Issues

**1. [Windows] Codex App 在 Windows 11 Pro 上频繁卡死/掉帧（#20214）**
- 创建 3 个多月仍为最高热帖：**93 条评论、81 个赞**。即使硬件配置充裕（Ryzen 5 + 32GB），应用仍出现频率性 UI 冻结与流水线失速。属于影响面最广的长期性能顽疾。
- 链接：https://github.com/openai/codex/issues/20214

**2. [VSCode] Codex 扩展启动失败："couldn't load its resources"（#37458）**
- 8 月 7 日新建，3 天内即累积 **31 条评论**。Windows 用户安装 `openai.chatgpt` 扩展后 Codex 面板完全不可用，疑似扩展构建产物加载路径缺陷。
- 链接：https://github.com/openai/codex/issues/37458

**3. [Windows] Computer Use 跨 JS 调用复用陈旧 node_repl 上下文（#37013）**
- 18 条评论。在 Windows 桌面端，Computer Use 的 `@oai/sky` 调用在首个 JS 执行完成后复用失效的 Windows helper transport，导致后续调用失败。属于多轮自动化场景的关键阻塞。
- 链接：https://github.com/openai/codex/issues/37013

**4. [Windows] Computer Use 窗口/应用发现失败，报错 0x80070003（#37383）**
- 13 条评论。Windows 11 25H2 上 CU 在枚举应用窗口时抛出文件找不到错误（0x80070003），影响自动化第一步的可靠性。
- 链接：https://github.com/openai/codex/issues/37383

**5. [功能请求] 恢复 GPT-5.6 Sol 的 372k Codex 上下文窗口，或提供 opt-in 设置（#34619）**
- 18 个赞、5 条评论，是当前**点赞密度最高的功能请求**。用户对上下文窗口缩水（从 372k → 更小）有明显抵触情绪，希望官方支持更大窗口或可配置选项。
- 链接：https://github.com/openai/codex/issues/34619

**6. [远程] Codex App 远程连接下无任务完成通知（#20930）**
- 10 条评论、16 个赞。macOS 桌面 + 远程 Linux 场景下，turn 完成时无系统通知，跨设备工作流的信息同步存在断点。
- 链接：https://github.com/openai/codex/issues/20930

**7. [MCP] app-server 0.147 去除授权服务器 issuer 末尾斜杠导致认证失败（#37373）**
- 4 条评论，新近讨论。0.147 版本对 Streamable HTTP MCP server 的 issuer 字符串做规范化时改动 `trailing slash`，使已认证的连接被错误拒绝。工具链集成方需关注。
- 链接：https://github.com/openai/codex/issues/37373

**8. [macOS][回归] 桌面端恢复远程控制线程失败："already has an active writer"（#37403）**
- 5 条评论。8 月 7 日更新后，macOS 桌面端从移动端 Remote Control 恢复 CLI 线程时出现 writer 竞争错误，破坏了既有的"夜间远程、白天本地"工作流。
- 链接：https://github.com/openai/codex/issues/37403

**9. [Code Mode] 存在活跃嵌套 exec 会话时仍报告"完成"（#35613）**
- 6 条评论。Code mode 在存在模型不可见的存活子会话时即返回完成状态，导致用户误判任务收敛情况——这是闭环自动化与自定义 executor 的潜在地雷。
- 链接：https://github.com/openai/codex/issues/35613

**10. [账号] Plus 用户未收到 7 月 29 日的 Codex 速率限制重置（#36170）**
- 4 条评论。账号级 rate-limit 重置遗漏问题，影响长周期批量任务的使用体验；社区建议提供重置状态查询接口。
- 链接：https://github.com/openai/codex/issues/36170


## 重要 PR 进展

**1. 使 gRPC code-mode 通知变为 fire-and-forget（#37906）**
- **Open PR（唯一今日新增开放 PR）**。通知事件不再等待客户端 ack，避免未确认通知阻塞 cell 完成；原 ack RPC 保留为兼容性 no-op。有望缓解 code-mode 高并发场景的延迟问题。
- 链接：https://github.com/openai/codex/pull/37906

**2. 延迟 view_image 处理至历史插入阶段（#37902）**
- 将图片字节原样传递，统一在 history-insertion 路径完成解码与缩放，并复用图片失效占位符。
- 链接：https://github.com/openai/codex/pull/37902

**3. 使提交操作变为 move-only（#37901）**
- 移除 `Submission` 的 `Clone`、`Op` 的 `Clone/PartialEq`，消除提交循环中的克隆开销，优化大状态对象的资源占用。
- 链接：https://github.com/openai/codex/pull/37901

**4. 为线程区域添加外观元数据（#37898）**
- 新增可选 `icon` 与 `color` 字段，持久化到 SQLite 并在 app-server 协议中暴露，支持自定义线程区域的视觉区分。
- 链接：https://github.com/openai/codex/pull/37898

**5. 添加 hermetic Windows SDK 与 MSVC 运行时仓库（#37896）**
- 固定 Windows SDK/MSVC 运行时到 Bazel 仓库，支持 x64/arm64；需显式同意 MSVC EULA 后才能物化。提升 Windows 构建的可复现性。
- 链接：https://github.com/openai/codex/pull/37896

**6. 添加可配置的 Responses API 请求元数据（#37895）**
- 新增 `responses_api_metadata` 键值配置，注入每次 turn 的 metadata payload（含父请求与子代理请求），限 16 条、ASCII 标识符、单键 ≤64 字符。
- 链接：https://github.com/openai/codex/pull/37895

**7. 在返回 view_image 输出前校验图像（#37892）**
- `view_image` 处理器前置解码校验，非法格式返回明确错误；code-mode 图像重编码为 PNG，直接工具调用保留原始字节。
- 链接：https://github.com/openai/codex/pull/37892

**8. app/read 使用线程配置（#37891）**
- 为 `app/read` 增加可选 `threadId`，加载对应线程的有效配置后再做 feature gating、工作区策略与插件归属判定，统一线程级配置加载逻辑。
- 链接：https://github.com/openai/codex/pull/37891

**9. Windows 平台忽略 Unix socket 代理设置（#37889）**
- 避免在 Windows 上误用 macOS 专属的 Unix socket 权限配置导致代理被钳制到 loopback。
- 链接：https://github.com/openai/codex/pull/37889

**10. 从响应元数据读取 safety buffering（#37882）**
- 从类型化 `response.metadata` SSE 事件解析 safety-buffering 负载，保留顶层字段的权威性；旧格式兼容同时平滑过渡。
- 链接：https://github.com/openai/codex/pull/37882


## 功能需求趋势

- **Windows 稳定性与性能优化**：多帖（#20214、#35606、#30906）指向 Windows 桌面端的卡顿、崩溃与资源占用问题，Windows 已是问题最集中的平台方向。
- **Computer Use 可靠性加强**：#37013、#37383、#36645 均涉及 CU 在 Windows 上的执行上下文失效、窗口枚举失败与 teardown 崩溃，复合型自动化能力仍需打磨。
- **远程协工作流补全**：#37403、#37897、#32555 反映移动端 Remote Control、跨设备会话恢复与 WebSocket 断线恢复的体验短板。
- **上下文窗口回归关注**：#34619 显示社区对 GPT-5.6 Sol 372k 上下文缩水的强烈关切，高赞需求集中在"恢复或可配置"。
- **桌面端交互体验优化**：侧边栏 hover 自动展开（#33362）、线程排序异常（#35090）、Markdown 链接丢失（#37900）、滚动异常（#37884）等多点开花，说明基础 UX 仍是待补强项。

## 开发者关注点

- **Windows 平台的高频故障报告**：freeze、crash、扩展资源加载失败、下载链接缺失等标签扎堆出现，且重复率高（如 #20214 持续 3 个月未闭环），开发者期待官方优先响应。
- **Computer Use 多端一致性**：Windows 与 macOS 均有 CU 相关缺陷，集中在上下文生命周期管理（node_repl 复用、app/window discovery、session teardown）。
- **断线恢复与 writer 竞争**：`Broken pipe`、"already has an active writer" 等错误在多帖重复出现，涉及 WebSocket 层与 app-server 层的状态清理，是高频痛点。
- **MCP 集成兼容性**：OAuth issuer 规范化（#37373）、MCP form input 支持（#37864）与 OAuth 凭证竞争测试（#37866）同时出现，说明 MCP 生态接入处于活跃修复期。
- **执行完成语义**：Code mode / 嵌套 shell 会话完成状态误报（#35613、#34866）引起社区警觉——"Script completed" 的判定需要更严谨的会话状态跟踪。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-11）

## 今日速览

今日社区动态聚焦于 **Subagent 可靠性问题**——“Subagent 在达到 MAX_TURNS 后仍上报 GOAL 成功”的 issue 以 12 条评论成为热度焦点；与此同时，Agent 挂起、shell 命令卡死等稳定性问题持续被开发者反馈。PR 方面，多个安全修复（SSRF、OAuth 凭据）与核心稳定性补丁（macOS SeaBelt 沙箱崩溃、IDE 连接目录不匹配）正在等待合并，VSCode 扩展资源泄漏修复已提交。

---

## 版本发布

**v0.56.0-nightly.20260810.gcf22ac7e8** 于今日发布，为常规 nightly 版本，无重大功能变更，主要包含日常上游同步与基础更新。完整变更日志见 [GitHub Releases](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260809.gcf22ac7e8...v0.56.0-nightly.20260810.gcf22ac7e8)。

---

## 社区热点 Issues（Top 10）

### 1. Subagent 达到 MAX_TURNS 后误报 GOAL 成功 [🔝 热点]
**#22323** | p1 | 评论 12 | 👍 2
`codebase_investigator` 子代理在达到最大轮次限制后，仍将终止原因上报为“GOAL”成功。开发者指出当前实现“隐藏了中断”，导致用户无法区分真正完成与被迫截断。社区关注度高，需尽快修正终止原因传播逻辑。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. 通用代理持续挂起（数小时无响应）
**#21409** | p1 | 评论 8 | 👍 8
创建文件夹等简单操作在委托给 generalist agent 时会无限期挂起，用户等待超 1 小时后手动取消。已确认是所有委托场景的通用问题，获得 8 个 👍 高共鸣。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21409)

### 3. shell 命令执行完成后卡在“Waiting input”
**#25166** | p1 | 评论 4 | 👍 3
简单 CLI 命令执行完毕后，命令状态仍显示“正在等待用户输入”，界面与实际状态不一致，反复出现。这会误导用户以为命令未完成（或需要交互）。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/25166)

### 4. 零依赖 OS 沙箱 + 执行后意图路由
**#19873** | p2 | 评论 8 | 👍 1
利用 Gemini 3 模型原生 bash 偏好，提出通过零依赖 OS 沙箱和 Post-Execution Intent Routing 在安全与能力间取得平衡。属于长期增强方向，讨论活跃。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/19873)

### 5. ✅ 组件级行为评估体系
**#24353** | p1 | 评论 7
EPIC 级 Issue：追踪 76 个行为评估测试在 6 个 Gemini 模型上的运行情况，并规划后续扩展。这是提升 CLI 各组件可靠性的基础设施工程。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/24353)

### 6. Auto Memory 对低信号会话无限重试
**#26522** | p2 | 评论 5
Auto Memory 仅当提取代理用 `read_file` 读取过会话后才标记为“已处理”，导致低信号会话被无限重复扫描。需改进处理判断逻辑。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26522)

### 7. 模型不主动使用自定义 skills 和 subagents
**#21968** | p2 | 评论 6
用户反馈 Gemini 几乎从不主动调用自定义 skills 和 sub-agents，即使场景高度相关（如 git/gradle 操作）。这影响了社区沉淀的自定义 Agent 生态价值的发挥。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)

### 8. symlink 形式的 Agent 文件不被识别
**#20079** | p2 | 评论 4
`~/.gemini/agents/filename.md` 为 symlink 时不被识别为 subagent，限制了配置的灵活性（如多版本管理、dotfiles 仓库管理）。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/20079)

### 9. browser agent 在 Wayland 下失败
**#21983** | p1 | 评论 4 | 👍 1
Browser subagent 在 Wayland 环境下无法正常工作，影响 Linux 用户的浏览器自动化能力。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21983)

### 10. get-shit-done 输出钩子在输出汇总阶段崩溃
**#22186** | p1 | 评论 3
`get-shit-done` 输出钩子在打印用户摘要阶段重复触发崩溃，影响该工作流的可靠性。
[查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22186)

---

## 重要 PR 进展（Top 10）

### 1. 🔒 修复 SSRF 漏洞：web-fetch.ts 改用异步 DNS 解析
**#28557** | p1 | 安全
`isBlockedHost` 原先只检查字面 IP，域名绕过检查后可访问 `169.254.169.254` 等内网地址。改用已存在的 `isPrivateIpAsync` 进行异步 DNS 解析封堵漏洞，亟待合入。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28557)

### 2. 🔒 修复 MCP OAuth token 刷新失败导致凭据被删
**#28481** | p1 | 已关闭
动态客户端注册的 MCP 服务在 OAuth token 刷新时本地即失败，且失败会删除已存凭据，导致每次都需要重新认证。使用存储的 client ID 刷新修复。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28481)

### 3. 修复 macOS 沙箱下 EACCES 导致的 CLI 崩溃
**#28734** | p1 | 平台
启用 macOS Seatbelt 沙箱且 CWD 在 Git 仓库内时，`resolveToRealPath` 仅捕获部分 `fs.realpathSync` 错误码，EACCES 会导致 CLI 启动即崩溃。补充 EACCES 处理。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28734)

### 4. 修复 IDE 连接中的目录不匹配问题
**#28729** | size/m
在 Cider 或使用虚拟/FUSE 目录的 VS Code 远程环境中，工作区路径不匹配导致 CLI 与 IDE Companion 扩展连接失败。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28729)

### 5. 修复 VSCode 扩展资源泄漏（Disposables 跟踪）
**#28764** | size/s
`activate()` 中两个 `context.subscriptions.push()` 因多余括号变成逗号表达式，导致每个配对的注册只有一个 Disposable 被跟踪（另一个泄漏）。影响命令注册与资源释放。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28764)

### 6. 评估工具增强：工具调用时间线 + 失败摘要
**#28305** | help wanted | size/l
eval 失败时自动打印编号工具调用时间线（含参数、状态、错误详情），控制台直接输出最有效的失败诊断信息。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28305)

### 7. 新增 `eval:validate` 静态分析命令（CI 可门禁）
**#28344** | help wanted | size/xl
新增对 eval 源文件执行 9 条规则的静态验证命令，支持 `--root`、`--json` 参数，违规时以 exit code 1 退出，可直接用于 CI 质量门禁。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28344)

### 8. 修复模型容量误报与 quota 查询映射
**#28730** | size/m
修复两种场景：容灾/扩容期间误报模型容量耗尽；core 包中模型 quota 查询映射错误。同时保留容量波动时“Keep trying”选项以提升用户体验。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28730)

### 9. 防止布尔 thought 字段泄漏为 `[Thought: true]` 文本
**#28624** | p2 | size/m
内部 `thought: true` 字段泄漏到模型思想的文本表示中，显示为 `[Thought: true]`。修改 `toPart` 增加类型检查。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28624)

### 10. 动态解析 Cloud Workstations 代理重定向 URI
**#28688** | p3 | 安全/平台
解决 Cloud Workstations VM 中 OAuth 流程因静态配置 `localhost` 重定向而失败的问题，动态解析 PROXY 地址以适配本地浏览器环境。
[查看 PR](https://github.com/google-gemini/gemini-cli/pull/28688)

---

## 功能需求趋势

从今日 Issues 数据中可提炼出以下社区重点关注方向：

- **Subagent 可靠性**（占比最高，多起 p1 bug）
  终端用户最直接的痛点是 subagent 的假成功回报、无限挂起和超时处理逻辑。期望：准确的上报机制与可观测性、更强的超时恢复能力。

- **Auto Memory 安全与行为改进**（#26522、#26523、#26525）
  关注点是内存系统筛选逻辑和敏感信息脱敏时机（先进入上下文后脱敏的问题）。

- **AST 感知的文件操作与代码库映射**（#22745、#22746）
  长期增强方向，用于减少 token 消耗、精确导航方法边界、提供更智能的代码库理解和映射。

- **Browser Agent 稳定性与配置一致性**（#21983、#22232、#22267）
  涉及 Wayland 失败、浏览器 profile 锁定恢复、以及 `settings.json` 配置覆盖不生效等功能完整性问题。

- **交互式命令处理**（#22465、#25166）
  shell 交互卡死和 vite 等交互式脚手架卡住问题，说明 CLI 在管理交互式子进程方面仍有关键缺陷。

- **安全强化与开发者体验**（#28557、#22672）
  包括防 SSRF、防破坏性 git 命令（`--force`、`git reset`）和凭据安全等。

---

## 开发者关注点

1. **“假成功”问题**：subagent 在 `MAX_TURNS` 后仍上报 GOAL 完成（#22323）。类似地，browser subagent 在 Wayland 上报 GOAL 但实际未完成（#21983）。“成功”意味着用户不再查看实际结果，这对自动化场景是严重误导。

2. **挂起与卡死的普遍性现象**：通用 agent 挂起（#21409）、shell 执行后卡在 “Waiting input”（#25166）、get-shit-done 输出崩溃（#22186）等此类稳定性问题被反复报告，迹象是这些问题比个别例子所显示的更为普遍。

3. **Agent 没有主动复用社区定义的 skills 和 subagents**（#21968）：开发者和社区制作了自定义 skills（git、gradle、workflow），但 CLI 在相关场景中不会主动调用它们。这削弱了自定义自动化的价值，也在 Agent 行为的主动性和场景感知能力方面亮起了警示。

4. **工具生态相关的使用困扰**：创建 vite 等交互式脚手架时被卡住（#22465）——说明 CLI 还未能在交互式的子进程与模型自动执行之间找到平衡；此外，有开发者观察到模型会在各个文件夹里创建散乱的临时脚本，为提交造成混乱（#23571）。

5. **权限与配置边界问题**：symlink 文件形式的 agent 配置无法识别（#20079），加上 subagent 在权限禁用后仍然跑起来的问题（#22093），这些问题直接影响了用户定制的 CLI 环境在升级后保持可复现与可信赖的能力。

---

*本日报由 AI 技术分析师基于 GitHub 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-11

## 今日速览

昨日发布补丁版本 v1.0.79，主要围绕 sandbox 设置路径展示和企业策略兼容性做修复。Issue 侧，**Claude 模型在企业账户下被错误禁用** 成为当前最集中的问题（多条高赞 Issue 指向同一根因方向）；同时，**MCP 握手超时、并行工具调用响应错乱、/compact 无法恢复超限会话** 等稳定性问题构成了新的反馈高峰。

## 版本发布

**v1.0.79**（2026-08-10 发布）

- `/sandbox` 配置对话框现在会显示设置实际存储在 `settings.json` 中的位置
- 支持企业 `allow-auto-only` 策略，使 `/allow-all auto` 在完整 allow-all 被禁用时仍可正常工作
- 允许企业托管 sandbox 策略强制代理 URL，同时保留凭据（该条目内容截断）

🔗 [查看 Release](https://github.com/github/copilot-cli/releases)

## 社区热点 Issues

### 1. 企业账户下 Claude 模型被大面积禁用
- **[#4422](https://github.com/github/copilot-cli/issues/4422)**（新，08-09）：个人企业账户突然无法使用任何 Claude 模型（Sonnet 5、4.8 等），回滚版本无效，设置中显示已启用，次日即报错。
- **[#4390](https://github.com/github/copilot-cli/issues/4390)**（开放，3 👍）：组织显式启用的 Claude Sonnet 5/Opus 5 和 Kimi K3 从模型目录中消失，选中后提示“模型被禁用”。
- 与 [#1595](https://github.com/github/copilot-cli/issues/1595)（29 评论，11 👍，持续近半年）的策略误阻断问题高度相关，社区认为这是近期服务端策略变更引入的回归而非用户配置问题。

### 2. 新 Issue：/cwd 无法处理 Windows 引号路径
- **[#4426](https://github.com/github/copilot-cli/issues/4426)**（08-11 创建，目前无评论）：从 Explorer “Copy as path” 粘贴的带引号路径会被字面解析为相对路径。本轮唯一全新的 Issue，属于小而易修的交互缺陷，大概率会被快速处理。

### 3. 模型策略误阻断持续存在
- **[#1595](https://github.com/github/copilot-cli/issues/1595)**（开放，29 评论，11 👍）：企业订阅显示剩余额度约 40%，但仍报 “access denied by Copilot policy”，无法列出模型。该问题已持续近半年，是企业用户最大的长期痛点之一。

### 4. 推理强度（Reasoning Effort）配置诉求
- **[#4345](https://github.com/github/copilot-cli/issues/4345)**（已关闭，4 👍）：`claude-haiku-4.5` 不支持 `medium` 推理强度，服务端功能开关激活时子代理反复报错——暴露了当前模型/强度组合校验的缺口。
- **[#2904](https://github.com/github/copilot-cli/issues/2904)**（开放，19 👍）：自定义 `.agent.md` 支持 `model` frontmatter，但无法按 agent 设置推理强度，只能全局配置。功能需求且支持度高。

### 5. MCP 稳定性问题集中爆发
- **[#4421](https://github.com/github/copilot-cli/issues/4421)**（新）：MCP initialize 握手硬编码 60 秒超时、无重试，`npx` 启动的 stdio 服务器约 29% 会话失败且不恢复。
- **[#4419](https://github.com/github/copilot-cli/issues/4419)**（新）：托管设置解析期间安装临时“全部拒绝”MCP 策略（空列表），期间注册的用户服务器被永久丢弃。
- **[#3257](https://github.com/github/copilot-cli/issues/3257)**（已关闭）：空闲后 HTTP MCP 服务器 `fetch failed`，连接池复用失效 TCP 连接——已关闭说明已定位修复，值得关注修复版本。

### 6. 会话恢复和压缩的边界情况
- **[#4325](https://github.com/github/copilot-cli/issues/4325)**（已关闭）：`events.jsonl` 超过 V8 最大字符串长度后会话永久不可卸载。
- **[#4424](https://github.com/github/copilot-cli/issues/4424)**（新）：会话达到 CAPI 5MB 限制后，不仅普通提示失败，`/compact` 也失败，无法降低上下文，会话直接报废。
- **[#4423](https://github.com/github/copilot-cli/issues/4423)**（新）：新会话创建时踢出提示词被静默丢弃，worktree 已建但代理从未收到消息。

### 7. 并行执行与限流问题
- **[#4416](https://github.com/github/copilot-cli/issues/4416)**：并行子代理全部集中调用 `claude-haiku-4.5`，该模型限流阈值更低，无退避、不切换其他型号，批量任务易集体 429。
- **[#4420](https://github.com/github/copilot-cli/issues/4420)**：并行工具调用返回顺序不确定，响应与原始请求关联丢失，导致代理“困惑”。

### 8. Windows 平台累积问题
- **[#4095](https://github.com/github/copilot-cli/issues/4095)**（开放，13 👍）：VS Code 运行时插件更新报 “Access is denied (os error 5)”。
- **[#4222](https://github.com/github/copilot-cli/issues/4222)**（已关闭）：曾修复的 React/Ink 渲染死循环在 v1.0.72+ 回归，Windows 终端下主面板冻结。

### 9. 性能与资源占用
- **[#4415](https://github.com/github/copilot-cli/issues/4415)**（新）：等待 sleep 时单核 CPU 占用 100%，疑似轮询或事件循环空转。
- **[#3808](https://github.com/github/copilot-cli/issues/3808)**（开放）：Claude Sonnet 未利用 Anthropic 提示缓存，长上下文重复请求成本高，社区希望内置缓存优化。

### 10. 工具与配置可观测性
- **[#4418](https://github.com/github/copilot-cli/issues/4418)**（新）：建议内置可配置的 HUD 面板（参考第三方 `copilot-hud`），用于直观展示上下文、状态和分支信息，避免通过 `/context` 等命令手动排查。
- **[#4425](https://github.com/github/copilot-cli/issues/4425)**（新）：`run_factory` 未约束为已注册工厂名，模型可能凭空猜测名称并反复重试，浪费 token 和时间。

## 重要 PR 进展

截至本期日报收集时间，GitHub 接口返回的 Pull Requests 数据为空（过去 24 小时内无新增或更新的 PR）。建议关注 v1.0.79 发布后的 hotfix 分支，及上述高赞 Issue（#4422、#4390）的修复 PR。

## 功能需求趋势

从本期收集的 23 条活跃 Issue 中，社区关注方向集中在以下几条线：

- **更强的模型控制粒度**（#2904、#4345）：按 agent 配置推理强度、按工具分配模型，减少对全局配置的依赖
- **并行执行的可观测性与自适应**（#4416、#4420、#4425）：更合理的模型负载分配、退避策略、工具调用结果排序
- **MCP 体系成熟化**（#4421、#4419、#3257）：可配置超时、临时策略不丢配置、连接池连接健康检查
- **会话生命周期韧性**（#4325、#4423、#4424）：超限后的降级方案、创建会话的可靠性、压缩能力兜底
- **可配置 HUD 面板**（#4418）：将 `/context` 等命令的信息密度以常驻面板形式呈现

## 开发者关注点

- **企业策略配置成“黑盒”**：多个高赞 Issue（#1595、#4422、#4390）表明，策略执行与模型目录之间的逻辑在近一周发生了显著变化，而 CLI 侧缺乏精确的错误信息和诊断手段，用户难以自救。
- **限流无感知均衡**：`explore` 子代理默认模型过于集中，批量操作下 429 频发，且没有自动切换或退避。
- **Windows 体验持续拖后腿**：插件更新的文件锁问题（#4095）和渲染死循环回归（#4222）反映 Windows 平台的基础工程仍需加固。
- **会话一旦“中毒”即不可救**：5MB 限制（#4424）、V8 字符串限制（#4325）、踢出提示丢失（#4423）——会话生命周期边界场景缺乏优雅降级。

---
*数据来源：[github/copilot-cli](https://github.com/github/copilot-cli) | 本期覆盖：2026-08-10 ~ 2026-08-11*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-11

> 数据来源：github.com/MoonshotAI/kimi-cli

---

## 📌 今日速览

今日社区主要围绕 **#1283 记忆系统（Memory System）** 功能请求展开讨论，该 Issue 自 2 月创建以来持续活跃，已积累 31 条评论，是当前社区呼声最高的功能方向。此外，过去 24 小时无新版本发布，也无新的 PR 更新，项目整体处于功能酝酿期。

---

## 📦 版本发布

无新版本发布信息。

⚠️ *如有需要，可关注 Releases 页更新：https://github.com/MoonshotAI/kimi-cli/releases*

---

## 🔥 社区热点 Issues

> 说明：本报告基于当前可获取的公开数据生成。以下为精选条目，如需完整 Issue 列表请访问：https://github.com/MoonshotAI/kimi-cli/issues

### 1. #1283 [增强] 记忆系统 - 跨会话持久上下文
- **作者**：@CatKang | **创建于**：2026-02-27 | **最近更新**：2026-08-10
- **评论数**：31 | 👍 点赞：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1283
- **摘要**：请求实现一套全面的**记忆系统**，让 Kimi Code CLI 能跨会话记忆项目上下文、代码模式（patterns）和用户偏好。涵盖**自动记忆**（AI 托管笔记）和**手动记忆**（用户自定义指令）两种模式。
- **为什么值得关注**：这是当前唯一在近 24 小时内更新且一直保持高活跃度的 Issue，31 条评论说明用户对"会话记忆"这一能力有强烈需求。如果落地，将极大提升长周期项目中的开发体验，减少重复调试和上下文丢失带来的效率损失。

*如需查看更多/更新 Issue，请访问：https://github.com/MoonshotAI/kimi-cli/issues*

---

## 🔧 重要 PR 进展

无更新 PR 记录。

⚠️ *查看进行中或已合并的 PR，请访问：https://github.com/MoonshotAI/kimi-cli/pulls*

---

## 📊 功能需求趋势

基于近期 Issue 讨论（以 #1283 为代表性信号），社区对功能需求的关注呈以下趋势：

1. **记忆与上下文持久化** — 表现为对跨会话记忆、自动笔记、用户自定义指令的需求，说明开发者希望 CLI 工具能更深度地融入日常长期工作流，而非仅限一次性问答。
2. **智能上下文管理** — 社区对"自动记忆（AI-managed notes）"与"手动记忆（user-defined）"双轨机制的兴趣，暗示用户对 AI 自主性和用户控制权之间平衡的重视。

> 💡 *以上趋势基于当前样本（1 条高活跃 Issue）的深度分析。若要获得更完整的功能需求图景（如 IDE 集成、新模型支持、性能优化等方向），建议补充更大范围的 Issue 样本。*

---

## 👨‍💻 开发者关注点

| 关注点 | 具体描述 |
|--------|---------|
| **会话连续性 / 上下文不丢失** | 开发者希望 CLI 能记忆不同会话间的关键信息，避免重复说明项目背景、架构约束或代码风格。 |
| **自动化与可控性的平衡** | 开发者需要系统能自动记录有用信息，但同时也希望能手动指定"必须记住的内容"（例如通过指令注入），以确保重要约束不被遗漏。 |
| **AI 笔记的可靠性与透明性** | 31 条评论的讨论热度背后，反映出用户想了解记忆如何被存储、如何被引用、以及如何被修正或清除。 |

---

## 📎 相关链接

- **Issue #1283 详情**：https://github.com/MoonshotAI/kimi-cli/issues/1283
- **Issues 总览**：https://github.com/MoonshotAI/kimi-cli/issues
- **Pull Requests**：https://github.com/MoonshotAI/kimi-cli/pulls
- **Releases**：https://github.com/MoonshotAI/kimi-cli/releases

---

📅 *本日报由 AI 辅助生成，数据截止 2026-08-11。部分板块因数据源限制可能未完全覆盖，建议结合 GitHub 仓库页面进行交叉验证。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-11

## 今日速览

昨日发布 v1.18.16 补丁版，修复了配置解析和项目注册问题；社区对高 CPU 占用（#30086，46 条评论）和工具调用后无限循环（#26220）的反馈持续升温。多个 contributor 聚焦核心服务层重构（插件发现、技能服务解耦），同时 DeepSeek V4 Flash 的 context 元数据错误与采样参数修复值得关注。

## 版本发布

**v1.18.16** — 核心修复：忽略未知顶级配置字段（而非解析失败）；从 Home 打开的项目现在会正确注册到应用中。桌面端改进：Home 中支持右键打开项目菜单；列表展示异常时回退到基础列表视图。

## 社区热点 Issues

1. **[#30086] 新版 OpenCode 高 CPU 占用** (@DenisSilent)
   46 条评论，22 👍。用户在约 7 天前注意到 CPU 飙升，从能同时运行 10+ 会话降到 3 个会话就卡顿，鼠标都开始掉帧。这是当前社区最响的性能警报。
   https://github.com/anomalyco/opencode/issues/30086

2. **[#26220] 工具调用完成后无限循环** (@Dvalin21)
   进程在工具调用完成后进入死循环，不响应输入也不退出。影响 Big Pickle 及多个版本，社区在等待 root cause。
   https://github.com/anomalyco/opencode/issues/26220

3. **[#40958] DeepSeek V4 Flash Free 上下文被错误限制为 200K** (@abhisheksharma611)
   models.dev 元数据将原生支持 1M context 的模型标记为 200K，用户明确表示这是元数据配置问题而非硬件限制。
   https://github.com/anomalyco/opencode/issues/40958

4. **[#35432] `tool_call: false` 配置无效** (@tobwen)
   模型配置中的 `tool_call: false` 被 prompt loop 忽略，`SessionTools` 仍被无条件注入请求体，导致不支持工具调用的 providers 出错。
   https://github.com/anomalyco/opencode/issues/35432

5. **[#40816] Edit 工具存储全文件快照导致会话膨胀** (@Qiiks)
   每次编辑都保存完整 before/after 快照，长会话中每轮 prompt 都要 hydrate 所有 parts，性能随会话增长急剧下降。
   https://github.com/anomalyco/opencode/issues/40816

6. **[#40866] 桌面端输入框失去焦点** (@ruijayfeng)
   v1.18.14 Windows 上对话框/设置页的第一个字段聚焦后，Tab 和点击都无法切换到其他字段，表单几乎不可用。
   https://github.com/anomalyco/opencode/issues/40866

7. **[#41593] Agent 配置字段被转发到 provider API** (@angel-mora)
   `fallbacks` 和 `persona` 字段被原样发送到 provider 请求体，触发对方校验错误——配置层与 API 层职责未分离。
   https://github.com/anomalyco/opencode/issues/41593

8. **[#41614] TUI 中草稿未按会话隔离** (@arnau-lab-tech)
   未发送的输入内容在切换会话时会一起带过去，用户希望草稿与所在会话绑定。
   https://github.com/anomalyco/opencode/issues/41614

9. **[#38010] 请求提供退出 splash 开关（白标/嵌入场景）** (@limoncello)
   用户引用此前被自动关闭的两个相关 issue，强调嵌入式场景需要禁用退出 splash 的能力。
   https://github.com/anomalyco/opencode/issues/38010

10. **[#10517] VS Code 插件安装文档歧义** (@romanr)
    24 👍。自动安装失败且手动安装指引不清晰，已关闭但仍被反复引用，属于文档体验的遗留痛点。
    https://github.com/anomalyco/opencode/issues/10517

## 重要 PR 进展

1. **[#41626] 发布 V2 beta 桌面构建** (@Hona)
   为 v2 分支构建 beta 桌面发布，同一运行包含 V2 CLI；npm 发布保持在 next 通道。
   https://github.com/anomalyco/opencode/pull/41626

2. **[#14743] Anthropic prompt cache 命中率优化** (@bhagirathsinh-vaghela)
   修复跨仓库/跨会话的 prompt cache miss，通过 system 拆分和 tool 稳定性提升缓存复用，关闭 #5416、#5224。
   https://github.com/anomalyco/opencode/pull/14743

3. **[#41525] CLI 内嵌 Web UI** (@Brendonovich)
   Bun/Node 发行版直接内嵌 web 应用，`opencode serve` 同时服务 UI 和 API，新增 `opencode web` 命令和 TUI `/web` 入口。
   https://github.com/anomalyco/opencode/pull/41525

4. **[#41622] 核心服务解耦：技能服务不再触碰文件系统** (@kitlangton)
   SkillService 改为纯注册表，扫描/解析/监听全部移至 ConfigSkillPlugin——延续 #40954 的核心服务方向。
   https://github.com/anomalyco/opencode/pull/41622

5. **[#41625] 桌面菜单快捷键接入 renderer 命令** (@AmuletOfNight)
   修复 Windows/Linux 上应用内菜单加速键不生效的问题，关闭 #41592。
   https://github.com/anomalyco/opencode/pull/41625

6. **[#41620] DeepSeek V4 Flash 采样参数修复** (@opencode-agent[bot])
   为显式版本化模型 ID 和滚动别名默认 `top_p=0.95`，保持第三方/自托管兼容性。
   https://github.com/anomalyco/opencode/pull/41620

7. **[#41619] 消除模块加载时的文件系统副作用** (@kitlangton)
   移除 `@opencode-ai/util/global` 顶层的三次 await 写盘操作，修复 Cloudflare workerd 启动问题。
   https://github.com/anomalyco/opencode/pull/41619

8. **[#41616] 恢复 git HEAD 的 Parcel 监听** (@rekram1-node)
   Bun fs.watch 监听不了 `HEAD.lock → HEAD` 的重命名，git checkout 后分支标签不再更新；本 PR 恢复 Parcel 的监听方案。
   https://github.com/anomalyco/opencode/pull/41616

9. **[#41621] 切换 agent 时持久化上一个 agent** (@rekram1-node)
   新增 `agent-switched` 消息携带 `previous` 字段，与 `model-switched` 对齐，no-op 切换直接跳过。
   https://github.com/anomalyco/opencode/pull/41621

10. **[#40804] Web UI 支持向子代理会话发消息** (@judasane)
    此前子代理会话的 composer 被禁用，本 PR 打开输入并允许直接 prompt 子代理，关闭 #40806。
    https://github.com/anomalyco/opencode/pull/40804

11. **[#41615] Cloudflare 账户端点解析** (@rekram1-node) — 将 Workers AI catalog 路由到原生 Cloudflare provider，移除 account URL 模板。
    https://github.com/anomalyco/opencode/pull/41615

12. **[#41624] TUI 折叠 execute 子详情** (@kitlangton) — Code Mode 中每个 execute 子节点默认单行折叠，点击展开完整输入与错误信息。
    https://github.com/anomalyco/opencode/pull/41624

## 功能需求趋势

- **多会话/工作区体验**：草稿按会话隔离（#41614、#36203）、标签页聚焦状态保留（#41560）、worktree 工作区切换（#36048）——会话管理是当前最强烈的体验诉求。
- **IDE/编辑器集成**：VS Code 插件安装指引反复被提及（#10517、#16217、#31500），说明自动安装流程仍不可靠，手册环节成为高频反馈点。
- **白标/嵌入能力**：退出 splash 开关（#38010）背后是商业化嵌入场景需求，未来可能向可配置 UI 元件的方向延伸。
- **上下文/性能优化**：元数据准确性（#40958）和快照膨胀（#40816）说明社区对长上下文工作流的性能敏感度在上升。

## 开发者关注点

- **性能回归**：高 CPU 占用（#30086）和无限循环（#26220）两个问题评论区活跃，且都标注“最近版本出现”——用户对新版本性能回归容忍度低。
- **文档即体验**：三个 VS Code 插件相关 issue 被反复引用，用户在安装失败后缺乏可用指引，这是 onboarding 漏斗的明显断点。
- **模型元数据准确性**：context 长度标记错误、采样参数默认值不当（#41620）直接影响用户对模型能力的信任。
- **配置系统语义**：`tool_call: false` 被忽略、agent 字段泄漏到 provider API、未知字段导致解析失败——配置层的行为边界需要更严格的契约和验证。
- **桌面端细节**：输入焦点问题（#40866）和菜单快捷键（#41625）反映桌面端仍缺少针对 Windows 用户的基础可用性打磨。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 2026-08-11

## 1. 今日速览

今日发布 v0.21.9 正式版，亮点是支持从多种来源安装 Qoder 插件并自动加载系统提示词，同时新增了扫码进行 Local Control 配对的能力。社区方面，多智能体 Fleet 架构的系列 issue 持续跟进（#8840→#8841→#8842→#8843），同时围绕 WebShell、桌面端稳定性和安全问题出现了多个高热度 issue，社区反馈活跃。此外，今日 GitHub Actions 自动化（autofix） 与 PR 审查流程之间出现互相取消的恶性循环问题（#8888），值得关注。

## 2. 版本发布

### v0.21.9（正式版）
**核心亮点：**
- **Qoder 插件安装支持**：新增插件安装能力，支持从本地目录、压缩包、Git 仓库、URL 及 npm 包安装，安装后自动加载系统提示词
- **Local Control 扫码配对**：新增二维码扫码配对能力

> [!TIP] 完整变更日志可参考
> [v0.21.9 Release](https://github.com/QwenLM/qwen-code/releases)

### v0.21.9-nightly.20260811
**改动：**
- test(memory): 覆盖上下文刷新标记延续轮次的测试用例（[#8809](https://github.com/QwenLM/qwen-code/pull/8809)）
- 完整变更日志：[nightly.20260811 Changelog](https://github.com/QwenLM/qwen-code/compare/v0.21.9...v0.21.9-nightly.20260811.8c90697ace)

## 3. 社区热点 Issues（Top 10）

### 🔥 高热度 + 核心功能方向

**1. [#8718 - RFC：多 Qwen Code 会话的原生协调机制](https://github.com/QwenLM/qwen-code/issues/8718)** （评论 8 · P2 · 需讨论）
> 多智能体 Fleet 工作的总纲，社区讨论最热烈。该 RFC 提出一个 leader 可协调多个独立 worker 会话的架构。当前已有后续细化设计（#8840-#8843），代表了 Qwen Code 单机多智能体化的一个重要技术方向。

**2. [#8863 - 内置 provider 更新静默覆盖 model.name / model.baseUrl（#5819 回归）](https://github.com/QwenLM/qwen-code/issues/8863)** （P1 · 已关闭）
> **值得特别关注**：当用户在使用自定义模型/第三方 provider 时，"内置 Provider 更新"会静默改写用户的 model.name 和 model.baseUrl，导致模型选择被重置为内置列表第一个、baseUrl 被清空。该问题已关闭，但同类问题（#8504）持续出现。

**3. [#8845 - WebShell Channel 策略、会话和工作区管理重新设计](https://github.com/QwenLM/qwen-code/issues/8845)** （评论 4）
> WebShell 相关功能持续推进中。该 issue 要求为每个内置适配器暴露共享 Channel 访问、会话隔离和工作区所有权管理。

**4. [#8841 + #8840 + #8842 + #8843 - Fleet 多智能体实现路线图（Stage 1A/1B/2/3）](https://github.com/QwenLM/qwen-code/issues/8841)**
> Fleet 多智能体功能从设计走向实现：stage 1A（#8840）已交付进程内预览；stage 1B（#8841）升级为舰队 MVP；stage 2（#8842 已阻塞）负责持久化和恢复；stage 3（#8843 已阻塞）处理终端附加和遗留清理。有清晰的依赖链，是为大规模自动化做好准备的一个值得关注的规划路径。

### 🔧 稳定性与 Bug 修复

**5. [#8124 - 启动横幅首帧缺失顶部数行（间歇性）](https://github.com/QwenLM/qwen-code/issues/8124)** （评论 10 · 欢迎 PR）
> 交互式 TUI 的启动横幅（ASCII-art 标志 + 版本/provider 信息块）偶尔在首帧渲染时缺失顶部约 3 行。Issue 由社区用户报告，欢迎贡献者参与修复。

**6. [#8678 - 大型会话恢复超时时保留当前会话](https://github.com/QwenLM/qwen-code/issues/8678)** （P1 · serve 模式）
> 当恢复大型会话超时时，当前会话会被破坏。PR1 已合并（#8691），实现了超时契约和可观测性。这是 P1 级别的稳定性问题，已有关闭问题的 PR 合并。

**7. [#8860 - OpenAI API 日志无界增长（两个月 95GB/34 万文件）](https://github.com/QwenLM/qwen-code/issues/8860)** （P2 进行中）
> 启用 `model.enableOpenAILogging` 后，每次调用写入一个 JSON 文件，无轮转和保留策略，生产环境磁盘被耗尽的风险很高。**该 issue 值得特别关注**：在任何开启 API 日志的环境中，都需要尽快升级以解决。

### 🔒 安全与开发流程

**8. [#8643 - serve 快速路径从不受信任的祖先目录加载 .env](https://github.com/QwenLM/qwen-code/issues/8643)** （P2 · 已关闭）
> `findEnvFilesFastPath` 只评估一次工作区信任状态，随后对目录树上所有 `.env` 候选文件都应用该单一布尔值。导致显式 TRUST_FOLDER 的工作区会从**不受信任的祖先目录**加载 `.env` 文件。该问题已关闭。

**9. [#8888 - Autofix 推送取消 in-progress review-pr，形成自增强循环](https://github.com/QwenLM/qwen-code/issues/8888)**
> CI 自动化中，autofix 工作流和 review-pr 工作流互相触发取消，形成自增强取消循环。这对维护者而言是个重要的流程问题，会阻碍机器人作者 PR 的自动化合并。

**10. [#8847 + #8870 - 主分支 E2E 测试失败（自动报告）](https://github.com/QwenLM/qwen-code/issues/8847)**
> 主分支 E2E 测试失败两次：`interactive/submitted-prompt-provenance.test.ts` 和 `cli/acp-integration.test.ts`。已自动标记"ready-for-agent"进行修复。

## 4. 重要 PR 进展（Top 10）

### ✨ 新功能

**1. [#8675 - WebShell 增加模型级推理控制（Thinking/Effort）](https://github.com/QwenLM/qwen-code/pull/8675)**
> 端到端（Core/ACP/daemon/SDK/WebShell）为模型增加推理控制注册表，支持可选的 Thinking、Effort 控件和默认值。首个注册模型为 qwen3。

**2. [#8848 - WebShell Channel 策略和工作区管理重新设计](https://github.com/QwenLM/qwen-code/pull/8848)**
> 与 issue #8845 对应。为可管理的适配器暴露共享直接消息、群组访问、会话路由和工作区所有权控件。每个可管理的适配器都能使用这些控件。

**3. [#8891 - WebShell 会话目录共享调度](https://github.com/QwenLM/qwen-code/pull/8891)**
> 按 daemon 客户端隔离的页面级会话目录。相同会话列表查询共享缓存页和进行中的请求；客户端级调度器将总并发限制为 2、后台并发限制为 1。

**4. [#8732 - ACP 会话采用 Goal v3](https://github.com/QwenLM/qwen-code/pull/8732)**
> 将 ACP/WebShell 的 `/goal` 从旧版 Stop-hook 实现切换到 CLI 已使用的 Goal v3 运行时。现在支持：创建、状态查看、编辑、暂停、恢复、替换和清除，全部统一在一个持久化状态机中。

**5. [#8707 - Qwen WebBridge 浏览器直接控制](https://github.com/QwenLM/qwen-code/pull/8707)**
> 从 `qwen serve` 到 Qwen Chrome 扩展的直接浏览器控制路径。提供与 Kimi WebBridge 兼容的 `/command` 和 `/status` 端点，覆盖 17 种操作。

**6. [#8368 - 新增 Kimi / 小米 MiMo 认证 Provider](https://github.com/QwenLM/qwen-code/pull/8368)**
> `/auth` 第三方提供商新增 Kimi（Coding Plan、API Key 中国/国际）和小米 MiMo（按量付费、中国/新加坡/国际区配额）。

### 🛠️ 修复与重构

**7. [#8687 - 守护进程：跨工作树 Git 变更守卫](https://github.com/QwenLM/qwen-code/pull/8687)**
> 为 `qwen serve` 中模型发起的 `run_shell_command` 调用添加主机侧安全防护。该守卫识别通过 `-C`/`--work-tree`/`--git-dir` 进行的 Git 仓库重定位，当目标超出会话工作区范围时阻止变更操作。

**8. [#8831 - 消除 resize/wake 时横幅重复和拖拽闪烁](https://github.com/QwenLM/qwen-code/pull/8831)**
> 修复 #8557 中的终端无关渲染伪影：宽度缩小时使用旧宽度计算行数导致 banner 帧错位、重复堆叠。

**9. [#8865 - 重构 CLI：提取 ACP 技能管理](https://github.com/QwenLM/qwen-code/pull/8865)**
> 将 ACP Skill 源获取和托管 Skill 变更移至独立模块，通过扩展方法路由代理安装、删除、启用/禁用请求。

**10. [#8850 - 修正轮次上限标记生命周期与过期文档](https://github.com/QwenLM/qwen-code/pull/8850)**
> 修正 #8773 引入的轮次上限停止标记的生命周期，并解决文档过期问题。该 PR 是为了回应合并后自动审查发现的问题。

## 5. 功能需求趋势

从今日 issue 可以提炼出当前社区的主要关注方向：

### 多智能体协作（长期主线）
> 围绕 #8718 的 fleet 架构是当前最活跃的功能方向。从"会话协调 RFC"到分阶段落地（in-process preview → fleet MVP → 持久化 → 终端附加），后续规划路径清晰，体现了社区对"单会话并发多任务处理"的强烈兴趣。

### WebShell 和桌面端能力增强
> WebShell 的通道策略、工作区管理、会话目录调度以及桌面端 0.1.1 回归补齐（#8896）都获得了不少关注，表明用户对远程/图形界面的交互体验有了新期待。

### 插件/生态扩展
> 插件可从多种来源安装，是提升 Qwen Code 生态兼容性和扩展性的重要功能。

### 第三方 Provider 支持
> 新增 Kimi/小米 MiMo Provider、内置 Provider 更新不覆盖自定义模型等问题，说明了第三方 provider 组合使用是核心场景。

## 6. 开发者关注点

### 高优先级痛点

1. **Provider 更新破坏自定义模型配置**（#8504、#8863）
   > 内置 Provider 更新会重复提示、静默改写用户自定义的 model.name/baseUrl，影响面大且**值得特别关注**，已出现多次回归。

2. **CI/E2E 自动化不稳定**（#8847、#8870）
   > 主分支 E2E 测试出现多次失败，虽然已自动标记"ready-for-agent"进行修复，但频繁失败说明稳定性和自动化协作模式仍在摸索期。

3. **安全边界问题**（#8643、#8687、#8871）
   > 不信任目录的 .env 加载、跨工作树 Git 变更、ACP子进程参数解析错误等；跨工作树 Git 守卫（#8687）和 ACP fast-path 问题修复（#8618、#8851）已进入开发流程。

4. **日志与磁盘占用**（#8860）
   > OpenAI API 日志无界增长导致磁盘被写满，在自动化场景中尤其危险。

### 体验问题（中优先级）

- 终端窗口尺寸变化时的渲染伪影（#8557、#8831、#8849）
- macOS 上每次启动都出现不必要的麦克风权限警告（#8877）
- WebShell 计划内的 SSE 重连显示了警示信息（#8887）
- `/clear` 被后台任务阻塞时错误信息不够具体（#8741）
- `qwen --help` 中缺少 `--approval-mode` 和 `--auth-type`（#8897）

---

*本日报由 GitHub 数据自动生成，仅供参考。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*