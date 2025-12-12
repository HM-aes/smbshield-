# Quick Start Guide: Sidebar Enhancements

Get up and running with the enhanced sidebar features in 5 minutes!

## 🚀 Quick Setup

### Step 1: Configure Analytics (2 minutes)

Choose your analytics service and update `lib/analytics.ts`:

**Option A: Google Analytics**
```typescript
// In lib/analytics.ts, uncomment:
if (typeof window !== "undefined" && window.gtag) {
  window.gtag("event", eventName, properties)
}
```

**Option B: Keep Console Logging (Development)**
```typescript
// Already configured! Just check your browser console
// Look for: 📊 Analytics Event: ...
```

**Option C: Custom API**
```typescript
// See lib/analytics.example.ts for full examples
fetch("/api/analytics", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ event: eventName, properties }),
})
```

### Step 2: Test the Features (2 minutes)

1. **Open your app** in development mode
2. **Open browser DevTools** → Console tab
3. **Interact with the sidebar:**
   - Click menu items → See navigation tracking
   - Collapse/expand sidebar → See toggle tracking
   - Click upgrade button → See CTA tracking
   - Try locked features → See attempt tracking

4. **Test tooltips:**
   - Collapse sidebar → Hover icons → See rich tooltips
   - Hover menu items → See help icons (?)
   - Check keyboard shortcuts in tooltips

### Step 3: Test Onboarding (1 minute)

1. **Open DevTools** → Application → Local Storage
2. **Delete** `smbshield:onboarding` key
3. **Refresh page**
4. **See onboarding tooltip** on Dashboard
5. **Click "Got it!"** to dismiss

## 🎯 Common Use Cases

### Add a New Menu Item with Full Features

```typescript
// In app-sidebar.tsx, add to coreNavigation or resourceNavigation:
{
  title: "My New Feature",
  href: "/dashboard/my-feature",
  icon: MyIcon,
  tier: "pro", // "free" or "pro" or omit for all users
  description: "Short description of what this does",
  keyboardShortcut: "⌘M",
  isNew: true, // Shows NEW badge
  showHelp: true,
  helpContent: "Detailed help text that appears on hover",
  onboardingTooltip: {
    id: "my-feature-intro",
    title: "Check out this new feature!",
    content: "Here's how it works..."
  }
}
```

### Track Custom Events

```typescript
import { trackEvent } from "@/lib/analytics"

// In your component:
trackEvent("custom_action", {
  feature: "my-feature",
  action: "button-click",
  user_tier: userTier,
})
```

### Add Custom Tooltips Anywhere

```typescript
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger asChild>
    <button>Hover me</button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Helpful information here</p>
  </TooltipContent>
</Tooltip>
```

### Use Enhanced Tooltips

```typescript
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip"

<EnhancedTooltip
  title="Feature Name"
  description="What it does"
  keyboardShortcut="⌘K"
  isNew={true}
  isPro={true}
/>
```

## 🧪 Testing Checklist

Quick 5-minute test:

- [ ] Open app, check console for analytics logs
- [ ] Click 3 different menu items → See tracking
- [ ] Collapse sidebar → Hover icons → See tooltips
- [ ] Click upgrade button → See CTA tracking
- [ ] Try locked feature (as guest) → See attempt tracking
- [ ] Delete onboarding from localStorage → Refresh → See tooltip
- [ ] Click NEW badge feature → Badge disappears

## 🎨 Customization

### Change Tooltip Delay

```typescript
// In app-sidebar.tsx, update TooltipProvider:
<TooltipProvider delayDuration={500}> {/* default: 300 */}
```

### Customize Badge Colors

```typescript
// In app-sidebar.tsx, update badgeColorClasses:
const badgeColorClasses: Record<BadgeColor, string> = {
  default: "your-custom-classes",
  // ... other colors
}
```

### Add More Keyboard Shortcuts

```typescript
// In navigation items:
keyboardShortcut: "⌘K"     // Mac
keyboardShortcut: "Ctrl+K"  // Windows/Linux
keyboardShortcut: "⌘⇧K"    // Mac with Shift
```

## 📊 View Analytics

### In Development
```bash
# Open browser console
# Look for: 📊 Analytics Event: sidebar_navigation_click
```

### In Production
```bash
# Check your analytics dashboard:
# - Google Analytics: Events → sidebar_*
# - Mixpanel: Events → sidebar_*
# - Custom API: Your endpoint logs
```

## 🐛 Quick Fixes

### Tooltips Not Showing?
```typescript
// Make sure TooltipProvider wraps your sidebar
<TooltipProvider>
  <AppSidebar />
</TooltipProvider>
```

### Analytics Not Working?
```typescript
// Check lib/analytics.ts has your service configured
// Check console for errors
// Verify service is initialized in app/layout.tsx
```

### Onboarding Not Appearing?
```typescript
// Clear localStorage:
localStorage.removeItem('smbshield:onboarding')
// Refresh page
```

## 📱 Test on Different Devices

### Desktop
```bash
# Full sidebar with all features
# Collapse to test icon-only mode
```

### Tablet
```bash
# Resize browser to 768-1024px
# Test pin/unpin functionality
```

### Mobile
```bash
# Resize browser to <768px
# Test drawer menu
# Check mobile-specific tracking
```

## 🎉 You're Done!

The sidebar is now fully enhanced with:
- ✅ Rich tooltips
- ✅ Analytics tracking
- ✅ Onboarding system
- ✅ Help icons
- ✅ Progressive disclosure

## 📚 Next Steps

- Read [SIDEBAR_FEATURES.md](./SIDEBAR_FEATURES.md) for full documentation
- Check [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for details
- See [lib/analytics.example.ts](./lib/analytics.example.ts) for integration examples
- Use [sidebar-demo.tsx](./components/dashboard/sidebar-demo.tsx) for testing

## 💡 Pro Tips

1. **Use the demo component** for comprehensive testing
2. **Check analytics in dev mode** before deploying
3. **Test all user tiers** (guest, free, pro)
4. **Customize tooltip content** for your users
5. **Monitor analytics** to improve UX

## 🆘 Need Help?

- Check the troubleshooting section in SIDEBAR_FEATURES.md
- Review code comments in app-sidebar.tsx
- Test with the demo component
- Check browser console for errors

---

**Ready to go!** Start tracking user behavior and improving UX with tooltips! 🚀

