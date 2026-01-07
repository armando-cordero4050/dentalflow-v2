'use client'

import { formatOrderNumber, formatCurrency, formatDate } from '@/lib/print-utils'

interface ClinicSettings {
  name: string
  logo_url?: string
  address?: string
  phone?: string
  phone_secondary?: string
  email?: string
  tax_id?: string
  order_terms?: string
}

interface OrderItem {
  id: string
  tooth_number?: string
  surface?: string
  work_type: string
  material?: string
  color?: string
  unit_price: number
  quantity: number
  total_price: number
}

interface OrderPrintProps {
  orderId: string
  orderNumber: string
  createdAt: string
  deliveryDate?: string
  priority: 'normal' | 'urgent' | 'express'
  status: string
  patientName: string
  patientPhone?: string
  doctorName: string
  items: OrderItem[]
  subtotal: number
  discount?: number
  total: number
  notes?: string
  clinicSettings?: ClinicSettings
}

export function OrderPrint({
  orderId,
  orderNumber,
  createdAt,
  deliveryDate,
  priority,
  status,
  patientName,
  patientPhone,
  doctorName,
  items,
  subtotal,
  discount = 0,
  total,
  notes,
  clinicSettings
}: OrderPrintProps) {
  const priorityColors = {
    normal: 'bg-blue-100 text-blue-800',
    urgent: 'bg-yellow-100 text-yellow-800',
    express: 'bg-red-100 text-red-800'
  }

  const priorityLabels = {
    normal: 'Normal',
    urgent: 'Urgente',
    express: 'Express'
  }

  return (
    <div id="order-print-content" className="print-content bg-white p-8 max-w-4xl mx-auto">
      {/* Header with Logo */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-800">
        <div className="flex items-center gap-4">
          {clinicSettings?.logo_url && (
            <img
              src={clinicSettings.logo_url}
              alt="Logo"
              className="h-20 w-20 object-contain"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {clinicSettings?.name || 'DentalFlow'}
            </h1>
            {clinicSettings?.address && (
              <p className="text-sm text-gray-600">{clinicSettings.address}</p>
            )}
            <div className="flex gap-4 text-sm text-gray-600">
              {clinicSettings?.phone && <span>Tel: {clinicSettings.phone}</span>}
              {clinicSettings?.phone_secondary && (
                <span>Tel 2: {clinicSettings.phone_secondary}</span>
              )}
            </div>
            {clinicSettings?.email && (
              <p className="text-sm text-gray-600">{clinicSettings.email}</p>
            )}
            {clinicSettings?.tax_id && (
              <p className="text-sm text-gray-600">NIT: {clinicSettings.tax_id}</p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <h2 className="text-xl font-bold text-gray-900 mb-2">ORDEN DE LABORATORIO</h2>
          <p className="text-sm text-gray-600">
            <strong>No. Orden:</strong> {formatOrderNumber(orderNumber)}
          </p>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${priorityColors[priority]}`}>
            {priorityLabels[priority]}
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Información de la Orden</h3>
          <div className="text-sm space-y-1">
            <p><strong>Fecha Creación:</strong> {formatDate(createdAt)}</p>
            {deliveryDate && (
              <p><strong>Fecha Entrega:</strong> {formatDate(deliveryDate)}</p>
            )}
            <p><strong>Estado:</strong> {status}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Información del Paciente</h3>
          <div className="text-sm space-y-1">
            <p><strong>Paciente:</strong> {patientName}</p>
            {patientPhone && <p><strong>Teléfono:</strong> {patientPhone}</p>}
            <p><strong>Doctor:</strong> {doctorName}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Detalle de Trabajos</h3>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">Diente</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Superficie</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Tipo de Trabajo</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Material</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Color</th>
              <th className="border border-gray-300 px-3 py-2 text-right">Precio Unit.</th>
              <th className="border border-gray-300 px-3 py-2 text-center">Cant.</th>
              <th className="border border-gray-300 px-3 py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-3 py-2">{item.tooth_number || '-'}</td>
                <td className="border border-gray-300 px-3 py-2">{item.surface || '-'}</td>
                <td className="border border-gray-300 px-3 py-2">{item.work_type}</td>
                <td className="border border-gray-300 px-3 py-2">{item.material || '-'}</td>
                <td className="border border-gray-300 px-3 py-2">{item.color || '-'}</td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrency(item.unit_price)}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrency(item.total_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Descuento:</span>
              <span className="font-semibold">-{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Notas</h3>
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{notes}</p>
        </div>
      )}

      {/* Signatures */}
      <div className="grid grid-cols-2 gap-8 mb-8 pt-8">
        <div className="text-center">
          <div className="border-t border-gray-800 pt-2">
            <p className="font-semibold">Firma del Doctor</p>
            <p className="text-sm text-gray-600">{doctorName}</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t border-gray-800 pt-2">
            <p className="font-semibold">Recibido por Laboratorio</p>
            <p className="text-sm text-gray-600">Nombre y Firma</p>
          </div>
        </div>
      </div>

      {/* Terms */}
      {clinicSettings?.order_terms && (
        <div className="mb-4 text-xs text-gray-600 border-t border-gray-300 pt-4">
          <p className="font-semibold mb-1">Términos y Condiciones</p>
          <p>{clinicSettings.order_terms}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-4">
        <p>Documento generado por DentalFlow - SmartNetGT.com</p>
        <p>© {new Date().getFullYear()} DentalFlow. Todos los derechos reservados.</p>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print-content {
            padding: 20mm;
            max-width: 100%;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          @page {
            margin: 0;
            size: letter;
          }
        }
      `}</style>
    </div>
  )
}
