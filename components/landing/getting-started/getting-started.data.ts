export interface ConnectionRow {
  glyph: string
  glyphClass: string
  label: string
  status: string
}

export interface RoleRow {
  initials: string[]
  avatarClasses: string[]
  label: string
  permission: string
  permissionVariant: "success" | "info" | "muted"
}

export interface StepCopy {
  label: string
  title: string
  description: string
}

export const STEP_COPY: StepCopy[] = [
  {
    label: "STEP 1 — PASTE URL",
    title: "Plain website URL in",
    description:
      "No code, no ticket queue. Works on Webflow, Vercel, Shopify, or custom stack.",
  },
  {
    label: "STEP 2 — SHARE",
    title: "Your live site, not a copy",
    description:
      "Clients open the private link and comment immediately. Zero Chrome extensions.",
  },
  {
    label: "STEP 3 — RESOLVE",
    title: "Shipped inside the rules",
    description:
      "Shared only with the right people. 1-click resolve with commit tags.",
  },
]

export const CONNECTION_ROWS: ConnectionRow[] = [
  {
    glyph: "▲",
    glyphClass: "bg-muted text-foreground",
    label: "Vercel Staging v2.4",
    status: "connected",
  },
  {
    glyph: "⚡",
    glyphClass: "bg-info/10 text-info",
    label: "Guest Review Link",
    status: "zero-install",
  },
  {
    glyph: "✓",
    glyphClass: "bg-success/10 text-success",
    label: "CSP Framing Safe",
    status: "bypassed",
  },
]

export const ROLE_ROWS: RoleRow[] = [
  {
    initials: ["ER", "MV"],
    avatarClasses: ["bg-success/10 text-success", "bg-info/10 text-info"],
    label: "Client reviewers",
    permission: "Can comment",
    permissionVariant: "success",
  },
  {
    initials: ["AC"],
    avatarClasses: ["bg-secondary text-secondary-foreground"],
    label: "Agency team",
    permission: "Can resolve",
    permissionVariant: "info",
  },
  {
    initials: ["EXT"],
    avatarClasses: ["bg-muted text-muted-foreground"],
    label: "Public visitors",
    permission: "No access",
    permissionVariant: "muted",
  },
]
