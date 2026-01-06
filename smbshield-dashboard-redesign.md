# SMBShield Dashboard Redesign Specification

## Overview

Redesign the SMBShield dashboard to use a **3-panel layout** inspired by modern fintech AI applications. The goal is to create a clean, functional interface where the AI chat (Professor Shield) is always visible alongside contextual user data.

**Reference**: Google AI Agent Bake-Off winning design by Brandon Hancock - a financial intelligence dashboard with persistent chat panel.

---

## Layout Architecture

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ SIDEBAR (slim)      │ MAIN CONTENT AREA                │ CHAT PANEL (fixed)      │
│ ~64px collapsed     │ ~flex-1                          │ ~400px fixed width      │
│ ~200px expanded     │                                  │                         │
├─────────────────────┼──────────────────────────────────┼─────────────────────────┤
│                     │                                  │                         │
│ [Logo]              │ ┌─────────┐ ┌─────────┐ ┌──────┐ │ 🛡️ Professor Shield    │
│ SMBShield           │ │ OWASP   │ │Security │ │Saved │ │ ────────────────────── │
│                     │ │Progress │ │ Score   │ │Items │ │ "Ask about OWASP,      │
│ ─────────────────── │ │  3/10   │ │  72%    │ │  12  │ │  LLM risks, GDPR..."   │
│                     │ └─────────┘ └─────────┘ └──────┘ │                         │
│ 🏠 Dashboard        │                                  │ ┌─────────────────────┐ │
│ 📚 My Library       │ ┌────────────────────────────┐   │ │ Chat messages area  │ │
│ 📖 OWASP Learning   │ │ 🤖 AI Security Insights    │   │ │ (scrollable)        │ │
│ 📰 News Feed        │ │                            │   │ │                     │ │
│ 🔔 Alerts           │ │ Based on your profile and  │   │ │ [User]: What OWASP  │ │
│ ⚙️ Settings         │ │ learning progress, here    │   │ │ risks should I      │ │
│                     │ │ are your priorities:       │   │ │ focus on?           │ │
│                     │ │                            │   │ │                     │ │
│                     │ │ 1. Complete A03:Injection  │   │ │ [Professor Shield]: │ │
│                     │ │ 2. Review saved briefing   │   │ │ Based on your saved │ │
│                     │ │    on ransomware trends    │   │ │ briefings about     │ │
│                     │ │ 3. New CVE affects your    │   │ │ e-commerce...       │ │
│                     │ │    tech stack             │   │ │                     │ │
│                     │ └────────────────────────────┘   │ └─────────────────────┘ │
│                     │                                  │                         │
│                     │ ┌────────────────────────────┐   │ ┌─────────────────────┐ │
│                     │ │ 📰 Latest Threats          │   │ │ Quick suggestions:  │ │
│ ─────────────────── │ │                            │   │ │ [Explain A01]       │ │
│ 👤 Guest            │ │ [Card] [Card] [Card] →     │   │ │ [RAG poisoning?]    │ │
│ ○ Demo Mode         │ │ (horizontal scroll)        │   │ │ [GDPR basics]       │ │
│ [Upgrade to Pro]    │ └────────────────────────────┘   │ └─────────────────────┘ │
│                     │                                  │                         │
│                     │                                  │ ┌─────────────────────┐ │
│                     │                                  │ │ [Input field]       │ │
│                     │                                  │ │ Ask Professor Shield│ │
│                     │                                  │ │              [Send] │ │
│                     │                                  │ └─────────────────────┘ │
└─────────────────────┴──────────────────────────────────┴─────────────────────────┘
```

---

## Panel Specifications

### 1. Left Sidebar (Navigation)

**Width**: 64px collapsed / 200px expanded
**Position**: Fixed left
**Background**: Dark theme (`bg-slate-900` or similar)

**Contents**:
```
- Logo + "SMBShield" text (collapsible)
- Separator
- Navigation Items:
  - 🏠 Dashboard        → /dashboard
  - 📚 My Library       → /dashboard/library (downloads, bookmarks, shared)
  - 📖 OWASP Learning   → /dashboard/owasp
  - 📰 News Feed        → /dashboard/news
  - 🔔 Alerts           → /dashboard/alerts
  - ⚙️ Settings         → /dashboard/settings
- Separator (at bottom)
- User Profile Section:
  - Avatar
  - "Guest" / User name
  - "Demo Mode" indicator or plan badge
  - [Upgrade to Pro] button (if Guest)
```

**My Library Badge**:
Show count of unread shared items: `📚 My Library (3)`

**Behavior**:
- Collapsible on desktop (icon-only mode)
- Drawer/sheet on mobile
- Active route highlighting
- Tooltips when collapsed

---

### 2. Center Panel (Main Content)

**Width**: `flex-1` (fills remaining space)
**Padding**: `p-6`
**Background**: Light/dark theme aware

**Section A: Stats Cards Row**
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ 📊 OWASP    │ │ 🛡️ Security │ │ 📚 My       │ │ ⬇️ Downloads│
│ Progress    │ │ Score       │ │ Library     │ │ This Month  │
│             │ │             │ │             │ │             │
│   3/10      │ │    72%      │ │     12      │ │      5      │
│ modules     │ │  Good       │ │ saved items │ │ PDFs        │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

**Card Component Props**:
```typescript
interface StatCard {
  icon: LucideIcon
  title: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  href?: string // clickable to detail page
}
```

**Section B: AI Security Insights**
```
┌─────────────────────────────────────────────────┐
│ 🤖 AI Security Insights                    [↗] │
│ ─────────────────────────────────────────────── │
│                                                 │
│ Based on your profile and learning progress,   │
│ here are your personalized priorities:         │
│                                                 │
│ 1. Complete A03:Injection module (70% done)    │
│ 2. Review saved briefing on ransomware trends  │
│ 3. New CVE-2025-XXXX affects common tech stack │
│                                                 │
│ [Ask Professor Shield about these →]           │
└─────────────────────────────────────────────────┘
```

**Requirements**:
- Auto-generated based on user's:
  - OWASP progress
  - Saved content
  - Recent threat alerts
- "Ask Professor Shield" button pre-fills chat with context
- Refresh/regenerate option

**Section C: Latest Threats**
```
┌─────────────────────────────────────────────────┐
│ 📰 Latest Threats                    [View All] │
│ ─────────────────────────────────────────────── │
│                                                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│ │ Card 1  │ │ Card 2  │ │ Card 3  │  →         │
│ │         │ │         │ │         │ (scroll)   │
│ └─────────┘ └─────────┘ └─────────┘            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Threat Card Component**:
```typescript
interface ThreatCard {
  title: string
  source: string // "SecurityWeek", "Dark Reading", etc.
  timeAgo: string
  category: 'LLM Security' | 'Compliance' | 'AI Threats' | 'CVE'
  severity?: 'critical' | 'high' | 'medium' | 'low'
  cveScore?: number
  url?: string
}
```

---

### 3. Right Panel (Chat - Professor Shield)

**Width**: 400px fixed (desktop), full-screen drawer (mobile)
**Position**: Fixed right
**Background**: Slightly different shade for distinction

**Structure**:
```
┌─────────────────────────────────────┐
│ 🛡️ Professor Shield                │
│ Your AI Cybersecurity Tutor        │
├─────────────────────────────────────┤
│                                     │
│ [Chat messages area - scrollable]   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 👤 User                         │ │
│ │ What OWASP risks should I       │ │
│ │ focus on for my e-commerce?     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🛡️ Professor Shield             │ │
│ │ Based on your saved briefings   │ │
│ │ about e-commerce, I recommend   │ │
│ │ focusing on:                    │ │
│ │                                 │ │
│ │ 1. **A03:Injection** - SQL      │ │
│ │    injection in product search  │ │
│ │ 2. **A07:Auth Failures** -      │ │
│ │    Customer account security    │ │
│ │ ...                             │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ Quick suggestions:                  │
│ [Explain A01] [RAG poisoning?]      │
│ [GDPR basics] [LLM Top 10]          │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Ask Professor Shield...      [→]│ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Chat Features**:
- Message history (scrollable, auto-scroll to bottom)
- Markdown rendering in responses
- Code blocks with syntax highlighting
- Loading indicator while AI responds
- Quick suggestion chips (pre-filled prompts)
- Input field with send button
- Optional: thumbs up/down feedback

**Quick Suggestions** (configurable):
```typescript
const quickSuggestions = [
  "Explain A01:Broken Access Control",
  "What is RAG poisoning?",
  "GDPR basics for SMBs",
  "LLM Top 10 risks",
  "How to prevent prompt injection?",
]
```

---

## Responsive Behavior

### Desktop (≥1280px)
- All 3 panels visible
- Sidebar collapsible

### Tablet (768px - 1279px)
- Sidebar collapsed by default
- Chat panel as slide-over drawer (toggle button)
- Main content full width

### Mobile (<768px)
- Sidebar as drawer (hamburger menu)
- Chat as full-screen modal (FAB button to open)
- Main content single column

---

## Component Structure

```
app/dashboard/
├── layout.tsx              # 3-panel layout wrapper
├── page.tsx                # Main dashboard (center panel content)
├── library/
│   └── page.tsx            # My Library page
├── owasp/
│   └── page.tsx            # OWASP Learning
├── news/
│   └── page.tsx            # News Feed
├── alerts/
│   └── page.tsx            # Alerts
└── settings/
    └── page.tsx            # Settings

components/
├── dashboard/
│   ├── DashboardLayout.tsx      # Main 3-panel layout
│   ├── Sidebar.tsx              # Left navigation
│   ├── ChatPanel.tsx            # Right chat panel
│   ├── StatCard.tsx             # Stat card component
│   ├── AIInsightsCard.tsx       # AI insights section
│   ├── ThreatCard.tsx           # Threat/news card
│   └── ThreatCarousel.tsx       # Horizontal scrolling threats
└── chat/
    ├── ChatMessages.tsx         # Message list
    ├── ChatInput.tsx            # Input field
    ├── ChatMessage.tsx          # Single message bubble
    └── QuickSuggestions.tsx     # Suggestion chips
```

---

## Styling Guidelines

**Design System**: shadcn/ui + Tailwind CSS

**Colors** (Dark Theme Primary):
```css
--sidebar-bg: slate-900
--main-bg: slate-950
--chat-bg: slate-900/50
--card-bg: slate-800
--accent: blue-500 (Professor Shield)
--success: green-500
--warning: amber-500
--danger: red-500
```

**Typography**:
- Headers: `font-semibold`
- Body: `font-normal`
- Code: `font-mono`

**Spacing**:
- Panel padding: `p-6`
- Card gap: `gap-4`
- Section gap: `space-y-6`

**Shadows & Borders**:
- Cards: `border border-slate-700 rounded-lg`
- Subtle shadows: `shadow-sm`

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        User Context                         │
│  (OWASP progress, saved items, preferences, plan type)      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Dashboard Layout                        │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Sidebar  │    │ Main Content │    │ Chat Panel       │  │
│  │          │    │              │    │                  │  │
│  │ Nav only │    │ Stats Cards  │◄───┤ Professor Shield │  │
│  │          │    │ AI Insights  │    │ can reference    │  │
│  │          │    │ Threats      │    │ user context     │  │
│  └──────────┘    └──────────────┘    └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Chat Context Awareness**:
Professor Shield should have access to:
- User's OWASP progress
- Saved library items
- Recent alerts/threats viewed
- User's business type (if set)

This allows contextual responses like:
> "Based on your saved briefings about retail security and your progress on A03:Injection..."

---

## Implementation Priority

### Phase 1: Layout Structure
1. Create `DashboardLayout.tsx` with 3-panel grid
2. Implement responsive breakpoints
3. Basic Sidebar with navigation

### Phase 2: Center Panel
4. StatCard components
5. AIInsightsCard (static first, then AI-generated)
6. ThreatCarousel with mock data

### Phase 3: Chat Panel
7. ChatPanel structure
8. ChatMessages + ChatInput
9. Connect to AI backend (existing Professor Shield)
10. Quick suggestions

### Phase 4: Polish
11. Animations (Framer Motion)
12. Loading states
13. Error handling
14. Mobile drawer behaviors

---

## Notes for AI IDE

- Use existing shadcn/ui components where possible
- Maintain dark theme consistency
- Keep the chat panel ALWAYS visible on desktop
- The center panel content changes based on route, but chat persists
- Use Lucide icons throughout
- TypeScript strict mode

---

## Download & Share Features

### Overview

Members can download educational materials for offline study and share content with colleagues. This is essential for B2B users who need to:
- Study at home or during commute
- Share security training with team members
- Build a personal security knowledge library
- Present findings to management

---

### Download Options

**Downloadable Content Types**:
```typescript
type DownloadableContent = 
  | 'owasp_module'      // OWASP lesson as PDF
  | 'security_briefing' // Weekly briefing as PDF
  | 'threat_report'     // Threat analysis report
  | 'chat_transcript'   // Professor Shield conversation
  | 'certificate'       // Completion certificate
  | 'cheatsheet'        // Quick reference guides
```

**Download Button Component**:
```
┌─────────────────────────────────────────────┐
│ A03: Injection                              │
│ Learn about SQL injection, NoSQL injection  │
│ and other injection attacks...              │
│                                             │
│ Progress: ████████░░ 80%                    │
│                                             │
│ [Continue Learning]  [⬇️ Download PDF] [📤] │
└─────────────────────────────────────────────┘
```

**Download Formats**:
- **PDF**: Primary format for all content
- **Markdown**: For technical users who want raw text
- **Print-friendly**: Optimized layout for printing

---

### Share Functionality

**Share Options**:
```
┌─────────────────────────────────────────────┐
│ 📤 Share this content                       │
│ ─────────────────────────────────────────── │
│                                             │
│ [📧 Email to Colleague]                     │
│ [🔗 Copy Link]                              │
│ [👥 Share with Team] (Pro only)             │
│ [💼 Export to Slack/Teams] (Pro only)       │
│                                             │
│ ─────────────────────────────────────────── │
│ Or share via:                               │
│ [LinkedIn] [Twitter/X] [WhatsApp]           │
└─────────────────────────────────────────────┘
```

**Share Component Props**:
```typescript
interface ShareOptions {
  contentId: string
  contentType: DownloadableContent
  title: string
  description?: string
  allowPublicLink: boolean      // false for Pro-only content
  allowTeamShare: boolean       // Pro feature
  trackShares: boolean          // Analytics
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  content: ShareOptions
  userPlan: 'guest' | 'pro'
}
```

---

### My Library (Enhanced)

The "My Library" page becomes the central hub for saved, downloaded, and shared content:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 📚 My Library                                        [⬇️ Export All]│
│ ─────────────────────────────────────────────────────────────────── │
│                                                                     │
│ Filters: [All] [Downloaded] [Bookmarked] [Shared with me]          │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 📄 OWASP A03: Injection - Complete Guide                        │ │
│ │ Downloaded on Dec 15, 2024 • PDF • 2.4 MB                       │ │
│ │                                                                 │ │
│ │ [📖 View] [⬇️ Download Again] [📤 Share] [🗑️ Remove]            │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 📰 Weekly Briefing: LLM Security Trends - Dec 2024              │ │
│ │ Saved on Dec 12, 2024 • Bookmarked                              │ │
│ │                                                                 │ │
│ │ [📖 View] [⬇️ Download PDF] [📤 Share] [🗑️ Remove]              │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 💬 Chat: "Prompt Injection Prevention Strategies"               │ │
│ │ Conversation with Professor Shield • Dec 10, 2024               │ │
│ │                                                                 │ │
│ │ [📖 View] [⬇️ Export as PDF] [📤 Share] [🗑️ Remove]             │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Library Item Interface**:
```typescript
interface LibraryItem {
  id: string
  type: 'download' | 'bookmark' | 'shared' | 'chat_export'
  contentType: DownloadableContent
  title: string
  description?: string
  savedAt: Date
  downloadedAt?: Date
  fileSize?: string
  filePath?: string          // For re-download
  sharedBy?: string          // If shared by colleague
  sharedWith?: string[]      // People you shared with
  tags?: string[]
}
```

---

### Team Sharing (Pro Feature)

For Pro users, enable sharing within their organization:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 👥 Share with Team                                                  │
│ ─────────────────────────────────────────────────────────────────── │
│                                                                     │
│ Content: "OWASP A03: Injection Guide"                               │
│                                                                     │
│ Share with:                                                         │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ 📧 Enter email addresses (comma separated)                      │ │
│ │ john@company.com, sarah@company.com                             │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ Or select team members:                                             │
│ ☑️ John Smith (john@company.com)                                    │
│ ☑️ Sarah Jones (sarah@company.com)                                  │
│ ☐ Mike Wilson (mike@company.com)                                    │
│                                                                     │
│ Add a message (optional):                                           │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ "Hey team, please review this before our security audit..."     │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ [Cancel]                                      [📤 Share with 2 people]│
└─────────────────────────────────────────────────────────────────────┘
```

---

### PDF Generation

**What gets exported to PDF**:

1. **OWASP Modules**:
   - Full lesson content
   - Code examples with syntax highlighting
   - Quiz questions (optional)
   - SMBShield branding + date

2. **Security Briefings**:
   - Briefing content
   - Source links
   - Action items checklist
   - SMBShield branding

3. **Chat Transcripts**:
   - Full conversation history
   - Formatted Q&A style
   - Timestamp per message
   - "Generated by Professor Shield" footer

4. **Completion Certificates**:
   - User name
   - Module/course completed
   - Completion date
   - Certificate ID (verifiable)
   - SMBShield branding

**PDF Template Structure**:
```
┌─────────────────────────────────────────────┐
│ [SMBShield Logo]              [Date]        │
│ ─────────────────────────────────────────── │
│                                             │
│ OWASP Top 10: A03 Injection                 │
│ Security Training Material                  │
│                                             │
│ ─────────────────────────────────────────── │
│                                             │
│ [Content...]                                │
│                                             │
│                                             │
│                                             │
│ ─────────────────────────────────────────── │
│ Generated by SMBShield | smbshield.eu       │
│ For: user@company.com | Page 1 of 5         │
└─────────────────────────────────────────────┘
```

---

### Integration with Chat Panel

Add download/share actions directly in the chat:

```
┌─────────────────────────────────────────────┐
│ 🛡️ Professor Shield                        │
│                                             │
│ Here's a summary of prompt injection        │
│ prevention strategies for your team:        │
│                                             │
│ 1. Input validation and sanitization...     │
│ 2. Use parameterized prompts...             │
│ 3. Implement output filtering...            │
│                                             │
│ ─────────────────────────────────────────── │
│ [👍] [👎] [📋 Copy] [⬇️ Save to Library]    │
│            [📤 Share] [📄 Export as PDF]    │
└─────────────────────────────────────────────┘
```

**Chat Message Actions**:
```typescript
interface ChatMessageActions {
  onCopy: () => void
  onSaveToLibrary: () => void
  onShare: () => void
  onExportPDF: () => void
  onFeedback: (positive: boolean) => void
}
```

---

### Quick Actions on Dashboard

Add download/share shortcuts to the main dashboard cards:

```
┌─────────────────────────────────────────────┐
│ 📰 Latest Security Briefing                 │
│ LLM Security Trends - December 2024         │
│                                             │
│ Key threats this month include new prompt   │
│ injection techniques targeting RAG systems..│
│                                             │
│ [Read Full Briefing]                        │
│ [⬇️ Download PDF] [📤 Share with Team]      │
└─────────────────────────────────────────────┘
```

---

### Access Control by Plan

| Feature | Guest | Pro |
|---------|-------|-----|
| Download OWASP PDFs | ✅ (basic) | ✅ (full) |
| Download Briefings | ❌ | ✅ |
| Export Chat as PDF | ❌ | ✅ |
| Share via Link | ✅ (limited) | ✅ |
| Share with Team | ❌ | ✅ |
| Export to Slack/Teams | ❌ | ✅ |
| Completion Certificates | ❌ | ✅ |
| Bulk Export Library | ❌ | ✅ |

---

### Component Files to Add

```
components/
├── download/
│   ├── DownloadButton.tsx       # Reusable download button
│   ├── DownloadModal.tsx        # Format selection modal
│   └── PDFGenerator.tsx         # PDF generation logic
├── share/
│   ├── ShareButton.tsx          # Reusable share button
│   ├── ShareModal.tsx           # Share options modal
│   ├── TeamShareModal.tsx       # Pro team sharing
│   └── SocialShareButtons.tsx   # LinkedIn, Twitter, etc.
└── library/
    ├── LibraryItem.tsx          # Single library item card
    ├── LibraryFilters.tsx       # Filter tabs
    └── LibraryExport.tsx        # Bulk export functionality
```

---

### API Endpoints Needed

```typescript
// Download endpoints
POST /api/download/pdf          // Generate PDF for content
GET  /api/download/:id          // Download previously generated file

// Share endpoints
POST /api/share/link            // Generate shareable link
POST /api/share/email           // Send via email
POST /api/share/team            // Share with team members (Pro)

// Library endpoints
GET  /api/library               // Get user's library items
POST /api/library/save          // Save item to library
DELETE /api/library/:id         // Remove from library
POST /api/library/export        // Bulk export (Pro)
```

---

## Reference Links

- shadcn/ui Dashboard blocks: https://ui.shadcn.com/blocks
- shadcn Sidebar: https://ui.shadcn.com/docs/components/sidebar
- Original inspiration: Brandon Hancock's AI Agent Bake-Off fintech dashboard
- PDF Generation: Consider using `@react-pdf/renderer` or `jsPDF`

---

*Created for SMBShield Dashboard Redesign - December 2024*
