'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToothChart } from './tooth-chart';
import { FindingDialog } from './finding-dialog';
import { FindingsList } from './findings-list';
import { ALL_FINDINGS } from '../../constants/dental';
import { useDentalStore } from '../../stores/dental-store';
import type { DentalChartData, Finding } from '../../types';

interface OdontogramProps {
  patientId: string;
  clinicId: string;
  doctorId: string;
  onSaveFinding: (finding: Finding, notes: string) => Promise<void>;
  onDeleteFinding: (findingId: string) => Promise<void>;
}

export function Odontogram({
  patientId,
  clinicId,
  doctorId,
  onSaveFinding,
  onDeleteFinding,
}: OdontogramProps) {
  const [mode, setMode] = React.useState<'adult' | 'child'>('adult');
  const { findings, setPatientId } = useDentalStore();
  
  React.useEffect(() => {
    setPatientId(patientId);
  }, [patientId, setPatientId]);
  
  // Build chart data from findings
  const chartData: DentalChartData = React.useMemo(() => {
    const data: DentalChartData = {};
    
    findings.forEach((finding) => {
      if (!data[finding.toothNumber]) {
        data[finding.toothNumber] = {
          toothNumber: finding.toothNumber,
          surfaces: {},
        };
      }
      
      const findingInfo = ALL_FINDINGS.find(f => f.id === finding.findingId);
      if (findingInfo) {
        data[finding.toothNumber].surfaces[finding.surface] = {
          findingId: finding.findingId,
          color: findingInfo.color,
          name: findingInfo.name,
          requiresLab: findingInfo.requiresLab,
          labOrderId: finding.labOrderId,
        };
      }
    });
    
    return data;
  }, [findings]);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Odontograma</h2>
          <p className="text-sm text-gray-600 mt-1">
            Haga clic en cualquier superficie dental para registrar un hallazgo
          </p>
        </div>
        
        {/* Mode Toggle */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'adult' | 'child')}>
          <TabsList>
            <TabsTrigger value="adult">Adultos (32)</TabsTrigger>
            <TabsTrigger value="child">Niños (20)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Legend */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Leyenda de Colores</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {ALL_FINDINGS.map((finding) => (
            <div key={finding.id} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border border-gray-300"
                style={{ backgroundColor: finding.color }}
              />
              <span className="text-xs">{finding.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tooth Chart */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <ToothChart mode={mode} chartData={chartData} />
      </div>
      
      {/* Findings List */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <FindingsList findings={findings} onDelete={onDeleteFinding} />
      </div>
      
      {/* Finding Dialog */}
      <FindingDialog
        onSave={onSaveFinding}
        patientId={patientId}
        clinicId={clinicId}
        doctorId={doctorId}
      />
    </div>
  );
}
