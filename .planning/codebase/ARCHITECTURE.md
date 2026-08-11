<!-- refreshed: 2026-08-11 -->
# Architecture

**Analysis Date:** 2026-08-11

> **Status: Pre-implementation.** This repository currently contains only the design document `IDEA.md`. No source code exists yet. The architecture below documents the intended design as specified in `IDEA.md` plus the constraints it implies for future implementation.

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                    Static Frontend (browser)                 │
│   Sender Page                        Receiver Page           │
│  `index.html` (planned)             `index.html` (planned)  │
│  [button / quick input]              [popup + alert sound]  │
└────────┬─────────────────────────────────────┬───────────────┘
         │ POST https://ntfy.sh/<topic>        │ poll/SSE or ntfy app
         ▼                                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    ntfy.sh push service (external)           │
│         topic per sender/receiver pair (e.g. father-son)    │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│  Receiver device: ntfy mobile app OR browser notification    │
└─────────────────────────────────────────────────────────────┘
```

- **No backend**: all messaging goes directly from browser to the ntfy public API over HTTPS.
- **Hosting**: GitHub Pages (static files only — no server-side code permitted).
- **No persistence**: alerts are fire-and-forget; no logging or history by design.

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Sender UI | Compose message (button preset or short text + emoji), POST to ntfy topic | `index.html` + `script.js` (planned) |
| Receiver UI | Poll/listen to ntfy topic, show popup + play alert sound | `index.html` + `script.js` (planned) |
| Styling | Emoji-friendly, mobile-first, friendly tone | `style.css` (planned) |
| ntfy integration | `fetch()` POST to `https://ntfy.sh/<topic>` for sending; topic subscription for receiving | `script.js` (planned) |

## Pattern Overview

**Overall:** Static single-page client architecture with an external messaging service (ntfy) as the only integration point. Zero-server, publish/subscribe via ntfy topics.

**Key Characteristics:**
- Frontend-only: pure HTML, CSS, vanilla JS — no framework, no build step
- One-way alert flow: sender publishes, receiver subscribes (each direction has its own topic)
- Open access: no authentication (by design, per `IDEA.md`)
- Stateless: alerts disappear after being read; no local or remote history
- Per-pair topics: each sender/receiver pair maps to a unique ntfy channel

## Layers

**Static Frontend:**
- Purpose: Rendering, input capture, and direct ntfy API calls
- Location: project root (GitHub Pages serves the repo root; planned files `index.html`, `style.css`, `script.js`)
- Contains: HTML markup, CSS styling, vanilla JS
- Depends on: ntfy.sh HTTPS API only
- Used by: Family members' browsers/mobile devices

**External Service — ntfy:**
- Purpose: Message transport (push notifications) and the only integration
- Location: external (https://ntfy.sh)
- Depends on: nothing from this repo
- Used by: the static frontend via `fetch()`

## Data Flow

### Send Path (e.g., father → son)

1. Sender clicks preset button or types short message with emoji (`index.html` → `script.js`)
2. `script.js` issues `fetch()` POST to `https://ntfy.sh/father-son` with message body (`script.js`, planned)
3. ntfy pushes notification to receiver's ntfy app / subscribed browser tab
4. Receiver sees alert; alert disappears once read (no history)

### Receive Path

1. Receiver's ntfy app (or open browser tab subscribed to the topic) receives the push
2. On the GitHub Pages site: popup + alert sound fires (`script.js`, planned)

**State Management:** None. No local storage, no cookies, no server state. All state lives ephemerally in the ntfy notification itself.

## Key Abstractions

**ntfy Topic:**
- Purpose: A named pub/sub channel identifying a sender/receiver pair
- Examples: `father-son`, `mother-child` (per `IDEA.md`)
- Pattern: Unique topic per pair; topic name must be kept secret-enough to avoid spam (only current mitigation, since auth is disabled)

## Entry Points

**Static entry point (planned):**
- Location: `index.html` at repo root (GitHub Pages default)
- Triggers: User opens the family site URL
- Responsibilities: Render sender controls; optionally render/subscribe receiver view

## Architectural Constraints

- **No backend:** All logic must run client-side. No server endpoints, no serverless functions, no build pipeline producing server artifacts.
- **No auth:** Open access by design (`IDEA.md`). Security relies on topic-name obscurity.
- **Static hosting only:** Files must be GitHub-Pages-compatible (no server-side includes, no dynamic routing).
- **HTTPS-only:** All calls to ntfy must use `https://ntfy.sh/<topic>`.
- **CORS:** ntfy.sh permits cross-origin `fetch()`; any future alternative service must also support CORS.

## Anti-Patterns

### Embedding Secrets in Client Code

**What happens:** Auth tokens or API keys placed in `script.js` are visible to anyone who opens the page (GitHub Pages serves source as-is).
**Why it's wrong:** Public static hosting cannot keep client-side secrets private.
**Do this instead:** Rely on unguessable ntfy topic names per pair (per `IDEA.md`), or move auth to a backend (outside this repo's current scope).

### Adding a History/Logging Layer

**What happens:** Persisting sent/received alerts (localStorage or server) would violate the design decision "alerts disappear after being read."
**Why it's wrong:** Adds state, storage, and privacy surface the idea explicitly rejects.
**Do this instead:** Keep alerts fire-and-forget; only render what the live subscription delivers.

## Error Handling

**Strategy:** Client-side only; must be resilient to network failure and offline receivers.

**Patterns (planned):**
- Wrap `fetch()` calls in try/catch with user-visible fallback (e.g., "message not sent")
- Handle ntfy non-2xx responses (rate limits, topic errors) with a readable message
- Receiver view must tolerate dropped/reconnecting subscriptions without breaking the page

## Cross-Cutting Concerns

**Logging:** Not applicable — no backend, and history is explicitly out of scope. Console/debug logging in `script.js` only.
**Validation:** Basic input length/content validation client-side before POST.
**Authentication:** None by design (see Constraints).

---

*Architecture analysis: 2026-08-11*
