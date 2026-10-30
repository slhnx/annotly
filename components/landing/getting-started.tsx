import { Sparkles } from "lucide-react"
import { STEP_COPY } from "./getting-started/getting-started.data"
import { StepColumn } from "./getting-started/step-column"
import { StepRolesPreview } from "./getting-started/step-roles-preview"
import { StepSharePreview } from "./getting-started/step-share-preview"
import { StepUrlPreview } from "./getting-started/step-url-preview"
import { SectionEyebrow } from "./section-parts/section-eyebrow"

export function GettingStarted() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-[1280px] border-t border-border px-6 py-24 sm:py-32"
    >
      <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20">
        <SectionEyebrow icon={Sparkles} className="mb-4">
          Frictionless Setup
        </SectionEyebrow>
        <h2 className="mb-4 font-heading text-3xl leading-tight font-semibold tracking-[-1.5px] text-foreground sm:text-4xl md:text-5xl lg:tracking-[-2px]">
          Start reviewing in three simple steps.
        </h2>
        <p className="text-base leading-relaxed font-normal text-muted-foreground sm:text-lg">
          No complex software to configure. No client training manuals. Up and running in under a minute.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
        <StepColumn copy={STEP_COPY[0]}>
          <StepUrlPreview />
        </StepColumn>
        <StepColumn copy={STEP_COPY[1]}>
          <StepSharePreview />
        </StepColumn>
        <StepColumn copy={STEP_COPY[2]}>
          <StepRolesPreview />
        </StepColumn>
      </div>
    </section>
  )
}
