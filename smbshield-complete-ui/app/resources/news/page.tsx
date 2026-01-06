import Link from "next/link"
import { ExternalLink, Newspaper } from "lucide-react"

import { PageTransition } from "@/components/transitions/page-transition"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const newsSources = [
  {
    name: "The Hacker News",
    url: "https://thehackernews.com",
    description: "Daily breach reports, malware analyses, and policy updates.",
  },
  {
    name: "Krebs on Security",
    url: "https://krebsonsecurity.com",
    description: "Investigative stories that explain how major attacks unfolded.",
  },
  {
    name: "Bleeping Computer",
    url: "https://www.bleepingcomputer.com",
    description: "Practical coverage of ransomware, patches, and tech disruptions.",
  },
  {
    name: "Dark Reading",
    url: "https://www.darkreading.com",
    description: "Deep dives for security leaders and hands-on defenders.",
  },
  {
    name: "SecurityWeek",
    url: "https://www.securityweek.com",
    description: "Enterprise-focused threat intelligence and vendor updates.",
  },
  {
    name: "Threatpost",
    url: "https://threatpost.com",
    description: "Fast-moving headlines and expert commentary on zero-days.",
  },
]

const briefingBenefits = [
  "Prioritize patches based on real-world exploits, not noise.",
  "Translate technical vulnerabilities into board-ready talking points.",
  "Get automatic summaries tailored to your industry and tech stack.",
]

export default function NewsPage() {
  return (
    <PageTransition className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Real-Time Awareness
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Cybersecurity News Hub for Busy SMB Teams
          </h1>
          <p className="text-lg text-muted-foreground">
            Track breaking threats, policy changes, and supply-chain vulnerabilities from trusted sources —
            curated for companies without a full-time security analyst.
          </p>
        </div>

        {/* Sources */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsSources.map((source) => (
            <Card key={source.name} className="flex flex-col">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Newspaper className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{source.name}</CardTitle>
                <CardDescription>{source.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    Visit Site
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Curated News */}
        <Card className="mt-12 border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle>Why curated security news matters for SMBs</CardTitle>
            <CardDescription>Use timely intelligence to move from reactive firefighting to proactive defense.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {briefingBenefits.map((benefit) => (
              <div key={benefit} className="rounded-md bg-background p-4 text-sm text-muted-foreground">
                {benefit}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="mt-12 text-center">
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold">Let SMBShield monitor the noise for you</h2>
            <p className="mb-6 text-muted-foreground">
              Our AI agents read hundreds of feeds per day, flag business-relevant threats, and deliver a
              briefing your leadership team can act on.
            </p>
            <Button asChild size="lg">
              <Link href="/dashboard">Get curated alerts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}


