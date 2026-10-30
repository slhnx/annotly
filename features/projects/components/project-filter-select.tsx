"use client"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProjectFilterSelectProps<T extends string> {
  value: T
  items: Record<T, string>
  onValueChange: (value: T) => void
  ariaLabel: string
  id?: string
  className?: string
}

export function ProjectFilterSelect<T extends string>({
  value,
  items,
  onValueChange,
  ariaLabel,
  id,
  className,
}: ProjectFilterSelectProps<T>) {
  const options = Object.entries(items) as [T, string][]

  return (
    <Select
      value={value}
      items={items}
      onValueChange={(next: string | null) => {
        if (next !== null && next in items) onValueChange(next as T)
      }}
    >
      <SelectTrigger
        id={id}
        aria-label={ariaLabel}
        className={cn("h-9 text-xs font-medium", className)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map(([optionValue, label]) => (
          <SelectItem key={optionValue} value={optionValue} className="text-xs">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
