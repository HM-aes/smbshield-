# Sidebar Tooltips & Analytics Documentation

This document describes the enhanced sidebar features including tooltips, analytics tracking, onboarding, and progressive disclosure.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features Implemented](#features-implemented)
3. [File Structure](#file-structure)
4. [Analytics Tracking](#analytics-tracking)
5. [Tooltip System](#tooltip-system)
6. [Onboarding System](#onboarding-system)
7. [Usage Examples](#usage-examples)
8. [Configuration](#configuration)
9. [Testing](#testing)

## Overview

The sidebar has been enhanced with:
- **Rich tooltips** with descriptions, keyboard shortcuts, and feature badges
- **Analytics tracking** for all user interactions
- **First-time user onboarding** with dismissible tooltips
- **"What's New" indicators** for new features
- **Contextual help icons** for complex features
- **Progressive disclosure** based on user tier

## Features Implemented

### ✅ 1. Enhanced Tooltips

- **Collapsed Sidebar Tooltips**: Show full feature names and descriptions when sidebar is collapsed
- **Feature Descriptions**: Detailed explanations of what each menu item does
- **Keyboard Shortcuts**: Display keyboard shortcuts (⌘K, ⌘D, etc.)
- **Locked Feature Tooltips**: Show required tier and upgrade information
- **Badge Indicators**: NEW, PRO, SOON badges for features

### ✅ 2. Analytics Tracking

All user interactions are tracked:
- Navigation clicks (with locked status)
- Upgrade CTA clicks
- Locked feature attempts
- Sidebar collapse/expand actions
- Mobile menu open/close
- Help icon clicks
- Onboarding tooltip views/dismissals
- "What's New" feature clicks

### ✅ 3. Onboarding System

- **First-time tooltips**: Automatically shown to new users
- **Dismissible**: Users can dismiss tooltips they've seen
- **Persistent state**: Uses localStorage to remember what users have seen
- **Progressive**: Shows tooltips in order of importance

### ✅ 4. Contextual Help

- **Help icons (?)**: Appear on hover for complex features
- **Detailed explanations**: Provide context-specific guidance
- **Non-intrusive**: Only visible when hovering over menu items

### ✅ 5. Progressive Disclosure

- **Tier-based features**: Show/hide features based on user tier
- **"What's New" badges**: Highlight new features until viewed
- **Coming Soon badges**: Preview upcoming features
- **Pro badges**: Clearly mark premium features

## File Structure

```
smbshield-complete-ui/
├── lib/
│   └── analytics.ts                    # Analytics tracking utility
├── hooks/
│   └── use-onboarding.ts              # Onboarding state management
├── components/
│   ├── ui/
│   │   └── enhanced-tooltip.tsx       # Enhanced tooltip components
│   └── dashboard/
│       └── app-sidebar.tsx            # Main sidebar component (updated)
└── SIDEBAR_FEATURES.md                # This documentation
```

## Analytics Tracking

### Setup

The analytics system is designed to be analytics-service agnostic. Configure your preferred service in `lib/analytics.ts`:

```typescript
// Example: Google Analytics 4
if (typeof window !== "undefined" && window.gtag) {
  window.gtag("event", eventName, properties)
}

// Example: Mixpanel
if (typeof window !== "undefined" && window.mixpanel) {
  window.mixpanel.track(eventName, properties)
}

// Example: Segment
if (typeof window !== "undefined" && window.analytics) {
  window.analytics.track(eventName, properties)
}
```

### Tracked Events

| Event Name | Properties | Description |
|------------|-----------|-------------|
| `sidebar_navigation_click` | `href`, `title`, `user_tier`, `is_locked` | User clicks a navigation item |
| `sidebar_upgrade_cta_click` | `user_tier`, `source` | User clicks upgrade CTA |
| `sidebar_locked_feature_attempt` | `feature_title`, `required_tier`, `current_tier` | User tries to access locked feature |
| `sidebar_collapse_toggle` | `action`, `viewport` | User collapses/expands sidebar |
| `sidebar_mobile_menu_open` | - | User opens mobile menu |
| `sidebar_mobile_menu_close` | - | User closes mobile menu |
| `sidebar_help_icon_click` | `feature_title` | User clicks help icon |
| `sidebar_onboarding_tooltip_view` | `tooltip_id` | Onboarding tooltip is shown |
| `sidebar_onboarding_tooltip_dismiss` | `tooltip_id` | User dismisses onboarding tooltip |
| `sidebar_whats_new_click` | `feature_title` | User clicks feature with "NEW" badge |

### Usage

```typescript
import { trackNavigation, trackUpgradeClick } from "@/lib/analytics"

// Track navigation
trackNavigation("/dashboard/chat", "AI Security Assistant", "free", false)

// Track upgrade click
trackUpgradeClick("free", "sidebar_cta")
```

## Tooltip System

### Enhanced Tooltip Component

The `EnhancedTooltip` component provides rich tooltip content:

```typescript
<EnhancedTooltip
  title="AI Security Assistant"
  description="Get instant answers to your security questions"
  keyboardShortcut="⌘K"
  isLocked={true}
  requiredTier="Pro"
  isNew={true}
  isPro={true}
/>
```

### Help Tooltip Component

For contextual help icons:

```typescript
<HelpTooltip
  title="OWASP Top 10"
  content="The OWASP Top 10 is a standard awareness document..."
  side="top"
/>
```

### Onboarding Tooltip Component

For first-time user guidance:

```typescript
<OnboardingTooltip
  show={shouldShowTooltip("dashboard-intro")}
  title="Welcome to your Dashboard!"
  content="This is your command center..."
  onDismiss={() => dismissTooltip("dashboard-intro")}
>
  <YourComponent />
</OnboardingTooltip>
```

## Onboarding System

### Hook Usage

```typescript
import { useOnboarding } from "@/hooks/use-onboarding"

function MyComponent() {
  const {
    shouldShowTooltip,
    markTooltipViewed,
    dismissTooltip,
    shouldShowWhatsNew,
    markFeatureViewed,
  } = useOnboarding()

  // Check if tooltip should be shown
  if (shouldShowTooltip("feature-id")) {
    // Show tooltip
  }

  // Mark as viewed
  markTooltipViewed("feature-id")

  // Dismiss permanently
  dismissTooltip("feature-id")
}
```

### Storage

Onboarding state is stored in localStorage:
- Key: `smbshield:onboarding`
- Key: `smbshield:whats-new`

### Reset for Testing

```typescript
const { resetOnboarding, resetWhatsNew } = useOnboarding()

resetOnboarding() // Clear all onboarding state
resetWhatsNew()   // Clear "What's New" state
```

## Usage Examples

### Adding a New Navigation Item with Full Features

```typescript
{
  title: "New Feature",
  href: "/dashboard/new-feature",
  icon: Sparkles,
  tier: "pro",
  description: "This is a new premium feature that does amazing things",
  keyboardShortcut: "⌘N",
  isNew: true,
  showHelp: true,
  helpContent: "Detailed explanation of how to use this feature...",
  onboardingTooltip: {
    id: "new-feature-intro",
    title: "Introducing New Feature!",
    content: "This powerful new feature helps you..."
  }
}
```

### Adding Analytics to Custom Buttons

```typescript
import { trackEvent } from "@/lib/analytics"

<button onClick={() => {
  trackEvent("custom_action", {
    feature: "my-feature",
    user_tier: userTier
  })
}}>
  Custom Action
</button>
```

### Creating Custom Tooltips

```typescript
<Tooltip>
  <TooltipTrigger asChild>
    <button>Hover me</button>
  </TooltipTrigger>
  <TooltipContent side="right">
    <p className="text-xs">Helpful information here</p>
  </TooltipContent>
</Tooltip>
```

## Configuration

### Keyboard Shortcuts

Update shortcuts in the navigation items:

```typescript
keyboardShortcut: "⌘K"  // Mac
keyboardShortcut: "Ctrl+K"  // Windows/Linux
```

### Tooltip Delay

Adjust in the `TooltipProvider`:

```typescript
<TooltipProvider delayDuration={300}>
  {/* Sidebar content */}
</TooltipProvider>
```

### Analytics Service

Configure in `lib/analytics.ts` by uncommenting and configuring your preferred service.

## Testing

### Manual Testing Checklist

- [ ] Tooltips appear on collapsed sidebar
- [ ] Keyboard shortcuts are displayed correctly
- [ ] Locked features show upgrade message
- [ ] "NEW" badges appear on new features
- [ ] Help icons appear on hover
- [ ] Onboarding tooltips can be dismissed
- [ ] Analytics events fire correctly (check console in dev mode)
- [ ] Mobile menu tracks open/close
- [ ] Sidebar collapse/expand is tracked
- [ ] "What's New" badges disappear after clicking

### Testing Onboarding

1. Open browser DevTools → Application → Local Storage
2. Delete `smbshield:onboarding` key
3. Refresh page
4. Onboarding tooltips should appear

### Testing Analytics

1. Open browser DevTools → Console
2. Look for "📊 Analytics Event:" logs
3. Verify event names and properties are correct

### Testing Different User Tiers

Change the `userTier` prop in the sidebar:

```typescript
<AppSidebar userTier="guest" />  // Guest user
<AppSidebar userTier="free" />   // Free user
<AppSidebar userTier="pro" />    // Pro user
```

## Best Practices

### Tooltip Content

- **Be concise**: Keep descriptions under 2 sentences
- **Be helpful**: Explain what the feature does, not just what it is
- **Use plain language**: Avoid jargon when possible
- **Include value**: Tell users why they should use this feature

### Analytics

- **Track meaningful actions**: Don't track every hover or focus
- **Use consistent naming**: Follow the `sidebar_*` convention
- **Include context**: Add relevant properties (tier, feature name, etc.)
- **Respect privacy**: Don't track PII without consent

### Onboarding

- **Prioritize**: Show most important features first
- **Don't overwhelm**: Limit to 3-5 onboarding tooltips max
- **Make dismissible**: Always allow users to skip
- **Provide value**: Each tooltip should teach something useful

### Progressive Disclosure

- **Show relevant features**: Hide features users can't access
- **Tease premium features**: Show locked features with clear upgrade path
- **Update dynamically**: Reveal features as users upgrade
- **Celebrate upgrades**: Highlight newly unlocked features

## Troubleshooting

### Tooltips Not Showing

1. Check that `TooltipProvider` wraps the sidebar
2. Verify tooltip content is not empty
3. Check z-index conflicts with other elements

### Analytics Not Tracking

1. Verify analytics service is initialized
2. Check console for errors
3. Ensure `trackEvent` is called correctly
4. Check network tab for analytics requests

### Onboarding State Not Persisting

1. Check localStorage is enabled
2. Verify localStorage keys are correct
3. Check for localStorage quota errors
4. Test in incognito mode (separate storage)

### "What's New" Badges Not Disappearing

1. Check `shouldShowWhatsNew` logic
2. Verify `markFeatureViewed` is called on click
3. Clear localStorage and test again

## Future Enhancements

Potential improvements for future iterations:

- [ ] A/B testing for tooltip content
- [ ] Tooltip analytics (view duration, click-through rate)
- [ ] Multi-step onboarding tours
- [ ] Video tutorials in tooltips
- [ ] Keyboard shortcut customization
- [ ] Tooltip search/discovery feature
- [ ] Accessibility improvements (ARIA labels, screen reader support)
- [ ] Tooltip themes/customization
- [ ] Smart tooltips (ML-based suggestions)
- [ ] Tooltip performance metrics

## Support

For questions or issues:
1. Check this documentation
2. Review the code comments
3. Test in isolation
4. Check browser console for errors

---

**Last Updated**: November 21, 2025
**Version**: 1.0.0
**Author**: SMBShield Development Team

