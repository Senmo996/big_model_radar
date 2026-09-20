# OpenClaw 生态日报 2026-09-20

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-20 02:13 UTC

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

# OpenClaw 项目动态日报 — 2026-09-20

## 1. 今日速览

过去24小时项目活跃度极高：500条 Issue 更新（新开/活跃 322，关闭 178），500条 PR 更新（待合并 287，合并/关闭 213），并发布 v2026.9.5 Linux companion 版本。**核心信号**：v2026.9.5 发布后涌现大量 P0 级回归报告，集中在**更新/升级流程失败**、**Codex 集成不可用**和**Gateway 启动挂起**三大方向，社区情绪明显受挫（有用户明确表示“后悔升级”）。与此同时，维护团队反应迅速，今日新开约 20 个修复 PR 直击上述问题，且多个 PR 专注于将 SQLite 操作移出 Gateway 主线程、降低 CPU 占用，说明项目在“高速迭代”与“稳定性承压”之间激烈拉锯。

---

## 2. 版本发布

**v2026.9.5**（linux-stable 频道 Linux companion）已于近期发布，提供两种安装包：

- [AppImage](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.AppImage)
- [Debian package](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.deb)

⚠️ **注意**：从 Issue 反馈看，v2026.9.5 引入了多项严重回归，**尚未升级的用户建议暂缓升级**，已升级用户请勿反复执行 `openclaw update` 重试。官方目前尚未发布撤回说明或补丁，相关状态正在被 [Tracking issue #145252](https://github.com/openclaw/openclaw/issues/145252) 和多个 P0 #152744 / #152759 / #153049 追踪。

---

## 3. 项目进展

今日 213 条 PR 被合并/关闭，项目仍在高效推进。当前公开的 PR 主要呈现三大努力方向：

**（1）将 SQLite 操作移出 Gateway 主线程（性能攻坚）**
- [PR #153159](https://github.com/openclaw/openclaw/pull/153159)：Board 写入移出 Gateway 线程
- [PR #152736](https://github.com/openclaw/openclaw/pull/152736)：出站投递租约 SQLite 移出 Gateway 线程
- [PR #151303](https://github.com/openclaw/openclaw/pull/151303)：等待队列注册与任务持久化
- [PR #153348](https://github.com/openclaw/openclaw/pull/153348)：降低 usage 刷新时 CPU 消耗
- 直接回应 #153067（Gateway 每 5 秒复制整个状态库）、#91588（内存泄漏）、#115908（事件循环阻塞）等社区痛点

**（2）针对 2026.9.5 回归的修复**
- [PR #153356](https://github.com/openclaw/openclaw/pull/153356)：修复 Codex 私有补全导致父线程重置（A→B→C 变 A→A→A）
- [PR #153352](https://github.com/openclaw/openclaw/pull/153352)：CLI runner 在 auth-profile 故障切换时保留会话
- [PR #153297](https://github.com/openclaw/openclaw/pull/153297)：修复 yield 后重复消费子结果的问题
- [PR #153289](https://github.com/openclaw/openclaw/pull/153289)：修复 macOS 应用升级后 Chrome 设置丢失
- [PR #153267](https://github.com/openclaw/openclaw/pull/153267)：稳定任务读取、重启与聊天定位

**（3）新功能扩展**
- [PR #153299](https://github.com/openclaw/openclaw/pull/153299)：Talk 预授权精确已安装应用启动
- [PR #153126](https://github.com/openclaw/openclaw/pull/153126)：远程 workspace 技能接入 agent 任务
- [PR #153209](https://github.com/openclaw/openclaw/pull/153209)：基于类型化判断的精简 summarizer 上下文

**结论**：项目在功能面和性能面同时推进，但由于 v2026.9.5 的回归，今日 PR 更多投向了“救火”而非“铺路”。

---

## 4. 社区热点

| 热度 | Issue | 评论数 | 核心诉求 |
|------|-------|--------|----------|
| 1 | [#149361 WebUI 性能与稳定性 Umbrella](https://github.com/openclaw/openclaw/issues/149361) | 50 | 桌面/移动 WebUI 卡顿、崩溃问题长期未

---

## 横向生态对比

# AI Agent 开源生态横向对比分析报告

**报告日期：2026-09-20 | 数据窗口：过去 24 小时**


## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**高速分化期**：以 OpenClaw 为轴心的核心项目保持着极高迭代强度（24h 内 500 条 Issue、500 条 PR 动态），但 v2026.9.5 的严重回归暴露了"速度优先"策略的稳定性代价；NanoBot、Zeroclaw、CoPaw 等项目在安全加固、架构讨论、前端体验等细分维度各自为战，形成了差异化竞争格局；LobsterAI 当日的 6 个 PR 全部合入，展示了"小而精"的工程质量路线同样有效；而 PicoClaw、TinyClaw、ZeptoClaw、EasyClaw 的静默状态则提示生态尾部已出现明显的维护断档。**安全与稳定性正取代功能丰富度，成为头部项目下一阶段的核心竞争维度。**


## 2. 各项目活跃度对比

| 项目 | Issues（新开/活跃/关闭） | PRs（合并/关闭 vs 待合并） | Release | 健康度评估 |
|------|------------------------|---------------------------|---------|-----------|
| **OpenClaw** | 500 条更新（新开/活跃 322，关闭 178） | 500 条更新（合并/关闭 213，待合并 287） | v2026.9.5（含严重回归） | 🔴 **高活跃/稳定性承压**：迭代速度极快，但 P0 回归冲击社区信任 |
| **NanoBot** | 1 条新开 | 8 条合并/关闭，20 条待合并 | 无 | 🟡 **稳定/积压**：安全修复响应快，但有 PR 等待超 76 天 |
| **Zeroclaw** | 28 条更新（新开/活跃 21，关闭 7） | 1 条合并，49 条待合并 | 无 | 🟡 **高活跃/安全缺口**：大 PR 密集评审，2 个 S0 安全 Bug 无修复 |
| **CoPaw** | 9 条更新（全部新开/活跃） | 1 条合并，7 条待合并 | 无（v2.2.1） | 🟡 **活跃/审查瓶颈**：Bug 反馈多且快，但合并速度偏慢 |
| **LobsterAI** | 2 条（1 新开，1 关闭） | 6 条全部合并 | 无 | 🟢 **健康迭代**：修复质量高，当日问题全部闭环 |
| **NanoClaw** | 0 条 | 0 合并，4 条待合并 | 无 | 🟡 **提交活跃/合并暂缓**：两条关键 PR 已等待超 3 周 |
| **Moltis** | 4 条（3 新开，1 关闭） | 0 合并，1 条待合并 | 无 | 🟡 **中等/配置缺陷**：heartbeat 核心功能一个月未修复 |
| **IronClaw** | 0 条 | 0 合并，1 条待合并 | 无 | 🟠 **低活跃**：唯一 PR 积压超 40 天 |
| **PicoClaw** | 1 条（新开） | 0 合并，0 待合并 | 无 | 🔴 **停滞/危机**：官网 TLS 证书过期 8 天未处理 |
| **TinyClaw** | — | — | — | ⚪ 无活动 |
| **ZeptoClaw** | — | — | — | ⚪ 无活动 |
| **EasyClaw** | — | — | — | ⚪ 无活动 |


## 3. OpenClaw 在生态中的定位

**生态轴心与标准制定者。** 具体表现：

- **社区规模断层领先**：单日 500 Issue/500 PR 动态，是 NanoBot（28 PR）的 ~18 倍、Zeroclaw（50 PR）的 10 倍，处于绝对统治地位。
- **技术路线差异**：OpenClaw 的独特之处在于**主动性能攻坚**——将 SQLite 操作移出 Gateway 主线程、降低 usage 刷新 CPU 消耗，直接回应大规模部署场景的性能痛点（#153067：每 5 秒复制整个状态库；#91588：内存泄漏），这种架构级优化在当前生态中无人跟进。
- **版本策略激进**：v2026.9.5 的发布带来大量 P0 回归（更新流程失败、Codex 集成不可用、Gateway 启动挂起），但有 ≈20 个修复 PR 当日即启动，展示出极强的"自我修复"能力。
- **生态辐射效应**：LobsterAI 的 per-session MCP 开关明确在 OpenClaw 引擎 McpBridgeServer 层实现；NanoClaw 的 CLI 设计（`ncl health`）与 OpenClaw 的 Gateway 架构一脉相承，说明其设计理念正在向下游传导。

**核心矛盾**：OpenClaw 的竞争力是"速度"，但 v2026.9.5 的回归事件说明——当迭代速度超过质量保证体系的承载能力时，用户体验的倒退会让升级率下降，反过来侵蚀生态领导力。


## 4. 共同关注的技术方向

### 🔒 方向一：安全边界与审批机制（5 个项目）

| 项目 | 具体诉求 |
|------|---------|
| **OpenClaw** | Codex 私有补全导致父线程重置、CLI runner 在 auth-profile 故障切换时丢失会话 |
| **NanoBot** | ExecTool 符号链接逃逸工作区限制（#4072，114 天未修复）；外发消息策略强制；Dream 写入用户技能保护 |
| **Zeroclaw** | 无人值守 turn 缺少 ApprovalManager（S0）；Git `--attr-source` 绕过审批分类（S0）；`always_ask` 在 Full autonomy 下失效 |
| **CoPaw** | kimi-code ACP 运行器的 Write/Bash 完全绕过边界检查（#7881） |
| **NanoClaw** | allowlisted-extra mount 安全绕过（#3680） |

**共性结论**：所有项目都在处理同一个问题——**Agent 自主能力与人类审批控制之间的边界**。安全研究者正在系统性地审计"看似安全"的默认配置，且多数项目存在"已知但不修"的窗口期。

### 🛡️ 方向二：数据完整性与运行时可靠性（4 个项目）

| 项目 | 具体诉求 |
|------|---------|
| **LobsterAI** | SQLite CASCADE 失效致孤儿消息、非原子写、初始化超时永久故障（已修复 ✅） |
| **OpenClaw** | 更新/升级流程失败、Gateway 启动挂起、运行状态库被整体复制 |
| **NanoBot** | memory consolidation 因 token 估算偏差永不触发；进程退出时工具进度丢失 |
| **Moltis** | heartbeat 忽略 `active_hours` 配置；`active_tools: []` 被解析为"禁所有工具" |

**共性结论**：随着 Agent 从原型走向生产，**数据层正确性**（外键、原子写、状态持久化、配置求值）成为各项目不约而同的攻坚焦点。这与第一波"功能竞赛"形成鲜明对比。

### 🖥️ 方向三：WebUI 体验与前端自愈（3 个项目）

| 项目 | 具体诉求 |
|------|---------|
| **OpenClaw** | WebUI 卡顿、崩溃长期未决（Umbrella #149361，50 评论） |
| **CoPaw** | 懒加载失败后无法自愈（#7815）；DOM 变更导致聊天永久卡死（#7888）；聊天历史太短（#7884） |
| **NanoBot** | iOS PWA 点击被 `:hover` 吞掉；Provider 选择器无搜索 |

**共性结论**：Agent 的前端控制台正在成为用户体验的决定性因素。**前端错误边界自愈能力**是一个被普遍忽视但频繁爆发的系统性短板。

### 🔌 方向四：Provider 生态与渠道扩展（4 个项目）

| 项目 | 具体诉求 |
|------|---------|
| **NanoBot** | 接入 aimlapi.com、SenseNova（商汤），Provider 管理重构（三条带 conflict 标签的 PR） |
| **Zeroclaw** | WhatsApp Web 轮询、投票回读、创建房间/邀请用户 |
| **Moltis** | 将 Groq 升级为一级 OpenAI 兼容 provider（#1276） |
| **IronClaw** | IdentyClaw Passport 身份认证集成（PR #7499） |
| **CoPaw** | 修复 PDF/音频部分的供应商兼容性问题 |

**共性结论**：**Agent 的"连接能力"正在向长尾服务延伸**——从聊天平台到模型供应商到身份服务，生态正在从"单点集成"走向"平台化接入"。


## 5. 差异化定位分析

| 项目 | 核心定位 | 目标用户 | 关键架构特征 | 当前阶段重心 |
|------|---------|---------|-------------|-------------|
| **OpenClaw** | 全能 Agent 操作系统 | 开发者/企业 | Gateway 中心化架构，SQLite 持久化，Companion 桌面端 | 性能攻坚 + 回归修复 |
| **Zeroclaw** | 自主 Agent 框架（强调审批） | 高自主性场景 | 多 Channel（WhatsApp 等），ApprovalManager 审批体系 | 架构级 RFC + 大 PR 评审 |
| **NanoBot** | 安全优先的轻量 Agent | 安全敏感企业 | `restrict_to_workspace`，授权钩子，多 Provider | 安全加固 + WebUI 打磨 |
| **CoPaw** | 对话式 Agent 前端 | 个人终端用户 | 插件系统、MCP、SDK 控制面 | 前端体验 + 媒体兼容 |
| **LobsterAI** | 知识库/检索增强 Agent | 文档型任务 | SQLite 存储、定时任务、WSL 支持 | 工程筑基 |
| **NanoClaw** | 轻量 CLI Agent | 极简/本地模型用户 | 无主进程 CLI（`ncl health`）、可安装 Provider | 稳定性修复（等待合并） |
| **Moltis** | Agent 运行时（强调定时） | 定时自动化 | Heartbeat、CronPayload、spawn_agent | 配置可靠性 |
| **IronClaw** | 嵌入式/身份集成 Agent | 无进程/无 shell 环境 | IdentyClaw、宿主导管 | 平台身份整合 |
| **PicoClaw** | 边缘

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-09-20** | 数据窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 NanoBot 保持了稳定的开发节奏：**28 条 PR 有动态**，其中 8 条已合并/关闭、20 条待合并；Issues 侧仅新增 1 条安全相关报告。整体来看，**安全加固与 WebUI 体验优化是昨日合并 PR 的两条主线**——两条安全修复（#4667、#4668）和两条 WebUI 改进（#5816、#5818）均已合入，说明维护者对安全类 PR 响应较快。但值得关注的是，**开源社区活跃度呈现侧偏**：大量 PR（如 #5403、#5352、#5367 等）自 8 月中旬起已等待 1 个月以上未获合并，且唯一活跃 Issue #4072 已有 3 个多月历史，维护者需注意长期积压问题。

---

## 2. 版本发布

过去 24 小时**无新版本发布**。

---

## 3. 项目进展

过去 24 小时共 **8 条 PR 被合并或关闭**，以下是其中关键进展：

- **安全修复（2 条，均来自 @hamb1y）**
  - [`#4668 [CLOSED] fix: enforce message outbound policy`](https://github.com/HKUDS/nanobot/pull/4668)：修复 #4076，为 `message` 工具外发消息添加授权钩子，并强制跨目标发送遵循 `allow_from` 策略，同时将本地媒体附件限制在 workspace 内。**等级：p1（高）**
  - [`#4667 [CLOSED] fix: protect user skills from dream writes`](https://github.com/HKUDS/nanobot/pull/4667)：修复 #4075，为 Dream 修改用户技能增加写入保护。**等级：p1（高）**

- **WebUI 优化（2 条）**
  - [`#5818 [CLOSED] chore: remove CLAUDE.md`](https://github.com/HKUDS/nanobot/pull/5818)：删除仓库级 CLAUDE.md，简化项目文档结构
  - [`#5816 [CLOSED] feat(webui): polish provider setup and unify settings controls`](https://github.com/HKUDS/nanobot/pull/5816)：统一设置页、模型选择器、Overview 和 Composer 中的 provider 品牌显示，统一为 32px 圆角瓦片样式

**项目整体向前迈进一步**：安全边界的完整性有了明显提升（外发策略 + Dream 写入保护），WebUI 的一致性和品牌展示质量也得到改善。尤其值得肯定的是，两条安全 PR 均附带完整的 vercel 测试（pytest），体现了较高的工程标准。

---

## 4. 社区热点

由于当前数据中未提供各 PR/Issue 的评论数（显示为 `undefined`），以下基于 PR 摘要内容与状态进行分析：

**最值得关注的活跃 Issue（唯一）：**

- [`#4072 [OPEN] Security: ExecTool restricted workspace can be bypassed through relative symlinks`](https://github.com/HKUDS/nanobot/issues/4072) — 作者 @hamb1y（同为昨日两条安全修复 PR 的贡献者），创建于 2026-05-29，距今日 **114 天**，仍在开放状态。该问题涉及：`ExecTool` 的 `restrict_to_workspace=True` 可通过 workspace 内的相对符号链接逃逸到外部读取文件。shell 守卫检查了命令文本和绝对路径，但未在 shell 执行前解析相对符号链接。这是**当前唯一的活跃安全 Issue**，虽然 PR #4667/#4668 分别修复了 #4075/#4076，但**#4072 尚未有对应的核心修复 PR 出现**。

**热度较高的待合并 PR（按功能覆盖面判断）：**

- [`#5776 feat(webui): add search to shared ProviderPicker`](https://github.com/HKUDS/nanobot/pull/5776)：将共享 ProviderPicker（用于 Models、Web search、Transcription、Image Generation 设置）从普通 Select 重写为 Popover + 搜索过滤。影响面大。

- [`#5817 feat: add stable and source self-update flows`](https://github.com/HKUDS/nanobot/pull/5817)：新增 `nanobot update` 命令、`--dev` 源码更新支持，以及自动引导私有 Bun 运行时。对命令行用户的操作体验有直接提升。

**社区诉求分析**：两条安全修复 PR 都出自同一位贡献者，且相隔仅数小时提出，加上 #4072 也是同一人所报，说明**外部安全研究者正在系统性地梳理 NanoBot 的安全边界**，这可能预示着未来还有更多安全审计结果将逐步披露。

---

## 5. Bug 与稳定性

**按严重程度排列如下：**

### 🔴 高严重度

| 项目 | 描述 | 状态 |
|------|------|------|
| [#4072 Security: ExecTool restricted workspace can be bypassed through relative symlinks](https://github.com/HKUDS/nanobot/issues/4072) | `ExecTool` 在 `restrict_to_workspace=True` 模式下，可通过 workspace 内的相对符号链接读取外部任意文件。shell guard 未解析符号链接。**Feb 2026-05-29 创建至今未关闭** | 开放中，暂无关联修复 PR |

### 🟡 中严重度（均有修复 PR 待合并）

| 项目 | 描述 | 相关 PR |
|------|------|---------|
| [#5402 内存 consolidation 触发条件失效](https://github.com/HKUDS/nanobot/pull/5403) | 本地 tiktoken 对现代模型 prompt token 估算偏差 30-50%，导致对话超限后 consolidation 从不触发 | [`#5403`](https://github.com/HKUDS/nanobot/pull/5403) 待合并 |
| [`#5748 fix(recovery): persist partial tool progress at batch boundaries`](https://github.com/HKUDS/nanobot/pull/5748) | 工具进度在进程退出时只保存执行前和执行后两个快照，边界间退出会丢失已完成结果 | 待合并 |
| [`#5257 fix(agent): bound sustained-goal continuation when the turn goes idle`](https://github.com/HKUDS/nanobot/pull/5257) | 无限持续目标（如 "每天跟进"）会永久占用状态；回合空闲时无继续边界 | 待合并 |
| [`#4820 fix(runtime): reject non-string web fetch URLs`](https://github.com/HKUDS/nanobot/pull/4820) | 非字符串 URL 值如 `123` 会产生错误的缓存签名，干扰有效查询 | 待合并 |

### 🟢 低严重度（修复 PR 待合并）

| 项目 | 描述 | 相关 PR |
|------|------|---------|
| [`#4819 fix(memory): replace WeakValueDictionary with plain dict for consolidation locks`](https://github.com/HKUDS/nanobot/pull/4819) | 会话 consolidation lock 被意外 GC 回收，导致竞态 | 待合并 |
| [`#5641 fix(webui): iOS PWA tap and status-bar fixes`](https://github.com/HKUDS/nanobot/pull/5641) | 修复 iOS Safari 点击被 `:hover` 吞掉等问题 | 待合并 |
| [`#5260 fix(memory): ignore runtime files inside tracked workspace dirs`](https://github.com/HKUDS/nanobot/pull/5260) | workspace 目录内运行时产物（如 `memory/.dream_cursor`）被误追踪 | 待合并 |

**稳定性评估**：安全问题 #4072 长期未解决是项目健康度的主要风险点。好消息是维护者昨日已合入 #4667/#4668 两条安全修复 PR（分别修复 #4075/#4076），显示了处理同类问题的意愿；但 #4072 这个更根本的符号链接逃逸问题仍未得到处理。

---

## 6. 功能请求与路线图信号

从当前活跃的 PR 看，社区提交的功能需求集中在以下方向：

### 方向一：新 Provider 接入
| PR | 内容 | 状态 |
|----|------|------|
| [`#5666 feat(providers): add aimlapi.com as an OpenAI-compatible gateway provider`](https://github.com/HKUDS/nanobot/pull/5666) | 接入 AI 聚合网关 aimlapi.com（1000+ 模型） | 待合并，有 conflict |
| [`#5453 feat(providers): add SenseNova (商汤日日新) provider`](https://github.com/HKUDS/nanobot/pull/5453) | 接入商汤日日新，使用 OpenAI 兼容端点 | 待合并，有 conflict |
| [`#5352 Add model provider removal controls`](https://github.com/HKUDS/nanobot/pull/5352) | WebUI 中支持移除不再需要的 provider 配置 | 待合并，有 conflict |

> 三条 provider 相关 PR 均带有 `conflict` 标签，说明与当前主线代码存在冲突，维护者需要尽快协调合并方案。

### 方向二：通道能力增强
| PR | 内容 | 状态 |
|----|------|------|
| [`#5606 feat(email): filter by recipient alias`](https://github.com/HKUDS/nanobot/pull/5606) | 邮箱通道支持按收件人别名过滤，解决多地址共用邮箱场景 | 待合并 |
| [`#4919 feat(telegram): support custom Bot API base URL and extra headers`](https://github.com/HKUDS/nanobot/pull/4919) | 支持自建 Telegram Bot API 或企业网关 | 待合并 |

### 方向三：WebUI 与本地化
| PR | 内容 | 状态 |
|----|------|------|
| [`#5776 feat(webui): add search to shared ProviderPicker`](https://github.com/HKUDS/nanobot/pull/5776) | 共享 ProviderPicker 增加搜索过滤 | 待合并 |
| [`#5367 feat(webui): localize agent activity`](https://github.com/HKUDS/nanobot/pull/5367) | AI 活动文案支持全部 10 种语言 | 待合并 |

### 方向四：开发者体验
| PR | 内容 | 状态 |
|----|------|------|
| [`#5817 feat: add stable and source self-update flows`](https://github.com/HKUDS/nanobot/pull/5817) | 新增 `nanobot update` 自更新命令及私有 Bun 运行时引导 | 新开 |
| [`#5292 fix(matrix): reply to the room-level user event that started the turn`](https://github.com/HKUDS/nanobot/pull/5292) | Matrix 房间级回复关联到触发消息 | 待合并 |

**路线图判断**：Provider 接入（aimlapi + SenseNova）和 WebUI 搜索/本地化是当前社区投入最集中的两个方向。考虑到 `conflict` 标签在三条 provider PR 上都出现，**下一版本大概率会包含 Provider 管理重构**。渠道能力方面，Telegram 自定义 API 和邮箱别名过滤具有较强的企业落地场景，有较大可能纳入近期版本。

---

## 7. 用户反馈摘要

当前数据中唯一活跃的 Issue 为 #4072（安全漏洞），0 条评论，暂无用户直接反馈。基于 PR 摘要可间接提炼的反馈信号如下：

| 痛点/需求 | 来源 | 说明 |
|-----------|------|------|
| **邮箱多别名无法区分处理** | PR #5606 | 邮箱通道不区分收件地址，共享邮箱场景（如 `assistant@` 与 `team@` 同一收件箱）下一律处理所有消息，用户需要按别名进行路由过滤 |
| **私有化部署 Telegram 受限** | PR #4919 | Telegram 通道硬编码官方 API 地址，无法对接自建 Bot API 服务或企业网关 |
| **本地 token 估算与实际差异过大** | PR #5403 | tiktoken 对现代模型（30-50% 偏差）导致 consolidation 永远不触发，影响长对话体验 |
| **iOS PWA 使用体验不佳** | PR #5641 | iOS Safari 首击被 `:hover` 状态吞掉，状态栏适配有问题 |
| **AI 活动文案未本地化** | PR #5367 | 当用户切换语言时，已有的 Agent 活动文本不会自动更新 |
| **Provider 选择器无搜索** | PR #5776 | 当 Provider 数量增多时，纯下拉列表难以快速定位 |

---

## 8. 待处理积压

### ⚠️ 高优先级积压

| 项目 | 年龄 | 状态 | 说明 |
|------|------|------|------|
| [#4072 ExecTool 符号链接绕过工作区限制](https://github.com/HKUDS/nanobot/issues/4072) | 114 天 | 开放，0 评论，0 修复 PR | **项目当前最紧急的安全漏洞**，3 个月内未获修复。攻击者可绕过 `restrict_to_workspace` 读取任意外部文件。需要注意，活跃贡献者 @hamb1y 正在提交同类修复，建议尽快分配资源 |

### 🟡 中优先级积压（等待合并超 30 天）

| PR | 等待天数 | 说明 |
|----|---------|------|
| [`#4819 fix(memory): replace WeakValueDictionary with plain dict`](https://github.com/HKUDS/nanobot/pull/4819) | 76 天 | 修复 memory consolidation 锁被 GC 回收的问题 |
| [`#4820 fix(runtime): reject non-string web fetch URLs`](

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报 — 2026-09-20

## 1. 今日速览

过去 24 小时项目活跃度较高：共 28 条 Issue 更新（新开/活跃 21，关闭 7），50 条 PR 更新（待合并 49，已合并/关闭 1），无新版本发布。社区讨论热点集中在两个新提出的架构级 RFC（agent 问人的持久化原语、出站消息投递回执），以及 WhatsApp Web 通道的一批功能与缺陷报告。安全方面出现两个 S0 级问题（无人值守 turn 缺少审批管理器、Git `--attr-source` 绕过审批分类），需优先关注。唯一的合并 PR #9724 修复了 Full autonomy 模式下 `always_ask` 审批失效的问题，由维护者 @Audacity88 刷新并合入。整体来看，项目讨论活跃、维护者响应及时，但多个高优先级 Bug 和积压 PR 仍需持续消化。

## 3. 项目进展

过去 24 小时仅 1 个 PR 被合并/关闭：

- **[#9724] fix(approval): always_ask survives Full autonomy**（已合并）
  - 作者：@kckylechen1，维护者 @Audacity88 刷新分支并修复了规范策略所有权、委托代理准入、Rust API 兼容性。
  - 影响：修复了 Full autonomy（完全自主）模式下 `always_ask` 审批策略不生效的关键问题，使安全审批在自主运行场景下仍可强制执行。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/9724

尽管合并量不大，但大量高价值 PR 仍在活跃更新中（如 #10938、#10804、#10621、#10953 等），说明项目当前处于“大 PR 密集评审/迭代”阶段，进展集中在代码评审和重新推送，而非批量合入。

## 4. 社区热点

- **[#10930] RFC: One durable primitive for questions an agent asks a human**
  - 作者：@JordanTheJet，评论 2，更新于 2026-09-20。
  - 核心观点：ZeroClaw 已有“agent 问人并持久化等待回答”的正确实现——SOP 审批门，但其他代码未复用。提议抽象为统一持久化原语。
  - 意义：这是架构级设计讨论，可能影响后续 agent 交互模型的统一。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10930

- **[#10929] RFC: Delivery receipts for outbound messages**
  - 作者：@JordanTheJet，评论 2，更新于 2026-09-20。
  - 核心观点：当前出站消息无标识符，无法确认是否送达。提出为每条出站消息引入回执机制。
  - 意义：直接关系到消息可靠性和可观测性，社区对“agent 发送的消息到底到没到”存在明确诉求。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10929

- **WhatsApp Web 轮询功能系列讨论**：#10983（原生轮询 Channel hook）、#10987（轮询投票回读）、#10984（实现 PR）、#10988（投票回读 PR 栈）。同一功能拆分为多个 issue/PR，显示社区对新功能有系统性规划，且作者 @RustLangLatam 正在密集推进。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10983
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10987
  - https://github.com/zeroclaw-labs/zeroclaw/pull/10988

## 5. Bug 与稳定性

按严重程度排列：

**S0（数据丢失/安全风险）**

- **[#10968] 无人值守 agent turns 运行无 ApprovalManager**
  - 现象：cron、heartbeat、headless SOP、spawn_subagent 启动的 turn 不构建 `ApprovalManager`，导致风险工具的审批设置静默失效。
  - 当前状态：OPEN，无 fix PR。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10968

- **[#10966] Git `--attr-source` 可隐藏变更子命令，绕过审批分类**
  - 现象：共享 Git 全局选项扫描器未消费 `--attr-source` 的独立值，攻击者可构造参数使审批分类器误判为只读操作。
  - 当前状态：OPEN，已标记 `priority:p1`、`status:accepted`，无 fix PR。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10966

**S1（工作流阻断）**

- **[#8627] WhatsApp Web 设备链接被 passkey/SHORTCAKE 门禁阻断**
  - 现象：扫码后设备链接永不完成，S1 工作流阻断。6 月 2 日创建，仍开放，无 fix PR。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/8627

**S2（主要功能降级）**

- **[#10985] Dashboard 启动的 turn 使用新建 channel 实例，导致 channel 工具不可达**
  - 今天新开，已有对应 PR #10986 处于 OPEN 状态，修复方向为向 channel 寻址工具传递运行中的 channel 实例。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10985
  - https://github.com/zeroclaw-labs/zeroclaw/pull/10986

- **[#10981] 出站 WhatsApp 图片无缩略图/尺寸，手机显示空卡片**
  - OPEN，无 fix PR。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10981

- **[#10972 / #10975] WhatsApp Web 入站图片未下载，agent 收到字面 `[Image]`，视觉功能不可用**
  - 注意存在重复提交：#10972 已关闭，#10975 仍 OPEN。关闭原因未注明，但建议维护者核实是否真正修复。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10972
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10975

- **[#10952] Seam 清理器重写签名推理，Anthropic 拒绝重放 thinking**
  - 已有对应 fix PR #10953 处于 OPEN。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10952
  - https://github.com/zeroclaw-labs/zeroclaw/pull/10953

**S3（轻微降级）**

- **[#10973 / #10976] WhatsApp Web 提及双向损坏**（同样疑似重复，前者已关闭，后者 OPEN）
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10973
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10976

**其他已关闭 Bug**

- #10759（SOP RPC 失败原因遗漏，已关闭）、#10667（ZeroCode 流式响应重复，已关闭）、#10962（工具结果 payload 未转发，已关闭）。

## 6. 功能请求与路线图信号

近期功能请求集中在以下方向，结合已有 PR 判断：

- **Agent 交互与可观测性**
  - [#10930] agent 问人的统一持久化原语（RFC，评论活跃，可能进入设计落地阶段）
  - [#10929] 出站消息投递回执（RFC）
  - [#10531] 暴露 delegate 子代理进度（含中间输出、工具回执）
  - [#10963] 向 delegate 子代理转发 session 身份
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10930
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10929
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10531
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10963

- **WhatsApp Web 通道增强**
  - [#10977] 创建房间与邀请用户（`create_room`/`invite_user`）
  - [#10983] 原生轮询 Channel hook
  - [#10987] 轮询投票回读为 `[choice]` 消息
  - [#10812] PDF 发送时填充 `jpegThumbnail` 以支持手机预览
  - 以上多数有对应实现或规划，预计近期会被整合进 WhatsApp 通道迭代。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/10977
  - https

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 (2026-09-20)

## 1. 今日速览

过去24小时内，项目活跃度较低：仅1条Issue更新（无新增PR、无版本发布），整体处于低强度维护状态。**核心问题是 #3377 所报告的 picoclaw.io 官网 TLS 证书过期**，已持续8天未解决（创建于9/12），导致项目官网对所有访客不可用。社区对此已有反馈（1条评论、1个 👍），但未见维护者公开回应——该问题虽已在9/19被标记为 stale，但**任何形式的下游衔接或解决信号都未出现**，是当前最值得关注的风险点。无新功能合并或代码变更，项目前进速度近乎停滞。

---

## 3. 项目进展

过去24小时**无任何 PR 被合并或关闭**，也无新 PR 提交。代码库在此期间没有功能性变更或修复落地，项目整体处于停滞窗口。结合近期无 Releases 发布，可判断项目当前处于开发间歇期或维护者注意力转移阶段。

---

## 4. 社区热点

### 🔥 [Issue #3377] TLS certificate for picoclaw.io expired on 2026-09-10 — site is down for every browser
- **链接**: https://github.com/sipeed/picoclaw/issues/3377
- **状态**: OPEN / stale / CRITICAL
- **作者**: @dimonb | 创建: 2026-09-12 | 更新: 2026-09-19 | 评论: 1 | 👍: 1

这是目前社区唯一活跃的话题，因触发条件为**官网完全无法访问**，属于高影响、高时间敏感性问题。背后的诉求非常直接：项目官方主页作为文档、下载和品牌入口，其不可用状态会直接影响所有潜在用户和贡献者的第一体验。1个 👍 表明关注度有限（或多数用户已在其他地方表达不满），但评论数少并不代表影响面小——因为所有访问者直接面对的是浏览器错误页而非 GitHub Issue 页。**该议题已存在8天，且标签为 stale，表明维护者未能及时响应。**

---

## 5. Bug 与稳定性

### 🔴 [CRITICAL] 官网 TLS 证书过期（Issue #3377）
- **严重程度**: 🔴 严重 — 所有浏览器和 TLS 客户端拒绝连接，官网完全不可用
- **影响范围**: 项目主页 (https://picoclaw.io)、所有依赖该域名的文档/资源链接
- **状态**: OPEN，截至今日**无 fix PR、无维护者回复**
- **时间线**: 证书过期于 2026-09-10 → Issue 创建于 2026-09-12 → 更新于 2026-09-19（仅 stale 标记）
- **链接**: https://github.com/sipeed/picoclaw/issues/3377

修复该类问题通常仅需维护者登录证书管理后台重新签发（Let's Encrypt 或云厂商证书均可在数分钟内完成），因此 **8天未解决已远超合理范围**，强烈暗示维护者缺席或未看到该 Issue。

---

## 7. 用户反馈摘要

由于今日仅有一条 Issue 且评论数为1，可提炼的真实用户声音有限，但核心信息非常明确：

- **用户 @dimonb 的痛点**: 官网证书过期导致“every browser and every TLS client now refuses the connection”，且其评论强调“time-sensitive”。用户使用了 CRITICAL 标签，期望项目方快速处理。从使用场景判断，该用户在尝试访问项目官网时遭遇连接被拒绝，因此特意到 GitHub 仓库提报——**反映出用户对项目有一定的忠诚度，愿意花额外精力反馈问题**。
- **潜在不满**: 截至今日，该问题已存在8天且无任何维护者公开回应，持续未解决的状态可能会削弱社区对项目维护活跃度的信任。

---

## 8. 待处理积压

### ⚠️ #3377 — 官网 TLS 证书过期 (CRITICAL, stale)
- **创建/更新**: 2026-09-12 / 2026-09-19
- **状态**: OPEN，已被标记 stale，无分配人、无里程碑
- **链接**: https://github.com/sipeed/picoclaw/issues/3377
- **提醒**: 这是当前最紧急的积压项。证书过期已导致项目公开主页连续8天不可访问，且被标记 stale 可能意味着问题将更早进入自动关闭流程——如果维护者不在一周内响应，该 Issue 可能被机器人关闭，但问题本身依旧存在。**建议维护者：立即续期证书并关闭该 Issue，同时在仓库 README中检查是否有其他基础设施存在类似到期风险。**

> 数据来源: GitHub (sipeed/picoclaw) | 统计窗口: 2026-09-19 ~ 2026-09-20

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-09-20）

## 1. 今日速览

过去 24 小时项目无新增或关闭 Issue，仅有 4 条 PR 保持活跃且均为待合并状态，无新版本发布。4 条 PR 中有 2 条为 8 月底创建、昨日仍在更新的修复型 PR（sweep 超时误杀、mount 安全绕过），另 2 条为昨日新提交的功能型 PR（pi provider、`ncl health` CLI 命令）。整体看，项目处于「提交活跃、合并暂缓」的状态，Issue 侧活跃度较低，但 PR 侧的持续投入表明核心开发仍在推进。值得关注的是，多条 PR 已等待合并超 3 周，合并节奏可能成为近期项目健康度的关键观察指标。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

昨日没有 PR 被合并或关闭，因此没有可直接确认的「已完成」进展。但当前有 4 条待合并 PR，覆盖功能扩展、稳定性修复与安全加固，分别体现了项目在以下方向上的推进：

- **Agent 运行时稳定性（#3646）**：修复 sweep 机制因硬编码 30 分钟 kill 阈值、且心跳仅依赖 provider 流事件而误杀慢速本地模型的问题。该 PR 将空闲超时改为可配置，并统一应用到两条 kill 路径，解决「本地推理比托管推理慢时被误判为死掉」的真实场景。
  https://github.com/nanocoai/nanoclaw/pull/3646

- **Provider 生态扩展（#3857）**：新增 Pi Coding Agent 作为可安装 provider（`/add-pi` skill）。Pi 以进程内 SDK 方式运行，无需管理独立的 serve 进程生命周期，降低了接入复杂度。该 PR 与历史 issue #80、#1163 关联，是项目在多 provider 支持路线上的新一步。
  https://github.com/nanocoai/nanoclaw/pull/3857

- **CLI 可运维性提升（#3856）**：新增 `ncl health` 命令，提供本地只读健康检查。它能直接以只读模式打开中央数据库并读取错误日志，在主进程中即使宕机时也能工作，解决了此前所有 `ncl` 命令都必须依赖活跃 host 进程的限制，并关闭了 issue #2504。
  https://github.com/nanocoai/nanoclaw/pull/3856

- **容器安全加固（#3680）**：修复 `validateSpec` 中 allowlisted-extra mount 绕过漏洞。该问题属于安全相关的缺陷修复，已附修复补丁，严格遵循贡献指南与容器安全审查流程。
  https://github.com/nanocoai/nanoclaw/pull/3680

若上述 PR 在未来数日获合并，项目将同时在运行时稳定性、Provider 生态、CLI 工具链与安全防护四个维度取得可见进步。

## 4. 社区热点

过去 24 小时没有出现高讨论量的 Issue 或 PR（无新增评论数据）。但结合现有 PR 的引用关系与内容，可以观察到两个值得关注的需求信号：

- **多 Provider 整合的持续诉求**：PR #3857（pi provider）明确引用了 issue #80 和 #1163，说明社区对「可安装、可扩展的 agent provider 生态」存在长期且未完全满足的诉求。Pi 以进程内 SDK 形态接入，可能成为继 opencode provider 之后又一个低运维成本的 provider 选项，值得项目维护者关注其与现有 provider 架构的兼容性。
  https://github.com/nanocoai/nanoclaw/pull/3857

- **本地模型运行体验的隐性不满**：PR #3646 的提交说明直接指出了一个用户侧痛点——使用比托管推理更慢的本地后端时，sweep 机制会误杀仍在执行的任务。这反映出部分用户正在尝试将 NanoClaw 用于本地模型场景，而默认超时策略未能适配这一使用方式。社区热点背后是「本地优先」用户群体的真实诉求。
  https://github.com/nanocoai/nanoclaw/pull/3646

## 5. Bug 与稳定性

昨日无新 Bug 上报，但当前有 2 条已提交修复补丁的 Bug 相关 PR 处于待合并状态，按严重程度排列如下：

| 严重程度 | 问题描述 | 状态 | 链接 |
|---|---|---|---|
| **高** | `validateSpec` 中的 allowlisted-extra mount 存在安全绕过漏洞，可能允许未预期的容器文件系统访问 | 已有修复 PR #3680，待合并 | https://github.com/nanocoai/nanoclaw/pull/3680 |
| **中** | sweep 机制硬编码 30 分钟 kill 阈值，导致慢速本地模型任务被误杀 | 已有修复 PR #3646，待合并 | https://github.com/nanocoai/nanoclaw/pull/3646 |

两条 PR 均已在 8 月底创建并持续更新至昨日，维护者若能在近期完成 review 与合并，将显著降低容器安全风险和本地模型使用体验的负面影响。

## 6. 功能请求与路线图信号

从昨日更新的 PR 来看，未来版本可能纳入的功能方向包括：

- **可配置的 sweep 空闲超时**（#3646）：将超时参数暴露为配置项，提升系统对不同推理后端的适应力。这是一个明确的稳定性特性，很可能进入下一版本。
  https://github.com/nanocoai/nanoclaw/pull/3646

- **Pi provider 支持**（#3857）：如果被合并，项目将新增一个进程内 SDK 形态的 agent provider，进一步丰富「可安装 provider」生态，可能为后续第三方 provider 接入建立新的形态参考。
  https://github.com/nanocoai/nanoclaw/pull/3857

- **`ncl health` 命令**（#3856）：零依赖、不依赖主进程的本地健康检查能力，是 CLI 可运维性的重要补强。关闭 issue #2504 表明该功能是对社区明确需求的直接响应。
  https://github.com/nanocoai/nanoclaw/pull/3856

- **mount 安全检查收紧**（#3680）：安全修复通常具有最高优先级，通常会随下一个补丁版本发布。
  https://github.com/nanocoai/nanoclaw/pull/3680

综合来看，下一版本可能围绕「本地场景稳定性 + CLI 运维能力 + Provider 生态扩展 + 安全加固」四个主题展开。

## 7. 用户反馈摘要

过去 24 小时无新增 Issue 和评论，因此没有直接的公开用户反馈数据。但从 PR 提交信息中可以提取以下来自用户侧的问题信号：

- **本地模型用户面临的误杀问题**：PR #3646 描述了后端比托管推理慢时被视为 dead 的实际场景，反映了用户对「支持慢速本地推理后端」的诉求。
  https://github.com/nanocoai/nanoclaw/pull/3646

- **健康检查场景的运维痛点**：PR #3856 提出「主进程宕机时仍能检查系统状态」的需求，说明用户在真实运维中遇到了 host 进程不可用却仍想快速诊断本地状态的场景。
  https://github.com/nanocoai/nanoclaw/pull/3856

这些信号虽然来自提交者而非 Issue 评论，但均指向了真实用户环境中的功能缺口，具有参考价值。

## 8. 待处理积压

以下为当前等待时间较长、需要维护者重点关注并尽快推进 review/合并的 PR：

- **PR #3646（sweep 超时修复）**：创建于 2026-08-29，已等待约 3 周。Bug 修复型 PR，长期未合并可能持续影响本地模型用户的稳定性体验。
  https://github.com/nanocoai/nanoclaw/pull/3646

- **PR #3680（mount 安全修复）**：创建于 2026-08-30，已等待约 3 周。涉及安全漏洞，建议优先处理。
  https://github.com/nanocoai/nanoclaw/pull/3680

当前没有长期未响应的重要 Issue。

---

**整体健康度评估**：项目核心开发保持活跃，多条高质量 PR 覆盖了功能与安全层面，但合并周期偏长（已有 PR

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-09-20）

## 今日速览

- 项目今日整体活跃度较低：过去 24 小时无新增/关闭 Issue，无新版本发布，仅有 1 条 Pull Request 仍在待合并队列。
- 当前唯一的 PR #7499 创建于 2026-08-11，昨日（09-19）有新动态，但尚未收到评论和点赞，评审节奏偏慢。
- 该 PR 涉及文档与依赖两个 scope，规模为 XL，风险等级 low，表明项目正在推进一项较完整的身份认证集成功能，但未引发大规模社区讨论。
- 整体判断：项目处于缓慢迭代阶段，核心开发活动未停摆，但社区互动与反馈相对平静。

## 项目进展

**今日合并/关闭的 PR：无**

今日没有 PR 被合并或关闭，最重要的进展是待合并 PR #7499 的状态变化（最近更新于 2026-09-19）：

- [PR #7499 - feat(identyclaw): host-mediated Passport for practitioners](https://github.com/nearai/ironclaw/pull/7499)
  - 作者：@discernible-io（新贡献者）
  - 规模：XL；风险：low；影响范围：docs、dependencies
  - 内容摘要：增加一个薄宿主层（`builtin.idcp` + 策略授权/AskAlways 例外），使无进程 IronClaw 代理无需 shell 或可安装扩展即可调用 IdentyClaw Passport。同时附带 `deploy/identyclaw/` 下的实践者宿主工具包（Node CLI + 可选 `:3921` 环回助手）。
  - 意义：该 PR 为无进程代理扩展了身份验证能力，是“identyclaw”方向的一块重要拼图，为后续依赖身份服务的部署场景奠定了基础。虽然尚未合并，但项目在身份与部署工具链上的路线已经显现。

## 社区热点

今日无高互动 Issue 或 PR，唯一活跃项为 [PR #7499](https://github.com/nearai/ironclaw/pull/7499)，评论数数据缺失（undefined）、👍 为 0。虽然没有激烈的讨论，但该 PR 从 8 月 11 日保持开放至今，已超过一个月。其“host-mediated Passport”与“practitioner kit”方向或反映了部分用户对无 shell 环境下身份集成的实际需求，只是目前尚未形成公开热度。

## Bug 与稳定性

- **无新增 Bug 报告**：过去 24 小时未发现崩溃、回归、安全漏洞等稳定性问题。
- 待合并 PR #7499 被标注为 **risk: low**，且 scope 主要涉及 docs 和 dependencies，预计对主逻辑影响面较小。
- 项目当前未见明显稳定性风险信号。

## 功能请求与路线图信号

**今日无新增功能请求 Issue。** 从 PR #7499 可以捕捉到以下路线图信号：

- 无进程/无 shell 环境下的宿主代理能力增强；
- 身份验证与策略授权（AskAlways 例外）机制向 Passport 服务延伸；
- `deploy/identyclaw/` 目录的出现暗示项目开始提供部署工具链（Node CLI + loopback helper）。

上述信号结合现有 PR 判断，这些能力大概率会被纳入下一版本或作为重要扩展点推出。

## 用户反馈摘要

今日无 Issues 评论可供提取真实用户痛点。唯一间接反馈来源是 [PR #7499](https://github.com/nearai/ironclaw/pull/7499) 的提交动机，反映出用户侧存在以下潜在诉求：

- 希望在无传统 shell 或不可安装扩展的环境中，依然能安全地完成身份认证与权限调用；
- 对轻量级、内建（built-in）的宿主协助机制有明确需求，而非依赖外部工具链。

由于缺少直接评论数据，本次摘要基于代码变更推测，未构成普遍性结论。

## 待处理积压

- [PR #7499 - feat(identyclaw): host-mediated Passport for practitioners](https://github.com/nearai/ironclaw/pull/7499)
  - **积压时长**：自 2026-08-11 创建以来已超过 40 天，最后更新为 2026-09-19（本周），说明作者仍在迭代，但维护者响应速度不快。
  - **风险提示**：该 PR 体量为 XL，涉及 docs 和 dependencies，长时间未合并会不断增大冲突风险，且可能阻塞后续依赖此功能的开发分支。
  - **建议**：维护者尽快安排 review，或与作者确认阶段性结论（要求变更、延后合并、关闭等），避免产生长期悬置 PR。

---

**报告生成时间**：2026-09-20  
**数据来源**：GitHub - nearai/ironclaw  
**说明**：以上基于截至生成时刻的有限公开数据进行分析，部分字段（如评论数）因数据缺失未能完整呈现。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报 — 2026-09-20

## 1. 今日速览

过去 24 小时项目活跃度中等偏上：共 6 条 PR 全部完成合并/关闭（无待合并残留），2 条 Issue 更新（1 条新增、1 条关闭），无新版本发布。今日核心进展集中在 **SQLite 存储层数据完整性修复**（#1072 关闭 #1071）、**Windows WSL 环境构建修复**、**定时任务迁移数据丢失修复** 以及 **Agent 删除后 UI 联动刷新** 等多项稳定性改进。其中 #1071 与 #1072 形成完整的「问题发现→修复落地」闭环，说明项目对数据可靠性问题响应迅速；但 #1014（Dispatch 可发现性描述）自 3 月 29 日创建以来长期未关闭，社区响应存在一定积压。整体来看，项目处于健康迭代状态，工程质量和跨平台兼容性在持续加固。

## 2. 版本发布

无（过去 24 小时无新 Release）。

## 3. 项目进展

今日共合并/关闭 6 个 PR，覆盖数据完整性、跨平台构建、迁移可靠性、UI/UX 联动四个维度：

- **修复 SQLite 存储层三个数据完整性/可靠性缺陷**（#1072 @MaoQianTu）— 启用 `PRAGMA foreign_keys` 并添加防御性显式删除子行，修复 `CASCADE` 失效致孤儿消息累积；优化 `save()` 原子写逻辑防止崩溃损坏；修复 `storeInitPromise` 超时后永久故障。**Closes #1071**，是今日最重要的数据安全修复。
  https://github.com/netease-youdao/LobsterAI/pull/1072
- **修复 Windows + WSL 共存场景下构建失败**（#1075 @zhangheng18）— 强制在 Windows 上使用 Git Bash (MSYS2) 而非 WSL bash，解决 `/bin/bash` 找不到脚本路径的问题，不影响 Linux/macOS 构建流程。
  https://github.com/netease-youdao/LobsterAI/pull/1075
- **修复定时任务 Run History 迁移写入失败后仍标记完成**（#1076 @0xFLX）— 补上写入错误计数，避免磁盘满、权限不足等场景下数据永久丢失。
  https://github.com/netease-youdao/LobsterAI/pull/1076
- **修复删除当前 Agent 后任务列表不自动刷新**（#1077 @OnePieceJoker）— 删除当前 agent 后，左侧边栏任务列表未能跟随 main agent 切换而刷新，现已修复。
  https://github.com/netease-youdao/LobsterAI/pull/1077
- **支持 per-session MCP 开关控制**（#1070 @vdorchan）— 会话输入框新增 MCP 控制按钮，每个会话可独立启用/禁用 MCP server，状态持久化到 DB；在 OpenClaw 引擎 McpBridgeServer 层实现请求拦截，推进桌面级 Agent 功能拓展。
  https://github.com/netease-youdao/LobsterAI/pull/1070
- **重构 CoworkSessionDetail 单文件组件**（#1069 @stone333）— 将 2100+ 行核心组件拆分为类型定义、纯函数逻辑、子组件等独立模块，提升可维护性并减少流式输出时的不必要重渲染。
  https://github.com/netease-youdao/LobsterAI/pull/1069

## 4. 社区热点

- **SQLite 存储层三缺陷 Issue 与修复 PR 联动引发关注**（#1071 + #1072）— Issue 创建于 3 月 30 日，共获得 2 条评论，由 @MaoQianTu 深度审计后详细报告三个相互关联的数据完整性问题（CASCADE 失效、非原子写、初始化超时永久故障）；同日提交修复 PR 并关闭。这说明部分用户正在对存储层进行深度代码审计，且对数据可靠性有较高要求。修复方案选择「启用外键 + 防御性删除」双保险，体现了项目组对生产环境稳定性的重视。
  https://github.com/netease-youdao/LobsterAI/issues/1071
  https://github.com/netease-youdao/LobsterAI/pull/1072
- **Dispatch 可发现性描述请求**（#1014 @VisionAIrySE）— 提议为 `technology-search` 技能添加描述以提升在 Dispatch 生态中的可发现性，仅 1 条评论且长期未关闭，反映出外部生态开发者对项目接入第三方工具市场的意愿。
  https://github.com/netease-youdao/LobsterAI/issues/1014

## 5. Bug 与稳定性

今日共识别 4 个 Bug 类修复，均已有对应 PR 合并，按严重程度排列如下：

- **严重 — SQLite 存储层数据完整性缺陷**：CASCADE 失效致孤儿消息累积 + 非原子写致崩溃损坏 + `storeInitPromise` 超时后永久故障，可能导致生产环境数据丢失或功能不可用。已有修复 PR #1072（已合并）。
  https://github.com/netease-youdao/LobsterAI/issues/1071
- **高 — 定时任务 Run History 迁移数据永久丢失**：JSONL 写入失败（磁盘满、权限不足）后仍标记完成，导致旧数据无法迁移。已有修复 PR #1076（已合并）。
  https://github.com/netease-youdao/LobsterAI/pull/1076
- **中 — Windows + WSL 共存时构建失败**：构建脚本路径解析错误，影响 Windows 开发者。已有修复 PR #1075（已合并）。
  https://github.com/netease-youdao/LobsterAI/pull/1075
- **低 — 删除当前 Agent 后任务列表未刷新**：UI 显示与当前 agent 状态不一致（功能性问题，非数据影响）。已有修复 PR #1077（已合并）。
  https://github.com/netease-youdao/LobsterAI/pull/1077

## 6. 功能请求与路线图信号

- **per-session MCP 开关控制**（#1070）— 用户明确表达「MCP server 仅支持全局开关、无法按会话场景独立配置」的痛点，PR 已实现针对不同会话独立启停 MCP server 的能力，并持久化到 DB。这是向 OpenClaw 生态桌面级 Agent 演进的重要功能信号，预计将成为后续版本的核心能力之一。
  https://github.com/netease-youdao/LobsterAI/pull/1070
- **Dispatch 生态可发现性**（#1014）— 外部开发者希望为 `technology-search` 技能添加描述以接入 Dispatch 运行时。虽未直接提交代码，但反映出项目技能/插件生态正在被第三方工具关注，未来或需考虑生态兼容性方面的投入。
  https://github.com/netease-youdao/LobsterAI/issues/1014

## 7. 用户反馈摘要

- **对存储层可靠性的关注度高**（#1071）：用户进行了系统性代码审计，指出 `ON DELETE CASCADE` 虽在表结构定义但实际未生效（SQLite 默认关闭外键），说明部分用户对数据一致性有深入理解且愿意主动反馈深度技术问题。修复后需关注是否引入删除性能开销。
- **MCP 配置粒度不足**（#1070）：用户以实际使用场景提出「不同会话需要不同 MCP server 组合」的需求，语言表述清晰且附带引擎层实现方案，属于高质量功能请求。这类反馈通常来自深度用户。
- **开发者对生态接入有期待**（#1014）：外部平台主动发现并推荐本项目的 Claude Code skill，显示 LobsterAI 的周边生态建设正在起步，但该需求长期未获响应可能影响生态开发者积极性。

## 8. 待处理积压

- **#1014 Add a description to improve Dispatch discoverability**（@VisionAIrySE，创建于 2026-03-29）— 已开放 **约 175 天**，仅 1 条评论，至今无 assignee、无 label、无代码 PR。虽然功能优先级可能不高，但作为来自外部生态的主动接入请求，长期不响应会有损项目对第三方贡献者的友好度，建议维护者评估后快速给出结论（或标注「暂不计划」）。
  https://github.com/netease-youdao/LobsterAI/issues/1014
- **#1071 虽已关闭但建议跟踪回归**（@MaoQianTu，创建于 2026-03-30）— 修复 PR #1072 已合并，但涉及 SQLite 外键约束启用与防御性删除，建议后续版本中纳入回归测试范围，防止未来表结构变更时引入同类问题。
  https://github.com/netease-youdao/LobsterAI/issues/1071

---

*报告生成时间：2026-09-20 | 数据来源：LobsterAI GitHub 仓库*

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报 — 2026-09-20

## 今日速览

过去 24 小时项目活跃度中等偏上：4 条 Issue 更新，其中 3 条新开/活跃、1 条关闭；1 条功能型 PR 待合并，无新版本发布。核心焦点集中在 **heartbeat 的 `active_hours` 配置形同虚设** 这一缺陷上——新关闭的 #1278 从代码层面验证了该功能从未被求值，直接回应了自 8 月 16 日起悬置的 bug #1205；同时新开 #1279 揭示了 heartbeat 注册硬编码导致 `tool_controls` 无法配置。此外 #1277 报告了 `spawn_agent` 子代理工具白名单为空数组时行为异常的问题。整体来看，项目在 agent 运行时配置的可靠性上存在多处待修复点，需维护者优先关注。

---

## 项目进展

过去 24 小时内 **无 PR 被合并或关闭**，无重大代码合入。值得注意的进展是：

- **#1278 关闭**（链接: https://github.com/moltis-org/moltis/issues/1278）：该 Issue 通过 grep 实证 `is_within_active_hours` 在 `main` 分支及 `20260414.02` 标签下均无任何调用者，确认了文档描述的 `heartbeat.active_hours` 与代码实现严重脱节。虽然该 Issue 本身已关闭，但它为长期未解决的 #1205 提供了清晰的根因证据，相当于完成了问题定位的前置侦察工作。

- **#1276 待审查**（链接: https://github.com/moltis-org/moltis/pull/1276）：社区贡献者 @Kaboka22 提交了一个规模可观的功能 PR，将 **Groq 升级为一级 OpenAI 兼容 provider**（此前只能退回 genai fallback），同时带来严格零参数工具 schema 和可解析的变更结果。该 PR 若合入将显著扩展模型接入生态。

---

## 社区热点

今日讨论热度不高但主题高度集中，评论均围绕 **heartbeat 活跃时间配置失效** 展开：

- **#1278**（已关闭，1 条评论）: https://github.com/moltis-org/moltis/issues/1278 — 用户 @jbutler1980 不仅指出 `active_hours` 文档描述与实现不符，还贴出了 `is_within_active_hours` 零调用者的代码证据，说明用户已在深入阅读源码并验证配置行为。
- **#1205**（已打开，1 条评论）: https://github.com/moltis-org/moltis/issues/1205 — 该 bug 自 8 月 16 日报告以来持续活跃，用户 @IlyaBizyaev 描述 heartbeat 持续运行、完全忽略 `active_hours` 配置。今日获得更新（9 月 19 日），与 #1278 的关闭形成前后呼应。

**诉求分析**：两个 Issue 背后的共同诉求非常明确——用户期望 `heartbeat.active_hours` 能被真正强制执行，以便在特定时间窗口之外停止心跳上报，从而节省资源、避免非工作时间的噪音。这不仅是功能缺陷，更影响实际部署场景中的成本与合规控制。

---

## Bug 与稳定性

按严重程度排序：

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 🔴 高 | [#1205](https://github.com/moltis-org/moltis/issues/1205) | **Heartbeat 忽略 `active_hours` 配置持续运行** — 核心功能与文档严重不符，已在 #1278 中得到代码层面验证，涉及所有配置了活跃时间窗口的用户 | 打开，无关联 fix PR |
| 🔴 高 | [#1277](https://github.com/moltis-org/moltis/issues/1277) | **`spawn_agent` 将 `active_tools: []` 解析为空白名单，子代理获得零工具** — 空数组的语义歧义导致功能静默失效，影响依赖子代理工具注入的自动化流程 | 打开，无关联 fix PR |
| 🟡 中 | [#1279](https://github.com/moltis-org/moltis/issues/1279) | **heartbeat 注册硬编码 `Default::default()`，用户无法通过 `CronPayload::AgentTurn` 设置 `tool_controls`** — 配置被强行覆盖，限制了 cron 场景下的工具控制能力 | 打开，无关联 fix PR |
| 🟢 低 | [#1278](https://github.com/moltis-org/moltis/issues/1278) | **文档声明与代码实现不一致** — `active_hours` 被描述为"enforced"但从未被求值 | 已关闭（文档/证据确认） |

**稳定性评价**：过去 24 小时内新报告 2 个 bug、无崩溃或回归。但 #1205 已超过一个月未修复且没有关联 PR，heartbeat 配置链路（#1205 + #1279）存在系统性缺陷，值得维护者重点排查。

---

## 功能请求与路线图信号

当前没有收到纯新增功能请求，但从 PR 和 Issue 中可以提取以下路线图信号：

- **Groq 一级支持**（#1276, https://github.com/moltis-org/moltis/pull/1276）：将 Groq 从 generic fallback 升级为完整的 OpenAI 兼容 provider，支持工具调用和模型发现。这表明社区对 **低成本高速推理后端** 有明确需求，Groq 的加入将扩大 Moltis 的模型选择空间。
- **Heartbeat 工具控制能力**（#1279, https://github.com/moltis-org/moltis/issues/1279）：用户希望在 cron 执行路径中通过 `AgentTurn` 携带 `tool_controls`，意味着 heartbeat 不只是简单的心跳，还承担着 **定时代理任务执行** 的角色，需要更精细的工具集控制。
- **`active_tools` 空数组语义澄清**（#1277, https://github.com/moltis-org/moltis/issues/1277）：`[]` 应表示"不限制"还是"禁用全部"的歧义需要明确，这不仅是 bug 修复，更是 API 契约设计的补充。

以上信号中，#1276 的 PR 已提供具体实现，按正常流程 **最有可能进入下一版本**（若审查通过）；#1279 与 #1205 的修复路径高度重合，预计维护者会一并处理。

---

## 用户反馈摘要

从今日 Issue 评论与描述中可提炼以下真实用户声音：

- **@jbutler1980**（#1278）对文档与实现的一致性非常敏感，主动用 grep 搜索代码调用关系并给出具体 commit/tag 证据，展现了深入的技术调研行为。痛点在于：配置参考文档是用户信任的权威来源，文档失实会直接破坏可靠性预期。
- **@IlyaBizyaev**（#1205）在一个月前就遇到 heartbeat 持续运行的困扰，使用场景应该是**设定活跃窗口以控制资源消耗**，但现状迫使其在非活跃时段也无法获得安静环境。
- **@letsrock85**（#1277）大概率在构建多代理协作流程时踩坑——子代理拿到零工具意味着任务完全无法执行，这类问题隐蔽性强、排查成本高。
- **@Kaboka22**（#1276）作为 PR 提交者，主动补齐 Groq 的工具调用与模型发现能力，体现社区对扩展模型生态的积极贡献意愿。

整体反馈偏向**功能性缺陷的严肃报告**，未出现情绪化抱怨，用户以建设性态度提供代码证据和复现路径，社区氛围专业。

---

## 待处理积压

以下事项需要维护者关注：

- 🔴 **#1205**（https://github.com/moltis-org/moltis/issues/1205）— 自 2026-08-16 打开至今超过 1 个月无 fix PR，今日 #1278 已从代码层面确认其根因，修复条件成熟，**强烈建议纳入近期迭代**。
- 🟠 **#1276**（https://github.com/moltis-org/moltis/pull/1276）— 功能性 PR 已提交但尚无维护者评论/审查，长时间搁置会挫伤贡献者积极性，建议尽快安排 review。
- 🟡 **#1277**（https://github.com/moltis-org/moltis/issues/1277）与 **#1279**（https://github.com/moltis-org/moltis/issues/1279）— 均为昨日新开问题，暂无维护者回复，虽处于正常的响应周期内，但涉及 agent 工具配置的可靠性，建议优先回复确认。
- ⚪ **#1205** 关联的旧有评论尚未形成修复方案讨论，维护者可在 #1278 关闭后引导讨论至实现层面。

---

*数据统计区间：2026-09-19 至 2026-09-20 | 数据来源: https://github.com/moltis-org/moltis*

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报 — 2026-09-20

> 数据来源：GitHub · 统计周期：2026-09-19 ~ 2026-09-20 24h

---

## 1. 今日速览

过去 24 小时 CoPaw 项目保持较高活跃度：**9 条 Issue 更新（全部为新开/活跃）**，**8 条 PR 更新（7 条待合并，1 条已合并）**。无新版本发布，当前用户版本停留在 **v2.2.1**。今日 Issue 以 Bug 报告为主，集中在**前端 UI 恢复机制（#7888、#7815）**、**媒体文件载荷兼容性（#7883）**、**安全边界绕过（#7881）** 三大方向；PR 侧已出现多组针对性修复（#7889、#7885、#7886、#7887），其中有 1 个**首次贡献者 PR（#7880）**，项目维护者需积极跟进。整体来看，社区反馈活跃，但**合并速度偏慢（24h 仅合并 1 个 CI 修复）**，待审查 PR 积压值得关注。

---

## 2. 版本发布

**无新版本 Release。** 当前线上版本为 **v2.2.1**（多起 Issue 均基于该版本复现，如 #7882、#7883、#7877 等）。社区对 v2.2.1 仍存在若干未解决回归，下一补丁版本的内容很可能由今日在途的修复 PR（#7889、#7885 等）构成。

---

## 3. 项目进展

今日 **仅 1 个 PR 被合并**，另有 7 个 PR 在等待合并 / 审查。

### ✅ 已合并

| PR | 内容 | 意义 |
|---|---|---|
| [#7863](https://github.com/agentscope-ai/QwenPaw/pull/7863) fix(ci): stabilize Windows reload and snapshot tests | 修复 Windows Uvicorn reload 集成测试中 `app_dir` 设置，统一快照文本资产的 LF checkout | 消除 Windows 平台测试不稳定因素，提升 CI 可靠性，属于**工程基础设施打磨** |

### 🔄 已就绪等待合并（可能进入下一版本）

- **#7889** fix(console): recover from transient DOM-mutation render errors — 直接修复今日热门 Bug #7888
- **#7885** fix(agents): retry after unsupported file payload errors — 针对 #7883 的 PDF 序列化拒绝问题
- **#7886 / #7887** fix(agents): handle unknown audio part rejections — 两条相似修复，处理模型拒绝音频载荷后的恢复逻辑（注意两点可能重复，维护者需去重合并）
- **#7880** feat(plugins): add escalation-only tool policy hooks — 首次贡献者 PR，落实 #7878 的功能请求
- **#7874** feat(pawapp): redesign the SDK and app control plane — 大型架构级功能，PawApp SDK 控制面重设计
- **#7829** perf(console): split chat dependencies and lazy-load locales — 控制台性能优化，拆分 vendor bundle

**整体判断：** 项目在 **agent 媒体兼容性**、**前端错误恢复**、**插件治理**三条线上同时推进，修复方向与社区 Bug 反馈高度对齐，迭代效率良好；但 7 个待合并 PR 意味着**审查瓶颈**是当前主要风险。

---

## 4. 社区热点

最受关注的议题集中在“**UI 无法自行恢复**”和“**功能诉求**”两类：

### 🗨️ 讨论最多：#7815 Console does not recover from failed lazy page chunk load（5 条评论）
[#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815)
- **现象：** 懒加载页面块加载失败后，每次导航都停留在错误页，只能整页刷新。内置重试机制失效，错误边界无法自愈。
- **诉求：** 用户希望错误边界具备**自动重试或至少手动重试按钮**，而不是陷入死循环。

### 🆕 功能讨论：#7878 Expose a plugin-visible pre-tool-call policy hook（3 条评论）
[#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878)
- **诉求：** 暴露插件可见的**工具调用前策略钩子**，让外部分类器和组织级校验不通过 monkey-patch 即可接入治理管道。
- **进展：** 该请求已由 PR #7880 实现，进入待审查状态，是今日社区与开发侧衔接最顺畅的案例。

### 😠 情绪化反馈：#7884 聊天记录历史太短（2 条评论）
[#7884](https://github.com/agentscope-ai/QwenPaw/issues/7884)
- **原文：** “聊天记录的历史这么短么？讨论过的问题，回头往上翻，看不到了？？？知道这个体验多差么？？？”
- **诉求：** 用户强烈要求**延长聊天历史保留长度**，属于高频基础体验问题，建议优先评估配置化支持。

### 🐛 进展迅速：#7888 Chat stuck on "Something went wrong"（2 条评论）
[#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888)
- **现象：** 浏览器插件注入 `<font>` 包装 React 管理的文本节点，导致 `insertBefore NotFoundError`，聊天页永久显示错误。
- **响应：** 该 Issue 已由 #7889 在当天内修复，属于**高效闭环**的正面案例。

---

## 5. Bug 与稳定性

今日共报告 7 项 Bug/问题，按严重程度排序如下：

| 严重程度 | Issue | 摘要 | 是否有 Fix PR |
|---|---|---|---|
| 🔴 高 | [#7888](https://github.com/agentscope-ai/QwenPaw/issues/7888) | 聊天页因 DOM 变更错误永久卡在 "Something went wrong"，路由 `/#/chat` 全部受影响 | ✅ [#7889](https://github.com/agentscope-ai/QwenPaw/pull/7889) |
| 🔴 高 | [#7815](https://github.com/agentscope-ai/QwenPaw/issues/7815) | 惰性加载失败后控制台无法恢复，每次导航均显示错误屏 | ⚠️ 已有重试机制但失效，无明确修复 |
| 🟠 中 | [#7883](https://github.com/agentscope-ai/QwenPaw/issues/7883) | 工具返回 PDF 被序列化为 OpenAI 风格嵌套 file part，DeepSeek 返回 400；#7597 的修复不完整，2.2.1 仍可复现 | ✅ [#7885](https://github.com/agentscope-ai/QwenPaw/pull/7885) |
| 🟠 中 | [#7881](https://github.com/agentscope-ai/QwenPaw/issues/7881) | kimi-code ACP 运行器绕过边界检查：Edit 被拦截，但 Write（新文件）和 Bash 完全无防护 | ❌ 无（依赖 #7878/治理相关改动） |
| 🟠 中 | [#7882](https://github.com/agentscope-ai/QwenPaw/issues/7882) | OpenCode 供应商"免费"模型 API 调用 403 FreeTierError，UI 仍标记为免费，误导用户 | ❌ 无 |
| 🟡 低 | [#7879](https://github.com/agentscope-ai/QwenPaw/issues/7879) | MCP 配置"授权"触发 OAuth 握手失败，缺 client_id/resource，无法接入静态 Bearer Key 类型 MCP server | ❌ 无 |
| 🟢 极低 | [#7877](https://github.com/agentscope-ai/QwenPaw/issues/7877) | 会话级工作目录面板 UI 缺陷：可视区仅约 3 行、"最近项目"恒空、选目录后"应用"按钮仍禁用 | ❌ 无 |

**稳定性判断：** 两个高严重度问题均与**前端错误边界恢复**相关，说明 UI 层自愈机制存在系统性短板；#7883 的“修复后又回归”提示测试覆盖对真实供应商兼容性捕获不足；#7881 的**安全边界绕过**是今日最值得优先关注的问题——破坏性命令在 Write/Bash 中完全绕过检查，建议提升处理优先级。

---

## 6. 功能请求与路线图信号

### 📌 可能进入下一版本的功能

| 请求 | 关联 PR | 判断依据 |
|---|---|---|
| [#7878](https://github.com/agentscope-ai/QwenPaw/issues/7878) 插件可见的预工具调用策略钩子 | [#7880](https://github.com/agentscope-ai/QwenPaw/pull/7880) | 实现已完成，自述“ready for maintainer review”，进入合并队列 |
| [#7874](https://github.com/agentscope-ai/QwenPaw/pull/7874) PawApp SDK 与应用控制面重设计 | 本身即 PR | 架构级改动，涉及公共/私有操作边界、幂等分发与恢复，但体量大，合并周期可能较长 |
| [#7829](https://github.com/agentscope-ai/QwenPaw/pull/7829) 控制台启动性能优化（代码拆分 + 懒加载语言包） | 本身即 PR | 已打开 3 天，属于低风险性能优化，预计可在近期合并 |

### 🔮 路线图信号（尚无 PR，但呼声明确）

- **延长聊天历史保留长度（#7884）：** 用户情绪激烈，是基础体验欠债，可能进入 Console 设置项开发。
- **错误边界的“手动重试”

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