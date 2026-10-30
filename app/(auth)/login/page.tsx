import type { Metadata } from "next"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthDivider } from "@/components/auth/auth-divider"
import { AuthErrorAlert } from "@/components/auth/auth-error-alert"
import { AuthLink } from "@/components/auth/auth-link"
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
          <AuthLink href="/signup">Create an account</AuthLink>
        </span>
      }
    >
      {resolvedSearchParams?.error && (
        <AuthErrorAlert>
          {decodeURIComponent(resolvedSearchParams.error)}
        </AuthErrorAlert>
      )}

      <GithubButton redirectUrl={resolvedSearchParams?.redirect} />

      <AuthDivider label="or continue with email" />

      <LoginForm redirectUrl={resolvedSearchParams?.redirect} />
    </AuthCard>
  )
}
