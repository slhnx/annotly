"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GithubButtonProps {
  className?: string
  text?: string
  redirectUrl?: string
}

export function GithubButton({
  className,
  text = "Continue with GitHub",
  redirectUrl = "/dashboard",
}: GithubButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const handleGithubSignIn = async () => {
    try {
      setIsLoading(true)
      setErrorMessage(null)

      const supabase = createClient()
      const origin =
        typeof window !== "undefined" ? window.location.origin : ""
      const redirectTo = `${origin}/auth/callback?next=${encodeURIComponent(
        redirectUrl
      )}`

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo,
        },
      })

      if (error) {
        setErrorMessage(error.message)
        setIsLoading(false)
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to connect to GitHub"
      setErrorMessage(message)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleGithubSignIn}
        disabled={isLoading}
        className={cn(
          "relative flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-[#eceae4] bg-white px-4 text-xs font-semibold text-[#1c1c1c] shadow-[0px_1px_2px_rgba(0,0,0,0.04)] transition-all hover:bg-[#f7f5ef] hover:border-[#1c1c1c]/20 disabled:opacity-70",
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-[#1c1c1c]" />
        ) : (
          <svg
            className="h-4 w-4 shrink-0 fill-current text-[#1c1c1c]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        )}
        <span>{isLoading ? "Connecting to GitHub..." : text}</span>
      </Button>

      {errorMessage && (
        <p className="text-center text-xs text-red-600 leading-tight">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
