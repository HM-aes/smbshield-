"use client";

import { HeroSection } from "@/components/home/hero-section";
import { AIGuardianRiskCard } from "@/components/home/ai-guardian-risk-card";
import { GenAiManifesto } from "@/components/home/gen-ai-manifesto";
import { TechStackGrid } from "@/components/home/tech-stack-grid";
import { FeatureFeed } from "@/components/home/feature-feed";
import { PricingSection } from "@/components/home/pricing-section";
import { CTASection } from "@/components/home/cta-section";
import { PageTransition } from "@/components/transitions/page-transition";
import { OwaspTeaser } from "@/components/home/owasp-teaser";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="flex flex-col">
        <HeroSection />
        <AIGuardianRiskCard />
        <GenAiManifesto />
        <TechStackGrid />
        <FeatureFeed />
        <OwaspTeaser />
        <PricingSection />
        <CTASection />
      </div>
    </PageTransition>
  );
}
