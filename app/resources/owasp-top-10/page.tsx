"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldOff,
  KeyRound,
  DatabaseZap,
  DraftingCompass,
  Settings2,
  Puzzle,
  Fingerprint,
  ShieldCheck,
  FileScan,
  ServerCrash,
  ArrowRight,
} from "lucide-react"

import { PageTransition } from "@/components/transitions/page-transition"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animated/fade-in"

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

export default function OWASPResourcePage() {
  const [activeThreat, setActiveThreat] = useState(owaspData[0])

  return (
    <PageTransition className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <FadeIn>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              The SMB's Guide to Cyber Threats
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              The OWASP Top 10, Demystified
            </h1>
            <p className="text-lg text-muted-foreground">
              An interactive guide to the most critical web application security risks, designed for business leaders.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left Column: Threat List */}
          <aside className="lg:w-1/3">
            <h2 className="mb-4 text-xl font-bold">The Top 10 Risks</h2>
            <div className="flex flex-col gap-2">
              {owaspData.map((threat) => (
                <motion.div
                  key={threat.id}
                  onMouseEnter={() => setActiveThreat(threat)}
                  className={`rounded-lg p-4 transition-colors duration-200 ${
                    activeThreat.id === threat.id
                      ? "bg-primary/10"
                      : "cursor-pointer hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <threat.icon className={`h-6 w-6 transition-colors ${activeThreat.id === threat.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <p className={`font-bold transition-colors ${activeThreat.id === threat.id ? 'text-primary' : ''}`}>{threat.title}</p>
                      <p className="text-sm text-muted-foreground">{threat.summary}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
               <div className="mt-4">
                <Button size="lg" asChild className="w-full">
                  <Link href="/dashboard">
                    Scan Your Business Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </aside>

          {/* Right Column: Sticky Content */}
          <main className="lg:w-2/3 lg:sticky top-24 self-start">
             <AnimatePresence mode="wait">
              <motion.div
                key={activeThreat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="rounded-xl border bg-card p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <activeThreat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-sm text-muted-foreground">{activeThreat.category}</p>
                        <h3 className="text-2xl font-bold text-card-foreground">{activeThreat.title}</h3>
                      </div>
                    </div>
                  
                    <p className="mb-6 text-base text-muted-foreground">{activeThreat.description}</p>
                    
                    <Button variant="outline" asChild>
                       <Link href={`/resources/owasp-top-10/${activeThreat.id}`}>
                        Learn How to Defend
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </PageTransition>
  )
}
