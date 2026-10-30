import { Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SectionEyebrow } from "./section-parts/section-eyebrow"
import { ASSURANCES } from "./trust-security.data"

export function TrustSecurity() {
  return (
    <section className="mx-auto max-w-[1200px] border-t border-border px-6 py-20">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <SectionEyebrow icon={Sparkles} className="mb-4">
          Security &amp; Architecture
        </SectionEyebrow>
        <h2 className="mb-4 font-heading text-3xl leading-tight font-semibold tracking-[-1.2px] text-foreground sm:text-4xl md:text-5xl">
          Engineered securely from the ground up.
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          Transparent, secure infrastructure designed to handle complex staging environments without compromising network security.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {ASSURANCES.map(({ icon: Icon, title, badge, description }) => (
          <Card
            key={title}
            className="justify-between gap-0 bg-card/60 p-0 transition-all hover:bg-card"
          >
            <CardContent className="flex h-full flex-col justify-between space-y-6 p-6 sm:p-8">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-[6px] border border-border bg-muted">
                    <Icon className="size-5 text-foreground" />
                  </div>
                  <Badge variant="pill" className="py-0 text-[11px] font-normal">
                    {badge}
                  </Badge>
                </div>

                <h3 className="mb-2 font-heading text-lg font-semibold tracking-tight text-foreground">
                  {title}
                </h3>

                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
