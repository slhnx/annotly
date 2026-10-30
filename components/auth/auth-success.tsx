import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"

export function AuthSuccessAlert({ children }: { children: React.ReactNode }) {
  return (
    <Alert
      role="status"
      className="border-success/20 bg-success/10 text-success"
    >
      <CheckCircle2 aria-hidden="true" />
      <AlertDescription className="text-xs leading-relaxed text-success">
        {children}
      </AlertDescription>
    </Alert>
  )
}

interface AuthSuccessPanelProps {
  icon: LucideIcon
  title: string
  children: React.ReactNode
}

export function AuthSuccessPanel({
  icon: Icon,
  title,
  children,
}: AuthSuccessPanelProps) {
  return (
    <Card
      role="status"
      className="items-center gap-0 border-success/20 bg-success/10 p-5 text-center"
    >
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-success/15 text-success">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-sm font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {children}
      </p>
    </Card>
  )
}
