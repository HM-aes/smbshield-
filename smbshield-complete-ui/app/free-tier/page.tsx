"use client"

import { useLayoutEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"

export default function FreeTierPage() {
  const { updateUserTier } = useUser()
  const router = useRouter()

  // Automatically activate free tier and redirect
  // This creates a seamless "Click -> View" experience
  useLayoutEffect(() => {
     updateUserTier("free")
     router.replace("/dashboard")
  }, [updateUserTier, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-xl font-semibold animate-pulse">Initializing Free Tier...</h2>
        <p className="text-muted-foreground">Redirecting you to your dashboard.</p>
    </div>
  )
}


