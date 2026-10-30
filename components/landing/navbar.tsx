"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"
import { NavbarMobileMenu } from "@/components/landing/navbar-mobile-menu"
import { NAV_LINKS } from "@/components/landing/navbar.data"
import { useCurrentUser } from "@/lib/auth/queries"

interface NavbarProps {
  onCtaClick?: () => void
}

export function Navbar({ onCtaClick }: NavbarProps) {
  const { data: user } = useCurrentUser()
  const isLoggedIn = Boolean(user)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md transition-all">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-8 rounded-[6px] bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm shadow-button-inset transition-transform group-hover:scale-[1.02]">
            A
          </div>
          <span className="font-heading font-semibold text-lg tracking-[-0.5px] text-foreground">
            Annotly
          </span>
          <Badge variant="pill" className="hidden sm:inline-flex text-[11px] font-normal py-0">
            Preview
          </Badge>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className={buttonVariants({ size: "sm", className: "gap-1.5" })}
            >
              <span>Dashboard</span>
              <ArrowRight className="size-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Log In
              </Link>
              <Button size="sm" onClick={onCtaClick}>
                Start Free Trial
              </Button>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-1">
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
          <NavbarMobileMenu isLoggedIn={isLoggedIn} onCtaClick={onCtaClick} />
        </div>
      </div>
    </header>
  )
}
