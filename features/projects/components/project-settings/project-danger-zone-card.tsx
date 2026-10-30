"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Trash2 } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeleteProjectDialog } from "../delete-project-dialog"
import { deleteProjectAction } from "../../actions"
import type { Project } from "../../types"

interface ProjectDangerZoneCardProps {
  project: Project
}

export function ProjectDangerZoneCard({ project }: ProjectDangerZoneCardProps) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const handleDelete = async (proj: Project) => {
    const res = await deleteProjectAction(proj.id)
    if (res.success) {
      router.push("/dashboard/projects")
    }
  }

  return (
    <>
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader className="space-y-1 pb-3">
          <div className="flex items-center gap-2 text-destructive">
            <span className="flex size-6 items-center justify-center rounded-md bg-destructive/10">
              <AlertTriangle className="size-3.5" />
            </span>
            <CardTitle className="text-sm font-bold">Danger Zone</CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground">
            Irreversible actions that permanently affect this review project and its collaborators.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex flex-col gap-3 rounded-lg border border-destructive/20 bg-background/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-semibold text-foreground">Delete this project</p>
              <p className="text-[11px] text-muted-foreground">
                Permanently delete all review pins, element anchors, snapshots, and comment threads.
              </p>
            </div>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="gap-1.5 self-start text-xs font-semibold sm:self-auto"
            >
              <Trash2 className="size-3.5" />
              <span>Delete Project</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <DeleteProjectDialog
        project={project}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  )
}
