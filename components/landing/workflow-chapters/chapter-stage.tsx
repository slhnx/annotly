import { PlayerFooter } from "../before-after/player-footer"
import { GrainOverlay } from "../before-after/grain-overlay"
import type { StepPlayer } from "../before-after/use-step-player"
import { chapters } from "./chapters.data"
import { ChapterVisual } from "./chapter-visual"
import { StageHeader } from "./stage-header"

interface ChapterStageProps {
  player: StepPlayer
}

/** Right column: live visual showcase for the active chapter. */
export function ChapterStage({ player }: ChapterStageProps) {
  const { activeStep, isCompleted, isHovered } = player

  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-[28px] border border-foreground/10 bg-secondary p-6 sm:rounded-[32px] sm:p-8">
      <GrainOverlay className="opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay" />

      <div className="relative z-10 flex h-full flex-col justify-between space-y-6">
        <StageHeader
          chapterTitle={chapters[activeStep].title}
          isCompleted={isCompleted}
          isHovered={isHovered}
          onReplay={player.replay}
        />
        <ChapterVisual activeChapter={activeStep} />
        <PlayerFooter
          player={player}
          stepCount={chapters.length}
          getDotLabel={(i) => `Go to chapter ${i + 1}`}
          className="border-t border-foreground/10 pt-4"
        />
      </div>
    </div>
  )
}
