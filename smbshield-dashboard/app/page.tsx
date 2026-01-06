'use client'

import { StatCard } from '@/components/ui/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, DollarSign, Mail, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

// Mock data - you'll replace this with real Supabase data
const mockStats = {
  totalUsers: 1247,
  activeSubscriptions: 89,
  emailSubscribers: 3421,
  mrr: 4450,
}

const mockGrowthData = [
  { month: 'Jan', users: 400, revenue: 2400 },
  { month: 'Feb', users: 520, revenue: 2800 },
  { month: 'Mar', users: 680, revenue: 3200 },
  { month: 'Apr', users: 850, revenue: 3600 },
  { month: 'May', users: 1020, revenue: 4100 },
  { month: 'Jun', users: 1247, revenue: 4450 },
]

const recentActivity = [
  { action: 'New user signup', user: 'john@example.com', time: '2 minutes ago' },
  { action: 'Subscription activated', user: 'sarah@company.com', time: '15 minutes ago' },
  { action: 'Email campaign sent', count: '3,421 recipients', time: '1 hour ago' },
  { action: 'New chat session', user: 'mike@business.com', time: '2 hours ago' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-[var(--color-text-secondary)]">
          Welcome back! Here's what's happening with SMBShield today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={mockStats.totalUsers.toLocaleString()}
          change="+12.5% from last month"
          changeType="positive"
          icon={Users}
          iconColor="var(--color-primary)"
        />
        <StatCard
          title="Active Subscriptions"
          value={mockStats.activeSubscriptions}
          change="+8.2% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="var(--color-success)"
        />
        <StatCard
          title="Email Subscribers"
          value={mockStats.emailSubscribers.toLocaleString()}
          change="+23.1% from last month"
          changeType="positive"
          icon={Mail}
          iconColor="var(--color-info)"
        />
        <StatCard
          title="Monthly Revenue"
          value={`€${mockStats.mrr.toLocaleString()}`}
          change="+15.3% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="var(--color-success)"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <Card glass>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user signups over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="var(--color-primary)" 
                  fillOpacity={1} 
                  fill="url(#colorUsers)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card glass>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly recurring revenue growth</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockGrowthData}>
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-success)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card glass>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest events across your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-background)] hover:bg-[var(--color-card-hover)] transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {activity.user || activity.count}
                  </p>
                </div>
                <span className="text-xs text-[var(--color-text-muted)]">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
