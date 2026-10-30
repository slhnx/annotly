import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { GrainOverlay } from "./grain-overlay"
import type { PinPreview } from "./steps.data"

interface PinInspectorProps {
  preview: PinPreview
}

/** Nested live-staging card showing the anchored pin and its resolution state. */
export function PinInspector({ preview }: PinInspectorProps) {
  return (
    <div className="relative overflow-hidden rounded-[20px] border border-border bg-background p-5">
      <GrainOverlay className="opacity-[0.04] mix-blend-overlay" />

      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between border-b border-border pb-2.5 text-xs">
          <span className="font-mono text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Live Pin Inspector
          </span>
          <Badge variant="success" className="py-0 text-[10px]">
            {preview.statusBadge}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-muted p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-card">
              {preview.pin}
            </div>
            <div>
              <div className="text-xs font-semibold text-foreground">{preview.tag}</div>
              <div className="font-mono text-[11px] text-muted-foreground">{preview.detail}</div>
            </div>
          </div>
          <Badge variant="success" className="rounded font-mono text-[11px] font-semibold">
            Commit #9f2a
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="font-mono text-[11px] text-muted-foreground">{preview.actionText}</span>
          <Badge
            className={cn(
              "h-auto gap-1.5 rounded-[6px] px-3 py-1 font-semibold shadow-card",
              preview.isResolved && "bg-success text-success-foreground"
            )}
          >
            <CheckCircle2 className="size-3.5" />
            <span>{preview.isResolved ? "Resolved" : "In Review"}</span>
          </Badge>
        </div>
      </div>
    </div>
  )
}
