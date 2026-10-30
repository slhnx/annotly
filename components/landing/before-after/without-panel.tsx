import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { WithoutContent } from "./steps.data"

interface WithoutPanelProps {
  step: string
  content: WithoutContent
  className?: string
}

/** Left side: the raw, chaotic feedback log without Annotly. */
export function WithoutPanel({ step, content, className }: WithoutPanelProps) {
  return (
    <div
      className={cn(
        "flex animate-in flex-col justify-between space-y-6 border-border bg-background p-6 duration-300 fade-in sm:border-r sm:p-9",
        className
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
          <div className="flex items-center gap-6">
            <span>Time</span>
            <span>Channel</span>
          </div>
          <span className="font-semibold text-destructive">{content.headline}</span>
        </div>

        <div className="space-y-3 font-mono text-xs text-foreground/80">
          {content.logs.map((log, index) => (
            <div
              key={index}
              className={cn(
                "flex items-baseline justify-between gap-3 rounded p-2 transition-colors",
                log.alert
                  ? "border border-destructive/25 bg-destructive/15 text-destructive"
                  : log.note
                    ? "border border-warning/20 bg-warning/10 text-warning"
                    : "text-foreground/80 hover:bg-accent"
              )}
            >
              <div className="flex shrink-0 items-baseline gap-4 text-[11px] text-muted-foreground">
                <span className="w-16">{log.time}</span>
                <span className="w-18 font-semibold text-foreground/70">{log.channel}</span>
              </div>
              <span className="flex items-center gap-1.5 truncate text-right text-[11px] sm:text-left">
                {log.alert && <AlertCircle className="inline size-3 shrink-0 text-destructive" />}
                {log.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4 font-mono text-xs">
        <div className="flex items-center gap-2 font-medium text-destructive">
          <span className="size-2 animate-pulse rounded-full bg-destructive" />
          <span>{content.metric}</span>
        </div>
        <span className="text-[11px] text-muted-foreground">Step {step} / 03</span>
      </div>
    </div>
  )
}
