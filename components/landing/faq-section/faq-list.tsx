import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { FAQS } from "./faq-section.data"

const faqValue = (index: number) => `faq-${index}`

export function FaqList() {
  return (
    <Accordion
      defaultValue={[faqValue(0)]}
      className="gap-3.5 sm:gap-4 lg:col-span-7"
    >
      {FAQS.map((faq, index) => (
        <AccordionItem
          key={faq.q}
          value={faqValue(index)}
          className="overflow-hidden rounded-[20px] border bg-card transition-colors hover:border-border-interactive data-open:border-border-interactive data-open:shadow-xs sm:rounded-[24px]"
        >
          <AccordionTrigger className="items-start gap-4 rounded-none border-0 p-6 font-heading text-base leading-snug font-semibold hover:no-underline sm:p-7 sm:text-lg">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 sm:px-7 sm:pb-7">
            <Separator className="mb-3" />
            <p className="text-xs leading-relaxed font-normal text-muted-foreground sm:text-sm">
              {faq.a}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
