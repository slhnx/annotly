"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  Monitor,
  Tablet,
  Smartphone,
  CheckCircle2,
  Lock,
  RotateCw,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type ViewportMode = "desktop" | "tablet" | "mobile"

interface PinData {
  id: number
  top: string
  left: string
  author: string
  role: string
  initials: string
  timeAgo: string
  text: string
  meta: string
  reply?: {
    author: string
    role: string
    initials: string
    text: string
    timeAgo: string
  }
  isResolved: boolean
}

export function HeroCanvasMockup({ previewUrl = "https://studionord.dk" }: { previewUrl?: string }) {
  const [viewport, setViewport] = useState<ViewportMode>("desktop")
  const [activePinId, setActivePinId] = useState<number | null>(1)
  const [pins, setPins] = useState<PinData[]>([
    {
      id: 1,
      top: "16%",
      left: "48%",
      author: "Elena Rostova",
      role: "Client • Lead Architect",
      initials: "ER",
      timeAgo: "4m ago",
      text: "Could we increase the font contrast on this headline? Against the sky and timber canopy, it could use slightly more punch.",
      meta: "Chrome 122 • macOS • 1440×900 • DPR 2.0",
      reply: {
        author: "Alex Rivers",
        role: "Agency Designer",
        initials: "AR",
        text: "Updated to 600 weight with -1.5px tracking and a subtle 7.2:1 contrast ratio. Looks great now!",
        timeAgo: "1m ago",
      },
      isResolved: false,
    },
    {
      id: 2,
      top: "33%",
      left: "50%",
      author: "Marcus Vance",
      role: "Studio Director",
      initials: "MV",
      timeAgo: "14m ago",
      text: "Move this CTA slightly higher and add 8px more horizontal padding. It slightly encroaches on the roofline on tablet.",
      meta: "Safari 17.3 • iPad Pro • 1024×768",
      reply: {
        author: "Alex Rivers",
        role: "Agency Designer",
        initials: "AR",
        text: "Applied 20px padding and shifted top margin by -8px in staging build v2.",
        timeAgo: "8m ago",
      },
      isResolved: true,
    },
    {
      id: 3,
      top: "74%",
      left: "26%",
      author: "Sophia Brandt",
      role: "Brand Lead",
      initials: "SB",
      timeAgo: "28m ago",
      text: "Let's swap this card image for the dusk twilight view from photo shoot #2. Client preferred warmer lighting.",
      meta: "Mobile Safari • iPhone 15 Pro • 393×852",
      isResolved: false,
    },
  ])

  const togglePinResolved = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setPins((prev) =>
      prev.map((pin) => (pin.id === id ? { ...pin, isResolved: !pin.isResolved } : pin))
    )
  }

  // Viewport container width constraints
  const getContainerWidth = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[420px]"
      case "tablet":
        return "max-w-[760px]"
      case "desktop":
      default:
        return "max-w-5xl"
    }
  }

  const activePin = pins.find((p) => p.id === activePinId)

  return (
    <div className="relative w-full mx-auto transition-all duration-300">
      {/* Mockup Canvas Outer Frame */}
      <div
        className={`mx-auto ${getContainerWidth()} rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-[rgba(0,0,0,0.06)_0px_12px_40px_0px] transition-all duration-300`}
      >
        {/* Browser Chrome Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-border text-xs text-muted-foreground">
          {/* Window dots & URL bar */}
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="size-3 rounded-full bg-[#e2ded6] border border-[rgba(28,28,28,0.15)]" />
              <div className="size-3 rounded-full bg-[#e2ded6] border border-[rgba(28,28,28,0.15)]" />
              <div className="size-3 rounded-full bg-[#e2ded6] border border-[rgba(28,28,28,0.15)]" />
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-background border border-border text-[11px] font-mono text-foreground/80 max-w-xs truncate shadow-xs">
              <Lock className="size-3 text-muted-foreground shrink-0" />
              <span className="truncate">{previewUrl}/projects/villa-akeri</span>
            </div>

            <button
              type="button"
              aria-label="Refresh preview"
              className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCw className="size-3" />
            </button>
          </div>

          {/* Viewport Presets Switcher */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-[6px] border border-border">
            <button
              type="button"
              onClick={() => setViewport("desktop")}
              aria-label="Desktop viewport (1440px)"
              className={`flex items-center gap-1.5 px-2 py-1 rounded-[4px] text-xs font-medium transition-all ${
                viewport === "desktop"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Monitor className="size-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport("tablet")}
              aria-label="Tablet viewport (768px)"
              className={`flex items-center gap-1.5 px-2 py-1 rounded-[4px] text-xs font-medium transition-all ${
                viewport === "tablet"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Tablet className="size-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport("mobile")}
              aria-label="Mobile viewport (375px)"
              className={`flex items-center gap-1.5 px-2 py-1 rounded-[4px] text-xs font-medium transition-all ${
                viewport === "mobile"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="size-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Comment Mode Active Indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <Badge
              variant="pill"
              className="text-[11px] font-medium bg-primary/10 text-primary border-primary/20 py-0.5 px-2.5 flex items-center gap-1.5"
            >
              <span className="size-1.5 rounded-full bg-primary animate-pulse" />
              Comment Mode (Alt+C)
            </Badge>
          </div>
        </div>

        {/* Mockup Canvas Screen */}
        <div className="relative rounded-xl border border-border overflow-hidden bg-[#f7f4ed]">
          {/* Target Website Preview Image */}
          <div className="relative w-full aspect-[16/9] min-h-[360px] sm:min-h-[460px] md:min-h-[520px]">
            <Image
              src="/landing/studio-website-preview.jpg"
              alt="Fictional Studio Nord architectural website preview"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover object-top select-none pointer-events-none"
            />

            {/* Simulated Annotly Pins Layer */}
            {pins.map((pin) => {
              const isActive = activePinId === pin.id
              return (
                <div
                  key={pin.id}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setActivePinId(isActive ? null : pin.id)}
                >
                  <div
                    className={`relative flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                      pin.isResolved
                        ? "size-6 rounded-full bg-[#1c1c1c]/70 text-[#fcfbf8] border-2 border-[#f7f4ed]"
                        : isActive
                        ? "size-8 rounded-full bg-primary text-primary-foreground border-2 border-[#fcfbf8] ring-4 ring-primary/20 scale-105"
                        : "size-7 rounded-full bg-primary text-primary-foreground border-2 border-[#fcfbf8]"
                    }`}
                  >
                    {pin.isResolved ? "✓" : pin.id}

                    {/* Unresolved pulsing ring indicator */}
                    {!pin.isResolved && !isActive && (
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping pointer-events-none" />
                    )}
                  </div>
                </div>
              )
            })}

            {/* Active Popover Comment Card */}
            {activePin && (
              <div
                style={{
                  top: activePin.id === 3 ? "auto" : "28%",
                  bottom: activePin.id === 3 ? "12%" : "auto",
                  left: viewport === "mobile" ? "50%" : activePin.id === 3 ? "35%" : "54%",
                }}
                className="absolute -translate-x-1/2 sm:translate-x-0 z-30 w-[90%] max-w-[340px] p-4 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-[rgba(0,0,0,0.1)_0px_8px_30px_0px] text-xs space-y-3 animate-in fade-in zoom-in-95 duration-150"
              >
                {/* Header: Author + Meta */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-7 border border-border">
                      <AvatarFallback className="text-[10px] font-semibold bg-muted text-foreground">
                        {activePin.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground leading-tight">
                        {activePin.author}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{activePin.role}</div>
                    </div>
                  </div>

                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {activePin.timeAgo}
                  </span>
                </div>

                {/* Comment Body */}
                <p className="text-foreground leading-relaxed font-normal">{activePin.text}</p>

                {/* Technical Diagnostics Pill */}
                <div className="px-2 py-1 rounded bg-muted/80 text-[10px] font-mono text-muted-foreground border border-border/60">
                  {activePin.meta}
                </div>

                {/* Threaded Reply (if exists) */}
                {activePin.reply && (
                  <div className="pl-3 border-l-2 border-border/80 space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-foreground">
                        {activePin.reply.author} ({activePin.reply.role})
                      </span>
                      <span className="text-muted-foreground">{activePin.reply.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      {activePin.reply.text}
                    </p>
                  </div>
                )}

                {/* Footer Actions: Resolve + Reply */}
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => togglePinResolved(activePin.id, e)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[11px] font-medium transition-colors ${
                      activePin.isResolved
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "bg-muted text-foreground hover:bg-border border border-border"
                    }`}
                  >
                    <CheckCircle2 className="size-3" />
                    {activePin.isResolved ? "Resolved" : "Mark Resolved"}
                  </button>

                  <span className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer font-medium">
                    Reply (R)
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick interactive hint bar below preview */}
          <div className="bg-card px-4 py-2.5 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-emerald-500" />
              <span>Interactive preview — click any numbered pin (1, 2, 3) to view feedback thread</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span>Pins resolved: {pins.filter((p) => p.isResolved).length} / {pins.length}</span>
              <span className="hidden md:inline text-border">•</span>
              <span className="hidden md:inline">Zero browser extensions needed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
