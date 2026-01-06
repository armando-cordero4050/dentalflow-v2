import { createClient } from '@/lib/supabase/server'

export async function getUserViews(userId: string) {
  const supabase = await createClient()

  // Get user's role
  const { data: user } = await supabase
    .from('users')
    .select('role_id')
    .eq('id', userId)
    .single()

  if (!user?.role_id) return []

  // Get views for this role
  const { data: views } = await supabase
    .from('role_views')
    .select(`
      views!inner(
        id,
        code,
        name,
        path,
        icon,
        parent_id,
        order_index
      )
    `)
    .eq('role_id', user.role_id)
    .order('views.order_index')

  return views?.map(v => v.views) || []
}
