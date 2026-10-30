import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthLink } from "@/components/auth/auth-link"
import { UpdatePasswordForm } from "@/components/auth/update-password-form"

export const metadata: Metadata = {
  title: "Set New Password | Annotly",
  description: "Set a new secure password for your Annotly account.",
}

export default function UpdatePasswordPage() {
  return (
    <AuthCard
      title={
        <>
          Set new
          <br />
          password.
        </>
      }
      description="Choose a strong password with at least 8 characters to secure your account."
      footer={
        <span>
          Back to{" "}
          <AuthLink href="/login">Sign in</AuthLink>
        </span>
      }
    >
      <UpdatePasswordForm />
    </AuthCard>
  )
}
