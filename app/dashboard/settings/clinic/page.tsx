import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ClinicForm } from '@/modules/settings/components/clinic-form'
import { getClinicSettings, upsertClinicSettings } from '@/modules/settings/actions/clinic-settings'
import { ClinicSettings } from '@/modules/settings/types'

export default async function ClinicSettingsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's clinic
  const { data: userData } = await supabase
    .from('users')
    .select('clinic_id')
    .eq('id', user.id)
    .single()

  const clinicId = userData?.clinic_id

  if (!clinicId) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Configuración de Clínica</h1>
        <p className="text-red-600">No se encontró una clínica asociada a tu usuario.</p>
      </div>
    )
  }

  // Fetch existing settings
  const existingSettings = await getClinicSettings(clinicId).catch(() => null)

  async function handleSave(data: ClinicSettings) {
    'use server'
    await upsertClinicSettings(data)
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Configuración de Clínica</h1>
        <p className="text-gray-600 mt-2">
          Administra la información de tu clínica que aparecerá en documentos y reportes.
        </p>
      </div>

      <ClinicForm
        initialData={existingSettings || undefined}
        clinicId={clinicId}
        onSave={handleSave}
      />
    </div>
  )
}
