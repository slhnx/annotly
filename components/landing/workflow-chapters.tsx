"use client"

import { useStepPlayer } from "./before-after/use-step-player"
import { ChapterCard } from "./workflow-chapters/chapter-card"
import { ChapterStage } from "./workflow-chapters/chapter-stage"
import { chapters } from "./workflow-chapters/chapters.data"
import { SectionHeader } from "./workflow-chapters/section-header"

export function WorkflowChapters() {
  const player = useStepPlayer(chapters.length)

  return (
    <section id="workflow" className="mx-auto max-w-[1240px] border-t border-border px-6 py-24">
      <SectionHeader />

      <div
        className="grid grid-cols-1 items-stretch gap-7 lg:grid-cols-12"
        onMouseEnter={() => player.setIsHovered(true)}
        onMouseLeave={() => player.setIsHovered(false)}
      >
        <div className="flex flex-col justify-between space-y-3.5 lg:col-span-5">
          {chapters.map((chapter, idx) => (
            <ChapterCard
              key={chapter.step}
              chapter={chapter}
              isActive={player.activeStep === idx}
              isCompleted={player.isCompleted}
              isHovered={player.isHovered}
              progress={player.progress}
              onSelect={() => player.selectStep(idx)}
            />
          ))}
        </div>

        <div className="flex lg:col-span-7">
          <ChapterStage player={player} />
        </div>
      </div>
    </section>
  )
}
