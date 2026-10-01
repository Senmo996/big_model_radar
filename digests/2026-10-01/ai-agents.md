# OpenClaw 生态日报 2026-10-01

> Issues: 491 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-01 02:58 UTC

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

# OpenClaw 项目动态日报 — 2026-10-01

## 1. 今日速览

过去 24 小时项目活跃度极高：共产生 **491 条 Issue 更新**（新开/活跃 317 条，关闭 174 条）与 **500 条 PR 更新**（待合并 329 条，已合并/关闭 171 条），并发布新版本 **v2026.9.7**。社区讨论重心集中在 SQLite 无界增长、内存泄漏/锯齿、子代理（Subagent）结果静默丢失等稳定性问题上，P0 级缺陷数量偏多（Top 50 中至少 12 个），说明项目正处于高迭代节奏与稳定性承压并存的阶段。合并/关闭 171 条 PR 表明维护团队响应速度尚可，但大量 `clawsweeper:no-new-fix-pr` 标签的积压 Issue 提示部分深水区问题（如子代理编排、记忆存储）长期未获根本修复。

## 2. 版本发布

### v2026.9.7（2026-10-01）

- **规模**：518 个直接提交（direct commits）、2,818 个 PR、334 位贡献者
- **发布说明**：[Release notes](https://docs.openclaw.ai/rel…)（与 changelog 内容一致，提供两种格式）
- **关联修复**：新版本已包含针对部分已知问题的修复，如 [#161734](https://github.com/openclaw/openclaw/issues/161734) 中提到的 Doctor 归档迁移重复检查问题，以及 [#162056](https://github.com/openclaw/openclaw/pull/162056) 涉及的保留已删除智能体数据库不应阻塞升级的修复（含 backport）。
- **注意事项**：版本跨度为 2026.9.6 → 2026.9.7，属常规发布；当前无明确破坏性变更披露，但 [#153257](https://github.com/openclaw/openclaw/issues/153257) 等用户报告 9.5 版本升级曾引发严重稳定性问题，建议升级前关注 9.6/9.7 的 issue 跟踪状态，尤其是 Windows 平台（SQLite WAL、进程环境 Proxy 克隆相关）。

## 3. 项目进展

今日合并/关闭 171 条 PR，重点进展如下：

| 方向 | PR | 说明 |
|---|---|---|
| 更新/升级可靠性 | [#162245](https://github.com/openclaw/openclaw/pull/162245)（已合并） | 修复 Windows 上因 NTFS lease 标识取整导致的回滚失败；与 [#162130](https://github.com/openclaw/openclaw/issues/162130) 对应 |
| 文档体系 | [#162255](https://github.com/openclaw/openclaw/pull/162255)（已合并） | Agents API 独立 onboarding 指南，降低新用户上手门槛 |
| UI 修复 | [#162279](https://github.com/openclaw/openclaw/pull/162279)（已合并） | 全局搜索预览不再显示原始 Markdown 标记，改为可读纯文本 |
| 通知渠道 | [#161657](https://github.com/openclaw/openclaw/pull/161657)（已合并） | 停止在聊天中重放 Codex 诊断日志通知，避免误报刷屏 |

**待合并的重要 PR（有望进入 v2026.9.8）：**

- [#162321](https://github.com/openclaw/openclaw/pull/162321)（P0，S）：修复 Doctor 在深层 session owner 链上栈溢出，阻断更新激活的问题 — *ready for maintainer look*
- [#162226](https://github.com/openclaw/openclaw/pull/162226)（P1，L）：修复模型目录 worker 因插件 scope 增长而丢弃增量加载的插件，关联 [#161379](https://github.com/openclaw/openclaw/issues/161379) CPU 核心占用问题
- [#161421](https://github.com/openclaw/openclaw/pull/161421)（P1，XL）：修复配对客户端在排队元数据后超时，涉及连接元数据观察时机的所有权缺口
- [#156540](https://github.com/openclaw/openclaw/pull/156540)（P1，XL）：修复私有子代理完成后 yield 请求无人应答的问题
- [#162056](https://github.com/openclaw/openclaw/pull/162056)（P0，L）：修复保留的已删除智能体数据库阻塞升级
- [#162258](https://github.com/openclaw/openclaw/pull/162258)（P1，M）：避免 WAL 数据库在 schema 检查期间被激活导致更新中止

整体判断：项目正在系统性地修复升级管线、Windows 兼容性、子代理状态机三大类问题，但修复 PR 的合并速度仍低于新缺陷的发现速度。

## 4. 社区热点

| 热度 | Issue/PR | 核心诉求 |
|---|---|---|
| 🔥 100 评论 | [#143524](https://github.com/openclaw/openclaw/issues/143524) | Windows 单网关环境下 Agent SQLite WAL 无界增长至 2.8 GB 并阻塞网关启动；wal_autocheckpoint=1000 失效，手动 checkpoint 后数日内复现。**诉求：WAL checkpoint 机制在 Windows 上失效的根因修复** |
| 🔥 40 评论 | [#153257](https://github.com/openclaw/openclaw/issues/153257) | 用户明确表示"后悔升级 2026.9.5"，稳定环境升级后陷入 8 小时故障恢复会话。**诉求：升级前风险提示、回滚机制、9.5 引入的回归定位** |
| 🔥 30 评论 | [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成结果静默丢失（E31/E42/E45 多种失败模式），无重试、无通知、无自动重启，自 3 月 13 日至今未修复。**诉求：子代理编排的可靠性保证与失败可见性** |
| 🔥 22 评论 | [#149538](https://github.com/open

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比报告 — 2026-10-01

## 1. 生态全景

2026-10-01 的生态处于“核心高迭代、外围分层明显”的状态。OpenClaw 以日近千条 Issue/PR 更新量稳居中枢，但其 P0 缺陷密度与用户“后悔升级”等反馈表明，高速迭代与稳定性承压并存。与此同时，NanoBot、Zeroclaw、CoPaw 等中坚项目分别在渠道体验、v0.9.0 架构冲刺、Beta 功能验证上发力，而 IronClaw、EasyClaw 及三个无活动项目则构成“维护与休眠”尾部。跨项目共性主题高度集中：升级/回滚可靠性、SQLite 存储治理、子代理结果可见性、通道通知降噪、权限安全边界。这标志着生态正从“功能堆叠”转向“工程化治理与可信部署”阶段。

## 2. 各项目活跃度对比

| 项目 | Issues 动态 | PR 动态 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 491 更新（新开/活跃 317，关闭 174） | 500 更新（待合并 329，合并/关闭 171） | **v2026.9.7** | 高迭代但稳定性承压，Top50 中至少 12 个 P0，修复速度低于缺陷发现速度 |
| **NanoBot** | 11（全部关闭） | 30（22 合并/关闭，8 待合并） | 无 | 良好，集中收敛历史积压，安全修复待合入 |
| **Zeroclaw** | 50 更新（45 新增/活跃，5 关闭） | 50 更新（47 待合并，3 合并/关闭） | 无 | 高活跃、高风险敞口，v0.9.0 前 S0 安全与架构加固 |
| **PicoClaw** | 0 | 6（3 关闭/合并，3 开放） | 无 | 中等，Review 周期偏长，DeltaChat 重构积压 3 个月 |
| **NanoClaw** | 1（关闭） | 15（2 合并/关闭，13 待合并） | 无 | 稳健，流程规范，更新可靠性系列修复落地 |
| **IronClaw** | 0 | 1（待合并） | 无 | 低活跃、稳定，基础设施 PR 积压 33 天 |
| **LobsterAI** | 10 更新（1 新提交，其余 stale 刷新） | 11 更新（3 新提交，8 清理关闭） | 无 | 常规维护，安全响应快，但三月积压多 |
| **

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-01

## 今日速览

过去24小时项目活跃度较高，共处理11条Issue（全部关闭）和30条PR（22条合并/关闭，8条待合并），无新版本发布。值得关注的是，维护者集中关闭了一批历史Issue（最早可追溯至2026年3月），覆盖飞书渠道、TUI、Telegram、Token估算等多个领域，反映了近期修复工作对积压问题的系统性收敛。当前有8个PR处于待合并状态，其中包括若干优先级为p1/p2的修复件；项目整体健康度良好，社区反馈渠道畅通，但对历史Issue的关闭节奏快于新Issue的开启（今日新开0条），需注意新问题上报活跃度。

---

## 项目进展

今日共有22个PR被合并/关闭，主要集中于以下方向：

- **会话与资源管理架构改进**：[#5993 refactor(agent): scope tool resources to session cancellation](https://github.com/HKUDS/nanobot/pull/5993) 合并后将资源取消范围限定到具体会话，覆盖活动工具、子代理、Shell进程树与回复计时器，避免用户停止会话时影响其他会话，是并发场景下的关键稳定性改进。
- **WebUI 多项修复**：
  - [#5989 fix(webui): stop repairing completed Markdown](https://github.com/HKUDS/nanobot/pull/5989) 修复完成回复后可能残留尾部下划线的问题（NAN-205）。
  - [#5991 fix(webui): keep completed turns terminal across late events](https://github.com/HKUDS/nanobot/pull/5991) 修复延迟广播导致已完成回合被重新打开、处理中指示器误显示的问题。
  - [#5988 fix(cli): avoid duplicate WebUI config announcement](https://github.com/HKUDS/nanobot/pull/5988) 移除重复的配置路径打印（NAN-208）。
- **TUI 三连修复**：[#5950](https://github.com/HKUDS/nanobot/pull/5950) 恢复已保存会话的历史记录回显；[#5966](https://github.com/HKUDS/nanobot/pull/5966) 保证溢出选择项在键盘/鼠标操作下可达；[#5958](https://github.com/HKUDS/nanobot/pull/5958) 在终端未响应主题查询时使用默认前景/背景色，避免文字不可见。
- **Provider 兼容性**：[#5938 fix(providers): preserve optional tool parameters](https://github.com/HKUDS/nanobot/pull/5938)（优先级 p1）修复 Responses API 工具转换丢失可选参数的问题，防止 `query` 和 `customView` 等参数被泄漏到同一调用。
- **渠道行为调整**：[#5780 fix: stop sending context compaction notifications](https://github.com/HKUDS/nanobot/pull/5780) 合入后使自动压缩通知静默，仅保留 `/compact` 手动压缩时可见。

---

## 社区热点

今日讨论焦点集中在飞书（Feishu/Lark）渠道的体验问题上，相关Issue均有3-5条评论：

- **[#5903 [bug] Feishu: hidden session-checkpoint marker is delivered to the user after idle compaction](https://github.com/HKUDS/nanobot/issues/5903)**（5条评论） — 内部使用的 session-checkpoint 标记（`Continue the active task from the working-memory checkpoint above.`）在闲置压缩后作为普通消息推送给用户，尽管消息带有 `_hidden` 前缀但仍有暴露风险。该Issue已于今日关闭。
- **[#5956 [bug] Feishu 无 in-place edit 能力，compaction notice 应可关闭](https://github.com/HKUDS/nanobot/issues/5956)**（3条评论） — 用户指出 `notification_delivery.py` 将压缩事件硬编码为发送到源频道，且飞书渠道缺乏"编辑原消息"的能力，导致压缩开始/完成两条噪音消息出现在对话中。该Issue引用了同类 #5784 并已关闭。
- **[#5987 [bug, question] Numbers-only cannot be recognized in TUI debug-mode](https://github.com/HKUDS/nanobot/issues/5987)**（4条评论） — TUI 调试模式下纯数字输入无法被识别，而字母字符正常。该Issue今日创建今日关闭，处理效率极高。

综合来看，社区对飞书渠道的改造需求（尤其是减少自动通知噪音）呼声较高，[#5780 PR](https://github.com/HKUDS/nanobot/pull/5780) 的合入正是对此类反馈的直接回应。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| 高 | [#5997 fix(linear): reject stale member access updates after reauthorization](https://github.com/HKUDS/nanobot/pull/5997) | 工作区断开重连后，旧请求可能重新启用已被拒绝的成员访问权限（安全风险） | OPEN（待合并） |
| 高 | [#5994 fix(agent): preserve explicitly empty tool registries](https://github.com/HKUDS/nanobot/pull/5994) | 显式传入空工具注册表时仍会恢复默认工具，`write_file` 可绕过禁止策略被执行（安全相关） | OPEN（待合并） |
| 高 | [#5995 fix(agent): clear stale failure state when resuming runner iterations](https://github.com/HKUDS/nanobot/pull/5995) | 后续消息可能被误报为失败运行，导致最终 WebSocket 回复被抑制 | OPEN（待合并） |
| 中 | [#5903 Feishu 隐藏标记泄露](https://github.com/HKUDS/nanobot/issues/5903) | 内部 checkpoint 标记推送给最终用户 | CLOSED（已修复） |
| 中 | [#5987 TUI 纯数字输入不可识别](https://github.com/HKUDS/nanobot/issues/5987) | 调试模式下数字无法识别 | CLOSED（今日关闭） |
| 中 | [#5938 Responses 工具可选参数丢失](https://github.com/HKUDS/nanobot/pull/5938) | 可选 MCP 过滤器参数被强制为必须，导致不兼容调用错误 | CLOSED（已合并） |
| 中 | [#3626 Telegram long polling 静默挂起](https://github.com/HKUDS/nanobot/issues/3626) | 网络问题导致长轮询连接挂起，进程存活但停止接收更新 | CLOSED（5月创建，今日关闭） |
| 低 | [#5348 时区导致 token usage 测试约5小时窗口失败](https://github.com/HKUDS/nanobot/issues/5348) | `record_token_usage()` 默认 UTC，而设置负载读取配置时区 | CLOSED（今日关闭） |

---

## 功能请求与路线图信号

以下 PR 包含明确的新功能或架构演进方向：

- **[#5941 feat(webui): connect to existing remote nanobot instances](https://github.com/HKUDS/nanobot/pull/5941)**（OPEN）— 实现 NAN-157：允许本地 WebUI 发现并连接已在服务器上运行的 nanobot 实例，无需特殊启动器脚本。该功能回应了 [#2084 多实例管理风险](https://github.com/HKUDS/nanobot/issues/2084) 中用户对实例管理的诉求。
- **[#5985 feat(subagent): add session-owned task messaging and cancellation](https://github.com/HKUDS/nanobot/pull/5985)**（OPEN）— 基于 #5976 新增子代理会话消息能力：对话可发送后续指令、检查任务结果（`my`）、取消单个排队/运行中的子代理而不影响父代理或兄弟。
- **[#5992 fix(providers): support scoped proxies across all backends](https://github.com/HKUDS/nanobot/pull/5992)**（OPEN）— 修复 NAN-212：为所有后端（含原生、OAuth、自定义、仅转写提供商）提供 **高级 → 网络代理** 配置入口。
- **[#5990 fix(webui): preserve TeX formula boundaries in streaming Markdown](https://github.com/HKUDS/nanobot/pull/5990)**（OPEN）— 修复 NAN-204：流式渲染中 `\[...\]` 内的独立 `=` 被误判为 Setext 标题边界。
- **[#5943 refactor(session): centralize state ownership in SQLite](https://github.com/HKUDS/nanobot/pull/5943)**（OPEN，优先级 p1）— 以 SQLite 事务替代 JSONL 作为持久化权威存储，是会话架构层面的深度重构，虽不直接面向用户但影响后续并发与数据一致性能力。

从路线图看，项目正沿"WebUI 远程化"和"会话/子代理精细化控制"两个方向推进，同时持续强化 security 边界。

---

## 用户反馈摘要

- **飞书用户对压缩通知噪音不满**（[#5956](https://github.com/HKUDS/nanobot/issues/5956)）：用户 `@shenchaovip-afk` 明确指出压缩事件被硬编码发送到源频道，由于飞书缺乏 in-place edit 能力，无法像其他渠道一样合并/替换消息，希望提供关闭开关。对应修复 PR #5780 已合入：自动压缩通知将不再对用户可见，但 `/compact` 手动压缩保留通知。
- **Telegram 用户遭遇长轮询静默挂起**（[#3626](https://github.com/HKUDS/nanobot/issues/3626)）：用户 `@WormW` 报告 ISP NAT 超时、Wi-Fi 漫游、防火墙重置等问题可导致连接挂起，像僵尸进程一样存活但失聪。Issue 于5月创建、评论4条、今日关闭，说明该问题已获解决或替代方案已落地。
- **TUI 调试模式数字输入异常**（[#5987](https://github.com/HKUDS/nanobot/issues/5987)）：用户 `@Tomlili43` 提供了截图和 `.vscode/launch.json` 配置，该类问题虽影响范围有限，但说明开发者用户对 TUI 调试体验有真实使用需求。
- **定时任务在特定模型下偶发失败**（[#3106](https://github.com/HKUDS/nanobot/issues/3106)）：用户 `@SamNotAltman` 反映使用 GPT 设置定时任务时报错"完成工具步骤但无法产生最终答案"，而 gml-4.7 则正常，提示模型差异可能导致工具调用链断裂。该Issue于4月创建，今日确认关闭。
- **多实例管理仍为潜在痛点**（[#2084](https://github.com/HKUDS/nanobot/issues/2084)）：用户 `@JiajunBernoulli` 请求一个实例重启另一个实例时，机器人启动了重复进程而非重启守护进程。该Issue今日关闭，但 #5941 的远程实例连接功能可能会从产品层面缓解此问题。

---

## 待处理积压

以下为仍处于 OPEN 状态、值得维护者关注的 PR/Issue（按创建时间排序）：

- **[#5941 WebUI 远程实例连接（NAN-157）](https://github.com/HKUDS/nanobot/pull/5941)** — 9月27日创建，等待合并。该 PR 直接关联社区长期诉求（#2084），也是 WebUI 产品化的重要一步，建议优先评审。
- **[#5943 会话状态集中到 SQLite（p1）](https://github.com/HKUDS/nanobot/pull/5943)** — 9月27日创建，架构级重构，涉及 JSONL→SQLite 迁移和状态所有权收敛，评审周期可能较长，如合入将影响后续所有会话功能开发。
- **[#5997 Linear 成员访问权限过期更新（安全）](https://github.com/HKUDS/nanobot/pull/5997)** — 9月30日创建，修复重连后旧请求可重启用已被拒绝的成员权限问题，属安全边界修复，建议尽快合并。
- **[#5994 空工具注册表被忽略（安全）](https://github.com/HKUDS/nanobot/pull/5994)**、**[#5995 陈旧失败状态清除](https://github.com/HKUDS/nanobot/pull/5995)**、**[#5992 全后端代理支持](https://github.com/HKUDS/nanobot/pull/5992)**、**[#5990 TeX 公式流式渲染](https://github.com/HKUDS/nanobot/pull/5990)**、**[#5985 子代理会话消息/取消](https://github.com/HKUDS/nanobot/pull/5985)** — 均为9月30日创建的新 PR，等待首轮评审反馈。

总体来看，项目在当前周期内处于高强度的合并/收尾阶段，移动端和 Web 端体验正在持续打磨，安全性相关修复也有多条进入待合并队列，预计下一阶段将迎来一轮新版本发布。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 2026-10-01

## 1. 今日速览

过去 24 小时项目保持高强度活跃：50 条 Issue 更新（90% 为新增/活跃，10% 已关闭），50 条 PR 更新（94% 待合并），无新版本发布。当前最突出的信号是**v0.9.0 发布前的安全与架构加固**：多个 S0 级（数据丢失/安全风险）权限问题处于开放状态，且高度集中在身份与访问管理（identity-access）领域；与此同时，gateway/daemon 分离相关的巨型 PR 批量涌现（今日更新近 10 条，多为 size:XL），表明主线开发正在为 v0.9.0 做最后冲刺。项目整体健康度处于「高活跃、高风险敞口、高修复投入」的状态，维护者带宽需向 S0 安全问题倾斜。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日明确合并/关闭的 PR 为 1 条（另有 2 条已合并/关闭未进入评论榜 Top 20）：

- **#11293** [closed] fix(ci): ignore unread labels in the PR risk report's stale-metadata check — 修复了 PR 风险报告在文件分类后重新读取 label 时因全量比对导致误报失败的问题，提升 CI 可靠性。[PR #11293](https://github.com/zeroclaw-labs/zeroclaw/pull/11293)

尽管合并节奏较慢，但今日更新的 PR 清晰展示了 v0.9.0 的推进方向：

- **gateway/daemon 架构分离**取得实质进展：#11345（桌面端 RPC 就绪与版本握手）、#11331（通过 core 提供 sessions REST）、#11280（health、TUI 列表、成本与事件历史路由）、#11277（每个 core 连接绑定调用者凭据）等多条 PR 今日集中更新，标志着「外部 gateway」方案正在从设计走向落地。[#11345](https://github.com/zeroclaw-labs/zeroclaw/pull/11345) [#11331](https://github.com/zeroclaw-labs/zeroclaw/pull/11331) [#11280](https://github.com/zeroclaw-labs/zeroclaw/pull/11280) [#11277](https://github.com/zeroclaw-labs/zeroclaw/pull/11277)
- **插件系统重构**：#11339 将插件 webhook 预留存储从 gateway 的 IdempotencyStore 迁移到 Wasmtime-free 的独立类型，为跨进程插件 webhook 铺路。[PR #11339](https://github.com/zeroclaw-labs/zeroclaw/pull/11339)
- **配置发布机制**：PR #10911 发布原子 live revisions，将配置与修订号绑定在同一个读锁下，今日仍有更新，是配置热加载可靠性的关键改进。[PR #10911](https://

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-10-01

> 数据来源：github.com/sipeed/picoclaw | 统计周期：过去 24 小时

## 1. 今日速览

过去 24 小时内，PicoClaw 没有新 Issue、没有新版本发布，动态集中在 Pull Request 侧：共 6 条 PR 更新，其中 3 条进入关闭/合并状态，3 条仍开放待处理。整体活跃度处于“维护与修复并进”的中等水平，没有大规模架构变更或社区讨论爆发。值得关注的是 `customAllowPatterns` 修复和 Web UI 多通道会话侧栏两个方向，分别代表稳定性补强和前端体验迭代。项目健康度良好，但开放 PR 的 Review 周期偏长，容易形成积压。

---

## 3. 项目进展

### 已关闭/合并 PR（3 条）

- **#3313 Fix: agent not able to execute shell command added to customAllowPatterns**  
  [https://github.com/sipeed/picoclaw/pull/3313](https://github.com/sipeed/picoclaw/pull/3313)  
  修复 `customAllowPatterns` 不生效的问题。原先 `guardCommand` 中默认 deny 模式优先级高于用户自定义允许模式，导致类似 `git push` 的命令即使被加入 allow list 也无法执行。这是一个直接影响用户日常操作的可靠性修复，对 agent 可执行命令的配置信任度有实质提升。

- **#1349 [type: enhancement, domain: channel, go] feat(qq): support parsing and replying to more attachment types**  
  [https://github.com/sipeed/picoclaw/pull/1349](https://github.com/sipeed/picoclaw/pull/1349)  
  扩展 QQ Channel 消息能力：支持 emoji 结构解析、接收语音/图片/视频/文件，并支持回复本地附件。回复时优先使用 Markdown，失败后降级。这是对 QQ 渠道功能完整度的重要补齐。

- **#423 [type: enhancement] WIP: feat: base multi-agent collaboration framework & shared context**  
  [https://github.com/sipeed/picoclaw/pull/423](https://github.com/sipeed/picoclaw/pull/423)  
  一个持续较久的 WIP PR，涉及多 agent 协作框架，包括 Blackboard 共享上下文、agent handoff 和发现工具。该 PR 最终被关闭，未进入合并列表。不过其依赖的底层 #213（provider protocol refactor）和 #131（model fallback chain + multi-agent routing）此前已合并，说明相关方向已有基础积累。

---

## 4. 社区热点

由于今日 Issue 动态为 0，社区注意力集中在 PR 上。从更新状态和内容看，热点有两个：

- **#3313 用户自定义允许命令失效**  
  [https://github.com/sipeed/picoclaw/pull/3313](https://github.com/sipeed/picoclaw/pull/3313)  
  用户报告“明明配置了允许执行 `git push`，agent 却无法执行”，直接触发了对命令守卫逻辑的修复。这反映出用户对 agent 可控性和权限配置透明度的需求很高。

- **#3412 / #3413 同一作者连续提交体验类改动**  
  [https://github.com/sipeed/picoclaw/pull/3412](https://github.com/sipeed/picoclaw/pull/3412)  
  [https://github.com/sipeed/picoclaw/pull/3413](https://github.com/sipeed/picoclaw/pull/3413)  
  一个修复“失败 turn 对用户不可见”的问题，另一个为 Web UI 增加全局多频道会话侧栏。两者都指向“让用户明确知道 agent 的状态与结果”，背后诉求是提升可观测性和交互可用性。

---

## 5. Bug 与稳定性

按严重程度排列：

- **高：自定义命令 allow list 被默认 deny 规则覆盖**  
  触发场景：agent 无法执行已加入 `customAllowPatterns` 的命令，例如 `git push`。  
  影响：权限配置不生效，用户对 agent 的信任度受损。  
  状态：已有修复 PR **#3313**，已关闭/合并，建议确认测试覆盖后发布。  
  [https://github.com/sipeed/picoclaw/pull/3313](https://github.com/sipeed/picoclaw/pull/3313)

- **中：失败 turn 产生的错误被丢弃，用户无感知**  
  触发场景：一次 turn 未产出回复，错误通知虽已生成，却在 `message` 工具等三个环节中被吞掉，用户只看到“沉默”。  
  状态：修复 PR **#3412** 已开放，等待 Review 与合并。  
  [https://github.com/sipeed/picoclaw/pull/3412](https://github.com/sipeed/picoclaw/pull/3412)

---

## 6. 功能请求与路线图信号

- **Web UI 全局多频道会话侧栏**  
  PR **#3413** 实现全局、多频道会话列表，替代当前仅显示 `pico` 会话且位于头部下拉菜单的方案。该 PR 是 #3406 的第 2-A 部分，明确属于 Web UI 路线图的一部分。  
  [https://github.com/sipeed/picoclaw/pull/3413](https://github.com/sipeed/picoclaw/pull/3413)

- **QQ 频道多附件支持**  
  PR **#1349** 已关闭/合并，为 QQ 渠道带来更完整的富媒体交互能力，下一版本中可能实装。  
  [https://github.com/sipeed/picoclaw/pull/1349](https://github.com/sipeed/picoclaw/pull/1349)

- **多 agent 协作框架仍是远期方向**  
  #423 虽被关闭，但其底层 #213 和 #131 已合入，说明 provider 协议重构、模型 fallback 与多 agent 路由已经是项目基础能力。后续若重新设计协作层，仍可能基于这些基础设施推进。

---

## 7. 用户反馈摘要

从今日 PR 描述中可提炼出两类真实用户痛点：

- **“我明明加了 allow list，`git push` 还是不让执行。”**  
  —— 来自 #3313 作者。用户期望配置规则是可信且透明的，尤其是安全限制类功能，任何“看起来生效但实际不生效”的行为都会严重破坏体验。

- **“一次失败 turn 之后，用户只能面对一片空白。”**  
  —— 来自 #3412 描述。说明 agent 出错时缺少必要的错误反馈，用户无法判断是卡住、失败还是仍在处理。这是 AI 助手类产品的重要体验盲区。

这些反馈都指向同一个核心诉求：**agent 行为需要可解释、可预期、可配置**。

---

## 8. 待处理积压

- **#3222 refactor(deltachat): cleanup implementation, documentation -200LOC**  
  创建于 2026-07-03，已开放近 3 个月。该 PR 删除遗留特性、移除密码邮件配置、更新 relay 列表说明，并统一 invite link 命名。属于清理型重构，长期未合并可能导致分支过期或冲突加剧。  
  [https://github.com/sipeed/picoclaw/pull/3222](https://github.com/sipeed/picoclaw/pull/3222)

- **#3412 fix(agent): make a failed turn visible to the user**  
  2026-09-30 创建，仍处于待 Review 状态。该修复直接关系到 agent 使用体验，建议优先处理。  
  [https://github.com/sipeed/picoclaw/pull/3412](https://github.com/sipeed/picoclaw/pull/3412)

- **#3413 feat(web): global multi-channel session sidebar**  
  2026-09-30 创建，等待 Review。属于较大功能，建议尽早确认交互设计与后端接口兼容性。  
  [https://github.com/sipeed/picoclaw/pull/3413](https://github.com/sipeed/picoclaw/pull/3413)

---

**总结**：今日 PicoClaw 无新 Issue、无 Release，主要成就在于修复命令 allow list 可靠性、补齐 QQ 渠道附件能力，同时出现两个提升用户可见性的 PR。项目整体处于稳定迭代期，但开放 PR 的 Review 周期需要关注，尤其是 7 月以来的 DeltaChat 重构仍未合入。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-01

## 今日速览

过去 24 小时 NanoClaw 活跃度较高：新增/更新 PR 15 条（其中 2 条已合并/关闭，13 条待合并），Issues 更新 1 条（已关闭），无新版本发布。核心团队（@glifocat）围绕 `/update-nanoclaw` 的可靠性问题提交了系列修复，社区贡献者则集中在 Telegram 适配器缺陷和网络代理支持上。项目目前处于高频迭代与功能扩展并行阶段，流程规范度良好（多数 PR 标注 `follows-guidelines`），整体健康度稳健。

## 项目进展

今日共有 2 条 PR 关闭，标志着两项实质性修复落地：

- **[PR #3974] fix(container): refresh agent-runner lockfile to clear transitive advisories**（[@glifocat]）  
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3974)  
  刷新 `container/agent-runner/bun.lock`，消除 `@modelcontextprotocol/sdk` 1.29.0 引入的旧传递依赖（hono、@hono/node-server 等）带来的 `bun audit` 告警。属安全加固，不改变现有依赖范围。

- **[PR #3962] fix(update): refuse cutover when the service liveness probe itself fails**（[@glifocat]）  
  [查看 PR](https://github.com/nanocoai/nanoclaw/pull/3962)  
  修复 `detectService` 中 `active` 状态误判问题，防止 `/update-nanoclaw` 在 liveness probe 自身异常时仍报告 “complete”，从而避免旧版本继续运行却无法被感知的风险。

以上两项分别从依赖安全和更新流程可靠性上为项目提供了质量保障。

## 社区热点

今日最集中的讨论主题有两个，虽然具体评论数未披露，但 PR 提交的密集度足以反映社区关注方向：

1. **更新/回滚流程可靠性**（@glifocat 系列 PR）  
   - [PR #3956] fix(update): rollback stops the live nohup host and drains agent containers  
     https://github.com/nanocoai/nanoclaw/pull/3956  
   - [PR #3962]（见上文，今日合并）  
   - [Issue #3961] [bug] /update-nanoclaw reports phase: complete without restarting the host  
     https://github.com/nanocoai/nanoclaw/issues/3961  

   **诉求分析**：用户对更新后旧进程仍存活、回滚不彻底等场景高度敏感，希望更新脚本具备更强的状态感知和故障预判能力。

2. **Telegram 适配器体验优化**（@antonio-antuan 系列 PR）  
   - [PR #3971] fix(telegram): route forum topics as threads  
     https://github.com/nanocoai/nanoclaw/pull/3971  
   - [PR #3972] fix(telegram): drop service messages instead of forwarding them as empty  
     https://github.com/nanocoai/nanoclaw/pull/3972  
   - [PR #3973] fix(telegram): resend as plain text when Telegram can't parse entities  
     https://github.com/nanocoai/nanoclaw/pull/3973  

   **诉求分析**：Telegram 用户在论坛话题隔离、服务消息过滤、MarkdownV2 实体解析失败等细粒度交互上有明确改进需求，期望适配器行为更贴近原生客户端。

## Bug 与稳定性

| 严重程度 | 问题描述 | 状态 | 链接 |
|---------|---------|------|------|
| **高** | `/update-nanoclaw` 报 “complete” 但旧主机仍在运行，服务从未重启 | Issue 已关闭，修复 PR #3962 今日合并 | [Issue #3961](https://github.com/nanocoai/nanoclaw/issues/3961) / [PR #3962](https://github.com/nanocoai/nanoclaw/pull/3962) |
| **高** | `rollback` 不停止正在运行的 nohup 主机，也未在替换 `data/` 前清空 agent 容器 | PR 待合并 | [PR #3956](https://github.com/nanocoai/nanoclaw/pull/3956) |
| **中** | Telegram 中 MarkdownV2 实体解析失败（如私网 IP 链接）导致整条消息被拒，且重试 3 次无效 | PR 待合并 | [PR #3973](https://github.com/nanocoai/nanoclaw/pull/3973) |
| **中** | Telegram 服务消息（置顶/成员加入等）被当作空消息转发，agent 逐一回复 | PR 待合并 | [PR #3972](https://github.com/nanocoai/nanoclaw/pull/3972) |
| **中** | Telegram 论坛话题未被作为线程处理，所有话题共享一个 session 且回复错位 | PR 待合并 | [PR #3971](https://github.com/nanocoai/nanoclaw/pull/3971) |
| **中** | reaction/编辑消息目标 ID 带了 agent-group 后缀，导致平台无法匹配 | PR 待合并 | [PR #3970](https://github.com/nanocoai/nanoclaw/pull/3970) |
| **低** | agent-runner 锁文件中存在旧传递依赖的安全告警 | PR 今日合并 | [PR #3974](https://github.com/nanocoai/nanoclaw/pull/3974) |

## 功能请求与路线图信号

以下 PR 虽未合并，但已提交并标注 `follows-guidelines` / `core-team`，可能进入下一版本：

- **Keyless 本地模型支持**（[PR #3966]）：允许 Iron 提供方在本机通过明文 HTTP 访问无密钥模型，仅暴露声明的端口和 OpenAI 推理路由，兼顾便利性与安全边界。  
  https://github.com/nanocoai/nanoclaw/pull/3966

- **Provider 精确端点声明**（[PR #3964]）：让 provider 可声明精确的 `host:port` 模型端点，core 将这些端点视同可信模型域，避免每次调用都弹出审批卡片。  
  https://github.com/nanocoai/nanoclaw/pull/3964

- **GitHub Copilot SDK provider**（[PR #3976]）：新增 `/add-copilot` 技能，以凭据网关持有 device-login token，避免 token 暴露在环境变量或容器状态中。  
  https://github.com/nanocoai/nanoclaw/pull/3976

- **通用 Runner 与 Host 扩展回调**（[PR #3975]）：提供 5 个惰性扩展回调点位，使 provider 能在技能无法触及的环节（如轮询循环中的后续任务处理）介入，无注册者时保持现有行为不变。  
  https://github.com/nanocoai/nanoclaw/pull/3975

- **上游贡献技能**（[PR #3928]）：为新分支提供 `/contribute-upstream` 操作技能，帮助 fork 以 seam/skill 方式安全地回馈上游，而非长期保留 fork 内修改。  
  https://github.com/nanocoai/nanoclaw/pull/3928

综合来看，项目路线图呈现“本地模型更易接入 + 外部服务衔接更顺滑 + 自适应扩展能力”的清晰方向。

## 用户反馈摘要

由于今日关闭的 Issue #3961 无评论，以下反馈提炼自各 PR 描述中用户明确指出的痛点：

- **更新流程中旧进程未被终止**是用户遇到的实际问题，导致更新后实际运行的仍是旧版本，且服务从未重启（[Issue #3961](https://github.com/nanocoai/nanoclaw/issues/3961)）。
- **在 Iron 下通过 HTTP 使用本地密钥模型时，设置流程曾建议访问 `http://host.docker.internal:<port>`，但之后每次调用都要求审批**，严重干扰使用体验（[PR #3965](https://github.com/nanocoai/nanoclaw/pull/3965)）。
- **GitHub Copilot token 传递给容器的现有方式会让凭据暴露面变大**，社区期待更安全的隔离方案（[PR #3976](https://github.com/nanocoai/nanoclaw/pull/3976)）。
- **代理环境下 host 服务无法正常访问互联网**，且 git fetch 在 Iron Proxy 场景下因缺少 `Proxy-Authenticate` 质询而失败（[PR #3901](https://github.com/nanocoai/nanoclaw/pull/3901)、[PR #3969](https://github.com/nanocoai/nanoclaw/pull/3969)）。
- **Telegram 适配器的空服务消息和实体解析失败**直接干扰 agent 回复质量，甚至导致整条消息被丢弃（[PR #3972](https://github.com/nanocoai/nanoclaw/pull/3972)、[PR #3973](https://github.com/nanocoai/nanoclaw/pull/3973)）。

## 待处理积压

- **[PR #3901] fix(setup): let the host service reach the internet through an HTTPS proxy**（@barnuri，创建于 2026-09-25）  
  自创建已 5 天未合并，且无评论互动。该 PR 涉及代理场景下的网络连通性问题，对国内及企业内网用户有实际影响，建议维护者关注。  
  https://github.com/nanocoai/nanoclaw/pull/3901

- **[PR #3928] feat(skills): add /contribute-upstream operational skill**（@barnuri，创建于 2026-09-26）  
  创建已 4 天，仍处于开放状态。该功能关乎 fork 生态的健康回馈机制，若长期无响应可能影响社区参与意愿。  
  https://github.com/nanocoai/nanoclaw/pull/3928

---

*本日报基于 GitHub 数据自动生成，时间为 2026-10-01。数据范围：过去 24 小时内更新/创建/关闭的 Issues 与 PR。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-01

> 数据来源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw) | 统计窗口：2026-09-30 至 2026-10-01


## 1. 今日速览

过去 24 小时 IronClaw 项目整体处于**低活跃但稳定**的状态：未收到新的 Issue，也没有 PR 被合并或关闭。唯一动态是一条由 CI 机器人自动提交的代码库知识图谱刷新 PR（#7988），仍处于待合并状态。该项目目前没有新版本发布，也没有用户侧的新问题涌入，说明近期改动较少，项目处于相对平静的维护窗口期。结合 #7988 已持续待合并超过一个月这一情况，维护者可能需要尽快处理该积压 PR，以维持 CI 基础设施的整洁度。

- 活跃度评级：🟢 低（1 条 PR 更新，0 条 Issue 更新）
- 健康度信号：无新 Bug 报告、无回归、无版本发布压力，整体健康但缺乏新进展


## 2. 版本发布

无（过去 24 小时没有新版本 Release）。


## 3. 项目进展

过去 24 小时**没有 PR 被合并或关闭**，因此没有可量化的功能推进或缺陷修复。当前唯一在途的 PR 为：

| PR | 标题 | 状态 | 说明 |
|---|---|---|---|
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | chore(agents): refresh codebase knowledge graph | 待合并 (Open) | 由 CI 机器人自动生成，刷新默认分支的代码库记忆引导快照，属于基础设施维护 |

该 PR 虽未合并，但它由 nightly `Codebase Graph Refresh` 工作流自动触发，若合入将保持项目的代码库知识图谱与最新 default 分支同步。考虑到这类 PR 是纯自动化的基础维护，其长期悬而未决不会影响功能开发，但可能导致后续快照偏离默认分支状态。


## 4. 社区热点

过去 24 小时**没有任何获得用户讨论或评论的 Issue/PR**。今日唯一动态是 [PR #7988](https://github.com/nearai/ironclaw/pull/7988)，由 `@ironclaw-ci[bot]` 自动创建，非用户发起，无互动（0 👍、0 评论）。

从长期角度看，该 PR 自 8 月 29 日创建至今已超过一个月，社区并未产生讨论，反映了当前阶段用户对该类后台维护任务关注度较低，社区讨论焦点可能集中在其他功能类议题上（但今日无新数据佐证）。


## 5. Bug 与稳定性

今日**没有收到 Bug 报告**，没有崩溃、回归或稳定性相关的新 Issue 被提交。现有唯一 PR #7988 被标记为 `risk: low`（低风险），属于 CI/基础设施变更，不涉及运行时行为修改。

**稳定性判断**：项目当前未暴露出已知的不稳定因素，处于可接受状态。


## 6. 功能请求与路线图信号

今日**没有新的功能请求**提交，也没有任何 Issue 表达用户对功能的需求或期望。因此无法从今日数据中推断下一版本的路线图方向。

唯一可参考的信号：PR #7988 本身并非功能请求，而是维护现有基础设施。如果项目的 roadmap 依赖定期刷新的代码库知识图谱（例如用于 agent 上下文构建），这一 PR 的尽快合入将保障该链路的及时性；但该方向属于工程内部能力，与用户可见的新功能无关。


## 7. 用户反馈摘要

今日**没有任何来自用户的 Issue 评论或 PR 评论**可供提炼。这意味着：

- 用户没有提出新的痛点或使用障碍；
- 没有对现有功能的明确不满；
- 也没有正面的使用反馈或使用场景分享。

该项目当前处于社区反馈的"静默期"，无法据此做用户情绪分析。


## 8. 待处理积压

以下 PR 已长期未获处理，值得维护者关注：

| 项目 | 标题 | 创建时间 | 已等待 | 当前状态 | 建议 |
|---|---|---|---|---|---|
| [#7988](https://github.com/nearai/ironclaw/pull/7988) | chore(agents): refresh codebase knowledge graph | 2026-08-29 | **33 天** | Open，待合并 | 该 PR 由 CI 自动生成、标记为低风险，且没有冲突或反对意见，建议安排一次 review 并尽快合入；长期悬挂会导致后续知识图谱快照持续过期 |

> 提示：由于该 PR 为 bot 自动创建，可能存在"无人认领"的情况，建议项目维护者将其纳入每周例行维护清单。


**日报总结**：IronClaw 今日处于典型的低活跃维护日，无新 Issue、无合并、无发布；唯一事项是长尾 PR #7988 依然悬而未决。项目整体健康，但需要防止基础设施类 PR 的持续积压。


*报告生成时间：2026-10-01 | 数据源：[github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-10-01

> 数据周期：2026-09-30 至 2026-10-01 | 数据来源：[GitHub - netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去 24 小时项目整体处于**常规维护 + 社区反馈沉淀**状态：共产生 10 条 Issue 更新（其中 1 条为新提交，其余多为历史遗留问题被 stale 标记刷新）和 11 条 PR 更新（3 条为今日实际提交，8 条为陈旧 PR 的清理关闭）。当日有一条**安全相关 Bug（#2784）**被报告并快速得到修复 PR（#2785）响应，说明项目对安全问题的处理链路仍然敏捷；但大量三月提交的 Issue 和 PR 仍处于长期未解决状态，可能需要维护者投入更多关注。无新版本发布。

---

## 2. 版本发布

无新版本发布（最新版本仍为 2026.9.23）。

---

## 3. 项目进展

今日实际合并/关闭的 PR 共 9 条，其中 2 条为今日新提交的修复，7 条为三月提交的陈旧 PR（多数为 stale 清理关闭）。新提交的 PR 聚焦在 OpenClaw 集成层的模型路由与输出限制优化：

- [PR #2787 [CLOSED] fix: custom model plan routing](https://github.com/netease-youdao/LobsterAI/pull/2787) — 修复自定义模型套餐路由逻辑，避免特定配置下流量被错误分发。由 @fisherdaddy 提交并关闭。
- [PR #2786 [CLOSED] fix(openclaw): default LobsterAI server models to a 32K output cap](https://github.com/netease-youdao/LobsterAI/pull/2786) — 解决 OpenClaw 默认 8192 token 输出上限导致推理模型答非所问的问题，将默认输出上限提高至 32768，同时保留服务端发布的上限、上下文窗口限制以及 Kimi K3 配置的优先级。由 @fisherdaddy 提交并关闭。

这两项修复直接提升了 OpenClaw 在 LobsterAI 服务端的实际可用性，尤其是长输出场景下的表现。

---

## 4. 社区热点

今日讨论最活跃的 Issue：

- [Issue #953：2026.3.26版任务点击停止、删除后未实际停止（3 条评论）](https://github.com/netease-youdao/LobsterAI/issues/953) — 这是评论数最多的问题，涉及任务生命周期管理的核心稳定性问题，用户反馈停止任务后浏览器仍然被打开、新任务执行时旧任务仍在后台运行，引发模型调用频率限制及“窜台”现象。虽然被标记为 stale，但用户诉求仍然强烈。
- [Issue #961：LobsterAI MCP Daemon（port 53699/6947）未启动（2 条评论）](https://github.com/netease-youdao/LobsterAI/issues/961) — 用户反馈升级/重启后 MCP 服务全部断开，Daemon 进程未启动，整个工具链失效。该问题对依赖 MCP 的用户影响较大，但目前仍未获得官方解决方案。
- [Issue #2784：NIM P2P direct-message policy fails open（1 条评论）](https://github.com/netease-youdao/LobsterAI/issues/2784) — 今日新开的**安全相关 Issue**，评论中已关联修复 PR #2785，属于“报告即被响应”的积极案例，截至统计时尚未合并。

---

## 5. Bug 与稳定性

按严重程度排列今日引起注意的 Bug 与稳定性问题：

| 严重程度 | Issue | 描述 | 修复状态 |
|---------|-------|------|---------|
| 🔴 严重（安全） | [#2784 NIM P2P direct-message policy fails open](https://github.com/netease-youdao/LobsterAI/issues/2784) | P2P 私聊消息过滤策略失效：`'disabled'` 策略、未设置策略、以及空的 `allowlist` 均会错误放行任意发送者。影响运行 2026.9.23 及 main 分支的实例。 | 已有修复 PR [#2785](https://github.com/netease-youdao/LobsterAI/pull/2785)（待合并） |
| 🟠 高 | [#953 任务停止/删除后未实际停止](https://github.com/netease-youdao/LobsterAI/issues/953) | 任务管理生命周期缺陷，停止无效、后台任务继续运行、导致 API 请求频繁和模型“窜台”。 | 无 PR，长期未修复，被标记 stale |
| 🟡 中 | [#961 MCP Daemon 未启动](https://github.com/netease-youdao/LobsterAI/issues/961) | MCP 工具链整体断开，自定义 MCP 服务全部失效。 | 无 PR，长期未修复，被标记 stale |
| 🟡 中 | [#962 升级后 403 Your request was blocked](https://github.com/netease-youdao/LobsterAI/issues/962) | 升级至最新版后请求被拦截，回退旧版恢复正常。 | 无 PR，长期未修复，被标记 stale |
| 🟢 低 | [#960 系统默认千问模型首次使用报错](https://github.com/netease-youdao/LobsterAI/issues/960) | 默认集成模型初次调用即报错，影响开箱体验。 | 无 PR，长期未修复，被标记 stale |

---

## 6. 功能请求与路线图信号

- **[#964 支持多 Agent，独立场景隔离架构](https://github.com/netease-youdao/LobsterAI/issues/964)** — 提出让一个 LobsterAI 实例同时承载多个独立助手场景（人设、知识库、IM 账号、任务互不干扰），属于较大的架构级功能需求，有潜力纳入下一阶段路线图。
- **[#947～#950 系列：IM 交互模型编排优化](https://github.com/netease-youdao/LobsterAI/issues/947)** — 由 #947、#948、#949、#950 四个 Issue 组成，集中反映 IM 场景下的模型使用体验问题：支持 IM 调用次序/优先级/配额、聊天窗口与 IM 模型分离、指定模型及失败提示优化。这些需求相互关联，若能合并为一个“IM 模型调度”功能迭代，将系统性改善多端交互体验。
- **[PR #958 临时会话功能](https://github.com/netease-youdao/LobsterAI/pull/958)** — 三月提交的⚡临时会话功能（一次性轻量聊天、不落盘、自动消失），至今仍是 OPEN 状态且被标记为 stale。该 PR 实现完整且有明确的隐私价值，建议维护者评估后合入下一版本。

---

## 7. 用户反馈摘要

从今日更新的 Issue 描述及评论中可提炼出以下真实用户声音：

- **任务生命周期管理是核心痛点**（#953）：用户原话“停止任务后仍然会打开浏览器搜索”且“本应被结束的任务还在后台运行，导致模型调用失败，显示 api 请求频繁”，说明当前任务调度机制对用户心智模型造成显著困扰，直接影响使用体验和资费消耗。
- **MCP 服务稳定性影响可信度**（#961）：非技术用户留言“不是搞软件的，不懂，如实反馈”，反映出普通用户对 MCP 依赖链断裂的无力感；Daemon 未启动即“整个 MCP 工具链断开”的问题急需提供自愈或诊断机制。
- **升级回归引发降级回退**（#962）：“升级到最新版后出现 403……卸载安装旧版变好了”，该反馈暗示可能存在引入回归的变更，建议维护者排查最近版本中与网络请求/鉴权相关的改动。
- **IM 交互场景是重要使用入口**（#947-950）：用户在 IM 端使用 LobsterAI 时，无法感知当前模型是否可用、没有配置备份模型，一旦调试新模型导致 IM 交互失败，会直接中断工作流——这已是连续六个月无人回复的诉求，并非个别现象。

---

## 8. 待处理积压

以下长期未解决/未响应的问题与 PR 已进入 stale 状态，需要维护者特别关注：

- **Issue #953、#961、#962、#960**（均为 2026-03-27 创建，2026-09-30 被 stale 标记刷新）—— 这些是用户真实使用中遭遇的 Bug，部分（如 #953）影响面较大，已在社区沉淀半年，建议按优先级安排修复或至少给出官方回复。
- **Issue #947、#948、#949、#950**（@chinazhoumin 提出的 IM 模型调度系列需求）—— 自三月起持续开放，无官方回应；PR #958（临时会话）同样处于 stale OPEN 状态。如果这些方向不在路线图内，建议明确告知用户以避免长期等待。
- **PR #958 feat(cowork): 增加临时会话功能** —— 功能价值清晰（隐私保护），代码已提交半年，不应被 stale 机制静默掩埋，建议维护者明确处理：合并、要求修改或正式关闭并说明理由。

---

*报告生成时间：2026-10-01 | 数据截止：2026-09-30 23:59 UTC*

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

# CoPaw 项目动态日报 (2026-10-01)

> 数据来源：GitHub (agentscope-ai/CoPaw / QwenPaw) | 统计窗口：2026-09-30 ~ 2026-10-01

---

## 1. 今日速览

项目进入 **Beta 密集迭代期**，v2.2.2-beta.4 于昨日发布，伴随 39 条 PR 更新与 20 条 Issue 活跃记录。新 Issue 以 Bug 报告为主（约 7 成为缺陷），主要集中在三大领域：**文件回传与内容块污染导致模型 400 错误**（#8022、#8064、#8042 连发）、**Embedding/Token 计量准确性**（#8040、#8057、#8058）、**后台任务与会话生命周期**（#8059、#8063 PR）。维护者响应速度较快，今日已有 3 个 Bug 获得对应修复 PR（#8058→#8061、#8057→#8060、#8040→#8062）。整体活跃度 **高**，但需警惕同根因 Bug 反复出现（如 #8022 与 #8064 指向同一链路缺陷），建议核心团队关注模块级根治而非个案修补。

---

## 2. 版本发布

### v2.2.2-beta.4（最新，2026-09-30 发布）
[查看 Release](https://github.com/agentscope-ai/CoPaw/releases/tag/v2.2.2-beta.4)

**更新内容（部分）：**
- **feat**: 为 ReMeLightMemoryCard 增加 reranker UI 配置面板（PR #6399）
- **perf(console)**: 拆分 chat 依赖，优化前端加载性能（对应 #7892 的进一步优化）
- 版本号提升至 2.2.2b4

**迁移注意事项：**
- 该版本为 **Beta 预发布**，包含未稳定 API，生产环境请谨慎升级。
- 若使用记忆模块 ReMe，升级后建议核对 reranker 配置是否丢失（UI 面板首次加入）。
- 完整变更列表请关注 [Release 页面](https://github.com/agentscope-ai/CoPaw/releases/tag/v2.2.2-beta.4)。

---

## 3. 项目进展

### 合并/关闭动态
- 过去 24 小时共有 **9 条 PR 合并/关闭**，今日在评论数 TOP 20 中可见以下关键合入：

| PR | 说明 | 状态 |
|---|---|---|
| [#8049](https://github.com/agentscope-ai/CoPaw/pull/8049) fix(chats): resolve the process timezone per timestamp so naive Msg timestamps keep their instant across DST | **解决 DST 时区偏移 Bug**（对应 Issue #8046）。首次贡献者 @passionworkeer 提交 | ✅ Closed（已合入） |

### 其他进展
- 关闭 3 个 Issue：
  - [#7011](https://github.com/agentscope-ai/CoPaw/issues/7011) Console 停止请求误取消飞书会话 — 已修复关闭
  - [#7443](https://github.com/agentscope-ai/CoPaw/issues/7443) 危险指令易绕过 — 已关闭（但安全研究仍在继续，见下方 #7672）
  - [#7604](https://github.com/agentscope-ai/CoPaw/issues/7604) LLM 流式空闲超时无法配置 — 已关闭（Desktop 端硬编码问题）

### 即将可合入的 PR（待合并状态，但已进入 Last Call）
- [#8062](https://github.com/agentscope-ai/CoPaw/pull/8062) fix(memory): keep healthy embedding vectors when one chunk is over the limit — 部分解决 #8040
- [#8061](https://github.com/agentscope-ai/CoPaw/pull/8061) feat(providers): let custom gateways declare OpenAI prompt cache params — 关闭 #8058
- [#8060](https://github.com/agentscope-ai/CoPaw/pull/8060) fix(token-usage): count Anthropic cache tokens in the live context meter — 关闭 #8057
- [#8063](https://github.com/agentscope-ai/CoPaw/pull/8063) feat(console): wake parent agent session when a background task finishes — 首次贡献者，直接回应 #8059 痛点

> 值得注意的是，**18 条长期 Open 的 PR** 已存在 1~6 个月（如 #1206、#1481、#2505、#3119 等），今日有更新，疑似进入重新 review 队列。若团队有意清理积压，建议优先合入 #3119 + #3120（WebView2 处理对 Windows 体验影响较大）。

---

## 4. 社区热点

### 今日讨论度/Top 活跃 Issues

| Issue | 标题 | 评论数 | 状态 | 热点分析 |
|---|---|---|---|---|
| [#7011](https://github.com/agentscope-ai/CoPaw/issues/7011) | Console stop request can cancel an active Feishu session under multiple UI sessions | **8** | ✅ Closed | 多 UI 会话下 session identity 串扰导致误杀飞书会话。8 条评论说明排查过程复杂，涉及会话标识设计缺陷 |
| [#7443](https://github.com/agentscope-ai/CoPaw/issues/7443) | It is easy for dangerous instructions to evade | 6 | ✅ Closed | 安全研究者 @Jiongcheng-Li 连续提交安全问题，社区对安全沙箱关注度高 |
| [#8022](https://github.com/agentscope-ai/CoPaw/issues/8022) | send_file_to_user 产生的 file/image 内容块 + 空 assistant 消息污染会话上下文 → 持续 400 | 4 | 🟡 Open | **当前最核心的模型兼容性痛点**，与 #8064 高度相关，AI 辅助生成的 Issue，描述详实 |
| [#6274](https://github.com/agentscope-ai/CoPaw/issues/6274) | 新增 ask_user_question 工具，支持 Human-in-the-Loop | 3 | 🟡 Open | 功能请求，👍 1，评论区有人探讨 HITL 的必要性 |

### 热点 PR
- [#7569](https://github.com/agentscope-ai/CoPaw/pull/7569) **feat(modes): add Advisor Mode**（size/XXXL，创建 26 天仍未合入）— 双模型协同模式，涉及核心模态架构变更，社区期望值高但审核周期长，建议维护者给出明确时间表。

**背后诉求分析：** 今日热点集中在 **会话/消息生命周期管理** 与 **模型兼容性**。文件内容块回传导致 400 的 Issue 连续出现（#8022、#8064、#8042），说明 v2.2.2 在 send_file_to_user 工具的 OpenAPI 格式处理上存在系统性缺陷，社区用户（特别是 DeepSeek 用户）受影响严重。

---

## 5. Bug 与稳定性

### 🔴 严重问题（服务不可用/功能完全失效）

| Issue | 标题 | 影响 | Fix PR |
|---|---|---|---|
| [#8022](https://github.com/agentscope-ai/CoPaw/issues/8022) | send_file_to_user 产生的 file/image 内容块 + 空 assistant 消息污染对话上下文，导致后续请求对所有模型持续 400 | **所有模型** 会话中断 | ❌ 暂无 |
| [#8064](https://github.com/agentscope-ai/CoPaw/issues/8064) | DeepSeek provider: send_file_to_user  PDF 永久破坏会话 — 后续请求全部 400 | **DeepSeek 用户** 会话永久不可用 | ❌ 暂无（#8022 的特定 provider 表现形式，可能同根因） |
| [#8042](https

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-10-01

## 1. 今日速览

项目今日整体活跃度处于**低水平**，过去24小时内Issues和PR均无新增或关闭，社区互动趋缓。核心动态为发布了 **v1.9.26** 版本，带来两项面向协作效率与资源优化的功能更新。无破坏性变更或已知Bug报告，项目处于稳定迭代期。整体健康度良好，但社区讨论热度有待回升。

---

## 2. 版本发布

### [v1.9.26 — TK Copilot](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.26)

**更新内容：**

- 新增商务拓展人员（Business Developer）专用登录与工作区，并按角色展示达人联盟（Affiliate）相关操作权限
- 新增非活跃工作区标签暂停机制，自动挂起闲置标签页以降低后台资源占用

**破坏性变更：** 无

**迁移注意事项：** 无需特殊迁移操作，升级后新角色工作区将自动生效；使用多标签页的用户将体验资源占用下降的效果。

---

## 3. 项目进展

今日无合并或关闭的 PR，项目推进主要依赖 v1.9.26 版本发布。此次更新在**多角色协作支持**与**前端性能优化**两个方向为项目带来增量价值：

- 角色化工作区划分，有助于团队中不同职能（如运营、商务）的权限管理与使用体验隔离
- 标签暂停机制，针对长期多开工作区的用户场景，有效降低内存与CPU占用

整体来看，项目向“更成熟的多角色协作工具”方向迈进了一小步。

---

## 4. 社区热点

今日无活跃讨论的Issues或PRs。结合近期发布内容推测，社区对新版本中角色权限设计及资源优化效果可能产生兴趣，建议维护者关注未来48小时内的用户反馈。

---

## 5. Bug 与稳定性

今日无新报告的Bug、崩溃或回归问题。结合版本发布内容来看，v1.9.26 未提及紧急修复项，项目当前稳定性表现良好。

---

## 6. 功能请求与路线图信号

今日无新增功能请求。从版本发布节奏与内容判断，以下方向可能成为后续迭代重点：

- **角色与权限体系深化**：v1.9.26 引入商务拓展角色后，是否会有更细粒度的权限配置（如自定义角色）值得关注
- **资源管理优化延续**：标签暂停机制为第一步，未来可能扩展至更全面的后台任务调度优化

---

## 7. 用户反馈摘要

今日无用户评论可供提炼。基于版本发布性质推测，用户可能关注以下体验点（待后续确认）：

- 商务拓展人员登录流程与工作区切换是否顺畅
- 标签暂停机制是否影响正在进行的后台任务或数据同步
- 角色权限边界是否清晰，是否存在误屏蔽或越权风险

---

## 8. 待处理积压

当前积压事务为 **0**。今日无长期未响应或遗留的 Issues/PRs。项目维护响应及时性良好，暂无需要特别提醒维护者关注的存量问题。

---

*数据来源：[EasyClaw GitHub Repository](https://github.com/gaoyangz77/easyclaw) | 统计周期：2026-09-30 ~ 2026-10-01*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*