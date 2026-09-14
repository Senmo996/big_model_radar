# AI CLI 工具社区动态日报 2026-09-14

> 生成时间: 2026-09-14 02:13 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-14）

## 1. 生态全景

当前 AI CLI 工具已从“单轮问答/代码生成”快速演进为“多智能体、后台任务、浏览器控制、MCP 生态”的综合开发执行平台。头部工具社区活跃度高，但稳定性问题集中爆发：**Windows 平台缺陷、安全过滤器误报、子代理可靠性、进程/上下文管理**成为跨工具共性痛点。功能迭代上，Qwen Code、Gemini CLI 保持 nightly 高频发布，OpenCode 与 OpenAI Codex 处于快速重构期，而 Copilot CLI 与 Kimi Code CLI 相对平静。整体而言，社区对“能用”的关注已超过“有功能”，对稳定性、可观测性与安全可配置性的要求正在成为下一个竞争焦点。

## 2. 各工具活跃度对比

> 注：Issue/PR 数为各仓库日报所列出的热点/代表性条目数，并非全量统计。

| 工具 | 版本发布 | 热点 Issues | PR 数 | 突出信号 |
|---|---|---|---|---|
| Claude Code | 无 | 10（另有 20+ cyber 误报） | 5 | 安全过滤器误报成最大痛点；Windows 多问题并发 |
| OpenAI Codex | 无 | 10 | 13（全部机器人提交并合并） | 官方集中治理 Windows sandbox；进程泄漏问题久拖未决 |
| Gemini CLI | 1 个 nightly | 10 | 10 | 子代理终止原因误报；A2A 安全后门修复 |
| GitHub Copilot CLI | 无 | 4 | 0 | v1.0.83 集中出现缓存失效、MCP 静默失败、Linux 语音崩溃 |
| Kimi Code CLI | 无 | 0 | 1 | 活跃度低，仅文档澄清 OpenAI-compatible 配置 |
| OpenCode | 无 | 10 | 10 | v2 UI 迁移回归集中；vim 键位需求 187👍 居首 |
| Qwen Code | 2 个（nightly + CUA driver） | 10 | 10 | TUI React #185 崩溃高频；Bash 允许规则绕过属高危漏洞 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **Windows 平台稳定性** | Claude Code、OpenCode、Qwen Code、Codex、Gemini CLI | Plan9 挂载失败、sandbox 进程泄漏、numpad 失效、Git worktree 异常、内存高占用、CRLF diff 误判 |
| **子代理/后台任务可靠性** | Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code、OpenCode | 子代理误报成功、后台任务黑盒、孤儿进程不回收、长工具链导致缓存失效、TUI 被后台任务打崩 |
| **安全边界与权限控制** | Claude Code、Qwen Code、Gemini CLI | 安全过滤器误杀合法开发；Bash allow rule 可被绕过；A2A JSON-RPC 中间件顺序漏洞 |
| **配置/MCP 加载可靠性** | Copilot CLI、Gemini CLI、Kimi Code CLI、Qwen Code | `.mcp.json` 静默不加载；Dev Container 配置失效；OpenAI-compatible 配置歧义；ACP 设置按目标目录解析 |
| **上下文与会话状态管理** | Claude Code、Codex、OpenCode、Qwen Code | 模型幻觉虚假对话轮次；compaction 丢目标；升级后历史会话丢失；崩溃后任务无法续接 |
| **TUI/IDE 交互体验** | OpenCode、Claude Code、Codex、Qwen Code | vim 键位、面板不抢焦点、关闭星空特效、React #185 崩溃、终端渲染回归 |

## 4. 差异化定位分析

- **Claude Code**：社区体量最大、需求声量最高；功能覆盖广，但安全过滤器与 Windows 稳定性成为短板。用户画像偏向专业开发者与嵌入式/固件开发者，对模型行为可靠性要求极高。
- **OpenAI Codex**：重点押注 Windows sandbox 治理与浏览器 Computer Use；PR 高度自动化，官方掌控力强。更适合深度使用 OpenAI 模型、依赖桌面端与浏览器自动化的用户。
- **Gemini CLI**：保持 nightly 频繁发版，技术路线强调子代理、A2A 协议、AST 感知代码工具和隐私安全。适合 Google Gemini 生态用户，但子代理终止原因误报影响自动化可信度。
- **GitHub Copilot CLI**：活动度低，更多表现为“稳定维护”模式；问题集中于 v1.0.83 回归与子代理成本控制。与 GitHub 生态集成深入，适合企业内已有 Copilot 订阅的团队。
- **Kimi Code CLI**：当前处于低活跃期，唯一动态是 OpenAI-compatible 配置文档澄清。定位更像“轻量接入层”，适合以自定义网关/多模型供应商为主的用户，但社区验证样本不足。
- **OpenCode**：典型开源社区驱动，功能呼声集中在 vim 键位、多模型路由、MCP 灵活配置；v2 UI 迁移造成大量回归。适合追求可定制、开源透明、多模型自由切换的开发者。
- **Qwen Code**：迭代速度最快，技术路线突出 daemon/后台任务架构、内核级沙箱、Web Shell 和 CUA Driver。安全与稳定性问题同步高发，适合愿意跟进 nightly、使用 Qwen 模型及国产化环境用户。

## 5. 社区热度与成熟度

| 工具 | 活跃度 | 成熟度判断 |
|---|---|---|
| Claude Code | 高：721👍 需求、20+ 同类误报 issue | 功能成熟但稳定性承压；社区期望高，问题解决速度跟不上声量 |
| OpenAI Codex | 高：13 个 bot PR 集中合并 | Windows sandbox 仍是短板；浏览器控制尚处“阵痛期” |
| Gemini CLI | 中高：nightly 发版 + 10 PR | 快速迭代但 P1 bug 仍在；安全与子代理可靠性需加强 |
| GitHub Copilot CLI | 低：0 PR、4 Issue | 相对成熟稳定；出现 v1.0.83 回归，需要快速止血 |
| Kimi Code CLI | 极低：仅 1 文档 PR | 早期/低维护状态，社区认知度不足 |
| OpenCode | 高：10 PR、多个高赞

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截至 2026-09-14）

## 1. 热门 Skills 排行

以下 PR 按仓库内评论数热度排序选出，均处于 **Open** 状态，反映社区当前讨论焦点。

- **#1298 — skill-creator: 修复 run_eval.py 总报 0% recall 的问题**  
  作者 @MartinCajiao | 更新 2026-09-13  
  **功能/改动**：修复 `run_eval.py` 及其下游 `run_loop.py`、`improve_description.py` 在评估技能时总是报告 `recall=0%` 的严重问题，并顺带修复 Windows 流读取、触发检测及并行 worker。  
  **讨论热点**：该问题被 #556 追踪，已有 10+ 独立复现，说明技能描述优化循环长期在“噪声”上运行，社区对官方评估工具链的可靠性质疑强烈。  
  🔗 https://github.com/anthropics/skills/pull/1298

- **#1742 — mcp-builder: 支持 mcp>=2 的 streamable_http_client 导入与自定义头**  
  作者 @Kuldeeep18 | 更新 2026-09-13  
  **功能/改动**：适配 `mcp>=2.0.0` 中 `streamablehttp_client` 重命名为 `streamable_http_client`，并调整自定义 HTTP headers 的配置方式，修复连接脚本与新版库的兼容性。  
  **讨论热点**：直接回应 #1668，是 MCP 生态版本升级带来的连锁适配问题，社区关注依赖演进时的平滑迁移。  
  🔗 https://github.com/an

---

# Claude Code 社区动态日报 — 2026-09-14

## 今日速览

昨日无新版本发布，社区讨论焦点集中在两件事：一是 **Windows 平台稳定性问题**持续发酵（Plan9 挂载失败、Desktop 更新反复出错、Bash 工具中断）；二是 **Opus 4.8 安全过滤器大规模误报**，大量嵌入式/固件开发者的合法会话被中止，已成为当前最突出的社区痛点。此外，移动端多账户切换需求（721👍）呼声极高。

---

## 社区热点 Issues

### 1. 移动端多账户切换（最热需求）
**#36151** | 评论 178 | 👍 721
[Claude Mobile 应用内不支持多账户切换](https://github.com/anthropics/claude-code/issues/36151)
> 要求在不共享邮箱的前提下支持多账户切换，创建于 3 月，持续获得高热度，是当前社区呼声最高的功能请求。

### 2. Windows Cowork Plan9 挂载全面失败
**#92984** | 评论 101 | 👍 55
[Windows 更新 KB5124008 导致所有 Plan9 共享挂载失败](https://github.com/anthropics/claude-code/issues/92984)
> 安装 KB5124008 后 Plan9 挂载报 "invalid argument"，卸载该更新可恢复。影响所有 Cowork 远程共享功能，101 条评论说明受影响用户面很广。

### 3. 模型幻觉虚假对话轮次（Opus 4.8 无法使用）
**#70315** | 评论 17
[助手幻觉生成虚假 user/system turns（stop_reason=null）](https://github.com/anthropics/claude-code/issues/70315)
> 重新上报此前被机器人误关的问题。用户明确表示 Opus 4.8 的该缺陷严重到无法正常使用，已持续近三个月。

### 4. VSCode 扩展强制抢焦点
**#32726** | 评论 16 | 👍 55
[增加选项防止面板自动抢占编辑器焦点](https://github.com/anthropics/claude-code/issues/32726)
> 面板在输出时自动展开并抢走光标焦点，打断其他编辑器标签页的工作流。长期存在的 UX 问题，支持者众多。

### 5. 安全过滤器误报：微控制器调试被中止（最新代表）
**#94166** | 评论 1
[缓冲区溢出调试被安全过滤器拦截，会话中止](https://github.com/anthropics/claude-code/issues/94166)
> 属于今日集中爆发的 `[Bug][cyber]` 系列之一：正常的嵌入式固件开发、崩溃调试被误判为网络安全威胁，Opus 4.8 直接终止会话。同系列已提交 20+ 个 issue。

### 6. 孤儿 Bash 子进程无人回收
**#93996** | 评论 1
[tsc/vitest 等长任务在会话终止后仍运行数小时](https://github.com/anthropics/claude-code/issues/93996)
> 会话停止/崩溃时，运行中的 Bash 工具子进程不会被杀掉，被 reparent 到 PID 1 后继续无监督运行，浪费计算资源。

### 7. Windows Desktop 更新反复失败（一个月未解决）
**#93783** | 评论 1
[1.49585.0 注册后无法启动（0x80070020，events 215/208）](https://github.com/anthropics/claude-code/issues/93783)
> 用户反映约一个月内多次更新均失败，每次需要重启 Windows，自动更新机制严重干扰工作。

### 8. Windows Bash/PowerShell 工具中途失效
**#92420** | 评论 1
[ssh、ls、which 等基础命令莫名缺失](https://github.com/anthropics/claude-code/issues/92420)
> 会话中途 Bash 工具执行环境损坏，基础二进制不可用。Windows 沙箱/工具链的稳定性问题。

### 9. Cmd+Enter 行为回归（macOS）
**#93402** | 评论 2
[Cmd+Enter 不再排队消息，而是中断当前运行](https://github.com/anthropics/claude-code/issues/93402)
> 回归 bug：快捷键行为从"排队下一条消息"变为"打断当前回合"，影响交互体验。

### 10. 安全过滤器误报：合规术语更新被拦截
**#94136** | 评论 1
[更新测试文件/模拟数据为合规术语时被阻断](https://github.com/anthropics/claude-code/issues/94136)
> `cyber` 系列中唯一标记为 `offensive-pentest` 域的误报，说明过滤器不仅影响嵌入式开发，常规代码维护也可能被误伤。

---

## 重要 PR 进展

> 昨日 PR 活跃度较低，共 5 条更新，全部列出如下。

### 1. mods 测试架构重构
**#93951** | CLOSED
[diff、sec-default 和 telemetry 的测试迁移到 mods 目录旁](https://github.com/anthropics/claude-code/pull/93951)
> 将三个 mod 的行为测试移入 `mods/<mod>/tests/`，统一由 `claude plugin test` 执行，优化测试组织方式。

### 2. 安全规则 glob 匹配修复（安全相关）
**#87079** | OPEN
[修复 `**` glob 模式无法匹配零深度路径](https://github.com/anthropics/claude-code/pull/87079)
> 底层 `fnmatch` 的 `*` 可跨越 `/`，导致 `**/*.ts` 要求字面 `/`，顶层文件被静默排除在安全规则之外——安全规则失效属于高危缺陷。

### 3. hookify 示例文件名修正
**#79148** | OPEN
[为示例规则文件名添加强制的 hookify. 前缀](https://github.com/anthropics/claude-code/pull/79148)
> 文档声明 `hookify.` 前缀是强制的，但 4 个官方示例均缺失此前缀，导致用户按文档复制后规则被静默忽略。

### 4. validate-agent.sh 修复
**#89404** | OPEN
[修复 set -e 导致的首个警告即中止问题](https://github.com/anthropics/claude-code/pull/89404)
> `((count++))` 在计数为 0 时返回退出码 1，触发 `set -e` 中止脚本。修复插件开发工具误报合法 agent 文件的问题。

### 5. CLI 构建基础设施补充
**#41621** | CLOSED
[添加缺失的 CLI 构建基础配置（esbuild 等）](https://github.com/anthropics/claude-code/pull/41621)
> 补充了从 TypeScript 源码打包 CLI 单文件的完整构建文档和 esbuild 配置。

---

## 功能需求趋势

从全部 Issues 中提炼的社区关注方向：

| 方向 | 代表 Issue | 热度 |
|------|-----------|------|
| **移动端能力扩展** | #36151 多账户切换 | 721👍，极高 |
| **IDE 集成体验** | #32726 面板不抢焦点 | 55👍，长期需求 |
| **安全过滤器准确性** | #94166 等 20+ cyber 误报 | 今日集中爆发 |
| **Windows 平台稳定性** | #92984 / #93783 / #92420 | 多 issue 并发 |
| **进程生命周期管理** | #93996 孤儿子进程 | 新出现 |
| **模型行为可靠性** | #70315 幻觉虚假轮次 | 影响 Opus 4.8 使用 |
| **快捷键/交互回归** | #93402 Cmd+Enter | 新回归 |

---

## 开发者关注点

- **安全过滤器误报已成最严重痛点**：今日一天内同一用户提交了 20+ 个 `[Bug][cyber]` issue，覆盖嵌入式固件开发、Wi-Fi 审计工具比较、3D 打印软件配置甚至 UI 布局调整等完全合法的场景。Opus 4.8 的过滤器过于激进，直接中止会话，严重阻碍正常开发工作，亟需 Anthropic 提供关闭/降级方案或紧急修复。
- **Windows 平台质量堪忧**：Plan9 挂载被系统更新破坏、Desktop 更新一个月无法解决、Bash 工具中途丢二进制——三个独立问题并发，Windows 用户的使用体验明显落后于 macOS/Linux。
- **进程生命周期管理缺失**：会话终止后子进程不被回收，不仅浪费资源，在 CI/长时间任务场景下可能产生副作用。
- **安全规则静默失效**：glob 匹配 bug 导致安全规则静默不生效，这类"无声失败"比显式报错更危险，说明安全相关代码需要更完善的测试覆盖。

---
*数据来源：github.com/anthropics/claude-code · 统计时间：2026-09-14*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-14

## 1. 今日速览

今日 Codex 仓库无新版本发布，社区焦点集中在 Windows 桌面端的 sandbox、浏览器集成和会话管理三大类问题上。#44781（排队消息编辑报错）与 #44561（关闭 Astra 星空特效）获得最多社区互动；13 个 PR 全部由机器人提交并已合并，其中大部分围绕 Windows sandbox 重构与稳健性修复，显示官方正在集中治理 Windows 平台的已知顽疾。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 社区热点 Issues

### #44781 [Codex Desktop] 编辑并重发排队消息报错 "queued follow-up no longer exists"
- **链接**: https://github.com/openai/codex/issues/44781
- **评论 23 | 👍 27 | 状态: OPEN**
- **重要性**: 27 个赞居今日第二，影响桌面端核心交互流程。用户编辑已排队消息后，App-server 无法找到对应 follow-up，直接中断工作流。涉及 app-server 状态同步，属于高频操作路径上的稳定性回归。

### #44561 [增强] 默认关闭 Astra 星空特效（whimsy effect）
- **链接**: https://github.com/openai/codex/issues/44561
- **评论 16 | 👍 31 | 状态: OPEN**
- **重要性**: 今日点赞最高议题（31👍）。用户明确表示「看起来像屏幕花屏」，希望 `[tui] whimsy = false` 成为默认配置而非手动开关。虽是体验细节，但反映社区对 TUI 默认视觉风格的强烈不满。

### #43410 [Windows][浏览器] API-key 认证下浏览器控制不可用
- **链接**: https://github.com/openai/codex/issues/43410
- **评论 25 | 👍 15 | 状态: OPEN**
- **重要性**: 今日评论数最多（25）。Edge 插件和 native host 均连接成功，但首次浏览器操作即报 `unsupported Codex auth method: apikey`。浏览器控制与自定义 API-key 认证的组合在 Windows 上完全不可用，影响自建模型/代理用户群。

### #41520 无法使用 gpt-reserve
- **链接**: https://github.com/openai/codex/issues/41520
- **评论 13 | 👍 3 | 状态: OPEN**
- **重要性**: Plus 用户在 Windows CLI 中无法使用 gpt-reserve 模型（gpt-5.6 luna）。与 #41553 中的速率限制显示问题同属订阅/配额体系，影响付费用户对模型的正常访问。

### #44458 macOS: CLI 0.154.0 experimental capability 破坏内置 MCP 启动
- **链接**: https://github.com/openai/codex/issues/44458
- **评论 10 | 👍 3 | 状态: OPEN**
- **重要性**: Pro 20x 用户升级到 0.154.0 后，Messages 和 Computer History 两个内置 MCP server 启动即失败，疑似 experimental capability 开关引入的回归。影响 macOS 上的 MCP 生态集成。

### #28361 Windows: mcp-server/app-server 及子进程永不回收
- **链接**: https://github.com/openai/codex/issues/28361
- **评论 10 | 👍 3 | 状态: OPEN**
- **重要性**: 老问题（6 月提出）至今未修复，今天仍有更新。每个请求都会 spawn 新的 app-server 和 MCP server，且全部不回收，最终累积数百个进程。这与 #29079 同为 Windows 平台最严重的性能顽疾。

### #29079 Codex Desktop 在 Windows 上遗留 Node/MCP 辅助进程直至内存耗尽
- **链接**: https://github.com/openai/codex/issues/29079
- **评论 10 | 👍 4 | 状态: OPEN**
- **重要性**: 与 #28361 同源，但发生在桌面端。重度 subagent 或 MCP/Node REPL 使用后，系统内存被残留进程耗尽，PC 卡死。用户已标记为需要优先解决。

### #32922 压缩（compaction）期间目标上下文被丢弃，任务延续性断裂
- **链接**: https://github.com/openai/codex/issues/32922
- **评论 6 | 👍 1 | 状态: OPEN**
- **重要性**: 长任务在上下文压缩后丢失原始目标，后续轮次失去目标导向。虽然是老 issue（7 月创建），但今天仍有更新，说明问题仍在验证中。直接关系到 Codex 处理长任务的核心能力。

### #25466 [增强] 会话内调度工具（Cron + ScheduleWakeup）与 /loop 命令
- **链接**: https://github.com/openai/codex/issues/25466
- **评论 3 | 👍 14 | 状态: OPEN**
- **重要性**: 功能请求，14 个赞说明社区对「让 agent 在未来时间点主动继续工作」有明确需求。提议包括 CronCreate/CronList/CronDelete 和 /loop，属于自动化方向的有力呼声。

### #45119 macOS 14.2: sandbox 启动失败（未绑定变量 TIOCSTI）
- **链接**: https://github.com/openai/codex/issues/45119
- **评论 8 | 👍 0 | 状态: OPEN**
- **重要性**: macOS 14.2 上 sandbox 启动直接崩溃，用户检查 upstream main 后确认问题仍然存在。与 #45324（macOS 13.5.1 相同报错）形成系列问题，影响旧版 macOS 用户。

## 4. 重要 PR 进展

*今日所有 PR 均来自 @copyberry[bot]，已全部合并（CLOSED），无社区人工提交。*

### #45312 提取 Windows sandbox 配置准备为独立辅助函数
- **链接**: https://github.com/openai/codex/pull/45312
- **摘要**: 对外暴露 `prepare_windows_sandbox_config` 和 `PreparedWindowsSandboxConfig`，在配置加载阶段统一使用，保留需求强制检查及配置模式与生效 sandbox 之间的分离。

### #45276 在 agents overview 中增加 worktree 会话创建
- **链接**: https://github.com/openai/codex/pull/45276
- **摘要**: 新增可配置的 `new_worktree` 动作，绑定 `w` 键。从缓存的默认分支（优先 remote HEAD）创建 worktree，支持本地会话。

### #45271 TUI 视口增长时保留终端滚动区
- **链接**: https://github.com/openai/codex/pull/45271
- **摘要**: 修复 QTermWidget/xterm.js 在视口增长时通过 `CSI S` 滚动导致历史行丢失的问题，改在滚动区底部输出换行以保留历史内容。

### #45262 粘贴内容路由到活动历史搜索查询
- **链接**: https://github.com/openai/codex/pull/45262
- **摘要**: 修复 Ctrl+R 历史搜索中粘贴操作被当作普通输入处理的问题，现在追加净化后的文本到当前查询并重新匹配。

### #45255 从 command center 直接打开新会话
- **链接**: https://github.com/openai/codex/pull/45255
- **摘要**: 用会话列表替换内联任务输入框，按 `n` 可在所选 checkout 中打开空白会话而不发送初始 turn。支持单字母快捷键和 Enter 打开。

### #45248 使用捕获的步骤设置生成请求元数据和工具 hooks
- **链接**: https://github.com/openai/codex/pull/45248
- **摘要**: 修复模型/推理力度在 turn 中途更新后，请求元数据仍报初始设置的问题。元数据现在描述实际发出请求或工具调用的步骤。

### #45224 在 sandbox setup 之前注册 Windows 桌面卸载所有权
- **链接**: https://github.com/openai/codex/pull/45224
- **摘要**: 解决用户未登录或未配置 sandbox 时卸载清理无安装所有者的问题，将注册提前到 sandbox provisioning 之前。

### #45185 将直接工具调用元数据绑定到调用输出
- **链接**: https://github.com/openai/codex/pull/45185
- **摘要**: 确保直接工具调用记录与产生输出的调用保持关联，包括复用调用 ID 的场景，完整性描述独立于工具成功与否。

### #45182 复制 SID 前校验 Windows sandbox token 组
- **链接**: https://github.com/openai/codex/pull/45182
- **摘要**: Logon SID 查找之前未检查指针是否超出返回缓冲区，新增带大小限制的共享 `token_groups` 辅助函数，防止越界访问。

### #45178 拆分 Windows sandbox 清理为「准备」与「完成」两个阶段
- **链接**: https://github.com/openai/codex/pull/45178
- **摘要**: 新增 `prepare_packaged_windows_sandbox_cleanup`，先禁用沙箱账户并停止相关进程，再通过 guard 的 `finish` 方法保留设置锁并完成清理，避免竞态。

## 5. 功能需求趋势

从今日 Issues 中可以提炼出以下社区关注方向：

- **Windows 平台治理是绝对主线**：今日 50 条 issues 中约 1/3 标注 `windows-os`，13 个 PR 中 8 个直接针对 Windows sandbox 重构。问题集中在进程泄漏、sandbox 初始化失败、ACL 状态文件损坏等系统级稳定性——官方资源聚焦明显。
- **浏览器集成（Computer Use）处于阵痛期**：Windows 上 Chrome/Edge 浏览器控制与 API-key 认证不兼容（#43410、#45317），以及 Discovery 成功但 listTabs 超时（#45249）等多重问题并发，说明该功能尚未成熟。
- **会话/历史管理修复集中在边缘场景**：排队消息编辑报错（#44781）、大型任务渲染崩溃（#45323）、历史按日界线回归（#43600）——核心对话流程大体稳定，但状态同步边界条件仍脆弱。
- **CLI/TUI 可配置性与体验**：关闭特效（#44561，31👍）和会话内调度（#25466，14👍）表明用户希望 Codex 更「工具化」——默认朴素、可编程、可自动化。
- **macOS 老版本兼容性出现缺口**：#45119/#45324 显示 sandbox 规则（TIOCSTI）在旧 macOS（13.x/14.x）上解析失败，官方可能未覆盖老系统测试。

## 6. 开发者关注点

- **进程与内存泄漏是最大痛点**：Windows 上 MCP/server 进程永不回收、Node 助手进程累积至系统卡顿（#28361、#29079），问题从 6 月持续至今仍未解决，开发者已在 issue 中表达沮丧。
- **认证方式与功能割裂**：API-key 认证在浏览器控制中不可用（#43410、#45317），这是自建模型/代理场景的硬阻塞，亟需统一认证路径。
- **上下文压缩破坏任务连续性**：compaction 丢失目标上下文（#32922）直接损害长任务可靠性，对于用 Codex 跑长时间自动化的用户是根本性缺陷。
- **速率限制信息不透明**：Plus 用户看不到 5 小时限制、gpt-reserve 不可用（#41520、#41553），配额相关的反馈亟待改进。
- **默认体验设计受质疑**：Astra 星空特效默认开启引发「以为是屏幕故障」的反馈（#44561），说明非必要的视觉元素在开发工具中应保持克制。
- **沙箱失败类问题类型化**：从 today 数据看，

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-14

## 1. 今日速览

今日发布了 nightly 版本 v0.61.0-nightly.20260914，社区讨论聚焦于**子代理/Agent 可靠性**（如 #22323 最大轮数误报、#21968 不主动使用技能）与**安全/隐私**（如 #29073 A2A 中间件顺序漏洞、#26525 自动内存脱敏）。此外，AST 感知代码工具（#22745）与 VS Code Dev Container 配置加载（#28399）等长期问题仍在持续活跃。

## 2. 版本发布

**v0.61.0-nightly.20260914.g9c1b0a610** 已发布，为常规夜间构建版本，具体更新内容请参见完整变更日志。

- 发布链接: https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260914.g9c1b0a610
- 变更日志: https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610

## 3. 社区热点 Issues

以下选取 10 个最值得关注的 Issue（按评论数/优先级/话题性综合排序）：

**#22323 [P1/Bug] 子代理在 MAX_TURNS 后被错误报告为 GOAL 成功** ⭐ 13 评论
`codebase_investigator` 子代理在因达到最大轮数而中断时，仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`，导致主代理误以为分析成功完成。社区讨论度高，属于 Agent 可靠性核心问题。
🔗 https://github.com/google-gemini/gemini-cli/issues/22323

**#25166 [P1/Bug] Shell 命令执行完成后卡在 "Waiting input"** 👍 3
Gemini 执行极简单命令后间歇性挂起，显示 "Waiting input" 但命令早已结束，严重影响自动化流程。
🔗 https://github.com/google-gemini/gemini-cli/issues/25166

**#22745 [P2/Feature EPIC] 评估 AST 感知的文件读取/搜索/映射价值** ⭐ 7 评论
EPIC 跟踪 AST 感知工具是否值得引入，以更精准读取方法边界、减少 token 噪声、优化代码库导航，反映了社区对深度代码理解能力的期望。
🔗 https://github.com/google-gemini/gemini-cli/issues/22745

**#28399 [P2/Bug] VS Code Dev Container 中无法加载 .gemini/settings.json** ⭐ 5 评论
工作区级配置文件在 Dev Container 环境下不被加载，导致开发容器内无法应用个性化设置，IDE 集成痛点突出。
🔗 https://github.com/google-gemini/gemini-cli/issues/28399

**#26525 [P2/Bug/Security] 自动内存的确定性脱敏与日志缩减**
自动内存功能在将本地 transcript 发送给提取模型之前，仅在提示词中要求模型脱敏，过程不可控，且服务会记录已有的 skill 日志，存在敏感信息泄露风险。
🔗 https://github.com/google-gemini/gemini-cli/issues/26525

**#29073 [P2/Bug] A2A 服务器 JSON-RPC 解析不对称，形成未认证后门**
`express.json()` 中间件挂在 A2A SDK 路由之后，导致 SDK 处理的端点无法解析 JSON body，而自定义路由却正常，形成歧义的后门风险。
🔗 https://github.com/google-gemini/gemini-cli/issues/29073

**#21983 [P1/Bug] 浏览器子代理在 Wayland 下失败** 👍 1
浏览器子代理在 Wayland 环境运行失败，终止原因显示为 GOAL，但真正的错误被掩盖，与 #22323 类似——终止原因误报问题影响面较大。
🔗 https://github.com/google-gemini/gemini-cli/issues/21983

**#21968 [P2/Bug] Gemini 不主动使用自定义 skills 和子代理**
用户反馈即使拥有 gradle/git 等技能和子代理，Gemini 也几乎不会自主调用，除非显式指示，浪费了自订工具的价值。
🔗 https://github.com/google-gemini/gemini-cli/issues/21968

**#24246 [P2/Bug] 工具超过 128 个时出现 400 错误**
当启用工具过多时，Gemini CLI 出现 400 错误。社区期望 Agent 更智能地限制会话内的工具范围，而非一次性全部订阅。
🔗 https://github.com/google-gemini/gemini-cli/issues/24246

**#22672 [P2/Bug] Agent 应停止或劝阻破坏性操作** 👍 1
在复杂 git 操作中，模型可能使用 `git reset` 或 `--force` 等危险命令；面对数据库等关键资源时，模型缺乏风险意识。
🔗 https://github.com/google-gemini/gemini-cli/issues/22672

## 4. 重要 PR 进展

**#29321 [chore] 版本号自动提升至 0.61.0-nightly.20260914**
机器人自动提交的 nightly 版本提升。
🔗 https://github.com/google-gemini/gemini-cli/pull/29321

**#29134 [fix] 保护当前会话不被删除**
修复 `--delete-session` 可能误删当前活动会话的问题，通过短 ID 后缀匹配避免误判，并增加了回归测试。
🔗 https://github.com/google-gemini/gemini-cli/pull/29134

**#29132 [fix] 规范化 diff 上下文中的行尾（CRLF/CR）**
修复 CRLF 文件在 `getDiffContextSnippet` 中被视为全文件变更的问题，防止在 Windows 环境中把整个文件送回模型上下文。
🔗 https://github.com/google-gemini/gemini-cli/pull/29132

**#29131 [fix] 修复 CRLF 导致全文件 diff 的同类问题**
与 #29132 高度重叠，独立修复了 `getDiffContextSnippet` 在 LF vs CRLF 不匹配时输出全文件 diff 的 bug。
🔗 https://github.com/google-gemini/gemini-cli/pull/29131

**#29320 [fix] 将 express.json() 注册移至 A2A 路由之前**
直接修复 #29315（对应 Issue #29073），确保 JSON-RPC 处理器能解析请求体，并新增回归测试。
🔗 https://github.com/google-gemini/gemini-cli/pull/29320

**#29319 [fix] 保护 SDK 中 tool-call 参数的 JSON.parse**
当 `JSON.parse` 收到畸形参数时不再直接中断流，而是捕获错误并回传 `_parseError` 参数继续处理。
🔗 https://github.com/google-gemini/gemini-cli/pull/29319

**#29304 [fix] 截断时避免拆散代理对（Surrogate Pair）**
修复 `sanitizeForDisplay` 在截断时可能切断 UTF-16 代理对，导致 emoji 等字符渲染异常的问题。
🔗 https://github.com/google-gemini/gemini-cli/pull/29304

**#29229 [fix] 设置编辑器拒绝非有限数字**
`parseEditedValue` 此前仅拒绝 `NaN`，`1e309` 这类溢出输入会变成 `Infinity` 并最终被 JSON 序列化为 `null`，悄悄破坏配置。现在通过 `Number.isFinite` 拦截。
🔗 https://github.com/google-gemini/gemini-cli/pull/29229

**#27862 [fix] 在 UI 中保留子代理执行中的工具调用**
修复子代理工具调用在 UI 中执行时消失的问题（对应 #22589），保证状态展示的连贯性。
🔗 https://github.com/google-gemini/gemini-cli/pull/27862

**#27863 [fix] 优先展示结构化的显示标题**
工具调用中优先使用 `_toolDisplayName`，再回退到 `_toolName`，让工具面板上的展示更加可读（对应 #23018）。
🔗 https://github.com/google-gemini/gemini-cli/pull/27863

## 5. 功能需求趋势

从今日活跃的 Issues 中可以提炼以下社区重点关注方向：

- **AST 感知代码能力**（#22745/#22746）：若落地，将显著提升代码读取精度、减少 token 消耗、优化代码库导航，是深度编码场景的重要演进方向。
- **子代理自主性与可靠性**（#21968/#22323/#21983）：用户期望 Gemini 主动调用已有技能/子代理，而不是“被动听指挥”；同时，子代理的终止原因必须真实可信，目前的误报会破坏主代理决策链路。
- **浏览器代理韧性**（#22232/#22267/#28390/#21983）：涵盖会话接管、锁恢复、配置覆盖、Wayland 兼容性和 web_search/web_fetch 工具稳定性，侧面反映浏览器自动化在真实环境中的高失败率。
- **安全与隐私**（#26525/#22672/#29073）：包括自动内存的前置确定性脱敏、模型采取非破坏性命令、A2A 服务器中间件顺序导致的后门风险——安全性已上升为社区重要关注点。
- **内存系统完善**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报 — 2026-09-14

### 1. 今日速览

过去 24 小时 Copilot CLI 未发布新版本，亦无新 PR 合并，但连续爆出多个 v1.0.83 的稳定性问题：工作区 MCP 配置被静默忽略、Linux 语音模式崩溃、以及子代理长工具链导致的缓存失效与 token 成本激增。与此同时，社区对后台子代理可观测性的功能需求持续升温。

### 2. 版本发布

过去 24 小时无新版本 Release。

### 3. 社区热点 Issues

当前共有 4 个活跃 Issue（均在 24 小时内更新），全部列出如下：

- [#4829 Bug: Subagents 长工具调用序列导致 prompt 缓存失败与 token 消耗复合增长](https://github.com/github/copilot-cli/issues/4829)  
  提交者 @gcapnias | 更新于 09-13 | 评论 1 | 👍 0  
  值得关注：**成本与性能**。在 v1.0.83 中，自定义 `task` 子代理单轮执行数百次工具调用，导致上下文缓存完全失效，token 消耗呈复合增长。对重度使用 agent 编排的团队影响显著，可能是 1.0.83 最常见的隐形费用陷阱。

- [#2254 Feature: 为后台子代理添加实时进度流式显示](https://github.com/github/copilot-cli/issues/2254)  
  提交者 @Ghislain89 | 更新于 09-13 | 评论 1 | 👍 0  
  值得关注：**可观测性**。多阶段编排（plan → implement → deliver → review）下，`/tasks` 仅显示工具调用计数，无法查看实时输出。该需求已存在半年，是 agent 工作流落地的重要瓶颈。

- [#4833 Bug: 语音模式在 Linux 下因 ONNX Runtime 断言崩溃 (SIGABRT)](https://github.com/github/copilot-cli/issues/4833)  
  提交者 @r-o-x | 更新于 09-13 | 评论 0 | 👍 0  
  值得关注：**平台稳定性**。本地 Nemotron ASR 模型在 Manjaro Linux x64 上处理音频时触发断言，CLI 直接 abort 并 core dump。语音输入是 v1.0.8x 的重点新功能，但 Linux 支持明显不成熟。

- [#4832 Bug: 工作区 .mcp.json 在 1.0.83 中从未加载，'mcp list' 无 Workspace 组](https://github.com/github/copilot-cli/issues/4832)  
  提交者 @ryan-knopp-elanco | 更新于 09-13 | 评论 0 | 👍 0  
  值得关注：**配置兼容性**。仓库根目录的 `.mcp.json` 被完全忽略，服务始终未启动，且 session 日志无任何报错。属于静默失败——MCP 服务器未运行，但 CLI 不提示，对依赖项目级 MCP 配置的团队是阻断级问题。

### 4. 重要 PR 进展

过去 24 小时无 Pull Request 活动。

### 5. 功能需求趋势

从当前活跃 Issue 中提炼出社区最关注的三个方向：

- **子代理可观测性与进度可视化**：用户希望看到后台 agent 的实时执行状态（#2254），而不仅是工具调用计数。这直接关系到多智能体编排的实际可用性。
- **MCP 工作区级配置的稳定加载**：Issue #4832 反映出用户对项目级 `.mcp.json` 模式的高度依赖——该机制必须可靠工作，否则基于 MCP 的定制工具链会整体失效。
- **边缘功能的跨平台稳定性**：语音模式在 Linux 上的崩溃（#4833）表明，本地 ASR/ONNX 路线需要更严谨的平台适配测试，而非仅保证 macOS/Windows 体验。

### 6. 开发者关注点

- **成本失控风险**：v1.0.83 中长链式子代理调用导致 prompt 缓存失效，token 消耗指数级增长（#4829）。建议在修复前避免单轮超长工具链设计，或切换至缓存友好的模型策略。
- **静默配置失败**：`.mcp.json` 未加载且无错误提示（#4832），用户无法区分“配置格式错误”与“CLI 未读取”两种情况，排查成本高。
- **后台任务黑盒**：子代理执行过程对开发者不可见（#2254），尤其耗时较长或失败的场景，缺少调试抓手。
- **Linux 用户体验缺口**：语音模式崩溃（#4833）并非偶发，而是可稳定触发的 SIGABRT，直接影响 Linux 用户的语音交互功能可用性。

---

> 数据来源: [github/copilot-cli](https://github.com/github/copilot-cli) | 生成时间: 2026-09-14

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-09-14）

> 数据源：github.com/MoonshotAI/kimi-cli  
> 数据范围：2026-09-13 至 2026-09-14

## 今日速览

过去 24 小时仓库整体活跃度较低：无新 Release、无 Issue 更新。唯一动态是 @QIU-Guanzong 提交的 PR #2641，对 OpenAI-compatible 供应商的配置方式进行了文档澄清，直接回应了社区近期在自定义模型接入上的常见困惑。建议关注该 PR 的合入与后续文档落地。

## 版本发布

过去 24 小时无新版本发布。

## 社区热点 Issues

过去 24 小时无更新 Issues，本栏目暂无数据。结合当前 PR 来看，**OpenAI-compatible 供应商配置**是社区近期最集中的讨论焦点。

## 重要 PR 进展

| PR | 标题 | 状态 | 说明 |
|---|---|---|---|
| [#2641](https://github.com/MoonshotAI/kimi-cli/pull/2641) | docs(providers): clarify OpenAI-compatible configuration | OPEN / 待合入 | 作者：@QIU-Guanzong<br>澄清自定义 OpenAI-compatible 供应商需要提供“API-root base URL”和该服务接受的模型 ID；明确非空 `OPENAI_BASE_URL` 与 `OPENAI_API_KEY` 对 `openai_legacy`、`openai_responses` 两种 provider 字段的覆盖规则；同步更新中英文文档。 |

**解读**：该 PR 虽只涉及文档，但直接解决了一个高频踩坑点——不少用户在接入第三方 OpenAI 兼容网关时，混淆 base URL 与模型映射关系，导致运行时 404/401。PR 明确了环境变量与 provider 配置的优先级关系，建议社区关注其合入动态。

## 功能需求趋势

由于过去 24 小时样本有限（0 Issues / 1 PR），仅从现有数据可提炼出以下持续需求方向：

- **OpenAI-compatible 配置标准化**：用户对 base URL、模型 ID、鉴权参数的设置方式仍有较高困惑，需要更明确、可复制的示例。
- **环境变量与配置文件的优先级治理**：社区希望得到权威说明，减少运行时行为与直觉不一致的问题。
- **多供应商切换的易用性**：`openai_legacy` 与 `openai_responses` 差异化的覆盖逻辑，反映出用户对不同 OpenAI API 兼容层的适配诉求。

## 开发者关注点

- **配置歧义**：自定义供应商时，模型 ID 的填写粒度（纯 ID 还是完整路径）不清晰。
- **环境变量覆盖规则**：`OPENAI_BASE_URL` / `OPENAI_API_KEY` 与 provider 字段混用时，究竟哪一方生效，开发者希望能通过文档快速确认。
- **错误提示体验**：配置错误导致请求失败时，报错信息缺乏对“base URL + model ID”匹配问题的直接引导（本 PR 虽未改动代码，但隐含了这一诉求）。

---

**说明**：本期数据源提供的过去 24 小时活动只有 1 条 PR，因此 Issue 与 Release 栏目无法列出 10 条推荐条目。如需更全面的趋势分析，建议使用 GitHub API 拉取仓库近 30 天 Issue/PR 全量数据进行统计。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-14）

## 今日速览

今日无新版本发布，但维护者进行了大规模的历史 Issue 清理（50+ 条关闭）；核心开发集中于 AI 层修复（SSE 超时、Claude/Vertex 请求规范化、OpenAI 图片 URL）与代码模式解释器重构（递归保护、错误定位）。社区侧，vim 键位绑定（187👍）仍是呼声最高的功能，v2 UI 迁移带来的回归问题（会话丢失、TUI 冻结、Windows 兼容性）成为反馈热点。

---

## 社区热点 Issues

### 1. Vim 键位绑定进入输入框（#1764）
🔖 **关闭** | 👍 187 | 💬 35 | 更新于今日

用户要求输入 prompt 时支持 vim 快捷键，以提升编辑效率（引用 ClaudeCode 已有功能）。该项目已持续追踪一年余，反映编辑器级输入体验是重度用户的核心诉求。
🔗 https://github.com/anomalyco/opencode/issues/1764

### 2. VS Code 集成终端内数字小键盘失效（#16100）
🔖 **关闭** | 👍 18 | 💬 33

VS Code 1.110 集成终端中，TUI 完全忽略小键盘（0-9、Enter、小数点、运算符），但外部终端正常。集成终端是多数开发者使用 TUI 的主要场景，影响面广泛。
🔗 https://github.com/anomalyco/opencode/issues/16100

### 3. 模型选择器缺少 GitHub Copilot "Auto" 选项（#25239）
🔖 **关闭** | 👍 17 | 💬 20

用户期望在模型选择器中暴露 Copilot 的自动选模能力，让 Copilot 根据上下文自行决定模型。该请求已获广泛支持，反映多模型工作流下对智能路由的需求。
🔗 https://github.com/anomalyco/opencode/issues/25239

### 4. v2 UI 下 Git worktree 在 Windows 11 不可用（#31686）
🔖 **关闭** | 👍 12 | 💬 4

新布局/设计模式下：无入口创建和管理 worktree；手动创建的 worktree 被误判为主仓库副本；分支管理异常。对依赖多工作树的开发者造成严重阻塞。
🔗 https://github.com/anomalyco/opencode/issues/31686

### 5. Windows npm 安装残留 479 字节占位 exe（#36737）
🔖 **关闭** | 👍 2 | 💬 5

`npm install -g opencode-ai@1.17.19` 在 postinstall 被拦截时留下占位文件而非真实二进制，导致安装"成功"但无法运行。影响 CI 和企业环境下的可复现安装。
🔗 https://github.com/anomalyco/opencode/issues/36737

### 6. RTL 窗口标题栏按钮碰撞（#35388）
🔖 **关闭** | 👍 4 | 💬 5

在希伯来语/阿拉伯语等 RTL 系统上，Electron 的窗口控制按钮被置于左侧，与 opencode 自己的标题栏按钮重叠。本地化场景下的 UI 可用性问题。
🔗 https://github.com/anomalyco/opencode/issues/35388

### 7. 流式生成结束后响应文本消失（#37075）
🔖 **关闭** | 💬 4

生成完成后，已流式输出的文本立即从聊天区消失，刷新后内容恢复——UI 未能保留/渲染最终消息。属于最新版的严重回归，直接影响日常使用。
🔗 https://github.com/anomalyco/opencode/issues/37075

### 8. TUI 在模型思考转储后完全冻结（#36537）
🔖 **关闭** | 👍 1 | 💬 3

中等长度会话（~10-30 条消息）中，模型输出长思考块后 TUI 无响应，ENTER/Ctrl-C/Esc 均无效，只能强杀进程。重连后卡在 compaction（压缩）阶段。
🔗 https://github.com/anomalyco/opencode/issues/36537

### 9. 升级至 v1.18.1 后历史会话全部消失（#37063）
🔖 **关闭** | 💬 6

用户升级后约 1100 条历史会话记录不可见，疑似版本升级导致。历史数据是重要资产，丢失影响信任度。
🔗 https://github.com/anomalyco/opencode/issues/37063

### 10. v2 UI 中 Agents 切换无显示、文件树无法展开（#36979）
🔖 **关闭** | 💬 6

Windows 桌面版 v1.18.1 在 v2 UI 迁移后：Ctrl+. 切换 agent 无下拉提示；中央文件资源管理器文件夹无法展开。核心功能在 v2 UI 中处于不可用状态。
🔗 https://github.com/anomalyco/opencode/issues/36979

---

## 重要 PR 进展

### 1. 拆分 Provider 与 Model 注册表（#48901）
🔖 开放

将 Catalog 拆分为 Provider 和 Model，消除全量模型目录的逐位置重复，并为后续按需加载和缓存优化做铺垫。
🔗 https://github.com/anomalyco/opencode/pull/48901

### 2. Codemode 防止无限递归：10,000 层弹出 RangeError（#48891）
🔖 关闭

由于 Effect 对解释器栈做 trampoline 化，原本无限递归会一直运行到超时。现改为计数嵌套调用，在 10000 层抛出可捕获的 `RangeError`。
🔗 https://github.com/anomalyco/opencode/pull/48891

### 3. 恢复 Windows Git 快速路径（#48879）
🔖 关闭

Windows 上将 Git 解析为绝对路径，内部 Git 插件与核心操作走原生 `.exe` 派生路径，同时保留 `windowsHide: true` 语义。
🔗 https://github.com/anomalyco/opencode/pull/48879

### 4. Glob 结果排除隐藏文件（#48894）
🔖 开放 | Closes #47421

修复 `**/*.ts` 会匹配顶层 `.hidden.ts` 的问题，使 glob 行为符合用户预期。
🔗 https://github.com/anomalyco/opencode/pull/48894

### 5. 保留 OpenAI Chat 图片 URL（#48862）
🔖 开放

修复 HTTP/HTTPS 图片 URL 被误当作 base64 字节处理的问题，同时保留 data-URL 和原始 base64 行为。
🔗 https://github.com/anomalyco/opencode/pull/48862

### 6. 序列化 undefined 历史工具输入（#48863）
🔖 开放

显式将历史工具调用中的 `undefined` 输入序列化为 `{}`，避免 OpenAI Chat 与 Responses API 在工具参数缺失时出错。
🔗 https://github.com/anomalyco/opencode/pull/48863

### 7. Vertex AI service tier 映射为请求头（#48886）
🔖 开放

将 Gemini 的 `serviceTier` 选项映射为 Vertex AI 的 `X-Vertex-AI-LLM-Shared-Request-Type` 请求头，并移除 Vertex 请求中的无效 body 字段。
🔗 https://github.com/anomalyco/opencode/pull/48886

### 8. Mermaid 并行转换等端点无限循环修复（#48898）
🔖 开放 | Closes #48573

修复嵌套 Mermaid 状态图中，跨复合边界共享同一目标端点时的无限循环问题。
🔗 https://github.com/anomalyco/opencode/pull/48898

### 9. Server 端等待插件就绪后再读取（#48890）
🔖 开放

model、agent、command 读取现在会等待插件激活完成，避免位置作用域状态下读到不完整数据。
🔗 https://github.com/anomalyco/opencode/pull/48890

### 10. 升级内置 Bun 至 1.4.2（#44946）
🔖 开放 | Closes #44945

将包管理器从 bun@1.3.14 升级至 1.4.1（Rust 重写后的跟进版本），驱动 CI 与 `bun build` 流程。
🔗 https://github.com/anomalyco/opencode/pull/44946

---

## 功能需求趋势

- **编辑器级输入体验**：vim 键位绑定（#1764）、文件手动编辑能力（#26970）稳居头部。
- **多模型/智能路由**：Copilot "Auto" 选模（#25239）、Muse Spark 模型路由（#47702）、LM Studio context limit 支持（#35955）。
- **会话管理增强**：历史会话恢复（#37063）、跨会话隔离（#35587）、前后会话导航（#37117）。
- **MCP 灵活配置**：按会话独立选择 MCP 启用状态（#37168），适配 `serve`/`attach` 多客户端场景。
- **复合命令**：将 `/init`、`/review` 等命令链式组合为单一命令（#36236）。
- **Windows/本地化兼容**：RTL 布局（#35388）、Windows 原生 Git 路径（#48879）等持续高频出现。

---

## 开发者关注点

- **Windows 平台问题高发**：Numpad 失效、Git worktree 不可用、npm 安装占位符、标题栏碰撞——Windows 体验与 macOS/Linux 存在显著差距。
- **v2 UI 迁移回归集中**：7 月中旬以来大量 issue 指向 v2 UI 的欠成熟状态——Agent 切换无反馈、布局冻结、复制按钮失效、响应文本消失。
- **TUI 稳定性堪忧**：模型长思考后界面卡死、重连卡在 compaction、SSE 事件丢失（#37128），直接影响核心工作流。
- **升级风险**：多个 issue（#37063、#35587、#26890）显示升级后出现历史丢失、prompt 泄漏、甚至段错误（配置变更触发），用户对升级持谨慎态度。
- **流式推理中断**：多个推理模型在思考块中途停滞（#34667、#37073），且与模型深度绑定，提示需要更健壮的流式容错与超时恢复机制。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-14

## 今日速览

昨日发布 2 个版本更新（含 TUI 相关重构与 CUA Driver 二进制更新）；社区最突出的焦点是 **TUI 在后台代理任务场景下频繁触发 React error #185 崩溃**（多个 issue 集中反馈）；同时，安全类 Issue（Bash 允许规则绕过、权限请求串行化阻塞）与 CI 稳定性问题也获得了较高关注。功能方面，多个针对 Web Shell、内核级沙箱和输出语言支持的 PR 正在积极迭代中。

---

## 版本发布

### v0.23.3-nightly.20260913.faa395885e
- refactor(dingtalk): remove obsolete background response aggregation（移除钉钉渠道废弃的后台响应聚合逻辑，见 [PR #11570](https://github.com/QwenLM/qwen-code/pull/11570)）
- feat(channels)!: remove me（渠道相关破坏性变更，具体内容待查看 Release 详情）

🔗 https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260913.faa395885e

### cua-driver-rs-v0.20.6
Qwen CUA Driver 预编译二进制更新（vendored under `packages/cua-driver`）：
- **macOS**：已签名 + 公证的通用二进制，包含 `QwenCuaDriver.app`
- **Linux**：未签名（x86_64 + arm64，glibc 2.31 起）
- **Windows**：未签名 UIAccess worker + 原生 SDK payload（x86_64 + arm64）

🔗 https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.6

---

## 社区热点 Issues（Top 10）

### 1. TUI 因 React error #185 静默退出（多个 issue 集中爆发）
- [#11500](https://github.com/QwenLM/qwen-code/issues/11500)：多个后台代理相继完成时，TUI 因 Ink `useBoxMetrics` 循环触发 React #185，进程直接退出。评论 12，👍 1。
- [#11783](https://github.com/QwenLM/qwen-code/issues/11783)：后台任务注册后数秒即崩溃，同样指向 React #185。评论 3。
- [#11756](https://github.com/QwenLM/qwen-code/issues/11756)：虚拟化历史（Virtualized History）开启时，后台代理工作流触发递归更新循环。评论 4。
- [#5199](https://github.com/QwenLM/qwen-code/issues/5199)：最早期的 #185 报告（Windows/Cherry Studio 环境），6 月创建仍在追踪。

> 💡 该问题在 stable 0.23.3 和 main 分支均可复现，后台代理+长对话场景为高危触发条件，已影响多位用户，建议关注修复进展。

### 2. [#11795](https://github.com/QwenLM/qwen-code/issues/11795) 权限请求按 ACP 连接串行化，未按会话隔离 — P1
一个未应答的 `ask_user_question` 会静默阻塞同一 daemon 子进程上多路复用的所有其他会话。生产环境事故级 issue，评论 2。

### 3. [#11764](https://github.com/QwenLM/qwen-code/issues/11764) Bash 允许规则可被反斜杠+单引号绕过 — P1/安全
当第一条命令以单引号内反斜杠结尾时，第二条无关命令也会被同一 allow rule 授权执行，且无确认提示。严重安全漏洞。评论 3。对应修复 PR [#11765](https://github.com/QwenLM/qwen-code/pull/11765) 已提交。

### 4. [#11724](https://github.com/QwenLM/qwen-code/issues/11724) Windows 下 7GB 高内存占用且任务崩溃后无法续接
用户反馈长时间运行后出现内存达 7GB 的提示，CLI 随机中断且无法恢复任务。评论 4。另 [#11725](https://github.com/QwenLM/qwen-code/issues/11725) 为同一问题的重复 issue（已关闭）。

### 5. [#11590](https://github.com/QwenLM/qwen-code/issues/11590) 请求非 Qwen 模型时自动注入 `metadata` 导致 400 — P1
DashScope 聚合网关会把 Qwen Code 自动插入的 `metadata` 对象转发给非 Qwen 模型（如 `ZHIPU/GLM-5.3-Flash`），因类型不匹配导致 400，该模型完全不可用。已关闭但评论 4，建议关注后续修复方案。

### 6. [#11762](https://github.com/QwenLM/qwen-code/issues/11762) `/delete` 不清理 `~/.qwen/tmp/<hash>/logs.json`，且无禁用设置
日志文件累积全部会话的完整对话内容（含用户消息、工具输出），存在数据隐私隐患。评论 3。

### 7. [#11019](https://github.com/QwenLM/qwen-code/issues/11019) AUTO 模式下用户审批无法传到分类器，且 session 重建后审批模式回退为 AUTO — P2/安全
API 驱动场景下用户三次确认均被忽略，权限块不可覆盖；评论 3，标记 `need-discussion`。

### 8. [#11777](https://github.com/QwenLM/qwen-code/issues/11777) CI Test 作业在 workspace→test:scripts 切换时被 SIGTERM，测试全绿仍失败
零测试失败但作业被外部 SIGTERM，CI 稳定性问题。评论 4。同类问题另有 [#10490](https://github.com/QwenLM/qwen-code/issues/10490)（不同测试集随机失败）和 [#11780](https://github.com/QwenLM/qwen-code/issues/11780)（tsc build OOM）。

### 9. [#11747](https://github.com/QwenLM/qwen-code/issues/11747) RHEL 10 上 Node 缺少 Intl.Segmenter 导致 TUI 原生崩溃，且无诊断提示
Qwen 未检测缺失 ICU 数据，启动即静默退出。评论 3，建议补充依赖检测与可操作诊断信息。

### 10. [#11687](https://github.com/QwenLM/qwen-code/issues/11687) web_search 的 side-request 预算应可配置，且应限制预算耗尽时的降级内容
当前 `SEARCH_TIMEOUT_MS` 固定为 60s，预算不可调；预算耗尽时模型拿到的兜底内容未做边界约束。功能请求，评论 2。

---

## 重要 PR 进展（Top 10）

### 1. [#11636](https://github.com/QwenLM/qwen-code/pull/11636) feat: track background result execution across daemon and web shell
为后台结果处理赋予显式 daemon 执行生命周期：当前执行结果在安全模型边界消费，旧结果等待会话自动续跑，涵盖输出、权限、取消、回放等场景。`autofix/takeover` 状态。

### 2. [#11614](https://github.com/QwenLM/qwen-code/pull/11614) feat(cli): add bwrap kernel sandbox backend for Linux
新增基于 Linux 内核直接隔离的沙箱后端，无需容器运行时/root/daemon/镜像，按名称显式启用，默认行为不变。`autofix/takeover` 状态。

### 3. [#11241](https://github.com/QwenLM/qwen-code/pull/11241) feat(browser-use): add Playwright-based Browser SDK
在持久化 Node REPL 内运行的类型化 Browser SDK，可控制已有 Chrome 会话。API 借鉴 Codex Browser Use，支持语义定位器、DOM 快照引用、视觉坐标三种目标识别方式。`autofix/takeover` 状态。

### 4. [#11794](https://github.com/QwenLM/qwen-code/pull/11794) fix(cli): honor output language in stateless generation
无状态会话/工作区文本生成现在会应用用户配置的输出语言规则，作为系统指令发送，并明确优先于接口回退语言。

### 5. [#11776](https://github.com/QwenLM/qwen-code/pull/11776) fix(core): make persisted session pagination safe for equal mtimes
修复 [#11706](https://github.com/QwenLM/qwen-code/issues/11706)：当分页边界落在具有相同 `mtimeMs` 的会话文件组内时，裸 mtime 游标导致漏数据。改为安全分页。

### 6. [#11765](https://github.com/QwenLM/qwen-code/pull/11765) fix(core): read a backslash inside single quotes as literal when splitting
修复 [#11764](https://github.com/QwenLM/qwen-code/issues/11764) 的安全漏洞：现在按 bash 语义将单引号内的反斜杠视为普通字符，避免 allow rule 被拼接利用。

### 7. [#11548](https://github.com/QwenLM/qwen-code/pull/11548) feat(web-shell): connect to a selected remote daemon
独立 Web Shell 可连接用户指定的远程 daemon，支持地址+可选 bearer token，复用现有 workspace/session/file/terminal 接口。

### 8. [#11786](https://github.com/QwenLM/qwen-code/pull/11786) fix(web-shell): make the cockpit visual capture deterministic
移除截图瞬间的两处随机因素（artifact dock 动画、Chrome focus-visible 环绘制），使 `session-workflow-cockpit-{light,dark}` 渲染结果像素级一致。

### 9. [#11647](https://github.com/QwenLM/qwen-code/pull/11647) fix(cli): resolve ACP core settings against the active target dir
ACP 设置读取/持久化改为按请求会话的工作目录解析；MCP/hook/extension 写入处理器只解析显式 cwd 或 bootstrap 工作区。

### 10. [#11562](https://github.com/QwenLM/qwen-code/pull/11562) fix(cli): keep one-shot system reminders out of the user's own message
一次性系统提醒不再回显到用户消息中，影响范围包括：命令行转录、↑-recall 历史、取消后 composer 回填等。已将评审遗留项记录到 [#11587](https://github.com/QwenLM/qwen-code/issues/11587)。

---

## 功能需求趋势

从过去 24 小时的 Issues 与 PR 中可提炼以下社区关注方向：

1. **后台任务与 daemon 架构增强**（最高频）：后台结果执行生命周期（#11636）、turn-status 轮询 durability 决策（#11773）、后台代理场景下 TUI 稳定性修复（#11500/#11756/#11783）、权限请求按会话隔离（#11795）。
2. **安全加固**：Bash 允许规则解析漏洞修复（#11764/#11765）、审批流可靠性（#11019）、Skill `PreToolUse` hook 在 `--continue` 后失效（#11180）、telemetry 错误文本脱敏的测试 pin（#11760）。
3. **内核级/轻量级沙箱**：bwrap 后端（#11614）表明社区希望无需容器/root 即可获得更强的命令隔离能力。
4. **Web Shell 体验与确定性**：远程 daemon 连接（#11548）、cockpit 视觉确定性修复（#11786）、Command explanation 面板语言可配置（#11791）、固定计划任务展示（#11738）。
5. **多模型兼容性**：自动注入 metadata 导致非 Qwen 模型 400（#11590），反映聚合网关场景下对厂商中立性的诉求。
6. **数据隐私与存储管理**：`/delete` 清理完整日志（#11762）、内存高占用（#11724）。
7. **CI/CD 稳定性**：SIGTERM、npm ci 重试、tsc OOM、macOS E2E shard 死亡等一系列 flaky 治理 PR（#11777/#11731/#11780/#11134）。

---

## 开发者关注点

- **TUI 崩溃是最痛点**：React #185 在后台代理、虚拟化历史、长对话等场景高频复现，用户期望至少做到「崩溃前渲染错误信息」而非静默退出，并支持会话无缝恢复。
- **任务中断后续接能力不足**：内存溢出或崩溃后无法继续原任务，用户被迫重新梳理上下文（#11724）。
- **安全边界需要更透明**：allow rule 的解析语义必须严格遵循 bash 规则；权限请求不应因某个未应答的询问而阻塞整个连接。
- **CI 不稳定影响发布效率**：多个测试/构建作业非确定性失败（SIGTERM、OOM、shard 死亡），尽管无逻辑错误，仍拖慢发布流程。
- **隐私与数据控制**：日志文件在 `/delete` 后残留、telemetry 文本脱敏缺验证、环境变量泄漏到 MCP 子进程（#11718）等，开发者希望有更明确的开关和清理策略。

---

> 本日报由 AI 技术分析师基于 GitHub 公开数据生成。若需查看完整 Issue/PR 列表，请访问 [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*