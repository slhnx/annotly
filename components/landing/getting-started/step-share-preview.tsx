import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CONNECTION_ROWS } from "./getting-started.data"

export function StepSharePreview() {
  return (
    <>
      <ul className="space-y-2.5">
        {CONNECTION_ROWS.map((row) => (
          <li key={row.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 font-medium text-foreground">
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-5 items-center justify-center rounded text-[10px] font-bold",
                  row.glyphClass
                )}
              >
                {row.glyph}
              </span>
              <span>{row.label}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-success">
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              <span>{row.status}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <Separator />
        <div className="font-mono text-[11px] text-muted-foreground">
          + Unlimited reviewer seats available
        </div>
      </div>
    </>
  )
}
