import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MetricsDashboard } from '@/modules/dashboard/components/metrics-dashboard'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user data
  const { data: userData } = await supabase
    .from('users')
    .select('clinic_id, role_id, roles(name)')
    .eq('id', user.id)
    .single()

  const roleName = (userData?.roles as any)?.name
  const clinicId = userData?.clinic_id

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Vista general de las operaciones de {roleName?.includes('lab') ? 'laboratorio' : 'clínica'}
        </p>
      </div>

      <MetricsDashboard clinicId={clinicId} />
    </div>
  )
}
