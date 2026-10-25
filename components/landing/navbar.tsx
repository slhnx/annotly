"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, X, ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NavbarProps {
  onCtaClick?: () => void
}

export function Navbar({ onCtaClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Workflow", href: "#workflow" },
    { label: "Features", href: "#features" },
    { label: "Before & After", href: "#before-after" },
    { label: "FAQ", href: "#faq" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md transition-all">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-8 rounded-[6px] bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-transform group-hover:scale-[1.02]">
            A
          </div>
          <span className="font-heading font-semibold text-lg tracking-[-0.5px] text-foreground">
            Annotly
          </span>
          <Badge variant="pill" className="hidden sm:inline-flex text-[11px] font-normal py-0">
            Preview
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Log In
          </Link>
          <Button
            variant="default"
            size="sm"
            onClick={onCtaClick}
            className="shadow-[rgba(255,255,255,0.2)_0px_0.5px_0px_0px_inset,rgba(0,0,0,0.2)_0px_0px_0px_0.5px_inset,rgba(0,0,0,0.05)_0px_1px_2px_0px]"
          >
            Start Free Trial
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-6 py-5 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={buttonVariants({ variant: "outline", size: "sm", className: "w-full justify-center" })}
            >
              Log In
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false)
                if (onCtaClick) onCtaClick()
              }}
              className="w-full justify-center"
            >
              Start Free Trial
              <ArrowRight className="size-3.5 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
