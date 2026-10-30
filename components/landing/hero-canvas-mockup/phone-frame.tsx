import type { ReactNode } from "react"

/** Dark device bezel with hardware buttons and dynamic island. */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[305px] rounded-[48px] border border-inverse-foreground/15 bg-inverse p-[10px] shadow-focus transition-all sm:w-[330px] sm:rounded-[54px] sm:p-[12px] md:w-[348px]">
      <div className="absolute top-24 -left-[3px] h-10 w-[3px] rounded-l-sm bg-inverse-foreground/20" />
      <div className="absolute top-38 -left-[3px] h-10 w-[3px] rounded-l-sm bg-inverse-foreground/20" />
      <div className="absolute top-30 -right-[3px] h-16 w-[3px] rounded-r-sm bg-inverse-foreground/20" />

      <div className="mx-auto mb-2.5 flex h-[26px] w-[108px] items-center justify-end gap-1.5 rounded-full border border-inverse-foreground/10 bg-inverse px-2.5">
        <div className="size-2 rounded-full border border-inverse-foreground/10 bg-inverse-foreground/10" />
        <div className="size-1.5 rounded-full bg-info/60" />
      </div>

      {children}
    </div>
  )
}
