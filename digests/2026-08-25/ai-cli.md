# AI CLI 工具社区动态日报 2026-08-25

> 生成时间: 2026-08-25 00:37 UTC | 覆盖工具: 7 个

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

# Claude Code Skills 社区热点报告
**数据范围**：github.com/anthropics/skills ｜ 截止 2026-08-25

---

## 一、热门 Skills 排行（按社区讨论热度）

> 说明：以下 PR 均处于 **open** 状态，尚无 merged/draft。热度以评论量排序为依据。

| # | Skill / PR | 功能定位 | 社区讨论热点 |
|---|-----------|---------|-------------|
| 1 | **[skill-creator 评估链路修复](https://github.com/anthropics/skills/pull/1298)** | 修复 `run_eval.py` 对所有描述一律报告 0% recall 的 bug；将评估产物安装为真实 skill，并修复 Windows 流读取、触发检测与并行 worker | 对应 issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论、7 👍），已有 10+ 独立复现——skill 描述优化循环正在"对着噪声优化"，是当前最受关注的工程缺陷 |
| 2 | **[document-typography](https://github.com/anthropics/skills/pull/514)** | 对 AI 生成文档做排版质检：孤行、寡行段落、编号错位 | 直击"Claude 生成的每个文档都会遇到"的高频体验问题，讨论集中在排版规则的可泛化性 |
| 3 | **[scnet-hpc](https://github.com/anthropics/skills/pull/1615)** | 通过 profile 化 SSH + Slurm 工作流操作 SCNet HPC 集群，含任务生成、集群发现、分区/内存/模块指导 | 最新提交（08-24），垂直领域技能的代表，讨论围绕 HPC 场景的权限与命令安全性 |
| 4 | **[ODT 文档技能](https://github.com/anthropics/skills/pull/486)** | OpenDocument（.odt/.ods）创建、模板填充、ODT→HTML 解析转换 | 讨论集中在 LibreOffice/ISO 标准格式在处理链中的兼容性 |
| 5 | **[frontend-design 重构](https://github.com/anthropics/skills/pull/210)** | 提升前端设计 skill 的清晰度与可执行性，确保每条指令可在单轮对话内被真正执行 | 社区普遍关注"skil l写成给人看的文档而非给 Claude 的指令"这一问题，与 issue #202 呼应 |
| 6 | **[skill-quality-analyzer / skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** | 两个元技能：从结构、文档、示例、安全等五维度评估 skill 质量，并进行安全分析 | 讨论围绕"skill 的质量/安全标准应由谁定义、如何落地"，是对生态自我治理的尝试 |
| 7 | **[Hivemind 多 Agent 编排](https://github.com/anthropics/skills/pull/1628)** | 让 Claude Code 将机械性工作委托给免费模型驱动的 headless opencode worker，Claude 仅保留规划/审查/合并 | "昂贵模型的上下文才是稀缺资源"这一核心论点引发较多讨论，涉及任务切分与结果校验 |
| 8 | **[testing-patterns](https://github.com/anthropics/skills/pull/723)** | 覆盖 Testing Trophy 模型、单元测试（AAA）、React 组件测试（Testing Library）等全栈测试模式 | 讨论聚焦测试生成方向的价值与断言质量，是社区呼声较高的新技能方向 |

**此外值得关注**：pdf 大小写引用修复（[#538](https://github.com/anthropics/skills/pull/538)）、docx 修订 ID 冲突修复（[#541](https://github.com/anthropics/skills/pull/541)）、self-audit 推理质量门禁（[#1367](https://github.com/anthropics/skills

---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-25）

## 今日速览

今日 Codex 发布 `rust-v0.150.0-alpha.8` 新版本；社区讨论热度集中在 macOS 认证失效、MultiAgent 模型兼容性以及 Windows 平台多项稳定性问题。PR 侧则聚焦凭据代理加固、TUI 会话体验优化与可观测性增强，整体呈现“平台稳定性修复 + 体验细节打磨”的双线节奏。

## 版本发布

- **rust-v0.150.0-alpha.8**（0.150.0-alpha.8）— 常规 alpha 版本发布，无额外更新说明。
  https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.8

## 社区热点 Issues

1. **macOS 打开旧会话导致 ChatGPT 认证失效并跳转登录页**
   #39162 | 评论 51 | 👍 31
   核心认证流程的严重回归：用户反馈在 macOS 上打开已存在会话会直接使 ChatGPT 认证失效并重定向至登录页，涉及 26.814 与 26.810 版本差异，目前仍处于开放状态。
   https://github.com/openai/codex/issues/39162

2. **gpt-5.6-luna 被标记为 MultiAgent V1，V2 spawn_agent 拒绝调用**
   #35097 | 评论 29 | 👍 51（本期最高赞）
   模型能力标记与版本体系不一致，导致 V2 多代理调用失败。社区对模型兼容性问题高度关注，点赞数位列所有 Issue 之首。
   https://github.com/openai/codex/issues/35097

3. **分页历史丢失有效的 rollout 记录且序号被复用**
   #35746 | 评论 25 | 👍 1
   分页 decoding 逻辑缺陷导致历史记录随机丢失，影响长会话的记录完整性。数据层面问题，涉及 `RolloutLine` 解码一致性。
   https://github.com/openai/codex/issues/35746

4. **增加“禁用 `Ran N commands` 折叠、始终显示执行命令”选项**
   #39903 | 评论 21 | 👍 36
   TUI 用户希望命令展示默认全展开，目前折叠行为增加了额外点击成本。功能性需求，获赞数位列第二。
   https://github.com/openai/codex/issues/39903

5. **Windows/WSL 集成终端在 PTY 启动前静默失败，侧边栏无法打开**
   #37104 | 评论 19 | 👍 9
   Windows 平台上集成终端完全不可用，失败发生在 PTY/WSL 初始化之前，且不产生任何错误提示，排查困难。
   https://github.com/openai/codex/issues/37104

6. **App 中近期线程历史被清空，但 CLI 中仍存在**
   #17354 | 评论 14 | 👍 7
   用户丢失了 2-3 个月的会话历史，App 与 CLI 数据不同步。数据可靠性问题，影响长期使用者信任。
   https://github.com/openai/codex/issues/17354

7. **流式响应在完成前断开连接**
   #37996 | 评论 10 | 👍 2
   App 在处理请求过程中 stream 意外中断且无错误详情，影响长输出任务的可用性。
   https://github.com/openai/codex/issues/37996

8. **macOS 线程恢复触发登出：轮换的 refresh token 未持久化到 auth.json**
   #40267 | 评论 7 | 👍 0
   深度认证 bug：token 轮换后未能写入磁盘，导致 OAuth 刷新收到 `401 refresh_token_invalidated`，即使重新登录也会在 76 秒内再次失效。
   https://github.com/openai/codex/issues/40267

9. **自动压缩能力应暴露给 agent**
   #21777 | 评论 9 | 👍 9
   长任务中上下文窗口填满后，agent 被动触发压缩中断迭代流程。社区希望 agent 能感知压缩时机并主动规划上下文使用。
   https://github.com/openai/codex/issues/21777

10. **已完成的子代理线程未回收，导致虚假的“代理线程数已达上限”错误**
    #39694 | 评论 5 | 👍 0
    长任务中已完成子代理仍然占用“Active/Working”名额，最终触发错误限制。涉及子代理生命周期管理缺陷。
    https://github.com/openai/codex/issues/39694

## 重要 PR 进展

1. **支持 Amazon Bedrock 受管 AWS 访问密钥**
   #40481
   新增实验性 `amazonBedrockAccessKeys` 登录流程，凭据持久化至 auth store，并支持 SigV4 签名请求。多云接入扩展。
   https://github.com/openai/codex/pull/40481

2. **子环境中代理凭据别名（credential aliases）**
   #40484
   当父环境过滤了 canonical provider 变量时，自动发现并替换子环境中的凭据别名，提升凭据安全性。
   https://github.com/openai/codex/pull/40484

3. **将 turn 成本导出为 OTEL 指标**
   #40488
   新增 `codex.turn.cost_microusd` 计数器，携带 turn、会话、推理速度等属性，增强可观测性。
   https://github.com/openai/codex/pull/40488

4. **为 TUI 线程生成描述性标题**
   #40492
   未命名线程先用首条用户消息作为临时标题，再异步替换为规范化生成标题；手动重命名不会被覆盖。
   https://github.com/openai/codex/pull/40492

5. **在 `/rename` 中建议基于会话内容的线程标题**
   #40495
   TUI 重命名时自动从最近的用户/助手消息中生成标题建议，并预填到输入框，保持可编辑性。
   https://github.com/openai/codex/pull/40495

6. **读取技能资源时遵循响应预算**
   #40491
   `skills.read` 分页大小改为按当前调用响应预算动态计算，避免单页超出 token 限制。
   https://github.com/openai/codex/pull/40491

7. **增强内部 Guardian 会话隔离**
   #40497
   Guardian 审查始终走受限会话路径，不受父会话自定义配置影响，同时保留管理执行与环境限制。
   https://github.com/openai/codex/pull/40497

8. **AGENTS.md 状态摘要中折叠 home 路径**
   #40502
   `/status` 下用 `~` 显示 home 目录下的路径，保留项目相对路径，减少噪音。
   https://github.com/openai/codex/pull/40502

9. **压缩请求失败时以未压缩方式重试**
   #30690
   当 HTTP 400 携带 `x-openai-retry-uncompressed: true` 时，自动用非压缩格式重试一次；普通 400 仍直接终止。
   https://github.com/openai/codex/pull/30690

10. **为 fallback 模型启用 tool search**
    #30765

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>



</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-25）

## 今日速览

今日发布 v1.0.81-9，重点改进 `/model` 选择器中的模型数据保留警告与帮助链接。社区侧，两大热点持续发酵：长期存在的请求 400 错误（#1274）讨论量最高，交互模式工具白名单功能请求（#1973）获得 27 个 👍；与此同时，MCP OAuth 兼容性、Windows 平台稳定性以及 Agent 工具执行可靠性问题集中爆发，成为开发者反馈最密集的方向。

## 版本发布

### v1.0.81-9
- **改进**：`/model` 选择器中现在会显示模型数据保留警告，并附带相关说明链接，帮助用户更清楚地了解各模型的数据留存策略。

## 社区热点 Issues

以下为过去 24 小时内更新最值得关注的 10 个 Issue：

1. **[#1274] CLI constantly getting 400 errors for invalid request body**（评论 27 / 👍 11）  
   https://github.com/github/copilot-cli/issues/1274  
   自 2 月起持续存在的核心 Bug：用户最近约 20 次代码审查请求中 95% 返回 400 错误，涉及服务器端校验或 CLI 请求构造问题。这是当前社区讨论热度最高的 Issue，严重影响日常 code review 工作流。

2. **[#1973] Feature Request: Tool whitelist for Interactive Mode**（评论 12 / 👍 27）  
   https://github.com/github/copilot-cli/issues/1973  
   交互模式下每次工具调用都要手动批准，包括 `grep`、`cat` 等只读操作；而 `/allow-all` 又会放行破坏性操作。社区迫切需要一个中间态的工具白名单机制，27 个 👍 表明这是当前最强烈的功能需求。

3. **[#4490] Atlassian MCP OAuth authentication broken in 1.0.80**（评论 5）  
   https://github.com/github/copilot-cli/issues/4490  
   RFC 8414 §3.3 回归导致 1.0.80 中 Atlassian MCP OAuth 认证失败，1.0.78 正常。虽然该 Issue 已关闭，但 #4584 指出 1

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>



</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>



</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-25

## 今日速览

今日发布 v0.22.0-nightly 预构建版本及 CUA Driver v0.20.0 二进制包，Web Shell 工作目录 bug 得到修复。社区最热讨论集中在 API 流式输出超时（#5975，12 条评论）与核心/CLI 架构审查（#4063，9 条评论）两大问题上。多个重量级 PR 正在推进 /review 技能升级、Daemon 记忆任务扩展与 CI 可靠性增强。

---

## 版本发布

### v0.22.0-nightly.20260824.3a1f86d805
- 修复 Web Shell 从概览面板打开时会话工作目录未传递的问题
- 同步发布了 `pr-9806-verification-assets` 与 `gh-attach-assets` 两组构建资产

### cua-driver-rs v0.20.0
- Qwen CUA Driver 预构建二进制包（vendored under `packages/cua-driver`）
- macOS：签名 + 公证的通用二进制及 `QwenCuaDriver.app`
- Linux：x86_64 + arm64 未签名（glibc 2.31 起）
- Windows：x86_64 + arm64 未签名

---

## 社区热点 Issues

### 1. [API Error: No stream activity for 120000ms after 19 chunks](https://github.com/QwenLM/qwen-code/issues/5975)
作者 @yousimu 反馈升级至

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*