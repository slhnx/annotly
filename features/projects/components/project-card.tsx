"use client"

import Link from "next/link"
import { Globe, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProjectActionsMenu } from "./project-actions-menu"
import { OpenCanvasButton, ShareLinkButton } from "./project-link-buttons"
import { ProjectStatusBadge } from "./project-status-badge"
import type { Project } from "../types"

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const { summary } = project

  return (
    <Card className="justify-between gap-0 p-5 hover:border-border-interactive">
      <div>
        <div className="flex items-center justify-between gap-2">
          <ProjectStatusBadge status={project.status} />
          <ProjectActionsMenu project={project} onEdit={onEdit} onDelete={onDelete} />
        </div>

        <div className="mt-3">
          <h3 className="truncate font-heading text-base font-bold text-foreground">
            <Link
              href={`/dashboard/projects/${project.id}`}
              className="hover:underline hover:text-foreground"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-2 min-h-8 text-xs text-muted-foreground">
            {project.description || "No description provided."}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Globe className="size-3.5 shrink-0" />
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:text-foreground hover:underline"
          >
            {project.websiteUrl.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </div>

      <Separator className="mt-5" />

      <div className="pt-4">
        <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 font-medium">
            <MessageSquare className="size-3.5 text-warning" />
            <span>
              <strong className="text-foreground">{summary.openComments}</strong> open /{" "}
              {summary.totalComments} total
            </span>
          </div>

          <span className="text-[11px]">
            {new Date(summary.lastActivityAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ShareLinkButton
            reviewUrl={project.reviewUrl}
            label="Share Link"
            className="gap-1.5 text-xs font-semibold"
          />
          <OpenCanvasButton
            reviewUrl={project.reviewUrl}
            className="gap-1.5 text-xs font-semibold"
          />
        </div>
      </div>
    </Card>
  )
}
