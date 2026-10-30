import { cn } from "@/lib/utils"

const GRAIN_IMAGE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`

interface GrainOverlayProps {
  className?: string
}

/** Tactile noise texture. Pass opacity / blend-mode utilities via `className`. */
export function GrainOverlay({ className }: GrainOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{ backgroundImage: GRAIN_IMAGE }}
    />
  )
}
