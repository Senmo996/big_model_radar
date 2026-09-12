# OpenClaw 生态日报 2026-09-12

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-12 02:01 UTC

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

# OpenClaw 项目动态日报 — 2026-09-12

## 今日速览

过去 24 小时项目活跃度处于高位：共 500 条 Issue 更新（新开/活跃 281 条，关闭 219 条），500 条 PR 更新（待合并 284 条，已合并/关闭 216 条），并发布 v2026.9.4。当前项目主要矛盾集中在三条主线：**更新/回滚流程的可靠性**（#144712、#145192、#142394）、**会话状态一致性与消息可靠性**（#140620、#141252、#96834、#119720）、**大规模部署下的性能退化**（#142476、#119720）。P0 级 release blocker 仍有多项未闭环（#144742、#144678、#142585），但 216 条 PR 的合并/关闭表明修复吞吐在同步跟进。

## 版本发布

### v2026.9.4

**核心亮点：失败更新自动恢复。** 当 schema 与配置检查确认回滚安全时，系统会保留之前的安装包，并以先前的配置和服务状态完成恢复。需注意数据库迁移场景仍然强制要求已验证的更新前备份（对应提交 #140339）。该能力直接响应了 #144712 等更新失败案例中"回滚被误判为未验证"的用户痛点。

## 项目进展

今日共有 216 条 PR 合并/关闭。重点关注的待合并 PR 包括：

- **[#145507 fix(update): pin recovery targets and avoid repeated checks](https://github.com/openclaw/openclaw/pull/145507)** — 修复更新过程中状态选择器在检查期间变化导致重复恢复检查的问题，属于更新链路稳定性补强
- **[#145501 fix(update): prevent bad pack header failures and recover the stopped gateway](https://github.com/openclaw/openclaw/pull/145501)** — 解决部分 Git clone 场景下更新激活失败导致 Gateway 丢失的问题
- **[#145043 fix(update): prevent stale Codex migrations from blocking upgrades](https://github.com/openclaw/openclaw/pull/145043)** — 直指 #123326 多代理 Codex 迁移崩溃循环根因，关闭 stale migration 阻塞升级的路径
- **[#145463 fix(ui): unblock main after environment picker changes](https://github.com/openclaw/openclaw/pull/145463)** — 消除 #145183 环境选择器改动对主分支 CI 的连带破坏
- **[#143802 improve(doctor): speed up schema checks for large databases](https://github.com/openclaw/openclaw/pull/143802)** — 将 Doctor 的大库 schema 检查耗时从 13.96s 降至 6.48s（2 GiB 测试库），对大型部署体验改善显著

此外，[#145381 chore(deps)](https://github.com/openclaw/openclaw/pull/145381) 推进了 TypeBox、AWS 与 Copilot SDK 的依赖升级，显示项目在依赖冷却期后持续跟进生态更新。

修复 PR 落地对应的 Issue：今日关闭的 #144712 与 #140908 分别对应 npm 更新与 systemd 权限问题的解决；#144581 关闭说明 Windows 上 malformed canary path 问题已修复。整体看，项目的修复集中在更新器健壮性、UI 状态恢复和大规模部署稳定性三个方向。

## 社区热点

今日讨论最活跃的 Issue 呈现出对"核心链路稳定性"的高度关注：

- **[#119720](https://github.com/openclaw/openclaw/issues/119720)（17 评论）** — 同步代理持久化和 transcript 维护在规模化场景下阻塞 Gateway 事件循环。评论高度关注 partial repairs 后仍存在的性能瓶颈，关联 #140231 与 #138984 的修复效果
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)（15 评论）** — hook/tool 子进程未回收导致僵尸进程积累与运行时退化，被标记为回归，用户反馈中涉及 `openclaw-hooks`、`codex` 等具体进程名
- **[#96834](https://github.com/openclaw/openclaw/issues/96834)（15 评论）** — WhatsApp 1:1 图片消息导致主通道楔住约 3 分钟，多模态输入路径存在状态残留问题，repro 在 2026.6.10 上仍可复现
- **[#140620](https://github.com/openclaw/openclaw/issues/140620)（12 评论）** — 升级后 27/~1500 个会话的转录协调停滞，用户明确表达"pre-upgrade sessions unfindable"

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**报告日期：2026-09-12**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈**头部高度集中、尾部持续分化**的马太效应：OpenClaw 以单日 500 条 Issue + 500 条 PR 的体量占据绝对核心地位，成为事实上的基础设施层，而大量中小项目（TinyClaw、ZeptoClaw、EasyClaw 等）已进入停滞状态。生态共性痛点集中在**配置持久化、更新/回滚可靠性、上下文缓存正确性**三大方向，其中配置被覆写（LobsterAI）、缓存失效导致 token 成本飙升（Zeroclaw）正在消耗用户信任。与此同时，多模态（图片、语音）输入链路成为新的功能竞争点，NanoClaw 的 GPT-Live-1 全双工语音和 Zeroclaw 的 Telegram 媒体组批处理均指向交互形态的升级。整体判断：生态正处于从"功能扩张"转向"稳定性和成本可预测性攻坚"的关键阶段。


## 2. 各项目活跃度对比

| 项目 | Issues 更新（新开/关闭） | PR 更新（合并/待合并） | Release | 健康度评估 |
|------|------------------------|----------------------|---------|-----------|
| **OpenClaw** | 500（281/219） | 500（216/284） | v2026.9.4 | 🟢 高活跃，版本迭代与修复吞吐同步，但 P0 release blocker 未闭环 |
| **NanoBot** | 4（2/2） | 28（18/10） | 无 | 🟢 合并效率高，WebUI 专项优化集中落地，结构健康 |
| **Zeroclaw** | 50（39/11） | 50（3/47） | 无（v0.8.5 后） | 🟡 高 Issue 密度 + 极低合并率（6%），评审积压已成瓶颈 |
| **NanoClaw** | 5（3/2） | 38（9/29） | 无 | 🟡 修复响应快（#3769 一天闭环），但 29 条 PR 积压超两周 |
| **LobsterAI** | 3（3/0） | 8（6/2） | 无 | 🟡 升级回归修复效率高，但配置持久化核心痛点悬而未决 |
| **PicoClaw** | 4（数据未细分） | 2（1/1） | 无 | 🟡 有修复闭环但存在 stale 标记，维护响应一般 |
| **IronClaw** | 0（0/0） | 1（0/1） | 无 | 🔴 零 Issue 更新，仅 1 条 PR 推进，实际处于半停滞状态 |
| **Moltis** | 1（1/0） | 1（0/1） | 无 | 🔴 低活跃，新 Issue 无响应，PR 积压两月+ |

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-09-12）

## 今日速览

过去 24 小时 NanoBot 项目保持较高活跃度：共更新 4 条 Issue（新开 2 条、关闭 2 条）和 28 条 PR（合并/关闭 18 条、待合并 10 条），无新版本发布。核心维护者 @chengyongru 与社区贡献者各有多项 PR 落地，其中 WebUI 性能优化（长文本流式渲染、历史回放、favicon 缓存）成为今日最集中的投入方向。两个 P1 级问题得到响应（初始密码疑惑、大历史回放性能），社区外部团队 AnySearch 提出两个集成请求，显示出项目在 AI 搜索工具链生态中的吸引力。整体来看，项目处于功能迭代与性能打磨并行的健康状态。

## 项目进展

今日合并/关闭的 18 条 PR 中，包含 4 条较早提交的 P1/P2 级修复，以及多条 WebUI 体验优化，具体重要进展如下：

- **核心稳定性修复（8 月初提交，今日合并）**：
  - [#5214 fix(providers): keep DeepSeek reasoning items wire-valid](https://github.com/HKUDS/nanobot/pull/5214) — 修复 OpenAI Responses API 在 DeepSeek 场景下因 reasoning 项序列化格式不合规导致的请求体反序列化失败，P1 级。
  - [#5230 fix(gemini): preserve imported tool calls with signature fallback](https://github.com/HKUDS/nanobot/pull/5230) — 修复从其他 provider 转移会话后 Gemini 3 拒绝重放函数调用的问题，P1 级。
  - [#5215 fix(gateway): close agent resources deterministically on stop](https://github.com/HKUDS/nanobot/pull/5215) — 修复关闭 gateway 时 exec 会话或 MCP 子进程导致的 asyncio teardown 噪声与停止卡顿，P1 级。
  - [#5216 fix(image): send Gemini Flash hints via generationConfig.imageConfig](https://github.com/HKUDS/nanobot/pull/5216) — 修复 Gemini Flash 图像模型因 hint 发送位置错误导致的 HTTP 400 错误，P2 级。

- **WebUI 体验与性能优化（今日批量合入）**：
  - [#5356 feat(webui): improve setup flows across chat channels](https://github.com/HKUDS/nanobot/pull/5356) — 重构频道目录为双列分组布局，分离依赖安装与频道激活，防前端竞态，历时一个月后合并。
  - [#5740 feat(webui): simplify automation management and unify disclosure motion](https://github.com/HKUDS/nanobot/pull/5740) — 将自动化管理改造为响应式任务列表 + 按需详情弹窗，减少重复控件。
  - [#5741 fix(webui): omit binary data from tool progress](https://github.com/HKUDS/nanobot/pull/5741) — 修复工具进度帧携带 base64 图像导致 WebUI 记录膨胀数 MB 的问题。
  - [#5742 fix(webui): restore navigation after automation deletion](https://github.com/HKUDS/nanobot/pull/5742) — 修复删除自动化后侧边栏与页面不可点击的回归问题，并补充回归测试。
  - [#5732 perf(ui): reduce long-text streaming refresh overhead](https://github.com/HKUDS/nanobot/pull/5732) — 将流式状态更新节流至 50ms 间隔，限制推理预览至 512 UTF-16 码元。
  - [#5736 perf(webui): cache public favicon requests](https://github.com/HKUDS/nanobot/pull/5736) — 公共 favicon 请求纳入 service worker 缓存（上限 128 条），减少跨域请求。
  - [#5737 fix(email): disable intermediate progress delivery](https://github.com/HKUDS/nanobot/pull/5737) — 修复 Email 通道仍生成无法展示的中间进度事件的问题。

- **逻辑修复**：
  - [#5734 fix(memory): clarify Dream prompt write permissions](https://github.com/HKUDS/nanobot/pull/5734) — 明确 Dream 任务对 memory 文件的写权限边界，避免 Codex 拒绝写入。
  - [#5744 chore: remove core agent line count script](https://github.com/HKUDS/nanobot/pull/5744) — 移除未使用的代码行数统计脚本。

整体来看，项目在今日完成了对多个长期遗留 P1 缺陷的合并，同时 WebUI 性能与交互细节得到系统性优化，项目向前迈进了扎实的一步。

## 社区热点

- **#5505 [CLOSED] Add AnySearch as a web search provider**（[链接](https://github.com/HKUDS/nanobot/issues/5505)）— 收获 8 条评论，是今日最高讨论量 Issue。AnySearch 团队（@cleverLucky）主动提出将 AnySearch 集成到 `web_search` 工具，并预告将提交 PR。该 Issue 今日关闭，推测已转入实际 PR 流程，同时引出下方 #5731 的后续扩展请求，表明外部团队对 NanoBot 插件生态的认可与投入意愿。

- **#5726 [OPEN] Startup initial password?**（[链接](https://github.com/HKUDS/nanobot/issues/5726)）— P1 级 Bug，收到 2 条评论。用户在 headless 服务器上安装 NanoBot 后无法通过命令行界面获取初始密码，只能从其他工作站浏览器访问，却不知道如何继续。该问题关系到首次部署体验，是新手最容易遇到的障碍之一。

- **#5719 [CLOSED] Discord: automatic compaction notices ignore sendProgress: false**（[链接](https://github.com/HKUDS/nanobot/issues/5719)）— 用户报告 Discord 通道在设置 `channels.sendProgress: false` 后，自动压缩上下文时仍会发送两条独立消息（“Compressing context…”和“Context compacted.”），违反设置预期。该问题已关闭，但未直接关联修复 PR，可能已在其他改动中覆盖。

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 状态 | 说明 |
|--------|----------|------|------|
| P1 | [#5726 初始密码未知](https://github.com/HKUDS/nanobot/issues/5726) | OPEN | Headless 部署用户不知道 WebUI 初始密码，影响首次登录；已有 2 条评论但尚无 fix PR |
| P1 | [#5745 大历史回放非增量加载](https://github.com/HKUDS/nanobot/pull/5745) | OPEN（修复 PR） |

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 · 2026-09-12

> 数据窗口：过去 24 小时（2026-09-11 至 2026-09-12）| 数据来源：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时 Zeroclaw 仓库保持高强度运转：**50 条 Issue 更新**（新开/活跃 39 条，关闭 11 条，关闭率 22%）与 **50 条 PR 更新**（待合并 47 条，合并/关闭仅 3 条）。无新版本发布，项目仍处于 v0.8.5 之后的密集开发与加固期。值得关注的是，**安全/身份体系（OIDC #8289）**的巨型 PR 栈持续更新但仍未合并，**Windows 栈溢出回归** (#10734/#10753) 是最紧迫的稳定性问题；同时，一批新提交的 Issue 集中暴露了 **ACP/ZeroCode 会话上下文管理**（缓存失效、历史丢弃、过度取消）与 **provider 可靠性**（重试策略、fallback 失效）的系统性短板。PR 合并率偏低（6%）反映评审积压，但 Issue 响应与关闭节奏良好，社区讨论活跃，项目整体处于**高活跃、快迭代、评审瓶颈**的健康偏热状态。

**活跃度评估：★★★★★**（Issue 流动率高、PR 提交量大、多线程推进中）

---

## 2. 版本发布

**暂无新版本发布。** 最新公开版本仍为 v0.8.5，当前开发聚焦于其后的缺陷修复与安全架构升级（OIDC/主体验证、沙箱加固等）。

---

## 3. 项目进展

今日无新 PR 被合并（仅 3 条关闭/合并，主要为测试修复 #10676 等）。但多个人工关闭的 Issue 标记了功能或修复的实际落地，可视为项目推进信号：

- **Windows 栈溢出问题收敛**（#10753 关闭）— `session/new` 在 2MB 栈上溢出的问题已通过 #10734 的修复通道吸收（该问题确认为 `RpcDispatcher::process_line` 栈占用过高），Windows 测试从 abort 转为可追踪的状态。
- **集成页面配置链接错误修复**（#10690 关闭）— Integrations 页面的 "Configure" 深链接不再错误地对展示名称做 slugify，改用 provider family key，消除 Z.AI 等显示的 404 路径问题。
- **ZeroCode 工作目录行为修复**（#10609 关闭）— `zerocode` 不再忽略启动目录，改用用户启动时的 cwd 而非强制 agent 工作区，属 S1 级工作流阻塞修复。
- **tool-result 截断可见性问题修复**（#10115 关闭）— `truncate_tool_result` 的截断提示现在会写入日志，使模型上下文之外的截断行为可观测。
- **MCP 图片内容块映射进入 vision 管线**（#9521 关闭）— MCP `tools/call` 中 `type:image` 的结果将按多模态图片块传递给视觉模型，不再降级为 JSON 文本。

这些关闭项分布在 config、runtime、zerocode、tooling 等模块，表明项目在多个前端体验与核心运行时层面均有实质收敛。但 OIDC 里程碑（#8289）的庞大 PR 栈（#10248~#10321，共 10 个 PR）仍全部处于打开状态，说明安全架构的大规模重构尚未合入 master，是当前最大的未落地工程。

---

## 4. 社区热点

今日讨论最活跃的 Issues 集中在**架构治理**与**稳定性回归**两条主线上：

- **#8692 [Tracker] Maintainer decision queue for RFCs and design issues**（15 评论 · 2026-07 创建持续活跃至今）— 维护者决策队列跟踪器，用于汇总需要 maintainer 拍板的 RFC、设计问题与发布策略事项。持续高评论表明项目正经历大量架构讨论，且决策链路可能成为瓶颈。社区诉求：**加速 RFC 的评审与决策节奏**。
  https://github.com/zeroclaw-labs/zeroclaw/issues/8692

- **#10549 RFC: Simplify RFC voting by removing mandatory discussion windows**（9 评论 · 9 月 2 日创建）— 提议取消强制 48/72 小时讨论窗，并让 REVISE 状态立即停止当前快照。直指现有流程的"空转等待"问题，与 #8692 的决策效率诉求同源，说明社区对流程轻量化有明确期待。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10549

- **#5514 Telegram 媒体组批处理为一个多模态回合**（8 评论 · 4 月创建，今日关闭）— 用户连续发送多张图片时，网关逐图触发 LLM 请求导致多条重复输出。该问题已修复并关闭，是今日少数获得明确解决的长期社区痛点。
  https://github.com/zeroclaw-labs/zeroclaw/issues/5514

- **#10734 Windows 下 RpcDispatcher 栈占用接近 2MB 上限**（6 评论 · 9 月 10 日创建）— Advisory Windows nextest job 因真实栈溢出（`0xc00000fd`）中止。该问题同时关联 #10753 的关闭，已定位为 `process_line` 的栈占用，处于修复进行中。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10734

---

## 5. Bug 与稳定性

今日 Bug 类 Issue 密集度极高，按严重程度分级如下：

### 🔴 P1 / S1-S2（严重）

| Issue | 问题 | 状态 |
|---|---|---|
| #10788 | **Code/ACP 回合失败丢弃已接受的 prompt 与完成的工具交换**，不写入持久化历史（S2），影响恢复与审计 | OPEN，无 fix PR |
| #10785 | **zerocode 通知延迟导致每个运行中的回合被误取消**（`begin_notification_resync → session/cancel`），3 个 ACP 会话同时被取消 | OPEN，无 fix PR |
| #10778 | **多模态图片容量淘汰重写早期历史消息**，使缓存前缀从该点全部失效（Anthropic 缓存读从 ~197 条跌落），token 成本飙升 | OPEN，accepted，无 fix PR |
| #10777 | **thinking/effort 请求配置在回合间翻转**，导致全部缓存历史段被重写（40k cached → 130k write） | OPEN，accepted，无 fix PR |
| #10782 | **reply-intent 预检查丢弃 LLM usage 信息**，分类器成本/配额从不被记录（S2） | OPEN，无 fix PR |
| #10734 | Windows 下 RpcDispatcher::process_line 栈占用触及 2MB 守卫（S2，实际栈溢出） | OPEN，in-progress，#10753 已合并吸收 |
| #10731 | `zeroclaw service logs` 在 macOS/Windows/OpenRC 上健康时无输出（S2） | OPEN，in-progress |
| #10609 | zerocode 忽略启动目录强制使用 agent workspace（S1），**已关闭（已修复）** | ✅ CLOSED |

### 🟡 P2 / S3（中等/次要）

- **#10787**：单候选流恢复忽略 `provider_retries`；Anthropic 529 只立即重试一次且无退避（S2）— OPEN
- **#10736**：预输出流失败时，广告的非流式 fallback 实际未发送（S2）— OPEN，in-progress/accepted
- **#10786**（今日新开并关闭）：Anthropic 丢弃上一回合 thinking 块，导致每个回合边界都重写缓存历史 — CLOSED（可能为 #10777 的子问题或已通过设计规避）
- **#10779**：OpenCode FreeUsageLimitError（429 配额耗尽）被以亚秒级退避重试，应快速失败（S3）— OPEN
- **#10759**：SOP RPC 的 run-detail 响应遗漏 `failure_reason` 字段（S2/S3）— OPEN
- **#10757**：agent-browser 可用性探测的 5 秒超时与"CLI 缺失"错误无法区分（S3）— OPEN
- **#10701**：带图消息使历史缓存前缀整体失效（不只是新消息）— OPEN，与 #10778 同根因

**总体判断：今日 Bug 报告的核心集中在"缓存正确性、失败路径恢复、上下文持久化"三大主题**，其中 #10778/#10777/#10701/#10786 构成一个完整的问题簇：请求体序列化与缓存键之间的不稳定性正在造成真实的 token 成本浪费，建议维护者优先组织专项修复。

---

## 6. 功能请求与路线图信号

### 新功能/增强请求（今日新增）

- **#10780 [P1] 恢复主动式 token 预算上下文压缩**（`context_compression` 被移除；`keep_recent`/`collapse_tool_results` 均为惰性配置）— 用户明确要求 token 驱动的主动压缩，而非仅消息数修剪。涉及 runtime/agent 架构，已标 needs-maintainer-review。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10780

- **#10781 [P2] 移除或实现惰性配置键**（`context_compression.*`、`history_pruning.keep_recent`、`collapse_tool_results`、`keep_tool_context_turns`）— 用户设置后无效果，要求要么实现要么从文档中移除。与 #10780 同属上下文管理配置的"名实相符"诉求。
  https://github.com/zeroclaw-labs/zeroclaw/issues/10781

- **#10745 [PR 待合并] Docker 沙箱镜像可配置化**（`[security.sandbox].image`）— 文档提到可配置但实际不可配，PR 已提交并标记 distinguished contributor，等待合并。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10745

- **#10746 [PR 待合并] 插件安装时进行 load-verify 并给出 egress 拒绝的修复指引**— 解决插件在错误 WIT ABI 下"干净安装但运行时失败"的问题。
  https://github.com/zeroclaw-labs/zeroclaw/pull/10746

### 路线图判断

- **上下文管理重构已进入社区视野**：#10780 与 #10781 反映了接入方对 token 成本的可控性需求。鉴于 v0.8.5 中相关配置被移除但文档未清理，**下一版本大概率需要恢复或正式废弃这套配置**。
- **插件安全与沙箱加固**正在通过 #10745/#10746/#9584 等多条 PR 推进，与 #8289 OIDC 里程碑共同构成当前安全投入的主轴。
- **provider 可靠性**（#10736/#10779/#10787）和**缓存优化**（#10778/#10777）已积累足够 issue 密度，预计会被纳入近期 sprints。

---

## 7. 用户反馈摘要

从今日 Issue 评论与描述中提炼的真实用户反馈：

**满意/正向**

- Telegram 媒体组批处理问题历时 5 个月修复（#5514），用户痛点得到实质解决。
- 集成页配置链接 404 快速修复（#10690），用户对修复速度给出认可。

**不满意/痛点**

- **上下文成本失控（最强烈诉求）**：多个用户在 #10778/#10777/#10701 中描述了"缓存前缀被无效重写"导致 token 消耗翻倍的具体场景（如 40k cached → 130k write），并通过抓包数据佐证。用户明确表达了对 token 成本可预测性的担忧。
- **失败的回合丢失上下文**：Code/ACP 会话中一次 provider 失败会导致整个回合（含已接受的 prompt 和完成的工具调用）从历史中消失（#10788），用户将其描述为"不可接受的数据丢失"。
- **zerocode 体验退化**：长会话按键延迟（#9092）、启动目录被忽略（#10609，今日已修复）、后台通知导致所有任务被误取消（#10785），说明 TUI/ACP 方向的体验优化仍有明显缺口。
- **配置惰性引发信任问题**：多个用户评论指出按文档设置了 `context_compression` 等选项但"什么都没有发生"（#10780/#10781），怀疑配置体系是否还有其它隐藏的失效项。

**使用场景**

- 典型用户场景为：通过 Telegram 多图输入驱动 agent（#5514）；在 ZeroCode/ACP 中维持 200k+ 长上下文会话（#10785/#10777）；使用 OpenAI-compatible 网关对接 Anthropic 等混合栈（#10701/#10779）；在 Windows 上运行 daemon（#10734/#10731）。

---

## 8. 待处理积压

### 长期未决的高关注度 PR（评审积压）

| PR | 内容 | 等待时长 | 风险 |
|---|---|---|---|
| #10248 → #10321 系列（共 10 个） | **OIDC 里程碑完整 PR 栈**（#8289 stage 2-6） | 自 8/22 起，已 3 周 | 互为依赖，如第一环阻塞则整体阻塞；全部 labeled `risk:high` |
| #9584 | 插件安装 egress 授权仪式 | 7/31 创建，已 6 周 | 有 maintainer 评论但未合并 |
| #9809 |

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 | 2026-09-12

## 1. 今日速览

过去 24 小时项目保持中等活跃度：4 条 Issue 更新、2 条 PR 更新，其中 Slack 媒体上传缺陷（#3338）已随修复 PR #3340 的关闭而解决，前端界面卡顿的修复 PR #3347 正在等待审核。社区讨论集中在 Slack 集成修复与 OpenAI 兼容 provider 的功能诉求上。当前无新版本发布，同时有 3 项 Issue/PR 被 stale 标记，提示维护响应有待加强。

## 2. 版本发布

无新版本发布，本节略。

## 3. 项目进展

过去 24 小时内，项目完成了 1 项关键缺陷修复的收尾：

- **[#3340] fix(slack): set FileSize on media upload params**（[链接](https://github.com/sipeed/picoclaw/pull/3340)）— 已关闭。该 PR 为 `slack.UploadFileParameters` 补上了缺失的 `FileSize` 字段，解决了 Slack 媒体上传总被 SDK 以 `file size cannot be 0` 拒绝的问题。对应 Issue #3338 也已同步关闭，说明 Slack 媒体消息能力已恢复正常。该修复虽小，但直接堵塞了一个影响真实使用的集成通道。

## 4. 社区热点

- **[#3338] Slack does not attach image media content**（[链接](https://github.com/sipeed/picoclaw/issues/3338)）— 4 条评论，今日最活跃 Issue。用户报告 Slack 媒体上传完全不可用，根因指向 `SendMedia` 未设置 `FileSize`，导致 SDK 在发起网络请求前就拒绝上传。该问题同时产生了修复 PR #3340，属于“报告 + 修复 + 关闭”的完整闭环，体现了社区自驱贡献的高效性。

- **[#3366] Add support for OpenAI compatible providers**（[链接](https://github.com/sipeed/picoclaw/issues/3366)）— 2 条评论。用户希望新增“OpenAI Compatible”自定义 provider，以便接入自托管路由器（如 9Router）。这反映出部分用户不满足于仅接入固定模型列表，渴望将 PicoClaw 指向任意兼容 OpenAI 协议的后端。

## 5. Bug 与稳定性

按严重程度排序：

1. **【高】Slack 媒体上传完全失败**（#3338，[链接](https://github.com/sipeed/picoclaw/issues/3338)）— `file.upload.v2` 因 `FileSize` 未设置被 SDK 拒绝，影响所有 Slack 图片/文件消息。✅ 已有修复：PR #3340 已关闭，Issue 已解决。

2. **【中】连接飞书报错：config.json 包含未知字段 `app_id`**（#3355，[链接](https://github.com/sipeed/picoclaw/issues/3355)）— 用户按示例配置 `channel_list.feishu.app_id` 后启动报错，无法连接飞书。该 Issue 仍处于 OPEN 状态，仅 1 条评论，需维护者确认配置结构是否已变更，并更新文档或校验逻辑。

3. **【中】RKLLM 模型回复异常**（#3346，[链接](https://github.com/sipeed/picoclaw/issues/3346)）— ARM 开发板上 RKLLM 模型出现异常输出。Issue 已被 stale 自动关闭，未见明确的修复跟进记录，建议维护者核实是否已在其他渠道解决。

## 6. 功能请求与路线图信号

- **[#3366] OpenAI 兼容 provider**（[链接](https://github.com/sipeed/picoclaw/issues/3366)）— 明确的功能需求，实施路径较清晰（可基于现有 OpenAI provider 复制改造），潜在收益是吸纳自托管模型网关用户。该需求目前无维护者表态，若能纳入下个版本，将是生态开放性的重要提升。

- **[#3347] 修复 Web UI 卡顿**（[链接](https://github.com/sipeed/picoclaw/pull/3347)）— 用户自研修复，解决聊天区文本量大时界面延迟问题，已在桌面端和移动端验证。该 PR 虽为前端体验优化，但用户参与度高，若合并将直接改善高频聊天场景的使用体验，有望随下个版本发布。

## 7. 用户反馈摘要

从近期 Issue 讨论中可提炼出以下真实用户声音：

- **Slack 集成不可用成为阻塞性痛点**：用户 @octavioturra 直指 SDK 拒绝上传的直接原因，并主动提交修复 PR，显示出对该功能的依赖度较高。
- **飞书配置困惑**：用户 @ttghub 按文档配置 `app_id` 却报“未知字段”，说明配置结构可能已调整但示例/校验未同步，对普通用户构成配置门槛。
- **边缘硬件的模型适配问题**：用户 @crazysarah 在 ARM 开发板上遭遇 RKLLM 异常回复，说明嵌入式场景的模型兼容性仍需关注。
- **对自定义模型接入的强烈需求**：用户 @ItachiSan 提出接入自托管 OpenAI 兼容路由器的场景，显示企业或个人用户希望复用已有模型网关资产。
- **前端卡顿影响实际使用**：用户 @iMilnb 反馈并修复 Web UI 在长文本下的 lag 问题，说明聊天窗口的高并发文本渲染已成为体验短板。

## 8. 待处理积压

以下事项已存在一段时间，建议维护者优先关注：

- **[#3355] 飞书连接配置报错**（[链接](https://github.com/sipeed/picoclaw/issues/3355)，OPEN，9/1 创建）— 影响真实渠道接入，等待维护者确认配置结构并更新文档。

- **[#3347] fix laggy interface（PR）**（[链接](https://github.com/sipeed/picoclaw/pull/3347)，OPEN，8/27 创建）— 社区贡献的前端性能修复，目前无 review 记录，需尽快安排代码审查与合并测试。

- **[#3366] OpenAI 兼容 provider 功能请求**（[链接](https://github.com/sipeed/picoclaw/issues/3366)，OPEN，9/4 创建）— 潜在路线图需求，维护者尚未回应，易导致社区贡献者转向 fork 或竞品。

**项目健康度总结**：核心 Slack 缺陷的高效闭环展现了项目社区的协作能力，但 stale 标记的普遍存在及长期未回应的功能请求提示维护者应加速积压项的响应节奏，避免社区贡献热情衰减。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-12

## 1. 今日速览

过去 24 小时 NanoClaw 仓库保持高度活跃：共产生 38 条 PR 更新，其中 9 条已合并/关闭、29 条待合并，另有 5 条 Issue 更新（3 活跃、2 已关闭）。新版本发布为 0，但多个 bug 修复 PR 已快速进入合并流程（如 bootstrap 的 pnpm 修复 #3771、CODEOWNERS 修复 #3649 等），其中 **#3771 针对 #3769 的修复在一天内完成关闭**，说明维护者响应速度快。仓库健康度整体良好，PR 流转效率较高，但 29 条待合并 PR 的积压（其中多条已存在超过两周）需要关注。

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 9 条 PR 主要涵盖以下方向：

### 3.1 安装与 Bootstrap 稳定性
- **[#3771 [已关闭] fix: recover uvx-installed pnpm after bootstrap](https://github.com/nanocoai/nanoclaw/pull/3771)** — 修复 `uvx` 引导后父进程找不到 `pnpm`/`npm` 导致退出码 127 的问题。直接回应 Issue #3769，在 bootstrap 子进程更新 PATH 后，父启动器无法找到刚安装的 Node 包管理器；修复方式为在 npm-prefix 兜底前将 `~/.local/bin` 前置一次。

### 3.2 仓库维护与 CI 清理
- **[#3649 [已关闭] chore(github): repair CODEOWNERS — default owner, automation surface, supply-chain files](https://github.com/nanocoai/nanoclaw/pull/3649)** — 修复 CODEOWNERS 配置，完善默认 owner、自动化表面和供应链文件的负责人规则。
- **[#3291 [已关闭] fix: bound pending message polling](https://github.com/nanocoai/nanoclaw/pull/3291)** — 为待处理消息轮询加入边界限制，防止无限轮询消耗资源。
- **[#3249 [已关闭] fix(setup): handle an existing Node outside the supported range](https://github.com/nanocoai/nanoclaw/pull/3249)** — 安装时检测已存在的 Node.js 版本超出支持范围的情况，做显式处理。

### 3.3 文档与技能完善
- **[#2798 [已关闭] chore(release): expand CHANGELOG for v2.1.17](https://github.com/nanocoai/nanoclaw/pull/2798)** — 扩充 v2.1.17 的 CHANGELOG。
- **[#2086 [已关闭] v2 docs: update capability installer model](https://github.com/nanocoai/nanoclaw/pull/2086)** / **[#2082 [已关闭] v2 docs: clarify upstream developer references](https://github.com/nanocoai/nanoclaw/pull/2082)** — v2 文档体系更新（能力安装器模型、上游开发者引用说明）。注意这两条 PR 为 4 月创建，今日才关闭，属于延迟清理。

- **[#1598 [已关闭] feat: add-remote-storage skill (WebDAV/S3 via rclone + systemd) and ncl groups config add-mount/remove-mount](https://github.com/nanocoai/nanoclaw/pull/1598)** — 远程存储技能（WebDAV/S3）已合入，为 4 月创建的 PR，今日关闭意味着功能已纳入主干。

**整体评估**：今日合并的 PR 集中在 bug 修复和仓库维护，没有大规模新特性进入主干；但语音频道（#3764/#3772）和 OneCLI 修复（#3774/#3776）仍处于开放状态，核心功能推进以稳定性修复为主。项目正从 v2.3.0 之后进入打磨阶段。

---

## 4. 社区热点

### #3576 — Rate-limited 错误通知风暴（Issue）
- 链接: [nanocoai/nanoclaw#3576](https://github.com/nanocoai/nanoclaw/issues/3576)
- 创建于 8 月 27 日，持续更新至 9 月 11 日，是当前最受关注的长期 Issue 之一。
- **核心诉求**：当 turn 因限流而结束时，`deliverErrorResult` 每次重试都向用户频道发送重复错误通知。没有退避（backoff）、冷却（cooldown）或去重（dedup）机制导致对真实安装环境产生通知洪泛。
- **评论分析**：1 条评论（内容未给出具体信息），但该问题已存在两周多，用户在用频道中持续受干扰。这是典型的生产环境稳定性问题，对信噪比影响很大。

### 语音频道技能双 PR（#3764 + #3772）
- [#3764 feat(channels): /add-voice — full-duplex browser conversations](https://github.com/nanocoai/nanoclaw/pull/3764)
- [#3772 feat(channels): voice adapter payload (OpenAI GPT-Live-1 browser calls)](https://github.com/nanocoai/nanoclaw/pull/3772)
- 这两个 PR 由同一作者（@glifocat）提交，分别将语音解决方案放到 main 分支和 channels 注册分支上，共同形成了 **通过浏览器与 AI 代理进行全双工语音对话** 的能力（GPT-Live-1 语音识别与回复，需要记忆/工具操作时委托给代理 session）。
- **热点原因**：语音交互是 NanoClaw 对外展示差异化能力的重要功能点，结合 GPT-Live-1 会显著降低使用门槛，社区关注度高。

### 安装与引导问题系列（#3765、#3769、#3773、#3774、#3776）
- 9 月 11-12 日集中出现了一批安装/配置相关的 bug 报告与 PR，包括：
  - [#3765 并发 SQLite 迁移失败](https://github.com/nanocoai/nanoclaw/issues/3765)
  - [#3769 uvx 引导后 pnpm not found](https://github.com/nanocoai/nanoclaw/issues/3769)（已关闭，被 #3771 修复）
  - [#3773 fetch explicit registry tracking refs](https://github.com/nanocoai/nanoclaw/pull/3773)
  - [#3774 persist OneCLI gateway files](https://github.com/nanocoai/nanoclaw/pull/3774)
  - [#3776 run downloaded installers with system shell](https://github.com/nanocoai/nanoclaw/pull/3776)
- **诉求分析**：这组议题集中在「新用户上手路径的可靠性」上，特别是在干净环境（fresh VM）下的安装成功率。多个问题均指向同一个方向——**当系统环境与默认假设不一致时，安装流程会失焦**（如 PATH 不可预测、临时文件被 Docker 重建为 root 目录等）。

---

## 5. Bug 与稳定性

### P0 — 安装/引导失败（已修复或修复中）
- **[#3769 [已关闭] Fresh uvx bootstrap exits with pnpm not found when ~/.local/bin is absent from PATH](https://github.com/nanocoai/nanoclaw/issues/3769)**
  - 严重程度：**高**（新环境上完全无法启动）
  - 状态：已关闭（Fix PR #3771 已合并）
- **[#3765 [开放] Concurrent SQLite migrations can fail during fresh setup](https://github.com/nanocoai/nanoclaw/issues/3765)**
  - 严重程度：**高**（fresh install 时并发迁移失败）
  - 状态：暂未有专门 fix PR，但 #3773/#3776 等多条 PR 都涉及 setup 阶段改进，可能间接修复或相关。

### P1 — 安装残留与旧版迁移问题
- **[#3762 [开放] add-opencode leaves the pre-8772ec97 Dockerfile guard test behind on remove and upgrade](https://github.com/nanocoai/nanoclaw/issues/3762)**
  - 严重程度：**中**（旧安装升级后残留过时的 test 文件，导致后续维护混乱）
  - 已有对应 Fix PR: [#3763 [开放] fix(add-opencode): drop the pre-cli-tools Dockerfile guard on refresh and remove](https://github.com/nanocoai/nanoclaw/pull/3763)

### P2 — 运行时通知稳定性
- **[#3576 [开放] Rate-limited turns flood the channel with duplicate error notices](https://github.com/nanocoai/nanoclaw/issues/3576)**
  - 严重程度：**中**（影响使用体验，不破坏核心功能）
  - 状态：无 fix PR，仍在讨论中。

---

## 6. 功能请求与路线图信号

### 语音频道（Voice Channel） — 大概率进入下一版本
- **[#3764 / #3772 / #3776 系列 PR](https://github.com/nanocoai/nanoclaw/pull/3764)** — 已经实现完整的 `voice.ts` 适配器（含 webhook SDP/hang-up 处理），以及消费侧技能 `/add-voice`。语音交互属于 v3 时代的核心交互升级，大概率在下一个 minor release 中推出。

### per-agent-group 交付模式配置
- **[#3713 [开放] feat(config): record a per-agent-group delivery mode](https://github.com/nanocoai/nanoclaw/pull/3713)**
  - 允许为每个 agent group 独立指定「消息信封」交付契约或「出站工具」交付方式。这是对当前 envelope/handoff 机制更细粒度的适配，方向明确，可能为后续扩展做铺垫。

### 远程存储挂载已合入
- **[#1598 [已关闭]](https://github.com/nanocoai/nanoclaw/pull/1598)** — 目前已支持 WebDAV/S3（rclone + systemd）+ `ncl groups config add-mount/remove-mount`。说明远程存储/挂载是官方认可的场景能力。

### Dial 渠道文档化
- **[#3501 [开放] docs: mention the Dial channel in the README and changelog](https://github.com/nanocoai/nanoclaw/pull/3501)** — Dial 渠道功能已实现但文档缺失，说明官方仍在补齐各类渠道的文档化工作。

---

## 7. 用户反馈摘要

| 反馈来源 | 用户痛点 | 使用场景 | 满意度 |
|---------|---------|---------|--------|
| [Issue #3576](https://github.com/nanocoai/nanoclaw/issues/3576) | rate-limited turn 反复向频道推送重复错误消息，普通用户频道被「刷屏」 | 生产环境实际部署中遇到限流时，由于没有退避/去重，每个重试的 turn 都会产生新的错误通知，噪音很大 | 不满意 — 希望增加 backoff/dedup 机制 |
| [Issue #3762](https://github.com/nanocoai/nanoclaw/issues/3762) [评论 1](https://github.com/nanocoai/nanoclaw/issues/3762) | 升级/卸载 add-opencode 后残留过时的测试文件，与现有代码结构冲突 | 从 8 月 5 日之前的版本安装后升级，自动生成的 guard test 断言的是旧的 Dockerfile 结构 | 不满意 — 期望安装/卸载逻辑保持对历史版本的兼容清理 |
| [Issue #3765](https://github.com/nanocoai/nanoclaw/issues/3765) | fresh install 过程中并发 SQLite migration 导致失败，安装流程不够健壮 | macOS 原生新装（2.3.0），init-cli-agent.ts 中 host 与 initializer 同时跑 migration | 不满意 — 但此类多线程竞态在新版本中已感知，修复方向清晰 |
| [Issue #3769](https://github.com/nanocoai/nanoclaw/issues/3769) | uvx 引导安装 Node/pnpm 后，父进程依旧找不到 `pnpm`，命令失败退出 | 全新 VM 上执行一条命令安装 NanoClaw，bootstrap 就能成功但父启动器 exit 127 | 已解决 — #3771 合并后该路径恢复正常 |

---

## 8. 待处理积压

以下 PR/Issue 长时间未合并/响应，建议维护团队关注：

### 长期未合入 PR（按等待时长排序）
| PR | 创建时间 | 等待天数 | 内容 |
|----|---------|---------|------|
| [#3156 — fix(agent-runner): carry channel attachments to providers as structured parts](https://github.com/nanocoai/nanoc

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-12

## 1. 今日速览

IronClaw 项目在过去 24 小时内整体保持稳定，活跃度处于温和水平。Issue 层面无新增、无关闭，处于零更新状态；PR 层面有 1 条待合并的修复更新（#8076，更新于昨日），尚无新版本发布。当前项目的核心推进集中在 **assistant 共享通道的识别与用户体验优化**，虽无大规模活跃，但 #8076 的持续迭代表明项目仍在稳定演进，社区讨论热度较低，整体项目健康度良好。过去一周的观察期内，项目处于"蓄力待发"状态，尚未有大规模功能落地或破坏性变更。

---

## 2. 版本发布

**无新版本发布。**

过去 24 小时内无 Release 更新，项目当前没有需要用户关注的新版本或迁移注意事项。

---

## 3. 项目进展

**今日无合并/关闭的 PR。**

当前唯一活跃的 PR 为 #8076，仍处于待合并状态，更新于 2026-09-11（昨日）。该 PR 为 assistant 模块的修复工作，标志着项目正在优化 **共享通道（shared channels）场景下的用户体验与错误处理一致性**。具体推进方向包括：

- 区分"已配对用户的共享通道断开"与"未配对账户"两种不同场景
- 为不同场景的用户消息与机器人命令提供针对性引导
- 统一产品端、适配器端与 OpenAI 兼容接口的拒绝分类逻辑
- 同步更新 Slack 适配器能力说明

该 PR 的持续推进意味着项目正在解决**多端一致性与通信可靠性**方面的痛点，但尚未进入合并阶段，整体功能的落地时间将取决于 review 进度。

🔗 [PR #8076](https://github.com/nearai/ironclaw/pull/8076)

---

## 4. 社区热点

**本期无高讨论量 Issue/PR。**

当前唯一的 PR #8076 虽评论数为 undefined（无有效评论数据），但其反复的更新记录（9月6日创建 → 9月11日更新）表明作者与维护者之间存在持续迭代。该 PR 聚焦于 **断开共享通道后的用户引导**，这背后反映了真实的使用场景痛点：

- 用户在 Slack 等平台使用共享通道时，若账号配对状态发生变化（如断开连接），现有系统缺乏清晰的提示与后续操作指引
- "已连接但断开"与"从未连接"两种状态在现有系统中可能被混淆，导致无法给出正确的处理建议
- 跨端（产品界面、适配器、OpenAI 兼容层）的错误信息不一致会让开发者与终端用户都感到困惑

这些改进诉求表明社区用户对 **助手在群组/共享场景下的可理解性与可操作性** 有较高期待。

🔗 [PR #8076 讨论页](https://github.com/nearai/ironclaw/pull/8076)

---

## 5. Bug 与稳定性

**今日无新报告的 Bug、崩溃或回归问题。**

从 #8076 的修复内容可以推断，当前存在一个与 **共享通道断开识别** 相关的体验缺陷：系统无法准确区分"已配对用户的共享通道断开"与"未配对账户"，导致用户收到错误或不完整的引导信息。该问题**已有修复 PR**（#8076）处于待合并状态，严重程度应归类为 **中等级别**（功能可用但体验不佳），不涉及数据丢失或服务中断。

🔗 [PR #8076（修复）](https://github.com/nearai/ironclaw/pull/8076)

---

## 6. 功能请求与路线图信号

**今日无新功能请求。**

结合 #8076 的 PR 内容，可以捕捉到以下路线图信号：

- **通道状态模型细化**：项目正在将"共享通道"的状态从二元（已连接/未连接）细化为更丰富的模型（已配对/未配对/断开），这为未来更智能的助手行为奠定了基础
- **多端一致性的持续投入**：对"产品、适配器、OpenAI 兼容层"三端的统一分类逻辑，暗示项目将 AI 助手的一致性体验视为长期目标
- **Slack 适配器能力完善**：PR 中包含 Slack 相关更新，说明 Slack 集成仍是项目的重要支持平台

这些信号表明下一版本可能包含 **更完善的通道状态管理与用户引导** 能力，但尚未有明确的功能请求 Issue 被提出。

🔗 [PR #8076（变更预览）](https://github.com/nearai/ironclaw/pull/8076)

---

## 7. 用户反馈摘要

**今日无用户反馈数据。**

由于过去 24 小时无新增 Issue 评论数据，无法提供直接的用户反馈摘要。从 #8076 的变更内容间接推断，用户侧可能存在的痛点包括：

- 在 Slack 共享通道中使用助手时，通道断开后缺少可操作的修复指引
- 不同接入方式（API、Slack 等）返回的错误信息不一致，增加排查难度

待 #8076 合并后，相关体验将得到改善。暂无用户表达明确不满意意见的记录。

---

## 8. 待处理积压

**重点观察 PR：**

**#8076 — fix(assistant): distinguish disconnected shared channels**
- 作者：@be-student
- 创建于 2026-09-06，最后更新于 2026-09-11
- 状态：**待合并**，已持续 6 天
- PR 涉及通道状态识别、多端一致性、Slack 适配器更新等多个模块，变更范围较大，建议维护者尽快安排 review，避免长期搁置导致与其他改动产生冲突

🔗 [PR #8076](https://github.com/nearai/ironclaw/pull/8076)

**Issue 积压**：当前无公开的长期未响应 Issue。Need to note that Issues 总数为 0，这可能意味着项目的 Issue 管理效率较高，或当前处于功能稳定期，社区需求主要通过 PR 直接表达（如 #8076 由贡献者直接提交修复而非通过 Issue 讨论）。

---

**总体评价**：IronClaw 项目当前处于稳定迭代阶段，活跃度中等偏低，但 #8076 所触及的共享通道体验优化具有明确的价值导向。建议关注该 PR 的合并进展，可视为下一轮功能发布的前置信号。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-09-12）

## 1. 今日速览

过去24小时项目保持高活跃度：共3条Issue更新（全部活跃，无新增关闭），8条PR更新（6条已合并/关闭，2条待合并），无新版本发布。合并的6条PR全部为修复性质，集中解决OpenClaw v2026.8.1升级后引入的插件兼容性、Gateway启动失败、会话误恢复等稳定性问题，说明项目正处于升级后的回归修复密集期。与此同时，3条活跃Issue均指向**重启后用户配置被覆盖/丢失**的同一类持久化问题，已成为社区最集中的痛点，亟待官方给出系统性解决方案。整体来看，维护者响应效率高（PR从提交到合并周期短），但配置持久化问题若长期得不到根治，可能影响用户信任度。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日共有6条PR合并/关闭，均为修复类，可归类为三条主线：

**OpenClaw v2026.8.1 升级后的稳定性修补**（占今日PR的绝大多数）：
- [#2656](https://github.com/netease-youdao/LobsterAI/pull/2656) `fix: openclaw gateway startup selfheal` — 修复Gateway启动自愈逻辑，解决升级后启动失败问题。
- [#2650](https://github.com/netease-youdao/LobsterAI/pull/2650) `fix(openclaw): recover memory sidecar archive collisions` — 解决内存索引与 `.migrated` 备份归档名冲突导致的致命启动错误。
- [#2651](https://github.com/netease-youdao/LobsterAI/pull/2651) `fix(openclaw): prevent stale desktop sessions from resuming` — 防止历史桌面会话被误判为中断而自动恢复运行。
- [#2652](https://github.com/netease-youdao/LobsterAI/pull/2652) `fix(plugins): patch nsp-clawguard native require compatibility` — 修复 `nsp-clawguard 2.5.0` 加载后破坏宿主 `fs.close` 导致Gateway启动中断的问题。
- [#2653](https://github.com/netease-youdao/LobsterAI/pull/2653) `fix(openclaw): preserve host runtime during plugin cleanup` — 修复Windows上 `fs.rmSync` 递归删除插件时误删宿主运行时（junction链接）的严重问题。

**构建与体积优化**：
- [#2655](https://github.com/netease-youdao/LobsterAI/pull/2655) `chore: optimize package size` — 优化打包体积，涉及Windows/macOS平台，可降低分发和安装成本。

以上修复表明项目正在快速消化上游版本升级带来的兼容性冲击，且针对Windows平台的原生依赖问题（junction、native模块）有专门投入。整体上，项目虽处于修复期，但修复覆盖全面、节奏紧凑，社区健康度可控。

另有2条PR处于待合并状态：
- [#2657](https://github.com/netease-youdao/LobsterAI/pull/2657) 修复缩略图渲染与原生依赖构建问题（涉及renderer/build/docs/main/openclaw多模块）。
- [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) 将OpenClaw主agent会话从Cowork会话列表中隐藏（已标记stale，但今日有更新，仍待合并）。

## 4. 社区热点

今日最活跃的讨论集中在以下两个长期Issue上：

**[#2293](https://github.com/netease-youdao/LobsterAI/issues/2293) — 多agent下USER.md被覆盖替换（5条评论）**

该Issue创建于7月7日，今日仍有新讨论，是当前社区最关注的问题。用户详细描述了复现步骤：修改任一agent的“关于你”或USER.md后，其他agent同步被修改；即使在关闭软件状态下直接改workspace-*下的USER.md，重启后也会被main agent的内容覆盖。评论区共鸣度高，说明多agent配置隔离是普遍需求。该问题已存在两个月以上，用户话语中透露出挫败感（“怀疑是最近更新时出现的一个bug”）。

**[#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) — 配置/工作空间文件重启后被重置（2条评论）**

该Issue自3月28日创建，已持续近半年，至今仍有更新。核心矛盾在于“保护机制过于激进”——启动时从内部模板重新生成配置文件，导致用户自定义的 `openclaw.json` 和 `AGENTS.md` 被覆盖。用户明确指出“目前只能通过定时任务 workaround 解决”，这属于典型的绕开产品设计的用户行为，反映需求与实现的错位。

**分析**：这两个Issue共同指向同一底层需求——**用户希望拥有永久性、可独立管理的配置持久化能力**。#2293是多agent场景下的配置隔离缺失，#1006则是单agent场景下的配置覆写问题，两者本质都是“重启后状态保留”机制不完善。鉴于今日新Issue #2654也是同一类问题（hooks字段丢失），可以判断这是当前用户遭遇的最普遍痛点，讨论热度与影响面均为今日最高。

## 5. Bug 与稳定性

按严重程度排列今日活跃的Bug类Issue：

| 严重程度 | Issue | 描述 | 是否有修复PR |
|---------|-------|------|-------------|
| 高 | [#2293](https://github.com/netease-youdao/LobsterAI/issues/2293) | 重启后所有agent的USER.md被main agent覆盖，用户多agent配置数据丢失 | 无 |
| 高 | [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) | 每次启动从内部模板重新生成配置和工作空间文件，`openclaw.json`、`AGENTS.md` 等用户自定义内容被重置 | 无 |
| 中 | [#2654](https://github.com/netease-youdao/LobsterAI/issues/2654) | 插件hooks配置在Gateway重启后丢失，根因是 `getUserPlugins` 未返回hooks字段导致 `syncToDisk` 丢弃 | 无（但Issue内已附详细修复建议） |

**此外**，今日已合并的6条PR说明OpenClaw v2026.8.1升级引入了若干回归缺陷，包括：
- Gateway启动失败（内存归档冲突、插件加载崩溃），已由[#2650](https://github.com/netease-youdao/LobsterAI/pull/2650)、[#2652](https://github.com/netease-youdao/LobsterAI/pull/2652)、[#2656](https://github.com/netease-youdao/LobsterAI/pull/2656) 修复。
- Windows平台插件清理时误删宿主运行时，已由[#2653](https://github.com/netease-youdao/LobsterAI/pull/2653) 修复。
- 历史桌面会话被误恢复，已由[#2651](https://github.com/netease-youdao/LobsterAI/pull/2651) 修复。

**观察**：配置持久化问题（#2293、#1006、#2654）虽然影响严重，且用户提供了清晰的复现路径和修复建议，但目前尚无对应fix PR，是当前最大的稳定性隐患。

## 6. 功能请求与路线图信号

今日无全新的大功能需求提出，但存在以下值得关注的路线图信号：

1. **用户配置持久化机制**（来自[#1006](https://github.com/netease-youdao/LobsterAI/issues/1006)）：用户明确建议“提供官方方式持久化用户配置，或允许用户自定义的文件在重启后保留”。这实质上是对产品机制的设计请求，若采纳将影响核心的配置管理架构。

2. **多agent独立配置隔离**（来自[#2293](https://github.com/netease-youdao/LobsterAI/issues/2293)）：用户期望不同agent拥有完全独立的USER.md和设置。考虑到多agent是LobsterAI的核心应用场景，该需求的实现优先级应该很高。

3. **插件hooks持久化**（来自[#2654](https://github.com/netease-youdao/LobsterAI/issues/2654)）：用户给出了三步修复方案（加列、返回值增加字段、合并写入），属于实现路径清晰的小型增强，结合今日多条插件相关修复PR，**很可能被纳入下一个小版本**。

4. **Cowork会话体验优化**：[#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) 待合并PR（隐藏内部主agent会话）显示项目在打磨Cowork的用户可见性，避免内部实现细节暴露给用户造成困惑。

结合今日密集的插件/配置类修复，可以判断下一版本的迭代重点大概率仍在**配置管理强化**和**插件系统稳定性**两个方向。

## 7. 用户反馈摘要

从今日活跃Issue中可提炼出以下真实用户声音：

- **多agent场景是硬需求**（[#2293](https://github.com/netease-youdao/LobsterAI/issues/2293)）：用户明确表达“这样就没法对不同agent建立不同的需求”，说明多agent是核心工作流，配置隔离是基本预期。用户尝试过手动改文件仍被覆盖，说明他们愿意深入底层去解决问题，但被系统行为阻断。

- **对“重启重置”行为感到困扰**（[#1006](https://github.com/netease-youdao/LobsterAI/issues/1006)）：用户被迫使用定时任务workaround来规避重置，这是对产品设计的不信任表现。原文“保护机制过于激进，影响了用户正常自定义需求”是非常直白的批评。

- **用户具备一定的技术排查能力**（[#2654](https://github.com/netease-youdao/LobsterAI/issues/2654)）：用户不仅报告了hooks丢失的bug，还定位到了具体文件（`openclawConfigSync.ts`）、具体函数（`getUserPlugins`），并给出了入库、返回字段、合并写入的三步解决方案。这是高质量的社区贡献，也从侧面说明项目代码结构对用户是开放的。

- **对升级持谨慎态度**：多个PR修复的都是OpenClaw v2026.8.1升级引入的回归，虽然今天合并的修复不少，但用户可能对升级本身有所顾虑，担心破坏现有工作流。

## 8. 待处理积压

以下为创建已久但尚未解决的重要Issue/PR，建议维护者优先关注：

| 类型 | 编号 | 创建时间 | 持续时长 | 备注 |
|------|------|---------|---------|------|
| Issue | [#1006](https://github.com/netease-youdao/LobsterAI/issues/1006) | 2026-03-28 | 约5.5个月 | 配置被重置，用户已用workaround，但问题仍在 |
| PR | [#1181](https://github.com/netease-youdao/LobsterAI/pull/1181) | 2026-04-01 | 约5.5个月 | 已标记stale，但有实质功能改进，今日有更新 |
| Issue | [#2293](https://github.com/netease-youdao/LobsterAI/issues/2293) | 2026-07-07 | 约2个月 | 多agent配置覆盖，今日讨论最热，无官方回复 |
| Issue | [#2654](https://github.com/netease-youdao/LobsterAI/issues/2654) | 2026-09-11 | 1天 | 新提交，但已含修复方案，建议尽快评估采纳 |

**特别提醒**：#2293与#1006极有可能是同一根因（启动时配置模板覆写机制）在不同配置维度的表现，建议维护者合并排查，一次性解决。若下个大版本仍不能解决配置持久化问题，可能导致用户对项目的信心进一步下降。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 2026-09-12

## 1. 今日速览

过去 24 小时 Moltis 项目活跃度较低：新增 1 个 Issue，PR 更新 1 条，无版本发布，也无 PR 被合并或关闭。新 Issue 报告了共享 Telegram 频道下工具失效的 Bug；一个关于添加 Requesty provider 的 PR 在昨日更新但仍未合并。整体处于常规维护节奏，社区反馈正常流入，等待维护者响应与审核。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有合并或关闭的 PR，因此没有新功能或修复落地。不过，PR [#1143](https://github.com/moltis-org/moltis/pull/1143) 在昨日（9 月 11 日）被更新，说明该功能仍在推进中。该 PR 拟将 Requesty 作为 OpenAI 兼容 provider 接入，若后续合并将扩展 Moltis 对 LLM 路由服务的支持。项目整体进展主要依赖待审核 PR 的推动。

## 4. 社区热点

今日社区热点为新建 Issue [#1264](https://github.com/moltis-org/moltis/issues/1264)，报告在共享 Telegram 频道中工具停止工作。虽然该 Issue 尚无评论，但作为唯一新增 Issue，反映了当前用户遇到的主要问题。另一关注点是长期未合并的 PR [#1143](https://github.com/moltis-org/moltis/pull/1143)，因其已悬置较长时间且近期有更新而受到关注。

## 5. Bug 与稳定性

今日报告 1 个 Bug：

- [#1264] Tools stop working in shared Telegram channels  
  影响共享 Telegram 频道中的工具调用功能。用户已确认搜索过现有 Issue 且使用最新版本，问题可能尚未被官方记录。严重程度需维护者进一步评估，当前无关联修复 PR。  
  [GitHub Issue #1264](https://github.com/moltis-org/moltis/issues/1264)

## 6. 功能请求与路线图信号

今日没有新的功能请求 Issue。值得关注的潜在功能信号是 PR [#1143](https://github.com/moltis-org/moltis/pull/1143)：添加 Requesty 作为 OpenAI 兼容 provider，并建议使用 `REQUESTY_API_KEY` 进行鉴权。该 PR 已存在两个多月，若被合并，将作为新的 provider 接入路线图的一部分。是否纳入下一版本取决于维护者审核进度。

## 7. 用户反馈摘要

Issue [#1264](https://github.com/moltis-org/moltis/issues/1264) 的用户描述表明：在使用共享 Telegram 频道时，Moltis 的工具功能会停止工作。用户已执行过预检清单，搜索过已有 Issue 并升级到最新版本，说明复现路径相对清晰，且可能是一个未被覆盖的真实场景。目前暂无其他用户评论，实际影响范围尚不明确，建议维护者优先回应并尝试复现。

## 8. 待处理积压

- **PR #1143**：Add Requesty as an OpenAI-compatible provider  
  创建于 2026-07-02，至今超过两个月，昨日有更新但仍未合并。该 PR 属于功能增强，长期积压可能影响贡献者积极性，建议维护者给出明确审核意见。  
  [GitHub PR #1143](https://github.com/moltis-org/moltis/pull/1143)

- **Issue #1264**：共享 Telegram 频道中工具失效  
  虽然为新建 Issue，但若无维护者快速响应，容易转化为新的积压项。建议尽快标注状态并分配处理。  
  [GitHub Issue #1264](https://github.com/moltis-org/moltis/issues/1264)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ 摘要生成失败。

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