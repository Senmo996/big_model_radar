# OpenClaw 生态日报 2026-08-18

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-18 00:36 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 开源项目动态日报 | 2026‑08‑18

> 数据来源：github.com/openclaw/openclaw · 统计窗口：2026-08-17 ~ 2026-08-18
---

## 1. 今日速览

OpenClaw 项目在过去 24 小时内保持了非常高的社区参与度：**500 条 Issue 更新**（其中 483 条新开/保持活跃，仅 17 条关闭）与 **500 条 PR 更新**（379 条待合并，121 条已合并/关闭）。但与此同时，Issue 关闭比例过低（仅 3.4%）以及大量“无新 fix PR”积压标签，反映出维护团队的**审查与响应速度正面临较大压力**。今日最大的热点集中在嵌入式运行器（embedded-run）的稳定性、上下文窗口丢失、以及 Auth/Provider 级故障的致命影响上——均属可直接影响终端用户的可靠性议题，应当是接下来优先攻坚的方向。

---

## 2. 版本发布

**无新版本发布。** 自 2026‑06‑29 以后，项目已有约 50 天未发布正式 Release。考虑到今天新增了 379 条待合并 PR（涵盖 Web UI、Codex 集成、Discord/Matrix 渠道和安全性多个方向），社区对下一个版本的期待可能在持续累积。

---

## 3. 项目进展

过去 24 小时中没有超大焦点功能的合并，但有一批渐进式完善（121 条 PR 已合并/关闭）。结合标签，以下是值得注意的已合并或已关闭的 PR（详情请参看链接）：

- **`#120900` feat(ui): review install policy warnings** — 已关闭（合并）：为控制台 UI 增加了“审查并继续安装”插件风险警告等流程。同步核心 CLI 与 UI 的安装安全关键缺口，插件安装在用户侧变得更容易追踪。
  https://github.com/openclaw/openclaw/pull/120900
- **`#125426` fix(ui): avoid false delivery warnings after stale history** — 已关闭（合并）：修复 WebChat 在稳定连接下，因终端对历史进度校验的运用不当时，用户会无故看到 “Delivery uncertain”（发送不确定）的误报。提升日常 Web 可靠性。
  https://github.com/openclaw/openclaw/pull/125426
- **`#125460` fix(integer-discord): remove unnecessary internal tool-trace scaffolding from outbound text** — 已关闭（合并）：修复了 Discord 在输出中直接出现 `<tool_call>/<tool_result>/[Tool Call…]` 等违规内部脚手架内容的问题，这是最后一个没有未 `sanitizeText` 钩子的官方通路。
  https://github.com/openclaw/openclaw/pull/125460
- **`#124714` fix(cli): avoid exposing provider env values in parse errors** — 已关闭（合并）：修复了在基于格式错误的 `--provider-env` 解析报错时会重复披露 API Key 等凭据信息的泄漏安全漏洞。
  https://github.com/openclaw/openclaw/pull/124714
- **`#124934` fix(code-mode): show device surface in debug logs** — 已关闭（合并）：让 `OPENCLAW_DEBUG_CODE_MODE` 的调试日志现在能正确反映代码模式是否开启及工具面集合是否到达。
  https://github.com/openclaw/openclaw/pull/124934

**结论**：项目在“代码/工具泄漏”与“安装安全”两类安全小修上动得比较快，且对 Discord / WebChat 渠道提示整洁度有较高关注度。但另一方面，PR 队列中仍有 379 处在等待合并，其中大量标有 `maintainer look` 标签，说明这些进度中很可能受上游时间分配限制。

---

## 4. 社区热点

以下为今日讨论最活跃或反应最激烈的 3 个高质量议题，叠加挖掘了其背景：

1. **#77598 — Track live dev agent behavior and trajectory** `️ 银贝牡蛎`
   评论 23 个，作者是核心维护者 `@pashpashpash`。这是一个“跟踪用户行为与路径”的运行笔记：本质是**计划在连续 24 小时内观测 Pash 的真实 AI agent 的行为、道路与产出**，用于对照框架给出的实际开发中的期望行为。社区希望看到来自真实环境的过程测效，可以理解为倡导“务实的可用性”的典型信号。
   ▶ https://github.com/openclaw/openclaw/issues/77598
2. **#91009 Royal 20 个评论 · #2 铂金寄居蟹级 「P1 伤害：message-loss + crash-loop」**
   Codex PreToolUse 原生钩子转发，触发生成了 CPU 密集的 `openclaw-hooks` 进程并且阻塞了 Gateway RPC。
   这是一条近期十分紧急的稳定性报告：用户经常在 `@openclaw/codex` 的集成中，看到 CPU 被吃满并导致链路拥堵。目前仍标记为 `needs-live-repro`，且未看到合入修复。
   - https://github.com/openclaw/openclaw/issues/91009
3. **#68596 — Feature Request: Configurable streaming watchdog timeout threshold** `️ 8 人赞`
   由于 DeepSeek-R1 / kimi-k2.5 这类进行长思考的模型，`streaming watchdog` 仅以固定的 30 秒规则等待更新，导致持续误报并重置。
   15 条讨论留言都在剖析当前“路由器对强制结束”的粒度问题——可能并派生出“可配置超时”的字段。
   - https://github.com/openclaw/openclaw/issues/68596

**诉求汇聚**：
- 针对 Codex、持续长思考模型 的无缝适配；
- 需要更细粒度（可调）的回调/等待逻辑；
- 观测/调试代理本身的透明度。

---

## 5. Bug 与稳定性

高严重级别（platinum/hermit 与 diamond）的 Bug 依然较多，按影响面排序：

**(1) 崩溃 / CPU 耗尽类：**

| Issue | 影响 | 状态 |
|---|---|---|
| **#91009** — Codex PreToolUse hook 产生 CPU‑bound 进程并锁死 Gateway RPC | CPU 耗尽、P1、crash‑loop | `needs-live-repro`，尚无 fix PR |
| **#97616** — OpenClaw 泄漏不回收的 hook/tool 子进程，使僵尸进程堆积并造成运行时性能下降 | 回归，P1 `crash-loop`；老版本的它可能情况变好 | 等待 maintainer 提供 info |
| **#45224** — Playwright 未处理断言错误直接崩溃整个 Gateway | 尽管标记 `not-repro-on-main`，但若触发则需 launchd 硬重启 | 保持开放，等待活复盘 |

**(2) 长期挂起（数据丢失 / 模型拒绝返回）**
- **#38327** — `2026.3.2`/Vertex/Gemini-3.1 环境下的 **对象转换失败（undefined 对象错误）回归** — 截止现在仍未修复，话题已从 `2026‑03` 存续至今。
- **#62505** — Coding Agent 再也不完成任务（确认在 `2026.4.2` 前可用）—— `P1/regression/message 丢失`，仍在 maintainer review。
- **#67777 — 子任务完成消息在宣布超时/期间可能直接被丢弃** — 仍要求维护者产品决策。

**(3) 提供商/认证的硬堵点**
- **#86215 — Codex OAuth 刷新失败可让 agent 被卡死数小时**，且无提醒与快速轮换 —— 高密度的 `platinum-level` 风险，暂无修复 PR。
- **#70903 — 基于文件的持久 provider cooldown 在账单恢复后仍继续阻止用户数小时** —— 跌落到 P0 却被标记 `no product decision`，用户催询较多。

**(4) 回归**
- **#77930 — Discord 频道在 2026.5.4 下无法加载**（beta.2/beta.3 亦恶化，回滚 4.29 可修）—— 刚才有 `linked-pr-open`，但仍待合入 `2026.6.1` 的后继。

**可靠性标签**：
`clawsweeper:no-new-fix-pr` 仍然也出现在多个 P1/Diamond 问题中（例如 #38327、#62505、#91009），这是一个清晰的“路径阻塞”信号：有的是等待用户提供复现，有的是缺少产品决策。

---

## 6. 功能请求与路线图信号

**社区目前最关心的（有多个高赞却无主力 fix PR 的）功能项，可能成为下个版本的核心候选：**

| 提案 | 类型 | 反馈 |
|---|---|---|
| **#68596 ✅ Configurable streaming watchdog timeout** | 模型兼容性/长思考适配 | 8 赞，15 评论，讨论热度表明需要立刻支持 `kimi‑k2.5/DeepSeek‑R1` |
| **#67419 上下文动态：bootstrap 文件每一轮都重新注入，浪费 20‑30% 的 token** — P2 / Diamond | **性能/Jailbreak 类比攻击面**：完全做法可缩小成本，长期 agent 话轮清晰度上也有影响 | 2 赞，10 评论 |
| **#42840 MathJax/LaTeX 渲染支持** | UI 提升 | 10 👍 — 高赞社区 SEO |
| **#71058 单 Gateway 下支持多 Azure/Teams Bot** | 大客户部署点 | 社区希望将 YAML 再次支持（#45758 也有 2 赞） |

**路线图上的收敛点（已有 PR 对齐）：**
- **上下文窗口源头/剪枝**：`PR #124303` 已开始跟踪 context-window provenance，并在此处记录是否由 telemetry 或 prepared/config 落产生。这将为上述 `#67419` 提供真正的解法。
- **SDK / app-client happy path 稳定**（#74704）仍在主线板上，与今天大量 WebUI/ macOS 合入内容呼应。
- **安全安装策略**：`#120900`/`#116489` 的合并使“手工审查插件安装”成为默认流程，未来新安装或撤销会更有审计友好性。

偶尔的“带安全威胁的小修”已被无收尾但合并，这几件事都是稳妥的。

---

## 7. 用户反馈摘要

来自新老 Issue 的更真实声音：

- **割裂感的真实、不止一人表达了**
  1. 连续 3+ 周使用 categories（例如使用 `/compact`）的用户对“当前/最大限制不得而知”后悔。
  2. 有硬编码路径重现（**#51429**）——它莫名创建了 `/Users/wangtao` 的目录。这在中文社区引起声量（并笑称 “wangtao 是谁？”），可见用户对代码内是否有本地路径嵌入非常敏感，这也是质量观感的底线。
- **长上下文期间**：结束了一次长对话后，`write/exec` 工具的参数全部被丢弃（#53408），意味着跨长会话的 bug 危害甚大，会直接证明任务不可信；复现也较难。
- **对错误路径的 follow-up**可以确认：“MemorySearch 超时被伪装成 Provider offline”（#112196）这一现象挫伤 debug 成本，使用者期望“等选项/过去 15s 过时的死马当活马”。其他**“窗口网络连接丢失”因为参数过大**（#53540）也加重反新用户焦虑。
- 相反对功能量的补正面可以在 #45758（YAML 配置支持）的讨论中看到，用户希望有 DevOps/config 社区更习惯的 Go 泛化式样例；并另外只有少数人提 Config-multiple Teams bot 的复杂性。

---

## 8. 待处理积压

**⚠️ 根据更新活跃与卡点判断，以下是最值得维护者考虑翻牌的优先级：**

| 编号 | 内容 | 为什么需要处理 |
|---|---|---|
| **#38327**  | “Cannot convert undefined or null to object” 卡了 5 个月，总用户看到与 vertex/gemini preview | 长期无 fix PR，影响偏广 |
| **#62505** | Coding Agent 永远不完成（regression） | P1，领域级刷信誉的削足需被恢复 |
| **#91009**  | Codex hooks 的 CPU 屋锁死 | 同时带 `platinum` 与 20 高热度，有关于 RPC 完全阻塞 |
| **#70903** | 过期的 Provider Cooldown 导致充值后仍无法用（早期 P0） | 对真实使用可恶意（不能呼叫），却仍然 `no-repro`，令社区有一点疲惫 |
| **#67777**  | 子代理完成消息可能在 queue 内被强杀丢失 | 是“消息丢失”的用户痛点根源之一，仍无 fix PR |

**PR 积压重点：**
- `#124303`（context-window provenance，标记 ready）——请快速审查，它是若干 memory/context 轮换的重沓基础。
- `#123535`（web‑ui 快速 session‑catalog 自动刷新风暴）——具备铂 level，已经 ready，但被可能的 domain 标签影响。
- `#125474`（openclaw automations 开着缺失 `--port` flag）属于影响范围偏小的易修合并。

---

*报告完。总体信号：PR 给出了稳定的安全与 UI 小步提交，但当前版本还没发版，大修被 P1 + no‑fix‑PR 的队伍压在队列里，建议团队对久置的 P1 回归拨款与审阅节奏做重心调整。*

---

## 横向生态对比

# 个人AI助手开源生态横向对比分析报告

**报告日期**: 2026-08-18  
**数据窗口**: 2026-08-17 ~ 2026-08-18  
**覆盖项目**: 12个主流开源AI智能体/助手框架


## 1. 生态全景

当前个人AI助手/自主智能体开源生态正处于**高速演进期**：衍生于OpenClaw的项目家族（Zeroclaw、NanoClaw、PicoClaw等）构成了最大集群，同时在核心功能基础上向**多通道接入**（Telegram、Discord、QQ、Slack、微信）、**多模型路由**（支持OpenAI、Anthropic、DeepSeek、Gemini）、**可移植性**（Agent打包、独立工作目录）三个维度扩散。值得注意的是一批项目在**商用变现路径**上率先迈步——CoPaw发布DataPaw原生应用、NanoBot开始商业化讨论、LobsterAI布局桌面端体验。然而这种快速迭代也付出一定代价——安全问题（凭据泄露、附件越界、权限绕过）与稳定性问题（消息丢失、认证失败、挂起、崩溃循环）在多个项目中同时涌现，说明行业正处于“功能→稳定”的转换关口。整体来看，高活跃度与高散度并存，技术路线分化明显，但共识方向正在形成：**Agent稳定性和多模型/多通道的灵活接入**。

## 2. 各项目活跃度对比

| 项目 | Issues (更新总数/新开) | PR (更新总数/合并) | Release | 健康度 | 亮点标签 | 主要风险 |
|---|---|---|---|---|---|---|
| OpenClaw | 500 (483新增/17关闭) | 500 (121合并/379待) | 无 (50天未发版) | ⭐⭐ | Web UI、渠道安全修复、代码模式调试 | 审阅吞吐严重滞后 (关闭率3.4%)、大量`maintainer look`、P1+无fix PR积压、50天未发版 |
| NanoBot | 3 | 15 (5合并/10待) | 无 | ⭐⭐⭐⭐ | Telegram轮询修复、TS终端UI、跨平台进程ID、原生TS CLI | `complete_goal`死循环40天未修 -> 社区失望 |
| Zeroclaw | 50 (乌表示) | 50 (16合并/34待) | 无 (中心0.8.4→0.9) | ⭐⭐⭐⭐ | **安全加固集中落地**（Gemini key、WhatsApp approval、附件附件阅读）；SOP工作区修复 | 关键RFC（#9487/#9488）待评审、Telegram长轮询PR #9311 3周未合、Agent导出PR待author回复 |
| PicoClaw | 3 (2新增/1关闭) | 100 (3合并/1待) | 无 | ⭐⭐⭐⭐⭐ | **工具调用静默循环修复闭环**、Slack FileSize修复、微信多实例 | #3339 Antigravity 429认证问题 |
| NanoClaw | 4 (3新增/1关闭) | 100 (25合并/17待) | 无 | ⭐⭐⭐⭐ | 渠道层Hook重构系列（#3295-3306）、运行时Driver重构推进 | codex类型错误（过期代码8月）、任务日志吞没回归（#3301） |
| IronClaw | 10 (仅更新高) | 16 (高合并) | ✅ **1.30-rc1** (8/17发布) | ⭐⭐⭐⭐ | 持久化写入压力砍50%（Epic 7591）、libs SQL饥饿修复 | libSQL二级连接饥饿（已在PR#7717）、BeforeModel checkpoint不安全（#7707）、1.3.0迁移文档缺失 |
| LobsterAI | 7 (6新/1活跃) | 21 (18合并/3待) | 无 | ⭐⭐⭐ | 恢复合入大量4月积压PR（#1636-1669）、敏感信息脱敏、DSH引擎接入 | 4-5个核心Bug积压（groupPolicy被覆写、非SSE MCP不可用、Ollama本地模型不可用） |
| Moltis | 3 | 9 (数据缺失) | 无 | ⭐⭐⭐⭐ | 心跳更新逻辑修复、MiniMax Code Agent接入、WebUI RPC超时可选配置 | Podman无法工作（2个月未修复），80%合并为dep bot自动升级 |
| CoPaw | 14 (8活跃/6关闭) | 35 (22合并/13待) | 无 | ⭐⭐⭐⭐ | 微5修复（token-usage计算、/compact刷新）、插件Pawatalyst | #7011会话隔离缺陷（6评论）、#7082 Pydantic动态类错误 |
| EasyClaw | N/A | N/A | ✅ **v1.8.105** | ⭐⭐⭐ | V1.8.100引入外联设备绑定BD新工作流、设备助手能力改善 | 新发布版本可能会帧阻塞问题出现、macOS未公证安装异常 |
| TinyClaw | — | — | — | 无 | — | — |

*（注：NanoBot Issue数据为3，PR 4，因报告原有方式合并计算整理）*

亦可按「活跃度价值」看：
- **第一梯队（高贡献+高新鲜度）**：OpenClaw、Zeroclaw、NanoClaw、IronClaw
- **第二梯队（中度活跃，随机新增）**：PicoClaw、LobsterAI、CoPaw
- **第三梯队（低频或pulse低）**：Moltis、EasyClaw、NanoBot、TinyClaw、ZeptoClaw

## 3. OpenClaw 在生态中的定位

**生态地位**：作为主导者，OpenClaw 是整个 `claw` 序列的“根基”，其Issue/PR规模远超其他项目，为社区的绝对核心。

- **相比同类**：
  - 核心差异在于**规模与覆盖面**：拥有最广泛的插件生态、提供最多前沿的官方 Pull 通道（WebUI、Discord、Matrix、Codex、Telegram、CLI、macOS）和 WebUI 调试工具；其贡献者也活跃于其他项目且时常将大补丁反馈到子项目中（例如一个 Restore 功能可能被多个衍生仓库采用）。
- **威胁面**：
  - 当前审查吞吐量不足（379条PR排队），与活跃参会者的其他项目推进形成对比。由于 50 天没有任何稳定正式发布，这一状态正在持续放大用户预期。
  - 相比之下：IronClaw 在 24 小时内发布了 `v1.30-rc1`，EasyClaw 也保持快速发版（v1.5→1.6→1.8.100），OpenClaw 已经是生态中**发布最慢的主导者**，后端需要跟上。
  - 开放性收益点：对于用 P1/无修复 PR 积压已久的 `#38327`、`#62505`（回归类）等，正是除OpenClaw其他分叉可以优化聚焦的点。

**技术路线：** 生态内最全面的多通道/多 Provider 支持，集成最丰富工具链，思想方向接近 OpenClaw 系列（如演进上车 runtime driver 抽象）。相比 Neroclaw 的单一构造，OpenClaw 更像是“主仓”，但重量更大。

## 4. 共同关注的技术方向（各项目出现的并发诉求）

| 技术/议题关键词 | 涉及项目 | 具体诉求 | 代表性 Issue |
|---|---|---|---|
| **稳定性优先** | OpenClaw、Zerodata、NanoClaw、Moltis、CoPaw | 崩溃循环、子进程fork泄漏、CPU 耗尽、消息丢失 | OpenClaw #62505/#67777；NanoClaw #3301；PicoClaw#3311（已关闭）；Moltis/#1095 |
| **凭证与安全硬化** | OpenClaw、Zeroclaw、LobsterAI | API key 地址泄漏、认证凭据暴露在错误栈、附件越权 | OpenClaw #124714、#124969；Zeroclaw #9382、#9394；NanoClaw #3299 |
| **长思考/长上下文适配** | OpenClaw、PicoClaw（IRClong） | legacy 模型理解方式单一（30s timeout），deepseek-R1/r1长思考触发误报 | OpenClaw #68596；PicoClaw #3287（IRC拆分重组） |
| **跨端/跨模型统一体验** | Zerodldson、LobsterAI、CoPaw、Moltis、IronClaw | Provider-模型多路由、按渠道独立模型、OIDC可插拔认证、量化 | CoPaw #7085；Moltis 外部代理选择；Zeroclaw 感知上下文窗口RFC |
| **本地团队协作支持** | X-project（外联）、NanoClaw | 多个Agent同窗口会话、任务路由可观测 | CoPaw；NanoClaw 任务错误路由 #3311 |
| **便携性与可移植性** | Zerodull、IronClaw | Agent 导出/导入包、Bundle/总包克隆 | Zeroclaw #9986；IronClaw #7591/持久化 |

## 5. 差异化定位分析

| 特性维度 | OpenClaw | Zeroclaw | NanoClaw | IronClaw | PicoClaw | Moltis | CoPaw | NanoBot | EasyClaw |
|---|---|---|---|---|---|---|---|---|---|
| **定位** | 通用Agent框架全栈 | 安全加固优先（安全架构） | Channel 优先（重构） | 开发环境集成/本地运行 | 轻量Agent、凸出稳定 | 流式前端代理为主 | 跨平台集成代理平台（C2） | 本地dApps Agent | 商务SaaS（达人外联） |
| **核心特色** | 插件生态+全套工具集成 | P1级安全加固（key、审批、附件） | 高模块化/渠道Hook架构 | 专注性能与可靠性/1.3稳重 | 稳定性修复数据专注 | 外部/异构Agent附加支持，Watchdog优化 | 多Agent协作+上下文Track，PowerContent | TS天然终端+Telegram修复 | 达人/BD设备绑定工作流 |
| **目标用户** | 社区/宽松 | 团队安全优先 | 云原生运维 | AI工程团队 | 部署简单优先 | 开发者生态 | 团队工作流 | 个人工程师 | 需求端B端 |
| **技术路线** | 全量&编译器大模型 | → Rust重写 | 协议重构，Channel事件 | Rust-rewrite/原生企业级 | 轻量编译产物 | Rust轻量 | Rust + 模块 | TypeScript | Node/Sizer |

关键结论：
- `claw` 是一个“多打一”的战略空间，其余项目本质上是 **OpenClaw 核心技术的同义或侧切** ；
- 差异化决定在 **安全**：ZeroClaw在安全界位置显著；PicoClaw在轻量小舵位优势；IronClaw明确向企业端进军。
- **横向合并的暗流**：NanoClaw与NanoBot同为HKUDS系，代码在驱动抽象方向发展；CoPaw和Moltis在设计上接近，都有明确的“代理（Agent）前台”概念。

## 6. 社区热度与成熟度

**维度划分（基于Issue/PR值与代码沉淀）：**
- **社区成熟、高响应**：OpenClaw（体量大，但要关注响应滞后）、NanoClaw（响应快，核心修复闭环）  
  1. OpenClaw：仓库大型，但审查瓶颈明显
  2. NanoClaw：整体PR大量合并（如hello 16 vs 10 x），团队响应迅速
- **建设性维护**：Zeroclaw（安全频修复、RFC多）、IronClaw（工程/测试权重）
- **轻活跃**：
  - Moltis：12 issues/PR窗户，需要发挥外部中介参与
  - CoPaw：周四零散一致
  - LobsterAI：没有高频 PR，但社区期偏低
  - EasyClaw：完全发版驱动，零社区反馈
- **维护后期**：NanoBot、TinyClaw、ZeptoClaw（无活动页面）

**成熟度分层速览**：
- **外部团队验证**：OpenClaw、IronClaw已经是自确定工程化的提交（1.3.0-rc1、10万类标题）
- **半成熟**：Moltis、LoBster、CoP组都处于“基础可用能但大 Bug 不多”状态
- **早期验证**：Zerodown（0.8.4 安全治理持续）、EasyClaw（新白做 B 域）

## 7. 值得关注的趋势信号与参考建议

1. **性能主线：动态状态管理已超过功能的临界点**  
   `libsql`、持久写入等话题接受度极高，说明倍数数据流下，长链生产稳定性已压实后编队军事方向。对开发者：**进入成功率 <=50% 不落库**才可用于自动化任务。

2. **Chat↔Task 统一模式新场景**  
   NanoClaw的“极简风”、CoPaw Agent 协作，都在推“统一接口”；一次性 API 将“同步&异步”边界模糊化。未来很快会终结同步/异步任务割裂时代。

3. **长上下文与管理标准化成为AI Agent通用适配需求**  
   Watchdog定时器不可配置（OpenClaw + PicoClaw）、上下文动态注入（token节约）等现有痛点，将会直接影响模型策略上“ODE 场景”，成为“RAG后维”的新热点。

4. **密探安全是生死线**  
   CoPaw、Zer一拉线的“key放URL、空group全开、附件越权读取”如果是在用户市场的第一版就有，会导致不可挽回的信任崩塌。安全回归必须进入CI（Zeroclaw行为可参照）。

5. **两个可重塑性设计signal**
   - ZeroGlaw 的 “Agent .bundle导出”、Nano Iron 配持久记忆跨话：**智能体可挂载能力** 会成为新常态  
   - OpenClaw 的 `<tool>` 意外泄漏、Discord 文本层透出：这是“跨层模型嵌套”刚落地的教训，以后所有事件穿透都需要严格 sanitize。

**给AI智能体开发者建议**：关注 OpenClaw 的核心修复（#68596、#124303、#91009），若项目成员有暇，推荐优先补 `#62505` 回归；将该库其余项目可构建的一条主线收益——在快迭代时确保核心或范式（runtime driver、message sanitize、持久写入）先预埋，再扩展模块。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-08-18

## 1. 今日速览

今日 NanoBot 项目保持**高度活跃**状态，24小时内产生 3 条 Issue 更新与 15 条 PR 动态，其中 5 个 PR 已合并/关闭、10 个待合并。核心方向集中于稳定性修复（Telegram 轮询停滞、进程身份管理）与 WebUI 功能增强（会话提及、侧边对话、跟进建议）。值得关注的是 `#4864` 在 `complete_goal` 工具上暴露的 JSON 序列化回归问题，已持续活跃 40 天且未落地修补方案，预计为当前项目面临的最显著稳定性隐患。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展（已合并/关闭 PR）

| PR | 要点 | 状态 |
|----|------|------|
| [#5156 fix(telegram): recover from silently stalled polling](https://github.com/HKUDS/nanobot/pull/5156) | 修复 #5171 —— 瞬态网络故障后 Telegram 轮询永久性沉默问题。通过检测数据链路停滞状态并自动重建轮询连接池，确保生产环境中的消息持续可用 | 已合并 |
| [#5301 fix(telegram): bridge stdlib logging and detect stalled polling](https://github.com/HKUDS/nanobot/pull/5301) | 从 #5156 中拆出的低风险观测层：构建标准库日志接入 loguru 的桥接，并新增仅记录日志的存活探针（不含重新构建逻辑） | 已合并 |
| [#5416 fix(gateway): stable process identity on macOS](https://github.com/HKUDS/nanobot/pull/5416) | 替换了与本地化环境相关的 macOS `ps lstart` 进程识别方式，改为基于 `proc_pidinfo` 的出生时间戳，统一了跨平台过程身份契约 | 已关闭 |
| [#5406 feat(cli): add native TypeScript terminal UI](https://github.com/HKUDS/nanobot/pull/5406) | 为 CLI 增加原生 TypeScript 终端界面。该 PR 重新提交了此前被误标为“已合并”的 #4329 的全部提交内容，并补充跨终端修复 | 已合并 |
| [#5410 fix(goal): stop repeating clarification replies](https://github.com/HKUDS/nanobot/pull/5410) | 修正常态目标激活时，模型每次普通文本输出都会触发倾向注入的循环问题；仅在接近工具调用预算边界时才继续注入 | 已合并 |

**项目整体节奏**：Telegram 连接稳定性是近期最大的补齐点，已闭环落地；CLI/终端与上下文机制有实质增强。

## 4. 社区热点

- **[#4864 [BUG] complete_goal 死循环（7 评论，1 👍）](https://github.com/HKUDS/nanobot/issues/4864)** — 用户 @Asem-D 的核心诉求：本次枚举中发现提供的 tool 参数中 `recap` 以裸字符串形式解析，与上游预期的 JSON 格式不符，导致 `complete_goal` 持续报错、Agent进入无限循环。该 Issue 自 7/9 创建以来已持续 40 天，评论区讨论了序列化与反序列化的兼容性，社区明显沮丧于修复周期的长度。
- **[#5409 混合消费防火墙（新开，0 评论）](https://github.com/HKUDS/nanobot/issues/5409)** — 用户 @sophieamoure2026-ui 建议在转商业化阶段引入“预算防火墙”，防止无限循环导致云成本失控。评论为 0，但点赞数未明显显示，属于典型的产品方向建议。

## 5. Bug 与稳定性

按严重程度排列：

| 严重性 | 问题 | 概况 | 修复 PR |
|--------|------|------|---------|
| **P1-紧急** | [#4864 complete_goal 内无限循环](https://github.com/HKUDS/nanobot/issues/4864) | `recap` 被按裸字符串解析，非 JSON 对象，工具受挫进入死循环 | **无** |
| **P1-紧急** | [#5171 Telegram 轮询永久沉默](https://github.com/HKUDS/nanobot/issues/5171) | 网络瞬态故障后，进程继续运行但消息停止接收，直至手动 `getUpdates` 才恢复 | ✅ 已合并 [#5156](https://github.com/HKUDS/nanobot/pull/5156) |
| **P2** | [#5341 Windows 天气 skill 兼容](https://github.com/HKUDS/nanobot/pull/5341) | Windows PowerShell 下 `curl` 被解析为 `Invoke-WebRequest`，导致天气命令首次运行失败 | PR 待合并 |
| **P2** | [#5407 cron heartbeat 禁用不生效](https://github.com/HKUDS/nanobot/pull/5407) | 将 `gateway.heartbeat.enabled=false` 仅打印 `✗ disabled`，但持久化任务仍按原计划触发 | PR 待合并 |
| **P2** | [#5415 Windows venv 子进程收养](https://github.com/HKUDS/nanobot/pull/5415) | Windows 下 gateway 无法正确关联 venv 启动的子进程 PID，影响日志与监控 | PR 待合并 |

其他在途修复：`#5414`（Slack 文件下载跨重定向校验）与 `#5413`（LLM 异常未走 fallback）均暂无 fix PR 或待合并。

## 5. 功能请求与路线图信号

- **混合成本防火墙（#5409）**：连续商务化背景下的诉求，用户提出 `预防无限循环 + 实时预算计费 + 限流` 的混合防火墙方案。可参考现有 `cron` 调度器的 `jobs.json` 治理，将成本限制纳入 `PersistStateManager` 思路。若需求确认，可能会进入下一版本的核心规划（用户提到商业化早期阶段注意预算防护）。
- **WebUI 三连增强**（均已开 PR，pending）：
  - [#5408 跟进建议自动生成](https://github.com/HKUDS/nanobot/pull/5408)
  - [#5364 临时侧边对话](https://github.com/HKUDS/nanobot/pull/5364)
  - [#5358 会话 @Mention 消息](https://github.com/HKUDS/nanobot/pull/5358)
- **Windows 平台适配**：`#5341`（weather curl 兼容）与 `#5415`（venv 进程 Python）表明社区仍在持续补齐跨平台支持，是 IT 团队在 `interop/Win` 优先级的 Promise。

## 7. 用户反馈摘要

- **@Asem-D（#4864）**：「**过一次更新以来， `complete_goal` 中 recap 一直被 draft 解析**」——建议回退参数序列化逻辑，明确指出是 gateway 近期变更引入的回归错误。
- **@QQQ300kuai（#5301）**：「临时网络波动后日志完全静默，**最怕排除问题查不到日志**」→ 目前合并该 PR 后，v1 部分可观测（仅 log），连接池重建整体逻辑属门控式，可等待用户在真实环境验证性能是否彻底恢复。
- **维护关系**：PR #5406 表明官方注重协作透明性（错误合并后有恢复说明 gohan）。

## 8. 待处理积压

- **Issue #4864（complete_goal 死循环，未关闭，无修复方案）**：这是最优先优先级的问题，持续 40 天。建议维护者在下一步优先分配时间复核 tool 参数的序列化逻辑，并补充 `gateway` 中 `complete_goal` 的回归测试。
- **PR #5341（Windows 兼容修正，待合并 push）**：已从 8/11 开始pending，他正是解决 Windows 用户阻塞痛点，建议尽快走完 CI。当前存在 `conflict` 标记，容易被遗漏。

---
**整体健康度评价（主观）**：项目整体的 5 PR 合并/关闭速率体现了显著修整能力；Telegram 故障既有 root cause 闭环（说明对稳定性重视）。但 `complete_goal` 循环根因在评未见归属人担忧，长期沉默不可接受。总体处于 8/10 高分水平，主要风险在 Infinity loop 专项。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-08-18

> 数据来源：github.com/zeroclaw-labs/zeroclaw | 统计周期：2026-08-17 ~ 2026-08-18


## 1. 今日速览

项目处于高活跃迭代期，`0.9.0` 安全与架构 RFC 集群进入集中评审/落地阶段。过去 24 小时 Issue 与 PR 流量均达到 50 条上限，但合并/关闭节奏略滞后于新增（PR 待合并 34 : 合并 16），队列消化压力较大。安全修复是今日主流，**Gemini key 泄露、WhatsApp 审批令牌孤儿、渠道附件下载越界**等 P1 级隐患均合入修复补丁。RFC 层面，`#9487`（运行时会话）与 `#9488`（附件架构）双双进入待评审队列，核心基础设施重构趋近答辩节点。另外，本周最受关注的新特性——**导出/导入 Agent 可移植打包（# 9986）**仍待作者回应，现已标注 `needs-author-action`。


## 2. 版本发布

**无新版本发布**（当前线索仍为 v0.8.4，目标 v0.9.0 安全架构）。


## 3. 项目进展 — 关键合并/关闭 PR

**核心安全与正确性修复（集中合入）**

- **[PR #9736] fix(providers)： 将 Gemini API key 移出 URL** — 密钥始终经 `x-goog-api-key` 头发送，消除 URL 诊断泄露风险。合入后由 `#547` 官方认证协议。  *(p1/高)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9736

- **[PR #9990] fix (security) — 操作预算原子化**: 修复 `RateのLimit`（并行调度下 “先检查、后记录” 导致的超发）与编码，双击扣除。预留与提交合并为原子操作，防止并发超限。对应 #9849/#9594 双 Bug 修复。  *(p2/高)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9990

- **[PR #9338] fix — 收紧 WhatsApp 云审批守卫**：将临时审批 token 绑定至析构守卫，杜绝 `request` 清理流程在两个错误出口处遗落凭证。同时补上认证缺失回归。  *(p1/高)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9338

- **[PR #9693] fix (channel) — 为 QQ 与 Mattermost 增加附件下载边界**：替换为共用限额读取器，约束隐式本地文件读取，未超此前配置（QQ 10MiB / MM 25MiB）。同时呼应邮件附件隐式读取路径 #9961 一并修复。  *(p1/高)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9693

- **[PR #9692] fix (email)： 禁用隐式** attachment** 文件读取：空邮件 content 不再被当作隐式本地文件路径解析。  *(p2/高)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9692

**SOP 与运行时修复**

- **[PR #9733] fix (SOP)： 从共享 workspace 加载 SOP 定义** — 修复定义从 `data_dir/sop/run.db` 读取而非 workspace 根目录的问题，消除多实例数据错位风险。  *(p1)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9733

**CI / 工程化**

- **[PR #9996] ci (clippy)： 共享 Clippy 命令执行器** — 去除跨工作流已重复多年的诊断逻辑（合入 #93977）。  *(p2)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9996

- **[PR #9494] ci — 增加 macOS / Windows 计划巡检** — 不再随每次拉取请求全量跑，改为凌晨 3:17 UTC 调度。  *(p2)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9494

- **[PR #9417] ci — 移除重复的架构测试守卫** ——把 config-write isolation 与 Fluent coverage 从 Lint 剥离，由全局 Test job 统一负责。  *(p1)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9417

- **[PR #10009] test (cron)： 以符号链接杀手 ETXTBSY 竞态** — 在 `custom shell` 回归中改用 symlink 调用 `sh`。  *(p3)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/10009

**依赖升级**

- **[PR #9397] chore： CPAL 0.15 → 0.18**（`channels`）——Voice Wake 迁移到统一设备选率逻辑（48k/44.1k 降级路径）。  *(p2/高)*
  https://github.com/zeroclaw-labs/zeroclaw/pull/9397

> **整体进度判断**： 安全加固与 bug 修复类 PR 已形成稳定流（近 24h 关闭 20%，流入 34% 含 8 个安全标签），表明维护者仍保持高频合入节奏。下一步判断核心等待 `needs-maintainer-review` 的 12 个 PR 清空。

今日无 **“主控设备收到双份误工”** 等核心架构类重构合入，整体为修稳与依赖泥沼。


## 4. 社区热点

**`#6808` — RFC： 实践泳道、看板自动化与标签清理**（23 评论）
- 从 0.8.0-beta 到 0.8.4 持续演进，修订已达 26 次。核心是**以非人工维护的方式**重塑路由：能否用标签驱动工作行程–泳道匹配，以减少手写。
- 这条 Issue 与 `#9489`（RFC 流程简化）形成一个分支： 贡献者质疑 RFC 决策效率，要求减少宗教投票。
https://github.com/zeroclaw-labs/zeroclaw/issues/6808

**`#8603` RFC：零 `Chat Completions` 合规面**（23 评论）
- 面向纯 WebSocket / ACP 而缺失 OpenAI REST 兼容层，导致 Open WebUI / LobeChat 等工具无法接入。评论区主流认为这是**进入生态的必答题**。
- 关联实现 PR #8694（在早期飞行阶段开启）。
https://github.com/zeroclaw-labs/zeroclaw/issues/8603

**`#8383` RFC：目标模式 1.0**（22 评论）
- 目标模式成为跨轮次跑对象的基石，但当前提案大幅瘦身，聚焦 **“有界前台任务”**，剥离了异步子任务与 Web 混合计划，落地范围更可控。
https://github.com/zeroclaw-labs/zeroclaw/issues/8303

**`#7155` RFC：高危 Shell 命令三层确认**（20 评论）
- 当前一轮更新把动作收敛为“拒绝/确认/放行”三种执行前状态，同时对齐 Claude Code 的 command 模式策略（allow / ask / deny）。
https://github.com/zeroclaw-labs/zeroclaw/issues/7155

**`#9487` 与 `#9488` — 运行时会话 + 统一附件链路（合计 37 评论）**
- 两个关联 RFC 将重构运输层：入口点提交 `InboundAction`，让 runtime 拥有会话；附件成为一等公民，消除 channel 间行为异。
https://github.com/zeroclaw-labs/zeroclaw/issues/9487 | #9488

**`#8692` — 维护者决策队列（13 条）** — 从外部看，它是多数 RFC 的进度表，属于多线程的枢纽点。

> **社区诉求提炼**：讨论已经显现出**代际分化**——一批是希望去除手动流程、把决定权交回工具链；另一批则要求在 AI 驱动的官方行为前设置边界（安全）。


## 5. Bug 与稳定性

### 今日重点 (P0/P1)

| 严重程度 | 现象 | Issue | 对应 Fix PR | 状态 |
|---|---|---|---|---|
| P1 | **Gemini API key 出现在 URL 监控 / 日志** | [#9382](https://github.com/zeroclaw-labs/zeroclaw/issues/9361) | [#9973](https://github.com/zeroclaw-labs/zeroclaw/pull/9973) | ✅ 已合并 |
| P1 | 空 `allowed_groups` 导致 **WhatsApp 全部群组可见**（应做 deny-none） | [#9394](https://github.com/zeroclaw-labs/zeroclaw/issues/9394) | [#9697](https://github.com/zeroclaw-labs/zeroclaw/pull/9697) | ✅ 已合并 |
| P1 | QQ/MM 附件下载文件过大小不被拦截（`Content-Length` 伪造路径） | [#9604](https://github.com/zeroclaw-labs/zeroclaw/issues/9604) | [#9693](https://github.com/zeroclaw-labs/zeroclaw/pull/9693) | ✅ 已合并 |
| P2 | action 预算并行下重叠记账（超标） | [#9849](https://github.com/zeroclaw-labs/zeroclaw/issues/9849) | [#9990](https://github.com/zeroclaw-labs/zeroclaw/pull/9990) | ✅ 合并 |
| P1 | Mattermost 隐式附件文件读取（反社会文件的辅路径） | [#9964](https://github.com/zeroclaw-labs/zeroclaw/issues/9964) | [#9692](https://github.com/zeroclaw-labs/zeroclaw/pull/9692) | ⚠️ PR 待合 |
| P1 | 邮件附件换算成本地文件读取（即使 content 为空） | — | [#9653](https://github.com/zeroclaw-labs/zeroclaw/pull/9653) | ✅ 合并 |

**其他确认修复（今日关闭）**：
- [#9934] `heartbeat_worker_reconnects_after_stdio`（守护进程心跳程序崩溃 app 问题）— 消除运行期写可执行文件
  https://github.com/zeroclaw-labs/zeroclaw/issues/9934
- [#9376] 待定治理协议： Teleport 切换批处理。
  https://github.com/zeroclaw-labs/zeroclaw/issues/9376

**稳定性未决风险**：

- Telegram 长轮询掉线（`offset` 前移，但候选 `deliver` 失败）——当前 PR #9311 已长期未合（近 3 周），源自 `p1` 级，但被卡在 review 环节。
  https://github.com/zeroclaw-labs/zeroclaw/pull/9311


## 6. 功能请求与路线图信号

**最具落地潜力——本周新增/更新**

| 功能 | 类型 | 状态 | 机会分析 |
|---|---|---|---|
| **Agent 导出便携包（`agents export`）** | Feature PR | 合入待评审 / 要求作者回应 (Open) | 打包 config+workspace 成 `.bundle`，跨端迁移目前的手工拷贝痛点长期存在，需求量大。 |
| **可插拔认证通道（OIDC等）** | RFC | 第 8 版 / 已接受 | 与内建 principal 结合，准备进 0.9.0 breaking-change 队列。 |
| **感知上下文窗口（`per-model vision/context_window`）** | RFC | Rev 13，尚在评审 | 服务端若正确暴露，则 各 UI 即可终止 32k 默认假设，显著改善长文档助手。 |
| **运行时安全决策管线** | RFC | 评审中 / P2 | 完全重构 / 管理员安全配置模型（与 `config/reload` 热进行同行）。 |
| **“已衡量范围” 产品遥测** | RFC | 接受，未动工 | 团队希望按用户真实使用数据去边框化 feature 保留决定，需要从核心审计。 |
| **产品目录统一规范** | RFC 追踪器 | 中优先级 | 聚合插件包与 registry 元数据为一个 `catalog` 契约，为 0.9 中枢。 |

**新增功能基建（应用前哨）**

- `#10059`（Open）支援 Option-Backspace 词删除（ZeroCode 编辑器）——`Good First Issue` 级。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10059


## 7. 用户反馈摘要

1. **复杂度与安全边界**：
   - （`#7155` 20 评论）高权限 shell 操作现在只有单级允许/拒绝，无法针对不同产出 :RUNNER 表达更细致的权衡策略。用户方其实需要“允许特定 pattern 的 ssh”的中间态。
   - （`#9394`）WhatsApp "空=全允许" 给值班运维带来归属到群聊恐慌；“doc 里没写 access_group 默认是全放行”。

2. **已安装边界的痛点**：
   - `zeroctl` 升级后，原来软链 symlink 的 MCP 子进程缓存被 `data 目录`错位，导致工具找回失败（已在 #9722 + #9765 fix 中）。

3. **部署体验分离**：
   - 多用户器中，SOP 引擎读取 `data_dir` 与 `workspace` 混用尝试会让多人同时跑 SOP 时锁定冲突（#9746 已修复，但确认需要再一轮测试覆盖）。

4. **积极反馈**：关于 #9694（同步企微 20 MB 补链）的评论：“终于不吃 10 MB 默认文件小屉了”（同日补链）。


## 8. 待处理积压 — 高优先级失效

**PR 超过 2 周未合并，且有明确用户价值**：

| PR | 内容 | 等待时间 | 当前状态 | 建议 |
|---|---|---|---|---|
| [#9311](https://github.com/zeroclaw-labs/zeroclaw/pull/9311) | **Telegram 长轮询 offset

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-08-18


## 1. 今日速览

过去24小时项目保持稳定活跃：3条Issue更新（2条开放、1条关闭），4条PR更新（1条待合并、3条已完成），另有1条新Bug报告（#3339）提交。值得关注的是两个长期滞后的关键项终于有了推进：Issue #3311（工具失败静默循环）及其对应修复PR #3312在同日关闭，Agent稳定性短板得到补齐。无新版本发布，但多域功能（Slack、Weixin、配置加载）持续合并，整体项目健康度良好，维护响应速度维持在常规水平。


## 2. 版本发布

过去24小时内无新版本发布。


## 3. 项目进展

今日合并/关闭的3条PR从三个维度推进了项目，重点集中在**Agent稳定性修复**和**多通道增强**：

| PR | 类型 | 核心内容 | 影响 |
|---|---|---|---|
| [#3312](https://github.com/sipeed/picoclaw/pull/3312) | 稳定性修复 | 工具调用连续相同错误时提前终止回合，避免循环至 `max_tool_iterations` 而永不回复用户 | 直接解决Agent"静默卡死"问题，属于核心使用体验级改进 |
| [#271](https://github.com/sipeed/picoclaw/pull/271) | Bug修复 | 修复 `config.json` 缺失（如Fly部署）时环境变量覆盖不生效的问题（PR历时6个月关闭） | 提升云端部署场景的配置正确性，减少"默认模型无凭据"类启动失败 |
| [#2606](https://github.com/sipeed/picoclaw/pull/2606) | 功能增强 | 微信（Weixin）渠道增加多实例支持，含目录与动态实例管理 | 为多账号/多企业微信接入运维提供了基础，属于渠道打通类功能补全 |

此外，[#3340 (fix(slack): set FileSize on media upload params)](https://github.com/sipeed/picoclaw/pull/3340) 今日提交，修复 `slack-go v0.23.1` 上传媒体时因 `FileSize` 为零值被拒绝的问题，待合并。


## 4. 社区热点

今日最受关注的话题集中在两个方向：**长消息体验** 和 **工具调用可靠性**。

- **[#3287: Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)** — 6条评论，作者及IRC重度用户反馈希望IRCv3超长消息（>512字节被自动分割后）能够合并识别为同一条完整消息。这不是新开Issue（7/22创建），但8/17仍有活跃讨论，说明用户对多行/长输出场景有持续痛点，讨论热度最高。

- **[#3311: Repeated identical tool failure loops silently](https://github.com/sipeed/picoclaw/issues/3311)** — 生产环境真实事故：Telegram 中 `git 命令`一条指令发出后无任何人响应，Agent 内部重复调用同一失败工具直到 `max_tool_iterations` 耗尽。该Issue今日关联PR #3312 已关闭，是社区反馈推动修复的正面案例。


## 5. Bug 与稳定性

按严重程度排列：

| 严重级 | Issue | 状态 | 描述 | Fix PR |
|---|---|---|---|---|
| **高** | [#3311](https://github.com/sipeed/picoclaw/issues/3311) | 已关闭 | 工具连续相同错误导致Agent静默循环，用户长时间得不到回复（生产环境验证） | ✅ [#3312](https://github.com/sipeed/picoclaw/pull/3312) 已合并 |
| **中** | [#3339](https://github.com/sipeed/picoclaw/issues/3339) | 新提交 8/17 | Antigravity（Google）模型发现成功但所有生成请求返回429 "资源已耗尽"，用户推测是OAuth凭据未被正确传递至生成接口 | ⚠️ 无Fix PR，待确认是否为客户端还是服务端问题 |
| **中** | PR [#3340](https://github.com/sipeed/picoclaw/pull/3340) | 待合并 | Slack媒体上传因 `FileSize` 为零值被SDK拒绝（`slack-go v0.23.1` 要求上传前明确文件长度） | 🔧 该PR即为修复，仅待合并 |

**结论：** 高发问题已于同日闭环，项目恢复性修复机制成熟。`#3339` 是新的待跟踪项，协议层问题（429）可能需判断服务端限流策略。


## 6. 功能请求与路线图信号

| 功能需求 | 来源 | 参考信号 | 可能归属版本 |
|---|---|---|---|
| IRC长消息合并识别 (IRCv3 多分片重组) | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 6条评论持续深化；有实际IRC使用场景，尚无关联PR | 需评估协议改动量，暂不确定 |
| Slack 媒体上传支持 | [#3340](https://github.com/sipeed/picoclaw/pull/3340) | 已提交修复PR | 大概率随近期patch合入 |
| 微信多实例动态管理 | [#2606](https://github.com/sipeed/picoclaw/pull/2606) |（PR今日已关闭，明细见上文）；此为渠道部类说明 | 已合入主线，中期收益可见 |

`#3287` 属于"让LLM能理解IRC协议层的自动拆分"，触及信息在多邻接消息间的语义恢复能力，若与`agent memory`结合可能成为RAG之外的一种上下文能力建�掌握力。若核心团队认可，排在下一中专版本中较为合理。


## 7. 用户反馈摘要

- **[按 #3287 的IRC用户]** 反馈了核心痛点："IRC 512字节限制下，长代码块或日志经常被客户端切割，Affective甚至无法下载。" 社区建议先趟实现 `IRCv3 message-tags` 与 `batch` 机制，将分片内容回报给 Agent 正确处理。代表实时场景明确留存的实用性需求。

- **[#3311]** 是一位Telegram用户的生产事故——让AI执行`git`命令但同一错误重复多次，用户认为"这不应该静默等待，而是应该告诉我们到底失败了或至少给提示"。从该问题被完全修复的过程看，社区对稳定性要求敏感。

- **无负面情绪化抱怨**，整体属于可行动型反馈（说明通道、协议兼容性、错误可见性）。


## 8. 待处理积压

| 类型 | 编号 | 年龄 | 说明 | 建议 |
|---|---|---|---|---|
| Issue（Bug） | [#3339](https://github.com/sipeed/picoclaw/issues/3339) | 1天 | Antigravity 429、OAuth无效错误 | 需要维护者带OAuthScope与443日志验证，判断是SDK问题还是VM配置 |
| Issue（功能） | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 28天 | IRC长消息合并，暂无PR | 建议在0.9版本排期中给一个"评估"判定，引导issue到solution征集 |
| PR | [#3340](https://github.com/sipeed/picoclaw/pull/3340) | 1天 | Slack FileSize修复，已由作者完成 | 建议尽快合并，属于发行常用的通道（Slack）的回归级修复 |

---

**总体健康度评估：** 项目修复机制运转良好，随手Issue关闭率很高，新Bug（#3339）发生但时效内无严重事故；社区反馈以真实使用场景为主，单一且准确。唯一的开放功能需求（#3287）有深度共鸣需求但尚缺设计，预计可纳入迭代。

*数据统计窗口：2026-08-17 ~ 2026-08-18*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

## NanoClaw 项目动态日报 — 2026-08-18

> 数据基于过去 24h（截至 2026-08-18）的 GitHub 活动统计。

---

### 1. 今日速览

项目目前处于高活跃开发期，过去 24 小时共产生 4 条 Issue 更新和 42 条 PR 更新，其中核心团队（core-team）提交的渠道层（channels）重构系列 PR 占据了绝大部分流量。代码合并/关闭速度较快（25 条），但尚有 17 条 PR 积压待审，说明维护者（或 CI）吞吐能力较接近饱和。Issues 侧 3 条新开中有 2 条直指当前任务系统的日志丢失问题（#3301、#3289），Bug 报告与修复 PR 几乎同步出现，体现了良好的社区反馈闭环。整体健康度**良好**，但架构演进与稳定性补丁的交织（尤其针对 2.1.48 的一次性任务投递回归）值得观望。

---

### 3. 项目进展

核心团队今日推进的重点明确指向 **跨渠道（channels）架构演进** 以及 **运行时驱动抽象（drivers seam）** ，已合入多笔奠基性扩展：

-   **渠道层扩展（已完成合入）** ：
    -   [#3295 渠道成员加入事件 Hook](https://github.com/nanocoai/nanoclaw/pull/3295)：为 Chat SDK Bridge 增加通用的成员加入钩子，让渠道侧能统一处理入群/被邀请分配逻辑。
    -   [#3292 Bridge 入站策略注册缝隙](https://github.com/nanocoai/nanoclaw/pull/3292)：将原本需修改 Bridge 源码才能实现的入站规则（如机器人信息策略）改为模块化注册，显著降低了定制门槛。
    -   [#3294 投递后 Hook (首次投递上下文)](https://github.com/nanocoai/nanoclaw/pull/3294)：允许观测新会话首次回复，为渠道提供引导式交互的缝隙。
    -   [**#3296 叉工具扩展点（extendTool）**](https://github.com/nanocoai/nanoclaw/pull/3296)：允许在容器 MCP 工具层面对基础工具进行叠加式 schema 扩展与实际载荷透传（无需修改基础工具源码），对第三方工具集成是个较强信号。
    -   [**#3304 适配器声明的 sessionMode 默认值**](https://github.com/nanocoai/nanoclaw/pull/3304)：对 “per-thread（按线程）” 会话模式提供了声明式标记，推翻了原先调用处硬编码的约定。
    -   [#3310 恢复被合并丢失的 slack 格式化技能](https://github.com/nanocoai/nanoclaw/pull/3310)：该 PR 属于回归修复，指出之前的合并中容器技能目录被静默丢弃。

- **运行时驱动化（已合并核心 PR，但部分仍是 OPEN）**：
    - [**#3306 会话运行时驱动缝隙（Driver 模块）**](https://github.com/nanocoai/nanoclaw/pull/3306)（OPEN）：引入了 `src/drivers/` 模块，提出“会话是什么”与“如何运行”解耦，当前内置 Docker 实现作为默认。
    - [**#3307 Session 生命周期管理接入驱动缝隙**](https://github.com/nanocoai/nanoclaw/pull/3307)（OPEN，栈建立在 #3306 之上）：将主机的会话指挥迁移至驱动层。
    - [#3308 禁止在已存在的未释放目录上创建 agent group](https://github.com/nanocoai/nanoclaw/pull/3308)（OPEN）：该二级 PR 补充关键数据丢失保护，即在新生成 group 前，检查目录残留（错误继承已删除分组的数据）。

#### 关键修复方向

- **针对 pending 消息轮询的边界修正**（Issue #3289 对应的 [**PR #3291**](https://github.com/nanocoai/nanoclaw/pull/3291)）：将一次性把全部到期 pending 行加载到 JS 内存改为带边界（bound）轮询，修复积压时的高内存风险。
- **修复在 chat 会话中触发的任务行丢失日志问题**（[**PR #3303**](https://github.com/nanocoai/nanoclaw/pull/3303)）：对冲 #2.1.48 的回归（详情见下文 Bug 分析）。

---

### 4. 社区热点

今日讨论焦点集中在两份与之相关的**核心问题**上，虽评论数不多，但代表了 chat 会话模式下的关键反馈：

- **[Issue #3311 的 PR #3311：任务错误路由使用修正](https://github.com/nanocoai/nanoclaw/pull/3311)** 此 PR 专为修复 #3223，即操作员无法接收任务执行出错信息的问题。预调度任务跑批时的错误被错误路由为 chat 消息，错误信息因批次路由字段缺失而丢失。这是稳定性的重要修复方向，信号 **“任务闭环的调试性”** 是关键焦点。
- **Issue #3301 集成的任务回归问题**（[链接](https://github.com/nanocoai/nanoclaw/issues/3301)）：系统自 2.4.8 引入“单向门”机制后，频道为**任务行**触发时，整个查询被迫切换到任务模式，导致日志丢失、回复被吞、系列表不可见。下方分析显示，已有修复 PR #6033 出现（可见下节 Bug 栏）。但本热点要指出：用户社区**正在积极反馈异步任务 vs 即时回复的交互冲突**。

- **架构上的重大讨论集中在 gavrielc 主导的 Channels 系列 PR**（尤其 #3350、#3304、#3306），讨论了“线程 vs 直接消息”优先级、合并策略安全性（避免重蹈 3310 的合并丢失），体现了以核心团队的**主动性架构演进**而非等待 bug 出现的驱动模式。

---

### 5. Bug 与稳定性

按严重程度排列（全部已标注是否有修复 PR）：

**高 — 环境类型错误（可能导致构建/运行崩溃）**
- **[Issue #3203：OpenAI codex provider 发出未声明的事件，导致类型检查失败和图片丢失](https://github.com/nanocoai/nanoclaw/issues/2203)**（开放时间较长，更新于 08-17）。
    - **描述**：`codex` 供应商发出未在 `ProviderEvent` 中声明的 `file` event，触发容器类型错误（typecheck），甚至导致代码生成图片被弃用。
    - **修复状态**：已有关闭的修复 PR [**#3299**](https://github.com/nanocoai/nanoclaw/pull/3299)（升级 @openai/codex 版本），但尚未合入核心类型检查（仍是 OPEN），必须在版本丢失前尽快审查。
    - 相关修复 PR 方向：此类大概率是类型升级导致的事件结构不匹配，耦合测试验证深度待补强。

**中优先级（任务路由与日志丢失，回归）**
- **[Issue #3301：聊天会话期间执行的任务有“单向门”行为，日志应不传到控制台且系列无法列出](https://github.com/nanocoai/nanoclaw/issues/3301)**。
    - 直接影响：用户反馈的所有历史任务均被吞没，甚至在最新版上，只要任务在聊天会话中触发便同以同样方式响应。
    - 修复：**PR #3303** 保持任务行在聊天存在中的运行日志（fix）已在打。
- **[Issue #3289 对应 PR #3291](https://github.com/nanocoai/nanoclaw/issues/3297)**：`getPendingMessages()` 每次将整体所有到期 Pending 行加载到内存的大规模内存块问题。对极大积压的场景（大量频道），会造成性能瓶颈。
    - 修复：**PR #3291** 已绑定修复，明确推出边界化轮询语义（OPEN）。

**低优先级（潜在安全问题/用户体验优化）**
- **[Issue #1143 文档中路径失效](https://github.com/nanocoai/nanoclaw/)**（已关闭）：文档引用 `/data/env` 路径已不存在，该路径是最早的残留文件。注意：这类文档历史遗留问题如果不清理，会低估新用户的上手成本，已在 8/17 更新关闭。

---

### 6. 功能请求与路线图信号

#### 渠道接入与精细化管理（已在演进中）
- **新增网络聊天（Web Chat）功能**[PR #3298](https://github.com/nanocoai/nanoclaw/pull/3298)：新增**本地回环（Loopback-Only）** 的网页聊天适配器。这是对现有”仅 Slack/集群终端“之外的交互补充，使 agent 能通过本地浏览器快速交互，对个人开发者站点很实用。
- **分组（Groups）数据保护强化**[PR #3308](https://github.com/nanocoai/nanoclaw/pull/3308)：禁止在已存在且未拆分的目录上创建群组。此行为结合 #2.1 提及的 agent group 目录残留，可引起旧 folder 被静默采纳或文件被错误接管。默认拒绝这样的操作，是一种降低误用风险。

#### 会话运行机制的深化变革（路线图）

- **Session Driver Seam（建议已在主分支中将其作为核心主线）**
    - PR #3306 + #3307 是本次演进最关键的，链路指向“未来将支持更多非 Docker 的会话运行方式（如本地进程期，或云 vm）”。
    - 但 `NANOCLAW_RUNTIME_DRIVER` 环境变量选择开关当前仍处于“基于内置 Docker Driver 的默认配置”，**本质是暂时保持透明、无破坏性过渡到新的上层框架**。
    - **对持续关注此方向的用户信号**：如果您希望减少 Docker 依赖、或在其他 sandbox 中运行，驱动合并将是直接对接的“下一次升级点”。

---

### 7. 用户反馈摘要

- **任务自动运行的交互逻辑备受关注**：Glifocat（#3301、#3289）两次强调同一核心问题——执行模式（任务 vs 聊天）的割裂，这使得用户无法预判是否自动落单。两条反馈均指向 **需要将任务日志和调度线路显性公布**，而不在一体化的“单一门”后合并消失。这一点的实现目前由 PR #3303 直接解决（补录日志），但要完全核验还需要审慎评价。
- **对 BUG 上报的有效性信号**：- Tilat-cat 的用户表示，在无法被告运行日志系列 ID 的情况下，他只能丢失的线程 ID 的情况，说明**丢失时的可诊断性**成为当前实现的主要痛点。而 m**代码x 用户（#3203）**在遇到类型失败时更直接地反馈“里面有图，但最终被卸载了，等于白做了”。这是是**性能与稳定性的双重损失**：若无法保住成果，自动化流程的价值会大打折扣。
- **长期有效的用户关注**——能否以“無冗長率”为原则，新增哪些并不是分散的，但 `slack-formatting` 目录在合并中被丢失后，有成员即刻上传并提交补恢复（#3310）。这个细节侧面说明容器技能易变，且对格式化这一基础 UX 很在意。

---

### 8. 待处理积压（需要维护者关注的long-pending）

- **Issue #3203（codex provider 事件与 typcheck 失败）**（创建于 08-08，更新于 08-17）：
    - 由于 **8-31 模型退役日期**（GPT-5.4 版本结束），此 Issue 核心风险时间窗口极为紧迫（作者 #3299 已在 6 月写明），需在退役之日（2026-08-31）前合入升级 PR 修复，否则所有 codex 用户所有将通过老模型受影响。
    - 建议维护者在合入前，合并其关联 PR（#3299）可一并解决 Provider 结构风险。潜入有深度提示：虽然没有类型事件，但要检查是否还缺引出的其他事件。
- **Issue #1143（文档路径失效，已关闭）**：虽已关闭，但在本地关闭并未推动文档更新（关闭时间 08-17，但内容涉及的路径已从库中消失很久）。建议要验证：是否有新的 /env 替代路径出现，并将文档修改同步至最新（如有需要）。属于“轻量但导向新手用户的使用阻点”。

---

**维护者提醒**：
- 快速关注 [#3299（版本升级 + 适配 codex 的类型导致生成失败）](https://github.com/nanocoai/nanoclaw/pull/3299)和[#3291（pending 边界安全）](https://github.com/nanocoai/nanoclaw/pull/3291)，两者都在修复高频使用路径（Agent/Codex文生成、定时大批量往期任务），但现在 OPEN 但 evaluate 快速通过，对整体稳定体验至关重要。
- 另外，注意 #3306/#3307 等待 driver seam 的两个大 PR 已是目前最大的技术债，侵入性低但整体性大，建议组织更整体的验证场，避免零散合入后回程 debug 成本。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-18

## 今日速览

项目昨日活跃度处于高位：24小时内产生了 28 条 Issue 更新和 44 条 PR 更新，1.3.0-rc.1 候选版本已发布。当前开发主线集中在 **#7591 持久化写入压力优化（Epic）** 系列——包括资源协调器单次写入折叠（#7701）、BeforeModel 检查点批处理（#7603）、消息侧面行折叠（#7605）等，体现团队对后端性能的持续投入。同时，**#7714 libSQL 单写连接饥饿级联问题** 被报告并已获 PR #7717 修复，属今日高风险故障。社区方面，持久化记忆跨会话确认（#7275）已关闭验证通过，放开背包中的较旧 PR（#7124、#7513）数量仍在缓慢累积。

---

## 版本发布

### ironclaw-v1.3.0-rc.1

- **发布时间**：2026-08-17
- **发布说明**：Release notes 为空，未提供详细变更及破坏性说明。建议在渠道中补充相关信息。
- **安装方式**：提供 shell 与 PowerShell 安装脚本，均可从 GitHub Releases 下载预编译二进制。
- **迁移提示**：无发布说明，升级前建议参考 1.2→1.3 迁移文档确认适配点（如有）。

🔗 [查看 Release](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.3.0-rc.1)

---

## 项目进展

### 已合并/关闭

#### 主要功能合并：
- **#7684（PR #7684）— 生产持久记忆验证重返**：验证显式持久记忆召回在生产环境可正常工作，获得关闭。#7684 关闭链接见 [Issue #7684](https://github.com/nearai/ironclaw/issues/7684)（备注：数据源提供的 issue #7275 已关闭，关联该验证）。
- **#7696（PR #7696）— 自动化任务的确定性“不投递”结果**：通过 #7647（CLOSED）完成，支持调度运行在无内容需投递时返回一个类型化的确定性抑制结果，强化自动化契约。[Issue #7647](https://github.com/nearai/ironclaw/issues/7647) 关闭。
- **#7637（PR #7637）— 切 Design System 组件边界**：为设计系统层组件添加显式 prop 类型，提高前端类型安全性；[Issue#7637 已关闭](https://github.com/nearai/ironclaw/issues/7637)。

### 已合并/关闭的 PR 摘要：
- **#7663 — 将 1.2 修复推到 main**：包含 Windows 文件系统/发布稳定性、`curl` 健康检查等（forward-port 至当前 main）。 [PR #7663](https://github.com/nearai/ironclaw/pull/7663)
- **#7703 — 闭并加入工作能力响应标准化**：被 #7711 替换并折叠（add-then-remove churn 修复），说明团队避免不必要的中间步骤，合并进 #7711。
- **#7710 — Slack 多 Agent 审查修复**：针对 #7682 的 review 结果提出的两个修复 commit（WebUI connect-link 落地页加固、Slack 处理），合并到目标分支。[PR #7710 关闭](https://github.com/nearai/ironclaw/pull/7710)

### 整体推进：
1.3.0-rc.1 候选已发布，并完成 1.2 修复项的 main 分支移植，反馈验证案例 #7684 关闭。当前仍有多个 XL 级别功能待合并（详见 PR 列表）。

---

## 社区热点

| 排名 | Issue/PR | 标题 | 评论数 | 关注点 |
|-------|----------|------|--------|--------|
| 1 | [Issue #7275](https://github.com/nearai/ironclaw/issues/7275) | Reborn: 验显式持久内存跨会话召回 | 4 | 反馈提及的反进展（closed）验证工作；被用户使用后获得验证，虽然已关闭仍具参考价值 |
| 2 | [Issue #7591](https://github.com/nearai/ironclaw/issues/7591) | Epic: Reduce durable DB write pressure~60% | 3 | 核心持久化优化 Epic 下多个子任务的参考 |
| 3 | [Issue #7701](https://github.com/nearai/ironclaw/issues/7701) | 合并资源型 governor reserve+reconcile | 2 | 写入压力缩减建议继续落地 |
| 4 | [Issue #7603](https://github.com/nearai/ironclaw/issues/7603) | Tier3 批量 BeforeModel checkpoints per-N iterations | 2 | “安全缺口”#7707 提出新的批处理方式，原方案移动至新 Issue |
| 5 | [Issue #7606](https://github.com/nearai/ironclaw/issues/7606) / | Tier3 配对行写入 | 2 | 拆分四个独立折叠点，每个独立发版。 |
| 6 | [Issue #3762](https://github.com/nearai/ironclaw/issues/3762) |  编辑 AGENTS.md UI 不更新系统提示 | 2 | 长期问题（5月已提交），今日新增活动，关注度提升 |

**分析**：社区讨论聚焦在 **持久化写入压力优化**，同时被 3 个闭环的 Tier-3 子问题（#7603、#7606 等）围绕，团队回应积极。但 #3762 属于 WebUI 长期未解决的体验问题，评论再次出现，说明用户对 /identity 文件管理体验仍有诉求。

---

## Bug 与稳定性

### 严重

| Issue | 关键词 | 类别 | 说明 | Fix PR |
|-------|---------|------|------|--------|
| [#7714](https://github.com/nearai/ironclaw/issues/7714) | libSQL 写连接星空间 | **Crash/退化** | PinchBench 测试中，资源 governor 的 delta journal 登录 ~40s 连接，导致 authority 每 40s 无效、reservation 泄漏、能力调用报误“进程不存在”。 | ✅ #7717（已开启） |
| [#7712](https://github.com/nearai/ironclaw/issues/7712) | BeforeModel checkpoint 批处理逻辑 unsafe | **高** | #7707 提出 checkpoint 批处理方案通过调用 “newest checkpoint kind” 推断，但不安全；需显式跟踪 side-effect-outstanding。 | #7712 修改考 |

### 中

| Issue | 关键词 | 说明 | Fix PR |
|-------|---------|------|--------|
| [#7707](https://github.com/nearai/ironclaw/issues/7707) | Lease 续期恢复逻辑不安全 | 当前通过“最新= checkpoint kind”推断 side-effect，存在副作用遗漏。需在 process 行显式跟踪。 | #7712（合入） |
| [#7702](https://github.com/nearai/ironclaw/issues/7702) | Audit 记录缺失 | 生产环境从不附加 “AuditBefore/AuditAfter”，违反 host-api 契约要求。 | 待办 |
| [#7705](https://github.com/nearai/ironclaw/issues/7705) | Pending flush error 锁存；shutdown 阻塞 | CoalescingEventSink 关闭时，后端疲劳必须这种 status，可能导致停机 hangs。 | 待办 |

### 已修复

- [#7714](https://github.com/nearai/ironclaw/pull/7717) — 关闭；授权#7714中 PN 的后链路。

**工具/产品 QA 报告**：
- #7704 [failure taxonomy](https://github.com/nearai/ironclaw/issues/7704) 清晰指出 “存储 write-lane”是首位可修复缺陷。

---

## 功能请求与路线图信号

以下请求驱动的新功能已在 PR 列表中出现：

| 请求 | 匹配 PR | 类型/可能性 |
|------|---------|------------|
| **持久化通知收件箱**（#7688，#7689，#7690，#7691、#7706） | 由 italic-jinxin 连续提出四个编号# | 高，多个子任务已拆分，ready for integration，进入 v1.3/1.4 |
| **Slack 非链接用户私有 Connect 流程**（#7681） | PR #7682 + #7710（修复已合入） | 🧪已实现，等待合入（#7710 关闭） |
| **GitHub Projects v2 字段操作**（#7719） | — | 未开始仍在讨论 |
| **Google Docs 扩展检验 Instruct ** | PR #7718 | XL 级新增，已提交待合并 |
| **原生结构输出终态** | PR #7693 | XL 级 end-to-end，已 PR | 
| **Web 界面 OOBE 自动化原型**（#7046？） | PR #6994 | 开发-测试，门关 flag_off 默认关闭 |

**路线图**：大量新增功能围绕输入产品层（UI/UX、Slack/自动化）+ 持久化内存以及数据优化。下一版本 v1.3 接近尾声，v1.4.0 建议方向已在标签中（#3737 等）。

---

## 用户反馈摘要

1.  **持久记忆召回问题**（- 考虑重新。 #7275 中的用户报告：在 A 对话中显式设置的信息，在后续对话中（明确）未被召回。同类问题已在 #7590（该 issue）中提及。今晨新增验证测试确认基础问题存在，但有针对性测试下的指标可能尚不明确。
2.  **AGENTS.md 编辑问题**(#3762)：Web UI 更新 AGENTS.md 不触发 system prompt 更新，对使用集成体验造成极大中断。
3.  **Slack 链接外部用户** 体验：新用户会被推送公屏提示，且升级路径需要手动往返（#7681），pr #7682 的实现将改为私密 + 单置 connect link，已被 merge。
4.  **MCP server 配置**：bearer key 及 STDIO/HTTP 传输不足选项（#7716），对集成部署有所阻碍。
5.  **Telegram 接入指引**不明确，是否需要选择 bot 或个人号连接（#7715）。

其余如#7715/#7716 均有 (#bug_bash) 中 QA 反馈，重心反映在新增的 “Dogfooding & QA 周” Epic #7685 上。

---

## 待处理积压

### 长期未合并的重要 PR：
| PR | 描述 | 时间已开放 | 关注度 |
|----|------|-----------|--------|
| [#7184](https://github.com/nearai/ironclaw/pull/7184) | Nostr WASM host functions | 8/04 开始，两周未合入 | 社区寻求 |
| [#7513](https://github.com/nearai/ironclaw/pull/7513) | ACP serve command（CLI） | 7日 | 贡献者等待反馈 |
| [#7406](https://github.com/nearai/ironclaw/pull/7406) | 依赖 bumps（actions组） | 8 天 | 等待 CI 通过 |
| [#7047 (未在列表中找到)] | — | — | — |

### 时间稍长，需要维护者尽快确认的 issues（> 7 天）：
- [#3762](https://github.com/nearai/ironclaw/issues/3762) — AGENTS.md UI 同步问题（旧）在新活动中。
- [#7591](https://github.com/nearai/ironclaw/issues/7591) 作为 Epic 已被连续迭代稳步推进，暂无阻塞。

---

**总结**：项目短期快速改动，性能与稳定性修复（写压力、libSQL Bug）在主线积极进行，1.3.0-rc1 针对已出，QA 周则集中在产品 UX 细节（Slack、MCP Server config 等），前端架构重构/通知系统（#7687~#7691）集中发力。整体健康度高，风险集中在本土基础设施路径（写链接、checkpoint）。

---
*本报告由 AI 维护，生成时间 2026-08-18，数据基于 GitHub API 镜像，未判断主观代码。*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-08-18

## 今日速览

今日项目活跃度整体稳定：24 小时内有 7 条 Issue 更新（6 条为今日新开，1 条为既有活跃讨论），21 条 PR 更新（18 条合并/关闭、3 条待合并）。今日唯一的全新 Issue 是社区项目 VOKO 的推荐文章，其余多为此前 [stale] 标记的旧问题被重新触碰（由 `stale` 机器人标记或用户评论触发）。值得关注的是，本周合并的 PR 中包含大量 4 月创建的积压 PR（如 #1636-#1642、#1663 等），说明**维护团队正在集中清理较早期提交的功能代码**。**新功能开发**（如 DSv 引擎接入、OrcaRouter 提供方集成）仍在推进，项目未发布新版本。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

项目代码合并/关闭了 18 条 PR，其中重要进展集中在以下方面：

### 新能力与重构
- **DeepSeek Harness (dsh) 运行时集成**（#2502 dsh engine integration、#2505 dsh process launcher 均已合并）：为桌面端接入 `dsh` 进程管理能力，这代表着对 DeepSeek 相关开发工具链的底层支持，补齐文档沉淀（#2506 docs）。
- **编辑器体验增强**（#2503 merged）：Electron 主窗口中的文本输入控件新增「剪切/复制/粘贴/全选」上下文菜单，将 Windows/Linux 桌面端习惯带入 macOS。
- **OrcaRouter 提供方集成**（#2504 OPEN，待合并）：新增一个 Anthropic/OpenAI 兼容的 LLM 网关 `OrcaRouter`，作为“单源真值”提供方注册表中的一级提供方，与现有 OpenRouter 同等地位接入，属于**模型网关扩展**。

### 社区 PR 集中合并（4 月提交，本次更新标注 CLOSEED）
- #1636、#37、#40、#41（来自 `@0xFLX`）：Cowork 聊天窗口的 **滚动到底部按钮、AI 回复重新生成、tool 结果一键复制、所有弹窗 Esc 关闭** 一并合入。
- #1639（修复）：多标签按钮 tooltip 硬编码英文，本轮国际化补全。
- #1642：Windows 右键菜单“用 LobsterAI 打开目录”。
- #1663（OpenClaw 升级）：`v2026.3.2` → `v2026.4.12`，并修复 plugin-sdk 兼容性错误。
- #1667、#1668、#1669：阿里云 Qwen 控制台链接迁移到百炼、**Agent 独立工作目录配置**、设置页模型提供商用户体验修复（新增 `missingModels` 类型禁用逻辑）。
- #1661（fix）：导出日志时对敏感信息（token/API key）脱敏。

整体判断：官方在本周集中在 **“编辑器体验、国际化、Agent 可配置性、安全脱敏”** 四个方面补全了基础体验，同时加速接入新 AI 网关。

---

## 社区热点

本周社区最活跃的 Issue 竟集中在一条旧问题上：

- **[#1653] groupPolicy 被覆盖**（@zjm79）— 2 条评论，近 4 天前刚有一次更新。用户持续反馈“每次过一会就会被覆盖”，持续一周未获得官方进展。
- **[#2500] VOKO 项目推广**（@271912980）— 1 条评论，但新开当日引发社区互动，属于新项目的主动推荐的承诺，可观察其是否引到深入讨论（A2A 协议兴趣）。

其余 Issue 评论数几乎为 1（多数）或 0（如 VOKO）、无明显评论区热闹的 PR（评论数据缺失）。这说明**社区活跃度中等偏“官方是主导”**，外部贡献尽力在减少但并未爆发。

---

## Bug 与稳定性

无新增崩溃级或安全级 Bug，但存在**多个跨月的“搁置风”问题**，按严重程度排列：

| 严重度 | Issue | 描述 | 是否有 fix PR |
|--------|------|------|------|
| **高** | [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653) groupPolicy 持续被覆盖 | 用户明确说法“每过一会就被覆盖”，规则自动失效 | ❌ 无 PR |
| **高** | [#1662](https://github.com/netease-youdao/LobsterAI/issues/1662) 除 SSE 之外的 MCP 引擎全部不可用 | 大概率是核心链路故障，影响面较大 | ❌ 暂无 |
| **中** | [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635) Ollama 本地模型无法使用 | 提供截图，Ollama 配置正常，但 Oss≤ 报错，CherryStudio 同模型可用，属兼容或配置识别问题 | ❌ 无明确 PR |
| **中** | [#1643](https://github.com/netease-youdao/LobsterAI/issues/1643) 定时任务保存时提示“还有内容未保存”但已保存 | 属于 UI 误报，影响信任感 | ❌ 无 |
| **低** | [#1671](https://github.com/netease-youdao/LobsterAI/issues/1671) md 转 word 半途终止（sse finish reason full） | 日志看出 Token 耗尽但无 retry 策略 | ❌ 无 |

上述 Bug 分属 4-7 月的旧 Issue，且都未提出修复方案，是明显的能力缺口。

---

## 功能请求与路线图信号

- [#1644](https://github.com/netease-youdao/LobsterAI/issues/1644)（用户 @orion0608）：**期望基于 md 的工作流功能，让 main agent 调用其他 agent 组成完成复杂任务** 当前 main agent 无法感知其他独立 agent，导致任务无法组合。在此强烈建议 #1668（Agent 独立工作目录）合发后，可以更容易实现；这是**明确的路线图信号：多 Agent 组合执行**。
- PR #2504（OrcaRouter）：征集自网关注入，说明官方在扩展 Cost 报告/偏好语言；如果用户对多 LLM 网关高度需求，OrcaRouter 会已发。
- 另有 2 个来自 4 月的需求：如 #2504 确认为开放中，未合并。其余 PR #1660（非 main agent 首页显示名称与描述）仍在开放中正向。

若按 PR 合并趋势预告，下一版本极大概率包含：**OrcaRouter 网关、Agent 独立工作目录、弹窗 Esc 统一、以及多个 i18n 质量修复**。

---

## 用户反馈摘要

- **@zjm79（#1653）** ：“groupPolicy为啥每过一会就被覆盖” 一针见血：规则持续性不足，应该是系统反复用 `allowlist` 默认值刷掉用户配置，极大影响可预期性，另外评论中也反馈 4 此重复，未获得官方正式答复。
- **@orion0608（#1643）** ： 正当反馈：“应用其实已经保存成功了” ，但 UI 告知失败——误导用户在尝试保存久“保存”失败。后续造肢体实现编辑操作反而留存成功，其应用内部信任度不高。
- **@zhahongan-ctrl（#1635）** ：只能感覺对比：`Ollama 本身无问题，CherryStudio 可用且支持 MCP`，此为 Lobster 对比可见的缺陷，且高精确场景（本地模型）即可被替代。
- **@qxjysd（#1662）** ：MCP 通道也不止 SSE 一种，漏得太多。

总体用户声音：**稳定性 >> 新功能**，特别是老用户不断回归这些问题，说明官方需在 基础设备层修复后再做功能。

---

## 待处理积压

| 类型 | 编号 | 说明 | 看板 |
|------|------|------|------|
| Issue | [#1653](https://github.com/netease-youdao/LobsterAI/issues/1653) | groupPolicy 被覆盖，**持续 4 天未能闭合** | 高优先 |
| Issue | [#1662](https://github.com/netease-youdao/LobsterAI/issues/1662) | 非 SSE MCP 无法用，核心功能 5 个月未修 | 高优先 |
| Issue | [#1635](https://github.com/netease-youdao/LobsterAI/issues/1635) | Ollama 本地模型不通过，用户 20+ 天无回答 | 高优先 |
| PR | [#1277](https://github.com/netease-youdao/LobsterAI/pull/1277) | `dependabot` 尝试将 electron 38 → 40 规则冲突、连续 6 个月未合并（OpenAI 阻断器影响，需人工确认） | 需维护者介入 |
| Issue | [#1644](https://github.com/netease-youdao/LobsterAI/issues/1644) | Agent 列表无法感知其他 Agent，无法请求复合工作流；该需求被 #1668 部分满足，但开放性请求仍无计划 | 路线图讨论 |

---

**总评：** 项目代码活跃度中等偏上，正在整合大量历史有用的社区 PR，但未开启新版本；4-5 个核心功能 Bug 已积压较久，用户社区情绪稳定，但持续在稳定层面喊话。建议下一步将视线转向修复合入基础管道问题，并开启一轮“社区积压清理月”。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-18

---

## 1. 今日速览

Moltis 项目当前处于**中度活跃**状态，24 小时内总计 12 项更新（3 Issues / 9 PRs），无新版本 Release。**核心代码讨论聚焦于 Gateway 心跳机制与 Cron 调度**，PR #1208、#1209 分别修复了心跳活跃时间配置不生效和配置文件被整段覆盖的缺陷，表明稳定性修护节奏正在加速。CI 红线问题今日关闭（#1202），同时外部代理的类型支持增强新提交已开始推进。在当前窗口内，3 条 PR 仍位于待合并状态，其中 **70% 的合并 PR 是由 `dependabot` 自动升级触发的**，人工提交的修复性 PR 进展有限，长期建立中的 `shadow DOM` 浏览器快照修复和 RPC 超时配置特性在本轮被关闭，值得注意。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

> 以下为此前 24 小时关闭或合并的、与核心推进相关的主要 PR。

### 核心功能性修复
- **[[#1125] Support model and effort selection for external agents](https://github.com/moltis-org/moltis/pull/1125)** — 今日合并：为 `/model` 添加针对外部代理的 `models/efforts` 属性选择，代理配置元数据保留在会话中。此前这一直处于长期挂起状态，本次合并意味着对外部代理的高级配置迈出最关键一步。
- **[[#1130] feat: make webui rpc timeout configurable](https://github.com/moltis-org/moltis/pull/1130)** — 合并（关闭 #1127），WebUI RPC 超时时间允许通过设置界面动态调整，提升弱网环境体验。
- **[#1204] feat: add MiniMax Code ACP agent** — 合并：增加 `acp-minimax-code`外部代理支持，集成 MiniMax Code 到默认检测清单与代理注册库，提升第三方模型的可接入能力和默认配置覆盖性。

### 关键内部修复与回归
- **[[#1202] 已关闭] Format CI gate is red on main: two files over the 1500-line limit](https://github.com/moltis-org/moltis/issues/1202)** — 该问题为 CI 门禁扫到的回归：两个文件超出格式要求（`store.rs` 1799 行 / `admin.rs` 1531 行），在今日标注为关闭，表明 CI 恢复绿。
- **[[#1103] fix(browser): 高效穿透 Shadow DOM 查找路径](https://github.com/moltis-org/moltis/pull/1103)** — 期间关闭，补充了快照与引用查找对 Shadow DOM 的支持，绕过原始 PR 无法推送的问题。

- **[#1204] MiniMax Code ACP 添加 User-facing 文档** — 合并并同步文档与配置校验。

整体来看以上 PR 序列高度锁定在（异构 Agent 接入便捷性 + 浏览器底层快照修复 + 超时设置），这代表未来版本对**多模型等价支持**和**复杂网页可观测性**的偏好。

---

## 4. 社区热点

- **[Issue #1095 – Podman 无法通过 moltis 工作](https://github.com/moltis-org/moltis/issues/1095)**
  - 今日评论量上升 1：帖子发布于 6 月，长期未解决，圈内已被用户反映。当前收到 2 条评论。该not问题是否有官方承认或者阻塞。直接涉及容器运行。是首页阅读用户的预期热点，1 周被反复触发。
- **[PR #1208 – honor heartbeat active hours](https://github.com/moltis-org/moltis/pull/1208)** — 虽未描述在评论区集中讨论，但代码逻辑指出：`heartbeat.active_hours` 虽然已有实现、测试和文档，但实际从未被调度器调用，触发用户真实 WHAT 是配置不生效的应反馈，现已直接修复该 bug。

- **[[#1209] heartbeat.update 作为部分更新而不是整块覆盖](https://github.com/moltis-org/moltis/pull/1209)** — 该 patch 指出 `HeartbeatConfig` 整段覆盖来自 `#[serde(default)]` 导致的所有未传字段全部被重设回默认值，属于让用户无感或不敢改写的缺陷，诉求是“干活时并不想改掉不在变更范围内的配置”。

---

## 5. Bug 与稳定性

| 主题 | 严重程度 | 状态 | 相关 PR |
|---|---|---|---|
| [#1095] Podman 无法工作 | ★★★ | 开放 2 个月，仍活跃 | 无 |
| **heartbeat.update patch 逻辑（#1209）** | ★★ | 已在 PR | #1209 |
| **heartbeat.active_hours 不触发** | ★ | 关键已修复 | #1208 |
| CI 卡文件行数（#1202） | 无功能影响 | 已关闭 | 无关 |

结论：当前没有致命崩溃性回归。两个低级别 Bug（**heartbeat config 部分**）正在主合分支修复，十分影响用户体验，但改动本身小而确定。

---

## 6. 功能展示与路线图信号

- **“允许配置 RPC 超时”**[完成]
  - Issue #1127（已关闭）与 PR #1130 供**WebUI 可解析的 RPC 超时支持**，适合 + 自动发现场景。
- **外部 Agent 选择能力**
  - 合并 #1125 代表“大型外部代理接入 / 模型流擅长精确定制”UI 体验推进。同时 Closed #1125 / 打开 #1206（Managed Files library + Settings browser）展示下一步尝试纳入 Files API 作为默认，并追加 Docker / Podman 仅读挂载。
- **浏览器 Shadow DOM 穿透**（#1103 已合入）是里程碑性 update，对复杂的用户在真实业务中面对复杂 Web 应用预判有用。

应用栈上：Lineage 可以看出‑代码无明显公开路线图文档，但 new PR #1206、#1204 均表明尝试用全新“managed/加特 files”和“MiniMax”生态增强 VA 实用性指向明确，下一个小版本可能仍专注**外部模型优先的秘密**与文件搜索集成。

---

## 7. 用户反馈摘要

- **Podman 用户近期 актив抱怨** [#1095]: “已经在 container image 里跑起 Moltis，但通过 podman 呼叫还是失败”，IF 严重 → 虽然在原报告有人表示是可完美获取场景，但仍需通过 `moltis.toml` 或错误流一步步排查解决 — 影响安全隔离者。暂无官方确认回复。
- **配置保留强诉求**：不止一个用户或开发者（#1209 代码）注意`heartbeat`在 update 手里全字段覆盖问题 – “保存新 IP 时整个 `moltis.toml` 全字段回档默认” 是危险时刻，建议合并该 PR 以提升配置文件更新 MVP 体验。
- **程序补噪 UV**: 用户在多场景下**倾向 RPC 超时能调**（#1127），一方是 TF：由于超时引发之前 WebUI 高发卡顿，此行为改进明显获得认可。

---

## 8. 待处理积压

| 链接 | 类型 | 创建时间 | 最后更新时间 | 备注 |
|---|---|---|---|---|
| [Issue #1095  Podman 容器不可用](https://github.com/moltis-org/moltis/issues/1095) | Bug | 2026-06-03 | 2026-08-17 | 开放已超过 2 个月，最新评论 8-17，缺维护者具体介入，处于 risé |
| [PR #1206 加入 Files 库](https://github.com/moltis-org/moltis/pull/1206) | 功能 | 2026-08-17 | 2026-08-17 | 说明仍在 OPEN，围绕管理文件和配置浏览器可能有潜力，但图还需要 1206 挂载写入权限 |
| [Issue #1095 关联不确定](https://github.com/moltis-org/moltis/issues/1095) | — | 6/15 | 6/17 | — |

**优先建议**：
- `heartbeatupdate.patch` 逻辑（#1209 / #1208）应尽快合并，因为打磨 core-cron 调度的紧迫感将点亮。
- 维护者可进一步对 Podman 缺失环境的 runner 跑一次；被投诉者可在 outer 节点尝试 — 从而解决境外热点疑问。

---

*本报告生成基于 2026-08-18 12:00 UTC*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 开源项目动态日报
**日期**: 2026-08-18
**数据来源**: GitHub (agentscope-ai/CoPaw)

---

## 1. 今日速览

今日项目活跃度 **中等偏上**。过去24小时内共产生14条Issue更新（8条活跃，6条关闭）和35条PR更新（22条已合并/关闭，13条待合并），无新版本发布（当前仍为 v2.1.0）。值得关注的是，社区反馈主要集中在 **Agent工具调用崩溃、MCP工具失效、多会话冲突** 三个稳定性问题上，其中两个重要Bug（#7063 工具调用崩溃、#7088 QQ图片过期URL）已被快速关闭，且 #7088 已有对应修复PR（#7087）提交。功能需求方面，**频道级模型配置** 和 **定时任务可观测性** 是今日呼声较高的两大方向，均收到多条评论讨论。整体项目演进节奏稳定，Pull Request 合并流转效率良好。

---

## 2. 版本发布

今日 **无 新版本发布**。项目仍处于 v2.1.0 阶段。不过根据 Issue 讨论，已发现用户正在使用 `2.1.0`（较新）与 `2.0.0 post3`（Docker版，较旧），说明最近一次主版本升级较近，升级心智与兼容性问题仍值得维护者关注。

---

## 3. 项目进展

近期合并/关闭的主要PR围绕 **数据可观测性、平台生态扩展、Console 体验细节修复** 等维度展开，形成较明显的 "稳定 + 微创新" 节奏。

- **Media下载与展示** ([#7036](https://github.com/agentscope-ai/QwenPaw/pull/7036), [#7051](https://github.com/agentscope-ai/QwenPaw/issues/7051)) — 完成媒体下载按钮与收藏展示功能的UI优化及落地，提升了 Console 端富媒体交互易用性。
- **上下文/Token 计算修复** ([#6968](https://github.com/agentscope-ai/QwenPaw/pull/6968) 合并，[#6975](https://github.com/agentscope-ai/QwenPaw/pull/6975) 合并) — 修复 `token-usage` 符号计算中“图像 base64 被错误计为文本 token”的问题，并补齐 `/compact` 后上下文使用常数不刷新的缺陷。
- **PawApp 生态推进** ([#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) 合并 + [#7089](https://github.com/agentscope-ai/QwenPaw/pull/7089) 新提) — DataPaw 原生应用发布并引入独立版本驱动的 CI 发布流水线。
- **核心架构演进 PR 已接收确认** ([#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302), [#6719](https://github.com/agentscope-ai/QwenPaw/pull/6719), [#6976](https://github.com/agentscope-ai/QwenPaw/pull/6976)) — 涉及 provider 模型管理统一、工作区 artifact 卡片、审阅会话多目录绑定，均已获维护者标记（Receive），预计将加速合入后续版本。

---

## 4. 社区热点

- **#7011 Console 停止请求覆盖飞书会话 (2.1.0)** — [链接](https://github.com/agentscope-ai/QwenPaw/issues/7011)  
  讨论热度 **6条评论**，社区参与者撰文复盘了当前会话身份标识符发生交错（Identity cross-over）以及一个会话被另一个 UI 发起 stop 导致观察中断的详细机理。诉求集中指向系统层多会话隔离必需，这也成为 2.1.1 候选的首要修复点。

- **#7085 按频道独立配置模型** — [链接](https://github.com/agentscope-ai/QwenPaw/issues/7085)  
  需求描述清晰、使用场景典型（钉钉走快模型、微信走中文增强、控制台走本地模型），是当前最高呼声的**多场景差异化路由**需求。

- **#6925 智能体协作单会话窗口** — [链接](https://github.com/agentscope-ai/QwenPaw/issues/6925)  
  用户抱怨协作任务自动创建新会话并需要频繁切换查看，在人机协同体验上留下割裂感，引发对“会话 - Agent”关系建模的讨论。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue | 标题 | 状态与备注 |
| --- | --- | --- | --- |
| 高 | [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) | Console 停止请求在多个 UI 会话下可取消活跃飞书会话 | **Open** — 会话会话身份隔离缺陷，重复时攻击面广，无分支 PR 已提出 |
| 高 | [#7082](https://github.com/agentscope-ai/QwenPaw/issues/7082) | `_StructuredOutputDynamicClass` Pydantic 部分类错误导致模型执行失败 | **Open** — 从 Agent/Toolkit 初始化起贯穿主链路执行异常，机制级阻断 |
| 中 | [#2084](https://github.com/agentscope-ai/QwenPaw/issues/2084) | 单条历史会话无法重新打开 | **Open** — 首页控件切换逻辑避让了唯一指针 |
| 中 | [#2088](https://github.com/agentscope-ai/QwenPaw/issues/2088) | OneBot 通道传递过期 QQ 图片 URL → 400 + 污染会话历史 | **Closed** (Bug) — 社区已给出复现插件与缓解建议，且已有 PR[#7087](https://github.com/agentscope-ai/QwenPaw/pull/7087) 本地化远程媒体劫持处理 |
| 中 | [#7084](https://github.com/agentscope-ai/CoPaw/issues/7084) | 历史对话只有一条时无法打开该会话 | **Open** — 触发边角异常 |

其他今日关闭的 Clarity/复现类低危问题（[#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405)、[#7063](https://github.com/agentscope-ai/QwenPaw/issues/7063)、[#7077](https://github.com/agentscope-ai/QwenPaw/issues/7077)、[#7048](https://github.com/agentscope-ai/QwenPaw/issues/7048)）多数已定位为使用问题或环境问题，均已在协助下关闭或转入跟踪。

---

## 6. 功能请求与路线图信号

从“今日需求池”与“新旧 PR 并发重叠加持”中可以清晰看到 **路由+搜索+记忆** 成为下一阶段重点：

| 需求 Issue | 核心诉求 | 线索/对应 PR |
| --- | --- | --- |
| [#7079](https://github.com/agentscope-ai/QwenPaw/issues/7079) (#7080) | 可插拔 PowerContext 长期记忆接入点 | PR[#7080](https://github.com/agentscope-ai/QwenPaw/pull/7080) 已提交，将进入 `BaseMemoryManager` |
| [#7075](https://github.com/agentscope-ai/QwenPaw/issues/7075) | 增加定时运行任务细粒度可观测记录 | 尚无精准 PR，被沟通中 |
| [#7076](https://github.com/agentscope-ai/QwenPaw/issues/7076) | qwenpaw-creator 模型配置 404 | 缺失用户侧细节（地址、日志）待补 |
| [#7085](https://github.com/agentscope-ai/QwenPaw/issues/7085) | 按渠道独立模型配置 | PR[#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 是目前最接近的候选（provider 层模型路由），但模型持久层尚未应对 Channel 张量 |
| [#7081](https://github.com/agentscope-ai/CoPaw/pull/7081) / [#6817](https://github.com/agentscope-ai/QwenPaw/pull/6817) | AnySearch 搜索引擎接入 | 新 PR 再次验证覆盖了现有 Tavily 默认；若 #6302 合入，两者可能合并统一 |

整体观点是：**Provider 层（路由/模型发现）和 Memory 层是未来两个 sprint 的最佳解，团队大概率会吸收 #6302 + #7080 这两条主线。**

---

## 7. 用户反馈摘要

- **「本地多模态 = 强诉求」**：用户（@xiaoka76）反馈图片 URL 过期后导致的“毒化上下文”必须被遏制，不应在离线端简单落盘；(可解)部分已在 PR#7087 中修复，等待 merge。
- **「新手开箱有踩坑」**：旧 2.0 版本升级后 tool name 强调带 `[mcp-key]__`，用户无法迅速判定命名规则变更（[#6405](https://github.com/agentscope-ai/QwenPaw/issues/6405))，7 条评论佐证了大量完全对照文档操作失败的操作。
- **&ccc会话聚合诉求上升**：多个用户反馈多 Agent 沟通“一次会话一开”造成心智负担（[#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925))，此为主观体验问题但 ORG 重视；新的 `session-scoped multi dir` 在后台逐渐成为支持标定点。
- **优化型用户开心点**：[#7036](https://github.com/agentscope-ai/QwenPaw/pull/7036) Media 下载控件得到多次正向反馈，尤其 UI 焦点与键盘可达性布局调优被点赞。

---

## 8. 待处理积压

以下为长期未被处理但影响较大的事项，提请维护者关注：

| 项目 | 类型 | 来源日期 | 状态描述 |
| --- | --- | --- | --- |
| [#6925](https://github.com/agentscope-ai/QwenPaw/issues/6925) 智能体协作单会话窗口 | Open Issue | 2026-08-12 | 已响应但仍未被 assign；最新仅在 08-17 由用户自嘲“顶上来”，涉及前端交互底层设计 |
| PR [#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) 统一 Provider 发现与路由 | 长期待合入 PR | 2026-07-21 创建 | 关键架构较动环，当前为 Handling，仍有 5 个以上后续补充 PR 依赖其合并 |
| PR  [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) 增加火山引擎/小米 MiMo 内置 Provider | Wait 合并 | 2026-07-28 | 是 2.1.1 可放行小参数（无破坏），这是最适合提前消化低风险等待合并的一个 |

---

> **结论**: 项目健康度总体积极，修复追踪正常推进；Bug 增量与性能修复幅度略有上升。下一版迭代下半路程中仍然要优先收敛 #7011 参与会话隔离事故（事故原因非常清晰明确）与 Pydantic 动态结构初始化框架阻断。今日维护转化效率（关闭率 > 57%）处于高位，期待 2.1.1 的适配与主要能力合并评估。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报
**日期：** 2026-08-18
**数据周期：** 过去 24 小时

---

## 1. 今日速览

**总体评估：** 开发活跃，社区静默，主线明确。

过去24小时内，EasyClaw 项目在社区互动层面较为平静，**无新开/活跃 Issue 与 PR**。但项目方保持了稳定发版节奏，发布了 **v1.8.100** 版本。该版本并非简单的补丁更新，而是对核心商业化路径（达人协作/外联设备）上的功能扩展，表明项目在 **B端工作流打通** 方面正在快速迭代。整体来看，项目健康度良好，处于 **功能性冲刺阶段**，社区反馈相对滞后，建议关注后续用户对新版功能的接受度。

---

## 2. 版本发布：v1.8.100

**链接：** [Releases - v1.8.100](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.100)

- **核心更新：** 扩展 **达人/联盟协作** 工作流。不仅局限于开发者本身，现在支持将 **外联设备**（实体或虚机）绑定至 **商务开发（BD）人员** 名下。这暗示项目正从“个人工具”转向“小团队协作工具”的边界延伸。
- **桌面端支持：** 改进了 **内置桌面端插件** 的支持能力，旨在提升跨设备管理的稳定性。
- **破坏性变更：** 版本说明中 **未提及** 破坏性变更或废弃功能。
- **安装注意事项（macOS）：** 若用户遇到 **"'RivonClaw' is damaged and can't be opened"** 的提示，属于 macOS 对未签名应用的 Gatekeeper 拦截。建议用户执行 `xattr -dr com.apple.quarantine /Applications/RivonClaw.app` 后重新打开，或右击选择"打开"绕过限制。这暗示产品仍处于快速迭代且未完全公证阶段，企业环境下部署需留意相关权限配置。

---

## 3. 项目进展

**动态：** 今日无合并或关闭的 PR，无相关链接。

**宏观项目进度推断：** 虽然今日无代码合并记录，但凭借 **v1.8.100** 的顺利发布，本项目在 **商务工作流（Affiliate）** 与 **设备绑定逻辑** 上完成了版本里程碑。相比上一次迭代，项目核心能力已从单纯的抓取/执行，拓展了**人与设备的绑定关系耦合方向**，这为后续的权限分级管理铺平了道路。

---

## 4. 社区热点

**动态：** 今日无高互动量 Issue/PR，无讨论热点。

**说明：** 今日社区处于静默期。虽然表面上缺少火花，但这在发版前置阶段（通常前端代码冻结，后续负责人集中处理测试）较为常见。现阶段维护者无需处理大量社区噪音，适合专注技术债清理或内部重构。

---

## 5. Bug 与稳定性

**动态：** 今日报告的 Bug 为 0 条，未出现稳定性崩溃反馈。

**监控建议：** 目前构建语义化版本号比较规范（v1.8.x 强于 v1.9.x）。鉴于大量用户需要手工绕行 macOS 的弹窗拦截，建议后续在 docs 或安装说明中强化该问题的解决文章的置顶。

---

## 6. 功能请求与路线图信号

**动态：** 今日无用户提交的功能请求。

**前瞻推测：** 结合 v1.8.100 中对 **“外联设备绑定BD人员”** 的易用性增强，项目方在下一阶段的潜在动作可能集中于：
- **数据看板：** 设备绑定商务此后，必然需要查看跨设备产生的数据归属及贡献度统计。
- **批量操作：** 达人拥有多台设备后，针对该朋友道的群控 或 同步操作 功能需求会自然产生。

---

## 7. 用户反馈摘要

**动态：** 今日无可提取的 Issue 评论；反馈池清空。

**冷启动建议：** 鉴于今日用户无主动互动，项目健康度数据中**反馈回环路**此刻较弱。当前阶段较建议维护者主动开辟 **微信群或 Discord 通道**，将社区热点前置化而不是被动接收 Issue，否则大量“潜在”真实问题可能在遇到问题的一刻直接流向别的替代方案见。

---

## 8. 待处理积压

**当前数据：** 目前没有任何代号为“长期空置”的 Issue 或 PR。（侦测到列表为零风险）

**建议与提示：**
- 但仍需提醒维护者 **关注 releases 页面的代码模块说明”。** 因当前 macOS 的 “RivonClaw” 软件知名度保持稳定更新，但若长期无 GRM 低优先级 Issue 持续累计，说明用户可能对“反馈不如直接换软件”形成极端忍受心态，需警惕用户流失的冰山模型效应。当前并没有失败机制问题显现，短期内风险指数低。

---

**健康度总结：** `高速发版，社区等待`。技术主船的航线没问题，接下来合计寻找机会与社区的导航信号建立链接。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*