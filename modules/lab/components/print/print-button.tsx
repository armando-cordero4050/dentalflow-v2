'use client'

import { Printer } from 'lucide-react'

interface PrintButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function PrintButton({ onClick, disabled = false, className = '' }: PrintButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center gap-2 px-4 py-2 
        bg-blue-600 text-white rounded-lg 
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors
        ${className}
      `}
    >
      <Printer className="w-4 h-4" />
      <span>Imprimir</span>
    </button>
  )
}
