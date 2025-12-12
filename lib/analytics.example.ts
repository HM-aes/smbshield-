/**
 * Analytics Integration Examples
 * 
 * This file shows how to integrate various analytics services with the sidebar.
 * Copy the relevant code to lib/analytics.ts and configure with your API keys.
 */

// ============================================================================
// GOOGLE ANALYTICS 4 (GA4)
// ============================================================================

// 1. Install gtag script in app/layout.tsx or _document.tsx:
/*
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}');
  `}
</Script>
*/

// 2. Update trackEvent in lib/analytics.ts:
/*
export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties)
  }
}
*/

// 3. Add TypeScript declarations:
/*
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
*/

// ============================================================================
// MIXPANEL
// ============================================================================

// 1. Install: npm install mixpanel-browser
// 2. Initialize in app/layout.tsx or a provider:
/*
import mixpanel from "mixpanel-browser"

mixpanel.init("YOUR_PROJECT_TOKEN", {
  debug: process.env.NODE_ENV === "development",
  track_pageview: true,
  persistence: "localStorage",
})
*/

// 3. Update trackEvent in lib/analytics.ts:
/*
import mixpanel from "mixpanel-browser"

export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  if (typeof window !== "undefined") {
    mixpanel.track(eventName, properties)
  }
}
*/

// ============================================================================
// SEGMENT
// ============================================================================

// 1. Install Segment snippet in app/layout.tsx:
/*
<Script id="segment-analytics">
  {`
    !function(){var analytics=window.analytics=window.analytics||[];
    analytics.load("YOUR_WRITE_KEY");
    analytics.page();}();
  `}
</Script>
*/

// 2. Update trackEvent in lib/analytics.ts:
/*
export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  if (typeof window !== "undefined" && window.analytics) {
    window.analytics.track(eventName, properties)
  }
}
*/

// 3. Add TypeScript declarations:
/*
declare global {
  interface Window {
    analytics: {
      track: (event: string, properties?: any) => void
      identify: (userId: string, traits?: any) => void
      page: () => void
    }
  }
}
*/

// ============================================================================
// POSTHOG
// ============================================================================

// 1. Install: npm install posthog-js
// 2. Initialize in app/layout.tsx or a provider:
/*
import posthog from "posthog-js"

if (typeof window !== "undefined") {
  posthog.init("YOUR_PROJECT_API_KEY", {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug()
    },
  })
}
*/

// 3. Update trackEvent in lib/analytics.ts:
/*
import posthog from "posthog-js"

export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  if (typeof window !== "undefined") {
    posthog.capture(eventName, properties)
  }
}
*/

// ============================================================================
// PLAUSIBLE
// ============================================================================

// 1. Add script to app/layout.tsx:
/*
<Script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
/>
*/

// 2. Update trackEvent in lib/analytics.ts:
/*
export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(eventName, { props: properties })
  }
}
*/

// 3. Add TypeScript declarations:
/*
declare global {
  interface Window {
    plausible: (event: string, options?: { props?: any }) => void
  }
}
*/

// ============================================================================
// CUSTOM API ENDPOINT
// ============================================================================

// 1. Create API route at app/api/analytics/route.ts:
/*
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { event, properties } = await request.json()
    
    // Store in your database
    // await db.analytics.create({
    //   event,
    //   properties,
    //   timestamp: new Date(),
    //   userId: request.headers.get("x-user-id"),
    // })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    )
  }
}
*/

// 2. Update trackEvent in lib/analytics.ts:
/*
export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  if (typeof window === "undefined") return
  
  fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer,
      },
    }),
  }).catch((error) => {
    console.error("Analytics error:", error)
  })
}
*/

// ============================================================================
// MULTIPLE SERVICES (Recommended for redundancy)
// ============================================================================

/*
export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  if (typeof window === "undefined") return
  
  // Log in development
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Analytics Event:", eventName, properties)
  }
  
  // Google Analytics
  if (window.gtag) {
    window.gtag("event", eventName, properties)
  }
  
  // Mixpanel
  if (window.mixpanel) {
    window.mixpanel.track(eventName, properties)
  }
  
  // Custom API (for backup/redundancy)
  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: eventName, properties }),
  }).catch(console.error)
}
*/

// ============================================================================
// ENVIRONMENT-BASED CONFIGURATION
// ============================================================================

/*
const ANALYTICS_CONFIG = {
  development: {
    enabled: true,
    debug: true,
    services: ["console"],
  },
  staging: {
    enabled: true,
    debug: true,
    services: ["mixpanel", "custom"],
  },
  production: {
    enabled: true,
    debug: false,
    services: ["ga4", "mixpanel", "custom"],
  },
}

export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  const env = process.env.NODE_ENV as keyof typeof ANALYTICS_CONFIG
  const config = ANALYTICS_CONFIG[env] || ANALYTICS_CONFIG.development
  
  if (!config.enabled) return
  
  if (config.debug) {
    console.log("📊 Analytics Event:", eventName, properties)
  }
  
  if (typeof window === "undefined") return
  
  // Track to configured services
  if (config.services.includes("ga4") && window.gtag) {
    window.gtag("event", eventName, properties)
  }
  
  if (config.services.includes("mixpanel") && window.mixpanel) {
    window.mixpanel.track(eventName, properties)
  }
  
  if (config.services.includes("custom")) {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: eventName, properties }),
    }).catch(console.error)
  }
}
*/

// ============================================================================
// USER IDENTIFICATION
// ============================================================================

/*
// Call this when user signs in
export function identifyUser(userId: string, traits?: {
  email?: string
  name?: string
  tier?: string
  [key: string]: any
}): void {
  if (typeof window === "undefined") return
  
  // Google Analytics
  if (window.gtag) {
    window.gtag("set", "user_properties", {
      user_id: userId,
      ...traits,
    })
  }
  
  // Mixpanel
  if (window.mixpanel) {
    window.mixpanel.identify(userId)
    window.mixpanel.people.set(traits)
  }
  
  // Segment
  if (window.analytics) {
    window.analytics.identify(userId, traits)
  }
  
  // PostHog
  if (window.posthog) {
    window.posthog.identify(userId, traits)
  }
}

// Call this when user signs out
export function resetUser(): void {
  if (typeof window === "undefined") return
  
  // Mixpanel
  if (window.mixpanel) {
    window.mixpanel.reset()
  }
  
  // Segment
  if (window.analytics) {
    window.analytics.reset()
  }
  
  // PostHog
  if (window.posthog) {
    window.posthog.reset()
  }
}
*/

export {}

