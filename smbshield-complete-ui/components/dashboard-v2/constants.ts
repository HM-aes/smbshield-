/**
 * Dashboard V2 Constants
 * Centralized configuration and static data
 */

import {
  LayoutDashboard,
  Library,
  BookOpen,
  Newspaper,
  Bell,
  Settings,
} from "lucide-react"
import type { NavItem, QuickSuggestion, ThreatCard } from "./types"

// ============================================
// Navigation
// ============================================

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard-v2",
    icon: LayoutDashboard,
  },
  {
    title: "My Library",
    href: "/dashboard-v2/library",
    icon: Library,
    badge: 3,
  },
  {
    title: "OWASP Learning",
    href: "/dashboard-v2/owasp",
    icon: BookOpen,
  },
  {
    title: "News Feed",
    href: "/dashboard-v2/news",
    icon: Newspaper,
  },
  {
    title: "Alerts",
    href: "/dashboard-v2/alerts",
    icon: Bell,
    badge: 2,
  },
  {
    title: "Settings",
    href: "/dashboard-v2/settings",
    icon: Settings,
  },
]

// ============================================
// Chat Quick Suggestions
// ============================================

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    label: "Explain A01",
    prompt: "Explain OWASP A01: Broken Access Control and how to prevent it",
  },
  {
    label: "RAG poisoning?",
    prompt: "What is RAG poisoning and how can I protect my LLM applications?",
  },
  {
    label: "GDPR basics",
    prompt: "What are the GDPR basics I need to know for my SMB?",
  },
  {
    label: "LLM Top 10",
    prompt: "Give me an overview of the OWASP LLM Top 10 risks",
  },
]

// ============================================
// Mock Data - Threats
// ============================================

export const MOCK_THREATS: ThreatCard[] = [
  {
    id: "1",
    title: "Critical RCE Vulnerability in Popular CMS",
    source: "SecurityWeek",
    timeAgo: "2 hours ago",
    category: "CVE",
    severity: "critical",
    cveScore: 9.8,
    summary: "A critical remote code execution vulnerability has been discovered affecting millions of websites.",
  },
  {
    id: "2",
    title: "New Prompt Injection Technique Bypasses AI Guardrails",
    source: "Dark Reading",
    timeAgo: "5 hours ago",
    category: "LLM Security",
    severity: "high",
    summary: "Researchers demonstrate a novel prompt injection attack that can bypass most current AI safety measures.",
  },
  {
    id: "3",
    title: "GDPR Enforcement: Record Fine for Data Breach",
    source: "The Register",
    timeAgo: "1 day ago",
    category: "Compliance",
    severity: "medium",
    summary: "EU regulators issue largest GDPR fine to date following major data breach affecting EU citizens.",
  },
  {
    id: "4",
    title: "Ransomware Group Targets European SMBs",
    source: "BleepingComputer",
    timeAgo: "1 day ago",
    category: "Ransomware",
    severity: "high",
    summary: "A new ransomware campaign specifically targets small and medium businesses in Europe.",
  },
  {
    id: "5",
    title: "AI-Powered Phishing Attacks on the Rise",
    source: "Krebs on Security",
    timeAgo: "2 days ago",
    category: "AI Threats",
    severity: "high",
    summary: "Attackers leverage AI to create highly convincing phishing campaigns that evade traditional detection.",
  },
]

// ============================================
// Mock Data - AI Insights
// ============================================

export const MOCK_AI_INSIGHTS = [
  {
    id: "1",
    priority: 1,
    title: "Complete A03:Injection module",
    description: "You're 70% through this critical module. Finishing it will significantly improve your security posture.",
    actionLabel: "Continue Learning",
    actionHref: "/dashboard-v2/owasp/a03",
  },
  {
    id: "2",
    priority: 2,
    title: "Review ransomware briefing",
    description: "Based on your industry, the latest ransomware trends briefing is highly relevant to your business.",
    actionLabel: "Read Briefing",
    actionHref: "/dashboard-v2/library",
  },
  {
    id: "3",
    priority: 3,
    title: "New CVE affects your tech stack",
    description: "CVE-2025-XXXX impacts technologies commonly used in your sector. Review mitigation steps.",
    actionLabel: "View Details",
    actionHref: "/dashboard-v2/alerts",
  },
]

// ============================================
// Severity Colors
// ============================================

export const SEVERITY_COLORS = {
  critical: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/30",
  },
  high: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    border: "border-orange-500/30",
  },
  medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/30",
  },
  low: {
    bg: "bg-green-500/10",
    text: "text-green-500",
    border: "border-green-500/30",
  },
} as const

// ============================================
// Layout Constants
// ============================================

export const LAYOUT = {
  SIDEBAR_WIDTH: 256, // 64 * 4 = 256px (w-64)
  SIDEBAR_COLLAPSED_WIDTH: 64,
  CHAT_PANEL_WIDTH: 400,
  HEADER_HEIGHT: 64,
} as const
