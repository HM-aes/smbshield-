# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SMBShield Complete UI is a Next.js 16 marketing site and dashboard for an AI-powered security intelligence platform targeting European SMBs. Connects to a FastAPI backend with Gemini AI.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Development server (localhost:3000)
npm run build        # Production build (ignores TS errors via next.config.js)
npm run lint         # ESLint
```

## Environment

Create `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Architecture

### Triple Layout System

**Marketing pages** (`/`, `/about`, `/blog/*`, `/resources/*`, `/industries/*`):
- Use `app/layout.tsx` with ThemeProvider + Navbar + Footer + ScrollProgress

**Dashboard V1** (`/dashboard/*`):
- Use `app/dashboard/layout.tsx` with UserProvider + Sidebar + PageTransition
- Self-contained (no root navbar/footer)

**Dashboard V2** (`/dashboard-v2/*`):
- Use `app/dashboard-v2/layout.tsx` with 3-panel layout (sidebar + main + AI chat)
- Components in `components/dashboard-v2/` with glass morphism design
- Routes: dashboard, library, owasp, news, alerts, settings

### Key Patterns

**Animation System**: All animations use Framer Motion wrappers in `components/animated/`:
```tsx
<FadeIn triggerOnScroll={true} delay={0.2}>
<StaggerContainer staggerDelay={0.1}>
<ScaleHover scale={1.02} liftDistance={-4}>
<AnimatedCounter from={0} to={100} />
```

**User Tier System**: Dashboard simulates freemium tiers (guest/free/pro):
```tsx
const { user, updateUserTier } = useUser()  // from contexts/user-context.tsx
```

**Backend API**: All backend calls go through `lib/api.ts`:
```tsx
import { chatWithTutor, getQuickTip, checkBackendHealth } from "@/lib/api"
```

**Path Alias**: `@/*` maps to project root

### Route Structure

- `/` - Homepage
- `/about` - About page
- `/blog/*` - Blog listing and posts
- `/resources/` - news, learn, tools, owasp-top-10, owasp-top-10-llm
- `/industries/` - ecommerce, saas, professional-services
- `/dashboard/*` - V1 dashboard
- `/dashboard-v2/*` - V2 dashboard with AI chat panel

## Critical Rules

### Enhancement-Only Philosophy

**This is an ENHANCEMENT project, NOT a refactor.**

1. DO NOT modify existing files unless explicitly instructed
2. DO NOT refactor or rename files
3. DO add NEW components in NEW files
4. DO maintain existing patterns

### Animation

Always use `components/animated/*` wrappers, never inline Framer Motion

### Theme

Use CSS variables from `globals.css` (`bg-background`, `text-foreground`, etc.)

## Multi-Service Context

Part of SMBShield ecosystem:
- **smbshield-complete-ui** (this) - Port 3000
- **smbshield-backend** - FastAPI + Gemini AI - Port 8000
- **smbshield-dashboard** - Admin dashboard - Port 3001

Run with backend:
```bash
# Terminal 1
npm run dev

# Terminal 2
cd ../smbshield-backend && source venv/bin/activate && uvicorn app.main:app --reload
```
