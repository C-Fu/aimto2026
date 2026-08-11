# Testing Patterns

**Analysis Date:** 2026-08-11

> **State of the codebase:** No tests, test config, or source code exist yet. The repository contains only `IDEA.md` (planned: static HTML/CSS/JS site on GitHub Pages, ntfy.sh push notifications, no backend). All framework sections below are **Not detected**. Prescriptive recommendations for the planned stack follow so a test setup is established when the first code lands.

## Test Framework

**Runner:**
- Not detected — no `package.json`, `jest.config.*`, `vitest.config.*`, or test files present.
- Prescriptive: For a vanilla JS static site, use **Vitest** (fast, zero-config for plain JS, no Node runtime mocking ceremony). Add `package.json` with:
  ```json
  {
    "name": "family-alert-system",
    "scripts": {
      "test": "vitest run",
      "test:watch": "vitest",
      "test:coverage": "vitest run --coverage"
    }
  }
  ```

**Assertion Library:**
- Not detected.
- Prescriptive: Vitest's built-in `expect` (Jest-compatible API: `expect().toBe()`, `toHaveBeenCalledWith()`).

**Run Commands:**
```bash
npm test                  # Run all tests (single pass)
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

## Test File Organization

**Location:**
- Not detected (no test files).
- Prescriptive: Co-locate test files next to source files (e.g., `ntfy-client.test.js` beside `ntfy-client.js`) — matches the flat structure of a static site without a bundler.

**Naming:**
- Prescriptive: `*.test.js` suffix (e.g., `app.test.js`, `ntfy-client.test.js`).

**Structure:**
```
/
├── app.js
├── app.test.js
├── ntfy-client.js
├── ntfy-client.test.js
└── config.js
```

## Test Structure

**Suite Organization:**
- Not detected.
- Prescriptive: Use `describe` blocks per function/feature and `it` (or `test`) with behavior-focused descriptions:
  ```js
  import { describe, it, expect, vi } from "vitest";
  import { sendAlert } from "./ntfy-client.js";

  describe("sendAlert", () => {
    it("POSTs the message to the ntfy topic", async () => { ... });

    it("returns false and surfaces an error when the request fails", async () => { ... });
  });
  ```

**Patterns:**
- Setup: no shared setup needed yet; use `beforeEach` only when mocking global state (`global.fetch`, `Notification`).
- Teardown: `vi.restoreAllMocks()` in `afterEach` when mocks are installed.
- Assertion: assert on observable behavior — return values, thrown errors, `fetch` call arguments (`expect(fetch).toHaveBeenCalledWith("https://ntfy.sh/father-son", expect.objectContaining({ method: "POST" }))`).

## Mocking

**Framework:** Not detected. Prescriptive: use Vitest built-ins — `vi.fn()`, `vi.spyOn()`, `vi.stubGlobal()`.

**Patterns:**
```js
// ntfy-client.test.js — never hit the real ntfy.sh API in tests
it("POSTs the message to the ntfy topic", async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true });
  vi.stubGlobal("fetch", fetchMock);

  const ok = await sendAlert("father-son", "🚗 Dad arrived");

  expect(ok).toBe(true);
  expect(fetchMock).toHaveBeenCalledWith(
    "https://ntfy.sh/father-son",
    expect.objectContaining({ method: "POST", body: "🚗 Dad arrived" })
  );
  vi.unstubAllGlobals();
});
```

**What to Mock:**
- `global.fetch` — all ntfy API interactions (unit boundary).
- `Notification` API and `Audio` — browser-only APIs unavailable in Node test env.
- `navigator`/`window` UI APIs when testing UI logic in isolation.

**What NOT to Mock:**
- Pure helpers and topic/message configuration in `config.js` — test with real data.
- The message-building/emoji mapping logic — assert on real payloads.

## Fixtures and Factories

**Test Data:**
- Not detected.
- Prescriptive: Define per-suite local fixtures (a `TEST_TOPICS` map mirroring `config.js` shape). No fixture files needed at this scale; keep fixtures inline near the test that uses them.

**Location:**
- Prescriptive: Inline in each test file. Extract to a shared `test/fixtures.js` only if the same data is reused across three or more suites.

## Coverage

**Requirements:** Not detected — none enforced.

**View Coverage:**
```bash
npm run test:coverage
```

- Prescriptive: Target ≥ 80% line coverage on `ntfy-client.js` (network/error paths) and `config.js` (all topic mappings). UI glue code in `app.js` may stay lower initially but should cover the send-success and send-failure branches.

## Test Types

**Unit Tests:**
- Prescriptive: Core scope. Cover `ntfy-client.js` (request building, error handling, `!res.ok` path) and `config.js` (topic/emoji mappings, payload assembly). Pure and deterministic — no network.

**Integration Tests:**
- Not used — no backend exists. The only real external dependency is the ntfy.sh API; exercising it in tests is not recommended (rate limits, no auth). Optionally maintain a manual smoke-test checklist instead.

**E2E Tests:**
- Not used. Prescriptive: a manual QA script in README or `.planning/` covering the acceptance flows from `IDEA.md` (send alert from one device, receive push on the other via ntfy app / in-page popup). Consider Playwright only if the UI grows beyond a handful of buttons.

## Common Patterns

**Async Testing:**
```js
it("resolves false on network failure", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Network request failed")));

  const ok = await sendAlert("father-son", "hello");

  expect(ok).toBe(false);
  vi.unstubAllGlobals();
});
```

**Error Testing:**
```js
it("returns false when ntfy responds with an error status", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 429 }));

  const ok = await sendAlert("father-son", "hello");

  expect(ok).toBe(false);
});
```

---

*Testing analysis: 2026-08-11*
