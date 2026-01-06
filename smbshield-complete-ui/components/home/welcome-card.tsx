"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Fixed particle positions to avoid hydration mismatch
const particlePositions = [
  { x: 50, y: 30, yEnd: -20, duration: 3.5, delay: 0 },
  { x: 150, y: 80, yEnd: -30, duration: 4, delay: 0.5 },
  { x: 250, y: 50, yEnd: -40, duration: 3, delay: 1 },
  { x: 100, y: 120, yEnd: -25, duration: 4.5, delay: 1.5 },
  { x: 200, y: 100, yEnd: -35, duration: 3.8, delay: 0.8 },
  { x: 280, y: 60, yEnd: -45, duration: 4.2, delay: 1.2 },
];

export function WelcomeCard() {
  const [displayText, setDisplayText] = useState("");
  const [showTagline, setShowTagline] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fullText = "Welcome to SMBShield";
  
  useEffect(() => {
    setMounted(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowTagline(true), 300);
      }
    }, 80);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative max-w-md"
      style={{ perspective: "1000px" }}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/30 via-amber-600/15 to-transparent opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
      
      {/* Glassmorphism Card */}
      <div
        className="relative overflow-hidden rounded-3xl border border-border p-8 backdrop-blur-xl transition-all duration-500 group-hover:border-amber-500/30"
        style={{ 
          backgroundColor: "rgba(10, 10, 10, 0.7)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Floating particles effect - only render on client */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particlePositions.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-amber-400/40"
                style={{ left: particle.x, top: particle.y }}
                animate={{ 
                  y: [0, particle.yEnd, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: particle.duration, 
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mb-6 relative"
          >
            {/* Logo glow */}
            <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl" />
            <Image
              src="/images/logos/smbshield-logo.png"
              alt="SMBShield Logo"
              width={120}
              height={120}
              className="relative mx-auto drop-shadow-[0_0_30px_rgba(217,119,6,0.4)]"
              priority
            />
          </motion.div>

          {/* Typing Animation */}
          <div className="h-12 mb-4">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1 inline-block w-0.5 h-7 bg-amber-400 align-middle"
              />
            </h2>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: showTagline ? 1 : 0, y: showTagline ? 0 : 10 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground text-sm md:text-base">
              AI Security Intelligence for{" "}
              <span className="text-amber-400 font-medium">SMB Professionals</span>
            </p>
            <p className="mt-2 text-muted-foreground text-xs md:text-sm">
              Your educational hub for AI, LLMs & GenAI Security
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}
