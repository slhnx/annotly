<!-- GSD:project-start source:PROJECT.md -->

## Project

**Annotly**

Annotly is a website-feedback and visual collaboration SaaS designed for web agencies, developers, designers, and their clients. Project owners can input any website URL to generate an interactive review canvas with shareable links, enabling reviewers to place visual annotations on live websites, discuss feedback in threaded conversations, and resolve comments without requiring browser extensions or client account creation.

**Core Value:** The single most critical capability of Annotly is the frictionless, zero-install visual review loop: anyone with a review link can point, click on any website element, and leave an anchored, context-rich comment that stays aligned across viewports and devices.

### Constraints

- **Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Supabase Auth, PostgreSQL via Prisma ORM.
- **Framing Security:** Target websites frequently enforce `X-Frame-Options: DENY` and CSP `frame-ancestors`; framing must be handled through a dedicated Next.js reverse proxy route with SSRF protection.
- **Pin Coordinate Math:** Absolute pixel coordinates cannot be used due to responsive layouts and text reflow; pins must store element-relative percentage offsets.
- **Guest Friction:** External clients will not install browser extensions or create passwords; zero-install and frictionless guest commenting are mandatory.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Executive Summary

## 1. Core Framework & UI Foundation

| Layer | Selection | Version / Pattern | Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | `16.4.2` | Server Component performance, React 19 streaming, modular route groups (`(marketing)`, `(auth)`, `(dashboard)`, `review/[canvasId]`), robust Route Handlers for the reverse proxy. |
| **Language** | **TypeScript** | `^5.x` | Strict type safety across database models, API contracts, and the cross-frame `postMessage` protocol. Zero `any`. |
| **React Runtime** | **React & React DOM** | `19.3.1` | Native support for Actions, optimistic UI transitions, and modern Server Components. |
| **Styling** | **Tailwind CSS v4** | `^4.x` | Modern CSS-first configuration via `@import "tailwindcss"` and theme variables, zero runtime overhead. |
| **Design System** | **DESIGN.md Theme (Cream & Charcoal)** | Custom tokens | Warm parchment background (`#f7f4ed`), organic charcoal text (`#1c1c1c`), opacity-based neutral hierarchy, subtle 1px `#eceae4` containment borders, tactile button inset shadows. |
| **UI Primitives** | **shadcn/ui + Radix / Base UI** | Latest | Accessible, headless primitives (Dialogs, Dropdowns, Sheets, Tooltips, Tabs, Popovers) customized to Annotly's warm aesthetic. |
| **Icons** | **Lucide React** | `^1.61.0` | Consistent, lightweight SVG icon set for toolbar actions, modes, status indicators, and pins. |

## 2. Authentication & Data Layer

| Component | Technology | Rationale & Configuration |
| :--- | :--- | :--- |
| **Authentication** | **Supabase Auth** (`@supabase/ssr`, `@supabase/supabase-js`) | Battle-tested session management, secure cookie handling with Next.js App Router middleware, password reset, email verification, and OAuth extensibility. |
| **Database** | **Supabase PostgreSQL** | Hosted relational database with high availability, transactional integrity, JSONB support for annotation metadata, and seamless connection pooling. |
| **ORM / Data Access** | **Prisma ORM** (`@prisma/client`, `prisma`) | Prescribes type-safe database queries, automated migrations, explicit relations, and domain-layer encapsulation as mandated by `AGENTS.md`. Database operations are kept behind dedicated feature service boundaries. |
| **Validation** | **Zod** (`zod`) | Runtime schema validation for API request bodies, proxy query params, guest session cookies, and cross-frame postMessage payloads. |

## 3. Review Canvas & Cross-Origin Proxy Architecture

| Component | Implementation | Details |
| :--- | :--- | :--- |
| **Reverse Proxy** | **Next.js Route Handler** (`/api/proxy/[...path]`) | Proxies upstream HTTP/HTTPS requests to bypass browser clickjacking and framing blocks: <br>• Strips `X-Frame-Options` and `Content-Security-Policy` (`frame-ancestors`).<br>• Enforces strict SSRF defense (DNS resolution checks against loopback `127.0.0.1`, RFC1918 private subnets, and cloud metadata IPs `169.254.169.254`).<br>• Rewrites root-relative URLs using `<base href="...">` and relative asset paths.<br>• Injects client bridge script before `</body>`. |
| **Injected Bridge** | **Annotly Bridge Script** (`public/scripts/annotly-bridge.js`) | Lightweight vanilla script running inside the proxied iframe:<br>• Tracks DOM clicks, hovers, text selection.<br>• Generates 5-tier resilient CSS selectors.<br>• Calculates element-relative percentage offsets: $OffsetX = \frac{clickX - rect.left}{rect.width} \times 100$.<br>• Emits position updates via `ResizeObserver` and scroll listeners.<br>• Suppresses native link clicks during Comment Mode while enabling full interactivity during Browse Mode. |
| **Cross-Frame Bus** | **HTML5 postMessage Protocol** | Bi-directional, type-safe messaging bus between parent canvas host and child iframe. Validates origin and message shape on both sides. |

## 4. Screenshot Capture & Storage

| Component | Strategy | Details |
| :--- | :--- | :--- |
| **In-Frame Capture** | **Client-Side HTML5 Canvas Rasterization** | Fast (<500ms) capture generated directly in the reviewer's browser at the moment a pin is dropped. Zero server rendering latency or infrastructure cost. |
| **Image Storage** | **Supabase Storage** (or S3-compatible bucket) | Captured screenshots and reviewer file attachments are stored in an authenticated bucket with CDN delivery, saving URLs on the `Annotation` model. |
| **Graceful Fallback** | **Metadata + Selector Preservation** | If browser canvas security blocks rasterization (tainted canvas), the pin is still created with full metadata and element coordinates, displaying a clean "Snapshot unavailable" state without interrupting the user. |

## 5. What NOT to Use (Anti-Stack Decisions)

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.

### Mandatory Phase Branching Protocol
Whenever executing a new phase through GSD (e.g., `/gsd-execute-phase <N>`):
1. **Commit All Changes First:** Verify `git status` is clean. All previous work must be committed.
2. **Create New Phase Branch:** Branch off `main` as `phase-<N>-<slug>` (e.g., `phase-3-auth`).
3. **Publish Upstream Immediately:** Push the branch to the remote with tracking (`git push -u origin <branch-name>`).
4. **Checkout & Execute:** Ensure the active branch is the new phase branch before making any edits.

### Mandatory Inspiration & Reference Design Policy
Whenever an inspiration file, design mockup, screenshot, or reference image is provided:
1. **Do NOT fully copy:** Treat external designs as conceptual/layout inspiration only. Never copy foreign colors, arbitrary drop shadows, or generic fonts.
2. **Strictly enforce `DESIGN.md`:** Adapt all structures to Annotly's design system tokens (warm cream `#f7f4ed`, organic charcoal `#1c1c1c`, Bricolage Grotesque headings, Inter body, 1px `#eceae4` containment borders, tactile inset shadows).
3. **Rephrase content for Annotly:** Never copy third-party, foreign, or placeholder copy verbatim (e.g. personal finance, crypto, fitness). Contextualize and rewrite all headlines, descriptions, button labels, and microcopy specifically for Annotly's website review platform.

### Mandatory User-Controlled Commit Protocol
- **Do NOT commit after every prompt or conversational turn.**
- Keep changes in the working tree for review, testing, and rapid iteration.
- **Only commit when the user explicitly instructs to commit** (e.g. "commit these changes", "commit and push", etc.).
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
