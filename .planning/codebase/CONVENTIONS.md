# Coding Conventions

**Analysis Date:** 2026-08-11

> **State of the codebase:** No source code exists yet. The repository contains only `IDEA.md`, which describes a planned "Simple Family Alert System" — a pure HTML/CSS/JS static site hosted on GitHub Pages, using ntfy.sh topics for push notifications, with no backend. The sections below reflect this reality: all observed patterns are **Not detected**. Prescriptive guidance for the planned stack follows each section so future work establishes consistent conventions from the start.

## Naming Patterns

**Files:**
- Not detected — no source files exist yet.
- Prescriptive: Use `kebab-case` for HTML/CSS/JS asset files (e.g., `index.html`, `alert-sender.js`, `styles.css`). GitHub Pages serves static files as-is, so keep filenames URL-safe and lowercase.

**Functions:**
- Not detected.
- Prescriptive: Use `camelCase` for function names (e.g., `sendAlert(topic, message)`, `playSound()`). Prefix event handlers with `handle` (e.g., `handleSendClick`).

**Variables:**
- Not detected.
- Prescriptive: Use `camelCase` for variables and constants. Use `const` by default and `let` only when reassignment is required. Never use `var`.

**Types:**
- Not detected (no TypeScript planned — stack is vanilla JS).
- Prescriptive: If types are needed for shared shapes (e.g., alert payload `{ topic, message }`), document them as JSDoc `@typedef` blocks at the top of the relevant file.

## Code Style

**Formatting:**
- Not detected — no formatter config present (no `.prettierrc`, `.editorconfig`).
- Prescriptive: Add an `.editorconfig` with `charset = utf-8`, `indent_size = 2`, `end_of_line = lf`, `insert_final_newline = true`. Use 2-space indentation for all HTML/CSS/JS.

**Linting:**
- Not detected — no ESLint config present.
- Prescriptive: Add `eslint.config.js` (flat config) with `eslint:recommended` and set `env: { browser: true, es2022: true }`. This repo is browser-only (no Node.js runtime), so browser globals (`fetch`, `Notification`, `Audio`) must be enabled.

## Import Organization

**Order:**
- Not detected — vanilla JS static site; `IDEA.md` plans inline `<script>` tags or plain `<script src="...">` includes, no module bundler.
- Prescriptive: If ES modules are used, keep a single `<script type="module" src="app.js">` entry point and split concerns into module files (`ntfy-client.js`, `ui.js`, `config.js`). Import order: third-party (none expected) → local modules, alphabetized.

**Path Aliases:**
- Not detected — no bundler/tsconfig, so no aliases. Use relative paths (e.g., `./ntfy-client.js`).

## Error Handling

**Patterns:**
- Not detected — no code exists yet.
- Prescriptive: All ntfy API calls are `fetch()`-based network operations and MUST be wrapped in `try/catch` or use `.catch()`:
  ```js
  async function sendAlert(topic, message) {
    try {
      const res = await fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        body: message,
      });
      if (!res.ok) throw new Error(`ntfy returned ${res.status}`);
    } catch (err) {
      showError(`Failed to send alert: ${err.message}`);
    }
  }
  ```
- Fail visibly to the user: this is a one-way alert system, so silent failures defeat the purpose. Show an inline error message in the UI on failure.

## Logging

**Framework:** Not detected — no logging library. Console-only.

**Patterns:**
- Not detected in code (none exists).
- Prescriptive: Use `console.error()` for failed network requests/API errors, `console.warn()` for non-fatal issues (e.g., Notification API permission denied, falling back to in-page popup). Avoid `console.log()` in shipped code for anything but development-time debugging.

## Comments

**When to Comment:**
- Not detected.
- Prescriptive: Comment non-obvious logic only — e.g., the mapping of UI buttons to ntfy topic names (`ntfy.sh/father-son`), and the "alerts disappear after being read (no history)" design decision.

**JSDoc/TSDoc:**
- Not detected.
- Prescriptive: Use JSDoc blocks on every exported function and `@typedef` for shared shapes:
  ```js
  /**
   * Sends a short message to an ntfy topic.
   * @param {string} topic - ntfy topic name (no leading "ntfy.sh/").
   * @param {string} message - Short alert message with emoji.
   * @returns {Promise<boolean>} True when ntfy accepted the POST.
   */
  ```

## Function Design

**Size:** Not detected. Prescriptive: keep functions under ~30 lines; extract per-feature helpers (one function per button/topic pair in `config.js` rather than inline strings).

**Parameters:** Not detected. Prescriptive: prefer 1–2 parameters; for the alert payload pass an options object `{ topic, message, sound }` instead of positional args beyond two.

**Return Values:** Not detected. Prescriptive: return booleans or meaningful values from helpers; `sendAlert()` returns `Promise<boolean>` so callers can update UI state.

## Module Design

**Exports:** Not detected. Prescriptive: if ES modules are used, export only what other modules consume (`export function sendAlert`, `export const TOPICS`). Keep `config.js` as the single source of truth for topic names and emoji mappings.

**Barrel Files:** Not detected. Prescriptive: not needed for a small static site; keep one entry point (`app.js`) and avoid re-export chains.

---

*Convention analysis: 2026-08-11*
