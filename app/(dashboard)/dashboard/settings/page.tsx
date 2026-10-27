import type { Metadata } from "next"
import { requireUser } from "@/lib/auth/server"
import { User, Shield, Mail, Calendar, Key, CheckCircle2 } from "lucide-react"
import { SignoutButton } from "@/components/auth/signout-button"

export const metadata: Metadata = {
  title: "Settings | Annotly Dashboard",
  description: "Manage your user profile, account settings, and workspace preferences.",
}

export default async function SettingsPage() {
  const user = await requireUser()

  const userEmail = user.email || "reviewer@annotly.com"
  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Reviewer"
  const isEmailConfirmed = Boolean(user.email_confirmed_at)
  const createdAtFormatted = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Active"

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-[#1c1c1c]">
          Account & Workspace Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#5f5f5d]">
          Manage your account profile, authentication credentials, and workspace preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#eceae4]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1c1c] text-[#f7f4ed]">
              <User className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-heading text-base font-bold text-[#1c1c1c]">
                User Profile
              </h2>
              <p className="text-xs text-[#5f5f5d]">Personal details and contact information</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-[#5f5f5d] font-medium">Display Name</span>
              <p className="font-semibold text-[#1c1c1c]">{fullName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#5f5f5d] font-medium">Email Address</span>
              <div className="flex items-center gap-1.5 font-semibold text-[#1c1c1c]">
                <Mail className="h-3.5 w-3.5 text-[#5f5f5d]" />
                <span>{userEmail}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[#5f5f5d] font-medium">Account ID</span>
              <p className="font-mono text-[11px] text-[#5f5f5d]">{user.id}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[#5f5f5d] font-medium">Member Since</span>
              <div className="flex items-center gap-1.5 text-[#1c1c1c]">
                <Calendar className="h-3.5 w-3.5 text-[#5f5f5d]" />
                <span>{createdAtFormatted}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Authentication Card */}
        <div className="rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-6 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#eceae4]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1c1c] text-[#f7f4ed]">
              <Shield className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-heading text-base font-bold text-[#1c1c1c]">
                Security & Verification
              </h2>
              <p className="text-xs text-[#5f5f5d]">Authentication method and security status</p>
            </div>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-[#eceae4]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="font-medium text-[#1c1c1c]">Email Verification</span>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  isEmailConfirmed
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {isEmailConfirmed ? "Verified" : "Pending Confirmation"}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-[#eceae4]">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-[#5f5f5d]" />
                <span className="font-medium text-[#1c1c1c]">Authentication Provider</span>
              </div>
              <span className="capitalize font-semibold text-[#1c1c1c]">
                {user.app_metadata?.provider || "Supabase Auth"}
              </span>
            </div>
          </div>
        </div>

        {/* Danger Zone / Session Card */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-sm font-bold text-rose-900">
                Sign Out of Workspace
              </h3>
              <p className="mt-0.5 text-xs text-rose-700">
                End your active session on this device.
              </p>
            </div>

            <SignoutButton
              variant="outline"
              className="h-8 border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-100/60 cursor-pointer"
            >
              Sign out now
            </SignoutButton>
          </div>
        </div>
      </div>
    </div>
  )
}
