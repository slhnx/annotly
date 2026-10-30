"use client"

import React, { useState } from "react"
import { Sparkles } from "lucide-react"
import { CarouselControls } from "./use-cases/carousel-controls"
import { RoleCard } from "./use-cases/role-card"
import { SLIDES } from "./use-cases/use-cases.data"
import { UseCasesStat } from "./use-cases/use-cases-stat"
import { SectionEyebrow } from "./section-parts/section-eyebrow"

const SWIPE_THRESHOLD_PX = 50

export function UseCases() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const diff = touchStartX - e.changedTouches[0].clientX
    if (diff > SWIPE_THRESHOLD_PX) handleNext()
    if (diff < -SWIPE_THRESHOLD_PX) handlePrev()
    setTouchStartX(null)
  }

  return (
    <section
      id="use-cases"
      className="mx-auto max-w-[1240px] overflow-hidden border-t border-border px-6 py-20 select-none sm:py-28"
    >
      <div className="mb-12 flex flex-col justify-between gap-8 sm:mb-16 lg:flex-row lg:items-end">
        <div className="max-w-xl space-y-3.5 text-left">
          <SectionEyebrow icon={Sparkles}>Who is Annotly built for?</SectionEyebrow>

          <h2 className="font-heading text-3xl leading-[1.08] font-semibold tracking-[-1.5px] text-foreground sm:text-4xl md:text-5xl">
            Built for web agencies, developers, and their clients.
          </h2>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Whether you manage client website sign-offs, QA staging deployments, or review live marketing pages—Annotly gives every stakeholder a shared, zero-install visual canvas.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6 text-left sm:flex-row sm:items-end sm:gap-10">
          <UseCasesStat group={SLIDES[currentSlide]} />
          <CarouselControls
            slideCount={SLIDES.length}
            currentSlide={currentSlide}
            onSelect={setCurrentSlide}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden"
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {SLIDES.map((slideGroup) => (
            <div
              key={slideGroup.id}
              className="grid w-full shrink-0 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {slideGroup.cards.map((card) => (
                <RoleCard key={card.id} card={card} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
