"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  RotateCcw,
  Play,
  Pause,
  Check,
  MousePointer,
  CheckCircle2,
  Search,
  Plus,
  Globe,
  ArrowRight,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface DemoStep {
  id: number
  pillLabel: string
  title: string
  description: string
  rows: {
    label: string
    sublabel: string
    value: string
    badge?: string
  }[]
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 0,
    pillLabel: "01 Point & Anchor",
    title: "Point & drop a pin",
    description:
      "Click any DOM element to anchor feedback directly on the live website. Stays mathematically locked through responsive resizes.",
    rows: [
      {
        label: "Target Selector",
        sublabel: "button.cta-primary",
        value: "Hero CTA",
        badge: "DOM Anchor",
      },
      {
        label: "Device Viewport",
        sublabel: "390 × 844 px",
        value: "iPhone 15 Pro",
        badge: "Safari 17.4",
      },
      {
        label: "Offset Position",
        sublabel: "Element relative %",
        value: "X: 51.4% • Y: 28.6%",
      },
    ],
  },
  {
    id: 1,
    pillLabel: "02 Auto-Diagnostics",
    title: "Auto-telemetry diagnostics",
    description:
      "Never ask for browser specs again. Annotly logs device OS, computed contrast ratios, and element styles automatically.",
    rows: [
      {
        label: "Computed Contrast",
        sublabel: "WCAG 2.1 AA Standard",
        value: "4.8:1 Ratio",
        badge: "Pass",
      },
      {
        label: "Reviewer Identity",
        sublabel: "Lead Architect",
        value: "Elena Rostova",
        badge: "Client",
      },
      {
        label: "DOM Hierarchy",
        sublabel: "header > nav > button",
        value: "Level 3 Node",
      },
    ],
  },
  {
    id: 2,
    pillLabel: "03 1-Click Resolve",
    title: "1-Click git fix & resolve",
    description:
      "Turn visual notes into actionable commits. Close the feedback loop without sending a single screenshot or email thread.",
    rows: [
      {
        label: "GitHub Pull Request",
        sublabel: "#142 Fix hero CTA padding",
        value: "Merged ✓",
        badge: "main",
      },
      {
        label: "Thread Status",
        sublabel: "Verified by Alex Rivers",
        value: "Resolved ✓",
        badge: "Complete",
      },
      {
        label: "Linear Ticket",
        sublabel: "ANN-289 Design Polish",
        value: "Done",
        badge: "Synced",
      },
    ],
  },
]

const STEP_DURATION_MS = 4500
const TICK_INTERVAL_MS = 50

export function HeroCanvasMockup({
  previewUrl = "https://studionord.dk",
}: {
  previewUrl?: string
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isReplaying, setIsReplaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0 to 100%

  const progressRef = useRef(0)
  const domain = previewUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "studionord.dk"

  // Handle automated step progression with progress bar
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      progressRef.current += (TICK_INTERVAL_MS / STEP_DURATION_MS) * 100

      if (progressRef.current >= 100) {
        progressRef.current = 0
        setCurrentStep((prev) => (prev + 1) % DEMO_STEPS.length)
      }

      setProgress(Math.min(progressRef.current, 100))
    }, TICK_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [isPlaying])

  // Cursor phase derived directly from progress during step 0 (pure declarative state, zero cascading renders)
  const cursorPhase: "moving" | "clicking" | "clicked" =
    currentStep !== 0
      ? "clicked"
      : progress < 22
      ? "moving"
      : progress < 32
      ? "clicking"
      : "clicked"

  const handleStepSelect = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    progressRef.current = 0
    setProgress(0)
  }

  const handleReplay = () => {
    setIsReplaying(true)
    setCurrentStep(0)
    progressRef.current = 0
    setProgress(0)
    setIsPlaying(true)
    setTimeout(() => setIsReplaying(false), 600)
  }

  const activeStepData = DEMO_STEPS[currentStep]

  return (
    <div className="relative w-full mx-auto select-none">
      {/* Outer Stage Container with Accent Background (#ede7dc) and Large Rounded Corners */}
      <div
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-[#ede7dc] dark:bg-[#201f1d] border border-foreground/[0.08] dark:border-white/[0.08] p-5 sm:p-8 md:p-12 overflow-hidden shadow-none transition-all"
      >
        {/* Subtle Tactile Grain Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-overlay z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Delicate Hand-Drawn Sketch / Doodle SVGs (Matching Inspiration Aesthetic) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden text-foreground/[0.07] dark:text-white/[0.06]">
          {/* Top-Left Sparkle / Star */}
          <svg
            className="absolute top-10 left-12 w-8 h-8 rotate-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
          </svg>

          {/* Left Wavy Squiggle */}
          <svg
            className="absolute top-1/2 left-8 -translate-y-1/2 w-16 h-8 -rotate-6 hidden sm:block"
            viewBox="0 0 60 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M2 10 Q 15 2, 30 10 T 58 10" />
          </svg>

          {/* Bottom-Left Chat Bubble Doodle */}
          <svg
            className="absolute bottom-16 left-16 w-10 h-10 -rotate-12 hidden md:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>

          {/* Top-Right Hand-Drawn Loop */}
          <svg
            className="absolute top-12 right-16 w-12 h-12 rotate-45 hidden sm:block"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
          </svg>

          {/* Right DOM Code Tag Doodle */}
          <svg
            className="absolute top-1/3 right-10 w-12 h-8 rotate-3 hidden md:block"
            viewBox="0 0 40 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <path d="M12 4 L4 12 L12 20 M28 4 L36 12 L28 20 M22 2 L18 22" />
          </svg>

          {/* Right Wavy Line */}
          <svg
            className="absolute top-2/3 right-14 w-20 h-6 rotate-12 hidden sm:block"
            viewBox="0 0 80 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <path d="M2 10 Q 20 2, 40 10 T 78 10" />
          </svg>

          {/* Bottom-Right Crosshair Anchor */}
          <svg
            className="absolute bottom-14 right-20 w-8 h-8 -rotate-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="7" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        </div>

        {/* Foreground Demo Stage: Transparent, Floating, Multi-Layered */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-14 min-h-[540px] sm:min-h-[580px] md:min-h-[620px] py-4">
          {/* Left Side: Floating Context Card (Matching Inspiration Layout) */}
          <div className="w-full max-w-[340px] lg:max-w-[360px] md:order-1 order-2 transition-all duration-300">
            <div className="rounded-2xl bg-card/95 dark:bg-[#1a1a19]/95 backdrop-blur-md p-5 sm:p-6 border border-foreground/[0.08] dark:border-white/[0.08] shadow-[rgba(0,0,0,0.06)_0px_10px_30px_0px] text-left space-y-4">
              {/* Header Title + Description */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="size-1.5 rounded-full bg-foreground" />
                  <span>Interactive Context</span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-[-0.8px] leading-tight transition-all">
                  {activeStepData.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed transition-all">
                  {activeStepData.description}
                </p>
              </div>

              {/* 3 Itemized Data Rows (Direct Inspiration Parity) */}
              <div className="divide-y divide-foreground/[0.06] dark:divide-white/[0.06] pt-1">
                {activeStepData.rows.map((row, idx) => (
                  <div key={idx} className="py-2.5 first:pt-1 last:pb-0 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-foreground truncate">
                        {row.label}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-muted-foreground truncate">
                        {row.sublabel}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-[13px] font-mono font-semibold text-foreground">
                        {row.value}
                      </div>
                      {row.badge && (
                        <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-medium bg-foreground/[0.06] dark:bg-white/[0.08] text-foreground">
                          {row.badge}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Sleek Mobile Device Mockup Frame (Direct Inspiration Parity) */}
          <div className="relative md:order-2 order-1 shrink-0 transition-transform duration-500 hover:scale-[1.01]">
            {/* Phone Outer Shell with Dark Bezel, Realistic Curve, and Inset Light */}
            <div className="relative w-[305px] sm:w-[330px] md:w-[348px] p-[10px] sm:p-[12px] rounded-[48px] sm:rounded-[54px] bg-[#1c1c1c] text-foreground shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.12)_inset] transition-all">
              {/* Hardware Button Accents on Phone Sides */}
              <div className="absolute -left-[3px] top-24 w-[3px] h-10 bg-[#2e2e2e] rounded-l-sm" />
              <div className="absolute -left-[3px] top-38 w-[3px] h-10 bg-[#2e2e2e] rounded-l-sm" />
              <div className="absolute -right-[3px] top-30 w-[3px] h-16 bg-[#2e2e2e] rounded-r-sm" />

              {/* Dynamic Island Notch */}
              <div className="w-[108px] h-[26px] bg-black rounded-full mx-auto mb-2.5 flex items-center justify-end px-2.5 gap-1.5 shadow-inner">
                <div className="size-2 rounded-full bg-[#111] border border-white/10" />
                <div className="size-1.5 rounded-full bg-[#0a192f]/80" />
              </div>

              {/* Phone Screen Viewport */}
              <div className="relative rounded-[38px] sm:rounded-[44px] overflow-hidden bg-white dark:bg-[#141413] p-4 sm:p-4.5 flex flex-col justify-between border border-black/10 select-none text-left space-y-3">
                {/* 1. Top Header: Scan a bill / Review live site + Select */}
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-foreground leading-tight tracking-tight">
                      Review live site
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      3 pins • scanned just now
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-3 py-1 rounded-full text-xs font-medium border border-border/80 bg-[#f2ede4]/60 dark:bg-muted text-foreground hover:bg-[#f2ede4] transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>

                {/* 2. Top Summary Card: YOUR SHARE / YOUR REVIEW STATUS */}
                <div className="rounded-2xl border border-border/80 bg-white dark:bg-[#1a1a19] p-3.5 space-y-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                  <div className="text-[9px] font-bold text-muted-foreground tracking-wider uppercase">
                    YOUR REVIEW SHARE
                  </div>
                  <div className="font-heading text-3xl font-extrabold tracking-tight text-foreground flex items-baseline gap-1.5">
                    <span>{currentStep === 2 ? "100%" : "67%"}</span>
                    <span className="text-xs font-normal text-muted-foreground font-sans">
                      {currentStep === 2 ? "approved" : "in progress"}
                    </span>
                  </div>
                  {/* Split bar (orange/charcoal accent to gray) */}
                  <div className="w-full h-2 rounded-full bg-[#eceae4] dark:bg-muted overflow-hidden my-2">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        currentStep === 2 ? "w-full bg-emerald-600" : "w-2/3 bg-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium">
                    <span>of 3 review pins</span>
                    <span>{currentStep === 2 ? "All resolved ✓" : "1 pending fix"}</span>
                  </div>
                </div>

                {/* 3. Search & Filter Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f2ede4]/80 dark:bg-muted/80 text-xs text-muted-foreground">
                    <Search className="size-3.5 shrink-0" />
                    <span className="truncate">Search feedback or tags...</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#f2ede4] dark:bg-muted text-xs font-semibold text-foreground shrink-0">
                    All mine
                  </div>
                </div>

                {/* 4. Itemized Feedback List (Direct Parity with Coke Float, CGST, SGST) */}
                <div className="space-y-2.5">
                  {/* Item 1: Hero CTA Button (Active Animated Target Pin #1) */}
                  <div
                    className={`p-2 rounded-xl transition-all duration-300 space-y-2 ${
                      currentStep === 0
                        ? "bg-[#f2ede4]/50 dark:bg-muted/40 border border-foreground/15 ring-2 ring-foreground/5"
                        : "border border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-xs text-foreground">
                          Hero CTA Button Padding
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Elena Rostova • Safari 17.4
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs font-bold ${
                            currentStep === 2 ? "text-emerald-600" : "text-foreground"
                          }`}
                        >
                          {currentStep === 2 ? "Fixed" : "Open"}
                        </div>
                        <div
                          className={`text-[9px] font-semibold uppercase tracking-wider ${
                            currentStep === 2
                              ? "text-emerald-700 dark:text-emerald-400"
                              : "text-muted-foreground"
                          }`}
                        >
                          {currentStep === 2 ? "RESOLVED" : "YOURS"}
                        </div>
                      </div>
                    </div>

                    {/* Pills Row (Mine, ÷2, ÷3, ÷4 equivalent) */}
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border bg-background text-foreground">
                          Mine
                        </span>
                        <span
                          className={`size-5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all ${
                            currentStep === 2
                              ? "bg-emerald-600 text-white"
                              : "bg-primary text-primary-foreground shadow-xs"
                          }`}
                        >
                          {currentStep === 2 ? "✓" : "#1"}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground border border-border bg-background">
                          button.cta
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border bg-background text-muted-foreground">
                          +8px
                        </span>
                      </div>
                      <CheckCircle2
                        className={`size-3.5 shrink-0 ${
                          currentStep === 2 ? "text-emerald-600" : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    {/* Step 1: Expanded Auto-Diagnostics Speech Box */}
                    {currentStep === 1 && (
                      <div className="p-2 rounded-lg bg-[#f2ede4]/60 dark:bg-muted text-[10px] text-foreground leading-snug border border-border/60 shadow-xs animate-in fade-in duration-200">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Avatar className="size-4 border border-border">
                            <AvatarFallback className="text-[7px] font-bold bg-muted text-foreground">
                              ER
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-[9px] font-semibold text-foreground">
                            Elena (Lead Architect)
                          </span>
                        </div>
                        &ldquo;Increase button padding by 8px and adjust timber contrast.&rdquo;
                      </div>
                    )}

                    {/* Step 2: Resolved Banner */}
                    {currentStep === 2 && (
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium flex items-center gap-1.5 border border-emerald-500/20 animate-in fade-in duration-200">
                        <Check className="size-3" />
                        <span>PR #142 Merged • linear.app/ANN-289</span>
                      </div>
                    )}
                  </div>

                  {/* Item 2: Headline Font Weight (Pin #02) */}
                  <div className="space-y-1.5 pt-1 border-t border-foreground/[0.06] dark:border-white/[0.06]">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-xs text-foreground">
                          Headline Font Weight
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Marcus Vance • Chrome 122
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-600">600 wt</div>
                        <div className="text-[9px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          RESOLVED
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border bg-background text-foreground">
                          Mine
                        </span>
                        <span className="size-5 rounded-full text-[10px] font-bold bg-muted text-foreground flex items-center justify-center">
                          #2
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground border border-border bg-background">
                          h1.hero
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border bg-background text-muted-foreground">
                          -1.5px
                        </span>
                      </div>
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    </div>
                  </div>

                  {/* Item 3: Timber Canopy Contrast (Pin #03) */}
                  <div className="space-y-1.5 pt-1 border-t border-foreground/[0.06] dark:border-white/[0.06]">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-xs text-foreground">
                          Timber Canopy Contrast
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Sophia Brandt • iPad Pro
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-emerald-600">7.2:1</div>
                        <div className="text-[9px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          RESOLVED
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border bg-background text-foreground">
                          Mine
                        </span>
                        <span className="size-5 rounded-full text-[10px] font-bold bg-muted text-foreground flex items-center justify-center">
                          #3
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground border border-border bg-background">
                          .canopy
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-border bg-background text-muted-foreground">
                          AA Pass
                        </span>
                      </div>
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                    </div>
                  </div>
                </div>

                {/* 5. "+ Add item" equivalent */}
                <button
                  type="button"
                  className="py-0.5 text-xs font-semibold text-foreground/80 hover:text-foreground flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Plus className="size-3.5" />
                  <span>Drop pin on live website</span>
                </button>

                {/* 6. Context Tag Pills (McDonald's & Eating out equivalent) */}
                <div className="flex items-center gap-2 pt-1">
                  <div className="px-3 py-1.5 rounded-xl bg-[#f2ede4] dark:bg-muted text-[11px] font-mono text-foreground/85 truncate flex-1">
                    {domain}/projects
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1a1a19] border border-border text-[11px] font-medium text-foreground/85 flex items-center gap-1.5 shrink-0">
                    <Globe className="size-3 text-muted-foreground" />
                    <span>Live Canvas</span>
                  </div>
                </div>

                {/* 7. Bottom Full-Width Rounded Button (Review ₹72 → equivalent) */}
                <button
                  type="button"
                  className={`w-full py-3.5 px-6 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.08)_0px_2px_4px_0px] ${
                    currentStep === 2
                      ? "bg-emerald-600 text-white hover:bg-emerald-500"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  <span>
                    {currentStep === 2
                      ? "Push Fixes to GitHub PR #142"
                      : "Review All Pins (3)"}
                  </span>
                  <ArrowRight className="size-4" />
                </button>

                {/* Animated Cursor in Step 0 pointing to Item 1 */}
                {currentStep === 0 && (
                  <div
                    className={`absolute pointer-events-none z-30 transition-all duration-700 ease-out flex items-center gap-1 ${
                      cursorPhase === "moving"
                        ? "top-36 right-8 opacity-90 -rotate-6"
                        : "top-[235px] left-36 opacity-100 rotate-0 scale-95"
                    }`}
                  >
                    <MousePointer className="size-4 text-foreground fill-foreground drop-shadow-md" />
                    <span className="px-1.5 py-0.5 rounded-full bg-foreground text-background text-[8px] font-semibold shadow-xs whitespace-nowrap">
                      Elena (Client)
                    </span>
                    {cursorPhase === "clicking" && (
                      <span className="absolute -top-1 -left-1 size-6 rounded-full bg-foreground/30 animate-ping pointer-events-none" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Segmented Switcher, Status Pill & Replay Button */}
        <div className="relative z-10 pt-4 border-t border-foreground/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Bottom-Left: Live Review Indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground order-2 sm:order-1">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-foreground/80">Interactive review canvas</span>
            <span className="hidden md:inline text-foreground/30">•</span>
            <span className="hidden md:inline">Zero extensions required</span>
          </div>

          {/* Center: Segmented Pill Switcher with Animated Progress Fill */}
          <div className="inline-flex items-center rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] p-1 border border-foreground/[0.08] dark:border-white/[0.08] backdrop-blur-xs order-1 sm:order-2">
            {DEMO_STEPS.map((step, idx) => {
              const isActive = currentStep === idx
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepSelect(idx)}
                  className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-card dark:bg-[#1a1a19] text-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative z-10">{step.pillLabel}</span>

                  {/* Active Step Real-Time Progress Bar */}
                  {isActive && isPlaying && (
                    <div
                      className="absolute bottom-0 left-0 h-[2px] bg-foreground/60 dark:bg-white/60 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Bottom-Right: Replay & Pause Controls */}
          <div className="flex items-center gap-1.5 order-3">
            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause animated demo" : "Resume animated demo"}
              title={isPlaying ? "Pause demo" : "Resume demo"}
              className="size-8 rounded-full bg-card hover:bg-card/90 border border-foreground/[0.08] dark:border-white/[0.08] flex items-center justify-center text-foreground transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            >
              {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5 ml-0.5" />}
            </button>

            {/* Replay Button */}
            <button
              type="button"
              onClick={handleReplay}
              aria-label="Replay animated demo"
              title="Replay from beginning"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card hover:bg-card/90 border border-foreground/[0.08] dark:border-white/[0.08] text-xs font-semibold text-foreground transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
            >
              <RotateCcw className={`size-3.5 ${isReplaying ? "animate-spin" : ""}`} />
              <span>Replay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
