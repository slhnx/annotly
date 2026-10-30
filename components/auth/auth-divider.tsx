import { Separator } from "@/components/ui/separator"

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="my-7 flex items-center gap-3.5">
      <Separator className="flex-1" />
      <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
      <Separator className="flex-1" />
    </div>
  )
}
