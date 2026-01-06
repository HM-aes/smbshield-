"use client"

import Link from "next/link"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StatCardProps, StatVariant } from "../types"

const variantStyles: Record<StatVariant, { bg: string; border: string; icon: string; glow: string }> = {
  default: {
    bg: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    icon: "from-blue-500 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
  },
  success: {
    bg: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/20 hover:border-green-500/40",
    icon: "from-green-500 to-emerald-500",
    glow: "group-hover:shadow-green-500/20",
  },
  warning: {
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/20 hover:border-amber-500/40",
    icon: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/20",
  },
  danger: {
    bg: "from-red-500/10 to-rose-500/10",
    border: "border-red-500/20 hover:border-red-500/40",
    icon: "from-red-500 to-rose-500",
    glow: "group-hover:shadow-red-500/20",
  },
}

export function StatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  variant = "default",
  trend,
  trendValue,
  href,
}: StatCardProps) {
  const styles = variantStyles[variant]

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus

  const content = (
    <div
      className={cn(
        "group relative p-5 rounded-xl",
        "bg-gradient-to-br",
        styles.bg,
        "border",
        styles.border,
        "backdrop-blur-sm",
        "transition-all duration-300",
        "hover:scale-[1.02]",
        "shadow-lg",
        styles.glow,
        href && "cursor-pointer"
      )}
    >
      {/* Background Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100",
          "bg-gradient-to-br",
          styles.bg,
          "blur-xl transition-opacity duration-300 -z-10"
        )}
      />

      <div className="flex items-start justify-between">
        {/* Content */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {/* Icon */}
        <div
          className={cn(
            "p-3 rounded-xl",
            "bg-gradient-to-br",
            styles.icon,
            "shadow-lg",
            "transition-transform duration-300",
            "group-hover:scale-110"
          )}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Trend Indicator */}
      {trend && trendValue && (
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <div className="flex items-center gap-1">
            <TrendIcon
              className={cn(
                "w-4 h-4",
                trend === "up" && "text-green-400",
                trend === "down" && "text-red-400",
                trend === "neutral" && "text-slate-400"
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                trend === "up" && "text-green-400",
                trend === "down" && "text-red-400",
                trend === "neutral" && "text-slate-400"
              )}
            >
              {trendValue}
            </span>
            <span className="text-xs text-slate-500 ml-1">vs last month</span>
          </div>
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
