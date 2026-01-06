'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  DollarSign, 
  Mail,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
  { name: 'Emails', href: '/emails', icon: Mail },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen border-r border-[var(--color-border)] bg-[var(--color-card)] z-50"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-[var(--color-border)]">
        <motion.div 
          className="flex items-center gap-3"
          animate={{ opacity: collapsed ? 0 : 1 }}
        >
          <Shield className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg">SMBShield</h1>
              <p className="text-xs text-[var(--color-text-secondary)]">Admin Dashboard</p>
            </div>
          )}
        </motion.div>
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-[var(--color-background)] transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'hover:bg-[var(--color-background)]',
                  isActive && 'bg-[var(--color-background)] border border-[var(--color-border)]'
                )}
              >
                <item.icon
                  size={20}
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)'
                  }}
                />
                {!collapsed && (
                  <span className={cn(
                    'font-medium',
                    isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
                  )}>
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* User info at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--color-border)]"
        animate={{ opacity: collapsed ? 0 : 1 }}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-background)]">
            <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-[var(--color-text-secondary)] truncate">admin@smbshield.com</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.aside>
  )
}
