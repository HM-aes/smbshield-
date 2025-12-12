"use client"

import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/animated/animated-counter"

const stats = [
  {
    value: 43,
    suffix: "%",
    label: "of SMBs experienced a cyberattack in 2023",
  },
  {
    value: 60,
    suffix: "%",
    label: "of small companies close within 6 months of an attack",
  },
  {
    value: 10,
    suffix: "K",
    prefix: "€",
    label: "average cost of a data breach for European SMBs",
  },
]

export function StatsSection() {
  return (
    <section className="border-y bg-muted/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <div className="inline-block rounded-lg bg-card px-6 py-3 shadow-sm">
                <div className="text-4xl font-bold">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    triggerOnScroll={true}
                    className="inline-block"
                  />
                </div>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

