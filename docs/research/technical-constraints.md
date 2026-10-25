# Annotly — Technical Constraints, Architecture, & Implementation Trade-Offs

This document analyzes the core technical challenges, security constraints, edge cases, and architectural trade-offs identified during the reverse engineering of visual website feedback systems (**Pastel**), and defines concrete implementation strategies for **Annotly**.

---

## 1. Reverse Proxy Engineering & Security

The reverse proxy is the foundational technical component of a zero-install website feedback tool. It sits between the user's browser and the target website, fetching upstream HTML, transforming response headers and assets, and injecting the client communication bridge.

```
+---------------+        1. Request Proxied URL        +-------------------+
| User Browser  | -----------------------------------> | Annotly Proxy     |
| (Inside Iframe|                                      | Service           |
+---------------+                                      +-------------------+
        ^                                                        | 2. Fetch Upstream
        | 4. Deliver Transformed HTML                            v
        |    - Injected Client Bridge                  +-------------------+
        |    - Rewritten Asset URLs                    | Target Website    |
        |    - Stripped Framing Headers                | (Staging / Prod)  |
        +--------------------------------------------- +-------------------+
```

### 1.1 Header Stripping & Framing Security
- **The Problem:** Modern websites use security headers to prevent clickjacking:
  - `X-Frame-Options: DENY` or `X-Frame-Options: SAMEORIGIN`
  - `Content-Security-Policy: frame-ancestors 'self'`
  If these headers are forwarded to the client browser, the browser will refuse to render the website inside Annotly's `<iframe>`.
- **Observed Reference Behavior:** The reference proxy completely strips or sanitizes framing headers while maintaining safe content delivery.
- **Annotly Strategy:**
  - Strip `x-frame-options`, `content-security-policy` (specifically `frame-ancestors` and `frame-src`), and `x-content-type-options: nosniff` (if blocking transformed script MIME types).
  - Inject custom CSP headers specifying that framing is only permitted within `https://annotly.com` and its authorized subdomains.

### 1.2 URL & Asset Rewriting
- **The Problem:** Upstream HTML contains references to assets and links using varied URI formats:
  - Root-relative paths: `<img src="/images/hero.png">`
  - Relative paths: `<script src="../bundle.js">`
  - Absolute paths: `<a href="https://mysite.com/pricing">`
  - CSS internal assets: `background-image: url('/fonts/inter.woff2')`
  - JavaScript dynamic imports and `fetch()` calls.
  If root-relative paths are loaded in the iframe without rewriting, the browser attempts to fetch them from `https://annotly.com/images/hero.png` (which returns a 404).
- **Observed Reference Behavior:**
  - Pastel routes requests through dedicated proxy subdomains:
    `https://[host-slug].proxy.usepastel.com/_domains/[tld]/[domain]/_url/[encoded_url]`
  - Proxied HTML rewrites all asset tags and injects a base URL `<base href="...">` or dynamically rewrites `src` and `href` attributes.
- **Annotly Strategy:**
  - **HTML Transformation:** Parse incoming HTML streams (using an efficient streaming parser like `htmlparser2` or `cheerio` on the proxy worker).
  - **Base Tag Injection:** Insert `<base href="https://target-domain.com/">` inside `<head>` to resolve root-relative static assets directly from the original server when feasible.
  - **Script & Link Interception:** Rewrite `<a href>` and form actions so navigating within the target site remains inside the proxy sandbox.
  - **CORS Handling:** Proxy stylesheets and fonts with `Access-Control-Allow-Origin: *` to prevent cross-origin stylesheet blocking.

### 1.3 Server-Side Request Forgery (SSRF) Prevention
- **The Risk:** Allowing users to input any URL into a reverse proxy creates a severe SSRF vulnerability. Malicious actors could input internal addresses such as:
  - `http://127.0.0.1:3000` or `http://localhost:5432` (internal services)
  - `http://169.254.169.254/latest/meta-data/` (cloud provider metadata endpoints)
  - `http://10.0.0.0/8` or `http://192.168.0.0/16` (private corporate VPC subnets)
- **Annotly Mandatory Defense:**
  1. **DNS Resolution Verification:** Before dispatching an upstream fetch, resolve the target hostname to an IP address on the server.
  2. **Private IP Blacklist:** Reject the request if the resolved IP falls within private, loopback, or link-local ranges:
     - `127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
     - `169.254.0.0/16` (AWS/GCP/Azure link-local metadata)
     - `::1/128`, `fc00::/7` (IPv6 loopback/unique local)
  3. **Strict Scheme Whitelisting:** Permit only `http://` and `https://` schemes. Explicitly block `file://`, `ftp://`, `gopher://`, etc.
  4. **Rate Limiting:** Enforce per-IP and per-token rate limits on proxy endpoints to prevent resource exhaustion and distributed scraping.

---

## 2. DOM Pin Anchoring & Selector Resilience

### 2.1 The Pin Drift Challenge
When reviewing a live website, pinning feedback to fixed absolute coordinates (e.g. `X: 450px, Y: 820px`) invariably fails:
- Responsive layouts shift content when viewed on different screen sizes.
- Content updates (e.g., adding a new paragraph) push lower elements down the page.
- Responsive menus, modals, and accordions toggle open and closed.

### 2.2 Resilient CSS Selector Generation
- **The Pitfall of Naïve Selectors:**
  Generating deep positional selectors like `div:nth-child(3) > div:nth-child(2) > p:nth-child(1)` is extremely fragile. A single minor code update breaks the selector.
  Conversely, relying on class names in modern frameworks (e.g. Tailwind `hover:bg-blue-500` or CSS Modules `Header_btn__1a2b3`) produces bloated or non-unique selectors.
- **Annotly's 5-Tier Selector Generation Algorithm:**
  When a user clicks an element, the injected script evaluates the DOM hierarchy using a prioritized heuristic:

```
  Tier 1: Unique Semantic ID
  └─ [id="main-nav-cta"] -> Highest confidence, short, stable

  Tier 2: Explicit Testing or Accessibility Attributes
  └─ [data-testid="header-login"], [role="navigation"], [name="subscribe"]

  Tier 3: Semantic Tag + Stable Class Combination
  └─ nav.main-navigation, header > button.btn-primary

  Tier 4: Hierarchical Anchor Path
  └─ form#contact-form > button[type="submit"]

  Tier 5: Fallback Structural Selector
  └─ body > main > section:nth-of-type(2) > div > h2
```

### 2.3 Element-Relative Percentage Offsets
As verified in the reference product inspection, coordinates must be stored as percentages of the element's bounding box:
$$\text{OffsetX} = \frac{\text{clickX} - \text{rect.left}}{\text{rect.width}} \times 100$$
$$\text{OffsetY} = \frac{\text{clickY} - \text{rect.top}}{\text{rect.height}} \times 100$$
- **Benefit:** If the element resizes (e.g., from 800px wide on desktop to 350px on mobile), the pin remains anchored at the exact relative point on that specific element.
- **Resize & Scroll Observation:** The injected client uses a `ResizeObserver` on annotated elements and a throttled `window.onscroll` listener to continuously emit updated screen coordinates (`annotation.element.positions.update`) to the parent canvas.

---

## 3. Screenshot Capture: Client-Side vs. Server-Side

Capturing a visual snapshot at the moment a comment is created is critical so developers can verify what the reviewer saw, even if the website is later modified or taken down.

| Attribute | Client-Side Capture (`html2canvas` / Canvas API) | Server-Side Headless Service (Playwright / Puppeteer) |
| :--- | :--- | :--- |
| **Speed / Latency** | **Fast (< 500ms):** Captured directly in the reviewer's active browser. | **Slow (2–6s):** Requires queuing, launching headless browser, navigation, rendering. |
| **CORS Constraints** | **High:** Cross-origin images, custom fonts, or SVG icons can taint canvas unless proxied with permissive headers. | **None:** Server browser fetches all assets directly with standard network permissions. |
| **Fidelity** | **Moderate:** Client canvas emulators may misrender complex CSS Grid, custom blend modes, or backdrop filters. | **Pixel-Perfect:** Full Chromium rendering engine matches real browser display. |
| **Infrastructure Cost** | **Zero server cost:** Computation happens entirely on client device. | **High:** Headless Chromium requires substantial CPU/RAM (200MB+ per concurrent worker). |
| **Localhost & Intranets**| **Works natively:** Client browser can see local and VPN-protected resources. | **Cannot access:** Server cannot resolve `localhost` or internal company VPNs. |

### Annotly Recommendation: Hybrid Pipeline
1. **Primary (Fast Client Path):** At the moment a comment is submitted, the injected frame performs an in-browser rasterization of the visible viewport, transmits the base64 data to the parent host, and uploads to S3/Cloud Storage.
2. **Server-Side Fallback:** If client-side capture fails (e.g. tainted canvas error or unsupported browser), a background queue worker captures a clean headless Chromium screenshot of the element bounds and updates the annotation record.
3. **Resilience Fallback:** If both fail, Annotly stores the full element selector and metadata, displaying a clean "Screenshot unavailable" placeholder without blocking comment creation.

---

## 4. Localhost, Firewalls, & VPN Constraints

### The Inherent Proxy Limitation
A cloud-hosted reverse proxy (e.g. `proxy.annotly.com`) can only access websites that are reachable over the public internet. It cannot reach:
- `http://localhost:3000` (developer's local machine)
- `http://staging.internal.company.corp` (behind a corporate VPN or firewall)
- Password-protected staging sites behind IP whitelists

### Observed Reference Workarounds
Pastel addresses this via two documented mechanisms:
1. **Proxy IP Whitelisting:** Pastel publishes a fixed list of static IP addresses for agencies to whitelist on their firewall or cloud security groups.
2. **Chrome Browser Extension:** When proxying is impossible (e.g. localhost or strict VPN), the reviewer uses the browser extension. The extension injects the annotation script directly into the active browser tab, completely bypassing the need for a proxy server.

### Annotly Strategy
- **Phase 1 (MVP):** Support all publicly accessible web URLs (production, Vercel/Netlify preview deployments, Webflow, Shopify). Provide clear in-app guidance on using public staging URLs (e.g. Vercel deployment URLs which work out-of-the-box).
- **Phase 2:** Publish Annotly Proxy egress IPs for corporate firewall whitelisting.
- **Phase 3:** Develop an open-source Annotly Tunnel CLI (similar to `ngrok` or `cloudflared`) or Chrome Extension to enable zero-friction review of `localhost` development servers.

---

## 5. Technology Stack & Architecture for Annotly

In accordance with project standards (`AGENTS.md` and `DESIGN.md`), Annotly is architected around modern TypeScript and the Next.js App Router:

```
annotly/
├── app/
│   ├── (marketing)/             # Landing page, features, pricing
│   ├── (auth)/                  # Login, signup, password reset
│   ├── (dashboard)/             # Canvas management, team settings, folders
│   │   ├── dashboard/
│   │   └── projects/
│   ├── review/
│   │   └── [canvasId]/          # The Canvas Host App (toolbar, sidebar, overlay)
│   └── api/
│       ├── canvases/            # CRUD for canvases and revisions
│       ├── annotations/         # CRUD for comments, replies, statuses
│       ├── proxy/               # Reverse proxy route handler
│       └── export/              # CSV, PDF, and PM webhook exports
│
├── components/
│   ├── ui/                      # shadcn/ui primitives (Dialog, Button, Sheet, Dropdown)
│   ├── canvas/                  # Canvas toolbar, viewport frame, overlay badges
│   ├── annotations/             # Pin card, thread popover, reply input, badge pin
│   └── sidebar/                 # Comment list, filter pills, search bar, batch actions
│
├── features/
│   ├── reviews/                 # Canvas state management, mode toggling
│   ├── annotations/             # Pin coordinate math, selector matching
│   └── presence/                # Real-time collaborator avatars and broadcasts
│
├── lib/
│   ├── db/                      # Prisma client configuration
│   ├── proxy/                   # Upstream fetcher, SSRF guards, header sanitizer
│   └── utils/                   # Coordinate math, selector generators, UA parser
│
└── public/
    └── scripts/
        └── annotly-bridge.js    # Script injected into proxied iframes
```

### Key Technical Decisions:
1. **Frontend:** Next.js 16 App Router with React 19 and Tailwind CSS v4.
2. **Design Language:** Curated design tokens inspired by `DESIGN.md` (clean typography via Inter/Figtree, glassmorphic floating toolbars, sleek badge pins with smooth hover transitions, and dark-mode support).
3. **Database & ORM:** PostgreSQL with Prisma ORM. Strict relational modeling for `Canvas`, `CanvasRevision`, `Annotation`, `AnnotationReply`, `FileAttachment`, and `Label`.
4. **State Management:** URL state for active filters and page navigation (`useSearchParams`), React state for local tool interactions, and clean custom hooks (`useCanvasMode`, `usePinOverlay`, `usePresence`) for modular separation of concerns.
5. **Real-Time Layer:** Lightweight WebSocket or SSE updates for multi-user collaboration and instant comment arrival without manual page refreshing.

---

## 6. Phased Implementation Roadmap

### Phase 1: Foundation & Core Review Workflow (Next Step)
- Canvas creation from public website URL.
- Iframe integration with basic header stripping and URL framing.
- Injected client bridge with bidirectional postMessage protocol.
- Comment Mode vs. Browse Mode toggling (`Alt + C`).
- Element-relative pin placement with selector generation and percentage offset math.
- Guest reviewer profile prompt (Name and Email capture).
- Floating pin badge overlay on top of the iframe.

### Phase 2: Comment Management & Collaboration
- Threaded replies to existing pins.
- Resolution workflow (`active` vs. `resolved`) with canvas badge dimming/hiding.
- Sliding sidebar with filtering (Status, Page, Date) and text search.
- Browser and device metadata capture and display.
- Client-side viewport screenshot capture.
- Real-time presence indicators (stacked user avatars in toolbar).

### Phase 3: Project Management & Revisions
- Milestone Canvas Revisions (Revision 1 -> Revision 2 freeze & compare).
- "Pause Commenting" toggle and scheduled deadlines.
- Private team-only comment visibility toggle.
- Batch actions (bulk resolve, bulk delete).
- Export to CSV, PDF executive summaries, and webhook integrations.
