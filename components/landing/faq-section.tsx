"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Plus, X, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FaqItem {
  q: string
  a: string
}

export function FaqSection() {
  // First item open by default just like in the inspiration screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  const faqs: FaqItem[] = [
    {
      q: "What is Annotly and how does zero-install visual review work?",
      a: "Traditional feedback loops force reviewers to take screenshots, draw red arrows, and paste them into fragmented Slack threads or emails. Annotly lets you paste any live website URL to generate an interactive review canvas with shareable links. Reviewers click directly on live webpage elements to leave anchored pins with automatic technical context (viewport, browser, OS, and timestamp). Clients and external stakeholders do not need to install browser extensions or create accounts.",
    },
    {
      q: "How do pins stay aligned when the browser window resizes or text reflows?",
      a: "Annotly does not rely on fragile absolute pixel coordinates. When a reviewer clicks an element, the Annotly bridge calculates element-relative percentage offsets (OffsetX = (clickX - rect.left) / rect.width * 100) and captures 5-tier resilient CSS selectors. Even when responsive layout columns stack or fonts reflow, the pin remains precisely anchored to the element across viewports.",
    },
    {
      q: "Do clients or guest reviewers need passwords or browser extensions?",
      a: "No! External clients and reviewers never need to download Chrome extensions or create passwords. They simply open your shareable review link, enter their name or email, and start clicking anywhere on the page to leave feedback immediately. Frictionless guest commenting reduces review turnaround from days to minutes.",
    },
    {
      q: "How does Annotly handle websites with strict framing or CSP restrictions?",
      a: "Target websites frequently enforce 'X-Frame-Options: DENY' and Content-Security-Policy 'frame-ancestors'. Annotly handles upstream requests through a dedicated Next.js reverse proxy route with built-in SSRF protection, safely stripping clickjacking headers while injecting the client review bridge script.",
    },
    {
      q: "Does Annotly capture screenshots automatically with each comment?",
      a: "Yes. At the exact millisecond a pin is placed, Annotly rasterizes a fast in-browser client-side HTML5 canvas snapshot of the element and surrounding viewport. Developers can see both the live interactive pin on the current page and the visual snapshot recorded at the time of comment creation.",
    },
    {
      q: "Can I use Annotly with staging environments, Vercel previews, or Webflow sites?",
      a: "Yes. Annotly works seamlessly with public URLs, Vercel and Netlify preview deployments, Webflow staging links, Shopify stores, and staging environments behind HTTP basic authentication.",
    },
    {
      q: "How does team collaboration and resolving comments work?",
      a: "Each review canvas has threaded commenting, image attachments, and 1-click status toggles ('In Review', 'Resolved'). Once code updates are deployed, developers mark the pin resolved and clients receive instant visual confirmation on the live canvas.",
    },
    {
      q: "What is included in the 14-day free trial?",
      a: "The 14-day free trial gives you full access to unlimited review projects, guest reviewer access, DOM-anchored pins, and automatic technical diagnostics. No credit card is required to get started.",
    },
  ]

  return (
    <section id="faq" className="py-24 sm:py-32 px-6 max-w-[1280px] mx-auto border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Eyebrow, Editorial Heading, and Custom Contact Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          {/* Eyebrow Badge with Glowing Accent Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-card text-xs font-medium text-foreground/80 shadow-xs">
            <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Frequently Asked Questions</span>
          </div>

          {/* Display Heading (Bricolage Grotesque per DESIGN.md) */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-1.8px] lg:tracking-[-2.4px] text-foreground leading-[1.06]">
            Answers to Your Questions About Annotly
          </h2>

          {/* Contact Support Callout Card in Accent Color (#ede7dc) */}
          <div className="relative rounded-[24px] sm:rounded-[28px] bg-[#ede7dc] dark:bg-[#201f1d] border border-foreground/[0.06] dark:border-white/[0.06] p-7 sm:p-8 space-y-5 overflow-hidden shadow-none">
            {/* Subtle Tactile Grain Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 space-y-4">
              <p className="text-sm sm:text-base text-foreground/85 font-medium leading-relaxed">
                Have more questions for us? Our team can help you out. Get in touch with us!
              </p>

              <Link href="mailto:hello@annotly.xyz" className="inline-block">
                <Button
                  variant="default"
                  className="bg-white hover:bg-white/95 text-[#1c1c1c] font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-[rgba(0,0,0,0.06)_0px_2px_8px_0px] cursor-pointer inline-flex items-center gap-1.5 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="size-3.5 opacity-70" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Stacked Individual FAQ Cards */}
        <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className={cn(
                  "rounded-[20px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "bg-[#fcfbf8] dark:bg-[#181716] border-foreground/20 dark:border-white/20 shadow-xs"
                    : "bg-[#fcfbf8] dark:bg-[#181716] border-border hover:border-foreground/15 dark:hover:border-white/15"
                )}
              >
                {/* Header Row: Question & Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer select-none group"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading font-semibold text-base sm:text-lg text-foreground leading-snug group-hover:text-foreground/80 transition-colors pr-2">
                    {faq.q}
                  </span>

                  {/* Right Square/Pill Toggle Button */}
                  <div
                    className={cn(
                      "size-9 sm:size-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5",
                      isOpen
                        ? "bg-foreground text-background border-foreground shadow-xs"
                        : "bg-muted/50 border-border text-foreground/70 group-hover:bg-muted group-hover:text-foreground"
                    )}
                  >
                    {isOpen ? (
                      <X className="size-4 transition-transform duration-200" />
                    ) : (
                      <Plus className="size-4 transition-transform duration-200" />
                    )}
                  </div>
                </button>

                {/* Collapsible Answer Body */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out px-6 sm:px-7",
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-6 sm:pb-7" : "grid-rows-[0fr] opacity-0 pb-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pt-2 border-t border-border/50 text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
