"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Settings, User, Bell, Shield, Moon, Sun, Monitor } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useUser } from "@/contexts/user-context"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { user, isPro, updateUserTier } = useUser()
  const { theme, setTheme } = useTheme()
  const [emailNotifications, setEmailNotifications] = React.useState(true)
  const [threatAlerts, setThreatAlerts] = React.useState(true)

  return (
    <div className="p-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Account Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5" />
              <h2 className="font-semibold">Account</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {isPro ? user.email : "Guest User"}
                  </p>
                </div>
                <Badge variant={isPro ? "default" : "secondary"}>
                  {isPro ? "Pro Member" : "Guest"}
                </Badge>
              </div>
              {!isPro && (
                <Button onClick={() => updateUserTier("pro")} className="w-full">
                  Upgrade to Pro
                </Button>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Moon className="h-5 w-5" />
              <h2 className="font-semibold">Appearance</h2>
            </div>
            <div className="flex gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
                className="gap-2"
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
                className="gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
                className="gap-2"
              >
                <Monitor className="h-4 w-4" />
                System
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5" />
              <h2 className="font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new content
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Threat Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about security threats
                  </p>
                </div>
                <Switch
                  checked={threatAlerts}
                  onCheckedChange={setThreatAlerts}
                  disabled={!isPro}
                />
              </div>
              {!isPro && (
                <p className="text-xs text-muted-foreground">
                  Threat alerts are available for Pro members only
                </p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Demo Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 border-dashed">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5" />
              <h2 className="font-semibold">Demo Mode</h2>
              <Badge variant="outline">Testing</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Switch between tiers to test different access levels
            </p>
            <div className="flex gap-2">
              <Button
                variant={!isPro ? "default" : "outline"}
                onClick={() => updateUserTier("guest")}
              >
                Guest Tier
              </Button>
              <Button
                variant={isPro ? "default" : "outline"}
                onClick={() => updateUserTier("pro")}
              >
                Pro Tier
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
