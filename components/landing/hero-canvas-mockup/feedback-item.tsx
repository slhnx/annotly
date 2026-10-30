import type { ReactNode } from "react"
import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PinTone = "primary" | "muted" | "success"

const PIN_TONE_CLASSES: Record<PinTone, string> = {
  primary: "bg-primary text-primary-foreground shadow-xs",
  muted: "bg-muted text-foreground",
  success: "bg-success text-success-foreground",
}

interface FeedbackItemProps {
  title: string
  reporter: string
  value: string
  statusLabel: string
  resolved: boolean
  pinLabel: string
  pinTone: PinTone
  selector: string
  tag: string
  className?: string
  children?: ReactNode
}

const CHIP_CLASSES = "bg-background px-2 text-[10px]"

/** One row in the phone's feedback list: title, status and anchor chips. */
export function FeedbackItem({
  title,
  reporter,
  value,
  statusLabel,
  resolved,
  pinLabel,
  pinTone,
  selector,
  tag,
  className,
  children,
}: FeedbackItemProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold text-foreground">{title}</div>
          <div className="text-[11px] text-muted-foreground">{reporter}</div>
        </div>
        <div className="text-right">
          <div
            className={cn(
              "text-xs font-bold",
              resolved ? "text-success" : "text-foreground"
            )}
          >
            {value}
          </div>
          <div
            className={cn(
              "text-[9px] font-semibold tracking-wider uppercase",
              resolved ? "text-success" : "text-muted-foreground"
            )}
          >
            {statusLabel}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className={cn(CHIP_CLASSES, "font-medium")}>
            Mine
          </Badge>
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full text-[10px] font-bold transition-all",
              PIN_TONE_CLASSES[pinTone]
            )}
          >
            {pinLabel}
          </span>
          <Badge
            variant="outline"
            className={cn(CHIP_CLASSES, "font-mono text-muted-foreground")}
          >
            {selector}
          </Badge>
          <Badge
            variant="outline"
            className={cn(CHIP_CLASSES, "text-muted-foreground")}
          >
            {tag}
          </Badge>
        </div>
        <CheckCircle2
          className={cn(
            "size-3.5 shrink-0",
            resolved ? "text-success" : "text-muted-foreground"
          )}
        />
      </div>

      {children}
    </div>
  )
}
