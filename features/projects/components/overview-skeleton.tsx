"use client"

import * as React from "react"

export function OverviewSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-48 rounded-lg bg-[#eceae4]" />
        <div className="h-4 w-72 rounded-md bg-[#eceae4]/70" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-5 h-28"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-[#eceae4]" />
              <div className="h-8 w-8 rounded-lg bg-[#eceae4]" />
            </div>
            <div className="h-6 w-16 rounded bg-[#eceae4]" />
          </div>
        ))}
      </div>

      {/* Onboarding / Banner skeleton */}
      <div className="h-44 w-full rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-6" />

      {/* Recent projects skeleton */}
      <div className="rounded-xl border border-[#eceae4] bg-[#fcfbf8] p-5">
        <div className="flex items-center justify-between border-b border-[#eceae4] pb-4">
          <div className="h-5 w-32 rounded bg-[#eceae4]" />
          <div className="h-4 w-16 rounded bg-[#eceae4]" />
        </div>
        <div className="divide-y divide-[#eceae4] pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-4">
              <div className="space-y-2">
                <div className="h-4 w-40 rounded bg-[#eceae4]" />
                <div className="h-3 w-56 rounded bg-[#eceae4]/60" />
              </div>
              <div className="h-8 w-24 rounded-lg bg-[#eceae4]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
