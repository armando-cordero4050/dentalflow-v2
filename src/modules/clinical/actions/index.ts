'use server';

import { createClient } from '@/lib/supabase/server';
import type {
  SaveFindingInput,
  ActionResult,
  ToothFinding,
  Finding,
} from '../types';

/**
 * Save a dental finding for a patient
 */
export async function saveFinding(
  input: SaveFindingInput
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    
    // Get finding details from catalog
    const { data: findingData, error: findingError } = await supabase
      .from('dental_findings_catalog')
      .select('*')
      .eq('id', input.findingId)
      .single();
    
    if (findingError || !findingData) {
      return {
        success: false,
        error: 'Hallazgo no encontrado en el catálogo',
      };
    }
    
    // Insert the finding
    const { data, error } = await supabase
      .from('dental_chart')
      .insert({
        patient_id: input.patientId,
        tooth_number: input.toothNumber,
        finding_id: input.findingId,
        surface: input.surface,
        notes: input.notes,
        recorded_by: input.recordedBy,
        recorded_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error saving finding:', error);
      return {
        success: false,
        error: 'Error al guardar el hallazgo',
      };
    }
    
    return {
      success: true,
      message: 'Hallazgo guardado correctamente',
      data,
    };
  } catch (error) {
    console.error('Error in saveFinding:', error);
    return {
      success: false,
      error: 'Error inesperado al guardar el hallazgo',
    };
  }
}

/**
 * Get all dental findings for a patient
 */
export async function getPatientFindings(
  patientId: string
): Promise<ToothFinding[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('dental_chart')
      .select(`
        *,
        finding:dental_findings_catalog(*)
      `)
      .eq('patient_id', patientId)
      .order('recorded_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching findings:', error);
      return [];
    }
    
    return (data || []).map((item: any) => ({
      id: item.id,
      patientId: item.patient_id,
      toothNumber: item.tooth_number,
      findingId: item.finding_id,
      surface: item.surface,
      notes: item.notes,
      labOrderId: item.lab_order_id,
      recordedBy: item.recorded_by,
      recordedAt: item.recorded_at,
      createdAt: item.created_at,
      finding: item.finding ? {
        id: item.finding.id,
        code: item.finding.code,
        name: item.finding.name,
        description: item.finding.description,
        color: item.finding.color,
        requiresLab: item.finding.requires_lab,
      } : undefined,
    }));
  } catch (error) {
    console.error('Error in getPatientFindings:', error);
    return [];
  }
}

/**
 * Delete a dental finding
 */
export async function deleteFinding(findingId: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('dental_chart')
      .delete()
      .eq('id', findingId);
    
    if (error) {
      console.error('Error deleting finding:', error);
      return {
        success: false,
        error: 'Error al eliminar el hallazgo',
      };
    }
    
    return {
      success: true,
      message: 'Hallazgo eliminado correctamente',
    };
  } catch (error) {
    console.error('Error in deleteFinding:', error);
    return {
      success: false,
      error: 'Error inesperado al eliminar el hallazgo',
    };
  }
}

/**
 * Update a dental finding with lab order ID
 */
export async function updateFindingLabOrder(
  findingId: string,
  labOrderId: string
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    
    const { error } = await supabase
      .from('dental_chart')
      .update({ lab_order_id: labOrderId })
      .eq('id', findingId);
    
    if (error) {
      console.error('Error updating finding:', error);
      return {
        success: false,
        error: 'Error al vincular orden de laboratorio',
      };
    }
    
    return {
      success: true,
      message: 'Orden vinculada correctamente',
    };
  } catch (error) {
    console.error('Error in updateFindingLabOrder:', error);
    return {
      success: false,
      error: 'Error inesperado',
    };
  }
}

/**
 * Get all findings from catalog
 */
export async function getAllFindings(): Promise<Finding[]> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('dental_findings_catalog')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching findings catalog:', error);
      return [];
    }
    
    return (data || []).map((item: any) => ({
      id: item.id,
      code: item.code,
      name: item.name,
      description: item.description,
      color: item.color,
      requiresLab: item.requires_lab,
    }));
  } catch (error) {
    console.error('Error in getAllFindings:', error);
    return [];
  }
}
