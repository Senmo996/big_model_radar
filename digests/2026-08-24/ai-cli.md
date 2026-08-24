# AI CLI 工具社区动态日报 2026-08-24

> 生成时间: 2026-08-24 00:37 UTC | 覆盖工具: 7 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据范围**: anthropics/skills 仓库 PR / Issues | **数据截止**: 2026-08-24

---

## 一、热门 Skills 排行

| 排名 | Skill / PR | 功能与热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 评估链路修复** [#1298](https://github.com/anthropics/skills/pull/1298) | `run_eval.py` 对所有描述一律误报 `recall=0%`，导致 skill 描述优化循环在"对着噪声优化"。修复内容包括评估产物安装、Windows 流读取、触发检测与并行 worker。社区 10+ 次独立复现（见 [#556](https://github.com/anthropics/skills/issues/556)），是当前影响 Skill 生产基础设施最重的 PR。 | **Open** |
| 2 | **document-typography 排版技能** [#514](https://github.com/anthropics/skills/pull/514) | 专门治理 AI 生成文档的排版问题：孤行、孤儿段落（页底悬挂标题）、编号错位。属"用户极少主动要求、但每份文档都会遇到"的隐形质量成本。热度高。 | **Open** |
| 3 | **pdf 大小写引用修复** [#538](https://github.com/anthropics/skills/pull/538) | 修复 `SKILL.md` 中 8 处大小写不一致的引用（`REFERENCE.md` vs `reference.md`），在大小写敏感的文件系统上会导致 PDF 技能直接失效。小而确定的修复。 | **Open** |
| 4 | **ODT 文档技能** [#486](https://github.com/anthropics/skills/pull/486) | 新增 OpenDocument（.odt/.ods）的创建、模板填充、读取及 ODT→HTML 转换能力，补偿官方文档技能在开源办公格式上的缺失。 | **Open** |
| 5 | **frontend-design 技能重构** [#210](https://github.com/anthropics/skills/pull/210) | 重构前端设计技能，目标是让每条指令都能在单次对话中被 Claude 实际执行，提升技能的"可行动性"与内部一致性，社区关注度高。 | **Open** |
| 6 | **skill-quality-analyzer / skill-security-analyzer 元技能** [#83](https://github.com/anthropics/skills/pull/83) | 向 marketplace 添加两个元技能：一个按"结构文档/示例/安全"五个维度评估 skill 质量，一个专注安全分析。呼应社区对技能治理的需求。 | **Open** |
| 7 | **Hivemind 多智能体编排** [#1628](https://github.com/anthropics/skills/pull/1628) | 让 Claude Code 将机械化工作委托给运行免费模型的 headless worker，Claude Code 保留规划/审查/合并职责，主打"上下文即稀缺资源"。 | **Open** |
| 8 | **scnet-hpc 高性能计算技能** [#1615](https://github.com/anthropics/skills/pull/1615) | 面向 SCNet HPC 集群的 SSH/Slurm 作业操作技能，覆盖连接、分区、内存/模块配置与作业生成。 | **Open** |

---

## 二、社区需求趋势

**1. 安全与信任边界（当前最受关注）**
[#492](https://github.com/anthropics/skills/issues/492)（43 条评论）指出社区技能被以 `anthropic/` 命名空间分发，造成"官方技能"的身份冒用，用户可能将高权限授予普通技能。社区期待官方规范命名空间、引入安全评估流程。

**2. 组织级技能共享与治理**
[#228](https://github.com/anthropics/skills/issues/228)（8 👍）呼吁在 Claude.ai 中实现组织内技能直接共享，替代"下载文件→Slack 传输→手动上传"的原始链路，并希望有技能库/共享链接与统一治理。

**3. skill-creator 工具链可靠性**
[#556](https://github.com/anthropics/skills/issues/556)（7 👍）与 [#202](https://github.com/anthropics/skills/issues/202)共同指向：技能创建/评估脚本质量堪忧——`run_eval.py` 触发率恒为 0%、Windows 上无法运行、创作者文档过于"教程化"。社区把 Skill 质量问题的根因归结到工具链本身。

**4. 上下文窗口与 token 开销优化**
典型诉求是 [#1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` 技能单次调用即注入 ~156k tokens 挤爆上下文；[#189](https://github.com/anthropics/skills/issues/189) 指出两个插件安装命相同技能文件，在上下文中造成重复。核心痛点：技能引入的上下文成本必须可控。

**5. 新技术与功能扩展**
- **技能即记忆**：[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory，用符号化记法压缩长会话记忆；
- **Agent 治理**：[#412](https://github.com/anthropics/skills/issues/412) 提议 agent-governance，把策略执行、威胁检测、审计追踪做成技能；
- **MCP 化**：[#16](https://github.com/anthropics/skills/issues/16) 希望技能以 MCP API 形态暴露，统一 Agent 软件编程协议；
- **平台扩展**：[#29](https://github.com/anthropics/skills/issues/29) 持续询问 AWS Bedrock 上的可用性。

---

## 三、高潜力待合并 Skills

以下 PR 评论活跃、提出方问题明确且社区已有大量"+1/复现"背书，近期落地概率最高：

1. **[#1298 skill-creator 评估链路修复](https://github.com/anthropics/skills/pull/1298)**
   直击 `recall=0%` 这个技能生态最严重的"生产链断裂"问题，且与 #556 / #

---

# Claude Code 社区动态日报（2026-08-24）

## 今日速览

昨日发布补丁版本 v2.1.241（仅含 bug 修复与可靠性改进）；社区舆论焦点集中在两件事：一是对 Claude 4.x/5.0/Fable 系列模型输出质量退化的强烈不满（#77136 已积累 351 👍），二是 Auto 模式系统提示诱导模型用 Bash 而非原生编辑工具导致 `/rewind` 失效（#87575/#88041）。此外，Sandbox 对 localhost 出站连接的限制依然是呼声最高的功能需求（#28018，75 👍）。

## 版本发布

**v2.1.241** · Bug fixes and reliability improvements  
仅包含通用的 bug 修复与可靠性改进，无功能变更说明。

## 社区热点 Issues

1. **模型输出质量退化，修辞口头禅泛滥** — #77136（93 评论 / 351 👍）  
   用户反馈 Claude 4.7、4.8、5.0 及 Fable 系列在遵循风格指令时频繁生成重复性修辞套话，连贯散文能力明显下滑。该 issue 为当前社区关注度最高的问题，反映用户对模型写作质量的强烈不满。  
   https://github.com/anthropics/claude-code/issues/77136

2. **Sandbox 禁止访问 localhost，导致集成测试无法进行** — #28018（8 评论 / 75 👍）  
   即使 `sandbox.network.allowedDomains` 列出了 `localhost/127.0.0.1`，出站 TCP 连接仍被 EPERM 拒绝，导致无法对本地 Docker 服务跑集成测试。这是当前最受期待的功能改进。  
   https://github.com/anthropics/claude-code/issues/28018

3. **Auto 模式诱导 Bash 编辑文件，使 /rewind 静默失效** — #87575（11 评论 / 18 👍）  
   Auto 模式的系统提示指示模型用 Bash 修改文件，绕过 Edit/Write 工具，导致 `/rewind` 无法回滚这些变更。涉及 WSL2 与 Opus 5 组合场景，严重损害工作流可逆性。  
   https://github.com/anthropics/claude-code/issues/87575

4. **Auto 模式硬编码 sed/heredoc 指令** — #88041（9 评论 / 9 👍）  
   进一步印证 #87575：该指令硬编码在 CLI 二进制中，要求模型优先用 Python/sed/heredoc 改文件，造成 `/rewind` 失效。用户希望移除或将该行为改为可配置。  
   https://github.com/anthropics/claude-code/issues/88041

5. **Windows 桌面应用 GPU 进程崩溃，杀掉全部会话** — #81698（54 评论 / 5 👍）  
   Claude 桌面版在 Windows 11 上 GPU 进程崩溃（exit code 101457950），整个应用与所有运行中会话一同终止。RTX 5080 + 驱动 610.47 环境复现，影响范围广。  
   https://github.com/anthropics/claude-code/issues/81698

6. **文件编码不被尊重，Windows-1252 文件被破坏** — #7134（27 评论 / 23 👍）  
   自 2025-09 起持续开放的老 issue：Claude Code 不识别 Windows-1252 编码并可能破坏文件内容。至今未修复，社区关注度持续累积。  
   https://github.com/anthropics/claude-code/issues/7134

7. **Prompt 缓存查找间歇失败，9 天浪费 5900 万 excess tokens** — #87966（7 评论）  
   `cache_read` 被钉在 stable-prefix 边界，导致 89 次全上下文重写，产生约 5900 万 `cache_creation` 令牌，成本影响显著。  
   https://github.com/anthropics/claude-code/issues/87966

8. **Claude Desktop Windows 反复崩溃，需反复 Repair** — #85199（34 评论 / 4 👍）  
   Windows 上桌面应用频繁崩溃，用户只能通过“高级选项 → 修复”恢复，疑似与 MSIX 安装包完整性相关。  
   https://github.com/anthropics/claude-code/issues/85199

9. **Fable 5 思维块间歇性吞掉正式回复** — #74558（9 评论 / 8 👍）  
   中段 assistant 文本块被错误地作为“总结型思维块”投递，导致 turn 显示为静默。影响 Linux/WSL2 平台，转录文件与 stream-json 同时复现。  
   https://github.com/anthropics/claude-code/issues/74558

10. **AskUserQuestion 焦点点击即触发选项** — #76616（5 评论 / 11 👍）  
    鼠标点击终端窗口仅用于聚焦，却被判定为选中某个选项，用户希望区分“聚焦点击”与“选项点击”。  
    https://github.com/anthropics/claude-code/issues/76616

## 重要 PR 进展

过去 24 小时仅合并/更新 1 个 PR（数据源只跟踪到 1 条）：

- **docs(plugin-dev): 补充 MessageDisplay 流式语义文档** — #83374（@iCodeCraft）  
  为内置的 Hook 开发技能补充 `MessageDisplay` 事件的触发说明、事件指南与快速参考表，此前该事件在文档中缺失。

## 功能需求趋势

- **Auto 模式可配置性**：社区不满足于目前“Auto 模式硬编码 Bash-first 编辑”的粗暴设计，要求允许自定义编辑策略、保证 `/rewind` 可用（#87575、#88041）。
- **Sandbox 网络策略精细化**：允许 localhost/局域网访问（#28018），并修复浏览器面板拦截 RFC1918 私网子资源的问题（#87472）。
- **规则/记忆系统健壮性**：paths 作用域规则在项目根外不生效（#88945）、用户级规则被 paths 静默禁用（#87217），用户希望规则匹配逻辑更透明、更可预期。
- **MCP 连接器稳定性**：远程 MCP 连接器间歇性丢失全部工具、工具总数被硬限制在 256（#77704），需要更可靠的连接保持与扩展上限。
- **终端/UI 体验改进**：内联图片支持、链接可点击性与标记一致性（#87438）、鼠标点击语义区分（#76616）。

## 开发者关注点

- **Windows 平台是重灾区**：GPU 崩溃、反复损坏需 Repair、MSIX 包被 Code Integrity 拦截（#81698、#85199、#88323）、文件编码被破坏（#7134）等多起问题集中爆发，Windows 开发者体验亟待提升。
- **成本敏感性上升**：Prompt 缓存失效导致大幅 token 浪费（#87966），说明开发者已开始关注长会话中的费用消耗，缓存机制需要更稳定。
- **子代理 / SendMessage 可靠性不足**：多个 issue 指向子代理恢复后 UI 渲染乱码（#76602）、跨会话消息静默丢弃（#87501）、与任务停止竞态导致回复无通知（#88741），组合拳削弱了后台任务工作流。
- **模型“风格退化”容忍度到达临界点**：#77136 以 351 👍 成为社区最高赞 issue，开发者对晦涩的修辞性输出耐心有限，期待 Anthropic 在模型层明确回应。

---
*数据窗口：2026-08-23 ~ 2026-08-24（UTC） | 来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-24

## 今日速览
昨日共发布 2 个 Rust 版本（`rust-v0.149.1` 及一个 alpha 迭代），均为小版本/内部迭代，未见重大功能变更。社区层面，与 `gpt-5.6-sol` 相关的新模型兼容性问题（如 `prompt_cache_retention` 中止、上下文窗口分配差异）持续发酵，同时多起 Windows 端性能与浏览器控制问题成为讨论焦点。

## 版本发布
### rust-v0.149.1
一个小版本迭代，基于 `rust-v0.149.0` 的修复版本，当前未看到面向外部用户的明显行为变更。

🔗 [查看完整 Changelog](https://github.com/openai/codex/compare/rust-v0.149.0...rust-v0.149.1)

### rust-v0.149.0-alpha.4.3
预发布 alpha 迭代，对应 `0.149.0-alpha.4.3`，主要服务于新特性的内部验证与稳定性测试。

---

## 社区热点 Issues
### 1. Codex App 搭配 gpt-5.6-sol 时因 `prompt_cache_retention` 被中止
**热度：39 评论 / 37 👍** | [issue #39392](https://github.com/openai/codex/issues/39392)
桌面版在调用 `gpt-5.6-sol` 时直接中止，并报“不支持的 prompt_cache_retention”。被踩次数和讨论数均为当前最高，属新模型迁移期典型兼容性缺陷，官方需尽快确认是否设计如此还是忘记放行。

### 2. 定时任务在成功运行后自行禁用
**热度：35 评论** | [issue #38350](https://github.com/openai/codex/issues/38350)
Web 端定时任务（Scheduled Tasks）在没有用户操作的情况下，多个任务从“启用”自动变为“暂停”。自动化可靠性受到质疑，对依赖定时开发/运维流的团队影响较大，社区已要求 OpenAI 披露完整的任务状态机变更。

### 3. VS Code/Cursor 扩展栏：提交的 Prompt 随机消失
**热度：28 评论 / 18 👍** | [issue #25928](https://github.com/openai/codex/issues/25928)
Windows 下提交后无法进入队列，影响稳定的 IDE 内使用，长期未修复，被大量开发者持续顶帖。

### 4. 打开桌面应用（无操作）即消耗 6% 本周配额
**热度：13 评论 / 10 👍** | [issue #37445](https://github.com/openai/codex/issues/37445)
用户做了对照组实验：桌面保持挂机，后台自动任务和待处理回合可持续消耗每周限额。Rate-limit 的计算口径不透明问题再次引起关注。

### 5. 希望提供“禁用命令折叠”开关
**热度：12 评论 / 27 👍** | [issue #39903](https://github.com/openai/codex/issues/39903)
用户希望始终展示 `Ran N commands` 的完整执行列表，而不是手动展开。社区支持率高，但开发团队更重视 TUI 清爽度，短期不会恢复，建议通过配置项平衡。

### 6. Windows 10 DWM 句柄持续泄漏
**热度：12 评论 / 10 👍** | [issue #33192](https://github.com/openai/codex/issues/33192)
调用带 tool call 的任务后，DWM `Composition` 句柄数量持续累积。这一长期性 Windows 性能问题已进入高频反馈线，社区仍可持续指认复现环境。

### 7. 恢复 gpt-5.6-sol 的 372K Codex 上下文窗口
**热度：6 评论 / 23 👍** | [issue #34619](https://github.com/openai/codex/issues/34619)
新模型虽然引入了 872K 的模型原生上下文，但用于 Codex 时被硬限制在 272K 左右（#40258 中更埋下了不同 client 或工具链给不同 context 差异的隐患）。

### 8. Windows 的 CreateProcess 沙箱初始化失败
**热度：10 评论** | [issue #38290](https://github.com/openai/codex/issues/38290)
失败并返回 `helper_unknown_error`，沙箱对非英文用户名/路径的兼容性可能存在问题。

### 9. 桌面端无法创建新对话
**热度：9 评论** | [issue #30348](https://github.com/openai/codex/issues/30348)
macOS 桌面版出现 `thread/start Timeout`，长时间无法在新会话，与本地 app-server 状态或身份认证有关。

### 10. IDE 扩展/浏览器控制仍存在身份和授权问题
**热度：5 评论** | [issue #40118](https://github.com/openai/codex/issues/40118)
Chrome 侧边插件始终报“native host 已过期”，但本地诊断通过；此外 Windows 下 Chrome 插件卸载失败和授权问题（#40228）也反映闭环控制还不稳定。

---

## 重要 PR 进展（过去 24 小时）
以下 PR 目前均来自 OpenAI 内部 `[copyberry]` 项目机器人，共性聚焦于“消息内容种类标注”与“元数据对齐”，本质是为后续 context 精调、compaction、Agent 决策做地基。

### 1. [#40297](https://github.com/openai/codex/pull/40297) 子代理 forks 保留开发者指令注释
新增片段 `generic.developer_instructions` 内容类型，修复了 fork 子代理历史中开发者指令失去“身份标签”的问题。

### 2. [#40292](https://github.com/openai/codex/pull/40292) 增加 Codex 打包后的烟雾测试
跨平台 pytest 测试套件，能验证 CLI 与 app-server 打包产物可运行、通用指令和代码模式、内置 `rg` 正常。

### 3. [#40280](https://github.com/openai/codex/pull/40280) 远程压缩时对图片进行预算
原 budget 只算文本不计图片，容易出现在 image-heavy 对话中意外维持过多上下文。增加 `compaction_image_budget` Feature 开关。

### 4. [#40277](https://github.com/openai/codex/pull/40277) 不支持的媒体也不会丢注释
当远端不支持图片/音频时，默认只输出错误文本，但现在会保留 `images.unsupported` / `audio.unsupported` 标记，防止状态失去审查链。

### 5. [#40275](https://github.com/openai/codex/pull/40275) 压缩摘要、Guardian 批准、子代理通知全部转为强制片段
避免摘要、Guardian-approved actions 等“生成式上下文”信息偏离主 chain，完善 metadata 化。

### 6. [#40273](https://github.com/openai/codex/pull/40273) 本地压缩后规范化用户消息注释
本地 compaction 重建文本时不再沿用旧的逐项 `content_item_kinds`，防止产生残缺 metadata。

### 7. [#40264](https://github.com/openai/codex/pull/40264) 裁剪消息时保存 metadata
`content_item_kinds` 与重建内容保持同步，避免截断后残留不对齐的 annotation。

### 8. [#40221](https://github.com/openai/codex/pull/40221) 区分 Guardian review 与子代理线程
新增 `guardian_review` 线程源。审计/会话线框不再只显示为通用 `subagent`，便于审计与日常监控。

### 9. [#40200](https://github.com/openai/codex/pull/40200) 移除 Plan 模式 composer 提示
不再因 draft 中出现 `plan` 而自动弹出“Create a plan?” 提示，并删除 Esc 退出及其持久化状态。

### 10. [#31175](https://github.com/openai/codex/pull/31175) MongoDB 线程存储与会话迁移（存续性）
这是目前少数非 bot、且跨版本的实验性功能 PR：支持 `experimental_thread_store = { type = "mongodb", ... }` 并引入 `codex sessions migrate-to-mongo` 迁移，适合团队需要“统一/中心化会话”的场景。

---

## 功能需求趋势
1. **新模型迁移阵痛**：gpt-5.6-sol 之外还出现了上下文窗口被人为限制、`originator` 不同影响可用上下文的问题，社区呼吁“上下文窗口大小”也要可配置。
2. **注释/元数据透明度**：大量 PR 都在“重标”上下文片段，并把远端策略、Guardian 行为区分成不同 `content_kind`，后续向“可解释、可审计”方向上比此前更明确。
3. **自动化和定时任务的可靠性**：今天热门话题涉及定时任务被“自动暂停”，说明用户不只是拿到一个新功能，而是要更强的状态约束。
4. **Windows 桌面体验优化**：应用的内存泄漏、剪切板、Chrome native host 适配依然是高关注技术点。
5. **持续关注自主 Agent 的根因排障能力**：Issue 质量在提高（实验对照、可复现步骤），社区反馈“为什么这么干”的整体透明度要求越来越高。

---

## 开发者关注点
- **授权与登录稳定性**：多个 issue 反映“数分钟自动退出”、“keychain 锁死”，且同时存在于 Windows 与 macOS，协作中断严重。
- **Windows 下 Chrome/Browser 工具链偏差**：Chrome 插件“只读、无法点击/输入”、重复报“native host 过期”但诊断统统跑不通过。
- **上下文窗口被缩水的“黑盒”**：用户感觉 Codex 目前的 340K 上下约 30-40% 被“后台 meta”占用，但移除自定义 system prompt 没有明显变化。
- **自动化的持久化执行与容错策略**：用户希望有自修复式 monitor 型进程，而不是靠触发一次任务执行。
- **QoL 对命令回显、SQLite 运行**：TUI 相关性需求也不再甘当“小功能”，与大幅死亡。

社区整体能形成较高活跃度和一定质量的行为反馈，官方近期 PR 的重心在“内容注解核对”，说明长远更偏向 context 溯源与可解释性调优。目标是缩小未授权、难判断的上下文维护缺口，而不仅是堆功能。

---

每日数据来源：[github.com/openai/codex](https://github.com/openai/codex) · 更新周期：过去 24 小时

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-24

## 今日速览

今日社区动态集中在 **Agent 可靠性问题** 上：多个高优先级 Issue 持续发酵，尤其是 Subagent 在 MAX_TURNS 中断后被误报为成功、Generalist Agent 无限挂起，以及 Shell 命令执行完毕但 CLI 卡在 "Awaiting input" 等问题。PR 方面以 Dependabot 依赖批量升级为主（含一次 76 项更新的集中 PR），另有数个由社区贡献的实质性修复（混合行结尾检测、Symlink 工作区 Glob 支持、OAuth 回调超时清理）。

---

## 版本发布

**v0.56.0-nightly.20260823.g5411f113c**（夜间版）

- 常规 nightly 发布，无显著功能变更说明。
- 完整变更对比：https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260822.g5411f113c...v0.56.0-nightly.20260823.g5411f113c

---

## 社区热点 Issues（10 条）

### 1. Subagent 在 MAX_TURNS 后被误报为 GOAL 成功 🔥
| 元数据 | 详情 |
|---|---|
| Issue | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) |
| 优先级 | P1 · Bug |
| 评论/点赞 | 13 评论 / 2 👍 |

**焦点**：`codebase_investigator` 子代理在运行中触发最大轮次限制后，仍报告 `status: "success"` 与 `Termination Reason: "GOAL"`，实际它连分析都未开始。社区认为这是 **"虚假成功"信号**，会直接误导用户对代理执行结果的判断。

---

### 2. Generalist Agent 无限挂起 🔥
| 元数据 | 详情 |
|---|---|
| Issue | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) |
| 优先级 | P1 · Bug |
| 评论/点赞 | 8 评论 / 8 👍 |

**焦点**：只要 Gemini CLI 将任务委托给 generalist agent 就永久挂起，简单操作（如创建目录）也不例外。用户最长等待 1 小时后手动取消。通过在提示词中禁止委托子代理可绕过此问题。8 个 👍 表明大量用户受影响。

---

### 3. 利用模型 bash 亲和力：零依赖 OS 沙箱 + 执行后意图路由
| 元数据 | 详情 |
|---|---|
| Issue | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) |
| 优先级 | P2 · 增强（effort/large） |
| 评论/点赞 | 8 评论 / 1 👍 |

**焦点**：Gemini 3 模型天生擅长以原生 bash 用户方式链式调用 POSIX 工具（grep/cat/sed/awk）探索代码库。该提案主张在 **不牺牲安全性与 UX** 的前提下，通过零依赖 OS 级沙箱释放这一能力，并配合执行后意图路由。

---

### 4. 评估 AST 感知文件读取、搜索与代码库映射的价值
| 元数据 | 详情 |
|---|---|
| Issue | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) |
| 优先级 | P2 · 功能（EPIC） |
| 评论/点赞 | 7 评论 / 1 👍 |

**焦点**：EPIC 跟踪多项调查——AST 感知工具能否实现：一次调用精确读取方法边界、减少因读取错位导致的轮次浪费、降低 token 噪声、优化代码库导航。目前处于调研阶段。

---

### 5. Gemini 不会主动使用自定义 Skills 和 Sub-agents
| 元数据 | 详情 |
|---|---|
| Issue | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) |
| 优先级 | P2 · Bug |
| 评论/点赞 | 6 评论 / 0 👍 |

**焦点**：社区反馈 Gemini 几乎不会自行调用用户定义的自定义技能和子代理，即使任务高度相关，须显式指令才生效。作者以 gradle/git 技能为例说明其描述已足够明确。

---

### 6. Auto Memory 无限重试低信号会话
| 元数据 | 详情 |
|---|---|
| Issue | [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) |
| 优先级 | P2 · Bug |
| 评论/点赞 | 5 评论 / 0 👍 |

**焦点**：Auto Memory 仅在提取代理成功用 `read_file` 读取转录后才将会话标记为"已处理"。若代理因低信号决定跳过某个会话，该会话将持续出现在待处理队列中并反复被重试，造成资源浪费。

---

### 7. Auto Memory 需确定性脱敏与日志降噪
| 元数据 | 详情 |
|---|---|
| Issue | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) |
| 优先级 | P2 · 安全相关 Bug |
| 评论/点赞 | 4 评论 / 0 👍 |

**焦点**：Auto Memory 将本地转录发送给后台提取模型时，提示词虽要求模型脱敏，但此时内容已进入模型上下文；另外服务会记录已有技能信息，存在数据暴露风险。社区呼吁在传输前进行**确定性脱敏**。

---

### 8. Shell 命令执行完成后卡在 "Awaiting input" 🔥
| 元数据 | 详情 |
|---|---|
| Issue | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) |
| 优先级 | P1 · Bug（effort/medium） |
| 评论/点赞 | 4 评论 / 3 👍 |

**焦点**：Gemini 执行完极简单的 CLI 命令后周期性挂起，界面仍显示命令活跃并等待输入，即使该命令根本不会请求输入。3 个 👍 表明这是高频复现的痛点。

---

### 9. 增强 browser_agent 弹性：自动会话接管与锁恢复
| 元数据 | 详情 |
|---|---|
| Issue | [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) |
| 优先级 | P3 · 功能 |
| 评论/点赞 | 4 评论 / 0 👍 |

**焦点**：`BrowserManager.ts` 在遇到锁定的浏览器配置文件（如 `sessionMode: 'persistent'` 与残留进程冲突）时采取"快速失败"策略。提案建议自动接管会话或恢复锁。

---

### 10. Browser Subagent 在 Wayland 环境下失败
| 元数据 | 详情 |
|---|---|
| Issue | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) |
| 优先级 | P1 · Bug（agent/browser） |
| 评论/点赞 | 4 评论 / 1 👍 |

**焦点**：Browser Agent 在 Wayland 显示服务器下无法正常工作，即报 GOAL 终止但实际未完成。Linux 桌面用户受此影响明显。

---

## 重要 PR 进展（10 条）

### 1. 大规模依赖升级：npm-dependencies 组 76 项更新
| 元数据 | 详情 |
|---|---|
| PR | [#28984](https://github.com/google-gemini/gemini-cli/pull/28984) |
| 状态 | OPEN · Dependabot |

**内容**：一次性升级 76 个 npm 依赖，涵盖 `simple-git`、`@modelcontextprotocol/sdk` 等核心库。此 PR 影响面大，值得关注潜在行为变更。

---

### 2. Puppeteer-core 大版本升级：24.0.0 → 25.7.0
| 元数据 | 详情 |
|---|---|
| PR | [#28986](https://github.com/google-gemini/gemini-cli/pull/28986) |
| 状态 | OPEN · Dependabot |

**内容**：跨大版本升级浏览器自动化核心依赖，对 browser_agent 的稳定性与站点兼容性可能产生明显影响。

---

### 3. 修复混合行结尾检测逻辑 💡
| 元数据 | 详情 |
|---|---|
| PR | [#28983](https://github.com/google-gemini/gemini-cli/pull/28983) |
| 状态 | OPEN · 人工提交 |

**内容**：`detectLineEnding()` 此前只要文件包含一个 `\r\n` 就判定为 CRLF。此 PR 改为检测真正的**混合行结尾**，避免对以 LF 为主的文件误判。社区贡献的实质修复。

---

### 4. 保持 Symlink 工作区根的 Glob 结果 💡
| 元数据 | 详情 |
|---|---|
| PR | [#28975](https://github.com/google-gemini/gemini-cli/pull/28975) |
| 状态 | OPEN · 人工提交 |

**内容**：当工作区根通过符号链接访问时（如 macOS `/tmp` → `/private/tmp`），`glob` 返回 "No files found"。此 PR 修复该问题，解决 #28416 并覆盖更广场景。

---

### 5. 修复 Session 保留清理误删短 ID 冲突会话
| 元数据 | 详情 |
|---|---|
| PR | [#28981](https://github.com/google-gemini/gemini-cli/pull/28981) |
| 状态 | CLOSED · 人工提交 |

**内容**：`cleanupExpiredSessions()` 按 8 位短 ID 分组并可能误删同后缀的所有会话文件，导致**用户数据丢失**。该 PR 修复 #28643。

---

### 6. 修复 OAuth 回调超时未清除问题
| 元数据 | 详情 |
|---|---|
| PR | [#28980](https://github.com/google-gemini/gemini-cli/pull/28980) |
| 状态 | CLOSED · 人工提交 |

**内容**：`startCallbackServer()` 创建的 5 分钟超时计时器在流程结束后从未被清除，导致回调被保留。修复 #28652，关闭服务器时正确清理计时器。

---

### 7. 修复符号链接路径遍历漏洞（安全）
| 元数据 | 详情 |
|---|---|
| PR | [#2677](https://github.com/google-gemini/gemini-cli/pull/2677) |
| 状态 | CLOSED · 人工提交 |

**内容**：修复攻击者通过符号链接绕过工作区限制访问任意文件的**严重安全漏洞**（#1121）。文件路径在验证前被解析为真实路径。

---

### 8. Error URL 剥离尾部句点
| 元数据 | 详情 |
|---|---|
| PR | [#28069](https://github.com/google-gemini/gemini-cli/pull/28069) |
| 状态 | CLOSED · 人工提交 |

**内容**：修复错误信息中 URL 末尾带句点导致用户点击跳转失败的问题（#28052）。小但体验相关。

---

### 9. Actions 依赖组升级（3 项）
| 元数据 | 详情 |
|---|---|
| PR | [#28450](https://github.com/google-gemini/gemini-cli/pull/28450) |
| 状态 | OPEN · Dependabot |

**内容**：GitHub Actions 依赖升级，包含 `lycheeverse/lychee-action`、`preactjs/compressed-size-action` 和 `google-github-actions/run-gemini-cli`，影响 CI 流水线。

---

### 10. 防止 status/need-triage 被自动清除
| 元数据 | 详情 |
|---|---|
| PR | [#16657](https://github.com/google-gemini/gemini-cli/pull/16657) |
| 状态 | CLOSED |

**内容**：确立稳健的三级流程：所有新 Issue 自动标记 `status/need-triage`，并保持至维护者手动审查。附带修复 `pr-triage.sh` 中 jq 引号错误（#16958 补充）。

---

## 功能需求趋势

从今日活跃 Issue 中可提炼出社区最关注的五个方向：

### 1. Agent 可靠性与失败语义透明化
- 多个 P1 Bug（#22323、#21409、#25166）指向 agent 的**挂起、误报、卡死**问题。
- 社区强烈要求：中断/失败状态不可被误报为成功；agent 在超时、轮次耗尽时应有明确的失败语义。
- 方向：**fail-loud 而非 fail-silent**。

### 2. Auto Memory 系统质量与安全
- 三个相关 Issue（#26522、#26523、#26525）集中在 Auto Memory 的**重试逻辑、无效补丁处理、日志脱敏**。
- 趋势：后台自动机制需具备更强的边界检查与确定性行为，防止无限循环与敏感信息泄漏。

### 3. AST 感知的代码操作
- EPIC #22745 及 #22746 表明官方正在调研 **AST 感知的文件读取、搜索和代码库映射**。
- 潜在收益：降低 token 消耗、减少轮次浪费、精确读取方法边界。
- 官方推荐调研起点：`tilth` 或 `glyph` 工具。

### 4. 更智能的工具选择与作用域控制
- #24246（>128 工具触发 400 错误）与 #19873（bash 亲和力）共同指向一个问题：**模型需要更聪明的工具选取策略**，而非全量加载。
- 方向：按任务动态裁剪工具集，优先利用模型原生擅长的 shell 操作能力。

### 5. 子代理可观测性
- #22598 提议让 Subagent 轨迹通过 `/chat share` 可见，便于评审与评估。
- 搭配 #21763（bugreport 缺少子代理上下文）说明：**子代理内部执行过程对用户仍是黑盒**，透明化需求强烈。

---

## 开发者关注点

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>



</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-24）

**数据来源**：`github.com/MoonshotAI/kimi-cli`

---

## 1. 今日速览

过去 24 小时没有新的 Release，社区讨论最集中的是两件「悬而未决」的事：一是 #1283 的 **跨会话 Memory System** 功能请求持续获得讨论热度（27 条评论）；二是用户 @tobiu 以插桩数据指控 **“Vivace” 会员每周可用额度神秘缩减 3–5 倍**，直指计费透明度问题。代码侧则有 2 个新进展：一个允许手机作为观察者配对本地会话的 PR，和一个专门澄清插件安全边界的文档 PR。

整体看，本次周期社区没有大版本更新，但积累的“记忆能力”和“配额信任”诉求值得维护者优先留意。

---

## 2. 版本发布

无新版本 Release（过去 24 小时）。

---

## 3. 社区热点 Issues

> 说明：本次“过去 24 小时更新”的 Issues 只有 3 条，已全部列出并排序。

### #1 [Feature Request] Memory System – Persistent context across sessions  
**状态**：Open ｜ 创建于 2026-02-27｜ 更新于 2026-08-23｜ 💬 27 条评论  
**作者**：@CatKang  
**链接**：<https://github.com/MoonshotAI/kimi-cli/issues/1283>  

这是目前最容易呈现的 Issue：请求提供“用户记忆系统”，让 Kimi Code CLI 能跨 session 保留项目模式、用户偏好、有价值上下文，并涵盖 **自动记忆（AI 管理笔记）**与 **手动记忆（用户自定义指令）**两条路径。

**它为什么重要**  
- 当前 Agentic 开发中，每新一个 Session 都必须重新重复项目背景，既耗 token 又容易丢失 TS 上下文。  
- 从 2 月创建至今仍持续被浏览，8 月 23 日仍未考虑到看到讨论，说明社区对其有长期高频期待。  
- 与 #2604 性质互补：两者都是用户在真实开发中感受到的“系统性效率衰减”。

**社区反应**：27 条评论在纯 feature request 里热度属于中等偏好，评论内容大概率涉及文件存储格式、多实例同步以及隐私边界——目前重点缺失。

---

### #2 有效每周额度疑似缩减 3–5 倍且未公告（附插桩测数据）  
**状态**：Open | 更新于 2026-08-23｜ **评论 3**  
**作者**：@tobiu  
**链接**：<https://github.com/MoonshotAI/kimi-cli/issues/2604>  

这是一条相当“硬核”的传输性问题报告：作者用自己开发的 wire-level JSONL JSON 记录全面 token 用量——包含每日原始 token、缓存读取 token 与输出 token，通过前后对比发现每周实际可用额度下降约 3–5 倍。

**What matters**：  
- 如果用户真，则意味着服务端可能同时改变了速率限制/计费标准而判别未公告。  
- 对企业身用户或重度 Agent 开发者来说，额度变化可能直接体现成本涨幅，影响稳定性。  
- 另一种解释是 **计量回归**：服务端 token 计算/缓存命中率算法在 7 月中旬后被捣鼓了，实际用量没有变化，只是桶漏。这同样需要官方表态。  

**社区反应**：评论数量不多（3 条），但 Issue 收录的数据证据硬核（含前后测与 JSONL 指标），容易在社区内部引起关注。而问题明确定位为“透明度 + 一致性”不稳，这一类是开发者平台信任的典型威胁。

---

### 3. #2484 空白标题  
**状态**：Closed｜ 更新于 2026-08-23  
**作者**：@lin200083  
**链接**：<https://github.com/MoonshotAI/kimi-cli/issues/2484>  

内容为 `.`（空 payload）。已在之前被关闭，不构成正式需求。可看作是是维护者很安静的处理，“非研究 / 占位 / 无效工单”再次出现。

---

## 4. 重要 PR 进展

> 与 Issue 情况类似，过去 24 小时只有 2 PR 更新，均为新活跃的 Pull Request。

---

### PR #2616 – Add Build

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-24

## 今日速览

过去 24 小时无新版本发布，但社区活跃度集中在 **会话可靠性** 与 **模型服务稳定性** 两大方向：多个 PR 针对 `finish_reason: stop` 空响应、流中断 UI 卡死等问题进行修复；同时 1.18.21 版本更新后出现多例网络错误与 "Interrupted" 无响应报告，Big Pickle 模型频繁中断也引发较多讨论。核心维护者 @kitlangton 提交了一系列 workspace 位置修复 PR，值得关注。

## 社区热点 Issues

### 1. 本地 Ollama 工具调用失败或直接不调用
- **#1034** | 评论 31 | 👍 16
- 链接: https://github.com/anomalyco/opencode/issues/1034
- 用户使用支持工具调用的 `qwen3:32b` 本地模型时，模型仅"思考"使用哪个工具而从不实际调用，偶尔才成功。这是社区讨论最热的问题，反映了本地模型工具调用链路的可靠性短板。

### 2. 1.18.21 网络错误回归
- **#44528** | 评论 7
- 链接: https://github.com/anomalyco/opencode/issues/44528
- Windows 10 用户时隔数日重新打开程序即持续报网络错误，涉及 "Big Pickle" 模型及 Ollama Cloud provider。该问题与 #44473 等 3 个 issue 高度相似，疑似 1.18.21 版本回归。

### 3. UI 卡死 "thinking..." 且无法恢复
- **#32366** | 评论 7 | 👍 1
- 链接: https://github.com/anomalyco/opencode/issues/32366
- 流式错误（如 socket 意外关闭）后桌面 UI 无限停留在 "thinking..."，无错误提示、无状态恢复，只能重启应用。该 issue 已持续两个多月，仍然存在，说明会话健壮性亟待改善。

### 4. 1.18.21 更新后应用完全无响应（"Interrupted"）
- **#44347** | 评论 3
- 链接: https://github.com/anomalyco/opencode/issues/44347
- 用户升级后任何会话均返回 "Interrupted"，新老会话全部损坏，日志中无任何记录。这是 1.18.21 版本最严重的稳定性报告。

### 5. Zen API：含 tools 的请求全部失败
- **#44300** | 评论 4 | 👍 1
- 链接: https://github.com/anomalyco/opencode/issues/44300
- 自 2026-08-23 起，Ox Alpha 免费模型在 Zen Console 与 Go 路由上只要请求携带 `tools` 数组即报 "Endpoint is unavailable"。免费模型服务出现功能性中断。

### 6. MCP 工具结果 structuredContent 被丢弃
- **#38923** | 评论 4 | 👍 1
- 链接: https://github.com/anomalyco/opencode/issues/38923
- MCP 服务器返回同时包含 `content` 与 `structuredContent` 时，opencode 仅转发前者，导致依赖结构化数据的 MCP 工具无法正常工作。这是 MCP 集成的重要缺陷。

### 7. OpenAI 兼容模型调用工具时 schema 参数无效
- **#29142** | 评论 3 | 👍 5
- 链接: https://github.com/anomalyco/opencode/issues/29142
- 使用 OpenAI 兼容模型时，内置 `write`/`edit` 工具偶发收到非法参数形状，UI 直接暴露 schema 错误而非引导模型修正，导致工具调用反复失败。

### 8. Desktop 双克隆仓库项目身份混淆
- **#44101** | 评论 3
- 链接: https://github.com/anomalyco/opencode/issues/44101
- 同一 git 仓库的两个本地克隆被 Desktop 视作同一项目，UI 始终显示第一个注册的项目名/路径，重启无法修复。项目 ID 的派生逻辑需要调整。

### 9. macOS 上 Bun 优雅关闭段错误
- **#31563** | 评论 2
- 链接: https://github.com/anomalyco/opencode/issues/31563
- Apple Silicon 上关闭交互式会话时，内嵌 Bun 1.3.14 触发 `Segmentation fault`，进程崩溃并留下 `zsh: trace trap`。已持续数月，影响 macOS 用户体验。

### 10. Big Pickle 模型频繁中断响应
- **#44447** | 评论 2
- 链接: https://github.com/anomalyco/opencode/issues/44447
- 用户反映 36 小时前开始 Big Pickle 每约 2 分钟就停止生成，必须反复输入 "Keep going" 才能继续，此前并无此问题。结合多个同类报告，服务端模型稳定性存在明显波动。

## 重要 PR 进展

### 1.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-24）

## 今日速览
qwen-code 项目保持着高强度的迭代节奏：昨日发布 `v0.22.0-nightly`，重点修复 Web Shell 工作区目录传递问题。社区方面，近 24 小时共有 50+ Issue 和 50+ PR 处于活跃更新状态，其中 **工具权限配置不生效**（#9827）与 **原生命令偶发丢失**（#9821）是新出现的关注焦点，而老牌高赞 Issue——启动后无输出直至 API 超时（#5975）至今未闭环，仍是最强痛点点。与此同时，/review（代码审查）自动化能力在 PR 侧获得了显著增强，官方团队明显在持续加码多智能体协作品质。

## 版本发布
v0.22.0-nightly.20260823.1007bcacfc 已发布，本次为 Nightly 版本，包含以下修复：
- **fix(web-shell)**: 从总览面板（overview panel）打开会话时，传递会话工作区的 cwd 工作目录。
- **fix(web-shell)**: 次要修复（内容展示截断）。

🔗 [查看 Release 详情](https://github.com/QwenLM/qwen-code/releases)

---

## 社区热点 Issues（精选 10 条）

### 1. permissions.allow 未真正限制像 API 的模型工具集（#9827）
> 权限配置“所见非所得”：`permissions.allow` 只影响 CLI 界面显示，实际发给模型的完整工具列表不变，容易造成越权行为或 context 浪费。

- **作者**: @phisad | **更新**: 2026-08-23 | **评论**: 4
- **理由**: 这是权限管理的重大绕绕，涉及托管客户或严格安全团队关注的审计隐患，目前是新重点。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9827)

---

### 2. 无 stream 活动 120 秒 after 19 chunks（老牌痛点）
> 升级 v0.19.3 后频繁出现 [API Error: No stream activity for 120000ms after 19 chunks]，丢过年输出了只有转圈没有增量，直到超时。

- **作者**: @yousimu | **更新**: 2026-08-23 | **评论**: 11 | 👍: 1
- **理由**: 高评论量+影响高频重度用户，属于必看的长尾问题；损害沉浸式编程体验。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/5975)

---

### 3. Windows 终端中文输入时显示拼音，无法确认
- **作者**: @lanrain | **更新**: 2026-08-23 | **评论**: 8
- **理由**: 极大影响中文开发者在 Windows 的命令行输入体验，优先级 P2 且标注欢迎 PR。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/8625)

---

### 4. Native 斜杠命令间歇性从 Skill-tool 表面消失（async 竞争）
- **作者**: @nnyjthm | **更新**: 2026-08-23 | **评论**: 3
- **理由**: 偶发未定义行为：用户级命令只能在 Skill 工具 50% 的情况下被识别，而内置命令又正常，破坏整体一致性认知。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9821)

---

### 5. 背景 Agent 超长存活无主动恢复能力（activeWork 提案）
- **作者**: @doudouOUC | **更新**: 2026-08-22 | **评论**: 4
- **理由**: 深度语义的活跃工作记录与恢复机制，为 Schedule/远程 Agent 及 WebShell 深度诊断铺路，属于阿 Q 框架长期路线图中的重要升级。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/8586)

---

### 6. 基于 workflow engine 重建 /review 编排 第 3-5 步
- **作者**: @wenshao | **更新**: 2026-08-23 | **评论**: 4
- **理由**: 官方核心维护者提出将多 Agent 审查从模型驱动转为代码确定性（workflow 引擎），直接影响代码审查的稳定性/可测试性，对后续质量影响深远。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/8769)

---

### 7. autofix 机器人维护的 deferred findings（#9612）
- **作者**: @qwen-code-dev-bot | **更新**: 2026-08-23 | **评论**: 4
- **理由**: 独立的自动保护机制，持续累积 PR # 之外的审查结论，供维护者跟踪跨 PR 问题，体现项目丰富的自理能力。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9612)

---

### 8. 社区提问：与 craft-agents-oss 是否有关？界面一致且会话共用
- **作者**: @aixuxing | **更新**: 2026-08-23 | **评论**: 2
- **理由**: 关乎 Qwen Code 技术部署与标准生态透明度，社区希望确认是否存在盗用或成果继承。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9831)

---

### 9. DeepSeekV4 Flash Vision 模型识别（图片能力缺失）
- **作者**: @stevenxinhaoy 2026 | **更新**: 2026-08-23 | **评论**: 3
- **理由**: 展示了用户对“非 Qwen 模型”与第三方 OpenRouter 网关混用场景的迫切诉求，尤其视觉能力适配等待一直是形象话题。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9832)

---

### 10. CI 安全：带 PAT 的 job 与不受信任的分支代码共享宿主
- **作者**: @wenshao | **更新**: 2026-08-23 | **评论**: 7
- **理由**: 自治安全审查发现的幽灵级持久风险，GitHub Actions 已无法禁运，直接关系到仓库 CI 鲁棒性与供应链安全。
- [查看 Issue](https://github.com/QwenLM/qwen-code/issues/9089)

---

## 重要 PR 进展（精选 10 个）

| PR | 要点 | 状态 |
| --- | --- | --- |
| [#9441](https://github.com/QwenLM/qwen-code/pull/9441) | **fix(core)**：当 PreToolUse hook 返回 `ask` 时，展示后台伯克尝试的 edit/exec 差异，不再以灰色 prompt 回应。 | 🟢 开放 |
| [#9793](https://github.com/QwenLM/qwen-code/pull/9793) | **fix(core)**：将嵌套子智能体（后台 Agent child）的审批信息回安全传导到 UI，避免 `TOOL_WAITING_APPROVAL` 无人监听导致长时间阻塞。 | 🟢 开放 |
| [#9740](https://github.com/QwenLM/qwen-code/pull/9740) | **feat(/reviews 的 Step 4)**：为验证阶段引入“执行级证据”（在同一脚本, 两树跑对比），完全翻转“代码讨论”的准确性。 | 🟢 开放 |
| [#9741](https://github.com/QwenLM/qwen-code/pull/9741) | **fix(review)**：scratch-tree 会 Prune 时不会误读仓库 config，以免调用 `smudge` 滤网后果出现; 避免 #9558 的回归。 | 🟢 开放 |
| [#9769](https://github.com/QwenLM/qwen-code/pull/9769) | **feat(web-shell)**：Update Project 在 dirty working tree 时提供冲突解决面板（择一式），不再一条错误挡住运维。 | 🟢 开放 |
| [#9770](https://github.com/QwenLM/qwen-code/pull/9770) | **fix(web-shell)**：限制 React dev `performance.measure` 炮灰堆积，避免 Web Shell 长时间运行后 renderer OOM（内存泄漏）。 | 🟢 已关闭（merged） |
| [#9728](https://github.com/QwenLM/qwen-code/pull/9728) | **fix(平台)**：一次性修补 Windows / macOS CI 红测原因，包括产品修复、测试脚手架修正与 CI 装备修复，恢复双平台获。 | 🟢 开放 |
| [#9776](https://github.com/QwenLM/qwen-code/pull/9776) | **feat(core)**：新增批准审计后的 `Storage.getAuditFallbackDir` 人类可转向目录，保证不应进仓库的工件安全落地（0700, 按项目 hash 隔离）。 | 🟢 开放 |
| [#9739](https://github.com/QwenLM/qwen-code/pull/9739) | **feat(core)**：复用 session↔PR 绑定：捕捉 agent 在 shell 中调用 `gh pr create` 的上下文，无需手动操作 Web 对话。 | 🟢 开放 |
| [#9813](https://github.com/QwenLM/qwen-code/pull/9813) | **feat(ci)**：按文件路径自动请求 area 维护者的 review，配合 #8668 的权限 owner 细分，降低大型 PR 对团队效率的稀释。 | 🟢 开放 |

---

## 功能需求趋势
综览近 24 小时活跃的 Issues/PR 与 roadmap 标签，社区最集中关心的技术方向为：

1. **多 Agent 与后台安保机制的完备化**
   - 既有 PR #9793（嵌套审批透传）、#8805（后台 Agent 恢复），也有官方提出将 /review 的编排迁入 workflow 引擎，让 worker 扇出和循环变得确定性。整体下一阶段的重点正从“功能可用”转向“系统可管控”。

2. **权限体系的一源化与实操收敛**
   - #9827（permissions.allow 没有真正过滤工具）、#9145（approval-mode 定义被复制到 20 个文件，已经发生错乱）等既体现对一致性的强需求，也让配置体验与安全诉求更进一步。

3. **Web Shell 成为一级 UI**
   - 最近 24h release 的两个 fix 都是针对 Web Shell；PR 中还有 update 项目、dev OOM、文件落地等整改，可见这个团队投入显著后重，预计

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*