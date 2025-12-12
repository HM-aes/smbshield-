"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOnboarding } from "@/hooks/use-onboarding"
import { Sparkles, RotateCcw, Eye, EyeOff } from "lucide-react"

/**
 * Demo component to showcase and test sidebar features
 * 
 * This component provides controls to:
 * - Reset onboarding state
 * - View current onboarding status
 * - Test different user scenarios
 * - Monitor analytics events
 */

export function SidebarDemo() {
  const {
    onboardingState,
    whatsNewState,
    resetOnboarding,
    resetWhatsNew,
    shouldShowTooltip,
    shouldShowWhatsNew,
  } = useOnboarding()

  const [analyticsLog, setAnalyticsLog] = React.useState<
    Array<{ event: string; properties: any; timestamp: Date }>
  >([])

  // Intercept console.log to capture analytics events
  React.useEffect(() => {
    const originalLog = console.log
    console.log = (...args: any[]) => {
      if (args[0] === "📊 Analytics Event:") {
        setAnalyticsLog((prev) => [
          ...prev.slice(-9), // Keep last 10 events
          {
            event: args[1],
            properties: args[2],
            timestamp: new Date(),
          },
        ])
      }
      originalLog.apply(console, args)
    }

    return () => {
      console.log = originalLog
    }
  }, [])

  const handleResetOnboarding = () => {
    resetOnboarding()
    alert("Onboarding state reset! Refresh the page to see onboarding tooltips again.")
  }

  const handleResetWhatsNew = () => {
    resetWhatsNew()
    alert('"What\'s New" state reset! NEW badges will appear again.')
  }

  const handleResetAnalytics = () => {
    setAnalyticsLog([])
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sidebar Features Demo</h2>
        <p className="text-muted-foreground">
          Test and monitor the enhanced sidebar features including tooltips, analytics, and onboarding.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Onboarding Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              Onboarding Status
            </CardTitle>
            <CardDescription>
              Current state of first-time user experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">First Visit:</span>
                <Badge variant={onboardingState.isFirstVisit ? "default" : "secondary"}>
                  {onboardingState.isFirstVisit ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Viewed Tooltips:</span>
                <Badge variant="outline">
                  {onboardingState.viewedTooltips.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Dismissed Tooltips:</span>
                <Badge variant="outline">
                  {onboardingState.dismissedTooltips.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Visit:</span>
                <span className="text-xs text-muted-foreground">
                  {onboardingState.lastVisit
                    ? new Date(onboardingState.lastVisit).toLocaleDateString()
                    : "Never"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button
                onClick={handleResetOnboarding}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <RotateCcw className="size-4 mr-2" />
                Reset Onboarding
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Refresh page after reset to see tooltips
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What's New Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="size-5 text-primary" />
              What's New Status
            </CardTitle>
            <CardDescription>
              Track which new features users have seen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Viewed Features:</span>
                <Badge variant="outline">
                  {whatsNewState.viewedFeatures.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Check:</span>
                <span className="text-xs text-muted-foreground">
                  {whatsNewState.lastCheckDate
                    ? new Date(whatsNewState.lastCheckDate).toLocaleDateString()
                    : "Never"}
                </span>
              </div>
            </div>

            {whatsNewState.viewedFeatures.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Viewed:</span>
                <div className="flex flex-wrap gap-1">
                  {whatsNewState.viewedFeatures.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature.split("/").pop()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t space-y-2">
              <Button
                onClick={handleResetWhatsNew}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <RotateCcw className="size-4 mr-2" />
                Reset What's New
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                NEW badges will reappear on features
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              📊 Analytics Events Log
            </span>
            <Button
              onClick={handleResetAnalytics}
              variant="ghost"
              size="sm"
            >
              Clear
            </Button>
          </CardTitle>
          <CardDescription>
            Real-time monitoring of tracked events (development mode only)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {analyticsLog.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No events tracked yet</p>
              <p className="text-xs mt-1">
                Interact with the sidebar to see events appear here
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {analyticsLog.map((log, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-muted/30 p-3 text-xs font-mono"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {log.event}
                    </Badge>
                    <span className="text-muted-foreground">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  {log.properties && Object.keys(log.properties).length > 0 && (
                    <pre className="text-[10px] text-muted-foreground overflow-x-auto">
                      {JSON.stringify(log.properties, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Checklist</CardTitle>
          <CardDescription>
            Verify all enhanced sidebar features are working
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <ChecklistItem
              label="Tooltips on collapsed sidebar"
              description="Collapse sidebar and hover over icons"
            />
            <ChecklistItem
              label="Keyboard shortcuts displayed"
              description="Check tooltips for ⌘K, ⌘D, etc."
            />
            <ChecklistItem
              label="Locked feature tooltips"
              description="Hover over locked features (guest/free tier)"
            />
            <ChecklistItem
              label="Help icons (?) appear on hover"
              description="Hover over menu items with help content"
            />
            <ChecklistItem
              label="NEW badges on features"
              description="Look for green NEW badges"
            />
            <ChecklistItem
              label="Onboarding tooltips (first visit)"
              description="Reset onboarding and refresh"
            />
            <ChecklistItem
              label="Analytics events tracked"
              description="Check the log above for events"
            />
            <ChecklistItem
              label="Upgrade CTA tooltip"
              description="Hover over the Upgrade to Pro button"
            />
            <ChecklistItem
              label="Mobile menu tracking"
              description="Open/close menu on mobile view"
            />
            <ChecklistItem
              label="Sidebar collapse tracking"
              description="Toggle sidebar and check analytics"
            />
          </div>
        </CardContent>
      </Card>

      {/* Testing Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Testing Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Test Different User Tiers:</h4>
            <p className="text-muted-foreground">
              Change the <code className="text-xs bg-muted px-1 py-0.5 rounded">userTier</code> prop
              to "guest", "free", or "pro" to see different features and tooltips.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">View in Different Viewports:</h4>
            <p className="text-muted-foreground">
              Test on mobile (&lt;768px), tablet (768-1024px), and desktop (&gt;1024px) to see
              responsive behavior and tracking.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Check Browser Console:</h4>
            <p className="text-muted-foreground">
              Open DevTools console to see detailed analytics logs with event names and properties.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Test Keyboard Navigation:</h4>
            <p className="text-muted-foreground">
              Use Tab key to navigate and verify tooltips appear with keyboard focus.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ChecklistItem({
  label,
  description,
}: {
  label: string
  description: string
}) {
  const [checked, setChecked] = React.useState(false)

  return (
    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="mt-1 size-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <div className="flex-1">
        <label className="text-sm font-medium cursor-pointer" onClick={() => setChecked(!checked)}>
          {label}
        </label>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  )
}

