import { Shield, Target, Users, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const values = [
  {
    icon: Shield,
    title: "Security First",
    description: "We believe every business, regardless of size, deserves enterprise-grade security intelligence.",
  },
  {
    icon: Target,
    title: "SMB Focused",
    description: "Purpose-built for small and medium businesses with limited security resources.",
  },
  {
    icon: Users,
    title: "Plain Language",
    description: "No technical jargon. Security insights anyone can understand and act upon.",
  },
  {
    icon: Heart,
    title: "European Values",
    description: "Built for European SMBs with compliance and data privacy at our core.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Protecting European SMBs
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
                One Briefing at a Time
              </span>
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              We're on a mission to make enterprise-grade security intelligence accessible to every small and medium business in Europe.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-y bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Every week, thousands of security vulnerabilities are discovered, new threats emerge, and 
                regulations change. For large enterprises with dedicated security teams, staying ahead is 
                challenging but manageable.
              </p>
              <p>
                For small and medium businesses? It's nearly impossible.
              </p>
              <p>
                That's why we built SMBShield. We use AI to process hundreds of security sources, extract 
                what matters for SMBs, and deliver it in plain language you can actually use.
              </p>
              <p className="font-semibold text-foreground">
                No technical jargon. No information overload. Just the security intelligence you need to 
                protect your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              What We Stand For
            </h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover-lift">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                SMBShield was founded by HiTek, a cybersecurity professional with experience at Apple, 
                Google AI, and Meta. After years of working with enterprise-scale security systems, they 
                noticed a critical gap.
              </p>
              <p>
                Small and medium businesses faced the same threats as large enterprises, but lacked the 
                resources, expertise, and time to stay protected. Security briefings were written for 
                technical audiences. Compliance requirements were complex and overwhelming.
              </p>
              <p>
                The solution? Combine AI-powered intelligence gathering with a deep understanding of both 
                business and security. Create a service that bridges the gap between complex security 
                information and actionable business decisions.
              </p>
              <p>
                Today, SMBShield helps European SMBs stay ahead of threats, comply with regulations, and 
                protect their businesses—without needing a dedicated security team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">2024</div>
              <div className="text-muted-foreground">Founded</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Security sources monitored</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">European focused</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t bg-muted/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Meet the Team
            </h2>
            <p className="text-lg text-muted-foreground">
              The people behind SMBShield
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center md:flex-row md:text-left">
                  <div className="mb-6 flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-4xl font-bold text-white md:mb-0 md:mr-8">
                    HT
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold">HiTek</h3>
                    <p className="mb-4 text-primary">Founder & CEO</p>
                    <p className="text-muted-foreground">
                      Former Customer Specialist at Apple, AI Trust & Safety Specialist at Google AI, and 
                      Content Moderator at Meta. Specialized in AI cybersecurity engineering with a focus on 
                      making security accessible to SMBs across Europe.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
