"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Check,
  RotateCcw,
  Play,
  Pause,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STEP_DURATION = 4000 // 4 seconds per step
const TICK_INTERVAL = 40 // 40ms updates for smooth 60fps-like progress

export function BeforeAfter() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mobileTab, setMobileTab] = useState<"without" | "with">("with")
  const progressRef = useRef(0)

  const comparisonSteps = [
    {
      step: "01",
      title: "Feedback Capture",
      subtitle: "Vague Email vs. Element-Anchored Pin",
      without: {
        headline: "The Vague Email",
        logs: [
          { time: "10:14 AM", channel: "Email", text: '“Can you fix that button on the about page?”', alert: true },
          { time: "10:18 AM", channel: "Dev Notes", text: "✕ Missing page URL, element selector, and device width", note: true },
          { time: "10:32 AM", channel: "Slack", text: '“Which button? Header CTA or contact form?”' },
          { time: "10:45 AM", channel: "Client", text: "“The blue one. Also looks weird on my phone”" },
        ],
        metric: "Context missing · Unreproducible",
      },
      with: {
        quote: "“Button text wraps on iPhone. Bump horizontal padding to 14px.”",
        status: "Annotly Pin #04 is locked",
        subtext: "Sarah Jenkins (Client Reviewer) · Staging v2.4",
        badge: "Element Anchor",
        checklist: [
          { text: "Anchored to button.btn-primary#hero-cta at X: 42%, Y: 68%", done: true },
          { text: "Auto-captured iPhone 15 Pro · 393×852 · Safari 17.4", done: true },
          { text: "Instant lossless client-side screen snapshot attached", done: true },
          { text: "Coordinates locked to DOM rect (Resize & Reflow Safe)", done: true },
        ],
        preview: {
          tag: "button.btn-primary#hero-cta",
          detail: "393×852 (Mobile Safari)",
          pin: "4",
          actionText: "Pin anchored in 5 seconds",
          statusBadge: "Ready to Deploy",
          isResolved: false,
        },
      },
    },
    {
      step: "02",
      title: "Environment Triage",
      subtitle: "18 Slack Messages vs. Instant Diagnostics",
      without: {
        headline: "The Slack Detective Game",
        logs: [
          { time: "11:05 AM", channel: "Slack", text: '“What phone model and browser are you using?”' },
          { time: "11:45 AM", channel: "Email", text: "[IMG_9402_screen.png attached (no URL bar)]", alert: true },
          { time: "01:15 PM", channel: "Slack", text: "“Cannot reproduce on desktop Chrome 1440px”", alert: true },
          { time: "02:30 PM", channel: "Slack", text: "“Wait, are you testing on staging or live?”" },
        ],
        metric: "18 messages sent · 3 hours spent guessing",
      },
      with: {
        quote: "“Developer opens pin. Full environment diagnostics attached.”",
        status: "Auto-Diagnostics Populated",
        subtext: "Alex Chen (Frontend Dev) · Staging v2.4",
        badge: "Deep Telemetry",
        checklist: [
          { text: "Exact viewport verified: 393×852 (Device Pixel Ratio 2.0x)", done: true },
          { text: "Webkit engine & iOS 17.4 color scheme flags recorded", done: true },
          { text: "Instant snapshot rendered directly from reviewer canvas", done: true },
          { text: "Zero back-and-forth asking 'What screen were you on?'", done: true },
        ],
        preview: {
          tag: "button.btn-primary#hero-cta",
          detail: "Viewport: 393×852 • Engine: Mobile Safari 17.4",
          pin: "4",
          actionText: "Reproduced in 10 seconds",
          statusBadge: "Verified on Staging",
          isResolved: false,
        },
      },
    },
    {
      step: "03",
      title: "Resolution & Sign-off",
      subtitle: "Emergency Zoom vs. 1-Click Resolve",
      without: {
        headline: "The Emergency Alignment Call",
        logs: [
          { time: "03:45 PM", channel: "Email", text: "“Can we just jump on a quick Zoom call?”", alert: true },
          { time: "04:10 PM", channel: "Calendar", text: "Emergency Feedback Alignment (45 mins)", alert: true },
          { time: "05:00 PM", channel: "Status", text: "1 full day lost clarifying a 1-line CSS padding fix" },
          { time: "05:15 PM", channel: "Outcome", text: "Frustrated client · Delayed milestone sign-off", alert: true },
        ],
        metric: "6 hours wasted · 0 lines of code pushed",
      },
      with: {
        quote: "“CSS padding updated: 10px → 14px. Fix verified on staging.”",
        status: "Resolved in Commit #9f2a",
        subtext: "Alex Chen (Frontend Dev) · Staging v2.4",
        badge: "1-Click Sign-Off",
        checklist: [
          { text: "Fix pushed directly to staging branch in 2 minutes", done: true },
          { text: "Pin marked resolved with 1 click; link stays 100% clean", done: true },
          { text: "Client receives visual confirmation in their browser", done: true },
          { text: "Sprint review approved without emergency calls", done: true },
        ],
        preview: {
          tag: "button.btn-primary#hero-cta",
          detail: "CSS padding updated: 10px → 14px",
          pin: "✓",
          actionText: "Resolved in commit #9f2a",
          statusBadge: "Closed & Clean",
          isResolved: true,
        },
      },
    },
  ]

  // Automated progression timer loop with progressRef anchor
  useEffect(() => {
    if (!isPlaying || isHovered || isCompleted) return

    const startTime = Date.now() - (progressRef.current / 100) * STEP_DURATION

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const currentProgress = Math.min((elapsed / STEP_DURATION) * 100, 100)

      if (currentProgress >= 100) {
        clearInterval(timer)
        progressRef.current = 0
        if (activeStep < comparisonSteps.length - 1) {
          setActiveStep((prev) => prev + 1)
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
  }, [isPlaying, isHovered, isCompleted, activeStep, comparisonSteps.length])

  const handleSelectStep = (idx: number) => {
    progressRef.current = 0
    setActiveStep(idx)
    setProgress(0)
    setIsCompleted(false)
    setIsPlaying(true)
  }

  const handleReplay = () => {
    progressRef.current = 0
    setActiveStep(0)
    setProgress(0)
    setIsCompleted(false)
    setIsPlaying(true)
  }

  const handleNextStep = () => {
    if (activeStep < comparisonSteps.length - 1) {
      progressRef.current = 0
      setActiveStep((prev) => prev + 1)
      setProgress(0)
      setIsCompleted(false)
      setIsPlaying(true)
    } else {
      handleReplay()
    }
  }

  const current = comparisonSteps[activeStep]

  return (
    <section id="before-after" className="w-full bg-[#1c1c1c] dark:bg-[#121110] text-[#fcfbf8] py-24 border-y border-black/20 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        {/* Eyebrow & Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/15 bg-white/[0.08] text-xs font-medium text-white/80 mb-4 shadow-xs">
            <Sparkles className="size-3.5 text-white" />
            <span>The Real-World Difference</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-white mb-4 leading-tight">
            Clear visual context vs. endless guessing.
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            A vague Slack comment wastes 3 days of back-and-forth. An element-anchored pin fixes it in 30 seconds.
          </p>

          {/* Mobile Segmented Toggle (Visible only on small screens) */}
          <div className="md:hidden mt-6 inline-flex p-1 rounded-full bg-white/10 border border-white/15">
            <button
              onClick={() => setMobileTab("without")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                mobileTab === "without"
                  ? "bg-white text-[#1c1c1c] shadow-xs font-semibold"
                  : "text-white/70 hover:text-white"
              )}
            >
              Without Annotly
            </button>
            <button
              onClick={() => setMobileTab("with")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                mobileTab === "with"
                  ? "bg-white text-[#1c1c1c] shadow-xs font-semibold"
                  : "text-white/70 hover:text-white"
              )}
            >
              With Annotly
            </button>
          </div>
        </div>

        {/* Unified Comparison Stage (Aviary-inspired split layout with Live Animation) */}
        <div
          className="relative rounded-[28px] sm:rounded-[36px] bg-[#232220] dark:bg-[#181716] border border-white/10 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tactile Noisy Grain Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Top Control Bar: Step Pills, Live Loading Progress & Controls */}
          <div className="relative z-20 px-6 sm:px-8 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02] backdrop-blur-xs">
            {/* Step Selector Buttons with Progress Fill */}
            <div className="flex items-center gap-2">
              {comparisonSteps.map((s, idx) => {
                const isCurrent = activeStep === idx
                const isPast = idx < activeStep || isCompleted
                return (
                  <button
                    key={s.step}
                    onClick={() => handleSelectStep(idx)}
                    className={cn(
                      "relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer overflow-hidden border flex items-center gap-2",
                      isCurrent
                        ? "bg-white/15 border-white/30 text-white font-semibold shadow-xs"
                        : isPast
                        ? "bg-white/[0.06] border-white/15 text-white/80 hover:bg-white/[0.09]"
                        : "bg-transparent border-white/10 text-white/60 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    {/* Subtle active fill bar inside pill */}
                    {isCurrent && (
                      <div
                        className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-75 ease-linear pointer-events-none"
                        style={{ width: isCompleted ? "100%" : `${progress}%` }}
                      />
                    )}
                    <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                    <span className="truncate">{s.title}</span>
                  </button>
                )
              })}
            </div>

            {/* Right Header Status & Actions */}
            <div className="flex items-center gap-3">
              {/* Live Status indicator */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/70">
                <span
                  className={cn(
                    "size-2 rounded-full",
                    isCompleted
                      ? "bg-emerald-400"
                      : isHovered
                      ? "bg-amber-400"
                      : "bg-emerald-400 animate-pulse"
                  )}
                />
                <span className="text-[11px]">
                  {isCompleted
                    ? "Comparison Complete"
                    : isHovered
                    ? "Paused (Hovered)"
                    : `Point 0${activeStep + 1} of 03 (${Math.round(progress)}%)`}
                </span>
              </div>

              {/* Quick Replay Button */}
              <button
                onClick={handleReplay}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 text-[11px] font-mono text-white/90 hover:text-white transition-colors cursor-pointer border border-white/15"
                title="Replay comparison demo"
              >
                <RotateCcw className="size-3" />
                <span>Replay</span>
              </button>
            </div>
          </div>

          {/* Floating Center Comparison Pill (Desktop) - Light Pill on Dark Canvas */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <div className="bg-[#fcfbf8] text-[#1c1c1c] px-4 py-2 rounded-full shadow-[0_16px_36px_rgba(0,0,0,0.45)] border border-white/20 text-xs font-mono font-semibold tracking-wide flex items-center gap-2">
              <span>Without Annotly</span>
              <ArrowRight className="size-3 opacity-60 text-[#1c1c1c]" />
              <span className="text-emerald-700 font-bold">With Annotly</span>
            </div>
          </div>

          {/* 2-Column Side-by-Side Body with Active Step Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-stretch">
            {/* LEFT SIDE: Without Annotly (Raw Chaotic Feedback Log) */}
            <div
              className={cn(
                "p-6 sm:p-9 sm:border-r border-white/10 bg-black/25 flex flex-col justify-between space-y-6 animate-in fade-in duration-300",
                mobileTab === "without" ? "block" : "hidden md:flex"
              )}
            >
              <div className="space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-white/50">
                  <div className="flex items-center gap-6">
                    <span>Time</span>
                    <span>Channel</span>
                  </div>
                  <span className="text-red-400 font-semibold">
                    {current.without.headline}
                  </span>
                </div>

                {/* Monospace Log Rows for current step */}
                <div className="space-y-3 font-mono text-xs text-white/80">
                  {current.without.logs.map((log, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-baseline justify-between gap-3 p-2 rounded transition-colors",
                        log.alert
                          ? "bg-red-500/15 border border-red-500/25 text-red-200"
                          : log.note
                          ? "bg-amber-500/10 border border-amber-500/20 text-amber-200"
                          : "hover:bg-white/[0.03] text-white/80"
                      )}
                    >
                      <div className="flex items-baseline gap-4 shrink-0 text-white/50 text-[11px]">
                        <span className="w-16">{log.time}</span>
                        <span className="w-18 text-white/70 font-semibold">{log.channel}</span>
                      </div>
                      <span className="truncate text-[11px] text-right sm:text-left flex items-center gap-1.5">
                        {log.alert && <AlertCircle className="size-3 text-red-400 shrink-0 inline" />}
                        {log.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Pain Metric */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-red-400 font-medium">
                  <span className="size-2 rounded-full bg-red-400 animate-pulse" />
                  <span>{current.without.metric}</span>
                </div>
                <span className="text-white/50 text-[11px]">Step {current.step} / 03</span>
              </div>
            </div>

            {/* RIGHT SIDE: With Annotly (High-Context In-Place Resolution) */}
            <div
              className={cn(
                "p-6 sm:p-9 flex flex-col justify-between space-y-7 bg-[#232220] dark:bg-[#181716] animate-in fade-in duration-300",
                mobileTab === "with" ? "block" : "hidden md:flex"
              )}
            >
              {/* Top Quote & Annotly Active Badge */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                  {current.with.quote}
                </h3>

                {/* Status Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-[8px] bg-white text-[#1c1c1c] flex items-center justify-center font-bold shadow-xs">
                      <Sparkles className="size-4" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-white text-sm flex items-center gap-2">
                        {current.with.status}
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="text-xs text-white/60">{current.with.subtext}</div>
                    </div>
                  </div>
                  <Badge variant="pill" className="text-[10px] font-mono py-0.5 bg-white/10 text-white border-white/15">
                    {current.with.badge}
                  </Badge>
                </div>

                {/* Checklist / Metadata diagnostics */}
                <div className="space-y-2.5 pt-1">
                  {current.with.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/90">
                      <div className="size-4.5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                        <Check className="size-3" />
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inner Nested Live Staging Card (Aviary-style bottom panel) */}
              <div className="rounded-[20px] bg-[#1a1917] border border-white/10 p-5 space-y-3.5 relative overflow-hidden">
                {/* Tactile Grain on Inner Card */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="font-mono text-[11px] font-semibold text-white/70 uppercase tracking-wide">
                      Live Pin Inspector
                    </span>
                    <Badge variant="pill" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[10px] py-0 font-medium">
                      {current.with.preview.statusBadge}
                    </Badge>
                  </div>

                  {/* Simulated Target Element with Dropped Pin */}
                  <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-7 rounded-full bg-white text-[#1c1c1c] flex items-center justify-center font-bold text-xs shadow-sm shrink-0">
                        {current.with.preview.pin}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {current.with.preview.tag}
                        </div>
                        <div className="text-[11px] text-white/60 font-mono">
                          {current.with.preview.detail}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/25">
                      Commit #9f2a
                    </span>
                  </div>

                  {/* Developer Resolution Bar */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[11px] text-white/60 font-mono">
                      {current.with.preview.actionText}
                    </span>
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] text-xs font-semibold shadow-xs transition-colors",
                        current.with.preview.isResolved
                          ? "bg-emerald-500 text-black font-bold"
                          : "bg-white text-[#1c1c1c]"
                      )}
                    >
                      <CheckCircle2 className="size-3.5" />
                      <span>{current.with.preview.isResolved ? "Resolved" : "In Review"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Progress Controls with Expanding Story Pills & Replay Button */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                {/* Expanding Story Pills with Live Progress Fill */}
                <div className="flex gap-2 items-center">
                  {comparisonSteps.map((_, i) => {
                    const isCurrent = activeStep === i
                    const isPast = i < activeStep || isCompleted
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectStep(i)}
                        aria-label={`Go to comparison point ${i + 1}`}
                        className="relative h-2 rounded-full overflow-hidden bg-white/20 cursor-pointer transition-all duration-300"
                        style={{ width: isCurrent ? "44px" : "14px" }}
                      >
                        {isCurrent ? (
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-75 ease-linear",
                              isCompleted ? "bg-emerald-400" : "bg-white"
                            )}
                            style={{ width: isCompleted ? "100%" : `${progress}%` }}
                          />
                        ) : isPast ? (
                          <div className="h-full bg-white/60 rounded-full w-full" />
                        ) : null}
                      </button>
                    )
                  })}
                </div>

                {/* Action Buttons */}
                {isCompleted ? (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleReplay}
                    className="text-xs bg-white text-[#1c1c1c] hover:bg-white/90 font-semibold cursor-pointer gap-1.5 shadow-sm rounded-full px-4"
                  >
                    <RotateCcw className="size-3.5" /> Replay Demo
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying((p) => !p)}
                      className="text-xs text-white/70 hover:text-white hover:bg-white/10 cursor-pointer gap-1 px-2.5"
                      title={isPlaying ? "Pause Demo" : "Resume Demo"}
                    >
                      {isPlaying ? <Pause className="size-3" /> : <Play className="size-3" />}
                      <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNextStep}
                      className="text-xs text-white font-semibold hover:bg-white/10 cursor-pointer gap-1.5"
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


