"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { FadeIn } from "../animated/fade-in"

const pricingPlans = [
  {
    name: "Free",
    tier: "Awareness",
    monthlyPrice: "€0",
    yearlyPrice: "€0",
    description: "Stay informed on AI security threats",
    features: [
      "Monthly threat digest",
      "OWASP Top 10 guide",
      "1 compliance template",
      "Community access",
    ],
    popular: false,
  },
  {
    name: "Pro",
    tier: "Defense",
    monthlyPrice: "€49",
    yearlyPrice: "€39",
    description: "Proactive protection for your business",
    badge: "Founding Member Pricing",
    features: [
      "Weekly security briefings",
      "Professor Shield AI (unlimited)",
      "Full template library",
      "Threat dashboard",
      "EU compliance tracker",
      "Priority support",
    ],
    popular: true,
  },
]

const Switch = ({ billingCycle, setBillingCycle }: { billingCycle: string; setBillingCycle: (cycle: string) => void }) => {
  return (
    <div className="relative mx-auto mt-8 flex w-fit items-center rounded-full border border-amber-500/20 bg-background/50 p-1">
      <button
        onClick={() => setBillingCycle("monthly")}
        className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
          billingCycle === "monthly" ? "text-black" : "text-muted-foreground"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => setBillingCycle("yearly")}
        className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
          billingCycle === "yearly" ? "text-black" : "text-muted-foreground"
        }`}
      >
        Yearly
      </button>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute inset-0 z-0 h-full w-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500"
        style={{
          left: billingCycle === "monthly" ? "0%" : "50%",
        }}
      />
      <span className="absolute -top-3 -right-4 z-20 -rotate-12 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-black">
        SAVE 20%
      </span>
    </div>
  )
}

function PricingCard({ plan, billingCycle, index }: { plan: typeof pricingPlans[0]; billingCycle: string; index: number }) {
  // Custom CTA text based on plan
  const ctaText = plan.name === "Free" ? "Start Learning Free" : "Get Weekly Intel";
  
  return (
    <FadeIn delay={(index + 1) * 0.1}>
      <div 
        className="group relative h-full"
        style={{ perspective: "1000px" }}
      >
        {/* Ambient glow on hover - same for both */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Card - identical styling for both */}
        <div
          className="relative flex h-full flex-col rounded-3xl border border-amber-500/20 p-8 transition-all duration-300 group-hover:border-amber-500/40"
          style={{ 
            backgroundColor: "#0a0a0a",
            transform: "translateZ(0)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px) rotateX(2deg) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(217, 119, 6, 0.25), 0 12px 24px -8px rgba(217, 119, 6, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateZ(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Popular badge - only for Pro */}
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1.5 text-sm font-bold text-black shadow-lg shadow-amber-500/25">
                <Sparkles className="h-4 w-4" />
                Most Popular
              </div>
            </div>
          )}
          
          {/* Header with tier label */}
          <div className={`rounded-2xl border border-amber-500/10 bg-amber-500/5 p-6 text-center ${plan.popular ? "mt-4" : ""}`}>
            <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full">
              {plan.tier}
            </span>
            <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
            {plan.badge && (
              <p className="mt-3 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1 rounded-full inline-block">
                🔒 {plan.badge}
              </p>
            )}
          </div>
          
          {/* Price - styled identically */}
          <div className="my-8 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={billingCycle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-baseline justify-center gap-1"
              >
                <span className="text-5xl font-bold text-amber-400">
                  {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-muted-foreground">/month</span>
              </motion.div>
            </AnimatePresence>
            {billingCycle === "yearly" && (
              <p className="mt-2 text-sm text-amber-400/80">Billed annually</p>
            )}
          </div>
          
          {/* Features - styled identically */}
          <ul className="flex-1 space-y-4">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          
          {/* CTA Button - tier-specific text */}
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="block w-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-center font-semibold text-black shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-500/40"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <section id="pricing" className="relative w-full overflow-hidden border-b border-border bg-background py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        <FadeIn>
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span className="text-sm font-medium text-amber-400">Pricing</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Simple, transparent{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                pricing
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that&apos;s right for your business.
            </p>
          </div>
          <Switch billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        </FadeIn>
        
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} billingCycle={billingCycle} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
