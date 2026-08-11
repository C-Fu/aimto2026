# Codebase Structure

**Analysis Date:** 2026-08-11

> **Status: Pre-implementation.** The repository contains only the design document `IDEA.md` and the `.planning/` workspace. No source files exist yet. The layout below documents the current state and the planned structure for new code (per the GitHub Pages + ntfy design in `IDEA.md`).

## Directory Layout

```
aimto/
├── IDEA.md               # Design document: idea, tech stack, decisions
├── .planning/            # GSD planning workspace
│   └── codebase/         # Codebase analysis documents (this file, ARCHITECTURE.md)
├── index.html            # [planned] Single-page UI (sender + receiver views)
├── style.css             # [planned] Styling — emoji-friendly, mobile-first
└── script.js             # [planned] ntfy send/receive logic (vanilla JS)
```

## Directory Purposes

**Project root (`aimto/`):**
- Purpose: Serves as both repo root and GitHub Pages site root — static files must live here
- Contains: Design docs, planned static site files (`index.html`, `style.css`, `script.js`)
- Key files: `IDEA.md`

**`.planning/`:**
- Purpose: GSD planning workspace; not part of the shipped site
- Contains: `codebase/` analysis docs
- Key files: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/STRUCTURE.md`

## Key File Locations

**Entry Points:**
- `index.html` (planned): GitHub Pages default document; the only page users open

**Configuration:**
- None — no build config, no framework config, no runtime config. Topic names for each family pair are embedded in `script.js` (planned) per `IDEA.md`

**Core Logic:**
- `script.js` (planned): ntfy `fetch()` POST for sending; topic subscription handling for receiving

**Testing:**
- None planned — static page, manual verification recommended

## Naming Conventions

**Files:**
- Conventional static-site names: `index.html`, `style.css`, `script.js` (lowercase, hyphen-free)
- Docs: UPPERCASE for analysis docs (`ARCHITECTURE.md`, `STRUCTURE.md`), descriptive names for design docs (`IDEA.md`)

**Directories:**
- No source subdirectories exist or are planned — flat static site

**Variables/Functions (planned):**
- camelCase for JS identifiers in `script.js` (vanilla JS convention)

## Where to Add New Code

**New Feature (e.g., new alert preset):**
- Primary code: `script.js` (add preset button data) + `index.html` (add button markup)
- Styling: `style.css`

**New Family Member / Topic Pair:**
- Add the topic constant in `script.js` and a preset button in `index.html` — no structural change needed

**New Shared Utility (client-side only):**
- Add helper function in `script.js` (no separate util directory — keep the site flat)

## Special Directories

**`.planning/`:**
- Purpose: GSD planning workspace
- Generated: Yes (by GSD workflows)
- Committed: Yes (analysis docs are intended for the repo)

---

*Structure analysis: 2026-08-11*
