"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  /** Custom class for container */
  className?: string;
  /** Variant style */
  variant?: "gradient" | "simple" | "glow";
  /** Show diamond accent in center */
  showAccent?: boolean;
  /** Delay before animation starts */
  delay?: number;
}

export function SectionDivider({
  className = "",
  variant = "gradient",
  showAccent = true,
  delay = 0,
}: SectionDividerProps) {
  return (
    <div className={`relative py-12 md:py-16 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          {/* Left Line - Expands from center */}
          <motion.div
            className="absolute right-1/2 h-px origin-right"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div
              className={`w-[40vw] max-w-md h-px ${
                variant === "gradient"
                  ? "bg-gradient-to-l from-amber-500/60 via-amber-400/30 to-transparent"
                  : variant === "glow"
                  ? "bg-gradient-to-l from-amber-400/80 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "bg-gradient-to-l from-border to-transparent"
              }`}
            />
          </motion.div>

          {/* Right Line - Expands from center */}
          <motion.div
            className="absolute left-1/2 h-px origin-left"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.8,
              delay: delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <div
              className={`w-[40vw] max-w-md h-px ${
                variant === "gradient"
                  ? "bg-gradient-to-r from-amber-500/60 via-amber-400/30 to-transparent"
                  : variant === "glow"
                  ? "bg-gradient-to-r from-amber-400/80 to-transparent shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  : "bg-gradient-to-r from-border to-transparent"
              }`}
            />
          </motion.div>

          {/* Center Accent */}
          {showAccent && (
            <motion.div
              className="relative z-10"
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: delay + 0.3,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {/* Diamond Shape */}
              <div className="relative">
                <div
                  className={`w-3 h-3 rotate-45 ${
                    variant === "gradient" || variant === "glow"
                      ? "bg-gradient-to-br from-amber-400 to-amber-600"
                      : "bg-border"
                  }`}
                />
                {/* Glow effect */}
                {(variant === "gradient" || variant === "glow") && (
                  <motion.div
                    className="absolute inset-0 w-3 h-3 rotate-45 bg-amber-400/50 blur-md"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Subtle background glow */}
      {variant === "glow" && (
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-20 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2 }}
        />
      )}
    </div>
  );
}
