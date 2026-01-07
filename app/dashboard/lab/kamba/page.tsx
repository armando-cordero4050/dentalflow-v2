'use client';

import React from 'react';
import { Toaster, toast } from 'sonner';
import { KambaBoard } from '@/src/modules/lab/components/kamba';
import { getOrdersByStage, updateOrderStage, getLabStages } from '@/src/modules/lab/actions/orders';
import type { LabOrder } from '@/src/modules/lab/types';

// Mock user ID for demo
const DEMO_USER_ID = 'demo-user-123';

export default function KambaPage() {
  const [ordersByStage, setOrdersByStage] = React.useState<Record<string, LabOrder[]>>({});
  const [loading, setLoading] = React.useState(true);
  
  const loadOrders = React.useCallback(async () => {
    try {
      const orders = await getOrdersByStage();
      setOrdersByStage(orders);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  }, []);
  
  React.useEffect(() => {
    loadOrders();
  }, [loadOrders]);
  
  const handleOrderMove = async (orderId: string, newStageCode: string) => {
    try {
      // Find the stage ID from the code
      const stages = await getLabStages();
      const newStage = stages.find((s) => s.code === newStageCode);
      
      if (!newStage) {
        toast.error('Etapa no encontrada');
        return;
      }
      
      const result = await updateOrderStage({
        orderId,
        newStageId: newStage.id,
        userId: DEMO_USER_ID,
        notes: 'Movido desde tablero KAMBA',
      });
      
      if (result.success) {
        toast.success('Orden movida correctamente');
        // Reload orders
        await loadOrders();
      } else {
        toast.error(result.error || 'Error al mover la orden');
      }
    } catch (error) {
      console.error('Error moving order:', error);
      toast.error('Error inesperado al mover la orden');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tablero KAMBA...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tablero KAMBA
          </h1>
          <p className="text-gray-600">
            Sistema de gestión de órdenes de laboratorio con 10 etapas
          </p>
        </div>
        
        <KambaBoard
          ordersByStage={ordersByStage}
          onOrderMove={handleOrderMove}
        />
      </div>
    </>
  );
}
