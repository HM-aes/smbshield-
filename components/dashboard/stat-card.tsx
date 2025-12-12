"use client"

import { motion } from "framer-motion"
import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/animated/animated-counter"
import { ScaleHover } from "@/components/animated/scale-hover"

interface DashboardStatCardProps {
  title: string
  value: number | string
  trend: "up" | "down"
  change: string
  description: string
}

export function DashboardStatCard({
  title,
  value,
  trend,
  change,
  description,
}: DashboardStatCardProps) {
  const isNumeric = typeof value === "number"
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDown
  const trendColor = trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <ScaleHover scale={1.02} liftDistance={-4}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Value */}
            <div className="mb-2 text-3xl font-bold">
              {isNumeric ? (
                <AnimatedCounter value={value} triggerOnScroll={true} />
              ) : (
                <span>{value}</span>
              )}
            </div>

            {/* Trend Indicator */}
            <div className="mb-2 flex items-center gap-2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  delay: 0.2,
                }}
              >
                <TrendIcon className={`h-4 w-4 ${trendColor}`} />
              </motion.div>
              <span className={`text-sm font-medium ${trendColor}`}>
                {change}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">{description}</p>
          </CardContent>
        </Card>
      </ScaleHover>
    </motion.div>
  )
}

