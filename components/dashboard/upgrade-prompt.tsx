"use client"

import { motion } from "framer-motion"
import { Crown, Lock, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useUser } from "@/contexts/user-context"

interface UpgradePromptProps {
  feature: string
  description: string
  benefits?: string[]
}

export function UpgradePrompt({ feature, description, benefits }: UpgradePromptProps) {
  const { updateUserTier } = useUser()

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="max-w-md p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
            <Lock className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-2xl font-bold mb-2">{feature}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>

          {benefits && benefits.length > 0 && (
            <ul className="text-left space-y-2 mb-6">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}

          <Button
            size="lg"
            className="w-full gap-2"
            onClick={() => updateUserTier("pro")}
          >
            <Crown className="h-4 w-4" />
            Upgrade to Pro
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Unlock all features and take your security to the next level
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
