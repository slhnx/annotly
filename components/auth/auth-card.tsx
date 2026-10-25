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
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#1c1c1c] leading-[1.12]">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-[#5f5f5d] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">{children}</div>

      {footer && (
        <div className="pt-2 text-center text-xs text-[#5f5f5d]">
          {footer}
        </div>
      )}
    </div>
  )
}
