'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { DevUser } from '@/types'

const devUsers: DevUser[] = [
  { email: 'admin@dentalflow.com', password: 'admin123', label: 'Super Admin' },
  { email: 'dr.julio@clinica1.com', password: 'doctor123', label: 'Dr. Julio (C1)' },
  { email: 'dr.celeste@clinica1.com', password: 'doctor123', label: 'Dr. Celeste (C1)' },
  { email: 'lab.admin@dentalflow.com', password: 'lab123', label: 'Admin Lab' },
  { email: 'tecnico@dentalflow.com', password: 'tecnico123', label: 'Técnico Lab' },
]

interface DevQuickLoginProps {
  type: 'clinic' | 'lab'
}

export function DevQuickLogin({ type }: DevQuickLoginProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleQuickLogin = async (user: DevUser) => {
    setLoading(user.email)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      })

      if (error) throw error

      router.push('/dashboard')
    } catch (err) {
      console.error('Quick login error:', err)
    } finally {
      setLoading(null)
    }
  }

  // Filter users based on type
  const filteredUsers = type === 'clinic' 
    ? devUsers.filter(u => u.label.includes('Dr.') || u.label.includes('Admin'))
    : devUsers.filter(u => u.label.includes('Lab') || u.label.includes('Técnico') || u.label.includes('Admin'))

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <p className="text-sm font-medium text-gray-500 mb-3 text-center">
        DEV QUICK LOGIN ({type === 'clinic' ? 'CLINIC' : 'LAB'})
      </p>
      <div className="grid grid-cols-2 gap-2">
        {filteredUsers.map((user) => (
          <button
            key={user.email}
            onClick={() => handleQuickLogin(user)}
            disabled={loading !== null}
            className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === user.email ? '...' : user.label}
          </button>
        ))}
      </div>
    </div>
  )
}
