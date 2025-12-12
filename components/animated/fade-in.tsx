"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  once?: boolean
  triggerOnScroll?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  once = true,
  triggerOnScroll = false,
}: FadeInProps) {
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }

  if (triggerOnScroll) {
    return (
      <motion.div
        {...animationProps}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once }}
        transition={{
          ...animationProps.transition,
          delay,
        }}
      >
        {children}
      </motion.div>
    )
  }

  return <motion.div {...animationProps}>{children}</motion.div>
}

