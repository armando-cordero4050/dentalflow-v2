'use client'

interface StageDistributionProps {
  data: Array<{ stage: string; count: number }>
}

export function StageDistribution({ data }: StageDistributionProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Distribución por Etapa</h3>
        <p className="text-gray-500 text-center py-8">No hay órdenes en proceso</p>
      </div>
    )
  }

  const maxCount = Math.max(...data.map(d => d.count))

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Distribución por Etapa</h3>
      <div className="space-y-3">
        {data.map(({ stage, count }) => {
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
          return (
            <div key={stage} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{stage}</span>
                <span className="text-gray-600">{count} órdenes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
