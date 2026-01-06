"use client"

import {
    ArrowRight,
    DatabaseZap,
    DraftingCompass,
    FileScan,
    Fingerprint,
    KeyRound,
    Puzzle,
    ServerCrash,
    Settings2,
    ShieldCheck,
    ShieldOff
} from "lucide-react";
import { PageTransition } from "@/components/transitions/page-transition";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/animated/fade-in";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { A01Sandbox } from "@/components/owasp/a01-sandbox";

const owaspData = [
  {
    id: "a01-broken-access-control",
    title: "Broken Access Control",
    category: "A01:2021",
    icon: ShieldOff,
    summary: "Users can act outside of their intended permissions.",
    description: "This is the most serious web application security risk. It occurs when an application fails to properly enforce restrictions on what authenticated users are allowed to do. Attackers can exploit these flaws to access other users' accounts, view sensitive files, or change other users' data.",
  },
  {
    id: "a02-cryptographic-failures",
    title: "Cryptographic Failures",
    category: "A02:2021",
    icon: KeyRound,
    summary: "Failure to properly protect sensitive data like credentials.",
    description: "Previously known as 'Sensitive Data Exposure,' this category focuses on failures related to cryptography (or lack thereof). A common example is storing data in plaintext, such as passwords or credit card information, which can lead to massive data breaches if compromised.",
  },
  {
    id: "a03-injection",
    title: "Injection",
    category: "A03:2021",
    icon: DatabaseZap,
    summary: "Untrusted data is sent to an interpreter as part of a command.",
    description: "Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when an attacker can send hostile data to an interpreter. This can trick the interpreter into executing unintended commands or accessing data without proper authorization, often leading to data theft or loss.",
  },
  {
    id: "a04-insecure-design",
    title: "Insecure Design",
    category: "A04:2021",
    icon: DraftingCompass,
    summary: "Flaws in the application's fundamental architecture.",
    description: "A new category for 2021, this focuses on risks related to design and architectural flaws. It calls for more use of threat modeling, secure design patterns, and reference architectures. Secure design is a foundational principle of building resilient software.",
  },
  {
    id: "a05-security-misconfiguration",
    title: "Security Misconfiguration",
    category: "A05:2021",
    icon: Settings2,
    summary: "Missing or insecure configuration of security settings.",
    description: "This risk can happen at any level of an application stack, including the network services, platform, web server, application server, database, and custom code. Common examples include leaving default accounts enabled, having unnecessary features enabled, or overly verbose error messages.",
  },
    {
    id: "a06-vulnerable-components",
    title: "Vulnerable Components",
    category: "A06:2021",
    icon: Puzzle,
    summary: "Using libraries and frameworks with known security flaws.",
    description: "If you know a component you are using is vulnerable, you are opening your application to attack. This risk, also known as 'Using Components with Known Vulnerabilities,' requires diligent management of your dependencies to ensure they are always patched and up-to-date.",
  },
  {
    id: "a07-identification-failures",
    title: "Identification & Auth Failures",
    category: "A07:2021",
    icon: Fingerprint,
    summary: "Weaknesses in user identity and session management.",
    description: "Previously 'Broken Authentication,' this category is now broader. It includes weaknesses in session management, allowing attackers to hijack sessions or impersonate users. It also covers allowing weak passwords or failing to implement multi-factor authentication.",
  },
  {
    id: "a08-software-integrity-failures",
    title: "Software & Data Integrity",
    category: "A08:2021",
    icon: ShieldCheck,
    summary: "Failures relating to code and infrastructure integrity.",
    description: "This category focuses on making assumptions about the integrity of software updates, critical data, and CI/CD pipelines without verification. A prime example is 'insecure deserialization,' where an application accepts serialized data from an untrusted source, which can lead to remote code execution.",
  },
  {
    id: "a09-logging-monitoring-failures",
    title: "Logging & Monitoring Failures",
    category: "A09:2021",
    icon: FileScan,
    summary: "Insufficient logging, monitoring, or response.",
    description: "Without proper logging and monitoring, it's impossible to detect suspicious activity. This makes it very difficult to track and respond to an attack in progress, allowing attackers to persist in a system for long periods, pivot to other systems, and extract or destroy data.",
  },
  {
    id: "a10-server-side-request-forgery",
    title: "Server-Side Request Forgery",
    category: "A10:2021",
    icon: ServerCrash,
    summary: "Forcing a server to send requests on an attacker's behalf.",
    description: "SSRF flaws occur whenever a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send a crafted request to an unexpected destination, even when protected by a firewall or VPN.",
  },
]

// Define a mapping for sandbox components
const sandboxComponents = {
  "a01-broken-access-control": <A01Sandbox />,
};

export default function ThreatDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const threat = owaspData.find((t) => t.id === slug);

  if (!threat) {
    notFound();
  }

  const Icon = threat.icon;
  const SandboxComponent = sandboxComponents[threat.id] || (
    <div className="flex items-center justify-center h-48 rounded-lg bg-muted/50">
        <p className="text-muted-foreground">Interactive module coming soon...</p>
    </div>
  );

  return (
    <PageTransition className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <Link href="/resources/owasp-top-10" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                &larr; Back to OWASP Top 10 Hub
            </Link>
          </div>
          
          <div className="mb-12 flex items-center gap-4">
             <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-mono text-lg text-muted-foreground">{threat.category}</p>
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
                     {SandboxComponent}
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
                                <p className="text-muted-foreground">Our AI-powered scanner continuously checks for access control vulnerabilities across your applications, ensuring private data stays private.</p>
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
