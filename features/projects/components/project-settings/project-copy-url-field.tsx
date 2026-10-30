"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface ProjectCopyUrlFieldProps {
  url: string
}

export function ProjectCopyUrlField({ url }: ProjectCopyUrlFieldProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold">Current Review Canvas URL</Label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          readOnly
          value={url}
          aria-label="Current review canvas URL"
          className="h-9 flex-1 rounded-md border border-border bg-muted/40 px-3 font-mono text-xs text-foreground select-all"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-1.5 text-xs font-semibold"
        >
          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
    </div>
  )
}
