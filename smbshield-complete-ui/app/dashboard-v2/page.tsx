"use client"

import {
  BookOpen,
  Shield,
  Library,
  Download,
} from "lucide-react"
import { StatCard, AIInsightsCard, ThreatCarousel } from "@/components/dashboard-v2"

export default function DashboardV2Page() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Welcome back! Here&apos;s your security overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpen}
          title="OWASP Progress"
          value="3/10"
          subtitle="modules completed"
          variant="default"
          trend="up"
          trendValue="+1"
          href="/dashboard-v2/owasp"
        />
        <StatCard
          icon={Shield}
          title="Security Score"
          value="72%"
          subtitle="Good"
          variant="success"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          icon={Library}
          title="My Library"
          value="12"
          subtitle="saved items"
          variant="warning"
          href="/dashboard-v2/library"
        />
        <StatCard
          icon={Download}
          title="Downloads"
          value="5"
          subtitle="this month"
          variant="default"
        />
      </div>

      {/* AI Insights Card */}
      <AIInsightsCard
        onAskProfessor={(context) => {
          // This would typically trigger the chat panel with the context
          console.log("Ask professor:", context)
        }}
      />

      {/* Threat Carousel */}
      <ThreatCarousel
        onThreatClick={(id) => {
          console.log("Threat clicked:", id)
        }}
      />
    </div>
  )
}
