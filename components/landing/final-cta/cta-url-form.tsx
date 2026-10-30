import React from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CtaUrlFormProps {
  value: string
  submitted: boolean
  onChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function CtaUrlForm({ value, submitted, onChange, onSubmit }: CtaUrlFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-md items-center gap-2 rounded-full border border-border-interactive bg-background p-1.5 shadow-xs transition-all animate-in fade-in zoom-in-95 duration-200 focus-within:border-foreground"
    >
      <div className="relative flex-1">
        <Globe className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://yourclient.com"
          aria-label="Website URL to review"
          className="h-10 border-transparent bg-transparent pl-10 text-xs focus:shadow-none focus:ring-0 sm:text-sm"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="h-10 rounded-full px-5 text-xs font-semibold"
      >
        {submitted ? "Launching..." : "Launch Review"}
      </Button>
    </form>
  )
}
