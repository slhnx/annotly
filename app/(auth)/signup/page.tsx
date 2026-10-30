import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthDivider } from "@/components/auth/auth-divider"
import { AuthErrorAlert } from "@/components/auth/auth-error-alert"
import { AuthLink } from "@/components/auth/auth-link"
import { SignupForm } from "@/components/auth/signup-form"
import { GithubButton } from "@/components/auth/github-button"

export const metadata: Metadata = {
  title: "Create Account | Annotly",
  description: "Create an Annotly account to launch interactive review canvases and collaborate with clients.",
}

interface SignupPageProps {
  searchParams?: Promise<{ redirect?: string; error?: string }>
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const resolvedSearchParams = await searchParams

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
          <AuthLink href="/login">Sign in</AuthLink>
        </span>
      }
    >
      {resolvedSearchParams?.error && (
        <AuthErrorAlert>
          {decodeURIComponent(resolvedSearchParams.error)}
        </AuthErrorAlert>
      )}

      <GithubButton text="Continue with GitHub" redirectUrl={resolvedSearchParams?.redirect || "/dashboard"} />

      <AuthDivider label="or continue with email" />

      <SignupForm />
    </AuthCard>
  )
}
