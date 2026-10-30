"use client"

import { LayoutGrid, List } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { ProjectViewMode } from "../constants"

interface ProjectViewToggleProps {
  value: ProjectViewMode
  onValueChange: (mode: ProjectViewMode) => void
}

export function ProjectViewToggle({ value, onValueChange }: ProjectViewToggleProps) {
  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      spacing={0}
      value={[value]}
      onValueChange={(next: string[]) => {
        // Keep exactly one mode selected: ignore the deselect event.
        const mode = next[0]
        if (mode === "grid" || mode === "list") onValueChange(mode)
      }}
      aria-label="Project view mode"
      className="h-9"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view" className="h-9">
        <LayoutGrid />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view" className="h-9">
        <List />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
