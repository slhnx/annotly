import type { Metadata } from "next"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Reset Password | Annotly",
  description: "Request a password reset link for your Annotly account.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email address and we'll send you instructions to reset your password."
      footer={
        <span>
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            Back to sign in
          </Link>
        </span>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  )
}
