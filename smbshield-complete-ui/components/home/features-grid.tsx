"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Globe, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn } from "../animated/fade-in"

const features = [
  {
    icon: Zap,
    benefitTitle: "Stay Ahead of Threats",
    featureTitle: "Weekly Security Briefings",
    description: "Curated intelligence on OWASP Top 10, GenAI threats, and emerging vulnerabilities tailored for SMBs.",
  },
  {
    icon: Shield,
    benefitTitle: "Understand Your Risks",
    featureTitle: "Plain Language Reports",
    description: "No technical jargon. Security insights translated into actionable business decisions.",
  },
  {
    icon: Globe,
    benefitTitle: "Navigate Regulations",
    featureTitle: "EU Compliance Focus",
    description: "Stay ahead of GDPR, AI Act, and other European regulations affecting your business.",
  },
  {
    icon: Lock,
    benefitTitle: "Get Actionable Insights",
    featureTitle: "AI-Powered Analysis",
    description: "Our AI agents process hundreds of sources to deliver the most relevant security updates.",
  },
]

export function FeaturesGrid() {
  return (
    <section className="bg-muted/30 dark:bg-muted/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Security Intelligence, Simplified
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              We do the hard work of monitoring threats so you can focus on
              running your business. Here's how we help.
            </p>
          </div>
        </FadeIn>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={(index + 1) * 0.1}>
              <Card className="h-full transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.benefitTitle}</CardTitle>
                  <p className="pt-1 text-sm font-semibold text-primary">{feature.featureTitle}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
