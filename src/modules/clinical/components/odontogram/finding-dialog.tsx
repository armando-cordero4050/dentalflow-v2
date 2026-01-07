'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useDentalStore } from '../../stores/dental-store';
import { useWizardStore } from '../../stores/wizard-store';
import { CLINICAL_FINDINGS, LAB_FINDINGS, SURFACES } from '../../constants/dental';
import type { Finding } from '../../types';

interface FindingDialogProps {
  onSave: (finding: Finding, notes: string) => Promise<void>;
  patientId: string;
  clinicId: string;
  doctorId: string;
}

export function FindingDialog({ onSave, patientId, clinicId, doctorId }: FindingDialogProps) {
  const {
    isDialogOpen,
    setDialogOpen,
    selectedTooth,
    selectedSurface,
    selectedFinding,
    setSelectedFinding,
  } = useDentalStore();
  
  const { openWizard } = useWizardStore();
  const [notes, setNotes] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  
  const handleClose = () => {
    setDialogOpen(false);
    setSelectedFinding(null);
    setNotes('');
  };
  
  const handleSelectFinding = (finding: Finding) => {
    setSelectedFinding(finding);
  };
  
  const handleSave = async () => {
    if (!selectedFinding) return;
    
    setSaving(true);
    try {
      if (selectedFinding.requiresLab) {
        // Close dialog and open wizard
        await onSave(selectedFinding, notes);
        handleClose();
        openWizard(patientId, clinicId, doctorId);
      } else {
        // Save directly
        await onSave(selectedFinding, notes);
        handleClose();
      }
    } catch (error) {
      console.error('Error saving finding:', error);
    } finally {
      setSaving(false);
    }
  };
  
  const surfaceName = selectedSurface 
    ? SURFACES.find(s => s.id === selectedSurface)?.name 
    : '';
  
  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Diente {selectedTooth} - Superficie {surfaceName}
          </DialogTitle>
          <DialogDescription>
            Seleccione el hallazgo para esta superficie dental
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Clinical Procedures */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Procedimientos Clínicos</h3>
            <div className="grid grid-cols-3 gap-2">
              {CLINICAL_FINDINGS.map((finding) => (
                <Button
                  key={finding.id}
                  variant={selectedFinding?.id === finding.id ? 'default' : 'outline'}
                  onClick={() => handleSelectFinding(finding)}
                  className="h-auto py-3 px-4 flex flex-col items-center gap-1"
                  style={{
                    backgroundColor: selectedFinding?.id === finding.id 
                      ? finding.color 
                      : undefined,
                    borderColor: finding.color,
                    color: selectedFinding?.id === finding.id 
                      ? (finding.color === '#ffffff' ? '#000000' : '#ffffff')
                      : undefined,
                  }}
                >
                  <div 
                    className="w-6 h-6 rounded border border-gray-400"
                    style={{ backgroundColor: finding.color }}
                  />
                  <span className="text-xs">{finding.name}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Laboratory & Prosthesis */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-orange-700">
              Laboratorio & Prótesis
              <span className="ml-2 text-xs font-normal text-gray-500">
                (Requieren orden de laboratorio)
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {LAB_FINDINGS.map((finding) => (
                <Button
                  key={finding.id}
                  variant={selectedFinding?.id === finding.id ? 'default' : 'outline'}
                  onClick={() => handleSelectFinding(finding)}
                  className="h-auto py-3 px-4 flex flex-col items-center gap-1"
                  style={{
                    backgroundColor: selectedFinding?.id === finding.id 
                      ? finding.color 
                      : undefined,
                    borderColor: finding.color,
                    color: '#ffffff',
                  }}
                >
                  <div 
                    className="w-6 h-6 rounded border border-gray-400"
                    style={{ backgroundColor: finding.color }}
                  />
                  <span className="text-xs">{finding.name}</span>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Agregue cualquier observación adicional..."
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!selectedFinding || saving}
          >
            {saving ? 'Guardando...' : selectedFinding?.requiresLab ? 'Generar Orden' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
