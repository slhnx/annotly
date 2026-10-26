"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Plus, Sparkles, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function FeatureShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)
  }

  useEffect(() => {
    checkScroll()
    const handleResize = () => checkScroll()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const cardWidth = scrollContainerRef.current.clientWidth < 640 ? 320 : 420
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    })
  }

  const features = [
    {
      leadIn: "Anti-drift coordinate math.",
      description:
        "Pins anchor to DOM elements via relative percentages, not fragile raw pixels. Comments stay locked during text reflow, layout shifts, and responsive breakpoints.",
      badge: "Anti-Drift Math",
      highlight: "Guaranteed alignment across dynamic screens",
      image: "/landing/pin-coordinate-math.jpg",
      cardBg: "bg-[#ede7dc] dark:bg-[#201f1d]",
      textColor: "text-foreground",
      borderClass: "border-foreground/[0.06] dark:border-white/[0.06]",
      plusBtnClass: "bg-foreground/10 text-foreground hover:bg-foreground/15",
    },
    {
      leadIn: "Zero-install client guest mode.",
      description:
        "Deliver polished review canvases that work on any device. Anyone with your private link can click and comment immediately—no Chrome extensions, no client logins.",
      badge: "Frictionless Access",
      highlight: "Clients comment in seconds without accounts",
      image: "/landing/guest-access-mode.jpg",
      cardBg: "bg-[#e5ece5] dark:bg-[#1b261d]",
      textColor: "text-foreground",
      borderClass: "border-emerald-950/[0.06] dark:border-white/[0.06]",
      plusBtnClass: "bg-emerald-900/10 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-900/15",
    },
    {
      leadIn: "Sub-500ms in-browser snapshots.",
      description:
        "Every comment automatically captures a client-side HTML5 canvas snapshot of the exact screen state. Inspect live elements and visual snapshots side by side.",
      badge: "HTML5 Canvas",
      highlight: "Instant visual snapshot attached to each pin",
      image: "/landing/browser-snapshot-mode.jpg",
      cardBg: "bg-[#1c1c1c] text-[#fcfbf8] dark:bg-[#141312]",
      textColor: "text-white/90",
      borderClass: "border-white/10",
      plusBtnClass: "bg-white/15 text-white hover:bg-white/25",
    },
    {
      leadIn: "Unified multi-device viewports.",
      description:
        "Switch between desktop, tablet, and mobile breakpoints directly in the review canvas. Identify and resolve responsive styling bugs in one unified workspace.",
      badge: "1440px • 768px • 375px",
      highlight: "Inspect every responsive breakpoint in 1 click",
      image: "/landing/multi-device-viewports.jpg",
      cardBg: "bg-[#efe8dc] dark:bg-[#23201d]",
      textColor: "text-foreground",
      borderClass: "border-foreground/[0.06] dark:border-white/[0.06]",
      plusBtnClass: "bg-foreground/10 text-foreground hover:bg-foreground/15",
    },
  ]

  return (
    <section id="features" className="py-24 sm:py-32 px-6 max-w-[1360px] mx-auto border-t border-border overflow-hidden">
      {/* Top Social Proof / Studio Partners Bar (from Inspiration) */}
      <div className="mb-14 pb-8 border-b border-border/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wide text-muted-foreground uppercase">
              Trusted by 2,500+ design studios & frontend teams
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-7 sm:gap-11 text-foreground/80 tracking-tight">
            <span className="font-heading font-bold text-sm tracking-tight">Studio Nord</span>
            <span className="font-serif italic text-base tracking-wide">Monolith</span>
            <span className="tracking-widest uppercase text-xs font-mono font-bold">VEKTOR</span>
            <span className="font-heading font-semibold text-sm">Forma Lab</span>
            <span className="tracking-wider uppercase text-xs font-mono font-bold">Bureau 01</span>
            <span className="font-serif italic text-base tracking-wide">Kinfolk Dev</span>
          </div>
        </div>
      </div>

      {/* Section Header with Left Display Title & Right Navigation Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-foreground/80 shadow-xs">
            <Sparkles className="size-3.5 text-foreground" />
            <span>Engineered for Precision</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-[-1.5px] lg:tracking-[-2px] text-foreground leading-[1.06]">
            Built specifically for how modern websites are engineered.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-normal">
            Deep DOM intelligence that handles responsive layouts, client access, and real staging environments.
          </p>
        </div>

        {/* Slider Controls (Arrow Buttons from Screenshot) */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-end pt-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "size-11 sm:size-12 rounded-full border border-border flex items-center justify-center transition-all cursor-pointer",
              canScrollLeft
                ? "bg-card text-foreground hover:bg-muted hover:border-foreground/20 shadow-xs active:scale-95"
                : "bg-muted/40 text-muted-foreground/30 border-border/40 cursor-not-allowed"
            )}
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "size-11 sm:size-12 rounded-full border border-border flex items-center justify-center transition-all cursor-pointer",
              canScrollRight
                ? "bg-card text-foreground hover:bg-muted hover:border-foreground/20 shadow-xs active:scale-95"
                : "bg-muted/40 text-muted-foreground/30 border-border/40 cursor-not-allowed"
            )}
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Cards Carousel Container with Horizontal Scroll & Touch Swipe */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex items-stretch gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 -mx-6 px-6 sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {features.map((feat, idx) => {
          const isExpanded = expandedCard === idx

          return (
            <div
              key={feat.leadIn}
              style={{ scrollSnapAlign: "start" }}
              className={cn(
                "group relative shrink-0 w-[85vw] sm:w-[380px] md:w-[410px] rounded-[28px] sm:rounded-[34px] overflow-hidden pt-7 px-6 sm:pt-9 sm:px-8 pb-0 flex flex-col justify-between border shadow-none transition-all duration-300",
                feat.cardBg,
                feat.borderClass
              )}
            >
              {/* Subtle Tactile Grain Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Card Header & Text (Positioned Above Image) */}
              <div className="relative z-10 space-y-3">
                {/* Badge Pill */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] border border-foreground/[0.08] dark:border-white/10 text-[11px] font-mono font-medium tracking-wide">
                  <span>{feat.badge}</span>
                </div>

                {/* Lead-in bold phrase + description (from inspiration screenshot) */}
                <p className={cn("text-sm sm:text-base leading-relaxed font-normal pt-1", feat.textColor)}>
                  <strong className="font-semibold text-foreground dark:text-white">
                    {feat.leadIn}{" "}
                  </strong>
                  <span className="opacity-80">{feat.description}</span>
                </p>

                {/* Interactive Highlight Chip on expansion */}
                {isExpanded && (
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-400 pt-2 animate-in fade-in duration-200">
                    <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{feat.highlight}</span>
                  </div>
                )}
              </div>

              {/* Bottom Visual Area: Device Mockup Peeking from Bottom + Circular Action Plus Button */}
              <div className="relative z-10 w-full mt-7 pt-2">
                {/* Floating Plus Button at Bottom-Right (from inspiration) */}
                <div className="absolute right-0 bottom-4 z-20">
                  <button
                    type="button"
                    onClick={() => setExpandedCard(isExpanded ? null : idx)}
                    aria-label={`Toggle details for ${feat.badge}`}
                    className={cn(
                      "size-10 sm:size-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xs cursor-pointer",
                      feat.plusBtnClass,
                      isExpanded ? "rotate-45" : "hover:scale-110"
                    )}
                  >
                    <Plus className="size-4.5" />
                  </button>
                </div>

                {/* Mockup Frame Touching Bottom Boundary */}
                <div className="relative w-full aspect-[16/11] rounded-t-[22px] sm:rounded-t-[26px] overflow-hidden border-t-2 border-x-2 border-foreground/15 dark:border-white/15 bg-[#11100f] shadow-[rgba(0,0,0,0.12)_0px_12px_32px_0px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:-translate-y-1">
                  <Image
                    src={feat.image}
                    alt={feat.badge}
                    fill
                    sizes="(max-width: 768px) 85vw, 410px"
                    className="object-cover object-top select-none"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
