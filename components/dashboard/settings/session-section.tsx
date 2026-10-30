import { Card } from "@/components/ui/card"
import { SignoutButton } from "@/components/auth/signout-button"

export function SessionSection() {
  return (
    <Card className="flex-col justify-between gap-4 border-destructive/30 bg-destructive/5 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-0.5">
        <h2 className="font-sans text-sm font-semibold text-destructive">
          Sign Out of Workspace
        </h2>
        <p className="text-xs text-muted-foreground">
          End your active session on this device.
        </p>
      </div>

      <SignoutButton
        variant="outline"
        className="border-destructive/40 font-semibold text-destructive hover:bg-destructive/10"
      >
        Sign out now
      </SignoutButton>
    </Card>
  )
}
