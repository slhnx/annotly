import type { FeatureTone } from "./feature-showcase.data"

interface ToneClasses {
  card: string
  badge: string
  lead: string
  highlight: string
  toggle: string
  frame: string
}

export const TONE_CLASSES: Record<FeatureTone, ToneClasses> = {
  neutral: {
    card: "border-border bg-secondary text-foreground",
    badge: "border-foreground/10 bg-foreground/5 text-foreground",
    lead: "text-foreground",
    highlight: "text-success",
    toggle: "bg-foreground/10 text-foreground hover:bg-foreground/15",
    frame: "border-border-interactive",
  },
  success: {
    card: "border-success/20 bg-success/10 text-foreground",
    badge: "border-success/20 bg-success/10 text-foreground",
    lead: "text-foreground",
    highlight: "text-success",
    toggle: "bg-success/15 text-success hover:bg-success/25",
    frame: "border-border-interactive",
  },
  inverse: {
    card: "border-inverse-foreground/15 bg-inverse text-inverse-foreground",
    badge:
      "border-inverse-foreground/15 bg-inverse-foreground/10 text-inverse-foreground",
    lead: "text-inverse-foreground",
    highlight: "text-inverse-foreground",
    toggle:
      "bg-inverse-foreground/15 text-inverse-foreground hover:bg-inverse-foreground/25",
    frame: "border-inverse-foreground/15",
  },
}
