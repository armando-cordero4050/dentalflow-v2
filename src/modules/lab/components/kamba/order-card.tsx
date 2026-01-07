'use client';

import React from 'react';
import { Calendar, User, Building2, Package } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { LabOrder } from '../../types';

interface OrderCardProps {
  order: LabOrder;
  onClick?: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: order.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  
  const patientName = order.patient
    ? `${order.patient.firstName} ${order.patient.lastName}`
    : 'Sin paciente';
  
  const deliveryDate = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
      })
    : 'Sin fecha';
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white p-3 rounded-lg border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="space-y-2">
        {/* Order Number */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-blue-600">
            {order.orderNumber}
          </span>
          {order.isExpress && (
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
              ⚡ Express
            </span>
          )}
        </div>
        
        {/* Patient */}
        <div className="flex items-center gap-2 text-sm">
          <User className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-gray-700 truncate">{patientName}</span>
        </div>
        
        {/* Clinic */}
        {order.clinic && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Building2 className="h-3 w-3" />
            <span className="truncate">{order.clinic.name}</span>
          </div>
        )}
        
        {/* Service */}
        {order.configuration && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Package className="h-3 w-3" />
            <span className="truncate">{order.configuration}</span>
          </div>
        )}
        
        {/* Delivery Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-1 border-t">
          <Calendar className="h-3 w-3" />
          <span>{deliveryDate}</span>
        </div>
      </div>
    </div>
  );
}
