"use client"

import React, { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const EMAIL_RESET_MS = 2000

export function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setTimeout(() => setEmail(""), EMAIL_RESET_MS)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm pt-3 sm:max-w-md">
      <div className="relative flex items-center">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-label="Email address"
          required
          className="h-auto rounded-none border-x-0 border-t-0 border-inverse-foreground/30 bg-transparent px-0 pt-1.5 pr-8 pb-2.5 text-sm text-inverse-foreground shadow-none placeholder:text-inverse-foreground/40 focus:border-inverse-foreground focus:shadow-none focus:ring-0"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon-sm"
          aria-label="Subscribe to newsletter"
          className="absolute right-0 text-inverse-foreground/70 hover:translate-x-1 hover:bg-transparent hover:text-inverse-foreground"
        >
          {subscribed ? (
            <Check className="size-4 text-success" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </Button>
      </div>
      {subscribed && (
        <p className="mt-2 font-mono text-[11px] text-inverse-foreground/80">
          ✓ You&apos;re subscribed to Annotly updates.
        </p>
      )}
    </form>
  )
}
