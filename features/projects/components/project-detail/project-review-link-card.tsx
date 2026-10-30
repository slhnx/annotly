"use client"

import * as React from "react"
import Link from "next/link"
import { Check, Copy, ExternalLink, Link2, PauseCircle } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "../../types"

interface ProjectReviewLinkCardProps {
  project: Project
}

export function ProjectReviewLinkCard({ project }: ProjectReviewLinkCardProps) {
  const [copied, setCopied] = React.useState(false)

  const fullReviewUrl = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${project.reviewUrl}`
    }
    return project.reviewUrl
  }, [project.reviewUrl])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullReviewUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API blocked
    }
  }

  const isPaused = project.reviewAccess === "paused"

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-1 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-muted text-foreground">
              <Link2 className="size-3.5" />
            </span>
            <CardTitle className="text-sm font-bold text-foreground">
              Shareable Review Canvas Link
            </CardTitle>
          </div>
          <Badge
            variant={isPaused ? "destructive" : "outline"}
            className="text-[10px] uppercase font-semibold"
          >
            {isPaused ? (
              <span className="flex items-center gap-1">
                <PauseCircle className="size-3" />
                Review Paused
              </span>
            ) : (
              "Public Access"
            )}
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Reviewers can point, click, and leave anchored annotations directly on the live website without installing extensions or creating accounts.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              readOnly
              value={fullReviewUrl}
              aria-label="Shareable review URL"
              className="h-9 w-full rounded-md border border-border bg-muted/40 px-3 font-mono text-xs text-foreground select-all focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="gap-1.5 text-xs font-semibold"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              className="gap-1.5 text-xs font-semibold"
              nativeButton={false}
              render={<Link href={project.reviewUrl} target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink className="size-3.5" />
              <span>Launch</span>
            </Button>
          </div>
        </div>

        {isPaused && (
          <p className="text-[11px] font-medium text-destructive">
            Review is currently paused. Reviewers visiting this link will see a paused notice until re-enabled in project settings.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
