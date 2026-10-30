import { ArrowRight } from "lucide-react"

/** Floating "Without → With" label centered between the two panels (desktop only). */
export function ComparisonPill() {
  return (
    <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
      <div className="flex items-center gap-2 rounded-full border border-border-interactive bg-card px-4 py-2 font-mono text-xs font-semibold tracking-wide text-foreground shadow-focus">
        <span>Without Annotly</span>
        <ArrowRight className="size-3 opacity-60" />
        <span className="font-bold text-success">With Annotly</span>
      </div>
    </div>
  )
}
