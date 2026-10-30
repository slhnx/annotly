import { CheckCircle2, Clock, Key, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SettingsSection } from "./settings-section"

interface SecuritySectionProps {
  isEmailConfirmed: boolean
  provider: string
}

export function SecuritySection({ isEmailConfirmed, provider }: SecuritySectionProps) {
  const VerificationIcon = isEmailConfirmed ? CheckCircle2 : Clock

  return (
    <SettingsSection
      icon={Shield}
      title="Security & Verification"
      description="Authentication method and security status"
    >
      <dl className="flex flex-col text-xs">
        <div className="flex items-center justify-between py-2">
          <dt className="flex items-center gap-2 font-medium text-foreground">
            <VerificationIcon
              className={isEmailConfirmed ? "size-4 text-success" : "size-4 text-warning"}
            />
            Email Verification
          </dt>
          <dd>
            <Badge variant={isEmailConfirmed ? "success" : "warning"}>
              {isEmailConfirmed ? "Verified" : "Pending Confirmation"}
            </Badge>
          </dd>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-2">
          <dt className="flex items-center gap-2 font-medium text-foreground">
            <Key className="size-4 text-muted-foreground" />
            Authentication Provider
          </dt>
          <dd className="font-semibold text-foreground capitalize">{provider}</dd>
        </div>
      </dl>
    </SettingsSection>
  )
}
