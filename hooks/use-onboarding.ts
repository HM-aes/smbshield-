"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * Hook for managing onboarding state and first-time user experience
 * 
 * This hook tracks which tooltips/features the user has seen and provides
 * methods to mark them as viewed or dismissed.
 * 
 * Safe to use anywhere - doesn't depend on any context providers.
 */

const ONBOARDING_STORAGE_KEY = "smbshield:onboarding"
const WHATS_NEW_STORAGE_KEY = "smbshield:whats-new"

export interface OnboardingState {
  viewedTooltips: string[]
  dismissedTooltips: string[]
  lastVisit: string | null
  isFirstVisit: boolean
}

export interface WhatsNewState {
  viewedFeatures: string[]
  lastCheckDate: string | null
}

const defaultOnboardingState: OnboardingState = {
  viewedTooltips: [],
  dismissedTooltips: [],
  lastVisit: null,
  isFirstVisit: true,
}

const defaultWhatsNewState: WhatsNewState = {
  viewedFeatures: [],
  lastCheckDate: null,
}

export function useOnboarding() {
  const [onboardingState, setOnboardingState] = useState<OnboardingState>(
    defaultOnboardingState
  )
  const [whatsNewState, setWhatsNewState] = useState<WhatsNewState>(
    defaultWhatsNewState
  )
  const [isInitialized, setIsInitialized] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const storedOnboarding = window.localStorage.getItem(ONBOARDING_STORAGE_KEY)
      if (storedOnboarding) {
        setOnboardingState(JSON.parse(storedOnboarding))
      } else {
        // First visit - save initial state
        const initialState = {
          ...defaultOnboardingState,
          lastVisit: new Date().toISOString(),
        }
        setOnboardingState(initialState)
        window.localStorage.setItem(
          ONBOARDING_STORAGE_KEY,
          JSON.stringify(initialState)
        )
      }

      const storedWhatsNew = window.localStorage.getItem(WHATS_NEW_STORAGE_KEY)
      if (storedWhatsNew) {
        setWhatsNewState(JSON.parse(storedWhatsNew))
      }
    } catch (error) {
      console.error("Error loading onboarding state:", error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save state to localStorage whenever it changes
  const saveOnboardingState = useCallback((newState: OnboardingState) => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(newState))
      setOnboardingState(newState)
    } catch (error) {
      console.error("Error saving onboarding state:", error)
    }
  }, [])

  const saveWhatsNewState = useCallback((newState: WhatsNewState) => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(WHATS_NEW_STORAGE_KEY, JSON.stringify(newState))
      setWhatsNewState(newState)
    } catch (error) {
      console.error("Error saving what's new state:", error)
    }
  }, [])

  /**
   * Mark a tooltip as viewed
   */
  const markTooltipViewed = useCallback(
    (tooltipId: string) => {
      const newState = {
        ...onboardingState,
        viewedTooltips: Array.from(
          new Set([...onboardingState.viewedTooltips, tooltipId])
        ),
        isFirstVisit: false,
      }
      saveOnboardingState(newState)
    },
    [onboardingState, saveOnboardingState]
  )

  /**
   * Mark a tooltip as dismissed (won't show again)
   */
  const dismissTooltip = useCallback(
    (tooltipId: string) => {
      const newState = {
        ...onboardingState,
        dismissedTooltips: Array.from(
          new Set([...onboardingState.dismissedTooltips, tooltipId])
        ),
        viewedTooltips: Array.from(
          new Set([...onboardingState.viewedTooltips, tooltipId])
        ),
      }
      saveOnboardingState(newState)
    },
    [onboardingState, saveOnboardingState]
  )

  /**
   * Check if a tooltip should be shown
   */
  const shouldShowTooltip = useCallback(
    (tooltipId: string): boolean => {
      return (
        !onboardingState.dismissedTooltips.includes(tooltipId) &&
        !onboardingState.viewedTooltips.includes(tooltipId)
      )
    },
    [onboardingState]
  )

  /**
   * Mark a "What's New" feature as viewed
   */
  const markFeatureViewed = useCallback(
    (featureId: string) => {
      const newState = {
        ...whatsNewState,
        viewedFeatures: Array.from(
          new Set([...whatsNewState.viewedFeatures, featureId])
        ),
        lastCheckDate: new Date().toISOString(),
      }
      saveWhatsNewState(newState)
    },
    [whatsNewState, saveWhatsNewState]
  )

  /**
   * Check if a "What's New" badge should be shown
   */
  const shouldShowWhatsNew = useCallback(
    (featureId: string): boolean => {
      return !whatsNewState.viewedFeatures.includes(featureId)
    },
    [whatsNewState]
  )

  /**
   * Reset all onboarding state (useful for testing)
   */
  const resetOnboarding = useCallback(() => {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(ONBOARDING_STORAGE_KEY)
    setOnboardingState(defaultOnboardingState)
  }, [])

  /**
   * Reset what's new state
   */
  const resetWhatsNew = useCallback(() => {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(WHATS_NEW_STORAGE_KEY)
    setWhatsNewState(defaultWhatsNewState)
  }, [])

  return {
    onboardingState,
    whatsNewState,
    markTooltipViewed,
    dismissTooltip,
    shouldShowTooltip,
    markFeatureViewed,
    shouldShowWhatsNew,
    resetOnboarding,
    resetWhatsNew,
  }
}

