"use client"

import { Check, RotateCcw, Save } from "lucide-react"
import { CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectGeneralSettingsFooterProps {
  isDirty: boolean
  loading: boolean
  saveSuccess: boolean
  onReset: () => void
}

export function ProjectGeneralSettingsFooter({
  isDirty,
  loading,
  saveSuccess,
  onReset,
}: ProjectGeneralSettingsFooterProps) {
  return (
    <CardFooter className="flex items-center justify-between border-t border-border/80 pt-4">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!isDirty || loading}
        onClick={onReset}
        className="gap-1.5 text-xs"
      >
        <RotateCcw className="size-3.5" />
        <span>Discard</span>
      </Button>

      <Button
        type="submit"
        size="sm"
        disabled={!isDirty || loading}
        className="gap-1.5 text-xs font-semibold"
      >
        {loading ? (
          <span>Saving...</span>
        ) : saveSuccess ? (
          <>
            <Check className="size-3.5" />
            <span>Saved</span>
          </>
        ) : (
          <>
            <Save className="size-3.5" />
            <span>Save Changes</span>
          </>
        )}
      </Button>
    </CardFooter>
  )
}
