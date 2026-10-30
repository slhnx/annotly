import { Badge } from "@/components/ui/badge"
import {
  PROJECT_STATUS_BADGE_VARIANTS,
  PROJECT_STATUS_LABELS,
} from "../constants"
import type { ProjectStatus } from "../types"

interface ProjectStatusBadgeProps {
  status: ProjectStatus
  className?: string
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  return (
    <Badge variant={PROJECT_STATUS_BADGE_VARIANTS[status]} className={className}>
      {PROJECT_STATUS_LABELS[status]}
    </Badge>
  )
}
