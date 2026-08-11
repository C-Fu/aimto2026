# Codebase Concerns

**Analysis Date:** 2026-08-11

## Repository State

**This repository contains no implementation code.** The only artifact is `IDEA.md`, a design document for a "Simple Family Alert System" (static HTML/CSS/JS on GitHub Pages + [ntfy](https://ntfy.sh) push topics). There are no source files, package manifests, configs, tests, or CI. Consequently, code-level technical debt does not exist yet — the concerns below are (a) **design-level risks** baked into the plan in `IDEA.md` that will become tech debt the moment code is written, and (b) **missing infrastructure** that must be in place before launch.

**Consequence:** The first implementation phase should treat the items below as acceptance criteria, not optional hardening. Once code lands, re-run this analysis to surface real code-level debt.

## Design-Level Risks (from `IDEA.md`)

### No Authentication / Open Access

- Issue: The design explicitly states "Open access (no authentication)". Every family channel is an unauthenticated ntfy topic on the public `ntfy.sh` server.
- Files: `IDEA.md` (lines 22, 25)
- Impact: Anyone who guesses or leaks a topic name (e.g., `ntfy.sh/father-son`) can send fake alerts (spoofing) and subscribe to read the family's messages (privacy). Family/pet names used as topic slugs are trivially guessable. The alert sound + popup design makes spoofed alerts effective attention grabs.
- Fix approach: At minimum, use random unguessable topic names (e.g., `ntfy.sh/fam-<64-hex-rand>-father-son`) with no personal info embedded. Evaluate ntfy access control (ntfy.sh supports auth / access tokens on self-hosted instances; for the free public server, long random topics are the only lever). Add a client-side "sender verification" convention (e.g., a shared passphrase prefix) only if it does not complicate the no-backend design.

### Topic Name as the Only Secret

- Issue: The ntfy topic is simultaneously the routing address and the access credential ("Each sender/receiver pair uses a unique ntfy channel", `IDEA.md` line 24).
- Files: `IDEA.md` (lines 24, 28)
- Impact: There is no way to revoke a compromised topic without breaking both sender and receiver config on all family devices. Topic names will be embedded in client code committed to a public GitHub Pages repo, so any topic committed to the repo is public by definition.
- Fix approach: Never hardcode topic names in committed code. Load them from per-device local storage / a small config file that is `.gitignore`d, with a documented rotation procedure (change topic → update all devices). Re-verify this after implementation: grep the repo for `ntfy.sh/` before every commit.

### Alerts Disappear Permanently ("No Logging/History")

- Issue: `IDEA.md` line 23: "Alerts disappear after being read (no logging/history)". There is no message store anywhere — not on device, not in the topic (ntfy message retention on the public server is also not guaranteed).
- Files: `IDEA.md` (line 23)
- Impact: Alerts are irretrievably lost if the phone is silent, the browser tab is closed, or the notification is accidentally dismissed. For time-sensitive family signals ("Rain coming, pick up clothes!") this is a real functional gap.
- Fix approach: Keep a minimal local history (e.g., `localStorage` of last N messages with a "clear" button) while preserving the "disappear after read" UX. This is a small feature that prevents the biggest user-facing data-loss complaint.

### Single-Point Dependency on `ntfy.sh`

- Issue: The entire system depends on the public ntfy server's availability, rate limits, and retention policy.
- Files: `IDEA.md` (lines 13–15)
- Impact: Outages or rate limiting on `ntfy.sh` silently break the whole system with no fallback. Client-side fetch calls will need timeouts/retry handling to avoid confusing UX.
- Fix approach: Abstract the publish/subscribe call behind a small module (e.g., `src/ntfy.js` with `sendAlert()` / `subscribeTopic()` functions) so the endpoint can be swapped to a self-hosted ntfy instance later without touching UI code. Add a visible "message failed to send" state in the UI.

### Frontend-Only Constraint vs. Verification

- Issue: "No backend" (`IDEA.md` line 15) means message delivery, ordering, and deduplication are entirely at the mercy of ntfy's pub/sub and the browser's subscription lifecycle.
- Files: `IDEA.md` (lines 15, 30–32)
- Impact: Browser tab closed = no live popup (only OS push via the ntfy app, which requires the receiver to install and configure it). The browser-based receiver path (`IDEA.md` line 32) is fragile and may show duplicate or missed messages across multiple open tabs.
- Fix approach: Decide explicitly which receive path is primary (ntfy app vs. web page) and make the web page a progressive enhancement. If the web page must receive, document the "keep tab open" constraint in the UI; dedupe by ntfy message ID.

## Security Considerations

- **Spoofing / impersonation:** Unauthenticated topics allow any party to send on a family channel. See "No Authentication / Open Access" above.
- **Topic privacy:** Topic names will be visible in git history and in `ntfy.sh` (public topic names are enumerable). Never commit topic names; see "Topic Name as the Only Secret".
- **XSS surface:** Although the UI is static HTML, any place that renders incoming ntfy message text (the popup) must use `textContent`, never `innerHTML`, since message content is attacker-controllable once a topic is known.
- **Secret hygiene:** `IDEA.md` mentions no secrets today, but the moment access tokens (for self-hosted ntfy) or passphrases are added, they must live in a `.gitignore`d file / browser storage, not committed code. No `.env` or credential files exist yet — keep it that way.
- **No TLS concerns:** GitHub Pages and ntfy.sh both serve HTTPS; ensure all fetches use `https:` URLs (no mixed content).

## Performance & Reliability Concerns

- **Delivery guarantees:** No retry/backoff in the design; a transient network failure drops the alert with no user feedback. Add `fetch` retry (2–3 attempts with backoff) and an explicit failure state.
- **Connection lifecycle:** Browser EventSource/WebSocket subscriptions to ntfy should be re-established on tab visibility change and network reconnect to avoid silent missed messages.
- **Payload size:** Keep messages short (the design says "short message" — enforce a client-side character limit, e.g., 200 chars) to stay well under ntfy limits and keep the UI clean.
- **No caching strategy:** The static site will re-fetch on every load; acceptable at this scale, but set a sensible `Cache-Control`/service-worker policy only if load times become an issue.

## Fragile Areas

- **Receiver UX on closed tab:** The only reliable receive path is the ntfy mobile/browser app. The GitHub Pages web page ("Alert sound + message popup", `IDEA.md` line 32) only works while open. This mismatch between the doc's promise and reality is the most likely source of user confusion.
- **Per-device configuration:** Sender/receiver pair channels plus per-device config files means device onboarding/rotation is manual on every family phone. Without a written setup checklist, misconfiguration (wrong topic) will surface as "messages not arriving" with no diagnostics.

## Missing Critical Features

- **Setup/onboarding guide:** How a new family member creates their channel and configures both the ntfy app and the web page is undocumented beyond the idea sketch. A `README.md` with copy-paste steps is required.
- **Message delivery feedback:** No way for the sender to know the alert was delivered/read. If this matters, note it as a known limitation in the README rather than implying guaranteed delivery.
- **Basic diagnostics:** No error display, no "last received" indicator, no network status. Add a minimal status line to the web page.
- **Tests:** None exist (no code exists). The first implementation should include at least unit tests for the message formatting/validation logic and a mocked send path; the static page is small enough that a Playwright smoke test (open page → click alert → assert POST fired) is cheap and valuable.

## Dependencies at Risk

- **ntfy.sh (public server):** Free tier availability and retention are outside the repo's control. Mitigation: abstract the endpoint (`src/ntfy.js`) and document how to switch to a self-hosted instance. This is the only external dependency.

## Test Coverage Gaps

- **No tests exist — none applicable yet.** Required at first implementation: unit tests for validation/formatting, a mocked ntfy client for send-path tests, and one E2E smoke test for the primary alert flow. Priority: **High**, because the system is pure client-side logic with no server-side safety net.

## Recommended Pre-Implementation Decisions

1. Adopt random unguessable topic names + per-device config (never commit topics).
2. Add local message history (localStorage, clearable) despite the "no history" design line.
3. Wrap ntfy calls in `src/ntfy.js` with retry/backoff and visible failure states.
4. Render incoming messages with `textContent` only.
5. Write the onboarding README before (or with) the first code commit.

---

*Concerns audit: 2026-08-11 — repo is pre-implementation (only `IDEA.md` present); re-run after first code lands.*
