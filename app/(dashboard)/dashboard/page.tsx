import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SignoutButton } from "@/components/auth/signout-button"
import { CheckCircle2, Shield, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | Annotly",
  description: "Manage your review canvases and feedback on Annotly.",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const userEmail = user.email || "reviewer@annotly.com"
  const fullName = user.user_metadata?.full_name || "Annotly Reviewer"

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#1c1c1c]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#eceae4] bg-[#f7f4ed]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c1c1c] text-xs font-bold text-[#f7f4ed]">
              A
            </span>
            <span className="font-heading text-sm font-semibold tracking-tight text-[#1c1c1c]">
              Annotly
            </span>
            <span className="rounded-full bg-[#f2ede4] px-2 py-0.5 text-[10px] font-medium text-[#5f5f5d]">
              Dashboard
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#5f5f5d]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{userEmail}</span>
            </div>
            <SignoutButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[#1c1c1c]">
            Welcome, {fullName}
          </h1>
          <p className="mt-1 text-sm text-[#5f5f5d]">
            Your account is authenticated and active.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Active Session Verification Card */}
          <div className="rounded-2xl border border-[#eceae4] bg-[#fcfbf8] p-6 shadow-[0px_2px_12px_rgba(28,28,28,0.03)] md:col-span-2">
            <div className="flex items-center gap-2.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Supabase Session Active</span>
            </div>

            <h2 className="mt-4 font-heading text-lg font-semibold text-[#1c1c1c]">
              Authentication Lifecycle Verified
            </h2>
            <p className="mt-1 text-xs text-[#5f5f5d] leading-relaxed">
              Your session cookies are validated by Next.js Server Components and protected by route-level middleware guards.
            </p>

            <div className="mt-6 space-y-3 rounded-xl border border-[#eceae4] bg-[#f7f4ed]/60 p-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#eceae4] pb-2">
                <span className="text-[#5f5f5d]">Account Email</span>
                <span className="font-medium text-[#1c1c1c]">{userEmail}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#eceae4] pb-2">
                <span className="text-[#5f5f5d]">User ID</span>
                <span className="font-mono text-[11px] text-[#5f5f5d]">{user.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5f5f5d]">Last Sign In</span>
                <span className="text-[#5f5f5d]">
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : "Active"}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats / Info Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#eceae4] bg-[#fcfbf8] p-6 shadow-[0px_2px_12px_rgba(28,28,28,0.03)]">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#5f5f5d]">
                <Shield className="h-4 w-4 text-[#1c1c1c]" />
                <span>Security Status</span>
              </div>
              <h3 className="mt-3 font-heading text-base font-semibold text-[#1c1c1c]">
                Next: Phase 4 App Shell
              </h3>
              <p className="mt-1.5 text-xs text-[#5f5f5d] leading-relaxed">
                Phase 4 builds the full project management dashboard, URL canvas generator, and workspace navigation.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eceae4]">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1c1c1c] hover:opacity-80 transition-opacity"
              >
                <span>View homepage</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
