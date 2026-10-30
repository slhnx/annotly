"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"
import { useGithubSignInMutation } from "@/lib/auth/queries"
import { Button } from "@/components/ui/button"
import { AuthErrorAlert } from "@/components/auth/auth-error-alert"
import { GithubMark } from "@/components/auth/github-mark"
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
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const githubMutation = useGithubSignInMutation()

  const handleGithubSignIn = () => {
    setErrorMessage(null)
    githubMutation.mutate(
      { redirectUrl },
      {
        onSuccess: (data) => {
          if (data?.url && typeof window !== "undefined") {
            window.location.assign(data.url)
          }
        },
        onError: (err) => {
          setErrorMessage(err.message || "Failed to connect to GitHub")
        },
      }
    )
  }

  const isLoading = githubMutation.isPending

  return (
    <div className="w-full space-y-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleGithubSignIn}
        disabled={isLoading}
        className={cn(
          "h-11 w-full gap-2.5 border-border bg-card text-xs font-semibold shadow-card",
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          <GithubMark />
        )}
        <span>{isLoading ? "Connecting to GitHub..." : text}</span>
      </Button>

      {errorMessage && <AuthErrorAlert>{errorMessage}</AuthErrorAlert>}
    </div>
  )
}
