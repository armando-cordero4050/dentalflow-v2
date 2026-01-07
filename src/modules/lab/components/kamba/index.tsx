'use client';

import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { KambaColumn } from './column';
import { OrderCard } from './order-card';
import { OrderDetail } from './order-detail';
import { KAMBA_STAGES } from '../../types';
import type { LabOrder } from '../../types';

interface KambaBoardProps {
  ordersByStage: Record<string, LabOrder[]>;
  onOrderMove: (orderId: string, newStageCode: string) => Promise<void>;
}

export function KambaBoard({ ordersByStage, onOrderMove }: KambaBoardProps) {
  const [activeOrder, setActiveOrder] = React.useState<LabOrder | null>(null);
  const [selectedOrder, setSelectedOrder] = React.useState<LabOrder | null>(null);
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    // Find the order being dragged
    for (const orders of Object.values(ordersByStage)) {
      const order = orders.find((o) => o.id === active.id);
      if (order) {
        setActiveOrder(order);
        break;
      }
    }
  };
  
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveOrder(null);
    
    if (!over || active.id === over.id) {
      return;
    }
    
    // Find the current stage of the order
    let currentStageCode: string | null = null;
    for (const [stageCode, orders] of Object.entries(ordersByStage)) {
      if (orders.some((o) => o.id === active.id)) {
        currentStageCode = stageCode;
        break;
      }
    }
    
    const newStageCode = over.id as string;
    
    if (currentStageCode && currentStageCode !== newStageCode) {
      await onOrderMove(active.id as string, newStageCode);
    }
  };
  
  const handleOrderClick = (order: LabOrder) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };
  
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedOrder(null);
  };
  
  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-5 gap-4 h-[calc(100vh-200px)]">
          {KAMBA_STAGES.slice(0, 5).map((stage) => (
            <KambaColumn
              key={stage.code}
              stage={stage}
              orders={ordersByStage[stage.code] || []}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-5 gap-4 h-[calc(100vh-200px)] mt-4">
          {KAMBA_STAGES.slice(5, 10).map((stage) => (
            <KambaColumn
              key={stage.code}
              stage={stage}
              orders={ordersByStage[stage.code] || []}
              onOrderClick={handleOrderClick}
            />
          ))}
        </div>
        
        <DragOverlay>
          {activeOrder ? <OrderCard order={activeOrder} /> : null}
        </DragOverlay>
      </DndContext>
      
      <OrderDetail
        order={selectedOrder}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
}
