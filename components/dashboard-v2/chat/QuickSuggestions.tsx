"use client"

import { cn } from "@/lib/utils"
import { QUICK_SUGGESTIONS } from "../constants"

interface QuickSuggestionsProps {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function QuickSuggestions({ onSelect, disabled }: QuickSuggestionsProps) {
  return (
    <div className="px-4 py-3 border-t border-slate-700/50">
      <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
      <div className="flex flex-wrap gap-2">
        {QUICK_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.label}
            onClick={() => onSelect(suggestion.prompt)}
            disabled={disabled}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium",
              "bg-slate-800/50 border border-slate-700/50",
              "text-slate-400 hover:text-white",
              "hover:bg-slate-700/50 hover:border-blue-500/30",
              "transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  )
}
