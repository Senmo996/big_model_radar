import assert from "node:assert/strict";
import test from "node:test";
import { isIssuePublishingEnabled } from "./github.ts";

test("issue publishing remains enabled when the flag is unset", () => {
  assert.equal(isIssuePublishingEnabled(undefined), true);
  assert.equal(isIssuePublishingEnabled(""), true);
});

test("issue publishing recognizes common disabled values", () => {
  for (const value of ["false", "FALSE", "0", "no", "off"]) {
    assert.equal(isIssuePublishingEnabled(value), false, value);
  }
});

test("issue publishing accepts enabled values", () => {
  for (const value of ["true", "1", "yes", "on"]) {
    assert.equal(isIssuePublishingEnabled(value), true, value);
  }
});
