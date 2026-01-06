"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScaleHoverProps {
  children: ReactNode
  scale?: number
  liftDistance?: number
  showShadow?: boolean
  className?: string
}

export function ScaleHover({
  children,
  scale = 1.02,
  liftDistance = -4,
  showShadow = true,
  className,
}: ScaleHoverProps) {
  return (
    <motion.div
      className={cn(className, showShadow && "shadow-md")}
      whileHover={{
        scale,
        y: liftDistance,
        boxShadow: showShadow ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : undefined,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}

