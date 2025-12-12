# Visual Guide: Sidebar Features

A visual walkthrough of all the enhanced sidebar features.

## 🎨 Tooltip Examples

### 1. Basic Tooltip (Collapsed Sidebar)
```
┌─────────────────────────────────┐
│ 🏠 Dashboard                    │
│                                 │
│ Your security learning hub with │
│ personalized insights and       │
│ progress tracking               │
│                                 │
│ ⌨️  ⌘D                          │
└─────────────────────────────────┘
```

### 2. Locked Feature Tooltip
```
┌─────────────────────────────────┐
│ 🤖 AI Security Assistant  [PRO] │
│                                 │
│ Get instant answers to your     │
│ security questions from our     │
│ AI-powered assistant            │
│                                 │
│ 🔒 Requires Pro plan            │
│                                 │
│ ⌨️  ⌘K                          │
└─────────────────────────────────┘
```

### 3. New Feature Tooltip
```
┌─────────────────────────────────┐
│ 📄 Security Briefings    [NEW]  │
│                                 │
│ Stay updated with the latest    │
│ security news, vulnerabilities, │
│ and best practices              │
└─────────────────────────────────┘
```

### 4. Upgrade CTA Tooltip
```
┌─────────────────────────────────┐
│ Pro Features Include:           │
│                                 │
│ • Unlimited AI Security         │
│   Assistant                     │
│ • Real-time threat alerts       │
│ • Full briefings archive        │
│ • Compliance tracking tools     │
│ • Priority support              │
└─────────────────────────────────┘
```

## 🎯 Sidebar States

### Guest User View
```
┌──────────────────────────┐
│ ← Exit to main site      │
│                          │
│ 🛡️  SMBShield Academy    │
│    Cyber Command         │
│                          │
│ ✨ AI-powered learning   │
│                          │
├──────────────────────────┤
│ CORE FEATURES            │
│ 🏠 Dashboard             │
│ 📚 OWASP Top 10 [Limited]│
│ 🤖 AI Assistant 🔒 [3/d] │
│                          │
│ RESOURCES                │
│ 📄 Briefings 🔒 [Limited]│
│ 🔔 Threat Alerts 🔒      │
│ 🛡️  Compliance 🔒 [PRO]  │
│                          │
│ ┌──────────────────────┐ │
│ │ ✨ Upgrade to Pro    │ │
│ │    Unlock all        │ │
│ └──────────────────────┘ │
│                          │
│ ACCOUNT                  │
│ 👤 Profile 🔒            │
│ ⚙️  Settings 🔒          │
│                          │
├──────────────────────────┤
│ [Sign in]                │
│ Theme: 🌙               │
└──────────────────────────┘
```

### Free User View
```
┌──────────────────────────┐
│ ← Exit to main site      │
│                          │
│ 🛡️  SMBShield Academy    │
│    Cyber Command         │
│                          │
│ ✨ AI-powered learning   │
│                          │
├──────────────────────────┤
│ CORE FEATURES            │
│ 🏠 Dashboard             │
│ 📚 OWASP Top 10          │
│ 🤖 AI Assistant 🔒 [7/10]│
│                          │
│ RESOURCES                │
│ 📄 Briefings [Current]   │
│ 🔔 Threat Alerts 🔒      │
│ 🛡️  Compliance 🔒 [PRO]  │
│                          │
│ ┌──────────────────────┐ │
│ │ ✨ Upgrade to Pro    │ │
│ │    Unlock all        │ │
│ └──────────────────────┘ │
│                          │
│ ACCOUNT                  │
│ 👤 Profile [Complete]    │
│ ⚙️  Settings             │
│                          │
├──────────────────────────┤
│ 👤 John Doe              │
│    john@example.com      │
│ Theme: 🌙               │
└──────────────────────────┘
```

### Pro User View
```
┌──────────────────────────┐
│ ← Exit to main site      │
│                          │
│ 🛡️  SMBShield Academy    │
│    Cyber Command         │
│                          │
│ ✨ AI-powered learning   │
│                          │
├──────────────────────────┤
│ CORE FEATURES            │
│ 🏠 Dashboard             │
│ 📚 OWASP Top 10          │
│ 🤖 AI Assistant [NEW] ●  │
│                          │
│ RESOURCES                │
│ 📄 Briefings [NEW] ●     │
│ 🔔 Threat Alerts (2)     │
│ 🛡️  Compliance [PRO]     │
│                          │
│ ┌──────────────────────┐ │
│ │ ✅ Pro Member        │ │
│ │    Status: Active    │ │
│ └──────────────────────┘ │
│                          │
│ ACCOUNT                  │
│ 👤 Profile               │
│ ⚙️  Settings [Secure]    │
│                          │
├──────────────────────────┤
│ 👤 Jane Pro              │
│    jane@example.com      │
│ Theme: 🌙               │
└──────────────────────────┘
```

### Collapsed Sidebar (Icon Mode)
```
┌────┐
│ ←  │ ← Exit
│    │
│ 🛡️  │ SMBShield
│    │
├────┤
│ 🏠 │ Dashboard
│ 📚 │ OWASP
│ 🤖●│ AI (NEW)
│    │
│ 📄●│ Briefings
│ 🔔 │ Alerts (2)
│ 🛡️  │ Compliance
│    │
│ ✨ │ Upgrade
│    │
│ 👤 │ Profile
│ ⚙️  │ Settings
│    │
├────┤
│ 👤 │ User
│ 🌙 │ Theme
└────┘
```

## 🎬 Interaction Flows

### Flow 1: First-Time User (Onboarding)
```
1. User visits dashboard for first time
   ↓
2. Onboarding tooltip appears on Dashboard
   ┌─────────────────────────────────┐
   │ ✨ Welcome to your Dashboard!   │
   │                                 │
   │ This is your command center for │
   │ all security learning...        │
   │                                 │
   │ [Got it!]                       │
   └─────────────────────────────────┘
   ↓
3. User clicks "Got it!"
   ↓
4. Tooltip dismissed, never shows again
   ↓
5. Analytics: sidebar_onboarding_tooltip_dismiss
```

### Flow 2: Discovering New Features
```
1. New feature added with isNew: true
   ↓
2. User sees menu item with:
   - Green "NEW" badge
   - Animated pulse dot on icon
   ↓
3. User hovers (collapsed sidebar)
   - Tooltip shows [NEW] badge
   - Description explains feature
   ↓
4. User clicks feature
   ↓
5. "NEW" badge disappears
   ↓
6. Analytics: sidebar_whats_new_click
```

### Flow 3: Locked Feature Attempt
```
1. Free user clicks Pro feature
   ↓
2. Navigation prevented
   ↓
3. Toast notification appears:
   "Pro feature locked"
   "Upgrade to Pro to unlock..."
   ↓
4. Analytics: sidebar_locked_feature_attempt
   {
     feature_title: "Compliance Tracker",
     required_tier: "Pro",
     current_tier: "free"
   }
   ↓
5. User can click upgrade CTA
   ↓
6. Analytics: sidebar_upgrade_cta_click
```

### Flow 4: Getting Help
```
1. User hovers over menu item
   ↓
2. Help icon (?) appears
   ↓
3. User clicks help icon
   ↓
4. Detailed tooltip shows:
   ┌─────────────────────────────────┐
   │ OWASP Top 10                    │
   │                                 │
   │ The OWASP Top 10 is a standard  │
   │ awareness document for          │
   │ developers and web application  │
   │ security...                     │
   └─────────────────────────────────┘
   ↓
5. Analytics: sidebar_help_icon_click
```

## 📊 Analytics Event Timeline

### Example Session
```
Time    Event                           Properties
─────────────────────────────────────────────────────────────
00:00   sidebar_mobile_menu_open        {}
00:02   sidebar_navigation_click        {href: "/dashboard", 
                                         title: "Dashboard",
                                         user_tier: "free",
                                         is_locked: false}
00:05   sidebar_onboarding_tooltip_view {tooltip_id: "dashboard-intro"}
00:08   sidebar_onboarding_tooltip_dismiss {tooltip_id: "dashboard-intro"}
00:15   sidebar_navigation_click        {href: "/dashboard/chat",
                                         title: "AI Assistant",
                                         user_tier: "free",
                                         is_locked: false}
00:20   sidebar_whats_new_click         {feature_title: "AI Assistant"}
00:45   sidebar_locked_feature_attempt  {feature_title: "Compliance",
                                         required_tier: "Pro",
                                         current_tier: "free"}
00:50   sidebar_upgrade_cta_click       {user_tier: "free",
                                         source: "sidebar_cta"}
01:30   sidebar_collapse_toggle         {action: "collapse",
                                         viewport: "desktop"}
01:35   sidebar_help_icon_click         {feature_title: "OWASP Top 10"}
```

## 🎨 Badge Styles

### NEW Badge
```
┌─────┐
│ NEW │  Green background
└─────┘  Emerald text
         Animated pulse dot
```

### PRO Badge
```
┌─────┐
│ PRO │  Amber gradient
└─────┘  Premium look
         Shimmer effect
```

### SOON Badge
```
┌──────┐
│ SOON │  Blue background
└──────┘  Muted appearance
```

### Quota Badge
```
┌─────┐
│ 7/10│  Monospace font
└─────┘  Warning color
         Shows usage
```

### Count Badge
```
┌───┐
│ 2 │  Red background
└───┘  With dot indicator
       Notification style
```

## 🔄 Responsive Behavior

### Desktop (>1024px)
```
Full sidebar:
- All text visible
- Tooltips on hover
- Collapsible to icon mode
- Keyboard shortcuts shown

Icon mode:
- Only icons visible
- Rich tooltips on hover
- All info in tooltips
- Quick access
```

### Tablet (768-1024px)
```
Pinnable sidebar:
- Collapsed by default
- Expands on hover
- Pin to keep open
- Touch-friendly

Pinned:
- Stays open
- Full functionality
- Unpin to auto-hide
```

### Mobile (<768px)
```
Drawer menu:
- Hidden by default
- Opens from left
- Full screen overlay
- Touch gestures
- Swipe to close
```

## 🎯 User Journey Map

### Guest → Free → Pro

```
GUEST USER
├─ Limited access
├─ See locked features
├─ "Sign in" CTA
└─ Upgrade prompts
   ↓ [Signs up]
   
FREE USER
├─ More features unlocked
├─ Usage quotas shown
├─ Pro features locked
└─ Upgrade CTA visible
   ↓ [Upgrades]
   
PRO USER
├─ All features unlocked
├─ No limitations
├─ Pro status badge
└─ Premium experience
```

## 📱 Touch Interactions

### Mobile Gestures
```
Swipe right → Open menu
Swipe left  → Close menu
Tap outside → Close menu
Tap item    → Navigate
Long press  → Show tooltip
```

### Tablet Gestures
```
Hover edge  → Expand sidebar
Move away   → Collapse sidebar
Tap pin     → Keep open
Tap unpin   → Auto-hide
```

## 🎨 Color Coding

```
🟢 Green  → NEW features, success states
🟡 Amber  → PRO features, warnings, quotas
🔵 Blue   → SOON features, info
🔴 Red    → Notifications, alerts, errors
⚪ Gray   → Locked features, disabled states
```

## ✨ Animation States

### Pulse Animation (NEW features)
```
Frame 1: ●  (100% opacity)
Frame 2: ◉  (75% opacity, scale 1.2)
Frame 3: ○  (50% opacity, scale 1.4)
Frame 4: ◉  (75% opacity, scale 1.2)
Frame 5: ●  (100% opacity)
```

### Hover Scale
```
Normal:  Icon size 16px
Hover:   Icon size 17.6px (110%)
Active:  Icon size 17.6px (110%)
```

### Tooltip Fade In
```
0ms:   opacity 0%, scale 95%
100ms: opacity 50%, scale 97.5%
200ms: opacity 100%, scale 100%
```

---

This visual guide helps understand how all the features work together to create an intuitive, helpful sidebar experience! 🎉

