"use client"

import {
    ArrowRight,
    MessageSquareQuote,
    ShieldAlert,
    Unplug,
    Box,
    Bot,
    FileLock,
    Code2,
    Sprout,
    BookX,
    Loader,
} from "lucide-react";
import { PageTransition } from "@/components/transitions/page-transition";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animated/fade-in";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const llmData = [
    {
    slug: "llm01",
    title: "LLM01: Prompt Injection",
    description: "Tricking the LLM to ignore its original instructions and perform unintended actions.",
    icon: MessageSquareQuote,
  },
  {
    slug: "llm02",
    title: "LLM02: Sensitive Info Disclosure",
    description: "When an LLM accidentally reveals confidential data in its responses.",
    icon: FileLock,
  },
  {
    slug: "llm03",
    title: "LLM03: Insecure Output Handling",
    description: "Failing to sanitize LLM responses, leading to downstream vulnerabilities like XSS or SQL injection.",
    icon: Code2,
  },
  {
    slug: "llm04",
    title: "LLM04: Model Poisoning",
    description: "Tainting training data to compromise the model's integrity, security, or ethical behavior.",
    icon: Sprout,
  },
  {
    slug: "llm05",
    title: "LLM05: Excessive Agency",
    description: "When an LLM is given too much autonomy and takes unintended, impactful actions.",
    icon: Bot,
  },
  {
    slug: "llm06",
    title: "LLM06: Supply Chain Vulnerabilities",
    description: "Using insecure third-party models, plugins, or data sources.",
    icon: Box,
  },
  {
    slug: "llm07",
    title: "LLM07: System Prompt Leakage",
    description: "An attacker extracting the LLM's confidential initial instructions or system prompts.",
    icon: Unplug,
  },
  {
    slug: "llm08",
    title: "LLM08: Misinformation",
    description: "The model generating false or misleading information that appears factual.",
    icon: BookX,
  },
  {
    slug: "llm09",
    title: "LLM09: Unbounded Consumption",
    description: "The model consuming excessive resources, leading to Denial of Service or unexpected costs.",
    icon: Loader,
  },
  {
    slug: "llm10",
    title: "LLM10: Training Data Poisoning",
    description: "A specific attack where training data is manipulated to create vulnerabilities or backdoors.",
    icon: ShieldAlert,
  },
]

export default function ThreatDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const threat = llmData.find((t) => t.slug === slug);

  if (!threat) {
    notFound();
  }

  const Icon = threat.icon;
  const SandboxComponent = (
    <div className="flex items-center justify-center h-48 rounded-lg bg-muted/50">
        <p className="text-muted-foreground">Interactive module coming soon...</p>
    </div>
  );

  return (
    <PageTransition className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <Link href="/resources/owasp-top-10-llm" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                &larr; Back to LLM Top 10 Hub
            </Link>
          </div>
          
          <div className="mb-12 flex items-center gap-4">
             <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{threat.title}</h1>
            </div>
          </div>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <FadeIn delay={0.2}>
                    <Card>
                        <CardHeader>
                            <CardTitle>What is it?</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground space-y-4">
                           <p>{threat.description}</p>
                        </CardContent>
                    </Card>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <div className="mt-8">
                     <Card className="bg-destructive/10 border-destructive/50">
                        <CardHeader>
                            <CardTitle>The "Sandbox": Interactive Example</CardTitle>
                            <CardDescription>Experience a simplified version of this attack.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {SandboxComponent}
                        </CardContent>
                    </Card>
                  </div>
                </FadeIn>
            </div>
            <div className="md:col-span-1">
                <FadeIn delay={0.6}>
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>SMBShield Solution</CardTitle>
                            <CardDescription>How we protect you from {threat.title}.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">Our AI-powered scanner continuously checks for LLM vulnerabilities, helping you secure your GenAI systems.</p>
                                <Button className="w-full" asChild>
                                    <Link href="/dashboard">
                                        See it in Action <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </div>

      </div>
    </PageTransition>
  )
}

// Note: generateStaticParams cannot be used with "use client" in Next.js 16+
// Dynamic routes will be rendered on-demand instead of pre-generated
