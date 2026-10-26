"use client"

import React, { useRef } from "react"
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { StoryProgression } from "@/components/landing/story-progression"
import { WorkflowChapters } from "@/components/landing/workflow-chapters"
import { FeatureShowcase } from "@/components/landing/feature-showcase"
import { BeforeAfter } from "@/components/landing/before-after"
import { UseCases } from "@/components/landing/use-cases"
import { GettingStarted } from "@/components/landing/getting-started"
import { FaqSection } from "@/components/landing/faq-section"
import { FinalCta } from "@/components/landing/final-cta"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)

  const scrollToHeroCta = () => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/10 selection:text-primary">
      {/* 1. Navigation */}
      <Navbar onCtaClick={scrollToHeroCta} />

      <main className="flex-1">
        {/* 2. Hero Section with Interactive Review Canvas */}
        <div ref={heroRef}>
          <Hero />
        </div>

        {/* 3. Problem and Pain Points (Aviary-style day-by-day story) */}
        <StoryProgression />

        {/* 4. The Annotly Workflow (Interactive 3-Chapter Showcase) */}
        <WorkflowChapters />

        {/* 5. Deep Feature Demonstrations */}
        <FeatureShowcase />

        {/* 6. Before and After Split Comparison */}
        <BeforeAfter />

        {/* 7. Use Cases for Agencies, Freelancers, Product & Marketing Teams */}
        <UseCases />

        {/* 8. 3 Steps to Getting Started */}
        <GettingStarted />

        {/* 9. Frequently Asked Questions (Accessible Accordion) */}
        <FaqSection />

        {/* 10. Final Conversion-Focused Call to Action */}
        <FinalCta onStartReview={scrollToHeroCta} />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  )
}
