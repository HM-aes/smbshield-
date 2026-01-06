# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SMBShield is a multi-service AI-powered security intelligence platform for European SMBs:

| Service | Tech | Port | Status |
|---------|------|------|--------|
| **smbshield-complete-ui** | Next.js 16.0.10, React 19.0.1 | 3000 | ✅ Production-ready |
| **smbshield-backend** | FastAPI 0.115.5, Gemini 2.5 Flash | 8000 | ✅ Production-ready |
| **smbshield-dashboard** | Next.js 15.5.7, Tailwind v4 | 3001 | ✅ Production-ready |

All security vulnerabilities patched (Dec 2025): CVE-2025-55182, CVE-2025-66478, GHSA-f82v-jwr5-mffw, GHSA-67rr-84xm-4c7r.

---

## Quick Start Commands

### Main Frontend (smbshield-complete-ui)
```bash
cd smbshield-complete-ui
npm install && npm run dev    # localhost:3000
npm run build                 # Production build
npm run lint                  # ESLint
```

### Backend (smbshield-backend)
```bash
cd smbshield-backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload                    # localhost:8000
pytest                                           # Run all tests
pytest tests/test_main.py -v                     # Run single test file
pytest tests/test_main.py::test_function -v     # Run single test
pytest --cov=app tests/                          # Coverage report
python test_api.py                               # Integration test (needs GEMINI_API_KEY)
```

### Admin Dashboard (smbshield-dashboard)
```bash
cd smbshield-dashboard
npm install && npm run dev    # localhost:3001
```

### Multi-Service Integration Test
```bash
# With all services running:
python3 test_end_to_end.py
```

---

## Architecture

### Frontend Triple Layout System

**Marketing pages** (`/`, `/about`, `/blog`, `/resources/*`, `/industries/*`) use root layout:
- `app/layout.tsx` → ThemeProvider + Navbar + Footer + ScrollProgress

**Dashboard V1** (`/dashboard/*`) uses nested layout:
- `app/dashboard/layout.tsx` → UserProvider + SidebarProvider + PageTransition
- No Navbar/Footer - fully self-contained with AppSidebar

**Dashboard V2** (`/dashboard-v2/*`) uses 3-panel layout:
- `app/dashboard-v2/layout.tsx` → Sidebar + Main content + AI chat panel
- Glass morphism design in `components/dashboard-v2/`

### Backend Architecture

```
FastAPI (port 8000)
├── app/main.py           # App entry, middleware, routes
├── app/config.py         # Pydantic Settings from .env
├── app/agents/owasp_tutor.py  # Professor Shield (Gemini AI)
├── app/api/routes/chat.py     # Chat endpoints
└── app/models/schemas.py      # Request/response models
```

**API Endpoints:**
- `GET /health` - Health check
- `GET /health/live` - Kubernetes liveness probe
- `GET /health/ready` - Kubernetes readiness probe
- `POST /api/v1/chat` - Chat with OWASP Tutor
- `GET /api/v1/chat/quick-tip` - Random security tip

### Service Communication

Frontend → Backend via `lib/api.ts`:
```tsx
import { chatWithTutor, getQuickTip, checkBackendHealth } from "@/lib/api"
```

Requires `NEXT_PUBLIC_API_URL=http://localhost:8000` in frontend `.env.local`

---

## Key Patterns

### Animation System (Frontend)

Always use reusable wrappers from `components/animated/`:
```tsx
<FadeIn triggerOnScroll={true} delay={0.2}>
  <Content />
</FadeIn>

<StaggerContainer staggerDelay={0.1} triggerOnScroll={true}>
  {items.map(item => <Card key={item.id} />)}
</StaggerContainer>

<ScaleHover scale={1.02} liftDistance={-4}>
  <Card>Hover me</Card>
</ScaleHover>
```

### User Tier System (Frontend Dashboard)
```tsx
import { useUser } from "@/contexts/user-context"
const { user, updateUserTier } = useUser()
// user.tier: "guest" | "free" | "pro"
```

### Gemini AI Integration (Backend)

Use native `google-genai` SDK directly (NOT Pydantic AI wrapper):
```python
import google.genai as genai
from google.genai import types

client = genai.Client(api_key=settings.GEMINI_API_KEY)
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[types.Content(role="user", parts=[types.Part(text="message")])]
)
return response.text
```

### Adding New Backend Endpoints
1. Create route in `app/api/routes/`
2. Define Pydantic models in `app/models/schemas.py`
3. Register router in `app/main.py`
4. Add tests in `tests/`

---

## Environment Setup

### Backend (.env)
```bash
# Required
GEMINI_API_KEY=your-key
SECRET_KEY=your-secret  # openssl rand -hex 32

# Optional
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
USE_MOCK_RESPONSES=False
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Important Conventions

### Project Philosophy
**CRITICAL: Enhancement-only, NOT refactor:**
- DO NOT modify existing files unless explicitly instructed
- DO NOT refactor or rename files
- DO add NEW components in NEW files
- DO maintain existing patterns

### Build Configuration
- Both frontends ignore TypeScript/ESLint errors in builds (`next.config.js`)
- Backend uses `DEBUG=True` by default (disable in production)

### Tailwind Differences
- **smbshield-complete-ui**: Tailwind v3, config in `tailwind.config.ts`
- **smbshield-dashboard**: Tailwind v4, colors in `app/globals.css` via `@theme` directive

### Path Aliasing
All projects use `@/*` → project root (configured in `tsconfig.json`)
