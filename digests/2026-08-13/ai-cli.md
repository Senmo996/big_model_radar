# AI CLI 工具社区动态日报 2026-08-13

> 生成时间: 2026-08-13 01:01 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-13）

## 1. 生态全景

当前 AI CLI 工具已全面进入**多智能体生产化与可靠性攻坚阶段**。各主流工具的社区反馈重心正从基础代码生成能力转向多 Agent 协调、跨会话状态一致性、权限安全边界和 Windows 桌面端稳定性等工程化问题。与此同时，具备记忆管理、自主运行能力和可扩展 MCP/插件集成的工具正获得更多开发者选型偏好。值得注意的是，即使是头部工具也普遍面临"回归缺陷"和"误报状态"等问题，行业整体仍处于快速迭代且信任度建设期。

---

## 2. 各工具活跃度对比

| 工具 | 今日活跃 Issues | 今日 PR | Release | 社区高热议题 | 维护响应节奏 |
|------|-------------|---------|---------|------------|------------|
| **Claude Code** | 10+（评论密集） | 5 | v2.1.229 | CVP审核争议、多Agent 12项bug | 高频发版，单日patch |
| **OpenAI Codex** | 10+ | 10+ | rust-v0.148.0-alpha.9 | 60秒自动审批禁用（👍194） | 高（大量Auto管理合入） |
| **Gemini CLI** | 10 | 10 | Nightly 0.65.0 | P1子代理挂起/误报 | 中高（多核心PR同步推进） |
| **GitHub Copilot CLI** | 10+ | 3 | — | MCP自动化拉取、企业模型缺失 | 中等（triage系统化处理中） |
| **Kimi Code CLI** | 1（活跃） | 2（长期滞后） | 无 | 长期记忆功能（36条讨论） | 低（PR延迟6月+） |
| **OpenCode** | 10 | 10 |  v1.18.17 | Zen费用误报、Mermaid渲染 | 高（贡献者活跃、社区驱动） |
| **Qwen Code** | 10 | 10 | 桌面端v0.2.1/1.0 | 图片崩溃回归,长任务可靠性 | 高（自下而上持续迭代） |

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 典型诉求 |
|------|---------|---------|
| **多代理协调与可靠性** | Claude Code, Gemini CLI, Qwen Code | 子代理正式状态误报、挂起死锁、并行协调bug、调用层级缺失——自主运行完全不可靠的共识 |
| **Memory/记忆持久化** | Kimi Code（热度）、Gemini CLI（Auto Memory）、Qwen（记忆召回RFC）、Claude Code（长会话） | 跨会话保留项目上下文、自动记忆低置信度过滤 |
| **MCP生态稳定性与安全** | Claude Code、Gemini CLI（配置损坏漏配）、Copilot（远程MCP OAuth/5xx）、OpenCode | MCP配置安全、远程连接、资源发现、工具订阅可靠性 |
| **Windows桌面端第一公民** | Claude Code（GPU崩溃）、OpenAI窗口（Computer Use崩溃）、Copilot（WSL输入) | 桌面端GPU进程稳定性；安装MSIX修复故障链；WSL适配、IDE面板微调 |
| **权限与安全边界** | Claude Code（deny无效）、OpenCode（子代理继承deny）、Gemini（注入护栏、SSRF）、Copilot（own权限提示） | 差异安全模型、授权继承链、跨代理的deny传递 |
| **成本/配额管理** | OpenCode（精装修设计）；OpenAI（线程级用量PR）；Copilot（企业模型访问） | 精细化额度监控、按会话预算、配额控制可视化与自动停止 |
| **长任务自主运行** | Claude（夜间循环）、Qwen（长任务卡住）、OpenAI（自动审批等待）、Gemini（retry机制） | 长任务可靠调度，检查自动调度，避免人工干扰 |

**跨平台观点**：多智能体可靠、持久化记忆、Windows桌面稳定性是各工具开发者普遍面临的三大核心主客观烦恼。

---

## 4. 差异化定位

如何构建差异化能力 | 典型技术路线对比 | 北美市场定位 | 核心生态特点
---|---|---|---
Claude Code | 无线网络 | 迅速增大——PvE图论坛漏洞 | 深度开发工具链基础设施、Agent Skills/Plugins、Community驱动 | 企业开发者、多Agent团队、复杂度高TS/资产场景，黑客来袭安全要求高、环境的体验质量 |
 OpenCode 与其他快速迭代工具的比较差异很明显：Python/Node SSH社区的free微软等始日上午后才适配完善；用户是真GenAI时代初入场比较稳定的党员有Windows6/7电脑对准。

---

## 5. 社区热度与成熟度

| 工具 | 社区参与度 | 迭代阶段 | 重点信号 |
|------|-----------|----------|----------|
| **Claude Code** | ★★★★★ | 成熟期，受控社区 | Linux桌面版（498票）；安全、稳定性聚合为次要舆论；大模型回归即可启动（Opus 5） |
| **OpenAI Codex** | ★★★★☆ | 快速迭代期（多automation新特性） | 桌面/IDEExt 稳定性下降；长期等待用户普遍不只用 |
| **Gemini CLI** | ★★★★ | 基础设施加固期 | 架构级讨论（零依赖沙箱）；稳定性维护，Agent能力架构完 |
| **GitHub Copilot CLI** | ★★★☆（企业导向） | 维护驱动与策略上游匹配 | 模型启用策略受控于服务端，CLI议题多为管理/认证 |
| **Kimi Code CLI** | ★★☆ | 早期，重点失焦 | Memory高关注（长36评论）无人正式；长期PR停滞，维护节奏难以稳定 |
| **OpenCode** | ★★ | 活跃，社区驱动 | 贡献者发起TUI多主题PR；开源社区热情可观，v2迁移期阵痛；反成公民全球管网 |
| **Qwen Code** | ★★★☆ | 快速上升期 | 桌面日更两版；代码品质上吃紧缩；multi-agent有待整合 |

> 结论性观点：Claude Code 与 OpenCode 处于生态社区沸点；OpenAI Codex 与 Gemini 社区具备较强，但更稳妥；Qwen 汽车通过版本控制快速迭代协助；Kimi 作为新生态，仍在培育社区与信任。

---

## 6. 值得关注的趋势信号

1. **多 Agent 走向“第一阶段淘汰”**
   多Agent成立人们应用的唯一目标：“过夜自动运行”普遍存在漏洞。字节线是长期计划，运行安全的Agent编排基础设施成为下一个注意力聚焦平台——Claude Code需要承认12 bug分类，Codex 展开会话gRPC再次重连也说明是它跨版本设计的监控大型。

2. **Windows桌面端稳定性成为进入专业开发的门槛**
   对全桌面软件崩溃链路（GPU进程崩溃 → MSIX自修失败 → 数据清空）和永久性多会话故障的交叉，说明Windows实现了“自加速”局面；但AI CLI的您深度部署场景第三方生态这无放缓（IDE扩展、WSL、Remote环境）同时暴露出的兼容性差距，可能导致很重要的数据。选择注意反馈，Windows和常见VPN工程师之·痛ентри。

3. **“内存层”可能成为AI CLI差异化竞争的必选项**
   KimiCode Memory的36条高讨论、Qwen自动记忆 RFC 以及 Gemini 的 Auto Memory 不大量重试，说明跨会话上下文一致性机制已不是特性，而是工具心智模型的一环。下一阶段的竞争将是：记忆存储、主动回忆时序、质量和重抓重放。

4. **MCP 协议进入“二次迭代”：安全性与工程性**
   MCP 逐渐从“接入”演进为“企业">
   - OAuth生命周期（Copilot Entra）方式全局不同
   - 映射并保护透明性（Gemini修复Map/启动配置文件损坏）
   - 错误恢复对远程连接断线（CopilotSSE 5xx）
   - 工具暴露控制
   ——这些都是驱动器驱动下的连接（底层）重新开始一步。

5. **安全边界和权限模型随子代理细粒度化**
   - 深层次权限链：OpenCode 子代理继承 deny，而 Claude Code 的 deny 在今天无效（高管）——如兵团。安全并不是衡量“能否”的开关，更需要在Agent层级上分化。（Ln 存储的）

在商业中构建时，安全问题是第一位的。是等本地或Agent的“接主流”无人操作场面到来。

---

*报告基于 2026-08-13 之七个主流工具公开社区数据，全部信息及观点代表当前趋势提供，不分优先级，确保技术团队及开发者的选择能基于多维度来源参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**报告期**: 数据截止 2026-08-13 | **数据源**: github.com/anthropics/skills


## 一、热门 Skills 排行（按社区关注度）

### 1. skill-creator 工具链修复（#1298）
- **功能**: 修复 `run_eval.py` 长期存在的 recall=0% 问题——eval artifact 未作为真实 skill 安装、Windows 流读取故障、触发检测失效。
- **社区热度**: 关联 issue #556（12 条评论）与 #1169 均指向同一问题，全网 10+ 次独立复现，被评为"优化循环正在对抗噪声"。当前为 OPEN 状态，多个月未合并（已有 #1099、#1050 等同类修复尝试）。
- → [查看 PR](https://github.com/anthropics/skills/pull/1298)

### 2. document-typography 文档排版质量（#514）
- **功能**: 针对 AI 生成文档的排版缺陷——孤行文字（1-6 词溢出到下一行）、孤寡段落（标题悬在页底）、编号错位。
- **社区热度**: 源于 issue #12（docx 格式破坏事件）的衍生需求，属于高频痛点。PR 已拥有完整实现，OPEN 状态 5 个月仍未见合并，社区讨论集中在"这是每个 Claude 用户都会遇到的问题"。
- → [查看 PR](https://github.com/anthropics/skills/pull/514)

### 3. pyxel 复古游戏开发（#525）
- **功能**: 为 pyxel-mcp（Pyxel 引擎的 MCP 服务器）提供 skill，支持像素风/8-bit 游戏创作全流程：编写 → 运行截图 → 检查 → 迭代。
- **社区热度**: 核心价值在于"Python 生态 + 游戏引擎 + MCP"的完整链路，在生态上代表了 Skill 与 MCP 深度集成的范式。OPEN 状态已超 5 个月，但作者提供完整 pyxel-mcp 配套，具备良好可测试性。
- → [查看 PR](https://github.com/anthropics/skills/pull/525)

### 4. ServiceNow 平台 skill（#568）
- **功能**: 覆盖 ServiceNow 全平台——ITSM、ITOM、ITAM/SAM、FSM、HRSD/CSM、SPM、安全响应、IntegrationHub，定位为"平台级助手"。
- **社区热度**: 单 PR 覆盖面最广的企业级 skill，可服务于大型组织常见的 ServiceNow 运维/开发场景。OPEN 状态超过 5 个月，中间有多次更新，代表企业软件类的典型高价值需求。
- → [查看 PR](https://github.com/anthropics/skills/pull/568)

### 5. self-audit 推理质量门控（#1367）
- **功能**: v1.3.0 自审计 skill——先做**机械性文件验证**（每个应输出文件是否真实存在），再按损害严重度优先级执行四维推理审计（正确性、完整性、逻辑一致性、安全风险）。
- **社区热度**: 配套 issue #1385 提出了完整的三闸门管线（任务前校准 → 对抗性评审 → 交付验证），其中两个闸门已落地为 PR。代表了"AI 输出可信度验证"的新兴方向，OPEN 状态仅数周即获关注。
- → [查看 PR](https://github.com/anthropics/skills/pull/1367)

### 6. testing-patterns 测试模式库（#723）
- **功能**: 涵盖完整测试栈——Testing Trophy 模型、单元测试 AAA 模式、React Testing Library、端到端测试策略，明确"测什么 vs 不测什么"。
- **社区热度**: 集成了社区最佳实践的测试模式合集，既有理论指导又有实操细节，同一库中少有的"从哲学到代码"完整覆盖。OPEN 状态约 5 个月。
- → [查看 PR](https://github.com/anthropics/skills/pull/723)

### 7. skill-quality-analyzer + skill-security-analyzer（#83）
- **功能**: 两个 meta skill——质量分析器按五个维度（结构、示例、资源引用等）评估 SKILL.md，安全分析器检查恶意指令风险。
- **社区热度**: 对应 issue #492（信任边界滥用）的平台级解决方案。若合并将成为"skill 的 lint 工具"，对生态规范化有显著价值。OPEN 状态 9 个月，是最早提出的 meta skill 之一，讨论热度持续。
- → [查看 PR](https://github.com/anthropics/skills/pull/83)


## 二、社区需求趋势（从 Issues 提炼）

**直接需求信号（评论数排序）：**

| 方向 | 代表 Issue | 关注度 | 说明 |
|------|-----------|--------|------|
| **安全与信任边界** | #492 （43 评论） | 🔥🔥🔥 最高 | 社区 skill 混入 `anthropic/` 命名空间造成信任漏洞 |
| **组织级协作共享** | #228 （16 评论，8 👍） | 🔥🔥🔥 最高 | 期望 org 内直接共享 skill，替代手动下载/上传的原始流程 |
| **工具链可靠性** | #556 / #1169 | 🔥🔥 高 | skill-creator 的 eval 工具持续误报 recall=0%，直接影响 skill 优化流程 |
| **上下文窗口效率** | #189 / #1487 | 🔥🔥 高 | 重复安装致上下文浪费；claude-api skill 单次注入 156k tokens |
| **Agent 治理模式** | #412 | 🔥 中 | Agent 治理/安全策略（策略执行、威胁检测、信任评分） |

**趋势总结**：社区最迫切的是 **安全信任机制**（skill 来源可信度）和 **组织级基础设施**（共享与分发），其次为 **工具自身可靠性**（skill 创建工具需要稳定）和 **上下文效率**（避免 token 浪费）。


## 三、高潜力待合并 Skills

| Skill | PR | 状态 | 潜力点 |
|-------|-----|------|--------|
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | OPEN 5 个月 | 高频痛点 + 实现完整，等待合并窗口 |
| **ODT 文档处理** | [#486](https://github.com/anthropics/skills/pull/486) | OPEN 5 个月 | 补齐 ODF 格式空白（对应 .docx/.pdf已有 skill） |
| **frontend-design 重构** | [#210](https://github.com/anthropics/skills/pull/210) | OPEN 7 个月 | 提升既有 skill 的可执行性，非全新 skill 但改进力度大 |
| **testing-patterns** | [#723](https://github.com/anthropics/skills/pull/723) | OPEN 5 个月 | 覆盖主流测试场景，降低测试方案设计成本 |
| **ServiceNow** | [#568](https://github.com/anthropics/skills/pull/568) | OPEN 5 个月 | 企业级平台需求明确，覆盖面广 |
| **pyxel** | [#525](https://github.com/anthropics/skills/pull/525) | OPEN 5 个月 | 自带 MCP 服务端，开箱即用的完整方案 |

> ⚠️ 注意：以上 PR 均处于 OPEN 状态，合并时间取决于 Anthropic 内部审查节奏及社区反馈。


## 四、Skills 生态洞察

**一句话总结**：当前社区最大诉求是 **"让 Skill 更可信、更可靠、更可共享"**——安全命名空间（防冒充）、组织级分发（共享难）、创建工具的可量化验证（eval 修复）、上下文占用优化（token 效率），四个方向的并发诉求共同指向一个结论：**Skill 生态正处于从"能用"到"可治理"的规范化拐点**，安全治理和工具链稳定性是当前最集中的痛点。

---

# Claude Code 社区动态日报（2026-08-13）

## 今日速览

多智能体协调与跨会话消息可靠性成为开发者讨论焦点；社区对 Linux 桌面版的需求持续高涨（498 赞）。新版本 v2.1.229 发布，主要带来 hook 服务端支持和 SSE 保活改进。Windows 桌面版崩溃问题成为今日最高优先级的 bug 类别。

## 版本发布

### v2.1.229

- **远程控制**：文档化 `claude remote-control --continue` 以恢复最近的远程控制会话
- **Hook 支持**：为自托管 runner 会话添加服务端提供的 hook 支持，与托管环境行为对齐
- **流式响应**：增加 SSE keepalive 心跳到 gateway 流式响应

## 社区热点 Issues（Top 10）

1. **[CVP 审核问题持续发酵]**（评论 80，👍 12）— 已获 Cyber Verification Program 批准的组织仍收到 Claude Code 网络保安遏制。审核门户显示“审核中”而非先前批准的“已批准”，流程一致性受到质疑。 [链接](https://github.com/anthropics/claude-code/issues/84352)

2. **[Linux 桌面版正式版本请求]**（👍 498）— 社区最高赞功能请求，要求为 Ubuntu LTS / Debian 提供官方桌面版。目前仅 Windows/macOS 有桌面版导航。 [链接](https://github.com/anthropics/claude-code/issues/65697)

3. **[多智能体协调 12 项 bug 汇总]**（评论 27）— 单次自主隔夜循环暴露出 12 个协调 bug，涵盖内存泄漏、死锁、状态不同步。正值多代理进入生产的关键阶段。 [链接](https://github.com/anthropics/claude-code/issues/54393)

4. **[Windows 桌面版 GPU 进程崩溃]**（评论 25）— RTX 5080 环境下 Electron GPU 进程崩掉整个应用及所有运行中的会话，无任何错误提示。MSIX 自修复失败会连带卸载应用并清空数据。 [链接](https://github.com/anthropics/claude-code/issues/81698)

5. **[`/plugin update` 缓存失效失败]**（评论 25，👍 31）— 执行插件更新后，新版本并未进入 `installed_plugins.json`，旧版本持续加载直至手动清缓存。后台操作可见性问题。 [链接](https://github.com/anthropics/claude-code/issues/14061)

6. **[左箭头误触 agent 导航]**（评论 14，👍 19）— 在聊天输入框按左箭头时会跳到 agents 屏幕且不可重绑定，返回后主会话视图断裂。影响基础交互流程的可用性。 [链接](https://github.com/anthropics/claude-code/issues/75899)

7. **[Windows 版桌面反复崩溃]**（评论 13）— “Advanced Options → 修复”成为 Python 维护者的默认操作，崩溃无日志、无 WER 报告，定位困难。 [链接](https://github.com/anthropics/claude-code/issues/85199)

8. **[Worktree 会话复用上一会话目录]**（评论 11）— 工作树隔离功能启动时复用了旧会话目录而非新建目录，易引发状态混淆，存在上下文污染风险。 [链接](https://github.com/anthropics/claude-code/issues/79366)

9. **[Opus 5 幻觉反复出现]**（评论 9）— 用户报告 Opus 5 重新出现旧版本此前已修复的幻觉问题（“has again started inventing answers which 4.8 did not do”），可能是回归。 [链接](https://github.com/anthropics/claude-code/issues/82326)

10. **[权限 deny 规则失效]**（评论 5）— `permissions.deny` 配置对 macOS 无效，已越权执行被拒绝的操作。安全性问题严重程度。【高影响】[链接](https://github.com/anthropics/claude-code/issues/61268)

---

## 重要 PR 进展

今日公开的 PR 较少（共 5 条），以下全部列出。尝试在后续区间补充更多，目前数据仅含这些：

| 标题 | 状态/内容 | 链接 |
|---|---|---|
| **docs：将残旧文档链接调整至 code.claude.com** | 清理旧的 docs.claude.com 链接至新域名，涵盖插件、技能、命令、issue-template 引导。 | [PR #85925](https://github.com/anthropics/claude-code/pull/85925) |
| **docs：plugins 与 examples 的 stale 链接/README 修正** | 修正 hooks 示例、plugins README 中的旧 URL，所有变更均经 live 重定向验证。 | [PR #85822](https://github.com/anthropics/claude-code/pull/85822) |
| **添加缺失的 source 文件**（标题较模糊） | 目前描述不详。 | [PR #41611](https://github.com/anthropics/claude-code/pull/41611) |
| **examples：增加 MEP（Meat Puppet Elimination Protocol）** | 提供多机切换会话时的水分上下文丢失模式，零基础设施、3 个文件自增强协议。 | [PR #42996](https://github.com/anthropics/claude-code/pull/42996) |
| **Security hook：将 `child_process_exec` 范围限定于 JS/TS** | 修复 Python 误召回 `asyncio.create_subprocess_exec()` 的三角函数调用。 | [PR #57888](https://github.com/anthropics/claude-code/pull/57888) |

---

## 功能需求趋势

从近 24h 更新的 Issues 及评论区提炼：

| 方向 | 热度 / 证据 |
|---|---|
| **Linux 官方桌面版** | 498 个推进在继续请求，生态扩展的强信号。 |
| **多智能体运行时可靠性** | 跨会话消息丢失（#81、#86）、cowork 场景失效（#86059、#86237）、会话状态错误（#86237）——多智能体已进入实际生产部署，稳定性成刚需。 |
| **远程控制与自托管运行器** | 新版本强化了 remote-control / hook 的 runner 支持，说明有大量团队在私有环境使用 Claude Code。 |
| **MCP 生态整合** | 多个 MCP 相关 bug（#72239 请求 MCP Annotations.Audience、#71649 claude.ai 管理 connector 失效、#86023 META 连接超时）；MCP 已是核心插件机制，但连接稳定性仍需提升。 |
| **1M context / 新模型支持** | Opus 5 的 1M context 支持问题不止一次出现，且在 v2.1.220 后出现 WebSearch 在 xhigh/max effort 下失效（#83364），同源根因。 |
| **高效 cost / cache 行为** | /plugin update 缓存不失效（#14061）、-p --resume 时 git 状态变更导致整个 prompt cache 重建（#78720 ——成本风险高的用户）。 |

---

## 开发者关注点

**① Windows 桌面端稳定性 —— 高频痛点**
- GPU 进程崩溃连带整个应用和所有会话（#81698）
- MSIX 自修复链条故障：崩溃→自修复→卸载→数据被清除（#85905、#85199）
- 从按钮（#86062）与 UI 层（#86237）也平台相互之间疑似有连接

**② 权限与安全的可信度**
- `permissions.deny` 失效（#61268）在安全隐患（#6107 到 #61268 是「管理员reject」被绕过），用户默认。需尽快验证。

**③ 对模型行为的敏感度**
- Opus 5 幻觉、WebSearch 400 / effort 上限、1M context 时隐时现 — 原话“**总在凭空造答案**”是在 xx/ 复现的，说明社区对模型行为的回归监测与快速反馈的高度闭环。

**④ “完全自主过夜” 依然不靠谱 мнение**
- 24 小时自主循环后多智能体协作/会话中断/水流死锁问题（issue #54393  + #86237）—— “完自驱动”运行仍是梦幻，需要更多可靠的基础设施。

---

*数据源：github.com/anthropics/claude-code（更新截止 2026-08-13）。本日报仅汇总社区反馈，不代表 Anthropic 官方立场。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-13

## 今日速览

今日社区关注焦点集中在 Windows 平台兼容性问题（IDE Context 失效、Computer Use 崩溃）和会话管理体验上，其中高赞 Issue #28969（禁用 60 秒自动审批）持续升温。代码层面，项目组连续合并了 10+ 个 PR，重点聚焦插件指标采集、线程级用量追踪、gRPC 重连机制等领域，且大量合入工作均由自动化机器人完成，开发节奏显著加速。


## 版本发布

### rust-v0.148.0-alpha.9
- **标签**: `0.148.0-alpha.9`
- **简介**: Release 0.148.0-alpha.9
- **总结**: 今日发布了 0.148.0-alpha.9 版本的更新，具体变更内容尚未公示，建议关注后续 Release Notes 补充。社区可先通过升级验证已有 Issue 的修复情况。
- 链接: [查看发布详情](https://github.com/openai/codex/releases)


## 社区热点 Issues

### 1. #28969 - 增加设置以禁用问题 60 秒自动解析
- **标签**: [bug, CLI, config, plan]
- **评论**: 70 | **👍**: 194 | 状态: OPEN
- **亮点**: 高票高赞，社区对等待 60 秒自动解决请求的功能在新模型下极为不满，强烈希望用户控制权。
- 链接: https://github.com/openai/codex/issues/28969

### 2. #25178 - Windows Computer Use 截图失败 (SetIsBorderRequired)
- **标签**: [bug, windows-os, app, computer-use]
- **评论**: 25 | **点赞**: 13 | 状态: OPEN
- **亮点**: Windows 桌面端 Computer Use 行为整体可用，唯独截图功能因为一个底层接口报错（0x80004002）无法使用。
- 链接: https://github.com/openai/codex/issues/25178

### 3. #31553 - Codex VS Code 扩展停止自动包含 IDE 上下文
- **标签**: [bug, windows-os, extension]
- **评论**: 17 | **点赞**: 12 | 状态: OPEN
- **亮点**: 在 Remote/Container 模式下，新版本（如 26.6 系列）中的上下文自动注入功能失效，影响开发者日常效率，用户集中反馈。
- 链接: https://github.com/openai/codex/issues/31553

### 4. #26990 - Windows 桌面端断电后本地状态损坏
- **标签**: [bug, windows-os, app, session, config]
- **评论**: 14 | **点赞**: 0 | 状态: OPEN
- **亮点**: 电源中断后不仅引脚/项目重置，连配置都回退，且出现 rpc 中的未来时间戳问题，属于数据损坏级别，对重度桌面用户非常致命。
- 链接: https://github.com/openai/codex/issues/26990

### 5. #37398 - Codex Desktop 加载本地聊天时因归属发现导致 5 秒空档
- **标签**: [bug, app, session, performance]
- **评论**: 14 | **点赞**: 9 | 状态: OPEN
- **亮点**: 文本读取 <200ms，但固定的 owner-discovery 超时需消耗约 5s，说明设计中的冗余等待对该体验优化。
- 链接: https://github.com/openai/codex/issues/37398

### 6. #33967 - ChatGPT for Windows 无法完成设置或进入受限访问模式
- **标签**: [bug, windows-os, sandbox, app]
- **评论**: 12 | **点赞**: 0 | 状态: OPEN
- **亮点**: 最新 Windows 桌面版 (26.715.3651.0) 卡住在 “Complete Windows setup” 界面，无法新建任务或真正使用。
- 链接: https://github.com/openai/codex/issues/33967

### 7. #34920 - IDE Context 在扩展 26.715.x 遇到 RPC 序列化错误
- **标签**: [bug, windows-os, extension, tool-calls]
- **评论**: 10 | **点赞**: 5 | 状态: OPEN
- **亮点**: 影响多个 IDE（VS Code, Devin）版本，在 IDE Context 功能遇到硬件序列化成型，且已影响 GPT-5.6 放量后的上下文调用。
- 链接: https://github.com/openai/codex/issues/34920

### 8. #35419 - WSL2 中 VS Code IDE 上下文自动禁用且选择文本不附加
- **标签**: [bug, windows-os, extension]
- **评论**: 6 | **点赞**: 10 | 状态: OPEN
- **亮点**: WSL2 环境下 context 自动失效、选中文字不附带问题近两次更新点，获大量加 +1。
- 链接: https://github.com/openai/codex/issues/35419

### 9. #34696 - IDE Context 静默禁用：workspaceRoot 丢失
- **标签**: [bug, windows-os, extension]
- **评论**: 4 | **点赞**: 6 | 状态: OPEN
- **亮点**: 收集三个问题版本缺失 workspaceRoot 导致 context 静默禁用，且回滚到 26.5609.30741 才能解决，可以说是一个回退性 bug。
- 链接: https://github.com/openai/codex/issues/34696

### 10. #37743 - Windows Computer Use 程序，最初 EPERM 后连 EnumWindows 都失败
- **标签**: [bug, windows-os, sandbox, app, computer-use]
- **评论**: 3 | **点赞**: 0 | 状态: OPEN
- **亮点**: 新版本中 Computer Use 运行时因为权限被阻塞在初始化，紧随其后的辅助进程也无法枚举窗口。Windows 自动化稳定性。
- 链接: https://github.com/openai/codex/issues/37743


## 重要 PR 进展

### 1. #38281 - 在 /status 中显示估算的线程用量
- **PR 内容**: 在 `/status` 命令和 TUI 状态行中新增线程信用额度与预估成本展示，为企业版工作区提供模型、推理、速度及 Token 的明细分解。
- **影响**: 帮助企业用户实现精细化配额管理，后端接口兼容扩展。
- 链接: https://github.com/openai/codex/pull/38281

### 2. #38275 - 统一接入输入提交和路由
- **PR 内容**: 新增 `TurnInputRequest` 类型化提交结果集，统一了开始回合、转向活跃回合、关闭输入的行为。
- **影响**: 重构交互核心逻辑，减少回合状态竞争，提升远程操作稳定性。
- 链接: https://github.com/openai/codex/pull/38275

### 3. #38257 - 在宿主机重启后重连 gRPC code-mode 会话
- **PR 内容**: 检测 gRPC host 停止，自动重新打开已缓存的 code-mode 会话，并串行化重连请求，重新限定 cell IDs。
- **影响**: 改善 Docker/远程开发场景下后端重启后无法自动恢复的问题。
- 链接: https://github.com/openai/codex/pull/38257

### 4. #38274 - 持久化世界状态采用 JSON 对象存储
- **PR 内容**: 将世界状态快照（snapshot）和合并补丁（merge patch）强制按 keyed JSON 对象存储，防止回放中出现不规则结构。
- **影响**: 让回放处理更加严谨，防止多路执行时的异常合并或状态崩溃。
- 链接: https://github.com/openai/codex/pull/38274

### 5. #38272 - 会话历史条目增加创建时间戳
- **PR 内容**: 为用户、开发者、助手及工具输出自动生成毫秒级 Unix 创建时间，并在后续请求中保留该时间。
- **影响**: 为未来排序、Debug 和数据追溯提供更精确的依据，稳定时间线。
- 链接: https://github.com/openai/codex/pull/38272

### 6. #38270 - 后端 client 支持按线程查询使用量
- **PR 内容**: 新增 `Client::get_thread_usage`，支持查询单线程耗用的信用额度与金额，含模型、推理效率、Token 明细。
- **影响**: 方便上层工具在会话内监控消耗，优化成本预测能力。
- 链接: https://github.com/openai/codex/pull/38270

### 7. #38268 - 从 skills.read 暴露执行器技能根目录
- **PR 内容**: `skills.read` 对 executor-backed 技能的响应中增加 `skill_root` 字段，便于读者定位捆绑脚本位置。
- **影响**: 增加技能编排灵活性，对本地自动执行脚本相关使用有直接帮助。
- 链接: https://github.com/openai/codex/pull/38268

### 8. #38253 - 为 unified exec 命令收集插件指标
- **PR 内容**: 在 unified exec 启动时创建指标 sidecar 文件，并在命令退出/后台任务结束/超时后发送可解析的测量数据。
- **影响**: 提高插件指标统计准确度，统一了不同触发场景下的引数分析能力。
- 链接: https://github.com/openai/codex/pull/38253

### 9. #38265 - Windows 代理端口被占时使用有界回退
- **PR 内容**: 当 Wire 配置端口被占时，从协议首选范围内寻找，避免 SOCKS5/HTTP 端口碰撞时冲突失败。
- **影响**: 大幅提升 Windows 环境下代理的鲁棒性，减少手动配置.
- 链接: https://github.com/openai/codex/pull/38265

### 10. #38256 - 多个网络审查时报告最新的拒绝原因
- **PR 内容**: 操作允许显式网络审查，刷新拒绝记录时使用最后一次网络审查的具体拒绝理由，代替之前保留旧结果的策略。
- **影响**: 捕获安全拦截细节时反馈更透明、准确，便于执行策略追踪边界。
- 链接: https://github.com/openai/codex/pull/38256


## 功能需求趋势

- **可配置的自动行为**：越来越多的用户要求“可关闭的自动功能”，如 #28969 禁用 60 秒自动审批、#23517 禁用自动滚动。
- **状态可见性**：用户希望看到更细粒度的线程级使用量（Enterprise 按线程统计、成本预估），并在 TUI/status 行的有可配置面板。
- **更强的本地/远程一致性**：关注本地状态不可损坏（断电）、远程 remote 后 app-server 连接能自动重连，避免卡死或丢失。
- **技能与外设脚本能力的扩展**：`skills.read` 获得 `skill_root` 后，预期会引导批量的脚本集成与动态发现。
- **插件指标的可观测性**：持续规范化插件运行时的 CPU / 内存 / 时长，为远端执行和本地统一捕获提供标准做法。


## 开发者关注点

- **Windows 桌面端稳定性三连坑**：#25178 截图无效、#33967 无法设置、#37743 运行时崩溃，说明强者桌面用户对快速入门成功率和基础功能的 UI 稳定性要求严苛，尤其是非技术检错环节。
- **IDE 插件 RPC/上下文的退化严重**：多个 Issue（#31553、#34920、#34696、#35333）指向近两周发布的 VS Code 扩展在远程容器或 WSL 下静默丢失 IDE 上下文及 workspace，需要开发者反复回滚版本，信赖度受损。
- **高度关注"自动决策"细节**：非互动场景（如 CLI 会话超时或审批等待）希望注入更长或永久的等待时间或可视化提醒，尤其对长时段无人值守的 Agent 流程（#37472、# 11604）有强烈需求。
- **性能与修复速度并进**：虽然桌面应用时常出现 5s 固定延迟或滚动条异常，但最近发布预览版频率增多，社区也观测到大量自动合并的 Bug 修复，期待 0.148 稳定版能把这些反馈集中吸收干净。

---
*本日报由开源社区数据自动生成，不构成官方公告，仅供技术参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**2026-08-13** | 数据来源：github.com/google-gemini/gemini-cli


## 今日速览

今日社区焦点集中在**Agent 子代理的可靠性问题**上：多个高优先级 Bug（子代理恢复误导、Generalist 挂起、Shell 执行卡死）持续获得开发者关注，同时社区正推动安全与基础设施层面的修复——包括修复 MCP 配置损坏导致的数据丢失隐患、引入上下文感知的容量重试策略，以及五个安全相关 PR 的推进。此外，**Gemini 3.6/3.5 Flash 系列新模型支持**和**Agent 间互相调用**两个方向的 PR 正在推进，值得关注。


## 版本发布

**v0.56.0-nightly.20260812.g5024443c7**（Nightly）

- 修复核心配额查询与模型映射的无效调用问题
- 新增行为评估（evals）本地报告命令及开发文档

> 该 Nightly 版本已进入 0.56.0 迭代周期。信息来源：pulls/28779 / 28776 中有 v0.55.1 和 v0.56.0-preview.1 的更新日志待审核。


## 重点关注 Issue

### 1. #22323 — [P1] 子代理 MAX_TURNS 中断被误报为“成功” 🔥 12 条评论
子代理 `codebase_investigator` 已到达最大轮数限制但实际上未开始分析时，却返回 `GOAL` 成功状态，导致中断被隐藏——对用户造成误导，在需要 retest 的状态列表中受到重视。

链接：https://github.com/google-gemini/gemini-cli/issues/22323

### 2. #21409 — [P1] Generalist 代理使用时永久挂起 8 条评论
当 Gemini CLI 触发调度至运维 Agent 时，即使用户只要求创建文件夹，也会无限等待（等待长达一小时无响应）。受影响用户只能在配置中强制禁用子代理。多个用户加 👍 反映相同问题。

链接：https://github.com/google-gemini/gemini-cli/issues/21409

### 3. #19873 — [P2] [架构讨论] 零依赖沙箱 + 零依赖意图路由提升模型 bash 能力
8 条评论，讨论如何利用 Gemini 3 模型对终端命令的原生能力进行安全扩展。属于核心级设计讨论，可能影响后续 Agent 能力和系统安全的交互方式。

链接：https://github.com/google-gemini/gemini-cli/issues/19873

### 4. #22745 — [P2] [评估] AST 感知文件读取、搜索、代码map的评估 7 条评论
探讨基于 AST 的工具是否能以更少的 token、更少的轮次精确读取代码段，提升代码库导航能力。这是基础设施增效方向的重要预研究。

链接：https://github.com/google-gemini/gemini-cli/issues/22745

### 5. #24368 — [P1] [评估] 构建组件级评估体系（7 条评论）
延续 #15300 行为评估（behavioral eval）方向，目前已有 76 个测试覆盖 6 个 Gemini 模型，未来希望推广到组件级的评估框架。

链接：https://github.com/google-gemini/gemini-cli/issues/24368

### 6. #21968 — [P2] Gemini 没充分利用自定义技能和子代理（6 条评论）
开发者经验感受：即使存在相关技能定义，Gemini 在实践中几乎不会主动使用自定义技能或子代理。社区更期望自动根据任务自动调度相关工具。

链接：https://github.com/google-gemini/gemini-cli/issues/21968

### 7. #26522 — [P2] 自动记忆（Auto Memory）对低信号会话无限重试（5 条评论）
只有读取过的会话才会被标记为已处理，若被判定为低价值则永远不会被标记，导致同一会话被反复地重新抽取。建议跳过低信号会话后标记为完成。

链接：https://github.com/google-gemini/gemini-cli/issues/26522

### 8. #21983 — [P1] 浏览器子代理在 Wayland 环境下崩溃 4 条评论
在 Wayland 环境（Linux）执行浏览器子代理任务时，卡在 `GOAL` 终止，且无法正常运行。已在 `status/need-retesting` 并关联 `agent/browser` 标签。

链接：https://github.com/google-gemini/gemini-cli/issues/21983

### 9. #24246 — [P2] 配置超过 128 个工具时返回 400 错误 3 条评论
当嵌套配置产生过多可用工具时，API 调用会拒绝。建议 agent 按作用域智能裁剪启用的工具集，防止触发 400 报错。

链接：https://github.com/google-gemini/gemini-cli/issues/24246

### 10. #23571 — [P2] 模型频繁将临时脚本写入库中的随机位置 3 条评论
模型倾向于在执行任务时往工作区写临时脚本，导致提交清理负担。可考虑禁止或强制临时文件定向写入临时目录。

链接：https://github.com/google-gemini/gemini-cli/issues/23571


## 重要 PR 进展

### 1. #28790 — 核心：修复容量终止时避免重试回归（#28761）
支持无人工介入/非交互执行时自动退避重试，最多 2 轮静默重试，并加入“容量可用性”期间内快速恢复。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28790

### 2. #28794 — 核心：MCP enablement 配置文件损坏不再被当作空配置
修复损坏 JSON 导致的默认启用漏洞与数据丢失问题，杜绝各 MCP 服务意外被启用。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28794

### 3. #28691 — 安全：阻止 Injecting `$VAR` 及 `${VAR}` 的隐式变量扩展绕过
终止 GHSA-wpqr-6v78-jr5g 的变量扩展验证条件，强化 bash/PowerShell 的注入护栏。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28691

### 4. #28692 — 核心：修复 VS Code 扩展和 Wayland 环境下子代理稳定性
当一个 MCP 连接活跃时，IDE 服务器 `stop()` 挂起，且 keep-alive 心跳偶然失败后资源不释放，已修复。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28692

### 5. #28794 — 安全：SSRF 漏洞修复（Web Fetch）
域名解析从同步改为异步 DNS 识别，阻断 `169.254.169.254` 等内网地址穿透，避免绕过安全验证。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28557

### 6. #28738 — 允许子代理递归/调用其他子代理
利用工具：将 `tools:` 用于子代理，支持将任务委托递给其他子代理或递归调用，弥补 Agent 层级+调度能力空缺。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28738

### 7. #28405 — 修复滚动位置跳动：向上滚动阅读内容后主动回到底部
替代“每次更新后强制吸底”行为的逻辑，改为用户主动滚动时不强制吸底。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28405

### 8. #28694 — 新增 Gemini 3.6 Flash 与 3.5 Flash-Lite 模型配置
支持模型映射、`thinking`、多模态工具调用等；同时完善代码执行所需能力配置。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28694

### 9. #28788 — 新增行为评估：URL 获取和技能激活
新增 URL Fetch、技能切换的自动化评估，兼容 Windows 的环境，并对 EDK 报告修复 bug（过滤未执行任务）。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28788

### 10. #28787 — 修复：MCP enablement 配置文件损坏后不视为空
- 区分“文件不存在”与“配置文件损坏”，防止控制台被开关时默认打开。

- 详情：https://github.com/google-gemini/gemini-cli/pull/28787


## 功能需求趋势

从近期频繁讨论的 Issue 总结，社区目前最关注以下几个方向：

- **Agent 自主执行的可靠性**：子代理误报、无限挂起、Shell 卡死等问题被多次反映，推动 Agent 对过程和结果更准确的状态上报。尤其关于子代理中断后“无分析就宣告成功”的反馈，必然会推动对 Agent 内部状态监控的重构。
- **容量感知与弹性重试**：容量相关 400 报错和自动重试策略成为核心关注点，尤其在任务自动运行情况下应提供合理的 backoff 与重试机制，避免用户手工干预。
- **配置与内存系统安全**：MCP 配置损坏的 fail-open 漏洞、自动内存 redaction（确定性脱敏）等方面引发上层设计加固，安全防线整体前移。
- **跨环境对比/更多开发场景**：Wayland 支持、多个工具管理时 400 报错、外部编辑器异常、终端 refresh 卡顿等问题对应性能/兼容性提升。
- **测试基底自动更新**：E2E 测试在不同 CI 条件下的广泛兼容性改造，也是目前关心的问题：随测试规模扩增，基础框架稳定性直接影响功能迭代。


## 开发者关注点

- **MCP 配置安全必点关注**：多个 PR 直接修复损坏配置导致的扩容风险，建议所有依赖 MCP 用户及时升级到发布版。
- **子代理行为状态不可信仍为痛点**：#22323 与 #21763 反映输出不透明、恢复状态误报问题仍未解决，不利于开发排障。
- **过时/异常路径脚本清理**：模型随机在仓库写入临时脚本，拖累协作仓库维护成本。建议在提示上强制临时文件写入受控目录。
- **等待 gating 的 2 个 P1 PR**：修复容量重试和子代理自动调用机制的核心改动都在今日维护中，预计很快会直接影响日常使用质量。
- **新的模型（3.6 Flash）正在进行中**：关注新模型在长视觉/多模态场景中的终版体感，常稳定后尽早升级。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-13

## 今日速览

今日社区活动集中在两个主题：**MCP 远程服务器的稳定性与 OAuth 令牌刷新问题**（#4466、#4464、#4463 集中提交），以及**模型管理与订阅策略的持续争议**（#4390 企业组织模型缺失问题获得最多关注）。值得注意的是，连续提交的 11 条 triage 状态 issue 表明维护团队正在系统性地筛选旧问题——但其中包含**两条完全重复的 issue**（#4460/#4461 和 #4458/#4462）。值得欣喜的是，上周报告的两个渲染与模型问题（#4311、#4385）已确认为已修复或关闭。

---

## 社区热点 Issues（10 个）

### 🔥 模型管理类

1. **#4390 企业组织启用的模型缺失** (👍 4, 💬 5)
   Claude Sonnet 5/Opus 5 和 Kimi K3 在 CLI 模型目录中不可用，即使已在组织侧启用。与 #4422（所有 Claude 模型被禁用）直接相关，可能是服务端配置更新导致的系统性问题。
   🔗 https://github.com/github/copilot-cli/issues/4390

2. **#4422 所有 Claude 模型在 CLI 模型选择中被禁用** (👍 3, 💬 2)
   用户报告此前可用，服务端更新后一夜之间所有 Claude 模型失效，且回滚 CLI 版本也无法解决——指向后端策略变更，而非 CLI 本地问题。
   🔗 https://github.com/github/copilot-cli/issues/4422

3. **#3565 Task 工具通过 multiplier 保护静默降级 subagent 模型** (👍 1)
   自定义 agent 的 `model:` 字段被静默忽略，系统将请求降级至父会话模型，用信号量保护机制做事后修改。本次已标记为 CLOSED（修复中）。
   🔗 https://github.com/github/copilot-cli/issues/3565

4. **#4432 rubber-duck 子代理模型参数静默覆盖互补策略** (👍 0)
   模型发射的 `model` 参数可绕过 `complementary` 策略选择，破坏跨模型的第二评论视图。
   🔗 https://github.com/github/copilot-cli/issues/4432

### 🔥 MCP/认证类

5. **#1305 为远程 OAuth MCP 服务器支持 CIMD** (👍 35，💬 5)
   社区最热门的长期需求：希望在远程 MCP 服务器上实现 CIMD 支持，超越当前的 DCR 标准。35 个 👍 说明这是企业功能中最高优先级的需求。
   🔗 https://github.com/github/copilot-cli/issues/1305

6. **#4464 Entra OAuth 静默刷新 因混合 scope 而失败** 
   刷新请求合并了 `.default` 和资源特定 scope 导致 AADSTS70011，每次令牌过期都会强制互动登录（每 60-75 分钟一次）。
   🔗 https://github.com/github/copilot-cli/issues/4464

7. **#4466 远程 MCP 服务器临时 5xx 导致会话级硬故障** 
   502 错误出现在 `initialize` 阶段，被标记为无重试的失败，严重影响使用网络不稳定 MCP 服务器的长会话。
   🔗 https://github.com/github/copilot-cli/issues/4466

### 🪟 平台/渲染

8. **#4311 增量滚动时终端清空 — 由 1.0.79 确认已修复** 
   原始 issue 中的 `WCr`/ScrollBox 分析被推翻，成功由 1.0.79 修复。适合阅读了解 terminal 渲染调试过程。
   🔗 https://github.com/github/copilot-cli/issues/4311

9. **#4328 Ctrl+H 在 WSL2 下被误解为 Ctrl+Backspace** (💬 6)
   `WT_SESSION` 泄漏问题导致 WSL2 下删除快捷键行为异常，同时涉及 `area:input-keyboard`，影响所有在 Windows 上使用 WSL 的用户。
   🔗 https://github.com/github/copilot-cli/issues/4328

10. **#4455 会话选择器选中但未激活行对比度过低** 
    选中的会话与其它非激活行在视觉上几乎无法区分，UI 可用性问题。
    🔗 https://github.com/github/copilot-cli/issues/4455

---

## 重要 PR 进展

> 24 小时内只发布了 3 个 PR，全部列入：

1. **#4449 将 PR 自动化迁移出 `pull_request_target`**（OPEN）
   从安全性上考虑的一步，减少 `pull_request_target` 的使用权限。变更包括使用 issue-scoped write token 直接关闭无效 issue，并使用无权限信号查看可合并 PR。重点关注 CI 安全性。
   🔗 https://github.com/github/copilot-cli/pull/4449

2. **#4453 "Julesdemangeot ship it patch 1"**（已合并）
   不明确的补丁 PR，已合并。可能需要跟踪合并后的行为。
   🔗 https://github.com/github/copilot-cli/pull/4453

3. **#4452 "Revert 5 copilot/fix with copilot"**（已关闭）
   用户提交的 revert PR，已关闭。
   🔗 https://github.com/github/copilot-cli/pull/4452

---

## 功能需求趋势

1. **MCP 覆盖范围与可靠性** 🟢 增长
   - CIMD 支持（#1305）— 如预期增长
   - 临时 MCP 错误的重试机制（#4466）
   - MCP OAuth 刷新令牌处理（#4464、#4463）

2. **模型启用与切换粒度** 🟢 增长
   - BYOK 模型选择器全面填充（#4358）
   - 企业模型可用性不一致（#4390、#4422）
   - 子代理模型覆盖（#3565、#4432）作为决定初始化的独立治理需求

3. **长会话生命周期管理** 🟡 新
   - 事件存储耗尽（#4467）
   - `--server --stdio` 进程中扩展宿主积累（#4468）
   - 不可消除的权限弹窗（#4469）— 与生命周期控制相关的稳定性问题

4. **远程/无头运行** 🟡 持续
   - 对服务器模式扩展宿主泄漏的修复表明，桌面应用使用场景正持续作为核心场景发展（#4468）。

---

## 开发者关注点

- **Sentiment/压痛点**：企业模型策略的不一致是当前最强烈的不满（1 条用户报告"What was working yesterday broke all of a sudden"）。
- **MCP 远程**：网络不可靠性 + 永久不该放弃的 session。请求在 502 时刻重试，别放弃。
- **iOS（Stream）**：一条值得快速验证的报告，不仅一个，而是两个由同一用户重复提交的报告（#4460/#4461 和 #4458/#4462）意味着流程可能可以针对重复提交做优化。相同的报告比 🔥 高优先级更高，值得提交到 triage 后端。
- **Windows 端**：长期持续的 issue 模式，至少在旧版本可回滚，链表无泄漏。总结起来，仍是一个相对棘手的 agent session 耦合问题。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

### 📋 Kimi Code CLI 社区动态日报 — 2026-08-13

#### 1. 今日速览
过去24小时内，社区最显著动态聚焦于 **长期记忆功能（Memory System）** 的持续高热度讨论（Issue #1283，36条评论），该需求已成为当前最受关注的社区呼声。代码层面，核心修复集中在两个长期停滞的 PR 上：`shorten_middle` 文本截断逻辑的边界修正（#2449）以及 Web 模式下子进程通信的 `BrokenPipeError` 防护（#2324），两件均针对开发中实际遇到的细节缺陷。官方今日无新版本发布，开发重心似乎仍偏向于基础稳定性与社区反馈吸收。

#### 2. 版本发布
**无版本更新。** 过去24小时内无新 Releases 推送，功能迭代暂缓。

---

#### 3. 社区热点 Issues（共1条活跃更新）
> ⚠️ 由于渠道数据限制，今日活跃的 Issue 较少，以下为反映近期用户核心诉求的代表性条目。

- **（🔥高热度）[#1283] 功能需求：内存系统——跨会话持久化上下文** — @CatKang
  - **重要性**：36条评论表明其关注度远高于普通 Issue。该需求直接指向 **CLI 工具“使用记忆”** 的痛点，期望实现双模式：
    - *自动记忆*：AI 可管理笔记；记录项目模式、常规决策。
    - *手动记忆*：用户自定义指令（如 `@remember`），形成用户偏好库。
  - **社区反应**：多数开发者表示支持并持续补充应用场景，如配合 `~/.kimi` 本地配置自动加载项目风格等。
  - **状态**：仍是 [OPEN]，未获官方指派。
  - 🔗 https://github.com/MoonshotAI/kimi-cli/issues/1283

---

#### 4. 重要 PR 进展（当前活跃 2 条）

##### （🔧 修复向）[2449] 修复 `shorten_middle` 短输入时未去除换行符问题 — @Ricardo-M-L
- **内容**：在 `extract_key_argument` 渲染工具调用的单行摘要时，`shorten_middle` 函数会在 `去除换行符` 之前检查短输入并提前返回，导致生成的 `key_argument` 偶尔残留换行符，破坏 `tool_call` 展示效果。
- **技术价值**：优先检查替换顺序的逻辑修复，修复 CLI 输出格式的隐蔽问题。但未注意到基础步骤，PR 创建于6月，至今未合并。
- 🔗 https://github.com/MoonshotAI/kimi-cli/pull/2449

##### （健壮性）修复：Web 模式下子进程已退出时抛出的 `BrokenPipeError`
- **内容**：`SessionProcess.send_message` 在 `stream` 处写入时，只进行了简单的启动保护，未覆盖时长边界：当子进程在 `start()` 与 `write()` 之间结束时，写入会导致未捕获异常。
- **价值回报**：针对 Web 交互模式的核心缺陷，可避免 CLI 在非标准输入输出时中断。
- **状态**：对比代码注释，尚未合并；历史 PR 长期未处理，可能因维护组资源有限。
- 🔗 https://github.com/MoonshotAI/kimi-cli/pull/2344

---

#### 5. 功能需求趋势
基于当前活跃议题与近期仓库冲刺，社区关注方向主要呈现以下趋势：

| 趋势方向 | 典型议题/PR 依据 | 热度判断 |
|--------|------|--------|
| ****持久化记忆与状态管理**** | #1283 的迅速升温 （36 评论） | ⭐⭐⭐⭐⭐ |
| **稳定性与易用性修复** | #2449 的截断逻辑、#2344 的网络异常 | ⭐⭐⭐ |
| **排除误用细节边界** | 几乎所有 PR 都偏向特定的格式化/进程异常解决，而非新功能 | ⭐⭐⭐ |
| **IDE 集成需求** | 仓库暂未出现新增集成趋势（近期评论多针对性 Memory 探讨，未提及） | ⭐ |

> **分析**：当前功能需求高度集中于 `Memory System`，反映出用户对“AI 主动维护项目上下文”的依赖持续加深。IDE 集成虽未在今日 Issue 中显著出现，但此前 GitHub Discussion 中多次存在呼声，今日数据揭示的重点仍偏于记忆机制。

---

#### 6. 开发者关注点
- **痛点一：上下文断裂** — 用户明确请求“切换会话后继续历史知识”，说明当前 Kimi CLI 每次会话独立，缺少项目级公共理解，这是阻碍长期使用的最主要门槛。
- **痛点二：文本输出格式不洁** — 在包输入输出单行摘要时，换行符剥离不力导致执行提示混乱。开发者重视命令行工具细节的规范性。
- **痛点三：进程通信可靠性** — 当使用 Web UI 模式故障时，丢失异常失去自愈机制，影响服务的持续可用，开发者期待异常捕获给予用户明确提示而非终端崩溃。

> 以上即为 2026-08-13 社区关键动态汇总，当前长期停滞的 2 个 PR（可看出维护周期性不佳）或可作为介入信号观察。

---
*本日报基于公开 GitHub 数据自动生成，注释和观点仅代表 AI 分析立场。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-13

## 今日速览

OpenCode 发布 v1.18.17 补丁版本，修复会话压缩与重试机制问题；社区热度集中于 Zen 免费额度误报与订阅计费不同步问题（多起 issue 引发 40+ 条讨论）；贡献者 @kitlangton 密集提交多项 TUI 渲染增强（Mermaid 图表、标注功能）与客户端安全修复，展现活跃的社区共建态势。

---

## 版本发布

### v1.18.17
**核心修复：**
- 会话压缩逻辑改进：保留完整近期对话轮次，并为小模型生成更清晰的摘要
- 新增 MERGE Gateway 推理变体支持（@MatthewFeroz）
- 自动重试机制加入上限与抖动（jitter），避免无限重试导致的服务压力

来源：[GitHub Releases](https://github.com/anomalyco/opencode/releases)

---

## 社区热点 Issues（10 条精选）

### 1. [bug] Free usage exceeded. Add credits（#14273）
- **评论 40 | 👍 1** | 状态：已关闭
- 用户使用 Kimi K2.5/MiniMax2.5 免费版时遭遇误报，即便 Zen 账户有 $3 余额仍提示额度超限。社区反馈该问题持续数月未彻底解决。
- 链接：https://github.com/anomalyco/opencode/issues/14273

### 2. [BUG] Gemini 3 Pro function calling fails（#4832）
- **评论 35 | 👍 14** | 状态：已关闭
- Gemini 3 Pro 函数调用因缺少 `thoughtSignature` 支持而失败，影响所有依赖工具调用的工作流。该 issue 长期挂起，直至近期关闭，推测新版已修复。
- 链接：https://github.com/anomalyco/opencode/issues/4832

### 3. “Copied to clipboard” doesn't work（#41470）
- **评论 11 | 👍 1** | 状态：开启中
- VSCode Server（Docker 环境）下，OpenCode 复制操作提示成功但实际未写入剪贴板。影响远程开发场景。
- 链接：https://github.com/anomalyco/opencode/issues/41470

### 4. [FEATURE] Mermaid rendering in chat（#3366）
- **评论 10 | 👍 26** | 状态：已关闭
- 高赞功能请求：希望 Chat UI 支持 Mermaid 图表渲染。@kitlangton 已陆续提交 GitGraph 和 timeline 渲染 PR（见下文），显示社区需求正被积极落地。
- 链接：https://github.com/anomalyco/opencode/issues/3366

### 5. [BUG] MCP tools connected but not exposed to agent（#33027）
- **评论 7 | 👍 3** | 状态：开启中
- MCP 服务器 `pdfrag` 成功连接并暴露 6 个工具，但 agent 的工具列表中不可见。MCP 集成仍是高频问题区域。
- 链接：https://github.com/anomalyco/opencode/issues/33027

### 6. [FEATURE] Make local file paths clickable in terminal output（#19005）
- **评论 7 | 👍 5** | 状态：开启中
- 终端输出中的本地文件路径不可点击，用户希望支持像 VSCode 那样的路径跳转。该需求已提出近 5 个月仍在开放状态。
- 链接：https://github.com/anomalyco/opencode/issues/19005

### 7. Free Usage Limit Exceeded on First Request（#42128）
- **评论 7 | 👍 5** | 状态：已关闭
- DeepSeek V4 Flash Free 在首次请求即返回"免费额度超限"，即使账户从未有过使用记录。与 #14273 同类问题，但发生在不同模型上。
- 链接：https://github.com/anomalyco/opencode/issues/42128

### 8. [BUG] Zen balance does not remove free usage cap（#33495）
- **评论 6 | 👍 0** | 状态：开启中
- 付费用户（Zen 余额 $20+）仍受免费层 200 请求/日的限制并收到 429 错误。账户身份识别逻辑疑似存在缺陷。
- 链接：https://github.com/anomalyco/opencode/issues/33495

### 9. Error: Unexpected error disk I/O error（#32571）
- **评论 5 | 👍 0** | 状态：开启中
- `opencode --log-level DEBUG debug config` 在任何目录执行即报磁盘 I/O 错误（v1.17.7）。环境相关 bug，复现条件尚不明确。
- 链接：https://github.com/anomalyco/opencode/issues/32571

### 10. Azure OpenAI large models hang（#42147）
- **评论 3 | 👍 0** | 状态：开启中
- 通过 Azure 原生 provider 使用 `gpt-5.6-luna`/`gpt-5.4`/`o3` 等大模型时请求无限挂起，而 `gpt-5-mini` 正常。Responses API 流式处理对大模型存在兼容性问题。
- 链接：https://github.com/anomalyco/opencode/issues/42147

---

## 重要 PR 进展（10 条精选）

### 1. fix(desktop): use matching v2 CLI in WSL（#42199）
- @Hona 提交，将 Desktop WSL 服务器从 opencode 迁移至 opencode2，并要求 WSL CLI 版本与 Desktop 严格匹配，解决 v2 迁移期的版本不兼容问题。
- 链接：https://github.com/anomalyco/opencode/pull/42199

### 2. feat(opencode): add per-session budget limit（#42202）
- 新增按会话预算限制功能，达到成本上限后停止助手响应，并在 TUI 侧边栏 Context 面板提供可视化设置控件。帮助用户控制 API 消耗。
- 链接：https://github.com/anomalyco/opencode/pull/42202

### 3. feat(tui): render Mermaid GitGraph diagrams（#42179）
- @kitlangton 实现 Mermaid `gitGraph` 的终端原生垂直提交图渲染，替代纯文本源码回退。直接回应 #3366 社区功能请求。
- 链接：https://github.com/anomalyco/opencode/pull/42179

### 4. feat(tui): render Mermaid timelines（#42130）
- @kitlangton 在 GitGraph 之后，继续实现 Mermaid `timeline` 图表的终端原生渲染，支持 Bare/TD/LR 三种方向。
- 链接：https://github.com/anomalyco/opencode/pull/42130

### 5. fix(core): subagent sessions inherit ancestor deny rules（#42174）
- 修复权限逃逸问题：此前子代理会话仅检查自身规则集，可绕过祖先的 deny 规则。变更后 deny 作为"围栏"贯穿会话链，ask 规则保持每代理独立。
- 链接：https://github.com/anomalyco/opencode/pull/42174

### 6. feat(catalog): click-to-annotate captures with GitHub issue handoff（#42183）
- @kitlangton 为实验室目录查看器新增点击标注功能，标注内容自动聚合为预填 GitHub issue，简化反馈流程。
- 链接：https://github.com/anomalyco/opencode/pull/42183

### 7. fix(client): prevent stale service replacement（#42185）
- 防止旧版 CLI/Desktop 客户端在更新后替换新版后台服务。此前旧客户端会将新版服务标记为"不兼容"并用旧二进制覆盖，导致版本回退。
- 链接：https://github.com/anomalyco/opencode/pull/42185

### 8. fix(client): require authenticated service stop（#42186）
- 要求托管服务在客户端启动替代进程前完成认证并确认精确实例的停止请求。避免健康检查超时后客户端直接使用 PID 发送 SIGTERM/SIGKILL 的暴力回退。
- 链接：https://github.com/anomalyco/opencode/pull/42186

### 9. fix(client): validate promise service discovery（#42187）
- 为 Promise 客户端的服务注册与健康数据增加类型验证，防止原始或错误类型数据进入生命周期逻辑。
- 链接：https://github.com/anomalyco/opencode/pull/42187

### 10. chore(ci): surface bun exit code with ::warning:: on failure（#42151）
- @niStee 修复 CI 缺陷：`close-prs` 工作流中 bun 脚本失败时静默无提示的问题，现在会以 `::warning::` 注解形式显式暴露在运行日志中。
- 链接：https://github.com/anomalyco/opencode/pull/42151

---

## 功能需求趋势

| 方向 | 代表 Issue/PR | 热度 |
|------|--------------|------|
| **Mermaid 图表渲染** | #3366（+26👍）、PR #42179、#42130 | 高，已有贡献者持续实现 |
| **会话预算/成本控制** | PR #42202 | 中等，企业用户需求明确 |
| **本地文件路径可点击** | #19005（+5👍） | 中等，长期未解决 |
| **权限体系强化** | PR #42174（子代理 deny 继承） | 中等，安全敏感场景刚需 |
| **MCP 信任配置** | #40111 | 低，但面向私有网络用户 |
| **环境变量保护扩展** | #17073（grep/glob 匹配） | 低，安全补强方向 |

---

## 开发者关注点

1. **Zen 免费额度误报**：多起 issue（#14273、#42128、#33495）指向同一问题——付费/有余额用户仍被误判为免费层并限制请求。开发者最迫切的诉求是账户身份识别逻辑的彻底修复。
2. **订阅状态不同步**：用户购买 OpenCode Go 后仍持续收到"Free usage exceeded"提示（#42132、#42140、#42154），且 DeepSeek 部分模型显示仅限中国区，引发计费与可用性双重困惑。
3. **重试机制缺陷**：LLM 流式错误触发无限重试，UI 永久卡在"Thinking..."（#41848）；自动重试虽在 v1.18.17 中增加上限，但用户对前端的错误反馈缺失仍不满意。
4. **Mermaid 渲染需求旺盛**：从功能请求到实际落地（GitGraph、Timeline 的 PR），社区对终端内可视化图表有明确需求，预计后续将覆盖更多图表类型。
5. **Windows/Linux 桌面端稳定性**：WSL 剪贴板失效（#41470）、磁盘 I/O 错误（#32571）、会话加载失败（#42170）等平台相关问题报告增多，桌面端 v2 迁移期稳定性仍是关注焦点。

---

> 📌 数据范围：github.com/anomalyco/opencode | 截至 2026-08-13 24:00 UTC

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-13

## 今日速览

今日 Qwen Code 桌面端连续发布 `v0.2.0` 与 `v0.2.1` 两个版本，重点修复 WebShell 会话历史分页与桌面端稳定性问题。社区侧，`0.21.2` 版本图片加载崩溃回归（#8957）与长任务无法自动运行（#8963）成为最热讨论话题；同时 SDK 对 `auto` 权限模式的支持分歧（#9002 vs PR #9003）也吸引了较多关注。核心团队在 Review 面板、后台代理协调与 WebShell 频道管理上有多项 PR 持续推进。


## 版本发布

### Qwen Code Desktop v0.2.1
**桌面应用补丁版本**，主要变更包括：
- **重构**：默认项目记忆范围调整为工作区（workspace）级别（PR #8856）
- **可观测性**：对齐会话生命周期遥测
- 发布链接：https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.2.1

### Qwen Code Desktop v0.2.0
**桌面应用新版本**，主要变更包括：
- **修复**：稳定 WebShell 会话历史分页（PR #8914）
- **新功能**：新增会话目录分享功能

另有一个 `dsw-eas-smoke-20260812` 基础设施冒烟版本，非生产环境发布，不包含 SWE 评分。


## 社区热点 Issues（10 个）

### 1. #8963 长任务无法自动运行 — 9 条评论
用户反馈在 yolo/auto 模式下运行 Python 脚本或命令时会卡住不动，任务无法持续数小时或数天。用户对比指出 Kimi Code 在 UI 稳定性、闪烁和模式准确性上完胜。该问题反映了**长任务可靠性**是 CLI 用户的核心诉求。

👉 https://github.com/QwenLM/qwen-code/issues/8963

### 2. #8957 [回归] 0.21.2 版本图片加载崩溃 — 8 条评论
用户报告自 `0.21.1`（最后一个正常版本）升级后，读取图片即崩溃。**回归问题**优先级高（P2），需要团队定位引入崩溃的具体提交。

👉 https://github.com/QwenLM/qwen-code/issues/8957

### 3. #7040 RFC：可靠自动记忆召回 — 10 条评论
关于自动记忆召回（auto-memory recall）的时序、质量和遥测设计文档。当前第 2、3 阶段（有界初始召回 + 精确度评估）正处于评审中（PR #8716），是**上下文性能路线图**的核心工作。

👉 https://github.com/QwenLM/qwen-code/issues/7040

### 4. #9016 Vertex AI 无法使用应用默认凭据 — 4 条评论
Vertex AI 认证要求 API Key（且任何 Key 值都会禁用 ADC），导致配置了正确的 `GOOGLE_APPLICATION_CREDENTIALS` 后仍无法认证。Google Cloud 用户集成受阻。

👉 https://github.com/QwenLM/qwen-code/issues/9016

### 5. #9005 Anthropic 线路缺少流安全保护 — 3 条评论
Anthropic wire 缺少 OpenAI wire 已有的流安全保护机制（stream-safety protections）。对代理部署场景（Anthropic 协议）存在稳定性风险，作者标记 P1 并要求尽快审查。

👉 https://github.com/QwenLM/qwen-code/issues/9005

### 6. #8678 会话恢复超时时保留当前会话 — 7 条评论
大型会话恢复超时会导致当前会话丢失。PR #8691 已合并实现超时契约和可观测性部分，剩余工作持续跟踪中。这是**守护进程（daemon）会话管理**的关键问题。

👉 https://github.com/QwenLM/qwen-code/issues/8678

### 7. #8562 tmux 中屏幕闪烁 — 7 条评论
MacBook 通过 iTerm2 SSH 到 Ubuntu 服务器在 tmux 中运行时，对话时屏幕闪烁。用户用 Qwen 排查后确认是 Qwen Code 版本问题（非整个屏幕闪，仅 tmux 分屏内闪烁），部分 Linux/SSH/远程开发用户受影响。

👉 https://github.com/QwenLM/qwen-code/issues/8562

### 8. #8097 后台代理协调缺陷 — 6 条评论
多个后台 Explore 子代理并行运行时存在三类问题：**父代理重复子代理工作**、**过早完成**以及 `send_message` 非交互式消息失败。多代理场景的协调机制仍不成熟。

👉 https://github.com/QwenLM/qwen-code/issues/8097

### 9. #8897 CLI 帮助信息缺失参数 — 5 条评论
`--approval-mode` 和 `--auth-type` 参数已注册可用但未出现在 `qwen --help` 中。CLI 可用性和文档一致性问题。

👉 https://github.com/QwenLM/qwen-code/issues/8897

### 10. #8979 MAX_TOKENS 恢复后 transcript 不一致 — 3 条评论
MAX_TOKENS 输出恢复后，持久化 JSONL transcript 与内存历史不一致（拆分的回合在 `--resume` 时被重复恢复）。影响**会话数据一致性**。

👉 https://github.com/QwenLM/qwen-code/issues/8979


## 重要 PR 进展（10 个）

### 1. #8905 自适应增长直播日志上限 — feat(serve)
当进行中的回合超出会话直播日志上限时，守护进程现在会先尝试增长上限（按比例扩容）再丢弃最早的 replay 条目，避免中途截断影响对话恢复。

👉 https://github.com/QwenLM/qwen-code/pull/8905

### 2. #8972 工作流代理可固定目录并超出默认边界 — feat(core)
三个变更：工作流脚本可通过 `agent({workingDir})` 将代理固定到已有 git worktree；运行中的工作流代理可超出默认边界继续运行。

👉 https://github.com/QwenLM/qwen-code/pull/8972

### 3. #8874 WebShell 支持工作区文件上传 — feat(web-shell)
用户可拖拽文件或从 `@` 文件面板选择“上传文件”，支持多文件顺序上传、进度显示、取消、自动冲突重命名和行内文件预览。

👉 https://github.com/QwenLM/qwen-code/pull/8874

### 4. #8978 空频道集优雅降级 — feat(serve)
`--channel all` 在无频道配置时不再 `exit(1)`，改为无操作继续运行，并在守护进程重启时只恢复之前激活的频道。解决编排器重启时守护进程被完全关停的问题。

👉 https://github.com/QwenLM/qwen-code/pull/8978

### 5. #8994 Review 设置：归属、默认精力和默认评论 — feat(cli)
三个新的 `/review` skill 用户设置，仅从操作者控制的范围解析（系统默认 → 用户 → 系统），仓库级 `.qwen/settings.json` 不可设置，防止仓库控制审查策略。

👉 https://github.com/QwenLM/qwen-code/pull/8994

### 6. #9003 SDK 支持 "auto" 权限模式 — fix(sdk)
Python 和 Java SDK 启动选项现在接受 `auto` 权限模式，与 CLI 和 TypeScript SDK 对齐。同时更新了校验错误消息、公开类型和 README。

👉 https://github.com/QwenLM/qwen-code/pull/9003

### 7. #9020 Review 内联引用缺口修复 — fix(review)
关闭合并 PR #8956 审查中发现的内联级引用缺口：从手写围栏扫描切换为权威 CommonMark 解析器，并加强层门控（layer gate）的稳健性。

👉 https://github.com/QwenLM/qwen-code/pull/9020

### 8. #9022 仓库上下文保持在文件限制内 — fix(review)
将核心技能相关路径的展开范围从整个 skills 子树收窄为顶层 TypeScript 实现/测试 + 每个捆绑技能的 `SKILL.md`，确保总文件数不超限。

👉 https://github.com/QwenLM/qwen-code/pull/9022

### 9. #9007 ACP HTTP 预附加缓冲按字节限制 — fix(serve)
将 ACP HTTP 预附加缓冲从消息条数限制改为按字节限制，更准确控制内存使用，防止超大工具结果撑爆内存。

👉 https://github.com/QwenLM/qwen-code/pull/9007

### 10. #9001 CI 缓存 linter 下载 — fix(ci)
在 ECS runner 上缓存版本化的 actionlint 和 shellcheck 归档，每次运行/尝试/作业使用独立解压目录，并在信任缓存前复制到作业私有临时目录中验证。减少 CI 不稳定和 ENOSPC。

👉 https://github.com/QwenLM/qwen-code/pull/9001


## 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

| 方向 | 代表 Issue | 热度 |
|------|-----------|------|
| **自动记忆召回**（时序/质量/遥测） | #7040 | 高（10+ 评论） |
| **长任务/自动运行稳定性** | #8963 | 高（9 条评论） |
| **WebShell 文件上传/会话管理** | #8874, #8977 | 中 |
| **频道（Channel）管理与会话轮换** | #8975, #8927, #8848 | 中 |
| **多代理协调与后台任务** | #8097 | 中 |
| **CLI 参数/帮助信息一致性** | #8897 | 中 |
| **认证方式灵活性**（ADC/API Key） | #9016 | 中 |
| **多模态接入（Omni 实验）** | #8197 | 中（实验性） |
| **工具输出截断阈值可配置** | #8922 | 低 |
| **Electron 桌面应用弃用 + Tauri 接管** | #8596 | 低 |


## 开发者关注点

**高频痛点：**

1. **回归问题频发**：`0.21.2` 图片加载崩溃（#8957）严重影响了正常使用，社区对版本质量提出质疑
2. **长任务可靠性**：夜间/长时间任务无法自动完成（#8963）成为 CLI 用户核心诉求，对比竞品（Kimi Code）后差距明显
3. **远程/终端环境兼容性**：tmux 闪烁（#8562）影响 SSH 远程开发场景；Virtualized History 模式文本不可选中（#8131 已关闭）此前也有反馈
4. **认证体验**：Vertex AI 无法使用 ADC（#9016）阻断 Google Cloud 用户；`--approval-mode`/`--auth-type` 不在帮助中（#8897）影响可发现性
5. **会话数据一致性**：MAX_TOKENS 恢复后的 transcript 不一致（#8979）、大会话恢复超时（#8678）影响长会话可靠性

**积极信号：**

- 守护进程会话管理持续完善：超时契约、资源保护拆分、直播日志自适应增长均进入审查/合并阶段
- Review 面板体验持续打磨：归属配置、引用修复、层门控强化等多个 PR 同日更新
- SDK 与 CLI 对齐持续推进：`auto` 权限模式从 Python/Java SDK 补上，web-shell 文件上传补上工作流最后一环
- CI 稳定性问题被主动治理（#8982、#9001），团队对基础设施稳定性投入明显加大

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*