import { MousePointerClick, Share2, Sparkles, type LucideIcon } from "lucide-react"

export interface OnboardingStep {
  icon: LucideIcon
  title: string
  description: string
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    icon: MousePointerClick,
    title: "1. Input Website URL",
    description: "Generate a live interactive review canvas for any web app or staging page.",
  },
  {
    icon: Sparkles,
    title: "2. Point & Click Annotate",
    description: "Drop element-anchored pins with feedback that stays aligned across viewports.",
  },
  {
    icon: Share2,
    title: "3. Share Review Link",
    description: "Clients and stakeholders review instantly without browser extensions or accounts.",
  },
]
