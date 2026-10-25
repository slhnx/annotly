# Annotly — Product Delivery Roadmap

## Overview

Annotly is a website-feedback product delivered in sequential, user-visible vertical slices. Each phase completes the relevant UI, interactions, application logic, persistence, permissions, loading/empty/error states, responsive behavior, and tests before moving on. Avoid building a large backend first and postponing the actual product interface until the end.

**Source of truth:** Follow `DESIGN.md` for all visual decisions and `AGENTS.md` for repository conventions, architecture, coding rules, testing expectations, and agent workflow. Read both before implementation and re-read the relevant sections before each phase. Do not invent a parallel design system or override existing project rules.

**Design enforcement**
- Use the existing Annotly design tokens and customized shadcn/ui primitives; do not hardcode new colors, typography, radii, shadows, or spacing when a token/variant exists.
- Preserve the established warm parchment cream (`#f7f4ed`), charcoal (`#1c1c1c`), containment border (`#eceae4`), muted text (`#5f5f5d`), humanist typography, tight headline tracking, and tactile button treatment specified by `DESIGN.md`.
- Reuse shared layouts and components. Keep headings at the weights specified by the design system.
- Every screen must include intentional loading, empty, error, success, disabled, and permission-denied states where relevant.
- Every view must be responsive and keyboard accessible, with visible focus states, labels, and sensible screen-reader semantics.
- Before calling a UI task complete, compare it against `DESIGN.md`, test mobile/tablet/desktop sizes, and verify that controls are functional rather than decorative.
- Follow `AGENTS.md` for file organization, naming, server/client component boundaries, validation, error handling, logging, tests, and prohibited patterns.

## Delivery principles

1. **Build complete slices:** implement the screen, its interaction states, the API/service layer, persistence, authorization, and tests together.
2. **UI before deep integration:** create the page shell and realistic typed mock states first, then connect it to real data and replace mocks. Do not leave the product with only backend endpoints.
3. **No fake functionality:** buttons, menus, filters, forms, and links must work or be explicitly disabled with an explanation.
4. **No broad security shortcuts:** enforce ownership and input validation on the server; client-side hiding is not authorization.
5. **No phase is complete until its acceptance criteria pass.** Keep the checklist and progress table updated.
6. **Preserve the approved architecture and stack** in the existing repository. Do not change libraries or architectural choices without a documented reason and approval.
7. **Do not weaken the proxy threat model:** SSRF controls must account for DNS rebinding, redirects, IPv4/IPv6, and private/reserved address ranges.

## Phase numbering

- Integer phases are planned milestones.
- Decimal phases are reserved for urgent insertions and must be marked `INSERTED`.
- Execute phases in order unless a dependency explicitly requires otherwise.

## Phase summary

- [x] **Phase 1: Repository Foundation, Design System & Shared UI**
- [x] **Phase 2: Public Marketing Site & Landing Page**
- [ ] **Phase 3: Authentication UI, Supabase Auth & Account Lifecycle**
- [ ] **Phase 4: App Shell, Dashboard UI & Project Management**
- [ ] **Phase 5: Project Creation Flow & Project Settings**
- [ ] **Phase 6: Database Model, Ownership & Permission Enforcement**
- [ ] **Phase 7: Review Canvas Shell & Responsive Website Viewports**
- [ ] **Phase 8: Secure Website Proxy & Injected Client Bridge**
- [ ] **Phase 9: Visual Pin Placement & Coordinate Alignment**
- [ ] **Phase 10: Comment Composer, Guest Identity & Screenshot Metadata**
- [ ] **Phase 11: Comment Threads, Resolution & Triage UI**
- [ ] **Phase 12: Settings, Profile, Team/Sharing Controls & Preferences**
- [ ] **Phase 13: Notifications, Feedback States & Product-Wide UX Polish**
- [ ] **Phase 14: Security, Automated Testing, Accessibility & Release Readiness**

---

## Phase 1: Repository Foundation, Design System & Shared UI

**Goal:** Establish a reliable application foundation and a reusable UI system before building individual product screens.

**Depends on:** Nothing.

### Plans
- [x] **01-01 — Repository and environment foundation**
  - Inspect the current repository and follow `AGENTS.md` before changing files.
  - Confirm the Next.js router, TypeScript setup, linting, formatting, test tooling, package manager, and current folder conventions.
  - Add validated environment configuration in the established location (for example, `lib/env.ts`) without exposing server-only secrets to the client.
  - Verify local development, typecheck, lint, and production build commands.
- [x] **01-02 — Design tokens and typography**
  - Read `DESIGN.md` and implement its tokens in the existing global stylesheet/theme setup.
  - Configure the approved fonts and typography scale, including display headline tracking.
  - Configure the shared background, text, muted text, border, focus, shadow, radius, spacing, and surface tokens.
  - Ensure dark/light behavior only if specified by the design system; do not add an unrequested theme.
- [x] **01-03 — Shared shadcn/ui primitives**
  - Configure and style the approved Button, Card, Input, Textarea, Label, Dialog, Sheet, DropdownMenu, Tooltip, Avatar, Badge, Popover, Tabs, Select, Checkbox, Skeleton, Separator, and Alert components as needed.
  - Implement the approved primary, secondary/outline, ghost, surface, and pill variants.
  - Verify focus, hover, active, disabled, invalid, and loading states.
- [x] **01-04 — Shared application utilities**
  - Establish reusable form validation, error presentation, loading skeletons, empty states, confirmation dialogs, toasts, and page/container primitives.
  - Add common route guards and typed response/error conventions consistent with `AGENTS.md`.
- [x] **01-05 — Foundation verification**
  - Verify all shared primitives in a temporary component showcase or existing development route.
  - Check keyboard navigation and responsive behavior.
  - Run lint, typecheck, tests, and production build.

### Acceptance criteria
- The application starts cleanly and environment variables are validated.
- The shared UI uses the exact tokens and variants from `DESIGN.md`.
- No duplicate or conflicting design-token systems are introduced.
- Shared controls have accessible labels and functional interaction states.
- Baseline lint, typecheck, and build pass.

## Phase 2: Public Marketing Site & Landing Page

**Goal:** Complete the public-facing website, not just a hero mockup.

**Depends on:** Phase 1.

### Plans
- [x] **02-01 — Public site layout and navigation**
  - Build the responsive header/navigation, brand link, primary CTA, and mobile navigation.
  - Add footer, legal/support links where required, and consistent page containers.
- [x] **02-02 — Landing page content and visual sections**
  - Build the hero and CTA, product/review preview, feature sections, workflow explanation, social-proof/statistics only when truthful, and closing CTA.
  - Follow the layout, imagery, typography, spacing, and interaction rules in `DESIGN.md` and any approved reference.
  - Do not invent customer logos, testimonials, usage numbers, or unsupported claims.
- [x] **02-03 — Functional preview interactions**
  - Make interactive mockup controls work; label any illustrative data as demo content.
  - Ensure links and CTAs lead to real routes.
- [x] **02-04 — Responsive and metadata pass**
  - Add page metadata, social preview metadata, semantic headings, descriptive image text, and appropriate loading behavior.
  - Test mobile, tablet, laptop, and wide desktop.
- [x] **02-05 — Marketing QA**
  - Verify all links, CTAs, focus states, reduced-motion behavior, image loading, and layout overflow.

### Acceptance criteria
- Landing page is complete at all target viewport sizes.
- No placeholder buttons or fabricated social proof remain.
- Navigation and CTAs work.
- Design review against `DESIGN.md` passes.

## Phase 3: Authentication UI, Supabase Auth & Account Lifecycle

**Goal:** Deliver the full sign-up/sign-in experience and connect it to real authentication.

**Depends on:** Phase 1.

### Plans
- [ ] **03-01 — Authentication page UI**
  - Design and implement sign-up, sign-in, and sign-out states using shared components.
  - Include labels, password visibility where appropriate, field validation, pending submission, inline errors, and success feedback.
  - Add links between sign-in and sign-up; add password reset only if supported by the selected auth configuration.
- [ ] **03-02 — Supabase clients and session handling**
  - Configure browser/server clients and SSR cookie handling according to current project conventions.
  - Add middleware or the current recommended Next.js route protection approach, without treating middleware as the only authorization boundary.
- [ ] **03-03 — Auth integration**
  - Wire forms to Supabase Auth, handle auth errors safely, and persist sessions across refreshes.
  - Redirect authenticated users appropriately and prevent authenticated users from being trapped on auth screens.
- [ ] **03-04 — Auth lifecycle and recovery states**
  - Implement sign-out, expired-session behavior, unauthenticated redirects, and reset/verification flows where configured.
- [ ] **03-05 — Auth tests**
  - Test validation, duplicate account, invalid credentials, refresh persistence, redirects, and expired sessions.

### Acceptance criteria
- Users can sign up, sign in, and sign out.
- Forms handle pending, invalid, and failure states.
- Sessions survive refresh and protected routes behave correctly.
- Server-side data access independently verifies authorization.

## Phase 4: App Shell, Dashboard UI & Project Management

**Goal:** Build the actual authenticated product workspace and project dashboard, with complete screen states.

**Depends on:** Phases 1 and 3. Use typed mock data initially if the database work in Phase 6 is not ready.

### Plans
- [ ] **04-01 — Authenticated application shell**
  - Create the shared dashboard layout, sidebar/top navigation, responsive mobile navigation, content container, account menu, and page title/breadcrumb pattern.
  - Include active navigation state and keyboard-accessible collapse/mobile controls.
- [ ] **04-02 — Dashboard overview UI**
  - Design the overview with a clear primary “new project” action, project/review summary cards only for available metrics, recent projects/activity, and helpful onboarding guidance.
  - Define loading skeleton, first-run empty state, populated state, and error/retry state.
- [ ] **04-03 — Projects list UI**
  - Build project cards or rows with site name, URL, status, last activity, and actions that are supported by the data model.
  - Add search, sorting, and filtering only where they have clear behavior.
  - Implement menus, delete confirmation, and visible action feedback.
- [ ] **04-04 — Project CRUD services and persistence**
  - Add typed server actions/route handlers/service functions consistent with `AGENTS.md`.
  - Persist project creation, listing, editing, and deletion using the approved database layer.
  - Validate all input on the server and verify project ownership for every operation.
- [ ] **04-05 — Connect dashboard to real data**
  - Replace mocks with server data and add refresh/revalidation behavior.
  - Handle empty projects, partial data, API failure, and deleted projects.
- [ ] **04-06 — Dashboard QA**
  - Verify responsive layouts, menu/dialog behavior, sorting/search if implemented, and authorization tests.

### Acceptance criteria
- A signed-in user can reach a complete dashboard and manage their own projects.
- The dashboard has functional loading, empty, error, and populated states.
- Project actions work and are authorized server-side.
- The interface follows `DESIGN.md` and `AGENTS.md`.

## Phase 5: Project Creation Flow & Project Settings

**Goal:** Make project setup understandable and provide a dedicated project settings view.

**Depends on:** Phase 4.

### Plans
- [ ] **05-01 — New project flow UI**
  - Build a dedicated page or dialog consistent with the design system.
  - Collect and validate project name and target website URL.
  - Explain URL requirements and show field-level validation.
  - Include submitting, success, and recoverable error states.
- [ ] **05-02 — Project creation integration**
  - Persist the project, normalize and validate the URL, and enforce ownership.
  - Handle duplicate or invalid project data with useful messages.
- [ ] **05-03 — Project detail/overview page**
  - Build a project-specific overview with site identity, target URL, review link/status, latest comments/activity when available, and a primary action to open the review canvas.
  - Provide a not-found/unauthorized state that does not leak project existence.
- [ ] **05-04 — Project settings view**
  - Add project name and URL editing, copy-share-link action when available, destructive delete action with confirmation, and any supported review access controls.
  - Clearly separate saved and unsaved changes; prevent accidental navigation loss when applicable.
- [ ] **05-05 — Project lifecycle verification**
  - Test create, open, edit, delete, invalid URL, unauthorized mutation, and stale/deleted project paths.

### Acceptance criteria
- Users can create a project from the dashboard and land on its project view.
- Project detail and settings are distinct, discoverable, and usable on mobile.
- Every mutation is validated and owner-authorized on the server.
- Destructive actions require deliberate confirmation.

## Phase 6: Database Model, Ownership & Permission Enforcement

**Goal:** Establish the persistent data model and enforce access rules before exposing collaborative review behavior.

**Depends on:** Phase 1; can proceed alongside UI work in Phases 3–5, but all dependent integrations must pass before Phase 7.

### Plans
- [ ] **06-01 — Database and ORM configuration**
  - Configure the selected PostgreSQL/Supabase database and Prisma ORM only if these match the existing repository architecture.
  - Add migrations and safe deployment instructions.
- [ ] **06-02 — Core schema**
  - Define and relate `User`, `Project`, `Canvas`, `Annotation`, and `AnnotationReply` according to actual product requirements.
  - Add ownership, timestamps, indexes, status fields, and unique identifiers where required.
  - Avoid storing duplicate or sensitive data without a clear purpose.
- [ ] **06-03 — Data access layer**
  - Implement typed repository/service functions and shared input schemas.
  - Centralize authorization and consistent error handling.
- [ ] **06-04 — Permission matrix and adversarial tests**
  - Document owner, authenticated collaborator, and public guest capabilities.
  - Test cross-user reads/writes, guessed IDs, unauthenticated access, and mutation attempts.
  - Ensure public review access exposes only data intended for reviewers.

### Acceptance criteria
- Migrations can be applied reliably in development and deployment.
- All relevant records have correct relationships and indexes.
- Private records cannot be accessed or modified by non-owners.
- Public guest review permissions are explicit and least-privilege.

## Phase 7: Review Canvas Shell & Responsive Website Viewports

**Goal:** Build the core review experience's visual structure before connecting the proxy and annotation engine.

**Depends on:** Phases 4–6.

### Plans
- [ ] **07-01 — Review route and page structure**
  - Build `/review/[canvasId]` with a clear loading shell, invalid/expired link state, and public guest entry.
  - Add the review toolbar, target-site label, share/copy-link action, and exit/back navigation.
- [ ] **07-02 — Viewport controls**
  - Implement Desktop, Tablet (768px), and Mobile (375px) presets, plus a clear selected state.
  - Resize the website viewport smoothly and prevent horizontal page overflow.
- [ ] **07-03 — Canvas container and overlays**
  - Implement the canvas/iframe host region, overlay mounting point, viewport background, and pin layer contract.
  - Show loading, unavailable-site, and retry states.
- [ ] **07-04 — Comment mode and browse mode controls**
  - Add toolbar states for Comment Mode and Browse Mode, with concise explanatory labels and keyboard shortcut display.
  - Wire state to a temporary adapter until the bridge is ready.
- [ ] **07-05 — Canvas responsive and accessibility QA**
  - Verify toolbar usability on small screens, focus order, tooltips, and viewport controls.

### Acceptance criteria
- Review route and layout work with a mocked website adapter before proxy integration.
- Viewport presets work and show the selected viewport clearly.
- All loading, invalid-link, unavailable-site, and retry states exist.
- The canvas structure is ready for the secure proxy and pin overlay.

## Phase 8: Secure Website Proxy & Injected Client Bridge

**Goal:** Load external websites inside the review canvas and securely communicate between the website and host application.

**Depends on:** Phase 7.

### Plans
- [ ] **08-01 — Proxy request validation and SSRF defenses**
  - Validate URL scheme and destination.
  - Resolve and validate IPv4/IPv6 addresses, block loopback/private/link-local/reserved and cloud metadata ranges, and defend against DNS rebinding.
  - Revalidate redirect destinations and cap redirect count, response size, timeouts, and supported content types.
  - Avoid proxying arbitrary protocols or exposing internal response details.
- [ ] **08-02 — Proxy response handling**
  - Strip or safely handle headers that prevent embedding, including relevant framing/CSP headers, only for the proxied response.
  - Set appropriate cache, content-type, timeout, and failure behavior.
  - Ensure the proxy cannot be used as an unrestricted open proxy.
- [ ] **08-03 — HTML and asset rewriting**
  - Parse HTML safely; rewrite root-relative and relevant relative asset URLs.
  - Handle base URLs, scripts, stylesheets, images, and navigation within documented limits.
  - Document unsupported website patterns rather than silently failing.
- [ ] **08-04 — Bridge injection and message contract**
  - Inject `annotly-bridge.js` and define a versioned, typed `postMessage` contract.
  - Validate message origin/source and payload shape; never trust arbitrary messages from the embedded page.
- [ ] **08-05 — Mode behavior**
  - Implement Comment Mode event suppression and Browse Mode navigation/form behavior, including `Alt+C` if retained in the approved requirements.
- [ ] **08-06 — Proxy integration UI**
  - Connect the canvas loading, progress, unsupported-site, timeout, and retry states to real proxy results.
- [ ] **08-07 — Proxy security tests**
  - Test private IPs, IPv6, DNS changes, redirect chains, malformed URLs, large responses, unsupported content, and message spoofing.

### Acceptance criteria
- Supported external websites load inside the canvas and assets resolve as expected.
- Proxy cannot reach internal/private destinations or act as an unrestricted proxy.
- Bridge messages are validated and the mode controls affect the embedded site.
- Failures are visible, recoverable, and do not expose secrets or internal network details.

## Phase 9: Visual Pin Placement & Coordinate Alignment

**Goal:** Let reviewers accurately attach feedback to page elements across scrolling and viewport changes.

**Depends on:** Phase 8.

### Plans
- [ ] **09-01 — Hover targeting**
  - Highlight the hovered DOM element in Comment Mode using a nonintrusive indicator consistent with `DESIGN.md`.
  - Ensure the highlight does not alter the target page's layout.
- [ ] **09-02 — Resilient selector generation**
  - Generate a five-tier selector strategy using stable IDs, useful attributes, structural selectors, and fallback matching.
  - Treat selectors as best-effort anchors, not permanent guarantees.
- [ ] **09-03 — Coordinate math**
  - Store element-relative percentage offsets and convert them into canvas coordinates.
  - Handle zero-sized elements, transformed content, zoom, device-pixel ratio, and iframe/canvas offsets.
- [ ] **09-04 — Re-anchoring**
  - Reposition pins on scroll, resize, and relevant DOM changes using throttled listeners and `ResizeObserver` where appropriate.
  - Avoid excessive observer work and layout thrashing.
- [ ] **09-05 — Pin overlay UI**
  - Render numbered pins with active, selected, resolved, and missing-target states.
  - Add hover/focus treatment and connect pin selection to the sidebar/thread panel.
- [ ] **09-06 — Pin interaction tests**
  - Test selector fallback, nested elements, dynamic content, scrolling, resizing, and deleted/hidden targets.

### Acceptance criteria
- Pins remain aligned through expected scroll and resize scenarios.
- A missing target is clearly represented and does not break the canvas.
- Pin states are understandable and keyboard-accessible where possible.
- Coordinate and selector tests pass.

## Phase 10: Comment Composer, Guest Identity & Screenshot Metadata

**Goal:** Provide a polished and reliable way to submit the first comment and subsequent comments.

**Depends on:** Phase 9.

### Plans
- [ ] **10-01 — Guest identity UI**
  - Create an inline modal or lightweight form requesting reviewer name and email at the appropriate point in the flow.
  - Explain why the information is requested and how it is used.
  - Persist identity only as required by the product and disclosed privacy behavior.
- [ ] **10-02 — Comment composer UI**
  - Build the pin-linked composer with text validation, submit/cancel controls, pending state, and clear error recovery.
  - Prevent accidental duplicate submissions.
- [ ] **10-03 — Screenshot capture and metadata**
  - Implement client-side screenshot capture only where technically supported and permitted.
  - Collect only necessary environment metadata (browser/OS/viewport/DPR); avoid collecting unnecessary fingerprinting data.
  - Handle capture failure without losing the comment.
- [ ] **10-04 — Comment persistence API**
  - Persist annotations, selector/coordinate data, reviewer identity, optional screenshot reference, and approved metadata.
  - Validate and rate-limit guest submissions; enforce payload size limits.
- [ ] **10-05 — Comment submission states**
  - Show success, pending, offline/failure, retry, and duplicate-submission protection states.
  - Ensure retries do not accidentally create duplicate comments.
- [ ] **10-06 — Comment composer tests**
  - Test validation, guest identity persistence, failed screenshot capture, request failure, and rate-limit responses.

### Acceptance criteria
- A guest can submit feedback without creating an account.
- Comment creation is resilient to screenshot failure and recoverable network errors.
- Inputs and collected metadata are validated and limited.
- Submission feedback is clear and accessible.

## Phase 11: Comment Threads, Resolution & Triage UI

**Goal:** Complete the reviewer's comment discussion workflow and the owner's triage experience.

**Depends on:** Phase 10.

### Plans
- [ ] **11-01 — Thread panel/popover UI**
  - Display the selected pin's comment thread with author/avatar, timestamp, replies, and status.
  - Match card and popover specifications from `DESIGN.md`.
- [ ] **11-02 — Reply composer**
  - Add reply creation with validation, loading, success, and failure states.
  - Apply guest identity rules consistently.
- [ ] **11-03 — Triage sidebar**
  - Build the responsive sidebar/Sheet with comment cards, search, and All/Active/Resolved filters.
  - Show useful context such as page target, reviewer, status, and time where available.
- [ ] **11-04 — Pin/thread/sidebar synchronization**
  - Selecting a pin opens its thread and selects the corresponding sidebar item.
  - Selecting a sidebar item scrolls to the target and highlights the pin.
  - Keep selected state synchronized across viewport changes.
- [ ] **11-05 — Resolution lifecycle**
  - Implement active/resolved transitions with clear labels, undo/reopen behavior if supported, and visible feedback.
  - Resolved pins should dim or hide according to the approved UX.
- [ ] **11-06 — Thread persistence and authorization**
  - Persist replies and resolution state; enforce owner/guest permissions server-side.
  - Define whether guests can reply or resolve, and enforce that policy consistently.
- [ ] **11-07 — Triage QA**
  - Test search, filters, replies, resolution, stale data, and mobile Sheet behavior.

### Acceptance criteria
- Reviewers can read and reply to permitted threads.
- Owners can triage, filter, and resolve comments according to the permission model.
- Canvas pins, thread view, and sidebar stay synchronized.
- Empty, error, loading, and no-results states are complete.

## Phase 12: Settings, Profile, Team/Sharing Controls & Preferences

**Goal:** Provide a complete settings experience for account and project configuration without exposing controls the backend cannot support.

**Depends on:** Phases 3–6 and 11.

### Plans
- [ ] **12-01 — Settings navigation and layout**
  - Create a discoverable settings section with clear subsections and responsive navigation.
  - Keep global account settings distinct from project-specific settings.
- [ ] **12-02 — Profile settings UI**
  - Show and edit supported profile fields such as display name and avatar.
  - Include save/cancel behavior, validation, pending state, and success/error feedback.
- [ ] **12-03 — Account and security settings**
  - Add supported password/email change or auth-provider management flows.
  - Implement sign-out and account deletion only with explicit confirmation and correct server-side cleanup.
  - Do not expose settings that the chosen auth provider cannot actually implement.
- [ ] **12-04 — Project settings integration**
  - Link to the project settings from the project detail view.
  - Ensure URL/name edits, share-link controls, and delete actions use the same consistent design and permission rules.
- [ ] **12-05 — Sharing and access controls**
  - Implement supported review-link controls, such as link status/revocation or regeneration, only if the data model supports them.
  - Explain the access implications of public review links.
- [ ] **12-06 — Preferences**
  - Add only real, persisted preferences that the product supports; do not create decorative toggles.
- [ ] **12-07 — Settings tests**
  - Test edits, invalid data, cancellation, authorization, link access changes, and destructive flows.

### Acceptance criteria
- Settings pages are discoverable, responsive, and visually consistent.
- Each setting is backed by real behavior and correct persistence.
- Account-wide and project-specific settings are clearly separated.
- Destructive and access-changing actions are confirmed and authorized.

## Phase 13: Notifications, Feedback States & Product-Wide UX Polish

**Goal:** Make the whole product feel coherent and trustworthy across common and failure paths.

**Depends on:** Phases 2–12.

### Plans
- [ ] **13-01 — Consistent user feedback**
  - Standardize toasts, inline validation, banners, confirmation dialogs, and retry patterns using shared components.
  - Avoid success messages when an operation has not actually succeeded.
- [ ] **13-02 — Notification behavior**
  - Add in-app or email notifications only if they are in scope and the necessary delivery/configuration exists.
  - Otherwise document them as deferred; do not fake notifications.
- [ ] **13-03 — Loading, empty, error, and recovery audit**
  - Audit every route and important component for initial loading, empty data, failed requests, permission denial, not-found states, and recovery paths.
- [ ] **13-04 — Responsive and accessibility audit**
  - Check keyboard navigation, focus trapping, color contrast, form labels, semantic structure, reduced motion, and screen-reader names.
  - Verify mobile, tablet, desktop, and wide-screen layouts.
- [ ] **13-05 — UX consistency review**
  - Check copy, button labels, destructive-action wording, navigation consistency, page titles, spacing, and component reuse against `DESIGN.md`.
- [ ] **13-06 — Performance review**
  - Audit unnecessary client components, large bundles, image behavior, expensive canvas updates, and avoidable re-renders.

### Acceptance criteria
- Important routes have consistent and useful feedback/recovery states.
- No dead controls, misleading metrics, or fake notification features remain.
- Responsive and accessibility checks pass to the extent supported by the test setup.
- Performance regressions are addressed or documented.

## Phase 14: Security, Automated Testing, Accessibility & Release Readiness

**Goal:** Verify the complete product, resolve critical risks, and prepare a reproducible release.

**Depends on:** All previous phases.

### Plans
- [ ] **14-01 — Unit and integration tests**
  - Test validation schemas, selector generation, coordinate math, proxy guards, auth, permissions, comment threading, and resolution.
- [ ] **14-02 — End-to-end user journeys**
  - Test sign up → sign in → create project → open project → copy/open review link → submit guest annotation → reply → resolve comment → edit settings.
  - Include empty, invalid, unauthorized, and failure paths.
- [ ] **14-03 — Security hardening**
  - Review SSRF protection, redirect handling, DNS rebinding, postMessage validation, rate limiting, payload size, XSS risks, public-link exposure, and access boundaries.
  - Verify no server secrets are shipped to client bundles or logged.
- [ ] **14-04 — Operational readiness**
  - Document environment variables, local setup, database migration and rollback procedure, deployment configuration, and known proxy limitations.
  - Confirm logging is useful without leaking private content or secrets.
- [ ] **14-05 — Final UI and design review**
  - Compare each route with `DESIGN.md`; confirm shared primitives are used consistently and no one-off styles undermine the system.
  - Run responsive, keyboard, contrast, and reduced-motion checks.
- [ ] **14-06 — Release gates**
  - Run formatting, lint, typecheck, automated tests, and production build.
  - Fix critical/high-severity issues before release; document known limitations and deferred scope.

### Acceptance criteria
- The complete main user journey passes end-to-end.
- Security and permission tests pass.
- Formatting, lint, typecheck, tests, and production build pass.
- Setup and deployment documentation is sufficient for another developer to reproduce the release.
- No critical/high-severity security, data-loss, or blocking UX issue remains open.

---

## Cross-phase Definition of Done

A phase is complete only when all applicable items below are true:

- [ ] The phase follows `AGENTS.md` and the relevant `DESIGN.md` rules.
- [ ] UI, business logic, persistence, and authorization are integrated for the scope of the phase.
- [ ] Loading, empty, error, success, disabled, and permission states are implemented where applicable.
- [ ] All controls work, or are clearly disabled with a reason.
- [ ] Responsive behavior and keyboard accessibility have been checked.
- [ ] Relevant unit, integration, or end-to-end tests pass.
- [ ] Lint, typecheck, and build pass, or any existing baseline failure is documented and isolated.
- [ ] Documentation and the progress table are updated.
- [ ] No unrelated refactor or unapproved dependency/architecture change has slipped in.

## Progress

| Phase | Plans | Status |
|---|---:|---|
| 1. Repository Foundation, Design System & Shared UI | 5/5 | Complete |
| 2. Public Marketing Site & Landing Page | 5/5 | Complete |
| 3. Authentication UI, Supabase Auth & Account Lifecycle | 0/5 | Not started |
| 4. App Shell, Dashboard UI & Project Management | 0/6 | Not started |
| 5. Project Creation Flow & Project Settings | 0/5 | Not started |
| 6. Database Model, Ownership & Permission Enforcement | 0/4 | Not started |
| 7. Review Canvas Shell & Responsive Website Viewports | 0/5 | Not started |
| 8. Secure Website Proxy & Injected Client Bridge | 0/7 | Not started |
| 9. Visual Pin Placement & Coordinate Alignment | 0/6 | Not started |
| 10. Comment Composer, Guest Identity & Screenshot Metadata | 0/6 | Not started |
| 11. Comment Threads, Resolution & Triage UI | 0/7 | Not started |
| 12. Settings, Profile, Team/Sharing Controls & Preferences | 0/7 | Not started |
| 13. Notifications, Feedback States & Product-Wide UX Polish | 0/6 | Not started |
| 14. Security, Automated Testing, Accessibility & Release Readiness | 0/6 | Not started |

**Roadmap defined:** 2026-10-25  
**Last updated:** 2026-10-25 — reorganized into complete UI + logic + persistence vertical slices.

**Important source note:** This roadmap uses the existing roadmap's stated stack and design constraints where provided. The actual contents of `DESIGN.md` and `AGENTS.md` were not included in the supplied roadmap file, so those files must be read in the repository before implementation; their specific rules take precedence over any summary here.