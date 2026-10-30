import * as React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthSubmitButtonProps {
  isSubmitting: boolean
  pendingLabel: string
  children: React.ReactNode
}

export function AuthSubmitButton({
  isSubmitting,
  pendingLabel,
  children,
}: AuthSubmitButtonProps) {
  return (
    <Button
      type="submit"
      size="lg"
      disabled={isSubmitting}
      className="h-11 w-full text-xs"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
