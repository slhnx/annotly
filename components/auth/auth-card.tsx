import * as React from "react"
import { cn } from "@/lib/utils"

interface AuthCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
  ...props
}: AuthCardProps) {
  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      <div className="space-y-2">
        <h2 className="font-heading text-3xl leading-[1.12] font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">{children}</div>

      {footer && (
        <div className="pt-2 text-center text-xs text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  )
}
