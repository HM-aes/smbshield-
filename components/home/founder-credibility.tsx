"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companyLogos = [
  { name: "Google", src: "/images/logos/google.svg" },
  { name: "Meta", src: "/images/logos/meta.svg" },
  { name: "Reuters", src: "/images/logos/reuters.svg" },
  { name: "Apple", src: "/images/logos/apple.svg" },
];

export function FounderCredibility() {
  return (
    <section className="relative w-full border-b border-gray-800/50 bg-gradient-to-b from-background to-gray-950/50 py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Section Label */}
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-amber-500/80">
            Built by Industry Veterans
          </p>

          {/* Main Message */}
          <h2 className="mb-6 text-2xl font-semibold text-foreground md:text-3xl">
            Years of Experience in Major Multinationals
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-base text-muted-foreground leading-relaxed md:text-lg">
            Our founder brings diverse expertise from <span className="text-amber-500 font-medium">Google</span> (Trust & Safety), 
            <span className="text-amber-500 font-medium"> Meta</span> (Content Associate), and 
            <span className="text-amber-500 font-medium"> Apple</span> (Customer Specialist — resolving complex cases, 
            educating clients on products, safety, policies & data protection). 
            At <span className="text-amber-500 font-medium">Reuters</span>, trained professionals at leading investment banks 
            including UBS, Barclays, and Saudi investment institutions. 
            Also served as sports trainer for professional fighters competing in UFC and Bellator. 
            SMBShield exists because every business deserves enterprise-grade threat intelligence — without the enterprise price tag.
          </p>

          {/* Company Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <p className="text-sm text-muted-foreground/60 w-full md:w-auto mb-2 md:mb-0">
              Experience from:
            </p>
            {companyLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={100}
                  height={32}
                  className="h-6 w-auto opacity-50 grayscale transition-all duration-300 hover:opacity-80 hover:grayscale-0 md:h-8"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
