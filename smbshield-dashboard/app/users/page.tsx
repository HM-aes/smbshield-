'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Filter, Download, UserPlus } from 'lucide-react'
import { useState } from 'react'

// Mock user data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', plan: 'Pro', joined: '2024-01-15' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@company.com', status: 'active', plan: 'Enterprise', joined: '2024-02-20' },
  { id: 3, name: 'Mike Johnson', email: 'mike@business.com', status: 'active', plan: 'Free', joined: '2024-03-10' },
  { id: 4, name: 'Emma Wilson', email: 'emma@startup.io', status: 'inactive', plan: 'Pro', joined: '2024-01-05' },
  { id: 5, name: 'David Brown', email: 'david@tech.com', status: 'active', plan: 'Pro', joined: '2024-03-25' },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Users</h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Manage all registered users and their subscriptions
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] rounded-lg font-medium transition-colors">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <Card glass>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={18} />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-card)] transition-colors">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-card)] transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card glass>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Complete list of registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">Plan</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-secondary)]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[var(--color-border)] hover:bg-[var(--color-background)] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center font-bold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[var(--color-text-secondary)]">{user.email}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/20 text-[var(--color-primary)]">
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]'
                          : 'bg-[var(--color-text-secondary)]/20 text-[var(--color-text-secondary)]'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-[var(--color-text-secondary)]">{user.joined}</td>
                    <td className="py-4 px-4">
                      <button className="text-sm text-[var(--color-primary)] hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
