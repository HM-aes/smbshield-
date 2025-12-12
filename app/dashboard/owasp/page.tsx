"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useEffect, useMemo, useState } from "react"
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Search,
  Shield,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-2xl duration-200 sm:rounded-2xl",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
      <DialogClose className="absolute right-4 top-4 rounded-full bg-muted/60 p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse gap-3 sm:flex-row sm:justify-between sm:space-x-2", className)}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-2xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

type ProgressProps = {
  value: number
  className?: string
  indicatorClassName?: string
}

const Progress = ({ value, className, indicatorClassName }: ProgressProps) => {
  const safeValue = Math.min(Math.max(value, 0), 100)
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn(
          "h-full rounded-full bg-primary transition-all duration-500 ease-out",
          indicatorClassName
        )}
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}

type RiskLevel = "critical" | "high" | "medium"

type OWASPItem = {
  id: string
  number: string
  title: string
  risk: RiskLevel
  shortDesc: string
  fullDesc: string
  smbImpact: string
  example: string
  prevention: string[]
}

const owaspTop10: OWASPItem[] = [
  {
    id: "a01",
    number: "A01:2021",
    title: "Broken Access Control",
    risk: "critical",
    shortDesc: "Users can access data or functions they shouldn't have permission to.",
    fullDesc:
      "Access control enforces policy such that users cannot act outside of their intended permissions. Failures typically lead to unauthorized information disclosure, modification, or destruction of data.",
    smbImpact:
      "For SMBs, this could mean employees accessing sensitive customer data, financial records, or admin functions they shouldn't see. This is the #1 security risk.",
    example:
      "A regular employee changes the URL from /profile/123 to /profile/124 and can now see another user's personal information and edit it.",
    prevention: [
      "Implement proper role-based access control (RBAC)",
      "Deny access by default",
      "Verify permissions on every request",
      "Log access control failures",
      "Use secure session management",
    ],
  },
  {
    id: "a02",
    number: "A02:2021",
    title: "Cryptographic Failures",
    risk: "high",
    shortDesc: "Sensitive data exposed due to weak or missing encryption.",
    fullDesc:
      "Previously known as Sensitive Data Exposure. The focus is on failures related to cryptography which often leads to sensitive data exposure or system compromise.",
    smbImpact:
      "Customer data, passwords, credit cards, and personal information could be stolen if not properly encrypted. GDPR fines can be massive for SMBs.",
    example:
      "A database backup containing customer passwords is stored without encryption. An attacker gains access and steals 10,000 customer credentials.",
    prevention: [
      "Encrypt all sensitive data at rest and in transit",
      "Use strong, up-to-date encryption algorithms",
      "Never store passwords in plain text",
      "Use HTTPS everywhere",
      "Implement proper key management",
    ],
  },
  {
    id: "a03",
    number: "A03:2021",
    title: "Injection",
    risk: "high",
    shortDesc: "Malicious code inserted into queries or commands.",
    fullDesc:
      "Injection flaws, such as SQL, NoSQL, OS, and LDAP injection occur when untrusted data is sent to an interpreter as part of a command or query.",
    smbImpact:
      "Attackers can steal your entire database, delete data, or take control of your server. This has caused massive data breaches.",
    example:
      "A contact form doesn't validate input. Attacker enters: '; DROP TABLE users;-- and deletes your entire user database.",
    prevention: [
      "Use parameterized queries (prepared statements)",
      "Validate and sanitize all user input",
      "Use ORM frameworks properly",
      "Implement least privilege for database accounts",
      "Use WAF (Web Application Firewall)",
    ],
  },
  {
    id: "a04",
    number: "A04:2021",
    title: "Insecure Design",
    risk: "high",
    shortDesc: "Security flaws in the design and architecture of the application.",
    fullDesc:
      "Insecure design is a broad category representing different weaknesses in the design phase. It focuses on risks related to design and architectural flaws.",
    smbImpact:
      "Building features without considering security from the start means expensive redesigns later and potential vulnerabilities that are hard to fix.",
    example:
      "An e-commerce site allows unlimited password reset attempts without rate limiting, enabling brute force attacks.",
    prevention: [
      "Use secure design patterns",
      "Threat modeling in design phase",
      "Security requirements in user stories",
      "Design with 'secure by default' principle",
      "Regular security architecture reviews",
    ],
  },
  {
    id: "a05",
    number: "A05:2021",
    title: "Security Misconfiguration",
    risk: "high",
    shortDesc: "Incorrect security settings leaving systems vulnerable.",
    fullDesc:
      "Security misconfiguration includes unnecessary features enabled, default accounts still active, unpatched systems, or overly detailed error messages revealing system info.",
    smbImpact:
      "Simple misconfigurations can expose your entire system. Many breaches happen because of default passwords or unnecessary services running.",
    example:
      "A cloud database is left with default admin credentials 'admin/admin' and public access enabled. Attackers find it in minutes.",
    prevention: [
      "Remove or disable unused features",
      "Change all default passwords",
      "Keep all systems patched and updated",
      "Implement security headers",
      "Regular security configuration audits",
    ],
  },
  {
    id: "a06",
    number: "A06:2021",
    title: "Vulnerable and Outdated Components",
    risk: "medium",
    shortDesc: "Using software libraries or frameworks with known vulnerabilities.",
    fullDesc:
      "Components run with the same privileges as the application itself, so flaws in any component can result in serious impact. Such flaws can be accidental or intentional.",
    smbImpact:
      "Many SMB websites use WordPress, plugins, or JavaScript libraries with known vulnerabilities. Attackers scan for these constantly.",
    example:
      "A WordPress plugin hasn't been updated in 2 years and has a known vulnerability allowing file upload. Attacker uploads malicious code and takes over the site.",
    prevention: [
      "Inventory all components and versions",
      "Subscribe to security bulletins",
      "Update components regularly",
      "Remove unused dependencies",
      "Use automated vulnerability scanning",
    ],
  },
  {
    id: "a07",
    number: "A07:2021",
    title: "Identification and Authentication Failures",
    risk: "high",
    shortDesc: "Weak authentication allowing unauthorized access.",
    fullDesc:
      "Previously known as Broken Authentication. Confirmation of user identity, authentication, and session management is critical to protect against authentication-related attacks.",
    smbImpact:
      "Weak passwords, lack of 2FA, or poor session management means attackers can easily impersonate users, including admins.",
    example:
      "An admin account has password '123456' and no two-factor authentication. Attacker guesses it and gains full control.",
    prevention: [
      "Implement multi-factor authentication (MFA)",
      "Enforce strong password policies",
      "Secure session management",
      "Limit failed login attempts",
      "Use secure password recovery",
    ],
  },
  {
    id: "a08",
    number: "A08:2021",
    title: "Software and Data Integrity Failures",
    risk: "medium",
    shortDesc: "Code and infrastructure that doesn't protect against integrity violations.",
    fullDesc:
      "This relates to code and infrastructure that does not protect against integrity violations, such as insecure CI/CD pipelines or auto-update functionality without integrity verification.",
    smbImpact:
      "If your deployment pipeline or update mechanism is compromised, attackers can inject malicious code into your application.",
    example:
      "A company uses unsigned plugins that auto-update. Attacker compromises the update server and pushes malware to all customers.",
    prevention: [
      "Use digital signatures for software",
      "Verify integrity of downloaded components",
      "Secure CI/CD pipeline",
      "Review code changes",
      "Implement separation of duties",
    ],
  },
  {
    id: "a09",
    number: "A09:2021",
    title: "Security Logging and Monitoring Failures",
    risk: "medium",
    shortDesc: "Insufficient logging makes it impossible to detect or investigate breaches.",
    fullDesc:
      "Without logging and monitoring, breaches cannot be detected. Insufficient logging and monitoring coupled with missing or ineffective integration allows attackers to persist undetected.",
    smbImpact:
      "You won't know you've been hacked until it's too late. Average time to detect a breach is 200+ days. Logs could prove compliance.",
    example:
      "An attacker tries 10,000 passwords on the admin account. System doesn't log failed attempts. Breach discovered 6 months later through customer complaints.",
    prevention: [
      "Log all authentication events",
      "Monitor for suspicious activity",
      "Set up alerts for critical events",
      "Centralize log collection",
      "Regular log review",
    ],
  },
  {
    id: "a10",
    number: "A10:2021",
    title: "Server-Side Request Forgery (SSRF)",
    risk: "medium",
    shortDesc: "Application fetches remote resources without validating the URL.",
    fullDesc:
      "SSRF flaws occur when a web application is fetching a remote resource without validating the user-supplied URL. It allows an attacker to coerce the application to send requests to unexpected destinations.",
    smbImpact:
      "Attackers can use your server to scan internal networks, access cloud metadata services, or attack other systems.",
    example:
      "A 'fetch website preview' feature doesn't validate URLs. Attacker enters internal address http://169.254.169.254/latest/meta-data and steals cloud credentials.",
    prevention: [
      "Validate and sanitize all user-supplied URLs",
      "Use allowlists for remote resources",
      "Disable unused URL schemas",
      "Implement network segmentation",
      "Use defense in depth approach",
    ],
  },
]

const PROGRESS_STORAGE_KEY = "smbshield-owasp-progress"

const FILTERS = [
  { value: "all", label: "All topics" },
  { value: "pending", label: "To learn" },
  { value: "completed", label: "Completed" },
] as const

type FilterValue = (typeof FILTERS)[number]["value"]

const RISK_META: Record<
  RiskLevel,
  { label: string; variant: "destructive" | "default" | "secondary"; accent: string; icon: typeof AlertCircle }
> = {
  critical: { label: "Critical", variant: "destructive", accent: "bg-red-500", icon: AlertOctagon },
  high: { label: "High", variant: "default", accent: "bg-amber-500", icon: AlertTriangle },
  medium: { label: "Medium", variant: "secondary", accent: "bg-sky-500", icon: AlertCircle },
}

export default function OWASPPage() {
  const [completed, setCompleted] = useState<string[]>([])
  const [filter, setFilter] = useState<FilterValue>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = window.localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setCompleted(parsed)
        }
      } catch (error) {
        console.error("Failed to parse stored OWASP progress", error)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(completed))
  }, [completed])

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      return updated
    })
  }

  const filteredLessons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return owaspTop10.filter((item) => {
      const matchesSearch =
        query.length === 0 ||
        [item.number, item.title, item.shortDesc, item.fullDesc].some((field) =>
          field.toLowerCase().includes(query)
        )

      const isCompleted = completed.includes(item.id)
      const matchesFilter =
        filter === "all" ? true : filter === "completed" ? isCompleted : !isCompleted

      return matchesSearch && matchesFilter
    })
  }, [completed, filter, searchQuery])

  const totalLessons = owaspTop10.length
  const completedCount = completed.length
  const progressPercent = Math.round((completedCount / totalLessons) * 100)

  const progressMessage = (() => {
    if (completedCount === 0) return "Kick off your training with A01 and mark lessons as you finish."
    if (completedCount === totalLessons)
      return "Amazing! Every OWASP Top 10 risk is in your playbook. Keep reviewing monthly."
    if (progressPercent >= 60) return "Strong momentum—wrap up the remaining lessons to complete the set."
    return "Great start! Keep the streak going with one more module today."
  })()

  const selectedItem = typeof selectedIndex === "number" ? owaspTop10[selectedIndex] : null
  const selectedRiskMeta = selectedItem ? RISK_META[selectedItem.risk] : null
  const SelectedRiskIcon = selectedRiskMeta?.icon
  const selectedCompleted = selectedItem ? completed.includes(selectedItem.id) : false

  const openDetail = (id: string) => {
    const index = owaspTop10.findIndex((item) => item.id === id)
    if (index !== -1) {
      setSelectedIndex(index)
    }
  }

  const navigateDetail = (direction: "previous" | "next") => {
    if (selectedIndex === null) return
    const increment = direction === "next" ? 1 : -1
    const nextIndex = (selectedIndex + increment + owaspTop10.length) % owaspTop10.length
    setSelectedIndex(nextIndex)
  }

  const closeDetail = () => setSelectedIndex(null)

  return (
    <div className="space-y-10">
      <section className="space-y-6 rounded-3xl border bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <Badge variant="secondary" className="w-fit bg-white/10 text-white">
              Agent 4 • Guided Learning
            </Badge>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">OWASP Top 10 for SMBs</h1>
              <p className="mt-2 max-w-2xl text-base text-white/80">
                Interactive lessons that translate each OWASP risk into plain language, practical SMB impact,
                and action-ready defenses. Track what you’ve mastered and pick up where you left off.
              </p>
            </div>
          </div>
          <Card className="border-white/20 bg-white/10 text-white backdrop-blur">
            <CardHeader className="space-y-2">
              <CardTitle className="text-sm uppercase tracking-wide text-white/80">Progress</CardTitle>
              <div className="text-4xl font-bold">
                {completedCount}/{totalLessons}
              </div>
              <p className="text-sm text-white/70">{progressPercent}% complete</p>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercent} className="bg-white/20" indicatorClassName="bg-white" />
            </CardContent>
          </Card>
        </div>
        <p className="text-sm text-white/80">{progressMessage}</p>
      </section>

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Learning Control Center</h2>
          <p className="text-sm text-muted-foreground">
            Search topics, filter by completion, and jump into any risk that matters now.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title, number, or keyword"
              className="pl-9"
            />
          </div>
          <div className="flex flex-1 flex-wrap gap-2 sm:flex-none">
            {FILTERS.map((item) => (
              <Button
                key={item.value}
                variant={filter === item.value ? "default" : "outline"}
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredLessons.map((item) => {
          const isCompleted = completed.includes(item.id)
          const RiskIcon = RISK_META[item.risk].icon
          return (
            <Card
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => openDetail(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter") openDetail(item.id)
              }}
              className={cn(
                "relative flex h-full flex-col border-muted/60 transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isCompleted && "border-primary/70 bg-primary/5"
              )}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">
                        {item.number.split(":")[0]}
                      </span>
                      <Badge variant={RISK_META[item.risk].variant} className="flex items-center gap-1">
                        <RiskIcon className="h-3.5 w-3.5" />
                        {RISK_META[item.risk].label} risk
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </div>
                  {isCompleted && (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                      <Check className="h-4 w-4" /> Learned
                    </span>
                  )}
                </div>
                <CardDescription>{item.shortDesc}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={cn("h-2 w-2 rounded-full", RISK_META[item.risk].accent)} />
                  <span>{item.smbImpact}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="flex-1 sm:flex-initial"
                    onClick={(event) => {
                      event.stopPropagation()
                      openDetail(item.id)
                    }}
                  >
                    Learn more
                  </Button>
                  <Button
                    size="sm"
                    variant={isCompleted ? "secondary" : "outline"}
                    className="flex-1 sm:flex-initial"
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleComplete(item.id)
                    }}
                  >
                    {isCompleted ? (
                      <>
                        <Check className="mr-1 h-4 w-4" />
                        Completed
                      </>
                    ) : (
                      "Mark complete"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredLessons.length === 0 && (
          <Card className="col-span-full border-dashed text-center">
            <CardHeader>
              <CardTitle>No topics match your filters</CardTitle>
              <CardDescription>Clear the search or switch filters to see more lessons.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </section>

      {selectedItem && selectedRiskMeta && (
        <Dialog open onOpenChange={(open) => !open && closeDetail()}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant={selectedRiskMeta.variant} className="flex items-center gap-1">
                  {SelectedRiskIcon && <SelectedRiskIcon className="h-3.5 w-3.5" />}
                  {selectedRiskMeta.label} risk
                </Badge>
                <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-xs">{selectedItem.number}</span>
                {selectedCompleted && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-600/10 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    <Check className="h-4 w-4" />
                    Completed
                  </span>
                )}
              </div>
              <DialogTitle>{selectedItem.title}</DialogTitle>
              <DialogDescription>{selectedItem.shortDesc}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground">Plain language</h3>
                <p className="mt-2 text-base text-foreground">{selectedItem.fullDesc}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground">Why SMBs should care</h3>
                <p className="mt-2 text-base text-foreground">{selectedItem.smbImpact}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground">Real example</h3>
                <Card className="mt-3 bg-muted/60">
                  <CardContent className="pt-6 text-sm text-muted-foreground">{selectedItem.example}</CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase text-muted-foreground">How to prevent it</h3>
                <ul className="mt-3 space-y-3">
                  {selectedItem.prevention.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-sm text-foreground">
                      <Shield className="mt-0.5 h-4 w-4 text-primary" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <Button
                  variant={selectedCompleted ? "secondary" : "default"}
                  className={cn(
                    "flex-1",
                    selectedCompleted && "bg-emerald-600 text-white hover:bg-emerald-600/90"
                  )}
                  onClick={() => toggleComplete(selectedItem.id)}
                >
                  {selectedCompleted ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Marked complete
                    </>
                  ) : (
                    "Mark as complete"
                  )}
                </Button>
                <Button variant="outline" className="flex-1" onClick={closeDetail}>
                  Close
                </Button>
              </div>
              <div className="flex w-full flex-col gap-2 sm:flex-row">
                <Button variant="ghost" className="flex-1" onClick={() => navigateDetail("previous")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button variant="ghost" className="flex-1" onClick={() => navigateDetail("next")}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

