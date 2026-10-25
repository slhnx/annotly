import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  footer?: React.ReactNode
}

export function AuthCard({
  title,
  description,
  children,
  footer,
  className,
  ...props
}: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[420px] rounded-2xl border border-[#eceae4] bg-[#f7f4ed] p-7 md:p-8 shadow-[0px_4px_24px_rgba(28,28,28,0.04)]",
        className
      )}
      {...props}
    >
      <div className="mb-6 flex flex-col items-center text-center">
        {/* Brand Link & Symbol */}
        <Link
          href="/"
          className="group mb-5 flex items-center gap-2 rounded-full border border-[#eceae4] bg-[#f2ede4]/60 px-3 py-1.5 transition-colors hover:border-[rgba(28,28,28,0.25)]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1c1c1c] text-[10px] font-bold text-[#f7f4ed]">
            A
          </span>
          <span className="font-heading text-xs font-semibold tracking-tight text-[#1c1c1c]">
            Annotly
          </span>
        </Link>

        <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1c1c1c]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-xs text-[#5f5f5d] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">{children}</div>

      {footer && (
        <div className="mt-6 border-t border-[#eceae4] pt-5 text-center text-xs text-[#5f5f5d]">
          {footer}
        </div>
      )}
    </div>
  )
}
