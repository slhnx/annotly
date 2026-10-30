import { Check } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ROLE_ROWS } from "./getting-started.data"

export function StepRolesPreview() {
  return (
    <>
      <ul className="space-y-2.5">
        {ROLE_ROWS.map((row) => (
          <li key={row.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {row.initials.map((initials, idx) => (
                  <Avatar key={initials} className="size-5 border border-background">
                    <AvatarFallback
                      className={cn("text-[9px]", row.avatarClasses[idx])}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs font-medium text-foreground">{row.label}</span>
            </div>
            <Badge
              variant={row.permissionVariant}
              className="h-auto px-2 py-0.5 font-mono text-[10px] font-semibold"
            >
              {row.permission}
            </Badge>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <Separator />
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-success">
          <Check className="size-3" />
          <span>100% element-anchored to DOM rect</span>
        </div>
      </div>
    </>
  )
}
