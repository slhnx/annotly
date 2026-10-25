import React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16 px-6 text-xs text-muted-foreground">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-7 rounded-[6px] bg-primary text-primary-foreground flex items-center justify-center font-semibold text-xs shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]">
              A
            </div>
            <span className="font-semibold text-base tracking-tight text-foreground">
              Annotly
            </span>
            <Badge variant="pill" className="text-[10px] py-0 font-normal">
              annotly.xyz
            </Badge>
          </Link>

          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
            Frictionless visual feedback and website collaboration for agencies, developers, and designers. Point, click, and resolve feedback without extensions or client accounts.
          </p>

          <div className="text-[11px] text-muted-foreground pt-2">
            Designed with warmth and restraint following the Annotly Design System.
          </div>
        </div>

        {/* Product Links */}
        <div className="md:col-span-3 space-y-3">
          <div className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">
            Product
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#workflow" className="hover:text-foreground transition-colors">
                Interactive Workflow
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-foreground transition-colors">
                Core Features
              </a>
            </li>
            <li>
              <a href="#before-after" className="hover:text-foreground transition-colors">
                Before &amp; After
              </a>
            </li>
            <li>
              <a href="#use-cases" className="hover:text-foreground transition-colors">
                Use Cases
              </a>
            </li>
          </ul>
        </div>

        {/* Resources & Architecture */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">
            Resources
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#faq" className="hover:text-foreground transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <Link href="/login" className="hover:text-foreground transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <a href="#preview" className="hover:text-foreground transition-colors">
                Live Canvas
              </a>
            </li>
          </ul>
        </div>

        {/* Legal & Status */}
        <div className="md:col-span-2 space-y-3">
          <div className="font-semibold text-foreground text-xs uppercase tracking-wider font-mono">
            Trust &amp; Legal
          </div>
          <ul className="space-y-2">
            <li>
              <span className="text-muted-foreground">Privacy Policy</span>
            </li>
            <li>
              <span className="text-muted-foreground">Terms of Service</span>
            </li>
            <li>
              <span className="text-muted-foreground">Security Overview</span>
            </li>
            <li className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Normal
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} Annotly Inc. All rights reserved.</div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Grounded in <code className="font-mono text-[10px] px-1 py-0.5 rounded bg-muted text-foreground">DESIGN.md</code></span>
          <span>•</span>
          <span>Zero-install visual collaboration</span>
        </div>
      </div>
    </footer>
  )
}
