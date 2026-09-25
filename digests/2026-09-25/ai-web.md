# AI 官方内容追踪报告 2026-09-25

> 今日更新 | 新增内容: 92 篇 | 生成时间: 2026-09-25 02:22 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 2 篇（sitemap 共 448 条）
- OpenAI: [openai.com](https://openai.com) — 新增 90 篇（sitemap 共 1035 条）

---

# AI 官方内容追踪报告（2026-09-25 增量）

**样本窗口**：2026-09-24 ~ 2026-09-25（Anthropic 与 OpenAI 官网增量抓取）
**说明**：Anthropic 侧本轮有 2 篇可提取全文的关键内容；OpenAI 侧本轮共 90 个 URL 条目，绝大多数为索引页或列表页（无法提取正文），本报告基于 URL 语义、发布节奏和官方路径结构进行归纳分析，并已在相关条目处标注分析依据。

---

## 一、今日速览

- **Anthropic 在「智能体经济」与「AI 驱动的科学发现」两个方向上同时放出重磅内容**：一是《Project Swap》——继 Project Deal 之后第二个智能体交易市场实验，系统量化了「AI 代理人类谈判」的效率与缺陷；二是宣布成立生命科学研究组并建立实验室，宣称 Claude 在仅有高层级方向引导下发现了具有 CRISPR 类似特征的新型酶系统。
- **OpenAI 以「90 条内容」的密度密集发布**，核心是三大板块：GPT-6 家族进一步扩容（Astra、Sol/Luna 等型号与 Prompt Caching 优化）、平台能力上新（Agents API、GPT Live 1 API），以及大规模安全/威胁情报披露（"Disrupting Malicious Uses of AI" 系列 20+ 篇）。
- **「恶意使用 AI」系列成为今日最大单一主题**：从命名规律看（False Witness、Doppelganger、Spamouflage、Romance Scam、Task Scam、PRC Linked Abuse 等），OpenAI 以连载形式系统公开了针对特定攻击者活动与诈骗产业链的溯源报告，标志着其安全透明度策略从「原则声明」转向「威胁情报级披露」。
- **两家公司在「Agent」议题上罕见同频**：Anthropic 用实验证明「模型能力比 prompt 指令更能决定谈判结果」，OpenAI 则直接发布 Agents API——一个在学术侧验证 Theory of Change，一个在产品侧抢占开发者入口。
- **科学叙事成为新战场**：Anthropic 开设湿实验室并以 CRISPR 级发现作为开场，OpenAI 则有 FrontierScience、GPT-5.2 for Science & Math、GDPval 等条目——「AI 能否做出诺奖级发现」正从营销话术变成两家公司的组织能力竞赛。

---

## 二、Anthropic / Claude 内容精选

本轮 Anthropic 仅有 2 篇新内容，但都属于高信息密度、高战略权重的发布。按分类整理如下。

### research 类

#### 1. Project Swap: What happens when agents trade for us?
- **发布日期**：2026-09-24
- **原文链接**：https://www.anthropic.com/research/project-swap
- **核心观点**：
  - 这是 Project Deal 的「受控续集」——Anthropic 首次实验是让智能体在代表人类的市场中互动，本次则将场景压缩为一个「迷你市场」：六个办公室的员工各带一本书，与 Claude 进行 5 分钟简短对话后，由 Claude 智能体进入开放交易层，代表主人完成推销、讨价还价和成交。
  - 关键量化结果：仅凭 5 分钟对话，智能体对书籍的偏好排序与本人真实排序在 61% 的书对（pairs）上一致——「出乎意料地好」，说明短对话足以建立可用的用户偏好模型。
  - 最重要的负向发现：**市场的整体效率瓶颈在于智能体缺乏关于参与者的信息，而非交易策略或协议设计**。也就是说，「代表能力」比「谈判能力」更是短板。
  - 研究还做了模型与指令的对照实验：将交易层重跑数十次，替换底层模型和指令。结果发现**模型的强弱对谈判结果的影响大于指令设计**，且「更强模型构成的市场整体更有效率」。
- **战略意义**：这是目前少数公开的、对「Agent 代理人类进行商业交易」做受控实证的研究。它暗示：① 未来 Agent 经济中，「用户画像/偏好建模」是比「协商策略」更值得投入的环节；② 模型能力本身会是市场效率的分水岭——这对 OpenAI 的「更强模型 = 更好经济结果」叙事也是一种背书。Anthropic 显然在建立「AI 经济学」领域的认知领导地位。

### news 类

#### 2. Claude discovers a novel enzyme system with CRISPR-like repeats
- **发布日期**：2026-09-23（发布于 news 栏目，抓取于 09-24/25）
- **原文链接**：https://www.anthropic.com/news/claude-discovers-novel-enzyme-system
- **核心观点**：
  - Anthropic 宣布成立新的生命科学研究组（life sciences research group）并配套实体实验室，方向是「使用 Claude 做基础生物学研究」：扫描 DNA 数据集、识别未表征的蛋白家族、规模化生成假设，并通过湿实验验证。
  - 早期成果：Claude 在科学家仅提供高层级方向的情况下，独立发现了一个具有 CRISPR 类似特征的新型酶系统。文章追溯了历史上类似的「意外发现推动学科革命」的案例——限制酶、Taq 聚合酶、CRISPR 本身都是从「注意到自然界中的异常现象」开始的。
  - 这一定位非常明确：**Anthropic 要做的不是「AI 辅助科研」，而是「AI 驱动的基础发现」**——让模型在超大规模序列数据中自主找到人类不会注意的规律。
- **战略意义**：这是 Anthropic 从「AI 安全公司」「模型公司」向「AI 科学发现机构」转型的标杆信号。开设湿实验室意味着它愿意承担重资产、长周期的科研投入，也意味着 Claude 将从「通用对话模型」进一步绑定「科学发现工具」的身份。选择酶系统作为首个成果，有强烈的 CRISPR 类比叙事意图——暗示「下一个基因编辑工具可能由 AI 发现」。

---

## 三、OpenAI 内容精选

本轮 OpenAI 抓取了 90 个 URL，去重后约 60 余个独立条目。由于绝大多数为索引页/正文未抓取到文本（标注「无法提取文本内容」），以下分析主要基于 URL 语义、命名规范和发布密度。按主题域重新归类如下。

### 1. 模型与产品发布（release / product）

| 条目 | 链接 | 分析依据 |
|---|---|---|
| GPT-6 Astra（3 个入口） | https://openai.com/index/gpt-6-astra/ | 主条目 + 列表页入口，9/24 发布 |
| Introducing GPT-6 Sol and Luna（3 个入口） | https://openai.com/index/introducing-gpt-6-sol-and-luna/ | 新模型变体发布 |
| Better Prompt Caching for GPT-6 | https://openai.com/index/better-prompt-caching-for-gpt-6/ | 推理成本/延迟优化 |
| GPT-5.2 for Science and Math（3 个入口） | https://openai.com/index/gpt-5-2-for-science-and-math/ | 垂直能力模型 |
| Introducing GPT Live 1 in the API（2 个入口） | https://openai.com/index/introducing-gpt-live-1-in-the-api/ | 实时语音/流式 API |
| Introducing the Agents API | https://openai.com/index/introducing-the-agents-api/ | **开发者平台战略级发布** |

**解读**：GPT-6 系列正在快速裂变为家族化产品矩阵——Astra（推测为主型号/多模态旗舰）、Sol 与 Luna（推测为面向不同场景的派生型号，命名暗示「日/月」分工或推理/速度取向）、GPT-5.2 科学数学特化版。加上 Prompt Caching 的持续优化，OpenAI 正在把「模型层」做成「多型号 + 降本工具」的组合拳。**Agents API 是其中最具平台意义的发布**：它意味着 OpenAI 将「智能体」从 ChatGPT 功能抽象为开发者基础设施，直接与 Anthropic 的 Agent 生态（Claude Code / Agent SDK 类产品）正面竞争。

### 2. 安全、威胁情报与治理（safety / policy）

| 条目 | 链接 |
|---|---|
| Disrupting Malicious Uses Of AI（总索引） | https://openai.com/index/disrupting-malicious-uses-of-ai/ |
| Silver Lining Playbook | https://openai.com/index/disrupting-malicious-uses-of-ai-silver-lining-playbook/ |
| False Witness | https://openai.com/index/disrupting-malicious-uses-of-ai-false-witness/ |
| IT Workers | https://openai.com/index/disrupting-malicious-uses-of-ai-it-workers/ |
| Tech and Tariffs | https://openai.com/index/disrupting-malicious-uses-of-ai-tech-and-tariffs/ |
| Doppelganger | https://openai.com/index/disrupting-malicious-uses-of-ai-doppelganger/ |
| Bad Grammar | https://openai.com/index/disrupting-malicious-uses-of-ai-bad-grammar/ |
| Spamouflage | https://openai.com/index/disrupting-malicious-uses-of-ai-spamouflage/ |
| A2Z | https://openai.com/index/disrupting-malicious-uses-of-ai-a2z/ |
| PRC Linked Abuse | https://openai.com/index/disrupting-malicious-uses-of-ai-prc-linked-abuse/ |
| Sneer Review | https://openai.com/index/disrupting-malicious-uses-of-ai-sneer-review/ |
| IUVM | https://openai.com/index/disrupting-malicious-uses-of-ai-iuvm/ |
| Zero Zeno | https://openai.com/index/disrupting-malicious-uses-of-ai-zero-zeno/ |
| Fish Food | https://openai.com/index/disrupting-malicious-uses-of-ai-fish-food/ |
| Uncle Spam | https://openai.com/index/disrupting-malicious-uses-of-ai-uncle-spam/ |
| Stop News 2025 | https://openai.com/index/disrupting-malicious-uses-of-ai-stop-news-2025/ |
| Data Center Bandwagon | https://openai.com/index/disrupting-malicious-uses-of-ai-data-center-bandwagon/ |
| Nine Emdash Line | https://openai.com/index/disrupting-malicious-uses-of-ai-nine-emdash-line/ |
| Vague Focus | https://openai.com/index/disrupting-malicious-uses-of-ai-vague-focus/ |
| Deceptive Employment Scheme | https://openai.com/index/disrupting-malicious-uses-of-ai-deceptive-employment-scheme/ |
| Task Scam | https://openai.com/index/disrupting-malicious-uses-of-ai-task-scam/ |
| Romance Scam | https://openai.com/index/disrupting-malicious-uses-of-ai-romance-scam/ |
| Romance Baiting Scam | https://openai.com/index/disrupting-malicious-uses-of-ai-romance-baiting-scam/ |
| Wrong Number | https://openai.com/index/disrupting-malicious-uses-of-ai-wrong-number/ |
| Scam Operations | https://openai.com/index/disrupting-malicious-uses-of-ai-scam-operations/ |
| Date Bait | https://openai.com/index/disrupting-malicious-uses-of-ai-date-bait/ |
| Criminal Scam Operation | https://openai.com/index/disrupting-malicious-uses-of-ai-criminal-scam-operation/ |
| Model Misalignment Reporting Framework（2 入口） | https://openai.com/index/model-misalignment-reporting-framework/ |
| Improving Model Safety Behavior with Rule Based Rewards | https://openai.com/index/improving-model-safety-behavior-with-rule-based-rewards/ |
| Offering Zero Data Retention for Frontier Models（2 入口） | https://openai.com/index/offering-zero-data-retention-for-frontier-models/ |
| Priorities Principles Third Party Assessments | https://openai.com/index/priorities-principles-third-party-assessments/ |
| Australian Youth Safety Blueprint | https://openai.com/index/australian-youth-safety-blueprint/ |
| Evaluating Chain of Thought Monitorability（2 入口） | https://openai.com/index/evaluating-chain-of-thought-monitorability/ |

**解读**：
- 「Disrupting Malicious Uses of AI」系列共 27 个条目，在 9/24 同一天密集发布，形似一份季度威胁报告的「全文连载」。命名分为两类：**具名行动代号**（False Witness、Doppelganger、Spamouflage、Zero Zeno、Fish Food、Uncle Spam 等，推测为已追踪的特定影响力行动/蠕虫/垃圾信息活动）与**诈骗类型学**（Task Scam、Romance Scam、Wrong Number、Date Bait、Deceptive Employment Scheme 等，涵盖从「杀猪盘」到「虚假招聘」的完整犯罪链条）。其中「PRC Linked Abuse」暗示涉及与中国关联的滥用集群，「IT Workers / Tech and Tariffs / Data Center Bandwagon」则疑似将 AI 滥用与地缘产业政策（关税、数据中心建设）相关联——这是 OpenAI 在政治化叙事上的明显推进。
- **Model Misalignment Reporting Framework** 与 **Rule Based Rewards** 是安全科研侧的新词汇——「模型错位（misalignment）报告框架」意味着 OpenAI 正在建立一套可对外披露的内部安全分类法，类似于 AI 界的 CVE（漏洞披露）体系；「基于规则的奖励」则是一种可审计的对齐训练方法，是对纯 RLHF 的补充。
- **Zero Data Retention for Frontier Models** 是企业合规层面的重磅承诺：前沿模型零数据留存，直接回应金融、医疗、法律等受监管行业对数据隐私的核心关切，与同日发布的金融/法律垂直方案形成协同。

### 3. 研究前沿（research）

| 条目 | 链接 |
|---|---|
| FrontierScience（2 入口） | https://openai.com/index/frontierscience/ |
| Introducing Mentalhealthbench | https://openai.com/index/introducing-mentalhealthbench/ |
| Introducing Indqa（2 入口） | https://openai.com/index/introducing-indqa/ |
| GDPval（2 入口） | https://openai.com/index/gdpval/ |
| Solving Math Word Problems | https://openai.com/index/solving-math-word-problems/ |
| Finding GPT4's Mistakes with GPT-4 | https://openai.com/index/finding-gpt4s-mistakes-with-gpt-4/ |
| Economic Impacts Research | https://openai.com/index/economic-impacts-research/ |
| Democratic Inputs to AI | https://openai.com/index/democratic-inputs-to-ai/ |
| The Work Now Within Reach | https://openai.com/index/the-work-now-within-reach/ |
| Teen Development Research Grants | https://openai.com/index/teen-development-research-grants/ |

**解读**：FrontierScience 与 Anthropic 的酶发现形成直接对标——OpenAI 也在系统性地将前沿模型用于科学发现。Mentalhealthbench（心理健康基准）是少见的社会科学向评测集；GDPval 疑似「GDP 估值/经济学价值评测」，与 Economic Impacts Research 同属经济学测量系列；Indqa 推测为工业/领域问答基准（Industrial QA 或 Indic QA）。「Finding GPT-4's Mistakes with GPT-4」是经典自举对齐研究的延续，体现「用弱模型找强模型错误」的技术路线仍在演进。

### 4. 行业垂直与商业化（enterprise / vertical）

| 条目 | 链接 |
|---|---|
| Introducing ChatGPT Financial Services | https://openai.com/index/introducing-chatgpt-financial-services/ |
| Personal Finance ChatGPT | https://openai.com/index/personal-finance-chatgpt/ |
| Astra for Law | https://openai.com/index/astra-for-law/ |
| How to Connect AI Usage to Business Value | https://openai.com/index/how-to-connect-ai-usage-to-business-value/ |
| Put Data to Work | https://openai.com/index/put-data-to-work/ |
| Reimagining Advertising With AI | https://openai.com/index/reimagining-advertising-with-ai/ |

**解读**：「ChatGPT Financial Services」与「Astra for Law」标志 OpenAI 从「通用助手」转向**按行业合规要求定制的垂直产品**，与前述 Zero Data Retention 政策互相配合——没有零留存承诺，金融和法律客户不会买单。广告方向（Reimagining Advertising）则暗示其商业化版图正在向「AI 原生广告系统」延伸，这是 Anthropic 尚未涉足的领域。

### 5. 教育与公共立场（company / education / policy）

| 条目 | 链接 |
|---|---|
| Two Years of OpenAI Academy | https://openai.com/index/two-years-of-openai-academy/ |
| Expanding OpenAI Academy with New Learning Paths | https://openai.com/index/expanding-openai-academy-with-new-learning-paths/ |
| Advisory Group on Mathematics and AI | https://openai.com/index/advisory-group-on-mathematics-and-ai/ |
| Apple Is Getting This Wrong | https://openai.com/index/apple-is-getting-this-wrong/ |

**解读**：「Apple Is Getting This Wrong」是**极其罕见的直接点名批评另一家大型科技公司的标题**，没有委婉措辞，这在此前 OpenAI 官方博客中几乎未曾出现。结合上下文（设备端 AI / 默认搜索引擎 / 分发渠道等潜在争议），这暗示两家公司之间已发生公开化分歧。Academy 两周年 + 新增学习路径，说明 OpenAI 正将「人才教育」作为生态护城河——培养一代「原生用 AI 的开发者/劳动者」，与「The Work Now Within Reach」的劳动叙事相呼应。

---

## 四、战略信号解读

### 1. Anthropic 的技术优先级：深度 > 广度，研究驱动

从本轮两条内容看，Anthropic 的资源配置集中在两个长周期方向：

- **智能体经济学（Agent Economics）**：Project Swap 是 Project Deal 的延续，说明 Anthropic 在把「智能体代理人类参与真实市场」作为一条系统的研究线来做，而非单点实验。它关心的是深层的机制问题——信息不对称、偏好建模、市场效率——而不是某个具体产品功能。这类研究会为 Anthropic 提供「如何设计未来 AI 市场/多智能体系统」的第一手设计原则，并转化为论文、白皮书和产品话语权。
- **AI 驱动的科学发现**：成立实体生命科学实验室是一个重资产决定。Anthropic 选择的切入点是「让模型在海量 DNA 数据中发现未表征的蛋白家族」，这本质上是将 Claude 定位为「科学家的无限想象力外挂」。CRISPR-like 的发现如果经得起复现，将是「Claude 做出了 CRISPR 级发现」的长期品牌资产，足以与任何模型性能榜单抗衡。

**特征总结**：Anthropic 正在有意识地构建「可信前沿实验室」的品牌——少而精的发布、可检验的实验设计、强调实证而非宣言。其竞争逻辑是：**用科学严谨性来定义「什么是真正先进的 AI」。**

### 2. OpenAI 的技术优先级：广度围剿，平台化 + 合规化 + 安全透明化

OpenAI 本轮 90 条内容，可以理解为四条战线同时推进：

- **模型层面**：GPT-6 家族快速裂变（Astra/Sol/Luna），搭配 Prompt Caching 优化，继续拉大「能力 * 成本」的乘积优势；GPT-5.2 for Science & Math 表明其在专业领域做特化蒸馏。
- **平台层面**：Agents API 与 GPT Live 1 API 是「把模型能力封装为开发者基础设施」的关键两步。OpenAI 不再只卖模型，而是卖「能执行任务的

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*