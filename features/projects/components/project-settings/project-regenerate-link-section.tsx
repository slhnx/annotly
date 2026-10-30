"use client"

import * as React from "react"
import { RefreshCw, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectRegenerateLinkSectionProps {
  loading: boolean
  onRegenerate: () => Promise<void>
}

export function ProjectRegenerateLinkSection({
  loading,
  onRegenerate,
}: ProjectRegenerateLinkSectionProps) {
  const [showConfirm, setShowConfirm] = React.useState(false)

  const handleConfirm = async () => {
    setShowConfirm(false)
    await onRegenerate()
  }

  return (
    <div className="rounded-lg border border-border/80 bg-muted/20 p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-foreground">Regenerate Review Link</p>
          <p className="text-[11px] text-muted-foreground">
            Revokes the existing review token and creates a fresh URL.
          </p>
        </div>

        {!showConfirm ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => setShowConfirm(true)}
            className="gap-1.5 self-start text-xs font-medium sm:self-auto"
          >
            <RefreshCw className="size-3.5" />
            <span>Regenerate</span>
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirm(false)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={loading}
              onClick={handleConfirm}
              className="gap-1 text-xs"
            >
              <ShieldAlert className="size-3.5" />
              <span>Confirm Revoke</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
