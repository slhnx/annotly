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
      <DialogContent className="max-w-md rounded-2xl border border-[#eceae4] bg-[#fcfbf8] p-6 text-[#1c1c1c] shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-rose-600">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 border border-rose-200">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <DialogTitle className="font-heading text-lg font-bold text-[#1c1c1c]">
              Delete Project
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-[#5f5f5d]">
            Are you sure you want to permanently delete{" "}
            <strong className="text-[#1c1c1c] font-semibold">{project.name}</strong>?
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3.5 text-xs text-rose-800 leading-relaxed">
          <p>
            This action cannot be undone. All active review canvases, visual pins, and client comment threads associated with this project will be permanently removed.
          </p>
        </div>

        <DialogFooter className="pt-2 sm:justify-end gap-2 border-t-0 bg-transparent p-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="h-8 border-[#eceae4] text-xs cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={loading}
            onClick={handleConfirm}
            className="h-8 bg-rose-600 px-4 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
