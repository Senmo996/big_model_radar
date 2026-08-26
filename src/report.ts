/**
 * LLM invocation and file output helpers.
 * Supports OpenAI-compatible chat/completions endpoints.
 */

import fs from "node:fs";
import path from "node:path";

const DEFAULT_OPENAI_BASE_URL = "https://api.openai.com/v1";
const DEFAULT_MODEL = "gpt-4.1-mini";

// ---------------------------------------------------------------------------
// Concurrency limiter — prevents rate-limit (429) errors when many LLM calls
// are fired in parallel. At most LLM_CONCURRENCY requests are in-flight at
// any given time; the rest queue and run as slots free up.
// ---------------------------------------------------------------------------

const LLM_CONCURRENCY = 5;
let llmSlots = LLM_CONCURRENCY;
const llmQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
  if (llmSlots > 0) {
    llmSlots--;
    return Promise.resolve();
  }
  return new Promise((resolve) => llmQueue.push(resolve));
}

function releaseSlot(): void {
  const next = llmQueue.shift();
  if (next) {
    next();
  } else {
    llmSlots++;
  }
}

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 5_000; // 5 s, 10 s, 20 s
const EMPTY_RETRY_BASE_MS = 1_000; // 1 s, 2 s, 4 s

export class EmptyLlmResponseError extends Error {
  constructor(message = "LLM returned empty content") {
    super(message);
    this.name = "EmptyLlmResponseError";
  }
}

function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function getLlmApiKey(): string {
  return process.env["OPENAI_API_KEY"] ?? process.env["ANTHROPIC_API_KEY"] ?? "";
}

export function getLlmBaseUrl(): string {
  return (
    process.env["OPENAI_BASE_URL"] ??
    process.env["ANTHROPIC_BASE_URL"] ??
    DEFAULT_OPENAI_BASE_URL
  ).replace(/\/$/, "");
}

function getLlmModel(): string {
  return process.env["OPENAI_MODEL"] ?? process.env["ANTHROPIC_MODEL"] ?? DEFAULT_MODEL;
}

export function hasLlmCredentials(): boolean {
  return getLlmApiKey().length > 0;
}

export function extractTextContent(content: unknown): string {
  let text = "";

  if (typeof content === "string") {
    text = content.trim();
  }
  if (Array.isArray(content)) {
    text = content
      .map((part) => {
        if (typeof part === "string") return part;
        if (
          part &&
          typeof part === "object" &&
          "type" in part &&
          part.type === "text" &&
          "text" in part &&
          typeof part.text === "string"
        ) {
          return part.text;
        }
        return "";
      })
      .join("")
      .trim();
  }

  if (!text) throw new EmptyLlmResponseError();
  return text;
}

function formatEmptyResponseDiagnostics(
  data: {
    model?: string;
    choices?: Array<{
      finish_reason?: string | null;
      message?: { reasoning_content?: unknown };
    }>;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
      completion_tokens_details?: { reasoning_tokens?: number };
    };
  },
  requestedModel: string,
): string {
  const choice = data.choices?.[0];
  const usage = data.usage;
  const reasoningContent = choice?.message?.reasoning_content;
  const hasReasoningContent =
    (typeof reasoningContent === "string" && reasoningContent.trim().length > 0) ||
    (Array.isArray(reasoningContent) && reasoningContent.length > 0);

  return [
    `model=${data.model ?? requestedModel}`,
    `finish_reason=${choice?.finish_reason ?? "missing"}`,
    `prompt_tokens=${usage?.prompt_tokens ?? "unknown"}`,
    `completion_tokens=${usage?.completion_tokens ?? "unknown"}`,
    `reasoning_tokens=${usage?.completion_tokens_details?.reasoning_tokens ?? "unknown"}`,
    `total_tokens=${usage?.total_tokens ?? "unknown"}`,
    `reasoning_content=${hasReasoningContent ? "present" : "absent"}`,
  ].join(", ");
}

export async function callLlm(prompt: string, maxTokens = 4096): Promise<string> {
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      const apiKey = getLlmApiKey();
      if (!apiKey) throw new Error("Missing required environment variable: OPENAI_API_KEY");

      const resp = await fetch(`${getLlmBaseUrl()}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: getLlmModel(),
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: maxTokens,
        }),
      });
      if (!resp.ok) {
        throw new Error(`LLM API ${resp.status}: ${await resp.text()}`);
      }

      const data = (await resp.json()) as {
        model?: string;
        choices?: Array<{
          finish_reason?: string | null;
          message?: {
            content?: unknown;
            reasoning_content?: unknown;
          };
        }>;
        usage?: {
          prompt_tokens?: number;
          completion_tokens?: number;
          total_tokens?: number;
          completion_tokens_details?: { reasoning_tokens?: number };
        };
      };
      const content = data.choices?.[0]?.message?.content;
      try {
        return extractTextContent(content);
      } catch (err) {
        if (err instanceof EmptyLlmResponseError) {
          throw new EmptyLlmResponseError(
            `LLM returned empty content (${formatEmptyResponseDiagnostics(data, getLlmModel())})`,
          );
        }
        throw err;
      }
    } catch (err) {
      const retry429 = is429(err);
      const retryEmpty = err instanceof EmptyLlmResponseError;
      if (attempt < MAX_RETRIES && (retry429 || retryEmpty)) {
        releaseSlot();
        released = true;
        const wait = (retry429 ? RETRY_BASE_MS : EMPTY_RETRY_BASE_MS) * 2 ** attempt;
        const reason = retry429 ? "429" : err instanceof Error ? err.message : String(err);
        console.error(`[llm] ${reason} — retry ${attempt + 1}/${MAX_RETRIES} in ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }
      throw err;
    } finally {
      if (!released) releaseSlot();
    }
  }
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

export function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

export function autoGenFooter(lang: "zh" | "en" = "zh"): string {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return "";
  return lang === "en"
    ? `\n\n---\n*This digest is auto-generated by [Big Model Radar](https://github.com/${digestRepo}).*`
    : `\n\n---\n*本日报由 [Big Model Radar](https://github.com/${digestRepo}) 自动生成。*`;
}
