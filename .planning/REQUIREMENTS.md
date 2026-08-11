# Requirements: Family Alert System

**Defined:** 2026-08-11
**Core Value:** A family member can send an alert that reliably reaches another family member with a sound, in one tap.

## v1 Requirements

### Alert Sending

- [ ] **ALRT-01**: User can send a preset alert (e.g. "Dad arrived at school") with a single tap
- [ ] **ALRT-02**: User can send a short custom message with emoji
- [ ] **ALRT-03**: Sending an alert plays a confirmation sound on the sender's device
- [ ] **ALRT-04**: Sent alerts include a distinctive title and the sender's chosen sound

### Receiving

- [ ] **RECV-01**: Receiver gets a push notification with sound on the ntfy mobile app or browser
- [ ] **RECV-02**: Page can subscribe to a topic so open-browser receivers see a popup with sound

### Config & Deploy

- [ ] **CFG-01**: Each sender/receiver pair uses its own ntfy topic (configurable per deployment)
- [ ] **CFG-02**: The site runs as static files deployable to GitHub Pages with no backend

## v2 Requirements

### Notifications

- **NOTF-01**: Message history on the page (suppressed — fire-and-forget by design)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Authentication | Open access by design; topic name is the shared secret |
| Message history / logging | Alerts are fire-and-forget |
| Read receipts | Not needed for a demo |
| Backend / server code | Static hosting only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ALRT-01 | Phase 1 — One-Tap Family Alert Page | Complete |
| ALRT-02 | Phase 1 — One-Tap Family Alert Page | Complete |
| ALRT-03 | Phase 1 — One-Tap Family Alert Page | Complete |
| ALRT-04 | Phase 1 — One-Tap Family Alert Page | Complete |
| RECV-01 | Phase 1 — One-Tap Family Alert Page | Complete |
| RECV-02 | Phase 1 — One-Tap Family Alert Page | Complete |
| CFG-01 | Phase 1 — One-Tap Family Alert Page | Complete |
| CFG-02 | Phase 1 — One-Tap Family Alert Page | Complete |

**Coverage:**
- v1 requirements: 8 total
- Mapped to phases: 8
- Unmapped: 0 ✓

---
*Requirements defined: 2026-08-11*
*Last updated: 2026-08-11 after Phase 1 execution (all 8 requirements verified complete)*
