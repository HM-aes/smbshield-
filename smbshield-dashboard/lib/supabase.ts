import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Admin client with full access (service role)
// ⚠️ NEVER expose this key to the frontend
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Helper functions for common queries
export const dashboardQueries = {
  async getTotalUsers() {
    const { count, error } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    return count || 0
  },

  async getRecentSignups(days: number = 30) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  async getActiveSubscriptions() {
    const { count, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
    
    if (error) throw error
    return count || 0
  },

  async getEmailSubscribers() {
    const { count, error } = await supabaseAdmin
      .from('email_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('subscribed', true)
    
    if (error) throw error
    return count || 0
  }
}
