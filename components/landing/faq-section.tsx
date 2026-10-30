import { FaqContactCard } from "./faq-section/faq-contact-card"
import { FaqList } from "./faq-section/faq-list"
import { SectionEyebrow } from "./section-parts/section-eyebrow"

export function FaqSection() {
  return (
    <section
      id="faq"
      className="mx-auto max-w-[1280px] border-t border-border px-6 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-8 lg:sticky lg:top-28 lg:col-span-5">
          <SectionEyebrow
            leading={<span className="size-2 animate-pulse rounded-full bg-info" />}
            className="px-3.5 py-1.5 text-foreground/80"
          >
            Frequently Asked Questions
          </SectionEyebrow>

          <h2 className="font-heading text-4xl leading-[1.06] font-semibold tracking-[-1.8px] text-foreground sm:text-5xl lg:text-[54px] lg:tracking-[-2.4px]">
            Answers to Your Questions About Annotly
          </h2>

          <FaqContactCard />
        </div>

        <FaqList />
      </div>
    </section>
  )
}
