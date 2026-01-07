'use client'

import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  createdAt: string
  status: string
  patientName: string
  stage: string
}

interface RecentOrdersTableProps {
  orders: Order[]
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Órdenes Recientes</h3>
        <p className="text-gray-500 text-center py-8">No hay órdenes recientes</p>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const statusLabels: Record<string, string> = {
    draft: 'Borrador',
    pending: 'Pendiente',
    in_progress: 'En Proceso',
    completed: 'Completada',
    cancelled: 'Cancelada'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Órdenes Recientes</h3>
        <Link
          href="/dashboard/lab-orders"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Ver todas →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Orden #</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Paciente</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Etapa</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Estado</th>
              <th className="text-left py-3 px-2 font-medium text-gray-700">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <Link
                    href={`/dashboard/lab-orders/${order.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="py-3 px-2">{order.patientName}</td>
                <td className="py-3 px-2 text-gray-600">{order.stage}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[order.status] || statusColors.draft
                  }`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('es-GT')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
