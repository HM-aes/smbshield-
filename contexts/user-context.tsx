"use client"

import * as React from "react"

type UserTier = "guest" | "free" | "pro"

interface User {
  id?: string
  name: string
  email: string
  tier: UserTier
  avatar?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  updateUserTier: (tier: UserTier) => void
  signOut: () => void
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

const USER_STORAGE_KEY = "smbshield_user"
const USER_TIER_STORAGE_KEY = "smbshield_user_tier"

const defaultUser: User = {
  name: "Demo User",
  email: "demo@smbshield.eu",
  tier: "guest",
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = React.useState<User | null>(null)
  const [isInitialized, setIsInitialized] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY)
    const storedTier = window.localStorage.getItem(USER_TIER_STORAGE_KEY) as UserTier | null

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserState(parsedUser)
      } catch {
        setUserState({
          ...defaultUser,
          tier: storedTier || "guest",
        })
      }
    } else {
      setUserState({
        ...defaultUser,
        tier: storedTier || "guest",
      })
    }

    setIsInitialized(true)
  }, [])

  const setUser = React.useCallback((newUser: User | null) => {
    setUserState(newUser)
    if (typeof window !== "undefined") {
      if (newUser) {
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser))
        window.localStorage.setItem(USER_TIER_STORAGE_KEY, newUser.tier)
      } else {
        window.localStorage.removeItem(USER_STORAGE_KEY)
        window.localStorage.removeItem(USER_TIER_STORAGE_KEY)
      }
    }
  }, [])

  const updateUserTier = React.useCallback(
    (tier: UserTier) => {
      if (user) {
        const updatedUser = { ...user, tier }
        setUser(updatedUser)
      } else {
        setUser({ ...defaultUser, tier })
      }
    },
    [user, setUser]
  )

  const signOut = React.useCallback(() => {
    setUser(null)
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(USER_STORAGE_KEY)
      window.localStorage.removeItem(USER_TIER_STORAGE_KEY)
    }
  }, [setUser])

  const value = React.useMemo(
    () => ({
      user: user || defaultUser,
      setUser,
      updateUserTier,
      signOut,
    }),
    [user, setUser, updateUserTier, signOut]
  )

  // Always provide the context, even before initialization
  // This prevents "useUser must be used within a UserProvider" errors
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

