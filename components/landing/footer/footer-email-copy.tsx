"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT_EMAIL } from "./footer.data"

const COPIED_RESET_MS = 2000

export function FooterEmailCopy() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), COPIED_RESET_MS)
  }

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleCopy}
      className="group h-auto gap-2 p-0 text-left text-xl font-semibold tracking-tight text-inverse-foreground/90 hover:bg-transparent hover:text-inverse-foreground sm:text-2xl lg:text-3xl"
    >
      <span className="underline decoration-inverse-foreground/30 underline-offset-4 transition-colors group-hover:decoration-inverse-foreground">
        {CONTACT_EMAIL}
      </span>
      {copied ? (
        <span className="ml-1 inline-flex items-center gap-1 font-mono text-xs font-normal">
          <Check className="size-3.5 text-success" /> Copied
        </span>
      ) : (
        <Copy className="ml-1 size-4 opacity-0 transition-opacity group-hover:opacity-60" />
      )}
    </Button>
  )
}
