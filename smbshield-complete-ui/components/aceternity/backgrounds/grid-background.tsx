"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  className?: string
  children?: React.ReactNode
  gridSize?: number
  dotSize?: number
  dotColor?: string
  fadeColor?: string
  type?: "dots" | "grid"
}

export function GridBackground({
  className,
  children,
  gridSize = 50,
  dotSize = 1.2,
  dotColor = "#6b7280",
  fadeColor = "transparent",
  type = "dots",
}: GridBackgroundProps) {
  const maskStyle =
    "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)"

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        style={{
          maskImage: maskStyle,
          WebkitMaskImage: maskStyle,
        }}
      >
        {type === "dots" ? (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, ${fadeColor} ${dotSize}px)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }}
          />
        ) : (
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(${dotColor} 1px, transparent 1px), linear-gradient(to right, ${dotColor} 1px, ${fadeColor} 1px)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }}
          />
        )}
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}

