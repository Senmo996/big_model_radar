# OpenClaw 生态日报 2026-09-29

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-29 03:09 UTC

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

# OpenClaw 项目动态日报 — 2026-09-29

## 1. 今日速览

过去 24 小时项目活跃度极高：**500 条 Issue 更新**（新开/活跃 430，关闭 70）和 **500 条 PR 更新**（待合并 314，已合并/关闭 186）。当前**无新版本发布**，但积压的 P0 级问题密度令人担忧——多个严重问题（内存泄漏、启动崩溃循环、更新阻断）已持续多日且大多无关联修复 PR。值得注意的是，社区报告高度集中在 **2026.9.5/9.6 两个版本的回归**上，尤其是 `prepared-model-catalog.worker.js` 的无界内存泄漏（至少 4 个独立 issue 报告同一根因），以及 `openclaw update` 的反复失败。项目健康度评估：**高风险**——功能迭代节奏快，但稳定性欠账显著，版本升级通道受阻已成为当前最大瓶颈。


## 2. 版本发布

过去 24 小时无新版本发布。2026.9.7 的修复追踪见 [#157531](https://github.com/openclaw/openclaw/issues/157531)（内部 tracker，18/21 个 P1 候选已确立）。


## 3. 项目进展

> 注：今日 500 条 PR 更新中已合并/关闭 186 条，但重点 PR 列表多为开放状态。以下基于可见 PR 数据进行分析。

**结构性重构推进（steipete 系列 "deslop" 清理）**：今日提交了至少 9 个大规模重构 PR，覆盖调度器、CLI、Discord/Slack 渠道、基础设施、Apple/macOS 代码、投递队列、cron 清理等模块。这些 PR 均为第五/六轮清理（如 [#159527](https://github.com/openclaw/openclaw/pull/159527)、[#160823](https://github.com/openclaw/openclaw/pull/160823)、[#160900](https://github.com/openclaw/openclaw/pull/160900)、[#160850](https://github.com/openclaw/openclaw/pull/160850)、[#160858](https://github.com/openclaw/openclaw/pull/160858)），核心目标是删除转发层、重复投影和冗余状态，不影响用户可见行为。这说明项目正在系统性地还技术债，但 PR 堆积（314 条待合并）本身也是一个信号——审查吞吐跟不上提交速度。

**关键修复 PR 待审查**：
- [#160465](https://github.com/openclaw/openclaw/pull/160465)（P1，platinum hermit）—— 修复 worker 在进程组信号被拒绝时卡死、阻塞下一轮 turn 的问题。这是与多个 P0 crash-loop 相关的深层修复。
- [#156020](https://github.com/openclaw/openclaw/pull/156020)（P1，security-boundary）—— 修复插件目录轮换后同 turn 内所有 `exec` 被误判为 unknown risk 而失败关闭的问题。
- [#158369](https://github.com/openclaw/openclaw/pull/158369)（P1）—— 修复 provider-catalog 刷新时的重复插件注册及嵌套命令回调泄漏。
- [#160918](https://github.com/openclaw/openclaw/pull/160918) —— 修复 OpenRouter 模型在目录刷新后继续使用已下架的 reasoning effort（如 `xhigh`）的问题。

**运维能力增强**：[#158723](https://github.com/openclaw/openclaw/pull/158723) 为 `openclaw doctor` 增加 `--externally-managed` 模式，使容器/系统控制器可以安全请求修复而不触碰部署方拥有的配置；[#160877](https://github.com/openclaw/openclaw/pull/160877) 为 btrfs 上的大型 SQLite 存储增加 NOCOW 预分配与离线修复，针对 32.5GB 存储、数万 extents 的碎片化性能退化。


## 4. 社区热点

**🔥 [#153257 — 升级到 2026.9.5 导致 8 小时故障恢复（39 评论）](https://github.com/openclaw/openclaw/issues/153257)**
用户明确表示“后悔升级”，环境从稳定变为连续 8 小时的恢复会话。评论数断层第一，反映出用户对版本升级的信任危机，且该 issue 已被标记 `P0`、`impact:ux-release-blocker`、`gold shrimp`。背后诉求是：**升级路径的可靠性必须成为最高优先级的发布门禁**。

**🔥 [#149538 — Gateway 就绪但 /health 探针全部超时，632 agent 舰队宕机（22 评论）](https://github.com/openclaw/openclaw/issues/149538)**
Gateway 打印 `[gateway] ready` 后事件循环被饿死，RSS 持续攀升直至 OOM。P0 + `impact:crash-loop` + `recovery-stuck`，这是一个典型的严重回归且目前无修复 PR。

**🔥 [#157067 — Windows 隔离 cron 传入不可克隆的 Proxy 对象（17 评论）](https://github.com/openclaw/openclaw/issues/157067)**
`cloneEnvWithPlatformSemantics` 返回的 Proxy 无法被 `Worker.postMessage` 克隆，导致 Windows 上隔离 cron 在推理前即失败。P1 + `linked-pr-open`，已有相关 PR。

**🔥 [#97616 — hook/tool 子进程泄漏形成僵尸进程（16 评论，已存活 3 个月）](https://github.com/openclaw/openclaw/issues/97616)**
6 月底报告的问题至今未修复，说明长期存在且涉及进程生命周期管理的结构性缺陷。

**🔥 [#40001 — write 工具缺少 append 模式，隔离 cron 会话静默覆盖共享文件（16 评论，已存活 6.5 个月）](https://github.com/openclaw/openclaw/issues/40001)**
P0 + `impact:data-loss` + `needs-product-decision`。从 3 月拖到现在的数据丢失问题——已经不是一个 bug，而是一个已知的设计缺陷未决策。


## 5. Bug 与稳定性

按严重程度排列（🔴 = P0 / 稳定版回归 / 数据丢失类；🟠 = P1 / 高风险）：

**🔴 内存泄漏：prepared-model-catalog worker（今日焦点）**
- [#159662](https://github.com/openclaw/openclaw/issues/159662)—— 无界内存泄漏，4-5 GB/h，提供商无关（冷重启 + 提供商二分已复现），**无 fix PR**
- [#160548](https://github.com/openclaw/openclaw/issues/160548)—— 每 5 分钟泄漏 ~1 GiB，达到 8-13 GiB 后触发回收，而每次回收都会作废所有等待中的 turn，**无 fix PR**
- [#159596](https://github.com/openclaw/openclaw/issues/159596)—— 内存“锯齿”循环，每天约 200 次 critical memory-pressure 事件，**无 fix PR**
- [#159514](https://github.com/openclaw/openclaw/issues/159514)（已关闭）—— 每次请求重建发现注册表，每请求增长 ~8MB。**已关闭但未看到合并 PR 关联**，可能只是 issue 整理

**🔴 更新阻断（用户无法升级到 9.5/9.6）**
- [#154114](https://github.com/openclaw/openclaw/issues/154114) —— `openclaw update` 在“候选迁移预演”阶段失败，报“No usable, authenticated, tool-capable inference route”，尽管线上 Gateway 的模型认证正常
- [#154924](https://github.com/openclaw/openclaw/issues/154924) —— 全局安装失败（global-install-failed），linux/x64
- [#156986](https://github.com/openclaw/openclaw/issues/156986) —— 更新在 `update-candidate-state` 阶段挂起，worker 输出 233MB+ 并陷入重生循环
- [#145072](https://github.com/openclaw/openclaw/issues/145072)（已关闭）—— macOS npm 更新失败（launcher 指纹含 symlink 模式、备份副本未 chmod）。已关闭，属修复完成

**🔴 崩溃/卡死循环**
- [#158936](https://github.com/openclaw/openclaw/issues/158936) —— macOS 看门狗在冷启动 40-70s 时 SIGTERM 仍在合法启动的 Gateway，导致重启循环，**已有 fix 形状清晰但无 PR**
- [#157160](https://github.com/openclaw/openclaw/issues/157160) —— 9.6 自动更新后 schema 迁移 17→18 成功但 Gateway 持续 crash-loop
- [#156917](https://github.com/openclaw/openclaw/issues/156917) —— state-lifecycle 租约无心跳/强制接管，一个挂死的客户端阻塞 Gateway 启动 31 分钟
- [#160521](https://github.com/openclaw/openclaw/issues/160521) —— 状态库读取准入封印 → 工作环境清单已关闭 → reconcileActive 未处理拒绝

**🔴 数据丢失**
- [#40001](https://github.com/openclaw/openclaw/issues/40001) —— write 工具无 append 模式，隔离 cron 覆盖共享内存文件（存活 6.5 个月）

**🟠 消息丢失 / 投递失败**
- [#152965](https://github.com/openclaw/openclaw/issues/152965) —— 热重载非渠道插件导致渠道插件被销毁且未重连
- [#157389](https://github.com/openclaw/openclaw/issues/157389) —— feishu 渠道多车道负载下丢回复（三重失效模式）
- [#159612](https://github.com/openclaw/openclaw/issues/159612) —— 子代理完成结果因“owner changed before settlement”无限重试，每轮重新注入
- [#150132](https://github.com/openclaw/openclaw/issues/150132) —— claude-cli 长输出被冻结的 8MiB 每轮 stdout 上限截断，最终回复被丢弃

**🟠 其他高影响**
- [#157989](https://github.com/openclaw/openclaw/issues/157989) —— 插件源码捕获导致每 CLI 命令重写 1.1-1.4 GB、每 Gateway 启动 6.5 GB 数据，严重 SSD 磨损
- [#155859](https://github.com/openclaw/openclaw/issues/155859) —— Gateway 启动耗时与插件数量成正比，discord/codex/weixin 插件各占数十秒
- [#158095](https://github.com/openclaw/openclaw/issues/158095) —— state-lifecycle 获取后未释放，后续所有获取失败直到重启
- [#158239](https://github.com/openclaw/openclaw/issues/158239) —— 无 `openat2`（kernel < 5.6）的慢速主机上 Gateway 启动失败


## 6. 功能请求与路线图信号

虽然没有新版本发布，但以下功能请求值得关注：

**可能进入 2026.9.7**：
- **write 工具追加模式**（[#40001](https://github.com/openclaw/openclaw/issues/40001)）—— P0 数据丢失问题，已标记 `needs-product-decision`。当前架构下隔离 cron 会话无法安全共享文件，任何涉及多会话共享状态的用户都受影响
- **Databricks Unity Gateway 官方支持**（[#155633](https://github.com/openclaw/openclaw/issues/155633)）—— 实现 PR [#155634](https://github.com/openclaw/openclaw/issues/155634) 已存在，企业用户需要。属低风险新增
- **Talk Mode 空闲超时**（[#46844](https://github.com/openclaw/openclaw/issues/46844)）—— P3，但有用户 👍，语音唤醒后管线无限保持活跃导致 token 浪费，体验问题

**讨论中/规划中**：
- **cron 维护窗口与角色隔离**（[#120244](https://github.com/openclaw/openclaw/issues/120244)）—— RFC 级别，P3。提议每日维护窗口内延迟非名册 cron/heartbeat 工作并在退出时按 FIFO 重放。与现有问题的关联性不强，优先级较低
- **Onboarding 向导强制 Memory/Embedding 配置**（[#16670](https://github.com/openclaw/openclaw/issues/16670)）—— P2，2 个 👍。合理的产品改进：内存搜索是核心竞争力，但新用户根本没被告知需要配置 embedding

**路线图信号判断**：2026.9.7 的修复 tracker（[#157531](https://github.com/openclaw/openclaw/issues/157531)）显示 18/21 个 P1 候选已确立，主要集中在**隐私/安全边界、内存泄漏和更新可靠性**。功能请求大概率要等 9.7 之后才能进入。


## 7. 用户反馈摘要

**“升级即风险”已成为社区共识。** [#153257](https

---

## 横向生态对比

## 横向对比分析报告：个人 AI 助手与自主智能体开源生态（2026-09-29）

---

### 1. 生态全景

当前个人 AI 助手与自主智能体开源生态呈现**高活跃、强分化**态势：以 OpenClaw 为首的头部项目保持着极高的提交与讨论量，但深陷内存泄漏、更新阻断等 P0 级稳定性危机，社区信任度承压；NanoBot、Zeroclaw、NanoClaw 等第二梯队项目则在高频迭代中同步推进安全加固与体验优化，整体健康度更优。数据完整性、升级可靠性与工具输出恢复能力成为跨项目共性痛点，生态正从“功能扩张”进入“稳定性补课”阶段。与此同时，外部贡献者数量上升但维护者审查吞吐不足，导致 PR 积压与社区分叉现象初现。

---

### 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|------|------------|---------|---------|------------|
| **OpenClaw** | 500（430活跃/70关闭） | 500（314待合并/186合并关闭） | 无 | 高风险：P0 密度高，升级通道受阻 |
| **NanoBot** | 7（6开放/1关闭） | 23（14待合并/9合并关闭） | 无 | 中高：迭代快，但 P0 原子写待合并 |
| **Zeroclaw** | 49（25活跃/24关闭） | 50（39待合并/11合并关闭） | 无 | 良好：高风险项均有对应修复 |
| **PicoClaw** | 6（新开/活跃） | 10（待合并，无合并） | 无 | 活跃但维护瓶颈：PR 合并慢 |
| **NanoClaw** | 4（3关闭/1新开） | 32（19合并关闭/13待合并） | 无 | 良好：update 链路 bug 较集中 |
| **IronClaw** | 2（新开） | 5（4开放/1关闭） | 无 | 良好：文档 PR 积压较长 |
| **LobsterAI** | 5（4活跃/1关闭） | 14（13合并关闭/1待合并） | 无 | 良好：功能扩展+稳定性并行 |
| **TinyClaw** | 无活动 | 无活动 | 无 | 静默 |
| **Moltis** | 0 | 1（待合并） | 无 | 低活跃，生态扩展中 |
| **CoPaw** | 7（5活跃/2关闭） | 16（14待合并/2合并关闭） | 无 | 中等：社区活跃，稳定性修复优先级需提高 |
| **ZeptoClaw** | 2 | 1（待合并） | 无 | 良好：功能改进闭环形成 |
| **EasyClaw** | 0 | 0 | 1（v1.9.25） | 稳定：版本迭代正常 |

---

### 3. OpenClaw 在生态中的定位

- **优势**：社区规模与生态辐射力断层第一，24 小时 Issue + PR 更新量达 1000+，是其他项目总量的数倍至数十倍。模块覆盖 Gateway、模型目录、渠道适配、cron、worker、插件系统等，功能完整度领先。
- **技术路线差异**：采用“重网关 + 多进程 worker + 可插拔渠道”的架构，强调统一调度与横向扩展；相比之下 NanoBot 更轻量、聚焦对话体验，Zeroclaw 侧重安全与多租户，NanoClaw 则以容器化和本地模型为特色。
- **社区规模对比**：OpenClaw 的 issue 讨论量（如单条 39 评论）远超其他项目，但问题密度也最高。其当前困境——更新回归、内存泄漏、修复 PR 堆积——恰恰说明规模带来的维护复杂度，同时也使其成为整个生态稳定性的“风向标”。其他项目在功能设计上多受 OpenClaw 启发（如渠道层、工具调用范式），但更注重规避其稳定性教训。

---

### 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|------|---------|----------|
| **升级/更新可靠性** | OpenClaw、NanoClaw、PicoClaw | `openclaw update` 失败、`/update-nanoclaw` 假完成、32-bit ARM 误装错误包——升级路径必须具备自校验与回滚能力，且不得破坏现有部署 |
| **数据完整性与原子写** | NanoBot、Zeroclaw、OpenClaw、PicoClaw | 并发文件写入需原子化（NanoBot PR#5953），OpenClaw write 工具缺乏 append 模式导致覆盖，Zeroclaw 已修复同路径竞争，PicoClaw 配置持久化丢失 |
| **工具输出超限处理** | ZeptoClaw、OpenClaw、NanoBot | 输出截断后需可恢复（ZeptoClaw spill 方案），OpenClaw stdout 截断导致消息丢失，NanoBot 需结构化错误传播避免“假成功” |
| **渠道/消息边界过滤** | NanoBot、OpenClaw、CoPaw、PicoClaw | 飞书渠道泄漏内部隐藏消息（NanoBot），Feishu 丢回复（OpenClaw），Telegram HTML 解析错误（CoPaw），异步结果投递错会话（PicoClaw） |
| **子代理/会话生命周期管理** | OpenClaw、NanoBot、Zeroclaw、CoPaw | 子代理所有者变更导致无限重试（OpenClaw），子会话持久化需求（NanoBot），委托时内存所有者保留（Zeroclaw），TaskTracker 僵尸条目（

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-09-29）

## 今日速览

过去 24 小时项目活跃度较高：共更新 7 条 Issue（6 条开放、1 条关闭）和 23 条 PR（14 条待合并、9 条已合并/关闭），无新版本发布。社区讨论集中在飞书（Feishu）会话消息泄漏、sudo 授权循环、WebUI 流式速率显示等真实使用痛点。修复侧进展显著，包括 web_fetch 错误传播、WebUI 标题生成兼容 GPT-6、tokenizer 后台预热、以及针对并发文件写入损坏的 p0 级原子写 PR。整体看，项目正处于高频迭代与社区反馈快速吸收阶段，但长期 PR 积压和部分高优 bug 仍需关注。

---

## 项目进展

今日关闭/合并的 PR 中，5 条为近期新提交的修复与增强，另有 3 条长期遗留 PR 因冲突或过期被清理。

### 重要合并/关闭

- [#5949 fix(web): propagate web_fetch failures as structured tool errors](https://github.com/HKUDS/nanobot/pull/5949)  
  修复 `web_fetch` 失败时仍被报告为成功执行的问题，失败请求现在会进入标准错误生命周期，并触发恢复引导，提升工具调用可靠性。

- [#5952 fix(webui): restore Codex title generation and diagnose API failures](https://github.com/HKUDS/nanobot/pull/5952)  
  解决 WebUI 标题生成强制传入 `reasoning.effort="none"` 导致 GPT-6 Astra 返回 HTTP 400 的问题，改为使用模型默认 reasoning，避免主回复成功但后台标题请求失败的情况。

- [#5861 fix(tokens): warm fallback tokenizer in background](https://github.com/HKUDS/nanobot/pull/5861)  
  在网关注册时后台预热 fallback tokenizer，CLI/SDK 场景下惰性预热；就绪前使用 UTF-8 字节估算，减少长会话首字延迟。

- [#5948 feat(tools): use installed ripgrep for native file search](https://github.com/HKUDS/nanobot/pull/5948)  
  当环境装有 ripgrep 时，内容搜索与文件发现自动使用 `rg` 替代 `grep`/`find_files`，支持原生参数数组，提升大仓库搜索性能。

- [#5951 docs: refresh contributors and preserve historical credits](https://github.com/HKUDS/nanobot/pull/5951)  
  更新 README 贡献者墙至 392 个账户，新增 27 位贡献者，并改进更新脚本以保留历史署名。

### 遗留 PR 清理

- [#1355 Fix/image perserveration](https://github.com/HKUDS/nanobot/pull/1355)
- [#1443 feat: decouple heartbeat reasoning from notification](https://github.com/HKUDS/nanobot/pull/1443)
- [#1502 feat(mcp): add support for enabling and disabling tools in MCP server configuration](https://github.com/HKUDS/nanobot/pull/1502)

这 3 条 PR 创建于 2 月至 3 月，均在今日关闭，标签中含 `conflict`，推测因长期未合并或与主线冲突被关闭。其中 `heartbeat` 解耦和 MCP 工具开关是较有价值的功能，建议维护者在后续规划中评估是否有必要重开。

---

## 社区热点

今日讨论最活跃的 Issue 集中在可用性和渠道体验两个方向：

- [#5924 Agent gets stuck in sudo loop - becomes unusuable](https://github.com/HKUDS/nanobot/issues/5924)  
  评论：5 条。用户反馈 sudo 授权仅持续一个 turn，agent 在授权过期后陷入无限重试；同时达到最大迭代次数后仍会执着于无法执行的命令。这是典型的“沙箱权限生命周期与 agent 执行状态不一致”问题，直接影响可用性，且仅标记为 p1，疑似应上探至 p0。

- [#5903 Feishu: hidden session-checkpoint marker is delivered to the user after idle compaction](https://github.com/HKUDS/nanobot/issues/5903)  
  评论：4 条。飞书渠道会将内部会话检查点消息“Continue the active task...”以普通消息形式推送给用户，即使该消息带 `_hidden` 标记。暴露内部提示词细节，属于渠道层过滤缺失。

- [#5908 feat(webui): show live tokens/sec while streaming a reply](https://github.com/HKUDS/nanobot/issues/5908)  
  评论：4 条。用户希望在流式输出时看到实时 tokens/sec，以便判断模型是正常生成还是停滞。该需求同时涵盖可观测性与用户体验，社区有明显共鸣。

- [#5898 gpt-6 model series through Github Copilot](https://github.com/HKUDS/nanobot/issues/5898)  
  评论：3 条。v0.3.5 无法通过 GitHub Copilot 调用 OpenAI 6 系列模型，报错“Mode provider request failed”。新模型兼容性问题，预计会吸引较多关注。

围绕这些热点的共同诉求是：**agent 运行时状态的可观测性**以及**渠道/权限边界的一致性**。这与项目当前在 WebUI、飞书、exec 工具等方向的迭代高度相关。

---

## Bug 与稳定性

按严重程度排列：

| 严重程度 | Issue/PR | 问题 | 状态 |
|---|---|---|---|
| P0 | [#5953 fix(tools): atomic writes for file tools](https://github.com/HKUDS/nanobot/pull/5953) | `WriteFileTool`/`EditFileTool`/`ApplyPatchTool` 使用非原子写入，可能导致 torn reads 和崩溃窗口丢数据 | 有修复 PR，待合并 |
| P1 | [#5924 Agent gets stuck in sudo loop](https://github.com/HKUDS/nanobot/issues/5924) | sudo 授权只在一轮有效，agent 陷入循环且无法恢复 | 开放，暂无 fix PR |
| P1 | [#5898 gpt-6 series through Github Copilot fails](https://github.com/HKUDS/nanobot/issues/5898) | v0.3.5 无法通过 Copilot 使用 GPT-6 系列模型 | 开放，暂无 fix PR |
| P2 | [#5903 Feishu checkpoint marker delivered to user](https://github.com/HKUDS/nanobot/issues/5903) | 飞书渠道泄漏内部 session-checkpoint 提示词 | 开放，暂无 fix PR |
| P2 | [#5956 Feishu compaction notice cannot be disabled](https://github.com/HKUDS/nanobot/issues/5956) | `ContextCompactionEvent` 硬编码发送到频道，用户希望可关闭（与 #5784 同类） | 开放，暂无 fix PR |
| P2 | [#4798 Concurrent file writes from different sessions not serialized](https://github.com/HKUDS/nanobot/issues/4798) | 多会话同时写同一文件导致数据损坏 | 开放；已有关联 PR #5953 可修复 |
| 已关闭 | [#5843 BUILD stage latency on long sessions](https://github.com/HKUDS/nanobot/issues/5843) | 长会话 BUILD 阶段等待 10 秒以上 | 已关闭，可能已由 tokenizer 预热 PR 缓解 |

其中 #5953 是今日新提交的 p0 修复，直接对应 #4798 的根因，建议维护者优先 review 并合并，以消除文件损坏风险。

---

## 功能请求与路线图信号

以下 PR/Issue 显示了近期可能的路线图方向：

### 新 Provider 与工具后端

- [#5955 feat(providers): add Claude on Vertex AI](https://github.com/HKUDS/nanobot/pull/5955)  
  通过 `AsyncAnthropicVertex` 支持在 Google Vertex AI 上运行 Claude，支持 ADC 与 project/region 配置。

- [#5945 feat(web-fetch): add optional Unbrowse reader backend](https://github.com/HKUDS/nanobot/pull/5945)  
  为 `web_fetch` 增加 Unbrowse 作为可选后端，无 key 时保持现有回退链不变。

- [#5212 feat: add MiniMax music guidance](https://github.com/HKUDS/nanobot/pull/5212)  
  为音乐 provider 堆栈增加 MiniMax 生成流程的可发现性。

### Agent 执行机制增强

- [#5954 feat(subagents): aggregate concurrent results](https://github.com/HKUDS/nanobot/pull/5954)  
  支持将并发 subagent 结果合并为一次通知，避免主 agent 被过早打断。

- [#5811 refactor(agent): persist subagent sessions through shared execution](https://github.com/HKUDS/nanobot/pull/5811)  
  将子任务持久化为 `subagent:<task_id>` 会话，保留父会话链接、检查点和生命周期状态。

- [#4549 feat(heartbeat): add model_override config for cheaper heartbeat model](https://github.com/HKUDS/nanobot/pull/4549)  
  允许为 heartbeat 单独配置更便宜的模型，并保持与主模型隔离。

### 渠道与 WebUI

- [#5902 feat(tg): rename topic to generated session title](https://github.com/H

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

## Zeroclaw 项目动态日报 — 2026-09-29

---

### 1. 今日速览

项目过去 24 小时保持高活跃度：49 条 Issue 更新（其中 25 条新开/活跃、24 条关闭）与 50 条 PR 更新（39 条待合并、11 条已合并/关闭），无新版本发布。活跃工作集中在**安全修复**（S0 级会话环境恢复问题 #11197、并发文件写入丢失 #11136 已关闭）、**RPC 配置通道对齐**（#11172、#11176、#11167 等大批 XL 级 PR 在审），以及**插件系统稳固**（#11228 TLS 材料加固、#11224 备份加密落地、#11225 委托内存所有者修复）。社区讨论热点为 RFC 流程简化（#10549）、多租户 RBAC（#5982）与插件看板（#8832）。整体健康度良好：高风险项均有对应 fix PR 或已闭环，且近两日新提交的修复 PR 集中在安全与配置完整性方向。

---

### 3. 项目进展

**重大 PR 合并/关闭**：
- **[#11131 feat(runtime): own the observer event firehose in the daemon](https://github.com/zeroclaw-labs/zeroclaw/pull/11131) （已合并）** — 修复网关关闭时 daemon 总线收不到 observer 事件、RPC `logs/subscribe` 失效的问题（zerocode、TUI 依赖此通道）。XL 级改动，包含文档与 CLI。

**由今日关闭的 Issue 确认已完成的工作**：
- **#11136 [Bug] 并发 file_edit/file_write 同路径静默丢更新（S0 数据丢失）— 已关闭** — 并行工具调用下同一路径写入竞争问题已修复。
- **#10121 [Bug] Code/ACP 半成品轮次随进程退出而丢失（S0）— 已关闭** — 进程退出前未完成轮次的持久化问题已解决。
- **#6250 [Feature] gateway/quickstart 配置在路由层强制认证 — 已关闭** — 从 per-handler 改为 tower 中间件。
- **#4853 [Feature] 从 .well-known agent-skills 索引安装技能 — 已关闭** — 响应 Agent Skills 社区标准化。
- **#10785 [Bug] zerocode 通知延迟取消运行中轮次 — 已关闭**。
- **#10645/#10644 委托子循环成本追踪与后台结果所有者绑定 — 已关闭** — 安全上下文穿透补全。
- **#10195 [Task] 插件 schema 校验器每次配置解析时重编译 — 已关闭** — 性能回归消除。

**大型功能 PR 持续集成推进**：
- [#10412 SessionBackend 契约抽取](https://github.com/zeroclaw-labs/zeroclaw/pull/10412)、[#10592 relay claim](https://github.com/zeroclaw-labs/zeroclaw/pull/10592)、[#10407 session prompt attachments](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) 等均在活跃 review 中（多为 XL 级、跨组件）。

**新提交的高质量修复 PR（今日）**：
- [#11227 修复 logs_subscribe 测试在 master 失败](https://github.com/zeroclaw-labs/zeroclaw/pull/11227)
- [#11226 agent 重命名级联到 permission-profile 选择器](https://github.com/zeroclaw-labs/zeroclaw/pull/11226)
- [#11225 委托时保留 memory 所有者](https://github.com/zeroclaw-labs/zeroclaw/pull/11225)
- [#11224 backup.encrypt/compress/destination_dir 真正生效（之前 encrypt=true 写明文）](https://github.com/zeroclaw-labs/zeroclaw/pull/11224)
- [#11223 将权限效果锁定在 recheck 之后的测试加固](https://github.com/zeroclaw-labs/zeroclaw/pull/11223)
- [#11222 会话环境不可变](https://github.com/zeroclaw-labs/zeroclaw/pull/11222)

---

### 4. 社区热点

- **[#10549 RFC: 简化 RFC 投票（移除强制讨论窗、REVISE 即停当前快照）— 12 条评论](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) 已关闭**  
  讨论核心：现有 48h/72h 固定讨论期在实践中未产生更多有效 review，反而拖慢节奏。已关闭说明社区形成共识并完成治理优化。

- **[#5982 [Feature] 多租户 per-sender RBAC — 10 条评论，仍开放（4月创建至今）](https://github.com/zeroclaw-labs/zeroclaw/issues/5982)**  
  已收敛到基于现有 agent/risk-profile 模型构建 sender 角色，历史独立 `[rbac.*]` 子系统提案已废弃。长期未完成但方向明确，依赖 #11068 开放草案。

- **[#8832 [Feature] 插件自有的 Kanban 看板 — 9 条评论](https://github.com/zeroclaw-labs/zeroclaw/issues/8832)**  
  已从 RFC 队列移出，走普通 issue/PR 路径；#11081 提供了 per-instance durable state 作为基础，剩余 board projection 等工作。

- **[#4853 从 .well-known 索引安装 skills — 8 条评论，已关闭](https://github.com/zeroclaw-labs/zeroclaw/issues/4853)**  
  追踪 Agent Skills 社区标准（agentskills/agentskills#254），Cloudflare、Vercel 已跟进，说明互操作性是真实需求。

- **[#8850 可选通道/工具从编译期 feature 迁移为运行时插件 — 6 条评论](https://github.com/zeroclaw-labs/zeroclaw/issues/8850)**  
  今日状态更新：多个依赖 PR（#11081、#11098、#8908/#8909、#11178）均已落地，属于 v0.9.0 架构主线。

---

### 5. Bug 与稳定性

**S0 / P0（数据丢失 / 安全风险）**：
- **[#11197 [Bug] 管理员撤销 admin 权限后，会话恢复仍恢复转发的环境变量 — OPEN，S0](https://github.com/zeroclaw-labs/zeroclaw/issues/11197)**  
  准入检查在会话构造时做一次，恢复时不再校验。P0、risk:high，需立即关注。暂无对应 fix PR，刚创建 2 天。
- **[#11136 并发同路径 edit/write 静默丢更新 — 已关闭](https://github.com/zeroclaw-labs/zeroclaw/issues/11136)** — 已修复。

**P1 / 高风险**：
- **[#9816 Anthropic provider 成本恒为 $0，预算限额永远无法触发 — OPEN，P1](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)** — 修复中（status:in-progress）；影响所有使用 Anthropic 直连并配置预算的用户。
- **[#10778 多模态图像容量驱逐重写早期历史、破坏缓存前缀 — 已关闭](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)**。
- **[#10785 zerocode 通知延迟取消所有运行中轮次 — 已关闭](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)**。
- **[#10164 `block_high_risk_commands=false` 不生效，白名单高危命令仍被硬拦 — 已关闭](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)**。

**P2 / 中风险**：
- **[#10186 终端回退文本绕过 live delivery 通道 — OPEN](https://github.com/zeroclaw-labs/zeroclaw/issues/10186)** — 仍待处理。
- [#9708 daemon 服务日志无大小/老化上限 — 已关闭；#10802 session/list-acp message_count 不一致 — 已关闭；#10887 非 vision 模型因"看起来像图片标记"的文本失败 — 已关闭]。

---

### 6. 功能请求与路线图信号

**已进入实现 / 合入主干的路线图项**：
- **RPC/HTTP 配置通道对齐（v0.9.0 核心工作）** — #11172（遗留 HTTP 配置路由 RPC 化）、#11176（cron/memory/skills/personality/quickstart RPC 对齐）、#11167（订阅从有界可重放 hub 服务）。三者在审，均为 XL 级。
- **插件安全加固** — 今日新 PR #11228（命名 TLS profile 材料化需校验 issuance）、#11223（权限效果测试）、#11225（委托内存所有者）。
- **backup 工具真正加密** — #11224（ChaCha20-Poly1305 STREAM 加密落地）。
- **浏览器自助 enrollment 链路** — #10592（`zeroclaw relay claim`）和 #11099（配对码链接/QR）均处于 needs-author-action 或集成状态，前方 #10525/#11089 已合入。

**路线图信号明显的开放请求**：
- **#10315 浏览器 enrollment frontdoor 的 dashboard/session 层仍开放** — 核心门已合入 #10525，剩余为浏览器 dashboard 与 session 层。
- **#10573 将 gateway 配对 token 绑定到 roster 用户** — 基础依赖 #10248/#10259 已合并，v1 决策已定，进入可实现阶段。
- **#8289 OIDC 里程碑 close-out tracker** — 核心 OIDC 栈已全部合并，仅剩收尾跟踪。

---

### 7. 用户反馈摘要

- **RFC 流程摩擦力：** #10549 明确指出固定讨论期"often does not produce more review"，社区选择用实际数据反推动治理简化 —— 说明现有流程存在拖延感。
- **预算功能不可用：** #9816 反馈 Anthropic 直连时 `zeroclaw status` 永远显示 $0，用户实际支出无法触发限额："The display is the smaller half" —— 这属于功能性信誉损伤。
- **配置不生效的挫败感：** #10164 设置 `block_high_risk_commands=false` + 白名单 `rm` 仍被硬拦截，无批准路径；#10171 中 provider profile 的点分身份被多处前端降级为裸 family。这类"配置语义被悄悄改变"的问题容易消耗用户信任。
- **性能感知：** #10195

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目日报 — 2026-09-29

## 1. 今日速览
过去24小时内，PicoClaw 仓库保持高活跃度：6条新开/活跃 Issue、10条待合并 PR 涌入，其中外部开发者 @x1F916 一次性提交了5个可靠性修复 PR（#3399-#3403），覆盖配置持久化、通道同步、资源匹配等核心模块。值得关注的是，社区出现主动分叉宣告（#3398）与安全审计结项（#258 关闭），暗示项目虽面临维护瓶颈，但外部贡献热情正在上升。*相对活跃度：高，但维护者合并速度成为主要瓶颈。*

## 2. 版本发布
**无**（过去24小时无新 Release）

---

## 3. 项目进展
今日**无 PR 被合并/关闭**，但有 1 个重要历史安全审计 Issue 正式关闭（#258），表明该轮审计中的部分问题已处理完毕或已迁移至其他跟踪渠道。

今日新增的 5 项修复 PR 是推进项目稳定性的重要信号，全部来自 @x1F916 并指向当前 `main` 分支（bbf6893）：
| PR | 修复模块 | 问题级别 |
|---|---|---|
| [#3403](https://github.com/sipeed/picoclaw/pull/3403) | async 工具结果错误投递到默认 session | 高（跨会话数据错乱） |
| [#3402](https://github.com/sipeed/picoclaw/pull/3402) | routed agent 上下文管理器取错 agent | 高（非默认 agent 会话失效） |
| [#3401](https://github.com/sipeed/picoclaw/pull/3401) | `Manager.Reload` 对 nil channel 触发 panic | 严重（网关进程崩溃） |
| [#3400](https://github.com/sipeed/picoclaw/pull/3400) | 多 key 模型配置保存丢失 Enabled/多余 key 项 | 中（配置数据丢失） |
| [#3399](https://github.com/sipeed/picoclaw/pull/3399) | 32-bit ARM 更新误装 arm64 包 | 中（架构不匹配） |

这些 PR 若被合并，将实质性修复 agent 核心逻辑、配置持久化和更新器的多项潜在数据损坏/崩溃问题，整体提升系统可靠性一个台阶。

---

## 4. 社区热点
- **[#3281: Web UI 长对话输入卡顿](https://github.com/sipeed/picoclaw/issues/3281)** — 评论 15 条，2 👍，老 issue 今日仍被更新。长历史会话中 Web 输入延迟是多个用户反复触达的痛点，已有一份修复 PR（#3347）挂起两日未获合并。
- **[#3398: 社区分叉宣告](https://github.com/sipeed/picoclaw/issues/3398)** — 用户 @afjcjsbx 声明建立活跃维护分支，直言"当前仓库似乎已无人维护"，虽然措辞直接，但侧面验证了用户对项目前景的期待和焦虑；这是社区热情与维护资源不匹配的强烈信号。
- **[#258: 安全审计关闭](https://github.com/sipeed/picoclaw/issues/258)** — 7个月前提出的 CRITICAL 级安全报告今日关闭，社区高度关注安全修复进度；配套需求 #3405（启用私有漏洞报告）即由此衍生。

---

## 5. Bug 与稳定性
按严重程度排列：

| 严重级别 | Issue/PR | 描述 | 是否有修复 |
|---|---|---|---|
| 🔴 Critical | [#3401](https://github.com/sipeed/picoclaw/pull/3401) | channel Reload 对 nil 实例 panic，进程退出 | ✅ 已有 PR |
| 🟠 High | [#3403](https://github.com/sipeed/picoclaw/pull/3403) | 异步工具结果进入错误会话/agent | ✅ 已有 PR |
| 🟠 High | [#3402](https://github.com/sipeed/picoclaw/pull/3402) | routed agent 的 session 解析失败 | ✅ 已有 PR |
| 🟡 Medium | [#3400](https://github.com/sipeed/picoclaw/pull/3400) | 多-key 模型 API key 与 Enabled 标志持久化丢失 | ✅ 已有 PR |
| 🟡 Medium | [#3399](https://github.com/sipeed/picoclaw/pull/3399) | 32-bit ARM 设备更新安装错误架构包 | ✅ 已有 PR |
| 🟡 Medium | [#3281](https://github.com/sipeed/picoclaw/issues/3281) | Web UI 长对话输入卡顿 | ✅ 已有 PR #3347 待合并 |

另外，#3404 是 @x1F916 对这些 bug 的完整复现说明集合，值得维护者排查是否还有遗漏。

---

## 6. 功能请求与路线图信号
- **OpenAI 兼容自定义 Provider（[#3366](https://github.com/sipeed/picoclaw/issues/3366)）**：呼声依旧，且 #3397 进一步要求将 Tsubasa 加入预设目录。关联到现有 PR #3370（新增 Keenable 搜索提供商），说明模型/服务商可扩展性是社区关注主线，有望在下一版本得到补充。
- **IRCv3 multiline 支持（[#3354](https://github.com/sipeed/picoclaw/pull/3354)）**：功能完整、实现清晰的 PR 已等待近一个月，若合并将成为 IRC 频道用户的实质体验提升。
- **Web UI 性能修复（[#3347](https://github.com/sipeed/picoclaw/pull/3347)）**：用户已在桌面和移动端自测通过，等待维护者 review；此功能与 #3281 直接对应，建议优先处理。

---

## 7. 用户反馈摘要
- **PicoClaw Web UI 在长时间会话中会显著变卡**：非技术用户也容易感知，输入框响应延迟影响日常使用（#3281）。
- **对维护响应速度的不满与理性的分叉尝试并存**：#3398 坦诚表示另立 fork 并非对抗，而是希望项目继续演进；但也有用户持续提交高效 PR，说明社区整体积极性高。
- **安全反馈通道缺失**：#3405 指出仓库没有 `SECURITY.md` 且私有漏洞报告功能关闭，外部研究者不得不公开张贴安全内容，这会对项目声誉造成不利影响。
- **配置保存异常导致用户数据丢失担忧**：#3400 的修复背景（每次保存自动迁移时破坏主条目配置）意味着部分用户可能已遇到 API key 或开关被重置的问题。

---

## 8. 待处理积压（需维护者关注）
| 类型 | 编号 | 创建时长 | 状态 | 备注 |
|---|---|---|---|---|
| PR | [#3354 IRCv3 multiline](https://github.com/sipeed/picoclaw/pull/3354) | 29 天 | 待 review | 完整功能，社区等待久 |
| PR | [#3222 deltachat 重构](https://github.com/sipeed/picoclaw/pull/3222) | 88 天 | 待 review | 砍 200 行，属于架构清理 |
| PR | [#3347 Web UI 性能修复](https://github.com/sipeed/picoclaw/pull/3347) | 33 天 | 待 review | 社区居民已自测通过 |
| Issue | [#3281 Web UI 长对话卡顿](https://github.com/sipeed/picoclaw/issues/3281) | 70 天 | stale 标记 | 15 条评论，影响面广 |
| PR | [#3378 auth scopes 修复](https://github.com/sipeed/picoclaw/pull/3378) | 17 天 | 待 review | 涉及 OAuth 安全细节 |
| Issue | [#3405 私有漏洞报告启用](https://github.com/sipeed/picoclaw/issues/3405) | 1 天 | 新开 | 安全流程合规需求，建议立即处理 |
| Issue | [#3404 可靠性修复复现合集](https://github.com/sipeed/picoclaw/issues/3404) | 1 天 | 新开 | 包含详细复现步骤，是 #3399-#3403 的配套文档 |

---

*健康度评估：项目整体活跃度高，外部贡献者活跃且质量稳定；但 PR 合并速度与安全响应速度目前是项目健康度的主要短板。建议维护者优先处理 #3401 panic 类高影响修复，并回应 #3405 安全通道请求。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 · 2026-09-29

## 今日速览

过去24小时 NanoClaw 仓库保持了高强度迭代节奏：共 32 条 PR 更新，其中 19 条已合并/关闭、13 条待合并；Issue 侧 4 条更新，以 bug 报告为主（3 条已关闭、1 条新开）。整体活跃度明显高于日常水平，修复集中在 `/update-nanoclaw` 更新链路、容器生命周期管理、CI 稳定性三个方向。值得关注的是，多条 update 流程相关的 PR 正在同步推进，表明维护团队正在集中加固升级可靠性。项目健康度整体良好，但 update 链路的 bug 密度值得持续跟踪。

---

## 版本发布

过去 24 小时无新版本发布。当前版本基线为 v2.4.0（commit `c313d061` / `143db6c9`），main 分支处于持续修复阶段，下一 patch 版本可能包含大量 update 流程修复。

---

## 项目进展

今日合并/关闭的 PR 数量达 19 条，涵盖了从核心运行时到技能栈的多项修复。

### 更新链路（update-nanoclaw）加固

- **[#3948] fix(update): 保持网关拥有的容器在切换和残留清理期间运行**（已合并）
  此前 `/update-nanoclaw` 在切换时会移除 Iron Proxy 容器，导致之后所有 agent 启动失败。现在将 `gateway` 设为官方容器角色，更新期间保留其运行。这修复了一个影响所有 Iron 网关用户的严重升级阻断问题。
  https://github.com/nanocoai/nanoclaw/pull/3948

- **[#3946] fix(skill-apply): 显示失败步骤自身的错误而非通用报错**（已合并）
  技能步骤失败时，现在会呈现真正的失败原因，而非模糊的 `the step did not complete`，大幅提升排查效率。
  https://github.com/nanocoai/nanoclaw/pull/3946

### 安全与权限

- **[#3883] fix(iron-proxy): 卸载时删除 Iron Control 的数据库**（已合并）
  卸载 NanoClaw 现在会清除 Iron Control 数据库，确保同一目录重装时从干净状态开始。核心保持网关无关性，不直接引用 Iron。
  https://github.com/nanocoai/nanoclaw/pull/3883

- **[#3920] fix(setup): 限制故障协助代理在活体安装上的权限**（已合并）
  Setup 阶段的故障协助代理现在使用各 CLI 的安全权限基线，而非 allow-all 默认值，降低活体安装期间的风险敞口。
  https://github.com/nanocoai/nanoclaw/pull/3920

### 核心稳定性

- **[#3959] test(agent-runner): 异步生成 bun 子进程以修复 CI 挂起**（已合并）
  5/8 的 main CI 运行因 Bun 1.4.0 `spawnSync` 偶发等待子进程退出而变红。改为异步 spawn 后 main 流水线恢复绿。
  https://github.com/nanocoai/nanoclaw/pull/3959

- **[#3957] fix(scheduling): 预处理脚本超时时杀死整个进程组**（已合并）
  修复了 `bash` fork 子进程导致超时后 `bun flow.ts` 继续运行、副作用迟到的问题。
  https://github.com/nanocoai/nanoclaw/pull/3957

### 集成适配

- **[#3949] fix(add-mattermost): 运行验证时自动派生回调密钥**（已合并）
  修复 `.env` 缺少 `MATTERMOST_CALLBACK_SECRET` 时运行时验证失败的问题，与 #3823 的适配器派生逻辑对齐。
  https://github.com/nanocoai/nanoclaw/pull/3949

- **[#3950] feat(iron): 信任操作者自定义名称约束的本地 CA**（已合并）
  Iron 网关现在可信任操作者的自有 CA，`https://models.home.arpa/v1` 这类私有域名模型服务器可在 Iron 后正常工作（此前仅信任公共 CA）。
  https://github.com/nanocoai/nanoclaw/pull/3950

- **[#3960] fix(add-onecli): 适配器错误中命名凭证而非提供者**（已合并）
  改善 OneCLI 凭据适配器的错误信息可读性，减少排查歧义。
  https://github.com/nanocoai/nanoclaw/pull/3960

**整体判断**：今日合并的 PR 质量整体较高，更新链路和 CI 稳定性是本次集中攻坚的主要战场，均为用户可感知的实际痛点。

---

## 社区热点

今日评论数未显示具体数值（数据缺失），但从 Issue/PR 的关联度和标题可看出最受关注的议题集中在 `/update-nanoclaw` 更新流程：

- **[#3961] /update-nanoclaw 报告 complete 但主机未重启**（新开 Issue，0 评论）
  这是今天新开的 bug，直指更新流程最严重的信任问题：系统报告升级成功，但实际服务仍在旧版本运行。该 Issue 刚创建便迅速有对应 PR 跟进（见 #3962），说明维护者高度重视。
  https://github.com/nanocoai/nanoclaw/issues/3961

- **[#3654] fix(container-runner): NO_PROXY 本地跳转使主机侧 MCP 可达**（8月29日创建，持续活跃）
  这可以说是今日"最老"的热点 PR，从 8 月底至今已满一个月仍在迭代。诉求是在凭据网关激活时，agent 容器内仍能访问宿主机的纯 HTTP MCP 服务，涉及代理环境变量透传的精细控制。
  https://github.com/nanocoai/nanoclaw/pull/3654

- **[#3901] fix(setup): 让主机服务通过 HTTPS 代理访问互联网**（9月25日创建，待合并）
  来自外部贡献者 @barnuri 的 PR，解决仅能通过 HTTPS 代理上网的机器上 NanoClaw 主机服务的连通性问题。社区贡献持续流入，且能触达维护团队未覆盖的网络环境场景。
  https://github.com/nanocoai/nanoclaw/pull/3901

**诉求分析**：更新流程的可信度和容器网络代理穿透是当前社区最关心的两大实操痛点。前者影响升级安全感，后者决定了在复杂网络环境中的可用性。

---

## Bug 与稳定性

以下按严重程度排列今日活跃的 Bug：

| 严重程度 | Issue / PR | 描述 | 状态 |
|---|---|---|---|
| **高** | [#3961] | `/update-nanoclaw` 在 systemctl --user 无法访问总线时报告 `phase: complete`，但旧版主机仍在服务 | 待诊断，已有对应修复 PR #3962 |
| **高** | [#3906]（已关闭） | 更新时控制器归档缺失 `setup/`，阶段命令在依赖存在前执行 | 已关闭，`triage/unresolved` |
| **中** | [#3958] PR | 日志系统遇到不可 JSON 序列化的值（循环引用、BigInt）时会抛出异常导致主机崩溃 | 修复 PR 待合并 |
| **中** | [#3959]（已合并） | Bun 1.4.0 `spawnSync` 在 CI 中偶发丢失子进程退出码，导致 5/8 流水线挂起 | 已修复合并 |
| **中** | [#3907]（已关闭） | 嵌套 pnpm 向 stdout 打印工作区警告导致网关检测失败 | 已关闭，`triage/unresolved` |
| **低** | [#3963] PR | Node 24 早期版本（<24.13.1）下 update e2e 测试因 `rmSync` 删除软链接失败 | 修复 PR 待合并 |
| **低** | [#3839]（已关闭） | registry-skills 的 add-opencode 重放阶段在 bun test 中挂起至 6 小时超时 | 已关闭，`triage/needs-repro` |

**值得注意**：今日关闭的 3 个 Issue 均标记为 `triage/unresolved`，说明这些 bug 虽被关闭但并未真正修复，可能是重复报告或无法复现后归档。真正需要关注的是这些 unresolved 问题背后的根因是否已通过其他 PR 覆盖。

---

## 功能请求与路线图信号

今日无新功能请求，但从已合并的 PR 中可以看到以下方向可能进入下一版本：

1. **自定义 CA 信任机制**（#3950，已合并）：Iron 网关支持操作者自有 CA，意味着 NanoClaw 正在向私有化部署和本地模型场景扩展。这与此前 `host.docker.internal` 本地模型 URL 的支持（#3919）一脉相承，私有网络 + 本地模型组合正在成为一等公民场景。

2. **容器生命周期的精细化管理**（#3947，待合并）：删除会话或 agent 组后自动停止对应容器，填补了删除操作后的资源回收空白。这是对容器资源治理能力的补强，可能随下一版本发布。

3. **HTTPS 代理环境适配**（#3901，待合并）：来自社区的功能补充，让 NanoClaw 能部署在仅允许 HTTPS 代理出网的受限网络中。这属于企业环境的适配需求，有合并价值。

---

## 用户反馈摘要

从 Issue 和 PR 的摘要文本中可提炼出以下用户痛点：

1. **更新流程的可信度危机**：@glifocat 连续提交了多条 update 相关 bug（#3961、#3906、#3907），共性问题指向 `/update-nanoclaw` 存在"报喜不报忧"的行为——报告成功但实际未完成重启、网关未被检测到、更新后依赖缺失。这严重破坏用户对更新功能的信任，**"update 说完成了，但我的旧版本还在跑"** 是最直接的挫败感来源。

2. **容器网络代理的隐性陷阱**：@tchopoorian 在 #3654 中描述了凭据网关注入 `HTTP_PROXY`/`HTTPS_PROXY` 后，Bun 会为所有请求（包括本机 MCP 服务）走代理，导致 `host.docker.internal` 上的明文 HTTP 服务不可达。这是"安全功能引入网络副作用"的典型案例，用户需要在不牺牲安全的前提下保持本地通信畅通。

3. **卸载重装的干净性问题**：@glifocat 在 #3883 中反映卸载后重装同一目录时，旧数据库残留导致状态不一致。这看似小问题，但在 CI 和自动化环境中会形成隐性故障源。

总体来看，用户反馈集中在**更新可靠性**和**网络代理语义**两个维度，负面反馈多为流程性 bug，而非核心 agent 能力问题。

---

## 待处理积压

### 长期未合并的 PR

- **[#3654] fix(container-runner): NO_PROXY 本地跳转使主机侧 MCP 可达**
  创建于 2026-08-29，已持续 31 天。这是目前积压最久的 PR，涉及容器代理环境变量的精细控制，改动的语义较复杂，需要维护者审慎合入。建议推动评审，避免功能分支长期发散。
  https://github.com/nanocoai/nanoclaw/pull/3654

- **[#3901] fix(setup): 让主机服务通过 HTTPS 代理访问互联网**
  创建于 2026-09-25，来自外部贡献者 @barnuri，等待合入。涉及 `NODE_USE_ENV_PROXY` 启动时机问题，改动范围可控，建议尽快评审。
  https://github.com/nanocoai/nanoclaw/pull/3901

### 需要关注的历史 Issue

- **[#3839] registry-skills: add-opencode 重放阶段在 bun test 中挂起至 6 小时取消**
  9月16日创建，9月28日关闭，标记为 `triage/needs-repro`。虽已关闭，但"挂起至 6 小时"暗示可能存在深层的并发或事件循环问题。若后续有类似报告，建议升级排查。
  https://github.com/nanocoai/nanoclaw/issues/3839

### 其他待合并的重要修复 PR

- **[#3962] fix(update): 服务存活探针本身失败时拒绝切换** —— 直接对应今日新开 Issue #3961 的修复
- **[#3956] fix(update): rollback 停止活跃的 nohup 主机并排空 agent 容器**
- **[#3958] fix(log): 日志值无法 JSON 序列化时不抛异常**

这三条 PR 均涉及更新链路或核心稳定性，建议优先合入。

---

*本日报基于 GitHub 公开数据自动生成，时间为 2026-09-29。数据来源：github.com/nanocoai/nanoclaw。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-29

## 1. 今日速览

过去24小时IronClaw项目整体活跃度中等偏上：新开Issue 2条（均为今日创建），PR更新5条（4条开放、1条关闭），无新版本发布。值得关注的是，今日提交的PR多来自新贡献者（@changeroa、@flyagents），修复集中在CLI配置报告与WebUI焦点恢复等细节体验上；核心bot提交了一例代码库知识图谱刷新PR（#7988），而Issue侧主要包含一份每日失败分类报告（#8116）与一项Tsubasa注册表功能请求（#8115）。项目在持续吸纳外部贡献的同时，通过自动化基准分析保持质量可见性，整体健康度良好，但需留意一条已积压两个月的文档更新PR（#6698）仍未合并。

## 2. 版本发布

今日无新版本发布（Releases为0）。项目仍处于功能迭代与修复阶段，建议关注后续PR合并节奏。

## 3. 项目进展

今日无新合并的PR。唯一关闭的PR为：

- [#5132 [CLOSED] fix(webui-v2): redirect invalid chat thread routes](https://github.com/nearai/ironclaw/pull/5132) — 该PR由新贡献者@flyagents于6月22日创建，今日关闭。内容涉及WebUI v2聊天线程路由的非法/保留路径重定向，并包含ChatPage回归测试。虽然最终关闭而非合并，但其存在与关闭至少表明相关路由问题已获得处理或替代方案。

此外，核心bot今日更新的PR [#7988 chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988) 属于日常代码库记忆图谱刷新，虽未合并，但持续维护agent知识基础设施的更新节奏。

整体来看，今日项目“推进”主要体现在问题修复与基础设施维护的流程运转上，而非新功能上线。

## 4. 社区热点

今日所有Issue与PR的评论数均为0，无高互动讨论。关注度相对较高的条目包括：

- [#8116 [OPEN] Daily ironclaw failure taxonomy — 2026-09-28](https://github.com/nearai/ironclaw/issues/8116) — 由@pranavraja99发布，系统性分析officeqa套件31个非通过任务的失败分类，指出绝大多数为模型质量问题（如DeepSeek-V4-Flash的导航/推理错误）。这属于项目内部质量追踪机制的一部分，虽无外部评论，但反映了核心团队对模型表现差异的持续监控需求。

- [#8115 [OPEN] Add a Tsubasa registry entry with an explicit 32K context-budget path](https://github.com/nearai/ironclaw/issues/8115) — 由@cenab提出，建议为Tsubasa提供命名注册表项，简化配置流程。属于面向易用性的功能请求，暂无讨论但体现了小开发者对开箱即用体验的期待。

整体社区讨论氛围偏淡，但Issue本身质量较高。

## 5. Bug 与稳定性

今日Issue中未直接报告崩溃类/阻断型Bug，但包含一份质量分析：

- **[中高] 模型质量失败分类（#8116）** — [链接](https://github.com/nearai/ironclaw/issues/8116) 指出officeqa套件31个非通过任务中，除一个例外均为模型本身的质量缺陷（DeepSeek-V4-Flash模型导航错误等），并非框架Bug。这属于外部模型表现问题而非IronClaw自身稳定性问题，但可作为后续模型适配优化的参考。

今日两条修复PR（#8118、#8117）虽未明确标记为Bug，但本质上属于一致性修复：

- [#8118 fix(cli): report effective config profile](https://github.com/nearai/ironclaw/pull/8118) — 修复`config path`、`doctor`、`status`命令在`IRONCLAW_REBORN_PROFILE`未设置时的配置文件报告逻辑，消除重复解析路径。
- [#8117 fix(webui): restore focus after closing the command palette](https://github.com/nearai/ironclaw/pull/8117) — 修复从输入框打开命令面板并关闭后焦点丢失、无法继续输入的问题。

两条修复均标注risk: low，暂无对应fix PR的Bug报告出现。

## 6. 功能请求与路线图信号

今日最明确的功能请求为：

- **Tsubasa注册表条目（#8115）** — [链接](https://github.com/nearai/ironclaw/issues/8115) 请求为Tsubasa项目添加一个命名提供者条目，显式支持32K上下文预算路径，使用户无需手动输入endpoint和模型名即可完成配置。由于IronClaw已内置OpenAI兼容后端，实现该功能的技术门槛较低，且针对的是配置体验优化，可能被纳入下一小版本。目前无关联PR。

路线图信号方面：

- #8117和#8118两个新贡献者PR（均标注risk: low, size: M）若通过审查，将改善WebUI与CLI的细节体验，表明项目对来自社区的中小规模修复持开放态度，这类PR有望在近期合并进主分支。

- #7988与#6698这类自动化bot持续产出（知识图谱与文档刷新），暗示项目正在构建可自我演进的代理知识基础设施，属于工具链层面的长期投入。

## 7. 用户反馈摘要

今日所有Issue与PR均无用户评论，直接反馈数据有限。从Issue文本可提取的间接反馈包括：

- **使用痛点（来自#8115）**：用户需手动输入Tsubasa的endpoint与模型名，配置过程不够清晰，命名提供者将显著降低使用门槛。这反映小开发者/新用户对“开箱即用”的强烈需求。

- **质量关注（来自#8116）**：核心维护者在持续追踪模型在benchmark上的失败模式，显示出对端到端评估质量的严格要求；虽然普通用户没有直接发言，但此类公开的失败分类报告本身即为一种“透明的自我反馈”。

- **满意度信号**：今日无明确抱怨或点赞表述。PR的提交速度（尤其新贡献者）可视为社区参与度尚可的间接信号。

## 8. 待处理积压

以下条目长期未合并/未响应，建议维护者关注：

- **PR #6698 docs: update OpenWiki wiki** — [链接](https://github.com/nearai/ironclaw/pull/6698)  
  - 创建于2026-07-27，已开放64天，最近更新为2026-09-28。  
  - 由核心bot自动生成，属于OpenWiki文档定期刷新。虽然PR说明中强调“不自动合并、需人工审批”，但两个月的搁置时间已较长，文档更新容易积累漂移，建议尽快安排审查排期。

- **PR #5132 fix(webui-v2): redirect invalid chat thread routes** — [链接](https://github.com/nearai/ironclaw/pull/5132)  
  - 创建于2026-06-22，今日关闭。虽然状态已解决，但历时近100天才关闭，对新贡献者的反馈周期偏长；若未来有类似规模的社区PR，建议考虑缩短等待时间。

- **Issue侧暂无长期无响应的紧急问题**（两条新Issue均为今日创建，尚未进入积压阶段）。

---

**总结**：IronClaw今日无版本发布，项目处于稳定迭代期；新贡献者活跃度上升，自动化基础设施稳定运行；质量追踪透明、缺陷定位清晰。主要风险在于文档类PR积压时间过长，需调整审查节奏以避免内容过时。整体项目健康度良好。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-29


## 1. 今日速览

过去 24 小时项目活跃度较高：PR 更新 14 条（13 条已合并/关闭，1 条待合并），Issues 更新 5 条（4 条活跃，1 条关闭），无新版本发布。今日合入的 PR 高度集中在 OpenClaw 网关稳定性（启动死锁、锁回收、超时处理）与 Cowork 长任务展示体验两大方向，同时完成了 PPT/Word/Excel 文档编辑能力的功能合入，并清理了一批 3 月遗留的 stale PR（安全、IM、Agent 弹窗修复）。整体来看，项目正处于“功能扩展 + 稳定性加固”并行的密集迭代期，积压清理节奏明显加快。


## 2. 版本发布

无新版本发布。


## 3. 项目进展

今日合并/关闭的 PR 数量较多，主要集中在以下几个方向：

**OpenClaw 网关稳定性（重要修复组）**
- [#2771 fix(openclaw): reclaim gateway locks whose recorded PID was reused](https://github.com/netease-youdao/LobsterAI/pull/2771) — 解决 Windows 非正常关机后 PID 被 SYSTEM 等进程复用、网关锁无法回收导致启动与一键修复均失败的问题。
- [#2772 fix(openclaw): skip orphan non-ASCII agent dirs when counting legacy session stores](https://github.com/netease-youdao/LobsterAI/pull/2772) — 修复纯中文 Agent 目录被计入旧会话库、导致启动门禁永久死锁的问题。
- [#2774 fix(openclaw): improve repair timeout handling and diagnostics](https://github.com/netease-youdao/LobsterAI/pull/2774) — 一键修复命令由固定 60s 超时改为输出活动驱动的有界等待（静默 5 分钟 / 单命令累计 15 分钟），并增加退出诊断信息。
- [#2775 fix(openclaw): start the gateway once on app launch](https://github.com/netease-youdao/LobsterAI/pull/2775) — 修复应用启动时 OpenClaw 网关被重复启动三次的问题（约 80 秒启动窗口内出现三次不可用）。

这几个修复共同消除了网关在启动、重连、异常退出、修复等场景下的多个死锁与重复启动隐患，是该版本最核心的稳定性推进。

**Cowork 长会话体验改进**
- [#2777 feat(cowork): keep long running turns to their latest five steps](https://github.com/netease-youdao/LobsterAI/pull/2777) — 长任务运行中的步骤折叠为最近 5 步展示，避免 DeepSeek 等模型长时间工具调用时对话流被刷屏（实测一次 7 分钟的幻灯片任务曾渲染 94 行过程输出）。
- [#2778 feat(cowork): show OpenClaw progress cards above the composer](https://github.com/netease-youdao/LobsterAI/pull/2778) — 将 OpenClaw 的 progress_card 原生计划卡片显示在输入框上方，替代原先“使用了 progress_card”的原始文本。

**新功能：文档编辑能力**
- [#2776 feat: support ppt/word/excel document editing](https://github.com/netease-youdao/LobsterAI/pull/2776) — 合入了 PPT/Word/Excel 文档编辑能力，涉及 renderer、build、docs、openclaw、skills、artifacts 等多个模块，是今日最重要的一次功能扩展。

**测试与回归补充**
- [#2773 test(openclaw): verify legacy session discovery recovery](https://github.com/netease-youdao/LobsterAI/pull/2773) — 为旧会话目录发现修复补充数据保留回归测试和 Electron 实操验收记录。

**遗留 stale PR 清理**
- [#969](https://github.com/netease-youdao/LobsterAI/pull/969) 修复 Create Agent 弹窗内容超高时标题栏和操作栏被截断的问题
- [#974](https://github.com/netease-youdao/LobsterAI/p

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-29

## 今日速览

过去 24 小时内，Moltis 项目整体活跃度较低：Issues 方面无新开、无关闭、无更新；Pull Requests 仅 1 条新增且处于待合并状态；无新版本发布。结合近期数据来看，项目处于“低频但稳定”的日常开发节奏，社区讨论热度不高，但代码合并通道保持畅通。唯一的新 PR 为扩展 OpenAI 兼容 provider 生态的功能性提交，说明项目仍在持续推进功能覆盖与生态集成。

---

## 版本发布

无新版本发布，本期省略。

---

## 项目进展

今日无 PR 被合并或关闭，主分支代码无新变更入库。唯一新增的 PR #1288 目前仍处于待合并状态，尚未进入主线。该 PR 若被合并，将为项目带来以下功能推进：

- 新增 **Tsubasa** provider，完善 OpenAI 兼容服务接入矩阵
- 支持通过 `TSUBASA_API_KEY` 环境变量进行鉴权，默认端点为 `https://api.tsubasa.sh/v1`，与现有 provider 配置模式保持一致
- 注册 `tsubasa-fast` 与 `tsubasa-pro` 两个模型，均提供 32,768 token 上下文窗口
- 同步更新配置名校验、生成模板及 README 文档

项目整体而言，今日没有代码合并事件，但新增 PR 的存在表明生态扩展方向仍在持续推进。

[查看 PR #1288](https://github.com/moltis-org/moltis/pull/1288)

---

## 社区热点

今日社区讨论极为平静：Issues 数量为 0，唯一动态为 PR #1288，且无评论数据、无点赞记录，未能形成实质性讨论热点。

该 PR 是今日唯一的社区活动载体，虽未产生互动，但其内容本身值得关注——新增第三方 provider 的接入是项目扩展生态边界的典型信号，也是社区对“更多 OpenAI 兼容服务”需求的间接体现。

[查看 PR #1288](https://github.com/moltis-org/moltis/pull/1288)

---

## Bug 与稳定性

今日未发现 Bug 类动态：无新 Bug 报告、无崩溃反馈、无回归问题。PR #1288 为功能性新增，不涉及缺陷修复。项目在稳定性维度上今日处于零事件状态。

---

## 功能请求与路线图信号

今日无新增功能请求 Issue。但 PR #1288 的存在传递出明确的路线图信号：

- 项目持续扩展 **OpenAI 兼容 provider 列表**，向多服务商接入方向发展
- 每个新 provider 遵循统一的配置模式（环境变量 + 默认 endpoint + 模型列表），说明项目在架构上已具备成熟、可持续扩展的 provider 注册机制
- 若该 PR 被合并，下一版本很可能包含 Tsubasa 支持，这将是继现有 provider 之后又一次生态扩展

这类“新增外部服务接入”的 PR 通常直接响应用户对更多模型服务选择的需求，预计后续仍会有类似 provider 扩展提交出现。

---

## 用户反馈摘要

今日无新增 Issues 及评论数据，无法从 Issues 渠道提取用户反馈。根据 PR #1288 的提交内容推断，用户侧可能存在的潜在诉求为：

- 对更多 OpenAI 兼容 API 服务接入的渴求，尤其是成本、速度或区域可访问性更优的替代方案
- 对多 provider 统一管理、灵活切换的使用场景需求

建议关注该 PR 合并后是否有用户反馈或新 Issue 出现，以验证上述推断。

---

## 待处理积压

当前仓库中，**有待合并 PR 1 条**，即 PR #1288，创建与更新日期均为 2026-09-28，尚未关闭。虽然还不构成“长期停滞”，但作为今日唯一活跃的 PR，合并进度值得维护团队关注。

截至今日，Issues 积压为 0，没有历史遗留的未响应 Issue。

[查看 PR #1288](https://github.com/moltis-org/moltis/pull/1288) | [Moltis 仓库主页](https://github.com/moltis-org/moltis)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-29

> 数据来源：CoPaw (github.com/agentscope-ai/CoPaw)，统计窗口为过去 24 小时。

---

## 1. 今日速览

过去 24 小时项目保持高频迭代：Issue 更新 7 条（5 条新开/活跃、2 条已关闭），PR 更新 16 条（14 条待合并、2 条已合并/关闭）。今日无新版本发布。社区活跃度较高，多个 first-time-contributor 在同时提交修复（#8012、#8010、#8007、#8006 等），反映项目对新贡献者的吸引力。值得关注的是，今日集中暴露了两个严重稳定性问题——媒体文件导致会话永久不可用（#8009）以及大技能下载 30 秒超时（#8013），其中 #8009 已有修复 PR 待合入。总体评估：项目处于功能开发与社区共建的密集期，合并效率良好，但稳定性修复的合入优先级建议提高。

---

## 2. 版本发布

今日无新版本发布，故本节约略。

---

## 3. 项目进展

今日有 2 个 PR 从待合并变为已合并/关闭，均为 Console 前端体验的整合性改动：

- **[#8005] feat(console): unify interface font scaling** — 已合并
  为 Console 增加 12px–20px 的字体大小设置与持久化，并建立字体、图标、控件尺寸的统一语义化 token，同步更新侧边栏、设置中心、聊天区、文件工作区、MCP、渠道、技能、工具等组件。该 PR 直接落地了原始 issue #7999 的桌面端字体可调需求。
  https://github.com/agentscope-ai/QwenPaw/pull/8005

- **[#7956] feat(console): unify settings UX and smooth conversation transitions** — 已合并
  统一设置中心交互体验，修复工作区选择器溢出与切换会话时的欢迎屏闪烁问题。
  https://github.com/agentscope-ai/QwenPaw/pull/7956

这两个合并是 Console 设计语言统一工作的阶段性完成，提升了桌面端与 Web 端的整体一致性。同时在待合并队列中，已有多个重要功能处于 review 阶段，包括 **#7931 可持久化分页历史**（SQLite 转录存储、游标分页、SSE 去重）与 **#7871 工具输出截断绕过修复**（Aone，防止字面量 `<<<TRUNCATED>>>` 绕过 50KB 限制），显示项目正在同时推进架构升级与安全加固。

---

## 4. 社区热点

截至本日报统计时间，下列条目获得了最多的讨论互动：

- **[#7991] [Bug] TaskTracker _runs zombie entries inflate running_task_count，disagree with /api/chats**（2 条评论）
  用户发现仪表盘显示 "2 running tasks" 但 chat API 只返回 1 个 `running`，质疑 `get_global_status()` 与 `get_status(chat_id)` 的统计口径不一致。这个 bug 直接触及运维监控的核心准确性，评论区在讨论计数器作用域和 zombie entry 清理策略。
  https://github.com/agentscope-ai/QwenPaw/issues/7991

- **[#8013] [Bug] 大技能下载 30 秒超时**（1 条评论）
  用户 @michaelchen781211 详细描述了一个 12,994 文件 / 80.1 MB 的技能包在「技能池 → 广播/下载」时前端 30 秒 AbortController 硬超时，但后端仍在执行、最终失败。评论指向前端超时机制与后端长任务的矛盾。
  https://github.com/agentscope-ai/QwenPaw/issues/8013

- **[#8015] [Feature] 支持配置自定义 Skill / Plugin 市场源**（1 条评论）
  内网 / 离线部署的需求讨论，要求不必 patch 代码即可指向自托管镜像源。
  https://github.com/agentscope-ai/QwenPaw/issues/8015

趋势：今日社区讨论集中在 **数据准确性**（#7991）、**长任务超时设计**（#8013）与 **企业级部署能力**（#8015）三个方向，核心诉求是让项目在真实规模与复杂网络环境下更可靠。

---

## 5. Bug 与稳定性

按严重程度排列：

**高严重度**

- **[#8009] Oversized image stored in context makes a session permanently unusable**
  一个过大图片被 provider 拒绝后，该图片仍保留在存储上下文中，导致该会话之后所有请求（包括纯文本请求）持续 400，会话永久损坏。已有 PR **#8010** 提交修复（在请求失败时从上下文移除被拒媒体，并增加读取告警），等待 review。
  https://github.com/agentscope-ai/QwenPaw/issues/8009
  修复 PR：https://github.com/agentscope-ai/QwenPaw/pull/8010

- **[#8013] 大技能下载超时，后端执行但技能无法落盘**
  30 秒前端硬超时与后端实际执行时长不匹配；同时涉及下载完成状态无法正确通知工作区的问题。暂未见专门 fix PR。
  https://github.com/agentscope-ai/QwenPaw/issues/8013

**中严重度**

- **[#7991] TaskTracker 计数口径不一致**
  dashboard 计数与 chat 列表 API 返回的 running 状态不符，影响用户对系统负载的判断。已有 PR **#8007** 修复该模块注册时序问题（在 producer task 创建成功后才注册 run，并处理失败时的清理），可跟踪是否解决该 issue。
  https://github.com/agentscope-ai/QwenPaw/issues/7991
  相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/8007

- **[#8011] Telegram HTML formatter 错误解析 c++ /

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报 — 2026-09-29

> 数据来源：github.com/qhkm/zeptoclaw | 统计周期：2026-09-28 至 2026-09-29


## 1. 今日速览

过去 24 小时项目活跃度中等偏上：共 2 条 Issue 更新、1 条 PR 提交，无新版本发布。核心事件是一条 **P2-high 级别的功能改进链路**（Issue #707 → PR #708）形成闭环——该 PR 修复了工具输出超限后直接丢弃、模型无法恢复的关键痛点，且已进入待合并状态。社区侧收到 1 条功能咨询（#709），暂无 Bug 类反馈。整体看，项目在 **工具链数据可靠性** 方向上迈出了实质性一步，但尚未合并落地，建议关注后续 review 进度。


## 2. 版本发布

今日无新版本 Release。


## 3. 项目进展

今日无 PR 被合并或关闭。但有一条 **重要功能 PR 进入待合并状态**，是当前项目最核心的推进项：

| PR | 标题 | 状态 | 要点 |
|----|------|------|------|
| [#708](https://github.com/qhkm/zeptoclaw/pull/708) | feat(tools): spill oversized tool output instead of discarding it | 待合并 | 将超过预算的工具输出写入 `~/.zeptoclaw/sessions/<key>/spill/<seq>-<tool>.txt`（0600 权限、0700 目录），在上下文中以预览 + 路径 + 摘要替代原先的截断丢弃逻辑 |

**意义评估**：该 PR 直接解决已存在的数据丢失问题，使模型在输出超限时可回溯完整内容，属于对 agent 核心工作流的可靠性补强。对应 Issue #707 标记为 `P2-high`，说明维护者将其视为较优先级需求。一旦合并，将显著改善长输出场景下的工具可用性。（注：PR 描述摘要未显示完整，上面要点基于 Issue #707 背景推断，建议以 PR 正文为准。）


## 4. 社区热点

今日讨论整体较平静，2 条 Issue 与 1 条 PR 的评论数均为 0，无高热讨论帖。相对值得关注的是：

- **[#709 [OPEN] is there a goal mode?](https://github.com/qhkm/zeptoclaw/issues/709)**（作者 @abda11ah）
  用户询问项目是否存在类似 ohmypi (omp) 的 `/goal` 模式（即 agent 持续工作直到满足某个条件才停止）。

**背后诉求分析**：该提问反映了用户对 **长期运行型 agent 任务** 的需求——不是单轮指令，而是使 agent 具备目标导向的持续执行能力。这属于 agent 行为范式层面的功能期望，可能与项目当前的会话/任务模型存在差距。目前尚无维护者回复，建议跟进。


## 5. Bug 与稳定性

今日 **无新报告的崩溃、回归类 Bug**，但有 1 个 **功能性数据丢失问题** 被正式归档并以 PR 形式给出修复：

| 严重程度 | Issue / PR | 描述 | 修复状态 |
|----------|-----------|------|---------|
| 中（数据丢失） | [#707](https://github.com/qhkm/zeptoclaw/issues/707) | 工具输出超过 2,000 行 / 50KB 后被截断 **并丢弃**：模型仅被告知有内容被省略，但无任何途径访问原始字节，影响 `shell`、`grep`、`filesystem`、`find` 等工具 | 已有 PR [#708](https://github.com/qhkm/zeptoclaw/pull/708) 待合并 |

该类问题不至于崩溃，但会导致 agent 在长输出场景下丢失关键信息，进而影响任务完成质量。修复方案采用 **spill 到本地文件** 的方式，兼顾上下文长度限制与信息可恢复性，设计合理。


## 6. 功能请求与路线图信号

今日出现 2 条功能相关信号：

| 信号 | 来源 | 类型 | 被纳入下一版本的可能性 |
|------|------|------|------------------------|
| **工具输出 spill 而非丢弃** | [#707](https://github.com/qhkm/zeptoclaw/issues/707)（自建） | 内部功能改进 | **高** —— 已有完整实现 PR（#708）待合并，且被标记为 P2-high，预计近期进入主线 |
| **Goal mode（目标导向持续执行）** | [#709](https://github.com/qhkm/zeptoclaw/issues/709)（用户提出） | 外部功能需求 | **待评估** —— 尚无维护者回复；若采纳，可能涉及会话调度层的较大改动，短期落地概率较低 |

综合来看，**工具输出可靠性** 是当前项目明确的短期方向；**goal mode** 则是一个潜在的中长期路线图候选，建议维护者在 #709 中给出官方回应（接受 / 拒绝 / 将来版本），避免社区需求悬置。


## 7. 用户反馈摘要

今日有效用户反馈来自 Issue #709（@abda11ah）：

> “Hi, is there a /goal mode like in ohmypi (omp) where the agent continue working until a condition is met?”

**提炼**：
- **使用场景**：用户希望在 ZeptoClaw 中运行需要持续迭代直到满足某个条件的任务（如“持续修复编译错误直到通过”），而不是一次性的指令-响应循环。
- **对比参照**：以 ohmypi (omp) 为参照物，说明用户对 agent 的任务自主性和长期执行能力有明确预期。
- **潜在痛点**：当前 ZeptoClaw 可能缺少“目标条件终止”机制，导致此类工作流只能人工分批驱动。

无其他负面反馈或投诉，整体用户情绪中性偏正向，项目未被指出明显使用障碍。


## 8. 待处理积压

基于现有数据，**今日未见长期未响应的遗留 Issue/PR**。但有以下两点需提醒维护者关注：

1. **Issue #709 等待官方回复** —— 社区功能咨询发出后已超过 24 小时无维护者响应，虽不算严重积压，但尽早回复可避免用户流失，也利于收集需求细节。

2. **PR #708 的合并推进** —— 该 PR 对应 P2-high 缺陷修复，目前在待合并状态，若 review 周期过长，建议明确时间预期或追加 review 人员，以免修复搁置。

（注：本报告仅基于 24 小时数据，未发现超过 1 个月的陈旧 Issue；如需完整积压清单，建议另行查询全量 Issue 列表。）


## 附录：数据速览表

| 指标 | 数值 |
|------|------|
| 新 Issue | 2（活跃 2，关闭 0） |
| 新 PR | 1（待合并 1，合并/关闭 0） |
| 新 Release | 0 |
| Bug 类反馈 | 0（另有 1 功能缺陷，见 #707） |
| 功能请求 | 2（#707 内部、#709 外部） |
| 社区评论总数 | 0 |

---

**总结**：今日项目健康度良好，无回归与崩溃，核心事件集中在工具输出可靠性的修复闭环上。社区侧出现一个值得关注的目标导向执行需求。建议下一步重点推动 PR #708 合并，并在 #709 中给用户明确反馈。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-09-29

> EasyClaw（github.com/gaoyangz77/easyclaw）开源项目分析师出品


## 1. 今日速览

过去 24 小时 EasyClaw 项目整体活跃度较低，Issues 与 PR 均无新增、关闭或合并记录，社区讨论处于静默期。核心事件为 **v1.9.25 版本发布**，重点优化了达人联盟（Affiliate）审核流程、补全了达人表现数据展示，并修复了飞书媒体上传的瞬时错误重试机制。虽然 GitHub 协作层面活跃度不高，但版本迭代节奏保持稳定，项目处于有序维护状态。

| 指标 | 数值 |
|------|------|
| 新开/活跃 Issues | 0 |
| 已关闭 Issues | 0 |
| 待合并 PR | 0 |
| 已合并/关闭 PR | 0 |
| 新版本发布 | 1 |


## 2. 版本发布

### v1.9.25（TK Copilot v1.9.25）

**发布时间**：2026-09-29（估算）

**更新内容**：

| 类别 | 英文描述 | 中文说明 |
|------|----------|----------|
| 功能改进 | Improve Affiliate review workflows and show ignored sample applications in analytics | 改进达人联盟审核流程，并在分析页面展示已忽略的样品申请 |
| 功能改进 | Show fuller creator performance in Affiliate detail tables | 在达人联盟明细表展示更完整的达人表现数据 |
| 稳定性 | Retry transient Feishu media uploads | 重试飞书媒体上传的临时错误 |

**破坏性变更**：无

**迁移注意事项**：本次更新以功能增强和稳定性改进为主，未涉及数据结构变更或接口破坏，用户可直接升级。若你正在使用达人联盟审核功能，新版分析页面会新增"已忽略样品申请"的展示模块，请留意页面布局变化。


## 3. 项目进展

今日无合并或关闭的 PR 记录，GitHub 协作动态为零。但 v1.9.25 版本的发布本身代表了实质性的项目推进：

- **达人联盟审核工作流得到完善**，从版本说明来看，审核流程在逻辑和效率上有所优化
- **数据可见性提升**，已忽略的样品申请和更完整的达人表现数据进入分析报表，有助于用户做出更准确的业务决策
- **稳定性韧性增强**，飞书媒体上传增加重试机制，减少了因瞬时网络抖动导致的失败率

👉 相关链接：[Releases - v1.9.25](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.25)


## 4. 社区热点

今日无新增 Issues 或 PR，没有产生高讨论度、高评论量的社区热点话题。社区处于相对安静的间歇期，属于正常节奏，无需特别关注。


## 5. Bug 与稳定性

今日无新报告的 Bug、崩溃或回归问题。

**稳定性备注**：v1.9.25 中针对"飞书媒体上传临时错误"的重试机制，暗示此前存在相关传输失败场景。该问题已在本次版本中以重试策略加以缓解，建议使用飞书集成的用户升级后观察上传成功率是否有改善。

👉 相关链接：[v1.9.25 Release Notes](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.25)


## 6. 功能请求与路线图信号

今日无新功能请求 Issues。结合 v1.9.25 的发布内容分析，**达人联盟（Affiliate）模块**是当前的重点迭代方向：

- 审核流程优化 → 产品在完善业务流程闭环
- 忽略样品申请展示 → 数据透明化趋势
- 达人表现数据补全 → 报表功能深化

这些信号表明"达人联盟的精细化管理与数据化运营"可能是下一阶段的路线图重点，值得关注后续版本是否继续在该领域深化。


## 7. 用户反馈摘要

今日无新增 Issues 评论，无法直接提炼用户反馈。

**间接信号**：v1.9.25 的发布内容侧面反映了用户的使用场景和需求方向——使用达人联盟功能的用户需要更灵活的审核控制（忽略样品）和更全面的达人数据视图；使用飞书集成的用户对上传稳定性有明确要求。这些功能点应是此前用户反馈的集中体现，现已通过版本更新落地。


## 8. 待处理积压

当前无长期未响应的重要 Issue 或 PR。项目维护状态健康，不存在明显的积压问题。

---

**项目健康度评估**：🟢 稳定

项目发布节奏正常（v1.9.25 为本日唯一动态），功能迭代方向清晰，无明显问题积压。虽社区互动量低，但对一个工具型开源项目而言，稳定维护、按版本推进功能优化即是健康的标志。建议后续重点关注达人联盟模块的持续演进以及用户对新版本的实际反馈。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*