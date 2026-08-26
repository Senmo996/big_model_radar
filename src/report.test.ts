import assert from "node:assert/strict";
import test from "node:test";
import { EmptyLlmResponseError, extractTextContent } from "./report.ts";
import { hasMeaningfulReportBody } from "./report-content.ts";

test("extractTextContent trims plain text", () => {
  assert.equal(extractTextContent("  report body  "), "report body");
});

test("extractTextContent joins text response parts", () => {
  assert.equal(
    extractTextContent([
      { type: "text", text: "first " },
      { type: "text", text: "second" },
    ]),
    "first second",
  );
});

test("extractTextContent rejects empty successful responses", () => {
  assert.throws(() => extractTextContent("  \n "), EmptyLlmResponseError);
  assert.throws(() => extractTextContent(undefined), EmptyLlmResponseError);
  assert.throws(() => extractTextContent([]), EmptyLlmResponseError);
});

test("hasMeaningfulReportBody rejects generated reports with no body", () => {
  const report = `# Report\n\n> Metadata\n\n---\n\n\n---\n*Generated automatically.*`;
  assert.equal(hasMeaningfulReportBody(report), false);
});

test("hasMeaningfulReportBody accepts generated reports with a body", () => {
  const report = `# Report\n\n> Metadata\n\n---\n\n## Findings\n\nUseful content.\n\n---\n*Generated automatically.*`;
  assert.equal(hasMeaningfulReportBody(report), true);
});

test("hasMeaningfulReportBody preserves legacy reports", () => {
  assert.equal(hasMeaningfulReportBody("# Hand-written report\n\nUseful content."), true);
  assert.equal(hasMeaningfulReportBody("   \n"), false);
});
