import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Authentication | Annotly",
  description: "Sign in or create an account on Annotly — visual website feedback and collaboration.",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-white text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        {/* Left Panel: Primary Color Feature Showcase */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-[#1c1c1c] p-12 xl:p-16 text-[#fcfbf8]">
          {/* Subtle warm ambient glow in top corner */}
          <div
            className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(247,244,237,0.15) 0%, transparent 70%)",
            }}
          />

          {/* Top-Left: Brand Header */}
          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-85"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fcfbf8] text-xs font-bold text-[#1c1c1c] shadow-sm">
                A
              </span>
              <span className="font-heading text-lg font-bold tracking-tight text-[#fcfbf8]">
                Annotly
              </span>
            </Link>
          </div>

          {/* Bottom-Left: Expressive Display Headline matching reference image */}
          <div className="relative z-10 max-w-lg pb-6">
            <h1 className="font-heading text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-[#fcfbf8] leading-[1.08]">
              Website feedback that{" "}
              <span className="relative inline-block whitespace-nowrap">
                anchors
                {/* Hand-drawn curved underline matching reference image */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full text-[#fcfbf8]"
                  viewBox="0 0 250 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 13C60 4 160 3 247 14"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              to your live canvas.
            </h1>
            <p className="mt-5 text-sm text-[#fcfbf8]/70 leading-relaxed max-w-md">
              Point, click on any website element, and discuss feedback with your
              clients in real-time — zero extensions required.
            </p>
          </div>

          {/* Bottom attribution/copyright */}
          <div className="relative z-10 text-[11px] text-[#fcfbf8]/40">
            &copy; {new Date().getFullYear()} Annotly Inc. All rights reserved.
          </div>
        </div>

        {/* Right Panel: Clean Form Workspace */}
        <div className="flex min-h-screen flex-col justify-between bg-white px-6 py-10 md:px-12 lg:px-16 xl:px-20">
          {/* Mobile Top Brand Header (Visible only on mobile/tablet) */}
          <div className="flex items-center justify-between lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1c1c1c] text-xs font-bold text-[#fcfbf8]">
                A
              </span>
              <span className="font-heading text-base font-bold tracking-tight text-[#1c1c1c]">
                Annotly
              </span>
            </Link>
          </div>

          {/* Centered Form Content */}
          <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center py-6">
            {children}
          </div>

          {/* Mobile/Footer Legal Links */}
          <div className="mx-auto w-full max-w-[420px] pt-6 text-center text-[11px] text-[#5f5f5d]">
            <p>
              By continuing you confirm you agree to our{" "}
              <span className="cursor-pointer text-[#1c1c1c] underline underline-offset-4 hover:opacity-80">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="cursor-pointer text-[#1c1c1c] underline underline-offset-4 hover:opacity-80">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
