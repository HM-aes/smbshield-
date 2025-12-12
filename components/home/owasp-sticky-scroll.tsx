"use client"

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"

const content = [
  {
    title: "Shadow AI Visibility",
    description:
      "Detect unauthorized AI tools across your organization. From rogue ChatGPT sessions to unsanctioned API integrations—we surface what's hidden before it becomes a breach.",
    content: (
      <div className="h-full w-full bg-black border border-green-500/20 rounded-md p-6 flex flex-col font-mono text-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50" />
        <div className="flex items-center gap-2 mb-4 text-green-500/70">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span>LIVE MONITORING</span>
        </div>
        <div className="space-y-2 text-green-400">
          <p>&gt; Scanning network for unauthorized AI...</p>
          <p className="text-yellow-500">&gt; DETECTED: ChatGPT session from 192.168.1.47</p>
          <p className="text-yellow-500">&gt; DETECTED: Anthropic API key in dev environment</p>
          <p className="text-red-500">&gt; BLOCKED: Data leak attempt to OpenAI endpoint</p>
        </div>
      </div>
    ),
  },
  {
    title: "AI Agent Guardrails",
    description:
      "Lock down LangChain, CrewAI, and custom agents. Define what your AI can access, execute, and share—with zero compromise on performance.",
    content: (
      <div className="h-full w-full bg-zinc-900 border border-indigo-500/20 rounded-md p-6 flex flex-col relative">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <span className="text-indigo-400 font-semibold text-xs tracking-wider">AGENT_CONFIG.PY</span>
        </div>
        <pre className="text-xs text-gray-300 font-mono leading-relaxed">
{`const financeAgent = new Agent({
  role: "Financial Analyst",
  // 🔒 RESTRICTED ACCESS
  tools: [
    readOnlyDatabase,
    sentimentAnalysis
  ],
  allow_dangerous_code: false,
  memory_limit: "50mb"
});`}
        </pre>
        <div className="mt-auto bg-indigo-500/10 text-indigo-300 px-3 py-2 rounded text-xs border border-indigo-500/20">
          ✓ Guardrails Active: Write-access blocked
        </div>
      </div>
    ),
  },
  {
    title: "Weekly Threat Intelligence",
    description: "Don't waste hours scrolling Twitter for security news. We curate the noise into a single, high-impact briefing delivered every Monday. From zero-day exploits in LangChain to new prompt injection techniques—if it affects SMBs, you'll know about it first. We track vulnerabilities so you don't have to.",
    content: (
      <div className="h-full w-full bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-white/5 border-b border-white/5 p-4 flex justify-between items-center backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 rounded-md">
               <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-sm font-medium text-gray-200 tracking-wide">INTEL_BRIEFING.PDF</span>
          </div>
          <span className="text-xs text-gray-500 font-mono">VOL. 42</span>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 relative">
          {/* Radial Gradient for glow effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -z-10" />

          {/* Alert Item 1 */}
          <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors group cursor-default">
            <div className="flex justify-between items-start mb-1">
              <span className="text-amber-400 text-xs font-bold px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">CRITICAL</span>
              <span className="text-gray-500 text-[10px]">2 hrs ago</span>
            </div>
            <h4 className="text-gray-200 font-medium text-sm mt-2 group-hover:text-white">GPT-4 Vision Prompt Injection</h4>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">New vector discovered allowing hidden text in images to bypass system guardrails.</p>
          </div>

          {/* Alert Item 2 */}
          <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl hover:bg-white/[0.05] transition-colors group cursor-default">
             <div className="flex justify-between items-start mb-1">
              <span className="text-blue-400 text-xs font-bold px-2 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20">PATCH</span>
              <span className="text-gray-500 text-[10px]">Yesterday</span>
            </div>
            <h4 className="text-gray-200 font-medium text-sm mt-2 group-hover:text-white">LangChain Vulnerability (CVE-2024-02)</h4>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">Update to v0.1.4 immediately to prevent RCE attacks.</p>
          </div>

           {/* Visual Footer */}
           <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             Live Threat Feed Active
           </div>
        </div>
      </div>
    ),
  },
  {
    title: "Enterprise & Compliance",
    description: "Selling AI to enterprise clients? They will demand proof of security. Our platform automates your SOC 2 and GDPR AI requirements. Generate audit-ready reports, enforce PII stripping policies, and prove to your customers that their data is safe in your hands.",
    content: (
      <div className="h-full w-full bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
         {/* Header */}
        <div className="bg-white/5 border-b border-white/5 p-4 flex justify-between items-center">
           <span className="text-sm font-semibold text-gray-200">Policy Enforcement</span>
           <div className="flex gap-1">
             <div className="w-2 h-2 rounded-full bg-red-500/20" />
             <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
             <div className="w-2 h-2 rounded-full bg-green-500" />
           </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
           {/* Policy Toggle 1 */}
           <div className="flex items-center justify-between p-3 border border-emerald-500/20 bg-emerald-500/[0.02] rounded-xl">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <div className="text-sm font-medium text-gray-200">PII Redaction</div>
                 <div className="text-[10px] text-gray-500">Auto-mask emails & phones</div>
               </div>
             </div>
             <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-emerald-500">
                <span className="translate-x-4 inline-block h-3 w-3 transform rounded-full bg-white transition"/>
             </div>
           </div>

           {/* Policy Toggle 2 */}
            <div className="flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] rounded-xl opacity-60">
             <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               </div>
               <div>
                 <div className="text-sm font-medium text-gray-200">Model Whitelisting</div>
                 <div className="text-[10px] text-gray-500">Only allow GPT-4 & Claude 3</div>
               </div>
             </div>
             <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-700">
                <span className="translate-x-1 inline-block h-3 w-3 transform rounded-full bg-gray-400 transition"/>
             </div>
           </div>

           {/* Progress Bar */}
           <div className="mt-4">
             <div className="flex justify-between text-xs mb-2">
               <span className="text-gray-400">EU AI Act Readiness</span>
               <span className="text-emerald-400 font-mono">94%</span>
             </div>
             <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
               <div className="bg-emerald-500 h-1.5 rounded-full w-[94%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
             </div>
           </div>
        </div>
      </div>
    ),
  },
]

export function OwaspStickyScroll() {
  return (
    <section className="bg-muted/30 dark:bg-muted/10 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Security Intelligence, Simplified
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We do the hard work of monitoring threats so you can focus on
            running your business. Here's how we help.
          </p>
        </div>
        <StickyScroll content={content} />
      </div>
    </section>
  )
}

