# OpenClaw 生态日报 2026-08-21

> Issues: 500 | PRs: 500 | 覆盖项目: 12 个 | 生成时间: 2026-08-21 00:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告



---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>



</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>



</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>



</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>



</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronCl

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目日报（2026-08-21）

## 1. 今日速览

- past 24h 项目收到 2 条 Issue 更新（均为旧 Issue 被触达 + stale 标记），无新建 Issue。
- PR 更新 7 条：6 条关闭/合入，1 条待合并；总体来看今天有一批 4 月初提交的 PR 集中完成收尾。
- 今日无新版本 release。
- 合并内容覆盖功能诉求（Write 文件卡片、设置页搜索）与稳定性/缺陷修复（Agent 切换、技能同步、mac 打包），说明项目在“易用性改进 + 平台适配”上继续推进。
- 活跃度评估：**中等偏上**；虽然新开 issue 数为 0，但 6 个 PR 完成合并，代码入库节奏健康。

---

## 2. 版本发布

暂无新版本 Release。

---

## 3. 项目进展

今日有 6 个 PR 被关闭/合入，集中在功能完善与问题修复两个方向：

| PR | 内容 | 状态 | 推进点 |
|---|---|---|---|
| [#1553](https://github.com/netease-youdao/LobsterAI/pull/1553) | Write 工具文件卡片 + Markdown/HTML/SVG 预览面板 | ✅ 已合并 | 直接 close #1552，落地 AI 产物文件预览能力 |
| [#1545](https://github.com/netease-youdao/LobsterAI/pull/1545) | 同步 activeSkillIds，刷新 Agent 技能徽章即时生效 | ✅ 已合并 | 修复 #1502 的交互滞后问题，提升 Agent 配置反馈实时性 |
| [#1546](https://github.com/netease-youdao/LobsterAI/pull/1546) | 引擎启动超时展示取消/日志查看按钮 | ✅ 已合并 | 避免启动卡死时用户只能硬等 5 分钟，明显降低焦虑 |
| [#1557](https://github.com/netease-youdao/LobsterAI/pull/1557) | 设置面板侧边栏新增分类搜索 | ✅ 已合并 | 改善多 Tab 设定页的导航效率 |
| [#1555](https://github.com/netease-youdao/LobsterAI/pull/1555) | 修复 macOS `dist:mac:x64` 打包失败 | ✅ 已合并 | 解决 `sha256sum` 在 macOS 上不存在导致的构建中断 |
| [#1560](https://github.com/netease-youdao/LobsterAI/pull/1560) | 修复 Agent 编辑后无法切回当前 agent 聊天页 | ✅ 已合并 | 修复切换逻辑中 `agentId === currentAgentId` 提前 return 的问题 |
| [#1547](https://github.com/netease-youdao/LobsterAI/pull/1547) | 修复定时任务通知渠道无法改回“不通知” | ⏳ 待合并 | 已在表单初始化中优先强刷 `delivery.mode === 'none'`，等待 review |

> 联动链路值得关注：Issue **#1552** 是功能建议，对应的功能 PR **#1553** 在一日内合并，说明该需求已被正式纳入版本计划并落地。

---

## 4. 社区热点

- [#1556 [OPEN] [stale] doc bug: IM机器人配置指南404](https://github.com/netease-youdao/LobsterAI/issues/1556)
  - 4 月创建，今日被更新；评论 2 条，是目前评论数最高的 Issue。
  - 用户 core 信息：文档站 `lobsterai.youdao.com/...IM机器人配置指南.md` 返回 404，截图显示 404 页面。
  - 诉求指向：**官方文档链接不完整/已失效**，需要内容维护，但该 Issue 已 stale，维护风险在上升。

- [#1552](https://github.com/netease-youdao/LobsterAI/issues/1552)
  - 提出“Write 工具产出文件后无法直接预览”的体验问题；已被 PR #1553 实现，属于“用户需求被官方实现的正面案例”。

---

## 5. Bug 与稳定性

| 严重度 | 问题 | 状态 |
|---|---|---|
| 高 | macOS `npm run dist:mac:x64` 构建失败，无法产出安装包 | ✅ 已有修复（#1555）已合入 |
| 高 | 引擎启动卡死时无操作按钮，用户只能等待 5 分钟 | ✅ 已有修复（#1546）已合入 |
| 中 | Agent 编辑后点击已选 Agent 无法回到聊天界面 | ✅ 已有修复（#1560）已合入 |
| 中 | 修改 Skill 列表后 Badge 不刷新，需重新切换 Agent 才生效 | ✅ 已有修复（#1545）已合入 |
| 中 | 定时任务通知渠道被设为“不通知”后，再次编辑仍显示旧 IM 渠道 | ⏳ 修复 PR #1547 待合入 |
| 低 | 官方 IM 配置文档链接 404 | ⚠️ 无对应 PR，Issue #1556 仍开放 |

> 今日没有出现新增崩溃/回归类报告；#1547 和 #1556 是当前仍需维护者跟进的剩余项目。

---

## 6. 功能请求与路线图信号

- **AI 产物本地预览**（#1552 → PR #1553）
  - 用户希望在 Write 完成后直接查看生成的文件内容，无需 Agent Read 全文粘贴。
  - 后端最终以**右侧可拖拽分屏预览面板**支持 Markdown/HTML/SNN/代码，满足写作和文档生成场景。
  - **信号预测**：已实现，不会出现在下一版本的路线图中，但可在后续版本收集预览体验反馈。

- **设置项可搜索**（#1557）
  - 由于设置 Tab 已达 9 个，用户在实际使用中难以定位分类；该改动已合入。
  - **信号预测**：设置复杂度被接受，未来若继续增加 Tab，分类结构也许会成为重点再设计。

- **引擎启动超时“逃离机制”**（#1546）
  - 该 PR 来自真实使用场景：编译缓存失效/网络时会导致启动卡死。
  - **信号预测**：之后继续往“引擎状态可观察、可干预”方向演进的可能性较高。

---

## 7. 用户反馈摘要

- **文档站点可靠性问题**（#1556）
  - 用户印发的截图显示配置指南文档 404 且持续 stale。说明对开发者文档执行和维护有信任消耗，建议维护者关注。

- **定时任务编辑易用性**（#1547）
  - 真实操作场景：当用户从某个 IM 渠道改为“不通知”，再次进入编辑时又要被默认回到旧渠道，会造成**“我明明保存了却总被还原”的错觉**。修复 PR 目前待合并。

- **Agent 切换困惑**（#1560）
  - 用户从“我的Agent”页面点击当前已激活 agent 时，应用仍停留在列表页，让用户产生“点击无效”的困惑。脚本直接修复已合入。

- **文档/预览内容的正面需求**（#1552）
  - 认为“Read+全文聊天”占空间且无法在应用内直接消费 AI 产物，属于创作不便的典型 workflow 反馈。

---

## 8. 待处理积压（提醒维护者）

1. **#1556 - 文档 404**：4 月创建，至今 open 且 stale；该 issue 仅指向一个文档链接；建议 5 分钟内完成静态排查并确认是否更新。
2. **#154

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-08-21）

## 1. 今日速览

过去 24 小时内，Moltis 保持了较高的迭代活跃度：新增/关闭 PR 共 8 条，其中 4 条合并或关闭，4 条仍在待合并状态；关闭 1 个历史安全 Bug（#1177），并发布新版本 `20260820.01`。整体项目围绕 **安全加固、WhatsApp 集成修复、工具权限模型完善** 三条主线推进，未出现新报告 Bug 或功能请求，尤其安全治理动作明显提速，项目健康度良好。

## 2. 版本发布

**Release: 20260820.01**（发布时间：2026-08-20）  
[查看 Release](https://github.com/moltis-org/moltis/releases)

> 注：仓库未附带详细 Release Notes。结合同日合并的 PR，本次版本大概率包含以下内容：
>
> - 修复 Vault 解锁/恢复端点未鉴权问题（[#1177](https://github.com/moltis-org/moltis/issues/1177)）
> - WhatsApp 渠道多项体验修复（push name、@提及、工具策略等）
> - 渠道工具鉴权上限调整为可配置（[#1219](https://github.com/moltis-org/moltis/pull/1219)）
>
> **破坏性变更/迁移注意事项**：无公开破坏性变更。建议管理员确认 `untrusted-turn` 工具策略的配置项默认值，以及 WhatsApp 直聊/群聊工具权限是否符合原有预期。

## 3. 项目进展

今日共 4 个 PR 关闭/合并，质量较高，均针对实际使用问题，且全部由社区开发者贡献：

- **修复 Vault 解锁/恢复缺少鉴权（CWE-306）**（[#1216](https://github.com/moltis-org/moltis/pull/1216)）  
  为 `POST /api/auth/vault/unlock` 与 `POST /api/auth/vault/recovery` 增加 `AuthSession`，修复未授权暴力破解风险。这是一个极其重要的由 Issue 驱动的安全修复，直接关闭 #1177 号安全告警。

- **WhatsApp push 名称不再硬编码“Moltis”**（[#1218](https://github.com/moltis-org/moltis/pull/1218)）  
  修复了被配置为 “Ada” 的 bot 在群聊中显示为 “Moltis” 的问题，提升渠道一致性。

- **untrusted-turn 工具上限可配置**（[#1219](https://github.com/moltis-org/moltis/pull/1219)）  
  修复 #1170 引入的硬编码 deny-all 策略，使公开受众的已注册工具和策略层 4/5 可恢复正常使用，更符合 /sh 的设计意图。

- **WhatsApp 回复等价于提及**（[#1217](https://github.com/moltis-org/moltis/pull/1217)）  
  修复 mention_mode = "mention" 下，用户回复 bot 消息却被当作“未被提及”而忽略的问题。

以上合并意味着 Moltis 的 **安全基线收紧、WhatsApp 信达活性提升、权限控制可配置化** 均有实质推进，且全部为社区热门频发问题。目前仍有 4 个新 PR 待合并，预示下一迭代将继续进行安全/体验改进。

## 4. 社区热点

- **Issue #1177（已关闭）**：Vault Unlock/Recovery 端点缺少认证 —— 该 Issue 为本日唯一有实质动态的 Issue，修复 PR 已同步合并；热度高的原因在于 **涉及 CWE-306（关键路由权限缺失）**，属于可被远程利用的高危安全缺陷。[查看讨论](https://github.com/moltis-org/moltis/issues/1177)

- **PR #1219（昨日合并）**：工具策略修复复盘出讨论焦点，即 `untrusted-turn` 工具上限此前为硬编码，其过度限制公共服务。虽然已关闭，但牵扯出权限配置是否应默认泄漏等层面，建议维护者后续加强该区域的配置文档说明。[查看 PR](https://github.com/moltis-org/moltis/pull/1219)

- **PR #1220（新开放）**：WhatsApp 将 Markdown 转义为原生内容，进一步贴近终端直用场景。此 PR 虽未引发大量讨论，但从功能性而言，预计将获得颇多正面反馈。[查看 PR](https://github.com/moltis-org/moltis/pull/1220)

## 5. Bug 与稳定性

- **（严重 - 已修复）Vault 解锁/恢复未知鉴权（CWE-306）**  
  [#1177](https://github.com/moltis-org/moltis/issues/1177) 已于 5 天前开启，描述为未授权远程暴力破解 Vault 口令风险；对应修复 PR [#1216](https://github.com/moltis-org/moltis/pull/1216) **已于今日（2026-08-20）合并**，影响版本 `20260820.01` 内置修复。

- **（中 - 已修复）untrusted -turn 工具硬编码 deny-all 于所有公共会话生效**  
  虽无直接 Issue，但 是 #1170 的回归问题，由 [#1219](https://github.com/moltis-org/moltis/pull/1219) 修复，确保 公共 audience 默认工具不再失效。

- **未发现新增 Bug / 崩溃 / 回归**。新 PR（#1220、#1222、#1221） 均为加固或功能增强，会合入后应聚焦新增验证。

## 6. 功能请求与路线图信号

- **`fix(web): validate sandbox image requests`**（[#1222](https://github.com/moltis-org/moltis/pull/1222)）：限制镜像请求校验和包构建操作至管理员。虽然属于安全加固，但向 web 侧引入了“镜像引用白名单”这一新能力信号，可能为后续版本提供更细粒度的沙箱管理功能。

- **`fix(gateway): pin Snyk Agent Scan`**（[#1221](https://github.com/moltis-org/moltis/pull/1221)）：将安全扫描工具固定版本并强制 uv 环境，提升依赖供应链安全属防护属。该能力若被合并，可作为供应链加固的典型代表信号。

- **`fix(whatsapp): render Markdown in outbound messages`**（[#1220](https://github.com/moltis-org/moltis/pull/1220)）：是社区对 WhatsApp 输出可读性的直接需求——保留 reader 常见 Markdown 结构并转化为 WhatsApp 原生标记，同时保持历史记录为 Markdown 保存，是实际用户场景驱动的一次正向演进。

- 社区用户偶有提及通过 `vault unlock` 操作（在修复前）会无保护，引入 `AuthSession` 后是否支持 API key 或 OAuth 集成尚待观察。

## 7. 用户反馈摘要

已解决的问题提炼（根据 PR 作者/描述）：

- WhatsApp 用户组设置 `mention_mode = mention` 时，群内直接回复 bot 消息被忽略，用户认为 “@提及” 与 “回复”应当是等价行为；修复后体验统一。
- 自建 bot（如 “Ada”）在 WhatsApp 群出现错误 push 名称 “Moltis”，影响品牌自定义观感与存在感。
- 未认证的 Vault 解锁/恢复接口导致部分管理员十分在意暴力破解风险——该问题在 CWE 与 CVE 自动认证中更受关注，修复及时。
- Shell hooks 在 Windows 缺失 `sh -c` 问题（见 PR #468）虽然旷日，但用户已验证仍存在，可证为 Windows 部署环境的主要不适点。

## 8. 待处理积压

- **（来自 - 长期悬置）** `fix(plugins): use cmd.exe on Windows for shell hooks`（[#468](https://github.com/moltis-org/moltis/pull/468)）  
  创建于 2026-03-23，至今近 5 个月仍未合并或关闭。PR 针对 Windows 上 `sh -c` 不可用的实际问题已给出 Windows 检测切换方案，且已在 Windows 10 与 CI 中验证。该 PR 极大概率是 Windows 用户无缝使用的最大阻塞点，建议维护者优先 review 并考虑合入。

- **（二次审阅）**：新开放的 4 个 PR（#1212 #1220 #1221）均较新，需维护者 commit 反馈。综合成功率高，应避免长时间停留 open 状态。（注意：此处从排名看，不涉及。整体排队 *无长期待处理 Issues，算健康*。）

---

**报告综合结论**：Moltis 在 24h 内展现了出色的社区协作模型——“发现弱高强度问题 → 发起 PR → 快速合并”，并依靠自动发布机制当日发出。项目整体处于高度可维护状态，风险偏好转向安全与供应链，且部分 WASM 效率。持续维护优先级建议：合并 Windows shell 跨平台支持、跟进 markdown / sandbox 验证 PR。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>



</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报 — 2026-08-21

## 1. 今日速览

过去 24 小时 EasyClaw 项目在 Issue 与 PR 维度保持静默，无新开/活跃 Issue、无新提交或被合并的 Pull Request，社区讨论面基本平稳。不过项目发布了 4 个新版本（v1.8.104 → v1.8.107），驱动了不小的节奏，主要集中在 TK Copilot 侧的达人（Affiliate）工作流优化、客服并发控制、飞书媒体投递稳定性等方向。整体来看，这是一天以“版本迭代输出”为主导，社区交互相对清淡的状态。

- **Issue 活跃度**：$0$（新开 + 活跃）
- **PR 活跃度**：$0$
- **新版本发布**: $4$ 个

## 2. 版本发布

### v1.8.107 — TK Copilot
- **发布内容**：优化客服并发控制、定时任务工具访问、达人教程、Campaign 配置提示；重点提升飞书媒体发送稳定性。
- **破坏性变更**：无
- **迁移注意事项**：macOS 用户若遇 Gatekeeper 拦截提示，需在「系统设置 → 隐私与安全性」中允许来自易控Claw 的应用运行。详见版本页安装说明。
- 🔗 [v1.8.107 发布说明](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.107)

### v1.8.106 — TK Copilot
- **发布内容**：增强达人 Campaign 计划生成的容错能力，应对部分数据缺失或生成异常，避免流程卡断。
- **破坏性变更**：无。
- **迁移注意**：无。
- 🔗 [v1.8.106 发布说明](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.106)

### v1.8.105 — TK Copilot
- **发布内容**：支持按商务开发人员（Business Developer）维度筛选达人 Agent 的待审核工作与全部历史工作。
- **破坏性变更**：无。
- **迁移注意**：无。
- 🔗 [v1.8.105 发布说明](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.105)

### v1.8.104 — TK Copilot
- **发布内容**：升级内置 OpenClaw 运行态环境，并优化达人 Campaign 商品冲突的展示与说明文案。
- **破坏性变更**：无。
- **迁移注意**：此次升级内置 runtime，建议在升级后清理本地旧运行缓存，避免环境残留问题。
- 🔗 [v1.8.104 发布说明](https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.104)

## 3. 项目进展

今日无被合并或关闭的重要 PR 记录，因此没有可量化的代码合并逻辑。项目进展主要借助上述 4 个版本的连续发布体现，说明产品矩阵的运营层面与依赖能力层仍在按计划推进，尤其是 OpenClaw runtime 的升级为后续功能提供了新的底座。

## 4. 社区热点

今日无活跃 Issues 或 PR 讨论，因此无热点讨论话题。社区当前更偏向“版本消费”模式而非“需求讨论”模式。

## 5. Bug 与稳定性

今日无新 Bug/崩溃/回归报告。

值得注意的是：macOS 版本在发布说明中多次出现类似 `"'RivonClaw' is damaged and can't be opened"` 的 Gatekeeper 弹窗提示。这属于未签名应用在 macOS 上的常见触达问题，不算代码缺陷，但可能影响部分新用户体验，可作为安装引导专项优化。

## 6. 功能请求与路线图信号

今日无新功能请求 Issue，但结合近期版本节奏，可观察出以下可能的后续方向：

• **达人管理能力逐步细化**：
  - v1.8.105 引入按商务开发人员筛选达人 Agent 工作，体现出人员在系统（Person in the loop）的审核/分配流程被逐步重视。
  - v1.8.106 对丢失数据/失败的容忍性提升，说明生成链路仍在朝“高鲁棒性”方向演化。
  - 预测字段：达人管理权限子模块、分权分配、批量审批等将可能成为下一版本的新候选功能。

• **消息发送稳定性的加固**：
  - v1.8.107 针对客户端渠道（Feishu）的媒体发送做了重点优化，推测用户在真实场景中发送图片/视频失败率较高，后续版本可能持续对消息多通道投递状态做更深层的可观测性建设。

## 7. 用户反馈摘要

今日无 Issues 评论可提取。但根据发布说明中的“优化”“提升”“修复”三组关键词，提取可见的真实痛点有三个：

- **Campaign 生成会因数据缺失或异常中断** → 通过 v1.8.106 做容错。
- **飞书媒体发送不稳定** → 通过 v1.8.107 做修复。
- **macOS 首启体验被 Gatekeeper 拦截** → 需要用户在系统设置手动允许，存在一定认知成本。

## 8. 待处理积压

当前无长期未响应的重要 Issue 或 PR 需要标记提醒。近 24 小时无新增、无遗留。

---

> 说明：本次日报基于 2026-08-21 提供数据生成，部分内容（如未来路线图提示）仅代表基于现有版本的推断，不构成项目承诺。

</details>

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*