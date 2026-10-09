# OpenClaw 生态日报 2026-10-09

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-09 03:32 UTC

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

# OpenClaw 项目动态日报 — 2026-10-09

---

## 1. 今日速览

过去 24 小时项目活跃度极高：共 **500 条 Issue 更新**（新开/活跃 402 条，关闭 98 条）和 **500 条 PR 更新**（待合并 377 条，已合并/关闭 123 条），并发布了 **v2026.9.9** 新版本（185 commits / 112 PRs / 92 位贡献者）。今日焦点集中在 **更新安装失败、Gateway 事件循环阻塞、会话状态与消息丢失** 等 P0/P1 级稳定性问题上，其中多起更新失败类 Issue（#167376、#167181、#164113）已随 v2026.9.9 发布而关闭。社区对 **进程泄漏、Doctor 迁移拒绝、Discord 状态误报** 等问题讨论热情高，版本迭代频率与修复响应速度均属健康水平，但 P0 级未关闭存量较高，仍是当前版本健康度的主要隐患。

---

## 2. 版本发布

### v2026.9.9（2026-10-09 发布）

- **版本号**：v2026.9.9
- **规模**：185 commits · 112 pull requests · 92 contributors
- **发布说明**：[Release notes](https://docs.openclaw.ai/releases/2026.9.9)（文档站，与 changelog 内容一致）

**与历史版本相比的注意点**：

- 今日关闭的 3 个 P0 级更新失败类 Issue 均与 2026.9.8 → 2026.9.9 的升级路径

---

## 横向生态对比

### 1. 生态全景

个人 AI 助手/自主智能体开源生态正处在**规模爆发与稳定性阵痛并存**的关键阶段。头部项目（OpenClaw）保持着极高的迭代频率，验证了生态的活力，但多项目同时暴露的**会话/消息丢失、后台任务失控、provider 兼容性断裂**等问题，说明行业正从"能用"向"可靠"跨越。与此同时，社区对**可观测性（Token 用量）、免打扰的静默后台机制、第三方服务兼容广度**的需求显著上升，标志着用户群体正从早期极客向更广泛的专业与半专业用户渗透。

---

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PRs 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 402，关闭 98） | 500（待合并 377，已合并/关闭 123） | **v2026.9.9**（185 commits/112 PRs） | 迭代极快，但 P0 级未关闭存量较高，稳定性隐患大 |
| **NanoBot** | 5（新开 2，关闭 3） | 27（待合并 14，已合并/关闭 13） | 无 | 高活跃，Responses API 兼容层技术债集中清偿，质量向好 |
| **Zeroclaw** | 17（全部新开/活跃） | 50（待合并 43，已合并/关闭 7） | 无 | 密集迭代，S1 级 Bug 偏多（Telegram 阻塞、内存泄漏），风险较高 |
| **CoPaw** | 29（新开/活跃 17，关闭 12） | 37（待合并 28，合并/关闭 9） | 无 | 高活跃，但严重 Bug 集中（会话丢失、模型 400），稳定性承压 |
| **LobsterAI** | 0 | 20（关闭/合并 14，待合并 6） | 无 | **维护清理日**：2 个主线 PR 合入 + 12 条 stale PR 清理，健康度良好 |
| **IronClaw** | 2 | 2 | 无 | 中等，双线推进（新通道 + 性能优化），但合并节奏偏慢 |
| **NanoClaw** | 1 | 3 | 无 | 中等偏活跃，严重 Bug（#4056）无响应，PR 待审积压 |
| **PicoClaw** | 0 | 2 | 无 | 低-中，两条实用 PR 长期积压（最长 43 天），存在贡献者流失风险 |
| **Moltis** | 2（新开 1，关闭 1） | 0 | 无 | 稳定加固期，安全漏洞（#1177）修复落地，无新积压 |
| **EasyClaw** | 0 | 0 | **v1.9.28**； | 社区静默，但版本稳定迭代，专注 BD 场景功能增强 |
| **TinyClaw / ZeptoClaw** | — | — | — | 无活动 |

---

### 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态的**绝对核心与基础设施层**。其单日 500 条 Issue/PR 流量、v2026.9.9 的 92 位贡献者规模，在对比项目中呈数量级领先（NanoBot 与 CoPaw 日 PR 约 27-37 条）。

- **优势**：版本迭代与问题响应速度极快（P0 更新失败类 Issue 随版本即日关闭）；拥有完善的分级（P0/P1）问题跟踪与发布机制；社区贡献者基数最大。
- **技术路线差异**：与 Zeroclaw（ZeroCode TUI、沙箱安全）和 NanoBot（多 Provider API 兼容层）不同，OpenClaw 更偏向**通用智能体运行时与 Gateway 基础设施**，是生态的"操作系统"层面。
- **核心风险**：P0 级未关闭存量较高（更新失败、事件循环阻塞、会话状态丢失），说明规模扩张速度已开始挑战工程质量上限。其稳定性直接决定了下游生态（如 NanoClaw、PicoClaw、Zeroclaw、CoPaw 等基于 OpenClaw Gateway 的项目）的健康度。

---

### 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话/消息持久化与不丢失** | **OpenClaw**（Issue 集中在会话状态与消息丢失）、**CoPaw**（聊天记录"说没就没了"、流错误导致会话 100% 丢失）、**NanoClaw**（#4056 outbound.db-journal 残留致消息投递永久失败）、**Zeroclaw**（ZeroCode 丢弃 pending 提示/排队消息） | 消息的持久化存储、崩溃自愈与端到端不丢失保障，是用户信任的底线。 |
| **后台任务"免打扰"设计** | **NanoBot**（压缩死循环、双条永久消息刷屏）、**CoPaw**（后台任务占用）、**OpenClaw**（进程泄漏） | 压缩、Dream 合并等后台维护需静默运行，或原地编辑替换通知，不污染活跃会话/频道。 |
| **Provider 兼容性与 API 适配** | **NanoBot**（Responses API 事件路由、序列化、GPT-6 路由）、**PicoClaw**（OpenCode Go provider 新增）、**CoPaw**（DeepSeek 文件块 400 错误）、**Moltis**（第三方 provider 快速接入）、**NanoClaw**（语音转文字的云 API 替代） | 多模型/多服务商的适配层是几乎所有项目共同的深水区，流式事件解析与 SDK 序列化是高频 Bug 源头。 |
| **可观测性与用量透明化** | **LobsterAI**（每轮 Token/Trace ID/缓存命中率/积分展示合入）、**Zeroclaw**（#11613 成本账本少计 hidden tokens）、**OpenClaw**（Gateway 事件循环阻塞需可观测） | 用户与企业对 Token 消耗、成本归因、调用链跟踪的需求从"可选"变为"必备"。 |
| **WebUI 体验精细化** | **NanoBot**（Workspace 选择器、SkillHub 链接）、**PicoClaw**（长对话卡顿）、**Zeroclaw**（TUI 消息丢失、时间戳显示）、**LobsterAI**（结构化 composer、消息书签） | 前端交互从功能实现转向体验打磨（性能、信息密度、操作效率）。 |
| **安全与沙箱边界** | **Zeroclaw**（firejail_args 配置未生效、null 设备豁免）、**LobsterAI**（MCP stdio 命令注入、硬编码导出密码、URL 协议白名单）、**Moltis**（Vault 端点未认证 CWE-306） | 可执行第三方代码/敏感操作的 agent，安全边界正确性是致命问题。 |
| **测试与 CI 工程化** | **NanoBot**（测试时长压缩 30%+）、**CoPaw**（E2E 全面加固、测试提速 41%）、**Zeroclaw**（平台相关 flaky 测试系统清理）、**NanoClaw**（CI 迁至自托管 runner） | 项目规模扩大后，测试稳定性与 CI 成本控制成为工程质量分水岭。 |

---

### 5. 差异化定位分析

| 项目 | 功能侧重 / 目标用户 | 关键架构特征 |
|---|---|---|
| **OpenClaw** | 通用自主智能体框架，面向开发者和高级用户 | Gateway 事件循环、插件化工具链；社区驱动、发布节奏最快 |
| **NanoBot** | 多 Provider 汇聚与统一 API 兼容层，面向需要同时接入多模型的用户 | 深度适配 OpenAI Responses API/Anthropic/Bedrock 等，WebUI 体验持续迭代 |
| **Zeroclaw** | 以 **ZeroCode TUI** 为核心交互的轻量级助手，面向终端爱好者 | 强调沙箱安全（firejail）、插件签名、成本归因，专注 Rust 实现与 daemon 架构 |
| **CoPaw (QwenPaw)** | 多模态全能助手，功能全面（音频/视频/网页浏览/Skill Pool） | 深度绑定 Qwen 生态，Tauri2 桌面端，但聊天记录持久化与运行时回滚存在短板 |
| **LobsterAI** | **Cowork 协作者**与企业级可观测性，面向团队协作与成本敏感用户 | 每轮对话 Token 级追踪、Trace ID 透传；MCP/OpenClaw 安全加固待推进 |
| **NanoClaw** | 多渠道 **Chat SDK 桥接**（Discord/Slack/Teams/Webex/Google Chat）与离线隐私 | 本地 whisper.cpp 语音转文字、Docker 驱动生命周期管理 |
| **IronClaw** | 深度绑定 **NEAR AI** 生态，Loop-Host 运行时优化 | turn-start 工具分类器（省去 tool_search 往返）、iMessage/SMS 短信通道扩展 |
| **PicoClaw** | 轻量级、嵌入式场景的个人助手 | 小体量，跟随上游 Provider 变化；WebUI 性能优化是当前痛点 |
| **Moltis** | **Provider 接入的合规与安全**，面向第三方服务生态 | `moltis-providers` 层设计，Vault 加密存储，近期以安全加固为主 |
| **EasyClaw** | **TK（TikTok）电商 BD 专用工作台**，面向跨境商务运营 | 插件化业务工具（多店铺筛选、Excel 导入导出、差评跟进），非通用 agent |

---

### 6. 社区热度与成熟度

- **第一梯队（快速迭代/高活跃）**：**OpenClaw**（爆发式）、**NanoBot**（密集适配期）、**Zeroclaw**（密集迭代+安全加固）、**CoPaw**（功能迭代快但 Bug 密度高）。特点：PR/Issue 流量大，问题响应快，但伴随较高的稳定性波动。
- **第二梯队（质量巩固/维护期）**：**LobsterAI**（清理历史技术债、主线小幅推进）、**Moltis**（安全修复落地后的稳定观察期）、**EasyClaw**（版本稳定迭代，社区互动静默）。
- **第三梯队（中低活跃/积压风险）**：**IronClaw**（有实质功能推进但合并节奏慢）、**NanoClaw**（贡献输入稳定但维护者响应滞后）、**PicoClaw**（长期无合并，stale PR 风险）。**TinyClaw / ZeptoClaw** 无活动。

---

### 7. 值得关注的趋势信号

1. **"可靠性"已取代"功能"成为第一竞争力**。CoPaw 聊天记录丢失、NanoClaw 消息队列损坏、OpenClaw 会话状态丢失等 P0 问题反复出现，意味着用户对 agent 的信任门槛已从"能做什么"提升到"数据是否会丢"。**持久化、事务性消息、崩溃自愈**是下一个技术标配。

2. **后台自动化需要"静默权"**。NanoBot 的压缩死循环与 Slack 刷屏、OpenClaw 的进程泄漏，指向同一需求：智能体在后台自我维护（压缩、清理、重试）时，必须**不干扰用户、不浪费 API 配额、有自我终止机制**。这是 agent 从"玩具"走向"常驻服务"的必经之路。

3. **Provider 兼容层是最大技术债，也是最大护城河**。NanoBot 单日 13 条 PR 中一半以上在修 Responses API 兼容问题，说明多模型适配的"最后一公里"（流式事件、序列化别名、工具调用路由）极其复杂。**谁能构建最稳健的兼容层，谁就能成为模型生态的汇聚入口**。

4. **可观测性与成本归因正成为企业采纳的前提**。LobsterAI 将 Token/Trace ID 合入主分支，Zeroclaw 修复成本账本少计问题，表明用户（尤其是企业）已不满足于"能用"，而是要求**每轮对话的消耗透明、可审计**。W3C Trace ID 透传可能成为行业标准。

5. **消息通道的"官方化"竞争加剧**。IronClaw 的 iMessage/SMS 扩展、NanoClaw 的多 Chat SDK 桥接、OpenClaw 的 Discord 状态修复，均表明**触达用户的渠道宽度**正成为 agent 平台的核心竞争力。

6. **安全漏洞开始集中于"配置未生效"与"边界未收紧"**。Zeroclaw 的 firejail_args 被静默忽略、LobsterAI 的 MCP stdio 注入、Moltis 的 Vault 未认证端点，均提示：**随着 agent 权限扩大（执行 shell、读写文件、访问密钥库），安全审查必须从"功能实现"前移到"配置声明与运行时一致性"**。

**对开发者的参考价值**：若正在构建 agent 应用，应优先投入**持久化消息存储、后台任务熔断、provider 适配层的回归测试、Token 级可观测性**。这四个方向是当前生态中最集中、最真实的用户痛点，也是拉开产品可靠性差距的关键。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-09

## 今日速览

过去 24 小时项目保持高活跃度：共更新 5 条 Issues（新开 2 条、关闭 3 条）和 27 条 PR（待合并 14 条、已合并/关闭 13 条），**今日无新版本发布**。PR 合并/关闭量显著高于近期均值，且高度集中在 **providers（OpenAI Responses API 兼容性）修复**与 **WebUI 体验改进**两大方向，尤其是 Copilot GPT-6、Codex、OpenCode Go 等模型的路由与序列化问题批量落地。Issues 侧的核心痛点是**后台压缩/维护机制反复触发**，多个用户报告了 API 异常调用和频繁广播通知等问题。整体来看，项目正处于多供应商适配的密集迭代期，社区贡献活跃，但新发布暂时缺失，部分修复尚未随版本放出。

## 项目进展

今日 13 条 PR 被合并/关闭，推进了以下关键方向：

**① Provider 兼容性与稳定性（占比最高）**

- [#6107 fix(providers): prepare inline image batches and recover Codex transport](https://github.com/HKUDS/nanobot/pull/6107) — 大型内联图像批次延迟首响应事件并导致传输超时，已统一在 Responses、Chat Completions、Anthropic Messages、Bedrock Converse 四条路径上做图像预批处理，覆盖 Codex、xAI OAuth、Copilot 等场景
- [#5863](https://github.com/HKUDS/nanobot/pull/5863) / [#5834](https://github.com/HKUDS/nanobot/pull/5834) — 两条 PR 均修复 SSE Responses 消费者忽略 `response.reasoning_text.*` 事件的问题，此前 xAI Grok 与 OpenAI Codex 提供商的推理内容无法通过 raw-SSE 路径正常回调
- [#6051 fix(providers): route Responses tool argument events by item ID](https://github.com/HKUDS/nanobot/pull/6051) — 官方 Responses API 的 `function_call_arguments.delta/.done` 事件携带 `item_id`，而两个流式消费者仅匹配 `call_id`，导致工具调用参数丢失/错配
- [#6020 fix(responses): serialize SDK models using API aliases](https://github.com/HKUDS/nanobot/pull/6020) — 适配 OpenAI SDK 3.8.0 引入的 `ResponseFunctionToolCall.async_` 字段，改用 `by_alias=True` 序列化
- [#5935 fix(copilot): route GPT-6 through Responses](https://github.com/HKUDS/nanobot/pull/5935) — GitHub Copilot 的 GPT-6 模型此前被错误路由到 Chat Completions，现已通过 Responses API 调用
- [#6105](https://github.com/HKUDS/nanobot/pull/6105) / [#5906](https://github.com/HKUDS/nanobot/pull/5906) — 将 OpenCode Go 的 muse-spark 系列模型注册为 `responses_models`，修复 `/chat/completions` 返回 500 导致的 "503 endpoint is unavailable" 错误

**② WebUI 与交互改进**

- [#6089 feat(webui): add a column directory picker and streamline composer actions](https://github.com/HKUDS/nanobot/pull/6089) — 用应用内目录选择器替代原生工作区选择器，并统一 WebUI 组件视觉风格
- [#6102 fix(webui): correct SkillHub skill detail links](https://github.com/HKUDS/nanobot/pull/6102) — 修复 Skills → Discover 中详情页 URL 缺少 `/skills/` 路径段导致的 404

**③ CI 与工程效率**

- [#6101 ci: reduce test runtime while preserving coverage](https://github.com/HKUDS/nanobot/pull/6101) — Windows job 的并行测试耗时 322 秒、串行 CLI 测试另加 101 秒，通过减少冗余构建（如跳过真实 WebUI 安装、避免真实退避等待、缩小临时目录池）显著压缩测试时长

**小结**：Responses API 兼容层的技术债正在快速清偿，尤其是推理流式事件（reasoning_text）、工具调用参数路由、SDK 序列化三个深水区问题在同一天集中修复，说明该模块的回归测试覆盖已趋完善。WebUI 侧的交互打磨也在持续推进，但整体功能增量小于 bug 修复量。

---

## 社区热点

过去 24 小时讨论热度集中在后台压缩/维护机制相关问题上：

- **[#6106 [CLOSED] Compaction firing even on completely empty session + on itself without stopping](https://github.com/HKUDS/nanobot/issues/6106)** — 4 条评论。用户首次安装后仅隔一夜，API 调用量异常激增，压缩循环在空会话上反复触发（默认 15 分钟空闲即触发），形成自我驱动的死循环。该问题已关闭，修复已合入
- **[#5781 [CLOSED] Dream runs for 1–2 h looping on the same read_file calls](https://github.com/HKUDS/nanobot/issues/5781)** — 4 条评论。Dream 合并任务每次运行 25–111 分钟，循环调用同一批 `read_file` 最高达约 200 次，且 `dream.maxIterations` 配置被标记为废弃/忽略。已关闭
- **[#6029 [CLOSED] Allow silent context compaction and suppress channel broadcasts for background idle/dream cycles](https://github.com/HKUDS/nanobot/issues/6029)** — 3 条评论。用户要求在后台维护任务（idleCompact、dream/heartbeat）中支持静默压缩，避免向活跃频道广播压缩状态消息。已关闭
- **[#6084 [OPEN] Slack: compaction notices post as two permanent messages](https://github.com/HKUDS/nanobot/issues/6084)** — 3 条评论。v0.3.5 的 Slack 通道在每次压缩时向会话中发送“Compressing context…”和“Context compacted.”两条永久消息，DM 较多时系统消息刷屏

**诉求分析**：四个最热话题高度同源——**后台自动维护机制缺乏“免打扰”设计**。用户普遍希望上下文压缩、Dream 合并等后台任务以静默方式运行，或至少不污染活跃会话/频道。项目方已在 #5780 中默认静默化压缩通知（尚未随版本发布），并推出 #6110 PR 将 Slack 中的压缩通知原地编辑替换而非新增消息，但由 #6084 仍开放可见，该体验问题尚未在已发布版本中解决。

---

## Bug 与稳定性

| 严重程度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| **高** | [#6106](https://github.com/HKUDS/nanobot/issues/6106) | 压缩在**空会话**上循环触发且自我驱动，一夜产生异常 API 调用量 | 已关闭，修复合入 |
| **高** | [#5781](https://github.com/HKUDS/nanobot/issues/5781) | Dream 任务循环 1–2 小时、最高约 200 次工具调用，`dream.maxIterations` 被废弃/忽略，受全局 200 次上限约束 | 已关闭 |
| **中** | [#6084](https://github.com/HKUDS/nanobot/issues/6084) | Slack 通道每次压缩向会话发送两条永久消息（"Compressing context…" 和 "Context compacted."）| **OPEN**，已有 [#6110](https://github.com/HKUDS/nanobot/pull/6110) 修复 PR |
| **中** | [#6107](https://github.com/HKUDS/nanobot/pull/6107) | 大型内联图像批次延迟首响应事件并引发传输超时（Codex、Copilot 等受影响）| 已合并 |
| **中** | [#6051](https://github.com/HKUDS/nanobot/pull/6051) | Responses API 工具调用参数事件按 `item_id` 路由，旧逻辑仅查 `call_id` 导致参数丢失 | 已合并 |
| **中** | [#6020](https://github.com/HKUDS/nanobot/pull/6020) | OpenAI SDK 3.8.0 序列化缺 `by_alias=True`，导致 `async_` 字段名直传 API | 已合并 |
| **低** | [#6102](https://github.com/HKUDS/nanobot/pull/6102) | SkillHub 详情页链接 404（URL 缺 `/skills/` 路径）| 已合并 |

**稳定性观察**：今日修复的 Bug 大多已闭环，且集中在 provider 层深水区（流式事件解析、参数路由、序列化）。值得关注的是 #6084 作为**唯一仍开放的中等级别问题**，已有对应 PR [#6110](https://github.com/HKUDS/nanobot/pull/6110) 等待合并，Slack 场景的系统消息刷屏问题预计将在下一版本解决。

---

## 功能请求与路线图信号

**新增功能请求（今日新开）**

- [#6111 [enhancement] Workspace picker: drive list, folder creation, and common location shortcuts on Windows](https://github.com/HKUDS/nanobot/issues/6111) — Windows 用户反馈新版工作区选择器缺少盘符列表、新建文件夹能力和常用位置快捷入口。考虑到 [#6089](https://github.com/HKUDS/nanobot/pull/6089)（应用内目录选择器）刚合入，此 issue 是对该功能的直接后续迭代需求，建议维护者将 Windows 场景纳入下一轮 WebUI 完善计划

**已有关联功能的在途 PR（可能进入下一版本）**

- [#6109 feat(agent): optional compactModelPreset for dedicated context-compaction provider](https://github.com/HKUDS/nanobot/pull/6109) — 允许为上下文压缩（Auto Compact、/compact、/new 归档）指定专用模型/提供商；与今日热议的压缩体验问题（#6106/#6029）直接相关，预计会被优先评估
- [#6108 fix(commands): keep slash-prefixed paths in normal chat](https://github.com/HKUDS/nanobot/pull/6108) — 修复 `/tmp`、`/home/user/project` 等绝对路径被误判

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-09

## 1. 今日速览

过去 24 小时项目活跃度处于高位：17 条 Issue 更新（全部为新开或活跃状态）、50 条 PR 更新（其中 43 条待合并，7 条已合并/关闭），无新版本发布。值得关注的是，Issue 侧新增了多个涉及 ZeroCode TUI 消息丢失、Telegram 通道 429 限流处理、以及 daemon 内存泄漏的缺陷报告，其中两条达到 S1（工作流阻塞）级别；PR 侧则以测试稳定性修复与安全策略增强为主，核心功能（如成本归因修复、插件签名工具链、工具库存清单）仍在评审/等待作者更新中。整体来看，项目处于密集迭代期，Bug 报告与测试加固并行推进，但尚无新版本释出。

---

## 2. 版本发布

今日无新版本发布（最新 Release 数据为空）。

---

## 3. 项目进展

今日合并/关闭的 7 条 PR 以测试稳定性、文档规范和一项安全策略修复为主，未涉及大型功能合入，说明项目正处于为下一版本（可能为 v0.8.6）做稳定性铺垫的阶段。

**已合并/关闭的重要 PR：**

- **[#11469] fix(security): recognize the null device on every host**（已关闭，size:M，security:policy 域）
  修复了 `/dev/null` 在 Unix 系统上未被一致豁免的问题。此前 `is_resolved_path_readable`、`is_resolved_path_allowed` 等安全检查对 null 设备的豁免被误加上了 `cfg!(windows)` 门控，导致 Unix 平台上策略解析可能误判。属于安全策略正确性修复。
  链接: https://github.com/zeroclaw-labs/zeroclaw/pull/11469

- **[#11305] docs(tools): record tool tiers and the retained core set**（已关闭，release:v0.8.6）
  为 `tool-inventory.md` 增加“工具层级与保留核心集”章节，为 93 个工具逐一标记层级。这是 #11308 大型工具库存清单功能（仍在待合并列表）的文档前置。
  链接: https://github.com/zeroclaw-labs/zeroclaw/pull/11305

- **[#11090] docs(runtime): propose the runtime composition contract**（已关闭，release:v0.8.6）
  记录了运行时组合 API 及调用方迁移契约，为后续 #11174 的设计落地提供了文档化基础（依赖 #11092 已合并并获 Core Team 批准）。
  链接: https://github.com/zeroclaw-labs/zeroclaw/pull/11090

- 测试稳定性修复 4 条：**[#11349]**（daemon RPC drain 测试重新持有 broadcast-hook 锁）、**[#11395]**（在 prompt-against-500 分发测试中跳过 provider 重试）、**[#11380]**（skill 创建者缓存时间戳改为确定性设置）、**[#11396]**（macOS 上 pipe-holder 测试计时改为基于 fixture 返回值）。这些合并标志着对平台相关 flaky 测试的系统性清理。
  链接: https://github.com/zeroclaw-labs/zeroclaw/pull/11349 | https://github.com/zeroclaw-labs/zeroclaw/pull/11395 | https://github.com/zeroclaw-labs/zeroclaw/pull/11380 | https://github.com/zeroclaw-labs/zeroclaw/pull/11396

**仍待合并的中大型功能（今日有更新）：**

- **[#11308] feat(tools): typed built-in tool inventory with tier ratchets**（size:XL, release:v0.8.6）：构建工具层级约束机制，与已合入的 #11305 相衔接。
- **[#11535] fix(agent): restore cost attribution in AgentEnd usage annotations**（size:M）：修复 `AgentEnd` 观测守卫丢失累计成本的问题。
- **[#11310] feat(plugins): sign a manifest document in one step**（size:L）：一键签名 manifest 文档。
- **[#11265] feat(cli): zeroclaw user commands for roster password lifecycle**（size:XL，标记 do-not-merge）：用户密码生命周期管理命令，依赖 #11264 和 #11313。

---

## 4. 社区热点

今日讨论最活跃的 Issue 集中反映了社区对**项目治理透明度**和**安全/限流行为**的高关注度：

**1) #8692 — [Tracker]: Maintainer decision queue for RFCs and design issues（15 条评论）**
提出建立维护者决策队列，作为 RFC、设计问题、发布策略问题的活跃 issue 级决策跟踪器。这是社区对项目治理透明化的明确信号，表明当前存在大量需要维护者裁决的 design-level 事项。
链接: https://github.com/zeroclaw-labs/zeroclaw/issues/8692

**2) #9887 — Downscale oversized images instead of dropping them（5 条评论）**
呼吁将超过 `multimodal.max_image_size_mb`（默认 5 MiB）的图像进行缩小而非直接拒绝，并允许通过 0 值禁用多模态限制。评论集中在 refuse 策略对真实用户的影响上，属于高频痛点。
链接: https://github.com/zeroclaw-labs/zeroclaw/issues/9887

**3) #11594 — firejail_args 被广告但从未生效（3 条评论）**
一个 S2 级别的配置/沙箱缺陷：`firejail_args` 在 schema 和文档中已暴露，但运行时从未将其传递给 firejail 调用。涉及 `crates/zeroclaw-runtime` 的沙箱实现，社区关注度高，因为这意味着部分用户的安全配置实际未生效。
链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11594

**4) #9592 — probe the saved provider alias after model-routing updates（3 条评论）**
`model_routing_config` 更新了 provider alias 后，probe 仍在用预更新快照中的凭据，导致探测结果与真实状态不一致。属 S2 降级行为。
链接: https://github.com/zeroclaw-labs/zeroclaw/issues/9592

**5) #11586 — ZeroCode sidebar turns failed sessions green after daemon restart（3 条评论）**
daemon 重启后 ZeroCode 侧边栏把所有会话显示为绿色“ready”，包括之前失败的红点会话。用户体验问题，S3 级别。
链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11586

---

## 5. Bug 与稳定性

过去 24 小时新增/活跃的 Bug 按严重程度排列如下：

**🔴 S1 — 工作流阻塞：**

- **[#10863] Telegram retries rejected voice updates indefinitely, blocking later messages**
  Telegram 通道对被拒绝的语音更新无限重试，阻塞后续消息投递。社区用户 RO-mix 报告了生产事故（详见 PR #10640 评论）。尚无对应 fix PR。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/10863

- **[#11615] Telegram send path ignores 429 retry_after**
  Telegram 返回 429 限流时，发送路径忽略 `retry_after` 立即重试，导致限流持续加剧，回复可能完全丢失。S1 阻塞级别，尚无 fix PR。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11615

- **[#11614] map_key_sections leaks schema paths on every call**
  `Configurable::map_key_sections()` 在每次调用时通过 `Box::leak` 永久泄漏字符串内存，daemon 内存随时间持续增长。S1 阻塞级别（长期运行稳定性），尚无 fix PR。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11614

**🟠 S2 — 降级行为：**

- **[#11594] firejail_args advertised but never applied**（见上文“社区热点”）
  配置项被静默忽略，安全沙箱参数完全不生效。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11594

- **[#9592] probe the saved provider alias after model-routing updates**
  更新 provider alias 后，probe 仍用旧的运行时快照凭据，导致工具探测结果错误。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/9592

**🟡 S3 — 次要 / 体验问题：**

- **[#11586] ZeroCode sidebar turns failed sessions green after daemon restarts**
  重启后失败会话被错误显示为就绪状态。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11586

**其他今日新报告 Bug（严重程度待评估）：**

- **[#11623] ZeroCode drops a pending ask_user prompt without replying**
  前端清除了待处理的 ask_user 提示但未通知 daemon，工具等待 600 秒后超时失败。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11623

- **[#11618] ZeroCode drops a queued message when daemon refuses as SESSION_BUSY**
  另一连接占用 session 时，ZeroCode 面板静默丢弃排队消息。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11618

- **[#11612] Re-running an already-approved shell command aborts the agent loop**
  DefuzeX 团队（KUMA 安全测试 SDK）报告：监督模式下，同一轮中重复执行已批准的 shell 命令会触发“repeated prompt-required tool call”保护并终止 ACP 会话。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11612

- **[#11613] Cost ledger drops provider's `total_tokens`**
  对 OpenAI 兼容 provider（如 Gemini），若 usage 只在 `total_tokens` 中报告隐藏推理 token，成本账本会重新计算而非采用 provider 的 total，导致用量被低估。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11613

---

## 6. 功能请求与路线图信号

今日新增/活跃的功能请求及路线图信号：

- **[#11620] Show message times in the ZeroCode transcript**（新增，0 评论）
  ZeroCode 会话记录缺少消息时间戳，多事件并发时无法判断先后顺序。**已有配套 PR #11622（feat(zerocode): show message times in the transcript，size:L）**，实现格式化如 `HH:MM` 或跨天时显示完整日期。该功能极有可能进入下一版本。
  链接: https://github.com/zeroclaw-labs/zeroclaw/issues/11620 | https://github.com/zeroclaw-labs/zeroclaw/pull/11622

- **[#11626] Suppress repeated plugin egress refusal records per instance and host**（新增，0 评论）
  同一插件反复尝试被拒绝的目标地址

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-10-09

## 1. 今日速览

过去 24 小时内，PicoClaw 未出现新的 Issue 或版本发布，社区反馈层面较为平静。两条 Pull Request 在 10 月 8 日有活跃更新，但均仍为待合并状态，表明项目处于「功能开发推进中、合并节奏偏缓」的阶段。值得关注的是，其中一条 PR 涉及新增 provider 支持，另一条修复了 Web UI 卡顿问题，两者都直接关系到用户可感知的体验优化。整体活跃度中等偏低，维护者需留意两条 PR 的长期积压趋势。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

过去 24 小时无 PR 被合并或关闭，因此没有已落地的功能推进。不过，两条处于待合并状态的 PR 持续有更新，反映了项目在两个方向上的实质进展：

- **新增 OpenCode Go provider**（#3371）：为 PicoClaw 增加对 `https://opencode.ai/zen/go/v1` 的专用支持，并根据模型 ID 自动路由到正确的端点家族，同时发送 `x-opencode-session` 会话头。这一改动将补齐 PicoClaw 对 OpenCode Go 服务的兼容能力。
- **修复 Web UI 卡顿**（#3347）：针对聊天区域文本量较大时界面响应迟缓的问题进行了修复，作者已在桌面端和移动端（Brave 浏览器）完成验证。

虽然这两项改动尚未合并，但若合并，将分别带来「服务兼容性扩展」与「核心交互体验优化」两方面的用户可感知提升。

## 4. 社区热点

今日没有评论数或反应数特别突出的 Issue/PR，仅有的两个活跃 PR 是社区当前关注的焦点：

- **#3371 feat(providers): add opencode-go provider with session header support**  
  https://github.com/sipeed/picoclaw/pull/3371  
  背后诉求：部分用户依赖 OpenCode Go 作为模型后端，PicoClaw 需要持续跟进第三方服务的接口变化，确保不会因上游调整而无法使用。

- **#3347 [stale] fix laggy interface**  
  https://github.com/sipeed/picoclaw/pull/3347  
  背后诉求：Web UI 在长对话场景下卡顿是直接影响日常使用的体验问题，社区希望官方尽快响应并合入修复。

## 5. Bug 与稳定性

今日无新报告的 Bug。当前唯一的稳定性相关 PR 是：

- **[中] Web UI 文本量增大时界面卡顿** — #3347 提供了修复，作者在桌面端和移动端均完成验证，问题定位为前端渲染/更新逻辑效率不足。该 PR 已带有 `[stale]` 标签，建议维护者优先评审。  
  https://github.com/sipeed/picoclaw/pull/3347

## 6. 功能请求与路线图信号

- **OpenCode Go 专用 provider**（#3371）是一个明确的功能扩展信号。它意味着用户希望 PicoClaw 能适配更多第三方模型服务，并且对「会话级 header 传递」有实际需求。考虑到该 PR 的实现已经完成且逻辑清晰，有望被纳入下一版本。  
  https://github.com/sipeed/picoclaw/pull/3371

- 基于该 PR 中「按模型 ID 自动路由到端点家族」的设计，可以推测后续可能继续扩展对其他 provider 的同类自动路由能力。

## 7. 用户反馈摘要

- **Web UI 性能是真实痛点**：#3347 的作者直接描述了「聊天区域有大量文本时界面卡顿」的使用场景，并提到自己在桌面和移动浏览器上均遇到此问题，修复后体验明显改善。这提示长对话场景下的渲染性能是用户高频触达的核心体验问题。  
  https://github.com/sipeed/picoclaw/pull/3347

- **第三方服务兼容性需求现实存在**：#3371 的出现说明有用户正在使用 OpenCode Go 并希望 PicoClaw 保持兼容，且需要将对话上下文（session 信息）传递给模型服务，否则会影响多轮会话的连续性。  
  https://github.com/sipeed/picoclaw/pull/3371

## 8. 待处理积压

- **#3347 [stale] fix laggy interface** — 创建于 2026-08-27，已持续 43 天，且被标记为 `[stale]`。该 PR 直击重要的 UI 性能问题，长时间未合并可能导致维护者遗忘或贡献者流失。  
  https://github.com/sipeed/picoclaw/pull/3347

- **#3371 feat(providers): add opencode-go provider with session header support** — 创建于 2026-09-08，已持续 31 天。虽然功能实现完整，但长期未合并会延迟用户对 OpenCode Go 的支持时间，也可能令贡献者对项目响应速度产生疑虑。  
  https://github.com/sipeed/picoclaw/pull/3371

> 建议维护者优先评估这两条 PR，尤其是带 `[stale]` 标签的 #3347，避免因超期自动关闭而丢失有效的修复工作。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-09

## 1. 今日速览

今日项目活跃度中等偏活跃：过去 24 小时内有 1 个新 Issue 提交，3 个 PR 有更新，其中 1 个长周期 PR（#2459）已关闭，2 个新 PR 处于待合并状态，另有 1 个严重 Bug（#4056）被报告且暂无修复方案。无新版本发布。整体来看，社区贡献保持稳定输入，但维护者的响应速度有待观察，部分 PR 需要尽快安排评审。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日合并/关闭了 1 个 PR，另有 2 个 PR 待审查合并：

- **[已关闭] #2459 feat(skill): add /add-voice-transcription-chat-sdk** — 由 @mtichikawa 提交，为 Discord 及其他 Chat SDK 桥接渠道（Slack、Teams、Webex、Google Chat 等）增加可选语音转文字能力，通过本地 whisper.cpp 实现完全离线处理，不依赖云 API。该 PR 于 2026-05-13 创建，2026-10-08 关闭，周期较长，需关注关闭原因是合并还是放弃。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/2459

- **[待合并] #4058 ci: move all jobs to namespace-profile-paradixe** — @paradixe 将全部 GitHub Actions 任务迁移至 `namespace-profile-paradixe` 标签，符合创始人 2026-10-08 批准的规则（禁止使用 GitHub 托管 runner），属于基础设施规范落地。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/4058

- **[待合并] #4057 fix(docker-driver): wait out in-flight --rm auto-removal on stop** — @musashinm 修复 DockerHandle.stop() 在容器以 `--rm` 模式创建时，Docker 自动移除尚未完成导致误报 teardown 失败的问题。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/4057

---

## 4. 社区热点

今日 Issue/PR 的评论数据有限（均未记录评论数），互动热度总体不高，但以下条目值得关注：

- **[新开 Issue] #4056 outbound.db-journal 残留导致只读轮询永久失败** — 当前唯一的活跃 Issue，描述了一个在宿主机/VM 重启后可稳定复现的严重故障场景，虽暂无评论，但问题本身具有较高影响力和讨论价值。
  - 🔗 https://github.com/nanocoai/nanoclaw/issues/4056

- **[长生命周期 PR] #2459 语音转文字技能** — 从 5 月延续至今才关闭，尽管评论不多，但持续近 5 个月的项目周期本身说明功能设计经过了较长的推敲和多轮审查，属于社区持续关注的功能方向。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/2459

---

## 5. Bug 与稳定性

今日报告 1 个 Bug，严重程度较高，暂无对应修复 PR：

- **[严重] #4056 容器写入中途宿主机关机后，残留的 outbound.db-journal 永远不会被恢复** — 由于该数据库在容器重新创建之前不会被重新以读写模式打开，宿主机在只读模式下执行的投递轮询将永久以 `SQLITE_READONLY` 失败。该问题影响消息投递链路的持久性和恢复能力，在主机意外宕机场景下会造成功能持续不可用。需要尽快评估修复方案（如启动时主动检测并恢复 journal 或重新挂载读写）。
  - 🔗 https://github.com/nanocoai/nanoclaw/issues/4056

---

## 6. 功能请求与路线图信号

今日无用户新增功能请求，但关闭的 PR 和待合并 PR 提供了明确的路线图信号：

- **离线语音转文字能力已被纳入项目技能体系**：#2459 提供本地 whisper.cpp 方案，与 @ira-at-work 的 #2317（free-whisper）形成互补，可覆盖 Discord、Slack、Teams、Webex、Google Chat 等多个渠道。该方向若被正式合并，将增强 NanoClaw 在隐私敏感场景下的竞争力。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/2459

- **Docker 驱动的生命周期稳定性改进**：#4057 虽为修复，但也意味着容器生命周期管理的健壮性正在被加强，后续版本对 `--rm` 容器场景的支持会更可靠。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/4057

- **CI 基础设施规范化**：#4058 将 CI 作业全部迁移到 `namespace-profile-paradixe`，属于项目工程化治理的一部分，长期来看将提升构建环境的一致性和可重复性。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/4058

---

## 7. 用户反馈摘要

今日评论数据有限，主要从 Issue #4056 的问题描述中提炼用户痛点：

- **宿主机/VM 意外重启导致消息投递持续失败**：用户反馈当容器写入 `outbound.db` 过程中发生主机掉电时，系统没有自愈机制。重新开机后，只读轮询路径中 SQLite 不断返回 `SQLITE_READONLY`，无法自动退出该状态，造成消息投递功能长时间静默失效。这一场景直指项目在异常恢复能力上的不足，用户期待系统能自动识别并清理残留 journal 或自行恢复读写模式。
  - 🔗 https://github.com/nanocoai/nanoclaw/issues/4056

- 其余 PR/Issue 尚无足够的评论内容可供反馈提炼，建议关注后续讨论动态。

---

## 8. 待处理积压

以下事项需要维护者关注和响应：

- **[新 Issue 待响应] #4056** — 严重 Bug，截止今日暂无维护者回复或 fix PR，建议尽快标记并分配负责人。
  - 🔗 https://github.com/nanocoai/nanoclaw/issues/4056

- **[待合并 PR] #4058（CI 迁移）** — 已有多位贡献者推进，建议维护者尽快确认是否符合既定规范并合并，避免 CI 配置长期偏离政策。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/4058

- **[待合并 PR] #4057（Docker --rm 修复）** — 直接影响容器停止流程的稳定性，建议优先审查。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/4057

- **[长周期 PR 结果待确认] #2459** — 该 PR 标记为 CLOSED 但未明确是合并还是关闭，若已合并需更新文档和技能列表；若关闭则需说明原因，避免贡献者困惑。
  - 🔗 https://github.com/nanocoai/nanoclaw/pull/2459

---

## 项目健康度总结

NanoClaw 今日社区活跃度温和，有实质性的功能与基础设施贡献涌入，但存在两个需要警惕的信号：一是严重 Bug（#4056）尚未获得维护者响应，二是待合并 PR 数量在增加（当前 2 个）。建议维护团队优先响应 Bug 报告、及时推进 PR 评审，保持项目迭代节奏的良性循环。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 · 2026-10-09

## 1. 今日速览

过去 24 小时内，IronClaw 共产生 2 条新 Issue、2 条活跃 PR，无新版本发布，亦无 PR 被合并或关闭。整体活跃度处于**中等水平**，且集中在**功能推进与质量追踪**两条线上：一方面有外部贡献者（@lookevink）同时提交了 Sendblue 扩展的实现 PR 与提案 Issue，形成“代码+需求”联动；另一方面内部自动化 bot（@pranavraja99）持续发布每日失败分类报告。两条活跃 PR 均已更新至 10 月 8 日，说明评审或迭代仍在进行中，但截止本日报发布时均未合入主干，合并节奏偏慢值得留意。

## 2. 版本发布

过去 24 小时内无新版本发布，故省略。

## 3. 项目进展

今日无 PR 被合并或关闭，但以下两个活跃 PR 值得跟进：

- **[#8119] feat(loop-host): opt-in turn-start tool selection with a Jev classifier**  
  作者：@CjS77 | 更新：2026-10-08 | [链接](https://github.com/nearai/ironclaw/pull/8119)  
  该 PR 为 loop-host 增加了可选的轮次开始工具选择机制：在对话首次模型调用前，由分类器预选出可能需要的延迟工具，并随核心工具一并提供给模型，从而省去一次 `tool_search` 往返。这是一个面向**降低延迟与交互轮次**的优化，标签为 `size: XL, risk: medium, scope: docs, scope: dependencies, contributor: new`，自 9 月 29 日创建以来已 10 天未合并，建议维护者加速 review。

- **[#8127] feat: add Sendblue iMessage and SMS extension**  
  作者：@lookevink | 更新：2026-10-08 | [链接](https://github.com/nearai/ironclaw/pull/8127)  
  该 PR 引入一个内置的 Sendblue 扩展，支持通过 iMessage/SMS 进行对话：包括手机号绑定、认证后的接收 webhook、终端回复以及会话目标存储。设计上保持了宿主对 API 凭据的托管权限，采用声明式、有界添加。此 PR 从功能完整度和安全边界看均已较为成熟，但同样停留在开放状态。

综合来看，当前项目正处于**“新通道能力集成”+“运行时性能优化”**双线并进的阶段，但合入节奏有待提速。

## 4. 社区热点

本期所有 Issue/PR 的评论数均为 0（PR 评论数据缺失），因此没有传统意义上的“热议”条目。但从议题存在感与动作联动来看，最值得关注的是：

- **[#8130] Proposal: optional Sendblue iMessage/SMS extension with host-owned credentials**  
  （[@lookevink](https://github.com/nearai/ironclaw/issues/8130)）  
  该 Issue 由 PR #8127 的作者在同一天提出，形成提案与实现互证的组合。核心诉求是：让 IronClaw 能通过 iMessage/SMS 直接触达用户，同时强调凭据必须由宿主（host）持有，保证安全边界。这说明外部贡献者正在有意识地推动**新消息通道的官方化**，而不仅仅是做一次性集成。

这是一个清晰的信号：**Messaging 通道（尤其 iMessage/短信）正被社区视为下一阶段的关键交互入口**。

## 5. Bug 与稳定性

- **[#8129] Daily ironclaw failure taxonomy — 2026-10-08**  
  创建：2026-10-08 | 评论：0 | [链接](https://github.com/nearai/ironclaw/issues/8129)  
  该 Issue 是自动化生成的每日失败分类报告。本次分析覆盖 `officeqa` 基准集，25 个非通过任务被判定为**模型自身质量问题**为主，报告中点名 DeepSeek-V4-Flash 在导航和执行上存在缺陷。  
  **严重程度**：中（属于基准质量跟踪，未发现代码级回归或崩溃）。  
  **状态**：无关联 fix PR，目前仅作趋势记录，不构成紧急处理项。

今日无新的崩溃、内存泄漏或回归类 Bug 报告，稳定性表面良好，但深层模型质量仍是主要风险源。

## 6. 功能请求与路线图信号

- **Sendblue iMessage/SMS 扩展（#8130 + #8127）**  
  提案与 PR 同步出现，且已具备完整设计——phone pairing、webhook、回复路径、凭据托管。结合 IronClaw 现有对话生命周期，这一功能极有可能被纳入下一个版本的候选范围。若被采纳，将显著扩展 IronClaw 的触达面至短信/iMessage 用户。

- **turn-start tool selection（#8119）**  
  这是一个 opt-in 性能优化项，不破坏现有行为，后台可逐步灰度。鉴于其降低交互延迟的价值，有望在完成 review 后进入主线。

两者均未标记为“仅讨论”，说明社区贡献者更倾向于直接提交可评审的代码来推动路线图，这是项目健康度的正面信号。

## 7. 用户反馈摘要

本期所有 Issues 均无评论，无法从评论中提炼直接的痛点反馈。基于 Issue/PR 描述可做的合理推断是：

- **用户场景**：@lookevink 在 #8130 中明确表达了对短信/iMessage 原生接入的期望，使用场景是“通过现有对话/回复生命周期直接管理短信渠道”。
- **安全关切**：该提案特别强调凭据归宿主所有、只允许授权手机号入站，反映用户对第三方服务凭据安全性的敏感。
- **体验诉求**：PR #8119 的出发点是减少工具发现的额外交互轮次，暗示部分用户对多轮工具检索的时延/体验不满意。

由于缺乏评论数据，以上属于对提交者意图的忠实转述，而非社区普遍共识，待后续评论出现后可进一步验证。

## 8. 待处理积压

- **[#8119] PR：turn-start tool selection（创建 2026-09-29，10 天未合并）**  
  [链接](https://github.com/nearai/ironclaw/pull/8119)  
  标签为 `size: XL, risk: medium, contributor: new`，且涉及 docs 与 dependencies 两个 scope，属于需要重点 review 的大改动。10 天未合并且无可见的 review 评论（评论数据缺失），建议维护者尽快安排 reviewer 或作者主动 ping，避免新贡献者因等待过久流失。

- **[#8127] PR：Sendblue 扩展（创建 2026-10-06，3 天未合并）**  
  [链接](https://github.com/nearai/ironclaw/pull/8127)  
  同步配套 Issue #8130 也已提交，但双方评论均为 0。建议维护者整合处理，形成“一个功能、一个评审闭环”。

- **基准失败追踪的自动化延续（#8129）**  
  该 Issue 序列由自动化 bot 每日生成，但缺少后续动作（如自动关联修复 PR 或标记阻塞项）。长期来看，建议将失败分类报告与 issue 追踪打通，避免沦为单向信息流。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-09

## 1. 今日速览

过去 24 小时项目无新 issue 和版本发布，但 PR 更新达 20 条（14 条关闭/合并，6 条待合并），属于典型的"维护清理日"。当日合并的 2 个主线 PR（#2815、#2814）均指向核心体验修复：前者修复库监视器在目录删除后持续报 ENOENT 的持久性错误，后者为 Cowork 对话补全 Token 用量透明化能力。与此同时，项目方集中关闭了大批 3 月底以来积压的 stale PR，其中多数已合入或过时，说明维护团队正在积极清理历史技术债。整体活跃度中等偏上，项目健康度良好，主分支推进节奏稳健。

---

## 2. 项目进展

今日真正意义上"新"的合并/关闭 PR 集中在 2 个主线改动（其余 12 个关闭的 PR 均为 2026 年 3 月的 stale 批量清理，非新增合入）。此外，大量历史 stale PR 被关闭是今日最重要的事务性进展——它意味着仓库正在收敛积压，减少“僵尸 PR”对开发者的干扰。

### 主线合并（重要）

**#2815 [已合并/关闭] fix(library): skip deleted artifact dirs when watching and purge expired missing items**  
链接：https://github.com/netease-youdao/LobsterAI/pull/2815  

- 核心解决：每次启动时，针对每个已删除文件夹的索引目录，都会打印 `[Library] Unable to watch an indexed artifact directory. Error: Directory watcher setup failed (ENOENT)` 及堆栈（上报者机器上出现 53 次），且该错误永不消失。  
- 修复方案：跳过已删除的目录监视，并清理过期缺失的项目。  
- 意义：消除高频噪音错误日志，提升 Library 模块在用户删除文件夹后的健壮性。这是一项明确的稳定性修复，直接改善用户开机体验和日志可读性。

**#2814 [已合并/关闭] feat(cowork): trace LLM requests and show per-turn usage**  
链接：https://github.com/netease-youdao/LobsterAI/pull/2814  

- 核心解决：Cowork 每轮对话后展示实际积分（Token）消耗，支持查看模型请求、Token、缓存命中率及 Trace ID 明细。  
- 技术实现：为每轮对话生成并持久化 W3C Trace ID，通过 OpenClaw `chat.send` 与本地模型代理传递 `traceparent`，并补充版本限定的 OpenClaw Gateway Client 补丁。  
- 意义：将可观测性下沉到每轮对话，用户可清晰看到每次 AI 交互的资源消耗，并为后续的用量审计、成本控制提供了数据基础。这是 Cowork 模块企业级能力的重要补充。

### Stale PR 批量清理（共 12 条）

涉及 #547、#566、#599、#603、#647、#649、#697、#749、#762、#768、#788、#790，均为 2026 年 3 月创建、今日被标记为 stale 后关闭。其中如 #547（35 个单元测试）、#603（斜杠命令唤起技能选择）、#697（消息回滚与重新生成）、#762（API 格式自动检测）等 PR 功能本身有一定价值，可能已通过其他 PR 合入或不再适用于当前代码基，建议维护者后续发布 changelog 时明确说明这些功能的去向，避免贡献者困惑。

---

## 3. 社区热点

今日无新 issue，无评论数据，但以下 PR 因主题重要性和状态变化值得关注：

**#2814 — 每轮 Token 用量展示**  
链接：https://github.com/netease-youdao/LobsterAI/pull/2814  
背后诉求：用户希望对自己在 AI 对话中的花费和资源消耗有清晰认知，特别是企业用户对成本核算的需求明确。此 PR 合并意味着该需求已正式落地。

**#2815 — 删除目录后的错误噪音**  
链接：https://github.com/netease-youdao/LobsterAI/pull/2815  
背后诉求：用户对启动时大量重复错误日志的容忍度极低，此类问题虽不影响功能，但严重影响信任度和专业感。修复后 Library 模块的日志将更干净。

**#2590 [开放] fix(security): harden MCP stdio command and external URL boundaries**  
链接：https://github.com/netease-youdao/LobsterAI/pull/2590  
创建于 2026-09-01，至今仍未合并。安全问题通常具有最高讨论优先级，但此 PR 已 stale 一个多月。涉及 MCP stdio 命令的 shell 元字符校验和外部 URL 协议白名单，对执行第三方代码的应用来说这是基石级安全加固，建议维护者优先安排评审。

---

## 4. Bug 与稳定性

今日无新 issue 报告 Bug，以下为当前已知的问题状态：

### 中高严重度（有修复 PR）

**Library 目录删除后监视器持续报错**（#2815 已修复）  
- 现象：启动时每个已删除的索引目录输出一条带堆栈的 ENOENT 错误；上报者机器上出现 53 次，且不会自动消失。  
- 影响：日志污染 + 用户困惑 + 潜在性能开销（多次尝试监视不存在的路径）。  
- 修复：已合并 #2815，跳过已删除目录并清理过期缺失项。

### 中低严重度（stale PR 修复过的问题，供回归参考）

| 问题 | 修复 PR | 状态 |
|---|---|---|
| 自定义模型测试连接误报失败（GLM-4.7，stream 解析问题） | #599 | stale 关闭 |
| continueSession 非引擎错误时重复系统错误消息 | #647 | stale 关闭 |
| SQLite → OpenClaw 迁移时重复创建定时任务 | #788 | stale 关闭 |
| 硬编码导出密码导致源码可解密 API Key | #790 | stale 关闭 |
| MCP stdio 命令未校验 shell 元字符、URL 无协议白名单 | #2590 | 开放待审 |

**建议**：#2590 是当前唯一悬而未决的安全修复 PR，强烈建议维护团队将其从 stale 状态中唤醒并安排评审。该项目可执行第三方代码，shell 注入边界不收紧迟早出问题。

---

## 5. 功能请求与路线图信号

无新 Issue 提交，但以下 PR 透露了社区对产品方向的期待：

**可观测性与用量透明化（已确认路线）**  
- #2814 已合入：每轮对话的 Token、Trace ID、缓存命中率将展示给用户。  
- #768（stale 关闭）：Opik 可观测性集成（OpenClaw 插件）——虽然 stale 关闭，但 #2814 表明官方选择以更轻量的方式实现用量展示，Opik 方案是否仍会以插件形式回归值得关注。

**输入体验重构（待合并，信号明确）**  
- #610（OPEN）：将 Cowork 输入框重构成结构化 composer，支持 `@` 资源引用和 `/` 技能命令的上下文内完成，对标 Cursor 的输入体验。  
- #603（stale 关闭）：斜杠命令唤起技能选择弹窗（与此方向有部分重叠），可能已被 #610 的更大范围重构吸收。  
- #725（OPEN）：消息书签/收藏系统 + 全局书签视图，两级架构设计，解决长对话中关键消息难以回溯的痛点。  
- #736、#749（perf）：流式输出时 Markdown 解析和消息组件的重复渲染优化，是长对话场景的性能前置条件。

**执行模式与多模态支持（配置灵活性）**  
- #738（OPEN）：修复执行模式从配置读取而非硬编码 `local`，恢复 `local/auto/sandbox` 映射。这直接影响 OpenClaw 沙箱策略，是 MCP/OpenClaw 安全边界的组成部分。

**路线图信号汇总**：  
1. 输入框向结构化 composer 演进（#610 为核心）；  
2. 用量可观测性已落地（#2814），后续可能扩展为全链路追踪；  
3. 消息书签系统是社区明确诉求（#725），但已积压多月，是否进入近期规划待确认；  
4. 安全加固（#2590、#738）应作为优先项处理。

---

## 6. 用户反馈摘要

无新 Issue 评论数据，以下反馈来自 PR 描述中反映的原始场景：

**痛点 1：启动时大量无意义错误日志**（#2815）  
> "Every startup logged `[Library] Unable to watch an indexed artifact directory. Error: Directory watcher setup failed (ENOENT)` with a stack trace once per tracked Library item whose folder had been deleted (53 times on the reporter's machine), and it never went away."  

用户对重复、不可恢复的错误日志耐心极低，这类问题会直接削弱用户对软件稳定性的信心。已通过 #2815 修复。

**痛点 2：模型配置技术门槛高、误报多**（#599）  
> "帮同事配 GLM-4.7 的时候碰到 #592 的问题，测试连接显示失败但实际聊天没问题…… 没加 `stream: false`，智谱默认返回 SSE 流式响应，解析格式对不上就直接判失败了。有时候返回 429 限频，说明认证连接都没问题，但是被当成失败了。"  

非技术用户在配置模型时依赖"测试连接"按钮的反馈，误报会让用户卡在配置阶段。此现象指向一个深层问题：API 兼容层的协议适配需要更强的容错和自动探测能力。#762（API 格式自动检测）正是针对这一痛点的社区方案，可惜已 stale。

**痛点 3：导出密码硬编码**（#790）  
> "Remove the hardcoded `EXPORT_PASSWORD` constant (`lobsterai-APP`) from source code, which allowed anyone reading the source to decrypt exported API keys."  

安全敏感型用户对源码中的硬编码凭据零容忍，此问题已修复（stale 关闭）。用户现在必须自己设置导出密码，避免了一键解密的风险。

---

## 7. 待处理积压

以下 PR 长期未合并或未关闭，建议维护者优先处理。按优先级排序：

**P0 — 安全**

- [#2590 [OPEN] fix(security): harden MCP stdio command and external URL boundaries](https://github.com/netease-youdao/LobsterAI/pull/2590)  
  创建于 2026-09-01，最后更新 2026-10-08，已 stale。MCP stdio 命令未做 shell 防注入校验，外部 URL 无协议白名单，涉及执行第三方代码的安全边界，是当前仓库最大的已知安全敞口。建议尽快安排评审。

**P1 — 功能价值高、积压久**

- [#610 [OPEN] feat(cowork): refactor prompt input with structured composer](https://github.com/netease-youdao/LobsterAI/pull/610)  
  创建于 2026-03-21，已 stale。将输入框重构成结构化 composer，是提升 Cowork 核心体验的关键改动，但跨度大、改动面广，可能需要拆分后渐进合入。

- [#725 [OPEN] feat(cowork): 消息书签/收藏系统 + 全局书签视图](https://github.com/netease-youdao/LobsterAI/pull/725)  
  创建于 2026-03-23，已 stale。完整的书签/收藏系统，两级架构，社区呼声明确，适合作为 Cowork 消息管理的重要补充。

- [#547 [OPEN] test: add coworkFormatTransform unit tests (35 cases)](https://github.com/netease-youdao/LobsterAI/pull/547)  
  创建于 2026-03-20，已 stale。35 个单元测试覆盖核心格式化模块，对提升项目测试密度有价值，建议主动与作者沟通并合入。

**P2 — 性能与配置修复**

- [#736 [OPEN] perf(cowork): 为 MarkdownContent 添加 React.memo](https://github.com/netease-youdao/LobsterAI/pull/736)  
  创建于 2026-03-24。修复流式输出时历史消息重复解析 markdown 的性能问题，与 #749 同一类改动，建议一起评审。

- [#738 [OPEN] fix: honor configured execution mode](https://github.com/netease-youdao/LobsterAI/pull/738)  
  创建于 2026-03-24。执行模式从配置读取而非硬编码 local，涉及 OpenClaw 沙箱映射，与 #2590 有协同关系。

---

**总结**  
LobsterAI 在 2026-10-09 呈现出"清理积压 + 主线小幅推进"的良性状态：两个关键 PR（错误日志修复、Token 用量追踪）合入，12 条 stale PR 被关闭，仓库整洁度提升。但安全 PR #2590 悬置过久是明显隐患，建议维护团队在下一迭代中优先处理。整体项目健康度良好，核心功能持续演进，社区参与热情仍在，但 3 月以来的 stale PR 关闭潮也反映出部分贡献者的工作可能未被有效承接，值得反思 issue/PR 响应机制的效率。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-10-09

## 1. 今日速览

过去24小时，Moltis 项目整体活跃度处于**中等偏低**水平：共处理 2 条 Issue（1 条新开，1 条关闭），无新增 Pull Request、无新版本发布。值得关注的是，今日迎来一条来自外部团队 A2Agent 的集成请求（#1296），表明 Moltis 的 Provider 生态正在吸引第三方服务商的主动接入兴趣；与此同时，涉及 Vault 解锁/恢复端点缺失认证的安全漏洞（#1177）在 10 月 8 日被正式关闭，说明安全修复已落地。当前开发/维护节奏偏向**稳定加固期**，近期可能没有重大功能发布，但安全性验证与生态兼容性测试仍在推进。

## 2. 版本发布

**无新版本发布**。最近一次 Release 暂无记录，建议关注后续版本节奏，安全修复（#1177）的合入可能随下一补丁版发布。

## 3. 项目进展

- **安全漏洞修复确认**：[#1177 [bug] Vault Unlock/Recovery Endpoints Missing Authentication (CWE-306)](https://github.com/moltis-org/moltis/issues/1177) 已于 2026-10-08 关闭。该 Issue 报告 Vault 解锁/恢复端点缺少认证（CWE-306），属于严重安全问题，现已解决并关闭，表明核心安全补丁已合入代码库。
- 今日无其他 PR 合并或关闭，代码提交活动较少，可能处于合并后的稳定观察期。

## 4. 社区热点

- **[#1296 [OPEN] Test an A2Agent profile through Moltis provider setup](https://github.com/moltis-org/moltis/issues/1296)** — 这是今日最受关注的 Issue，由 A2Agent 团队（@A2agent-ai）主动发出，因 Moltis 特有的 `moltis-providers` 层和 onboarding 流程，希望验证 A2Agent 作为自定义 endpoint 的最小可用路径，或要求提供轻量级 provider preset。该诉求反映出第三方模型网关对 Moltis 生态有明确接入意愿，且希望降低集成门槛。

## 5. Bug 与稳定性

| 严重程度 | Issue | 状态 | 说明 |
|---|---|---|---|
| 🔴 严重（安全） | [#1177](https://github.com/moltis-org/moltis/issues/1177) Vault Unlock/Recovery 端点缺少认证 (CWE-306) | 已关闭 | 未授权用户可能通过未认证端点恢复/解锁 Vault，属于身份验证缺失漏洞。现已修复关闭，但暂无对应 PR 链接，建议后续观察发布说明。 |
| 🟢 无新增 Bug | — | — | 今日无新报告的 Bug、崩溃或回归问题。 |

## 6. 功能请求与路线图信号

- **[#1296 A2Agent 集成测试请求](https://github.com/moltis-org/moltis/issues/1296)** — 外部服务商希望 Moltis 支持通过自定义 endpoint 直接接入第三方兼容网关（OpenAI/Anthropic compatible），或提供轻量 provider preset。这一信号表明 **Moltis Provider 层存在第三方生态扩展的潜在需求**。如果维护者认可该方向，后续可在 `moltis-providers` 层增加“自定义 endpoint 快速接入”的低门槛支持，或为常用网关提供预设模板。该 Issue 刚创建，尚未有评论，但作为外部团队主动接入的信号，值得纳入下一版本规划考量。

## 7. 用户反馈摘要

- **第三方集成痛点**（来自 #1296）：A2Agent 团队明确指出 Moltis 的 provider 接入流程有特殊设计（`moltis-providers` 层 + onboarding），他们不确定“最小支持路径”是直接配置自定义 endpoint 还是需要编写 provider preset。这反映出**新服务商接入存在一定学习成本**，用户期望能提供更清晰的指引或预设机制。
- **安全敏感度高**（来自 #1177）：该漏洞由用户 @Practice100101 在 7 月报告，经约 2 个月后修复并关闭，期间无评论更新。说明社区有用户关注 Vault 这类敏感功能的安全加固，且修复状态受到期待。

## 8. 待处理积压

- **当前无长期未响应的 Issue 或 PR 积压**。今日两条 Issue 中，#1177 已闭环，#1296 为新建且尚未有人回复——考虑到这是外部合作需求，建议维护者**尽快响应**以避免第三方集成热情消退。
- 提醒：近期 PR 合并/关闭为 0，如果有功能分支长期未 merge，建议检查是否有等待中的开发中 PR，以避免开发周期的隐式延迟。

---

> 数据来源：[Moltis GitHub 仓库](https://github.com/moltis-org/moltis) | 报告生成时间：2026-10-09
> 注：当前报告仅基于 Issue/PR 时间戳和摘要，不包含代码提交（commit）数据，若需更完整的开发节奏分析，建议补充 commit 与 Release 历史。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw 项目动态日报 — 2026-10-09

---

## 1. 今日速览

过去 24 小时项目保持**高活跃度**：共产生 29 条 Issue 更新（新开/活跃 17，关闭 12）和 37 条 PR 更新（待合并 28，合并/关闭 9），无新版本发布。今日社区讨论集中在**聊天记录持久化与上下文窗口关联**（#8134，10 条评论）、**DeepSeek 文件内容块导致 400 错误**（#8022/#7883/#8064）以及 **LAN 环境下控制台崩溃**（#8073/#8147）。项目侧有一批质量加固类 PR 合入（E2E 测试强化、view_audio 工具落地、测试套件提速 41%），但**端到端聊天记录持久化大 PR（#7931）仍在审查中**，尚未合并——这直接对应了社区最集中的痛点。整体健康度：功能迭代活跃，稳定性问题反馈密集，部分长期积压（如消息队列、llama.cpp 运行时回滚）值得维护者关注。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日合并/关闭的重要 PR 集中在工程质量与功能补全：

- **`view_audio` 内置工具已合并** — [#8083 [CLOSED] feat(tools): add view_audio tool for audio understanding](https://github.com/agentscope-ai/QwenPaw/pull/8083)（first-time-contributor, size/M）。补全了音频模态理解能力，此前 agent 面对音频文件只能绕道处理，现在与 `view_image`/`view_video` 对齐。
- **E2E 浏览器测试全面加固** — [#8054 [CLOSED] test(e2e): audit and harden full browser coverage](https://github.com/agentscope-ai/QwenPaw/pull/8054)（已合入）。修复了会话 pin 验证顺序、PTY 中断竞态、过时选择器导致 Files/Heartbeat/Models/Skill Pool/Agents 路径未被实际测试等问题。
- **测试套件墙钟时间削减 41%** — [#7380 [CLOSED] test: cut suite wall clock 41% and drop zero-value tests](https://github.com/agentscope-ai/QwenPaw/pull/7380)。修复了测试中真实缺陷（9,997 个单元测试 57s 完成；集成测试修复后占了原耗时的 85%）。
- **LAN/Tailscale HTTP 源终端 UUID 崩溃修复** — [#8144 [CLOSED] fix(console): support terminal UUIDs on HTTP origins](https://github.com/agentscope-ai/QwenPaw/pull/8144)（后继 PR #8146 保持开放，补充了更全面的回归测试）。对应修复 #8073 和 #8147。
- **datapaw 插件独立版本发布流水线** — [#7089 [CLOSED] ci(datapaw): add a standalone version-driven release pipeline](https://github.com/agentscope-ai/QwenPaw/pull/7089)，使插件可独立于主版本节奏发布。

**注意**：社区最关心的 **durable paginated transcript history（#7931，size/XXXL）仍为 OPEN 状态**，该 PR 提供每会话 SQLite 持久化存储与分页加载，是解决"聊天记录丢失"呼声的直接技术方案，但 10-09 尚未合并。

---

## 4. 社区热点

今日讨论最活跃的 Issues/PRs：

1. **[#8134 [OPEN] [bug] 聊天记录和大模型上下文窗口关联**（10 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/8134)
   用户 @happieme 情绪激烈地反馈聊天记录"说没就没了"，认为与上下文窗口无关，并追问修复时间。同类问题 #7884（9 条评论，已关闭）中也表达了"聊天记录这么短，体验极差"的不满。这是目前社区**声音最大、重复提交最多的痛点**。注意 #8131 是同一用户同内容重复提交的重复 Issue，已被关闭。

2. **[#8022 [CLOSED] send_file_to_user 文件块 + 空 assistant 消息污染上下文，导致后续请求对所有模型持续 400**（5 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/8022)
   与 #7883（5 条评论）、#8064（3 条评论）、#8042（3 条评论）构成一组系列问题：工具返回的 PDF 被序列化为 OpenAI 风格嵌套文件块，DeepSeek 等模型拒绝并返回 400，**一次失误永久破坏整个会话**。多个用户报告在 2.2.1/2.2.2b4 上仍可复现。

3. **[#8120 [OPEN] [bug] 频繁页面加载失败**（3 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/8120)
   用户反馈多台设备均出现"页面加载失败"，附有截图，认为非常影响体验。

4. **[#8122 [CLOSED] 2.2.2 beta4 设置界面布局错乱**（2 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/8122)
   桌面 Windows 版设置页布局异常，附截图。

**诉求分析**：热点集中在"数据不丢"（聊天记录、会话状态）和"模型兼容性"两大方向。用户对聊天记录丢失的容忍度已接近临界，多个相似 Issue 反复提交说明该问题直接影响日常使用信心。

---

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 描述 | 状态 |
|---|---|---|---|
| 🔴 严重 | [#8109 流错误会导致会话完全丢失](https://github.com/agentscope-ai/QwenPaw/issues/8109) | v2.2.2b4，agent 间调用中 API 流错误后子 agent 会话 100% 全部丢失 | OPEN，无 fix PR |
| 🔴 严重 | [#8022 / #7883 / #8064 / #8042 工具返回文件导致 DeepSeek 等模型持续 400](https://github.com/agentscope-ai/QwenPaw/issues/8022) | send_file_to_user 产生裸文件块 + 空 assistant 消息污染上下文，后续所有请求失败；#7883 指出 2.2.1 上仍可复现 | 均已 CLOSED，但 #7883 明确报告修复不完整 |
| 🔴 严重 | [#8147 crypto.randomUUID is not a function，agent 切换后控制台崩溃](https://github.com/agentscope-ai/QwenPaw/issues/8147) | v2.2.2b4，非安全上下文（LAN/Tailscale HTTP）下渲染崩溃 | **已有 fix PR #8146 / #8144** |
| 🟠 中等 | [#8120 频繁页面加载失败](https://github.com/agentscope-ai/QwenPaw/issues/8120) | 多设备复现，影响正常使用 | OPEN |
| 🟠 中等 | [#8115 桌面端冷启动挂起 ~11s / WebView2 静默死亡](https://github.com/agentscope-ai/QwenPaw/issues/8115) | 冷启动性能问题 + 后台进程可能异常退出 | OPEN |
| 🟠 中等 | [#8125 llama.cpp has_update() 仍静默回滚用户安装的运行时（第 3 次出现）](https://github.com/agentscope-ai/QwenPaw/issues/8125) | 关联 #7633，25 天无 PR 提交 | OPEN，维护者需关注 |
| 🟠 中等 | [#8143 Console 错误刷屏：svg width/height 收到非数值](https://github.com/agentscope-ai/QwenPaw/issues/8143) | Button size 为 "small" 时传入 SVG 属性，单次会话捕获 22 条错误 | OPEN |
| 🟡 轻微 | [#8129 图片缩放丢失 EXIF 方向信息](https://github.com/agentscope-ai/QwenPaw/issues/8129) | 触发 max pixels 缩放后模型收到错误方向的图片 | OPEN |
| 🟡 轻微 | [#8073 V2.2.2.beta4 无法访问会话页（仅 LAN 设备访问时）](https://github.com/agentscope-ai/QwenPaw/issues/8073) | 与 #8147 同源，已有 #8146 修复 | CLOSED（被 #8146 修复） |

---

## 6. 功能请求与路线图信号

- **`view_audio` 内置工具** — [#8081 [Feature]](https://github.com/agentscope-ai/QwenPaw/issues/8081) 今日通过 [#8083](https://github.com/agentscope-ai/QwenPaw/pull/8083) 合入，属已落地需求，下一版本将包含。
- **官方 "reduced effects" 降级特效选项** — [#8135](https://github.com/agentscope-ai/QwenPaw/issues/8135) 对应 PR [#8137](https://github.com/agentscope-ai/QwenPaw/pull/8137)（OPEN）：针对 backdrop-filter 大圆角导致 GPU 持续占用问题，提议在 Appearance 设置中加入降级档位。已有实现方案，**大概率进下一版本**。
- **自定义 Skill/Plugin 市场源（内网/离线部署）** — [#8015 [Feature]](https://github.com/agentscope-ai/QwenPaw/issues/8015)：企业内网/隔离环境刚需，目前需 patch 源码。属于对企业客户有较高价值但未见对应 PR 的请求。
- **You.com 作为免密钥 web_search 提供商** — [#8139 [Feature]](https://github.com/agentscope-ai/QwenPaw/issues/8139)：提交者为 You.com 员工，建议新增第三个搜索后端（无需 API Key，每日 100 次免费）。需项目方权衡数据隐私与依赖。
- **Skill Pool 下载改为可取消后台任务** — [#8126 [Feature]](https://github.com/agentscope-ai/QwenPaw/issues/8126)：与 #8055 同一作者，请求将 `/pool/download` 由同步等待改为后台任务 + 进度 + 取消。当前仍阻塞在 30s 超时问题。
- **Tauri2 切换为 Electron（麒麟 v10 桌面兼容）** — [#8142 [Feature]](https://github.com/agentscope-ai/QwenPaw/issues/8142)：国产化系统兼容需求，工程量大，短期内落地可能性较低。
- **README 文件整体更新** — [#8140 [Feature]](https://github.com/agentscope-ai/QwenPaw/issues/8140)：简单维护类请求。

---

## 7. 用户反馈摘要

从今日 Issues 和评论中提炼的真实用户声音：

- **聊天记录丢失是最大信任危机**。
  - @happieme："聊天记录说没就没了！这个跟大模型的上下文窗口，应该是没关系的！咱们什么时候能修理好？？？？？？？？？"（#8134）
  - @MCQSJ："B 这个 Agent 内的会话，在流错误后 100% 直接丢失全部会话内容"（#8109）
  - 用户感知：历史讨论无法回翻、消息"凭空消失"，体验评分极低。
- **DeepSeek 用户在一次失误后整个会话报废**：@Moonlit-Pages 描述"send_file_to_user with a PDF permanently breaks the session"，即永久性破坏，语气虽冷静但问题严重（#8064）。
- **对桌面端性能不满**：@sergmsv33-lab 详细记录了冷启动 11s 挂

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-10-09

## 1. 今日速览

EasyClaw 今日发布 v1.9.28 版本，新增达人工作台多店铺筛选、BD 工作范围划分、达人 Excel 导入导出及差评跟进职责明确等功能，主要面向商务拓展（BD）场景的效率提升。过去 24 小时无 Issue 更新、无 PR 提交/合并/关闭，社区互动较为平静。相较昨日，今日社区活跃度较低，但版本迭代持续进行，项目整体处于稳定的功能迭代推进状态。

## 2. 版本发布

### v1.9.28 — TK Copilot v1.9.28

**发布时间**：2026-10-09（近24小时内）

**主要新功能**：

- **多店铺筛选支持**：达人工作台（Affiliate workbench）现支持多店铺筛选，方便 BD 人员跨店铺管理达人资源并对比运营效果。
- **BD 工作范围划分**：新增"个人 vs 公共"工作台范围选项，支持 BD 人员按个人任务或团队公共任务进行工作台视图切换，有助于职责边界清晰化。
- **达人 Excel 导出与导入**：支持达人数据的 Excel 导入导出，便于 BD 人员进行线下交接、批量处理和跨系统数据迁移。
- **差评跟进职责明确**：在流程中明确了差评（bad-review）跟进的责任归属，减少 BD 与运营之间的职责不清问题。

**破坏性变更**：无明确说明的破坏性变更。

**迁移注意事项**：无特殊迁移要求。涉及达人 Excel 导入导出的用户，建议更新后先导出备份再执行批量导入操作。使用多店铺工作台的团队需注意确认各成员的角色权限配置，确保 BD 人员可正确访问个人及公共范围的达人数据。

*发布链接*：https://github.com/gaoyangz77/easyclaw/releases

## 3. 项目进展

今日无 PR 被合并或关闭（过去24小时 PR 更新为0），但由于 v1.9.28 的发布，项目实质推进了以下方向：

- **BD 工作流完善**：多店铺筛选 + 工作范围划分 + Excel 导入导出，构成了完整的 BD 达人管理链路闭环，推动项目从"达人数据查看"向"达人运营协同"演进。
- **职责管理强化**：差评跟进职责的明确，表明项目在业务流程合规性和团队协作规范性方面持续加深。

整体来看，项目未通过 GitHub Issues/PRs 反映代码层面的今日变更，但通过版本发布完成了实质功能迭代，处于稳定演进状态。

*参考链接*：https://github.com/gaoyangz77/easyclaw

## 4. 社区热点

今日无活跃讨论的 Issue 或 PR（Issues 更新 0，活跃 0，关闭 0；PR 更新 0）。

*检索链接*：https://github.com/gaoyangz77/easyclaw/issues

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。无待处理或修复中的稳定性问题。

## 6. 功能请求与路线图信号

今日无新的功能请求提交。但结合 v1.9.28 的发布内容，以下方向值得关注：

- **多店铺运营协同**：多店铺筛选与 BD 个人/公共范围划分，暗示项目正从单店铺工具向多店铺/多角色协同平台演进，未来可能进一步扩展团队权限管理、跨店铺数据对比等能力。
- **达人数据批处理**：Excel 导入导出功能为达人数据的批量流转提供了基础，后续版本可能会增加更丰富的模板定制、字段映射校验、批量操作（如批量邀约、批量同步）等功能。
- **流程职责标准化**：差评跟进职责明确化，说明项目在深耕 BD 业务流程规范化，后续可能沿此方向推出更多流程模板和自动化能力。

*链接*：https://github.com/gaoyangz77/easyclaw

## 7. 用户反馈摘要

今日无 Issue 评论或用户反馈数据可分析。

此前版本的反馈可参考：https://github.com/gaoyangz77/easyclaw/issues

## 8. 待处理积压

当前无长期未响应的重要 Issue 或 PR 需要特别提醒维护者关注。

*积压列表*：https://github.com/gaoyangz77/easyclaw/issues

---

**项目健康度评估**：EasyClaw 今日以版本发布为主轴推进功能迭代，社区讨论虽静默，但开发节奏保持稳定。核心功能围绕 BD 工作流的增强反映了产品定位的持续深化。建议后续关注 BD 相关新功能的用户反馈，持续监控多店铺场景下的稳定性表现。

*项目主页*：https://github.com/gaoyangz77/easyclaw

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*