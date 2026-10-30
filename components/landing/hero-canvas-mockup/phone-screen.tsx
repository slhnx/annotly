import { ArrowRight, Globe, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DemoCursor } from "./demo-cursor"
import { FeedbackList } from "./feedback-list"
import { RESOLVED_STEP } from "./hero-canvas-mockup.data"
import { ReviewSummary } from "./review-summary"
import type { CursorPhase } from "./use-demo-playback"

interface PhoneScreenProps {
  currentStep: number
  cursorPhase: CursorPhase
  domain: string
}

/** The fake review app rendered inside the phone frame. */
export function PhoneScreen({ currentStep, cursorPhase, domain }: PhoneScreenProps) {
  const resolved = currentStep === RESOLVED_STEP

  return (
    <div className="relative flex flex-col justify-between space-y-3 overflow-hidden rounded-[38px] border border-border bg-card p-4 text-left select-none sm:rounded-[44px] sm:p-4.5">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-heading text-sm leading-tight font-bold tracking-tight text-foreground sm:text-base">
            Review live site
          </h4>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            3 pins • scanned just now
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="h-7 rounded-full border border-border px-3"
        >
          Select
        </Button>
      </div>

      <ReviewSummary allResolved={resolved} />

      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">
          <Search className="size-3.5 shrink-0" />
          <span className="truncate">Search feedback or tags...</span>
        </div>
        <div className="shrink-0 rounded-xl bg-muted px-3 py-2 text-xs font-semibold text-foreground">
          All mine
        </div>
      </div>

      <FeedbackList currentStep={currentStep} />

      <Button variant="ghost" size="sm" className="-ml-2 gap-1.5 font-semibold">
        <Plus className="size-3.5" />
        <span>Drop pin on live website</span>
      </Button>

      <div className="flex items-center gap-2 pt-1">
        <div className="flex-1 truncate rounded-xl bg-muted px-3 py-1.5 font-mono text-[11px] text-foreground/85">
          {domain}/projects
        </div>
        <Badge
          variant="outline"
          className="h-auto shrink-0 rounded-xl bg-background px-3 py-1.5 text-[11px]"
        >
          <Globe className="size-3 text-muted-foreground" />
          <span>Live Canvas</span>
        </Badge>
      </div>

      <Button
        size="lg"
        className={cn(
          "w-full rounded-full px-6 py-3.5 text-xs transition-all duration-300 sm:text-sm",
          resolved && "bg-success text-success-foreground hover:bg-success/90"
        )}
      >
        <span>
          {resolved ? "Push Fixes to GitHub PR #142" : "Review All Pins (3)"}
        </span>
        <ArrowRight className="size-4" />
      </Button>

      {currentStep === 0 && <DemoCursor phase={cursorPhase} />}
    </div>
  )
}
