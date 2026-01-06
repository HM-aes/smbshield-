"use client"

import { motion } from "framer-motion"
import { Shield, Terminal, Lock, FileText, CheckCircle2, Eye, Code2, Zap, ShieldCheck, Clock, Play, Youtube } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5 }
}

export function FeatureFeed() {
  return (
    <section className="w-full bg-background py-20 relative">
      {/* Safety Container - Centers everything and prevents edge touching */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN (Sticky) */}
          <div className="lg:sticky lg:top-40 h-fit py-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 ring-1 ring-blue-500/20">
                <FileText className="h-4 w-4" />
                Intelligence Hub
              </div>

              <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
                Your Weekly AI Security Briefing
              </h2>

              <p className="text-lg leading-relaxed text-muted-foreground">
                The AI landscape shifts overnight. You don't have hours to research new vulnerabilities. We distill the chaos of OWASP & GenAI risks into actionable intelligence—so you can lead with confidence, not anxiety.
              </p>

              <div className="space-y-3 pt-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Zero Tech Setup required</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Actionable in &lt; 5 minutes</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Expert-Vetted Strategies</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (Scrollable Cards) */}
          <div className="flex flex-col gap-8 py-8 pr-2">
            <div className="space-y-8">
              {/* Card 1: Shadow AI Monitor */}
              <motion.div
                {...fadeInUp}
                className="w-full max-w-xl group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 bg-emerald-500/5 blur-3xl" />

                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                        <Eye className="h-3 w-3" />
                        DETECTION
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Shadow AI Detection Guide</h3>
                      <p className="mt-2 text-muted-foreground">
                        Learn how to spot and stop unauthorized AI usage in your team.
                      </p>
                    </div>
                  </div>

                  {/* Terminal Mockup */}
                  <div className="overflow-hidden rounded-xl border border-emerald-500/20 bg-background">
                    <div className="border-b border-emerald-500/20 bg-emerald-500/5 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-3 w-3 text-emerald-400" />
                        <span className="font-mono text-xs text-emerald-300">threat_monitor.log</span>
                      </div>
                    </div>
                    <div className="space-y-2 p-4 font-mono text-xs">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span className="text-emerald-500/60">[14:23:11]</span>
                        <Eye className="h-3 w-3" />
                        <span>Scanning network for unauthorized AI...</span>
                      </div>
                      <div className="ml-8 text-amber-400">
                        ⚠ DETECTED: ChatGPT session from 192.168.1.47
                      </div>
                      <div className="ml-8 text-amber-400">
                        ⚠ DETECTED: Anthropic API key in dev environment
                      </div>
                      <div className="ml-8 text-red-400">
                        ✗ BLOCKED: Data leak attempt to OpenAI endpoint
                      </div>
                      <div className="flex items-center gap-2 text-emerald-300">
                        <span className="text-emerald-500/60">[14:23:18]</span>
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Audit complete. 3 threats mitigated.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live monitoring active</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Agent Guardrails */}
              <motion.div
                {...fadeInUp}
                className="w-full max-w-xl group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 bg-indigo-500/5 blur-3xl" />

                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 ring-1 ring-indigo-500/20">
                        <FileText className="h-3 w-3" />
                        TEMPLATES
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Agent Policy Templates</h3>
                      <p className="mt-2 text-muted-foreground">
                        Copy-paste configurations to secure LangChain & CrewAI agents.
                      </p>
                    </div>
                  </div>

                  {/* Code Editor Mockup */}
                  <div className="overflow-hidden rounded-xl border border-indigo-500/20 bg-zinc-950">
                    <div className="border-b border-indigo-500/20 bg-indigo-500/5 px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-3 w-3 text-indigo-400" />
                        <span className="font-mono text-xs text-indigo-300">agent_config.yaml</span>
                      </div>
                    </div>
                    <div className="space-y-1 p-4 font-mono text-xs leading-relaxed">
                      <div>
                        <span className="text-indigo-400">agent</span>
                        <span className="text-muted-foreground">:</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-blue-400">name</span>
                        <span className="text-muted-foreground">: </span>
                        <span className="text-amber-300">&quot;FinancialAnalyst&quot;</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-blue-400">permissions</span>
                        <span className="text-muted-foreground">:</span>
                      </div>
                      <div className="ml-8">
                        <span className="text-muted-foreground">- </span>
                        <span className="text-emerald-400">read_database</span>
                      </div>
                      <div className="ml-8">
                        <span className="text-muted-foreground">- </span>
                        <span className="text-emerald-400">analyze_data</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-blue-400">forbidden</span>
                        <span className="text-muted-foreground">:</span>
                      </div>
                      <div className="ml-8">
                        <span className="text-muted-foreground">- </span>
                        <span className="text-red-400">write_database</span>
                        <span className="text-gray-600 ml-2"># 🔒 Locked</span>
                      </div>
                      <div className="ml-8">
                        <span className="text-muted-foreground">- </span>
                        <span className="text-red-400">execute_code</span>
                        <span className="text-gray-600 ml-2"># 🔒 Locked</span>
                      </div>
                    </div>
                    <div className="border-t border-indigo-500/20 bg-indigo-500/5 px-4 py-2">
                      <div className="flex items-center gap-2 text-xs text-indigo-300">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Guardrails enforced: Write access blocked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Weekly Threat Intel */}
              <motion.div
                {...fadeInUp}
                className="w-full max-w-xl group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 bg-amber-500/5 blur-3xl" />

                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/20">
                        <Zap className="h-3 w-3" />
                        INTELLIGENCE
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Weekly Threat Intel</h3>
                      <p className="mt-2 text-muted-foreground">
                        Curated vulnerabilities delivered to your inbox every Monday.
                      </p>
                    </div>
                  </div>

                  {/* Dashboard Widget Mockup */}
                  <div className="overflow-hidden rounded-xl border border-amber-500/20 bg-card">
                    <div className="border-b border-amber-500/20 bg-amber-500/5 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-amber-500/20 rounded">
                            <FileText className="h-3 w-3 text-amber-400" />
                          </div>
                          <span className="text-sm font-semibold text-gray-200">Critical Vulnerabilities</span>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">Week 47</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Threat Item 1 */}
                      <div className="group/item rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]">
                        <div className="flex items-start justify-between mb-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-400 ring-1 ring-red-500/20">
                            <span className="h-1 w-1 rounded-full bg-red-500" />
                            CRITICAL
                          </span>
                          <span className="text-[10px] text-muted-foreground">2 hrs ago</span>
                        </div>
                        <h4 className="text-sm font-medium text-foreground">GPT-4 Vision Prompt Injection</h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          New attack vector allows hidden text in images to bypass safety filters.
                        </p>
                      </div>

                      {/* Threat Item 2 */}
                      <div className="group/item rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]">
                        <div className="flex items-start justify-between mb-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-400 ring-1 ring-amber-500/20">
                            <span className="h-1 w-1 rounded-full bg-amber-500" />
                            HIGH
                          </span>
                          <span className="text-[10px] text-muted-foreground">Yesterday</span>
                        </div>
                        <h4 className="text-sm font-medium text-foreground">LangChain RCE (CVE-2024-02)</h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          Critical remote code execution. Update to v0.1.4 immediately.
                        </p>
                      </div>

                      {/* Threat Item 3 */}
                      <div className="group/item rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]">
                        <div className="flex items-start justify-between mb-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 ring-1 ring-blue-500/20">
                            <span className="h-1 w-1 rounded-full bg-blue-500" />
                            INFO
                          </span>
                          <span className="text-[10px] text-muted-foreground">3 days ago</span>
                        </div>
                        <h4 className="text-sm font-medium text-foreground">OWASP LLM Top 10 v1.2</h4>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          Updated guidance on model denial of service and supply chain risks.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-amber-500/20 bg-amber-500/5 px-4 py-2">
                      <div className="flex items-center gap-2 text-xs text-amber-300">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span>Live feed active • 127 sources monitored</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Curated Expert Insights */}
              <motion.div
                {...fadeInUp}
                className="w-full max-w-xl group relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 bg-purple-500/5 blur-3xl" />

                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 ring-1 ring-purple-500/20">
                        <Youtube className="h-3 w-3" />
                        INSIGHTS
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Curated Expert Insights</h3>
                      <p className="mt-2 text-muted-foreground">
                        From DEF CON keynotes to the latest OWASP webinars—we track the best security content globally. We summarize hours of video and dense whitepapers into 5-minute actionable briefs.
                      </p>
                    </div>
                  </div>

                  {/* Media Intelligence Feed */}
                  <div className="overflow-hidden rounded-xl border border-border bg-card">
                    {/* Video Player Mockup */}
                    <div className="relative aspect-video bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                      {/* Abstract Stage Background */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
                      </div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="group/play cursor-pointer">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-white/20 blur-xl group-hover/play:bg-white/30 transition-all" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm ring-4 ring-white/20 transition-all group-hover/play:scale-110 group-hover/play:bg-white">
                              <Play className="h-7 w-7 text-black ml-1" fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Video Label */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Youtube className="h-4 w-4 text-red-400" />
                              <span className="text-sm font-semibold text-foreground">OWASP Global AppSec 2025</span>
                            </div>
                            <div className="text-xs text-muted-foreground">Latest GenAI Security Threats</div>
                          </div>
                          <div className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300 ring-1 ring-purple-500/30 backdrop-blur-sm">
                            3 Hr → 5 Min Read
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Takeaways Section */}
                    <div className="border-t border-border bg-zinc-950/50 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-gray-200">Key Takeaways</span>
                      </div>

                      <div className="space-y-2">
                        {/* Takeaway 1 */}
                        <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3 ring-1 ring-white/5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-300">
                            1
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            New <span className="font-semibold text-foreground">&quot;Tree of Thoughts&quot;</span> Prompt Injection vector
                          </p>
                        </div>

                        {/* Takeaway 2 */}
                        <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3 ring-1 ring-white/5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-300">
                            2
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="font-semibold text-foreground">Anthropic&apos;s</span> new System Card breakdown
                          </p>
                        </div>

                        {/* Takeaway 3 */}
                        <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3 ring-1 ring-white/5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-300">
                            3
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Top 3 takeaways from <span className="font-semibold text-foreground">Andrej Karpathy&apos;s</span> LLM talk
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Youtube className="h-3 w-3 text-purple-400" />
                    <span>127 sources tracked • Updated weekly</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
