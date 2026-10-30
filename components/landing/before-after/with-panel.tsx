import type { ReactNode } from "react"
import { Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PinInspector } from "./pin-inspector"
import type { WithContent } from "./steps.data"

interface WithPanelProps {
  content: WithContent
  className?: string
  /** Bottom controls (step dots + playback buttons). */
  children: ReactNode
}

/** Right side: high-context, in-place resolution with Annotly. */
export function WithPanel({ content, className, children }: WithPanelProps) {
  return (
    <div
      className={cn(
        "flex animate-in flex-col justify-between space-y-7 bg-card p-6 duration-300 fade-in sm:p-9",
        className
      )}
    >
      <div className="space-y-4">
        <h3 className="font-heading text-xl leading-snug font-bold tracking-tight text-foreground sm:text-2xl">
          {content.quote}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-[8px] bg-primary font-bold text-primary-foreground shadow-card">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                {content.status}
                <span className="size-1.5 rounded-full bg-success" />
              </div>
              <div className="text-xs text-muted-foreground">{content.subtext}</div>
            </div>
          </div>
          <Badge variant="muted" className="py-0.5 font-mono text-[10px]">
            {content.badge}
          </Badge>
        </div>

        <div className="space-y-2.5 pt-1">
          {content.checklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90">
              <div className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full border border-success/20 bg-success/10 text-success">
                <Check className="size-3" />
              </div>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <PinInspector preview={content.preview} />

      <div className="border-t border-border pt-2">{children}</div>
    </div>
  )
}
