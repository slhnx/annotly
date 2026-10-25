import type { Metadata } from "next"
import Link from "next/link"
import { AuthCard } from "@/components/auth/auth-card"
import { SignupForm } from "@/components/auth/signup-form"
import { GithubButton } from "@/components/auth/github-button"

export const metadata: Metadata = {
  title: "Create Account | Annotly",
  description: "Create an Annotly account to launch interactive review canvases and collaborate with clients.",
}

export default function SignupPage() {
  return (
    <AuthCard
      title={
        <>
          Start reviewing.
          <br />
          In seconds.
        </>
      }
      description="Create your account with GitHub or your work email. No credit card required."
      footer={
        <span>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            Sign in
          </Link>
        </span>
      }
    >
      <GithubButton text="Continue with GitHub" redirectUrl="/dashboard" />

      {/* Spaced-out divider with generous Y-axis margin */}
      <div className="relative my-7 flex items-center justify-center">
        <div className="w-full border-t border-[#eceae4]" />
        <span className="absolute bg-white px-3.5 text-[11px] font-medium uppercase tracking-wider text-[#5f5f5d]/70">
          or continue with email
        </span>
      </div>

      <SignupForm />
    </AuthCard>
  )
}
