import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StepDotsProps {
  count: number
  activeIndex: number
  progress: number
  isCompleted: boolean
  getLabel: (index: number) => string
  onSelect: (index: number) => void
}

/** Expanding story pills; the active pill fills with live progress. */
export function StepDots({
  count,
  activeIndex,
  progress,
  isCompleted,
  getLabel,
  onSelect,
}: StepDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }, (_, i) => {
        const isCurrent = activeIndex === i
        const isPast = i < activeIndex || isCompleted
        return (
          <Button
            key={i}
            variant="ghost"
            onClick={() => onSelect(i)}
            aria-label={getLabel(i)}
            className={cn(
              "relative h-2 overflow-hidden rounded-full bg-foreground/20 p-0 transition-all duration-300 hover:bg-foreground/30",
              isCurrent ? "w-11" : "w-3.5"
            )}
          >
            {isCurrent ? (
              <span
                className={cn(
                  "block h-full rounded-full transition-all duration-75 ease-linear",
                  isCompleted ? "bg-success" : "bg-primary"
                )}
                style={{ width: isCompleted ? "100%" : `${progress}%` }}
              />
            ) : isPast ? (
              <span className="block h-full w-full rounded-full bg-foreground/60" />
            ) : null}
          </Button>
        )
      })}
    </div>
  )
}
