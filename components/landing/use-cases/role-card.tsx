import Image from "next/image"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { RoleCardData } from "./use-cases.data"

interface RoleCardProps {
  card: RoleCardData
}

export function RoleCard({ card }: RoleCardProps) {
  return (
    <Card className="group justify-between rounded-[28px] p-6 text-left transition-shadow hover:shadow-card sm:rounded-[34px] sm:p-7">
      <div className="relative my-1 flex aspect-[4/3] w-full items-center justify-center select-none">
        <div className="relative flex h-full w-full items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={card.image}
            alt={`${card.targetFor} conceptual origami sculpture`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-contain object-center select-none"
          />
        </div>

        <Badge
          variant="pill"
          className="absolute top-1 right-1 z-10 bg-background/90 px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-xs"
        >
          {card.targetFor}
        </Badge>
      </div>

      <div className="space-y-3.5 pt-3">
        <div>
          <h3 className="font-heading text-lg leading-snug font-semibold tracking-tight text-foreground sm:text-xl">
            {card.headline}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
            {card.description}
          </p>
        </div>

        <Separator />

        <ul className="flex flex-wrap gap-2">
          {card.perks.map((perk) => (
            <li key={perk}>
              <Badge
                variant="muted"
                className="h-auto gap-1.5 border-transparent px-2.5 py-1 text-[11px] text-foreground/80"
              >
                <Check className="size-3 shrink-0 text-success" />
                <span>{perk}</span>
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
