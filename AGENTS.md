# AGENTS.md — Annotly Engineering Standards

## 1. Project Context

Annotly is a website-feedback and visual collaboration SaaS. Users should be able to create review projects, share review links, leave visual annotations, discuss feedback, and resolve comments.

Preferred technology stack:
- Next.js App Router
- React and TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma ORM
- Authentication appropriate for a multi-user SaaS

Treat the existing repository, installed dependencies, and established architecture as the source of truth. Do not replace technologies or introduce new architectural patterns without a clear technical reason.

The goal is to build software that is maintainable, secure, testable, accessible, and easy for other developers to understand.

---

## 2. Core Engineering Principles

Follow these principles in every implementation:

1. **Modularity:** Every module must have a clear responsibility.
2. **Separation of concerns:** Keep UI, business logic, data access, validation, and infrastructure concerns separate where appropriate.
3. **Reusability:** Extract shared functionality when multiple consumers genuinely benefit from it.
4. **Simplicity:** Prefer the simplest design that satisfies the requirements.
5. **Type safety:** Use TypeScript to catch errors before runtime.
6. **Security by default:** Validate inputs, enforce authorization, and protect sensitive data.
7. **Testability:** Design important business logic so it can be tested independently.
8. **Consistency:** Follow established conventions instead of introducing unnecessary alternatives.
9. **Incremental development:** Implement small, verifiable changes rather than rewriting large parts of the application.
10. **Explicit trade-offs:** Document significant architectural decisions and their reasoning.

Do not introduce abstractions, design patterns, or dependencies merely to make the code appear more sophisticated.

---

## 3. Modular Code and Component Design

### 3.1 Single responsibility

Each component, module, function, and service should have one clear primary responsibility.

- Avoid components that fetch data, implement complex business rules, manage unrelated state, and render an entire page in one file.
- Separate complex business logic from presentation.
- Extract independently meaningful sections into dedicated components.
- Keep functions focused on one task.
- Prefer composition over deeply nested conditionals and complicated prop combinations.

### 3.2 Component size

- Keep components small enough to understand without navigating through hundreds of unrelated lines.
- Treat components exceeding approximately 150 lines as a signal to review their responsibilities, not as an automatic requirement to split them.
- Investigate files exceeding approximately 250 lines for possible separation of concerns.
- Large files are acceptable when the content is cohesive, such as configuration, generated code, or a naturally unified implementation.
- Do not extract tiny components that add indirection without improving clarity or reuse.

When a component becomes difficult to understand, separate its responsibilities into meaningful components, hooks, utilities, or domain modules.

### 3.3 Reusable components

Create reusable components when:
- A UI pattern appears in multiple locations.
- Multiple features share the same interaction or visual behavior.
- A complex component benefits from composition.
- Shared behavior must remain consistent throughout the application.

Avoid premature abstraction.

Do not create a generic component with numerous boolean props merely to support unrelated use cases. Prefer explicit variants, composition, or separate components when their responsibilities differ.

### 3.4 Avoid duplication

- Follow the DRY principle when duplicated logic has the same meaning and is likely to evolve together.
- Extract repeated validation, formatting, business rules, and shared UI patterns.
- Do not force unrelated logic into one abstraction merely because the code looks similar.
- Keep abstractions proportional to their actual use.

### 3.5 Function design

- Prefer small, focused functions with descriptive names.
- Avoid deeply nested conditionals.
- Use early returns when they improve readability.
- Avoid excessive parameters; use a well-defined options object when appropriate.
- Avoid hidden side effects and unexpected mutation.
- Make asynchronous behavior explicit.
- Do not use deeply nested callbacks when clearer alternatives exist.

---

## 4. Folder Structure and Architecture

Use a feature-oriented structure that groups related functionality together.

An illustrative structure:

```text
src/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── projects/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── reviews/
│   ├── annotations/
│   └── comments/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── env/
│   └── utils/
│
└── types/
```

Adapt this structure to the actual project instead of creating every directory immediately.

Rules:
- Keep route files focused on routing, composition, and page-level concerns.
- Put feature-specific components and logic inside their respective feature modules.
- Reserve `components/ui/` for reusable design-system primitives, including shadcn/ui components.
- Reserve shared components for genuinely cross-feature functionality.
- Keep database access behind a consistent, well-defined boundary.
- Avoid circular dependencies.
- Avoid giant `utils.ts`, `helpers.ts`, `types.ts`, or `services.ts` files containing unrelated functionality.
- Use clear import paths and avoid unnecessarily deep directory nesting.
- Keep generated files separate from manually maintained code.

Do not reorganize the entire repository just to match this example. Propose structural changes when they provide a meaningful improvement.

---

## 5. TypeScript Standards

- Enable and preserve strict TypeScript checking.
- Avoid `any`. Use `unknown` when the type is not yet known and narrow it safely.
- Do not silence type errors using `@ts-ignore`, broad type assertions, or non-null assertions without a justified, documented reason.
- Prefer explicit domain types and well-defined interfaces at important boundaries.
- Infer types where inference is clear and reliable.
- Use discriminated unions for state models with distinct variants.
- Avoid duplicating types when a canonical type can safely be reused.
- Do not expose internal database models directly as public API contracts when their shape or fields are inappropriate for clients.
- Validate external data at runtime; TypeScript types alone do not validate incoming requests.
- Keep types close to the domain or module that owns them.

Never weaken TypeScript settings merely to make an implementation compile.

---

## 6. React and Next.js Best Practices

### 6.1 Server and client components

- Prefer React Server Components by default.
- Add `"use client"` only when browser APIs, event handlers, client-side state, or client-only libraries require it.
- Keep client component boundaries as narrow as practical.
- Do not turn an entire page into a client component just because one child needs interactivity.
- Avoid passing non-serializable values across Server Component and Client Component boundaries.

### 6.2 Data fetching

- Fetch data as close as practical to the server-rendered component or appropriate data-access layer.
- Avoid unnecessary client-side fetching for data already available on the server.
- Prevent N+1 queries and unnecessary duplicate requests.
- Use pagination for potentially large collections.
- Apply caching and revalidation intentionally. Never cache user-specific data across users.
- Handle loading, empty, error, and success states.
- Do not fetch data inside effects when a server-side or established framework data-fetching approach is more appropriate.

### 6.3 State management

- Keep state as local as possible.
- Use URL state for shareable filters, search parameters, and navigation state when appropriate.
- Avoid duplicating derived values in state.
- Use shared state only when multiple components genuinely need coordinated state.
- Avoid adding a global state library unless the application demonstrates a real need.

### 6.4 React hooks

- Follow the Rules of Hooks.
- Extract custom hooks when they encapsulate meaningful reusable stateful behavior.
- Keep hooks focused and predictable.
- Do not create custom hooks solely to move a few trivial lines into another file.

### 6.5 Rendering and performance

- Avoid unnecessary re-renders and expensive repeated computations.
- Do not use `useMemo`, `useCallback`, or `memo` indiscriminately.
- Use virtualization or pagination for large collections when appropriate.
- Avoid loading heavy client-side libraries on pages that do not need them.
- Measure performance before applying complicated optimizations.

### 6.6 Navigation and routing

- Use Next.js navigation primitives appropriately.
- Validate route parameters and search parameters.
- Enforce authorization on the server rather than relying on hidden UI elements.
- Provide appropriate not-found and error handling.

---

## 7. UI, Styling, and Design System

Annotly must have a consistent and maintainable interface.

- Use shadcn/ui components wherever appropriate.
- Reuse existing components before creating new primitives.
- Use Tailwind CSS and the established theme variables.
- Do not hardcode colors when an appropriate design token exists.
- Avoid scattered arbitrary spacing, colors, shadows, and border values.
- Keep typography, spacing, radius, and component variants consistent.
- Use the existing icon library instead of introducing multiple icon libraries.
- Prefer semantic HTML and accessible interaction patterns.
- Ensure responsive behavior across mobile, tablet, and desktop.
- Support keyboard navigation and visible focus indicators.
- Include meaningful labels and accessible names for interactive controls.
- Do not rely on color alone to communicate status.
- Avoid unnecessary animation and respect reduced-motion preferences.
- Use consistent skeletons, empty states, error messages, and loading indicators.

For new components:
1. Check whether an existing component can be reused.
2. Identify the appropriate design tokens.
3. Define a small, explicit set of supported variants.
4. Implement accessibility and responsive behavior.
5. Verify consistency with the rest of the application.

Do not modify shadcn/ui primitives globally when a local composition or variant would solve the problem.

### 7.1 Inspiration and Reference Design Policy (Mandatory)

Whenever the user provides an external inspiration file, screenshot, mockup, UI link, or reference image:

1. **Do NOT blindly copy:** Never verbatim copy the inspiration's raw styling, external color palettes, foreign font stacks, or arbitrary box shadows. External materials serve strictly as conceptual, UX, or layout inspiration.
2. **Strictly enforce `DESIGN.md`:** Translate all layouts, components, surfaces, and visual hierarchy into Annotly's established design system:
   - Primary warm parchment background (`#f7f4ed`), organic charcoal (`#1c1c1c`), and off-white (`#fcfbf8`).
   - Signature dark buttons with inset shadow (`--shadow-button-inset`) and 6px or pill (`9999px`) radii.
   - Bricolage Grotesque display typography with negative tracking (-0.9px to -1.5px) and Inter for body/inputs.
   - 1px `#eceae4` containment borders rather than arbitrary drop shadows.
3. **Rephrase content for Annotly:** Never copy third-party, foreign, or placeholder copy verbatim (e.g. budgeting, banking, travel, generic SaaS). All headings, taglines, subtext, button labels, and microcopy must be thoughtfully contextualized and rephrased for Annotly's domain: **visual website feedback, zero-install live canvas reviews, element-anchored commenting, and agency-client collaboration**.

---

## 8. Backend and Business Logic

- Keep business rules independent of presentation wherever practical.
- Validate inputs at the server boundary.
- Centralize important domain rules instead of duplicating them across route handlers and UI components.
- Use explicit request and response contracts.
- Return consistent error responses.
- Avoid exposing internal exceptions, stack traces, or database details to clients.
- Keep database transactions around operations that must succeed or fail together.
- Make retry behavior and idempotency explicit for operations that may execute more than once.
- Avoid overly generic service layers that simply forward calls without adding value.
- Do not trust client-supplied ownership, role, or permission information.

Use Route Handlers, Server Actions, or other established application boundaries according to the operation. Do not introduce multiple competing patterns without a reason.

---

## 9. Database and Prisma

- Keep the Prisma schema readable and organized.
- Use explicit relationships, appropriate constraints, and indexes.
- Use migrations for schema changes; do not rely on manual production database edits.
- Never reset, drop, or destructively modify a database without explicit authorization and a verified recovery plan.
- Avoid fetching entire tables when only a subset of records is required.
- Select only necessary fields when practical.
- Use transactions for multi-step operations requiring atomicity.
- Handle unique constraints, missing records, and concurrent updates correctly.
- Avoid N+1 queries.
- Review the performance implications of new indexes and queries.
- Use stable pagination strategies appropriate to the dataset.
- Do not place Prisma Client calls throughout unrelated UI components.
- Preserve referential integrity and define deletion behavior deliberately.

For multi-tenant data, scope database operations to the authorized user or tenant. Never rely exclusively on client-side filtering.

---

## 10. Authentication, Authorization, and Security

Security is mandatory, not optional.

- Use the project's established authentication solution.
- Authenticate protected operations on the server.
- Authorize every protected read and write operation.
- Verify resource ownership and project membership before allowing access.
- Deny access by default when authorization cannot be established.
- Never trust a user ID, role, project ID, or permission supplied by the client without server-side verification.
- Validate and sanitize untrusted input according to its context.
- Use parameterized database operations.
- Prevent injection vulnerabilities, broken access control, and unintended data exposure.
- Apply appropriate rate limits to sensitive or abuse-prone endpoints.
- Protect state-changing operations against relevant CSRF and request-origin risks.
- Avoid logging passwords, authentication tokens, session secrets, or unnecessary personal information.
- Store secrets in environment variables or an appropriate secrets manager.
- Never commit `.env` files containing real credentials.
- Keep server-only code and secrets out of client bundles.
- Review file uploads, URL fetching, and external resource processing for security risks.

### Annotly-specific security requirements

- Shareable review links must have explicit access semantics.
- Treat unlisted or hard-to-guess URLs as insufficient authorization for private resources.
- Implement expiration, revocation, and permission rules where required by the product.
- Validate annotation coordinates and associated resource identifiers.
- Prevent users from accessing other users' projects, comments, or review sessions.
- If implementing server-side URL fetching or screenshot generation, protect against SSRF, private-network access, redirect abuse, and resource exhaustion.
- Treat third-party websites and their content as untrusted.
- Do not inject arbitrary website HTML into the main application origin.

Document security-sensitive design decisions and test access-control boundaries.

---

## 11. Validation and Error Handling

- Use the project's established runtime validation library, such as Zod, if already installed.
- Validate form submissions, API inputs, environment variables, and external data at appropriate boundaries.
- Share validation schemas between client and server when this is safe and useful.
- Keep server-side validation authoritative.
- Provide clear, actionable user-facing errors.
- Preserve useful diagnostic context in server-side logs without leaking secrets.
- Avoid empty catch blocks and swallowed errors.
- Do not use exceptions for ordinary control flow when a clearer result type is appropriate.
- Distinguish validation errors, authorization failures, missing resources, conflicts, and unexpected failures.
- Handle network failures, timeouts, and retry limits explicitly.
- Never display raw database errors to end users.

---

## 12. Testing and Quality Assurance

Write tests proportional to the risk and complexity of the feature.

### Unit tests

Test important business logic, transformations, validation rules, and edge cases independently.

### Integration tests

Test interactions among the database, business logic, authentication, and API boundaries.

### End-to-end tests

Test critical user journeys, especially:
- Authentication and access control.
- Creating and managing projects.
- Opening shared review links.
- Creating and viewing annotations.
- Adding and resolving comments.
- Preventing unauthorized access to other users' resources.

### Testing rules

- Test behavior, not implementation details.
- Include relevant failure and boundary cases.
- Avoid brittle tests tied to internal component structure.
- Do not mock every dependency when a meaningful integration test is practical.
- Do not claim a test passed without executing it.
- Fix regressions introduced by the change before considering the task complete.

Follow the testing tools already configured in the repository. Do not install a new testing framework without a clear need.

---

## 13. Code Formatting and Naming

Follow the repository's existing ESLint, formatter, and naming conventions.

General conventions:
- Use descriptive names that communicate intent.
- Prefer explicit names over unexplained abbreviations.
- Use PascalCase for React components and types.
- Follow the established conventions for files, functions, hooks, and constants.
- Use consistent import ordering when enforced by the project.
- Avoid long, difficult-to-read expressions and deeply nested ternaries.
- Break complex logic into named intermediate steps.
- Avoid unexplained magic numbers and strings.
- Extract meaningful constants when doing so improves clarity.
- Remove unused variables, imports, and dead code.
- Do not leave debug statements, temporary workarounds, or placeholder implementations in production code.
- Do not add comments that merely repeat the code.

Comments should explain reasoning, non-obvious constraints, important trade-offs, or surprising behavior.

Use explicit return types for exported functions when they improve clarity or enforce an important contract. Do not annotate every trivial local expression unnecessarily.

---

## 14. Dependencies and Package Management

- Inspect existing dependencies before adding new ones.
- Prefer the existing framework and installed libraries.
- Add dependencies only when they provide meaningful value.
- Avoid multiple libraries that solve the same problem.
- Review package maintenance, licensing, compatibility, security, and bundle-size implications.
- Use the repository's existing package manager and lockfile.
- Do not casually upgrade unrelated dependencies.
- Never run destructive package or repository commands without understanding their effects.
- Do not use deprecated APIs when a supported alternative is available.

Before adding a dependency, explain why existing tools are insufficient when the decision has meaningful architectural or maintenance implications.

---

## 15. Environment Configuration

- Validate required environment variables at application startup or an appropriate configuration boundary.
- Keep configuration centralized and typed.
- Separate public variables from server-only secrets.
- Never expose secret values through `NEXT_PUBLIC_` variables.
- Provide an `.env.example` containing placeholder values only.
- Document required local development services and setup steps.
- Fail clearly when required configuration is missing.
- Never print real secret values during debugging.
- Keep development, testing, staging, and production configuration appropriately separated.

Do not silently invent credentials, endpoints, or production configuration.

---

## 16. Git and Change Management

- Inspect the current working tree before making changes.
- Preserve unrelated user modifications.
- Avoid broad refactors during narrowly scoped feature work.
- Make changes focused and reviewable.
- Do not revert user changes without explicit authorization.
- Do not commit, push, or publish changes unless requested or explicitly authorized by the established workflow.
- Never use force-push or destructive Git operations without explicit authorization.
- Avoid committing generated build artifacts, secrets, dependency directories, or local configuration files.

### 16.1 Phase Branching Protocol (Mandatory for GSD Phases)

Whenever executing a new phase through GSD (e.g. `/gsd-execute-phase <N>`):
1. **Verify All Changes Committed First:** Before branching, inspect `git status` to ensure that all prior work, docs, and previous phase implementations are fully committed. The working tree MUST be clean.
2. **Create New Phase Branch:** Branch off the default branch (`main`) following the pattern `phase-<N>-<slug>` (e.g., `phase-3-auth`).
3. **Publish / Push Upstream Immediately:** Immediately publish the new branch to the remote repository with upstream tracking:
   ```bash
   git checkout -b phase-<N>-<slug>
   git push -u origin phase-<N>-<slug>
   ```
4. **Checkout and Verify Branch:** Confirm you are checked out inside the new phase branch before making any code, design, or documentation modifications.
5. **Implement and Commit on Phase Branch:** All plan tasks, code changes, and verification summaries for that phase must be committed and pushed to this dedicated phase branch.

When a change affects architecture or multiple features, summarize its scope and reasoning.

---

## 17. AI Agent Workflow

Before implementing any task:

1. Read this file and relevant project documentation.
2. Inspect the existing code and identify the actual entry points.
3. Search for existing components, utilities, schemas, and services that can be reused.
4. Understand dependencies and the current architecture.
5. Identify security, data integrity, performance, and migration implications.
6. Propose a concise implementation plan for significant changes.
7. Implement only the necessary scope.
8. Run relevant checks and inspect the resulting diff.

For complex tasks, break work into independently verifiable steps.

Do not:
- Rewrite entire modules when a focused change is sufficient.
- Invent APIs, dependencies, or existing functionality.
- Assume that an uninspected file has a particular implementation.
- Claim that a feature is complete when it is only partially implemented.
- Hide test failures or type errors.
- Introduce placeholder business logic without clearly identifying it.
- Perform destructive operations without authorization.
- Modify unrelated files simply to make the code look consistent.

When requirements are ambiguous, resolve important product decisions before committing to a costly implementation. For low-risk details, use a reasonable convention consistent with the project.

### REA workflow

Use REA to investigate reference behavior or unfamiliar technical constraints when needed.

- Save meaningful findings in project documentation.
- Distinguish observed behavior from assumptions.
- Do not repeatedly investigate the same documented behavior without a reason.
- Treat reference behavior as input to product decisions, not as a requirement to copy every detail.
- Do not claim access to private source code or backend behavior without evidence.

### GSD workflow

Use GSD for project initialization, requirements, milestones, and incremental implementation when it is part of the established workflow.

- **Mandatory Phase Branching:** When starting a phase (e.g. `/gsd-execute-phase <N>`), ensure working tree is clean, create `phase-<N>-<slug>`, push and track it on origin, checkout inside it, and only then make changes.
- **Design & Inspiration Translation:** Whenever given an inspiration image, design mockup, or reference screenshot, do NOT blindly copy it. Adapt the layout and spatial structure strictly using Annotly's `DESIGN.md` design system tokens, and rephrase all content and copy specifically for Annotly's website review platform.
- Keep requirements and acceptance criteria explicit.
- Implement manageable tasks.
- Verify each milestone before proceeding.
- Update documentation when architecture or requirements materially change.
- Do not blindly follow an outdated plan when repository evidence reveals a problem.

---

## 18. Definition of Done

A task is complete only when all applicable criteria are satisfied:

- [ ] The implementation meets the requested acceptance criteria.
- [ ] Code is modular, cohesive, and consistent with the existing architecture.
- [ ] Existing functionality remains intact.
- [ ] Input validation and error handling are implemented.
- [ ] Authentication and authorization are correct for protected operations.
- [ ] Loading, empty, success, and failure states are handled where applicable.
- [ ] Responsive behavior and accessibility have been considered.
- [ ] Relevant tests have been written or updated.
- [ ] Linting and type checking pass.
- [ ] Relevant tests pass.
- [ ] Database migrations are included when needed and have been reviewed.
- [ ] No secrets or sensitive information have been exposed.
- [ ] Documentation is updated when necessary.
- [ ] The final diff has been reviewed for unrelated changes, duplication, and accidental regressions.

If a check cannot be run, explicitly state which check was skipped and why. Never report an unverified check as passing.

---

## 19. Final Communication

At the end of each task, provide a concise summary containing:

1. What was implemented.
2. The important files or modules changed.
3. Architectural or security decisions worth noting.
4. Tests and checks actually executed, including their results.
5. Known limitations, unresolved issues, or follow-up work.

Be precise and honest. Distinguish implemented functionality from planned work and verified behavior from assumptions.

The objective is not to maximize the amount of code written. The objective is to deliver correct, maintainable, secure, and understandable software with the smallest reasonable amount of complexity.