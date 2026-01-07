interface KPICardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function KPICard({ title, value, icon, trend, className = '' }: KPICardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${
          trend.isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <span>{trend.isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
        </div>
      )}
    </div>
  )
}
