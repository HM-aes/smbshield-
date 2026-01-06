"use client"

import { useUser } from "@/contexts/user-context"
import { UpgradePrompt } from "@/components/dashboard/upgrade-prompt"
import { motion } from "framer-motion"
import { FileText, Download, Clock, Eye } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const briefings = [
  {
    id: 1,
    title: "December 2025 Threat Landscape Report",
    date: "Dec 10, 2025",
    readTime: "12 min",
    category: "Monthly Report",
    isNew: true,
  },
  {
    id: 2,
    title: "AI-Powered Phishing: What SMBs Need to Know",
    date: "Dec 5, 2025",
    readTime: "8 min",
    category: "Threat Analysis",
    isNew: true,
  },
  {
    id: 3,
    title: "NIS2 Compliance Checklist for European SMBs",
    date: "Nov 28, 2025",
    readTime: "15 min",
    category: "Compliance",
    isNew: false,
  },
  {
    id: 4,
    title: "Ransomware Trends Q4 2025",
    date: "Nov 20, 2025",
    readTime: "10 min",
    category: "Threat Analysis",
    isNew: false,
  },
]

function BriefingsContent() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Security Briefings</h1>
        </div>
        <p className="text-muted-foreground">
          Expert analysis and reports on the latest security threats
        </p>
      </motion.div>

      <div className="space-y-4">
        {briefings.map((briefing, i) => (
          <motion.div
            key={briefing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{briefing.category}</Badge>
                    {briefing.isNew && (
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        New
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{briefing.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{briefing.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {briefing.readTime}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function BriefingsPage() {
  const { isPro } = useUser()

  if (!isPro) {
    return (
      <UpgradePrompt
        feature="Security Briefings"
        description="Access expert security analysis and monthly threat reports tailored for SMBs."
        benefits={[
          "Monthly threat landscape reports",
          "Industry-specific security analysis",
          "Compliance guidance (GDPR, NIS2)",
          "Download reports as PDF",
        ]}
      />
    )
  }

  return <BriefingsContent />
}
