"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Sparkles, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/lib/auth/queries"

interface FinalCtaProps {
  onStartReview?: (url: string) => void
}

export function FinalCta({ onStartReview }: FinalCtaProps) {
  const { data: user } = useCurrentUser()
  const isLoggedIn = Boolean(user)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState("https://yourclient.com")
  const [submitted, setSubmitted] = useState(false)

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      if (onStartReview) onStartReview(urlInput)
    }, 350)
  }

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      <div className="max-w-[1240px] mx-auto">
        {/* Main Inset Card Container with Accent Color (#ede7dc) and No Drop Shadow */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#ede7dc] dark:bg-[#201f1d] text-foreground overflow-hidden border border-foreground/[0.06] dark:border-white/[0.06] shadow-none">
          {/* Subtle Tactile Grain Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* 2-Column Grid: Left text with padding, Right Mockup flush to right and bottom boundaries */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-end gap-8 lg:gap-0 pt-8 sm:pt-10 lg:pt-14 pl-6 sm:pl-10 lg:pl-14 pr-0 pb-0">
            {/* Left Column: Heading, Subhead, Button, Reassurance */}
            <div className="lg:col-span-5 flex flex-col justify-center items-start text-left space-y-5 pb-8 sm:pb-10 lg:pb-14 pr-6 sm:pr-8">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-foreground/[0.08] dark:border-white/10 bg-foreground/[0.06] dark:bg-white/[0.08] text-xs font-medium text-foreground">
                <Sparkles className="size-3.5 text-foreground" />
                <span>Zero-Install Live Canvas</span>
              </div>

              {/* Display Headline */}
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-semibold tracking-[-1.5px] lg:tracking-[-2px] text-foreground leading-[1.08]">
                Take your website reviews to the next level!
              </h2>

              {/* Subhead - Shortened and concise */}
              <p className="text-sm sm:text-base md:text-lg text-foreground/75 max-w-md leading-relaxed font-normal">
                Drop element-anchored pins directly on live websites. Zero extensions to install, instant client sign-off.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link href={isLoggedIn ? "/dashboard" : "/register"} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="h-12 sm:h-13 px-8 rounded-full text-sm sm:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.08)_0px_2px_4px_0px] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group w-full sm:w-auto"
                  >
                    <span>{isLoggedIn ? "Go to Dashboard" : "Start 14-day free trial"}</span>
                    <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => setShowUrlInput((prev) => !prev)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-foreground/[0.06] transition-colors border border-foreground/15 cursor-pointer"
                >
                  <Globe className="size-3.5 text-muted-foreground" />
                  <span>{showUrlInput ? "Hide URL tester" : "Test live website URL"}</span>
                </button>
              </div>

              {/* Expandable Instant URL Starter Bar */}
              {showUrlInput && (
                <form
                  onSubmit={handleUrlSubmit}
                  className="w-full max-w-md p-1.5 rounded-full border border-foreground/15 bg-background shadow-xs flex items-center gap-2 transition-all focus-within:border-foreground/35 animate-in fade-in zoom-in-95 duration-200"
                >
                  <div className="relative flex-1">
                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://yourclient.com"
                      className="pl-10 h-10 border-transparent bg-transparent text-xs sm:text-sm text-foreground focus-visible:ring-0 focus-visible:shadow-none placeholder:text-muted-foreground/60"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="sm"
                    className="h-10 px-5 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs cursor-pointer"
                  >
                    {submitted ? "Launching..." : "Launch Review"}
                  </Button>
                </form>
              )}

              {/* Reassurance Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-700 dark:text-emerald-400" /> 14-day free trial
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-700 dark:text-emerald-400" /> No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-3.5 text-emerald-700 dark:text-emerald-400" /> Zero extensions
                </span>
              </div>
            </div>

            {/* Right Column: Big Mockup flush against right and bottom boundaries */}
            <div className="lg:col-span-7 flex items-end justify-end self-end w-full leading-none overflow-hidden pb-0 pr-0">
              <div className="relative w-full max-w-[660px] lg:max-w-none lg:w-[108%] flex items-end justify-end translate-x-1 translate-y-1">
                <Image
                  src="/landing/cta-product-mockup.png"
                  alt="Annotly interactive review canvas mockup"
                  width={996}
                  height={659}
                  className="w-full h-auto object-contain block align-bottom select-none drop-shadow-[-8px_-6px_20px_rgba(0,0,0,0.05)]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
