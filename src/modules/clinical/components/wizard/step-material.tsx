'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWizardStore } from '../../stores/wizard-store';
import { MATERIALS } from '../../constants/dental';

export function StepMaterial() {
  const { material, setMaterial } = useWizardStore();
  
  const [base, setBase] = React.useState(material?.base || '');
  const [type, setType] = React.useState(material?.type || '');
  const [configuration, setConfiguration] = React.useState(material?.configuration || '');
  
  React.useEffect(() => {
    if (base && type && configuration) {
      // Calculate price based on selections (simplified pricing)
      const basePrice = {
        zirconia: 400,
        pmma: 150,
        metal: 300,
        ceramic: 500,
        resin: 100,
      }[base] || 0;
      
      const typeMultiplier = {
        translucent: 1.2,
        high_strength: 1.1,
        multilayer: 1.3,
        temp: 0.8,
        long_term: 1.0,
        cr_co: 1.0,
        gold: 2.0,
        feldspathic: 1.1,
        lithium: 1.3,
        composite: 0.9,
        bis_acryl: 0.95,
      }[type] || 1.0;
      
      const configMultiplier = {
        crown_anterior: 1.0,
        crown_posterior: 1.1,
        bridge_3_units: 2.5,
        bridge_4_units: 3.5,
        veneer: 0.9,
        inlay: 0.8,
        denture_full: 4.0,
        denture_partial: 3.0,
      }[configuration] || 1.0;
      
      const price = basePrice * typeMultiplier * configMultiplier;
      
      setMaterial({
        base,
        type,
        configuration,
        price: Math.round(price * 100) / 100,
      });
    }
  }, [base, type, configuration, setMaterial]);
  
  const availableTypes = base ? MATERIALS.types[base as keyof typeof MATERIALS.types] || [] : [];
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Paso 1: Selección de Material</h3>
        <p className="text-sm text-gray-600 mb-6">
          Seleccione el material base, tipo y configuración para el trabajo de laboratorio
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Base Material */}
        <div className="space-y-2">
          <Label htmlFor="base">Material Base *</Label>
          <Select value={base} onValueChange={setBase}>
            <SelectTrigger id="base">
              <SelectValue placeholder="Seleccione el material base" />
            </SelectTrigger>
            <SelectContent>
              {MATERIALS.bases.map((mat) => (
                <SelectItem key={mat.value} value={mat.value}>
                  {mat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Material Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Material *</Label>
          <Select value={type} onValueChange={setType} disabled={!base}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Seleccione el tipo" />
            </SelectTrigger>
            <SelectContent>
              {availableTypes.map((mat) => (
                <SelectItem key={mat.value} value={mat.value}>
                  {mat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Configuration */}
        <div className="space-y-2">
          <Label htmlFor="configuration">Configuración *</Label>
          <Select value={configuration} onValueChange={setConfiguration}>
            <SelectTrigger id="configuration">
              <SelectValue placeholder="Seleccione la configuración" />
            </SelectTrigger>
            <SelectContent>
              {MATERIALS.configurations.map((config) => (
                <SelectItem key={config.value} value={config.value}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Preview */}
        {material && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-sm font-medium text-gray-700">Precio estimado:</div>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              ${material.price.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Por unidad (puede variar según complejidad)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
