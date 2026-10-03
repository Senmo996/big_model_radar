# OpenClaw 生态日报 2026-10-03

> Issues: 476 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-03 02:46 UTC

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

⚠️ 摘要生成失败。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-10-03）

## 1. 生态全景
当前生态呈现**“头部活跃、长尾停滞”**的强烈分化：核心项目（NanoBot、NanoClaw、CoPaw、Zeroclaw）保持高频迭代，但普遍面临**PR 合并拥堵**（Zeroclaw 今日 0 合并）与**稳定性回归**（更新回滚引发数据丢失、OOM 崩溃）等“增肌期”阵痛。用户诉求正从“追求新模型支持”向 **“配置可预期性”与“核心链路数据安全”** 纵深迁移，诸如 `reasoningEffort` 全局副作用和 cron 任务静默丢失等隐含缺陷被集中引爆。与此同时，以 OpenClaw 为谱系核心的衍生分支（Claw 系）正在蚕食/继承其社区生态，而 LobsterAI 等老牌项目因维护停滞，6 个月无有效合并，濒临离场风险。

## 2. 各项目活跃度对比
*注：数据来源为各项目 10-02 至 10-03 的 GitHub 动态。*

| 项目 | Issue 更新 | PR 更新 | 合并/关闭 PR | 版本发布 | 健康度评估 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | ⚠️ 摘要失败 | ⚠️ 摘要失败 | ⚠️ 摘要失败 | 未知 | 数据缺失，无法评估 |
| **NanoBot** | 6 | 37 | 6 | 无 | **健康活跃**：P0 数据可靠性修复已合入，但 PR 积压 29 条，有小幅拥堵 |
| **Zeroclaw** | 50 | 50 | **0** | 无 | **亚健康**：提交密集但合并通道完全堵塞，4 个 S1 级问题悬而未决 |
| **PicoClaw** | 3 | 4 | 2 | 无 | **平稳巩固**：功能合并有序，但存在 5 条 stale 项及 WebUI 高优性能 Bug |
| **NanoClaw** | 50 | 30 | 6 | 无 | **高危冲刺**：迭代极快，但新爆出 2 个可致宕机/删库的严重更新回滚 Bug |
| **IronClaw** | - | - | - | - | 无活动（24h） |
| **LobsterAI** | 6 | 3 | 0 | 无 | **病危停滞**：全部为 stale 刷新，2 个安全修复被 bot 关闭，1 个滞留 6 个月 |
| **TinyClaw** | - | - | - | - | 无活动（24h） |
| **Moltis** | - | - | - | - | 无活动（24h） |
| **CoPaw** | 13 | 12 | 7 | 无 | **健康活跃**：合并效率最高，桌面端体验优化集中落地 |
| **ZeptoClaw** | - | - | - | - | 无活动（24h） |
| **EasyClaw** | - | - | - | - | 无活动（24h） |

## 3. OpenClaw 在生态中的定位
**核心参照与基因源头（但今日缺席）**。尽管 OpenClaw 本身今日摘要生成失败，但生态中大量项目名（Zeroclaw、NanoClaw、PicoClaw、TinyClaw、EasyClaw）表明其是 **Claw 谱系的“上游母体”**。
- **优势**：拥有先发社区心智与完整 Agent 自主能力（如 web 浏览、文件管理、多源工具调用）的基准框架；其分支项目的爆发，侧面验证了其架构思想的生态扩展力。
- **技术路线差异**：与衍生的专项化分支相比，OpenClaw 仍为具备“全栈通用”的固定底座的单体（专利的 `claw` 设计），而 NanoClaw/PicoClaw 则从“轻量部署”和“边缘设备”切入解构其模块化能力。
- **社区规模对比**：从今日数据看，CoPaw（13 Issues/12 PRs）、NanoClaw（50 Issues/30 PRs）等分支的社区活跃度已显著超越其母体（单日数据基本为 0），呈现“青出于蓝”的态势。核心母体若持续缺席，恐有失去生态定义权的风险。

## 4. 共同关注的技术方向
- **更新与回滚的致命可靠性**（NanoClaw #4003/#4004，NanoBot #5933，Zeroclaw #11450）
  - 诉求：阻断因 `ENOSPC`、权限错误或依赖升级（tsx/esbuild）导致的**数据删除或静默丢失**，并要求 cutover 失败后的完整恢复机制。
- **配置参数的作用域与隐晦副作用**（NanoBot #6002，CoPaw #8077，LobsterAI #900）
  - 诉求：`reasoningEffort` 不应全局丢弃 `temperature`；Qoder 代理不应丢弃 backend 参数；AI 不应将“每小时”误解为“每分钟”。**配置必须可预期、隔离且可验证**。
- **聊天上下文完整性**（NanoBot #6000/#6006，PicoClaw #3281，CoPaw #7884）
  - 诉求：`sendProgress` 默认可用的契约一致性、QQ 引用消息随行传递、长历史 WebUI 输入卡顿、以及历史记录容量无限膨胀的痛点。
- **安全与供应链加固**（Zeroclaw #11475、LobsterAI #908/#909/#911、NanoClaw #1424）
  - 诉求：升级 Wasmtime 清除 8 个 RustSec 通告；等待 6 个月未合并的 MCP 任意命令注入修复；以及 **拒绝“强制公开 Fork”的私有部署安全诉求**。

## 5. 差异化定位分析
- **NanoBot (HKUDS)**：学术/通用型 Agent 基座。侧重 **Provider 生态广度（46 个适配）** 与 API 健壮性边界，面向开发者深度追新，今日重点在 cron 数据保真与工具参数保持。
- **Zeroclaw**：核心运行时“重器”。聚焦 **Rust/Wasmtime 安全底座、LLM 迭代 token 预算优化（#5808）与 RPC/trace 归因**，面向底层工程师，牺牲合并速度换取高抽象并行提交。
- **NanoClaw**：运维与部署友好型（Node 生态）。聚焦 **任务调度、持久容器、更新渠道（channels）可回滚**，但严重 Bug（回滚删数据）今日暴露其架构脆性。
- **PicoClaw**：嵌入式/边缘侧（Sipeed）。聚焦 **低成本推理接入与子路径部署**，面向 IoT 与弱网络场景，优先解决轻量与内存（OOM）问题。
- **CoPaw**：桌面与端体验极致派（Tauri）。聚焦 **桌面窗口记忆、滚动锁定、移动端抽屉适配与 MCP 超时配置**，办公人群导向，今日合并效率居首。
- **LobsterAI**：网关/集成导向（网易有道系）。聚焦飞书、Cherry Studio 等生态联动，**但当前陷入停滞，核心诉求无人应答**。

## 6. 社区热度与成熟度分层
| 阶段 | 项目 | 特征 |
| :--- | :--- | :--- |
| **快速迭代期**（高速合并，扩展功能） | **CoPaw**、**NanoClaw** | 合并速度快（CoPaw 7 个合入），但 NanoClaw 因赶工出现高危缺陷。 |
| **高负载拥堵期**（提交多，审查滞后） | **Zeroclaw**、(NanoBot 轻度) | Zeroclaw 50 PRs 全部积压待审，S1 问题无法闭环，极易引发贡献者流失。 |
| **质量巩固期**（Bug 修复与打磨） | **PicoClaw**、**NanoBot** | NanoBot 今日集中于累计 Bug 修复（cron、JSON Schema 联合类型），PicoClaw 以文档和合并旧 PR 为主。 |
| **停滞/待复苏期**（无实质贡献） | **OpenClaw**、**LobsterAI**、TinyClaw、Iron

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-03

> 数据来源：GitHub（HKUDS/nanobot） | 统计窗口：2026-10-02 至 2026-10-03

---

## 1. 今日速览

过去 24 小时 NanoBot 项目活跃度较高，共产生 6 条 Issue 更新（5 条活跃、1 条关闭）和 37 条 PR 更新（8 条已合并/关闭），无新版本发布。其中，[#5933](https://github.com/HKUDS/nanobot/pull/5933) 修复了 cron 待处理任务丢失的 P0 级数据可靠性问题并已合入主线，是今日最重要的稳定性进展。同时社区围绕 `sendProgress` 机制 `1×`、`reasoningEffort` 全局副作用及 QQ 引用消息等内容展开了密集讨论，暴露了几个影响日常使用的行为缺陷。整体来看，项目处于高频迭代、快速修复的活跃健康状态，但随着 PR 队列持续堆积（29 条待合并），合并拥堵已初现端倪。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共有 6 个 PR 被合并/关闭，全部为 Bug 修复，覆盖数据可靠性、安全、执行超时等关键路径：

- **[P0] [#5933 fix(cron): preserve pending actions until store save succeeds](https://github.com/HKUDS/nanobot/pull/5933)**（已合并） — 修复 cron 合并存储写盘失败时待执行操作丢失的问题。现在先保存合并结果再清空 `action.jsonl`，消除了 ENOSPC 等故障下的静默数据丢失风险。关闭 [#5932](https://github.com/HKUDS/nanobot/issues/5932)。
- **[P2] [#5995 fix(agent): clear stale failure state when resuming runner iterations](https://github.com/HKUDS/nanobot/pull/5995)**（已合并） — 修复后续消息到达时错误上报失败状态、从而抑制最终 WebSocket 响应的问题，恢复了恢复场景下的正确状态清理。
- **[P2] [#5997 fix(linear): reject stale member access updates after reauthorization](https://github.com/HKUDS/nanobot/pull/5997)**（已合并） — 修复重新授权前发出的 Linear 请求可能在重新连接后错误重新启用已被拒绝成员的问题，属于权限边界安全修复。
- **[P2] [#5957 fix(exec): enforce session hard timeouts without polling](https://github.com/HKUDS/nanobot/pull/5957)**（已合并） — 让 exec 会话的硬超时不再依赖轮询触发，避免超时后命令仍在后台运行的情况。
- **[P2] [#5918 fix(tools): preserve valid JSON Schema union arguments](https://github.com/HKUDS/nanobot/pull/5918)**（已合并） — 修复含多类型联合（如 `["integer", "string"]`）的工具参数被错误转换/拒绝的问题。
- **[P2] [#5994 fix(agent): preserve explicitly empty tool registries](https://github.com/HKUDS/nanobot/pull/5994)**（已合并） — 确保显式传入的空工具注册表在整个 agent turn 内生效，不会意外恢复默认工具。

此外，8 个关闭/合并的 PR 中还包括 [#5918](https://github.com/HKUDS/nanobot/pull/5918) 与 [#5995](https://github.com/HKUDS/nanobot/pull/5995) 两个回归修复，说明项目在快速迭代的同时也在同步清理历史回归。整体来看，今日合入的修复集中于数据安全、会话状态与工具参数正确性，项目的稳定性正在稳步加强。

---

## 4. 社区热点

今日讨论热度集中在以下位置：

- **[#5898 [bug] gpt-6 model series through Github Copilot](https://github.com/HKUDS/nanobot/issues/5898)**（4 条评论，更新于 10-02） — 用户报告 v0.3.5 无法通过 GitHub Copilot 使用 OpenAI 6 系列模型，报 `Mode provider request failed`。该 Issue 自 9 月 24 日创建后持续活跃，评论区已积累了对 Copilot 认证与模型路由的讨论。这反映用户对新模型支持（gpt-6）的需求迫切，且与具体渠道的兼容性问题最易引发集中反馈。
- **[#6002 `reasoningEffort` silently drops `temperature` for all 38 `openai_compat` providers](https://github.com/HKUDS/nanobot/issues/6002)**（1 条评论，创建于 10-02） — 用户 @GZY-SUPER-HACKER 指出 `reasoningEffort` 一旦设置，会导致全部 38 个 `openai_compat` 提供商（包括非推理模型）静默丢弃 `temperature`，与规则设计初衷不符。该发现波及面广，可能影响大量用户的生成效果，成为今日最受关注的配置行为缺陷。

综合来看，社区当前最关心的两个核心问题是：**模型生态扩展（gpt-6 支持）** 和 **配置项行为的一致性**（`temperature` 不应被无关参数意外禁用）。

---

## 5. Bug 与稳定性

今日报告/修复的 Bug 按严重程度排列如下：

### 🔴 高 — 功能缺失 / 数据可靠性

- **[#6002 `reasoningEffort` silently drops `temperature` for all 38 `openai_compat` providers](https://github.com/HKUDS/nanobot/issues/6002)**（活跃，无 fix PR） — 设置 `reasoningEffort` 后所有兼容提供商都会停止发送 `temperature`，包括非推理模型。影响面覆盖 38/46 个 ProviderSpec，需尽快确认是否为设计取舍。
- **[#5898 [bug] gpt-6 model series through Github Copilot](https://github.com/HKUDS/nanobot/issues/5898)**（活跃，无 fix PR） — v0.3.5 不支持通过 Copilot 使用 gpt-6 系列，`Mode provider request failed`。已持续 9 天未关闭，社区反馈较多（4 条评论），新版模型支持存在滞后。

### 🟡 中 — 行为异常 / 回归

- **[#6000 `sendProgress: true` yields at most one line per turn — tool_contract.md contradicts itself](https://github.com/HKUDS/nanobot/issues/6000)**（活跃，已有 fix PR [#6001](https://github.com/HKUDS/nanobot/pull/6001)） — `sendProgress` 默认开启但实际无法产生中途进度文本，工具契约文档自相矛盾。PR #6001 已提交修复。
- **[#6008 [bug] fix(webui): sidebar state is wiped after an update when the initial fetch fails](https://github.com/HKUDS/nanobot/issues/6008)**（活跃，无 fix PR） — WebUI 首屏侧边栏状态拉取失败时静默回退默认值，用户后续操作（固定、重命名等）可能被意外覆盖。
- **[#6006 QQ: quoted messages never reach the agent](https://github.com/HKUDS/nanobot/issues/6006)**（活跃，无 fix PR） — 用户引用早前消息时，被引用消息内容不会随请求发送给 agent，导致依赖上下文的追问无法被正确回答。

### 🟢 低 — 已修复

- **[#5932 cron: pending actions are lost if the merged store cannot be saved](https://github.com/HKUDS/nanobot/issues/5932)**（已关闭） — 由 [#5933](https://github.com/HKUDS/nanobot/pull/5933) 合入修复，已解决。

---

## 6. 功能请求与路线图信号

### 信号较强的需求（已有实现或明确修复方向）

- **Opper 成为内置提供商** — [#5845 Add Opper as a built-in provider](https://github.com/HKUDS/nanobot/pull/5845)（开放中）参考 Eden AI / OrcaRouter 网关模式新增 Opper 网关，支持 `OPPER_API_KEY` 与 `openai_compat` 后端。该 PR 已再获更新，说明仍在评审推进中。
- **Codex 图像生成流式支持** — [#6011 fix(providers): stream Codex image generation responses](https://github.com/HKUDS/nanobot/pull/6011)（新开）面向 Codex 图像生成场景改用流式读取 SSE，避免已生成图像在响应完成后被丢弃。属 #4332 的后续增强。

### 尚未有 PR 的需求

- **gpt-6 模型系列支持**（[#5898](https://github.com/HKUDS/nanobot/issues/5898)）— 无对应 PR，需等待上游模型接口就绪或适配。
- **QQ 引用消息传递**（[#6006](https://github.com/HKUDS/nanobot/issues/6006)）— 无 PR，属于渠道协议增强，可能排期较远。

### 路线图判断

从近期 PR/Issue 来看，项目当前优先处理的是：**渠道消息完整性**（Telegram/Slack/QQ/邮件）、**工具参数校验严格化**、**超时与重试逻辑精细化**。Opper 一旦合入，将验证网关类 Provider 的扩展模式是否可复制；而 `sendProgress`、`reasoningEffort` 两处行为修正则可能随下一补丁版本一并发布。

---

## 7. 用户反馈摘要

从今日活跃的 Issues 和 PR 讨论中，可提炼出以下用户声音：

| 来源 | 用户反馈 | 分析 |
|---|---|---|
| [#5898](https://github.com/HKUDS/nanobot/issues/5898) | "v0.3.5 does not appear to support the OpenAI 6 model series through GitHub Copilot" | 用户已在生产环境尝试使用最新模型，对模型版本迭代速度有较高期待。Copilot 渠道的认证/路由错误让用户难以自行排查，希望获得更清晰的错误定位信息。 |
| [#6002](https://github.com/HKUDS/nanobot/issues/6002) | "Setting `reasoningEffort` to anything other than null makes nanobot stop sending `temperature` — for every provider" | 用户对配置项的隐式副作用表示困惑，期望 `reasoningEffort` 只对推理模型生效，不应全局影响所有提供商。这是典型的"配置意外泄漏"问题，提示应在文档中明确参数作用域。 |
| [#6000](https://github.com/HKUDS/nanobot/issues/6000) | "`channels.sendProgress` defaults to true, yet on a default install it has nothing to deliver and behaves exactly like false" | 用户发现默认配置下 `sendProgress` 开与关效果相同，对文档与实现不一致提出质疑。这表明用户对配置项的可预期性有较高要求。 |
| [#6006](https://github.com/HKUDS/nanobot/issues/6006) | "In QQ, when the user quotes an earlier message, the agent only receives the new text" | 实际使用场景中，QQ 用户习惯通过引用消息来指定讨论对象，缺少该上下文导致 agent 无法正确理解意图，影响 C2C 和群聊场景的实用性。 |

整体来看，用户对默认行为的正确性和参数作用范围的清晰度高度敏感，文档与实现的一致性需要特别关注。

---

## 8. 待处理积压

以下 Issue/PR 长时间未获得维护者响应或合入，提醒关注：

### 待响应的 Issue

- **[#5898 gpt-6 model series through Github Copilot](https://github.com/HKUDS/nanobot/issues/5898)** — 已开放 9 天，4 条评论，是当前社区关注度最高的未解决 Issue。建议尽快确认 Copilot 渠道对 OpenAI 新模型的兼容策略。

### 待合入/待评审的 PR（按等待时长排序）

- **[#5763 fix(api): return 400 for invalid multimodal field types](https://github.com/HKUDS/nanobot/pull/5763)** — 创建于 2026-09-14，已开放 19 天，无官方评审响应。属于 API 错误分类优化。
- **[#5793 fix(tools): scope recursive directory ignores to listed root](https://github.com/HKUDS/nanobot/pull/5793)** — 创建于 2026-09-16，已开放 17 天。修复递归

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-10-03

## 今日速览

过去 24 小时项目活跃度较高：共更新 50 条 Issue（新开/活跃 47，关闭 3）和 50 条 PR，但 **0 个 PR 被合并/关闭、0 个新版本发布**，合并通道完全堵塞，需关注。当前 Issue 池中 S1 级（工作流阻断）问题共 4 个，其中 2 个已有对应修复 PR；另有一批 security 与 risk:high 标签的功能/修复 PR 等待审查。整体看，项目处于"提交密集、审查积压"的状态。

## 版本发布

本期无新版本发布。

---

## 项目进展

今日**无任何 PR 被合并或关闭**（0 merged / 0 closed）。50 个待合并 PR 覆盖了多条主线，以下为按主题归类的重点进展：

**核心运行时修复**
- [fix(runtime): recover delegate settlements after worker exit (#11450)](https://github.com/zeroclaw-labs/zeroclaw/pull/11450) — 后台 delegate worker 异常退出后触发恢复机制，即使父守护进程存活也能复用现有工件校验与属主绑定终止逻辑。
- [fix(rpc): register live channels for every session tool (#11452)](https://github.com/zeroclaw-labs/zeroclaw/pull/11452) — 通过现有 `AgentChannelHandles::register_channel` 将已配置的 live channels 注册到所有本地 RPC 工具映射中，修复仅 `reaction` 和 `git_forge` 可用的问题。
- [fix(runtime): correlate conversation keys with turn traces (#11454)](https://github.com/zeroclaw-labs/zeroclaw/pull/11454) — 将会话键附加到日志归因中，使 provider 事件可直接与真实 turn 的 `trace_id` 配对。

**工具与资源安全**
- [feat(tools): add opt-in subprocess memory watchdog (#11456)](https://github.com/zeroclaw-labs/zeroclaw/pull/11456) — 新增 `shell_max_memory_mb` 配置项（默认关闭），采样命令常驻内存及可见子进程，超限即终止，正面回应 #6916 的生产 OOM 问题。
- [feat(tools): defer built-in schemas through tool_search (#11473)](https://github.com/zeroclaw-labs/zeroclaw/pull/11473) — 通过 tool_search 机制延迟内置工具 schema，直接对应 #5808 的"首轮 LLM 迭代超预算 3.3 倍"问题（依赖 #11472 的异常表条目）。
- [fix(gateway): confine dashboard reads to opened file handles (#11455)](https://github.com/zeroclaw-labs/zeroclaw/pull/11455) — 将文件系统读取绑定到已打开的目录/文件句柄，防止路径替换重定向，安全加固。
- [fix(deps): upgrade Wasmtime to clear eight RustSec advisories (#11475)](https://github.com/zeroclaw-labs/zeroclaw/pull/11475) — 将 Wasmtime 依赖升至 48.0.4/48.0.5 并同步 Cranelift/Pulley/WebAssembly 家族，清除 8 个安全公告。

**ZeroCode 体验**
- [feat(zerocode): rename provider aliases in Config (#11460)](https://github.com/zeroclaw-labs/zeroclaw/pull/11460) — 为 ZeroCode Config 的 provider 别名列表新增可重命名操作（默认按键 `e`，二次确认后调用现有配置接口）。
- [fix(zerocode): explain missing-completion queue pauses (#11449)](https://github.com/zeroclaw-labs/zeroclaw/pull/11449) — 在客户端状态中跟踪队列暂停原因，对"收到完成响应但未见终态通知"的情况给出特定提示。
- [refactor(zerocode): centralize transcript layout cache (#11459)](https://github.com/zeroclaw-labs/zeroclaw/pull/11459) — 统一 transcript 布局缓存所有权，防止行/屏幕/页脚/复制/URL 索引被独立修改。

**其他**
- [fix(tools): report pre-write metadata without retaining old content (#11463)](https://github.com/zeroclaw-labs/zeroclaw/pull/11463) — `file_write` 在写入前报告目标是否存在、原字节大小及写入字节数，区分创建与覆盖。
- [fix(memory): harden audit hygiene SQLite admission (#11458)](https://github.com/zeroclaw-labs/zeroclaw/pull/11458) — 审计保留流程复用既有 Unix owner/link/mode 校验与跨平台 regular-file/sidecar 检查。
- [fix(tools): clarify sessions_send append semantics (#11461)](https://github.com/zeroclaw-labs/zeroclaw/pull/11461) — 将 `sessions_send` 重新定位为已弃用的历史追加操作，引导使用 `send_message_to_peer`。
- 另有若干 docs/测试类 PR（#11472、#11439、#11474、#11349、#11447、#11453），用于记录运行时异常表、修复测试夹具与日志归因。

---

## 社区热点

讨论最集中的 Issue 反映了维护流程与核心架构两方面的关注：

- **[#8692 Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)（15 条评论）** — 维护者决策追踪器，汇集需要 maintainer/code-owner 拍板的 RFC、设计议题、发布策略问题。评论数居首说明社区对"决策积压"已有共识性焦虑。
- **[#5808 Feature: defer built-in tool schemas to reduce the fixed prompt floor](https://github.com/zeroclaw-labs/zeroclaw/issues/5808)（9 条评论）** — 默认 `agent.max_context_tokens = 32000` 下，首轮 LLM 迭代即超预算约 3.3 倍。底层 token 效率问题直接影响所有用户，已有 PR #11473 推进。
- **[#11387 Bug: zerocode ignores its launch directory again](https://github.com/zeroclaw-labs/zeroclaw/issues/11387)（5 条评论）**

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

## PicoClaw 项目动态日报 (2026-10-03)

### 1. 今日速览

PicoClaw 项目在过去 24 小时内维持中等活跃度。Issues 方面有 3 条更新（均为新开或活跃），PR 方面有 4 条更新（2 条待合并、2 条已关闭）。值得注意的是，今日有一条针对 Web UI 交互性能的 Issue 获得 17 条评论，是社区讨论的焦点。项目无新版本发布。整体来看，项目功能迭代未停歇，但存在 5 条被标记为 `stale` 的 PR/Issue 需维护者关注。

---

### 2. 版本发布

无新版本发布。

---

### 3. 项目进展

今日有 2 条 PR 被关闭/合并，是实质性推进的部分：

- **[#3368] docs: add Parallel Search MCP setup example（已关闭）**  
  作者: @georgeatparallel | 更新: 2026-10-02  
  为 CLI 指南增加了 Parallel Search MCP 的即用配置示例，用户无需 Parallel 账号即可获得网页搜索能力。该文档补齐了 Sogou 搜索之外的扩展选项，降低了新用户上手成本。  
  https://github.com/sipeed/picoclaw/pull/3368

- **[#1544] fix: merge PR #1514 #1513 #1512 #1510 #1509（已关闭）**  
  作者: @xuwei-xy | 更新: 2026-10-02  
  一次性合并了 5 个待处理 PR 的修复，涵盖此前分散的多个 bug/改进，有助于清理积压并统一代码基线。  
  https://github.com/sipeed/picoclaw/pull/1544

此外，2 条待合并 PR 指向的功能开发仍在推进中：
- #3393：新增 Cheaper Inference 作为 OpenAI 兼容 provider（低价模型网关）
- #3381：将 OpenAI provider 切换到 responses API

https://github.com/sipeed/picoclaw/pull/3393 | https://github.com/sipeed/picoclaw/pull/3381

---

### 4. 社区热点

最热门的讨论集中在一条 Bug 反馈上：

- **[#3281] [BUG] Web UI chat input is very laggy when history has a little bit long**  
  作者: @xpader | 评论: 17 | 👍: 2 | 更新: 2026-10-02  
  该 Issue 反映 Web UI 中当会话历史稍长时，输入框变得非常卡顿，复现步骤简单（长会话中连续输入）。这是本轮社区最活跃的讨论，17 条评论说明不少用户可能遇到类似体验问题，背后诉求是**提升前端在长上下文下的交互流畅度**。  
  https://github.com/sipeed/picoclaw/issues/3281

---

### 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue | 说明 | 是否有 fix PR |
|---|---|---|---|
| 中偏高 | #3281 | Web UI 长会话输入卡顿，直接影响核心聊天体验 | 无 |
| 低 | #3392 | CLAassistant 未能自动检测用户已签署 CLA，属于流程/工具问题，影响社区贡献体验（stale） | 无 |

https://github.com/sipeed/picoclaw/issues/3281 | https://github.com/sipeed/picoclaw/issues/3392

---

### 6. 功能请求与路线图信号

- **[#3415] 支持 Nginx 反向代理部署到子路径（/pico/）**  
  作者: @altman08 | 创建: 2026-10-02 | 评论: 0  
  请求为 Web Launcher 增加启动参数以支持子路径部署，确保页面、API、WebSocket、静态资源均在前缀下工作。该需求对使用统一域名、多应用共存的团队很常见，预计会被优先评估。  
  https://github.com/sipeed/picoclaw/issues/3415

- **PR 路线信号（未合并但有里程碑价值）**  
  - #3381 切换 OpenAI responses API（功能升级，涉及与新版 API 对齐）
  - #3393 新增更便宜的推理供应商（降低用户使用成本）  
  两者若合并，将扩大服务商适配范围与成本竞争力，可能进入下一版本。

https://github.com/sipeed/picoclaw/pull/3381 | https://github.com/sipeed/picoclaw/pull/3393

---

### 7. 用户反馈摘要

- 从 #3281 的长评论可见，用户对 Web UI 在**较长会话历史下的输入延迟**有明显不满，期待优化前端渲染与状态管理。有用户反馈该问题会随历史长度线性恶化，已影响日常使用。
- #3392 中，开发者 @XenonR 反馈 CLAassistant 依赖签名状态不可控，增加外部贡献者的流程摩擦。
- #3415 是典型的企业/团队部署场景诉求，用户希望在不占用根路径的情况下进行反向代理，期望官方原生支持而不是靠部署层 hack。

---

### 8. 待处理积压

以下 Item 长时间未获得维护者处理，被标记为 `stale`，建议优先审视：

| 项目 | 类型 | 内容 | 已存在时间 |
|---|---|---|---|
| #3392 | Issue | CLAassistant 不识别签名，流程阻断（stale） | 9 天 |
| #3393 | PR | 新增 Cheaper Inference provider（stale，待合并） | 8 天 |
| #3381 | PR | 切换 OpenAI responses API（stale，待合并） | 16 天 |
| #3281 | Issue | Web UI 长历史卡顿，高关注（17 评论、活跃） | 74 天 |

- #3281 虽未标记 `stale`，但持续 2.5 个月未解决，是社区声音较大的性能问题，建议维护者排期修复。
- 多条 PR/Issue 打上 `stale` 标签，且 #1544 等关闭后的合并，表明项目存在一定的慢性积压，需要更及时的评审节奏。

https://github.com/sipeed/picoclaw/issues/3392 | https://github.com/sipeed/picoclaw/pull/3393 | https://github.com/sipeed/picoclaw/pull/3381 | https://github.com/sipeed/picoclaw/issues/3281

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

好的，这是根据 2026-10-03 的 GitHub 数据为您生成的 NanoClaw 项目日报：

---

## NanoClaw 项目动态日报 — 2026-10-03

### 1. 今日速览
过去 24 小时项目活跃度极高，共发生 50 条 Issue 更新与 30 条 PR 更新，其中新开/活跃 Issue 33 条，待合并 PR 24 条。核心维护者 @glifocat 提交了密集的修复与改进 PR（涉及更新机制、容器、setup、channels 等领域），显示项目正处于快速迭代期。但值得警惕的是，今日新出现两个严重更新/回滚链路 Bug（#4003、#4004），可能导致数据删除或主机宕机，需要优先响应。当前无新版本发布，项目主分支健康度总体良好，但稳定性问题有所抬头。

---

### 2. 版本发布
过去 24 小时无新版本 Release 发布。

---

### 3. 项目进展
今日合并/关闭的 6 个 PR 中，有 3 个值得关注（其余为旧 PR 补关或简单 chore）：

- **[#3994 fix(agent-runner): show the Claude SDK's own failure notice instead of the generic one](https://github.com/nanocoai/nanoclaw/pull/3994)** — 已合并。修复 API key 错误时向所有渠道推送笼统失败提示的问题，现在会展示 Claude SDK 的具体错误原因，显著改善首次配置失败时的可诊断性。
- **[#3969 fix(iron-proxy): send a Basic challenge with the front proxy's 407](https://github.com/nanocoai/nanoclaw/pull/3969)** — 已合并。修复 git fetch 通过 Iron Proxy 时因缺少 `Proxy-Authenticate` 质询而无法发送代理凭据的问题。
- **[#4006 Initial setup of the project with OpenCode provider and related configurations](https://github.com/nanocoai/nanoclaw/pull/4006)** — 已关闭。新增 OpenCode provider 的初始配置。

**整体判断**：今日合入的 PR 集中在**错误提示优化**与**代理认证修复**，属于质量改进而非重大功能推进。项目正向“更稳、更易用”的方向前进，但力量较为分散。

---

### 4. 社区热点
- **[#1424 Securing One's Fork?](https://github.com/nanocoai/nanoclaw/issues/1424)** — 评论 7 条，为今日最热 Issue。用户反馈安装流程强制引导创建 fork，但 fork 必须公开（无法私有），这对用于家庭医疗系统的商业/敏感项目构成阻碍。**诉求**：提供不依赖公开 fork 的安装方式，或支持私有仓库安装。
- **[#2437 Any appetite for removing/improving the OneCLI dependency?](https://github.com/nanocoai/nanoclaw/issues/2437)** — 虽仅 1 条评论，但获得 7 个 👍，是近期社区关注度最高的功能请求之一。用户认为 OneCLI 依赖违背了 NanoClaw “轻量级”的定位。其已关闭状态可能意味着维护者已内部讨论或转至其他跟踪渠道。
- **[#3716 PreCompact conversation-archive writes an unbounded, full-rewrite file per firing](https://github.com/nanocoai/nanoclaw/issues/3716)** — 3 条评论。生产环境 OOM 崩溃循环的真实诱因，用户对根因分析非常详细，虽无大量讨论，但属于高价值 Bug 报告。

**分析**：社区最关心的两大主题是 **部署模型的开放性**（fork 安全、OneCLI 依赖）与 **运行时的可靠性**（OOM、崩溃）。

---

### 5. Bug 与稳定性
按严重程度排列：

**🔴 严重（数据丢失/服务宕机）**
- **[#4004 update cutover crashes when the update bumps tsx or esbuild](https://github.com/nanocoai/nanoclaw/issues/4004)** — 新报告。cutover 最后一步崩溃，导致整体回滚，且发生在 tsx/esbuild 升级时。**尚无明确 fix PR**。
- **[#4003 update rollback can delete half of data/ and leave the host down](https://github.com/nanocoai/nanoclaw/issues/4003)** — 新报告。回滚流程因 `EACCES` 权限错误中断，可能删除 `data/` 目录下的部分数据，且使主机不可用。**尚无明确 fix PR**。
- **[#3951 ncl tasks delete half-fails on Linux: Docker-created root-owned mount points block the session directory rmSync](https://github.com/nanocoai/nanoclaw/issues/3951)** — 删除任务后残留孤儿 session，导致主机每分钟报错。属 Linux 特有权限问题。

**🟠 高（核心功能受损）**
- **[#3716 PreCompact 全量重写会话文件导致 OOM 崩溃循环](https://github.com/nanocoai/nanoclaw/issues/3716)** — 生产环境真实 OOM 诱因，无旋转/清理机制。**无 fix PR**。
- **[#4002 Discord rejects resuse of namespaced message id for reactions/edits (400 50035)](https://github.com/nanocoai/nanoclaw/issues/4002)** — 路由器命名空间 ID 被 Discord 拒绝，reaction/编辑操作全部失败。
- **[#3984 PreCompact hook fails: compact-instructions.ts calls getAllDestinations() without a registered mailbox](https://github.com/nanocoai/nanoclaw/issues/3984)** — 每次压缩时 hook 必然报错退出。

**🟡 中（功能异常/体验受损）**
- **[#3732 Transcript rotation never runs for long-lived containers](https://github.com/nanocoai/nanoclaw/issues/3732)** — 长生命周期任务使轮换逻辑永不执行。
- **[#3714 Operator env overrides (auto-compact, transcript rotation) never reach container](https://github.com/nanocoai/nanoclaw/issues/3714)** — **已开 fix PR [#3999](https://github.com/nanocoai/nanoclaw/pull/3999)**，已修复 `CLAUDE_CODE_AUTO_COMPACT_WINDOW` 的传递问题。
- **[#3705 ncl tasks update --recurrence doesn't recompute next scheduled fire](https://github.com/nanocoai/nanoclaw/issues/3705)** — 修改循环周期后 `process_after` 不更新。
- **[#3576 Rate-limited turns flood channel with duplicate error notices](https://github.com/nanocoai/nanoclaw/issues/3576)** — 无退避/去重。
- **[#3568 Pending system rows starve inbound queue; agent silently stops responding](https://github.com/nanocoai/nanoclaw/issues/3568)** — `system` 行堆积会导致代理静默失联。
- **[#3529 update-nanoclaw skill refresh breaks local adapters](https://github.com/nanocoai/nanoclaw/issues/3529)** — 更新时可能覆盖用户自研适配器。**已有相关 fix PR [#3988](https://github.com/nanocoai/nanoclaw/pull/3988)、[#3997](https://github.com/nanocoai/nanoclaw/pull/3997) 但尚未合并**。

---

### 6. 功能请求与路线图信号
- **移除/改进 OneCLI 依赖**（[#2437](https://github.com/nanocoai/nanoclaw/issues/2437)）：社区呼声最高（👍7），已关闭但可能是下一阶段架构重构的候选方向。
- **opt-in 家庭边缘计算节点**（[#3538](https://github.com/nanocoai/nanoclaw/issues/3538)）：利用闲置 PC/NAS 作为独立容器 worker，扩展性强。
- **单机多用户支持**（[#2653](https://github.com/nanocoai/nanoclaw/issues/2653)）：共享家庭 Mac 上为不同成员跑独立 Telegram bot。数据模型已支持，阻塞点在于 `systemd` 服务文件。
- **原生凭据注入支持**（[#2781](https://github.com/nanocoai/nanoclaw/issues/2781)）：为下游打包分发提供不依赖 OneCLI 的认证方式。
- **维护者自驱的路线图信号**：从 PR 看，维护者正着重推进 **更新机制的可控化**（[#3986 update channels 跟随 release tag](https://github.com/nanocoai/nanoclaw/pull/3986)）、**供应链安全**（[#3978 Dependabot](https://github.com/nanocoai/nanoclaw/pull/3978)、[#4005 依赖升级](https://github.com/nanocoai/nanoclaw/pull/4005)、[#4007 skill 依赖可见性](https://github.com/nanocoai/nanoclaw/pull/4007)），以及 **channels 分支的整合**（#3995、#4000）。

---

### 7. 用户反馈摘要
- **负面（安装/依赖）**：多个用户表达对 Node 依赖问题的挫败感（[#2590](https://github.com/nanocoai/nanoclaw/issues/2590)：“I just hate Node apps… missing dependencies hell”），以及 setup 脚本静默发送 PostHog 遥测的不满（[#1819](https://github.com/nanocoai/nanoclaw/issues/1819)）。
- **负面（部署模型）**：家庭医疗/商业场景用户因 **fork 必须公开** 而对捆绑分发产生顾虑（[#1424](https://github.com/nanocoai/nanoclaw/issues/1424)）。
- **负面（更新机制）**：用户自定义 adapter 在

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-03

## 1. 今日速览

过去 24 小时项目活跃度较低，且呈现明显的积压特征：6 条 Issue 更新与 3 条 PR 更新**均非新提交**，全部创建于 2026-03-26，于 10 月 2 日被 stale 机制标记或状态刷新，而非实质性的新讨论或新代码贡献。3 条 PR 中仅 1 条仍保持开放（#908 MCP 命令注入安全修复），其余 2 条已被关闭且无合并迹象。无新版本 Release。整体来看，项目在近 6 个月缺乏维护者响应，安全修复与用户反馈均处于滞压状态，项目健康度存在隐忧。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

**今日无 PR 被合并**，项目代码无实质推进。

| PR | 状态 | 说明 |
|---|---|---|
| [#908](https://github.com/netease-youdao/LobsterAI/pull/908) fix(mcp): validate stdio command to prevent command injection | **OPEN** | 该 PR 修复 MCP Server stdio command 字段无校验导致的任意命令注入漏洞，是当前唯一仍在开放的安全修复，但已滞留超半年 |
| [#909](https://github.com/netease-youdao/LobsterAI/pull/909) fix(security): require user confirmation when skill security scan fails | CLOSED | 安全扫描异常时静默安装的问题修复，已被 stale 机制关闭，**未合并** |
| [#911](https://github.com/netease-youdao/LobsterAI/pull/911) fix(auth): encrypt auth tokens at rest using safeStorage | CLOSED | 认证 token 明文存储安全问题修复，已被 stale 机制关闭，**未合并** |

需要特别指出的是，[#909](https://github.com/netease-youdao/LobsterAI/pull/909) 和 [#911](https://github.com/netease-youdao/LobsterAI/pull/911) 均为安全相关修复，但它们没有被合并而是被 stale 机器人关闭——这意味着项目可能错失了两次安全加固的机会。目前唯一的希望是 #908 仍处于开放状态，但若无维护者介入，也存在被关闭的风险。

## 4. 社区热点

今日无高热度讨论（所有 Issue 评论数均为 1），以下 Issue 因涉及用户直接使用痛点而值得关注：

- [#906 SQLite 数据库保存存在数据丢失风险](https://github.com/netease-youdao/LobsterAI/issues/906) — 该问题直接指向数据安全性，虽评论不多，但性质严重，涉及用户核心资产（数据）的可靠性。
- [#900 定时任务改成每1小时1次，但却变成了1分钟一次](https://github.com/netease-youdao/LobsterAI/issues/900) — AI 助手对用户自然语言指令的理解偏差导致功能性错误，反映了当前 AI agent 在意图解析层面的不稳定。
- [#898 cherry studio更新重启会导致LobsterAI 网关断开](https://github.com/netease-youdao/LobsterAI/issues/898) — 第三方软件更新引发的集成故障，用户报告了典型的生态协同问题。

**背后诉求**：用户对 LobsterAI 的核心期待集中在「数据安全可靠」「AI 指令理解准确」「第三方工具集成稳定」三个维度。这些诉求在当前 Issue 中均有体现，但长期未得到维护方回应。

## 5. Bug 与稳定性

今日更新的 Bug 类 Issue 按严重程度排列（均无修复 PR 关联）：

| 严重程度 | Issue | 描述 | 是否已有 Fix PR |
|---|---|---|---|
| **高** | [#906](https://github.com/netease-youdao/LobsterAI/issues/906) | SQLite `save()` 使用 `fs.writeFileSync()` 无异常处理、无重试、无原子性保证，存在数据丢失与文件损坏风险 | 否 |
| **高（安全）** | [#908](https://github.com/netease-youdao/LobsterAI/pull/908) | MCP Server stdio command 无校验导致任意命令注入（渲染进程被攻陷后的提权路径） | 是，**待合并 6+ 个月** |
| **中** | [#898](https://github.com/netease-youdao/LobsterAI/issues/898) | cherry studio 更新重启导致网关断开，疑似端口 18789 被占用/屏蔽 | 否 |
| **中** | [#900](https://github.com/netease-youdao/LobsterAI/issues/900) | 定时任务间隔被 AI 误改为 1 分钟一次，与用户意图严重不符 | 否 |
| **中** | [#910](https://github.com/netease-youdao/LobsterAI/issues/910) | 飞书机器人定时任务无法推送消息，报错缺少 target chatId | 否 |
| **低** | [#886](https://github.com/netease-youdao/LobsterAI/issues/886) | CopyButton 中裸 `setTimeout` 导致组件卸载后触发 setState，产生 React warning | 否 |

其中 #906 和 #908 应当被优先处理——前者直接威胁用户数据安全，后者是已确认的攻击面。

## 6. 功能请求与路线图信号

| Issue | 需求 | 分析 |
|---|---|---|
| [#914](https://github.com/netease-youdao/LobsterAI/issues/914) | 支持记忆导入和导出（换机迁移与记忆分享） | 这是一个明确的功能需求，且实现复杂度不高（可复用现有 SQLite 导出/导入能力），适合在下一版本快速落地。若结合 #906 一并考虑，正好可同时改善数据可靠性及可移植性。 |

**路线图信号**：从现存 3 条 PR 均为安全修复来看，**安全加固**应是下一版本最该纳入的议题（MCP 命令注入校验、token 加密存储、技能扫描失败确认机制）。此外，[#914](https://github.com/netease-youdao/LobsterAI/issues/914) 代表的「记忆可移植性」是社区呼声较高的用户侧需求，建议与数据备份/数据迁移场景合并设计。

## 7. 用户反馈摘要

- **[#900](https://github.com/netease-youdao/LobsterAI/issues/900)（AI 理解偏差）：** 用户要求将定时任务从「每半小时」调整为「每 1 小时」，AI 确认执行成功，但实际回调变成了每 1 分钟一次。这暴露出 AI 对时间表达式的解析与校验存在严重缺陷，且调整后缺少二次确认机制，用户对 AI 执行准确性产生信任危机。
- **[#898](https://github.com/netease-youdao/LobsterAI/issues/898)（集成稳定性）：** 用户在 cherry studio 内更新软件后，LobsterAI 网关意外断开。用户猜测是端口冲突，但实际为第三方软件重启导致的联动问题。反映出网关对端口占用缺乏检测与自动恢复能力。
- **[#910](https://github.com/netease-youdao/LobsterAI/issues/910)（IM 推送问题）：** 配置飞书机器人后，普通对话正常但定时任务无法推送。错误信息显示系统错误地要求提供 chatId 格式，用户在配置时缺少明确的引导信息，配置成本较高。
- **[#914](https://github.com/netease-youdao/LobsterAI/issues/914)（记忆迁移痛点）：** 用户换机后无法导入原有记忆数据，说明当前记忆功能没有导入导出通道，阻碍了多设备使用场景。

整体来看，用户对 LobsterAI 的功能方向是认可的，但在「AI 执行准确性」「数据可靠性」「配置友好度」三方面有明显吐槽。

## 8. 待处理积压

以下 Issue/PR 均已停滞超过 6 个月（创建于 2026-03-26，于 2026-10-02 被 stale 标记），需维护者优先介入处理：

| 编号 | 类型 | 标题 | 停滞后状态 | 建议 |
|---|---|---|---|---|
| [#908](https://github.com/netease-youdao/LobsterAI/pull/908) | PR | fix(mcp): validate stdio command to prevent command injection | OPEN，待合并 | **最高优先级**，安全漏洞修复，应立即 review 并合并 |
| [#906](https://github.com/netease-youdao/LobsterAI/issues/906) | Issue | SQLite 数据库保存存在数据丢失风险 | OPEN，stale | 数据安全核心问题，应尽快出修复方案 |
| [#909](https://github.com/netease-youdao/LobsterAI/pull/909) | PR | fix(security): require user confirmation when skill security scan fails | CLOSED，未合并 | 安全修复不应被 stale 关闭，建议从关闭状态恢复并重新评估 |
| [#911](https://github.com/netease-youdao/LobsterAI/pull/911) | PR | fix(auth): encrypt auth tokens at rest using safeStorage | CLOSED，未合并 | token 加密属基础安全能力，应恢复合并 |
| [#886](https://github.com/netease-youdao/LobsterAI/issues/886) | Issue | CopyButton 中使用裸 setTimeout | OPEN，stale | 低风险技术债，可顺手修复 |
| [#898](https://github.com/netease-youdao/LobsterAI/issues/898) | Issue | cherry studio 更新导致网关断开 | OPEN，stale | 生态集成问题，建议确认并修复 |
| [#900](https://github.com/netease-youdao/LobsterAI/issues/900) | Issue | 定时任务间隔被 AI 误改 | OPEN，stale | AI 意图解析核心缺陷，影响核心体验 |
| [#910](https://github.com/netease-youdao/LobsterAI/issues/910) | Issue | 飞书机器人定时任务无法推送 | OPEN，stale | 需提供明确的配置引导，或修复目标识别逻辑 |
| [#914](https://github.com/netease-youdao/LobsterAI/issues/914) | Issue | 支持记忆导入和导出 | OPEN，stale | 低实现成本功能，可纳入近期迭代 |

---

**一句话总结**：LobsterAI 社区活跃度低，但遗留问题密度高——2 个安全修复 PR 被关闭、1 个安全修复 PR 滞留半年未合并、6 个用户 Issue 全部 stale，项目亟需维护者进行一次集中清理和版本迭代，以恢复社区信心。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目日报 — 2026-10-03

## 1. 今日速览

过去 24 小时 CoPaw 保持高活跃度：13 条 Issue 更新（全部为新增/活跃状态）、12 条 PR 更新，其中 7 条 PR 已合并/关闭、5 条待合并，未发布新版本。社区讨论集中在聊天历史记录容量、消息编辑/撤回以及移动端适配三大诉求上。功能性 PR 合入主要集中在桌面端体验改善和 MCP 配置灵活性方面。整体项目健康度良好，但新开 Issue 当日关闭数为 0，部分长期积压（如移动端适配）需关注。

## 2. 版本发布

无。

## 3. 项目进展

今日共有 7 条 PR 被关闭/合并，均由 @AaronZ345 提交并于今日完成合入，主要集中在以下方面：

**桌面端体验提升**
- [PR #6877 feat(desktop): remember window geometry](https://github.com/agentscope-ai/QwenPaw/pull/6877) — 持久化 Tauri 桌面窗口的位置与尺寸，下次启动自动恢复，刻意排除可见性/最小化/最大化等状态。
- [PR #7356 feat(console): add chat scroll lock](https://github.com/agentscope-ai/QwenPaw/pull/7356) — 新增聊天滚动锁定，避免流式输出时视口强制跟随，用户可自由阅读历史内容。
- [PR #7347 fix: keep rich input caret visible](https://github.com/agentscope-ai/QwenPaw/pull/7347) — 修复富文本输入框在长内容下光标被编辑器视口截断的问题。

**聊天界面可用性**
- [PR #7357 feat(chat): add tool call visibility toggle](https://github.com/agentscope-ai/QwenPaw/pull/7357) — 增加工具调用卡片显隐切换，减少长对话中调试信息的视觉噪音。

**Provider 与 MCP 配置**
- [PR #7359 feat(providers): expose per-media inline caps](https://github.com/agentscope-ai/QwenPaw/pull/7359) — 为 provider 增加图片/视频/音频内联媒体容量上限配置，修复 #7201。
- [PR #6874 feat(mcp): add configurable tool call timeout](https://github.com/agentscope-ai/QwenPaw/pull/6874) — 新增 MCP 工具调用超时配置（默认 300 秒），兼容旧版 `timeout` 键。

**文件查看器**
- [PR #7344 feat(console): support game-dev file languages](https://github.com/agentscope-ai/QwenPaw/pull/7344) — Console 文件查看器新增 C# 脚本、Shader 等游戏开发常用语言的高亮支持，修复 #7068。

此外，当前有 5 条待合并 PR 值得关注，其中 [PR #8084 fix(agents): refuse oversized prompts...](https://github.com/agentscope-ai/QwenPaw/pull/8084) 解决了超长 prompt 导致模型静默返回空回复的问题，[PR #8079 fix(app): notify the room...](https://github.com/agentscope-ai/QwenPaw/pull/8079) 修复了 reload 超时后房间无通知、in-flight 任务被强行关闭的问题。

## 4. 社区热点

**#7884 聊天历史记录容量问题（8 条评论）**
[链接](https://github.com/agentscope-ai/QwenPaw/issues/7884)

用户 @happieme 明确表达不满，称讨论过的问题"回头看就看不到了"，并直接质问"知道这个体验多差么"。该 Issue 创建于 9 月 19 日，持续两周仍无官方回应，是当前情绪最强的社区声音。

**#7997 消息编辑/撤回与工作区回滚（8 条评论）**
[链接](https://github.com/agentscope-ai/QwenPaw/issues/7997)

用户希望在 WebUI 中编辑或撤回已发送消息，并自动截断后续对话历史、可选回滚文件快照。这反映了用户对上下文可控性的强烈需求，评论区大概率在讨论实现边界与风险评估。

**#6281 Web 控制台适配移动端（6 条评论）**
[链接](https://github.com/agentscope-ai/QwenPaw/issues/6281)

7 月 20 日创建，持续呼吁移动端适配。值得注意的是，今日恰好有 [PR #8086](https://github.com/agentscope-ai/QwenPaw/pull/8086) 将设置导航改为移动端抽屉样式，说明社区诉求正逐步被开发侧响应。

## 5. Bug 与稳定性

按严重程度排序：

**高 — #8088 图片路由至 chat_with_image 后陷入 Bash+PIL 裁剪循环，最终静默取消**
[链接](https://github.com/agentscope-ai/QwenPaw/issues/8088)

用户发送含图片消息时，无视觉能力的默认 agent 将任务转发给 `chat_with_image` 子代理，后者不直接查看图片，而是通过 Bash+PIL 把图片裁成几十个瓦片反复处理，最后被静默取消且无任何回复。当前无对应 fix PR。影响：功能性阻断，用户得不到任何反馈。

**高 — #8073 V2.2.2.beta4 对话页无法打开（局域网访问时）**
[链接](https://github.com/agentscope-ai/QwenPaw/issues/8073)

从 V2.2.1 升级到 V2.2.2.beta4 后，局域网其他设备访问本地服务时 Chat 页面报错无法打开，本机访问正常，疑似与跨设备请求路径或 CSP 配置有关。无对应 fix PR，beta 版本质量问题需优先确认。

**中 — #8078 跨会话消息（chat_with_agent）被注册为独立 chat，同一 session 对话分裂为多个页面**
[链接](https://github.com/agentscope-ai/QwenPaw/issues/8078)

由用户口述、AI 协助调查整理，证据为本地实测。`chat_with_agent` 产生的消息被注册为独立 chat，导致 UI 中同一 session 的对话被拆散为多个页面，存在数据一致性问题。

**中 — #8077 Qoder 第三方代理：自定义模型不可见/不可用，上下文仪表盘隐藏（3 个缺陷）**
[链接](https://github.com/agentscope-ai/QwenPaw/issues/8077)

`harnesses.py` 丢弃了 backend 相关参数导致自定义模型失效；另一个缺陷导致所有第三方后端都看不到 context-usage 仪表盘。作者指出均为 QwenPaw 侧问题，与 Qoder CLI 无关。

**低 — #8085 输出截断时 finish_reason="length" 被静默丢弃**
[链接](

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*