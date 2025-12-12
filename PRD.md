- useInView hook
- useMotionValue
- useTransform
- animate function
- whileInView
```

**Cursor Prompt:**
```
Create components/home/stats-section.tsx with animated counters:

1. Stats section displaying:
   - 43% (SMBs attacked)
   - 60% (close after attack)
   - €10K (average cost)

2. Animations:
   - Trigger when scrolling into view (whileInView)
   - Counter animation: 0 → target value over 2 seconds
   - Stagger each stat by 0.2s
   - Card fade up + scale on scroll
   - Subtle hover lift on each stat card

3. Implementation:
   - Use motion.div with whileInView
   - Animate counter with useMotionValue + useTransform
   - Custom hook for counting animation
   - once: true (animate only once)

4. Styling: border-y, bg-muted/50, responsive grid

Tech: Framer Motion, TypeScript, Tailwind
```

---

## Component 3: Feature Cards with Hover Effects

**File:** `components/home/features-section.tsx`

**Requirements:**
- Cards lift on hover
- Icon scale on hover
- Stagger on scroll
- 3D perspective tilt (subtle)
- Smooth transitions

**Cursor Prompt:**
```
Create components/home/features-section.tsx with interactive cards:

1. Features grid (4 cards):
   - Shield icon: Weekly Security Briefings
   - Lock icon: Plain Language Reports
   - Globe icon: EU Compliance Focus
   - Zap icon: AI-Powered Analysis

2. Animations:
   - Scroll trigger: cards fade up + scale, staggered
   - Hover: lift card (-8px) with shadow increase
   - Hover: scale icon (1.1x) with rotation (5deg)
   - 3D tilt effect on hover (subtle, use rotateX/rotateY)
   - Smooth spring transitions

3. Framer Motion:
   - whileInView for scroll trigger
   - whileHover for interactions
   - motion.div for card containers
   - Icon wrapper with hover scale/rotate
   - Tilt effect using mouse position

4. Use Lucide icons, shadcn Card component, responsive grid

Tech: Framer Motion, Lucide React, TypeScript
```

---

## Component 4: Pricing Cards with Selection State

**File:** `components/home/pricing-section.tsx`

**Requirements:**
- Hover scale effect
- "Most Popular" badge animation
- Check marks animate in
- Button hover states
- Selection highlight

**Cursor Prompt:**
```
Create components/home/pricing-section.tsx with animated pricing:

1. Two pricing tiers:
   - Free: €0/month (4 features)
   - Pro: €49/month (6 features, "Most Popular")

2. Animations:
   - Cards fade + scale on scroll (stagger 0.2s)
   - Hover: scale card (1.02) + shadow increase
   - Popular badge: gentle bounce on mount
   - Feature checks: fade + slide in, staggered by 0.1s
   - Button: hover lift + scale

3. Framer Motion:
   - whileInView for initial animation
   - whileHover={{ scale: 1.02 }} on cards
   - Stagger children for feature list
   - Badge with repeat bounce (subtle)
   - Button spring animation on hover

4. Use shadcn Card, Button, Check icon from Lucide
5. Responsive: stack on mobile, 2 columns on desktop

Tech: Framer Motion, shadcn/ui, TypeScript
```

---

## Component 5: CTA Section with Parallax

**File:** `components/home/cta-section.tsx`

**Requirements:**
- Gradient background animation
- Parallax scroll effect
- Button magnetic hover
- Shine effect on card

**Cursor Prompt:**
```
Create components/home/cta-section.tsx with parallax effects:

1. CTA card with:
   - Gradient background (blue → indigo)
   - Heading: "Ready to protect your business?"
   - Description
   - Primary button: "Start Free Trial"

2. Animations:
   - Parallax: card moves slower than scroll (useScroll + useTransform)
   - Background gradient: subtle shift on hover
   - Button: magnetic effect (follows mouse within bounds)
   - Shine effect: diagonal shine sweep on mount
   - Fade + scale on scroll into view

3. Framer Motion:
   - useScroll for parallax
   - useMotionValue for mouse tracking
   - Gradient animation with animate
   - Button with hover magnetic effect
   - Shine overlay with keyframe animation

4. Full-width gradient card, centered content, responsive

Tech: Framer Motion, shadcn/ui, TypeScript
```

---

# PHASE 2: PAGE TRANSITIONS

## Component 6: Page Transition Wrapper

**File:** `components/transitions/page-transition.tsx`

**Requirements:**
- Fade between pages
- Slide animation option
- Exit animations
- Loading state

**Cursor Prompt:**
```
Create components/transitions/page-transition.tsx for smooth page changes:

1. Wrapper component that:
   - Wraps page content
   - Animates on route change
   - Supports multiple transition types
   - Handles loading states

2. Animations:
   - initial: { opacity: 0, y: 20 }
   - animate: { opacity: 1, y: 0 }
   - exit: { opacity: 0, y: -20 }
   - Duration: 0.3s
   - Spring transition

3. Features:
   - AnimatePresence for exit animations
   - layoutId for shared elements
   - Custom transition variants
   - Configurable delay

4. Export PageTransition component that takes children
5. Use with layout groups for shared element transitions

Tech: Framer Motion, Next.js, TypeScript
```

---

## Component 7: Loading States

**File:** `components/loading/loading-skeleton.tsx` & `loading-spinner.tsx`

**Cursor Prompt:**
```
Create loading components with animations:

1. components/loading/loading-skeleton.tsx:
   - Card skeleton
   - Text skeleton (title, description)
   - Shimmer animation (left to right sweep)
   - Use motion.div with keyframe animation
   - Match Tailark design (rounded, soft colors)

2. components/loading/loading-spinner.tsx:
   - Circular spinner
   - Smooth rotation animation
   - Multiple size variants (sm, md, lg)
   - Theme-aware colors
   - Infinite rotation with spring

Both components:
   - Framer Motion animations
   - TypeScript with proper props
   - Tailwind styling
   - Theme support

Tech: Framer Motion, TypeScript, Tailwind
```

---

# PHASE 3: INTERACTIVE COMPONENTS

## Component 8: Animated Navbar

**File:** Update `components/navigation/navbar.tsx`

**Requirements:**
- Scroll-triggered background
- Mobile menu slide animation
- Logo hover effect
- Link hover underline

**Cursor Prompt:**
```
Update components/navigation/navbar.tsx with Framer Motion:

1. Existing navbar enhanced with:
   - Scroll-triggered background fade (useScroll)
   - Logo scale on hover (1.05) with spring
   - Nav links: underline expands on hover
   - Mobile menu: slide down with stagger
   - Theme toggle: smooth icon swap

2. Animations:
   - Navbar bg: opacity based on scroll (0 → 0.8)
   - Backdrop blur: increases with scroll
   - Links: underline grows from center (scaleX: 0 → 1)
   - Mobile menu: slide + fade with stagger items
   - Logo: hover lift + scale

3. Framer Motion:
   - useScroll for scroll detection
   - motion.div for navbar
   - motion.a for links with hover variants
   - AnimatePresence for mobile menu
   - staggerChildren for menu items

4. Keep existing functionality, add animations

Tech: Framer Motion, existing code, TypeScript
```

---

## Component 9: Blog Card Animations

**File:** `components/blog/blog-card.tsx`

**Requirements:**
- Hover lift + shadow
- Image zoom on hover
- Stagger on scroll
- Badge pop animation

**Cursor Prompt:**
```
Create components/blog/blog-card.tsx with hover animations:

1. Blog card component displaying:
   - Featured image (with zoom on hover)
   - Category badge
   - Title
   - Excerpt
   - Date + read time
   - "Read More" button

2. Animations:
   - Card: lift on hover (-8px) + shadow increase
   - Image: scale (1 → 1.05) on hover, smooth
   - Badge: pop in on mount (scale 0 → 1)
   - Button: slide arrow on hover
   - Stagger cards when scrolling into view

3. Framer Motion:
   - motion.div for card with whileHover
   - Image overflow hidden with motion child
   - Badge with initial scale animation
   - Button with hover arrow slide
   - whileInView for scroll trigger

4. Props: post object with all fields
5. Use shadcn Card, Lucide icons, Tailwind

Tech: Framer Motion, shadcn/ui, TypeScript
```

---

## Component 10: Theme Toggle Animation

**File:** Update `components/theme-toggle.tsx`

**Requirements:**
- Smooth icon swap
- Rotation animation
- Ripple effect on click
- Smooth transitions

**Cursor Prompt:**
```
Enhance components/theme-toggle.tsx with better animations:

1. Existing theme toggle improved:
   - Sun/Moon icons with smooth swap
   - Rotation animation on toggle
   - Ripple effect on click
   - Scale pulse on interaction

2. Animations:
   - Icon swap: rotate 180deg + fade
   - Click: ripple effect expands from center
   - Hover: slight scale (1.1) + glow
   - Transition: spring with bounce

3. Framer Motion:
   - motion.button wrapper
   - AnimatePresence for icon swap
   - Whileap for click effect
   - Custom spring transitions
   - Ripple overlay with scale animation

4. Keep next-themes integration, enhance visuals

Tech: Framer Motion, next-themes, TypeScript
```

---

# PHASE 4: DASHBOARD INTEGRATION

## Component 11: Dashboard Layout with Animations

**File:** `app/dashboard/layout.tsx`

**Requirements:**
- Animated sidebar
- Page transitions
- Stats counter animations
- Smooth everything

**Cursor Prompt:**
```
Create enhanced app/dashboard/layout.tsx with animations:

1. Dashboard with sidebar:
   - Collapsible sidebar (slide animation)
   - Page content transitions
   - Breadcrumb fade in
   - Header sticky with scroll shadow

2. Animations:
   - Sidebar: slide in/out with spring
   - Sidebar items: stagger fade on open
   - Page transitions: fade + slide
   - Header shadow: opacity based on scroll
   - Logo: hover scale

3. Framer Motion:
   - AnimatePresence for sidebar toggle
   - motion.div for content area
   - useScroll for header effects
   - staggerChildren for menu items
   - layoutId for smooth sidebar collapse

4. Use shadcn Sidebar components, existing structure
5. Integrate with routes: dashboard, briefings, saved, preferences

Tech: Framer Motion, shadcn/ui sidebar, Next.js, TypeScript
```

---

## Component 12: Dashboard Stats Cards

**File:** `components/dashboard/stat-card.tsx`

**Requirements:**
- Counter animation
- Trend indicator animation
- Hover effect
- Loading skeleton

**Cursor Prompt:**
```
Create components/dashboard/stat-card.tsx with animations:

1. Stat card showing:
   - Title
   - Large value (with counter animation)
   - Trend indicator (up/down arrow)
   - Change percentage
   - Description

2. Animations:
   - Counter: 0 → value over 1.5s on mount
   - Trend arrow: bounce on mount
   - Card: subtle lift on hover
   - Loading: shimmer skeleton
   - Fade in on scroll

3. Framer Motion:
   - useMotionValue for counter
   - Custom counting hook with spring
   - whileHover for card lift
   - Arrow with bounce animation
   - Skeleton with shimmer effect

4. Props: title, value, trend, change, description
5. Use shadcn Card, Lucide icons for trends

Tech: Framer Motion, shadcn/ui, TypeScript
```

---

# PHASE 5: AUTH PAGES

## Component 13: Login Page

**File:** `app/login/page.tsx`

**Requirements:**
- Form animations
- Input focus effects
- Button states
- Error shake animation

**Cursor Prompt:**
```
Create app/login/page.tsx with animated login form:

1. Centered login card with:
   - Logo + title
   - Email input
   - Password input
   - "Remember me" checkbox
   - Login button
   - Link to signup
   - "Forgot password" link

2. Animations:
   - Card: fade + scale on mount
   - Inputs: border glow on focus
   - Button: loading spinner on submit
   - Error: shake animation
   - Success: checkmark animation

3. Framer Motion:
   - Card with spring entrance
   - Input wrapper with focus variants
   - Button with loading state animation
   - Error message shake (keyframe)
   - Form fields stagger on mount

4. Use shadcn Form components, validation
5. Theme-aware, responsive, Tailark styling

Tech: Framer Motion, shadcn/ui Form, TypeScript
```

---

## Component 14: Signup Page

**File:** `app/signup/page.tsx`

**Cursor Prompt:**
```
Create app/signup/page.tsx similar to login with:

1. Signup form with:
   - Full name
   - Email
   - Password
   - Confirm password
   - Terms checkbox
   - Signup button
   - Link to login

2. Same animation patterns as login:
   - Card entrance
   - Input focus effects
   - Stagger form fields
   - Button loading states
   - Error shake
   - Success animation

3. Additional:
   - Password strength indicator (animated bar)
   - Real-time validation feedback
   - Animated checkmarks for requirements

4. Use shadcn Form, match login design

Tech: Framer Motion, shadcn/ui, TypeScript
```

---

# PHASE 6: ADDITIONAL PAGES

## Component 15: Contact Page

**File:** `app/contact/page.tsx`

**Cursor Prompt:**
```
Create app/contact/page.tsx with animated contact form:

1. Contact page layout:
   - Hero section
   - Contact form (name, email, subject, message)
   - Contact info cards (email, location, etc)
   - Social links

2. Animations:
   - Hero fade in
   - Form: stagger inputs
   - Submit: loading + success states
   - Info cards: hover lift
   - Success message: slide down with confetti

3. Framer Motion:
   - Page transition wrapper
   - Form fields with stagger
   - Button with loading animation
   - Success banner slide + fade
   - Info cards with hover effects

4. Use shadcn Form, Textarea, Button
5. Validation, theme support, responsive

Tech: Framer Motion, shadcn/ui, TypeScript
```

---

## Component 16: 404 Page

**File:** `app/not-found.tsx`

**Cursor Prompt:**
```
Create app/not-found.tsx with playful animations:

1. 404 page with:
   - Large animated "404" text
   - Error message
   - Suggestions (Home, Blog, Contact)
   - Animated illustration or icon

2. Animations:
   - 404 text: bounce in + float animation
   - Message: fade + slide up
   - Links: stagger + hover lift
   - Background: subtle particle movement
   - Icon: gentle rotation/bounce

3. Framer Motion:
   - Text with bounce spring
   - Floating animation (repeat)
   - Stagger link buttons
   - Background particles with random motion
   - Icon with perpetual gentle motion

4. Fun, friendly, matches brand
5. Theme-aware, mobile responsive

Tech: Framer Motion, Lucide icons, TypeScript
```

---

# PHASE 7: MICRO-INTERACTIONS

## Component 17: Button Components

**File:** `components/ui/animated-button.tsx`

**Cursor Prompt:**
```
Create components/ui/animated-button.tsx with variants:

1. Enhanced button extending shadcn Button:
   - Ripple effect on click
   - Magnetic hover (within bounds)
   - Loading spinner
   - Success checkmark animation
   - Icon slide effects

2. Variants:
   - default: ripple on click
   - magnetic: follows mouse on hover
   - loading: spinner inside button
   - success: transforms to checkmark
   - icon-slide: icon slides in on hover

3. Framer Motion:
   - motion.button wrapper
   - Ripple with scale + fade
   - Mouse tracking for magnetic
   - Loading spinner rotation
   - Icon transform animations

4. Props: variant, loading, success, icon, etc
5. Fully accessible, theme-aware

Tech: Framer Motion, shadcn Button, TypeScript
```

---

## Component 18: Scroll Progress Bar

**File:** `components/ui/scroll-progress.tsx`

**Cursor Prompt:**
```
Create components/ui/scroll-progress.tsx:

1. Fixed progress bar at top showing:
   - Reading progress (0-100%)
   - Smooth animation as user scrolls
   - Theme-aware colors

2. Implementation:
   - useScroll from Framer Motion
   - useTransform for percentage
   - motion.div with scaleX transform
   - Fixed position at top
   - Height: 3px

3. Features:
   - Smooth spring animation
   - Gradient color option
   - Show/hide on certain routes
   - Z-index above content

4. Export component, use in layout

Tech: Framer Motion, TypeScript, Tailwind
```

---

## Component 19: Toast Notifications

**File:** `components/ui/toast-animated.tsx`

**Cursor Prompt:**
```
Create animated toast notification system:

1. Toast component with:
   - Slide in from top/bottom/side
   - Success/Error/Warning variants
   - Auto-dismiss timer
   - Close button
   - Progress bar

2. Animations:
   - Enter: slide + fade with spring
   - Exit: slide + fade out
   - Progress bar: width animates
   - Icon: scale pop on mount
   - Hover: pause auto-dismiss

3. Framer Motion:
   - AnimatePresence for enter/exit
   - motion.div with slide variants
   - Progress bar with motion value
   - Icon with spring scale
   - Layout animations

4. Context provider for global toasts
5. Use Lucide icons, theme-aware

Tech: Framer Motion, React Context, TypeScript
```

---

# PHASE 8: FINAL POLISH

## Component 20: Footer Enhancement

**File:** Update `components/navigation/footer.tsx`

**Cursor Prompt:**
```
Enhance components/navigation/footer.tsx with animations:

1. Existing footer improved with:
   - Links hover underline
   - Logo hover scale
   - Scroll-triggered fade in
   - Newsletter form animation

2. Animations:
   - Footer: fade + slide up when scrolling into view
   - Links: underline expands on hover
   - Logo: scale on hover
   - Newsletter input: focus glow
   - Submit button: loading spinner

3. Framer Motion:
   - whileInView for scroll trigger
   - Link hover variants
   - Logo with hover spring
   - Input focus effects
   - Button loading states

4. Keep existing structure, add animations

Tech: Framer Motion, existing code, TypeScript
```

---

# 📦 IMPLEMENTATION CHECKLIST

## Phase 1: Homepage (6 components)
- [ ] Hero Section with animations
- [ ] Stats Section with counters
- [ ] Features Section with hover
- [ ] Pricing Section with selection
- [ ] CTA Section with parallax
- [ ] Update homepage to use new components

## Phase 2: Transitions (2 components)
- [ ] Page Transition wrapper
- [ ] Loading states (skeleton + spinner)

## Phase 3: Interactive (3 components)
- [ ] Enhanced Navbar
- [ ] Blog Card animations
- [ ] Theme Toggle enhancement

## Phase 4: Dashboard (2 components)
- [ ] Dashboard Layout with animations
- [ ] Stat Cards with counters

## Phase 5: Auth (2 components)
- [ ] Login Page
- [ ] Signup Page

## Phase 6: Additional (2 components)
- [ ] Contact Page
- [ ] 404 Page

## Phase 7: Micro-interactions (3 components)
- [ ] Animated Buttons
- [ ] Scroll Progress Bar
- [ ] Toast Notifications

## Phase 8: Polish (1 component)
- [ ] Enhanced Footer

---

# 🎯 DEVELOPMENT WORKFLOW

## For Each Component:

1. **Create in Cursor Composer**
```
   Cmd/Ctrl + I → Paste prompt → Review → Accept