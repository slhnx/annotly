import { ArrowRight, Pause, Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StepDots } from "./step-dots"
import type { StepPlayer } from "./use-step-player"

interface PlayerFooterProps {
  player: StepPlayer
  stepCount: number
  getDotLabel: (index: number) => string
  className?: string
}

/** Step dots + Play/Pause/Next (or Replay once finished) controls. */
export function PlayerFooter({ player, stepCount, getDotLabel, className }: PlayerFooterProps) {
  const { activeStep, progress, isPlaying, isCompleted } = player

  return (
    <div
      className={cn(
        "flex items-center justify-between text-xs text-muted-foreground",
        className
      )}
    >
      <StepDots
        count={stepCount}
        activeIndex={activeStep}
        progress={progress}
        isCompleted={isCompleted}
        getLabel={getDotLabel}
        onSelect={player.selectStep}
      />

      {isCompleted ? (
        <Button
          size="sm"
          onClick={player.replay}
          className="gap-1.5 rounded-full px-4 text-xs font-semibold"
        >
          <RotateCcw className="size-3.5" /> Replay Demo
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={player.togglePlaying}
            className="gap-1 px-2.5 text-xs text-muted-foreground hover:text-foreground"
            title={isPlaying ? "Pause Demo" : "Resume Demo"}
          >
            {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
            <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={player.nextStep}
            className="gap-1.5 text-xs font-semibold"
          >
            Next Step <ArrowRight className="size-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
