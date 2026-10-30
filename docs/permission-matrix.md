# Annotly Permission Matrix & Authorization Specification

This document defines the role-based and token-based access control policies for Annotly.

## 1. User Roles & Personas

Annotly supports four distinct operational personas across the review lifecycle:

| Role | Definition | Authentication State | Typical Actor |
| :--- | :--- | :--- | :--- |
| **Project Owner** | The creator and owner of the review project. | Authenticated via Supabase Auth session (`userId`) | Agency designer, web developer, project lead |
| **Authenticated Collaborator** | A logged-in Annotly user reviewing a project shared with them. | Authenticated via Supabase Auth session (`userId`) | Team member, internal developer, secondary reviewer |
| **Public Guest Reviewer** | An external client reviewing a website via a shareable link. | Unauthenticated (zero-install; identified by `authorName` and `authorEmail`) | External agency client, marketing director, stakeholder |
| **Anonymous Intruder** | An unauthenticated actor attempting unauthorized access. | Unauthenticated (no valid share token or session) | Unauthorized web scraper, cross-tenant attacker |

---

## 2. Entity Access Control Matrix

### Legend
- **ALLOW**: Permitted by default.
- **OWNER**: Permitted only if the actor is the verified project owner (`actor.userId === project.userId`).
- **AUTHOR**: Permitted only if the actor is the verified comment author (`actor.userId === annotation.userId` or `actor.email === annotation.authorEmail`).
- **ACTIVE**: Permitted only if the review canvas is active (`reviewAccess === 'public'`).
- **DENY**: Forbidden (returns `403 Forbidden` or `404 Not Found`).

| Resource & Operation | Project Owner | Authenticated Collaborator | Public Guest Reviewer | Anonymous Intruder |
| :--- | :---: | :---: | :---: | :---: |
| **Projects** | | | | |
| Create Project | **ALLOW** | **ALLOW** | **DENY** | **DENY** |
| List Owned Projects | **OWNER** | **DENY** | **DENY** | **DENY** |
| Get Project by ID | **OWNER** | **DENY** | **DENY** | **DENY** |
| Update Project Settings / Rename | **OWNER** | **DENY** | **DENY** | **DENY** |
| Rotate Review Token | **OWNER** | **DENY** | **DENY** | **DENY** |
| Delete Project | **OWNER** | **DENY** | **DENY** | **DENY** |
| View Project Dashboard Metrics | **OWNER** | **DENY** | **DENY** | **DENY** |
| **Canvases** | | | | |
| View Public Review Canvas (`/review/[token]`) | **ALLOW** | **ALLOW** | **ALLOW** | **DENY** (without valid token) |
| List Project Canvases | **OWNER** | **DENY** | **DENY** | **DENY** |
| Toggle Canvas Access (`public` / `paused`) | **OWNER** | **DENY** | **DENY** | **DENY** |
| **Annotations (Visual Pins)** | | | | |
| Create Pin on Canvas | **ACTIVE** | **ACTIVE** | **ACTIVE** | **DENY** (if token invalid or paused) |
| View Canvas Annotations | **ALLOW** | **ALLOW** | **ALLOW** | **DENY** (without token) |
| Resolve / Re-open Annotation | **OWNER** | **AUTHOR** | **AUTHOR** | **DENY** |
| Delete Annotation | **OWNER** | **AUTHOR** | **AUTHOR** | **DENY** |
| **Annotation Replies** | | | | |
| Post Threaded Reply | **ACTIVE** | **ACTIVE** | **ACTIVE** | **DENY** (if token invalid or paused) |
| View Replies Thread | **ALLOW** | **ALLOW** | **ALLOW** | **DENY** (without token) |
| Delete Reply | **OWNER** | **AUTHOR** | **AUTHOR** | **DENY** |

---

## 3. Security Guarantees & Privacy Enforcement

### 3.1 Least-Privilege Public Review Payload
When a reviewer loads `/review/[canvasToken]`, the API returns only the minimal data required to render the canvas:
- Canvas ID, token, name, and target website URL.
- Review access status (`public` or `paused`).
- Project display name and high-level comment counts.
- **Strictly Redacted:** Owner `userId`, owner email, billing information, private project descriptions, and other projects in the owner's workspace are **never** included in the public response payload.

### 3.2 Paused Review Access Policy
When an owner toggles review access to `paused`:
1. Existing comments and pins remain visible in read-only mode for historical context.
2. The UI renders a clear "Review Paused" indicator banner.
3. Server-side data access layer (`AnnotationService.createAnnotation` and `AnnotationService.addReply`) strictly rejects any incoming mutation attempts with an actionable message.

### 3.3 Tenant Isolation
1. All project database queries require a verified server-side `userId`.
2. Client-provided project IDs or user IDs are never trusted without matching the authenticated session.
3. Attempting to access another user's project ID produces a strict `403 Forbidden` error without confirming or leaking the project's internal structure.
