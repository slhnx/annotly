import Image from "next/image"
import { CheckCircle2, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { GrainOverlay } from "../section-parts/grain-overlay"
import type { FeatureItem } from "./feature-showcase.data"
import { TONE_CLASSES } from "./feature-tone"

interface FeatureCardProps {
  feature: FeatureItem
  isExpanded: boolean
  onToggle: () => void
}

export function FeatureCard({ feature, isExpanded, onToggle }: FeatureCardProps) {
  const tone = TONE_CLASSES[feature.tone]

  return (
    <div
      style={{ scrollSnapAlign: "start" }}
      className={cn(
        "group relative flex w-[85vw] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border px-6 pt-7 pb-0 transition-all duration-300 sm:w-[380px] sm:rounded-[34px] sm:px-8 sm:pt-9 md:w-[410px]",
        tone.card
      )}
    >
      <GrainOverlay className="opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay" />

      <div className="relative z-10 space-y-3">
        <Badge
          variant="outline"
          className={cn("h-auto px-3 py-1 font-mono text-[11px] tracking-wide", tone.badge)}
        >
          {feature.badge}
        </Badge>

        <p className="pt-1 text-sm leading-relaxed font-normal sm:text-base">
          <strong className={cn("font-semibold", tone.lead)}>
            {feature.leadIn}{" "}
          </strong>
          <span className="opacity-80">{feature.description}</span>
        </p>

        {isExpanded && (
          <div
            className={cn(
              "flex items-center gap-2 pt-2 text-xs font-medium animate-in fade-in duration-200",
              tone.highlight
            )}
          >
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{feature.highlight}</span>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-7 w-full pt-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-pill"
          onClick={onToggle}
          aria-label={`Toggle details for ${feature.badge}`}
          aria-expanded={isExpanded}
          className={cn(
            "absolute right-0 bottom-4 z-20 size-10 shadow-xs duration-300 sm:size-11",
            tone.toggle,
            isExpanded ? "rotate-45" : "hover:scale-110"
          )}
        >
          <Plus className="size-4.5" />
        </Button>

        <div
          className={cn(
            "relative aspect-[16/11] w-full overflow-hidden rounded-t-[22px] border-x-2 border-t-2 bg-inverse shadow-card transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-[1.03] sm:rounded-t-[26px]",
            tone.frame
          )}
        >
          <Image
            src={feature.image}
            alt={feature.badge}
            fill
            sizes="(max-width: 768px) 85vw, 410px"
            className="object-cover object-top select-none"
          />
        </div>
      </div>
    </div>
  )
}
