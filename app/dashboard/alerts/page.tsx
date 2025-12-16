"use client"

import { useUser } from "@/contexts/user-context"
import { UpgradePrompt } from "@/components/dashboard/upgrade-prompt"
import { motion } from "framer-motion"
import { Bell, AlertTriangle, CheckCircle, Clock, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    id: 1,
    title: "Critical: New Zero-Day in Popular WordPress Plugin",
    severity: "critical",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Warning: Phishing Campaign Targeting EU Financial Sector",
    severity: "high",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Info: Microsoft Patch Tuesday Updates Available",
    severity: "medium",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "Warning: New Ransomware Variant Detected",
    severity: "high",
    time: "2 days ago",
    read: true,
  },
]

const severityColors = {
  critical: "bg-red-500/10 text-red-500 border-red-500/20",
  high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
}

function AlertsContent() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Bell className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Threat Alerts</h1>
            </div>
            <p className="text-muted-foreground">
              Real-time security notifications relevant to your business
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </motion.div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              className={`p-4 transition-colors cursor-pointer ${
                alert.read ? "opacity-70" : "border-l-4 border-l-primary"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  {alert.severity === "critical" || alert.severity === "high" ? (
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.severity === "critical" ? "text-red-500" : "text-orange-500"
                    }`} />
                  ) : (
                    <Bell className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={severityColors[alert.severity as keyof typeof severityColors]}
                    >
                      {alert.severity}
                    </Badge>
                    {!alert.read && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <h3 className="font-medium mb-1">{alert.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {alert.time}
                  </div>
                </div>
                {alert.read && (
                  <CheckCircle className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function AlertsPage() {
  const { isPro } = useUser()

  if (!isPro) {
    return (
      <UpgradePrompt
        feature="Threat Alerts"
        description="Get real-time notifications about security threats relevant to your business."
        benefits={[
          "Real-time threat notifications",
          "Industry-specific alerts",
          "Severity-based prioritization",
          "Email and in-app notifications",
        ]}
      />
    )
  }

  return <AlertsContent />
}
