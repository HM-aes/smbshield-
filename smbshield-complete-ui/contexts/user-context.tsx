"use client"

import * as React from "react"

type UserTier = "guest" | "pro"

interface User {
  name: string
  email: string
  tier: UserTier
}

interface UserContextType {
  user: User
  updateUserTier: (tier: UserTier) => void
  isPro: boolean
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

const TIER_STORAGE_KEY = "smbshield_tier"

const defaultUser: User = {
  name: "Guest",
  email: "",
  tier: "guest",
}

const proUser: User = {
  name: "Pro Member",
  email: "member@smbshield.eu",
  tier: "pro",
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>(defaultUser)

  // Load tier from localStorage on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const storedTier = window.localStorage.getItem(TIER_STORAGE_KEY) as UserTier | null
    if (storedTier === "pro") {
      setUser(proUser)
    }
  }, [])

  const updateUserTier = React.useCallback((tier: UserTier) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(TIER_STORAGE_KEY, tier)
    }
    setUser(tier === "pro" ? proUser : defaultUser)
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      updateUserTier,
      isPro: user.tier === "pro",
    }),
    [user, updateUserTier]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
