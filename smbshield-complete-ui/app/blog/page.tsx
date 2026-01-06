import Link from "next/link"
import { Terminal, AlertTriangle, Shield, Zap, Activity, ExternalLink, Github, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 font-sans selection:bg-zinc-500/30">
      {/* Header Section */}
      <section className="pt-32 pb-16 border-b border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm tracking-wider uppercase">
              <Terminal className="h-4 w-4" />
              <span>Security.Alert_Stream: Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              Security <span className="text-zinc-500">Alerts</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl font-light">
              Critical vulnerabilities and security intelligence for SMBs.
              Stay informed. Stay protected.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story Section (Dark Metallic AI) - Security Alert */}
      <section className="py-20 border-b border-zinc-800 bg-zinc-950 relative overflow-hidden">
        {/* Background Effects - Red tinted for alert */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-950/30 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-700/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">

                {/* Visual: Threat Detection HUD */}
                <div className="lg:col-span-5 order-2 lg:order-1">
                     <div className="relative rounded-xl bg-zinc-900 border border-red-900/50 shadow-2xl shadow-red-950/30 overflow-hidden transform transition-transform hover:scale-[1.02] duration-500 group">
                        {/* Glow Effect - Red */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 blur-[60px] rounded-full group-hover:bg-red-400/20 transition-colors" />

                        {/* HUD Header */}
                        <div className="px-5 py-3 border-b border-red-900/30 flex items-center justify-between bg-zinc-900/50 backdrop-blur">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-500 animate-pulse" />
                                <span className="text-xs font-mono font-bold text-red-400">THREAT.ALERT</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-red-400 bg-red-500/20 px-2 py-0.5 rounded">CVSS 10.0</span>
                            </div>
                        </div>

                        {/* HUD Content */}
                        <div className="p-6 space-y-6 font-mono text-xs md:text-sm">
                            <div className="space-y-2">
                                <div className="flex justify-between text-zinc-500">
                                    <span>THREAT_LEVEL</span>
                                    <span className="text-red-400">[CRITICAL]</span>
                                </div>
                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-red-600 to-red-400 animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Shield className="h-4 w-4 text-red-400" />
                                    <span>CVE: 2025-55182 (REACT2SHELL)</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Zap className="h-4 w-4 text-amber-400" />
                                    <span>AFFECTED: NEXT.JS 15.x, 16.x</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-300">
                                    <Activity className="h-4 w-4 text-red-400" />
                                    <span>STATUS: ACTIVELY_EXPLOITED</span>
                                </div>
                            </div>

                            <div className="p-3 bg-red-950/30 rounded border border-red-900/30 text-zinc-400 leading-relaxed">
                                {`> DETECTION: 968,000+ exposed instances`} <br/>
                                {`> ACTORS: Nation-state (CN, DPRK)`} <br/>
                                {`> ACTION: Immediate patching required`}
                            </div>
                        </div>

                        {/* Scanline */}
                        <div className="absolute inset-0 pointer-events-none bg-[url('/scanline.png')] opacity-[0.03] mix-blend-overlay" />
                     </div>
                </div>

                {/* Narrative (Security Alert) */}
                <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/50 border border-red-900/50 text-red-400 text-xs font-mono tracking-widest uppercase">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span>Critical Security Alert</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
                        React2Shell: <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">
                            The Vulnerability Affecting 40% of the Web.
                        </span>
                    </h2>

                    <div className="space-y-6 text-lg text-zinc-400 leading-relaxed max-w-2xl">
                        <p>
                            A <strong className="text-red-400 font-medium">CVSS 10.0 critical vulnerability</strong> in React Server Components is being actively exploited by nation-state actors. Within <strong className="text-zinc-200 font-medium">48 hours of disclosure</strong>, attacks were observed worldwide.
                        </p>
                        <p>
                            If your AI application or website runs on <span className="text-amber-400">Next.js 15.x or 16.x</span>, you may be vulnerable. Even a default <code className="px-1.5 py-0.5 bg-zinc-800 rounded text-sm">create-next-app</code> project is immediately exploitable.
                        </p>
                        <p className="border-l-2 border-red-500 pl-4 py-1 italic text-zinc-300">
                            "This is the biggest web security crisis of 2025. Your AI chatbot, LLM dashboard, or customer portal could be an entry point for attackers."
                        </p>
                    </div>

                    {/* Community Links Section */}
                    <div className="pt-6 space-y-4">
                        <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider">
                            Join the Discussion
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button size="lg" variant="outline" className="h-12 px-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600" asChild>
                                <a href="https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp" target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub Advisory
                                    <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600" asChild>
                                <a href="https://vercel.com/changelog/cve-2025-55182" target="_blank" rel="noopener noreferrer">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Vercel Changelog
                                    <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                                </a>
                            </Button>
                            <Button size="lg" variant="outline" className="h-12 px-6 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600" asChild>
                                <a href="https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components" target="_blank" rel="noopener noreferrer">
                                    <Shield className="mr-2 h-4 w-4" />
                                    React Blog
                                    <ExternalLink className="ml-2 h-3 w-3 opacity-50" />
                                </a>
                            </Button>
                        </div>
                        <p className="text-sm text-zinc-500 pt-2">
                            For live updates and community discussion, follow the official channels above.
                        </p>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* Subscribe CTA Section */}
      <section className="py-20 border-t border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Stay Ahead of Threats
            </h3>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                Get critical security alerts delivered to your inbox every Monday.
                We monitor 127 threat sources so you don't have to.
            </p>
            <Button size="lg" className="h-12 px-8 bg-amber-600 hover:bg-amber-500 text-white border-0 shadow-lg shadow-amber-900/30" asChild>
                <Link href="/dashboard">
                    Subscribe to Weekly Intel
                </Link>
            </Button>
        </div>
      </section>
    </div>
  )
}
