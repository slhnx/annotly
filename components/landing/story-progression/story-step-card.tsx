import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { GrainOverlay } from "../section-parts/grain-overlay"
import { STEP_TONE_CLASSES, type StoryStep } from "./story-progression.data"

interface StoryStepCardProps {
  step: StoryStep
}

export function StoryStepCard({ step }: StoryStepCardProps) {
  const Icon = step.icon
  const ArtifactIcon = step.artifact.icon
  const tone = STEP_TONE_CLASSES[step.tone]

  return (
    <Card className="group relative justify-between gap-0 rounded-[28px] border-border bg-secondary p-7 text-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:rounded-[32px] sm:p-9">
      <GrainOverlay className="opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <Badge
              variant="outline"
              className="h-auto gap-2 border-foreground/10 bg-foreground/5 px-3 py-1.5 font-mono font-semibold tracking-wide"
            >
              <span className={cn("size-2 rounded-full", tone.dot)} />
              <span>{step.day}</span>
            </Badge>
            <Badge
              variant="outline"
              className={cn("h-auto px-3 py-1 font-mono", tone.badge)}
            >
              {step.badge}
            </Badge>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-[10px] border border-foreground/10 bg-foreground/5 shadow-xs transition-transform group-hover:scale-105">
                <Icon className="size-6 text-foreground" />
              </div>
              <h3 className="font-sans text-xl leading-tight font-semibold tracking-tight text-foreground sm:text-2xl">
                {step.title}
              </h3>
            </div>

            <p className="pt-1 text-sm leading-relaxed font-normal text-muted-foreground sm:text-base">
              {step.description}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Separator />
          <div className="flex items-center justify-between gap-3 rounded-xl border border-foreground/10 bg-foreground/5 px-3.5 py-2.5 font-mono text-xs text-foreground/85">
            <div className="flex min-w-0 items-center gap-2.5">
              <ArtifactIcon className={cn("size-4 shrink-0", tone.artifact)} />
              <span className="truncate font-medium">{step.artifact.label}</span>
            </div>
            <span className="shrink-0 font-sans text-[11px] text-muted-foreground">
              {step.artifact.meta}
            </span>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl border border-border bg-background/80 p-4 text-xs leading-relaxed font-medium text-foreground/90 shadow-xs backdrop-blur-xs sm:text-sm">
            <span
              aria-hidden="true"
              className="font-serif text-lg leading-none text-muted-foreground select-none"
            >
              “
            </span>
            <span className="flex-1 italic">{step.quote}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
