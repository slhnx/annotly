import { FooterColumns } from "./footer/footer-columns"
import { FooterLegalBar } from "./footer/footer-legal-bar"
import { FooterWordmark } from "./footer/footer-wordmark"
import { GrainOverlay } from "./section-parts/grain-overlay"

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background px-4 pt-8 pb-6 sm:px-6 sm:pt-10 md:px-8 lg:px-10 xl:px-12">
      <div className="mx-auto w-full max-w-[1760px]">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-inverse p-8 pb-0 text-inverse-foreground sm:rounded-[36px] sm:p-12 sm:pb-0 lg:rounded-[40px] lg:p-16 lg:pb-0">
          <GrainOverlay className="opacity-[0.07]" />
          <div className="pointer-events-none absolute -top-32 -left-32 size-96 rounded-full bg-inverse-foreground/[0.03] blur-3xl" />

          <FooterColumns />
          <FooterWordmark />
        </div>

        <FooterLegalBar />
      </div>
    </footer>
  )
}
