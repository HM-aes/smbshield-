"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import {
  Shield,
  Menu,
  X,
  ExternalLink,
  Newspaper,
  Wrench,
  GraduationCap,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { cn } from "@/lib/utils"

type NavChild = {
  name: string
  href: string
  external?: boolean
  icon: LucideIcon
}

type NavItem = {
  name: string
  href: string
  badge?: string
  external?: boolean
  children?: NavChild[]
}

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog", badge: "Free Weekly" },
  {
    name: "Resources",
    href: "#",
    children: [
      { name: "OWASP Top 10", href: "/resources/owasp-top-10", icon: Shield },
      {
        name: "Hacker News",
        href: "https://thehackernews.com",
        external: true,
        icon: ExternalLink,
      },
      { name: "Cybersecurity News", href: "/resources/news", icon: Newspaper },
      { name: "Security Tools", href: "/resources/tools", icon: Wrench },
      { name: "Learning Center", href: "/resources/learn", icon: GraduationCap },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/#pricing" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isDesktop, setIsDesktop] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [mobileDropdowns, setMobileDropdowns] = React.useState<Record<string, boolean>>({})
  const hoverTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Handle scroll for navbar background
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Track viewport size for hover vs click interactions
  React.useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)")
    const update = () => setIsDesktop(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  React.useEffect(() => {
    if (!isDesktop) {
      setOpenDropdown(null)
    }
    return () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
      }
    }
  }, [isDesktop])

  // Check if we're on homepage for transparent navbar
  const isHomepage = pathname === "/"
  const isDashboard = pathname.startsWith("/dashboard")

  const matchesPath = React.useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/"
      }
      if (href.startsWith("/#")) {
        return pathname === "/"
      }
      if (href.startsWith("http")) {
        return false
      }
      return pathname === href || pathname.startsWith(`${href}/`)
    },
    [pathname]
  )

  const isNavItemActive = React.useCallback(
    (item: NavItem) => {
      if (item.children) {
        return item.children.some((child) => matchesPath(child.href))
      }
      return matchesPath(item.href)
    },
    [matchesPath]
  )

  const handleHoverOpen = (name: string) => {
    if (!isDesktop) return
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
    }
    setOpenDropdown(name)
  }

  const handleHoverClose = () => {
    if (!isDesktop) return
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current)
    }
    hoverTimeout.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const handleCloseMobileMenu = () => {
    setIsOpen(false)
    setMobileDropdowns({})
  }

  const toggleMobileSection = (name: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  // Don't show navbar on dashboard pages (has its own layout)
  if (isDashboard) {
    return null
  }

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-200 border-b",
        isHomepage && !isScrolled
          ? "border-transparent bg-transparent"
          : "bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex h-12 w-12 items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/images/logos/smbshield-logo.png"
                alt="SMBShield Logo"
                width={48}
                height={48}
                className="drop-shadow-[0_0_12px_rgba(217,119,6,0.5)]"
                priority
              />
            </div>
            <span
              className="text-2xl font-bold text-foreground transition-all duration-300"
              style={{ 
                transition: "transform 0.3s ease, text-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.textShadow = "0 8px 16px rgba(217, 119, 6, 0.4), 0 4px 8px rgba(217, 119, 6, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              SMBShield
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center space-x-2 md:flex">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.name}
                  onMouseEnter={() => handleHoverOpen(item.name)}
                  onMouseLeave={handleHoverClose}
                >
                  <DropdownMenu
                    open={isDesktop ? openDropdown === item.name : undefined}
                    onOpenChange={(open) =>
                      setOpenDropdown(open ? item.name : null)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "group inline-flex items-center px-4 py-2 text-sm tracking-wide transition-all duration-200",
                          isNavItemActive(item)
                            ? "text-amber-400"
                            : "text-muted-foreground hover:text-amber-400"
                        )}
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className="ml-2 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                            {item.badge}
                          </span>
                        )}
                        <ChevronDown
                          className={cn(
                            "ml-2 h-4 w-4 transition-transform",
                            openDropdown === item.name && "rotate-180"
                          )}
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      sideOffset={12}
                      className="w-72 rounded-xl border bg-popover p-2 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95"
                      onMouseEnter={() => handleHoverOpen(item.name)}
                      onMouseLeave={handleHoverClose}
                    >
                      {item.children.map((child) => (
                        <DropdownMenuItem
                          key={child.name}
                          className="group flex items-start rounded-lg py-3 text-sm font-medium focus:bg-accent focus:text-accent-foreground"
                          asChild
                        >
                          {child.external ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noreferrer"
                              className="flex w-full items-center space-x-3"
                            >
                              <child.icon className="h-4 w-4 text-primary" />
                              <div className="flex flex-1 flex-col text-left">
                                <span>{child.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {child.name === "Hacker News"
                                    ? "Latest security headlines"
                                    : "External resource"}
                                </span>
                              </div>
                              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/70" />
                            </a>
                          ) : (
                            <Link href={child.href} className="flex w-full items-center space-x-3">
                              <child.icon className="h-4 w-4 text-primary" />
                              <span className="flex-1 text-left">{child.name}</span>
                            </Link>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm tracking-wide transition-all duration-200",
                    isNavItemActive(item)
                      ? "text-amber-400"
                      : "text-muted-foreground hover:text-amber-400"
                  )}
                >
                  <span className="flex items-center">
                    {item.name}
                    {item.badge && (
                      <span className="ml-2 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              )
            )}
          </div>

          {/* Right side - CTA */}
          <div className="hidden items-center space-x-3 md:flex">
            <Link href="/dashboard">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="flex items-center bg-primary px-5 py-2 text-primary-foreground font-semibold"
              >
                Dashboard
              </HoverBorderGradient>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="border-t py-4 animate-in slide-in-from-top-2">
              <div className="space-y-2">
                {navItems.map((item) =>
                  item.children ? (
                    <div
                      key={item.name}
                      className="rounded-xl border border-border/60 bg-muted/30 p-1"
                    >
                      <button
                        type="button"
                        onClick={() => toggleMobileSection(item.name)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                          mobileDropdowns[item.name]
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                        )}
                        aria-expanded={mobileDropdowns[item.name] ?? false}
                      >
                        <span className="flex items-center">
                          {item.name}
                          {item.badge && (
                            <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            mobileDropdowns[item.name] && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "space-y-1 overflow-hidden transition-all duration-300",
                          mobileDropdowns[item.name]
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        )}
                      >
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.name}
                              href={child.href}
                              target="_blank"
                              rel="noreferrer"
                              onClick={handleCloseMobileMenu}
                              className="flex items-center justify-between rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <span className="flex items-center space-x-2">
                                <child.icon className="h-4 w-4 text-primary" />
                                <span>{child.name}</span>
                              </span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <Link
                              key={child.name}
                              href={child.href}
                              onClick={handleCloseMobileMenu}
                              className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <child.icon className="h-4 w-4 text-primary" />
                              <span>{child.name}</span>
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleCloseMobileMenu}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isNavItemActive(item)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                )}
                <Button
                  asChild
                  size="lg"
                  className="w-full font-semibold"
                  onClick={handleCloseMobileMenu}
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
