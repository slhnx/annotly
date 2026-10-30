import Link from "next/link"
import { LEGAL_LINKS } from "./footer.data"

export function FooterLegalBar() {
  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-3 px-2 font-mono text-[11px] tracking-wider text-muted-foreground uppercase sm:flex-row sm:px-4 sm:text-xs">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-foreground/80">&copy;ANNOTLY</span>
        <span>{new Date().getFullYear()}</span>
      </div>

      <div className="flex items-center gap-6">
        {LEGAL_LINKS.map((link) => (
          <span key={link.href} className="contents">
            <Link href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
            <span aria-hidden="true">•</span>
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5 font-medium text-success normal-case">
          <span className="size-1.5 animate-pulse rounded-full bg-success" />
          All Systems Normal
        </span>
      </div>
    </div>
  )
}
