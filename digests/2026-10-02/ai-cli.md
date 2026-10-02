# AI CLI 工具社区动态日报 2026-10-02

> 生成时间: 2026-10-02 03:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-02）

## 1. 生态全景

AI CLI 工具正从“单点代码辅助”加速迈向“可编程代理平台”：插件机制（Claude Mods）、托管代理架构（Qwen Managed Agent）、深度终端集成（Copilot sandbox CA、Codex worktree）成为各工具差异化竞争的核心。社区反馈重心已从“能否生成代码”转向“稳定性、权限可控性、成本透明度和企业级治理”，表明技术选型进入深水区。同时，Windows 平台体验和会话生命周期管理成为跨工具共性短板，是下一阶段体验竞争的关键战场。

## 2. 各工具活跃度对比

| 工具 | 活跃 Issues | 活跃 PRs | Releases（24h） | 关键信号 |
|------|------------|---------|----------------|---------|
| Claude Code | 50+（精选10条） | 5 | v2.1.287 | 首次推出 Mods 插件机制；GitHub 连接器回归 3 个月未修 |
| OpenAI Codex | 10+（精选10条） | 10 | 稳定版 v0.160.0 + 多个 alpha | TUI 复制粘贴回归已关闭修复；Windows 问题集中爆发 |
| Gemini CLI | 未详（安全修复为主） | 未详 | v0.64.0-nightly | 安全漏洞集中修复（shell 注入、路径遍历、权限绕过） |
| GitHub Copilot CLI | 37 条活跃 | 1 | v1.0.92-0, v1.0.91, v1.0.91-1 | 沙箱 CA 管理新增；认证权限粒度过大引争议 |
| Kimi Code CLI | 无 | 无 | 无 | 社区静默 |
| OpenCode | 10+（精选10条） | 4+（core 重构） | 未提及 | 计费/用量异常成高频反馈；首个原生 Cohere Provider |
| Qwen Code | 50 条 | 10 | v0.24.7-nightly | Managed Agent 架构持续深化；安全与可靠性问题密集 |

## 3. 共同关注的功能方向

- **插件/扩展机制深化**：Claude Code 正式推出 Mods，Qwen Code 持续推进 Managed Agent 架构，OpenCode 则进行 core 重构——反映出“可编程代理”已成为各工具架构演进的核心方向。
- **沙箱与安全边界控制**：Copilot CLI 新增 `sandbox ca` 管理，Qwen 修复沙箱越界导致 Host 终止、Codex 处理幽灵快照磁盘填满、Gemini 集中修复沙箱注入——安全机制的可控性和可靠性是普遍痛点。
- **Windows 平台适配**：Codex 至少有 4 个 Windows 相关 issue（dot 缺工具、WSL 失败、启动卡死），Copilot 也有 Windows 沙箱和终端问题，OpenCode 出现 PATH 截断——Windows 用户正为“二等公民”体验买单。
- **会话生命周期管理**：Codex 的会话恢复、Copilot 的 worktree 混乱、Claude Code 的 VS Code 会话丢失、Qwen 的会话重试死循环——会话的持久化、恢复和一致性是多个工具共同的技术债。
- **成本透明度**：OpenCode 用量误报/额度耗尽、Codex 配额消耗异常、Qwen 的非对话上下文 token 治理——用户对费用去向的可见性要求越来越强烈。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|---------|---------|---------|
| **Claude Code** | 插件化、深度定制（Mods）、守护代理 | 追求高度可扩展性的专业开发者/团队 | 端侧插件运行时 + 侧线代理，强生态整合 |
| **OpenAI Codex** | 跨平台 TUI、dot/App 集成、worktree 管理 | 多终端、多设备协作的开发者 | Rust 高性能 CLI + 云线程（gRPC）+ 桌面/VS Code 联动 |
| **Gemini CLI** | 安全加固、夜间版高频迭代 | 对安全合规敏感的企业开发者 | 保守迭代，优先修复漏洞，验证可靠性 |
| **Copilot CLI** | 沙箱能力、MCP 生态、企业治理 | GitHub 生态内企业用户 | 与 GitHub 深度绑定，托管策略与代理 CA 管理 |
| **Qwen Code** | Managed Agent 架构（托管+本地双路径） | 需要可控、可审计代理服务的企业 | Java 控制平面 + TS agent loop 解耦，强服务端架构 |
| **OpenCode** | 多 Provider 聚合、开源可自托管 | 追求开源透明与模型自由度的开发者 | 社区驱动，快速引入新模型，重计费透明性 |

## 5. 社区热度与成熟度

- **Claude Code** 社区热度最高：单个 Mods issue 230 条评论、👍 130，生态核心用户活跃，反馈直接推动官方路线图；但长期未修的连接器问题（3 个月）也暴露了大型项目的维护压力。
- **OpenAI Codex** 处于快速迭代期：每日 1 个稳定版 + 多个 alpha，PR 密集（今日 10 个），但 Windows 体验和集成稳定性仍是明显短板，社区情绪呈现“高关注高容忍”并存。
- **Qwen Code** 处于架构转型期：Managed Agent 相关 issue/PR 占半壁江山，核心团队主导方向，但边界 bug 频发，说明架构演进尚未完全稳定。
- **Copilot CLI** 社区活跃度中等：37 条活跃 issue 中，认证权限、MCP 兼容性、会话恢复是主要吐槽点；新增沙箱 CA 是功能亮点，但 PR 数量偏少。
- **OpenCode** 社区规模小但问题集中：计费异常和虚假 AI 署名问题直接关系到用户信任，开源特性可能吸引部分开发者，但整体声量有限。
- **Gemini CLI** 和 **Kimi Code** 社区活跃度低：Gemini 以安全修复为主，Kimi 几乎无活动，可能处于蓄力期或战略调整期。

## 6. 值得关注的趋势信号

- **“代理平台化”成为分水岭**：Claude Mods 和 Qwen Managed Agent 标志着 CLI 从“工具”演变为“代理运行时”，开发者未来将更多在其上构建自定义工作流，选择工具时需考虑扩展生态的长期潜力。
- **成本透明度将决定付费工具留存**：多个工具出现“用量不明”类 issue，且持续数周不解决。开发者应优先选择提供细粒度用量审计（如 Qwen 的非对话上下文 token 分解）的工具，并警惕配额计算逻辑不透明的提案。
- **Windows 支持是隐性竞争力**：Codex、Copilot、OpenCode 的 Windows 问题集中在启动、沙箱、路径处理等基础设施层面。若你的团队包含 Windows 成员，工具选型时需重点评估其 Windows 一等公民程度，或准备好降级方案。
- **会话恢复能力是生产力底线**：多个工具（Claude、Codex、Copilot）的会话丢失/恢复失败 issue 居高不下，说明这一基础功能仍不可靠。对于长任务使用者，建议定期导出会话记录，并关注工具对 `worktree` 等复杂场景的持久化支持。
- **安全机制正在成为功能而非补丁**：Copilot 的代理 CA 管理、Qwen 的 Broker 认证设计、Gemini 的集中安全修复，预示下一阶段“沙箱/权限”将成为 CLI 的核心卖点而非附属品。开发者应关注工具是否提供细粒度权限控制（如按仓库/目录授权），而非一刀切的路径校验。
- **TUI 体验走向“精细化”**：Codex 修复复制粘贴、Copilot 用户要求隐藏状态通知、OpenCode 修复 PATH 截断——终端 UI 的可用性细节开始被放大，说明 CLI 交互已从“功能完备”进入“体验打磨”阶段，可作为易用性选型的参考维度。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据源：github.com/anthropics/skills | 截止 2026-10-02

---

## 1. 热门 Skills 排行

以下 PR 按社区评论数排序居前，反映当前最受关注的 Skills 动态。

| 排名 | PR | Skill / 改动 | 功能概述 | 社区关注点 | 状态 |
|---|---|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator（修复） | 隔离触发评估逻辑，修复 Windows 下 `select()` 管道失败及运行时误判为未触发的问题 | 技能评估可靠性、跨平台兼容性、负例误判 | Open |
| 2 | [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder（修复） | 适配 `mcp>=2.0` 的 `streamable_http_client` 导入变更，并支持自定义 HTTP 头 | MCP 生态快速演进带来的兼容性断裂 | Open |
| 3 | [#1771](https://github.com/anthropics/skills/pull/1771) | proofcore-contract-auditor（新增） | Web3 智能合约静态审计，并将审计证明锚定到 TON 区块链 | 区块链安全审计、可验证性、零存储 Merkle 协议 | Open |
| 4 | [#1734](https://

---

# Claude Code 社区动态日报 — 2026-10-02

## 今日速览

v2.1.287 发布，首次引入 **Claude Mods** 插件深化机制，并内置 "You should know" 守护代理；社区围绕 Mods 扩展方向的讨论（#91870）以 230 条评论成为绝对焦点；GitHub 连接器账号级回归、VS Code 会话恢复异常等长期问题仍在持续发酵。

## 版本发布

**v2.1.287**（发布于过去 24 小时）

- 新增 **Claude Mods**：插件机制进一步下沉，可修改 Claude Code 更底层的行为。
- 新增内置 Mod **"You should know"**：由侧线代理（side agent）实时监控会话，标记你或 Claude 可能遗漏的事项。
  - 启用方式：`/plugin enable cc-plugin-you-should-know@builtin`（适用于 first-party 会话环境）。

## 社区热点 Issues

过去 24 小时内更新 50 条，以下为最值得关注的 10 条：

### 1. Mods —— 让 Claude 扩展性提升 10 倍
- **链接**: https://github.com/anthropics/claude-code/issues/91870
- **作者**: @poteat | 评论: 230 | 👍: 130 | 状态: OPEN
- 社区对 Mods 响应极其热烈。Anthropic 在评论中发布两次社区更新，透露"正在快速消化用户反馈"并给出时间表承诺，明确 Mods 是当前官方优先级最高的方向之一。

### 2. GitHub 连接器账号级回归：所有仓库内容均无法访问
- **链接**: https://github.com/anthropics/claude-code/issues/71542
- **作者**: @Antares9879 | 评论: 68 | 👍: 64 | 状态: OPEN
- 连接器可成功链接账号，但任何仓库（公开/私有）的内容都无法读取。影响面覆盖整个账号，持续近 3 个月仍未修复，社区怨气较高。

### 3. 请求 Passkey（WebAuthn）登录
- **链接**: https://github.com/anthropics/claude-code/issues/84862
- **作者**: @mccarthysean | 评论: 10 | 👍: 84 | 状态: OPEN
- 高赞功能请求：希望 Claude 账号在 CLI、IDE、Web 全端支持 Passkey 无密码登录。84 👍 反映出社区对认证安全与便捷性的强烈需求。

### 4. VS Code 扩展：worktree 会话在重启后从历史记录中消失
- **链接**: https://github.com/anthropics/claude-code/issues/85624
- **作者**: @Dleisterlifeloop | 评论: 10 | 👍: 2 | 状态: OPEN
- 系统重启后 5 个会话标签页空白且无法从 UI 恢复，但磁盘上 transcript 数据完好。连带报告了 3 个可复现的会话恢复缺陷，直接影响多 worktree 开发者。

### 5. 后台子代理间歇性停滞：无最终输出但状态标记为完成
- **链接**: https://github.com/anthropics/claude-code/issues/83848
- **作者**: @Akashae98 | 评论: 9 | 👍: 0 | 状态: OPEN
- 使用 `Agent` 工具启动的后台子代理（fresh subagent 类型，非 fork）在产生最终文本前停滞，外层 harness 却报告 `status: completed`。原始 transcript 可复现，属于静默失败，风险较高。

### 6. Linux：网络切换后下一个请求在死连接上挂起 184 秒
- **链接**: https://github.com/anthropics/claude-code/issues/98184
- **作者**: @daniel-x | 评论: 5 | 👍: 0 | 状态: OPEN（含 repro）
- 带可复现用例：网络变更后，下个请求卡在失效连接上长达 184 秒才重试，严重影响移动办公场景。

### 7. 功能请求：发布 Artifact 的组织级默认共享
- **链接**: https://github.com/anthropics/claude-code/issues/78537
- **作者**: @boz-tech | 评论: 7 | 👍: 16 | 状态: OPEN
- 希望组织管理员可设置默认共享策略，避免每次发布制品时手动调整，企业协作场景的刚需。

### 8. VS Code 扩展：session 列表硬编码遮蔽 worktree 会话
- **链接**: https://github.com/anthropics/claude-code/issues/81024
- **作者**: @nirecom | 评论: 6 | 👍: 6 | 状态: OPEN
- 扩展的 session 列表硬编码 `includeWorktrees: false`，导致基于 git-worktree 的会话无法在列表中显示，高优先级生产力损失。

### 9. monitor 持久配置被移除，用户要求恢复
- **链接**: https://github.com/anthropics/claude-code/issues/94672
- **作者**: @akapug | 评论: 3 | 👍: 4 | 状态: OPEN
- 标题即情绪："wtf did you remove persistent:true from monitors for??? PUT IT BACK PLS"。monitor 的 `persistent: true` 配置被静默移除，开发者的既有工作流被打破。

### 10. VS Code 终端模式：daemon 会话永远无法持有 IDE 连接
- **链接**: https://github.com/anthropics/claude-code/issues/98858
- **作者**: @spskeldon | 评论: 0 | 👍: 0 | 状态: OPEN（今日新提）
- daemon 托管的会话在 VS Code 终端模式下被前端持续抢占 IDE 连接，导致 `mcp__ide__*` 工具组永远不可用。今日新提交，反映 daemon 架构下的竞态问题。

## 重要 PR 进展

过去 24 小时共 5 条 PR，全部罗列如下：

### 1. 修复 "shell 操作符需要安全批准" 误报
- **链接**: https://github.com/anthropics/claude-code/pull/16632
- **作者**: @ian | 状态: CLOSED
- 将 ralph-loop 初始化逻辑从 Markdown 代码块迁移为真正的 Bash 工具调用，消除引擎对 `!` 前缀代码块的误判，修复 #16389。

### 2. 更新 security-guidance 插件
- **链接**: https://github.com/anthropics/claude-code/pull/62592
- **作者**: @mhegazy | 状态: CLOSED
- README 单文件变更，属文档维护型 PR。

### 3. diff 面板：仅当有文件可列出时才自动打开
- **链接**: https://github.com/anthropics/claude-code/pull/94847
- **作者**: @bcherny | 状态: OPEN
- 修复首个编辑操作时 diff 面板过早在文件列表拉取前打开的问题，避免仓库外、ignored 或跨 worktree 写入时出现空面板。

### 4. 回退两个 mods 变更（agents-md 截断读取、diff 强制颜色）
- **链接**: https://github.com/anthropics/claude-code/pull/98018
- **作者**: @poteat | 状态: CLOSED
- 回退 #96363 与 #96364，让 agents-md 与 diff 两个 mod 恢复先前行为。说明 Mods 机制正在快速试错收敛。

### 5. /diff 对话框：关闭时不再静默

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-02

## 今日速览

今日 Codex 发布了 0.160.0 稳定版和多个 0.161/0.162 alpha 迭代，重点改进任务浏览与终端交互；macOS/Windows 上 TUI 复制粘贴回归问题相关的多个 Issue 已被关闭，确认修复落地；Windows 平台问题仍是社区焦点，涉及 Computer Use、WSL 沙箱和启动卡死等。

## 版本发布

过去 24 小时内发布多个版本，其中 **rust-v0.160.0** 包含实质更新：

- 在 agent command center 中新增可通过键盘访问的“Show more”操作，支持浏览更早的任务（#49106）
- 全屏模式下，在支持的本地 Linux X11 终端中支持选中转录文本并用中键粘贴（#49112）
- 支持在项目外以工作区默认设置启动会话

此外还有多个 alpha 版本（0.161.0-alpha.7 至 0.162.0-alpha.2），未附带详细更新说明。

## 社区热点 Issues

精选 10 个值得关注的 Issue：

### 1. [Windows] dot-started 本地任务缺少 Computer Use 工具，而普通本地 Codex 会话正常
- **Issue**: [#49458](https://github.com/openai/codex/issues/49458)
- **作者**: @gaopengbin | 评论: 21 | 👍: 13
- **为什么重要**: Windows 上通过 dot 启动的本地任务无法使用 Computer Use 工具，而普通会话正常，说明 dot 任务的工具继承或会话初始化路径存在差异。这是 Windows + dot 双重热门场景的交汇问题，社区关注度很高。

### 2. [macOS][CLI 0.157.0] Cmd+C 在 iTerm2 中不再复制选中的转录文本（已关闭）
- **Issue**: [#47996](https://github.com/openai/codex/issues/47996)
- **作者**: @lvzixun | 评论: 20 | 👍: 20
- **为什么重要**: macOS 用户最常用的复制操作被破坏，影响面极大。好消息是该 Issue 今日已关闭，说明修复已经合入。

### 3. dot 无法在已保存项目中创建或跟进本地 Codex 任务
- **Issue**: [#49729](https://github.com/openai/codex/issues/49729)
- **作者**: @jdip | 评论: 19 | 👍: 2
- **为什么重要**: dot 无法选择已保存的 Codex App 项目，即使创建了线程也无法按 ID 读取或回复，导致跨工具工作流断裂。与 #49862、#50127 形成一组 dot 相关集成问题。

### 4. Codex 配额消耗急剧增加的问题
- **Issue**: [#26306](https://github.com/openai/codex/issues/26306)
- **作者**: @ballytranshipper-eng | 评论: 15 | 👍: 0
- **为什么重要**: 持续近四个月未解决的老问题，用户报告配额消耗异常加快，直接影响付费用户的使用成本，属于高优先级的经济性痛点。

### 5. Cmd+C 在 Mac 上失效但 Ctrl+C 正常（已关闭）
- **Issue**: [#48122](https://github.com/openai/codex/issues/48122)
- **作者**: @cropsgg | 评论: 11 | 👍: 42
- **为什么重要**: 👍 数高达 42，是所有展示 Issue 中最高的，说明大量用户遇到此问题。今日关闭，与 #47996 属于同一回归的不同报告。

### 6. CMD+C 在最新 Codex CLI 中不再工作（已关闭）
- **Issue**: [#48097](https://github.com/openai/codex/issues/48097)
- **作者**: @Xpycode | 评论: 10 | 👍: 5
- **为什么重要**: 在 Warp 终端上也复现了 Cmd+C 失效问题，扩大了该回归的影响范围。已关闭，修复确认。

### 7. Codex App 幽灵快照在可信主目录运行 git add -A 并填满磁盘
- **Issue**: [#19588](https://github.com/openai/codex/issues/19588)
- **作者**: @bi-boo | 评论: 9 | 👍: 3
- **为什么重要**: 当用户将 macOS 主目录设为可信工作区时，Codex 的幽灵快照机制会对整个主目录执行 `git add -A`，产生大量 tmp_pack 文件填满磁盘。这是一个严重的数据安全与存储问题，自 4 月创建至今仍开放。

### 8. [Windows] 桌面应用启动时卡在加载界面，需重启 app-server
- **Issue**: [#49240](https://github.com/openai/codex/issues/49240)
- **作者**: @matcha186 | 评论: 8 | 👍: 3
- **为什么重要**: Windows 桌面应用自 26.924.22138 版本更新后，启动时一直停在加载转圈，重启 codex.exe（app-server）才能恢复。影响 Windows 用户的基础使用。

### 9. [VS Code] 未定义的内部 fetch 响应导致发送队列消息锁释放时 JSON 解析错误
- **Issue**: [#49834](https://github.com/openai/codex/issues/49834)
- **作者**: @extross | 评论: 8 | 👍: 1
- **为什么重要**: VS Code 扩展在发送队列锁释放时遇到 `undefined` 响应导致 JSON 解析失败，消息卡在队列中。与 #49975（Windows 上同样问题）互相印证，属于扩展的稳定性 bug。

### 10. Windows app 26.928.21956：WSL 沙箱启动失败
- **Issue**: [#49789](https://github.com/openai/codex/issues/49789)
- **作者**: @CFLeung123 | 评论: 7 | 👍: 5
- **为什么重要**: 更新到 26.928.21956 后 WSL 沙箱报 `No such file or directory (os error 2)`，导致沙箱功能无法使用。Windows 沙箱链路近期频繁出现问题。

## 重要 PR 进展

精选 10 个重要 PR：

### 1. 向 TUI 添加托管 worktree 工具
- **PR**: [#50148](https://github.com/openai/codex/pull/50148)
- **内容**: 通过 MCP 暴露 `create_worktree`、`get_worktree_creation_status`、`list_worktrees` 工具，支持可信本地项目和附件存储场景，覆盖嵌入式与本地守护进程会话。

### 2. 使用服务端权限目录驱动 TUI 权限快捷方式
- **PR**: [#50140](https://github.com/openai/codex/pull/50140)
- **内容**: 修复权限快捷方式检查本地配置而选择器使用服务端目录的不一致问题，使快捷方式遵循服务端限制（包括模型特定的自动审查要求）。

### 3. 为 TCP 隧道添加可选的 JSON 诊断
- **PR**: [#50131](https://github.com/openai/codex/pull/50131)
- **内容**: 新增 `codex tcp-tunnel --diagnostics-json`，输出按换行分隔的版本化 JSON 诊断，记录启动、CONNECT、传输和控制失败，同时避免泄露凭据和原始错误信息。

### 4. 为远程 MCP 服务器保留 Windows 环境变量
- **PR**: [#50129](https://github.com/openai/codex/pull/50129)
- **内容**: 修复 Unix 上启动 Windows 执行器 stdio MCP 服务器时，显式远程环境变量被 Unix 默认允许列表过滤的问题，避免 Windows 运行时和临时目录变量丢失。

### 5. 暴露运行中回合下一步所选模型
- **PR**: [#50128](https://github.com/openai/codex/pull/50128)
- **内容**: 新增 `CodexThread::current_turn_model`，返回指定运行回合下一步所选模型 slug，不依赖未来回合的设置。

### 6. 添加云线程恢复与附加的原生 gRPC 客户端
- **PR**: [#50113](https://github.com/openai/codex/pull/50113)
- **内容**: 新增可复用的 Rust 客户端 `codex-cloud-client`，支持 `ThreadService.Resume` 和 `ThreadService.Attach`，基于 HTTP/2，调用方提供 gRPC origin、bearer token、账户 ID 等。

### 7. 集中管理 TUI 加载字形与帧调度
- **PR**: [#50112](https://github.com/openai/codex/pull/50112)
- **内容**: 将语音连接 spinner 的动画逻辑（100ms 节奏、reduced-motion 静态字形）重构到共享工具模块，统一帧调度实现。

### 8. 保持全屏提示有界且可滚动
- **PR**: [#50109](https://github.com/openai/codex/pull/50109)
- **内容**: 限制全屏编辑器（含 padding 和提示）高度不超过三分之二，确保远程图片附件下仍有可编辑提示行可见，长草稿保持可浏览。

### 9. 修复 Linux 沙箱在多个被拒绝文件下的启动问题
- **PR**: [#50059](https://github.com/openai/codex/pull/50059)
- **内容**: Bubblewrap 会消费并关闭每个 `--ro-bind-data` 挂载的 fd，复用同一描述符导致沙箱无法启动。修复为每个文件掩码单独打开并保留独立的 `/dev/null` 描述符。

### 10. 升级 Windows bindings 到 windows-sys 0.61.2
- **PR**: [#50058](https://github.com/openai/codex/pull/50058)
- **内容**: 工作区统一使用 `windows-sys 0.61.2`，适配更新后的句柄、布尔和类型定义，用 `OwnedHandle` 替换自定义句柄所有者。这是 Windows 平台长期健康度的重要基础更新。

## 功能需求趋势

从近期 Issues 中提炼出社区最关注的四个方向：

1. **dot/agent 与 Codex 深度集成**（#49729、#49862、#50127）：用户期待 dot 能完整操作本地 Codex 项目——创建任务、选择已保存项目、按 ID 读写线程——但目前链路多处断裂，是当前最热门的集成需求。

2. **TUI 终端体验精细化**（#48527、#48567、#48633）：社区不仅在报 bug，也在积极提出体验改进建议：会话名称/ID 易复制、退出生效、`/side` 和 `/btw` 聊天中支持双 Esc 编辑、mini/pets 的可配置快捷键等。说明 TUI 已从“能用”走向“好用”阶段。

3. **Windows 平台稳定性与一等公民支持**（#43887、#49789、#49240、#46987、#48670、#46338）：Computer Use 配置失败、WSL 沙箱崩溃、启动卡加载、全局状态损坏、内置浏览器权限验证不可用、首次启动耗时 6-10 分钟。Windows 用户正在承担最多的平台阵痛。

4. **沙箱与安全机制的可控性**（#19588、#49789）：幽灵快照对主目录执行 `git add -A` 导致磁盘耗尽，以及沙箱启动失败，暴露出安全机制本身需要更严格的边界保护和更清晰的失败反馈。

## 开发者关注点

- **TUI 复制/粘贴回归是最大的短期痛点**：0.157.0 引入的 Cmd+C 失效问题影响 macOS/iTerm2、Warp 等多个终端组合，共 4 个 Issue 与此相关，合计 👍 67 + 41 条评论。虽然今日已关闭，但用户被迫降级到 0.156.0 的反馈值得团队在 CI 中增加终端交互回归测试。
- **Windows 平台问题高度集中且相互交织**：dot 工具缺失、WSL 沙箱失败、启动卡加载、Computer Use 引导不完整、内置浏览器权限异常——开发者反馈显示 Windows 上 Codex 的“开箱即用”体验还远未达标。
- **配额消耗透明度不足**：#26306 持续 4 个月未解决，用户对“配额用在哪里”缺乏可见性。高消耗 + 不透明 = 强烈的不信任感。
- **幽灵快照存在安全边界风险**：对可信主目录执行 `git add -A` 造成磁盘填满，社区期待 Codex 在快照前对工作区大小做出评估或提供排除机制。
- **CLI 与 app-server 版本同步问题**（#49418）：升级 CLI 后托管 app-server 不随之更新，导致版本不一致行为，用户希望有自动同步机制。

---

*本日报根据 github.com/openai/codex 公开数据自动生成，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-02

## 今日速览
- 发布 `v0.64.0-nightly.20261002` 夜间版，重点修复聊天记录服务的增量补丁与状态持久化可靠性。
- 安全修复成为今日 PR 主旋律：沙箱构建 shell 注入、checkpoint 路径遍历、Windows git 参数绕过权限提示等多个漏洞被集中修复。
- 社区对 Agent 可靠性的讨论热度持续攀升："通用代理挂起"（#21409）和"MAX_TURNS

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-10-02

## 今日速览

昨日发布 3 个版本（v1.0.92-0、v1.0.91、v1.0.91-1），主要修复了 MCP 工具在 OAuth 重新认证后的可用性问题，并新增了 `copilot sandbox ca` 代理 CA 管理命令。社区侧，关于认证权限粒度过大的讨论持续升温（#953），多个新 issue 聚焦会话恢复失败、沙箱 DNS 解析和 ACP 模式兼容性问题，值得关注。

## 版本发布

过去 24 小时内发布 3 个版本：

- **v1.0.92-0** — 修复：当 MCP 工具定义未变化时，OAuth 重新认证后 MCP 工具可继续正常工作。
- **v1.0.91** — 新增 `copilot sandbox ca` 命令，支持检查、创建、信任、轮换和移除代理 CA 信任（含 Windows 无人值守安装）；`/sandbox ca install` 更名为 `create`/`trust`；修复会话时间线在中断回合结束后清除 busy 状态；沙箱命令现可在 Windows 上运行。
- **v1.0.91-1** — 新增 `copilot sandbox ca` 系列命令；改进 CLI 关闭时在退出前刷新待发送遥测数据（有界延迟）。

🔗 [查看 Releases](https://github.com/github/copilot-cli/releases)

## 社区热点 Issues

从 37 条活跃 issue 中精选 10 条：

1. **[#953] 认证权限请求范围过大** — 用户抱怨登录时要求授予账户下所有仓库的读写权限，希望可按仓库/范围控制 AI 访问。社区 8 条评论、5 个 👍，反映企业/个人用户对最小权限原则的强烈诉求。
   https://github.com/github/copilot-cli/issues/953

2. **[#5008] 启动时报 "Failed to read model provider attribution: Error: Not authenticated"** — 1.0.89 起每次新会话启动时出现两次该错误，随后 3 秒后才完成登录，疑似启动竞态。影响升级用户的日常体验。
   https://github.com/github/copilot-cli/issues/5008

3. **[#4851] Azure MCP 服务器发送 HTTP 请求时 BrokenPipe 失败** — 使用数月的 Azure API Center MCP 注册表突然在 Rust 运行时中报 BrokenPipe 错误，1.0.83 起无法验证 MCP 服务器。8 个 👍，说明 Azure MCP 生态用户较多。
   https://github.com/github/copilot-cli/issues/4851

4. **[#4998] macOS 更新/重启后 CLI 因 `.mcp-writer.binding` 残留失效** — 安装最新 macOS 安全更新并重启后，新会话和恢复的旧会话均无法处理提示，指向文件系统设备 ID 持久化问题。属环境升级触发的隐蔽故障。
   https://github.com/github/copilot-cli/issues/4998

5. **[#3675] 会话 worktree 应可配置、自清理且命名一致** — 当前 worktree 路径、分支名、会话名三者命名不统一，且无自动清理机制。8 个 👍，开发者对工作区管理体验有较高期待。
   https://github.com/github/copilot-cli/issues/3675

6. **[#4959] 企业托管 model 设置已接收但未生效** — 运行时日志显示已获取 `model` 策略，但模型解析器仍选用其他值，企业配置未能落实到非交互 CLI。说明托管配置链路存在断层。
   https://github.com/github/copilot-cli/issues/4959

7. **[#5034] 建议增加设置隐藏 MCP 状态通知** — 用户希望在会话启动和运行中抑制 MCP 连接/断开/工具可用性等冗长通知，提出 `mcp.showStatusNotifications: false` 方案。
   https://github.com/github/copilot-cli/issues/5034

8. **[#5023] 会话恢复因指标类型被掩码为字符串而失败** — 当文件编辑工具的 `toolTelemetry.metrics` 计数器被存储为字符串时，持久化会话永久无法恢复。属数据完整性 bug。
   https://github.com/github/copilot-cli/issues/5023

9. **[#4938] GHEC-DR 租户下 SDK 会话认证仍路由到 api.github.com** — 即使配置了 `CopilotClientMode.Empty`，GitHubToken 相关路径仍指向公共端点而非 GHEC 数据驻留租户端点，与 #4527 同类问题在 SDK 层未解决。
   https://github.com/github/copilot-cli/issues/4938

10. **[#5027] Linux 沙箱 DNS 失效（systemd-resolved stub resolver）** — 沙箱共享宿主 `/etc/resolv.conf`，但 127.0.0.53 在沙箱内不可达，导致网络解析失败，影响沙箱功能在常见 Linux 发行版上的可用性。
    https://github.com/github/copilot-cli/issues/5027

## 重要 PR 进展

过去 24 小时仅 1 条 PR：

- **[#5036] 更新 README 中默认模型版本** — 作者 @mjgard，同步文档中 Copilot CLI 的默认模型信息，属文档修订。
  https://github.com/github/copilot-cli/pull/5036

## 功能需求趋势

从近期 issue 中可提炼出以下社区关注方向：

- **MCP 生态完善**：MCP 服务器兼容性（Azure、Figma）、状态通知可配置、企业级 MCP 服务器允许列表（`allowedMcpServers`）、代理 CA 信任管理 — 说明 MCP 已大规模落地，用户开始关注可管理性与稳定性。
- **权限精细化控制**：从"全仓库读写"到"按仓库/范围授权"是用户最集中的治理诉求，尤其企业用户。
- **会话稳定性与可恢复性**：会话恢复失败、时间线状态残留、worktree 管理混乱等问题频发，反映会话生命周期管理成为核心体验瓶颈。
- **企业合规与托管配置**：GHEC-DR 数据驻留、企业托管 model 设置生效、使用量配额可见性 — 企业规模化部署的需求正在上升。
- **沙箱功能增强**：CA 信任管理、Windows 支持、DNS 解析问题 — 沙箱作为安全执行环境的功能边界在快速扩展，同时暴露了跨平台适配的短板。

## 开发者关注点

- **认证与权限是最大痛点**：#953 与 #5008 分别从权限粒度和登录竞态两个角度，反映认证体验仍是高频吐槽点。
- **Windows 平台问题持续积累**：CMD 窗口闪烁（#3171）、指令文件双重加载（#5022）、沙箱命令支持 — Windows 用户生态活跃但平台适配仍落后于 macOS/Linux。
- **MCP 服务器兼容性与可靠性**：Azure BrokenPipe、Figma Code Connect 返回空数据、stdout MCP 加载失败 — MCP 服务器的跨实现兼容性问题正在消耗开发者大量排障时间。
- **AI 会话的"真实感"问题**：多个 issue 指向会话状态不一致（如 #4982 并行工具调用卡死、#5037 图片在回退后丢失、#5035 更新停止但 UI 可操作），说明后台任务与 UI 状态同步机制有待加强。
- **对"非侵入式"体验的期待**：用户希望关闭 "Task complete" 摘要（#5033）、隐藏 MCP 状态通知（#5034）、控制自动审批权限（#5031）—— 社区对 CLI 的精细控制能力要求日益提高。

---

*本日报由 AI 自动生成，数据截至 2026-10-02 00:00 UTC。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-10-02

## 今日速览

核心团队今日密集推进 `packages/core` 重构（kitlangton 提交了 4 个重构 PR），同时社区迎来首个原生 Cohere Provider 支持。另一端，计费/用量异常成为今日最高频反馈——至少 3 个独立 Issue 指向模型用量误报与配额异常，其中中文用户报告额度被无端消耗的问题值得关注。

---

## 社区热点 Issues

### 1. gpt-6-luna 使用量被报告但从未使用（#52367）
- **状态**：OPEN | 评论 6 | 👍 0
- **为什么重要**：用户持有 Go 订阅，日志显示 `Endpoint /inference/go/openai/v1/responses`，但从未主动使用 gpt-6-luna。计费不透明已引发用户对平台信任的疑虑。
- **链接**：https://github.com/anomalyco/opencode/issues/52367

### 2. 提交中出现虚假的 Co-Authored-By: Claude 署名（#52445）
- **状态**：OPEN | 评论 4 | 👍 0
- **为什么重要**：代理在无任何配置（无 hooks、无模板）的情况下向用户提交写入 `Co-Authored-By: Claude Opus 4.8`。这涉及 AI 代理署名的真实性与用户代码主权问题，社区讨论相当激烈。
- **链接**：https://github.com/anomalyco/opencode/issues/52445

### 3. [中文] 使用额度异常：5 小时额度在闲置期间被耗尽（#52623）
- **状态**：OPEN | 评论 3 | 👍 0
- **为什么重要**：用户反馈连续 5 小时未使用 API，额度却显示已用完，周/月额度同样异常。此问题与 #52367 同属计费准确性方向，且直接影响付费用户留存。
- **链接**：https://github.com/anomalyco/opencode/issues/52623

### 4. deepseek-v4.1-flash 提示缓存回退至首张图片（#51993）
- **状态**：OPEN | 评论 5 | 👍 0
- **为什么重要**：会话中新增图片后，prompt cache 匹配退回至第一张图片，导致之前所有内容被重新处理。不仅拖慢响应，还显著增加成本，多模态长会话场景受影响严重。
- **链接**：https://github.com/anomalyco/opencode/issues/51993

### 5. GitHub Copilot 模型在 OAuth 成功后不显示（#38812）
- **状态**：CLOSED | 评论 3 | 👍 11（本周最高赞）
- **为什么重要**：认证成功后 `/models` 仍不出现 Copilot 模型。11 个 👍 说明大量用户受此集成问题影响，GitHub Copilot 作为主流模型源，集成可靠性至关重要。
- **链接**：https://github.com/anomalyco/opencode/issues/38812

### 6. OpenCode Desktop 1.18.4 在 Windows 首次启动引导时无限挂起（#38222）
- **状态**：CLOSED | 评论 7 | 👍 0
- **为什么重要**：CLI 正常工作，唯独桌面应用卡在加载页。虽然已关闭，但 7 条评论说明排查过程反复，桌面端首启引导的稳定性仍需关注。
- **链接**：https://github.com/anomalyco/opencode/issues/38222

### 7. [FEATURE] 代理的内存压缩感知钩子（#30116）
- **状态**：CLOSED | 评论 7 | 👍 0
- **为什么重要**：请求在长会话的自动上下文压缩（memory compaction）前后提供事件挂钩，以便自定义逻辑感知压缩边界。虽已关闭，但反映了长会话用户对压缩可观测/可控性的真实诉求。
- **链接**：https://github.com/anomalyco/opencode/issues/30116

### 8. TUI 在多问题提示后挂起，按键与 Ctrl+C 均无响应（#43376）
- **状态**：OPEN | 评论 4 | 👍 0
- **为什么重要**：`question` 工具一次抛出 3 个问题时，TUI 偶发完全冻结，用户只能强制杀进程。该 Bug 直接影响交互式工作流的可靠性。
- **链接**：https://github.com/anomalyco/opencode/issues/43376

### 9. [Windows] TUI shell 收到被截断的 PATH（#37125）
- **状态**：CLOSED | 评论 5 | 👍 0
- **为什么重要**：从 PowerShell 启动时，OpenCode 只保留 `C:\Windows\System32`，导致 git、node 等工具在 TUI 内不可解析。对 Windows 开发者而言这是阻断性问题。
- **链接**：https://github.com/anomalyco/opencode/issues/37125

### 10. 重启后旧实例仍在后台运行（#52638）
- **状态**：OPEN | 评论 1 | 👍 0
- **为什么重要**：今日新提交的 Issue：执行 `opencode upgrade` 重启客户端后，agent 的循环并未真正停止，旧实例继续在后台占用资源。长任务用户可能频繁触发该场景。
-

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-10-02

## 1. 今日速览

Managed Agent 架构演进仍是本周绝对主线：`#12380` 提出双路径架构与分阶段交付方案，获 38 条评论成为社区焦点；同时核心团队围绕 Session 生命周期、Broker 认证、Turn 接管等发布了一系列 follow-up 追踪 Issue。此外，`v0.24.7-nightly` 修复了 Code Mode 文本与懒工具发现对齐问题，多个关键 PR 正在密集评审中。

## 2. 版本发布

**v0.24.7-nightly.20261001.a7deb01bcb**

- `fix(core)`: 对齐 Code Mode 文本与懒工具发现（#12990）
- `fix(permissions)`: 批准逻辑相关修复

链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.24.7-nightly.20261001.a7deb01bcb

## 3. 社区热点 Issues（Top 10）

### 🔥 架构方向

1. **[#12380] 提案：Managed Agent 双路径架构与分阶段交付**（38 评论）
   定义了一个分阶段 Managed Agent 架构：保留现有 TypeScript agent loop，模型推理与工具环境供给解耦，Sessions 获得持久化所有权、Workspace 绑定、可恢复的工具执行与稳定的 WebSocket 连接。这是当前社区讨论最密集的 Issue，多家组织关注。
   https://github.com/QwenLM/qwen-code/issues/12380

2. **[#12867] Stage D 后续：持久化生命周期、Turns、Actions、AgentDefinition**（17 评论）
   覆盖 #12380 Stage D 剩余部分，涉及 durable lifecycle、Turns 数据结构、Actions 执行与 `java_durable` 准入配置。
   https://github.com/QwenLM/qwen-code/issues/12867

3. **[#12737] Stage B 宿主集成：Legacy 与 Managed 双引擎配对**（14 评论）
   讨论本地 `qwen serve` Managed 执行优先级调整（低于 Hosted Managed），需要保留 M1/M3 保护与配置。
   https://github.com/QwenLM/qwen-code/issues/12737

### ⚡ 性能与上下文

4. **[#12028] 非对话上下文 Token 治理（跟踪 Issue）**（18 评论）
   系统提示词、工具 schema、QWEN.md、技能列表等非对话上下文在每次请求中都被计费发送。大上下文模型上这部分开销可能超出对话本身——社区对 token 成本透明化的诉求强烈。
   https://github.com/QwenLM/qwen-code/issues/12028

### 🐛 关键 Bug

5. **[#12889] 延迟 tool_call schema 允许工具必填字段为空参数**（7 评论）
   用户请求查找关于 Opus 5.5 代理集群的新闻时，`tool_search` 返回了空参数的调用结果，导致工具行为异常。直接影响延迟工具（deferred tools）的可靠性。
   https://github.com/QwenLM/qwen-code/issues/12889

6. **[#13157] Agent Host：沙箱越界调用不应直接终结运行**（5 评论）
   工具调用解析到 workspace 之外时，Agent Host 在无交互客户端场景下走普通权限流程会被自动拒绝并终止整个 Host 运行。这是一个影响自动化部署场景的 P2 级问题。
   https://github.com/QwenLM/qwen-code/issues/13157

7. **[#13145] MEMORY.md 索引截断切断了链接目标**（4 评论）
   150 字符截断发生在链接中间，导致 memory 索引条目无法解析。影响长记忆存储场景下的可用性。
   https://github.com/QwenLM/qwen-code/issues/13145

8. **[#13182] Managed Agent 重试循环无终态，投影永久卡死**（4 评论）
   Java Broker 的消息投影可能永久死锁、重试循环缺少终态判断。审计已验证 `main` 分支存在此问题。
   https://github.com/QwenLM/qwen-code/issues/13182

### 🔒 安全与可靠性

9. **[#13180] Managed Agent Broker 认证与写入凭据设计**（4 评论）
   需要设计认证/凭据层：租户身份必须来自认证主体而非客户端自报；Broker 应供应 writer 凭据。由 `@wenshao` 发起，标志着安全加固进入设计阶段。
   https://github.com/QwenLM/qwen-code/issues/13180

10. **[#13078] 每日依赖 CVE 审计失败**（6 评论）
   由 GitHub Actions 自动创建，npm audit 端点不可用或出现新的高危漏洞。CI 健康追踪 Issue，建议关注最新安全动态。
    https://github.com/QwenLM/qwen-code/issues/13078

## 4. 重要 PR 进展（Top 10）

1. **[#13173] fix(managed-agent): 被动接管时采用 Runtime Session**
   Hosted Turn 接管的取消逻辑现在会先获取已死 owner 的 Runtime Session 再读取/释放，避免竞态。`@wenshao` 提交。
   https://github.com/QwenLM/qwen-code/pull/13173

2. **[#13136] fix(managed-hooks): 限制 Hook 准入与冷恢复成本**
   Hook 准入不再读取 Session 的 Hook 历史，冷加载时每个 Hook 资源只读一次，并将关键字段投影为索引列。与 #13132 延迟问题相关。
   https://github.com/QwenLM/qwen-code/pull/13136

3. **[#13174] feat(managed-agent): 采用下一代 Hosted Harness（G3）**
   实现 #12952 的 G3 提案步骤 1 和 2：Hosted Session 不再绑定首次服务的 Harness 进程代际，重启后由 Java 控制平面自动接管下一代。
   https://github.com/QwenLM/qwen-code/pull/13174

4. **[#13192] fix(managed-agent): 保留 writer 与发布 epoch 截止时间**
   修复 JDBC/JVM/数据库时区不一致导致的租赁截止时间错误，在加锁 SQL 查询中评估 writer 活跃度。`@yiliang114` 提交。
   https://github.com/QwenLM/qwen-code/pull/13192

5. **[#13188] fix(cli): 关闭 #13083 评审后的 takeover 发现项**
   落地 #13083（Hosted Turn 接管/G1 故障转移）评审中的 3 个 Critical 发现，每个都有单元测试见证。
   https://github.com/QwenLM/qwen-code/pull/13188

6. **[#13154] fix(web-shell): 阻止内存面板替换无法读取的全局 QWEN.md**
   Web Shell 内存面板改为通过 daemon 的 memory 路由读取全局记忆文件，避免沙箱文件 API 权限问题。
   https://github.com/QwenLM/qwen-code/pull/13154

7. **[#13142] feat(managed-agent): 存储不可变 AgentDefinition 修订（Stage D8a）**
   三个 AgentDefinition 路由（POST/GET/POST by ID），租户隔离、追加式修订、SHA-256 摘要。评审第一轮提出了 19 条建议，正在推进中。
   https://github.com/QwenLM/qwen-code/pull/13142

8. **[#13144] fix(managed-agent): 验证撤销回执并披露备份限制**
   校验持久化 Hosted 撤销回执，拒绝格式错误的身份、重复请求 ID、未知 prompt、不一致的冲突结果等。
   https://github.com/QwenLM/qwen-code/pull/13144

9. **[#12901] fix(core): 让延迟 tool_call 在 Responses provider 上携带参数**
   保持 Responses 请求中自由格式嵌套参数对象开放，并在隐藏延迟工具拒绝空参数时提供直接声明回退。与 #12889 问题相关联。
   https://github.com/QwenLM/qwen-code/pull/12901

10. **[#13179] fix(managed-agent): 强化提交重试、worker 隔离、面板轮询**
    三个稳健性修复：worker 拒绝解析到 workspace 外的相对路径、提交重试机制加固、面板轮询优化，均有新单元测试。
    https://github.com/QwenLM/qwen-code/pull/13179

## 5. 功能需求趋势

从全部 50 条 Issue 中可提炼出以下五个最受关注的功能方向：

1. **Managed Agent 架构深化（占一半以上）**：双路径架构（#12380）、Stage D/G 后续切片、Session 所有权与生命周期、Turn 接管、AgentDefinition 不可变修订、Broker 认证——托管代理由核心团队背书且加速推进中。
2. **上下文与 Token 成本优化**：非对话上下文治理（#12028）、token 变更的 benchmark 验收门（#12333）、Tool schema 延迟加载——社区对 token 支出透明度和可度量优化有明确诉求。
3. **延迟工具（Deferred Tools）可靠性**：空参数问题（#12889）、"使用我替代 X"规则丢失（#12702）、Agent/Goal 默认延迟声明（#13033）——延迟工具的声明、发现、执行闭环正在完善。
4. **安全与凭据管理**：Broker 认证（#13180）、远程连接 allowHttp 降级修复（#13123）、CVE 审计（#13078）——安全加固从"修复漏洞"转向"设计安全架构"。
5. **记忆系统与 Web Shell 体验**：MEMORY.md 截断修复、提取冷却策略（#13004）、Recall 选择器优化（#13003）——记忆效率与 UI 稳定性同步改进。

## 6. 开发者关注点

- **评审上下文偏差（最多痛点）**：大量 follow-up Issue（如 #13187、#13189、#13191）追踪 PR 评审中延迟处理的建议——社区采用"Critical 先合入 + follow-up 收敛"的模式，开发者需持续跟踪多个追踪 Issue 才能掌握全貌。
- **托管会话的可用性问题**：#13157 中"一次越界调用即终止整个 Host 运行"、#13182 中"重试循环永久卡死"——说明 Managed Agent 虽在快速迭代，但边界条件下的可靠性仍有明显短板。
- **记忆文件损坏风险**：#13145 MEMORY.md 链接截断是用户可直接感知的数据损坏问题，与自动提取失败的反馈一致，社区期待更保守的截断策略。
- **CI 健康度反馈**：CVE 审计失败（#13078）、浏览冒烟测试不稳定（#13172）——基础设施稳定性影响社区对项目健康度的信心。
- **deferred tool_call 参数传递**：空的参数对象被模型接受导致运行时错误（#12889、#12901）——说明工具 schema 的强校验机制尚未完全到位，开发者希望"宁可拒绝，不可静默出错"。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*