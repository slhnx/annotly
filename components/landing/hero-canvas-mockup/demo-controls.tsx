import { Pause, Play, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DEMO_STEPS } from "./hero-canvas-mockup.data"

interface DemoControlsProps {
  currentStep: number
  isPlaying: boolean
  isReplaying: boolean
  progress: number
  onSelectStep: (index: number) => void
  onTogglePlaying: () => void
  onReplay: () => void
}

/** Bottom bar: live indicator, step switcher with progress, play/replay. */
export function DemoControls({
  currentStep,
  isPlaying,
  isReplaying,
  progress,
  onSelectStep,
  onTogglePlaying,
  onReplay,
}: DemoControlsProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-4 sm:flex-row">
      <div className="order-2 flex items-center gap-2 text-xs text-muted-foreground sm:order-1">
        <span className="size-2 animate-pulse rounded-full bg-success" />
        <span className="font-medium text-foreground/80">
          Interactive review canvas
        </span>
        <span className="hidden text-foreground/30 md:inline">•</span>
        <span className="hidden md:inline">Zero extensions required</span>
      </div>

      <div
        role="group"
        aria-label="Demo steps"
        className="order-1 inline-flex items-center rounded-full border border-border bg-muted p-1 backdrop-blur-xs sm:order-2"
      >
        {DEMO_STEPS.map((step, idx) => {
          const isActive = currentStep === idx
          return (
            <Button
              key={step.id}
              variant="ghost"
              size="sm"
              aria-pressed={isActive}
              onClick={() => onSelectStep(idx)}
              className={cn(
                "relative overflow-hidden rounded-full px-3 sm:px-4",
                isActive
                  ? "bg-card font-semibold shadow-card hover:bg-card"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="relative z-10">{step.pillLabel}</span>
              {isActive && isPlaying && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-foreground/60 transition-all"
                  style={{ width: `${progress}%` }}
                />
              )}
            </Button>
          )
        })}
      </div>

      <div className="order-3 flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon-pill"
          onClick={onTogglePlaying}
          aria-label={isPlaying ? "Pause animated demo" : "Resume animated demo"}
          title={isPlaying ? "Pause demo" : "Resume demo"}
          className="size-8 border-border bg-card shadow-card hover:bg-card/90"
        >
          {isPlaying ? (
            <Pause className="size-3.5" />
          ) : (
            <Play className="ml-0.5 size-3.5" />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onReplay}
          aria-label="Replay animated demo"
          title="Replay from beginning"
          className="gap-1.5 rounded-full border-border bg-card font-semibold shadow-card hover:bg-card/90"
        >
          <RotateCcw className={cn("size-3.5", isReplaying && "animate-spin")} />
          <span>Replay</span>
        </Button>
      </div>
    </div>
  )
}
