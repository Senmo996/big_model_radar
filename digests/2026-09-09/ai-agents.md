# OpenClaw 生态日报 2026-09-09

> Issues: 481 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-09 02:01 UTC

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

# OpenClaw 项目动态日报 — 2026-09-09

## 1. 今日速览

过去 24 小时项目保持高活跃度：共 481 条 Issue 更新（新开/活跃 264，关闭 217），PR 更新 500 条（待合并 229，已合并/关闭 271）。今日发布 **v2026.9.3**，重点强化更新流程的安全性——引入隔离候选状态预演、支持 2026.9.2 迁移遗留处理，并允许在不中断健康 Gateway 的情况下恢复异常的更新记录。社区讨论热度集中在升级后的回归问题（模型工具调用 JSON 解析失败、更新卡死、Windows 启动失败）以及消息丢失/重复类 P1 Bug；多条 P0/P1 问题已具备 `fix-shape-clear` 或 `queueable-fix` 标签，修复管线正在跟进。整体而言项目迭代速度与社区参与度均处于高位，但升级链路的稳定性仍是当前最突出的健康度短板。

## 2. 版本发布

### [v2026.9.3](https://github.com/openclaw/openclaw/releases)
- **核心亮点：更安全的更新机制**
  - **隔离候选状态预演**：核心与插件变更先在隔离的候选状态中完整演练，通过后再激活，避免直接切换引入运行时故障。
  - **支持 2026.9.2 合格迁移**：为处于 2026.9.2 的存量用户提供受支持的迁移路径。
  - **可恢复被放弃的更新记录**：无需停止健康匹配的 Gateway 即可清理/恢复异常中断的更新记录。
- **破坏性变更**：无明确说明，重点为更新管线的可靠性增强。
- **迁移注意事项**：2026.9.2 用户可正常升级；此前因更新记录残留而卡在 “update in progress” 的环境（见 #139714、#141617）预计可从此版本受益。
- 关联：#136997、#138839、#141109、#141175、#1415xx（截断）。

## 3. 项目进展

今日共有 **271 个 PR 已合并/关闭**，数量可观。综合 PR 摘要，当前推进方向集中在：
- **渠道层稳定性**：Matrix E2EE 客户端安全退役、Signal 接收任务挂起、iMessage 桥恢复后反馈恢复。
- **插件/扩展修复**：Active Memory 触发查找超时导致召回丢失（[#142567 已关闭](https://github.com/openclaw/openclaw/pull/142567)）、Workboard `blocked` 状态误报 `isError`、插件分类体系重构（[#142760](https://github.com/openclaw/openclaw/pull/142760) 重新归类 68 个内置插件清单）。
- **CLI/更新体验**：Node.js 版本预检提示改为引用实际 engine 范围（[#142322](https://github.com/openclaw/openclaw/pull/142322)）、Node.js 不兼容时主动提供升级引导（[#142742](https://github.com/openclaw/openclaw/pull/142742)）。
- **兼容性修正**：模型被动目录保留捕获行（[#142766](https://github.com/openclaw/openclaw/pull/142766)）、继承模型在会话详情中保持一致（[#142751](https://github.com/openclaw/openclaw/pull/142751)）。

上述 PR 多数仍处于 `ready for maintainer look` 或 `needs proof` 状态，预计未来 1-2 个版本周期内陆续合入。

## 4. 社区热点

| Issue | 讨论热度 | 核心诉求 |
|---|---|---|
| [#135111 Provider 工具调用 JSON 解析间歇性失败（P1）](https://github.com/openclaw/openclaw/issues/135111) | 23 评论 | 2026.8.1 升级后约 6 次间歇性 `malformed JSON arguments`，与具体文件/工具无关；用户希望确认是否模型侧回归或 SDK 兼容问题 |
| [#97616 僵尸子进程累积（P1）](https://github.com/openclaw/openclaw/issues

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比分析

**报告日期**：2026-09-09  
**覆盖项目**：OpenClaw、NanoBot、Zeroclaw、PicoClaw、NanoClaw、IronClaw、LobsterAI、TinyClaw、Moltis、CoPaw、ZeptoClaw、EasyClaw

---

## 1. 生态全景

生态整体处于 **高活跃、快迭代、版本升级阵痛期**。OpenClaw 作为核心项目单日产生 481 条 Issue 更新和 500 条 PR 更新，并发布安全更新机制增强版 v2026.9.3；周边项目（CoPaw、Zeroclaw、NanoBot 等）同步围绕 IM 渠道适配、MCP 兼容性、配置系统健壮性和缓存/内存边界治理展开高密度修复。升级导致回归是今日最集中的负面信号：OpenClaw 自身、LobsterAI、CoPaw 均在处理升级后兼容性问题。与此同时，多租户 MCP 安全、Telegram/企业 IM 集成、配置持久化一致性、边缘/轻量化部署开始成为跨项目共性需求，生态正从“功能扩张”转入“稳定化、平台化、安全加固”阶段。

---

## 2. 各项目活跃度对比

| 项目 | Issues 数 | PR 数 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 481（更新） | 500（更新） | v2026.9.3 | 高活跃但升级链路稳定性成短板 |
| **NanoBot** | 2（更新） | 40（更新） | 无 | 稳健上升，系统性修复缓存边界问题 |
| **Zeroclaw** | 27（更新） | 50（更新） | 无 | 中等偏上，合并吞吐低于新增速度，有积压风险 |
| **PicoClaw** | 3（新开） | 7（待合并） | 无 | 社区积极但维护吞吐承压 |
| **NanoClaw** | 2（更新） | 10（更新） | 无 | 良好，归档目录无上限增长需关注 |
| **IronClaw** | 2（新增） | 11（更新） | 无 | 较高，系统解决 MCP 多租户安全问题 |
| **LobsterAI** | 0 | 9（合并/关闭） | 无 | 中偏上，合并活跃但社区讨论冷淡 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 |
| **Moltis** | 0 | 0 | 无 | 无活动 |
| **CoPaw** | 31（更新） | 46（更新） | v2.2.1-beta.1 | 高活跃，2 个高严重度 Bug 未修复 |
| **ZeptoClaw** | 2（关闭） | 2（1 合并 / 1 待合并） | 无 | 良好，安全加固推进有力 |
| **EasyClaw** | 0 | 0 | v1.9.7 | 低互动高产出，健康度良好 |

> 注：各项目统计口径均为“过去 24 小时动态更新

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-09

## 今日速览

NanoBot 过去24小时保持高活跃度，PR 更新达40条（26条待合并、14条已合并/关闭），主要集中在缓存边界控制、Telegram 命令路由修复、WebUI/TUI 体验增强三大方向，显示项目在稳定性加固与前端交互优化上持续发力。Issues 侧仅2条更新且均已关闭（1条功能建议、1条新手贡献者咨询），无新开 Issue，维护者响应速度良好。今日无新版本发布，整体项目健康度处于稳健上升期。

---

## 项目进展

### 已合并/关闭 PR

| PR | 说明 |
|---|---|
| [#5709](https://github.com/HKUDS/nanobot/pull/5709) [CLOSED] | **fix(codex): refresh model catalog for Astra** — 修复 OpenAI Codex 模型选择器因 `client_version` 过低而遗漏 GPT-6-Astra 的问题，将模型目录客户端版本升级至已验证的 `0.153.4`。 |

### 待合并但进展显著的核心 PR

以下 PR 虽未合并，但已进入 review/测试流程，方向明确：

- **WebUI 体验重构**：#5710 重构侧边栏导航（项目/主题/自动化分区管理）、#5704 为48个配置字段增加图形化编辑与自动保存、#5703 通过 DOM 索引与渲染上限优化长对话性能——三者形成"界面组织 + 可配置性 + 渲染性能"的组合升级。
- **TUI 对齐 WebUI**：#5498 统一 Agent TUI 配置界面排版（按 grapheme 截断、对齐固定列）、#5705 新增 `/usage` 面板展示上下文占用与模型轮次图表。
- **Telegram 完整化**：#5711 将连字符斜杠命令（`/dream-log` 等）重命名为 Telegram 安全的下划线格式；#5707 修复 `/compact` 与 `/evaluator-prompt` 被 Telegram 通道静默丢弃的问题；#5706 将上下文压缩的两条通知消息合并为单条编辑消息。

---

## 社区热点

### 讨论最活跃

| 条目 | 链接 | 热度 |
|---|---|---|
| **#5693** 建议支持无人零售/IoT 场景（轻量级部署、中文文档） | [查看](https://github.com/HKUDS/nanobot/issues/5693) | 3 条评论，0 👍 |
| **#5696** 首次贡献者寻求 beginner-friendly issue | [查看](https://github.com/HKUDS/nanobot/issues/5696) | 1 条评论，0 👍 |

**分析**：
- **#5693** 代表了边缘/IoT 场景用户的声音——希望 NanoBot 能下沉到无人零售、智能货柜等资源受限的硬件环境，诉求集中在：更轻量的部署方案、中文文档/示例。这是典型的"从云端走向边缘"需求信号，值得维护者评估部署体积优化路线。
- **#5696** 则反映了开源社区的良性循环：已有新手主动寻入口。该类 issue 若能引导至 `good-first-issue` 标签体系，有助于降低贡献门槛。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | 条目 | 问题描述 | 状态 |
|---|---|---|---|
| **高** | [#5708](https://github.com/HKUDS/nanobot/pull/5708) | **exec 流式输出 UTF-8 字符损坏**：长任务每 4,096 字节独立解码，跨块字符被替换为无效标记 | ✅ 已有 fix PR |
| **高** | [#5664](https://github.com/HKUDS/nanobot/pull/5664) | **idle summary 缓存无界增长**：被遗弃会话的摘要永不释放，内存持续膨胀 | ✅ 已有 fix PR |
| **中** | [#5665](https://github.com/HKUDS/nanobot/pull/5665) | **MCP 浏览器 OAuth 流无容量上限**：快速重启可致注册表无限增长 | ✅ 已有 fix PR |
| **中** | [#5663](https://github.com/HKUDS/nanobot/pull/5663) | **Mattermost 线程上下文缓存永久累积**：进程生命周期内的集合从不清理 | ✅ 已有 fix PR |
| **中** | [#5590](https://github.com/HKUDS/nanobot/pull/5590) | **持久化 JSON 工具结果摘要截断不当**：大嵌套对象挤掉 `ok`/`status`/`error` 等关键字段 | ✅ 已有 fix PR（有冲突待解） |
| **中** | [#5711](https://github.com/HKUDS/nanobot/pull/5711) | **Telegram 斜杠命令不可用**：连字符命令名不被 Telegram 识别 | ✅ 已有 fix PR |
| **中** | [#5707](https://github.com/HKUDS/nanobot/pull/5707) | **`/compact` 和 `/evaluator-prompt` 被 Telegram 通道静默丢弃** | ✅ 已有 fix PR |
| **低** | [#5638](https://github.com/HKUDS/nanobot/pull/5638) | **Copilot OAuth token 存储在容器不可持久化目录** | ✅ 已有 fix PR |
| **低** | [#5152](https://github.com/HKUDS/nanobot/pull/5152) | **子代理部分完成结果未标记**：父 turn 因等待未完成子任务而异常保持打开 | ✅ 已有 fix PR |

**稳定性趋势**：@Shizoqua 连续提交了 4 个"绑定缓存/流"类修复（#5664、#5665、#5663、#5638），系统性地治理内存/资源的无界增长问题，预计下一版本稳定性将显著提升。

---

## 功能请求与路线图信号

| 信号 | 来源 | 可能被纳入下一版本的理由 |
|---|---|---|
| **WebUI 全量配置化**（48 个字段 + autosave + 免重启） | [#5704](https://github.com/HKUDS/nanobot/pull/5704) | 高赞的工程化改进，直接降低用户配置门槛，且已实现 |
| **WebUI 侧边栏导航重构** | [#5710](https://github.com/HKUDS/nanobot/pull/5710) | 目录/主题分区符合项目管理直觉，改善高频使用体验 |
| **Telegram 自定义 Bot API**（支持自托管/企业网关） | [#4919](https://github.com/HKUDS/nanobot/pull/4919) | 面向企业/私有化部署的刚需，与现有 Telegram 系列修复形成生态闭环 |
| **TUI 使用量面板** | [#5705](https://github.com/HKUDS/nanobot/pull/5705) | WebUI 功能向 TUI 对齐，满足终端用户需求 |
| **新 Web 搜索 provider**：Serply | [#5437](https://github.com/HKUDS/nanobot/pull/5437) | 提供用户自持 API key 的 Google SERP 路由，隐私友好 |
| **元搜索聚合**：mst-python | [#5234](https://github.com/HKUDS/nanobot/pull/5234) | 多引擎 RRF 融合，搜索覆盖更全，P1 优先级 |
| **无人零售/IoT 轻量化支持** | [#5693](https://github.com/HKUDS/nanobot/issues/5693) | 边缘部署需求，但需评估权重；中文文档/示例可作为低成本切入点 |
| **Telegram 贴纸复用回复** | [#5387](https://github.com/HKUDS/nanobot/pull/5387) | 交互体验增强，但优先级较低、存在冲突 |

---

## 用户反馈摘要

### 真实用户痛点

1. **资源受限场景被忽视**（#5693）：用户调研无人零售生态时发现 NanoBot 有潜力，但明确提到"更轻量的部署方案（便于边缘设备运行）"和"中文文档/示例"的缺口——这指向当前版本在边缘设备上的可部署性不足，且中文用户社群资料有待完善。

2. **容器部署持久化问题**（#5638）：Copilot OAuth token 写入非持久化目录，在容器重启后认证失效——典型的生产环境踩坑反馈。

3. **长任务输出可读性**（#5708）：UTF-8 中文等多字节字符在流式输出中偶发乱码，影响工具结果的可靠性。

### 贡献者反馈

- #5696 首次贡献者表达了积极参与意愿（Python、LangChain、RAG 背景），具有 bug fix、文档改进、测试补全三类明确兴趣——建议维护者为其标注合适的入门 issue，以转化为可持续贡献者。

---

## 待处理积压

| 类型 | 条目 | 标注 | 持续时间 |
|---|---|---|---|
| **P1 高优且待处理** | [#5234](https://github.com/HKUDS/nanobot/pull/5234) mst-python 元搜索集成 | `priority: p1, conflict` | 自 08-03 开放，35+ 天 |
| **冲突待解决** | [#5590](https://github.com/HKUDS/nanobot/pull/5590) JSON 结果摘要修复 | `conflict` | 自 08-28 开放，11 天 |
| **冲突待解决** | [#5437](https://github.com/HKUDS/nanobot/pull/5437) Serply 搜索 provider | `new-provider, conflict` | 自 08-19 开放，20 天 |
| **冲突待解决** | [#5387](https://github.com/HKUDS/nanobot/pull/5387) Telegram 贴纸回复 | `conflict` | 自 08-13 开放，26 天 |
| **长期未合并** | [#4919](https://github.com/HKUDS/nanobot/pull/4919) Telegram 自定义 Bot API | 无冲突但持续更新 | 自 07-14 开放，56 天 |
| **长期未合并** | [#5152](https://github.com/HKUDS/nanobot/pull/5152) 子代理结果标记 | `regression, fix` | 自 07-28 开放，42 天 |

**维护者提醒**：请优先处理标记 `conflict` 的 4 个 PR——它们均为有效功能/修复，且已分别等待 11~35 天，冲突解决后可快速推进。另外关注 3 个由 @Shizoqua 提交的缓存边界修复（#5664

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-09

## 1. 今日速览

过去 24 小时内 Zeroclaw 保持高度活跃：27 条 Issue 更新（全部活跃，无关闭）、50 条 PR 更新（45 条待合并、5 条关闭），无新版本发布。项目当前处于 **RFC 驱动的架构演进期**，多个重量级设计方案（会话所有权、统一文件架构、WASM 插件运行时、事件溯源式会话历史）同时在 Revision 迭代与维护者评审中；与此同时，Telegram 媒体组批处理、ACP 会话稳定性等长期悬而未决的 Bug 已有对应修复 PR 进入待合并队列。值得关注的是：PR 队列堆积明显、多条标记 `needs-author-action` 的 PR 已等待数周，维护者评审带宽可能是当前项目推进的主要瓶颈。整体健康度**中等偏上，但合并吞吐（5 条/日）低于 Issue 与 PR 新增速度，存在积压风险**。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

> 今日 5 条 PR 已合并/关闭，以下为数据中可见的 2 条，侧重点均在 CI 稳定性与渠道体验修复。

### #10675 — fix(ci): make Windows test scoping explicit（已关闭）
**作者**: @Audacity88 | 更新: 2026-09-09

将 #10668 中的成员包语言环境与构建脚本规则引入显式 Windows 测试作用域分类器，使已知的包本地 Rust 输入进入受限测试，根构建脚本与仓库级控制路径保持默认行为。该 PR 补全了跨平台 CI 覆盖的最后一环，避免 Windows 测试范围被隐式扩大或缩小。

🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10675

### #10620 — fix(channels): explain permanently dropped voice messages to the sender（已关闭）
**作者**: @egorchenkov | 更新: 2026-09-09

Telegram 语音消息被永久丢弃（无法转写或处理）时，此前发送者收不到任何反馈。该 PR 在丢弃时主动向发送者说明原因，使行为从“静默失败”变为“可解释失败”，降低了渠道层的不确定性。

🔗 https://github.com/zeroclaw-labs/zeroclaw/pull/10620

> ⚠️ 其余关闭的 3 条 PR 在本次数据中未展示，无法确认细节。整体来看，今日合并/关闭集中在 CI 与渠道小修复，**尚无新的功能特性合入主干**。

---

## 4. 社区热点

> 以下按评论数排序，均为过去 24 小时内仍有更新的活跃讨论。

### #9487 — [RFC] Runtime-owned conversation sessions and transport surface adapters（35 条评论）
**作者**: @NiuBlibing | 更新: 2026-09-08 | 标签: `risk:high`、`needs-maintainer-review`

已迭代至 **Revision 5**，是 Revision 4 投票快照的实质性替换。讨论核心在于：会话所有权应以运行时为锚点，传输层通过适配器对接不同渠道（ACP、Web、Telegram 等）。社区讨论点包括状态迁移、与现有 gateway 行为的兼容，以及高风险的架构改动对既有插件生态的影响。这是当前项目最受关注的架构议题。

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/9487

### #9488 — [RFC] Unified file and attachment architecture for conversation surfaces（28 条评论）
**作者**: @NiuBlibing | 更新: 2026-09-08 | 标签: `risk:high`、`needs-maintainer-review`

已迭代至 **Revision 10**。方案目标是为所有会话面（chat、code、ACP、webhook 等）提供统一的文件与附件模型，消除各渠道各自为政的 attachment 处理。讨论焦点集中在存储路径策略、访问控制模型及与 #9487 的衔接关系。

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/9488

### #6996 — [RFC] Granular sandbox policy - filesystem restrictions（26 条评论）
**作者**: @rarean | 更新: 2026-09-08 | 标签: `in-progress`、`needs-maintainer-review`

讨论应用层路径准入（`SecurityPolicy`）与 OS 层沙箱（Bubblewrap/Landlock/Seatbelt）之间的长期漂移问题。该 RFC 自 5 月底发起，已持续 3 个多月，是当前 **标注 `in-progress` 时间最长的 RFC**，反映 sandbox 策略跨层一致性的高复杂度和维护者对此的谨慎态度。

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/6996

### #8692 — [Tracker] Maintainer decision queue for RFCs and design issues（15 条评论）
**作者**: @Audacity88 | 更新: 2026-09-08

作为 RFC/设计议题维护者决策队列的跟踪器，集中登记待接受、拒绝、延期或拆分的议题。其本身的存在说明项目已进入 **设计决策密集期**，需要系统化管理评审队列，以保证不以 issue 评论活跃度作为唯一决策信号。

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/8692

### #10076 — [RFC] Composable WASM plugin runtime architecture（11 条评论）
**作者**: @NiuBlibing | 更新: 2026-09-08

WASM 插件运行时架构提案，最新修订移除了原 7.3 节的会话历史竞争性方案，使 #10526 成为该领域唯一权威。讨论重点为类型化扩展点、可替换 Provider 以及工具/技能的插件化接入方式。

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/10076

### #5514 — [Bug] batch Telegram media groups into one multimodal turn（8 条评论）
**作者**: @aq-uua | 更新: 2026-09-09

Telegram 相册/媒体组被拆分成多个独立 LLM 请求的 Bug 讨论，已在 4 月提出，至今仍在活跃。该问题直接影响 Telegram 渠道的日常使用体验，用户诉求强烈，且已有对应 PR（#8955）在队列中。

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/5514

---

## 5. Bug 与稳定性

> 按严重程度降序排列。

### S1 级（工作流阻塞）

#### #9333 — failed ACP turns disappear after switching sessions
**作者**: @Audacity88 | 更新: 2026-09-08 | 标签: `S1`、`in-progress`、`priority:p1`、`channel:acp`

当 Code/ACP turn 在用户消息与工具活动已出现在实时会话记录后发生 provider 错误，切换到其他 session 再返回时该失败 turn 整体消失。这对依赖 ACP 进行代码任务的工作流是严重障碍。已有 PR #10468 尝试修复但尚在待合并队列。

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/9333

### S2 级（功能退化）

#### #10721 — knowledge.db_path tilde expansion is a global replace, not a home prefix
**作者**: @joalvaradon | 新建: 2026-09-09 | 标签: `S2`、`tools`

`all_tools_with_runtime` 中知识库路径的 `~` 展开是 `String::replace('~', home)` 全局替换，而非仅替换前缀。若路径中任意位置出现 `~`（如目录名包含 `~`），路径将被静默破坏，knowledge 工具被静默丢弃。**新建仅数小时，是新鲜 Bug，暂无回复。**

🔗 https://github.com/zeroclaw-labs/zeroclaw/issues/10721

#### #10667 — ZeroCode can duplicate a streamed response when prompt completion precedes TurnComplete
**作者**: @Audacity88 | 新建: 2026-09-06 | 标签: `S2`、`in-progress`、`zerocode`

流式响应在 prompt completion 先于 TurnComplete 到达时，zerocode 界面会渲染出两条相同的 assistant 回复（底层持久化只有一条）。该问题已有可复现的客户端状态描述，与 #10720（v0.8.5 版本中回复双倍渲染）高度相关，疑似同一 TUI 渲染逻辑缺陷。

🔗 https://github.com/zer

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-09

## 1. 今日速览

PicoClaw 在过去 24 小时呈现典型的中等活跃度：Issue 侧有 3 个新 Bug 提交（其中 2 个来自同一贡献者，均附有对应修复 PR），PR 侧有 7 个待合并的更新，其中 3 个来自活跃外部贡献者（Telegram 修复、Deltachat 重构等）。值得关注的是，多日前的 Issue 与 PR 仍停留在待处理状态，stale 标记增多，维护者的合并/响应速度已成为社区反馈的隐性压力点。项目整体处于"社区积极提交、维护吞吐承压"的阶段。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日无新合并的 PR。唯一被关闭的 PR 是 `#714`（skills: install/reinstall CLI and refactor into skillsCmd），该 PR 已存活超过 6 个月，属于增强类贡献，最终被关闭（状态为 CLOSED，具体为合并还是放弃未标注）。

**待合并 PR 中值得关注的方向（反映项目正在推进的能力）：**

- **配置系统加固**：[#3375](https://github.com/sipeed/picoclaw/pull/3375) 修复敏感数据缓存的并发初始化问题，是今日新 Bug 的直接修复；[#3372](https://github.com/sipeed/picoclaw/pull/3372) 使 reaction 工具可通过配置开关控制。
- **Telegram 体验修复（社区驱动）**：[#3357](https://github.com/sipeed/picoclaw/pull/3357) 让机器人回复自己消息时视为隐式提及，[#3356](https://github.com/sipeed/picoclaw/pull/3356) 修复带文档的消息引用。
- **新 Provider 接入**：[#3371](https://github.com/sipeed/picoclaw/pull/3371) 新增 opencode-go provider。
- **设备扩展**：[#3344](https://github.com/sipeed/picoclaw/pull/3344) 增加手机配对方案（gbr/1 协议）。

项目整体在多通道适配、配置健壮性和新 AI Provider 接入三个方向上持续积累，但合并节奏明显滞后于提交节奏。

---

## 4. 社区热点

今日讨论热度集中在以下条目：

1. **[#3265](https://github.com/sipeed/picoclaw/issues/3265) Gateway 启动时报 deltachat 未知类型**（已关闭，3 条评论，1 👍）  
   虽然已关闭，但该问题在关闭当天仍被更新（2026-09-08），说明社区在讨论旧配置与新版 Deltachat 重构之间的兼容性问题，且与待合并的 `#3222`（deltachat 重构）直接关联。

2. **[#3343](https://github.com/sipeed/picoclaw/issues/3343) Telegram 无限编辑消息**（3 条评论）  
   该 Issue 描述了工具反馈动画在 Agent turn 失败后仍持续调用 Telegram API，产生 22.8 万次编辑尝试，触发服务端限流。这是真实用户环境中的严重稳定性/成本问题，虽然标记为 stale，但仍有讨论热度。

3. **[#3355](https://github.com/sipeed/picoclaw/issues/3355) 飞书连接报错**（1 条评论）  
   中文用户在 nightly 版本上报告 `config.json` 含有未知字段 `channel_list.feishu.app_id`，说明配置校验逻辑对飞书通道的兼容性存在问题，且有用户正在夜间版本上试验新通道。

**热点诉求分析**：社区最关心的是通道配置的兼容性与稳定性——无论 Telegram、飞书还是 Deltachat，配置一旦出错会直接导致 gateway 无法启动，或者在高频场景下触发平台限流。

---

## 5. Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue | 描述 | 是否有 Fix PR |
|---------|-------|------|--------------|
| **高** | [#3373](https://github.com/sipeed/picoclaw/issues/3373) `SaveConfig` 静默删除 `api_key` | `model_list` 中超过一个的 `api_keys` 在配置保存往返后被删除，且 `fallbacks` 指向不存在的模型名称——**静默数据丢失**，影响所有使用多 API key 的用户。 | 无（暂无对应 PR） |
| **高** | [#3374](https://github.com/sipeed/picoclaw/issues/3374) `initSensitiveCache` 数据竞争 | `sensitiveCache` 的无同步懒加载会绕过 `sync.Once`，导致 `FilterSensitiveData` 收到 nil `*strings.Replacer` 并 panic，属于并发场景下的崩溃风险。 | ✅ [#3375](https://github.com/sipeed/picoclaw/pull/3375)（同日提交） |
| **中** | [#3343](https://github.com/sipeed/picoclaw/issues/3343) Telegram 工具反馈动画无限编辑 | Agent turn 失败后动画仍持续运行数天，导致 22.8 万次 edit 请求及服务端限流，**影响线上服务可用性与成本**。 | 无 |
| **中** | [#3355](https://github.com/sipeed/picoclaw/issues/3355) 飞书通道配置不兼容 | nightly 版本在仅配置 `feishu` 时启动报未知字段错误，通道无法使用。 | 无（待确认是否为配置校验误报） |
| **低** | [#3265](https://github.com/sipeed/picoclaw/issues/3265) Deltachat 通道启动失败 | 未配置 deltachat 但 gateway 仍尝试加载该通道——已关闭，可能是配置校验或默认值处理回归，需确认修复是否已合入。 | 已关闭（可追踪 `#3222` 重构） |

---

## 6. 功能请求与路线图信号

从今日活跃的 PR 与 Issue 中可以提取以下路线图信号：

| 信号方向 | 载体 | 说明 |
|---------|------|------|
| **Deltachat 模块深度重构** | [#3222](https://github.com/sipeed/picoclaw/pull/3222) | 删除约 200 行旧实现，移除 fallback 逻辑，改用官方 relay 列表，调整配置字段命名——属于一次破坏性变更，若合入可能影响现有 Deltachat 用户配置。 |
| **Telegram 群聊交互增强** | [#3356](https://github.com/sipeed/picoclaw/pull/3356)、[#3357](https://github.com/sipeed/picoclaw/pull/3357) | 回复机器人消息 = 隐式提及；回复文件消息时保留文档上下文。这两个 PR 均直接服务于"用户自然对话流"的体验。 |
| **新 AI Provider 接入** | [#3371](https://github.com/sipeed/picoclaw/pull/3371) | opencode-go provider，按模型 ID 自动路由端点，支持会话头传递。 |
| **工具可配置化** | [#3372](https://github.com/sipeed/picoclaw/pull/3372) | 使 `reaction` 工具可以被用户开关，暗示项目在做更细粒度的工具权限控制。 |
| **移动端协同** | [#3344](https://github.com/sipeed/picoclaw/pull/3344) | 通过 gbr-agent 配对手机，手机可查看桌面 Agent 运行状态——扩展了 PicoClaw 的使用场景。 |

**判断**：Deltachat 重构（`#3222`）是当前最大的待合入变更，涉及 API 与配置格式调整，若合入应作为 minor/major 版本发布，并给出迁移说明。Telegram 的两个修复 PR 从社区流入，价值明确，预计会在下一次合并窗口被纳入。

---

## 7. 用户反馈摘要

- **Telegram 限流事件（[#3343](https://github.com/sipeed/picoclaw/issues/3343)）**：用户观察到工具反馈动画在 Agent turn 失败后依然持续调用 `editMessageText`，每 3 秒一次，持续数天，产生 22.8 万次请求，被 Telegram 服务端限流。**核心痛点：消息反馈缺少终止条件或熔断机制，直接威胁线上稳定性**。
- **配置保存静默丢失（[#3373](https://github.com/sipeed/picoclaw/issues/3373)）**：用户（sting8k）报告 `LoadConfig` → `SaveConfig` 往返后 `api_keys` 被截断，`fallbacks` 悬空。**痛点：配置系统缺少幂等性校验，数据丢失无告警**。
- **飞书接入受阻（[#3355](https://github.com/sipeed/picoclaw/issues/3355)）**：中文用户在 nightly 版本上尝试接入飞书，即时报错，且错误信息未指明如何修正配置。**痛点：通道配置格式不兼容/校验器过于严格，阻挡了新通道用户落地**。
- **并发初始化 panic（[#3374](https://github.com/sipeed/picoclaw/issues/3374)）**：配置系统在并发场景下可信度受损，虽然该用户已直接提交修复 PR，但反映了项目在并发安全上的测试盲区。

---

## 8. 待处理积压

以下条目长期未获得维护者响应或明确处理计划，提醒关注：

**Issues：**

- [#3343](https://github.com/sipeed/picoclaw/issues/3343) — Telegram 无限编辑消息（创建自 2026-08-22，更新于 2026-09-08，stale）。影响线上稳定性的高频问题，需社区提供复现路径或官方给出终止条件设计。
- [#3355](https://github.com/sipeed/picoclaw/issues/3355) — 飞书通道配置报错（2026-09-01 创建，stale，仅 1 条评论）。涉及中国用户常用通道，长时间未响应可能影响社区口碑。

**PRs：**

- [#3222](https://github.com/sipeed/picoclaw/pull/3222) — Deltachat 重构（2026-07-03 创建，stale，-200LOC）。这是项目大型重构，长期搁置会增加合并成本与社区分歧。
- [#3357](https://github.com/sipeed/picoclaw/pull/3357) 与 [#3356](https://github.com/sipeed/picoclaw/pull/3356) — Telegram 体验修复（2026-09-01 创建，连续 7 天无更新）。社区贡献者的热情需要及时维护响应来维持。

**风险提示**：以上条目均已标记为 stale，若超过维护者的 stale-bot 阈值将被自动关闭，可能导致有价值的贡献流失。建议维护者安排一轮针对性的 review 与合并，特别是 `#3375`（配置并发修复）应优先合入，因为它直接对应 `#3374` 的数据竞争 Bug。

---

**项目健康度小结**：社区贡献活跃、问题定位质量高（多个 Bug 附有修复 PR），但合并吞吐与 issue 响应速度是当前短板。配置系统（数据丢失、并发安全）是今日暴露的最需优先治理的模块，建议在下个版本中重点测试。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目日报 · 2026-09-09

## 今日速览

过去 24 小时项目活跃度处于高位：共 10 条 PR 更新（8 条待合并、2 条已合并/关闭），2 条 Issue 更新（1 条新开、1 条关闭），无新版本发布。核心团队密集推进 OpenCode 集成（#3733/#3746/#3747）与渠道/设置相关改造，显示出 v2 迁移后功能扩展明显提速。Bug 修复集中在线程消息路由、provider 取消信号与更新控制器稳定性，整体项目健康度良好，但归档目录无上限增长的问题 (#3735) 是当前最值得关注的生产隐患。

---

## 版本发布

过去 24 小时无新 Release 发布。

---

## 项目进展

今日有 2 个 PR 合并/关闭，另有 1 个迁移相关 Issue 关闭：

- **[CLOSED] #3729 feat(setup): connect the host to its community cell and manage perks in the browser**（作者 @

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-09

> 数据来源：github.com/nearai/ironclaw | 数据窗口：过去 24 小时


## 1. 今日速览

过去 24 小时项目活跃度**较高**，核心精力集中在 Hosted-MCP 多租户隔离与扩展包机制上。当日共 11 条 PR 动态（6 条待合并、5 条已合并/关闭），3 条新 PR 合并落地，2 条 7 月提交的旧 PR 被设计更新后的新实现取代；Issues 侧新增 2 条，其中 #6778（Hosted-MCP 跨用户元数据暴露）虽创建于 7 月底，但今日因相关修复 PR 重新成为焦点。整体来看，项目正在系统性地解决 MCP 发现机制中的安全与一致性问题，同时推进 Telegram 集成、上下文预算可配置化等面向部署与用户体验的能力。无新版本发布。


## 2. 版本发布

过去 24 小时无新版本发布，此部分省略。


## 3. 项目进展

今日有 5 条 PR 状态转为关闭/合并，其中 3 条为新功能落地、2 条为被取代的旧方案。

### ✅ 新合并/落地

- **[#8088] feat(common): 区分「设置为空」与「未设置」的环境变量** — 合并
  修复了 `env_or_override` 将 `FOO=` 与缺失 `FOO` 等同对待的问题，避免运维将变量误设为空字符串时静默回退到默认配置的部署陷阱。
  https://github.com/nearai/ironclaw/pull/8088

- **[#8089] feat(extensions): 内置 agent-market hosted-MCP 提供方包** — 合并
  以第一方包形式提供 agent.market 提供方（清单 + 工具输入 schema + 静态工具声明），与其余 bundled hosted-MCP 包结构一致。静态声明作为 `tools/list` 动态发现之前的回退方案。
  https://github.com/nearai/ironclaw/pull/8089

- **[#8083] fix(extensions): 合并已发现的 hosted-MCP 目录而非整体替换** — 合并
  修复多用户场景下，一个用户的 `tools/list` 发现会清空其他用户已发布工具的问题。将「最后写入者胜出」改为目录合并，是 #6778 问题链的重要一步。
  https://github.com/nearai/ironclaw/pull/8083

### 🔄 被取代的旧 PR

- **[#6760] bundle agent-market marketplace extension**（7/28 提交）— 被 #8089 按新架构取代关闭
- **[#6759] SEP-414 `_meta` attribution on hosted-MCP tools/list + tools/call**（7/28 提交）— 被 #8084（新实现）取代关闭

这两条关闭并非否定功能本身，而是项目在 bundled extensions 架构和 SEP-414 实现方式上发生了设计演进。

### 📌 待合并（6 条 OPEN）

今日新打开的 PR 均未合并，包括 #8090（按调用者隔离 MCP 目录）、#8087（上下文预算可配置化）、#8084（SEP-414 调用方归属）、#8085（统一 operator 安装包与 host-bundled 包的处理逻辑）、#8082（附件指针模式）、#8072（Telegram 命令菜单）。详情见下文「功能请求与路线图信号」。


## 4. 社区热点

### 🔥 #6778 — Hosted-MCP 跨用户元数据暴露（评论 2，核心焦点）

```
[OPEN] Hosted-MCP: discovered tool catalogs are published per extension id, not per installation
       — cross-user metadata exposure on multi-principal servers
```

这是今日讨论热度最高的 Issue，也是推动多条 PR 的核心问题。其描述为：Hosted-MCP 在 `tools/list` 发现时使用「当前激活用户」的凭证，但发现结果仅按 extension id 发布到共享注册表，未按安装维度隔离。在多主体服务器上，用户 A 发现并发布的工具目录，用户 B 在自身会话中也能看到（且后续发现会覆盖前者），构成跨用户元数据暴露。

**关联 PR 链**：已合并的 #8083（改为合并目录）→ 待合并的 #8090（改为按调用者 key 隔离）。两条 PR 分别从「防覆盖」与「彻底隔离」两个层面回应此问题。

**诉求分析**：社区显然希望 hosted-MCP 在面向多租户/多用户部署时，工具发现结果能做到**严格的凭证级隔离**，而非仅避免互相覆盖。这不仅是隐私问题，也关系到按用户返回不同工具列表的业务模型能否成立。

https://github.com/nearai/ironclaw/issues/6778


## 5. Bug 与稳定性

按严重程度排序：

### 🔴 高 — 安全/隐私

- **[#6778] Hosted-MCP 跨用户工具目录暴露**（OPEN，已有修复 PR）
  工具目录按 extension id 而非安装维度发布，已激活用户的发现结果对其他用户可见并可被覆盖。这是数据暴露 + 功能损坏的组合问题。
  状态：#8083 已合并（防覆盖）、#8090 待合并（按调用者隔离）。
  https://github.com/nearai/ironclaw/issues/6778

### 🟠 中 — 功能不可用/行为异常

- **[#8085] operator 安装的扩展包「可构建但不可使用」**（OPEN，有 PR）
  `from_host_bundled_manifest_with_inline_dynamic_schemas` 与 `validate_consistency` 对内联动态 schema 的允许来源判断不一致，导致 operator 通过包管理器安装的扩展在构建时通过、运行时却被拒绝。
  https://github.com/nearai/ironclaw/pull/8085

- **[#8086] `ironclaw skills list` 看不到 runtime 写入的 skills**（OPEN，暂无 fix PR）
  两种场景下 CLI 列表为空：(a) agent 安装的 skill 对 CLI 不可见；(b) 非 CLI 配置用户的 skill 对 CLI 不可见。用户调试「agent 看不到自己的 skill」时被空列表误导。
  https://github.com/nearai/ironclaw/issues/8086

### 🟡 低 — 配置陷阱

- **[#8088] 空字符串环境变量被当作未设置**（CLOSED，已合并修复）
  `env_or_override` 将 `FOO=` 视同未设置，导致 operator 输入空字符串时静默走默认值。已在 common 层修复。
  https://github.com/nearai/ironclaw/pull/8088


## 6. 功能请求与路线图信号

今日多条 OPEN PR 指向下一版本的可能特性：

### 部署与运维能力

- **[#8087] prompt-context 限制改为可配置覆盖**（OPEN）
  目前 `PromptContextTokenBudget::DEFAULT_CONTEXT_LIMIT_TOKENS` 为硬编码 128k 常量，部署更大上下文窗口模型需改动源码。该 PR 将其变为可覆盖项，属于对已有大型模型部署场景的直接响应。
  https://github.com/nearai/ironclaw/pull/8087

- **[#8089] agent-market 提供方作为第一方 bundled 包**（已合并）
  与 #6760 的 intent 一致（env 可配置 server URL），意味着 agent.market 将成为默认分发的 MCP 提供方之一。已被 #8089 纳入主线。

### MCP 协议层增强

- **[#8084] SEP-414 调用方归属（opt-in）**（OPEN）
  在 outbound hosted-MCP `tools/call` 上附加 `_meta` 归属信息（会话标识、重试标记）。解决提供方「无法区分会话」「无法识别重试以避免重复计费」的问题。严格 opt-in，按 provider manifest 控制。这是 #6759 的新实现。
  https://github.com/nearai/ironclaw/pull/8084

- **[#8090] hosted-MCP 目录按调用者（而非扩展）key**（OPEN）
  在 #8083 合并修复基础上，将目录 registry 维度彻底改为按 caller 隔离，消除「共享槽位」的根因。
  https://github.com/nearai/ironclaw/pull/8090

### 模型上下文与附件

- **[#8082] 附件指针模式：文档文本不再全量内联**（OPEN）
  提取的文档文本（单 PDF 约 25k tokens）直接内联到模型请求，附件稍多即耗尽上下文预算且每轮重复计费。该 PR 提供 opt-in pointer 模式，仅传引用（或摘要）而非全文。直接回应了 heavy-attachment 使用场景的成本痛点。
  https://github.com/nearai/ironclaw/pull/8082

### 渠道集成

- **[#8072] Telegram 命令菜单注册**（OPEN，9/4 创建）
  激活扩展时通过 Bot API `setMyCommands` 注册 `/model`、`/status`、`/new`、`/stop`、`/interrupt`，停用时 `deleteMyCommands` 清理。属于 Telegram channel 的体验完善项。
  https://github.com/nearai/ironclaw/pull/8072


## 7. 用户反馈摘要

今日数据中 Issues 评论量较少（仅 #6778 有 2 条评论，正文未展示具体评论内容），但从 PR 摘要可提炼出以下明确的用户痛点信号：

- **「我的工具被别人的覆盖了」**：hosted-MCP 多用户场景下，工具目录按扩展 ID 共享一个槽位，后发现的用户直接覆盖前者工具。用户在 issue 中描述为「user A 的调用 → 发现 → A 的工具入注册表；user B 的调用 → 发现 → A 的工具消失」。这直接影响多租户部署的可用性。（#6778）

- **「我的 agent 看不到 skill，但 CLI 也看不到」**：用户排查 skill 不可见问题时，`ironclaw skills list` 返回空列表，将问题错误指向「skill 未安装」而非「CLI 与 runtime 配置不一致」。调试工具给不出正确的排查方向，反而添乱。（#8086）

- **「设了个空字符串，它悄悄用了默认值」**：运维将配置变量设为空字符串，系统静默回退到默认值而非报错——对「设置即

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报 | 2026-09-09

---

## 1. 今日速览

今日项目无新开或关闭的 Issue，处于低社区讨论状态；但合并/关闭了 9 条 PR，其中 8 条由核心贡献者 @btc69m979y-dotcom 在同日内完成，集中修复 **OpenClaw v2026.8.1 升级后引发的系列兼容性与稳定性回归**，覆盖网关启动、外部插件加载、消息分发、定时任务状态持久化等关键链路。另有一项历史功能 PR（#1159 session fork）因长期未合并被标记为 stale 关闭。无新版本发布。整体评估：项目当前处于**"升级后集中修复期"**，工程响应速度快、修复覆盖面广，但社区外部参与度较低，活力度评级为 **中偏上（合并活跃 / 讨论冷淡）**。

---

## 2. 版本发布

今日无新版本发布。当前处于 OpenClaw v2026.8.1 升级后的适配修复阶段，修复成果预计将随下一个版本统一发布。

---

## 3. 项目进展

今日关闭的 9 条 PR 构成了对 OpenClaw v2026.8.1 的**系统性适配**，共覆盖 7 个功能域：`main`、`openclaw`、`renderer`、`cowork`、`docs`、`artifacts`、`build`。按修复主题分组如下：

### 3.1 核心网关与运行时稳定性
- **[#2625] fix(openclaw): stabilize upgrade migration and packaged gateway startup**
  修复升级后旧会话迁移、Agent 配置同步、打包后的 SDK 解析失败导致网关无法启动的问题；同时修复配置被拒绝触发无效重启（`CONFIG_VALIDATION_FAILED`），并缩减 Windows runtime 分发体积。这是今日最综合的稳定性修复。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2625

- **[#2626] fix(openclaw): preinstall external provider plugins**
  修复升级后新增 Qwen 模型时网关因 `requires capability consent` 停止的问题，预安装上游分发为外部插件的 8 个受支持供应商，避免启动时下载与授权。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2626

- **[#2631] fix(cron): correct run history and preparation failure state**
  修复定时任务历史记录与失败状态回归：通过 run-scoped 与 base session 双别名的会话现在只会导入一次；在持久化回执创建前的失败会正确记录为 error 状态，不再残留为 pre- 状态。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2631

### 3.2 外部平台插件兼容（钉钉/飞书/网易系）
- **[#2628] fix(openclaw): restore DingTalk and Lark plugin compatibility**
  修复钉钉在 Windows Jiti loader 下 `Cannot use 'import.meta' outside a module` 以及飞书 SDK 根入口不再导出的问题。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2628

- **[#2630] fix(openclaw): restore DingTalk and Lark message dispatch**
  进一步修复钉钉（`DingTalk runtime not initialized`）和飞书（`runtime.config.loadConfig is not a function`）插件升级后仍无法分发入站消息的问题，使入站文本可进入 agent 分发流程。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2630

- **[#2629] fix(openclaw): restore NIM and NetEase Bee plugin compatibility**
  修复两个网易系插件因 `emptyPluginConfigSchema` 从 `openclaw/plugin-sdk` 根路径移除导致 `ERR_PACKAGE_PATH_NOT_EXPORTED`、无法注册渠道的问题。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2629

### 3.3 交互协议与前端渲染
- **[#2627] fix(openclaw): adapt native ask_user question protocol**
  适配 OpenClaw v2026.8.1 中新的 `question.*` 协议，使原生 `ask_user` 请求能正常唤起桌面对话框，并隐藏泄漏到确认按钮标签中的推荐后缀。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2627

- **[#2624] fix(artifacts): fix HTML thumbnail white screen and Mermaid preview rendering race**
  修复 HTML 缩略图白屏（新增父子帧代次校验、有界等待 CSS 动画）与 Mermaid 预览渲染竞态（隔离渲染任务和容器、完善错误恢复与中英文提示），并补充回归测试与设计文档。
  链接: https://github.com/netease-youdao/LobsterAI/pull/2624

### 3.4 功能性 PR（关闭 / 未合并）
- **[#1159] feat(cowork): add session fork（STALE 关闭）**
  该 PR 在 2026-03-31 提交，为用户提供 "创建分支会话" 功能，经过 5 个月未合并后于今日被标记 stale 关闭。功能本身完整且有价值，见下方"待处理积压"分析。
  链接: https://github.com/netease-youdao/LobsterAI/pull/1159

**小结**：项目今日完成了对 OpenClaw 2026.8.1 升级的"扫尾式"修复，是自升级以来最集中的一次补丁合并，大幅提升了升级后的稳定性与插件可用性。

---

## 4. 社区热点

今日无 Issues 讨论，评论数据均未公开（`undefined`），社区讨论活跃度低。从 PR 的密集程度来看，**真正的"社区热点"是围绕 OpenClaw v2026.8.1 升级后的行为变化**：

- **热度最高的 PR（按更新时间和覆盖范围）**：
  - [#2631] 定时任务状态修复（最后更新于今日，直接关系到 cron 类用户的信任度）
  - [#2625] 打包后网关启动与迁移稳定化（影响所有桌面端用户）

- **背后诉求分析**：用户对"升级后必须重新配置或数据丢失"极为敏感。多条 PR 的标题均指向"restore / stabilize / preinstall"，说明用户期望的是**升级后零摩擦**——即不丢失历史会话、不额外授权、不改变既有插件行为。这种"一切照旧"的稳定性诉求，是当前社区对 LobsterAI 最核心的期待。

---

## 5. Bug 与稳定性

今日共修复 8 个问题/回归，均为 bug 修复，全部已有修复 PR 并已合并（或关闭）。按严重程度排列：

| 严重程度 | 问题描述 | 影响范围 | 修复 PR | 状态 |
|---|---|---|---|---|
| 🔴 严重 | 升级后网关启动失败/无效重启（配置拒绝触发无限重启、SDK 解析失败） | 所有桌面端用户 | #2625 | 已修复 |
| 🔴 严重 | 新增 Qwen 模型时网关因 `requires capability consent` 直接停止 | 使用外部供应商的用户 | #2626 | 已修复 |
| 🟠 中等 | 钉钉、飞书插件加载成功后仍无法处理入站消息 | 钉钉/飞书用户 | #2630 | 已修复 |
| 🟠 中等 | NIM 与网易蜜蜂插件加载失败，渠道无法完成注册 | 网易系插件用户 | #2629 | 已修复 |
| 🟠 中等 | 钉钉（Windows）与飞书插件加载失败 | Windows 用户 | #2628 | 已修复 |
| 🟠 中等 | 原生 `ask_user` 请求不弹桌面对话框，等待超时 | 所有使用确认/提问场景的用户 | #2627 | 已修复 |
| 🟡 一般 | 定时任务历史记录异常（重复导入）、失败状态未持久化（停留在 prepare 阶段） | 定时任务用户 | #2631 | 已修复 |
| 🟡 一般 | HTML 缩略图白屏、Mermaid 渲染竞态导致错误结果展示 | 使用 artifacts 预览的用户 | #2624 | 已修复 |

**风险提示**：#2628 与 #2630 之间存在依赖关系（#2630 是 #2628 的后续），说明钉钉/飞书的问题存在"加载成功但分发失败"的多层故障，用户在升级后可能遇到两种症状先后出现的情况，需要确保补丁完整升级到位。

---

## 6. 功能请求与路线图信号

今日没有新功能请求或 Issue 提出。从已有的 PR 中可提取以下路线图信号：

- **插件生态的兼容层**：多平台插件（钉钉、飞书、NIM、网易蜜蜂）的反复修复表明，LobsterAI 正在构建一个需要长期维护的"外部插件兼容层"。未来大概率会在版本发布前加入针对 `openclaw/plugin-sdk` 变更的自动化测试或兼容性检测工具。
- **Session Fork（分支会话）**：PR #1159 在今日被 stale 关闭，但其功能描述（从详情页动作菜单创建分支会话、保留原有状态）仍是协作场景下的真实痛点。虽然被自动关闭，功能本身可能以其他形式在未来版本中落地（例如重构后重新提交）。
- **Mermaid 渲染生命周期**：PR #2624 修复了渲染竞态，同时实现了渲染任务的隔离与错误恢复。这是从"能用"到"稳定"的成熟化信号，未来可能进一步支持更多图表类型或导出能力。
- **企业配置兼容**：#2625 中明确提到"兼容企业配置中的旧 roster"，意味着开发者正在关注企业级用户的多 Agent 配置平滑迁移，这将是产品商业化/企业化的重要信号。

---

## 7. 用户反馈摘要

由于今日没有 Issue 评论数据（均为 `undefined`），以下反馈来自修复 PR 中描述的用户可见症状：

- **升级焦虑**：多条 PR 的修复对象都是"升级前正常、升级后立即异常"的断崖式问题。用户最痛的点是 **"升级 OpenClaw 2026.8.1 后，原本配置好的日常链路突然断裂"**——包括定时任务状态丢失、IM 消息进不来、新增模型时网关直接宕机。
- **Windows 用户是重要观察样本**：钉钉的 `import.meta` 报错仅出现在 Windows Jiti Loader 环境下，说明 Windows 桌面端是 LobsterAI 的关键使用场景，且对 Node/打包兼容性要求严格。
- **对"静默失败"的容忍度低**：`ask_user` 请求等待回答却没有弹出对话框，这类"看起来卡住"的问题比明确报错更让用户崩溃。修复它能明显提升升级后用户满意度。
- **企业对配置平滑迁移有强需求**：#2625 提到兼容企业配置旧 roster 和 `agents.entries` 输出调整，表明已有企业客户在持续升级，且对多 Agent 配置的迁移一致性有严格要求。

---

## 8. 待处理积压

今日重点关注 1 项长期积压：

- **[#1159] feat(cowork): add session fork**
  - 状态：CLOSED（stale）
  - 创建于 2026-03-31，今日被标记 stale 关闭
  - 功能内容：在会话详情页的"⋯"菜单中添加"创建分支会话"功能，支持用户从任意协作会话分支出一份副本，保留原有上下文继续探索不同方向。
  - 价值判断：该功能直接解决"多方向实验"这一 AI 协作常见场景，产品价值较高；但 5 个月未获合并说明可能因架构变更、优先级排期或评审周期而搁置。
  - 行动建议：建议维护者明确表态——要么重新开放该 PR 排入里程碑，要么在 Roadmap 中说明该功能将以何种形式落地，避免贡献者（@vdorchan）的有效工作无果而终。
  - 链接: https://github.com/netease-youdao/LobsterAI/pull/1159

---

**结语**：LobsterAI 今日的活跃度集中在"消化升级代价"上，8 个 fix PR 在一天内完成合并，体现了项目组对稳定性的重视和高效的工程执行力。下一步关注节点：新版本发布是否包含今日修复、session fork 功能是否会被重新激活、以及 OpenClaw 后续版本的升级节奏是否能避免此类大规模回归。

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

# CoPaw 项目动态日报 — 2026-09-09

> 数据来源：GitHub 仓库 [agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)（CoPaw 项目主仓库）

---

## 1. 今日速览

过去 24 小时项目活跃度高：**31 条 Issues 更新**（新开/活跃 16、关闭 15），**46 条 PR 更新**（待合并 22、已合并/关闭 24），并发布 **v2.2.1-beta.1**。稳定性修复是今日主线——围绕 PDF/二进制文件块、MCP 401 误判、Shell stdin 阻塞、Console 消息队列竞态等问题的修复 PR 集中合入，且部分直接对应社区高频反馈的 Issue（如 #7559、#7554、#7620、#7612）。与此同时，**模型回复从上下文丢失（#7579）** 和 **心跳 cron 反馈循环致代理失联（#7589）** 两个高严重度 Bug 仍在排查中，尚未有修复 PR 关联，需持续关注。

---

## 2. 版本发布

### v2.2.1-beta.1
发布时间：2026-09-09（最近 24 小时内）

**更新内容（来自 Release Notes）：**
- ✨ **feat: add agent model routing settings** — 新增 Agent 模型路由设置，支持更精细的模型分发控制（PR [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)，作者 @zhaozhuang521）
- 📝 **docs: update website for v2.2.0** — 官网文档同步 v2.2.0 功能（PR [#7517](https://github.com/agentscope-ai/QwenPaw/pull/7517)，作者 @cuiyuebing）
- 🔧 **fix(chat): sync resolved sessions during streaming** — 修复流式过程中已解决会话状态同步问题（PR 号未在 Release Notes 中完整展示）

**风险提示：** 该版本为 **beta 序列**（v2.2.1-beta.1），官方未在发布说明中标注破坏性变更。对于生产环境用户，建议等待正式版；当前正使用 v2.2.0 且遇到 PDF 文件块或 MCP 相关问题的用户，可在测试环境验证此版本。

---

## 3. 项目进展

今日合入/关闭的 PR 集中在 **5 个方向**，对应修复已覆盖 5 个用户报告的 Bug：

| 领域 | 合并 PR | 解决的问题 |
|------|---------|-----------|
| **Agent 请求归一化** | [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) fix(agents): handle PDF blocks for text-only models | 纯文本模型收到 PDF DataBlock 导致请求失败 |
| **Console 消息队列** | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) fix(console): prevent chat submissions from bypassing the queue | 修复 #7559（任务执行中发消息触发 409） |
| **Shell 工具稳定性** | [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) fix(shell): detach child stdin from interactive console | 修复 #7554（Windows 下子进程继承 stdin 导致挂起） |
| **MCP 兼容性** | [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) fix(mcp): let the legacy handshake arbitrate a 401 discover probe | 修复 #7620（MCP 服务器返回非标准 401 被误判为 OAuth） |

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 — 2026-09-09

## 1. 今日速览

ZeptoClaw 过去 24 小时保持稳健迭代：2 个安全类 Issue（#651 依赖漏洞、#652 敏感文件权限）全部关闭，安全加固 PR #673 完成合并/关闭，同时新的安全增强 PR #674 进入待合并队列。社区侧新增 1 个 OrcaRouter provider 功能请求（#675），维护者发起的内存系统增强 Issue #666（P2-high）持续获得讨论。整体项目重心集中在安全加固与依赖治理，内存系统与 Provider 生态扩展是明确的下一步方向。维护者 @qhkm 响应迅速，项目健康度良好，活跃度评估为中等偏上。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

- **PR #673（已合并/关闭）— fix(security): harden secret storage and dependencies**
  今日最重要进展。该 PR 将 `config.toml` 与 `panel.token` 等敏感文件权限修复为 `0600`，ZeptoClaw 自有目录权限收紧为 `0700`，并自动修复旧版本遗留的错误权限；同时修复 7 个 RustSec 已知漏洞（h2、quick-xml、lopdf、bcrypt、quinn-proto、crossbeam-epoch 等）。该 PR 同时关闭 Issue #651 和 #652，标志着项目在零容忍安全策略（`deny.toml` 中 `ignore = []`）下的依赖治理与本地凭证保护取得实质性进展。
  https://github.com/qhkm/zeptoclaw/pull/673

- **PR #674（待合并）— fix(panel): replace websocket bearer URLs with tickets**
  将 Panel WebSocket 连接中携带长期 API token / JWT 的 `?auth=` 参数替换为 30 秒一次性 ticket，并通过 CSRF 保护的认证端点发放。该修复消除凭证泄露至访问日志与浏览器历史的风险，是 #673 之后又一项安全加固，目前等待 review/merge。
  https://github.com/qhkm/zeptoclaw/pull/674

## 4. 社区热点

- **Issue #666（OPEN，P2-high）— 记忆系统持久化与事务性写入**
  由维护者 @qhkm 发起，是今日讨论深度最高的议题（1 条评论）。核心诉求：在保留 ZeptoClaw 选择性检索低成本优势（pinned entries + 最多 5 条查询匹配记忆，2000 字符预算，见 `src/memory/mod.rs:34–35,

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

## EasyClaw 项目动态日报 — 2026-09-09

### 1. 今日速览

项目今日整体处于**迭代发布日**状态：过去24小时内无新 Issue、无新 PR，但发布了 **v1.9.7** 版本，带来达人店铺视图、工作台筛选、店铺别名与联盟派发去重等多项功能更新。社区互动较低（0 Issue / 0 PR），属于典型的「静默开发、集中交付」节奏。活跃度评估为**低互动、高产出**，开发侧持续向前推进，社区侧暂无新增讨论热点。

---

### 2. 版本发布

**v1.9.7**（TK Copilot v1.9.7）  
🔗 [查看 Release 详情](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.7)

**新增内容：**
- 新增 **达人店铺视图**，整合创作者店铺入口，提升多店铺管理效率。
- 新增 **受保护的工作台筛选**，仅对已授权的 Agent 激活店铺开放可见性，权限区分更精细。
- 人工运营店铺的访问权限与 Agent 激活状态**解耦**，运营人员不再因 Agent 未激活而无法访问店铺。
- 创作者消息头中**优先使用店铺别名**（Shop Alias），提升消息可识别性。
- 联盟派发（Affiliate Dispatch）按快照去重，**避免重复派发**导致的任务冗余。

**破坏性变更：**
- 未发现明确标记的 Breaking Changes。但「店铺访问不再依赖 Agent 激活状态」属于**权限行为调整**，若现有自动化流程依赖旧逻辑（如 Agent 未激活时必须拦截访问），需额外确认行为是否符合预期。

**迁移注意事项：**
- 建议更新后检查工作台筛选规则，确保受保护店铺的可见范围与团队权限配置一致。
- 若多店铺场景下依赖消息头中的店铺名称，请确认现有数据中店铺别名已正确配置。

---

### 3. 项目进展

今日无已合并/关闭的 PR（0 条）。但 v1.9.7 的发布本身就是项目前进的重要标志，主要推进了以下方向：

- **店铺运营体验**：从代理商后台剥离出独立的达人店铺视图，并对人工运营场景做了权限解耦，属于面向运营效率的体验优化。
- **系统稳定性**：联盟派发去重机制的引入，降低了重复任务造成的资源浪费与潜在冲突。

整体而言，项目在**权限模型优化**与**任务调度健壮性**上迈出了实质性一步。

---

### 4. 社区热点

今日无新开或活跃的 Issue / PR，因此无高热度讨论话题。

无讨论是否意味着项目健康度下降？不一定。结合近期版本发布节奏，社区可能处于「等待验证新版本」的观望期。建议维护者关注 v1.9.7 发布后 48-72 小时内的用户反馈，尤其是权限调整带来的使用问题。

🔗 [查看 Issues](https://github.com/gaoyangz77/easyclaw/issues)  
🔗 [查看 Pull Requests](https://github.com/gaoyangz77/easyclaw/pulls)

---

### 5. Bug 与稳定性

今日未报告新的 Bug、崩溃或回归问题。

需注意：v1.9.7 中「店铺访问与 Agent 激活状态解耦」涉及权限模型变更，属于潜在回归风险点。建议维护者近期重点观察以下场景：

- 原依赖「Agent 激活状态拦截店铺访问」的逻辑是否在旧版客户端/自动化脚本中出现异常行为。
- 受保护工作台筛选在大量店铺账号存在时，是否有性能回退。

目前无对应 fix PR。

---

### 6. 功能请求与路线图信号

今日无新提交的功能请求。

从 v1.9.7 的发布内容可以捕捉到产品路线图的潜在方向：

- **精细化权限管理**：受保护工作台筛选 + 店铺访问与 Agent 解耦，说明项目正在从「单一代理商视角」向「多角色协同运营」演进。
- **数据一致性治理**：联盟派发去重机制表明系统已开始关注任务幂等性与数据冗余问题，未来可能在更多模块引入类似机制。

这些信号可作为下一版本（v1.10+）可能增强方向的参考。

---

### 7. 用户反馈摘要

今日无新 Issues 评论可供提炼。

基于 v1.9.7 的更新内容，推测用户关注的核心问题集中在：

- **运营时效性**：此前店铺访问依赖 Agent 激活状态，可能导致运营人员等待 Agent 启动才能工作。本次解耦直接回应了该痛点。
- **多店铺识别**：消息头中优先使用店铺别名，说明真实场景中存在同名店铺或默认名称难以辨识的困扰。
- **任务可靠性**：联盟派发重复执行是一个容易被忽视但影响较大的问题，本次修复将直接减少运营中的重复劳动。

*注：以上为基于版本变更内容的间接推断，非直接用户评论。*

---

### 8. 待处理积压

当前 Issues 与 PR 积压为 **0 条**，无长期未响应的问题。

项目维护状态健康，不存在被忽视的社区反馈。建议继续保持当前的响应节奏，并在下次发布时附带更详细的升级说明，以应对潜在的权限行为变化引发的疑问。

🔗 [项目主页](https://github.com/gaoyangz77/easyclaw)

---

**总结**：EasyClaw 今日处于「低互动、高产出」状态，v1.9.7 是一次以运营效率和系统健壮性为核心的迭代。项目整体健康度良好，暂无积压问题；后续关注点为权限变更带来的潜在回归及新版本用户反馈。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*