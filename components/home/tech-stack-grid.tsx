import React from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";

export function TechStackGrid() {
  return (
    <section className="relative w-full border-b border-border bg-background">
      <div className="container mx-auto h-full max-w-7xl px-0">
        <div className="mx-auto max-w-5xl">
          <ScrollStack itemDistance={40} stackPosition="15%" scaleEndPosition="5%" useWindowScroll={true}>
            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        {/* Icon placeholder */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M9.5 2A2.5 12.1 0 0 1 12 14.2A2.5 12.1 0 0 1 14.5 2"/><path d="M14.5 22A2.5 12.1 0 0 1 12 9.8A2.5 12.1 0 0 1 9.5 22"/><path d="M2.5 11.5a10 10 0 1 1 19 0"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Supported Models</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>
            
            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Agent Frameworks</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                  </p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Integrations</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo.
                  </p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="h-96 p-0 bg-transparent shadow-none border-none">
              <div className="group relative h-full w-full flex flex-col justify-center overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 p-12 shadow-2xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-alert"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Security Layer</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.
                  </p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
