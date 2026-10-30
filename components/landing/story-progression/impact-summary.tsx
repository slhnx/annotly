import { Card } from "@/components/ui/card"
import { GrainOverlay } from "../section-parts/grain-overlay"
import { IMPACT_STATS } from "./story-progression.data"

export function ImpactSummary() {
  return (
    <Card className="relative mx-auto mt-14 max-w-4xl gap-0 rounded-[24px] border-border bg-secondary p-7 sm:rounded-[28px] sm:p-9">
      <GrainOverlay className="opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay" />

      <div className="relative z-10 grid grid-cols-1 gap-6 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {IMPACT_STATS.map(({ icon: Icon, label, value, caption }, index) => (
          <div
            key={label}
            className={
              index === 0
                ? "flex flex-col items-center px-4 text-center"
                : "flex flex-col items-center px-4 pt-5 text-center sm:pt-0"
            }
          >
            <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
              <Icon className="size-4" />
              <span className="font-mono text-xs font-semibold tracking-wider uppercase">
                {label}
              </span>
            </div>
            <div className="mb-1 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {value}
            </div>
            <p className="text-xs text-muted-foreground sm:text-sm">{caption}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
