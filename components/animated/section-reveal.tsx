"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  /** Custom class for the wrapper */
  className?: string;
  /** Animation delay in seconds */
  delay?: number;
  /** Distance to slide up in pixels */
  slideDistance?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Viewport margin for trigger */
  viewportMargin?: string;
  /** Direction of slide animation */
  direction?: "up" | "down" | "left" | "right";
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  slideDistance = 60,
  duration = 0.7,
  viewportMargin = "-50px",
  direction = "up",
}: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: slideDistance, x: 0 };
      case "down":
        return { y: -slideDistance, x: 0 };
      case "left":
        return { y: 0, x: slideDistance };
      case "right":
        return { y: 0, x: -slideDistance };
      default:
        return { y: slideDistance, x: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  // Respect user's reduced motion preference
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: initialPosition.y,
        x: initialPosition.x,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Container that staggers children animations
 */
interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay between each child animation */
  staggerDelay?: number;
  /** Initial delay before first child animates */
  initialDelay?: number;
  /** Viewport margin for trigger */
  viewportMargin?: string;
}

export function StaggerReveal({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
  viewportMargin = "-50px",
}: StaggerRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: initialDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
