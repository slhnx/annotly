"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ComparisonPill } from "./before-after/comparison-pill"
import { GrainOverlay } from "./before-after/grain-overlay"
import { PlayerFooter } from "./before-after/player-footer"
import { SectionHeader, type MobileTab } from "./before-after/section-header"
import { StageToolbar } from "./before-after/stage-toolbar"
import { comparisonSteps } from "./before-after/steps.data"
import { useStepPlayer } from "./before-after/use-step-player"
import { WithPanel } from "./before-after/with-panel"
import { WithoutPanel } from "./before-after/without-panel"

export function BeforeAfter() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("with")
  const player = useStepPlayer(comparisonSteps.length)
  const current = comparisonSteps[player.activeStep]

  return (
    // `dark` scopes the dark theme tokens so this always-dark band reads correctly in both themes.
    <section
      id="before-after"
      className="dark relative w-full overflow-hidden border-y border-border bg-inverse py-24 text-inverse-foreground"
    >
      <div className="relative z-10 mx-auto max-w-[1240px] px-6">
        <SectionHeader mobileTab={mobileTab} onMobileTabChange={setMobileTab} />

        <div
          className="relative overflow-hidden rounded-[28px] border border-border bg-card shadow-focus sm:rounded-[36px]"
          onMouseEnter={() => player.setIsHovered(true)}
          onMouseLeave={() => player.setIsHovered(false)}
        >
          <GrainOverlay className="opacity-[0.035] mix-blend-overlay" />
          <StageToolbar steps={comparisonSteps} player={player} />
          <ComparisonPill />

          <div className="relative z-10 grid grid-cols-1 items-stretch md:grid-cols-2">
            <WithoutPanel
              step={current.step}
              content={current.without}
              className={cn(mobileTab === "without" ? "block" : "hidden md:flex")}
            />
            <WithPanel
              content={current.with}
              className={cn(mobileTab === "with" ? "block" : "hidden md:flex")}
            >
              <PlayerFooter
                player={player}
                stepCount={comparisonSteps.length}
                getDotLabel={(i) => `Go to comparison point ${i + 1}`}
              />
            </WithPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
