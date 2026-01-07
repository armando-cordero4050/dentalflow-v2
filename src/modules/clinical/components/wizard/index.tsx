'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWizardStore } from '../../stores/wizard-store';
import { StepMaterial } from './step-material';
import { StepItems } from './step-items';
import { StepShipping } from './step-shipping';
import { StepReview } from './step-review';

interface LabWizardProps {
  onCreateOrder: () => Promise<void>;
}

export function LabWizard({ onCreateOrder }: LabWizardProps) {
  const {
    isOpen,
    currentStep,
    material,
    items,
    shipping,
    closeWizard,
    nextStep,
    prevStep,
    reset,
  } = useWizardStore();
  
  const [creating, setCreating] = React.useState(false);
  
  const steps = [
    { id: 0, title: 'Material', component: StepMaterial },
    { id: 1, title: 'Items', component: StepItems },
    { id: 2, title: 'Envío', component: StepShipping },
    { id: 3, title: 'Revisión', component: StepReview },
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return material !== null;
      case 1:
        return items.length > 0;
      case 2:
        return shipping !== null;
      case 3:
        return true;
      default:
        return false;
    }
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      nextStep();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      prevStep();
    }
  };
  
  const handleClose = () => {
    if (
      confirm(
        '¿Está seguro que desea cancelar? Se perderá todo el progreso de la orden.'
      )
    ) {
      closeWizard();
      reset();
    }
  };
  
  const handleCreateOrder = async () => {
    setCreating(true);
    try {
      await onCreateOrder();
      closeWizard();
      reset();
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      setCreating(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Orden de Laboratorio</DialogTitle>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${
                        index === currentStep
                          ? 'bg-blue-600 text-white'
                          : index < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }
                    `}
                  >
                    {index + 1}
                  </div>
                  <div className="text-xs mt-1 text-center max-w-[80px]">
                    {step.title}
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`
                      flex-1 h-1 mx-2 rounded
                      ${index < currentStep ? 'bg-green-600' : 'bg-gray-200'}
                    `}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        <div className="py-4">
          <CurrentStepComponent />
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <div>
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack} disabled={creating}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} disabled={creating}>
              Cancelar
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Siguiente
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleCreateOrder}
                disabled={!canProceed() || creating}
                className="bg-green-600 hover:bg-green-700"
              >
                {creating ? 'Creando...' : 'Crear Orden'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
