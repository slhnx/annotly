import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** Progress summary card at the top of the phone screen. */
export function ReviewSummary({ allResolved }: { allResolved: boolean }) {
  return (
    <Card size="sm" className="gap-1.5 rounded-2xl bg-background p-3.5 shadow-card">
      <div className="text-[9px] font-bold tracking-wider text-muted-foreground uppercase">
        YOUR REVIEW SHARE
      </div>
      <div className="flex items-baseline gap-1.5 font-heading text-3xl font-extrabold tracking-tight text-foreground">
        <span>{allResolved ? "100%" : "67%"}</span>
        <span className="font-sans text-xs font-normal text-muted-foreground">
          {allResolved ? "approved" : "in progress"}
        </span>
      </div>
      <div className="my-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            allResolved ? "w-full bg-success" : "w-2/3 bg-foreground"
          )}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
        <span>of 3 review pins</span>
        <span>{allResolved ? "All resolved ✓" : "1 pending fix"}</span>
      </div>
    </Card>
  )
}
