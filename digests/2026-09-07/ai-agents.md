# OpenClaw 生态日报 2026-09-07

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-09-07 01:44 UTC

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

# OpenClaw 项目动态日报 — 2026-09-07

## 1. 今日速览

过去 24 小时项目保持高活跃度：共 500 条 Issue 更新（新开/活跃 376 条、关闭 124 条），500 条 PR 更新（

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告

**分析日期：2026-09-07**
**数据窗口：过去 24 小时（2026-09-06 ~ 2026-09-07）**


## 1. 生态全景

当前个人 AI 助手/自主智能体开源生态呈现出**高基数活跃与明显分层**的态势：头部项目单日 PR/Issue 更新达到数百量级（OpenClaw、Zeroclaw），而尾部项目已出现零活动周期（TinyClaw、EasyClaw）。安全加固成为多项目共识，ZeptoClaw 24 小时内完成 3 个安全修复合入、NanoBot 补强 SSRF 测试、Moltis 收紧 TLS 协商，表明生态正从功能扩张转向可靠性建设。MCP 协议继续巩固事实标准地位，NanoBot、IronClaw、ZeptoClaw 均在 MCP 集成层投入修复与增强。与此同时，架构级重构在多个项目中并行推进——NanoClaw 完成 provider 契约化重构、Zeroclaw 三大 RFC 持续讨论、OpenClaw 维持核心参照地位，生态已越过“能否运行”的验证期，进入“可管、可控、可观测”的平台化阶段。

## 2. 各项目活跃度对比

| 项目 | Issues（新/活跃） | PR 更新（合并/关闭） | Release | 健康度评估 |
|------|------------------|--------------------|---------|-----------|
| **OpenClaw** | 500 条更新（新开/活跃 376，关闭 124） | 500 条更新（详情未披露） | 未披露 | 极高活跃，核心参照系，但 PR 合并速率待观察 |
| **Zeroclaw** | 33（30 新/活跃，3 关） | 50（44 待合并，6 合/关） | 无 | 社区热情高涨，RFC 决策积压，合并通道拥堵 |
| **NanoClaw** | 2（1 关） | 16（8 关） | 无 | 高活跃，交付节奏健康，provider 架构升级完成 |
| **CoPaw** | 23（18 新/活跃，5 关） | 12（10 待合并，2 关） | 无 | 高频迭代，Bug 占比约 2/3，需关注稳定性 |
| **NanoBot** | 0 | 14（3 合/关，11 待合） | 无 | 开发活跃但合并偏慢，P1 修复待合入 |
| **ZeptoClaw** | 5（4 关） | 3（全部合入） | 无 | 安全修复高效闭环，依赖 PR 积压 3 个月 |
| **IronClaw** | 0 | 9（3 合/关，6 待合） | 无 | 平稳维护，以依赖升级为主，MCP/Assistant 修复待合 |
| **PicoClaw** | 4（3 活跃，1 关） | 2（1 待合，1 关） | 无 | 中等活跃，反馈质量高但响应滞后 |
| **Moltis** | 0 | 2（均待审） | 无 | 提交有质量，但评审缺位，活跃度偏低 |
| **LobsterAI** | 1（stale 被唤醒） | 0 | 无 | 低活跃，维护节奏放缓 |
| **TinyClaw** | — | — | — | 24 小时无任何活动 |
| **EasyClaw** | — | — | — | 24 小时无任何活动 |

## 3. OpenClaw 在生态中的定位

**核心参照系与生态上游。** OpenClaw 在命名体系、架构方向和社区规模上均构成该生态族群的基准。其单日 500 条 Issue + 500 条 PR 的更新量级是第二梯队项目（Zeroclaw 50 条 PR、CoPaw 12 条）的 10~40 倍，社区基数与维护者带宽具有断崖式领先优势。

**技术路线差异：** OpenClaw 作为核心参照，其动态被众多衍生项目追踪对齐——NanoClaw 的 provider 契约化、Zeroclaw 的会话运行时 RFC、CoPaw 的心跳可配置化，实质上都是在 OpenClaw 划定的架构框架内做不同方向的演进。相比之下，OpenClaw 自身的 PR/Issue 规模决定了它更适合被当作“事实标准”的提出者而非跟随者。

**需要说明：** OpenClaw 日报在输入中不完整，其具体 PR 主题、合并策略与版本节奏未能获取，本段定位基于其在生态中的“核心参照”角色及与其他项目的相对量级对比作出推断。待数据完整后可补充更精准的技术路线差异分析。

## 4. 共同关注的技术方向

### 4.1 模型故障转移与容错（高优先级）
| 项目 | 具体诉求 |
|------|---------|
| NanoBot | 主模型挂起后 FallbackProvider 无法触发（#5675，P2） |
| Zeroclaw | 不完整终态响应被误报为成功（#9421，有修复 PR） |
| CoPaw | 模型 fallback 配置交互改进（PR #7163 已合入） |

### 4.2 会话持久化与数据安全
| 项目 | 具体诉求 |
|------|---------|
| NanoBot | 会话持久化阻塞事件循环，需移出事件循环（#5580，P1） |
| PicoClaw | 自动压缩物理删除 session 记录，数据不可恢复（#3351，严重） |
| Zeroclaw | 会话运行时模型 RFC，生命周期归属重构（#9487） |
| ZeptoClaw | 子进程环境变量泄漏，API 密钥等机密暴露（#660，P0 已修复） |

### 4.3 子进程/沙箱安全与权限收敛
| 项目 | 具体诉求 |
|------|---------|
| ZeptoClaw | 3 个安全 PR 合入：env scrubbing、fail-closed agent_mode、超时终止进程树 |
| NanoBot | SSRF 防护缺少直接测试覆盖（#5678） |
| Zeroclaw | 沙箱文件系统策略 RFC（#6996，讨论 3 个月未定稿） |
| IronClaw | MCP 响应泄漏诊断无法区分拦截原因（#8077） |

### 4.4 MCP 生态建设
| 项目 | 具体诉求 |
|------|---------|
| NanoBot | MCP schema 字节预算（#5388）、MCP Apps 结果元数据保留（#5386） |
| IronClaw | MCP egress 诊断体系完善（#8077） |
| ZeptoClaw | MCP spawn 环境清理补完（#672） |
| CoPaw | MCP 相关修复持续推进（隐含于 PR 队列） |

### 4.5 上下文管理与可观测性
| 项目 | 具体诉求 |
|------|---------|
| NanoBot | TUI 页脚显示真实上下文占用（#5679 已合入）、MCP schema 预算 |
| NanoClaw | core-owned speed 属性，推理成本分级（#3592 已合入） |
| CoPaw | 模型回复从上下文丢失（Bug 类 Issue 最高频） |
| Zeroclaw | 会话模型与文件附件统一架构（#9487/#9488） |

### 4.6 心跳/定时任务可靠性
| 项目 | 具体诉求 |
|------|---------|
| NanoBot | Heartbeat 配置增强：isolatedSession + modelOverride（积压 2.5 个月） |
| Zeroclaw | Cron agent 无墙钟超时，in-flight 锁仅启动时清理（#9191） |
| CoPaw | 可配置 heartbeat 超时（PR #2134 已合入） |
| PicoClaw | 自动压缩触发数据重写（与心跳/压缩链路相关） |

总之：**模型容错、数据持久化、子进程安全、MCP 协议深水区**是当前生态的四大共同攻坚方向。

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|------|---------|---------|------------|
| **OpenClaw** | 全功能核心平台（会话、渠道、工具、沙箱） | 生态内所有衍生项目的参照系 | 超大社区驱动，Issue/PR 双 500 量级 |
| **Zeroclaw** | 架构规范化先行者 | 关注长期架构演进的核心开发者 | 三大 RFC 驱动（会话模型/文件架构/沙箱策略），决策队列可见 |
| **NanoClaw** | Provider 层平台化 | 多 provider 接入的集成开发者 | 契约驱动重构（4 个 contract PR），main 领先 release 119 commits |
| **NanoBot** | 执行工具与多 provider 容错 | 重度使用自动化和 TUI 的开发者 | Heartbeat/MCP 扩展多，P1 修复待合，测试体系完善 |
| **CoPaw** | 高频迭代 + 社区反馈闭环 | 多渠道 IM 用户（Telegram/飞书/Slack） | Bug 驱动开发，first-time contributor 活跃 |
| **ZeptoClaw** | 安全加固标杆 | 对安全合规敏感的生产用户 | Fail-closed 原则，P0/P1 修复当日合入，安全评审驱动 |
| **IronClaw** | MCP/Assistant 通道精修 | 配对共享通道场景的团队用户 | 依赖健康 + 边界场景修复，dependabot 为主要推送力 |
| **PicoClaw** | 嵌入式/低性能设备部署 | Sipeed 硬件用户、轻量化部署者 | 受限于硬件资源，Web UI 性能与存储设计是关键瓶颈 |
| **Moltis** | 协议兼容性与错误诊断 | 底层协议与 TLS/WebSocket 开发者 | 小而精的修复路线，RFC 8441 升级已在计划内 |
| **LobsterAI** | 多 agent 任务管理 | 网易有道生态内用户 | 低活跃，长期 Issue 积压 |
| **TinyClaw / EasyClaw** | — | — | 处于休眠/孵化状态 |

**关键差异总结：** 生态分化已从“同样是 OpenClaw 衍生品”进化为**按行业场景垂直切分**——嵌入式（PicoClaw）、安全合规（ZeptoClaw）、协议精修（Moltis）、渠道运营（CoPaw）、Provider 集成（NanoClaw）、架构咨询（Zeroclaw）。

## 6. 社区热度与成熟度

### 第一梯队：快速迭代期（高活跃、高交付）
- **OpenClaw**：量级碾压，核心事实标准
- **Zeroclaw**：社区参与度极高（RFC 评论 80+），但维护者决策带宽成瓶颈
- **CoPaw**：Issue/PR 双高，合入速度快，处于功能爆发期
- **NanoClaw**：8 条 PR/日合入，架构升级有条不紊，工程管理成熟

### 第二梯队：质量巩固期（稳步推进、修复为主）
- **NanoBot**：开发活跃，但 PR 审核队列积压（P1 修复等待合入），处在质量爬坡阶段
- **ZeptoClaw**：安全整改高效闭环，进入依赖卫生清理阶段
- **IronClaw**：依赖升级 + 边界修复，节奏平稳偏保守
- **PicoClaw**：社区反馈质量高（源码级

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报 — 2026-09-07

## 1. 今日速览

过去 24 小时 NanoBot 共发生 14 条 PR 更新（其中 3 条已合并/关闭，11 条待合并），无新版本发布，无 Issue 变动。开发侧保持活跃，主要集中在执行工具路径修复、TUI 上下文窗口显示修复、SSRF 测试补强、以及一批历史功能 PR 的持续推进；但 PR 合并速率偏低（3/14），且已有多条 PR 积压超过一个月，审核队列存在一定压力。Issue 侧零新增，社区反馈面较平静，项目整体处于"开发推进中、外部反馈暂歇"的状态。

---

## 2. 版本发布

今日无新版本 Release。

---

## 3. 项目进展

今日合并/关闭的 3 条 PR 分别覆盖 CI 效率、TUI 体验与技能系统修复：

- **CI 并行化测试**（[#5680](https://github.com/HKUDS/nanobot/pull/5680)，已关闭）：引入 pytest-xdist 并行运行 Linux 与 Windows Python 测试套件，同时将 Windows 进程兼容性测试拆分为独立 job，避免拖慢主流程；并启用 uv 依赖缓存、跳过非必要 job，预计将显著缩短 CI 耗时。
- **TUI 页脚显示上下文窗口占用**（[#5679](https://github.com/HKUDS/nanobot/pull/5679)，已关闭）：修复 TUI 页脚此前展示聚合 token 吞吐量、易误导用户的问题，改为显示测量到的上下文窗口占用百分比（如 `11% context`），提升交互可理解性。
- **Marketplace 技能允许覆盖内置技能**（[#5309](https://github.com/HKUDS/nanobot/pull/5309)，已关闭）：修复 Marketplace 将所有 loader 返回的技能标记为已安装、导致同名内置技能（如 github）的安装按钮被禁用、工作区副本无法安装的 bug，打通了技能覆盖链路。

此外，以下待合并 PR 若顺利合入，将推动项目在会话持久化、模型故障转移和 MCP 能力方面显著前进：

- **会话持久化移出事件循环**（[#5580](https://github.com/HKUDS/nanobot/pull/5580)，P1）：解决慢存储/文件锁阻塞事件循环、拖垮无关会话的问题，属性能与稳定性关键改进。
- **模型故障转移允许在 runner 超时后触发**（[#5675](https://github.com/HKUDS/nanobot/pull/5675)）：修复主模型挂起耗尽 runner 时限后，FallbackProvider 永远无法尝试健康备用模型的问题。

---

## 4. 社区热点

今日无 Issue 讨论，PR 评论数据也未公开，但从更新动态可见以下 PR 获得较多关注：

- **[#5682 fix(exec): resolve relative working_dir from workspace](https://github.com/HKUDS/nanobot/pull/5682)**（新开，@BenWituka）：修复 `ExecTool` 相对工作目录解析错误的问题。此前相对 `working_dir` 会被解析为相对进程 cwd，而非用户配置的 workspace，这直接影响依赖工作目录的自动化任务，是典型的用户可感知 bug，预计会引发较多使用者的共鸣。
- **[#5675 fix(providers): allow model failover after runner deadlines](https://github.com/HKUDS/nanobot/pull/5675)**（新开，@be-student）：关联 issue #5674，是模型容错场景的关键修复。主模型挂起导致 fallback 永远不被触达的问题，对依赖多模型冗余的生产用户而言风险较高，背后诉求是"主模型故障时系统必须自动切换到备用模型"的可靠性需求。
- **[#5679 fix(tui): show context window usage in footer](https://github.com/HKUDS/nanobot/pull/5679)**（已关闭）：虽是小型 UI 修复，但上下文窗口占用是 TUI 用户高频关注的信息，显示方式的修正直接回应了"信息失真"的使用痛点。

---

## 5. Bug 与稳定性

今日暂无新增 Issue 报告，但从 PR 维度可见以下修复与加固（按严重程度排列）：

| 严重程度 | 问题描述 | 状态 |
|---|---|---|
| P1 | **会话持久化阻塞事件循环**：慢存储或文件锁竞争会卡住事件循环，波及无关会话和运行时事件（[#5580](https://github.com/HKUDS/nanobot/pull/5580)） | 待合并 |
| P2 | **runner 超时导致模型故障转移失效**：主模型挂起后，FallbackProvider 永远无法触发备用模型（[#5675](https://github.com/HKUDS/nanobot/pull/5675)，修复 #5674） | 待合并 |
| P2 | **相对 working_dir 解析错误**：`ExecTool` 将相对路径解析到进程 cwd 而非 workspace（[#5682](https://github.com/HKUDS/nanobot/pull/5682)） | 待合并 |
| P2 | **SSRF 防护存在测试盲区**：`validate_resolved_url`（逐跳检查）与 `PinnedDNSAsyncTransport`（TOCTOU 防御）缺少直接测试覆盖（[#5678](https://github.com/HKUDS/nanobot/pull/5678)） | 待合并（测试加固） |
| - | **多个测试不稳定/环境依赖**：如 `test_catalog_bounds_failure_only_keys` 在 Windows 上 5 次运行失败 3 次，另有测试无法在原生 Windows 机器运行（[#5677](https://github.com/HKUDS/nanobot/pull/5677)） | 待合并（测试修复） |

---

## 6. 功能请求与路线图信号

今日虽无新 Issue，但多条待合并的 feature PR 折射出下一阶段的路线图方向：

- **Heartbeat 模块增强**（两条 PR 均由 @dajiaohuang 提交，来自 6 月，仍在队列中）：
  - [#4551](https://github.com/HKUDS/nanobot/pull/4551) — 增加 `isolatedSession` 配置（默认 `true`），允许心跳在执行时加入选定目标会话，复用对话上下文，并保留会话原有保留策略。这回应了"心跳任务需要上下文"的需求。
  - [#4549](https://github.com/HKUDS/nanobot/pull/4549) — 增加 `modelOverride` 配置，允许为心跳单独指定更廉价模型，降低定时任务的推理成本。这指向成本优化诉求。
- **MCP 模型可见性预算**（[#5388](https://github.com/HKUDS/nanobot/pull/5388)，@dajiaohuang）：为模型可见的 MCP 工具 schemas 增加 opt-in 字节预算，在保留全部内置工具和注册工具不变的前提下，从最新用户请求中确定性选择 MCP 子集，兼顾上下文节省与稳定性。
- **MCP Apps 结果元数据保留**（[#5386](https://github.com/HKUDS/nanobot/pull/5386)，@dajiaohuang）：将 MCP Apps 的工具元数据与结构化调用结果独立于模型可见文本保留，避免扩展模型上下文，同时确保 app-only 工具不进入模型可见注册表。
- **Langfuse 追踪支持 Codex Provider**（[#5520](https://github.com/HKUDS/nanobot/pull/5520)，@akinolur）：Codex 此前缺乏 Langfuse 追踪（仅 OpenAI-compatible provider 支持），该 PR 通过 Langfuse 原生 SDK 为每次真实 HTTP 请求（主请求与压缩请求分开）添加 tracing，提升可观测性。
- **CLI 增加 Desktop 目标选择**（[#5676](https://github.com/HKUDS/nanobot/pull/5676)，@Re-bin）：支持在 `nanobot` 与 `nanobot webui` 调用时按次选择 Desktop/Python 目标，同时保留原有 Python 行为与 `commands:app` 启动器。

综合来看，MCP 上下文管理与成本控制是当前最密集的功能投入方向，Heartbeat 配置灵活性次之，可观测性（Langfuse）与 CLI 交互体验也在推进。这些信号表明项目正从"能用"向"可管、可控、可观测"演进。

---

## 7. 用户反馈摘要

今日无 Issue 评论数据，以下反馈要点提炼自 PR 摘要中反映的真实使用场景：

- **工作目录解析令人困惑**（[#5682](https://github.com/HKUDS/nanobot/pull/5682)）：用户提供相对 `working_dir` 时，期望其相对 workspace 解析，但实际行为是相对进程 cwd，导致执行任务在不正确的目录中运行。这是一个直接影响自动化任务正确性的痛点。
- **模型故障转移不可靠**（[#5675](https://github.com/HKUDS/nanobot/pull/5675)）：用户配置了健康备用模型，但主模型挂起时 runner 会取消整条链路，备用模型永远没有机会执行。这对生产可靠性影响较大，用户明确诉求是"fallback 必须能兜底"。
- **TUI 上下文信息呈现失真**（[#5679](https://github.com/HKUDS/nanobot/pull/5679)）：页脚显示的 token 吞吐量/cache 计数无法反映当前请求的真实上下文占用，用户需要的是直观的上下文窗口使用率。
- **Marketplace 技能覆盖逻辑异常**（[#5309](https://github.com/HKUDS/nanobot/pull/5309)）：用户安装工作区技能时，系统误认为其已"安装"（因与内置技能同名），导致安装按钮禁用且无法升级到工作区副本，阻断自定义技能部署。
- **慢存储阻塞全局**（[#5580](https://github.com/HKUDS/nanobot/pull/5580)）：部分用户的会话存储较慢或出现文件锁竞争时，其他无关对话也会被卡住，属于多会话场景下的典型稳定性痛点。

---

## 8. 待处理积压

以下 PR 已开放较长时间且未见明确合并时间点，建议维护者关注：

| PR | 主题 | 开放时长（截至 2026-09-07） | 建议 |
|---|---|---|---|
| [#4551](https://github.com/HKUDS/nanobot/pull/4551) | Heartbeat `isolatedSession` 配置 | 约 2.5 个月（6-26 创建） | 功能完整且附带测试，建议尽快 review/合并 |
| [#4549](https://github.com/HKUDS/nanobot/pull/4549) | Heartbeat `modelOverride` 配置 | 约 2.5 个月（6-26 创建） | 与 #4551 同属 heartbeat 系列，建议一并处理 |
| [#5388](https://github.com/HKUDS/nanobot/pull/5388) | MCP 模型可见 schema 字节预算 | 约 1 个月（8-13 创建） | 涉及上下文窗口管理，建议确认与 #5386 的合并顺序 |
| [#5386](https://github.com/HKUDS/nanobot/pull/5386) | MCP Apps 结果元数据保留 | 约 1 个月（8-13 创建） | 同上 |
| [#5520](https://github.com/HKUDS/nanobot/pull/5520) | Codex Langfuse tracing | 约 2 周（8-24 创建） | 功能已有明确需求，建议安排 review |
| [#5580](https://github.com/HKUDS/nanobot/pull/5580) | 会话持久化移出事件循环 | 约 1.5 周（8-28 创建） | P1 优先级，建议优先处理 |

这些 PR 集中于 heartbeat 配置和 MCP 增强两大主题，长时间未合并可能导致分支冲突累积、维护成本上升，也阻碍社区贡献者的后续迭代。建议维护者尽快对这批积压 PR 进行集中 triage，或给出明确的排期反馈。

---

**总结**：NanoBot 今日开发活动活跃但合并节奏偏慢；会话持久化与模型故障转移两项 P1/P2 修复值得重点关注；MCP 与 Heartbeat 方向的长期积压 PR 是下一阶段的主要功能增量，也是潜在的路标信号。项目整体健康度良好，但 PR 审核队列需要疏导。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目日报 — 2026-09-07

## 1. 今日速览

过去 24 小时项目活跃度处于高位：33 条 Issue 更新（30 条新开/活跃，3 条关闭）、50 条 PR 更新（44 条开放待合并，6 条合并/关闭），无新版本发布。社区讨论重心集中在三大核心架构 RFC（会话运行时模型 #9487、文件与附件统一架构 #9488、沙箱文件系统策略 #6996），累计评论超过 80 条，但目前仍处于 Proposal/Revision 阶段，等待维护者决策。Bug 修复方面，新增的 heartbeat.target 复合键 Bug（#10670）在当天即获得修复 PR（#10671），响应迅速；同时多个高优先级 Bug（#9421、#9191）已有对应修复 PR 或正在跟进。需关注 44 条开放 PR 中仅 6 条完成合并/关闭，合并通道存在一定积压。

## 2. 版本发布

本期无新版本发布。

## 3. 项目进展

今日确认合并/关闭的 PR 中，已展示的有一条：

- **#10487 [CLOSED] `fix(channels/matrix): resolve transcription providers from live config`** — 修复 Matrix channel 从构造时的配置快照解析转写服务的问题，使得 `[providers.transcription.<type>.<alias>]` 类型化配置能够正确注册和路由。作者：@sebkraemer。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/10487)

值得关注的是，已合并/关闭数量为 6，其余 5 条未在展示列表中，但可确认其中有 2 个已关闭 Issue（#9575 Warm 连接改为 `/models`、#9653 wasi:http 信任平台根证书、#10572 WeCom 文档任务），这三项分别对应平台兼容性、安全性和文档完善，表明项目在多个维度持续收口。

此外，多个长驻大 PR 今日有维护者更新，说明合并挖掘仍在推进：

- **#9739** `feat(zerocode): multi-session panes with agent sidebar` — 维护者已完成有界重连和多会话生命周期修复，并合并了 master，原功能范围与作者署名保留。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)
- **#9283** `fix(tools): decompress gzip/brotli/deflate web_fetch responses` — 维护者修复了压缩输入预算检查并隔离了代理相关测试，正在等待作者确认。[链接](https://github.com/zeroclaw-labs/zeroclaw/pull/9283)

## 4. 社区热点

今日讨论最活跃的 Issue 集中在 RFC 架构设计和 Windows 兼容性：

1. **#9487 [RFC] Runtime-owned conversation sessions and transport surface adapters** — 34 条评论。第五次修订版，讨论会话生命周期归属与传输适配层，是当前最热议题。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)
2. **#9488 [RFC] Unified file and attachment architecture** — 27 条评论。第十次修订版，聚焦跨会话面的文件和附件统一建模。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)
3. **#6996 [RFC] Granular sandbox policy - filesystem restrictions** — 25 条评论。讨论应用层路径准入与 OS 沙箱后端（Bubblewrap/Landlock/Seatbelt）的策略对齐，创建于 5 月底，已持续三个月仍未定稿。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)
4. **#7462 [Bug] 74 test failures on Windows** — 19 条评论。Windows 11 中文环境（代码页 936）下测试套件 74 个失败，CI 因仅运行 Linux 而未捕获，反映跨平台测试覆盖缺口。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)
5. **#8692 [Tracker] Maintainer decision queue for RFCs** — 15 条评论。该跟踪器用于记录待维护者决策的 RFC/设计问题，其本身的持续更新也从侧面反映当前 RFC 决策存在排队。[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)

**诉求分析**：三个高热度 RFC（#9487/#9488/#6996）指向同一方向——核心运行时架构的系统性重构，社区参与度很高，但都处于"Proposed"状态、等待维护者拍板。叠加 #8692 决策队列的拥挤，能明显感到社区贡献热情与维护者处理带宽之间形成了张力。

## 5. Bug 与稳定性

按严重程度排列：

### S1 — 工作流阻断

| Issue | 描述 | 修复状态 |
|---|---|---|
| [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) | `heartbeat.target` 拒绝 `<type>.<alias>` 复合键，导致多实例 channel 场景下 daemon 无法启动 | 已有修复 PR [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671) |
| [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) | 预算超限的 Code/ACP turn 在会话恢复后丢失已流式输出的可见进度 | 暂无 PR |
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | daemon 运行时应用 Quickstart 配置可触发 Tokio worker 栈溢出 | 暂无 PR，状态 `r:needs-repro` |
| [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) | 不完整终态响应被报告为成功（provider 无可信最终答复但运行时仍显示成功） | 已有修复 PR [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent 任务无墙钟超时，in-flight 锁仅在进程启动时清理 | 暂无 PR |
| [#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617) | Anthropic `thinking.display = "updates"`

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报 — 2026-09-07

## 1. 今日速览

过去 24 小时项目活跃度中等，共有 4 条 Issue 更新（3 活跃/1 关闭）与 2 条 PR 更新（1 待合并/1 已关闭）。值得注意的是，两条创建于 8 月 30 日、带有 `stale` 标签的高质量 Bug 报告（#3351 持久化数据丢失、#3350 低性能设备 UI 卡顿）于昨日重新获得维护者关注并产生新评论，说明积压问题正在被逐步消化。PR 方面，QQ 频道多附件支持 PR（#1349）在经历近半年后关闭，可能已完成合并或另作处理；而捷克语翻译 PR（#3348）仍处于待合并的 stale 状态。此外，一条新的功能请求（#3369）昨日提出，要求支持 OpenCode Go 的 session 头传递。无新版本发布。

- 活跃度评估：**中等，稳定推进**。无新版本发布，但存在有深度的用户反馈与持续的国际化贡献。


## 2. 版本发布

过去 24 小时无新版本发布，暂无更新内容可报告。


## 3. 项目进展

**已合并/关闭 PR（1 条）：**

- [#1349 [CLOSED] feat(qq): support parsing and replying to more attachment types](https://github.com/sipeed/picoclaw/pull/1349)
  该 PR 为 QQ 频道渠道增加多种附件类型的解析与回复支持，包括 emoji 结构解析、语音/图片/视频/文件消息的收发处理，以及优先使用 Markdown 消息回复并在失败时降级的能力。PR 于 2026-03-11 创建，经过近 6 个月后于昨日关闭。虽然当前状态为 CLOSED 而非 MERGED，但该功能的完整实现与长期维护表明 QQ 渠道的多媒体能力大概率已合入主干或已确定替代方案。此关闭标志着该功能路线的阶段性收尾。

**待合并 PR（1 条）：**

- [#3348 [OPEN] i18n: complete Czech code wrap labels](https://github.com/sipeed/picoclaw/pull/3348)
  捷克语翻译补全，涉及代码换行标签的本地化。该 PR 已标记为 `stale`，自 8 月 29 日创建后已等待约一周，仍未获得 review/merge。国际化工作推进停滞，值得维护者关注。


## 4. 社区热点

两条最受关注的 Issue 均来自用户 @chentianxiong123，且都包含较深入的源码级分析：

- [#3351 自动压缩会物理删除 session 原始记录，失忆后历史无法找回](https://github.com/sipeed/picoclaw/issues/3351)｜评论 1｜更新于 2026-09-06
- [#3350 嵌入式/低性能设备下 Web UI 输入框打字严重卡顿](https://github.com/sipeed/picoclaw/issues/3350)｜评论 1｜更新于 2026-09-06

这两条 Issue 虽然在数量上只有 1 条评论，但用户的描述极其详尽，直接定位到了具体源码文件（`pkg/memory/jsonl.go` 的 `rewriteJSONL` 方法、Web UI 输入框渲染逻辑），属于高质量、有工程价值的深度反馈。两者于昨日同时被更新，说明维护者或社区成员已经开始回应。这两条 Issue 代表了用户对**数据安全**与**低端硬件可用性**的核心关切，是当前社区最实质的技术讨论。

另一条值得关注的是：

- [#675 [CLOSED] Add more LLM Provider Support](https://github.com/sipeed/picoclaw/issues/675)
  创建于 2026-02-23，昨日关闭，期间收获 7 条评论。该 Issue 要求支持更多 LLM Provider，关闭原因未在数据中体现，推测已部分落实或转移至其他追踪渠道。


## 5. Bug 与稳定性

按严重程度排列：

**高 — 数据丢失风险：**

- [#3351 自动压缩物理删除 session 原始记录，失忆后历史无法找回](https://github.com/sipeed/picoclaw/issues/3351)
  **状态：OPEN（stale），无 fix PR。** 核心问题：`JSONLStore` 并非纯 append-only 日志，`SetHistory → rewriteJSONL` 会物理覆盖整个 `.jsonl` 文件，导致压缩操作直接删减原始聊天记录。用户已通过直接查看 session 文件确认内容真的变少了，排除了前端显示问题。这是数据持久化层面的严重稳定性缺陷，直接影响用户对系统的信任。**建议优先处理。**

**中 — 性能问题：**

- [#3350 嵌入式/低性能设备下 Web UI 输入框打字严重卡顿](https://github.com/sipeed/picoclaw/issues/3350)
  **状态：OPEN（stale），无 fix PR。** 在 RV1106、RISC-V 等低性能硬件上，聊天记录越多，输入框越卡顿，每个字符都有明显延迟。该问题疑似与前端渲染聊天记录的性能优化不足有关。考虑到 PicoClaw 本身面向嵌入式场景（Sipeed 的硬件定位），此问题直接影响核心使用体验。**建议在下一版本重点验证低性能设备上的 Web UI 性能。**


## 6. 功能请求与路线图信号

- [#3369 [Feature] Add OpenCode Go session header support](https://github.com/sipeed/picoclaw/issues/3369)
  用户要求 OpenAI 兼容 provider 支持将内部 session ID 映射为 `x-opencode-session` 请求头，以满足 OpenCode Go 的协议要求。从描述看，PicoClaw 已具备 session ID 追踪能力，缺少的仅是映射层的桥接，改动范围可能较小，**有望在较短时间内纳入下一版本**。此请求同时也反映了用户在 OpenCode Go 生态中的实际使用场景。

- [#675 更多 LLM Provider 支持（已关闭）](https://github.com/sipeed/picoclaw/issues/675)
  这是笼统的 provider 扩展请求，关闭可能意味着已通过其他 PR 或配置方式满足，或者是 scope 太大被拆分追踪。建议维护者确认关闭原因，并在 release notes 或文档中向社区说明。

- **[#1349 QQ 频道多附件支持（已关闭）](https://github.com/sipeed/picoclaw/pull/1349)** 对应的能力扩展（emoji 解析、语音/图片/视频/文件收发）对 IM 渠道用户来说是实质性增强，建议确认其是否进入主干并补充进项目文档。


## 7. 用户反馈摘要

- **数据持久化信任危机（#3351）**：用户通过查看 `.jsonl` 文件实证了聊天记录被物理删减，指出 `AddMessage` 虽是 append-only，但压缩时的 `rewriteJSONL` 在"优化"的同时造成了不可逆的数据丢失。用户的核心诉求是**真正的持久化存储**——即压缩前后记录应可恢复，或压缩前自动备份原始数据。这反映出用户对"失忆后历史无法找回"的强烈不满，以及对当前存储设计"不够审慎"的批评。

- **低性能设备体验痛点（#3350）**：用户明确表示"按常理，输入框打字不应该受聊天记录长度影响"，对前端渲染效率提出了质疑。使用场景是嵌入式设备（RV1106、RISC-V），说明 PicoClaw 的轻量化部署是用户的真实需求，当前 Web UI 在该场景下存在性能短板。

- **代码换行标签本地化缺失（#3348）**：捷克语用户主动提交 PR 补全翻译，侧面反映 PicoClaw 已有一定规模的捷克语用户群，多语言支持需求真实存在，但维护者的 review 响应速度需要提升。

- **OpenCode Go 会话传递需求（#3369）**：用户对 PicoClaw 的 session 机制已有一定了解，其请求建立在现有能力之上，属于"协议适配"层面的增量需求，说明用户在生产环境中实际使用 PicoClaw 接入 OpenCode Go 工作流。


## 8. 待处理积压

**需优先关注：**

- [#3351 数据持久化缺陷](https://github.com/sipeed/picoclaw/issues/3351)｜OPEN（stale）｜创建 2026-08-30
  数据丢失问题已积压一周，无 assignee 与 fix PR，涉及用户信任，建议尽快排期。

- [#3350 低性能设备 UI 卡顿](https://github.com/sipeed/picoclaw/issues/3350)｜OPEN（stale）｜创建 2026-08-30
  与产品的嵌入式定位直接相关，建议评估前端渲染性能优化方案。

- [#3348 捷克语翻译 PR](https://github.com/sipeed/picoclaw/pull/3348)｜OPEN（stale）｜创建 2026-08-29
  长期未 review，建议维护者尽快完成合并或关闭，以免挫伤社区贡献者积极性。

**需确认去向：**

- [#675 LLM Provider 扩展请求（已关闭）](https://github.com/sipeed/picoclaw/issues/675) 建议补充关闭原因说明，让社区了解功能是否已落实。
- [#1349 QQ 频道附件支持 PR（已关闭）](https://github.com/sipeed/picoclaw/pull/1349) 建议确认功能是否已合入并在文档中体现，避免用户重复请求。

---

**总结**：PicoClaw 在社区反馈的深度上表现良好（用户愿意提供源码级分析），但数据持久化与低端设备性能两大问题悬而未决，是当前的健康度短板。建议近期集中资源处理 #3351 和 #3350，并维持对 i18n 贡献的响应速度，以保持社区生态的正向循环。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报 — 2026-09-07

## 今日速览

过去 24 小时项目保持高活跃度：16 条 PR 更新、2 条 Issue 更新，其中 8 条 PR 和 1 条 Issue 关闭/合并。核心信号是 **zvi-fried 主导的 providers 契约化重构系列在 9 月 6 日集中收尾**（7 条 CLOSED），标志着 NanoClaw 的 provider 架构正从"硬编码实现"转向"契约驱动"的平台化设计。社区侧，Slack 共享会话 bug 在报告当天即被修复，体现了快速响应能力；但 Telegram 入站静默死亡的严重稳定性问题仍悬而未决。当前 main 分支领先 v2.3.0 发布版 119 个 commit，过去 24 小时无新版本发布。

## 项目进展

当日关闭的 8 条 PR 构成两条清晰主线：

**1. Providers 契约化重构宣告阶段完成**

- [refactor(providers): declare the runtime provider contract (#3581)](https://github.com/nanocoai/nanoclaw/pull/3581)——将容器运行时 provider 接缝变为 core 实际调用的可执行契约，终结"provider 声称实现但无法验证"的问题。
- [refactor(providers): implement the codex provider contract (#3584)](https://github.com/nanocoai/nanoclaw/pull/3584)——Codex payload 绑定契约，同时保持对旧 core 的向后兼容。
- [refactor(providers): declare the host provider contract (#3585)](https://github.com/nanocoai/nanoclaw/pull/3585)——将宿主机的文件挂载与 spawn 逻辑从硬编码改为注册校验的契约面。
- [refactor(providers): declare the setup provider contract and install verifier (#3586)](https://github.com/nanocoai/nanoclaw/pull/3586)——补全 setup 阶段的契约声明与安装校验器。
- [refactor(providers): render provider instructions from core-owned canon (#3591 / #3727)](https://github.com/nanocoai/nanoclaw/pull/3591)——将 agent 指令文案收归 core 渲染。值得注意，宽度较小的 #3727 在 9/6 创建当天即关闭，而覆盖面更广的 #3591 同日关闭，提示团队将大规模 PR 拆分为窄变更集以加速审查。

**2. 新功能落地**

- [feat(groups): add a core-owned speed inference property (#3592)](https://github.com/nanocoai/nanoclaw/pull/3592)——新增 core 所有的 `speed`（推理速度档位）属性，与 `model`、`effort` 并列，支持通过 `ncl groups config update --speed <tier>` 配置，provider 上报各自的 vocabulary。这是性能分级能力的基础设施。

**3. 即时 bug 修复**

- [fix(slack): keep DM thread_ts for reply delivery (#3731)](https://github.com/nanocoai/nanoclaw/pull/3731)——修复 #3730，Slack 共享会话下 DM 回复丢失 thread 上下文的问题，报告到修复不足 24 小时。

整体评估：项目在平台架构层（provider 契约化）和渠道可靠性层（Slack 修复）双线推进，工程交付节奏健康。

## 社区热点

当日 Issue/PR 评论数和 👍 均为 0，社区讨论热度一般。值得关注的两个焦点：

- **[#3729 Connect the host to its community cell and manage perks in the browser（OPEN）](https://github.com/nanocoai/nanoclaw/pull/3729)**：由 @gavrielc 提出的核心团队功能 PR，将 Echo 和 Slack 设置迁移至浏览器门户，使用 WorkOS 统一登录，并支持在浏览器中管理社区 perks。这是 NanoClaw 从"本地 CLI 工具"走向"hosted 社区网络节点"的重要一步，覆盖面积大（channels + setup-installation + repository-maintenance），值得社区后续讨论。

- **[#3730 Slack shared session 语义 bug（CLOSED）](https://github.com/nanocoai/nanoclaw/issues/3730)**：来自 @bjsheppa 的 bug 报告，核心诉求是"shared"模式应当在不同 DM 消息间共享会话，实际却每次新开 thread 会话。虽然已修复，但暴露了会话模式语义在文档与实现之间的 gap——用户对配置项的行为预期与实际不符，是配置类功能容易踩的坑。

## Bug 与稳定性

按严重程度排列：

**严重：Telegram 入站消息可静默死亡数天 [#3728](https://github.com/nanocoai/nanoclaw/issues/3728)（OPEN，无 fix PR）**
- 现象：入站通道安静死亡约 4 天，host 保持 active、出站投递正常、定时任务继续运行，**唯独入站消息无人知晓地丢失**，且 logs 无任何成功/失败输出。
- 严重性分析：静默失败（fail-silent）比显式报错更危险——运维无法感知故障，用户消息在无提示的情况下丢失。v2.1.54 即存在，v2.3.0 复测确认仍在。
- 诉求信号：pollingLoop 无限制重试且不记录成功日志。社区期望至少做到"持久失败后告警降级 + 成功时周期性日志心跳"。

**中等：Slack shared 模式下每个 DM 都会新建 session [#3730](https://github.com/nanocoai/nanoclaw/issues/3730)（CLOSED，已由 #3731 修复）**
- 用户配置 `session_mode: "shared"` 期望所有顶层 DM 共享同一会话，实际表现与预期不符。作者在 main@80cf897 上验证了相关代码相对 v2.3.0 未变化，说明该问题在 v2.3.0 中同样

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报 — 2026-09-07

## 1. 今日速览

过去 24 小时 IronClaw 项目共产生 9 条 PR 更新，其中 3 条已合并/关闭（均为依赖升级），6 条仍在待合并状态；无新 Issue 报告，无新版本发布。整体活跃度中等偏稳定，工作重心集中在 **依赖批量升级** 和 **MCP/Assistant 通道的修复** 上。两个功能修复 PR（#8077、#8076）的提出表明项目在完善 AI 助手与 MCP 集成层的边界场景处理，项目处于健康的维护迭代节奏。

## 2. 版本发布

无新版本发布。

## 3. 项目进展

今日合并/关闭的 3 个 PR 全部为依赖自动升级，属于持续的依赖健康维护：

- **#8049** — `everything-else` 组依赖 19 项批量升级（uuid、base64、toml 等），已关闭，降低旧版本依赖带来的潜在安全/兼容风险
  https://github.com/nearai/ironclaw/pull/8049
- **#7835** — GitHub Actions 组 5 项升级（claude-code-action、setup-node 等），已关闭，保持 CI 流水线工具链更新
  https://github.com/nearai/ironclaw/pull/7835
- **#7020** — `tokio-tungstenite` 从 0.29.0 升至 0.30.0，已关闭，WebSocket 底层库进入新版本线
  https://github.com/nearai/ironclaw/pull/7020

此外，两个值得关注的功能修复 PR 今天进入待合并队列（详见下文 Bug 修复部分），涉及 MCP 响应泄漏诊断和共享通道断连区分，正在补齐 AI 助手在实际部署中的边界问题。

## 4. 社区热点

所有 PR 评论数均为 0（dependabot 机器人提交为主），未出现高讨论度的 Issue/PR。相对更受关注的是两个人工提交的修复 PR：

- **#8077** — fix(mcp): classify response leak diagnostics，解决 MCP 出口诊断中宿主阻塞安全与 MCP 可见原因冲突的问题，涉及宿主 API 层的哨兵值统一
  https://github.com/nearai/ironclaw/pull/8077
- **#8076** — fix(assistant): distinguish disconnected shared channels，区分配对用户断开的共享通道与未配对账户，并更新 Slack 能力描述文档
  https://github.com/nearai/ironclaw/pull/8076

这两个 PR 均关联合伙人/配对共享通道的边界场景，侧面反映出社区用户在真实使用中遇到了 **配对断开时误导性提示** 的问题。

## 5. Bug 与稳定性

今日没有新 Bug 类 Issue 上报，但两个针对性修复 PR 正在处理中，按严重程度排列：

| 严重程度 | 问题描述 | 修复 PR | 状态 |
|---------|---------|---------|------|
| 中 | MCP 响应泄漏被宿主阻塞时，MCP 侧无法区分 "泄漏被拦截" 与其他拒绝原因，影响诊断准确性 | #8077 | 待合并 |
| 中 | 配对用户的共享频道断开时，系统未区分 "未配对" 与 "已配对但断开"，导致用户收到误导性错误引导 | #8076 | 待合并 |

两个问题的修复方案均已就绪并提交，进入评审/合并阶段，预计近期合入主分支。

## 6. 功能请求与路线图信号

今日无新功能请求类 Issue。从 PR 方向来看，以下两点可能是下一版本的候选更新：

- **MCP egress 诊断体系完善** — #8077 将 `response_leak_blocked` 哨兵集中到 `ironclaw_host_api::http` 层，并让 MCP lane 单独分类，说明项目在统一宿主安全策略的同时，希望保留各协议层的差异化可观测性
- **配对共享通道的状态模型优化** — #8076 在 product、adapter、OpenAI-compatible 三层统一了拒绝分类，暗示共享通道的断连状态将作为头等公民纳入 Assistant 核心模型

## 7. 用户反馈摘要

由于今日无 Issue 评论数据，无法获得直接的用户反馈文本。从间接证据推断：

- 存在真实用户在 **配对共享通道** 场景下遇到困惑，促使贡献者 @be-student 提交了 #8076 以明确区分"未配对"和"已配对但断开"两种情况，并附带了 Slack 能力文档更新，说明该问题影响了实际使用体验
- #8077 的提交表明 MCP 集成场景下，开发者在调试时遇到了 **泄漏阻断原因无法区分** 的诊断盲区

有更多的数据将能给出更完整的用户反馈分析，目前只能提供上述推断。

## 8. 待处理积压

以下开放 PR 已持续较长时间，值得维护者关注：

- **#7834** — `wasm` 组依赖升级（wasmtime、wit-component 等），**已开放 15 天**（自 2026-08-23），风险标记为 medium，体积标记为 L，建议尽快处理。Wasmtime 等核心组件的版本滞后可能积累兼容性债务
  https://github.com/nearai/ironclaw/pull/7834

其余 3 个新的 dependabot 开放 PR（#8080、#8078、#8079）创建时间均为 2026-09-06，属于正常的队列等待状态，暂不构成积压。

---

*本日报由 AI 自动生成，数据来源：github.com/nearai/ironclaw，统计窗口：2026-09-06 ~ 2026-09-07*

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报 — 2026-09-07

## 1. 今日速览

过去24小时内，LobsterAI 项目活跃度处于**低位**：仅 1 条 Issue 更新（#1068 被标记为 stale 后由作者补充评论），PR 数量为零，无新版本发布。该 Issue 是一条自 2026-03-30 起长期未关闭的 Bug 报告，今日被唤醒，说明维护者对积压问题的响应仍存在较大滞后。整体来看，项目社区讨论频率低，公开开发活动几近停滞，需要警惕维护节奏放缓对贡献者信心的影响。

---

## 2. 版本发布

无新版本发布。

---

## 3. 项目进展

过去24小时内无 PR 合并或关闭，也无新 PR 提交。项目代码层面今日无可见的前进动作。

---

## 4. 社区热点

今日仅有一项活跃讨论：

**[#1068 [OPEN] [stale] Bug: 删除当前的agent，切换到别的agent之后需要自动刷新任务列表](https://github.com/netease-youdao/LobsterAI/issues/1068)**

- 作者：@OnePieceJoker
- 创建于 2026-03-30，最后更新于 2026-09-06（即今日被激活）
- 评论：1

该 Issue 被系统标记为 stale 后，作者今日补充了评论（推测为催办或补充信息），重新将问题带回维护者视线。问题本身是**功能性 Bug**，与 agent 删除后的 UI 状态同步有关，触达的是多 agent 工作流场景下的基本可用性。其关注度虽不算高，但长期搁置的状态反映了维护者对中低优先级问题的响应速度不足。

---

## 5. Bug 与稳定性

| 严重程度 | Issue | 描述 | 状态 |
|---------|-------|------|------|
| 中 | [#1068](https://github.com/netease-youdao/LobsterAI/issues/1068) | 删除当前 agent 后切换到其他 agent（或仅剩 main agent 时），任务列表未自动刷新，导致任务内容不显示 | 开放中，**无 fix PR** |

**分析**：该 Bug 影响 agent 删除后任务列表的实时刷新，属于 UI 状态管理缺陷，不涉及数据丢失或崩溃，但有损核心使用体验。问题从 3 月提交至今已近半年，期间项目很可能经历了多个版本迭代，却仍未修复，提示该路径的测试覆盖可能不足。

---

## 6. 功能请求与路线图信号

今日无新的功能请求提交。已有 Issue #1068 虽为 Bug 报告，但修复它需要完善 agent 切换后的任务列表刷新机制，这实际上是一个**前端状态同步能力**的增强点。考虑到该问题已存在较长时间，建议项目维护者在下一版本中将其纳入修复范围，并补充多 agent 切换场景的回归测试。

---

## 7. 用户反馈摘要

来自 #1068 的反馈揭示了以下痛点：

- **用户场景**：在多 agent 工作流中删除当前 agent 并切换到 main agent，期望任务列表自动更新，但实际界面仍停留在旧状态。
- **情感倾向**：作者对问题描述清晰、附有截图，并在 stale 标记后主动回归评论，说明**该问题对其实际使用造成了持续阻碍**，用户对修复有明确期待。
- **未被满足的需求**：agent 生命周期管理（增删、切换）需要与任务视图做完整的联动刷新，目前这一联动缺失。

---

## 8. 待处理积压

🔴 **[#1068 Bug: 删除当前的agent，切换到别的agent之后需要自动刷新任务列表](https://github.com/netease-youdao/LobsterAI/issues/1068)**

- 状态：OPEN，已存活 161 天（自 2026-03-30）
- 曾因长期无活动被标记为 stale，说明**超过设定时间阈值未见维护者回复或处理**
- 作者今日回访评论，问题依旧未被解决

考虑到该 Issue 的长期积压和 stale 标记，建议维护者优先确认其是否仍可复现、分配负责人并给出明确的时间表；若确认为低优先级，也应正式回复用户说明排期，避免 contributors 因沉寂而流失。

---

> **总结**：LobsterAI 今日开发活动几乎为零，唯一的 Issue 更新暴露了积压问题的响应滞后。项目健康度偏弱，维护者需要尽快对 #1068 等长期未关闭问题作出回应，以维持社区对项目活跃度的基本信任。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-07）

## 1. 今日速览

过去 24 小时内，项目无新 Issue 产生，也无版本发布，活跃度主要来自两个已提交待合并的 Pull Request（#1261、#1260）。这两个 PR 分别针对 TLS 协议协商与 shell 缺失错误报告提出修复，均来自同一贡献者 @be-student。整体看，社区提交活跃但维护者评审/合并动向不明显，项目处于平稳的“提交待审”阶段。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日没有 PR 被合并或关闭，代码库本身无实际变更。但有两个新 PR 进入待审队列，分别改进了两个已知问题：

- **TLS ALPN 限制**（[#1261](https://github.com/moltis-org/moltis/pull/1261)）：PR 将 TLS 场景下广告的 ALPN 协议收敛到仅 HTTP/1.1，避免在未支持 RFC 8441 WebSocket 升级时产生协商歧义，并同步更新了 TLS 配置测试与贡献者文档。对应修复 issue #245。
- **shell 缺失错误准确化**（[#1260](https://github.com/moltis-org/moltis/pull/1260)）：PR 通过结合工作目录来分类 `NotFound` 错误，使 `PATH` 中缺少 `sh` 时不再被现有目录掩盖，并补充了相关测试。对应关闭 issue #279。

若这两个 PR 被合并，将提升协议兼容性与错误诊断的准确性。

## 4. 社区热点

今日无高互动议题。两个 PR 均无评论和 👍，讨论热度较低。可能的原因是：
- 这些修复属于细节性、专业性较强的领域，社区关注面较窄；
- PR 提交时间较短，尚未引起广泛讨论。

建议观察后续维护者与贡献者的评论，以判断社区对这两项修复的认可度。

## 5. Bug 与稳定性

今日报告的 Bug 均为已有 issue 的修复 PR 所指向，没有新发现的回归或崩溃。

| 严重程度 | 问题 | 修复 PR | 说明 |
|---|---|---|---|
| 中 | WebSocket 在 TLS 下的 ALPN 协商不兼容（issue #245） | [#1261](https://github.com/moltis-org/moltis/pull/1261) | 限制 ALPN 为 HTTP/1.1，规避协议升级冲突 |
| 中 | 缺少 shell 时错误报告不准确（issue #279） | [#1260](https://github.com/moltis-org/moltis/pull/1260) | 根据工作目录区分 `NotFound` 来源，准确报告 `sh` 缺失 |

两个修复均附带测试并通过，安全性较高。

## 6. 功能请求与路线图信号

虽然没有新的显式功能请求，但 PR #1261 的表述明确给出了路线图信号：

> “...until RFC 8441 WebSocket upgrades are supported”

这暗示项目计划在未来支持 RFC 8441 WebSocket 升级，当前先通过 ALPN 限制保证兼容性，待 RFC 8441 实现后即可开启相应能力。这一信号可作为后续版本规划的重要参考。

另外，PR #1260 对错误报告的精化，也反映了项目在提升可观测性和开发者体验方面的努力。

## 7. 用户反馈摘要

今日无 Issue 评论或 PR 评论，暂无直接用户反馈可提取。从贡献者 @be-student 的 PR 描述中，可以观察到其希望修复协议兼容性和错误报告精确性的意图，这在一定程度上代表了使用者遇到的实际困扰（如 TLS WebSocket 升级失败、shell 缺失时定位困难）。

建议维护者主动收集 PR 讨论区的反馈，以便评估修复方案的实际效果。

## 8. 待处理积压

当前需要维护者重点关注的是两个待合并 PR：

- [#1260 fix(exec): report missing shell accurately](https://github.com/moltis-org/moltis/pull/1260)
- [#1261 fix(tls): restrict ALPN to HTTP/1.1](https://github.com/moltis-org/moltis/pull/1261)

两者均对应已存在的 issue（#279、#245），且已通过测试。若长期未评审，可能导致积压增加。此外，建议维护者对这两份 PR 进行 Code Review，并给出明确合并或修改意见，以维持良好的社区贡献循环。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-09-07）

## 1. 今日速览

过去 24 小时项目保持高活跃度：23 条 Issue 更新（18 条新开/活跃、5 条关闭），12 条 PR 动态（10 条待合并、2 条关闭），无新版本发布。值得关注的是，Bug 类 Issue 占比约三分之二，其中“模型回复从上下文丢失”“任务停止后仍在执行”“同步调用阻塞事件循环”等稳定性问题最为集中；同时社区贡献明显上升，多位 first-time contributor 提交了针对 Telegram/飞书/409 报错等痛点的修复 PR。整体判断：项目正处于高频迭代与社区反馈加速闭环的阶段，但需要优先处理上下文完整性与任务生命周期管理方面的核心缺陷。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 项目进展

过去 24 小时有 2 条 PR 关闭（含合并）：

- [PR #7163 feat: refine session thinking and model management](https://github.com/agentscope-ai/QwenPaw/pull/7163)（更新于 09-07）— 涉及会话思考过程与模型管理的优化，包括 Agent 名称内联编辑、模型 fallback 配置交互改进等。
- [PR #2134 feat(heartbeat): Support configurable heartbeat timeout](https://github.com/agentscope-ai/QwenPaw/pull/2134)（更新于 09-06）— 为 heartbeat 增加可配置超时，呼应近期多个心跳相关任务卡死问题。

此外，10 条待合并 PR 中有多条的指向性非常明确，直接回应当前社区最痛的问题，值得关注：

- [PR #7577 fix(console): enqueue follow-up messages when chat task is running](https://github.com/agentscope-ai/QwenPaw/pull/7577) — 修复 #7559 的 409 报错，改为消息排队。
- [PR #7578 fix(tool_calls): log exceptions in coordinator _drain()](https://github.com/agentscope-ai/QwenPaw/pull/7578) — 修复 #7572 的异常栈被吞问题。
- [PR #7590 fix(telegram): render Markdown tables as `<pre>` instead of raw pipes](https://github.com/agentscope-ai/Qwen

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目日报 — 2026-09-07

## 1. 今日速览

今日项目活跃度较高，核心进展集中在**安全加固**方面：两项 P0 级安全修复 PR（#672、#671）在 24 小时内完成创建并合并，解决了子进程环境变量泄漏和 agent_mode 不安全回退两大关键问题。同时，一条 P1 级运行时安全修复（#645）也已合并，表明维护者正在系统性推进安全架构评审的整改工作。5 条 Issues 中关闭 4 条，其中 3 条为安全相关，可见近期工作重心明显偏向安全与稳定性。但 5 条 dependabot 依赖更新 PR 自 6 月以来积压未合并，存在依赖维护的隐性压力。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日共合入 3 个安全修复 PR（全部由 @qhkm 完成），对项目安全性有显著提升：

- **[PR #672](https://github.com/qhkm/zeptoclaw/pull/672) — fix(security): scrub inherited env in plugin/MCP spawn sites（已关闭/合并）**：修复 P0 #660，解决插件和 MCP 服务器子进程继承完整父进程环境、导致 API 密钥等机密泄漏的问题。此 PR 补齐了剩余三个未清理的 spawn 站点，与运行时级清理形成闭环。
- **[PR #671](https://github.com/qhkm/zeptoclaw/pull/671) — fix(security): fail closed on invalid agent_mode（已关闭/合并）**：修复 P0 #659，使非法 agent_mode 值不再回退到最高权限的 Autonomous 模式，而是安全地降级为 Assistant 并发出警告，彻底消除权限误配置时的安全风险。
- **[PR #645](https://github.com/qhkm/zeptoclaw/pull/645) — fix(runtime): scrub subprocess secrets and reap timed-out process trees（已关闭/合并）**：修复 #644，解决运行时 shell 命令继承 ZeptoClaw 完整环境变量以及超时后未终止子进程树的问题，同时覆盖 Docker 容器场景。

至此，此前安全评审中识别的 P0 级问题已基本得到修复，项目安全态势明显改善。同时，[Issue #646](https://github.com/qhkm/zeptoclaw/issues/646) 的关闭表明 CI 中的 Clippy 和 cargo-deny 检查将恢复，进一步提升工程质量保障。

## 4. 社区热点

今日讨论热度最高的条目为 **[Issue #646](https://github.com/qhkm/zeptoclaw/issues/646) — chore(ci): restore Clippy and cargo-deny checks on current toolchain**（已关闭，3 条评论）。该 Issue 暴露了两个基准 CI 失败：Rust 1.97.1 在现有 channel/provider/插件代码中报告了 5 个新的 Clippy 警告，且 cargo-deny 拒绝了两个存在已知漏洞的依赖版本（quick-xml 0.39.2 和 lopdf 0.40.0）。社区关注点集中在**工具链升级带来的新警告**和**上游依赖漏洞的响应策略**上，反映了开发者对供应链安全和 CI 稳定性的重视。

另一值得关注的讨论是 **[Issue #664](https://github.com/qhkm/zeptoclaw/issues/664) — Delegated-agent capability inheritance（开放，1 条评论）**，讨论了委托子代理应继承策略而非全量能力的问题，这属于架构演进方向的讨论，体现了社区对 Fine-grained 授权控制的兴趣（展开见第 6 节）。

## 5. Bug 与稳定性

今日相对重要的 bug 及安全问题如下，按严重程度排列：

- **[Issue #660](https://github.com/qhkm/zeptoclaw/issues/660) — Centralize child-process env scrubbing across all spawn sites（P1-critical / P0 安全）**：已关闭。多个代码位置构造子进程时未验证环境清理逻辑，可能导致凭据泄漏。→ 已由 [PR #672](https://github.com/qhkm/zeptoclaw/pull/672) 修复。
- **[Issue #659](https://github.com/qhkm/zeptoclaw/issues/659) — Fail closed on invalid agent_mode（P1-critical / P0 安全）**：已关闭。未知 mode 字符串会回退到最高权限 Autonomous，属于权限配置反模式。→ 已由 [PR #671](https://github.com/qhkm/zeptoclaw/pull/671) 修复。
- **[Issue #644](https://github.com/qhkm/zeptoclaw/issues/644) — scrub subprocess environments and terminate process trees on timeout（P1-critical）**：已关闭。子进程继承完整父环境导致敏感凭据暴露，且超时后未组合终止进程树。→ 已由 [PR #645](https://github.com/qhkm/zeptoclaw/pull/645) 修复。
- **[Issue #646](https://github.com/qhkm/zeptoclaw/issues/646) — restore Clippy and cargo-deny checks（P1-critical / 依赖）**：已关闭。工具链升级引入新 Clippy 警告，cargo-deny 识别到 quick-xml 和 lopdf 的已知漏洞版本。

No new crashes or regressions reported in this window.

## 6. 功能请求与路线图信号

值得重点关注的新功能请求为：

- **[Issue #664](https://github.com/qhkm/zeptoclaw/issues/664) — Delegated-agent capability inheritance（开放，P2-high）**：请求为 delegate 工具引入**策略继承机制**——子代理的能力边界不得超过父代理。当前实现（`src/tools/delegate.rs`）已有子代理会话、并发执行和递归阻断，但缺少策略继承，存在子代理权限膨胀的风险。该 Issue 标记为 P2-high，结合近两日对安全机制的系统性加强，**此功能有较大概率被纳入下一开发周期**，作为安全架构的进一步深化。

此外，5 条 dependabot 依赖更新 PR（见第 8 节）虽为自动维护，也在持续等待合并，表明依赖新鲜度是当前路线图中相对薄弱的环节。

## 7. 用户反馈摘要

今日评论活跃度较低（整体评论数仅 4 条），可获取的反馈主要来自维护者 @qhkm 的自我复查与架构评审总结，暂未出现大量外部用户反馈。从 Issue 文本可提炼出用户在**安全配置验证**与**权限控制一致性**两个层面的关注：

- 用户关心的一个核心痛点是：**文档中声称的安全措施在实际代码中是否可验证**——例如 #660 明确指出"文档中的环境清理不可验证（unverifiable）"，反映了对声明与实现一致性的高要求。
- 另一关注点是 **失败模式的安全性**——#659 指出配置错误时的行为（静默升级到最高权限）是"安全的反面"，用户期望默认失败模式是关闭、保守而非放开。
- 评论数量本身较少，曾反馈的本地 CI 失败问题已在 #646 中由维护者主动处理并关闭，可以认为该问题得到及时回应。

整体来看，社区反馈呈现出"更严苛的安全预期"态势，对权限收敛和默认安全的要求明显高于常规功能开发。

## 8. 待处理积压

以下依赖更新 PR 自 2026-06-03 创建以来已积压 3 个月未合并，均无评论和冲突标记，建议维护者关注：

- **[PR #627](https://github.com/qhkm/zeptoclaw/pull/627)** — chore(deps): bump serde_json from 1.0.149 to 1.0.150
- **[PR #625](https://github.com/qhkm/zeptoclaw/pull/625)** — chore(deps): bump rpassword from 7.4.0 to 7.5.2（修复 Unicode 解析问题）
- **[PR #623](https://github.com/qhkm/zeptoclaw/pull/623)** — chore(deps): bump tokio from 1.52.1 to 1.52.3
- **[PR #620](https://github.com/qhkm/zeptoclaw/pull/620)** — chore(deps): bump scraper from 0.26.0 to 0.27.0
- **[PR #617](https://github.com/qhkm/zeptoclaw/pull/617)** — chore(deps): bump tower-http from 0.6.10 to 0.6.11

这些更新多包含 bug fix（如 rpassword 的 Unicode 解析修复、tokio 的修复版本），长期搁置可能导致依赖风险累积。考虑到今日 #646 已暴露依赖漏洞问题，**建议尽快对这批依赖升级进行批量合并或关闭**，以降低供应链风险。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*