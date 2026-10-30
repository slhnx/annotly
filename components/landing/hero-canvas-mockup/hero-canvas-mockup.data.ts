export interface DemoStepRow {
  label: string
  sublabel: string
  value: string
  badge?: string
}

export interface DemoStep {
  id: number
  pillLabel: string
  title: string
  description: string
  rows: DemoStepRow[]
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 0,
    pillLabel: "01 Point & Anchor",
    title: "Point & drop a pin",
    description:
      "Click any DOM element to anchor feedback directly on the live website. Stays mathematically locked through responsive resizes.",
    rows: [
      {
        label: "Target Selector",
        sublabel: "button.cta-primary",
        value: "Hero CTA",
        badge: "DOM Anchor",
      },
      {
        label: "Device Viewport",
        sublabel: "390 × 844 px",
        value: "iPhone 15 Pro",
        badge: "Safari 17.4",
      },
      {
        label: "Offset Position",
        sublabel: "Element relative %",
        value: "X: 51.4% • Y: 28.6%",
      },
    ],
  },
  {
    id: 1,
    pillLabel: "02 Auto-Diagnostics",
    title: "Auto-telemetry diagnostics",
    description:
      "Never ask for browser specs again. Annotly logs device OS, computed contrast ratios, and element styles automatically.",
    rows: [
      {
        label: "Computed Contrast",
        sublabel: "WCAG 2.1 AA Standard",
        value: "4.8:1 Ratio",
        badge: "Pass",
      },
      {
        label: "Reviewer Identity",
        sublabel: "Lead Architect",
        value: "Elena Rostova",
        badge: "Client",
      },
      {
        label: "DOM Hierarchy",
        sublabel: "header > nav > button",
        value: "Level 3 Node",
      },
    ],
  },
  {
    id: 2,
    pillLabel: "03 1-Click Resolve",
    title: "1-Click git fix & resolve",
    description:
      "Turn visual notes into actionable commits. Close the feedback loop without sending a single screenshot or email thread.",
    rows: [
      {
        label: "GitHub Pull Request",
        sublabel: "#142 Fix hero CTA padding",
        value: "Merged ✓",
        badge: "main",
      },
      {
        label: "Thread Status",
        sublabel: "Verified by Alex Rivers",
        value: "Resolved ✓",
        badge: "Complete",
      },
      {
        label: "Linear Ticket",
        sublabel: "ANN-289 Design Polish",
        value: "Done",
        badge: "Synced",
      },
    ],
  },
]

export const STEP_DURATION_MS = 4500
export const TICK_INTERVAL_MS = 50
export const REPLAY_SPIN_MS = 600

/** Step index at which every pin is resolved. */
export const RESOLVED_STEP = 2

/** Static, already-resolved feedback items shown below the animated first item. */
export interface StaticFeedbackItem {
  title: string
  reporter: string
  value: string
  pin: string
  selector: string
  tag: string
}

export const STATIC_FEEDBACK_ITEMS: StaticFeedbackItem[] = [
  {
    title: "Headline Font Weight",
    reporter: "Marcus Vance • Chrome 122",
    value: "600 wt",
    pin: "#2",
    selector: "h1.hero",
    tag: "-1.5px",
  },
  {
    title: "Timber Canopy Contrast",
    reporter: "Sophia Brandt • iPad Pro",
    value: "7.2:1",
    pin: "#3",
    selector: ".canopy",
    tag: "AA Pass",
  },
]

/** Colour-free fractal-noise texture rendered as an overlay on the stage. */
export const GRAIN_BACKGROUND_IMAGE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
