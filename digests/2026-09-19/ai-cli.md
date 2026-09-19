# AI CLI 工具社区动态日报 2026-09-19

> 生成时间: 2026-09-19 02:13 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告 — 2026-09-19

## 1. 生态全景

AI CLI 工具正从“单机代码助手”向“可扩展的开发者平台”演进。**插件/Mod 体系**（Claude Code function hooks、Codex 云端插件发现、Qwen 扩展目录）与 **AGENTS.md 行业标准统一** 是本阶段最明确的架构级信号。与此同时，多工具不约而同地在 **Windows 平台稳定性** 上集体承压——三份完整日报中均出现 P1 级/高破坏力 bug（内存泄漏、数据误删、功能回归）。行业正处于“从 Demo 到生产可用”的爬坡期，社区反馈从尖叫的“多出新功能”转向“先稳定下来”。

## 2. 各工具活跃度对比

| 工具 | Issues 数 | PR 数 | Release |
|---|---|---|---|
| **Claude Code** | 10 个精选（今日新增 #95489、#95500 等） | 8 个精选（全为 mod/diff 相关） | v2.1.277（正式版，AGENTS.md 支持） |
| **OpenAI Codex** | 10 个精选（含 1 个 CRITICAL DATA LOSS） | 10 个合并（copyberry[bot] 主导） | rust-v0.155.1（修复版）+ 多个 alpha |
| **Qwen Code** | 10 个精选（3 个 P1） | 10 个精选 | v0.24.1-preview.0 + v0.24.0-nightly |
| **Gemini CLI** | ⚠️ 摘要生成失败 | — | — |
| **GitHub Copilot CLI** | ⚠️ 摘要生成失败 | — | — |
| **Kimi Code CLI** | ⚠️ 摘要生成失败 | — | — |
| **OpenCode** | ⚠️ 摘要生成失败 | — | — |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体表现 |
|---|---|---|
| **插件/Mod 系统扩展** | Claude Code + Codex + Qwen | Claude Code：官方确认 function hooks 数周内落地，8 个 PR 中 5 个为 mod；Codex：今日 10 个合并 PR 中约半数与插件目录/云端发现相关；Qwen：社区提出 `--extension-dir` 企业级统一管理扩展 |
| **AGENTS.md 行业标准兼容** | Claude Code | #6235（👍5169）正式落地，v2.1.277 全面支持，社区早已将此视为“向 Codex/Cursor 等行业标准靠拢”的关键一步 |
| **Windows 平台稳定性** | Claude Code + Codex + Qwen | Claude Code：fswatch 内存泄漏 230MB/min；Codex：沙箱初始化失败/Computer Use 截图失败/越界删除数百 GB 数据；Qwen：PTY prebuild 未打包，macOS（非 Windows，但属于同类“平台打包信任”问题） |
| **数据安全与完整性** | Codex + Claude Code + Qwen | Codex：#46022（CRITICAL DATA LOSS）与 #33624（Full Access 误删家目录）；Claude Code：#77651 工具调用间文本静默丢弃；Qwen：多个“失败被吞成空结果”的静默失败模式 |
| **会话状态管理可靠性** | Codex + Claude Code + Qwen | Codex：卡 Thinking/Stop 失效/turn 丢失；Claude Code：#95500 fable-5 分类器会话级级联误判；Qwen：session-writer 锁恢复问题群（#12212-12214） |
| **上下文/Tok en 透明性** | Qwen + Claude Code | Qwen：#12028 非对话上下文 Token 治理 + /context 分类对齐；Claude Code：diff 面板只读命令跳过 refetch、停靠预读等 IO 优化 |

## 4. 差异化定位分析

| 维度 | Claude Code | OpenAI Codex | Qwen Code |
|---|---|---|---|
| **核心叙事** | 可扩展的 CLI 工作台（mods + hooks + diff 体验打磨） | 平台级智能体（Computer Use + 云插件发现 + 沙箱安全） | 开发者体验补全（LSP/CJK 多语言 + 会话管理 + MCP 企业集成） |
| **目标用户** | 追求可定制化工作流、深度集成已有工程习惯的独立开发者/团队 | 偏向全栈自动化、愿意尝试前沿 AI 智能体（Computer Use/浏览器自动化）的开发者 | 中文/多语言开发者、企业级用户、依赖 LSP 协议的重度 IDE/CLI 混合使用者 |
| **技术路线** | 以“社区 mod + AGENTS.md 标准”构建开放的本地优先工具链 | 以“沙箱安全 + 平台级身份/权限 + 云插件生态”推进从 CLI 到操作系统的全链路智能体 | 以“协议级监管（LSP/ACP）+ 运行时务实主义（gitignore 内存优化、glibc 预检/）”建立稳健性口碑 |
| **当前短板** | Windows 平台内存泄漏集中爆发；Issue 自动关闭机制引发信任危机 | Windows 沙箱与 Computer Use 大面积不可用；数据误删报告严重侵蚀信任 | 升级回归频繁（/cd 失效）、多语言场景仍存在系统性欠账（会话摘要硬编码英文） |

## 5. 社区热度与成熟度

- **Claude Code**：社区规模与活跃度最高（#6235 获 👍5169，为历史最高赞 issue 之一 —— 能积累到这种量级的诉求，说明用户基数足够庞大、且忠诚度高）。已进入“功能大爆发后的稳定期”，近期焦点从“缺什么”转向“某某功能出了 bug，快修”。**成熟度：高，但被 Windows 问题拖累。**

- **OpenAI Codex**：社区反馈激烈（CRITICAL DATA LOSS 引爆关注），PR 由 copyberry[bot] 主导，自动化程度高，但**产品安全信任正在被侵蚀**。可以看出团队在快速推进（大量重构合并），但用户侧对“越界删除”“会话状态不可靠”这类问题的容忍度极低。**成熟度：中高，处于快速扩张但安全边界失守的危机期。**

- **Qwen Code**：社区活跃但问题集中在“升级回归 + 静默失败”，整体诉求更偏工程稳健性而非炫酷功能。三个 P1 bug 同时挂出（PTY 不可用、/cd 回归、LSP 非 ASCII 丢弃），说明**发布质量管控仍需加强**。不过社区也展示了系统性思考能力（Goal 运行时精简、权限体系精细化），用户群专业度高。**成熟度：中，处于快速迭代期。**

- **Gemini CLI / Copilot CLI / Kimi / OpenCode**：今日数据缺失，暂无法评估（如获得补充数据可完善对比）。

## 6. 值得关注的趋势信号

**① 插件化/Mod 化是行业级确定性方向。** 三家主要工具同日在插件系统上发力——这不是巧合。对开发者而言，选择工具时“生态可扩展性”权重应高于“开箱即用功能数量”；未来可迁移的技能资产（AGENTS.md、mods、插件）比工具本身更值得积累。

**② 沙箱安全正从“防逃逸”走向“防误删”。** Codex 的 #46022 和 #33624 把“Full Access 模式下的破坏性操作”推到聚光灯下。社区共识：默认安全策略应更保守、破坏性操作应有硬确认。此信号对任何引入 AI 代理的生产环境都是预警。

**③ Windows 平台是所有 CLI 工具的共同短板。** 三份完整日报中均有 Windows/macOS 平台级故障——这不是个别工具的问题，而是整个 AI CLI 生态对非 Linux 平台适配投入不足的系统性信号。Windows 用户在选择工具时，需优先确认对方平台成熟度。

**④ 发布节奏过快引发“回归疲劳”。** Claude Code 的磁盘技能回归、Qwen Code 的 /cd 回归、Codex 的多次 alpha 迭代——社区反馈已出现明显的“求稳”情绪。工具评估时，“bug 修复速度”之外也应关注“回归率”（今日修复、明日重现）。

**⑤ “静默失败”成为信任毒药。** LSP 返回空、工具间文本丢弃、分类器误报、会话恢复吞错——这些 bug 的共同特征是“看似正常但实际没发生”，比直接报错更具破坏性。开发者选择工具时，可优先排查历史 issue 中是否存在同类“静默吞错”模式。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止：2026-09-19 | 数据源：github.com/anthropics/skills**

---

## 一、热门 Skills 排行（Top

---

# Claude Code 社区动态日报 — 2026-09-19

## 今日速览

v2.1.277 正式发布，社区呼声最高的 **AGENTS.md 支持**（#6235，获 👍5169）终于落地；同时多位社区开发者围绕 `diff` 与 `agents-md` 提交 mod 系列 PR，插件生态进一步活跃。Windows 平台内存泄漏与磁盘技能加载回归成为今日 bug 焦点。

---

## 版本发布

### v2.1.277
- **AGENTS.md 支持**：在无 `CLAUDE.md` 的项目中自动读取 `AGENTS.md`，可在 `/config` 的 "Project instructions" 下切换；暂不支持 Bedrock、Vertex、Foundry。
- **新增环境变量** `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1`，用于仅作为出口边界的 Claude 应用网关。

---

## 社区热点 Issues

挑选了 10 个最值得关注的 Issue：

### 1. #6235 Feature Request: Support AGENTS.md — 已关闭 ✅
- **链接**: https://github.com/anthropics/claude-code/issues/6235
- **热度**: 👍5169 / 💬400 — 历史最高赞 issue 之一
- **要点**: 社区此前强烈呼吁向 Codex、Cursor 等行业标准 `AGENTS.md` 格式靠拢，而 CLAUDE.md 过于 Claude 专属。**今日 v2.1.277 已实现该功能**，长期诉求正式落地。

### 2. #91870 Mods — make Claude 10x more extensible
- **链接**: https://github.com/anthropics/claude-code/issues/91870
- **热度**: 👍121 / 💬201
- **要点**: 官方确认 **function hooks 将在数周内（而非数月）落地**，与 #95409 等 mod PR 互相印证。插件化是当前社区最期待的能力之一。

### 3. #18435 多 Claude 账户快速切换
- **链接**: https://github.com/anthropics/claude-code/issues/18435
- **热度**: 👍814 / 💬192
- **要点**: 在 Claude Desktop 中管理多个账户并一键切换。814 个 👍 表明多账户/多 profile 工作流是高频需求，目前仍无时间表。

### 4. #87647 超过 6k 个 "has repro" issue 被自动关闭
- **链接**: https://github.com/anthropics/claude-code/issues/87647
- **热度**: 👍49 / 💬7
- **要点**: 社区质疑 2026 年 3 月以来自动关闭机制过于激进，6,000+ 带可复现步骤的 bug 被批量关闭，影响问题追踪可信度。

### 5. #95489 Windows/MSIX Desktop 内存泄漏：fswatch 探测 38,000 次/秒
- **链接**: https://github.com/anthropics/claude-code/issues/95489
- **热度**: 👍0 / 💬1 — 今日新提交，严重度高
- **要点**: Windows MSIX 桌面版内置引擎对失败的 fswatch 探测以 ~38,000 次/秒疯狂重试，导致 ntfs.sys 非分页池以 **~230 MB/分钟**泄漏直至重启。已有临时绕过方案（`CLAUDE_CODE_TMPDIR`），官方尚未响应。

### 6. #95367 磁盘技能完全不加载（2.1.271 回归）
- **链接**: https://github.com/anthropics/claude-code/issues/95367
- **热度**: 👍0 / 💬2
- **要点**: 2.1.271 中 `~/.claude/skills/` 下的用户技能和插件技能全部丢失，仅剩内置技能。对依赖自定义技能的开发者影响重大，需紧急修复。

### 7. #77651 工具调用之间的助手文本被静默丢弃
- **链接**: https://github.com/anthropics/claude-code/issues/77651
- **热度**: 👍0 / 💬11
- **要点**: 模型在工具调用间隙产生的思维文本既不渲染、Ctrl+O 不可见、也不写入 session `.jsonl`——存在**数据完整性风险**，且与 `claude-fable-5` 的交错思考模式相关。

### 8. #76694 Cowork 新项目丢失 "Choose a folder" 入口
- **链接**: https://github.com/anthropics/claude-code/issues/76694
- **热度**: 👍26 / 💬29
- **要点**: Chat/Cowork 合并后，新项目创建流程被替换为仅上传聊天的知识菜单，上下文菜单回归，影响文件型工作流。

### 9. #95455 excludedCommands 沙箱配置回归（2.1.277）
- **链接**: https://github.com/anthropics/claude-code/issues/95455
- **热度**: 👍0 / 💬3
- **要点**: 沙箱 `excludedCommands` 的 glob 匹配规则过严，`git -C`、`-c`、`--git-dir` 等携带前置 flag 的单条命令被误拦截。与 2.1.277 的修复引入的回归有关。

### 10. #95500 Fable 5 安全分类器链式误报整个会话
- **链接**: https://github.com/anthropics/claude-code/issues/95500
- **热度**: 👍0 / 💬0 — 今日新提交
- **要点**: 一旦会话被标记为“与网络安全相关”，**之后所有后续请求**（包括儿童歌曲歌词、日常韩语电商指令）都会被持续标记，共 6 个 request ID 受影响。`switchModelsOnFlag: false` 也无法阻止。分类器的会话级状态管理需修复。

---

## 重要 PR 进展

### 1. #95409 mods/agents-md: AGENTS.md 项目指令 mod
- **链接**: https://github.com/anthropics/claude-code/pull/95409
- **要点**: 新增 `agents-md` mod 源码，按 `sec-default`、`diff` 同款布局组织（manifest + hooks + 测试），支持通过 `instructionFiles` 选项配置读取行为。**这是社区对 AGENTS.md 支持的插件化回应**。

### 2. #95417 mods/agents-md: Read 不再附加嵌套 AGENTS.md
- **链接**: https://github.com/anthropics/claude-code/pull/95417
- **要点**: 修复 `Read` 工具在 `--bare`（`CLAUDE_CODE_SIMPLE`）或 `CLAUDE_CODE_DISABLE_ATTACHMENTS` 模式下仍附加嵌套 AGENTS.md 的问题，与引擎行为保持一致。

### 3. #94847 diff: 首个编辑仅在可列出文件时打开面板
- **链接**: https://github.com/anthropics/claude-code/pull/94847
- **要点**: 修复首次 Edit/Write/NotebookEdit 后 diff 面板自动打开但显示空状态的问题——仓库外写入、忽略文件、不同 worktree 场景下不再弹出空白面板。

### 4. #95488 diff: 停靠面板打开前预读仓库
- **链接**: https://github.com/anthropics/claude-code/pull/95488
- **要点**: 停靠式 diff 面板在打开前读取仓库数据，首次编辑和 `/diff` 命令都能直接呈现数据，不再出现 "Loading diff…" 中间态。

### 5. #95476 diff: 仅主循环+开启检查点时自动打开
- **链接**: https://github.com/anthropics/claude-code/pull/95476
- **要点**: 子代理编辑或关闭检查点时不再自动弹出 diff 面板——与内置面板行为对齐，减少干扰。

### 6. #95423 diff: 只读 shell 命令跳过 refetch
- **链接**: https://github.com/anthropics/claude-code/pull/95423
- **要点**: 通过读取 `isReadOnly` 属性，`ls`、`git status`、`cat`、grep 等只读命令不再触发 diff 刷新，减少冗余 IO。

### 7. #95198 mods/diff: openPane 返回类型适配
- **链接**: https://github.com/anthropics/claude-code/pull/95198
- **要点**: 将 `openPane` 类型声明为 `Promise<unknown>`，兼容即将返回结果对象的 `$.ui.open` API，为引擎升级做准备。

### 8. #51452 README.md 全面改写
- **链接**: https://github.com/anthropics/claude-code/pull/51452
- **要点**: 清理 AI 写作痕迹、精简安装区块、修复 npm 徽章。提升文档可读性，但长期 open 后今日才更新，官方响应节奏值得关注。

---

## 功能需求趋势

从今日 50 条 Issue 中提炼的社区核心诉求：

| 方向 | 代表 Issue | 状态 |
|---|---|---|
| **AGENTS.md 行业标准兼容** | #6235 | ✅ 已随 v2.1.277 实现 |
| **Mod/插件系统扩展（function hooks）** | #91870 | 🚧 官方确认数周内落地 |
| **多账户/Profile 管理** | #18435 | 开放中，高赞需求 |
| **远程控制/移动端体验** | #94735、#95478、#95501 | 多端同步与深链问题频发 |
| **MCP Widget 沙箱与渲染** | #95499 | 新提交，CSP 拦截无报错 |
| **桌面端文件夹/项目工作流** | #76694、#95472 | 回归较多，UX 不稳定 |

**趋势判断**：AGENTS.md 支持落地后，社区注意力正转向 **插件系统能力** 与 **桌面端稳定性**。移动端远程控制是增长中的新场景，但 bug 密度较高。

---

## 开发者关注点

1. **Windows 内存泄漏集中爆发**：`#95489`（fswatch 重试 38k/s，230MB/min）与 `#94198`（CoworkVMService 非分页池泄漏）指向同一内核签名，且 `#45889` 曾被锁定关闭——社区对 Windows 平台质量信心受影响。

2. **自动关闭 Issue 机制引发信任危机**：6,000+ 个带 repro 的 issue 被静默关闭（#87647），开发者担心反馈渠道失效。

3. **回归节奏过快**：#95367（技能加载）、#95455（沙箱 glob）、#52004（Glob/Grep 工具丢失）均为近期版本引入的回归，社区希望加强发布前的回归测试。

4. **安全分类器误报影响正常使用**：#95500 与 #95479 显示 `claude-fable-5` 的分类器存在会话级级联误判，对非英语/非安全场景的日常任务影响严重。

5. **数据完整性问题**：#77651 中工具调用间的文本静默丢失，涉及会话记录的可靠性，属于“不可接受”级别的问题，需优先级提升。

---

*数据来源: github.com/anthropics/claude-code | 生成时间: 2026-09-19*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-19

## 今日速览

今日 Codex 发布了 `rust-v0.155.1` 修复版本，默认禁用 TUI 新会话中的 reasoning summaries 以避免部分供应商拒绝请求。社区层面，Windows 平台仍是问题重灾区：一则 [CRITICAL DATA LOSS 报告](#46022) 称 Codex 在 Windows 上越界删除了数百 GB 数据，另有大量 Windows 沙箱 "setup refresh had errors" 相关 Issue 持续发酵。PR 侧今日有约 20 个由 copyberry[bot] 提交的合并，集中在插件系统重构、沙箱安全加固和 TUI 交互改进。

## 版本发布

**rust-v0.155.1**（最新稳定版）
- **Bug Fix**：新的本地 TUI 会话默认禁用 reasoning summaries，修复了因不支持该功能的供应商而导致的请求被拒问题；显式设置的 reasoning-summary 配置仍会生效。
- 完整变更日志：https://github.com/openai/codex/compare/rust-v0.155.

另有多个预发布版本（rust-v0.156.0-alpha.2 ~ alpha.5、rust-v0.155.0-alpha.9.2），暂无公开变更细节。

## 社区热点 Issues

以下为过去 24 小时内更新最活跃、影响面最大的 10 个 Issue：

1. **[#25178] Windows Computer Use 截图失败（SetIsBorderRequired 报错 0x80004002）**
   - 评论 69 | 👍 28
   - 影响：Windows 10 22H2 上 Computer Use 可操作窗口但无法截图，核心 API 调用失败
   - 链接：https://github.com/openai/codex/issues/25178

2. **[#33624] Full Access 模式下缺少对批量删除/家目录删除的硬确认和安全恢复门**
   - 评论 36
   - 影响：有报告称 Ultra 模式子代理在 Full Access 下误删 Mac 家目录大部分文件，社区呼吁增加安全确认机制
   - 链接：https://github.com/openai/codex/issues/33624

3. **[#46022] [CRITICAL DATA LOSS] Windows 上 Codex 越界删除数百 GB 数据**
   - 评论 24
   - 影响：破坏性文件操作超出项目/任务范围，删除无关项目、应用甚至 Windows 组件，需立即关注
   - 链接：https://github.com/openai/codex/issues/46022

4. **[#24287] Codex Desktop 卡在 "Thinking" 状态，Stop 失效，重启后 turn 消失**
   - 评论 32 | 👍 14
   - 影响：会话状态管理缺陷导致 UI 假死、无法停止、历史丢失，影响日常使用
   - 链接：https://github.com/openai/codex/issues/24287

5. **[#17322] Windows 桌面应用关闭窗口不退出 + 侧边栏 "New Chat" 命中测试问题**
   - 评论 22 | 👍 19
   - 影响：窗口关闭后进程残留，侧边栏 UI 交互异常
   - 链接：https://github.com/openai/codex/issues/17322

6. **[#45119] macOS 14.2 沙箱启动失败：未绑定变量 TIOCSTI**
   - 评论 21
   - 影响：macOS 14.2 上沙箱完全不可用，影响所有使用沙箱的 CLI 操作
   - 链接：https://github.com/openai/codex/issues/45119

7. **[#43596] Windows Computer Use 无法访问原生应用：应用清单为空，sky RPC 不可用**
   - 评论 19 | 👍 4
   - 影响：Computer Use 在 Windows 上无法枚举/操作原生应用
   - 链接：https://github.com/openai/codex/issues/43596

8. **[#9252] TUI 命令建议中多出 2 个前导空格**
   - 评论 17 | 👍 90（全场最高赞）
   - 影响：TUI 交互细节问题，虽然是 minor 但社区关注度很高
   - 链接：https://github.com/openai/codex/issues/9252

9. **[#45835] Codex App 反复提示 "Selected model is at capacity"，尽管网络连接正常**
   - 评论 15 | 👍 3
   - 影响：频繁的误报容量错误打断工作流，疑似限流检测逻辑缺陷
   - 链接：https://github.com/openai/codex/issues/45835

10. **[#27889] Windows 提升权限沙箱设置失败：SetNamedSecurityInfoW 错误 5**
    - 评论 12 | 👍 3
    - 影响：Windows 上沙箱初始化失败，导致所有沙箱内操作不可用
    - 链接：https://github.com/openai/codex/issues/27889

**值得关注的新增 Issue（创建于今日）：**
- [#46537] Windows 上无法使用语音聊天（版本 26.915.4065.0）— 评论 6
  - 链接：https://github.com/openai/codex/issues/46537

## 重要 PR 进展

今日 PR 以内部重构和稳定性修复为主，以下为 10 个关键合并：

1. **[#46575] Preserve Windows package identity for sandboxed descendants**
   - 修复 Windows 包身份传播仅限于 `codex-command-runner.exe` 的问题，使其他打包调用者也能正确传递 OS 身份给沙箱子进程
   - 链接：https://github.com/openai/codex/pull/46575

2. **[#46571] Preserve macOS Seatbelt exclusions in scratch directories**
   - 修复隐式临时目录授权可能绕过文件系统限制的问题，确保 scratch 目录中的路径排除规则不被破坏
   - 链接：https://github.com/openai/codex/pull/46571

3. **[#46574] Notify users when asynchronous questions arrive in the TUI**
   - TUI 新增异步问题到达通知，遵循现有通知设置，单问题显示标题、多问题显示数量
   - 链接：https://github.com/openai/codex/pull/46574

4. **[#46573] Add a standalone network proxy binary with JSON configuration**
   - 新增 `codex-network-proxy --config <PATH>`，允许无需完整 Codex 权限配置即可独立运行网络策略代理
   - 链接：https://github.com/openai/codex/pull/46573

5. **[#46572] Add turn-start cloud plugin discovery to the MCP extension**
   - MCP 扩展支持云端插件发现，每个常规 turn 开始时刷新线程级目录，支持云端连接器元数据用于应用归因
   - 链接：https://github.com/openai/codex/pull/46572

6. **[#46568] Use captured environment state for permissions and daemon recovery**
   - 当所选环境不可用时，权限回退使用 turn 初始环境和工作区根；修复守护进程恢复可能错过 local environment 的问题
   - 链接：https://github.com/openai/codex/pull/46568

7. **[#46567] Separate plugin catalog listing from package resolution**
   - 将插件目录类型和 `PluginProvider` 列表接口移入 `codex-core-plugins`，从插件提供者中移除根解析逻辑，抽象更清晰
   - 链接：https://github.com/openai/codex/pull/46567

8. **[#46566] Allow recovery commands when the current thread is unavailable**
   - 修复线程不可用时 slash 命令被阻塞的问题，允许恢复命令在服务端保持连接时执行，支持启动/恢复会话
   - 链接：https://github.com/openai/codex/pull/46566

9. **[#46565] Preserve reasoning order in TUI activity groups**
   - 修复推理摘要与计算机操作/探索命令在同一 ActivityGroup 中的顺序错乱，确保在运行调用完成前到达的推理摘要仍保持原有顺序
   - 链接：https://github.com/openai/codex/pull/46565

10. **[#46562] Add system proxy fallback for login and startup requests**
    - 在云配置启用 `respect_system_proxy` 之前，登录和企业配置引导阶段回退使用系统代理，解决仅通过系统代理可访问端点的场景
    - 链接：https://github.com/openai/codex/pull/46562

## 功能需求趋势

从今日 Issue/PR 中提炼出的社区关注方向：

1. **Windows 平台稳定性（最高优先级）**
   - 大量 Windows 专属 issue：沙箱初始化失败（"setup refresh had errors" 系列）、Computer Use 无法访问原生应用/截图失败、权限提升问题
   - 趋势：Windows 用户基数增长但平台适配明显滞后，沙箱和桌面应用稳定性是最大短板

2. **数据安全防护（高风险）**
   - 两起严重数据丢失/误删报告（#46022 Windows 越界删除、#33624 Full Access 家目录删除）
   - 趋势：社区强烈要求为破坏性操作（尤其是 Full Access 模式）增加硬确认、恢复门和更严格的作用域边界

3. **Computer Use / 浏览器自动化能力完善**
   - Windows Computer Use 多故障报告（截图失败、app inventory 为空、初始化失败）
   - Browser Use 仍无法上传文件（#20785，file chooser / setInputFiles 未暴露）
   - 趋势：自动化能力是重点方向，但跨平台可靠性是当前瓶颈

4. **插件体系与 MCP 扩展性增强**
   - 今日 PR 中约半数与插件系统相关：云端插件发现、目录抽象、MCP 扩展重命名/API 重构
   - 趋势：OpenAI 正在为第三方插件生态铺路，预计后续会有更多插件能力开放

5. **TUI 交互细节打磨**
   - 前导空格问题（#9252，👍 90）、异步问题通知、推理顺序保留、turn trigger 元数据
   - 趋势：TUI 仍是核心交互界面，细节体验持续优化中

## 开发者关注点

从 Issue 高频关键词和反馈模式来看，开发者的主要痛点集中在：

1. **"setup refresh had errors" / helper_unknown_error（高频词）**
   - 影响至少 8 个独立 Issue（#44696、#42513、#44425、#43373、#44309、#43255 等），横跨 CLI 和 Desktop
   - 表现：Windows 上沙箱初始化/执行助手间歇性失败，重启后仍可能复现，且版本跨度大（0.144 ~ 0.153+ 均受影响）

2. **会话状态管理不可靠**
   - 卡 "Thinking"、Stop 失效、turn 丢失（#24287）、心跳回答旧问题（#43632）、异步问题无通知
   - 影响：长时间运行/自动化的可靠性不足，用户对后台任务缺乏可控性

3. **限流与容量错误提示失真**
   - "Selected model is at capacity" 误报（#45835）、Reset 到期前消失（#32540）
   - 影响：用户无法判断是自身配额问题还是服务端问题，引发不必要困扰

4. **数据丢失零容忍**
   - #46022 和 #33624 引发强烈反响，社区对沙箱逃逸/越权删除的安全信任度下降
   - 反馈核心：默认安全策略应更保守，"Full Access" 不应是免死金牌

5. **配置兼容性与降级路径缺失**
   - macOS TIOCSTI 沙箱崩溃（#45119）、reasoning summaries 默认开启导致请求被拒（rust-v0.155.1 修复）、系统代理未配置时登录失败（#46562 修复）
   - 反馈核心：新功能上线应做更充分的跨平台/供应商兼容性测试，并提供自动降级或回退选项

---

*本日报由 AI 自动生成，数据来源：[github.com/openai/codex](https://github.com/openai/codex)*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-19

## 今日速览

项目发布 `v0.24.1-preview.0` 与 `v0.24.0-nightly` 夜间版，均包含 ACP 文档更新与 CI 发布流程修复。Issue 侧出现三个值得警惕的 P1 回归：macOS 下 Web Terminal 的 PTY 不可用、v0.24.0 后 `/cd` 命令失效、LSP 非 ASCII 响应被静默丢弃。PR 侧则有针对 node-pty 打包与 gitignore 内存问题的两个重要修复。

---

## 版本发布

### v0.24.1-preview.0
- **链接**: [QwenLM/qwen-code/releases](https://github.com/QwenLM/qwen-code/releases)
- **内容**: 补丁预览版，包含两项变更：
  - `docs(serve)`: 记录合并后的 ACP 边界接受情况（@wenshao，[#12024](https://github.com/QwenLM/qwen-code/pull/12024)）
  - `fix(ci)`: 打包前等待已发布的 export renderer（CI 流程稳定性修复）

### v0.24.0-nightly.20260918.537311b8a5
- **链接**: [QwenLM/qwen-code/releases](https://github.com/QwenLM/qwen-code/releases)
- **内容**: 与上述预览版相同的两项变更，无新增用户可见功能。

---

## 社区热点 Issues（10 个）

### 1. Web Terminal 报 "[Error: PTY not available]" — macOS 打包与代码签名冲突
- **编号**: [#11872](https://github.com/QwenLM/qwen-code/issues/11872) | P1 | 10 条评论
- **说明**: `@lydell/node-pty` 声明了依赖但未被打包，且 macOS 代码签名阻止加载本地安装的 prebuild，导致 Web Terminal 无法创建 PTY。影响面大（所有 macOS 桌面端用户），已有对应 PR #12225 尝试修复。

### 2. v0.24.0 更新后 `/cd` 命令无法切换目录
- **编号**: [#12224](https://github.com/QwenLM/qwen-code/issues/12224) | P1 | 5 条评论
- **说明**: 升级到 0.24.0 后，即使在无活跃会话时执行 `/cd` 也会报"响应或工具调用正在进行中"。直接阻断日常目录切换工作流，是典型的升级回归。

### 3. LSP 非 ASCII 响应被静默丢弃（Content-Length 字节数与 UTF-16 长度混淆）
- **编号**: [#12206](https://github.com/QwenLM/qwen-code/issues/12206) | P1 | 4 条评论
- **说明**: 当 LSP 返回 CJK 等非 ASCII 字符时，响应被静默置空（如 `documentSymbol` 对中文标题返回 "No documentation"）。对中文用户是高概率触发 bug。

### 4. TUI 在后台任务注册后崩溃（React 错误 #185）
- **编号**: [#11783](https://github.com/QwenLM/qwen-code/issues/11783) | P1 | 5 条评论
- **说明**: `run_shell_command` 注册后台任务数秒后，TUI 进程因 "Maximum update depth exceeded" 崩溃。阻塞所有依赖后台任务的交互场景。

### 5. 精简 Goal 运行时：从当前轮证据判断完成，移除证据目录与检查点
- **编号**: [#12053](https://github.com/QwenLM/qwen-code/issues/12053) | P2 | 8 条评论
- **说明**: 社区观察到 Goal 在单轮内即可完成目标，后续轮次只是重复收尾。该提案旨在精简运行时，已衍生出 #12155、#12179 等多个阶梯子任务，说明作者在系统性推进架构演进。

### 6. Session recap（离线摘要）永远用英文生成
- **编号**: [#11847](https://github.com/QwenLM/qwen-code/issues/11847) | P3 | 5 条评论
- **说明**: 回话恢复摘要的 system prompt 硬编码为英文，无法跟随会话语言。多语言用户体验不一致，属于"低优先级但社区共识明确"的改进项。

### 7. record provenance 在 api-history 投影中丢失，两类通知仍被错误分类
- **编号**: [#12042](https://github.com/QwenLM/qwen-code/issues/12042) | P2 | 5 条评论
- **说明**: #12007 修复后仍有残留：记录的权威来源字段（`provenance`）在投影为 `Content[]` 时丢失，导致 `detectTurnInterruption()` 误判两类通知形状。这是会话管理精确性的持续打磨。

### 8. 非对话上下文 Token 治理
- **编号**: [#12028](https://github.com/QwenLM/qwen-code/issues/12028) | P2 | 5 条评论
- **说明**: 系统提示、工具 schema、QWEN.md 等非对话上下文在每次请求中都占用 token，但 UI 只显示为小百分比，用户无感知。社区希望"看得见、管得住"这类开销。

### 9. MCP OAuth 丢失 registrationUrl，Atlassian 远程 MCP 无法连接
- **编号**: [#12165](https://github.com/QwenLM/qwen-code/issues/12165) | P2 | 4 条评论
- **说明**: WWW-Authenticate 发现流程未透传 `registrationUrl`，导致 `mcp.atlassian.com` 的 OAuth 认证在打开浏览器前就失败。阻塞特定但重要的企业级 MCP 场景。

### 10. 主 CI 失败（377a5753a73f）
- **编号**: [#12195](https://github.com/QwenLM/qwen-code/issues/12195) | 已关闭 | 4 条评论
- **说明**: 主分支 CI 在测试结果上报前即失败，由 bot 自动跟踪。反映当前 CI 仍存在环境层面的不稳定性。

---

## 重要 PR 进展（10 个）

### 1. fix(desktop): 将 node-pty prebuild 纳入打包运行时
- **编号**: [#12225](https://github.com/QwenLM/qwen-code/pull/12225)
- **说明**: 在 `prepare-runtime.js` 中把 `@lydell/node-pty` 及其 prebuild 放入 `lib/node_modules`，并新增真实 PTY 往返 smoke test。直接对应 #11872 的 P1 问题。

### 2. fix(web-shell): 加固已发布包产物
- **编号**: [#12191](https://github.com/QwenLM/qwen-code/pull/12191)
- **说明**: 确保 `@qwen-code/web-shell` 类型可解析、运行时依赖保持外部化、静态转录导出不意外吸收 MCP Apps 运行时。

### 3. fix(core): 限制大型扫描期间 gitignore 匹配器保留量
- **编号**: [#12156](https://github.com/QwenLM/qwen-code/pull/12156)
- **说明**: 避免大型文件发现扫描为每个目录保留一份独立的 gitignore 编译副本。对大规模仓库的内存占用有明显改善。

### 4. fix(cli): 调度期间保持本地斜杠命令空闲
- **编号**: [#12227](https://github.com/QwenLM/qwen-code/pull/12227)
- **说明**: 本地 slash 命令（如 `/cd`）在解析时保持 idle 状态，使命令能通过 idle-only 守卫；模型流或工具调用开始时再切换为 Responding。

### 5. fix(node-repl): 终结注入的 snapshot commit
- **编号**: [#12168](https://github.com/QwenLM/qwen-code/pull/12168)
- **说明**: 修复顶层语句无分号时整个 cell 失败的内部 SyntaxError。这是 #12167 的修复 PR，让错误信息指向真实原因。

### 6. fix(installer): 为独立 Linux 归档预检 glibc
- **编号**: [#12115](https://github.com/QwenLM/qwen-code/pull/12115)
- **说明**: CentOS 7 等旧发行版安装后才发现 Node.js 22 无法启动（缺 GLIBC 符号）。该 PR 将失败提前到安装阶段并给出可行动提示。

### 7. fix(cli): 让 /context 分类与提供商总数对齐
- **编号**: [#12119](https://github.com/QwenLM/qwen-code/pull/12119)
- **说明**: 重做 `/context` 分解，使各分类加总等于提供商报告的总数；skills 行现在包含 startup prelude 中发送的 `<available_skills>` 原文。

### 8. feat: 添加混合代码模式
- **编号**: [#11854](https://github.com/QwenLM/qwen-code/pull/11854)
- **说明**: 新增 Codex 对齐的 `tools.mode`，支持 `direct`、`code_mode`、`code_mode_only`。`code_mode` 保留普通工具可调用性的同时暴露隔离的 `exec` JavaScript 工具。

### 9. feat(serve): 让用户停止工作区运行时以释放 ACP 容量
- **编号**: [#12008](https://github.com/QwenLM/qwen-code/pull/12008) | 已关闭
- **说明**: 当 ACP admission 满时，用户可检查受影响会话并选择停止某工作区运行时。停止后保留工作区注册与文件，草稿仍可取消保留。该 PR 已关闭，可能已合并或替代。

### 10. ci(review): 跳过 diff 未改变的重复审查
- **编号**: [#11857](https://github.com/QwenLM/qwen-code/pull/11857)
- **说明**: "Update branch"（合并 main）导致的 push 若与已审查 head 的 diff 逐字节相同，则自动跳过 review 轮次。减少 CI 空转。关联 issue #12193 指出其 skip anchor 未按 PR/base ref 做作用域隔离。

---

## 功能需求趋势

从近 24 小时 Issue 中可提炼 5 大需求方向：

1. **权限系统精细化**：多位用户（如 #12223、#12226）要求权限规则按文件系统作用域/项目级别覆盖用户级规则，而非简单 `deny > ask > allow`。企业场景下需要"中央管理每仓库规则"的能力。
2. **会话恢复与锁机制的工程化治理**：一组关联 Issue（#12212、#12213、#12214）关注 session-writer 锁在非优雅关闭后的恢复问题，要求启动时只读盘点锁目录、区分错误类型、补充文档。说明生产环境中异常退出是常态，需要在系统层面有预案。
3. **上下文透明性**：社区持续要求"每个 token 花在哪里"可见（#12028、#12119），不仅是对话 token，还包括系统提示、工具 schema、QWEN.md 等非对话上下文。
4. **LSP 稳定性优先**：#12206（非 ASCII 丢弃）、#12216（重复 LSP 服务）、#12220（错误吞没为空结果）三个 LSP 相关 bug 集中在同一时段出现，说明 LSP 集成质量是当前社区使用痛感最强烈的模块。
5. **扩展部署管理**：#12147 提出 `--extension-dir` 让部署方直接管理扩展目录，反映出团队级/企业级用户希望绕开个人设置目录统一管控扩展分发。

---

## 开发者关注点

- **打包与分发可靠性**：PTY prebuild 未打包导致功能完全不可用（#11872）、Linux 旧发行版安装后才发现启动失败（#12115）——用户对"安装即用"的期望仍然未被完全满足。
- **升级回归敏感**：`/cd` 在 v0.24.0 回归（#12224）说明 CLI 的命令调度逻辑缺少稳定的回归测试，开发者对这类高频命令非常敏感。
- **多语言支持被无视**：会话摘要硬编码英文（#11847）与 LSP 非 ASCII 响应丢弃（#12206）都表明产品在非英文场景（尤其是 CJK）仍有系统性欠账。
- **"静默失败"不可接受**：多个 Issue 的共同模式是失败被吞成"空结果"或"通用错误"（LSP #12220、session-writer #12212、node-repl #12167）。开发者明确希望看到可诊断的具体错误信息，而非一个看似正常但实际什么都没发生的结果。
- **CI 稳定性**：主分支 CI 失败（#12195）及多个

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*