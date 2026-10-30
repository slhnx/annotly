import { MousePointer } from "lucide-react"
import { cn } from "@/lib/utils"
import type { CursorPhase } from "./use-demo-playback"

/** Animated reviewer cursor that "clicks" the first feedback item in step 0. */
export function DemoCursor({ phase }: { phase: CursorPhase }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-30 flex items-center gap-1 transition-all duration-700 ease-out",
        phase === "moving"
          ? "top-36 right-8 -rotate-6 opacity-90"
          : "top-[235px] left-36 scale-95 rotate-0 opacity-100"
      )}
    >
      <MousePointer className="size-4 fill-foreground text-foreground drop-shadow-md" />
      <span className="rounded-full bg-foreground px-1.5 py-0.5 text-[8px] font-semibold whitespace-nowrap text-background shadow-xs">
        Elena (Client)
      </span>
      {phase === "clicking" && (
        <span className="pointer-events-none absolute -top-1 -left-1 size-6 animate-ping rounded-full bg-foreground/30" />
      )}
    </div>
  )
}
