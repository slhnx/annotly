export function FooterWordmark() {
  return (
    <div
      className="pointer-events-none relative z-10 w-full overflow-hidden pt-16 select-none sm:pt-24 lg:pt-32"
    >
      <svg
        viewBox="0 0 1000 200"
        className="h-auto max-h-[300px] w-full translate-y-2 sm:translate-y-3 lg:max-h-[360px] lg:translate-y-4 xl:max-h-[440px]"
        preserveAspectRatio="xMidYBottom meet"
      >
        <text
          x="50%"
          y="94%"
          textAnchor="middle"
          className="fill-inverse-foreground font-heading font-extrabold tracking-[-0.04em]"
          fontSize="215"
        >
          ANNOTLY
        </text>
      </svg>
    </div>
  )
}
