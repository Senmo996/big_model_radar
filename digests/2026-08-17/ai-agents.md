# OpenClaw 生态日报 2026-08-17

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-17 00:36 UTC

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

# OpenClaw 项目动态日报 — 2026-08-17

> 数据源：github.com/openclaw/openclaw 公开仓库活动（覆盖时段：2026-08-16 ~ 2026-08-17）


## 1. 今日速览

过去 24 小时项目保持着极高水平的社区活跃度：共产生 500 条 Issue 更新和 500 条 PR 更新，其中遗留问题讨论占主导——仅 37 个 Issue 关闭，待合并 PR 仍有 418 条积压，暴露出维护吞吐量可能跟不上反馈量的问题。

值得注意的是，Issue 区讨论量最大的问题（#121058，97 条评论）是一例“修复后复发”的静默发送失败问题，叠加大量标注 `clawsweeper:no-new-fix-pr` 且长期滞留的 **Diamond/Platinum 级**核心会话缺陷（#44925、#115908、#112423 等），说明当前版本在**会话状态一致性与消息交付可靠性**两处存在系统性短板，应视为下一迭代的首要健康度风险。

与此同时，维护者 `@steipete` 今日多篇架构治理类重构 PR（#124943、#124944、#124942）已进入待审状态，显示平台化与安全边界收敛仍在稳步推进，整体并未停滞。


## 2. 版本发布

今日无代码级正式版本发布，仅有 1 个 `prerelease` 特征的数据包更新：

- **pr-124528-profiles**（2026-08-17）
  - 内容说明：发布供维护者直接取用的 **PR #124528 Gateway 调优 CPU 性能分析存档**（采集自有界三节点、12 并发轮转测试机），内含事件循环热点对比所依赖的 before/exact-head 分析文件。

**评估**：无破坏性变更，仅供维护者归因 #124528 “事件循环停顿类“问题使用，无面向外部用户的消费价值。


## 3. 项目进展

今日仅 1 个 PR 确认合并，且不包含客户端用户可感知的功能增量，但维护者侧有重要收益：

- **[已合并] feat(ui): review install policy warnings（#120900）**
  - 为控制面 UI 增加安装策略告警的人工复核功能，允许管理员显式以 `acknowledgeInstallPolicyWarning: true` 放行插件安装，补齐了插件安装链路上的“人审”闭环。
  - 状态参考：proof 充分（含视频）；`security-boundary` 回归风险已评估。

- **[已关闭] fix(cron): stop advertising inactive JSON defaults（#124903）**
  - 清理 `openclaw cron` 帮助中信噪比过低、与实际行为冲突的 `--json` 参数声明。属于低风险、提升 CLI 可读性的收敛。

> 整体更新速率主要受 82 个待合并瓶颈拖累。今日虽审阅推进积极，但**实质性对用户可见的功能落地非常有限**。


## 4. 社区热点

今日讨论热度高度集中在 **可靠性缺陷复发**与**长期未决核心缺陷**两类，诉求呈现明显“希望集中修一修调度与死信链路”的倾向：

1. **[已关闭] `[P1 message-loss] #121058 静默回复失败旧疾复发`（97 🗨️，热度断层第一）**
   - 标签戳在 `#116277` 老修复案上，但用户报告 `sentinel` 监控仍在遭遇同类失败。
   - 诉求：**期望修复不再“关了就忘”，需要可持久验证的重建验证/回归集。**

2. **`[Diamond Lobster] 子 Agent 完成静默丢失（#44925）`（31 🗨️）**
   - 聚合 3 种失败路径（完成通知异常、超时不重试、不自动重启），且长期无修复 PR。
   - 核心诉求：**消息在复杂编排链路上的一致性传递语义**——也是近期多个高赞（2-4赞）话题的共同底色，应作为专题攻关。

3. **`[Feature] Per-agent 网关级成本预算（#42475）`（26 🗨️）**
   - 是今日评论数最高的“功能型”Issue：需求明确（预算开关/超限熔断），吸引较多用户跟帖表示同感，或许是最值得 PM 审阅的产品需求热点。

另有 #48003（steer 模式不注入中期消息）、#22438（分级 bootstrap 加载）分别以 21/19 条评论居热度前列，均是体验或线索类诉求。


## 5. Bug 与稳定性

按严重度与是否已有修复 PR 汇总如下（重点关注**影响消息丢失/阻断交付**的链路）：

| 严重度 | 核心问题 | 状态 | 备注 / 修复 PR |
|---|---|---|---|
| **P0 复发** | #121058 静默回复失败复发（#116277 修后仍存在） | CLOSED（无修复PR） | 监控日志今日仍新增复现 |
| **P1 持悬** | #44925 子 Agent 完成静默丢弃（无重试/通知/重启） | 未修复，已悬 157 天 | 3 种失败模式均未闭环，Diamond 级 |
| **P1 持悬** | #48003 steer 模式不能运行时注入主会话 | 未修复，有 fix 考量 | 根因指向 `KeyedAsyncQueue`（3月3日提交引入） |
| **P1 持悬** | #115908 转录投影合入不收敛，引发主线程事件循环数 10 秒级阻塞 | 未修复（已定位：重建在同步路径中执行） | 同发多条 Channel 运输串联中止 |
| **P1 持悬** | #112423 大 SQLite 会话清理阻塞事件循环 | 未修复 | 与 #115908 同属“同步物化 + IO”堵点 |
| **P1 持悬** | #96834 WhatsApp 入站大表情包/图片塞住主通道约 3 分钟 | 未修复，需线上复现 | 与 #50093（断线后补收）合并影响 реальной 使用 |
| **P1 回归** | #38327 `google-vertex/gemini-3.1-pro` 崩溃 (“Cannot convert null to object”) | 未修复 | 2026.3.2 回归；需复现环境 |
| **P1 安全** | #46786 `tools.elevated.enabled: true` 导致所有 exec 路由到宿主机 | 未修复，需安全审议 | 高危授权边界风险 |
| **P1** | #56217 1Password 密钥崩溃导致 service account 限流适配 | 未修复，待产品决策 | crash-loop 被 launchd 不断复活放耗 |


## 6. 功能请求与路线图信号

- **预算管控（P2，信号强）**：#42475 Per-agent 成本预算（日/月上限，网关侧拦截）——讨论 26 条，且和 `session-cost-usage.ts` 已有能力呼应，预计会是下个大方向的候选。相关未决：`@steipete` 今日虚拟的 `account admitted provider invocations` PR（#120818）也可归入此路径。
- **降价侧启动替代（P1 long-tail）**：#22438 分级/bootstrap 文件加载深度，获 19 条评论；与 `session.cost` 诉求可合流（只加载被引用的文件）。
- **对话体验优化**：#124298 WebChat 排队消息就地编辑（PR 已开）；#124904 存档消息恢复（PR 已开）；#45508 自建 STT/TTS 下游集成。后两条均已开 PR，**是距用户最近、最可能落在 8 月下旬。**
- **平台能力补全**：#88154 Slack Modal 支持、#7476 WhatsApp 贴纸发送、（#48786）Feishu 引用占位符修复。部分 PR 处于未定档状态；但 visibility 高。

**结论**：优先考虑从 **可靠性上下文（预执行）** 和 **成本可见性** 两条用户高呼的线索入手，在 9 月版安排落地候选。


## 7. 用户反馈摘要

- **“修复不闭环”是最大差评点**。典型评论：*“#116277 关闭了，但 cron 今天又打到 error”*（#121058）。评审与关闭的边界应附带重现验证链接。
- **静默失败>报错**：多用户反馈（#44925、#121058、#47744 等）宁可失败快速提前报错，也不愿消息静默丢失，#117609 也为此诉求提供了佐证。
- **时间成本敏感**：长时间的 vite（QT）控制面调度（#720796 之外）与 #112423 的清理 blocking 事件循环被1 -多次点名“体感慢了”。
- **清华细节**：macOS 内存未上报（#47273）、Windows node 残余进程（#74378）均属“非 Linux 平台”优化貶损，当前第二波扩散待闭。

**运营建议**：可每周贴出“#110327 修复回顾清单”增加方法论信任；对 #44925 若短期无法修完整方案，建议先至少给出最大失败模式的临时逃生（如完成等待的最短轮询保底）以缓解。


## 8. 待处理积压（提醒维护者关注）

| 类型 | 仓库编号 | 标题 | 滞天数 | 重要性信号 |
|---|---|---|---|---|
| Issue | [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子 Agent 完成静默丢失 | 已悬 157 天 | Diamond Lobster、3 App 级惩戒模式合并；多路依赖 |
| Issue | [#48003](https://github.com/openclaw/openclaw/issues/48003) | steer 模式中程消息注入失效 | 已悬 154 天 | 根因已明确（`KeyedAsyncQueue`）但迟迟无修 |
| Issue | [#42475](https://github.com/openclaw/openclaw/issues/42475) | Per-agent 预算能力 | 已悬 160 天 | 26 条评论、已有多代码基础 |
| Issue | [#38327](https://github.com/openclaw/openclaw/issues/38327) | Google VertexGemini 转换崩溃 | 已悬 164 天 | P1 稳定回归、无 PR，易退避 |
| PR | [#97339](https://github.com/openclaw/openclaw/pull/97339) | cron 扁平化字段暴露 | 待审 51 天 | ⏳ waiting on author，长周期无人处理迹象 |
| Issue | [#45494](https://github.com/openclaw/openclaw/issues/45494) | Cron 任务在 LLM 故障期间超时等待 | 已悬 157 天 | 明确有助于改进快速失败体验 |

以上数据均来自今日抓取的公开仓库动态，仅供维护者与社区做健康度俯瞰。这里，若需进一步定位某个具体 PR 的 diff 或节点事件，可在 OpenClaw 仓库发起查询。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告

**报告日期：2026-08-17**
**数据窗口：过去 24 小时**（基于各项目 GitHub 公开活动）

**核心结论摘要**

有迹象显示，智能体的功能范式正在融合。今天的“Claw 生态”成员在功能路线上的重叠度极高（消息、会话、Channels、Tools 是默认组件），而它们在**架构选择、安全边界、性能策略**上展现出差异。强大的市场牵引力（用户对可靠性、成本、安全的关注）已经取代了早期对这些实例的新鲜感。


## 1. 生态全景

个人 AI 智能体开源生态正从 **功能扩张期转入可靠性攻坚期**。主流项目的核心差异集中在重大复杂问题，而非功能到位——各头部项目普遍面临如下结构性挑战：高位阶积压（OpenClaw 393、NanoBot 499），修复“复发”现象频发（OpenClaw #121058 两度复发后继续出现极端端拥堵）。与此同时，**隐式安全成为分水岭**：Zeroclaw/Moltis/Pico内部的主动防守自成体系，而市场规模优势巨大的 OpenClaw 被负面问题时依赖社区的“反馈质量”兜底。**渠道与生态互操作**（Webhook、Slack、Telegram）作为基础设施各个行业玩家已基本达成共识，用户侧表达的首位诉求转向**消息传递一致性与可观测性**——超过四个项目（OpenClaw、NanoBot、CoPaw、PicoClaw）的最近头条均涉及静默丢失、token失控或私密状态故障阻断。从整体演进曲线看，推动个性化明确指令的狂热粉丝，已进入“quiet quitting”阶段，这是用户驱动的成熟进入生态的表现。


## 2. 各项目活跃度对比

| 项目名称 | 活跃 Issues | 活跃 PRs/合并 | Release | 健康度评估 | 整体热度 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 更新（37 关闭） | 500 更新 / 82 待合并 / 1 合并 | 1 prerelease（源码存档） | **中低** ⚠️ 增修失衡，循环复发则险兆显著，社区体量极大但维护陷入瓶颈 | ★★★★★ |
| **NanoBot** | 11 活跃 / 4 关闭 | 499 合并 1（关闭点） | 0 | **偏低** ⚠️ 合并差距仅0.2%，大批 PR 进入僵局，存在架构级争议（#2463）久拖 | ★★★★★ |
| **Zeroclaw** | 48 更新 / 2 关闭 | 50 更新 / 4 合并 / 46 待合并 | 无（0.8.4→预计 0.9） | **良好** ✅ 多份高位 RFC 发布时间，安全 egress 落地；有作者行动带塞 | ★★★★☆ |
| **Nano**（CLI 类） | 3 更新 | 5 更新 / 1 关闭 | 无 | **B+** ⚠️ 安全加固较正规，但 Slack 阻断问题无 PR 引用 | ★★★☆☆ |
| **Nano** | 误报 1 已关闭 | 28 更新 / 13 合并 | 无 | **较高** ✅ 团队改进密度极高，跨会话上下文、投递一致性等核心构建持续完成 | ★★★☆☆ |
| **IronClaw** | 1 新开 | 9 更新 / 2 合并 | 无 | **中高** ✅ Slack 引导私保密性有秒回修复 | ★★★☆☆ |
| **LobsterAI** | 10 更新（全部 `[stale]` 标记） | 17 条（但9条为陈旧） / 3 安全 PR 合并 | 无 | **中低** = 安全加固合入，但核心功能大量积压、生命周期过长 | ★★☆☆☆ |
| **Moltis** | 3（2 关 1 开） | 11 / 10 合并 | 无 | **极高** ✅ 当日合并 10 条，编译修复+安全+前端 v2；响应周期<48h | ★★★☆☆ |
| **CoPaw** | 9 / 3 关闭 | 0 合并，9 待审（6 条首次贡献） | 无 | **专注但阻塞** ⚠️ 评审瓶颈，心流中断；新贡献质量有均值 | ★★★☆☆ |
| **TinyClaw / ZeptoClaw / EasyClaw** | — | — | — | 停更（24h 无数据） | ☆ |


## 3. OpenClaw 在生态中的定位

**OpenClaw：大规模通用型 AI 助手框架（重度、鲁棒），是生态的“实数参照”与事实标准。** 其优势体现在：

1. **生态体量与流量主导权**：同时拥有 **500 个 Issue / 500 个 PR**的接触面，是其他项目的 10 ~ 50 倍，所有实践在覆盖面上最广；社区Completeness和关注度难以撼动。
2. **技术纵深**：GitHub Actions和迭代（如 #124528 Gateway 调优）投入资源最多，每次并发软件包发布都有完整的 profiling 数据支撑；对比 Nanco/小红豆碎步迭代更垂直。
3. **未破的是对应而磨损的风险面**：PR不被合并（高层级核心 `#44925` 于 157 天不动），“合并-复发”循环促使 Alt 生存在生态位抬头。

**对比固定维度与差异**：

| 维度 | OpenClaw | 同类较强者 |
|---|---|---|
| 产品形态 | 通用框架，内置多渠道/记忆/工具，规模化 | Zeroclaw：强化治理/RFC驱动，安全区扩大明显；CoPaw：专注数据应用%s，零ease权重 。如永不超过 /textarea |
| 并发社区开放度 | 官方发布周期已经很灵活，预告速度超前 | Moltis：更快的审查闭环（PR 合并 1昨日 10/11）；NonoBot：用户侧 CLI 风气为主，SF |


## 4. 共同关注的技术方向

**（以下关键词 = 多个项目上涌现的信号，这是优先投递的信号）**

| 痛点名称 | 涉及项目 | 具体诉求 |
|---|---|---|
| **①投递语义与消息一致** | OpenClaw（#44925 子代理完成丢失；#121058 静默丢失）；NanoBot（#4864 complete_goal 循环不可用）；PicoClaw（#3338 Slack 上传参数缺失阻断）；NanoClaw（#3255 [已修复] 一个适配器寻址到消息读走 | 已经不只是“重试”，而是CTA对通配事件**可观测可回追溯、并日预期化**的准确语义。 |
| **②用例级代码审计防止越权** | OpenClaw（#46786 elevated Suze）；NanoBot（#5305[ 已修] allowPatterns 绕过）；Zeroclaw（#10014 TTS 子进程）；Moltis（#1158 Zip 写入，已修复）；PicClaw（SSRF 多媒体三连改） | 单点 token 验证安全打破一次性防护的思路形成共识：外部 Input 驱动直接引发的 SSRF/Path escape/Zip Slip 已是主流关注点，且需要**主动侵略式加固 + 回归用例** |
| **成本可见性 & 决策** | NanoBot（#5266 百万 token 不可追踪 + #5402 tiktoken 低估）→ Couffer charge/可靠性 | 用户期望**per-agent的调用统计、即时熔断阈值**；Viper （#7003）宣布了 Reduce 97% token。注意此风含有“实际上管理”的深层痛点，不仅缺视力。 |
| **会话记忆的上下行一致性** | NanoBot（#2463 prompt 前缀持久化缺失）& #1037 实现（system prompt 被再次截断）MovesClaw→（molt # 已崩溃另开卡）NumberCoPaw #7072；Moist保留正次显式的DTO | 用户要求提前能直接进行 AI 角色会话且能被保存，数据库里抽出的**不仅是 anonymous 历史，更像“角色的 profile 文件”**。与“跨会话记忆”逐步走向对齐：NonoClaw#3257 开启“回声跨会话记忆” |
| **HTTPSSSE退出请求可能存在于人格的设备已.php** | IronClaw（#7681 私有连接引导）；PicoClaw（Bot API 10.1 表格渲染）；CoPaw（system prompt 权限限制，含隐私） | 对为服务企业场景如何集成这些依赖的开发者来说，数据乃至 prompt 层面的隔离与权限治理成为新企业市场切口。 |


可能的下一个征集：Zeroclaw 的（blank egress）、Dubai的 plugin Escape ，多模型并 verif即便（Clamp）都戳越为**互操作的语义契约**，未来很值得年度参与两手抓。


## 5. 差异化定位分析

| 项目 | 核心产品愿景 | 优选用例 | 风格/关键取舍 | 社区特性 |
|---|---|---|---|---|
| **OpenClaw** | 拥有一切的通用型自主体框架 | 需要单一框架管理多渠道+会话+技能的重度用户 | 复杂、功能可演进，但给维护高中生使用杂技太重 | 群量大，噪音远高于 API 精度（缺陷比例） |
| **NanoBot** | 纯 Terminal/本地优先 CLI 助手 | 开发者、本地 agent 快速接入 mine | Hook 多、强调确定性执行与省钱（cache 优化） | 有较强“极客”圈子，愿意谦虚对话，但自主阻塞多 |
| **Zeroclaw**| 企业约束的多 Agent 联合（以安全/协议作基本资产） | 需要 RFC 流程/多 Agent 协作严谨、fine SLA 团队 | 专业级**治理**（Roadmap RFC 将其献给 NO） + 社区结对开发的印象进行 | 外部贡献（RFC）占比（difficulty）高，形成 RH 风格 |
| **Moltis** | BSP-Something架构（gateway 预设） | 把 Llama/向量DB/本地语义用入团队或土地旁边 | 高性能安全底线，Built-release 速度快 | 中等自动化TED；内部 ideation 拉动明显 |
| **LobsterAI** | 专用 IM（钉钉、飞书、QQ）客户端的 Claw-like | 企业内部通过 IM 作为唯一前端使用 | 开头封锁：无新版本，等了数月 | 用户素品质的还需要，核心瓶颈主要是发布滞后 |
| **PicoClaw** | 轻量、Channels 即 main feature | 小微部署，渠道集成向安全环境也要按链接 | 稳定导入安全合入，但社区稍显刺脚 | 小型硬件（

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# 🤖 NanoBot 项目动态日报 — 2026-08-17

## 📊 今日速览

过去24小时NanoBot项目整体活跃度处于较高水平，PR池规模达到500条，创近期高位，但其中绝大多数（499条）处于待合并状态，仅1条被合并/关闭，合并率仅0.2%，显示维护团队的审查下游端存在明显瓶颈。Issues方面新增/活跃11条、关闭4条，关闭率约27%，讨论焦点集中在token消耗与对话一致性主题上。新版本发布0个，项目当前处于“高输入、低输出”状态。安全问题（`exec.allowPatterns`绕过，已关闭）、token审计（#5266、#5402）与对话状态保持（#2463）是当前社区最为关心的三大主题。

> 综合评估：项目社区活跃度 ⭐⭐⭐⭐（高），维护响应速度 ⭐⭐（中低），综合健康度 ⭐⭐⭐（中等）。

---

## 🚀 版本发布

**无**。过去24小时无新版本发布。项目自上一版本之后累积了大量待合并PR，可能在未来触发一个较大的minor版本或多个patch版本。

---

## ✅ 项目进展

今日合并/关闭的PR仅有1条，根据500条PR数据中的闭合信息分析，唯一被标记为CLOSED的PR为：

- **PR #4329** — *feat(cli): add native TypeScript terminal UI*（关闭）
  - 关闭原因并非实际合并：`main`分支误标合并后立即回转，该PR的变更内容实际并未进入主分支。后续#5406已以此为替代继续推进该功能。
  - 链接：[PR #4329](https://github.com/HKUDS/nanobot/pull/4329)

可见：整体项目向前迈进的幅度有限，但已有多个PR长时间等待审查，其中不少带有`[conflict]`标记（与主分支冲突），这些冲突需要维护者优先处理，否则积压会逐步恶化。

其他关闭的Issues（合计4条）包括：
- #5305（安全漏洞，closed）、#2185（回归问题，closed）、#5373（cron调度器bug，closed）、#5275（Matrix线程，closed）— 这些代表部分问题得到解决。

---

## 💬 社区热点

**No.1 ｜ #2463 — “Prompt前缀不被保留”的架构缺陷争论：**
- 15条评论，持续了数月的争议话题。
- **核心诉求**：`nanobot`当前保存的对话历史与先前发给模型的可靠提示前缀不一致，与OpenAI的prompt缓存逻辑存在根本性冲突。社区正在进行深度排查，能否从保存/复现机制上根本解决。
- 这是一项具备架构级别的议题，影响所有provider的对话缓存能力。
- [Issue #2463](https://github.com/HKUDS/nanobot/issues/2463)

**Top 2 ｜ #5266 — Token消耗巨大且无法追踪：**
- 14条评论，高热度。
- 用户反馈2小时消耗百万级token，且无可视化不可用。社区反馈到需要token等级日志与按调用计费的监控能力。
- [Issue #5266](https://github.com/HKUDS/nanobot/issues/4648)。

**Top 3 ｜ #5406 — 原生TypeScript终端UI（新一代CLI，重新开放）:**
- 该PR是旧的#4329的替代方案，具备完整的前端面，涉及复合的技术栈，目前评论区尚待收集。
- [PR #5406](https://github.com/HKUDS/nanobot/pull/5406)

**Top 4 ｜ #4864 — `complete_goal`工具进入死循环：**
- 评论数6，高度相关功能性bug，涉及网关tool参数解析回归引入的问题。
- [Issue #4864](https://github.com/HKUDS/nanobot/issues/4864)

---

## 🐛 Bug 与稳定性

按严重程度排序：

**✅ 已关闭：**

| 严重级别 | Issue描述 | 状态 |
|----------|----------|------|
| P1  | **安全漏洞：`exec.allowPatterns` 绕过链式shell命令执行**（#5305） | 已关闭 |
| P1 | Cron调度器因单次持久化故障而永久死亡（#5373） | 已封闭 |
| P回归 | 一次简单升级（0.1.4 → 0.1.4post5）导致gemini-3-flash-preview不可用（#2185） | 已关闭 |

- [#5305](https://github.com/HKUDS/nanobot/issues/5305) — 对实现过滤仅白名单时被绕过，允许通过链式命令执行额外shell段，目前已解决。
- [#5373](https://github.com/HKUDS/nanobot/issues/5373) — `_arm_timer()` 处于 `try/finally` 之外，因此一次磁盘/权限故障即可让cron在调度中完全停摆，现已被修复。

**未解决（待处理，按严重程度）：**

| 严重级别 | Issue | 描述 | 是否有fix PR |
|----------|-----|-----|-------------|
| P1 | [#4864](https://github.com/HKUDS/nanobot/issues/4864) | `complete_goal` 在 truyền 参数时因JSON解析不匹配导致死循环 | 无 |
{exec的"警用"，期望PR是更加稳定的回归}
| P2 | [#5377](https://github.com/HKUDS/nanobot/issues/5377) | 合并归档裁剪输入但`last_consolidated`仍跳动完整宣称推进，潜在会话后丢失 | 无 |
|神 | [#5402](https://github.com/HKUDS/nanobot/issues/5402) | tiktoken估算持续低估实际token数，导致触发合并的字数问题 | 无 |
| P2 | [#2463](https://github.com/HKUDS/nanobot/issues/2463) | prompt保存不存在前一致性，缓存命中率受损 | 无 |

### 潜在的中等风险：

- GPU触摸显示的：`exec.allowPatterns` 已经修复，但社区担心是有无同类的允许列表绕过模式在其他地方存在。可考虑重新审计带`patterns`的安全执行模块。

---

## ✨ 新功能需求与路线图信号

以下功能需求位于当下社区讨论的焦点，或对应已有PR（目标下个版本）：

| 需求 | 来源 | 对应PR /进展 | 进入下版可能性 |
|------|-----|----------------|--------------|
| **原生TypeScript终端UI** | PR #5406（替代#4329） | 已开，不存在conflict | 建议🏆 大方向明确，需主Maintainer审查 |
| **支持Discord/TTS语音回复** | PR #1306 (开口) | 尚存conflict，555天前开启 | 需先解决conflict（否则否） |
| **支持Telegram贴纸 + 主动消息反应** | Issue #5289 | 无PR，仅有需求 | 初估中低 |
| **MCP Apps UI嵌入** | #5251 | 无PR，有2评论 | roadmap中 |
| **“Dream”不产生重复技能** | #4467 | 无直接PR | 首选，存在PR的可能极大 |
| **基于mention的WebUI会话协作** | PR #5358 | 已开启，尚未合并 | 具备进入下个版本的现状 |
| **模型可见MCP Schema预算** | #5298 | 无PR | Roadmap探讨 |
| **“仅用户可调用”的技能增强** | #5404 | 无PR | 1评论，优先级中等 |
| **语音/音频可复用模块子集** | PR #1306 (Discord TTS) | 有conflict | 低-中，需be用户期待 |

Tests 两类确认：
- [PR #5358](https://github.com/HKUDS/nanobot/pull/5358) — WebUI会话协作（管理稳定`@name`、提及选择、会话优先级），状态为“open”。
- [PR #5406](https://github.com/HKUDS/nanobot/pull/5406) — 原生TSUI，虽未合并，但如果被接受则会影响CLI产品形态，拉取愿景。

另外：
- #5358 与 #5289 表明：更多渠道（Telegram、Matrix）与WebUI互动在加强，多模态交互、渠道内会话协作为本阶段高频信号。

---

## 用户反馈摘要

从今日Issues回复中汇总出的关键反馈点：

1. **token消耗“隐形流出”**：用户@knoppix2在#5266反馈“2小时就烧完百万token”，“会话简单无人状态”，但该计划没有面向用户的可视化日志。多个评论（@Xcc313r4n7 #5402等）也印证：即使是tang token估算也低估了实际消耗，说明电脑察觉不到token失控，但合并也不会发生，会无限浪费模型成本。
2. **Prompt“重复前缀”不一致的保留信任**：@ronny-rentner在#2463里的备注，启动维护content fidelity的立即问题相对阻碍用户自定义上下文的可靠性。
3. **对“安全默认”关注度高**：链式命令绕过（#5305）被社友评价“感谢快速修复，但提醒需要全链路的执行护栏，拒绝恶意或 `and`/`&&` 粘合将是硬标准。”提到“不应仅仅双重启用key，业务上对于提示二层网络网络或权限升级同样要警惕。”
4. **对平台/个性化的Queuing**：@songsong-hui在#4467建议“技能文件更新时，不要新建重复名字的内容”访问，评论者有相仿“多重技能定义时建议需求”教学，当前模型新手土地利用人力。
5. **愿意参与本地命令工具行为**：`complete_goal`循环错误（#4864）引发网关参数Serial化需求，从此看出Requirement更倾向“默认JSON、参数类型稳固”，经历了升级回归。
6. **对telegram支持“浅层”**：贴纸、身份验证、“thread在顶层”的问题在#5289、#5275中有发声，目标为当前渠道深度不足。

---

## 📋 待处理积压(提醒维护者处理)

### 优先提示：

1. **[PR #1205] KV cache复用批次prompt回退延长实验（2月25日起）** 已属“陈旧+conflict”，同时未获得推进。
   - 链接：[#1205](https://github.com/HKUDS/nanobot/pull/1205)
2. **[PR #1149] PromptGuard注入检测** — 2月末的PR，社区对它有信心，comment均值高，但是还没有review。
   - 跟踪：[#1149](https://github.com/HKUDS/nanobot/pull/1149)
3. **[Issue #4864] 死循环** — 无link的ArgumentIssue，当前未route到hammer状态。
   - 链接：[#4864](https://github.com/HKUDS/nanobot/issues/4864)

### 陈旧但重要无关注：

- [#1072](https://github.com/HKUDS/nanobot/pull/1072) 提到MCP的`CancelledError`直接crash进程，但没有——然而现在已经main部分多久，请大家更多的注意用一下。
- [#1037](https://github.com/HKUDS/nanobot/pull/1037) 也将当前时间放至系统提示词尾以支持隐式cache——与#2463同样的逻辑，但却较长时间没有被审阅，或许值得做一个优先。

### 长期无响应的Issue：

- #2170[引用] **Vehicle：Memory 不受配置的控制** – 未标记#500的后续进展，但采用N/A的方式可达。私见可结合#5404重新整理相关的共识。
- #2215 -- 若从中选择优先回归的合并，会让成果得到保留。

---

*以上内容基于 2026-08-17 快照自动生成，所有信息均以链接为准，请维护者重点私我获取更多。先把#5406的Conflicts选择列短。*

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 (2026-08-17)

## 1. 今日速览
项目继续保持高度活跃的开发节奏：过去 24 小时有 48 条 Issue 和 50 条 PR 更新，Issue 关闭 2 个，PR 合并/关闭 4 个。当前聚焦在多项 RFC 的讨论与修订（如 Chat Completions 协议、附件架构、安全策略）以及一系列稳定性修复（如 cron 调度、TTS 测试等）。值得注意的是，社区贡献显著：多篇 RFC 由外部成员（非维护者）提交或主导。待处理 PR 的数量仍然较高（46 条待合并），且有多个 PR 被标记为“requires author action”，虽需维护者关注，但这表明项目在进行高质量的社区驱动迭代，整体健康度良好。尽管尚无新版本发布（此前版本为 0.8.4），多处 PR 已处于提交关键阶段，预计项目具有向 0.9 版本推进的力量。

## 3. 项目进展 (今日合并/关闭的 PR)
- **#9580 [CLOSED]** **fix(security): harden built-in HTTP egress on the shared network guard**：由 @JordanTheJet 提交，已合并（关闭）。该 PR 加强了内建 HTTP 出口边界的安全性，并将共享的网络分类原语移动到 `zeroclaw-infra::net_guard` 供插件使用。还拒绝并审查了所有已审计的非全局 IP 地址。为后续的插件出口策略（ADR-013）奠定了基础。 [链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9580)

- **#9416 [CLOSED]** **docs(tools): document that AllToolsResult.tools is the pre-filter registry**：由 @perlowja 提交，已合并。该文档描述了 `AllToolsResult.tools` 的基本含义，确保开发者正确理解其与 `unfiltered_tool_arcs` 的区别。PR 链接:  https://github.com/zeroclaw-labs/zeroclaw/pull/9416

点评：今日主要进展是安全边界加固和文档澄清，为待处理的 egress 策略（plugin egress policy）铺平了道路。项目逐渐朝向插件安全性和硬化的目标推进。

## 3. 社区热点 (近期高关注度问题)

1. **RFC: ZeroClaw Chat Completions profile (#8603 - 22 条评论)**：该 RFC 提出通过 OpenAI 的 Chat Completions 协议向 ZeroClaw 提供通用 API 访问，以便 Open Web 等客户端、LobeChat、Continue.dev 等可无障碍接入。该讨论仍处于“needs-maintainer-review”阶段，表明社区对于提升互操作性抱有高期望。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/8603

2.  **RFC: Unified attachment architecture for web chat and channels (#9488 - 17 条评论)**：由 @NiuBlibing 提交的提案，旨在统一跨渠道间的附件处理，避免分散的功能模块方案。目前处于提案状态，且仍有人工维护者参与讨论，反映社区对标准化 UX 的质量追求。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/9488

3. **RFC: Provenance, conversation binding, and reply contract for #) (#6954 - 14 条评论)**：内部初始化 agent 对话的绑定和回复操作，被润尽全力优化。该条处在重写与合规、边界澄清阶段。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/6954

4. **RFC: Work Lanes, Board Automation, and Label Cleanup (#6808 - 23 条评论)**：最活跃的治理类 RFC，讨论任务功同步、看板自动化面板的流程改进。已接近支持“Ratified / rollout in progress”的状态。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/6808

总结：社区聚焦在异构客户端接入、多方使用的附件、跨 agent 的内务流程合规性，说明用户正将 ZeroClaw 投入更复杂真实的多 Agent、多渠道场景，并期望性增强治理和可观测性。

## 4. Bug 与稳定性 (今日报告/活动)
- **[S1 评级]** **Bug: Edge TTS 测试在 Parallel Runtime 下误删、误放子进程（#10013，P1）**：`parallel runtime gate` 下的 edge TTS 取消逻辑可能因伪造的 child进程未写钱包文件而非法。已标记为 accepted，属于作为“follow-up”的下一段。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/10013

- **[S1 评级]** **Bug: 连续审批卡片无法区分（#9655）**：一个消息引发的多个待审批工具调用卡片无法在点击前区分，导致风险：用户可能将错误的操作授权，尤其是高优先级 P1。该问题已 accepted，后续将优化**上线设备可识别**。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/9655

- **[S2 评级]** **Bug: /health 报告未连接渠道为 health（**01，P1**：** 渠道（如 Telegram ）若 token 无效，但 端点仍标记健康，供失真，影响且状态严重。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/9811

- **[S2 评级]** **Bug: SOP 层叠拒绝解码（#9953 - 已关闭固定ion）**：已完成修复已一并关闭。行为：接受双层 JSON 编码对象。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/9953

- **[S2]** **Bug: 代理独立委托忽略了系统策略策略 （#10020）**：Agent 在独立模式下执行 `delegate` 时目标 agent 的 `thinking` 配置不被应用。目前建议新建测试推动修复。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/10020

- **[P2]** **Bug: POST /api/cron 接受无效的 session_target**：API 层未校验字段，导致暂时静默降级；已标记 in-progress 但暂无关联 PR 记录。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/10037

另有两个运行时测试相关（#9965）以及导出的 cron 、各类的 primal 事件，表明 CI 测试正在对 Parallel-load 做稳速强化。

## 5. 功能请求和路线图信号
- **RFC: zeroclaw swarm — 临时 agent 小组与 TUI** (#10025): 新 RFC，建议引入“agent 小组”（swarm）模式，以支持短暂多人协作，提供 TUI。这属于较大的实验性架构信号（新 8/18），可能将来进入快速原型期。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/10025

- **RFC: Language Realtime（Gemini Live）** (rel877, rfc#878O) ：由于 presenter "重写为 broker 契约" v2，可实现实时语音到口语的呼叫，模块及用户需求强烈。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/8780

- **RFC: Wire protocol first-class in provider construction (#8396)**：主张将协议 API 显式嵌入 provider，使未来开发再接入 provider，有专项权。链接： https://github.com/zeroclaw-labs/zeroclaw/issues/8396

- PR 体现阶段变化：特色 **evaluations（feat(eval) gate CI on regression suite）**（#9212） 或 **pan-memory（memory: 知识图 per-agent 属性，负责/#9745），实测已经提交大量 #PR，可能被纳入 0.9 版本。

## 6. 用户反馈摘要
- **[渠道能力不足]**：用户 提出对 Signal 渠道增加媒体支持的期望（#7891）；Telegram 渠道需要 `per_user_session` 设置以提高运营（#977 / 2 的 PR），体现出多渠道用户长期贡献者在对护闭环的实用性感知。
- **记忆归属与隐私**：在多 Agent 协作场景中，社区提出对知识图进行 Agent 级别的所有权标注（#974534），接受意见是新增属主（内存作用域），且防止代理数据出现跨 Agent无用读。部分 PR 已给出建议。
- **[技术**：有观点提出了 reduce 核心包、外移集成（#6615），表明部分维护者认为可通过删除内部集成来提升安全性，但仍未到决策文件；它是一个较长期干预建议，明显触动核心模式的**。

## 7. 待处理积压
- **RFC（有操作）需等待维护决策**：其中  #8603 (Chat 补全)、 #880（stable，**needs-maintainer-review**) 以及 #6971（安全）已有 14 家评论，还没有结束，需要注意关注判断优先级。#8692 属于决策的 tracker。
- **需作者操作**：依赖的重要 PR 接近阻塞：
  - #9002[PR] fix(gateway): keep agent turns alive (查看者断线): 待作者重指。
  - #912-6[PR] 涵盖 WASM 的验证配置：等待解决输入（needs-author-action）
- **已被接受的“naa”标记对应多个长期跟踪，但可触及后续**：可考虑更新。

提示：整个待办池中的 PR 有 46 个仍开放，但其中有 12 个标记为“needs-author--action”，表明贡献端可能遇到单向阻塞，好在大多数 PR 都尚处于积极阶段。维护者可将注意力集中在诸如接近合并且需要review的 PR （#9127）上。

---
*本日报为基于 GitHub 数据的自动统计信息产物，不代表 ZeroClaw 官方立场。*

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 开源项目动态日报

**日期：2026-08-17** | **数据窗口：2026-08-16 ~ 2026-08-17**


## 1. 今日速览

过去24小时PicoClaw项目活跃度中等偏上：3条Issue更新（全部处于活跃或新增状态），5条PR有动态（其中1条关闭），暂无新版本发布。值得关注的是，当前PR队列高度集中于通道层SSRF（服务端请求伪造）安全加固（#3222至#3324三条同源PR），显示出项目正在经历一次针对媒体下载链路的系统性安全巡检。Issue侧则出现了新报告的Slack媒体上传Bug（#33368），修复路径或可借鉴正在进行中的安全加固方案。整体而言，项目处于稳定迭代期的"安全加固+定向Bug修复"阶段，无重大版本跳跃的压力。


## 2. 版本发布

**无**

本期窗口内未发布新版本。安全加固代码仍在PR阶段，预计合并后进入下一个版本。

---

## 3. 项目进展

**今日关闭PR 1条**：

- **[PR #3193 - 新增Simplex通道支持（已关闭）](https://github.com/sipeed/picoclaw/issues/3193/32779)**：由@dim于2026-06-27发起，经历约两个月后关闭。虽未合并，但该PR预期添加了Simplex网络通道类型，表明了项目对扩展即时通讯平台整合的探索。

**PR队列安全加固动态：** 三条安全加固PR（#3322、#3323、#3324）已同步更新。它们共同指向一个核心问题：媒体下载/上传链路中的SSRF风险。三者分别针对：
- 各渠道inbound媒体下载通用防护（#3322）
- 微信（Weixin）媒体下载专用防护（#3324）
- 企业微信（WeCom）媒体下载专用防护（#3323）

共同方法是使用 `utils.CreateSafeHTTPClient` 并显式调用 `ValidateSafeHTTPURL` 与 `BlockPrivateTargets` 防护中间人攻击。这些改动若能合并，将显著提升项目在不可信网络环境中的安全性。

> **项目进展评估**：本窗口虽无新功能合并，但安全加固PR的持续活跃说明项目对外部可见攻击面的响应意识正在增强，属于重要的稳定性投资。

---

## 4. 社区热点

**今日讨论最活跃**的是 **[Issue #3338 - Slack媒体文件无法附加Bug](https://github.com/sipped/picoclaw/issues/3338)** 的提交者也希望参与讨论。

**最受关注的讨论主题其实是老Issue的持续讨论**：
- **[Issue #3302 - MCP服务器OAuth 2.1支持](https://github.com/siped/picoclaw/issues/3302)** — 由用户@sunboy0523在7月30日提交，虽已过数周，但在今天仍获得3条评论。这反映了MCP生态中对标准化认证方式的强烈需求，用户期望与OAuth 2.1的现有讨论（#2546）保持一致。

- **[Issue #3325 - Telegram表格富文本渲染](https://github.com/siped/picoclaw/issues/3325)** — 用户As-tsaqib提出了利用Telegram Bot API 10.1新特性的请求，虽然评论仅有1条，但指向了用户体验优化的需求。

**社区共鸣解读**：活跃讨论集中在"认证标准化"（OAuth 2.1）和"平台级视觉增强"（表格UI）上，展示了PicoClaw用户对生产环境集成质量的要求正在提高。

---

## 5. Bug 与稳定性

**最高严重级别：**

**[Issue #3338 - Slack媒体附加始终失败（严重）](https://github.com/sipic/picoclaw/issues/3338)**
- 作者：@octavioturra
- 摘要：`SendMedia` 构建的 `slack.UploadFileParameters` 未设置 `FileSize` 字段，导致slack-go SDK调用 `file.upload.v2: file size cannot be 0` 拒绝所有上传。
- 影响：所有使用Slack渠道发送图片/文件的用户不可用。
- 当前状态：**无相关修复PR**，待维护者修复。建议参考 `utils.DownloadFile` 的设计，在 `SendMedia` 侧也注意补充必要的参数校验或明确依赖文件头推断与手动指定。

> **优先级判断**：功能影响面广（通道级阻塞），但实现难度低。建议尽快圈定修复PR。

---

## 6. 功能请求与路线图信号

**高概率纳入下一版本**：
- **OAuth 2.1标准化支持**（[#3302](https://github.com/siped/picoclaw/issues/3302)）：MCP生态推广的重要前提，伴随全网MCP热度提升，此项建议会逐步纳入下一个API规范版本。

**中概率**：
- **Telegram表格富文本渲染**（[#3325](https://github.com/siped/picoclaw/issues/3325)）：依赖Telegram Bot API 10.1的底层能力，实现成本中等（需新格式化参数。

**偏低概率（但在持续积压）**：
- **Exa原生搜索提供商**（[PR #3299](https://github.com/sipric/picoclaw/pull/3299)）：v0.4.x规划中已有 `d/w/m/y` 范围过滤，但PR长期未合并，可能受限于 Exa 凭证方式或对依赖深度协议介绍。

---

## 7. 用户反馈摘要

- **痛点鲜明**：Slack用户的"直接完全失效"问题（#3338）为即时可用性硬需求，发布说明的班子。
- **行业趋势**：多位独立用户（sunboy0523、As-tsaqib）分别在中移动OAuth 2.1和Telegram表格功能，体现核心用户正在将PicoClaw使用深入群聊自动化和通过MCP规范化管控自动化工作流。
- **项目稳定性信号**：Bug反馈先行与中国社区#2546呼应，表明"安全强化版报告"已形成口碑。

---

## 8. 待处理积压（维护者注意）

**长期未响应（需关注）：**

1. **[PR #3299 - Exa原生网页搜索提供商](https://github.com/siped/picoclaw/pull/3299)**（创建：2026-07-26，空闲：22天）：
   - 功能性PR，等待Review/Merge。建议创始人重点评估Exa的性能表现与 `type:auto` 词法准确性。

2. **[Issue #3302 - OAuth 2.1支持](https://github.com/siped/picoclaw/issues/3302)**（创建：2026-07-30，已静置3周）：
   - 拥有3条评论，直指生态需求（MCP认证），但尚未进入路线图讨论。是否会在未来1-2个里程碑中纳入优先级？

3. **[PR #3193 - Simplx信道（已关闭）](https://github.com/siped/picoclaw/pull/3193)**：
   - 关闭原因虽未在列，但未明确说明是否拒绝。若因时间或技术难题搁置，建议后面移入Discussion区继续冷却。

---

> **结语**：PicoClaw 当前维持效率平稳，安全加固投入浪潮值足以支撑其生产环境成熟度，但在Slack阻塞性Bug和多个陈旧PR问题上需加速响应，防止社区信任度收到饱和影响。建议维护者按：Slack Bug（高优先级）→ SSRF加固（安全合入）→ OAuth 2.1规划 → Exa合并 的顺序调动投入。Dashboard整体健康状况：**B+（活跃攻击面投资，市场和Bug验证度较好）但需要快速机器人Bug。**

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-08-17

## 今日速览

过去 24 小时内，NanoClaw 以非常高的开发强度保持迭代：**32 条 PR 更新中，13 条已合并/关闭，19 条待合并**，其中 8 条由核心团队成员 @gavrielc 在一天内连续提交并完成合并，展现出团队在“跨会话上下文”、“消息投递一致性”等核心架构层面的集中攻坚。Issue 侧仅出现一条误报并已关闭，有效 Issue 为零，说明近期未收到显著的用户侧问题报告。无新版本发布。整体看，这是一个 **“内部开发高产、外部反馈平静”** 的健康日，核心系统正在快速建设中。

## 二、版本发布

**无。** 过去 24 小时无新 Release，最新版本仍是上一个官方发布。核心进展以 PR 形式存在于主分支当日合并中。


## 三、项目进展

今日共 13 条 PR 被合并或关闭（其中 9 号关闭），仅 @gavriel 一人的 6 条 PR 就连续推进了跨会话记忆、代理解耦、SKILL 跳数、未知发送者策略、渠道注册器、DMS/仓储前置钩组等 6 个核心主题。

| 领域 | PR | 说明 |
|---|---|---|
| **跨会话消息回音** | [#3257](https://github.com/nanocoai/nanoclaw/pull/3257) | 一套会话组级别跨会话上下文模块：将某一个会话的触发消息与本智能体的回复`扇出`为无`trigger=0`的上下文行，回填 DM 会话，并新增 `ncl sessions history` 命令。这属于“会话同记忆”最核心的基建。 |
| **会话组解散** | [#3256](https://github.com/nanocoai/nanoclaw/pull/3256) | 新增迁移 022：`messaging_groups.detached_at`。当机器人被移出平台会话时置为,不会删除行（保留 wires/sessions/destinations 的完整性），并在 delivery 上拒绝向已脱离的会话发送,制造了足够的行为预期。 |
| **出站投递寻址一致性** | [#3255](https://github.com/nanocoai/nanoclaw/pull/3255) | 修复多 Bot 共面容时的寻址歧义：`deliverMessage` 现在能确认发送者自己的 channel 行，而不是任意选一个同地址的实例。这修复了一个深层的静默丢消息可能。 |
| **批处理抢占修复** | [#3254](https://github.com/nanocoai/nanoclaw/pull/3254) | 核心修复：`getPendingMessages` 现在使用两阶段选择（先取 trigger 任务行，再填充 context 行），防止大堆未处理 context 把实际任务挤出封顶批次，避免本次“唤醒空转”。 |
| **信息流单一内容门** | [#3284](https://github.com/nanocoai/nanoclaw/pull/3284) | 升华“provider 声明 `emitsMidTurnText` 时，mid-turn 流式输出的 `<message>` 是唯一内容走向，最终结果不再内容-不再内容”。消除重复发送与持久化去重状态。 |

**其他关键合并：**

- [#3262](https://github.com/nanocoai/nanoclaw/pull/3262) Chat SDK bridge 完成：捕获 app_context、DM 线程规范化、dm-opened 事件（里程碑 A8+C4）。
- [3263](https://github.com/nanocoai/nanoclaw/pull/3263) 新增 `startChannelAdapter(key)` 运行时热启动某个适配器，无需重启进程。
- [3264](https://github.com/nanocoai/nanoclaw/pull/3264) `registerDeliveryBatchPreview` 允许模块在整块悬而未决的批次被逐条发送前预取上下文。
- [3260](https://github.com/nanocoai/nanoclaw/pull/3260) 新的 `decline_notify` unknown-sender 策略——拒绝但让使用者只发一句说明给 owner，且不再弹审批卡。
- [#3259](https://github.com/nanocoai/nanoclaw/pull/3259) 修正 SKILL.md 步骤序号（不再把作者写的 “2.” 缩进当内容）、headless 浏览器暴露 URL、继承脚本提取。
- [#3283](https://github.com/nanocoai/nanoclaw/pull/3283) 保留 Chat SDK 结构化链接目标（附隐藏去重 URL），显示文本短缩写但不丢失链接。
- [#3278](https://github.com/nanocoai/nanoclaw/pull/3278) 新增 `save_document` MCP 工具，将 Word/PDF 附件持久化到 agent 组内存（Story 1.1）。
- [#1251](https://github.com/nanocoai/nanoclaw/pull/1251) 合并：`/add-openmail` 技能，让 Nanoclaw 获得邮件收发能力（3 个月老 PR 终收获推进）。

综合看，这一天的合并主力集中在**会话生命周期、投递一致性、持久化钩子**三块核心引擎，整体向前推了一大步。


## 四、社区热点

今日社区侧几乎完全被核心团队的内容覆盖。**公开的用户提交 PR（3 条)是社区主动性最高的输入：**

1. **[#2752](https://github.com/nanocoai/nanoclaw/pull/2752)（用户 @chubbicorn245，原创、修复）**将 Discord 粘贴的文本/图片附件从 `[file: message.txt]` 占位变成可读内容灌给 agent。数据显示仍有 619 条评论，是社群参与度最高的 PR。
2. **[#1251](https://github.com/nanocoai/nanoclaw/pull/1251)（用户 @armandokun，原创技能）** 邮件渠道 `/add-openmail`，在 3 月立项后今天被合并——说明社区供能上了主航道。
3. **[#3251](https://github.com/nanocoai/nanoclaw/pull/3251?)(CLOSED)** 非核心团队 PR/#3233 的 try-catch 修复（agent 作用域任务可看到 2.1.54 遗留会话），仍然留在 OPEN 区等待审核——它关闭的是用户报的 #3233，但 PR 本身还在等待 `core-team` 回应。

今日仅有的 Issue #327 还是误报，社区反馈方向也就这些。


## 五、Bug 与稳定性

按严重程度排列：

| 严重级别 | 问题 | 状态 |
|---|---|---|
| **最高** | **privileged 批次被 context 拥挤**：当积累多个 trigger=0 的回声上下文足够新，会 pushed due task 出本轮封顶批次，出现不停唤醒但任务一直不做（#3284 修复）。 | 已修复并合并（[#3254](https://github.com/nanocoai/nanoclaw/pull/3254)，[#3284](https://github.com/nanocoai/nanoclaw/pull/3284)） |
| **高** | **多适配器实例寻址歧义**：多个可选同一 state 的实例时，`deliverMessage` 可能把消息发给**任意**一个实例（而不是正确的 sender 行），有静默串线风险。 | 已修复（[#3255](https://github.com/nanocoai/nanoclaw/pull/3255)） |
| **中** | `ncl groups config update --model ""` 不会清空值，而是存成空串，运行时当作真实值。 | Fix 已提交（[#3280](https://github.com/nanocoai/nanoclaw/pull/3280)） |
| **中** | Agent 作用域 `ncl tasks` 找不到 pre-2.1.54 遗留 session（thread_id 缺失） | Fix PR 已提交（[#3281](https://github.com/nanocoai/nanoclaw/pull/3281)） |
| **低** | **Telegram 配对码带空格会解析失败** | Fix PR 提交（[#3282](https://github.com/nanocoai/nanoclaw/pull/3282)） |
| **低**（长期积压） | Discord 图片上传被下载为字节，但字节丢弃，只留对象描述 | 修复 PR #2752 已发酵 2 个月，仍开着 |


## 六、功能请求与路线图信号

今日 PR 的绝大多数都是核心团队直接实现的，在隐含地将以下**新能力**定为目标范畴：

1. **跨会话上下文（号码为 #3257）** — 将“同组、并发、多会话”变成一种第一等公民机制。这正是群组智能体雏形，表明下一步可能会把**多个会话之间的“回声机制”**升级为显式功能（比如**跨会话记忆共享**）。
2. **结构化附件 / 文档内存（#3278 及 #2751）** — 文档进入 agent 持久记忆，并在 Discord 上不丢内容，配合已有磁盘存储，明显是文档记忆完整史诗的开端（今日提交 Story 1.1，后续 Story 还有自动摘要、内容抽取等）。
3. **`decline_notify` 策略（#3260）** 引出新方向：默认对未知发送者做“礼貌拒绝 而 不骚扰管理员”，这说明这一代后面会往**精细化权限编排**上走，甚至提供更多匿名策略。
4. **邮件渠道 (#1251)** 打开新起点：OpenMail 集成成功，很可能会带动一批基于邮箱的自动化技能，或者说“把邮箱放进渠道选项”是下一步路线图信号。

以上这些信号都在 8 月中旬已披露的 `spec-document-memory` 与 `architecture-nanoclaw-v2` 两个内部 spec 中，今日的新功能基本都属于这些框架下一期规划的内容。


## 七、用户反馈摘要

今日几乎无用户 Issue 反馈码（碰到唯一一条还是误报）。有效信号集中在 PR 评论与提交动机里：

- **Discord 附件来源**（#2752）：用户环境里 agent 收到的 Discord 粘贴文本和图片从来就**不带字节和路径**，agent 只能看到一根引用但并不存在的内容——“agent 看不到文件内容”实为刚需级痛点，且已决定修复。
- **Telegram 空格输入错误**（#3282）：用户习惯将 Telegram 官方给出的套餐码原样粘贴（含空格），这段体验被多处错误警告影响——属于低概率但不高频的可用性细节，社区有人细致地提出来了。
- **未知 DM 管理员策略争论**（#3260）：`decline_notify` 的取舍点在于拒绝的同时发出一行主通知——用户期望“既保证私密又不让 owner 被刷屏”。这个模式继续获得关注，之后大概率可以更丰富。
- **旧版本回移**（#3281 对应 issue：#3233）：用户指出 2.1.54 前构造的 legacy session 在 agent 域的 `ncl tasks` 下完全消失。修复 PR 指出原因在 SQL 过滤条件，等待 reviewer。

整体：用户侧反馈温和，功能诉求指向“文件可读、历史可用、复制粘贴可用”这样三个最朴素的地方。


## 八、待处理积压

以下 PR 已存在较长时间或未获直接回应，值得维护者安排：

| 项目 | 类型 | 关键时长 | 备注 |
|---|---|---|---|
| [#2752](https://github.com/nanocoai/nanoclaw/pull/2752) — Discord 附件内容暂存 | 用户 PR | 由 6 月 12 日创建，等待 2 个月 0 comment 变动 | **核心体验修复**，涉及 agent 读取文件的基础能力。建议合并前补充测试。 |
| [#3281](https://github.com/nanocoai/nanoclaw/pull/3281) — 老版本会话任务可见性 | 用户 PR | 创建于昨晚（8-16），关 issue #3233 | 修复的是一个回归漏洞，不复杂，只是 pending auto。 |
| [#3280](https://github.com/nanocoai/nanoclaw/pull/3280) — `groups config update` 清空 NULL | 用户 PR | 创建于昨晚 | 简单 scalar 修改，价值明确。 |
| [#3282](https://github.com/nanocoai/nanoclaw/pull/3282) — Telegram 配对码空格兼容 | 用户 PR | 昨晚 | 减一个可见的易错点。 |

> 从“待合并 19 PR”这一数字看，合并节奏比当天开发速度要慢一些，加上社区用户 PR 普遍等了较久，建议核心团队安排一轮专门给外部贡献的 review 会话。
> 
> 一个需要留意的事：今日关闭的 PR（含被 close 的 6 条）都集中在核心团队分支，社区 PR 仍集中在待办一侧，没有闭环流程后，社区贡献的体验与参与感值得关注。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-08-17

## 今日速览

过去24小时，IronClaw 项目活跃度处于**中等偏上水平**：共有 1 条新 Issue 和 9 条 PR 更新，核心事件集中在 **Slack 未关联用户连接体验的隐私性改进**（#7681 提出了问题，同作者随即提交了修复 PR #7682）。依赖更新（dependabot 批次）占据主导，但其中一条已合并关闭。另有 2 条涉及核心代码库维护的 PR（#7683 合入、#7680 待审）推进了配置清理和代码知识图谱的刷新。截至目前为止无新版本发布。整体来看，项目在 **渠道 UX、代码卫生、CI/依赖维护** 三个维度保持正常迭代节奏。

## 项目进展

今日有 2 条 PR 合并/关闭，体量不大但对代码库健康度有实际贡献：

- **#7683 [CLOSED]** `chore: remove retired IronLoop network settings` by @hanakannzashi — 移除了已退役的 IronLoop 仓库配置中的 `network_access` 字段，保留现有的 Implement、Tester、自动 Review 和 Resolve 行为。清理了历史遗留配置，降低维护认知负担。 [查看 PR](https://github.com/nearai/ironclaw/pull/7683)

- **#7632 [CLOSED]** `chore(deps): bump the everything-else group across 1 directory with 4 updates`（dependabot）— 合入 `base64`、`toml`、`rstest`、`jsonschema` 四个 Rust 依赖的版本升级，保持在生态最新版本上的运行状态。 [查看 PR](https://github.com/nearai/ironclaw/pull/7632)

此外，核心贡献者 @sergeiest 在今夜提交了一个**关键 UX 修复**（#7682，目前处于 open 状态），该 PR 直接关联并尝试同时解决今日新开的 Issue #7681，引入“私人回复 + 一键连接链接”的指引方式。如果合入，将有效改进 Slack 非关联新用户的首撞体验。 [查看 PR](https://github.com/nearai/ironclaw/pull/7682)

## 社区热点

**#7681 — Slack: unlinked-user connect message is public and requires a manual round trip** (作者: @sergierest) — 是新开未关联用户反馈最多的问题：**非关联用户在共享频道中 @ 机器人时，引导消息对所有人可见**，且流程断点需要人工一轮来回。用户需要在 Ironclaw Web 应用之外多个步骤连接自己的身份，再到 Slack 重试，这会让很多潜在新在用 one-off 探索的情况下流失。该 issue 在创建后几乎立即有了对应的修复 PR（#7682），体现了维护者对社区反馈的响应速度。 [查看 Issue](https://github.com/nearai/ironclaw/issues/7681)

围绕它的 PR **#7682** 也值得特别关注 — 它除了将连接指引改为**私信（epcomm.yaml）**，还提供了一键连接链接、并携带用户在发出消息的位置之后的上下文回到 Web 端。这是打磨 Slack 多用户体验的一个典型改善。 [查看 PR](https://github.com/nearai/ironclaw/pull/7682)

## Bug 与稳定性

今无新增 Bug 或回归类 Issue 报告。依赖更新中，`toml` 从 `0.9.12+spec-1.1.0` 跳到 `1.1.4+spec-1.1.0`，`wit-component` 从 `0.254.0` 升到 `0.256.0`，`tokio-tungstenite` 从 `0.29.0` 升到 `0.29.0`（在待合并 PR 队列中但尚无并发风险反馈）。虽有多个依赖 PR 的合并存在 1-2 天延迟，但均已处于 dependabot 的自动节奏中，不视为稳定性风险。

## 功能请求与路线图信号

今日最明确的功能方向由 #7681 和 #7682 共同指向：

- **Slack 连接引导的私密性与一键化** — 如果 #7682 被合入，将成为**新用户体验关键流程**的实质增量，很可能随下一个版本（2.x 前后）发布。这是相对可见、合理可落地的下一步。
- **#7651** `feat(automations): add deterministic no-result suppression`（open，size: XL）— 为自动化任务增加**确定性“无结果抑制”**机制：只有用户在措辞中明确表达 only-notify-on-match/change/result 时才启用抑制，否则默认 `deliver` 结果。这为重度使用自动化的团队提高了可预期性，增强规则语义的确定性。整体属于自动化功能强度和确定性的扩充，值得在版本规划中考虑。

## 用户反馈摘要

`#7681` 的原始反馈是典型的真实用户痛点：

1. **公共渠道的信息泄露担忧** — “回复对频道内所有人可见”；用户以及企业管理员都不希望机器人内部账户建立过程对频道公开。
2. **流程断裂** — “at me again here” 的引导，需要用户回到 Web 端完成后再次回到 Slack 重发，造成对服务能力的平台转移成本。
3. **当前流程的阻塞感** — 缺乏直接跳转与上下文携带，使得一次性用户直接离开，无法有效回收。

该 issue 及时获得了修复 PR，说明核心库近期对 Slack/on-chain UX 较为关注，后续可以在 route 向 onboard / first-run 拨更多的体验反馈的资源。

## 待处理积压

- **#7406** — `chore(deps): bump the actions group...` (dependabot，`anthropics/claude-code-action`、`setup-node`、`rust-cache`、`docker/login-action` 四项目) — 自 2026-08-09 起一直未处理。鉴于影响 CI 的安全与兼容性，建议尽早在下一个 CI 维护窗口期合入。如果 CI 流程在基于依赖版本上有软性要求，请留意。 [查看 PR](https://github.com/nearai/ironclaw/pull/7406)
- **#7020** — `tokio-tungstenite 0.29.0 → 0.30.0`，创建于 2026-08-02，已 pending **15 天**。类别低风险，但因涉及 WebSocket 生态（Rust 聊天/后台通信常被用），长时间不更新可能导致后续升级冲突。 [查看 PR](https://github.com/nearai/ironclaw/pull/7020)
- **#7262** — `wasm 组（wit-component、wit-parser）并发更新，同样待处理 12 天。若项目中 WASM 组件是主用法栈的，这条长时间的堆积值得本期清理。 [查看 PR](https://github.com/nearai/ironclaw/pull/7262)

---

**整体健康度评价**：今日项目活跃良好，核心动态围绕一个明确的用户依赖，供给端在 CI 和大仓库内有多条依赖积压未处理——建议维护者对已 stale 的依赖 PR 做一次统一盘点，这正是降低总体测试维护成本、防止后续冲突的最低成本机会。核心配套跟进（Issue→PR）快速，展现出了较健康的响应张度。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI (有道龙虾) 项目动态日报 — 2026-08-17

> 数据截至 2026-08-17 00:00 UTC，涵盖过去 24 小时 GitHub 活动。

---

## 1. 今日速览

今日项目整体活跃度**中等偏低**。虽然过去 24 小时聚合到 10 条 Issue 和 17 条 PR 动态，但经数据核查发现，**绝大多数条目均带有 `[stale]` 标记**——原始创建时间在 2026 年 4 月，近期仅被自动机器人触碰（如标记 stale 或自动关闭），并非新增的活跃讨论。真正值得注意的实质性动态集中在两端：一是 #2452 这个 8 月 7 日新开的 PR 仍在待合排队，针对 DeepSeek 模型 ID 含 `/` 的 bug 修复方案已成型；二是 3 个由 @kayo5994 贡献的网络安全加固 PR（#1831、#1832、#1833）以合并状态推进，这表明项目近期在安全治理层面有明显投入。社区讨论的整体热度处于低位，多数 user 反馈仍是 4 月遗留问题，**项目正处于下一轮功能迭代发布前夜，但外部诉求响应速度略显迟缓**。


## 2. 版本发布

过去 24 小时无新版本 Release 发布。但值得关注的是，在 4 月份批量合并了大量功能 PR 后（见下）却始终未促成新版本发布，当前 `main` 分支与用户已安装版本之间的功能差数较大，对依赖新版修复的 Windows 用户尤其不友好。

---

## 3. 项目进展

今日合并/关闭的 9 条 PR 已核查。**下述几条在代码逻辑上已具备合入条件， `GitHub` 状态显示 `[CLOSED]` 很大概率对应**合并**，项目功能与安全由此获得显著推进：

**安全大踏步前进（重中之重）**
- **[#1832] fix(security): 限制 store:* IPC 越权访问 + 收窄通用 ipcRenderer 桥**（@kayo5994，4月27日创建）——该 PR 此前已合入，修复 `store:get/set/remove` 通道无任何 key 级访问控制，堵住了渲染进程通过 XSS 或模型输出读取 `auth_tokens` 与 `github_copilot_github_token` 明文及覆盖 token 的安全漏洞。结合 #1831、#1833 合看，主进程存储与 Shell 打开外部 URL 两条安全攻击面已大幅收窄。
- **[#1831 🔒] fix(security) 脱敏主进程与 IM 模块的敏感日志**（@kayo5994）——移除 `api:fetch` 完整 URL、Bearer token、SSE 内容及一次性 authCode 的落盘打记录，减少凭据泄漏场景。
- **[#1833] fix(security) shell.openExternal 增加 scheme 白名单** —— 拒绝 `file:` / `javascript:` / `data:` 等危险 scheme，阻断模型输出恶意 markdown 引导探测本地文件或执行系统动作的路径。

**功能功能改进**
- **[#1760] feat(agent) 支持图片头像（emoji 头像保留可切）**（@leedalei）——自定义 Agent 不再局限于 Emoji，支持上传图片做头像，增强多 Agent 场景下的辨识度与个性化。
- **[#1690] fix(settings) IM 实例删除增加二次确认** —— 钉钉/飞书/QQ 平台删除实例需弹窗确认，避免误删配置成本高的重配置难题。
- **[#1691] feat(agent) Agent 模板导入/导出** —— 支持 `.agent.json` 文件导出、本地文件/远程 URL 导入，允许跨设备/跨用户自由共享 Agent 配置。
- **[#1693] feat(cowork) 无模型时一键跳转设置页 + 修复发送时草稿丢失** —— 优化新用户引导路径并修复输入内容清空 bug。
- **[#1715] fix(cowork) OpenClaw 服务端代理请求缺失 session_id** —— 补齐并发场景下的会话识别。

**稳定性与体验**
- **[#1835] fix(cowork) 去除 continueSession 失败时重复推送的错误消息**——修复错误恢复场景下两条连续的系统错误消息干扰对话流的问题。

> **产品能力落地**：将以上改动合并观察，LobsterAI 在以下三个方向确认迈出实质性步伐：(1) 数据安全与隐私保护达到基础基线；(2) Agent 的配置分享与个性化能力扩了一个维度；(3) IM 集成稳定性增强。

---

## 4. 社区热点

今日社区热点进展存在明显分化，整体讨论热度普遍偏低（评论最多的Issue仅 8 条）。

- **[#1813] DeepSeek V4 无法使用：LLM request failed**（@Sun-Ke，8 条评论，CLOSED）
  今日被 Stale 机器人标记后关闭，但这是用户反馈最集中且诉求明确的Issue。诉求核心：DeepSeek V4（**含** slash 的模型 ID `deepseek-ai/DeepSeek-V4-Flash`）接入后，服务端报 provider rejected the request schema or tool payload。**注意：PR #2452 恰为**解决此问题而创建，方案为在存储会话时保留 provider 前缀；(链接待合并见 §9)。
- **[#1698] 有道龙虾启动状态下安装智企帝王蟹必然出现 gateway 端口冲突和进程竞争**（3 条评论）——涉及同机构产品间共存问题的具体场景，无 fix 迹象。用户对「必现」问题久未解决有明确不满。
- **[#1744] Bug report（技术联系函）上传失败 + [#1796] Write/Edit 工具执行总失败**（各 3 条评论）——长期存在的功能性 bug，均未见 PR 提及。

> **社区基调**：用户已提出**起的实际诉求分析**，但从 4 月至今仍处于被自动 stale 的状态，暴露的是维护者目前响应非安全类问题较慢的现状。

---

## 5. 今日值得关注 Bug 与稳定性

按用户的严重程度丢失，今日无新增高强度直撞 Bug，当前累积高频问题：

| 严重度 | 问题描述 | 状态 | 修复进展 |
|--------|----------|------|----------|
| 高 | **Write/Edit 工具持续执行失败**（#1796） | `[stale]` 关闭 | 无 |
| 高 | **DeepSeek V4（含 slash 模型 ID）无法调用**（#1813） | 关闭 | **未合并**，但 PR #2452 已推送修复方案：将 provider 前缀与 model ID 分开存储、渲染层拼接时恢复 |
| 中 | **Windows 11 安装后图标白色且无效**（#1714） | `[stale]` | 无 |
| 中 | 更新过后 diff 显示失灵（#1783），含 root cause 分析：`extractDiffFromToolInput` 函数仅从 toolInput 顶层查找 old/new，未深度取值 | `[stale]` | 无 |

---

## 6. 功能请求与路线图信号

- **对话删除/批量管理**（#1797，1 👍）—— 建议增加批量删除无效对话，防止上下文溢出。已有基础的会话管理职能，当前本身无新建改造风险，但「删除」已双终结）在今天被打上 stale 闭了关，**提示和维护者获取该用户明确诉求并考虑在下一迭代中实现**。
- **模型温度（temperature）动态调整**（#1688）—— 用户在对话中动态调整 temperature 参数，当前无支持。官方未回消息。
- **Outlook 邮箱 OAuth2 支持**（#1745）—— 用户无法用应用密码连接新式验证的 Outlook，请求集成。由于优先邮箱协议属于低提升场景，大概率影子排期。
- **明确将进入核心版本的信号**：
  - 基于 **#2452 的修复在认证系统中已保存了 provider 前缀**，且渲染层将可正确解析含 `/` 的模型 ID——预示 **DeepSeek-V4 调用、与其他带有 `org/` 风格 model id 服务**的兼容将成为通用能力。
  - Agent 镜像(头像)导入导出能力已在 PR #1691 与 #1760 中合入，**多设备 Agent 配置共享**将是近期版本演进的小方向。

---

## 7. 用户反馈摘要

- **对重复的错误消息明显有抱怨**：#94 上线 -> 开头出现两条连续的系统错误（#1835 已修复）。
- **企业协同产品共存冲突**：#1698 描述了一定存在的 `gateway 端口冲突必现` 带来的部署阻塞，体验缺失。
- **上手引导不足**：#1693 合并数据暗示新用户容易不配模型时找不到设置入口，且发送丢失内容。
- **对 diff 体验很敏感**：#1783 用户深入分析了 extractDiffFromToolInput 的缺陷，说明 diff 视图是核心调试场景，用户专业度高。
- **远端技能导入 conf**：（已提交 #94，感谢报告）验证体验有阻点，用户自主尝试下载流程才最终遇到错误。
- **账号验证流程安全**：昨日合入的 auth 日志脱敏及 openExternal 白名单已 validate 这方面的隐患已被团队认识到，对安全敏感的用户是积极信号。

---

## 8. 待处理积压（长达数月未动的 stale 项提醒）

> 所有以下条目均已 120 多天没有任何实质互动，均有 `[stale]` 标记。

1. **[#1688] 调用大模型如何动态调整 temperature**（2026-04-15 创建，仅1评论） — 值得评估将「对话内参数控制」纳入 Agent 配置层的可能性。
2. **[#1698] 与智企共存的端口冲突必现**（2026-04-15，3评论）—— 影响企业内部协同套装的落地，建议产品经理跟钉钉团队确认。
3. **[#1714] Win11 安装后图标空白且无效**（2026-04-17，2评论）—— 安装在 Win11 beta 用户群中影响面较大。
4. **[#1745] Outlook 邮箱不支持 OAuth2**（2026-04-19，2评论）—— 当前主流邮箱安全策略下无法连接，是「不可用」级问题。
5. **[#1783] 更新过后 diff 异常**（2026-04-21，2评论）—— 该用户已给出代码级 root cause，**建议维护者优先回复**。
6. 老牌 PR **[#1682] Cowork AI 回复添加朗读**（等待合并4个月），**[#1683] 远程导入 URL 预校验**（4个月），**[#1707] 切换 Agent 自动清空输入框**（4个月）—— 三类 UI 增强已准备好，只剩合并动作，建议统一安排评审。
7. **[#1765] @headlessui/react 重大升级（1.7 → 2.x）** —— 依赖升级 PR 挂起 4 个月，若不处理则项目升级成本随 version drift 升高。

> **维护者提醒** ：当前项目健康度处于"安全修复主动、功能迭代积压"的不平衡状态。大量 4 月的功能 PR 已积压 4 个月未合并，同一批 stale bot 自动关闭的 issue 会让用户产生项目已死掉的印象。推荐尽快推进一次版本发布（包含 #1831-1833 安全修复、#1691 导出、#1760 头像、#1682 朗读）以信息压缩止损并回应当前活跃社区，再同步启动 backlog 清理。

---
*本日报由 AI 自动生成，数据直接抓取自 GitHub API，部分存储渲染的 PR 状态需二次确认。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-08-17

## 1. 今日速览

昨日 Moltis 仓库经历了 **“高吞吐、集中交付”** 的一天：共 11 条 PR 完成合流，其中 10 条已合并/关闭，仅 1 条新功能 PR 等待评审。**核心亮点有三：** 一是修复了 `main` 分支上的一个编译阻断问题（将后台任务线程传递至内存运行时构建器），恢复了流水线健康；二是两个长时间悬而未决的安全加固 PR（Zip/模型路径穿越防护、节点配对签名校验）正式合流；三是新引入的 zvec 向量数据库内存后端登陆主分支，为 Memory 子系统开辟了新存储路径。Bug 层面，昨日报告的 Flaky Test 已通过暂停时钟的方式拿到确定性修复。社区与贡献者互动频率较快，项目处于高速演进期。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

过去 24 小时是项目主干的一次大整合，重要 PR 合并推进了多个模块：

- **修复 `main` 分支编译错误** — [[#1201]](https://github.com/moltis-org/moltis/pull/1201): 因重构 `#1158` 提取了运行时初始化函数，导致 `moltis-gateway` 在 `main` 上无法编译。该 PR 重新线程化 `start_background_tasks` 指令到内存运行时功能构建器中，恢复了全工作区流水线。这是当日最关键的基础设施修复。
- **新存储后端正式登陆** — [[#1158]](https://github.com/moltis-org/moltis/pull/1158): 合并 `zvec` 向量数据库内存后端。以 rust 原生实现、特征门控（默认完整模式启用），支持基于 `redb` 的持久化。此 PR 同时引入了文件长度过大检查的 CI 异常（见后述 Issue）。
- **两项安全验收通过** — [[#1180]](https://github.com/moltis-org/moltis/pull/1180) 加固了对恶意 Zip 与 HuggingFace 模型仓库的路径校验，防止任意文件写覆盖至配置/凭据目录，消除远程代码执行风险；[[#1179]](https://github.com/moltis-org/moltis/pull/1179) 则绑定 `moltis-gateway` 节点配对请求，将签名校验与服务器下发的挑战绑定，防止调用方自行指定 Key。安全面较此前显著收窄。
- **平台修复与去除历史债务** — [[#1147]](https://github.com/moltis-org/moltis/pull/1147) 修复 CalDAV 的日历查询时间范围不当（RFC 4791）；[[#1093]](https://github.com/moltis-org/moltis/pull/1093) 落地 channel 活动日志可见性设置（`all` / `errors_only` / `off`）。此外，[[#1191]](https://github.com/moltis-org/moltis/pull/1191) 将废弃的 `steipete/gogcli` 模块路径指向新 `openclaw` 组织，修复 `sandbox build` 的长期堵塞。

## 4. 社区热点

- **#1204 扩展外部 ACP 代理列表**：[PR #1204](https://github.com/moltis-org/moltis/pull/1204)（唯一待合并）申请加入 MiniMax Code ACP Agent 借助 `mcode acp`。该 PR 涉及自动可执行检测、Agent 注册、文档与 TOML 配置一致性，表明社区对第三方/国内模型接入的需求持续走高，是当前持续向合并进项的活跃讨论点。
- 其余 PR/Issue 均无评论，社区讨论热度并未集中在某一事件上，呈现“开发者驱动 + 高效率合并”的特征。

## 5. Bug 与稳定性

- **[严重] gateway 无法编译（已修复）** — 存在 `main` 分支缺 `start_background_tasks` 作用域查找而无法编译（Issue 在 #1201 中直接说明），本地已合并该修复。
- **[中等] Heartbeat 不按活跃时段运行** — Issue #1205：心跳忽略配置的活跃时间段功能，持续运行。此可能影响节电与资源控制。**尚无 Fix PR**，需关注。
- **[低热] Flaky 测试：push fanout 超时竞态** — Issue #1193（关闭）：在完整工作区压力下偶发超时断言失败。已通过 #1203 修复（使用 pause clock 将测试时钟停摆，取消时序竞态）。
- **[低] 沙箱构建因 URL 变更失败** — Issue #1189（关闭）：gogcli 仓库迁移后未同步，已经 #1191 修复。
- **[低] 格式门槛造假** — Issue #1202（打开）：CI 的 Format 作业被 1500 行文件限制卡红：`memory-zvec/src/store.rs` 和 `admin.rs` 超行数。**该 Issue 仍未关联 PR**，保持红色流水线对仓库门禁略有惩罚。

## 6. 功能请求与路线图信号

- **zvec 内存后端（已合入）** 表明向量数据库多后端战略（ME、Backblaze 等）进入实质性阶段。配合 `llama-cpp` 服务独立运行，已在进阶用户内产生使用先例，它有可能成为默认开箱配置之外的首选。
- **MiniMax Code 代理支持**：由 #1204 带动的第三方外部 Agent 接入，虽未合并，但解锁后，Moltis 将扩展至非 OpenAI 兼容的模型接入边界，这个信号明确指向“多供应商、多前端”的中性开放地位。
- **活动日志 visibility 控制**（已合入 #1093）是一个企业级信号：方向是可配置的用户隐私与上下文可见性，预计将进一步提高团队协作可控性。

## 7. 用户反馈摘要

- 对 `moltis sandbox build` 报错（#1189）：反馈者详细描述了 “ Ubuntu prebuilt image 中 go install 默认路径指向 `steipete/gogcli` 而模块已迁移”，开发者在 48 小时内便给出 Patch，路径修复体验积极。
- #1180 安全修复的提交者采用 “我用了 Moltis，但想先把它弄到 Secure 再上生产” 的表述，并无强烈抱怨，而是主动贡献，反映用户进入偏好的模式：愿意先加固基础，再开始日常使用，体验上无大额反冲。
- 绝大数 issues 无评论，用户侧整体满意且偏顺滑，没有明显对功能的抱怨声音。

## 8. 待处理积压

- **格式门禁破损需关注**：[Issue #1202](https://github.com/moltis-org/moltis/issues/1202) 处于打开且无关联 PR 状态，而指向的行数限制由 #1158 引入时即产生。建议尽快将超限文件拆分组处理或调整阈值，避免 CI 常红影响贡献者信心。
- **Issue #1205 心跳减振需求**：[Issue #1205](https://github.com/moltis-org/moltis/issues/1205) 无评论也无人认领，对于需要能耗有效处理的 IoT 或边缘端用户（若目标是该场景）仍是隐形摩擦，建议在下一轮 Minor 迭代纳入 planning。
- 截至目前，仓库的 Bug 修复通常一天内即会出现相关联 PR，整体响应率高，总体无长期重度积压。剩下的待办成长为主动 feature 合理性评估。


> 📊 整体评估：项目处于正常冲刺阶段，提交频率高、修复响应快，但伴随活跃重构，类似 #1201（编译受影响）的事件需紧防。安全面推进值得关注。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-08-17

> **数据来源说明**：本报告基于 [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) 仓库（即 CoPaw 社区主仓库）92 条公开动态生成，统计窗口为 2026-08-16 至 2026-08-17 08:00 UTC。

---

## 1. 今日速览

项目今日处于 **高活跃度、零合并** 状态：过去 24 小时新增/更新 9 个 Issue（其中 3 个被关闭，包括 2 个已确认的 bug），同时新增/更新 9 个 PR（全部处于 Open 状态，无任何合并或关闭）。值得关注的是，今日提交的 8 个 PR 中有 7 个来自 `first-time-contributor`，表明社区参与度显著提升，但 `review 队列积压`（部分 PR 已等审 6 天以上）正在成为交付瓶颈。未发布任何新版本。

| 关键指标 | 数值 | 趋势 |
|---|---|---|
| 新开/活跃 Issues | 6 | 中等 |
| 关闭 Issues | 3 | 修复率尚可 |
| 待合并 PR | 9 | 全部积压 |
| 已合并 PR | 0 | ⚠️ 无产出 |
| 新版本 | 0 | — |

---

## 2. 版本发布

**无**（本窗口无新 Release，此前最新版本稳定在 `v2.1.0`）。

---

## 3. 项目进展

**核心结论：今日无任何 PR 被合并或关闭，所有功能推进处于“代码就绪、等待评审”阶段。**

在过去 24 小时前提交的 PR 队列中得到最新更新，其中几项值得特别关注：

- [[#6302] feat: unify provider discovery, model metadata, routing, and agent controls](https://github.com/agentscope-ai/CoPaw/pull/6302)（7 月 21 日创建，仍在 Open）— 这是迄今最庞大的一项重构，统一了 Provider 发现机制、模型元数据、路由能力及 agent 模型控制逻辑。若合并，将极大简化多模型配置。目前无正式 reviews，存在审核风险。
- [[#6940] feat(pawapp): add native DataPaw app runtime and durable analysis workspace](https://github.com/agentscope-ai/QwenPaw/pull/6940)（8 月 12 日创建，已被标记 `ready-for-human-review`）：初步构建一个可持续分析工作区的原生应用运行时（PawApp）。该 PR 关联配套 infra repo，覆盖面广。
- [[#7072] feature(console): add background chat task list API](https://github.com/agentscope-ai/QwenPaw/pull/7072)：实现 [#7056](环境) 的最小部分（任务状态**列表** API），同时推进调试多 agent 协调场景。

> ⚠️ 由于没有任何 PR 合并，上述功能并未进入主分支。项目实际前进步伐受限于维护者评审效率。

---

## 4. 社区热点

今日讨论最激烈的话题集中在**异步函数崩溃**和**上下文记忆优化**。

| 热度排序 | 标题 | 评论数 | 类型 | 核心诉求 |
|---|---|---|---|---|
| 1 | [[BUG] Agent 执行工具调用时必现崩溃](https://github.com/agentscope-ai/QwenPaw/issues/7063) | 3 | Bug（已关闭） | 代码中误将 `coroutine` 传递给 `async for`，导致 `TypeError` 快速崩溃 |
| 2 | [Memory for QwenPaw agents — 97.5% fewer tokens (ViBo)](https://github.com/agentscope-ai/QwenPaw/issues/7003) | 3 | Proposal（已关闭，讨论未完结） | 用户痛点：无记忆 + 全量上下文成本高，寻求记忆压缩方案 |
| 3 | [[7052] 插件 API 增加 system prompt 权限](https://github.com/agentscope-ai/QwenPaw/issues/7052) | 2 | Feature | 企业用户希望在插件会话自定义 system prompt 且对最终用户隐藏 |

**分析**：
- `#7063` 的关闭非常迅速（创建同日即被修复 PR 修复），说明需要核心维护者正在响应关键稳定性问题。
- `#7003` 获得了颇有深度的讨论，项目已有相当规模（33k+ stars），用户对真实使用成本（token 费用）越来越敏感，这是记忆架构演进的重要需求信号。

---

## 5. Bug 与稳定性

今日新增 5 个 Bug 类 Issue（其中 3 个有对应修复 PR），按严重程度排列：

| 严重级别 | Issue | 概述 | 关联修复 PR | 状态 |
|---|---|---|---|---|
| 🔴 致命 | [#7063 工具调用必现崩溃](https://github.com/agentscope-ai/QwenPaw/issues/7063) | `_execute_tool_call` 错误使用 `async for` 遍历 coroutine，稳定 `TypeError` | PR 已在同天被修复（issue 已关闭） | 需回归测试 |
| 🟠 高 | [#6471 Cron 任务在事件循环后 misfire](https://github.com/agentscope-ai/QwenPaw/issues/6471) | APScheduler 在空转后不触发，长时间闲置场景必现 | 无 | 开放超过 3 周，WSL2 环境 |
| 🟠 中高 | [#706](https://github.com/agentscope-ai/QwenPaw/issues/7065) 轮次后无法查看完整历史会话 | 连续多轮对话后仅显示最近 3~4 条，滚动无效 | 无 | 新报告（8 月 16 日） |
| 🟡 中 | [#7074](https://github.com/agentscope-ai/QwenPaw/issues/7074) 日常崩溃需刷新 | 高频繁率高发，日志有文件读取记录 | 无 | 信息不足 |
| 🟡 低 | [#7068](https://github.com/agentscope-ai/QwenPaw/issues/7068) 文件/脚本无法支持 C#、hader | 基于易用性者角度提出 | 已建议切换支持 | 功能性小缺失 |

**已有修复 PR（今日提交）**：
- [#7071](https://github.com/agentscope-ai/QwenPaw/pull/7071) 修复 `view_video` 硬编码 2MB 限流的缺陷（对应 #7060）。
- [#7070](https://github.com/agentscope-ai/QwenPaw/pull/7070) 修复 OpenAI Responses API（如 Volcengine Ark）视频帧静默丢失问题。
- [#7069](https://github.com/agentscope-ai/QwenPaw/pull/7069) 修复重载历史消息时 data-URL 图片无法渲染的问题。

> 这些 PR 均 *来自首位贡献者*，紧急等待**维护者尽快评审**，以避免高质量修复遗失。

---

## 6. 功能请求与路线图信号

| 增幅 | 功能需求 | 来源 | 未来采纳概率 |
|---|---|---|---|
| 中 | [“per-agent / per-session reasoning_effort 覆盖”](https://github.com/agentscope-ai/QwenPaw/issues/7062) | 多角色 agent 使用同一模型，无法分别定档思维强度 | 中——需要配置模型可以统一模型重写路径 #6302，只能设计兼容 |
| 中 | [为插件 API 提供 system prompt 隔离权限](https://github.com/agentscope-ai/QwenPaw/issues/7052) | 公司与服务端交互时要求底层提示词不可见 | 高，建议插件权限模块 |
| 中 | **技能名称去重**（[#7073](https://github.com/agentscope-ai/QwenPaw/issues/7073)）| 同名的 `SKILL.md` 会造成双份加载 | 已由 PR #7073 同步修复，等待合入 |
| 低 | **文件/脚本语言支持扩展**（C#、shader）（[#7068](https://github.com/agentscope-ai/QwenPaw/issues/7068)） | Meta 为 game developer 易用性提升 | 可考虑我们加入 `tex`，应支持 |
| 规划中 | **ViBo 上下文记忆压缩**（[#7003](https://github.com/agentscope-ai/QwenPaw/issues/7003)） | 大幅降低 token 消耗（宣称 97.5%） | 公开征集D**提案，但未获官方回应，可作长期研究项 |

**路线图信号**：`#6302`（大幅重构 provider 发现与路由）非常实在地暗示了 v2.2/3.0 领域的下一阶段架构方向，当前 issue 中的许多精细定制（如 reasoning_effort 按 agent）最终都可能在这次的架构框架内实现。

---

## 7. 用户反馈摘要

从今日 Issues 及评论中提取的真实用户声音：

**满意点：**
- **快速响应正反馈**：在 `#7063` 中，用户对“提交 24 小时即被修复并关闭”给出了肯定（创建到关闭仅不足半天）；项目稳定性提升是重要感受。
- **开箱即用程度：** 用户环境如 Windows WSL2 报告极多，反映 Linux/Windows 的跨风格适配较理想。

**核心痛点（高频关键词）：**
- **崩溃与重启**：多问题提到“崩溃后需刷新页面”“仅刷新才能恢复”（`#7074`；同事 #7063、#7065 都随手可见提到 “crash”）。
- **历史消息丢失/截断**：`#7065` 用户明确反馈滚动了十余屏仍看不到更早的对话内容——这对“长期陪伴型应用”是致命伤记录。
- **企业权限管理诉求增强**：`#7052` 的 account 明确提出需要 `prompt` 既“可用而不可见”，侧点明混 Multi-Tenant 场景的缩影，是商业长存储方向的先验信号。
- **对 300+ star 的表扬与promise之间的张力**：`#7003` 中提到“33748 stars says it all” 表达了对项目的喜爱，同时后续会添加“但还是不satisfy 由于成本”的 Honest 描述。

---

## 8. 待处理积压

以下项目存在 **长时间无响应** 或 **已等候评审严重超时** 的风险，特此提醒维护者：

### 高风险（超出交付规格）
- **[#6471] Cron 任务 misfire（APScheduler 不触发（开放 22+ 天）**  
  https://github.com/agentscope-ai/QwenPaw/issues/6471  
  使用 WSL2 环境的用户会遇到低概率/高影响问题，需托底至 2.0.x 分支快速响应。

### 阻塞 PR（复审更新等待超过 / 无活动）
- **[#6302](https://github.com/agentscope-ai/QwenPaw/pull/6302) Provider 统一重构（待评审已 27 天）** 重大重构，无任何 reviewer activity，持续推迟将累积大量后续配置 type 改动。
- **[#6940](https://github.com/agentscope-ai/QwenPaw/pull/6940) 原生 DataPaw 运行时（已待审 5 天，标记 ready-for-review）** 建议至少完成首轮 review，以散热新功能可能性通道。

共有 9 个 PR 处于 Open 状态，其中 7 个来自首次贡献者。**建议设置“新贡献人友好日”或 PR triage 计划，以消化积压，并保护这批宝贵的外部贡献。**

---

## 偏好建议（非结构）

- **优先批次1**：#7071、#7070、#7069 三个小幅修复（经费小，作用大）= 沿线稳定性高。
- **优先批次2**：#7073 的 skill 去重修复将与 #7077 提权，同为功能正确性修复，可短包评审。
- **风险关注**：#6302 类型的长大型 PR 若不计划本月合并，应及时在 issue 中给出状态反馈，避免社区侧无效等待。

---

> **生成时间**：2026-08-17 08:00 UTC
> **数据来源**：[agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw) 公开 GitHub 数据
> **声明**：本项目活跃度较高、但结算线为 0 合并地属性下，维护效率需提升。

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