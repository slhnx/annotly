"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { FeatureCard } from "./feature-showcase/feature-card"
import { FEATURES } from "./feature-showcase/feature-showcase.data"
import { ScrollArrows } from "./feature-showcase/scroll-arrows"
import { StudioPartnersBar } from "./feature-showcase/studio-partners-bar"
import { useCarouselScroll } from "./feature-showcase/use-carousel-scroll"
import { SectionEyebrow } from "./section-parts/section-eyebrow"

export function FeatureShowcase() {
  const { containerRef, canScrollLeft, canScrollRight, checkScroll, scroll } =
    useCarouselScroll()
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section
      id="features"
      className="mx-auto max-w-[1360px] overflow-hidden border-t border-border px-6 py-24 sm:py-32"
    >
      <StudioPartnersBar />

      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-3xl space-y-3">
          <SectionEyebrow icon={Sparkles}>Engineered for Precision</SectionEyebrow>
          <h2 className="font-heading text-3xl leading-[1.06] font-semibold tracking-[-1.5px] text-foreground sm:text-4xl md:text-5xl lg:text-[54px] lg:tracking-[-2px]">
            Built specifically for how modern websites are engineered.
          </h2>
          <p className="max-w-xl text-base leading-relaxed font-normal text-muted-foreground sm:text-lg">
            Deep DOM intelligence that handles responsive layouts, client access, and real staging environments.
          </p>
        </div>

        <ScrollArrows
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScroll={scroll}
        />
      </div>

      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="-mx-6 flex items-stretch gap-6 overflow-x-auto scroll-smooth px-6 pt-2 pb-6 sm:-mx-8 sm:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {FEATURES.map((feature, idx) => (
          <FeatureCard
            key={feature.leadIn}
            feature={feature}
            isExpanded={expandedCard === idx}
            onToggle={() => setExpandedCard(expandedCard === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  )
}
