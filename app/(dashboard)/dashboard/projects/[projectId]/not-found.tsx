import Link from "next/link"
import { ArrowLeft, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center justify-center p-4">
      <Card className="w-full border-border bg-card text-center">
        <CardContent className="flex flex-col items-center p-6 sm:p-8">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <FileQuestion className="size-6 text-foreground" />
          </div>

          <h2 className="mt-4 font-heading text-lg font-bold text-foreground">
            Project Not Found
          </h2>

          <p className="mt-2 text-xs text-muted-foreground">
            The requested review project could not be found or you do not have permission to access it.
          </p>

          <Button
            size="sm"
            className="mt-6 gap-1.5 text-xs font-semibold"
            nativeButton={false}
            render={<Link href="/dashboard/projects" />}
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Projects</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
