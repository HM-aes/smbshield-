/**
 * Dashboard V2 Type Definitions
 * Centralized types for the redesigned dashboard
 */

import { LucideIcon } from "lucide-react"

// ============================================
// User & Auth Types
// ============================================

export type UserTier = "guest" | "free" | "pro"

export interface DashboardUser {
  id: string
  name: string
  email: string
  tier: UserTier
  avatar?: string
  businessType?: string
  createdAt: Date
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: number
  isNew?: boolean
  isPro?: boolean
}

// ============================================
// Chat Types
// ============================================

export type MessageRole = "user" | "assistant"

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface ChatState {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
}

export interface QuickSuggestion {
  label: string
  prompt: string
}

// ============================================
// Dashboard Card Types
// ============================================

export type StatVariant = "default" | "success" | "warning" | "danger"

export interface StatCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  subtitle?: string
  variant?: StatVariant
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  href?: string
}

// ============================================
// Threat & News Types
// ============================================

export type ThreatCategory =
  | "LLM Security"
  | "Compliance"
  | "AI Threats"
  | "CVE"
  | "Ransomware"
  | "Data Breach"

export type ThreatSeverity = "critical" | "high" | "medium" | "low"

export interface ThreatCard {
  id: string
  title: string
  source: string
  timeAgo: string
  category: ThreatCategory
  severity?: ThreatSeverity
  cveScore?: number
  url?: string
  summary?: string
}

// ============================================
// AI Insights Types
// ============================================

export interface AIInsight {
  id: string
  priority: number
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export interface AIInsightsData {
  insights: AIInsight[]
  generatedAt: Date
  isLoading: boolean
}

// ============================================
// Library Types
// ============================================

export type LibraryItemType =
  | "download"
  | "bookmark"
  | "shared"
  | "chat_export"

export type DownloadableContent =
  | "owasp_module"
  | "security_briefing"
  | "threat_report"
  | "chat_transcript"
  | "certificate"
  | "cheatsheet"

export interface LibraryItem {
  id: string
  type: LibraryItemType
  contentType: DownloadableContent
  title: string
  description?: string
  savedAt: Date
  downloadedAt?: Date
  fileSize?: string
  filePath?: string
  sharedBy?: string
  sharedWith?: string[]
  tags?: string[]
}

// ============================================
// OWASP Progress Types
// ============================================

export interface OWASPModule {
  id: string
  code: string // e.g., "A01", "A02"
  title: string
  progress: number // 0-100
  completed: boolean
  lastAccessedAt?: Date
}

export interface OWASPProgress {
  modules: OWASPModule[]
  totalCompleted: number
  totalModules: number
  overallProgress: number
}
