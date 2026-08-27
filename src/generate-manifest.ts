import fs from "fs";
import path from "path";
import { hasMeaningfulReportBody } from "./report-content.ts";

const DIGESTS_DIR = "digests";
const MANIFEST_PATH = "manifest.json";
const FEED_PATH = "feed.xml";
const SEARCH_INDEX_PATH = "search-index.json";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REPORT_FILES = [
  "ai-cli",
  "ai-cli-en",
  "ai-agents",
  "ai-agents-en",
  "ai-web",
  "ai-web-en",
  "ai-trending",
  "ai-trending-en",
  "ai-hn",
  "ai-hn-en",
  "ai-weekly",
  "ai-weekly-en",
  "ai-monthly",
  "ai-monthly-en",
] as const;
const MAX_FEED_ITEMS = 30;

const REPORT_LABELS: Record<string, string> = {
  signals: "跨源情报信号",
  "ai-cli": "AI CLI 工具社区动态日报",
  "ai-cli-en": "AI CLI Tools Digest",
  "ai-agents": "AI Agents 生态日报",
  "ai-agents-en": "AI Agents Ecosystem Digest",
  "ai-web": "AI 官方内容追踪报告",
  "ai-web-en": "Official AI Content Report",
  "ai-trending": "AI 开源趋势日报",
  "ai-trending-en": "AI Open Source Trends",
  "ai-hn": "Hacker News AI 社区动态日报",
  "ai-hn-en": "Hacker News AI Community Digest",
  "ai-weekly": "AI 工具生态周报",
  "ai-weekly-en": "AI Tools Weekly Digest",
  "ai-monthly": "AI 工具生态月报",
  "ai-monthly-en": "AI Tools Monthly Digest",
};

interface DateEntry {
  date: string;
  reports: string[];
  signals?: true;
}

interface Manifest {
  generated: string;
  dates: DateEntry[];
}

interface SearchDocument {
  date: string;
  report: string;
  text: string;
}

interface SearchIndex {
  generated: string;
  documents: SearchDocument[];
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function resolveSiteUrl(): string {
  const explicit = process.env["PAGES_URL"] ?? process.env["SITE_URL"];
  if (explicit) return explicit.replace(/\/$/, "");

  const repo = process.env["DIGEST_REPO"] ?? process.env["GITHUB_REPOSITORY"];
  if (repo) {
    const [owner, name] = repo.split("/");
    if (owner && name) return `https://${owner}.github.io/${name}`;
  }

  throw new Error("Missing site URL. Set PAGES_URL, SITE_URL, DIGEST_REPO, or GITHUB_REPOSITORY.");
}

function toRfc822(date: Date): string {
  return (
    `${DAYS[date.getUTCDay()]}, ${String(date.getUTCDate()).padStart(2, "0")} ` +
    `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()} ` +
    `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}:${String(date.getUTCSeconds()).padStart(2, "0")} +0000`
  );
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const SITE_URL = resolveSiteUrl();

function isPublishableReport(filepath: string): boolean {
  if (!fs.existsSync(filepath)) return false;

  const content = fs.readFileSync(filepath, "utf-8");
  if (hasMeaningfulReportBody(content)) return true;

  console.warn(`Skipping empty report: ${filepath}`);
  return false;
}

function hasSignalCards(filepath: string): boolean {
  if (!fs.existsSync(filepath)) return false;

  try {
    const data = JSON.parse(fs.readFileSync(filepath, "utf-8")) as { cards?: unknown[] };
    return Array.isArray(data.cards) && data.cards.length > 0;
  } catch {
    console.warn(`Skipping invalid signal bundle: ${filepath}`);
    return false;
  }
}

function markdownToSearchText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[>#*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const entries = fs
  .readdirSync(DIGESTS_DIR)
  .filter((name) => DATE_RE.test(name) && fs.statSync(path.join(DIGESTS_DIR, name)).isDirectory())
  .sort()
  .reverse()
  .map((date) => {
    const reports = REPORT_FILES.filter((r) => isPublishableReport(path.join(DIGESTS_DIR, date, `${r}.md`)));
    const signals = hasSignalCards(path.join(DIGESTS_DIR, date, "signals.json"));
    return { date, reports, ...(signals ? { signals: true as const } : {}) };
  })
  .filter((e) => e.reports.length > 0 || e.signals);

const manifest: Manifest = {
  generated: new Date().toISOString(),
  dates: entries,
};

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest.json updated: ${entries.length} dates`);

// ── Search index ─────────────────────────────────────────────────────────────
// Build once in CI so the browser and MCP server do not fetch every historical
// Markdown file merely to discover which reports may match a query.
const searchDocuments: SearchDocument[] = [];
for (const entry of entries) {
  for (const report of entry.reports) {
    const filepath = path.join(DIGESTS_DIR, entry.date, `${report}.md`);
    searchDocuments.push({
      date: entry.date,
      report,
      text: markdownToSearchText(fs.readFileSync(filepath, "utf-8")),
    });
  }

  if (entry.signals) {
    const filepath = path.join(DIGESTS_DIR, entry.date, "signals.json");
    const data = JSON.parse(fs.readFileSync(filepath, "utf-8")) as {
      cards?: Array<{
        title?: string;
        summary?: string;
        whyItMatters?: string;
        entities?: string[];
        topics?: string[];
        evidence?: Array<{ title?: string; sourceLabel?: string }>;
      }>;
    };
    const signalText = (data.cards ?? [])
      .flatMap((card) => [
        card.title,
        card.summary,
        card.whyItMatters,
        ...(card.entities ?? []),
        ...(card.topics ?? []),
        ...(card.evidence ?? []).flatMap((evidence) => [evidence.title, evidence.sourceLabel]),
      ])
      .filter((value): value is string => Boolean(value))
      .join(" ")
      .toLowerCase();
    searchDocuments.push({ date: entry.date, report: "signals", text: signalText });
  }
}

const searchIndex: SearchIndex = {
  generated: manifest.generated,
  documents: searchDocuments,
};
fs.writeFileSync(SEARCH_INDEX_PATH, JSON.stringify(searchIndex) + "\n");
console.log(`search-index.json updated: ${searchDocuments.length} documents`);

// ── RSS Feed ──────────────────────────────────────────────────────────────────

const feedItems: Array<{ date: string; report: string }> = [];
outer: for (const entry of entries) {
  if (entry.signals) {
    feedItems.push({ date: entry.date, report: "signals" });
    if (feedItems.length >= MAX_FEED_ITEMS) break;
  }
  for (const report of entry.reports) {
    feedItems.push({ date: entry.date, report });
    if (feedItems.length >= MAX_FEED_ITEMS) break outer;
  }
}

const buildDate = toRfc822(new Date());

const itemsXml = feedItems
  .map(({ date, report }) => {
    const label = REPORT_LABELS[report] ?? report;
    const title = `${label} ${date}`;
    const link = `${SITE_URL}/#${date}/${report}`;
    const parts = date.split("-").map(Number);
    const pubDate = toRfc822(new Date(Date.UTC(parts[0]!, parts[1]! - 1, parts[2]!)));
    return [
      "    <item>",
      `      <title>${escapeXml(title)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `      <pubDate>${pubDate}</pubDate>`,
      `      <description>${escapeXml(title)}</description>`,
      "    </item>",
    ].join("\n");
  })
  .join("\n");

const feedXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
  `  <channel>\n` +
  `    <title>Big Model Radar</title>\n` +
  `    <link>${SITE_URL}</link>\n` +
  `    <description>AI 开源生态每日简报 · Daily AI ecosystem digest</description>\n` +
  `    <language>zh-CN</language>\n` +
  `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>\n` +
  `    <lastBuildDate>${buildDate}</lastBuildDate>\n` +
  itemsXml +
  `\n  </channel>\n` +
  `</rss>\n`;

fs.writeFileSync(FEED_PATH, feedXml);
console.log(`feed.xml updated: ${feedItems.length} items`);
