# AI CLI 工具社区动态日报 2026-09-16

> 生成时间: 2026-09-16 02:12 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-16）

## 1. 生态全景
当前 AI CLI 工具已整体跨越“功能上新”阶段，步入以**稳定性、成本透明度、平台兼容性**为核心的工程化深水区。从六大工具的社区动态来看，**Windows 平台兼容性**（文件锁、沙箱失败、路径序列化）和**内存/性能治理**（OOM、内存膨胀）已成为跨厂商的头号公敌。同时，**计费与配额透明度**（Kimi、OpenAI Codex）和**安全审计**（Claude Code 校验和、Gemini MCP OAuth）正在从少数极客的话题演变为影响付费用户信任度的核心决策因素。值得注意的是，主流大厂（OpenAI、Google、Anthropic）在积极向企业级网关、沙箱隔离和多代理恢复机制靠拢，而开源社区（OpenCode、Qwen）则聚焦于可扩展接口（插件、ACP）和开发者自定义体验。

## 2. 各工具活跃度对比

| 工具 | 今日热点 Issues | 重要 PR 数 | Release 情况 | 迭代烈度 |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI Codex** | 10 个（限流、Windows沙箱、配置隔离） | 10 个（TUI、沙箱、传输限制） | 3 个（均为 alpha 预发布） | ★★★★☆ (高) |
| **Gemini CLI** | 10 个（子代理误报、安全、DevContainer） | 10 个（安全修复、原子写入） | 3 个（正式版/preview/nightly） | ★★★★☆ (高) |
| **Claude Code** | 10 个（Windows 孤儿进程、内存膨胀） | 1 个（diff 钩子优化，已关闭） | 1 个（v2.1.273 网关请求头） | ★★★☆☆ (中) |
| **Qwen Code** | 10 个（4个 P1 级崩溃/回归） | 0 个 | 1 个（cua-driver-rs v0.20.9） | ★★★☆☆ (中) |
| **OpenCode** | 10 个（SystemPrompt 崩溃、UI 回归） | 6 个（性能、插件 API、推理） | 0 个 | ★★★☆☆ (中) |
| **GitHub Copilot CLI** | 10 个（内存溢出、Vim 模式） | 0 个 | 1 个（v1.0.84-9） | ★★☆☆☆ (低) |
| **Kimi Code CLI** | 4 个（配额异常、剪贴板） | 0 个 | 0 个 | ★☆☆☆☆ (极低) |

## 3. 共同关注的功能方向

- **稳定性与资源治理**：**Copilot CLI** 深陷 V8 堆 OOM 崩溃（#4664、#4725），**Claude Code** 上报 macOS 内存飙升至 140GB（#94559），**Gemini CLI** 存在高内存崩溃（#28357），**Qwen Code** 出现 TUI 静默退出（#11500）。这反映出在长会话/多代理场景下，资源回收和压缩机制是所有后端必须补课的环节。
- **定价与配额透明度**：**Kimi Code** 报告 `cache_read` 计费被放大 10 倍（#2626），**OpenAI Codex** 遭遇 5 小时额度 20 分钟耗尽（#45828）及 429 限流阻塞（#38503）。用户对“算力消耗去向”的知情权诉求空前高涨，厂商需要提供更细粒度的计费仪表盘。
- **Windows 平台适配**：**Claude Code** 的孤儿进程（#42776）、**Codex** 的沙箱锁失败（#45153）与路径转义（#41486）、**Gemini** 对受限权限的降级处理（#29163）。Windows 已成为 CLI 工具扩大受众的“必争之地”，但目前显然仍是体验洼地。
- **扩展性与生态开放**：**Claude Code** 承诺数周内交付 Mods 函数钩子（#91870），**OpenCode** 正在扩展插件 API（#46690），**Kimi** 则被要求开放 API 给 PicoClaw 等第三方（#1435）。用户不愿被单一前端捆绑，希望打造自己的 Agent 工作流。
- **安全与凭证管理**：**Gemini** 修复 MCP OAuth 的 RFC 9207 签发者识别及路径穿越漏洞（#29249），**Claude Code** 遭遇应用包无校验和质疑（#94639）。随着 CLI 深入敏感的代码库和云凭证，安全固件正在成为刚需。

## 4. 差异化定位分析

- **Anthropic (Claude Code)**：**企业级基础设施型**。通过新增 LLM 网关请求头（`x-claude-code-request-class`）强化对网关流量的精细化治理，剑指大型企业 AI 接入层。其核心痛点在于桌面端（尤其 Windows）稳定性，技术路线偏重“后台服务化”与“钩子扩展”。
- **OpenAI (Codex)**：**前沿技术先锋型**。迭代凶猛（一日三版），重点投入 TUI 交互细节（会话内模型切换、沙箱同步）和穷尽场景适配。通过多代理恢复、Mermaid 渲染器等 PR 构建极客体验，但其 ChatGPT 账户的限流策略正成为其扩张的“阿喀琉斯之踵”。
- **Google (Gemini CLI)**：**安全合规稳健型**。对 MCP OAuth（RFC 9207）、文件系统原子写入（防数据丢失）、路径遍历漏洞的快速修复，展现出大厂对供应链和代码安全的重视。同时深耕 VS Code 扩展与 Dev Container 集成，更偏向解决工程化环境里的深度痛点。
- **GitHub (Copilot CLI)**：**成熟基建生态型**。迭代速度放缓（无 PR），重心转向降低大库元数据扫描延迟。社区诉求多集中于补齐 Vim 模式、LF/CRLF 处理等长期悬而未决的工程债，明显受制于其庞大的存量代码库与 V8 执行环境的内存天花板。
- **Moonshot (Kimi Code)**：**蛰伏观望型**。动态最少（仅 4 个 Issue），社区反馈聚焦于“配额计费”这一基本盘。技术定位偏向探索第三方接入（PicoClaw），目前尚未形成中国开发者圈层之外的显著声量。
- **OpenCode**：**开源透明 DIY 型**。以插件系统（TUI 命令、会话事件流）和云端算力（Zen 免费模型）为卖点，对“异常 token 消耗”和“自动推理力度”等社区投票强烈的事项响应迅速，践行“社区总是对的”的开源路线。
- **Qwen (Qwen Code)**：**服务化集成型**。重点推进 ACP（Agent Client Protocol）通道和 CUA 驱动（GUI 控制），意图将 CLI 从纯文本终端延伸到桌面操作系统自动化。但目前 P1 级回归（ACP 通道被击穿、/review 读取错误）暴露了其集成复杂度带来的脆弱性。

## 5. 社区热度与成熟度

- **高活跃/快速迭代**：**OpenAI Codex** 和 **Gemini CLI** 处于“火力全开”状态，每日双位数的 PR 合并和频繁的版本发布（含 alpha 验证）表明它们仍处于快速试错期，适合追求新功能的开发者试用，但需容忍潜在的回归。**OpenCode** 虽无版本更新，但 PR 动作密集，且紧密围绕高赞 Issue 修补，社区参与感极强。
- **重点修复/放量验证**：**Claude Code** 和 **Qwen Code** 处于“填坑”阶段。Claude 被 Windows 孤儿进程和大内存占用困扰数月未决，Qwen 则接连出现 P1 级崩溃，两者目前更适合存量成熟用户生产使用，新用户需提前规避已知平台坑。
- **低活跃/慢速稳定**：**GitHub Copilot CLI** 和 **Kimi Code CLI** 处于低速运转，但性质不同。Copilot 作为老牌工具拥有庞大的隐形成本（OOM 问题悬而未决），Kimi 则更像是产品侧停滞，社区讨论多停留在“愿望清单”，缺乏官方强互动。从成熟度看，**Copilot CLI** 最稳定但创新匮乏，**Kimi** 商业逻辑未跑通，**OpenCode** 则是最具潜力的“鲶鱼”型搅局者。

## 6. 值得关注的趋势信号

1.  **“内存”正成为新的算力瓶颈**：当会话容纳超过 100 GiB 的快照（Codex #34268）或 App 内存飙至 140 GB（Claude #94559）时，AI CLI 的竞争将不仅限于模型质量，更在于**上下文压缩算法、高频序列化（JSON）与内存映射的效率**。拥有高效状态管理能力的工具将在长时多任务工作流中胜出。
2.  **网关与代理成为基础层刚需**：Claude Code 新增网关头，Codex 增加 `response_body_limit_bytes`，这揭示了作为**AI 基础设施的中转层（Gateway）**正在被标准化。对于企业架构师而言，在引入 AI CLI 时应提前规划请求分类、上下文压缩追踪和传输限额，而非事后补救。
3.  **“额度饥饿”将倒逼按量计费改革**：Kimi 的 10 倍计费放大和 Codex 的 20 分钟耗尽额度，直接触动了用户的经济利益。如果厂商不能在 UI 上提供实时的 token 花费流水和可感知的“成本护栏”，将直接导致付费用户转向开源或本地模型方案。
4.  **安全即准入门槛（Security as a Gate）**：从 Gemini 的路径穿越修复到 Claude 对应用包校验和的质询，再到 Codex 对不可信模型目录的限制，**供应链安全（SCA）**正在被提高到与代码同等的地位。工具的安全审计透明度和沙箱逃生防护能力，将决定它们能否进入金融、政务等强合规行业。
5.  **“会话可编程性”是下一波生态壁垒**：OpenCode 把会话列表暴露给插件（Telegram bot），Claude 的钩子（Hooks）即将扩展十倍，Codex 也提供了有界 Mermaid 渲染器。**AI CLI 不再是单向聊天窗口，而是逐渐演化为可被外部进程编排的操作系统**。开发者应关注各工具是否提供 Stable 的进程内 API，以保障自己的自动化脚本不被频繁破坏。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

基于 `anthropics/skills` 仓库数据（截至 2026-09-16），以下为 Claude Code Skills 社区热点分析。

## 1. 热门 Skills 排行

以下 PR 位于按评论排序的前列，均为较受关注的新增或修复型 Skill。

- **skill-creator 触发器评估修复（#1298）**  
  功能：修复 `skill-creator` 在触发条件评估时的误报、漏报问题，并兼容 Windows 管道失败与运行时异常。  
  讨论热点：触发评估的可靠性、跨平台兼容性、负例验证逻辑。  
  状态：Open  
  https://github.com/anthropics/skills/pull/1298

- **md2video-audio：Markdown 转视频/配音（#1703）**  
  功能：将 Markdown 文档经 Marp 转为演示文稿，并生成带拟人配音的 MP4 视频，且宣称零额外成本。  
  讨论热点：内容生成新形态、视频与音频合成、低成本工作流。  
  状态：Open  
  https://github.com/anthropics/skills/pull/1703

- **mcp-builder 兼容 mcp>=2（#1742）**  
  功能：修复 MCP Builder 在 `mcp>=2.0.0` 下的 `streamable_http_client` 导入路径和自定义 Header 配置问题。  
  讨论热点：MCP SDK 破坏性变更、连接配置兼容性。  
  状态：Open  
  https://github.com/anthropics/skills/pull/1742

- **document-typography：文档排版质量控制（#514）**  
  功能：检测 AI 生成文档中的孤字、孤儿标题、编号错位等排版问题。  
  讨论热点：AI 文档的排版质量、输出专业性。  
  状态：Open  
  https://github.com/anthropics/skills/pull/514

- **Pyxel：复古游戏开发 Skill（#525）**  
  功能：基于 Python Pyxel 引擎创建、调试和验证复古风格游戏，支持无头运行和逐帧检查。  
  讨论热点：游戏开发确定性验证、创意编程与 Agent 结合。  
  状态：Open  
  https://github.com/anthropics/skills/pull/525

- **ODT：OpenDocument 文档处理（#486）**  
  功能：创建、填充、读取 ODT/ODS 文件，并可解析为 HTML。  
  讨论热点：开放文档格式支持、LibreOffice 生态集成。  
  状态：Open  
  https://github.com/anthropics/skills/pull/486

- **Hivemind：多 Agent 编排 Skill（#1628）**  
  功能：让 Claude Code 作为规划/审查者，将机械工作委托给 headless opencode worker，节省上下文与成本。  
  讨论热点：多 Agent 协作、上下文成本优化、免费模型集成。  
  状态：Open  
  https://github.com/anthropics/skills/pull/1628

## 2. 社区需求趋势

从 Issues 看，社区最集中的诉求可分为四类：

- **安全与信任边界**  
  #492 指出社区 Skill 被分发在 `anthropic/` 命名空间下，存在冒充官方 Skill、诱导用户授权高权限的风险；#1175 关注 SharePoint Online 场景下 SKILL.md 中写入权限逻辑的安全问题。  
  https://github.com/anthropics/skills/issues/492  
  https://github.com/anthropics/skills/issues/1175

- **Skill 可发现性、安装与组织共享**  
  #228 期望 Skill 支持组织级直接共享，而不是手动下载上传；#189 反映两个插件安装重复内容导致上下文重复；#62 报告 Skill 文件消失。  
  https://github.com/anthropics/skills/issues/228  
  https://github.com/anthropics/skills/issues/189  
  https://github.com/anthropics/skills/issues/62

- **评估与调试工具链可靠性**  
  #556 反馈 `run_eval.py` 中所有查询触发率为 0%；#1390 指出 mcp-builder 评估脚本对真实 MCP 服务器打分全为 0；#202 认为 skill-creator 本身写得像开发文档而非可执行 Skill。  
  https://github.com/anthropics/skills/issues/556  
  https://github.com/anthropics/skills/issues/1390  
  https://github.com/anthropics/skills/issues/202

- **上下文窗口与成本效率**  
  #1487 报告 `claude-api` Skill 一次性注入约 156k tokens，直接耗尽上下文窗口；#1329 提出 `compact-memory` Skill，用符号化记法压缩长期 Agent 的持久记忆。  
  https://github.com/anthropics/skills/issues/1487  
  https://github.com/anthropics/skills/issues/1329

此外，社区也在提出新方向 Skill：#412 Agent 治理/安全模式、#1385 推理质量门禁流水线、#16 将 Skills 暴露为 MCP 工具、#29 支持 AWS Bedrock 使用。  
https://github.com/anthropics/skills/issues/412  
https://github.com/anthropics/skills/issues/1385  
https://github.com/anthropics/skills/issues/16  
https://github.com/anthropics/skills/issues/29

## 3. 高潜力待合并 Skills

以下 PR 仍为 Open，但社区关注度和话题性高，有可能近期落地：

- **md2video-audio（#1703）**  
  将 Markdown 直接转为带配音 MP4 视频，属于低成本内容生产的新领域；最近更新于 2026-09-15，活跃度高。  
  https://github.com/anthropics/skills/pull/1703

- **Hivemind 多 Agent 编排（#1628）**  
  提出“贵模型做规划、免费模型做执行”的协作模式，直击上下文与成本痛点。  
  https://github.com/anthropics/skills/pull/1628

- **Buffer API Agent Skill（#1627）**  
  将 Buffer GraphQL API 封装为可移植 Agent Skill，覆盖社交内容排期、管理与分析，面向多 Agent 通用场景。  
  https://github.com/anthropics/skills/pull/1627

- **Pyxel 复古游戏开发（#525）**  
  由 Pyxel 作者提交，包含确定性 headless 验证方案，兼顾创意与可测试性；2026-09-15 有更新。  
  https://github.com/anthropics/skills/pull/525

- **document-typography 排版质量（#514）**  
  解决 AI 生成文档普遍存在的排版问题，适用范围广，若合并可能成为文档类 Skill 的基础能力。  
  https://github.com/anthropics/skills/pull/514

- **mcp-builder 兼容性修复（#1742）**  
  修复 MCP SDK 新版本的破坏性变更，属于生态维护型 PR，影响面明确。  
  https://github.com/anthropics/skills/pull/1742

## 4. Skills 生态洞察

社区当前最集中的诉求不是“更多新 Skill”，而是让 Skill 的发现、评估、安全与上下文效率变得可信任、可测量、可治理——即整个生态正从“能跑”走向“可靠”。

---

# Claude Code 社区动态日报（2026-09-16）

## 今日速览

- **v2.1.273 发布**，新增面向 LLM 网关的细粒度请求头（需 `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` 开启），便于网关侧做请求分类与上下文压缩追踪。
- **Windows 桌面版启动/更新问题仍是社区最大痛点**：#42776、#53247、#89680 等高热度 issue 持续增长评论，累计影响大量用户。
- **新增长尾问题值得警惕**：macOS 桌面版内存涨至 131–140 GB（#94559）、应用包缺少校验和（#94639），或引发新一轮稳定性与安全讨论。

## 版本发布

### v2.1.273
- 为 LLM 网关新增请求头：`x-claude-code-request-class`、`x-claude-code-agent-type`、`x-claude-code-prev-tool-durations`、`x-claude-code-compaction`、`x-claude-code-context-compacted`。
- 上述请求头需通过环境变量 `CLAUDE_CODE_GATEWAY_HINT_HEADERS=1` 启用（默认关闭）。
- 新增一条通知提醒（变更说明被截断，细节待补充）。

## 社区热点 Issues

以下按评论热度与关注度筛选出 10 个值得关注的 issue：

1. **[#42776] Claude Code Desktop 在 Windows 上无法重启（孤儿进程文件锁）**
   - 评论 190 | 👍 89 | 已开启 5 个月
   - 长时间未解决的高频问题，Windows 用户重启应用持续受阻。
   - https://github.com/anthropics/claude-code/issues/42776

2. **[#91870] Mods：让 Claude Code 扩展性提升十倍**
   - 评论 183 | 👍 113
   - 官方在 issue 中承诺“数周内”交付函数钩子，是插件/钩子生态的关键节点，社区讨论非常活跃。
   - https://github.com/anthropics/claude-code/issues/91870

3. **[#36151] 移动端支持多账户切换（不依赖共享邮箱）**
   - 评论 182 | 👍 726（今日最高赞）
   - 高票需求，反映多账户/多身份工作流已是普遍诉求。
   - https://github.com/anthropics/claude-code/issues/36151

4. **[#85891] Windows 桌面端主窗口始终置顶，无法关闭**
   - 评论 103 | 👍 256
   - 影响日常多窗口协作，已有 Windows 11 用户大量反馈。
   - https://github.com/anthropics/claude-code/issues/85891

5. **[#53247] Windows 启动失败：孤儿 Silo/Job Object，需重启或注销才能恢复**
   - 评论 86 | 👍 33
   - 与 #42776 同根因族，崩溃后残留对象导致 HRESULT 0x80070020。
   - https://github.com/anthropics/claude-code/issues/53247

6. **[#89680] Windows 桌面版静默更新遗留孤儿进程，新版本无法启动**
   - 评论 19
   - 隐性更新策略引发可用性问题，用户对更新流程的透明性提出质疑。
   - https://github.com/anthropics/claude-code/issues/89680

7. **[#94559] macOS 桌面版内存膨胀至 131–140 GB，系统冻结**
   - 评论 1（新提交，含复现步骤）
   - 严重性能问题：同一台机器上 CLI 内存仅 200 MB 以下，差异异常。
   - https://github.com/anthropics/claude-code/issues/94559

8. **[#94639] 桌面应用安装的 claude.app 无校验和，且包含 CLI 所不具备的权限**
   - 评论 2（新提交）
   - 安全相关：用户无法验证该应用包的完整性，权限面扩大但无公开审计。
   - https://github.com/anthropics/claude-code/issues/94639

9. **[#93683] 系统指令被注入每个工具结果，覆盖用户显式要求且无法关闭**
   - 评论 6
   - 模型行为被隐藏指令干扰的问题，涉及指令优先级与可控性。
   - https://github.com/anthropics/claude-code/issues/93683

10. **[#94620] 请求：内置跨平台方式列出运行中的会话及状态**
    - 评论 4（新提交）
    - 开发者需要编程式感知“是否有会话在等待输入”，当前无官方 API。
    - https://github.com/anthropics/claude-code/issues/94620

## 重要 PR 进展

过去 24 小时 PR 活动较少，仅观察到 1 个 PR：

1. **[#94594] diff：改为内置面板运行时才执行 git，而非会话启动时**
   - 作者：@poteat | 状态：已关闭
   - 背景：`mods/diff` 原先在 `session.start` 钩子中主动执行 `git rev-parse` 和全量 `git status`，引擎会等待该钩子完成才发送首个 prompt，导致大仓库启动卡顿。
   - 修复：将 git 执行时机延后到与内置 diff 面板一致，避免阻塞会话启动。
   - https://github.com/anthropics/claude-code/pull/94594

## 功能需求趋势

从近期 Issues 中提炼出社区最关注的几个方向：

-

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-16）

## 今日速览

今日社区动态集中在 **Windows 平台稳定性修复** 与 **TUI/沙箱体验改进**：10 余个 PR 密集合并，涉及 Windows 沙箱配置、WSL 终端探测、路径序列化等长期痛点；同时多个新 issue 报告 ChatGPT 账户 **额度快速耗尽与"模型容量已满"** 提示，成为新的高频反馈区域。多代理会话存储膨胀（>100 GiB）问题已关闭，但 Windows 上的浏览器控制与 sandbox 故障依然是最大的 issue 来源。

## 版本发布

过去 24 小时发布了三个 Rust 滚动版本，均为 alpha 预发布，未附带详细变更说明：

- [`rust-v0.155.0-alpha.9`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.9)
- [`rust-v0.155.0-alpha.8`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.8)
- [`rust-v0.155.0-alpha.7`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.7)

## 社区热点 Issues（10 个）

### 1. ChatGPT 网页版 "Too many requests" 阻塞聊天与 Work 任务 ✅ 热度最高
[#38503](https://github.com/openai/codex/issues/38503) — `[bug, codex-web, rate-limits, app]` | 评论 24 | 👍 17

用户报告 ChatGPT 网页端反复弹出"Too many requests"模态框，不仅影响普通聊天，还终止了后台 Work 任务。该 issue 自 8 月 14 日创建以来持续更新，是当前**评论数最多**的问题，说明网页端的限流策略对高频使用者的影响面很大。

### 2. Supabase MCP 反复要求重新认证
[#13852](https://github.com/openai/codex/issues/13852) — `[bug, auth, mcp]` | 评论 21 | 👍 0

OAuth token 刷新失败导致 Supabase MCP 服务器在每次初始化时都要求重新登录。该问题已存在数月，与 MCP 工具调用链的凭证缓存机制有关，是 MCP 生态中**认证流程不完善**的一个典型代表。

### 3. Windows 上 Chrome 控制失败：nodeRepl.fetch request failed
[#44135](https://github.com/openai/codex/issues/44135) — `[bug, windows-os, app, browser]` | 评论 18 | 👍 4

浏览器控制工具在 Windows 上检测到了 Chrome，但列出标签页时抛出 `nodeRepl.fetch request failed`。同会话中应用内浏览器可以正常工作，Edge 也无法通过控制工具打开。重新安装扩展与 native host 均未解决。映出 Windows 桌面端浏览器自动化的桥接层仍不稳定。

### 4. 配置污染：将 `projects.xxxx.trusted_level` 从 config.toml 中拆分（高赞）
[#14601](https://github.com/openai/codex/issues/14601) — `[enhancement, config]` | 评论 17 | 👍 79

**全站点赞最高的 issue**。用户要求将项目信任级别从全局 `config.toml` 中分离，避免首次打开项目时的审批状态被持久化污染共享配置。反馈强烈反映了开发者对配置隔离和可预测性的重视。

### 5. GPT-6 Astra 拒绝 `hi`：invalid_prompt 错误在 Linux/macOS 复现
[#43237](https://github.com/openai/codex/issues/43237) — `[bug, model-behavior, CLI, Linux]` | 评论 16 | 👍 1

在 CLI 0.153.4（Linux 独立 musl 构建）上，向 GPT-6 Astra 发送最简单的 `hi` 也会得到 `invalid_prompt` 错误。用户已缩小到 CLI 与后端的最小复现路径，怀疑是模型行为与提示词格式校验的回归。

### 6. 多代理 V2 全历史分支导致会话存储膨胀 >100 GiB ✅ 已关闭
[#34268](https://github.com/openai/codex/issues/34268) — `[bug, context, app, subagent, session]` | 评论 16 | 👍 7

使用 Ultra 推理和多代理 V2 的长时间会话产生了约 110 GiB 本地数据，根因是**历史分支重复保存压缩快照与内嵌图片**，存储增长呈乘法而非累加。该问题今日已关闭，说明修复已合入，但 110 GiB 的教训值得开发者关注会话目录的大小治理。

### 7. Windows 路径文本序列化错误：`Z:\AREA_01` → `Z:\AREA\_01`
[#41486](https://github.com/openai/codex/issues/41486) — `[bug, windows-os, app]` | 评论 11 | 👍 8

桌面应用 UI 显示正确，但发送给模型的内容把 `Z:\AREA_01` 变成了 `Z:\AREA\_01`。属于客户端文本序列化的低级 bug，会让模型误解文件路径，Windows 用户在高下划线目录名场景下容易踩中。

### 8. `gpt-5.3-codex-spark` 无法在 ChatGPT 账户下使用
[#17642](https://github.com/openai/codex/issues/17642) — `[bug, auth, CLI]` | 评论 15 | 👍 0

使用 ChatGPT 订阅（Pro）在 CLI 中选择 `gpt-5.3-codex-spark` 会收到 `invalid_request_error`。模型与订阅类型的权限映射问题已存在近 5 个月，仍在持续收到反馈，说明模型选择器在账户类型校验上还需更清晰的提示。

### 9. Windows：所有 shell 命令失败 → `helper_sandbox_lock_failed`（错误码 5）
[#45153](https://github.com/openai/codex/issues/45153) — `[bug, windows-os, sandbox, app]` | 评论 8 | 👍 1

Windows 桌面版 26.908.40834 上，包括只读命令在内的所有本地 shell 调用在执行前即告失败，报 `helper_sandbox_lock_failed`。沙箱锁竞争是 Windows 上反复出现的故障模式，已影响到基础命令执行能力。

### 10. 新爆发：5 小时额度窗口在 2 个请求 / 20 分钟内耗尽
[#45828](https://github.com/openai/codex/issues/45828) — `[bug, rate-limits, CLI]` | 评论 2 | 👍 0

今日新建 issue，反映 CLI 0.154.0（Plus 订阅）下 GPT-6 模型消耗额度异常快，**5 小时的窗口在约 20 分钟内就被用完**，并指名是 9 月 9 日同类问题的重演。配合 [#45835](https://github.com/openai/codex/issues/45835)（"模型容量已满"反复出现），表明**限流策略与额度计算今天是社区的主要不满点**。

---

## 重要 PR 进展（10 个）

### 1. TUI 支持仅对当前会话选择模型与推理强度
[#45831](https://github.com/openai/codex/pull/45831) — ⚡ 今日合并

新增 `s` 快捷键，可只修改当前会话的模型和 reasoning effort，而不污染已保存的默认配置。这是对高赞 issue #26472（模型选择不应持久化到 config）的直接回应。

### 2. TUI 兼容 app-server 的 Windows 沙箱配置
[#45830](https://github.com/openai/codex/pull/45830) — ⚡ 今日合并

修复 TUI 的 `thread/settings/update` 忽略 Windows 沙箱 turn-context 覆盖的问题，改从 app-server 的有效配置中获取沙箱状态，而非本地配置。配套 PR：
- [#45821](https://github.com/openai/codex/pull/45821) 使用 app-server 状态做 Windows 沙箱决策
- [#45813](https://github.com/openai/codex/pull/45813) 跟踪 Windows 沙箱策略与每线程执行器宿主

三者构成 **Windows 沙箱在 TUI 桌面场景下的一致行为闭环**。

### 3. 时钟读取失败改为可选非致命错误
[#45825](https://github.com/openai/codex/pull/45825)

新增 `features.nonfatal_clock_read_failures` 开关；时钟 provider 失败时不再中止整个 turn，而是显式告知"当前时间不可用"后继续执行。

### 4. HTTP 传输支持响应体大小限制
[#45822](https://github.com/openai/codex/pull/45822)

为 buffered/streaming 响应增加可选的 `response_body_limit_bytes`，防止从 provider 拉取不受信任的模型目录时耗尽内存。对构建网关/代理的开发者是重要防护能力。

### 5. 托管守护进程重启后自动恢复未完成任务
[#45820](https://github.com/openai/codex/pull/45820)

守护进程恢复后，自动从保存的会话中尝试一个续接 turn，无需等待客户端连接。配套：
- [#45807](https://github.com/openai/codex/pull/45807) 在恢复快照中记录中断的 turn 及其选项

### 6. 新增有界 Mermaid 文本渲染器 `codex-mermaid`
[#45817](https://github.com/openai/codex/pull/45817)

独立 crate，支持 flowchart、sequence、state、class、ER 图子集渲染为 Unicode 文本；提供 `render`（纯文本）与 `render_spans`（语义节点/边/文本跨度）。让 TUI/CLI 可以在不拉起图形渲染器的情况下可视化 Mermaid 图。

### 7. Responses 请求支持 Workspace 路由
[#45812](https://github.com/openai/codex/pull/45812)

`AuthManager` 增加可选 `WorkspaceRoutingResolver`，将 session

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-16

## 今日速览

今日共发布 3 个版本（含 1 个正式版 v0.60.0、1 个 preview 版和 1 个 nightly 版），核心修复集中在 Web fetch 目的地验证、MCP OAuth 安全（RFC 9207）与 Agent 循环上下文保持。社区方面，子代理在达到 MAX_TURNS 后被误报为 GOAL 成功的 bug（#22323）成为讨论焦点；与此同时，多个关于 Auto Memory 安全、Shell 执行卡顿、VS Code Dev Container 配置加载失败的 Issue 持续发酵，显示稳定性和安全性仍是用户最关心的主题。

---

## 版本发布

### v0.60.0（正式版）
- **fix(core):** 改进 web fetch 工具中的目的地验证与连接路由（PR #29120）
- **fix(core):** 在 MCP OAuth 流程中强制实施 RFC 9207 签发者识别（PR #29127）
- 链接: https://github.com/google-gemini/gemini-cli/releases

### v0.61.0-preview.0
- 主要为 v0.60.0-preview.0 的 changelog 补录及版本号升级，无用户可见的功能变更。
- 链接: https://github.com/google-gemini/gemini-cli/releases

### v0.62.0-nightly.20260916.g6a466a7e2
- **fix(core):** 确保 AgentLoopContext 属性在对象展开后保持不变（PR #29335）
- **fix(a2a-server):** tasks metadata 端点对不支持的 store 增加提前返回逻辑
- 链接: https://github.com/google-gemini/gemini-cli/releases

---

## 社区热点 Issues（10 个）

### 1. Subagent recovery 在 MAX_TURNS 后被误报为 GOAL 成功 ⚠️ 高优先级
- **#22323** | 评论 13 | 👍 2
- 现象：`codebase_investigator` 子代理已触发最大轮次限制，但最终结果仍标记为 `success` / `GOAL`，真实原因（被中断）被完全掩盖。开发者无法判断子代理是否真正完成任务。
- 链接: https://github.com/google-gemini/gemini-cli/issues/22323

### 2. 评估 AST 感知的文件读取、搜索与代码库映射可行性
- **#22745** | 评论 7 | EPIC
- 核心价值：利用 AST 精确读取方法边界，减少上下文中无关 token 噪音、降低对齐读取的轮次消耗，并进一步用于代码库映射。
- 链接: https://github.com/google-gemini/gemini-cli/issues/22745

### 3. VS Code Dev Container 中无法加载 .gemini/settings.json
- **#28399** | 评论 6
- 在 Dev Container 内运行时，workspace 级别的 `.gemini/settings.json` 被完全忽略，导致工作区特定配置失效。这是 IDE 集成场景下的常见痛点，影响面较大。
- 链接: https://github.com/google-gemini/gemini-cli/issues/28399

### 4. 首次运行在 Node v18.20.4 下直接崩溃
- **#28114** | 评论 6
- 新用户在旧版 Node（v18.20.4）上运行 `gemini` 命令即崩溃，说明缺少显式的 Node 版本检查，入门体验受影响。
- 链接: https://github.com/google-gemini/gemini-cli/issues/28114

### 5. Gemini 不会主动使用自定义 skills 和 sub-agents
- **#21968** | 评论 6
- 用户反馈：即使已配置好 `gradle`、`git` 等技能及子代理，Gemini 在相关场景下仍不会自动调用，只有显式指示才会执行。这削弱了 Skills/Agent 机制的实际价值。
- 链接: https://github.com/google-gemini/gemini-cli/issues/21968

### 6. 高内存占用导致进程崩溃（P1）
- **#28357** | 评论 4
- 用户报告内存占用过高引发崩溃，要求附带导出的聊天历史 JSON 以辅助排查。属于影响稳定性的重要 bug。
- 链接: https://github.com/google-gemini/gemini-cli/issues/28357

### 7. Shell 命令执行完成后卡在 "Waiting input"
- **#25166** | 👍 3 | 评论 4
- 即使是非常简单的 CLI 命令（不会等待输入），也会在命令完成后持续显示 "Awaiting user input"，导致流程卡死。多个用户可以复现。
- 链接: https://github.com/google-gemini/gemini-cli/issues/25166

### 8. Auto Memory 存在敏感信息泄漏风险：确定性脱敏缺失
- **#26525** | 评论 5 | 维护者锁定
- 问题：Auto Memory 会在脱敏前将本地 transcript 内容发送至模型上下文，且部分 Skill 内容可能被日志记录。社区对隐私与安全设计表示担忧。
- 链接: https://github.com/google-gemini/gemini-cli/issues/26525

### 9. Browser Agent 在浏览器 profile 锁定时 fail-fast，缺少自动接管
- **#22232** | 评论 4
- 当 `sessionMode: 'persistent'` 遇到已锁定的浏览器 profile 时，Browser Agent 直接失败退出，建议增强为自动会话接管与锁恢复，提升鲁棒性。
- 链接: https://github.com/google-gemini/gemini-cli/issues/22232

### 10. 工具数量超过 128 个时报 400 错误
- **#24246** | 评论 3
- 当可用工具超过 400 个（上下文环境中的工具数量过多）时，Gemini CLI 直接返回 400 错误。用户期望 Agent 能根据启用范围动态裁剪工具集，而不是全量上报。
- 链接: https://github.com/google-gemini/gemini-cli/issues/24246

---

## 重要 PR 进展（10 个）

### 1. 修复 `get_internal_docs` 路径遍历的同级前缀绕过（安全）
- **#29249** | 开放中
- 原路径守卫仅对字符串前缀做比较，无路径组件边界，导致同名前缀的兄弟目录可越权读取文件。这是一个真实可利用的路径穿越漏洞修复。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29249

### 2. 使工具文件写入原子化并序列化同路径写入（防丢数据）
- **#29244** | 开放中
- 并行工具执行时，多个 `replace` 调用可同时作用于同一文件，先读后写导致后写覆盖先写的修改，且两个 tool call 都报告成功。此 PR 引入原子写入与同路径序列化，防止数据静默丢失。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29244

### 3. 修复 macOS Seatbelt/受限权限环境下启动崩溃
- **#29163** | 已合并
- 在 macOS Seatbelt 或受限权限的 Git 仓库中运行时，`useGitBranchName` 钩子会崩溃。该 PR 增加了对受保护 .git 目录的降级处理。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29163

### 4. 修复 Shell 执行中将用户 git config 置空的问题
- **#29156** | 已合并
- `ShellExecutionService` 将 `GIT_CONFIG_GLOBAL` 和 `GIT_CONFIG_SYSTEM` 指向 `/dev/null`，导致所有 shell 工具命令丢失用户的 `user.name`、`user.email` 等全局配置。该 PR 移除了这一行为。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29156

### 5. 修复 isEmpty() 对 BOM 编码文件的错误解码
- **#29155** | 已合并
- `isEmpty()` 检测到 BOM 后仍按 UTF-8 解码采样字节，导致 UTF-16/UTF-32 编码的空白 plan 文件被判定为非空，进而触发意外的校验错误。现在会按实际 BOM 编码解码。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29155

### 6. Skill 优先级与激活状态改为大小写不敏感
- **#29151** | 已合并
- `SkillManager` 中 workspace skill 覆盖内置/扩展 skill 的优先级映射，以及激活状态追踪，在 skill 名称大小写不一致时会失效。现统一为大小写不敏感比较。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29151

### 7. VS Code 扩展：关闭 diff 标签页时保持终端焦点
- **#29349** | 开放中 | help wanted | size/xl
- 修复 #22193：用户在 VS Code 中批准/拒绝文件编辑后，焦点从 diff 预览回到终端时丢失。改完后可支持连续多文件编辑的无缝流转。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29349

### 8. OAuth refresh token 刷新时保留 + 幂等删除凭据
- **#29339** | 开放中 | P1
- 修复 GH-21691：旧版 OAuth 在 token 刷新时丢失 refresh_token，导致用户陷入重复认证死循环。此 PR 同时使凭据删除具备幂等性。
- 链接: https://github.com/google-gemini/gemini-cli/pull/29339

### 9. 防御 UI 组件中的负值布局维度
- **#29347** | 开放中 | 维护者锁定
- 为 `renderBorder` 及字符串重复逻辑增加 `Math.max(0, Math.floor(...))` 钳

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## GitHub Copilot CLI 社区动态日报 — 2026-09-16

### 今日速览

今日发布 v1.0.84-9，针对大型会话历史的元数据扫描做了提速，并新增 `/settings` 选项以按需启用 agents 与 subagents 的上下文管理工具。Issue 方面，OOM 崩溃与大型会话恢复类问题仍是社区讨论的绝对焦点；同时，长期高票的 Vim 输入模式功能请求（#13）依旧备受关注。

---

### 版本发布

**v1.0.84-9**

- **Added**：新增 `/settings` 选项，可选择为 agents 和 subagents 启用上下文管理工具。
- **Improved**：减少大型本地会话历史记录的元数据扫描耗时（伴随线程与内存占用上升）。
- **Fixed**：修复 `End` 与 `Ctrl+E` 在换行时无法将光标移动到真正行尾的问题。

🔗 发布详情：https://github.com/github/copilot-cli/releases

---

### 社区热点 Issues

以下为过去 24 小时内更新且最值得关注的 10 个 Issue：

1. **CLI 输入应支持 vi/vim 模式** · #13  
   创建于 2025-09-25，更新于 2026-09-15 · 76👍 | 13💬  
   该 Issue 已关闭，但 76 个 👍 表明社区对模态编辑器的键盘驱动操作需求强烈，是呼声最高的功能请求之一。  
   🔗 https://github.com/github/copilot-cli/issues/13

2. **应全面集成并利用 VS Code Copilot Chat 的既有能力** · #54  
   创建于 2025-09-26，更新于 2026-09-15 · 20👍 | 13💬  
   用户希望 CLI 可作为 VS Code Copilot Chat 的批处理接口，复用项目级配置；已关闭但仍引起大量讨论，反映 IDE-CLI 协同工作流的诉求。  
   🔗 https://github.com/github/copilot-cli/issues/54

3. **恢复长时间运行的会话时，JavaScript 堆内存溢出导致崩溃** · #4664  
   更新于 2026-09-15 · 2👍 | 8💬  
   在恢复大型会话时触发 V8 堆 OOM，进程在继续操作前即崩溃。元数据扫描优化（新版本）或可缓解，但根本问题仍待解决。  
   🔗 https://github.com/github/copilot-cli/issues/4664

4. **Windows 平台：Copilot CLI 将 LF 行尾改写为 CRLF** · #1148  
   更新于 2026-09-15 · 8👍 | 7💬  
   任何经 Copilot 编辑的文件都会被强制转换为 CRLF，影响 Windows 上使用 LF 的工程，属于平台相关的高频痛点。  
   🔗 https://github.com/github/copilot-cli/issues/1148

5. **`disable-model-invocation: true` 导致技能无法被显式调用** · #4438  
   更新于 2026-09-15 · 7👍 | 6💬  
   项目技能在前端标注禁用模型调用后，用户在 CLI 中显式请求也报 "Skill not found"，与"手动仅限"的预期行为不符。  
   🔗 https://github.com/github/copilot-cli/issues/4438

6. **Linux 平台频繁发生 JavaScript 堆内存溢出** · #4725  
   更新于 2026-09-15 · 1👍 | 6💬  
   进程每隔数分钟即崩溃，Mark-Compact 阶段内存接近 4GB 上限。稳定性问题在 Linux 环境下尤为突出。  
   🔗 https://github.com/github/copilot-cli/issues/4725

7. **子代理工作流延迟与审查循环开销过大** · #4849  
   创建于 2026-09-15 · 0👍 | 5💬  
   子代理启动、任务切换、审查/修复/复审往返耗时以分钟计，让中型代码改动变得难以忍受，直指性能瓶颈。  
   🔗 https://github.com/github/copilot-cli/issues/4849

8. **`explore` 工具硬编码为 `gpt-5.4-mini`，绕过自定义/DeepSeek API 配置** · #3954  
   更新于 2026-09-15 · 3👍 | 4💬  
   Agent 调用 `explore` 时忽略用户自定义模型配置，强制传递 `gpt-5.4-mini`，破坏自定义服务接入。  
   🔗 https://github.com/github/copilot-cli/issues/3954

9. **v1.0.74 回归：恢复大会话 OOM / 单核 CPU 满载约 70 分钟** · #4251  
   更新于 2026-09-15 · 1👍 | 4💬  
   通过 A/B 对比定位回归：同一会话从 1.0.73 升至 1.0.74 后，内存峰值约增 3–4 倍，恢复操作近乎不可用。  
   🔗 https://github.com/github/copilot-cli/issues/4251

10. **插件自动更新（全部或按插件）** · #2734  
    更新于 2026-09-15 · 13👍 | 3💬  
    用户期望插件可从市场自动更新，减少手动检查和运行过期版本的风险。功能设计尚在讨论中。  
    🔗 https://github.com/github/copilot-cli/issues/2734

---

### 重要 PR 进展

过去 24 小时内无 PR 提交或合并活动。

---

### 功能需求趋势

从近期 Issue 中可提炼出以下社区最关注的方向：

- **输入与终端体验**：Vim 模式（#13）、Warp 终端的主题色自适应（#4843）、表单场景下 Ctrl-D 行为一致性（#4866）。
- **会话/上下文管理**：大型会话的恢复与压缩机制，OOM 保护与内存泄漏修复（#4664、#4251、#4699、#4725）。
- **子代理工作流效率**：启动延迟、任务交接、审查循环开销的优化呼声强烈（#4849、#4850）。
- **模型与配置灵活性**：自定义模型/API 配置必须被端到端尊重，杜绝硬编码（#3954）。
- **IDE 与生态集成**：与 VS Code Copilot Chat 的深度融合（#54）、MCP 服务器的可用性与 OAuth 回调端口问题（#4552、#4800、#4793）。
- **企业策略与安全**：面向 CLI 沙箱的 yolo 模式企业策略范围（#4783）、沙箱策略对特定命令的强制执行（#4846）。
- **插件生命周期管理**：自动更新、server-managed marketplace 的实际注册问题（#2734、#4556）。

---

### 开发者关注点

- **内存/OOM 问题成为头号公敌**：多个 Issue 指向 4GiB 堆上限附近的崩溃、压缩循环导致的永久不可恢复

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-09-16）

## 今日速览

过去 24 小时无版本发布、无 PR 更新。社区讨论热点集中在付费订阅用户的配额异常消耗问题（#2626），以及 macOS 剪贴板图片兼容（#1433）、会话标题自动命名（#2646）和第三方 Agent API 接入（#1435）。其中 #2626 直接监控 Kimi Coding Plan 的计费健康度，最值得关注。

## 社区热点 Issues

今日有更新的 Issue 共 4 条，未达 10 条，全部列出如下。

### 1. #2626 [OPEN] 配额异常消耗：cache_read 每次轮询计费但 cache_creation 始终为 0（超过 10 倍放大）
- 作者：@ahmadyaseen35-coder
- 创建：2026-08-29 | 更新：2026-09-15 | 评论：2 | 👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2626

**重要性**：这是一个直接影响付费用户体验的计费异常问题。付费用户反馈在 2026-08-28 晚间，5 小时配额窗口在“轻度使用几分钟内”就被消耗了约 40%。CLI 日志显示 `cache_read` 持续被计费，但 `cache_creation` 始终为 0，疑似缓存命中计费逻辑出现循环放大，最高超过 10 倍。该问题已持续半个月且仍处于 OPEN 状态，社区关注度高。

**社区反应**：有 2 条评论跟进，但尚未看到官方修复确认。建议使用 Kimi Coding Plan 的用户关注后续 release 说明。

### 2. #1433 [CLOSED] macOS 上图片粘贴仅支持 Ctrl + V，忽略 Cmd + V
- 作者：@ringotypowriter
- 创建：2026-03-13 | 更新：2026-09-15 | 评论：2 | 👍：1
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1433

**重要性**：Kimi Code CLI 在 macOS 下处理剪贴板图片时只识别 `Ctrl+V`，不符合 macOS 用户习惯的 `Cmd+V`。对于大量使用终端粘贴截图的开发者，这是一个明确的交互缺陷。Issue 状态为 CLOSED，可能已修复，但因昨日有更新记录，仍建议 Mac 用户验证当前版本。

**社区反应**：2 条评论、1 个 👍，说明 macOS 用户确实关心此问题。

### 3. #2646 [OPEN] 功能建议：Kimi Work 会话标题自动加创建日期前缀（YYYYMMDD）
- 作者：@GH-Mason
- 创建：2026-09-15 | 更新：2026-09-15 | 评论：0 | 👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2646

**重要性**：该请求希望 Kimi Work / Kimi Desktop 在新建会话时自动给标题加 `YYYYMMDD` 前缀，便于按日期管理和检索大量对话。这不是严格意义上的 CLI 问题，提交者已说明按先例提交到本仓库，希望官方转给 Kimi Work 团队。反映了用户对会话管理可识别性的需求。

**社区反应**：暂无评论，属于早期反馈。

### 4. #1435 [CLOSED] 功能请求：为 Kimi For Coding API 增加 PicoClaw 支持
- 作者：@clawaizhang
- 创建：2026-03-14 | 更新：2026-09-15 | 评论：0 | 👍：0
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1435

**重要性**：用户希望将 Kimi For Coding 订阅用于 [PicoClaw](https://github.com/sipeed/picoclaw) 这一开源 AI Agent 项目，但当前 API 限制导致无法接入。这说明第三方 Agent 工具对 Kimi For Coding API 有明确的接入需求，也涉及 API 访问控制与生态开放平衡。Issue 状态为 CLOSED，未看到进一步讨论。

**社区反应**：暂无评论，关注度较低，但代表了生态集成方向的信号。

## 重要 PR 进展

过去 24 小时无 PR 更新，暂无重要 PR 可汇报。

## 功能需求趋势

从今日所有 Issue 中可提炼出以下社区关注方向：

- **计费与配额透明度**：用户希望清楚看到 `cache_read` / `cache_creation` 的计费明细，要求修复明显的配额放大消耗问题。
- **跨平台输入兼容性**：macOS 用户要求功能体验与 Windows/Linux 对齐，尤其是剪贴板与快捷键处理。
- **会话管理体验**：用户期待更可识别的会话标题，如自动添加日期前缀，提升长期工作流管理效率。
- **生态开放与第三方集成**：开发者希望 Kimi For Coding API 能够在 PicoClaw 等开源 Agent 项目中复用，降低接入门槛。

## 开发者关注点

- **付费用户对配额消耗高度敏感**：特别是当一个 5 小时窗口在几分钟内被消耗 40% 时，会直接动摇对 Kimi Coding Plan 的信任。
- **macOS 原生交互习惯不能忽略**：`Cmd+V` 是 Mac 用户的基本肌肉记忆，CLI 不应只适配 Windows 风格快捷键。
- **会话命名成本被低估**：对于每日大量使用 AI 会话的开发者，自动日期前缀能显著降低检索成本。
- **第三方 Agent 接入需求持续存在**：API 限制可能会造成生态参与者流失，建议官方提供更明确的开放策略或兼容层。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-16

## 今日速览
今日社区动态以 **稳定性修复与 UI/UX 回归** 为主旋律：多个关键 Issue 揭示了 `SystemPrompt.environment` 崩溃、Windows 桌面端 `Provider.list()` 异常等阻断性问题；PR 侧则集中在性能优化（模型目录缓存、Web 资源按需加载）与 TUI/插件系统的细节修复。此外，插件 API 能力扩展与“自动推理强度”新功能成为今日 PR 的亮点。

## 社区热点 Issues

### 1. #48372 [OPEN] SystemPrompt.environment 导致每次 Prompt 崩溃
- **作者**: @debajyotid4s | **评论**: 7 | **👍**: 23
- **摘要**: `opencode run` 与 TUI 在每次 prompt 时都会抛出 `TypeError: undefined is not an object (evaluating 'a.name')`，并显示“Unexpected server error”，完全阻断使用。
- **重要性**: 高👍与“最新更新”标签表明这是当前最受关注的阻断性问题，影响所有使用 `opencode run` 或 TUI 的用户。
- **链接**: https://github.com/anomalyco/opencode/issues/48372

### 2. #37070 [CLOSED] Plan/Build 模式切换从聊天 UI 中消失
- **作者**: @alikarimejd | **评论**: 17 | **👍**: 22
- **摘要**: v1.18.1 (Windows 桌面端) 更新后，原本位于聊天窗口底部的 Plan/Build 模式切换按钮不再可见，疑似被意外移除或隐藏。
- **重要性**: 高👍+大量评论，属于影响日常核心工作流的回归 bug，社区反应强烈。
- **链接**: https://github.com/anomalyco/opencode/issues/37070

### 3. #5305 [CLOSED] 插件钩子：支持即时 TUI 命令
- **作者**: @malhashemi | **评论**: 20 | **👍**: 14
- **摘要**: 请求新增一个插件钩子，允许插件注册 **无需 agent 介入即可执行的即时 TUI 命令**。
- **重要性**: 插件系统是 OpenCode 的扩展核心，此项若实现可大幅提升插件交互能力与响应速度。
- **链接**: https://github.com/anomalyco/opencode/issues/5305

### 4. #35772 [CLOSED] Desktop v1.17.14 启动时 `Provider.list()` 崩溃
- **作者**: @shiy08166-lab | **评论**: 10
- **摘要**: Windows 桌面端每次启动都会在 `Provider.list()` 抛出 `TypeError: Cannot read properties of undefined (reading 'provider')`，导致 UI 无法加载任何模型/提供商。
- **重要性**: 影响 Windows 用户的基础体验，且与今日 PR #49255（模型目录复用）直接关联，社区高度关注。
- **链接**: https://github.com/anomalyco/opencode/issues/35772

### 5. #42950 [OPEN] big-pickle 模型 socket 意外断开导致静默丢失响应
- **作者**: @aentrepreneur | **评论**: 7 | **👍**: 1
- **摘要**: 使用内置 `opencode/big-pickle` (Zen 免费) 模型时，流式传输中可能发生 socket 断开，UI 无任何错误提示，仅日志中出现 `Aborted`，有效“吞掉”了模型回复。
- **重要性**: 免费模型用户依赖度高，静默失败比报错更令人困扰，影响信任感。
- **链接**: https://github.com/anomalyco/opencode/issues/42950

### 6. #34537 [CLOSED] 异常消耗 token 问题
- **作者**: @2969873195-dev | **评论**: 5
- **摘要**: 用户报告一次报错后，夜间“edit 失败”循环消耗了 80% 的 token，情绪激烈，并附带了截图。
- **重要性**: Token 计费是开发者核心利益点，此类问题会严重影响付费用户对 OpenCode Zen 的信任。
- **链接**: https://github.com/anomalyco/opencode/issues/34537

### 7. #42031 [OPEN] Desktop 新建会话页面缺少文件树按钮
- **作者**: @lqr949809771 | **评论**: 5 | **👍**: 3
- **摘要**: 启用“New layout designs”（默认）后，桌面端 `/new-session` 页面只显示 prompt 输入框，找不到文件树按钮，无法在新建会话时选择文件。
- **重要性**: 新布局的明显功能缺失，影响用户新会话中的文件引用效率。
- **链接**: https://github.com/anomalyco/opencode/issues/42031

### 8. #37257 [CLOSED] 输出内容被错误地路由到 thinking 标签
- **作者**: @shystab | **评论**: 3 | **👍**: 1
- **摘要**: 使用 `deepseekv4pro` 连续对话（10+ 轮）并经历模式切换后，AI 的完整回答被放入 `thinking` 标签内，用户只能看到推理过程，看不到实际答案。
- **重要性**: 推理模型（如 DeepSeek）用户群庞大，该 bug 会导致“答非所问”的观感，严重破坏对话体验。
- **链接**: https://github.com/anomalyco/opencode/issues/37257

### 9. #28769 [CLOSED] Web UI 中 agent 选择器按钮消失
- **作者**: @wanyaoluo | **评论**: 3 | **👍**: 10
- **摘要**: v1.15.6 Web UI 的 prompt 工具栏中，原本紧邻模型选择器的 agent 下拉按钮消失，用户只能通过命令切换 agent。
- **重要性**: 高👍，代理选择是核心交互，回归伤害了 Web 端工作效率。
- **链接**: https://github.com/anomalyco/opencode/issues/28769

### 10. #37258 [CLOSED] OpenAI Responses 推理流失败导致无限重试并阻塞父任务
- **作者**: @fanxing2501 | **评论**: 3
- **摘要**: `openai/gpt-5.6-sol` (xhigh) 子代理在完成所有工具调用后，对最后一条 LLM 调用无限重试，父 `task` 一直保持 `running`，直到手动取消。
- **重要性**: 无限重试是失败模式中的“僵尸状态”，会浪费 token 并阻塞自动化流程。
- **链接**: https://github.com/anomalyco/opencode/issues/37258

## 重要 PR 进展

### 1. #49255 [OPEN] fix(core): 凭据变更时复用模型目录
- **作者**: @thdxr
- **摘要**: 修复 `/connect` 在有 10+ Locations 打开时耗时 3–5 秒的问题。每次凭据变更都触发完整模型目录重建，现改为复用已有目录。
- **意义**: 直接解决高赞 Issue #49109，显著改善多账号/多 Location 场景下的连接性能。
- **链接**: https://github.com/anomalyco/opencode/pull/49255

### 2. #49253 [CLOSED] fix(cli): 按需加载 Web 资源
- **作者**: @thdxr
- **摘要**: 服务器此前会在首次 Web 请求时将全部 915 个嵌入式资源解压到内存，现改为按需 Brotli 压缩加载。
- **意义**: 减少内存占用与启动延迟，是纯性能优化，对轻量部署友好。
- **链接**: https://github.com/anomalyco/opencode/pull/49253

### 3. #48158 [CLOSED] fix(ai): 在 HTTP SSE 流上遵循 chunkTimeout
- **作者**: @holny
- **摘要**: `chunkTimeout` 此前在提供商设置中被接受，但原生路径从未读取。该 PR 修复了超时未生效的 bug，修复 Issue #46692。
- **意义**: 让“无响应超时”配置真正可控，有助于避免长时间挂死。
- **链接**: https://github.com/anomalyco/opencode/pull/48158

### 4. #49245 [CLOSED] feat(session): 增加自动推理强度变体
- **作者**: @JinhaoGu
- **摘要**: 当模型暴露多个推理强度时，组装后的模型自动新增 `auto` 变体，允许自动选择推理力度。
- **意义**: 这对推理模型用户很实用，可以避免手动切换不同强度。
- **链接**: https://github.com/anomalyco/opencode/pull/49245

### 5. #46690 [OPEN] feat(plugin): 暴露会话表单、会话列表与全局事件流
- **作者**: @mblakele
- **摘要**: 为 v2 插件系统暴露更多能力，包括 session forms、session list 和全局事件流，以满足 telegram bot 插件等外部集成需求。
- **意义**: 直接扩展插件 API 边界，是构建生态的关键一步。
- **链接**: https://github.com/anomalyco/opencode/pull/46690

### 6. #49249 [CLOSED] fix(codemode): 将 `tools.search` 视为内置搜索
- **作者**: @rekram1-node
- **摘要**: 弱模型经常写出 `tools.search({ query })` 而不是 `search({ query })`（其他 codemode 可调用对象都在 `tools.` 下）。现在会报错 `Unknown tool 'search'`。
- **意义**: 修复小模型常见调用歧义，提升 codemode 对弱模型的容错性

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-09-16）

## 今日速览

今日社区动态集中在**桌面应用与 WebShell 体验**、**ACP/服务模式可靠性**以及**核心稳定性修复**三大方向。新发布 `cua-driver-rs v0.20.9` 提供全平台预构建二进制；值得警惕的是，多个 P1 级 Issue 指出 TUI 静默崩溃（#11500）和 ACP 通道被异常通知击穿（#11908）等问题，均得到大量社区反馈与快速跟进。

---

## 版本发布

### cua-driver-rs v0.20.9
- **macOS**：codesigned + notarized 通用二进制，附带 `QwenCuaDriver.app`
- **Linux**：未签名（x86_64 + arm64，glibc 2.31 起）
- **Windows**：未签名 UIAccess worker + 原生 SDK 负载（x86_64 + arm64）
- 说明：该版本为 Qwen CUA Driver 的预构建二进制包，vendored 于 `packages/cua-driver` 目录，非 Qwen Code 主版本更新。

---

## 社区热点 Issues（Top 10）

### 1. TUI 在后台多代理完成时静默退出（P1，15 条评论）
**#11500** | 作者 @zaalipro | 更新 2026-09-15 | [链接](https://github.com/QwenLM/qwen-code/issues/11500)

多个后台子代理在短时间内连续完成时，TUI 触发 React 错误 #185（"Maximum update depth exceeded"），未渲染任何错误信息便退出到 shell。恢复会话时提示 "Previous session appears..."。这是当前评论区最活跃的 bug，直接影响日常多代理协作场景。

### 2. ACP 通道被超大通知击穿，后续请求全部 404（P1，4 条评论）
**#11908** | 作者 @Harkanovac | 更新 2026-09-15 | [链接](https://github.com/QwenLM/qwen-code/issues/11908)

会话启动时 `available_commands_update` 通知超过 `MAX_JSON_NODES`（10,000）上限，ACP bridge 视为无效消息，直接拆除通道、SIGKILL 子进程并丢弃会话，之后每个请求都返回 "No session with id"。P1 级别，对服务化部署影响严重。

### 3. `/review` 维度代理读取主检出而非 PR 工作树（P1，4 条评论）
**#11895** | 作者 @wenshao | 更新 2026-09-15 | [链接](https://github.com/QwenLM/qwen-code/issues/11895)

同一仓库 PR 评审时，`/review` 通过 `working_dir` 将维度代理固定到临时工作树，但 brief 中只传递了 diff 的绝对路径，未包含工作树路径。导致代理读取主检出代码而非 PR 工作树代码，可能基于错误代码进行评审。作者 wenshao 明确指出这是 P1 回归。

### 4. 桌面应用忽略 `ui.theme` 和 `general.language` 设置（6 条评论）
**#11955** | 作者 @rcrott | 创建 2026-09-15 | [链接](https://github.com/QwenLM/qwen-code/issues/11955)

Qwen Code Desktop 设置面板和 settings.json 中已正确配置主题与语言，但界面仍保持深色/英文。两个作用域的设置均无效，设置面板显示值正确但应用不生效。桌面端基础配置功能仍在完善

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*