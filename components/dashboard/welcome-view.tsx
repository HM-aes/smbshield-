"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Bot,
  BookOpen,
  AlertTriangle,
  Newspaper,
  TrendingUp,
  Crown,
  Check,
  ArrowRight,
  ExternalLink,
  Clock,
  Zap,
  Lock,
  Target,
  Users,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/user-context"

// Mock data - AI Security News
const aiSecurityNews = [
  {
    id: 1,
    title: "New Prompt Injection Attack Bypasses ChatGPT Safety",
    source: "SecurityWeek",
    time: "2 hours ago",
    category: "LLM Security",
  },
  {
    id: 2,
    title: "EU AI Act: What SMBs Need to Know for 2025",
    source: "TechCrunch",
    time: "5 hours ago",
    category: "Compliance",
  },
  {
    id: 3,
    title: "RAG Poisoning: The New Threat to Enterprise AI",
    source: "Dark Reading",
    time: "1 day ago",
    category: "AI Threats",
  },
]

// Mock data - Recent CVEs
const recentCVEs = [
  {
    id: "CVE-2025-0123",
    title: "LangChain Remote Code Execution",
    severity: "Critical",
    score: 9.8,
  },
  {
    id: "CVE-2025-0089",
    title: "OpenAI API Token Exposure",
    severity: "High",
    score: 8.5,
  },
  {
    id: "CVE-2025-0067",
    title: "Vector DB Authentication Bypass",
    severity: "High",
    score: 7.9,
  },
]

// Feature comparison
const features = [
  { name: "Professor Shield AI Chat", guest: true, pro: true },
  { name: "OWASP Top 10 Learning", guest: true, pro: true },
  { name: "Security Briefings", guest: false, pro: true },
  { name: "Real-time Threat Alerts", guest: false, pro: true },
  { name: "Compliance Tracker", guest: false, pro: true },
  { name: "PDF Export & Library", guest: false, pro: true },
  { name: "Priority Support", guest: false, pro: true },
]

export function WelcomeView() {
  const { updateUserTier } = useUser()

  return (
    <div className="min-h-screen">
      {/* Hero Section with Sliding Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 px-8">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Shield className="mr-1 h-3 w-3" />
              Security Intelligence Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SMBShield
            </span>{" "}
            Education Hub
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            OWASP Top 10 security training designed for SMB professionals.
            Learn to protect your business from AI-era threats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button size="lg" className="gap-2" onClick={() => updateUserTier("pro")}>
              <Crown className="h-4 w-4" />
              Upgrade to Pro
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="/dashboard/chat">
                <Bot className="h-4 w-4" />
                Chat with Professor Shield
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Shield, label: "OWASP Risks", value: "10+" },
            { icon: Bot, label: "AI Lessons", value: "50+" },
            { icon: Users, label: "Security Leaders", value: "Growing" },
            { icon: Globe, label: "EU Focused", value: "100%" },
          ].map((stat, i) => (
            <Card key={i} className="p-4 text-center bg-background/50 backdrop-blur">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </motion.div>
      </section>

      {/* News & CVEs Section */}
      <section className="py-12 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* AI Security News */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Latest AI Security News</h2>
            </div>
            <div className="space-y-3">
              {aiSecurityNews.map((news) => (
                <Card key={news.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{news.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{news.source}</span>
                        <span>•</span>
                        <Clock className="h-3 w-3" />
                        <span>{news.time}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {news.category}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Recent CVEs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h2 className="text-xl font-semibold">Recent AI/LLM CVEs</h2>
            </div>
            <div className="space-y-3">
              {recentCVEs.map((cve) => (
                <Card key={cve.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{cve.title}</p>
                      <p className="text-xs text-muted-foreground font-mono">{cve.id}</p>
                    </div>
                    <Badge
                      variant={cve.severity === "Critical" ? "destructive" : "secondary"}
                      className="shrink-0"
                    >
                      {cve.score}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professor Shield Section */}
      <section className="py-12 px-8 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <Bot className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Meet Professor Shield</h2>
                <p className="text-muted-foreground mb-4">
                  Your AI-powered cybersecurity tutor. Ask questions about OWASP Top 10,
                  LLM security risks, GDPR compliance, and more. Get instant, expert-level
                  guidance tailored for SMB professionals.
                </p>
                <Button className="gap-2" asChild>
                  <a href="/dashboard/chat">
                    Start Learning <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <Target className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SMBShield empowers European small and medium businesses with enterprise-grade
            security knowledge. We believe every business deserves protection from modern
            cyber threats, regardless of size or budget.
          </p>
        </motion.div>
      </section>

      {/* Tier Comparison */}
      <section className="py-12 px-8 bg-muted/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Plan</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Guest Tier */}
            <Card className="p-6">
              <div className="text-center mb-6">
                <Badge variant="secondary" className="mb-3">Guest</Badge>
                <h3 className="text-xl font-bold">Free Access</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Get started with core features
                </p>
              </div>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    {feature.guest ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Lock className="h-4 w-4 text-muted-foreground/50" />
                    )}
                    <span className={!feature.guest ? "text-muted-foreground/50" : ""}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full mt-6" disabled>
                Current Plan
              </Button>
            </Card>

            {/* Pro Tier */}
            <Card className="p-6 border-primary/50 bg-gradient-to-br from-primary/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
                Recommended
              </div>
              <div className="text-center mb-6">
                <Badge className="mb-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  <Crown className="mr-1 h-3 w-3" />
                  Pro
                </Badge>
                <h3 className="text-xl font-bold">Full Access</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Everything you need to stay secure
                </p>
              </div>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-6 gap-2"
                onClick={() => updateUserTier("pro")}
              >
                <Zap className="h-4 w-4" />
                Upgrade to Pro
              </Button>
            </Card>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
