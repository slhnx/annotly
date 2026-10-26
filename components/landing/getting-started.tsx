"use client"

import React from "react"
import { ArrowRight, Sparkles, Check, Globe } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function GettingStarted() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 px-6 max-w-[1280px] mx-auto border-t border-border">
      {/* Eyebrow & Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-medium text-foreground/80 shadow-xs mb-4">
          <Sparkles className="size-3.5 text-foreground" />
          <span>Frictionless Setup</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-1.5px] lg:tracking-[-2px] text-foreground mb-4 leading-tight">
          Start reviewing in three simple steps.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
          No complex software to configure. No client training manuals. Up and running in under a minute.
        </p>
      </div>

      {/* 3 Step Columns matching Inspiration Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {/* STEP 1: INPUT */}
        <div className="space-y-4">
          {/* Top Step Label */}
          <div className="text-xs font-mono font-medium tracking-widest text-muted-foreground uppercase">
            STEP 1 — PASTE URL
          </div>

          {/* Tactile Preview Card */}
          <div className="relative rounded-[22px] sm:rounded-[26px] bg-[#fcfbf8] dark:bg-[#181716] border border-[#eceae4] dark:border-white/10 p-5 sm:p-6 min-h-[195px] flex flex-col justify-between shadow-xs transition-all hover:border-foreground/20">
            {/* Top User Row */}
            <div className="flex items-center gap-3">
              <Avatar className="size-8 rounded-full border border-border shadow-xs">
                <AvatarFallback className="text-[11px] font-semibold bg-muted text-foreground">
                  AC
                </AvatarFallback>
              </Avatar>
              <div className="text-xs font-mono text-muted-foreground">
                <span className="font-semibold text-foreground">alex</span> · agency lead
              </div>
            </div>

            {/* Prompt / URL Box */}
            <div className="space-y-1.5 py-2">
              <div className="p-2.5 rounded-xl bg-muted/60 border border-border text-xs font-mono text-foreground font-medium flex items-center gap-2">
                <Globe className="size-3.5 text-muted-foreground shrink-0" />
                <span className="truncate">https://staging.nordicstudio.com</span>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono leading-relaxed pl-1">
                Auto-generates proxy canvas for mobile, tablet, and desktop.
              </p>
            </div>

            {/* Bottom Row with Launch Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-mono text-muted-foreground">Ready in 5s</span>
              <div className="size-8 rounded-full bg-[#1c1c1c] dark:bg-white text-[#fcfbf8] dark:text-[#1c1c1c] flex items-center justify-center shadow-xs transition-transform hover:scale-105 cursor-pointer">
                <ArrowRight className="size-3.5" />
              </div>
            </div>
          </div>

          {/* Bottom Content: Title & Subtitle */}
          <div className="space-y-1 pt-1">
            <h3 className="font-heading font-semibold text-xl text-foreground tracking-tight">
              Plain website URL in
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No code, no ticket queue. Works on Webflow, Vercel, Shopify, or custom stack.
            </p>
          </div>
        </div>

        {/* STEP 2: CONNECT / SHARE */}
        <div className="space-y-4">
          {/* Top Step Label */}
          <div className="text-xs font-mono font-medium tracking-widest text-muted-foreground uppercase">
            STEP 2 — SHARE
          </div>

          {/* Tactile Preview Card */}
          <div className="relative rounded-[22px] sm:rounded-[26px] bg-[#fcfbf8] dark:bg-[#181716] border border-[#eceae4] dark:border-white/10 p-5 sm:p-6 min-h-[195px] flex flex-col justify-between shadow-xs transition-all hover:border-foreground/20">
            {/* Live Connection List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 font-medium text-foreground">
                  <div className="size-5 rounded bg-black/5 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold">▲</div>
                  <span>Vercel Staging v2.4</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>connected</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 font-medium text-foreground">
                  <div className="size-5 rounded bg-blue-500/10 text-blue-600 flex items-center justify-center text-[10px] font-bold">⚡</div>
                  <span>Guest Review Link</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>zero-install</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 font-medium text-foreground">
                  <div className="size-5 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[10px] font-bold">✓</div>
                  <span>CSP Framing Safe</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>bypassed</span>
                </div>
              </div>
            </div>

            {/* Bottom Footnote */}
            <div className="pt-2 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
              + Unlimited reviewer seats available
            </div>
          </div>

          {/* Bottom Content: Title & Subtitle */}
          <div className="space-y-1 pt-1">
            <h3 className="font-heading font-semibold text-xl text-foreground tracking-tight">
              Your live site, not a copy
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clients open the private link and comment immediately. Zero Chrome extensions.
            </p>
          </div>
        </div>

        {/* STEP 3: SHIP / RESOLVE */}
        <div className="space-y-4">
          {/* Top Step Label */}
          <div className="text-xs font-mono font-medium tracking-widest text-muted-foreground uppercase">
            STEP 3 — RESOLVE
          </div>

          {/* Tactile Preview Card */}
          <div className="relative rounded-[22px] sm:rounded-[26px] bg-[#fcfbf8] dark:bg-[#181716] border border-[#eceae4] dark:border-white/10 p-5 sm:p-6 min-h-[195px] flex flex-col justify-between shadow-xs transition-all hover:border-foreground/20">
            {/* Roles and Permissions List */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <Avatar className="size-5 rounded-full border border-background">
                      <AvatarFallback className="text-[9px] bg-emerald-100 text-emerald-800">ER</AvatarFallback>
                    </Avatar>
                    <Avatar className="size-5 rounded-full border border-background">
                      <AvatarFallback className="text-[9px] bg-blue-100 text-blue-800">MV</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-medium text-foreground text-xs">Client reviewers</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/25">
                  Can comment
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <Avatar className="size-5 rounded-full border border-background">
                      <AvatarFallback className="text-[9px] bg-purple-100 text-purple-800">AC</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-medium text-foreground text-xs">Agency team</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 font-semibold border border-blue-500/25">
                  Can resolve
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <Avatar className="size-5 rounded-full border border-background">
                      <AvatarFallback className="text-[9px] bg-gray-200 text-gray-700">EXT</AvatarFallback>
                    </Avatar>
                  </div>
                  <span className="font-medium text-foreground text-xs">Public visitors</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold border border-border">
                  No access
                </span>
              </div>
            </div>

            {/* Bottom Verification Line */}
            <div className="pt-2 border-t border-border/40 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
              <Check className="size-3 text-emerald-600" />
              <span>100% element-anchored to DOM rect</span>
            </div>
          </div>

          {/* Bottom Content: Title & Subtitle */}
          <div className="space-y-1 pt-1">
            <h3 className="font-heading font-semibold text-xl text-foreground tracking-tight">
              Shipped inside the rules
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Shared only with the right people. 1-click resolve with commit tags.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
