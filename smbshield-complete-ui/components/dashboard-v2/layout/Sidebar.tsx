"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, ChevronLeft, ChevronRight, LogOut, Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "../constants"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "h-screen flex flex-col",
        "bg-slate-900/95 backdrop-blur-md",
        "border-r border-slate-800/50",
        "transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex items-center justify-center",
              "w-10 h-10 rounded-xl",
              "bg-gradient-to-br from-blue-500 to-cyan-500",
              "shadow-lg shadow-blue-500/25"
            )}
          >
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SMBShield
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "transition-all duration-200",
                "group relative",
                isActive
                  ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/10 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-r-full" />
              )}

              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  isActive
                    ? "text-blue-400"
                    : "text-slate-500 group-hover:text-blue-400"
                )}
              />

              {!collapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">
                    {item.title}
                  </span>

                  {/* Badge */}
                  {item.badge && item.badge > 0 && (
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full",
                        "bg-blue-500/20 text-blue-400"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Pro Badge */}
                  {item.isPro && (
                    <Crown className="w-4 h-4 text-amber-400" />
                  )}

                  {/* New Badge */}
                  {item.isNew && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-green-500/20 text-green-400">
                      NEW
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div
                  className={cn(
                    "absolute left-full ml-2 px-2 py-1",
                    "bg-slate-800 text-white text-sm rounded",
                    "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
                    "transition-all duration-200 whitespace-nowrap z-50",
                    "shadow-lg"
                  )}
                >
                  {item.title}
                  {item.badge && item.badge > 0 && (
                    <span className="ml-2 text-blue-400">({item.badge})</span>
                  )}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className={cn(
          "mx-3 mb-3 p-2 rounded-lg",
          "text-slate-500 hover:text-white",
          "hover:bg-slate-800/50",
          "transition-all duration-200",
          "flex items-center justify-center"
        )}
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      {/* User Section */}
      <div className="p-3 border-t border-slate-800/50">
        <div
          className={cn(
            "p-3 rounded-xl",
            "bg-slate-800/50 backdrop-blur-sm",
            "border border-slate-700/50"
          )}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div
                className={cn(
                  "w-9 h-9 rounded-lg",
                  "bg-gradient-to-br from-blue-500 to-cyan-500",
                  "flex items-center justify-center",
                  "text-white font-semibold text-sm"
                )}
              >
                G
              </div>
              {/* Online Indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800" />
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Guest</p>
                <p className="text-xs text-slate-500">Demo Mode</p>
              </div>
            )}
          </div>

          {!collapsed && (
            <div className="mt-3 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full justify-center gap-2",
                  "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
                  "border-amber-500/30 text-amber-400",
                  "hover:from-amber-500/20 hover:to-orange-500/20",
                  "hover:border-amber-500/50"
                )}
              >
                <Crown className="w-4 h-4" />
                Upgrade to Pro
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-center gap-2 text-slate-500 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
