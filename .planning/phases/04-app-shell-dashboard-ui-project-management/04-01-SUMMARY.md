---
phase: 04-app-shell-dashboard-ui-project-management
plan: 01
subsystem: ui-dashboard
tags: [dashboard, app-shell, navigation, breadcrumbs, sidebar, user-nav]
requires:
  - phase: 03-auth
    artifact: supabase-auth
provides:
  - artifact: app/(dashboard)/layout.tsx
  - artifact: components/dashboard/dashboard-shell.tsx
  - artifact: components/dashboard/sidebar-nav.tsx
  - artifact: components/dashboard/top-nav.tsx
  - artifact: components/dashboard/mobile-nav.tsx
  - artifact: components/dashboard/user-nav.tsx
  - artifact: components/dashboard/breadcrumbs.tsx
tech-stack:
  added: []
  patterns:
    - Base UI / shadcn sheet for mobile drawer navigation
    - Fixed responsive desktop sidebar with active route highlighting
    - Next.js Server Component layout with Supabase auth session guard
key-files:
  created:
    - app/(dashboard)/layout.tsx
    - components/dashboard/dashboard-shell.tsx
    - components/dashboard/top-nav.tsx
    - components/dashboard/mobile-nav.tsx
    - components/dashboard/sidebar-nav.tsx
    - components/dashboard/user-nav.tsx
    - components/dashboard/breadcrumbs.tsx
key-decisions:
  - "Wrapped all dashboard routes in a shared server-rendered layout verifying session authenticity before delegating to DashboardShell"
  - "Styled navigation items with warm cream background (#f7f4ed), organic charcoal text (#1c1c1c), and 1px #eceae4 containment borders per DESIGN.md"
requirements-completed:
  - AUTH-02
  - AUTH-03
duration: 10 min
completed: 2026-10-27
---

# Phase 4 Plan 01: App Shell Layout & Navigation Summary

Authenticated application shell with responsive navigation layout, mobile drawer, breadcrumbs, and user account dropdown per DESIGN.md and AGENTS.md.

## What Was Built
- **`app/(dashboard)/layout.tsx`**: Server Component enforcing authenticated user session, fetching profile data, and wrapping views in `<DashboardShell>`.
- **`components/dashboard/dashboard-shell.tsx`**: Unified shell managing fixed desktop sidebar navigation and responsive top header.
- **`components/dashboard/sidebar-nav.tsx`**: Desktop sidebar with Annotly branding, active route indicators (Overview, Projects, Settings), and zero-install review callout.
- **`components/dashboard/top-nav.tsx`**: Sticky top navigation bar containing mobile drawer trigger, route breadcrumbs, quick "New Project" action, and user profile avatar dropdown.
- **`components/dashboard/mobile-nav.tsx`**: Accessible slide-out sheet drawer for mobile and tablet screens under 768px.
- **`components/dashboard/user-nav.tsx`**: Profile dropdown menu showing user name, email, workspace links, and sign-out action.
- **`components/dashboard/breadcrumbs.tsx`**: Dynamic breadcrumb trail mapping URL pathname segments to readable hierarchy.

## Self-Check: PASSED
- `app/(dashboard)/layout.tsx` exists and compiles
- `components/dashboard/dashboard-shell.tsx` exists and compiles
- `npm run typecheck` passes with zero errors
