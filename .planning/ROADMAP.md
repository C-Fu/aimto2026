# Roadmap: Family Alert System

## Overview

A single-phase demo roadmap. Build and deploy a static, frontend-only single-page site (pure HTML/CSS/JS on GitHub Pages) that lets a family member send a one-tap preset alert or a short custom emoji message via an ntfy topic, and lets the receiver get the alert as a push notification with sound (ntfy app) or an in-page popup with sound (subscribed browser). No backend, no accounts, no message history — one coherent capability delivered in a ~20-minute demo.

## Phases

- [ ] **Phase 1: One-Tap Family Alert Page** - Complete static alert site: one-tap preset/custom sends with confirmation sound, receiver push/popup with sound, per-pair ntfy topic config, GitHub Pages deploy.

## Phase Details

### Phase 1: One-Tap Family Alert Page
**Goal**: A working static single-page alert site where a sender sends a preset or custom emoji alert with one tap (with confirmation sound) that reaches the receiver with sound via ntfy — deployed to GitHub Pages with no backend.
**Depends on**: Nothing (first phase)
**Requirements**: ALRT-01, ALRT-02, ALRT-03, ALRT-04, RECV-01, RECV-02, CFG-01, CFG-02
**Success Criteria** (what must be TRUE):
  1. Sender can tap a preset alert button (e.g. "Dad arrived at school") and the alert is delivered to the pair's configured ntfy topic with a single tap
  2. Sender can type a short custom message with emoji and send it successfully
  3. Sending plays a confirmation sound on the sender's device, and the delivered notification shows a distinctive title plus the sender's chosen sound
  4. Receiver gets a push notification with sound on the ntfy mobile app or a browser tab subscribed to the topic
  5. On a page open and subscribed to the topic, the alert appears as a popup with sound; the site runs entirely as static files (GitHub Pages compatible, no backend) with the ntfy topic configurable per deployment
**Plans**: 4 plans

Plans:
- [ ] 01-01: Static page shell — index.html + style.css (mobile-first, emoji-friendly sender UI)
- [ ] 01-02: ntfy send — preset buttons + custom message via fetch POST with title/sound
- [ ] 01-03: Receiver view — topic subscription (SSE) with popup + alert sound
- [ ] 01-04: Config & deploy — per-pair topic constant + GitHub Pages static verification
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. One-Tap Family Alert Page | 0/4 | Not started | - |
