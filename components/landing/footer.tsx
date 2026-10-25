"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Copy } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => {
      setEmail("")
    }, 2000)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@annotly.xyz")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="w-full bg-background px-4 sm:px-6 lg:px-8 pt-10 pb-6 border-t border-border">
      <div className="max-w-[1360px] mx-auto">
        {/* Main Inset Card Container with Primary Color Background & Grain */}
        <div className="relative rounded-[28px] sm:rounded-[36px] bg-[#1c1c1c] text-[#fcfbf8] overflow-hidden p-8 sm:p-12 lg:p-16 pb-0 sm:pb-0 lg:pb-0 border-0 shadow-none flex flex-col justify-between">
          {/* Subtle Tactile Noisy Grain Texture Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Subtle Ambient Radial Light at Top */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          {/* Top Columns Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Let's talk & Direct Email */}
            <div className="md:col-span-5 space-y-3">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-1.2px] text-[#fcfbf8] leading-tight">
                Let&apos;s talk
              </h2>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="group inline-flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-[#fcfbf8]/90 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-white transition-colors">
                    hello@annotly.xyz
                  </span>
                  {copied ? (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-normal no-underline ml-1">
                      <Check className="size-3.5" /> Copied
                    </span>
                  ) : (
                    <Copy className="size-4 opacity-0 group-hover:opacity-60 transition-opacity ml-1" />
                  )}
                </button>
              </div>
              <p className="text-xs sm:text-sm text-[#eceae4]/60 pt-2 max-w-sm leading-relaxed">
                Have questions about custom agency deployments, reverse proxy hardening, or integrations? We&apos;d love to chat.
              </p>
            </div>

            {/* Middle Column: Contact & Follow */}
            <div className="md:col-span-3 space-y-8">
              {/* Contact Sub-section */}
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#b8b5ac] mb-2 font-semibold">
                  Contact
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="text-[#eceae4]/60">Global Enquiries</div>
                  <a
                    href="mailto:hello@annotly.xyz"
                    className="text-[#fcfbf8] hover:underline underline-offset-4 font-medium transition-colors"
                  >
                    hello@annotly.xyz
                  </a>
                </div>
              </div>

              {/* Follow Sub-section */}
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-[#b8b5ac] mb-2 font-semibold">
                  Follow
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fcfbf8]/80 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-xs opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                      <span>X (Twitter)</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fcfbf8]/80 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-xs opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#fcfbf8]/80 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <span className="text-xs opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                      <span>GitHub</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Newsletter */}
            <div className="md:col-span-4 space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-[#b8b5ac] mb-2 font-semibold">
                Newsletter
              </div>
              <p className="text-xs sm:text-sm text-[#eceae4]/70 leading-relaxed max-w-sm">
                Sign up for our newsletter about designing visual review loops that keep teams moving.
              </p>

              {/* Minimalist Single-Line Form */}
              <form onSubmit={handleNewsletter} className="pt-3 max-w-sm">
                <div className="relative border-b border-[#eceae4]/30 pb-2.5 flex items-center justify-between group focus-within:border-white transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    required
                    className="w-full bg-transparent text-sm text-[#fcfbf8] placeholder:text-[#eceae4]/40 focus:outline-none pr-8"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-0 text-[#fcfbf8]/70 hover:text-white transition-all hover:translate-x-1 cursor-pointer"
                  >
                    {subscribed ? (
                      <Check className="size-4 text-emerald-400" />
                    ) : (
                      <ArrowRight className="size-4" />
                    )}
                  </button>
                </div>
                {subscribed && (
                  <p className="text-[11px] text-emerald-400 mt-2 font-mono">
                    ✓ You&apos;re subscribed to Annotly updates.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Massive Brand Wordmark */}
          <div className="relative z-10 w-full select-none pointer-events-none overflow-hidden pt-16 sm:pt-24 lg:pt-32">
            <svg
              viewBox="0 0 1000 200"
              className="w-full h-auto max-h-[260px] translate-y-2 sm:translate-y-3"
              preserveAspectRatio="xMidYBottom meet"
            >
              <text
                x="50%"
                y="94%"
                textAnchor="middle"
                className="font-heading font-extrabold tracking-[-0.04em]"
                fontSize="215"
                fill="#fcfbf8"
              >
                ANNOTLY
              </text>
            </svg>
          </div>
        </div>

        {/* Outer Bottom Margin Bar (Sitting on Warm Cream Background) */}
        <div className="mt-5 px-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground/80">&copy;ANNOTLY</span>
            <span>{new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span>•</span>
            <Link href="/security" className="hover:text-foreground transition-colors">
              Security
            </Link>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium normal-case">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
