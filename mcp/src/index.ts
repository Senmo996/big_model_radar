/**
 * Big Model Radar MCP Server — Cloudflare Worker
 *
 * Exposes Big Model Radar digest data as MCP tools so any MCP-compatible
 * client (Claude Desktop, OpenClaw, etc.) can query the latest AI ecosystem reports.
 *
 * Tools:
 *   list_reports  — list available dates and report types
 *   get_report    — fetch a specific report by date and type
 *   get_latest    — fetch the most recent report of a given type
 *   search        — keyword search across recent reports
 */

const DEFAULT_PAGES_URL = "https://senmo996.github.io/big_model_radar";
const MODERN_PROTOCOL_VERSION = "2026-07-28";
const LEGACY_PROTOCOL_VERSION = "2024-11-05";

interface Env {
  PAGES_URL?: string;
}

function resolvePagesUrl(env: Env): string {
  return (env.PAGES_URL || DEFAULT_PAGES_URL).replace(/\/$/, "");
}

const REPORT_LABELS: Record<string, string> = {
  "ai-cli": "AI CLI Tools Digest (ZH)",
  "ai-cli-en": "AI CLI Tools Digest (EN)",
  "ai-agents": "AI Agents Ecosystem (ZH)",
  "ai-agents-en": "AI Agents Ecosystem (EN)",
  "ai-web": "Official AI Content (ZH)",
  "ai-web-en": "Official AI Content (EN)",
  "ai-trending": "GitHub AI Trends (ZH)",
  "ai-trending-en": "GitHub AI Trends (EN)",
  "ai-hn": "Hacker News AI Community (ZH)",
  "ai-hn-en": "Hacker News AI Community (EN)",
  "ai-weekly": "Weekly Rollup (ZH)",
  "ai-weekly-en": "Weekly Rollup (EN)",
  "ai-monthly": "Monthly Rollup (ZH)",
  "ai-monthly-en": "Monthly Rollup (EN)",
};

interface ManifestDate {
  date: string;
  reports: string[];
  signals?: boolean;
}

interface Manifest {
  dates: ManifestDate[];
}

interface SearchDocument {
  date: string;
  report: string;
  text: string;
}

interface SearchIndex {
  documents: SearchDocument[];
}

interface SignalEvidence {
  sourceLabel: string;
  title: string;
  url: string;
}

interface SignalCard {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  score: number;
  crossSource: boolean;
  sourceCount: number;
  entities: string[];
  topics: string[];
  evidence: SignalEvidence[];
}

interface SignalBundle {
  date: string;
  generatedAt: string;
  cards: SignalCard[];
}

interface ToolOutput {
  text: string;
  structuredContent?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Data fetchers
// ---------------------------------------------------------------------------

async function fetchManifest(pagesUrl: string): Promise<Manifest> {
  const res = await fetch(`${pagesUrl}/manifest.json`, {
    cf: { cacheTtl: 300 }, // cache 5 min in Cloudflare edge
  } as RequestInit);
  if (!res.ok) throw new Error(`Failed to fetch manifest: HTTP ${res.status}`);
  return res.json() as Promise<Manifest>;
}

async function fetchReport(pagesUrl: string, date: string, type: string): Promise<string> {
  const res = await fetch(`${pagesUrl}/digests/${date}/${type}.md`, {
    cf: { cacheTtl: 3600 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Report not found: ${date}/${type} (HTTP ${res.status})`);
  return res.text();
}

async function fetchSearchIndex(pagesUrl: string): Promise<SearchIndex> {
  const res = await fetch(`${pagesUrl}/search-index.json`, {
    cf: { cacheTtl: 300 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Failed to fetch search index: HTTP ${res.status}`);
  return res.json() as Promise<SearchIndex>;
}

async function fetchSignals(pagesUrl: string, date: string): Promise<SignalBundle> {
  const res = await fetch(`${pagesUrl}/digests/${date}/signals.json`, {
    cf: { cacheTtl: 3600 },
  } as RequestInit);
  if (!res.ok) throw new Error(`Signal cards not found for ${date} (HTTP ${res.status})`);
  return res.json() as Promise<SignalBundle>;
}

// ---------------------------------------------------------------------------
// Tool handlers
// ---------------------------------------------------------------------------

async function toolListReports(pagesUrl: string, args: Record<string, unknown>): Promise<ToolOutput> {
  const days = Math.max(1, Math.min(Number(args["days"] ?? 7) || 7, 30));
  const { dates } = await fetchManifest(pagesUrl);
  const slice = dates.slice(0, days);

  const lines = slice.map(({ date, reports, signals }) => {
    const labels = [
      ...(signals ? ["signals (Cross-source intelligence cards)"] : []),
      ...reports.map((r) => `${r} (${REPORT_LABELS[r] ?? r})`),
    ].join(", ");
    return `• ${date}: ${labels}`;
  });

  return {
    text: `Available reports — last ${slice.length} day(s):\n\n${lines.join("\n")}`,
    structuredContent: { dates: slice },
  };
}

async function toolGetReport(pagesUrl: string, args: Record<string, unknown>): Promise<ToolOutput> {
  const date = String(args["date"] ?? "").trim();
  const type = String(args["type"] ?? "").trim();
  if (!date || !type) throw new Error("Both 'date' and 'type' are required");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("'date' must be in YYYY-MM-DD format");
  if (!(type in REPORT_LABELS)) throw new Error(`Unknown report type: ${type}`);
  const content = await fetchReport(pagesUrl, date, type);
  return { text: content, structuredContent: { date, type, content } };
}

async function toolGetLatest(pagesUrl: string, args: Record<string, unknown>): Promise<ToolOutput> {
  const type = String(args["type"] ?? "ai-cli-en").trim();
  if (!(type in REPORT_LABELS)) throw new Error(`Unknown report type: ${type}`);
  const { dates } = await fetchManifest(pagesUrl);
  for (const { date, reports } of dates) {
    if (reports.includes(type)) {
      const content = await fetchReport(pagesUrl, date, type);
      return {
        text: `# ${date} — ${REPORT_LABELS[type] ?? type}\n\n${content}`,
        structuredContent: { date, type, content },
      };
    }
  }
  throw new Error(`No report found for type: ${type}`);
}

async function toolSearch(pagesUrl: string, args: Record<string, unknown>): Promise<ToolOutput> {
  const query = String(args["query"] ?? "")
    .trim()
    .toLowerCase();
  if (!query) throw new Error("'query' is required");
  const days = Math.max(1, Math.min(Number(args["days"] ?? 7) || 7, 90));

  const [{ dates }, { documents }] = await Promise.all([fetchManifest(pagesUrl), fetchSearchIndex(pagesUrl)]);
  const slice = dates.slice(0, days);
  const allowedDates = new Set(slice.map((entry) => entry.date));
  const matches = documents.filter(
    (document) => allowedDates.has(document.date) && document.text.includes(query),
  );

  const results: string[] = [];

  await Promise.all(
    matches.slice(0, 30).map(async ({ date, report }) => {
      try {
        if (report === "signals") {
          const bundle = await fetchSignals(pagesUrl, date);
          const cards = bundle.cards
            .filter((card) => JSON.stringify(card).toLowerCase().includes(query))
            .slice(0, 3);
          if (cards.length > 0) {
            results.push(`📡 ${date} / signals:\n${cards.map((card) => `  > ${card.title}`).join("\n")}`);
          }
          return;
        }

        const content = await fetchReport(pagesUrl, date, report);
        const excerpts = content
          .split("\n")
          .filter((line) => line.toLowerCase().includes(query))
          .slice(0, 3)
          .map((line) => `  > ${line.trim()}`)
          .join("\n");
        results.push(`📄 ${date} / ${report}:\n${excerpts}`);
      } catch {
        // A stale index entry is non-fatal.
      }
    }),
  );

  if (results.length === 0) {
    return {
      text: `No matches for "${query}" in the last ${days} day(s).`,
      structuredContent: { query, days, matches: [] },
    };
  }
  return {
    text: `Found "${query}" in ${results.length} document(s):\n\n${results.join("\n\n")}`,
    structuredContent: {
      query,
      days,
      matches: matches.slice(0, 30).map(({ date, report }) => ({ date, report })),
    },
  };
}

async function toolGetSignals(pagesUrl: string, args: Record<string, unknown>): Promise<ToolOutput> {
  const requestedDate = String(args["date"] ?? "").trim();
  const minScore = Math.max(0, Math.min(Number(args["min_score"] ?? 0), 100));
  const crossSourceOnly = Boolean(args["cross_source_only"] ?? false);
  const { dates } = await fetchManifest(pagesUrl);
  const date = requestedDate || dates.find((entry) => entry.signals)?.date || "";
  if (!date) throw new Error("No signal cards are currently available");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("'date' must be in YYYY-MM-DD format");

  const bundle = await fetchSignals(pagesUrl, date);
  const cards = bundle.cards.filter(
    (card) => card.score >= minScore && (!crossSourceOnly || card.crossSource),
  );
  const text = cards
    .map(
      (card) =>
        `## ${card.title} — ${card.score}/100\n${card.summary}\n${card.whyItMatters}\n` +
        card.evidence
          .map((evidence) => `- [${evidence.sourceLabel}] ${evidence.title}: ${evidence.url}`)
          .join("\n"),
    )
    .join("\n\n");

  return {
    text: text || `No signal cards matched the requested filters for ${date}.`,
    structuredContent: { ...bundle, cards },
  };
}

// ---------------------------------------------------------------------------
// MCP JSON-RPC protocol
// ---------------------------------------------------------------------------

const TOOLS = [
  {
    name: "list_reports",
    description:
      "List available digest dates and report types from Big Model Radar. Returns the last N days of available reports.",
    inputSchema: {
      type: "object",
      properties: {
        days: { type: "number", description: "Number of recent days to list (default: 7, max: 30)" },
      },
    },
  },
  {
    name: "get_report",
    description: "Fetch the full content of a specific Big Model Radar digest report.",
    inputSchema: {
      type: "object",
      properties: {
        date: { type: "string", description: "Date in YYYY-MM-DD format" },
        type: {
          type: "string",
          description:
            "Report type: ai-cli-en, ai-agents-en, ai-web-en, ai-trending-en, ai-hn-en, ai-weekly-en, ai-monthly-en (drop -en suffix for Chinese versions)",
        },
      },
      required: ["date", "type"],
    },
  },
  {
    name: "get_latest",
    description: "Fetch the most recent available report of a given type.",
    inputSchema: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description: "Report type (default: ai-cli-en). Use list_reports to see all available types.",
        },
      },
    },
  },
  {
    name: "search",
    description: "Search for a keyword or phrase across recent Big Model Radar digest reports.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Keyword or phrase to search for" },
        days: { type: "number", description: "Number of recent days to search (default: 7, max: 90)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_signals",
    description:
      "Get ranked cross-source intelligence cards with evidence from GitHub, official sites, Trending, and Hacker News.",
    inputSchema: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "Optional date in YYYY-MM-DD format; defaults to latest available",
        },
        min_score: { type: "number", description: "Minimum signal score from 0 to 100" },
        cross_source_only: {
          type: "boolean",
          description: "Only return cards corroborated across source families",
        },
      },
    },
    outputSchema: {
      type: "object",
      properties: {
        date: { type: "string" },
        generatedAt: { type: "string" },
        cards: { type: "array", items: { type: "object" } },
      },
      required: ["date", "generatedAt", "cards"],
    },
  },
];

interface JsonRpcRequest {
  jsonrpc: string;
  id: unknown;
  method: string;
  params?: unknown;
}

const SERVER_INFO = { name: "big-model-radar", version: "1.1.0" };

function modernResultMeta(): Record<string, unknown> {
  return { "io.modelcontextprotocol/serverInfo": SERVER_INFO };
}

async function handleMcp(body: unknown, pagesUrl: string): Promise<unknown> {
  const req = body as JsonRpcRequest;
  const id = req.id ?? null;

  try {
    switch (req.method) {
      case "server/discover":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            resultType: "complete",
            supportedVersions: [MODERN_PROTOCOL_VERSION],
            capabilities: { tools: {} },
            instructions:
              "Query current Big Model Radar reports and ranked cross-source intelligence cards. Prefer get_signals for evidence-backed developments.",
            ttlMs: 3600000,
            cacheScope: "public",
            _meta: modernResultMeta(),
          },
        };

      case "initialize":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: LEGACY_PROTOCOL_VERSION,
            capabilities: { tools: {} },
            serverInfo: SERVER_INFO,
          },
        };

      case "notifications/initialized":
        return { jsonrpc: "2.0", id, result: {} };

      case "tools/list":
        return {
          jsonrpc: "2.0",
          id,
          result: {
            resultType: "complete",
            tools: TOOLS,
            ttlMs: 3600000,
            cacheScope: "public",
            _meta: modernResultMeta(),
          },
        };

      case "tools/call": {
        const { name, arguments: args = {} } = req.params as {
          name: string;
          arguments?: Record<string, unknown>;
        };
        let output: ToolOutput;
        switch (name) {
          case "list_reports":
            output = await toolListReports(pagesUrl, args);
            break;
          case "get_report":
            output = await toolGetReport(pagesUrl, args);
            break;
          case "get_latest":
            output = await toolGetLatest(pagesUrl, args);
            break;
          case "search":
            output = await toolSearch(pagesUrl, args);
            break;
          case "get_signals":
            output = await toolGetSignals(pagesUrl, args);
            break;
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
        return {
          jsonrpc: "2.0",
          id,
          result: {
            resultType: "complete",
            content: [{ type: "text", text: output.text }],
            ...(output.structuredContent ? { structuredContent: output.structuredContent } : {}),
            _meta: modernResultMeta(),
          },
        };
      }

      default:
        return { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${req.method}` } };
    }
  } catch (e) {
    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32603, message: e instanceof Error ? e.message : String(e) },
    };
  }
}

// ---------------------------------------------------------------------------
// Worker entry point
// ---------------------------------------------------------------------------

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, Mcp-Method, Mcp-Name",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    const url = new URL(request.url);
    const pagesUrl = resolvePagesUrl(env);

    // Health check
    if (request.method === "GET" && url.pathname === "/") {
      return Response.json(
        { name: "big-model-radar-mcp", status: "ok", pagesUrl, tools: TOOLS.map((t) => t.name) },
        { headers: CORS },
      );
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405, headers: CORS });
    }

    try {
      const body = await request.json();
      const result = await handleMcp(body, pagesUrl);
      const protocolVersion = request.headers.get("MCP-Protocol-Version");
      const headers = {
        ...CORS,
        ...(protocolVersion === MODERN_PROTOCOL_VERSION
          ? { "MCP-Protocol-Version": MODERN_PROTOCOL_VERSION }
          : {}),
      };
      return Response.json(result, { headers });
    } catch {
      return Response.json(
        { jsonrpc: "2.0", error: { code: -32700, message: "Parse error" } },
        { status: 400, headers: CORS },
      );
    }
  },
};
