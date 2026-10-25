# Annotly — Feature Classification & Scope Boundaries

## Feature Matrix

This document defines the core feature set for Annotly, categorizing functionality into MVP Table Stakes, Post-MVP Differentiators, and Anti-Features in accordance with the reverse engineering research in `docs/research/`.

---

## 1. Table Stakes (Must Have for MVP)

These features are essential for a working product. Omitting any of these breaks the core review workflow.

### Project & Review Links
- **PROJ-01:** Project owner can create a new review project by entering a target website URL (e.g. `https://my-staging-site.com`).
- **PROJ-02:** System provisions a persistent unique review link (e.g. `/review/[canvasId]`).
- **PROJ-03:** Shareable review link allows anyone with the link to view the website and existing comments without requiring an account.

### Proxy & Injected Frame
- **PRXY-01:** Upstream website is fetched and framed via Next.js reverse proxy, stripping blocking headers (`X-Frame-Options`, `Content-Security-Policy`).
- **PRXY-02:** Strict SSRF protection blocks requests to loopback (`127.0.0.1`), RFC1918 private IP subnets, and cloud metadata services (`169.254.169.254`).
- **PRXY-03:** Injected client bridge script communicates bidirectionally with the canvas host via HTML5 `postMessage`.
- **PRXY-04:** Toolbar supports explicit toggling between **Comment Mode** (clicks drop pins) and **Browse Mode** (native clicks navigate links/forms) with `Alt+C` keyboard shortcut.

### Pin Placement & Coordinate Math
- **PINS-01:** In Comment Mode, hovering over any DOM element renders an outline bounding box.
- **PINS-02:** Clicking an element generates a resilient 5-tier CSS selector and calculates percentage offsets relative to the element's bounding rect ($OffsetX, OffsetY$).
- **PINS-03:** Pin positions dynamically re-anchor during window resize and scrolling using `ResizeObserver` and scroll listeners inside the iframe.
- **PINS-04:** Missing elements (due to DOM changes or SPA routing) trigger an inactive warning badge without losing the comment or its metadata.

### Comment Threads & Guest Onboarding
- **COMM-01:** First-time anonymous reviewers are prompted with an inline modal to enter their Name and Email upon dropping their first pin.
- **COMM-02:** Guest reviewer profile is remembered in secure session cookies/localStorage for subsequent comments.
- **COMM-03:** Submitting a comment captures a client-side viewport screenshot and client environment metadata (browser, OS, viewport dimensions, device pixel ratio).
- **COMM-04:** Users and guests can post threaded replies to existing annotations.
- **COMM-05:** Project owners and reviewers can toggle comment status between `active` and `resolved` ("Inbox Zero" workflow), dimming or hiding resolved pins from the canvas.

### Canvas UI & Sidebar
- **VIEW-01:** Responsive viewport switcher allows previewing and commenting across Desktop, Tablet, and Mobile viewport presets.
- **VIEW-02:** Sliding triage sidebar displays all comments with real-time text search and status filter pills (`All`, `Active`, `Resolved`).
- **VIEW-03:** Clicking a comment card in the sidebar scrolls the iframe to the pinned element and highlights its pin badge.

---

## 2. Differentiators (v2 / Post-MVP)

High-value enhancements deferred to subsequent milestones:
- **Canvas Revisions (Milestone Versioning):** Freezing "Revision 1" feedback and starting a fresh "Revision 2" review cycle on updated code.
- **Pause Commenting & Deadlines:** One-click toggle to make a canvas read-only during deployments or after a client approval deadline.
- **Private Team-Only Comments:** Visibility flag (`isPrivate: true`) hiding internal team discussions from external client guests.
- **Multi-User Live Presence:** Real-time collaborator avatars and live cursor indicators in the top toolbar.
- **PMS & Ticket Exports:** One-click sync to Jira, Linear, Trello, and Asana with attached screenshots and metadata.
- **Executive PDF Export:** Formatted PDF report summarizing all open/resolved issues for client sign-off.
- **Annotly Tunnel CLI / Chrome Extension:** Localhost (`localhost:3000`) and private intranet review without public staging URLs.

---

## 3. Anti-Features (Deliberately NOT Building)

Explicitly excluded to protect simplicity, security, and scope:
- **No Video / Loom-style Screen Recording:** Keeps bundle size, storage, and complexity lean for text + visual pin workflows.
- **No Direct CMS / Code Sync:** Annotly does not attempt to commit code changes back to GitHub or update Webflow CMS automatically.
- **No Heavy Server-Side Chromium Farm:** Avoids high operating costs and multi-second latency for MVP screenshots.
- **No Mandatory Account Wall for Reviewers:** Requiring clients to sign up kills external adoption.
