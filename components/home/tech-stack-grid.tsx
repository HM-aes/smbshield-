import React from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";
import { BrainCircuit, Bot, Network, Workflow } from "lucide-react";

export function TechStackGrid() {
  return (
    <section className="relative w-full border-b border-gray-800 bg-gray-950 py-24">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="container mx-auto h-full max-w-7xl px-4">
        
        {/* Section Header */}
        <div className="mb-20 text-center mx-auto max-w-3xl">
           <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            The New Workforce <br/>
            <span className="text-blue-500">AI Agents & LLMs</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Understanding the tools shaping the future of autonomous business. 
            From raw intelligence to self-correcting workflows.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <ScrollStack itemDistance={40} stackPosition="15%" scaleEndPosition="5%" useWindowScroll={true}>
            
            {/* Card 1: LLMs */}
            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        <BrainCircuit className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Foundation Models</h3>
                        <p className="text-sm font-mono text-blue-400">The Brain</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    The raw intelligence engine that processes and generates text and code. They provide the reasoning capabilities and vast knowledge base that powers everything else.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["GPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro", "Llama 3"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300 border border-gray-700">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>
            
            {/* Card 2: AI Agents */}
            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                        <Bot className="w-8 h-8" />
                    </div>
                     <div>
                        <h3 className="text-2xl font-bold text-white">Autonomous Agents</h3>
                        <p className="text-sm font-mono text-purple-400">The Hands</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    LLMs equipped with tools—browsers, file systems, APIs—that let them <em>take action</em>. They don't just talk; they execute complex tasks autonomously.
                  </p>
                   <div className="flex flex-wrap gap-2">
                    {["Devin", "MultiOn", "AutoGPT", "OpenInterpreter"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300 border border-gray-700">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-rose-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>

            {/* Card 3: Frameworks */}
            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-orange-500/50 hover:shadow-orange-500/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 group-hover:scale-110 transition-transform duration-300">
                        <Network className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Agent Frameworks</h3>
                        <p className="text-sm font-mono text-orange-400">The Architecture</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    The structural scaffolding developers use to build, control, and orchestrate agent behaviors. It bridges the gap between raw models and real-world applications.
                  </p>
                   <div className="flex flex-wrap gap-2">
                    {["LangChain", "LangGraph", "CrewAI", "AutoGen"].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300 border border-gray-700">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-600/10 via-amber-600/5 to-yellow-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>

            {/* Card 4: Workflows */}
            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/20">
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                        <Workflow className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Agentic Workflows</h3>
                        <p className="text-sm font-mono text-emerald-400">The Loop</p>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Moving beyond simple chat to self-correcting loops. The agent iteratively perceives, plans, acts, and reflects until the objective is met.
                  </p>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono font-bold">
                    <div className="bg-gray-800 rounded p-2 text-blue-400">PERCEIVE</div>
                    <div className="bg-gray-800 rounded p-2 text-yellow-400">PLAN</div>
                     <div className="bg-gray-800 rounded p-2 text-red-400">ACT</div>
                    <div className="bg-gray-800 rounded p-2 text-emerald-400">REFLECT</div>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-green-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>

          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
