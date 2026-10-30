"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Globe, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OpenCanvasButton } from "./project-link-buttons"
import { ProjectStatusBadge } from "./project-status-badge"
import type { Project } from "../types"

interface RecentProjectsCardProps {
  projects: Project[]
}

function RecentProjectItem({ project }: { project: Project }) {
  return (
    <div className="flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-sans text-xs font-semibold text-foreground sm:text-sm">
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
            className="inline-flex max-w-[200px] items-center gap-1 truncate hover:text-foreground"
          >
            <Globe className="size-3 shrink-0" />
            <span className="truncate">{project.websiteUrl.replace(/^https?:\/\//, "")}</span>
          </a>
          <span aria-hidden="true">•</span>
          <span className="inline-flex items-center gap-1">
            <MessageSquare className="size-3 shrink-0" />
            <span>
              {project.summary.openComments} open / {project.summary.totalComments} total
            </span>
          </span>
        </div>
      </div>

      <OpenCanvasButton
        reviewUrl={project.reviewUrl}
        label="Open Canvas"
        variant="outline"
        className="gap-1.5 self-end text-xs font-semibold sm:self-center"
      />
    </div>
  )
}

export function RecentProjectsCard({ projects }: RecentProjectsCardProps) {
  const recent = projects.slice(0, 5)

  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center justify-between pb-4">
        <CardHeader className="gap-0">
          <CardTitle className="text-base tracking-tight">Recent Projects</CardTitle>
          <CardDescription className="text-xs">
            Your recently updated visual review workspaces
          </CardDescription>
        </CardHeader>
        <Button
          variant="link"
          size="sm"
          nativeButton={false}
          className="h-auto gap-1 p-0 text-xs font-semibold"
          render={<Link href="/dashboard/projects" />}
        >
          <span>View all</span>
          <ArrowRight className="size-3" />
        </Button>
      </div>

      <Separator />

      {recent.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-xs text-muted-foreground">No projects yet.</p>
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            className="mt-2 text-xs"
            render={<Link href="/dashboard/projects?action=new" />}
          >
            Create your first project
          </Button>
        </div>
      ) : (
        recent.map((project, index) => (
          <React.Fragment key={project.id}>
            {index > 0 && <Separator />}
            <RecentProjectItem project={project} />
          </React.Fragment>
        ))
      )}
    </Card>
  )
}
