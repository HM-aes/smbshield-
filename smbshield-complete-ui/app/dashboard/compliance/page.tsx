"use client"

import { useUser } from "@/contexts/user-context"
import { UpgradePrompt } from "@/components/dashboard/upgrade-prompt"
import { motion } from "framer-motion"
import { ClipboardCheck, CheckCircle, Circle, AlertCircle, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const complianceFrameworks = [
  {
    id: "gdpr",
    name: "GDPR",
    description: "General Data Protection Regulation",
    progress: 75,
    totalTasks: 24,
    completedTasks: 18,
  },
  {
    id: "nis2",
    name: "NIS2",
    description: "Network and Information Security Directive",
    progress: 45,
    totalTasks: 32,
    completedTasks: 14,
  },
  {
    id: "iso27001",
    name: "ISO 27001",
    description: "Information Security Management",
    progress: 30,
    totalTasks: 40,
    completedTasks: 12,
  },
]

const recentTasks = [
  { id: 1, title: "Update privacy policy", framework: "GDPR", status: "completed" },
  { id: 2, title: "Conduct risk assessment", framework: "NIS2", status: "in_progress" },
  { id: 3, title: "Document incident response plan", framework: "ISO 27001", status: "pending" },
  { id: 4, title: "Review access controls", framework: "GDPR", status: "pending" },
]

function ComplianceContent() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <ClipboardCheck className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Compliance Tracker</h1>
        </div>
        <p className="text-muted-foreground">
          Track your progress across security and privacy frameworks
        </p>
      </motion.div>

      {/* Framework Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {complianceFrameworks.map((framework, i) => (
          <motion.div
            key={framework.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant="outline" className="mb-2">{framework.name}</Badge>
                  <p className="text-sm text-muted-foreground">{framework.description}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{framework.completedTasks}/{framework.totalTasks} tasks</span>
                  <span className="font-medium">{framework.progress}%</span>
                </div>
                <Progress value={framework.progress} className="h-2" />
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 gap-1">
                View Tasks <ArrowRight className="h-3 w-3" />
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
        <Card className="divide-y">
          {recentTasks.map((task) => (
            <div key={task.id} className="p-4 flex items-center gap-4">
              {task.status === "completed" ? (
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
              ) : task.status === "in_progress" ? (
                <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
              <div className="flex-1">
                <p className="font-medium">{task.title}</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  {task.framework}
                </Badge>
              </div>
              <Badge
                variant={
                  task.status === "completed"
                    ? "default"
                    : task.status === "in_progress"
                    ? "secondary"
                    : "outline"
                }
              >
                {task.status.replace("_", " ")}
              </Badge>
            </div>
          ))}
        </Card>
      </motion.div>
    </div>
  )
}

export default function CompliancePage() {
  const { isPro } = useUser()

  if (!isPro) {
    return (
      <UpgradePrompt
        feature="Compliance Tracker"
        description="Track your compliance progress across GDPR, NIS2, and other frameworks."
        benefits={[
          "GDPR compliance checklist",
          "NIS2 readiness tracking",
          "ISO 27001 task management",
          "Progress reports and exports",
        ]}
      />
    )
  }

  return <ComplianceContent />
}
