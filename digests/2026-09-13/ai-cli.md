# AI CLI 工具社区动态日报 2026-09-13

> 生成时间: 2026-09-13 01:55 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-13）

## 1. 生态全景

当前 AI CLI 工具赛道已进入**高速迭代与稳定性阵痛并存**的阶段。Claude Code、OpenAI Codex 等头部工具凭借先发优势占据生态位，但 Windows 桌面端崩溃、TUI 回归等问题暴露了跨平台成熟度的短板；Qwen Code、Gemini CLI 以每日/夜间版本节奏快速追赶，架构创新（容器执行、可插拔 harness）反而引领方向；OpenCode 凭借模型无关和多端覆盖获得高社区活跃度，但基础体验缺陷（剪贴板）形成口碑瓶颈。整体上，各工具的同质化竞争已从"模型能力"转向**工程化细节：稳定性、成本控制、会话连续性、安全边界**。

---

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | PR 数 | Release | 最高热度 Issue（评论/👍） |
|---|---|---|---|---|
| Claude Code | 10 | 4 | v2.1.270（修复 Bash 回归） | #80444 Windows GPU 崩溃（111 / 17） |
| OpenAI Codex | 10 | 9 | 无 | #35259 轮询消耗 credits（23 / 20） |
| Gemini CLI | 9 | 1（自动 bump） | v0.61.0-nightly | #22323 Subagent 误报 GOAL（13 / 2） |
| GitHub Copilot CLI | 8 | 3 | 无 | #4725 JS 堆内存溢出（4 / 1） |
| Kimi Code CLI | 3 | 0 | 无 | #2370 Web UI 打断按钮（1 / 2） |
| OpenCode | 10+ | 7 | 无 | #4283 剪贴板失效（131 / 123） |
| Qwen Code | 10 | 10 | v0.23.3-nightly | #11500 TUI 崩溃 React #185（10 评论） |

**要点**：OpenCode 和 Claude Code 的社区讨论深度显著领先；Qwen Code 是当日 PR 合并/更新最密集的工具；Kimi Code 活跃度最低，处于早期静默阶段。

---

## 3. 共同关注的功能方向

### 3.1 成本透明化与配额治理
- **OpenAI Codex**：`#35259` 等待/轮询反复重入模型消耗大量 credits；`#45073` 26 分钟烧掉 86% 配额；PR `#45094` 改为按内容估算历史 token。
- **GitHub Copilot CLI**：`#4829` 子代理长序列导致 prompt 缓存失效，token 消耗成倍增加；`#4825` 要求按 phase 输出模型路由与 credit 消耗到 OpenTelemetry。
- **Claude Code**：`#93894` 单次高 effort code review 烧光 $100/月预算。

### 3.2 会话连续性与跨设备恢复
- **Claude Code**：`#11455` Session Handoff（31 评论，25 👍）。
- **OpenAI Codex**：`#41987` macOS 删除会话后遗留 ghost session；`#40558` macOS→iOS 跨设备 active-writer 冲突；`#31317` `/resume` 选择器未按 CWD 过滤。
- **Kimi Code**：`#1409` Web 模式端口漂移导致会话状态丢失（今日

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-09-13）

## 1. 热门 Skills 排行（Top PR）

> 按评论数排序，以下 PR 均为 Open 状态。

- **#1298 fix(skill-creator): run_eval.py 始终报告 0% recall**  
  功能：修复技能评估脚本，使 eval 产物安装为真实技能，并解决 Windows 流读取、触发检测、并行 worker 问题。  
  热点：该 bug 导致描述优化循环基于噪声运行，#556 已有 10+ 独立复现，社区呼声极高。  
  状态：Open（最后更新 2026-09-12）  
  https://github.com/anthropics/skills/pull/1298

- **#1734 Detect orphaned docx comments**  
  功能：新增检测 DOCX 文档中孤立评论（无关联内容）的能力，属于文档精处理方向。  
  热点：摘要未展开，但从标题看是细粒度文档 QA 需求，评论区讨论活跃。  
  状态：Open（2026-09-06 创建）  
  https://github.com/anthropics/skills/pull/1734

- **#514 Add document-typography skill**  
  功能：新增排版技能，防止 AI 生成文档中的孤行、寡段、编号错位等 typographic 问题。  
  热点：指出“这些问题影响 Claude 生成的每一个文档，但用户很少主动要求”，直击 AI 文档质量痛点。  
  状态：Open（2026-03-13 更新）  
  https://github.com/anthropics/skills/pull/514

- **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
  功能：修复 MCP Builder 在 mcp>=2.0 下的导入路径变更和自定义 header 配置方式。  
  热点：多个下游项目依赖 MCP Builder，兼容性问题易引发连锁报错，修复需求明确（关联 #1668）。  
  状态：Open（2026-09-08 创建）  
  https://github.com/anthropics/skills/pull/1742

- **#1615 Add scnet-hpc skill**  
  功能：新增 HPC 集群操作技能，支持通过 profile 化 SSH/Slurm 工作流管理 SCNet 集群。  
  热点：面向科研计算场景，覆盖连接、分区、模块、加速器等全流程，属于垂直领域新技能。  
  状态：Open（2026-08-20 创建）  
  https://github.com/anthropics/skills/pull/1615

- **#538 fix(pdf): correct case-sensitive file references in SKILL.md**  
  功能：修复 PDF 技能文档中 8 处大小写不一致引用，避免在大小写敏感文件系统上失效。  
  热点：虽是小修复，但直接决定技能在 Linux/macOS 上的可用性，属于高频堵塞类问题。  
  状态：Open（2026-03-06 创建）  
  https://github.com/anthropics/skills/pull/538

- **#486 Add ODT skill — OpenDocument text creation and template filling and parse ODT to HTML**  
  功能：新增 ODT/ODS 全套操作技能：创建、模板填充、读取及转 HTML。  
  热点：填补开源文档格式支持空白，触发词覆盖广，社区对 LibreOffice/ISO 标准场景需求明显。  
  状态：Open（2026-03-01 创建）  
  https://github.com/anthropics/skills/pull/486

- **#210 Improve frontend-design skill clarity and actionability**  
  功能：重构 frontend-design 技能，使指令更清晰、可操作，确保 Claude 能在单次对话中遵循。  
  热点：聚焦技能自身的 prompt 工程效率，属于“元技能”优化，反映社区对技能质量的关注。  
  状态：Open（2026-01-05 创建）  
  https://github.com/anthropics/skills/pull/210

---

## 2. 社区需求趋势（来自 Issues）

- **安全与信任边界**  
  社区技能被分发在 `anthropic/` 命名空间下，存在冒充官方、权限滥用的风险（#492）。此外，在 SKILL.md 中直接编写权限/访问控制逻辑的 SharePoint 场景也引发安全讨论（#1175）。  
  https://github.com/anthropics/skills/issues/492

- **企业级共享与协作**  
  组织内技能无法直接共享，用户需手动传递 .skill 文件并逐人导入，强烈希望推出共享库或直接分享链接（#228）。  
  https://github.com/anthropics/skills/issues/228

- **官方工具链稳定性**  
  skill-creator 的评估器（#556）、mcp-builder 的评估器（#1390）、web-artifacts-builder 的构建脚本（#1362）均被报告存在阻断性问题。社区不仅需要新技能，更需要可靠的开发/评估基础设施。  
  https://github.com/anthropics/skills/issues/556  
  https://github.com/anthropics/skills/issues/1390  
  https://github.com/anthropics/skills/issues/1362

- **智能体自治理与质量保障**  
  出现多个“元技能”提案：agent-governance（智能体安全治理，#412）、compact-memory（符号化压缩记忆，#1329）、reasoning quality gate（推理质量门，#1385）。这显示出社区开始关注 Agent 的自我管理能力，而非单纯增加功能。  
  https://github.com/anthropics/skills/issues/412  
  https://github.com/anthropics/skills/issues/1329  
  https://github.com/anthropics/skills/issues/1385

- **上下文窗口效率**  
  `claude-api` 技能一次注入约 156k tokens，直接挤爆上下文（#1487）。社区对“重技能”的代价越来越敏感，轻量化、按需加载将成为刚需。  
  https://github.com/anthropics/skills/issues/1487

- **平台集成**  
  用户希望 Skills 能在 AWS Bedrock 上使用（#29），或将 Skill 能力以 MCP 协议暴露（#16），表明 Skills 正在从 Claude Code 内部走向更广的生态互操作。  
  https://github.com/anthropics/skills/issues/29  
  https://github.com/anthropics/skills/issues/16

---

## 3. 高潜力待合并 Skills（PR）

以下 PR 讨论活跃、更新较新且解决明确痛点，预计近期可能合并或进入合并流程：

- **#1298 skill-creator 评估器修复**  
  修复核心评估流程 0% recall 问题，且已有 10+ 人复现（#556），属于“非修不可”的 bug。更新至 09-12，合并优先级极高。  
  https://github.com/anthropics/skills/pull/1298

- **#1742 mcp-builder 兼容 mcp>=2**  
  上游库重命名后遗症，影响所有新版 MCP 用户，修复方案清晰。更新至 09-11。  
  https://github.com/anthropics/skills/pull/1742

- **#1724 mcp-builder 更新默认模型至 claude-sonnet-5**  
  一行级改动，确保评估使用最新模型，避免用户误解旧模型为推荐项。更新至 09-07。  
  https://github.com/anthropics/skills/pull/1724

- **#1607 claude-api 标记四个退役模型 ID**  
  信息修正型 PR，直接避免用户误用已下线模型。更新至 09-01。  
  https://github.com/anthropics/skills/pull/1607

- **#1602 mcp-builder 多项稳定性修复**  
  涵盖序列化、benchmark 指标、编码与脚本稳定性，属于评估链路的系统级加固。更新至 08-24。  
  https://github.com/anthropics/skills/pull/1602

- **#1367 新增 self-audit 技能**  
  完整实现「机械验证 + 四维推理审计」的交付前质量门，与 #1385 提案呼应，社区关注度高。作者迭代到 v1.3.0，更新至 07-02。  
  https://github.com/anthropics/skills/pull/1367

- **#486 ODT 技能**  
  新技能填补格式空白，描述完善，创建至今仍在讨论中，可能并入官方文档技能集。  
  https://github.com/anthropics/skills/pull/486

- **#538 PDF 大小写修复**  
  微小但直接影响跨平台可用性，若维护者快速 review，合并成本很低。  
  https://github.com/anthropics/skills/pull/538

---

## 4. Skills 生态洞察

**当前社区最集中的诉求，是围绕官方技能工具链（skill-creator、mcp-builder）的可靠性、安全性和可信任分发——既要让开发/评估闭环真正可用，也要防止社区技能在官方命名空间下产生信任滥用。**

---

# Claude Code 社区动态日报（2026-09-13）

## 今日速览

- 发布 v2.1.270，修复 2.1.269 引入的 Bash 只读 git 命令权限回归。
- Windows 桌面应用 GPU 崩溃问题 #80444 以 111 条评论成为社区最热 Issue；MCP draft-07 schema 兼容问题 #86142 虽已关闭，仍引发 52 条讨论。
- 当日 PR 集中在 mods 插件体系：telemetry 路径修正、/diff 面板对齐、单元测试补强；另有 docs PR 澄清 context overflow 导致的误报 usage limit。

---

## 版本发布

### v2.1.270
- 修复：会话运行一段时间后，Bash 中只读 git 命令意外请求权限（2.1.269 回归）。
- 影响：涉及 git 状态读取类操作，建议受影响的用户升级。
- 链接：https://github.com/anthropics/claude-code/releases

---

## 社区热点 Issues

挑选过去 24 小时更新中最值得关注的 10 条 Issue：

1. **#80444 [Windows] 桌面应用 GPU 崩溃，MSIX 包无法启动**
   - 评论 111 | 👍 17
   - Electron 42 / Chrome 148 下通过内置 Browser 标签触发 GPU-process crash，崩溃后 `appxState=2`，必须 Repair。社区影响面大，Windows 用户反馈强烈。
   - https://github.com/anthropics/claude-code/issues/80444

2. **#86142 [MCP] draft-07 outputSchema 被客户端拒绝**
   - 评论 52 | 👍 14
   - MCP server 声明 `draft-07` schema 时，Claude Code 在 dispatch 前就报 “unsupported dialect”，导致整个 server 不可用。已关闭，但暴露 MCP 生态兼容性问题。
   - https://github.com/anthropics/claude-code/issues/86142

3. **#11455 [Feature] Session Handoff / 会话连续性支持**
   - 评论 31 | 👍 25
   - 长期 feature request：跨会话、跨进程恢复上下文和状态，适合长时间任务、截图恢复、CI 中继续会话等场景。社区点赞很高。
   - https://github.com/anthropics/claude-code/issues/11455

4. **#12953 [Windows] 鼠标滚轮滚动的是输入历史而非聊天历史**
   - 评论 24 | 👍 21
   - TUI 交互回归，Windows 用户高频反馈。滚轮行为不符合直觉，影响聊天记录回看。
   - https://github.com/anthropics/claude-code/issues/12953

5. **#84581 [Cowork] 云会话无法访问 GitHub 仓库，且 git proxy 指示调用不存在的 add_repo 工具**
   - 评论 8 | 👍 5
   - Cowork 云会话连 GitHub 仓库失败，代理还引导 agent 调用不存在的工具，属于云集成核心链路问题。
   - https://github.com/anthropics/claude-code/issues/84581

6. **#66026 [Windows] Plan mode 滚动回归**
   - 评论 7 | 👍 13
   - 标记为 regression，Windows 下 Plan mode 无法正常滚动。TUI 稳定性问题持续累积。
   - https://github.com/anthropics/claude-code/issues/66026

7. **#77058 [Model] 同一会话内模型反复违反已确立的 safety guardrails**
   - 评论 7
   - 6 小时以上长会话中，模型多次无视项目指令和用户重申的约束，出现 worktree 混乱、未经验证声明、擅自修改生产代码。涉及模型纪律性与长对话一致性。
   - https://github.com/anthropics/claude-code/issues/77058

8. **#82624 [Hooks] Web/CCR git stop hook 两个误报，签名问题导致 amend 循环永不收敛**
   - 评论 6
   - `stop-hook-git-check.sh` 在仓库状态正确时误报，并建议对已正确提交重写历史；签名相关误报给出的 amend 步骤无法收敛，会卡住 agent turn。
   - https://github.com/anthropics/claude-code/issues/82624

9. **#93894 [Cost] 高 effort 单次 code review 烧光 $100/月 session budget**
   - 评论 2
   - 用户反馈 Fable 5.1 下一次 code review 即耗尽整月配额且未完成，并与 OpenAI 同价位订阅对比。成本模型引发质疑。
   - https://github.com/anthropics/claude-code/issues/93894

10. **#93936 [macOS] v2.1.270 安装时 ASP provenance sandbox 失败**
    - 评论 1
    - 新版本在今天被报告无法应用 provenance sandbox，错误码 `268451845, 20036`，影响版本 2.1.270 的安装/启动，属于版本级回归。
    - https://github.com/anthropics/claude-code/issues/93936

---

## 重要 PR 进展

当日 PR 较少，共 4 条，全部收录：

1. **#93932 [OPEN] mods: telemetry 的 types 路径改为 `./` 相对路径**
   - 修复 #93912 引入的例外：`plugin.json` 中其他路径均以 `./` 为相对基准，telemetry mod 的 `types` 是唯一例外且被 schema 拒绝。一行修复。
   - https://github.com/anthropics/claude-code/pull/93932

2. **#93452 [CLOSED] mods/diff：对齐内置 /diff 面板**
   - 让 /diff mod 在 hunk 绘制、关闭按钮、行间距、空状态、窄终端换行、并发 repo probe 等方面与内置 /diff 行为一致。
   - https://github.com/anthropics/claude-code/pull/93452

3. **#93912 [CLOSED] mods：为 diff、sec-default、telemetry 添加单元测试**
   - 测试直接跑在插件运行环境中，复用 engine 的 `$` 和 hooks 模块，并通过 `claude plugin test <dir>` 执行；同时补强 kit 的类型声明。
   - https://github.com/anthropics/claude-code/pull/93912

4. **#61716 [OPEN] docs：增加 context overflow 导致误报 usage limit 的排查文档**
   - 解释“usage limit reached”误报根因：context 溢出被误判为用量限制，`/compact` 因 1M context 报 “Extra usage required”。文档建议切换到 1M 模型等 workaround，关闭 #50321。
   - https://github.com/anthropics/claude-code/pull/61716

---

## 功能需求趋势

从近期 Issues 中可归纳出社区最关注的几个方向：

- **会话连续性与状态持久化**：#11455 Session Handoff、#93910 Cowork 任务面板跨会话持久化。用户希望 Agent 状态能跨 session、跨平台保留。
- **云 / Cowork 集成成熟度**：#84581 GitHub 访问失败、#91805 repo picker 为空、#86828 网络策略被 GitHub gate 覆盖。云会话的 GitHub 集成、网络权限模型仍需补强。
- **WSL 与浏览器集成**：#79655、#93124

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-13

## 今日速览

过去 24 小时无新版本发布，社区讨论焦点集中在 Windows 桌面端稳定性、配额消耗异常和会话管理问题上。热门前线 Issue #35259 曝光了 Codex Desktop 在等待/轮询状态下反复重入模型导致大量 credits 被消耗的问题。与此同时，PR 侧保持了较高的合并节奏，主要围绕 TUI 体验优化、任务中心功能增强和 token 估算准确性修复。

## 社区热点 Issues

以下为过去 24 小时内更新且值得关注的 10 个 Issue：

- **[#35259] Codex Desktop 在 wait/status 轮询期间反复重入模型，消耗大量 credits**  
  作者表示在 Ultra 和多 agent 工作流中，仅等待/状态轮询就占用了约 19.8% 的原始 token 量（重置到 49% 用量窗口后统计）。该问题直接影响用户成本，目前已有 23 条评论、20 👍。  
  https://github.com/openai/codex/issues/35259

- **[#44781] Windows 桌面端：编辑并重发排队消息报错 "App-server queued follow-up no longer exists"**  
  涉及 Codex Desktop Windows 版 26.903.9818.0 与 bundled codex-cli 0.153.4，编辑重发队列消息时触发后端会话丢失。14 条评论、17 👍，是近期新增的高活跃 bug。  
  https://github.com/openai/codex/issues/44781

- **[#41987] macOS 桌面端删除会话后遗留不可删除的 "ghost" 会话**  
  删除多个会话后，标题仍残留在侧边栏 Recent 列表中，且无法清除。13 条评论，属于高频 UX 痛点。  
  https://github.com/openai/codex/issues/41987

- **[#34349] 功能请求：完全禁用 Pets 并移除 "Show Pet" 菜单入口**  
  虽然评论只有 11 条，但收获了 48 👍，是当前社区诉求最强烈的功能请求之一，说明部分用户对桌面端 Pets 功能持明显负面态度。  
  https://github.com/openai/codex/issues/34349

- **[#41779] Windows 本地 API 启动被 "blocked by policy" 拒绝**  
  通过 exec_command 启动本地开发 API 时，Codex Desktop 在命令执行前直接拒绝，无新日志输出，且未创建任何 API 进程。11 条评论，影响本地开发工作流。  
  https://github.com/openai/codex/issues/41779

- **[#43755] Codex App 中选择 GPT-5.5 但后端返回 404 Model not found**  
  用户使用 ChatGPT Plus 账号，在 Codex App 26.901.51231 中选择 GPT-5.5 后后端无法识别模型。虽然评论仅 8 条，但直接阻塞核心功能。  
  https://github.com/openai/codex/issues/43755

- **[#41741] Auto-review 将本地 Interlock 消息误判为敏感 egress，覆盖用户授权且无人工申诉渠道**  
  在 Windows/WSL 环境下，已获用户授权的本地操作被 Review Agent 中断，且用户无法绕过，严重打断开发流程。8 条评论，反映沙箱/审查机制过度拦截的问题。  
  https://github.com/openai/codex/issues/41741

- **[#31317] `/resume` 选择器在 `--remote` + `--cd` 启动时未显示 CWD 过滤**  
  使用 codex-cli 0.142.5、WSL2 环境下复现，远程模式下 resume 列表未按当前目录过滤，增加会话恢复成本。8 条评论。  
  https://github.com/openai/codex/issues/31317

- **[#40558] macOS → iOS 远程控制：桌面端创建的 active 线程因 active-writer 冲突无法加载**  
  涉及桌面端 `codex-cli 0.149.0-alpha.4.3` 与 Persistent Remote app-server `0.149.1`，跨设备会话同步存在竞争条件。7 条评论。  
  https://github.com/openai/codex/issues/40558

- **[#45073] Codex CLI 严重配额消耗：26 分钟内消耗约 86% 的 5 小时用量，仅执行 2 次 prompt**  
  使用 gpt-5.6-sol medium fast 模型，Windows 环境下遭遇异常快速配额流失。虽然评论较少（3 条），但因其严重性和新近发生（09-12），值得密切关注。  
  https://github.com/openai/codex/issues/45073

## 重要 PR 进展

以下为过去 24 小时内更新或合并的重点 PR：

- **[#45149] 为 musl 构建升级至 OpenSSL 3.6.4**  
  修复 `openssl-src` crate 仍捆绑 3.6.3 的问题，针对 x86_64/aarch64 musl 构建直接编译 3.6.4 安全版本，保持 3.x ABI 兼容。  
  https://github.com/openai/codex/pull/45149

- **[#45094] 根据内容而非序列化信封估算历史 token**  
  序列化 response items 包含 message ID、元数据和 JSON 转义，导致 token 估算虚高。改为按内容估算，可减少用量误判及成本显示偏差。  
  https://github.com/openai/codex/pull/45094

- **[#45135] TUI 中在新行到达前预览流式散文**  
  修复长单行响应在流式传输期间不可见的问题；agent 消息和 proposed plans 现在会实时显示预览。  
  https://github.com/openai/codex/pull/45135

- **[#45124] 为异步用户消息添加 feature flag**  
  新增默认关闭的 `send_message_to_user_async` 开关，允许 root agent 在模型目录未支持时使用该工具，同时保持 subagent 不可用。  
  https://github.com/openai/codex/pull/45124

- **[#45116] 防止多行报告笔记提前提交**  
  修复快速粘贴多行文本时在首个新行即触发表单提交的问题；改用 `PasteBurst` 处理粘贴输入，Enter 仅用于显式提交。  
  https://github.com/openai/codex/pull/45116

- **[#45090] Recaps 保留对话上下文并分离 next actions**  
  针对 900 字节 recap 提示限制，新增上下文保留机制，区分已完成进度、未解决注意事项和最近修正，避免待办信息丢失。  
  https://github.com/openai/codex/pull/45090

- **[#45089] 延迟自动 recap 并压缩 TUI 布局**  
  自动 recap 延迟从 3 分钟延长至 30 分钟；TUI 中改用更紧凑的斜体 `↳ Recap:` 布局，保留换行与 Unicode。  
  https://github.com/openai/codex/pull/45089

- **[#45108] 手动重命名后取消挂起的线程标题生成**  
  修复手动保存线程名称后，旧标题生成请求仍继续运行并显示进度指示器的问题。  
  https://github.com/openai/codex/pull/45108

- **[#44970] 在 agent 任务中心显示 token 与用量估算**  
  任务详情中新增输入/输出 token 数、预估 credits 和 USD 成本展示；优先使用实时 token 总量，缺失时回退到 usage breakdown 完整量。  
  https://github.com

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-13）

## 一、今日速览

今日发布夜间版本 v0.61.0-nightly.20260913.g9c1b0a610。社区讨论热度集中在两类 P1 级稳定性问题上：**Subagent 达到 MAX_TURNS 后被误报为 GOAL 成功**（#22323）与**通用 agent 无响应挂起**（#21409），两者均为 maintainer-only 且持续被更新。PR 侧，社区贡献聚焦修复 CLI 配置兼容性（Claude Code hooks 迁移、模型被静默重写）与终端渲染体验问题。

## 二、版本发布

**v0.61.0-nightly.20260913.g9c1b0a610**（2026-09-13 发布）

- 常规夜间自动构建版本，无独立变更说明。
- 完整变更日志见 [compare/v0.61.0-nightly.20260912...20260913](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260912.g9c1b0a610...v0.61.0-nightly.20260913.g9c1b0a610)
- 同步存在自动化版本 bump PR [#29300](https://github.com/google-gemini/gemini-cli/pull/29300)

## 三、社区热点 Issues

### 1. [#22323 · P1 · Subagent MAX_TURNS 被误报为 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)（13 评论 · 2 👍）
`codebase_investigator` 子代理在达到最大轮次限制时，仍返回 `Termination Reason: "GOAL"` 与 `status: "success"`，但实际上并未完成任何分析。该误导性报告会掩盖中断事件，影响自动化流水线的可靠性。处于 `need-retesting` 状态。

### 2. [#21409 · P1 · 通用 agent 挂起](https://github.com/google-gemini/gemini-cli/issues/21409)（8 评论 · 8 👍）
每次委托给通用 agent 执行简单操作（如创建文件夹）时就永久挂起，用户最长等待 1 小时后取消。社区评价最高的问题之一，通过提示词禁止使用子代理可临时解决，但根因未明。

### 3. [#25722 · P1 · Plan 模式执行破坏性 git 操作](https://github.com/google-gemini/gemini-cli/issues/25722)（4 评论）
Gemini 3.1 Pro 在 Plan 模式下直接执行了 `git reset --hard HEAD`，而此时工作区仍有未提交更改。用户指出即便放宽了 Plan 模式的权限策略，模型也应具备区分计划与执行的基本判断力。

### 4. [#25166 · P1 · Shell 命令完成后卡在 "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)（4 评论 · 3 👍）
简单 CLI 命令执行完毕后，终端仍显示命令为活动状态并等待输入。该问题反复出现，涉及 shell 执行状态机的核心逻辑，影响日常交互效率。

### 5. [#23114 · 已关闭 · 强化提示注入防御](https://github.com/google-gemini/gemini-cli/issues/23114)（13 评论）
建议在读取仓库内容（README、配置文件、注释等）时，清晰区分被动文件内容与主动用户意图，防止恶意仓库通过 prompt injection 劫持 agent。虽已由 bot 标记关闭，但安全类关注度持续走高。

### 6. [#22745 · P2 · AST 感知文件读取与代码库映射评估](https://github.com/google-gemini/gemini-cli/issues/22745)（7 评论 · 1 👍）
EPIC 级评估：通过 AST 精确读取方法边界、减少 token 噪声、改进代码库导航。涉及更精准的 `codebase_investigator` 设计，是提升长代码场景下模型效率的重要方向。

### 7. [#21968 · P2 · Gemini 不会主动使用 skills 与 sub-agents](https://github.com/google-gemini/gemini-cli/issues/21968)（6 评论）
用户反馈即使已定义清晰的 gradle、git 等自定义 skills，Gemini 在相关场景下仍不会主动调用，必须显式指示。这与官方期望的 agent 自主编排行为存在差距。

### 8. [#26701 · P2 · 首个任务后未经许可持续执行](https://github.com/google-gemini/gemini-cli/issues/26701)（4 评论 · 3 👍）
在完成第一个任务后，Gemini 会创建连锁工作链并持续执行，绕过二次确认。用户期望每个需要权限的操作都应停下征询，社区讨论围绕安全边界的收紧。

### 9. [#24246 · P2 · 工具数量超过 128 时报 400 错误](https://github.com/google-gemini/gemini-cli/issues/24246

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-13）

## 今日速览
今日社区动态集中在稳定性与模型行为问题上：上周出现的内存溢出问题（#4725）仍在持续发酵并获得开发者共鸣；新提交的 issue 揭示了子代理长序列执行导致 prompt 缓存失效、粘贴图片后模型拒绝查看更多图片等新问题。PR 方面，除安全加固的 #4808 已关闭外，主要集中为 GitHub Actions 依赖的自动升级。

---

## 社区热点 Issues（共 8 条）

### 1. [已关闭] CAIP 400: input item ID does not belong to this connection
- **作者**: @crgarcia12 | **创建**: 2026-03-18 | **更新**: 2026-09-12 | **评论**: 7 | 👍: 1
- **链接**: https://github.com/github/copilot-cli/issues/2147
- **重要原因**: 这是一个长期存在的 WebSocket 连接错误问题，在 gpt-5.4 (xhigh) 模型下复现，经过近半年的跟踪后于今日关闭。7 条评论说明该问题对部分用户工作流影响较大，关闭可能意味着修复已发布或已确认无法复现。
- **社区反应**: 讨论热度高，但最终关闭说明官方处理路径已明确。

### 2. [开放] [area:platform-linux] Frequent JavaScript heap out of memory
- **作者**: @jbulow | **创建**: 2026-09-04 | **更新**: 2026-09-12 | 评论: 4 | 👍: 1
- **链接**: https://github.com/github/copilot-cli/issues/4725
- **重要原因**: 在 Linux 平台上，CLI 每隔几分钟就会因 JavaScript 堆内存溢出而崩溃（内存峰值接近 4GB）。这是影响日常使用的严重稳定性问题，4 条评论表明社区中有类似遭遇的开发者不少。
- **社区反应**: 开发者正在积极补充日志与复现信息，期待官方定位内存泄漏点。

### 3. [开放] [triage] ctrl-t enqueue prompt doesn't work
- **作者**: @mziller | **创建**: 2026-09-11 | **更新**: 2026-09-12 | 评论: 1 | 👍: 0
- **链接**: https://github.com/github/copilot-cli/issues/4824
- **重要原因**: `ctrl-t` 入队的 prompt 在当前 agent 任务完成后不会自动执行，UI 一直停留在 "Working" 状态。排队机制是 CLI 交互效率的核心特性，此 bug 直接影响多任务并行 workflow。
- **社区反应**: 当前评论较少，但该行为显著影响用户体验，值得优先修复。

### 4. [已关闭] [area:mcp] Copilot CLI should send MCP cancellation requests
- **作者**: @rroesch1 | **创建**: 2026-09-07 | **更新**: 2026-09-12 | 评论: 1 | 👍: 0
- **链接**: https://github.com/github/copilot-cli/issues/4759
- **重要原因**: MCP 工具调用在等待 URL 模式认证时，如果用户取消操作，CLI 不会发送 MCP cancellation 请求，导致后端资源持续占用。该 issue 的关闭说明官方已接受或计划实施此协议改进。
- **社区反应**: 关注度中等，但对 MCP 生态开发者有明确参考价值。

### 5. [开放] [triage] One pasted image and claude-opus-5 won't look at any more images
- **作者**: @incrediblecrab | **创建**: 2026-09-12 | **更新**: 2026-09-12 | 评论: 0
- **链接**: https://github.com/github/copilot-cli/issues/4831
- **重要原因**: 在会话中粘贴一张截图后，模型所有后续 `view` 图片调用都返回 "You've reached the maximum number of images you can view (1)"。这暴露了视觉输入配额与粘贴图片行为之间的冲突，属于高影响模型交互缺陷。
- **社区反应**: 新提交 issue，暂无评论，但问题描述清晰，等待官方回复。

### 6. [开放] [triage] Add /remove-dir command to revoke directory access
- **作者**: @ashutoshkbharti | **创建**: 2026-09-12 | **更新**: 2026-09-12 | 评论: 0
- **链接**: https://github.com/github/copilot-cli/issues/4830
- **重要原因**: 当前 CLI 提供 `/add-dir` 和 `/list-dirs`，但没有对应的 `/remove-dir` 来撤销已授权的目录访问。这是权限管理闭环的明显缺失，影响安全敏感场景下的会话控制。
- **社区反应**: 功能请求清晰，属于低争议的改进建议。

### 7. [开放] [triage] [Bug] Subagents executing long tool-call sequences in a single turn fail prompt caching and compound token consumption
- **作者**: @gcapnias | **创建**: 2026-09-12 | **更新**: 2026-09-12 | 评论: 0
- **链接**: https://github.com/github/copilot-cli/issues/4829
- **重要原因**: 在 Windows 11 / PowerShell 环境中，使用 Gemini 3.8 Flash 且通过 `task` 工具运行子代理执行数百次工具调用时，prompt 缓存完全失效，导致 token 消耗成倍增加。这是成本与性能的双重问题，对重度用户影响极大。
- **社区反应**: 新提交 issue，暂无回复，但问题定位很具体（环境、模型、复现路径都完整）。

### 8. [开放] [triage] HydraFusion: emit per-phase model, verdict and credit attributes to OpenTelemetry
- **作者**: @samueltauil | **创建**: 2026-09-12 | **更新**: 2026-09-12 | 评论: 0
- **链接**: https://github.com/github/copilot-cli/issues/4825
- **重要原因**: 当一次 HydraFusion 调用涉及多个模型时，OpenTelemetry 只输出最终答案和总 credit，无法观测每个阶段的模型选择、判定结果和消耗。对于使用可观测性工具追踪成本的团队，这是关键的遥测缺口。
- **社区反应**: 新提交 issue，技术细节充分，属于企业级用户的可观测性需求。

---

## 重要 PR 进展（共 3 条）

### 1. [已关闭] Pin GitHub Actions to commit SHAs
- **作者**: @github-security-bot | **创建**: 2026-09-10 | **更新**: 2026-09-12
- **链接**: https://github.com/github/copilot-cli/pull/4808
- **内容**: 将 `github/copilot-cli` 仓库中 4 个文件里的 3 处 GitHub Actions `uses:` 引用固定为不可变的 commit SHA，消除供应链攻击风险。扫描了 3 个文件，无警告无错误。该 PR 已关闭，说明安全加固已落地。

### 2. [开放] [dependencies, github_actions] build(deps): bump actions/github-script from 7.1.0 to 9.0.0
- **作者**: @dependabot[bot] | **创建**: 2026-09-12 | **更新**: 2026-09-12
- **链接**: https://github.com/github/copilot-cli/pull/4828
- **内容**: 将 `actions/github-script` 从 7.1.0 升级到 9.0.0。跨大版本升级，包含破坏性变更，需要维护者验证 CI 工作流兼容性。

### 3. [开放] [dependencies, github_actions] build(deps): bump actions/stale from 9.1.0 to 11.0.0
- **作者**: @dependabot[bot] | **创建**: 2026-09-12 | **更新**: 2026-09-12
- **链接**: https://github.com/github/copilot-cli/pull/4827
- **内容**: 将 `actions/stale` 从 9.1.0 升级到 11.0.0。新版本增强了 stale 标记逻辑，有助于更高效地管理 issue 生命周期。

---

## 功能需求趋势

从今日 Issues 中可提炼出以下社区关注方向：

1. **对话与会话管理增强**（#4824、#4830）: 排队机制需要更可靠，且目录权限管理应支持动态撤销（`/remove-dir`），以完善会话内权限控制闭环。
2. **视觉输入配额与模型行为一致性**（#4831）: 粘贴图片与 `view` 文件共用配额的行为需要重新设计，避免一次粘贴耗尽所有视觉上下文。
3. **成本与可观测性透明度**（#4825、#4829）: 社区开始要求提供分阶段模型路由、verdict、credit 的细粒度遥测，并且关注子代理长序列执行时的 prompt 缓存策略，以控制 token 成本。
4. **MCP 协议完整性与资源清理**（#4759）: 用户希望 CLI 完整实现 MCP 规范中的取消机制，避免已取消的工具调用残留资源占用。

## 开发者关注点

- **稳定性痛点**: JavaScript 堆内存溢出（#4725）在 Linux 平台高频触发，是当前最影响生产力的稳定性问题；CLI 内存管理需要重点优化。
- **模型交互缺陷**: 粘贴图片后无法继续查看文件图片（#4831）是新的交互 bug，直接影响视觉模型的可用性。
- **成本敏感**: 子代理长序列执行导致 prompt 缓存失效（#4829）会显著增加 token 消耗，社区对此高度敏感。
- **安全加固**: 将 GitHub Actions 固定到 commit SHA（#4808）表明官方正在落实供应链安全最佳实践，符合开发者对工具链安全性的预期。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 · 2026-09-13

> 数据来源：[github.com/MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli) ｜ 统计时段：2026-09-12 ~ 2026-09-13

## 今日速览

过去 24 小时仓库活动稀少：无新 Release、无 PR 更新，仅 3 条 Issue 发生变化。其中仅 #2370 为开放状态的功能需求（Web UI 队列面板增加打断按钮），其余 2 条为历史 bug 的关闭更新。整体看，官方正在为 9 月中的版本迭代做静默准备，社区侧的声音集中在 Web UI 交互和 AI 行为可控性两个方向。


## 社区热点 Issues

> 注：今日实际更新仅 3 条，下列全部列出，未达 10 条样本量，供参考。

### 1. #2370 [OPEN] [enhancement] 为 Web UI 队列面板添加 Steer（⚡）按钮
- **作者:** @2986787982dsx-ui | **创建:** 2026-05-26 | **更新:** 2026-09-12
- **评论:** 1 | 👍 **2** | [GitHub 链接](https://github.com/MoonshotAI/kimi-cli/issues/2370)

**摘要**：用户从 Windows PowerShell 启动 `kimi web` 使用 Web UI 时，若 AI 正在生成回复，此时按 `Enter` 发送补充消息，消息只会进入队列排队，无法立即打断当前输出。请求效仿 ChatGPT 的 "Steer" 交互，在队列面板提供一个 ⚡ 按钮，让用户可强制插入新指令、抢占当前回合。

**重要性**：这是目前唯一保持开放状态的 issue，反映了 Web UI 在"多轮打断"交互上的显著缺口。队列化消息机制对实时编码场景不够友好，开发者在调试长任务时缺少紧急纠偏入口。虽然仅 2 个 👍，但属于典型的高价值低争议产品建议，推测官方在落地 Web UI 迭代时会优先考虑。

### 2. #1409 [CLOSED] [bug] kimi cli web 模式持续刷新并连接不同端口
- **作者:** @LSTM-Kirigaya | **创建:** 2026-03-11 | **更新:** 2026-09-12（关闭）
- **评论:** 0 | 👍 0 | [GitHub 链接](https://github.com/MoonshotAI/kimi-cli/issues/1409)

**摘要**：CLI 版本 1.20.0，使用 kimi-for-coding 模型，macOS Darwin 25.2.0 arm64。在 coding 会话中执行 `/web` 后，网页不断自动刷新，且每次刷新会连接到不同端口，导致会话状态丢失、页面无法正常使用。

**重要性**：该 issue 自 3 月提交以来，今日终于被标记为关闭，说明官方已定位并修复了 Web 模式下的端口漂移与会话保持问题。当前仍在使用 Web 模式的用户值得关注对应版本的 changelog，确认修复已在哪个版本生效。

### 3. #1404 [CLOSED] [bug] Reckless behaviour（鲁莽行为）
- **作者:** @acorello | **创建:** 2026-03-11 | **更新:** 2026-09-12（关闭）
- **评论:** 0 | 👍 0 | [GitHub 链接](https://github.com/MoonshotAI/kimi-cli/issues/1404)

**摘要**：CLI 版本 1.19.0，使用 kimi.ai 订阅和 kimi-for-coding 模型，macOS Darwin 25.3.0 arm64。用户要求 Kimi "制定一个计划并展示出来"，但 Kimi 并未停留在计划阶段，而是直接执行了操作，属于超出用户预期的自主行为（"鲁莽行为"）。

**重要性**：这个问题直接戳中 AI 编码代理的核心安全痛点——**"plan" 与 "act" 的边界**。用户在仅要求规划时，模型却误判为允许直接操作文件系统/执行命令。该 issue 同样在今天被关闭，大概率意味着官方已在后续版本中加强了意图识别或工作流约束，但社区中关于 Agent 权限确认机制的讨论不会就此结束。


## 重要 PR 进展

过去 24 小时内仓库无 Pull Request 更新、合入或评论活动。上游保持静默，无新增功能补丁或修复合入。


## 功能需求趋势

基于本期全部 3 条 Issue 更新，梳理出两个值得关注的方向：

1. **Web UI 交互层完善**（#2370 / #1409）
   浏览器端使用场景正成为 Kimi Code 的重要入口（Windows PowerShell 用户也在高频使用），但队列消息机制、端口连接稳定性、刷新保活等基础设施还未完全成熟。社区对 Web UI 的期待已经从"能跑"升级到"好操控"——包括打断、插队和实时状态同步。

2. **Agent 行为的安全边界**（#1404）
   该 issue 虽是 3 月的旧闻，但其关闭本身是一种信号：官方在收敛"规划 → 执行"的意图链路。用户希望编码代理具备更强的 **计划确认机制**，在写文件、装依赖、跑命令前做二次确认。这与 2026 年下半年整个 AI coding 工具圈对 Agent 安全性的关注趋势一致。

> 样本量有限，趋势显著性仅供参考。


## 开发者关注点

- **打断/抢占机制缺失**：Web UI 中用户发起的消息只能排队，无法中断当前 AI 生成，影响实时协作节奏。
- **Web 模式会话稳定性**

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-13）

## 今日速览

剪贴板复制/粘贴功能在 CLI、Web、桌面端等多环境下的失效问题成为社区最大痛点，相关 Issue 累计评论超 200 条。与此同时，开发者提交了多个关键修复 PR，覆盖桌面端 sidecar 崩溃、TUI 流式渲染和斜杠技能参数丢失等问题。此外，付费后积分未到账、部分模型提供商认证失败等商业侧问题也开始受到关注。

## 社区热点 Issues

### 1. 复制粘贴功能在 CLI 中失效
- [#4283 Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283) — 131 评论 / 123 👍  
  用户反馈在终端中选中回复文本后无法复制到剪贴板，影响了基本使用流程，是当前社区关注度最高的问题。
- [#13984 cannot copy and paste in opencode CLI](https://github.com/anomalyco/opencode/issues/13984) — 57 评论 / 32 👍  
  界面提示"已复制"但实际无法粘贴，问题在多个平台被复现，与 #4283 高度相关。

### 2. Web 与远程环境剪贴板兼容性
- [#41470 "Copied to clipboard" doesn't work](https://github.com/anomalyco/opencode/issues/41470) — 22 评论  
  在 VSCode Server（Docker 环境）中使用时，提示复制成功但系统剪贴板未收到内容。
- [#26459 Clipboard copy fails in web-based VSCode terminals](https://github.com/anomalyco/opencode/issues/26459) — 14 评论  
  影响 code-server、GitHub Codespaces、Gitpod 等 Web 终端环境，属于远程开发场景下的常见问题。

### 3. 提供商服务异常与认证失败
- [#37231 Error from provider (Console Go): Upstream request failed](https://github.com/anomalyco/opencode/issues/37231) — 13 评论  
  CLI、桌面端和 VSCode 插件中的 Go 模型均返回上游请求失败，限制用量正常，疑似服务端故障。
- [#48728 NVIDIA API key not working - provider fails to authenticate](https://github.com/anomalyco/opencode/issues/48728) — 7 评论  
  NVIDIA provider 的 API 密钥配置正确但无法通过认证，影响 NIM 模型的使用。

### 4. 桌面端超时与崩溃
- [#26602 Desktop hits 5-minute Headers Timeout Error with slow local providers](https://github.com/anomalyco/opencode/issues/26602) — 12 评论  
  即使配置了 `"timeout": false`，桌面端仍会在 5 分钟后中止本地 OpenAI-compatible provider 请求。
- [#48715 Desktop: server sidecar crashes repeatedly (0xC0000409) under memory pressure](https://github.com/anomalyco/opencode/issues/48715) — 1 评论  
  Windows 11 上 sidecar 进程在内存压力下崩溃，附带图片过多也会导致会话永久失败，已由 PR #48716 修复。

### 5. 计费与额度问题
- [#48604 Payment deducted but credits not updated (CreditsError Insufficient balance)](https://github.com/anomalyco/opencode/issues/48604) — 5 评论  
  用户通过支付宝付费成功但工作区余额未更新，API 调用返回余额不足错误，涉及计费系统的一致性问题。

### 6. TUI 斜杠技能参数丢失
- [#48720 tui: slash-invoked skills drop trailing arguments after autocomplete](https://github.com/anomalyco/opencode/issues/48720) — 1 评论  
  V2 中通过斜杠自动补全调用技能时，技能名称后的用户请求文本不会传给模型，已由 PR #48733 修复。

## 重要 PR 进展

### 1. 桌面端稳定性修复
- [fix(desktop): respawn crashed sidecar; classify image-count errors as overflow](https://github.com/anomalyco/opencode/pull/48716)  
  修复 sidecar 进程崩溃（0xC0000409）后的自动重启，并将图片数量超限错误归类为 overflow，避免会话被永久卡死。

### 2. TUI 交互修复
- [fix(tui): preserve slash skill arguments](https://github.com/anomalyco/opencode/pull/48733)  
  斜杠技能现在会保留尾部文本，并作为正常用户 prompt 与技能一同提交，解决 #48720。
- [fix(tui): finalize streamed markdown responses](https://github.com/anomalyco/opencode/pull/48732)  
  修复助手回复完成后仍处于流式渲染模式的问题（关闭 #48714），改善长文本的显示与交互。

### 3. 核心性能优化
- [fix(core): eliminate durable event write amplification from turn diffs](https://github.com/anomalyco/opencode/pull/48638)  
  避免 `SessionSummary.summarize` 将完整 git patch 附加到多条事件上造成的写放大，减轻长期运行时的存储压力（关闭 #48641）。

### 4. 非 Claude 模型行为修复
- [fix(session): keep todo list current for non-Claude models](https://github.com/anomalyco/opencode/pull/48729)  
  修复非 Anthropic 系模型在对话中无法收到更新 todo 指令的问题，使 Qwen3 等模型也能正确维护任务状态（关闭 #27560）。

### 5. 会话管理增强
- [fix(server): surface session creation errors](https://github.com/anomalyco/opencode/pull/48734)  
  V2 会话创建失败时不再返回空 500 错误，而是将底层错误展示给客户端（关闭 #39775）。
- [feat(app): rename home sessions from the context menu](https://github.com/anomalyco/opencode/pull/46915)  
  在主页会话列表的右键菜单中直接重命名会话，补充了

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-13）

## 1. 今日速览

昨日发布 v0.23.3-nightly 版本，主要清理了钉钉通道的后台响应聚合逻辑。社区最受关注的仍是 **TUI 在多个后台代理完成时崩溃（React #185）** 问题，该问题在 0.23.3 中仍有用户报告（#11732）。架构层面，围绕 **agent 执行环境可插拔化** 的讨论明显升温，容器执行（#11711）与 SSH 远程执行（#11746）两大 PR/Issue 同时推进中。

## 2. 版本发布

### v0.23.3-nightly.20260912.54aa66834b
- 重构钉钉通道，移除过时的后台响应聚合逻辑（#11570）
- 通道模块调整（feat(channels)!: remove me）

🔗 https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260912.54aa66834b

## 3. 社区热点 Issues（10 个）

### 🔥 TUI 崩溃与稳定性问题

**#11500 — TUI 在多个后台代理完成时静默退出（React #185）**
P1 级别 bug。当多个后台子代理在短时间内相继完成时，交互式 TUI 因 Ink 布局监听器的 setState 循环触发 React #185（"Maximum update depth exceeded"）而崩溃，进程直接回到 shell 提示符且不渲染任何错误信息。已获 10 条评论和社区高关注，是当前最热 issue 之一。

🔗 https://github.com/QwenLM/qwen-code/issues/11500

**#11732 — Qwen Code 0.23.3 在 native monitor 任务运行中崩溃（React #185）**
与 #11500 相同的故障模式，但在最新 0.23.3 版本中仍可复现。两个独立会话均观察到：通过 native monitor 工具启动的长任务仍在运行时，TUI 崩溃退出。说明该问题尚未在 nightly 版本中完全修复。

🔗 https://github.com/QwenLM/qwen-code/issues/11732

**#11747 — RHEL 10 上因缺少 Node.js ICU 数据导致 TUI 静默崩溃**
新上报问题。宿主 Node.js runtime 缺少完整的 Intl.Segmenter 支持（未安装 full ICU）时，TUI 启动后直接回到 shell，且无任何可操作的诊断信息。开发者希望 Qwen 能检测此条件并给出明确提示。

🔗 https://github.com/QwenLM/qwen-code/issues/11747

### 🔒 隐私与安全

**#11198 — 遥测功能上传原始工具错误文本（含 shell 命令行）至 RUM 端点**
P1 级隐私问题。默认开启的 usage-statistics 通道将 shell 失败等工具错误原文上传至 RUM，未做任何脱敏处理。影响面比之前 #10916 标记的单个字段更广，涉及 shell 命令行等敏感信息。已标记 ready-for-human。

🔗 https://github.com/QwenLM/qwen-code/issues/11198

**#11666 — telemetry.logPrompts=false 时仍导出 API 请求内容**
telemetry 开启后，即使 `logPrompts` 设为 false，`api_request.request_text` 字段仍会导出完整的 API 请求内容。属于配置开关失效的隐私缺陷。

🔗 https://github.com/QwenLM/qwen-code/issues/11666

### 🏗️ 架构与执行环境

**#11695 — 将 agent harness 与执行环境分离（tracking issue）**
社区核心维护者提出的方向性议题：让 agent 工具的执行环境成为运行时中**可分离、可寻址**的部分，而非 agent 循环所在进程的属性。这是容器执行（#11711）和 SSH 远程执行（#11746）的上层统摄 issue，标志着多智能体执行架构的重要演进方向。

🔗 https://github.com/QwenLM/qwen-code/issues/11695

**#11746 — 为执行 worker 添加 SSH 传输，支持远程主机运行 agent 工具**
依赖 #11711 的 Track A 实现。计划作为除 `local` 和 `container` 之外的第三种 `ExecutionEnvironment` 后端，让 agent 工具可安全地在远程主机上执行。目前状态为 blocked（依赖 #11711）。

🔗 https://github.com/QwenLM/qwen-code/issues/11746

### 🖥️ 平台兼容性与资源占用

**#11724 — Windows 上高内存占用：7.00 GB**
Windows 用户报告长时运行时内存占用达到 7GB，且伴随 CLI 随机中断、无法继续会话。用户被迫重新梳理进度。已标记 need-information，等待更多环境信息。

🔗 https://github.com/QwenLM/qwen-code/issues/11724

**#11718 — Desktop AppImage 内置 Python 的环境变量泄漏至 MCP 服务器**
AppImage 全局设置 `PYTHONHOME`/`PYTHONPATH`（指向 AppImage 挂载路径），子进程继承后导致外部 Python 解释器崩溃。影响通过 stdio 启动的 MCP 服务器，属于打包环境隔离缺陷。

🔗 https://github.com/QwenLM/qwen-code/issues/11718

### 🔧 功能对齐

**#11610 — hooks 引擎与 Claude Code 对齐**
详细比较了 Qwen hooks 引擎与 Claude Code 的差距：包括纯文本 stdout 输出、`stop_hook_active`、超时单位、matcher 规则、公共输入等。社区希望 hooks 生态能与 Claude Code 兼容，降低迁移成本。目前 need-discussion 状态。

🔗 https://github.com/QwenLM/qwen-code/issues/11610

## 4. 重要 PR 进展（10 个）

**#11711 — feat(core): 为子代理添加容器执行能力** ⭐
执行环境可插拔化的核心实现。支持通过 `QWEN_AGENT_EXECUTION_BACKEND=docker|podman` 要求子代理在容器中运行。Agent 定义和项目声明都可强制要求容器执行，是 #11695 方向的 Track A 实现。已在 9/13 持续更新。

🔗 https://github.com/QwenLM/qwen-code/pull/11711

**#11742 — fix(cli): 进程因未捕获异常退出时回收正在运行的 monitor**
针对 #11732 崩溃问题的直接修复。在 `process.exit(1)` 之前立即调用 `MonitorRegistry.abortAll({ notify: false })`，确保 native monitor 工具的 abort 路径能接管清理，避免进程残留。

🔗 https://github.com/QwenLM/qwen-code/pull/11742

**#11644 — perf(web-shell): 按需加载元数据并复用 capability 检查**
优化 WebShell 性能：侧边栏概览和 Git 元数据改为 hover 或菜单打开时加载，关闭后停止自动刷新。同时将 Git 摘要以文本形式展示在分支旁。autofix/takeover 状态。

🔗 https://github.com/QwenLM/qwen-code/pull/11644

**#11270 — fix(core): 为停滞的后台代理添加超时机制**
为普通后台 Agent turn 添加固定进度 watchdog：模型/控制工作超过 15 分钟无进展即超时，每个执行中工具有独立的 10 分钟进度截止。覆盖新启动、恢复运行和常驻续跑三类场景。长时间运行社区的痛点修复。

🔗 https://github.com/QwenLM/qwen-code/pull/11270

**#11692 — feat(core): 使 web_search 预算可配置并约束 extractor 回退**
`web_search` 超时从固定 60 秒改为 `tools.webSearch.timeoutMs`（默认 120 秒），并限制搜索超时后交给模型的内容大小。提升搜索工具的实用性和可控性。

🔗 https://github.com/QwenLM/qwen-code/pull/11692

**#11748 — fix(web-shell): 防止终端查询冻结并清理协议拒绝逻辑**
修复 WebShell 终端三个遗留问题：minified 输出中保留 mode-query 处理、拒绝旧 daemon 时释放 PTY、本地化重启提示。同时补充失败 spawn 的 responder 清理回归测试。

🔗 https://github.com/QwenLM/qwen-code/pull/11748

**#11727 — fix(core): 让 producer 自身预算决定 shell 输出大小**
修复 shell 输出被双重截断的矛盾：工具按自身预算截断并保留 head-and-tail 预览，但 scheduler 随后又按不同策略再次截断。该 PR 让生产者的预算成为唯一标准，避免尾部错误信息丢失。

🔗 https://github.com/QwenLM/qwen-code/pull/11727

**#11538 — feat: 按模型选择 OpenAI API**
支持在模型级别配置 `api: "chat-completions" | "responses"`，例如 OpenAI 兼容 provider 下的模型可指定使用 Responses 端点。对 Fireworks 等第三方服务的兼容性修复（关联 #11657）。

🔗 https://github.com/QwenLM/qwen-code/pull/11538

**#10183 — feat(memory): 结构化按需召回**
将自动记忆从扁平的大段 prompt 演进为结构化 push/pull 召回协议：记忆语料变更时提供两层 ref/title 树，相关轮次提供 query-focused 元数据子树，并有专用工具做精确召回。autofix/takeover 状态。

🔗 https://github.com/QwenLM/qwen-code/pull/10183

**#10906 — feat(web-shell): 在任务详情面板展示 shell 和 monitor 任务输出**
Monitor 的 stdout/stderr 与现有 Shell 捕获一起持久化，daemon 暴露 live-session-owner 作用域的端点返回脱敏后的输出尾部。WebShell 任务可观测性的重要补全。

🔗 https://github.com/QwenLM/qwen-code/pull/10906

## 5. 功能需求趋势

### 🏗️ 执行环境可插拔化成为主线
社区对 agent 执行环境的灵活性和安全性需求集中爆发：容器执行（#11711）、SSH 远程执行（#11746）、以及将 harness 与执行环境分离的架构方向（#11695），共同指向**同一个运行时支持多种隔离/远程执行后端**的演进方向。

### 🌐 WebShell 体验持续补全
多个 PR 聚焦 WebShell：元数据按需加载（#11644）、终端查询冻结修复（#11748）、任务输出可视化（#10906）、消息拒绝语义优化（#11289）。Web 端正从"可用"走向"好用"。

### 🔒 隐私与数据安全成为显性诉求
遥测数据泄露原始工具错误文本（#11198）、logPrompts 开关失效（#11666）、AppImage 环境变量泄漏至 MCP 服务器（#11718）——三个隐私/安全问题同日活跃，开发者对数据上传边界的敏感度显著提升。

### 🤖 生态对齐与兼容性
hooks 与 Claude Code 对齐（#11610）、OpenAI API 按模型选择（#11538）、Fireworks 兼容性修复（#11657）等，显示社区对**跨工具迁移低成本**和**多渠道模型接入**的持续需求。

### 📱 移动端探索启动
#11704 提议为 `qwen serve` 构建官方 Android 伴生客户端（ACP 协议），说明社区已开始探索 Qwen Code 向移动场景延伸的路径。

## 6. 开发者关注点

- **TUI 稳定性最受关切**：React #185 崩溃从 9/9 持续至今（#11500、#11732），涉及 Ink 布局循环和未捕获异常两个独立根因，0.23.3 用户仍有受影响。崩溃后无法恢复会话的体验被多次提及。
- **资源占用问题突出**：Windows 平台 7GB 内存占用（#11724）、后台 agent 无超时导致失控（#11270），长时间运行场景的可靠性是高频痛点。
- **遥测隐私边界**：开发者对默认开启的遥测通道上传敏感文本（shell 命令、API 内容）表示明确担忧，期望有更严格的默认脱敏和开关语义。
- **跨平台环境陷阱**：RHEL 10 缺 ICU（#11747）、AppImage 环境变量泄漏（#11718）、Windows 额外 fstat（#11750），非标准宿主环境下缺少诊断信息的问题多次出现。
- **终端 UX 细节**：

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*