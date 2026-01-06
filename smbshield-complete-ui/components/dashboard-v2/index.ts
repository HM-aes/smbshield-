// Layout Components
export { DashboardLayout, Sidebar } from "./layout"

// Chat Components
export { ChatPanel, ChatMessage, ChatInput, QuickSuggestions } from "./chat"

// Card Components
export { StatCard, AIInsightsCard, ThreatCard, ThreatCarousel } from "./cards"

// Types
export type {
  DashboardUser,
  UserTier,
  NavItem,
  ChatMessage as ChatMessageType,
  ChatState,
  QuickSuggestion,
  StatCardProps,
  StatVariant,
  ThreatCard as ThreatCardType,
  ThreatCategory,
  ThreatSeverity,
  AIInsight,
  AIInsightsData,
  LibraryItem,
  LibraryItemType,
  DownloadableContent,
  OWASPModule,
  OWASPProgress,
} from "./types"

// Constants
export {
  NAV_ITEMS,
  QUICK_SUGGESTIONS,
  MOCK_THREATS,
  MOCK_AI_INSIGHTS,
  SEVERITY_COLORS,
  LAYOUT,
} from "./constants"
