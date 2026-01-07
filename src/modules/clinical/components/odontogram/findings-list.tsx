'use client';

import React from 'react';
import { Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SURFACES } from '../../constants/dental';
import type { ToothFinding } from '../../types';

interface FindingsListProps {
  findings: ToothFinding[];
  onDelete: (findingId: string) => Promise<void>;
}

export function FindingsList({ findings, onDelete }: FindingsListProps) {
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  
  const handleDelete = async (findingId: string) => {
    setDeletingId(findingId);
    try {
      await onDelete(findingId);
    } catch (error) {
      console.error('Error deleting finding:', error);
    } finally {
      setDeletingId(null);
    }
  };
  
  if (findings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FileText className="mx-auto h-12 w-12 text-gray-300 mb-2" />
        <p className="text-sm">No hay hallazgos registrados</p>
        <p className="text-xs mt-1">Haga clic en una superficie dental para agregar</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Hallazgos Registrados ({findings.length})
      </h3>
      
      <div className="space-y-2">
        {findings.map((finding) => {
          const surface = SURFACES.find(s => s.id === finding.surface);
          
          return (
            <div
              key={finding.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded border border-gray-300"
                  style={{ backgroundColor: finding.finding?.color }}
                />
                
                <div>
                  <div className="font-medium text-sm">
                    Diente {finding.toothNumber} - {surface?.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {finding.finding?.name}
                    {finding.labOrderId && (
                      <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">
                        Con orden de lab
                      </span>
                    )}
                  </div>
                  {finding.notes && (
                    <div className="text-xs text-gray-500 mt-1">
                      {finding.notes}
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(finding.id)}
                disabled={deletingId === finding.id}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
