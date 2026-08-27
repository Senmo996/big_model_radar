import assert from "node:assert/strict";
import test from "node:test";
import { buildSignalBundleFromEvidence, type SignalEvidenceInput } from "./signals.ts";

const date = "2026-08-27";

function evidence(overrides: Partial<SignalEvidenceInput>): SignalEvidenceInput {
  return {
    source: "official",
    sourceFamily: "official",
    sourceLabel: "OpenAI · product",
    title: "OpenAI launches a new Codex capability",
    url: "https://openai.com/index/codex-capability/",
    publishedAt: "2026-08-27T00:00:00Z",
    authority: "primary",
    ...overrides,
  };
}

test("clusters the same URL across official and community sources", () => {
  const bundle = buildSignalBundleFromEvidence(
    date,
    [
      evidence({}),
      evidence({
        source: "hacker_news",
        sourceFamily: "community",
        sourceLabel: "Hacker News",
        url: "https://openai.com/index/codex-capability/?utm_source=hn",
        authority: "community",
        metrics: { points: 220, comments: 80 },
      }),
    ],
    "2026-08-27T01:00:00Z",
  );

  assert.equal(bundle.cards.length, 1);
  assert.equal(bundle.cards[0]?.crossSource, true);
  assert.equal(bundle.cards[0]?.sourceCount, 2);
  assert.deepEqual(bundle.cards[0]?.sourceFamilies, ["community", "official"]);
  assert.ok((bundle.cards[0]?.score ?? 0) >= 60);
});

test("clusters repository activity with discovery evidence for the same repo", () => {
  const bundle = buildSignalBundleFromEvidence(date, [
    evidence({
      source: "github_release",
      sourceFamily: "github",
      sourceLabel: "OpenAI Codex · Release",
      title: "Codex CLI v2.0",
      url: "https://github.com/openai/codex/releases/tag/v2.0",
      repo: "openai/codex",
    }),
    evidence({
      source: "github_trending",
      sourceFamily: "discovery",
      sourceLabel: "GitHub Trending",
      title: "openai/codex",
      url: "https://github.com/openai/codex",
      authority: "discovery",
      repo: "openai/codex",
      metrics: { todayStars: 1200 },
    }),
  ]);

  assert.equal(bundle.cards.length, 1);
  assert.equal(bundle.cards[0]?.crossSource, true);
  assert.equal(bundle.cards[0]?.title, "Codex CLI v2.0");
});

test("keeps unrelated evidence in separate cards and produces stable IDs", () => {
  const inputs = [
    evidence({}),
    evidence({
      title: "Vector database performance benchmark",
      url: "https://example.com/vector-benchmark",
      source: "report",
      sourceFamily: "report",
      sourceLabel: "Historical report",
      authority: "derived",
    }),
  ];
  const first = buildSignalBundleFromEvidence(date, inputs, "2026-08-27T01:00:00Z");
  const second = buildSignalBundleFromEvidence(date, inputs, "2026-08-27T02:00:00Z");

  assert.equal(first.cards.length, 2);
  assert.deepEqual(first.cards.map((card) => card.id).sort(), second.cards.map((card) => card.id).sort());
});
