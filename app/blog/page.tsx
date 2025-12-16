import Link from "next/link"
import { Calendar, Clock, ArrowRight, Terminal, Hash, ChevronRight, ShieldCheck, Activity, Lock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StaggerContainer } from "@/components/animated/stagger-container"
import { blogPosts, categories } from "@/lib/blog-data"
import { cn } from "@/lib/utils"

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.slug === "why-i-started-smbshield") || blogPosts[0]
  const otherPosts = blogPosts.filter(post => post.slug !== featuredPost.slug)

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans selection:bg-zinc-500/30">
      {/* Header Section */}
      <section className="pt-32 pb-16 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm tracking-wider uppercase">
              <Terminal className="h-4 w-4" />
              <span>System.Log_Stream: Active</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground">
              Intelligence <span className="text-muted-foreground">Log</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl font-light">
              Decoding the signal from the noise. Expert analysis on AI security, 
              compliance frameworks, and the evolving threat landscape for SMBs.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Story Section (Dark Metallic AI) */}
      <section className="py-20 border-b border-zinc-800 bg-zinc-950 relative overflow-hidden">
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
                                <span className="text-xs font-mono font-bold text-zinc-400">SYSTEMABILITY.CORE</span>
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

                {/* Narrative (Selling Story) */}
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
                            I spent years training secure bankers on the trading floors of <strong className="text-zinc-200 font-medium">Tier-1 Global Banks</strong>. I managed global comms systems for <strong className="text-zinc-200 font-medium">Reuters</strong> from London to Saudi Arabia.
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
                             <Link href={`/blog/${featuredPost.slug}`}>
                                Read Full Transmission <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* Main Feed Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* Sidebar / Filters */}
                <div className="lg:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider mb-4">
                            Details.Filters
                        </h3>
                        <div className="flex flex-row lg:flex-col flex-wrap gap-2">
                            {categories.map((category) => (
                            <Button
                                key={category}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "justify-start font-mono text-xs hover:bg-muted/50 hover:text-foreground",
                                    category === "All" ? "text-blue-500 bg-blue-500/5 hover:bg-blue-500/10" : "text-muted-foreground"
                                )}
                            >
                                <Hash className="mr-2 h-3 w-3 opacity-50" />
                                {category}
                            </Button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="hidden lg:block p-4 rounded-lg border border-border/50 bg-muted/5">
                        <h4 className="font-bold text-sm mb-2">Weekly Briefing</h4>
                        <p className="text-xs text-muted-foreground mb-4">
                            Get these insights delivered directly to your inbox every Monday.
                        </p>
                        <Button size="sm" className="w-full text-xs" asChild>
                            <Link href="/dashboard">Subscribe</Link>
                        </Button>
                    </div>
                </div>

                {/* The List Stream */}
                <div className="flex-1">
                     <StaggerContainer staggerDelay={0.1} triggerOnScroll={true} className="space-y-0">
                        {otherPosts.map((post) => (
                            <div key={post.slug} className="group relative border-l-2 border-border/50 hover:border-blue-500 pl-8 pb-12 last:pb-0 transition-all duration-300">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-background bg-border group-hover:bg-blue-500 transition-colors" />
                                
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                                        <span className="text-blue-500">
                                            {String(otherPosts.indexOf(post) + 1).padStart(2, '0')}
                                        </span>
                                        <span>//</span>
                                        <span>{post.date}</span>
                                        <span className="ml-auto rounded border border-border px-2 py-0.5 text-[10px] uppercase">
                                            {post.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-blue-500 transition-colors">
                                        <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                                            {post.title}
                                            <ChevronRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
                                        </Link>
                                    </h3>
                                    
                                    <p className="text-muted-foreground max-w-2xl text-base leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="pt-2">
                                         <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                            Read Analysis <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                         </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}
