"use client"

import Link from "next/link"
import { Activity, Clock, MessageSquare, Share2, Sparkles } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Project } from "../../types"

interface ProjectActivityCardProps {
  project: Project
}

export function ProjectActivityCard({ project }: ProjectActivityCardProps) {
  const hasComments = (project.summary.totalComments || 0) > 0
  const createdFormatted = new Date(project.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  const activityFormatted = new Date(project.summary.lastActivityAt).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  return (
    <Card className="border-border bg-card">
      <CardHeader className="space-y-1 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-muted text-foreground">
            <Activity className="size-3.5" />
          </span>
          <CardTitle className="text-sm font-bold text-foreground">
            Review Activity & Audit Timeline
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Recent feedback, visual canvas updates, and review session events.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/20 p-3">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="size-3" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">
                  Review Canvas Initialized
                </span>
                <span className="text-[10px] text-muted-foreground">{createdFormatted}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Target URL <span className="font-mono text-foreground">{project.websiteUrl}</span> was verified and mapped to live review canvas.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-border/70 bg-muted/20 p-3">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
              <Clock className="size-3" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">
                  Latest Review Session Pulse
                </span>
                <span className="text-[10px] text-muted-foreground">{activityFormatted}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Current canvas status is {project.status.replace("_", " ")} with {project.summary.activeReviews} active review session{project.summary.activeReviews === 1 ? "" : "s"}.
              </p>
            </div>
          </div>
        </div>

        {!hasComments ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-8 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MessageSquare className="size-5" />
            </div>
            <h4 className="mt-2 text-xs font-semibold text-foreground">
              No Feedback Comments Yet
            </h4>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              Share the review canvas link with your design team, developers, or clients to start gathering anchored visual feedback.
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-3 gap-1.5 text-xs font-semibold"
              nativeButton={false}
              render={<Link href={project.reviewUrl} target="_blank" rel="noopener noreferrer" />}
            >
              <Share2 className="size-3.5" />
              <span>Open & Leave First Pin</span>
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border border-border/70 bg-muted/20 p-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">
              {project.summary.totalComments} Total Comments Recorded
            </span>
            : {project.summary.openComments} open and {project.summary.resolvedComments} resolved across review sessions.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
