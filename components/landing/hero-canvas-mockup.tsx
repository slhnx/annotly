"use client"

import { ContextCard } from "./hero-canvas-mockup/context-card"
import { DemoControls } from "./hero-canvas-mockup/demo-controls"
import { DEMO_STEPS } from "./hero-canvas-mockup/hero-canvas-mockup.data"
import { PhoneFrame } from "./hero-canvas-mockup/phone-frame"
import { PhoneScreen } from "./hero-canvas-mockup/phone-screen"
import { StageDoodles } from "./hero-canvas-mockup/stage-doodles"
import { useDemoPlayback } from "./hero-canvas-mockup/use-demo-playback"

const DEFAULT_PREVIEW_URL = "https://studionord.dk"

function extractDomain(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "studionord.dk"
}

export function HeroCanvasMockup({
  previewUrl = DEFAULT_PREVIEW_URL,
}: {
  previewUrl?: string
}) {
  const playback = useDemoPlayback()
  const { currentStep, isPlaying, setIsPlaying } = playback

  return (
    <div className="relative mx-auto w-full select-none">
      <div
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        className="relative w-full overflow-hidden rounded-[28px] border border-border bg-secondary p-5 transition-all sm:rounded-[36px] sm:p-8 md:rounded-[44px] md:p-12"
      >
        <StageDoodles />

        <div className="relative z-10 flex min-h-[540px] flex-col items-center justify-center gap-8 py-4 sm:min-h-[580px] md:min-h-[620px] md:flex-row lg:gap-14">
          <div className="order-2 w-full max-w-[340px] transition-all duration-300 md:order-1 lg:max-w-[360px]">
            <ContextCard step={DEMO_STEPS[currentStep]} />
          </div>

          <div className="relative order-1 shrink-0 transition-transform duration-500 hover:scale-[1.01] md:order-2">
            <PhoneFrame>
              <PhoneScreen
                currentStep={currentStep}
                cursorPhase={playback.cursorPhase}
                domain={extractDomain(previewUrl)}
              />
            </PhoneFrame>
          </div>
        </div>

        <DemoControls
          currentStep={currentStep}
          isPlaying={isPlaying}
          isReplaying={playback.isReplaying}
          progress={playback.progress}
          onSelectStep={playback.selectStep}
          onTogglePlaying={() => setIsPlaying(!isPlaying)}
          onReplay={playback.replay}
        />
      </div>
    </div>
  )
}
