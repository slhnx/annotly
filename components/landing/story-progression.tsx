import { Sparkles } from "lucide-react"
import { SectionEyebrow } from "./section-parts/section-eyebrow"
import { ImpactSummary } from "./story-progression/impact-summary"
import { STORY_STEPS } from "./story-progression/story-progression.data"
import { StoryStepCard } from "./story-progression/story-step-card"

export function StoryProgression() {
  return (
    <section
      id="how-it-works"
      className="relative mx-auto max-w-[1240px] border-t border-border px-6 py-24"
    >
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <SectionEyebrow icon={Sparkles} className="mb-4">
          The Pain of Modern Website Reviews
        </SectionEyebrow>
        <h2 className="mb-4 font-heading text-3xl leading-tight font-semibold tracking-[-1.2px] text-foreground sm:text-4xl md:text-5xl">
          Website feedback shouldn&apos;t feel like detective work.
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          When review cycles rely on scattered screenshots and long email threads, simple fixes turn into days of lost momentum.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2">
        {STORY_STEPS.map((step) => (
          <StoryStepCard key={step.day} step={step} />
        ))}
      </div>

      <ImpactSummary />
    </section>
  )
}
