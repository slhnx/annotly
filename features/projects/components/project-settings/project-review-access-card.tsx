"use client"

import * as React from "react"
import { Link2 } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProjectFilterSelect } from "../project-filter-select"
import { ProjectCopyUrlField } from "./project-copy-url-field"
import { ProjectRegenerateLinkSection } from "./project-regenerate-link-section"
import { updateProjectAction, regenerateReviewLinkAction } from "../../actions"
import type { Project, ReviewAccess } from "../../types"

interface ProjectReviewAccessCardProps {
  project: Project
}

const ACCESS_OPTIONS: Record<ReviewAccess, string> = {
  public: "Public Access (Anyone with review link can view & comment)",
  paused: "Review Paused (Link is disabled; canvas cannot be loaded)",
}

export function ProjectReviewAccessCard({ project }: ProjectReviewAccessCardProps) {
  const [access, setAccess] = React.useState<ReviewAccess>(project.reviewAccess || "public")
  const [reviewUrl, setReviewUrl] = React.useState(project.reviewUrl)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const fullUrl = React.useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${reviewUrl}`
    }
    return reviewUrl
  }, [reviewUrl])

  const handleAccessChange = async (newAccess: ReviewAccess) => {
    setAccess(newAccess)
    setLoading(true)
    setError(null)
    try {
      const res = await updateProjectAction(project.id, { reviewAccess: newAccess })
      if (!res.success) setError(res.error || "Failed to update review access.")
      else {
        setSuccessMsg(`Review access set to ${newAccess === "public" ? "Public" : "Paused"}.`)
        setTimeout(() => setSuccessMsg(null), 3000)
      }
    } catch {
      setError("Failed to update access.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await regenerateReviewLinkAction(project.id)
      if (res.success && res.data) {
        setReviewUrl(res.data.reviewUrl)
        setSuccessMsg("Review link regenerated. Old review links are now revoked.")
        setTimeout(() => setSuccessMsg(null), 3500)
      } else {
        setError(res.error || "Failed to regenerate review link.")
      }
    } catch {
      setError("Failed to regenerate review link.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-1 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-muted text-foreground">
            <Link2 className="size-3.5" />
          </span>
          <CardTitle className="text-sm font-bold text-foreground">
            Review Access & Link Security
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Control access permissions and generate new review canvas tokens.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {successMsg && (
          <Alert className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <AlertDescription className="text-xs font-medium">{successMsg}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive">
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="review-access-mode" className="text-xs font-semibold">
            Canvas Access Status
          </Label>
          <ProjectFilterSelect
            id="review-access-mode"
            ariaLabel="Canvas access status"
            className="w-full text-xs"
            value={access}
            items={ACCESS_OPTIONS}
            onValueChange={(val) => handleAccessChange(val as ReviewAccess)}
          />
        </div>

        <ProjectCopyUrlField url={fullUrl} />

        <ProjectRegenerateLinkSection
          loading={loading}
          onRegenerate={handleRegenerate}
        />
      </CardContent>
    </Card>
  )
}
