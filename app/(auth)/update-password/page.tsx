import type { Metadata } from "next"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { UpdatePasswordForm } from "@/components/auth/update-password-form"

export const metadata: Metadata = {
  title: "Set New Password | Annotly",
  description: "Set a new secure password for your Annotly account.",
}

export default function UpdatePasswordPage() {
  return (
    <AuthCard
      title="Set new password"
      description="Choose a strong password with at least 8 characters to secure your account."
      footer={
        <span>
          Back to{" "}
          <Link
            href="/login"
            className="font-medium text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <UpdatePasswordForm />
    </AuthCard>
  )
}
