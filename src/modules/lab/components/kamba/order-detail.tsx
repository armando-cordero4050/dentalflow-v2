'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  User,
  Building2,
  Calendar,
  Package,
  Truck,
  FileText,
  X,
} from 'lucide-react';
import type { LabOrder } from '../../types';

interface OrderDetailProps {
  order: LabOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetail({ order, isOpen, onClose }: OrderDetailProps) {
  if (!order) return null;
  
  const patientName = order.patient
    ? `${order.patient.firstName} ${order.patient.lastName}`
    : 'Sin paciente';
  
  const deliveryDate = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Sin fecha';
  
  const createdDate = new Date(order.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const shippingTypeLabels: Record<string, string> = {
    pickup: 'Recolección en Sitio',
    courier: 'Mensajería',
    digital: 'Digital',
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Orden: {order.orderNumber}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${order.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                ${order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' : ''}
                ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
              `}
            >
              {order.status === 'completed' && 'Completada'}
              {order.status === 'in_progress' && 'En Progreso'}
              {order.status === 'pending' && 'Pendiente'}
              {order.status === 'cancelled' && 'Cancelada'}
            </span>
            
            {order.isExpress && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                ⚡ Express
              </span>
            )}
            
            {order.currentStage && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                {order.currentStage.name}
              </span>
            )}
          </div>
          
          {/* Patient & Clinic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">Paciente</span>
              </div>
              <div className="text-gray-900 ml-6">{patientName}</div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">Clínica</span>
              </div>
              <div className="text-gray-900 ml-6">
                {order.clinic?.name || 'Sin clínica'}
              </div>
            </div>
          </div>
          
          {/* Doctor */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <User className="h-4 w-4" />
              <span className="font-medium">Doctor</span>
            </div>
            <div className="text-gray-900 ml-6">
              {order.doctor?.fullName || 'Sin doctor'}
            </div>
          </div>
          
          {/* Material Details */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Detalles del Material</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">Material Base:</span>
                <div className="font-medium">{order.material || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-600">Tipo:</span>
                <div className="font-medium">{order.materialType || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-600">Configuración:</span>
                <div className="font-medium">{order.configuration || 'N/A'}</div>
              </div>
              <div>
                <span className="text-gray-600">Shade:</span>
                <div className="font-medium">{order.shade || 'N/A'}</div>
              </div>
            </div>
          </div>
          
          {/* Items */}
          {order.items && order.items.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Items de la Orden</h4>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border rounded-lg flex justify-between"
                  >
                    <div>
                      <div className="font-medium">{item.description}</div>
                      <div className="text-sm text-gray-500">
                        Cantidad: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${item.totalPrice.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">
                        ${item.unitPrice.toFixed(2)} c/u
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Shipping */}
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="h-5 w-5 text-orange-600" />
              <h4 className="font-semibold text-gray-900">Información de Envío</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Tipo:</span>
                <span className="ml-2 font-medium">
                  {order.shippingType
                    ? shippingTypeLabels[order.shippingType]
                    : 'N/A'}
                </span>
              </div>
              {order.shippingNotes && (
                <div>
                  <span className="text-gray-600">Notas:</span>
                  <div className="mt-1 text-gray-900">{order.shippingNotes}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Fecha de Entrega</span>
              </div>
              <div className="text-gray-900 ml-6 mt-1">{deliveryDate}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Fecha de Creación</span>
              </div>
              <div className="text-gray-900 ml-6 mt-1">{createdDate}</div>
            </div>
          </div>
          
          {/* Notes */}
          {order.notes && (
            <div className="p-4 bg-gray-50 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <h4 className="font-semibold text-gray-900">Notas</h4>
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {order.notes}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
