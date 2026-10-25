# Roadmap: Annotly

## Overview

Annotly is delivered through 7 sequential phases that build from a rock-solid design system and landing page foundation, through Supabase authentication and database permissions, to the core cross-origin proxy, DOM pin placement engine, comment persistence with client-side screenshots, responsive review canvas, and end-to-end security verification.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3...): Planned milestone work
- Decimal phases (2.1, 2.2...): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Foundation, Design System & Landing Page** - Establish repo structure, validated env schema, warm cream & charcoal design system, and marketing landing page.
- [ ] **Phase 2: Authentication, Database & Project Permissions** - Implement Supabase Auth, PostgreSQL schema with Prisma ORM, user profiles, and project CRUD with ownership boundaries.
- [ ] **Phase 3: Reverse Proxy & Injected Client Bridge** - Next.js Route Handler reverse proxy with SSRF defense, framing header stripping, HTML/asset rewriting, and `annotly-bridge.js` postMessage bus.
- [ ] **Phase 4: Visual Pin Placement & Coordinate Alignment** - 5-tier resilient CSS selector generation, element-relative percentage offset math, and ResizeObserver/scroll synchronizer.
- [ ] **Phase 5: Comment Persistence, Threading & Resolution** - Frictionless guest reviewer capture, comment creation with viewport screenshot capture, threaded replies, and active/resolved status lifecycle.
- [ ] **Phase 6: Review Canvas UI, Responsive Viewports & Triaging Sidebar** - Canvas host application at `/review/[canvasId]` with permanent share links, responsive viewport switcher (Desktop, Tablet, Mobile), and sliding triage sidebar with search/filter.
- [ ] **Phase 7: End-to-End Verification, Security Hardening & Polish** - Comprehensive test suite (SSRF, coordinate math, full user journey), rate limiting, and performance auditing.

## Phase Details

### Phase 1: Foundation, Design System & Landing Page
**Goal**: Establish the repository architecture, environment validation, Lovable-inspired design tokens (`DESIGN.md`), customized shadcn/ui primitives, and an editorial marketing landing page.
**Depends on**: Nothing (first phase)
**Requirements**: [FOUND-01, FOUND-02, FOUND-03, FOUND-04]
**Success Criteria** (what must be TRUE):
  1. The application boots cleanly with runtime environment variable validation (`lib/env.ts`) and zero typecheck errors.
  2. The visual styling strictly reflects `DESIGN.md`: warm parchment background (`#f7f4ed`), charcoal typography (`#1c1c1c`), 1px `#eceae4` containment borders, and tactile inset shadow dark buttons.
  3. The marketing landing page presents a responsive hero, interactive review preview mockup, feature showcase, and header navigation.
  4. Core shadcn/ui primitives (Button, Dialog, Sheet, DropdownMenu, Tooltip, Input) are configured and styled with Annotly tokens.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Environment schema validation, design system theme tokens (`globals.css`), and font configuration.
- [ ] 01-02: Core shadcn/ui component primitives customized to Annotly theme.
- [ ] 01-03: Editorial marketing landing page with interactive demonstration mockup and responsive navigation.

### Phase 2: Authentication, Database & Project Permissions
**Goal**: Integrate Supabase Auth and PostgreSQL with Prisma ORM to provide user registration, login, session persistence, and project CRUD with strict ownership boundaries.
**Depends on**: Phase 1
**Requirements**: [AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05]
**Success Criteria** (what must be TRUE):
  1. Users can register with email/password, log in, and maintain persistent authenticated sessions across refreshes via Next.js middleware.
  2. Prisma schema defines `User`, `Project`, `Canvas`, `Annotation`, and `AnnotationReply` models with automated migrations.
  3. Authenticated users can create, view, and delete their own review projects in a dashboard interface.
  4. Non-owners are denied access to view or mutate other users' private project records at the server boundary.
**Plans**: 3 plans

Plans:
- [ ] 02-01: Supabase client, SSR cookie middleware, and auth routes (login, signup, signout).
- [ ] 02-02: Prisma schema definition, Supabase PostgreSQL connection, and user profile sync.
- [ ] 02-03: Project management dashboard, project CRUD service layer, and ownership authorization guards.

### Phase 3: Reverse Proxy & Injected Client Bridge
**Goal**: Build the Next.js Route Handler reverse proxy that fetches target websites, strips framing headers, blocks SSRF attempts, rewrites asset URLs, and injects the communication bridge.
**Depends on**: Phase 2
**Requirements**: [PRXY-01, PRXY-02, PRXY-03, PRXY-04, PRXY-05]
**Success Criteria** (what must be TRUE):
  1. External websites that set `X-Frame-Options: DENY` or CSP `frame-ancestors` load successfully without browser clickjacking errors inside the proxy iframe.
  2. Requests targeting localhost, private subnets (10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12), or cloud metadata endpoints (`169.254.169.254`) are rejected with 403 Forbidden.
  3. Root-relative assets (`/styles.css`, `/logo.png`) resolve correctly via base tag injection and asset rewriting.
  4. The injected `annotly-bridge.js` establishes a two-way postMessage handshake with the canvas host.
  5. Reviewers can toggle between Comment Mode (suppressing native navigation) and Browse Mode (enabling native links and forms) using the toolbar or `Alt+C`.
**Plans**: 3 plans

Plans:
- [ ] 03-01: Next.js Reverse Proxy Route Handler with DNS resolution SSRF filtering and header stripping.
- [ ] 03-02: Upstream HTML parser, `<base>` injection, asset rewriting, and bridge script injector.
- [ ] 03-03: `annotly-bridge.js` client runtime with postMessage bus and Comment vs Browse mode event suppression.

### Phase 4: Visual Pin Placement & Coordinate Alignment
**Goal**: Implement the DOM interaction engine that generates resilient selectors, calculates element-relative percentage offsets, and dynamically repositions pins during scroll and resize.
**Depends on**: Phase 3
**Requirements**: [PINS-01, PINS-02, PINS-03, PINS-04, PINS-05]
**Success Criteria** (what must be TRUE):
  1. Hovering over any DOM element in Comment Mode highlights its exact bounding box with a clean indicator.
  2. Clicking an element computes percentage-based coordinates ($OffsetX, OffsetY$) relative to the element's bounding rect, and generates a resilient 5-tier selector.
  3. Resizing the viewport or scrolling the page recalculates pin screen coordinates via `ResizeObserver` and scroll listeners without visual pin drift.
  4. If an annotated element is removed or hidden in the DOM, the pin transitions to an inactive state in the sidebar with an alert badge without breaking the canvas overlay.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Resilient 5-tier CSS selector generator and element hover bounding box indicator.
- [ ] 04-02: Element-relative percentage offset math and canvas overlay coordinate conversion.
- [ ] 04-03: `ResizeObserver` and throttled scroll listener for dynamic pin re-anchoring and missing element handling.

### Phase 5: Comment Persistence, Threading & Resolution
**Goal**: Enable frictionless guest reviewer onboarding, comment submission with client-side screenshot capture, threaded discussions, and comment resolution lifecycle.
**Depends on**: Phase 4
**Requirements**: [COMM-01, COMM-02, COMM-03, COMM-04, COMM-05]
**Success Criteria** (what must be TRUE):
  1. An anonymous reviewer clicking to drop their first pin is prompted with an inline modal for Name and Email, which persists across subsequent comments via session cookies/localStorage.
  2. Submitting a comment captures a client-side viewport screenshot via canvas rasterization and records reviewer metadata (browser, OS, viewport size, DPR).
  3. Reviewers and project owners can post threaded replies to any annotation pin.
  4. Comments can be toggled between `active` and `resolved` ("Inbox Zero"), with resolved pins dimming or hiding on the canvas overlay.
**Plans**: 3 plans

Plans:
- [ ] 05-01: Guest identity capture modal, session cookie management, and avatar generation.
- [ ] 05-02: Client-side in-frame viewport screenshot capture and reviewer environment metadata collection.
- [ ] 05-03: Annotation and reply persistence API routes, Prisma queries, and status resolution toggle.

### Phase 6: Review Canvas UI, Responsive Viewports & Triaging Sidebar
**Goal**: Build the full review canvas application with permanent shareable review links, responsive viewport switcher, and a sliding triage sidebar.
**Depends on**: Phase 5
**Requirements**: [VIEW-01, VIEW-02, VIEW-03, VIEW-04, VIEW-05]
**Success Criteria** (what must be TRUE):
  1. The review canvas at `/review/[canvasId]` generates a permanent shareable link that loads for any reviewer without requiring sign-in.
  2. The toolbar includes a responsive viewport switcher with presets (Desktop 100%, Tablet 768px, Mobile 375px) that resizes the iframe smoothly.
  3. The sliding triage sidebar displays all comments with instant text search, status filter pills (`All`, `Active`, `Resolved`), and reviewer metadata badges.
  4. Clicking any comment card in the sidebar scrolls the iframe to the target element and highlights its pin badge.
**Plans**: 3 plans

Plans:
- [ ] 06-01: `/review/[canvasId]` host page layout, persistent share link generator, and public access routing.
- [ ] 06-02: Responsive viewport switcher with Desktop, Tablet, and Mobile presets and smooth width resizing.
- [ ] 06-03: Sliding triage sidebar with instant search, status filter pills, comment cards, and pin scroll-to-element integration.

### Phase 7: End-to-End Verification, Security Hardening & Polish
**Goal**: Validate the complete product experience with comprehensive automated tests, SSRF and auth permission security auditing, rate limiting, and performance checks.
**Depends on**: Phase 6
**Requirements**: [QUAL-01, QUAL-02, QUAL-03]
**Success Criteria** (what must be TRUE):
  1. Unit tests pass for SSRF blocking, coordinate math calculations, and selector generation algorithms.
  2. End-to-end integration test passes for the entire user flow: create project -> open review link -> drop guest pin with screenshot -> reply -> resolve comment.
  3. Rate limiting and input validation schemas are verified against abuse and injection risks.
  4. Production build (`npm run build`) and linting (`npm run lint`, `npm run typecheck`) pass with zero errors.
**Plans**: 2 plans

Plans:
- [ ] 07-01: Unit and integration tests for SSRF guard, coordinate math, selector generator, and auth boundaries.
- [ ] 07-02: End-to-end user journey test suite, rate limiting, and production build verification.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation, Design System & Landing Page | 0/3 | Not started | - |
| 2. Authentication, Database & Project Permissions | 0/3 | Not started | - |
| 3. Reverse Proxy & Injected Client Bridge | 0/3 | Not started | - |
| 4. Visual Pin Placement & Coordinate Alignment | 0/3 | Not started | - |
| 5. Comment Persistence, Threading & Resolution | 0/3 | Not started | - |
| 6. Review Canvas UI, Responsive Viewports & Triaging Sidebar | 0/3 | Not started | - |
| 7. End-to-End Verification, Security Hardening & Polish | 0/2 | Not started | - |

---
*Roadmap defined: 2026-10-25*
*Last updated: 2026-10-25 after initialization*
