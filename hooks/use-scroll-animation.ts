"use client"

import { useInView } from "framer-motion"
import { RefObject } from "react"

interface UseScrollAnimationOptions {
  /**
   * Whether the animation should trigger only once
   * @default false
   */
  once?: boolean

  /**
   * Amount of the element that needs to be visible (0-1)
   * @default 0.3
   */
  amount?: number

  /**
   * Margin around the viewport (e.g., "100px", "50%")
   * @default "0px"
   */
  margin?: string
}

/**
 * Custom hook for scroll animations using Framer Motion
 * 
 * @param ref - React ref to the element to observe
 * @param options - Configuration options for the scroll animation
 * @returns boolean indicating if the element is in view
 * 
 * @example
 * ```tsx
 * const ref = useRef(null)
 * const isInView = useScrollAnimation(ref, { once: true })
 * ```
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  options: UseScrollAnimationOptions = {}
): boolean {
  const { once = false, amount = 0.3, margin = "0px" } = options

  const isInView = useInView(ref, {
    once,
    amount,
    margin,
  })

  return isInView
}

