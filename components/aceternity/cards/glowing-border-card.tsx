"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlowingBorderCardProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  borderClassName?: string
  duration?: number
  glowColor?: string
}

export function GlowingBorderCard({
  children,
  className,
  containerClassName,
  borderClassName,
  duration = 4,
  glowColor = "rgba(59, 130, 246, 0.5)",
}: GlowingBorderCardProps) {
  return (
    <div className={cn("relative p-[2px]", containerClassName)}>
      {/* Animated border */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500",
          borderClassName
        )}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          filter: `blur(8px)`,
        }}
      />
      
      {/* Static border overlay for cleaner edges */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-50" />
      
      {/* Content */}
      <div
        className={cn(
          "relative rounded-xl bg-card p-6",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

// Simpler version with CSS-only glow
export function GlowingCard({
  children,
  className,
  containerClassName,
  glowIntensity = "medium",
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  glowIntensity?: "low" | "medium" | "high"
}) {
  const glowClasses = {
    low: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    medium: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
    high: "shadow-[0_0_50px_rgba(59,130,246,0.7)]",
  }

  return (
    <div className={cn("relative", containerClassName)}>
      <motion.div
        className={cn(
          "rounded-xl border border-blue-500/20 bg-card p-6 transition-shadow duration-300",
          glowClasses[glowIntensity],
          "hover:border-blue-500/40",
          className
        )}
        whileHover={{
          boxShadow: "0 0 50px rgba(59, 130, 246, 0.6)",
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

