# AI 官方内容追踪报告 2026-09-26

> 今日更新 | 新增内容: 306 篇 | 生成时间: 2026-09-26 02:26 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 2 篇（sitemap 共 449 条）
- OpenAI: [openai.com](https://openai.com) — 新增 304 篇（sitemap 共 1035 条）

---

# 《AI 官方内容追踪报告》

**报告日期：2026-09-26**  
**数据源：Anthropic（anthropic.com）、OpenAI（openai.com）官网增量抓取**  
**聚焦范围：2026-09-25 至 2026-09-26 新增/更新内容**

---

## 一、今日速览

1. **Anthropic 以两篇重磅研究刷屏**：一篇由物理学家 Matt von Hippel 撰写的 guest post，展示 Claude 成功计算 N=4 超杨-米尔斯理论中的九圈振幅；另一篇是 Project Swap，让 agent 在迷你市场中代表人类进行交易谈判，探索 agent 经济雏形。
2. **OpenAI 进入“密集发布周”**：从 GPT-5.5、GPT-5.6、GPT-6 Astra 到 GPT-6 Sol/Luna，多代模型集中亮相，同时推出 Aardvark、GPT Rosalind 等垂直模型，形成“通用+专用”的分层产品矩阵。
3. **AI for Science 成为竞争焦点**：OpenAI 同日发布 Navier-Stokes 解、离散几何猜想反例、单负振幅推广到引力子、九圈相关物理结果等，与 Anthropic 的九圈振幅形成正面对撞。
4. **Agent 从实验走向真实经济场景**：Anthropic 的 Project Swap 研究 agent 自动化交易；OpenAI 发布 Agents API、ChatGPT Agent System Card，并大篇幅讨论“Agent 如何改变工作”。
5. **安全、青少年保护与网络防御成为“常规军备”**：OpenAI 新增大量系统卡、年龄预测、家长控制、恶意使用打击报告，并宣布 Daybreak 网络防御扩展、安全漏洞赏金等，安全叙事已从防御性转向主动治理。

---

## 二、Anthropic / Claude 内容精选

### 1. Research

#### [Claude computes a nine-loop amplitude in N=4 super-Yang-Mills](https://www.anthropic.com/research/yes-claude-can-do-nine-loops)  
- **发布日期**：2026-09-25  
- **分类**：research  
- **核心观点**：物理学家 Matt von Hippel 向多家 AI 公司发起“计算九圈振幅”挑战，结果一个月后即被 Claude 攻克。作者此前对 LLM 是否能在理论物理领域做出真正困难的进展持怀疑态度，而这次结果让他不得不承认“我们活在一个不寻常的时代”。  
- **技术细节**：N=4 超杨-米尔斯理论是研究散射振幅的“标准实验室”，九圈振幅的计算极其复杂，传统上需要专业物理学家数月甚至数年的推导。Claude 并非简单检索或复现，而是参与了实质性的符号推导与逻辑推进，表明前沿模型已经能处理高度专业化的理论物理任务。  
- **战略意义**：这是 Anthropic 以“外部专家背书”方式展示模型科学推理能力的典型案例，采用 guest post 而不是自家自夸，增强了可信度，也直接回击“LLM 接近天花板”的论调。

#### [Project Swap: What happens when agents trade for us?](https://www.anthropic.com/research/project-swap)  
- **发布日期**：2026-09-24（页面标注 2026-09-25 抓取）  
- **分类**：research（经济学）  
- **核心观点**：Anthropic 做了一个“迷你市场”实验——让 Claude agent 代表员工进行图书交换。每位参与者只与 Claude 聊天 5 分钟，agent 便学会了个人阅读偏好，并在公开交易大厅中报价、谈判、达成交易。结果显示，agent 对书籍的排序与本人有 61% 的一致性，市场整体效率较高，但主要瓶颈来自 agent 缺乏参与者的充分信息，而非交易能力本身。  
- **技术细节**：这是 Project Deal（第一次 agent 市场实验）的受控续作。研究团队反复重跑了数十次交易大厅，更换模型和指令，发现“模型本身的能力比指令对谈判结果影响更大”，且更强模型组成的市场更高效。  
- **战略意义**：Anthropic 正在系统性地研究“agent 代表人类进入经济系统”这一未来场景，涉及偏好对齐、自动协商、市场效率等关键问题。可以看作是为未来个人 AI 代理参与真实商业交易进行预研。

---

## 三、OpenAI 内容精选

> 说明：今日抓取到 OpenAI 共 304 条内容，其中包含大量历史存档页；以下按战略主题精选最有信号的更新，重点聚焦 2026 年 9 月前后发布的新内容。

### 1. 模型与产品发布

#### [Introducing GPT-6 Sol and Luna](https://openai.com/index/introducing-gpt-6-sol-and-luna/)  
- **发布日期**：2026-09-25  
- 这是 GPT-6 系列的双子模型：Sol 与 Luna。从命名看明显采用“太阳/月亮”双轨路线，可能分别针对白天工作任务与长尾/夜间场景，也暗示模态或时延上的差异化。GPT-6 系列正成为 OpenAI 当前最前沿的通用模型线。

#### [GPT-6 Astra](https://openai.com/index/gpt-6-astra/)  
- **发布日期**：2026-09-25  
- GPT-6 Astra 被强调为“下一代工作”的模型，配套页面包括 [Safety Overview GPT-6 Astra](https://openai.com/index/safety-overview-gpt-6-astra/)、[Path to Astra](https://openai.com/index/path-to-astra/)、[Airbnb GPT-6 Astra](https://openai.com/index/airbnb-gpt-6-astra/)、[GPT-6 Astra Next Generation Work](https://openai.com/index/gpt-6-astra-next-generation-work/)。它不仅是模型，更是与行业标杆企业（如 Airbnb）联合验证的工作场景解决方案。

#### [Introducing GPT-5.5](https://openai.com/index/introducing-gpt-5-5/) / [GPT-5.6](https://openai.com/index/gpt-5-6/)  
- **发布日期**：2026-09-25  
- GPT-5.5 和 GPT-5.6 在同一窗口内密集发布，后者还同步推出 [Frontier

---
*本日报由 [Big Model Radar](https://github.com/Senmo996/big_model_radar) 自动生成。*