import { Calendar, Mail, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { SettingsSection } from "./settings-section"

interface ProfileSectionProps {
  fullName: string
  email: string
  accountId: string
  memberSince: string
}

interface ReadOnlyFieldProps {
  id: string
  label: string
  value: string
  icon?: React.ReactNode
  className?: string
}

function ReadOnlyField({ id, label, value, icon, className }: ReadOnlyFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-muted-foreground">
        {label}
      </Label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            {icon}
          </span>
        ) : null}
        <Input
          id={id}
          readOnly
          value={value}
          className={cn(icon && "pl-9", className)}
        />
      </div>
    </div>
  )
}

export function ProfileSection({ fullName, email, accountId, memberSince }: ProfileSectionProps) {
  return (
    <SettingsSection
      icon={User}
      title="User Profile"
      description="Personal details and contact information"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ReadOnlyField id="settings-display-name" label="Display Name" value={fullName} />
        <ReadOnlyField
          id="settings-email"
          label="Email Address"
          value={email}
          icon={<Mail className="size-3.5" />}
        />
        <ReadOnlyField
          id="settings-account-id"
          label="Account ID"
          value={accountId}
          className="font-mono text-xs text-muted-foreground"
        />
        <ReadOnlyField
          id="settings-member-since"
          label="Member Since"
          value={memberSince}
          icon={<Calendar className="size-3.5" />}
        />
      </div>
    </SettingsSection>
  )
}
