"use client"

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  triggerOnScroll?: boolean
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  decimals = 0,
  suffix = "",
  triggerOnScroll = true,
  className,
}: AnimatedCounterProps) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const display = useTransform(spring, (current) =>
    `${Number(current.toFixed(decimals))}${suffix}`
  )
  const [displayValue, setDisplayValue] = useState(`0${decimals > 0 ? "." + "0".repeat(decimals) : ""}${suffix}`)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (triggerOnScroll) {
      if (isInView && !hasAnimated.current) {
        motionValue.set(value)
        hasAnimated.current = true
      }
    } else {
      motionValue.set(value)
    }
  }, [value, motionValue, triggerOnScroll, isInView])

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [display])

  return (
    <motion.span ref={ref} className={cn(className)}>
      {displayValue}
    </motion.span>
  )
}

