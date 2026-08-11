# Technology Stack

**Analysis Date:** 2026-08-11

> **Project status:** Greenfield. No source code exists yet. The only artifact is the idea document `IDEA.md` (34 lines) at the repository root. Everything below describes the **intended** stack as specified in `IDEA.md`; nothing is implemented or verified in code.

## Languages

**Primary:**
- HTML - Static page structure for the alert UI (planned)
- CSS - Styling for the alert interface (planned)
- JavaScript (vanilla, ES6+) - Client-side logic: ntfy API calls, notification handling (planned)

**Secondary:**
- Not detected (no build tooling, TypeScript, or other languages specified)

## Runtime

**Environment:**
- Browser only — no server-side runtime. All code runs client-side in the browser.
- Node.js: not required, not detected

**Package Manager:**
- Not applicable (no dependencies, no lockfile)

## Frameworks

**Core:**
- None — deliberately framework-free. `IDEA.md` line 13: "Frontend only: Pure HTML, CSS, JS"
- No React/Vue/Svelte/Angular

**Testing:**
- Not detected (no test framework specified or configured)

**Build/Dev:**
- None — static files deployed directly

## Key Dependencies

**Critical:**
- None. Zero npm/runtime dependencies. All messaging is done via direct `fetch()` calls to the ntfy API.

**Infrastructure:**
- [ntfy](https://ntfy.sh) — external push-notification service (used as a dependency but not a package)
- GitHub Pages — hosting platform

## Configuration

**Environment:**
- No `.env` files present (nothing to configure server-side)
- No config files detected at all — only `IDEA.md` at repo root

**Build:**
- Not applicable — no build config, no `package.json`, no `tsconfig.json`, no bundler config

## Platform Requirements

**Development:**
- A web browser and any static file server (or `python -m http.server` / GitHub Pages preview)

**Production:**
- GitHub Pages hosting (per `IDEA.md` line 13)
- Each family member device: ntfy mobile app or a browser with notifications enabled

---

*Stack analysis: 2026-08-11*
