export interface LogEntry {
  time: string
  channel: string
  text: string
  alert?: boolean
  note?: boolean
}

export interface WithoutContent {
  headline: string
  logs: LogEntry[]
  metric: string
}

export interface ChecklistItem {
  text: string
  done: boolean
}

export interface PinPreview {
  tag: string
  detail: string
  pin: string
  actionText: string
  statusBadge: string
  isResolved: boolean
}

export interface WithContent {
  quote: string
  status: string
  subtext: string
  badge: string
  checklist: ChecklistItem[]
  preview: PinPreview
}

export interface ComparisonStep {
  step: string
  title: string
  subtitle: string
  without: WithoutContent
  with: WithContent
}

export const comparisonSteps: ComparisonStep[] = [
  {
    step: "01",
    title: "Feedback Capture",
    subtitle: "Vague Email vs. Element-Anchored Pin",
    without: {
      headline: "The Vague Email",
      logs: [
        { time: "10:14 AM", channel: "Email", text: "“Can you fix that button on the about page?”", alert: true },
        { time: "10:18 AM", channel: "Dev Notes", text: "✕ Missing page URL, element selector, and device width", note: true },
        { time: "10:32 AM", channel: "Slack", text: "“Which button? Header CTA or contact form?”" },
        { time: "10:45 AM", channel: "Client", text: "“The blue one. Also looks weird on my phone”" },
      ],
      metric: "Context missing · Unreproducible",
    },
    with: {
      quote: "“Button text wraps on iPhone. Bump horizontal padding to 14px.”",
      status: "Annotly Pin #04 is locked",
      subtext: "Sarah Jenkins (Client Reviewer) · Staging v2.4",
      badge: "Element Anchor",
      checklist: [
        { text: "Anchored to button.btn-primary#hero-cta at X: 42%, Y: 68%", done: true },
        { text: "Auto-captured iPhone 15 Pro · 393×852 · Safari 17.4", done: true },
        { text: "Instant lossless client-side screen snapshot attached", done: true },
        { text: "Coordinates locked to DOM rect (Resize & Reflow Safe)", done: true },
      ],
      preview: {
        tag: "button.btn-primary#hero-cta",
        detail: "393×852 (Mobile Safari)",
        pin: "4",
        actionText: "Pin anchored in 5 seconds",
        statusBadge: "Ready to Deploy",
        isResolved: false,
      },
    },
  },
  {
    step: "02",
    title: "Environment Triage",
    subtitle: "18 Slack Messages vs. Instant Diagnostics",
    without: {
      headline: "The Slack Detective Game",
      logs: [
        { time: "11:05 AM", channel: "Slack", text: "“What phone model and browser are you using?”" },
        { time: "11:45 AM", channel: "Email", text: "[IMG_9402_screen.png attached (no URL bar)]", alert: true },
        { time: "01:15 PM", channel: "Slack", text: "“Cannot reproduce on desktop Chrome 1440px”", alert: true },
        { time: "02:30 PM", channel: "Slack", text: "“Wait, are you testing on staging or live?”" },
      ],
      metric: "18 messages sent · 3 hours spent guessing",
    },
    with: {
      quote: "“Developer opens pin. Full environment diagnostics attached.”",
      status: "Auto-Diagnostics Populated",
      subtext: "Alex Chen (Frontend Dev) · Staging v2.4",
      badge: "Deep Telemetry",
      checklist: [
        { text: "Exact viewport verified: 393×852 (Device Pixel Ratio 2.0x)", done: true },
        { text: "Webkit engine & iOS 17.4 color scheme flags recorded", done: true },
        { text: "Instant snapshot rendered directly from reviewer canvas", done: true },
        { text: "Zero back-and-forth asking 'What screen were you on?'", done: true },
      ],
      preview: {
        tag: "button.btn-primary#hero-cta",
        detail: "Viewport: 393×852 • Engine: Mobile Safari 17.4",
        pin: "4",
        actionText: "Reproduced in 10 seconds",
        statusBadge: "Verified on Staging",
        isResolved: false,
      },
    },
  },
  {
    step: "03",
    title: "Resolution & Sign-off",
    subtitle: "Emergency Zoom vs. 1-Click Resolve",
    without: {
      headline: "The Emergency Alignment Call",
      logs: [
        { time: "03:45 PM", channel: "Email", text: "“Can we just jump on a quick Zoom call?”", alert: true },
        { time: "04:10 PM", channel: "Calendar", text: "Emergency Feedback Alignment (45 mins)", alert: true },
        { time: "05:00 PM", channel: "Status", text: "1 full day lost clarifying a 1-line CSS padding fix" },
        { time: "05:15 PM", channel: "Outcome", text: "Frustrated client · Delayed milestone sign-off", alert: true },
      ],
      metric: "6 hours wasted · 0 lines of code pushed",
    },
    with: {
      quote: "“CSS padding updated: 10px → 14px. Fix verified on staging.”",
      status: "Resolved in Commit #9f2a",
      subtext: "Alex Chen (Frontend Dev) · Staging v2.4",
      badge: "1-Click Sign-Off",
      checklist: [
        { text: "Fix pushed directly to staging branch in 2 minutes", done: true },
        { text: "Pin marked resolved with 1 click; link stays 100% clean", done: true },
        { text: "Client receives visual confirmation in their browser", done: true },
        { text: "Sprint review approved without emergency calls", done: true },
      ],
      preview: {
        tag: "button.btn-primary#hero-cta",
        detail: "CSS padding updated: 10px → 14px",
        pin: "✓",
        actionText: "Resolved in commit #9f2a",
        statusBadge: "Closed & Clean",
        isResolved: true,
      },
    },
  },
]
