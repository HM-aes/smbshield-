"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer } from "@/components/animated/stagger-container";
import { FadeIn } from "@/components/animated/fade-in";
import {
  FileWarning,
  Syringe,
  BrainCircuit,
  Banknote,
  ShieldAlert,
  MailWarning,
  TerminalSquare,
  Fingerprint,
  type LucideIcon,
} from "lucide-react";

interface RiskItem {
  tag: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const risks: RiskItem[] = [
  {
    tag: "OWASP LLM06",
    title: "Sensitive Data Leakage",
    description:
      "Employee pastes Q3 strategy into a public chatbot. Now it's part of the public model's training data.",
    icon: FileWarning,
  },
  {
    tag: "OWASP LLM01",
    title: "Prompt Injection",
    description:
      'Hackers use "jailbreak" phrases to trick your AI into ignoring rules and revealing customer DBs.',
    icon: Syringe,
  },
  {
    tag: "OWASP LLM09",
    title: "Hallucinations",
    description:
      "Your AI Agent invents a refund policy that doesn't exist. You are liable for what it promises.",
    icon: BrainCircuit,
  },
  {
    tag: "OWASP LLM04",
    title: "Model Denial of Service",
    description:
      "Competitors flood your bot with complex queries, spiking your API bill to €5k overnight.",
    icon: Banknote,
  },
  {
    tag: "OWASP LLM05",
    title: "Supply Chain Infection",
    description:
      'That pre-trained model you downloaded contained a hidden "backdoor" trigger.',
    icon: ShieldAlert,
  },
  {
    tag: "OWASP LLM08",
    title: "Excessive Agency",
    description:
      "An Agent with bad permissions accidentally emails 500 unapproved drafts to VIP clients.",
    icon: MailWarning,
  },
  {
    tag: "OWASP LLM02",
    title: "Insecure Output",
    description:
      "AI generates malicious code that your app runs blindly, deleting your database.",
    icon: TerminalSquare,
  },
  {
    tag: "AI FRAUD",
    title: "Deepfake Social Eng.",
    description:
      "An AI voice clone calls finance sounding like the CEO, requesting an urgent wire transfer.",
    icon: Fingerprint,
  },
];

export function RiskTicker() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeIn triggerOnScroll>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Real AI Risks That Hit SMBs{" "}
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Today
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              These aren't hypothetical scenarios. Every card below is a real
              attack vector from the{" "}
              <span className="font-semibold text-foreground">
                OWASP Top 10 for LLMs
              </span>
              .
            </p>
          </div>
        </FadeIn>

        {/* Risk Cards Grid */}
        <StaggerContainer staggerDelay={0.1} triggerOnScroll>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {risks.map((risk) => {
              const Icon = risk.icon;
              return (
                <Card
                  key={risk.tag}
                  className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <Icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                      <Badge variant="outline" className="text-xs">
                        {risk.tag}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {risk.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {risk.description}
                    </CardDescription>
                  </CardContent>

                  {/* Hover accent */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </Card>
              );
            })}
          </div>
        </StaggerContainer>
      </div>

      {/* Background gradient accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
    </section>
  );
}
