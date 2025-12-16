export function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SMBShield",
    url: "https://smbshield.com",
    logo: "https://smbshield.com/images/logos/smbshield-logo.png",
    description:
      "AI Security Intelligence for European SMBs. Weekly threat briefings on OWASP LLM vulnerabilities + AI security advisor.",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/smbshield",
      "https://linkedin.com/company/smbshield",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@smbshield.com",
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "SMBShield Pro",
    description:
      "Weekly security briefings, Professor Shield AI advisor, threat dashboard, and EU compliance tracker for SMBs.",
    brand: {
      "@type": "Brand",
      name: "SMBShield",
    },
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "EUR",
      priceValidUntil: "2026-01-01",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is SMBShield?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SMBShield is an AI security intelligence platform built specifically for European SMBs. We provide weekly threat briefings on OWASP LLM vulnerabilities, an AI security advisor (Professor Shield), and EU compliance tracking.",
        },
      },
      {
        "@type": "Question",
        name: "What is the OWASP LLM Top 10?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The OWASP LLM Top 10 is a list of the most critical security risks in Large Language Model applications, including prompt injection, data leakage, and insecure output handling. SMBShield helps SMBs understand and protect against these threats.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a free tier?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! SMBShield offers a free tier with monthly threat digests, OWASP Top 10 guides, and community access. The Pro tier at €49/month includes weekly briefings, unlimited AI advisor access, and the threat dashboard.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
