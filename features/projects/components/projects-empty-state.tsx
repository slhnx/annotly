"use client"

import { FolderKanban, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ProjectsEmptyStateProps {
  isFiltered: boolean
  onResetFilters: () => void
  onCreate: () => void
}

export function ProjectsEmptyState({
  isFiltered,
  onResetFilters,
  onCreate,
}: ProjectsEmptyStateProps) {
  return (
    <Card className="items-center gap-0 p-12 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <FolderKanban className="size-6" />
      </div>
      <h3 className="font-heading text-base font-bold text-foreground">
        {isFiltered ? "No matching projects found" : "No projects in workspace"}
      </h3>
      <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
        {isFiltered
          ? "Try adjusting your search keywords or clearing your status filters."
          : "Get started by generating your first live website review canvas."}
      </p>

      <div className="mt-5 flex items-center justify-center gap-2">
        {isFiltered ? (
          <Button variant="outline" size="sm" onClick={onResetFilters} className="gap-1.5 text-xs font-semibold">
            <RotateCcw className="size-3.5" />
            <span>Reset Filters</span>
          </Button>
        ) : (
          <Button size="sm" onClick={onCreate} className="gap-1.5 px-3.5 text-xs font-semibold">
            <Plus className="size-3.5" />
            <span>Create First Project</span>
          </Button>
        )}
      </div>
    </Card>
  )
}
