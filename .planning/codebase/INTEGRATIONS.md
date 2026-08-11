# External Integrations

**Analysis Date:** 2026-08-11

> **Project status:** Greenfield. No code exists yet. Integrations below are the **planned** design documented in `IDEA.md`; no API calls are implemented.

## APIs & External Services

**Push Messaging (primary integration):**
- [ntfy](https://ntfy.sh) — push notification service; the entire alert system depends on it
  - Protocol: plain HTTP (client-side `fetch()` POST)
  - Publish: `POST https://ntfy.sh/<topic>` with message body; optional emoji via message text, sound via request headers/parameters
  - Subscribe: ntfy mobile app, or browser-based Server-Sent Events (SSE) on `https://ntfy.sh/<topic>/sse` for the GitHub Pages site popup + alert sound
  - Auth: **none** — public topics, open access by design (`IDEA.md` line 21)
  - Topic scheme: one unique topic per sender/receiver pair, e.g. `ntfy.sh/father-son` (`IDEA.md` line 24, 28)
  - Key env var: none (topic names are hardcoded per pair in the HTML/JS)

**Hosting:**
- GitHub Pages — static site hosting for the HTML/CSS/JS frontend
  - Deployment: push to GitHub repo → Pages serves the static files
  - Custom domain: none specified

## Data Storage

**Databases:**
- None. Deliberately stateless — alerts are ephemeral push messages with no logging/history (`IDEA.md` line 23)

**File Storage:**
- Not applicable

**Caching:**
- Not applicable

## Authentication & Identity

**Auth Provider:**
- None. Open access with no authentication (`IDEA.md` line 21). Topic names act as the only (weak) obscurity layer

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- None (client-side only; no server to log to)

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (planned)

**CI Pipeline:**
- None — static files are pushed directly to the repo; no build step required

## Environment Configuration

**Required env vars:**
- None (browser-only, no `.env` support)

**Secrets location:**
- No secrets exist. Note: ntfy topic names should be treated as semi-private — they are the only access control, and they will live in committed static files

## Webhooks & Callbacks

**Incoming:**
- None — ntfy pushes are pulled via app/SSE subscription, not webhooks

**Outgoing:**
- `POST https://ntfy.sh/<topic>` — publish alert/message (via client `fetch()`)
- `GET https://ntfy.sh/<topic>/sse` — server-sent events stream for in-page popup + sound

---

*Integration audit: 2026-08-11*
