"use client"

import { Library, Filter, Download, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Library className="w-7 h-7 text-blue-400" />
            My Library
          </h1>
          <p className="text-slate-400 mt-1">
            Your saved content, downloads, and shared items
          </p>
        </div>
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg",
            "bg-blue-500/10 border border-blue-500/30",
            "text-blue-400 hover:text-blue-300",
            "hover:bg-blue-500/20 transition-all"
          )}
        >
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg flex-1 max-w-md",
              "bg-slate-800/50 border border-slate-700/50",
              "focus-within:border-blue-500/50"
            )}
          >
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search library..."
              className="bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none flex-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {["All", "Downloaded", "Bookmarked", "Shared"].map((filter) => (
            <button
              key={filter}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm",
                filter === "All"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className={cn(
            "w-16 h-16 rounded-2xl mb-4",
            "bg-slate-800/50 border border-slate-700/50",
            "flex items-center justify-center"
          )}
        >
          <Library className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Your library is empty
        </h3>
        <p className="text-sm text-slate-400 max-w-md">
          Save OWASP modules, security briefings, and chat conversations to build your personal security knowledge base.
        </p>
      </div>
    </div>
  )
}
