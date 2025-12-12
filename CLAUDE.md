# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SMBShield Complete UI is a Next.js 16 frontend application for an AI-powered security intelligence platform targeting European SMBs. It features a marketing site with animated components, a full dashboard with simulated authentication, OWASP vulnerability resources, comprehensive theme support, and active backend API integration.

## Tech Stack

- **Next.js 16.0.8** - React framework with App Router + Turbopack (✅ Security patched - Dec 2025)
- **React 19.0.1** - UI library (✅ CVE-2025-55182 patched)
- **TypeScript 5.6.3** - Strict type checking enabled
- **Tailwind CSS 3.4.14** - Utility-first styling with custom animations
- **Framer Motion 11.18.2** - Animation library for all motion effects
- **shadcn/ui** - Component library (Radix UI primitives)
- **next-themes 0.2.1** - Dark/light theme management
- **FastAPI Backend** - Connected via API client (`lib/api.ts`)

## Commands

### Development
```bash
npm install              # Install dependencies
npm run dev             # Start development server (http://localhost:3000)
npm run build           # Production build
npm run start           # Start production server
npm run lint            # Run ESLint
```

### Important Notes
- Build ignores TypeScript and ESLint errors (configured in `next.config.js`)
- Development server includes hot reload
- Theme changes persist via localStorage
- Backend API runs on port 8000 (configure via `.env.local`)

## Architecture

### App Structure (Next.js App Router)

The application uses Next.js 16 App Router with nested layouts:

```
app/
├── layout.tsx              # Root layout (ThemeProvider, Navbar, Footer, ScrollProgress)
├── page.tsx                # Homepage with animated sections
├── about/                  # About page
├── blog/                   # Blog listing and [slug] dynamic routes
├── dashboard/              # Dashboard area with backend integration
│   ├── layout.tsx          # Dashboard layout (UserProvider, Sidebar, PageTransition)
│   ├── page.tsx            # Dashboard home
│   ├── briefings/          # Security briefings
│   ├── chat/               # AI chat interface (✅ connected to backend)
│   ├── owasp/              # OWASP learning
│   ├── saved/              # Saved items
│   ├── notifications/      # Threat alerts
│   └── settings/           # User settings
└── resources/              # Learning resources and OWASP guides
    ├── learn/
    ├── tools/
    ├── news/
    ├── owasp-top-10/       # Traditional OWASP Top 10
    └── owasp-top-10-llm/   # LLM-specific OWASP risks
```

### Layout Hierarchy

**Root Layout** (`app/layout.tsx`):
- Wraps entire app with `ThemeProvider`
- Includes `ScrollProgress` (reading progress bar)
- Includes `Navbar` (marketing navigation)
- Includes `Footer`

**Dashboard Layout** (`app/dashboard/layout.tsx`):
- Client component with `UserProvider` context
- Uses shadcn/ui `SidebarProvider` and `AppSidebar`
- Wraps content with `PageTransition` for smooth navigation
- Header with tier selector (Guest/Free/Pro simulation)
- Does NOT render root Navbar/Footer (dashboard is self-contained)

### Component Organization

```
components/
├── ui/                     # shadcn/ui base components (Button, Card, etc.)
├── animated/               # Reusable animation wrappers
│   ├── fade-in.tsx         # FadeIn with optional scroll trigger
│   ├── stagger-container.tsx  # Stagger children animations
│   ├── scale-hover.tsx     # Scale and lift on hover
│   ├── animated-counter.tsx   # Animated number counter
│   ├── loading-skeleton.tsx   # Loading states with shimmer
│   └── scroll-progress.tsx    # Page scroll progress bar
├── home/                   # Homepage sections (HeroSection, StatsSection, etc.)
├── blog/                   # Blog components (BlogCard)
├── dashboard/              # Dashboard-specific components
│   ├── app-sidebar.tsx     # Full sidebar with navigation (~1000 lines)
│   ├── stat-card.tsx       # Dashboard stat cards with counters
│   ├── error-boundary.tsx  # Error boundary wrapper
│   └── sidebar-skeleton.tsx   # Loading state for sidebar
├── navigation/             # Navbar and Footer
├── transitions/            # PageTransition wrapper
├── providers/              # ThemeProvider wrapper
├── owasp/                  # OWASP-specific components
└── aceternity/             # Aceternity UI components (buttons, cards, backgrounds)

lib/
├── utils.ts                # Utility functions (cn, etc.)
├── api.ts                  # Backend API client (FastAPI integration)
└── analytics.ts            # Analytics tracking (optional)

contexts/
└── user-context.tsx        # User state management (tier system)

hooks/
├── use-mobile.tsx          # Mobile device detection
├── use-mouse-position.ts   # Mouse position tracking
├── use-onboarding.ts       # Onboarding flow state
└── use-scroll-animation.ts # Scroll-based animations
```

### Key Architecture Patterns

**1. Dual Layout System:**
- Marketing pages (home, about, blog) use root layout with navbar/footer
- Dashboard pages use nested layout with sidebar, no navbar/footer
- Dashboard is fully self-contained with its own navigation

**2. Animation System:**
All animations use Framer Motion with reusable wrapper components:
- `FadeIn` - Basic fade with optional scroll trigger
- `StaggerContainer` - Stagger children with configurable delay
- `ScaleHover` - Scale and lift on hover with shadow
- `AnimatedCounter` - Smooth counting animation
- `PageTransition` - Route change animations

**3. Theme System:**
- Uses `next-themes` with CSS variables in `globals.css`
- System preference detection enabled
- `suppressHydrationWarning` on `<html>` prevents flash
- Color tokens: `--background`, `--foreground`, `--primary`, etc.
- Custom animations: `shimmer`, `glow`, `float`, `gradient`, etc.

**4. State Management:**
- User state managed via React Context (`contexts/user-context.tsx`)
- `UserProvider` wraps dashboard layout only
- User data persists to localStorage (tier, name, email)
- No real authentication - tier switching simulates Free/Pro features

**5. Backend Integration:**
- API client in `lib/api.ts` handles all backend communication
- Functions: `chatWithTutor()`, `getQuickTip()`, `checkBackendHealth()`
- Environment variable: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8000`)
- CORS configured in backend to allow frontend origin

**6. Path Aliasing:**
- `@/*` maps to project root (configured in `tsconfig.json`)
- Import example: `import { Button } from "@/components/ui/button"`

## Environment Setup

Create a `.env.local` file in the project root:

```bash
# Backend API URL (FastAPI server)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

The `NEXT_PUBLIC_` prefix makes this variable available in the browser.

## Custom Tailwind Configuration

### Custom Colors
- `accent-blue`, `accent-cyan`, `accent-purple` for gradients
- Full shadcn/ui color palette with HSL variables
- Sidebar-specific color tokens

### Custom Animations
Defined in `tailwind.config.ts`:
- `shimmer` - Loading skeleton effect
- `glow` - Pulsing glow effect
- `float` - Floating animation
- `spotlight` - Spotlight reveal
- `gradient` - Animated gradient background

Use with: `animate-shimmer`, `animate-glow`, etc.

## Working with This Codebase

### ⚠️ CRITICAL: Enhancement-Only Philosophy

**This is an ENHANCEMENT project, NOT a refactor.**

**RULES:**
1. ❌ DO NOT modify existing files unless explicitly instructed
2. ❌ DO NOT refactor current code structure or rename files
3. ❌ DO NOT change existing component APIs
4. ✅ DO add NEW components in NEW files when extending functionality
5. ✅ DO maintain existing patterns and conventions
6. ✅ DO preserve all current imports and exports

### Adding New Pages

**Marketing page:**
```bash
mkdir app/new-page
# Create app/new-page/page.tsx
# Page automatically gets root layout (navbar/footer)
```

**Dashboard page:**
```bash
mkdir app/dashboard/new-feature
# Create app/dashboard/new-feature/page.tsx
# Page automatically gets dashboard layout (sidebar)
# Add route to components/dashboard/app-sidebar.tsx navigation
```

### Adding Animations

Use existing animation wrappers instead of writing Framer Motion directly:

```tsx
import { FadeIn } from "@/components/animated/fade-in"
import { StaggerContainer } from "@/components/animated/stagger-container"
import { ScaleHover } from "@/components/animated/scale-hover"

// Scroll-triggered fade
<FadeIn triggerOnScroll={true} delay={0.2}>
  <div>Content</div>
</FadeIn>

// Staggered children
<StaggerContainer staggerDelay={0.1} triggerOnScroll={true}>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</StaggerContainer>

// Hover effect
<ScaleHover scale={1.02} liftDistance={-4}>
  <Card>Hover me</Card>
</ScaleHover>
```

### Working with Themes

Theme toggle component: `components/theme-toggle.tsx`
- Uses `useTheme()` from `next-themes`
- Persists user preference
- Supports system preference

Adding theme-aware styles:
```tsx
className="bg-background text-foreground dark:bg-card"
```

### Custom Hooks

The project includes several custom hooks in `hooks/`:

```tsx
import { useMobile } from "@/hooks/use-mobile"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useOnboarding } from "@/hooks/use-onboarding"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

// Detect mobile devices
const isMobile = useMobile()

// Track mouse position
const { x, y } = useMousePosition()

// Manage onboarding flow
const { step, nextStep, prevStep, completeOnboarding } = useOnboarding()

// Scroll-based animations
const { isInView } = useScrollAnimation()
```

### Dashboard Tier System

The dashboard simulates a freemium model with three tiers:
- **Guest** - No account, limited features
- **Free** - Basic features
- **Pro** - Full features

Access user tier:
```tsx
import { useUser } from "@/contexts/user-context"

const { user, updateUserTier } = useUser()
// user.tier is "guest" | "free" | "pro"
```

Feature gating example:
```tsx
{user.tier === "pro" && <ProFeature />}
{user.tier !== "guest" && <AuthenticatedFeature />}
```

### Backend API Integration

All backend communication happens through `lib/api.ts`:

```tsx
import { chatWithTutor, getQuickTip, checkBackendHealth } from "@/lib/api"

// Send a chat message to OWASP Tutor
const response = await chatWithTutor("What is XSS?", conversationHistory)

// Get a quick security tip
const tip = await getQuickTip()

// Check backend health
const isHealthy = await checkBackendHealth()
```

**API Functions:**
- `chatWithTutor(message, conversationHistory?)` - Chat with AI tutor
- `getQuickTip()` - Get random security tip
- `checkBackendHealth()` - Health check endpoint

**Backend Requirements:**
- FastAPI backend running on port 8000 (default)
- Endpoints: `POST /api/v1/chat`, `GET /api/v1/chat/quick-tip`, `GET /health`
- CORS configured to allow `http://localhost:3000`

### shadcn/ui Components

Components are installed locally in `components/ui/` (not npm packages):
- Fully customizable
- Add new components: refer to shadcn/ui docs
- All components support `className` prop for Tailwind overrides

Common components:
- `Button`, `Card`, `Dialog`, `Dropdown Menu`, `Select`, `Switch`, `Tabs`, `Tooltip`
- Sidebar components: `Sidebar`, `SidebarProvider`, `SidebarTrigger`, `SidebarInset`

### Error Handling

Dashboard uses `ErrorBoundary` component:
- Wraps `PageTransition` in dashboard layout
- Catches React errors and shows friendly UI
- Located at `components/dashboard/error-boundary.tsx`

### TypeScript Patterns

All components use TypeScript with strict mode enabled:
- Props interfaces defined explicitly
- Use `ReactNode` for children props
- Client components marked with `"use client"` directive

Example:
```tsx
"use client"

import { ReactNode } from "react"

interface MyComponentProps {
  title: string
  children: ReactNode
  optional?: boolean
}

export function MyComponent({ title, children, optional = false }: MyComponentProps) {
  return <div>{title}</div>
}
```

## Common Patterns

### Page with Animated Sections
```tsx
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { PageTransition } from "@/components/transitions/page-transition"

export default function MyPage() {
  return (
    <PageTransition>
      <HeroSection />
      <StatsSection />
    </PageTransition>
  )
}
```

### Dashboard Page with Stats
```tsx
"use client"

import { DashboardStatCard } from "@/components/dashboard/stat-card"
import { useUser } from "@/contexts/user-context"

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardStatCard
          title="Total Threats"
          value={127}
          trend="up"
          change="+12%"
          description="Compared to last month"
        />
      </div>
    </div>
  )
}
```

### Staggered Grid with Hover
```tsx
<StaggerContainer
  staggerDelay={0.1}
  triggerOnScroll={true}
  className="grid gap-6 md:grid-cols-3"
>
  {items.map((item) => (
    <ScaleHover key={item.id}>
      <Card>{item.content}</Card>
    </ScaleHover>
  ))}
</StaggerContainer>
```

### Backend API Call with Error Handling
```tsx
"use client"

import { useState } from "react"
import { chatWithTutor } from "@/lib/api"

export default function ChatPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async (message: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await chatWithTutor(message)
      // Handle response
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Chat UI */}
    </div>
  )
}
```

## Important Files

- `app/globals.css` - Global styles and CSS variables (theme tokens, base styles)
- `tailwind.config.ts` - Tailwind configuration with custom animations
- `next.config.js` - Next.js configuration (build error suppression)
- `components.json` - shadcn/ui configuration
- `contexts/user-context.tsx` - User state management
- `lib/api.ts` - Backend API client (all backend communication)
- `components/dashboard/app-sidebar.tsx` - Main dashboard navigation (large file, ~1000 lines)
- `.env.local` - Environment variables (API URL)

## Known Configuration

- **Build errors ignored**: TypeScript and ESLint errors won't fail builds
- **Strict mode**: TypeScript strict mode enabled for development
- **ESLint**: Next.js recommended config
- **Hydration warnings**: Suppressed on `<html>` tag for theme
- **Path alias**: `@/*` maps to project root
- **API URL**: Configured via `NEXT_PUBLIC_API_URL` environment variable

## Design Philosophy

- **Framer Motion for all animations**: Don't use CSS transitions, use Framer Motion for consistency
- **Reusable animation wrappers**: Use `animated/*` components instead of inline Framer Motion
- **shadcn/ui for base components**: All UI primitives come from shadcn/ui
- **Responsive-first**: All components designed for mobile and desktop
- **Theme-aware**: All components support light and dark mode
- **Accessibility**: Components use ARIA labels and semantic HTML
- **Enhancement-only**: Add new features without modifying existing code structure

## Multi-Service Architecture

This frontend is part of a larger SMBShield ecosystem:

1. **smbshield-complete-ui** (this repo) - Next.js 16 frontend (port 3000)
2. **smbshield-backend** - FastAPI backend with Pydantic AI agents (port 8000)
3. **smbshield-dashboard** - Standalone admin dashboard (port 3001)

### Running with Backend

**Terminal 1 - Frontend:**
```bash
npm run dev  # Port 3000
```

**Terminal 2 - Backend:**
```bash
cd ../smbshield-backend
source venv/bin/activate
uvicorn app.main:app --reload  # Port 8000
```

The frontend will automatically connect to the backend via the API client.

## Security Updates

**Latest Security Patches (December 9, 2025):**
- ✅ Next.js 15.5.7 → 16.0.8 (CVE-2025-55182, CVE-2025-66478 fully patched)
- ✅ React 18.3.1 → 19.0.1 (Critical RCE vulnerability CVE-2025-55182 patched)
- ✅ All critical vulnerabilities resolved
- ✅ `npm audit` shows 0 vulnerabilities
- ✅ Production build verified
- ✅ Production-ready

**Critical Vulnerabilities Fixed:**
- **CVE-2025-55182** (CVSS 10.0) - React Server Components RCE vulnerability
- **CVE-2025-66478** (CVSS 10.0) - Next.js downstream impact (duplicate of CVE-2025-55182)

These vulnerabilities allowed remote code execution through crafted HTTP requests to Server Function endpoints. No special setup was required to exploit. Multiple China state-nexus threat groups were observed actively exploiting this within hours of public disclosure on December 3, 2025.

**Immediate Action Required for Other Projects:**
If you have other Next.js or React projects, update them immediately:
- Next.js: Update to 16.0.7+, 15.5.7+, or latest in your release line
- React: Update to 19.0.1+, 19.1.2+, or 19.2.1+
