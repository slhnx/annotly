import type { Metadata } from "next"
import Link from "next/link"
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel"


export const metadata: Metadata = {
  title: "Authentication | Annotly",
  description: "Sign in or create an account on Annotly — visual website feedback and collaboration.",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        <AuthBrandPanel />

        <div className="flex min-h-screen flex-col justify-between bg-background px-6 py-10 md:px-12 lg:px-16 xl:px-20">
          {/* Mobile/tablet brand header */}
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                A
              </span>
              <span className="font-heading text-base font-bold tracking-tight text-foreground">
                Annotly
              </span>
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-6">
            {children}
          </div>

          <div className="mx-auto w-full max-w-[420px] pt-6 text-center text-[11px] text-muted-foreground">
            <p>
              By continuing you confirm you agree to our{" "}
              <span className="cursor-pointer text-foreground underline underline-offset-4 hover:opacity-80">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="cursor-pointer text-foreground underline underline-offset-4 hover:opacity-80">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
