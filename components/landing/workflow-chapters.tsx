"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  MousePointerClick,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Camera,
  Sparkles,
  RotateCcw,
  Play,
  Pause,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STEP_DURATION = 4000 // 4 seconds per step
const TICK_INTERVAL = 40 // update every 40ms for smooth 60fps-like progress

export function WorkflowChapters() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const progressRef = useRef(0)

  const chapters = [
    {
      step: "01",
      title: "Point & Click Anchoring",
      description:
        "Click any element to drop a pin. Coordinates stay locked across resizes and layout reflows using element-relative math.",
      badge: "5-Tier CSS Anchor",
      icon: MousePointerClick,
    },
    {
      step: "02",
      title: "Automatic Diagnostics",
      description:
        "Every comment captures viewport size, browser engine, OS, and an instant screen snapshot. No back-and-forth guessing.",
      badge: "Auto Diagnostics",
      icon: Cpu,
    },
    {
      step: "03",
      title: "One-Click Resolution",
      description:
        "Discuss feedback in technical context, push staging fixes, and resolve pins with one click.",
      badge: "Instant Sign-off",
      icon: CheckCircle2,
    },
  ]

  // Automated progression timer loop
  useEffect(() => {
    if (!isPlaying || isHovered || isCompleted) return

    // Anchor start time based on accumulated progress (e.g. after resuming from hover)
    const startTime = Date.now() - (progressRef.current / 100) * STEP_DURATION

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((elapsed / STEP_DURATION) * 100, 100)

      if (currentProgress >= 100) {
        clearInterval(timer)
        progressRef.current = 0
        if (activeChapter < chapters.length - 1) {
          setActiveChapter((prev) => prev + 1)
          setProgress(0)
        } else {
          progressRef.current = 100
          setProgress(100)
          setIsCompleted(true)
          setIsPlaying(false)
        }
      } else {
        progressRef.current = currentProgress
        setProgress(currentProgress)
      }
    }, TICK_INTERVAL)

    return () => clearInterval(timer)
  }, [isPlaying, isHovered, isCompleted, activeChapter, chapters.length])

  const handleSelectChapter = (idx: number) => {
    progressRef.current = 0
    setActiveChapter(idx)
    setProgress(0)
    setIsCompleted(false)
    setIsPlaying(true)
  }

  const handleReplay = () => {
    progressRef.current = 0
    setActiveChapter(0)
    setProgress(0)
    setIsCompleted(false)
    setIsPlaying(true)
  }

  const handleNextStep = () => {
    if (activeChapter < chapters.length - 1) {
      progressRef.current = 0
      setActiveChapter((curr) => curr + 1)
      setProgress(0)
      setIsCompleted(false)
      setIsPlaying(true)
    } else {
      handleReplay()
    }
  }

  return (
    <section id="workflow" className="py-24 px-6 max-w-[1240px] mx-auto border-t border-border">
      {/* Eyebrow and Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 shadow-[rgba(0,0,0,0.02)_0px_1px_2px_0px]">
          <Sparkles className="size-3.5 text-foreground" />
          <span>The Annotly Workflow</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          From vague comments to crystal-clear feedback.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          A frictionless 3-step loop turning scattered comments into precise, element-anchored tasks.
        </p>
      </div>

      {/* Interactive Chaptered Stage with Accent Color Background */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Column: Interactive Chapter Selector Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
          {chapters.map((ch, idx) => {
            const isActive = activeChapter === idx
            const Icon = ch.icon
            return (
              <div
                key={ch.step}
                onClick={() => handleSelectChapter(idx)}
                className={cn(
                  "group relative rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 cursor-pointer transition-all duration-300 border overflow-hidden bg-[#ede7dc] dark:bg-[#201f1d]",
                  isActive
                    ? "border-foreground/25 dark:border-white/25 shadow-[0_8px_24px_rgba(28,28,28,0.06)] opacity-100 -translate-y-0.5"
                    : "border-foreground/[0.08] dark:border-white/10 opacity-70 hover:opacity-95 hover:border-foreground/20 hover:-translate-y-0.5"
                )}
              >
                {/* Tactile Noisy Grain Texture Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] text-foreground border border-foreground/[0.06]">
                        {ch.step}
                      </span>
                      <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl tracking-tight">
                        {ch.title}
                      </h3>
                    </div>
                    {isActive ? (
                      <Badge variant="pill" className="text-[10px] py-0 font-medium bg-foreground text-background">
                        {isCompleted ? "Completed" : "Active Demo"}
                      </Badge>
                    ) : (
                      <span className="text-[11px] font-mono text-foreground/50 group-hover:text-foreground/80 transition-colors">
                        Step {ch.step}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/80 dark:text-[#eceae4]/80 leading-relaxed font-normal">
                    {ch.description}
                  </p>

                  {/* Real-time State Loading Bar for Active Step */}
                  {isActive && (
                    <div className="pt-2 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono text-foreground/60">
                        <span className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              isCompleted
                                ? "bg-emerald-500"
                                : isHovered
                                ? "bg-amber-500"
                                : "bg-emerald-500 animate-pulse"
                            )}
                          />
                          {isCompleted
                            ? "Demo Completed"
                            : isHovered
                            ? "Paused (Hovered)"
                            : `Point ${ch.step} of 03`}
                        </span>
                        <span>{isCompleted ? "100%" : `${Math.round(progress)}%`}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-foreground/10 dark:bg-white/10 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-75 ease-linear",
                            isCompleted ? "bg-emerald-500 w-full" : "bg-foreground dark:bg-white"
                          )}
                          style={{ width: isCompleted ? "100%" : `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {isActive && (
                    <div className="pt-2 border-t border-foreground/10 dark:border-white/10 flex items-center justify-between text-xs font-medium text-foreground">
                      <span className="flex items-center gap-1.5 text-foreground/70 font-mono text-[11px]">
                        <Icon className="size-3.5 text-foreground shrink-0" />
                        {ch.badge}
                      </span>
                      <span className="inline-flex items-center text-foreground font-semibold text-xs gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore details <ArrowRight className="size-3" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column: Dynamic Chapter Visual Showcase with Accent Background */}
        <div className="lg:col-span-7 flex">
          <div className="w-full rounded-[28px] sm:rounded-[32px] bg-[#ede7dc] dark:bg-[#201f1d] border border-foreground/[0.08] dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-none">
            {/* Tactile Noisy Grain Texture Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
              {/* Visual Header */}
              <div className="flex items-center justify-between pb-4 border-b border-foreground/10 dark:border-white/10 text-xs text-foreground/70">
                <div className="flex items-center gap-2 font-mono text-[11px] truncate">
                  <span
                    className={cn(
                      "size-2 rounded-full shrink-0",
                      isCompleted ? "bg-emerald-500" : isHovered ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
                    )}
                  />
                  <span className="truncate">
                    annotly_bridge://interactive_demo/{chapters[activeChapter].title.toLowerCase().replace(/\s+/g, "_")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReplay}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] hover:bg-foreground/10 text-[10px] font-mono text-foreground/70 hover:text-foreground transition-colors cursor-pointer border border-foreground/[0.06]"
                    title="Replay interactive demo from beginning"
                  >
                    <RotateCcw className="size-2.5" /> Replay
                  </button>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] border border-foreground/[0.08] dark:border-white/10 text-[10px] font-mono font-medium text-foreground shrink-0">
                    Live Inspector
                  </div>
                </div>
              </div>

              {/* Chapter 0 Visual: Element Selector Precision */}
              {activeChapter === 0 && (
                <div className="py-2 space-y-4 animate-in fade-in duration-300">
                  <div className="p-5 rounded-[20px] border-2 border-dashed border-foreground/25 dark:border-white/25 bg-background/85 dark:bg-black/30 backdrop-blur-xs space-y-3 relative">
                    <div className="absolute -top-3 left-4 bg-foreground text-background text-[10px] font-mono px-2.5 py-0.5 rounded-[5px] shadow-sm flex items-center gap-1.5">
                      <span className="font-semibold">button.btn-primary#hero-cta</span>
                      <span className="opacity-70">(X: 42.4%, Y: 68.1%)</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="space-y-1">
                        <div className="font-heading font-semibold text-foreground text-base">
                          Explore Our Architectural Portfolio
                        </div>
                        <div className="text-xs text-foreground/60">
                          Element coordinates locked to bounding client rect
                        </div>
                      </div>
                      <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs shadow-md shrink-0 relative">
                        <span className="absolute -inset-1 rounded-full bg-foreground/20 animate-ping opacity-75" />
                        <span className="relative">1</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl border border-foreground/[0.08] dark:border-white/10 bg-background/80 dark:bg-black/25">
                      <div className="font-mono text-[10px] text-foreground/60 mb-1 uppercase tracking-wider">
                        Selector Hierarchy
                      </div>
                      <div className="font-mono text-[11px] text-foreground font-medium truncate">
                        section.hero &gt; div &gt; button.cta
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-foreground/[0.08] dark:border-white/10 bg-background/80 dark:bg-black/25">
                      <div className="font-mono text-[10px] text-foreground/60 mb-1 uppercase tracking-wider">
                        Drift Resilience
                      </div>
                      <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5 shrink-0" /> Resize &amp; Reflow Safe
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chapter 1 Visual: Automatic Device Context */}
              {activeChapter === 1 && (
                <div className="py-2 space-y-4 animate-in fade-in duration-300">
                  <div className="p-5 rounded-[20px] border border-foreground/[0.08] dark:border-white/10 bg-background/85 dark:bg-black/30 backdrop-blur-xs space-y-3.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-foreground border-b border-foreground/10 dark:border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Auto-Captured Environment Diagnostics</span>
                      </div>
                      <span className="text-[10px] font-mono text-foreground/60">ID: #ANN-8492</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                      <div className="p-2.5 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08]">
                        <div className="text-[10px] text-foreground/50">Viewport</div>
                        <div className="font-semibold text-foreground pt-0.5">1440 × 900 px</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08]">
                        <div className="text-[10px] text-foreground/50">Engine</div>
                        <div className="font-semibold text-foreground pt-0.5">Chrome 122.0</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08]">
                        <div className="text-[10px] text-foreground/50">OS</div>
                        <div className="font-semibold text-foreground pt-0.5">macOS Sonoma</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08]">
                        <div className="text-[10px] text-foreground/50">Pixel Ratio</div>
                        <div className="font-semibold text-foreground pt-0.5">2.0 (Retina)</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08]">
                        <div className="text-[10px] text-foreground/50">Snapshot</div>
                        <div className="font-semibold text-foreground pt-0.5">&lt; 380ms (Canvas)</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.05] border border-foreground/[0.06] dark:border-white/[0.08]">
                        <div className="text-[10px] text-foreground/50">Color Scheme</div>
                        <div className="font-semibold text-foreground pt-0.5">Light (Parchment)</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-foreground/[0.08] dark:border-white/10 bg-background/60 dark:bg-black/20 text-xs text-foreground/75 flex items-center gap-2.5">
                    <Camera className="size-4 text-foreground shrink-0" />
                    <span>
                      Lossless visual snapshot captured client-side at the millisecond of the click.
                    </span>
                  </div>
                </div>
              )}

              {/* Chapter 2 Visual: Resolution & Progress */}
              {activeChapter === 2 && (
                <div className="py-2 space-y-4 animate-in fade-in duration-300">
                  <div className="p-5 rounded-[20px] border border-foreground/[0.08] dark:border-white/10 bg-background/85 dark:bg-black/30 backdrop-blur-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/25 shrink-0">
                          ✓
                        </div>
                        <span className="font-heading font-semibold text-base text-foreground">
                          Heading Contrast Fixed
                        </span>
                      </div>
                      <Badge variant="pill" className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/25 text-[10px]">
                        Commit #9f2a
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed pl-9">
                      &quot;Adjusted contrast ratio to 7.2:1 with semibold display headings across breakpoints.&quot;
                    </p>
                  </div>

                  <div className="p-5 rounded-[20px] border border-foreground/[0.08] dark:border-white/10 bg-background/60 dark:bg-black/20 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">Sprint 1 Review Progress</span>
                      <span className="font-mono text-foreground font-semibold">12 / 12 (100% Resolved)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-foreground/10 dark:bg-white/10 overflow-hidden">
                      <div className="h-full bg-foreground dark:bg-white rounded-full w-full transition-all duration-500" />
                    </div>
                    <div className="text-[11px] text-foreground/70 pt-1 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>All client feedback resolved. Ready for production sign-off.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Footer Progress Controls with Live Step Fill & Replay Button */}
              <div className="pt-4 border-t border-foreground/10 dark:border-white/10 flex items-center justify-between text-xs text-foreground/70">
                <div className="flex gap-2 items-center">
                  {chapters.map((_, i) => {
                    const isCurrent = activeChapter === i
                    const isPast = i < activeChapter || isCompleted
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectChapter(i)}
                        aria-label={`Go to chapter ${i + 1}`}
                        className="relative h-2 rounded-full overflow-hidden bg-foreground/15 dark:bg-white/15 cursor-pointer transition-all duration-300"
                        style={{ width: isCurrent ? "44px" : "14px" }}
                      >
                        {isCurrent ? (
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-75 ease-linear",
                              isCompleted ? "bg-emerald-500" : "bg-foreground dark:bg-white"
                            )}
                            style={{ width: isCompleted ? "100%" : `${progress}%` }}
                          />
                        ) : isPast ? (
                          <div className="h-full bg-foreground/60 dark:bg-white/60 rounded-full w-full" />
                        ) : null}
                      </button>
                    )
                  })}
                </div>

                {isCompleted ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleReplay}
                    className="text-xs bg-foreground text-background hover:bg-foreground/90 font-semibold cursor-pointer gap-1.5 shadow-sm rounded-full px-4"
                  >
                    <RotateCcw className="size-3.5" /> Replay Demo
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying((p) => !p)}
                      className="text-xs text-foreground/70 hover:text-foreground hover:bg-foreground/5 cursor-pointer gap-1 px-2.5"
                      title={isPlaying ? "Pause Demo" : "Resume Demo"}
                    >
                      {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                      <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNextStep}
                      className="text-xs text-foreground font-semibold hover:bg-foreground/5 cursor-pointer gap-1.5"
                    >
                      Next Step <ArrowRight className="size-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

