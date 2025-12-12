import Link from "next/link"
import { BookOpen, ExternalLink, GraduationCap, Lightbulb } from "lucide-react"

import { PageTransition } from "@/components/transitions/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const learningTracks = [
  {
    title: "Security Foundations for SMB Leaders",
    duration: "2 hours",
    description: "Plain-language crash course that covers governance, risk, and the controls auditors expect.",
    outcomes: "Build your first risk register and communicate priorities with confidence.",
    url: "/dashboard",
  },
  {
    title: "OWASP Top 10 in Practice",
    duration: "3 hours",
    description: "Hands-on walkthrough of common vulnerabilities with remediation playbooks for product squads.",
    outcomes: "Spot insecure patterns in code reviews and prioritize fixes with engineering leads.",
    url: "/dashboard/owasp",
  },
  {
    title: "Incident Response Tabletop",
    duration: "90 minutes",
    description: "Scenario-based exercises that teach cross-functional teams how to react to ransomware.",
    outcomes: "Define roles, escalation paths, and post-incident reporting templates.",
    url: "/dashboard",
  },
]

const externalResources = [
  {
    name: "OWASP Cheat Sheet Series",
    description: "Concise guidance for secure coding tasks such as authentication, logging, and secrets management.",
    url: "https://cheatsheetseries.owasp.org",
  },
  {
    name: "Cloud Security Alliance Guidance",
    description: "Vendor-neutral best practices for securing SaaS, IaaS, and multi-cloud environments.",
    url: "https://cloudsecurityalliance.org",
  },
  {
    name: "TryHackMe Defensive Path",
    description: "Guided labs that teach detection and response skills using realistic environments.",
    url: "https://tryhackme.com/path/outline/cyberdefense",
  },
  {
    name: "ENISA SMB Cybersecurity Guide",
    description: "EU-focused recommendations for building resilient security programs with limited staff.",
    url: "https://www.enisa.europa.eu/publications/cybersecurity-for-smes",
  },
]

export default function LearningPage() {
  return (
    <PageTransition className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Learning Center</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Upskill your team with curated cybersecurity learning paths
          </h1>
          <p className="text-lg text-muted-foreground">
            From first-time security leads to hands-on engineers, SMBShield delivers practical lessons,
            workshops, and templates that help you operationalize security quickly.
          </p>
        </div>

        {/* Learning Tracks */}
        <div className="grid gap-6 md:grid-cols-3">
          {learningTracks.map((track) => (
            <Card key={track.title} className="flex flex-col">
              <CardHeader>
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{track.title}</CardTitle>
                <CardDescription>{track.duration}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4 text-sm text-muted-foreground">
                <p>{track.description}</p>
                <p className="font-medium text-foreground">{track.outcomes}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={track.url}>Open in Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* External Resources */}
        <div className="mt-12">
          <div className="mb-6 flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div>
              <h2 className="text-2xl font-bold">Trusted resources beyond SMBShield</h2>
              <p className="text-muted-foreground">
                Layer your in-product lessons with respected open resources to reinforce learning.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              <Lightbulb className="h-5 w-5" />
              Learn continuously, not just during incidents.
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {externalResources.map((resource) => (
              <Card key={resource.name} className="hover-lift">
                <CardHeader>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{resource.name}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      Visit Resource
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-12 border-primary/30 bg-primary/5 text-center">
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold">Launch your security enablement program</h2>
            <p className="mb-6 text-muted-foreground">
              SMBShield translates complex frameworks into role-based lessons, quizzes, and action plans so
              everyone knows how to reduce risk.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">Explore the Learning Center</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}


