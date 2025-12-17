"use client"

import { Settings, User, Bell, Shield, Palette, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

const settingsSections = [
  {
    icon: User,
    title: "Profile",
    description: "Manage your account details and business information",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure alert preferences and email notifications",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Two-factor authentication and session management",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Theme preferences and display settings",
  },
  {
    icon: Globe,
    title: "Language & Region",
    description: "Localization and regional preferences",
  },
]

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Settings className="w-7 h-7 text-blue-400" />
          Settings
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsSections.map((section) => {
          const Icon = section.icon
          return (
            <div
              key={section.title}
              className={cn(
                "p-6 rounded-xl",
                "bg-slate-800/50 border border-slate-700/50",
                "hover:border-slate-600 hover:bg-slate-800/70",
                "transition-all duration-200 cursor-pointer group"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl",
                    "bg-slate-700/50 group-hover:bg-blue-500/20",
                    "flex items-center justify-center",
                    "transition-colors duration-200"
                  )}
                >
                  <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Danger Zone */}
      <div
        className={cn(
          "p-6 rounded-xl",
          "bg-red-500/5 border border-red-500/20"
        )}
      >
        <h3 className="font-medium text-red-400 mb-2">Danger Zone</h3>
        <p className="text-sm text-slate-400 mb-4">
          Irreversible actions that affect your account
        </p>
        <button
          className={cn(
            "px-4 py-2 rounded-lg text-sm",
            "bg-red-500/10 border border-red-500/30",
            "text-red-400 hover:bg-red-500/20",
            "transition-all duration-200"
          )}
        >
          Delete Account
        </button>
      </div>
    </div>
  )
}
