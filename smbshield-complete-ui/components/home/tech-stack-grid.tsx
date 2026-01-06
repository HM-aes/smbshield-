"use client";

import React from "react";
import { Shield, Brain, AlertTriangle, Zap, Lock, ArrowRight } from "lucide-react";

export function TechStackGrid() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border bg-background py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="text-sm font-medium text-amber-400">
              GenAI Security
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            The New Workforce <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              AI Agents & LLMs
            </span>
          </h2>
        </div>

        {/* Main Narrative Card - Tooltip Style */}
        <div className="group relative mx-auto max-w-4xl">
          {/* Outer glow on hover */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100" />

          {/* Tooltip Card Container */}
          <div 
            className="relative rounded-3xl border border-border shadow-2xl transition-all duration-500 group-hover:border-amber-500/20 group-hover:shadow-amber-500/10"
            className="bg-card"
          >
            {/* Tooltip Pointer (Top Center) */}
            <div 
              className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rotate-45 border-l border-t border-border transition-colors duration-500 group-hover:border-amber-500/20"
              className="bg-card"
            />

            {/* Content */}
            <div className="space-y-12 p-10 md:p-14">
              {/* Section 1: The Shift */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-colors duration-300 group-hover:bg-amber-500/20">
                    <Brain className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground md:text-2xl">
                    You&apos;re Building a Business, Not Studying AI
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  As an SMB professional, you&apos;ve got clients to serve, teams to manage, and a business to grow. You don&apos;t have time to become an AI expert—but you know{" "}
                  <span className="text-amber-400">
                    AI Agents and LLMs are changing everything
                  </span>
                  . Your competitors are already using them for customer service, content creation, data analysis, and automating tasks that used to eat up entire days.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The promise is real:{" "}
                  <span className="font-medium text-foreground">
                    enterprise-level capabilities at SMB-friendly prices
                  </span>
                  . But here&apos;s what the AI vendors won&apos;t tell you—there&apos;s a new category of risk that most busy business owners never see coming.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

              {/* Section 2: The Danger */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400 transition-colors duration-300 group-hover:bg-red-500/20">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground md:text-2xl">
                    The Risks Your IT Team Might Not Know About
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The{" "}
                  <span className="font-medium text-foreground">
                    OWASP Top 10 for LLM Applications
                  </span>{" "}
                  outlines threats that can hit SMBs especially hard: Prompt Injection attacks that trick your AI into leaking customer data. Training Data Poisoning that corrupts your business intelligence. Sensitive Information Disclosure that exposes what your clients trusted you to protect.
                </p>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                  <p className="text-base text-muted-foreground">
                    <span className="font-semibold text-red-400">
                      Here&apos;s the uncomfortable reality:
                    </span>{" "}
                    Most SMBs are plugging AI tools into their workflows without understanding the security implications. You&apos;re focused on delivering great services to your clients—and that&apos;s exactly what you should be doing. But who&apos;s watching your AI&apos;s back?
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

              {/* Section 3: The Bridge */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-colors duration-300 group-hover:bg-amber-500/20">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground md:text-2xl">
                    SMBShield: We Speak Business, Not Just Tech
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  That&apos;s exactly why{" "}
                  <span className="font-bold text-amber-400">SMBShield</span>{" "}
                  exists. We translate the complex world of AI security into{" "}
                  <span className="font-medium text-foreground">
                    plain-English guidance you can actually use
                  </span>
                  . No PhD required. No hours of research. Just practical protection that fits into your busy schedule—so you can adopt AI with confidence while staying focused on what you do best: running your business.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We get it—you didn&apos;t start your business to become a cybersecurity expert. But your clients trust you with their data, and your reputation is on the line. SMBShield is{" "}
                  <span className="font-medium text-foreground">
                    the bridge between cutting-edge AI and the peace of mind your business deserves
                  </span>.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

              {/* Section 4: Our Approach */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500/20">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground md:text-2xl">
                    Built by Developers Who Prioritize Security
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We practice what we preach. Every AI tool we build uses{" "}
                  <span className="font-medium text-foreground">Pydantic AI</span>{" "}
                  for bulletproof data validation and{" "}
                  <span className="font-medium text-foreground">FastAPI</span> for rock-solid, production-ready systems. These aren&apos;t just technical choices—they&apos;re{" "}
                  <span className="text-amber-400">security decisions</span>{" "}
                  that protect your business from the ground up. When we recommend something, it&apos;s because we use it ourselves.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Pydantic AI",
                    "FastAPI",
                    "Type Safety",
                    "Input Validation",
                    "OWASP Compliance",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/50 bg-gray-800/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

              {/* Section 5: The Promise */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-colors duration-300 group-hover:bg-blue-500/20">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground md:text-2xl">
                    Focus on Your Clients—We&apos;ll Handle AI Security
                  </h3>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Whether you&apos;re a consultant, agency owner, accountant, lawyer, or any SMB professional exploring AI to better serve your clients—SMBShield gives you{" "}
                  <span className="font-medium text-foreground">
                    the knowledge and tools to deploy AI confidently
                  </span>
                  . Weekly security briefings written for busy professionals. OWASP guidance translated for real-world business scenarios. And direct access to experts who understand both the tech and your business pressures.
                </p>

                {/* CTA */}
                <div className="pt-4">
                  <a
                    href="#pricing"
                    className="group/cta inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10 px-6 py-3 font-semibold text-amber-400 transition-all duration-300 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-600/20 hover:text-amber-300"
                  >
                    Protect Your AI Investment Today
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mx-auto mt-16 h-px w-1/2 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>
    </section>
  );
}
