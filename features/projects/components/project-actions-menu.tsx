"use client"

import Link from "next/link"
import { ExternalLink, LayoutDashboard, MoreVertical, Pencil, Settings, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Project } from "../types"

interface ProjectActionsMenuProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (project: Project) => void
}

export function ProjectActionsMenu({ project, onEdit, onDelete }: ProjectActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label="Project actions" />}
      >
        <MoreVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          render={<Link href={`/dashboard/projects/${project.id}`} />}
        >
          <LayoutDashboard />
          <span>Overview</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onEdit(project)}>
          <Pencil />
          <span>Quick Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          render={<Link href={`/dashboard/projects/${project.id}/settings`} />}
        >
          <Settings />
          <span>Project Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          render={
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" />
          }
        >
          <ExternalLink />
          <span>Visit Website</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onDelete(project)}>
          <Trash2 />
          <span>Delete Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
