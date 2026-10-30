import {
  AlertCircle,
  CalendarClock,
  Clock,
  Hash,
  Link2,
  Mail,
  MessageSquareWarning,
  MessagesSquare,
  Paperclip,
  TrendingDown,
  Video,
  type LucideIcon,
} from "lucide-react"

export type StepTone = "success" | "warning" | "destructive"

export interface StoryStep {
  day: string
  badge: string
  tone: StepTone
  title: string
  icon: LucideIcon
  description: string
  artifact: {
    icon: LucideIcon
    label: string
    meta: string
  }
  quote: string
}

export interface ImpactStat {
  icon: LucideIcon
  label: string
  value: string
  caption: string
}

export const STORY_STEPS: StoryStep[] = [
  {
    day: "Day 01",
    badge: "Optimistic",
    tone: "success",
    title: "The Staging Link",
    icon: CalendarClock,
    description:
      "You send the build on Friday afternoon. The client is excited to review.",
    artifact: { icon: Link2, label: "staging-v2.client.com", meta: "v2.4.0" },
    quote: "Looks gorgeous overall! Just have a few small thoughts.",
  },
  {
    day: "Day 03",
    badge: "Context Lost",
    tone: "warning",
    title: "The 14-Bullet Email",
    icon: Mail,
    description:
      "A long email arrives with vague notes and four unnamed screenshots.",
    artifact: { icon: Paperclip, label: "IMG_4912_screen.png", meta: "4 files" },
    quote: "Can we make that one button a bit bigger on mobile?",
  },
  {
    day: "Day 05",
    badge: "Momentum Halted",
    tone: "warning",
    title: "Detective Mode",
    icon: MessageSquareWarning,
    description:
      "18 Slack messages trying to guess the exact button, page, and viewport.",
    artifact: { icon: Hash, label: "#client-feedback", meta: "18 replies" },
    quote: "Wait, did they mean the header CTA or the footer button?",
  },
  {
    day: "Day 07",
    badge: "Launch Delayed",
    tone: "destructive",
    title: "The Missed Deadline",
    icon: AlertCircle,
    description:
      "A full week lost clarifying 15 minutes of straightforward CSS fixes.",
    artifact: { icon: Video, label: "Emergency Alignment Call", meta: "45 mins" },
    quote: "Let's hop on another Zoom to walk through it together.",
  },
]

export const IMPACT_STATS: ImpactStat[] = [
  { icon: Clock, label: "Time Lost", value: "4.2 hrs", caption: "Wasted per review round" },
  { icon: MessagesSquare, label: "Back-and-Forth", value: "6+ msgs", caption: "To clarify a single visual bug" },
  { icon: TrendingDown, label: "Timeline Drag", value: "38%", caption: "Longer client sign-off cycles" },
]

export const STEP_TONE_CLASSES: Record<
  StepTone,
  { badge: string; dot: string; artifact: string }
> = {
  success: {
    badge: "border-success/20 bg-success/10 text-success",
    dot: "bg-success",
    artifact: "text-success",
  },
  warning: {
    badge: "border-warning/20 bg-warning/10 text-warning",
    dot: "bg-warning",
    artifact: "text-warning",
  },
  destructive: {
    badge: "border-destructive/20 bg-destructive/10 text-destructive",
    dot: "bg-destructive",
    artifact: "text-destructive",
  },
}
