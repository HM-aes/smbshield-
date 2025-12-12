# SMBShield Animated Components Guide

This guide provides comprehensive documentation for all animated components in the SMBShield UI library. Each component includes import statements, props, and usage examples.

---

## Animation Wrappers

### FadeIn

A wrapper component that provides fade-in animation with optional scroll triggering.

**Import:**
```tsx
import { FadeIn } from "@/components/animated/fade-in"
```

**Props:**
- `children` (ReactNode, required): Content to animate
- `delay` (number, optional): Animation delay in seconds (default: `0`)
- `duration` (number, optional): Animation duration in seconds (default: `0.5`)
- `once` (boolean, optional): Whether to animate only once (default: `true`)
- `triggerOnScroll` (boolean, optional): Trigger animation on scroll into view (default: `false`)

**Example Usage:**
```tsx
// Basic fade-in on mount
<FadeIn>
  <div>Content that fades in</div>
</FadeIn>

// Fade-in with delay
<FadeIn delay={0.2}>
  <h1>Delayed heading</h1>
</FadeIn>

// Scroll-triggered fade-in
<FadeIn delay={0.1} triggerOnScroll={true}>
  <Card>This fades in when scrolled into view</Card>
</FadeIn>
```

---

### StaggerContainer

A container component that animates children with a staggered delay effect.

**Import:**
```tsx
import { StaggerContainer } from "@/components/animated/stagger-container"
```

**Props:**
- `children` (ReactNode, required): Child elements to stagger animate
- `staggerDelay` (number, optional): Delay between each child animation in seconds (default: `0.1`)
- `duration` (number, optional): Animation duration in seconds (default: `0.5`)
- `triggerOnScroll` (boolean, optional): Trigger animation on scroll into view (default: `false`)
- `className` (string, optional): Additional CSS classes

**Example Usage:**
```tsx
// Basic stagger animation
<StaggerContainer>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</StaggerContainer>

// Scroll-triggered stagger with custom delay
<StaggerContainer 
  staggerDelay={0.15} 
  triggerOnScroll={true}
  className="grid gap-4 md:grid-cols-3"
>
  {items.map((item) => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</StaggerContainer>
```

---

### ScaleHover

A wrapper component that provides scale and lift effects on hover.

**Import:**
```tsx
import { ScaleHover } from "@/components/animated/scale-hover"
```

**Props:**
- `children` (ReactNode, required): Content to apply hover effects to
- `scale` (number, optional): Scale factor on hover (default: `1.02`)
- `liftDistance` (number, optional): Vertical lift distance in pixels (default: `-4`)
- `showShadow` (boolean, optional): Show enhanced shadow on hover (default: `true`)
- `className` (string, optional): Additional CSS classes

**Example Usage:**
```tsx
// Basic hover effect
<ScaleHover>
  <Card>Hover to scale and lift</Card>
</ScaleHover>

// Custom scale and lift
<ScaleHover scale={1.05} liftDistance={-8}>
  <Button>Hover me</Button>
</ScaleHover>

// Without shadow enhancement
<ScaleHover showShadow={false} scale={1.03}>
  <div>Subtle hover effect</div>
</ScaleHover>
```

---

### AnimatedCounter

An animated counter component that counts from 0 to a target value with smooth spring animation.

**Import:**
```tsx
import { AnimatedCounter } from "@/components/animated/animated-counter"
```

**Props:**
- `value` (number, required): Target value to count to
- `duration` (number, optional): Animation duration in seconds (default: `2`)
- `decimals` (number, optional): Number of decimal places (default: `0`)
- `suffix` (string, optional): Text to append after the number (default: `""`)
- `triggerOnScroll` (boolean, optional): Start animation when scrolled into view (default: `true`)
- `className` (string, optional): Additional CSS classes

**Example Usage:**
```tsx
// Basic counter
<AnimatedCounter value={100} />

// Counter with suffix
<AnimatedCounter value={43} suffix="%" />

// Counter with decimals
<AnimatedCounter value={99.5} decimals={1} suffix="%" />

// Counter that animates immediately (not scroll-triggered)
<AnimatedCounter value={1000} triggerOnScroll={false} />

// Custom styling
<AnimatedCounter 
  value={50} 
  suffix="K" 
  className="text-4xl font-bold text-primary"
/>
```

---

## Page Components

### HeroSection

A full-width hero section with animated badge, heading, description, and CTA buttons.

**Import:**
```tsx
import { HeroSection } from "@/components/home/hero-section"
```

**Props:**
None - This is a self-contained component with no props.

**Example Usage:**
```tsx
// Simple usage
<HeroSection />

// In a page layout
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      {/* Other sections */}
    </div>
  )
}
```

**Features:**
- Animated background grid pattern
- Pulsing badge with "AI-powered security intelligence"
- Staggered heading animation with gradient text
- Fade-in description
- Hover effects on CTA buttons

---

### StatsSection

A statistics section displaying animated counters with labels.

**Import:**
```tsx
import { StatsSection } from "@/components/home/stats-section"
```

**Props:**
None - This is a self-contained component with predefined stats.

**Example Usage:**
```tsx
<StatsSection />
```

**Features:**
- Three stat cards with animated counters
- Scroll-triggered animations with stagger
- Responsive grid layout
- Stats: 43%, 60%, €10K

---

### FeaturesGrid

A grid of feature cards with icons, titles, and descriptions.

**Import:**
```tsx
import { FeaturesGrid } from "@/components/home/features-grid"
```

**Props:**
None - This is a self-contained component with predefined features.

**Example Usage:**
```tsx
<FeaturesGrid />
```

**Features:**
- Four feature cards in responsive grid
- Scroll-triggered fade-in with stagger
- Hover effects on cards (scale and lift)
- Icon hover animations
- Features: Weekly Briefings, Plain Language Reports, EU Compliance, AI-Powered Analysis

---

### PricingSection

A pricing section with animated pricing cards and feature lists.

**Import:**
```tsx
import { PricingSection } from "@/components/home/pricing-section"
```

**Props:**
None - This is a self-contained component with predefined pricing plans.

**Example Usage:**
```tsx
<PricingSection />
```

**Features:**
- Two pricing cards (Free and Pro)
- "Most Popular" badge animation on Pro plan
- Staggered card animations
- Animated feature list items
- Hover effects on cards and buttons

---

### CTASection

A call-to-action section with parallax scrolling effects.

**Import:**
```tsx
import { CTASection } from "@/components/home/cta-section"
```

**Props:**
None - This is a self-contained component.

**Example Usage:**
```tsx
<CTASection />
```

**Features:**
- Full-width gradient card
- Parallax scroll effect
- Animated gradient overlay
- Hover effects on CTA button
- Scroll-triggered fade-in

---

## Blog Components

### BlogCard

A card component for displaying blog post previews with hover effects.

**Import:**
```tsx
import { BlogCard } from "@/components/blog/blog-card"
```

**Props:**
- `post` (object, required): Blog post data object with:
  - `slug` (string, required): URL slug for the post
  - `title` (string, required): Post title
  - `excerpt` (string, required): Post excerpt/description
  - `category` (string, required): Post category
  - `date` (string, required): Publication date
  - `readTime` (string, required): Estimated reading time
  - `featured` (boolean, optional): Whether post is featured

**Example Usage:**
```tsx
// Single blog card
<BlogCard 
  post={{
    slug: "understanding-owasp-top-10",
    title: "Understanding OWASP Top 10 for SMBs",
    excerpt: "A comprehensive guide to web application security risks...",
    category: "OWASP",
    date: "November 15, 2024",
    readTime: "8 min read",
  }}
/>

// In a grid with stagger animation
<StaggerContainer staggerDelay={0.1} triggerOnScroll={true}>
  {posts.map((post) => (
    <BlogCard key={post.slug} post={post} />
  ))}
</StaggerContainer>
```

**Features:**
- Gradient image placeholder with zoom on hover
- Animated category badge
- Scale and lift hover effects
- Animated "Read More" button with arrow
- Responsive card layout

---

## Dashboard Components

### DashboardStatCard

A dashboard statistics card with animated counter, trend indicator, and description.

**Import:**
```tsx
import { DashboardStatCard } from "@/components/dashboard/stat-card"
```

**Props:**
- `title` (string, required): Card title/header
- `value` (number | string, required): Stat value (number will be animated, string displayed as-is)
- `trend` ("up" | "down", required): Trend direction
- `change` (string, required): Change percentage or text
- `description` (string, required): Description text below the stat

**Example Usage:**
```tsx
// Numeric value with counter animation
<DashboardStatCard
  title="Total Threats"
  value={127}
  trend="up"
  change="+12%"
  description="Compared to last month"
/>

// String value (no animation)
<DashboardStatCard
  title="Status"
  value="Active"
  trend="up"
  change="Normal"
  description="System is operational"
/>

// In a grid
<div className="grid gap-4 md:grid-cols-3">
  <DashboardStatCard
    title="Security Score"
    value={95}
    trend="up"
    change="+5%"
    description="Your current security rating"
  />
  <DashboardStatCard
    title="Alerts"
    value={3}
    trend="down"
    change="-2"
    description="Active security alerts"
  />
</div>
```

**Features:**
- Scroll-triggered fade-in animation
- Animated counter for numeric values
- Animated trend arrow (bounce on mount)
- Hover effects (scale and lift)
- Color-coded trends (green for up, red for down)

---

## Utility Components

### LoadingSkeleton

A loading skeleton component with shimmer animation.

**Import:**
```tsx
import { LoadingSkeleton } from "@/components/animated/loading-skeleton"
```

**Props:**
- `variant` ("text" | "card" | "avatar" | "button", optional): Skeleton variant (default: `"text"`)
- `className` (string, optional): Additional CSS classes

**Example Usage:**
```tsx
// Text skeleton
<LoadingSkeleton variant="text" />

// Card skeleton
<LoadingSkeleton variant="card" />

// Avatar skeleton
<LoadingSkeleton variant="avatar" />

// Button skeleton
<LoadingSkeleton variant="button" />

// Custom sized skeleton
<LoadingSkeleton variant="text" className="h-8 w-64" />

// Multiple skeletons for loading state
<div className="space-y-4">
  <LoadingSkeleton variant="card" className="h-48" />
  <LoadingSkeleton variant="text" className="h-4 w-3/4" />
  <LoadingSkeleton variant="text" className="h-4 w-1/2" />
</div>
```

**Features:**
- Shimmer animation effect
- Multiple variants for different use cases
- Theme-aware colors
- Smooth infinite animation

---

### ScrollProgress

A scroll progress indicator that shows at the top of the page.

**Import:**
```tsx
import { ScrollProgress } from "@/components/animated/scroll-progress"
```

**Props:**
None - This is a self-contained component with no props.

**Example Usage:**
```tsx
// Add to layout or page
export default function Layout({ children }) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  )
}

// Or in a specific page
export default function BlogPage() {
  return (
    <>
      <ScrollProgress />
      <div>Blog content...</div>
    </>
  )
}
```

**Features:**
- Fixed position at top of viewport
- Smooth progress bar animation
- Uses primary theme color
- Automatically tracks scroll position

---

### PageTransition

A wrapper component for smooth page transitions.

**Import:**
```tsx
import { PageTransition } from "@/components/transitions/page-transition"
```

**Props:**
- `children` (ReactNode, required): Page content to wrap
- `duration` (number, optional): Transition duration in seconds (default: `0.3`)
- `className` (string, optional): Additional CSS classes

**Example Usage:**
```tsx
// Basic page transition
export default function HomePage() {
  return (
    <PageTransition>
      <div>Page content</div>
    </PageTransition>
  )
}

// Custom duration
<PageTransition duration={0.5}>
  <div>Slower transition</div>
</PageTransition>

// With custom styling
<PageTransition className="min-h-screen">
  <div>Full height page</div>
</PageTransition>
```

**Features:**
- Fade and slide animations
- Spring-based transitions
- Exit animations support
- Smooth page changes

---

## Component Combinations

### Common Patterns

**Staggered Grid with Hover Effects:**
```tsx
<StaggerContainer staggerDelay={0.1} triggerOnScroll={true} className="grid gap-4 md:grid-cols-3">
  {items.map((item) => (
    <ScaleHover key={item.id} scale={1.02} liftDistance={-4}>
      <Card>{item.content}</Card>
    </ScaleHover>
  ))}
</StaggerContainer>
```

**Scroll-Triggered Counter:**
```tsx
<FadeIn triggerOnScroll={true} delay={0.2}>
  <div className="text-4xl font-bold">
    <AnimatedCounter value={100} suffix="%" triggerOnScroll={true} />
  </div>
</FadeIn>
```

**Page with Progress and Transition:**
```tsx
export default function MyPage() {
  return (
    <>
      <ScrollProgress />
      <PageTransition>
        <HeroSection />
        <StatsSection />
        <FeaturesGrid />
      </PageTransition>
    </>
  )
}
```

---

## Notes

- All components use Framer Motion for animations
- Components are client-side only (use `"use client"` directive)
- Spring animations are used for smooth, natural motion
- Scroll-triggered animations use `viewport={{ once: true }}` by default
- All components support dark mode through Tailwind CSS
- Components follow the shadcn/ui design system

