import type { Metadata } from "next"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata: Metadata = {
  title: "Create Account | Annotly",
  description: "Create an Annotly account to launch interactive review canvases and collaborate with clients.",
}

export default function SignupPage() {
  return (
    <AuthCard
      title="Create your account"
      description="Start reviewing live websites with zero-friction visual collaboration."
      footer={
        <span>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <SignupForm />
    </AuthCard>
  )
}
