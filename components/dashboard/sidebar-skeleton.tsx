"use client"

import { Skeleton } from "@/components/ui/skeleton"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarSkeleton() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="space-y-3 border-b px-4 py-5">
        <Skeleton className="h-8 w-full" />
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-xl" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="h-8 w-full rounded-lg" />
      </SidebarHeader>
      <SidebarContent className="space-y-4 px-3 py-4">
        {[1, 2, 3].map((section) => (
          <SidebarGroup key={section}>
            <SidebarGroupLabel>
              <Skeleton className="h-4 w-20" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {[1, 2, 3].map((item) => (
                  <SidebarMenuItem key={item}>
                    <div className="flex h-11 items-center gap-2 rounded-lg px-3">
                      <Skeleton className="size-4" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <div className="space-y-4 border-t px-3 py-4">
        <Skeleton className="h-11 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </Sidebar>
  )
}

