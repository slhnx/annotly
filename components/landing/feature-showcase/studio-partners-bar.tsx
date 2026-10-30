import { Separator } from "@/components/ui/separator"
import { STUDIO_PARTNERS } from "./feature-showcase.data"

export function StudioPartnersBar() {
  return (
    <div className="mb-14">
      <div className="flex flex-col justify-between gap-6 opacity-75 transition-opacity hover:opacity-100 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="size-2 animate-pulse rounded-full bg-success" />
          <span className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Trusted by 2,500+ design studios & frontend teams
          </span>
        </div>

        <ul className="flex flex-wrap items-center gap-7 tracking-tight text-foreground/80 sm:gap-11">
          {STUDIO_PARTNERS.map((partner) => (
            <li key={partner.name} className={partner.className}>
              {partner.name}
            </li>
          ))}
        </ul>
      </div>
      <Separator className="mt-8" />
    </div>
  )
}
