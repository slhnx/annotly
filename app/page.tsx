"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Layers,
  MessageSquare,
  MousePointerClick,
  Monitor,
  Smartphone,
  Tablet,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [urlInput, setUrlInput] = useState("https://stripe.com")

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-[6px] bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]">
              A
            </div>
            <span className="font-semibold text-lg tracking-tight text-foreground">
              Annotly
            </span>
            <Badge variant="pill" className="ml-1 text-[11px] font-normal py-0">
              v0.1 Preview
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[rgba(28,28,28,0.82)] dark:text-[rgba(247,244,237,0.82)]">
            <Link href="#features" className="hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#preview" className="hover:text-foreground transition-colors">
              Live Canvas
            </Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">
              Agency Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button variant="default" size="sm">
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-20 pb-16 px-6 max-w-[1200px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px] text-xs font-medium text-muted-foreground mb-8">
            <Sparkles className="size-3.5 text-foreground" />
            <span>Zero-install visual feedback for creative agencies</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-foreground max-w-4xl mx-auto tracking-[-1.5px] leading-[1.08] mb-6">
            Visual website feedback without the client headaches.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Paste any live website URL. Reviewers point, click on any element, and leave anchored, context-rich comments across viewports — zero extensions, zero passwords.
          </p>

          {/* Interactive URL Starter Bar */}
          <div className="max-w-xl mx-auto mb-16">
            <div className="p-2 rounded-xl border border-border bg-card shadow-[rgba(0,0,0,0.03)_0px_4px_16px_0px] flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter any website (e.g. https://yourclient.com)"
                  className="pl-9 h-11 border-border bg-background text-sm rounded-[6px]"
                />
              </div>
              <Button size="lg" className="h-11 px-6 whitespace-nowrap">
                Create Review Canvas
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Works with Staging, Vercel Previews, Webflow, Shopify, or Production sites.
            </p>
          </div>

          {/* Live Review Canvas Mockup */}
          <div id="preview" className="relative max-w-5xl mx-auto rounded-2xl border border-border bg-card p-4 shadow-[rgba(0,0,0,0.04)_0px_8px_32px_0px] overflow-hidden">
            {/* Mockup Canvas Chrome Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#eceae4] border border-[rgba(28,28,28,0.2)]" />
                <div className="size-3 rounded-full bg-[#eceae4] border border-[rgba(28,28,28,0.2)]" />
                <div className="size-3 rounded-full bg-[#eceae4] border border-[rgba(28,28,28,0.2)]" />
                <span className="font-mono text-[11px] ml-2 px-2 py-0.5 rounded bg-muted text-foreground">
                  {urlInput}
                </span>
              </div>

              {/* Viewport presets from DESIGN.md */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-[6px] border border-border">
                <button
                  type="button"
                  aria-label="Desktop preview"
                  className="p-1 rounded-[4px] bg-background text-foreground shadow-sm"
                >
                  <Monitor className="size-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Tablet preview"
                  className="p-1 rounded-[4px] text-muted-foreground hover:text-foreground"
                >
                  <Tablet className="size-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Mobile preview"
                  className="p-1 rounded-[4px] text-muted-foreground hover:text-foreground"
                >
                  <Smartphone className="size-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="pill" className="text-[11px]">
                  Comment Mode (Alt+C)
                </Badge>
              </div>
            </div>

            {/* Mockup Target Website Display with Pins */}
            <div className="relative rounded-xl border border-border bg-background p-8 min-h-[380px] text-left flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-xs mb-4">
                  Staging Environment Preview
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.9px] text-foreground mb-3 max-w-xl">
                  Modern payment infrastructure for the global internet.
                </h3>
                <p className="text-sm text-muted-foreground max-w-lg mb-6 leading-relaxed">
                  Millions of companies of all sizes use our software and APIs to accept payments, send payouts, and manage their businesses online.
                </p>
                <div className="flex gap-3">
                  <Button size="sm">Get Started</Button>
                  <Button variant="outline" size="sm">Contact Sales</Button>
                </div>
              </div>

              {/* Simulated Pin 1: Hovered & Active */}
              <div className="absolute top-24 right-24 hidden sm:block">
                <div className="relative group">
                  <div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shadow-md border-2 border-background cursor-pointer animate-pulse">
                    1
                  </div>
                  {/* Floating comment popover matching DESIGN.md */}
                  <div className="absolute top-9 -right-6 w-72 p-4 rounded-xl border border-border bg-card shadow-lg text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">Sarah Jenkins</span>
                      <span className="text-[10px] text-muted-foreground">Client • 2m ago</span>
                    </div>
                    <p className="text-foreground leading-relaxed">
                      Could we adjust this headline font size down to 32px on tablet viewports?
                    </p>
                    <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                      <Badge variant="outline" className="text-[10px] py-0">
                        Chrome 120 • macOS
                      </Badge>
                      <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                        Reply
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulated Pin 2: Resolved */}
              <div className="absolute bottom-12 right-64 hidden sm:block">
                <div className="size-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium text-xs border border-border">
                  ✓
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid with DESIGN.md Cards */}
        <section id="features" className="py-20 px-6 max-w-[1200px] mx-auto border-t border-border">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-1.2px] text-foreground mb-4">
              Engineered for feedback without friction.
            </h2>
            <p className="text-muted-foreground text-base">
              Every detail is tailored to eliminate the back-and-forth between developers, designers, and clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="size-10 rounded-[6px] bg-muted border border-border flex items-center justify-center mb-3">
                  <MousePointerClick className="size-5 text-foreground" />
                </div>
                <CardTitle>Element-Relative Pins</CardTitle>
                <CardDescription>
                  Pins store element offsets and 5-tier resilient CSS selectors, ensuring annotations never drift when screens resize or text reflows.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="size-10 rounded-[6px] bg-muted border border-border flex items-center justify-center mb-3">
                  <Layers className="size-5 text-foreground" />
                </div>
                <CardTitle>Zero-Install Guest Mode</CardTitle>
                <CardDescription>
                  Clients open a link, enter their name and email, and start commenting immediately. No browser extensions, no passwords, no onboarding barrier.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="size-10 rounded-[6px] bg-muted border border-border flex items-center justify-center mb-3">
                  <MessageSquare className="size-5 text-foreground" />
                </div>
                <CardTitle>Automatic Device Context</CardTitle>
                <CardDescription>
                  Every comment automatically captures viewport dimensions, browser version, OS, DPR, and a visual screenshot at the moment of creation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Stats Section with DESIGN.md 48px Display Numbers */}
        <section className="py-16 px-6 max-w-[1200px] mx-auto border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-1">
                &lt; 500ms
              </div>
              <div className="text-sm text-muted-foreground">
                In-browser screenshot capture speed
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-1">
                0
              </div>
              <div className="text-sm text-muted-foreground">
                Extensions or client passwords required
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-semibold tracking-[-1.2px] text-foreground mb-1">
                100%
              </div>
              <div className="text-sm text-muted-foreground">
                Live DOM element-anchored precision
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Annotly</span>
            <span>— Warm, frictionless website feedback.</span>
          </div>
          <div>
            Design system grounded in <code className="font-mono text-[11px] px-1 py-0.5 rounded bg-muted">DESIGN.md</code>
          </div>
        </div>
      </footer>
    </div>
  )
}
