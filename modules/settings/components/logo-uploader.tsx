'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

interface LogoUploaderProps {
  currentLogoUrl?: string
  onLogoChange: (url: string) => void
  disabled?: boolean
}

export function LogoUploader({ currentLogoUrl, onLogoChange, disabled }: LogoUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentLogoUrl)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)

    // NOTE: For production, integrate with uploadLogo action from clinic-settings.ts
    // to properly upload files to Supabase Storage. Current implementation uses
    // temporary blob URLs that won't persist across sessions.
    // 
    // Example implementation:
    // setUploading(true)
    // try {
    //   const url = await uploadLogo(file, clinicId)
    //   onLogoChange(url)
    // } catch (error) {
    //   console.error('Upload failed:', error)
    // } finally {
    //   setUploading(false)
    // }
    
    onLogoChange(URL.createObjectURL(file))
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Logo de la Clínica
      </label>
      
      <div className="flex items-center gap-4">
        {previewUrl && (
          <div className="w-32 h-32 border-2 border-gray-200 rounded-lg overflow-hidden bg-white flex items-center justify-center">
            <img 
              src={previewUrl} 
              alt="Logo preview" 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
        
        <div className="flex-1">
          <label className={`
            flex flex-col items-center justify-center
            px-4 py-8 border-2 border-dashed rounded-lg
            cursor-pointer hover:bg-gray-50 transition-colors
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}>
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {uploading ? 'Subiendo...' : 'Haz clic para subir logo'}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              PNG, JPG hasta 2MB
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled || uploading}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
