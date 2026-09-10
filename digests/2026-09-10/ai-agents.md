# OpenClaw 生态日报 2026-09-10

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-10 01:57 UTC

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

# OpenClaw 项目动态日报 — 2026-09-10

## 1. 今日速览

OpenClaw 项目在过去 24 小时保持极高的活跃度：累计 500 条 Issue 更新（310 条新开/活跃，190 条关闭）和 500 条 PR 更新（272 条待合并，228 条已合并/关闭）。核心开发方向集中在 **Codex OAuth/Appserver 会话稳定性**、**memory-core 数据库增长与锁管理**、**Windows 平台回归修复**，以及 **Gateway 事件循环阻塞导致的级联故障**。P0 级 bug 中有 2 个标记为已关闭（Windows 网关启动、npm 更新卡死），但新增 1 个 2026.9.3 Doctor 迁移拒绝的回归（#142585）正在发酵。目前无新版本发布，项目处于高密度的修复/回归验证周期。

---

## 3. 项目进展

今日 228 个 PR 合入/关闭，大部分为 bug 修复与稳定性改进。以下为值得关注的在途/已合并 PR：

**关键修复 PR**
- [fix(doctor): keep saved auth profiles aligned during migration (#143429)](https://github.com/openclaw/openclaw/pull/143429) — 修复 `doctor --fix` 重命名 auth 引用后凭据/会话 pin 指向不存在账户的问题；此 PR 标记有兼容性、auth-provider、安全边界三层 merge-risk，需谨慎审阅。
- [fix(sessions): allow pinning Home-parented dashboard sessions (#143250)](https://github.com/openclaw/openclaw/pull/143250) — 解除 #140748 对 Control UI 工作会话的限制，修复根会话被误判为嵌套子级而无法 pin 的问题。
- [fix(exec): sandbox commands abort when host memory pressure kills backend launcher (#142764)](https://github.com/openclaw/openclaw/pull/142764) — 修复 Linux 主机内存压力下内核优先终止 Docker/Podman/SSH 后端启动器导致沙箱命令被切断、会话状态丢失的问题。
- [fix(ui): hide stale git update prompts after refresh (#142959)](https://github.com/openclaw/openclaw/pull/142959) — 消除刷新后仍显示“可更新 Git 安装”的陈旧提示。
- [fix(telegram): surface message cancellation reasons (#143583)](https://github.com/openclaw/openclaw/pull/143583) — 当 `message_sending` hook 主动抑制发送时，agent 不再收到误导性的通用传输错误，从而避免无效重试。

**平台/性能改进**
- [fix(memory): reuse read-only gateway search managers (#143295)](https://github.com/openclaw/openclaw/pull/143295) — 替代 #139013 的重新实现，让 Gateway 的 `memory.search` 复用 Memory Core 的可重读搜索 API，避免每次重复打开 agent 数据库。
- [fix(mac-gateway): stop discarding launchd stderr (#143519)](https://github.com/openclaw/openclaw/pull/143519) — 修复 macOS LaunchAgent 硬编码 `StandardErrorPath=/dev/null` 导致网关崩溃前日志无处可查的问题（对应 #90711）。
- [feat(ui): unify plugin discovery and installation (#142782)](https://github.com/openclaw/openclaw/pull/142782) — 合并插件发现与安装入口，使聊天内“can you install whatsapp”可直接跳转 ClawHub 官方插件列表，减少用户跳转成本。
- [fix(update): report the built runtime instead of the unbuilt source version (#143538)](https://github.com/openclaw/openclaw/pull/143538) — 修复 git-mode 安装拉取代码后未重建、但各命令均报告源版本而非已运行 dist 版本的问题。

**会话与消息链修复**
- [fix(agents): announce channel turns resumed after restart (#141797)](https://github.com/openclaw/openclaw/pull/141797) — 网关重启后，恢复的会话在原始账号/主题中发送一条简短的恢复通知，并正确处理 Telegram 打字指示器。
- [fix(process): Windows claude-cli spawn picks the npm POSIX shim over claude.cmd (#141721)](https://github.com/openclaw/openclaw/pull/141721) — 修复 2026.9.2 在 Windows 上每个 `claude-cli` 回合失败的 PATH 探测顺序问题（对应 #141382）。
- [fix: node exec on Windows corrupts quoted arguments before the command runs (#143089)](https://github.com/openclaw/openclaw/pull/143089) — 修复 Windows node 主机上双引号参数被静默改写的问题。

**整体判断：** 项目正在用大量 PR（今日 500 条更新）对 9 月初报告的高频回归做集中围剿，PR 提交节奏健康；但 P0/P1 未闭环数量仍在积累，尤其是 auth-provider 与 session-state 链路上的问题反复出现，提示基础设施层可能存在系统性设计欠账。

---

## 4. 社区热点

| Issue/PR | 评论数 | 核心诉求 |
|---|---|---|
| [#135111 [Bug] Provider completed tool call with malformed JSON arguments](https://github.com/openclaw/openclaw/issues/135111) | 26 | 升级到 v2026.8.1 后间歇性出现 LLM 工具调用 JSON 解析失败，不绑定具体文件/工具，影响面广，已关闭但用户对复现和根因仍有追问 |
| [#97616 [Bug] OpenClaw 泄漏未收割的子进程](https://github.com/openclaw/openclaw/issues/97616) | 15 | hook/tool 执行产生 zombie 进程累积，导致运行时性能下降，属于回归 |
| [#119720 同步 agent 持久化阻塞 Gateway 事件循环](https://github.com/openclaw/openclaw/issues/119720) | 15 | 同步持久化+transcript 维护在规模下阻塞事件循环，已修复 overflow 重载/原子写入，但仍需产品决策 |
| [#137927 内部 context 泄漏到 Telegram 可见消息](https://github.com/openclaw/openclaw/issues/137927) | 14 | 内部上下文块渲染为用户可见文本，安全/体验双输，已关闭 |
| [#53628 ${XDG_CONFIG_HOME} 安装 skill 时未解析](https://github.com/openclaw/openclaw/issues/53628) | 14 | Docker 下环境变量未展开，安装技能失败，已链接修复 PR |
| [#43367 多 agent 编排不稳定](https://github.com/openclaw/openclaw/issues/43367) | 14 | 并行运行 `agents add` 配置互相覆盖、session-lock 失败、子任务脱离，属于多 agent 生产底座问题 |

**热点分析：** 评论量最大的几个话题高度聚集在 **auth-provider（OAuth/Codex）、message-loss（会话丢消息）、session-state（状态一致性）** 三个标签上。用户对“升级后出现回归”和“数据/上下文丢失”的反应最为激烈，说明项目在快速迭代中需要加强对升级路径的兼容性测试。

---

## 5. Bug 与稳定性

**P0（按严重程度排序）**

| Issue | 状态 | 修复 PR |
|---|---|---|
| [#137813 Windows gateway 2026.9.1 更新后无法启动](https://github.com/openclaw/openclaw/issues/137813) | 已关闭 | 已修复 |
| [#141617 2026.9.2 npm 更新卡在 requested/running](https://github.com/openclaw/openclaw/issues/141617) | 已关闭 | 已修复 |
| [#89278 Codex OAuth 刷新成功但 cron/heartbeat 10s 超时](https://github.com/openclaw/openclaw/issues/89278) | 开放 | 暂无 |
| [#115642 Billing 冷却时间超过故障本身](https://github.com/openclaw/openclaw/issues/115642) | 开放，P0+release-blocker | 暂无 |
| [#142585 2026.9.3 Doctor 拒绝合法 legacy workspace 迁移](https://github.com/openclaw/openclaw/issues/142585) | 开放，新出现 | 暂无 |

**P1 重点回归/崩溃**

- [#135111 间歇性 malformed JSON arguments（v2026.8.1 回归，已关闭但仍需关注）](https://github.com/openclaw/openclaw/issues/135111)
- [#97616 hook/tool 子进程泄漏成 zombie，运行时性能退化](https://github.com/openclaw/openclaw/issues/97616) — 开放，暂无对应 PR
- [#138042 Gateway 控制请求可停滞 157–276 秒](https://github.com/openclaw/openclaw/issues/138042) — 开放
- [#140010 Windows 睡眠/恢复后 WebSocket 重连失败 30–60s+](https://github.com/openclaw/openclaw/issues/140010) — 开放
- [#127148 Codex sessions.compact 二次获取 app-server 导致 active-writer 冲突](https://github.com/openclaw/openclaw/issues/127148) — 开放
- [#137927 内部 context 泄漏为 Telegram 可见文本](https://github.com/openclaw/openclaw/issues/137927) — 已关闭
- [#128637 多 agent 配置触发 AgentSelectionRequiredError](https://github.com/openclaw/openclaw/issues/128637) — 开放

**P2 稳定性/数据持久性**

- [#139714 update_runs 永不结束，status 永远显示“update in progress”](https://github.com/openclaw/openclaw/issues/139714)
- [#114612 memory_index_chunks

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-09-10）

---

## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现**"头部集中、多线分化"**的态势：以 OpenClaw 为核心的项目保持极高迭代密度（单日 1000+ Issue/PR 更新），大量 PR 集中围剿升级回归与稳定性问题；NanoBot、CoPaw、LobsterAI 等项目处于稳定/中高活跃推进状态，各有侧重；PicoClaw、IronClaw 等中型项目合入节奏偏慢，部分小型项目（TinyClaw、Moltis、ZeptoClaw）已进入停滞。跨项目共同热点集中在**会话状态一致性、Provider 成本/计费、沙箱安全、升级兼容性**四大方向，安全漏洞报告开始密集出现于应用层项目（如 LobsterAI 单日 5 个安全 issue）。整体生态从"功能扩张"转向"质量巩固与架构收敛"。

---

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 合并/关闭 | 健康度评估 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（310 新/活跃，190 关闭） | 500（272 待，228 合并/关闭） | 无 | 大量修复合入，但 P0/P1 积累 | **高活跃，中高健康**：修复密度极高，但回归频发 |
| **CoPaw** | 26（12 新/活跃，14 关闭） | 36（27 待，9 合并/关闭） | 无 | 跨会话串扰、MCP 超时等已修复 | **高活跃，健康**：关键 bug 合入快，仍有 3 个高优无修复 |
| **Zeroclaw** | 30（3 关闭） | 50（49 待，1 关闭） | 无 | 几乎零合并，RFC 密集讨论中 | **高活跃，中健康**：架构讨论强，修复管线积压严重 |
| **LobsterAI** | 20（16 活跃，4 关闭） | 14（11 合并，3 待） | 无 | 11 个 OpenClaw v2026.8.1 升级修复 | **中高活跃，中高健康**：PR 效率高，但 5 个安全 issue 无 fix |
| **NanoBot** | 4（3 开放，1 关闭） | 21（9 合并，12 待） | 无 | WebUI 修复+沙箱/Provider 适配 | **中高活跃，健康**：合并速度快，社区贡献持续 |
| **NanoClaw** | 1 | 7（3 合并，4 待） | 无 | 线程回复、Portal 记录修复 | **中活跃，健康**：响应及时，任务调度 bug 超一周未回应 |
| **IronClaw** | 1（新开回归 bug） | 4（全部待合并） | 无 | 0 合入 | **中低活跃**：合并停滞，IME 回归需优先排查 |
| **EasyClaw** | 0 | 0 | **3 个**（v1.9.8/v1.9.9/v1.9.10） | 版本快速迭代 | **发布高活跃，社区低互动**：代码推进快，用户反馈信号弱 |
| **PicoClaw** | 0 新开（3 个 stale 关闭） | 1 合并，4 待（最长等待 69 天） | 无 | QQ 附件支持已合入 | **低活跃，维护整理期**：长期积压需关注 |
| **TinyClaw / Moltis / ZeptoClaw** | 0 | 0 | 无 | — | **停滞/无活动** |

---

## 3. OpenClaw 在生态中的定位

**OpenClaw 是当前生态的绝对基础设施核心和参照基准。**

- **优势**：社区体量远超同类（单日 500 Issue/500 PR，其他项目合计不足其 1/10）；功能覆盖面完整（Gateway、memory-core、Doctor 迁移、多 IM 渠道、插件体系）；作为上游基础，直接驱动下游项目（LobsterAI 今日 11 个 PR 全部围绕 OpenClaw v2026.8.1 升级修复，可见其版本变动对生态的强辐射力）。

- **技术路线差异**：OpenClaw 走"全栈 agent 运行时 + 长驻 Gateway + 持久化记忆/会话 + 跨渠道统一抽象"的重架构路线，相比之下 NanoBot 更偏轻量 WebUI/工具编排，Zeroclaw 偏架构 RFC 驱动，PicoClaw 偏多渠道接入，IronClaw 聚焦 MCP 服务端治理。

- **社区规模对比**：OpenClaw 单日 PR 合并量（228）即超过绝大多数项目全年合并量；其 P0/P1 issue 讨论强度、Doctor/auth-provider/session-state 等标签的持续高热，表明它不仅是用户量最大的平台，也是问题复杂度最高的平台。

- **关键风险**：频繁升级带来的回归正在消耗社区信任（Doctor 迁移拒绝、Windows 网关启动失败、OAuth 超时等 P0 反复出现），"高迭代速度"与"升级稳定性"之间的矛盾是 OpenClaw 当前最大挑战。

---

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话/上下文一致性** | OpenClaw、Zeroclaw、NanoClaw、CoPaw | 会话 pin 误判、转录文本丢失、回复未落入原线程、跨会话消息串扰——"消息不丢、归属正确"成为普遍刚需 |
| **Provider 兼容性与成本/计费** | OpenClaw、NanoBot、Zeroclaw | Codex OAuth 超时、OpenCode 强制 header、Anthropic usage 不计费（cost_usd=0）导致预算失效——Provider 适配与定价准确性直接影响用户钱包 |
| **沙箱与安全** | OpenClaw、NanoBot、Zeroclaw、LobsterAI | 沙箱命令被 OOM killer 中断、macOS Seatbelt 隔离、文件系统沙箱策略 RFC、任意文件读取/SSRF/本地 token 代理——安全从加分项变必选项 |
| **多租户/多 agent 隔离** | OpenClaw、IronClaw、Zeroclaw | 多 agent 配置互相覆盖、MCP 目录共享槽位导致用户间工具覆盖、并行配置 session-lock 失败——多用户/多 agent 生产底座仍不牢固 |
| **升级回归与迁移兼容** | OpenClaw、LobsterAI、IronClaw | Doctor 拒绝合法迁移、配置 hash 冲突导致重启、IME 修复复发——"升级即破坏"正在伤害用户对快速迭代的信任 |
| **跨平台行为一致性** | OpenClaw、Zeroclaw、PicoClaw | Windows 命令行参数损坏、macOS/Windows/OpenRC 日志行为不一致、Windows 栈溢出——平台差异化 bug 消耗大量维护精力 |

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 关键架构特征 |
|---|---|---|---|
| **OpenClaw** | 全功能个人 AI 助手平台（多 IM、插件、记忆、自动化） | 重度用户、开发者、企业试用 | 核心 agent runtime + 常驻 Gateway + memory-core + Doctor 迁移体系 |
| **Zeroclaw** | ZeroCode 低代码界面 + 架构前瞻 | 开发者、架构师、ZeroCode IDE 用户 | RFC 驱动设计，统一会话/文件/WASM 插件三大架构支柱 |
| **CoPaw** | 桌面/后端一体化智能助手 | 桌面端消费者、开发者 | v2.2.0 稳定版 + 后端预览，重视 Console UI/集成生态 |
| **LobsterAI** | 桌面 + IM 渠道深度整合（网易有道背景） | 中文用户、桌面 IM 场景 | 紧密跟随 OpenClaw 上游，做垂直打包与 IM 适配 |
| **NanoBot** | 轻量、多端体验统一（WebUI/TUI） | 轻量用户、自托管爱好者 | 简单架构，快速迭代，强调开箱即用 |
| **IronClaw** | MCP 服务端治理与多租户 | MCP 应用开发者、平台运维 | 多租户隔离、SEP-414 调用归因、扩展系统一致性 |
| **PicoClaw** | 长尾 IM 渠道与边缘设备 | 极客、嵌入式/边缘硬件用户 | 渠道多（QQ/IRC/deltachat）、低资源 worker 模式需求 |
| **NanoClaw** | 轻量 agent-runner + WhatsApp/Portal | 小型团队、个人效率用户 | 简化部署，快速修复，社区驱动 |
| **EasyClaw** | 运营工作台（Affiliate 管理、客服队列） | 商业化运营者 | 注重 Gateway 崩溃恢复与运营功能，发布节奏快 |
| **TinyClaw/Moltis/ZeptoClaw** | — | — | 已停滞，暂无明显差异化输出 |

---

## 6. 社区热度与成熟度

**快速迭代期（功能开发与修复并行）**：OpenClaw、CoPaw、NanoBot、Zeroclaw
- OpenClaw 单日 1000+ 更新，高频发布，但回归问题同步增加；
- CoPaw 维持健康合并节奏，关键 bug 响应快；
- NanoBot 社区贡献稳定，WebUI 打磨密集；
- Zeroclaw 处于架构重构前夜，RFC 讨论活跃，但代码合并与 bug 修复明显滞后于讨论速度。

**质量巩固期（升级/稳定性修复为主）**：LobsterAI、NanoClaw、EasyClaw
- LobsterAI 全力消化 OpenClaw v2026.8.1 升级带来的兼容性问题，PR 合入效率高，但安全漏洞迟迟未出 fix，暗含法律/合规风险；
- NanoClaw 小而稳，但唯一 open issue 超一周无人回应，暴露维护带宽不足；
- EasyClaw 版本迭代快（一日 3 版），但社区互动几乎为零，"开发热、社区冷"的分裂状态需要警惕。

**维护整理期/停滞**：PicoClaw、IronClaw、TinyClaw、Moltis、ZeptoClaw
- PicoClaw 靠 stale 机制清积压，PR 最长等待 69 天；
- IronClaw 单日 0 合入，4 条待评审 PR + 1 个回归 bug，维护者需要尽快打破停滞；
- 其余三个项目已完全无活动，提示生态淘汰正在加速。

---

## 7. 值得关注的趋势信号

1. **"升级回归"成为头号公敌**：OpenClaw 的 Doctor 迁移拒绝、npm 更新卡死、LobsterAI 集中修复 v2026.8.1 升级问题、IronClaw IME 修复复发——多个项目在同一时间被"上一个版本引入的 bug"拖住。对开发者启示：**自动化回归测试与迁移兼容性测试应成为 agent 项目的 CI 必选项**，否则快速迭代会持续消耗用户信任。

2. **安全性正从"加分项"变为"生死线"**：LobsterAI 单日爆出 5 个安全漏洞（任意文件读取

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-10

## 1. 今日速览

过去 24 小时 NanoBot 保持较高活跃度：共 4 条 Issue 更新（3 条开放/活跃，1 条关闭），21 条 PR 更新，其中 9 条已被合并/关闭，12 条仍在等待审查；无新版本发布。工作重心明显集中在 WebUI 体验优化与缺陷修复（约 7 个相关 PR），同时 Provider 兼容性（OpenCode 强制 header）与安全沙箱能力也有实质落地。整体项目健康度良好：PR 合并速度快，社区贡献者持续活跃，但存在一批带有 `conflict` 标签的积压 PR 需要维护者介入。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日共合并/关闭 9 个 PR，主要推进了以下方向：

- **Provider 兼容性**：[#5662](https://github.com/HKUDS/nanobot/pull/5662) 为 OpenCode Zen/Go 请求增加 `x-opencode-session` header，解决上游自 2026-09-06 起可能报错的问题，并恢复 prompt caching 优化。
- **安全沙箱**：[#5628](https://github.com/HKUDS/nanobot/pull/5628) 在 `tools.exec.sandbox` 中新增 macOS Seatbelt 后端子模块，基于系统 `/usr/bin/sandbox-exec` 实现无额外依赖的子进程隔离。
- **WebUI 修复与性能**：
  - [#5717](https://github.com/HKUDS/nanobot/pull/5717) 修复从项目菜单创建话题时项目选择被路由事件清除的问题；
  - [#5703](https://github.com/HKUDS/nanobot/pull/5703) 减少长对话和工具密集型响应中的重复 DOM 扫描，限制历史渲染范围；
  - [#5716](https://github.com/HKUDS/nanobot/pull/5716) 打开技能选择器时立即刷新技能列表，避免新安装技能需刷新页面；
  - [#5714](https://github.com/HKUDS/nanobot/pull/5714) 将文件编辑 diff 独立在推理折叠区域之外，避免折叠后 diff 不可见；
  - [#5713](https://github.com/HKUDS/nanobot/pull/5713) 防止斜体活动标签因 fit-content 溢出被裁剪；
  - [#5712](https://github.com/HKUDS/nanobot/pull/5712) 修复流式响应中数学公式的小于号被误判，导致 KaTeX 渲染中断的问题。
- **TUI 新功能**：[#5705](https://github.com/HKUDS/nanobot/pull/5705) 为 TUI 增加 `/usage` 面板，展示上下文占用及最近模型轮次的 token 用量分布。

这些变更表明项目正在“多端体验统一（WebUI/TUI）”“Provider 生态适配”和“生产安全”三条主线稳步前进。

## 4. 社区热点

- [#5721](https://github.com/HKUDS/nanobot/issues/5721) **跨会话持久记忆请求**：用户以 MemCode 创始人身份提出将 Nanobot 与可托管/自托管记忆后端互操作，希望实现跨部署共享记忆。该话题触及多实例、多智能体协作场景的长期痛点，可能引起路线图层面的讨论。
- [#5661](https://github.com/HKUDS/nanobot/issues/5661) / [#5662](https://

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-09-10）

## 1. 今日速览

过去 24 小时 ZeroClaw 项目保持高活跃度：新增/更新 Issue 30 条（其中 3 条已关闭），PR 更新 50 条（49 条待合并，1 条已关闭）。无新版本发布。今日主要动态集中在：多个 RFC 仍处于密集修订与讨论阶段（#9487、#9488、#6996 评论数持续增长）；ZeroCode 多会话/侧边栏/Quickstart 三个关联 Issue 于今日关闭，标志着该功能系列进入收尾；bug 报告量较大（约占 Issue 总量 40%），其中 2 个 P1 级缺陷（#9816、#10697）值得重点关注。整体来看，项目处于架构方案讨论密集期，同时社区反馈的问题修复 pipeline 尚有积压。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日无大型 PR 合并。过去 24 小时仅 1 条 PR 被合并或关闭（具体条目未在展示列表中，50 条 PR 中 49 条为待合并状态）。值得注意的进展信号：

- **ZeroCode 多会话与侧边栏功能落地**：三个相互依赖的 Issue（#9729、#9730、#9731）均在今日关闭。它们分别对应多会话追踪、代理侧边栏、Quickstart 迁移，说明 ZeroCode 界面重构的这组功能已完成开发并合入。
  - https://github.com/zeroclaw-labs/zeroclaw/issues/9729
  - https://github.com/zeroclaw-labs/zeroclaw/issues/9730
  - https://github.com/zeroclaw-labs/zeroclaw/issues/9731

- **Windows 栈溢出问题已有修复 PR**：今日新报告 issue #10734（process_line 栈溢出）后，@Project516 同日提交修复 PR #10735，通过在堆上固定最大的 dispatch 分支状态机来解决，响应速度快。PR 为 XS 规格，审查门槛低。
  - https://github.com/zeroclaw-labs/zeroclaw/pull/10735

- **部分 PR 进入等待合并状态**：展示的 20 个 PR 中 7 个处于 blocked 状态（#7821、#9713、#9999、#10252、#10304、#10391、#10735），主要受依赖 PR 或 maintainer 审查阻塞。项目整体前进节奏受 RFC 决策队列影响较大。

## 4. 社区热点

今日讨论最活跃的 Issues（按评论数排序）：

| Issue | 标题 | 评论数 | 讨论焦点 |
|-------|------|--------|----------|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters | 36 | 运行时会话所有权与传输适配器架构，修订至第 5 版 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture | 29 | 统一文件/附件架构，修订至第 10 版 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy - filesystem restrictions | 29 | 文件系统沙箱策略分层 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Maintainer decision queue for RFCs | 15 | 维护者 RFC 决策队列跟踪器 |
| [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | Composable WASM plugin runtime architecture | 12 | WASM 插件运行时架构 |

**分析**：社区讨论高度集中在架构级 RFC 上，核心诉求是驱动统一会话/文件/WASM 三个基础架构方向的决策。值得注意的细节：#9487 已修订至 Revision 5，且明确说明前序投票快照作废、需重新进入讨论窗口——这反映出 RFC 流程本身正在被社区实践检验（恰好与 #10549 的流程简化提案形成呼应）。#8692 作为维护者决策队列的跟踪器获得 15 条评论，说明社区对 RFC 积压和决策效率有明确关注。

此外，RFC 流程简化的提案 #10549 在 7 条评论的讨论中试图取消固定讨论窗口、让 REVISE 立即停止投票快照，该提案若通过将缩短未来 RFC 的决策周期。
- https://github.com/zeroclaw-labs/zeroclaw/issues/10549

## 5. Bug 与稳定性

### P1 - 高优先级

| Issue | 问题描述 | 状态 | 是否有 Fix PR |
|-------|----------|------|---------------|
| [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | Anthropic 提供商全部 usage 记录 cost_usd 为 0.0，导致日/月预算上限永远无法触发 | OPEN，已接受，in-progress | 未发现 |
| [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) | ZeroCode ACP transcript 丢弃工具调用之前的 assistant 文本，只显示最后一次工具调用后的文本 | OPEN，P1 | 未发现 |

### P2 - 中优先级（部分）

| Issue | 问题描述 | 备注 |
|-------|----------|------|
| [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | 流式输出前失败时跳过了已承诺的非流式 fallback，运行时记录日志但未发送请求 | 今日新报 |
| [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | process_line 在 Windows 受限栈线程上栈溢出，导致 Advisory nextest 任务崩溃 | ✅ 已有 fix PR #10735 |
| [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | `service logs` 在 macOS/Windows/OpenRC 上 daemon 健康时无输出（平台行为不一致） | 今日新报 |
| [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) | knowledge.db_path 的 ~ 展开是全局 replace 而非 home 前缀替换，导致知识工具被静默丢弃 | 新报 |
| [#10723](https://github.com/zeroclaw-labs/zeroclaw/issues/10723) | cached-input 费率为 0.0 时会抑制缺价警告（即使标准输入费率也缺失） | 新报 |
| [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | 内部 `[media attachment]` 占位符被直接发给用户（当使用非 vision 模型时） | 已接受 |
| [#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) | Integrations 页面的 Configure 链接用显示名 slug 而非 family key，导致 Z.AI 链接 404 | 已接受 |
| [#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728) | npm audit 报 1 个 high 级漏洞（js-yaml 间接依赖） | CI 自动创建 |

### 趋势

今日新报 bug 数量较多（#10736、#10734、#10731、#10721、#10723、#10728），集中在 provider 行为一致性、跨平台 daemon 行为差异和配置解析的边缘情况。其中 Windows 栈溢出（#10734）在 24 小时内即收到修复 PR，响应良好。但 P1 的 cost 统计（#9816）和 ACP transcript 文本丢失（#10697）均无对应修复 PR，可能对用户预算控制和 ZeroCode 使用体验造成实质影响。

## 6. 功能请求与路线图信号

### 今日新增/活跃的功能请求

- **[#10725](https://github.com/zeroclaw-labs/zeroclaw/issues/10725) 结构化工具输入可读渲染**：用户希望 ZeroCode 将工具调用的 JSON 参数渲染为可读性强的字段而非单行序列化文本，优先级不高但直击日常使用体验。

- **[#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706) OpenAI Responses 调用路径保留不透明推理状态**：已有 accepted 标记，涉及 API-key 和 Codex 订阅适配器的一致性。

- **[#10705](https://github.com/zeroclaw-labs/zeroclaw/issues/10705) 兼容 OpenAI 模型支持 max reasoning effort**：用户反馈 GPT-6 Astra 的 max 档无法通过现有配置选择。

- **[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) 可配置 1 小时 prompt-cache TTL**：解决 Anthropic 默认 5 分钟 TTL 导致缓存命中率低的问题

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-10

## 今日速览

过去 24 小时 PicoClaw 项目处于**低活跃度的维护整理期**：没有新版本发布，没有新 Issue 或新 PR 提交；3 条积压数周的 Issues 被 stale 机制标记并关闭，同时 1 条 PR（QQ 频道附件支持增强）完成合并。当前共有 4 条 PR 处于待合并状态，其中最早的 #3222 已等待超过 2 个月，长期积压需关注。整体来看，项目反馈量趋于平稳，代码层面仍有小幅推进，但社区活跃度不高。

## 版本发布

无新版本发布。

## 项目进展

**已合并/关闭 PR：1 条**

- **[#1349] feat(qq): support parsing and replying to more attachment types**（作者 @aishannon，更新 2026-09-09）  
  https://github.com/sipeed/picoclaw/pull/1349  
  为 QQ Channel 频道补全了多种附件类型的解析与回复能力：
  - 支持解析 QQ 频道 emoji 结构；
  - 支持接收语音、图片、视频和文件消息；
  - 支持回复本地音视频及文件附件（先上传再发送）；
  - 优先使用 Markdown 消息回复，失败时降级到普通消息。
  
  该 PR 落地后，PicoClaw 在 QQ 频道的多模态交互能力得到明显提升，对开发者生态是一个实质性的功能补强。

**待合并 PR：4 条**（详见「待处理积压」）

当前无其他合并进入主干的功能改动，项目进展主要集中在这一条 PR 上。

## 社区热点

过去 24 小时讨论热度整体偏低，活跃内容以下列 3 条被关闭的 Issues 为主（均带 stale 标记）：

- **[#3269] [BUG] MCP 服务器连接失败导致 agent 循环挂起**，评论 9 条，👍 1  
  https://github.com/sipeed/picoclaw/issues/3269  
  这是本期评论最多的 Issue。用户报告当 MCP 服务器连接失败时，agent 循环阻塞，PicoClaw 聊天界面停止回复，影响严重。

- **[#3265] Gateway 启动失败：'channel deltachat has unknown type deltachat'**，评论 4 条，👍 1  
  https://github.com/sipeed/picoclaw/issues/3265  
  用户报告在 config.json 中未配置 deltachat 的情况下，gateway 依然因 deltachat 渠道类型未知而启动失败，属于配置系统的异常行为。

- **[#3345] Proposal: 轻量级 worker mode 用于家用边缘计算**，评论 2 条  
  https://github.com/sipeed/picoclaw/issues/3345  
  社区成员提出希望 PicoClaw 能以 worker 模式运行在低成本的 RISC-V/ARM 设备上，接入低端边缘硬件。

需要注意的是，这 3 条均在 2026-09-09 被自动标记为 stale 并关闭，说明讨论并未持续升温，项目维护者暂时未将它们纳入当前处理优先级。

## Bug 与稳定性

过去 24 小时无新 Bug 报告，但有两项历史严重 Bug 在本日被 stale 机制关闭，**需警惕关闭≠已修复**：

1. **MCP 服务器连接失败导致 agent 循环挂起**（严重，影响聊天可用性）— [#3269](https://github.com/sipeed/picoclaw/issues/3269)  
   连接失败后无超时恢复机制，agent 卡死，界面停止响应。无关联 fix PR，用户受影响面较大。
   
2. **Gateway 启动失败：deltachat 渠道类型识别异常**（严重，阻塞启动）— [#3265](https://github.com/sipeed/picoclaw/issues/3265)  
   即使未配置 deltachat，gateway 仍尝试识别该渠道类型并报错。无关联 fix PR。值得注意的是，待合并的 **[#3222](https://github.com/sipeed/picoclaw/pull/3222)** 正在对 deltachat 模块进行大规模重构（清理约 200 行代码），该问题可能在重构合并后自然消除。

两条 Issue 均因长期无活动被自动关闭，建议维护者尽快确认问题是否已解决，或在后续版本中跟踪验证。

## 功能请求与路线图信号

- **[#3345] 轻量级 worker mode（家用边缘计算）**（已 stale 关闭）  
  https://github.com/sipeed/picoclaw/issues/3345  
  用户建议 PicoClaw 在低端设备（RISC-V 开发板、旧 Android 手机，可用内存 10–20MB）上以 worker 模式运行，组成家庭分布式 agent 网络。虽然当前被关闭，但该诉求与「边缘计算 + 个人 AI」趋势吻合，未来可能以其他形式重新提出。

- **待合并 PR 中反映的方向性信号**：
  - **Agent 消息上下文关联**：PR #3358 为 agent 回复添加 `ReplyToMessageID`，解决群聊中回复与提问无法对齐的问题。这直接提升了群聊场景的用户体验。
  - **IRC 多行消息支持**：PR #3354 接入 IRCv3 `draft/multiline` 协议，完善 IRC 渠道的入站消息完整性。
  - **工具反馈动画生命周期**：PR #3353 修复动画无法停止的隐患，限制 5 分钟上界并在首次编辑错误后立即停止。
  - **deltachat 模块重构**：PR #3222 清理 legacy 代码、删除密码依赖、标准化邀请链接接口。

  这 4 条 PR 若全部合并，将涵盖渠道扩展、群聊体验、稳定性修复和代码架构清理，构成下一版本的重要更新集。

## 用户反馈摘要

从近期 Issues 及评论中可以提炼出以下真实用户痛点：

- **MCP 连接失败无兜底导致服务完全不可用**（#3269）：不少用户依赖 MCP 扩展 agent 能力，但连接异常时 PicoClaw 直接失去响应，需要更健壮的超时/重试机制。该反馈代表了对稳定性的高期待。
- **默认配置即崩溃的行为不可接受**（#3265）：未配置 deltachat 的干净环境也会启动失败，影响新用户首次体验，属于典型的配置模型缺陷。
- **低端硬件场景有真实需求**（#3345）：用户希望复用家中闲置的低性能设备，将 PicoClaw 部署为分布式 agent 节点，对资源占用和部署形态提出了比现有文档更具体的要求。
- **群聊场景响应定位不清**（#3358）：用户在群聊中直接 @ 触发的回答无法与原始问题绑定，在活跃群聊中容易造成信息混乱，影响了 bot 可用性。

整体而言，用户对 PicoClaw 在边缘设备上的多平台接入持积极态度，但对故障恢复和默认配置体验有明确的不满。

## 待处理积压

**待合并 PR（按等待时长排序）：**

1. **[#3222] refactor(deltachat): cleanup implementation, documentation -200LOC** — 创建于 2026-07-03，已等待 **69 天**  
   https://github.com/sipeed/picoclaw/pull/3222  
   大规模重构 deltachat 模块并大幅精简代码，但长期未获审核或合并，可能对前述 #3265 问题产生直接影响。

2. **[#3353] fix(channels): bound tool feedback animations** — 创建于 2026-08-31，已等待 **10 天**  
   https://github.com/sipeed/picoclaw/pull/3353  
   修复动画生命周期清理缺失问题，属于稳定性修复，改动范围小。

3. **[#3354] feat(irc): assemble IRCv3 multiline messages** — 创建于 2026-08-31，已等待 **10 天**  
   https://github.com/sipeed/picoclaw/pull/3354  
   IRC 渠道多行消息支持，功能完善但优先级可能不高。

4. **[#3358] fix(agent): thread responses to the originating question message** — 创建于 2026-09-01，已等待 **9 天**  
   https://github.com/sipeed/picoclaw/pull/3358  
   修复群聊中回复与提问消息未关联的问题，直接影响用户体验，建议尽快安排 review。

**长期无响应的 Issues：**

今日 3 条 stale Issues 均被关闭，但其中 #3269（MCP 挂起）与 #3265（gateway 启动失败）属于需要实际修复的 Bug，不应随 stale 流程隐没。建议维护者跟进确认问题状态，若仍未解决可重新开启并指派。

---

*以上日报基于 GitHub 数据自动生成，数据截至 2026-09-10。*

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-10

## 1. 今日速览

过去24小时内，NanoClaw 项目保持较高的开发活跃度：共产生 7 条 PR 动态，其中 3 条已合并/关闭，4 条正待审核；Issue 侧有 1 条新反馈进入讨论。修复内容集中在 agent-runner 稳定性、WhatsApp 通道健壮性、以及安装/Portal 体验等方向。当前无新版本发布。整体来看，项目处于**稳定迭代 + 主动修复**的健康节奏中，维护者对社区 PR 的响应速度较快（多条 PR 均在一天内获得处理）。

## 2. 版本发布

今日无新版本 Release。

## 3. 项目进展

今日共有 3 条 PR 被合并或关闭，核心进展如下：

- **[#3738] fix(agent-runner): thread replies from the message being answered**（已合并）  
  修复了 `send_message`、`send_file` 以及 `<message to>` 回复未正确落入原消息线程的问题，确保文件等回复不再误发至主频道。该改动横跨 core、sessions、tools 等多个模块，是今日最重要的功能修复。
  链接：https://github.com/nanocoai/nanoclaw/pull/3738

- **[#3753] fix: the community portal records the Echo image that actually landed**（已合并）  
  修复了社区 Portal 在浏览器签名流尚未完成时即写入 `NANOCLAW_HARDENED_IMAGE=true` 的问题，使记录与实际部署镜像保持一致。
  链接：https://github.com/nanocoai/nanoclaw/pull/3753

- **[#3756] fix(agent-runner): a spent usage allowance is said in a sentence**（已关闭）  
  优化了因 usage allowance 耗尽导致 Gateway 拒绝请求时的错误提示文案，改善终端用户体验。
  链接：https://github.com/nanocoai/nanoclaw/pull/3756

此外，另有 4 条 PR 处于待合并状态（见第 5、6 节），涉及 WhatsApp 通道修复与数据处理清理，预计将在近期合入。

## 4. 社区热点

今日社区讨论热度整体不高，最受关注的为以下 Issue：

- **[#3705] ncl tasks update --recurrence doesn't recompute the next scheduled fire (process_after)**（1 条评论，最后更新 09-09）  
  链接：https://github.com/nanocoai/nanoclaw/issues/3705

该 Issue 由 @DawoudIO 在 09-03 提出，指出通过 `ncl tasks update --recurrence` 修改任务周期（如从每周改为每日）后，`process_after` 仍保持旧时间表，导致任务实际触发时间与预期不符。该问题触及任务调度的核心逻辑，使用场景明确且复现路径清晰，建议维护者优先跟进。

## 5. Bug 与稳定性

按严重程度排列：

| 严重程度 | 问题描述 | 状态 |
|---------|---------|------|
| 中 | **任务周期更新不生效**：`ncl tasks update --recurrence` 修改调度后，`process_after` 不会按新周期重算（[#3705](https://github.com/nanocoai/nanoclaw/issues/3705)） | 无 fix PR |
| 中 | **线程回复路由错误**：`send_message` 等回复未落入原消息线程，导致文件误发至主频道（[#3738](https://github.com/nanocoai/nanoclaw/pull/3738)） | ✅ 已合并 |
| 中 | **Portal 镜像记录不准确**：未登录/未决定前的运行可能被错误记录为 hardened 镜像（[#3753](https://github.com/nanocoai/nanoclaw/pull/3753)） | ✅ 已合并 |
| 低 | **usage allowance 耗尽提示语不清**：错误文案影响用户理解，已修正为更明确表达（[#3756](https://github.com/nanocoai/nanoclaw/pull/3756)） | ✅ 已关闭 |
| 低 | **processing_ack 数据滞留**：已不存在的 message 对应的 ack 行未被清理，可能影响消息查询效率（[#3755](https://github.com/nanocoai/nanoclaw/pull/3755)） | ⏳ 待合并 |

## 6. 功能请求与路线图信号

今日未出现全新的大型功能请求，但以下信号值得关注：

- **[#3705] 任务调度重算**：本质上是核心调度器的一个能力增强需求——当 recurrence 变更后自动重新计算 `process_after`。该问题与任务系统的核心行为直接相关，很可能进入下一版本的修复计划。
- **[#3751] WhatsApp @newsletter JID 过滤**：在入站边界忽略 `@newsletter` 类型的 JID，避免非用户消息进入处理流程。属于通道健壮性增强。
- **[#3752] WhatsApp 待处理问题可回答性**：确保聊天中每个待回答的问题都能被响应用户找到，不丢失上下文。属于交互体验优化。

以上两条 WhatsApp 相关 PR 均为典型的通道完善型改动，大概率随下个迭代版本合并。

## 7. 用户反馈摘要

- **任务调度灵活性**（来自 #3705）：用户期望修改任务 recurrence 后系统能自动重新计算下次触发时间，而非保留旧时间。该需求反映出对任务系统"即改即生效"的直觉预期，用户可能会在多次任务调整场景中频繁触达此问题。
- **文案/提示影响体验**（来自 #3756）：PR 标题指出"a spent usage allowance is said in a sentence"，说明开发团队正在主动打磨面向终端用户的错误信息表达，提升可读性与可操作性。
- **Portal 记录一致性**（来自 #3753）：社区用户在实际使用中对"点击选择的 Echo 镜像"与"实际运行的镜像"存在认知落差，说明部署流程记录需要与实际状态严格同步。

总体观察：用户反馈以功能性 Bug 和体验细节为主，未出现对项目方向的质疑或强烈不满，社区对项目迭代节奏总体认可。

## 8. 待处理积压

- **[#3705] 任务 recurrence 不重算 `process_after`**（创建于 09-03，暂无维护者响应）  
  这是目前唯一处于 open 状态的 Issue，已超过一周无维护者回复。考虑到该问题直接关系到任务调度的正确性，建议维护者尽快确认优先级并安排修复。
  链接：https://github.com/nanocoai/nanoclaw/issues/3705

- **4 条待合并 PR**：  
  - [#3755] processing_ack 清理 — https://github.com/nanocoai/nanoclaw/pull/3755
  - [#3754] 未登录浏览器交接链接优化 — https://github.com/nanocoai/nanoclaw/pull/3754
  - [#3752] WhatsApp 待回答问题可答性修复 — https://github.com/nanocoai/nanoclaw/pull/3752
  - [#3751] WhatsApp @newsletter 过滤 — https://github.com/nanocoai/nanoclaw/pull/3751

  以上 PR 均无冲突迹象且改动范围清晰，建议在下一轮 review 中集中处理，以保持合并队列健康。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-10

> 数据来源：github.com/nearai/ironclaw | 统计窗口：2026-09-09 ~ 2026-09-10

---

## 1. 今日速览

过去 24 小时 IronClaw 项目活跃度处于中等水平：共新增 1 条 Issue、4 条待合并 PR，无新版本发布。值得关注的是，4 条 PR 全部处于 Open 状态且无一被合并或关闭，说明维护者当前更侧重于代码评审而非合入阶段；同时新出现的 WebChat IME 复发 bug（#8091）指向了此前修复的回归，需要引起警觉。从提交内容看，项目当前重点集中在 MCP 多租户隔离与调用链可观测性方面，整体健康度稳定，但合并节奏偏慢。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日无 PR 被合并或关闭，因此无功能直接进入主干。但 4 条待合并 PR 清晰地揭示了项目正在推进的两大方向：

- **MCP 多租户隔离与调用归因**（#8090、#8084）：修复托管 MCP 目录因共享槽位导致用户间工具互相覆盖的问题，并引入可选的 SEP-414 调用方属性传递，使 MCP 服务端能够区分对话来源与重试请求。这两项改动直接关系到多用户场景下的数据隔离与计费准确性。
- **扩展系统一致性修复**（#8085）：解决 operator 安装的包“可构建但不可用”的矛盾——构造函数与校验器对 inline dynamic schema 合法来源的判断不一致。
- **Telegram 命令菜单注册**（#8072）：为渠道声明命令（`/model`、`/status`、`/new` 等）接入 Bot API 的 `setMyCommands`，属于体验增强类功能。

> 虽无合入，但以上 PR 已进入可评审状态，预计未来 1-2 天内会有合并动作。

---

## 4. 社区热点

今日公开评论数据极低（各 Issue/PR 均为 0 或未提供评论数），但以下条目因内容指向明确、涉及面较广，值得重点关注：

- **#8091**（bug，webchat-v2 IME 回车误发送）是今日唯一新开 Issue，虽然零评论，但摘要中提到 “**appears to be a recurrence**”，即用户明确感知到旧问题回归，存在引发连锁讨论的潜质。  
  https://github.com/nearai/ironclaw/issues/8091

- **#8090**（fix，MCP 多租户工具目录覆盖）虽然定位为 bug 修复，但其描述“用户 A 的发现结果覆盖用户 B”直指多人协作场景下的核心矛盾，后续可能吸引多用户部署者的关注与追问。  
  https://github.com/nearai/ironclaw/pull/8090

- **#8084**（feat，SEP-414 调用方归因）涉及安全/计费语义，属于架构级话题，社区中关注 MCP 服务端状态管理的开发者可能对此展开讨论。  
  https://github.com/nearai/ironclaw/pull/8084

---

## 5. Bug 与稳定性

| 严重程度 | Issue/PR | 描述 | 状态 |
|---|---|---|---|
| 中 | #8091 | WebChat v2 中，Enter 键在确认 IME 拼音组合的同时触发了消息发送，导致未编辑完的内容被发出。**用户明确指出这是之前已修复问题的复发**，存在回归风险 | 新开，无 fix PR |
| 中高 | #8090（PR） | 托管 MCP 服务器目录按扩展 ID 共享缓存，多用户场景下工具列表相互覆盖——**底层 bug 未合入修复**，目前仅存在于修复 PR 中 | 待合并 |
| 中 | #8085（PR） | operator 安装的包在实际使用中无法被加载，根因是构造器与校验器对清单源合法性的判断不一致 | 待合并 |

> 注：#8090 与 #8085 本身即为修复 PR，虽尚未合并，但已定位根因并给出补丁；#8091 则仍处于无修复方案阶段。

---

## 6. 功能请求与路线图信号

- **SEP-414 调用方属性传递**（#8084）：允许托管 MCP 服务端识别调用来源与重试标识，是面向多用户/计费场景的重要能力，与 #8090 的隔离修复互补。若合并，可视为对 MCP 服务端生态的一次基础设施升级。  
  https://github.com/nearai/ironclaw/pull/8084

- **Telegram 命令菜单注册**（#8072）：来自外部贡献者，动机明确且文档、依赖标签齐备（`size: L, risk: low, contributor: experienced`），属于低风险、高可见性的功能增强，有较大概率被纳入下一版本。  
  https://github.com/nearai/ironclaw/pull/8072

> 两项 feat 均未附带具体的 roadmap issue，建议维护者关注 #8084 的后续讨论，判断 SEP-414 是否应纳入近期迭代。

---

## 7. 用户反馈摘要

- **#8091 用户痛点**（@supermomonga）：日文/中文 IME 用户在输入法组合阶段按 Enter 确认选词，消息就被意外发送。用户明确表达“**消息在我准备好之前就发出去了**”，说明该问题直接影响输入流畅度与沟通准确性，且对非拉丁输入法用户属于高频操作路径。  
  https://github.com/nearai/ironclaw/issues/8091

- **#8090 隐含用户场景**：多位用户在同一台托管 MCP 服务器上操作时，彼此覆盖对方可见的工具列表，导致发现结果不可预期。这反映出真实部署中存在多用户共享基础设施的典型需求。  
  https://github.com/nearai/ironclaw/pull/8090

- **#8085 隐含用户场景**：平台 operator 安装扩展包后，构建流程通过但运行时加载失败，属于典型的“构建-运行”断裂体验，会直接削弱运维侧对平台的信赖。  
  https://github.com/nearai/ironclaw/pull/8085

---

## 8. 待处理积压

| 项目 | 类型 | 等待时长（截至今日） | 建议 |
|---|---|---|---|
| #8072 Telegram 命令菜单注册 | PR（feat） | 6 天 | 已带完整标签且评估为 low risk，建议优先安排评审合入，避免外部贡献者等待过久 |
| #8084 SEP-414 调用方归因 | PR（feat） | 2 天 | 架构相关，建议尽快明确是否接受，若进入设计评审需给出时间预期 |
| #8090 MCP 目录多租户修复 | PR（fix） | 2 天 | 涉及数据隔离，建议优先合并并补充多用户集成测试 |
| #8085 扩展加载一致性修复 | PR（fix） | 2 天 | 问题根源已定位，修复范围小，建议与 #8090 一起安排评审 |
| #8091 WebChat IME 回车回归 | Issue（bug） | 1 天 | 存在回归特征，建议快速确认是否由近期前端改动引发，并查找上一次修复的 PR 进行关联 |

https://github.com/nearai/ironclaw/pull/8072  
https://github.com/nearai/ironclaw/pull/8084  
https://github.com/nearai/ironclaw/pull/8090  
https://github.com/nearai/ironclaw/pull/8085  
https://github.com/nearai/ironclaw/issues/8091

---

**总体健康度评估**：项目无阻塞性危机，但“0 合入 + 1 回归报告 + 3 项待评审修复”的组合提示维护者应尽快处理已就绪的 PR，并为 #8091 的回归排查分配优先级。社区活跃度偏低，但提交质量较高（均附带根因分析），整体处于稳定推进状态。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-10

## 1. 今日速览

过去 24 小时项目无新版本发布，但代码维护活跃：14 条 PR 中有 11 条被合并/关闭（多为 OpenClaw v2026.8.1 升级后的配套修复），3 条待合并。Issue 侧 20 条更新中，绝大多数为 stale 机器人自动标记/关闭的 5-7 月存量 issue（16 条活跃更新，4 条关闭），真正新开的 issue 数量有限。值得关注的是，5 条安全漏洞相关 issue（#2176、#2181、#2286、#2287、#2288）仍处于 open 状态且无关联 fix PR，构成潜在风险。整体活跃度评估：**中高**——PR 合并效率高，升级修复进入收尾阶段；Issue 侧以存量清理为主，新需求输入偏弱。

---

## 2. 版本发布

无新版本发布（最新 Release 仍为 OpenClaw v2026.8.1 相关版本）。

---

## 3. 项目进展

今日合并/关闭的 11 条 PR 全部围绕 **OpenClaw v2026.8.1 升级后的稳定性修复**，按主题分类如下：

**OpenClaw 配置与会话状态修复（核心）**

- **#2639** [已合并] `fix(openclaw): keep default model out of system prompts` — 阻止会话间切换模型时默认模型被写入 system prompt，避免破坏可复用的对话前缀，并解决 `default_model` 改变前缀的问题。关联 [#2639](https://github.com/netease-youdao/LobsterAI/pull/2639)
- **#2638** [已合并] `fix(openclaw): migrate legacy workspace state before gateway startup` — 在网关启动前迁移旧工作区状态，修复升级后对话被 `Legacy workspace setup state requires migration` 拦截的问题。关联 [#2638](https://github.com/netease-youdao/LobsterAI/pull/2638)
- **#2635** [已合并] `fix(openclaw): avoid gateway restarts on stale config hashes` — 为配置 hash 冲突引入有界退避重试，避免短暂冲突导致的不必要网关重启。关联 [#2635](https://github.com/netease-youdao/LobsterAI/pull/2635)
- **#2640** [待合并] `fix(openclaw): keep model selection session-scoped` — 显式写入 `agents.defaults.modelSelectionScope = "session"`，确保普通会话切换不污染默认配置。关联 [#2640](https://github.com/netease-youdao/LobsterAI/pull/2640)

**IM 渠道适配修复**

- **#2632** [已合并] `fix(openclaw): preserve IM config and gracefully stop Windows gateway` — 修复退出登录时配置同步将 OpenClaw 配置缩减为最小配置导致 IM 账号丢失的问题；Windows 网关改用 IPC 请求正常停止，避免触发通道自动启动抑制。关联 [#2632](https://github.com/netease-youdao/LobsterAI/pull/2632)
- **#2633** [已合并] `fix(openclaw): update Discord DM config for gateway startup` — 新版 schema 拒绝旧的 `dm.policy` / `dm.allowFrom`，改为输出顶层 `dmPolicy` / `allowFrom`。关联 [#2633](https://github.com/netease-youdao/LobsterAI/pull/2633)
- **#2637** [已合并] `fix(openclaw): bundle Discord with trusted plugin origin` — 将官方 Discord 包移至 `dist/extensions/` 下，解决 `openKeyedStore is only available for trusted plugins` 注册失败。关联 [#2637](https://github.com/netease-youdao/LobsterAI/pull/2637)
- **#2634** [已合并] `fix(openclaw): restore QQ shutdown and desktop IM sync` — 修复 QQ 2.0.1 收到关闭信号直接退出导致清理/记录不完整的问题，以及重启后桌面端未恢复消息同步的问题。关联 [#2634](https://github.com/netease-youdao/LobsterAI/pull/2634)

**其他修复**

- **#2631** [已合并] `fix(cron): correct run history and preparation failure state` — 修复计划任务在 OpenClaw v2026.8.1 升级后的历史记录重复导入、失败状态未持久化的问题。关联 [#2631](https://github.com/netease-youdao/LobsterAI/pull/2631)
- **#2636** [已合并] `fix(i18n): refresh About update label when switching languages` — 修复从中文切换英文后“检查更新”按钮仍显示中文的问题。关联 [#2636](https://github.com/netease-youdao/LobsterAI/pull/2636)
- **#2166** [已合并] `ci: bump dorny/paths-filter from 3 to 4` — Dependabot 自动升级 CI 依赖。关联 [#2166](https://github.com/netease-youdao/LobsterAI/pull/2166)
- **#2294** [已合并] `docs: add TakoAPI directory badge` — 文档渠道新增目录徽章。关联 [#2294](https://github.com/netease-youdao/LobsterAI/pull/2294)

**评估**：今日 PR 集中解决了 OpenClaw v2026.8.1 升级引入的配置兼容、网关生命周期、IM 渠道适配三类回归问题，标志着升级后的稳定性修复已进入收尾阶段，项目整体稳健性向前迈进一大步。

---

## 4. 社区热点

由于今日 issue 评论普遍较少，热点集中在以下两类：

**安全漏洞报告（5 条，无 fix PR，持续发酵）**

- **#2176** `[Security] LobsterAI automatic artifact loading allows message-derived arbitrary local file reads` — 自动 artifact 加载可导致任意本地文件读取。评论 2 · 链接 [#2176](https://github.com/netease-youdao/LobsterAI/issues/2176)
- **#2181** `[Security] LobsterAI restores private-network browser access by default and weakens the bundled OpenClaw SSRF guard` — 默认恢复私有网络浏览器访问，削弱 SSRF 防护。评论 1 · 链接 [#2181](https://github.com/netease-youdao/LobsterAI/issues/2181)
- **#2286** `[Security] Unauthenticated local token proxy in LobsterAI allows any local process to replay the victim's authenticated server-model API capability` — 本地 token 代理无认证，任意进程可重放用户 API 能力。评论 1 · 链接 [#2286](https://github.com/netease-youdao/LobsterAI/issues/2286)
- **#2287** `[Security] LobsterAI NIM outbound media flow allows arbitrary host-local file exfiltration via assistant-generated absolute paths` — NIM 集成可将任意本地文件作为附件外发。评论 1 · 链接 [#2287](https://github.com/netease-youdao/LobsterAI/issues/2287)
- **#2288** `[Security] LobsterAI HTML preview server

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

# CoPaw 项目动态日报 — 2026-09-10

> 数据来源：github.com/agentscope-ai/CoPaw（当前仓库显示为 agentscope-ai/QwenPaw）

---

## 1. 今日速览

过去 24 小时项目保持高活跃度：共更新 **26 条 Issues**（12 条新开/活跃、14 条已关闭），**36 条 PR**（27 条待合并、9 条已合并/关闭），**无新版本发布**。多条影响真实用户的 bug 已被修复并合入主线，最典型的是跨会话消息串扰（#7231→PR #7237）与 MCP 超时可配置化（#3997→PR #7649）；同时仍有若干高优先级 bug 处于"已报告但无修复 PR"的状态（#7633、#7363、#7642），需要维护者重点关注。社区侧的声音集中在 Console UI/交互体验（#7177、#7642、#7601）与集成能力扩展（#4175、#7657、#7650）两个方向，整体项目健康度良好，但发布节奏已进入间歇期。

---

## 2. 版本发布

**无新版本发布。** 最近一次版本停留在 v2.2.0 正式版（桌面端）与 2.2.0b7（后端预览），部分 Issue 中用户已经报告了

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报（2026-09-10）

> 数据来源：[github.com/gaoyangz77/easyclaw](https://github.com/gaoyangz77/easyclaw)  
> 统计周期：过去 24 小时 | 报告日期：2026-09-10

---

## 1. 今日速览

过去 24 小时内，EasyClaw 的 Issues 和 PR 均为 **0 条更新**，社区侧没有新增讨论、提交或关闭事件；但 Releases 侧发布了 **3 个新版本**（v1.9.8、v1.9.9、v1.9.10）。

整体活跃度评估：

- **开发/发布活跃度：高**。连续发布 3 个版本，涵盖工作台功能增强、Gateway 稳定性修复和性能优化，说明维护者仍在快速迭代。
- **社区互动活跃度：低**。Issues/PR 通道零更新，用户反馈与外部贡献暂时没有体现在 GitHub 上。
- **项目健康度判断**：代码发布节奏健康，但社区参与信号偏弱。建议关注 issue/PR 通道是否在过往时段内持续低迷，以判断是否存在反馈积压或外部参与不足。

相关链接：
- [仓库主页](https://github.com/gaoyangz77/easyclaw)
- [Issues 列表](https://github.com/gaoyangz77/easyclaw/issues)
- [Pull Requests 列表](https://github.com/gaoyangz77/easyclaw/pulls)

---

## 2. 版本发布

过去 24 小时共发布 3 个版本。注意：以下内容基于提供的新版本说明整理，部分 release notes 存在截断。

| 版本 | 核心内容 | 发布链接 |
|---|---|---|
| **v1.9.10** | 1. Affiliate Workbench 的两个队列可独立按“最旧/最新”排序，并直接在队列行展示创作者标签。<br>2. Gateway 内存快照改为“内存超过阈值时触发”，而不是在 OOM 崩溃时才写入，该场景下原写入可能失败（原文截断）。 | [v1.9.10 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.10) |
| **v1.9.9** | 1. 修复 Gateway 崩溃后自动重放客服调度导致重启后饱和、陷入崩溃循环的问题；改为由 hourly sweep 重新投递这些会话。<br>2. 示例提案审核增加 Ignore 与 disposition 相关操作（原文截断）。 | [v1.9.9 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.9) |
| **v1.9.8** | 1. Affiliate Workbench 增加创作者和产品筛选器，修复筛选标签换行时对齐问题。<br>2. 产品目录搜索改为并发按需加载，提升速度。<br>3. Gateway 恢复后并行重放客服积压，支持可选 heap snapshot（原文截断）。 | [v1.9.8 Release](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.9.8) |

### 破坏性变更与迁移注意事项

版本说明中**没有明确标注破坏性变更**，但从行为变化可以推导出需要注意的点：

- **v1.9.9** 改变了 Gateway 崩溃后客服消息的重新投递机制

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*