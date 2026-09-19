# AI 官方内容追踪报告 2026-09-19

> 今日更新 | 新增内容: 210 篇 | 生成时间: 2026-09-19 02:13 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 2 篇（sitemap 共 446 条）
- OpenAI: [openai.com](https://openai.com) — 新增 208 篇（sitemap 共 1021 条）

---

# AI 官方内容追踪报告

**报告日期：2026-09-19** | **追踪范围：Anthropic（anthropic.com / claude.com）& OpenAI（openai.com）官网增量更新**


## 一、今日速览

今日两家前沿AI实验室的更新呈现出鲜明对比：**Anthropic仅发布2篇内容但均具战略重量级**——与埃森哲达成嵌入式评估合作（双方各投入至少10亿美元）以及Claude在生物分子建模领域的科研突破；**OpenAI则迎来海量发布（208篇标题，大量重复与历史归档），核心焦点是GPT-6 Astra的正式亮相**，同时伴随ChatGPT Agent、GPT-5.4/5.5 Instant等模型矩阵的密集铺开。Anthropic延续“安全治理+科学前沿”的双轮驱动叙事，而OpenAI则以“产品发布风暴+安全内容轰炸”的组合拳推进其平台化生态战略。值得特别关注的是，OpenAI发布了多篇打击AI恶意诈骗的系列公告（涉及诈骗运营、浪漫诱导、虚假就业等场景），显示出大模型头部玩家在全球AI安全治理上的主动姿态。


## 二、Anthropic / Claude 内容精选

### news 分类

**《Partnering with Accenture on embedded evaluation》（与埃森哲合作嵌入式评估）**
- **发布日期**：2026-09-18
- **原文链接**：https://www.anthropic.com/news/accenture-embedded-evaluation
- **核心观点**：
  1. Anthropic与埃森哲（Accenture）达成合作，由后者旗下专业AI业务部门Faculty主导，对Anthropic的前沿模型进行独立评估与红队测试，涵盖对齐评估和模型安全保障测试。
  2. 这是对Anthropic CEO在“We Must Pace the Frontier”一文中承诺的落实——将评估人员嵌入AI公司内部，实现“嵌入式评估”（embedded evaluation）这一全新机制。
  3. 嵌入式评估人员将获得接近员工的访问权限，可在训练过程中观察模型形态、追踪模型构建与部署决策、直接与员工交流，从而评估公司运营、验证安全承诺、识别盲区并报告事件。
  4. 双方各承诺在未来五年内投入至少10亿美元用于该领域的能力建设。
- **业务意义**：这是全球AI安全治理领域的开创性尝试——首次由外部咨询巨头以“嵌入式”姿态进入前沿AI公司内部运作。10亿美元级别的投入规模表明，AI安全评估正从“外部审核”向“内部治理”演化，可能催生全新的安全评估产业形态。

### research 分类

**《How Claude is uplifting biomolecular modeling》（Claude如何提升生物分子建模）**
- **发布日期**：2026-09-17
- **原文链接**：https://www.anthropic.com/research/claude-uplifts-biomolecular-modeling
- **核心观点**：
  1. Claude（运行于Claude Science环境）在不到四周时间内优化了30多个用于生物分子预测与设计的开源模型，平均加速约4倍。
  2. 开发了低内存模式（low-memory mode），使超过10,000个token（氨基酸、核苷酸、小分子和离子的原子）的生物分子系统能在单个NVIDIA GPU节点上进行准确预测。
  3. Anthropic将全部优化代码开源，并与Adaptyv Bio联合推出蛋白质设计竞赛，提供最高100万美元的Claude积分和超过5,000个设计的湿实验验证。
  4. 此前研究已证明Claude具备通过专家级编排开源蛋白质设计工具来设计全新de novo蛋白结合物的能力，但成本高昂（最高每靶点1万美元）；本次优化大幅降低了这一门槛。
- **业务意义**：这项研究将Claude从“通用对话模型”推向“科学发现引擎”的定位。开源全部优化代码+赞助竞赛的组合拳，意在建立Claude在AI for Science领域的事实标准地位，并吸引全球计算生物学社区围绕Anthropic生态工作。


## 三、OpenAI 内容精选

> **说明**：今日OpenAI官网抓取到208篇增量条目，大量为同一内容的重复收录或历史页面的滚动归档（如“News”页面及多个索引页）。以下按主题聚类整理核心内容，剔除重复后聚焦真正具有信息增量的发布。

### 一、核心模型发布（release）

**《Gpt 6 Astra》**（GPT-6 Astra）
- **发布日期**：2026-09-19
- **原文链接**：https://openai.com/index/gpt-6-astra/
- **要点**：OpenAI新一代旗舰模型GPT-6 Astra正式亮相。从同日发布的《Safety Overview Gpt 6 Astra》（https://openai.com/index/safety-overview-gpt-6-astra/ ）、《Gpt 6 Astra Next Generation Work》（https://openai.com/index/gpt-6-astra-next-generation-work/ ）以及《Path To Astra》（https://openai.com/index/path-to-astra/ ）等关联文章推断，这不仅是模型迭代，更是OpenAI面向“下一代工作方式”的核心产品发布。标题中“Astra”可能代表新的多模态能力或代理式计算框架。

**《Introducing Gpt 5 4》及《Introducing Gpt 5 4 Mini And Nano》**（GPT-5.4系列）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-gpt-5-4/ 、 https://openai.com/index/introducing-gpt-5-4-mini-and-nano/
- **要点**：GPT-5.4作为中端旗舰发布，同时推出Mini和Nano两个轻量级变体，覆盖从高能力到低成本/低延迟的完整部署谱系。结合《Gpt 5 5 Instant》（https://openai.com/index/gpt-5-5-instant/ ）来看，OpenAI正在构建类似“旗舰+Instant+Mini+Nano”的四层模型矩阵，以满足不同场景需求。

**《Introducing Gpt 5 6》与《Previewing Gpt 5 6 Sol》**（GPT-5.6系列）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-gpt-5-6/ 、 https://openai.com/index/previewing-gpt-5-6-sol/
- **要点**：GPT-5.6以及更高阶的“Sol”版本进入发布/预览阶段。同日发布的《Advancing The Price Performance Frontier With Gpt 5 6》（https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/ ）和《Improving Gpt 5 6 Sol In Chatgpt》（https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/ ）表明，OpenAI在追求能力提升的同时，将性价比（price-performance）作为核心竞争维度，Sol版本可能是面向特定高难任务的专业变体。

**《Introducing Gpt Live》**（GPT Live）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-gpt-live/
- **要点**：推出“GPT Live”模式，从命名推断可能支持实时流式交互、持续对话或实时数据接入能力，是语音/实时交互方向的重要产品化进展。

### 二、代理与产品形态（agent & product）

**《Introducing Chatgpt Agent》**（ChatGPT Agent）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-chatgpt-agent/
- **要点**：正式推出ChatGPT Agent，标志着ChatGPT从“对话工具”向“自主执行代理”的关键跃迁。结合《Introducing The Agents Api》（https://openai.com/index/introducing-the-agents-api/ ）发布，OpenAI正在打通终端用户代理体验与开发者代理生态。

**《Introducing Chatgpt Atlas》**（ChatGPT Atlas）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-chatgpt-atlas/
- **要点**：从命名推断，“Atlas”可能是ChatGPT的企业知识地图/工作空间功能，或新的多源信息整合界面，指向企业知识管理场景。

**《Introducing Openai Presence》**（OpenAI Presence）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-openai-presence/
- **要点**：“Presence”可能涉及AI在数字世界中的“在场”能力——包括持续在线代理、虚拟身份或实时协作空间，是AI从“响应式”走向“主动式”的重要产品信号。

**《Introducing Chatgpt Pulse》**（ChatGPT Pulse）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-chatgpt-pulse/
- **要点**：推测为实时信息流/动态监测功能，可能让ChatGPT具备持续追踪特定话题或事件变化的能力。

### 三、开发者与平台生态（developer & platform）

**《Openai Frontier Models And Codex Are Now Available On Aws》**（OpenAI前沿模型与Codex登陆AWS）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws/
- **要点**：OpenAI前沿模型及Codex编程代理正式在AWS上提供，标志着OpenAI从Azure单一云伙伴走向多云战略。同日《Daybreak Models Are Now Available On Aws》（https://openai.com/index/daybreak-models-are-now-available-on-aws/ ）再次确认这一趋势。这是对企业客户部署灵活性的重大让步，直接回应了“云锁定”担忧。

**《Developers Can Now Submit Apps To Chatgpt》**（开发者可提交应用到ChatGPT）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/developers-can-now-submit-apps-to-chatgpt/
- **要点**：ChatGPT应用生态正式向开发者开放提交，这是对标苹果App Store模式的平台化关键一步。结合《Introducing Openai Partner Network》（https://openai.com/index/introducing-openai-partner-network/ ），OpenAI正在系统化构建第三方开发者生态。

**《Gpt 5 6 Preferred Model Microsoft 365 Copilot》**（GPT-5.6成为Microsoft 365 Copilot首选模型）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/gpt-5-6-preferred-model-microsoft-365-copilot/
- **要点**：尽管OpenAI拓展AWS，但与微软的深度绑定仍在强化——GPT-5.6被设为Microsoft 365 Copilot的默认首选模型，证明微软渠道依然是OpenAI企业市场的基本盘。

### 四、商业化与新商业模式（commercial & business）

**《Reimagining Advertising With Ai》与《Expanding Access To Ai With Chatgpt Ads》**（AI广告）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/reimagining-advertising-with-ai/ 、 https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/
- **要点**：OpenAI正在系统化推进广告商业模式。《Chatgpt Ads Expands Across Europe》（https://openai.com/index/chatgpt-ads-expands-across-europe/ ）表明广告已在欧洲扩展，结合《Testing Ads In Chatgpt》（https://openai.com/index/testing-ads-in-chatgpt/ ）和《Our Approach To Advertising And Expanding Access》（https://openai.com/index/our-approach-to-advertising-and-expanding-access/ ），广告战略已从测试区走向规模化扩张。

**《Introducing Data Residency In Europe》与《Introducing Data Residency In Asia》**（数据驻留）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-data-residency-in-europe/ 、 https://openai.com/index/introducing-data-residency-in-asia/
- **要点**：OpenAI推出欧洲和亚洲数据驻留能力，满足企业合规需求。同日《Offering Zero Data Retention For Frontier Models》（https://openai.com/index/offering-zero-data-retention-for-frontier-model/ ）推出零数据保留选项，这是争夺高合规敏感行业（金融、医疗、政府）客户的关键武器。

### 五、安全与恶意使用治理（safety & security）

**《Disrupting Malicious Uses Of Ai》系列**（打击AI恶意使用系列）
- **发布日期**：2026-09-18至2026-09-19
- **原文链接**：
  - 总述：https://openai.com/index/disrupting-malicious-uses-of-ai/
  - 骗局案例：https://openai.com/index/disrupting-malicious-uses-of-ai-criminal-scam-operation/
  - 浪漫诱导：https://openai.com/index/disrupting-malicious-uses-of-ai-romance-baiting-scam/
  - 错误号码：https://openai.com/index/disrupting-malicious-uses-of-ai-wrong-number/
  - 虚假就业：https://openai.com/index/disrupting-malicious-uses-of-ai-deceptive-employment-scheme/
- **要点**：OpenAI集中发布了一批打击AI恶意使用的具体行动报告，覆盖诈骗运营、浪漫诱导、虚假就业、语法伪装、数据中心炒作、Spamouflage、Doppelganger等多种攻击模式。这是一次高度组织化的安全叙事输出，展示了OpenAI在AI滥用治理上的具体行动力，同时传递“AI安全需要全行业协作”的信号。

**《Introducing Lockdown Mode And Elevated Risk Labels In Chatgpt》**（ChatGPT锁定模式与高风险标签）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-lockdown-mode-and-elevated-risk-labels-in-chatgpt/
- **要点**：ChatGPT推出“锁定模式”（Lockdown Mode）和提升风险标签（Elevated Risk Labels）功能，为高敏感场景提供更强的安全保障。

**《Scaling Trusted Access For Cyber Defense》与《Expanding Daybreak As The Cyber Defense Window Narrows》**（网络安全）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/scaling-trusted-access-for-cyber-defense/ 、 https://openai.com/index/expanding-daybreak-as-the-cyber-defense-window-narrows/
- **要点**：OpenAI在网络安全防御领域扩大“可信访问”范围，并扩展Daybreak模型以应对日益缩小的网络防御窗口期。

### 六、健康、科学与教育（health, science & education）

**《Introducing Chatgpt Health》与《Health In Chatgpt》**（ChatGPT健康）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-chatgpt-health/ 、 https://openai.com/index/health-in-chatgpt/
- **要点**：ChatGPT正式进入健康领域，《Chatgpt Connects Health Records And Healthcare Sources》（https://openai.com/index/chatgpt-connects-health-records-and-healthcare-sources/ ）显示其已能连接健康记录与医疗数据源，《Improving Health Intelligence In Chatgpt》（https://openai.com/index/improving-health-intelligence-in-chatgpt/ ）表明健康智能是重点发展方向。

**《Introducing Gpt Rosalind》相关**（GPT Rosalind生物安全）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind/ 、 https://openai.com/index/strengthening-societal-resilience-with-rosalind-biodefense/
- **要点**：GPT Rosalind新增能力并与生物防御结合，叠加《Bio Bug Bounty》（https://openai.com/index/bio-bug-bounty/ ）生物漏洞赏金计划，显示OpenAI在生物安全双线布局：一边提升生物威胁防御，一边建立安全研究激励。

**《Navier Stokes Solution》**（纳维-斯托克斯方程）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/navier-stokes-solution/
- **要点**：从标题判断，OpenAI可能在AI求解纳维-斯托克斯方程（流体力学核心方程）上取得突破，是AI for Science方向的重要成果。

### 七、青少年保护与政策（teen safety & policy）

**《Introducing Parental Controls》**（家长控制）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/introducing-parental-controls/
- **要点**：推出家长控制功能。

**《Updating Model Spec With Teen Protections》与《Building Towards Age Prediction》**（青少年保护）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/updating-model-spec-with-teen-protections/ 、 https://openai.com/index/building-towards-age-prediction/
- **要点**：OpenAI更新模型规范以强化青少年保护，同时正在建设年龄预测能力，后者可能涉及生物识别或行为推断，属敏感且前瞻性的技术方向。

**《Teen Development Research Grants》与《Ai Mental Health Research Grants》**（研究资助）
- **发布日期**：2026-09-18
- **原文链接**：https://openai.com/index/teen-development-research-grants/ 、 https://openai.com/index/ai-mental-health-research-grants/
- **要点**：通过资助外部研究来构建“负责任AI”的社会证据链，是OpenAI在政策端的软性布局。


## 四、战略信号解读

### 1. 技术优先级对比：Anthropic vs. OpenAI

| 维度 | Anthropic | OpenAI |
|------|-----------|--------|
| **模型能力** | 未发布新模型；聚焦“用Claude提升其他模型”的元能力 | 密集发布GPT-5.4/5.5/5.6及GPT-6 Astra，多层级模型矩阵成型 |
| **安全治理** | 嵌入式评估机制（ACORN与埃森哲合作），开创行业先河；10亿美元级投入 | 打击恶意AI使用系列报告；锁定模式；安全框架持续迭代 |
| **产品化** | Claude Science等科学工具深化 | ChatGPT Agent、应用商店、广告平台、健康、企业功能全面铺开 |
| **生态策略** | 开源优化代码+竞赛赞助，建立科学社区影响力 | 开发者提交应用、AWS多云、Partner Network、数据驻留，构建平台生态 |
| **科学研究** | 生物分子建模、蛋白质设计（4倍加速、竞赛） | 纳维-斯托克斯求解、GPT Rosalind生物防御、青少年发展研究 |

**核心差异**：Anthropic以“安全优先+科学深度”构建差异化壁垒；OpenAI以“产品矩阵+生态扩张”主导市场节奏。两者并非简单竞争关系，而是走向了不同的战略路径——Anthropic试图定义“如何安全地构建AI”，OpenAI试图定义“AI能做什么”。

### 2. 竞争态势：谁在引领议题？

- **安全议题**：Anthropic在“治理创新”上领先——嵌入式评估是前所未有的机制设计，10亿美元投入意味着不是公关姿态而是真实战略投入。OpenAI在“安全叙事”上跟进，但侧重具体行动展示（打击诈骗案例）而非治理机制创新。
- **产品节奏**：OpenAI完全主导——208篇增量内容中绝大多数为产品发布，GPT-6 Astra的亮相是重大节点。Anthropic在产品端保持克制，可能有意避免陷入发布竞赛。
- **科学前沿**：两者均在加速投入。Anthropic在生物分子方向有明确产出（4倍加速、竞赛）；OpenAI在流体力学、生物防御等方向也有布局。AI for Science成为两家共识性战场。
- **商业模式**：OpenAI在广告、企业服务、开发者生态上全面加速商业化；Anthropic的商业化信号暂时弱于OpenAI，ACORN合作更偏向治理与合规价值。

### 3. 对开发者和企业用户的潜在影响

**对开发者**：
- OpenAI开发者生态迎来平台级机会：应用可提交至ChatGPT（对标App Store模式）、Agents API开放、模型矩阵（Nano到Astra）覆盖全场景需求。AWS上可用OpenAI模型意味着云供应商锁定解除，部署灵活性大幅提升。
- Anthropic开发者则获得更高效的生物分子开源工具链，且Claude在代码优化上的能力展示（4倍加速）暗示其在软件工程场景的潜力。

**对企业用户**：
- OpenAI提供完整的企业合规工具箱：数据驻留（欧/亚）、零数据保留、锁定模式、企业支出控制、公司知识接入。加上GPT-5.6在Microsoft 365 Copilot中的首选地位，企业采用门槛显著降低。
- Anthropic通过ACORN合作向企业传达的信号是：选择Anthropic等于选择了“可验证的安全治理”，这在高度监管行业（金融、医疗、政府）可能成为差异化卖点。

**对AI政策制定者**：
- Anthropic的嵌入式评估为“AI公司内部治理”提供了首个可操作范本，可能影响未来监管框架设计。
- OpenAI的青少年保护系列、年龄预测技术、心理健康研究资助，则在“AI与未成年人”这一敏感政策议题上提前卡位。


## 五、值得关注的细节

### 1. 新兴词汇与概念首发
- **“Embedded evaluation”（嵌入式评估）** ：Anthropic首次将这一概念从CEO文章落实为具体合作，可能成为AI安全领域的新标准术语。
- **“Lockdown Mode”（锁定模式）** ：ChatGPT首次引入，暗示AI产品开始提供“极端安全模式”，面向高敏感场景。
- **“Elevated Risk Labels”（高风险标签）** ：AI内容风险分级体系正在形成。

### 2. 密集发布主题与潜在产品节点
- **“Disrupting Malicious Uses Of AI”系列（11篇以上）** ：在一天内集中发布如此大规模的打击滥用内容，说明OpenAI积累了相当数量的行动案例，可能为后续推出面向企业的“AI安全合规产品”做铺垫。
- **“Introducing Data Residency”系列（欧/亚）** ：数据驻留能力的快速铺开意味着OpenAI正在为全球性企业客户拓展扫清合规障碍，是进入受监管市场的关键基础设施。
- **广告系列（5篇以上）** ：ChatGPT广告从测试到欧洲扩张的节奏极快，可能成为OpenAI的下一个数十亿美元级收入来源，也意味着免费用户将越来越多地接触广告体验。

### 3. 命名与措辞中的隐含信号
- **“An Alien Mind”** （https://openai.com/index/an-alien-mind/ ）：这个标题极为醒目——可能指AI作为“外星心智”的哲学讨论，也可能是某个新项目的代号或隐喻。值得密切关注。
- **“Apple Is Getting This Wrong”** （https://openai.com/index/apple-is-getting-this-wrong/ ）：罕见地直接批评苹果，可能涉及AI隐私政策、App Store审核或Siri竞争，公开“点名”竞争对手在OpenAI官网并不常见。
- **“Gpt 6 Astra”** 中“Astra”的词源来自拉丁语“星辰”，而同日有“Path To Astra”文章，暗示这不是简单的模型发布，而是OpenAI定义“下一代AI交互体验”的战略级项目。
- **“Chatgpt Memory Dreaming”** （https://openai.com/index/chatgpt-memory-dreaming/ ）：“记忆做梦”是一个极其新颖的表述，可能暗示ChatGPT的记忆机制将在睡眠/离线状态下进行信息整理和联想——这是一种类人化的设计，可能在隐私和认知科学层面引发讨论。

### 4. 政策与合规动向
- **青少年保护成为系统性工程**：从家长控制、Model Spec更新、年龄预测、青少年研究资助到“Why Teens Deserve Access Safe Ai”的立场声明，OpenAI正在构建完整的“青少年AI安全”体系，这可能与欧美即将出台的未成年人网络保护法规（如英国的在线安全法案、美国各州相关立法）形成呼应。
- **“Hugging Face Incident And The Road Ahead”** （https://openai.com/index/hugging-face-incident-and-the-road-ahead/ ）：这个标题暗示Hugging Face发生了某种安全事件，OpenAI专门发文讨论“前路”，可能涉及开源模型生态的风险，需密切关注其对开源AI社区的影响。
- **“Estimating Worst Case Frontier Risks Of Open Weight Llms”** （https://openai.com/index/estimating-worst-case-frontier-risks-of-open-weight-llms/ ）：OpenAI正在量化开源权重模型的最坏情况风险，这是对开源模型安全争论的重要学术贡献，可能影响未来开源模型的监管环境。

### 5. 发布时机的深意
- OpenAI选择在9月18-19日集中释放超过200条内容，这种“信息饱和轰炸”策略可能有以下考虑：（1）以量取胜，覆盖GPT-6 Astra发布带来的关注洪峰；（2）用密集的安全内容平衡产品发布可能引发的担忧情绪；（3）在Q3末建立强劲的市场势头，为Q4商业冲刺做铺垫。
- Anthropic选择在OpenAI发布风暴前一日（9月17-18日）发布其重量级内容，避免了流量被完全淹没，且其“安全治理”和“科学突破”的定位与OpenAI的“产品狂欢”形成鲜明区隔，反而更容易被深度报道和学术界关注。

### 6. 值得追踪的后续信号
- **“Astra”是否会成为OpenAI新平台**（类似从ChatGPT到Agent平台的跃迁）？后续是否有开发者文档和生态计划发布？
- **Anthropic的ACORN嵌入式评估**首批评估报告何时公开？评估结果将如何影响Anthropic模型的发布节奏？
- **“An Alien Mind”** 和 **“Apple Is Getting This Wrong”** 是否会引发行业讨论或回应？
- **GPT-6 Astra的独立安全报告**是否会出现批评性结论？OpenAI的“Safety Overview”是否只是流程性动作？

---

**报告完**

*免责声明：本报告基于2026-09-19从官网抓取的公开信息撰写，部分内容因页面无法提取全文而基于标题和上下文推断，具体细节请以原文为准。*

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*