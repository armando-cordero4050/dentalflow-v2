'use client'

import { useState } from 'react'
import { OrderPrint } from '@/modules/lab/components/print/order-print'
import { PrintButton } from '@/modules/lab/components/print/print-button'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [showPrint, setShowPrint] = useState(false)

  // Mock data for demonstration
  const mockOrder = {
    orderId: params.id,
    orderNumber: 'ORD-2026-0001',
    createdAt: new Date().toISOString(),
    deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'normal' as const,
    status: 'En Proceso',
    patientName: 'Juan Pérez',
    patientPhone: '+502 1234-5678',
    doctorName: 'Dr. María González',
    items: [
      {
        id: '1',
        tooth_number: '11',
        surface: 'Vestibular',
        work_type: 'Corona de Zirconia',
        material: 'Zirconia',
        color: 'A2',
        unit_price: 1200.00,
        quantity: 1,
        total_price: 1200.00
      },
      {
        id: '2',
        tooth_number: '21',
        surface: 'Vestibular',
        work_type: 'Carilla',
        material: 'Porcelana',
        color: 'A1',
        unit_price: 800.00,
        quantity: 1,
        total_price: 800.00
      }
    ],
    subtotal: 2000.00,
    discount: 100.00,
    total: 1900.00,
    notes: 'Paciente requiere entrega urgente para evento especial',
    clinicSettings: {
      name: 'Clínica Dental SmartNet',
      logo_url: undefined,
      address: 'Zona 10, Ciudad de Guatemala',
      phone: '+502 2345-6789',
      phone_secondary: '+502 2345-6790',
      email: 'info@smartnetdental.com',
      tax_id: '12345678-9',
      order_terms: 'Garantía de 1 año en trabajos protésicos. Los cambios de color después de la instalación no están cubiertos por la garantía.'
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8 no-print">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Detalle de Orden</h1>
            <p className="text-gray-600 mt-2">Orden #{mockOrder.orderNumber}</p>
          </div>
          <PrintButton onClick={handlePrint} />
        </div>
      </div>

      <OrderPrint {...mockOrder} />

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}
