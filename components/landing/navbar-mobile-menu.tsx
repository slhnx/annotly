"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Menu } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_LINKS } from "@/components/landing/navbar.data"

interface NavbarMobileMenuProps {
  isLoggedIn: boolean
  onCtaClick?: () => void
}

export function NavbarMobileMenu({ isLoggedIn, onCtaClick }: NavbarMobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" />}
        aria-label="Toggle navigation menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="px-0">
        <SheetHeader className="px-6">
          <SheetTitle>Annotly</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate to a section of the page or sign in.
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col gap-1 px-6">
          {NAV_LINKS.map((link) => (
            <SheetClose
              key={link.href}
              nativeButton={false}
              render={
                <a
                  href={link.href}
                  className="py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>

        <Separator />

        <div className="flex flex-col gap-2 px-6">
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className={buttonVariants({
                size: "sm",
                className: "w-full justify-center gap-1.5",
              })}
            >
              <span>Dashboard</span>
              <ArrowRight className="size-3.5" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "w-full justify-center",
                })}
              >
                Log In
              </Link>
              <Button
                size="sm"
                onClick={() => {
                  setOpen(false)
                  onCtaClick?.()
                }}
                className="w-full justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="size-3.5" />
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
