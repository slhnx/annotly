import { cn } from "@/lib/utils"

interface StatusDotProps {
  isCompleted: boolean
  isHovered: boolean
  className?: string
}

export function StatusDot({ isCompleted, isHovered, className }: StatusDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "rounded-full",
        isCompleted ? "bg-success" : isHovered ? "bg-warning" : "bg-success animate-pulse",
        className
      )}
    />
  )
}
