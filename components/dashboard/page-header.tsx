"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  backLabel?: string
  className?: string
  children?: React.ReactNode
}

export function PageHeader({
  title,
  description,
  backHref = "/dashboard",
  backLabel = "Dashboard",
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {/* Back Navigation */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>← {backLabel}</span>
      </Link>

      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
