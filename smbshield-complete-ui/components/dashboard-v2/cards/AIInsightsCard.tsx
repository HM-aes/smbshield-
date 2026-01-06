"use client"

import { Brain, Sparkles, RefreshCw, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MOCK_AI_INSIGHTS } from "../constants"
import Link from "next/link"

interface AIInsightsCardProps {
  onAskProfessor?: (context: string) => void
  isLoading?: boolean
  onRefresh?: () => void
}

export function AIInsightsCard({
  onAskProfessor,
  isLoading,
  onRefresh,
}: AIInsightsCardProps) {
  const insights = MOCK_AI_INSIGHTS

  return (
    <div
      className={cn(
        "relative p-6 rounded-xl",
        "bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-amber-500/5",
        "border border-amber-500/20",
        "backdrop-blur-sm"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2.5 rounded-xl",
              "bg-gradient-to-br from-amber-500 to-orange-500",
              "shadow-lg shadow-amber-500/25"
            )}
          >
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white flex items-center gap-2">
              AI Security Insights
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-500">
              Personalized recommendations based on your profile
            </p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={isLoading}
          className={cn(
            "p-2 rounded-lg",
            "text-slate-500 hover:text-amber-400",
            "hover:bg-amber-500/10",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
        </button>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={insight.id}
            className={cn(
              "p-4 rounded-lg",
              "bg-slate-800/50 border border-slate-700/50",
              "hover:border-amber-500/30 hover:bg-slate-800/70",
              "transition-all duration-200"
            )}
          >
            <div className="flex items-start gap-3">
              {/* Priority Badge */}
              <span
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-full",
                  "flex items-center justify-center",
                  "text-xs font-bold",
                  index === 0
                    ? "bg-amber-500/20 text-amber-400"
                    : "bg-slate-700 text-slate-400"
                )}
              >
                {insight.priority}
              </span>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white text-sm mb-1">
                  {insight.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {insight.description}
                </p>

                {insight.actionLabel && insight.actionHref && (
                  <Link
                    href={insight.actionHref}
                    className={cn(
                      "inline-flex items-center gap-1 mt-2",
                      "text-xs font-medium text-amber-400",
                      "hover:text-amber-300 transition-colors"
                    )}
                  >
                    {insight.actionLabel}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Professor Shield Button */}
      <Button
        onClick={() =>
          onAskProfessor?.(
            "Based on my current progress and saved content, what should I focus on?"
          )
        }
        className={cn(
          "w-full mt-4",
          "bg-gradient-to-r from-amber-500/20 to-orange-500/20",
          "border border-amber-500/30",
          "text-amber-400 hover:text-amber-300",
          "hover:from-amber-500/30 hover:to-orange-500/30",
          "hover:border-amber-500/50"
        )}
        variant="outline"
      >
        <Brain className="w-4 h-4 mr-2" />
        Ask Professor Shield about these
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      {/* Live Indicator */}
      <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <span className="text-[10px] text-slate-500">
          AI analysis updates based on your activity
        </span>
      </div>
    </div>
  )
}
