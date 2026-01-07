'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { OrderCard } from './order-card';
import type { KambaStage, LabOrder } from '../../types';
import * as Icons from 'lucide-react';

interface KambaColumnProps {
  stage: KambaStage;
  orders: LabOrder[];
  onOrderClick: (order: LabOrder) => void;
}

export function KambaColumn({ stage, orders, onOrderClick }: KambaColumnProps) {
  const { setNodeRef } = useDroppable({
    id: stage.code,
  });
  
  // Get icon component dynamically
  const IconComponent = (Icons as any)[stage.icon] || Icons.Box;
  
  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div
        className="p-3 rounded-t-lg border-b-2"
        style={{
          backgroundColor: stage.color,
          borderBottomColor: stage.color.replace('0.1)', '0.3)'),
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <IconComponent className="h-4 w-4 text-gray-700" />
          <h3 className="font-semibold text-sm text-gray-900">{stage.name}</h3>
        </div>
        <div className="text-xs text-gray-600">
          {orders.length} {orders.length === 1 ? 'orden' : 'órdenes'}
        </div>
      </div>
      
      {/* Orders List */}
      <div
        ref={setNodeRef}
        className="flex-1 p-2 space-y-2 overflow-y-auto bg-gray-50 rounded-b-lg min-h-[200px]"
      >
        <SortableContext
          items={orders.map((o) => o.id)}
          strategy={verticalListSortingStrategy}
        >
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => onOrderClick(order)}
            />
          ))}
        </SortableContext>
        
        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            Sin órdenes
          </div>
        )}
      </div>
    </div>
  );
}
