"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  duration?: number
  triggerOnScroll?: boolean
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  duration = 0.5,
  triggerOnScroll = false,
  className,
}: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        duration: duration,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const motionProps = {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible",
    className: cn(className),
  }

  if (triggerOnScroll) {
    return (
      <motion.div
        {...motionProps}
        whileInView="visible"
        viewport={{ once: true }}
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={itemVariants}>{children}</motion.div>}
      </motion.div>
    )
  }

  return (
    <motion.div {...motionProps}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  )
}

