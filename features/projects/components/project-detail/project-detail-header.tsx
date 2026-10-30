"use client"

import Link from "next/link"
import { ExternalLink, Globe, Settings, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectStatusBadge } from "../project-status-badge"
import type { Project } from "../../types"

interface ProjectDetailHeaderProps {
  project: Project
}

export function ProjectDetailHeader({ project }: ProjectDetailHeaderProps) {
  const domain = project.websiteUrl.replace(/^https?:\/\//, "").split("/")[0]
  const monogram = (project.name[0] || "P").toUpperCase()

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-sm">
          {monogram}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {project.name}
            </h1>
            <ProjectStatusBadge status={project.status} />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground hover:underline"
            >
              <Globe className="size-3 text-muted-foreground" />
              <span>{domain}</span>
              <ExternalLink className="size-2.5 opacity-70" />
            </a>
            {project.description && (
              <>
                <span aria-hidden="true">•</span>
                <span className="line-clamp-1 max-w-md">{project.description}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-start sm:self-center">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs font-semibold"
          nativeButton={false}
          render={<Link href={`/dashboard/projects/${project.id}/settings`} />}
        >
          <Settings className="size-3.5" />
          <span>Project Settings</span>
        </Button>

        <Button
          size="sm"
          className="gap-1.5 text-xs font-semibold"
          nativeButton={false}
          render={<Link href={project.reviewUrl} target="_blank" rel="noopener noreferrer" />}
        >
          <Sparkles className="size-3.5" />
          <span>Open Review Canvas</span>
        </Button>
      </div>
    </div>
  )
}
