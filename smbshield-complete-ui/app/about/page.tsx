import Link from "next/link"
import { Shield, Target, Users, Heart, Activity, ShieldCheck, Search, Lock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

      {/* Founder Story Section (Dark Metallic AI Design) */}
      <section className="py-20 border-y border-zinc-800 bg-zinc-950 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">

                {/* Visual: Neural Logic Core */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                     <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50 overflow-hidden transform transition-transform hover:scale-[1.02] duration-500 group">
                        {/* Glow Effect */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-zinc-500/10 blur-[60px] rounded-full group-hover:bg-zinc-400/20 transition-colors" />

                        {/* HUD Header */}
                        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur">
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-emerald-500" />
                                <span className="text-xs font-mono font-bold text-zinc-400">FOUNDER.PROFILE</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                <div className="w-2 h-2 rounded-full bg-zinc-700" />
                            </div>
                        </div>

                        {/* HUD Content */}
                        <div className="p-6 space-y-6 font-mono text-xs md:text-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between text-zinc-500">
                                    <span>TARGET_SECTOR</span>
                                    <span>[SMB_GLOBAL]</span>
                                </div>
                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-emerald-500/50" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <ShieldCheck className="h-4 w-4 text-indigo-400" />
                                    <span>PROTOCOL: WALL_STREET_GRADE_DEFENSE</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Search className="h-4 w-4 text-indigo-400" />
                                    <span>VULNERABILITY_SCOPE: AI_AGENTS</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Lock className="h-4 w-4 text-indigo-400" />
                                    <span>ACCESS: DEMOCRATIZED</span>
                                </div>
                            </div>

                            <div className="p-3 bg-zinc-950/50 rounded border border-zinc-800/50 text-zinc-400 leading-relaxed">
                                {`> INITIATING MISSION...`} <br/>
                                {`> "The tools to hack are free.`} <br/>
                                {`>  The tools to defend shouldn't be luxury."`}
                            </div>
                        </div>

                        {/* Scanline */}
                        <div className="absolute inset-0 pointer-events-none bg-[url('/scanline.png')] opacity-[0.03] mix-blend-overlay" />
                     </div>
                </div>

                {/* Narrative (Founder Story) */}
                <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono tracking-widest uppercase">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                        <span>Mission Briefing</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
                        The Untold Threat: <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">
                            Why I Left Wall Street to Protect Main Street.
                        </span>
                    </h2>

                    <div className="space-y-6 text-lg text-zinc-400 leading-relaxed max-w-2xl">
                        <p>
                            I spent years training bankers on the trading floors of <strong className="text-zinc-200 font-medium">Tier-1 Global Banks</strong>. I managed global comms systems for <strong className="text-zinc-200 font-medium">Reuters</strong> from London to Saudi Arabia.
                        </p>
                        <p>
                            Then I discovered a terrifying truth: <span className="text-indigo-400">The same automated Python tools used to attack banks are now being used to target local businesses.</span> But unlike the banks, you don't have a billion-dollar security team.
                        </p>
                        <p className="border-l-2 border-indigo-500 pl-4 py-1 italic text-zinc-300">
                            "I built SMBShield to bridge that gap. To bring enterprise-grade AI defense to the rest of us."
                        </p>
                    </div>

                    <div className="pt-2">
                        <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-lg shadow-indigo-900/20" asChild>
                             <Link href="/blog/why-i-started-smbshield">
                                Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

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
