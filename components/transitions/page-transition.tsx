"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageTransitionProps {
  children: ReactNode
  duration?: number
  className?: string
}

export function PageTransition({
  children,
  duration = 0.3,
  className,
}: PageTransitionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration,
      }}
    >
      {children}
    </motion.div>
  )
}

