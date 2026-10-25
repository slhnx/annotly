# Annotly

## What This Is

Annotly is a website-feedback and visual collaboration SaaS designed for web agencies, developers, designers, and their clients. Project owners can input any website URL to generate an interactive review canvas with shareable links, enabling reviewers to place visual annotations on live websites, discuss feedback in threaded conversations, and resolve comments without requiring browser extensions or client account creation.

## Core Value

The single most critical capability of Annotly is the frictionless, zero-install visual review loop: anyone with a review link can point, click on any website element, and leave an anchored, context-rich comment that stays aligned across viewports and devices.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Phase 1: Foundation, Design System & Landing Page:** Clean repo structure, strict TypeScript config, validated environment schema, warm cream & charcoal design system (`DESIGN.md`), and marketing landing page.
- [ ] **Phase 2: Authentication, Database & Project Permissions:** Supabase Auth (email/password signup, login, session cookies) paired with PostgreSQL database and Prisma ORM models (`User`, `Project`, `Canvas`, `Annotation`, `AnnotationReply`).
- [ ] **Phase 3: Reverse Proxy & Injected Client Bridge:** Next.js Route Handler reverse proxy that strips `X-Frame-Options` and CSP framing headers, enforces strict SSRF protections, and injects `annotly-bridge.js` with type-safe `postMessage` protocol (Comment Mode vs Browse Mode with `Alt+C`).
- [ ] **Phase 4: Visual Pin Placement & Coordinate Alignment:** Element-relative percentage offset math ($OffsetX, OffsetY$) and resilient 5-tier CSS selector generation, with `ResizeObserver` and scroll synchronizer to prevent pin drift.
- [ ] **Phase 5: Comment Persistence, Threading & Resolution:** Zero-friction guest reviewer capture (inline name/email modal), comment creation with client-side viewport screenshot capture, threaded replies, and `active`/`resolved` status lifecycle.
- [ ] **Phase 6: Review Canvas UI, Responsive Viewports & Triaging Sidebar:** Canvas host interface at `/review/[canvasId]` with permanent shareable links, responsive device switcher (Desktop, Tablet, Mobile), sliding triage sidebar with instant search and status filters, and device metadata badges.
- [ ] **Phase 7: End-to-End Verification, Security Hardening & Polish:** Comprehensive test coverage, SSRF and auth permission security auditing, rate limiting, and performance optimization.

### Out of Scope

- **Heavy server-side headless browser queue (Playwright/Puppeteer farm):** Excluded for v1 to prevent high infrastructure costs and multi-second latency; client-side in-frame rasterization provides immediate snapshots.
- **Video screen recording (Loom-style):** Excluded to keep scope lean and prioritize text + visual pin workflows.
- **Two-way CMS / GitHub code writebacks:** Annotly acts as an issue capture and review canvas, not a direct code editor or Git commit pusher.
- **Mandatory reviewer login wall:** Requiring clients to create passwords creates adoption friction; guest commenting with name/email capture is prioritized.
- **Localhost tunneling / Chrome Extension:** Deferred to post-MVP; v1 targets public staging, preview, and production URLs.

## Context

- **Reverse Engineering Analysis:** The design and interaction paradigms are inspired by comprehensive public research on industry standards (specifically **Pastel**), documented in `docs/research/`.
- **Engineering Standards:** Governed strictly by `AGENTS.md` (separation of concerns, Prisma data boundary, zero `any`, strict input validation with Zod, SSRF protection).
- **Design Language:** Grounded in `DESIGN.md` (warm parchment cream `#f7f4ed`, organic charcoal `#1c1c1c`, Camera Plain Variable / humanist font hierarchy, opacity-based neutral scale, subtle 1px `#eceae4` containment borders, tactile button inset shadows).

## Constraints

- **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Supabase Auth, PostgreSQL via Prisma ORM.
- **Framing Security:** Target websites frequently enforce `X-Frame-Options: DENY` and CSP `frame-ancestors`; framing must be handled through a dedicated Next.js reverse proxy route with SSRF protection.
- **Pin Coordinate Math:** Absolute pixel coordinates cannot be used due to responsive layouts and text reflow; pins must store element-relative percentage offsets.
- **Guest Friction:** External clients will not install browser extensions or create passwords; zero-install and frictionless guest commenting are mandatory.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Prisma ORM with Supabase PostgreSQL | Preserves type-safe schema, migrations, and clean data access boundaries per `AGENTS.md`, while leveraging Supabase's managed Postgres, Auth, and Storage. | — Pending |
| Next.js Route Handler Proxy | Keeps the entire architecture self-contained within the Next.js application without requiring separate proxy services or Cloudflare Workers for MVP. | — Pending |
| Client-Side In-Frame Screenshot Capture | Fast (<500ms) capture generated in the reviewer's browser at comment creation; zero server infrastructure cost or queuing latency. | — Pending |
| Frictionless Guest Reviewing | Prompts external reviewers for Name and Email on their first pin, storing identity in session cookies/localStorage without forcing account sign-up. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-10-25 after initialization*
