# AI 官方内容追踪报告 2026-10-01

> 今日更新 | 新增内容: 198 篇 | 生成时间: 2026-10-01 02:58 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 4 篇（sitemap 共 452 条）
- OpenAI: [openai.com](https://openai.com) — 新增 194 篇（sitemap 共 1045 条）

---

# AI 官方内容追踪报告

**报告日期：** 2026年10月1日  
**数据源：** Anthropic（anthropic.com）与 OpenAI（openai.com）官网增量快照  
**说明：** 本次OpenAI抓取中大量页面未解析出正文，因此OpenAI部分的分析主要基于标题语义推断，并已标注。Anthropic四篇内容均有完整节选。

---

## 1. 今日速览

- **Anthropic 推出垂直行业安全机制 LSVP**，首次在“通用安全配置”之外为生命科学领域开放更宽松的模型使用权限，标志着前沿大模型从“一刀切安全”走向“行业分级授权”模式。
- **Anthropic 公开正面评估智谱 AI 的 GLM-5.3 网络攻击能力**，称其安全护栏可被简单手段绕过 64%–100%，这是继五个月前 Claude Mythos Preview 之后，前沿实验室首次公开对竞争对手模型进行系统的“红队审计式”安全比较。
- **OpenAI 在一天内集中释放大量产品与安全信息**，核心包括 GPT-6.1 Sol 的正式发布、ChatGPT Agent 系统卡、Sora 2 与 GPT-Oss Safeguard，以及超过 20 个 “Disrupting Malicious Uses of AI” 系列报告，形成“产品轰炸 + 安全叙事”双主线。
- **双方不约而同聚焦“扩散”议题**：Anthropic 担忧高级网络能力扩散到低防护模型，OpenAI 则发布《Estimating Worst-Case Frontier Risks of Open-Weight LLMs》和大量威胁情报报告，开放权重模型的安全风险成为当前竞争性议程的核心。
- **OpenAI 的基础设施与全球布局明显加速**，Stargate 新增挪威站点及五个新址，与微软、AWS、Oracle、Broadcom、NVIDIA 等同时出现战略合作条目，显示算力与地缘生态卡位已进入“多线作战”阶段。

---

## 2. Anthropic / Claude 内容精选

### 2.1 News

#### [Introducing the Life Sciences Verification Program](https://www.anthropic.com/news/life-sciences-verification-program)
- **发布日期：** 2026-09-30（正文内标注 Sep 17, 2026）
- **分类：** news

**核心内容：**
Anthropic 正式发布 **Life Sciences Verification Program (LSVP)**，允许经过验证的生命科学专业人员在其 Mythos、Opus 和 Sonnet 模型上获得更宽松的安全策略，用于药物发现、研究生物学、临床开发和制造等领域。该计划通过严格的验证流程（研究凭证、安全标准、伦理审查），提供 “Standard Use” 和 “High-risk Use” 两种授权等级，覆盖 Claude Science、Claude.ai、Claude Code 和 API 等全部产品面。目前已有数十家机构通过早期访问计划接入，Beta 阶段面向团队和机构开放，未来将逐步向个人 Pro/Max 用户扩展。

**战略意义：**
- 这是主流前沿实验室首次为特定垂直领域（生命科学）建立行业定制的安全授权框架，表明 Anthropic 在“安全”问题上从统一封锁转向了“可验证的差异化开放”。
- LSVP 直接瞄准生物制药、学术医疗等支付能力强的行业，是商业化推进的重要一步。
- 值得注意的是，正文提到“generally available Fable models”与 LSVP 专属配置形成对照，暗示 Anthropic 的模型安全体系已经模块化，未来可能孵化更多行业计划（金融、法律等）。

---

### 2.2 Research

#### [Can we predict the jobs robots will do?](https://www.anthropic.com/research/what-work-can-robots-do)
- **发布日期：** 2026-09-30
- **分类：** research

**核心内容：**
Anthropic 发布“机器人暴露指数”（robot exposure index），系统量化当前机器人技术对美国劳动力市场的真实覆盖。核心结论：机器人能完成美国 75% 的体力工作（占全部工作小时的 34%），但绝大多数仅在受控环境中；驾驶和仓储是暴露度最高的岗位，护理和维修暴露度极低。约 80% 的工作时间暴露于“机器人或 LLM”至少一种自动化风险。但目前机器人仅在 0.3% 的任务上具备成本竞争力——若价格下降趋势延续，40 年后才能达到 10%。过去 50 年间，高暴露岗位的薪资和就业率下降更显著，且每年机器人能力边界以约 2% 的体力工作量速度扩展。

**战略意义：**
- 这是一份严谨的经济学研究，填补了“LLM 影响白领岗位”之外“机器人影响蓝领岗位”的量化空白。
- 结论本身相当克制——“机器人还很贵，自动化不会明天发生”，但80%的复合暴露度表明AI+机器人的长期冲击面远超单一技术。
- Anthropic 正在持续塑造“理性、数据驱动”的 AI 政策话语权，为全球劳动力市场讨论提供坐标系。

#### [What do you want from AI?](https://www.anthropic.com/research/your-thoughts-on-ai)
- **发布日期：** 2026-09-30（正文标注 Sep 29, 2026）
- **分类：** research / societal impacts

**核心内容：**
Anthropic 借助自家研究工具 **Anthropic Interviewer** 发起新一轮大规模公众调研，询问公众最有意义的 AI 经历、希望 AI 改变什么、以及期望 AI 公司怎么做。参与者可自行决定是否公开访谈内容。该项目延续 2025 年 12 月的类似研究（当时 81,000 人参与），此前成果已影响 Anthropic Institute 的议程，并在世界经济论坛（WEF）上向国际决策者展示。

**战略意义：**
- Anthropic 持续将“公众参与”嵌入 AI 治理叙事，把“AI 发展方向不是只由公司决定”从口号变成可持续的研究基础设施。
- 公开访谈数据的做法，有意在透明度上拉开与竞争对手的差距，并可能为政策倡导构建更丰富的草根证据库。

#### [GLM-5.3 and the spread of advanced cyber capabilities](https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities)
- **发布日期：** 2026-09-30（正文标注 Sep 29, 2026）
- **分类：** research / frontier red team / policy

**核心内容：**
这是 Anthropic 前沿红队发布的一份高敏感度评估报告。报告指出：智谱 AI 的 GLM-5.3 具备与 Claude Mythos Preview 相当的自主构建端到端网络漏洞利用能力，但缺少有意义的保护措施。在 Anthropic 的模拟测试中，攻击者用简单技术即可在 64%–100% 的情况下绕过 GLM-5.3 的安全护栏——而对照的 Claude 模型在相同测试中未被绕过。Anthropic 五个月前通过 Project Glasswing 有限发布 Mythos Preview，初衷是让网络防御者抢在恶意行为者之前建立防护（已帮助发现超过 10,000 个漏洞）。而 GLM-5.3 的无差别公开释放，正在让这道“防御时间窗”关闭。

**战略意义：**
- 这是前沿实验室首次公开对另一家公司的模型进行系统的

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*