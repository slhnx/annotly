"use client"

import React, { useState } from "react"
import { ArrowRight, Globe, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FinalCtaProps {
  onStartReview?: (url: string) => void
}

export function FinalCta({ onStartReview }: FinalCtaProps) {
  const [urlInput, setUrlInput] = useState("https://yourclient.com")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      if (onStartReview) onStartReview(urlInput)
    }, 400)
  }

  return (
    <section className="py-24 px-6 border-t border-border bg-card/40 relative overflow-hidden">
      <div className="max-w-[840px] mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-background text-xs font-medium text-muted-foreground mb-6">
          <Sparkles className="size-3.5 text-foreground" />
          <span>Frictionless Visual Reviews</span>
        </div>

        {/* Display Headline */}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-[-1.5px] text-foreground mb-5 leading-[1.08]">
          Make your next website review a little clearer.
        </h2>

        {/* Subhead */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-10">
          Keep feedback connected to the page, the element, and the conversation. Start your first review canvas in seconds.
        </p>

        {/* Interactive URL Starter Bar */}
        <div className="max-w-lg mx-auto mb-8">
          <form
            onSubmit={handleSubmit}
            className="p-1.5 sm:p-2 rounded-xl border border-border bg-background shadow-[rgba(0,0,0,0.04)_0px_4px_16px_0px] flex flex-col sm:flex-row gap-2 transition-all focus-within:shadow-[rgba(0,0,0,0.08)_0px_8px_24px_0px] focus-within:border-[rgba(28,28,28,0.4)]"
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
              size="lg"
              className="h-11 px-6 whitespace-nowrap shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]"
            >
              {submitted ? "Opening..." : "Try Annotly"}
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </form>
        </div>

        {/* Reassurance Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="size-3 text-foreground" /> 14-day free trial
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3 text-foreground" /> No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="size-3 text-foreground" /> Zero extensions to install
          </span>
        </div>
      </div>
    </section>
  )
}
