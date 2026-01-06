"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FounderCredibility } from "@/components/home/founder-credibility";
import { WhatWeOffer } from "@/components/home/what-we-offer";
import { GenAiManifesto } from "@/components/home/gen-ai-manifesto";
import { TechStackGrid } from "@/components/home/tech-stack-grid";
import { FeatureFeed } from "@/components/home/feature-feed";
import { PricingSection } from "@/components/home/pricing-section";
import { CTASection } from "@/components/home/cta-section";
import { ContactSection } from "@/components/home/contact-section";
import { PageTransition } from "@/components/transitions/page-transition";
import { OwaspTeaser } from "@/components/home/owasp-teaser";
import { SectionDivider } from "@/components/animated/section-divider";
import { SectionReveal } from "@/components/animated/section-reveal";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="flex flex-col">
        {/* Hero - No divider before, full animation in component */}
        <HeroSection />

        <SectionDivider variant="gradient" />

        <SectionReveal>
          <FounderCredibility />
        </SectionReveal>

        <SectionDivider variant="gradient" />

        <SectionReveal delay={0.1}>
          <WhatWeOffer />
        </SectionReveal>

        <SectionDivider variant="gradient" />

        <SectionReveal delay={0.1}>
          <GenAiManifesto />
        </SectionReveal>

        <SectionDivider variant="gradient" showAccent={false} />

        <SectionReveal delay={0.1}>
          <TechStackGrid />
        </SectionReveal>

        <SectionDivider variant="gradient" />

        <SectionReveal delay={0.1}>
          <FeatureFeed />
        </SectionReveal>

        <SectionDivider variant="glow" />

        <SectionReveal delay={0.1}>
          <CTASection />
        </SectionReveal>

        <SectionDivider variant="gradient" />

        <SectionReveal delay={0.1}>
          <OwaspTeaser />
        </SectionReveal>

        <SectionDivider variant="gradient" />

        <SectionReveal delay={0.1}>
          <PricingSection />
        </SectionReveal>

        <SectionDivider variant="glow" />

        <SectionReveal delay={0.1}>
          <ContactSection />
        </SectionReveal>
      </div>
    </PageTransition>
  );
}
