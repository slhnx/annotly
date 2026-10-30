import { Check } from "lucide-react"

const REASSURANCES = [
  "14-day free trial",
  "No credit card required",
  "Zero extensions",
] as const

export function CtaReassurance() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-muted-foreground">
      {REASSURANCES.map((item) => (
        <li key={item} className="flex items-center gap-1.5">
          <Check className="size-3.5 text-success" /> {item}
        </li>
      ))}
    </ul>
  )
}
