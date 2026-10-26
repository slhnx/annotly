"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RoleCard {
  id: string
  role: string
  targetFor: string
  headline: string
  description: string
  image: string
  perks: string[]
}

interface SlideGroup {
  id: number
  statNumber: string
  statSuperscript?: string
  statUnit?: string
  statLabel: string
  slideLabel: string
  cards: RoleCard[]
}

const SLIDES: SlideGroup[] = [
  {
    id: 1,
    statNumber: "50",
    statSuperscript: "%",
    statUnit: "+",
    statLabel: "Faster client sign-offs & approvals",
    slideLabel: "Agencies, Freelancers & Product",
    cards: [
      {
        id: "agencies",
        role: "Web Agencies & Studios",
        targetFor: "For Web Agencies",
        headline: "Cut client revision rounds in half",
        description:
          "Send one review link. Clients point, click, and comment directly on staging—no extensions, accounts, or Zoom calls needed.",
        image: "/landing/roles/agency-airplane.png",
        perks: ["Zero-install client links", "Faster milestone sign-off"],
      },
      {
        id: "freelancers",
        role: "Freelance Devs & Designers",
        targetFor: "For Freelancers & Devs",
        headline: "Fix bugs with exact DOM selectors",
        description:
          "Stop guessing what 'make it pop' means. Every pin captures computed CSS, screen size, and DOM path automatically.",
        image: "/landing/roles/developer-prism.png",
        perks: ["Exact DOM selector path", "Computed CSS specs"],
      },
      {
        id: "product",
        role: "Product & QA Teams",
        targetFor: "For Product & QA Teams",
        headline: "Catch visual bugs before code merges",
        description:
          "Annotate Vercel previews and staging builds together. Designers, PMs, and QA squash visual regressions before production.",
        image: "/landing/roles/product-cubes.png",
        perks: ["Vercel & Netlify preview URLs", "Linear & GitHub issue sync"],
      },
    ],
  },
  {
    id: 2,
    statNumber: "100",
    statSuperscript: "%",
    statLabel: "Contextual production sign-off",
    slideLabel: "Marketing, Clients & Engineering",
    cards: [
      {
        id: "marketing",
        role: "Marketing & Brand Leads",
        targetFor: "For Marketing & Content",
        headline: "Audit live copy and banners in place",
        description:
          "Review live Webflow, Shopify, or Next.js marketing pages before launch. Flag typos and approve layouts in true viewports.",
        image: "/landing/roles/marketing-lens.png",
        perks: ["Live in-place text review", "Webflow & Shopify ready"],
      },
      {
        id: "guests",
        role: "Clients & Stakeholders",
        targetFor: "For Non-Technical Clients",
        headline: "Give feedback in 10 seconds, zero installs",
        description:
          "No browser extensions, no passwords, no login required. Clients open a secure link on desktop or phone and leave comments.",
        image: "/landing/roles/guest-envelope.png",
        perks: ["Instant guest commenting", "Zero password friction"],
      },
      {
        id: "engineering",
        role: "Engineering Leads",
        targetFor: "For Engineering Teams",
        headline: "Sync visual threads directly into git",
        description:
          "Convert element comments into actionable GitHub PR commits and Linear tickets in one click with exact DOM selectors.",
        image: "/landing/roles/engineering-bracket.png",
        perks: ["1-click GitHub PR sync", "Linear ticket tracking"],
      },
    ],
  },
]

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
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (diff > 50) handleNext()
    if (diff < -50) handlePrev()
    setTouchStartX(null)
  }

  const activeGroup = SLIDES[currentSlide]

  return (
    <section
      id="use-cases"
      className="py-20 sm:py-28 px-6 max-w-[1240px] mx-auto border-t border-border overflow-hidden select-none"
    >
      {/* Top Header Row: Explains exactly who the platform is built for */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
        {/* Left Side: Eyebrow, Clear Audience Headline & Subtitle */}
        <div className="max-w-xl text-left space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground shadow-xs">
            <Sparkles className="size-3.5 text-foreground" />
            <span>Who is Annotly built for?</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.5px] leading-[1.08] text-foreground">
            Built for web agencies, developers, and their clients.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Whether you manage client website sign-offs, QA staging deployments, or review live marketing pages—Annotly gives every stakeholder a shared, zero-install visual canvas.
          </p>
        </div>

        {/* Right Side: High-Impact Editorial Metric & Carousel Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 sm:gap-10 text-left">
          {/* Dynamic Stat Display */}
          <div className="space-y-1">
            <div className="flex items-baseline font-heading text-5xl sm:text-6xl font-bold tracking-tight text-foreground transition-all duration-300">
              <span>{activeGroup.statNumber}</span>
              {activeGroup.statSuperscript && (
                <span className="text-3xl sm:text-4xl -translate-y-3 sm:-translate-y-4">
                  {activeGroup.statSuperscript}
                </span>
              )}
              {activeGroup.statUnit && (
                <span className="text-3xl sm:text-4xl -translate-y-3 sm:-translate-y-4 text-muted-foreground ml-0.5">
                  {activeGroup.statUnit}
                </span>
              )}
            </div>
            <div className="text-xs sm:text-sm font-medium text-muted-foreground transition-all duration-300">
              {activeGroup.statLabel}
            </div>
          </div>

          {/* Slide Indicator & Navigation Controls */}
          <div className="flex items-center gap-4 self-end sm:self-auto pb-1">
            {/* Slide Pagination Dots / Dashes */}
            <div className="flex items-center gap-2">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Jump to slide ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? "w-8 h-2.5 bg-foreground"
                      : "w-2.5 h-2.5 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                />
              ))}
            </div>

            {/* Previous / Next Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous 3 cards"
                className="size-9 rounded-full border border-border bg-card hover:bg-muted text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next 3 cards"
                className="size-9 rounded-full border border-border bg-card hover:bg-muted text-foreground flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Cards Per Slide Carousel with Seamless Transparent Merged Artworks */}
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
              className="w-full shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {slideGroup.cards.map((card) => (
                <div
                  key={card.id}
                  className="rounded-[28px] sm:rounded-[34px] bg-[#fcfbf8] dark:bg-[#1a1a19] border border-[#eceae4] dark:border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between text-left shadow-[rgba(0,0,0,0.02)_0px_8px_24px_0px] hover:shadow-[rgba(0,0,0,0.06)_0px_14px_32px_0px] transition-all group"
                >
                  {/* Upper Artwork Area: Transparent Image Merged Directly with Card Surface (No Box Borders) */}
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center my-1 select-none">
                    {/* Transparent Floating Origami Sculpture */}
                    <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                      <Image
                        src={card.image}
                        alt={`${card.targetFor} conceptual origami sculpture`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                        className="object-contain object-center select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)]"
                      />
                    </div>

                    {/* Top-Right Audience Badge */}
                    <div className="absolute top-1 right-1 z-10">
                      <Badge
                        variant="pill"
                        className="text-[10px] font-semibold bg-background/90 dark:bg-card/90 backdrop-blur-xs text-foreground border-border py-0.5 px-2.5 shadow-2xs"
                      >
                        {card.targetFor}
                      </Badge>
                    </div>
                  </div>

                  {/* Bottom Text Content Area: Clear, Concise, Persona-Oriented */}
                  <div className="space-y-3.5 pt-3">
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-semibold tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors">
                        {card.headline}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed mt-2">
                        {card.description}
                      </p>
                    </div>

                    {/* 2 Clean Persona-Specific Perks */}
                    <div className="pt-3 border-t border-border/80 flex flex-wrap gap-2">
                      {card.perks.map((perk, perkIdx) => (
                        <div
                          key={perkIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/[0.04] dark:bg-white/[0.06] text-[11px] font-medium text-foreground/80"
                        >
                          <Check className="size-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
