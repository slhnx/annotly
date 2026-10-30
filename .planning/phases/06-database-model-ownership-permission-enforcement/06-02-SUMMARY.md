# Plan 06-02 Summary: Core Relational Schema

## Execution Overview
- Implemented and synchronized the complete core relational data model (`User`, `Project`, `Canvas`, `Annotation`, `AnnotationReply`, and `AnnotationStatus` enum) in PostgreSQL via Prisma ORM.
- Configured explicit foreign key constraints with `onDelete: Cascade` for parent-child project hierarchies (Project -> Canvases, Project -> Annotations, Annotation -> Replies).
- Modeled dual authorship on `Annotation` and `AnnotationReply` to support both registered accounts (`userId` with `onDelete: SetNull`) and frictionless zero-install guest reviewers (`authorName`, `authorEmail`).
- Structured `Annotation` model with 5-tier selector engine properties (`elementSelector`, `elementXPath`, `elementTag`, `elementTextSnippet`), element-relative percentage offsets (`offsetX`, `offsetY`), and viewport environment metadata (`viewportWidth`, `viewportHeight`, `devicePixelRatio`, `browser`, `os`).
- Integrated `ProjectService` with atomic `User` upserts and automatic default `Canvas` creation upon project provisioning.
- Implemented comprehensive integration test suite verifying relational lifecycles and cascade deletions.

## Key Changes
- [`prisma/schema.prisma`](file:///home/shaancodes/Desktop/annotly/prisma/schema.prisma):
  - Added `User` model with email uniqueness, timestamps, and relation arrays.
  - Added `Canvas` model with unique tokens, project references, and URL mappings.
  - Added `Annotation` model with element selectors, percentage coordinates, device metadata, status enum, and reply relations.
  - Added `AnnotationReply` model for threaded discussions.
  - Added foreign key indexes and status indexes across all models.
- [`features/projects/services/project-service.ts`](file:///home/shaancodes/Desktop/annotly/features/projects/services/project-service.ts):
  - Updated `createProject` to ensure/upsert user record and provision initial `Canvas` via Prisma nested writes.
  - Updated `regenerateReviewLink` to provision new canvas tokens.
  - Updated `_clearStore` to clean all relational tables.
- [`tests/schema-models.test.ts`](file:///home/shaancodes/Desktop/annotly/tests/schema-models.test.ts):
  - 5 comprehensive tests validating User uniqueness, Project/Canvas provisioning, 5-tier selector coordinates, guest threads, and cascade cleanup.

## Verification
- **Automated Tests:** All 36 tests passed cleanly across 9 test suites (`npm test`):
  - `Core Relational Schema & Models (Phase 6 Plan 06-02)` (5/5 passed)
  - `Database & Prisma ORM Configuration` (4/4 passed)
  - `Project Lifecycle & Security Validation` (9/9 passed)
  - `ProjectService & Ownership Isolation` (7/7 passed)
  - `Project Validation Schemas` (11/11 passed)
- **TypeScript Typecheck:** `npm run typecheck` (`tsc --noEmit`) exited with 0 errors.
- **ESLint:** `npm run lint` exited with 0 errors / 0 warnings.
