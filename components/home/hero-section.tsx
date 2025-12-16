"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FadeIn } from "@/components/animated/fade-in";
import { useMousePosition } from "@/hooks/use-mouse-position";

export function HeroSection() {
  const { x, y } = useMousePosition();

  return (
    <section className="relative overflow-hidden pt-32 pb-20 min-h-screen flex flex-col justify-center">
      {/* Interactive Background - Amber */}
      <motion.div
        className="pointer-events-none absolute -inset-px -z-10 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(217, 119, 6, 0.04), transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Floating Gradient Orbs - Dark Amber theme */}
      <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-[100px] animate-float-slow pointer-events-none -z-10" />
      <div
        className="absolute -bottom-20 right-0 w-[600px] h-[600px] bg-amber-600/10 dark:bg-amber-600/15 rounded-full blur-[120px] animate-float-slow pointer-events-none -z-10"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-orange-500/8 dark:bg-orange-500/12 rounded-full blur-[80px] animate-float-slow pointer-events-none -z-10"
        style={{ animationDelay: '4s' }}
      />

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent -z-10" />

      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-12 xl:pl-16">
        <div className="max-w-3xl lg:max-w-4xl">
          {/* Animated Heading */}
          <FadeIn delay={0.2} triggerOnScroll={false}>
            <h1 className="mb-10 text-3xl tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight sm:leading-snug lg:leading-relaxed">
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
                AI Security Intelligence
              </span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                Built for SMBs
              </span>
            </h1>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.4} triggerOnScroll={false}>
            <p className="mb-10 text-base text-muted-foreground sm:text-lg lg:text-xl leading-relaxed">
              From the OWASP LLM Top 10 to EU AI Act compliance — we monitor 127 threat sources
              <br className="hidden sm:block" />
              so you don't have to. Built by security specialists with
              <br className="hidden sm:block" />
              <span className="text-amber-500 font-medium">Google Trust & Safety</span> and <span className="text-amber-500 font-medium">Meta</span> backgrounds.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.6} triggerOnScroll={false}>
            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300" 
                  asChild
                >
                  <Link href="/dashboard">
                    Subscribe to Weekly Intel
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300" 
                  asChild
                >
                  <Link href="/dashboard/chat">Chat with Professor Shield</Link>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
