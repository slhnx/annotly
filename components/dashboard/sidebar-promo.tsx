import Link from "next/link"
import { Sparkles, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"

interface SidebarPromoProps {
  onNavClick?: () => void
}

export function SidebarPromo({ onNavClick }: SidebarPromoProps) {
  return (
    <Card size="sm" className="gap-1.5 bg-background text-xs">
      <div className="flex items-center gap-2 font-semibold text-foreground">
        <Sparkles className="size-3.5 text-warning" />
        <span>Zero-Install Reviews</span>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Share live review canvases with clients without extensions or account logins.
      </p>
      <Link
        href="/dashboard/projects"
        onClick={onNavClick}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground hover:underline"
      >
        <span>Manage projects</span>
        <ExternalLink className="size-3" />
      </Link>
    </Card>
  )
}
