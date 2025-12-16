"use client"

import { useUser } from "@/contexts/user-context"
import { WelcomeView } from "@/components/dashboard/welcome-view"
import { ProView } from "@/components/dashboard/pro-view"

export default function DashboardPage() {
  const { isPro } = useUser()

  return isPro ? <ProView /> : <WelcomeView />
}
