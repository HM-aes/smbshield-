"use client"

import * as React from "react"
import { type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { UserProvider, useUser } from "@/contexts/user-context"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { ErrorBoundary } from "@/components/dashboard/error-boundary"
import { PageTransition } from "@/components/transitions/page-transition"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TooltipProvider } from "@/components/ui/tooltip"

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/chat": "AI Security Assistant",
  "/dashboard/owasp": "OWASP Top 10 Learning",
  "/dashboard/briefings": "Security Briefings",
  "/dashboard/notifications": "Threat Alerts",
  "/dashboard/saved": "Compliance Tracker",
  "/dashboard/settings": "Settings",
  "/dashboard/profile": "Profile",
}

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const activePage = routeTitles[pathname] ?? "Dashboard"
  const { user, updateUserTier, signOut } = useUser()

  const handleTierChange = React.useCallback(
    (tier: "guest" | "free" | "pro") => {
      updateUserTier(tier)
    },
    [updateUserTier]
  )

  return (
    <TooltipProvider delayDuration={300}>
      <SidebarProvider>
        <AppSidebar
          userTier={user.tier}
          userName={user.name}
          userEmail={user.email}
          userAvatar={user.avatar}
          onSignOut={signOut}
        />
        <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger aria-label="Toggle sidebar" />
          <div className="flex flex-1 items-center justify-between gap-4">
            <h1 className="text-lg font-semibold">{activePage}</h1>
            <div className="flex items-center gap-3">
              <Select
                value={user.tier}
                onValueChange={handleTierChange}
                aria-label="Select user tier"
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="User tier" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="guest">Guest</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <ErrorBoundary>
            <PageTransition>{children}</PageTransition>
          </ErrorBoundary>
        </main>
      </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </UserProvider>
  )
}

