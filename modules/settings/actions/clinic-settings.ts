'use server'

import { createClient } from '@/lib/supabase/server'
import { ClinicSettings } from '../types'

export async function getClinicSettings(clinicId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('clinic_settings')
    .select('*')
    .eq('clinic_id', clinicId)
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
    throw new Error(`Error fetching clinic settings: ${error.message}`)
  }

  return data
}

export async function upsertClinicSettings(settings: ClinicSettings) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('clinic_settings')
    .upsert(settings, {
      onConflict: 'clinic_id'
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Error saving clinic settings: ${error.message}`)
  }

  return data
}

export async function uploadLogo(file: File, clinicId: string) {
  const supabase = await createClient()
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${clinicId}-${Date.now()}.${fileExt}`
  const filePath = `clinic-logos/${fileName}`

  const { data, error } = await supabase.storage
    .from('public')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (error) {
    throw new Error(`Error uploading logo: ${error.message}`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('public')
    .getPublicUrl(filePath)

  return publicUrl
}
