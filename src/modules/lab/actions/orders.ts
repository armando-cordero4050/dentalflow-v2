'use server';

import { createClient } from '@/lib/supabase/server';
import type { CreateLabOrderInput } from '../../clinical/types';
import type {
  LabOrder,
  LabStage,
  OrderFilters,
  UpdateOrderStageInput,
  CreateOrderHistoryInput,
} from '../types';
import { ActionResult } from '../../clinical/types';

/**
 * Generate next order number for a clinic
 */
async function generateOrderNumber(clinicId: string): Promise<string> {
  const supabase = await createClient();
  const year = new Date().getFullYear();
  
  // Get or create correlative for this clinic and year
  const { data: correlative, error: corrError } = await supabase
    .from('lab_correlatives')
    .select('*')
    .eq('clinic_id', clinicId)
    .eq('year', year)
    .single();
  
  let nextNumber = 1;
  
  if (correlative) {
    nextNumber = correlative.last_number + 1;
    
    // Update correlative
    await supabase
      .from('lab_correlatives')
      .update({ last_number: nextNumber, updated_at: new Date().toISOString() })
      .eq('id', correlative.id);
  } else {
    // Create new correlative
    await supabase
      .from('lab_correlatives')
      .insert({
        clinic_id: clinicId,
        year,
        last_number: nextNumber,
      });
  }
  
  // Format: LAB-YYYY-NNNN (e.g., LAB-2026-0001)
  return `LAB-${year}-${String(nextNumber).padStart(4, '0')}`;
}

/**
 * Create a new lab order
 */
export async function createLabOrder(
  input: CreateLabOrderInput
): Promise<{ success: boolean; id?: string; orderNumber?: string; error?: string }> {
  try {
    const supabase = await createClient();
    
    // Get default stage (CLINIC)
    const { data: defaultStage } = await supabase
      .from('lab_stages')
      .select('id')
      .eq('code', 'CLINIC')
      .single();
    
    if (!defaultStage) {
      return { success: false, error: 'No se encontró la etapa por defecto' };
    }
    
    // Generate order number
    const orderNumber = await generateOrderNumber(input.clinicId);
    
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('lab_orders')
      .insert({
        order_number: orderNumber,
        clinic_id: input.clinicId,
        patient_id: input.patientId,
        doctor_id: input.doctorId,
        current_stage_id: defaultStage.id,
        status: 'pending',
        material: input.material,
        material_type: input.materialType,
        configuration: input.configuration,
        shade: input.shade,
        shipping_type: input.shippingType,
        delivery_date: input.deliveryDate.toISOString().split('T')[0],
        is_express: input.isExpress,
        shipping_notes: input.shippingNotes,
        notes: input.notes,
      })
      .select()
      .single();
    
    if (orderError || !order) {
      console.error('Error creating order:', orderError);
      return { success: false, error: 'Error al crear la orden' };
    }
    
    // Create order items
    if (input.items.length > 0) {
      const { error: itemsError } = await supabase
        .from('lab_order_items')
        .insert(
          input.items.map((item) => ({
            order_id: order.id,
            product_code: item.productCode,
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            total_price: item.totalPrice,
          }))
        );
      
      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        // Don't fail the whole operation, just log it
      }
    }
    
    // Create initial history entry
    await supabase.from('lab_order_history').insert({
      order_id: order.id,
      stage_id: defaultStage.id,
      user_id: input.doctorId,
      action: 'Orden creada',
    });
    
    return {
      success: true,
      id: order.id,
      orderNumber: order.order_number,
    };
  } catch (error) {
    console.error('Error in createLabOrder:', error);
    return {
      success: false,
      error: 'Error inesperado al crear la orden',
    };
  }
}

/**
 * Get lab orders with optional filters
 */
export async function getLabOrders(filters?: OrderFilters): Promise<LabOrder[]> {
  try {
    const supabase = await createClient();
    
    let query = supabase
      .from('lab_orders')
      .select(`
        *,
        clinic:clinics(name, code),
        patient:patients(first_name, last_name),
        doctor:users(full_name),
        currentStage:lab_stages!current_stage_id(*)
      `)
      .order('created_at', { ascending: false });
    
    if (filters?.clinicId) {
      query = query.eq('clinic_id', filters.clinicId);
    }
    
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters?.search) {
      query = query.or(`order_number.ilike.%${filters.search}%`);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    
    return (data || []).map(mapLabOrder);
  } catch (error) {
    console.error('Error in getLabOrders:', error);
    return [];
  }
}

/**
 * Get orders grouped by stage (for KAMBA board)
 */
export async function getOrdersByStage(): Promise<Record<string, LabOrder[]>> {
  try {
    const supabase = await createClient();
    
    const { data: stages } = await supabase
      .from('lab_stages')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    
    const { data: orders } = await supabase
      .from('lab_orders')
      .select(`
        *,
        clinic:clinics(name, code),
        patient:patients(first_name, last_name),
        doctor:users(full_name),
        currentStage:lab_stages!current_stage_id(*)
      `)
      .in('status', ['pending', 'in_progress'])
      .order('created_at', { ascending: false });
    
    const result: Record<string, LabOrder[]> = {};
    
    (stages || []).forEach((stage: any) => {
      result[stage.code] = (orders || [])
        .filter((order: any) => order.current_stage_id === stage.id)
        .map(mapLabOrder);
    });
    
    return result;
  } catch (error) {
    console.error('Error in getOrdersByStage:', error);
    return {};
  }
}

/**
 * Update order stage (for drag and drop in KAMBA)
 */
export async function updateOrderStage(
  input: UpdateOrderStageInput
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    
    // Update order
    const { error: updateError } = await supabase
      .from('lab_orders')
      .update({
        current_stage_id: input.newStageId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', input.orderId);
    
    if (updateError) {
      console.error('Error updating order stage:', updateError);
      return {
        success: false,
        error: 'Error al actualizar la etapa',
      };
    }
    
    // Create history entry
    await supabase.from('lab_order_history').insert({
      order_id: input.orderId,
      stage_id: input.newStageId,
      user_id: input.userId,
      action: 'Cambio de etapa',
      notes: input.notes,
    });
    
    return {
      success: true,
      message: 'Etapa actualizada correctamente',
    };
  } catch (error) {
    console.error('Error in updateOrderStage:', error);
    return {
      success: false,
      error: 'Error inesperado',
    };
  }
}

/**
 * Get order details by ID
 */
export async function getOrderById(orderId: string): Promise<LabOrder | null> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('lab_orders')
      .select(`
        *,
        clinic:clinics(name, code),
        patient:patients(first_name, last_name),
        doctor:users(full_name),
        currentStage:lab_stages!current_stage_id(*),
        items:lab_order_items(*)
      `)
      .eq('id', orderId)
      .single();
    
    if (error || !data) {
      return null;
    }
    
    return mapLabOrder(data);
  } catch (error) {
    console.error('Error in getOrderById:', error);
    return null;
  }
}

/**
 * Get all lab stages
 */
export async function getLabStages(): Promise<LabStage[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('lab_stages')
      .select('*')
      .eq('is_active', true)
      .order('order_index');
    
    if (error) {
      console.error('Error fetching stages:', error);
      return [];
    }
    
    return (data || []).map((stage: any) => ({
      id: stage.id,
      name: stage.name,
      code: stage.code,
      orderIndex: stage.order_index,
      isActive: stage.is_active,
      createdAt: stage.created_at,
    }));
  } catch (error) {
    console.error('Error in getLabStages:', error);
    return [];
  }
}

// Helper function to map database row to LabOrder
function mapLabOrder(data: any): LabOrder {
  return {
    id: data.id,
    orderNumber: data.order_number,
    clinicId: data.clinic_id,
    patientId: data.patient_id,
    doctorId: data.doctor_id,
    currentStageId: data.current_stage_id,
    status: data.status,
    material: data.material,
    materialType: data.material_type,
    configuration: data.configuration,
    shade: data.shade,
    shippingType: data.shipping_type,
    deliveryDate: data.delivery_date,
    isExpress: data.is_express,
    shippingNotes: data.shipping_notes,
    notes: data.notes,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    completedAt: data.completed_at,
    clinic: data.clinic,
    patient: data.patient ? {
      firstName: data.patient.first_name,
      lastName: data.patient.last_name,
    } : undefined,
    doctor: data.doctor ? {
      fullName: data.doctor.full_name,
    } : undefined,
    currentStage: data.currentStage ? {
      id: data.currentStage.id,
      name: data.currentStage.name,
      code: data.currentStage.code,
      orderIndex: data.currentStage.order_index,
      isActive: data.currentStage.is_active,
      createdAt: data.currentStage.created_at,
    } : undefined,
    items: data.items,
  };
}
