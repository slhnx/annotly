import React from "react"
import Image from "next/image"
import {
  MousePointerClick,
  Layers,
  Camera,
  Smartphone,
  CheckCircle2,
  Sparkles,
} from "lucide-react"

export function FeatureShowcase() {
  const features = [
    {
      icon: MousePointerClick,
      title: "Element-Relative Percentage Pins",
      badge: "Anti-Drift Math",
      description:
        "Pins anchor to element-relative percentages, not raw pixels. They stay locked in place when layouts reflow, columns stack, or fonts load.",
      highlight: "Guaranteed alignment across dynamic screens",
      image: "/landing/pin-coordinate-math.jpg",
    },
    {
      icon: Layers,
      title: "Zero-Install Guest Mode",
      badge: "Frictionless Access",
      description:
        "Anyone with your private review link can click and comment immediately. No browser extensions to install, no passwords to create.",
      highlight: "Clients comment in seconds without accounts",
      image: "/landing/guest-access-mode.jpg",
    },
    {
      icon: Camera,
      title: "Sub-500ms In-Browser Snapshots",
      badge: "HTML5 Canvas",
      description:
        "Every pin automatically captures a fast client-side snapshot of the reviewer's screen state without slow server-rendering delays.",
      highlight: "Instant visual snapshot attached to each pin",
      image: "/landing/browser-snapshot-mode.jpg",
    },
    {
      icon: Smartphone,
      title: "Unified Multi-Device Viewports",
      badge: "1440px • 768px • 375px",
      description:
        "Switch between desktop, tablet, and mobile breakpoints directly in the canvas. Test and annotate responsive layout bugs in one place.",
      highlight: "Inspect and annotate every responsive breakpoint",
      image: "/landing/multi-device-viewports.jpg",
    },
  ]

  return (
    <section id="features" className="py-24 px-6 max-w-[1240px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-muted-foreground mb-4 shadow-[rgba(0,0,0,0.02)_0px_1px_2px_0px]">
          <Sparkles className="size-3.5 text-foreground" />
          <span>Engineered for Precision</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-4 leading-tight">
          Built specifically for how modern websites are engineered.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Deep DOM intelligence that handles responsive layouts, client access, and real staging environments.
        </p>
      </div>

      {/* 2x2 Feature Grid with Soft Accent Background & Overhanging Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feat) => {
          const Icon = feat.icon
          return (
            <div
              key={feat.title}
              className="group relative rounded-[28px] sm:rounded-[32px] bg-[#ede7dc] dark:bg-[#201f1d] text-foreground overflow-hidden pt-7 px-6 sm:pt-9 sm:px-8 pb-0 flex flex-col justify-between border-0 shadow-none transition-all duration-300"
            >
              {/* Tactile Noisy Grain Texture Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.045] mix-blend-multiply dark:mix-blend-overlay z-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Card Header & Text (Positioned Above Image) */}
              <div className="relative z-10 space-y-3">
                {/* Icon & Badge Row */}
                <div className="flex items-center justify-between">
                  <div className="size-11 rounded-[8px] bg-foreground/[0.06] dark:bg-white/[0.08] text-foreground flex items-center justify-center border border-foreground/[0.08] dark:border-white/10 shadow-xs">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-foreground/[0.06] dark:bg-white/[0.08] border border-foreground/[0.08] dark:border-white/10 text-[11px] font-mono font-medium text-foreground/85">
                    {feat.badge}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl font-semibold tracking-[-0.6px] text-foreground leading-tight pt-1">
                  {feat.title}
                </h3>

                {/* Shortened, concise description in short sentences */}
                <p className="text-xs sm:text-sm text-foreground/75 dark:text-[#eceae4]/70 leading-relaxed">
                  {feat.description}
                </p>

                {/* Highlight Checkmark */}
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-400 pt-0.5">
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{feat.highlight}</span>
                </div>
              </div>

              {/* Bottom Center Device Mockup Frame: Positioned a little bit below the bottom of the card */}
              <div className="relative z-10 w-full mt-7 px-2 sm:px-6 -mb-8 sm:-mb-12">
                <div className="relative w-full aspect-[16/11] rounded-t-[22px] sm:rounded-t-[26px] overflow-hidden border-t-2 border-x-2 border-foreground/15 dark:border-white/15 bg-[#1c1c1c] shadow-[rgba(0,0,0,0.12)_0px_12px_32px_0px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:-translate-y-1">
                  <Image
                    src={feat.image}
                    alt={feat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
