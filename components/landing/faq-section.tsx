"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      q: "What is Annotly and how does it differ from traditional screenshot tools?",
      a: "Traditional tools force reviewers to take static screenshots, draw red arrows, and paste them into emails or Slack. Annotly lets you paste any live website URL to generate an interactive review canvas. Reviewers click directly on live webpage elements, leaving DOM-anchored pins with automatic technical context (viewport, browser, OS, and timestamp) in real time.",
    },
    {
      q: "Do my clients or external reviewers need an account or browser extension?",
      a: "No! This is one of Annotly's biggest advantages. External clients and reviewers do not need to install browser extensions or create passwords. They simply open the shareable review link, type their name and email, and start clicking anywhere on the page to leave feedback immediately.",
    },
    {
      q: "How do pins stay aligned when the browser window is resized or text reflows?",
      a: "Annotly does not rely on fragile absolute pixel coordinates. When a reviewer clicks an element, the Annotly bridge calculates element-relative percentage offsets (OffsetX = (clickX - rect.left) / rect.width * 100) and captures 5-tier resilient CSS selectors. Even when responsive layout columns stack or fonts reflow, the pin remains precisely anchored to the element.",
    },
    {
      q: "Can I use Annotly with staging environments, Vercel previews, or Webflow sites?",
      a: "Yes. Annotly handles upstream websites via a dedicated reverse proxy that safely strips 'X-Frame-Options: DENY' and CSP framing restrictions. It works seamlessly with public URLs, Vercel preview deployments, Netlify branches, Webflow staging links, Shopify stores, and password-protected environments.",
    },
    {
      q: "Does Annotly capture screenshots automatically with each comment?",
      a: "Yes. At the exact millisecond a pin is placed, Annotly generates a fast in-browser client-side HTML5 canvas snapshot of the element and surrounding viewport. Developers can see both the live interactive pin and the exact visual snapshot recorded when the feedback was created.",
    },
    {
      q: "How does sharing work and who can view comments?",
      a: "Each review canvas has a private, shareable review link. As the project owner, you can share this link with clients, internal teammates, or external contractors. Team members can reply in threads, upload attachments, and mark items resolved as code updates are deployed.",
    },
    {
      q: "Is there a free trial to test Annotly on an active client project?",
      a: "Yes. You can test Annotly on any website with a 14-day free trial. No credit card is required to create your first review canvas and invite clients.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-6 max-w-[860px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4">
          <span>Got Questions?</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Frequently asked questions.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Everything you need to know about Annotly&apos;s visual review workflow, client access, and technical architecture.
        </p>
      </div>

      {/* Accordion Component */}
      <Accordion className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-border rounded-xl bg-card px-5 py-2 transition-all hover:border-[rgba(28,28,28,0.3)] shadow-xs"
          >
            <AccordionTrigger className="text-left font-semibold text-sm sm:text-base text-foreground hover:no-underline py-3">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-1 pb-3">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
