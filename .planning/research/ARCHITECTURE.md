# Annotly — System Architecture & Component Boundaries

## 1. High-Level Component Boundaries

Annotly is composed of four primary layers:
1. **Marketing & Auth App:** Next.js App Router routes for landing page, authentication, and project management.
2. **Reverse Proxy Service:** Next.js Route Handler `/api/proxy/[...path]` providing safe upstream website fetching, header sanitization, asset URL rewriting, and bridge injection.
3. **Canvas Host App:** The review interface at `/review/[canvasId]` containing responsive viewport controls, mode switches, triage sidebar, and overlay pin badges.
4. **Injected Bridge Script:** Lightweight script (`annotly-bridge.js`) running inside the proxied iframe communicating with the host via HTML5 `postMessage`.

```
+----------------------------------------------------------------------------+
| Annotly Next.js Application                                                |
|                                                                            |
|  +------------------------+  +------------------------------------------+  |
|  | / (Marketing Landing)  |  | /review/[canvasId] (Canvas Host App)     |  |
|  | - Design system theme  |  | - Viewport resize container (presets)    |  |
|  | - Hero, features, CTA  |  | - Floating toolbar (Comment/Browse mode) |  |
|  +------------------------+  | - Sliding triage sidebar & search        |  |
|                              | - Overlay pin badges & thread popovers   |  |
|  +------------------------+  +------------------------------------------+  |
|  | /auth (Supabase Auth)  |                        | postMessage           |
|  | - Login, Signup, Reset |                        v                       |
|  | - Session cookies      |  +------------------------------------------+  |
|  +------------------------+  | <iframe> /api/proxy/[...targetUrl]       |  |
|                              | - Upstream target website HTML           |  |
|  +------------------------+  | - Injected `annotly-bridge.js`           |  |
|  | /api/proxy (Route)     |  | - DOM selector generation                |  |
|  | - DNS SSRF guard       |  | - Relative % coordinate math             |  |
|  | - Strip X-Frame-Options|  | - In-frame canvas screenshot capture     |  |
|  | - Inject bridge script |  +------------------------------------------+  |
|  +------------------------+                                                |
+----------------------------------------------------------------------------+
              |                                          |
              v                                          v
+-------------------------------+          +---------------------------------+
| Supabase Auth & Storage       |          | PostgreSQL (via Prisma ORM)     |
| - User sessions & profiles    |          | - Users, Projects, Canvases     |
| - Review screenshot images    |          | - Annotations, Replies, Tags    |
+-------------------------------+          +---------------------------------+
```

---

## 2. Database Schema (Prisma Models)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id           String        @id @default(uuid())
  supabaseId   String        @unique
  email        String        @unique
  name         String?
  avatarUrl    String?
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  projects     Project[]     @relation("ProjectOwner")
  annotations  Annotation[]
  replies      AnnotationReply[]
}

model Project {
  id               String       @id @default(uuid())
  name             String
  slug             String       @unique
  ownerId          String
  owner            User         @relation("ProjectOwner", fields: [ownerId], references: [id], onDelete: Cascade)
  canvases         Canvas[]
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
}

model Canvas {
  id                String       @id @default(uuid())
  projectId         String
  project           Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)
  targetUrl         String
  originalHost      String
  initialPath       String       @default("/")
  commentingEnabled Boolean      @default(true)
  annotations       Annotation[]
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}

model Annotation {
  id                     String            @id @default(uuid())
  canvasId               String
  canvas                 Canvas            @relation(fields: [canvasId], references: [id], onDelete: Cascade)
  number                 Int               // Sequential pin # (1, 2, 3...)
  targetSelector         String
  fallbackTargetSelector String?
  targetOffsetX          Float             // Percentage 0-100
  targetOffsetY          Float             // Percentage 0-100
  path                   String            @default("/")
  comment                String
  status                 String            @default("active") // active, resolved
  screenshotUrl          String?
  metadata               Json              // browser, os, window dimensions, dpr, scroll
  authorName             String
  authorEmail            String
  userId                 String?
  user                   User?             @relation(fields: [userId], references: [id], onDelete: SetNull)
  replies                AnnotationReply[]
  createdAt              DateTime          @default(now())
  updatedAt              DateTime          @updatedAt

  @@index([canvasId, path])
  @@index([canvasId, status])
}

model AnnotationReply {
  id           String      @id @default(uuid())
  annotationId String
  annotation   Annotation  @relation(fields: [annotationId], references: [id], onDelete: Cascade)
  comment      String
  authorName   String
  authorEmail  String
  userId       String?
  user         User?       @relation(fields: [userId], references: [id], onDelete: SetNull)
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt

  @@index([annotationId])
}
```

---

## 3. Bidirectional postMessage Protocol

### Parent (Host) -> Child (Iframe)
- `initialize.app`: Passes existing annotations, active mode (`feedback` vs `browse`), read-only status.
- `update.app`: Broadcasts new annotations, resolved status updates, or selected pin highlighting.
- `mode.set`: Switches child event listeners between Comment Mode (suppress links, track hovers) and Browse Mode (allow native navigation).

### Child (Iframe) -> Parent (Host)
- `connect.app`: Fired when `annotly-bridge.js` mounts. Delivers initial URL path, document title.
- `path.change`: Fired on link navigation or SPA `pushState`/`popstate`. Host updates active path and filters pins.
- `annotation.new`: Fired when clicking an element in Comment Mode. Delivers `targetSelector`, `targetOffsetX`, `targetOffsetY`, path, and client metadata.
- `screenshot`: Delivers base64 data URL of the captured viewport snapshot.
- `annotation.element.positions.update`: Throttled event emitting updated screen rects for all visible pins during scroll or window resize.
