import { CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"

/** Chapter 1: element selector precision. */
export function SelectorVisual() {
  return (
    <>
      <Card className="relative gap-3 overflow-visible rounded-[20px] border-2 border-dashed border-foreground/25 bg-card/85 p-5 backdrop-blur-xs">
        <div className="absolute -top-3 left-4 flex items-center gap-1.5 rounded-[5px] bg-primary px-2.5 py-0.5 font-mono text-[10px] text-primary-foreground shadow-card">
          <span className="font-semibold">button.btn-primary#hero-cta</span>
          <span className="opacity-70">(X: 42.4%, Y: 68.1%)</span>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="font-heading text-base font-semibold text-foreground">
              Explore Our Architectural Portfolio
            </div>
            <div className="text-xs text-muted-foreground">
              Element coordinates locked to bounding client rect
            </div>
          </div>
          <div className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-card">
            <span className="absolute -inset-1 animate-ping rounded-full bg-foreground/20 opacity-75" />
            <span className="relative">1</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <Card size="sm" className="gap-0 rounded-xl border-foreground/10 bg-card/80 p-3.5">
          <div className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            Selector Hierarchy
          </div>
          <div className="truncate font-mono text-[11px] font-medium text-foreground">
            section.hero &gt; div &gt; button.cta
          </div>
        </Card>
        <Card size="sm" className="gap-0 rounded-xl border-foreground/10 bg-card/80 p-3.5">
          <div className="mb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            Drift Resilience
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-success">
            <CheckCircle2 className="size-3.5 shrink-0" /> Resize &amp; Reflow Safe
          </div>
        </Card>
      </div>
    </>
  )
}
