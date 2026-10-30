import type { ComponentType, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SectionEyebrowProps {
  icon?: ComponentType<{ className?: string }>
  /** Custom leading element (e.g. a status dot) used instead of an icon. */
  leading?: ReactNode
  children: ReactNode
  className?: string
}

export function SectionEyebrow({
  icon: Icon,
  leading,
  children,
  className,
}: SectionEyebrowProps) {
  return (
    <Badge
      variant="pill"
      className={cn(
        "h-auto gap-2 bg-card px-3 py-1 text-xs text-muted-foreground",
        className
      )}
    >
      {Icon && <Icon className="size-3.5 text-foreground" />}
      {leading}
      <span>{children}</span>
    </Badge>
  )
}
