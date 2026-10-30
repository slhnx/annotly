import type { SlideGroup } from "./use-cases.data"

interface UseCasesStatProps {
  group: SlideGroup
}

export function UseCasesStat({ group }: UseCasesStatProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
        <span>{group.statNumber}</span>
        {group.statSuperscript && (
          <span className="-translate-y-3 text-3xl sm:-translate-y-4 sm:text-4xl">
            {group.statSuperscript}
          </span>
        )}
        {group.statUnit && (
          <span className="ml-0.5 -translate-y-3 text-3xl text-muted-foreground sm:-translate-y-4 sm:text-4xl">
            {group.statUnit}
          </span>
        )}
      </div>
      <div className="text-xs font-medium text-muted-foreground sm:text-sm">
        {group.statLabel}
      </div>
    </div>
  )
}
