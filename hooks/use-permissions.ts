'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUser } from './use-user'

interface Permission {
  code: string
  name: string
  category: string
  can_create: boolean
  can_read: boolean
  can_update: boolean
  can_delete: boolean
}

export function usePermissions() {
  const { user } = useUser()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user?.role_id) {
        setLoading(false)
        return
      }

      const supabase = createClient()

      const { data } = await supabase
        .from('role_permissions')
        .select(`
          can_create,
          can_read,
          can_update,
          can_delete,
          permissions!inner(code, name, category)
        `)
        .eq('role_id', user.role_id)

      if (data) {
        const mapped = data.map((item: any) => ({
          code: item.permissions.code,
          name: item.permissions.name,
          category: item.permissions.category,
          can_create: item.can_create,
          can_read: item.can_read,
          can_update: item.can_update,
          can_delete: item.can_delete,
        }))
        setPermissions(mapped)
      }

      setLoading(false)
    }

    fetchPermissions()
  }, [user])

  const hasPermission = (
    permissionCode: string,
    action: 'create' | 'read' | 'update' | 'delete'
  ): boolean => {
    const permission = permissions.find((p) => p.code === permissionCode)
    if (!permission) return false

    const actionField = `can_${action}` as keyof Permission
    return permission[actionField] as boolean
  }

  return { permissions, loading, hasPermission }
}
