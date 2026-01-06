"use client"

import Link from "next/link"
import { ArrowRight, Star, Shield } from "lucide-react"
import { FadeIn } from "../animated/fade-in"
import { AnimatedCounter } from "../animated/animated-counter"

const testimonials = [
  {
    quote: "SMBShield finally made cybersecurity understandable for our team. The weekly briefings are a game-changer.",
    name: "Maria Garcia",
    company: "Founder, Creative Blooms",
  },
  {
    quote: "As a non-technical founder, security was a black box. SMBShield gave us the clarity and confidence to move forward.",
    name: "Johnathan Chen",
    company: "CEO, Innovate Next",
  },
  {
    quote: "The compliance updates for EU regulations are incredibly valuable. It's like having a dedicated security analyst on staff.",
    name: "Sophie Dubois",
    company: "CTO, TechLogistics GmbH",
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  return (
    <FadeIn delay={(index + 1) * 0.1}>
      <div 
        className="group relative h-full"
        style={{ perspective: "1000px" }}
      >
        {/* Ambient glow on hover */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        
        <div
          className="relative flex h-full flex-col rounded-2xl border border-amber-500/20 bg-card p-6 transition-all duration-300 group-hover:border-amber-500/40"
          style={{
            transform: "translateZ(0)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px) rotateX(2deg) scale(1.01)";
            e.currentTarget.style.boxShadow = "0 20px 40px -12px rgba(217, 119, 6, 0.2), 0 10px 20px -8px rgba(217, 119, 6, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateZ(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
            ))}
          </div>

          {/* Quote */}
          <p className="flex-1 text-muted-foreground leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Author */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 font-bold">
              {testimonial.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">{testimonial.company}</p>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-background py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        {/* Main CTA Card */}
        <FadeIn>
          <div 
            className="group relative mx-auto max-w-4xl"
            style={{ perspective: "1000px" }}
          >
            {/* Ambient glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
            
            <div
              className="relative rounded-3xl border border-amber-500/20 bg-card p-12 text-center transition-all duration-500 group-hover:border-amber-500/40"
              style={{
                transform: "translateZ(0)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) rotateX(2deg) scale(1.01)";
                e.currentTarget.style.boxShadow = "0 30px 60px -15px rgba(217, 119, 6, 0.25), 0 15px 30px -10px rgba(217, 119, 6, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateZ(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Shield Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
                <Shield className="h-8 w-8 text-amber-400" />
              </div>
              
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Ready to{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                  Fortify
                </span>{" "}
                Your Business?
              </h2>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Stop guessing about security. Start building your defense with expert intelligence delivered weekly.
              </p>
              
              {/* CTA Button */}
              <Link
                href="/dashboard"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-semibold text-black shadow-lg shadow-amber-500/25 transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-500/40"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                Get Your Free Security Briefing
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Trust Signals Section */}
        <div className="mt-24 text-center">
          <FadeIn>
            <h3 className="text-3xl font-bold tracking-tight text-foreground">
              Trusted by Businesses Across{" "}
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Europe
              </span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              From small startups to established companies, leaders rely on SMBShield for critical security intelligence.
            </p>
            
            {/* Counter */}
            <div className="mt-8">
              <span className="text-5xl font-bold text-amber-400">
                Growing
              </span>
              <p className="mt-2 text-lg font-medium text-muted-foreground">Community of Security Leaders</p>
            </div>
          </FadeIn>

          {/* Testimonial Cards */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
