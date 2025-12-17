"use client"

import { ReactNode, useState } from "react"
import { Sidebar } from "./Sidebar"
import { ChatPanel } from "../chat/ChatPanel"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [chatOpen, setChatOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      {/* Left Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300",
          "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        )}
      >
        <div className="min-h-full p-6">{children}</div>
      </main>

      {/* Right Chat Panel - Desktop */}
      <div className="hidden lg:block">
        <ChatPanel isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
      </div>

      {/* Mobile Chat FAB */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className={cn(
          "lg:hidden fixed bottom-6 right-6 z-50",
          "w-14 h-14 rounded-full",
          "bg-gradient-to-r from-blue-500 to-cyan-500",
          "flex items-center justify-center",
          "shadow-lg shadow-blue-500/25",
          "hover:shadow-xl hover:shadow-blue-500/30",
          "hover:scale-105 transition-all duration-200"
        )}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Mobile Chat Panel - Slide Over */}
      {chatOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setChatOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md">
            <ChatPanel
              isOpen={chatOpen}
              onToggle={() => setChatOpen(false)}
              isMobile
            />
          </div>
        </div>
      )}
    </div>
  )
}
