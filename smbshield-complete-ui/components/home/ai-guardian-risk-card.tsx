"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Shield, BookOpen } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RiskData {
  title: string;
  threat: string;
  example: string;
  solution: string;
}

const riskData: RiskData[] = [
  {
    title: "Sensitive Data Leakage (OWASP LLM06)",
    threat:
      "Unintentional exposure of proprietary or confidential business data through interaction with LLMs.",
    example:
      "An employee pastes Q3 strategy into a public chatbot. Now it's part of the public model's training data.",
    solution:
      "Our weekly intelligence briefing and AI Agent provide real-time mitigation strategies and policy guidance to prevent this exact threat.",
  },
  {
    title: "Prompt Injection (OWASP LLM01)",
    threat:
      "Hackers trick your AI tools into ignoring security rules, revealing customer databases, or executing unauthorized actions.",
    example:
      "A malicious prompt hidden in a customer service ticket forces your internal AI agent to dump sensitive user data into the chat log.",
    solution:
      "Our weekly intelligence briefing and AI Agent provide real-time mitigation strategies and code-level fixes for this exact threat.",
  },
  {
    title: "Insecure Output Handling (OWASP LLM02)",
    threat:
      "The LLM generates unsafe content (like malicious code or links) that is then executed by the user or a downstream system.",
    example:
      "Your internal AI-powered documentation tool generates a code snippet that contains a cross-site scripting (XSS) vulnerability when viewed by a developer.",
    solution:
      "Our weekly intelligence briefing and AI Agent provide real-time mitigation strategies and code-level fixes for this exact threat.",
  },
];

// Defense content for sticky scroll
const defenseContent = [
  {
    title: "SMBShield Weekly Intelligence",
    description:
      "We get it—you're building a business, not a security department. Between product launches, hiring, and keeping customers happy, who has time to track every new AI vulnerability? That's exactly why we created the Weekly Intelligence Briefing. Every Monday morning, we deliver a concise, jargon-free summary (formatted as a clean email) of what actually matters: upcoming AI security conferences, community meetups, and the latest critical vulnerabilities. No 50-page whitepapers. Just the events and alerts you need to stay connected and protected. Join SMB professionals who start their week with our intelligence report.",
    content: (
      <div className="h-full w-full flex flex-col bg-background rounded-lg overflow-hidden border border-border shadow-xl font-sans">
        {/* Email Header */}
        <div className="bg-card p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-muted-foreground text-xs">Inbox (1)</div>
            </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2 text-sm">
                <span className="text-muted-foreground font-medium w-12 text-right">From:</span>
                <span className="text-gray-200 font-semibold">SMBShield Intelligence &lt;intel@smbshield.com&gt;</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
                <span className="text-muted-foreground font-medium w-12 text-right">To:</span>
                <span className="text-gray-200">You</span>
            </div>
            <div className="flex items-baseline gap-2 text-sm">
                <span className="text-muted-foreground font-medium w-12 text-right">Subject:</span>
                <span className="text-white font-medium">📅 This Week: AI Safety Summit & Critical CVE Alert</span>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="flex-1 p-6 bg-background overflow-y-auto text-muted-foreground">
           <p className="mb-4 text-sm">Hi Team,</p>
           <p className="mb-6 text-sm leading-relaxed">Here is your weekly digest of AI security events and critical updates for the week of December 9th.</p>
           
           {/* Community Calendar Section */}
           <div className="mb-6 bg-blue-900/20 rounded-lg p-4 border border-blue-500/20">
                <h4 className="text-blue-400 font-bold text-sm mb-3 flex items-center gap-2">
                    <span className="text-lg">🗓️</span> Community Calendar
                </h4>
                <div className="space-y-3">
                    <div className="flex gap-3 items-start">
                        <div className="bg-card p-1.5 rounded border border-border text-center min-w-[50px]">
                            <div className="text-[10px] text-muted-foreground uppercase font-bold">DEC</div>
                            <div className="text-lg font-bold text-blue-400 leading-none">15</div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm text-gray-200">AI Engineer Summit</div>
                            <div className="text-xs text-muted-foreground">San Francisco • Booth #42</div>
                        </div>
                    </div>
                     <div className="flex gap-3 items-start">
                        <div className="bg-card p-1.5 rounded border border-border text-center min-w-[50px]">
                            <div className="text-[10px] text-muted-foreground uppercase font-bold">JAN</div>
                            <div className="text-lg font-bold text-blue-400 leading-none">22</div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm text-gray-200">OWASP AppSec EU</div>
                            <div className="text-xs text-muted-foreground">Lisbon • Main Stage Talk</div>
                        </div>
                    </div>
                     <div className="flex gap-3 items-start">
                        <div className="bg-card p-1.5 rounded border border-border text-center min-w-[50px]">
                            <div className="text-[10px] text-muted-foreground uppercase font-bold">FRI</div>
                            <div className="text-lg font-bold text-blue-400 leading-none">WK</div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm text-gray-200">Community Safety Meetup</div>
                            <div className="text-xs text-muted-foreground">Online • 4:00 PM CET</div>
                        </div>
                    </div>
                </div>
           </div>

           {/* Security Alert Section */}
           <div className="mb-4">
                <h4 className="font-bold text-sm mb-2 text-foreground">⚠️ Security Highlight</h4>
                <p className="text-sm text-muted-foreground mb-2">New detailed guide available for <span className="font-semibold text-red-400">CVE-2025-8821</span> affecting LangChain output parsers.</p>
                <div className="text-blue-400 text-sm font-medium hover:underline cursor-pointer">Read full analysis →</div>
           </div>
           
           <div className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground">
                Study safe,<br/>
                The SMBShield Team
           </div>
        </div>
      </div>
    ),
  },
  {
    title: "AI Security Agent (Professor Shield)",
    description:
      "You don't need to become a security expert—you just need one in your corner. Professor Shield is your 24/7 AI security advisor who speaks your language, not jargon. Ask any question about OWASP vulnerabilities, get plain-English explanations with real code examples, and learn at your own pace. Whether you're evaluating a new AI vendor at 2am or need to explain a risk to your board, Professor Shield has your back. Built on the latest threat intelligence, updated weekly. Think of it as having a senior security consultant on speed dial—without the €200/hour fee.",
    content: (
      <div className="h-full w-full flex flex-col bg-gradient-to-br from-purple-900 to-purple-950 rounded-lg overflow-hidden p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-400" />
            <h3 className="text-xl font-bold text-foreground">Professor Shield</h3>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">Online</span>
          </div>
        </div>
        <div className="flex-1 bg-card/50 rounded-lg p-4 border border-purple-500/20 font-mono text-sm overflow-hidden">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">👤</div>
              <div className="flex-1 bg-gray-800 rounded-lg p-3">
                <p className="text-muted-foreground">"We're adopting Claude for customer support. What security risks should I present to my CTO?"</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm">🛡️</div>
              <div className="flex-1 bg-purple-900/50 rounded-lg p-3 border border-purple-500/30">
                <p className="text-gray-200 mb-2">Great question! For LLM integration, focus on these 3 OWASP risks:</p>
                <div className="space-y-2 text-sm">
                  <p className="text-red-400">🔴 <span className="text-foreground">LLM01 Prompt Injection</span> — Users could manipulate the AI</p>
                  <p className="text-yellow-400">🟡 <span className="text-foreground">LLM06 Data Leakage</span> — Customer data in training</p>
                  <p className="text-blue-400">🔵 <span className="text-foreground">LLM09 Overreliance</span> — Trusting AI without verification</p>
                </div>
                <p className="text-purple-300 mt-3 text-sm">Want me to generate a 1-page executive summary for your CTO? 📄</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">💬 Avg response: 2.3 seconds</span>
          <span className="text-purple-400 font-medium">Questions answered 24/7</span>
        </div>
      </div>
    ),
  },
  {
    title: "Compliance Readiness Hub",
    description:
      "EU regulations are complex, but non-compliance is expensive—GDPR fines alone reached €2.1B in 2024. The Compliance Hub tracks GDPR, NIS2, and the AI Act so you don't have to hire a compliance officer. We translate 200-page regulations into simple checklists. Get automated alerts 90 days before deadlines. Download audit-ready templates that actually work. Perfect for SMBs who need to demonstrate compliance to enterprise clients without the enterprise budget. Over 340 SMBs have used our templates to pass vendor security assessments.",
    content: (
      <div className="h-full w-full flex flex-col bg-gradient-to-br from-orange-900 to-orange-950 rounded-lg overflow-hidden p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h3 className="text-xl font-bold text-foreground">Compliance Hub</h3>
          </div>
          <span className="text-sm text-orange-300 bg-orange-500/20 px-3 py-1 rounded-full">3 Active</span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="bg-green-500/20 border border-green-500/40 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">🇪🇺 GDPR</span>
                <span className="text-green-400 text-sm bg-green-500/30 px-2 py-0.5 rounded">✓ Compliant</span>
              </div>
              <span className="text-muted-foreground text-sm">Last audit: Nov 2025</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }} />
            </div>
            <p className="text-muted-foreground text-sm mt-1.5">✓ DPA signed ✓ Records updated ✓ DPIA completed</p>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">🔒 NIS2</span>
                <span className="text-yellow-400 text-sm bg-yellow-500/30 px-2 py-0.5 rounded">⚠ 2 Tasks</span>
              </div>
              <span className="text-yellow-400 text-sm">Due: Jan 17, 2026</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-muted-foreground text-sm mt-1.5">⏳ Incident response plan ⏳ Supply chain assessment</p>
          </div>
          <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">🤖 AI Act</span>
                <span className="text-blue-400 text-sm bg-blue-500/30 px-2 py-0.5 rounded">◷ Tracking</span>
              </div>
              <span className="text-blue-400 text-sm">Effective: Aug 2026</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "40%" }} />
            </div>
            <p className="text-muted-foreground text-sm mt-1.5">📋 Risk classification pending new guidance</p>
          </div>
        </div>
        <div className="mt-3 text-sm text-muted-foreground">📥 12 templates downloaded this month</div>
      </div>
    ),
  },
  {
    title: "Threat Intelligence Dashboard",
    description:
      "Stop flying blind. The Threat Dashboard shows you exactly what attacks are hitting businesses like yours—right now. We aggregate data from security researchers, OWASP feeds, and our growing community of SMBs to show trends before they become headlines. See which attack vectors are trending in your region (DACH, Nordics, Benelux, UK). Get severity ratings calibrated for SMB impact, not enterprise. Know exactly which of your tools are affected when a new CVE drops. Most importantly: understand if you're getting safer over time with your personalized security score.",
    content: (
      <div className="h-full w-full flex flex-col bg-gradient-to-br from-green-900 to-green-950 rounded-lg overflow-hidden p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="text-xl font-bold text-foreground">Threat Dashboard</h3>
          </div>
          <span className="text-sm text-green-300 bg-green-500/20 px-3 py-1 rounded-full">Live</span>
        </div>
        <div className="flex-1 bg-card/50 rounded-lg p-4 border border-green-500/20">
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-red-500/20 rounded-lg p-3 border border-red-500/40 text-center">
              <div className="text-red-400 text-2xl font-bold">7</div>
              <div className="text-muted-foreground text-sm">Critical</div>
            </div>
            <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-500/40 text-center">
              <div className="text-yellow-400 text-2xl font-bold">23</div>
              <div className="text-muted-foreground text-sm">High</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-3 border border-green-500/40 text-center">
              <div className="text-green-400 text-2xl font-bold">89</div>
              <div className="text-muted-foreground text-sm">Score</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mb-3">🇪🇺 Europe Trends (Dec 2025)</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center bg-red-500/10 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">🎯 LLM01 Prompt Injection</span>
              <span className="text-red-400 font-semibold">↑ 67%</span>
            </div>
            <div className="flex justify-between items-center bg-yellow-500/10 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">🔓 LLM06 Data Leakage</span>
              <span className="text-yellow-400 font-semibold">↑ 34%</span>
            </div>
            <div className="flex justify-between items-center bg-green-500/10 rounded-lg px-3 py-2">
              <span className="text-muted-foreground">⚡ LLM04 Model DoS</span>
              <span className="text-green-400 font-semibold">↓ 12%</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">🔄 Updated 12 min ago</span>
          <span className="text-green-400 font-medium">Your stack: 3 affected</span>
        </div>
      </div>
    ),
  },
  {
    title: "Security Training Library",
    description:
      "Your team is using ChatGPT, Claude, Gemini, and Copilot every day—but do they know the risks? Our bite-sized training modules (10-15 min each) turn your staff into your first line of defense. Real-world scenarios: 'What happens when you paste customer data into GPT?' Interactive exercises with actual prompt injection attempts. Case studies from e-commerce chatbots, government citizen portals, and healthcare AI assistants. Perfect for onboarding new hires or quarterly security refreshers. Issue certificates for ISO 27001 and SOC 2 compliance evidence. New modules added monthly—because the threat landscape doesn't stand still.",
    content: (
      <div className="h-full w-full flex flex-col bg-gradient-to-br from-cyan-900 to-cyan-950 rounded-lg overflow-hidden p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-bold text-foreground">Training Library</h3>
          </div>
          <span className="text-sm text-cyan-300 bg-cyan-500/20 px-3 py-1 rounded-full">47 Courses</span>
        </div>
        <div className="flex-1 space-y-3">
          <div className="bg-card/50 rounded-lg p-3 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                  🛡️ Prompt Injection in E-commerce Bots
                  <span className="text-red-400 text-xs bg-red-500/20 px-1.5 py-0.5 rounded">HOT</span>
                </h4>
                <p className="text-muted-foreground text-sm mt-0.5">Shopify, WooCommerce AI assistants • 15 min</p>
              </div>
              <span className="text-cyan-400 text-sm bg-cyan-500/20 px-2 py-0.5 rounded">85%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                  🤖 Safe AI Agent Deployment
                  <span className="text-yellow-400 text-xs bg-yellow-500/20 px-1.5 py-0.5 rounded">NEW</span>
                </h4>
                <p className="text-muted-foreground text-sm mt-0.5">GPT-4, Claude, Gemini Pro security • 20 min</p>
              </div>
              <span className="text-muted-foreground text-sm bg-gray-700 px-2 py-0.5 rounded">0%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: "0%" }} />
            </div>
          </div>
          <div className="bg-card/50 rounded-lg p-3 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <h4 className="text-white font-semibold text-sm">🏛️ AI in Government & Public Services</h4>
                <p className="text-muted-foreground text-sm mt-0.5">Citizen portals, document processing • 12 min</p>
              </div>
              <span className="text-green-400 text-sm bg-green-500/20 px-2 py-0.5 rounded">✓</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">🎓 3 certificates earned</span>
          <span className="text-cyan-400 font-medium">2.5 hours completed</span>
        </div>
      </div>
    ),
  },
];

export function AIGuardianRiskCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<gsap.core.Tween | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Enhanced title animation with text effect
  useGSAP(() => {
    if (!titleRef.current) return;

    const chars = titleRef.current.querySelectorAll(".char");

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 50,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      },
    );
  }, []);

  // Mouse follow effect with smoother lag
  useGSAP(() => {
    if (!cardContainerRef.current || !arrowRef.current) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardContainerRef.current) return;

      const rect = cardContainerRef.current.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      gsap.to(arrowRef.current, {
        x: (mouseX - rect.width / 2) * 0.08,
        y: (mouseY - rect.height / 2) * 0.08,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(arrowRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    cardContainerRef.current?.addEventListener("mousemove", handleMouseMove);
    cardContainerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cardContainerRef.current?.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
      cardContainerRef.current?.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, []);

  // Section intro animation
  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelector(".intro-text"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      },
    );
  }, []);

  // Full 3D Flip animation on the entire CARD element
  const transitionToCard = (newIndex: number) => {
    if (!cardRef.current) return;

    const tl = gsap.timeline();

    // Flip out the entire card (backflip effect)
    tl.to(cardRef.current, {
      rotationX: 90,
      opacity: 0,
      scale: 0.9,
      duration: 0.45,
      ease: "power2.in",
      transformOrigin: "center center",
      transformStyle: "preserve-3d",
    });

    // Update content at the midpoint
    tl.call(() => {
      setCurrentIndex(newIndex);
    });

    // Small delay for visual effect
    tl.set({}, {}, "+=0.05");

    // Flip in the entire card from opposite direction
    tl.fromTo(
      cardRef.current,
      {
        rotationX: -90,
        opacity: 0,
        scale: 0.9,
      },
      {
        rotationX: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
        transformOrigin: "center center",
        transformStyle: "preserve-3d",
      },
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimerRef.current = gsap.delayedCall(5, () => {
      const nextIndex = (currentIndex + 1) % riskData.length;
      transitionToCard(nextIndex);
    });

    return () => {
      autoPlayTimerRef.current?.kill();
    };
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    const nextIndex = (currentIndex + 1) % riskData.length;
    transitionToCard(nextIndex);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    const prevIndex = (currentIndex - 1 + riskData.length) % riskData.length;
    transitionToCard(prevIndex);
  };

  const currentRisk = riskData[currentIndex];

  // Split title into characters for animation
  const titleText =
    "What SMBShield Delivers Every Week";
  const titleParts = titleText.split("Delivers");

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-24"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated particles - fixed positions to avoid hydration error */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          15, 25, 35, 45, 55, 65, 75, 85, 10, 20, 30, 40, 50, 60, 70, 80, 90, 5,
          95, 50,
        ].map((left, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-amber-500/30"
            style={{
              left: `${left}%`,
              top: `${(i * 5) % 100}%`,
              animation: `float ${5 + (i % 10)}s ease-in-out infinite`,
              animationDelay: `${i % 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center mx-auto max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-sm font-medium text-amber-400">Your Weekly Security Intel</span>
          </div>
          <h2
            ref={titleRef}
            className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-tight"
            style={{ perspective: "1000px" }}
          >
            What SMBShield{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              Delivers
            </span>{" "}
            Every Week
          </h2>
          <p className="intro-text mx-auto max-w-4xl text-lg leading-relaxed text-muted-foreground">
            No more drowning in security jargon. We monitor{" "}
            <span className="font-semibold text-amber-400">
              127 threat sources
            </span>{" "}
            including OWASP, NVD, and AI security researchers to bring you{" "}
            <span className="font-semibold text-foreground">
              actionable intelligence
            </span>{" "}
            tailored for European SMBs. Here's what you get:
          </p>
        </div>

        {/* Interactive Risk Card with 3D Perspective Container */}
        <div
          ref={cardContainerRef}
          className="mx-auto mb-24 max-w-5xl relative"
          style={{ perspective: "2000px", perspectiveOrigin: "center center" }}
        >
          {/* Navigation Arrows - Outside the flipping card */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/80 p-3 text-white backdrop-blur-sm transition-all hover:scale-125 hover:from-amber-600 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/50"
            aria-label="Previous risk"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/80 p-3 text-white backdrop-blur-sm transition-all hover:scale-125 hover:from-amber-600 hover:to-amber-500 hover:shadow-lg hover:shadow-amber-500/50"
            aria-label="Next risk"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* The Card - This entire element will flip in 3D */}
          <Card
            ref={cardRef}
            className="group relative overflow-hidden border-border bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Enhanced mouse follow accent with glow */}
            <div
              ref={arrowRef}
              className="pointer-events-none absolute inset-0 z-10 opacity-40 transition-opacity group-hover:opacity-60"
              style={{
                background:
                  "radial-gradient(600px circle at 50% 50%, rgba(217, 119, 6, 0.25), transparent 50%)",
              }}
            />

            <CardContent className="relative space-y-8 p-12 md:p-16">
              {/* Risk Title */}
              <div>
                <h3 className="text-3xl font-bold text-foreground md:text-4xl">
                  {currentRisk.title}
                </h3>
              </div>

              {/* Business Impact */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/50" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-red-400">
                    The Threat
                  </span>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {currentRisk.threat}
                </p>
              </div>

              {/* Real-World Example */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-yellow-400">
                    Example
                  </span>
                </div>
                <p className="text-lg italic leading-relaxed text-muted-foreground">
                  "{currentRisk.example}"
                </p>
              </div>

              {/* Solution Teaser */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-amber-400 shadow-lg shadow-amber-500/50" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                    Your Shield
                  </span>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {currentRisk.solution}
                </p>
              </div>

              {/* Progress Indicators with enhanced styling */}
              <div className="flex justify-center gap-3 pt-4">
                {riskData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      transitionToCard(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-12 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50"
                        : "w-2 bg-gray-600 hover:bg-gray-500 hover:scale-125"
                    }`}
                    aria-label={`Go to risk ${index + 1}`}
                  />
                ))}
              </div>
            </CardContent>

            {/* Card accent gradient with animation */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </Card>
        </div>

        {/* Solution Section with Sticky Scroll */}
        <div className="mt-32 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Your Proactive Defense: Intelligence & Action
            </h2>
          </div>
          <StickyScroll
            content={defenseContent}
            contentClassName="bg-transparent"
          />
        </div>
      </div>

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </section>
  );
}
