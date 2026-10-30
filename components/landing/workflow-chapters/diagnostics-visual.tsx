import { Camera } from "lucide-react"
import { Card } from "@/components/ui/card"
import { diagnosticItems } from "./chapters.data"

/** Chapter 2: automatic device context. */
export function DiagnosticsVisual() {
  return (
    <>
      <Card className="gap-3.5 rounded-[20px] border-foreground/10 bg-card/85 p-5 backdrop-blur-xs">
        <div className="flex items-center justify-between border-b border-border pb-2.5 text-xs font-semibold text-foreground">
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse rounded-full bg-success" />
            <span>Auto-Captured Environment Diagnostics</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">ID: #ANN-8492</span>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-xs sm:grid-cols-3">
          {diagnosticItems.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-muted p-2.5">
              <div className="text-[10px] text-muted-foreground">{item.label}</div>
              <div className="pt-0.5 font-semibold text-foreground">{item.value}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        size="sm"
        className="flex-row items-center gap-2.5 rounded-xl border-foreground/10 bg-card/60 p-3.5 text-xs text-foreground/75"
      >
        <Camera className="size-4 shrink-0 text-foreground" />
        <span>Lossless visual snapshot captured client-side at the millisecond of the click.</span>
      </Card>
    </>
  )
}
