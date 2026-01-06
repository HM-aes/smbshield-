"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Shield,
  FileCheck,
  Sparkles,
  ArrowRight,
  Calendar,
  Bot,
  Scale,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animated/fade-in";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  cta?: {
    text: string;
    href: string;
  };
  accentColor: string;
  glowColor: string;
  isComingSoon?: boolean;
}

const features: FeatureCard[] = [
  {
    icon: <Mail className="h-7 w-7" />,
    title: "Weekly Intelligence Briefing",
    tagline: "Your Monday morning security digest",
    description:
      "We monitor 127 threat sources so you don't have to. Every week, get a concise, jargon-free summary of what actually matters for your business.",
    highlights: [
      "AI security conferences & community events",
      "Critical CVE alerts affecting SMBs",
      "OWASP Top 10 LLM updates",
      "EU regulation changes (GDPR, NIS2, AI Act)",
    ],
    cta: {
      text: "Subscribe Free",
      href: "/dashboard",
    },
    accentColor: "from-amber-400 to-orange-500",
    glowColor: "amber",
  },
  {
    icon: <Bot className="h-7 w-7" />,
    title: "Professor Shield AI",
    tagline: "Your 24/7 security advisor",
    description:
      "Ask any security question and get plain-English explanations with real code examples. Built on the latest threat intelligence, updated weekly.",
    highlights: [
      "OWASP vulnerability explanations",
      "Code-level security guidance",
      "Vendor risk assessment help",
      "Executive summary generation",
    ],
    cta: {
      text: "Chat Now",
      href: "/dashboard/chat",
    },
    accentColor: "from-purple-400 to-violet-500",
    glowColor: "purple",
  },
  {
    icon: <Scale className="h-7 w-7" />,
    title: "Compliance Hub",
    tagline: "EU regulations simplified",
    description:
      "We translate 200-page regulations into simple checklists. Track GDPR, NIS2, and AI Act compliance without hiring a compliance officer.",
    highlights: [
      "Automated deadline alerts (90 days ahead)",
      "Audit-ready document templates",
      "Progress tracking dashboards",
      "Vendor security assessment tools",
    ],
    cta: {
      text: "Explore Hub",
      href: "/dashboard/compliance",
    },
    accentColor: "from-emerald-400 to-teal-500",
    glowColor: "emerald",
  },
  {
    icon: <Rocket className="h-7 w-7" />,
    title: "Coming Soon",
    tagline: "We're just getting started",
    description:
      "SMBShield is growing. As we build our community, we're developing powerful new tools to keep European SMBs secure in the AI era.",
    highlights: [
      "Threat Intelligence Dashboard",
      "Interactive Training Library",
      "Team Security Certifications",
      "API Security Scanner",
    ],
    isComingSoon: true,
    accentColor: "from-slate-400 to-slate-500",
    glowColor: "slate",
  },
];

function GlassCard({ feature, index }: { feature: FeatureCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      {/* Glow effect behind card */}
      <div
        className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${feature.accentColor} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-30`}
      />

      {/* Glass card */}
      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.07]">
        {/* Inner glow on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${feature.accentColor} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
        />

        <div className="relative p-6 md:p-8">
          {/* Icon with gradient background */}
          <div className="mb-5 flex items-center justify-between">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accentColor} text-white shadow-lg`}
            >
              {feature.icon}
            </div>
            {feature.isComingSoon && (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400">
                <Sparkles className="h-3 w-3" />
                Roadmap
              </span>
            )}
          </div>

          {/* Title & tagline */}
          <h3 className="mb-1 text-xl font-bold text-foreground md:text-2xl">
            {feature.title}
          </h3>
          <p
            className={`mb-4 text-sm font-medium bg-gradient-to-r ${feature.accentColor} bg-clip-text text-transparent`}
          >
            {feature.tagline}
          </p>

          {/* Description */}
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {feature.description}
          </p>

          {/* Highlights list */}
          <ul className="mb-6 space-y-2">
            {feature.highlights.map((highlight, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r ${feature.accentColor}`}
                />
                {highlight}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          {feature.cta && (
            <Link href={feature.cta.href}>
              <motion.button
                whileHover={{ x: 4 }}
                className={`group/btn flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${feature.accentColor} bg-clip-text text-transparent`}
              >
                {feature.cta.text}
                <ArrowRight className="h-4 w-4 text-amber-400 transition-transform group-hover/btn:translate-x-1" />
              </motion.button>
            </Link>
          )}

          {feature.isComingSoon && (
            <p className="text-sm text-muted-foreground italic">
              Join our community to shape these features
            </p>
          )}
        </div>

        {/* Subtle corner accent */}
        <div
          className={`absolute -right-12 -top-12 h-24 w-24 rounded-full bg-gradient-to-br ${feature.accentColor} opacity-10 blur-2xl`}
        />
      </div>
    </motion.div>
  );
}

export function WhatWeOffer() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="container relative mx-auto max-w-7xl px-4">
        {/* Section Header - The BOOM */}
        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
          <FadeIn triggerOnScroll={true}>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Security Intelligence,{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Built for SMBs
              </span>
            </h2>
          </FadeIn>

          <FadeIn triggerOnScroll={true} delay={0.2}>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              We're security specialists from{" "}
              <span className="text-white font-medium">Google Trust & Safety</span> and{" "}
              <span className="text-white font-medium">Meta</span>, building the security
              platform we wished existed when we worked with SMBs.
            </p>
          </FadeIn>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom tagline */}
        <FadeIn triggerOnScroll={true} delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              No enterprise budgets required.{" "}
              <span className="text-amber-400">Free tier available</span> for startups and small teams.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
