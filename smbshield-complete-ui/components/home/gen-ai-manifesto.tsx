"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Zap, Map, Bot, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: 1,
    icon: Rocket,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-500/10",
    iconBorder: "border-yellow-500/20",
    title: "From Chatbots to Autonomous Revenue",
    subtitle: "The New Superpower",
    description:
      "It started with asking **ChatGPT** or **Gemini** to write emails. Now, SMBs are using **AI Agents** to close sales, write code, and manage support. It allows a team of five to compete with a corporation of fifty. It is the ultimate leverage for scaling revenue without increasing headcount.",
  },
  {
    id: 2,
    icon: Zap,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/10",
    iconBorder: "border-orange-500/20",
    title: "The Growth vs. Security Gap",
    subtitle: "Speed Creates Cracks",
    description:
      "Here is the catch: The market is moving fast. New models and frameworks drop every week, and businesses are rushing to adopt them to maximize profit. But this speed creates a blind spot. While you focus on growth, traditional firewalls fail to catch 'Language Attacks.' Hackers are no longer attacking your servers; they are tricking your AI into working against you.",
  },
  {
    id: 3,
    icon: Map,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
    title: "What is the OWASP Top 10?",
    subtitle: "The Map (OWASP Top 10)",
    description:
      "To navigate this chaos, the global security community created the OWASP Top 10. It isn't a boring compliance list. It is a real-time map of the 10 specific ways hackers are exploiting this 'Growth Gap.' It defines exactly where your new AI employees are vulnerable.",
  },
  {
    id: 4,
    icon: Bot,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
    iconBorder: "border-purple-500/20",
    title: "Why It Matters for AI Agents & LLMs",
    subtitle: "Agents in the Crosshairs",
    description:
      "The stakes change when AI can *act*. If a chatbot gets hacked, it says something rude. If an **AI Agent** gets hacked via Prompt Injection, it can delete a database or refund a customer. The security community is discovering new vulnerabilities daily. Being informed about these latest events is the only way to secure your automated workforce.",
  },
  {
    id: 5,
    icon: GraduationCap,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
    title: "Education for AI Professionals",
    subtitle: "The Professional Hub",
    description:
      "Our Weekly Email and **SMBShield Hub** are designed specifically for professionals in the AI, LLM, and Agent space—or anyone who wants to master the **GenAI OWASP Top 10**. We don't just send alerts; we provide a curriculum. We digest the latest market events and security research into actionable knowledge, helping you become an expert in GenAI safety.",
  },
];

export const GenAiManifesto = () => {
  return (
    <section className="w-full py-20 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Glassmorphism Card Container */}
        <div className="max-w-4xl mx-auto">
          {/* Header Section - Inside Card */}
          <div className="mb-8 text-center">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
              style={{ fontFamily: "Tahoma, sans-serif" }}
            >
              The State of GenAI Security
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 leading-relaxed max-w-3xl mx-auto">
              We are witnessing a massive shift. Tech is moving fast, and
              businesses are rushing to adapt. We believe every SMB deserves to
              understand the risks—not as a technical hurdle, but as a necessary
              step to protect your growth.
            </p>
          </div>
          <div className="relative rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl overflow-hidden shadow-2xl p-8 md:p-12">
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Line connecting icons */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500/20 via-orange-500/20 via-blue-500/20 via-purple-500/20 to-emerald-500/20 hidden md:block" />

              {/* Sections */}
              <div className="space-y-20">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const isLast = index === sections.length - 1;

                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative flex gap-6 md:gap-8"
                    >
                      {/* Icon Container */}
                      <div className="flex-shrink-0 relative z-10">
                        <div
                          className={`w-16 h-16 rounded-xl ${section.iconBg} border ${section.iconBorder} flex items-center justify-center transition-transform duration-300 hover:scale-110`}
                        >
                          <Icon className={`w-8 h-8 ${section.iconColor}`} />
                        </div>
                        {/* Timeline dot connection (mobile) */}
                        {!isLast && (
                          <div className="absolute left-1/2 top-16 w-0.5 h-12 bg-gradient-to-b from-neutral-700 to-neutral-800 md:hidden transform -translate-x-1/2" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2">
                          {section.subtitle}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                          {section.title}
                        </h3>
                        <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                          {section.description
                            .split(/(\*\*.*?\*\*|\*[^*]+\*)/)
                            .map((part, i) => {
                              if (
                                part.startsWith("**") &&
                                part.endsWith("**")
                              ) {
                                const boldText = part.slice(2, -2);
                                return (
                                  <strong
                                    key={i}
                                    className="text-white font-semibold"
                                  >
                                    {boldText}
                                  </strong>
                                );
                              }
                              if (
                                part.startsWith("*") &&
                                part.endsWith("*") &&
                                !part.startsWith("**")
                              ) {
                                const italicText = part.slice(1, -1);
                                return (
                                  <em
                                    key={i}
                                    className="text-neutral-300 italic"
                                  >
                                    {italicText}
                                  </em>
                                );
                              }
                              return <span key={i}>{part}</span>;
                            })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Call to Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-20 pt-8 border-t border-neutral-800 text-center"
            >
              <Button size="lg" asChild className="px-8">
                <a href="/dashboard">
                  Join the Knowledge Hub (Free)
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
