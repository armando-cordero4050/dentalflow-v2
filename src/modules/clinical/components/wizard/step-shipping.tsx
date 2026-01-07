'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useWizardStore } from '../../stores/wizard-store';

export function StepShipping() {
  const { shipping, setShipping } = useWizardStore();
  
  const [type, setType] = React.useState<'pickup' | 'courier' | 'digital'>(
    shipping?.type || 'pickup'
  );
  const [isExpress, setIsExpress] = React.useState(shipping?.isExpress || false);
  const [notes, setNotes] = React.useState(shipping?.notes || '');
  const [deliveryDate, setDeliveryDate] = React.useState<Date>(
    shipping?.deliveryDate || getDefaultDeliveryDate(type, isExpress)
  );
  
  function getDefaultDeliveryDate(
    shippingType: 'pickup' | 'courier' | 'digital',
    express: boolean
  ): Date {
    const today = new Date();
    const daysToAdd = express ? 3 : shippingType === 'digital' ? 5 : 7;
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + daysToAdd);
    return futureDate;
  }
  
  React.useEffect(() => {
    if (!isExpress) {
      setDeliveryDate(getDefaultDeliveryDate(type, false));
    }
  }, [type, isExpress]);
  
  React.useEffect(() => {
    setShipping({
      type,
      deliveryDate,
      isExpress,
      notes,
    });
  }, [type, deliveryDate, isExpress, notes, setShipping]);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Paso 3: Tipo de Envío</h3>
        <p className="text-sm text-gray-600 mb-6">
          Seleccione el método de entrega y la fecha esperada
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Shipping Type */}
        <div className="space-y-3">
          <Label>Tipo de Entrega *</Label>
          <RadioGroup value={type} onValueChange={(v) => setType(v as any)}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="cursor-pointer flex-1">
                <div className="font-medium">Recolección en Sitio</div>
                <div className="text-xs text-gray-500">
                  El cliente recogerá la orden en nuestras instalaciones
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="courier" id="courier" />
              <Label htmlFor="courier" className="cursor-pointer flex-1">
                <div className="font-medium">Mensajería</div>
                <div className="text-xs text-gray-500">
                  Envío a través de servicio de mensajería
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="digital" id="digital" />
              <Label htmlFor="digital" className="cursor-pointer flex-1">
                <div className="font-medium">Digital</div>
                <div className="text-xs text-gray-500">
                  Envío de archivos digitales (STL, diseños CAD)
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Express Option */}
        <div className="flex items-center space-x-2 p-4 border rounded-lg bg-orange-50 border-orange-200">
          <input
            type="checkbox"
            id="express"
            checked={isExpress}
            onChange={(e) => setIsExpress(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="express" className="cursor-pointer flex-1">
            <div className="font-medium text-orange-700">Orden Express</div>
            <div className="text-xs text-orange-600">
              Entrega acelerada (+ $50 adicionales)
            </div>
          </Label>
        </div>
        
        {/* Delivery Date */}
        <div className="space-y-2">
          <Label htmlFor="deliveryDate">
            Fecha de Entrega {!isExpress && '(calculada automáticamente)'}
          </Label>
          <Input
            id="deliveryDate"
            type="date"
            value={deliveryDate.toISOString().split('T')[0]}
            onChange={(e) => setDeliveryDate(new Date(e.target.value))}
            disabled={!isExpress}
            min={new Date().toISOString().split('T')[0]}
          />
          {!isExpress && (
            <p className="text-xs text-gray-500">
              Fecha calculada según SLA estándar: {deliveryDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
        
        {/* Shipping Notes */}
        <div className="space-y-2">
          <Label htmlFor="shippingNotes">Notas de Envío (opcional)</Label>
          <Textarea
            id="shippingNotes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Instrucciones especiales de entrega, dirección específica, horarios, etc..."
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}
