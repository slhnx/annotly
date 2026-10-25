# Annotly — Stack Research & Technical Architecture

## Executive Summary
Annotly is built as a modular, type-safe visual collaboration and website-feedback SaaS. This document defines the prescribed technical stack and tooling, aligning with the project's engineering standards (`AGENTS.md`), design system specification (`DESIGN.md`), and the user's architectural choices.

---

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

---

## 2. Authentication & Data Layer

| Component | Technology | Rationale & Configuration |
| :--- | :--- | :--- |
| **Authentication** | **Supabase Auth** (`@supabase/ssr`, `@supabase/supabase-js`) | Battle-tested session management, secure cookie handling with Next.js App Router middleware, password reset, email verification, and OAuth extensibility. |
| **Database** | **Supabase PostgreSQL** | Hosted relational database with high availability, transactional integrity, JSONB support for annotation metadata, and seamless connection pooling. |
| **ORM / Data Access** | **Prisma ORM** (`@prisma/client`, `prisma`) | Prescribes type-safe database queries, automated migrations, explicit relations, and domain-layer encapsulation as mandated by `AGENTS.md`. Database operations are kept behind dedicated feature service boundaries. |
| **Validation** | **Zod** (`zod`) | Runtime schema validation for API request bodies, proxy query params, guest session cookies, and cross-frame postMessage payloads. |

---

## 3. Review Canvas & Cross-Origin Proxy Architecture

| Component | Implementation | Details |
| :--- | :--- | :--- |
| **Reverse Proxy** | **Next.js Route Handler** (`/api/proxy/[...path]`) | Proxies upstream HTTP/HTTPS requests to bypass browser clickjacking and framing blocks: <br>• Strips `X-Frame-Options` and `Content-Security-Policy` (`frame-ancestors`).<br>• Enforces strict SSRF defense (DNS resolution checks against loopback `127.0.0.1`, RFC1918 private subnets, and cloud metadata IPs `169.254.169.254`).<br>• Rewrites root-relative URLs using `<base href="...">` and relative asset paths.<br>• Injects client bridge script before `</body>`. |
| **Injected Bridge** | **Annotly Bridge Script** (`public/scripts/annotly-bridge.js`) | Lightweight vanilla script running inside the proxied iframe:<br>• Tracks DOM clicks, hovers, text selection.<br>• Generates 5-tier resilient CSS selectors.<br>• Calculates element-relative percentage offsets: $OffsetX = \frac{clickX - rect.left}{rect.width} \times 100$.<br>• Emits position updates via `ResizeObserver` and scroll listeners.<br>• Suppresses native link clicks during Comment Mode while enabling full interactivity during Browse Mode. |
| **Cross-Frame Bus** | **HTML5 postMessage Protocol** | Bi-directional, type-safe messaging bus between parent canvas host and child iframe. Validates origin and message shape on both sides. |

---

## 4. Screenshot Capture & Storage

| Component | Strategy | Details |
| :--- | :--- | :--- |
| **In-Frame Capture** | **Client-Side HTML5 Canvas Rasterization** | Fast (<500ms) capture generated directly in the reviewer's browser at the moment a pin is dropped. Zero server rendering latency or infrastructure cost. |
| **Image Storage** | **Supabase Storage** (or S3-compatible bucket) | Captured screenshots and reviewer file attachments are stored in an authenticated bucket with CDN delivery, saving URLs on the `Annotation` model. |
| **Graceful Fallback** | **Metadata + Selector Preservation** | If browser canvas security blocks rasterization (tainted canvas), the pin is still created with full metadata and element coordinates, displaying a clean "Snapshot unavailable" state without interrupting the user. |

---

## 5. What NOT to Use (Anti-Stack Decisions)

1. **No Heavy Server-Side Chromium Queue in MVP:** Avoid deploying Playwright/Puppeteer server clusters for comment screenshots in v1. It adds high RAM/CPU cost, latency (3-6s), and failure modes for staging sites.
2. **No Pure Client-Side Iframe Framing Without Proxy:** Standard `<iframe>` tags fail on 90%+ of production websites due to `X-Frame-Options: DENY` and CSP. The proxy route handler is non-negotiable.
3. **No Absolute Pixel Coordinate Storage:** Storing raw `(x, y)` pixels causes pins to drift immediately on screen resize, element reflow, or responsive layout shifts.
4. **No Mandatory Account Wall for Reviewers:** Forcing clients to create accounts and passwords introduces fatal adoption friction. Guest commenting via name/email capture must be supported.
