"use client"

import React from "react"
import {
  MessageSquareQuote,
  ShieldAlert,
  Unplug,
  Box,
  Bot,
  FileLock,
  Code2,
  Sprout,
  BookX,
  Loader,
  ArrowRight,
} from "lucide-react"
import { FadeIn } from "../animated/fade-in"
import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
}

const ThreatCard = ({ icon: Icon, title, description, href }) => (
  <motion.div variants={itemVariants}>
    <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Link href={href} className="group block rounded-xl border bg-card p-6 shadow-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted/50">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-card-foreground">{title}</h3>
              <p className="mt-1 text-muted-foreground">{description}</p>
            </div>
             <ArrowRight className="h-5 w-5 text-muted-foreground/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
          </div>
      </Link>
    </motion.div>
  </motion.div>
)

export function OwaspTeaser() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            {/* Placeholder for a logo if provided later */}
            {/* <img src="/images/logos/smbshield.svg" alt="SMBShield Logo" className="mx-auto mb-4 h-12" /> */}
            <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
              The New Frontier of Threats
            </h2>
            <p className="mx-auto mt-6 text-lg text-muted-foreground">
              As AI integrates into business, new vulnerabilities emerge. Explore the
              OWASP Top 10 for Large Language Models (LLMs) and learn how to secure your generative AI systems.
            </p>
          </div>
        </FadeIn>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 flex max-w-3xl flex-col gap-6"
        >
          {items.map((item, i) => (
            <ThreatCard
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
              href={`/resources/owasp-top-10-llm/${item.slug}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const items = [
    {
    slug: "llm01",
    title: "LLM01: Prompt Injection",
    description: "Tricking the LLM to ignore its original instructions.",
    icon: MessageSquareQuote,
  },
  {
    slug: "llm02",
    title: "LLM02: Sensitive Info Disclosure",
    description: "When an LLM accidentally reveals confidential data.",
    icon: FileLock,
  },
  {
    slug: "llm03",
    title: "LLM03: Insecure Output Handling",
    description: "Failing to sanitize LLM responses, leading to vulnerabilities.",
    icon: Code2,
  },
  {
    slug: "llm04",
    title: "LLM04: Model Poisoning",
    description: "Tainting training data to compromise the model's integrity.",
    icon: Sprout,
  },
  {
    slug: "llm05",
    title: "LLM05: Excessive Agency",
    description: "When an LLM takes unintended, impactful actions.",
    icon: Bot,
  },
  {
    slug: "llm06",
    title: "LLM06: Supply Chain Vulnerabilities",
    description: "Using insecure third-party models or data.",
    icon: Box,
  },
  {
    slug: "llm07",
    title: "LLM07: System Prompt Leakage",
    description: "Revealing the LLM's confidential initial instructions.",
    icon: Unplug,
  },
  {
    slug: "llm08",
    title: "LLM08: Misinformation",
    description: "The model generating false or misleading information.",
    icon: BookX,
  },
  {
    slug: "llm09",
    title: "LLM09: Unbounded Consumption",
    description: "The model consuming excessive resources, leading to DoS.",
    icon: Loader,
  },
  {
    slug: "llm10",
    title: "LLM10: Training Data Poisoning",
    description: "A more specific form of model poisoning targeting the training data.",
    icon: ShieldAlert,
  },
]
