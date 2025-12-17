"use client"

import { BookOpen, CheckCircle2, Circle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const owaspModules = [
  { code: "A01", title: "Broken Access Control", progress: 100, completed: true },
  { code: "A02", title: "Cryptographic Failures", progress: 100, completed: true },
  { code: "A03", title: "Injection", progress: 70, completed: false },
  { code: "A04", title: "Insecure Design", progress: 0, completed: false },
  { code: "A05", title: "Security Misconfiguration", progress: 0, completed: false },
  { code: "A06", title: "Vulnerable Components", progress: 0, completed: false },
  { code: "A07", title: "Auth Failures", progress: 0, completed: false },
  { code: "A08", title: "Software & Data Integrity", progress: 0, completed: false },
  { code: "A09", title: "Security Logging Failures", progress: 0, completed: false },
  { code: "A10", title: "SSRF", progress: 0, completed: false },
]

export default function OWASPPage() {
  const completedCount = owaspModules.filter((m) => m.completed).length
  const overallProgress = Math.round(
    owaspModules.reduce((acc, m) => acc + m.progress, 0) / owaspModules.length
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-blue-400" />
          OWASP Top 10 Learning
        </h1>
        <p className="text-slate-400 mt-1">
          Master web application security fundamentals
        </p>
      </div>

      {/* Progress Overview */}
      <div
        className={cn(
          "p-6 rounded-xl",
          "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
          "border border-blue-500/20"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-400">Overall Progress</p>
            <p className="text-3xl font-bold text-white">
              {completedCount}/10{" "}
              <span className="text-lg font-normal text-slate-400">
                modules
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Completion</p>
            <p className="text-3xl font-bold text-blue-400">{overallProgress}%</p>
          </div>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {owaspModules.map((module, index) => (
          <div
            key={module.code}
            className={cn(
              "p-4 rounded-xl",
              "bg-slate-800/50 border border-slate-700/50",
              "hover:border-slate-600 hover:bg-slate-800/70",
              "transition-all duration-200 cursor-pointer group"
            )}
          >
            <div className="flex items-start gap-4">
              {/* Status Icon */}
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  module.completed
                    ? "bg-green-500/20 text-green-400"
                    : module.progress > 0
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-slate-700/50 text-slate-500"
                )}
              >
                {module.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : module.progress > 0 ? (
                  <Circle className="w-5 h-5" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-slate-500">
                    {module.code}
                  </span>
                  {module.completed && (
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-green-500/20 text-green-400">
                      COMPLETE
                    </span>
                  )}
                </div>
                <h3 className="font-medium text-white group-hover:text-blue-300 transition-colors">
                  {module.title}
                </h3>

                {/* Progress Bar */}
                {!module.completed && module.progress > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
