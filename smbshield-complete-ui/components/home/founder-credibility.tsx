"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, Lock, Code, Database, Eye, Key, FileWarning, Activity, Globe } from "lucide-react";
import { useState } from "react";

const owaspTop10 = [
  {
    id: "A01",
    title: "Broken Access Control",
    icon: Lock,
    description: "Failures in access control allow unauthorized users to access restricted resources or perform unauthorized actions.",
    color: "from-red-500/20 to-orange-500/20",
    borderColor: "border-red-500/30",
    iconColor: "text-red-400",
  },
  {
    id: "A02",
    title: "Cryptographic Failures",
    icon: Key,
    description: "Weak or missing encryption exposes sensitive data like passwords, credit cards, and personal information to attackers.",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    id: "A03",
    title: "Injection",
    icon: Code,
    description: "Malicious code injected into queries or commands can manipulate databases, execute unauthorized commands, or steal data.",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    id: "A04",
    title: "Insecure Design",
    icon: AlertTriangle,
    description: "Fundamental flaws in application architecture and design that cannot be fixed by perfect implementation alone.",
    color: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-400",
  },
  {
    id: "A05",
    title: "Security Misconfiguration",
    icon: FileWarning,
    description: "Improperly configured security settings, default credentials, or unnecessary features create vulnerabilities.",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    iconColor: "text-orange-400",
  },
  {
    id: "A06",
    title: "Vulnerable Components",
    icon: Database,
    description: "Using outdated or vulnerable libraries, frameworks, and dependencies exposes applications to known exploits.",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400",
  },
  {
    id: "A07",
    title: "Authentication Failures",
    icon: Shield,
    description: "Weak authentication mechanisms allow attackers to compromise passwords, keys, or session tokens.",
    color: "from-indigo-500/20 to-blue-500/20",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
  },
  {
    id: "A08",
    title: "Data Integrity Failures",
    icon: Activity,
    description: "Failures to verify the integrity of software updates, critical data, and CI/CD pipelines enable malicious modifications.",
    color: "from-pink-500/20 to-rose-500/20",
    borderColor: "border-pink-500/30",
    iconColor: "text-pink-400",
  },
  {
    id: "A09",
    title: "Logging & Monitoring Failures",
    icon: Eye,
    description: "Insufficient logging and monitoring prevent detection of breaches, allowing attackers to persist undetected.",
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
    iconColor: "text-teal-400",
  },
  {
    id: "A10",
    title: "Server-Side Request Forgery",
    icon: Globe,
    description: "SSRF flaws allow attackers to trick servers into making requests to unintended locations, bypassing firewalls.",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    iconColor: "text-violet-400",
  },
];

export function FounderCredibility() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative w-full border-b border-border bg-gradient-to-b from-background via-muted/30 to-muted/50 py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
          >
            <Shield className="h-4 w-4 text-amber-500" />
            <p className="text-sm font-medium uppercase tracking-widest text-amber-500/90">
              Security Foundation
            </p>
          </motion.div>

          {/* Main Header */}
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60">
            What is OWASP Top 10?
          </h2>

          <p className="mx-auto max-w-3xl text-base text-muted-foreground leading-relaxed md:text-lg mb-2">
            The <span className="text-amber-500 font-semibold">OWASP Top 10</span> is a globally recognized standard document that identifies the most critical security risks to web applications.
          </p>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground/80">
            Understanding these vulnerabilities is essential for building secure applications and protecting your business.
          </p>
        </motion.div>

        {/* OWASP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {owaspTop10.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredCard === item.id;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? -10 : 10,
                    scale: isHovered ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 rounded-xl bg-gradient-to-br ${item.color} backdrop-blur-xl border ${item.borderColor} shadow-2xl pointer-events-none z-20`}
                  style={{
                    boxShadow: isHovered ? `0 20px 60px -15px ${item.iconColor.replace('text-', 'rgb(var(--')})` : 'none'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-background/50 ${item.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-foreground mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 -mt-px w-3 h-3 rotate-45 bg-gradient-to-br ${item.color} border-r border-b ${item.borderColor}`} />
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className={`relative h-full p-6 rounded-2xl bg-gradient-to-br ${item.color} backdrop-blur-sm border ${item.borderColor} cursor-pointer overflow-hidden`}
                >
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 0.6 : 0,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} blur-xl`}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center gap-3">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: isHovered ? 360 : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className={`p-3 rounded-xl bg-background/30 backdrop-blur-sm ${item.iconColor}`}
                    >
                      <Icon className="h-8 w-8" />
                    </motion.div>

                    {/* ID Badge */}
                    <div className="px-3 py-1 rounded-full bg-background/40 backdrop-blur-sm border border-white/10">
                      <span className="text-xs font-mono font-semibold text-foreground">{item.id}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-foreground leading-tight min-h-[2.5rem] flex items-center">
                      {item.title}
                    </h3>
                  </div>

                  {/* Shine Effect */}
                  <motion.div
                    animate={{
                      x: isHovered ? "100%" : "-100%",
                    }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground/70">
            Hover over each card to learn more about these critical security vulnerabilities
          </p>
        </motion.div>
      </div>
    </section>
  );
}
