'use client';

import React from 'react';
import { Toaster } from 'sonner';
import { Odontogram } from '@/src/modules/clinical/components/odontogram';
import { LabWizard } from '@/src/modules/clinical/components/wizard';
import { useDentalStore } from '@/src/modules/clinical/stores/dental-store';
import { useWizardStore } from '@/src/modules/clinical/stores/wizard-store';
import { saveFinding, deleteFinding, getPatientFindings } from '@/src/modules/clinical/actions';
import { createLabOrder } from '@/src/modules/lab/actions/orders';
import { toast } from 'sonner';
import type { Finding } from '@/src/modules/clinical/types';

// Mock IDs for demo
const DEMO_PATIENT_ID = 'demo-patient-123';
const DEMO_CLINIC_ID = 'demo-clinic-123';
const DEMO_DOCTOR_ID = 'demo-doctor-123';

export default function OdontogramDemoPage() {
  const { setFindings } = useDentalStore();
  const { material, items, shipping, notes, reset: resetWizard } = useWizardStore();
  const [loading, setLoading] = React.useState(true);
  
  // Load findings on mount
  React.useEffect(() => {
    async function loadFindings() {
      setLoading(true);
      try {
        const findings = await getPatientFindings(DEMO_PATIENT_ID);
        setFindings(findings);
      } catch (error) {
        console.error('Error loading findings:', error);
        toast.error('Error al cargar hallazgos');
      } finally {
        setLoading(false);
      }
    }
    
    loadFindings();
  }, [setFindings]);
  
  const handleSaveFinding = async (finding: Finding, findingNotes: string) => {
    const { selectedTooth, selectedSurface } = useDentalStore.getState();
    
    if (!selectedTooth || !selectedSurface) {
      toast.error('Debe seleccionar un diente y superficie');
      return;
    }
    
    try {
      const result = await saveFinding({
        patientId: DEMO_PATIENT_ID,
        toothNumber: selectedTooth,
        surface: selectedSurface,
        findingId: finding.id,
        notes: findingNotes,
        recordedBy: DEMO_DOCTOR_ID,
      });
      
      if (result.success) {
        toast.success(result.message || 'Hallazgo guardado correctamente');
        
        // Reload findings
        const findings = await getPatientFindings(DEMO_PATIENT_ID);
        setFindings(findings);
      } else {
        toast.error(result.error || 'Error al guardar hallazgo');
      }
    } catch (error) {
      console.error('Error saving finding:', error);
      toast.error('Error inesperado al guardar hallazgo');
    }
  };
  
  const handleDeleteFinding = async (findingId: string) => {
    try {
      const result = await deleteFinding(findingId);
      
      if (result.success) {
        toast.success(result.message || 'Hallazgo eliminado correctamente');
        
        // Reload findings
        const findings = await getPatientFindings(DEMO_PATIENT_ID);
        setFindings(findings);
      } else {
        toast.error(result.error || 'Error al eliminar hallazgo');
      }
    } catch (error) {
      console.error('Error deleting finding:', error);
      toast.error('Error inesperado al eliminar hallazgo');
    }
  };
  
  const handleCreateOrder = async () => {
    if (!material || items.length === 0 || !shipping) {
      toast.error('Faltan datos requeridos para crear la orden');
      return;
    }
    
    try {
      const result = await createLabOrder({
        patientId: DEMO_PATIENT_ID,
        clinicId: DEMO_CLINIC_ID,
        doctorId: DEMO_DOCTOR_ID,
        material: material.base,
        materialType: material.type,
        configuration: material.configuration,
        shade: items[0]?.shade,
        shippingType: shipping.type,
        deliveryDate: shipping.deliveryDate,
        isExpress: shipping.isExpress,
        shippingNotes: shipping.notes,
        notes,
        items: items.map((item) => ({
          productCode: item.findingCode,
          description: `${item.findingName} - Diente ${item.toothNumber} (${item.surface})`,
          quantity: 1,
          unitPrice: material.price,
          totalPrice: material.price,
        })),
      });
      
      if (result.success) {
        toast.success(`Orden creada: ${result.orderNumber}`);
        resetWizard();
        
        // Reload findings to show linked order
        const findings = await getPatientFindings(DEMO_PATIENT_ID);
        setFindings(findings);
      } else {
        toast.error(result.error || 'Error al crear orden');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error inesperado al crear orden');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando odontograma...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Demo: Odontograma Interactivo
          </h1>
          <p className="text-gray-600">
            Sistema completo de odontograma con wizard de órdenes de laboratorio
          </p>
        </div>
        
        <Odontogram
          patientId={DEMO_PATIENT_ID}
          clinicId={DEMO_CLINIC_ID}
          doctorId={DEMO_DOCTOR_ID}
          onSaveFinding={handleSaveFinding}
          onDeleteFinding={handleDeleteFinding}
        />
        
        <LabWizard onCreateOrder={handleCreateOrder} />
      </div>
    </>
  );
}
