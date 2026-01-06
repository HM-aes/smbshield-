"use client";

import React from "react";
import { Mail, Shield, ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto max-w-4xl px-4">
        {/* Main Card */}
        <div className="group relative mx-auto max-w-2xl text-center" style={{ perspective: "1000px" }}>
          {/* Ambient glow */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-amber-600/10 to-transparent opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100" />

          <div
            className="relative rounded-3xl border border-white/10 p-12 transition-all duration-500 group-hover:border-amber-500/30"
            style={{ 
              backgroundColor: "#0a0a0a",
              transform: "translateZ(0)",
              transition: "transform 0.4s ease, box-shadow 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-12px) rotateX(2deg) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 30px 60px -15px rgba(217, 119, 6, 0.3), 0 15px 30px -10px rgba(217, 119, 6, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateZ(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Logo/Icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-600/5 transition-transform duration-300 group-hover:scale-110">
              <Shield className="h-10 w-10 text-amber-400" />
            </div>

            {/* About Text */}
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              SMBShield
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Bridging the gap between cutting-edge AI and the security your business deserves. 
              We translate complex threats into{" "}
              <span className="text-white">actionable protection</span>—so you can focus on what matters most: your clients.
            </p>

            {/* Divider */}
            <div className="mx-auto mb-8 h-px w-1/3 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            {/* Contact CTA */}
            <p className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Have questions? Let&apos;s talk.
            </p>

            {/* Email Link */}
            <a
              href="mailto:smbshield@proton.me"
              className="group/email inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10 px-8 py-4 font-semibold text-amber-400 transition-all duration-300 hover:border-amber-500/50 hover:from-amber-500/20 hover:to-amber-600/20 hover:text-amber-300"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 20px 40px -10px rgba(217, 119, 6, 0.35), 0 10px 20px -8px rgba(217, 119, 6, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Mail className="h-5 w-5" />
              <span className="text-lg">smbshield@proton.me</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/email:translate-x-1" />
            </a>

            {/* Friendly note */}
            <p className="mt-6 text-sm text-muted-foreground">
              We typically respond within 24 hours.
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="mx-auto mt-16 h-px w-1/2 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>
    </section>
  );
}
