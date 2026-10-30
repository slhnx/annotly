import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { requireUser } from "@/lib/auth/server"
import { Button } from "@/components/ui/button"
import { NewProjectForm } from "@/features/projects/components/new-project-form"
import { UrlRequirementsCard } from "@/features/projects/components/url-requirements-card"

export const metadata = {
  title: "New Review Project | Annotly",
  description: "Set up a new website review canvas for visual feedback and client collaboration.",
}

export default async function NewProjectPage() {
  await requireUser()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="size-8 p-0 text-muted-foreground hover:text-foreground"
              nativeButton={false}
              render={<Link href="/dashboard/projects" />}
            >
              <ArrowLeft className="size-4" />
              <span className="sr-only">Back to Projects</span>
            </Button>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Create Review Project
            </h1>
          </div>
          <p className="text-xs text-muted-foreground pl-10">
            Configure target website details to initialize an interactive zero-install review canvas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <NewProjectForm />
        </div>
        <div className="lg:col-span-5">
          <UrlRequirementsCard />
        </div>
      </div>
    </div>
  )
}
