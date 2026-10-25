# Annotly — Research Synthesis & Strategic Summary

## Executive Overview
Annotly is a visual website feedback and collaboration platform designed for web agencies, developers, and designers. Based on the reverse engineering analysis of the reference product (**Pastel**) and the technical choices selected, Annotly will be built as a modular Next.js 16 application with Supabase Auth, PostgreSQL via Prisma ORM, and an embedded reverse proxy route handler.

---

## Key Synthesis Points

1. **Stack & Aesthetics:**
   - Next.js 16 App Router + React 19 + TypeScript.
   - Tailwind CSS v4 with the custom warm cream and organic charcoal design system defined in `DESIGN.md` (`#f7f4ed` background, `#1c1c1c` text, `#eceae4` containment borders, tactile button inset shadows).
   - Supabase Auth for project owners + PostgreSQL with Prisma ORM for type-safe relational data management and migrations.
   - Supabase Storage for viewport screenshot captures.

2. **Core Review Workflow (The Heart of the Product):**
   - **Reverse Proxy Route:** Safe Next.js proxy route handler stripping `X-Frame-Options` and CSP framing headers, with strict DNS resolution SSRF blocking.
   - **Injected Bridge:** Lightweight `annotly-bridge.js` injected before `</body>` to track DOM events, compute 5-tier resilient CSS selectors, and calculate element-relative percentage offsets ($OffsetX, OffsetY$).
   - **Mode Toggling:** Unmistakable separation between Comment Mode (drop pins) and Browse Mode (interact with site) with `Alt+C` shortcut.
   - **Frictionless Guest Review:** Anonymous clients enter Name and Email on their first pin, retained in secure session cookies without requiring an account.
   - **Screenshot & Metadata:** Viewport screenshot captured via client-side canvas rasterization at comment creation, storing device and browser specs.
   - **Comment Management:** Threaded replies, status toggle (`active` vs `resolved`), and sliding triage sidebar with instant search and filtering.

3. **Phased Build Strategy:**
   - **Phase 1:** Foundation, Design System & Landing Page.
   - **Phase 2:** Authentication, Database & Project Permissions.
   - **Phase 3:** Reverse Proxy & Injected Client Bridge.
   - **Phase 4:** Visual Pin Placement & Coordinate Alignment.
   - **Phase 5:** Comment Persistence, Threading & Resolution.
   - **Phase 6:** Review Canvas UI, Responsive Viewports & Triaging Sidebar.
   - **Phase 7:** End-to-End Verification, Security Hardening & Polish.
