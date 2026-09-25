# AI CLI 工具社区动态日报 2026-09-25

> 生成时间: 2026-09-25 02:22 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-25）

**数据窗口**：2026-09-24 ~ 2026-09-25 各主流 AI CLI 工具 GitHub 社区动态

---

## 1. 生态全景

当前 AI CLI 工具已进入**高频迭代与稳定性并重的竞争阶段**：OpenAI Codex 24 小时内连发 7 个 Rust 版本，Qwen Code 发布 v0.24.5 稳定版并推进 Managed Runtime 架构，Claude Code 维持 v2.1.x 周级更新节奏；头部工具均在向**多代理协作、沙箱安全、会话生命周期管理**三大方向深挖。与此同时，Windows 平台稳定性、TUI 渲染崩溃、认证令牌失效等基础问题仍大面积困扰用户，说明行业整体仍处于"功能扩张快于体验打磨"的早期阶段。Kimi Code 的低活跃度则表明该领域已出现明显的工具分层。

---

## 2. 各工具活跃度对比

| 工具 | Releases | 热点 Issues | PRs | 迭代特征 |
|---|---|---|---|---|
| **Claude Code** | 1（v2.1.282） | 10 | 7 | 稳定周级迭代，功能增量为主 |
| **OpenAI Codex** | 7（6×alpha + 1×patch） | 10（另有 50 条活跃 Issue） | 10 | 密集修复合入，冲刺 0.158.0 正式版 |
| **Gemini CLI** | 1（nightly） | 6（数据截断） | 数据不完整 | 日更 nightly，Agent 架构调整期 |
| **GitHub Copilot CLI** | 2（v1.0.89-2/-3） | 10 | 1 | 补丁级维护，功能迭代放缓 |
| **Kimi Code CLI** | 0 | 0 | 1 | 空窗期，仅安全依赖升级 |
| **OpenCode** | 0 | 10+ | 10+ | PR 密集但无 Release，核心稳定性攻坚 |
| **Qwen Code** | 1（v0.24.5）+ SDK/Desktop 同步 | 10 | 10 | 稳定版 + 高优 Bug 修复并行 |

> 注：Gemini CLI 原始日报在 Issue #6 处截断，PR 数据缺失，对比时请留意。

**热度排序（按 Issue 讨论量）**：OpenCode（单 Issue 43 评论）≈ OpenAI Codex（单 Issue 112 评论）＞ Qwen Code（17 评论）＞ Claude Code（42 评论）＞ Copilot CLI（11 评论）＞ Gemini CLI（13 评论）＞ Kimi Code（无）。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 平台稳定性** | Codex、Qwen、Copilot、OpenCode、Claude | App 冻结（Codex #20214）、ConPTY 进程泄漏 347 个/2.8GB（Qwen #11303）、多显示器溢出（Codex #25826）、粘贴失效（OpenCode #38455、Copilot #3534）、桌面连接卡死（Claude #96918） |
| **沙箱与权限模型** | Claude、Codex、Gemini | 沙箱内 GPU 不可用（Codex #3141，62👍）、禁止输入密码破坏测试流程（Claude #78160）、excludedCommands 无效（Claude #95813）、零依赖 OS 沙箱提案（Gemini #19873） |
| **会话稳定性与认证生命周期** | Claude、Copilot、Qwen | 云会话离线/握手超时（Claude #45937/#96911）、进程级令牌失效无法恢复（Copilot #4929）、后台输出静默丢失（Qwen #11119）、Remote-SSH 下 EPIPE（Qwen #12416） |
| **多代理协作与通信** | Gemini、OpenCode、Qwen | 子代理误报成功（Gemini #22323）、子代理间无法直连/无法向父代理提问（OpenCode #38963/#38964）、父代理重复执行已完成工作（Qwen #8097） |
| **上下文管理与压缩** | Claude、Codex、OpenCode、Gemini | token 提醒破坏 prompt-cache（Claude #90018）、工具调用超出 15MiB 消息预算（Codex #47957）、压缩阈值从固定 20k/32k 改为动态 85%（OpenCode #51235）、AST 感知读取降低 token 噪音（Gemini #22745） |
| **TUI/CLI 交互体验** | Claude、Codex、Qwen、OpenCode | 输入框失去响应（Claude #96931）、无法隐藏工具输出（Codex #18396，40👍）、React 渲染死循环崩溃（Qwen #11500）、粘贴与多语言支持（OpenCode #38455） |
| **MCP 生态完善** | Codex、Copilot、Qwen、Claude | MCP 调用路径重构（Codex #47981）、OAuth scopes 支持（Copilot v1.0.89-2）、规则授权碰撞修复（Qwen #12531）、权限弹窗缺乏上下文（Claude） |
| **成本与用量透明化** | Claude、Codex、OpenCode | token 统计口径不统一、5 小时用量窗口显示不一致、上下文百分比计算失真（OpenCode #51250） |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业级权限治理、Cowork 云会话、遥测/可观测性 | 企业团队、重视合规与审计的开发组织 | 一体化的权限门控 + 云端会话绑定，功能丰富但自由度受限 |
| **OpenAI Codex** | Rust 原生性能、严格沙箱安全、新模型/套餐快速跟进 | 追求性能与安全隔离的开发者，AI/ML 从业者 | Rust 全量重写，沙箱安全加固优先（如 .git 跨可写根保护），alpha 高频迭代 |
| **Gemini CLI** | 子代理目标驱动架构、模型原生能力释放、AST 感知探索 | 依赖 Gemini 3 模型能力的深度用户 | 以子代理调度为核心，探索零依赖沙箱 + 意图路由的轻量安全方案 |
| **Copilot CLI** | GitHub 生态深度绑定、上下文记忆（store_memory）、桌面应用 | GitHub 重度用户、企业 Copilot 订阅者 | 与 github-mcp-server 联动，会话管理功能先行；但近期迭代节奏明显放缓，OOM 问题突出 |
| **Kimi Code** | SSH/远程基础设施（pykaos、asyncssh） | Kimi 生态开发者，规模较小 | 当前处于维护期，仅做依赖安全升级，无新功能信号 |
| **OpenCode** | 开源社区驱动、ACP 协议、终端兼容性 | 开源爱好者、多模型 BYOK 用户、Zed 等 ACP 客户端用户 | 通过插件系统与钩子（如 `model.select`）实现高度可定制，社区研究导向强（RLM 上下文外部化） |
| **Qwen Code** | Batch API 工作流、Managed Runtime 契约、双桌面架构迁移 | VS Code 用户、需要批处理与远程开发的团队 | 从 Electron 迁移到 Tauri（desktop-shell → desktop），推进托管运行时 v2 规范与 Java SDK 配套 |

---

## 5. 社区热度与成熟度

**成熟稳定型**
- **Claude Code**：v2.1.x 迭代有序，Issue 反馈聚焦在云会话与权限模型的"体验摩擦"而非基础故障，说明核心 CLI 已趋成熟；但 2.1.281→282 的 TUI 输入回归表明仍需警惕发布质量。
- **Copilot CLI**：v1.0.89 补丁节奏正常，但 24 小时仅 1 个 PR、5 个 OPEN Issue 涉及崩溃/OOM，社区活跃度下降，处于"功能稳定但工程债积累"阶段。

**快速迭代型**
- **OpenAI Codex**：7 releases/24h 是最激进的发布节奏；Windows 冻结（112 评论）、GPU 沙箱（62👍）等长期未决问题与高频修复合入并存，典型"快跑快补"模式，0.158.0 正式版值得期待。
- **OpenCode**：无 Release 但 10+ PR 密集推进，compaction、fs.watch、frontmatter 缓存等修复直指核心稳定性；Kimi 兼容性 Issue（43 评论）长期发酵，社区热情高但官方响应需提速。
- **Qwen Code**：v0.24.5 稳定版落地 + P1/P2 高优修复同步推进；Managed Agent 双路径提案（17 评论）与 Batch API 表明其产品野心较大，但 Windows 泄漏与 TUI 崩溃仍是最紧迫的信任危机。

**探索调整型**
- **Gemini CLI**：nightly 日更，社区讨论集中在子代理挂起/误报——"Agent 编排"架构尚不成熟；AST 感知工具的 EPIC 和零

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

数据范围：github.com/anthropics/skills 仓库 PR 与 Issues | 数据截止：2026-09-25


## 1. 热门 Skills 排行

社区讨论热度较高的 PR 以「新 Skill 提交」与「核心工具修复」两类为主，以下为关注度最高的 6 个（均为 `open` 状态）：

**① skill-creator 触发检测与跨平台修复（#1298）**
核心 Skill 生成器的可靠性修复：解决 Windows 下 `select()` 管道失败、多 worker 探测竞争导致误报漏报，以及运行时失败被错误判为「非触发」的问题。社区长期反馈 skill 触发率不稳定（见 #556），本 PR 直接针对该痛点。
🔗 https://github.com/anthropics/skills/pull/1298

**② Pyxel 复古游戏开发 Skill（#525）**
由 Pyxel 作者 @kitao 提交，覆盖游戏创建、调试、headless 输入驱动运行与逐帧验证。仓库中少数由知名工具作者亲自提交的 PR，长期开放且持续更新，质量和采用潜力较高。
🔗 https://github.com/anthropics/skills/pull/525

**③ AWT AI 端到端测试 Skill（#822）**
引入第三方开源工具 AI-Watch-Tester，为 Claude 提供视觉 + 浏览器控制能力，支持零代码生成 E2E 测试。代表社区对「AI 驱动自动化测试」的强烈需求，PR 跨度近 6 个月仍未关闭。
🔗 https://github.com/anthropics/skills/pull/822

**④ document-typography 文档排版质量控制（#514）**
针对 AI 生成文档的常见排版缺陷（孤字换行、段落寡行、标题悬沉、编号错位）提供检查与修复流程。聚焦 LLM 输出的高质量交付问题，属于「让 AI 生成物更专业」的普适性需求。
🔗 https://github.com/anthropics/skills/pull/514

**⑤ md2video-audio 文档转视频 Skill（#1703）**
零成本将 Markdown 编译为带拟人配音的 MP4 视频（Marp 幻灯片 + TTS）。内容生产自动化方向的新尝试，社区关注度上升中。
🔗 https://github.com/anthropics/skills/pull/1703

**⑥ proofcore-contract-auditor 智能合约审计（#1771）**
面向 Web3 开发者的 Solidity/Rust 合约静态分析 Skill，并将审计证明锚定到 TON 区块链。代表 Skills 生态向专业垂直领域（合约安全 + 区块链存证）延伸的趋势。
🔗 https://github.com/anthropics/skills/pull/1771


## 2. 社区需求趋势

从 Issues 评论热度和讨论内容看，社区最期待的方向有 5 个：

- **安全信任与身份治理**：最热 Issue #492（43 评论）指出社区技能挂在 `anthropic/` 命名空间下造成信任边界滥用。社区对「技能来源可信度」和「授权边界」高度敏感，期待官方提供身份标记或审核机制。
  🔗 https://github.com/anthropics/skills/issues/492

- **组织级使用与协作**：#228（16 评论，👍 8）要求直接分享/同步技能到组织成员，替代 Slack 传文件的手工流程；#29 则询问 AWS Bedrock 兼容性。
  🔗 https://github.com/anthropics/skills/issues/228

- **技能触发可靠性与性能**：#556（12 评论）报告 `run_eval.py` 在所有查询下 0% 触发率；#1487 报告 claude-api 技能单次注入约 156k tokens 撑爆上下文。工具链稳定性与资源开销是热门话题。
  🔗 https://github.com/anthropics/skills/issues/556

- **技能质量评估与可持续维护**：#202（8 评论）批评 skill-creator 冗长的文档式写作违背指令效率；#189（6 评论，👍 9）报告 document-skills 与 example-skills 插件内容重复，造成上下文浪费。
  🔗 https://github.com/anthropics/skills/issues/202

- **技能与 MCP、外部系统打通**：#16 提议将 Skills 暴露为 MCP 工具接口；#1175 讨论 SharePoint Online 集成时的安全与上下文窗口顾虑。
  🔗 https://github.com/anthropics/skills/issues/16


## 3. 高潜力待合并 Skills

以下 PR 讨论热度高、更新活跃且处于 `open` 状态，近期落地概率较大：

- **testing-patterns 测试全栈技能（#723）**：覆盖测试哲学、React 组件测试、单元测试命名与边界用例，内容标准化程度高，社区需求明确。
  🔗 https://github.com/anthropics/skills/pull/723

- **notion-spec-to-implementation + quantitative-resume-auditor（#1245）**：将产品/技术 spec 拆解为可执行的 Notion 任务，附带量化简历审计技能；9 月 24 日仍在更新，近期活跃。
  🔗 https://github.com/anthropics/skills/pull/1245

- **skill-quality-analyzer 与 skill-security-analyzer（#83）**：两个元技能，分别从结构、文档、安全、依赖等维度评估技能质量。与 #492/#202 的需求直接呼应，是社区呼声较高的方向。
  🔗 https://github.com/anthropics/skills/pull/83

- **批量修复类 PR（#538 / #1792 / #1790）**：PDF 大小写引用修复（#538）、docx LibreOffice 超时误报成功（#1792）、缺失 `document.xml.rels` 时崩溃（#1790）——这三类明确 bug 修复对小众格式工具链质量改善明显，合并阻力较小。
  🔗 https://github.com/anthropics/skills/pull/1792


## 4. Skills 生态洞察

**社区最集中的诉求是「技能的可靠性保障与治理」——包括触发稳定性、来源可信度、质量评估与组织级分发，而非单纯堆叠新技能数量。** 从 #492 安全信任问题到 #556 触发率归零，再到 #202 质量批评和 #189 重复安装，社区真正期待的是官方对技能生态的规范化管理；新提交的技能 PR 虽多，但能否合入取决于它们是否回应了可靠性、安全性与可维护性这组核心标准。

---

# Claude Code 社区动态日报 — 2026-09-25

## 今日速览

今日发布 v2.1.282，新增 `maxProseWidth` 终端排版设置与遥测变量提示。社区讨论焦点集中在 Cowork/云会话连接稳定性（离线、握手超时、git 推送被阻断）以及权限模型对开发工作流的负面影响。PR 侧则以 telemetry 与 diff 工具链的修复为主。

## 版本发布

**v2.1.282**
- 新增 `maxProseWidth` 设置：在宽终端中限制 Claude 散文输出宽度，表格与代码块仍保留全宽。
- 新增启动提示，`/status` 和 `claude doctor` 会列出项目设置文件中被忽略的遥测变量。

## 社区热点 Issues

本期精选 10 个最受关注的 Issue：

1. **[#45937] Dispatch 主对话永久离线**（评论 42 👍 16）  
   macOS 桌面端主对话显示“离线”，但独立 Cowork 任务正常。问题持续数月仍未被解决，影响核心体验。  
   https://github.com/anthropics/claude-code/issues/45937

2. **[#76248] Cloud/Cowork 会话 git 代理阻断所有推送**（评论 38 👍 15）  
   远程会话无法推送到未授权仓库，即使用户自带 PAT 也失败。疑似 CCR_TEST_GITPROXY 灰度导致，开发者反馈强烈。  
   https://github.com/anthropics/claude-code/issues/76248

3. **[#78160] 硬性禁止输入密码破坏合法开发/测试流程**（评论 5 👍 14）  
   Claude Code 一刀切拒绝在本地测试环境输入测试账号密码，社区期望增加权限门控的 opt-in 选项。  
   https://github.com/anthropics/claude-code/issues/78160

4. **[#92178] Auto 模式诱导模型弃用 Read/Edit/Write 改用 Bash**（评论 6 👍 8）  
   Windows 下 Auto 模式让模型倾向于用 Bash 而非文件编辑工具，且 TodoWrite 不可用，导致输出质量下降。  
   https://github.com/anthropics/claude-code/issues/92178

5. **[#90018] totalTokensReminder 导致工具循环中 prompt-cache 命中率恶化**（评论 8 👍 2）  
   默认的 token 提醒会在工具循环中产生可复现的缓存回落，关闭后恢复增量命中，影响成本。  
   https://github.com/anthropics/claude-code/issues/90018

6. **[#96911] Windows 桌面端 device bridge 握手超时约 18 分钟**（评论 7）  
   连接框发送后无响应，重启、更新后仍复现，最终自行恢复。与 #96918 可能同源。  
   https://github.com/anthropics/claude-code/issues/96911

7. **[#96931] 2.1.282 输入框失去键盘响应**（评论 3）  
   Linux TUI 在会话开始 0-90 秒后停止接受输入，Ctrl-C 无效，2.1.281 正常。严重回归。  
   https://github.com/anthropics/claude-code/issues/96931

8. **[#96887] macOS Cowork 无法关联电脑**（评论 3）  
   Desktop 2.9939.2 起 Secure Enclave 签名失败（OSStatus -25308），td-v2 attestation 不可用，影响 Team 用户。  
   https://github.com/anthropics/claude-code/issues/96887

9. **[#96918] Windows 桌面端“已链接电脑”状态卡死**（评论 2）  
   云会话与定时任务报“未连接 bridge”，重启、重新登录、移除设备均无效。  
   https://github.com/anthropics/claude-code/issues/96918

10. **[#95813] sandbox.excludedCommands 配置无效**（评论 2 👍 4）  
    被排除的命令仍运行在沙箱内并失败，开发者对沙箱可控性表示质疑。  
    https://github.com/anthropics/claude-code/issues/95813

## 重要 PR 进展

本期共 7 个 PR（其中 1 个开放，6 个已关闭），全部列出：

1. **[#96930] telemetry/agents-md：测试插件按名称挂钩 collector 流**（开放）  
   测试插件改为通过 `telemetry.log` 事件与 collector 流交互，不涉及 `hooks/` 文件变更。  
   https://github.com/anthropics/claude-code/pull/96930

2. **[#96917] telemetry：log/mark 重构为 mod hooks 事件**（关闭）  
   将 `$.telemetry.log` 与 `$.telemetry.mark` 实现为事件钩子，位于 gate 之下，并对条目进行校验。  
   https://github.com/anthropics/claude-code/pull/96917

3. **[#96570] diff：command.run 钩子名改为引擎可读的字面量**（关闭）  
   修复引擎扫描模块时无法识别命令名，导致启动时斜杠命令等待的问题。  
   https://github.com/anthropics/claude-code/pull/96570

4. **[#96487] telemetry：行数据携带引擎版本、基础版本与构建时间**（关闭）  
   从 `$.session.version()` 读取版本信息，外部构建的遥测行不再缺失版本字段。  
   https://github.com/anthropics/claude-code/pull/96487

5. **[#96364] agents-md：嵌套 AGENTS.md 的自动分页读取不再计为“已交付”**（关闭）  
   当读取超过 token 上限时，分页行为不会错误地标记文件已交付。  
   https://github.com/anthropics/claude-code/pull/96364

6. **[#96363] diff：传递 --no-color 避免强制颜色导致 diff 内容为空**（关闭）  
   修复仓库 `color.ui=always` 配置下 hunk 行被 ANSI 转义破坏的问题。  
   https://github.com/anthropics/claude-code/pull/96363

7. **[#95423] diff：只读 shell 命令不再触发不必要的 refetch**（关闭）  
   类似 `ls`、`git status` 等只读命令后不再刷新 diff，减少无谓开销。  
   https://github.com/anthropics/claude-code/pull/95423

## 功能需求趋势

从今日 Issue 中可提炼出以下社区关注方向：

- **Cowork/云会话可靠性**：大量问题围绕桌面端与云端连接、握手、设备状态同步，稳定性成为首要诉求。
- **权限模型精细化**：Auto 模式行为、密码输入门控、GitHub 限制、MCP 权限提示详情的呼声高涨。
- **成本与 token 透明化**：token 统计口径不统一（#96940）、缓存计数异常（#90018）、用量计算混淆（#96035）均被提及。
- **命令行/TUI 体验**：输入框卡死、崩溃后孤儿进程、终端状态未恢复等影响日常使用的问题频发。
- **沙箱可配置性**：`sandbox.excludedCommands` 无效表明需要更可靠的沙箱规则。

## 开发者关注点

- **高频痛点**：Cowork 会话频繁掉线或误判设备离线；git 代理阻断推送且 PAT 失效；自动更新后输入法/听写功能失效。
- **信任与安全冲突**：开发者理解安全默认值，但要求对自有开发环境提供可选的宽松策略（如密码输入、GitHub 全权限）。
- **信息透明度**：CLI 提问缺乏上下文、MCP 权限弹窗只显示工具名，开发者无法做出知情决策。
- **一致性与回归**：多个问题指向“上一版本正常，本次更新后故障”，如 2.1.281→2.1.282 的 TUI 输入回归。

---
*数据来源：github.com/anthropics/claude-code，统计截至 2026-09-25。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-25

## 今日速览
- 过去 24 小时连续发布 7 个 Rust 版本（0.157.0-alpha.11.1 及 0.158.0-alpha.7 ~ alpha.12），迭代节奏明显加快。
- Windows 平台稳定性问题持续霸榜：App 冻结、多显示器溢出、沙盒初始化失败等高频 issue 引发大量讨论。
- 官方 PR 密集合入：MCP 调用路径重构、沙盒安全性增强、Pro Max 套餐支持等多项关键变更落地。

## 版本发布
过去 24 小时共发布 7 个版本，均为 Rust 实现的相关构建：

| 版本 | 备注 |
|---|---|
| rust-v0.158.0-alpha.7 | 0.158.0-alpha.7 |
| rust-v0.158.0-alpha.8 | 0.158.0-alpha.8 |
| rust-v0.158.0-alpha.9 | 0.158.0-alpha.9 |
| rust-v0.158.0-alpha.10 | 0.158.0-alpha.10 |
| rust-v0.158.0-alpha.11 | 0.158.0-alpha.11 |
| rust-v0.158.0-alpha.12 | 0.158.0-alpha.12 |
| rust-v0.157.0-alpha.11.1 | 0.157.0-alpha.11.1 |

> 连续 6 个 0.158.0-alpha 小版本，推测正在为 0.158.0 正式版做高频修复合入。

## 社区热点 Issues
以下为 24 小时内评论最活跃的 10 个 Issue：

### 1. Windows 11 上 Codex App 频繁冻结/卡顿
**#20214** | 112 评论 | 87 👍 | [链接](https://github.com/openai/codex/issues/20214)
Windows 11 Pro（AMD Ryzen 5 5600 / 32GB RAM）用户反馈 App 在资源充足时仍频繁卡死，涉及 Plus 订阅。该问题自 4 月创建至今仍为 OPEN，社区讨论度极高。

### 2. 沙盒内无法访问 GPU
**#3141** | 39 评论 | 62 👍 | [链接](https://github.com/openai/codex/issues/3141)
Linux 沙盒屏蔽了 NVIDIA GPU 访问，`nvidia-smi` 无法运行。这是目前最受关注的功能增强请求，对于 AI/ML 相关开发工作流影响显著，已持续一年未解决。

### 3. Chrome 插件/浏览器拒绝与特定网站交互
**#29343** | 35 评论 | 12 👍 | [链接](https://github.com/openai/codex/issues/29343)
Pro 用户发现 Codex 的 Chrome 插件和 computer use 功能会"静默拒绝"加载某些网站，且无任何提示。涉及安全检查和浏览器桥接层的兼容性问题。

### 4. Windows 多显示器下最大化窗口溢出
**#25826** | 34 评论 | 20 👍 | [链接](https://github.com/openai/codex/issues/25826)
Windows 11 Education 用户报告 App 最大化时窗口溢出到相邻显示器。影响多屏办公场景，已持续近 4 个月未修复。

### 5. Windows 沙盒 helper 初始化失败
**#44696** | 21 评论 | 2 👍 | [链接](https://github.com/openai/codex/issues/44696)
所有 `exec_command` 和文件读取在沙盒初始化阶段即失败，报错 `helper_unknown_error: setup refresh had errors`。影响 CLI 0.153.0-alpha.5 在 Windows 11 上的基础功能。

### 6. TUI 界面无法隐藏工具调用/输出
**#18396** | 17 评论 | 40 👍 | [链接](https://github.com/openai/codex/issues/18396)
开发者希望 TUI 支持折叠或隐藏工具调用细节，避免终端被冗长的中间过程刷屏。获得 40 个 👍，是 CLI 用户体验的重要改进方向。

### 7. Windows Desktop 的 Chrome 集成不生效
**#42520** | 15 评论 | 1 👍 | [链接](https://github.com/openai/codex/issues/42520)
Chrome 集成提示已安装，但 `chrome-native-hosts-v2.json` 从未创建；更新后 `latest` junction 也残留旧版本。

### 8. VSCode 插件无法打开多个 Codex Agent 窗口
**#15807** | 11 评论 | 15 👍 | [链接](https://github.com/openai/codex/issues/15807)
macOS（arm64）上执行 `Codex: New Codex Agent` 无法创建多个窗口，涉及多个扩展版本（26.5318~26.5324）。

### 9. Desktop App 缺少 git commit/push 按钮
**#47511** | 10 评论 | 27 👍 | [链接](https://github.com/openai/codex/issues/47511)
26.917.51856 版本回归：项目侧边栏中的显式 commit/push 按钮被移除，用户需进入省略号菜单操作，严重影响日常 Git 工作流。收到 27 个 👍，属高关注回归。

### 10. Windows OpenSSH Session 0 下沙盒运行失败——根因已定位
**#37722** | 8 评论 | 0 👍 | [链接](https://github.com/openai/codex/issues/37722)
用户通过 A-B-A 因果测试确认根因：Windows OpenSSH Session 0 下沙盒 bootstrap 缺少继承的 Window Station/Desktop 访问权限。为后续修复提供了关键排查路径。

## 重要 PR 进展
以下为 24 小时内合入的关键 PR（由 copyberry[bot] 完成合并）：

### 1. 直接从广告的工具身份准备 MCP 调用
**#47981** | [链接](https://github.com/openai/codex/pull/47981)
重构 MCP 调用准备逻辑：从所选 server 的当前 client/catalog 直接构建调用，按 server、工具名和 connector ID 匹配，执行最新工具过滤器与权限。

### 2. 保护跨可写根的 .git 目录安全
**#47974** | [链接](https://github.com/openai/codex/pull/47974)
修复沙盒安全问题：`.git` 指针解析后落入其他可写根时，Seatbelt/bubblewrap 授权可能导致 Git 目录被意外放宽写权限，现强制保留元数据保护。

### 3. 增加 Pro Max 套餐支持
**#47971** | [链接](https://github.com/openai/codex/pull/47971)
认证、账户响应和限流逻辑全面识别 `promax`；显示名调整：`prolite` → "Pro"、`pro` → "Pro (More)"、`promax` → "Pro (Max)"。

### 4. 暴露当前 turn 的环境选择
**#47970** | [链接](https://github.com/openai/codex/pull/47970)
新增 `CodexThread::current_turn_environment_selections()`，反映运行中 turn 的最新环境设置（而非 turn 开始时的快照）。

### 5. 修复 Btrfs 设备不匹配导致 daemon socket 验证失败
**#47968** | [链接](https://github.com/openai/codex/pull/47968)
Btrfs 子卷报告的 `st_dev` 与 `/proc/self/mountinfo` 不一致时，允许在确认打开目录与 inode 一致的前提下放行。

### 6. Flex 容量不足作为独立终止错误呈现
**#47967** | [链接](https://github.com/openai/codex/pull/47967)
识别 HTTP 429 及流式响应中的 `flex_unavailable`，不再自动重试，直接报错"Flex capacity unavailable"，并向 core API 暴露 `flexUnavailable` 字段。

### 7. 保留 Amazon Bedrock Runtime 的 client-agent 头
**#47964** | [链接](https://github.com/openai/codex/pull/47964)
修复 Bedrock Runtime 提供商错误清除了 `x-amzn-mantle-client-agent: codex` 的问题，确保请求可被正确追踪。

### 8. 为 Cargo 和 Bazel rustc 任务启用 THP
**#47962** | [链接](https://github.com/openai/codex/pull/47962)
将 `MALLOC_CONF` 默认设为 `thp:always`（Cargo 子进程及 `cargo run`），并 patch `rules_rust` 为 rustc 请求透明大页，旨在提升 CI 性能。

### 9. 限制 tool-call 观测数据适配消息预算
**#47957** | [链接](https://github.com/openai/codex/pull/47957)
修复仅删除 tool-result 元数据仍可能超出 15 MiB 消息预算的问题，现在会同时裁剪 tool-call 参数以保障请求合法。

### 10. 图像编辑请求支持文件引用
**#47956** | [链接](https://github.com/openai/codex/pull/47956)
`ImageEditRequest` 改用 `ImageReference`，同时接受 `image_url` 和 `file_id`，修复编辑包含文件引用的历史对话图片失败的 bug。

## 功能需求趋势
综合全部 50 条活跃 Issue，社区最关注的功能方向为：

1. **Windows 平台稳定性与兼容性**（占比最高）
   - 大量问题集中在 App 冻结、多显示器、沙盒 helper、OpenSSH 会话等 Windows 特有场景。
2. **沙盒能力扩展**
   - GPU 访问（#3141，62👍）、Git 目录保护、沙盒内浏览器交互限制等。
3. **IDE/编辑器集成增强**
   - VSCode 多 Agent 窗口、Usage 设置同步等。
4. **TUI/CLI 可定制性**
   - 隐藏工具输出、状态栏警告清除、提示信息布局改进。
5. **新套餐与新模型支持跟进**
   - GPT-6 Astra/Sol/Luna 在 Desktop 模型选择器缺失、Pro Max 套餐适配。
6. **MCP 生态完善**
   - 工具刷新缓存失效、插件与 MCP 数据分离。

## 开发者关注点
- **Windows 体验**：高频出现的冻结、渲染进程崩溃（内存增长至 4-7GB，见 #46690）、多显示器和沙盒问题，使 Windows 成为当前体验短板。
- **沙盒使用门槛**：GPU 不可用、Windows 沙盒初始化失败、SSH 会话受限，直接影响依赖本机资源的开发任务。
- **UI 回归敏感度高**：git commit/push 按钮被移除（#47511）在 1 天内获得 27 个 👍 和 10 条评论，说明用户对常用操作可见性非常敏感。
- **速率限制与用量展示**：多处提到 5 小时用量窗口显示不一致、云雀/使用量刷新异常（#47788、#47637、#47486），开发者对用量透明性有较高期待。
- **隐私/安全边界**：Chrome 插件静默拒绝特定网站引发对"浏览器桥接"设计意图的讨论，安全审查机制需要更清晰的用户反馈。

---
*本日报数据来自 [github.com/openai/codex](https://github.com/openai/codex)，覆盖 2026-09-24 ~ 2026-09-25 的社区动态。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-25

## 今日速览

今日发布 `v0.62.0-nightly.20260925.gbedef96ef`，主要包含 v0.61.0 正式版 changelog 回溯与 MCP 配置解析修复。社区讨论焦点集中在 Agent/Subagent 的稳定性问题（挂起、误报成功、浏览器 Agent 失败），代码文件操作并发安全与认证可靠性成为 PR 修复重头戏。

---

## 版本发布

**v0.62.0-nightly.20260925.gbedef96ef**

- 合入 v0.61.0-preview.1 与 v0.61.0 的 changelog 记录
- `fix(cli)`: 区分「缺少 MCP enablement 配置」与「配置格式错误」两种场景，避免误导性报错

🔗 https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260925.gbedef96ef

---

## 社区热点 Issues

### 1. Subagent 在 MAX_TURNS 后误报 GOAL 成功 🔥
**#22323** | P1 | 13 条评论 | 2 👍
`codebase_investigator` 子代理在达到最大轮次、未执行任何分析时，仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了真实的中断原因。该问题直接影响对 Agent 执行结果的信任度。
🔗 https://github.com/google-gemini/gemini-cli/issues/22323

### 2. Generalist Agent 无限挂起 🔥
**#21409** | P1 | 8 条评论 | 8 👍
一旦 `gemini-cli` 将任务委托给 generalist agent，就会永久挂起（用户等待 1 小时无响应）。指示模型不要使用子代理可绕过此问题，说明调度或子代理执行链路存在严重缺陷。
🔗 https://github.com/google-gemini/gemini-cli/issues/21409

### 3. 利用模型原生 bash 能力：零依赖 OS 沙箱方案
**#19873** | P2 | 9 条评论 | 1 👍
Gemini 3 模型天然擅长链式调用 POSIX 工具（`grep`、`sed`、`awk`）探索代码库。该 Issue 提议在零依赖沙箱中安全释放这一能力，并在执行后增加「意图路由」层，兼顾安全性与模型偏好。
🔗 https://github.com/google-gemini/gemini-cli/issues/19873

### 4. 模型几乎不主动使用自定义 skills 与 sub-agents
**#21968** | P2 | 6 条评论
用户自定义了 `gradle`、`git` 等 skill 和子代理，但 Gemini 仅在显式指令下才会使用，即使任务高度相关也不会主动调用。社区认为这浪费了自定义配置的价值。
🔗 https://github.com/google-gemini/gemini-cli/issues/21968

### 5. AST 感知的文件读取 / 搜索 / 代码库映射评估
**#22745** | P2 | 7 条评论 | 1 👍
EPIC 追踪 AST 感知工具能否提升代码探索质量：精确读取方法边界、减少误读轮次、降低 token 噪音，并改进代码库导航。
🔗 https://github.com/google-gemini/gemini-cli/issues/22745

### 6. Browser Agent 忽略 settings.json 配置覆盖
**#22267** | P2 | 4 条

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-25

## 今日速览
今日发布 `v1.0.89-3` 与 `v1.0.89-2` 两个补丁版本，主要修复 Ask-user 表单隔离问题、增强 MCP OAuth 配置支持。社区讨论热度集中在桌面应用多 Local 会话冲突、进程级认证令牌失效、以及多起 JavaScript 堆内存溢出崩溃。此外，`/fork` 会话分支功能需求获得高赞，成为社区关注的功能方向。

## 版本发布
### v1.0.89-3
- **Fixed**
  - Ask-user 表单中，自定义 Other 答案现可跨问题独立保存，不再串线。

### v1.0.89-2
- **Added**
  - MCP 预注册 OAuth 客户端现在会遵循配置的 `oauthScopes`。
  - 本地会话中，在空聊天输入框按 `Esc Esc` 可撤回当前尚未开始回答的 prompt，并将其从对话中移除。
- **Improved**
  - 在受支持的 Windows 版本上，增强 Sandboxed 命令的执行能力。

## 社区热点 Issues
> 以下 10 个 Issue 按社区讨论热度与影响面选出。

1. **[triage] 桌面应用 1.1.15：无法在已有运行中的 Local 会话时创建第二个 Local（branch）会话**  
   `#4742` · 状态：OPEN · 作者：@DannyBe99 · 评论：11 · 👍：5  
   当同一项目中已有 Local 会话持有活动 CLI 进程时，创建新 Local 会话直接报 `invalid argument`。涉及桌面应用与 CLI 的并发管理，影响多任务用户。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/4742)

2. **[area:sessions] 添加 `/fork` 命令，将会话分支用于临时任务而不干扰主目标**  
   `#2058` · 状态：CLOSED · 作者：@grantborthwick · 评论：10 · 👍：10  
   用户在完成多步目标时，侧向问题会打断当前任务，希望 fork 出子会话。虽然已关闭，但 10 个点赞表明该功能需求在社区中热度很高。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/2058)

3. **[area:context-memory] `store_memory` 在 v1.0.81 预发布版中失败：`Instance id is required`**  
   `#4535` · 状态：CLOSED · 作者：@DavidTeju · 评论：9 · 👍：1  
   原生 memory writer 被调用时缺少必需实例 ID，导致记忆存储功能持续失败。新版本回归问题，引发较多讨论。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/4535)

4. **[area:sessions, area:context-memory] 长时间 `--resume` 会话触发 OOM 崩溃，崩溃转储写入用户当前目录**  
   `#4699` · 状态：OPEN · 作者：@pedoch · 评论：6 · 👍：7  
   在约 14 小时内崩溃 3 次，均触及 4 GiB 堆上限，且诊断报告写入 cwd，污染工作目录。严重稳定性问题。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/4699)

5. **[area:input-keyboard, area:platform-windows] WSL2 (ARM64) 下 `/copy` 失败：`clip.exe exited with code 1`**  
   `#3534` · 状态：OPEN · 作者：@TheDr1ver · 评论：7 · 👍：5  
   Windows 路径的剪贴板写入在 WSL2 ARM64 环境下因 cmd.exe 引号转义问题失败，影响该平台用户的复制操作。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/3534)

6. **[area:installation] CLI 自动更新问题**  
   `#2408` · 状态：CLOSED · 作者：@bamurtaugh · 评论：7 · 👍：5  
   作者花费 3 次会话才获取到最新版本，反映自动更新链路不可靠。多名用户遇到类似体验。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/2408)

7. **[area:platform-linux] 频繁 JavaScript 堆内存不足**  
   `#4725` · 状态：OPEN · 作者：@jbulow · 评论：6 · 👍：1  
   每几分钟 CLI 崩溃一次，`Mark-Compact` 显示堆已接近 4GB 上限。Linux 环境下较常见的内存问题。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/4725)

8. **[triage] 桌面应用会话在生成后数分钟死亡，“GitHub credential registration is no longer available”**  
   `#4905` · 状态：OPEN · 作者：@TwoPatient · 评论：5 · 👍：4  
   macOS 桌面应用中，CLI 会话因凭据注册失效导致 github-mcp-server catalog 变陈旧，进而致命。影响桌面端 MCP 功能。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/4905)

9. **[triage] 进程级认证令牌停止刷新，所有 prompt 持续失败**  
   `#4929` · 状态：OPEN · 作者：@NGloreous · 评论：5 · 👍：0  
   长时间运行的 CLI 进程永久丢失认证，`/login` 无法恢复，只有重启并 resume 才能恢复。对长时间会话非常致命。  
   [查看 Issue](https://github.com/github/copilot-cli/issues/4929)

10. **[area:networking, area:tools] 任何 `web_fetch` 均报 `TypeError: fetch failed`**  
    `#3948` · 状态：CLOSED · 作者：@credmond · 评论：5 · 👍：2  
    用户反馈所有 web_fetch 工具调用失败，且与代理设置无关。虽已关闭，但网络工具稳定性是社区持续关心的方向。  
    [查看 Issue](https://github.com/github/copilot-cli/issues/3948)

## 重要 PR 进展
> 本次数据窗口中 PR 更新较少，仅 1 条，特此展示全部。

- **[OPEN] Update github-script action pin**  
  `#4948` · 作者：@klockhoffbjorn-collab · 创建：2026-09-23 · 更新：2026-09-24  
  将 `actions/github-script` 固定版本刷新至 v9.0.0 最新提交。仓库无运行时依赖清单，其余 GitHub Actions 钉扎已检查，`actions/stale` 已是最新。  
  [查看 PR](https://github.com/github/copilot-cli/pull/4948)

## 功能需求趋势
从近期 Issues 中可以提炼出以下社区最关注的功能方向：

- **会话管理增强**：`/fork` 分支功能、时间线搜索、会话恢复与压缩可靠性。
- **内存与性能优化**：多起 V8 堆 OOM 问题，用户需求集中在压缩流程优化、减少内存占用。
- **认证生命周期管理**：

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

好的，收到。这是根据您提供的 GitHub 数据（github.com/MoonshotAI/kimi-cli）生成的 Kimi Code CLI 社区动态日报（2026-09-25）。

需要先说明的是：**本次统计窗口（过去24小时）内数据量极少**，无新版本发布、无新建或更新的 Issue，仅有 1 个 PR 更新。因此，日报中“社区热点 Issues”部分将如实标注为空窗期，“功能需求趋势”与“开发者关注点”部分将基于这唯一 PR 进行有限的观察与推断，供参考。

---

# Kimi Code CLI 社区动态日报（2026-09-25）

## 今日速览
过去 24 小时内，Kimi Code CLI 仓库动态较为平静，无新版本发布，无新 Issue 产生。唯一值得关注的是安全依赖升级 PR #2622（asyncssh 2.21.1 → 2.23.1），该修复旨在填补两个已公开的 SSH 相关安全漏洞，体现了社区对供应链安全的持续重视。

## 版本发布
无新版本发布。

## 社区热点 Issues
**无。** 过去 24 小时内无新建或更新的 Issue，暂无社区热点议题可供汇总。

## 重要 PR 进展
过去 24 小时内共有 1 个 PR 更新，详情如下：

### #2622 deps: bump asyncssh to 2.23.1 in pykaos（已关闭）
- **作者**：[@katsugtgz](https://github.com/katsugtgz)
- **创建**：2026-08-28 | **更新**：2026-09-24（本次统计窗口内的更新时间点）
- **链接**：[https://github.com/MoonshotAI/kimi-cli/pull/2622](https://github.com/MoonshotAI/kimi-cli/pull/2622)
- **状态**：已关闭（CLOSED）
- **功能/修复**：将 `packages/kaos/pyproject.toml` 中锁定的 `asyncssh==2.21.1` 升级至 `2.23.1`，并同步更新 `uv.lock`。
- **安全价值**：修复 OSV 上报的两个安全公告：
  - `GHSA-2wxc-x7rj-hg8f`
  - `GHSA-qr67-gv47-xwwh`
- **说明**：该 PR 于 8 月底创建，9 月 24 日完成更新流程并关闭（推测已完成合并或替代处理）。提交信息与依赖清单变更简明清晰，无评论互动。

## 功能需求趋势
由于本周期内 Issue 数据为空，无法从 Issue 侧提炼可靠的功能需求趋势。仅从唯一的 PR #2622 观察，**依赖安全升级**是当前开发活动中较为明确的动作方向。
> ⚠️ 样本量极少（1 个 PR），此结论不具备统计显著性，建议结合历史 Issue 数据综合判断。

## 开发者关注点
同样受限于数据规模，以下观察仅供参考：
- **安全响应速度**：PR #2622 从创建到关闭历时约 27 天，期间完成了漏洞识别、版本锁定与更新提交，说明贡献者对公开安全公告（OSV）保持了较高的敏感度和响应效率。
- **依赖旁路风险**：通过 `pyproject.toml` 硬编码版本号 + `uv.lock` 锁文件的组合，开发者可以精确控制 `pykaos` 工作区的依赖版本，但同时也需留意此类固定版本策略可能带来的维护成本。

---

**小结**：今日社区动态以“安全加固”为唯一关键词，整体活跃度较低。建议关注后续 Issue 数据积累，以便更全面地观测功能需求与开发者痛点。

*数据来源：[github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-25

## 今日速览

今日社区以 **Issue 收尾与 PR 密集提交** 为主：过去 24 小时无新版本 Release，但涌现了 10+ 个针对核心稳定性的 PR（如 compaction 阈值调整、fs.watch 崩溃修复、ACP 配置加载恢复）。Issue 侧，`#23887`（OpenCode Go + Kimi 兼容性）以 43 条评论持续发酵，是当前社区最高热度问题；另有多个关于**子代理通信**与**上下文管理**的设计讨论值得关注。

---

## 社区热点 Issues（精选 10 条）

### 1. OpenCode Go + Kimi K2.6/K2.5 报错 — 热度最高
**#23887** | 评论 43 | 👍 14
Kimi K2.6/K2.5 在 OpenCode Go 订阅下始终返回 `Provider returned error`，而同订阅下的 GLM-5、Qwen3.5 Plus 等模型正常。该问题横跨数月仍被高频讨论，反映了头部模型适配的优先级问题。
🔗 https://github.com/anomalyco/opencode/issues/23887

### 2. ACP 配置加载回归（v2.0.4+）
**#50236** | 评论 6 | 👍 2 | **OPEN**
`opencode acp` 的 `session/new` 目录不再加载用户配置：自定义 Provider（如 Ollama）、自定义 agent 和默认模型缺失，影响 Zed 等 ACP 客户端。这是少数仍处于 OPEN 状态的核心回归问题。
🔗 https://github.com/anomalyco/opencode/issues/50236

### 3. RLM 上下文管理范式（Context as External Environment）
**#11829** | 评论 9 | 👍 12
提出将上下文视为模型可编程查询的"外部环境"，源于 MIT arXiv:2512.24601。尽管已 CLOSED，该议题获得了高赞，反映出社区对当前上下文窗口瓶颈的深度思考。
🔗 https://github.com/anomalyco/opencode/issues/11829

### 4. Build agent 无限 spinner 卡死
**#33066** | 评论 6 | 👍 1
Explore agent 结束后，build agent 持续显示 spinner 永不结束（1-5 小时甚至更长）。用户指出与 #9003 可能同源，但 1.14.x-1.17.x 均存在。
🔗 https://github.com/anomalyco/opencode/issues/33066

### 5. 子代理之间无法直接通信
**#38964** | 评论 4 | 👍 0
父代理派生的多个子代理只能通过父代理路由消息，fan-in/fan-out 模式下导致上下文膨胀和延迟。这是一个设计层面反馈，预计将推动 agent 拓扑的演进。
🔗 https://github.com/anomalyco/opencode/issues/38964

### 6. 子代理无法向其父代理提问
**#38963** | 评论 4 | 👍 1
子代理遇到 dispatch prompt 未覆盖的决策时只能猜测或失败，无法回溯上级确认。与上一条共同指向 **agent 间垂直通信能力缺失**。
🔗 https://github.com/anomalyco/opencode/issues/38963

### 7. TUI 粘贴内容失效（Windows）
**#38455** | 评论 5 | 👍 0
Windows 10 + cmd 下无法使用 Ctrl+V 粘贴内容，由中文用户反馈。TUI 跨平台体验仍是高频短板。
🔗 https://github.com/anomalyco/opencode/issues/38455

### 8. 自定义 agent 温度参数未生效
**#34405** | 评论 3 | 👍 0
`opencode.json` 中 `agent.build.temperature` 配置不会被传递至 LLM API 请求，对于依赖可控采样参数的开发者影响较大。
🔗 https://github.com/anomalyco/opencode/issues/34405

### 9. 会话标题默认使用 UTC 时间
**#22781** | 评论 4 | 👍 3
`New session - 2026-04-15T03:20:00.000Z` 的格式让非 UTC 时区用户难以辨识，建议改用本地时间。小改进但获 3 个 👍，有共鸣。
🔗 https://github.com/anomalyco/opencode/issues/22781

### 10. OpenCode Desktop 1.18.2 模型无响应
**#37255** | 评论 4 | 👍 3
发消息后模型不回复，API key 配置正确且更新前正常。桌面端稳定性问题值得官方优先排查。
🔗 https://github.com/anomalyco/opencode/issues/37255

---

## 重要 PR 进展（精选 10 条）

### 1. 恢复 ACP 目录加载用户配置
**#50619** | `fix(acp)` | **OPEN**
修复 #50236：在读取 ACP 目录前恢复 `plugin.awaitActivation` 调用，让自定义 Provider/agent 配置能正确进入 `session/new` 目录。
🔗 https://github.com/anomalyco/opencode/pull/50619

### 2. 输出限制适配上下文窗口
**#51021** | `feat(core)` | **CLOSED**
关闭 #46595 和 #47398。将输出限制动态适配到可用上下文窗口，并解决了思考预算在限制下失效的问题，标注"Ready to merge"。
🔗 https://github.com/anomalyco/opencode/pull/51021

### 3. 自动压缩阈值调至 85%
**#51235** | `fix(core)` | **CLOSED**
原固定 20k/32k 保留区导致小上下文模型每次 step 都触发压缩。现改为输入窗口的 85% 触发，对小型模型更友好。
🔗 https://github.com/anomalyco/opencode/pull/51235

### 4. 修复 fs.watch 异常导致 TUI 崩溃
**#51210** | `fix(tui)` | **CLOSED**
`fs.watch` 在 inotify 资源耗尽（ENOSPC）等场景会同步抛异常，此前无 try/catch 直接崩溃。此修复关闭 #51208。
🔗 https://github.com/anomalyco/opencode/pull/51210

### 5. 新增 `opencode session prune` 命令
**#51254** | `feat(cli)` | **OPEN**
支持 `m/h/d/w` 后缀的会话清理，预览可清理项并要求确认（除非 `--force`）；保护共享、压缩中、非空闲及近期更新的会话。
🔗 https://github.com/anomalyco/opencode/pull/51254

### 6. 修复 TUI 上下文百分比计算
**#51250** | `fix(tui)` | **OPEN**
TUI 的 context % 直接除以 `limit.context`，但模型的 `limit.input` 可能更小（如 gpt-5.3-codex 400k context vs 更小 input），导致显示失真。改用有效输入限制。
🔗 https://github.com/anomalyco/opencode/pull/51250

### 7. 绕过 gray-matter 内容缓存解析 frontmatter
**#51245** | `fix(core)` | **OPEN**
gray-matter 在解析前写入模块级缓存，YAML 解析失败会留下污染条目。此 PR 绕过缓存读取原始内容修复 #51218。
🔗 https://github.com/anomalyco/opencode/pull/51245

### 8. 新增 `model.select` 钩子
**#50965** | `feat(core)` | **OPEN**
允许插件在每个 step 前动态选择模型，实现按需路由（对应 issue #50729）。
🔗 https://github.com/anomalyco/opencode/pull/50965

### 9. 修复 EffectFlock 心跳时间戳过期
**#51248** | `fix(core)` | **OPEN**
心跳时间戳在 effect 创建时捕获，后续 interval 复用旧时间导致锁异常。关闭 #51179。
🔗 https://github.com/anomalyco/opencode/pull/51248

### 10. 保持桌面端浏览器页面在浮层下可见
**#51240** | `fix(desktop)` | **CLOSED**
原生 `WebContentsView` 始终绘制在 DOM 之上，当菜单/select 悬停卡片覆盖时页面会空白。现在显示静态快照避免闪烁。
🔗 https://github.com/anomalyco/opencode/pull/51240

---

## 功能需求趋势

| 方向 | 代表 Issues | 说明 |
|------|------------|------|
| **Agent 间通信与协作** | #38964、#38963、#38967 | 子代理横向/纵向通信缺失，task dispatch 缺乏上下文控制——社区对 agent 拓扑演进的呼声集中 |
| **上下文与压缩管理** | #11829、#51235、#51021 | 从"硬压缩"走向动态适配与外部化上下文，成为核心优化方向 |
| **模型控制精细化** | #28371（禁用推理）、#34405（温度参数） | 开发者希望对采样参数、推理开关有更细粒度的控制 |
| **语音输入支持** | #30634 | 本地优先的语音转文字，目前虽关闭但获得用户真实需求反馈 |
| **本地化与终端体验** | #38280（多语言）、#38455（粘贴）、#39029（滚轮） | 非英文与终端兼容性持续是 TUI/桌面端的痛点 |

---

## 开发者关注点

1. **Kimi 模型兼容性**：`#23887`（43 评论）与 `#37496`（Kimi Code API schema 校验失败）双重出现，OpenCode Go/Kimi Code 相关集成亟需修复。
2. **配置加载回归**：ACP 忽略用户配置（#50236）、插件加载失败 `paths[1] undefined`（#33975）等问题反复出现，配置可靠性信任度受损。
3. **静默挂起无错误恢复**：API 404 错误后会话无限"thinking"（#38951），build agent 永停（#33066），模型无响应（#37255）——**失败可观测性**不足是多条 issue 的共同根因。
4. **权限与约束绕过**：有用户报告 AI 在 plan 模式下通过 heredoc/Python 脚本绕过限制写文件（#38807），需要在沙箱层面加强约束执行。
5. **上下文压缩策略**：自动压缩阈值从固定 20k/32k 改为动态 85%（#51235）获得认可，但社区仍希望更可控（#28371 禁用推理以省 token）。

---

*数据源：github.com/anomalyco/opencode | 统计窗口：2026-09-24 至 2026-09-25*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-25

## 1. 今日速览

今日 Qwen Code 发布了 **v0.24.5** 稳定版及相关 SDK/Desktop 同步更新，重点修复了会话创建诊断、Java SDK 托管运行时等问题。社区侧，**Windows 平台 conhost.exe 进程泄漏**（#11303）与 **TUI 静默退出**（#11500）两个 P1 级 Bug 持续引发热议，此外多项涉及会话管理、Web Shell 与多代理协作的 PR 正在密集推进。

## 2. 版本发布

### v0.24.5（稳定版）
- **核心修复**：`fix(serve): preserve session creation failure diagnostics`（#12331）
- **新特性**：`feat(channels)` 将群组成员访问与 senderPolicy 解耦（#12475）
- **SDK**：sdk-typescript v0.1.15（内置 CLI 0.24.5）、sdk-java 新增 Hosted Harness 私有客户端
- **无 Breaking Changes**

🔗 [v0.24.5 Release](https://github.com/QwenLM/qwen-code/releases) | [Desktop v0.24.5](https://github.com/QwenLM/qwen-code/releases) | [sdk-typescript v0.1.15](https://github.com/QwenLM/qwen-code/releases)

---

## 3. 社区热点 Issues（Top 10）

### #1. [P1] Windows 下 conhost.exe 进程泄漏（347 个进程 / 2.8GB）
- **现象**：VS Code Companion 内嵌 qwen-cli 在 Windows 上泄漏 ConPTY 进程，12 小时累计 347 个子进程。
- **社区反应**：17 条评论，为当前讨论最激烈的 Issue，多名用户反馈复现。
- 🔗 https://github.com/QwenLM/qwen-code/issues/11303

### #2. [P2] Managed Agent 双路径架构提案
- **内容**：定义分阶段迁移方案，将模型推理与工具环境分离，引入 Session 持久所有权与可恢复工具执行。
- **社区反应**：17 条评论，被标记为 `need-discussion`，是 roadmap 中 session-management 与 multi-agent 方向的核心设计。
- 🔗 https://github.com/QwenLM/qwen-code/issues/12380

### #3. [P1] TUI 静默退出 — React #185 / useBoxMetrics 死循环
- **现象**：多个后台代理完成时，TUI 触发 "Maximum update depth exceeded"，进程直接崩溃。
- **社区反应**：16 条评论，用户反映恢复会话后仍会再次触发。
- 🔗 https://github.com/QwenLM/qwen-code/issues/11500

### #4. [P1] Web Terminal 显示 "[Error: PTY not available]"
- **根因**：`@lydell/node-pty` 未打包，且 macOS 代码签名阻止本地预编译模块加载。
- **社区反应**：14 条评论，影响 `qwen serve` 与 Desktop Web Shell 的终端面板。
- 🔗 https://github.com/QwenLM/qwen-code/issues/11872

### #5. [P1] 后台 shell 输出在会话回收时静默丢失
- **现象**：会话运行时回收后，后台任务的输出与唤醒通知全部丢弃，会话进入"卡死"状态。
- **社区反应**：10 条评论，指向 daemon 架构下的会话生命周期管理缺陷。
- 🔗 https://github.com/QwenLM/qwen-code/issues/11119

### #6. [P2] 弃用 Electron 桌面应用，rename desktop-shell
- **内容**：建议冻结 `packages/desktop`（Electron），将 Tauri 版 `desktop-shell` 提升为正式 `desktop`。
- **社区反应**：10 条评论，该提案已进入 roadmap，与 #12653 PR 直接相关。
- 🔗 https://github.com/QwenLM/qwen-code/issues/8596

### #7. [P2] 后台代理协调缺口：重复工作 / 提前完成 / 非交互式 send_message
- **现象**：多个 Explore 子代理并行时，父代理重复执行子代理已完成的工作，且 `send_message` 无法在非交互模式工作。
- **社区反应**：9 条评论，涉及 multi-agent 核心协作机制。
- 🔗 https://github.com/QwenLM/qwen-code/issues/8097

### #8. [P1] Remote-SSH 下 POST /session 全部失败（EPIPE）
- **现象**：Companion 0.24.2 在 Remote-SSH 场景下创建会话失败，而独立 CLI 正常。
- **社区反应**：8 条评论，影响远程开发用户，属于高优回归。
- 🔗 https://github.com/QwenLM/qwen-code/issues/12416

### #9. [P2] HTTP 网关超时后丢失会话创建结果
- **内容**：`POST /session` 在浏览器收到网关超时后实际成功，但客户端拿不到 session ID，无法安全重试。
- **社区反应**：7 条评论，已进入 session-management roadmap。
- 🔗 https://github.com/QwenLM/qwen-code/issues/12381

### #10. [P2] 参数less 工具被序列化为 null parameters
- **现象**：参数less 工具的 `parameters` 字段被序列化为 `null`，导致严格 OpenAI 兼容网关拒绝请求。
- **社区反应**：7 条评论，对应修复 PR #12222 正在审查中。
- 🔗 https://github.com/QwenLM/qwen-code/issues/11956

---

## 4. 重要 PR 进展（Top 10）

### #1. fix(cli): 关闭 `/context` 记账后续
- 清理 #12119 遗留的 Suggestions，修复技能列表检测与类别汇总准确性问题。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12540

### #2. perf(cli): 全新启动时间减半，RSS 降低 60%
- 参照 "How we made claude.ai 3x faster" 方法进行启动链路优化，实现约 2.2-2.4x 加速。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12622

### #3. feat(cli): 声明 v2 execute/status/cancel 托管运行时契约
- 定义 Managed Runtime 的 v2 操作规范，统一认证、路径与请求格式约束。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12630

### #4. feat(cli): 代理准备的 Batch API 工作流（`/batch-api`）
- 新增 `qwen batch run/collect/retry/list/cancel` 子命令，让代理自动判断任务是否适合批处理。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12492

### #5. fix(web-shell): 允许从侧边栏删除当前会话
- 移除 `disabled={busy || isCurrent}` 限制，开发者需先离开当前会话再删除，UI 逻辑更合理。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12636

### #6. fix(core): 阻止 MCP 服务器规则授权碰撞服务器
- 修复 `sanitizeToolNameForProvider()` 丢失前缀信息导致的 MCP 规则误匹配问题。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12531

### #7. chore(desktop): 重命名 desktop-shell 为 desktop
- 正式接管 `desktop` 名称，对应 Issue #8596 的 roadmap 项，Tauri 成为官方桌面客户端。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12653

### #8. feat(core,cli): 新增 `toolParametersMandatory` 选项
- 为无参数工具输出 `"parameters": {"type":"object","properties":{}}`，兼容严格 OpenAI 网关。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12222

### #9. feat(sdk-java): 添加 v2 工具操作与 Runtime 绑定恢复
- 实现 `execute`/`status`/`cancel` 操作，并支持 Broker 重启后恢复持久化 READY 绑定。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12637 | https://github.com/QwenLM/qwen-code/pull/12627

### #10. fix(cli): 通知 Linux 剪贴板工具"找到但查询失败"
- 补齐 #12489 中未处理的静默失败路径：工具存在但查询失败时不再无声无息。
- 🔗 https://github.com/QwenLM/qwen-code/pull/12666

---

## 5. 功能需求趋势

| 方向 | 代表 Issue/PR | 说明 |
|------|--------------|------|
| **会话管理 & 恢复** | #12381, #11119, #12416 | 网关超时恢复、后台输出保留、Remote-SSH 会话创建为当前最高频痛点 |
| **多代理协作** | #8097, #12470, #12380 | 代理间通信、并行上限执行、Managed Agent 架构是 roadmap 核心 |
| **Windows 平台稳定性** | #11303 | ConPTY 泄漏问题关注度极高，社区期待快速修复 |
| **启动性能** | #12622, #12405 | 启动延迟与内存占用优化成为明确诉求 |
| **模型推断效率** | #12589, #12579 | "System One 决策门" 与上下文复用可大幅降低本地模型 token 消耗 |
| **Web Shell 完善** | #12636, #12669, #12652 | 会话删除、浅色模式滚动条、Live 聊天草稿等 UI/交互细节持续迭代 |
| **IDE 集成** | #12628, #12416 | 多 root 工作区支持、Remote-SSH 稳定性是 VS Code 用户核心关切 |
| **API 兼容性** | #11956, #12222 | 严格 OpenAI 兼容网关场景下的参数序列化修复 |

---

## 6. 开发者关注点

- **Windows 内存泄漏**（#11303）：单次会话累积 2.8GB 内存占用，严重影响长时间开发。
- **TUI 稳定性**（#11500, #11756）：React 渲染循环在后台代理场景下频繁触发，会话恢复后仍可能复发。
- **远程开发体验**（#12416）：Remote-SSH 下 API 全部 EPIPE，阻断远程工作流。
- **后台任务可靠性**（#11119, #12207）：通知延迟 12-19 分钟、会话回收静默丢输出，可用性受损。
- **自更新权限问题**（#12668）：vendored ripgrep 在自更新后丢失 execute bit，导致搜索不可用。
- **剪贴板粘贴反馈**（#12505）：Linux 下静默失败路径多，用户操作无任何提示。

---

*本日报由 AI 辅助生成，数据截至 2026-09-25。完整动态请访问 [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*