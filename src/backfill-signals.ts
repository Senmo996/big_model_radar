import fs from "node:fs";
import path from "node:path";
import { buildSignalBundleFromEvidence, type SignalEvidenceInput } from "./signals.ts";

const DIGESTS_DIR = "digests";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const REPORT_RE = /^ai-(cli|agents|web|trending|hn)\.md$/;

function latestDigestDate(): string {
  const dates = fs
    .readdirSync(DIGESTS_DIR)
    .filter((name) => DATE_RE.test(name) && fs.statSync(path.join(DIGESTS_DIR, name)).isDirectory())
    .sort()
    .reverse();
  const latest = dates[0];
  if (!latest) throw new Error("No digest date directories found");
  return latest;
}

function labelFromUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);
    if (url.hostname === "github.com") {
      return url.pathname.split("/").filter(Boolean).slice(0, 2).join("/") || "GitHub";
    }
    const slug = url.pathname.split("/").filter(Boolean).at(-1)?.replace(/[-_]+/g, " ");
    return slug || url.hostname;
  } catch {
    return rawUrl;
  }
}

function sourceFor(
  report: string,
  rawUrl: string,
): Pick<SignalEvidenceInput, "source" | "sourceFamily" | "sourceLabel" | "authority"> {
  const hostname = (() => {
    try {
      return new URL(rawUrl).hostname;
    } catch {
      return "";
    }
  })();

  if (report === "ai-hn.md" && hostname === "news.ycombinator.com") {
    return {
      source: "hacker_news",
      sourceFamily: "community",
      sourceLabel: "Hacker News 讨论",
      authority: "community",
    };
  }
  if (report === "ai-hn.md" && (hostname.endsWith("anthropic.com") || hostname.endsWith("openai.com"))) {
    return {
      source: "official",
      sourceFamily: "official",
      sourceLabel: hostname.endsWith("anthropic.com") ? "Anthropic 官方" : "OpenAI 官方",
      authority: "primary",
    };
  }
  if (report === "ai-hn.md") {
    return {
      source: "article",
      sourceFamily: "media",
      sourceLabel: "原始文章",
      authority: "community",
    };
  }
  if (report === "ai-web.md" && (hostname.endsWith("anthropic.com") || hostname.endsWith("openai.com"))) {
    return {
      source: "official",
      sourceFamily: "official",
      sourceLabel: hostname.endsWith("anthropic.com") ? "Anthropic 官网" : "OpenAI 官网",
      authority: "primary",
    };
  }
  if (report === "ai-trending.md" && hostname === "github.com") {
    return {
      source: "github_trending",
      sourceFamily: "discovery",
      sourceLabel: "GitHub Trending 报告",
      authority: "discovery",
    };
  }
  if ((report === "ai-cli.md" || report === "ai-agents.md") && hostname === "github.com") {
    const path = new URL(rawUrl).pathname;
    const source = path.includes("/pull/")
      ? "github_pr"
      : path.includes("/issues/")
        ? "github_issue"
        : path.includes("/releases/")
          ? "github_release"
          : "report";
    return {
      source,
      sourceFamily: "github",
      sourceLabel: report === "ai-cli.md" ? "AI CLI GitHub 动态" : "Agent GitHub 动态",
      authority: source === "report" ? "derived" : "primary",
    };
  }
  return {
    source: "report",
    sourceFamily: "report",
    sourceLabel: `${report.replace(/\.md$/, "")} 历史报告`,
    authority: "derived",
  };
}

function reportEvidence(date: string, report: string, content: string): SignalEvidenceInput[] {
  const evidence: SignalEvidenceInput[] = [];
  const seen = new Set<string>();
  for (const line of content.split("\n")) {
    const links = [...line.matchAll(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/g)];
    const primaryTitle = links.find(
      (match) => !/^(hn|原文|source|数据来源)$/i.test(match[1]?.trim() ?? ""),
    )?.[1];
    for (const match of links) {
      const rawTitle = match[1]?.trim() ?? "";
      const url = match[2]?.trim() ?? "";
      if (!url || /senmo996\/big_model_radar|t\.me\/agents_radar/i.test(url)) continue;
      const title = /^(hn|原文|source|数据来源|github)$/i.test(rawTitle)
        ? primaryTitle || labelFromUrl(url)
        : rawTitle;
      if (title.length < 3) continue;
      if (/^(anthropic\.com|openai\.com|release 页面|hacker news)$/i.test(title)) continue;
      if (/^(#?\d+|pr\s*#?\d+|issue\s*#?\d+|查看\s*(pr|issue))$/i.test(title)) continue;
      try {
        const parsed = new URL(url);
        if (
          (parsed.hostname.endsWith("anthropic.com") || parsed.hostname.endsWith("openai.com")) &&
          parsed.pathname === "/"
        ) {
          continue;
        }
      } catch {
        continue;
      }
      const key = `${report}|${url}|${title.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      evidence.push({
        ...sourceFor(report, url),
        title,
        url,
        publishedAt: `${date}T00:00:00.000Z`,
        context: line,
        ...(url.includes("github.com/") ? { repo: labelFromUrl(url) } : {}),
      });
    }
  }
  return evidence;
}

const date = process.argv[2] || latestDigestDate();
if (!DATE_RE.test(date)) throw new Error(`Invalid date: ${date}`);
const directory = path.join(DIGESTS_DIR, date);
if (!fs.existsSync(directory)) throw new Error(`Digest directory not found: ${directory}`);

const evidence = fs
  .readdirSync(directory)
  .filter((name) => REPORT_RE.test(name))
  .flatMap((report) => reportEvidence(date, report, fs.readFileSync(path.join(directory, report), "utf-8")));
const bundle = buildSignalBundleFromEvidence(date, evidence);
const output = path.join(directory, "signals.json");
fs.writeFileSync(output, `${JSON.stringify(bundle, null, 2)}\n`);
console.log(
  `${output}: ${bundle.stats.cardCount} cards, ${bundle.stats.crossSourceCount} cross-source, ` +
    `${bundle.stats.evidenceCount} evidence items`,
);
