# AGENTS.md

## Project

**Family Alert System** — a lightweight one-way alert system between family devices. Static HTML page on GitHub Pages sends one-tap preset alerts or short emoji messages to a family member's phone/browser via an ntfy topic. No backend, no accounts, no message history.

Core value: A family member can send an alert that reliably reaches another family member with a sound, in one tap.

## Workflow

This project uses the GSD (Get-Shit-Done) workflow. Planning artifacts live in `.planning/`:

- `PROJECT.md` — project context, core value, requirements, decisions
- `REQUIREMENTS.md` — v1/v2 requirements with REQ-IDs and traceability
- `ROADMAP.md` — phases and success criteria
- `STATE.md` — current position, progress, blockers
- `config.json` — workflow settings (mode: yolo)
- `codebase/` — codebase map (STACK, ARCHITECTURE, CONVENTIONS, TESTING, etc.)

## Conventions

- **Mode**: YOLO — auto-approve, just execute
- **Granularity**: coarse — single-phase demo
- **Docs**: commit planning docs with descriptive messages (`docs: ...`)
- **Status symbols**: `✓` complete, `◆` in progress, `○` pending
- **Banners**: `GSD ► STAGE` for workflow transitions

## Current State

Phase 1 of 1 — One-Tap Family Alert Page (0/4 plans, ready to plan).

## Next Steps

Run `/gsd-plan-phase 1` to start execution.
