# AI CLI 工具社区动态日报 2026-09-05

> 生成时间: 2026-09-05 01:53 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告

**报告日期：2026-09-05** | 数据来源：各工具 GitHub 社区日报


## 一、生态全景

AI CLI 工具赛道已从"单点对话助手"跨入"可编程、可扩展、可观测的开发基础设施"阶段。头部工具以每日多版本节奏迭代，GPT-6-Astra 模型推送引发全行业适配；Windows 桌面端普遍成为口碑短板，插件/Hooks 体系、沙箱安全、MCP 兼容性、上下文成本治理构成四大主线竞争。开源阵营（OpenCode、Qwen Code）与商业闭源（Claude Code、Codex）形成差异化路线——前者以社区贡献驱动快速迭代，后者以产品生态深度构建壁垒。整体呈现"成熟玩家攻企业级能力、新兴玩家打差异化体验"的竞争格局。


## 二、各工具活跃度对比

| 工具 | 今日 Issues 更新 | 今日 PR 动态 | Release 情况 | 社区信号强度 |
|---|---|---|---|---|
| **Claude Code** | Top 10 热点（最高评论 159，最高 👍 75） | — | v2.1.261 | 🔥🔥🔥🔥🔥 体量最大，问题讨论深度最高 |
| **OpenAI Codex** | Top 10 热点（最高评论 40，最高 👍 17） | Top 10 高质量 PR | rust-v0.153.4 / v0.153.3（双 hotfix） | 🔥🔥🔥🔥 双版本推送，Astra 适配密集 |
| **GitHub Copilot CLI** | Top 10 热点（最高 👍 23） | 1 条（疑似无效占位 PR） | v1.0.84-1 / v1.0.84-0 | 🔥🔥🔥 版本快但 PR 池明显偏弱 |
| **Gemini CLI** | 约 10 项更新（p1 x 2） | 2 个 fix PR（安全方向） | v0.60.0-nightly | 🔥🔥 夜间版迭代，安全修复导向 |
| **OpenCode** | Top 10 热点（最高评论 50，最高 👍 26） | 10 个 PR（6 个社区贡献） | v1.18.29 / v1.18.28 | 🔥🔥🔥🔥 社区贡献活跃度高，PR 质量扎实 |
| **Kimi Code CLI** | 6 项（5 个历史关闭 + 1 个新开放） | 1 个修复 PR | 无 | 🔥 活跃度较低，多历史 issue 集中清理 |
| **Qwen Code** | 4 个热点 issue（最高评论 30） | 5+ 个活跃 PR（含语音 ASR、模型能力配置） | 无 | 🔥🔥 讨论集中度高，迭代节奏中等 |

**注**：各工具今日实际总 Issue/PR 数远超列表量级，此处仅统计日报收录的 Top 热点。


## 三、共同关注的功能方向

从多个工具的社区反馈中可提炼出 **7 个跨工具共性需求**：

**1. GPT-6-Astra / 新模型支持速度**
- **涉及**：Codex、Copilot CLI、OpenCode、Claude Code（间接）
- **具体诉求**：模型选择器可见性不一致（OpenCode #47363、Codex #42853）、默认模型切换、Bedrock 等 routing 渠道覆盖、异步问答能力边界说明。社区对新模型的"全端一致可用"极为敏感。

**2. 插件 / Hooks / Agent 可编程性**
- **涉及**：Claude Code（Function Hooks #91870，99 评论）、Kimi（Hooks 系统 #1313）、Copilot CLI（自定义 Agent 推理强度 #2904，最高 👍23）、Gemini（自定义 Skills 不被主动使用 #21968）
- **具体诉求**：深度行为扩展机制（非交互式模型查询、生命周期事件通知、Agent 级参数配置）。这是从"能用"到"好用"的关键分水岭。

**3. Windows 桌面端稳定性与体验**
- **涉及**：Claude Code（文件锁、九天九次强更）、Codex（Computer Use 截图失败 0x80004002、多显示器溢出）、Copilot CLI（自动更新重写运行中 exe）、Kimi（Ctrl+V 键位失效）、Gemini（Windows 相关 issue）
- **具体诉求**：更新流程可控、沙箱/进程隔离、窗口管理、快捷键稳定。Windows 已成为全行业最集中的"投诉池"。

**4. MCP 生态兼容与故障隔离**
- **涉及**：Copilot CLI（legacy initialize 与 SDK 2.0 不兼容 #4525）、Kimi（单个 MCP 超时拖垮整个 CLI #1316）、Codex（MCP 配置致线程泄漏）、Gemini（扩展沙盒 EACCES）
- **具体诉求**：协议双版本兼容、单点故障隔离、扩展加载失败不应影响主会话。

**5. 上下文与 Token 成本治理**
- **涉及**：Copilot CLI（系统提示固定消耗 20,500 tokens #2627，👍19）、Claude Code（输出上限可配置、MEMORY.md 阈值）、OpenCode（自动压缩死循环 #30680）、Codex（BYOK 静默禁用 prompt caching 成本增 5 倍）
- **具体诉求**：固定开销可裁剪、压缩策略可配置、缓存行为透明可见。

**6. 沙箱安全与权限可配置性**
- **涉及**：Codex（MXC 适配器、deny-path 验证）、Gemini（路径边界检查、扩展环境变量同意）、Copilot CLI（bypass 后禁用沙箱、sandbox 外运行选项）、Claude Code（bypassPermissions 回归 #91683）
- **具体诉求**：安全策略严格与灵活性平衡，减少误报误拦导致的工作流中断。

**7. 子代理（Subagent）行为透明度与控制**
- **涉及**：Gemini（MAX_TURNS 被误报为 GOAL 成功 #22323，p1）、Codex（Subagents 面板丢失模型/推理强度显示）、OpenCode（signed reasoning 空轮次重放）、Kimi（ESC 无法中断子代理）
- **具体诉求**：子代理结束状态真实可回溯、取消操作即时可预期、运行信息可视化。


## 四、差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | 深度开发伴侣，企业级治理能力 | 专业开发者、企业内部团队 | 商业闭源；功能密度最高（hooks、策略诊断、组织级配置）；生态成熟但超发版存在可感知质量风险（Windows 更新、权限回归） |
| **OpenAI Codex** | OpenAI 模型能力的 CLI 触达面 + 沙箱隔离 | 使用 OpenAI 模型生态的开发者 | 商业闭源（rust 实现）；与 GPT-6-Astra 深度绑定，强调沙箱安全和 TUI 异步交互创新；Windows 原生适配垫底 |
| **GitHub Copilot CLI** | GitHub 生态无缝扩展（ACP、MCP、Agent 策略） | 重度 GitHub 用户、企业 Copilot 客户 | 商业闭源（TypeScript）；版本节奏快、模型策略灵活（多模型回退、model-policy）；但社区 PR 通道近乎停滞，Bug 反馈与修复速度脱节 |
| **Gemini CLI** | 谷歌生态 + 本地扩展系统 | Gemini 用户、追求安全与自动化的团队 | 开源核心；高频率 nightly 迭代，安全修复优先；但社区规模较小、核心功能 knockout 进度偏慢（Skills 生态未激活） |
| **OpenCode** | 开源开放、多 Provider 聚合 | 在意审查权与自托管的技术团队、独立开发者 | 开源（社区贡献占比高）；迭代快、issue 响应积极；V2 架构转型中，存储/性能技术债较突出 |
| **Kimi Code CLI** | 轻量启动、MCP 深度集成 | 中文开发者、快速上手用户 | 开源；在功能完备性和社区规模上均处追赶位；当前处于存量 issue 治理期，新功能节奏放缓 |
| **Qwen Code** | 阿里生态、主流模型兼容 | 通义千问用户、亚洲市场 | 开源；技术基础设施打磨期（TUI 框架迁移、CI 优化）；功能推进受制于渲染层技术债 |


## 五、社区热度与成熟度

- **最成熟 / 讨论体量最大**：**Claude Code** 一骑绝尘——单 issue 最高 159 条评论、99 条功能讨论，社区不仅是"用户"更是"生态共建者"，但也反衬出产品更新对用户习惯冲击的代价。

- **快速迭代 / 高响应**：**OpenCode** 与 **OpenAI Codex** 并列第一梯队。OpenCode 当日合并 1 个社区 PR 并推进 9 个，v1.18.29 直接修复当日 issue；Codex 双 hotfix 针对 feedback 即时跟进，Astra 相关 PR 高密度合入。

- **版本频繁但社区互动单薄**：**Copilot CLI** 一日双版本，但 PR 队列几乎为零，社区反馈只能走 Issue 通道等待官方释放，证明其"商业化产品"属性强于"开源生态"属性。

- **规模较小但聚焦**：**Gemini CLI** 有 p1 级核心 bug（MAX_TURNS 误报）获得追踪，issue 质量高；**Qwen Code** 因 TUI 迁移追踪 issue 积累 30 条评论，讨论密度不错但广度有限。

- **相对沉默**：**Kimi Code CLI** 过去 24 小时 5 个 3 月创建 issue 被集中关闭而无一新增，说明社区处于"清库存"阶段，活跃度垫底。


## 六、值得关注的趋势信号

**1. 桌面端（Desktop App）化带来系统性风险，全行业承压。**
Claude Code 的"九天九次强更"、Copilot CLI 的"自动更新重写运行中的 exe"，说明自动更新机制 + 文件锁 + 运行中进程是一套未被解决的综合工程难题。对用户的直接启示：**部署策略必须考虑版本回退与关闭自动更新的能力**。

**2. 模型能力涌入速度超过工具适配能力，UI 可见性是第一道坎。**
GPT-6-Astra 同时出现在 4 个工具的 issue 榜中，核心并非"能否调用"而是"模型选择器里看不看得到"。这提示工具链的模型管理逻辑（版本解析、默认模型回退、多路由）亟待抽象成通用能力，否则每次新模型发布都将重演一遍适配事故。

**3. 上下文成本从"体验问题"升级为"财务问题"。**
Copilot CLI 的 BYOK prompt caching 静默失效（成本增 5 倍）与系统提示 token 固定开销（20.5K）是同一枚硬币的两面——**上下文预算是下一代 CLI 的必争高地**。工具对 token 消耗的可见性、可裁剪性、缓存命中率透明化将成为企业选型的硬指标。

**4. 开源工具在"工程完备性"上面临大考。**
OpenCode 的 13GB SQLite 无限增长、CPU 暴增、自动压缩死循环，揭示快速迭代期的容量规划鸿沟。社区在用脚投票：**"功能多"不再是核心竞争力，"跑得稳"才是生产级使用的信任基石**。

**5. 异步通知与远程协作成为增量战场。**
Kimi（长任务完成通知）、Codex（Remote 跨设备、iOS 推送）、Claude Code（Cowork 同步失败），三端不约而同涉足"用户不在场时的协作体验"。这是 CLI 从"前台工具"向"后台智能体"演进的早期信号。

**6. 安全策略的"配置弹性"

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据截止**：2026-09-05 | **来源**：[anthropics/skills](https://github.com/anthropics/skills) 官方仓库

---

## 一、热门 Skills 排行

> 按社区讨论热度与交叉引用活跃度排序，以下 PR 当前均为 **Open** 状态。

### 1. skill-creator 评估链路修复（#1298）
[github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

**功能**：修复 `run_eval.py` 恒定报告 `recall=0%` 的核心 bug——该问题同时波及 `run_loop.py` 与 `improve_description.py`，导致整个 description 优化循环在噪声上运行；附带修复 Windows 流读取、触发检测与并行 worker 问题。

**讨论热点**：社区已有 10+ 独立复现（对应 issue #556），是当前仓库中复现面最广、影响开发链路最深的 bug 修复 PR。所有依赖 skill-creator 评估信号的用户都受影响。

**状态**：Open（2026-06-10 创建，最近更新 06-23）

---

### 2. document-typography 文档排版技能（#514）
[github.com/anthropics/skills/pull/514](https://github.com/anthropics/skills/pull/514)

**功能**：为 AI 生成文档提供排版质量控制——修复孤词换行（1–6 个词溢出到下一行）、寡行段落（标题滞留页底）、编号错位三类高频问题。

**讨论热点**：直击 AI 文档输出最普遍的"一眼假"瑕疵，通用性极强，用户几乎无需 prompt 即可受益。

**状态**：Open（2026-03-04 创建）

---

### 3. Hivemind 零成本多智能体编排技能（#1628）
[github.com/anthropics/skills/pull/1628](https://github.com/anthropics/skills/pull/1628)

**功能**：让 Claude Code 将机械性工作委派给基于免费模型运行的 headless [opencode](https://opencode.ai) worker，Claude 只保留规划、审查与合并角色。

**讨论热点**：核心理念是"昂贵模型的上下文才是稀缺资源，而非其智能"——切中上下文窗口成本痛点，概念新颖且具有成本革命性。

**状态**：Open（2026-08-21 创建，近期活跃）

---

### 4. scnet-hpc 超算集群操作技能（#1615）
[github.com/anthropics/skills/pull/1615](https://github.com/anthropics/skills/pull/1615)

**功能**：通过 profile 化的 SSH 与 Slurm 工作流操作 SCNet HPC 集群，覆盖连接配置、分区/内存/模块/加速器选择、作业生成、集群发现与配置刷新。

**讨论热点**：将 HPC 领域知识系统化沉淀为 Skill，代表科研计算场景对 Agent 能力的需求开始向专业垂直领域延伸。

**状态**：Open（2026-08-20 创建）

---

### 5. self-audit 推理质量门禁技能（#1367）
[github.com/anthropics/skills/pull/1367](https://github.com/anthrop

---

# Claude Code 社区动态日报

**日期：2026-09-05** | 数据来源：github.com/anthropics/claude-code

---

## 1. 今日速览

- **v2.1.261 发布**，新增组织策略加载失败原因的可见性（`/status` 与 `claude doctor`），并为 bash/后台任务输出长度提供可配置上限。
- **Windows 桌面端问题成为社区最大痛点**：#42776（文件锁致无法重启）达 159 条评论，#92246 曝出“九天九次强制更新重启”，更新流程饱受诟病。
- **功能需求上，插件体系升级呼声最高**：Function Hooks 提案（#91870）获 99 条讨论，CLI 非交互式模型查询（#12612）获 58 赞，社区对可编程性和扩展能力有强烈期待。

---

## 2. 版本发布

### v2.1.261

- **组织策略诊断增强**：`/status` 和 `claude doctor` 新增 "Organization policy" 行，说明组织策略无法加载的具体原因（如代理未透传 endpoint），帮助企业用户快速定位网络/代理层问题。
- **输出上限可配置**：新增 `bashOutputMaxChars` 和 `taskOutputMaxChars` 设置，允许用户提高命令输出和后台任务的字符截断上限，适配长日志、构建输出等场景。

---

## 3. 社区热点 Issues（Top 10）

### 🔥 最热问题

**1. Claude Code Desktop 在 Windows 上因进程文件锁无法重新启动**
- 链接：[#42776](https://github.com/anthropics/claude-code/issues/42776)
- 标签：`[invalid]` `[BUG]` | 评论 159 | 👍 75
- 重要性：长期位居热度榜首的 Windows 桌面端 bug——更新后残留进程持有文件锁，导致新版本无法启动。虽然被标为 `[invalid]`，但高评论数说明大量用户仍受影响并持续追问解决方案。

**2. Function Hooks：让插件强大 10 倍**
- 链接：[#91870](https://github.com/anthropics/claude-code/issues/91870)
- 标签：`[enhancement]` `area:hooks` `area:plugins` | 评论 99 | 👍 62
- 重要性：社区提出的深度插件扩展机制，通过带副作用追踪的 `$` 参数对象和类 Express/Koa 的 `next` 续延模型，安全地深度修改 Claude Code 行为。99 条讨论印证了这是社区最关心的能力演进方向之一。

**3. Bash cd-compound-read 守卫对绝对路径误触发**
- 链接：[#91650](https://github.com/anthropics/claude-code/issues/91650)
- 标签：`[bug]` `has repro` `platform:windows` `area:bash` `area:permissions` | 评论 10 | 👍 56
- 重要性：配置了 `Read()` deny 规则后，`cd` 到绝对路径会触发本不该出现的权限提示。56 个赞表明大量权限敏感用户踩中此回归，误报严重干扰自动化工作流。

### 📌 高赞功能与严重 Bug

**4. 请求添加 `claude model list` CLI 命令**
- 链接：[#12612](https://github.com/anthropics/claude-code/issues/12612)
- 标签：`[enhancement]` `area:core` `area:api` | 评论 18 | 👍 58
- 重要性：目前无法在非交互模式下查询可用模型，脚本化工具链被迫启动完整会话消耗 token。58 赞体现出 CI/CD 和自动化用户对可编程性的强烈需求。

**5. Windows 静默更新遗留孤儿进程，新版本无法启动（0x80070020）**
- 链接：[#89680](https://github.com/anthropics/claude-code/issues/89680)
- 标签：`[bug]` `has repro` `platform:windows` `area:desktop` | 评论 15 | 👍 1
- 重要性：#42776 的姊妹问题——静默自动更新后，旧版本 AppX 容器被孤儿进程持有，新版本启动即报 `0x80070020`，必须重启机器。Windows 更新管道的稳定性仍是系统性短板。

**6. bypassPermissions 模式下仍对 `cd DIR && grep` 弹权限提示（2.1.259 回归）**
- 链接：[#91683](https://github.com/anthropics/claude-code/issues/91683)
- 标签：`[bug]` `has repro` `regression` `area:permissions` | 评论 7 | 👍 26
- 重要性：bypassPermissions 本应免打扰，却在配置 Read deny 规则后出现提示——2.1.259 明确引入的回归，触达所有依赖免打扰模式的资深用户。

**7. 跨平台同步失败导致 Cowork 对话和聊天消失**
- 链接：[#81658](https://github.com/anthropics/claude-code/issues/81658)
- 标签：`[bug]` | 评论 16 | 👍 4
- 重要性：Desktop/Web/Android 三端同步异常，用户对话数据疑似因服务端事故消失。数据丢失是最严重的一类问题，16 条评论多在追查是否可恢复。

**8. 请求让 MEMORY.md 压缩提醒阈值可配置**
- 链接：[#91188](https://github.com/anthropics/claude-code/issues/91188)
- 标签：`[enhancement]` `memory` | 评论 19 | 👍 0
- 重要性：当前自动记忆在 200 行 / 25KB 时硬编码触发压缩提醒，对于长驻会话和大型工作区过于频繁。19 条评论讨论如何更优雅地管理长期上下文，机制关注度高。

**9. Windows 桌面版九天内九次强制更新重启，无关闭选项**
- 链接：[#92246](https://github.com/anthropics/claude-code/issues/92246)
- 标签：`[bug]` `has repro` `platform:windows` `area:desktop` | 评论 1 | 👍 0
- 重要性：新提交但极具代表性——应用通过停止服务、替换 MSIX 包、重启的方式自行更新，运行中的会话直接终止，且无提示、无延期、无设置开关。更新策略问题正在持续积累社区负面情绪。

**10. Claude Desktop 自动拒绝 CLI 原生 SendMessage，中断子代理恢复**
- 链接：[#92016](https://github.com/anthropics/claude-code/issues/92016)
- 标签：`[bug]` `platform:macos` `area:agents` `regression` `area:desktop` | 评论 8 | 👍 2
- 重要性：桌面端替换了仅覆盖会话间通信的机制，导致跨会话/子代理恢复场景

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-09-05

## 1. 今日速览

今日社区焦点集中在 **GPT-6-Astra 模型的全面推送**：连续发布两个 hotfix 版本修复其模型选择器可见性与异步问答工具逻辑，多件相关 PR 也已合并。与此同时，**Windows 桌面端的稳定性问题**继续占据 Issue 榜主力，包括 Computer Use 截图失败、多显示器窗口溢出、快捷键崩溃等高频反馈。社区对新模型支持与 Windows 体验优化的呼声明显上升。

---

## 2. 版本发布

### rust-v0.153.4（最新）
- **Bug Fixes**
  - 修复 Astra 在 bundled model picker 中的可见性，并在未显式配置模型时将其设为 bundled 默认模型。（[#42874](https://github.com/openai/codex/pull/42874)）
  - 更新 Astra 的 guidance：仅在会话中工具可用时使用异步问题（asynchronous questions）。（[#42878](https://github.com/openai/codex/pull/42878)）

### rust-v0.153.3
- **New Features**
  - 将 GPT-6-Astra 添加到 Amazon Bedrock model picker，覆盖 Mantle 和 Runtime 全球/US 路由。（[#42805](https://github.com/openai/codex/issues/42805)）
- **Bug Fixes**
  - 修正 GPT-6-Astra 的异步澄清问题 guidance，使其使用受支持的工具并确认仅接受文本输入。（[#42809](https://github.com/openai/codex/issues/42809)）

---

## 3. 社区热点 Issues（Top 10）

### 1. Windows Computer Use 截图失败 — 获 40 条评论 🔥
**#25178** | [链接](https://github.com/openai/codex/issues/25178)
Windows 10 22H2 上 Computer Use 可列应用、激活窗口、发送键盘输入，但 `get_window_state` 请求截图时报 `SetIsBorderRequired failed: 不支持此接口 (0x80004002)`。社区对 Windows 原生应用自动化能力高度期待，此问题已成 Windows Computer Use 的头部阻塞项。

### 2. Remote 连接：Android 到 macOS "No project" 对话失败
**#39678** | [链接](https://github.com/openai/codex/issues/39678)
Codex Remote 在 Android 客户端发起无项目对话时，在任务开始前即遇到 project trust 错误而失败。跨平台 Remote 工作流是当前社区关注的新兴场景，该问题影响移动端核心使用路径。

### 3. Windows 桌面端：最大化窗口溢出到相邻显示器
**#25826** | [链接](https://github.com/openai/codex/issues/25826)
多显示器场景下，Windows 桌面版最大化窗口会溢出到相邻显示器，影响多屏用户核心体验。获 17 👍，是 Windows UI 类问题中呼声最高的一个。

### 4. iOS 推送通知不可达
**#32908** | [链接](https://github.com/openai/codex/issues/32908)
Remote Control 的完成与审批推送通知在 iOS 上无法送达，会话内正常工作但无后台通知。获 16 👍，移动端远程操作体验的关键缺陷。

### 5. Subagents 面板丢失模型/推理强度显示
**#32283** | [链接](https://github.com/openai/codex/issues/32283)
Subagents 面板不再显示每个 agent 的模型名称和 reasoning effort，Pro 用户反馈后信息可视性下降。获 13 👍，说明用户对多智能体透明度的需求在增加。

### 6. Windows Pet：输入区域偏移 + 重启后点击穿透
**#42661** | [链接](https://github.com/openai/codex/issues/42661)
双显示器（副屏竖屏）环境下 Pet 窗口输入区域偏移，系统重启后宠物保持 click-through 状态无法交互。Pets 功能新上线即出现多平台差异问题。

### 7. GPT-6-Astra 在 Windows Desktop 模型选择器中缺失
**#42853** | [链接](https://github.com/openai/codex/issues/42853)
ChatGPT Pro 用户在 Windows 桌面版（codex-cli 0.153.1）的 model picker 中看不到 GPT-6-Astra，即便账户已具备访问权限。直接对应今日 hotfix 修复场景。

### 8. Pro 账户多智能体并发遭遇 429 限流
**#41702** | [链接](https://github.com/openai/codex/issues/41702)
从 Plus 升级到 Pro 后，多 agent 并发能力反而下降，仅 4-5 个 child agents 即触发 429。反映服务端限流策略与用户预期存在落差。

### 9. macOS Composer 首条消息后消失
**#42583** | [链接](https://github.com/openai/codex/issues/42583)
macOS 桌面版在发送第一条消息后 Composer 消失，必须新开窗口或重启应用才能恢复。影响核心聊天路径，获 5 👍。

### 10. Alt+P 快捷键导致应用崩溃
**#42683** | [链接](https://github.com/openai/codex/issues/42683)
Windows 10 下使用 Alt+P 快捷键直接导致程序闪退，属于典型的桌面端稳定性问题，影响快捷键用户的操作连续性。

---

## 4. 重要 PR 进展（Top 10）

### 1. 将 GPT-6-Astra 列入模型选择器
**#42879** | [链接](https://github.com/openai/codex/pull/42879)
设置 GPT-6-Astra 的 bundled model visibility 为 `list`，使其在交互式模型选择器中排在首位。直接支撑今日版本更新。

### 2. Astra 异步问题 guidance 限定工具可用性
**#42878** | [链接](https://github.com/openai/codex/pull/42878)
0.153 hotfix：将 Astra 的异步问题 guidance 加入“When available”前缀，避免暗示 `request_user_input_async` 在每次会话中都存在。

### 3. 异步问题整合进 TUI
**#42891** | [链接](https://github.com/openai/codex/pull/42891)
使 TUI 能展示来自 live agent 消息的问题，支持折叠计数、可展开答案编辑器、导航、回答、排队与跳过，同时保留主编辑器草稿。

### 4. TUI 异步问题支持可选答案
**#42894** | [链接](https://github.com/openai/codex/pull/42894)
异步问题若带建议答案，TUI 现可渲染编号的自动换行选项，并要求全部选项完整可见后才能提交。

### 5. 异步问题选项支持“其他”内联答案
**#42897** | [链接](https://github.com/openai/codex/pull/42897)
在异步问题选项末尾追加一个可编辑的 “Other” 选项，用户可直接输入替代答案，数字快捷键保持可用。

### 6. 新增原生 Windows MXC 沙箱适配器
**#42841** | [链接](https://github.com/openai/codex/pull/42841)
新增 `codex-mxc-sandbox`，支持原生 MXC 可用性检测与沙箱进程启动器；拒绝不支持的 learning-mode 和 fallback 策略，启动前验证 deny-path 能力。

### 7. 避免冗余文件系统沙箱路径解析
**#42870** | [链接](https://github.com/openai/codex/pull/42870)
优化沙箱准备阶段：避免在 executor 运行时线程上同步探测无关权限根，并减少重复解析文件系统别名，降低沙箱启动开销。

### 8. 新增客户端 exec-server RPC 尝试指标
**#42883** | [链接](https://github.com/openai/codex/pull/42883)
为每次客户端 RPC 调用尝试记录 `exec_server_client_requests_total`，在本地准入前计数，以纳入被拒绝、超时、取消与传输失败的调用，增强可观测性。

### 9. 建立独立任务与记忆请求的根轮次身份
**#42900** | [链接](https://github.com/openai/codex/pull/42900)
修复后台与空输入轮次可能缺失 `root_turn_id` 的问题，并为 detached memory 请求补充轮次身份，确保任务不会错误地采用来自合并 mailbox 输入的根轮次。

### 10. 默认协作模式使用静态指令
**#42904** | [链接](https://github.com/openai/codex/pull/42904)
将 Default 和 Plan 模式直接写入默认模式指令，不再使用模板渲染；移除模式名称格式化辅助函数及 `codex-utils-template` 依赖，简化 models-manager 逻辑。

---

## 5. 功能需求趋势

### 🔮 新模型支持（GPT-6-Astra）
- 模型选择器中缺失、默认模型切换、Bedrock 路由支持、异步问题能力边界等问题集中爆发。
- 社区关注点不仅是“能否使用”，更在意模型在 UI 各入口（picker、默认、远程）的可见性与一致性。

### 🪟 Windows 桌面体验优化
- 窗口管理（多显示器溢出）、Pet 交互、快捷键稳定性、WSL 支持、Computer Use 原生控制是高频关键词。
- 大量 Windows 专属 bug 涌现，社区期望同步跟进 Windows 平台的桌面级体验。

### 💬 TUI 异步问答交互
- 多个 PR 显示团队正集中建设 TUI 的异步问题交互能力：展示选项、内联答案、草稿保留、批量导航。
- 这将成为 CLI 交互体验的重要分水岭。

### 🔒 沙箱与安全加固
- 原生 Windows MXC 适配器、沙箱路径解析优化、Guardian 上下文加固、用户指令保留等措施，表明沙箱安全与性能两手抓。

### 📱 Remote 与移动端体验
- Android→macOS 的信任错误、iOS 推送通知缺失、浏览器扩展 host 过期等问题提醒：Remote 场景仍是新增长点但尚未成熟。

---

## 6. 开发者关注点

### 🔴 Windows 平台是最大的“投诉池”
- 影响面最大：Computer Use 0x80004002 报错（40 评论）、多显示器窗口溢出、Alt+P 崩溃、WSL 启动失败、进程无窗口启动等。
- 建议：Windows 用户升级前关注版本发布说明；遇到沙箱或进程类问题优先排查 WSL 配置与系统代理设置。

### 🟠 模型选择器的“可见性焦虑”
- GPT-6-Astra 在多个端（Windows Desktop、CLI TUI、Amazon Bedrock）出现可见性不一致，社区对模型入口的完整性和默认模型策略高度敏感。

### 🟡 沙箱与安全机制的“双刃剑”
- 一方面社区欢迎沙箱增强（deny-path 验证、Guardian 上下文保留）；另一方面“False positive with Astra on Cyber”（#42906）等安全误报开始出现，提示安全策略需在严格与可用间找到平衡。

### 🟢 性能与限流仍是长期痛点
- Pro 账户多 agent 429、MCP 配置导致的线程泄漏、exec-server RPC 指标缺失等问题，说明服务端与客户端在并发和可观测性上仍有优化空间。

### 🔵 TUI 交互细节受关注
- Markdown 复制格式保留、Astra sparkle 特效、异步问题选项可见性等细节改进密集推进，CLI 用户体验正在快速精细化。

---

*数据来源：github.com/openai/codex，更新于 2026-09-05。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-09-05

## 今日速览

今日发布 `v0.60.0-nightly.20260905.g85aca163f`，重点修复扩展环境变量同意机制与工作区路径边界检查两项安全相关问题。社区方面，**子代理 MAX_TURNS 被误报为 GOAL 成功**（#22323）仍是讨论度最高的话题，累计 13 条评论；同时多条关于**扩展系统沙盒权限失败**、**Web 搜索无限循环**的问题被标记关闭，但修复方案是否彻底尚待观察。

---

## 版本发布

### v0.60.0-nightly.20260905.g85aca163f
- **fix(extensions)**：扩展更新触发环境变更时增加用户同意提示，并过滤可改变运行时行为的自定义环境变量（PR [#28863](https://github.com/google-gemini/gemini-cli/pull/28863)）
- **fix(core)**：增强工作区路径边界检查，完善符号链接解析逻辑，覆盖命令安全与文件发现场景（PR [#29170](https://github.com/google-gemini/gemini-cli/pull/29170)）

---

## 社区热点 Issues（Top 10）

### 1. Subagent 达到 MAX_TURNS 被误报为 GOAL 成功
**#22323** [priority/p1, area/agent, 🔒 maintainer only]  
`codebase_investigator` 子代理在达到最大轮数时，其自身结果明确显示"未做任何分析"，但最终状态却被报告为 `success`、结束原因为 `GOAL`，导致中断被隐藏。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)  
*13 条评论 · 2 👍 · 社区关注度高，p1 级*

### 2. Shell 命令执行后卡在 "Waiting input"
**#25166** [priority/p1, area/core, 🔒 maintainer only]  
简单 CLI 命令执行完毕后，界面仍显示命令运行中并提示等待用户输入，会话挂起不返回。已确认可稳定复现。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/25166)  
*4 条评论 · 3 👍 · 影响日常使用效率*

### 3. google_web_search 无结果时无限循环
**#28037** [CLOSED, priority/p2]  
查询无相关结果时，工具会反复发起搜索请求，无法自然停止。用户可直接用 `google_web_search: "한국투자증권..."` 复现。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/28037)  
*8 条评论 · 已标记关闭，但社区关心修复是否真正落地*

### 4. 扩展系统因沙盒 EACCES 全部加载失败
**#27894** [CLOSED, priority/p2]  
当某个 `.env` 文件因沙盒权限（EACCES）无法读取时，所有扩展整体加载失败，即使 `advanced.ignoreLocalEnv` 已设为 `true`。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/27894)  
*7 条评论 · 沙盒场景下影响面大*

### 5. isFunctionCall 对空 parts 数组误判为 true
**#23195** [CLOSED, priority/p2]  
`messageInspectors.ts` 中 `Array.every([])` 在 JavaScript 中恒为 `true`，导致 `role: "model"` 且 `parts: []` 的消息被错误分类为函数调用/响应。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/23195)  
*7 条评论 · 典型的 JS 陷阱，易引发下游连锁逻辑错误*

### 6. EPIC：AST 感知文件读取、搜索与代码库映射
**#22745** [OPEN, priority/p2, 🔒 maintainer only]  
探索 AST 感知工具的价值：精确读取方法边界、减少 token 噪声、改进代码库导航，并评估对 `codebase_investigator` 的潜在提升。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22745)  
*7 条评论 · 1 👍 · 长期性基础设施方向的探索*

### 7. Gemini 不主动使用自定义 Skills 与 Sub-agents
**#21968** [OPEN, priority/p2, 🔒 maintainer only]  
用户反馈：即使定义了 `gradle`、`git` 等技能且描述清晰，模型在遇到相关任务时仍不会主动调用，必须显式指令才使用。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)  
*6 条评论 · 影响技能生态实际价值*

### 8. Auto Memory 需确定性脱敏并减少日志
**#26525** [OPEN, priority/p2, 🔒 maintainer only]  
Auto Memory 会在"提示模型脱敏"之前就把转录内容送入模型上下文，且后台服务可能记录已有技能，构成隐私隐患。  
→ [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26525)  
*5 条评论 · 涉及敏感信息处理，安全优先级高*

### 9. /skills reload 在 .gemini → .agents 符号链接下重复告警
**#28944** [CLOSED, priority/p3

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-05）

## 今日速览

今日连续发布 v1.0.84-1 与 v1.0.84-0，核心亮点是**新增 GPT-6 Astra 模型支持**及多项 sandbox 体验修复。社区方面，自定义 Agent 的推理强度配置（#2904）获 23 👍 持续发酵，同时多个**内存溢出 / MCP 兼容性回归**问题成为开发者关注焦点。

## 版本发布

### v1.0.84-1（最新）
- 新增 GPT-6 Astra 模型支持

### v1.0.84-0
- Managed sandbox 会话可在批准的 bypass 提示后，在本次会话剩余时间内禁用
- 修复：PowerShell 命令被 sandbox 拦截时，提供在 sandbox 外运行的选项
- 修复：凭据库中存在多个 GitHub 账号时，sandboxed gh 命令异常

### v1.0.83
- Windows 11 任务栏显示运行中的 Copilot 会话，支持悬停状态卡片
- 新增 Client ID Metadata Document（CIMD）支持，用于 MCP OAuth 登录
- 自定义 Agent 可在 `model` 字段列出多个模型，按可用顺序尝试；`model-policy: required` 确保模型匹配

### v1.0.83-5
- Windows 11 任务栏会话状态显示
- 改进：macOS/Linux 上 sandboxed 命令无法访问本机服务；macOS 同时阻止命令自身启动在 127.0.0.1 的服务器，以加强隔离

---

## 社区热点 Issues（10 个）

### 1. Custom Agent 缺少推理强度配置配置（#2904）
**标签：** agents / models | 👍 23 | 评论 8 | 更新 09-04  
自定义 Agent `.agent.md` 支持 `model` 字段，但**无法按 Agent 设置推理强度**，目前只能通过全局 `--effort` 控制。社区呼声很高。  
🔗 https://github.com/github/copilot-cli/issues/2904

### 2. 系统提示固定 token 开销过大（#2627）
**标签：** context-memory / configuration | 👍 19 | 评论 4 | 更新 09-04  
系统提示在会话开始即消耗约 20,500 tokens，加上工具定义约 8,500 tokens，在 200K 上下文中占比约 10%。用户希望可裁剪固定开销。  
🔗 https://github.com/github/copilot-cli/issues/2627

### 3. 缺少全局系统提示参数（#232）
**标签：** configuration | 👍 10 | 评论 5 | 更新 09-04  
除仓库级指令文件外，**无法在命令行通过 `--system-prompt` 注入最高优先级系统指令**，该需求已持续近一年。  
🔗 https://github.com/github/copilot-cli/issues/232

### 4. WSL2 下 Ctrl+H 被误判为 Ctrl+Backspace（#4328）
**标签：** input-keyboard / platform-windows | 评论 7 | 更新 09-04  
`/help` 标注 `Ctrl+H` 为“删除前一个字符”，但在 WSL2 + Windows Terminal 下被识别为“删除整个单词”。影响日常输入效率。  
🔗 https://github.com/github/copilot-cli/issues/4328

### 5. MCP 初始化发送 legacy `initialize` 导致 -32022（#4525）
**标签：** mcp | 👍 3 | 评论 6 | 已关闭 | 更新 09-04  
CLI 1.0.81-1 对 stdio MCP server 先发送现代 `server/discover` 探测，随后**仍发送旧版 `initialize`**，与 Python MCP SDK 2.0.0 不兼容，导致初始化失败。  
🔗 https://github.com/github/copilot-cli/issues/4525

### 6. 频繁 “JavaScript heap out of memory” 崩溃（#4725）
**标签：** triage | 评论 1 | 新建 09-04  
进程在数分钟内反复崩溃，V8 堆达到 4 GiB 上限。长会话/大上下文场景下稳定性堪忧。  
🔗 https://github.com/github/copilot-cli/issues/4725

### 7. ACP 模式权限回归：自动批准工具调用（#4537）
**标签：** permissions | 👍 2 | 评论 1 | 更新 09-04  
1.0.81-1 之后 `--acp` 模式不再发送 `session/request_permission`，Shell 命令、文件编辑/删除**静默执行**，是 #845 的回归。安全风险高。  
🔗 https://github.com/github/copilot-cli/issues/4537

### 8. 自动更新重写正在运行的 `copilot.exe`，破坏桌面应用（#4728）
**标签：** triage | 评论 0 | 新建 09-04  
CLI 自动更新会覆盖自身二进制，导致 **GitHub Copilot 桌面应用无法恢复任何会话**（“Session unavailable”）。CLI 与桌面端深度耦合后的严重副作用。  
🔗 https://github.com/github/copilot-cli/issues/4728

### 9. BYOK 模式静默禁用 prompt caching，成本增加约 5 倍（#4720）
**标签：** triage | 评论 0 | 新建 09-04  
1.0.82 在 BYOK 模式下请求头**缺失 prompt-cache 声明**，每轮对话全量重发上下文，`cached_tokens=0`。对高容量模型使用者的成本影响显著。  
🔗 https://github.com/github/copilot-cli/issues/4720

### 10. `copilot-file-search` 线程空转占用 CPU 与磁盘（#4710）
**标签：** sessions / tools | 评论 1 | 更新 09-04  
会话显示 `idle` 时，内部文件搜索线程仍持续运行，**满核占用并无限写入诊断日志**，在 Ubuntu 24.04 + 1.0.83-3 下复现。  
🔗 https://github.com/github/copilot-cli/issues/4710

---

## 重要 PR 进展

过去 24 小时内仓库 PR 队列仅 1 条，未见合并/新开的高质量 PR：

### #3771 Initial project setup
**作者：** @limenpchuolto112-creator | 更新 09-04 | 无评论 / 0 👍  
```
该 PR 创建于 2026-06-11，标题与内容均为空模板，疑似无效/占位 PR。
```
🔗 https://github.com/github/copilot-cli/pull/3771

> 💡 说明：今日数据源中有效 PR 数量为 0，建议关注 Releases 动态（如 v1.0.84-x 的修复与特性）作为主要参考。

---

## 功能需求趋势

### 🔝 高热度方向
| 方向 | 代表 Issue | 关键词 |
|---|---|---|
| **自定义 Agent 配置深化** | #2904 | 推理强度、多模型回退、model-policy |
| **上下文与 token 开销优化** | #2627, #1688, #232, #4724 | 系统提示可裁剪、auto-compaction 阈值、按 TTL 对齐压缩 |
| **MCP 生态兼容与演进** | #4525, #4647, #4731 | SDK 2.0 适配、双 era protocol、server 刷新超时 |
| **新模型支持** | v1.0.84-1

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-09-05

> 数据来源：github.com/MoonshotAI/kimi-cli | 更新周期：截至 2026-09-04 的 GitHub 活动

## 1. 今日速览

今日无新版本发布；过去 24 小时共有 6 个 Issue 和 1 个 PR 更新，其中 5 个历史 Issue（多为 3 月创建）集中关闭，仅 1 个新 Issue 保持打开。核心看点集中在**终端交互体验问题**（#2634 键位绑定失效）与**功能需求遗留项**（#1313 Hooks 系统、#1319 Skills 管理）的最终处理结果上。PR 方面，一个关于 `StrReplaceFile` 替换计数计算的修复正在进行中。

## 2. 版本发布

无新版本 Release。

## 3. 社区热点 Issues

过去 24 小时更新共 6 条，以下全部列出并按关注度排序：

**#2634 [OPEN] kimi 终端改键位不成功，比如粘贴**
- 作者：@PANG-GIT-AI | 创建：2026-09-04 | 评论：0 | 👍：0
- **影响版本**：0.40.1（使用 k3 模型，/login 登录）
- **摘要**：在 Windows Terminal + PowerShell 环境下，`Ctrl+V` 粘贴无法正常工作，终端设置中已配置但实际无效。
- **重要性**： ✅ 当前唯一开放的 Issue，直接影响 Windows 用户的日常输入体验；属于高频基础操作阻塞问题，具备较高修复优先级。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/2634

**#1313 [CLOSED] Feature Request: Add Hooks System for Notifications and Lifecycle Events**
- 作者：@AungMyoKyaw | 创建：2026-03-03 | 更新：2026-09-04 | 评论：0 | 👍：3
- **摘要**：请求引入 Hooks 系统，当 agent 需要用户关注（如长任务运行完毕、需要确认）时主动发送通知；当前用户切换窗口后会错过关键节点。
- **重要性**： 👍 数最高（3），反映开发者对“异步任务完成感知”的明确需求；虽然已关闭，但可作为 roadmap 参考。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1313

**#1320 [CLOSED] Feature Request: Smart arrow key navigation for multiline input**
- 作者：@imbecile-gulu | 创建：2026-03-03 | 更新：2026-09-04 | 评论：0 | 👍：0
- **摘要**：多行输入时，Up/Down 方向键始终被用于浏览命令历史，无法在光标位于多行文本中间时进行上下行导航编辑。
- **重要性**： 涉及 REPL 交互的核心体验；与 #2634 同属终端交互优化方向，说明该领域仍存在未满足的体验细节。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1320

**#1319 [CLOSED] 增加关于本地 skills 操作管理的方法**
- 作者：@Mocuishler | 创建：2026-03-03 | 更新：2026-09-04 | 评论：0 | 👍：0
- **摘要**：目前 `/skill` 下只有内置帮助和 creator，缺少类似 `cc /mcp` 的本地 skills 管理方式，无法查看版本、触发词、删除自定义 skill；存储目录也不统一。
- **重要性**： 唯一涉及“本地扩展资产 (Skills) 治理”的 Issue，暴露了与 MCP 管理不对称的能力缺口，影响自定义 Skill 的规模化使用。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1319

**#1316 [CLOSED] [bug] MCP timeout 导致 kimi-cli 不可用**
- 作者：@Caius1L | 创建：2026-03-03 | 更新：2026-09-04 | 评论：1 | 👍：0
- **影响版本**：1.16.0（Andante 平台）
- **摘要**：某个 MCP 连接不上时，整个 kimi-cli 会挂掉并直接中断——缺少单体故障隔离。
- **重要性**： 唯一有评论的 Issue；MCP 生态正在扩大，单点 MCP 超时导致进程退出的问题会显著影响稳定性，值得跟进修复方案。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1316

**#1315 [CLOSED] [bug] Subagents keep running after hitting ESC**
- 作者：@chriswingler | 创建：2026-03-03 | 更新：2026-09-04 | 评论：0 | 👍：0
- **影响版本**：1.16.0（Windows 10 x64，kimi-for-coding）
- **摘要**：用户按下 ESC 后，已启动的 Task（子代理）仍继续运行，无法中断。
- **重要性**： 涉及任务中断控制与资源回收，在长时间批量任务中会造成不可预期的影响。
- 链接：https://github.com/MoonshotAI/kimi-cli/issues/1315

## 4. 重要 PR 进展

过去 24 小时更新仅 1 条：

**#2524 [OPEN] fix(tools): count StrReplaceFile replacements against the running content**
- 作者：@Sreekant13 | 创建：2026-07-20 | 更新：2026-09-04 | 评论：无
- **关联 Issue**：Resolves #2526
- **摘要**：`StrReplaceFile` 是按顺序依次应用编辑的，但此前报告的替换次数是基于*原始*文件内容计算的。当连续的编辑中，某个 `old` 字符串由前一个编辑产生时，它不会出现在原始内容中，导致计数不准确。
- **重要性**： 属于工具链正确性修复——修复后替换计数将反映真实执行结果，可避免用户/下游工具依赖错误统计数据，适合关注文件编辑类工具稳定性的开发者跟进。
- 链接：https://github.com/MoonshotAI/kimi-cli/pull/2524

## 5. 功能需求趋势

从当前全部 Issue 中提炼，社区最关注的功能方向为：

1. **终端输入体验优化**（#2634、#1320）：键位绑定配置在 Windows Terminal/PowerShell 下失效；多行输入缺乏“光标导航 vs 历史浏览”的智能方向键策略。终端基础体验仍是最集中的痛点。
2. **生命周期事件通知 / Hooks 系统**（#1313）：用户明确希望在 agent 运行长任务时得到主动通知，而非用户自行轮询或切换窗口错过时机。
3. **本地 Skill 资产管理**（#1319）：要求提供类似 MCP 管理（`/mcp`）的统一命令体系（如 `skills list`、`skills rm`），以及统一的存储目录规范，降低自定义 Skill 的维护成本。
4. **稳定性 / 故障隔离**（#1316、#1315）：MCP 超时不应导致整个 CLI 崩溃；ESC 应能可靠地中断子代理任务。即“外围集成故障不得影响主会话可用性”。

## 6. 开发者关注点

- **Windows 平台体验缺口明显**：键位无法重映射、Ctrl+V 粘贴失效（#2634），结合此前 Windows Terminal 环境使用场景，建议官方在 Windows 端补充针对终端事件的专项测试。
- **中断控制语义不明确**：当用户按下 ESC，系统是否已向所有子代理广播取消信号？（#1315）开发者期待“取消操作”具备可预期性和即时性。
- **MCP 依赖的单点故障风险**：单个 MCP 服务器超时会拖垮整个 CLI（#1316），反向说明用户已开始深度集成多种 MCP 服务，对运行时隔离提出了更高要求。
- **对资产管理功能的诉求上升**：随着自定义 Skill 增多，缺乏 CRUD 命令和统一目录会导致流程混乱（#1319），这是扩展能力从“能用”走向“好用”的关键一步。
- **数据反馈的准确性**：工具类操作（如 `StrReplaceFile`）的统计信息必须与实际执行内容一致（#2524），开发者对工具输出数据的信任度十分敏感。

---
*本日报由 AI 工具分析生成，数据截止时间：2026-09-04 23:59 UTC。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-05）

## 今日速览

今日发布了 v1.18.29 与 v1.18.28 两个版本，核心修复集中在 Codex OAuth 模型过滤（尤其是 `gpt-6-astra` 缺失问题）；社区最激烈的讨论围绕性能退化（#30086，50 条评论）和 SQLite 存储无限增长（#33356）两大顽疾；此外，开源贡献者 @kitlangton 今日密集提交了 6 个 core 修复 PR，涉及 Markdown 转换与命令行参数处理。

## 版本发布

### v1.18.29
- 修复 Codex OAuth 模型过滤无法识别整数 GPT 版本（如 `gpt-6`）的问题
- 修复 openai 订阅用户不显示 `gpt-6-astra` 的问题
- 感谢 2 位社区贡献者（含 @Peter267 的中文文档格式修复）

### v1.18.28
- **Core**：将 session ID 作为 GitHub Copilot 交互 header 发送，改善跨会话请求追踪
- **Desktop**：设备认证时改用桌面客户端 ID；增大"在应用中打开"图标尺寸

## 社区热点 Issues

1. ** [#30086] 新版 OpenCode CPU 占用飙升**（👍 26 · 评论 50）
  用户反馈此前可并行运行 10+ 会话，更新后 3 个会话便导致系统卡顿、鼠标延迟。日期显示约 7 天前开始，疑似与近期更新有关。已持续 3 个月且热度不减，社区影响面大。
  https://github.com/anomalyco/opencode/issues/30086

2. ** [#33356] `event` 表无界增长，opencode.db 达 13GB+**（👍 9 · 评论 27）
  V2 版本事件溯源表从未清理/压缩，长跑实例的 SQLite 达到 ~13GB，撑满 22GB 磁盘。这是影响生产部署的严重存储缺陷。
  https://github.com/anomalyco/opencode/issues/33356

3. ** [#47363] GPT-6 Astra 在 OpenAI Codex OAuth 模型选择器缺失**（👍 20 · 评论 3）
  官方 Codex 客户端可选 `gpt-6-astra`，但 OpenCode 用同一 OAuth 账号却无法在模型列表中看到。该 issue 今日已关闭，由 v1.18.29 修复。
  https://github.com/anomalyco/opencode/issues/47363

4. ** [#30680] 自动压缩死循环，模型停止响应**（评论 17 · 今日更新）
  即使在新空文件夹中启动也会反复自动压缩并消耗 token，最终完全停止回复。为 V2 的会话管理带来信任危机。
  https://github.com/anomalyco/opencode/issues/30680

5. ** [#22235] IDE (VSCode) 的 Context Awareness 功能不生效**（👍 7 · 评论 13）
  用户期望类似 Claude Code 能自动附上选中文本，但实际从未生效，且官方文档未说明所需前置配置。
  https://github.com/anomalyco/opencode/issues/22235

6. ** [#14670] 输入框粘贴多行文本时无完整预览**（评论 7）
  粘贴多行内容仅显示 `[Pasted ~N lines]`，无法在提交前验证内容，对依赖语音输入的效率型用户影响明显。
  https://github.com/anomalyco/opencode/issues/14670

7. ** [#36808] opencode.ai 解析到 4 个 IPv6 地址，在 IPv6 黑洞网络下卡死**（评论 6）
  中国区用户访问 `opencode.ai` 长期卡住，浏览器可回退 IPv4，但 opencode-go 无法回退。目前已关闭。
  https://github.com/anomalyco/opencode/issues/36808

8. ** [#44684] 插件安装器拉取 npm 公共依赖超时，导致插件静默失活/启动挂起**（评论 4）
  1.18.21 开始出现（1.18.20 正常），私有 Verdaccio registry 用户受影响最严重，且 headless run/serve 下任何插件都会挂起。
  https://github.com/anomalyco/opencode/issues/44684

9. ** [#46595] Bedrock 已配置的输出上限未发送，长推理被截断到 4096 tokens**（评论 3）
  V2 发送 Bedrock Converse 请求时未携带 `inferenceConfig.maxTokens`，导致用户配置的 128k 输出上限被忽略。
  https://github.com/anomalyco/opencode/issues/46595

10. ** [#46881] 2.0 中空的 signed reasoning 轮次被重放到后续请求**（评论 4）
     已完成且仅有空 reasoning 内容的 assistant 轮次会因 provider metadata 被保留而再次重放，影响多轮对话的正确性。
     https://github.com/anomalyco/opencode/issues/46881

## 重要 PR 进展

1. ** [#47404] fix(core): 按主次版本号比较 Codex GPT 版本**（已合并）
  修复了 `parseFloat` 导致的版本比较错误：`gpt-5.10` 曾被误判为 5.1 < 5.4；`gpt-6`/`gpt-6-astra` 完全不匹配。对应今日 v1.18.29。
  https://github.com/anomalyco/opencode/pull/47404

2. ** [#47423] feat(core): 支持 provider OAuth client_credentials**（开启）
  面向无浏览器/无交互场景的 OAuth 客户端凭证流，支持 Basic 与 POST 认证，token 仅存内存、过期自动续期、401 重试一次。
  https://github.com/anomalyco/opencode/pull/47423

3. ** [#46850] feat(core): transcript 语义索引，用于跨会话历史检索**（开启）
  实现本地 transcript 嵌入索引，为 #41354 提供语义级跨会话搜索能力。涉及新特性 + 重构 + 文档，改动较大。
  https://github.com/anomalyco/opencode/pull/46850

4. ** [#47417] fix(app): 项目路径归一化**（开启）
  关闭 #40963：不同盘符/大小写路径下的同名项目现在能被正确区分。
  https://github.com/anomalyco/opencode/pull/47417

5. ** [#47414] fix(core): 保留 legacy markdown agent variants**（开启）
  关闭 #47413：此前 agent markdown 中 `variant: high` 会被丢弃，仅靠添加 legacy `temperature` 才能生效。
  https://github.com/anomalyco/opencode/pull/47414

6. ** [#47412] fix(core): 保留字面命令参数**（开启）
  关闭 #47411：模板 `Explain $ARGUMENTS.` 传入参数 `$&` 时，替换逻辑会错误吞掉参数内容。
  https://github.com/anomalyco/opencode/pull/47412

7. ** [#47410] fix(core): 保留内联代码边界反引号**（开启）
  关闭 #47409：HTML 内联代码边缘的字面反引号与生成的 Markdown 分隔符合并导致内容丢失。
  https://github.com/anomalyco/opencode/pull/47410

8. ** [#47408] fix(core): 终止已耗尽的 Markdown 代码预算**（开启）
  关闭 #47407：HTML 页面在输出预算耗尽且后面还有代码块时可能挂起转换，此 PR 增加截断终止逻辑。
  https://github.com/anomalyco/opencode/pull/47408

9. ** [#47422] fix(core): 限制结果前先排除隐藏 glob 匹配**（开启）
  关闭 #47421：`**/*.ts` 在未指定 `hidden` 时仍返回隐藏文件，正向 ripgrep glob 覆盖了默认排除行为。
  https://github.com/anomalyco/opencode/pull/47422

10. ** [#47388] fix(tui): 重新加载本地插件依赖图**（开启）
     编辑本地插件时旧 UI 不更新——入口文件被刷新但其依赖仍缓存。此 PR 修复本地开发的迭代体验。
     https://github.com/anomalyco/opencode/pull/47388

## 功能需求趋势

- **新模型/服务商支持**：Augure AI 加拿大提供商接入请求（#47312）；GPT-6 Astra 在 OAuth 模型列表缺失（#47363、#47405 等）——说明社区对"新模型快速可用"要求很高。
- **存储与资源管理**：`event` 表无限膨胀、无保留/压缩策略（#33356）是高优先级技术债；CPU 占用飙升（#30086）同样关注度极高。
- **IDE 与 TUI 体验**：Context Awareness 不生效（#22235）、桌面端新会话页缺失文件树（#42031、#47406）以及粘贴大文本崩溃（#47425），UI/UX 问题成社区高频反馈方向。
- **协议/网络兼容性**：IPv6 无回退（#36808）、GitHub Copilot 请求追踪 header（v1.18.28）等——多网络环境兼容性正在成为刚需。

## 开发者关注点

- **稳定性的焦虑**：高 CPU（#30086）、存储失控（#33356）、自动压缩循环（#30680）这类"资源级"问题最受关注，说明有大量用户将 OpenCode 用于常态化生产开发而非简单试用。
- **计费透明度**：#39822 和 #47317 两个独立 issue 均反映 OpenCode Go 套餐的实际扣费与页面展示不符，用户对"额度消耗计算"的信任度正在下降。
- **插件生态可靠性**：#44684 的 npm 依赖拉取超时和 #47368 的远程 MCP 回归，表明社区已开始依赖插件工作流，对版本升级引入的兼容性问题非常敏感。
- **V2 新架构的争议**：#46881 的 reasoning 回放、#46595 的 Bedrock 上限丢失等 V2 专属缺陷频繁浮现，结合 #33356 的 event 表问题，V2 的工程完备性仍需加强。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-05

## 今日速览

过去 24 小时无新版本发布。社区讨论最集中的是 TUI 渲染层从 ink 迁移到 OpenTUI 的追踪 issue（#8662，30 条评论），其次为 Cerebras 多轮请求 400 错误（#11045，P1）与 Token Plan ASR 语音模型不可用（#10932，P2）两个兼容性 bug。PR 侧则有多项修复与新功能进入活跃状态，包括语音 ASR 修复（#10981）、模型推理能力配置（#10999）以及后台 Agent View 会话管理（#10943/#10949）。

## 社区热点 Issues

1. **TUI 渲染层迁移：从 ink 到 OpenTUI（追踪）** — #8662
   当前 TUI 基于 ink 7 + React 19，并携带约 1037 行补丁与自定义虚拟视口模式，存在闪烁等结构性问题。该追踪 issue 已积累 30 条评论，是社区当前讨论度最高的话题，Roadmap 标记为 terminal-ux。
   https://github.com/QwenLM/qwen-code/issues/8662

2. **CI 测试时间受模块导入成本限制，而非调度** — #10908
   Release 流水线中 `cli` workspace 的 collect 耗时 2223s、实际测试仅 1372s，模块导入成本成为测试瓶颈。8 条评论反映开发者在关注 CI 效率优化。
   https://github.com/QwenLM/qwen-code/issues/10908

3. **Cerebras（OpenAI 兼容）：多轮请求全部失败，400 status code (no body)** — #11045
   P1 级别阻断性 bug：首个请求成功，但后续每轮均因 `reasoning_content` 被拒绝而返回 400。影响所有 Cerebras 托管模型，属于典型的 provider 兼容性问题。
   https://github.com/QwenLM/qwen-code/issues/11045

4. **语音听写无法使用 Token Plan ASR：resolveVoiceTransport 拒绝 qwen-audio

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*