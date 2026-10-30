"use client"

import React, { useState } from "react"
import { ArrowRight, Globe, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { HERO_TRUST_POINTS } from "@/components/landing/hero.data"
import { HeroCanvasMockup } from "@/components/landing/hero-canvas-mockup"

interface HeroProps {
  onStartReview?: (url: string) => void
}

export function Hero({ onStartReview }: HeroProps) {
  const [urlInput, setUrlInput] = useState("https://studionord.dk")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleCreateCanvas = (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      if (onStartReview) onStartReview(urlInput)
    }, 450)
  }

  return (
    <section className="relative pt-16 sm:pt-20 pb-16 px-6 max-w-[1240px] mx-auto text-center overflow-hidden">
      {/* Eyebrow Pill */}
      <Badge
        variant="pill"
        className="mb-8 h-auto gap-2 bg-card px-3.5 py-1.5 text-muted-foreground opacity-100 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <Sparkles className="size-3.5 text-foreground" />
        <span>Website feedback, without the back-and-forth</span>
      </Badge>

      {/* Primary Display Headline (negative tracking per DESIGN.md) */}
      <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold text-foreground max-w-4xl mx-auto tracking-[-1.5px] leading-[1.05] mb-6">
        Feedback that lands exactly where it should.
      </h1>

      {/* Subhead */}
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
        Pin comments directly on any live webpage, keep every suggestion in technical context, and help your team turn client feedback into clearer next steps.
      </p>

      {/* Interactive URL Starter Bar */}
      <div className="max-w-xl mx-auto mb-14">
        <form
          onSubmit={handleCreateCanvas}
          className="p-1.5 sm:p-2 rounded-xl border border-border bg-card shadow-card flex flex-col sm:flex-row gap-2 transition-all focus-within:shadow-focus focus-within:border-border-interactive"
        >
          <div className="relative flex-1">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter any website (e.g. https://yourclient.com)"
              className="pl-10 h-11 border-transparent bg-transparent text-sm focus-visible:ring-0 focus-visible:shadow-none placeholder:text-muted-foreground/60 text-foreground"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="h-11 px-6 whitespace-nowrap"
          >
            {isSubmitting ? "Generating Canvas..." : "Create Review Canvas"}
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </form>

        {showToast && (
          <Badge
            variant="success"
            role="status"
            className="mt-3 h-auto gap-2 px-3 py-1.5 animate-in fade-in duration-150"
          >
            <Check className="size-3.5" />
            <span>Interactive review canvas ready for {urlInput}</span>
          </Badge>
        )}

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground mt-4">
          {HERO_TRUST_POINTS.map((point) => (
            <span key={point} className="flex items-center gap-1.5">
              <Check className="size-3 text-foreground" /> {point}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Interactive Review Canvas Demonstration */}
      <div id="preview" className="pt-2">
        <HeroCanvasMockup previewUrl={urlInput} />
      </div>
    </section>
  )
}
