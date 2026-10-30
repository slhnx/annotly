export type FeatureTone = "neutral" | "success" | "inverse"

export interface FeatureItem {
  leadIn: string
  description: string
  badge: string
  highlight: string
  image: string
  tone: FeatureTone
}

export const FEATURES: FeatureItem[] = [
  {
    leadIn: "Anti-drift coordinate math.",
    description:
      "Pins anchor to DOM elements via relative percentages, not fragile raw pixels. Comments stay locked during text reflow, layout shifts, and responsive breakpoints.",
    badge: "Anti-Drift Math",
    highlight: "Guaranteed alignment across dynamic screens",
    image: "/landing/pin-coordinate-math.jpg",
    tone: "neutral",
  },
  {
    leadIn: "Zero-install client guest mode.",
    description:
      "Deliver polished review canvases that work on any device. Anyone with your private link can click and comment immediately—no Chrome extensions, no client logins.",
    badge: "Frictionless Access",
    highlight: "Clients comment in seconds without accounts",
    image: "/landing/guest-access-mode.jpg",
    tone: "success",
  },
  {
    leadIn: "Sub-500ms in-browser snapshots.",
    description:
      "Every comment automatically captures a client-side HTML5 canvas snapshot of the exact screen state. Inspect live elements and visual snapshots side by side.",
    badge: "HTML5 Canvas",
    highlight: "Instant visual snapshot attached to each pin",
    image: "/landing/browser-snapshot-mode.jpg",
    tone: "inverse",
  },
  {
    leadIn: "Unified multi-device viewports.",
    description:
      "Switch between desktop, tablet, and mobile breakpoints directly in the review canvas. Identify and resolve responsive styling bugs in one unified workspace.",
    badge: "1440px • 768px • 375px",
    highlight: "Inspect every responsive breakpoint in 1 click",
    image: "/landing/multi-device-viewports.jpg",
    tone: "neutral",
  },
]

export const STUDIO_PARTNERS = [
  { name: "Studio Nord", className: "font-heading text-sm font-bold tracking-tight" },
  { name: "Monolith", className: "font-serif text-base tracking-wide italic" },
  { name: "VEKTOR", className: "font-mono text-xs font-bold tracking-widest uppercase" },
  { name: "Forma Lab", className: "font-heading text-sm font-semibold" },
  { name: "Bureau 01", className: "font-mono text-xs font-bold tracking-wider uppercase" },
  { name: "Kinfolk Dev", className: "font-serif text-base tracking-wide italic" },
] as const
