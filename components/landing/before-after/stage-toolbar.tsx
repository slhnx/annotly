import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ReplayButton } from "./replay-button"
import { StatusDot } from "./status-dot"
import type { ComparisonStep } from "./steps.data"
import type { StepPlayer } from "./use-step-player"

interface StageToolbarProps {
  steps: ComparisonStep[]
  player: StepPlayer
}

function getStatusLabel({ isCompleted, isHovered, activeStep, progress }: StepPlayer) {
  if (isCompleted) return "Comparison Complete"
  if (isHovered) return "Paused (Hovered)"
  return `Point 0${activeStep + 1} of 03 (${Math.round(progress)}%)`
}

export function StageToolbar({ steps, player }: StageToolbarProps) {
  const { activeStep, progress, isCompleted, isHovered } = player

  return (
    <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted/50 px-6 py-4 backdrop-blur-xs sm:px-8">
      <div className="flex items-center gap-2">
        {steps.map((s, idx) => {
          const isCurrent = activeStep === idx
          const isPast = idx < activeStep || isCompleted
          return (
            <Button
              key={s.step}
              variant="outline"
              size="sm"
              onClick={() => player.selectStep(idx)}
              className={cn(
                "relative h-auto gap-2 overflow-hidden rounded-full px-3 py-1.5 text-xs transition-all duration-300 sm:px-3.5",
                isCurrent
                  ? "border-border-interactive bg-accent font-semibold"
                  : isPast
                    ? "border-border bg-muted text-foreground/80"
                    : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {isCurrent && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 bg-foreground/10 transition-all duration-75 ease-linear"
                  style={{ width: isCompleted ? "100%" : `${progress}%` }}
                />
              )}
              <span className="relative font-mono text-[10px] opacity-70">0{idx + 1}</span>
              <span className="relative truncate">{s.title}</span>
            </Button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 font-mono text-xs text-muted-foreground sm:flex">
          <StatusDot isCompleted={isCompleted} isHovered={isHovered} className="size-2" />
          <span className="text-[11px]">{getStatusLabel(player)}</span>
        </div>
        <ReplayButton onClick={player.replay} title="Replay comparison demo" />
      </div>
    </div>
  )
}
