"use client"

import { Bell, AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: "1",
    type: "critical",
    title: "Critical CVE Detected",
    description: "CVE-2025-XXXX affects technologies in your tech stack. Immediate action required.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "New Ransomware Campaign",
    description: "A new ransomware variant is targeting European SMBs in your industry.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Weekly Briefing Available",
    description: "Your personalized security briefing for this week is ready to view.",
    time: "1 day ago",
    read: true,
  },
  {
    id: "4",
    type: "success",
    title: "OWASP Module Completed",
    description: "Congratulations! You've completed the A02: Cryptographic Failures module.",
    time: "2 days ago",
    read: true,
  },
]

const alertStyles = {
  critical: {
    icon: XCircle,
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    iconColor: "text-red-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  info: {
    icon: Info,
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  success: {
    icon: CheckCircle2,
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    iconColor: "text-green-400",
  },
}

export default function AlertsPage() {
  const unreadCount = alerts.filter((a) => !a.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="w-7 h-7 text-blue-400" />
            Security Alerts
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 text-sm font-medium rounded-full bg-red-500/20 text-red-400">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-slate-400 mt-1">
            Important notifications and security updates
          </p>
        </div>
        <button
          className={cn(
            "px-4 py-2 rounded-lg text-sm",
            "text-slate-400 hover:text-white",
            "hover:bg-slate-800/50 transition-all"
          )}
        >
          Mark all as read
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => {
          const style = alertStyles[alert.type as keyof typeof alertStyles]
          const Icon = style.icon

          return (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-xl",
                "border",
                style.bg,
                style.border,
                "hover:bg-opacity-20 transition-all cursor-pointer",
                !alert.read && "ring-1 ring-white/10"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    style.bg
                  )}
                >
                  <Icon className={cn("w-5 h-5", style.iconColor)} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white">{alert.title}</h3>
                    {!alert.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <p className="text-sm text-slate-400">{alert.description}</p>
                  <p className="text-xs text-slate-500 mt-2">{alert.time}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
