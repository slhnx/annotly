import { Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { FeedbackItem } from "./feedback-item"
import {
  RESOLVED_STEP,
  STATIC_FEEDBACK_ITEMS,
} from "./hero-canvas-mockup.data"

function DiagnosticsNote() {
  return (
    <div className="animate-in rounded-lg border border-border bg-muted p-2 text-[10px] leading-snug text-foreground shadow-xs duration-200 fade-in">
      <div className="mb-1 flex items-center gap-1.5">
        <Avatar className="size-4 border border-border">
          <AvatarFallback className="bg-muted text-[7px] font-bold text-foreground">
            ER
          </AvatarFallback>
        </Avatar>
        <span className="text-[9px] font-semibold text-foreground">
          Elena (Lead Architect)
        </span>
      </div>
      &ldquo;Increase button padding by 8px and adjust timber contrast.&rdquo;
    </div>
  )
}

function ResolvedBanner() {
  return (
    <div className="flex animate-in items-center gap-1.5 rounded-lg border border-success/20 bg-success/10 p-1.5 text-[10px] font-medium text-success duration-200 fade-in">
      <Check className="size-3" />
      <span>PR #142 Merged • linear.app/ANN-289</span>
    </div>
  )
}

/** Itemised feedback pins; the first item reacts to the active demo step. */
export function FeedbackList({ currentStep }: { currentStep: number }) {
  const resolved = currentStep === RESOLVED_STEP

  return (
    <div className="space-y-2.5">
      <div
        className={cn(
          "rounded-xl border p-2 transition-all duration-300",
          currentStep === 0
            ? "border-border-interactive bg-muted ring-2 ring-foreground/5"
            : "border-transparent"
        )}
      >
        <FeedbackItem
          title="Hero CTA Button Padding"
          reporter="Elena Rostova • Safari 17.4"
          value={resolved ? "Fixed" : "Open"}
          statusLabel={resolved ? "RESOLVED" : "YOURS"}
          resolved={resolved}
          pinLabel={resolved ? "✓" : "#1"}
          pinTone={resolved ? "success" : "primary"}
          selector="button.cta"
          tag="+8px"
          className="space-y-2"
        >
          {currentStep === 1 && <DiagnosticsNote />}
          {resolved && <ResolvedBanner />}
        </FeedbackItem>
      </div>

      {STATIC_FEEDBACK_ITEMS.map((item) => (
        <div key={item.pin} className="space-y-1 pt-1">
          <Separator />
          <FeedbackItem
            title={item.title}
            reporter={item.reporter}
            value={item.value}
            statusLabel="RESOLVED"
            resolved
            pinLabel={item.pin}
            pinTone="muted"
            selector={item.selector}
            tag={item.tag}
            className="pt-1.5"
          />
        </div>
      ))}
    </div>
  )
}
