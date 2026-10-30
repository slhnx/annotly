"use client"

import { Palette, Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { SettingsSection } from "./settings-section"
import { cn } from "@/lib/utils"

const THEMES = [
  { value: "light", label: "Light", description: "Warm parchment & charcoal theme", icon: Sun },
  { value: "dark", label: "Dark", description: "Deep charcoal with warm accents", icon: Moon },
  { value: "system", label: "System", description: "Sync with your device preference", icon: Monitor },
] as const

export function AppearanceSection() {
  const { theme, setTheme } = useTheme()

  return (
    <SettingsSection
      icon={Palette}
      title="Appearance & Theme"
      description="Customize how the Annotly dashboard and canvas workspace appear"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {THEMES.map(({ value, label, description, icon: Icon }) => {
          const isSelected = theme === value
          return (
            <button
              key={value}
              type="button"
              onClick={() => setTheme(value)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all cursor-pointer",
                isSelected
                  ? "border-primary bg-accent/60 shadow-xs ring-1 ring-primary/20"
                  : "border-border bg-card hover:border-border-interactive hover:bg-accent/30"
              )}
            >
              <div className="flex w-full items-center justify-between">
                <div className={cn("flex size-8 items-center justify-center rounded-lg border", isSelected ? "border-primary/20 bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground")}>
                  <Icon className="size-4" />
                </div>
                {isSelected && (
                  <span className="size-2 rounded-full bg-primary" />
                )}
              </div>
              <div>
                <span className="text-xs font-semibold text-foreground">{label}</span>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </SettingsSection>
  )
}
