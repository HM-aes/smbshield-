"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "../animated/fade-in"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

const pricingPlans = [
  {
    name: "Free",
    monthlyPrice: "€0",
    yearlyPrice: "€0",
    description: "Perfect for getting started",
    features: [
      "Monthly security briefings",
      "OWASP Top 10 updates",
      "Basic threat intelligence",
      "Email delivery",
    ],
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: "€49",
    yearlyPrice: "€39",
    description: "For proactive security",
    features: [
      "Weekly security briefings",
      "Priority intelligence",
      "GenAI threat analysis",
      "EU compliance updates",
      "Dashboard access",
      "Custom alerts",
    ],
    popular: true,
  },
]

const Switch = ({ billingCycle, setBillingCycle }) => {
  return (
    <div className="relative mx-auto mt-8 flex w-fit items-center rounded-full bg-muted p-1">
      <button
        onClick={() => setBillingCycle("monthly")}
        className={cn(
          "relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors",
          billingCycle === "monthly" ? "text-white" : "text-muted-foreground"
        )}
      >
        Monthly
      </button>
      <button
        onClick={() => setBillingCycle("yearly")}
        className={cn(
          "relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors",
          billingCycle === "yearly" ? "text-white" : "text-muted-foreground"
        )}
      >
        Yearly
      </button>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute inset-0 z-0 h-full w-1/2 rounded-full bg-primary"
        style={{
          left: billingCycle === "monthly" ? "0%" : "50%",
        }}
      />
       <Badge variant="secondary" className="absolute -top-4 -right-8 z-20 -rotate-12">SAVE 20%</Badge>
    </div>
  )
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for your business.
            </p>
          </div>
          <Switch billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        </FadeIn>
        
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, index) => (
            <FadeIn key={index} delay={(index + 1) * 0.1}>
              <Card className={cn("h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl", plan.popular ? "border-2 border-primary shadow-xl" : "")}>
                {plan.popular && (
                  <div className="rounded-t-xl bg-primary py-2 text-center text-sm font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4 flex items-baseline">
                     <AnimatePresence mode="wait">
                      <motion.span
                        key={billingCycle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold"
                      >
                        {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mt-8"
                  >
                    <Button
                      className="w-full"
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href="/dashboard">Get Started</Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
