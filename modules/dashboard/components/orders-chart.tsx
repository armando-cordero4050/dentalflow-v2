'use client'

interface OrdersChartProps {
  data: Array<{ date: string; count: number }>
}

export function OrdersChart({ data }: OrdersChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Tendencia de Órdenes (7 días)</h3>
        <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
      </div>
    )
  }

  const maxCount = Math.max(...data.map(d => d.count), 1)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Tendencia de Órdenes (7 días)</h3>
      <div className="flex items-end justify-between gap-2 h-48">
        {data.map(({ date, count }) => {
          const height = (count / maxCount) * 100
          return (
            <div key={date} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center h-40">
                <div
                  className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-all cursor-pointer relative group"
                  style={{ height: `${height}%` }}
                  title={`${count} órdenes`}
                >
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {count}
                  </span>
                </div>
              </div>
              <span className="text-xs text-gray-600 text-center">
                {new Date(date).toLocaleDateString('es-GT', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
