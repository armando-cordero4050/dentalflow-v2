'use client';

import React from 'react';
import { Package, Truck, Calendar, FileText } from 'lucide-react';
import { useWizardStore } from '../../stores/wizard-store';
import { MATERIALS } from '../../constants/dental';

export function StepReview() {
  const { material, items, shipping, notes } = useWizardStore();
  
  const totalItems = items.length;
  const subtotal = material ? material.price * totalItems : 0;
  const expressCharge = shipping?.isExpress ? 50 : 0;
  const total = subtotal + expressCharge;
  
  const baseMaterial = MATERIALS.bases.find(b => b.value === material?.base);
  const typeMaterial = material?.base
    ? MATERIALS.types[material.base as keyof typeof MATERIALS.types]?.find(
        t => t.value === material.type
      )
    : null;
  const configMaterial = MATERIALS.configurations.find(
    c => c.value === material?.configuration
  );
  
  const shippingTypeLabels = {
    pickup: 'Recolección en Sitio',
    courier: 'Mensajería',
    digital: 'Digital',
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Paso 4: Revisión y Confirmación</h3>
        <p className="text-sm text-gray-600 mb-6">
          Revise los detalles de la orden antes de crear
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Material Summary */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Material</h4>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div>Base: {baseMaterial?.label}</div>
                <div>Tipo: {typeMaterial?.label}</div>
                <div>Configuración: {configMaterial?.label}</div>
                <div className="font-medium text-gray-900">
                  Precio unitario: ${material?.price.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Items Summary */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">
                Items ({totalItems})
              </h4>
              <div className="mt-2 space-y-2">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="text-sm border-l-2 border-green-200 pl-3 py-1"
                  >
                    <div className="font-medium">
                      {index + 1}. Diente {item.toothNumber} - {item.surface}
                    </div>
                    <div className="text-gray-600">{item.findingName}</div>
                    {item.shade && (
                      <div className="text-gray-500 text-xs">Shade: {item.shade}</div>
                    )}
                    {item.notes && (
                      <div className="text-gray-500 text-xs mt-1">
                        Nota: {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Shipping Summary */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-orange-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Envío</h4>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div>
                  Tipo: {shipping ? shippingTypeLabels[shipping.type] : 'No definido'}
                </div>
                {shipping?.isExpress && (
                  <div className="text-orange-600 font-medium">
                    ⚡ Orden Express
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Delivery Date */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Fecha de Entrega</h4>
              <div className="mt-2 text-sm text-gray-600">
                {shipping?.deliveryDate.toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Notes */}
        {(notes || shipping?.notes) && (
          <div className="p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-2">Notas</h4>
            {notes && (
              <div className="text-sm text-gray-600 mb-2">
                <div className="font-medium">Generales:</div>
                <div className="whitespace-pre-wrap">{notes}</div>
              </div>
            )}
            {shipping?.notes && (
              <div className="text-sm text-gray-600">
                <div className="font-medium">Envío:</div>
                <div className="whitespace-pre-wrap">{shipping.notes}</div>
              </div>
            )}
          </div>
        )}
        
        {/* Total */}
        <div className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}):
              </span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            
            {expressCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cargo Express:</span>
                <span className="font-medium">${expressCharge.toFixed(2)}</span>
              </div>
            )}
            
            <div className="pt-2 border-t border-blue-200 flex justify-between">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
