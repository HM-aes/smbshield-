import Link from "next/link"
import { Activity, Bug, ExternalLink, Lock, Radar, Search, ShieldCheck } from "lucide-react"

import { PageTransition } from "@/components/transitions/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    name: "Shodan Monitor",
    category: "Attack Surface",
    description: "Continuously tracks exposed services and alerts you when new assets appear on the internet.",
    url: "https://monitor.shodan.io",
    icon: Radar,
  },
  {
    name: "Have I Been Pwned",
    category: "Credential Monitoring",
    description: "Detect leaked employee passwords and trigger mandatory resets before attackers reuse them.",
    url: "https://haveibeenpwned.com",
    icon: ShieldCheck,
  },
  {
    name: "CISA Known Exploited Vulns",
    category: "Patch Prioritization",
    description: "Government-maintained catalogue of actively exploited CVEs for faster remediation decisions.",
    url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    icon: Search,
  },
  {
    name: "Security Headers",
    category: "Baseline Hardening",
    description: "Free scanner that checks HTTP response headers and gives actionable hardening advice.",
    url: "https://securityheaders.com",
    icon: Lock,
  },
  {
    name: "Burp Suite Community",
    category: "Application Testing",
    description: "Swiss-army proxy for reproducing OWASP Top 10 issues across web applications and APIs.",
    url: "https://portswigger.net/burp/communitydownload",
    icon: Bug,
  },
  {
    name: "VirusTotal Graph",
    category: "Malware Intelligence",
    description: "Visualize relationships between files, URLs, and IPs to speed up incident investigations.",
    url: "https://www.virustotal.com/graph",
    icon: Activity,
  },
]

const evaluationTips = [
  "Start with free or low-cost tiers that match your asset inventory.",
  "Automate evidence collection so audits and customer assessments are painless.",
  "Integrate alerts with your existing collaboration tools to shorten response time.",
]

export default function ToolsPage() {
  return (
    <PageTransition className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Trusted Tooling</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Security Tools for Lean Teams</h1>
          <p className="text-lg text-muted-foreground">
            Build a modern security stack without burning your budget. These vendor-neutral tools help SMBs
            monitor exposure, validate controls, and respond faster.
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card key={tool.name} className="flex h-full flex-col">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{tool.name}</CardTitle>
                  <CardDescription>{tool.category}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-4">
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      Explore Tool
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Evaluation Tips */}
        <Card className="mt-12 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle>How to evaluate your security toolkit</CardTitle>
            <CardDescription>Focus on impact, integration, and coverage — not buzzwords.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
            {evaluationTips.map((tip) => (
              <div key={tip} className="rounded-md bg-background p-4">
                {tip}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="mt-12 text-center">
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold">See these tools inside one dashboard</h2>
            <p className="mb-6 text-muted-foreground">
              SMBShield consolidates threat feeds, asset visibility, and remediation plans so you can run a
              professional security program without a large team.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">Launch SMBShield</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}


