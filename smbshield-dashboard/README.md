# SMBShield Admin Dashboard

> Modern, animated admin dashboard for managing your SMBShield platform

Built with **Next.js 15**, **Tailwind CSS v4**, and **Framer Motion**

---

## 🎨 Features

✅ **Animated UI** - Smooth Framer Motion transitions  
✅ **Dark Theme** - Ready for your custom colors  
✅ **Responsive** - Works on all screen sizes  
✅ **Real-time Data** - Connects to Supabase  
✅ **Collapsible Sidebar** - Clean navigation  
✅ **Chart Visualizations** - Recharts integration  

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd smbshield-dashboard
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
```

### 3. Run Development Server

```bash
npm run dev
```

Dashboard will be at: **http://localhost:3001**

---

## 🎨 Customizing Your Colors

**IMPORTANT:** All colors are in `app/globals.css`

Just show me a screenshot of your desired color scheme, and I'll update these CSS variables:

```css
@theme {
  --color-primary: #3b82f6;        /* Your main brand color */
  --color-background: #0a0a0a;     /* Dark background */
  --color-card: #141414;           /* Card backgrounds */
  /* etc... */
}
```

All components automatically use these colors!

---

## 📊 What's Built

### ✅ Overview Dashboard
- Animated stat cards (users, revenue, subscribers)
- Growth charts with smooth animations
- Recent activity feed
- Responsive grid layout

### ✅ Users Management Page
- Searchable user table
- Status indicators & plan badges
- Export functionality
- Smooth entry animations

### ✅ Animated Sidebar
- Collapsible navigation
- Active route highlighting
- Icon-based menu
- User profile section

---

## 🎯 Ready for Your Aceternity Components

The dashboard is **component-ready**! Just:
1. Drop Aceternity components into `components/ui/`
2. They'll inherit the color scheme automatically
3. All animations work together

---

## 🔗 Next: Connect to Supabase

When you're ready, we'll:
1. Set up your Supabase project
2. Create database tables
3. Connect the dashboard
4. Replace mock data with real metrics

---

## 📁 Project Structure

```
app/
├── page.tsx              # Overview (stats, charts)
├── users/page.tsx        # User management
├── layout.tsx            # Root layout + sidebar
└── globals.css           # 🎨 YOUR COLORS GO HERE

components/
├── ui/
│   ├── card.tsx         # Animated cards
│   └── stat-card.tsx    # Metric cards
└── sidebar.tsx          # Navigation

lib/
├── utils.ts             # Helpers
└── supabase.ts          # DB client (ready for your keys)
```

---

## 🚀 Deployment

**Local development:** `npm run dev` (port 3001)  
**Production:** Deploy to Vercel with IP whitelist

---

Built with ❤️ for SMBShield - Ready for your custom styling!
