"use client"

import * as React from "react"
import { HelpCircle, Keyboard, Sparkles, Lock } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface EnhancedTooltipProps {
  /**
   * The main title/name of the feature
   */
  title: string
  
  /**
   * Detailed description of the feature
   */
  description?: string
  
  /**
   * Keyboard shortcut hint (e.g., "⌘K" or "Ctrl+K")
   */
  keyboardShortcut?: string
  
  /**
   * Whether the feature is locked
   */
  isLocked?: boolean
  
  /**
   * Required tier to unlock (e.g., "Pro", "Free")
   */
  requiredTier?: string
  
  /**
   * Whether this is a new feature
   */
  isNew?: boolean
  
  /**
   * Whether this is a pro feature
   */
  isPro?: boolean
  
  /**
   * Coming soon badge
   */
  comingSoon?: boolean
  
  /**
   * Custom content to display in tooltip
   */
  children?: React.ReactNode
  
  /**
   * Tooltip side position
   */
  side?: "top" | "right" | "bottom" | "left"
  
  /**
   * Additional className for the tooltip content
   */
  className?: string
}

/**
 * Enhanced tooltip component with support for descriptions, keyboard shortcuts,
 * locked features, and "What's New" indicators
 */
export function EnhancedTooltip({
  title,
  description,
  keyboardShortcut,
  isLocked,
  requiredTier,
  isNew,
  isPro,
  comingSoon,
  children,
  side = "right",
  className,
}: EnhancedTooltipProps) {
  return (
    <TooltipContent
      side={side}
      className={cn("max-w-xs space-y-2 p-3", className)}
    >
      {/* Title with badges */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">{title}</span>
        {isNew && (
          <Badge
            variant="outline"
            className="border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-50 text-[10px] px-1.5 py-0"
          >
            NEW
          </Badge>
        )}
        {isPro && (
          <Badge
            variant="outline"
            className="border-amber-400 bg-gradient-to-r from-amber-200/80 to-amber-50 text-amber-900 dark:border-amber-400/80 dark:from-amber-500/30 dark:to-amber-300/10 dark:text-amber-50 text-[10px] px-1.5 py-0"
          >
            PRO
          </Badge>
        )}
        {comingSoon && (
          <Badge
            variant="outline"
            className="border-blue-400 bg-blue-50 text-blue-900 dark:border-blue-500 dark:bg-blue-500/15 dark:text-blue-50 text-[10px] px-1.5 py-0"
          >
            SOON
          </Badge>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}

      {/* Locked feature message */}
      {isLocked && requiredTier && (
        <div className="flex items-start gap-2 rounded-md bg-muted/50 p-2 text-xs">
          <Lock className="size-3.5 mt-0.5 flex-shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">
            Requires <span className="font-semibold">{requiredTier}</span> plan
          </span>
        </div>
      )}

      {/* Keyboard shortcut */}
      {keyboardShortcut && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Keyboard className="size-3.5" />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            {keyboardShortcut}
          </kbd>
        </div>
      )}

      {/* Custom children content */}
      {children}
    </TooltipContent>
  )
}

/**
 * Help icon with tooltip for contextual help
 */
export interface HelpTooltipProps {
  content: string
  title?: string
  className?: string
  iconClassName?: string
  side?: "top" | "right" | "bottom" | "left"
}

export function HelpTooltip({
  content,
  title,
  className,
  iconClassName,
  side = "top",
}: HelpTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            className
          )}
          aria-label="Help"
        >
          <HelpCircle className={cn("size-3.5", iconClassName)} />
        </button>
      </TooltipTrigger>
      <TooltipContent side={side} className="max-w-xs">
        {title && <p className="font-semibold text-sm mb-1">{title}</p>}
        <p className="text-xs text-muted-foreground leading-relaxed">
          {content}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

/**
 * Onboarding tooltip that can be dismissed
 */
export interface OnboardingTooltipProps {
  children: React.ReactNode
  content: string
  title?: string
  show: boolean
  onDismiss: () => void
  side?: "top" | "right" | "bottom" | "left"
  className?: string
}

export function OnboardingTooltip({
  children,
  content,
  title,
  show,
  onDismiss,
  side = "right",
  className,
}: OnboardingTooltipProps) {
  const [open, setOpen] = React.useState(show)

  React.useEffect(() => {
    setOpen(show)
  }, [show])

  const handleDismiss = () => {
    setOpen(false)
    onDismiss()
  }

  if (!show) {
    return <>{children}</>
  }

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        className={cn("max-w-xs space-y-3 p-4", className)}
      >
        <div className="flex items-start gap-2">
          <Sparkles className="size-4 mt-0.5 flex-shrink-0 text-primary" />
          <div className="space-y-1">
            {title && <p className="font-semibold text-sm">{title}</p>}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {content}
            </p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="w-full rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          Got it!
        </button>
      </TooltipContent>
    </Tooltip>
  )
}

