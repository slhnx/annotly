"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCurrentUser } from "@/lib/auth/queries"
import { CtaReassurance } from "./final-cta/cta-reassurance"
import { CtaUrlForm } from "./final-cta/cta-url-form"
import { GrainOverlay } from "./section-parts/grain-overlay"
import { SectionEyebrow } from "./section-parts/section-eyebrow"

interface FinalCtaProps {
  onStartReview?: (url: string) => void
}

const SUBMIT_FEEDBACK_MS = 350

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
    }, SUBMIT_FEEDBACK_MS)
  }

  return (
    <section className="relative w-full overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        <Card className="relative gap-0 rounded-[28px] border-border bg-secondary p-0 text-foreground sm:rounded-[36px]">
          <GrainOverlay />

          <div className="relative z-10 grid grid-cols-1 items-end gap-8 pt-8 pr-0 pb-0 pl-6 sm:pt-10 sm:pl-10 lg:grid-cols-12 lg:gap-0 lg:pt-14 lg:pl-14">
            <div className="flex flex-col items-start justify-center space-y-5 pr-6 pb-8 text-left sm:pr-8 sm:pb-10 lg:col-span-5 lg:pb-14">
              <SectionEyebrow icon={Sparkles} className="text-foreground">
                Zero-Install Live Canvas
              </SectionEyebrow>

              <h2 className="font-heading text-3xl leading-[1.08] font-semibold tracking-[-1.5px] text-foreground sm:text-4xl md:text-5xl lg:text-[46px] lg:tracking-[-2px]">
                Take your website reviews to the next level!
              </h2>

              <p className="max-w-md text-sm leading-relaxed font-normal text-muted-foreground sm:text-base md:text-lg">
                Drop element-anchored pins directly on live websites. Zero extensions to install, instant client sign-off.
              </p>

              <div className="flex w-full flex-col items-stretch gap-3 pt-2 sm:w-auto sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href={isLoggedIn ? "/dashboard" : "/register"} />}
                  className="h-12 w-full rounded-full px-8 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] sm:h-13 sm:w-auto sm:text-base"
                >
                  <span>{isLoggedIn ? "Go to Dashboard" : "Start 14-day free trial"}</span>
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover/button:translate-x-1" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUrlInput((prev) => !prev)}
                  aria-expanded={showUrlInput}
                  className="h-auto gap-2 rounded-full px-4 py-3 text-xs text-foreground/80 hover:text-foreground"
                >
                  <Globe className="size-3.5 text-muted-foreground" />
                  <span>{showUrlInput ? "Hide URL tester" : "Test live website URL"}</span>
                </Button>
              </div>

              {showUrlInput && (
                <CtaUrlForm
                  value={urlInput}
                  submitted={submitted}
                  onChange={setUrlInput}
                  onSubmit={handleUrlSubmit}
                />
              )}

              <CtaReassurance />
            </div>

            <div className="flex w-full items-end justify-end self-end overflow-hidden pr-0 pb-0 leading-none lg:col-span-7">
              <div className="relative flex w-full max-w-[660px] translate-x-1 translate-y-1 items-end justify-end lg:w-[108%] lg:max-w-none">
                <Image
                  src="/landing/cta-product-mockup.png"
                  alt="Annotly interactive review canvas mockup"
                  width={996}
                  height={659}
                  className="block h-auto w-full object-contain align-bottom select-none drop-shadow-sm"
                  priority
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
