"use client"

import Link from "next/link"
import { Globe, MessageSquare } from "lucide-react"
import { ProjectActionsMenu } from "./project-actions-menu"
import { OpenCanvasButton, ShareLinkButton } from "./project-link-buttons"
import { ProjectStatusBadge } from "./project-status-badge"
import type { Project } from "../types"

interface ProjectRowProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectRow({ project, onEdit, onDelete }: ProjectRowProps) {
  const { summary } = project

  return (
    <div className="flex flex-col justify-between gap-3 border-b border-border p-4 transition-colors last:border-b-0 hover:bg-accent/40 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-sans text-sm font-semibold text-foreground">
            <Link
              href={`/dashboard/projects/${project.id}`}
              className="hover:underline hover:text-foreground"
            >
              {project.name}
            </Link>
          </h3>
          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-[220px] items-center gap-1 truncate hover:text-foreground"
          >
            <Globe className="size-3 shrink-0" />
            <span className="truncate">{project.websiteUrl.replace(/^https?:\/\//, "")}</span>
          </a>

          <span aria-hidden="true">•</span>

          <span className="inline-flex items-center gap-1">
            <MessageSquare className="size-3 shrink-0 text-warning" />
            <span>
              <strong className="text-foreground">{summary.openComments}</strong> open /{" "}
              {summary.totalComments} comments
            </span>
          </span>

          <span aria-hidden="true" className="hidden md:inline">
            •
          </span>

          <span className="hidden text-[11px] md:inline">
            Updated {new Date(summary.lastActivityAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <ShareLinkButton
          reviewUrl={project.reviewUrl}
          label="Share"
          labelClassName="sr-only sm:not-sr-only"
          className="gap-1 text-xs font-semibold"
        />
        <OpenCanvasButton
          reviewUrl={project.reviewUrl}
          className="gap-1 text-xs font-semibold"
        />
        <ProjectActionsMenu project={project} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  )
}
