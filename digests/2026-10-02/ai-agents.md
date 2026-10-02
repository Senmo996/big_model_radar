# OpenClaw 生态日报 2026-10-02

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-10-02 03:00 UTC

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

### OpenClaw 项目动态日报 — 2026-10-02

---

#### 1. 今日速览

过去 24 小时，OpenClaw 项目保持极高活跃度：**500 条 Issue 更新**（新开/活跃 292，关闭 208），**500 条 PR 更新**（待合并 282，合并/关闭 218），并有 **1 个新版本**发布。社区讨论焦点集中在多个 P0 级稳定性问题上，尤其是 Windows 平台的 SQLite WAL 无限增长、`prepared-model-catalog` 工作线程内存泄漏、以及网关冷启动/事件循环饥饿等问题。尽管存在大量待修复的严重缺陷，但项目修复节奏同样空前——大量 `fix-shape-clear` / `queueable-fix` 标签的 PR 进入队列，且 `extended-stable` 版本 v2026.8.34 发布，表明团队正在兼顾稳定性维护与功能加速。**整体判断：项目高度活跃，稳定性承压，维护响应快速。**

---

#### 2. 版本发布

- **v2026.8.34** — `extended-stable`（Gateway-only 版本）
  - 链接: https://github.com/openclaw/openclaw/releases/tag/v2026.8.34（备注：该链接基于数据推测，实际请以仓库 Releases 页为准）
  - 说明: 作为当前 LTS 的等价版本，该版本基于 2026 年 8 月底代码，**合并了关键安全更新、可靠性/性能修复，并包含新模型支持**。
  - **破坏性变更**: 无明确披露；但作为 gateway-only 版本，建议插件/channel 升级前对照变更日志。
  - **迁移注意事项**: 该版本仅限 Gateway 服务，请勿将其用于 CLI 或桌面端；升级前务必备份 `~/.openclaw` 下的 SQLite 数据库（多个 P0 问题与此相关）。

---

#### 3. 项目进展

今日合并/关闭的 PR 数量约 218 条，以下为关键合并/关闭项，展示了项目在稳定性、兼容性和安全性方面的显著推进：

- **fix(sessions): keep accepted runs alive across config reloads**（#163174，已合并）— 修复 Matrix/Telegram 在热加载配置时已受理任务被取消的问题。对消息可靠性是重要补强。链接: https://github.com/openclaw/openclaw/pull/163174
- **fix(storage): join WAL maintenance before database retirement**（#162166，已合并）— 修复数据库关闭时 WAL 定时器/异步任务竞态，涉及 agent/Logbook/memory 多库，降低损坏风险。链接: https://github.com/openclaw/openclaw/pull/162166
- **fix(skills): guide discovery when the prompt omits the directory**（#162842，已合并）— 修复 skill 目录被提示词裁剪时的误导性指引。链接: https://github.com/openclaw/openclaw/pull/162842
- **fix(ci): run full type checks when selectors are absent**（#163123，已合并）— 修复 CI 可能跳过生产/测试类型检查的问题，提升验证可靠性。链接: https://github.com/openclaw/openclaw/pull/163123
- **fix(e2e): normalize registry helper image permissions**（#163188，已合并）— 修复 Docker 首跳验证中 `ELIFECYCLE` 错误。链接: https://github.com/openclaw/openclaw/pull/163188

**方向上**，今日 PR 集中在 ① Windows 代理环境克隆问题（多条关联 PR 使用 DataCloneError 与 Proxy 剥离修复）；② Plugin SDK 在 Bun 下的确定性失败修复；③ Skill 搜索排名与前缀覆盖改进；④ 多项 CI/编译性能优化。说明项目同时处理用户可感知的问题，并投资于基础设施内功。

---

#### 4. 社区热点

以下 Issue 引发大量讨论，反映社区真实痛点：

- **#143524**（103 评论，P0）— [Bug]: Agent SQLite WAL 在 Windows 上增长到 2.8GB，导致网关启动阻塞。  
  链接: https://github.com/openclaw/openclaw/issues/143524  
  **社区诉求**：用户指出 `wal_autocheckpoint=1000` 未生效，手动 checkpoint 后再次增长，强烈要求提供持久的自动机制。此条为全项目评论数最高。

- **#153257**（40 评论，P0）— [Bug]: 2026.9.5 升级导致 8 小时恢复会话。  
  链接: https://github.com/openclaw/openclaw/issues/153257  
  **社区情绪**：用户明确表达对升级的后悔，称稳定环境被破坏。这是升级治理方面的警示信号。

- **#149538**（23 评论，P0）— [Bug]: Gateway 就绪但不服务，/health 探针超时，事件循环饥饿（632-agent fleet）。  
  链接: https://github.com/openclaw/openclaw/issues/149538  
  **社区诉求**：大规模部署（632 agents）下 100% 复现，影响严重，用户描述 RSS 不断增长直至 OOM，期望尽快发布 hotfix。

- **#157067**（21 评论，P1，已关闭）— [Bug]: Windows 隔离 cron 设置传递不可克隆的 Proxy 环境变量。  
  链接: https://github.com/openclaw/openclaw/issues/157067  
  该问题衍生出 #161654/#161828 等系列问题，最终于今日被标记为已关闭。社区对 Windows 平台可用性的关注度持续上升。

---

#### 5. Bug 与稳定性

按严重等级排列（P0 优先），**标注是否已有修复 PR**：

**P0（阻塞/崩溃）**

| Issue | 问题 | 修复状态 |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | Windows 上 Agent SQLite WAL 无限增长至 GB 级 | 无新 fix PR，等待维护者 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | Gateway 事件循环饥饿，健康检查超时（632-agent fleet） | 无新 fix PR |
| [#159662](https://github.com/openclaw/openclaw/issues/159662) | `prepared-model-catalog.worker.js` 无界内存泄漏（4-5GB/h） | 无 fix PR；有姊妹 issue #160522 报告隔离区达 1.15GB |
| [#160521](https://github.com/openclaw/openclaw/issues/160521) | 网关崩溃：read-admission seal → unhandled rejection | 无新 fix PR |
| [#160386](https://github.com/openclaw/openclaw/issues/160386) | 2026.9.6 严重 SQLite I/O 压力，RPC 超时 | 无新 fix PR |
| [#161828](https://github.com/openclaw/openclaw/issues/161828) | Windows `chat.send` 仍因嵌套 Proxy 失败（DataCloneError） | **已关闭**（相关修复在 #161654 基础上补完） |
| [#161953](https://github.com/openclaw/openclaw/issues/161953) | Windows: `sessions.create` 失败（`\\?\` SQLite 路径泄漏） | **已关闭**（fix-shape-clear 标记） |
| [#155859](https://github.com/openclaw/openclaw/issues/155859) | 网关启动时间随插件数量线性恶化（discord/codex/weixin 占满 120s） | 无新 fix PR |

**P1（严重）**

- [#157126](https://github.com/openclaw/openclaw/issues/157126) — claude-cli MCP 桥继承错误请求作用域，导致权限丢失（security）。**有 linked PR**。
- [#161976](https://github.com/openclaw/openclaw/issues/161976) — WhatsApp 重启后回复投递反复失败。**无修复**。
- [#156895](https://github.com/openclaw/openclaw/issues/156895) — Agent 创建的定时任务在 20ms 内失败关闭（“Scheduled account unavailable”）。**无修复**。
- [#118839](https://github.com/openclaw/openclaw/issues/118839) — “重启恢复声明被修改”回归再次出现。**无新修复**。

**趋势判断**：Windows 平台问题是当前最大稳定性短板（今日关闭 3 个相关 P0/P1）；内存问题集中在 `prepared-model-catalog` worker，且有多条独立 issue 交叉验证，需要优先排查。

---

#### 6. 功能请求与路线图信号

社区呼声较高的新需求，以及可能被纳入下个版本的信号点：

- **Exec 认证 Denylist 模式**（[#6615](https://github.com/openclaw/openclaw/issues/6615) / [#71097](https://github.com/openclaw/openclaw/issues/71097)）— 两独立请求都希望加 denylist 策略，支持“默认放行，但阻止危险命令”。关注度高（👍 8），已有设计共鸣，**可能进入路线图**。
- **Agent 记忆变更审计日志**（[#20935](https://github.com/openclaw/openclaw/issues/20935)）— MEMORY.md 无审计，社区希望防篡改和可追溯。该请求已存在数月，无排期迹象。
- **PR #162987** — `feat(claws): expose lifecycle backend for Control UI`，为无终端环境提供插件管理/更新机制，说明项目正在补足 **无头/桌面端管理链路**，是明确的路线图信号。链接: https://github.com/openclaw/openclaw/pull/162987
- **PR #163124** — `feat(agents): allow managed worktrees for hidden subagents`，允许隐藏的 `sessions_spawn` 使用工作树，属于工作流增强。链接: https://github.com/openclaw/openclaw/pull/163124
- **PR #160108** — `feat: prepare cloud workers for enterprise repositories`，针对 GitHub Enterprise 私有仓库的云 worker 支持，企业级方向。链接: https://github.com/openclaw/openclaw/pull/160108

---

#### 7. 用户反馈摘要

从今日活跃的 Issue 评论/摘要中提炼：

1. **升级反复破坏稳定性，用户心理预期变差**。 #153257 用户明确表示“后悔升级”，#143524 等 P0 问题让社区对 9.x 系列的稳定性质疑增加。建议维护者加强对 `extended-stable` 版本验证广度的宣传。
2. **Windows 用户是当前最痛的群体**。 多条 issue 汇集了 `DataCloneError`、SQLite 路径前缀、Proxy 克隆等 Windows 专属问题——表明跨平台测试覆盖的缺口正在被规模化暴露。
3. **大型部署（多 agent/多 worker）用户承担了最大的质保成本**。 #149538（632 agents）、#160521（11.5k 轨迹、8GB RAM）显示负荷对稳定性问题的放大效应，但没有专门的性能 drone 响应。
4. **积极反馈**： 针对 Windows Proxy 问题的修复链在 24h 内完成关闭（#157067→#161654→#161828），社区在#161828 的关闭中能看到维护者快速跟进，有助于缓和整体负面情绪。

---

#### 8. 待处理积压

以下为长期未响应/未得到修复的重要问题，建议维护者优先关注：

- **#97616**（2026-06-29 开启，16 评论）— [Bug]: 钩子/工具子进程泄漏为僵尸进程，运行时退化。  
  链接: https://github.com/openclaw/openclaw/issues/97616  
  *无任何 fix PR，持续超过 3 个月，影响长时运行节点。*

- **#85030**（2026-05-21 开启，16 评论）— [Bug]: MCP 工具未注入 `sessions_spawn` 子代理会话（多配置忽略）。  
  链接: https://github.com/openclaw/openclaw/issues/85030  
  *虽有两个相关 PR 但均未合并，且需产品决策（needs-product-decision）。*

- **#6615**（2026-02-01 开启，12 评论）— [Feature]: exec-approvals 支持 denylist。  
  链接: https://github.com/openclaw/openclaw/issues/6615  
  *8 人 👍，但 8 个月未处理，伴有 security-review 标签。*

- **#65374**（2026-04-12 开启，10 评论）— [Bug]: 内置 dreaming 系统在多代理环境下污染 agent 身份。  
  链接: https://github.com/openclaw/openclaw/issues/65374  
  *严重且涉及数据安全（security），无新进展。*

- **#118185**（2026-08-02 开启，9 评论）— [Bug]: 单次 claude-cli turn 被双重写入且内容不一致。  
  链接: https://github.com/openclaw/openclaw/issues/118185  
  *转录完整性核心链路问题，linked PR 已存在但长期未合并。*

---

**日报总结**：OpenClaw 项目今日整体呈现高活跃、高压力、高修复加速的局面。P0 问题集中于 Windows 与内存管理，但项目已展示出对关键问题快速响应的能力。社区信心因近期多起回归事件受损，建议维护团队同步发布一份“升级安全须知”或

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**日期：2026-10-02**

---

## 1. 生态全景

当前开源个人 AI 助手/自主智能体生态处于 **“核心主导、众星追随”** 的格局：OpenClaw 以单日 500 条 Issue + 500 条 PR 的绝对体量位居中心，其余项目（ZeroClaw、NanoClaw、NanoBot 等）在数条至数十条量级活跃，并主动吸收 OpenClaw 的修复思路与架构经验。全行业正从“堆叠功能”转向 **“稳定性攻坚”**：Windows 兼容性、SQLite 写入可靠性、多 Agent 权限隔离成为跨项目的高频痛点。安全、供应链加固与远程管理能力开始成为新竞争力的分水岭。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---|---|---|---|
| **OpenClaw** | 500（新开/活跃 292，关闭 208） | 500（待合并 282，合并/关闭 218） | v2026.8.34 | 极高活跃，稳定性承压，修复响应快 |
| **ZeroClaw** | 39（全部新增/活跃） | 50（全部待合并，0 合并） | 无 | 高活跃，功能开发密集，合并通道积压严重 |
| **NanoClaw** | 4（全部打开） | 26（15 合并/关闭，11 待合并） | 无 | 较高活跃，安全加固与发布治理 |
| **CoPaw** | 7（全部开放） | 9（7 待合并，2 关闭后替换） | 无 | 中高活跃，WebUI 与多 Agent 功能演进 |
| **NanoBot** | 0 新开 | 17（14 待合并，3 合并/关闭） | 无 | 稳定，PR 积压等待冲突解决 |
| **PicoClaw** | 2（开放） | 13（12 待合并，1 合并） | 无 | 中等活跃，运维响应滞后 |
| **LobsterAI** | 7（旧 Issue 标记 stale） | 7（全部合并/关闭） | 无 | 中等活跃，质量巩固与架构清理 |
| **IronClaw** | 2（活跃） | 2（全部待合并） | 无 | 稳定但停滞，大型 PR 悬置超 7 周 |
| **Moltis** | 0 新开 | 2（待合并） | 无 | 低活跃，定向修复协议与 MCP 可靠性 |
| **TinyClaw** | 0 新开 | 3（全部合并/关闭） | 无 | 低-中活跃，Telegram 集成收尾 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 |
| **EasyClaw** | 0 | 0 | 无 | 无活动 |

---

## 3. OpenClaw 在生态中的定位

**无可争议的生态基准与“事实标准”。**

- **社区规模**：OpenClaw 单日 Issue/PR 更新量分别为 500 条，是 ZeroClaw 的约 10 倍、NanoClaw 的约 19 倍、NanoBot 的约 30 倍。其单日合并/关闭 218 条 PR，已超过多数项目全月水平。
- **技术路线**：以“网关（Gateway）为核心、多端分离（CLI/Desktop/Gateway-only）”架构，覆盖几十种 IM 渠道，SQLite 承载会话与记忆，插件 SDK 支持 Bun 运行时。当前在 `extended-stable` 与快速迭代主版本间建立双轨机制。
- **相对优势**：生态覆盖面（渠道数、平台数）最广；维护团队对 P0 问题响应速度最快（Windows Proxy 问题 24h 内关闭）；版本线规划明确（LTS 与 Gateway-only 分流）。
- **相对劣势**：Windows 平台稳定性拖累口碑；多 P0 内存问题（`prepared-model-catalog` worker 泄漏）尚未修复；高频发布带来升级回归风险，社区已现“后悔升级”的负面情绪。

其他项目多为 **OpenClaw 的衍生/垂直化重构**（如 LobsterAI 直接依赖 OpenClaw，ZeroClaw/PicoClaw/NanoClaw 在命名与功能上高度参照），但规模与影响力差距显著。

---

## 4. 共同关注的技术方向

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-10-02

## 今日速览
过去 24 小时 NanoBot 无新 Issue 产生、无新版本发布，PR 侧更新 17 条（待合并 14 条、合并/关闭 3 条），整体处于「开发节奏稳定、Issue 侧安静、PR 积压消化中」的状态。今日关闭的 3 个 PR 分别为多模态图像工具、子代理模型配置、无用运行时清理，标志着 Agent 能力扩展和 WebUI 架构清理两个方向有实质性收尾。与此同时，一批标注 `conflict` 的 PR（如 #5536、#5601、#5943）等待冲突解决，值得维护者优先关注。

---

## 版本发布
无新版本 Release。

---

## 项目进展
今日合并/关闭的 3 个 PR 覆盖了「Agent 工具能力」「模型运行时管理」「代码清理」三条线，具体如下：

- **#2095**（`[CLOSED]`）[feat: add read_image tool for local multimodal inspection](https://github.com/HKUDS/nanobot/pull/2095)  
  新增 `read_image` 工具，使 NanoBot 能够调用多模态模型检查本地磁盘上的图像文件，并在工具返回值中引入多模态内容块。该能力对图像类 Agent 场景有直接价值，意味着多模态落地又进一步。

- **#2094**（`[CLOSED]`）[feat: add explicit subagent model config and in-process runtime reload](https://github.com/HKUDS/nanobot/pull/2094)  
  引入 `agents.defaults.subagent_model` 配置项，使子代理的模型选择显式化；同时增加进程内运行时重载路径。这改善了多模型场景下的可配置性，为后续运维和动态调参奠定基础。

- **#5999**（`[CLOSED]`）[refactor: remove unused runtime and WebUI helpers](https://github.com/HKUDS/nanobot/pull/5999)  
  清除了运行时所有权和 WebUI 传输变更后遗留的重复/未使用辅助函数（settings 路由重复操作、无调用方的 Weixin GET 包装、测试中已过时的 diff/title/sidebar 包装等）。这是 WebUI 架构演进中的必要清理，降低后续维护成本。

总体来看，今日项目推进集中在「Agent 工具能力补齐」与「代码架构瘦身」两个点，前者增强功能、后者提升可维护性。

---

## 社区热点
由于当前数据未提供 Issue/PR 的评论数，无法依据「评论量」排序。但从 PR 标签、打开时长和涉及用户诉求来看，以下 PR 是社区关注焦点：

- **#5941**（`[OPEN]`，2026-09-27 创建）[feat(webui): connect to existing remote nanobot instances](https://github.com/HKUDS/nanobot/pull/5941)  
  该 PR 提出从本地 WebUI 直连已在服务器上运行的 NanoBot 实例，无需维护端口转发命令或独立启动器，会话、模型配置、频道和工具继续保留在远端服务器。这是将 NanoBot 从「单机工具」推向「远程管理模式」的信号，需求典型、使用场景明确，是社区潜在呼声较高的一项工作。

- **#5953**（`[OPEN]`，priority: p0）[fix(tools): atomic writes for file tools to prevent torn content and crash-window loss](https://github.com/HKUDS/nanobot/pull/5953)  
  针对 `WriteFileTool`/`EditFileTool`/`ApplyPatchTool` 就地写文件导致的「半截文件读」「崩溃窗口数据丢失」问题，提出原子写方案。严重级别 p0，直接影响文件工具的数据安全性，是当前最高优度的修复 PR，社区关注度必然不低。

- 另外，多个 KDB-Wind 提交的 bug-fix PR（#5601、#5536、#5483、#5698 等，持续 1 个多月未合并）也因涉及会话稳定性和安全边界，可能吸引持续关注。

---

## Bug 与稳定性
今日无新 Issue 报告，但有多个待合并的 bug-fix PR 与稳定性相关，按严重程度排列如下：

| 严重程度 | PR | 问题描述 | 状态 |
|---|---|---|---|
| **P0** | [#5953](https://github.com/HKUDS/nanobot/pull/5953) | 文件工具就地写入可产生 torn reads 与崩溃窗口数据丢失；需原子写 | OPEN，待合并 |
| **P1** | [#5536](https://github.com/HKUDS/nanobot/pull/5536) | 受限 shell 无沙箱时命令字符串检查无法约束工作区边界（关联 #4072） | OPEN，conflict 待解决 |
| **P1** | [#5943](https://github.com/HKUDS/nanobot/pull/5943) | 会话持久化在多个执行/更新路径间共享可变缓存，需以 SQLite 事务收敛状态所有权 | OPEN，conflict 待解决 |
| **P2** | [#5483](https://github.com/HKUDS/nanobot/pull/5483) | 已删除会话可能被延迟消息/子代理结果重建 | OPEN，待合并 |
| **P2** | [#5698](https://github.com/HKUDS/nanobot/pull/5698) | WebUI 搜索切换时未保留显式 API 类型 | OPEN，conflict 待解决 |
| **P2** | [#5678](https://github.com/HKUDS/nanobot/pull/5678) | DNS 解析返回空结果时未拒绝请求，需修复 SSRF 防护 | OPEN，待合并 |
| **P2** | [#5257](https://github.com/HKUDS/nanobot/pull/5257) | 持续目标回合空闲时可能无限“继续”回复，介质自触发 | OPEN，conflict 待解决 |

以上 PR 均已有对应修复方案，暂无新增回归报告。

---

## 功能请求与路线图信号
暂无用户新增 Issue 请求，但从今日活跃 PR 中可以提炼出 4 个功能演进方向：

1. **远程实例管理**（[#5941](https://github.com/HKUDS/nanobot/pull/5941)）  
   本地 WebUI 直连远端 NanoBot，支持「远程会话管理 + 本地查看」模式，是运维体验的重要提升。

2. **多模态文件检查**（[#2095](https://github.com/HKUDS/nanobot/pull/2095)，已关闭）  
   `read_image` 工具是向多模态 Agent 迈出的坚实一步，后续可衍生更多本地媒体处理工具。

3. **子代理模型显式配置与热重载**（[#2094](https://github.com/HKUDS/nanobot/pull/2094)，已关闭）  
   显式子代理模型 + 进程内重载，是面向复杂多 Agent 编排的基础设施能力。

4. **结构化决策客户端抽象**（[#5825](https://github.com/HKUDS/nanobot/pull/5825)，OPEN）  
   将 JEV 专用客户端抽象为 provider/protocol 中立的「结构化决策客户端」，首期接入 OpenRouter + System One 协议。这暗示 NanoBot 正在将「决策能力」作为通用服务开放，或为后续接入更多推理后端做准备。

综合来看，「远程化」「多模态」「可插拔模型路由」是当前路线的突出信号，下一版本大概率覆盖其中 1-2 项。

---

## 用户反馈摘要
由于数据源未包含评论正文，无法直接引用用户原话。从 PR 描述中可提炼以下真实痛点：

- **文件工具可靠性**（[#5953](https://github.com/HKUDS/nanobot/pull/5953)）：用户/编辑器/另一 Agent 并发读取时可能看到半写文件，崩溃时甚至丢失整段写入内容——对自动化链路来说这是不可接受的数据风险。
- **远程使用门槛**（[#5941](https://github.com/HKUDS/nanobot/pull/5941)）：用户希望免去端口转发、独立启动器等繁琐步骤，直接连接已在服务器上运行的实例，保持会话和配置不被本地化割裂。
- **会话生命周期副作用**（[#5601](https://github.com/HKUDS/nanobot/pull/5601)、[#5483](https://github.com/HKUDS/nanobot/pull/5483)）：被拒绝/删除的消息可能遗留附件、订阅、临时聊天注册或延迟消息回灌重建会话——用户对“操作后状态干净”有较高期望。
- **短会话恢复体验不佳**（[#5885](https://github.com/HKUDS/nanobot/pull/5885)）：每会话过期即做 LLM 摘要替换，导致短会话返回质量下降，用户期望按 token 阈值决策是否保留原始转录。

总体反馈偏向「可靠性」「会话一致性」「远程操作性」三个关键词，未见对核心交互方式的强烈不满。

---

## 待处理积压
以下 PR 打开时长较长且仍未合并，其中多个标注 `conflict`，建议维护者优先处理：

| PR | 创建时间 | 标签 | 备注 |
|---|---|---|---|
| [#5166](https://github.com/HKUDS/nanobot/pull/5166) | 2026-07-29 | question, fix, conflict | 继承的 goal permission 在作用域外未过期 |
| [#5257](https://github.com/HKUDS/nanobot/pull/5257) | 2026-08-05 | bug, p2, conflict | 持续目标回合空闲时自动“继续” |
| [#5339](https://github.com/HKUDS/nanobot/pull/5339) | 2026-08-11 | fix(webui) | 丢弃消息后临时聊天仍在等待恢复 |
| [#5412](https://github.com/HKUDS/nanobot/pull/5412) | 2026-08-17 | conflict | Gateway 后台子进程日志被缓冲 |
| [#5483](https://github.com/HKUDS/nanobot/pull/5483) | 2026-08-22 | bug, p2 | 删除的会话被延迟消息重建 |
| [#5536](https://github.com/HKUDS/nanobot/pull/5536) | 2026-08-25 | **p1**, conflict | 受限 shell 缺少沙箱时 fail closed |
| [#5601](https://github.com/HKUDS/nanobot/pull/5601) | 2026-08-29 | conflict | WebUI 拒绝消息的副作用回滚 |
| [#5678](https://github.com/HKUDS/nanobot/pull/5678) | 2026-09-06 | security, p2 | DNS 空结果未拒 + SSRF 覆盖 |
| [#5698](https://github.com/HKUDS/nanobot/pull/5698) | 2026-09-08 | bug, p2, conflict | 搜索开关时 API 类型未保留 |
| [#5825](https://github.com/HKUDS/nanobot/pull/5825) | 2026-09-20 | provider, feature, p2 | 结构化决策客户端 |
| [#5885](https://github.com/HKUDS/nanobot/pull/5885) | 2026-09-23 | **p1**, conflict | 空闲转录替换增加 token 阈值 |
| [#5943](https://github.com/HKUDS/nanobot/pull/5943) | 2026-09-27 | **p1**, conflict | 会话状态所有权集中到 SQLite |
| [#5953](https://github.com/HKUDS/nanobot/pull/5953) | 2026-09-28 | **p0** | 文件工具原子写 |

其中 `conflict` 标注的 PR 建议维护者在近期集中解决合并冲突，避免健康度进一步下滑。**P0 #5953** 是最紧急的待处理项，建议下一个发布周期优先合入。

---

> 以上日报基于 2026-10-02 数据快照生成，所有链接均指向 GitHub 原始 PR。数据客观、可回溯，供项目维护者与社区同学参考。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-10-02

## 1. 今日速览

过去 24 小时 ZeroClaw 项目保持高活跃度：共 39 条 Issue 更新（全部为新增或活跃讨论，无关闭），50 条 PR 更新（全部待合并，无合并/关闭），无新版本发布。本次更新中涌现了两大明显信号：**安全/权限类缺陷集中爆发**（尤其是 S0/S1 级数据安全与越权问题，涉及 SOP 执行顺序、委托内存越权、配置覆写等），以及 **插件生命周期、网关核心化、运行时组合边界**三大工程方向的 PR 大批量涌出（Aarlington 的 SOP/auth 修复堆栈四连，JordanTheJet 的 gateway 与 composition 系列）。整体看，项目正处于 **v0.8.6/v0.9.0 功能密集开发期**，但合并通道存在显著积压（50 条 PR 待合入），建议关注核心维护者的 review 负载。

## 2. 版本发布

今日无新版本 Release。

## 3. 项目进展

今日 **0 个 PR 被合并或关闭**，全部 50 条 PR 处于待合并状态。尽管如此，待合并队列的构成清晰反映了项目当前的主攻方向，以下三组堆叠 PR 值得重点关注：

- **运行时权限与隔离加固（安全前线）**：Aarlington 提交了四连改进，均标记 `size:XL` 且相互依赖：
  - [#11408 fix(sop): restrict RPC admission and guard storage effects](https://github.com/zeroclaw-labs/zeroclaw/pull/11408) — 要求管理员级别授权才能调用 SOP RPC，并为存储副作用加防护；
  - [#11409 fix(delegate): refuse owned background result paths](https://github.com/zeroclaw-labs/zeroclaw/pull/11409) — 拒绝拥有者（principal-owned）后台结果路径，防止越权；
  - [#11410 fix(auth): guard cron writes and contain unscoped execution](https://github.com/zeroclaw-labs/zeroclaw/pull/11410) — 保护 cron 写入，限制未授权执行；
  - [#11411 fix(sop): enforce private run ownership and audit routing](https://github.com/zeroclaw-labs/zeroclaw/pull/11411) — 强制私有运行归属与审计路由。
  
  这组 PR 直接对应当前多个 S0/S1 Issue（详见下文 Bug 与稳定性），是安全内核的重要加固。

- **网关核心化（Gateway over Core）**：JordanTheJet 主导的三个堆叠 PR 持续推进 `zeroclaw-gw` 与核心进程的接口迁移：
  - [#11381 feat(gateway): serve session messages, state and delete by exact row](https://github.com/zeroclaw-labs/zeroclaw/pull/11381)
  - [#11382 feat(gateway): serve status, logs, doctor and the event stream](https://github.com/zeroclaw-labs/zeroclaw/pull/11382)
  - [#11417 feat(gateway): serve config writes, Quickstart and reload via the core](https://github.com/zeroclaw-labs/zeroclaw/pull/11417)

  这是将网关从独立进程收敛为核心的一部分，预期提升配置一致性与可运维性。

- **插件体系工程化**：IftekharUddin 的插件 PR 群（[#11302 绑定通道实例与授权注入](https://github.com/zeroclaw-labs/zeroclaw/pull/11302)、[#11303 WASM 通道 WebSocket 端到端测试](https://github.com/zeroclaw-labs/zeroclaw/pull/11303)、[#11308 带分级约束的类型化工具清单](https://github.com/zeroclaw-labs/zeroclaw/pull/11308)、[#11309 quickstart 安装并激活工具插件](https://github.com/zeroclaw-labs/zeroclaw/pull/11309)）与 JordanTheJet 的 tool-gating PR（[#11221 将 SaaS 与编码 CLI 工具置于可选 feature 之后](https://github.com/zeroclaw-labs/zeroclaw/pull/11221)）、composition PR（[#11174](https://github.com/zeroclaw-labs/zeroclaw/pull/11174)、[#11187](https://github.com/zeroclaw-labs/zeroclaw/pull/11187)）共同构成了 **v0.8.6 插件化运行时** 的完整拼图。

由于这些 PR 均未合入，今日净合并进展为 0，但工程方向非常清晰：**v0.8.6 的插件与组合运行时形态已接近成型，当前处于密集 review 阶段**。

## 4. 社区热点

今日讨论最活跃的 Issue 前三位：

- **[#9600 [Tracker] 会话持久化契约所有权与层次排序（16 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)** — 这是一个由 4 个独立工作流同时修改会话持久化契约而引发的跟踪器。它被开发者频繁引用，说明 **会话持久化是所有功能开发的公共地基**，当前缺乏单一 owner 的问题已成为社区共识性痛点。

- **[#9799 bug(daemon): 长驻临时守护进程可持续占用多核 CPU（5 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/9799)** — 报告了 `--ephemeral` 守护进程在运行 17 小时后 CPU 占用 140–177% 的现象，并伴有已关闭的 Telegram socket。这是生产环境中最影响体验的资源泄漏类问题，社区关注度高。

- **[#10066 [Bug] SOP 引擎先推进后续步骤、后记录输出模式拒绝（4 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)** — S1 级流程阻塞 bug，与今日 Aarlington 的 SOP 修复堆栈直接对应，说明该问题正在得到认真对待。

PR 方面，尽管评论数未公开，但 **Aarlington 的四连 SOP/auth 堆叠 PR** 与 **JordanTheJet 的 gateway 堆叠 PR** 在今日更新频繁（均在 10-01 至 10-02 持续更新），是当前社区 review 的重点对象。

## 5. Bug 与稳定性

以下是按严重程度排列的今日活跃 Bug，已标注是否有对应修复 PR。

### S0 — 数据丢失 / 安全风险

| Issue | 问题 | 对应修复 PR |
|---|---|---|
| [#10495 Config::save() 可能清空运营者配置](https://github.com/zeroclaw-labs/zeroclaw/issues/10495) | 109KB/25 agents 的配置被替换成 702 字节近空文件，S0 级数据丢失 | ❌ 无直接 PR |
| [#11198 委托记忆工具丢失主体作用域](https://github.com/zeroclaw-labs/zeroclaw/issues/11198) | 子代理构造的记忆工具不再受主体私有平面约束，S0 级安全风险 | ✅ 相关修复见 [#11409](https://github.com/zeroclaw-labs/zeroclaw/pull/11409)（delegate 堆栈） |
| [#11239 通过 spawn_subagent 与 execute_pipeline 触达共享记忆平面](https://github.com/zeroclaw-labs/zeroclaw/issues/11239) | 两个工具路径让拥有者会话绕过私有平面访问共享记忆，S0 级 | ✅ 相关修复见 [#11409](https://github.com/zeroclaw-labs/zeroclaw/pull/11409) |

### S1 — 工作流阻断

| Issue | 问题 | 对应修复 PR |
|---|---|---|
| [#10066 SOP 引擎在记录输出拒绝前先执行后续步骤](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | 校验失败后后续步骤仍真实执行 | ✅ [#11408](https://github.com/zeroclaw-labs/zeroclaw/pull/11408) |
| [#11369 Docker 镜像启动即退出，升级中断可能滞留数据库](https://github.com/zeroclaw-labs/zeroclaw/issues/11369) | 数据目录锁在配置加载前生效，不同配置路径导致启动失败 | ❌ 无直接 PR |
| [#11418 "Copy" 一键复制功能失效](https://github.com/zeroclaw-labs/zeroclaw/issues/11418) | TUI 复制按钮无任何剪贴板效果 | ❌ 无直接 PR |

### S2 — 降级行为

| Issue | 问题 | 对应修复 PR |
|---|---|---|
| [#11387 zerocode 再次忽略启动目录，强制以 agent 工作区为 cwd](https://github.com/zeroclaw-labs/zeroclaw/issues/11387) | #10609 的回归，属于二次复发 | ❌ 无直接 PR |
| [#11336 `plugin info` / `plugin list --verify` 误报 `[loads]`](https://github.com/zeroclaw-labs/zeroclaw/issues/11336) | 无 config_schema 的插件通过检查但运行时不注册 | ❌ 无直接 PR |
| [#11204 OpenRouter 成本显示 $0.00，token 全被归类为 free](https://github.com/zeroclaw-labs/zeroclaw/issues/11204) | usage.cost 未被摄入 | ❌ 无直接 PR |
| [#11257 WhatsApp Web 丢失入站媒体文件说明文字](https://github.com/zeroclaw-labs/zeroclaw/issues/11257) | agent 只见 `[Image]` 占位符 | ❌ 无直接 PR |
| [#11420 SQLite 会话后端每次轮次重写所有消息的 created_at](https://github.com/zeroclaw-labs/zeroclaw/issues/11420) | 每条消息时间戳被替换为同一时间 | ❌ 无直接 PR |
| [#11333 Skill review 工具看不到 skill_bundles 指定的技能](https://github.com/zeroclaw-labs/zeroclaw/issues/11333) | 加载正常但 review 收集不到 | ❌ 无直接 PR |
| [#11332 Skill review/creation 不服务于 channel/webhook/gateway 场景](https://github.com/zeroclaw-labs/zeroclaw/issues/11332) | 学习循环仅对 CLI/cron 生效 | ❌ 无直接 PR |

### 趋势观察

今日 Bug

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-10-02

## 1. 今日速览

过去 24 小时内，PicoClaw 项目保持中等活跃度：Issues 更新 2 条（均处于开放状态），PR 更新 13 条（待合并 12 条、已合并/关闭 1 条），无新版本发布。代码层面的主要进展集中在 agent 消息路由与上下文管理（#3403、#3402）、通道重载安全性（#3401）、配置持久化（#3400）与更新器架构匹配修复（#3399）上，全部由 @x1F916 集中提交，形成一组较完整的稳定性修复序列。与此同时，一个标记为 CRITICAL 的官网 TLS 证书过期 Issue（#3377）仍滞留且被 stale bot 标记，值得维护者优先关注。整体来看，项目当前处于“功能活跃但运维响应滞后”的状态。

## 2. 版本发布

今日无新版本发布。

- 最新 Releases：无

---

## 3. 项目进展

**唯一合并/关闭的 PR 为 #3376（DeltaChat 通道修复）**

- [fix(deltachat): initialize as custom channel to solve config validation error](https://github.com/sipeed/picoclaw/pull/3376) — @luisgdev，合并于 2026-10-01
  - 修复了启用 deltachat 通道时 `channel "deltachat" has unknown type "deltachat"` 的配置验证错误。
  - 该问题源自 #3265，属于社区反馈较久的配置类故障，本次合并意味着 DeltaChat 用户在更新后将可直接启用该通道，无需额外 workaround。

**值得关注的待合并 PR（12 条开放中）**

@x1F916 提交的 5 个修复 PR（#3403、#3402、#3401、#3400、#3399）构成一个系列的稳定性补强，虽未合并，但均已 rebase 至最新 main 并在持续更新，建议维护者优先 review：

- [fix(agent): deliver async tool results to the originating session](https://github.com/sipeed/picoclaw/pull/3403) — 修复异步工具结果被错误路由到默认 agent 主会话的问题
- [fix(agent): resolve the owning agent in context managers](https://github.com/sipeed/picoclaw/pull/3402) — 修复 routed agent 会话中上下文管理器错误调用默认 agent 的问题
- [fix(channels): make Reload synchronous and nil-safe](https://github.com/sipeed/picoclaw/pull/3401) — 修复 `Manager.Reload` 在 channel 就绪失败时触发 nil panic 导致网关退出的问题
- [fix(config): persist all api_keys and enabled flag of multi-key models](https://github.com/sipeed/picoclaw/pull/3400) — 修复多 key 模型配置在保存时丢失 `Enabled` 标记与部分 api_key 的问题
- [fix(updater): select the matching 32-bit ARM release asset](https://github.com/sipeed/picoclaw/pull/3399) — 修复 32 位 ARM 设备上 `picoclaw update` 误装 arm64 包的问题

这批 PR 表明项目在 agent 会话隔离、网关稳定性、配置迁移与多架构分发等工程化维度上正在持续打磨，若能合并，将显著提升自托管用户的升级与配置体验。

---

## 4. 社区热点

**最受关注的 Issue： [CRITICAL] TLS certificate for picoclaw.io expired on 2026-09-10 — site is down for every browser](https://github.com/sipeed/picoclaw/issues/3377)**

- 作者：@dimonb | 评论：3 | 👍：2 | 创建：2026-09-12 | 更新：2026-10-01
- 该 Issue 是当前社区讨论最集中的话题，反响最高。
- 背后诉求：项目官网 `picoclaw.io` 的 TLS 证书已过期，所有浏览器与 TLS 客户端拒绝连接，导致外部用户无法访问项目主页信息。这对新用户了解项目、查阅文档形成了直接阻碍，也影响项目整体的专业形象。
- 值得警惕的是：该 Issue 标记为 CRITICAL 且已被 stale bot 标记，说明长时间未获得维护者有效响应，社区中已积累不满情绪。

其余 PR/Issue 均没有评论（评论数 undefined），社区互动度整体偏冷，主要流量集中在这一个运维问题上。

---

## 5. Bug 与稳定性

按严重程度排列：

|

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-10-02

## 今日速览

过去 24 小时 NanoClaw 保持较高活跃度：Issues 更新 4 条（全部处于打开/活跃状态，无关闭），PR 更新 26 条（15 条已合并/关闭，11 条仍待合并），无新版本发布。今日合并的 PR 集中于依赖安全加固与 CI 基础设施完善（grpc、Iron Proxy、tsx、GitHub Actions 精确版本固定），同时出现 1 个新报告的 Bug（OneCLI 列表分页限制）和 1 个安全审计能力请求。整体来看，维护者响应速度较快，安全与发布链路是当前重点方向。

## 项目进展

今日共 15 条 PR 合并/关闭，主要集中在依赖安全、CI 基础设施与安装流程修复，项目向前推进的维度如下：

- **供应安全链加固**：`#3981` 将 Iron 前置代理的 grpc 升级至 1.83.2，清除 6 个已知安全通告；`#3982` 将 Iron Proxy 依赖固定到 v0.52.0，解决旧版本携带 30 个依赖漏洞（含 x/crypto 0.51.0 的 17 个）；`#3968` 将所有 GitHub Actions 和 cosign 固定到精确版本，消除浮动标签被上游移动带来的 CI 安全风险。
- **依赖与运行时清理**：`#3977` 将 tsx 升级至 4.23，消除 Node 26 下每次 `ncl` 执行都会打印 `module.register()` 弃用警告的问题；`#3963` 修复更新 e2e 测试在 Node 24.13.1 之前版本上的失败，使 `/update-nanoclaw` 验证流程更可靠。
- **仓库维护**：`#3208` 新增 Docker Hub 发布工作流（含 CVE 门禁），支持 linux/amd64 和 linux/arm64 的 agent 镜像发布；`#3979` 修复 OneCLI 权限测试在 umask 077 环境下误判的问题；`#3901` 让宿主服务可通过 HTTPS 代理访问外网。
- **社区技能贡献**：`#1343` 合并了 `/add-cli-backend` 技能，允许在容器 agent-runner 中用 `claude -p` CLI 替代 Agent SDK，解决订阅 OAuth Token 使用合规问题。

## 社区热点

当前最受关注的 Issue 是 **#3456「chat-sdk-bridge: redundant Button 'value' param corrupts Discord approval custom_id」**，共 6 条评论，是今日唯一有实质性讨论的 Issue。该问题描述 Discord 渠道上的审批/提问卡片完全不可用——每个按钮因同时设置 `id` 与 `value` 导致 `custom_id` 损坏，所有点击都解析到错误选项，且出现静默拒绝与重复发送。虽然创建于 8 月 23 日，但维护者今日仍在跟踪，且存在关联的未合并 PR `#3833`（审批卡片过期与按 id 拒绝），说明该问题对 Discord 用户体验影响严重且修复路径仍在推进。

此外，PR 方面虽未展示评论数，但 `#3570`（Telegram MarkdownV2 奇数下划线导致消息丢弃）修复的是 OneCLI 连接链接无法在 Telegram 送达的痛点，用户覆盖面广，值得关注其合并进展。

## Bug 与稳定性

按严重程度排列今日活跃的 Bug：

- **严重**：[#3456](https://github.com/nanocoai/nanoclaw/issues/3456) — Discord 审批卡片按钮 `custom_id` 被多余的 `value` 参数破坏，所有审批操作静默失败且无法选择正确选项。已有 6 条评论，尚未闭合；关联 PR [#3833](https://github.com/nanocoai/nanoclaw/pull/3833)（审批卡片过期与拒绝功能）仍在开放中，但未明确标注修复关系。
- **中等**：[#3991](https://github.com/nanocoai/nanoclaw/issues/3991) — `onecli agents list`、`rules list`、`secrets list` 在不传 `--max` 时只返回前 20 条且无任何提示，输出呈现不完整。新报告，暂无 fix PR。
- **中等**：[#3984](https://github.com/nanocoai/nanoclaw/issues/3984) — PreCompact 钩子在每次压缩时调用 `getAllDestinations()` 但未注册 mailbox，直接报 `No agent mailbox registered` 并退出，导致压缩流程每次必然失败。暂无 fix PR。

另有已关闭的测试修复 `#3963`（Node 24 下 update e2e 失败），属于稳定性改进而非运行时 Bug。

## 功能请求与路线图信号

今日出现 1 个明确的功能请求：

- [#3990](https://github.com/nanocoai/nanoclaw/issues/3990) — **security-audit 能力**：请求一个只读检查命令，审计 live 安装的隔离与补丁状态（包括 wiring/destination 配置、用户角色、容器挂载、网关 block rules 等）。这反映了用户对 NanoClaw 隔离配置分散、容易漂移的担忧。结合今日合并/开放的安全相关 PR（gRPC 升级、Iron Proxy 固定、Actions 精确版本），安全加固确实是当前社区的强烈诉求，该能力有较大概率被纳入路线图。

此外，以下开放 PR 可能进入下一版本：

- [#3986](https://github.com/nanocoai/nanoclaw/pull/3986) — `/update-nanoclaw` 默认跟随 release 标签而非 `main` 分支，引入 `stable`/`beta` 更新通道。
- [#3987](https://github.com/nanocoai/nanoclaw/pull/3987) — 允许维护者自行批准 `x.y.z-rc.N` 预发布版本，同时保持稳定版需要第二审批人。
- [#3988](https://github.com/nanocoai/nanoclaw/pull/3988) — 当 gateway 仅有 skill payload 变化时也能正确刷新已安装的 gateway。

这几个 PR 聚焦发布/更新流程的精细化控制，说明项目正在为更规范、更安全的发布节奏做准备。

## 用户反馈摘要

从今日活跃 Issues 的评论与描述中可提炼出以下真实用户痛点：

- **Discord 审批链路不可用是最大的挫败来源**（[#3456](https://github.com/nanocoai/nanoclaw/issues/3456)）：用户反馈审批/提问卡片"每次点击都解析到错误选项"，且无法区分是网络问题还是功能故障，严重影响使用信任度。该 Issue 已开放超一个月，用户持续围观进度。
- **CLI 输出行为令人困惑**（[#3991](https://github.com/nanocoai/nanoclaw/issues/3991)）：用户列出 agents/rules/secrets 时只看到 20 条，没有任何提示表明结果被截断，"输出没有迹象

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-10-02

---

## 1. 今日速览

过去 24 小时 IronClaw 项目整体活跃度中性偏稳定：无新版本发布，无 PR 被合并或关闭，2 条 Issue 处于活跃状态，2 条 PR 等待合并。值得关注的是，两个活跃 Issue 均集中在浏览器会话持久化（#2358）与基准测试失败分类（#8121）两个方向，前者反映真实用户痛点，后者说明维护团队正在系统性地跟踪测试稳定性。PR 侧则有一项来自新贡献者的大型功能提案（#7499）仍处评审中，已持续近两个月，建议维护团队加速处理。整体来看，项目处于功能迭代与稳定性加固并行的阶段，但合并节奏有所放缓。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

过去 24 小时 **没有 PR 被合并或关闭**，因此无已落地变更可报。以下为当前待合并 PR 的状态快照，以便跟踪进展：

- **[#7988] chore(agents): refresh codebase knowledge graph**（核心 CI 机器人，更新于 2026-10-01）— 由夜间 `Codebase Graph Refresh` 工作流自动生成的代码库记忆快照刷新，属于常规维护任务，不涉及功能变更。该 PR 自 8 月 29 日创建，已等待约 5 周，属于低风险机械性更新，建议尽快合并。
  
  链接：https://github.com/nearai/ironclaw/pull/7988

- **[#7499] feat(identyclaw): host-mediated Passport for practitioners**（新贡献者，更新于 2026-10-01）— 为 processless IronClaw 代理添加经过 host 中介的 IdentyClaw Passport 调用能力，附带部署工具包（Node CLI + loopback helper）。该 PR 标记为 `size: XL, risk: low`，是扩展代理身份验证能力的重要功能，但悬置约 7 周，需要维护者关注评审进度。

  链接：https://github.com/nearai/ironclaw/pull/7499

综上，项目過去 24 小时无进展推进，但两个待合并 PR 均在本日有更新迹象，或预示后续将有合并动作。

---

## 4. 社区热点

- **[#2358] [enhancement] feat(browser): add BrowserProfileStore trait with encrypted tarball persistence**（1 条评论，更新于 2026-10-01）— 这是当前最受关注的 Issue。核心诉求是：浏览器会话（cookies、localStorage、IndexedDB、service workers）需要在多次 agent 运行之间存活，以避免用户反复重新认证。Chromium 的 user-data-dir 体积约 50-200MB，且包含各登录网站的 bearer token，**必须以加密方式持久化**。该 Issue 关联父任务 #2355，说明这是一项有规划的路线图功能，而非零散需求。

  链接：https://github.com/nearai/ironclaw/issues/2358

- **[#8121] Daily ironclaw failure taxonomy — 2026-10-01**（0 条评论，但属于高频日更报告）— 这类每日失败分类报告虽无直接讨论热度，但反映了维护团队对测试稳定性的持续关注，是项目健康度的重要观察窗口。

  链接：https://github.com/nearai/ironclaw/issues/8121

社区讨论热度整体较低（仅一条评论），但 #2358 的存在表明有用户或贡献者在主动提出影响日常使用体验的增强需求。

---

## 5. Bug 与稳定性

过去 24 小时无新 Bug 报告，但以下稳定性问题值得注意：

- **[中高] clawbench 测试套件 128 个非通过项，根因疑似 recurring benchmark-side 缺陷**（Issue #8121）— 该报告指出 clawbench 的 128 个非通过项目中，**主要归因于一个反复出现的 benchmark-side broken-workspace-seeding defect**。这意味着大量失败可能并非 IronClaw 本身的功能问题，而是基准测试环境的工作区种子准备环节存在缺陷。此类问题会干扰 CI 信号，掩盖真实回归。目前**无对应 fix PR**，建议维护团队优先排查 benchmark 基础设施。

  链接：https://github.com/nearai/ironclaw/issues/8121

---

## 6. 功能请求与路线图信号

- **[浏览器会话持久化]** Issue #2358 提出的 `BrowserProfileStore` trait 是目前最明确的下一个版本候选功能。其要求包括：加密 tarball 持久化、跨 agent run 保留 cookies/localStorage/IndexedDB/service workers、关联父任务 #2355。需求描述中特别强调了安全性（bearer token 保护），说明设计已考虑生产环境风险。

  链接：https://github.com/nearai/ironclaw/issues/2358

- **[身份验证能力扩展]** PR #7499 的 IdentyClaw Passport host 中介方案，与 #2358 属于同一大方向（用户状态与身份生命周期管理）。如果两者均被纳入路线图，下一版本将可能实现在无 shell 环境下完整的代理身份与会话管理能力。

  链接：https://github.com/nearai/ironclaw/pull/7499

---

## 7. 用户反馈摘要

- **痛点：重复认证影响实际使用** — Issue #2358 的出现说明有用户正在被"每次 agent 运行都要重新登录"这一问题困扰。这直接影响代理在真实工作流中的可用性，尤其是涉及多个受保护站点、长期自主操作等场景。用户需要的不仅是简单的 cookie 持久化，而是**跨会话、安全加密、自动加载**的完整解决方案。

- **满意度不明，但关注度高** — 从当前 Issue 评论数（1 条）看，用户参与深度有限，但结合父任务 #2355 的存在，表明这是一项被正式规划的路线图项目。社区可能正处于等待状态，而非失望状态。

- **维护方关注测试健康** — Daily failure taxonomy 系列（#8121）说明维护者正在主动监控测试失败模式，这种透明化的报告方式有助于社区了解项目真实状态。

---

## 8. 待处理积压

以下为长期未响应或悬置时间较长的重要 Issue/PR，建议维护者关注：

| 项目 | 类型 | 悬置时长 | 优先级建议 |
|------|------|----------|------------|
| **#2358** feat(browser): BrowserProfileStore trait | Issue | 自 2026-04-12 创建，已近 **6 个月** | **高** — 明确的路线图功能，涉及安全性设计，应给出阶段性结论或推进计划 |
| **#7499** feat(identyclaw): host-mediated Passport | PR | 自 2026-08-11 创建，已 **约 7 周** | **中高** — 新贡献者的大型 PR，长时间不处理有流失贡献者的风险 |
| **#7988** chore(agents): refresh codebase knowledge graph | PR | 自 2026-08-29 创建，已 **约 5 周** | **低** — CI 自动生成的机械性更新，应快速合并避免长期漂移 |

链接：
- https://github.com/nearai/ironclaw/issues/2358
- https://github.com/nearai/ironclaw/pull/7499
- https://github.com/nearai/ironclaw/pull/7988

---

**总结**：IronClaw 项目当前处于"稳定期但略有停滞"的状态，核心功能（浏览器会话持久化、身份认证扩展）均在进程中但推进缓慢。建议维护团队尽快合并无争议的 CI 更新（#7988），并对外部贡献者的大型 PR（#7499）给出明确的下一步计划，以避免社区活跃度下降。同时，#8121 所揭示的 benchmark 基础设施问题值得优先修复，以恢复 CI 信号的可靠性。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报 — 2026-10-02

## 今日速览

过去 24 小时 LobsterAI 未发布新版本，但完成了 7 个 PR 的合并/关闭，活跃度集中于合并队列而非新 issue 讨论。7 条被更新的 issue 均为 3 月底创建、昨日统一标记为 [stale] 的存量问题，说明维护方正在清理历史积压。值得关注的是，本次合并的 PR 横跨构建性能（esbuild 压缩）、架构简化（删除 3100+ 行死代码）、跨平台兼容（Windows SQLite 权限回退）与 UI 体验修复，显示项目在质量巩固与基础设施优化上同步推进，整体健康度良好。

**活跃度评估：中等** —— 提交/合并节奏正常，无新 feature 发布；issue 侧热度偏低，无新增讨论热点。

---

## 项目进展

今日 7 条 PR 全部合并/关闭，涵盖以下关键改进：

- **模型目录可用性修复**（[#2788](https://github.com/netease-youdao/LobsterAI/pull/2788)）：修复登出状态下模型目录为空的问题——启动时 fetch 失败不再导致模型选择器空白，并在登出时显示登录提示而非自定义模型提示。
- **Windows 兼容性增强**（[#2709](https://github.com/netease-youdao/LobsterAI/pull/2709)）：OpenClaw 在 Windows 下使用 PowerShell + `Add-Type` 创建私有 SQLite 暂存目录时，若被安全软件拦截或 C# 编译器缺失，现提供回退方案。
- **架构瘦身**（[#941](https://github.com/netease-youdao/LobsterAI/pull/941)）：删除 `yd_cowork` 引擎（基于 Claude Agent SDK）的 3 个死代码文件（3100+ 行），将 `CoworkAgentEngine` 类型收窄为 `'openclaw'`，减少误导性分支。
- **构建性能优化**（[#920](https://github.com/netease-youdao/LobsterAI/pull/920)）：修复 production 构建未压缩的问题，三个 Vite 构建目标现默认启用 esbuild minification，显著减小产物体积。
- **Sandbox 执行模式修复**（[#917](https://github.com/netease-youdao/LobsterAI/pull/917)）：`getConfig()` 不再硬编码 `executionMode: 'local'`，改为从 DB 读取实际值并做有效性校验（默认 `'auto'`）。
- **UI 体验修复**（[#915](https://github.com/netease-youdao/LobsterAI/pull/915)）：移除 `.sidebar-transition { transition: none }` 显式规则，恢复折叠动画；修复 macOS 侧边栏收起时告警横幅文字被遮挡。
- **新功能**（[#921](https://github.com/netease-youdao/LobsterAI/pull/921)）：支持 openclaw 插件本地安装（独立仓库形式），配套文档 `docs/openclaw-install-local-plugin.md`。

整体看，本次合并集中解决了多处历史遗留问题，项目在稳定性、构建质量和代码可维护性上同时迈进了扎实的一步。

---

## 社区热点

今日暂无高热度讨论（所有 issue/PR 评论数均 ≤1，👍 均为 0）。相对而言，以下两条更受关注：

- [#922 Anthropic SSE 流式解析未做行缓冲](https://github.com/netease-youdao/LobsterAI/issues/922)：流式文本片段丢失问题，直接影响高吞吐场景下的用户体验，但无 👍 或评论补充。
- [#918 openclaw doctor 自动添加 weixin](https://github.com/netease-youdao/LobsterAI/issues/918)：用户升级 3.25 后遇到的配置污染问题，无 👍 或评论补充。

社区讨论整体偏冷，**无明显热点议题**。可能与 issue 均为存量 stale 状态有关——这些旧议题在昨日被统一 touch 后并未引发新的讨论热度。

---

## Bug 与稳定性

以下按严重程度排列今日更新的 Bug 类 issue：

| 严重程度 | Issue | 描述 | 修复状态 |
|---------|-------|------|---------|
| **高（崩溃）** | [#926](https://github.com/netease-youdao/LobsterAI/issues/926) | `destroy()` 调用不存在的 `accumulator.reject` 导致 TypeError，应用退出/IM handler 重建/gateway 重连时**必现崩溃**，并中断资源清理流程 | ❌ 无对应 fix PR |
| **高（数据丢失）** | [#922](https://github.com/netease-youdao/LobsterAI/issues/922) | Anthropic SSE 流式解析按 `chunk.split('\n')` 无行缓冲，跨 chunk 的 data 行 JSON.parse 失败被吞，导致流式文本片段丢失（高吞吐/网络拥堵时更易触发） | ❌ 无对应 fix PR |
| **中（功能不可用）** | [#928](https://github.com/netease-youdao/LobsterAI/issues/928) | 登录页特定路径（网易员工按钮 → 返回登录）**必现**登录组件加载失败 | ❌ 无对应 fix PR |
| **中（配置错误）** | [#918](https://github.com/netease-youdao/LobsterAI/issues/918) | OpenClaw doctor 自动添加未知 channel ID 的 `openclaw-weixin` 配置（用户从未配置过 weixin），疑似插件版本不兼容 | ❌ 无对应 fix PR |

**风险提示**：#926 与 #922 均涉及核心链路的稳定性问题，且已报告 6 个月以上（3 月底创建），建议优先排期修复。

---

## 功能请求与路线图信号

今日更新的 issue 中有 2 个明确的新功能请求：

- **[#927 模型/供应商列表支持键盘上下切换](https://github.com/netease-youdao/LobsterAI/issues/927)**：用户习惯用键盘箭头切换条目，属于**体验优化**类需求。实现成本低，但优先级可能不高。
- **[#943 模型调用优先级与自动切换](https://github.com/netease-youdao/LobsterAI/issues/943)**：当配置的模型不可用时，按预设优先级自动切换其他模型执行，避免因单个模型故障导致整体不可用。该需求附带配置界面截图，**对可用性提升有直接价值**，与项目追求稳定性的方向一致，有一定概率被纳入后续版本。

结合今日合并的 PR 方向（构建质量、架构简化等），短期内路线图可能更侧重稳定性而非新功能；但 #943 属于高价值可用性增强，建议维护者评估纳入下一迭代。

---

## 用户反馈摘要

从今日更新的 issue 描述中可提炼以下真实用户场景与痛点：

- **升级回归困扰**（[#918](https://github.com/netease-youdao/LobsterAI/issues/918)）：用户明确表达"升级到 3.25 后出现如题问题"、“之前只有 feishu，从没配置 weixin”——升级后出现非预期的配置变更，用户对系统行为感到困惑且难以自行解决。
- **配置错误时的无助感**（[#943](https://github.com/netease-youdao/LobsterAI/issues/943)）：用户反馈"在使用了某个错误的模型时，此时通过 IM 沟通并不能获得很好的反馈"——当前模型配置错误时，用户没有快速恢复的手段，希望系统具备自适应能力。
- **崩溃路径的具体场景**（[#926](https://github.com/netease-youdao/LobsterAI/issues/926)）：用户在应用退出、IM handler 重建、gateway 重连时遭遇必现崩溃，且崩溃中断了资源清理，可能导致更严重的后续问题——这是信任度伤害较大的稳定性问题。
- **流式输出质量**（[#922](https://github.com/netease-youdao/LobsterAI/issues/922)）：高吞吐或网络拥堵时文本片段丢失，用户感知为模型输出不完整，但实际是客户端解析 bug。

整体用户情绪：**部分忍受、部分困惑**。多数问题已存在数月未修，用户可能已通过 workaround 绕行，但真实痛点仍在。

---

## 待处理积压

以下 7 条 issue 均为 3 月底创建，昨日（10-01）被统一 touch 为 [stale]，且已有 6 个月未解决，**建议维护者重点关注**：

| Issue | 标题 | 积压天数 | 影响 |
|-------|------|---------|------|
| [#918](https://github.com/netease-youdao/LobsterAI/issues/918) | openclaw doctor 自动添加 weixin | ~190 天 | 升级回归 |
| [#922](https://github.com/netease-youdao/LobsterAI/issues/922) | Anthropic SSE 流式解析丢失数据 | ~190 天 | 流式输出不完整 |
| [#925](https://github.com/netease-youdao/LobsterAI/issues/925) | Security issue reporting channel | ~190 天 | 安全披露渠道缺失 |
| [#926](https://github.com/netease-youdao/LobsterAI/issues/926) | destroy() 调用不存在的 reject 致崩溃 | ~190 天 | **必现崩溃** |
| [#927](https://github.com/netease-youdao/LobsterAI/issues/927) | 键盘上下切换选择 | ~190 天 | 体验优化 |
| [#928](https://github.com/netease-youdao/LobsterAI/issues/928) | 登录组件加载失败 | ~190 天 | **必现功能故障** |
| [#943](https://github.com/netease-youdao/LobsterAI/issues/943) | 模型调用优先级与自动切换 | ~189 天 | 可用性增强 |

其中 **#926（崩溃）与 #928（登录必现失败）** 属影响用户核心使用的问题，且均已存在半年以上，强烈建议纳入近期迭代。长期 stale 的 issue 如无修复计划，也建议考虑与用户沟通关闭或标记为 backlog，避免社区对项目维护活跃度产生负面印象。

---

*本日报由 AI 自动生成，数据来源：[LobsterAI GitHub 仓库](https://github.com/netease-youdao/LobsterAI)，统计周期：2026-10-01 至 2026-10-02。*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

# TinyClaw 项目动态日报（2026-10-02）

## 1. 今日速览

- 过去 24 小时 **无新增 Issue**、**无新版本发布**，**3 条 PR 状态更新为已合并/关闭**。
- 3 条 PR 均由 @salemsayed 提交，集中在 **Telegram 客户端体验与可靠性**：消息持久化、交互式提问、流式预览。
- 所有 PR 均已关闭，当前 **待合并 PR 为 0**，说明近期贡献已获维护者处理。
- 项目社区互动较少：Issues/PR 未出现可统计的评论或 reaction，整体活跃度中等偏低，但功能迭代完成度较高。
- 值得注意：3 条 PR 均创建于 2026 年 2 月，但更新于 10 月 1 日，更像是一次集中合并/收尾，而非当日密集开发。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

本次 3 条 PR 均围绕 **TinyClaw 的 Telegram 集成能力** 展开，属于功能增强与稳定性修复并行的收尾工作：

- **[#48] fix: persist Telegram pending messages to disk**  
  [GitHub](https://github.com/TinyAGI/tinyagi/pull/48)  
  修复 `telegram-client.ts` 中 `pendingMessages` 仅存在于内存、重启即丢失的问题。此前发生 409 polling conflict、`tinyclaw restart` 或进程崩溃后，队列处理器虽然成功写入 `queue/outgoing/`，但 Telegram 客户端无法匹配消息与聊天，最终导致响应被静默删除。该 PR 对消息可靠性有实质提升。

- **[#67] feat: interactive questions via Telegram inline keyboards**  
  [GitHub](https://github.com/TinyAGI/tinyagi/pull/67)  
  实现“问题桥接”，将 Claude 的澄清性问题转发到 Telegram 内联键盘按钮，在非交互式 `-p` 模式下也能完成双向对话。扩展了 TinyClaw 在无人值守场景下的交互能力。

- **[#106] Add Telegram live streaming previews for Claude responses**  
  [GitHub](https://github.com/TinyAGI/tinyagi/pull/106)  
  使用 `claude --output-format stream-json --include-partial-messages` 流式获取 Claude 输出增量，并通过节流方式向 Telegram 发送 `partial_*` 队列消息，实现单条消息原地编辑的实时预览效果。显著降低用户等待大模型完整回复时的感知延迟。

综合来看，TinyClaw 的 Telegram 集成正在从“异步任务结果通知”向“可交互、可实时反馈的会话型客户端”演进。

## 4. 社区热点

今日没有评论数或 reaction 数突出的 Issues/PR，社区热点并不明显。

不过从 PR 内容来看，以下三个时间点最值得关注：

- [#106 Telegram 流式预览](https://github.com/TinyAGI/tinyagi/pull/106)  
- [#67 Telegram 内联键盘交互提问](https://github.com/TinyAGI/tinyagi/pull/67)  
- [#48 Telegram 待发消息持久化修复](https://github.com/TinyAGI/tinyagi/pull/48)

它们共同反映的一个诉求是：**用户希望 Telegram 端更像一个实时、可靠、可对话的 AI 界面，而不是简单异步任务管道**。

## 5. Bug 与稳定性

当前可确认的稳定性问题主要来自 PR #48 所描述的场景：

- **高严重度：重启导致待发消息丢失，且响应被静默删除**  
  `pendingMessages` 只保存在内存中，任何重启都会清空；同时 Telegram 客户端无法将已落盘的 `queue/outgoing/` 消息与聊天匹配，导致消息被静默丢弃。  
  该问题已由 [#48](https://github.com/TinyAGI/tinyagi/pull/48) 修复 PR 覆盖，当前状态为已关闭。建议维护者补充针对“重启后恢复 pending 消息”的回归测试，避免后续重构复发。

除上述问题外，今日没有新增 Bug、崩溃或回归类 Issue。

## 6. 功能请求与路线图信号

今日没有新的功能请求 Issue，但已关闭的 2 条 feature PR 给出了清晰的路线图信号：

- **交互式问答（#67）**：将 Claude 的澄清性问题通过 Telegram inline keyboard 呈现，用户无需进入交互式终端即可回答。  
  这很可能被纳入下一版本，使非交互 `-p` 模式具备基本的“人机确认”能力。

- **流式响应预览（#106）**：通过 `stream-json` 输出 partial deltas，配合 Telegram 单条消息编辑，实现打字机式实时输出。  
  同样是下一版本候选功能，直接改善用户对响应延迟的体感。

如果这两条 PR 确实已合并，它们将构成下一版本中 Telegram 方向的核心增量。

##

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-10-02

## 1. 今日速览

过去24小时 Moltis 项目处于**维护与修复期**：无新 Issue 产生、无版本发布，但贡献者提交了 2 条针对性修复 PR（均待合并），集中在 **TLS/ALPN 协商**与 **MCP 服务恢复机制**两个方向。整体活跃度中等，属于典型的"静默期"——表面无新问题上报，底层有两项技术债正在处理。这两项 PR 直指 WebSocket 升级失败与 MCP 会话恢复两大功能性缺陷，若成功合并将显著提升协议兼容性与服务稳定性。

## 3. 项目进展

今日无 PR 被合并或关闭，但以下 2 条待合并 PR 展示了明确的修复方向，预计将对项目产生直接正向影响：

### 🔧 修复 TLS ALPN 协商顺序，解决 WebSocket 升级失败
- **PR**: [fix(tls): restrict ALPN to HTTP/1.1](https://github.com/moltis-org/moltis/pull/1291)
- **状态**: 待合并 | 作者: @Harbor404 | 创建于 2026-10-01
- **背景与价值**: 当前 TLS 监听器在 ALPN 协商中优先声明 `h2`，导致现代浏览器新建 TLS 连接时默认协商为 HTTP/2。但 Moltis 尚未实现 RFC 8441 定义的 extended CONNECT，HTTP/2 连接上的 WebSocket 升级会失败并返回 `405 Method Not Allowed`。该 PR 通过将 ALPN 限制为 `HTTP/1.1`，**从根本上规避了协议版本错配**，属于投入小、见效快的兼容性修复。

### 🔧 增加 MCP 失败启动重试与会话过期恢复
- **PR**: [fix(mcp): recover failed startups and expired sessions](https://github.com/moltis-org/moltis/pull/1290)
- **状态**: 待合并 | 作者: @Harbor404 | 创建于 2026-10-01
- **背景与价值**: 该 PR 针对 MCP 子系统的两处健壮性缺口：
  1. 对启动失败的 enabled MCP 服务器进行状态追踪，将其标记为 `dead` 而非直接放弃，通过健康监控器配合现有指数退避策略自动重试（最多 5 次）；
  2. 识别 streamable HTTP 返回携带 `Mcp-Session-Id` 的 `404` 响应，将其判定为会话丢失并触发恢复流程。
- **意义**: 这两项修复将**提升 MCP 服务器集群的自愈能力**，减少人工介入需求，是面向生产环境的重要稳定性补强。

> **小结**: 两条 PR 分别覆盖**协议兼容层**与**服务恢复层**，表明项目正在从"功能可用"向"生产可靠"过渡。

## 4. 社区热点

今日无 Issue 讨论、PR 评论数据缺失（评论数均为 undefined），无法基于讨论热度进行分析。但从提交模式可观察到：**@Harbor404 一人持续贡献 TLS 与 MCP 两条技术线的修复**，说明当前项目维护集中在少数核心贡献者手中，社区参与的广度有待扩展。建议维护者关注这两条 PR 的技术讨论空间，可能吸引更多开发者参与协议层设计评审。

## 5. Bug 与稳定性

今日未收到新 Bug 报告，但两条待合并 PR 间接揭示了当前存在的两个已知稳定性问题：

| 严重程度 | 问题描述 | 影响范围 | 状态 |
|---------|---------|---------|------|
| **高** | TLS ALPN 协商到 HTTP/2 后 WebSocket 升级返回 405（因未实现 RFC 8441） | WebSocket 客户端（尤其浏览器）无法建立连接 | 已有修复 PR [#1291](https://github.com/moltis-org/moltis/pull/1291) 待合并 |
| **中** | MCP 服务器启动失败后无重试机制，且流式 HTTP 会话丢失无法自动恢复 | 依赖 MCP 的集成服务可能长期处于不可用状态 | 已有修复 PR [#1290](https://github.com/moltis-org/moltis/pull/1290) 待合并 |

两条 PR 均处于待合并状态，建议维护者优先评审，避免修复长时间滞留。

## 6. 功能请求与路线图信号

今日无新增功能请求。但从 PR 内容可提取出明确的**技术路线图信号**：

- **信号一（短期方向）**: ALPN 限制为 HTTP/1.1 属于**防御性妥协**。若 Moltis 后续计划支持 WebSocket over HTTP/2，则需实现 RFC 8441 extended CONNECT。从 PR 描述看，该特性**暂无明确的实现计划**，当前优先保证 HTTP/1.1 场景的稳定。
- **信号二（中期方向）**: MCP 健康监控与自动重试机制的引入，说明项目正逐步**完善 MCP 服务生命周期管理**，这是向"生产级 AI Agent 基础设施"迈进的关键一步。

综合判断，**MCP 服务可靠性**与**协议兼容性**是当前版本迭代的两条主线。

## 7. 用户反馈摘要

今日无 Issues 评论可供提炼。从两条 PR 的提交信息中，可以还原出以下**真实痛点场景**：

1. **浏览器用户场景**: 用户通过浏览器访问 Moltis 暴露的 WebSocket 服务时，TLS 握手自动升级到 h2，导致所有 WebSocket 连接失败——这是现代浏览器默认行为的必然结果，影响面广且难以通过客户端规避（PR #1291）。
2. **运维场景**: MCP 服务器若在启动阶段崩溃，会被永久标记为不可用，需要人工介入重启；而流式 HTTP 会话一旦失效（如服务端重启），客户端无法感知会话丢失，可能导致请求一直挂起（PR #1290）——这类问题在长期运行的生产环境中极易触发。

这说明贡献者正在**主动解决底层协议和服务治理的隐性坑点**，而非等待用户报障。

## 8. 待处理积压

今日无长期未响应的重要 Issue。但**以下 2 条 PR 正处于待合并状态**，建议维护者及时处理：

- [PR #1291 TLS ALPN 修复](https://github.com/moltis-org/moltis/pull/1291) — 解决高严重度 WebSocket 兼容性问题
- [PR #1290 MCP 恢复机制](https://github.com/moltis-org/moltis/pull/1290) — 增强 MCP 服务自愈能力

两条 PR 均来自同一贡献者，且更新时间停留在 2026-10-01，**若长时间未合入，可能降低贡献者的积极性**。建议维护者在下一个工作日内完成 code review 与合并决策。

---

**项目健康度总评**: 当前项目处于"**稳定维护+定向修复**"阶段，无新问题涌入、无社区争议，但修复型 PR 的积压时间值得关注。核心风险点集中在 WebSocket 兼容性与 MCP 服务恢复能力，两者均有明确修复方案，**合并进度是衡量项目近期活跃度的关键指标**。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-10-02

## 今日速览

过去 24 小时项目活跃度处于**中高水平**：7 条 Issue 更新（全部处于开放/活跃状态）、9 条 PR 更新（2 条已关闭，7 条待合并），无新版本发布。当前开发焦点集中在三条主线：**DeepSeek/OpenAI provider 兼容性修复**（#8064、#8070、#8074）、**CJK 文本渲染与格式化修复**（#8067、#8066）以及 **E2E 测试基础设施加固**（#8072）。值得注意的是，已有 2 条 PR 出现“重复提交后关闭”的情况（#8069/#8068 被 #8070/#8067 取代），反映出贡献者在快速迭代中产生了少量冗余提交。此外，今日出现两个明确的 Bug 报告（#8073、#8074），但均尚未有对应 fix PR，需要维护者跟进。

## 项目进展

今日**无重要 PR 被合并**，但有一条大型功能 PR 和多项修复 PR 正在活跃推进。

- **#7569 [size/XXXL] feat(modes): add Advisor Mode**（9月5日创建，今日更新）——这是当前最大的进行中功能，为对话引入“顾问-执行者”双模型协同模式，由强模型担任 advisor，弱模型担任 worker，包含开场计划、动态切换等特性。该 PR 已开发近一个月，今有更新说明仍在推进，属于下一版本可能的核心能力。
  https://github.com/agentscope-ai/QwenPaw/pull/7569

- **#8072 [size/XL] fix(e2e): isolate stateful browser tests**——大型 E2E 测试修复，针对 CI 中因缺少预置数据导致测试静默跳过/返回的问题，补充 fixture 的 seed 与恢复逻辑，并修正与当前 UI 不匹配的断言。质量基建方向的实质性投资。
  https://github.com/agentscope-ai/QwenPaw/pull/8072

- **#8063 [first-time-contributor] feat(console): wake parent agent session when background task finishes**——新贡献者提交，解决后台任务（`spawn_subagent` / `submit_to_agent` with `background=true`）完成后结果静默存放、前端无感知的问题，属于体验补全类改进。
  https://github.com/agentscope-ai/QwenPaw/pull/8063

- #8069 与 #8068 今日被关闭，分别被 #8070（DeepSeek formatters 限制为图片媒体）和 #8067（CJK Markdown 强调边界修复）替代，意味着这两项修复本身尚未落地，以新版 PR 为准。

## 社区热点

**#7997 — WebUI 消息撤回/编辑与工作区回滚**（4 条评论，今日有更新）是当前社区讨论热度最高的话题。该 Issue 请求在 WebUI 聊天界面中允许用户编辑或撤回已发送消息，自动截断后续对话历史，并可选快照回滚文件变更。这反映了用户对**对话纠错能力和上下文洁净度**的诉求——实际使用中模型误发送内容后无法修正，只能开启新会话，代价较高。该需求结合 #8071（插件主题扩展点）一起看，社区对 WebUI 可操作性和可定制性的期待正在提升。
https://github.com/agentscope-ai/QwenPaw/issues/7997

其他活跃讨论：

- **#8076 reload 超时静默丢弃**：讨论如何改进配置重载时 in-flight turns 超时后的用户体验，核心诉求是“不要静默失败，要通知房间并取消任务”。
  https://github.com/agentscope-ai/QwenPaw/issues/8076

- **#8074 OpenAI gpt-6 连接测试失败**（1 条评论）：用户确认在 `main` 分支上问题依然存在，说明该缺陷尚未被修复，评论区可能有补充排查信息。
  https://github.com/agentscope-ai/QwenPaw/issues/8074

## Bug 与稳定性

今日报告了 4 个 Bug，无回归性崩溃，但存在 1 个**高危**问题。按严重程度排列如下：

| 严重程度 | Issue | 摘要 | 是否已有 fix PR |
|---------|-------|------|----------------|
| 🔴 高危 | #8064 | **DeepSeek provider 发送 PDF 后会话永久损坏**：后续所有请求均返回 400 `file must have a file_id or file_data`。影响 deepseek 内置 provider 及经聚合器路由的模型 | ❌ 无 |
| 🟠 中危 | #8073 | **V2.2.2.beta4 在 LAN 访问时无法打开会话页面**：同一服务本机访问正常，仅局域网设备访问异常，疑与 URL 解析或 CORS 有关 | ❌ 无 |
| 🟡 中危 | #8074 | **OpenAI provider 对 gpt-6 系列模型连接测试返回 400**：`_uses_max_completion_tokens` 白名单仅匹配 `gpt-5*`/`o<digit>*`，未覆盖 gpt-6 命名模式 | ❌ 无（用户确认 main 分支仍未修复） |
| 🟢 低危 | #8075 | 捆绑 Codex SDK 过旧（0.144.4），导致模型发现不完整（仅返回 4 个 gpt-5.x 模型），建议升级至 0.159.3 | PR 建议已提出，待确认 |

其中 #8064 值得特别关注：**一次失败的媒体发送行为就永久毒化整个会话**，这大概率是 provider 层将 `file_data` 挂载到错误位置或未回填 `file_id`。该问题存在数据面风险，应优先响应。

## 功能请求与路线图信号

今日收到 2 条功能请求，另有 1 条来自 PR 的功能增强正在推进：

1. **#7997 WebUI 消息撤回/编辑与工作区回滚**——呼声最高的功能需求，已获得 4 条评论。该功能触及双方面：对话历史截断 + 文件快照回滚。结合 #7741 引入的主题系统可看出 WebUI 正在向“完全可操作”方向演进，**有较大概率进入下一迭代**。
   https://github.com/agentscope-ai/QwenPaw/issues/7997

2. **#8071 插件主题扩展点（语义 token 覆盖层）**——允许插件深度定制 Console 主题，而不仅限于当前单一的 `colorPrimary`。这是对 #7741 主题系统的自然补全，契合 CoPaw 的插件生态方向。若采纳，将增强第三方主题定制能力。
   https://github.com/agentscope-ai/QwenPaw/issues/8071

3. **#8063 PR 后台任务完成时唤醒父会话**——将后台任务结果主动推送给前端，减少用户等待和轮询负担。这是工作流体验层面的补齐，而非全新功能，预计合并优先级较高。
   https://github.com/agentscope-ai/QwenPaw/pull/8063

综合来看，**WebUI 交互能力（消息编辑、主题扩展）与多代理编排体验（后台任务通知、Advisor Mode）** 是当前最清晰的路线图信号。

## 用户反馈摘要

- **DeepSeek PDF 发送导致会话不可用（#8064）**：用户明确指出“即使经聚合器路由（model id 含 `deepseek`）也会被影响”，说明该问题覆盖面比预期更广。此外用户提交了完整的复现环境和步骤，属于高质量的反馈。此类“一次操作永久损坏会话”的问题对信任打击较大，需尽快回应。

- **gpt-6 连接测试失败（#8074）**：用户对 main 分支做了代码级排查，定位到 `_uses_max_completion_tokens` 白名单逻辑的缺陷，说明用户具备技术深度，且对项目修复速度有一定预期。这类用户贡献度较高，维护者及时回复有助于保留贡献者。

- **CJK 强调边界问题（#8067/#8068）**：来自**同一用户**（@BeiMu-new）连续提交了 3 个 PR（含 #8066、#8065），说明该贡献者在一段时间内集中处理一组相关联的格式化和安全性问题，且#8068 被标记为 “Close-and-review-later”，其修复方案获得了一定认可。

- **V2.2.2.beta4 LAN 访问异常（#8073）**：用户报告中带有一个关键排查结论——“本机访问无问题，仅局域网设备访问时报错”，为问题定位提供了明确参考路径。这是发布候选版本常见的问题类型，需在正式版前解决。

## 待处理积压

以下问题长期未获响应，建议维护者关注：

1. **#7569 Advisor Mode 大型 PR（size/XXXL）**——9月5日创建至今近一个月，期间持续更新但无 maintainer review 记录。该 PR 是当前体积最大、潜力最高的功能之一，长期悬而未决可能打击贡献者积极性，建议尽快安排 reviewer。
   https://github.com/agentscope-ai/QwenPaw/pull/7569

2. **#7997 WebUI 消息撤回/编辑功能请求**——9月27日创建，已获得 4 条评论、处于活跃讨论状态，但尚未有 maintainer 回复或关联实现。作为当前评论数最高的 Issue，社区期待官方回应。
   https://github.com/agentscope-ai/QwenPaw/issues/7997

3. **#8064 DeepSeek PDF 会话损坏**——该问题自 9月30日提交以来已有 2 条评论，但无 fix PR。对于严重级别最高的会话级损坏问题，建议纳入近期迭代排期。
   https://github.com/agentscope-ai/QwenPaw/issues/8064

---

> 数据来源：CoPaw / QwenPaw GitHub 仓库（github.com/agentscope-ai/CoPaw），统计窗口为 2026-10-01 至 2026-10-02。

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