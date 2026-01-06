"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  Bot,
  BookOpen,
  FileText,
  Bell,
  ClipboardCheck,
  Settings,
  Crown,
  Lock,
  ChevronLeft,
  ChevronRight,
  Shield,
  ArrowLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  proOnly?: boolean
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Professor Shield", href: "/dashboard/chat", icon: Bot },
  { title: "OWASP Learning", href: "/dashboard/owasp", icon: BookOpen },
  { title: "Security Briefings", href: "/dashboard/briefings", icon: FileText, proOnly: true },
  { title: "Threat Alerts", href: "/dashboard/alerts", icon: Bell, proOnly: true },
  { title: "Compliance Tracker", href: "/dashboard/compliance", icon: ClipboardCheck, proOnly: true },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, isPro, updateUserTier } = useUser()
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo - Links to Homepage with Tooltip */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!collapsed && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Shield className="h-8 w-8 text-primary" />
                    <span className="font-bold text-lg">SMBShield</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Go to Homepage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {collapsed && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="mx-auto hover:opacity-80 transition-opacity">
                    <Shield className="h-8 w-8 text-primary" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Go to Homepage</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn("h-8 w-8", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Prominent Back to Main Site Link */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 mx-3 mt-3 px-3 py-2.5 rounded-lg",
            "bg-primary/10 hover:bg-primary/20 text-primary",
            "border border-primary/30 hover:border-primary/50",
            "hover:shadow-md hover:shadow-primary/10",
            "transition-all duration-200",
            collapsed && "justify-center mx-2 px-2"
          )}
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <span className="text-sm font-medium">Back to Main Site</span>
          )}
        </Link>

        {/* Tier Badge */}
        {!collapsed && (
          <div className="border-b p-4 mt-3">
            <div className="flex items-center justify-between">
              <Badge
                variant={isPro ? "default" : "secondary"}
                className={cn(
                  "gap-1",
                  isPro && "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                )}
              >
                {isPro ? <Crown className="h-3 w-3" /> : null}
                {isPro ? "Pro Member" : "Guest"}
              </Badge>
              {!isPro && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => updateUserTier("pro")}
                >
                  Upgrade
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const isLocked = item.proOnly && !isPro

            return (
              <Link
                key={item.href}
                href={isLocked ? "#" : item.href}
                onClick={(e) => {
                  if (isLocked) {
                    e.preventDefault()
                    // Could trigger upgrade modal here
                  }
                }}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isLocked
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", isLocked && "opacity-50")} />
                {!collapsed && (
                  <>
                    <span className={cn("flex-1", isLocked && "opacity-50")}>{item.title}</span>
                    {isLocked && <Lock className="h-3 w-3 opacity-50" />}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t p-4">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-medium">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {isPro ? user.email : "Guest User"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-medium">{user.name.charAt(0)}</span>
              </div>
            </div>
          )}

          {/* Demo Toggle - for testing */}
          {!collapsed && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">Demo Mode:</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={!isPro ? "default" : "outline"}
                  className="flex-1 h-7 text-xs"
                  onClick={() => updateUserTier("guest")}
                >
                  Guest
                </Button>
                <Button
                  size="sm"
                  variant={isPro ? "default" : "outline"}
                  className="flex-1 h-7 text-xs"
                  onClick={() => updateUserTier("pro")}
                >
                  Pro
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
