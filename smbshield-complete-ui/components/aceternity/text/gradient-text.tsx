"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
  colors?: string[]
}

export function GradientText({
  children,
  className,
  animate = true,
  colors = ["#3b82f6", "#06b6d4", "#a855f7"],
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
    backgroundSize: animate ? "200% auto" : "100% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  }

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={gradientStyle}
      animate={
        animate
          ? {
              backgroundPosition: ["0% center", "200% center", "0% center"],
            }
          : undefined
      }
      transition={
        animate
          ? {
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }
          : undefined
      }
    >
      {children}
    </motion.span>
  )
}

