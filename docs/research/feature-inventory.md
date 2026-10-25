# Annotly — Feature Inventory & Evidence Ledger

This document catalogs every core feature observed in the reference product (**Pastel**), organized across the five requested investigation areas. Each feature is broken down into:
- **Observed Behavior** (with verified evidence from client bundles, runtime Redux state, DOM analysis, and public documentation)
- **Observations vs. Assumptions**
- **Technical Constraints & Unknowns**
- **Annotly Recommendations**

---

## Area 1: Website Review & Sharing Workflows

### 1.1 Canvas Creation via Target URL
- **Observed Behavior:**
  - A user inputs a website URL into a dashboard or creation dialog.
  - The system creates a `Canvas` entity with attributes: `originalHost`, `initialPath`, `projectUrl`, and a generated `proxyUrl`.
  - A unique shareable URL is generated (e.g., `usepastel.com/link/[canvas_id]`).
  - The canvas immediately loads the target site inside an interactive iframe wrapper.
- **Evidence:**
  - Redux canvas record in bundle:
    ```json
    {
      "id": 1200,
      "originalHost": "hustlecase.com",
      "initialPath": "/",
      "projectUrl": "https://usepastel.com/link/g665/",
      "proxyUrl": "https://hustlecase-com.proxy.usepastel.com/_domains/com/hustlecase/_url/https://hustlecase.com",
      "commentingEnabled": true,
      "hasPassword": false
    }
    ```
- **Observations vs. Assumptions:**
  - *Observation:* The project creates a proxy route dedicated to that domain slug and passes credentials/cookies as part of the canvas state (`iframeData: { cookies, credentials }`).
  - *Assumption:* The backend validates the URL, performs DNS resolution, and provisions SSL/subdomain routing dynamically or via wildcard proxy.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Target websites with strict bot protection (Cloudflare Turnstile, Akamai), geo-blocking, or complex CAPTCHAs may block the proxy from fetching the upstream HTML.
  - *Constraint:* Websites hosted on `localhost` or private intranets cannot be accessed by a cloud-based reverse proxy without a local tunneling agent or companion browser extension.
  - *Unknown:* Handling of HTTP basic authentication headers versus form-based session logins on staging sites.
- **Annotly Recommendations:**
  - For v1, implement a URL validation step that checks HTTP status and flags if `X-Frame-Options` or strict CSP would require proxy rewriting.
  - Provide clear UI feedback if a target site takes longer than 10 seconds to load through the proxy.

---

### 1.2 Zero-Login Public Sharing & Guest Access
- **Observed Behavior:**
  - Reviewers can open canvas links without creating an account or logging in.
  - Anyone with the link is granted viewer/commenter permissions by default.
  - The canvas presents an optional onboarding or welcome tooltip ("Click anywhere to leave feedback").
  - When an anonymous reviewer drops their first comment pin, an inline guest modal (`isGuestLoginModalOpen`) appears asking for their name and email.
  - The reviewer's identity is retained across subsequent comments in the same session via browser storage/cookies.
- **Evidence:**
  - Redux state flags: `isGuestLoginModalOpen: false`, `isIntroModalOpen: false`.
  - Client bundle logic: `annotation.create.with.no.user` event fires from iframe if the user is unauthenticated, triggering the guest capture modal.
  - Annotation records reflect guest submissions:
    ```json
    {
      "userName": "Aloke Pillai",
      "avatarUrl": "https://secure.gravatar.com/avatar/f2c31acf...&d=retro",
      "UserId": null
    }
    ```
- **Observations vs. Assumptions:**
  - *Observation:* The avatar falls back to Gravatar retro defaults generated from the email hash.
  - *Assumption:* A secure signed session cookie (or JWT token) is issued to the guest after entering their email so they can edit or delete their own comments during their session.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Spam prevention: Publicly accessible canvases without authentication could be targeted by automated spam bots. Rate-limiting by IP and canvas is essential.
  - *Unknown:* How long guest session tokens remain valid, and whether guests can modify comments once their browser tab is closed.
- **Annotly Recommendations:**
  - Implement guest credentials in cookies/local storage (`annotly_guest_name`, `annotly_guest_email`, `annotly_guest_token`).
  - Use Gravatar fallback avatars with customizable initials generation (e.g., using shadcn `Avatar` with fallback text).

---

### 1.3 Multi-Page Website Navigation (Comment Mode vs. Browse Mode)
- **Observed Behavior:**
  - The canvas UI offers two exclusive interaction modes via a persistent bottom toolbar:
    1. **Comment Mode:** Clicks on the webpage drop feedback pins. Native link clicks and form submissions are intercepted/suppressed.
    2. **Browse Mode:** The canvas overlay is made non-interactive (`pointer-events: none` on overlay), allowing the user to click links, open navigation menus, submit forms, and navigate across multi-page sites normally.
  - When the user navigates to a new page in Browse Mode, the child frame informs the parent frame via `path.change`, and the canvas URL updates to reflect the active path (or hash).
  - Pin visibility is scoped: the canvas updates visible pins to match the current pathname (`annotation.path === currentPath`).
- **Evidence:**
  - Bundle code:
    ```javascript
    this.on("path.change", ({ path: t, fullUrl: s, title: a }) => {
      this.navigatingToAnnotation = false;
      e((0, w.lJb)(t, s, a));
      e((0, w.HPo)());
    });
    ```
  - Keyboard shortcut: `Alt + C` toggles Comment Mode.
  - Redux state: `commentingEnabled: true`, `path: "/"`, `sortBy: "page"`.
- **Observations vs. Assumptions:**
  - *Observation:* The child iframe script intercepts `pushState`, `replaceState`, and `popstate` to emit `path.change` to the parent window.
  - *Assumption:* External links leading outside the target host are either blocked or rewritten to open in a new tab via `url.open-in-new-tab`.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Single Page Applications (SPAs) with complex virtual DOM hydration can occasionally desynchronize navigation if the proxy script interferes with window location.
  - *Unknown:* How session storage or authentication state (e.g., client cookies) inside the proxied iframe is preserved when navigating across subdomains.
- **Annotly Recommendations:**
  - Implement a crystal-clear mode indicator in the toolbar with an active state badge and toast notification when switching modes.
  - Add `Alt + C` shortcut support and an intuitive tooltip explaining that Browse Mode is required to click links.

---

## Area 2: Visual Annotations & Screenshot-Based Comments

### 2.1 Element-Relative Pin Anchoring & Coordinate Math
- **Observed Behavior:**
  - When clicking on an element in Comment Mode, the injected script captures:
    1. A DOM selector path identifying the element (`targetSelector`).
    2. A secondary fallback selector (`fallbackTargetSelector`).
    3. The relative click coordinates as a percentage of the target element's bounding box (`targetOffsetX`, `targetOffsetY`).
    4. The page path (`path`).
  - When the canvas resizes (e.g., switching responsive viewports or window resize), the pin overlay recalculates coordinates:
    $$\text{Pin X} = \text{rect.left} + \left(\text{rect.width} \times \frac{\text{targetOffsetX}}{100}\right)$$
    $$\text{Pin Y} = \text{rect.top} + \left(\text{rect.height} \times \frac{\text{targetOffsetY}}{100}\right)$$
  - If the element moves, resizes, or reflows, the pin maintains its exact visual location relative to that specific UI component.
  - If an element is removed or hidden in the DOM, the child frame emits `annotation.inactive` with an `inactiveReason`.
- **Evidence:**
  - Annotation records from live canvas bundle:
    ```json
    {
      "id": 3383,
      "targetSelector": "header > :nth-child(1) > nav",
      "fallbackTargetSelector": null,
      "targetOffsetX": 53.96551724137931,
      "targetOffsetY": 73.75,
      "path": "/"
    }
    ```
  - Communication event:
    ```javascript
    this.on("annotation.element.positions.update", e => {
      this.annotationsOverlay &&
        this.annotationsOverlay.scheduleUpdate({
          annotationElementPositions: e.annotationElementPositions,
          iframeWindowPosition: this.iframe
            ? this.iframe.getBoundingClientRect()
            : null,
        });
    });
    ```
- **Observations vs. Assumptions:**
  - *Observation:* Percentage-based offsets relative to the element prevent pins from drifting when text reflows or responsive widths change.
  - *Assumption:* A `ResizeObserver` and scroll listener inside the iframe trigger `annotation.element.positions.update` with requestAnimationFrame throttling.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Dynamically generated CSS class names (e.g., Tailwind hashed classes or CSS Modules like `.btn_abc123`) can change between builds, potentially breaking `targetSelector`.
  - *Constraint:* Canvas/WebGL elements, embedded video players, or iframes inside the target page cannot have internal child elements targeted by standard CSS selectors.
  - *Unknown:* Specific algorithm used to generate clean, robust CSS selectors (e.g., prioritizing `id`, `data-testid`, unique tags, or concise nth-child paths).
- **Annotly Recommendations:**
  - Implement a resilient selector generator algorithm that prefers IDs, stable data attributes (`data-testid`, `role`), and semantic tags before falling back to structural nth-of-type paths.
  - Store both element-relative percentage offsets and absolute viewport scroll coordinates as a secondary fallback.

---

### 2.2 Client Environment Metadata Collection
- **Observed Behavior:**
  - Every comment automatically captures a complete snapshot of the reviewer's browsing environment:
    - Browser name and version
    - Operating system name and version
    - Rendering engine
    - Screen width and height
    - Window inner width and inner height
    - Device pixel ratio (Retina / High DPI detection)
    - Scroll position (`pageXOffset`, `pageYOffset`)
  - When a developer or team member clicks the comment in the sidebar, the canvas automatically displays this metadata, helping eliminate "cannot reproduce" bugs.
- **Evidence:**
  - Annotation metadata in inspected Redux store:
    ```json
    {
      "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36...",
      "browser": { "name": "Chrome", "version": "59.0.3071.115", "major": "59" },
      "engine": { "name": "WebKit", "version": "537.36" },
      "os": { "name": "Mac OS", "version": "10.11.4" },
      "window": {
        "width": 970,
        "height": 629,
        "devicePixelRatio": 2,
        "pageXOffset": 0,
        "pageYOffset": 443
      }
    }
    ```
- **Observations vs. Assumptions:**
  - *Observation:* Metadata is captured client-side via JavaScript (`navigator.userAgent`, `window.innerWidth`, `window.innerHeight`, `window.devicePixelRatio`, `window.pageXOffset`, `window.pageYOffset`).
  - *Assumption:* A user-agent parser (such as `ua-parser-js` or similar) parses the raw UA string into structured browser and OS objects before persisting to the database.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Client-side UA freezing in modern browsers (Chromium User-Agent Client Hints) may return generic OS versions (e.g., Windows 10 for Windows 11) unless `navigator.userAgentData` is queried.
- **Annotly Recommendations:**
  - Capture standard `window` and `screen` metrics, plus modern `navigator.userAgentData` where supported, with server-side UA parsing fallback.
  - Present metadata in the comment card as clean badges (e.g., `Chrome 120 • macOS • 1440x900 • 2x DPI`).

---

### 2.3 Screenshot Capture & Coordinate Mapping
- **Observed Behavior:**
  - At the exact moment a comment is created, a screenshot of the visible viewport (or cropped element area) is generated.
  - The screenshot preserves the visual state of the website even if the live site changes, elements are removed, or the staging server is updated.
  - Both element-relative coordinates (`element-x`, `element-y`) and screenshot-relative click coordinates (`screenshot-x`, `screenshot-y`) are tracked so external task viewers can render the pin on the static image.
  - The screenshot URL is stored with the annotation (`screenshotUrl`) and rendered in comment cards and PDF/PM exports.
- **Evidence:**
  - Inspected bundle code:
    ```javascript
    this.on("screenshot", t => {
      e((0, w.Yyx)({ screenshotDataUrl: t.screenshotDataUrl }));
    });
    ```
  - Export mapping function:
    ```javascript
    let e = t.screenshotUrl ? t.metadata?.mousePosition : void 0;
    return {
      "element-x": s,
      "element-y": a,
      "screenshot-x": e?.x,
      "screenshot-y": e?.y,
    };
    ```
- **Observations vs. Assumptions:**
  - *Observation:* The child frame produces a base64 `screenshotDataUrl` via an in-frame rasterizer, and the parent uploads it to S3/cloud storage.
  - *Assumption:* Pastel may also utilize an asynchronous headless browser worker queue (e.g. Playwright) for high-resolution retina viewport captures when client-side capture fails or produces tainted canvas errors.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Client-side rasterization libraries (like `html2canvas`) suffer from cross-origin image tainting if assets lack proper `Access-Control-Allow-Origin` headers. (The proxy resolves this by proxying asset URLs under the same origin).
  - *Constraint:* High-resolution full-page screenshots can consume substantial memory and bandwidth on mobile connections.
- **Annotly Recommendations:**
  - For v1, implement client-side canvas capture of the visible viewport at pin placement, upload to S3/Cloud Storage, and store the URL.
  - Gracefully handle cases where screenshot capture fails by displaying a "Preview unavailable" fallback badge without blocking comment submission.

---

### 2.4 Live Copy / Text Edit Changes
- **Observed Behavior:**
  - In addition to standard comment pins, users can select text on the page to suggest copy changes.
  - The system records `textContentBefore` and `textContentAfter` (and optional HTML equivalents).
  - The comment automatically formats as: `Change "[before]" to "[after]"`.
- **Evidence:**
  - Bundle code:
    ```javascript
    this.on("annotation.new.update", t => {
      if (!t.textContentAfter && !t.textContentBefore)
        return e((0, w.Yyx)(t)), null;
      let i = {
        ...n,
        ...t,
        comment: `Change "${ax()(t.textContentBefore)}" to "${ax()(t.textContentAfter)}"`,
        CanvasId: s.id,
      };
      return e((0, w.oJR)(i));
    });
    ```
- **Observations vs. Assumptions:**
  - *Observation:* The feature allows content reviewers and copywriters to propose exact string substitutions directly on DOM elements.
  - *Assumption:* Text edits are visual suggestions stored as annotations and do not directly write back to the target CMS or source repository without an integration.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Elements containing nested markup or dynamic variable placeholders (e.g., `Hello, {username}`) may produce fragmented text nodes.
- **Annotly Recommendations:**
  - Support a dedicated "Copy Edit" mode in Annotly where selecting text on any element brings up a split "Original" vs. "Proposed" text replacement input.

---

## Area 3: Comment Threads & Resolving Feedback

### 3.1 Threaded Discussions & Replies
- **Observed Behavior:**
  - Each annotation acts as the root of a conversation thread.
  - Reviewers and team members can reply to any open pin.
  - Replies contain: `comment`, `userName`, `avatarUrl`, `isPrivate`, `createdAt`, `UserId` (if registered), and optional file attachments.
  - Users can post multiple replies, fostering discussion around contentious design decisions.
- **Evidence:**
  - Sample `AnnotationReply` record in Redux:
    ```json
    {
      "id": 14220,
      "comment": "i agree",
      "userName": "John Test",
      "avatarUrl": "https://secure.gravatar.com/avatar/...&d=retro",
      "isPrivate": false,
      "createdAt": "2018-10-28T15:26:04.319Z",
      "AnnotationId": 24009,
      "UserId": 4151
    }
    ```
- **Observations vs. Assumptions:**
  - *Observation:* Replies support private team-only visibility flags (`isPrivate: true`).
  - *Assumption:* Notifications are emailed to the original comment author and thread participants when a new reply is posted.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Real-time reply synchronization requires efficient WebSocket channel management to avoid high connection churn across dozens of guest reviewers.
- **Annotly Recommendations:**
  - Model `AnnotationReply` as a child relation of `Annotation`.
  - Include rich text / markdown support, file upload attachments, and user mention parsing (`@username`).

---

### 3.2 Feedback Lifecycle & Resolution Statuses
- **Observed Behavior:**
  - Feedback items support multiple explicit workflow statuses:
    - `active`: Open feedback requiring action.
    - `in-progress`: Work currently being executed by developers/designers.
    - `in-review`: Fix implemented, pending client or QA verification.
    - `resolved`: Completed and closed.
  - Pin badges visually distinguish statuses (e.g., active pins are numbered colored badges; resolved pins are dimmed or hidden from the live canvas by default).
  - A resolution toggle in the header/sidebar allows reviewers to hide or show resolved pins ("Inbox Zero" workflow).
- **Evidence:**
  - Sample annotation statuses observed: `status: "active"`, `status: "resolved"`.
  - Redux filter state:
    ```json
    {
      "showCommentsByStatus": ["active", "in-progress", "in-review"]
    }
    ```
  - Marketing documentation emphasizes the "Inbox Zero" milestone when all feedback is resolved.
- **Observations vs. Assumptions:**
  - *Observation:* Resolving a comment hides the pin badge from the canvas view by default to keep the screen uncluttered.
  - *Assumption:* Re-opening a resolved comment reverts its status to `active` and restores the pin badge on the canvas.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Resolving hundreds of comments must not cause re-render performance drops in large canvas overlays.
- **Annotly Recommendations:**
  - Support `TODO / IN_PROGRESS / RESOLVED` statuses with quick one-click resolve actions directly from the pin popover and sidebar list.
  - Allow filtering the canvas overlay so resolved pins are either hidden or shown as subtle green checkmark badges.

---

### 3.3 Private Team-Only Comments
- **Observed Behavior:**
  - Team members can mark an annotation or reply as private (`isPrivate: true`).
  - Private comments are only visible to logged-in team members of the canvas's owning team.
  - Guests and external clients viewing the canvas link do not see private pins on the canvas overlay, in the sidebar list, or in client exports.
- **Evidence:**
  - Annotation schema property: `"isPrivate": null | boolean`.
  - AnnotationReply property: `"isPrivate": false | true`.
  - Marketing copy: "See real-time updates, comments and private team only comments."
- **Observations vs. Assumptions:**
  - *Observation:* The API authorization layer filters out private annotations before returning payloads to unauthenticated or guest sessions.
  - *Assumption:* UI indicates private comments with a distinct "Lock" icon and private badge banner so team members are aware of visibility.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Security critical: Server-side query filtering must ensure private comments are never leaked in initial SSR HTML, Redux hydration payloads, or WebSocket broadcast channels.
- **Annotly Recommendations:**
  - Enforce strict server-side filtering on all annotation queries:
    `WHERE isPrivate = false OR (isPrivate = true AND requester.isTeamMember = true)`.

---

### 3.4 Batch Actions
- **Observed Behavior:**
  - The sidebar supports a multi-select mode (`batchActionsActive: true`).
  - Users can select multiple comment cards using checkboxes and perform bulk actions:
    - Bulk resolve
    - Bulk unresolve
    - Bulk delete
    - Bulk export to PM tools (Trello, Jira, Asana)
- **Evidence:**
  - Redux UI state:
    ```json
    {
      "batchActionsActive": false,
      "batchActionAnnotationIds": [],
      "batchActions": {}
    }
    ```
- **Observations vs. Assumptions:**
  - *Observation:* Batch action controls appear as a sticky bottom bar or top action bar in the sidebar when one or more comments are selected.
  - *Assumption:* Only authenticated project owners or team members can perform batch deletions.
- **Annotly Recommendations:**
  - Implement bulk select with "Select All on Page", "Select All in Project", "Mark as Resolved", and "Assign Label".

---

## Area 4: Client Collaboration & Project Management

### 4.1 Real-Time Presence & Live Collaborators
- **Observed Behavior:**
  - The canvas toolbar displays stacked circular avatars of all users and guests currently viewing the canvas in real time (`.users-scroll-wrapper`, `.user-img-wrapper`).
  - If a user moves between pages or leaves a comment, other participants see updates in real time.
- **Evidence:**
  - Redux state properties:
    ```json
    {
      "usersPresent": {},
      "usersPresentWithTimestamps": {}
    }
    ```
  - CSS styles in canvas bundle:
    ```css
    .right .users-scroll-wrapper {
      display: flex;
      flex-direction: row-reverse;
      max-width: 200px;
    }
    .right .user-img-wrapper {
      height: 42px;
      width: 42px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    ```
- **Observations vs. Assumptions:**
  - *Observation:* Avatars stack with negative margins (`margin-right: -8px`) and white borders for visual depth.
  - *Assumption:* Heartbeat pings or WebSocket presence events update `usersPresentWithTimestamps`, pruning inactive sessions after a timeout threshold (e.g., 30–60 seconds).
- **Technical Constraints & Unknowns:**
  - *Constraint:* Real-time presence channels can generate significant message volume on high-traffic review links.
- **Annotly Recommendations:**
  - Implement lightweight presence channels via Pusher, Supabase Realtime, or server-sent events with 30-second heartbeat throttling.

---

### 4.2 Pausing Comments & Scheduling Deadlines
- **Observed Behavior:**
  - Project owners can temporarily pause feedback via a "Pause commenting" toggle in canvas share settings.
  - When paused, `canvasIsPaused` evaluates to `true`, the canvas displays a "Read-only" or "Commenting paused" banner, and reviewers cannot place new pins.
  - Project owners can also set an automated deadline (date and time). When the deadline arrives, the canvas automatically transitions to read-only mode, and automated reminder emails can be dispatched.
- **Evidence:**
  - Bundle logic:
    ```javascript
    this.lastReadOnlyValue =
      C.A.canvasIsReadOnly(r, p) || C.A.canvasIsPaused(r) || c;
    this.send("initialize.app", { canvasIsReadOnly: this.lastReadOnlyValue });
    ```
  - Redux state entities: `canvasDeadlineReminders: []`, `canvasNudges: []`.
  - Help articles confirm: "Toggle the 'Pause commenting' switch... blue toggle means read-only."
- **Observations vs. Assumptions:**
  - *Observation:* The child iframe receives `canvasIsReadOnly: true` via postMessage and disables the hover highlight and click-to-pin listener.
  - *Assumption:* Scheduled background jobs (e.g., cron or queue workers) check deadlines periodically and trigger notification emails.
- **Annotly Recommendations:**
  - Include a simple "Pause Comments" toggle in canvas settings.
  - Support setting an optional expiration date/time that automatically flips `commentingEnabled = false`.

---

### 4.3 Canvas Revisions (Milestone Versioning)
- **Observed Behavior:**
  - Projects can be organized into numbered sequential revisions (`CanvasRevision` entity with `number: 1, 2, ...`).
  - Annotations belong to a specific `CanvasRevisionId`.
  - Reviewers can view historical revisions (`isOnOldRevision: true`).
  - When viewing an older revision, the canvas is read-only, displaying historical pins and screenshots captured during that revision milestone.
- **Evidence:**
  - Inspected revision entity:
    ```json
    {
      "id": 6767,
      "number": 1,
      "CanvasId": 1200,
      "createdAt": "2021-10-31T22:11:28.851Z"
    }
    ```
  - UI state flags: `isNewRevisionModalOpen: false`, `revisionId: 6767`, `isOnOldRevision: boolean`.
- **Observations vs. Assumptions:**
  - *Observation:* Grouping comments by revision prevents resolved comments from cluttering subsequent review phases while preserving an audit trail.
  - *Assumption:* Creating a new revision freezes the previous revision's pins and reloads the canvas with zero active pins for the new iteration.
- **Technical Constraints & Unknowns:**
  - *Constraint:* The underlying website may have changed significantly between revisions; historical pins on elements that no longer exist rely on screenshots.
- **Annotly Recommendations:**
  - Support milestone cycles in Annotly (Revision 1 -> Revision 2) with a top dropdown selector to compare feedback across rounds.

---

### 4.4 Project Management Integrations & Export
- **Observed Behavior:**
  - Pastel provides export pipelines to transfer feedback into issue trackers:
    - **Trello:** Creates cards with comment text, metadata, screenshot attachment, and direct link.
    - **Jira / Asana / Monday.com:** Maps annotations to tickets/tasks with assignees and labels.
    - **CSV Export:** Downloads all comments with columns for ID, Pin #, Author, Comment, Status, Path, Resolution, Browser, OS, Screen Size, Screenshot URL, and Timestamp.
    - **PDF Export:** Generates an executive summary report with screenshots and feedback lists formatted via `jspdf`.
- **Evidence:**
  - Client bundle contains CSV column generators:
    ```javascript
    c.push(
      { label: "Screenshot URL", key: "screenshotUrl" },
      { label: "Original URL", key: "fullUrl" },
      { label: "Metadata - Screen Size", key: "metadataScreenSize" },
      { label: "Metadata - Browser", key: "metadataBrowser" },
      { label: "Metadata - OS", key: "metadataOS" }
    );
    ```
  - External account entities: `externalAccounts: []`, `serviceToExportTo: null`.
- **Observations vs. Assumptions:**
  - *Observation:* Comments store `exportType`, `exportExternalId`, and `lastExportDate` to prevent duplicate ticket generation.
  - *Assumption:* Integrations use OAuth tokens stored in `externalAccounts` or user-supplied API keys / webhooks.
- **Annotly Recommendations:**
  - For Annotly v1, prioritize a high-fidelity CSV and PDF export, plus generic Webhooks (Zapier/Make compatible), before adding complex OAuth integrations for Jira/Asana.

---

## Area 5: Relevant UI States & Interactions

### 5.1 Responsive Viewport Switcher & Custom Resize
- **Observed Behavior:**
  - Reviewers can test and comment on different screen widths without leaving the canvas.
  - Presets:
    - **Desktop** (100% width or 1280px+)
    - **Tablet** (~768px)
    - **Mobile** (~375px)
  - Draggable resize handles allow dragging the iframe borders to any custom width (`isDraggingWidth: true`, `viewWidth: number`).
  - Zoom controls: Auto-fit (`fitAuto`), zoom percentage (50%, 75%, 100%, 150%).
- **Evidence:**
  - UI state:
    ```json
    {
      "deviceType": "desktop",
      "viewMode": "desktop",
      "viewPreset": "mobile",
      "viewWidth": 375,
      "isDraggingWidth": false,
      "zoomIsAuto": true,
      "zoomPercentage": 100
    }
    ```
  - Handlers in bundle: `handleResizeWidthChange`, `handleResizeDragStart`, `handleResizeDragEnd`.
  - CSS wrapper: `.iframe-border` with centered margins and background padding.
- **Observations vs. Assumptions:**
  - *Observation:* The iframe container is centered horizontally with CSS `margin-left: auto; margin-right: auto` and a subtle drop shadow to simulate a device frame.
  - *Assumption:* When the iframe width is smaller than the parent window, a CSS transform scale or flex container handles viewport scaling.
- **Technical Constraints & Unknowns:**
  - *Constraint:* Resizing an iframe to mobile width changes media queries in the target site, which may reposition or hide elements where desktop pins were placed.
- **Annotly Recommendations:**
  - Implement preset buttons (`Desktop`, `Tablet`, `Mobile`) with animated width transitions and an interactive draggable edge handle.

---

### 5.2 Sliding Sidebar, Filtering, & Search
- **Observed Behavior:**
  - The sidebar slides out from the left edge (width: ~300px).
  - Opening the sidebar shifts the canvas content container by applying `padding-left: 300px` to `.iframe-wrapper.sidebar-open` (on screens > 768px) to prevent obscuring the website.
  - On mobile screens (<= 768px), the sidebar overlays the canvas (`padding-left: 0`).
  - Features:
    - **Tab navigation:** Comments list vs. Activity feed.
    - **Filtering:** Status (Active, In-Progress, Resolved), Page (Current page only vs. All pages), Assignee, Label.
    - **Sorting:** By page position (top-to-bottom), by pin number, by newest/oldest date.
    - **Search:** Instant text search across comments and author names.
- **Evidence:**
  - CSS rules in inspected bundle:
    ```css
    .iframe-wrapper.sidebar-open {
      padding-left: 300px;
    }
    @media (max-width: 768px) {
      .iframe-wrapper.sidebar-open {
        padding-left: 0;
      }
    }
    ```
  - Redux UI state:
    ```json
    {
      "sidebarOpen": false,
      "activeSidebarTab": "comments",
      "sortBy": "page",
      "search": "",
      "searchActive": false,
      "filters": {}
    }
    ```
- **Observations vs. Assumptions:**
  - *Observation:* Clicking any comment card in the sidebar highlights the corresponding pin badge on the canvas and smoothly scrolls the iframe window to the element position.
  - *Assumption:* Clicking a comment on a different page automatically navigates the iframe to that URL before scrolling to the element.
- **Annotly Recommendations:**
  - Build the sidebar with shadcn `Sheet` or a custom sliding panel component matching Annotly's `DESIGN.md` guidelines.
  - Include search, status filter pills, and sort dropdown at the top of the sidebar.

---

### 5.3 Modals & Floating Overlays
- **Observed Behavior:**
  - Modal dialogues are centralized in UI state:
    - `isGuestLoginModalOpen`: Guest name/email collection prompt.
    - `isIntroModalOpen`: First-time reviewer welcome walkthrough.
    - `isNewAnnotationModalOpen`: Comment creation card.
    - `isExportAnnotationsModalOpen`: Export to Trello/Jira/CSV options.
    - `isNewRevisionModalOpen`: Create milestone revision.
    - `isNudgeModalOpen`: Send email reminder to reviewers.
- **Evidence:**
  - Redux `ui.modals` and `ui.feedbackLink` boolean flags matching modal states.
- **Observations vs. Assumptions:**
  - *Observation:* Modals use smooth fade enter/exit animations (`transition: opacity 150ms ease-out`).
  - *Assumption:* Accessible keyboard dismissal (`Escape` key) and focus trapping are handled by standard modal primitives.
- **Annotly Recommendations:**
  - Implement modals using shadcn/ui `Dialog` primitives with Radix UI focus management and accessibility.
