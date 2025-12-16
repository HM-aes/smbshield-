"use client"

import Link from "next/link"
import { Check, X, ArrowRight, Shield, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Visitor",
    id: "tier-visitor",
    href: "/dashboard", // Redirects to visitor dashboard
    priceMonthly: "$0",
    description: "Essential intelligence for curious minds and small teams starting their journey.",
    features: [
      "Access to public security articles",
      "Limited weekly briefing summaries",
      "Basic community forum access",
      "Email support",
    ],
    notIncluded: [
      "OWASP Security Agent (Chatbot)",
      "Real-time threat monitoring",
      "Automated compliance reports",
      "Priority expert analysis",
    ],
    featured: false,
    cta: "Continue as Visitor",
  },
  {
    name: "Pro Member",
    id: "tier-pro",
    href: "/dashboard?upgrade=true", // In a real app, this would go to Stripe
    priceMonthly: "$49",
    description: "Complete defense system for SMBs requiring active protection and compliance.",
    features: [
      "Unlimited OWASP Agent access",
      "Real-time threat monitoring dashboard",
      "Weekly detailed intelligence briefings",
      "Automated compliance reporting (GDPR/EU AI Act)",
      "Priority expert analysis",
      "Full community access",
    ],
    notIncluded: [],
    featured: true,
    cta: "Upgrade to Pro",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
        </div>
        
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Simple, transparent pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Choose your defense level
          </p>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            From educational resources to active AI defense agents. Select the plan that fits your business needs.
          </p>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 lg:px-8">
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "flex flex-col justify-between rounded-3xl p-8 ring-1 xl:p-10 transition-all duration-300",
                tier.featured
                  ? "bg-zinc-900/50 ring-indigo-500 shadow-2xl shadow-indigo-500/10 scale-105 z-10"
                  : "bg-zinc-900/20 ring-zinc-800 hover:bg-zinc-900/40"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={cn(
                      "text-lg font-semibold leading-8",
                      tier.featured ? "text-indigo-400" : "text-white"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.featured ? (
                    <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-400 border border-indigo-500/20">
                      Most Popular
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">{tier.priceMonthly}</span>
                  <span className="text-sm font-semibold leading-6 text-zinc-400">/month</span>
                </div>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-zinc-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-indigo-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                  {tier.notIncluded.map((feature) => (
                    <li key={feature} className="flex gap-x-3 text-zinc-600">
                      <X className="h-6 w-5 flex-none text-zinc-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                asChild
                variant={tier.featured ? "default" : "outline"}
                className={cn(
                  "mt-8 w-full",
                  tier.featured ? "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-900/20" : "border-zinc-700 hover:bg-zinc-800"
                )}
              >
                <Link href={tier.href} aria-describedby={tier.id}>
                  {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Comparison Teaser */}
      <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Everything you need to stay secure</h2>
          <p className="mt-6 text-lg leading-8 text-zinc-400">
            SMBShield provides the enterprise-grade tools that big banks use, tailored for your agility.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
              <Shield className="h-5 w-5 flex-none text-emerald-400" aria-hidden="true" />
              Active Monitoring
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
              <p className="flex-auto">Our agents scan your digital footprint 24/7 for new vulnerabilities mapped to the OWASP Top 10.</p>
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
              <Zap className="h-5 w-5 flex-none text-amber-400" aria-hidden="true" />
              Instant Analysis
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
              <p className="flex-auto">Don't wait for a consultant. Ask the OWASP Agent about any threat and get an immediate, actionable answer.</p>
            </dd>
          </div>
          <div className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
              <Globe className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
              Global Intelligence
            </dt>
            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
              <p className="flex-auto">Leverage threat data from across the globe, distilled into simple weekly briefings for your team.</p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
