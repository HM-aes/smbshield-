"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  Bot,
  BookOpen,
  FileText,
  Bell,
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  Crown,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useUser } from "@/contexts/user-context"

// Quick stats for Pro dashboard
const stats = [
  { label: "Lessons Completed", value: "12", change: "+3 this week", icon: BookOpen, trend: "up" },
  { label: "Threats Monitored", value: "47", change: "5 new alerts", icon: Bell, trend: "up" },
  { label: "Security Score", value: "85%", change: "+12% improved", icon: Shield, trend: "up" },
  { label: "Compliance Tasks", value: "8/12", change: "4 remaining", icon: ClipboardCheck, trend: "neutral" },
]

// Recent activity
const recentActivity = [
  { action: "Completed OWASP lesson", item: "SQL Injection Prevention", time: "2 hours ago", icon: CheckCircle },
  { action: "New threat alert", item: "Phishing campaign targeting EU SMBs", time: "5 hours ago", icon: AlertTriangle },
  { action: "Chat with Professor Shield", item: "Asked about LLM security", time: "1 day ago", icon: Bot },
  { action: "Security briefing read", item: "December 2025 Threat Report", time: "2 days ago", icon: FileText },
]

// Quick actions
const quickActions = [
  { title: "Chat with Professor Shield", description: "Get instant security answers", href: "/dashboard/chat", icon: Bot },
  { title: "Continue Learning", description: "Resume OWASP training", href: "/dashboard/owasp", icon: BookOpen },
  { title: "View Briefings", description: "Latest security reports", href: "/dashboard/briefings", icon: FileText },
  { title: "Check Alerts", description: "Review threat notifications", href: "/dashboard/alerts", icon: Bell },
]

export function ProView() {
  const { user } = useUser()

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <Crown className="mr-1 h-3 w-3" />
            Pro
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Here's your security overview for today
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  {stat.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                  {stat.change}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Quick Actions & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                      <action.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <Card className="p-4">
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted shrink-0">
                    <activity.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Professor Shield CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <Card className="p-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-primary/20">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 shrink-0">
              <Bot className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold mb-1">Need security guidance?</h3>
              <p className="text-sm text-muted-foreground">
                Professor Shield is ready to answer your cybersecurity questions
              </p>
            </div>
            <Button className="gap-2 shrink-0" asChild>
              <Link href="/dashboard/chat">
                Start Chat <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
