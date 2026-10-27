import type { Metadata } from "next"
import { requireUser, formatUserProfile } from "@/lib/auth/server"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export const metadata: Metadata = {
  title: "Dashboard | Annotly",
  description: "Manage visual review projects, canvas links, and website feedback on Annotly.",
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser()
  const userProfile = formatUserProfile(user)

  return (
    <DashboardShell user={userProfile}>
      {children}
    </DashboardShell>
  )
}
