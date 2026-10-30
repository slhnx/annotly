"use client"

import * as React from "react"
import { AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import type { Project } from "../types"

interface DeleteProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (project: Project) => Promise<void>
}

export function DeleteProjectDialog({
  project,
  open,
  onOpenChange,
  onConfirm,
}: DeleteProjectDialogProps) {
  const [loading, setLoading] = React.useState(false)

  if (!project) return null

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm(project)
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <span className="flex size-8 items-center justify-center rounded-lg border border-destructive/20 bg-destructive/10">
              <AlertTriangle className="size-4" />
            </span>
            <DialogTitle className="text-lg font-bold text-foreground">
              Delete Project
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs">
            Are you sure you want to permanently delete{" "}
            <strong className="font-semibold text-foreground">{project.name}</strong>?
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertDescription className="text-xs leading-relaxed">
            This action cannot be undone. All active review canvases, visual pins, and client
            comment threads associated with this project will be permanently removed.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={handleConfirm}
          >
            {loading ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
