import { ArrowRight, Globe } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function StepUrlPreview() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar className="size-8 border border-border shadow-xs">
          <AvatarFallback className="bg-muted text-[11px] font-semibold text-foreground">
            AC
          </AvatarFallback>
        </Avatar>
        <div className="font-mono text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">alex</span> · agency lead
        </div>
      </div>

      <div className="space-y-1.5 py-2">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/60 p-2.5 font-mono text-xs font-medium text-foreground">
          <Globe className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">https://staging.nordicstudio.com</span>
        </div>
        <p className="pl-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
          Auto-generates proxy canvas for mobile, tablet, and desktop.
        </p>
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="font-mono text-[11px] text-muted-foreground">Ready in 5s</span>
        <span
          aria-hidden="true"
          className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-button-inset"
        >
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </>
  )
}
