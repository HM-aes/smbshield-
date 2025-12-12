"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  Home,
  BookOpen,
  Bot,
  FileText,
  Bell,
  Shield,
  Settings,
  User,
  LogOut,
  Sparkles,
  Lock,
  ArrowLeft,
  HelpCircle,
} from "lucide-react"
import { toast } from "sonner"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  EnhancedTooltip,
  HelpTooltip,
  OnboardingTooltip,
} from "@/components/ui/enhanced-tooltip"
import { cn } from "@/lib/utils"
import {
  trackNavigation,
  trackUpgradeClick,
  trackLockedFeatureAttempt,
  trackSidebarToggle,
  trackMobileMenu,
  trackHelpClick,
  trackOnboardingTooltipView,
  trackOnboardingTooltipDismiss,
  trackWhatsNewClick,
} from "@/lib/analytics"
import { useOnboarding } from "@/hooks/use-onboarding"

type UserTier = "guest" | "free" | "pro"

type BadgeColor = "default" | "destructive" | "warning" | "success" | "muted" | "premium"

type NavBadge =
  | { type: "count"; value: number; color?: BadgeColor; dot?: boolean }
  | { type: "quota"; value: string; color?: BadgeColor }
  | { type: "label"; value: string; color?: BadgeColor }

type BadgeConfig = Partial<Record<UserTier, NavBadge>>

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: BadgeConfig
  locked?: boolean
  tier?: "free" | "pro"
  description?: string
  keyboardShortcut?: string
  isNew?: boolean
  comingSoon?: boolean
  showHelp?: boolean
  helpContent?: string
  onboardingTooltip?: {
    id: string
    title: string
    content: string
  }
}

const coreNavigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Your security learning hub with personalized insights and progress tracking",
    keyboardShortcut: "⌘D",
    onboardingTooltip: {
      id: "dashboard-intro",
      title: "Welcome to your Dashboard!",
      content: "This is your command center for all security learning activities. Track your progress and get personalized recommendations.",
    },
  },
  {
    title: "OWASP Top 10",
    href: "/dashboard/owasp",
    icon: BookOpen,
    badge: {
      guest: { type: "label", value: "Limited", color: "muted" },
    },
    tier: "free",
    description: "Learn about the most critical web application security risks",
    keyboardShortcut: "⌘O",
    showHelp: true,
    helpContent: "The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.",
  },
  {
    title: "AI Security Assistant",
    href: "/dashboard/chat",
    icon: Bot,
    badge: {
      guest: { type: "quota", value: "3/day", color: "default" },
      free: { type: "quota", value: "7/10", color: "warning" },
    },
    tier: "pro",
    description: "Get instant answers to your security questions from our AI-powered assistant",
    keyboardShortcut: "⌘K",
    isNew: true,
    showHelp: true,
    helpContent: "Ask questions about security best practices, get code reviews, and receive personalized learning recommendations. Pro users get unlimited access.",
  },
]

const resourceNavigation: NavItem[] = [
  {
    title: "Security Briefings",
    href: "/dashboard/briefings",
    icon: FileText,
    badge: {
      free: { type: "label", value: "Current Only", color: "default" },
      pro: { type: "label", value: "NEW", color: "success" },
    },
    tier: "free",
    description: "Stay updated with the latest security news, vulnerabilities, and best practices",
    isNew: true,
    showHelp: true,
    helpContent: "Get weekly briefings on emerging threats, security patches, and industry news. Pro members get access to the full archive.",
  },
  {
    title: "Threat Alerts",
    href: "/dashboard/notifications",
    icon: Bell,
    badge: {
      pro: { type: "count", value: 2, color: "destructive", dot: true },
    },
    tier: "pro",
    description: "Real-time notifications about critical security threats affecting your industry",
    showHelp: true,
    helpContent: "Receive instant alerts about zero-day vulnerabilities, active exploits, and security incidents relevant to your business.",
  },
  {
    title: "Compliance Tracker",
    href: "/dashboard/saved",
    icon: Shield,
    badge: {
      pro: { type: "label", value: "PRO", color: "premium" },
    },
    tier: "pro",
    description: "Track your compliance progress for GDPR, ISO 27001, and other frameworks",
    showHelp: true,
    helpContent: "Monitor your organization's compliance status, get actionable recommendations, and generate audit-ready reports.",
  },
]

const accountNavigation: NavItem[] = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
    badge: {
      free: { type: "label", value: "Complete", color: "success" },
    },
    tier: "free",
    description: "Manage your account details, preferences, and learning goals",
    keyboardShortcut: "⌘P",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    badge: {
      pro: { type: "label", value: "Secure", color: "success" },
    },
    tier: "free",
    description: "Configure notifications, security preferences, and integrations",
    keyboardShortcut: "⌘,",
    showHelp: true,
    helpContent: "Customize your experience, manage email preferences, and configure two-factor authentication for enhanced security.",
  },
]

const navigationSections = [
  { label: "Core Features", items: coreNavigation },
  { label: "Resources", items: resourceNavigation },
  { label: "Account", items: accountNavigation },
]

type Viewport = "mobile" | "tablet" | "desktop"

const DESKTOP_COLLAPSE_STORAGE_KEY = "smbshield:sidebar:desktop-collapsed"
const TABLET_PIN_STORAGE_KEY = "smbshield:sidebar:tablet-pinned"
const MOBILE_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024
const DESKTOP_WIDTH = "17.5rem"
const ICON_WIDTH = "4.5rem"

const getViewportForWidth = (width: number): Viewport => {
  if (width < MOBILE_BREAKPOINT) return "mobile"
  if (width < DESKTOP_BREAKPOINT) return "tablet"
  return "desktop"
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  onSignOut?: () => void
  userTier?: UserTier
  userName?: string
  userEmail?: string
  userAvatar?: string
}

export const AppSidebar = React.forwardRef<
  React.ElementRef<typeof Sidebar>,
  AppSidebarProps
>(({ className, onSignOut, userTier = "guest", userName, userEmail, userAvatar, style, ...props }, ref) => {
  const pathname = usePathname()
  const { open, setOpen, setOpenMobile } = useSidebar()
  const [viewport, setViewport] = React.useState<Viewport>(() => {
    if (typeof window === "undefined") return "desktop"
    return getViewportForWidth(window.innerWidth)
  })
  const [isDesktopCollapsed, setIsDesktopCollapsed] = React.useState(false)
  const [isTabletPinned, setIsTabletPinned] = React.useState(false)
  const [isTabletHovering, setIsTabletHovering] = React.useState(false)
  const programmaticChangeRef = React.useRef(false)
  
  // Note: Onboarding features are disabled to prevent hydration mismatches
  // To enable them, you would need to make the sidebar client-only
  // For now, we keep the sidebar SSR-friendly for better performance
  
  // Placeholder functions for onboarding (not used to avoid hydration issues)
  const shouldShowTooltip = () => false
  const markTooltipViewed = () => {}
  const dismissTooltip = () => {}
  const shouldShowWhatsNew = () => false
  const markFeatureViewed = () => {}

  const isDesktop = viewport === "desktop"
  const isTablet = viewport === "tablet"
  const isMobile = viewport === "mobile"

  React.useEffect(() => {
    const handleResize = () => {
      setViewport(getViewportForWidth(window.innerWidth))
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const storedCollapsed = window.localStorage.getItem(
      DESKTOP_COLLAPSE_STORAGE_KEY
    )
    if (storedCollapsed !== null) {
      setIsDesktopCollapsed(storedCollapsed === "true")
    }

    const storedPinned = window.localStorage.getItem(TABLET_PIN_STORAGE_KEY)
    if (storedPinned !== null) {
      setIsTabletPinned(storedPinned === "true")
    }
  }, [])

  React.useEffect(() => {
    let targetOpen = true
    if (isDesktop) {
      targetOpen = !isDesktopCollapsed
    } else if (isTablet) {
      targetOpen = isTabletPinned || isTabletHovering
    } else {
      targetOpen = false
    }

    if (open === targetOpen) return
    programmaticChangeRef.current = true
    setOpen(targetOpen)
  }, [
    isDesktop,
    isTablet,
    isDesktopCollapsed,
    isTabletPinned,
    isTabletHovering,
    open,
    setOpen,
  ])

  React.useEffect(() => {
    if (programmaticChangeRef.current) {
      programmaticChangeRef.current = false
      return
    }

    if (isDesktop) {
      const collapsed = !open
      setIsDesktopCollapsed(collapsed)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          DESKTOP_COLLAPSE_STORAGE_KEY,
          String(collapsed)
        )
      }
      // Track sidebar toggle
      trackSidebarToggle(collapsed ? "collapse" : "expand", "desktop")
    }

    if (isTablet) {
      const pinned = open
      setIsTabletPinned(pinned)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(TABLET_PIN_STORAGE_KEY, String(pinned))
      }
      // Track sidebar toggle
      trackSidebarToggle(pinned ? "expand" : "collapse", "tablet")
    }
  }, [isDesktop, isTablet, open])

  React.useEffect(() => {
    if (!isTablet) {
      setIsTabletHovering(false)
    }
  }, [isTablet])

  const handleNavClick = React.useCallback(
    (item?: NavItem) => {
      if (isMobile) {
        setOpenMobile(false)
        trackMobileMenu("close")
      }
      
      // Track navigation
      if (item) {
        const isLocked = isItemLockedForUser(item)
        trackNavigation(item.href, item.title, userTier, isLocked)
        
        // Note: "What's New" tracking disabled to prevent hydration issues
        // Can be re-enabled with client-only rendering
      }
    },
    [isMobile, setOpenMobile, userTier]
  )

  const handleSidebarMouseEnter = React.useCallback(() => {
    if (isTablet && !isTabletPinned) {
      setIsTabletHovering(true)
    }
  }, [isTablet, isTabletPinned])

  const handleSidebarMouseLeave = React.useCallback(() => {
    if (isTablet && !isTabletPinned) {
      setIsTabletHovering(false)
    }
  }, [isTablet, isTabletPinned])

  const toggleLabel = React.useMemo(() => {
    if (isDesktop) {
      return open ? "Collapse sidebar" : "Expand sidebar"
    }
    if (isTablet) {
      return isTabletPinned ? "Unpin sidebar" : "Pin sidebar"
    }
    return "Close sidebar"
  }, [isDesktop, isTablet, open, isTabletPinned])

  const isItemLockedForUser = React.useCallback(
    (item: NavItem) => {
      if (item.locked) return true
      if (!item.tier) return false
      if (item.tier === "free") {
        return userTier === "guest"
      }

      return userTier !== "pro"
    },
    [userTier]
  )

  const notifyLockedFeature = React.useCallback(
    (item: NavItem) => {
      const requiresPro = item.tier === "pro"
      const requiredTier = requiresPro ? "Pro" : "Free"
      
      // Track locked feature attempt
      trackLockedFeatureAttempt(item.title, requiredTier, userTier)
      
      toast.info(
        requiresPro ? "Pro feature locked" : "Create a free account",
        {
          description: requiresPro
            ? "Upgrade to Pro to unlock this capability."
            : "Sign in or create a free account to access this feature.",
        }
      )
    },
    [userTier]
  )

  const badgeColorClasses: Record<BadgeColor, string> = {
    default:
      "border-primary/40 bg-primary/10 text-primary dark:border-primary/60 dark:text-primary-foreground/90",
    destructive:
      "border-destructive bg-destructive/15 text-destructive dark:border-destructive/80",
    warning:
      "border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-500 dark:bg-amber-500/20 dark:text-amber-50",
    success:
      "border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-50",
    muted:
      "border-border/70 bg-muted/40 text-muted-foreground dark:bg-muted/30 dark:text-muted-foreground",
    premium:
      "border-amber-400 bg-gradient-to-r from-amber-200/80 via-amber-100 to-amber-50 text-amber-900 shadow-sm dark:border-amber-400/80 dark:from-amber-500/30 dark:via-amber-400/20 dark:to-amber-300/10 dark:text-amber-50",
  }

  const renderBadge = (badge: NavBadge) => {
    const colorClass = badgeColorClasses[badge.color ?? "default"]
    const value =
      badge.type === "count"
        ? badge.value
        : typeof badge.value === "string"
          ? badge.value
          : badge.value.toString()
    const isQuota = badge.type === "quota"
    const isLabel = badge.type === "label"

    return (
      <Badge
        variant="outline"
        className={cn(
          "min-w-[36px] justify-center px-2 py-0.5 text-[10px] font-semibold tracking-wide",
          isLabel ? "uppercase" : "",
          isQuota ? "font-mono text-[11px] leading-none" : "",
          badge.type === "count" ? "text-xs" : "",
          colorClass
        )}
      >
        {value}
      </Badge>
    )
  }

  const renderNavItems = (items: NavItem[]) =>
    items.map((item) => {
      const Icon = item.icon
      const badgeConfig = item.badge?.[userTier]
      const isLocked = isItemLockedForUser(item)
      const isActive =
        pathname === item.href || pathname.startsWith(`${item.href}/`)
      
      // Always render as false on server to avoid hydration mismatch
      // These will be updated after mount via useEffect if needed
      const showWhatsNew = false
      const showOnboarding = false

      const linkClasses = cn(
        "group/link relative flex h-11 min-h-[44px] w-full items-center gap-2 rounded-lg border-l-4 border-transparent px-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "hover:bg-muted/50 hover:text-foreground",
        "group-data-[collapsible=icon]:!h-11 group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!px-0 group-data-[collapsible=icon]:!py-0",
        isActive &&
          "border-primary bg-accent/80 font-semibold text-accent-foreground shadow-sm hover:text-accent-foreground",
        isLocked && "cursor-not-allowed text-muted-foreground hover:text-muted-foreground"
      )

      // Enhanced tooltip content for collapsed sidebar
      const tooltipContent = (
        <EnhancedTooltip
          title={item.title}
          description={item.description}
          keyboardShortcut={item.keyboardShortcut}
          isLocked={isLocked}
          requiredTier={item.tier === "pro" ? "Pro" : "Free"}
          isNew={showWhatsNew}
          isPro={item.tier === "pro"}
          comingSoon={item.comingSoon}
        />
      )

      const menuButton = (
        <SidebarMenuButton
          asChild
          isActive={isActive}
          tooltip={tooltipContent}
          className="group/menu-button h-auto w-full p-0 transition-none"
        >
          <Link
            href={item.href}
            prefetch
            aria-disabled={isLocked}
            onClick={(event) => {
              if (isLocked) {
                event.preventDefault()
                notifyLockedFeature(item)
                return
              }

              handleNavClick(item)
            }}
            onKeyDown={(event) => {
              if (!isLocked) return
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                notifyLockedFeature(item)
              }
            }}
            className={linkClasses}
          >
            <span className="relative flex items-center justify-center" suppressHydrationWarning>
              <Icon
                className={cn(
                  "size-4 transition-transform duration-200 group-hover/menu-button:scale-110 group-focus-visible/menu-button:scale-110",
                  isActive ? "text-accent-foreground" : "text-current",
                  isLocked && !isActive ? "text-muted-foreground" : null
                )}
              />
              {badgeConfig?.type === "count" && badgeConfig.dot ? (
                <span className="absolute -right-1 top-0 inline-flex size-2 rounded-full bg-destructive ring-2 ring-background" />
              ) : null}
              {showWhatsNew && (
                <span className="absolute -right-1 -top-1 inline-flex size-2 animate-pulse rounded-full bg-emerald-500 ring-2 ring-background" suppressHydrationWarning />
              )}
            </span>
            <span className="flex-1 flex items-center gap-2">
              {item.title}
              {item.showHelp && item.helpContent && (
                <HelpTooltip
                  content={item.helpContent}
                  title={item.title}
                  className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                  iconClassName="size-3"
                  side="top"
                />
              )}
            </span>
            {(isLocked || badgeConfig || showWhatsNew) && (
              <span className="ml-auto flex items-center gap-1" suppressHydrationWarning>
                {isLocked ? (
                  <Lock className="size-3.5 text-muted-foreground" />
                ) : null}
                {showWhatsNew && (
                  <Badge
                    variant="outline"
                    className="border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-50 text-[10px] px-1.5 py-0"
                    suppressHydrationWarning
                  >
                    NEW
                  </Badge>
                )}
                {badgeConfig && renderBadge(badgeConfig)}
              </span>
            )}
          </Link>
        </SidebarMenuButton>
      )

      // Wrap with onboarding tooltip if needed
      if (showOnboarding && item.onboardingTooltip) {
        return (
          <SidebarMenuItem key={item.href}>
            <OnboardingTooltip
              show={true}
              title={item.onboardingTooltip.title}
              content={item.onboardingTooltip.content}
              onDismiss={() => {
                dismissTooltip(item.onboardingTooltip!.id)
                trackOnboardingTooltipDismiss(item.onboardingTooltip!.id)
              }}
              side="right"
            >
              {menuButton}
            </OnboardingTooltip>
          </SidebarMenuItem>
        )
      }

      return <SidebarMenuItem key={item.href}>{menuButton}</SidebarMenuItem>
    })

  const renderGuestActions = () => {
    if (userTier !== "guest") return null

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className="h-11 min-h-[44px] justify-center rounded-lg font-semibold"
              >
                <Link
                  href="/login"
                  onClick={() => {
                    trackNavigation("/login", "Sign in", userTier, false)
                    handleNavClick()
                  }}
                  prefetch
                >
                  Sign in
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs">
                Sign in to access your personalized learning dashboard and track
                your progress
              </p>
            </TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const renderUpgradeSection = () => {
    if (userTier === "pro") {
      return (
        <div className="px-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-emerald-100 shadow-inner cursor-default">
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-200/80">
                    Status
                  </span>
                  <span className="text-sm font-semibold text-emerald-50">
                    Pro Member
                  </span>
                </div>
                <Shield className="size-5 text-emerald-200" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs">
                You have access to all premium features including unlimited AI
                assistance, threat alerts, and compliance tracking.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    }

    return (
      <div className="px-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/pricing"
              prefetch
              onClick={(e) => {
                trackUpgradeClick(userTier, "sidebar_cta")
                handleNavClick()
              }}
              className="group relative block min-h-[64px] rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(76,29,149,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="pointer-events-none absolute inset-0 rounded-lg bg-white/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-60" />
              <div className="relative flex items-start gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-white/15 text-white">
                  <Sparkles className="size-5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-base font-semibold">Upgrade to Pro</span>
                  <span className="text-sm text-white/80">Unlock all features</span>
                </div>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="max-w-xs">
            <p className="font-semibold text-sm mb-1">Pro Features Include:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Unlimited AI Security Assistant</li>
              <li>• Real-time threat alerts</li>
              <li>• Full briefings archive</li>
              <li>• Compliance tracking tools</li>
              <li>• Priority support</li>
            </ul>
          </TooltipContent>
        </Tooltip>
      </div>
    )
  }

  const renderUserDropdown = () => {
    if (userTier === "guest") return null

    const displayName = userName || (userTier === "pro" ? "Pro Member" : "Free Member")
    const displayEmail = userEmail || "demo@smbshield.eu"
    const initials = displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U"

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="h-auto min-h-[44px] w-full justify-start rounded-lg p-2 data-[state=open]:bg-accent"
                aria-label="User menu"
              >
                <Avatar className="size-8">
                  {userAvatar && <AvatarImage src={userAvatar} alt={displayName} />}
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start gap-0.5 overflow-hidden leading-none">
                  <span className="truncate text-sm font-medium">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">{displayEmail}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56"
              align="end"
              side={isMobile ? "top" : "right"}
              sideOffset={8}
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{displayEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" onClick={handleNavClick} className="cursor-pointer">
                  <User className="mr-2 size-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" onClick={handleNavClick} className="cursor-pointer">
                  <Settings className="mr-2 size-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              {onSignOut && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={() => {
                      onSignOut()
                      if (isMobile) {
                        setOpenMobile(false)
                      }
                    }}
                  >
                    <LogOut className="mr-2 size-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const renderSignOut = () => {
    if (userTier === "guest" || !onSignOut) return null

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="h-11 min-h-[44px] justify-start rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive focus-visible:text-destructive"
            onClick={() => {
              onSignOut()
              if (isMobile) {
                setOpenMobile(false)
              }
            }}
          >
            <LogOut className="size-4" />
            <span>Sign out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <Sidebar
      ref={ref}
      className={cn(
        "border-r bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60",
        "transition-[width,transform] duration-300 ease-in-out md:z-20",
        className
      )}
      style={
        {
          "--sidebar-width": DESKTOP_WIDTH,
          "--sidebar-width-icon": ICON_WIDTH,
          ...(style ?? {}),
        } as React.CSSProperties
      }
      onMouseEnter={handleSidebarMouseEnter}
      onMouseLeave={handleSidebarMouseLeave}
      {...props}
    >
      <div className="flex h-full flex-col">
        <div className="space-y-3 border-b border-border/50 px-4 py-5">
          <SidebarMenu>
            <SidebarMenuItem>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="justify-start text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-primary"
                  >
                    <Link
                      href="/"
                      prefetch
                      aria-label="Back to SMBShield homepage"
                      onClick={() => {
                        trackNavigation("/", "Exit to main site", userTier, false)
                        handleNavClick()
                      }}
                    >
                      <ArrowLeft className="size-4" />
                      <span>Exit to main site</span>
                    </Link>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-xs">Return to SMBShield homepage</p>
                </TooltipContent>
              </Tooltip>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              prefetch
              onClick={handleNavClick}
              className="flex flex-1 items-center gap-3"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  SMBShield Academy
                </span>
                <span className="text-xl font-bold">Cyber Command</span>
              </div>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger
                  aria-label={toggleLabel}
                  onClick={(e) => {
                    // Track the toggle action
                    trackSidebarToggle(open ? "collapse" : "expand", viewport)
                  }}
                  className="hidden size-11 rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:bg-muted md:inline-flex"
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="text-xs">{toggleLabel}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarTrigger
                  aria-label="Close sidebar"
                  onClick={(e) => {
                    // Track mobile menu close
                    trackMobileMenu("close")
                  }}
                  className="inline-flex size-11 rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:bg-muted md:hidden"
                />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Close menu</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
            <Sparkles className="size-4" />
            AI-powered learning paths unlocked
          </div>
        </div>

        <SidebarContent className="flex-1 space-y-4 px-3 py-4">
          {navigationSections.map((section, index) => {
            const isLast = index === navigationSections.length - 1
            const isResources = section.label === "Resources"

            return (
              <React.Fragment key={section.label}>
                <SidebarGroup>
                  <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.label}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>{renderNavItems(section.items)}</SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                {isResources ? (
                  <>
                    {renderUpgradeSection()}
                    {!isLast && <SidebarSeparator />}
                  </>
                ) : !isLast ? (
                  <SidebarSeparator />
                ) : null}
              </React.Fragment>
            )
          })}
        </SidebarContent>

        <div className="space-y-4 border-t border-border/50 px-3 py-4">
          {renderGuestActions()}
          {renderUserDropdown()}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-between gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 cursor-default">
                <span className="text-xs font-medium text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="text-xs">
                Toggle between light and dark mode for comfortable viewing
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Sidebar>
  )
})

AppSidebar.displayName = "AppSidebar"

