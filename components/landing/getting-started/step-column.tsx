import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import type { StepCopy } from "./getting-started.data"

interface StepColumnProps {
  copy: StepCopy
  children: ReactNode
}

export function StepColumn({ copy, children }: StepColumnProps) {
  return (
    <div className="space-y-4">
      <div className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {copy.label}
      </div>

      <Card className="min-h-[195px] justify-between gap-4 rounded-[22px] p-5 shadow-xs transition-all hover:border-border-interactive sm:rounded-[26px] sm:p-6">
        {children}
      </Card>

      <div className="space-y-1 pt-1">
        <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground">
          {copy.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
      </div>
    </div>
  )
}
