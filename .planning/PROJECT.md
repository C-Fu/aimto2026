# Family Alert System

## What This Is

A lightweight one-way alert system between family devices. A static HTML page (hosted on GitHub Pages) lets a family member send a quick alert or short message — with emoji and an alert sound — to another family member's phone or browser via an ntfy topic. No backend, no accounts, no message history.

## Core Value

A family member can send an alert that reliably reaches another family member with a sound, in one tap.

## Requirements

### Validated

- ✓ Sender can send a preset alert (e.g. "Dad arrived at school") with one tap — Phase 1
- ✓ Sender can send a short custom message with emoji — Phase 1
- ✓ Sent alerts trigger a push notification with sound on the receiver's device — Phase 1
- ✓ Each sender/receiver pair uses its own ntfy topic — Phase 1
- ✓ The page can be deployed as static files on GitHub Pages — Phase 1
- ✓ No login or accounts required — Phase 1

### Active

- (None — demo shipped)

### Out of Scope

- Authentication/authorization — open access by design; ntfy topic is the shared secret
- Message history/logging — alerts are fire-and-forget
- Receipts/read confirmations — not needed for a demo

## Context

- Frontend-only: pure HTML, CSS, vanilla JS
- Messaging via [ntfy.sh](https://ntfy.sh) topics (free public service) — POST via `fetch`
- Demo target: working single-page site within ~20 minutes
- Deliverable is a demo, not a production system
- See `.planning/codebase/` for the full codebase map and known concerns

## Constraints

- **Tech stack**: Pure HTML/CSS/JS, GitHub Pages, ntfy — no build step, no backend
- **Timeline**: Demo must work within ~20 minutes
- **Scope**: Demo-level; no auth, no persistence, no tests required
- **Open access**: No authentication on ntfy topics (per IDEA.md design decision)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static HTML/CSS/JS + GitHub Pages | Zero hosting cost, instant deploy, no backend | — Pending |
| ntfy.sh for messaging | Free push notifications, no accounts, simple REST API | — Pending |
| Open access (no auth) | Maximum simplicity; topic name acts as the shared secret | — Pending |
| Demo scope in one phase | 20-minute target | ✓ Good |
| Topic set to `gomokelategomo-sjhasjhsa` | Replace demo placeholder with a private family topic | ✓ Good |
| Header values sanitized to ISO-8859-1 | Emoji in ntfy Title header crashed fetch | ✓ Good |
| PWA receiver page (open-tab) instead of Web Push | ntfy background push requires same-server hosting, unavailable on GitHub Pages | — Pending |

---
*Last updated: 2026-08-11 after Phase 1 completion*
