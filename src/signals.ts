import { createHash } from "node:crypto";
import type { RepoConfig, GitHubItem, GitHubRelease } from "./github.ts";
import type { HnData } from "./hn.ts";
import type { TrendingData } from "./trending.ts";
import type { WebFetchResult } from "./web.ts";

export type SignalSource =
  | "github_release"
  | "github_issue"
  | "github_pr"
  | "official"
  | "github_trending"
  | "github_search"
  | "hacker_news"
  | "article"
  | "report";

export type SignalSourceFamily = "github" | "official" | "community" | "media" | "discovery" | "report";

export interface SignalEvidence {
  id: string;
  source: SignalSource;
  sourceFamily: SignalSourceFamily;
  sourceLabel: string;
  title: string;
  url: string;
  publishedAt: string;
  authority: "primary" | "community" | "discovery" | "derived";
  metrics: Record<string, number>;
}

export interface SignalScoreBreakdown {
  sourceDiversity: number;
  authority: number;
  engagement: number;
  corroboration: number;
}

export interface SignalCard {
  id: string;
  date: string;
  title: string;
  summary: string;
  whyItMatters: string;
  score: number;
  scoreBreakdown: SignalScoreBreakdown;
  crossSource: boolean;
  sourceCount: number;
  sourceFamilies: SignalSourceFamily[];
  entities: string[];
  topics: string[];
  primaryUrl: string;
  evidence: SignalEvidence[];
}

export interface SignalBundle {
  version: 1;
  date: string;
  generatedAt: string;
  cards: SignalCard[];
  stats: {
    evidenceCount: number;
    cardCount: number;
    crossSourceCount: number;
    sourceFamilies: number;
  };
}

export interface RepoActivity {
  cfg: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
}

export interface SignalBuildInput {
  date: string;
  generatedAt?: string;
  repoActivities: RepoActivity[];
  skills?: { repo: string; name: string; issues: GitHubItem[]; prs: GitHubItem[] };
  webResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HnData;
}

export interface SignalEvidenceInput {
  source: SignalSource;
  sourceFamily: SignalSourceFamily;
  sourceLabel: string;
  title: string;
  url: string;
  publishedAt: string;
  authority: SignalEvidence["authority"];
  metrics?: Record<string, number>;
  repo?: string;
  entityHints?: string[];
  context?: string;
}

interface Candidate extends SignalEvidence {
  repo?: string;
  entityHints: string[];
  context: string;
  tokens: Set<string>;
  entities: string[];
  topics: string[];
}

const STOP_WORDS = new Set([
  "about",
  "after",
  "again",
  "from",
  "into",
  "more",
  "new",
  "official",
  "release",
  "repo",
  "the",
  "this",
  "today",
  "using",
  "with",
  "your",
  "github",
  "openai",
  "anthropic",
  "claude",
  "model",
  "models",
  "llm",
  "ai",
  "update",
  "updates",
]);

const ENTITY_ALIASES: Array<{ label: string; aliases: string[] }> = [
  { label: "Claude Code", aliases: ["claude code", "claude-code", "anthropics/claude-code"] },
  { label: "OpenAI Codex", aliases: ["openai codex", "openai/codex", "codex cli"] },
  { label: "Gemini CLI", aliases: ["gemini cli", "gemini-cli", "google-gemini/gemini-cli"] },
  { label: "OpenClaw", aliases: ["openclaw", "openclaw/openclaw"] },
  { label: "OpenAI", aliases: ["openai", "chatgpt", "gpt-"] },
  { label: "Anthropic", aliases: ["anthropic", "claude"] },
  { label: "Google Gemini", aliases: ["google gemini", "gemini"] },
  { label: "Model Context Protocol", aliases: ["model context protocol", " mcp ", "mcp server"] },
  { label: "Hugging Face", aliases: ["hugging face", "huggingface"] },
];

const TOPIC_ALIASES: Array<{ label: string; aliases: string[] }> = [
  { label: "Agent", aliases: ["agent", "agentic", "multi-agent", "智能体"] },
  { label: "MCP", aliases: ["model context protocol", "mcp"] },
  { label: "Coding", aliases: ["coding", "code", "developer", "编程", "代码"] },
  { label: "Model", aliases: ["model", "llm", "模型"] },
  { label: "RAG", aliases: ["rag", "retrieval", "vector", "知识库"] },
  { label: "Security", aliases: ["security", "vulnerability", "exploit", "安全", "漏洞"] },
  { label: "API", aliases: [" api ", "sdk", "endpoint"] },
  { label: "Benchmark", aliases: ["benchmark", "eval", "评测"] },
  { label: "Pricing", aliases: ["pricing", "price", "cost", "定价", "价格"] },
  { label: "Open Source", aliases: ["open source", "open-source", "开源"] },
];

function canonicalUrl(raw: string): string {
  try {
    const url = new URL(raw);
    url.hash = "";
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith("utm_") || key === "ref" || key === "source") url.searchParams.delete(key);
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return raw.trim().replace(/\/$/, "");
  }
}

function stableId(prefix: string, value: string): string {
  return `${prefix}-${createHash("sha1").update(value).digest("hex").slice(0, 12)}`;
}

function titleTokens(value: string): Set<string> {
  const normalized = ` ${value.toLowerCase().replace(/[_/]+/g, " ")} `;
  const tokens = new Set<string>();
  for (const token of normalized.match(/[a-z0-9][a-z0-9.+-]{2,}/g) ?? []) {
    if (!STOP_WORDS.has(token)) tokens.add(token);
  }
  for (const run of normalized.match(/[\p{Script=Han}]{2,}/gu) ?? []) {
    if (run.length <= 8) tokens.add(run);
    for (let index = 0; index < run.length - 1; index++) tokens.add(run.slice(index, index + 2));
  }
  return tokens;
}

function intersects(left: string[], right: string[]): boolean {
  const values = new Set(left);
  return right.some((value) => values.has(value));
}

function jaccard(left: Set<string>, right: Set<string>): { score: number; shared: number } {
  let shared = 0;
  for (const value of left) if (right.has(value)) shared++;
  const total = left.size + right.size - shared;
  return { score: total === 0 ? 0 : shared / total, shared };
}

function extractLabels(haystack: string, definitions: Array<{ label: string; aliases: string[] }>): string[] {
  const padded = ` ${haystack.toLowerCase()} `;
  return definitions
    .filter(({ aliases }) => aliases.some((alias) => padded.includes(alias)))
    .map(({ label }) => label);
}

function candidateFromInput(input: SignalEvidenceInput): Candidate {
  const url = canonicalUrl(input.url);
  const context = `${input.title} ${input.context ?? ""} ${input.repo ?? ""} ${(input.entityHints ?? []).join(" ")}`;
  const dynamicEntities = [...(input.entityHints ?? [])];
  const entities = [...new Set([...dynamicEntities, ...extractLabels(context, ENTITY_ALIASES)])];
  return {
    id: stableId("ev", `${input.source}|${url}|${input.title}`),
    source: input.source,
    sourceFamily: input.sourceFamily,
    sourceLabel: input.sourceLabel,
    title: input.title.trim(),
    url,
    publishedAt: input.publishedAt,
    authority: input.authority,
    metrics: input.metrics ?? {},
    ...(input.repo ? { repo: input.repo.toLowerCase() } : {}),
    entityHints: input.entityHints ?? [],
    context,
    tokens: titleTokens(input.title),
    entities,
    topics: extractLabels(context, TOPIC_ALIASES),
  };
}

function githubEngagement(item: GitHubItem): number {
  return item.comments + (item.reactions?.["+1"] ?? 0);
}

function topGitHubItems(items: GitHubItem[], limit: number): GitHubItem[] {
  return [...items].sort((left, right) => githubEngagement(right) - githubEngagement(left)).slice(0, limit);
}

function releaseUrl(repo: string, tag: string): string {
  const encodedTag = tag
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
  return `https://github.com/${repo}/releases/tag/${encodedTag}`;
}

function repoEvidence(activity: RepoActivity): SignalEvidenceInput[] {
  const entityHints = [activity.cfg.name];
  return [
    ...activity.releases.slice(0, 3).map((release) => ({
      source: "github_release" as const,
      sourceFamily: "github" as const,
      sourceLabel: `${activity.cfg.name} · Release`,
      title: release.name || release.tag_name,
      url: releaseUrl(activity.cfg.repo, release.tag_name),
      publishedAt: release.published_at,
      authority: "primary" as const,
      repo: activity.cfg.repo,
      entityHints,
      context: release.body ?? "",
    })),
    ...topGitHubItems(activity.issues, 3).map((item) => ({
      source: "github_issue" as const,
      sourceFamily: "github" as const,
      sourceLabel: `${activity.cfg.name} · Issue #${item.number}`,
      title: item.title,
      url: item.html_url,
      publishedAt: item.updated_at,
      authority: "primary" as const,
      metrics: { comments: item.comments, reactions: item.reactions?.["+1"] ?? 0 },
      repo: activity.cfg.repo,
      entityHints,
      context: item.body ?? "",
    })),
    ...topGitHubItems(activity.prs, 3).map((item) => ({
      source: "github_pr" as const,
      sourceFamily: "github" as const,
      sourceLabel: `${activity.cfg.name} · PR #${item.number}`,
      title: item.title,
      url: item.html_url,
      publishedAt: item.updated_at,
      authority: "primary" as const,
      metrics: { comments: item.comments, reactions: item.reactions?.["+1"] ?? 0 },
      repo: activity.cfg.repo,
      entityHints,
      context: item.body ?? "",
    })),
  ];
}

function collectEvidence(input: SignalBuildInput): SignalEvidenceInput[] {
  const evidence = input.repoActivities.flatMap(repoEvidence);

  if (input.skills) {
    evidence.push(
      ...repoEvidence({
        cfg: { id: "skills", repo: input.skills.repo, name: input.skills.name },
        issues: input.skills.issues,
        prs: input.skills.prs,
        releases: [],
      }),
    );
  }

  for (const result of input.webResults) {
    for (const item of result.newItems) {
      evidence.push({
        source: "official",
        sourceFamily: "official",
        sourceLabel: `${result.siteName} · ${item.category}`,
        title: item.title,
        url: item.url,
        publishedAt: item.lastmod,
        authority: "primary",
        entityHints: [result.site === "anthropic" ? "Anthropic" : "OpenAI"],
        context: item.content,
      });
    }
  }

  const seenTrending = new Set<string>();
  for (const repo of input.trendingData.trendingRepos) {
    const canonicalRepo = repo.fullName.toLowerCase();
    seenTrending.add(canonicalRepo);
    evidence.push({
      source: "github_trending",
      sourceFamily: "discovery",
      sourceLabel: "GitHub Trending",
      title: repo.fullName,
      url: repo.url,
      publishedAt: input.generatedAt ?? `${input.date}T00:00:00.000Z`,
      authority: "discovery",
      metrics: { totalStars: repo.totalStars, todayStars: repo.todayStars, forks: repo.forks },
      repo: repo.fullName,
      entityHints: [repo.fullName.split("/").at(-1) ?? repo.fullName],
      context: repo.description,
    });
  }

  for (const repo of input.trendingData.searchRepos) {
    if (seenTrending.has(repo.fullName.toLowerCase())) continue;
    evidence.push({
      source: "github_search",
      sourceFamily: "discovery",
      sourceLabel: `GitHub Search · ${repo.searchQuery}`,
      title: repo.fullName,
      url: repo.url,
      publishedAt: repo.pushedAt,
      authority: "discovery",
      metrics: { totalStars: repo.stargazersCount },
      repo: repo.fullName,
      entityHints: [repo.fullName.split("/").at(-1) ?? repo.fullName],
      context: repo.description ?? "",
    });
  }

  for (const story of input.hnData.stories) {
    let originalSource: Pick<SignalEvidenceInput, "source" | "sourceFamily" | "sourceLabel" | "authority"> = {
      source: "article",
      sourceFamily: "media",
      sourceLabel: "原始文章",
      authority: "community",
    };
    try {
      const hostname = new URL(story.url).hostname;
      if (hostname.endsWith("openai.com") || hostname.endsWith("anthropic.com")) {
        originalSource = {
          source: "official",
          sourceFamily: "official",
          sourceLabel: hostname.endsWith("openai.com") ? "OpenAI 官方" : "Anthropic 官方",
          authority: "primary",
        };
      }
    } catch {
      // Keep the generic article classification.
    }

    if (canonicalUrl(story.url) !== canonicalUrl(story.hnUrl)) {
      evidence.push({
        ...originalSource,
        title: story.title,
        url: story.url,
        publishedAt: story.createdAt,
      });
    }
    evidence.push({
      source: "hacker_news",
      sourceFamily: "community",
      sourceLabel: "Hacker News",
      title: story.title,
      url: story.hnUrl,
      publishedAt: story.createdAt,
      authority: "community",
      metrics: { points: story.points, comments: story.comments },
    });
  }

  return evidence;
}

function similarity(left: Candidate, right: Candidate): number {
  if (left.url === right.url) return 1;
  if (left.repo && right.repo && left.repo === right.repo) return 0.98;

  const titleSimilarity = jaccard(left.tokens, right.tokens);
  if (titleSimilarity.shared >= 2 && titleSimilarity.score >= 0.42) return 0.85;

  const sameEntity = intersects(left.entities, right.entities);
  const sameTopic = intersects(left.topics, right.topics);
  if (sameEntity && titleSimilarity.shared >= 1 && titleSimilarity.score >= 0.16) return 0.68;
  if (sameEntity && sameTopic && titleSimilarity.shared >= 1) return 0.58;
  return 0;
}

function sourceRank(source: SignalSource): number {
  switch (source) {
    case "github_release":
      return 100;
    case "official":
      return 95;
    case "hacker_news":
      return 80;
    case "article":
      return 78;
    case "github_trending":
      return 75;
    case "github_pr":
      return 70;
    case "github_issue":
      return 65;
    case "github_search":
      return 55;
    case "report":
      return 40;
  }
}

function authorityScore(evidence: Candidate[]): number {
  const values = evidence.map((item) => {
    if (item.authority === "primary") return 100;
    if (item.authority === "community") return 70;
    if (item.authority === "discovery") return 55;
    return 35;
  });
  return Math.max(...values, 0);
}

function engagementScore(evidence: Candidate[]): number {
  const total = evidence.reduce((sum, item) => {
    const metrics = item.metrics;
    return (
      sum +
      (metrics["points"] ?? 0) +
      (metrics["comments"] ?? 0) * 2 +
      (metrics["reactions"] ?? 0) * 2 +
      (metrics["todayStars"] ?? 0) * 0.5
    );
  }, 0);
  return Math.round(Math.min(100, Math.log10(total + 1) * 35));
}

function buildCard(date: string, evidence: Candidate[]): SignalCard {
  const ordered = [...evidence].sort((left, right) => sourceRank(right.source) - sourceRank(left.source));
  const primary = ordered[0]!;
  const families = [...new Set(ordered.map((item) => item.sourceFamily))].sort();
  const sourceLabels = [...new Set(ordered.map((item) => item.sourceLabel.split(" · ")[0]))];
  const entities = [...new Set(ordered.flatMap((item) => item.entities))].slice(0, 6);
  const topics = [...new Set(ordered.flatMap((item) => item.topics))].slice(0, 6);
  const sourceDiversity = Math.min(100, 25 + (families.length - 1) * 35);
  const authority = authorityScore(ordered);
  const engagement = engagementScore(ordered);
  const corroboration = Math.min(100, ordered.length * 25);
  const scoreBreakdown = { sourceDiversity, authority, engagement, corroboration };
  const score = Math.round(
    sourceDiversity * 0.35 + authority * 0.25 + engagement * 0.25 + corroboration * 0.15,
  );
  const crossSource = families.length >= 2;
  const summary =
    ordered.length > 1
      ? `同一主题出现 ${ordered.length} 条关联证据，覆盖 ${sourceLabels.join("、")}。核心动态：${primary.title}。`
      : `发现一条来自 ${primary.sourceLabel} 的新信号：${primary.title}。`;
  const whyItMatters = crossSource
    ? `该主题已跨越 ${families.length} 类来源相互印证，传播强度和可信度高于单一渠道动态。`
    : primary.authority === "primary"
      ? "当前来自一手来源，值得关注后续社区反馈和生态扩散。"
      : "当前仍是单一渠道信号，建议等待更多一手来源或社区证据确认。";
  const identity = ordered
    .map((item) => `${item.source}:${item.url}`)
    .sort()
    .join("|");

  return {
    id: stableId("sig", `${date}|${identity}`),
    date,
    title: primary.title,
    summary,
    whyItMatters,
    score,
    scoreBreakdown,
    crossSource,
    sourceCount: ordered.length,
    sourceFamilies: families,
    entities,
    topics,
    primaryUrl: primary.url,
    evidence: ordered.map(
      ({
        repo: _repo,
        entityHints: _entityHints,
        context: _context,
        tokens: _tokens,
        entities: _entities,
        topics: _topics,
        ...item
      }) => item,
    ),
  };
}

export function buildSignalBundleFromEvidence(
  date: string,
  inputs: SignalEvidenceInput[],
  generatedAt = new Date().toISOString(),
): SignalBundle {
  const unique = new Map<string, Candidate>();
  for (const input of inputs) {
    if (!input.title.trim() || !input.url.trim()) continue;
    const candidate = candidateFromInput(input);
    const key = `${candidate.source}|${candidate.url}|${candidate.title.toLowerCase()}`;
    if (!unique.has(key)) unique.set(key, candidate);
  }

  const clusters: Candidate[][] = [];
  const candidates = [...unique.values()].sort(
    (left, right) => sourceRank(right.source) - sourceRank(left.source),
  );
  for (const candidate of candidates) {
    let bestCluster: Candidate[] | undefined;
    let bestScore = 0;
    for (const cluster of clusters) {
      const clusterScore = Math.max(...cluster.map((member) => similarity(candidate, member)));
      if (clusterScore > bestScore) {
        bestScore = clusterScore;
        bestCluster = cluster;
      }
    }
    if (bestCluster && bestScore >= 0.58) bestCluster.push(candidate);
    else clusters.push([candidate]);
  }

  const cards = clusters
    .map((cluster) => buildCard(date, cluster))
    .sort((left, right) => {
      if (left.crossSource !== right.crossSource) return left.crossSource ? -1 : 1;
      if (left.score !== right.score) return right.score - left.score;
      return left.title.localeCompare(right.title);
    })
    .slice(0, 24);
  const sourceFamilies = new Set(candidates.map((item) => item.sourceFamily));

  return {
    version: 1,
    date,
    generatedAt,
    cards,
    stats: {
      evidenceCount: candidates.length,
      cardCount: cards.length,
      crossSourceCount: cards.filter((card) => card.crossSource).length,
      sourceFamilies: sourceFamilies.size,
    },
  };
}

export function buildSignalBundle(input: SignalBuildInput): SignalBundle {
  const generatedAt = input.generatedAt ?? new Date().toISOString();
  return buildSignalBundleFromEvidence(input.date, collectEvidence({ ...input, generatedAt }), generatedAt);
}
