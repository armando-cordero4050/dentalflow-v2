'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Beaker, 
  CreditCard, 
  Settings,
  ShieldCheck,
  Building2,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Pacientes', href: '/dashboard/patients' },
  { icon: FileText, label: 'Odontograma', href: '/dashboard/dental-chart' },
  { icon: Beaker, label: 'Órdenes Lab', href: '/dashboard/lab-orders' },
  { icon: CreditCard, label: 'Facturación', href: '/dashboard/billing' },
  { icon: Building2, label: 'Clínicas', href: '/dashboard/clinics', adminOnly: true },
  { icon: Users, label: 'Usuarios', href: '/dashboard/users', adminOnly: true },
  { icon: ShieldCheck, label: 'Roles', href: '/dashboard/roles', adminOnly: true },
  { icon: ShieldCheck, label: 'Permisos', href: '/dashboard/permissions', adminOnly: true },
  { icon: Settings, label: 'Configuración', href: '/dashboard/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 block">DentalFlow</span>
              <span className="text-xs text-gray-500">v2.0</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
