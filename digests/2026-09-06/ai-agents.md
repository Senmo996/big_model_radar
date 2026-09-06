# OpenClaw 生态日报 2026-09-06

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-06 01:47 UTC

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

# OpenClaw 项目动态日报 — 2026-09-06

## 1. 今日速览

过去24小时，OpenClaw 项目保持**极高活跃度**：累计 500 条 Issue 更新（其中新开/活跃 435 条、关闭 65 条）与 500 条 PR 更新（待合并 284 条、已合并/关闭 216 条），同时发布了 v2026.9.2 版本。新版本聚焦聊天响应性能与 Gateway 事件循环优化，缓解了近期集中暴露的会话状态与消息投递类问题（如 #69208、#119720）。尽管活跃度高企，但 P1 级 bug 积压较多（涉及消息丢失、会话状态损坏、僵尸进程等），社区反馈与维护者响应基本同步，项目整体处于**健康但需警惕稳定性风险积累**的状态。


## 2. 版本发布

### [v2026.9.2](https://github.com/openclaw/openclaw/releases/tag/v2026.9.2)

**核心亮点：更快速、更响应的聊天体验**

- 在长转录和磁盘使用处理期间，保持聊天、仪表盘和会话交互的响应性
- 新增仪表盘直接查找，减少冷加载工作
- Gateway 事件循环外的持久化历史读取（非阻塞）

**影响评估：** 该版本无已知破坏性变更，主要针对近期社区反馈集中的会话卡顿和 Gateway 阻塞问题（如 #119720）作出架构性优化。建议所有使用长会话/多会话实例的用户升级。


## 3. 项目进展

今日关闭/合并的 PR 共计 216 条，以下为关键进展：

### 已合并/关闭的重要 PR

| PR | 内容 | 意义 |
|---|---|---|
| [#139516](https://github.com/openclaw/openclaw/pull/139516) | 修复 Bun 下 WebSocket 升级复用连接时的 HTTP 拒绝响应被重置的问题 | 提升 Gateway 的 WebSocket 连接可靠性 |
| [#136374](https://github.com/openclaw/openclaw/pull/136374) | 修复 Slack 自定义 emoji 名称与 `Object.prototype` 键冲突时 `reactions.add` 请求损坏的问题 | 修复了 Slack 频道中 `constructor`/`toString` 等合法 emoji 名称无法正常反应的问题，属于边缘但真实的功能缺陷 |
| [#139589](https://github.com/openclaw/openclaw/pull/139589) | 分享稀疏转录输入测试夹具 | 测试基础设施重构，减少重复代码 |
| [#139481](https://github.com/openclaw/openclaw/pull/139481) | 刷新 Control UI 语言包 | 保持 UI 多语言同步 |
| [#139496](https://github.com/openclaw/openclaw/pull/139496) | 简化目录守卫并修复原生报告测试夹具 | 提升测试稳定性 |

### 值得关注的待合并 PR

- **[#137381](https://github.com/openclaw/openclaw/pull/137381)**（P1，高风险合并）：修复 `sessions_yield` 在长 SQLite 会话清理期间导致转录历史和上下文暂时不可用的问题，直接关联 #109638、#113190 两个会话状态类 issue，是当前最值得关注的会话可靠性修复。
- **[#128872](https://github.com/openclaw/openclaw/pull/128872)**（P1，XL 规模）：拆分 `message_tool_only` 聊天中的回复决策与投递路径，解决"必须调用 `message` 工具才能发可见回复"的误导性 prompt 设计问题。
- **[#139439](https://github.com/openclaw/openclaw/pull/139439)**：在 run 失败且未产生任何回复时，向转录写入一条持久化记录，避免 Control UI 线程在刷新后看起来"无人应答"。该 PR 直接回应了 #119720 所描述的 Gateway 事件循环阻塞类问题。

**项目整体向前迈进的判断：** v2026.9.2 发布 + 大量测试基础设施重构 + 核心会话可靠性修复进入合并队列，项目在性能与稳定性维度均有实质性推进。


## 4. 社区热点

### 讨论最活跃的 Issues

| Issue | 评论数 | 核心诉求 |
|---|---|---|
| [#69208](https://github.com/openclaw/openclaw/issues/69208) — Umbrella: duplicate transcript, replay, context assembly across channels | 14 | **跨渠道重复转录/重放/上下文组装问题的总集**，覆盖 MSTeams、webchat、Telegram 等多个渠道，反映多通道消息一致性是当前最大痛点 |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) — overflow retry 以工具结果成功结束但无最终投递 | 13 | 多阶段文档工作流中，overflow-retry 后最终转录项是 `toolResult` 而非 assistant response，**用户看到"成功"却没有收到最终答复** |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) — 内置无头浏览器 | 12 | 用户期望无需依赖本机 Chrome 或第三方 API，即可访问 JS 渲染和需登录的网页 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) — A2A sessions_send 相互调用导致消息重复 | 12 | 多 Agent 场景下 `sessions_send` 回调导致请求方渠道出现重复消息 |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) — 子代理完成内容注入父上下文过多 | 12 | **父代理会话被子代理的完成内容污染**，高负载子代理工作负载下尤其严重 |

### 分析

社区最集中的诉求围绕**消息可靠性与会话隔离**：重复消息、丢失消息、子代理上下文污染、跨渠道不一致——这些都是 AI 助手在生产环境中能否被信任的关键因素。值得注意，`issue-rating` 标为 🦞 diamond lobster（高评级）的问题中，多数属于"消息丢失/会话状态"类，说明项目维护者已识别并优先关注此类问题。


## 5. Bug 与稳定性

### 严重级别排序（按 P0 → P3）

#### P0（严重）

- **[#91931](https://github.com/openclaw/openclaw/issues/91931)** — [Bug]: 预置 SOUL.md/IDENTITY.md/USER.md 导致 OpenClaw 自动完成引导并**删除用户提供的 BOOTSTRAP.md**，且无修复 PR。极高风险，直接导致用户数据丢失。

#### P1（高）

- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — 泄漏未回收的 hook/tool 子进程，**产生僵尸进程积累和运行时性能退化**。无修复 PR。
- **[#110190](https://github.com/openclaw/openclaw/issues/110190)** — 运行时上下文载体（~15K 字符）被定位在用户消息之后，**导致模型混淆和推理 token 浪费**。无修复 PR。
- **[#132762](https://github.com/openclaw/openclaw/issues/132762)** — overflow retry 成功结束但最终消息未投递，用户**感知为"成功却无输出"**。无修复 PR。
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 同步 Agent 持久化与转录维护**阻塞 Gateway 事件循环**，已由 v2026.9.2 部分缓解，但原始 issue 仍未关闭。
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — 命令执行器在触发 ssh 时挂起（等待 server banner），2026.8.1 引入回归，**2026.8.2 仍然存在**。无修复 PR。
- **[#112259](https://github.com/openclaw/openclaw/issues/112259)** — 可见入站频道消息可被无提示丢弃（零 payload dispatch，无重试/死信/用户可见错误）。无修复 PR。
- **[#54488](https://github.com/openclaw/openclaw/issues/54488)** — 会话通道饥饿：followup drain 独占会话通道，**阻止入站消息派发 20-30 分钟**。无修复 PR。
- **[#127148](https://github.com/openclaw/openclaw/issues/127148)** — Codex sessions.compact 二次获取 app-server 导致 active-writer 冲突。无修复 PR。
- **[#90098](https://github.com/openclaw/openclaw/issues/90098)** — 大附件（PDF/文件）上传导致浏览器或 Gateway 栈溢出。已有 [#139231](https://github.com/openclaw/openclaw/pull/139231) 相关修复 PR（处理 provider 未加载问题）。

#### P2（中）

- [#89257](https://github.com/openclaw/openclaw/issues/89257) — `openclaw backup create --verify` 退出 13 并留下损坏 .tmp 存档，**备份功能可靠性受损**。已有 [#139598](https://github.com/openclaw/openclaw/pull/139598) 和 [#139602](https://github.com/openclaw/openclaw/pull/139602) 两个 PR 在修复相关备份问题。
- [#101929](https://github.com/openclaw/openclaw/issues/101929) — context-overflow 预估器高估 token 消耗 2.3-2.6 倍，**在远未触及上下文窗口时便触发截断恢复**。
- [#114967](https://github.com/openclaw/openclaw/issues/114967) — Agent 驱动的实时更新遗留 launchctl keepalive 验证器，**每 2 分钟强制重启 Gateway**（crash-loop）。

### 今日新增值得注意的 Bug/回归

- **[#136183](https://github.com/openclaw/openclaw/issues/136183)**（ssh 挂起，2026.8.1 回归）
- **[#137332](https://github.com/openclaw/openclaw/issues/137332)**（混合 requester-settle 批次在所有权检查后无限重试，2026.9.3 提出，回归类）


## 6. 功能请求与路线图信号

### 高热度功能请求

| Issue | 内容 | 热度信号 | 被纳入下一版本的可能性 |
|---|---|---|---|
| [#53763](https://github.com/openclaw/openclaw/issues/53763) | 内置无头浏览器，不依赖外部浏览器/API | 12 评论，持续活跃 5+ 个月 | **中高** — 社区呼声高，且能系统性解决网页访问可靠性问题，但实现成本大 |
| [#6599](https://github.com/openclaw/openclaw/issues/6599) | `/models test-fallback` 命令验证 fallback 链 | 11 评论，P3 | **中** — 小改动高价值，但长期未排期 |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) | 子代理完成与父上下文隔离，仅返回状态+子会话链接 | 12 评论，P2 | **高** — 与多个活跃 issue 关联（#78055 等），已有多个相关 PR 在推进 |
| [#99583](https://github.com/openclaw/openclaw/issues/99583) | 智能会话自动标题（懒生成、廉价模型、主题感知重命名） | 8 评论，P3 | **中** — 代码库已有 llm-slug-generator，实现成本可控 |
| [#71058](https://github.com/openclaw/openclaw/issues/71058) | 单 Gateway 支持多个 Teams bot | 9 评论，P2 | **中** — 企业用户需求明确，但涉及配置架构变更 |

### 结合 PR 的信号

- 今日多条 PR（#139607、#139604、#139610）由同一批核心维护者高频提交，集中在 **agents 配置隔离、运行时上下文剥离、会话解析性能** 三个方向。结合 P1 issue 分布，可以判断**下一版本的重心是会话可靠性与配置安全**。
- **[#139514](https://github.com/openclaw/openclaw/pull/139514)**（iOS 设置迁移至 Dashboard）和 **[#139573](https://github.com/openclaw/openclaw/pull/139573)**（大规模死代码清理）显示项目也在推进**客户端架构统一与代码库清理**。


## 7. 用户反馈摘要

### 真实痛点

1. **"成功但无输出"是最令人困惑的失败模式** — #132762 中，用户报告 overflow-retry 最终以 `toolResult` 结束、无最终 assistant response，用户感知为系统"认为成功但什么都没给我"。
2. **长会话导致工具参数静默丢失** — #53408：15+ 轮对话后 `write`/`exec` 工具的参数被静默丢弃，调用到达但 arguments 对象为空，**属于"静默退化"而非"显式报错"**，对用户信任伤害极大。
3. **Gateway 线程被阻塞导致机器人"失联"** — #53008、#54488：内存压缩或 followup drain 阻塞主处理通道时，**所有入站消息排队 10-30 分钟**，用户以为机器人已死。
4. **升级成为高风险操作** — #85027：macOS LaunchAgent 升级后 Gateway 无法恢复，只能 Time Machine 恢复；#132720：2026.9.1-beta.1 升级后 Claude CLI 认证全部失效。
5. **模型上下文被"污染"** — #96975、#110190：子代理输出和运行时元数据注入主上下文，导致模型混淆、token 浪费、推理质量下降。

### 正面反馈

- [#42840](https://github.com/openclaw/openclaw/issues/42840)（MathJax/LaTeX 支持）获得 **10 👍**，是社区呼声最高的功能请求之一，目前已关闭（说明已解决/排期）。
- v2026.9.2 的发布本身即是对社区"聊天卡顿"反馈的正面响应。


## 8. 待处理积压

### 长期未响应/停滞的重要 Issue

| Issue | 创建时间 | 级别 | 备注 |
|---|---|---|---|
| [#54488](https://github.com/openclaw/openclaw/issues/54488) — Session lane starvation | 2026-03-25 | P1 | **持续 5 个月+未修复**，影响生产可用性 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) — 重复转录/重放 Umbrella | 2026-04-20 | P1 | 维护者已标记 `needs-product-decision`，但未有统一修复方案 |
| [#53763](https://github.com/openclaw/openclaw/issues/53763) — 内置无头浏览器 | 2026-03-24 | P3 | 5 个月+无实质进展 |
| [#39476](https://github.com/openclaw/openclaw/issues/39476) — A2A sessions_send 重复消息 | 2026-03-08 | P1 | 已标记 `linked-pr-open`，但 PR 未合入 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸进程泄漏 | 2026-06-29 | P1 | 已标记 `needs-info`，维护者需要更多信息但用户已提供较多细节 |
| [#89257](https://github.com/openclaw/openclaw/issues/89257) —

---

## 横向生态对比

# 个人AI助手与自主智能体开源生态横向对比分析（2026-09-

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-06

数据来源：GitHub（HKUDS/nanobot）｜统计周期：2026-09-05 至 2026-09-06

---

## 1. 今日速览

过去 24 小时 NanoBot 项目保持中等偏上活跃度：新增 1 个 bug Issue，PR 更新 24 条（其中 7 条已合并/关闭，17 条待审核），暂无新版本发布。值得关注的是，今日新报告的 Nvidia NIM 超时错误导致 agent 停摆的问题（#5674），在数小时内即有社区成员提交修复 PR #5675，显示出较强的响应能力。与此同时，大量 PR 已进入待合并状态（17 条），其中不少带有 `conflict` 标签，说明维护团队的审查与合并速度可能正在成为瓶颈。此外，事件系统重构（#5670）和多项 WebUI/CLI 修复在今日完成合入，项目整体处于功能迭代与架构优化并行的阶段。

---

## 2. 版本发布

**无新版本发布**（最新 Release 列表为空）。

---

## 3. 项目进展

今日共有 7 条 PR 被合并/关闭（其中 4 条在本次数据中可见），主要集中在内核架构重构与工程质量提升方向，在功能层面无重大更新，但为后续迭代打下基础。亮点如下：

| PR | 标题 | 状态 | 核心意义 |
|---|---|---|---|
| [#5670](https://github.com/HKUDS/nanobot/pull/5670) | refactor(events): unify scoped runtime notifications across clients | CLOSED | 事件系统重构，统一使用 MessageBus 处理本地事件订阅与多客户端队列分发，并端到端迁移了上下文压缩流程。兼容现有 wire payload 和持久化格式，是架构层面的一次重要收敛 |
| [#5671](https://github.com/HKUDS/nanobot/pull/5671) | fix(cli): skip WebUI bundle check in dev mode | CLOSED | 修复 `nanobot webui --dev` 模式下误报 bundle 过期警告的问题，改善开发者体验 |
| [#5672](https://github.com/HKUDS/nanobot/pull/5672) | test: remove obsolete nonexistence checks | CLOSED | 清理仅断言“符号不存在”的过时测试，保留可观测行为与安全回归测试，提升测试套件质量 |
| [#5669](https://github.com/HKUDS/nanobot/pull/5669) | docs: explain derived context budget | CLOSED | 补充模型上下文预算的推导逻辑文档，并标注 `contextBlockLimit` 废弃升级提示 |

**点评**：本次合入集中在基础设施层（事件机制、CLI 工具链、测试与文档），没有引入新功能，但 #5670 的事件系统统一为未来多客户端能力（如 WebUI、移动端）提供了更清晰的架构基础。

---

## 4. 社区热点

**注意**：本次数据快照未包含评论数与 reaction 数（均为 0 或 undefined），以下基于更新时间、PR 关联关系和内容重要性进行分析。

### 4.1 最受关注的新Issue：#5674 与即时修复 PR #5675

- [Issue #5674](https://github.com/HKUDS/nanobot/issues/5674)：当 Nvidia NIM 返回 300s/600s 超时错误时，agent 误将该错误文本视为模型输出，导致整个 agent 停止工作。
- [PR #5675](https://github.com/HKUDS/nanobot/pull/5675)（仅隔数小时提交）：`fix(providers): allow model failover after runner deadlines`。PR 明确标注 `Fixes #5674`，说明根因是 runner 在 deadline 耗尽时取消了整条执行链，导致 `FallbackProvider` 无法感知超时、无法切换备用模型。

**分析**：这一对 Issue/PR 反映了社区对“模型服务不可用时降级/故障转移”能力的高关注度。NIM 是 NVIDIA 的企业级推理平台，说明 NanoBot 已在企业用户中获得实际使用，而生产环境对高可用有着明确诉求。预计 #5675 会被优先 review，并可能进入下一补丁版本。

### 4.2 长期讨论中的心跳功能系列 PR

来自同一作者 @dajiaohuang 的 [PR #4549](https://github.com/HKUDS/nanobot/pull/4549)（heartbeat model_override）与 [PR #4551](https://github.com/HKUDS/nanobot/pull/4551)（heartbeat isolated_session）自 6 月 26 日创建至今已逾两个月仍未合并，且 9 月 5 日仍有更新，说明期间经历了多轮 review 与迭代。该系列着眼于让心跳检测使用更便宜的模型、以及可选共享会话上下文，是成本优化向的典型社区提案。

---

## 5. Bug 与稳定性

今日新报告 1 个 bug，同时多条待合并 PR 聚焦于修复长期存在的稳定性/安全问题。按严重程度排列如下：

### 高严重度

| 问题 | 严重度 | 状态 | 说明 |
|---|---|---|---|
| [Issue #5674](https://github.com/HKUDS/nanobot/issues/5674) Nvidia NIM 超时错误导致 agent 停摆 | 高（会影响所有使用 NIM 的用户） | 已有修复 PR [#5675](https://github.com/HKUDS/nanobot/pull/5675) | 超时错误文本被当作模型输出，且 `FallbackProvider` 故障转移机制失效 |
| [PR #5633](https://github.com/HKUDS/nanobot/pull/5633) 会话键路径遍历漏洞 | 高（安全） | 待合并 | 修复 `../../etc/passwd` 之类会话 ID 可导致越权读写文件的问题，Fixes #5564 |
| [PR #5580](https://github.com/HKUDS/nanobot/pull/5580) 会话持久化阻塞事件循环 | 高（稳定性） | 待合并 | 慢速存储或文件锁竞争会拖垮所有会话，需要将持久化移出事件循环 |
| [PR #5589](https://github.com/HKUDS/nanobot/pull/5589) 已丢弃会话被“复活” | 高（数据一致性） | 待合并 | 会话丢弃后，pending 队列中的消息仍会发布到全局总线，导致会话幽灵式恢复 |

### 中低严重度

| 问题 | 严重度 | 状态 |
|---|---|---|
| [PR #5457](https://github.com/HKUDS/nanobot/pull/5457) 单条出站消息异常导致整个分发任务终止 | 中 | 待合并 |
| [PR #5573](https://github.com/HKUDS/nanobot/pull/5573) OAuth token 过期后不自动刷新 | 中 | 待合并 |
| [PR #5664](https://github.com/HKUDS/nanobot/pull/5664) 空闲会话摘要缓存无上限增长 | 中 | 待合并 |
| [PR #5630](https://github.com/HKUDS/nanobot/pull/5630) Dream 记忆文件失去大小限制 | 中 | 待合并 |
| [PR #5471](https://github.com/HKUDS/nanobot/pull/5471) ephemeral SDK 运行未真正保持会话不变 | 中 | 待合并 |
| [PR #5673](https://github.com/HKUDS/nanobot/pull/5673) 远程 WebUI 项目选择器会打开客户端本机路径 | 低 | 待合并 |

**趋势观察**：本周的 bug 修复集中在会话生命周期管理（丢弃、恢复、缓存无界、路径穿越）和异步模型稳定性两个方面，且大量 PR 已进入待合并状态但被标注 `conflict`，需要维护者尽快处理，否则修复将迟迟无法落地。

---

## 6. 功能请求与路线图信号

今日无新功能请求型 Issue，但通过 PR 可识别出以下路线图信号：

| 功能 | PR | 状态 | 路线图判断 |
|---|---|---|---|
| 心跳模型覆盖配置（用更便宜的模型做心跳检测） | [#4549](https://github.com/HKUDS/nanobot/pull/4549) | 待合并（2个月+） | 高概率纳入下一版本，成本优化是社区普遍诉求 |
| 签名直投 Webhook（绕过 agent 直接发通知） | [#5652](https://github.com/HKUDS/nanobot/pull/5652) | 待合并 | 对 CI/可观测性场景有明确价值，可能纳入 1.x 中期版本 |
| 按 spawn 配置模型预设（spawnPresets allowlist） | [#5561](https://github.com/HKUDS/nanobot/pull/5561) | 待合并 | 源于 Issue #4231，社区多轮讨论，功能设计已趋于成熟 |
| MCP Apps 结果元数据透传 | [#5386](https://github.com/HKUDS/nanobot/pull/5386) | 待合并 | 增强 MCP 生态集成深度，可能随 MCP 功能迭代一并合入 |
| 心跳隔离会话的可选关闭 | [#4551](https://github.com/HKUDS/nanobot/pull/4551) | 待合并 | 与 #4549 配套，同样处于后期阶段 |

综合来看，**心跳机制优化**（#4549 + #4551）是目前最接近合并的功能系列，建议维护团队优先安排 review。

---

## 7. 用户反馈摘要

**说明**：本次数据快照中 Issues/PR 的评论数均为 0，以下反馈提炼自 Issue/PR 描述文本中的用户原始表达，不包含评论区内容。

| 用户声音 | 来源 | 背后痛点 |
|---|---|---|
| “agent stops working because nanobot thinks its the model output” | [Issue #5674](https://github.com/HKUDS/nanobot/issues/5674) | 超时错误被误判为模型输出，且在配置了 fallback 的情况下仍无法自动切换，用户对生产可用性存在担忧 |
| “An unexpected error while processing one outbound message could stop ... no further messages were sent until the process restarted” | [PR #5457](https://github.com/HKUDS/nanobot/pull/5457) | 单点故障导致整个渠道静默死亡，运维成本高 |
| “A hanging primary model exhausts the runner's deadline ... configured healthy fallback is never attempted” | [PR #5675](https://github.com/HKUDS/nanobot/pull/5675) | 故障转移机制在真实超时场景下失效，与 #5674 相互印证 |
| “Summaries remained cached until their sessions were reopened. Abandoned sessions could therefore cause the cache to grow without limit.” | [PR #5664](https://github.com/HKUDS/nanobot/pull/5664) | 长时间运行后内存可能被脏数据占满 |
| “PR #5622 fixed ... but as a side effect removed the only existing size cap ... these Dream-managed files can grow unbounded and get injected into every request” | [PR #5630](https://github.com/HKUDS/nanobot/pull/5630) | 回归缺陷导致记忆文件可能无限膨胀，影响上下文窗口与成本 |

从反馈中可以看出，用户最关心的是 **生产环境稳定性**（超时、故障转移、内存边界）与 **安全性**（路径遍历），而非新增功能——这符合项目发展到中后期以稳定为主的社区预期。

---

## 8. 待处理积压

以下为长期未合并/未响应的 PR 或 Issue，建议维护者关注，优先处理带 `conflict` 标签的条目以避免它们走向过期：

| 编号 | 类型 | 标题 | 等待时长 | 优先级标签 | 备注 |
|---|---|---|---|---|---|
| [#4549](https://github.com/HKUDS/nanobot/pull/4549) | PR | feat(heartbeat): add model_override config | 72 天 | p2, conflict | 与 #4551 配套，功能系列最接近完成 |
| [#4551

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-06

## 1. 今日速览

过去24小时项目保持高活跃度：42条Issue更新（34条新开/活跃，8条关闭）与50条PR更新（44条待合并，6条已合并/关闭）表明社区讨论与开发节奏均处于高位。v0.8.5版本正式发布（454 commits / 73 contributors），带来ZeroRelay与ZeroRouter两大新组件，以及涉及插件、沙箱、凭证与文件边界的安全加固。当前讨论焦点集中在三大RFC（运行时会话架构、统一文件附件架构、WASM插件运行时）与安全改造系列堆叠PR（#8289 stage 2-6），信息安全与架构治理是当下主线。

链接：[Issues](https://github.com/zeroclaw-labs/zeroclaw/issues) | [PRs](https://github.com/zeroclaw-labs/zeroclaw/pulls) | [Releases](https://github.com/zeroclaw-labs/zeroclaw/releases)


## 2. 版本发布

### v0.8.5 — 安全、连接性与操作体验发布 🔒
- **规模**：454 commits，73位贡献者
- **核心新组件**：
  - **ZeroRelay**：新增中继能力，服务连接性扩展
  - **ZeroRouter**：新增路由组件，为多渠道/多提供商场景提供统一入口
- **功能增强**：
  - 扩展 live chat 能力
  - 扩展 provider 支持面
- **安全加固**：
  - 插件（plugin）边界加固
  - 沙箱（sandbox）边界加固
  - Webhook 边界加固
  - 凭证（credential）边界加固
  - 文件（file）边界加固

**迁移注意事项**：作为安全/连接性发布，建议自托管用户关注配置中涉及 webhook、凭证存储与沙箱策略的 schema 变更；官方迁移工具已随版本更新（`zeroclaw config migrate`），建议在升级前备份配置并进行预检。

链接：[v0.8.5 Release](https://github.com/zeroclaw-labs/zeroclaw/releases)


## 3. 项目进展

### 已合并/关闭的重点PR（过去24小时）

| PR | 描述 | 意义 |
|---|---|---|
| [#10005](https://github.com/zeroclaw-labs/zeroclaw/pull/10005) | `fix(channels): base channel health on the channel, not on listener liveness` | 修复健康检查误报：此前 listener 存活即标记 channel 为 ok，即使从未成功连接。现在健康状态基于 channel 实际状态，提升可观测性准确性 |
| [#5230](https://github.com/zeroclaw-labs/zeroclaw/pull/5230) | `feat(plugins): add WASM plugin system with security sandbox` | 里程碑级 PR，为 ZeroClaw 引入 WASM 插件系统，支持在不 fork 核心代码的前提下添加自定义工具，附带安全沙箱。该 PR 从 4 月发起至今日合并，历经长期 review，落地意义重大 |

### 值得关注的活跃PR

- **安全架构大系列**（#8289 实施，作者 @JordanTheJet）：`#10248 → #10255 → #10259 → #10263 → #10265 → #10268 → #10270 → #10274 → #10275 → #10321` 形成 10 层堆叠，覆盖从 canonical principals、OIDC 验证、RPC 鉴权、principal 会话存储到浏览器 PKCE 与跨面注册 API。这一系列代表 RFC 7141 身份契约的全面落地，是当前最宏大的架构改造。
- **Telegram 安全模型选择器**（[#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)，XL 规模，`do-not-merge`）：为 Telegram 渠道添加 provider 分组的分页模型选择器，目前阻塞等待维护者 review。
- **Cron 任务墙钟超时**（[#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320)，XL 规模）：绑定 agent 任务运行的墙钟超时，避免锁泄漏。处于 `needs-author-action` 状态。

**整体判断**：v0.8.5 发布 + WASM 插件系统合并 + 安全系列稳步推进，项目处于功能扩张与架构治理并行的高强度迭代期。


## 4. 社区热点

### #9487 · RFC: Runtime-owned conversation sessions and transport surface adapters（33 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)

**状态**：Proposed — Revision 5，需维护者开启新的讨论窗口。这是当前社区最活跃的讨论话题，已迭代至第 5 版。该 RFC 提议运行时拥有会话生命周期、通过传输表面适配器解耦底层渠道，影响网关、运行时、安全与 Web 多个领域。风险标记为 high。社区关注点：如何在不破坏现有 47 个 `/api/*` 路径的情况下平滑引入适配层。

### #9488 · RFC: Unified file and attachment architecture for conversation surfaces（26 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)

**状态**：Proposed — Revision 10（第 10 次修订）。讨论文件与附件的统一架构，与 #9487 形成姊妹提案，共同描绘会话数据模型的未来蓝图。两者合计 59 条评论，是社区当前最核心的架构讨论方向。

### #6808 · RFC: Work Lanes, Board Automation, and Label Cleanup（24 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)

**状态**：Ratified，正在 rollout。治理类 RFC，从 5 月持续至今，累计 26 个修订版本。社区对工作流自动化与 label 治理的关注度持续不减。

### #6996 · RFC: Granular sandbox policy - filesystem restrictions（24 条评论）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)

**状态**：Proposed，`in-progress`，需维护者 review。社区持续关注沙箱文件系统策略的应用层与 OS 层 "drift" 问题，与今日关闭的 #9593（TaskRecord 生命周期统一）形成呼应——社区对"单一事实来源"架构原则有较强诉求。
**深层诉求**：多个高热度 Issue 指向同一个方向——**架构收敛**。社区希望减少重复状态、消除多处维护的漂移、建立统一抽象。


## 5. Bug 与稳定性

### 🔴 严重（S1 - 工作流阻断）

**#10536 · macOS Seatbelt 忽略 configured allowed_roots for shell commands**
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)
风险配置了 `allowed_roots`，应用层安全策略已识别，但 shell 命令仍被 macOS Seatbelt 以 "Operation not permitted" 拒绝。`S1` 严重度 + `priority:p1`，当前 `in-progress`。无关联 fix PR。

### 🟠 中等（S2 - 行为降级）

**#10533 · model_routing_config 拒绝 custom.* 等合法 provider 槽位**（p1，in-progress）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)
工具校验与 config schema 不一致：`custom.*` 在 `providers.models` 中完全受支持，但 `model_routing_config` 工具会拒绝。直接影响使用 custom provider 的用户。

**#10625 · 非视觉模型下 `[media attachment]` 占位符被原样发送给用户**（p2，accepted）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)
降级路径将媒体标记替换为字面量 `[media attachment]` 后进入历史记录，用户侧看到的是原始占位符而非可读描述。

**#10532 · degraded-config 修复命令可能调用与运行中 daemon 不同的二进制**（p2）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10532)
当 daemon 从非 PATH 中的可执行文件启动时，`zeroclaw config migrate` 建议可能指向另一个版本。

**#10534 · bounded delegates 静默剥离 delegate 工具**（p2，risk:high）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)
与 `delegation_policy/max_delegation_depth` 配置相矛盾——无论配置如何，bounded 模式总是移除 delegate 工具。

**#10626 · TTS 逐字朗读 Markdown 与 emoji**（p2，accepted）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10626)
文本到达合成器前未剥离 Markdown/emoji，导致朗读时读出标记符号和 emoji 名称。

### 🟡 轻微（S3）

**#10585 · 新日志 sink 回归在默认并行 runner 下与迁移测试竞争**（p2，risk:medium）
[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)
日志测试与迁移测试共享全局 tracing subscriber，并行时存在竞态。

### ✅ 今日已关闭

| Issue | 类型 | 处理结果 |
|---|---|---|
| [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) | install.sh 在 Android/Termux 上选择 generic Linux 二进制 | 已关闭（修复） |
| [#9593](https://github.com/zeroclaw-labs/zeroclaw/issues/9593) | TaskRecord 生命周期统一重构 | 已关闭（跟踪完成） |
| [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910) | Windows 自更新路径测试覆盖 | 已关闭（CI 覆盖达成） |
| [#10048](https://github.com/zeroclaw-labs/zeroclaw/issues/10048) | Rust 1.98.0 本地 CI 验证 | 已关闭 |
| [#10045](https://github.com/zeroclaw-labs/zeroclaw/issues/10045) | 持久化图片标记保留临时源路径 | 已关闭 |
| [#10282](https://github.com/zeroclaw-labs/zeroclaw/issues/10282) | hardware probe feature 未传递到工具实现 | 已关闭 |


## 6. 功能请求与路线图信号

### 新功能请求

| Issue | 需求 | 信号强度 |
|---|---|---|
| [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) | **Web UI 分字段 cron 表达式输入**：当前为自由文本，无校验、无人类可读确认。带 `help wanted` 标签 | 中 — 体验优化类，实现成本可控 |
| [#10530](https://github.com/zeroclaw-labs/zeroclaw/issues/10530) | **通过 OpenAI-compatible gateway 传递 Anthropic extended-thinking 参数**：LiteLLM/TrueFoundry 等代理场景下，extended thinking 静默不可用 | 中高 — 与现有 #10063 形成系列，企业部署常见场景 |

### 路线图信号

- **#10549 · 简化 RFC 投票流程**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)）：提议取消强制讨论窗口，使 REVISE 直接停止当前快照。社区对 RFC 流程效率的反馈已形成正式提案。
- **#10339 · 已接受的 shell V1 审批策略实施 tracker**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10339)）：#7155 的 Phase 0/1 实施已获接受，进入执行阶段。
- **#10050 · Verbatim channel send over gateway**（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)）：已接受（accepted），将在后续版本加入网关直发消息能力，无需 agent turn。

### 可能纳入 v0.8.6 的判断

- #10641（cron 分字段输入）已打上 `accepted` 标签，实现成本低，很可能进入下一迭代。
- #10530（extended-thinking passthrough）虽无 `accepted` 标签，但企业代理场景需求明确，且有 #10063 基础，值得关注。
- #10549 若被采纳，将改变 RFC 协作节奏，对社区治理影响深远。


## 7. 用户反馈摘要

### 真实用户痛点

**安装与平台适配**
- Android/Termux 用户安装 ZeroClaw 时被分发 generic Linux 二进制（#7911，今日已关闭），反映非标准平台的二进制选择逻辑仍需加固。来自 @state-space-swarm 的反馈。
- 硬件探针功能（#10282，今日已关闭）feature flag 未正确传递到工具层，影响外设开发者的功能可用性。

**配置与安全摩擦**
- #10533 用户在使用 `custom.truefoundry` 等自定义 provider 时遭遇工具拒绝，反馈"tool validation diverges from config schema"——配置 schema 支持但工具不认，是直接的可用性障碍。
- #10532 修复建议可能调用不同二进制，用户可能执行了错误版本的迁移命令而不自知，属于"安全建议反噬"场景。

**日常使用体验**
- TTS 朗读 Markdown 和 emoji 名称（#10626）："a spoken reply reads markup aloud and pronounces emoji by name"——在语音场景下体验明显受损。
- 非视觉模型收到 `[media attachment]` 字面量（#10625）：用户看到的是无意义的占位符而非可理解的描述。

### 使用场景洞察

- **企业代理部署**是重要场景：多个 Issue（#10530、#10533）围绕 OpenAI-compatible gateway 与 custom provider 展开，说明 ZeroClaw 在企业内部通过代理访问大模型是常见部署形态。
- **多平台覆盖**诉求增多：Android/Termux、macOS Seatbelt、Windows 自更新——用户期望 ZeroClaw 在各平台获得一致的体验。

### 满意信号

- #7910（Windows 自更新修复验证）从 6 月跟踪至今已关闭，社区对该问题的持续追踪最终落地，说明修复流程闭环有效。
- WASM 插件系统 PR（#5230）经过 5 个月 review 后合并，社区对扩展机制有明确需求且耐心等待。


## 8. 待处理积压

### ⚠️ 需维护者重点关注

| 项目 | 状态 | 备注 |
|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) RFC: Runtime-owned conversation sessions | Revision 5，33条评论，需维护者开启新投票窗口 | 核心架构讨论，社区投入大量时间，需明确回应 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) RFC: Unified file/attachment architecture | Revision 10，26条评论 | 与 #9487 强相关，建议关联决策 |
| [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) RFC: Composable WASM plugin runtime | 9条评论，`needs-maintainer-review` | 与已合并的 #5230 形成互补，需评估是否纳入路线图 |
| [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) Telegram secure model picker | XL，`do-not-merge`，`ne

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-06

## 1. 今日速览

过去24小时内，PicoClaw 项目整体活跃度处于**中等偏稳健**水平：共发生 2 条 Issue 更新（1 新开/活跃、1 关闭）和 3 条 PR 更新（全部合并/关闭，无待合并）。**无新版本发布**。社区讨论重心集中在 IRC 长消息处理这一用户体验问题上（#3287，10 条评论），同时维护者完成了 3 个整合性合并 PR，清理了 12 个历史修复 PR 的积压。项目在**社区需求收集**和**维护清理**两个维度均有可见进展，但无重大功能落地或版本迭代信号。

---

## 3. 项目进展

今日合并/关闭的 3 个 PR 均由 @xuwei-xy 提交，均属于**修复整合类合并**，创建于 2026-03-14，在 2026-09-05 统一关闭：

| PR | 内容 | 状态 |
|---|---|---|
| [#1559](https://github.com/sipeed/picoclaw/pull/1559) | 合并修复自 #1327 #1319 #1318 #1313 | ✅ 已关闭 |
| [#1555](https://github.com/sipeed/picoclaw/pull/1555) | 合并修复自 #1390 #1389 #1383 #1381 | ✅ 已关闭 |
| [#1545](https://github.com/sipeed/picoclaw/pull/1545) | 合并修复自 #1500 #1490 #1488 #1487 #1485 | ✅ 已关闭 |

**分析**：这三个 PR 本质上是对此前分散在各处的小型修复 PR 的**批量整合**，覆盖了至少 12 个历史 PR。虽然没有引入新功能，但可以有效**收敛代码库中的技术债务**，将分散的修复统一纳入主干。考虑到这些 PR 从 3 月拖至 9 月才关闭，说明维护者正在**集中清理长期积压的合并请求**，这对项目健康度是一个积极信号——修复内容最终汇入主干，避免分叉累积。

---

## 4. 社区热点

**[#3287 [Feature] Better support long messages in IRC](https://github.com/sipeed/picoclaw/issues/3287)**
- 作者：@superuser-does | 创建：2026-07-22 | 更新：2026-09-05 | 评论：10 | 👍：0
- **热度来源**：10 条评论使其成为近 24 小时内讨论密度最高的议题，且更新日期表明该讨论仍在持续发酵。

**背后诉求**：IRC 协议默认将消息限制在 512 字节以内，超出部分会被客户端自动拆分。用户希望 PicoClaw 能将 IRCv3 下被拆分的长消息**重新识别为单条完整消息**来处理，而非拆分成多条独立消息。这反映了真实用户场景中 PicoClaw 作为 IRC 机器人（或通过 IRC 交互的 AI 助手）时，面对长文本输出的**完整性和连贯性需求**——AI 生成的长回复不应被协议层的截断机制割裂。10 条评论说明社区对此问题有较高共鸣，讨论中可能涉及不同 IRC 客户端行为差异和 IRCv3 标签（tags）的利用方式。

---

## 5. Bug 与稳定性

过去 24 小时数据中**无新报告的 Bug、崩溃或回归类 Issue**。今日关闭的 3 个整合性 PR 均为修复类合并，涉及此前分散的 #1327 #1319 #1318 #1313 #1390 #1389 #1383 #1381 #1500 #1490 #1488 #1487 #1485 等 12 个 PR 的修复内容。虽然各 PR 的具体修复说明未在前端展示，但综合来看，这批合并有助于**消除此前遗留的已知问题**，对项目整体稳定性有正向意义。

当前无已知的**未解决高危 Bug** 处于公开活跃状态。

---

## 6. 功能请求与路线图信号

### 🟡 值得关注的新功能需求

**[#3287 — IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)**（10 评论，仍开放）
- **核心需求**：将 IRCv3 中拆分的长消息重新组装为单一消息，保证 PicoClaw 对上下文的完整性理解。
- **路线图信号**：IRC 属于 PicoClaw 的**连接器/渠道层**，此类需求说明社区正在将 PicoClaw 用于真实 IM/IRC 机器人场景。该 Issue 评论数已属活跃，但 👍 数为 0，需求强度有待观察。**若后续点赞/评论持续增加，有望进入下一版本的功能候选列表。**

### 🔵 已关闭的功能请求

**[#3342 — "Turn 后"转向模式的 opt-in 队列机制](https://github.com/sipeed/picoclaw/issues/3342)**（已关闭，2 评论）
- **核心需求**：当用户在处理过程中发送第二条消息时，可选择将消息**排队等待当前回合结束**再处理，而非中断当前回合（后者是现有 steering 行为）。
- **关闭原因**：标记为 `[stale]`，大概率因长期无维护者响应或缺乏社区支持而自动/手动关闭。
- **信号分析**：这并不意味着需求不存在——它反映的其实是**"中断 vs 排队"的交互范式分歧**，对 AI 助手类项目是重要设计决策。该需求若仍被社区需要，或将换个形式重新提出，值得维护者留意。

---

## 7. 用户反馈摘要

基于当前可见的 Issue 讨论内容，提炼用户真实反馈如下：

| 反馈类型 | 来源 | 用户表述/场景 |
|---|---|---|
| **场景诉求** | [#3287](https://github.com/sipeed/picoclaw/issues/3287) | 用户使用 IRCv3 协议与 PicoClaw 交互，AI 生成的长回复被 IRC 客户端按 512 字节截断为多条消息，导致 PicoClaw 将単条回复误判为多条独立消息，影响语义理解。用户期望"长消息应被视为一条连贯消息"。 |
| **交互设计偏好** | [#3342](https://github.com/sipeed/picoclaw/issues/3342) | 用户希望在 AI 繁忙时发送的消息能**排队等待**而非**打断当前任务**。现有机制会跳过剩余工具调用并注入新消息，但部分用户更希望"先完成手头的事，再回应新消息"。 |
| **痛点共性** | 以上两者 | 用户对 PicoClaw 的**消息处理语义**（如何分段消息、如何排队消息）高度敏感，说明该项目已进入真实生产环境的应用阶段，用户开始关注与具体协议/交互细节的磨合。 |

---

## 8. 待处理积压

**重点观察（基于当前数据可见范围）：**

- **[#3287 — IRC 长消息支持](https://github.com/sipeed/picoclaw/issues/3287)**：创建于 2026-07-22 至今仍未关闭，已持续 **46 天**，评论数 10 条但无维护者明确分配/回应记录。作为当前讨论热度最高的功能请求，建议维护者尽快给出**明确回应**（计划纳入 / 暂不考虑 / 需要更多信息），避免社区讨论陷入停滞。

- **老 PR 清理完成**：今日关闭的 3 个 PR 创建于 2026-03-14，耗时近 6 个月才合并/关闭。这批老 PR 的清理是积极信号，但说明项目存在**PR 处理周期偏长**的问题，维护者响应速度有待提升。虽然当前待合并 PR 为 0，但历史上 PR 从提交到合并的平均时长值得关注。

- **⚠️ 数据可见性限制**：当前提供的数据仅展示了过去 24 小时有更新的 2 个 Issue 和 3 个 PR，无法覆盖**所有仍处于 Open 状态的长期 Issue/PR**。要获得完整的积压视图（例如未更新的老 Issue），建议进一步查看 [PicoClaw Issues 列表](https://github.com/sipeed/picoclaw/issues) 和 [PicoClaw Pull Requests 列表](https://github.com/sipeed/picoclaw/pulls)。

---

*数据来源：[github.com/sipeed/picoclaw](https://github.com/sipeed/picoclaw) | 更新截至 2026-09-05*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-06

---

## 1. 今日速览

过去 24 小时 NanoClaw 项目整体活跃度偏低：无新增或关闭 Issue，无新版本发布；3 条 Pull Request 处于待合并状态（其中 2 条为新提交、1 条为存量更新），合并活动为零。项目当前处于"提交有节奏、合并需推动"的窗口期——3 条待合并 PR 分别指向稳定性修复（signal-cli 版本钉死）、工程质量（测试临时目录清理）与文档准确性（模型 ID 更新），均属于低成本高价值的改动，建议维护者优先安排审查与合入。整体判断：项目健康度良好，但合并节奏本周有所放缓。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日无 PR 被合并或关闭，合并主分支的进展为零。值得关注的是，3 条待合并 PR 分别覆盖了以下推进方向，等待维护者放行：

- **Signal 通道稳定性修复**（[#3725](https://github.com/nanocoai/nanoclaw/pull/3725)）：修复新装 Linux 版 Signal 发送消息时可能永久挂起的问题，钉死 signal-cli 到 0.14.7（取代会挂起的 0.14.3），属于直接影响用户消息送达的关键修复。
- **测试工程卫生**（[#3710](https://github.com/nanocoai/nanoclaw/pull/3710)）：消除 `pnpm test` 每次运行遗留约 355 个临时目录的问题，改善长期运行的开发机和 CI runner 的磁盘/内存（tmpfs）占用。
- **文档模型 ID 更新**（[#3724](https://github.com/nanocoai/nanoclaw/pull/3724)）：将 `add-opencode` 技能示例中已退役的 Anthropic 模型 ID 更新为当前有效值，避免用户复制过期配置。

若这 3 条 PR 顺利合入，项目将同时获得一个"用户可见的稳定性提升"和两个"开发者体验改进"。

---

## 4. 社区热点

今日无高讨论量 Issue 或 PR（各条目评论数均为 0）。相对而言，最受关注的是 [#3725](https://github.com/nanocoai/nanoclaw/pull/3725)——该 PR 修复的"signal-cli 0.14.3 在向无已有 session 的联系人发送消息时永久挂起"属于高影响问题，任何使用 Linux + Signal 渠道的用户都可能遇到，预计合入或关闭时会引发更多讨论。

---

## 5. Bug 与稳定性

今日无新 Bug 报告，但有 3 个已提交修复的待审 PR，按严重程度排序：

| 严重程度 | 问题描述 | 修复 PR | 状态 |
|---|---|---|---|
| 🔴 高 | Linux 版 signal-cli 0.14.3 在向无已有 session 的联系人发消息时永久挂起，导致消息无法送达 | [#3725](https://github.com/nanocoai/nanoclaw/pull/3725) 钉死至 0.14.7 | 待合并 |
| 🟡 中 | 完整跑一次 `pnpm test` 会在 OS 临时目录遗留约 355 个目录，无法自动回收，长期积累占用磁盘/tmpfs 空间 | [#3710](https://github.com/nanocoai/nanoclaw/pull/3710) 清理测试残留 | 待合并 |
| 🟢 低 | `add-opencode` 技能文档中的 Anthropic 模型 ID（`claude-sonnet-4-20250514`）已于 2026-06-15 被官方退役，用户依文档使用会报错 | [#3724](https://github.com/nanocoai/nanoclaw/pull/3724) 更新为 `claude-sonnet-5` | 待合并 |

---

## 6. 功能请求与路线图信号

今日无新功能请求提交。从待合并 PR 中可观察到的路线图信号偏向于"稳定性加固"而非新功能扩张：

- Signal 渠道的版本钉死策略表明项目开始关注"渠道依赖的版本可控性"，未来可能引入更系统的依赖版本管理机制；
- 测试临时目录清理表明项目在 CI 长期运行场景下开始重视资源回收，可能为后续扩大 CI 覆盖范围做准备；
- 文档模型 ID 的快速修正说明 `add-opencode` 技能正在被真实用户使用，社区反馈链路畅通。

---

## 7. 用户反馈摘要

今日无 Issue 评论可供提炼。从 PR 描述中可间接获得以下用户痛点/场景：

- **Linux + Signal 用户**：向新联系人（无已有 session）发送消息时可能遇到永久挂起，影响核心聊天功能——这是阻塞型痛点，修复 PR 已就绪。
- **长期开发者与 CI 维护者**：反复运行测试套件会导致临时目录无限累积，在 tmpfs 环境（如默认 /tmp）下可能直接拖垮 CI runner——属于典型的"慢性资源泄漏"问题。
- **add-opencode 技能使用者**：文档中 Anthropic 模型 ID 已过期数月，说明有真实用户正在按文档配置并遭遇失败，驱动了本次修正。

---

## 8. 待处理积压

今日无长期未响应的 Issue，但有 3 条待合并 PR 需要维护者关注，其中部分已等待数日：

| PR | 主题 | 创建日期 | 等待时间 | 建议 |
|---|---|---|---|---|
| [#3710](https://github.com/nanocoai/nanoclaw/pull/3710) | test: 清理测试套件遗留的临时目录 | 2026-09-03 | 3 天 | 改动简单、无破坏性，建议尽快审查合入 |
| [#3725](https://github.com/nanocoai/nanoclaw/pull/3725) | fix(setup): 钉死 Linux signal-cli 至 0.14.7 | 2026-09-05 | 1 天 | 涉及 Signal 通道稳定性，建议优先处理 |
| [#3724](https://github.com/nanocoai/nanoclaw/pull/3724) | docs: 更新 add-opencode 中已退役的模型 ID | 2026-09-05 | 1 天 | 纯文档修复，低风险，可快速合入 |

整体来看，当前积压规模很小且全部是"低成本快速合入"类型，不存在阻塞性长期遗留问题。

---

*本日报基于 GitHub 公开数据自动生成，数据采集时间：2026-09-06。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-06

## 今日速览

过去 24 小时 IronClaw 项目整体处于**轻度活跃**状态：无新版本发布，无 PR 被合并或关闭；有 2 笔核心贡献者提交的 PR 处于待合并状态，其中 #8075 为功能性变更（嵌入式 Pi sandbox 默认启动），#7988 为 CI 自动化维护；另有 1 个 bug issue（#8074）处于讨论中，聚焦共享频道通知文案错误问题。整体节奏属于常规开发与 QA 并行的状态，项目健康度稳定。

---

## 版本发布

无新版本发布。

---

## 项目进展

今日无 PR 被合并或关闭，但有两笔待合并 PR 值得关注：

- **[#8075 feat: make the embedded Pi sandbox loop the startup default](https://github.com/nearai/ironclaw/pull/8075)** — 由核心贡献者 @serrrfirat 提交，将 pinned Bun/Pi agent-core worker 加入 sandbox 镜像并将默认启动方式切换为 `hosted-...` 配置，旨在服务基准测试需求。该 PR size 为 XL，风险标记为 low，且**堆叠在 #7908 之上，需等待基础 PR 先合入**。

- **[#7988 chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)** — 由 `ironclaw-ci[bot]` 自动生成的代码库记忆快照刷新，属于 nightly CI 工作流的一部分，size 为 XS，风险 low，仅需正常 review 和 merge。

项目整体尚未在本窗口内完成实际代码合入，但两笔 PR 表明“嵌入式 sandbox 启动体验”和“代码库知识图谱维护”是当前正在推进的两条线。

---

## 社区热点

今日讨论最活跃的是 bug issue **[#8074](https://github.com/nearai/ironclaw/issues/8074)**，它是过去 24 小时内唯一带评论更新的 issue（1 条评论，创建于 9 月 4 日，9 月 5 日有更新）。

该 issue 描述了共享频道中一个身份与连接状态的交叉场景：**paired 用户在未连接的共享频道中执行操作时，收到的是面向 unpaired 用户的 `connect_required` 提示文案，而非“频道未连接”的提示**。这暴露了多用户协作场景下提示文案分发逻辑的边界遗漏，也反映出共享频道作为多人协作入口的体验问题正在被社区和核心团队认真审视。

---

## Bug 与稳定性

| 严重程度 | Issue | 说明 | Fix PR 状态 |
|---|---|---|---|
| 低~中 | [#8074 共享频道通知文案错误](https://github.com/nearai/ironclaw/issues/8074) | Paired 用户在未连接的共享频道中，错误收到面向 unpaired 用户的“connect your account in the IronClaw web app…”文案，而非“频道未连接”提示。此问题不影响数据安全，但会误导用户操作流程，降低共享频道可用性。 | 尚无关联 fix PR |

该问题属于交互文案正确性缺陷，定位明确，修复成本预计不高，建议维护者尽快确认归属模块并安排修复。

---

## 功能请求与路线图信号

- **[#8075 将嵌入式 Pi sandbox 设为启动默认](https://github.com/nearai/ironclaw/pull/8075)** 是当前最明确的功能推进信号。它与此前 #7903/#7908 的 native-loop sandbox 探索一脉相承，说明 **“嵌入式 Pi sandbox 作为默认运行环境”** 正在成为项目短期路线图中的实际交付项，且被明确标记为服务 benchmark 使用场景。

- 用户侧暂无新增功能请求 issue。

---

## 用户反馈摘要

来自 [#8074](https://github.com/nearai/ironclaw/issues/8074) 的真实用户场景反馈：

- **使用场景**：用户以 paired 身份在共享频道中操作，但该频道对当前安装未连接。
- **痛点**：系统给出的引导文案与用户实际状态不匹配——提示用户去连接账户，而用户已经完成账户配对，真正的问题是频道连接状态。
- **预期行为**：提示应区分“用户未配对”和“频道未连接”两种独立状态，并针对当前实际状态给出精准引导。

该反馈表明：共享频道相关提示文案需要按 actor 类型（paired/unpaired）与连接状态（connected/not-connected）两个维度分别设计，现有逻辑存在状态组合遗漏。

---

## 待处理积压

当前无超过两周未被响应的 issue 或 PR。以下两项值得维护者关注：

- **[#7988 代码知识图谱刷新 PR](https://github.com/nearai/ironclaw/pull/7988)**：bot 创建于 8 月 29 日，目前已满一周仍处于待合并状态，建议维护者按常规流程 review 并 merge，避免 nightly 快照持续滞后。

- **[#8075 嵌入式 sandbox PR](https://github.com/nearai/ironclaw/pull/8075)**：依赖基础 PR #7908，合入链条较长，建议维护者明确 #7908 的合并时间线，以免阻塞 benchmark 相关工作的落地。

---

*数据窗口：2026-09-05 至 2026-09-06 · 数据来源：[IronClaw GitHub](https://github.com/nearai/ironclaw)*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报 (2026-09-06)

> 数据周期：2026-09-05 ~ 2026-09-06 | 数据来源：GitHub

## 1. 今日速览

项目今日活跃度较低：过去 24 小时无新增 Issue、无 PR 合并/关闭、无版本发布，核心合并节奏明显放缓。值得关注的是，两条自 3 月底遗留的 PR（#1069、#1070）在 9 月 5 日出现状态更新，但均仍处于待合并的 stale 状态。这两条 PR 分别指向代码质量重构与 MCP 精细化管理方向，若长期积压，将拖累项目在 Agent 桌面端的迭代效率。整体健康度中等，需要维护者加快对过期 PR 的处置。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日无 PR 被合并或关闭，项目主分支未产生实质推进。但有两条待合并 PR 在昨日（9 月 5 日）获得更新，值得关注它们所代表的潜在进展：

- **[#1069: 重构：拆分 CoworkSessionDetail 单文件，提升可维护性与渲染性能](https://github.com/netease-youdao/LobsterAI/pull/1069)**
  - 核心对话组件 `CoworkSessionDetail.tsx` 已膨胀至 **2100+ 行**，该 PR 将其按职责拆分为多个文件（types、纯函数、UI 子组件等），同时解决流式输出时无关联历史消息被顶层状态更新触发的不必要重渲染问题。
  - 若合并，将显著降低后续功能迭代的维护成本，并提升对话页面的渲染性能。

- **[#1070: feat(cowork): 支持 per-session MCP 开关控制](https://github.com/netease-youdao/LobsterAI/pull/1070)**
  - 为会话输入框新增 MCP 控制按钮，每个会话可独立启用/禁用特定 MCP server，并在 OpenClaw 引擎的 `McpBridgeServer` 层实现请求拦截，确保开关真实生效。
  - 这是对 OpenClaw 生态桌面级 Agent 能力的直接补强，将 MCP 从全局开关细化为会话级粒度。

**小结**：虽然今日无合并，但两条 PR 一旦落地，分别在"代码可维护性"和"MCP 会话隔离"两个维度上有明确增量，建议纳入近期里程碑。

## 4. 社区热点

今日无高讨论量 Issue。仅有的两条 PR 更新，由于长期处于 stale 状态，在 9 月 5 日被重新触碰（可能是维护者标记或评论）：

- [#1069 重构类 PR](https://github.com/netease-youdao/LobsterAI/pull/1069)
- [#1070 功能类 PR](https://github.com/netease-youdao/LobsterAI/pull/1070)

**热点解读**：两条 PR 均为 3 月 30 日创建，距今已超过 5 个月，被标记为 stale 意味着即将被自动关闭。这侧面反映了项目近期对"既有 PR 清理"的社区关注点——是合并、关闭还是继续迭代，是维护者需要尽快回应的信号。

## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。

但需要留意：[#1069]() 中提到的"流式输出时，无关联历史消息因顶层状态更新而触发不必要重渲染"是一个已知的潜在性能问题，虽非致命崩溃，但在长对话场景下影响交互流畅性。该问题已随重构 PR 一并修复，建议优先推动评审合并。

## 6. 功能请求与路线图信号

从今日更新的 PR 中可提取明确的路线图信号：

- **Per-session MCP 开关控制（[#1070](https://github.com/netease-youdao/LobsterAI/pull/1070)）**：用户反馈"所有会话共享同一套 MCP 配置"是主要痛点，该 PR 直接回应了"不同会话场景需要独立 MCP 配置"的诉求。这是 OpenClaw 生态中精细化控制 Agent 工具权限的重要一步，极有可能被纳入下一版本能力清单。

- **组件与逻辑解耦（[#1069](https://github.com/netease-youdao/LobsterAI/pull/1069)）**：属于工程重构类需求，反映出项目在功能扩张后对可维护性、可测试性的重视，是进入稳定期前的必要技术债清理。

暂无其他新的用户功能请求进入视野。

## 7. 用户反馈摘要

今日无新的 Issue 评论。基于两条 PR 的简要描述，可提炼出用户侧的真实诉求：

- **痛点 1：MCP 配置粒度太粗**——所有会话共享全局 MCP 开关，用户无法针对不同任务场景（如编程、写作、联网检索）灵活组合工具。希望做到"会话级独立启停，状态持久化"。（来源：[#1070](https://github.com/netease-youdao/LobsterAI/pull/1070)）
- **痛点 2：核心组件难以维护**——`CoworkSessionDetail.tsx` 已达 2100+ 行，内联函数、Hook 逻辑、子组件混杂，开发者定位问题耗时，纯函数无法独立测试。（来源：[#1069](https://github.com/netease-youdao/LobsterAI/pull/1069)）

这些反馈均指向"项目功能增长快、工程质量需跟上"的共性诉求。

## 8. 待处理积压

以下两条 PR 自 2026-03-30 创建，均已进入 stale 状态（最后更新 2026-09-05），请维护者优先处理：

| PR | 标题 | 创建时间 | 最后更新 | 状态 | 积压天数* |
|---|---|---|---|---|---|
| [#1069](https://github.com/netease-youdao/LobsterAI/pull/1069) | 重构：拆分 CoworkSessionDetail 单文件 | 2026-03-30 | 2026-09-05 | OPEN / stale | ~160 天 |
| [#1070](https://github.com/netease-youdao/LobsterAI/pull/1070) | feat(cowork): 支持 per-session MCP 开关控制 | 2026-03-30 | 2026-09-05 | OPEN / stale | ~160 天 |

*注：以 2026-09-06 为基准计算。

**维护者建议**：
1. 尽快在 GitHub 上对这两条 PR 给出明确态度（合并 / 关闭 / 请求修改）。
2. 若因近期维护资源紧张导致的停滞，建议在 stale 机器人自动关闭前安排至少一次代码评审。
3. 这两条 PR 分别属于"工程质量"与"核心功能"，长期滞留会增大后续 merge conflict 的解决成本，并可能使社区贡献者流失。

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

# CoPaw 项目动态日报（2026-09-06）

> 数据来源：GitHub `agentscope-ai/QwenPaw`（即 CoPaw 项目仓库） | 统计窗口：过去 24 小时

## 今日速览

CoPaw 过去 24 小时保持中等偏高的社区活跃度：共 10 条 Issue 更新（7 条新开/活跃、3 条关闭），3 条 PR 处于开放状态，无新版本发布。社区讨论焦点集中在 2.2.0 多租户 Hub 路线图（#7318），同时出现了多个 v2.1–v2.2 版本的稳定性 Bug 报告，其中 img-gen 的两个缺陷已在当天关闭。PR 侧暂无合并动作，但 `make-skill v2`（#7509）已标为 Ready for Merge，Advisor Mode（#7569）等新功能仍在推进。整体来看，项目功能探索和用户反馈活跃，稳定性修复与代码合入速度仍需关注。

## 项目进展

- **无 PR 被合并或关闭**。当前 3 条开放 PR 均处于待评审/待合并阶段，仓库维护节奏偏慢。
- **3 个 Bug Issue 被关闭**：
  - [#7474 自定义提供商（custom provider）加载失败](https://github.com/agentscope-ai/QwenPaw/issues/7474) 已关闭，该问题由 PR #7337 引入的 `ModelInfo.max_tokens → max_output_length` 迁移导致。
  - [#7574 img-gen 请求体缺失 model 字段导致 503 回退到 dall-e-2](https://github.com/agentscope-ai/QwenPaw/issues/7574) 已关闭。
  - [#7575 img-gen edit() 总是携带 response_format 导致 HTTP 400](https://github.com/agentscope-ai/QwenPaw/issues/7575) 已关闭。

虽然没有代码合并，但上述三个 Bug 的关闭说明一部分回归/缺陷已得到解决；`#7509` 进入 Ready for Merge 状态，意味着 Skill 工作流升级可能即将合入。

## 社区热点

- **[#7318 QwenPaw Hub 多租户版即将在 2.2.0 推出：社区希望优先做什么？](https://github.com/agentscope-ai/QwenPaw/issues/7318)**  
  评论 23、👍 3，是今日讨论热度最高的 Issue。核心诉求是社区多次提出“团队化运行”需求，官方以 QwenPaw Hub 作为回应，并在该讨论中征求后续方向。用户关注的已有先例包括 #2324（多用户访问和管理员管理技能）。这是路线图级别的社区聚集地，值得产品/维护团队重点跟进。

## Bug 与稳定性

按严重程度排序（均未见关联 fix PR）：

| 严重程度 | Issue | 问题描述 | 状态 |
|---|---|---|---|
| 高 | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | `RetryChatModel` 硬编码 32768 context_size fallback，导致所有模型在 token 超过约 31130 时触发 `CONTEXT_UNFIT`，

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 — 2026-09-06

## 1. 今日速览

过去24小时内，ZeptoClaw 仓库出现了明显的**维护者集中行动**：新开了 12 个 Issues（全部由维护者 @qhkm 创建，评论为 0），提交了 2 个待合并的 PR（均对应 P0 安全问题），无新版本发布。这组数据反映了 **2026-09-06 进行一次深度的架构 review（`docs/reviews/2026-09-06-hermes-comparison-review.md`）之后的核心整改规划**，其中 2 个 P1-critical 安全修复已完成编码、正在等待合并。整体而言，项目处于**密集架构整改期**，安全优先级明显高于功能迭代。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日暂无 PR 被合并或关闭。两个修复 PR 尚待合并，均直接瞄准 P0 安全发现：

- **[#671 fix(security): fail closed on invalid agent_mode (P0 #659)](https://github.com/qhkm/zeptoclaw/pull/671)** — 将无效 `agent_mode` 回退逻辑从 `Autonomous` 改为安全的 `Assistant`，防止未知配置值导致权限最大化的安全事故。该修复直接消除一个 P0 安全漏洞。
- **[#672 fix(security): scrub inherited env in plugin/MCP spawn sites (P0 #660)](https://github.com/qhkm/zeptoclaw/pull/672)** — 补齐了 `binary_plugin`、`MCP transport`、`channel plugin` 三个 spawn 位点的环境变量清理，封堵了子进程泄露 API 密钥等敏感信息的途径。该修复与 runtime 级清理形成互补，扩大安全覆盖面。

两个 PR 合并后，今日发现的 2 个 P0 安全问题将被直接消除，项目的安全防线可明显加强。


## 4. 社区热点

**今日无外部社区互动**——所有 Issues 和 PR 均由维护者 @qhkm 创建，评论和反应均为 0。这表示今日动态是维护者内部驱动，而非社区反馈驱动的。

值得关注的是，12 个 Issues 在同一天内由维护者密集批量开启（#659–#670），且**彼此之间呈现高度的结构一致性**：每个 Issue 都对应 `docs/reviews/2026-09-06-hermes-comparison-review.md` 中的一个执行编号（Exec #3 至 Exec #10）和章节，说明这是经过系统性审计后形成的整改矩阵，而非零散的 bug 报告。

两个 P0 安全问题的集中修复（#659、#660 → #671、#672）是今日最值得关注的热点，反映出项目在安全方面存在两个“默认不安全”的设计点。


## 5. Bug 与稳定性

今日报告的均为架构审查发现的安全相关 Issues，按严重程度排列如下：

### P0 / P1-critical（安全）
- **[#659 Fail closed on invalid agent_mode — never fall back to Autonomous](https://github.com/qhkm/zeptoclaw/issues/659)** — `src/security/agent_mode.rs:147–160` 对无效模式字符串回退到 **Autonomous**（最大权限）而非安全默认值。**已有 fix PR #671。**
- **[#660 Centralize child-process env scrubbing across all spawn sites](https://github.com/qhkm/zeptoclaw/issues/660)** — `native.rs`、`binary_plugin.rs`、`mcp/transport.rs`、`channels/plugin.rs` 四个位置构造子进程 `Command` 时未统一清理环境变量，存在密钥泄漏风险。**已有 fix PR #672。**

### P2-high（稳定性 / 架构欠账）
- **[#663 生产环境仍运行 5,227 行的 AgentLoop，Pipeline 迁移未完成](https://github.com/qhkm/zeptoclaw/issues/663)** — 代码注释中已声明生产将改用 `CoreLoop`（Phase 4a），但生产环境主循环仍然运行旧实现，pipeline 仅用于测试。
- **[#662 Channel 插件协议不完整（仅出站、fire-and-forget、存在 stall 风险）](https://github.com/qhkm/zeptoclaw/issues/662)** — 插件 channel 的 stdout/stderr 被 pipe 了却没有使用，且没有消息确认机制。


## 6. 功能请求与路线图信号

12 个新 Issues 整体构成了 ZeptoClaw 的**下一阶段架构演进路线图**，可归类为以下方向：

**A. 安全和权限（最高优先）**
- #659、#660（两个 P0，已有 fix PR）
- [#664 Delegated-agent capability inheritance](https://github.com/qhkm/zeptoclaw/issues/664) — 子代理不得超越父策略的能力继承机制

**B. 架构现代化**
- [#663 Agent Pipeline 迁移完成](https://github.com/qhkm/zeptoclaw/issues/663) — 替换 5,227 行 AgentLoop
- [#667 Extension Host v2 + Footprint Ladder](https://github.com/qhkm/zeptoclaw/issues/667) — 解决“核心操作面过度膨胀”
- [#668 Hermetic seam-level integration tests](https://github.com/qhkm/zeptoclaw/issues/668) — 补强系统接缝处测试

**C. 核心能力增强**
- [#665 Cron Job v2](https://github.com/qhkm/zeptoclaw/issues/665) — 补全调度系统的完成确认与运行记录
- [#666 Durable cross-session memory + transactional writes](https://github.com/qhkm/zeptoclaw/issues/666) — 记忆跨会话持久化
- [#661 Byte-stable Prompt Envelope](https://github.com/qhkm/zeptoclaw/issues/661) — 解决 prompt cache 友好性（系统提示词每次重建，缓存失效）

**D. 运维 & 配置体验**
- [#669 Audit-chain 持久化与轮转](https://github.com/qhkm/zeptoclaw/issues/669) — 审计链跨重启的防篡改证据
- [#670 Config source opacity](https://github.com/qhkm/zeptoclaw/issues/670) — 解决配置来源不透明 + 元数据重复维护

以上均为维护者自行提出，基本可以确定会按既定的安全优先级和架构依赖顺序进入后续迭代，**初步预计 P0 修复并合并后，P2-high 中的 #663（Pipeline 迁移）和 #661（Prompt Envelope，[RFC]）将优先进入开发队列**。


## 7. 用户反馈摘要

今日没有外部用户的 Issues 或评论数据。不过，从维护者撰写的 Issue 摘要中可以看出几个真实的**用户痛点**（维护者基于项目使用场景代入梳理）：

- **配置行为困惑**（#670）：用户在文件或环境变量中设置同一行为时，无法知道“实际生效值来自哪里”；支持新集成需要在配置类型、验证等位置做多处重复编辑。
- **信任与安全担忧**（#664、#660）：子代理能力不受限、子进程环境变量继承，可能导致“代理做过头”或凭据泄露。
- **可靠性缺失**（#662、#665）：Cron 任务没有“成功”确认机制和运行台账，无法判断任务是否真正完成；插件 channel 只支持出站，且 sent 后没有到达确认。
- **性能期望**（#661）：每次 turn 都重建系统提示词导致 prompt-cache 命中率低，长期使用成本偏高。

这些反馈是维护者针对设计文档的“预期用户痛点”形态，而非社区发帖，阅读时应有所区分。


## 8. 待处理积压

今日 12 个新 Issues 和 2 个新 PR 均为创建当天，**不构成长期积压**。但需要注意：

- 两个 P0 修复 PR（#671、#672）**尚未获得审查和合并**。由于它们是安全关键修复，建议优先处理，避免 P0 漏洞在修复可用的状态下仍然暴露。
- 12 个新 Issues 本身构成了一个集中待办清单（2 个 P0 + 8 个 P2-high + 2 个 RFC），其中 8 个 P2-high 项都标记了预估工作量（M/L），属于**跨多个迭代的整改计划**，需要维护者持续跟进，避免审计后的高优先级项被搁置。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*