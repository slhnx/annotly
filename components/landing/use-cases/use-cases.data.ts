export interface RoleCardData {
  id: string
  role: string
  targetFor: string
  headline: string
  description: string
  image: string
  perks: string[]
}

export interface SlideGroup {
  id: number
  statNumber: string
  statSuperscript?: string
  statUnit?: string
  statLabel: string
  slideLabel: string
  cards: RoleCardData[]
}

export const SLIDES: SlideGroup[] = [
  {
    id: 1,
    statNumber: "50",
    statSuperscript: "%",
    statUnit: "+",
    statLabel: "Faster client sign-offs & approvals",
    slideLabel: "Agencies, Freelancers & Product",
    cards: [
      {
        id: "agencies",
        role: "Web Agencies & Studios",
        targetFor: "For Web Agencies",
        headline: "Cut client revision rounds in half",
        description:
          "Send one review link. Clients point, click, and comment directly on staging—no extensions, accounts, or Zoom calls needed.",
        image: "/landing/roles/agency-airplane.png",
        perks: ["Zero-install client links", "Faster milestone sign-off"],
      },
      {
        id: "freelancers",
        role: "Freelance Devs & Designers",
        targetFor: "For Freelancers & Devs",
        headline: "Fix bugs with exact DOM selectors",
        description:
          "Stop guessing what 'make it pop' means. Every pin captures computed CSS, screen size, and DOM path automatically.",
        image: "/landing/roles/developer-prism.png",
        perks: ["Exact DOM selector path", "Computed CSS specs"],
      },
      {
        id: "product",
        role: "Product & QA Teams",
        targetFor: "For Product & QA Teams",
        headline: "Catch visual bugs before code merges",
        description:
          "Annotate Vercel previews and staging builds together. Designers, PMs, and QA squash visual regressions before production.",
        image: "/landing/roles/product-cubes.png",
        perks: ["Vercel & Netlify preview URLs", "Linear & GitHub issue sync"],
      },
    ],
  },
  {
    id: 2,
    statNumber: "100",
    statSuperscript: "%",
    statLabel: "Contextual production sign-off",
    slideLabel: "Marketing, Clients & Engineering",
    cards: [
      {
        id: "marketing",
        role: "Marketing & Brand Leads",
        targetFor: "For Marketing & Content",
        headline: "Audit live copy and banners in place",
        description:
          "Review live Webflow, Shopify, or Next.js marketing pages before launch. Flag typos and approve layouts in true viewports.",
        image: "/landing/roles/marketing-lens.png",
        perks: ["Live in-place text review", "Webflow & Shopify ready"],
      },
      {
        id: "guests",
        role: "Clients & Stakeholders",
        targetFor: "For Non-Technical Clients",
        headline: "Give feedback in 10 seconds, zero installs",
        description:
          "No browser extensions, no passwords, no login required. Clients open a secure link on desktop or phone and leave comments.",
        image: "/landing/roles/guest-envelope.png",
        perks: ["Instant guest commenting", "Zero password friction"],
      },
      {
        id: "engineering",
        role: "Engineering Leads",
        targetFor: "For Engineering Teams",
        headline: "Sync visual threads directly into git",
        description:
          "Convert element comments into actionable GitHub PR commits and Linear tickets in one click with exact DOM selectors.",
        image: "/landing/roles/engineering-bracket.png",
        perks: ["1-click GitHub PR sync", "Linear ticket tracking"],
      },
    ],
  },
]
