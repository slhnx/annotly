# Annotly — Critical Pitfalls, Risks & Mitigations

This document outlines the top technical risks, failure modes, and architectural pitfalls identified in the reverse engineering of visual website feedback systems, paired with concrete mitigation strategies for Annotly.

---

## 1. Security & Infrastructure Pitfalls

### Pitfall 1.1: Server-Side Request Forgery (SSRF) on Reverse Proxy
- **Risk:** The reverse proxy endpoint accepts a user-provided URL to fetch. Without defense, an attacker could target internal network resources (`http://127.0.0.1:5432`, `http://192.168.1.1`, or cloud metadata endpoints `http://169.254.169.254/latest/meta-data/`).
- **Mitigation:**
  1. Whitelist only `http:` and `https:` protocols.
  2. Perform server-side DNS resolution prior to fetching.
  3. Reject requests if the resolved IP falls in private, loopback, multicast, or link-local ranges:
     - `127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
     - `169.254.0.0/16` (Cloud instance metadata)
     - `::1/128`, `fc00::/7` (IPv6 private ranges)
  4. Follow redirects manually and re-validate destination IP on each redirect hop.

### Pitfall 1.2: Cross-Origin Iframe Framing & CSP Blocks
- **Risk:** Target sites specify `X-Frame-Options: DENY` or CSP `frame-ancestors 'self'`. Modern browsers refuse to render the frame, resulting in a blank canvas.
- **Mitigation:**
  The Next.js proxy route handler intercepts upstream responses, strips `X-Frame-Options` and restrictive `frame-ancestors` CSP directives, and serves the proxied response under the Annotly application domain.

---

## 2. Pin Anchoring & DOM Drift Pitfalls

### Pitfall 2.1: Absolute Pixel Coordinate Drift
- **Risk:** Storing coordinates as fixed screen pixels (e.g. `x: 350px, y: 720px`) breaks as soon as a user resizes the browser, switches responsive viewports (Desktop to Mobile), or if page text reflows.
- **Mitigation:**
  Always store coordinates as percentages of the target element's bounding rect:
  $$OffsetX = \frac{clickX - rect.left}{rect.width} \times 100$$
  $$OffsetY = \frac{clickY - rect.top}{rect.height} \times 100$$
  When displaying the pin, recalculate position using the element's current live DOM rect.

### Pitfall 2.2: Fragile CSS Selectors
- **Risk:** Modern web apps use utility classes (Tailwind) or CSS Modules with hash names (e.g. `Button_btn__a8b9c`) that change on every build. Deep positional selectors like `div:nth-child(4) > div:nth-child(2)` break if an element is added above it.
- **Mitigation:**
  Implement a 5-tier selector generation algorithm:
  1. *Tier 1:* Unique semantic ID (`#main-cta`).
  2. *Tier 2:* Stable data/accessibility attributes (`[data-testid="..."]`, `[role="..."]`, `[name="..."]`).
  3. *Tier 3:* Semantic tag + stable class combination (`nav.navbar > button.primary`).
  4. *Tier 4:* Hierarchical anchor path (`form#signup-form > button[type="submit"]`).
  5. *Tier 5:* Fallback structural path with tag names.
  If an element cannot be found after website changes, preserve the historical screenshot and display an alert in the sidebar.

---

## 3. Screenshot Capture Pitfalls

### Pitfall 3.1: Canvas Tainting (Cross-Origin Images)
- **Risk:** If the proxied site loads images or fonts from an external CDN without permissive CORS headers, attempting to rasterize via `toDataURL()` throws a `SecurityError: The operation is insecure (tainted canvas)`.
- **Mitigation:**
  1. The proxy rewrites asset URLs through the proxy or ensures `Access-Control-Allow-Origin: *` is injected on proxied asset responses.
  2. If client-side capture throws a security exception, catch it gracefully: proceed with comment creation, store element selector and metadata, and display a "Snapshot preview unavailable" placeholder badge without blocking the user.

---

## 4. UX & Reviewer Adoption Pitfalls

### Pitfall 4.1: Confusing Navigation with Commenting
- **Risk:** Users click on a navigation link expecting to browse the site, but end up dropping an unwanted pin.
- **Mitigation:**
  Provide an unmistakable floating toolbar with high-contrast active states:
  - **Comment Mode:** Cursor becomes a pin crosshair; hover outlines highlight elements.
  - **Browse Mode:** Overlay pointer-events set to `none`, enabling native link clicks and form entry.
  - Bind global keyboard shortcut (`Alt + C`) with clear UI toast hints.

### Pitfall 4.2: Guest Comment Spam on Public Canvases
- **Risk:** Public shareable links can be targeted by spam bots or automated crawlers.
- **Mitigation:**
  Implement rate-limiting per IP on comment creation routes, require valid email format validation on the guest modal, and allow project owners to pause commenting or revoke share links at any time.
