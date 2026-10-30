import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

/** Chapter 3: resolution and sprint progress. */
export function ResolutionVisual() {
  return (
    <>
      <Card className="gap-3 rounded-[20px] border-foreground/10 bg-card/85 p-5 backdrop-blur-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-success/20 bg-success/10 text-xs font-bold text-success">
              ✓
            </div>
            <span className="font-heading text-base font-semibold text-foreground">
              Heading Contrast Fixed
            </span>
          </div>
          <Badge variant="success" className="text-[10px]">
            Commit #9f2a
          </Badge>
        </div>
        <p className="pl-9 text-xs leading-relaxed text-muted-foreground">
          &quot;Adjusted contrast ratio to 7.2:1 with semibold display headings across breakpoints.&quot;
        </p>
      </Card>

      <Card className="gap-2.5 rounded-[20px] border-foreground/10 bg-card/60 p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">Sprint 1 Review Progress</span>
          <span className="font-mono font-semibold text-foreground">12 / 12 (100% Resolved)</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full w-full rounded-full bg-primary transition-all duration-500" />
        </div>
        <div className="flex items-center gap-1.5 pt-1 text-[11px] text-muted-foreground">
          <CheckCircle2 className="size-3.5 shrink-0 text-success" />
          <span>All client feedback resolved. Ready for production sign-off.</span>
        </div>
      </Card>
    </>
  )
}
