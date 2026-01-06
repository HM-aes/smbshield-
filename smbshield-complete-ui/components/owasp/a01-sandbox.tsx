"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, ShieldOff, User, Lock, Server } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const users = {
  "1": { id: 1, name: "Alex", role: "Admin", email: "alex@example.com" },
  "2": { id: 2, name: "Ben", role: "User", email: "ben@example.com" },
}

const ProtectedUserView = ({ userId, currentUserId, isPatched }) => {
  if (isPatched && userId !== currentUserId) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center p-8 bg-red-500/10 rounded-lg">
        <Lock className="h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-xl font-bold text-red-500">Access Denied</h3>
        <p className="mt-2 text-sm text-red-500/80">Your user policy prevents you from viewing this profile.</p>
      </motion.div>
    )
  }

  const user = users[userId]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center space-x-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <User className="h-8 w-8 text-muted-foreground"/>
        </div>
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
      </div>
       <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-bold">User ID:</span> {user.id}
        </div>
        <div>
          <span className="font-bold">Role:</span> {user.role}
        </div>
      </div>
    </motion.div>
  )
}

export function A01Sandbox() {
  const [isPatched, setIsPatched] = useState(false)
  const [currentId, setCurrentId] = useState("1")
  const [viewedId, setViewedId] = useState("1")

  const handleViewProfile = () => {
    setViewedId(currentId)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle>Interactive Sandbox</CardTitle>
            <div className="flex items-center gap-2">
                 <Badge variant={isPatched ? "default" : "destructive"}>
                    {isPatched ? <Shield className="h-3 w-3 mr-1"/> : <ShieldOff className="h-3 w-3 mr-1"/>}
                    {isPatched ? "Patched" : "Vulnerable"}
                </Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
            {/* Control Panel */}
            <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                   You are logged in as <span className="font-bold text-primary">Alex (User ID: 1)</span>. Try to view another user's profile by changing the ID in the URL.
                </p>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                    <Server className="h-4 w-4 text-muted-foreground"/>
                    <span className="text-sm text-muted-foreground">GET /api/users/profile?id=</span>
                    <Input
                        className="w-16 h-8"
                        value={currentId}
                        onChange={(e) => setCurrentId(e.target.value)}
                    />
                </div>
                 <Button onClick={handleViewProfile}>View Profile</Button>
                 <Button onClick={() => setIsPatched(!isPatched)} variant="outline">
                    {isPatched ? "Disable" : "Enable"} Patch
                </Button>
            </div>

            {/* Result View */}
            <div className="p-4 rounded-lg border bg-card">
                <AnimatePresence mode="wait">
                    <ProtectedUserView key={viewedId + (isPatched ? '-p' : '')} userId={viewedId} currentUserId="1" isPatched={isPatched}/>
                </AnimatePresence>
            </div>

        </div>
      </CardContent>
    </Card>
  )
}
