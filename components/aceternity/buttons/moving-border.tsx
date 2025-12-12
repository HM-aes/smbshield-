"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MovingBorderProps {
  children: React.ReactNode
  duration?: number
  className?: string
  containerClassName?: string
  borderClassName?: string
}

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
}: MovingBorderProps) {
  return (
    <button
      className={cn(
        "relative h-16 w-40 overflow-hidden rounded-lg bg-transparent p-[1px] text-xl",
        containerClassName
      )}
    >
      <div
        className="absolute inset-0"
        style={{ padding: "2px" }}
      >
        <motion.div
          className={cn(
            "absolute inset-0 rounded-lg",
            borderClassName
          )}
          style={{
            background:
              "linear-gradient(90deg, #3b82f6, #06b6d4, #a855f7, #3b82f6)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-lg bg-card text-sm text-card-foreground antialiased backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </button>
  )
}

// Alternative button component with custom border radius
export function MovingBorderButton({
  borderRadius = "1.75rem",
  children,
  containerClassName,
  borderClassName,
  duration = 4000,
  className,
}: {
  borderRadius?: string
  children: React.ReactNode
  containerClassName?: string
  borderClassName?: string
  duration?: number
  className?: string
}) {
  return (
    <button
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <motion.div
          className={cn("absolute inset-0", borderClassName)}
          style={{
            background:
              "linear-gradient(90deg, #3b82f6, #06b6d4, #a855f7, #3b82f6)",
            backgroundSize: "400% 400%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: duration / 1000,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-[inherit] bg-card text-sm text-card-foreground antialiased backdrop-blur-xl",
          className
        )}
      >
        {children}
      </div>
    </button>
  )
}

