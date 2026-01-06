'use client'

import { Card, CardContent } from './card'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'var(--color-primary)'
}: StatCardProps) {
  const changeColors = {
    positive: 'text-[var(--color-success)]',
    negative: 'text-[var(--color-danger)]',
    neutral: 'text-[var(--color-text-secondary)]'
  }

  return (
    <Card hover glass>
      <CardContent className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            {title}
          </p>
          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
            {value}
          </p>
          {change && (
            <p className={`text-xs font-medium ${changeColors[changeType]}`}>
              {change}
            </p>
          )}
        </div>
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `color-mix(in srgb, ${iconColor} 15%, transparent)` }}
        >
          <Icon size={24} style={{ color: iconColor }} />
        </div>
      </CardContent>
    </Card>
  )
}
