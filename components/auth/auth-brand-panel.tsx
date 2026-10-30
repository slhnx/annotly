import Link from "next/link"

export function AuthBrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-inverse p-12 text-inverse-foreground lg:flex xl:p-16">
      {/* Subtle ambient glow in the top corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[500px] rounded-full bg-inverse-foreground/15 blur-3xl"
      />

      <div className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-inverse-foreground text-xs font-bold text-inverse shadow-card">
            A
          </span>
          <span className="font-heading text-lg font-bold tracking-tight">
            Annotly
          </span>
        </Link>
      </div>

      <div className="relative z-10 max-w-lg pb-6">
        <h1 className="font-heading text-4xl leading-[1.08] font-bold tracking-tight xl:text-5xl 2xl:text-6xl">
          Website feedback that{" "}
          <span className="relative inline-block whitespace-nowrap">
            anchors
            <svg
              className="absolute -bottom-2.5 left-0 w-full"
              viewBox="0 0 250 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
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
        <p className="mt-5 max-w-md text-sm leading-relaxed text-inverse-foreground/70">
          Point, click on any website element, and discuss feedback with your
          clients in real-time — zero extensions required.
        </p>
      </div>

      <div className="relative z-10 text-[11px] text-inverse-foreground/40">
        &copy; {new Date().getFullYear()} Annotly Inc. All rights reserved.
      </div>
    </div>
  )
}
