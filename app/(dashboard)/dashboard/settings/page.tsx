import type { Metadata } from "next"
import { requireUser } from "@/lib/auth/server"
import { ProfileSection } from "@/components/dashboard/settings/profile-section"
import { AppearanceSection } from "@/components/dashboard/settings/appearance-section"
import { SecuritySection } from "@/components/dashboard/settings/security-section"
import { SessionSection } from "@/components/dashboard/settings/session-section"

export const metadata: Metadata = {
  title: "Settings | Annotly Dashboard",
  description: "Manage your user profile, account settings, and workspace preferences.",
}

export default async function SettingsPage() {
  const user = await requireUser()

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Active"

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Account & Workspace Settings
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Manage your account profile, authentication credentials, and workspace preferences.
        </p>
      </div>

      <div className="space-y-6">
        <ProfileSection
          fullName={user.user_metadata?.full_name || user.email?.split("@")[0] || "Reviewer"}
          email={user.email || "reviewer@annotly.com"}
          accountId={user.id}
          memberSince={memberSince}
        />
        <AppearanceSection />
        <SecuritySection
          isEmailConfirmed={Boolean(user.email_confirmed_at)}
          provider={user.app_metadata?.provider || "Supabase Auth"}
        />
        <SessionSection />
      </div>
    </div>
  )
}
