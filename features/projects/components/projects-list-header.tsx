"use client"

import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProjectsListHeaderProps {
  projectCount: number
  onCreate: () => void
}

export function ProjectsListHeader({ projectCount, onCreate }: ProjectsListHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            Review Projects
          </h1>
          <Badge variant="muted">{projectCount}</Badge>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Manage websites, review canvas links, and active feedback discussions.
        </p>
      </div>

      <Button onClick={onCreate} className="gap-1.5 px-4 text-xs font-semibold">
        <Plus className="size-4" />
        <span>New Project</span>
      </Button>
    </div>
  )
}
