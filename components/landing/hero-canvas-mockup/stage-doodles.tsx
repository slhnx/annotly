import { GRAIN_BACKGROUND_IMAGE } from "./hero-canvas-mockup.data"

const SHARED_SVG_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
} as const

/** Decorative grain + hand-drawn doodles behind the demo stage. */
export function StageDoodles() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_BACKGROUND_IMAGE }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden text-foreground/10"
      >
        <svg
          {...SHARED_SVG_PROPS}
          className="absolute top-10 left-12 size-8 rotate-12"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
        </svg>

        <svg
          {...SHARED_SVG_PROPS}
          className="absolute top-1/2 left-8 hidden h-8 w-16 -translate-y-1/2 -rotate-6 sm:block"
          viewBox="0 0 60 20"
          strokeWidth="2"
        >
          <path d="M2 10 Q 15 2, 30 10 T 58 10" />
        </svg>

        <svg
          {...SHARED_SVG_PROPS}
          className="absolute bottom-16 left-16 hidden size-10 -rotate-12 md:block"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>

        <svg
          {...SHARED_SVG_PROPS}
          className="absolute top-12 right-16 hidden size-12 rotate-45 sm:block"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
        </svg>

        <svg
          {...SHARED_SVG_PROPS}
          className="absolute top-1/3 right-10 hidden h-8 w-12 rotate-3 md:block"
          viewBox="0 0 40 24"
          strokeWidth="1.75"
        >
          <path d="M12 4 L4 12 L12 20 M28 4 L36 12 L28 20 M22 2 L18 22" />
        </svg>

        <svg
          {...SHARED_SVG_PROPS}
          className="absolute top-2/3 right-14 hidden h-6 w-20 rotate-12 sm:block"
          viewBox="0 0 80 20"
          strokeWidth="1.75"
        >
          <path d="M2 10 Q 20 2, 40 10 T 78 10" />
        </svg>

        <svg
          {...SHARED_SVG_PROPS}
          className="absolute right-20 bottom-14 size-8 -rotate-12"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="7" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
        </svg>
      </div>
    </>
  )
}
