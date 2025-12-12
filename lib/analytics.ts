/**
 * Analytics tracking utility for sidebar interactions
 * 
 * This module provides a centralized analytics tracking system.
 * Replace the console.log statements with your preferred analytics service:
 * - Google Analytics (gtag)
 * - Mixpanel
 * - Segment
 * - PostHog
 * - Plausible
 * etc.
 */

export type AnalyticsEventName =
  | "sidebar_navigation_click"
  | "sidebar_upgrade_cta_click"
  | "sidebar_locked_feature_attempt"
  | "sidebar_collapse_toggle"
  | "sidebar_mobile_menu_open"
  | "sidebar_mobile_menu_close"
  | "sidebar_help_icon_click"
  | "sidebar_onboarding_tooltip_view"
  | "sidebar_onboarding_tooltip_dismiss"
  | "sidebar_whats_new_click"

export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track an analytics event
 * @param eventName - The name of the event to track
 * @param properties - Additional properties to send with the event
 */
export function trackEvent(
  eventName: AnalyticsEventName,
  properties?: AnalyticsEventProperties
): void {
  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.log("📊 Analytics Event:", eventName, properties)
  }

  // TODO: Replace with your analytics service
  // Example implementations:

  // Google Analytics 4
  // if (typeof window !== "undefined" && window.gtag) {
  //   window.gtag("event", eventName, properties)
  // }

  // Mixpanel
  // if (typeof window !== "undefined" && window.mixpanel) {
  //   window.mixpanel.track(eventName, properties)
  // }

  // Segment
  // if (typeof window !== "undefined" && window.analytics) {
  //   window.analytics.track(eventName, properties)
  // }

  // PostHog
  // if (typeof window !== "undefined" && window.posthog) {
  //   window.posthog.capture(eventName, properties)
  // }

  // Plausible
  // if (typeof window !== "undefined" && window.plausible) {
  //   window.plausible(eventName, { props: properties })
  // }

  // Custom API endpoint
  // fetch("/api/analytics", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ event: eventName, properties }),
  // }).catch(console.error)
}

/**
 * Track sidebar navigation clicks
 */
export function trackNavigation(
  href: string,
  title: string,
  userTier: string,
  isLocked: boolean
): void {
  trackEvent("sidebar_navigation_click", {
    href,
    title,
    user_tier: userTier,
    is_locked: isLocked,
  })
}

/**
 * Track upgrade CTA clicks
 */
export function trackUpgradeClick(userTier: string, source: string): void {
  trackEvent("sidebar_upgrade_cta_click", {
    user_tier: userTier,
    source,
  })
}

/**
 * Track locked feature attempts
 */
export function trackLockedFeatureAttempt(
  featureTitle: string,
  requiredTier: string,
  currentTier: string
): void {
  trackEvent("sidebar_locked_feature_attempt", {
    feature_title: featureTitle,
    required_tier: requiredTier,
    current_tier: currentTier,
  })
}

/**
 * Track sidebar collapse/expand actions
 */
export function trackSidebarToggle(
  action: "collapse" | "expand",
  viewport: "mobile" | "tablet" | "desktop"
): void {
  trackEvent("sidebar_collapse_toggle", {
    action,
    viewport,
  })
}

/**
 * Track mobile menu open/close
 */
export function trackMobileMenu(action: "open" | "close"): void {
  if (action === "open") {
    trackEvent("sidebar_mobile_menu_open", {})
  } else {
    trackEvent("sidebar_mobile_menu_close", {})
  }
}

/**
 * Track help icon clicks
 */
export function trackHelpClick(featureTitle: string): void {
  trackEvent("sidebar_help_icon_click", {
    feature_title: featureTitle,
  })
}

/**
 * Track onboarding tooltip views
 */
export function trackOnboardingTooltipView(tooltipId: string): void {
  trackEvent("sidebar_onboarding_tooltip_view", {
    tooltip_id: tooltipId,
  })
}

/**
 * Track onboarding tooltip dismissals
 */
export function trackOnboardingTooltipDismiss(tooltipId: string): void {
  trackEvent("sidebar_onboarding_tooltip_dismiss", {
    tooltip_id: tooltipId,
  })
}

/**
 * Track "What's New" feature clicks
 */
export function trackWhatsNewClick(featureTitle: string): void {
  trackEvent("sidebar_whats_new_click", {
    feature_title: featureTitle,
  })
}

