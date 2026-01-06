"use client"

import { Newspaper, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThreatCard } from "@/components/dashboard-v2/cards/ThreatCard"
import { MOCK_THREATS } from "@/components/dashboard-v2/constants"

const categories = ["All", "LLM Security", "Compliance", "CVE", "Ransomware", "AI Threats"]

export default function NewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Newspaper className="w-7 h-7 text-blue-400" />
          Security News Feed
        </h1>
        <p className="text-slate-400 mt-1">
          Latest threats, vulnerabilities, and security updates
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className={cn(
              "px-4 py-2 rounded-lg text-sm whitespace-nowrap",
              "transition-all duration-200",
              category === "All"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:text-white hover:border-slate-600"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {MOCK_THREATS.map((threat) => (
          <ThreatCard key={threat.id} threat={threat} fullWidth />
        ))}
      </div>
    </div>
  )
}
