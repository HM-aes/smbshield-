"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "../animated/fade-in"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { AnimatedCounter } from "../animated/animated-counter"

const testimonials = [
  {
    quote: "SMBShield finally made cybersecurity understandable for our team. The weekly briefings are a game-changer.",
    name: "Maria Garcia",
    company: "Founder, Creative Blooms",
    avatar: "/images/avatars/maria.jpg",
  },
  {
    quote: "As a non-technical founder, security was a black box. SMBShield gave us the clarity and confidence to move forward.",
    name: "Johnathan Chen",
    company: "CEO, Innovate Next",
    avatar: "/images/avatars/john.jpg",
  },
  {
    quote: "The compliance updates for EU regulations are incredibly valuable. It's like having a dedicated security analyst on staff.",
    name: "Sophie Dubois",
    company: "CTO, TechLogistics GmbH",
    avatar: "/images/avatars/sophie.jpg",
  },
]

export function CTASection() {
  return (
    <section className="py-20 bg-muted/30 dark:bg-muted/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main CTA Card */}
        <FadeIn>
          <Card className="relative overflow-hidden bg-muted text-foreground border">
            <CardContent className="relative p-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Ready to Fortify Your Business?
              </h2>
              <p className="mb-8 max-w-2xl mx-auto text-lg text-muted-foreground">
                Stop guessing about security. Start building your defense with expert intelligence delivered weekly.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button size="lg" variant="default" asChild>
                  <Link href="/dashboard" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Trust Signals Section */}
        <div className="mt-20 text-center">
            <FadeIn>
                <h3 className="text-3xl font-bold tracking-tight">Trusted by Businesses Across Europe</h3>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    From small startups to established companies, leaders rely on SMBShield for critical security intelligence.
                </p>
                <div className="mt-8 text-5xl font-bold text-primary">
                    <AnimatedCounter value={500} />+
                </div>
                 <p className="text-lg font-medium text-muted-foreground">SMBs Protected</p>
            </FadeIn>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                    <FadeIn key={index} delay={(index + 1) * 0.1}>
                        <Card className="h-full text-left">
                            <CardContent className="p-6">
                               <div className="flex gap-0.5 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-primary/80 fill-primary/80"/>)}
                               </div>
                                <p className="mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                ))}
            </div>
        </div>
      </div>
    </section>
  )
}

