import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthLink } from "@/components/auth/auth-link"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Reset Password | Annotly",
  description: "Request a password reset link for your Annotly account.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title={
        <>
          Reset your
          <br />
          password.
        </>
      }
      description="Enter your email address and we'll send you recovery instructions."
      footer={
        <span>
          Remember your password?{" "}
          <AuthLink href="/login">Back to sign in</AuthLink>
        </span>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}
