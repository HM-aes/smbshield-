# Aceternity UI Components for SMBShield

This directory contains all Aceternity UI components integrated into the SMBShield platform. These components provide modern animations and visual effects while maintaining the professional cybersecurity aesthetic.

## 📁 Directory Structure

```
aceternity/
├── backgrounds/
│   ├── spotlight.tsx              # Moving spotlight effect
│   ├── background-gradient.tsx    # Animated gradient background
│   └── grid-background.tsx        # Dot/grid pattern background
├── text/
│   ├── text-generate-effect.tsx   # Word-by-word reveal animation
│   └── gradient-text.tsx          # Animated gradient text
├── buttons/
│   ├── shimmer-button.tsx         # CTA button with shimmer effect
│   └── moving-border.tsx          # Animated border button/card
├── cards/
│   ├── animated-card.tsx          # 3D tilt card with hover effects
│   └── glowing-border-card.tsx    # Card with animated glowing border
└── index.ts                       # Centralized exports
```

## 🎨 Component Overview

### Background Components

#### Spotlight
Moving spotlight effect that creates dramatic focus.

```tsx
import { Spotlight } from "@/components/aceternity"

<Spotlight className="-top-40 left-0" fill="white" />
```

#### BackgroundGradient
Animated gradient background with mesh effect and hover glow.

```tsx
import { BackgroundGradient } from "@/components/aceternity"

<BackgroundGradient className="rounded-xl bg-card p-8">
  {children}
</BackgroundGradient>
```

#### GridBackground
Dot or grid pattern background with fade effect.

```tsx
import { GridBackground } from "@/components/aceternity"

<GridBackground type="dots" gridSize={50} dotSize={1.5}>
  {children}
</GridBackground>
```

### Text Animation Components

#### TextGenerateEffect
Word-by-word text reveal animation.

```tsx
import { TextGenerateEffect } from "@/components/aceternity"

<TextGenerateEffect 
  words="Your text here" 
  className="text-2xl"
/>
```

#### GradientText
Animated gradient text with shimmer effect.

```tsx
import { GradientText } from "@/components/aceternity"

<GradientText colors={["#3b82f6", "#06b6d4", "#a855f7"]}>
  Secure Your Business
</GradientText>
```

### Button Components

#### ShimmerButton
Primary CTA button with shimmer animation.

```tsx
import { ShimmerButton } from "@/components/aceternity"

<ShimmerButton 
  shimmerColor="#3b82f6"
  background="rgba(59, 130, 246, 1)"
>
  Get Started
</ShimmerButton>
```

#### MovingBorder
Button or card wrapper with animated border.

```tsx
import { MovingBorder, MovingBorderButton } from "@/components/aceternity"

<MovingBorder duration={3000}>
  Learn More
</MovingBorder>
```

### Card Components

#### AnimatedCard
3D tilt card with hover effects.

```tsx
import { AnimatedCard } from "@/components/aceternity"

<AnimatedCard className="rounded-xl bg-card p-6" rotation={10}>
  {children}
</AnimatedCard>
```

#### AnimatedCardWithGlow
Card with cursor-following glow effect.

```tsx
import { AnimatedCardWithGlow } from "@/components/aceternity"

<AnimatedCardWithGlow className="rounded-xl bg-card p-6">
  {children}
</AnimatedCardWithGlow>
```

#### GlowingBorderCard
Card with animated rotating glowing border.

```tsx
import { GlowingBorderCard } from "@/components/aceternity"

<GlowingBorderCard duration={4}>
  {children}
</GlowingBorderCard>
```

#### GlowingCard
Simple card with hover glow (CSS-only).

```tsx
import { GlowingCard } from "@/components/aceternity"

<GlowingCard glowIntensity="medium">
  {children}
</GlowingCard>
```

## 🎯 Testing

Visit the test page to see all components in action:

```
http://localhost:3000/aceternity-test
```

This page includes:
- Individual component demonstrations
- Combined examples
- Light/dark mode compatibility
- Interactive hover effects

## 🎨 Customization

### Tailwind Configuration

Custom colors and animations have been added to `tailwind.config.ts`:

**Colors:**
- `accent-blue`: #3b82f6
- `accent-cyan`: #06b6d4
- `accent-purple`: #a855f7

**Animations:**
- `shimmer`: Shimmer effect (2s)
- `glow`: Glowing effect (2s)
- `float`: Floating animation (3s)
- `spotlight`: Spotlight movement (2s)
- `gradient`: Gradient animation (8s)

### Global CSS

Utility classes added to `app/globals.css`:
- `.aceternity-shimmer`: Gradient shimmer effect
- `.aceternity-glow`: Box shadow glow
- `.aceternity-gradient`: Animated gradient background

## 🌓 Dark Mode Support

All components are designed with dark mode support using `next-themes`. They automatically adapt to the current theme.

## 📦 Dependencies

All components use:
- `framer-motion` (v11.11.9) - for animations
- `clsx` (v2.1.1) - for conditional classes
- `tailwind-merge` (v2.5.4) - for class merging

## 🚀 Usage in Hero Section

These components are ready to be integrated into the hero section at `components/home/hero-section.tsx`. Examples:

```tsx
// Add spotlight effect
<Spotlight className="-top-40 left-0 md:left-60" />

// Use gradient text for heading
<GradientText className="text-5xl font-bold">
  Master AI Security for Your Growing Business
</GradientText>

// Replace regular button with shimmer button
<ShimmerButton shimmerColor="#3b82f6" background="rgba(59, 130, 246, 1)">
  Get Started Free
</ShimmerButton>

// Add grid background
<GridBackground type="dots" gridSize={50}>
  {/* Hero content */}
</GridBackground>
```

## ✅ Component Status

All 9 Aceternity components are:
- ✅ Installed and configured
- ✅ TypeScript-ready with proper types
- ✅ Dark mode compatible
- ✅ Tested and working
- ✅ Ready for production use

## 📝 Notes

- Do NOT modify existing pages yet - these are standalone components ready for integration
- All animations use `framer-motion` for optimal performance
- Components follow the existing design system and shadcn patterns
- Colors match the cybersecurity theme (blues, cyans, purples)

