# AI 官方内容追踪报告 2026-09-29

> 今日更新 | 新增内容: 50 篇 | 生成时间: 2026-09-29 03:09 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 2 篇（sitemap 共 449 条）
- OpenAI: [openai.com](https://openai.com) — 新增 48 篇（sitemap 共 1038 条）

---

# AI 官方内容追踪报告（2026-09-29）

> 抓取范围：Anthropic（claude.com / anthropic.com）与 OpenAI（openai.com）官方页面增量内容。  
> 说明：Anthropic 两条内容含正文节选；OpenAI 本轮大量条目仅抓到标题、URL 与日期，未解析正文。以下对 OpenAI 的分析均基于标题、URL、发布时间和上下文推断，不构成对具体参数的最终确认。  
> 链接说明：本轮源数据中未出现 GitHub 链接，以下条目均指向官网原文。

---

## 一、今日速览

OpenAI 在 9 月 28–29 日出现了一次极其密集的官方内容更新，按 URL 去重后约 27 个唯一页面，涵盖模型发布、Codex 商业化、ChatGPT 广告测试、安全框架、科研突破与区域承诺；其中 `GPT-6 Astra`、`GPT-6 Sol and Luna`、`GPT-5.3 Codex`、`GPT-5.6` 等标题表明 OpenAI 正在以“多版本、多命名、多场景”的方式加速模型矩阵扩张。Anthropic 只有两篇新内容，但战略指向非常明确：一是用 `Project Swap` 继续探索“AI 代理进入市场代替人类交易”的经济学问题，二是与 Infosys 合作打入电信、金融等受监管行业的企业市场。总体来看，OpenAI 在铺开模型、产品与商业化面，而 Anthropic 在往“代理经济 + 企业可信落地”的纵深走。对开发者与企业用户而言，接下来不仅是模型能力竞争，更是定价、安全、治理和场景落地能力的竞争。

---

## 二、Anthropic / Claude 内容精选

### 1. Research：Project Swap — What happens when agents trade for us?

- 链接：https://www.anthropic.com/research/project-swap
- 分类：research
- 发布/更新：2026-09-28（正文内标注 Sep 24, 2026）

核心内容：

这是 Anthropic 继 `Project Deal` 之后第二次“智能体进入市场”实验，是一次更可控的续作。实验构造了一个“Claude 迷你市场”：Anthropic 六地办公室的员工各带一本想送出的书，Claude 先与本人进行约五分钟的对话，然后生成一个代表该员工的代理，进入开放交易市场，与其他人的代理进行推销、议价和成交，最终目标是让每个人都带走一本自己喜欢的书。

关键实验结果有三点。第一，代理仅凭五分钟对话，对 10 本书的排序与用户真实排序在 61% 的配对中一致，作者认为“对于一个这么短的对话来说好得惊人”。第二，代理在交易市场上的表现本身不差，市场效率不足更多来自代理对参与者偏好信息掌握不够，而不是交易策略问题。第三，作者用不同模型和不同指令反复重跑交易市场，发现“模型选择”对谈判结果的影响大于“指令设计”，并且更强模型参与的市场效率更高。

战略意义：

Anthropic 正在把一个此前少有人做的研究议题“代理与代理之间的市场经济”正式化。这个实验表面上很轻量，但涉及偏好提取、代理对齐、市场机制设计和模型能力评估，未来可能直接影响 agent 大规模部署时的经济与社会后果。特别是“模型越强，市场越有效”这一发现，意味着 agent 经济时代“模型能力本身就是市场基础设施”。

---

### 2. News：Anthropic and Infosys collaborate to build AI agents for telecommunications and other regulated industries

- 链接：https://www.anthropic.com/news/anthropic-infosys
- 分类：news
- 发布/更新：2026-09-28（正文内标注 Feb 17, 2026，疑似页面更新或重新推送）

核心内容：

Anthropic 与印度 IT/咨询巨头 Infosys 宣布合作，面向电信、金融服务、制造和软件开发行业交付企业级 AI 解决方案。合作把 Anthropic 的 Claude 模型和 `Claude Code` 与 Infosys `Topaz` 平台结合，核心卖点是“受监管行业所需的治理与透明度”。

文章特别强调印度市场：印度是 Claude.ai 第二大市场，并且当地近一半 Claude 使用量涉及应用程序构建、系统现代化和生产软件交付。Infosys 也是 Anthropic 在印度扩张后首批合作伙伴之一。

战略意义：

这是一个典型的“模型 + 行业专家”打法。Anthropic 很清楚，AI 模型在 demo 里可用和在受监管行业里可用之间有巨大鸿沟。通过与 Infosys 合作，Anthropic 等于进入了电信、金融和制造业的存量市场，而不是只做开发者工具。`Claude Code` 被定位成企业 Agent 的构造工具，而 Infosys 负责行业流程、合规和交付。这条新闻也再次印证 Anthropic 的路线：不急于做最宽泛的消费者市场，而是先把“可信 Agent”放进高价值、高监管的行业。

---

## 三、OpenAI 内容精选

OpenAI 今日增量条目很多，但多数未抓取正文。按 URL 去重后，我将其分为四组：模型与产品、研究与安全、生态与社会、官网栏目/聚合页。

### 模型与产品发布

#### 1. Introducing GPT-5.3 Codex

- 链接：https://openai.com/index/introducing-gpt-5-3-codex/
- 发布/更新：2026-09-29（抓取到 3 次重复）

从标题看，这是 GPT-5.3 的 Codex 版本发布。结合近期 OpenAI 对 Codex 的重心，这很可能是面向代码生成、代码 Agent 和自动化开发场景的专用模型迭代。同一页面被抓取三次，说明它在 OpenAI 首页或新闻流中的曝光权重很高。

#### 2. GPT-6 Astra

- 链接：https://openai.com/index/gpt-6-astra/
- 发布/更新：2026-09-29（抓取到 3 次重复）

GPT-6 系列再次出现新成员 Astra。结合同日/前日的 `GPT-6 Sol and Luna`，可以判断 OpenAI 正在用“一个底座、多个命名变体”的方式覆盖不同任务场景。Astra 的具体定位没有正文无法确认，但这个命名方式说明 GPT-6 不是一个单点模型，而是一个模型家族。

#### 3. Introducing GPT-6 Sol and Luna

- 链接：https://openai.com/index/introducing-gpt-6-sol-and-luna/
- 发布/更新：2026-09-28（抓取到 3 次重复）

标题中同时出现 `Sol` 与 `Luna`，一个“日”一个“月”，暗示这可能存在两个互补的模型角色：也许是一个负责高强度推理、另一个负责长期记忆/陪伴；也可能是一个白天工作流、一个夜间自动化。更合理的解读是 OpenAI 开始像消费品牌一样为模型命名，而非只用数字编号。

#### 4. GPT-5.6

- 链接：https://openai.com/index/gpt-5-6/
- 发布/更新：2026-09-28（抓取到 2 次重复）

在 GPT-5.3 和 GPT-6 之间还有一个 GPT-5.6，说明 OpenAI 的版本迭代节奏比传统软件行业快得多。这种密集版本号本身就在向市场传递信号：OpenAI 有能力在很短周期内连续提升模型。

#### 5. Codex Flexible Pricing For Teams

- 链接：https://openai.com/index/codex-flexible-pricing-for-teams/
- 发布/更新：2026-09-29

标题直接说明 Codex 开始为团队提供“灵活定价”。这是 Codex 从开发者工具向企业级产品商业化的重要信号。没有正文细节，但可以预期会出现按量、按席位数或按任务复杂度的分层定价。

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*