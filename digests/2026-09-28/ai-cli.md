# AI CLI 工具社区动态日报 2026-09-28

> 生成时间: 2026-09-28 02:26 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告（2026-09-28）

## 1. 生态全景

当前 AI CLI 工具整体处于**“高频迭代、平台补课、安全加固”**阶段。头部工具几乎每日发布新版本，但 Bug 反馈同步激增，尤其集中在 Windows 桌面端、MCP 连接稳定性、Agent 执行可靠性与安全边界显式化。各工具均通过快速发版、PR 合入和社区 issue 闭环来维持用户信任，同时也在向更高的架构目标（如多引擎 Agent、持久化运行时、企业级安全审计）演进。整体上看，工具的功能差异化正在缩小，**稳定性和可预期性成为新的竞争焦点**。

## 2. 各工具活跃度对比

> 统计口径：各日报中精选/列出的 Issue 与 PR 数量，非全量数据。

| 工具 | 精选 Issues | 精选 PR | Release 情况 |
|------|------------|---------|-------------|
| Claude Code | 10 | 1 | 无新版本 |
| OpenAI Codex | 10 | 10 | 6 个 Rust alpha 预发布版 |
| Gemini CLI | 10 | 10 | 1 个 nightly |
| GitHub Copilot CLI | 10（摘要列出 7） | 未列出 | v1.0.89-5 |
| Kimi Code CLI | 0 | 0 | 无活动 |
| OpenCode | 10 | 10 | 无新版本 |
| Qwen Code | 10 | 10 | 无新版本 |

**解读**：OpenAI Codex 发版频率最高，处于快速迭代期；Gemini CLI 与 Qwen Code 的 PR 活动密集，社区反馈闭环速度较快；Claude Code 今日 PR 活动较少，但 issue 热度高；Kimi Code CLI 完全静默，活跃度最低。

## 3. 共同关注的功能方向

### 3.1 Windows 平台支持与稳定性
- **Claude Code**：OAuth 403、Bash 反斜杠被吞、斜杠命令选择器不弹出。
- **OpenAI Codex**：启动失败、沙箱初始化回归、外部控制台弹窗、MCP HTTP 请求失败。
- **OpenCode**：多参数工具报 SchemaError。
- **Copilot CLI**：桌面应用认证失效（虽非纯 Windows，但桌面端问题突出）。

**诉求**：与 macOS 体验对齐，修复路径转义、认证链路、UI 渲染和沙箱权限等基础功能。

### 3.2 MCP 生态稳定性与安全
- **Claude Code**：插件 MCP 被静默丢弃、MCP 协议缓存兼容、MCP 被杀。
- **OpenAI Codex**：MCP OAuth 并发竞争、内置 MCP 启动失败。
- **OpenCode**：MCP stdio 大帧导致连接关闭。
- **Qwen Code**：`mcp reconnect` 违反隐私设置上传事件。

**诉求**：MCP 服务器生命周期可预期、认证机制健壮、传输层协议兼容统一。

### 3.3 Agent 执行可靠性/可观测性
- **Gemini CLI**：子代理超时误报成功、generalist agent 无限挂起、bugreport 缺少子代理上下文。
- **OpenCode**：Agent 30 秒后自动停止、模型循环被意外中断。
- **Claude Code**：SendMessage 假成功、turn 永久 idle。
- **Copilot CLI**：已排队消息无法取消。

**诉求**：Agent 状态报告真实可信、失败时明确报错而非静默挂起、支持子代理过程追溯。

### 3.4 安全策略与权限显式化
- **Claude Code**：钩子被系统消息触发，存在注入面；个人插件篡改组织收集器。
- **Gemini CLI**：策略误伤导致所有工具被拒绝。
- **Copilot CLI**：只读操作需要手动审批，缺少细粒度白名单。
- **Qwen Code**：aux-model 选择器凭据泄露。

**诉求**：安全边界清晰可见、支持粗/细粒度权限控制、敏感数据在出口处脱敏。

### 3.5 上下文窗口管理效率
- **OpenCode**：压缩在 30–35% 过早触发，浪费上下文。
- **Copilot CLI**：系统提示固定消耗 20.5K token，需可裁剪。
- **Qwen Code**：Skill 工具被排除后仍注入系统提示。
- **Gemini CLI**：探索 AST 感知文件读取以降低 token 噪声。

**诉求**：可配置、可预测的上下文管理策略，减少无关 token 占用。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 桌面端 Cowork、企业安全审计、MCP 生态 | 企业开发者、依赖 Claude 模型的重度用户 | 桌面/CLI 双入口，强组织策略管控 |
| **OpenAI Codex** | TUI 交互、Rust 重写、Windows 沙箱 | 追求新特性与高性能的 CLI 用户 | Rust 原生实现，多 alpha 快速迭代 |
| **Gemini CLI** | 子代理调度、企业配额管理、模型灰度控制 | Google Cloud/Vertex AI 用户 | 模型/Agent 深度绑定，策略引擎驱动 |
| **Copilot CLI** | GitHub 工作流集成、交互式权限、BYOK | GitHub 生态用户、企业 Copilot 订阅者 | 与 GitHub 平台深度耦合，渐进式权限设计 |
| **OpenCode** | 开源可扩展、多 Provider、TUI 与 headless 输出 | 开源社区、自托管/混合云开发者 | 强插件机制，支持 Hook 与自定义 provider |
| **Qwen Code** | Managed Agent 双引擎、远程开发、运行时持久化 | 阿里云/企业级远程开发场景 | TypeScript agent loop + 持久化 Runtime Broker，分阶段架构演进 |

**关键差异**：
- **桌面端投入**：Claude Code 和 Copilot 明显侧重桌面应用，但回退 bug 也最多；Codex 和 Gemini 仍以 CLI 为核心，桌面端尚在补全。
- **架构激进程度**：Qwen Code 在推进双引擎 Agent 架构，OpenAI Codex 在 Rust 重写，属于结构性迭代；Claude Code 和 Copilot 更倾向于增量式功能优化。
- **安全策略深度**：Claude Code 强调组织级审计链路，Gemini 注重企业配额与策略引擎，Copilot 聚焦交互式权限模型，各有侧重。

## 5. 社区热度与成熟度

- **最活跃/快速迭代**：**OpenAI Codex**。24 小时 6 个 alpha 版本，issue 和 PR 均保持双 10 精选，社区反馈响应极快，但 alpha 频发也侧面说明稳定性仍在打磨。
- **高热度 + 架构升级期**：**Qwen Code**。围绕 Managed Agent 的系列 PR 密集合入，属于项目内部战略驱动，社区参与度高（#12380 有 36 条评论）。
- **功能回归频发的成熟工具**：**Claude Code**。版本节奏放缓（无新版本），但用户对桌面端回归和 Windows 问题的情绪强烈，问题集中在用户体验一致性而非新功能。
- **稳定但存在老问题**：**GitHub Copilot CLI**。发版节奏相对克制，但高赞 issue 集中在权限模型、消息取消等长期诉求，说明核心体验趋于固化，创新空间收窄。
- **开源社区活跃**：**OpenCode**。虽然无新版本，但 PR 数量多、覆盖 TUI、MCP、稳定性等，社区贡献者活跃，生态开放性较强。
- **静默**：**Kimi Code CLI**，无社区动态，可能处于维护冷淡期或内部重构期。

**成熟度排序（综合版本稳定性、社区反馈、功能完整度）**：  
Claude Code ≈ Copilot CLI > Gemini CLI > Qwen Code > OpenCode > Codex > Kimi Code  
（其中 Codex 因 alpha 频发、Windows 问题集中，成熟度较低，但迭代速度最快。）

## 6. 值得关注的趋势信号

1. **桌面端与 CLI 融合的“缝合期”带来系统性回归**：Claude Code 的 Cowork 合并、Copilot 桌面应用会话死亡、Codex 的 Linux Electron 挂起，都表明多入口统一架构尚未成熟。开发者选择工具时应关注桌面端回退路径是否可靠。

2. **Windows 仍是“二等公民”，但缺口正在被集中补**：几乎所有工具的 Windows issue 占比达三分之一。若你的团队主力平台是 Windows，短期内更应关注 Codex 的沙箱修复和 Claude Code 的认证修复，而非追求新功能。

3. **MCP 从“可用”到“可信”还有距离**：认证竞争条件、生命周期被杀、大帧断连、隐私泄漏等问题均未被根本解决。对依赖 MCP 的自动化工作流，建议锁定稳定版并增加重试/健康检查。

4. **Agent 执行结果的可信度比功能本身更具价值**：Gemini 子代理“误报成功”、OpenCode 任务中断、Claude SendMessage 假成功——这些“假阳性”会直接污染自动化决策。今后评估工具时，优先考察其是否有“失败显式化”机制。

5. **安全与隐私正从前沿话题变成准入条件**：Claude Code 的收集器保护、Qwen 的凭据脱敏、Copilot 的白名单诉求，都指向同一个方向：平台必须提供“不可绕过”的安全边界，而非依赖模型自觉。企业采购时应对此做专项审计。

6. **上下文成本成为大众化痛点**：不止第三方模型，就连系统提示/工具列表也在消耗 token。预计下一轮优化热点将是“可裁剪系统提示”和“上下文使用透明化”，开发者应尽早追踪相关功能更新。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据来源：github.com/anthropics/skills（截至 2026-09-28）*
*说明：PR 列表按评论热度排序，数据快照中未给出具体评论数值，以下排名依据仓库排序逻辑；本快照中顶部 PR 全部处于 Open 状态。*

---

## 1. 热门 Skills 排行

**#1298 — skill-creator 触发评测隔离与跨平台修复**（Open）
社区活跃度最高的 PR，针对 skill-creator 的触发评测机制进行系统性修复：解决多 worker 命令探测互相竞争、Windows 下 select() 管道失败、无关工具中断扫描，以及运行时错误被误判为"非触发"导致负例误通过等问题。
🔗 https://github.com/anthropics/skills/pull/1298

**#1742 — mcp-builder 兼容 MCP ≥2.0**（Open）
修复 `streamablehttp_client` 在 mcp>=2.0 中更名为 `streamable_http_client` 的兼容性问题，并支持通过 `create_mcp_http_client` 配置自定义 Header。对应 Issue #1668，反映社区对 MCP 生态快速演进的跟进需求。
🔗 https://github.com/anthropics/skills/pull/1742

**#1771 — proofcore-contract-auditor 智能合约审计**（Open）
面向 Web3 开发者的新 Skill，对 Solidity/Rust 智能合约做静态分析，并将审计密码学证明锚定到 TON 区块链。社区关注点在于区块链场景与 Claude Code Skill 机制的创新结合。
🔗 https://github.com/anthropics/skills/pull/1771

**#1703 — md2video-audio Markdown 转视频**（Open）
零成本将 Markdown 文档经 Marp 编译为幻灯片，并配真人感语音旁白，直接生成 MP4 视频。属于内容生产类 Skill 的热门方向。
🔗 https://github.com/anthropics/skills/pull/1703

**#525 — pyxel 复古游戏开发**（Open）
指导 Claude 使用 Pyxel 在 Python 中创建、调试和验证复古游戏，支持无头输入驱动运行与逐帧检查。自 3 月提交以来持续更新，属于最"长寿"的活跃 PR 之一。
🔗 https://github.com/anthropics/skills/pull/525

**#514 — document-typography 排版质量控制**（Open）
针对 AI 生成文档的典型排版问题（孤字换行、段落标题悬留页底、编号错位）提供质检规则。直击"Claude 生成的每份文档"这一高频痛点。
🔗 https://github.com/anthropics/skills/pull/514

**#822 — AWT AI 驱动的 E2E 测试**（Open）
集成开源工具 AWT，为 Claude 赋予视觉与浏览器控制能力，实现零代码 E2E 测试生成与自动执行，是测试自动化方向的高关注度 PR。
🔗 https://github.com/anthropics/skills/pull/822

---

## 2. 社区需求趋势

**🔒 安全与信任边界（最强烈诉求）**
- **#492（43 评论）：社区技能被分发在 `anthropic/` 命名空间下，冒充官方技能，构成信任边界滥用**。用户可能在误认为官方的情况下授予社区技能过高权限，是当前生态最具争议的问题。
- #1175：在 SKILL.md 中直接编写 SharePoint Online 权限逻辑的安全与上下文疑虑。
- #1394：skill-creator eval-viewer 存在属性级 XSS 注入风险。
🔗 https://github.com/anthropics/skills/issues/492

**🏢 企业级协作与分发**
- #228（8 👍）：期待在 Claude.ai 内实现 org-wide 技能共享，取代"下载文件→Slack 传递→手动上传"的笨拙流程。
- #189：`document-skills` 与 `example-skills` 插件内容重复，安装后造成上下文窗口浪费。
🔗 https://github.com/anthropics/skills/issues/228

**🛠️ Skill 工具链可靠性（开发者核心痛点）**
- #556：`run_eval.py` 的 `claude -p` 模式下技能触发率为 0%，评测机制形同虚设。
- #1383、#1390：skill-creator 静默 benchmark 失败、mcp-builder 评测全 0/N 等"隐性故障"。
- #62：用户自建 12 个技能突然全部消失的数据丢失类问题。
🔗 https://github.com/anthropics/skills/issues/556

**🐘 上下文窗口效率**
- #1487：`claude-api` 技能一次调用即注入约 156k tokens，直接耗尽上下文窗口。
- #1329：提出 `compact-memory` 技能，用符号化表示压缩长期运行 agent 的持久记忆。
🔗 https://github.com/anthropics/skills/issues/1487

**🧭 新方向探索**
- Agent 治理模式（#412）、推理质量门禁流水线（#1385，预校准→对抗审查→交付验证）、HPC 集群运维（#1615）等提案，显示出社区向"AI 系统自身治理"与"专业垂直领域"两个方向的延伸兴趣。

---

## 3. 高潜力待合并 Skills

以下 PR 评论活跃、持续更新，且与社区需求高度契合，近期落地可能性较高：

**#525 pyxel**（3月发起，9月仍在更新）— 游戏开发类标杆，生命周期长、维护活跃。
🔗 https://github.com/anthropics/skills/pull/525

**#822 AWT**（3月发起，9月更新）— E2E 测试自动化，契合"AI 驱动测试"热点。

---

# Claude Code 社区动态日报 — 2026-09-28

## 今日速览

过去 24 小时无新版本发布，社区讨论集中在 **Cowork 桌面端回归**（文件选择器被合并菜单替换、设备文件写入静默滞后）与 **Windows 平台的多处功能性 bug**（认证 OAuth 403、Bash 工具反斜杠被吞、斜杠命令选择器不弹出）。今日唯一 PR 聚焦安全默认策略，限制个人插件篡改组织收集器记录。整体来看，用户对桌面向（Desktop/Cowork）与 MCP 生态稳定性的反馈最为密集。

## 社区热点 Issues
> 依据评论数、👍 数及影响面，精选 10 条值得关注的问题

### 1. Cowork: 新建项目丢失"Choose a folder" — 合并后 UI 回归 [🔥 35 评论 / 28 👍]
**#76694** — 在 Chat/Cowork 合并后，新建项目的右键上下文菜单被替换为 Chat 风格的上传式知识菜单，原有"选择文件夹"入口消失。作为当前最高赞 issue，反映了桌面端合并功能时的 UX 设计割裂问题。
🔗 https://github.com/anthropics/claude-code/issues/76694

### 2. Cowork: 设备文件写入"滞后一个版本" — 静默陈旧写入 [15 评论]
**#93482** — `device_commit_files` 在覆盖写入时报告成功，但磁盘内容始终落后一个提交（mtime 刷新但内容陈旧）。属于典型的数据一致性缺陷，用户可能基于错误文件内容继续开发。
🔗 https://github.com/anthropics/claude-code/issues/93482

### 3. 斜杠命令选择器：非首字符 "/" 不弹出，但提交后命令照常执行 [15 评论]
**#89398** — Windows 桌面端，只要 "/" 不是 composer 首个字符，自动补全选择器就不出现；但用户手动提交后命令仍会执行——造成"看不到即不知道"的操作困惑。
🔗 https://github.com/anthropics/claude-code/issues/89398

### 4. `/model opusplan` 突然报 "Unsupported model" [12 👍 / 7 评论]
**#92007** — 该模型此前已正常工作数月，2026-09-04 起在 Windows 桌面端突然不可用，且无清晰错误指引。高赞说明模型切换的可用性回归对用户工作流影响显著。
🔗 https://github.com/anthropics/claude-code/issues/92007

### 5. 桌面全局 "Auto-fix CI" 开关从未真正生效 [8 👍]
**#68083** — macOS 桌面端对 PR 的 "Auto-fix CI and address comments" 全局开关，既不作用于本地 `gh` 创建的 PR，也未被持久化进 `claude_desktop_config.json`，用户要求该行为跨入口保持一致。
🔗 https://github.com/anthropics/claude-code/issues/68083

### 6. macOS: Turn 永久空闲 — 事件循环卡死在 kevent64 [4 评论]
**#94252** — 2.1.268 ~ 2.1.283 多个版本上，turn 在无任何报错的情况下进入永久 idle（kevent64 空转），疑似 dropped tool_result / 卡住的 compaction / 排队输入未消费。涉及 Bedrock API 与 agents 路径，是极难排查的"静默死锁"类问题。
🔗 https://github.com/anthropics/claude-code/issues/94252

### 7. UserPromptSubmit 钩子收到"系统注入"消息 — 无法与真实输入区分 [安全风险]
**#94675** — 跨会话 SendMessage、subagent 完成通知、循环唤醒、compact 延续等系统级消息都会触发 `UserPromptSubmit` 钩子，但 payload 缺少 `prompt_source`/`is_meta` 字段，钩子无法识别来源。这为提示注入攻击留下了可利用面。
🔗 https://github.com/anthropics/claude-code/issues/94675

### 8. Windows: `claude auth login` 与 `setup-token` 均遇 OAuth 403 [3 评论]
**#93967** — 错误信息为 "missing user:profile scope"，但 Claude Desktop 登录正常。说明 CLI/Desktop 在 Windows 上的认证链路存在环境差异。
🔗 https://github.com/anthropics/claude-code/issues/93967

### 9. SendMessage 返回 `{"success":true}` 但消息实际未送达 [3 评论]
**#89938** — 长驻会话实例"双向变聋"：发送方收到成功回执，接收方却从未收到消息；同时 bridge 指针失效导致 host 显示 "Connected" 但 worker 为 0。Agent 间通信的可靠性问题值得关注。
🔗 https://github.com/anthropics/claude-code/issues/89938

### 10. Linux Cowork: 云会话永远无法链接到本机 [重新打开旧问题]
**#97685** — 错误提示 `device not registered (no row-PK)`，原因是 Linux 上未实现 enclave key；用户重新打开了此前已被关闭的 #79232 / #77348。平台能力不对等持续影响 Linux 桌面用户。
🔗 https://github.com/anthropics/claude-code/issues/97685

## 重要 PR 进展

> 过去 24 小时仅 1 个 PR 被更新/创建。与日常高峰相比 PR 活动较少。

### #97688 sec-default：收集器记录越过用户层持续写入 [安全策略]
**作者** @poteat | 创建 2026-09-27

当组织启用 `sec-default` 后，个人插件将无法再删除或重写发送至收集器的记录——`telemetry.log` 收集器流现在会像 `classic.*` 和 `settings.read` 一样持续记录到用户层之后，组织自定义的 `prepend`/`append` 逻辑得到保障。这是对组织级安全审计链路的加固，防止插件层篡改遥测数据。
🔗 https://github.com/anthropics/claude-code/pull/97688

## 功能需求趋势
> 从 issue 标签与讨论内容中提炼社区最关注的方向

1. **Cowork / Desktop 体验一致性**：合并后的 UI 回归（#76694）、设备写入滞后（#93482）、Linux 平台缺失（#97685）、Dispatch 无法访问本地会话（#94399）——桌面端是全社区最大的抱怨集中地。
2. **MCP 生态稳定性**：VS Code 中插件 MCP 被同 URL 的 claude.ai connector 静默丢弃（#97677）、MCP 协议 2026-07-28 版对可选 cache 字段的兼容问题（#88128）、`--channels` 长期驻留时的插件 MCP 反复被杀（#97701）——MCP 服务器生命周期与协议健壮性是次高热度。
3. **Windows 平台补齐**：认证失败（#93967）、Bash 工具反斜杠被半减（#97409）、斜杠命令选择器不弹（#89398）等，Windows 用户正集中提交平台差异 bug，期望与 macOS 体验对齐。
4. **钩子系统安全与可靠性**：UserPromptSubmit 被系统消息触发（#94675）、cwd 变更钩子失灵（#97716）、`/clear` 后 systemMessage 不渲染（#96699）——钩子作为自动化核心，其触发语义与安全边界亟需明确。
5. **会话连续性与成本控制**：Compaction 后技能清单丢失（#82017）、多终端 resume 意外 fork（#80427）、长会话后台 API 活动激增 30 倍（#97218）——用户对会话生命周期管理和成本透明度变得敏感。

## 开发者关注点
> 开发者反馈中的痛点和共性诉求

- **数据一致性不可妥协**：多起"报告成功但实际内容不对"的问题（#93482、#89938、#94252）让开发者对工具的静默失败零容忍，要求失败时给出明确错误而非假成功。
- **Windows 是"二等公民"**：本轮 30 条热门 issue 中约三分之一为 Windows-specific，覆盖认证、路径转义、UI 渲染、MCP 等基础链路，开发者的不满正在累积。
- **桌面端功能合并需更谨慎**：Chat/Cowork 合并后引入的回归（#76694）与长期不生效的全局开关（#68083）表明，功能整合流程缺少充分的跨平台回归测试。
- **模型可用性回归影响信任**：`/model opusplan` 突然失效这类问题虽修复成本不高，但对"生产环境可用性"的信号打击很大（12 👍）。
- **安全边界需要显式化**：钩子无法区分真实用户输入与系统注入（#94675）、插件可能篡改收集器（PR #97688）——开发者希望平台能提供显式的来源标记与强制策略，而非依赖"惯例"。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-28

## 今日速览

今日社区焦点集中在 **Windows 与 Linux 桌面端的稳定性问题**：大量 Issue 报告控制台弹窗、启动卡死、沙箱初始化失败等问题，同时官方在 24 小时内密集发布 6 个 Rust alpha 版本，并合并了多项围绕 TUI、MCP 和 Windows 沙箱的修复 PR。此外，MCP 认证竞争条件与 Linux Electron 的 SIGCHLD 异常成为开发者讨论的新热点。

## 版本发布

过去 24 小时共发布 6 个 Rust alpha 预发布版本，具体如下：

- [`rust-v0.158.0-alpha.15.4`](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.15.4)
- [`rust-v0.159.0-alpha.9`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.9)
- [`rust-v0.159.0-alpha.8`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.8)
- [`rust-v0.159.0-alpha.11`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.11)
- [`rust-v0.159.0-alpha.10`](https://github.com/openai/codex/releases/tag/rust-v0.159.0-alpha.10)
- [`rust-v0.158.0-alpha.15.3`](https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.15.3)

均为 alpha 预发布版，具体变更未在 Release notes 中详细说明。结合当日合并的 PR，这些版本可能包含 TUI 渲染、Windows 沙箱启动和 MCP 协议相关的修复，建议生产环境用户等待稳定版。

## 社区热点 Issues

以下选取 10 个最受关注的 Issue：

### 1. [Linux Desktop: Electron 运行时用空函数替换 libuv 的 SIGCHLD handler，导致子进程无法回收](https://github.com/openai/codex/issues/48554)
- 作者: @axusnetworks | 更新: 2026-09-28 | 评论: 23 | 👍: 13
- 影响面广：所有依赖子进程的功能（shell、Git 检测）都可能超时挂起。社区反应强烈，用户已定位到 Electron 行为与 libuv 的冲突，属于底层运行时问题。

### 2. [Windows 上无法启动 Codex CLI](https://github.com/openai/codex/issues/48016)
- 作者: @panchen451161722 | 更新: 2026-09-28 | 评论: 32 | 👍: 18
- 已关闭，但评论数高、点赞多，说明影响大量 Windows 用户。CLI 0.157.0 在 Windows 环境存在启动故障，目前需回退版本。

### 3. [macOS 14.2: sandbox 启动失败，报 unbound variable TIOCSTI](https://github.com/openai/codex/issues/45119)
- 作者: @bibryam | 更新: 2026-09-28 | 评论: 33 | 👍: 0
- 评论数最多，且作者检查过上游 main 仍存在该问题，属于持续未解决的环境兼容性 Bug。

### 4. [Windows: CLI 0.155.0 沙箱初始化在运行时路径验证阶段回归](https://github.com/openai/codex/issues/46388)
- 作者: @TomatoFiredEggs | 更新: 2026-09-28 | 评论: 20 | 👍: 3
- 升级 0.155.0 后失败，0.154.0 正常，明确为回归问题，与 Windows 沙箱权限路径相关。

### 5. [Linux Desktop 26.924.20706 加载已有聊天时挂起，回滚 26.917.71314 可修复](https://github.com/openai/codex/issues/48345)
- 作者: @Seekerzero | 更新: 2026-09-28 | 评论: 11 | 👍: 5
- 与 #48535、#48602 同属 Linux 桌面版 26.924 系列问题，用户在多个版本上遇到 UI 无法加载聊天列表，社区已通过回滚作为临时方案。

### 6. [Windows: Codex 启动或后台任务时出现外部控制台窗口](https://github.com/openai/codex/issues/48039)
- 作者: @aggnplz | 更新: 2026-09-28 | 评论: 14 | 👍: 9
- 自最近更新后，Windows 用户频繁看到额外控制台窗口，影响使用体验。此类问题在 #48090、#44768、#48325 等多个 Issue 中被反复报告，成为 Windows 平台最大痛点。

### 7. [Windows 应用反复执行 git ls-files，导致 ntfs.sys 非分页池持续增长](https://github.com/openai/codex/issues/16786)
- 作者: @4ndrxxs | 更新: 2026-09-28 | 评论: 17 | 👍: 4
- 长期存在的性能 Bug：git 命令循环触发，最终导致系统内存耗尽。社区要求增加去重和背压机制。

### 8. [request_user_input_async 问题卡片在 turn 结束时被自动关闭，问题无法回答](https://github.com/openai/codex/issues/43803)
- 作者: @ZhangWen-Leo | 更新: 2026-09-28 | 评论: 11 | 👍: 8
- 涉及交互关键路径：模型询问澄清问题时，UI 自动 dismiss 导致用户无法输入。好评高，说明需求强烈。

### 9. [Windows 11: 内置 codex_apps MCP 在启动时 HTTP request failed](https://github.com/openai/codex/issues/48835)
- 作者: @NoiZgitManager | 更新: 2026-09-28 | 评论: 4
- 今日最新 Issue，与 MCP 集成相关。codex_apps 无法初始化，`codex doctor` 报错，影响 Windows 上的 MCP 功能。

### 10. [MCP OAuth: 并发进程竞争刷新令牌轮换，下次启动触发 invalid_grant 要求重新登录](https://github.com/openai/codex/issues/48507)
- 作者: @mrjw717 | 更新: 2026-09-28 | 评论: 2
- 多进程环境下 OAuth 凭据文件存在竞争条件，导致所有远程 MCP 服务器频繁要求重新认证，对自动化工作流影响大。

## 重要 PR 进展

筛选出 10 个值得关注的 PR：

### 1. [Wait briefly for the Windows sandbox provisioning service to start](https://github.com/openai/codex/pull/48829)
- 修复 Windows 沙箱服务启动时序问题：在等待完整 provisioning 超时前，最多轮询 5 秒等待服务启动，提升桌面端就绪检查的响应速度。

### 2. [Allow archiving threads before their first turn](https://github.com/openai/codex/pull/48828)
- 允许在首次对话前归档新线程，修复了缺少 rollout 导致的归档失败问题，优化线程管理流程。

### 3. [Keep voice RTP timestamps aligned to 20 ms packets](https://github.com/openai/codex/pull/48824)
- 修复语音模式下 RTP 时间戳漂移问题，保证接收方能够正确组装固定长度音频帧，提升语音交互稳定性。

### 4. [Preserve punctuation and semicolons in Mermaid labels](https://github.com/openai/codex/pull/48814)
- 改进 Mermaid 图表渲染：不再因标签中的分号或特殊字符而错误切分语句，支持更复杂的图表文本。

### 5. [Add history-aware prewarming for idle threads](https://github.com/openai/codex/pull/48812)
- 为空闲线程增加“带历史预热”机制，可

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-28

## 1. 今日速览

今日最核心的动态集中在 **Agent 子代理稳定性** 与 **权限/安全策略** 两条主线上：多个 P1 级 Bug（子代理超时误报成功、通用代理挂起、策略引擎阻断所有工具）仍在发酵并获得大量开发者关注；同时，模型版本显式 ID 被静默改写、配额错误分类等一批修复 PR 正在推进中。此外，夜间版 v0.63.0-nightly.20260928 已自动发布。

## 2. 版本发布

**v0.63.0-nightly.20260928.g2fe7c2d3f**（nightly）
- 自动化 nightly 版本，无独立更新说明。
- 完整变更对比：[v0.63.0-nightly.20260926...v0.63.0-nightly.20260928](https://github.com/google-gemini/gemini-cli/compare/v0.63.0-nightly.20260926.g2fe7c2d3f...v0.63.0-nightly.20260928.g2fe7c2d3f)

## 3. 社区热点 Issues

以下 10 个 Issue 综合了评论热度、优先级与影响面，值得重点关注：

**🔴 Agent 稳定性（P1）**

1. **[#22323] Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功**
   - 现象：子代理明明因达到最大轮数中断，却被报告为 `status: "success"` / `Termination Reason: "GOAL"`，掩盖了真实的中断原因。
   - 作者/评论：@matei-anghel | 13 条评论 | 👍 2
   - 关注点：Agent 可观测性与状态报告准确性，直接影响自动化链路对执行结果的判断。
   - https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#21409] Generalist agent 无限挂起**
   - 现象：CLI 一旦委托给 generalist agent 就永久卡死，连建文件夹这类简单操作也会挂起（用户最多等过 1 小时）；仅当指示模型不委托子代理时才恢复正常。
   - 作者/评论：@turmanticant | 8 条评论 | 👍 8
   - 关注点：高赞用户痛点，核心 Agent 调度可靠性问题。
   - https://github.com/google-gemini/gemini-cli/issues/21409

3. **[#22186] get-shit-done 输出钩子导致崩溃**
   - 现象：get-shit-done 输出即将完成（打印用户摘要）时，多次触发 CLI 崩溃。
   - 作者/评论：@businesscasual98 | 3 条评论
   - 关注点：输出处理相关的稳定性缺陷，影响关键工作流完成阶段。
   - https://github.com/google-gemini/gemini-cli/issues/22186

**🔴 安全与权限（P1）**

4. **[#25283] OAuth/策略错误：“Tool execution denied by policy” 阻断所有工具调用**
   - 现象：CLI 持续抛出策略拒绝错误，导致文件读写、Shell 命令等基本 I/O 操作全部不可用。这是当前获得 👍 最多（9）的 Issue 之一。
   - 作者/评论：@r4m0np | 7 条评论 | 👍 9
   - 关注点：安全策略引擎的误伤问题，直接影响所有用户的正常使用。
   - https://github.com/google-gemini/gemini-cli/issues/25283

**🔴 跨平台兼容（P1）**

5. **[#21983] Browser 子代理在 Wayland 下失败**
   - 现象：在 Wayland 环境下运行 Browser 子代理直接失败。
   - 作者/评论：@sigmaSd | 4 条评论 | 👍 1
   - 关注点：Linux 桌面端跨平台兼容性缺失，限制了一部分用户使用浏览器代理能力。
   - https://github.com/google-gemini/gemini-cli/issues/21983

**🟠 调试与可观测性（P1）**

6. **[#21763] Bugreport 不包含子代理上下文**
   - 现象：`/bug` 生成的报告只包含主会话，没有子代理内部执行内容，导致这类报告难以排查 Agent 问题。
   - 作者/评论：@rkj | 2 条评论
   - 关注点：子代理过程对排障不可见，是 Agent 可调试性的关键缺口。
   - https://github.com/google-gemini/gemini-cli/issues/21763

**🟠 Agent 行为与配置（P2）**

7. **[#21968] Gemini 不会主动使用 skills 和子代理**
   - 现象：社区反馈 Gemini 基本不会自主调用自定义 skills 和子代理，只有用户明确指示才会使用。例如配置了 gradle/git skills 描述，模型做相关任务时也不主动触发。
   - 作者/评论：@rnett | 6 条评论
   - 关注点：Agent 自主性不足，影响自定义扩展能力价值的发挥。
   - https://github.com/google-gemini/gemini-cli/issues/21968

8. **[#22745] AST 感知的文件读取/搜索/代码库映射影响评估**
   - 现象：这是一个 EPIC（追踪多个子调查），评估是否值得引入 AST 感知的文件工具，从而精确读取方法边界、减少 token 噪声、改进导航。
   - 作者/评论：@gundermanc | 7 条评论 | 👍 1
   - 关注点：代码库理解能力的长期演进方向，社区讨论活跃。
   - https://github.com/google-gemini/gemini-cli/issues/22745

9. **[#22267] Browser Agent 忽略 settings.json 覆盖配置**
   - 现象：Browser Agent 完全无视全局/项目级 `settings.json` 中的配置覆盖（如 `maxTurns`），虽然 AgentRegistry 初始化时正确读取了配置，但实际执行时未生效。
   - 作者/评论：@hsm207 | 4 条评论
   - 关注点：配置系统存在分支遗漏，影响用户对 Agent 行为粒度的控制。
   - https://github.com/google-gemini/gemini-cli/issues/22267

**🟠 终端体验（P2，已关闭）**

10. **[#29295] 终端快速输入/加载动画时严重闪烁与撕裂**
    - 现象：快速打字或后台子代理 spinner 激活时，终端出现强烈闪烁和撕裂。
    - 作者/评论：@buraga-kyo | 4 条评论 | 👍 1（已关闭）
    - 关注点：TUI 渲染性能问题，是高频用户体感痛点。
    - https://github.com/google-gemini/gemini-cli/issues/29295

## 4. 重要 PR 进展

以下 10 个 PR 按优先级与影响面排序：

1. **[#29532] 修复 RetryInfo 延迟为 0 时的配额错误分类**（size/m，今日新建）
   - 服务端返回 `RetryInfo` 延迟为 0（立即重试）的限流请求，原逻辑会误判为终止性配额错误，错误触发模型降级/扣费流程。
   - 作者：@Linxiushen
   - https://github.com/google-gemini/gemini-cli/pull/29532

2. **[#29527] 确保请求内容不以模型回合结束**（P1，size/m）
   - 修复 `/rewind`、流中断等场景下历史记录以模型回合结尾导致的 `400 Bad Request` 错误。
   - 作者：@asieveking | Fixes #29530
   - https://github.com/google-gemini/gemini-cli/pull/29527

3. **[#29528] 修复 headless 模式下文件夹信任状态传播**（P1，size/m）
   - 修复 headless 模式下 `useFolderTrust` 即使工作区未信任也向上层无条件上报 `onTrustChange(true)`，造成“脑裂”状态的问题。
   - 作者：@amelidev
   - https://github.com/google-gemini/gemini-cli/pull/29528

4. **[#29429] 配额错误时展示服务端返回的限制与重置时间**（P1，area/enterprise，size/l)
   - 读取 Cloud Code API `RESOURCE_EXHAUSTED` 错误中的 `quotaResetTimeStamp`、`uiMessage` 等元数据，让企业用户看到具体限额定和重置窗口，而不是笼统报错。
   - 作者：@sabhishek13-py | Fixes #29425
   - https://github.com/google-gemini/gemini-cli/pull/29429

5. **[#29420] 保留显式 Gemini 3 Pro Preview 模型 ID**（P2，size/m）
   - 修复启用 3.1 灰度时，用户显式指定的 `--model gemini-3-pro-preview` 被静默改写成 `gemini-3.1-pro-preview` 的问题。只有 `auto`/`pro` 别名应跟随灰度。
   - 作者：@FanouZeng-TT
   - https://github.com/google-gemini/gemini-cli/pull/29420

6. **[#29422] 保留显式版本化模型 ID（跨模型解析）**（P2，size/m）
   - 同类问题扩展：显式 `gemini-3-pro-preview`、`gemini-2.5-flash` 等版本化 ID 在灰度晋升期间不能被静默重映射，避免 Vertex AI 上 3.5 Flash 不可用等故障。
   - 作者：@Pcmhacker

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-28）

## 今日速览

今日发布 v1.0.89-5，重点优化交互表单聚焦行为、新增 Claude Code 规则文件支持，并为侧边栏会话增加未读状态提示。社区讨论热点集中在交互模式权限白名单、可配置系统提示、BYOK 模型切换等长期诉求；同时，桌面应用会话认证失效与 MCP 连接稳定性问题成为新的关注焦点。

## 版本发布

### v1.0.89-5

**Added**
- 左键点击受支持的 `ask_user` 和表单输入组件时，可聚焦并将光标置于点击位置。
- 支持将 `.claude/rules` 下的 Claude Code 规则文件作为自定义指令加载。
- 侧边栏会话在完成一轮且用户未打开时显示蓝点。

## 社区热点 Issues（10 个）

按讨论热度、点赞数与影响面选取：

1. **交互模式工具白名单** [#1973](https://github.com/github/copilot-cli/issues/1973)
   - 开放，评论 13，👍 29
   - 用户希望为只读操作（grep、cat、find、git log 等）配置自动放行，避免每次手动审批；而 `/allow-all` 会连带放行危险操作。社区高度认可，是权限模型的核心诉求。

2. **支持取消或移除已排队消息** [#1857](https://github.com/github/copilot-cli/issues/1857)
   - 开放，评论 12，👍 29
   - 通过 `Ctrl+Q` / `Ctrl+Enter` 排队后无法撤销，代理忙碌时只能干等。高频交互痛点，评论区讨论活跃。

3. **进程内 auth token 停止刷新，所有提示失败** [#4929](https://github.com/github/copilot-cli/issues/4929)
   - 开放（triage），评论 7
   - 长时间运行的 CLI 进程会永久丢失认证，`/login` 无法恢复，必须重启。严重影响长会话使用，新近上报，需紧急关注。

4. **`/model` 支持多模型与 BYOK/本地 provider 切换** [#3709](https://github.com/github/copilot-cli/issues/3709)
   - 开放，评论 8，👍 33
   - BYOK 模式被 `COPILOT_MODEL` 固定，`/model` 选择器不显示本地模型。社区对灵活切换模型的需求强烈。

5. **桌面应用会话数分钟后死亡，凭证注册失效** [#4905](https://github.com/github/copilot-cli/issues/4905)
   - 开放，评论 6，👍 4
   - 桌面 app 1.1.22 中启动的会话很快失效，导致 MCP catalog 陈旧且致命。涉及桌面端与 CLI 的集成稳定性。

6. **可配置系统提示，降低固定 token 开销** [#2627](https://github.com/github/copilot-cli/issues/2627)
   - 开放，评论 6，👍 21
   - 系统提示在会话开始时即消耗约 20.5K token，用户希望裁减不需要的指令与工具定义，以提升上下文利用效率。

7. **内置

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-28

## 今日速览

昨日无新版本发布，但社区修复与讨论活跃度较高：核心 Issue 聚焦于 TUI 上下文压缩过早触发、macOS 高负载下系统冻结、Windows 平台工具调用报错等稳定性问题；PR 侧则有多项针对 TUI 链接行为、MCP 传输健壮性、会话唤醒重试的修复提交，其中 `@Veld101` 连续提交了 MCP 与模型输出异常处理的两个修复。此外，models.dev 模型目录失效问题（#51739）引发关注，或影响大量依赖外部 provider 的用户。

---

## 社区热点 Issues

挑选了 10 个最值得关注的 Issue，覆盖崩溃、功能异常、兼容性等维度：

**1. Agent 执行约 30 秒后自动停止，需手动恢复**
[#38766 · OPEN](https://github.com/anomalyco/opencode/issues/38766) — 作者 @youtsuhodev | 评论 5 | 👍 1
用户反馈所有任务在启动约 30 秒后无错误地中断执行，必须手动干预才能继续，严重影响自动化流程。该问题仍处于打开状态，复现率高。

**2. TUI 上下文压缩在用量仅 30–35% 时过早触发**
[#38851 · CLOSED](https://github.com/anomalyco/opencode/issues/38851) — 作者 @magoz | 评论 6 | 👍 2
使用 `gpt-5.6-sol` 时，上下文指示器仅到 30–35% 便触发自动压缩，浪费大量可用上下文窗口。社区对压缩策略的保守程度提出质疑。

**3. macOS/Linux 进程名泄漏 `.exe` 后缀**
[#28639 · CLOSED](https://github.com/anomalyco/opencode/issues/28639) — 作者 @tim-hilde | 评论 5 | 👍 3
npm 包将二进制命名为 `opencode.exe`，导致 macOS/Linux 上进程名带着 `.exe` 后缀，污染 tmux 窗口标题等场景。已关闭但获得较高点赞，说明影响面不小。

**4. deepseek-v4-flash-free 在每次工具调用后中断 Agent 循环**
[#39204 · CLOSED](https://github.com/anomalyco/opencode/issues/39204) — 作者 @BookCatKid | 评论 3 | 👍 4
使用该免费模型时，`read`、`grep`、`todowrite` 等工具调用后 Agent 频繁停止，需手动输入 `continue` 恢复。点赞数 4，是今日最高，反映免费模型用户的普遍痛点。

**5. Mac M4 多会话高负载下系统完全冻结**
[#39292 · CLOSED](https://github.com/anomalyco/opencode/issues/39292) — 作者 @yiliang114 | 评论 2 | 👍 1
同时运行多个会话时，整个系统频繁死机，只能强制关机。属于影响极大的稳定性问题，提请注意多会话场景的资源管理。

**6. 1.18.9 在 Windows 上所有多参数工具报 SchemaError**
[#39600 · CLOSED](https://github.com/anomalyco/opencode/issues/39600) — 作者 @udd225 | 评论 3 | 👍 0
`bash`、`write`、`glob` 等所有多参数工具在 Windows 上均报 `SchemaError: Missing key`，重启无法解决。需升级到更新版本修复，Windows 用户需留意。

**7. WAL 数据库文件在 macOS 上膨胀至 1GB+**
[#39463 · CLOSED](https://github.com/anomalyco/opencode/issues/39463) — 作者 @AlexApostolSource | 评论 2 | 👍 0
SQLite WAL 文件在系统临时目录无限制增长，实测达到 1.03GB，长期使用后磁盘占用问题严重。建议关注数据库文件的生命周期管理。

**8. models.dev 目录对所有外部 provider 失效**
[#51739 · CLOSED](https://github.com/anomalyco/opencode/issues/51739) — 作者 @tonmoydutta111-star | 评论 2 | 👍 0
除内置 `opencode` provider 外，`google`、`groq`、`openrouter`、`vercel` 等全部报 `Model unavailable`，即使 API Key 有效。该问题为昨日新提交，直接击穿模型生态的核心体验，值得持续关注。

**9. 删除 WSL 服务器后下次启动崩溃**
[#39071 · CLOSED](https://github.com/anomalyco/opencode/issues/39071) — 作者 @drfrangipane | 评论 3 | 👍 0
`OpenCode Desktop` 在 UI 中移除 WSL 服务器后，下次启动直接崩溃，报 `Notification server not found`，应用完全不可用。

**10. 单个响应中出现多个 `reasoning_opaque` 值**
[#51466 · OPEN](https://github.com/anomalyco/opencode/issues/51466) — 作者 @svatos-jirka | 评论 2 | 👍 0
github provider + opus 5.5 下频繁报 `multiple reasoning_opaque values received`，提示仅支持单个 thinking 部分。新提交的开放问题，涉及多 provider 推理内容解析兼容性。

---

## 重要 PR 进展

挑选 10 个代表性的 PR，涵盖 Bug 修复、新功能与文档更新：

**1. fix(core): 重试失败的会话唤醒**
[#51751 · OPEN](https://github.com/anomalyco/opencode/pull/51751) — 作者 @jlongster
若 prompt 已持久化但会话唤醒失败，该 prompt 将被永久搁置。此修复在 runner 消费 inbox 前对失败唤醒进行重试，防止任务卡死。

**2. fix(core): MCP stdio 超大帧处理不关闭传输**
[#51743 · OPEN](https://github.com/anomalyco/opencode/pull/51743) — 作者 @Veld101
本地 stdio MCP server 返回超过 ~10 MiB 消息时会直接断开连接（报 `Connection closed`）。此修复改为仅拒绝超限帧，保持传输通道存活。关闭 #51092。

**3. fix(core): 无内容的 length finish 按失败处理**
[#51741 · OPEN](https://github.com/anomalyco/opencode/pull/51741) — 作者 @Veld101
当 provider 以 `finish_reason: "length"` 结束但未流式返回任何文本、推理或工具调用时，此前会被误判为正常结束。该 PR 将其视为失败，避免静默截断。关闭 #50949。

**4. fix(tui): 修改键超链接点击交给终端处理**
[#51757 · OPEN](https://github.com/anomalyco/opencode/pull/51757) — 作者 @gszep
TUI 链接在按住修饰键或非主键点击时不再拦截，交给终端原生超链接处理器，避免打开第二个浏览器。关闭 #51756。

**5. fix(opencode): 退出前等待 stdout 写入完成**
[#46912 · OPEN](https://github.com/anomalyco/opencode/pull/46912) — 作者 @andrescera
`export`、`session list --format json`、`db --format json` 等命令在 `process.exit()` 前存在 stdout 写入未完成的问题，导致管道输出被截断。此修复确保 JSON 数据完整输出。关闭 #29330。

**6. feat(opencode): 为 `opencode web` 增加 `--no-open` 选项**
[#51736 · OPEN](https://github.com/anomalyco/opencode/pull/51736) — 作者 @Archipel
以 systemd、容器或 WSL 自启动方式运行时，`opencode web` 不再强制打开浏览器。关闭 #43636，适合服务化部署场景。

**7. fix(tui): 最近使用的模型保留在 provider 分组中**
[#45754 · CLOSED](https://github.com/anomalyco/opencode/pull/45754) — 作者 @yonisirote
模型选择器中，使用过的模型会从所属 provider 分组消失、仅出现在 Recent 中。该修复让模型在 Favorites/Recent 与 provider 分组中同时可见。关闭 #40592。

**8. fix(session-ui): 消息时间戳显示日期**
[#45590 · CLOSED](https://github.com/anomalyco/opencode/pull/45590) — 作者 @Abdul535
历史消息的时间戳此前仅显示时刻，跨天会话难以分辨。此修复补充日期显示。关闭 #44936。

**9. fix(desktop): 保留 Electron 窗口权限配置**
[#45598 · CLOSED](https://github.com/anomalyco/opencode/pull/45598) — 由 opencode-agent 提交
权限处理器此前仅对最新窗口生效，部分 Electron 安全请求被错误拒绝。此修复将权限授权扩展到所有活动主窗口，并保留通知和剪贴板的窄权限白名单。

**10. docs: 添加 Bee by HEOSSI provider 配置说明**
[#51734 · OPEN](https://github.com/anomalyco/opencode/pull/51734) — 作者 @ceocxx
补充 Bee by HEOSSI 作为 OpenAI-compatible provider 的接入文档，取代被合规流程关闭的 #44547。

---

## 功能需求趋势

从近两日 Issues 中可以提炼出以下社区关注方向：

- **安全与加密**：多个 Issue 呼吁 API Key 加密存储（#39038），以及在公开/共享环境中保护敏感凭据的能力。
- **可扩展性与插件生态**：开发者希望插件能进行隔离的模型调用（#39243）、注册 PreToolUse/Stop/SessionStart 等 Hook 事件（#39275）、以及查看后台会话的"名册"视图（#39583，该需求已反复出现多次）。
- **调试与可观测性**：#39253 提出集成 DAP（Debug Adapter Protocol）调试器，并引入 Advisor 模型辅助排查，类似于 oh-my-pi 的设计。
- **非交互/自动化场景**：`--format json` 模式应输出 `permission_asked` 事件（#39459），以及管道 JSON 输出不应被截断（#46912），表明 headless/CI 集成需求持续增长。
- **多语言与国际化**：RTL 语言（波斯语、乌尔都语等）翻译文件补全（#34697），以及 CJK 字符场景下 `@` 文件自动补全失效（#39462）均在推进中。
- **模型与 Provider 兼容性**：自定义 provider 在 subagent 上下文中不可用（#39303）、models.dev 目录失效（#51739）等问题，说明第三方模型接入稳定性是高频关注点。

---

## 开发者关注点

- **稳定性压倒一切**：最常见反馈是任务无故中断（#38766）、模型循环被意外终止（#39204）、系统级冻结（#39292）。这类问题直接破坏使用体验，建议核心团队优先排期。
- **Windows/macOS 平台差异仍然突出**：Windows 上 SchemaError（#39600）与 macOS 上 WAL 膨胀（#39463）、进程名后缀（#28639）并存，跨平台一致性仍需加强。
- **数据库与存储卫生**：会话删除后遗留旧版本孤儿行（#50260）、临时目录 WAL 文件无上限增长，用户对存储空间管理敏感。
- **上下文窗口利用不充分**：过早在 30% 处触发压缩（#38851）以及在 300k 上下文时流式失败（#39276），提示上下文管理策略需要更精细的配置化。
- **WSL/远程环境集成**：WSL server 删除后崩溃（#39071）与 Termux 通知适配（#45676），远程/移动端使用场景正逐步进入社区视野。

> 数据来源：github.com/anomalyco/opencode — 日报生成时间 2026-09-28

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Qwen Code 社区动态日报 — 2026-09-28

### 1. 今日速览

Managed Agent 双路径架构提案（#12380）进入密集落地阶段，今日多个 Stage B/D/F 子任务及配套 PR 同步推进，是当前社区最核心的议题。安全方面，aux-model 选择器凭据泄露问题（#12856）被正式标记，对应修复 PR #12862 已提交；同时 macOS 桌面右侧面板无法关闭的 UI 缺陷（#12874）已定位并修复。此外，主分支 CI 测试超时（#12882）和 nightly 发布失败（#12880）也需关注。

---

### 2. 社区热点 Issues

**#12380 — Managed Agent 双路径架构与分阶段交付提案**  
[链接](https://github.com/QwenLM/qwen-code/issues/12380)  
> 36 条评论，超过一周仍持续更新，是当前社区讨论的核心。该提案定义了 Managed Agent 的双引擎架构：保留现有 TypeScript agent loop，将模型推理与工具环境供给解耦，并为 Session 引入持久化所有权、Workspace 绑定、可恢复的工具执行与稳定 WebSocket 协议。已分解出多个 Stage 子任务（#12737、#12793、#12872 等），项目正按计划分阶段落地。

**#12826 — Webview 在 @file 引用时崩溃（0.24.6, Remote-SSH）**  
[链接](https://github.com/QwenLM/qwen-code/issues/12826)  
> P1 级别 bug，7 条评论。在 Remote-SSH 环境（Ubuntu 24.04）下，使用 @file.tsx 引用并回车后，Webview 报 "Something went wrong"，prompt 丢失。源于 CodeMirror EditorView.update 的竞态条件，直接影响远程开发用户的核心交互流程。

**#12737 — ACP Bridge Stage B：配对 Legacy 与 Managed 引擎的主机集成**  
[链接](https://github.com/QwenLM/qwen-code/issues/12737)  
> #12380 的 Stage B 后续工作（9 条评论）。在 #12698 的 ACP Bridge 双引擎构造基础上，让普通 `qwen serve` 主机真正使用该能力，是 Managed Agent 从设计走向实际可用的关键一步。

**#12856 — Aux-model 选择器持久化 NUL 分隔的 baseUrl，凭据泄漏**  
[链接](https://github.com/QwenLM/qwen-code/issues/12856)  
> 安全相关 bug（5 条评论）。`visionModel`、`imageModel`、`advisorModel`、`fastModel`、`compactionModel` 五个设置键以 `authType:<id>\0<baseUrl>` 格式持久化数据，当 baseUrl 内嵌用户凭据（如 `https://user:sk-...@host/v1`）时，该凭据会通过所有公共接口原样输出。已有对应修复 PR #12862。

**#12835 — Skill 工具被排除时，工具列表仍注入系统提示词**  
[链接](https://github.com/QwenLM/qwen-code/issues/12835)  
> Context 性能相关 bug（5 条评论）。使用 `--exclude-tools skill` 或 `--core-tools` 白名单排除 skill 后，系统事件中的工具列表虽不含 skill，但日志请求仍包含 `<system-reminder>` 开头的 skills 列表。浪费上下文窗口且有歧义。PR #12838 已提交修复。

**#12874 — macOS 右侧扩展区面板开启后无法关闭（toggle 按钮失效）**  
[链接](https://github.com/QwenLM/qwen-code/issues/12874)  
> macOS 桌面端 UI bug（4 条评论）。右侧面板（文件更改/侧边任务/网页预览/轨迹/终端）展开后，再次点击切换按钮无反应，Esc 键和拖拽分隔线均无效。分析为 toggle 状态机缺陷，展开后未正确切回收起状态。PR #12876 已修复并定位到标题栏拖拽区域的遮挡问题。

**#12859 — Runtime Broker: fastjson2 2.0.65 使负 scale 的 Decimal 持久化后无法读取**  
[链接](https://github.com/QwenLM/qwen-code/issues/12859)  
> 数据完整性 bug（4 条评论）。在 #12836 升级 fastjson2 后，broker 可接受并持久化负 scale 的 `BigDecimal`，但同一编解码器无法读回该数据。会制造新的不可读行，是 #12798（正 scale 侧）关闭后对称侧的延伸问题。

**#12844 — `qwen mcp reconnect` 在禁用统计时仍会上传 session_start 事件**  
[链接](https://github.com/QwenLM/qwen-code/issues/12844)  
> 数据隐私 bug（4 条评论）。即使设置 `privacy.usageStatisticsEnabled: false` 或环境变量 `QWEN_USAGE_STATISTICS_ENABLED=0`，`mcp reconnect` 仍会上传 `session_start` 事件到 RUM 端点。违反了用户的显式隐私设置。

**#12793 — Managed Agent Stage D：公共 API 契约、DTO 与事件回放**  
[链接](https://github.com/QwenLM/qwen-code/issues/12793)  
> 架构进展（5 条评论）。将已评审的 OpenAPI 作为仓库内契约，包含生成或验证的 DTO、Session 查询与事件回放，并锁定两项文档版本（`684f3c368`）。为 Managed Agent 的对外接口提供标准化的技术基础。

**#12853 — memory 模块 #10183 的非阻塞 Review 债务跟踪**  
[链接](https://github.com/QwenLM/qwen-code/issues/12853)  
> 工程质量（5 条评论）。PR #10183 已超过五轮 review，项目按政策将正确性/安全/数据丢失/回归之外的非阻塞问题单独跟踪，确保主 PR 可以收敛同时不丢失 review 记录。反映了项目对代码评审质量的制度化承诺。

---

### 3. 重要 PR 进展

**#12545 — 修复：从无 Skill 工具策略的子代理中收回 SkillManager**  
[链接](https://github.com/QwenLM/qwen-code/pull/12545)  
> 子代理的工具策略不允许 Skill 工具时（显式 `tools` 列表不含 `skill`，或 `disallowedTools` 指定），不再持有会话的 SkillManager。嵌套 Agent 工具的 bundled-reference 路由退回 `inline`，避免子代理获得非预期的能力。

**#12869 — feat(managed-agent)：可信本地重启后恢复 Workspace 持有者（W0e-3）**  
[链接](https://github.com/QwenLM/qwen-code/pull/12869)  
> 为 Linux 主机重启后的可信本地 Runtime 工作负载增加恢复能力。恢复观察保存的 generation，对丢失的执行结果保留不确定性，只清理原 Workspace 存储持有者并在恢复后退役该 generation。

**#12865 — feat(managed-agent)：采用持久的本地 Runtime worker**  
[链接](https://github.com/QwenLM/qwen-code/pull/12865)  
> 在 Linux 上支持显式开启的持久化本地 worker 注册与采用。Broker 重启后通过保存的 seed 和完整的主机/启动/命名空间/内核进程身份，恢复原 worker 和执行日志，启动记录以原子方式私有持久化。

**#12862 — 修复：清除 aux-model 选择器出口中的用户信息凭据**  
[链接](https://github.com/QwenLM/qwen-code/pull/12862)  
> 对应 #12856 的修复。辅助模型设置（`visionModel`、`imageModel`、`advisorModel`、`fastModel`、`compactionModel`）以 `authType:id\0baseUrl` 持久化数据，当 baseUrl 内嵌用户凭据时，该 PR 确保所有公共出口（CLI、API、日志等）在输出前清除用户信息部分。

**#12884 — 修复(node-repl)：在 runner 负载下加宽 bounded-cancellation 测试边界**  
[链接](https://github.com/QwenLM/qwen-code/pull/12884)  
> 对应 #12882 CI 失败。将 host 驱动的 exec 超时从 200ms 加到 2000ms，参数化测试预算从 10s 加到 20s，消除高负载 runner 下的时序抖动。无产品代码变更。

**#12833 — feat(desktop)：桌面发布矩阵新增 linux-aarch64 条目**  
[链接](https://github.com/QwenLM/qwen-code/pull/12833)  
> 新增 ARM64 Linux 构建，`desktop-latest.json` 将包含 `linux-aarch64` 条目，发布 arm64 AppImage 和 deb，补齐对 ARM 平台的支持。

**#12838 — 修复(core)：Skill 工具未注册时跳过 skills 列表注入**  
[链接](https://github.com/QwenLM/qwen-code/pull/12838)  
> 对应 #12835 的修复。当 Skill 工具被排除（`--exclude-tools skill` 或 `--core-tools` 白名单不含 skill），启动 prelude 不再注入 `<available_skills>` 列表，也不再发送 `No skills are currently available.` 的兜底提示。

**#12848 — feat(serve)：托管前台 Shell 交互（gated Hosted foreground Shell turns）**  
[链接](https://github.com/QwenLM/qwen-code/pull/12848)  
> 在 private Hosted Workspace loop 中增加前台 Shell 能力，基于 `hosted-workspace-shell/1` 契约。包含现有文件工具，在保存的 Workspace 中执行命令，完整 stdout/stderr 存于 SQL Session Store，并给模型一个边界化的交互视图。

**#12876 — 修复(web-shell)：macOS 标题栏拖拽区域遮挡右侧面板关闭按钮**  
[链接](https://github.com/QwenLM/qwen-code/pull/12876)  
> 对应 #12874 的修复。根因是 macOS Desktop shell 中，右侧面板的关闭按钮被标题栏拖拽区域覆盖，导致点击失效。通过 inset 布局将面板按钮移出拖拽区域，解决 toggle 无法关闭的问题。

**#12773 — 修复(cli)：将 fast model 固定到所选 provider 端点**  
[链接](https://github.com/QwenLM/qwen-code/pull/12773)  
> 当同一 model id 在多个 provider 下配置（如 Standard key 和 Token Plan key 都走 openai 协议），选择 fast model 时固定精确的 provider 端点，避免选取最先注册的条目。模型选择器将选择持久化为 `authType:id\0baseUrl` 格式（与 #12856 相关）。

---

### 4. 功能需求趋势

从 Issue 与 PR 数据来看，社区最关注以下功能方向：

- **Managed Agent 多引擎架构（持续升温）**：以 #12380 为核心，围绕双引擎（Legacy + Managed）的架构定义、Stage B 主机集成（#12737）、公共 API 契约（#12793）、故障门测试（#12872、#12873）持续推进，是本阶段项目明确的战略重心。

- **Runtime Broker 的持久化与恢复能力**：Broker 重启后的 worker 采用（#12766、PR #12865）、主机重启后的 Workspace 恢复（PR #12869）、执行丢失的终态语义（#12670、PR #12839）等 Issue/PR 密集出现，说明社区对运行时可靠性的要求正在提升。

- **凭据安全与隐私保护**：aux-model 设置中的 baseUrl 凭据泄露（#12856）、禁用统计后仍上报数据（#12844）、NO_PROXY 实现与 undici 语法一致性（#12852），均涉及安全/隐私的敏感面，是开发者重点关注的方向。

- **上下文窗口的精细化管理**：Skill 列表在排除后仍被注入（#12835）、Auto Memory 的结构化召回与无损迁移（#10151）等，表明开发者希望在更小的上下文开销下获得更精准的提示。

- **平台与安装体验扩展**：Linux ARM64 桌面矩阵（#12833）、cua-sdk 下载时支持代理配置（#12829）、安装更新流程中的边角问题（#12802），显示了社区对多平台支持与安装链路健壮性的持续诉求。

- **LLM 工具链兼容性**：Ollama 对零参数工具拒绝请求（#12878，因 parameters 字段缺失）、fast model 多 provider 固定（#12773），反映了模型切换与第三方服务兼容是实际使用中的高频痛点。

---

### 5. 开发者关注点

- **

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*