import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GrainOverlay } from "../section-parts/grain-overlay"

export function FaqContactCard() {
  return (
    <Card className="relative gap-0 rounded-[24px] border-border bg-secondary p-7 sm:rounded-[28px] sm:p-8">
      <GrainOverlay />

      <div className="relative z-10 space-y-4">
        <p className="text-sm leading-relaxed font-medium text-foreground/85 sm:text-base">
          Have more questions for us? Our team can help you out. Get in touch with us!
        </p>

        <Button
          nativeButton={false}
          render={<Link href="mailto:hello@annotly.xyz" />}
          className="gap-1.5 rounded-xl px-6 py-2.5 text-xs font-semibold sm:text-sm"
        >
          <span>Contact Us</span>
          <ArrowUpRight className="size-3.5 opacity-70" />
        </Button>
      </div>
    </Card>
  )
}
