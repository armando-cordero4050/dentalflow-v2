'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useWizardStore } from '../../stores/wizard-store';
import { useDentalStore } from '../../stores/dental-store';
import { VITA_SHADES } from '../../constants/dental';

export function StepItems() {
  const { items, updateItem, removeItem } = useWizardStore();
  const { selectedTooth, selectedSurface, selectedFinding } = useDentalStore();
  
  // Auto-add initial item if coming from odontogram
  React.useEffect(() => {
    if (items.length === 0 && selectedTooth && selectedSurface && selectedFinding) {
      const newItem = {
        id: crypto.randomUUID(),
        toothNumber: selectedTooth,
        surface: selectedSurface,
        findingCode: selectedFinding.code,
        findingName: selectedFinding.name,
      };
      useWizardStore.getState().addItem(newItem);
    }
  }, [items.length, selectedTooth, selectedSurface, selectedFinding]);
  
  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Paso 2: Items de la Orden</h3>
          <p className="text-sm text-gray-600">
            No hay items agregados aún
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Paso 2: Items de la Orden</h3>
        <p className="text-sm text-gray-600 mb-6">
          Configure los detalles de cada item de la orden
        </p>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">
                  Item {index + 1}: Diente {item.toothNumber} - {item.surface}
                </div>
                <div className="text-sm text-gray-600">
                  {item.findingName}
                </div>
              </div>
              
              {items.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Shade Selection */}
              <div className="space-y-2">
                <Label htmlFor={`shade-${item.id}`}>Color/Shade (VITA)</Label>
                <Select
                  value={item.shade || ''}
                  onValueChange={(value) => updateItem(item.id, { shade: value })}
                >
                  <SelectTrigger id={`shade-${item.id}`}>
                    <SelectValue placeholder="Seleccionar color" />
                  </SelectTrigger>
                  <SelectContent>
                    {VITA_SHADES.map((shade) => (
                      <SelectItem key={shade} value={shade}>
                        {shade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor={`notes-${item.id}`}>Notas del Item</Label>
              <Textarea
                id={`notes-${item.id}`}
                value={item.notes || ''}
                onChange={(e) => updateItem(item.id, { notes: e.target.value })}
                placeholder="Instrucciones especiales para este item..."
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Add More Button */}
      <Button
        variant="outline"
        onClick={() => {
          const newItem = {
            id: crypto.randomUUID(),
            toothNumber: 11 as any,
            surface: 'oclusal' as any,
            findingCode: 'CORONA',
            findingName: 'Corona',
          };
          useWizardStore.getState().addItem(newItem);
        }}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Agregar Otro Item
      </Button>
    </div>
  );
}
