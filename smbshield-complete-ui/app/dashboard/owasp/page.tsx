"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Shield, CheckCircle, Lock, ArrowRight, ArrowLeft, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useUser } from "@/contexts/user-context"

const owaspTopics = [
  {
    id: "A01",
    title: "Broken Access Control",
    description: "Moving up from fifth position, 94% of applications were tested for some form of broken access control.",
    progress: 100,
    lessons: 5,
    completedLessons: 5,
  },
  {
    id: "A02",
    title: "Cryptographic Failures",
    description: "Previously known as Sensitive Data Exposure, focuses on failures related to cryptography.",
    progress: 60,
    lessons: 4,
    completedLessons: 2,
  },
  {
    id: "A03",
    title: "Injection",
    description: "94% of applications tested for injection, including SQL, NoSQL, OS, and LDAP injection.",
    progress: 40,
    lessons: 6,
    completedLessons: 2,
  },
  {
    id: "A04",
    title: "Insecure Design",
    description: "A new category focusing on risks related to design and architectural flaws.",
    progress: 0,
    lessons: 4,
    completedLessons: 0,
  },
  {
    id: "A05",
    title: "Security Misconfiguration",
    description: "90% of applications were tested for some form of misconfiguration.",
    progress: 0,
    lessons: 5,
    completedLessons: 0,
  },
  {
    id: "A06",
    title: "Vulnerable Components",
    description: "Using components with known vulnerabilities is a common and dangerous practice.",
    progress: 0,
    lessons: 3,
    completedLessons: 0,
    proOnly: true,
  },
  {
    id: "A07",
    title: "Auth Failures",
    description: "Confirmation of identity, authentication, and session management vulnerabilities.",
    progress: 0,
    lessons: 5,
    completedLessons: 0,
    proOnly: true,
  },
  {
    id: "A08",
    title: "Data Integrity Failures",
    description: "New category focusing on software and data integrity failures.",
    progress: 0,
    lessons: 4,
    completedLessons: 0,
    proOnly: true,
  },
  {
    id: "A09",
    title: "Logging Failures",
    description: "Without proper logging and monitoring, breaches cannot be detected.",
    progress: 0,
    lessons: 3,
    completedLessons: 0,
    proOnly: true,
  },
  {
    id: "A10",
    title: "SSRF",
    description: "Server-Side Request Forgery flaws occur when fetching remote resources.",
    progress: 0,
    lessons: 3,
    completedLessons: 0,
    proOnly: true,
  },
]

export default function OWASPPage() {
  const { isPro, updateUserTier } = useUser()

  const totalLessons = owaspTopics.reduce((acc, t) => acc + t.lessons, 0)
  const completedLessons = owaspTopics.reduce((acc, t) => acc + t.completedLessons, 0)
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        {/* Back Navigation */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>← Dashboard</span>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">OWASP Top 10 Learning</h1>
        </div>
        <p className="text-muted-foreground">
          Master the most critical web application security risks
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Your Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
            <Badge variant="secondary">{overallProgress}%</Badge>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </Card>
      </motion.div>

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {owaspTopics.map((topic, i) => {
          const isLocked = topic.proOnly && !isPro

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card
                className={`p-5 h-full transition-colors ${
                  isLocked ? "opacity-60" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">
                      {topic.id}
                    </Badge>
                    {topic.progress === 100 && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  {!isLocked && topic.progress > 0 && topic.progress < 100 && (
                    <Badge variant="secondary" className="text-xs">
                      {topic.progress}%
                    </Badge>
                  )}
                </div>

                <h3 className={`font-semibold mb-2 ${isLocked ? "text-muted-foreground" : ""}`}>
                  {topic.title}
                </h3>
                <p className={`text-sm mb-4 ${isLocked ? "text-muted-foreground/70" : "text-muted-foreground"}`}>
                  {topic.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{topic.lessons} lessons</span>
                  </div>
                  {isLocked ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1"
                      onClick={() => updateUserTier("pro")}
                    >
                      <Lock className="h-3 w-3" />
                      Unlock Pro
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" className="gap-1">
                      {topic.progress === 0 ? "Start" : topic.progress === 100 ? "Review" : "Continue"}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                {!isLocked && topic.progress > 0 && (
                  <Progress value={topic.progress} className="h-1 mt-4" />
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
