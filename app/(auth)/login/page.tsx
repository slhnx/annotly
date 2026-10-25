import type { Metadata } from "next"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { AuthCard } from "@/components/auth/auth-card"
import { LoginForm } from "@/components/auth/login-form"
import { GithubButton } from "@/components/auth/github-button"

export const metadata: Metadata = {
  title: "Sign In | Annotly",
  description: "Sign in to your Annotly account to manage your review canvases and feedback.",
}

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams

  return (
    <AuthCard
      title={
        <>
          Less guessing.
          <br />
          More building.
        </>
      }
      description="Sign in with GitHub or your work email. No extensions or complicated installs, ever."
      footer={
        <span>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[#1c1c1c] underline underline-offset-4 hover:opacity-80"
          >
            Create an account
          </Link>
        </span>
      }
    >
      {resolvedSearchParams?.error && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/70 p-3 text-xs text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
          <div className="leading-relaxed">
            {decodeURIComponent(resolvedSearchParams.error)}
          </div>
        </div>
      )}

      <GithubButton redirectUrl={resolvedSearchParams?.redirect} />

      {/* Spaced-out divider with generous Y-axis margin */}
      <div className="relative my-7 flex items-center justify-center">
        <div className="w-full border-t border-[#eceae4]" />
        <span className="absolute bg-white px-3.5 text-[11px] font-medium uppercase tracking-wider text-[#5f5f5d]/70">
          or continue with email
        </span>
      </div>

      <LoginForm redirectUrl={resolvedSearchParams?.redirect} />
    </AuthCard>
  )
}
