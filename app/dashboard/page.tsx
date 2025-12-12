"use client"

import Link from "next/link"
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const stats = [
  {
    title: "Briefings Received",
    value: "12",
    change: "+2 this month",
    trend: "up",
  },
  {
    title: "Threats Detected",
    value: "34",
    change: "+8 this week",
    trend: "up",
  },
  {
    title: "Compliance Alerts",
    value: "5",
    change: "2 pending review",
    trend: "down",
  },
  {
    title: "Security Score",
    value: "87%",
    change: "+5% improvement",
    trend: "neutral",
  },
] as const

const trendIcons = {
  up: ArrowUp,
  down: ArrowDown,
  neutral: TrendingUp,
} as const

const trendColors = {
  up: "text-emerald-500",
  down: "text-rose-500",
  neutral: "text-muted-foreground",
} as const

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your security this week.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const TrendIcon = trendIcons[stat.trend]
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <TrendIcon className={`h-4 w-4 ${trendColors[stat.trend]}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Latest Briefing */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Weekly Briefing</CardTitle>
          <CardDescription>Week of November 11-17, 2024</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">🛡️ OWASP Top 10 Update</h3>
            <p className="text-sm text-muted-foreground">
              New vulnerabilities in authentication systems detected. Broken access control remains the #1 risk for SMBs.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">🤖 GenAI Security Risks</h3>
            <p className="text-sm text-muted-foreground">
              Prompt injection attacks increased by 23%. Learn how to protect your AI systems.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">🇪🇺 EU Compliance Alert</h3>
            <p className="text-sm text-muted-foreground">
              GDPR enforcement cases up 15%. New AI Act requirements coming in 2025.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/briefings">View Full Briefing</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">🤖 Ask AI Assistant</CardTitle>
            <CardDescription>Get instant answers to security questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/chat">Start Chat</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">📚 Learn OWASP Top 10</CardTitle>
            <CardDescription>Interactive security training modules</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/owasp">Start Learning</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">📧 All Briefings</CardTitle>
            <CardDescription>Access your complete briefing archive</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/briefings">View Archive</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
