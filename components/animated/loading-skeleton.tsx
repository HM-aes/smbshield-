"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSkeletonProps {
  variant?: "text" | "card" | "avatar" | "button"
  className?: string
}

const variantStyles = {
  text: "h-4 rounded",
  card: "h-48 rounded-xl",
  avatar: "h-12 w-12 rounded-full",
  button: "h-10 rounded-lg",
}

export function LoadingSkeleton({ variant = "text", className }: LoadingSkeletonProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", variantStyles[variant], className)}>
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10"
        animate={{
          x: ["0%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

