⚠️ CRITICAL INSTRUCTIONS FOR CURSOR


IMPORTANT: This is an ENHANCEMENT project, NOT a refactor.

RULES:
1. DO NOT modify existing files unless explicitly instructed
2. DO NOT refactor current code structure
3. DO NOT change existing component APIs
4. DO NOT rename existing files or folders
5. DO NOT remove existing functionality
6. DO add NEW components in NEW files
7. DO extend existing components when needed
8. DO maintain existing patterns and conventions
9. DO preserve all current imports and exports
10. DO follow the existing project structure

EXISTING PROJECT STRUCTURE (DO NOT CHANGE):
✅ app/ - Next.js 15 app directory (KEEP AS-IS)
✅ components/ui/ - shadcn components (KEEP AS-IS)
✅ components/navigation/ - navbar & footer (KEEP AS-IS)
✅ components/providers/ - theme provider (KEEP AS-IS)
✅ lib/utils.ts - utility functions (KEEP AS-IS)
✅ app/globals.css - global styles (KEEP AS-IS)
✅ tailwind.config.ts - Tailwind config (KEEP AS-IS)

NEW COMPONENTS LOCATION:
📁 components/animated/ - All new animated components
📁 components/home/ - Homepage-specific components
📁 components/dashboard/ - Dashboard components
📁 components/blog/ - Blog-specific components
📁 components/transitions/ - Page transition wrappers


📋 CURRENT PROJECT STATUS
✅ Existing Code (DO NOT TOUCH)
✓ app/layout.tsx - Root layout with theme provider
✓ app/page.tsx - Homepage (basic, needs enhancement)
✓ app/about/page.tsx - About page (complete)
✓ app/blog/page.tsx - Blog listing (complete)
✓ app/blog/[slug]/page.tsx - Single post (complete)
✓ app/dashboard/page.tsx - Dashboard placeholder
✓ components/ui/button.tsx - shadcn button
✓ components/ui/card.tsx - shadcn card
✓ components/navigation/navbar.tsx - Main navbar
✓ components/navigation/footer.tsx - Footer
✓ components/theme-toggle.tsx - Theme toggle
✓ components/providers/theme-provider.tsx - Theme context

🎯 What We're Adding (NEW FILES ONLY)

NEW components/animated/ - Animated wrapper components
NEW components/home/ - Enhanced homepage sections
NEW components/dashboard/ - Dashboard UI components
NEW components/blog/ - Animated blog components
NEW components/transitions/ - Page transition system
NEW hooks/ - Custom animation hooks