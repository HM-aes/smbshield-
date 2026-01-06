import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, AlertTriangle, Scale, FileText, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AI Security for Legal & Finance | Protect Client Data from AI Risks",
  description: "Your associates use ChatGPT. Do you know what they're sharing? Prevent client data exposure, privilege leakage, and AI hallucinations in legal and financial outputs.",
  keywords: [
    "legal AI security",
    "law firm AI risk",
    "financial services AI",
    "ChatGPT data leakage",
    "client confidentiality AI",
    "AI hallucination risk",
  ],
};

const threats = [
  {
    icon: FileText,
    title: "Client Data Exposure",
    description: "Staff paste confidential client documents, contracts, and financial data into ChatGPT — now potentially part of training data or accessible in shared accounts.",
    example: "Associate uploads M&A deal memo to Claude — confidential terms now in AI memory.",
  },
  {
    icon: Scale,
    title: "Privilege & Confidentiality Leakage",
    description: "Attorney-client privileged communications shared with AI tools may waive privilege protections under certain jurisdictions.",
    example: "Litigation strategy discussed with ChatGPT — privileged status potentially compromised.",
  },
  {
    icon: AlertTriangle,
    title: "AI Hallucination in Critical Outputs",
    description: "AI generates convincing but incorrect legal citations, financial figures, or regulatory guidance that staff rely upon without verification.",
    example: "AI cites non-existent case law in brief — malpractice risk and Bar complaint.",
  },
];

const protections = [
  "Weekly briefings on AI risks specific to legal and financial services",
  "Professor Shield trained on professional ethics and AI compliance",
  "Guidelines for acceptable AI use policies in regulated industries",
  "EU AI Act compliance tracking for professional services",
  "Templates for AI use policies, client disclosures, and risk assessments",
];

export default function ProfessionalServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-background" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container relative mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
              <Scale className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-400">Legal & Financial Services</span>
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Your Associates Use{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ChatGPT
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal mt-4 block">
                Do You Know What They're Sharing?
              </span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Professional services firms face unique AI risks — client confidentiality, privilege protection, 
              and regulatory compliance. Get the guidance your team needs.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600" asChild>
                <Link href="/dashboard">
                  Get Legal/Finance Security Intel
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500/30" asChild>
                <Link href="/dashboard/chat">
                  Ask Professor Shield
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Threats Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Key Threats to Professional Services
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              AI adoption in law and finance is accelerating — but so are the risks to your clients and your firm.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {threats.map((threat, index) => (
              <div 
                key={index}
                className="group rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <threat.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{threat.title}</h3>
                <p className="mb-4 text-muted-foreground">{threat.description}</p>
                <div className="rounded-lg bg-gray-900 p-3 font-mono text-sm text-purple-400">
                  {threat.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 border-t border-gray-800 bg-gray-950/50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                SMBShield for{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Professional Services
                </span>
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Security intelligence built for regulated industries. We help your firm adopt AI 
                responsibly while protecting client confidentiality and professional obligations.
              </p>
              
              <ul className="space-y-4">
                {protections.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-green-400" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600" asChild>
                  <Link href="/dashboard">
                    Protect Your Practice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent p-8">
              <div className="mb-6 flex items-center gap-3">
                <Shield className="h-8 w-8 text-purple-400" />
                <span className="text-xl font-semibold text-foreground">For Regulated Industries</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Law Firms", "Accounting", "Investment Banks", "Wealth Management", "Consulting", "Compliance"].map((industry) => (
                  <div key={industry} className="rounded-lg bg-gray-900 px-4 py-3 text-center text-sm text-muted-foreground">
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Protect Client Confidentiality in the AI Era
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Your professional obligations don't disappear when using AI. Get the guidance your firm needs.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600" asChild>
            <Link href="/dashboard">
              Start Free — Upgrade When Ready
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
