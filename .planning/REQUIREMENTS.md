# Requirements: Annotly

**Defined:** 2026-10-25
**Core Value:** Frictionless, zero-install visual review loop where anyone with a review link can point, click on any website element, and leave an anchored, context-rich comment that stays aligned across viewports and devices.

## v1 Requirements

Requirements for initial release. Each maps directly to roadmap phases.

### Foundation & Design System
- [x] **FOUND-01**: Centralized environment variable validation using Zod at application startup (`lib/env.ts`).
- [x] **FOUND-02**: Global CSS variables and design system tokens reflect `DESIGN.md` (warm parchment cream `#f7f4ed`, charcoal `#1c1c1c`, opacity neutral scale, inset dark button styling, and 1px `#eceae4` containment borders).
- [x] **FOUND-03**: Marketing landing page with hero, interactive demonstration preview, feature grid, and responsive header.
- [x] **FOUND-04**: Core shadcn/ui component primitives installed and customized with Annotly design tokens.

### Authentication & Project Permissions
- [ ] **AUTH-01**: User can sign up with email and password via Supabase Auth.
- [ ] **AUTH-02**: User can log in with email and password, and session persists via secure cookies with Next.js middleware.
- [ ] **AUTH-03**: User can log out from the dashboard.
- [ ] **AUTH-04**: Authenticated user can create, view, and delete review projects linked to their account.
- [ ] **AUTH-05**: Non-owners cannot edit or delete projects belonging to other users.

### Reverse Proxy & Injected Client Bridge
- [ ] **PRXY-01**: Reverse proxy route handler fetches target website and strips blocking headers (`X-Frame-Options`, `Content-Security-Policy` `frame-ancestors`).
- [ ] **PRXY-02**: Reverse proxy validates target URL and resolves DNS to block loopback (`127.0.0.1`), RFC1918 private subnets, and cloud metadata endpoints (`169.254.169.254`).
- [ ] **PRXY-03**: Reverse proxy rewrites root-relative URLs (`<base href="...">`) and relative asset paths so proxied pages render styles and assets accurately.
- [ ] **PRXY-04**: Reverse proxy injects `annotly-bridge.js` before `</body>` to establish bidirectional communication with the canvas host.
- [ ] **PRXY-05**: Injected bridge supports mode toggling between Comment Mode (suppresses native link clicks and form submits) and Browse Mode (allows native navigation) via toolbar and `Alt+C` shortcut.

### Pin Placement & Coordinate Alignment
- [ ] **PINS-01**: In Comment Mode, hovering over any DOM element renders an outline bounding box.
- [ ] **PINS-02**: Clicking an element generates a resilient 5-tier CSS selector prioritizing IDs, data attributes, semantic tags, and hierarchical paths.
- [ ] **PINS-03**: Coordinates are stored as element-relative percentage offsets ($OffsetX, OffsetY$) rather than absolute pixels.
- [ ] **PINS-04**: Injected script uses `ResizeObserver` and scroll listeners to emit real-time position updates to the host overlay, preventing pin drift.
- [ ] **PINS-05**: If a pinned DOM element is removed or missing, the pin remains in the sidebar list with an alert badge and historical snapshot.

### Comment Persistence, Threading & Resolution
- [ ] **COMM-01**: First-time anonymous reviewers are prompted with an inline modal to enter Name and Email upon dropping their first pin.
- [ ] **COMM-02**: Guest identity persists across comments via secure session cookies/localStorage without forcing account sign-up.
- [ ] **COMM-03**: Submitting a comment captures a client-side viewport screenshot and reviewer device metadata (browser, OS, viewport dimensions, device pixel ratio).
- [ ] **COMM-04**: Reviewers and project owners can post threaded replies to any existing annotation pin.
- [ ] **COMM-05**: Reviewers and project owners can mark an annotation as `resolved` or re-open it as `active`.

### Review Canvas UI & Triaging Sidebar
- [ ] **VIEW-01**: Review canvas at `/review/[canvasId]` generates a permanent shareable link accessible without authentication.
- [ ] **VIEW-02**: Toolbar provides a responsive viewport switcher (Desktop 100%, Tablet 768px, Mobile 375px) with animated resizing.
- [ ] **VIEW-03**: Sliding triage sidebar displays all comments with instant text search and status filter pills (`All`, `Active`, `Resolved`).
- [ ] **VIEW-04**: Clicking a comment in the sidebar smoothly scrolls the iframe to the target element and highlights its pin badge.
- [ ] **VIEW-05**: Comment cards display reviewer environment metadata badges (e.g. `Chrome 120 • macOS • 1440x900 • 2x DPI`).

### Quality Assurance & Security Hardening
- [ ] **QUAL-01**: Unit tests verify SSRF blocking logic, element-relative coordinate math calculations, and selector generator algorithms.
- [ ] **QUAL-02**: Integration test covers the core review journey: create project -> open review link -> drop pin as guest -> reply -> resolve comment.
- [ ] **QUAL-03**: API route handlers enforce strict rate limiting and request body validation using Zod.

---

## v2 Requirements (Deferred to Future Milestones)

- **REV-01**: Milestone Canvas Revisions (freezing Revision 1 and creating Revision 2).
- **PAUS-01**: One-click "Pause Commenting" toggle and scheduled feedback deadlines.
- **PRIV-01**: Private team-only comment visibility toggle (`isPrivate: true`).
- **PRES-01**: Live multi-user presence avatars and cursor broadcasts in toolbar.
- **EXPT-01**: One-click ticket export to Jira, Linear, Trello, and Asana.
- **EXPT-02**: Executive summary PDF report export.
- **EXTN-01**: Chrome Extension or Tunnel CLI for reviewing `localhost:3000` and private intranet servers.

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Server-side headless browser queue (Playwright farm) | High RAM/CPU cost and 3-6s latency; client-side capture handles fast snapshots for MVP |
| Video screen recording (Loom-style) | Adds substantial storage overhead and playback complexity; text + visual pin workflow prioritized |
| Two-way CMS / GitHub code writeback | Annotly is a feedback and review tool, not an in-browser IDE or CMS synchronizer |
| Mandatory login wall for external reviewers | Forcing client reviewers to create passwords creates fatal adoption friction |
| Localhost tunneling in cloud proxy | Cloud proxies cannot reach localhost without local daemons or browser extensions; deferred to post-MVP |

---

## Traceability

Which phases cover which requirements.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-03 | Phase 2 | Complete |
| AUTH-01 | Phase 3 | Pending |
| AUTH-02 | Phase 3 | Pending |
| AUTH-03 | Phase 3 | Pending |
| AUTH-04 | Phase 4 | Pending |
| AUTH-05 | Phase 6 | Pending |
| VIEW-01 | Phase 7 | Pending |
| VIEW-02 | Phase 7 | Pending |
| PRXY-01 | Phase 8 | Pending |
| PRXY-02 | Phase 8 | Pending |
| PRXY-03 | Phase 8 | Pending |
| PRXY-04 | Phase 8 | Pending |
| PRXY-05 | Phase 8 | Pending |
| PINS-01 | Phase 9 | Pending |
| PINS-02 | Phase 9 | Pending |
| PINS-03 | Phase 9 | Pending |
| PINS-04 | Phase 9 | Pending |
| PINS-05 | Phase 9 | Pending |
| COMM-01 | Phase 10 | Pending |
| COMM-02 | Phase 10 | Pending |
| COMM-03 | Phase 10 | Pending |
| COMM-04 | Phase 11 | Pending |
| COMM-05 | Phase 11 | Pending |
| VIEW-03 | Phase 11 | Pending |
| VIEW-04 | Phase 11 | Pending |
| VIEW-05 | Phase 11 | Pending |
| QUAL-01 | Phase 14 | Pending |
| QUAL-02 | Phase 14 | Pending |
| QUAL-03 | Phase 14 | Pending |

**Coverage:**
- v1 requirements: 32 total
- Mapped to phases: 32
- Unmapped: 0 ✓

---
*Requirements defined: 2026-10-25*
*Last updated: 2026-10-25 after initial definition*
