import { CheckCircle2, Cpu, MousePointerClick, type LucideIcon } from "lucide-react"

export interface Chapter {
  step: string
  title: string
  description: string
  badge: string
  icon: LucideIcon
}

export interface DiagnosticItem {
  label: string
  value: string
}

export const chapters: Chapter[] = [
  {
    step: "01",
    title: "Point & Click Anchoring",
    description:
      "Click any element to drop a pin. Coordinates stay locked across resizes and layout reflows using element-relative math.",
    badge: "5-Tier CSS Anchor",
    icon: MousePointerClick,
  },
  {
    step: "02",
    title: "Automatic Diagnostics",
    description:
      "Every comment captures viewport size, browser engine, OS, and an instant screen snapshot. No back-and-forth guessing.",
    badge: "Auto Diagnostics",
    icon: Cpu,
  },
  {
    step: "03",
    title: "One-Click Resolution",
    description:
      "Discuss feedback in technical context, push staging fixes, and resolve pins with one click.",
    badge: "Instant Sign-off",
    icon: CheckCircle2,
  },
]

export const diagnosticItems: DiagnosticItem[] = [
  { label: "Viewport", value: "1440 × 900 px" },
  { label: "Engine", value: "Chrome 122.0" },
  { label: "OS", value: "macOS Sonoma" },
  { label: "Pixel Ratio", value: "2.0 (Retina)" },
  { label: "Snapshot", value: "< 380ms (Canvas)" },
  { label: "Color Scheme", value: "Light (Parchment)" },
]
