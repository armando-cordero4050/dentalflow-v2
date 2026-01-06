import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user role from database
  const { data: userData } = await supabase
    .from('users')
    .select('role_id, roles(name)')
    .eq('id', user.id)
    .single()

  // Redirect based on role
  const roleName = (userData?.roles as any)?.name
  
  if (roleName === 'super_admin') {
    redirect('/dashboard/admin')
  } else if (roleName?.includes('lab_')) {
    redirect('/dashboard/lab')
  } else if (roleName?.includes('clinic_') || roleName === 'doctor') {
    redirect('/dashboard/medical')
  }

  // Default dashboard
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600">Bienvenido a DentalFlow 2.0</p>
    </div>
  )
}
