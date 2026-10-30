import { Fragment } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { DemoStep } from "./hero-canvas-mockup.data"

/** Floating card that explains the active demo step. */
export function ContextCard({ step }: { step: DemoStep }) {
  return (
    <Card className="gap-4 rounded-2xl bg-card/95 p-5 text-left shadow-focus backdrop-blur-md sm:p-6">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          <span className="size-1.5 rounded-full bg-foreground" />
          <span>Interactive Context</span>
        </div>
        <h3 className="font-heading text-xl leading-tight font-semibold tracking-[-0.8px] text-foreground sm:text-2xl">
          {step.title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
          {step.description}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {step.rows.map((row, idx) => (
          <Fragment key={row.label}>
            {idx > 0 && <Separator />}
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-foreground">
                  {row.label}
                </div>
                <div className="truncate text-[10px] text-muted-foreground sm:text-[11px]">
                  {row.sublabel}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-0.5">
                <div className="font-mono text-xs font-semibold text-foreground sm:text-[13px]">
                  {row.value}
                </div>
                {row.badge && (
                  <Badge
                    variant="secondary"
                    className="h-4 rounded px-1.5 text-[9px]"
                  >
                    {row.badge}
                  </Badge>
                )}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </Card>
  )
}
