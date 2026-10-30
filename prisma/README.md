# Database & Prisma ORM Architecture

This directory contains the Prisma schema, database configurations, and deployment guidelines for Annotly.

## 1. Database Architecture & Supabase Integration

Annotly uses **PostgreSQL** hosted on **Supabase** with **Prisma ORM**.

### Dual-URL Connection Strategy

To prevent connection exhaustion in serverless Next.js environments while supporting DDL schema migrations, Annotly uses two connection strings:

| Variable | Connection Type | Target Port | Usage |
| :--- | :--- | :--- | :--- |
| `DATABASE_URL` | PgBouncer Connection Pooler (Session / Transaction mode) | `5432` or `6543` | Used at runtime by Next.js Server Components and Server Actions |
| `DIRECT_URL` | Direct PostgreSQL Connection | `5432` | Used for schema migrations (`prisma db push`, `prisma migrate`) |

Example `.env.local` configuration:
```env
# Runtime pooled connection (Supabase pooler)
DATABASE_URL="postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require&pgbouncer=true"

# Direct connection for CLI migrations
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres?sslmode=require"
```

---

## 2. Development Workflow

### Pushing Schema Changes
When modifying `prisma/schema.prisma` during feature development:
```bash
# Push schema updates directly to the development database
npm run db:push

# Regenerate Prisma Client types
npm run db:generate
```

### Inspecting Database Content
To launch Prisma Studio locally for visual inspection:
```bash
npx prisma studio
```

---

## 3. Production Deployment Protocol

### Automated Builds (Vercel / Next.js)
The `package.json` includes a `postinstall` hook that runs `prisma generate`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```
This ensures `@prisma/client` is generated automatically during CI and production build phases before `next build` runs.

### Safe Migration Deployment
In CI/CD release pipelines (GitHub Actions, Vercel Build Steps):
1. **Never drop tables or columns in a single deploy.**
2. **Follow additive schema changes:**
   - **Step A:** Add new nullable columns or columns with `@default(...)`. Deploy application code that handles both old and new shapes.
   - **Step B:** Backfill data if necessary.
   - **Step C:** Remove deprecated columns in a follow-up deploy after all client/server code ceases reading them.
3. Apply schema updates during pipeline execution:
   ```bash
   npx prisma db push --accept-data-loss=false
   ```
   *Note: `--accept-data-loss=false` acts as a fail-safe against destructive operations in automated CI environments.*

---

## 4. Connection Pool & Performance Rules

1. **Singleton Client Instance:** Always import `prisma` from `@/lib/db`. Never instantiate `new PrismaClient()` in individual routes or components.
2. **Transaction Timeouts:** Keep multi-step transactions brief (`< 5000ms`) to avoid blocking connection pool slots.
3. **Index Optimization:** Every multi-tenant model must index foreign tenant identifiers (e.g. `@@index([userId])`).
4. **SSL Requirements:** Supabase connections require `sslmode=require`. Ensure this flag is present in connection strings.
