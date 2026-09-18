# OpenClaw 生态日报 2026-09-18

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-18 02:02 UTC

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

# 个人 AI 助手 / 自主智能体开源生态横向对比分析报告（2026-09-18）

## 1. 生态全景

过去24小时，个人AI助手/智能体开源生态整体高度活跃，除 TinyClaw、EasyClaw 无动态外，其余9个项目均有实质性更新，其中高活跃项目（PR+Issue 更新超20条）占比过半。生态当前聚焦于**会话/任务可靠性**、**多渠道体验**、**可插拔网关架构**和**安全加固**四大议题，并出现大量并发正确性、上下文管理类 bug 修复。项目间分化明显：核心平台与外围衍生项目形成梯队，部分项目进入快速迭代期，另一部分进入质量巩固期；同时，社区对“开箱即用”的依赖（安装、构建、渠道配置）表现出强烈敏感，发布质量保障已成为普遍痛点。

## 2. 各项目活跃度对比

| 项目 | Issue 更新数 | PR 更新数 | Release | 健康度评估 |
|------|-------------|-----------|---------|-----------|
| OpenClaw | 数据缺失 | 数据缺失 | 数据缺失 | ⚠️ 摘要生成失败，无法评估 |
| NanoBot | 4（2新开/活跃，2关闭） | 16（7合并/关闭，9待合并） | 无 | 健康；修复密集，社区反馈闭环快 |
| Zeroclaw | 50（41新开/活跃，9关闭） | 50（6合并/关闭，44待合并） | 无 | 活跃度高，但维护者合并带宽成瓶颈 |
| PicoClaw | 1（关闭） | 14（1重要合并，5自动关闭，7待合并） | 无 | 稳定；依赖更新有积压，功能推进趋缓 |
| NanoClaw | 1（关闭） | 17（4合并/关闭，13待合并） | 无 | 活跃；大型网关重构打磨中 |
| IronClaw | 1（自动分类报告） | 0 | 无 | 低活跃；进入维护/数据积累期 |
| LobsterAI | 5（2新开/活跃，3关闭） | 18（13合并/关闭，5待合并） | 无 | 高活跃；发布后迭代，安全项待解决 |
| TinyClaw | 0 | 0 | 无 | 无活动 |
| Moltis | 2（1功能，1构建缺陷） | 2（待合并） | 无 | 中等；维护者响应速度滞后 |
| CoPaw | 20（19活跃，1关闭） | 40（16合并/关闭，24待合并） | 无 | 高活跃；Bug密集，事件循环/上下文问题突出 |
| ZeptoClaw | 5 | 6（2合并，4待合并） | 无 | 中高；安全响应及时，CI移除有隐患 |
| EasyClaw | 0 | 0 | 无 | 无活动 |

**注**：Issue/PR 数量为过去24小时 GitHub 记录中的更新总数（含新开、关闭、合并、评论触发等）。

## 3. OpenClaw 在生态中的定位

由于本次日报中 OpenClaw 摘要生成失败，缺乏直接数据，但可从生态结构中间接推断其地位：

- **核心参照**：生态内大量项目名称衍生自“Claw”（如 Zeroclaw、PicoClaw、NanoClaw、IronClaw、TinyClaw、EasyClaw、ZeptoClaw），且多个项目（LobsterAI、NanoClaw）明确围绕 openclaw 网关/运行时构建，说明 OpenClaw 已形成基础平台效应。
- **技术路线辐射**：子项目在 OpenClaw 基础上向不同方向演进——L

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-18

## 今日速览

过去 24 小时 NanoBot 项目保持高活跃度：共产生 16 条 PR 更新（7 条已关闭/合并、9 条待合并），4 条 Issue 更新（2 条新开/活跃、2 条已关闭）。今日无新版本发布。值得关注的是，一批围绕会话并发安全、数据完整性和渠道体验的修复 PR 批量落地（含 1 条 P1 级回归修复），同时出现了针对 QQ 串会话的新 Bug 报告，以及 Telegram/Discord 渠道体验增强类 PR，整体呈现"修复密集、功能活跃"的健康发展态势。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日有 7 条 PR 关闭/合并，集中在 Bug 修复与稳定性加固方向，对项目健康度有实质提升：

- **[P1] fix(agent): serialize and batch per-session messages**（#5792，@chengyongru）— 合并/关闭。修复会话消息并发写入导致的数据丢失/交错问题，引入统一 FIFO 收件箱与单一 session worker，消除启动期特殊执行路径。这是今日最高优先级的回归修复，直接提升多会话场景下的可靠性。 [链接](https://github.com/HKUDS/nanobot/pull/5792)

- **[P2] fix(channels): drop compaction notices on channels without an in-place affordance**（#5799，@AlfredChaos）— 合并/关闭。修复 QQ 渠道自动压缩通知无法折叠/撤回的问题，直接回应 #5784。 [链接](https://github.com/HKUDS/nanobot/pull/5799)

- **[P2] fix(memory): preserve full consolidation input**（#5379，@dajiaohuang）— 合并/关闭。修复 consolidation 截断输入后游标仍前进导致的数据丢失问题，呼应 #5377。 [链接](https://github.com/HKUDS/nanobot/pull/5379)

- **[P2] fix(api): require boolean stream values**（#5765，@FanouZeng-TT）— 合并/关闭。OpenAI 兼容端点对 `stream` 字段改为严格布尔校验，修复 `"stream": "false"` 误触发 SSE 模式的问题。 [链接](https://github.com/HKUDS/nanobot/pull/5765)

- **[P2] fix(cron): reject conflicting schedule fields**（#5766，@FanouZeng-TT）— 合并/关闭。cron 工具不再静默丢弃冲突的调度字段，改为直接拒绝。 [链接](https://github.com/HKUDS/nanobot/pull/5766)

- **[P2] fix(cron): reject past one-time schedules**（#5762，@FanouZeng-TT）— 合并/关闭。拒绝 `at` 值为过去时间的定时任务，避免出现永不触发的"幽灵"任务。 [链接](https://github.com/HKUDS/nanobot/pull/5762)

- **fix(webui): hide model details until AI setup is complete**（#5802，@Re-bin）— 合并/关闭。修复 WebUI 在模型未配置完成时泄露默认模型/provider 信息的问题。 [链接](https://github.com/HKUDS/nanobot/pull/5802)

项目整体在会话数据一致性、cron 可靠性、API 兼容性和渠道体验四个维度均有明显加固。

---

## 社区热点

今日讨论最活跃的 Issue 集中在**数据完整性与渠道体验**两个方向：

1. **#5377 [已关闭] consolidation 截断导致数据丢失**（3 条评论）— 该问题详细描述了 `Consolidator.archive()` 截断输入但游标仍前进的矛盾行为，引发了对内存压缩机制的正确性讨论。关联修复 PR #5379 已在今日合并，问题闭环。 [链接](https://github.com/HKUDS/nanobot/issues/5377)

2. **#5784 [已关闭] QQ 渠道自动压缩通知噪音**（2 条评论）— 用户自托管的 QQ 渠道中，"Compressing context…"和"Context compacted."两条通知以不可折叠的独立消息形式出现在聊天窗口。该问题引出了"渠道能力差异"的深层次讨论——QQ API 没有编辑/撤回端点，需要渠道层面的适配策略。PR #5799 今日已修复。 [链接](https://github.com/HKUDS/nanobot/issues/5784)

3. **#5459 [开放中] Vertex AI provider 支持请求**（1 条评论）— 作为功能请求已积累一定讨论，用户希望为 Claude 模型增加 Google Vertex AI 一等公民支持。目前尚无对应 PR，值得持续关注。 [链接](https://github.com/HKUDS/nanobot/issues/5459)

---

## Bug 与稳定性

按严重程度排序，今日活跃的 Bug 类问题如下：

**P1（高严重度）**

- **会话消息并发写入串扰**（#5792 对应修复）— 回归问题，已由 PR #5792 修复（今日合并）。两个并发会话可能交错写入同一 session 文件，导致字节交错或静默丢失更新。 [修复 PR](https://github.com/HKUDS/nanobot/pull/5792)

**P2（中严重度）**

- **Consolidation 截断导致上下文数据丢失**（#5377，已关闭）— 格式化对话被截断到 token 预算后，游标仍越过完整批次前进，导致消息/后缀永久丢失。PR #5379 今日已修复。 [Issue](https://github.com/HKUDS/nanobot/issues/5377) | [修复 PR](https://github.com/HKUDS/nanobot/pull/5379)

- **QQ 渠道压缩通知不可折叠**（#5784，已关闭）— 影响自托管 QQ 用户体验。已由 PR #5799 修复，方案为在无内联操作能力的渠道上丢弃压缩通知。 [Issue](https://github.com/HKUDS/nanobot/issues/5784) | [修复 PR](https://github.com/HKUDS/nanobot/pull/5799)

- **`"stream": "false"` 被当作 truthy 值**（#5765 对应修复）— API 兼容性 bug，已修复。 [修复 PR](https://github.com/HKUDS/nanobot/pull/5765)

- **会话 checkpoint 丢失**（#5801 对应修复，PR 开放中）— 进行中的 turn 分配 session handle 时重写主 JSONL 元数据，导致 checkpoint 覆盖层被误判为过时，重启后丢失工具结果和 provider 状态。已有 PR #5801 提交修复。 [修复 PR](https://github.com/HKUDS/nanobot/pull/5801)

**未分级（新报告）**

- **回复串会话问题**（#5798，[开放中]）— Windows + Python 3.12 + nanobot 0.3.5，用户报告一个会话运行时，其他会话的消息会被该运行中的会话"抢答"。用户明确表示 0.3.0 无此问题，疑似回归。目前尚无 fix PR，需要维护者复现和定位。 [链接](https://github.com/HKUDS/nanobot/issues/5798)

---

## 功能请求与路线图信号

今日活跃的功能类 PR 与请求：

| 功能需求 | 相关 PR/Issue | 状态 | 路线图判断 |
|---------|--------------|------|-----------|
| **Telegram 渠道体验增强**（富文本换行、topic_id 暴露到 `my` 工具、输入状态感知 topic） | #5803（@wzrayyy） | 待合并 | 小步快跑的渠道优化，审阅成本低，有望近期合入 |
| **Discord replyToMessage 功能**（对齐 Telegram 的回复行为） | #5800（@ZedingZhang） | 待合并 | 渠道一致性方向，附带配置项和文档更新，信号积极 |
| **OpenRouter 原生图像生成 API 支持** | #5718（@kkkhoo） | 待合并 | OpenRouter 服务端已提供 Images API，属于生态跟进型需求 |
| **Google Vertex AI provider（Claude 模型）** | #5459（@xuayan-nokia） | 开放中，无 PR | 用户明确诉求，但尚无实现信号；参考现有 Bedrock/Copilot provider 架构，实现成本可控 |
| **WebUI provider 删除控制** | #5352（@bingqilinweimaotai） | 待合并（已 1 个多月） | 配置管理能力补全，附带防误删保护逻辑，路线图价值较高 |
| **工具执行进度事件流式推送** | #5562（@Shuxiabit） | 待合并（有冲突） | 面向 OpenAI 兼容流式端点的增强，对 agent 可观测性有较大价值，需解决冲突后合入 |
| **推理内容绑定到最近一轮 assistant turn 回放** | #5611（@HUAN2022A） | 待合并（有冲突） | 优化 token 消耗，修复跨轮推理内容重复回放问题 |

**路线图信号**：今日无破坏性变更或架构级决策。渠道体验对齐（Telegram/Discord）与 provider 生态扩展（OpenRouter/Vertex AI）是当前两个明确的演进方向。

---

## 用户反馈摘要

从今日活跃的 Issues 评论中可提炼以下真实用户声音：

- **QQ 自托管用户对"噪音消息"敏感**（#5784）：用户 AlfredChaos 明确表达了不满——压缩通知已经属于 #5719 同一类噪音，且 QQ 渠道无法折叠这些消息。这说明用户对渠道原生交互习惯有较高期待，也反映 Nanobot 需要更细粒度的渠道能力感知。 [链接](https://github.com/HKUDS/nanobot/issues/5784)

- **Windows 用户遇到会话上下文串扰**（#5798）：用户反馈"一个会话正在运行时，在其他会话的交流会跑到第一个会话里回复"，并明确标注"0.3.0 没有这个问题"，指向 0.3.x 期间引入的回归。这是典型的稳定性信任危机点，需要尽快响应。 [链接](https://github.com/HKUDS/nanobot/issues/5798)

- **内存压缩机制的正确性受到关注**（#5377）：用户 dajiaohuang 对 consolidation 截断逻辑与游标推进的一致性做了深入调查，显示社区用户已在主动分析内部实现。这类反馈对项目质量提升很有价值。 [链接](https://github.com/HKUDS/nanobot/issues/5377)

整体来看，用户对并发正确性和渠道体验的诉求最为强烈。

---

## 待处理积压

以下为长期未闭合的重要 PR/Issue，提醒维护者关注：

**长期未合并 PR（按等待时长排序）**

1. **#5152 fix(subagent): mark partial completion results**（@yu-xin-c，7 月 28 日创建，已开放 52 天）— 修复子智能体部分完成结果标记，涉及父 turn 待完成任务的计数逻辑。无 conflict 标签，但长时间未合入，建议维护者安排评审。 [链接](https://github.com/HKUDS/nanobot/pull/5152)

2. **#5352 Add model provider removal controls**（@bingqilinweimaotai，8 月 12 日创建，已开放 37 天）— WebUI 功能补全，带完整测试和本地化文案，优先级 P2 但等待时间较长。 [链接](https://github.com/HKUDS/nanobot/pull/5352)

3. **#5562 feat(api): stream tool progress events**（@Shuxiabit，8 月 27 日创建，已开放 22 天，有 conflict 标签）— 功能价值明确（关闭 #3698），需要解决冲突后合入。 [链接](https://github.com/HKUDS/nanobot/pull/5562)

4. **#5611 feat(agent): bound reasoning replay to the latest assistant turn**（@HUAN2022A，8 月 30 日创建，

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-18

## 1. 今日速览

过去 24 小时项目活跃度极高：共更新 Issue 50 条（新开/活跃 41 条、关闭 9 条），PR 更新 50 条（待合并 44 条、已合并/关闭 6 条），无新版本发布。Issue 侧讨论热度集中在 RFC 流程改革、会话事件历史架构、以及一批图片标记相关的安全性 bug 上；PR 侧积压明显，44 条待合并 PR 中有多条 XL 规模的核心改动等待维护者审阅。整体判断：项目正处于密集的功能开发与安全加固并行期，社区讨论热烈，但维护者合并带宽可能成为瓶颈。

## 2. 版本发布

过去 24 小时无新版本发布。近期版本动态需关注 PR 队列中数个 XL 规模特性合入后的版本规划。

## 3. 项目进展

今日 PR 队列中可见合并/关闭 6 条，展示列表中唯一状态为 CLOSED 的 PR 为：

- **[#10618] feat(maintainers): surface approval carry-forward candidates** — 维护者工具改进，使 `second-core` 审查队列能识别更早的独立 Core 审批是否仍适用于当前 head，提高审批连续性判断效率。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10618

多个历史 Issue 今日关闭，反映相关修复已落地：

- **[#5269] [Bug]: validate and document the nix run installation path**（已关闭）— `cargo binstall zeroclaw` 安装路径的文档缺口已补上，用户提交的 operator-ux 类反馈得到闭环。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/5269
- **[#10292] ACP 会话工具无法列出或检查 Code 会话**（已关闭）— ACP/ZeroCode 会话可见性问题已解决，`sessions_list` 现在能正确返回 Code 会话。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10292
- **[#9882] Image markers bypass content validation on the run_model_query direct-dispatch seam**（已关闭）— 多模态内容校验缺口在 direct-dispatch 路径上已修复，安全加固向前一步。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9882
- **[#9370] ACP: near-live JSON-RPC transport smoke for deliver_file**（已关闭）— ACP 的 `deliver_file` 已获得近实时传输冒烟测试覆盖，测试基础设施继续完善。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/9370
- **[#10883] Telegram media-group listener 测试超时**（已关闭，标记为重复）— 该问题被识别为 #10875 的重复项，说明 CI flaky 追踪正在归并管理。  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10883

整体来看，今日关闭项主要落在文档、ACP 工具能力、安全验证和测试覆盖四类，均为稳步前进型改进；但 44 条待合并 PR 中包括多条核心架构级改动（见“待处理积压”），项目前进步伐受限于维护者审阅速度

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-18

## 1. 今日速览

过去 24 小时 PicoClaw 仓库整体活跃度稳定：共 1 条 Issue 更新（已关闭）、14 条 PR 更新，其中 1 个重要功能 PR（Anthropic 原生 Messages API 协议支持）完成合并。值得关注的是，关闭的 6 个 PR 中有 5 个为 Dependabot 自动依赖更新，说明项目依赖维护自动化运转良好；同时 7 个待合并 PR 中有 4 个已打上 `stale` 标签，存在一定程度的积压趋势。合并的 `anthropic-messages` 协议支持是对社区长期诉求（Issue #269）的正式回应，标志着项目在多 LLM 提供商兼容性上又迈出一步。

## 2. 版本发布

过去 24 小时无新版本发布（最新 Releases 为空）。合并的 PR 内容预计将随下一个版本发布。

## 3. 项目进展

**今日核心合并：**

- [PR #1158: feat: add anthropic-messages protocol for native Anthropic API format](https://github.com/sipeed/picoclaw/pull/1158) — 该项目自 2026-03-06 发起、经约 6 个月迭代后于今日合并。新增 `anthropic-messages` 协议前缀，支持 Anthropic 原生 `/v1/messages` API 格式，解决了许多 Anthropic 兼容代理服务只支持原生 API 而无法使用的问题（Fixes #269）。对于依赖 Anthropic 生态网关的用户，该合并将显著拓宽可用服务商范围。

**已关闭的维护类 PR：**

- 5 个 Dependabot 依赖更新 PR 关闭（非合并）：[#3360](https://github.com/sipeed/picoclaw/pull/3360)（larksuite oapi-sdk-go v3.9.4→3.11.0）、[#3361](https://github.com/sipeed/picoclaw/pull/3361)（protobuf 1.36.11→1.36.12）、[#3364](https://github.com/sipeed/picoclaw/pull/3364)（aws-sdk-go-v2 1.42.0→1.45.1）、[#3362](https://github.com/sipeed/picoclaw/pull/3362)（golang.org/x/term 0.44.0→0.45.0）、[#3363](https://github.com/sipeed/picoclaw/pull/3363)（ergochat/irc-go 0.6.0→0.7.0）—— 均标注为 `stale` 后关闭，可能是自动化流程或手动清理的结果。这些依赖更新值得在后续手动验证后重新提交。

**待合并的重要路线图 PR 信号：**

- [PR #3376: fix(deltachat): initialize as custom channel to solve config validation error](https://github.com/sipeed/picoclaw/pull/3376) — 修复 deltachat 频道配置校验失败问题（引用 #3265），将 deltachat 注册为自定义频道类型，属于对既有功能的补全修复。
- [PR #3381: feat: Switch Openai to responses API](https://github.com/sipeed/picoclaw/pull/3381) — 将 OpenAI provider 切换到新的 Responses API，处于早期评审阶段。

## 4. 社区热点

过去 24 小时最受关注的是：

- [Issue #3349: QQ频道无法正常使用](https://github.com/sipeed/picoclaw/issues/3349) — 该 Issue 创建于 8 月 30 日，累计获得 5 条评论，今日以 `stale` 身份被关闭。用户反馈在 Docker 和 Linux x86 版本中均无法连接 QQ 频道，网关报错 `failed to get websocket info: code:401`，核心原因是请求头 Authorization 参数格式错误（错误码 11241）。该问题涉及中国用户量巨大的 QQ 平台，用户诉求强烈，虽因长时间无活跃被打上 stale 标记，但背后反映的是对国内 IM 渠道稳定接入的需求，建议维护者关注其是否真正解决。

## 5. Bug 与稳定性

过去 24 小时无新 Bug 类 Issue 报告，仅有 1 个历史 Bug 被 stale 关闭。待合并的 PR 中包含两个稳定性修复：

| 严重程度 | Issue/PR | 描述 | 修复状态 |
|---------|----------|------|---------|
| 中 | [PR #3358: fix(agent): thread responses to the originating question message](https://github.com/sipeed/picoclaw/pull/3358) | 群聊中普通 @mention 触发的回答未关联原消息，导致答案与问题在视觉上脱节 | 待合并（stale） |
| 低 | [PR #3353: fix(channels): bound tool feedback animations](https://github.com/sipeed/picoclaw/pull/3353) | Tool 反馈动画可能因生命周期清理遗漏无限持续编辑频道消息，修复为 5 分钟上限及首次编辑出错即停止 | 待合并（stale） |

另注意 [Issue #3349](https://github.com/sipeed/picoclaw/issues/3349)（QQ 频道 401 错误）虽被关闭，但无明确的 fix PR 关联，存在再次复现或被用户重新提起的风险。

## 6. 功能请求与路线图信号

从当前待合并与已合并 PR 中可提炼出以下路线图信号：

- **多 LLM 协议兼容深化**：[PR #1158](https://github.com/sipeed/picoclaw/pull/1158) 合并（Anthropic 原生协议）+ [PR #3381](https://github.com/sipeed/picoclaw/pull/3381)（OpenAI Responses API）表明项目正持续扩展对主流 LLM 服务商协议栈的适配，这一方向大概率继续推进。
- **MCP 生态扩展**：[PR #3368](https://github.com/sipeed/picoclaw/pull/3368)（Parallel Search MCP 配置示例）由外部贡献者提交，说明 MCP 生态正在吸引第三方开发者，且项目对 Web 搜索能力的接入保持开放态度。
- **远程/移动端控制**：[PR #3344](https://github.com/sipeed/picoclaw/pull/3344) 计划添加 Build Remote Agent 手机配对能力（gbr/1 协议），允许手机旁观桌面 Agent，代表个人 AI 助手跨设备场景的尝试，但该 PR 已积压近一个月，优先级可能较低。
- **DeltaChat 功能完善**：[PR #3222](https://github.com/sipeed/picoclaw/pull/3222)（deltachat 重构，清理 200 行代码）+ [PR #3376](https://github.com/sipeed/picoclaw/pull/3376)（deltachat 配置修复）表明该项目在持续完善 DeltaChat 频道的成熟度，重构方向是精简旧特性、强化 JSON-RPC 密钥管理。

## 7. 用户反馈摘要

从当日活动的 Issue 评论中可提炼出以下用户声音：

- **QQ 频道接入是硬需求**：用户（@bxwl5）明确表示已测试 Docker 和 Linux x86 两种部署方式，均遇到 401 认证失败。说明 QQ 频道是用户部署 PicoClaw 的重要目标平台，而配置门槛（或代码缺陷）正在阻碍真实使用。
- **群聊体验影响感知**：[PR #3358](https://github.com/sipeed/picoclaw/pull/3358) 反映的场景描述了在繁忙群聊中，机器人回答与用户提问消息不关联时，会严重影响对话可读性，属于真实使用中的体验痛点。
- **外部生态合作的积极信号**：Parallel Search 贡献者（@georgeatparallel）主动提交配置文档 PR，说明有商业服务方愿意为 PicoClaw 用户提供开箱即用的集成方案，社区生态呈现良性互动。

## 8. 待处理积压

当前积压时间较长且值得维护者关注的 PR 如下：

| PR | 创建时间 | 积压时长 | 说明 |
|----|---------|---------|------|
| [#3222 refactor(deltachat): cleanup implementation](https://github.com/sipeed/picoclaw/pull/3222) | 2026-07-03 | 2.5 个月 | 大量 deltachat 功能精简与文档更新，属于较大规模重构，建议明确是否纳入近期里程碑 |
| [#3344 Add Build Remote Agent phone pairing](https://github.com/sipeed/picoclaw/pull/3344) | 2026-08-23 | 26 天 | 新功能（远程配对），需评估与现有架构的契合度 |
| [#3353 fix(channels): bound tool feedback animations](https://github.com/sipeed/picoclaw/pull/3353) | 2026-08-31 | 18 天 | 稳定性修复，代码量小，风险低，建议优先评审合并 |
| [#3354 feat(irc): assemble IRCv3 multiline messages](https://github.com/sipeed/picoclaw/pull/3354) | 2026-08-31 | 18 天 | IRCv3 多行消息支持，与 IRC 频道体验相关 |
| [#3358 fix(agent): thread responses](https://github.com/sipeed/picoclaw/pull/3358) | 2026-09-01 | 17 天 | 群聊场景修复，提升使用体验明显 |
| [#3376 fix(deltachat): initialize as custom channel](https://github.com/sipeed/picoclaw/pull/3376) | 2026-09-10 | 8 天 | 修复 deltachat 配置校验错误，中等优先级 |

整体来看，项目近期功能活跃度中等，合入节奏受 stale 机制和评审速度影响有所放缓。建议维护者优先处理 3 个带 `fix` 前缀的小型稳定性 PR，再评估两个较大的功能型 PR（#3222、#3344），以避免积压进一步扩大。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-18

## 1. 今日速览

过去 24 小时项目保持活跃，PR 更新达 17 条，其中 4 条已被合并/关闭（集中在安装体验与维护工具链），另有 13 条 PR 处于待合并状态，显示开发推进速度较快。Issue 侧仅 1 条更新（关闭），新开 Issue 为 0，说明用户侧反馈平稳，团队重心在于合并既有 PR 与推进功能落地。虽然暂无新版本发布，但多个大型网关重构 PR（#3815–#3825）持续更新，暗示下一版本可能包含架构层面的重要变化。整体项目健康度良好，社区讨论集中在容器运行时选择与网关架构演进方向。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

过去 24 小时共有 4 条 PR 被合并或关闭，主要集中在安装流程修复和开发工具链完善：

- **[#3844] fix(setup): replace broken sudo retry with user-owned npm prefix fallback**（已合并，2026-09-16 创建）— 修复了 Linux 系统包安装 Node.js（如 Fedora/Debian/Ubuntu）时 `setup.sh` 的 pnpm 安装永久失败问题。此前 sudo 重试机制在 distro 包环境下会因 `EACCES` 反复失败，现改为用户级 npm prefix 回退方案。[链接](https://github.com/nanocoai/nanoclaw/pull/3844)

- **[#3847] fix(setup): enable corepack pnpm in ~/.local/bin when the global bin dir is read-only**（已合并，2026-09-17 创建）— 继续加固安装流程，解决 `corepack enable` 在 `/usr/bin` 只读环境下无法写入 symlink 导致的引导过程无限挂起问题，现降级到 `~/.local/bin`。[链接](https://github.com/nanocoai/nanoclaw/pull/3847)

- **[#3846] feat(skills): add /add-typesafe-tool and the maintainer agent template**（已关闭，2026-09-17 创建）— 添加 TypeSafe Jev 决策模型作为容器工具，并新增 `maintainer` agent 模板。注意：同日另有一个开放 PR [#3848] 提交了相同功能，推测为该 PR 被关闭后重新提交（可能为分支调整或审查后重开）。[链接](https://github.com/nanocoai/nanoclaw/pull/3846) | [链接 #3848](https://github.com/nanocoai/nanoclaw/pull/3848)

- **[#3148] fix: honor WEBHOOK_PORT from .env**（已关闭，2026-07-28 创建）— 修复 webhook 端口配置优先级问题，现在遵循"进程环境变量 > .env > 默认 3000"的标准优先级顺序，关闭了 issue #2901。[链接](https://github.com/nanocoai/nanoclaw/pull/3148)

此外，**[#3849] fix(opencode): recover from a history the model refuses to serialize** 于昨日新开并处于开放状态，它解决 Gemini 严格 turn 顺序导致的历史会话恢复失败问题，值得关注。[链接](https://github.com/nanocoai/nanoclaw/pull/3849)

整体来看，项目在安装体验的健壮性上做了集中修补，同时维护者工具链（TypeSafe 决策模型）也在迭代中。大型网关架构重构系列 PR（#3815、#3816、#3817、#3818、#3825）持续更新未合并，说明这是一个仍在打磨的重磅特性。

## 4. 社区热点

- **[#957] [CLOSED] Suggest supporting Podman as an alternative to Docker**（11 条评论，8 个 👍）— 该项目于 2026-03-11 创建，长时间讨论后在 2026-09-17 关闭。虽已关闭，但它是过去 24 小时唯一有动态的 Issue，也是近期社区关注焦点。用户建议在文档中提及 Podman 作为 Docker 的替代方案，特别面向 macOS 和 Linux 用户。[链接](https://github.com/nanocoai/nanoclaw/issues/957)

热点分析：该 Issue 获得 8 个 👍 和 11 条评论，说明容器运行时替代方案在用户群中有一定共鸣。从关闭状态看，维护者可能已做出决定（或在其他渠道回应），但相关诉求仍可能在未来以文档更新或实验性支持的方式回归。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | 问题描述 | 状态 | 相关链接 |
|--------|----------|------|----------|
| 高 | Gemini 历史会话恢复时因 turn 顺序非法导致每次请求失败（`functionCall` 前无 `user`/`functionResponse` turn） | 已有修复 PR #3849（开放中） | [Issue/PR #3849](https://github.com/nanocoai/nanoclaw/pull/3849) |
| 中 | Linux 系统包安装 Node.js（非 nvm/homebrew）时，`setup.sh` pnpm 安装永久失败 | 已修复（PR #3844 已合并） | [PR #3844](https://github.com/nanocoai/nanoclaw/pull/3844) |
| 中 | Node 安装在 `/usr` 下（只读），`corepack enable` 导致引导进程无限挂起 | 已修复（PR #3847 已合并） | [PR #3847](https://github.com/nanocoai/nanoclaw/pull/3847) |
| 低 | Webhook 端口恢复测试中随机端口可能被占用，导致偶发 EADDRINUSE/ECONNREFUSED | 修复 PR #3803 待合并 | [PR #3803](https://github.com/nanocoai/nanoclaw/pull/3803) |
| 低 | systemd 服务在 per-home 加密系统上启用 linger 失败 | 修复 PR #2681 待合并（自 2026-06-03） | [PR #2681](https://github.com/nanocoai/nanoclaw/pull/2681) |
| 低 | channel attachments 未能以结构化 parts 传给 provider | 修复 PR #3156 待合并（自 2026-07-30） | [PR #3156](https://github.com/nanocoai/nanoclaw/pull/3156) |
| 待确认 | Codex/OpenCode 远程 MCP 集成配置路由未按 per-group 强制执行 | 修复 PR #3551/#3552 待合并（自 2026-08-26） | [PR #3551](https://github.com/nanocoai/nanoclaw/pull/3551) / [PR #3552](https://github.com/nanocoai/nanoclaw/pull/3552) |

## 6. 功能请求与路线图信号

- **[#957] Podman 支持**（已关闭）：明确的功能请求，希望文档中提及 Podman 作为 Docker 替代选项。虽已关闭，但结合 PR #3817（Iron Proxy gateway skill）来看，项目正在扩展容器/网关的部署灵活性，Podman 相关支持有望在后续版本以文档或配置的形式落地。[链接](https://github.com/nanocoai/nanoclaw/issues/957)

- **网关架构重构系列（强烈路线图信号）**：一组由 @zvi-fried 和 @glifocat 提交的系列 PR 正在同时推进——
  - **#3815** refactor(gateway): centralize the credential gateway contract — 统一凭证网关契约与审批生命周期。
  - **#3816** refactor(gateway): extract OneCLI into an installable skill — 将 OneCLI 拆分为可安装技能，适应多网关架构。
  - **#3817** feat(skills): add the Iron Proxy gateway — 新增 Iron Proxy 作为可选网关。
  - **#3818** feat(setup): select the gateway without changing provider login — 安装时可选网关而保持登录独立。
  - **#3825** feat(opencode): support authentication through Iron Proxy — OpenCode 通过 Iron 网关认证。

  这一系列 PR 横跨 setup、providers、skills、security 等多个核心模块，说明项目正朝"可插拔网关"架构演进，是下一版本的重要方向。[#3815](https://github.com/nanocoai/nanoclaw/pull/3815) | [#3816](https://github.com/nanocoai/nanoclaw/pull/3816) | [#3817](https://github.com/nanocoai/nanoclaw/pull/3817) | [#3818](https://github.com/nanocoai/nanoclaw/pull/3818) | [#3825](https://github.com/nanocoai/nanoclaw/pull/3825)

- **[#3845] feat(dashboard): add local monitoring dashboard**（新开，开放中）：新增本地监控面板，通过 `@nanoco/nanoclaw-dashboard` 包实现，添加了 `DASHBOARD_SECRET`/`DASHBOARD_PORT` 配置项。若被合并，将是一个面向运维体验的新功能。[链接](https://github.com/nanocoai/nanoclaw/pull/3845)

## 7. 用户反馈摘要

- **容器运行时诉求**：Issue #957 的用户反馈集中在 Docker 的替代需求，特别提到 macOS/Linux 上 Docke r Desktop 的许可与资源占用问题，希望项目在文档中至少提及 Podman 作为替代。虽然获得 8 个 👍，但该 Issue 已关闭，建议维护者考虑在文档中加入相关说明，或在 README 增加"替代运行时"章节以响应用户诉求。[链接](https://github.com/nanocoai/nanoclaw/issues/957)

- **安装体验痛点得到验证并修复**：PR #3844 和 #3847 分别从用户视角报告了 Linux 系统包 Node.js 环境下 `setup.sh` 的两个独立失败路径，维护者已快速合并修复。这说明安装脚本的兼容性测试用例覆盖到了 distro 包场景，是社区反馈到代码修复的正向循环。

## 8. 待处理积压

以下 PR 长期开放，建议维护者优先关注：

| PR | 主题 | 开放时长 | 状态 |
|----|------|----------|------|
| [#2681](https://github.com/nanocoai/nanoclaw/pull/2681) | fix(service): skip linger on per-home-encrypted systems | 自 2026-06-03（超 3 个月） | OPEN，已标 core-team |
| [#3156](https://github.com/nanocoai/nanoclaw/pull/3156) | fix(agent-runner): carry channel attachments to providers as structured parts | 自 2026-07-30（约 7 周） | OPEN，已标 core-team |
| [#3551](https://github.com/nanocoai/nanoclaw/pull/3551) / [#3552](https://github.com/nanocoai/nanoclaw/pull/3552) | enforce per-group MCP policy and OneCLI gateway routing | 自 2026-08-26（约 3 周） | OPEN，由 Codex 代写，涉及配置核心逻辑 |

其中 **#2681** 和 **#3156** 已开放超过 1 个月且带有 core-team 标签，属于已知 bug 修复但长时间未合并，可能存在技术分歧或需要补充审查资源。**#3803**（webhook 测试稳定性修复）也已开放 4 天，属于低风险测试修复，建议尽快合入以减少 CI 偶发失败。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-18

## 1. 今日速览

过去24小时内 IronClaw 项目活跃度较低：仅有 1 条 Issue 更新（#8101），无新 PR、无新版本发布。这条更新的 Issue 是每日自动生成的“失败分类”追踪报告，对 officeqa 基准测试中 35 个非通过任务进行了归因分析，结论指向模型自身质量问题而非项目代码缺陷。整体来看，项目处于平稳运行、无紧急事务的状态，自动化监控机制运转正常，但社区讨论和代码提交节奏明显放缓。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日无合并或关闭的 PR，没有代码层面的功能推进或修复被合入主干。值得注意的仅有 #8101 这一自动生成的基准失败分析，它属于项目持续运行的质量监控流程，虽不直接引入代码变更，但为后续模型适配和改进提供了数据支撑。项目今日整体向前推进的幅度有限，主要停留在监控与数据积累层面。

## 4. 社区热点

今日唯一活跃的 Issue 为 [#8101 [OPEN] Daily ironclaw failure taxonomy — 2026-09-17](https://github.com/nearai/ironclaw/issues/8101)，由 @pranavraja99 创建，目前无评论、无点赞。该 Issue 内容为标准的每日失败分类模板，核心信息是：officeqa 基准的 35 个非通过任务中，绝大多数属于真实模型质量问题（DeepSeek-V4-Flash 在相关任务上表现不佳）。虽然该 Issue 没有引发讨论，但它的持续存在反映了项目对基准测试失败原因的自动化追踪机制，暗示团队重视模型质量评估和回归分析，而非仅关注功能开发。

## 5. Bug 与稳定性

今日无用户报告的新 Bug、崩溃或回归问题。唯一值得关注的是 #8101 中提到的 35 个 officeqa 非通过任务，这些失败被归类为模型质量缺陷（DeepSeek-V4-Flash 的能力边界），而非 IronClaw 项目本身的代码缺陷。其严重程度为中等——不直接影响项目稳定性，但会制约 IronClaw 在特定办公问答场景下的端到端表现。目前尚无针对这些失败的 fix PR，可能需要在后续版本中优化模型调度或提示词适配策略。

## 6. 功能请求与路线图信号

今日无用户提交新的功能需求或路线图建议，也没有相关 PR 可供判断下一版本的候选特性。结合近期项目状态，IronClaw 更倾向于在现有架构下做质量优化和基准追赶，而非急于扩展新功能。未来版本的功能方向仍需等待更多社区输入或官方公告。

## 7. 用户反馈摘要

由于 #8101 没有任何评论，今日暂无来自社区的真实用户反馈可供提炼。从 Issue 内容看，项目方（或自动脚本）对基准失败原因的判断是“模型质量为主”，这本身侧面反映了当前系统的瓶颈在于底层模型而非工具链本身。若后续有开发者对此展开讨论，可能会围绕模型选择、prompt 工程或 fallback 策略展开。

## 8. 待处理积压

今日无长期未响应的关键 Issue 或 PR。不过 #8101 作为每日自动生成的追踪条目，其模式本身值得关注：这类模板化 Issue 如果长期无人互动，容易积累成噪声，建议维护者考虑将其转为自动化报告页面（如 dashboard）而非 Git Issue，以减少仓库噪音。当前无需紧急干预，但值得周期性回顾。

---

**项目健康度小结**：IronClaw 今日活跃度低，但自动化质量监控稳定运行，无紧急 Bug 或社区投诉。项目处于“维护与数据积累”阶段，真正的进展可能需要等待下一轮 PR 合入或版本发布才能显现。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-18

*数据范围：2026-09-17 至 2026-09-18（GitHub 记录）*

---

## 1. 今日速览

过去 24 小时项目保持高活跃度：共有 **5 条 Issue 更新**（2 条活跃/新开，3 条关闭）和 **18 条 PR 更新**（13 条合并/关闭，5 条待合并），无新版本发布。合并的 PR 集中于 openclaw 网关稳定性修复与 Cowork 体验改进，说明项目正处于密集的发布后迭代期。值得关注的是，安全类 Issue #1031（IPC 任意协议调用）仍处于开放状态，且多个 3 月的 PR 尚未合入，积压问题需要维护者关注。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

昨日合入的 PR 主要集中在 **openclaw 运行时稳定性** 与 **Cowork 交互体验** 两个方向，整体推进了 release/2026.9.16 的收尾工作。

### 发布与集成
- [PR #2699](https://github.com/netease-youdao/LobsterAI/pull/2699) — **Release/2026.9.16** 已关闭，整合了 renderer、docs、main、openclaw、cowork 多个模块的改动，是昨日主版本交付的汇聚点。
- [PR #2697](https://github.com/netease-youdao/LobsterAI/pull/2697) — PR 2692 的配套合并，已关闭。

### openclaw 稳定性修复（4 项）
- [PR #2698](https://github.com/netease-youdao/LobsterAI/pull/2698) — **修复陈旧网关锁所有者恢复**。遗留网关或迁移锁引用存活 PID 时，手动修复流程会被维护锁阻断；现在会在维护屏障内先核验锁所有者、恢复可确认的陈旧锁，再执行后续的快照/恢复/网关启动流程。
- [PR #2694](https://github.com/netease-youdao/LobsterAI/pull/2694) — **保护 IM 工作负载，防止配置恢复误判**。原生 IM 任务进入准备/运行阶段时尚未创建 ActiveTurn，配置恢复可能误判为空闲并重启网关；本次将 IM 生命周期证据纳入自动配置重启检查。
- [PR #2695](https://github.com/netease-youdao/LobsterAI/pull/2695) — **防止浏览器 DNS 错误导致网关重启**。Playwright 导航中的 DNS 错误被隔离在工具调用内，不再触发网关退出和重启。
- [PR #2691](https://github.com/netease-youdao/LobsterAI/pull/2691) — **修复飞书插件原生加载路径报错**（`exports is not defined in ES module scope`），使升级后飞书渠道可以正常注册。

### Cowork 体验改进
- [PR #2692](https://github.com/netease-youdao/LobsterAI/pull/2692) — **Cowork 活动指示器改进**。模型静默思考时，界面不再长期显示单一 "Thinking" 标签，而是轮换展示阶段词，并在流式内容输出后显示已完成步骤数，避免用户误以为任务停滞。
- [PR #2693](https://github.com/netease-youdao/LobsterAI/pull/2693) — **退出速度优化**。应用退出时立即隐藏所有窗口，同时轮询等待 Web 搜索技能服务实际退出，替代固定 2 秒等待。

---

## 4. 社区热点

### 最受关注 Issue：#1082 — 版本合规压力
[Issue #1082](https://github.com/netease-youdao/LobsterAI/issues/1082)（评论 2）是讨论热度较高的话题。用户 @baleli668 提出 package.json 中 `openclaw.version` 仍为 v2026.3.2，是否支持最新版本 openclaw，并引用了 **国家互联网应急中心要求更新到最新版本** 的合规背景。该 Issue 已被标记 stale 并关闭，但背后反映的是 **企业/政府用户对版本合规性的刚需**，可能源于监管要求而非单纯功能诉求。

### 深度技术讨论：#1088 / #1089 — 并发正确性
- [Issue #1088](https://github.com/netease-youdao/LobsterAI/issues/1088) — 用户 @xiangliqu 精确定位到 `prefetchChannelUserMessages` 异步回调未校验 turnToken，可能导致跨轮次消息污染。
- [Issue #1089](https://github.com/netease-youdao/LobsterAI/issues/1089) — 用户 @MaoQianTu 指出 `CoworkRunner.startSession/continueSession` 缺少重入保护，并发调用导致流式消息损坏和重复。

这两个 Issue 均已关闭（可能已在 release/2026.9.16 中修复），但高质量的用户根因分析体现了社区中 **有经验的开发者深度参与**，值得项目组维护与感谢。

---

## 5. Bug 与稳定性

按严重程度排列：

### 高危：安全漏洞
- [#1031 [OPEN]](https://github.com/netease-youdao/LobsterAI/issues/1031) — **`shell:openExternal` IPC 未校验 URL 协议**，恶意渲染层代码可传入 `file://`、`smb://` 等任意协议。目前**无对应 fix PR**，且已 stale，建议优先处理。

### 中高危：并发崩溃
- [#1026 [OPEN]](https://github.com/netease-youdao/LobsterAI/issues/1026) — **`NimGateway.sendTeamTextReply()` 与 `stop()` 并发时崩溃**（`TypeError: Cannot read properties of null`）。已有修复 PR [#1028](https://github.com/netease-youdao/LobsterAI/pull/1028) 但长期未合入，存在复发风险。

### 中危：并发正确性（已关闭）
- [#1088 [CLOSED]](https://github.com/netease-youdao/LobsterAI/issues/1088) — Prefetch 异步回调未校验 turnToken，可能跨轮次污染。已关闭，但建议确认是否在 release/2026.9.16 中实际修复。
- [#1089 [CLOSED]](https://github.com/netease-youdao/LobsterAI/issues/1089) — CoworkRunner 并发重入导致消息重复。已关闭，同上建议确认修复版本。

### 低危：体验问题
- [#1082 [CLOSED]](https://github.com/netease-youdao/LobsterAI/issues/1082) — openclaw 版本不匹配，已 stale 关闭，但需跟进用户合规诉求是否真正解决。

---

## 6. 功能请求与路线图信号

### 最可能进入下一版本的功能
- [PR #2696 [OPEN]](https://github.com/netease-youdao/LobsterAI/pull/2696) — **Cowork 工作区全面升级**：turn workspace review、inline question dock、Tasks panel，四个独立 commit，基于 release/2026.9.15 重新基座，移除了 fork 特定部分。这是一个较大的功能集，若合入将显著增强 Cowork 会话的可用性，值得关注其 review 进展。

### 值得关注的依赖升级
- [PR #2669 [OPEN]](https://github.com/netease-youdao/LobsterAI/pull/2669) — **Vite 从 5.4.21 升级到 8.3.0**，由 dependabot 提交。跨大版本升级需评估构建兼容性。

### 已合入的体验信号
- [PR #2692](https://github.com/netease-youdao/LobsterAI/pull/2692) 合并说明 **项目持续打磨 Cowork 的“思考中”状态反馈**，这往往是用户感知最明显的交互细节。

---

## 7. 用户反馈摘要

| 反馈来源 | 用户诉求/痛点 | 项目回应 |
|---------|-------------|---------|
| [#1082](https://github.com/netease-youdao/LobsterAI/issues/1082) | 国家互联网应急中心要求升级 openclaw 到最新版本，担心 v2026.3.2 有风险 | 关闭，未见明确回应记录 |
| [#1088](https://github.com/netease-youdao/LobsterAI/issues/1088)、[#1089](https://github.com/netease-youdao/LobsterAI/issues/1089) | 开发者深入源码定位并发正确性问题，希望修复跨轮次污染与消息重复 | 已关闭，疑似已修复 |
| [#1026](https://github.com/netease-youdao/LobsterAI/issues/1026) |

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-18

> 数据来源：github.com/moltis-org/moltis | 统计窗口：2026-09-17 至 2026-09-18


## 1. 今日速览

过去 24 小时内 Moltis 共新增 2 条 Issue（1 条功能请求、1 条构建缺陷），另有 2 条 PR 处于待合并状态，无新版本发布。仓库整体活跃度尚可，但今日没有 PR 被合并或关闭，说明核心维护团队的合并动作暂缓。值得关注的是，两个待合并 PR（#1272 沙箱能力扩展、#1262 cron 窗口边界修复）分别触及安全边界与定时任务正确性，若能顺利合并将显著提升项目实用性。此外，围绕 Nix 构建失败（#1273）和 wasm-web-search 计费机制（#1274）的讨论，暗示了项目在可分发性和用户商业模式两个维度上仍有待完善。


## 2. 版本发布

过去 24 小时内无新版本发布。最近的可构建标签为 `20260913.02`（commit `6aa4881`），但该标签正面临 Nix flake 构建问题，详见下文“Bug 与稳定性”部分。


## 3. 项目进展

今日无 PR 被合并或关闭，但有两个功能型 PR 正在等待维护者 review 与合并：

- **feat(sandbox): per-agent mounts, run_as and a forced sandbox**（[#1272](https://github.com/moltis-org/moltis/pull/1272)）
  为 agent 预设的 `[sandbox]` 块引入三个新配置项：
  - `mounts`：为该 agent 的沙箱容器附加额外的宿主机挂载
  - `run_as`：指定容器运行时的 `uid:gid`
  - `force`：强制该 agent 始终运行在沙箱内，不允许逃逸
  
  该能力将沙箱从全局策略细化为 per-agent 策略，对多租户场景和不同可信度的 agent 分级管控具有重要意义。若合并，Moltis 在安全隔离维度上的灵活度将明显提升。

- **fix(cron): treat active_hours end="24:00" as end-of-day**（[#1262](https://github.com/moltis-org/moltis/pull/1262)）
  修复 `is_within_active_hours` 在解析 `end="24:00"` 时的逻辑缺陷——chrono 的 `%H` 格式不认 hour 24，导致默认窗口（`08:00`–`24:00`）解析失败，并落入 fail-open 分支，使得定时任务在非活跃时段也始终执行。该修复直接影响所有使用默认 active_hours 配置的实例的调度正确性，属于影响面较广的 bug fix。


## 4. 社区热点

今日两个新 Issue 均暂无评论，讨论热度不高，但从内容上可以捕捉到社区的两个方向性信号：

- [#1274 Prepaid search hop for Moltis wasm-web-search?](https://github.com/moltis-org/moltis/issues/1274)（作者 @iamalanlui）
  用户提出为 wasm-web-search 增加“预付费搜索跳数”（prepaid search hop）能力的请求。结合作者已勾选“搜索过既有 enhancement 请求”的 preflight 检查，说明这是一个经过调研后提出的新需求。背后诉求大概率与 wasm-web-search 在浏览器端或嵌入场景下的计费/限流机制有关——用户希望以预付方式购买搜索配额，而不是受限于实时鉴权或后付费模式。这暗示 Moltis 的 wasm 部署形态已开始出现在真实商业场景中。

- [#1273 Nix flake cannot build the published tag](https://github.com/moltis-org/moltis/issues/1273)（作者 @flexiondotorg）
  在发布标签 `20260913.02` 上，`nix build .#default` 无法完成构建，原因有两处：`cargoLock.outputHashes` 只固定了 `sqlx-core-0.8.6`，但 lock 中还包含以新名称 vendored 的两个 git crate（`wacore-0.6.0` 和 `zvec-rust-0.6.0`）；同时 web assets 缺失。这是 Nix 用户遇到的真实构建阻断，提交者显然有明确的复现路径和根因分析，期望维护者尽快响应。


## 5. Bug 与稳定性

当前存在 1 个已报告的构建缺陷，暂无对应的修复 PR：

- **中等严重度｜Nix flake 发布标签构建失败**（[#1273](https://github.com/moltis-org/moltis/issues/1273)，作者 @flexiondotorg）
  - 影响：任何通过 `nix build .#default` 构建发布版本的用户都会失败
  - 根因 1：`cargoLock.outputHashes` 不完整，缺少 `wacore-0.6.0` 与 `zvec-rust-0.6.0` 的 hash 固定
  - 根因 2：web assets 未包含在 flake 输出中
  - 是否已有 fix PR：**否**
  - 建议：维护者应尽快在 flake.nix 中补齐 outputHashes 并检查 web assets 的打包路径，同时建议补一个发布前的 Nix 构建 CI 检查，避免该问题再次进入 release tag。


## 6. 功能请求与路线图信号

- **wasm-web-search 预付费搜索跳数（[#1274](https://github.com/moltis-org/moltis/issues/1274)）**
  用户希望为 wasm-web-search 增加 pre-paid search hop 机制，可能是为了支持嵌入式/客户端场景下的搜索配额管理。该请求尚未被维护者标注意向，但结合 Moltis 当前在 wasm 方向的持续投入，有较大概率在后续版本中被评估。若纳入路线图，可考虑将其与现有搜索鉴权/限额系统统一设计。

- **per-agent 沙箱配置（[#1272](https://github.com/moltis-org/moltis/pull/1272)）**
  虽然这是一条 PR 而非 Issue，但它代表了明确的演进方向：从“全局沙箱策略”向“按 agent 细化”推进。该 PR 若合并，将为后续更细粒度的资源配额、权限映射等能力铺路，建议关注。

- 其他信号：`#1274` 是过去 24 小时内唯一的新功能请求，数量不多，说明当前用户侧功能需求整体平稳，项目重心更多在稳定性和安全加固上。


## 7. 用户反馈摘要

从今日的 Issue 中可以提炼出一条真实的用户痛点：

- **Nix 用户的构建体验受阻（[#1273](https://github.com/moltis-org/moltis/issues/1273)）**
  @flexiondotorg 在尝试构建发布标签时遭遇失败，并且给出了清晰的根因分析（vendored crate 名称变化导致 hash 固定失效、web assets 缺失）。这类反馈说明：Moltis 的 Nix 使用路径是真实存在的（用户愿意花时间排查并报告问题），但发布质量保障流程（release checklist）存在缺口——在打 tag 前没有验证 Nix flake 的可构建性。用户虽然报告的是构建问题，隐含期待的是“发布即可用”的可靠性保障。


## 8. 待处理积压

- **PR #1262｜cron active_hours 边界修复（[链接](https://github.com/moltis-org/moltis/pull/1262)）**
  创建于 2026-09-07，已超过 10 天未合并。该 PR 修复的是默认配置下 fail-open 导致定时任务每小时都可能误触发的实质 bug，影响所有使用默认 `08:00`–`24:00` 窗口的实例，建议维护者优先 review。即使无法立即合并，也建议给出明确反馈或修改意见，避免贡献者长时间等待。

- **PR #1272｜per-agent 沙箱能力（[链接](https://github.com/moltis-org/moltis/pull/1272)）**
  创建于 2026-09-16，等待 review 中。功能完整且方向明确，与安全隔离直接相关，建议尽快安排 review。

- **Issue #1273｜Nix 构建失败（[链接](https://github.com/moltis-org/moltis/issues/1273)）**
  已于 2026-09-17 报告，目前尚无维护者回复。考虑到这是 release tag 上的阻断性问题，建议标记为 bug 并排期修复，同时倒查是否有其他发布物受同类问题影响。

---

**项目健康度小结**：Moltis 当前处于功能迭代与稳定化并行的阶段。社区活跃度中等，贡献者提出了高质量的 PR 与 issue 报告，但维护者的响应速度明显滞后（特别是对已超 10 天的 #1262 和已阻断发布的 #1273）。建议维护团队在接下来 48 小时内优先回应 #1273 与 #1262，以稳固贡献者信心与发布可靠性。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 (2026-09-18)

## 1. 今日速览

项目过去24小时活跃度较高：共产生 20 条 Issue 更新（19 条活跃、1 条关闭）和 40 条 PR 更新（24 条待合并、16 条已合并/关闭），无新版本发布。值得关注的是，今日 Bug 类 Issue 密集出现，集中在插件事件循环冻结（#7840）、SSE 裸 `null` 载荷导致 Console 流冻结（#7813/#7814）、上下文压缩设置无效（#7810）、以及 Scroll 记忆驱逐丢失用户请求（#7836/#7837）等稳定性问题上。社区反馈最强烈的仍是 **subAgent 任务全部超时失败**（#7678，10 条评论）和**上下文窗口管理失效**（#7810）。好消息是，部分关键 Bug 已在同日获得修复 PR（如 #7840 → #7842，#7810 → #7832，#7812 → #7834），体现了较快的响应速度。整体来看，项目在功能开发与稳定性修复上双线推进，但事件循环隔离、上下文管理与 Console 鲁棒性等架构级问题仍是健康度短板。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

今日共有 16 条 PR 合并/关闭，以下为重要的合并项：

- **fix(pawapp-sdk): finalize stream resources exactly once** ([#7488](https://github.com/agentscope-ai/QwenPaw/pull/7488)) — 修复 PawApp SSE 流与长任务句柄在正常完成、报错、调用方取消与 abort 竞争下，reader 和 terminal promise 未精确一次收尾的问题。这是 SDK 资源管理的重要完善。
- **feat(hub): add model gateway, member governance and usage dashboard** ([#7779](https://github.com/agentscope-ai/QwenPaw/pull/7779)) — Hub 升级为组织级模型网关：管理员发布模型并托管供应商密钥，成员可选用 Hub 模型而无需接触组织凭据。标志 Hub 从个人工具向团队协作基础设施迈进。
- **feat(telemetry): report daily Runtime activity on Agent execution** ([#7802](https://github.com/agentscope-ai/QwenPaw/pull/7802)) — 新增按日汇总的 Runtime 活跃事件上报，仅在内置 Agent 或外部 harness 实际执行时记录，不统计启动、页面访问等非执行行为。
- **fix(docker): align app Python runtime with desktop** ([#7751](https://github.com/agentscope-ai/QwenPaw/pull/7751)) — Docker 应用虚拟环境改用与桌面端一致的 Python 3.11 standalone 运行时，而非 Debian OpenSSL 3.0 版本，减少环境差异导致的兼容性问题。
- **refactor(loop): pass DoomLoopStageConfig objects from catalog factory** ([#7808](https://github.com/agentscope-ai/QwenPaw/pull/7808)) — 将已校验的 `DoomLoopStageConfig` 对象传递从 gate 工厂移入 catalog 工厂，消除重复校验逻辑，纯重构无行为变化。

**项目推进判断**：Hub 模型网关、PawApp SDK 资源收尾、Docker/桌面运行环境对齐三项合并，说明项目在**多用户协作能力**与**运行一致性**两个方向上取得实质进展。待合并队列中出现了与热点 Bug 对应的修复（#7842、#7832、#7834），今明两日有望集中合入。

## 4. 社区热点

按评论数排序的热门 Issue：

- **[#7678] spawn subAgent 任务全部超时失败**（10 条评论，[链接](https://github.com/agentscope-ai/QwenPaw/issues/7678)）— 用户报告在 win2.2.0 上，任何 spawn subAgent 的任务均失败且 timeout 无效，并附带了详细的 AI 调试过程。评论中用户试图自行定位问题但未果。这是当前社区最集中的痛点。
- **[#6318] 支持按 conversation 级别指定模型**（7 条评论，[链接](https://github.com/agentscope-ai/QwenPaw/issues/6318)）— 已持续近两个月的高关注需求。用户希望模型绑定既能继承 agent 默认值，又允许在特定对话上手动覆盖，而非所有对话共用同一模型。这与当前"模型绑定在 agent 级别"的设计矛盾直接相关。
- **[#7840] 插件共享宿主事件循环导致整实例冻结**（4 条评论，[链接](https://github.com/agentscope-ai/QwenPaw/issues/7840)）— 插件中任意同步调用都会冻结整个实例，缺少契约、监控和隔离机制。同日已有对应的修复 PR #7842，社区反馈迅速跟进。
- **[#7815] Console 懒加载失败后无法恢复**（4 条评论，[链接](https://github.com/agentscope-ai/QwenPaw/issues/7815)）— 懒加载页面失败后，之后的每次导航都停留错误页，需整页刷新才能恢复。这是 Console 前端健壮性问题。

**诉求分析**：热点集中在**任务执行可靠性**（subAgent）、**对话上下文可配置性**（模型/压缩）、**插件隔离性**三个层面，分别对应执行引擎、上下文管理、插件架构三大核心模块，反映用户对"可依赖的日常使用"的刚需。

## 5. Bug 与稳定性

按严重程度排列：

**严重 — 导致任务/实例不可用：**

- **[#7840] 插件同步调用冻结整个实例**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7840)）— 插件在事件循环上做同步 I/O 可冻结全部 agent 与渠道约 40 秒。影响面极大。**已有 fix PR：[#7842](https://github.com/agentscope-ai/QwenPaw/pull/7842)（增加同步 hook 隔离与事件循环延迟看门狗）**。
- **[#7678] spawn subAgent 任务全部 timeout 失败**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7678)）— 用户环境下 100% 复现，设置超时时间无效。**暂无 fix PR**，需优先排查 subAgent 调度链路。
- **[#7818] UI 经常卡死，内存使用率极高**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7818)）— 附截图疑似内存泄漏。**暂无 fix PR**，建议关注是否与 #7813/#7814 的 SSE 异常流相关。

**中等 — 功能异常或数据不一致：**

- **[#7810] 上下文压缩设置了 131k 但实际输入 271k，压缩不触发**（[已关闭](https://github.com/agentscope-ai/QwenPaw/issues/7810)）— 用户反复尝试仍失效。**已有修复 PR：[#7832](https://github.com/agentscope-ai/QwenPaw/pull/7832)（让 context-window override 显式生效）**。
- **[#7812] 桌面启动后斜杠命令作用于 fallback 会话**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7812)）— `/compact` 报告空记忆，实际作用于错误会话。**已有修复 PR：[#7834](https://github.com/agentscope-ai/QwenPaw/pull/7834)（/compact 作用于当前会话）**。
- **[#7813] Console 流因 SSE 裸 null 载荷冻结**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7813)）— 单个畸形 SSE 帧使整个响应在客户端无法终止。**无独立 fix PR，可能由 #7814 一并解决**。
- **[#7814] Console SSE 路径两个鲁棒性缺口**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7814)）— 可能产出裸 `null` payload 且失败时无终止事件。**无独立 fix PR，需关注**。
- **[#7815] Console 懒加载失败后无法恢复**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7815)）— 错误边界无法恢复，只能整页刷新。**无独立 fix PR**。
- **[#7836] Scroll 驱逐误删工具密集跨度内的用户请求**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7836)）— 用户请求被卷入工具输出驱逐块，活窗口丢失对话上下文。**无 fix PR**，与 #7837 同属 Scroll 驱逐策略问题。
- **[#7837] user 行无 headline，驱逐索引被迫调用模型标注**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7837)）— `history.db` 中 user 行缺 headline 导致索引锚定成本高。**无 fix PR**。
- **[#7839] session-sync 跳过 86 个孤儿会话文件，留存清理报 malformed**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7839)）— 数据库损坏导致历史无法导入、清理失败。**无 fix PR**。

**轻微 — 集成/兼容性问题：**

- **[#7827] DashScope 千问 MCP 商店 streamable_http 驱动无法激活**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7827)）— 裸 HTTP 500 被误判为旧协议证据。**无 fix PR**。
- **[#7821] MCP 驱动丢弃刷新后的 OAuth access_token**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7821)）— 活跃客户端一直使用连接时令牌。**无 fix PR**。
- **[#7841] 桌面启动时 Console 后端未就绪，模型/插件面板空白**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7841)）— 需手动刷新。**无 fix PR**。
- **[#7817] 飞书 p2p 发消息 230101 及文件事件缺失**（[链接](https://github.com/agentscope-ai/QwenPaw/issues/7817)）— 飞书不接受 open_id 作为 receive_id，用户已附根因分析和改进建议。**无 fix PR**。

## 6. 功能请求与路线图信号

值得关注的新功能需求：

- **conversation 级别模型指定** ([#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)) — 已有 7 条评论，需求明确：agent 默认模型 + 对话手动覆盖。推断为**高优先级路线图

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报（2026-09-18）

## 1. 今日速览

今日项目整体活跃度中高：过去24小时内有 5 条 Issue 更新和 6 条 PR 更新，无新版本发布。最显著的事件是应维护者明确要求移除了全部 GitHub Actions CI 检查，同时完成了 Rustls 安全公告 RUSTSEC-2026-0285 的修复升级。安全补丁与 CI 移除并行推进，说明项目正在经历一轮基础设施方向调整，但核心功能的开发（如工具调用 schema 清洗）仍在持续推进。项目整体健康度尚可，但 CI 移除后本地验证流程将成为质量保障的关键，需要关注其落地效果。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭的 PR 反映了项目在依赖安全、CI 流程和集成覆盖三个方向的进展：

- **安全修复落地：Rustls 漏洞修复已合并**（[#692](https://github.com/qhkm/zeptoclaw/pull/692)）— 将 Rustls 从受影响的 0.23.39 升级至已修复的 0.23.45，解决了 RUSTSEC-2026-0285 安全公告，同时更新了依赖审计基线和文档。这解除了当前 18 个 Dependabot PR 的安全审计阻塞。
- **CI 基础设施调整**（[#700](https://github.com/qhkm/zeptoclaw/pull/700)）— 按用户明确要求移除了所有 GitHub Actions CI 检查，包括 CI、E2E 和 PR 卫生工作流，保留 tag 触发的发布和 Docker 发布流程。README 中的 CI 徽章也已移除。
- **CI 覆盖范围改进**（[#545](https://github.com/qhkm/zeptoclaw/issues/545)）— 已关闭的 issue 推动 PR CI 覆盖可选的集成特性，确保可选集成路径不会静默漂移，相关改动已并入主线。
- **依赖自动化更新**（[#684](https://github.com/qhkm/zeptoclaw/pull/684)、[#682](https://github.com/qhkm/zeptoclaw/pull/682)）— 将 cargo-deny-action 升级至 2.1.1、install-action 升级至 2.87.6，保持 CI 工具链的时效性。

项目正从「依赖 GitHub Actions 的云验证」转向「本地验证 + tag 发布保护」的新工作流，同时依赖供应链的安全性已通过 rustls 升级得到夯实。

## 4. 社区热点

今日所有 Issues/PRs 评论数均为 0，无激烈讨论。但以下两个条目因主题关联性强而值得关注，反映了项目在「边缘端/本地模型工具调用可靠性」方向上的连续投入：

- **[#698 [OPEN] feat(providers): sanitize tool JSON schemas + coerce model tool-args**](https://github.com/qhkm/zeptoclaw/issues/698) — 指出当前 `ollama`/`local` provider 在工具调用上缺乏对弱本地模型和严格后端的适配。
- **[#701 [OPEN] feat(providers): sanitize tool schemas and coerce model tool-args**](https://github.com/qhkm/zeptoclaw/pull/701) — 对应实现 PR，为所有工具 schema 增加清洗层，并对模型返回的工具参数做类型强制转换。

背后的用户诉求直指 ZeptoClaw 作为边缘 AI 运行时的核心痛点：本地模型（如通过 Ollama 运行的小参数模型）往往无法严格遵循 JSON Schema 或返回不规范的参数类型，导致工具调用在真实边缘场景中不可靠。这两个条目不是孤立的讨论，而是项目针对该短板的一次主动补课。

## 5. Bug 与稳定性

今日无新增 bug 报告的 Issue，但有一项重要的安全修复落地：

- **[严重] Rustls 安全公告 RUSTSEC-2026-0285**（[#697](https://github.com/qhkm/zeptoclaw/issues/697)）— 影响 Cargo.lock 中解析到的 Rustls 0.23.39，导致全部 18 个 Dependabot PR 的安全审计和 Cargo deny 失败。已通过 [#692](https://github.com/qhkm/zeptoclaw/pull/692) 升级至 0.23.45 修复。
- **[策略性] aarch64 二进制体积关卡**（[#629](https://github.com/qhkm/zeptoclaw/issues/629)）— 已关闭。该 issue 指出 x86_64 的 11MB 体积门槛是编码/linker 现实，而真正的战略护城河是面向 Pi/Jetson/Apple silicon 的 aarch64 目标实现 6MB 体积。这属于工程策略而非 bug 修复。

无崩溃或回归类问题报告。

## 6. 功能请求与路线图信号

- **[高信号] 工具 schema 清洗 + 参数强制转换**（[#698](https://github.com/qhkm/zeptoclaw/issues/698)）— 这是一个明确的功能请求，且对应的 PR（[#701](https://github.com/qhkm/zeptoclaw/pull/701)）已经处于开放状态。该功能提升 ZeptoClaw 本地/边缘模型的工具调用成功率，是「边缘运行时」定位的重要补强，很可能被纳入下一版本。
- **[低信号] 可选集成特性纳入常规 PR CI**（[#545](https://github.com/qhkm/zeptoclaw/issues/545)）— 已关闭，说明改进已落地。

路线图判断：项目未来的版本重点可能放在「本地模型工具调用可靠性」上，与当前 AI 边缘化部署的大趋势一致。

## 7. 用户反馈摘要

今日所有 Issue 和 PR 的评论数均为 0，无法从评论区提炼直接的用户反馈。但从 Issue/PR 描述中可以读出隐含的用户声音：

- **用户明确要求移除 GitHub Actions CI**（[#699](https://github.com/qhkm/zeptoclaw/issues/699)）— 这是一个维护者（@qhkm）发起的变更，说明当前工作流对云 CI 的依赖可能已成为负担（成本、速度或安全考量），倾向于本地验证模式。
- **对二进制体积的敏感性**（[#629](https://github.com/qhkm/zeptoclaw/issues/629)）— 反映出目标用户（机器人开发者、边缘设备使用者）对资源占用高度敏感，6MB aarch64 体积是吸引这类用户的关键卖点。

## 8. 待处理积压

- **[#701 [OPEN] feat(providers): sanitize tool schemas and coerce model tool-args**](https://github.com/qhkm/zeptoclaw/pull/701) — 当前唯一的重要功能 PR，直接影响本地模型工具调用体验。建议优先 review 并合并。
- **[#683 [OPEN] fix(deps): bump Swatinem/rust-cache from 2.9.1 to 2.9.2**](https://github.com/qhkm/zeptoclaw/pull/683) — 由 Dependabot 创建的常规依赖更新，但考虑到 CI 已被移除，该 PR 的实际意义存疑。建议确认 rust-cache 是否仍在 tag 发布流程中使用，若已无用可关闭。
- **长期未响应问题** — 今日数据中未发现超过 30 天未响应的关键 Issue。值得注意的是 #545 和 #629 均已在 9 月 17 日关闭，说明积压清理较为及时。

---

**项目健康度评估**：安全响应及时（漏洞量级修复当日完成）、新功能推进有序（工具 schema 清洗 PR 已开）、但 CI 移除后缺乏自动化质量门的替代方案，未来合并 PR 的质量保障高度依赖维护者的本地验证，存在一定回归风险。建议在下一个版本周期内补充轻量级本地验证脚本或 pre-commit hooks 来缓解该风险。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*