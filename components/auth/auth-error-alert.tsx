import * as React from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

interface AuthErrorAlertProps {
  children: React.ReactNode
  className?: string
}

export function AuthErrorAlert({ children, className }: AuthErrorAlertProps) {
  return (
    <Alert
      variant="destructive"
      className={cn("border-destructive/20 bg-destructive/10", className)}
    >
      <AlertCircle aria-hidden="true" />
      <AlertDescription className="text-xs leading-relaxed text-destructive">
        {children}
      </AlertDescription>
    </Alert>
  )
}
