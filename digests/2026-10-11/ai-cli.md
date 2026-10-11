# AI CLI 工具社区动态日报 2026-10-11

> 生成时间: 2026-10-11 02:45 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-10-11）

## 1. 生态全景

当前 AI CLI 工具已从"单点代码生成"演进为**覆盖本地开发、云端任务、多 Agent 协作的完整工作流平台**，各工具在功能深化的同时呈现出明显的痛点趋同：会话连续性、上下文记忆保持、Windows 平台稳定性、以及跨端/跨设备一致性成为全行业共同攻坚的难题。头部工具（Claude Code、Codex）社区讨论深度与用户规模领先，处于功能精细化阶段；第二梯队（Gemini CLI、OpenCode、Qwen Code）则在 Agent 可靠性、多 Agent 架构与 TUI 体验上加速追赶。值得注意的是，**上下文压缩导致的能力退化**和**数据损坏类 bug**已从个别抱怨上升为高赞共识，正在倒逼各工具重新设计上下文管理机制。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues 数 | 今日 PR 数 | Release | 社区活跃特征 |
|------|-------------|-----------|---------|-------------|
| **Claude Code** | 10 个（评论数最高 38，👍 最高 43） | 2（1 关闭） | 无 | 讨论深度最高，企业级用户诉求突出 |
| **OpenAI Codex** | 10 个（👍 最高 42） | 13（全部合入） | 无 | PR 合并频繁，代码迭代速度快 |
| **Gemini CLI** | 10 个（含 3 个 P1） | 10（2 关闭） | 无 | Bug 定位明确，性能优化 PR 有实证数据 |
| **GitHub Copilot CLI** | 至少 5 个（评论最高 12） | 0 | 无 | 社区反馈密集但 PR 沉寂，22 个 Issue 有更新 |
| **Kimi Code CLI** | 0（24h 无新增） | 1（已关闭） | 无 | 社区活跃度最低，处于静默期 |
| **OpenCode** | 10 个 | 10 | **v1.19.0** | v2 迁移期，版本文档与 API 缺口讨论集中 |
| **Qwen Code** | 10 个（含 2 个 P1） | 10 | **v0.25.1-preview.2** | Managed Agent 密集攻坚，架构性讨论深入 |

*数据说明：各工具均统计过去 24 小时动态，Issue/PR 数为日报中列出的重点条目，实际活跃数更高。*

## 3. 共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|---------|
| **上下文压缩与会话记忆保持** | Claude Code（#70555、#75759）、Codex（#52937 保留工具输出）、Qwen Code（#13599 压缩前收缩工具结果） | 压缩不应只截断对话，须保留工作记忆与任务状态；压缩时机和策略需要量化管理 |
| **Windows 平台稳定性与编码安全** | Claude Code（#7134 编码损坏、#92328 误删文件）、Codex（#51917 工作区加载失败、#35446 Computer Use 死锁）、Gemini CLI（#29510 命令注入修复） | Windows 用户体验明显落后于 macOS，从文件编码到沙箱配置存在系统性缺陷 |
| **会话交接与跨端一致性** | Claude Code（#11455 会话交接）、Codex（#50136 跨端任务可见性不一致、#49829 Dot 任务桌面打不开）、Qwen Code（#13436 跨会话恢复保留取消意图） | 从"个人续跑"到"团队交接"、从本地到云端的无缝状态迁移成为核心工作流缺口 |
| **子代理/多 Agent 可靠性与可观测性** | Gemini CLI（#22323 误报成功、#21409 无限挂起）、Qwen Code（#13857 Harness 重启阻塞、#13785 公共 API 身份维度）、Claude Code（#91351 工作记忆丢失） | 子代理异常终止时状态误报、多 Agent 执行无法归属与中断，制约自动化流程可信度 |
| **TUI/桌面端交互精细化** | Claude Code（Enter 键行为共获 72 👍）、Codex（#21252 隐藏工具活动 33 👍）、OpenCode（"exiting loop"、/diff 卡死） | 长会话信息密度控制、快捷键可配置性、渲染稳定性成为体验竞争焦点 |
| **安全与权限治理** | Gemini CLI（#22672 阻止破坏性命令）、Claude Code（#91546 includeCoAuthoredBy 失效）、OpenCode（权限设置不生效）、Codex（DeviceCheck 失败阻断使用） | 安全机制的不透明失败正在影响正常使用，对危险操作（force push、批量删除）需增加护栏 |

## 4. 差异化定位分析

**Claude Code——企业级工作流深耕者**：社区讨论最深（#11455 达 38 条评论），诉求集中于会话交接、长任务工作记忆、合规控制（trailer 关闭）。用户画像偏向系统集成商与企业开发团队，对 2.0 生态互操作（插件、钩子）有期待。当前短板是桌面端交互明显滞后于 terminal 端。

**OpenAI Codex——云端一体化与生态整合者**：依托 ChatGPT 生态，重点打通云任务跨端消费链路（桌面/Web/iOS/Dot），13 个 PR 全部合入展示了 OpenAI 系高效的工程执行力。当前核心矛盾是 Windows 端高发 bug 与 macOS 体验差距，以及云任务在不同端之间的状态一致性。

**Gemini CLI——Agent 能力激进探索者**：P1 bug 聚焦 Agent 可靠性（子代理误报、无限挂起），同时也最积极尝试前沿方向——AST 感知工具链（#22745）、零依赖 OS 沙箱释放 bash 亲和力（#19873）。社区对性能优化 PR 有量化基准验证习惯（291.95ms→10.26ms），技术氛围浓厚。

**GitHub Copilot CLI——生态嵌入型选手**：活跃度集中在认证流程、沙箱权限、模型路由（HydraFusion 降级无感知）等 GitHub 生态特有问题上，Issue 讨论密集但 PR 沉寂，或反映内部开发主战场不在该仓库。ACP 协议的性能问题（#5108 全量扫描）值得关注。

**Kimi Code CLI——静默蓄力期**：24 小时无任何 Issue 动态，仅文档 PR 关闭，社区活跃度处于最低谷。从 PR 内容看仍在完善 AGENTS.md 工作流标准化，尚未进入大规模用户反馈驱动阶段。

**OpenCode——极客向的 Claude Code 替代品**：聚焦类 Claude Code 工作流命令（/loop、钩子兼容）、多 TUI 共享 server 的事件隔离、自定义 provider 体验，v2 迁移期的 API 兼容问题凸显。用户技术栈偏新（bun、AI SDK），对第三方客户端生态有较强诉求。

**Qwen Code——多 Agent 架构的工程攻坚者**：与 Gemini 同为多 Agent 赛道，但重心不在模型能力而在托管架构——Harness 重启恢复、事务一致性、公共 API 设计。同时兼顾国际化（DingTalk/WeCom 消息分割、Unicode 补全）。

## 5. 社区热度与成熟度

**成熟稳定期**：**Claude Code** 和 **OpenAI Codex** 社区体量最大、讨论深度最高。Claude Code 的 Issue 评论数（38 条）和 Codex 的 PR 合并密度（13 个/日）分别代表了"深度讨论"和"高速迭代"两种成熟形态。两者的共性问题是历史包袱——长年累积的 bug 类型（压缩后变笨、Windows 编码损坏）在用户群体中已形成集体记忆。

**快速迭代期**：**Gemini CLI** 和 **OpenCode** 处于功能快速扩展阶段，PR 活跃（各 10 个），且社区对性能优化和 TUI 体验有具体量化诉求。OpenCode 的 v1.19.0 发布与 v2 迁移并行，API 兼容问题正在被第三方生态反哺；Gemini CLI 则在修复 P1 bug 的同时探索 AST 等下一代能力。

**工程攻坚期**：**Qwen Code** 当前焦点不在社区规模而在 Managed Agent 架构的可靠性——多个 P1 bug（#13857、#13873）直接关系托管服务可用性，发布节奏稳定（preview 版本迭代）。**GitHub Copilot CLI** 和 **Kimi Code CLI** 社区热度相对较低，分别受限于生态定位和项目阶段。

## 6. 值得关注的趋势信号

**信号一：上下文管理正在从"截断策略"走向"工作记忆工程"**。Claude Code 的压缩后变笨、Codex 的 compaction 保留标记、Qwen 的压缩阈值量化——各工具在同一时间点从不同角度回应同一问题：**压缩不是删除，而是记忆的提炼与迁移**。开发者应关注所在工具的压缩机制是否保留任务状态、工具输出和用户意图，而非仅看上下文窗口大小。

**信号二：Windows 支持已成为 AI CLI 工具的"第二战场"**。从 Claude Code 的编码损坏导致误删文件（high-priority, data-loss）、到 Codex 的工作区设置加载失败、再到 Gemini 的 Windows 命令注入修复——Windows 端问题不再是"体验降级"而是"数据安全风险"。对 Windows 重度用户，在选择工具时需评估其对编码、路径、shell 语义的兼容成熟度。

**信号三：多 Agent 协作正从"能用"走向"可治理"**。Qwen 的公共 API 身份维度提议、Gemini 的子代理状态误报、Claude Code 的会话交接——多 Agent 不再只是"能不能跑"，而是要求**每个 agent 的行为可归属、状态可恢复、结果可验证**。自动化流程的可靠性取决于此。

**信号四：安全与权限的"不透明失败"正在侵蚀信任**。Claude Code 的 includeCoAuthoredBy 设置静默失效、Codex 的 DeviceCheck 失败直接禁用发送按钮、OpenCode 的权限设置不生效——安全机制出错时往往以最不透明的方式阻断工作流。工具的安全设计需要从"默认拒绝"演进为"失败可诊断"。

**信号五：TUI/桌面交互正成为竞争分水岭**。Claude Code 的 Enter 键需求获 72 赞、Codex 的隐藏工具活动开关 33 赞、OpenCode 的 /diff 卡死——当 Agent 能力趋同后，**信息密度控制、快捷键可配置性、渲染稳定性**成为用户粘性的决定因素。长会话场景下，用户需要的是"可折叠的过程"而非"不可跳过的日志"。

**信号六：自定义 provider 与模型路由的透明度需求上升**。OpenCode 自动探测自定义 provider 上下文限制、Copilot 的 HydraFusion 静默降级、Gemini 的工具数量超限报错——随着模型选择多元化，用户要求**知道当前用的是哪个模型、为什么降级、以及如何干预路由策略**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-10-11）

---

## 1. 热门 Skills 排行

> 注：原始数据中 PR 评论数未完整返回，以下按「更新活跃度 + 关联 Issue 热度 + 影响范围」综合排序。

### ① fix(mcp-builder): 适配 MCP ≥ 2.0 的 streamable_http_client 与自定义 Headers
- **功能**：修复 `mcp>=2.0.0` 下 `streamablehttp_client` 重命名为 `streamable_http_client` 的兼容问题，并支持通过 `create_mcp_http_client` 配置自定义 HTTP 头。
- **社区热点**：直接回应 Issue #1668，是 MCP 生态升级后最紧迫的兼容性修复；PR 自 9 月 8 日创建以来持续更新至 10 月 8 日，仍处于 open 状态。
- **状态**：🟡 open
- 链接：https://github.com/anthropics/skills/pull/1742

### ② fix(skill-creator): 隔离 trigger 评估，修复 Windows 与运行时失败
- **功能**：解决 trigger 评估的误报/漏报——并行 worker 命令探测竞争、Windows 下 subprocess 管道 `select()` 失败、无关工具中断扫描，以及运行时失败被误判为"非触发"导致负例错误通过。
- **社区热点**：与 Issue #1383（6 个可复现问题）、#1352（并行 worker 交叉匹配 UUID）直接对应，是 skill-creator 质量问题的核心修复，社区关注度高。
- **状态**：🟡 open（6 月创建，9 月中仍在更新）
- 链接：https://github.com/anthropics/skills/pull/1298

### ③ feat: proofcore-contract-auditor —— 智能合约公证审计 Skill
- **功能**：为 Web3 开发者提供 Solidity/Rust 合约自动化静态分析，并将审计密码学证明锚定到 TON 区块链（零存储 Merkle 协议）。
- **社区热点**：9 月 15 日新提交的垂直领域 Skill，代表区块链/安全审计方向开始向 Skills 生态渗透。
- **状态**：🟡 open
- 链接：https://github.com/anthropics/skills/pull/1771

### ④ Add md2video-audio: Markdown 一键生成带配音视频
- **功能**：零成本将 Markdown 文档经 Marp 转为演示文稿，并合成真人级语音旁白，输出 MP4。
- **社区热点**：面向内容生产/教学场景的创作类 Skill，与既有 document-skills 形成互补，讨论点集中在语音合成质量与工作流链路。
- **状态**：🟡 open（9 月 15 日最后更新）
- 链接：https://github.com/anthropics/skills/pull/1703

### ⑤ feat: AWT（AI Watch Tester）—— AI 驱动的 E2E 测试 Skill
- **功能**：给 Claude 提供视觉与浏览器控制能力，实现零代码 E2E 测试生成与自动执行。
- **社区热点**：3 月提交后持续迭代至 9 月，是测试自动化方向最受关注的 PR 之一；与社区对"质量保障自动化"的呼声契合。
- **状态**：🟡 open（更新跨度最长之一）
- 链接：https://github.com/anthropics/skills/pull/822

### ⑥ Add notion-spec-to-implementation + quantitative-resume-auditor
- **功能**：前者将产品/技术规格书自动拆解为可执行的 Notion 任务清单（含验收标准与进度跟踪）；后者做量化简历审计。
- **社区热点**：覆盖「需求 → 实现」工作流自动化与招聘场景，代表生产力工具型 Skill 的两个典型方向。
- **状态**：🟡 open（6 月创建，9 月底仍更新）
- 链接：https://github.com/anthropics/skills/pull/1245

### ⑦ Add document-typography: AI 生成文档排版质量管控
- **功能**：检测 AI 文档的孤行（1-6 词溢出换行）、寡妇段落（标题滞留页底）、编号错位等排版问题。
- **社区热点**：3 月提交至今仍 open，讨论聚焦"用户不主动要求但 AI 输出普遍存在"的质量痛点，属于高感知度需求。
- **状态**：🟡 open（3 月后无近期更新，落地可能性需观察）
- 链接：https://github.com/anthropics/skills/pull/514

### ⑧ skill-creator: 加固 eval viewer（脚本逃逸 / DNS rebinding / XSS）
- **功能**：修复本地 eval 渲染页面的三重安全漏洞——数据 JSON 内嵌导致的脚本逃逸、localhost 服务 DNS rebinding、跨站 POST。
- **社区热点**：直接响应 Issue #1394（XSS 与属性转义缺陷），是安全加固类 PR 中最新且技术深度最高的一个。
- **状态**：🟡 open（10 月 3 日创建，仍活跃）
- 链接：https://github.com/anthropics/skills/pull/1961

---

## 2. 社区需求趋势

### 🔴 安全与信任边界（最强烈）
- **Issue #492**（43 评论）：社区制作的 Skills 借 `anthropic/` 命名空间分发，构成信任边界滥用——用户可能误以为官方 Skill 而授予过高权限。这是整个 Issues 区讨论量最高的话题，直接倒逼官方收紧 Skill 分发与签名机制。
- 关联：#1394（eval-viewer XSS）、#1175（SharePoint 文档处理的安全/上下文担忧）。

### 🟠 skill-creator 评估工具链可靠性（高频 Bug 集中地）
- **Issue #556**（12 评论）：`run_eval.py` 用 `claude -p` 跑测试时 trigger 率为 0%，所有查询都不触发 Skill。
- **Issue #1383**（4 评论）：6 个可复现问题——目录布局不兼容、基准静默失败、Windows 下 trigger 评估损坏等。
- **Issue #1352**（4 评论）：并行 worker 交叉匹配 Skill UUID，导致 trigger rate ≈ 0 的静默误报。
- **Issue #1390**（4 评论）：MCP builder 评估器对真实服务器全部 0 分，TextContent 序列化异常被吞成"工具错误"。

> 结论：**Skill 元工具（skill-creator）自身质量已成为最大瓶颈**，高频的静默失败正在动摇社区对评估结果的信任。

### 🟡 企业级共享与治理
- **Issue #228**（16 评论，8 👍）：组织内无法直接共享 Skills，只能手动传文件 + 设置页上传。社区强烈期望组织级 Skill 库/分享链接。
- **Issue #412**：agent-governance Skill 提案——策略执行、威胁检测、信任评分与审计追踪。

### 🟢 上下文窗口效率
- **Issue #1487**：`claude-api` Skill 单次工具调用注入约 **15.6 万 token**，直接耗尽上下文窗口——效率问题已从"优化"变成"事故级"。
- **Issue #1329**：compact-memory 提案，用符号化记法压缩 Agent 长期记忆。
- **Issue #189**（9 👍）：document-skills 与 example-skills 插件内容重复安装，白白占用上下文。

---

## 3. 高潜力待合并 Skills（PR 活跃但未合并，近期可能落地）

| PR | Skill/修复 | 最后更新 | 潜力判断 |
|---|---|---|---|
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder MCP≥2 兼容 | 2026-10-08 | ⭐ 高：阻塞性兼容修复，MCP 2.x 用户均受影响 |
| [#1681](https://github.com/anthropics/skills/pull/1681) | skill-creator 支持直接运行 package_skill.py | 2026-10-08 | ⭐ 高：开发者日常使用路径修复 |
| [#1961](https://github.com/anthropics/skills/pull/1961) | eval viewer 安全加固 | 2026-10-07 | ⭐ 高：对应 #1394 安全 Issue，官方可能优先合入 |
| [#1730](https://github.com/anthropics/skills/pull/1730) | claude-api 死链修复 | 2026-10-04 | 中：低风险高收益的文档修复 |
| [#1703](https://github.com/anthropics/skills/pull/1703) | md2video-audio 新 Skill | 2026-09-15 | 中：新方向但长期未更新，需观察维护意愿 |
| [#1245](https://github.com/anthropics/skills/pull/1245) | notion-spec-to-implementation | 2026-09-30 |

---

# Claude Code 社区动态日报 — 2026-10-11

## 今日速览

今日社区焦点集中在**会话连续性与工作记忆保持**，#11455、#70555、#75759 等多个相关 Issue 同时活跃更新，反映长会话场景下状态丢失问题已成普遍痛点；**Windows 平台编码缺陷**继续发酵，#7134、#92328 等暴露了从文件损坏到误删数据的严重风险；桌面应用 **Enter 键行为与 keybindings 支持**获得社区高赞（#89673 👍43、#95125 👍29），成为呼声最高的交互改进方向。

## 社区热点 Issues

### 1. Session Handoff / 会话交接与连续性支持
**#11455** | [链接](https://github.com/anthropics/claude-code/issues/11455)
- **概况**：系统集成商提出完整的会话交接功能提案，要求 CLI 支持跨会话状态保存与恢复。
- **热度**：38 条评论、26 👍，自 2025-11 创建至今持续活跃近一年。
- **价值**：评论数居所有 Issue 之首，说明企业级用户对长周期任务交接有强烈刚需，但官方迟迟未落地。

### 2. Windows-1252 文件被错误编码破坏
**#7134** | [链接](https://github.com/anthropics/claude-code/issues/7134)
- **概况**：Claude Code 不尊重原文件编码，导致 Windows-1252 文件被损坏（CLI 1.0.103，Windows 11）。
- **热度**：32 条评论、30 👍，点赞数并列第一。
- **价值**：影响存量 Windows 项目文件完整性，属高影响数据损坏类 bug，社区讨论集中在编码检测策略缺陷。

### 3. Max 5x→20x 升级支付失败
**#56281** | [链接](https://github.com/anthropics/claude-code/issues/56281)
- **概况**：用户升级付费套餐时支付反复失败，且支持渠道无响应。
- **热度**：28 条评论、9 👍。
- **价值**：虽标记 invalid，但评论数高企，反映付费流程与客服响应问题正显著消耗用户信任，值得官方关注。

### 4. 压缩与 /clear 后"变笨"问题
**#70555** | [链接](https://github.com/anthropics/claude-code/issues/70555)
- **概况**：长会话中上下文压缩或 /clear 后，助手丢失工作状态，重复推导、遗忘进行中的线程。
- **热度**：20 条评论。
- **价值**：直指上下文压缩机制的核心缺陷——压缩不应只截断对话，还须保留工作记忆。与 #75759、#91351 等形成同主题集群。

### 5. 桌面应用 Enter 提交行为（最高赞）
**#89673** | [链接](https://github.com/anthropics/claude-code/issues/89673)
- **概况**：希望桌面版聊天输入框支持 Enter 换行、Ctrl+Enter 提交，且 keybindings.json 目前完全无效。
- **热度**：43 👍，全场最高，8 条评论。
- **价值**：与 #95125、#90878、#100647 构成四连击，是社区公认的桌面端交互缺陷，官方在 terminal 支持 keybindings 后迟迟未同步桌面版。

### 6. 桌面应用 Enter 换行请求（另一角度）
**#95125** | [链接](https://github.com/anthropics/claude-code/issues/95125)
- **概况**：同一问题的平行请求，长文用户频繁误提交未完成消息。
- **热度**：29 👍、9 条评论。
- **价值**：与 #89673 叠加后，该需求总计获 72 👍，是当前社区共识度最高的功能请求。

### 7. Bedrock 平台上下文压缩丢失会话内记忆
**#75759** | [链接](https://github.com/anthropics/claude-code/issues/75759)
- **概况**：Bedrock API 下，压缩发生时会话内早前动作被遗忘，且会话未关闭、非跨会话问题。
- **热度**：10 条评论。
- **价值**：证明该问题跨 API 平台普遍存在，并非单一部署方式特有，增加问题复现范围的可信度。

### 8. Windows/VSCode 并发 OAuth 刷新竞争
**#91708** | [链接](https://github.com/anthropics/claude-code/issues/91708)
- **概况**：多进程并发刷新 OAuth 时竞态写文件凭证库，导致 400 错误与强制重新登录。
- **热度**：6 条评论。
- **价值**：多窗口/多终端重度用户的典型场景，暴露文件凭证存储的并发安全缺陷。

### 9. includeCoAuthoredBy:false 仍添加 Claude-Session 尾注
**#91546** | [链接](https://github.com/anthropics/claude-code/issues/91546)
- **概况**：用户显式关闭 includeCoAuthoredBy，提交信息仍被追加 Claude-Session trailer，PR 正文仍带裸会话 URL，属回归。
- **热度**：6 条评论、5 👍。
- **价值**：涉及合规与隐私控制，官方设置项失效比功能缺失更严重，且是 #66504 的回归。

### 10. .cmd 编码缺陷导致误删所有文件
**#92328** | [链接](https://github.com/anthropics/claude-code/issues/92328)
- **概况**：Write 工具生成 UTF-8 + LF 的 .cmd，cmd.exe(CP932) 在多字节字符后吞掉 LF，`del /F /Q "%VAR%"` 退化为 `del /F /Q ""`，删除 CWD 全部文件。
- **热度**：1 条评论，但标签 high-priority、data-loss。
- **价值**：单条评论但危害极大，是今日最危险的 bug——一行坏编码可导致灾难性数据丢失。

## 重要 PR 进展

> 说明：过去 24 小时仅 2 条 PR 更新（其中 1 条已关闭），暂无重大代码合并。

### 1. security-guidance 插件同步至 2.0.13（已关闭）
**#101131** | [链接](https://github.com/anthropics/claude-code/pull/101131)
- **作者**：@mhegazy
- **内容**：同步官方 claude-plugins-official 的 security-guidance 插件至 2.0.13，修复 marketplace 版本描述落后问题。
- **意义**：官方正在维护插件市场的安全策略组件，但 PR 已关闭（未合并），原因需进一步确认。

### 2. 新增 RTL 支持文档（长期未合并）
**#6754** | [链接](https://github.com/anthropics/claude-code/pull/6754)
- **作者**：@netanelndnd
- **内容**：新增 `rtl-support.md` 文档，解决 VS Code 集成终端中希伯来语/阿拉伯语/波斯语文本反转问题。
- **状态**：2025-08-28 创建，至今一年仍未合并，最近更新 2026-10-10。
- **意义**：文档类 PR 长期搁置，反映非英语用户痛点未被优先处理。

## 功能需求趋势

### 1. 会话交接与连续性（最强信号）
- **代表 Issue**：#11455（交接）、#73639（跨实例转移）、#98937（一键交接给队友）、#95073（云↔本地迁移、#100913（长会话成本优化）
- **趋势解读**：从个人续跑到团队协作、从本地到云，社区需求已从"能不能续会话"演进到"如何无缝交接"。这是继 agent 能力之后最核心的工作流缺口。

### 2. 桌面应用交互定制
- **代表 Issue**：#89673、#95125、#90878、#100647（Enter

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-10-11

## 今日速览

今日无新版本发布，社区主要集中于 Windows 端多项顽固 Bug 的持续讨论（沙箱配置、工作区加载、Computer Use 死锁等），以及云端任务跨端一致性、TUI/CLI 可用性增强。PR 侧，`copyberry[bot]` 批量合入了 13 个聚焦 TUI 稳定性与底层运行时健壮性的修复，涵盖 WSL 剪贴板预热、粘贴性能优化、exec 运行时重置上报等。

## 版本发布

（过去 24 小时无新 Release）

## 社区热点 Issues

精选 10 个最值得关注的 Issue，按热度排序：

1. **ChatGPT 网页版 “Too many requests” 限流阻断聊天及 Work 任务**
   [openai/codex#38503](https://github.com/openai/codex/issues/38503) | 评论 29 | 👍 21
   持续近两个月的限流问题仍在发酵，影响 Web 端普通聊天与 Work 任务并行场景。原报告发生在 8 月 14 日，至今未修复，社区对限流策略与桌面端共存时的冲突表示不满。

2. **Windows 10 Computer Use 在 FrameArrived 内等待 SoftwareBitmap 转换时死锁**
   [openai/codex#35446](https://github.com/openai/codex/issues/35446) | 评论 21
   Windows 10 22H2 上 Computer Use 的屏幕捕获流程存在死锁，导致功能完全卡死。报告已有两个多月，是 Windows 端 Computer Use 的已知顽疾。

3. **[Windows] 更新后 “Couldn't load workspace settings” 仍阻断新聊天**
   [openai/codex#51917](https://github.com/openai/codex/issues/51917) | 评论 16 | 👍 7
   原报告者确认更新至 26.1007.21434 后问题依旧。工作区设置加载失败直接阻断新聊天，是当前 Windows 桌面端影响面最广的阻断性问题之一。

4. **Dot 任务在桌面端因 WebSocket 需走代理而无法打开（app-server is not available）**
   [openai/codex#49829](https://github.com/openai/codex/issues/49829) | 评论 16 | 👍 3
   在需要代理的网络环境下，Dot 创建的云任务无法在桌面端恢复，但 Web 端正常。涉及桌面端与云端的连接层兼容性。

5. **【需求】TUI 增加隐藏工具活动（tool activity）的 CLI 选项**
   [openai/codex#21252](https://github.com/openai/codex/issues/21252) | 评论 15 | 👍 33
   高赞需求：长会话中工具调用的单元格占据大量 TUI 空间，用户希望有一个开关用来折叠/隐藏工具过程，只看推理摘要和最终答案。

6. **云任务在桌面、Web、iOS、Dot 之间的可见性与读写行为不一致**
   [openai/codex#50136](https://github.com/openai/codex/issues/50136) | 评论 14 | 👍 4
   Dot 创建的任务不出现在 Web/iOS 任务列表，而用户创建的任务可通过 Dot 读取但不能继续。跨端数据一致性问题影响多设备工作流。

7. **【需求】Codex App 增加 “Start from scratch” 项目默认父文件夹设置**
   [openai/codex#19913](https://github.com/openai/codex/issues/19913) | 评论 12 | 👍 42
   当前日报中 👍 数量最高的 Issue。macOS 用户希望能在设置中指定默认项目父目录，避免每次手动选择，属于高频效率需求。

8. **Mini 的全局快捷键无法在设置中更改或禁用**
   [openai/codex#48756](https://github.com/openai/codex/issues/48756) | 评论 12 | 👍 37
   macOS 上 Codex App 强制注册 ⌥+Space 全局快捷键，与用户其他应用冲突且无法关闭或重绑定，反馈强烈。

9. **Codex Desktop 内嵌浏览器无法绕过 HTTPS localhost 证书错误**
   [openai/codex#23891](https://github.com/openai/codex/issues/23891) | 评论 10 | 👍 18
   `ERR_CERT_AUTHORITY_INVALID` 时无 “继续访问” 选项，导致本地 HTTPS 开发服务器无法在桌面内嵌浏览器中调试，影响本地 Web 开发闭环。

10. **User Skills 声明的子资源被 resources/read 拒绝（Unknown resource）**
    [openai/codex#53002](https://github.com/openai/codex/issues/53002) | 评论 10
    新建 Issue 但讨论快速上升。Skill 声明的子资源无法被标准 resources/read 读取，影响 Skill 生态的工具链互通性。

## 重要 PR 进展

过去 24 小时内 13 个 PR 全部合入（均为 `copyberry[bot]` 提交），以下为值得关注的 10 个：

1. **为 TUI 增加可搜索的 `/config` 偏好设置面板**
   [openai/codex#52990](https://github.com/openai/codex/pull/52990)
   将外观、通知、输入、会话等偏好设置分组并支持搜索，配合主题、状态栏、终端标题、键盘编辑器入口联动，提升 TUI 可发现性。

2. **升级 `rmcp` 至 3.5.1，加固生命周期测试**
   [openai/codex#52972](https://github.com/openai/codex/pull/52972)
   更新 MCP 依赖并迁移 handler 到新的 `ClientConfig`/`ServerConfig`，同时修正取消请求在测试中的响应处理。

3. **WSL 剪贴板读取器复用与预预热（prewarm）**
   [openai/codex#52967](https://github.com/openai/codex/pull/52967)
   修复 WSL 下每次粘贴都启动 PowerShell 导致的高延迟/卡顿，改为专用线程复用持久化 reader。

4. **原始粘贴（raw paste）突发期间延迟 transcript 重绘**
   [openai/codex#52964](https://github.com/openai/codex/pull/52964)
   优化千级字符/事件的粘贴场景，避免 composer 批处理被频繁整页重绘打断。

5. **降低异步 TUI 测试的栈使用**
   [openai/codex#52959](https://github.com/openai/codex/pull/52959)
   引入 `box_future` / `boxed_future!` 机制，避免大型测试 future 在调用方栈帧上展开导致爆栈。

6. **验证 code-mode 主机恢复时的重置通知**
   [openai/codex#52952](https://github.com/openai/codex/pull/52952)
   扩展 gRPC host 替换测试，断言丢失存储值与运行单元格的状态会正确上报，且失败执行不写入新值。

7. **保持 agent command center 行在进度更新时稳定**
   [openai/codex#52946](https://github.com/openai/codex/pull/52946)
   修复进度更新导致任务时间戳变化、触发重排序后行跳动的问题，同一状态组内保持相对顺序。

8. **跨 compaction 保留客户端标记的工具输出**
   [openai/codex#52937](https://github.com/openai/codex/pull/52937)
   默认关闭的 `retain: true` 标记现在可在 compaction 后仍被保留，避免携带任务指令的工具输出在压缩历史时丢失。

9. **接受新请求前先上报 exec 运行时重置**
   [openai/codex#52825](https://github.com/openai/codex/pull/52825)
   修复 gRPC code-mode 运行时被替换后静默继续的问题——现在会先明确告知存储值与运行单元格已丢失，再接受后续请求。

10. **语音会话失败分类与终态记录**
    [openai/codex#52756](https://github.com/openai/codex/pull/52756)
    为语音会话指标增加失败原因与生命周期阶段标签，并修正控制消息发送失败覆盖更具体 WebRTC 错误的问题。

## 功能需求趋势

从今日活跃的 Enhancement 类 Issue 与讨论热度中，可提炼出以下社区最关心的功能方向：

- **TUI/CLI 可配置性与信息密度控制**（#21252 隐藏工具活动、#52990 搜索式配置面板）：用户希望 TUI 既能展示完整过程，也能在需要时折叠细节，按需控制信息流。
- **桌面 App 的默认路径与工作区管理**（#19913 默认父文件夹、#30001 repo-local 沙箱配置被忽略）：开发者期望 Codex App 能更尊重本地项目结构与用户预设，减少重复操作。
- **全局快捷键与系统集成可自定义**（#48756 Mini 快捷键无法修改）：随着 App 常驻后台，用户对系统级快捷键的可配置性要求提高。
- **本地 HTTPS 开发调试闭环**（#23891 证书错误绕过）：内嵌浏览器需要提供类似 Chrome 的 “继续访问” 或证书管理能力，才能支撑本地 Web 开发场景。
- **MCP/Skills 生态的标准化与互操作性**（#53002 子资源未知）：Skill 声明的资源必须与标准 MCP 工具链真正互通，否则生态工具无法组合使用。

## 开发者关注点

- **Windows 端累积 Bug 持续阻塞使用**：今日活跃 Issue 中超三分之一与 Windows 相关，包括工作区设置加载失败（#51917）、沙箱 ACL 冲突（#52735）、Computer Use 死锁（#35446）、策略拒绝无解释（#50884）等，涉及面从基础聊天到沙箱到计算机控制，Windows 用户体验明显落后于 macOS。
- **云端/本地/移动端状态一致性差**：跨端任务可见性不一致（#50136）、跨设备同步陈旧（#48490）、Dot 任务桌面打不开（#49829）等问题说明云端任务在一端创建、多端消费的核心场景尚未打通。
- **代理与网络环境下云服务脆弱**：WebSocket 代理导致 Dot 任务无法恢复（#49829）、云任务 VM 中代理 8080 端口间歇失败（#52321）——企业/代理网络用户受影响显著。
- **DeviceCheck 与安全校验引入的新故障模式**：macOS 上 DeviceCheck token 生成失败直接禁用 Work 发送按钮（#52470）和阻止新聊天（#52342），安全机制的不透明失败正在影响正常使用。
- **TUI 交互细节打磨是当前最高频的合并方向**：今日 PR 中约一半属于 TUI/CLI 交互稳定性与性能优化（粘贴、重绘、行排序、剪贴板），说明核心对话循环的体验优化仍是项目当前迭代重点。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-10-11

## 今日速览
今日无新版本发布。社区焦点集中在 Agent 可靠性问题上：P1 级 bug 如子代理在 MAX_TURNS 中断后误报成功（#22323）、通用代理无限挂起（#21409）等仍处于待复测状态。PR 方面，社区活跃度较高，核心修复集中在 ACP 会话重放顺序（#29708）和 Windows 命令注入安全问题（#29510）上。

## 社区热点 Issues
以下是过去 24 小时内最值得关注的 10 个 Issue：

1. **[#22323] Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption**（P1 / bug / 13 评论 / 👍 2）
   `codebase_investigator` 子代理在未执行任何分析即达到最大轮数时，仍被标记为“success”和“GOAL”，掩盖了实际的中断。这会影响自动化流程对结果的正确判断。
   [链接](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **[#21409] Generalist agent hangs**（P1 / bug / 8 评论 / 👍 8）
   Gemini CLI 在委托给通用代理时可能无限挂起（简单操作如创建文件夹也会卡住）。用户只能手动取消，且通过提示词禁用子代理才能规避。社区反应强烈，高赞反映了此问题影响面较广。
   [链接](https://github.com/google-gemini/gemini-cli/issues/21409)

3. **[#21983] Browser subagent fails in Wayland**（P1 / bug / 4 评论 / 👍 1）
   浏览器子代理在 Wayland 环境下直接失败，触发 GOAL 终止但未完成目标，影响 Linux 用户。
   [链接](https://github.com/google-gemini/gemini-cli/issues/21983)

4. **[#24246] Gemini CLI encounters 400 error with > 128 tools**（P2 / bug / 3 评论）
   当可用工具超过一定数量（作者实际遇到 >400）时，API 返回 400 错误。期望模型能更智能地限制启用工具的范围。
   [链接](https://github.com/google-gemini/gemini-cli/issues/24246)

5. **[#22267] Browser Agent ignores settings.json overrides (e.g., maxTurns)**（P2 / bug / 4 评论）
   `AgentRegistry` 虽然能在初始化时读取并合并全局/项目级 `settings.json`，但浏览器代理却完全忽略其中的配置覆盖（如 `maxTurns`）。
   [链接](https://github.com/google-gemini/gemini-cli/issues/22267)

6. **[#19873] Leverage model's bash affinity via Zero-Dependency OS Sandboxing**（P2 / enhancement / 9 评论 / 👍 1）
   提出利用 Gemini 3 模型原生擅长 bash 工具链的特性，在不牺牲安全性的前提下，通过零依赖的 OS 沙箱和意图路由来释放模型高效执行 shell 命令的能力，是 Agent 工具链演进的重要方向。
   [链接](https://github.com/google-gemini/gemini-cli/issues/19873)

7. **[#22745] Assess the impact of AST-aware file reads, search, and mapping**（P2 / feature / 7 评论 / 👍 1）
   EPIC 追踪：评估 AST 感知工具对代码库的读取、搜索和映射的收益，预期可减少上下文 token 消耗、提高定位精度。
   [链接](https://github.com/google-gemini/gemini-cli/issues/22745)

8. **[#21968] Gemini does not use skills and sub-agents enough**（P2 / bug / 7 评论）
   用户反馈模型几乎不会主动使用自定义 skills 和 sub-agents，即使有相关描述也需显式指令，降低了自动化能力。虽然仅凭个例，但反映了 Agent 自主性的不足。
   [链接](https://github.com/google-gemini/gemini-cli/issues/21968)

9. **[#23571] Model frequently creates tmp scripts in random spots**（P2 / bug / 3 评论）
   模型在受限 shell 环境下倾向于在多个目录生成临时编辑脚本，增加清理负担，影响工作区提交整洁性。
   [链接](https://github.com/google-gemini/gemini-cli/issues/23571)

10. **[#22672] Agent should stop/discourage destructive behavior**（P2 / bug / 3 评论 / 👍 1）
    在某些复杂 git 操作中，模型可能使用 `git reset` 或 `--force` 等破坏性命令，社区希望引入安全护栏，确保模型理解危险操作的后果。
    [链接](https://github.com/google-gemini/gemini-cli/issues/22672)

## 重要 PR 进展
以下 10 个 PR 在过去 24 小时内有关键更新，功能或修复内容如下：

1. **[#29708] fix(acp): finish the session/load history replay before responding**（OPEN / P2 / size/m）
   修复 ACP 协议中 `session/load` 响应过早返回的问题，避免重放的 `session/update` 通知混入下一次 prompt 的更新，符合 ACP 规范。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29708)

2. **[#29510] fix(editor): harden Windows subprocess argument quoting**（CLOSED / P2 / size/m）
   修复 Windows 下 `shell: true` 调用 diff 命令时的参数引用漏洞，新增 `quoteCmdArg` 帮助函数，防止命令注入。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29510)

3. **[#29622] fix(core): bound tildeifyPath to path segments**（OPEN / P2 / size/m）
   修复 `tildeifyPath` 对与主目录同前缀的兄弟目录误替换为 `~` 的问题，只在路径边界匹配。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29622)

4. **[#29621] fix(core): preserve subagent multimodal tool response parts**（OPEN / size/m）
   修复本地子代理将工具结果回传时丢弃多模态数据（如图片）的 bug，按 call ID 保留完整响应。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29621)

5. **[#29709] fix(vscode-ide-companion): track all activate() disposables**（OPEN / P2 / size/s）
   修复 `activate()` 中因括号错误导致注册表项变为逗号表达式的问题，确保所有 disposables 都被正确追踪。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29709)

6. **[#29705] fix(cli): round durations before unit selection**（OPEN / P3 / size/s / help wanted）
   修复 `formatDuration` 的舍入边界问题，例如 `1000ms` 正确显示为 `1.0s`、`60.0s` 显示为 `1m`。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29705)

7. **[#29703] fix(core): keep atomic-write temp file name within NAME_MAX**（OPEN / size/m）
   修复文件名为 215-255 字节时原子写入因临时文件后缀超过 NAME_MAX 导致 `ENAMETOOLONG` 的问题。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29703)

8. **[#29611] fix(core): support multimodal function response for dotted Gemini 3 models**（OPEN / size/m）
   修复 `supportsMultimodalFunctionResponse()` 对 `gemini-3.8-flash` 等带点号和别名模型的支持，避免多模态输出因作为无效兄弟节点而被拒绝。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29611)

9. **[#29517] perf(core): linearize array reconstruction in truncateHistoryToBudget**（CLOSED / size/s）
   通过用 `push()` + 数组反向替代反复 `unshift()`，将历史截断重建从 O(n²) 降为线性，本地基准耗时降低一个数量级。
   [链接](https://github.com/google-gemini/gemini-cli/pull/29517)

10. **[#29515] perf: linearize state snapshot ID lookups**（CLOSED / P3 / size/m）
    在快照场景改用 `Set` 存储已消费 ID，将 10,000 目标的合成基准从 291.95ms 降至 10.26ms。
    [链接](https://github.com/google-gemini/gemini-cli/pull/29515)

## 功能需求趋势
综合近期社区高频需求，Gemini CLI 的关注方向集中在：

- **Agent 可靠性与自主性**：子代理在执行中断时的状态误报、Agent 不会主动使用 skills/sub-agents、改进任务追踪机制（文件持久化 vs 上下文内）。
- **浏览器 Agent 增强**：增加对 Wayland 环境的支持、自动会话接管/锁恢复、响应 `settings.json` 覆盖配置。
- **AST 感知工具链**：探索使用 AST 感知 CLI（如 AST-grep）实现精准的代码读取、搜索和映射，以降低 token 消耗、提升定位精度（#22745 / #22746 / #22747）。
- **系统集成与安全**：利用模型原生 bash 亲和力但配合 OS 沙箱隔离（#19873）、阻止破坏性 git/DB 操作（#22672）。
- **性能与核心修复**：工具数量过多时的 API 错误、多模态工具响应正确传递、终端 resize 时的渲染性能、跨平台（特别是 Windows）的稳定性。

## 开发者关注点
- **高频痛点**：
  - 子代理在异常终止时被误判为成功，导致自动化流程无法感知真实状态。
  - Generalist agent 偶发无限挂起，影响基础操作。
  - 浏览器子代理在 Linux（Wayland）下不可用。
  - 工具数量超过 128 个时引入 400 错误，制约大型项目使用。
  - 上下文 token 膨胀问题（子代理轨迹不可见、大文件被“firedhose”式读取）。
- **期待改进**：
  - 代理应更频繁且智能地选择调用自定义 skills 和 sub-agents，而非仅显式指令触发。
  - 对破坏性 shell 命令（如 force push、reset）增加安全栅栏或降级提示。
  - 明确支持配置驱动的 Agent 注册与发现（通过 `settings.json`）和更透明的子代理轨迹分享（#22598）。

---
*本日报由自动化数据整理生成，统计时间截至 2026-10-11。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-10-11）

## 今日速览

- 过去 24 小时无新版本发布，也无新 PR 合并/更新，但社区侧反馈密集：共 22 个 Issue 有更新，其中 10 个为最近两天新创建。
- 今日热点集中在三类问题：**沙箱权限体系的多处回归**（如 Gradle 连接失败、git 凭据被覆盖、hook 失效）、**模型路由的可靠性**（HydraFusion 静默降级、BYOK 子代理协议不匹配），以及**会话与 ACP 非交互模式的性能/稳定性**。
- 可访问性改进（例如 Thinking 文本对比度）相关旧 Issue 在本周陆续关闭，说明团队正在推进终端渲染和主题修复；同时有新 Issue 提出 OSC 7501 程序状态支持等新方向。

## 社区热点 Issues（10 个）

1. **[#4946] HTTP 400 `content[].thinking` 在后台 Shell 完成通知后出现**（OPEN · 7 评论）
   后台命令结束后，运行时在**新的一轮**注入了 `system.notification`，导致下一次请求因 `content[].thinking` 字段格式问题返回 HTTP 400。该问题直接影响长任务+后台执行的工作流，评论数在全部开放 Issue 中最高。
   https://github.com/github/copilot-cli/issues/4946

2. **[#2494] `copilot login` 自动回车，keychain 可用性提示不再等待用户输入**（CLOSED · 12 评论 · 1 👍）
   v1.0.16 引入的回归：当 System Keychain 不可用时，CLI 不再等待用户输入 `y/N` 而是自动确认，导致认证流程直接结束。该 Issue 是今日样本中评论数最多的，虽然已关闭，但反映了认证链路对交互细节的敏感度。
   https://github.com/github/copilot-cli/issues/2494

3. **[#5097] HydraFusion（policy max）路由返回策略外模型，并静默回退至 gpt-5.6-luna**（OPEN · 0 评论）
   使用 HydraFusion 且策略为 `max` 时，多数任务在路由阶段失败，UI 仅提示 `HydraFusion routing failed; continuing with gpt-5.6-luna`，用户对模型选择缺乏感知与干预手段。
   https://github.com/github/copilot-cli/issues/5097

4. **[#5100] 单次 120s 主机确认超时后，会话事件交付永久失败，直到恢复会话**（OPEN · 0 评论）
   长时间运行的交互式会话中，一旦某次 `tool.execution_partial_result` 事件超过 120s 未获 ack，后续所有 prompt 提交都会失败，会话只能通过 resume 恢复。对自动化/长生命周期使用场景影响严重。
   https://github.com/github/copilot-cli/issues/5100

5. **[#5108] ACP `session/list` 每页全量扫描会话库，上千会话时列出需数分钟**（OPEN · 0 评论）
   通过 `copilot --acp --stdio` 使用 ACP 协议时，分页并未真正利用游标优化，而是每页触发全量扫描。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# 2026-10-11 Kimi Code CLI 社区动态日报

**数据范围**：github.com/MoonshotAI/kimi-cli 过去 24 小时（2026-10-10 ~ 2026-10-11）

## 今日速览

过去 24 小时 Kimi Code CLI 仓库整体较为平静：无版本发布、无 Issue 新增或更新；唯一动态为文档 PR #1718 在更新后关闭。该 PR 为 AGENTS.md 补齐了专题文档、安全边界说明与首页导览，反映出项目在 Agent 工作流配置标准化与文档体系完善方面的持续投入。跳转链接：[PR #1718](https://github.com/MoonshotAI/kimi-cli/pull/1718)

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues

过去 24 小时内，仓库**没有任何 Issue 新增或更新**，因此本日无热点 Issue 可展示。我们将持续跟踪，待有 Issue 动态时恢复此板块。

## 重要 PR 进展

过去 24 小时内仅 1 个 PR 更新：

### [CLOSED] #1718 — docs: 新增 AGENTS.md 专题页、安全边界说明和首页导览
- **作者**: @liwang614
- **创建**: 2026-04-02 ｜ **更新**: 2026-10-10
- **链接**: https://github.com/MoonshotAI/kimi-cli/pull/1718
- **状态**: 已关闭（未合并）
- **

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-10-11）

## 今日速览

今日 v1.19.0 正式发布，核心变化是新增 `opencode upgrade --major` 一键升级路径、允许 OpenAI `ultrafast` 服务层级，并为 PTY 连接增加来源与票据校验。社区侧，TUI 稳定性（“exiting loop” 报错、/diff 卡死）与项目级 `.opencode` 配置不生效成为最热门反馈；同时 v2 迁移相关的 API 缺口、凭据兼容与 `/loop` 等命令的 PR 正在密集推进。

## 版本发布

**v1.19.0**（[Release 链接](https://github.com/anomalyco/opencode/releases)）

- **Core 改进**：运行 `opencode upgrade --major` 即可升级到 OpenCode 2。
- **Core 修复**：允许 OpenAI `ultrafast` 服务层级；在检查 PTY 是否存在前，先验证 PTY 连接来源与票据。
- **TUI 改进**：可使用 `/update` 命令安装 OpenCode 更新。

## 社区热点 Issues（10 个）

1. **[#38801](https://github.com/anomalyco/opencode/issues/38801) “exiting loop” 报错持续困扰用户**（CLOSED，评论 23，👍 1）
   用户反映在多种 OpenAI API 下反复遇到 `exiting loop`，TUI 体验受影响严重，是近期评论最密集的问题之一。

2. **[#53839](https://github.com/anomalyco/opencode/issues/53839) 项目级 `.opencode` 配置永远不会被发现**（CLOSED，评论 7）
   `opencode.jsonc` 与 `.opencode/agents/*.md` 对任何项目路径均不加载，只有全局配置生效。自定义项目 subagents 全部缺失，影响项目级工作流。

3. **[#40465](https://github.com/anomalyco/opencode/issues/40465) deepseek-v4-flash 在 OpenCode Go 上连接被断开**（CLOSED，评论 7，👍 7）
   上游在返回任何 HTTP 响应前即关闭 TCP 连接，导致每次请求挂起 30 秒后触发 `AbortError`；同端点上的 pro 模型正常。获 7 个 👍，社区关注度高。

4. **[#31500](https://github.com/anomalyco/opencode/issues/31500) VS Code 扩展安装文档缺失**（CLOSED，评论 6，👍 4）
   文档提到 VS Code 扩展但未指明具体安装方式，在终端输入 `opencode` 也不会安装扩展。4 个 👍 表明第三方 IDE 集成需求普遍。

5. **[#53702](https://github.com/anomalyco/opencode/issues/53702) 官方 curl 安装脚本极慢**（OPEN，评论 5）
   从 `opencode.ai/v2/install` 安装需数分钟，而直连 npm registry 仅 0.3 秒（275MB/s），安装体验问题突出。

6. **[#19256](https://github.com/anomalyco/opencode/issues/19256) Ctrl+Z 无法撤销输入而是退出 CLI**（CLOSED，评论 8）
   用户希望 Ctrl+Z 撤销输入消息而非直接退出，反映 TUI 对常见编辑快捷键的支持不足。

7. **[#39181](https://github.com/anomalyco/opencode/issues/39181) 多个 TUI 共享一个 server 时事件串扰**（CLOSED，评论 5）
   一个 `opencode serve` 挂多个 TUI（不同目录）时，侧边栏分支显示为另一项目的分支，事件隔离存在缺陷。

8. **[#41234](https://github.com/anomalyco/opencode/issues/41234) 单个非函数命名导出静默禁用整个插件**（CLOSED，评论 4）
   插件模块中一个多余的命名导出会让所有 MCP server 和 hook 消失，且无任何用户可见错误——插件系统健壮性问题。

9. **[#41828](https://github.com/anomalyco/opencode/issues/41828) v2 API 缺口阻塞第三方客户端**（CLOSED，评论 3）
   一位第三方 Rust TUI 客户端维护者列出移植 v2 server 时缺失的 5 个 API 能力，反映 v2 对生态兼容性尚未完备。

10. **[#41653](https://github.com/anomalyco/opencode/issues/41653) /diff 快捷键全部失灵，界面卡死**（CLOSED，评论 3）
    执行 `/diff` 后界面卡住，tab、n、d、m 与 ESC 均无效，TUI 稳定性问题再次被点名。

## 重要 PR 进展（10 个）

1. **[#54396](https://github.com/anomalyco/opencode/pull/54396) fix(core): SQLite 锁超时自动重试**
   多进程共享同一数据库时，`busy_timeout` 内拿不到写锁的语句现在会重试。关闭 #47566，直接提升多实例场景稳定性。

2. **[#54426](https://github.com/anomalyco/opencode/pull/54426) feat(app): iOS 语音委派以 Voice 消息展示**
   将 iOS 应用的语音请求（`Voice delegation` 头）在桌面端和 Web 端渲染为 Voice 消息，统一跨端语音交互体验。

3. **[#51482](https://github.com/anomalyco/opencode/pull/51482) fix(core): 支持 AI SDK v4 媒体输入**
   修复 v4 版 providers 将工具图片序列化为 null 的问题，按所加载模型的版本降级文件数据与工具内容。修复 #50960。

4. **[#54427](https://github.com/anomalyco/opencode/pull/54427) refactor(session-ui): 跨 delta 复用未改变的 markdown 节点**
   流式 delta 只改变块尾部，因此复用 store 中已解析的树节点，显著减少重复渲染成本。关闭 #54305。

5. **[#54416](https://github.com/anomalyco/opencode/pull/54416) feat(core): 添加 /loop 命令**
   内置 `/loop` 命令可立即发送 prompt 并按次数或条件循环执行。对应 #41907，是从 #51974 移植到 v2 的版本。

6. **[#53864](https://github.com/anomalyco/opencode/pull/53864) fix(auth): 保留当前构建无法解码的凭据**
   `Auth.all()` 在解码 auth.json 时会丢弃无法解析的条目，`set()`/`remove()` 读取后可能意外抹掉凭据。此修复避免变更时丢失凭据。关闭 #42387。

7. **[#54425](https://github.com/anomalyco/opencode/pull/54425) fix(console): Go/Zen 登录直达 Console**
   将桌面端和移动端 Go/Zen 登录链接改为直接指向 Console，避免先走旧版登录再二次登录。关闭 #54424，替代 #54419。

8. **[#54398](https://github.com/anomalyco/opencode/pull/54398) feat(core): 自动发现自定义 OpenAI 兼容 provider 的上下文限制**
   models.dev 没有的自定义 provider 现在可自动探测模型上下文限制，而不是使用内置占位限制。关闭 #53235。

9. **[#52765](https://github.com/anomalyco/opencode/pull/52765) feat(core): 运行 Claude Code 工具钩子**
   支持执行 `~/.claude/settings.json` 与 `settings.local.json` 中的 `PreToolUse`、`PostToolUse`、`SessionStart` 钩子，增强与 Claude Code 工作流的互操作性。Refs #12472。

10. **[#54354](https://github.com/anomalyco/opencode/pull/54354) feat(core): 归档目录已不存在的项目**
    当项目文件夹被删除时，自动归档该项目（新增可空 `time_archived`）以避免项目列表无限膨胀。

## 功能需求趋势

- **v2 API 与生态兼容**：第三方客户端（Rust TUI）、凭据迁移、Go/Zen 登录链路、iOS 语音消息等 PR 密集，说明社区正围绕 2.0 补齐 API 与跨端能力。
- **类 Claude Code 工作流命令**：多个 issue 集中请求 `/verify`、`/simplify`、`/btw`、`/context`、`/loop` 等内置命令，反映用户希望将测试、代码清扫、临时提问、token 洞察与循环执行纳入 TUI 原生工作流。
- **多工作区与多进程支持**：worktree 支持、多 TUI 共享 server 的事件隔离、SQLite 锁重试等，表明多项目/多实例协作是持续诉求。
- **自定义 provider 体验**：deepseek-v4-flash 连接失败、自定义 OpenAI 兼容 provider 上下文限制发现，显示社区对非官方模型的接入质量日益关注。

## 开发者关注点

- **TUI 稳定性**：`exiting loop`、`/diff` 卡死、快捷键失灵等高频出现，用户对 TUI 的可靠性预期仍在提升。
- **项目级配置加载**：`.opencode` 目录不生效导致 subagents 缺失，项目级自定义能力备受关注。
- **插件系统健壮性**：静默失败（如非函数导出禁用插件、`bun:sqlite` 缺失）让用户难以排查，需要更好的错误暴露机制。
- **安装与升级体验**：curl 安装脚本慢、升级路径不清晰（`/update` 与 `upgrade --major`）是当前门槛。
- **权限与安全**：权限设置 UI 不生效、`allow always` 重启丢失、`.env` 被无权限读取等安全与可用性投诉密集，权限模型需要重构。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-11）

## 今日速览
- 发布修复版本 v0.25.1-preview.2，解决远程 Hosts 替换时丢失绑定关系的问题。
- Managed Agent 进入密集攻坚期：多个 P1/P2 Bug 聚焦 Harness 重启、事务恢复与任务取消，多Agent 公共 API 设计正式提上日程。
- 核心工具结果压缩（#13599）进入自动压缩阈值量化管理阶段，社区对上下文性能优化持续关注。

## 版本发布
### v0.25.1-preview.2
- 修复 `agents` 模块中替换已选远程 Hosts 时丢失绑定关系的问题。
- 合并 core 测试相关修复，关闭 #12693 合并后审查发现的问题。
- [查看 Release](https://github.com/QwenLM/qwen-code/releases)

### v0.25.0-nightly.20261010.9763580b84
- 同步包含上述 agents 修复。
- [查看 Release](https://github.com/QwenLM/qwen-code/releases)

## 社区热点 Issues（Top 10）

### 1. Managed Agent 双路径架构提案（#12380）
- **标签**：status/in-progress, priority/P2, roadmap/multi-agent
- **作者**：@doudouOUC｜**评论**：51
- Managed Agent 分阶段交付的核心设计提案：保留现有 TypeScript agent 循环、模型推理与工具环境解耦、Session 持久化所有权、Workspace 绑定与可恢复工具执行，并提供稳定 WebSocket 接口。社区讨论热度最高。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/12380)

### 2. Harness 重启导致 Session 永久阻塞（#13857）
- **标签**：priority/P1, type/bug, daemon, scope/sdk
- **作者**：@wenshao｜**评论**：3
- Hosted Harness 在模型调用期间重启，会使该 Turn 标记为 `unresolved_after_settle`，且后续所有 Turn 均被阻塞。属今日最高优先级 Bug，直接影响托管服务稳定性。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13857)

### 3. 唤醒泵与接管继续竞争导致 Session 永久阻塞（#13873）
- **标签**：priority/P1, daemon, roadmap/multi-agent
- **作者**：@wenshao｜**评论**：3
- 前台 agent 等待期间 Harness 重启，若 journal 中已有 wake input，替换后的 Harness 会永久阻塞 Session。这是 #13857 的关联竞态问题，需尽快修复。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13873)

### 4. XML 工具调用恢复丢弃包含引号工具标记的外层调用（#13492）
- **标签**：status/in-review, priority/P2, type/bug, scope/core
- **作者**：@yiliang114｜**评论**：9
- 部分修复已合入（#13515），防止带引号的工具标记被误执行；但外层调用恢复的剩余问题仍待 #13579 解决。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13492)

### 5. H4f 公共任务取消与子任务事件流（#13746）
- **标签**：priority/P2, type/feature-request, roadmap/multi-agent
- **作者**：@wenshao｜**评论**：5
- 定义 Stage H4 交付图中的 H4f 切片：公共任务取消，以及子任务事件流和输出光标流，与 Stage H5 共享。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13746)

### 6. Harness 崩溃阻碍 lead Session（#13847）
- **标签**：priority/P2, type/bug, daemon
- **作者**：@wenshao｜**评论**：5
- 仅有后台 Agent 启动或团队调用的批次中，Harness 崩溃后无持久化记录标记 Turn 处于批处理中，导致替换后的 Harness 无法恢复。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13847)

### 7. Multi-Agent API：agent 身份维度（#13785）
- **标签**：priority/P2, type/feature-request, status/ready-for-human
- **作者**：@yiliang114｜**评论**：5
- 提议在公共 API 中加入 agent 身份维度，让多 Agent 执行可归属、树形化并支持中断，而非仅停留在内部记录层面。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13785)

### 8. XML 恢复在大响应上重复前缀扫描（#13787）
- **标签**：priority/P3, type/bug, category/performance
- **作者**：@yiliang114｜**评论**：5
- 完成的大响应含多个有效调用时，XML 工具调用恢复耗时随数量增长急剧上升。已有可复现基准数据，等待优化。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13787)

### 9. @ 文件补全损坏补充 Unicode 字符（#13865）
- **标签**：status/in-progress, priority/P2, type/bug, scope/interactive
- **作者**：@dakjdakd｜**评论**：4
- 提示词或文件路径含 emoji 等补充 Unicode 字符时，`@` 引用补全会生成错误的搜索查询，同时影响 Ink 和 OpenTUI 补全。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13865)

### 10. AutoReconnectTransport 释放后仍持有替换连接并重试（#13863）
- **标签**：status/in-review, priority/P3, daemon
- **作者**：@dakjdakd｜**评论**：4
- SDK 重连包装器在 dispose 后仍可能获取替换传输、未释放并继续等待中的请求，造成资源泄漏。
- [查看讨论](https://github.com/QwenLM/qwen-code/issues/13863)

## 重要 PR 进展（Top 10）

### 1. 压缩前收缩工具结果到剩余空间（#13599）
- **作者**：@yiliang114
- 会话接近自动压缩阈值时，根据当前 provider 路由最后一次成功 usage 报告，将下次请求的工具结果收缩至剩余空间，仅依赖同一 chat 的历史前缀，不改变系统指令与工具声明。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13599)

### 2. Web Shell 工作区文件浏览器与预览（#13878）
- **作者**：@ytahdn
- 在 Web Shell 右侧面板新增 Files 操作：全宽工作区树、文件内容预览（Markdown/HTML/图片）、只读源码查看，支持调整/隐藏面板。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13878)

### 3. 修复 Hosted 流关闭与任务取消（#13877）
- **作者**：@wenshao
- 修复 H4f 实测中 Harness 重启后任务取消挂起的问题：关闭 Hosted 事件流不再等待其 reader 持有的锁，并限制任务取消尝试次数。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13877)

### 4. 执行固定的 AgentDefinition 修订（#13530）
- **作者**：@yiliang114
- 存储的 AgentDefinitions 现在驱动 D8b、D8c-1、D8c-2 的 Session 执行；创建时固定 agent ID、修订号和摘要，回放保持原始 pin，审批模式与模型等参数从定义读取。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13530)

### 5. 关闭 #12692 的 R2 关键审查发现（#13325）
- **作者**：@wenshao
- 修复 #12692 合并后 R2 审查发现的 8 个 Critical 项：InnoDB 锁序反转、会话列表 keyset 分页遍历可变 `updated_...` 等问题。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13325)

### 6. 通道消息按 Markdown 结构边界分割（#13731）
- **作者**：@callmeYe
- DingTalk 与 WeCom 消息现在在约 3,800 单元目标处按 Markdown 结构边界分割；完整链接、表格和代码块可超出目标，上限 20,000 单元。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13731)

### 7. 跨会话恢复保留取消意图（#13436）
- **作者**：@yiliang114
- 用户显式取消操作在实时/恢复会话间保持；基础设施中断可恢复，唯一拥有的用户取消不可继续，未知意图的取消需确认当前 daemon 身份。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13436)

### 8. 连接器与 Broker 鲁棒性修复（#13330）
- **作者**：@wenshao
- 修复 #12692 R2 审查发现的 8 项服务端问题：sRuntime Broker 对持久化状态为 closing/closed 的未绑定 Session 拒绝绑定，重启后生命周期栅栏仍生效等。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13330)

### 9. H4e-b1 团队端到端测试（Hosted MySQL 通道）（#13867）
- **作者**：@wenshao
- 在 Hosted MySQL 通道上运行 H4e-b1 团队流程端到端验证；关闭 Hosted IT Spring 测试上下文并加固突发轮次。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13867)

### 10. 关闭 #12693 合并后审查发现的正确性差距（#13332）
- **作者**：@wenshao
- Durable Managed Session journal 与 failover 合并后两轮审查（R1/R2）的全部未决正确性问题，均基于当前 main 逐一验证后修复。
- [查看 PR](https://github.com/QwenLM/qwen-code/pull/13332)

## 功能需求趋势
- **Multi-Agent 系统化**：从架构提案（#12380）到具体功能切片（H4b/H4e/H4f）、公共 API 身份维度（#13785），社区正加速推进可归属、可中断的多 Agent 执行体系。
- **会话容错与恢复**：大量 P1/P2 问题集中在 Harness 重启、异步竞态与恢复一致性上，可靠性是当前最核心的工程诉求。
- **Web Shell 能力扩展**：新增工作区文件浏览器与预览（#13878），Web Shell 正从纯终端走向轻量 IDE 体验。
- **上下文性能优化**：自动压缩阈值量化管理（#13599）、XML 恢复性能优化（#13533 前置工作）成为性能优化主线。
- **跨平台与 SDK 兼容**：Windows 下 Python SDK 无法启动 npm shim（#13861）、AutoReconnectTransport 生命周期管理（#13863）等平台/SDK 问题开始进入社区视野。

## 开发者关注点
- **会话恢复可靠性**：多个 P1 Bug（#13857、#13873、#13847、#13875）直接关系到托管服务的可用性，开发者在 Harness 重启、竞态恢复场景多次踩坑。
- **XML 工具调用解析**：既有正确性问题（#13492），又有性能退化风险（#13533），是核心链路的高频痛点。
- **Markdown 与 RTL 渲染**：桌面端 Chat 视图的 RTL/LTR 混排错误（#13837）以及通道消息按结构边界分割（#13731）说明跨语言、跨消息平台的内容保真度是重要诉求。
- **自动化 CI 稳定性**：主分支 CI 失败（#12714）、`/verify-pr` 预算管理（#13850）说明自动化质量门禁机制的细化正在加速。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*