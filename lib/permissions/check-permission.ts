import { createClient } from '@/lib/supabase/server'

export async function checkPermission(
  userId: string,
  permissionCode: string,
  action: 'create' | 'read' | 'update' | 'delete'
): Promise<boolean> {
  const supabase = await createClient()

  // Get user's role
  const { data: user } = await supabase
    .from('users')
    .select('role_id')
    .eq('id', userId)
    .single()

  if (!user?.role_id) return false

  // Check role permission
  const { data: rolePermission } = await supabase
    .from('role_permissions')
    .select(`
      can_create,
      can_read,
      can_update,
      can_delete,
      permissions!inner(code)
    `)
    .eq('role_id', user.role_id)
    .eq('permissions.code', permissionCode)
    .single()

  if (!rolePermission) return false

  const actionField = `can_${action}` as keyof typeof rolePermission
  return rolePermission[actionField] || false
}

export async function getUserPermissions(userId: string) {
  const supabase = await createClient()

  const { data: user } = await supabase
    .from('users')
    .select('role_id')
    .eq('id', userId)
    .single()

  if (!user?.role_id) return []

  const { data: permissions } = await supabase
    .from('role_permissions')
    .select(`
      can_create,
      can_read,
      can_update,
      can_delete,
      permissions!inner(code, name, category)
    `)
    .eq('role_id', user.role_id)

  return permissions || []
}
