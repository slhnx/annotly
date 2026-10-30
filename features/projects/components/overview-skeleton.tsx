import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

function StatCardSkeleton() {
  return (
    <Card className="h-28 justify-between gap-0 p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="size-8 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-16" />
    </Card>
  )
}

function RecentProjectRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-56" />
      </div>
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
  )
}

export function OverviewSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading dashboard">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-lg" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <Skeleton className="h-44 w-full rounded-xl" />

      <Card className="gap-0 p-5">
        <div className="flex items-center justify-between pb-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Separator />
        <div className="pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              {i > 1 && <Separator />}
              <RecentProjectRowSkeleton />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
