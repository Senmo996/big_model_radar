# AI CLI 工具社区动态日报 2026-09-23

> 生成时间: 2026-09-23 02:17 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-23）

## 1. 生态全景

今日主流 AI CLI 工具均呈现高频率迭代：Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code 接连发布新版本，核心驱动力是新模型适配（Opus 5.5、GPT-6、Gemini 3.8 Flash、claude-opus-5.5）与交互/平台体验优化。社区诉求正从“功能有无”转向“运行可靠性”：会话持久化、子代理行为可观测性、MCP/插件配置一致性、Windows 平台兼容性成为跨工具的高频议题。同时，桌面端与多端协同逐渐被视为独立生产力场景，多账户、成本透明、企业级网络策略等需求显著升温。

## 2. 各工具活跃度对比

| 工具 | 版本发布 | 今日活跃 Issues | 今日活跃 PR | 活跃度评级 |
|---|---|---|---|---|
| Claude Code | v2.1.280（Opus 5.5默认，全屏交互优化） | ~50（Top10列出） | 1 | 高 |
| OpenAI Codex | v0.156.0 正式版 + alpha 系列 | ≥10（Top10） | ≥10（Top10） | 高 |
| Gemini CLI | v0.62.0-nightly（新模型支持） | ≥10（Top10） | ≥10（Top10） | 高 |
| GitHub Copilot CLI | v1.0.89-0 / v1.0.88 | ≥10（精选10） | 1 | 中 |
| Kimi Code CLI | v1.52.0（Python→TS 迁移引导） | 1 | 8 | 低 |
| OpenCode | 无 | ≥10（Top10） | ≥10（Top10） | 中 |
| Qwen Code | v0.24.5-preview.0、v0.24.4、desktop-v0.24.4 | ≥10（Top10） | ≥10（Top10） | 高 |

> 注：Issues/PR 数量基于各日报明确列出或提及的数据统计，未列出总数的以 Top N 估算。

## 3. 共同关注的功能方向

- **新模型支持与迁移路径**  
  Claude Code 内置 Opus 5.5；Codex 通过热修复新增 GPT-6 Sol/Luna；Gemini CLI 新增 3.8 Flash/3.5 Flash Lite；Copilot CLI 支持 claude-opus-5.5。各工具都在快速跟进模型迭代，并处理迁移带来的兼容性（如 Codex 多起模型 404 issue）。

- **会话稳定性与恢复能力**  
  Claude Code 关注桌面端会话去重（#80773）；Codex 关注推理摘要持久化（#34873）；Copilot CLI 遭遇压缩 OOM 导致会话永久不可恢复（#4780）；Gemini CLI 的 subagent 误报成功（#22323）；Kimi CLI 存在内存压力下会话损坏且恢复返回 400（#2336）；Qwen Code 讨论 HTTP 网关超时后无法找回已创建的 session（#12381）。会话数据可靠性成为所有工具的核心生命线。

- **Windows/WSL 平台兼容性**  
  Claude Code 有滚轮事件错乱（#12953）、盘符大小写误判（#91618）；Codex 的沙箱初始化失败（#44696）、安装被拒（#40550）；Gemini CLI 修复 Windows 路径大小写（#29247）；Qwen Code 处理 Linux/WSL 剪贴板静默失败（#12488）。Windows 用户是社区最大痛点群体，也是各工具待补强的短板。

- **MCP/插件/技能生态可靠性**  
  Gemini CLI 出现 `tools.core` 配置导致所有 MCP 工具被静默禁用（#28361）；Copilot CLI 用户要求插件快速开关（#2714）并修复服务端市场注册失败（#4556）；Claude Code 的插件在 Windows 下报 ENOENT（#92601）；Qwen Code 关注工具策略对子代理的可见性（#12424）。插件配置的“fail-open/fail-closed”正确性正在成为生态基础设施的焦点。

- **成本透明与模型可观测性**  
  Claude Code 社区要求桌面端显示用量指示器（#80261）并优化 prompt 缓存（#95728）；Codex 用户抱怨 `model_reasoning_summary="detailed"` 只有标题没有正文（#34873）；OpenCode 修复保留 usage 信息以启用自动压缩（#50797）；Gemini 社区希望看到 subagent 轨迹（#22598）。开发者越来越需要“计算钱花在哪、模型在想什么”的细粒度反馈。

## 4. 差异化定位分析

- **Claude Code**：企业级与桌面端并重。通过 Connector 接入多账户、提供桌面深链接、优化全屏 UI，定位是“可深度嵌入协作流的生产力平台”，同时强调 Worktree 隔离和策略治理，适合组织级用户。
- **OpenAI Codex**：以 Rust 高性能 CLI 和快速模型迭代见长。推出全屏 TUI、语音对话、GPT-6 模型目录，同时强化网络策略与远程控制安全，重心在“前沿模型体验 + 安全合规”，面向开发者中的模型尝鲜者与安全敏感企业。
- **Gemini CLI**：聚焦 Google 生态与 MCP 扩展。社区讨论集中于 MCP 配置可靠性、技能主动调用、浏览器代理（Wayland 问题），技术路线侧重“Agent 自主使用工具”，对多工具编排和自动化场景支持更积极。
- **GitHub Copilot CLI**：依托 GitHub 生态，强调托管 Connector、Copilot 平台集成。插件/技能市场是特色，但当前会话稳定性问题（compaction OOM、卡死）突出，产品成熟度略滞后于社区预期。
- **Kimi Code CLI**：正处 Python→TypeScript 迁移过渡期，核心动作是迁移引导和依赖维护，功能开发基本冻结。社区声音极弱，适合存量 Python 用户关注迁移路径，新用户应直接采用 TypeScript 版。
- **OpenCode**：开源、多模型/Provider 兼容的轻量 CLI。今日重点在错误信息透明化、SSE 兼容性修复、账户计费问题，更适合喜欢 DIY、自托管模型或跨多家 API 的开发者。
- **Qwen Code**：背靠阿里云，形态最丰富（CLI/桌面/Web/移动），今日推进 Managed Agent 架构、Batch API 工作流、Web Shell 语音等。技术路线偏“云端一体化 + 移动端场景”，适合需要随时随地进行代码任务的用户。

## 5. 社区热度与成熟度

- **高活跃、快速迭代**：Claude Code、OpenAI Codex、Gemini CLI、Qwen Code 均有多版本发布和大量 Issues/PR，社区讨论密集，生态演进最快。
- **中活跃、稳健推进**：Copilot CLI 虽有版本发布但 PR 仅 1 条，Issues 集中在稳定性问题，社区声音中等；OpenCode 无发版但 PR 活跃，问题多集中于体验细节。
- **低活跃、维护期**：Kimi Code CLI 仅 1 个活跃 Issue，PR 以依赖升级为主，社区关注度显著偏低，处于迁移过渡期。

从成熟度看，Claude Code 和 Copilot CLI 的企业级功能相对完善；Codex 和 Gemini 在模型与工具创新上激进但稳定性仍在打磨；OpenCode 与 Qwen Code 则处于功能快速扩张阶段，社区反馈响应积极。

## 6. 值得关注的趋势信号

1. **模型迭代速度成为 CLI 核心竞争力**：几乎所有工具都在当日跟进新模型（Opus 5.5、GPT-6、Gemini 3.8 Flash），开发者选型时需关注工具对模型目录的更新频率和迁移平滑性。
2. **Windows 支持是最大短板，也是机会**：沙箱失败、路径大小写、剪贴板、滚轮等问题跨工具高发，优先补强 Windows 体验的工具将获得显著口碑红利。
3. **会话可靠性决定用户信任**：会话损坏、compaction OOM、误报成功等“看似成功实则失败”的行为是社区容忍度最低的。无论哪家工具，持久化与

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截至 2026-09-23）

数据来源：github.com/anthropics/skills（热门 PR 50 条、热门 Issues 50 条）

---

## 1. 热门 Skills 排行

以下按社区关注度（Issue 评论数、PR 活跃度）排序：

### ① skill-creator 触发评估修复（#1298）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/1298)
**功能：** 修复 skill-creator 的触发词评估误报问题——包括多 worker 命令探测竞争、Windows 平台 `select()` 管道失败、无关工具中断扫描；同时避免运行时失败被误判为"非触发"，导致负例错误通过。
**热点：** 触发评估的可靠性直接决定 skill 描述质量，社区对"假阴性"和跨平台兼容性讨论集中。另有 #1769 指出同类 0% recall 问题，说明该环节存在系统性缺陷。

### ② proofcore-contract-auditor 智能合约审计（#1771）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/1771)
**功能：** 面向 Web3 开发者，对 Solidity/Rust 智能合约做自动化静态分析，并通过 ProofCore 零存储 Merkle 协议将审计证明锚定到 TON 区块链。
**热点：** 区块链审计上链是差异化亮点，但目前评论互动较少，处于早期阶段。

### ③ mcp-builder 兼容性修复（#1742）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/1742)
**功能：** 修复 mcp>=2.0.0 中 `streamablehttp_client` 更名及自定义 header 配置方式变化导致的连接脚本错误。
**热点：** 对应 Issue #1668，反映当前 MCP 生态快速迭代下，官方技能对上游版本变更的跟进滞后。

### ④ md2video-audio 文档转视频（#1703）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/1703)
**功能：** 零成本将 Markdown 文档通过 Marp 转为幻灯片，再合成为带拟真语音旁白的 MP4 视频。
**热点：** 直击"文档→视频"的内容生产需求，无需额外付费服务，社区关注其自动化程度和语音合成质量。

### ⑤ pyxel 复古游戏开发（#525）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/525)
**功能：** 指导 Claude 使用 Python Pyxel 开发、调试复古游戏，支持 headless 输入驱动运行、逐帧检查与任务级状态验证。
**热点：** 生命周期长（3 月至 9 月持续更新），是"代码生成+可验证执行"类技能的典型，讨论聚焦于游戏场景下的状态检测方法。

### ⑥ document-typography 排版质量控制（#514）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/514)
**功能：** 防止 AI 生成文档的常见排版问题：孤词换行（1-6 词溢出到下一行）、寡行段落（标题悬在页底）、编号错位。
**热点：** 直击 AI 文档"看得过去但不够专业"的痛点，属于低频高价值场景，社区评价积极。

### ⑦ AWT AI 端到端测试（#822）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/822)
**功能：** 接入开源工具 AWT（AI Watch Tester），为 Claude 提供视觉与浏览器控制能力，实现零代码 E2E 测试生成与自动执行。
**热点：** 测试自动化是社区高需方向，该 PR 从 3 月持续更新至 9 月，一直在迭代完善。

### ⑧ testing-patterns 测试模式指南（#723）
**状态：Open** | [PR 链接](https://github.com/anthropics/skills/pull/723)
**功能：** 完整测试方法论：Testing Trophy 模型、单元测试 AAA 模式、React 组件测试（Testing Library）、"什么该测/不该测"等。
**热点：** 覆盖面广的综合性测试技能，9 月仍有更新，与 AWT 构成"方法论+工具"互补。

---

## 2. 社区需求趋势

来自 Issues 讨论热度分析：

| 方向 | 代表 Issue | 关键诉求 |
|------|-----------|---------|
| **安全与信任边界** | [#492（43 评论）](https://github.com/anthropics/skills/issues/492) | 社区技能滥用 `anthropic/` 命名空间，存在信任边界攻击风险，需官方认证/隔离机制 |
| **组织级共享** | [#228（16 评论，👍8）](https://github.com/anthropics/skills/issues/228) | 企业用户希望在组织内直接共享技能库，而非手动传文件+引导上传 |
| **评估工具链可靠性** | [#556（12 评论，👍7）](https://github.com/anthropics/skills/issues/556) | `run_eval.py` 对任何查询均 0% 触发，技能评估机制基本不可用 |
| **上下文窗口优化** | [#1487（4 评论）](https://github.com/anthropics/skills/issues/1487) | 部分技能（如 claude-api）一次注入 ~156k token，直接耗尽上下文，需惰性加载或压缩 |
| **元技能（skill-creator）改进** | [#202（8 评论）](https://github.com/anthropics/skills/issues/202) | skill-creator 过于像开发文档，缺乏可执行指令，需按操作型技能重写 |
| **代理治理** | [#412（6 评论）](https://github.com/anthropics/skills/issues/412) | 社区主动提案 agent-governance 技能，覆盖策略执行、威胁检测、审计追踪 |

**总体趋势：** 从"造技能"转向"管技能"——可靠性评估、安全分发、企业共享、上下文效率成为核心诉求。

---

## 3. 高潜力待合并 Skills

以下 PR 活跃度高、需求明确，近期可能落地：

- **[proofcore-contract-auditor（#1771）](https://github.com/anthropics/skills/pull/1771)** — 智能合约审计+区块链存证，Web3 细分领域空白，9 月中旬创建即获关注。
- **[md2video-audio（#1703）](https://github.com/anthropics/skills/pull/1703)** — 文档一键转视频，零成本+语音旁白，内容创作场景需求明确。
- **[blast-radius（#1776）](https://github.com/anthropics/skills/pull/1776)** — 批量破坏性操作（删除用户、撤权、批量发件）前的安全检查清单，解决"查询正确但操作影响世界"的盲区。
- **[testing-patterns（#723）](https://github.com/anthropics/skills/pull/723)** — 综合测试方法论，3 月发起持续更新至 9 月，成熟度高。
- **[AWT E2E 测试（#822）](https://github.com/anthropics/skills/pull/822)** — 零代码 AI 测试执行，长期迭代且与官方测试技能互补。

---

## 4. Skills 生态洞察

**社区当前最集中的诉求是一句话：从"能用"到"可信"——技能评估工具链的可靠性、安全分发机制、与企业部署相关的共享/上下文管理，正在取代单纯的功能扩展，成为技能生态迈向成熟的关键瓶颈。**

---

# Claude Code 社区动态日报（2026-09-23）

## 1. 今日速览

今日最核心的动态是发布了 **v2.1.280**，正式引入 Claude Opus 5.5 作为默认 Opus 模型（1M 上下文，输入/输出较前代大幅降价），并优化了全屏模式下列表的鼠标交互。Issue 方面，**多 Connector 账户支持**（#27302）持续霸榜热议（253 条评论），而桌面应用与终端 UI 的细节体验问题（如会话去重、滚轮行为）正成为社区反馈高发区。此外，Opus 5 模型在工具调用间的输出格式异常（#95764）也引发了专业用户的关注。

## 2. 版本发布

**v2.1.280** [查看发布说明](https://github.com/anthropics/claude-code/releases)

- **新增模型**：内置 Claude Opus 5.5（`claude-opus-5-5`），现为默认 Opus 模型。支持 1M Token 上下文，定价 $4/$20 per Mtok（缓存读取 $0.20/Mtok），性价比显著提升。
- **交互优化**：全屏模式下更多列表支持鼠标操作——`/skills` 列表支持滚轮滚动，`/plugin` 中可直接点击技能状态选项。

## 3. 社区热点 Issues（Top 10）

1. **[#27302] 支持在 Claude Code Web 端配置多个 Connector 账户（相同 Connector 不同账号）**
   [链接](https://github.com/anthropics/claude-code/issues/27302) | 评论 253 | 👍 387
   这是当前社区诉求最强烈的功能请求。多账户/多租户场景落地困难，用户强烈希望同一 Connector 下能切换不同身份使用。

2. **[#12953] [BUG] Windows 下鼠标滚轮滚动的是输入历史而非聊天历史**
   [链接](https://github.com/anthropics/claude-code/issues/12953) | 评论 25 | 👍 21
   高频出现的 TUI 交互问题，在 Windows 终端下滚轮事件绑定错误，严重影响长对话浏览效率。

3. **[#80261] [Feature] 桌面端主界面显示用量限制/持久用量指示器**
   [链接](https://github.com/anthropics/claude-code/issues/80261) | 评论 6 | 👍 22
   用户对额度消耗透明度需求高，希望在非订阅制（如 API 计费）下能直观看见当前用量，避免超额。

4. **[#80773] [BUG] `claude://resume` 会复制已打开的桌面端会话，无法聚焦现有原生会话**
   [链接](https://github.com/anthropics/claude-code/issues/80773) | 评论 11
   深链接（Deep Link）语义与桌面端会话管理冲突，导致重复会话产生，破坏多端协作流程。

5. **[#40346] [Feature] 支持通过 Hooks 或工具编程式重命名会话/线程**
   [链接](https://github.com/anthropics/claude-code/issues/40346) | 评论 8 | 👍 14
   开发者希望实现自动化工作流（如对接 GitHub Issue），根据上下文自动命名会话，减少手动 `/rename` 操作。

6. **[#92601] [BUG] security-guidance 插件 hook 在 Windows staging 路径下 ENOENT 报错，引发无限重试**
   [链接](https://github.com/anthropics/claude-code/issues/92601) | 评论 4
   官方插件在 Windows 环境中存在路径解析缺陷，触发无限重试机制，刷屏通知并拖垮会话性能。

7. **[#91618] [BUG] Windows: 隔离工作区（Worktree）安全性检查因盘符大小写敏感误拒绝合法路径**
   [链接](https://github.com/anthropics/claude-code/issues/91618) | 评论 4
   由于 Windows 文件系统对盘符大小写不敏感，但代码中按字符串比较导致 `D:\` 与 `d:\` 被判定为不同路径，隔离功能不可用。

8. **[#95764] [BUG] Opus 5 模型在工具调用之间的叙述被错误呈现为“总结性思考块”**
   [链接](https://github.com/anthropics/claude-code/issues/95764) | 评论 1 | 👍 1
   专业用户反馈，9月11日后 `claude-opus-5` 在连续工具调用间生成的自然语言过渡被错误归类为 `thinking` 块（附带代码块丢失），模型误以为用户可见，影响可读性与最终输出质量。

9. **[#87874] [BUG] 子代理编排缺乏并发模型：无等待/取消机制，且语义随版本静默变更**
   [链接](https://github.com/anthropics/claude-code/issues/87874) | 评论 2
   高级用户指出，基于 Subagent 的工作流因底层调度语义不明确而不可靠，版本升级可能导致行为漂移（breaking changes）。

10. **[#96207] [BUG] macOS 桌面版多实例共存时，分阶段更新永不生效并自动关闭实例**
    [链接](https://github.com/anthropics/claude-code/issues/96207) | 评论 1
    多开场景下更新机制存在竞态条件，导致更新失败（"Update didn't complete"）且应用意外退出，影响稳定性。

## 4. 重要 PR 进展

过去 24 小时内有 1 条 PR 更新：

- **[#95409] mods/agents-md: 新增 AGENTS.md 项目指令 Mod（已关闭）**
  [链接](https://github.com/anthropics/claude-code/pull/95409)
  该 PR 以 Mod 形式实现了 `AGENTS.md` 支持，布局与 `sec-default`、`diff`、`telemetry` 一致（含 manifest、`hooks/` 模块、`claude plugin test` 测试及 README）。Mod 可通过 `instructionFiles` 配置项，让引擎像读取 `CLAUDE.md` 一样读取 `AGENTS.md`。此前社区强烈要求全局 `AGENTS.md` 支持（见 Issue #95795），此 Mod 提供了项目级解决方案的参考实现。

## 5. 功能需求趋势

从今日 50 余条 Issues 中提取到以下高优先级功能方向：

- **模型能力接入与成本控制**：社区对 Opus 5.5 的发布反应积极，同时围绕 **Prompt 缓存保持（keepalive）**（#95728）、**模型 API 自定义缓存**（#96214）等成本优化功能出现多类请求，表明用户对长会话成本敏感度上升。
- **桌面应用体验深化**：关于桌面端深链接去重（#80773）、文件越界查看（#94707）、用量指示器（#80261）的讨论，显示用户正将桌面端视为独立的生产力工具，而非单纯 CLI 的包装。
- **可扩展性与自动化**：Hooks/工具驱动的会话管理（#40346）、插件自定义自动补全触发器（#96185）、全局 `AGENTS.md`（#95795）以及空闲时段后台任务（#96211），反映出专业开发者希望将 Claude Code 深度嵌入到自有自动化体系中。
- **Windows 平台治理**：多起 Windows 专属 BUG（路径大小写 #91618、插件 ENOENT #92601、滚轮错乱 #12953）表明该平台支持仍是稳定性短板，社区对 Windows 下的精细化修复抱有强烈预期。

## 6. 开发者关注点

- **Worktree 隔离机制的边界语义**：多个 Issue（#96209、#88312、#84209）指出，`EnterWorktree` 在使用前后存在状态同步问题——早于隔离启动的子代理会全部失效（#96209），字符串内建命令（如 `echo eval`）会被误判（#88312），且退出异常会导致会话历史文件残留（#84209）。这已是高级用户切换工作区时最头疼的痛点。
- **模型输出透明性与可控性**：Opus 5 的 `thinking` 块与正常文本流混淆（#95764）、模型自我授权编辑等行为（#96208）引发争议，用户期待模型在复杂工具调用中的“内心独白”与“对用户讲话”之间有更明确的分界线。
- **连接与授权的一致性问题**：多账户切换（#27302）和远程控制策略误判（#96210）反映出认证层在并发会话、组织策略场景下存在状态不同步的风险，直接影响企业级使用的信任度。

---
*数据源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) Issues / PRs（更新时间：2026-09-23）*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-23

## 今日速览

今日 Codex 发布 v0.156.0 正式版，带来全新全屏 TUI 界面和默认启用的语音对话能力；新模型 GPT-6 Sol/Luna 已进入多个发布分支的模型目录，模型迁移与目录热修复是今日 PR 主旋律。社区侧焦点集中在 Windows 平台的沙箱故障与 Computer Use 可靠性问题上。

-

## 版本发布

### rust-v0.156.0（正式版）
- **全新全屏 UI**：通过 `/tui` 命令可为下一次启动启用全屏界面，支持转录搜索、鼠标选择及右键复制（#46732 等）。
- **语音对话默认开启**：新增 F8 快捷键切换，提供 `/voice settings` 选择器，并内置音频支持。

### rust-v0.157.0-alpha.4 ~ alpha.10
- 多个 alpha 迭代版本，未附独立变更说明。

-

## 社区热点 Issues（Top 10）

### 1. Computer Use 无法在 Windows 上获取 Chrome URL
- **#25271**｜42 评论｜10 👍
- 问题：Computer Use 在 Windows 上无法确定 Chrome 当前 URL，连 `chrome://newtab/` 都无法识别。
- 重要性：Windows 平台 Computer Use 核心功能受损，涉及版本 26.527.31326，COPILOT 功能在 Windows 上的可用性存疑。
- 链接：https://github.com/openai/codex/issues/25271

### 2. Chrome 插件/浏览器与 Computer Use 拒绝访问部分网站
- **#29343**｜33 评论｜12 👍
- 问题：Codex 在 Chrome 插件和浏览器模式下静默拒绝加载某些网站，且未给出任何说明。
- 重要性：涉及安全策略与站点访问控制逻辑，影响用户对浏览器自动化功能的信任度。
- 链接：https://github.com/openai/codex/issues/29343

### 3. 【RFC】自我进化 Agent：交互式指令蒸馏（/learn）与 AGENTS.md 规则代谢
- **#40575**｜31 评论
- 内容：提出 `/learn` 指令将交互经验蒸馏到 AGENTS.md，实现规则“新陈代谢”，面向多周大型软件项目场景。
- 重要性：当前社区最受关注的增强方向之一，可能影响 Codex 长期记忆与自主进化架构。
- 链接：https://github.com/openai/codex/issues/40575

### 4. Windows 桌面版：多显示器下最大化窗口溢出到相邻屏幕
- **#25826**｜28 评论｜20 👍
- 问题：Windows 桌面应用在多显示器环境下最大化时溢出至相邻显示器。
- 状态：已关闭，但 20 个 👍 表明该问题影响面广，值得作为回归测试项关注。
- 链接：https://github.com/openai/codex/issues/25826

### 5. ChatGPT 与 Codex 合并后，桌面侧边栏 Projects 不显示（macOS）
- **#31878**｜19 评论｜18 👍
- 问题：升级至 ChatGPT 桌面版 26.707.30751 后，Web 端可见的 Projects 在桌面侧边栏消失。
- 重要性：ChatGPT/Codex 合并后的数据一致性问题，影响存量用户工作流。
- 链接：https://github.com/openai/codex/issues/31878

### 6. Windows 沙箱 helper 报错 `helper_unknown_error`，所有命令与文件读取失败
- **#44696**｜18 评论｜2 👍
- 问题：Windows 11 上每次 `exec_command` 甚至文件读取都在沙箱初始化层失败。
- 重要性：沙箱是 Codex CLI 安全核心，该错误直接阻断全部工具调用，需高优先级修复。
- 链接：https://github.com/openai/codex/issues/44696

### 7. Codex 移动端不显示已连接 Mac 的 SSH 远程项目
- **#23527**｜17 评论｜21 👍
- 问题：移动端可连接 Mac 主机，但 Mac 端可见的 SSH 远程项目未出现在移动端项目选择器中。
- 重要性：影响远程开发场景的移动端可用性，且 21 👍 表明关注度较高。
- 链接：https://github.com/openai/codex/issues/23527

### 8. Windows 应用一次性设置失败：`helper_failed` / Access Denied
- **#40550**｜15 评论
- 问题：Windows 应用反复提示“Windows setup didn’t finish”，`codex-windows-sandbox-setup.exe` 无法完成安装。
- 重要性：新安装用户被阻塞在初始设置阶段，属于阻断性 bug。
- 链接：https://github.com/openai/codex/issues/40550

### 9. 桌面端自定义模型提供商在现有会话与模型选择器中不可用
- **#29156**｜13 评论｜35 👍（本期最高 👍）
- 问题：CLI/TUI 可通过 `model_providers` 使用自定义模型，但桌面端无法在现有会话中安全使用。
- 重要性：社区对自定义模型支持的需求强烈，35 👍 说明该问题触及大量高级用户的诉求。
- 链接：https://github.com/openai/codex/issues/29156

### 10. `model_reasoning_summary="detailed"` 仅生成标题式推理摘要
- **#34873**｜11 评论｜12 👍
- 问题：设置详细推理摘要后，持久化 reasoning 条目只有粗体标题，无实际说明文本。
- 重要性：影响用户对模型推理过程的可观测性与调试体验。
- 链接：https://github.com/openai/codex/issues/34873

-

## 重要 PR 进展（Top 10）

### 1. GPT-6 Sol / Luna 模型目录热修复（0.156.0 / 0.155.0-alpha16.1）
- **#47405 / #47401 / #47385**（合并）
- 内容：在 0.156.0 与 0.155.0-alpha16.1 分支中新增 `gpt-6-sol` 和 `gpt-6-luna` 目录条目，提供从 GPT-5.5/5.6 系列的迁移路径，并重定向已退役的 GPT-5.4 选择。
- 意义：配合今日多起模型 404 issue，新模型入目录是官方对模型体系迭代的快速响应。
- 链接：https://github.com/openai/codex/pull/47405

### 2. 系统代理回退支持登录与启动请求
- **#47398**｜hotfix 0.155.0-alpha.16
- 内容：登录和企业配置引导在仅能通过系统代理访问时不再失败，默认启用 `features.system_proxy_fallback`。
- 意义：解决企业网络环境下登录失联问题，提升网络兼容性。
- 链接：https://github.com/openai/codex/pull/47398

### 3. 应用网络策略覆盖 app-server 请求
- **#47407**
- 内容：在应用启动时加载 `application.network` 策略，认证前即生效，策略加载失败则阻断流量。
- 意义：网络策略是安全合规的核心机制，此次补全了 app-server 路径的覆盖盲区。
- 链接：https://github.com/openai/codex/pull/47407

### 4. 远程控制与远程执行恢复应用网络策略
- **#47410**
- 内容：远程控制的注册、配对、客户端管理与 WebSocket 连接均走认证客户端工厂，策略拒绝与认证失败区分处理。
- 意义：远程控制链路此前未统一受网络策略约束，该 PR 填补了远程攻击面的漏洞。
- 链接：https://github.com/openai/codex/pull/47410

### 5. 缓存解密后的 gateway OAuth 密钥
- **#47413**
- 内容：为 `GatewayOAuth` 增加单条目缓存，避免重复解密同一密钥文件。
- 意义：性能优化，减少认证路径上的重复开销。
- 链接：https://github.com/openai/codex/pull/47413

### 6. 支持 Shift-click 扩展转录文本选择
- **#47414**
- 内容：在 TUI 转录视图中支持 Shift+点击扩展选区，保留原始锚点，支持拖拽与双击整词扩展。
- 意义：TUI 交互细节完善，提升全屏模式的文本操作效率。
- 链接：https://github.com/openai/codex/pull/47414

### 7. Terminal.app 在 SSH 下使用原生滚动回退
- **#47417**
- 内容：启动时通过主/从设备属性检测 Terminal.app，SSH 会话且无多路复用器时使用原生回滚。
- 意义：修复终端兼容性，改善 SSH 远程会话中的回滚体验。
- 链接：https://github.com/openai/codex/pull/47417

### 8. 恢复 TUI 未发送的问题草稿
- **#47422**（另附 #47423、#47424）
- 内容：回合结束时自动恢复未发送的回答草稿到主输入框；恢复过程不打断 Ctrl+R 历史搜索；清除过期的未答复异步问题通知。
- 意义：增强 TUI 输入容错性，避免用户输入丢失。
- 链接：https://github.com/openai/codex/pull/47422

### 9. 刷新捆绑模型元数据与指令
- **#47397**
- 内容：GPT-6/GPT-5.6/GPT-5.5 及 auto-review 目录条目切换为 `shell_command`，扩展 plan 可用性，调整 GPT-6-Astra 的推理相关配置。
- 意义：模型元数据的精确性与运行方式一致性调整，影响各模型默认行为。
- 链接：https://github.com/openai/codex/pull/47397

### 10. OpenAI 文件 blob 上传失败自动重试
- **#47393**
- 内容：对 `503`、超时、连接中断等瞬时错误增加最多 5 次重试，单次失败不再中止整个上传。
- 意义：提升大文件上传的可靠性，减少网络抖动导致的用户可见失败。
- 链接：https://github.com/openai/codex/pull/47393

-

## 功能需求趋势

从今日 issues 与 PR 中可提炼出社区最关注的五个功能方向：

1. **Windows 平台稳定性与沙箱修复**：大批量 issue 集中在 Windows sandbox setup 失败、文件读写权限错误、AACL 拒绝访问等，Windows 是目前问题密度最高的平台，也是社区最迫切希望官方优先投入的方向。

2. **新模型支持与迁移平滑性**：用户已开始尝试调用 `gpt-6-sol`、`gpt-6-luna` 等新模型

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-23

## 1. 今日速览

今日最核心的更新是发布了支持 **Gemini 3.8 Flash 与 3.5 Flash Lite** 新模型的夜间版 v0.62.0-nightly，并已启动向稳定版与预览版回移的 cherry-pick。Issue 方面，围绕 MCP 工具被静默禁用（#28361）和 subagent 误报成功（#22323）的讨论最为活跃；PR 方面，多项针对 MCP 配置读取、文件写入原子性和认证循环的修复在持续推进中。

## 2. 版本发布

**v0.62.0-nightly.20260923.g62364cb20**

本次夜间版的核心变更为新增对 Gemini 3.8 Flash 与 Gemini 3.5 Flash Lite 模型的支持（PR #29443），将这两个模型正式提升为 Flash 与 Flash Lite 产品线的最新 GA 模型。

- 发布链接：https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260923.g62364cb20
- 变更对比：https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260922.gd5b3e3acc...v0.62.0-nightly.20260923.g62364cb20

同时，机器人已自动发起两个 cherry-pick PR：#29456（回移到稳定版 v0.60.1，出现冲突待手动解决）与 #29455（回移到预览版 v0.61.0-preview.1）。

## 3. 社区热点 Issues

### 3.1 许可证误报问题（#28912）— 47 条评论
企业用户收到 "You do not have a valid license" 错误，且无法登录。该 issue 已关闭，但讨论量最大，有一定数量 👍（10），说明影响面较广。
https://github.com/google-gemini/gemini-cli/issues/28912

### 3.2 Subagent 在 MAX_TURNS 后误报 GOAL 成功（#22323）— 13 条评论
`codebase_investigator` subagent 实际已达最大轮次限制、未做任何分析，却返回 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了真实的中断原因。属于 agent 可靠性的核心问题。
https://github.com/google-gemini/gemini-cli/issues/22323

### 3.3 Generalist agent 无限挂起（#21409）— 8 条评论
用户反馈一旦 CLI 委派给 generalist agent 就会永久挂起（等待一小时无响应），明确指示不使用 subagent 后问题消失。8 个 👍 表明不少用户遇到相似情况。
https://github.com/google-gemini/gemini-cli/issues/21409

### 3.4 任何 settings.tools.core 值都会排除所有 MCP 工具（#28361）— 4 条评论
设置 `tools.core`（包括空数组 `[]`）会触发策略引擎发出通配 DENY 规则，静默排除所有 MCP 工具，直接破坏了官方 `pr-review` 示例。属于配置系统的严重逻辑缺陷。
https://github.com/google-gemini/gemini-cli/issues/28361

### 3.5 自动记忆（Auto Memory）安全与质量问题（#26525 / #26522 / #26523）— 各 2-5 条评论
三个相关 issue 分别指出：提取代理在内容进入模型上下文后才提示脱敏，未能做到确定性编辑；低信号会话会被无限重试；无效的内存补丁被静默跳过。反映社区对内存系统安全性与健壮性的关注。
https://github.com/google-gemini/gemini-cli/issues/26525
https://github.com/google-gemini/gemini-cli/issues/26522
https://github.com/google-gemini/gemini-cli/issues/26523

### 3.6 供应链安全漏洞：pull_request_target 执行 fork 代码（#28336）— 2 条评论
`eval-pr.yml` 工作流使用 `pull_request_target` 并注入 `GEMINI_API_KEY`，fork 代码可在 eval 门禁后执行，存在 RCE 风险。修复 PR 为 #28232。该 issue 现已关闭，但安全影响重大。
https://github.com/google-gemini/gemini-cli/issues/28336

### 3.7 浏览器代理在 Wayland 下失败（#21983）— 4 条评论
Browser subagent 在 Wayland 环境下直接失败，Termination Reason 为 GOAL（疑似误报成功）。桌面 Linux 用户受影响。
https://github.com/google-gemini/gemini-cli/issues/21983

### 3.8 模型不主动使用 skills 和 sub-agents（#21968）— 6 条评论
用户反映 Gemini 即使拥有相关的自定义 skills（如 gradle、git），也不会主动调用，只有显式指令才会使用。影响自定义工作流的实际落地效果。
https://github.com/google-gemini/gemini-cli/issues/21968

### 3.9 浏览器代理忽略 settings.json 覆盖（#22267）— 4 条评论
Browser Agent 忽略全局/项目级 `settings.json` 中的 `maxTurns` 等配置覆盖，虽然 `AgentRegistry` 正确读取，但实际执行未生效。
https://github.com/google-gemini/gemini-cli/issues/22267

### 3.10 工具数量超过 128 时报 400 错误（#24246）
当可用工具超过 400 个时，Gemini CLI 遭遇 400 错误。社区期望 agent 能更智能地根据任务范围裁剪工具集。
https://github.com/google-gemini/gemini-cli/issues/24246

## 4. 重要 PR 进展

### 4.1 新模型支持：Gemini 3.8 Flash / 3.5 Flash Lite（#29443）
为 Flash 与 Flash Lite 产品线添加最新 GA 模型支持，是今日夜间版的核心变更。
https://github.com/google-gemini/gemini-cli/pull/29443

### 4.2 Cherry-pick 回移：稳定版（#29456）与预览版（#29455）
自动将新模型支持回移到稳定版 v0.60.1（有冲突）与预览版 v0.61.0-preview.1。
https://github.com/google-gemini/gemini-cli/pull/29456
https://github.com/google-gemini/gemini-cli/pull/29455

### 4.3 区分 MCP enablement 配置缺失与格式错误（#29446 / #29445）
两个 PR 同时解决类似问题：损坏的 `mcp-server-enablement.json` 会导致所有 MCP 服务器被默认启用（fail open），且下次 `disable()` 会覆盖损坏文件、丢失全部配置。修复方向是区分 `ENOENT` 与解析错误。
https://github.com/google-gemini/gemini-cli/pull/29446
https://github.com/google-gemini/gemini-cli/pull/29445

### 4.4 工具文件写入原子化与同路径写入序列化（#29244）
并行工具执行时，两个写操作可能同时作用于同一文件，导致静默丢失编辑。此 PR 使写入原子化并对同路径写入串行化。
https://github.com/google-gemini/gemini-cli/pull/29244

### 4.5 修复 get_internal_docs 路径遍历绕过（#29249）
`get_internal_docs` 的路径防护使用字符串前缀比较，缺少路径组件边界，可被同前缀兄弟目录绕过。此 PR 修复该安全漏洞。
https://github.com/google-gemini/gemini-cli/pull/29249

### 4.6 防止无限认证循环（#29448）
修复 Windows、WSL 与无头环境中的无限认证循环问题，解决与 Gemini Code Assist VS Code 扩展的文件争用，并在 keyring 不可用时自动回退到加密文件存储。
https://github.com/google-gemini/gemini-cli/pull/29448

### 4.7 确认后避免重复历史记录与遥测（#29248）
修复确认操作（如 `/resume save <tag>`）后重复插入斜杠命令历史与重复遥测的问题。
https://github.com/google-gemini/gemini-cli/pull/29248

### 4.8 Windows 路径大小写不敏感修正（#29247）
`isWithinRoot()` 使用大小写敏感的字符串比较，在 Windows 上会拒绝大小写不一致但合法的路径（如 `c:\` vs `C:\`），破坏 ACP/IDE 文件系统路由。修复为复用已有的 `isSubpath()`。
https://github.com/google-gemini/gemini-cli/pull/29247

### 4.9 避免嵌套输入历史状态更新（#29342）
重构 `useInputHistoryStore`，避免在 StrictMode 下产生嵌套 React 状态更新，同时保持既有历史排序与去重行为。
https://github.com/google-gemini/gemini-cli/pull/29342

### 4.10 工具确认与 IDE diff RPC 解耦（#29452）
修复在 IDE 集成终端中按 Enter 确认工具审批无响应的问题，将用户确认分发从 IDE diff 解析中解耦，避免 UI 冻结。
https://github.com/google-gemini/gemini-cli/pull/29452

## 5. 功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

- **新模型支持**：社区对新模型迭代响应积极，Gemini 3.8 Flash / 3.5 Flash Lite 的上线是今日最大热点。
- **MCP 配置可靠性**：多个 Issue/PR 围绕 MCP 工具被意外禁用、配置损坏时 fail open 等问题展开，说明 MCP 生态的稳定性已成为核心诉求。
- **Subagent 行为可观测性**：社区多次提出 subagent 轨迹难以查看（#22598）、bugreport 不含 subagent 上下文（#21763）、终止原因误报（#22323）等问题，希望获得更透明的 agent 内部状态。
- **认证流程稳定性**：许可证误报（#28912）与无限认证循环（#29448）表明多环境下的认证体验是用户痛点。
- **Agent 自主使用 Skills**：用户希望模型能更主动地调用自定义 skills 与 sub-agents，而非仅在被明确指令时使用（#21968）。
- **安全性**：供应链漏洞（#28336）、路径遍历（#29249）、Auto Memory 脱敏机制（#26525）等安全问题持续受到社区关注。

## 6. 开发者关注点

- **稳定性优先**：高赞 issue 集中在 agent 挂起、误报成功、工具被静默排除等稳定性问题上，社区对"看起来成功但实际失败"的行为容忍度最低。
- **MCP 配置陷阱**：`tools.core` 的通配 DENY 行为（#28361）与损坏配置的 fail open（#29446/#29445）是两个方向相反的配置缺陷，说明 MCP 配置状态管理仍需打磨。
- **Windows/WSL 环境体验**：路径大小写、认证循环、keyring 问题等均与 Windows/WSL 相关，跨平台兼容性是高频痛点。
- **浏览器代理（Browser Agent）可靠性**：Wayland 失败（#21983）、忽略 settings 覆盖（#22267）、会话锁恢复（#22232）等多 issue 表明该功能的成熟度尚不足。
- **工具输出与内存管理**：长会话中工具输出无界增长导致内存膨胀（#29451）、截断时拆分 UTF-16 代理对（#29304）等工程细节问题也受到关注，说明部分开发者已在使用大规模、长时运行的工作负载。

---
*本日报由 AI 根据 GitHub 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-09-23**

## 1. 今日速览

今日 Copilot CLI 发布 v1.0.89-0 与 v1.0.88 两个版本，新增对 claude-opus-5.5 的支持以及 Ghostty/WezTerm 终端的 OSC 777 通知能力。社区讨论热点集中在会话稳定性问题（compaction OOM、会话卡死）与插件/技能生态可用性上，同时出现了两个 9-23 当天更新的新 Issue（#4946、#4866）值得关注。

## 2. 版本发布

### v1.0.89-0
- **Added**：新增 claude-opus-5.5 模型支持
- **Improved**：连接/重连托管 Connector 时，现在会显示同意进度，并提供可复制的授权 URL

链接：https://github.com/github/copilot-cli/releases/tag/v1.0.89-0

### v1.0.88 / v1.0.88-2（2026-09-22 发布）
- **Added**：为 Ghostty 和 WezTerm 直接会话新增可选的 OSC 777 终端通知
- **Fixed**：底部锚定对话框（含登录设备码）的文本选择功能现已可用
- **Improved**：托管设置刷新失败时保留 /allow-all 配置；记住缺失路径的精确会话批准

链接：https://github.com/github/copilot-cli/releases/tag/v1.0.88、https://github.com/github/copilot-cli/releases/tag/v1.0.88-2

## 3. 社区热点 Issues（10 个精选）

### #4438 `disable-model-invocation: true` 使技能完全不可达，而非仅限手动调用
作者：@grammy-jiang｜👍 9｜评论 7
技能在 `copilot skill list` 中可见，但模型 `skill()` 工具返回 "Skill not found"，用户显式请求也无法使用。
链接：https://github.com/github/copilot-cli/issues/4438

### #2714 功能请求：支持快速启用/禁用插件
作者：@andrader｜👍 11｜评论 3
当前只能安装/卸载插件，无法像 Gemini CLI 和 Claude Code 那样临时切换开关。社区呼声很高。
链接：https://github.com/github/copilot-cli/issues/2714

### #4556 服务端管理的 extraKnownMarketplaces 被拉取但从未注册
作者：@loganvolkers｜👍 2｜评论 4
插件市场列表仅显示两个默认项，服务端下发的 marketplace 条目被静默丢弃，导致插件路径认证失败。
链接：https://github.com/github/copilot-cli/issues/4556

### #4780 会话压缩 OOM 且永不完成，导致会话永久无法恢复
作者：@simukka｜👍 3｜评论 3
达到压缩阈值后进入崩溃循环：`Allocation failed - JavaScript heap out of memory`，每次 `--resume` 都会再次崩溃。
链接：https://github.com/github/copilot-cli/issues/4780

### #4851 Azure MCP 服务器验证失败（BrokenPipe）
作者：@philjones88｜👍 5｜评论 1
使用数月后突然中断：Rust 运行时在验证 Azure API Center MCP 注册表时出现 BrokenPipe，影响企业用户。
链接：https://github.com/github/copilot-cli/issues/4851

### #4946 后台 shell 完成通知后出现 HTTP 400 `content[].thinking` 错误（9-23 新）
作者：@eliam｜评论 1
后台命令跨回合完成后，新回合开头的 system.notification 触发 HTTP 400，疑似消息顺序问题。
链接：https://github.com/github/copilot-cli/issues/4946

### #4919 `/ask` 在 auto 模式下不工作
作者：@ecki｜评论 3
v1.0.86 中，auto 模式下的 `/ask` 持续报 "model not supported" 错误，影响多模式工作流。
链接：https://github.com/github/copilot-cli/issues/4919

### #4866 `ask_user` 表单中 Ctrl-D 触发会话关闭并丢弃输入（9-23 更新）
作者：@cthorman｜👍 1｜评论 1
主 prompt 编辑器的 Ctrl-D 语义正常，但在 elicitation 表单字段中会直接导致会话退出，输入数据丢失。
链接：https://github.com/github/copilot-cli/issues/4866

### #4755 会话在回合结束时收到排队消息后永久卡死
作者：@NSTA1｜评论 3
会话既不空闲也不运行，不接受任何输入、不处理队列消息，只能杀掉进程恢复。
链接：https://github.com/github/copilot-cli/issues/4755

### #4003 功能请求：支持 Copilot CLI 自定义模型端点（类似 VS Code）
作者：@holwon｜评论 3
希望像 VS Code Language Models 面板一样配置本地/私有模型端点，用于本地开发和企业私有部署。
链接：https://github.com/github/copilot-cli/issues/4003

## 4. 重要 PR 进展（当前仅有 1 条更新）

### #4770 文档化 WebSocket responses 的 opt-out 机制
作者：@1fanwang｜创建于 2026-09-08｜更新于 2026-09-22
当模型声明 WebSocket 响应端点但该传输不可用时（网络屏蔽或报 `400 input item ID does not belong to this connection`），提供明确的退出方式。文档化该工作区开关。
链接：https://github.com/github/copilot-cli/pull/4770

> 说明：过去 24 小时内仅此一条 PR 更新，暂无其他合并/新增 PR 数据。

## 5. 功能需求趋势

从近期 Issue 中提炼的社区关注方向：

- **插件生态管理能力**：插件启用/禁用开关（#2714）、服务端托管市场的注册可靠性（#4556）
- **模型支持扩展**：自定义模型端点配置（#4003）、BYOK 兼容性修复（#4840、#4646）、新模型适配跟进（claude-opus-5.5）
- **会话稳定性与资源管理**：compaction 失败/OOM（#4780、#4663）、事件存储耗尽后的重试风暴（#4639）
- **终端交互体验**：底部对话框文本选择（已修复）、Ctrl-D 语义统一（#4866）
- **企业/MCP 集成**：Azure API Center 校验失败（#4851）、托管配置并发覆盖问题（#4900）

## 6. 开发者关注点

- **compaction 是当前最大的稳定性痛点**：多个 Issue 指向会话压缩在上下文累积后 OOM 或反复重试，且无用户可见错误提示（#4780、#4663）
- **长期运行会话的可靠性问题**：auth token 停止刷新（#4929）、事件存储耗尽后的 GC/压缩循环（#4639）、会话永久卡死（#4755）
- **配置管理状态存在并发覆盖风险**：多会话并发退出时 `~/.copilot/config.json` 被整体覆写，trustedFolders 等托管状态丢失（#4900）
- **BYOK/自定义模型路径的兼容性仍需加强**：custom tool type 反序列化失败、compaction tool choice 报错等问题频现（#4840、#4646）
- **技能与插件的可发现性/可用性存在缺口**：`disable-model-invocation` 导致技能彻底不可达（#4438），服务端市场注册失败（#4556）

---

*数据来源：[github.com/github/copilot-cli](https://github.com/github/copilot-cli) ｜ 统计周期：2026-09-23*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-09-23

> 数据来源：[github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 1. 今日速览

Kimi Code CLI 发布 **v1.52.0**，将 Python 包入口点改造为指向新 TypeScript 版 CLI 的迁移引导，正式开启版本过渡期。社区侧唯一活跃 Issue（#2336）聚焦**内存压力下的会话完整性问题**已持续 4 个月仍在排期。PR 方面以依赖自动升级为主，另有两个针对 Web 端 IME 输入和 `x-opencode-session` 头部的功能性修复值得关注。

---

## 2. 版本发布

### v1.52.0（最新）
- **核心变更**：`feat(cli)`：将入口点短接到 Kimi Code 安装器（by @sailist in [#2666](https://github.com/MoonshotAI/kimi-cli/pull/2666)）
- **背景**：Python 版 kimi-cli 仓库已归档，此版本使 `uv tool install kimi-cli` 的用户自动引导至新 TypeScript 版 CLI，与 #2659（归档仓库 + PyPI tombstone）互补，构成完整的迁移路径。
- **完整变更日志**：[1.51.0...1.52.0](https://github.com/MoonshotAI/kimi-cli/compare/1.51.0...1.52.0)

---

## 3. 社区热点 Issues

> 当前数据中仅有 1 条活跃 Issue（更新于过去 24 小时），以下全量收录并分析。

### #2336 [OPEN] 会话在内存压力下损坏：对话丢失 + 恢复时出现 400 tool_call 错误
- **作者**：@kkc25 | 创建：2026-05-21 | 更新：2026-09-22 | 评论：2 | 👍：0
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2336
- **环境**：Kimi Code CLI v1.43.0 / Kimi Code 订阅 / `kimi-for-coding` 模型 / Linux 6.8.0
- **摘要**：在内存压力场景下，会话文件发生损坏，导致历史对话丢失；尝试恢复时，模型返回 **400 tool_call 响应错误**。
- **重要性**：该 Issue 是当前唯一活跃的社区反馈，直接冲击核心使用体验（会话持久化是 CLI 工作流的基础能力）。创建至今已 4 个月仍未关闭，且最近一次更新就在昨天，说明该问题仍在复现或讨论中。
- **社区反应**：2 条评论，关注度不算高，但问题本身性质严重（数据丢失 + 恢复路径不可用），值得官方优先排查。

---

## 4. 重要 PR 进展

> 当日活跃 PR 共 8 条（全量收录），按类型分组如下。

### 🔧 功能性 PR（3 条）

| PR | 状态 | 说明 |
|---|---|---|
| [#2666 feat(cli)](https://github.com/MoonshotAI/kimi-cli/pull/2666) | ✅ 已合并 | 入口点短接到 Kimi Code 安装器，构成 v1.52.0 核心变更（见版本发布） |
| [#2667 fix(web)](https://github.com/MoonshotAI/kimi-cli/pull/2667) | ✅ 已合并 | 修复 WebKit 下 CJK IME 组合输入时 Enter 键误提交问题（`keyCode === 229` 时 React 尚未观测到 `isComposing`），在既有提交边界添加 WebKit 兼容守卫。对中文/日文/韩文用户输入体验有直接改善 |
| [#2656 fix(llm)](https://github.com/MoonshotAI/kimi-cli/pull/2656) | 🟡 开放中 | 为 OpenAI Legacy 兼容层识别官方 OpenCode 主机（`opencode.ai` / `*.opencode.ai`）并附加稳定的 `x-opencode-session` 头（使用当前 Kimi 会话 ID），修复 OpenCode Go 返回 HTTP 400 的问题。关联 Issue：#2653 |

### 📦 依赖升级 PR（5 条，均为 dependabot 自动发起）

| PR | 依赖 | 版本变化 | 说明 |
|---|---|---|---|
| [#2664](https://github.com/MoonshotAI/kimi-cli/pull/2664) | agent-client-protocol | 0.8.0 → 0.12.1 | 跨多个 minor 版本升级，涉及协议层变更 |
| [#2663](https://github.com/MoonshotAI/kimi-cli/pull/2663) | rich | 14.2.0 → 15.0.0 | 主版本升级，含“So Long 3.8”修复 |
| [#2662](https://github.com/MoonshotAI/kimi-cli/pull/2662) | fastapi | 0.128.0 → 0.141.1 | 跨 13 个 minor 版本，含多项修复 |
| [#2665](https://github.com/MoonshotAI/kimi-cli/pull/2665) | ruff（dev） | 0.14.14 → 0.16.8 | Linter/Formatter 工具链升级 |
| [#884](https://github.com/MoonshotAI/kimi-cli/pull/884) | ruff（dev） | 0.14.14 → 0.15.0 | 较早的 ruff 升级 PR，同日被刷新（未合并） |

> **观察**：密集的依赖升级与 Python 版仓库进入维护模式（归档）的动作一致——在冻结功能开发的同时，保持依赖链安全与兼容性。

---

## 5. 功能需求趋势

基于当前活跃数据（1 个 Issue + 8 个 PR），可提炼以下趋势：

1. **Python → TypeScript 迁移链路**：v1.52.0 的入口点短接和 #2659 的 PyPI tombstone 表明，官方正在系统性收编 Python 版用户，迁移路径的顺畅度是当前阶段最高优先级。
2. **协议兼容性扩展**：#2656 针对 OpenCode Go 主机的 `x-opencode-session` 头支持，说明社区用户正在将 Kimi Code CLI 接入更多第三方编码代理后端，跨平台/跨协议互操作需求上升。
3. **Web 端输入体验精细化**：#2667 对 WebKit IME 组合输入的处理，反映了中日韩用户在多语言混输场景下的真实痛点，Web 前端交互细节正在被认真打磨。
4. **会话数据可靠性**：#2336 暴露的会话文件损坏问题虽未形成趋势，但与“恢复时 400 错误”同时出现，暗示会话序列化/反序列化链路存在健壮性隐患，可能是后续 TypeScript 版需要重点加固的方向。

---

## 6. 开发者关注点

- **会话稳定性是核心痛点**：现有 Issue #2336 表明，内存压力下会话文件损坏会导致**不可逆的对话丢失**，且恢复操作返回 400（tool_call 错误）使自动恢复机制失效。对于依赖 CLI 进行长会话工作的开发者，这是阻断级问题。
- **版本过渡期的迁移透明度**：v1.52.0 将入口点改为引导至新安装器，但 Python 版用户的实际迁移路径（数据迁移、配置兼容性）尚不明确，社区期待更详细的迁移文档或公告。
- **依赖维护持续进行**：在仓库归档背景下，dependabot 仍持续推送依赖升级（fastapi、rich、agent-client-protocol 等），说明 Python 版短期内仍在维护窗口内，用户可继续安全使用，但也需留意各依赖主版本升级（如 rich 15.0.0）可能引入的破坏性变更。
- **跨平台输入兼容性**：#2667 的 IME 修复对使用 CJK 输入法的开发者是实质性改进，此类细节优化有助于提升中文用户群体的使用体验。

---

*本日报由 AI 自动整理，仅供技术参考。完整数据请访问 [MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-23

## 今日速览

今日社区的核心焦点集中在两大方向：一是付费订阅与账户迁移问题持续发酵（#49768、#50201 均为未解决状态），引发用户对计费可靠性的担忧；二是错误信息在 CLI/TUI 中不透明的问题，已获得一批 PR 的集中修复（#50778、#50783、#50788）。此外，大量提交于 7 月的旧 Issue 今日被批量关闭，社区活跃度明显回升。无新版本发布。

---

## 社区热点 Issues

### 1. 付费订阅被标记为不活跃，请求全部失败（严重）
**#49768** `[OPEN]` 用户已支付 OpenCode Go 月订阅，但工作区仍显示订阅非活跃，所有 Go 模型请求被拒绝（`Account.Disabled`），附有订单号 `1310-7371`。6 条评论，1👍。涉及资金安全，优先级极高。
🔗 https://github.com/anomalyco/opencode/issues/49768

### 2. 控制台迁移导致账户丢失
**#50201** `[OPEN]` 用户报告 Console 迁移后旧的 Go 订阅、使用量和发票全部不可见，被迫进入全新的空组织。4 条评论，4👍——这是今日 👍 数最高的 Issue，说明多位用户可能遇到同类问题。
🔗 https://github.com/anomalyco/opencode/issues/50201

### 3. VSCode 扩展无法显示视图数据（高热度）
**#10119** `[CLOSED]` 安装新 VSCode 扩展后侧边栏仅显示 "There is no data provider registered that can provide view data." 共 23 条评论、17 👍，是今日评论数最多的 Issue。虽然已关闭，但讨论热度表明 IDE 集成仍是大规模用户的痛点。
🔗 https://github.com/anomalyco/opencode/issues/10119

### 4. 模型跳转到另一种语言回复
**#25130** `[CLOSED]` 使用 Big Pickle 模型时偶尔会用另一种语言回复，用户被迫手动纠正。11 条评论，说明非英语用户群体对该问题感受强烈。
🔗 https://github.com/anomalyco/opencode/issues/25130

### 5. 递归读取父目录 agents.md 导致意外注入
**#6479** `[CLOSED]` 在子目录启动 opencode 时会读取两级以上父目录的 `agents.md`，导致项目出现非预期的 agent 行为。11 条评论，属于配置隔离性缺陷。
🔗 https://github.com/anomalyco/opencode/issues/6479

### 6. Qwen 模型返回 JSON 而非执行写入操作
**#29757** `[CLOSED]` 用户要求生成 Python 脚本并写入文件，OpenCode + Qwen 却返回了 write 命令的原始 JSON。10 条评论、2👍，反映本地模型与工具调用的兼容性仍需加强。
🔗 https://github.com/anomalyco/opencode/issues/29757

### 7. 后台钩子 stderr 污染输入框
**#31219** `[CLOSED]` 后台 hook 的 stderr 输出会被绘制到输入框中，直到终端重绘才消失。4 条评论、3👍，属于 TUI 渲染竞态问题。
🔗 https://github.com/anomalyco/opencode/issues/31219

### 8. 模型选择被静默重置（今日新增）
**#50769** `[CLOSED]` 用户报告同一模型选择在 3 台电脑上被自动更改，DeepSeek V4.1 Flash 被替换为 V4 Pro 或本地模型，且不同会话间表现不一致。2 条评论，与 #38770 背景子代理重置模型选择为同一类问题，值得追踪。
🔗 https://github.com/anomalyco/opencode/issues/50769

### 9. 上游请求失败：账户资金不足（今日新增）
**#50766** `[CLOSED]` 用户报告 "Insufficient account funds" 错误且描述含糊，无法定位具体原因。3 条评论，此类错误信息的可操作性不足已是社区共识。
🔗 https://github.com/anomalyco/opencode/issues/50766

### 10. GREP 工具频繁报错导致会话中断（今日新增）
**#50770** `[CLOSED]` 用户反馈 GREP 工具频繁报告错误，使会话被迫中断。2 条评论，工具稳定性直接影响 Agent 的工作效率。
🔗 https://github.com/anomalyco/opencode/issues/50770

---

## 重要 PR 进展

### 1. 修复裸 `null` SSE 帧引起的流中断
**#50793** `[OPEN]` 兼容 OpenAI 的代理在流中间或 `[DONE]` 后发送 `data: null`。此 PR 让 `sseFraming` 正确忽略这些裸空帧，修复 Chat Completions 和 Responses 两种端点的中断问题。
🔗 https://github.com/anomalyco/opencode/pull/50793

### 2. 保留 AI SDK V2 提供商的 usage 与 finish reason
**#50797** `[OPEN]` 动态加载的 `LanguageModelV2` 提供商会静默丢失 token 用量信息，进而禁用自动压缩。此 PR 修复该数据链路。
🔗 https://github.com/anomalyco/opencode/pull/50797

### 3. 压缩预检中忽略不可能的 usage 报告
**#50796** `[OPEN]` 当 `estimateTokens()` 与上报的 usage 矛盾（如 usage 为 0 或负数）时，`SessionCompaction.required` 现在会跳过这些不可信的数值，避免误触发或阻塞压缩。
🔗 https://github.com/anomalyco/opencode/pull/50796

### 4. 客户端将声明的 API 错误抛出为 Error 实例
**#50788** `[OPEN]` 生成的客户端对声明错误状态原先直接 `throw await json(response)`，导致调用方收到普通对象而非 `Error` 实例，stack trace 和 `instanceof` 判断失效。
🔗 https://github.com/anomalyco/opencode/pull/50788

### 5. 在 CLI/TUI 所有剩余路径显示 API 错误信息
**#50783** `[OPEN]` 接续 #50778，审计并修复了 TUI 和 CLI 中其余将解码错误体作为普通对象抛出的路径，使用户能看到真实错误消息而非笼统提示。
🔗 https://github.com/anomalyco/opencode/pull/50783

### 6. TUI toast 显示 API 错误信息
**#50778** `[CLOSED]` 修复 MCP 登录失败时 TUI 只显示 "Authentication failed" 的问题，现在 toast 中会展示服务器返回的实际失败原因。
🔗 https://github.com/anomalyco/opencode/pull/50778

### 7. 托管服务端口冲突后自动重试绑定
**#50782** `[OPEN]` 托管服务启动时端口竞争会直接失败，且原逻辑只查找已有服务、从不再次绑定。现在会在端口释放后重试绑定。
🔗 https://github.com/anomalyco/opencode/pull/50782

### 8. 保留后台服务启动失败的原始错误
**#50784** `[OPEN]` 之前若一个子进程失败但另一个仍在启动，用户最终只看到 "Timed out waiting"；现在保留已失败子进程的 stderr 作为根因。
🔗 https://github.com/anomalyco/opencode/pull/50784

### 9. 升级 OpenTUI 渲染器至 0.5.10
**#50372** `[OPEN]` 修复线程化输出的背压处理，以及多个渲染器相关的崩溃问题。对 Windows 和大型输出场景的稳定性有显著改善。
🔗 https://github.com/anomalyco/opencode/pull/50372

### 10. 新增浏览器工具：视觉 UI 验证
**#48755** `[OPEN]` 新增 browser 工具，让 Agent 不仅可读 DOM 还能进行视觉层面的 UI 验证。由此前的 #48505 的同一分支重新开 PR，修复了模板合规问题。
🔗 https://github.com/anomalyco/opencode/pull/48755

---

## 功能需求趋势

从近期 Issues 看，社区最关心的功能方向十分明确：

1. **模型/Provider 兼容性扩展** — 包括 Crof AI 支持（#24636）、Kimi 图标保留（#50785），以及 Qwen 等本地模型的工具调用适配（#29757）
2. **IDE 集成成熟度** — VSCode 扩展的 "no data provider" 问题获得 17 👍，说明 VS Code/TUI 双端体验不一致是许多开发者的日常痛点（#10119）
3. **会话与项目管理** — 用户提出为对话框增加项目分类、命名、按项目分组历史记录（#38525）；项目列表按最近活动排序也已在 PR #50790 中实现
4. **自动化研究/实验工作流** — #35496 提出内置 `opencode research` 命令，将"改代码→跑实验→记录→重复"的实验循环做成一流公民，开发者正在探索将 OpenCode 用于更复杂的研发场景
5. **Agent 行为可观测性** — 多个 Issue/PR 关注子代理模型的显示（#50798）、后台子代理对模型的静默篡改（#38770），用户越来越需要了解"当前实际在跑什么模型"

---

## 开发者关注点

从 Issue 反馈和解决状态中可以提炼出以下高频痛点：

- **模型选择被静默篡改**：手动选择的模型会被后台子代理通知或"系统自动纠偏"悄悄重置（#38770、#50769），破坏了用户对会话可控性的信任
- **错误信息不可操作**："Insufficient account funds"（#50766）、"Unexpected error / ServeError"（#38738）这类无上下文的报错让用户无从排查，社区已有多条 PR 在修复（#50778、#50783、#50788）
- **账户与计费问题成为信任危机**：#49768 付费订阅被标为不活跃、#50201 控制台迁移丢账户——涉及真金白银的问题如果处理不及时，会显著影响社区口碑
- **崩溃稳定性**：#38756（提交任务 1 秒后崩溃）、#38771

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-23

## 1. 今日速览

昨日发布频率密集：核心 CLI 与桌面端同时推进，**v0.24.5-preview.0、v0.24.4、desktop-v0.24.4** 以及两个 nightly 版本相继释放，主要包含 monitor 工具引导、deferred-tool bridge 文档修正等工作。社区讨论热度集中在 **剪贴板静默失败**（多条 issue/PR 围绕 Linux/WSL 剪贴板展开）和 **会话管理韧性**（超时恢复、Managed Agent 架构、大通知导致会话重建）两大方向。此外，Batch API 工作流、工作区置顶、模型管理宿主控制等新功能 PR 正在推进中。

## 2. 版本发布

| 版本 | 类型 | 主要内容 |
|---|---|---|
| [v0.24.5-preview.0](https://github.com/QwenLM/qwen-code/releases) | Preview | 修正 deferred-tool bridge 导致的过时文档与测试；记录 CI 测试相关计划文档 |
| [v0.24.4](https://github.com/QwenLM/qwen-code/releases) | Stable | 新增 monitor 工具到系统提示词引导；无已知破坏性变更 |
| [desktop-v0.24.4](https://github.com/QwenLM/qwen-code/releases) | Desktop | 修复 review 流程中未计划的 chunk 进入覆盖率统计的问题；含其他新功能 |
| [v0.24.4-nightly.20260922](https://github.com/QwenLM/qwen-code/releases) | Nightly | deferred-tool bridge 修复；计划文档记录 |
| [v0.24.3-nightly.20260922](https://github.com/QwenLM/qwen-code/releases) | Nightly | 新增 monitor 工具引导；daemon 增加批处理工作区相关能力 |

## 3. 社区热点 Issues（10 个）

### 架构与设计

1. **[#12380 Managed Agent 双路径架构提案](https://github.com/QwenLM/qwen-code/issues/12380)**（评论 10）
   社区讨论最激烈的 issue。提案定义了分阶段交付的 Managed Agent 架构：保留现有 TypeScript agent 循环、模型推理与工具环境供给解耦，并为 Sessions 引入持久所有权、Workspace 绑定、可恢复工具执行和稳定 WebSocket 通道。该议题与 roadmap 中的 session-management、multi-agent、platform-distribution 多个方向关联。

2. **[#12381 HTTP 网关超时后恢复 session-create 结果](https://github.com/QwenLM/qwen-code/issues/12381)**（评论 7）
   场景：浏览器已收到网关超时，但 `POST /session` 实际已创建成功。客户端拿不到 session ID，无法安全地重试。该问题直接阻塞了不可靠网络下的 Web Shell 使用，社区期待 daemon 端提供幂等/查询机制。

3. **[#11908 超大 `available_commands_update` 通知导致会话 404](https://github.com/QwenLM/qwen-code/issues/11908)**（评论 5，P1）
   当通知超过 MAX_JSON_NODES（10000）时，ACP bridge 判定为无效消息并 teardown 通道，SIGKILL 子进程，之后所有请求均返回 "No session with id"。属于服务端稳定性 P1 缺陷。

### Bug 与体验问题

4. **[#12449 TUI 在软键盘收缩时吞掉一行 transcript](https://github.com/QwenLM/qwen-code/issues/12449)**（评论 10）
   Termux/移动软键盘场景下，rows-only shrink 导致 append-only Static 路径吞行。已查明根因：捆绑的 ink 7.0.3 早于上游 rows-shrink 修复（#1031）。`useTerminalBuffer: true` 的虚拟化路径不受影响。

5. **[#12425 CodeModeOnly 隐藏工具与 workflow 桥接命名冲突](https://github.com/QwenLM/qwen-code/issues/12425)**（评论 8，已关闭）
   workflow 关键字桥接句子会将 CodeModeOnly 模式下被隐藏的工具（如 TOOL_SEARCH、tool_call）暴露在提示中，造成模型收到无法调用的工具名。已由 @yiliang114 提交修复。

6. **[#12488 Linux/WSL 剪贴板静默失败](https://github.com/QwenLM/qwen-code/issues/12488)**（评论 6，已关闭）
   wl-paste/xclip 缺失时 Ctrl+V 完全无响应、无报错、无降级。该 issue 引发了一系列后续追踪（#12503、#12504、#12505），社区反馈强烈，期望至少给出错误提示或提供 WSL powershell.exe 降级路径。

7. **[#12460 Auto 模式下 `git commit --amend` 被误拦截](https://github.com/QwenLM/qwen-code/issues/12460)**（评论 4）
   即使 amend 的是 agent 自己本次会话的提交，也会被确定性破坏性命令门禁拦截。根因是 `sessionCommitShas` 从未被填充，"本次会话内 agent 所做提交"的豁免逻辑是死代码。

8. **[#12417 工具执行沙箱设置加固追踪](https://github.com/QwenLM/qwen-code/issues/12417)**（评论 7）
   追踪 Linux bubblewrap 从整个 CLI 下沉到单工具执行后的安全加固情况。PR #12267 已通过 5 轮 review，但仍需系统性验证遗漏场景。安全类 issue 中关注度最高。

9. **[#12424 子代理工具策略不可见导致指针无法跟随](https://github.com/QwenLM/qwen-code/issues/12424)**（评论 5）
   `resolveBundledReferenceRoute` 只读取 session 级输入，无法感知 per-agent 工具策略。技能被拒绝的子代理仍会得到指向不可用工具的指针。已标记为 ready-for-human。

10. **[#12164 Web Shell 充当 Live Host 实现浏览器实时语音](https://github.com/QwenLM/qwen-code/issues/12164)**（评论 5，已关闭）
    希望浏览器直接成为 `qwen3.5-omni-plus-realtime` 的音频端点，而非仅作远程控制器。当前仅 macOS 原生 Live Host.app 支持，社区对跨平台实时语音的诉求明显。

## 4. 重要 PR 进展（10 个）

1. **[#12492 agent 驱动的 Batch API 工作流 (`/batch --api`)](https://github.com/QwenLM/qwen-code/pull/12492)**（@yiliang114）
   用户输入 `/batch --api <task>` 后，agent 判断任务是否适配批处理形态、采样文件、编写小计划并生成确定性流程。基于 #11874 的 Batch API 传输层，是批处理能力的智能化入口。

2. **[#12358 独立 Managed Agent 技术栈](https://github.com/QwenLM/qwen-code/pull/12358)**（@doudouOUC）
   从常驻 Harness → Java 控制平面 → 会话级 Tool Runtime 的端到端预览，包含持久化 Managed Session 记录、Hosted Harness 与 Runtime Broker 契约、独立 Spring Boot 控制平面。对应 #12380 架构提案的落地雏形。

3. **[#12508 原生模块抛异常时上报剪贴板不可用](https://github.com/QwenLM/qwen-code/pull/12508)**（@yiliang114）
   修复 `clipboardHasImage()` 在非 Linux 路径 catch 中只记日志返回 false 的静默失败问题，将异常路径也纳入 onUnavailable 回调。这是 #12488 系列剪贴板修复的第三轮补漏。

4. **[#12475 群组成员访问与 senderPolicy 解耦](https://github.com/QwenLM/qwen-code/pull/12475)**（@qwen-code-dev-bot）
   新增独立的 `groupSenderPolicy` 维度，使频道可以允许"已准入群组的任何人"发言，同时保留 DM 的 allowlist 限制。此前二者无法独立表达。

5. **[#12495 sed --quiet/--silent 分类为只读](https://github.com/QwenLM/qwen-code/pull/12495)**（@waybarrios）
   GNU sed 长拼写 `--quiet`/`--silent` 与 `-n` 一视同仁，避免无害的只读预览命令触发不必要的确认弹窗。

6. **[#12462 移动端 composer 控件在软键盘下保持可访问](https://github.com/QwenLM/qwen-code/pull/12462)**（@wenshao）
   修复三个仅在软键盘收缩视口时出现的触控 composer 布局问题：workspace/Git 行高度计入 composer 高度上限、附件区保留空间、两行换行场景正确适配。

7. **[#12452 Web Shell 侧边栏工作区置顶](https://github.com/QwenLM/qwen-code/pull/12452)**（@jpg1024）
   支持将工作区钉在侧边栏顶部，按置顶时间排序，状态在 daemon 重启后持久化。修复 #12444。

8. **[#12154 git 对话框新增 Worktrees 管理页](https://github.com/QwenLM/qwen-code/pull/12154)**（@wenshao）
   第四页签展示工作区仓库的全部 worktree：slug/目录名、主 worktree/当前工作区/锁定/缺失目录徽章、分支或 detached HEAD、短 HEAD 等。状态由自动修复机器人接管推进。

9. **[#12345 WebShell 宿主可控制模型管理能力](https://github.com/QwenLM/qwen-code/pull/12345)**（@Lilian0122）
   新增 `modelManagement={{ allowAdd, allowDelete }}` 宿主控制项，默认均为 true 且独立生效。宿主可以隐藏模型新增/删除交互，同时保留模型列表、当前模型指示、切换

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*