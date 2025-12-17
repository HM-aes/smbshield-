"use client"

import { ExternalLink, AlertTriangle, Shield, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { SEVERITY_COLORS } from "../constants"
import type { ThreatCard as ThreatCardType } from "../types"

interface ThreatCardProps {
  threat: ThreatCardType
  onClick?: () => void
  fullWidth?: boolean
}

export function ThreatCard({ threat, onClick, fullWidth }: ThreatCardProps) {
  const severityStyle = threat.severity
    ? SEVERITY_COLORS[threat.severity]
    : null

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl",
        fullWidth ? "w-full" : "flex-shrink-0 w-[280px]",
        "bg-slate-800/50 border border-slate-700/50",
        "backdrop-blur-sm",
        "hover:border-slate-600 hover:bg-slate-800/70",
        "transition-all duration-200",
        "cursor-pointer group"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {/* Severity Badge */}
          {severityStyle && (
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-semibold uppercase",
                severityStyle.bg,
                severityStyle.text,
                severityStyle.border,
                "border"
              )}
            >
              {threat.severity}
            </span>
          )}

          {/* CVE Score */}
          {threat.cveScore && (
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[10px] font-mono font-bold",
                threat.cveScore >= 9
                  ? "bg-red-500/20 text-red-400"
                  : threat.cveScore >= 7
                  ? "bg-orange-500/20 text-orange-400"
                  : "bg-amber-500/20 text-amber-400"
              )}
            >
              CVSS {threat.cveScore}
            </span>
          )}
        </div>

        {/* External Link */}
        {threat.url && (
          <a
            href={threat.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "p-1.5 rounded-lg",
              "text-slate-500 hover:text-white",
              "hover:bg-slate-700/50",
              "opacity-0 group-hover:opacity-100",
              "transition-all duration-200"
            )}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Title */}
      <h4 className="font-medium text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
        {threat.title}
      </h4>

      {/* Summary */}
      {threat.summary && (
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
          {threat.summary}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          {/* Category */}
          <span
            className={cn(
              "px-2 py-0.5 rounded text-[10px] font-medium",
              "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            )}
          >
            {threat.category}
          </span>
        </div>

        {/* Source & Time */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <Clock className="w-3 h-3" />
          <span>{threat.timeAgo}</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">{threat.source}</span>
        </div>
      </div>
    </div>
  )
}
